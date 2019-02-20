import { EntityState } from "../models";

/**
 * Creates an empty entity state
 * @param attributes Additional attributes you want your state to have
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