import {EntityReducerMap} from "../models";
import {EntityTypeMap} from "../models/entity-type-map.model";
import {Reducer} from "../models/reducer.model";
import {EntityStateMap} from "data-modeling";

export function createCompositeEntityReducer<TEntityStateMap extends EntityStateMap<TEntityTypeMap>, TEntityTypeMap extends EntityTypeMap>(
    entityReducerMap: EntityReducerMap<EntityStateMap<TEntityTypeMap>, TEntityTypeMap>
): Reducer<TEntityStateMap> {

    return (state, action) => {

        Object.keys(entityReducerMap).forEach(entity => {
            const reducer = entityReducerMap[entity];
            state = {
                ...state,
                [entity]: reducer(state[entity], action)
            };
        });

        return state;
    };

}
