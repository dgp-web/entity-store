import { KeyValueStore } from "./key-value-store.model";

export interface EntityState<T> {

    /**
     * Keys associated with the stored entities.
     *
     * Those are used for accessing stored objects
     * in the "entities" key-value store.
     */
    readonly ids: ReadonlyArray<string>;

    /**
     * A dictionary of keys and associated objects.
     */
    readonly entities: KeyValueStore<Readonly<T>>;

    /**
     * Optional array of the keys of selected entities
     *
     * Useful for entity-based selection models.
     */
    readonly selectedIds?: ReadonlyArray<string>;

}