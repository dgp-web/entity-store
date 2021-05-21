import { EntityReducerMap } from "./entity-reducer-map.model";
import { EntityStateMap, EntityTypeMap } from "data-modeling";
import { CompositeEntityActionPayload } from "./composite-entity-action-payload.model";
import { CompositeEntityActionConfig } from "./composite-entity-action-config.model";
import { ComposedEntityActions } from "./composed-entity-actions.model";
import { EntitySelectorMap } from "./entity-selector-map.model";
import { EntityMetadataMap } from "./entity-metadata-map.model";

export interface EntityStore<TEntityTypeMap extends EntityTypeMap, TStoreFeature = string> {
    readonly reducers: EntityReducerMap<EntityStateMap<TEntityTypeMap>, TEntityTypeMap>;
    readonly actions: {
        composeEntityActions: (
            payload: CompositeEntityActionPayload<TEntityTypeMap, TStoreFeature>,
            config?: CompositeEntityActionConfig
        ) => ComposedEntityActions<TEntityTypeMap, TStoreFeature>
    };
    readonly selectors: EntitySelectorMap<TEntityTypeMap>;
    readonly metadata: EntityMetadataMap<TEntityTypeMap>;
}
