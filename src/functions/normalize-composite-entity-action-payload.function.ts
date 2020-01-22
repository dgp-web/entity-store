import {CompositeEntityActionPayload, EntityTypeMap, NormalizedCompositeEntityActionPayload} from "../models";

// TODO: This is not correct
function mapToArray(payload) {
    return Object.keys(payload).map(entityType => {
        return {
            ...payload[entityType],
            entityType
        }
    })
}

export function normalizeCompositeEntityActionPayload<TEntityTypeMap extends EntityTypeMap, TStoreFeature>(
    payload: CompositeEntityActionPayload<TEntityTypeMap, TStoreFeature>
): NormalizedCompositeEntityActionPayload<TEntityTypeMap, TStoreFeature> {

    return {
        add: Array.isArray(payload.add) ? payload.add : mapToArray(payload.add),
        clear: Array.isArray(payload.clear) ? payload.clear : mapToArray(payload.clear),
        remove: Array.isArray(payload.remove) ? payload.remove : mapToArray(payload.remove),
        select: Array.isArray(payload.select) ? payload.select : mapToArray(payload.select),
        update: Array.isArray(payload.update) ? payload.update : mapToArray(payload.update),
        set: Array.isArray(payload.set) ? payload.set : mapToArray(payload.set),
    };

}
