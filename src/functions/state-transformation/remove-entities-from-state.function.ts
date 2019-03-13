import { EntityState } from "../../models";

export function removeEntitiesFromState<TModel, TState extends EntityState<TModel> & TAttributes, TAttributes>(state: TState, payload: ReadonlyArray<string>): TState {

    const ids = state.ids.filter(id => !payload.some(x => x === id)),
        entities = {};

    ids.forEach(id => {
        entities[id] = state.entities[id]
    });

    const selectedIds = state.selectedIds.filter(x => payload.some(y => y === x));

    return {
        ...state,
        ids: ids, 
        entities: entities, 
        selectedIds: selectedIds
    };

}