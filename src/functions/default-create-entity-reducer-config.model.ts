import {
    addEntitiesToState, clearEntityState, removeEntitiesFromState, selectEntitiesInState,
    setEntitiesInState, updateEntitiesInState
} from "./state-transformation";
import { EntityStateTransformationConfig, defaultCompositeEntityActionConfig, CreateEntityReducerConfig } from "../models";

export function getDefaultEntityStateTransformationConfig<TModel>(): EntityStateTransformationConfig<TModel> {
    return {
        add: addEntitiesToState,
        update: updateEntitiesInState,
        remove: removeEntitiesFromState,
        clear: clearEntityState,
        select: selectEntitiesInState,
        set: setEntitiesInState
    }
}


export function getDefaultCreateEntityReducerConfig<TModel>(): CreateEntityReducerConfig<TModel> {
   return {
       compositeEntityActionConfig: defaultCompositeEntityActionConfig,
       entityStateTransformationConfig: getDefaultEntityStateTransformationConfig()
   }
}
