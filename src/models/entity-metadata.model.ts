import { ModelMetadata } from "data-modeling";
import { EntityTypeMap } from "data-modeling/src/lib/models/entity-management";

export type EntityMetadata<T extends TEntityTypeMap[keyof TEntityTypeMap], TEntityTypeMap extends EntityTypeMap> = ModelMetadata<T, TEntityTypeMap>;
