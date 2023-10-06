import { EntityState } from "data-modeling";

/**
 * Returns an entity in a given entity state or null if
 * there is none.
 */
export function getOne<T>(state: EntityState<T>, id: string): T {
    return state.entities[id];
}