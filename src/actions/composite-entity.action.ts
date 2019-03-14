import { Action, CompositeEntityActionConfig, defaultCompositeEntityActionConfig, CompositeEntityActionPayload } from "../models";
import { createCompositeEntityActionType } from "../functions";

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
export class CompositeEntityAction implements Action {
    readonly type: string;

    /**
     * A collection of entity-action payloads
     * @param {CompositeEntityActionPayload} payload
     * @param {CompositeEntityActionConfig} [config=defaultCompositeEntityActionConfig]
     */
    constructor(public readonly payload: CompositeEntityActionPayload,
                private config: CompositeEntityActionConfig = defaultCompositeEntityActionConfig) {
        this.type = createCompositeEntityActionType(payload, config);
    }
}
