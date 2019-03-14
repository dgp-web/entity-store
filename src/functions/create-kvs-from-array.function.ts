import { KVS } from "../models";

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
 * @param {ReadonlyArray<TModel>} array
 * @param {IdPropertyAccessor<TModel>} [idPropertyAccessor=id] The property name of the id member 
 * or a function that has a model as input and returns an id.
 * 
 * @returns {KVS<TModel>}
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