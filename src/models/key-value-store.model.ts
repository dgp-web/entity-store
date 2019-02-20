/**
 * Dictionary of ids and object associated
 * with those keys
 */
export interface KeyValueStore<T> {
    [id: string]: T;
}

/**
 * Alias for KeyValueStore
 */
export interface KVS<T> extends KeyValueStore<T> {
}
