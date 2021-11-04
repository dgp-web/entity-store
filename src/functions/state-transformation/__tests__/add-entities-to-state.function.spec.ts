import { addEntitiesToState } from "../add-entities-to-state.function";
import {
    getMyEntityStateWithTwoEntities,
    MyEntity,
    MyEntityState,
    secondEntity,
    thirdEntity
} from "../../__tests__/test-data";
import { KeyValueStore } from "data-modeling";

describe("addEntitiesToState", () => {

    let state: MyEntityState;

    beforeEach(() => {
        state = getMyEntityStateWithTwoEntities();
    });

    it("should add entities whose key is not contained in a given entity state to this state.", () => {

        const payload: KeyValueStore<MyEntity> = {[thirdEntity.id]: thirdEntity};

        const result = addEntitiesToState(state, payload);
        expect(result.ids.length).toEqual(3);
        expect(result.ids).toContain("3");
        expect(result.entities["3"]).toEqual({id: "3", myAttribute: "I am the third entity."});

    });

    it("should override entities whose key is already contained in a given entity state.", () => {

        const payload: KeyValueStore<MyEntity> = {[secondEntity.id]: null};

        const result = addEntitiesToState(state, payload);
        expect(result.ids).toEqual(state.ids);
        expect(result.entities[secondEntity.id]).toEqual(null);

    });


});
