import { getMyEntityStateWithTwoEntities, MyEntityState, secondEntity } from "./test-data.spec";
import { removeEntitiesReducer } from "../remove-entities.reducer";

describe("RemoveEntitiesReducer", () => {

    let state: MyEntityState;

    beforeEach(() => {
        state = getMyEntityStateWithTwoEntities();
    });

    it("should remove entities whose key is contained in the current entity state.", () => {

        const result = removeEntitiesReducer(state, [ secondEntity.id ]);
        expect(result.ids).not.toContain(secondEntity.id);

    });


});
