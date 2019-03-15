/**
 * The types that a reducer created with createEntityReducer
 * reacts to.
 */
export interface EntityActionTypes {
    readonly addEntityActionType: string;
    readonly updateEntityActionType: string;
    readonly removeEntityActionType: string;

    readonly clearEntityActionType: string;
    readonly setEntityActionType: string;
    readonly selectEntityActionType: string;
}