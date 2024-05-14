import { EzBadParamException } from '/ezlibrary/exceptions/EzBadParamException.js';

import { EzString } from '/ezlibrary/helpers/EzString.js';
import { EzArray } from '/ezlibrary/helpers/EzArray.js';

import { EzEnumeration2 } from '/ezlibrary/enums/EzEnumeration2.js';

/**
    @class
    @extends {EzEnumeration2}
    @summary
    Defines ezClocker object instance states
    >>> WOOT: Does not require EzApi <<<
    ---------------------------------------------------------------------------
        Import with:
            import { EzInstanceState } from '/ezlibrary/EzInstanceState.js';
    ---------------------------------------------------------------------------
 */
export class EzInstanceState extends EzEnumeration2 {
    /**
        @private @field
        Stores the singleton instance of this enumeration class.
        @type {EzRegistrationState}
     */
    static #ezEnumerationSingleton = null;

    /**
        @static
        Static Initialization
     */
    static {
        if (null == EzInstanceState.#ezEnumerationSingleton) {
            EzInstanceState.#ezEnumerationSingleton = new EzInstanceState(
                // Enum property names
                [
                    'CONSTRUCTED',
                    'NOT_INITIALIZED',
                    'INITIALIZED',
                    'CONTEXT_INITIALIZED',
                    'DATA_INITIALIZED',
                    'REGISTERED_WITH_EZAPI'
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

    /**
        @static
        @public @method
        Adds the provided ezWidgetStateToAdd value to the provided widgetStatesArray if it does not already exist.
        @param {array} ezStatesArray
        @param {string} ezInstanceStateToAdd
        A valid enum property value from EzInstanceState
        @returns {array}
        Returns the modified widgetStatesArray
     */
    static ezAddState(ezStatesArray, ezInstanceStateToAdd) {
        if (!EzArray.isArray(ezStatesArray)) {
            throw new EzBadParamException(
                'ezStatesArray',
                EzInstanceState,
                EzInstanceState.ezAddState);
        }
        if (!EzString.stringHasLength(ezInstanceStateToAdd)) {
            throw new EzBadParamException(
                'ezInstanceStateToAdd',
                EzInstanceState,
                EzInstanceState.ezAddState);
        }

        ezInstanceStateToAdd = EzInstanceState.ezAsEnum(ezInstanceStateToAdd);

        if (0 >= ezStatesArray.indexOf(ezInstanceStateToAdd)) {
            // States array already contains the state
            return ezStatesArray;
        }

        // Add the new state to the states array
        ezStatesArray.push(ezInstanceStateToAdd);

        return ezStatesArray;
    }

    /**
        @static
        @public @method
        Removes the provided ezWidgetStateToAdd value to the provided widgetStatesArray if it does not already exist.
        @param {array} widgetStatesArray
        @param {string} ezInstanceStateToRemove
        A valid enum property value from EzInstanceState
        @returns {array}
        Returns the modified widgetStatesArray
     */
    static ezRemoveState(ezStatesArray, ezInstanceStateToRemove) {
        if (!EzArray.isArray(ezStatesArray)) {
            throw new EzBadParamException(
                'ezStatesArray',
                EzInstanceState,
                EzInstanceState.ezRemoveState);
        }
        if (!EzString.stringHasLength(ezInstanceStateToRemove)) {
            throw new EzBadParamException(
                'ezInstanceStateToRemove',
                EzInstanceState,
                EzInstanceState.ezRemoveState);
        }

        ezInstanceStateToRemove = EzInstanceState.ezAsEnum(ezInstanceStateToRemove);

        if (0 > ezStatesArray.indexOf(ezInstanceStateToRemove)) {
            // State isn't in the array
            return ezStatesArray;
        }

        return EzArray.removeAll(ezStatesArray, ezInstanceStateToRemove);
    }
}
