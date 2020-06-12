import { EntityReducer } from "./entity-reducer.model";
import { EntityStateMap } from "./entity-state-map.model";
import { EntityTypeMap } from "./entity-type-map.model";

export type EntityReducerMap<TEntityStateMap extends EntityStateMap<TEntityTypeMap>, TEntityTypeMap extends EntityTypeMap> = {
    [K in keyof TEntityStateMap]: EntityReducer<any, TEntityStateMap[K]>;
}
