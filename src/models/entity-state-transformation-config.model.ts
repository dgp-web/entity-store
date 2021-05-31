import { KVS } from "data-modeling";

/**
 * Describes how an entity-state is transformed
 * by entity actions.
 */
export interface EntityStateTransformationConfig<TEntity, TState> {
    readonly add: (state: TState, payload: KVS<TEntity>) => TState;
    readonly update: (state: TState, payload: KVS<Partial<TEntity>>) => TState;
    readonly remove: (state: TState, payload: ReadonlyArray<string>) => TState;
    readonly clear: (state: TState) => TState;
    readonly select: (state: TState, payload: ReadonlyArray<string>) => TState;
    readonly set: (state: TState, payload: KVS<TEntity>) => TState;
}
