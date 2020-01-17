import { EntitySelectors } from "./entity-selectors.model";
import { EntityStateMap } from "./entity-state-map.model";

export type EntitySelectorMap<TEntityStateMap extends EntityStateMap> = {
    [K in keyof TEntityStateMap]: EntitySelectors<TEntityStateMap[K]>
}
