import { Entity, EntityState } from "../../models";
import { createEntityState } from "../../functions";
import { addEntitiesReducer } from "../add-entities.reducer";
import { selectEntitiesReducer } from "../select-entities.reducer";

export interface MyEntity extends Entity {
    myAttribute: string;
}

export const firstEntity: MyEntity = {
    id: "1",
    myAttribute: "I am the first entity."
};

export const secondEntity: MyEntity = {
    id: "2",
    myAttribute: "I am the second entity."
};

export const thirdEntity: MyEntity = {
    id: "3",
    myAttribute: "I am the third entity."
};

export interface MyEntityState extends EntityState<MyEntity> {
    readonly myAdditionalAttribute: string;
}

export function getMyEntityStateWithTwoEntities(payload?: {
    selectedIds?: string[]
}): MyEntityState {

    let state = createEntityState() as MyEntityState;
    state = addEntitiesReducer(state, {
        [firstEntity.id]: firstEntity,
        [secondEntity.id]: secondEntity,
    });

    if (payload) {
        if (payload.selectedIds) {

            state = selectEntitiesReducer(state, payload.selectedIds);
        }
    }

    return state;
}