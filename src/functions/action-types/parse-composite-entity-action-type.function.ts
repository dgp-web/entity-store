import { CompositeEntityActionConfig, defaultCompositeEntityActionConfig } from "../../models";

/**
 * Parses the type of a CompositeEntityAction into an array
 * of entity-action types
 * @param actionType 
 * @param config 
 */
export function parseCompositeEntityActionType(
    actionType: string, 
    config: CompositeEntityActionConfig = defaultCompositeEntityActionConfig
    ): ReadonlyArray<string> {
    return actionType
        .replace(config.prefixes.composite + config.spacer, "")
        .split(config.separator)
}