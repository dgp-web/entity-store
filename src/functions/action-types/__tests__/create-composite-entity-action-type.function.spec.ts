import { createCompositeEntityActionType } from "../create-composite-entity-action-type.function";

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

});