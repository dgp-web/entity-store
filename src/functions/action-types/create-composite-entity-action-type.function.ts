import { CompositeEntityActionPayload, CompositeEntityActionConfig, defaultCompositeEntityActionConfig } from "../../models";
import { createEntityActionTypesForSuffix } from "./create-entity-action-type-for-suffix.function";

/**
 * Creates an action type from a CompositeEntityActionPayload 
 * @param {CompositeEntityActionPayload} payload 
 * @param {CompositeEntityActionConfig} [config=defaultCompositeEntityActionConfig]
 */
export function createCompositeEntityActionType(
    payload: CompositeEntityActionPayload,
    config: CompositeEntityActionConfig = defaultCompositeEntityActionConfig
): string {
    let type = config.prefixes.composite + config.spacer;

    type += createEntityActionTypesForSuffix(config.prefixes.add, payload.add, config);
    type += createEntityActionTypesForSuffix(config.prefixes.update, payload.update, config);
    type += createEntityActionTypesForSuffix(config.prefixes.remove, payload.remove, config);
    type += createEntityActionTypesForSuffix(config.prefixes.select, payload.select, config);
    type += createEntityActionTypesForSuffix(config.prefixes.clear, payload.clear, config);
    type += createEntityActionTypesForSuffix(config.prefixes.set, payload.set, config);

    if (type.endsWith(config.separator)) {
        type = type.substring(0, type.length - 3);
    }

    return type;
}