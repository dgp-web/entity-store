import { Action, CreateEntityReducerConfig, EntityReducer, EntityState } from "../models";
import { CompositeEntityAction } from "../actions";
import { createEntityState } from "./create-entity-state.function";
import { defaultCreateEntityReducerConfig } from "./default-create-entity-reducer-config.model";
import { createEntityActionTypes, parseCompositeEntityActionType, isEntityTypeIncludedInActionType, isCompositeEntityActionType } from "./action-types";

export interface CreateEntityReducerPayload<TEntity, TState extends EntityState<TEntity>> {
    readonly entityType: string;
    readonly initialState?: TState;
    readonly storeFeature?: string;
    readonly additionalReducers?: ReadonlyArray<EntityReducer<TEntity, TState>>;
}

/**
 * Creates a reducer for the specified entity type that reacts to basic operations (add, update, remove, select, set, and clear)
 */
export function createEntityReducer<TEntity, TState extends EntityState<TEntity>>(
    payload: CreateEntityReducerPayload<TEntity, TState>,
    config: CreateEntityReducerConfig<TEntity, TState> = defaultCreateEntityReducerConfig): EntityReducer<TEntity, TState> {

    const entityType = payload.entityType;
    const storeFeature = payload.storeFeature;
    let initialState = payload.initialState;
    if (initialState === null || initialState === undefined) {
        initialState = createEntityState<TEntity, TState>();
    }
    const additionalReducers = payload.additionalReducers;

    const actionTypes = createEntityActionTypes({
        entityType: entityType,
        storeFeature: storeFeature
    }, config.compositeEntityActionConfig);

    return function reducer(state: TState = initialState, action: Action, _additionalReducers: ReadonlyArray<EntityReducer<TEntity, TState>> = additionalReducers): TState {

        let reducedState: TState = state;
        if (isCompositeEntityActionType(action.type, config.compositeEntityActionConfig) && isEntityTypeIncludedInActionType({
            actionType: action.type,
            entityType: entityType
        })) {

            const compositeTypeSegments = parseCompositeEntityActionType(action.type, config.compositeEntityActionConfig);

            const compositeAction = action as CompositeEntityAction;

            if (compositeTypeSegments.some(x => x === actionTypes.clearEntityActionType)) {
                reducedState = config.entityStateTransformationConfig.clear(reducedState);
            }

            if (compositeTypeSegments.some(x => x === actionTypes.setEntityActionType)) {
                const entities = compositeAction.payload.set.find(x => x.entityType === entityType).payload;
                reducedState = config.entityStateTransformationConfig.set(reducedState, entities);
            }

            if (compositeTypeSegments.some(x => x === actionTypes.addEntityActionType)) {
                const entities = compositeAction.payload.add.find(x => x.entityType === entityType).payload;
                reducedState = config.entityStateTransformationConfig.add(reducedState, entities);
            }

            if (compositeTypeSegments.some(x => x === actionTypes.updateEntityActionType)) {
                const entities = compositeAction.payload.update.find(x => x.entityType === entityType).payload;
                reducedState = config.entityStateTransformationConfig.update(reducedState, entities);
            }

            if (compositeTypeSegments.some(x => x === actionTypes.removeEntityActionType)) {
                const ids = compositeAction.payload.remove.find(x => x.entityType === entityType).payload;
                reducedState = config.entityStateTransformationConfig.remove(reducedState, ids);
            }

            if (compositeTypeSegments.some(x => x === actionTypes.selectEntityActionType)) {
                const ids = compositeAction.payload.select.find(x => x.entityType === entityType).payload;
                reducedState = config.entityStateTransformationConfig.select(reducedState, ids);
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