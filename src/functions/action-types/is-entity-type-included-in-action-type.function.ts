export interface IsEntityTypeIncludedInActionTypePayload {
    readonly actionType: string;
    readonly entityType: string;
}

export function isEntityTypeIncludedInActionType(payload: IsEntityTypeIncludedInActionTypePayload): boolean {
    return payload.actionType.includes(payload.entityType);
}