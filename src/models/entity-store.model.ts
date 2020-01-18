import {EntityReducerMap} from "./entity-reducer-map.model";
import {EntityStateMap} from "./entity-state-map.model";
import {EntityTypeMap} from "./entity-type-map.model";
import {CompositeEntityActionPayload} from "./composite-entity-action-payload.model";
import {CompositeEntityActionConfig} from "./composite-entity-action-config.model";
import {ComposedEntityActions} from "./composed-entity-actions.model";

export interface EntityStore<TEntityTypeMap extends EntityTypeMap, TStoreFeature = string> {
    readonly reducers: EntityReducerMap<EntityStateMap<TEntityTypeMap>, TEntityTypeMap>;
    readonly actions: {
        composeEntityActions: (
            payload: CompositeEntityActionPayload<TEntityTypeMap, TStoreFeature>,
            config?: CompositeEntityActionConfig
        ) => ComposedEntityActions<TEntityTypeMap, TStoreFeature>
    }
}
