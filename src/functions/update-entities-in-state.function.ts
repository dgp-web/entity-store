import { EntityState, KeyValueStore } from "../models";

export function updateEntitiesInState<TModel, TState extends EntityState<TModel> & TAttributes, TAttributes>(state: TState, payload: KeyValueStore<Partial<TModel>>): TState {

    const updatedEntities = {};
    const ids = Object.keys(payload);

    ids.forEach(id => {
        updatedEntities[id] = Object.assign({}, state.entities[id], payload[id]);
    });

    const entities = Object.assign({}, state.entities, updatedEntities);

    return {
        ...state,
        entities: entities
    };

}