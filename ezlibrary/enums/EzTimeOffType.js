import { EzEnumeration2 } from '/ezlibrary/enums/EzEnumeration2.js';

import { EzTimeEntryType } from '/ezlibrary/enums/EzTimeEntryType.js';

/**
    @class
    @description
    Defines the Time Off types
    >>> WOOT: Does not require EzApi <<<
    ---------------------------------------------------------------------------
    Import with:
        import { EzTimeOffType } from '/ezlibrary/enums/EzTimeOffType.js';
    ---------------------------------------------------------------------------
    Import with other enumerations:
        import {
            ... other enumeration types ...,
            EzTimeOffType
        } from '/ezlibrary/enums/EzEnumerations.js';
    ---------------------------------------------------------------------------
 */
export class EzTimeOffType extends EzEnumeration2 {
    /**
        @private @field
        Stores the singleton instance of this enumeration class.
        @type {EzTimeOffType}
     */
    static #ezEnumerationSingleton = null;

    /**
        @static
        Static Initialization
     */
    static {
        if (null == EzTimeOffType.#ezEnumerationSingleton) {
            EzTimeOffType.#ezEnumerationSingleton = new EzTimeOffType(
                // Enum property names
                [
                    'UNKNOWN',
                    'TIME_OFF',
                    'PAID_COMPENSATORY_TIME',
                    'UNPAID_COMPENSATORY_TIME',
                    'PAID_VOTING_TIME',
                    'UNPAID_VOTING_TIME',
                    'PAID_JURY_DUTY',
                    'UNPAID_JURY_DUTY',
                    'PAID_BEREAVEMENT',
                    'UNPAID_BEREAVEMENT',
                    'PAID_MILITARY_LEAVE',
                    'UNPAID_MILITARY_LEAVE',
                    'PAID_TIME_OFF',
                    'UNPAID_TIME_OFF',
                    'PAID_PTO',
                    'UNPAID_PTO',
                    'PAID_SICK',
                    'UNPAID_SICK',
                    'PAID_HOLIDAY',
                    'UNPAID_HOLIDAY',
                    'PAID_FMLA',
                    'UNPAID_FMLA',
                    'PAID_MATERNITY_LEAVE',
                    'UNPAID_MATERNITY_LEAVE',
                    'PAID_FAMILY_LEAVE',
                    'UNPAID_FAMILY_LEAVE',
                    'PAID_MEDICAL_LEAVE',
                    'UNPAID_MEDICAL_LEAVE',
                    'PAID_VACATION',
                    'UNPAID_VACATION',
                    'PAID_ADMINISTRATIVE_LEAVE',
                    'UNPAID_ADMINISTRATIVE_LEAVE',
                    'PAID_VOLUNTEER_TIME_OFF',
                    'UNPAID_VOLUNTEER_TIME_OFF',
                    // Deprecated: Migrate to PAID_SICK
                    'SICK',
                    // Deprecated: Migrate to PAID_HOLIDAY
                    'HOLIDAY',
                    // Deprecated: Migrate to PAID_PTO
                    'PTO',
                    // Deprecated: Migrate to PAID_VACATION
                    'VACATION',
                    // Deprecated: Migrate to UNPAID_TIME_OFF
                    'UNPAID'
                ],
                // Enum property values for each enum property name as an array
                // Enter null if the values are equal to the names
                null,
                // Optional array of additional data for eac enumeration property.
                // Enter null if not needed.
                [
                    // UNKNOWN
                    {
                        displayName: "Undefined Time",
                        paid: false,
                        paidOptiona: true,
                        primaryTimeEntryType: EzTimeEntryType.UNKNOWN,
                        suportedEzTimeEntryTypes: [
                            EzTimeEntryType.UNKNOWN
                        ]
                    },
                    // TIME_OFF
                    {
                        displayName: "Time Off",
                        paid: false,
                        paidOptiona: true,
                        primaryTimeEntryType: EzTimeEntryType.GENERIC_TIME,
                        suportedEzTimeEntryTypes: [
                            EzTimeEntryType.GENERIC_TIME,
                            EzTimeEntryType.UNPAID_TIME,
                            EzTimeEntryType.PAID_TIME,
                            EzTimeEntryType.TIME_OFF
                        ]
                    },
                    // PAID_COMPENSATORY_TIME
                    {
                        displayName: 'Paid Compensatory',
                        paid: true,
                        paidOptional: false,
                        primaryTimeEntryType: EzTimeEntryType.PAID_COMPENSATORY_TIME,
                        suportedEzTimeEntryTypes: [
                            EzTimeEntryType.GENERIC_TIME,
                            EzTimeEntryType.PAID_COMPENSATORY_TIME,
                            EzTimeEntryType.PAID_TIME_OFF,
                            EzTimeEntryType.TIME_OF
                        ]
                    },
                    // UNPAID_COMPENSATORY_TIME
                    {
                        displayName: 'Unpaid Compensatory',
                        paid: false,
                        paidOptional: false,
                        primaryTimeEntryType: EzTimeEntryType.UNPAID_TIME,
                        suportedEzTimeEntryTypes: [
                            EzTimeEntryType.GENERIC_TIME,
                            EzTimeEntryType.UNPAID_TIME
                        ]
                    },
                    // PAID_VOTING_TIME
                    {
                        displayName: 'Paid Voting',
                        paid: true,
                        paidOptional: false,
                        primaryTimeEntryType: EzTimeEntryType.PAID_VOTING_TIME,
                        suportedEzTimeEntryTypes: [
                            EzTimeEntryType.GENERIC_TIME,
                            EzTimeEntryType.PAID_VOTING_TIME,
                            EzTimeEntryType.PAID_TIME_OFF,
                            EzTimeEntryType.TIME_OFF
                        ]
                    },
                    // UNPAID_VOTING_TIME
                    {
                        displayName: 'Unpaid Voting',
                        paid: false,
                        paidOptional: false,
                        primaryTimeEntryType: EzTimeEntryType.UNPAID_TIME,
                        suportedEzTimeEntryTypes: [
                            EzTimeEntryType.GENERIC_TIME,
                            EzTimeEntryType.UNPAID_TIME
                        ]
                    },
                    // PAID_JURY_DUTY
                    {
                        displayName: 'Paid Jury Duty',
                        paid: true,
                        paidOptional: false,
                        primaryTimeEntryType: EzTimeEntryType.PAID_JURY_DUTY,
                        suportedEzTimeEntryTypes: [
                            EzTimeEntryType.GENERIC_TIME,
                            EzTimeEntryType.PAID_JURY_DUTY,
                            EzTimeEntryType.PAID_TIME_OFF,
                            EzTimeEntryType.TIME_OFF
                        ]
                    },
                    // UNPAID_JURY_DUTY
                    {
                        displayName: 'Unpaid Jury Duty',
                        paid: false,
                        paidOptional: false,
                        primaryTimeEntryType: EzTimeEntryType.UNPAID_TIME,
                        suportedEzTimeEntryTypes: [
                            EzTimeEntryType.GENERIC_TIME,
                            EzTimeEntryType.UNPAID_TIME
                        ]
                    },
                    // PAID_BEREAVEMENT
                    {
                        displayName: 'Paid Bereavement',
                        paid: true,
                        paidOptional: false,
                        primaryTimeEntryType: EzTimeEntryType.PAID_BEREAVEMENT,
                        suportedEzTimeEntryTypes: [
                            EzTimeEntryType.GENERIC_TIME,
                            EzTimeEntryType.PAID_BEREAVEMENT,
                            EzTimeEntryType.PAID_TIME_OFF,
                            EzTimeEntryType.TIME_OFF
                        ]
                    },
                    // UNPAID_BEREAVEMENT
                    {
                        displayName: 'Unpaid Bereavement',
                        paid: false,
                        paidOptional: false,
                        primaryTimeEntryType: EzTimeEntryType.UNPAID_TIME,
                        suportedEzTimeEntryTypes: [
                            EzTimeEntryType.GENERIC_TIME,
                            EzTimeEntryType.UNPAID_TIME
                        ]
                    },
                    // PAID_MILITARY_LEAVE
                    {
                        displayName: 'Paid Military Leave',
                        paid: true,
                        paidOptional: false,
                        primaryTimeEntryType: EzTimeEntryType.PAID_MILITARY_LEAVE,
                        suportedEzTimeEntryTypes: [
                            EzTimeEntryType.GENERIC_TIME,
                            EzTimeEntryType.PAID_MILITARY_LEAVE,
                            EzTimeEntryType.PAID_TIME_OFF,
                            EzTimeEntryType.TIME_OFF
                        ]
                    },
                    // UNPAID_MILITARY_LEAVE
                    {
                        displayName: 'Unpaid Military Leave',
                        paid: false,
                        paidOptional: false,
                        primaryTimeEntryType: EzTimeEntryType.UNPAID_TIME,
                        suportedEzTimeEntryTypes: [
                            EzTimeEntryType.GENERIC_TIME,
                            EzTimeEntryType.UNPAID_TIME
                        ]
                    },
                    // PAID_TIME_OFF
                    {
                        displayName: 'Paid Time Off',
                        paid: true,
                        paidOptional: false,
                        primaryTimeEntryType: EzTimeEntryType.PAID_TIME_OFF,
                        suportedEzTimeEntryTypes: [
                            EzTimeEntryType.GENERIC_TIME,
                            EzTimeEntryType.PAID_LEAVE_OF_ABSENSE,
                            EzTimeEntryType.PAID_SABBATICAL,
                            EzTimeEntryType.PAID_COMPENSATORY_TIME,
                            EzTimeEntryType.PAID_VOTING_TIME,
                            EzTimeEntryType.PAID_JURY_DUTY,
                            EzTimeEntryType.PAID_BEREAVEMENT,
                            EzTimeEntryType.PAID_MILITARY_LEAVE,
                            EzTimeEntryType.PAID_TIME_OFF,
                            EzTimeEntryType.PAID_LEAVE_OF_ABSENSE,
                            EzTimeEntryType.PAID_SABBATICAL,
                            EzTimeEntryType.PAID_COMPENSATORY_TIME,
                            EzTimeEntryType.PAID_VOTING_TIME,
                            EzTimeEntryType.PAID_JURY_DUTY,
                            EzTimeEntryType.PAID_BEREAVEMENT,
                            EzTimeEntryType.PAID_MILITARY_LEAVE,
                            EzTimeEntryType.PAID_ADMINISTRATIVE_LEAVE,
                            EzTimeEntryType.PAID_FAMILY_LEAVE,
                            EzTimeEntryType.PAID_FMLA,
                            EzTimeEntryType.PAID_HOLIDAY,
                            EzTimeEntryType.PAID_MATERNITY_LEAVE,
                            EzTimeEntryType.PAID_MEDICAL_LEAVE,
                            EzTimeEntryType.PAID_PTO,
                            EzTimeEntryType.PAID_SICK,
                            EzTimeEntryType.PAID_VACATION,
                            EzTimeEntryType.PAID_VOLUNTEER_TIME_OFF,
                            EzTimeEntryType.PAID_VOLUNTEER_TIME_OFF_START,
                            EzTimeEntryType.PTO,
                            EzTimeEntryType.SICK,
                            EzTimeEntryType.HOLIDAY,
                            EzTimeEntryType.VACATION,
                            EzTimeEntryType.TIME_OFF
                        ]
                    },
                    // UNPAID_TIME_OFF
                    {
                        displayName: 'Unpaid Time Off',
                        paid: false,
                        paidOptional: false,
                        primaryTimeEntryType: EzTimeEntryType.UNPAID_TIME,
                        suportedEzTimeEntryTypes: [
                            EzTimeEntryType.GENERIC_TIME,
                            EzTimeEntryType.UNPAID_TIME
                        ]
                    },
                    // PAID_PTO
                    {
                        displayName: 'Paid PTO',
                        paid: true,
                        paidOptional: false,
                        primaryTimeEntryType: EzTimeEntryType.PAID_PTO,
                        suportedEzTimeEntryTypes: [
                            EzTimeEntryType.GENERIC_TIME,
                            EzTimeEntryType.PAID_PTO,
                            EzTimeEntryType.PAID_TIME_OFF,
                            EzTimeEntryType.PTO,
                            EzTimeEntryType.TIME_OFF
                        ]
                    },
                    // UNPAID_PTO
                    {
                        displayName: 'Unpaid PTO',
                        paid: false,
                        paidOptional: false,
                        primaryTimeEntryType: EzTimeEntryType.UNPAID_TIME,
                        suportedEzTimeEntryTypes: [
                            EzTimeEntryType.UNPAID_TIME
                        ]
                    },
                    // PAID_SICK
                    {
                        displayName: 'Paid Sick',
                        paid: true,
                        paidOptional: false,
                        primaryTimeEntryType: EzTimeEntryType.PAID_SICK,
                        suportedEzTimeEntryTypes: [
                            EzTimeEntryType.GENERIC_TIME,
                            EzTimeEntryType.PAID_SICK,
                            EzTimeEntryType.PAID_TIME_OFF,
                            EzTimeEntryType.SICK,
                            EzTimeEntryType.TIME_OFF
                        ]
                    },
                    // UNPAID_SICK
                    {
                        displayName: 'Unpaid Sick',
                        paid: false,
                        paidOptional: false,
                        primaryTimeEntryType: EzTimeEntryType.UNPAID_TIME,
                        suportedEzTimeEntryTypes: [
                            EzTimeEntryType.GENERIC_TIME,
                            EzTimeEntryType.UNPAID_TIME
                        ]
                    },
                    // PAID_HOLIDAY
                    {
                        displayName: 'Paid Holiday',
                        paid: true,
                        paidOptional: false,
                        primaryTimeEntryType: EzTimeEntryType.PAID_HOLIDAY,
                        suportedEzTimeEntryTypes: [
                            EzTimeEntryType.GENERIC_TIME,
                            EzTimeEntryType.PAID_HOLIDAY,
                            EzTimeEntryType.PAID_TIME_OFF,
                            EzTimeEntryType.HOLIDAY,
                            EzTimeEntryType.TIME_OFF
                        ]
                    },
                    // UNPAID_HOLIDAY
                    {
                        displayName: 'Unpaid Holiday',
                        paid: false,
                        paidOptional: false,
                        primaryTimeEntryType: EzTimeEntryType.UNPAID_TIME,
                        suportedEzTimeEntryTypes: [
                            EzTimeEntryType.GENERIC_TIME,
                            EzTimeEntryType.UNPAID_TIME
                        ]
                    },
                    // PAID_FMLA
                    {
                        displayName: 'Paid FMLA',
                        paid: true,
                        paidOptional: false,
                        primaryTimeEntryType: EzTimeEntryType.PAID_FMLA,
                        suportedEzTimeEntryTypes: [
                            EzTimeEntryType.GENERIC_TIME,
                            EzTimeEntryType.PAID_FMLA,
                            EzTimeEntryType.PAID_TIME_OFF,
                            EzTimeEntryType.TIME_OFF
                        ]
                    },
                    // UNPAID_FMLA
                    {
                        displayName: 'Unpaid FMLA',
                        paid: false,
                        paidOptional: false,
                        primaryTimeEntryType: EzTimeEntryType.UNPAID_TIME,
                        suportedEzTimeEntryTypes: [
                            EzTimeEntryType.GENERIC_TIME,
                            EzTimeEntryType.UNPAID_TIME
                        ]
                    },
                    // PAID_MATERNITY_LEAVE
                    {
                        displayName: 'Paid Maternity Leave"',
                        paid: true,
                        paidOptional: false,
                        primaryTimeEntryType: EzTimeEntryType.PAID_MATERNITY_LEAVE,
                        suportedEzTimeEntryTypes: [
                            EzTimeEntryType.GENERIC_TIME,
                            EzTimeEntryType.PAID_MATERNITY_LEAVE,
                            EzTimeEntryType.PAID_TIME_OFF,
                            EzTimeEntryType.TIME_OFF
                        ]
                    },
                    // UNPAID_MATERNITY_LEAVE
                    {
                        displayName: 'Unpaid Maternity Leave',
                        paid: false,
                        paidOptional: false,
                        primaryTimeEntryType: EzTimeEntryType.UNPAID_TIME,
                        suportedEzTimeEntryTypes: [
                            EzTimeEntryType.GENERIC_TIME,
                            EzTimeEntryType.UNPAID_TIME
                        ]
                    },
                    // PAID_FAMILY_LEAVE
                    {
                        displayName: 'Paid Family Leave',
                        paid: true,
                        paidOptional: false,
                        primaryTimeEntryType: EzTimeEntryType.PAID_FAMILY_LEAVE,
                        suportedEzTimeEntryTypes: [
                            EzTimeEntryType.GENERIC_TIME,
                            EzTimeEntryType.PAID_FAMILY_LEAVE,
                            EzTimeEntryType.PAID_TIME_OFF,
                            EzTimeEntryType.TIME_OFF
                        ]
                    },
                    // UNPAID_FAMILY_LEAVE
                    {
                        displayName: 'Unpaid Family Leave',
                        paid: false,
                        paidOptional: false,
                        primaryTimeEntryType: EzTimeEntryType.UNPAID_TIME,
                        suportedEzTimeEntryTypes: [
                            EzTimeEntryType.GENERIC_TIME,
                            EzTimeEntryType.UNPAID_TIME
                        ]
                    },
                    // PAID_MEDICAL_LEAVE
                    {
                        displayName: 'Paid Medical Leav',
                        paid: true,
                        paidOptional: false,
                        primaryTimeEntryType: EzTimeEntryType.PAID_MEDICAL_LEAVE,
                        suportedEzTimeEntryTypes: [
                            EzTimeEntryType.GENERIC_TIME,
                            EzTimeEntryType.PAID_MEDICAL_LEAVE,
                            EzTimeEntryType.PAID_TIME_OFF,
                            EzTimeEntryType.TIME_OFF
                        ]
                    },
                    // UNPAID_MEDICAL_LEAVE
                    {
                        displayName: 'Unpaid Medical Leave',
                        paid: false,
                        paidOptional: false,
                        primaryTimeEntryType: EzTimeEntryType.UNPAID_TIME,
                        suportedEzTimeEntryTypes: [
                            EzTimeEntryType.GENERIC_TIME,
                            EzTimeEntryType.UNPAID_TIME
                        ]
                    },
                    // PAID_VACATION
                    {
                        displayName: 'Paid Vacation',
                        paid: true,
                        paidOptional: false,
                        primaryTimeEntryType: EzTimeEntryType.PAID_VACATION,
                        suportedEzTimeEntryTypes: [
                            EzTimeEntryType.GENERIC_TIME,
                            EzTimeEntryType.PAID_VACATION,
                            EzTimeEntryType.PAID_TIME_OFF,
                            EzTimeEntryType.VACATION,
                            EzTimeEntryType.TIME_OFF
                        ]
                    },
                    // UNPAID_VACATION
                    {
                        displayName: 'Unpaid Vacation',
                        paid: false,
                        paidOptional: false,
                        primaryTimeEntryType: EzTimeEntryType.UNPAID_TIME,
                        suportedEzTimeEntryTypes: [
                            EzTimeEntryType.GENERIC_TIME,
                            EzTimeEntryType.UNPAID_TIME
                        ]
                    },
                    // PAID_ADMINISTRATIVE_LEAVE
                    {
                        displayName: 'Paid Administrative Leave',
                        paid: true,
                        paidOptional: false,
                        primaryTimeEntryType: EzTimeEntryType.PAID_ADMINISTRATIVE_LEAVE,
                        suportedEzTimeEntryTypes: [
                            EzTimeEntryType.GENERIC_TIME,
                            EzTimeEntryType.PAID_ADMINISTRATIVE_LEAVE,
                            EzTimeEntryType.PAID_TIME_OFF,
                            EzTimeEntryType.TIME_OFF
                        ]
                    },
                    // UNPAID_ADMINISTRATIVE_LEAVE
                    {
                        displayName: 'Unpaid Administrative Leave',
                        paid: false,
                        paidOptional: false,
                        primaryTimeEntryType: EzTimeEntryType.UNPAID_TIME,
                        suportedEzTimeEntryTypes: [
                            EzTimeEntryType.GENERIC_TIME,
                            EzTimeEntryType.UNPAID_TIME
                        ]
                    },
                    // PAID_VOLUNTEER_TIME_OFF
                    {
                        displayName: 'Paid Volunteer',
                        paid: true,
                        paidOptional: false,
                        primaryTimeEntryType: EzTimeEntryType.PAID_VOLUNTEER_TIME_OFF,
                        suportedEzTimeEntryTypes: [
                            EzTimeEntryType.GENERIC_TIME,
                            EzTimeEntryType.PAID_VOLUNTEER_TIME_OFF,
                            EzTimeEntryType.PAID_VOLUNTEER_TIME_OFF_START,
                            EzTimeEntryType.PAID_TIME_OFF,
                            EzTimeEntryType.TIME_OFF
                        ]
                    },
                    // UNPAID_VOLUNTEER_TIME_OFF
                    {
                        displayName: 'Unpaid Volunteer',
                        paid: false,
                        paidOptional: false,
                        primaryTimeEntryType: EzTimeEntryType.UNPAID_TIME,
                        suportedEzTimeEntryTypes: [
                            EzTimeEntryType.GENERIC_TIME,
                            EzTimeEntryType.UNPAID_TIME
                        ]
                    },
                    // SICK
                    {
                        displayName: 'Paid Sick',
                        paid: true,
                        paidOptional: false,
                        primaryTimeEntryType: EzTimeEntryType.PAID_SICK,
                        suportedEzTimeEntryTypes: [
                            EzTimeEntryType.GENERIC_TIME,
                            EzTimeEntryType.PAID_SICK,
                            EzTimeEntryType.SICK,
                            EzTimeEntryType.TIME_OFF
                        ]
                    },
                    // HOLIDAY
                    {
                        displayName: 'Paid Holiday',
                        paid: true,
                        paidOptional: false,
                        primaryTimeEntryType: EzTimeEntryType.PAID_HOLIDAY,
                        suportedEzTimeEntryTypes: [
                            EzTimeEntryType.GENERIC_TIME,
                            EzTimeEntryType.PAID_HOLIDAY,
                            EzTimeEntryType.HOLIDAY,
                            EzTimeEntryType.TIME_OFF
                        ]
                    },
                    // PTO
                    {
                        displayName: 'Paid PTO',
                        paid: true,
                        paidOptional: false,
                        primaryTimeEntryType: EzTimeEntryType.PAID_PTO,
                        suportedEzTimeEntryTypes: [
                            EzTimeEntryType.GENERIC_TIME,
                            EzTimeEntryType.PAID_PTO,
                            EzTimeEntryType.PTO,
                            EzTimeEntryType.TIME_OFF
                        ]
                    },
                    // VACATION
                    {
                        displayName: 'Paid Vacation',
                        paid: true,
                        paidOptional: false,
                        primaryTimeEntryType: EzTimeEntryType.PAID_VACATION,
                        suportedEzTimeEntryTypes: [
                            EzTimeEntryType.GENERIC_TIME,
                            EzTimeEntryType.PAID_VACATION,
                            EzTimeEntryType.VACATION,
                            EzTimeEntryType.TIME_OFF
                        ]
                    },
                    // UNPAID
                    {
                        displayName: 'Unpaid Time Off',
                        paid: false,
                        paidOptional: false,
                        primaryTimeEntryType: EzTimeEntryType.UNPAID_TIME,
                        suportedEzTimeEntryTypes: [
                            EzTimeEntryType.GENERIC_TIME,
                            EzTimeEntryType.UNPAID_TIME
                        ]
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
