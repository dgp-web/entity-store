import { EntitySelectors, EntityState, Selector } from "../models";
import { getAll, getFirstSelected } from "./selection";

export type EntityStateSelector<TModel> = (appState: any) => EntityState<TModel>;
export type EntityStateProjector<TModel, TResult> = (state: EntityState<TModel>) => TResult;

export type EntitySelectorFactory<TModel, TResult> = (
    stateSelector: EntityStateSelector<TModel>,
    projector: EntityStateProjector<TModel, TResult>
) => Selector<EntityState<TModel>, TResult>;

export function defaultEntitySelectorFactory<TModel, TResult>(
    stateSelector: EntityStateSelector<TModel>,
    projector: EntityStateProjector<TModel, TResult>
) {
    return function (appState: any) {
        const intermediateResult = stateSelector(appState);
        return projector(intermediateResult)
    };
};

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
export function createEntitySelectors<TModel>(payload: {
    readonly stateSelector: EntityStateSelector<TModel>;
}, config: {
    readonly entitySelectorFactory: EntitySelectorFactory<TModel, any>;
} = {
    entitySelectorFactory: defaultEntitySelectorFactory
}): EntitySelectors<TModel> {


    return {
        getIds: config.entitySelectorFactory(payload.stateSelector, x => x.ids),
        getEntities: config.entitySelectorFactory(payload.stateSelector, x => x.entities),
        getAll: config.entitySelectorFactory(payload.stateSelector, getAll),

        getFirstSelected: config.entitySelectorFactory(payload.stateSelector, getFirstSelected),
        isEntitySelected: config.entitySelectorFactory(payload.stateSelector, x => {
            return !(!x.selectedIds || x.selectedIds.length === 0);
        })
    };

}
