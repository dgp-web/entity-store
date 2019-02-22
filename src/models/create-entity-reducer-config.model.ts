import { CompositeEntityActionConfig, defaultCompositeEntityActionConfig } from "./composite-entity-action-config.model";

export interface CreateEntityReducerConfig {
    readonly compositeEntityActionConfig: CompositeEntityActionConfig;
}

export const defaultCreateEntityReducerConfig: CreateEntityReducerConfig = {
    compositeEntityActionConfig: defaultCompositeEntityActionConfig
};