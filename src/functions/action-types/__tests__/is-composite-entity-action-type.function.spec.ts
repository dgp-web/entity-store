import { isCompositeEntityActionType } from "../is-composite-entity-action-type.function";
import { CompositeEntityAction } from "../../../actions";
import { Action } from "../../../models";

describe("isCompositeEntityActionType", () => {

    it("should return whether a given action type belongs to a CompositeEntityAction.", () => {

        let action: Action = new CompositeEntityAction({});
        let result = isCompositeEntityActionType(action.type);

        expect(result).toBeTruthy();

        action = { type: "Some other type" };
        result = isCompositeEntityActionType(action.type);

        expect(result).toBeFalsy();
    });

});