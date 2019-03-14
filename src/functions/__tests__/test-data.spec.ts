import { Entity, EntityState, CompositeEntityActionConfig } from "../../models";
import { createEntityState } from "../create-entity-state.function";
import { addEntitiesToState, selectEntitiesInState } from "../state-transformation";

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
    state = addEntitiesToState(state, {
        [firstEntity.id]: firstEntity,
        [secondEntity.id]: secondEntity,
    });

    if (payload) {
        if (payload.selectedIds) {

            state = selectEntitiesInState(state, payload.selectedIds);
        }
    }

    return state;
}

export class EntityStoreTestData {

    static readonly customCompositeEntityActionConfig: CompositeEntityActionConfig = {
       
        prefixes: {
            composite: "MyCompositeType",
            add: "ADD",
            clear: "CLEAR",
            remove: "REMOVE",
            select: "SELECT",
            set: "SET",
            update: "UPDATE"
        },
        separator: "_/_",
        spacer: "_"
        
    };

}