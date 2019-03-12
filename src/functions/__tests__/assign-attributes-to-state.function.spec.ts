import { getMyEntityStateWithTwoEntities, MyEntityState } from "./test-data.spec";
import { assignAttributesToState } from "../assign-attributes-to-state.function";

describe("assignAttributesToState", () => {

    let state: MyEntityState;

    beforeEach(() => {
        state = getMyEntityStateWithTwoEntities();
    });

    it("should assign additional attributes to an entity state when those are passed as argument.", () => {

        const result = assignAttributesToState(state, {myAdditionalAttribute: "myAdditionalValue"});
        expect(result.hasOwnProperty("myAdditionalAttribute"))
            .toBeTruthy();

    });


});
