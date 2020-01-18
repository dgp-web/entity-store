import { EntityActionParams } from "./entity-action-params.model";
import { KeyValueStore } from "./key-value-store.model";
import {EntityTypeMap} from "./entity-type-map.model";

/**
 * Adds a kvs of entities to the reducer identified by the type argument
 */
export interface AddEntityActionParams<TEntityTypeMap extends EntityTypeMap> extends EntityActionParams<TEntityTypeMap> {
    readonly payload: KeyValueStore<TEntityTypeMap[keyof TEntityTypeMap]>;
}

/**
 * Removes a series of entities from the target reducer
 */
export interface RemoveEntityActionParams<TEntityTypeMap extends EntityTypeMap> extends EntityActionParams<TEntityTypeMap> {
    readonly payload: ReadonlyArray<string>;
}

/**
 * Updates a series of entities in the target reducer
 */
export interface UpdateEntityActionParams<TEntityTypeMap extends EntityTypeMap> extends EntityActionParams<TEntityTypeMap> {
    readonly payload: KeyValueStore<TEntityTypeMap[keyof TEntityTypeMap]>;
}

/**
 * Select a series of entities in the target reducer
 */
export interface SelectEntityActionParams<TEntityTypeMap extends EntityTypeMap> extends EntityActionParams<TEntityTypeMap> {
    readonly payload: ReadonlyArray<string>;
}

/**
 * Removes all entities from the target reducer
 */
export interface ClearEntityActionParams<TEntityTypeMap extends EntityTypeMap> extends EntityActionParams<TEntityTypeMap> {
}

/**
 * Replaces the entities stored in related reducers with the passed kvs
 */
export interface SetEntityActionParams<TEntityTypeMap extends EntityTypeMap> extends EntityActionParams<TEntityTypeMap> {
    readonly payload: KeyValueStore<TEntityTypeMap[keyof TEntityTypeMap]>;
}

export interface CompositeEntityActionPayload<TEntityTypeMap extends EntityTypeMap> {
    readonly add?: ReadonlyArray<AddEntityActionParams<TEntityTypeMap>>,
    readonly update?: ReadonlyArray<UpdateEntityActionParams<TEntityTypeMap>>,
    readonly remove?: ReadonlyArray<RemoveEntityActionParams<TEntityTypeMap>>,
    readonly clear?: ReadonlyArray<ClearEntityActionParams<TEntityTypeMap>>,
    readonly select?: ReadonlyArray<SelectEntityActionParams<TEntityTypeMap>>,
    readonly set?: ReadonlyArray<SetEntityActionParams<TEntityTypeMap>>
}
