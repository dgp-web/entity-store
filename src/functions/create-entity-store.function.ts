import {EntityStateMap, EntityStore, EntityTypeMap} from "../models";
import {createEntityReducers} from "./create-entity-reducers.function";

/**
 * Creates an entity store with reducers and selectors based on a given
 * set of entity types
 */
export function createEntityStore<TEntityTypeMap extends EntityTypeMap>(payload: {
    readonly entityTypes: ReadonlyArray<keyof TEntityTypeMap>;
}): EntityStore<TEntityTypeMap> {

    const reducers = createEntityReducers(payload);

    return {
        reducers
    };

}

/*
export interface TestModel {
    readonly label: string;
}

export interface TestStoreSchema {
    readonly tests: TestModel;
}

export interface AppState extends EntityStateMap<TestStoreSchema> {

}

const testType = "tests";

const store = createEntityStore<TestStoreSchema>({entityTypes: [testType]});
*/
