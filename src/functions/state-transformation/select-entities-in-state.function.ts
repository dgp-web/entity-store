import { EntityState } from "data-modeling";

export function selectEntitiesInState<TModel, TState extends EntityState<TModel> & TAttributes, TAttributes>(state: TState, payload: ReadonlyArray<string>, attributes?: TAttributes): TState {

    return {
        ...state,
        selectedIds: payload
    };

}
