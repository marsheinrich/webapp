import { EzEnumeration2 } from '/ezlibrary/enums/EzEnumeration2.js';

/**
    @public
    @class
    @extends {EzEnumeration2}
    @description
    The response status from a modal dialog with multiple choice buttons.
    ---------------------------------------------------------------------------
    Import with:
        import { EzDialogResponseStatus } from '/ezlibrary/ux/dialogs/EzDialogResponseStatus.js';
    ---------------------------------------------------------------------------
 */
export class EzDialogResponseStatus extends EzEnumeration2 {
    /**
        @private @field
        Stores the singleton instance of this enumeration class.
        @type {EzDialogResponseStatus}
     */
    static #ezEnumerationSingleton = null;

    /**
        @static
        Static Initialization
     */
    static {
        if (null == EzDialogResponseStatus.#ezEnumerationSingleton) {
            EzDialogResponseStatus.#ezEnumerationSingleton = new EzDialogResponseStatus(
                // Enum property names
                [
                    'OK',
                    'CANCEL',
                    'YES',
                    'NO',
                    'ACCEPT',
                    'AGREE',
                    'CONFIRM',
                    'DECLINE',
                    'CONTINUE',
                    'RETRY',
                    'STOP',
                    'APPROVED',
                    'DECLINED'
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
        The static initializer will create a singleton instance
        that will inject the static properties and methods.
        Use the static properties and methods instead of creating new
        instances.
     */
    constructor(name, value, optionalData) {
        super(name, value, optionalData);
    }
}
