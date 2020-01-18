import {EntityStore, EntityTypeMap} from "../models";
import {createEntityReducers} from "./create-entity-reducers.function";
import {composeEntityActions} from "./compose-entity-actions.function";

/**
 * Creates an entity store with reducers and selectors based on a given
 * set of entity types
 */
export function createEntityStore<TEntityTypeMap extends EntityTypeMap>(payload: {
    readonly entityTypes: ReadonlyArray<keyof TEntityTypeMap>;
}): EntityStore<TEntityTypeMap> {

    return {
        reducers: createEntityReducers(payload),
        actions: {
            composeEntityActions
        }
    };

}

