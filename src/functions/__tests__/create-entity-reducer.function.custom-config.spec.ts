import { Action, Entity, EntityReducer } from "../../models";
import { CompositeEntityAction } from "../../actions";
import { EntityStoreTestData } from "./test-data.spec";
import { defaultCreateEntityReducerConfig } from "../default-create-entity-reducer-config.model";
import { EntityState } from "data-modeling";
import { createEntityState } from "../create-entity-state.function";
import { createEntityReducer } from "../create-entity-reducer.function";

interface MyEntity extends Entity {
    myAttribute: string;
}

interface MyEntityState extends EntityState<MyEntity> {
    myAdditionalStateAttribute: string;
}

describe("createEntityReducer with custom config" + " should create a reducer that", () => {

    let reducer: EntityReducer<MyEntity, MyEntityState>;
    let initialState: MyEntityState;

    let firstEntity: MyEntity;
    const config = EntityStoreTestData.customCompositeEntityActionConfig;

    beforeEach(() => {

        firstEntity = {
            id: "0",
            myAttribute: "I am the first entity"
        };

        initialState = createEntityState<MyEntity, MyEntityState>({
            myAdditionalStateAttribute: ""
        });

        reducer = createEntityReducer<MyEntity, MyEntityState>({
            entityType: "MyEntity",
            initialState: initialState,
            storeFeature: "MyStoreFeature",
        }, {
            compositeEntityActionConfig: config,
            entityStateTransformationConfig: defaultCreateEntityReducerConfig.entityStateTransformationConfig
        });

    });

    it("should react to composite actions for the specified entityType and storeFeature.", () => {

        const action = new CompositeEntityAction({
            add: [{
                entityType: "MyEntity", storeFeature: "MyStoreFeature", payload: {
                    [firstEntity.id]: firstEntity
                }
            }]
        }, config);

        const reducedState = reducer(initialState, action);
        expect(reducedState.ids)
            .toContain(firstEntity.id);

    });

    it("should react to additional reducers passed to createEntityReducer.", () => {

        const additionalReducer: EntityReducer<MyEntity, MyEntityState> = (state: MyEntityState, action: Action): MyEntityState => {

            if (action.type === "MyAdditionalAction") {

                return Object.assign({}, state, {myAdditionalStateAttribute: "Hello!"});

            } else {
                return state;
            }

        };

        reducer = createEntityReducer<MyEntity, MyEntityState>({
            entityType: "MyEntity",
            initialState: initialState,
            storeFeature: "MyStoreFeature",
            additionalReducers: [additionalReducer]
        }, {
            compositeEntityActionConfig: config,
            entityStateTransformationConfig: defaultCreateEntityReducerConfig.entityStateTransformationConfig
        });

        const action: Action = {type: "MyAdditionalAction"};

        const reducedState = reducer(initialState, action);
        expect(reducedState.myAdditionalStateAttribute)
            .toEqual("Hello!");
    });

    it("should return the unmodified state in the composite-action branch when it doesn't match any action types.", () => {

        const action = new CompositeEntityAction({}, config);
        const reducedState = reducer(initialState, action);

        expect(reducedState)
            .toEqual(initialState);

    });

    it("should execute clear operations before add operations.", () => {

        const action = new CompositeEntityAction({
            add: [{
                entityType: "MyEntity",
                storeFeature: "MyStoreFeature",
                payload: {
                    [firstEntity.id]: firstEntity
                }
            }],
            clear: [{
                entityType: "MyEntity",
                storeFeature: "MyStoreFeature"
            }]
        }, config);

        const reducedState = reducer(initialState, action);

        const expectedState: MyEntityState = {
            ids: [firstEntity.id],
            entities: {
                [firstEntity.id]: firstEntity
            },
            selectedIds: [],
            myAdditionalStateAttribute: ""
        };

        expect(reducedState)
            .toEqual(expectedState);
    });

    it("should execute set operations before select operations.", () => {

        const action = new CompositeEntityAction({
            set: [{
                entityType: "MyEntity",
                storeFeature: "MyStoreFeature",
                payload: {
                    [firstEntity.id]: firstEntity
                }
            }],
            select: [{
                entityType: "MyEntity",
                storeFeature: "MyStoreFeature",
                payload: [firstEntity.id]
            }]
        }, config);

        const reducedState = reducer(initialState, action);

        const expectedState: MyEntityState = {
            ids: [firstEntity.id],
            entities: {
                [firstEntity.id]: firstEntity
            },
            selectedIds: [firstEntity.id],
            myAdditionalStateAttribute: ""
        };

        expect(reducedState)
            .toEqual(expectedState);

    });

    it("should keep additional attributes when updating the state.", () => {
        const action = new CompositeEntityAction({
            clear: [{
                entityType: "MyEntity",
                storeFeature: "MyStoreFeature"
            }]
        }, config);

        const reducedState = reducer(initialState, action);

        const expectedState: MyEntityState = {
            ids: [],
            entities: {},
            selectedIds: [],
            myAdditionalStateAttribute: ""
        };

        expect(reducedState)
            .toEqual(expectedState);
    });

});
