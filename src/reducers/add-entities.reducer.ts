import { EntityState, KeyValueStore } from "../models";
import { entitiesReducer } from "./entities.reducer";

export function addEntitiesReducer<TModel, TState extends EntityState<TModel> & TAttributes, TAttributes>(state: TState, payload: KeyValueStore<TModel>, attributes?: TAttributes): TState {

    const newEntities = payload,
        newIds = Object.keys(newEntities),
        ids = state.ids.concat(newIds.filter(newId => state.ids.indexOf(newId) === -1)),
        entities = Object.assign({}, state.entities, newEntities);

    let result =  Object.assign({}, state, { ids: ids, entities: entities, selectedIds: state.selectedIds }) as TState;
    result = entitiesReducer(result, attributes) as TState;
    return result;
}
