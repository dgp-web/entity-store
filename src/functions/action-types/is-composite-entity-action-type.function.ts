import { CompositeEntityActionConfig, defaultCompositeEntityActionConfig } from "../../models";

/**
 * Returns whether a given actionType is a CompositeEntityAction
 * @param {string} actionType
 * @param {CompositeEntityActionConfig} [config=defaultCompositeEntityActionConfig]
 */
export function isCompositeEntityActionType(
    actionType: string, 
    config: CompositeEntityActionConfig = defaultCompositeEntityActionConfig
    ): boolean {
    return actionType.includes(config.prefixes.composite);
}