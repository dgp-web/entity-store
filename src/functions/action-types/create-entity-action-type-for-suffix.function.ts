import { CompositeEntityActionConfig, defaultCompositeEntityActionConfig, EntityActionParams } from "../../models";
import { EntityTypeMap } from "data-modeling";
import { createEntityActionType } from "./create-entity-action-type.function";

/**
 * Creates entity-action types for a specific entity action
 * @param {string} actionTypeSuffix
 * @param {ReadonlyArray<EntityActionParams>} entities
 * @param {CompositeEntityActionConfig} [config=defaultCompositeEntityActionConfig]
 */
export function createEntityActionTypesForSuffix<TEntityTypeMap extends EntityTypeMap, TStoreFeature>(
    actionTypeSuffix: string, entities: ReadonlyArray<EntityActionParams<TEntityTypeMap, TStoreFeature>>,
    config: CompositeEntityActionConfig = defaultCompositeEntityActionConfig): string {

    let result = "";

    if (entities) {
        entities.forEach(entity => {
            result += createEntityActionType<TEntityTypeMap, TStoreFeature>(entity.entityType, actionTypeSuffix, entity.storeFeature) + config.separator;
        })
    } else {

    }

    return result;
}
