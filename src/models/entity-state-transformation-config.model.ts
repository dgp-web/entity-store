import { KVS } from "./key-value-store.model";

export interface EntityStateTransformationConfig<TEntity, TState> {
    readonly add: (state: TState, payload: KVS<TEntity>) => TState;
    readonly update: (state: TState, payload: KVS<Partial<TEntity>>) => TState;
    readonly remove: (state: TState, payload: ReadonlyArray<string>) => TState;
    readonly clear: (state: TState) => TState;
    readonly select: (state: TState, payload: ReadonlyArray<string>) => TState;
    readonly set: (state: TState, payload: KVS<TEntity>) => TState;
}