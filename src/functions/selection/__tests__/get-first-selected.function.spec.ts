import { getFirstSelected } from "../get-first-selected.function";
import { EntityState } from "data-modeling";

describe("getFirstSelected", () => {

    it("should return the entities associated with the first id in selectedIds.", () => {

        const state: EntityState<{}> = {
            ids: ["1", "2"],
            entities: {
                "1": {id: "1"},
                "2": {id: "2"}
            },
            selectedIds: ["1"]
        };

        const selected = getFirstSelected(state);

        expect(selected).toBe(state.entities["1"]);

    });

});
