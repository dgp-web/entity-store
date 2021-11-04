import { createEntityState } from "../create-entity-state.function";
import { EntityState } from "data-modeling";
import { Entity } from "../../models";

interface MyStateAttributes {
    myAttribute: string;
}

interface MyEntity extends Entity {
}

interface MyState extends EntityState<MyEntity>, MyStateAttributes {
}

describe("createEntityState", () => {

    it("should produce a state that includes an array of 'ids' an a dictionary of 'entities'.", () => {

        const state = createEntityState();

        expect(state.hasOwnProperty("ids")).toBeTruthy();
        expect(state.ids instanceof Array).toBeTruthy();

        expect(state.hasOwnProperty("entities")).toBeTruthy();
        expect(state.entities instanceof Object).toBeTruthy();

    });

    it("should produce a state that includes a selection model in the form of a 'selectedIds' array.", () => {

        const state = createEntityState();

        expect(state.hasOwnProperty("selectedIds")).toBeTruthy();
        expect(state.selectedIds instanceof Array).toBeTruthy();

    });

    it("should assign additional attributes to the entity state if those are passed as argument.", () => {

        const state: MyState = createEntityState<MyEntity, MyState>({myAttribute: "myValue"});

        expect(state.hasOwnProperty("myAttribute")).toBeTruthy();
        expect(state.myAttribute).toEqual("myValue");

    });

});
