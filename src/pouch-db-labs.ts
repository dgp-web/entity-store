import { CompositeEntityActionPayload, EntityState, EntityTypeMap, KVS, RemoveEntityActionParamsMap } from "./models";
import { createEntityState, removeEntitiesFromState } from "./functions";

export class EntityPouchDbMiddleware<TEntityTypeMap extends EntityTypeMap> {

    constructor(
        private readonly db: PouchDB.Database
    ) {
    }

    // TODO: how to create table?
    // TODO: how to read from this? Map of strings  to "all" or array of string

    async create$(entityTypes: ReadonlyArray<string>) {

        const result = await this.db.allDocs({keys: entityTypes as Array<string>});
        const foundKeys = result.rows.map(x => x.key);

        const entityTypesToCreate = entityTypes.filter(
            entityType => !foundKeys.includes(entityType)
        );
        const bulkActions: Array<PouchDB.Core.PostDocument<any>> = entityTypesToCreate.map(entityType => {
            return {
                _id: entityType,
                ...createEntityState()
            } as PouchDB.Core.PostDocument<any>;
        })

        return this.db.bulkDocs(bulkActions);

    }

    async dispatch$(action: CompositeEntityActionPayload<TEntityTypeMap, null>): Promise<void> {

        // Map of entityKey to PutDocument
        const entityTypeBulkUpdateMap: KVS<PouchDB.Core.PutDocument<any>> = {};

        // -----

        // Remove
        const entityTypesToRemoveKeysMap = action.remove as RemoveEntityActionParamsMap<TEntityTypeMap, any>;
        const entityTypesFromWhichToRemoveKeys = Object.keys(entityTypesToRemoveKeysMap);
        const result = await this.db.allDocs({keys: entityTypesFromWhichToRemoveKeys as Array<string>});
        entityTypesFromWhichToRemoveKeys.map(entityType => {
            const idsToRemove = entityTypesToRemoveKeysMap[entityType];
            const currentState = result.rows.find(x => x.id === entityType) as any;
            entityTypeBulkUpdateMap[entityType] = removeEntitiesFromState(currentState as any, idsToRemove);
        });

        // -----

        const bulkUpdateItems = Object.keys(entityTypeBulkUpdateMap).map(entityType => {
            return entityTypeBulkUpdateMap[entityType] as PouchDB.Core.PutDocument<any>;
        })
        return this.db.bulkDocs(bulkUpdateItems).then();

        /*  const updatedStates = result.rows.map(partialResult => {
             const

              const updatedState = removeEntitiesFromState(partialResult, )

          });*/

        /*let result: Array<PouchDB.Core.PutDocument<any>> = [];
        const allDocs = await this.db.allDocs<any>();

        if (action.clear) {

            const entityTypesToClear = action.clear as ClearEntityActionParamsList<TEntityTypeMap, any>;

            entityTypesToClear.forEach(entityType => {
                const relatedDocs = allDocs.rows
                    .filter(x => x.id.startsWith(entityType as string))
                    .map(x => {
                        return {...x, _deleted: true} as PouchDB.Core.PutDocument<any>;
                    });
                result = result.concat(relatedDocs)
            });

        }

        if (action.remove) {
            const entityTypesToRemoveKeys = action.remove as RemoveEntityActionParamsMap<TEntityTypeMap, any>;

            Object.keys(entityTypesToRemoveKeys).forEach(key => {

                const ids = entityTypesToRemoveKeys[key];
                const relatedDocs = allDocs.rows
                    .filter(x => ids.includes(x.id))
                    .map(x => {
                        return {...x, _deleted: true} as PouchDB.Core.PutDocument<any>;
                    });
                result = result.concat(relatedDocs)
            });
        }

        // TODO: Iterate over set
        // TODO: Iterate over add
        // TODO: Iterate over update

        return this.db.bulkDocs(result).then();

        /!*await this.db.put({
            ...(settings as any),
            _id: this.config.entityType

        }*!/*/
    }

}
