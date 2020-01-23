import { EntityReducer } from "./entity-reducer.model";
import { EntityStateMap } from "./entity-state-map.model";
import { EntityTypeMap } from "./entity-type-map.model";

export type EntityReducerMap<TEntityTypeMap extends EntityTypeMap> = {
    [K in keyof TEntityTypeMap]: EntityReducer<any, EntityStateMap<TEntityTypeMap>[K]>;
}
