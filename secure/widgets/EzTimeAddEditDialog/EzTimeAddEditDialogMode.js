
/**
    TODO: Re-factor so enumeration class extends from EzEnumeration2.js
    Defines the possible time entry dialog modes.
    Import with:
        import { EzTimeAddEditDialogMode } from '/secure/widgets/EzTimeAddEditDialog/EzTimeAddEditDialogMode.js';
 */
export class EzTimeAddEditDialogMode {
    /**
        @public @static @readonly @property
        An array of the possible EzTimeAddEditDialogMode string values.
        @returns {array}
     */
    static get ezValues() {
        return [
            'UNKNOWN',
            'ADD_TIME_ENTRY',
            'UPDATE_TIME_ENTRY',
            'UPDATE_ACTIVE_TIME_ENTRY',
            'ADD_BREAK',
            'UPDATE_BREAK',
            'UPDATE_ACTIVE_BREAK'
        ];
    }

    /**
        @pulic @static @readonly @property
        Returns an array of dialog mode submit messages.
        @returns {array}
     */
    static get ezTimeAddEditDialogModeSubmitMsg() {
        return EzTimeAddEditDialogMode.ezValues;
    }

    /**
        @public @static @readonly @property
        The time edit dialog mode is unknown or not yet set.
        @returns {string}
     */
    static get UNKNOWN() {
        return EzTimeAddEditDialogMode.ezValues[0];
    }

    /**
        @public @static @readonly @property
        The time edit dialog mode is for adding a new time entry.
        @returns {string}
     */
    static get ADD_TIME_ENTRY() {
        return EzTimeAddEditDialogMode.ezValues[1];
    }

    /**
        @public @static @readonly @property
        The time edit dialog mode is for updating an existing time entry.
        @returns {string}
     */
    static get UPDATE_TIME_ENTRY() {
        return EzTimeAddEditDialogMode.ezValues[2];
    }

    /**
        @public @static @readonly @property
        The time edit dialog mode is for updating the active time entry (active clock in).
        @returns {string}
     */
    static get UPDATE_ACTIVE_TIME_ENTRY() {
        return EzTimeAddEditDialogMode.ezValues[3];
    }

    /**
        @public @static @readonly @property
        The time edit dialog mode is for adding a new break.
        @returns {string}
     */
    static get ADD_BREAK() {
        return EzTimeAddEditDialogMode.ezValues[4];
    }

    /**
        @public @static @readonly @property
        The time edit dialog mode is for updating an existing break.
        @returns {string}
     */
    static get UPDATE_BREAK() {
        return EzTimeAddEditDialogMode.ezValues[5];
    }

    /**
        @public @static @readonly @property
        The time edit dialog mode is for updating the active break.
        @returns {string}
     */
    static get UPDATE_ACTIVE_BREAK() {
        return EzTimeAddEditDialogMode.ezValues[6];
    }

    /**
        @public @static @method
        Returns the matching enumeration value for the provided value. If the provided value
        does not match any known enumeration values, UNKNOWN is returned.
        @param {string} ezTimeAddEditDialogMode
        @returns {string}
        A defined value in EzTimeAddEditDialogMode
     */
    static ezFromValue(ezTimeAddEditDialogMode) {
        if (undefined === ezTimeAddEditDialogMode ||
            null === ezTimeAddEditDialogMode ||
            'string' !== typeof ezTimeAddEditDialogMode) {
            return EzTimeAddEditDialogMode.UNKNOWN;
        }

        ezTimeAddEditDialogMode = ezTimeAddEditDialogMode.toUpperCase();

        return EzTimeAddEditDialogMode.ezValues.includes(ezTimeAddEditDialogMode)
            ? EzTimeAddEditDialogMode[ezTimeAddEditDialogMode]
            : EzTimeAddEditDialogMode.UNKNOWN;
    }

