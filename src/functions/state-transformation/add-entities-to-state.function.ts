import { EntityState, KeyValueStore } from "data-modeling";

export function addEntitiesToState<TModel, TState extends EntityState<TModel> & TAttributes, TAttributes>(state: TState, payload: KeyValueStore<TModel>): TState {

    const newEntities = payload,
        newIds = Object.keys(newEntities),
        ids = state.ids.concat(newIds.filter(newId => state.ids.indexOf(newId) === -1)),
        entities = Object.assign({}, state.entities, newEntities);

    return {
        ...state,
        ids: ids,
        entities: entities
    };

}
