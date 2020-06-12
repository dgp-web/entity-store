import {EntitySelectors, EntityTypeMap} from "../models";
import {getAll, getFirstSelected} from "./selection";

/**
 * Creates selectors based on the passed root selector
 */
export function createEntitySelectors<TEntityTypeMap extends EntityTypeMap, TModel>(payload: {
    readonly entityType: keyof TEntityTypeMap;
}): EntitySelectors<TEntityTypeMap, TModel> {

    return {
        getIds: x => x[payload.entityType].ids,
        getEntities: x => x[payload.entityType].entities,
        getAll: x => getAll(x[payload.entityType]),
        getFirstSelected: x => getFirstSelected(x[payload.entityType]),
        isEntitySelected: x => {
            return !(!x[payload.entityType].selectedIds || x[payload.entityType].selectedIds.length === 0);
        }
    };

}
