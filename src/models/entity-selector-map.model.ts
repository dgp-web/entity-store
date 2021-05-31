import { EntitySelectors } from "./entity-selectors.model";
import { EntityTypeMap } from "data-modeling";

export type EntitySelectorMap<TEntityTypeMap extends EntityTypeMap> = {
    [K in keyof TEntityTypeMap]: EntitySelectors<TEntityTypeMap, TEntityTypeMap[K]>;
}
