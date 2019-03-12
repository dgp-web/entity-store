import { EntityState } from "./entity-state.model";
import { Reducer } from "./reducer.model";

/**
 * Signature of an entity reducer
 */
export type EntityReducer<TModel, TState extends EntityState<TModel> & TAttributes, TAttributes> = Reducer<TState>;