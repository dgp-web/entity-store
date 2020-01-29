import {CompositeEntityActionConfig} from "./composite-entity-action-config.model";
import {EntityStateTransformationConfig} from "./entity-state-transformation-config.model";

/**
 * Configuration object for entity reducers
 */
export interface CreateEntityReducerConfig<TModel> {
    readonly compositeEntityActionConfig: CompositeEntityActionConfig;
    readonly entityStateTransformationConfig: EntityStateTransformationConfig<TModel>;
}
