import { EntityReducer } from "./entity-reducer.model";
import { EntityState } from "./entity-state.model";

/**
 * The payload for createEntityReducer
 */
export interface CreateEntityReducerPayload<TEntity, TState extends EntityState<TEntity>> {
    readonly entityType: string;
    /**
     * @default createEntityState()
     */
    readonly initialState?: TState;
    readonly storeFeature?: string;
    readonly additionalReducers?: ReadonlyArray<EntityReducer<TEntity, TState>>;
}