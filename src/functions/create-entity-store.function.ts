import {
    CompositeEntityActionConfig,
    CompositeEntityActionPayload,
    EntityMetadataMap,
    EntitySelectorMap,
    EntityStore
} from "../models";
import { EntityTypeMap } from "data-modeling";
import { createEntityReducers } from "./create-entity-reducers.function";
import { composeEntityActions } from "./compose-entity-actions.function";
import { createEntitySelectors } from "./create-entity-selectors.function";

/**
 * Creates an entity store with reducers and selectors based on a given
 * set of entity types
 */
export function createEntityStore<TEntityTypeMap extends EntityTypeMap, TStoreFeature = string>(payload: {
    readonly entityTypes: ReadonlyArray<keyof TEntityTypeMap>;
    readonly storeFeature?: TStoreFeature;
    readonly metadata?: EntityMetadataMap<TEntityTypeMap>;

    readonly config?: {
        readonly selectors?: {
            /**
             * Selectors are created from root and prefixed with "storeFeature" if it is set
             */
            readonly fromRoot?: boolean;
        };
    };
}): EntityStore<TEntityTypeMap, TStoreFeature> {

    const selectors: EntitySelectorMap<TEntityTypeMap> = {} as any;

    payload.entityTypes.forEach(entityType => {
        const entitySelectors = createEntitySelectors({entityType});

        if (payload?.config?.selectors.fromRoot && payload.storeFeature) {
            (selectors as any)[payload.storeFeature][entityType] = entitySelectors;
        } else {
            selectors[entityType] = entitySelectors as any;
        }
    });

    return {
        reducers: createEntityReducers(payload),
        actions: {
            composeEntityActions: (
                internalPayload: CompositeEntityActionPayload<TEntityTypeMap, TStoreFeature>,
                config?: CompositeEntityActionConfig
            ) => {
                return composeEntityActions({
                    ...internalPayload, storeFeature: payload.storeFeature
                }, config);
            }
        },
        selectors,
        metadata: payload.metadata
    };

}

