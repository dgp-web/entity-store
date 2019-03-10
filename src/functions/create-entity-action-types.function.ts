import { CompositeEntityActionConfig, defaultCompositeEntityActionConfig, EntityActionTypes } from "../models";
import { composeEntityActionType } from "./compose-entity-action-type.function";

export interface CreateEntityActionTypesPayload {
    readonly entityType: string;
    readonly storeFeature?: string;
}

/**
 * Creates the action types that a reducer created via createEntityReducer
 * reacts to.
 * @param payload
 * @param config
 */
export function createEntityActionTypes(
    payload: CreateEntityActionTypesPayload,
    config: CompositeEntityActionConfig = defaultCompositeEntityActionConfig
): EntityActionTypes {

    return {
      addEntityActionType: composeEntityActionType(payload.entityType, config.prefixes.add, payload.storeFeature),
      updateEntityActionType: composeEntityActionType(payload.entityType, config.prefixes.update, payload.storeFeature),
      removeEntityActionType: composeEntityActionType(payload.entityType, config.prefixes.remove, payload.storeFeature),
      clearEntityActionType: composeEntityActionType(payload.entityType, config.prefixes.clear, payload.storeFeature),
      setEntityActionType: composeEntityActionType(payload.entityType, config.prefixes.set, payload.storeFeature),
      selectEntityActionType: composeEntityActionType(payload.entityType, config.prefixes.select, payload.storeFeature)
    };

}