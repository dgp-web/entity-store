import { EntityState } from "./entity-state.model";

export type EntityStateMap = {
    readonly [K: string]: EntityState<any>;
}
