import { createCompositeEntityActionType } from "../create-composite-entity-action-type.function";
import { EntityStoreTestData } from "../../__tests__/test-data.spec";

describe("createCompositeEntityActionType", () => {

    it("should create an action type from a CompositeEntityActionPayload.", () => {

        const result = createCompositeEntityActionType({
            add: [{
                entityType: "User",
                payload: {}
            }],
            remove: [{
                entityType: "Location",
                payload: []
            }]
        });

        expect(result).toBe("[Composite] [User] Add | [Location] Remove");

    });

    it("should respect the passed CompositeEntityActionConfig.", () => {

        const config = EntityStoreTestData.customCompositeEntityActionConfig;

        const result = createCompositeEntityActionType({
            add: [{
                entityType: "User",
                payload: {}
            }],
            remove: [{
                entityType: "Location",
                payload: []
            }]
        }, config);

        expect(result).toBe("MyCompositeType_[User] ADD_/_[Location] REMOVE");

    });

});