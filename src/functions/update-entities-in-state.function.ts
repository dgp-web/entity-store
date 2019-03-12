import { EntityState, KeyValueStore } from "../models";
import { assignAttributesToState } from "./assign-attributes-to-state.function";

export function updateEntitiesInState<TModel, TState extends EntityState<TModel> & TAttributes, TAttributes>(state: TState, payload: KeyValueStore<Partial<TModel>>, attributes?: TAttributes): TState {

    const updatedEntities = {};
    const ids = Object.keys(payload);

    ids.forEach(id => {
        updatedEntities[id] = Object.assign({}, state.entities[id], payload[id]);
    });

    const entities = Object.assign({}, state.entities, updatedEntities);

    let result = Object.assign({}, state, { entities: entities }, attributes) as TState;
    result = assignAttributesToState(result, attributes) as TState;
    return result;
}