import { EntityState, KeyValueStore } from "../models";
import { entitiesReducer } from "./entities.reducer";

export function setEntitiesReducer<TModel, TState extends EntityState<TModel> & TAttributes, TAttributes>(state: TState, payload: KeyValueStore<TModel>, attributes?: TAttributes): TState {

    const ids = Object.keys(payload),
        entities = payload;

    let result = Object.assign({}, state, {ids: ids, entities: entities, selectedIds: []}) as any;
    result = entitiesReducer(result, attributes) as TState;
    return result;
}
