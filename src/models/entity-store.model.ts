import { EntityReducerMap } from "./entity-reducer-map.model";
import { EntityStateMap } from "./entity-state-map.model";
import { EntitySelectorMap } from "./entity-selector-map.model";
import { EntityTypeMap } from "./entity-type-map.model";

export interface EntityStore<TEntityTypeMap extends EntityTypeMap> {
    readonly selectors: EntitySelectorMap<TEntityTypeMap>;
    readonly reducers: EntityReducerMap<EntityStateMap<TEntityTypeMap>, TEntityTypeMap>;
}
