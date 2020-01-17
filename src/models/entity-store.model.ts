import { EntityTypeMap } from "./entity-type-map.model";
import { EntityReducerMap } from "./entity-reducer-map.model";
import { EntityStateMap } from "./entity-state-map.model";
import { EntitySelectorMap } from "./entity-selector-map.model";

export interface EntityStore<TEntityTypeMap extends EntityTypeMap> {
    readonly selectors: EntitySelectorMap<EntityStateMap<TEntityTypeMap>, TEntityTypeMap>;
    readonly reducers: EntityReducerMap<EntityStateMap<TEntityTypeMap>, TEntityTypeMap>;
}
