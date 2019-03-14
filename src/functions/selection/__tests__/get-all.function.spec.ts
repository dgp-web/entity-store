import { EntityState } from "../../../models";
import { getAll } from "../get-all.function";

describe("getAll", () => {

    it("should return all entities included in an entity state, sorted after their position in ids.", () => {

        const state: EntityState<{}> = {
            ids: ["1", "2"],
            entities: {
                "1": { id: "1"},
                "2": { id: "2"}
            }
        };

        const all = getAll(state);

        const expected = [{id: "1"}, {id: "2"}];

        expect(all).toEqual(expected);

    });

});