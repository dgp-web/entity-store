import {EntityTypeMap} from "./entity-type-map.model";

/**
 * Identifier for an entity type within
 * a store feature
 */
export interface EntityActionParams<TEntityTypeMap extends EntityTypeMap> {
    readonly entityType: keyof TEntityTypeMap;
    readonly storeFeature?: string;
}
