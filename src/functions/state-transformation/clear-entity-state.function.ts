import { EntityState } from "data-modeling";

export function clearEntityState<TModel, TState extends EntityState<TModel> & TAttributes, TAttributes>(state: TState): TState {
    return {
        ...state,
        ids: [],
        entities: {},
        selectedIds: []
    };
}
