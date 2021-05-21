import { EntityState } from "data-modeling";

/**
 * Returns all entities in a given entity state
 * as array.
 *
 * @param {EntityState<T>} state
 * @returns {T[]}
 */
export function getAll<T>(state: EntityState<T>): T[] {
    return state.ids.map(id => state.entities[id]);
}
