import { KVS } from "data-modeling";

export type GetIdSignature<TModel> = (x: TModel) => string;
export type IdPropertyAccessor<TModel> = string | GetIdSignature<TModel>;

/**
 *
 * Creates a key-value store from an array.
 * The indexer is a unique key identifying each entity.
 *
 * Makes working with composite keys easy. Just pass a function
 * that extracts a surrogate key from an object's composite-key members.
 *
 * @param {ReadonlyArray<TModel>} array The items to be transformed into a kvs
 * @param {IdPropertyAccessor<TModel>} [idPropertyAccessor=id] The property name of the id member
 * or a function that has a model as input and returns an id.
 *
 * @returns {KVS<TModel>}
 *
 * @example
 * import { createKVSFromArray } from "entity-store";
 *
 * const users = [{ id: "user01", label: "Jason" }];
 * const userKVS = createKVSFromArray(users);
 *
 * @example
 * // custom id via attribute name
 * import { createKVSFromArray } from "entity-store";
 *
 * const users = [{ userId: "user01", label: "Jason" }];
 * const userKVS = createKVSFromArray(users, "userId");
 *
 * @example
 * // custom id via function
 * import { createKVSFromArray } from "entity-store";
 *
 * const users = [{ userId: "user01", label: "Jason" }];
 * const userKVS = createKVSFromArray(users, x => x.userId);
 *
 */
export function createKVSFromArray<TModel>(
    array: ReadonlyArray<TModel>,
    idPropertyAccessor: IdPropertyAccessor<TModel> = "id"
): KVS<TModel> {

    const result = {};

    array.forEach(item => {
        if (typeof idPropertyAccessor === "string") {
            result[item[idPropertyAccessor]] = item;
        } else {
            result[idPropertyAccessor(item)] = item;
        }
    });

    return result;

}
