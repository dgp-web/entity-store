import { EntityState } from "data-modeling";
import { getOne } from "../get-one.function";

describe("getOne", () => {

    const id = "1";

    it("should return an entity included in an entity state.", () => {

        const state: EntityState<{}> = {
            ids: [id, "2"],
            entities: {
                [id]: {id},
                "2": {id: "2"}
            }
        };

        const result = getOne(state, id);

        const expected = state.entities[id];

        expect(result).toEqual(expected);

    });
    it("should return undefined if no entity is found.", () => {

        const state: EntityState<{}> = {
            ids: ["2"],
            entities: {
                "2": {id: "2"}
            }
        };

        const result = getOne(state, id);

        const expected = state.entities[id];

        expect(result).toBeUndefined();

    });

});
