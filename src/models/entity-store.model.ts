import { EntityReducerMap } from "./entity-reducer-map.model";
import { EntityStateMap } from "./entity-state-map.model";
import { EntityTypeMap } from "./entity-type-map.model";

export interface EntityStore<TEntityTypeMap extends EntityTypeMap> {
    readonly reducers: EntityReducerMap<EntityStateMap<TEntityTypeMap>, TEntityTypeMap>;
}
