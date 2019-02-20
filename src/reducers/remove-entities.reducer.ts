import { EntityState } from "../models";
import { entitiesReducer } from "./entities.reducer";

export function removeEntitiesReducer<TModel, TState extends EntityState<TModel> & TAttributes, TAttributes>(state: TState, payload: ReadonlyArray<string>, attributes?: TAttributes): TState {

    const ids = state.ids.filter(id => !payload.some(x => x === id)),
        entities = {};

    ids.forEach(id => {
        entities[id] = state.entities[id]
    });

    const selectedIds = state.selectedIds.filter(x => payload.some(y => y === x));

    let result = Object.assign({}, state, {ids: ids, entities: entities, selectedIds: selectedIds}) as TState;
    result = entitiesReducer(result, attributes) as TState;
    return result;
}