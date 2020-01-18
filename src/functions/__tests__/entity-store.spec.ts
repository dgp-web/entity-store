import {EntityStateMap} from "../../models";
import {createEntityStore} from "../create-entity-store.function";
import {composeEntityActions} from "../../actions";

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

const store = createEntityStore<AppStoreSchema>({entityTypes: [testType]});

const action = composeEntityActions<AppStoreSchema>({
    add: [{
        entityType: "test",
        payload: {
            "testId01": {
                label: "Bier"
            }
        }
    }]
});

/**
 * It would be interesting to have
 *
 */
