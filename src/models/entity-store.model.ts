import { EntityReducerMap } from "./entity-reducer-map.model";
import { EntityStateMap } from "./entity-state-map.model";
import { EntitySelectorMap } from "./entity-selector-map.model";

export interface EntityStore<TEntityStateMap extends EntityStateMap> {
    readonly selectors: EntitySelectorMap<TEntityStateMap>;
    readonly reducers: EntityReducerMap<TEntityStateMap>;
}
