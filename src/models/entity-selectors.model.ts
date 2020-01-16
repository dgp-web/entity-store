import { Selector } from "reselect";
import { EntityState } from "./entity-state.model";
import { KVS } from "./key-value-store.model";

export interface EntitySelectors<TModel, TState extends EntityState<TModel> = EntityState<TModel>> {
    readonly getIds: Selector<TState, ReadonlyArray<string>>
    readonly getEntities: Selector<TState, KVS<TModel>>
    readonly getAll: Selector<TState, ReadonlyArray<TModel>>;
    readonly getFirstSelected: Selector<TState, TModel>;
    readonly isEntitySelected: Selector<TState, boolean>;
}
