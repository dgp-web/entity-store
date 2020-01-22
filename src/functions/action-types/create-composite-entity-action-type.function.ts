import {
    CompositeEntityActionConfig,
    defaultCompositeEntityActionConfig,
    EntityTypeMap, NormalizedCompositeEntityActionPayload
} from "../../models";
import { createEntityActionTypesForSuffix } from "./create-entity-action-type-for-suffix.function";

/**
 * Creates an action type from a CompositeEntityActionPayload
 */
export function createCompositeEntityActionType<TEntityTypeMap extends EntityTypeMap, TStoreFeature>(
    payload: NormalizedCompositeEntityActionPayload<TEntityTypeMap, TStoreFeature>,
    config: CompositeEntityActionConfig = defaultCompositeEntityActionConfig
): string {
    let type = config.prefixes.composite + config.spacer;

    type += createEntityActionTypesForSuffix<TEntityTypeMap, TStoreFeature>(config.prefixes.add, payload.add, config);
    type += createEntityActionTypesForSuffix<TEntityTypeMap, TStoreFeature>(config.prefixes.update, payload.update, config);
    type += createEntityActionTypesForSuffix<TEntityTypeMap, TStoreFeature>(config.prefixes.remove, payload.remove, config);
    type += createEntityActionTypesForSuffix<TEntityTypeMap, TStoreFeature>(config.prefixes.select, payload.select, config);
    type += createEntityActionTypesForSuffix<TEntityTypeMap, TStoreFeature>(config.prefixes.clear, payload.clear, config);
    type += createEntityActionTypesForSuffix<TEntityTypeMap, TStoreFeature>(config.prefixes.set, payload.set, config);

    if (type.endsWith(config.separator)) {
        type = type.substring(0, type.length - 3);
    }

    return type;
}
