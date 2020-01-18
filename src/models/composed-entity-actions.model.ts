import {EntityTypeMap} from "./entity-type-map.model";
import {CompositeEntityActionPayload} from "./composite-entity-action-payload.model";

export interface ComposedEntityActions<TEntityTypeMap extends EntityTypeMap = {}, TStoreFeature = string> {
    readonly payload: CompositeEntityActionPayload<TEntityTypeMap, TStoreFeature>;
    readonly type: string;
}
