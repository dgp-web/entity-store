import { isEntityTypeIncludedInActionType, IsEntityTypeIncludedInActionTypePayload } from "../is-entity-type-included-in-action-type.function";

describe("isEntityTypeIncludedInActionType", () => {

    it("should return true if an entityType is included in an action type.", () => {

        let payload: IsEntityTypeIncludedInActionTypePayload = {
          actionType: "[Composite] [User] Add",
          entityType: "User"  
        };

        let result = isEntityTypeIncludedInActionType(payload);

        expect(result).toBeTruthy();

        payload = {
            actionType: "[Composite] [User] Add",
            entityType: "Location" 
        };

        result = isEntityTypeIncludedInActionType(payload);

        expect(result).toBeFalsy();
    });

});