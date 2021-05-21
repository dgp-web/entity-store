import { EntityTypeMap } from "./entity-type-map.model";
import { EntityMetadata } from "./entity-metadata.model";

export type EntityMetadataMap<TEntityTypeMap extends EntityTypeMap> = {
    readonly [K in keyof TEntityTypeMap]: EntityMetadata<TEntityTypeMap[K], TEntityTypeMap>;
}
