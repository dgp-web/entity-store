import {
    AddEntityActionParamsMap,
    ClearEntityActionParamsList,
    CompositeEntityActionPayload,
    EntityTypeMap,
    KVS,
    RemoveEntityActionParamsMap,
    SelectEntityActionParamsMap,
    SetEntityActionParamsMap,
    UpdateEntityActionParamsMap
} from "./models";
import {
    addEntitiesToState,
    createEntityState,
    removeEntitiesFromState,
    selectEntitiesInState,
    setEntitiesInState,
    updateEntitiesInState
} from "./functions";

export type EntityQuery<TEntity> = "all" | ReadonlyArray<string>;

export type CompositeEntityQuery<TEntityTypeMap extends EntityTypeMap> = {
    readonly [K in keyof TEntityTypeMap]: EntityQuery<TEntityTypeMap[K]>;
}

export type CompositeEntityQueryResult<TEntityTypeMap extends EntityTypeMap> = {
    readonly [K in keyof TEntityTypeMap]: KVS<TEntityTypeMap[K]>;
}

export interface EntityDb<TEntityTypeMap extends EntityTypeMap> {
    initialize$(entityTypes: ReadonlyArray<keyof TEntityTypeMap>): Promise<void>;

    dispatch$(action: CompositeEntityActionPayload<TEntityTypeMap, null>): Promise<void>;

    get$(selection: CompositeEntityQuery<TEntityTypeMap>): CompositeEntityQueryResult<TEntityTypeMap>;
}

export function createEntityPouchDb<TEntityTypeMap extends EntityTypeMap>(
    entityTypes: ReadonlyArray<keyof TEntityTypeMap>,
    dbRef: PouchDB.Database
): EntityDb<TEntityTypeMap> {

    return {
        get$: (selection: CompositeEntityQuery<TEntityTypeMap>) => {
            return null;
        },

        initialize$: async (entityTypes: ReadonlyArray<string>) => {

            const result = await dbRef.allDocs({keys: entityTypes as Array<string>});
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

            return dbRef.bulkDocs(bulkActions).then();

        },

        dispatch$: async (action: CompositeEntityActionPayload<TEntityTypeMap, null>) => {

            // Map of entityKey to PutDocument
            const entityTypeBulkUpdateMap: KVS<PouchDB.Core.PutDocument<any>> = {};

            // -----

            // Clear
            const entityTypesToClear = action.clear as ClearEntityActionParamsList<TEntityTypeMap, any>;
            let result = await dbRef.allDocs<any>({keys: entityTypesToClear as Array<string>});
            result.rows.forEach(x => {
                entityTypeBulkUpdateMap[x.id] = {...x, _deleted: true};
            });

            // Remove
            const entityTypesToRemoveKeysMap = action.remove as RemoveEntityActionParamsMap<TEntityTypeMap, any>;
            const entityTypesFromWhichToRemoveKeys = Object.keys(entityTypesToRemoveKeysMap);
            result = await dbRef.allDocs({keys: entityTypesFromWhichToRemoveKeys as Array<string>});
            entityTypesFromWhichToRemoveKeys.map(entityType => {
                const idsToRemove = entityTypesToRemoveKeysMap[entityType];
                const currentState = result.rows.find(x => x.id === entityType) as any;
                entityTypeBulkUpdateMap[entityType] = removeEntitiesFromState(currentState as any, idsToRemove);
            });

            // Set
            const entityTypesToSetKeysMap = action.set as SetEntityActionParamsMap<TEntityTypeMap, any>;
            const entityTypesFromWhichToSetKeys = Object.keys(entityTypesToSetKeysMap);
            result = await dbRef.allDocs({keys: entityTypesFromWhichToSetKeys as Array<string>});
            entityTypesFromWhichToSetKeys.map(entityType => {
                const entityToSetKVS = entityTypesToSetKeysMap[entityType];
                const currentState = result.rows.find(x => x.id === entityType) as any;
                entityTypeBulkUpdateMap[entityType] = setEntitiesInState(currentState as any, entityToSetKVS);
            });

            // Add
            const entityTypesToAddKeysMap = action.add as AddEntityActionParamsMap<TEntityTypeMap, any>;
            const entityTypesFromWhichToAddKeys = Object.keys(entityTypesToAddKeysMap);
            result = await dbRef.allDocs({keys: entityTypesFromWhichToAddKeys as Array<string>});
            entityTypesFromWhichToAddKeys.map(entityType => {
                const entityToAddKVS = entityTypesToAddKeysMap[entityType];
                const currentState = result.rows.find(x => x.id === entityType) as any;
                entityTypeBulkUpdateMap[entityType] = addEntitiesToState(currentState as any, entityToAddKVS);
            });

            // Update
            const entityTypesToUpdateKeysMap = action.update as UpdateEntityActionParamsMap<TEntityTypeMap, any>;
            const entityTypesFromWhichToUpdateKeys = Object.keys(entityTypesToUpdateKeysMap);
            result = await dbRef.allDocs({keys: entityTypesFromWhichToUpdateKeys as Array<string>});
            entityTypesFromWhichToUpdateKeys.map(entityType => {
                const entityToUpdateKVS = entityTypesToUpdateKeysMap[entityType];
                const currentState = result.rows.find(x => x.id === entityType) as any;
                entityTypeBulkUpdateMap[entityType] = updateEntitiesInState(currentState as any, entityToUpdateKVS);
            });

            // Select
            const entityTypesToSelectKeysMap = action.select as SelectEntityActionParamsMap<TEntityTypeMap, any>;
            const entityTypesFromWhichToSelectKeys = Object.keys(entityTypesToSelectKeysMap);
            result = await dbRef.allDocs({keys: entityTypesFromWhichToSelectKeys as Array<string>});
            entityTypesFromWhichToSelectKeys.map(entityType => {
                const entityToSelect = entityTypesToSelectKeysMap[entityType];
                const currentState = result.rows.find(x => x.id === entityType) as any;
                entityTypeBulkUpdateMap[entityType] = selectEntitiesInState(currentState as any, entityToSelect);
            });

            // -----

            const bulkUpdateItems = Object.keys(entityTypeBulkUpdateMap).map(entityType => {
                return entityTypeBulkUpdateMap[entityType] as PouchDB.Core.PutDocument<any>;
            })
            return dbRef.bulkDocs(bulkUpdateItems).then();
        }
    };
}
