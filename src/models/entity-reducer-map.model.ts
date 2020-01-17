import { EntityReducer } from "./entity-reducer.model";
import { EntityTypeMap } from "./entity-type-map.model";
import { EntityStateMap } from "./entity-state-map.model";

export type EntityReducerMap<TState extends EntityStateMap<TEntityTypeMap>, TEntityTypeMap extends EntityTypeMap> = {
    [K in keyof TState]: EntityReducer<any, TState[K]>;
}
