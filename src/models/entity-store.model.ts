import { EntityReducerMap } from "./entity-reducer-map.model";
import { EntityTypeMap } from "./entity-type-map.model";
import { CompositeEntityActionPayload } from "./composite-entity-action-payload.model";
import { CompositeEntityActionConfig } from "./composite-entity-action-config.model";
import { ComposedEntityActions } from "./composed-entity-actions.model";
import { EntitySelectorMap } from "./entity-selector-map.model";

export interface EntityStoreActions<TEntityTypeMap extends EntityTypeMap, TStoreFeature> {
    composeEntityActions(
        payload: CompositeEntityActionPayload<TEntityTypeMap, TStoreFeature>, config?: CompositeEntityActionConfig
    ): ComposedEntityActions<TEntityTypeMap, TStoreFeature>;
}

/**
 * Object that exposes matching actions, reducers, and selectors
 */
export interface EntityStore<TEntityTypeMap extends EntityTypeMap, TStoreFeature = string> {
    readonly reducers: EntityReducerMap<TEntityTypeMap>;
    readonly actions: EntityStoreActions<TEntityTypeMap, TStoreFeature>;
    readonly selectors: EntitySelectorMap<TEntityTypeMap>;
}
