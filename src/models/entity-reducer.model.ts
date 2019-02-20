import { EntityState } from "./entity-state.model";
import { Action } from "./action.model";

/**
 * Signature of an entity reducer
 */
export type EntityReducer<TModel, TState extends EntityState<TModel> & TAttributes, TAttributes> =
    (state: TState, action: Action) => TState;