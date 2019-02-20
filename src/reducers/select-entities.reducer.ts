import { EntityState } from "../models";
import { entitiesReducer } from "./entities.reducer";

export function selectEntitiesReducer<TModel, TState extends EntityState<TModel> & TAttributes, TAttributes>(state: TState, payload: ReadonlyArray<string>, attributes?: TAttributes): TState {

    let result = Object.assign({}, state, {  selectedIds: payload }) as TState;
    result = entitiesReducer(result, attributes) as TState;
    return result;
}
