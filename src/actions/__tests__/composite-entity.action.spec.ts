import { CompositeEntityAction } from "../composite-entity.action";

describe("CompositeEntityAction", () => {

    it("should prefix its type with [Composite]", () => {

        const action = new CompositeEntityAction({});

        expect(action.type).toContain("[Composite]");


    });

    it("should allow empty payload members.", () => {

        expect(() => new CompositeEntityAction({})).not.toThrowError();

    });

    it("should include all add, update, remove, select, and clear types in its own type.", () => {

        const action = new CompositeEntityAction({
            add: [{ entityType: "Example", payload: {} }],
            update: [{ entityType: "Example", payload: {} }],
            remove: [{ entityType: "Example", payload: [] }],
            clear: [{ entityType: "Example" }],
            select: [{ entityType: "Example", payload: [] }],
            set: [{ entityType: "Example", payload: {} }],
        });

        expect(action.type).toContain("[Example] Add");
        expect(action.type).toContain("[Example] Update");
        expect(action.type).toContain("[Example] Clear");
        expect(action.type).toContain("[Example] Remove");
        expect(action.type).toContain("[Example] Select");
        expect(action.type).toContain("[Example] Set");

    });

    it("should separate its action-type segments with a pipe.", () => {

        const action = new CompositeEntityAction({
            add: [{ entityType: "Example", payload: {} }],
            update: [{ entityType: "Example", payload: {} }],
            remove: [{ entityType: "Example", payload: [] }],
            clear: [{ entityType: "Example" }],
            select: [{ entityType: "Example", payload: [] }],
            set: [{ entityType: "Example", payload: {} }],
        });

        expect(action.type.split(" | ").length).toBe(6);

    })

});
