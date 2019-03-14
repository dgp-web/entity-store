export interface IsEntityTypeIncludedInActionTypePayload {
    readonly actionType: string;
    readonly entityType: string;
}

/**
 * Checks whether an actionType includes an entityType
 * @param {IsEntityTypeIncludedInActionTypePayload} payload 
 */
export function isEntityTypeIncludedInActionType(payload: IsEntityTypeIncludedInActionTypePayload): boolean {
    return payload.actionType.includes(payload.entityType);
}