import { createEntityReducer } from "./create-entity-reducer.function";
import { createEntitySelectors } from "./create-entity-selectors.function";
import { EntityReducerMap, EntitySelectorMap, EntityStateMap, EntityStore, EntityTypeMap } from "../models";

/**
 * Creates an entity store with reducers and selectors based on a given
 * set of entity types
 */
export function createEntityStore<TEntityTypeMap extends EntityTypeMap>(payload: {
    readonly entityTypes: ReadonlyArray<keyof TEntityTypeMap>;
}): EntityStore<TEntityTypeMap> {

    const reducers: EntityReducerMap<EntityStateMap<TEntityTypeMap>, TEntityTypeMap> = {} as any;
    payload.entityTypes.forEach(entityType => {
        reducers[entityType] = createEntityReducer({entityType: entityType as string}) as any;
    });

    const selectors: EntitySelectorMap<EntityStateMap<TEntityTypeMap>, TEntityTypeMap> = {} as any;

    Object.keys(reducers).forEach(key => {
        (selectors as any)[key] = createEntitySelectors({
            stateSelector: (state: any) => state[key]
        }) as any;
    });

    return {
        reducers, selectors
    };

}

/*
export interface TestModel {
   readonly label: string;
}

export interface TestStoreSchema {
   readonly tests: TestModel;
}

const testType = "tests";

const store = createEntityStore<TestStoreSchema>({entityTypes: [testType]});
*/


