import { getMyEntityStateWithTwoEntities, MyEntityState } from "./test-data.spec";
import { entitiesReducer } from "../entities.reducer";


describe("entitiesReducer", () => {

    let state: MyEntityState;

    beforeEach(() => {
        state = getMyEntityStateWithTwoEntities();
    });

    it("should assign additional attributes to an entity state when those are passed as argument.", () => {

        const result = entitiesReducer(state, {myAdditionalAttribute: "myAdditionalValue"});
        expect(result.hasOwnProperty("myAdditionalAttribute"))
            .toBeTruthy();

    });


});
