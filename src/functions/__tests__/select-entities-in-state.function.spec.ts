import { firstEntity, getMyEntityStateWithTwoEntities, MyEntityState } from "./test-data.spec";
import { selectEntitiesInState } from "../select-entities-in-state.function";

describe("selectEntitiesInState", () => {

    let state: MyEntityState;

    beforeEach(() => {
        state = getMyEntityStateWithTwoEntities();
    });

    it("should select the entities whose id is contained in the payload.", () => {

        const result = selectEntitiesInState(state, [ firstEntity.id ]);
        expect(result.selectedIds).toEqual([firstEntity.id]);

    });


});
