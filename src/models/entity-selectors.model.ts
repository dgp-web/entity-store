import { Selector } from "./selector.model";
import { EntityStateMap, EntityTypeMap, KVS, Many } from "data-modeling";

export interface EntitySelectors<TEntityTypeMap extends EntityTypeMap, TModel> {
    readonly getIds: Selector<EntityStateMap<TEntityTypeMap>, Many<string>>;
    readonly getEntities: Selector<EntityStateMap<TEntityTypeMap>, KVS<TModel>>;
    readonly getAll: Selector<EntityStateMap<TEntityTypeMap>, Many<TModel>>;
    readonly getFirstSelected: Selector<EntityStateMap<TEntityTypeMap>, TModel>;
    readonly isEntitySelected: Selector<EntityStateMap<TEntityTypeMap>, boolean>;
}
