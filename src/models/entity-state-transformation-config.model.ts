import { KVS } from "./key-value-store.model";
import {EntityState} from "./entity-state.model";

export interface AddEntitiesSignature<TModel> {
    (state: EntityState<TModel>, payload: KVS<TModel>): EntityState<TModel>;
}

export interface UpdateEntitiesSignature<TModel> {
    (state: EntityState<TModel>, payload: KVS<Partial<TModel>>): EntityState<TModel>;
}

export interface RemoveEntitiesSignature<TModel> {
    (state: EntityState<TModel>, payload: ReadonlyArray<string>): EntityState<TModel>;
}

export interface ClearEntitiesSignature<TModel> {
    (state: EntityState<TModel>): EntityState<TModel>;
}

export interface SelectEntitiesSignature<TModel> {
    (state: EntityState<TModel>, payload: ReadonlyArray<string>): EntityState<TModel>;
}

export interface SetEntitiesSignature<TModel> {
    (state: EntityState<TModel>, payload: KVS<TModel>): EntityState<TModel>;
}

/**
 * Describes how an entity-state is transformed
 * by entity actions.
 */
export interface EntityStateTransformationConfig<TModel> {
    readonly add: AddEntitiesSignature<TModel>;
    readonly update: UpdateEntitiesSignature<TModel>;
    readonly remove: RemoveEntitiesSignature<TModel>;
    readonly clear: ClearEntitiesSignature<TModel>;
    readonly select:SelectEntitiesSignature<TModel>;
    readonly set: SetEntitiesSignature<TModel>;
}
