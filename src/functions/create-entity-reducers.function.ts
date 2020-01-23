import {EntityReducerMap, EntityTypeMap} from "../models";
import {createEntityReducer} from "./create-entity-reducer.function";

export function createEntityReducers<TEntityTypeMap extends EntityTypeMap, TStoreFeature = string>(payload: {
    readonly entityTypes: ReadonlyArray<keyof TEntityTypeMap>;
    readonly storeFeature?: TStoreFeature;
}): EntityReducerMap<TEntityTypeMap> {
    const reducers: EntityReducerMap<TEntityTypeMap> = {} as any;
    payload.entityTypes.forEach(entityType => {
        reducers[entityType] = createEntityReducer({
            entityType: entityType as string,
            storeFeature: payload.storeFeature as any
        }) as any;
    });
    return reducers;
}
