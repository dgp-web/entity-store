import { EntityState } from "./entity-state.model";
import { EntityTypeMap } from "./entity-type-map.model";

/**
 * Maps entity types to entity states of these types
 */
export type EntityStateMap<TEntityTypeMap extends EntityTypeMap> = {
    readonly [K in keyof TEntityTypeMap]: EntityState<TEntityTypeMap[K]>;
}
