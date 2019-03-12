import { EntityState } from "../models";
import { assignAttributesToState } from "./assign-attributes-to-state.function";

export function selectEntitiesInState<TModel, TState extends EntityState<TModel> & TAttributes, TAttributes>(state: TState, payload: ReadonlyArray<string>, attributes?: TAttributes): TState {

    let result = Object.assign({}, state, {  selectedIds: payload }) as TState;
    result = assignAttributesToState(result, attributes) as TState;
    return result;
}
