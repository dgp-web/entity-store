import { EntitySelectors } from "./entity-selectors.model";
import { EntityTypeMap } from "./entity-type-map.model";
import { EntityStateMap } from "./entity-state-map.model";

export type EntitySelectorMap<TState extends EntityStateMap<TEntityTypeMap>, TEntityTypeMap extends EntityTypeMap> = {
    [K in keyof TState]: EntitySelectors<TState[K]>
}
