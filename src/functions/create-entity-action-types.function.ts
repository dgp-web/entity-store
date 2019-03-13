import { CompositeEntityActionConfig, defaultCompositeEntityActionConfig, EntityActionTypes } from "../models";
import { createEntityActionType } from "./create-entity-action-type.function";

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
      addEntityActionType: createEntityActionType(payload.entityType, config.prefixes.add, payload.storeFeature),
      updateEntityActionType: createEntityActionType(payload.entityType, config.prefixes.update, payload.storeFeature),
      removeEntityActionType: createEntityActionType(payload.entityType, config.prefixes.remove, payload.storeFeature),
      clearEntityActionType: createEntityActionType(payload.entityType, config.prefixes.clear, payload.storeFeature),
      setEntityActionType: createEntityActionType(payload.entityType, config.prefixes.set, payload.storeFeature),
      selectEntityActionType: createEntityActionType(payload.entityType, config.prefixes.select, payload.storeFeature)
    };

}