    /**
        @public @static @method
        Returns if the provided EzTimeAddEditDialogMode value is for adding a new time entry or break.
        @param {string} ezTimeAddEditDialogMode
        A valid enum property value of EzTimeAddEditDialogMode
        @returns {boolean}
     */
    static ezIsAddDialogMode(ezTimeAddEditDialogMode) {
        return EzTimeAddEditDialogMode.ezIsAddTimeEntryDialogMode(ezTimeAddEditDialogMode) ||
            EzTimeAddEditDialogMode.ezIsAddBreakDialogMode(ezTimeAddEditDialogMode);
    }

    /**
        @public @static @method
        Returns if the provided EzTimeAddEditDialogMode value is for adding a new time entry.
        @param {string} ezTimeAddEditDialogMode
        A valid enum property value of EzTimeAddEditDialogMode
        @returns {boolean}
     */
    static ezIsAddTimeEntryDialogMode(ezTimeAddEditDialogMode) {
        return EzTimeAddEditDialogMode.ADD_TIME_ENTRY === ezTimeAddEditDialogMode;
    }

    /**
        @public @static @method
        Returns if the provided EzTimeAddEditDialogMode value is for adding a new break.
        @param {string} ezTimeAddEditDialogMode
        A valid enum property value of EzTimeAddEditDialogMode
        @returns {boolean}
     */
    static ezIsAddBreakDialogMode(ezTimeAddEditDialogMode) {
        return EzTimeAddEditDialogMode.ADD_BREAK === ezTimeAddEditDialogMode;
    }

    /**
        @public @static @method
        Returns if the provided EzTimeAddEditDialogMode value is for updating
        a time entry or break (active and non-active).
        @param {string} ezTimeAddEditDialogMode
        A valid enum property value of EzTimeAddEditDialogMode
        @returns {boolean}
     */
    static ezIsUpdateDialogMode(ezTimeAddEditDialogMode) {
        return EzTimeAddEditDialogMode.ezIsUpdateDialogMode(ezTimeAddEditDialogMode) ||
            EzTimeAddEditDialogMode.ezIsUpdateBreakDialogMode(ezTimeAddEditDialogMode);
    }

    /**
        @public @static @method
        Returns if the provided EzTimeAddEditDialogMode value is for updating a active or non-active time entry.
        @param {string} ezTimeAddEditDialogMode
        A valid enum property value of EzTimeAddEditDialogMode
        @returns {boolean}
     */
    static ezIsUpdateTimeEntryDialogMode(ezTimeAddEditDialogMode) {
        return EzTimeAddEditDialogMode.UPDATE_TIME_ENTRY === ezTimeAddEditDialogMode ||
            EzTimeAddEditDialogMode.UPDATE_ACTIVE_TIME_ENTRY === ezTimeAddEditDialogMode;
    }

    /**
        @public @static @method
        Returns if the provided EzTimeAddEditDialogMode value is for updating a active time entry.
        @param {string} ezTimeAddEditDialogMode
        A valid enum property value of EzTimeAddEditDialogMode
        @returns {boolean}
     */
    static ezIsUpdateActiveTimeEntryDialogMode(ezTimeAddEditDialogMode) {
        return EzTimeAddEditDialogMode.UPDATE_ACTIVE_BREAK === ezTimeAddEditDialogMode;
    }


    /**
        @public @static @method
        Returns if the provided EzTimeAddEditDialogMode value is for updating a active or non-active break
        @param {string} ezTimeAddEditDialogMode
        A valid enum property value of EzTimeAddEditDialogMode
        @returns {boolean}
     */
    static ezIsUpdateBreakDialogMode(ezTimeAddEditDialogMode) {
        return EzTimeAddEditDialogMode.UPDATE_BREAK === ezTimeAddEditDialogMode ||
            EzTimeAddEditDialogMode.UPDATE_ACTIVE_BREAK === ezTimeAddEditDialogMode;
    }

    /**
        @public @static @method
        Returns if the provided EzTimeAddEditDialogMode value is for updating a active break
        @param {string} ezTimeAddEditDialogMode
        A valid enum property value of EzTimeAddEditDialogMode
        @returns {boolean}
     */
    static ezIsUpdateActiveBreakDialogMode(ezTimeAddEditDialogMode) {
        return EzTimeAddEditDialogMode.UPDATE_ACTIVE_BREAK === ezTimeAddEditDialogMode;
    }
}
