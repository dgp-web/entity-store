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
import * as _ from "lodash";

export type EntityQuery<TEntity> = "all" | ReadonlyArray<string>;

export type CompositeEntityQuery<TEntityTypeMap extends EntityTypeMap> = {
    readonly [K in keyof TEntityTypeMap]?: EntityQuery<TEntityTypeMap[K]>;
}

export type CompositeEntityQueryResult<TEntityTypeMap extends EntityTypeMap> = {
    readonly [K in keyof TEntityTypeMap]?: KVS<TEntityTypeMap[K]>;
}

export interface EntityDb<TEntityTypeMap extends EntityTypeMap> {
    initialize$(): Promise<void>;

    dispatch$(action: CompositeEntityActionPayload<TEntityTypeMap, null>): Promise<void>;

    get$(selection: CompositeEntityQuery<TEntityTypeMap>): Promise<CompositeEntityQueryResult<TEntityTypeMap>>;
}

export function createEntityPouchDb<TEntityTypeMap extends EntityTypeMap>(
    entityTypes: ReadonlyArray<keyof TEntityTypeMap>,
    dbRef: PouchDB.Database
): EntityDb<TEntityTypeMap> {

    return {
        get$: async (selection: CompositeEntityQuery<TEntityTypeMap>) => {

            const result: CompositeEntityQueryResult<TEntityTypeMap> = {};

            const entityTypes = Object.keys(selection);
            const allDocsResult = await dbRef.allDocs({keys: entityTypes as Array<string>});

            const entityTypeDocs = await dbRef.bulkGet({
                docs: allDocsResult.rows.map(x => {
                    return {
                        id: x.id
                    } as any;
                })
            });
            const entities = _.flatten(entityTypeDocs.results.map(x => {
                return x.docs.map(doc => {

                    const result: PouchDB.Core.GetMeta & PouchDB.Core.IdMeta = (doc as any).ok;
                    delete result._attachments;
                    delete result._rev;
                    delete result._conflicts;
                    delete result._revs_info;
                    return result as any;
                });

            }));

            entityTypes.forEach(entityType => {
                const entityState = entities.find(x => x._id === entityType) as any;
                if (selection[entityType] === "all") {
                    (result as any)[entityType] = entityState.entities
                } else {
                    (result as any)[entityType] = (selection[entityType] as Array<string>)
                        .reduce((previousValue, currentValue) => {
                            previousValue[currentValue] = entityState.entities[currentValue];
                            return previousValue;
                        }, {});
                }
            });

            return Promise.resolve<CompositeEntityQueryResult<TEntityTypeMap>>(result);
        },

        initialize$: async () => {

            const result = await dbRef.allDocs({keys: entityTypes as Array<string>});
            const foundKeys = result.rows.map(x => x.id);

            const entityTypesToCreate = entityTypes.filter(
                entityType => !foundKeys.includes(entityType as string)
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
            let result1;
            let entity;


            // Clear
            if (action.clear) {
                const entityTypesToClear = action.clear as ClearEntityActionParamsList<TEntityTypeMap, any>;
                let result = await dbRef.allDocs<any>({keys: entityTypesToClear as Array<string>});
                result.rows.forEach(x => {
                    entityTypeBulkUpdateMap[x.id] = {_id: x.id, _deleted: true};
                });
            }

            // Remove
            if (action.remove) {

                const entityTypesToRemoveKeysMap = action.remove as RemoveEntityActionParamsMap<TEntityTypeMap, any>;
                const entityTypesFromWhichToRemoveKeys = Object.keys(entityTypesToRemoveKeysMap);
                result1 = await dbRef.bulkGet({
                    docs: entityTypesFromWhichToRemoveKeys.map(x => {
                        return {id: x} as any;
                    })
                });
                entity = _.flatten(result1.results
                    .map(x => {
                        return x.docs.map(doc => {

                            const result: PouchDB.Core.GetMeta & PouchDB.Core.IdMeta = (doc as any).ok;
                            return result as any;
                        });

                    }));
                entityTypesFromWhichToRemoveKeys.map(async entityType => {
                    const idsToRemove = entityTypesToRemoveKeysMap[entityType];
                    const currentState = entity.find(x => x._id === entityType) as any;
                    entityTypeBulkUpdateMap[entityType] = removeEntitiesFromState(currentState as any, idsToRemove);
                });
            }

            // Set
            if (action.set) {

                const entityTypesToSetKeysMap = action.set as SetEntityActionParamsMap<TEntityTypeMap, any>;
                const entityTypesFromWhichToSetKeys = Object.keys(entityTypesToSetKeysMap);
                result1 = await dbRef.bulkGet({
                    docs: entityTypesFromWhichToSetKeys.map(x => {
                        return {id: x} as any;
                    })
                });
                entity = _.flatten(result1.results
                    .map(x => {
                        return x.docs.map(doc => {

                            const result: PouchDB.Core.GetMeta & PouchDB.Core.IdMeta = (doc as any).ok;
                            return result as any;
                        });

                    }));
                entityTypesFromWhichToSetKeys.map(entityType => {
                    const entityToSetKVS = entityTypesToSetKeysMap[entityType];
                    const currentState = entity.find(x => x._id === entityType) as any;
                    entityTypeBulkUpdateMap[entityType] = setEntitiesInState(currentState as any, entityToSetKVS);
                });
            }

            // Add
            if (action.add) {

                const entityTypesToAddKeysMap = action.add as AddEntityActionParamsMap<TEntityTypeMap, any>;
                const entityTypesFromWhichToAddKeys = Object.keys(entityTypesToAddKeysMap);
                result1 = await dbRef.bulkGet({
                    docs: entityTypesFromWhichToAddKeys.map(x => {
                        return {id: x} as any;
                    })
                });
                entity = _.flatten(result1.results
                    .map(x => {
                        return x.docs.map(doc => {

                            const result: PouchDB.Core.GetMeta & PouchDB.Core.IdMeta = (doc as any).ok;
                            return result as any;
                        });

                    }));
                entityTypesFromWhichToAddKeys.map(entityType => {
                    const entityToAddKVS = entityTypesToAddKeysMap[entityType];
                    const currentState = entity.find(x => x._id === entityType) as any;
                    entityTypeBulkUpdateMap[entityType] = addEntitiesToState(currentState as any, entityToAddKVS);
                });
            }

            // Update
            if (action.update) {

                const entityTypesToUpdateKeysMap = action.update as UpdateEntityActionParamsMap<TEntityTypeMap, any>;
                const entityTypesFromWhichToUpdateKeys = Object.keys(entityTypesToUpdateKeysMap);
                result1 = await dbRef.bulkGet({
                    docs: entityTypesFromWhichToUpdateKeys.map(x => {
                        return {id: x} as any;
                    })
                });
                entity = _.flatten(result1.results
                    .map(x => {
                        return x.docs.map(doc => {

                            const result: PouchDB.Core.GetMeta & PouchDB.Core.IdMeta = (doc as any).ok;
                            return result as any;
                        });

                    }));
                entityTypesFromWhichToUpdateKeys.map(entityType => {
                    const entityToUpdateKVS = entityTypesToUpdateKeysMap[entityType];
                    const currentState = entity.find(x => x._id === entityType) as any;
                    entityTypeBulkUpdateMap[entityType] = updateEntitiesInState(currentState as any, entityToUpdateKVS);
                });
            }

            // Select
            if (action.select) {
                const entityTypesToSelectKeysMap = action.select as SelectEntityActionParamsMap<TEntityTypeMap, any>;
                const entityTypesFromWhichToSelectKeys = Object.keys(entityTypesToSelectKeysMap);
                result1 = await dbRef.bulkGet({
                    docs: entityTypesFromWhichToSelectKeys.map(x => {
                        return {id: x} as any;
                    })
                });
                entity = _.flatten(result1.results
                    .map(x => {
                        return x.docs.map(doc => {

                            const result: PouchDB.Core.GetMeta & PouchDB.Core.IdMeta = (doc as any).ok;
                            return result as any;
                        });

                    }));
                entityTypesFromWhichToSelectKeys.map(entityType => {
                    const entityToSelect = entityTypesToSelectKeysMap[entityType];
                    const currentState = entity.find(x => x._id === entityType) as any;
                    entityTypeBulkUpdateMap[entityType] = selectEntitiesInState(currentState as any, entityToSelect);
                });
            }
            // -----

            const bulkUpdateItems = Object.keys(entityTypeBulkUpdateMap).map(entityType => {
                return entityTypeBulkUpdateMap[entityType] as PouchDB.Core.PutDocument<any>;
            })
            return dbRef.bulkDocs(bulkUpdateItems).then();
        }
    };
}
