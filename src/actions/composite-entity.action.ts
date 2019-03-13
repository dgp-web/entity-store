import { Action, CompositeEntityActionConfig, defaultCompositeEntityActionConfig, CompositeEntityActionPayload } from "../models";
import { createCompositeEntityActionType } from "../functions";

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
        this.type = createCompositeEntityActionType(payload, config);
    }
}
