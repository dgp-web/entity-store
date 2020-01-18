import {EntityReducerMap, EntityStateMap, EntityTypeMap} from "../models";
import {createEntityReducer} from "./create-entity-reducer.function";

export function createEntityReducers<TEntityTypeMap extends EntityTypeMap>(payload: {
    readonly entityTypes: ReadonlyArray<keyof TEntityTypeMap>;
}): EntityReducerMap<EntityStateMap<TEntityTypeMap>, TEntityTypeMap> {
    const reducers: EntityReducerMap<EntityStateMap<TEntityTypeMap>, TEntityTypeMap> = {} as any;
    payload.entityTypes.forEach(entityType => {
        reducers[entityType] = createEntityReducer({entityType: entityType as string}) as any;
    });
    return reducers;
}
