import { EntityReducer } from "./entity-reducer.model";
import { EntityStateMap, EntityTypeMap } from "data-modeling";

export type EntityReducerMap<TEntityStateMap extends EntityStateMap<TEntityTypeMap>, TEntityTypeMap extends EntityTypeMap> = {
    [K in keyof TEntityStateMap]: EntityReducer<any, TEntityStateMap[K]>;
}
