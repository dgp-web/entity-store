import { EntityReducer } from "./entity-reducer.model";
import { EntityStateMap } from "./entity-state-map.model";

export type EntityReducerMap<TEntityStateMap extends EntityStateMap> = {
    [K in keyof TEntityStateMap]: EntityReducer<any, TEntityStateMap[K]>;
}
