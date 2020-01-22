import {
    ComposedEntityActions,
    CompositeEntityActionConfig,
    CompositeEntityActionPayload,
    defaultCompositeEntityActionConfig,
    EntityTypeMap
} from "../models";
import {createCompositeEntityActionType} from "./action-types";
import {normalizeCompositeEntityActionPayload} from "./normalize-composite-entity-action-payload.function";

export function composeEntityActions<TEntityTypeMap extends EntityTypeMap = { [key: string]: any }, TStoreFeature = string>(
    payload: CompositeEntityActionPayload<TEntityTypeMap, TStoreFeature>,
    config: CompositeEntityActionConfig = defaultCompositeEntityActionConfig
): ComposedEntityActions<TEntityTypeMap, TStoreFeature> {
    return {
        payload: normalizeCompositeEntityActionPayload(payload),
        type: createCompositeEntityActionType(payload as any, config)
    };
}
