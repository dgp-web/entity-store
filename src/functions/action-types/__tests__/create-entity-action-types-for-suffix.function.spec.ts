import { createEntityActionTypesForSuffix } from "../create-entity-action-type-for-suffix.function";

describe("createEntityActionTypesForSuffix", () => {

    it("should create a string that includes concatenated entity-action types for a given suffix.", () => {

        const result = createEntityActionTypesForSuffix(
            "Add", 
            [{
                entityType: "User"
            }, {
                entityType: "Location"
            }]
        );

        
        expect(result).toBe("[User] Add | [Location] Add | ");

    });

    xit("should respect the passed CompositeEntityActionConfig.", () => {

    });

});