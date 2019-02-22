/**
 * Composes a fragment of a composite-entity action's type
 *
 * @param entityName {string}
 * @param actionTypeSuffix {string}
 * @param storeFeature {string}
 */
export function composeEntityActionType(entityName: string, actionTypeSuffix: string, storeFeature?: string): string {
    if (storeFeature)  return `[${storeFeature}] [${entityName}] ${actionTypeSuffix}`;
    else return `[${entityName}] ${actionTypeSuffix}`;
}