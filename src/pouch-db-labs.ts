import {
    AddEntityActionParamsMap,
    CompositeEntityActionPayload,
    EntityState,
    EntityTypeMap,
    KVS,
    RemoveEntityActionParamsMap, SelectEntityActionParamsMap,
    SetEntityActionParamsMap, UpdateEntityActionParamsMap
} from "./models";
import {
    addEntitiesToState,
    createEntityState,
    removeEntitiesFromState, selectEntitiesInState,
    setEntitiesInState,
    updateEntitiesInState
} from "./functions";

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
        });

        return this.db.bulkDocs(bulkActions);

    }

    async dispatch$(action: CompositeEntityActionPayload<TEntityTypeMap, null>): Promise<void> {

        // Map of entityKey to PutDocument
        const entityTypeBulkUpdateMap: KVS<PouchDB.Core.PutDocument<any>> = {};

        // -----

        // Remove
        const entityTypesToRemoveKeysMap = action.remove as RemoveEntityActionParamsMap<TEntityTypeMap, any>;
        const entityTypesFromWhichToRemoveKeys = Object.keys(entityTypesToRemoveKeysMap);
        let result = await this.db.allDocs({keys: entityTypesFromWhichToRemoveKeys as Array<string>});
        entityTypesFromWhichToRemoveKeys.map(entityType => {
            const idsToRemove = entityTypesToRemoveKeysMap[entityType];
            const currentState = result.rows.find(x => x.id === entityType) as any;
            entityTypeBulkUpdateMap[entityType] = removeEntitiesFromState(currentState as any, idsToRemove);
        });

        // Set
        const entityTypesToSetKeysMap = action.set as SetEntityActionParamsMap<TEntityTypeMap, any>;
        const entityTypesFromWhichToSetKeys = Object.keys(entityTypesToSetKeysMap);
        result = await this.db.allDocs({keys: entityTypesFromWhichToSetKeys as Array<string>});
        entityTypesFromWhichToSetKeys.map(entityType => {
            const entityToSetKVS = entityTypesToSetKeysMap[entityType];
            const currentState = result.rows.find(x => x.id === entityType) as any;
            entityTypeBulkUpdateMap[entityType] = setEntitiesInState(currentState as any, entityToSetKVS);
        });

        // Add
        const entityTypesToAddKeysMap = action.add as AddEntityActionParamsMap<TEntityTypeMap, any>;
        const entityTypesFromWhichToAddKeys = Object.keys(entityTypesToAddKeysMap);
        result = await this.db.allDocs({keys: entityTypesFromWhichToAddKeys as Array<string>});
        entityTypesFromWhichToAddKeys.map(entityType => {
            const entityToAddKVS = entityTypesToAddKeysMap[entityType];
            const currentState = result.rows.find(x => x.id === entityType) as any;
            entityTypeBulkUpdateMap[entityType] = addEntitiesToState(currentState as any, entityToAddKVS);
        });

        // Update
        const entityTypesToUpdateKeysMap = action.update as UpdateEntityActionParamsMap<TEntityTypeMap, any>;
        const entityTypesFromWhichToUpdateKeys = Object.keys(entityTypesToUpdateKeysMap);
        result = await this.db.allDocs({keys: entityTypesFromWhichToUpdateKeys as Array<string>});
        entityTypesFromWhichToUpdateKeys.map(entityType => {
            const entityToUpdateKVS = entityTypesToUpdateKeysMap[entityType];
            const currentState = result.rows.find(x => x.id === entityType) as any;
            entityTypeBulkUpdateMap[entityType] = updateEntitiesInState(currentState as any, entityToUpdateKVS);
        });

        // Select
        const entityTypesToSelectKeysMap = action.select as SelectEntityActionParamsMap<TEntityTypeMap, any>;
        const entityTypesFromWhichToSelectKeys = Object.keys(entityTypesToSelectKeysMap);
        result = await this.db.allDocs({keys: entityTypesFromWhichToSelectKeys as Array<string>});
        entityTypesFromWhichToSelectKeys.map(entityType => {
            const entityToSelect = entityTypesToSelectKeysMap[entityType];
            const currentState = result.rows.find(x => x.id === entityType) as any;
            entityTypeBulkUpdateMap[entityType] = selectEntitiesInState(currentState as any, entityToSelect);
        });

        // -----

        const bulkUpdateItems = Object.keys(entityTypeBulkUpdateMap).map(entityType => {
            return entityTypeBulkUpdateMap[entityType] as PouchDB.Core.PutDocument<any>;
        })
        return this.db.bulkDocs(bulkUpdateItems).then();
    }

}
