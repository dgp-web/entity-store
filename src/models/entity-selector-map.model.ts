import { EntitySelectors } from "./entity-selectors.model";
import { EntityTypeMap } from "./entity-type-map.model";

export type EntitySelectorMap<TEntityTypeMap extends EntityTypeMap> = {
    [K in keyof TEntityTypeMap]: EntitySelectors<TEntityTypeMap[K]>;
}
