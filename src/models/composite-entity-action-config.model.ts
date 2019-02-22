/**
 * Configuration for various aspects of
 * creating and processing composite-entity actions
 */
export interface CompositeEntityActionConfig {
    readonly prefixes: {
        /**
         * @default: [Composite]
         */
        readonly composite: string;

        /**
         * @default: Add
         */
        readonly add: string;

        /**
         * @default: Remove
         */
        readonly remove: string;

        /**
         * @default: Update
         */
        readonly update: string;

        /**
         * @default: Clear
         */
        readonly clear: string;

        /**
         * @default: Set
         */
        readonly set: string;

        /**
         * @default: Select
         */
        readonly select: string;
    };

    /**
     * @default space|space
     */
    readonly separator: string;

    /**
     * @default space
     */
    readonly spacer: string;
}

export const defaultCompositeEntityActionConfig: CompositeEntityActionConfig = {
    prefixes: {
        composite: "[Composite]",

        add: "Add",
        remove: "Remove",
        select: "Select",
        update: "Update",
        set: "Set",
        clear: "Clear",
    },
    separator: " | ",
    spacer: " "
};