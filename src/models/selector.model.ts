
/**
 * Signature of a selector
 */
export type Selector<TState, TDerived> = (state: TState) => TDerived;
