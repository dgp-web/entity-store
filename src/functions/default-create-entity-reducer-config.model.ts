import { setEntitiesInState } from "./set-entities-in-state.function";
import { addEntitiesToState } from "./add-entities-to-state.function";
import { updateEntitiesInState } from "./update-entities-in-state.function";
import { removeEntitiesFromState } from "./remove-entities-from-state.function";
import { selectEntitiesInState } from "./select-entities-in-state.function";
import { clearEntityState } from "./clear-entity-state.function";
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
