import { Action, CompositeEntityActionConfig, defaultCompositeEntityActionConfig, KeyValueStore, EntityActionParams } from "../models";
import { createActionTypeSegmentsForSuffix } from "../functions";

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

/**
 * Performs add, update, remove, clear, and select operations in all target reducers
 */
export class CompositeEntityAction implements Action {
    readonly type: string;

    /**
     * A collection of entity-action payloads
     */
    constructor(public readonly payload: CompositeEntityActionPayload,
                private readonly config: CompositeEntityActionConfig = defaultCompositeEntityActionConfig) {

        let _type = config.prefixes.composite + config.spacer;

        _type += createActionTypeSegmentsForSuffix(config.prefixes.add, payload.add, config);
        _type += createActionTypeSegmentsForSuffix(config.prefixes.update, payload.update, config);
        _type += createActionTypeSegmentsForSuffix(config.prefixes.remove, payload.remove, config);
        _type += createActionTypeSegmentsForSuffix(config.prefixes.select, payload.select, config);
        _type += createActionTypeSegmentsForSuffix(config.prefixes.clear, payload.clear, config);
        _type += createActionTypeSegmentsForSuffix(config.prefixes.set, payload.set, config);

        if (_type.endsWith(" | ")) {
            _type = _type.substring(0, _type.length - 3);
        }

        this.type = _type;
    }
}
