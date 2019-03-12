import { Action, CreateEntityReducerConfig, defaultCreateEntityReducerConfig, EntityReducer, EntityState } from "../models";
import { CompositeEntityAction } from "../actions";
import { createEntityState } from "./create-entity-state.function";
import { createEntityActionTypes } from "./create-entity-action-types.function";
import { setEntitiesInState } from "./set-entities-in-state.function";
import { addEntitiesToState } from "./add-entities-to-state.function";
import { updateEntitiesInState } from "./update-entities-in-state.function";
import { removeEntitiesFromState } from "./remove-entities-from-state.function";
import { selectEntitiesInState } from "./select-entities-in-state.function";

export interface CreateEntityReducerPayload<TEntity, TState extends EntityState<TEntity> & TAttributes, TAttributes> {
    readonly entityType: string;
    readonly initialState?: TState;
    readonly storeFeature?: string;
    readonly additionalReducers?: ReadonlyArray<EntityReducer<TEntity, TState, TAttributes>>;
}

/**
 * Creates a reducer for the specified entity type that reacts to basic operations (add, update, remove, select, set, and clear)
 */
export function createEntityReducer<TEntity, TState extends EntityState<TEntity> & TAttributes, TAttributes>(
    payload: CreateEntityReducerPayload<TEntity, TState, TAttributes>,
    config: CreateEntityReducerConfig = defaultCreateEntityReducerConfig): EntityReducer<TEntity, TState, TAttributes> {

    const entityType = payload.entityType;
    const storeFeature = payload.storeFeature;
    let initialState = payload.initialState;
    if (initialState === null || initialState === undefined) {
        initialState = createEntityState<TEntity, TState>();
    }
    const additionalReducers = payload.additionalReducers;
    const prefixes = config.compositeEntityActionConfig.prefixes;
    const compositeEntityActionSeparator = config.compositeEntityActionConfig.separator;

    const actionTypes = createEntityActionTypes({
        entityType: entityType,
        storeFeature: storeFeature
    }, config.compositeEntityActionConfig);

    return function reducer(state: TState = initialState, action: Action, _additionalReducers: ReadonlyArray<EntityReducer<TEntity, TState, TAttributes>> = additionalReducers): TState {

        let reducedState: TState = state;
        if (action.type.includes(prefixes.composite) && action.type.includes(entityType)) {

            const compositeTypeSegments = action.type
                .replace(prefixes.composite + config.compositeEntityActionConfig.spacer, "")
                .split(compositeEntityActionSeparator);

            const compositeAction = action as CompositeEntityAction;

            if (compositeTypeSegments.some(x => x === actionTypes.clearEntityActionType)) {
                reducedState = Object.assign({}, reducedState, createEntityState());
            }

            if (compositeTypeSegments.some(x => x === actionTypes.setEntityActionType)) {
                const entities = compositeAction.payload.set.find(x => x.entityType === entityType).payload;
                reducedState = setEntitiesInState(reducedState, entities);
            }

            if (compositeTypeSegments.some(x => x === actionTypes.addEntityActionType)) {
                const entities = compositeAction.payload.add.find(x => x.entityType === entityType).payload;
                reducedState = addEntitiesToState(reducedState, entities);
            }

            if (compositeTypeSegments.some(x => x === actionTypes.updateEntityActionType)) {
                const entities = compositeAction.payload.update.find(x => x.entityType === entityType).payload;
                reducedState = updateEntitiesInState(reducedState, entities);
            }

            if (compositeTypeSegments.some(x => x === actionTypes.removeEntityActionType)) {
                const ids = compositeAction.payload.remove.find(x => x.entityType === entityType).payload;
                reducedState = removeEntitiesFromState(reducedState, ids);
            }

            if (compositeTypeSegments.some(x => x === actionTypes.selectEntityActionType)) {
                const ids = compositeAction.payload.select.find(x => x.entityType === entityType).payload;
                reducedState = selectEntitiesInState(reducedState, ids);
            }

        }

        if (_additionalReducers) {
            _additionalReducers.forEach(additionalReducer => {
                reducedState = additionalReducer(reducedState, action);
            });
        }

        return reducedState;
    }

}