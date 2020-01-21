import { EntityActionParams } from "./entity-action-params.model";
import { KeyValueStore } from "./key-value-store.model";
import {EntityTypeMap} from "./entity-type-map.model";
import {EntityState} from "./entity-state.model";

/**
 * Adds a kvs of entities to the reducer identified by the type argument
 */
export interface AddEntityActionParams<TEntityTypeMap extends EntityTypeMap, TStoreFeature> extends EntityActionParams<TEntityTypeMap, TStoreFeature> {
    readonly payload: KeyValueStore<TEntityTypeMap[keyof TEntityTypeMap]>;
}

/**
 * Removes a series of entities from the target reducer
 */
export interface RemoveEntityActionParams<TEntityTypeMap extends EntityTypeMap, TStoreFeature> extends EntityActionParams<TEntityTypeMap, TStoreFeature> {
    readonly payload: ReadonlyArray<string>;
}

/**
 * Updates a series of entities in the target reducer
 */
export interface UpdateEntityActionParams<TEntityTypeMap extends EntityTypeMap, TStoreFeature> extends EntityActionParams<TEntityTypeMap, TStoreFeature> {
    readonly payload: KeyValueStore<TEntityTypeMap[keyof TEntityTypeMap]>;
}

/**
 * Select a series of entities in the target reducer
 */
export interface SelectEntityActionParams<TEntityTypeMap extends EntityTypeMap, TStoreFeature> extends EntityActionParams<TEntityTypeMap, TStoreFeature> {
    readonly payload: ReadonlyArray<string>;
}

/**
 * Removes all entities from the target reducer
 */
export interface ClearEntityActionParams<TEntityTypeMap extends EntityTypeMap, TStoreFeature> extends EntityActionParams<TEntityTypeMap, TStoreFeature> {
}

/**
 * Replaces the entities stored in related reducers with the passed kvs
 */
export interface SetEntityActionParams<TEntityTypeMap extends EntityTypeMap, TStoreFeature> extends EntityActionParams<TEntityTypeMap, TStoreFeature> {
    readonly payload: KeyValueStore<TEntityTypeMap[keyof TEntityTypeMap]>;
}

export type SetEntityActionParamsMap<TEntityTypeMap extends EntityTypeMap, TStoreFeature> = {
    readonly [K in keyof TEntityTypeMap]?: KeyValueStore<TEntityTypeMap[K]>;
}

export interface CompositeEntityActionPayload<TEntityTypeMap extends EntityTypeMap, TStoreFeature> {
    readonly add?: ReadonlyArray<AddEntityActionParams<TEntityTypeMap, TStoreFeature>>;
    readonly update?: ReadonlyArray<UpdateEntityActionParams<TEntityTypeMap, TStoreFeature>>;
    readonly remove?: ReadonlyArray<RemoveEntityActionParams<TEntityTypeMap, TStoreFeature>>;
    readonly clear?: ReadonlyArray<ClearEntityActionParams<TEntityTypeMap, TStoreFeature>>;
    readonly select?: ReadonlyArray<SelectEntityActionParams<TEntityTypeMap, TStoreFeature>>;
    readonly set?: ReadonlyArray<SetEntityActionParams<TEntityTypeMap, TStoreFeature>>
        | SetEntityActionParamsMap<TEntityTypeMap, TStoreFeature>;
}
/*

const payload: CompositeEntityActionPayload<{ a: { label: string }, b: { title: string } }, null> = {
    set: {
        a: {
            "myId": {
                label: ""
            }
        }
    }
};
*/
