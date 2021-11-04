import { CompositeEntityAction } from "../../../actions";
import { parseCompositeEntityActionType } from "../parse-composite-entity-action-type.function";
import { EntityStoreTestData } from "../../__tests__/test-data";

describe("parseCompositeEntityActionType", () => {

    it("should parse the type of a CompositeEntityAction into an array of entity-action types", () => {

        const action = new CompositeEntityAction({
            add: [{
                entityType: "User",
                payload: {}
            }]
        });

        const result = parseCompositeEntityActionType(
            action.type
        );

        const expectedResult = ["[User] Add"];

        expect(result).toEqual(expectedResult);

    });

    it("should respect the passed CompositeEntityActionConfig.", () => {

        const config = EntityStoreTestData.customCompositeEntityActionConfig;

        const action = new CompositeEntityAction({
            add: [{
                entityType: "User",
                payload: {}
            }]
        }, config);

        const result = parseCompositeEntityActionType(
            action.type, config
        );

        const expectedResult = ["[User] ADD"];

        expect(result).toEqual(expectedResult);
    });

});