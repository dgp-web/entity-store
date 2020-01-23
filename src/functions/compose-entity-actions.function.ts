import {
    ComposedEntityActions,
    CompositeEntityActionConfig,
    CompositeEntityActionPayloadWithStoreFeature,
    defaultCompositeEntityActionConfig,
    EntityTypeMap
} from "../models";
import {createCompositeEntityActionType} from "./action-types";
import {normalizeCompositeEntityActionPayload} from "./normalize-composite-entity-action-payload.function";

export function composeEntityActions<TEntityTypeMap extends EntityTypeMap = { [key: string]: any }, TStoreFeature = string>(
    payload: CompositeEntityActionPayloadWithStoreFeature<TEntityTypeMap, TStoreFeature>,
    config: CompositeEntityActionConfig = defaultCompositeEntityActionConfig
): ComposedEntityActions<TEntityTypeMap, TStoreFeature> {
    const normalizedPayload =  normalizeCompositeEntityActionPayload(payload);
    return {
        payload: normalizedPayload,
        type: createCompositeEntityActionType(normalizedPayload, config)
    };
}
