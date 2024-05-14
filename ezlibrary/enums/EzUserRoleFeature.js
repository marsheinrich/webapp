import { EzEnumeration2 } from '/ezlibrary/enums/EzEnumeration2.js';

/**
    @class
    @extends {EzEnumeration2}
    Defines the available User Role Features in ezClocker.
    >>> WOOT: Does not require EzApi <<<
    ---------------------------------------------------------------------------
    Import with:
        import { EzUserRoleFeature } from '/ezlibrary/enums/EzUserRoleFeature.js';
    ---------------------------------------------------------------------------
 */
export class EzUserRoleFeature extends EzEnumeration2 {
    /**
        @private @field
        Stores the singleton instance of this enumeration class.
        @type {EzUserRoleFeature}
     */
    static #ezEnumerationSingleton = null;

    /**
        @static
        Static Initialization
     */
    static {
        if (null == EzUserRoleFeature.#ezEnumerationSingleton) {
            EzUserRoleFeature.#ezEnumerationSingleton = new EzUserRoleFeature(
                // Enum property names
                [
                    'EZROLE_FEATURE_ACCOUNT_SUBSCRIPTION_EDITING',
                    'EZROLE_FEATURE_ACCOUNT_CHANGE_EMPLOYER_PASSWORD',
                    'EZROLE_FEATURE_ACCOUNT_CHANGE_EMPLOYER_EMAIL',
                    'EZROLE_FEATURE_ACCOUNT_DELETE_ACCOUNT'
                ],
                // Enum property values (use default (enum property names array))
                null,
                // Enum property optional data (use detail)
                null);
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
