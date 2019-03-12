import { EntityState, KeyValueStore } from "../../models";
import { getMyEntityStateWithTwoEntities, MyEntity, secondEntity } from "./test-data.spec";
import { setEntitiesInState } from "../set-entities-in-state.function";

describe("setEntitiesInState", () => {

    let state: EntityState<any>;

    beforeEach(() => {
        state = getMyEntityStateWithTwoEntities();
    });

    it("should replace the currently set entities with the payload.", () => {

        const payload: KeyValueStore<Partial<MyEntity>> = { [secondEntity.id]: secondEntity };

        const result = setEntitiesInState(state, payload);
        expect(result.ids[0]).toBe(secondEntity.id);
        expect(result.entities[secondEntity.id]).toBe(secondEntity);


    });


}); 
