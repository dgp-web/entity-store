import { EntityState } from "data-modeling";

/**
 * Creates an empty entity state
 * 
 * Usually you don't have to call this yourself
 * 
 * @param {any} attributes Additional attributes you want your state to have
 * @returns {TState}
 */
export function createEntityState<TModel, TState extends EntityState<TModel> = EntityState<TModel>>(
    attributes?: any
): TState {

    const state: EntityState<TModel> = {
        ids: [],
        entities: {},
        selectedIds: []
    };

    return Object.assign(state, attributes) as TState;
}
