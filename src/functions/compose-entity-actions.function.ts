import {
    ComposedEntityActions,
    CompositeEntityActionConfig,
    CompositeEntityActionPayload,
    defaultCompositeEntityActionConfig,
    EntityTypeMap
} from "../models";
import {createCompositeEntityActionType} from "./action-types";

export function composeEntityActions<TEntityTypeMap extends EntityTypeMap = { [key: string]: any }, TStoreFeature = string>(
    payload: CompositeEntityActionPayload<TEntityTypeMap, TStoreFeature>,
    config: CompositeEntityActionConfig = defaultCompositeEntityActionConfig
): ComposedEntityActions<TEntityTypeMap, TStoreFeature> {
    return {
        payload: payload as any,
        type: createCompositeEntityActionType(payload as any, config)
    };
}
