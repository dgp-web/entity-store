import { EntityState } from "data-modeling";
import { getMany } from "../get-many.function";

describe("getMany", () => {

    const id = "1";

    it("should return entities included in an entity state.", () => {

        const state: EntityState<{}> = {
            ids: [id, "2"],
            entities: {
                [id]: {id},
                "2": {id: "2"}
            }
        };

        const result = getMany(state, [id]);

        const expected = state.entities[id];

        expect(result).toEqual([expected]);

    });

    it("should return an array with undefined entries if no entities are found.", () => {

        const state: EntityState<{}> = {
            ids: ["2"],
            entities: {
                "2": {id: "2"}
            }
        };

        const result = getMany(state, [id]);

        const expected = state.entities[id];

        expect(result).toEqual([expected]);

    });

});
