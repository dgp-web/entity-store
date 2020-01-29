import {
    CompositeEntityActionConfig,
    CompositeEntityActionPayload,
    EntityStore,
    EntityTypeMap,
    EntitySelectorMap, defaultCompositeEntityActionConfig, EntityStateTransformationConfig
} from "../models";
import {createEntityReducers} from "./create-entity-reducers.function";
import {composeEntityActions} from "./compose-entity-actions.function";
import {createEntitySelectors} from "./create-entity-selectors.function";
import {defaultEntityStateTransformationConfig} from "./default-create-entity-reducer-config.model";

export interface EntityStoreConfig<TEntityTypeMap extends EntityTypeMap> {
    readonly entityStateTransformationConfig: EntityStateTransformationConfig<TEntityTypeMap[keyof TEntityTypeMap]>;
    readonly composeEntityActionConfig: CompositeEntityActionConfig
}

export function getDefaultEntityStoreConfig<TEntityTypeMap extends EntityTypeMap>(): EntityStoreConfig<TEntityTypeMap> {
    return {
        entityStateTransformationConfig: defaultEntityStateTransformationConfig,
        composeEntityActionConfig: defaultCompositeEntityActionConfig
    };
}

/**
 * Creates an entity store with reducers and selectors based on a given
 * set of entity types
 */
export function createEntityStore<TEntityTypeMap extends EntityTypeMap, TStoreFeature = string>(payload: {
    readonly entityTypes: ReadonlyArray<keyof TEntityTypeMap>;
    readonly storeFeature?: TStoreFeature;
}, config = getDefaultEntityStoreConfig()): EntityStore<TEntityTypeMap, TStoreFeature> {

    const selectors: EntitySelectorMap<TEntityTypeMap> = {} as any;

    payload.entityTypes.forEach(entityType => {
        selectors[entityType] = createEntitySelectors({entityType});
    });

    return {
        reducers: createEntityReducers(payload, {
            compositeEntityActionConfig: config.composeEntityActionConfig,
            entityStateTransformationConfig: config.entityStateTransformationConfig
        }),
        actions: {
            composeEntityActions: (
                internalPayload: CompositeEntityActionPayload<TEntityTypeMap, TStoreFeature>,
                composeEntityActionsConfig?: CompositeEntityActionConfig
            ) => {
                return composeEntityActions({
                    ...internalPayload, storeFeature: payload.storeFeature
                }, {
                    ...config.composeEntityActionConfig,
                    ...composeEntityActionsConfig
                });
            }
        },
        selectors
    };

}

