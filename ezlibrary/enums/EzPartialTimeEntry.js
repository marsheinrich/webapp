import { EzEnumeration2 } from '/ezlibrary/enums/EzEnumeration2.js';

/**
    @class
    @extends {EzEnumeration2}
    @description
    Javascript enumeration for Java's PartialTimeEntry enumeration.
    Defines the time entrie's "split" status
    ---------------------------------------------------------------------------
    Import with:
        import { EzPartialTimeEntry } from '/ezlibrary/enums/EzPartialTimeEntry.js';
    ---------------------------------------------------------------------------
 */
export class EzPartialTimeEntry extends EzEnumeration2 {
    /**
        @private @field
        Stores this enumeration class's singleton instance.
        @type {EzPartialTimeEntry}
     */
    static #ezEnumerationSingletonInstance = null;

    /**
        @static
        Static Initialization
     */
    static {
        if (null == EzPartialTimeEntry.#ezEnumerationSingletonInstance) {
            // Only create the new instance if the singletong instance is null
            EzPartialTimeEntry.#ezEnumerationSingletonInstance = new EzPartialTimeEntry();
        }
    }

    /**
        @public @constructor
        Creates a new instance of EzPartialTimeEntry
     */
    constructor() {
        super(
            // names
            [
                'NO',
                'EndDateClipped',
                'StartDateClipped',
                'StartAndEndDateClipped'
            ],
            // values
            null,
            // optional data
            null);
    }
}
