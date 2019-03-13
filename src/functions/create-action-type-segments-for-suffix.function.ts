import { CompositeEntityActionConfig, EntityActionParams } from "../models";
import { createEntityActionType } from "./create-entity-action-type.function";

export function createActionTypeSegmentsForSuffix(actionTypeSuffix: string, entities: ReadonlyArray<EntityActionParams>, config: CompositeEntityActionConfig): string {

    let result = "";

    if (entities) {
        entities.forEach(entity => {
            result += createEntityActionType(entity.entityType, actionTypeSuffix, entity.storeFeature) + config.separator;
        })
    } else {

    }

    return result;
}