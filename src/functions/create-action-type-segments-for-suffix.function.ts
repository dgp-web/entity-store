import { CompositeEntityActionConfig, EntityActionParams } from "../models";
import { composeEntityActionType } from "./compose-entity-action-type.function";

export function createActionTypeSegmentsForSuffix(actionTypeSuffix: string, entities: ReadonlyArray<EntityActionParams>, config: CompositeEntityActionConfig): string {

    let result = "";

    if (entities) {
        entities.forEach(entity => {
            result += composeEntityActionType(entity.entityType, actionTypeSuffix, entity.storeFeature) + config.separator;
        })
    } else {

    }

    return result;
}