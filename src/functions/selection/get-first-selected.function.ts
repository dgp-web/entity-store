import { EntityState } from "data-modeling";
import { isNullOrUndefined } from "util";

/**
 * Returns the first selected entity
 * in a given entity state or null if
 * there is none.
 *
 * Useful when using the entity
 * store for selection models.
 *
 * @param {EntityState<T>} state
 * @returns {T}
 */
export function getFirstSelected<T>(state: EntityState<T>): T {
    const firstSelected = state.selectedIds.map(id => state.entities[id])[0];

    if (isNullOrUndefined(firstSelected)) return null;

    return firstSelected;
}
