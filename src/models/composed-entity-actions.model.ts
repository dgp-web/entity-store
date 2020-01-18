import {EntityTypeMap} from "./entity-type-map.model";
import {CompositeEntityActionPayload} from "./composite-entity-action-payload.model";

export interface ComposedEntityActions<TEntityTypeMap extends EntityTypeMap = {}> {
    readonly payload: CompositeEntityActionPayload<TEntityTypeMap>;
    readonly type: string;
}
