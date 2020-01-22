import {
    Action,
    CompositeEntityActionConfig,
    defaultCompositeEntityActionConfig,
    EntityTypeMap, NormalizedCompositeEntityActionPayload
} from "../models";
import {createCompositeEntityActionType} from "../functions";

/**
 * Performs add, update, remove, clear, and select operations in all target reducers
 *
 * @example
 * import { CompositeEntityAction } from "entity-store";
 *
 * // Action that adds user Jason to store and updates
 * // the location01's label
 * const action = new CompositeEntityAction({
 *     add: [{
 *         entityType: "User",
 *         payload: {
 *              user01: {
 *                  id: "user01",
 *                  label: "Jason"
 *              }
 *         }
 *     }],
 *     update: [{
 *         entityType: "Location",
 *         storeFeature: "LocationManager",
 *         payload: {
 *              location01: {
 *                  label: "Jason's new home"
 *              }
 *         }
 *     }]
 * });
 */
export class CompositeEntityAction<TEntityTypeMap extends EntityTypeMap = { [key: string]: any }, TStoreFeature = string> implements Action {
    readonly type: string;

    /**
     * A collection of entity-action payloads
     */
    constructor(public readonly payload: NormalizedCompositeEntityActionPayload<TEntityTypeMap, TStoreFeature>,
                readonly config: CompositeEntityActionConfig = defaultCompositeEntityActionConfig) {
        this.type = createCompositeEntityActionType<TEntityTypeMap, TStoreFeature>(this.payload, config);
    }
}
