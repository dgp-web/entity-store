import { composeEntityActionType } from "../compose-entity-action-type.function";

describe("composeEntityActionType", () => {

    it("should wrap the given entity name in square brackets.", () => {
        const type = composeEntityActionType("Example", "Add");
        expect(type).toContain("[Example]");
    });

    it("should place the action-type suffix at the end.", () => {
        const type = composeEntityActionType("Example", "Add");
        expect(type).toEqual("[Example] Add");
    });

    it("should wrap the given store feature in square brackets.", () => {
        const type = composeEntityActionType("Example", "Add", "MyFeature");
        expect(type).toContain("[MyFeature]");
    });

    it("should place the given store feature at the beginning.", () => {
        const type = composeEntityActionType("Example", "Add", "MyFeature");
        expect(type).toContain("[MyFeature] [Example] Add");
    });

});
