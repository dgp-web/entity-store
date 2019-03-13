import { 
    addEntitiesToState, clearEntityState, removeEntitiesFromState, selectEntitiesInState, 
    setEntitiesInState, updateEntitiesInState 
} from "./state-transformation";
import { EntityOperationConfig, defaultCompositeEntityActionConfig, CreateEntityReducerConfig } from "../models";

export const defaultEntityOperationConfig: EntityOperationConfig<any, any> = {
    add: addEntitiesToState,
    update: updateEntitiesInState,
    remove: removeEntitiesFromState,
    clear: clearEntityState,
    select: selectEntitiesInState,
    set: setEntitiesInState
};

export const defaultCreateEntityReducerConfig: CreateEntityReducerConfig<any, any> = {
    compositeEntityActionConfig: defaultCompositeEntityActionConfig,
    entityOperationConfig: defaultEntityOperationConfig
};
