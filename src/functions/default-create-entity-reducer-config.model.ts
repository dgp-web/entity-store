import { 
    addEntitiesToState, clearEntityState, removeEntitiesFromState, selectEntitiesInState, 
    setEntitiesInState, updateEntitiesInState 
} from "./state-transformation";
import { EntityStateTransformationConfig, defaultCompositeEntityActionConfig, CreateEntityReducerConfig } from "../models";

export const defaultEntityStateTransformationConfig: EntityStateTransformationConfig<any, any> = {
    add: addEntitiesToState,
    update: updateEntitiesInState,
    remove: removeEntitiesFromState,
    clear: clearEntityState,
    select: selectEntitiesInState,
    set: setEntitiesInState
};

export const defaultCreateEntityReducerConfig: CreateEntityReducerConfig<any, any> = {
    compositeEntityActionConfig: defaultCompositeEntityActionConfig,
    entityStateTransformationConfig: defaultEntityStateTransformationConfig
};
