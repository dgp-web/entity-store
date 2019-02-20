import { KeyValueStore } from "../../models";
import { getMyEntityStateWithTwoEntities, MyEntity, MyEntityState, secondEntity } from "./test-data.spec";
import { updateEntitiesReducer } from "../update-entities.reducer";

describe("updateEntitiesReducer", () => {

    let state: MyEntityState;

    beforeEach(() => {
        state = getMyEntityStateWithTwoEntities();
    });

    it("should update entities whose key is not contained in a given entity state.", () => {

        const payload: KeyValueStore<Partial<MyEntity>> = { [secondEntity.id]: { myAttribute: "I am the new value of second entity." } };

        const result = updateEntitiesReducer(state, payload);
        expect(result.entities[secondEntity.id].myAttribute).toEqual("I am the new value of second entity.");


    });


});
