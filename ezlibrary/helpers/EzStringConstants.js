import { EzStaticClass } from '/ezlibrary/EzStaticClass.js';
import { EzString } from '/ezlibrary/helpers/EzString.js';

/*
    ---------------------------------------------------------------------------
    ENGINEERING NOTES
    ---------------------------------------------------------------------------
    DO NOT IMPORT THE FOLLOWING INTO THIS CLASS:
        import { EzApi } from '/public/common/javascript/ezapi.js';
        import { EzUI } from '/public/common/javascript/ezui.js';
        import { ezUI } from '/public/common/javascript/ezui.js';
        import { * } from '/public/helpers/EzHelpers.js';
    ---------------------------------------------------------------------------
*/

/**
 * @class
 * @extends EzStaticClass
 * @description
 * Static class that stores globally available string constants for use in
 * EzClocker library classes and consumers of the EzClocker library.
 *
 * TODO: Provide different messages for supported locale language.
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 * Import from non-ezLibrary helper classes with:
 *     import {
 *          // ... other imported helper classes ...,
 *          EzStringConstants
 *      } from '/ezlibrary/helpers/EzHelpers.js';
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 * Import from within ezLibrary helper classes with:
 *     import { EzStringConstants } from '/ezlibrary/helpers/EzStringConstants.js';
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 */
export class EzStringConstants extends EzStaticClass {
    /*
     * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
     * EzConsole.js String Constants
     * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
     */

    /**
     * @static
     * @public @readonly @property
     * Gets 'EzConsole is initialized and using the globally available Javascript console instance available from ';
     * @returns {string}
     */
    static get EZSC_EzConsole_is_initialized_using_global_console_from_() {
        return 'EzConsole is initialized and using the globally available Javascript console instance available from ';
    }

    /**
     * @static
     * @public @readonly @property
     * Gets 'EzConsole is initialized and using the globally available Javascript console instance available from ';
     * @returns {string}
     */
    static get EZSC_EzConsole_initialized_using_internal_console_implementation() {
        return 'EzConsole is initialized and using its internal (limited) console implementation (EzNullConsole).';
    }

    /**
     * @static
     * @public @readonly @property
     * Gets ' the global Javascript variable named '
     * @returns {string}
     */
    static get EZSC_the_global_Javascript_variable_named_() {
        return ' the global Javascript variable named ';
    }

    /**
     * @static
     * @private @field
     * Stores: ' the global Javascript variable named '
     * @type {string}
     */
    static #EZSC_EzConsole_using_internal_console_implementation_instead_of_global_console_due_to_warning_ = EzString.em`
        EzConsole is using its internal console implementation (EzNullConsole) instead of a globally available Javascript console due to the
        following warning:`;
    /**
     * @static
     * @public @readonly @property
     * Gets: ' the global Javascript variable named '
     * @returns {string}
     */
    static get EZSC_EzConsole_using_internal_console_implementation_instead_of_global_console_due_to_warning_() {
        return this.#EZSC_EzConsole_using_internal_console_implementation_instead_of_global_console_due_to_warning_;
    }

    /**
     * @static
     * @private @field
     * Stores the EzConsole initialized using internal console warning msg.
     * @type {string}
     */
    static #EZSC_ConsoleInitializationUsingInternalConsoleWarningMsg = EzString.msg`
        EzConsole initialization warning: Failed to to detect a globally available Javascript console instance. All known globally
        available Javascript console instance variables ("console", "window.console", "globalThis.console", and "globalThis.window.console")
        have evaluated to undefined or null. Therefore, EzConsole will fall back to use its internally managed (and limited)
        console implementation.`;
    /**
     * @static
     * @public @readonly @property
     * Gets the EzConsole initialized using internal console warning msg.
     * @returns {string}
     */
    static get EZSC_ConsoleInitializationUsingInternalConsoleWarningMsg() {
        return this.#EZSC_ConsoleInitializationUsingInternalConsoleWarningMsg;
    }

    /*
     * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
     * Generic Error Message Constants
     * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
     */

    /**
     * @public
     * @static @method
     * Gets a stack trace log message using template: `[Stack trace: ${stack}]`
     * @param {undefined|null|object|array|*} stack
     * @returns {string}
     */
    static EZSC_Stack_trace_(stack) {
        return `[Stack trace: ${stack}]`;
    }

    /**
     * @public
     * @static @method
     * Gets a error code log string using template: `(Error code: ${errorCode})``
     * @param {undefined|null|number|string} stack
     * @returns {string}
     */
    static EZSC_Error_code(errorCode) {
        return `(Error code: ${errorCode})`;
    }

    /**
     * @public
     * @static @readonly @proeprty
     * Gets: 'Unexpected error'
     * @returns {string}
     */
    static get EZSC_Unexpected_Error() {
        return 'Unexpected error';
    }

    /**
     * @protected
     * @constructor
     * >> DO NOT CREATE NEW INSTANCES <<
     * Use only static class methods, class fields, and class properties.
     * Attempting to create a new instance will result in a EzStaticClassException error.
     */
    constructor() {
        super();
    }
}
