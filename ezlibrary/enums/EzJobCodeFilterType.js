import { EzEnumeration2 } from '/ezlibrary/enums/EzEnumeration2.js';

/**
    @class
    @extends {EzEnumeration2}
    @description
    An enumeration class that defines the available Job Code filter types.
    ---------------------------------------------------------------------------
    Import with:
        import { EzJobCodeFilterType } from '/ezlibrary/enums/EzJobCodeFilterType.js';
    ---------------------------------------------------------------------------
 */
export class EzJobCodeFilterType extends EzEnumeration2 {
    /**
        @private @field
        Stores this enumeration class's singleton instance.
        @type {EzJobCodeFilterType}
     */
    static #ezEnumerationSingletonInstance = null;

    /**
        @static
        Static Initialization
     */
    static {
        if (null == EzJobCodeFilterType.#ezEnumerationSingletonInstance) {
            // Only create the new instance if the singletong instance is null
            EzJobCodeFilterType.#ezEnumerationSingletonInstance = new EzJobCodeFilterType();
        }
    }

    /**
        @public @constructor
        Creates a new instance of EzJobCodeFilterType
     */
    constructor() {
        super(
            // Enumeration property names
            [
                'UNKNOWN',
                'DISABLED',
                'ACTIVE',
                'ARCHIVED',
                'ALL'
            ],
            // Enumeration property values (passing null will use the enumeration property names array)
            null,
            // Enumeration property data (passing null will use the default enum property data object)
            null);
    }
}
