import { EntityState, EntityTypeMap } from "data-modeling";

export type EntityStateMap<TEntityTypeMap extends EntityTypeMap> = {
    readonly [K in keyof TEntityTypeMap]: EntityState<TEntityTypeMap[K]>;
}
