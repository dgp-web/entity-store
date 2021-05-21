import { EntityTypeMap } from "data-modeling";
import { EntityMetadata } from "./entity-metadata.model";

export type EntityMetadataMap<TEntityTypeMap extends EntityTypeMap> = {
    readonly [K in keyof TEntityTypeMap]: EntityMetadata<TEntityTypeMap[K], TEntityTypeMap>;
}
