import { EntityState } from "data-modeling";
import { Reducer } from "./reducer.model";

/**
 * Signature of an entity reducer
 */
export type EntityReducer<TModel, TState extends EntityState<TModel>> = Reducer<TState>;
