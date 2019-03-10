import { Action, CreateEntityReducerConfig, defaultCreateEntityReducerConfig, EntityReducer, EntityState } from "../models";
import { CompositeEntityAction } from "../actions";
import { addEntitiesReducer, removeEntitiesReducer, selectEntitiesReducer, setEntitiesReducer, updateEntitiesReducer } from "../reducers";
import { createEntityState } from "./create-entity-state.function";
import { createEntityActionTypes } from "./create-entity-action-types.function";

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
                reducedState = setEntitiesReducer(reducedState, entities);
            }

            if (compositeTypeSegments.some(x => x === actionTypes.addEntityActionType)) {
                const entities = compositeAction.payload.add.find(x => x.entityType === entityType).payload;
                reducedState = addEntitiesReducer(reducedState, entities);
            }

            if (compositeTypeSegments.some(x => x === actionTypes.updateEntityActionType)) {
                const entities = compositeAction.payload.update.find(x => x.entityType === entityType).payload;
                reducedState = updateEntitiesReducer(reducedState, entities);
            }

            if (compositeTypeSegments.some(x => x === actionTypes.removeEntityActionType)) {
                const entities = compositeAction.payload.remove.find(x => x.entityType === entityType).payload;
                reducedState = removeEntitiesReducer(reducedState, entities);
            }

            if (compositeTypeSegments.some(x => x === actionTypes.selectEntityActionType)) {
                const entities = compositeAction.payload.select.find(x => x.entityType === entityType).payload;
                reducedState = selectEntitiesReducer(reducedState, entities);
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