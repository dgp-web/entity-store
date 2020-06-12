import { Selector } from "./selector.model";
import { KVS } from "./key-value-store.model";
import {EntityTypeMap} from "./entity-type-map.model";
import {EntityStateMap} from "./entity-state-map.model";

export interface EntitySelectors<TEntityTypeMap extends EntityTypeMap, TModel> {
    readonly getIds: Selector<EntityStateMap<TEntityTypeMap>, ReadonlyArray<string>>;
    readonly getEntities: Selector<EntityStateMap<TEntityTypeMap>, KVS<TModel>>;
    readonly getAll: Selector<EntityStateMap<TEntityTypeMap>, ReadonlyArray<TModel>>;
    readonly getFirstSelected: Selector<EntityStateMap<TEntityTypeMap>, TModel>;
    readonly isEntitySelected: Selector<EntityStateMap<TEntityTypeMap>, boolean>;
}
