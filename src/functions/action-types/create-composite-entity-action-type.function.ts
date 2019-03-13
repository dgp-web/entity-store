import { CompositeEntityActionPayload, CompositeEntityActionConfig, defaultCompositeEntityActionConfig } from "../../models";
import { createActionTypeSegmentsForSuffix } from "./create-action-type-segments-for-suffix.function";

export function createCompositeEntityActionType(
    payload: CompositeEntityActionPayload,
    config: CompositeEntityActionConfig = defaultCompositeEntityActionConfig
): string {
    let type = config.prefixes.composite + config.spacer;

    type += createActionTypeSegmentsForSuffix(config.prefixes.add, payload.add, config);
    type += createActionTypeSegmentsForSuffix(config.prefixes.update, payload.update, config);
    type += createActionTypeSegmentsForSuffix(config.prefixes.remove, payload.remove, config);
    type += createActionTypeSegmentsForSuffix(config.prefixes.select, payload.select, config);
    type += createActionTypeSegmentsForSuffix(config.prefixes.clear, payload.clear, config);
    type += createActionTypeSegmentsForSuffix(config.prefixes.set, payload.set, config);

    if (type.endsWith(" | ")) {
        type = type.substring(0, type.length - 3);
    }

    return type;
}