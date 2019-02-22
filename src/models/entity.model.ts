/**
 * An object identified by a unique string or number key
 */
export interface Entity<TId extends string | number = string> {
    id: TId;
}