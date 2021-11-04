import { isCompositeEntityActionType } from "../is-composite-entity-action-type.function";
import { CompositeEntityAction } from "../../../actions";
import { Action } from "../../../models";
import { EntityStoreTestData } from "../../__tests__/test-data";

describe("isCompositeEntityActionType", () => {

    it("should return whether a given action type belongs to a CompositeEntityAction.", () => {

        let action: Action = new CompositeEntityAction({});
        let result = isCompositeEntityActionType(action.type);

        expect(result).toBeTruthy();

        action = { type: "Some other type" };
        result = isCompositeEntityActionType(action.type);

        expect(result).toBeFalsy();
    });

    it("should respect the passed CompositeEntityActionConfig.", () => {

        const config = EntityStoreTestData.customCompositeEntityActionConfig;
        let action: Action = new CompositeEntityAction({}, config);
        
        let result = isCompositeEntityActionType(action.type,config);

        expect(result).toBeTruthy();

    });

});