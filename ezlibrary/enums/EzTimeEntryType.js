import { EzEnumeration2 } from '/ezlibrary/enums/EzEnumeration2.js';

/**
    @class
    @extends {EzEnumeration2}9
    @description
    Javascript enumeration equivlant to EzTimeEntryType.java enumeration.
    Defines the available states of a time entry entity.
    ---------------------------------------------------------------------------
    NOTE: When changes get made to this enumeration you will also need to update the
    EzTimeEntryType.java (com.ezclocker.domain) enumeration class with the same changes.
    ---------------------------------------------------------------------------
    Import with:
        import { EzTimeEntryType } from '/ezlibrary/enums/EzTimeEntryType.js';
    ---------------------------------------------------------------------------
    Import with other enumerations:
        import {
            <.. other enumeration clases ..>
            EzTimeEntryType
        } from '/ezlibrary/enums/EzEnumerations.js';
    ---------------------------------------------------------------------------
 */
export class EzTimeEntryType extends EzEnumeration2 {
    /**
        @private @field
        Stores the singleton instance of this enumeration class.
        @type {MyEnumerationClass}
     */
    static #ezEnumerationSingleton = null;

    /**
        @static
        Static Initialization
     */
    static {
        if (null == EzTimeEntryType.#ezEnumerationSingleton) {
            EzTimeEntryType.#ezEnumerationSingleton = new EzTimeEntryType(
                // Enum property names
                [
                    'UNKNOWN',

                    'CLOCK_IN',
                    'GENERIC_TIME',
                    'NORMAL',
                    'PAID_SHIFT',
                    'PAID_SHIFT_START',
                    'UNPAID_SHIFT',
                    'UNPAID_SHIFT_START',

                    'BREAK',
                    'BREAK_IN',
                    'PAID_BREAK',
                    'PAID_BREAK_IN',
                    'UNPAID_BREAK',
                    'UNPAID_BREAK_IN',

                    'PAID_COMPENSATORY_TIME',
                    'UNPAID_COMPENSATORY_TIME',

                    'PAID_ADMINISTRATIVE_LEAVE',
                    'PAID_BEREAVEMENT',
                    'PAID_FAMILY_LEAVE',
                    'PAID_FMLA',
                    'PAID_HOLIDAY',
                    'PAID_JURY_DUTY',
                    'PAID_LEAVE_OF_ABSENSE',
                    'PAID_MATERNITY_LEAVE',
                    'PAID_MEDICAL_LEAVE',
                    'PAID_MILITARY_LEAVE',
                    'PAID_PTO',
                    'PAID_SABBATICAL',
                    'PAID_SICK',
                    'PAID_TIME',
                    'PAID_TIME_OFF',
                    'PAID_TIME_START',
                    'PAID_VACATION',
                    'PAID_VOLUNTEER_TIME_OFF',
                    'PAID_VOLUNTEER_TIME_OFF_START',
                    'PAID_VOTING_TIME',
                    'UNPAID_ADMINISTRATIVE_LEAVE',
                    'UNPAID_BEREAVEMENT',
                    'UNPAID_FAMILY_LEAVE',
                    'UNPAID_FMLA',
                    'UNPAID_HOLIDAY',
                    'UNPAID_JURY_DUTY',
                    'UNPAID_MATERNITY_LEAVE',
                    'UNPAID_MEDICAL_LEAVE',
                    'UNPAID_MILITARY_LEAVE',
                    'UNPAID_PAID_LEAVE_OF_ABSENSE',
                    'UNPAID_PAID_SABBATICAL',
                    'UNPAID_PTO',
                    'UNPAID_SICK',
                    'UNPAID_TIME',
                    'UNPAID_TIME_OFF',
                    'UNPAID_TIME_START',
                    'UNPAID_VACATION',
                    'UNPAID_VOLUNTEER_TIME_OFF',
                    'UNPAID_VOTING_TIME'
                ],
                // Enum property values for each enum property name as an array
                // Enter null if the values are equal to the names
                null,
                // Optional array of additional data for eac enumeration property.
                // Enter null if not needed.
                null);
        }
    }

    static get PTO() {
        return 'PTO';
    }
    static get SICK() {
        return 'SICK';
    }
    static get HOLIDAY() {
        return 'HOLIDAY';
    }
    static get UNPAID() {
        return 'UNPAID';
    }

     static isShiftType(ezTimeEntryTypeValue) {
        let ezTimeEntryType = EzTimeEntryType.ezValueOf(ezTimeEntryTypeValue);

        switch (ezTimeEntryType) {
            case EzTimeEntryType.NORMAL:
            case EzTimeEntryType.PAID_SHIFT:
            case EzTimeEntryType.GENERIC_TIME:
            case EzTimeEntryType.CLOCK_IN:
            case EzTimeEntryType.PAID_SHIFT_START:
            case EzTimeEntryType.UNPAID_SHIFT:
            case EzTimeEntryType.UNPAID_SHIFT_START:
                return true;
            default:
                return false;
        }
    }

    static isPaidShiftType(ezTimeEntryTypeValue) {
        let ezTimeEntryType = EzTimeEntryType.ezValueOf(ezTimeEntryTypeValue);

        switch (ezTimeEntryType) {
            case EzTimeEntryType.NORMAL:
            case EzTimeEntryType.PAID_SHIFT:
            case EzTimeEntryType.GENERIC_TIME:
            case EzTimeEntryType.CLOCK_IN:
            case EzTimeEntryType.PAID_SHIFT_START:
                return true;
            default:
                return false;
        }
    }

    static isUnpaidShiftType(ezTimeEntryTypeValue) {
        let ezTimeEntryType = EzTimeEntryType.ezValueOf(ezTimeEntryTypeValue);

        switch (ezTimeEntryType) {
            case EzTimeEntryType.UNPAID_SHIFT:
            case EzTimeEntryType.UNPAID_SHIFT_START:
                return true;
            default:
                return false;
        }
    }

    static isBreakType(ezTimeEntryTypeValue) {
        let ezTimeEntryType = EzTimeEntryType.ezValueOf(ezTimeEntryTypeValue);

        switch (ezTimeEntryType) {
            case EzTimeEntryType.BREAK:
            case EzTimeEntryType.PAID_BREAK:
            case EzTimeEntryType.UNPAID_BREAK:
            case EzTimeEntryType.BREAK_IN:
            case EzTimeEntryType.PAID_BREAK_IN:
            case EzTimeEntryType.UNPAID_BREAK_IN:
                return true;
            default:
                return false;
        }
    }

    static isPaidBreakType(ezTimeEntryTypeValue) {
        let ezTimeEntryType = EzTimeEntryType.ezValueOf(ezTimeEntryTypeValue);

        switch (ezTimeEntryType) {
            case EzTimeEntryType.BREAK:
            case EzTimeEntryType.PAID_BREAK:
            case EzTimeEntryType.BREAK_IN:
            case EzTimeEntryType.PAID_BREAK_IN:
                return true;
            default:
                return false;
        }
    }

    static isUnpaidBreakType(ezTimeEntryTypeValue) {
        let ezTimeEntryType = EzTimeEntryType.ezValueOf(ezTimeEntryTypeValue);

        switch (ezTimeEntryType) {
            case EzTimeEntryType.UNPAID_BREAK:
            case EzTimeEntryType.UNPAID_BREAK_IN:
                return true;
            default:
                return false;
        }
    }

    static isCompType(ezTimeEntryTypeValue) {
        let ezTimeEntryType = EzTimeEntryType.ezValueOf(ezTimeEntryTypeValue);

        switch (ezTimeEntryType) {
            case EzTimeEntryType.PAID_COMPENSATORY_TIME:
            case EzTimeEntryType.UNPAID_COMPENSATORY_TIME:
                return true;
            default:
                return false;
        }
    }

    static isTimeOffType(ezTimeEntryTypeValue) {
        let ezTimeEntryType = EzTimeEntryType.ezValueOf(ezTimeEntryTypeValue);

        switch (ezTimeEntryType) {
            case EzTimeEntryType.PAID_ADMINISTRATIVE_LEAVE:
            case EzTimeEntryType.PAID_BEREAVEMENT:
            case EzTimeEntryType.PAID_BREAK:
            case EzTimeEntryType.PAID_BREAK_IN:
            case EzTimeEntryType.PAID_COMPENSATORY_TIME:
            case EzTimeEntryType.PAID_FAMILY_LEAVE:
            case EzTimeEntryType.PAID_FMLA:
            case EzTimeEntryType.PAID_HOLIDAY:
            case EzTimeEntryType.PAID_JURY_DUTY:
            case EzTimeEntryType.PAID_LEAVE_OF_ABSENSE:
            case EzTimeEntryType.PAID_MATERNITY_LEAVE:
            case EzTimeEntryType.PAID_MEDICAL_LEAVE:
            case EzTimeEntryType.PAID_MILITARY_LEAVE:
            case EzTimeEntryType.PAID_PTO:
            case EzTimeEntryType.PAID_SABBATICAL:
            case EzTimeEntryType.PAID_SHIFT:
            case EzTimeEntryType.PAID_SHIFT_START:
            case EzTimeEntryType.PAID_SICK:
            case EzTimeEntryType.PAID_TIME:
            case EzTimeEntryType.PAID_TIME_OFF:
            case EzTimeEntryType.PAID_TIME_START:
            case EzTimeEntryType.PAID_VACATION:
            case EzTimeEntryType.PAID_VOLUNTEER_TIME_OFF:
            case EzTimeEntryType.PAID_VOLUNTEER_TIME_OFF_START:
            case EzTimeEntryType.PAID_VOTING_TIME:
            case EzTimeEntryType.UNPAID_ADMINISTRATIVE_LEAVE:
            case EzTimeEntryType.UNPAID_BEREAVEMENT:
            case EzTimeEntryType.UNPAID_BREAK:
            case EzTimeEntryType.UNPAID_BREAK_IN:
            case EzTimeEntryType.UNPAID_COMPENSATORY_TIME:
            case EzTimeEntryType.UNPAID_FAMILY_LEAVE:
            case EzTimeEntryType.UNPAID_FMLA:
            case EzTimeEntryType.UNPAID_HOLIDAY:
            case EzTimeEntryType.UNPAID_JURY_DUTY:
            case EzTimeEntryType.UNPAID_MATERNITY_LEAVE:
            case EzTimeEntryType.UNPAID_MEDICAL_LEAVE:
            case EzTimeEntryType.UNPAID_MILITARY_LEAVE:
            case EzTimeEntryType.UNPAID_PAID_LEAVE_OF_ABSENSE:
            case EzTimeEntryType.UNPAID_PAID_SABBATICAL:
            case EzTimeEntryType.UNPAID_PTO:
            case EzTimeEntryType.UNPAID_SHIFT:
            case EzTimeEntryType.UNPAID_SHIFT_START:
            case EzTimeEntryType.UNPAID_SICK:
            case EzTimeEntryType.UNPAID_TIME:
            case EzTimeEntryType.UNPAID_TIME_OFF:
            case EzTimeEntryType.UNPAID_TIME_START:
            case EzTimeEntryType.UNPAID_VACATION:
            case EzTimeEntryType.UNPAID_VOLUNTEER_TIME_OFF:
            case EzTimeEntryType.UNPAID_VOTING_TIME:
                return true;
            default:
                return false;
        }
    }

    static isUnpaidTimeOffType(ezTimeEntryTypeValue) {
        let ezTimeEntryType = EzTimeEntryType.ezValueOf(ezTimeEntryTypeValue);

        switch (ezTimeEntryType) {
            case EzTimeEntryType.UNPAID_ADMINISTRATIVE_LEAVE:
            case EzTimeEntryType.UNPAID_BEREAVEMENT:
            case EzTimeEntryType.UNPAID_BREAK:
            case EzTimeEntryType.UNPAID_BREAK_IN:
            case EzTimeEntryType.UNPAID_COMPENSATORY_TIME:
            case EzTimeEntryType.UNPAID_FAMILY_LEAVE:
            case EzTimeEntryType.UNPAID_FMLA:
            case EzTimeEntryType.UNPAID_HOLIDAY:
            case EzTimeEntryType.UNPAID_JURY_DUTY:
            case EzTimeEntryType.UNPAID_MATERNITY_LEAVE:
            case EzTimeEntryType.UNPAID_MEDICAL_LEAVE:
            case EzTimeEntryType.UNPAID_MILITARY_LEAVE:
            case EzTimeEntryType.UNPAID_PAID_LEAVE_OF_ABSENSE:
            case EzTimeEntryType.UNPAID_PAID_SABBATICAL:
            case EzTimeEntryType.UNPAID_PTO:
            case EzTimeEntryType.UNPAID_SHIFT:
            case EzTimeEntryType.UNPAID_SHIFT_START:
            case EzTimeEntryType.UNPAID_SICK:
            case EzTimeEntryType.UNPAID_TIME:
            case EzTimeEntryType.UNPAID_TIME_OFF:
            case EzTimeEntryType.UNPAID_TIME_START:
            case EzTimeEntryType.UNPAID_VACATION:
            case EzTimeEntryType.UNPAID_VOLUNTEER_TIME_OFF:
            case EzTimeEntryType.UNPAID_VOTING_TIME:
                return true;
            default:
                return false;
        }
    }

    static isPaidTimeOffType(ezTimeEntryTypeValue) {
        let ezTimeEntryType = EzTimeEntryType.ezValueOf(ezTimeEntryTypeValue);

        switch (ezTimeEntryType) {
            case EzTimeEntryType.PAID_ADMINISTRATIVE_LEAVE:
            case EzTimeEntryType.PAID_BEREAVEMENT:
            case EzTimeEntryType.PAID_BREAK:
            case EzTimeEntryType.PAID_BREAK_IN:
            case EzTimeEntryType.PAID_COMPENSATORY_TIME:
            case EzTimeEntryType.PAID_FAMILY_LEAVE:
            case EzTimeEntryType.PAID_FMLA:
            case EzTimeEntryType.PAID_HOLIDAY:
            case EzTimeEntryType.PAID_JURY_DUTY:
            case EzTimeEntryType.PAID_LEAVE_OF_ABSENSE:
            case EzTimeEntryType.PAID_MATERNITY_LEAVE:
            case EzTimeEntryType.PAID_MEDICAL_LEAVE:
            case EzTimeEntryType.PAID_MILITARY_LEAVE:
            case EzTimeEntryType.PAID_PTO:
            case EzTimeEntryType.PAID_SABBATICAL:
            case EzTimeEntryType.PAID_SHIFT:
            case EzTimeEntryType.PAID_SHIFT_START:
            case EzTimeEntryType.PAID_SICK:
            case EzTimeEntryType.PAID_TIME:
            case EzTimeEntryType.PAID_TIME_OFF:
            case EzTimeEntryType.PAID_TIME_START:
            case EzTimeEntryType.PAID_VACATION:
            case EzTimeEntryType.PAID_VOLUNTEER_TIME_OFF:
            case EzTimeEntryType.PAID_VOLUNTEER_TIME_OFF_START:
            case EzTimeEntryType.PAID_VOTING_TIME:
                return true;
            default:
                return false;
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
