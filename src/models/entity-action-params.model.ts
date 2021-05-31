import { EntityTypeMap } from "data-modeling";

/**
 * Identifier for an entity type within
 * a store feature
 */
export interface EntityActionParams<TEntityTypeMap extends EntityTypeMap, TStoreFeature> {
    readonly entityType: keyof TEntityTypeMap;
    readonly storeFeature?: TStoreFeature;
}
