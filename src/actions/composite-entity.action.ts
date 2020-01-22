import {
    Action,
    CompositeEntityActionConfig,
    defaultCompositeEntityActionConfig,
    CompositeEntityActionPayload, EntityTypeMap, NormalizedCompositeEntityActionPayload
} from "../models";
import {createCompositeEntityActionType} from "../functions";
import {normalizeCompositeEntityActionPayload} from "../functions/normalize-composite-entity-action-payload.function";

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
    readonly payload: NormalizedCompositeEntityActionPayload<TEntityTypeMap, TStoreFeature>;

    /**
     * A collection of entity-action payloads
     * @param {CompositeEntityActionPayload} payload
     * @param {CompositeEntityActionConfig} [config=defaultCompositeEntityActionConfig]
     */
    constructor(payload: CompositeEntityActionPayload<TEntityTypeMap, TStoreFeature>,
                readonly config: CompositeEntityActionConfig = defaultCompositeEntityActionConfig) {
        this.payload = normalizeCompositeEntityActionPayload(payload);
        this.type = createCompositeEntityActionType<TEntityTypeMap, TStoreFeature>(this.payload, config);
    }
}
