import { EntityState, Many } from "data-modeling";
import { getOne } from "./get-one.function";

/**
 * Returns entities in a given entity state or null if
 * there is none.
 */
export function getMany<T>(state: EntityState<T>, ids: Many<string>): Many<T> {
    return ids.map(x => getOne(state, x));
}