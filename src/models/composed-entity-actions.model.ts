import { EntityTypeMap } from "data-modeling";
import { NormalizedCompositeEntityActionPayload } from "./composite-entity-action-payload.model";

export interface ComposedEntityActions<TEntityTypeMap extends EntityTypeMap, TStoreFeature> {
    readonly payload: NormalizedCompositeEntityActionPayload<TEntityTypeMap, TStoreFeature>;
    readonly type: string;
}
