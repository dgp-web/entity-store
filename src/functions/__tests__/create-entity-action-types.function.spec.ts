import { createEntityActionTypes, CreateEntityActionTypesPayload } from "../create-entity-action-types.function";
import { defaultCompositeEntityActionConfig, EntityActionTypes } from "../../models";
import { composeEntityActionType } from "../compose-entity-action-type.function";

describe("createEntityActionTypes", () => {

    const payload: CreateEntityActionTypesPayload = {
        entityType: "User"
    };

    const config = defaultCompositeEntityActionConfig;

    it("should create an entity-action type for each operation for the specified entity", () => {

        const entityActionTypes = createEntityActionTypes(payload);

        const expectedEntityActionTypes: EntityActionTypes = {
          addEntityActionType: composeEntityActionType(payload.entityType, config.prefixes.add, payload.storeFeature),
          updateEntityActionType: composeEntityActionType(payload.entityType, config.prefixes.update, payload.storeFeature),
          removeEntityActionType: composeEntityActionType(payload.entityType, config.prefixes.remove, payload.storeFeature),
          clearEntityActionType: composeEntityActionType(payload.entityType, config.prefixes.clear, payload.storeFeature),
          setEntityActionType: composeEntityActionType(payload.entityType, config.prefixes.set, payload.storeFeature),
          selectEntityActionType: composeEntityActionType(payload.entityType, config.prefixes.select, payload.storeFeature),
        };

        expect(entityActionTypes).toEqual(expectedEntityActionTypes);

    });

    xit("should respect the passed storeFeature.", () => {

    });

    xit("should respect the passed config.", () => {

    });

});