import { EntityState } from "../../models";
import { createEntityState } from "../create-entity-state.function";

export function clearEntityState<TModel, TState extends EntityState<TModel> & TAttributes, TAttributes>(state: TState): TState {
    return {
        ...state, 
        ...createEntityState()
    };
}