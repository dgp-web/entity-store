import { getMyEntityStateWithTwoEntities, MyEntityState, secondEntity } from "../../__tests__/test-data.spec";
import { removeEntitiesFromState } from "../remove-entities-from-state.function";

describe("removeEntitiesFromState", () => {

    let state: MyEntityState;

    beforeEach(() => {
        state = getMyEntityStateWithTwoEntities();
    });

    it("should remove entities whose key is contained in the current entity state.", () => {

        const result = removeEntitiesFromState(state, [ secondEntity.id ]);
        expect(result.ids).not.toContain(secondEntity.id);

    });


});
