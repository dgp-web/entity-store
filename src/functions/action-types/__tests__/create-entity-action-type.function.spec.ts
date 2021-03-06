import { createEntityActionType } from "../create-entity-action-type.function";

describe("createEntityActionType", () => {

    it("should wrap the given entity name in square brackets.", () => {
        const type = createEntityActionType("Example", "Add");
        expect(type).toContain("[Example]");
    });

    it("should place the action-type suffix at the end.", () => {
        const type = createEntityActionType("Example", "Add");
        expect(type).toEqual("[Example] Add");
    });

    it("should wrap the given store feature in square brackets.", () => {
        const type = createEntityActionType("Example", "Add", "MyFeature");
        expect(type).toContain("[MyFeature]");
    });

    it("should place the given store feature at the beginning.", () => {
        const type = createEntityActionType("Example", "Add", "MyFeature");
        expect(type).toContain("[MyFeature] [Example] Add");
    });

});
