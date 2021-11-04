import { getMyEntityStateWithTwoEntities, MyEntity, MyEntityState, secondEntity } from "../../__tests__/test-data";
import { updateEntitiesInState } from "../update-entities-in-state.function";
import { KeyValueStore } from "data-modeling";

describe("updateEntitiesInState", () => {

    let state: MyEntityState;

    beforeEach(() => {
        state = getMyEntityStateWithTwoEntities();
    });

    it("should update entities whose key is not contained in a given entity state.", () => {

        const payload: KeyValueStore<Partial<MyEntity>> = {[secondEntity.id]: {myAttribute: "I am the new value of second entity."}};

        const result = updateEntitiesInState(state, payload);
        expect(result.entities[secondEntity.id].myAttribute).toEqual("I am the new value of second entity.");


    });


});
