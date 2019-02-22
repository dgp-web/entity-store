import { EntityState } from "../models";

/**
 * Returns all entities in a given entity state
 * as array.
 *
 * @param state
 */
export function getAll<T>(state: EntityState<T>): T[] {
    return state.ids.map(id => state.entities[id]);
}