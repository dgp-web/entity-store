/**
 * Identifier for an entity type within
 * a store feature
 */
export interface EntityActionParams {
    readonly entityType: string;
    readonly storeFeature?: string;
}