import { EntityState } from "../models";

export function assignAttributesToState<TModel, TState extends EntityState<TModel> & TAttributes, TAttributes>(state: TState, attributes?: TAttributes): TState {
    return Object.assign({}, state, attributes) as TState;
}
