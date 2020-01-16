import { createSelector } from "reselect";
import { EntitySelectors, EntityState } from "../models";
import { getAll, getFirstSelected } from "./selection";

/**
 * Creates selectors based on the passed root selector
 *
 * @example
 * // Create entity selectors
 * import { createEntitySelectors } from "entity-store";
 * import { getUserState } from "../selectors";
 *
 * const userSelectors = createEntitySelectors({
 *     stateSelector: getUserState
 * });
 */
export function createEntitySelectors<TModel, TState extends EntityState<TModel> = EntityState<TModel>>(payload: {
    readonly stateSelector: (appState: any) => TState;
}): EntitySelectors<TModel> {

    return {
        getIds: createSelector(payload.stateSelector, x => x.ids),
        getEntities: createSelector(payload.stateSelector, x => x.entities),
        getAll: createSelector(payload.stateSelector, getAll),

        getFirstSelected: createSelector(payload.stateSelector, getFirstSelected),
        isEntitySelected: createSelector(payload.stateSelector, x => {
            return !(!x.selectedIds || x.selectedIds.length === 0);
        })
    };

}
