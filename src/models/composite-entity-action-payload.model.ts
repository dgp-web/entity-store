import { EntityActionParams } from "./entity-action-params.model";
import { KeyValueStore } from "./key-value-store.model";

/**
 * Adds a kvs of entities to the reducer identified by the type argument
 */
export interface AddEntityActionParams extends EntityActionParams {
    readonly payload: KeyValueStore<any>;
}

/**
 * Removes a series of entities from the target reducer
 */
export interface RemoveEntityActionParams extends EntityActionParams {
    readonly payload: ReadonlyArray<string>;
}

/**
 * Updates a series of entities in the target reducer
 */
export interface UpdateEntityActionParams extends EntityActionParams {
    readonly payload: KeyValueStore<any>;
}

/**
 * Select a series of entities in the target reducer
 */
export interface SelectEntityActionParams extends EntityActionParams {
    readonly payload: ReadonlyArray<string>;
}

/**
 * Removes all entities from the target reducer
 */
export interface ClearEntityActionParams extends EntityActionParams {
}

/**
 * Replaces the entities stored in related reducers with the passed kvs
 */
export interface SetEntityActionParams extends EntityActionParams {
    readonly payload: KeyValueStore<any>;
}

export interface CompositeEntityActionPayload {
    readonly add?: ReadonlyArray<AddEntityActionParams>,
    readonly update?: ReadonlyArray<UpdateEntityActionParams>,
    readonly remove?: ReadonlyArray<RemoveEntityActionParams>,
    readonly clear?: ReadonlyArray<ClearEntityActionParams>,
    readonly select?: ReadonlyArray<SelectEntityActionParams>,
    readonly set?: ReadonlyArray<SetEntityActionParams>
}
