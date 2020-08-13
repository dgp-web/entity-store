import { CompositeEntityActionConfig, defaultCompositeEntityActionConfig } from "../../models";

// TODO: Test that only start triggers it

/**
 * Returns whether a given actionType is a CompositeEntityAction
 * @param {string} actionType
 * @param {CompositeEntityActionConfig} [config=defaultCompositeEntityActionConfig]
 */
export function isCompositeEntityActionType(
    actionType: string, 
    config: CompositeEntityActionConfig = defaultCompositeEntityActionConfig
    ): boolean {
    return actionType.startsWith(config.prefixes.composite);
}
