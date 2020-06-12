import {
    CompositeEntityActionConfig,
    CompositeEntityActionPayload,
    EntityStore,
    EntityTypeMap,
    EntitySelectorMap
} from "../models";
import {createEntityReducers} from "./create-entity-reducers.function";
import {composeEntityActions} from "./compose-entity-actions.function";
import {createEntitySelectors} from "./create-entity-selectors.function";

/**
 * Creates an entity store with reducers and selectors based on a given
 * set of entity types
 */
export function createEntityStore<TEntityTypeMap extends EntityTypeMap, TStoreFeature = string>(payload: {
    readonly entityTypes: ReadonlyArray<keyof TEntityTypeMap>;
    readonly storeFeature?: TStoreFeature;
}): EntityStore<TEntityTypeMap, TStoreFeature> {

    const selectors: EntitySelectorMap<TEntityTypeMap> = {} as any;

    payload.entityTypes.forEach(entityType => {
        selectors[entityType] = createEntitySelectors({entityType});
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
        selectors
    };

}

