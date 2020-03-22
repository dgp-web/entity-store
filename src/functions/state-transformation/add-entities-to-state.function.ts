import { EntityState, KeyValueStore } from "../../models";

export function addEntitiesToState<TModel>(state: EntityState<TModel>, payload: KeyValueStore<TModel>): EntityState<TModel> {

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
