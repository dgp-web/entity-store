import {
    CompositeEntityActionConfig,
    CompositeEntityActionPayload,
    defaultCompositeEntityActionConfig,
    EntityTypeMap
} from "../models";
import {createCompositeEntityActionType} from "./action-types";


export function composeEntityActions<TEntityTypeMap extends EntityTypeMap>(
    payload: CompositeEntityActionPayload<TEntityTypeMap>,
    config: CompositeEntityActionConfig = defaultCompositeEntityActionConfig
): {
    readonly payload: CompositeEntityActionPayload<TEntityTypeMap>;
    readonly type: string;
} {
    return {
        payload: payload as any,
        type: createCompositeEntityActionType(payload as any, config)
    };
}
