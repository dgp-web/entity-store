interface EntityRenderer<TEntity, TData> {
    render(entity: TEntity, data: TData): string;
}

interface EntityUpdateDispatcher<TEntity> {
    updateEntity(entity: Partial<TEntity>): void;
}

interface EntityModelSelector<TEntity, TData, TAppState> {
    selectData?(appState: TAppState): TData;
    selectEntity(appState: TAppState): TEntity;
}

interface EntityView<TEntity, TData, TAppState> extends EntityRenderer<TEntity, TData>, EntityModelSelector<TEntity, TData, TAppState> {
}

interface EntityUpdatableView<TEntity, TData, TAppState> extends EntityView<TEntity, TData, TAppState>, EntityUpdateDispatcher<TEntity> {
}
