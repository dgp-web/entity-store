import { EntitySelectors } from "./entity-selectors.model";
import { EntityTypeMap } from "./entity-type-map.model";

/**
 * Maps entity types to entity selectors of these types
 */
export type EntitySelectorMap<TEntityTypeMap extends EntityTypeMap> = {
    [K in keyof TEntityTypeMap]: EntitySelectors<TEntityTypeMap, TEntityTypeMap[K]>;
}
