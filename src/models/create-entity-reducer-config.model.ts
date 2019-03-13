import { CompositeEntityActionConfig } from "./composite-entity-action-config.model";
import { EntityStateTransformationConfig } from "./entity-state-transformation-config.model";

export interface CreateEntityReducerConfig<TEntity, TState> {
    readonly compositeEntityActionConfig: CompositeEntityActionConfig;
    readonly entityStateTransformationConfig: EntityStateTransformationConfig<TEntity, TState>;
}
