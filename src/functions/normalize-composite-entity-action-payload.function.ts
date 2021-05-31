import { EntityTypeMap } from "data-modeling";
import {
    AddEntityActionParamsMap,
    CompositeEntityActionPayloadWithStoreFeature,
    NormalizedCompositeEntityActionPayload,
    RemoveEntityActionParamsMap,
    SelectEntityActionParamsMap,
    SetEntityActionParamsMap,
    UpdateEntityActionParamsMap
} from "../models";

function flattenEntityMapPayloadToArray<TEntityTypeMap extends EntityTypeMap, TStoreFeature>(
    payload: AddEntityActionParamsMap<TEntityTypeMap, TStoreFeature>
        | UpdateEntityActionParamsMap<TEntityTypeMap, TStoreFeature>
        | SetEntityActionParamsMap<TEntityTypeMap, TStoreFeature>
        | RemoveEntityActionParamsMap<TEntityTypeMap, TStoreFeature>
        | SelectEntityActionParamsMap<TEntityTypeMap, TStoreFeature>,
    storeFeature) {
    return Object.keys(payload).map(entityType => {
        return {
            payload: payload[entityType],
            entityType,
            storeFeature
        };
    })
}

export function normalizeCompositeEntityActionPayload<TEntityTypeMap extends EntityTypeMap, TStoreFeature>(
    payload: CompositeEntityActionPayloadWithStoreFeature<TEntityTypeMap, TStoreFeature>
): NormalizedCompositeEntityActionPayload<TEntityTypeMap, TStoreFeature> {

    const result = {
        add: null,
        clear: null,
        remove: null,
        select: null,
        set: null,
        update: null
    } as NormalizedCompositeEntityActionPayload<TEntityTypeMap, TStoreFeature>;

    if (payload.add) {
        (result as any).add = Array.isArray(payload.add) ? payload.add : flattenEntityMapPayloadToArray(
            payload.add as AddEntityActionParamsMap<TEntityTypeMap, TStoreFeature>,
            payload.storeFeature
        );
    }

    if (payload.clear) {
        (result as any).clear = Array.isArray(payload.clear) && !payload.clear.every(x => typeof x === "string")
            ? payload.clear
            : (payload.clear as ReadonlyArray<string>).map(entityType => {
                return {entityType, storeFeature: payload.storeFeature};
            });
    }

    if (payload.remove) {
        (result as any).remove = Array.isArray(payload.remove) ? payload.remove : flattenEntityMapPayloadToArray(
            payload.remove as RemoveEntityActionParamsMap<TEntityTypeMap, TStoreFeature>,
            payload.storeFeature
        );
    }

    if (payload.update) {
        (result as any).update = Array.isArray(payload.update) ? payload.update : flattenEntityMapPayloadToArray(
            payload.update as UpdateEntityActionParamsMap<TEntityTypeMap, TStoreFeature>,
            payload.storeFeature
        );
    }

    if (payload.set) {
        (result as any).set = Array.isArray(payload.set) ? payload.set : flattenEntityMapPayloadToArray(
            payload.set as SetEntityActionParamsMap<TEntityTypeMap, TStoreFeature>,
            payload.storeFeature
        );
    }

    if (payload.select) {
        (result as any).select = Array.isArray(payload.select) ? payload.select : flattenEntityMapPayloadToArray(
            payload.select as SelectEntityActionParamsMap<TEntityTypeMap, TStoreFeature>,
            payload.storeFeature
        );
    }

    return result;

}
