import { CompositeEntityActionConfig, defaultCompositeEntityActionConfig } from "./composite-entity-action-config.model";
import { EntityOperationConfig } from "./entity-operation-config.model";

export interface CreateEntityReducerConfig<TEntity, TState> {
    readonly compositeEntityActionConfig: CompositeEntityActionConfig;
    readonly entityOperationConfig: EntityOperationConfig<TEntity, TState>;
}
