import { firstEntity, getMyEntityStateWithTwoEntities, MyEntityState } from "./test-data.spec";
import { selectEntitiesReducer } from "../select-entities.reducer";

describe("selectEntitiesReducer", () => {

    let state: MyEntityState;

    beforeEach(() => {
        state = getMyEntityStateWithTwoEntities();
    });

    it("should select the entities whose id is contained in the payload.", () => {

        const result = selectEntitiesReducer(state, [ firstEntity.id ]);
        expect(result.selectedIds).toEqual([firstEntity.id]);

    });


});
