import { createEntityActionTypesForSuffix } from "../create-entity-action-type-for-suffix.function";
import { EntityStoreTestData } from "../../__tests__/test-data.spec";

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

    it("should respect the passed CompositeEntityActionConfig.", () => {

        const config = EntityStoreTestData.customCompositeEntityActionConfig;

        const result = createEntityActionTypesForSuffix(
            config.prefixes.add, 
            [{
                entityType: "User"
            }, {
                entityType: "Location"
            }],
            config
        );

        
        expect(result).toBe("[User] ADD_/_[Location] ADD_/_");

    });

});