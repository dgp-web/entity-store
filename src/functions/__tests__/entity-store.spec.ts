import { EntityStateMap } from "../../models";
import { createEntityStore } from "../create-entity-store.function";
import { composeEntityActions } from "../compose-entity-actions.function";
import { CompositeEntityAction } from "../../actions";

interface TestModel {
    readonly label: string;
}

interface AppStoreSchema {
    readonly test: TestModel;
}

// creating an AppState based on entities is simple.
// just extend EntityStateMap
interface AppState extends EntityStateMap<AppStoreSchema> {

}

const appState: AppState = null;

const testType = "test";
type MyStoreFeature = "myStoreFeature";

const store = createEntityStore<AppStoreSchema, "abc">({
    entityTypes: [testType],
    storeFeature: "abc"
});

const action = store.actions.composeEntityActions({
    add: [{
        entityType: "test",
        payload: {
            "testId01": {
                label: "Bier"
            }
        },
        storeFeature: "abc"
    }]
});

/**
 * It would be interesting to have
 *
 */
