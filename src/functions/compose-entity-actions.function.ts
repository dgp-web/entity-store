import {
    ComposedEntityActions,
    CompositeEntityActionConfig,
    CompositeEntityActionPayload,
    defaultCompositeEntityActionConfig,
    EntityTypeMap
} from "../models";
import {createCompositeEntityActionType} from "./action-types";

export function composeEntityActions<TEntityTypeMap extends EntityTypeMap = { [key: string]: any }>(
    payload: CompositeEntityActionPayload<TEntityTypeMap>,
    config: CompositeEntityActionConfig = defaultCompositeEntityActionConfig
): ComposedEntityActions<TEntityTypeMap> {
    return {
        payload: payload as any,
        type: createCompositeEntityActionType(payload as any, config)
    };
}
