import { EntityState, KeyValueStore } from "../models";

export function setEntitiesInState<TModel, TState extends EntityState<TModel> & TAttributes, TAttributes>(state: TState, payload: KeyValueStore<TModel>): TState {

    const ids = Object.keys(payload),
        entities = payload;

    return {
        ...state,
        ids: ids, 
        entities: entities, 
        selectedIds: []
    };

}
