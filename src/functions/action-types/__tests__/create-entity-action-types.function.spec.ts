import { createEntityActionTypes, CreateEntityActionTypesPayload } from "../create-entity-action-types.function";
import { defaultCompositeEntityActionConfig, EntityActionTypes } from "../../../models";
import { createEntityActionType } from "../create-entity-action-type.function";

describe("createEntityActionTypes", () => {

    const payload: CreateEntityActionTypesPayload = {
        entityType: "User"
    };

    const config = defaultCompositeEntityActionConfig;

    it("should create an entity-action type for each operation for the specified entity", () => {

        const entityActionTypes = createEntityActionTypes(payload);

        const expectedEntityActionTypes: EntityActionTypes = {
          addEntityActionType: createEntityActionType(payload.entityType, config.prefixes.add, payload.storeFeature),
          updateEntityActionType: createEntityActionType(payload.entityType, config.prefixes.update, payload.storeFeature),
          removeEntityActionType: createEntityActionType(payload.entityType, config.prefixes.remove, payload.storeFeature),
          clearEntityActionType: createEntityActionType(payload.entityType, config.prefixes.clear, payload.storeFeature),
          setEntityActionType: createEntityActionType(payload.entityType, config.prefixes.set, payload.storeFeature),
          selectEntityActionType: createEntityActionType(payload.entityType, config.prefixes.select, payload.storeFeature),
        };

        expect(entityActionTypes).toEqual(expectedEntityActionTypes);

    });

    xit("should respect the passed storeFeature.", () => {

    });

    xit("should respect the passed CompositeEntityActionConfig.", () => {

    });

});