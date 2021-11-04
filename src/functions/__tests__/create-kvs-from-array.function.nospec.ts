import { createKVSFromArray } from "../create-kvs-from-array.function";

describe("createKVSFromArray", () => {

    it("should write each array item into a KVS", () => {

        const array = [{ id: "1", name: "Jason" }, { id: "2", name: "Carsten" }];
        const kvs = createKVSFromArray(array);
        expect(kvs["1"].name).toBe("Jason");
        expect(kvs["2"].name).toBe("Carsten");
        expect(Object.keys(kvs).length).toBe(2);

    });

    it("should use the property given as idPropertyName as index accessor.", () => {

        const array = [{ id: "1", name: "Jason" }, { id: "2", name: "Carsten" }];
        const kvs = createKVSFromArray(array, "name");
        expect(kvs["Jason"].name).toBe("Jason");
        expect(kvs["Carsten"].name).toBe("Carsten");

    });

});
