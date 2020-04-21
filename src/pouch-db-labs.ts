import { createEntityStore } from "./functions/create-entity-store.function";
import {
    ClearEntityActionParamsList,
    CompositeEntityActionPayload,
    EntityTypeMap,
    RemoveEntityActionParamsMap
} from "./models";

export const test = createEntityStore({
    entityTypes: []
});

export class EntityPouchDbMiddleware<TEntityTypeMap extends EntityTypeMap> {

    constructor(
        private readonly db: PouchDB.Database
    ) {
    }

    async dispatch$(action: CompositeEntityActionPayload<TEntityTypeMap, null>): Promise<void> {

        let result: Array<PouchDB.Core.PutDocument<any>> = [];
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

        // TODO: Iterate over remove
        // TODO: Iterate over set
        // TODO: Iterate over add
        // TODO: Iterate over update

        return this.db.bulkDocs(result).then();

        /*await this.db.put({
            ...(settings as any),
            _id: this.config.entityType

        }*/
    }

}
