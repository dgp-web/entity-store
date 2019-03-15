import { Action } from "./action.model";

/**
 * Signature of a reducer
 */
export type Reducer<TState> = (state: TState, action: Action) => TState;
