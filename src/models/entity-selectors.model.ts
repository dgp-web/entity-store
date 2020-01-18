import { Selector } from "./selector.model";
import { EntityState } from "./entity-state.model";
import { KVS } from "./key-value-store.model";

export interface EntitySelectors<TModel> {
    readonly getIds: Selector<EntityState<TModel>, ReadonlyArray<string>>;
    readonly getEntities: Selector<EntityState<TModel>, KVS<TModel>>;
    readonly getAll: Selector<EntityState<TModel>, ReadonlyArray<TModel>>;
    readonly getFirstSelected: Selector<EntityState<TModel>, TModel>;
    readonly isEntitySelected: Selector<EntityState<TModel>, boolean>;
}
