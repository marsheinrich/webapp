import { EzEnumeration2 } from '/ezlibrary/enums/EzEnumeration2.js';

/**
    @class
    @description
    Defines the Time Off Statuses
    >>> WOOT: Does not require EzApi <<<
    ---------------------------------------------------------------------------
    Import with:
        import { EzTimeOffStatus } from '/ezlibrary/enums/EzTimeOffStatus.js';
    ---------------------------------------------------------------------------
    Import with other enumerations:
        import {
            ... other enumeration types ...,
            EzTimeOffStatus
        } from '/ezlibrary/enums/EzEnumerations.js';
    ---------------------------------------------------------------------------
 */
export class EzTimeOffStatus extends EzEnumeration2 {
    /**
        @private @field
        Stores the singleton instance of this enumeration class.
        @type {EzTimeOffStatus}
     */
    static #ezEnumerationSingleton = null;

        /**
        @static
        @private @field
        Stores the enum property names
        @type {array}
     */
    static #names = [];

    /**
        @static
        @public @readonly @property
        Gets the enum property names
        @returns {array}
     */
    static get names() {
        return this.#names;
    }

    /**
        @static
        @private @field
        Stores the enum property values
        @type {array}
     */
    static #values = [];

    /**
        @static
        @public @readonly @property
        Gets the enum property values
        @returns {array}
     */
    static get values() {
        return this.#values;
    }

    /**
        @static
        Static Initialization
     */
    static {
        if (null == EzTimeOffStatus.#ezEnumerationSingleton) {
            EzTimeOffStatus.#names = [
                    'UNKNOWN',
                    'ALL',
                    'PENDING',
                    'APPROVED',
                    'DENIED',
                    'CANCELED'
                ];

            EzTimeOffStatus.#values = EzTimeOffStatus.#names

            EzTimeOffStatus.#ezEnumerationSingleton = new EzTimeOffStatus(
                // Enum property names
                EzTimeOffStatus.names,
                // Enum property values for each enum property name as an array
                // Enter null if the values are equal to the names
                EzTimeOffStatus.values,
                // Optional array of additional data for eac enumeration property.
                // Enter null if not needed.
                [
                    {
                        displayName: 'Unknown Status'
                    },
                    {
                        displayName: 'All'
                    },
                    {
                        displayName: 'Pending'
                    },
                    {
                        displayName: 'Approved'
                    },
                    {
                        displayName: 'Denied'
                    },
                    {
                        displayName: 'Canceled'
                    }
                ]);
        }
    }

    /**
        @public @constructor
        >> DO NOT CREATE NEW INSTANCES <<
        The static initializer will create a singleton instance that injects the static properties and methods
        that you then use to access enumeration values.
     */
    constructor(name, value, optionalData) {
        super(name, value, optionalData);
    }
}
