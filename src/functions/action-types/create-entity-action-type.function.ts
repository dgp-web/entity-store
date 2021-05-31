import { EntityTypeMap } from "data-modeling";

/**
 * Composes a fragment of a composite-entity action's type
 *
 * @param entityName {string}
 * @param actionTypeSuffix {string}
 * @param storeFeature {string}
 */
export function createEntityActionType<TEntityTypeMap extends EntityTypeMap, TStoreFeature>(
    entityName: keyof TEntityTypeMap, actionTypeSuffix: string, storeFeature?: TStoreFeature
): string {
    if (storeFeature)  return `[${storeFeature}] [${entityName}] ${actionTypeSuffix}`;
    else return `[${entityName}] ${actionTypeSuffix}`;
}
