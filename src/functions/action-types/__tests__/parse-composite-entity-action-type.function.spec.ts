import { CompositeEntityAction } from "../../../actions";
import { parseCompositeEntityActionType } from "../parse-composite-entity-action-type.function";

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

});