import { CompositeEntityActionConfig, EntityActionParams, defaultCompositeEntityActionConfig } from "../../models";
import { createEntityActionType } from "./create-entity-action-type.function";

/**
 * Creates entity-action types for a specific entity action
 * @param {string} actionTypeSuffix 
 * @param {ReadonlyArray<EntityActionParams>} entities 
 * @param {CompositeEntityActionConfig} [config=defaultCompositeEntityActionConfig] 
 */
export function createEntityActionTypesForSuffix(
    actionTypeSuffix: string, entities: ReadonlyArray<EntityActionParams<{}>>,
    config: CompositeEntityActionConfig = defaultCompositeEntityActionConfig): string {

    let result = "";

    if (entities) {
        entities.forEach(entity => {
            result += createEntityActionType(entity.entityType, actionTypeSuffix, entity.storeFeature) + config.separator;
        })
    } else {

    }

    return result;
}
