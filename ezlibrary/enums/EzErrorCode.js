import { EzEnumeration2 } from '/ezlibrary/enums/EzEnumeration2.js';

import { EzHttpStatus } from '/ezlibrary/enums/EzHttpStatus.js';
import { EzErrorCodeInfo } from '/ezlibrary/entities/EzErrorCodeInfo.js';
import { EzNovaErrorCode } from '/ezlibrary/enums/EzNovaErrorCode.js';

/**
 * @class
 * @extends {EzEnumeration2}
 * Defines the exclocker error codes that might return from service calls.
 * IMPORTANT: Keep in sync with Java's com.ezclocker.constants.EzClockerErrorCode.java enumeration.
 * -----------------------------------------------------------------
 * Import into non-enumeration classes with:
 *     import {
 *         <... other enumeration classes ...>,
 *         EzErrorCode
 *     }
 *     from '/ezlibrary/enums/EzEnumerations.js';
 * -----------------------------------------------------------------
 * Import into other enumeration classes with:
 *     import { EzErrorCode } from '/ezlibrary/enums/EzErrorCode.js';
 * -----------------------------------------------------------------
 */
export class EzErrorCode extends EzEnumeration2 {
    /**
     * @private @field
     * Stores the singleton instance of this enumeration class.
     * @type {EzErrorCode}
     */
    static #ezEnumerationSingleton = null;

    /**
     * @static
     * Static Initialization
     */
    static {
        if (null == EzErrorCode.#ezEnumerationSingleton) {
            EzErrorCode.#ezEnumerationSingleton = new EzErrorCode(
                // Enum property names
                [
                    'UNKNOWN',
                    /*
                     * ======================================================================
                     * Global Error Codes
                     *
                     * Available for internal API and mobile API.
                     * Global error codes range from 0 to 5999
                     * ======================================================================
                     */

                    // ~~~~~~-~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                    // Global Generic Error Codes
                    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                    /**
                     * No error
                     * Error Code: 0
                     */
                    'NONE',
                    /**
                     * General Error
                     * Error code: 1
                     */
                    'ERROR',
                    /**
                     * Unauthorized error
                     * Error Code: 401
                     */
                    'UNAUTHORIZED',
                    /**
                     * Forbidden error
                     * Error Code: 403
                     */
                    'FORBIDDEN',
                    /**
                     * Internal server error
                     * Error Code: 500
                     */
                    'INTERNAL',
                    /**
                     * Error Code: 0
                     * No error
                     */
                    'NO_ERROR',
                    /**
                     * Error Code: 1
                     * Internal server error
                     */
                    'INTERNAL_ERROR',
                    /**
                     * Error Code: 3
                     * Exception, see message
                     */
                    'ERROR_EXCEPTION_SEE_MESSAGE',
                    /**
                     * Error Code: 5
                     * Bad or missing parameter
                     */
                    'ERROR_MISSING_PARAM',
                    /**
                     * Error Code: 999
                     * Operation Failed
                     */
                    'ERROR_OPERATION_FAILED',
                    /**
                     * Error Code: 1000
                     * HttpStatus Related Error Codes
                     */
                    'HTTP_ERROR_CODE',
                    /**
                     * Error Code: 1400
                     * Bad field exception
                     */
                    'BAD_FIELD_EXCEPTION',

                    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                    // Global Clock In Error Codes
                    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                    /**
                     * Error Code: 1
                     * Active clock in error
                     */
                    'ERROR_ACTIVE_CLOCKIN',
                    /**
                     * Error Code: 2
                     * No active clock in error
                     */
                    'ERROR_NO_ACTIVE_CLOCKIN',

                    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                    // Global Time Entry Error Codes
                    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                    /**
                     * Error Code: 4
                     * Modify time entry requires notes error
                     */
                    'ERROR_MODIFY_TIME_ENTRY_REQUIRES_NOTES',
                    /**
                     * Error Code: 9
                     */
                    'ERROR_TIMEENTRY_DOES_NOT_EXIST',

                    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                    // Global Location Error Codes
                    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                    /**
                     * Error Code: 6
                     */
                    'ERROR_LOCATION_NOT_ACCEPTABLE',

                    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                    // Global User Error Codes
                    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                    /**
                     * Error Code: 7
                     * User is banned
                     */
                    'ERROR_USER_IS_BANNED',
                    /**
                     * User exists
                     * Error Code: 8
                     */
                    'ERROR_USER_EXISTS',
                    /**
                     * User exists
                     * Error Code: 30
                     */
                    'ERROR_CANNOT_CLEAR_USERNAME',
                    /**
                     * Clear user name: email
                     * Error Code: 31
                     */
                    'ERROR_CANNOT_CLEAR_EMAIL_USERNAME',
                    /**
                     * User exists
                     * Error Code: 32
                     */
                    'ERROR_CANNOT_CLEAR_PHONENUMBER_USERNAME',
                    /**
                     * Error Code: 80
                     * User phone number exists
                     */
                    'ERROR_USER_PHONE_NUMBER_EXISTS',
                    /**
                     * Error Code: 81
                     * User name as email exists
                     */
                    'ERROR_USER_NAME_EXISTS',
                    /**
                     * Error Code: 800
                     * User name as email exists
                     */
                    'ERROR_EMAIL_ADDRESS_EXISTS',

                    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                    // Global Subscription Error Codes
                    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                    /**
                     * Error Code: 10
                     */
                    'ERROR_FREE_TRIAL_EXPIRED',
                    /**
                     * Error Code: 13
                     */
                    'FAILED_TO_DOWNGRADE_TO_FREE',
                    /**
                     * Error Code: 14
                     */
                    'SUBSCRIBE_TO_PLAN_FAILED',
                    /**
                     * Error Code: 15
                     */
                    'ERROR_CANCEL_SUBSCRIPTION_PLAN',
                    /**
                     * Error Code: 402
                     * Invalid License
                     */
                    'ERROR_INVALID_LICENSE',
                    /**
                     * Error Code: 404
                     */
                    'SUBSCRIPTION_NOT_FOUND',
                    /**
                     * Error Code: 424
                     */
                    'SUBSCRIPTION_VALIDATION_ERROR',
                    /**
                     * Error Code: 1412
                     * Subscription payment needed
                     */
                    'SUBSCRIPTION_PAYMENT_NEEDED',
                    /**
                     * Error Code: 5514
                     */
                    'ERROR_DISCOUNT_CODE_NOT_VALID',
                    /**
                     * Error Code: 5614
                     */
                    'BRAINTREE_ERROR_RISK_THRESHOLD',
                    /**
                     * Generic BrainTree Error (see errorMessages)
                     * ErrorCode: 5900
                     */
                    'BRAINTREE_VALIDATION_ERROR',
                    /**
                     * No available employee slots for current license
                     * ErrorCode: 5901
                     */
                    'ERROR_NO_AVAILABLE_LICENSE_SLOTS',

                    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                    // Global Employer Error Codes
                    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                    /**
                     * Error Code: 11
                     */
                    'DEFAULT_EMPLOYER_DENIED_ACTION_EXCEPTION_ERROR_CODE',
                    /**
                     * Error Code: 19
                     * Employee PIN is already in use error.
                     */
                    'PIN_ALREADY_IN_USE_FOR_EMPLOYER',

                    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                    // Global API Consumer Error Codes
                    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                    /**
                     * Error Code: 12
                     */
                    'DEFAULT_EZCLOCKER_EXTERNAL_API_CONSUMER_EXCEPTION_ERROR_CODE',

                    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                    // Global Report Error Codes
                    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                    /**
                     * Error Code: 16
                     */
                    'REPORT_TYPE_NOT_YET_SUPPORTED',
                    /**
                     * Error Code: 17
                     */
                    'REPORT_GENERATOR_NOT_AVAIALBLE',
                    /**
                     * Error Code: 18
                     */
                    'EMAIL_REPORT_NOT_SUPPORTED',

                    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                    // Global Employee Error Codes
                    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                    /**
                     * ErrorCode: 21
                     * Employee invite is expired or already used
                     */
                    'EMPLOYEE_INVITE_EXPIRED',
                    /**
                     * Error Code: 404
                     */
                    'EMPLOYEE_NOT_FOUND',

                    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                    // Global Break-In Error Codes
                    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                    /**
                     * Error Code: 40
                     * Active break in error
                     */
                    'ERROR_ACTIVE_BREAKIN',
                    /**
                     * Error Code: 41
                     * Active break out error
                     */
                    'ERROR_NO_ACTIVE_BREAKIN',

                    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                    // Global Authentication Error Codes
                    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                    /**
                     * Error Code: 1401
                     * UNAUTHORIZED error
                     */
                    'ERROR_AUTHENTICATION_DENIED',
                    /**
                     * Error Code: 1403
                     * FORBIDDEN error
                     */
                    'ERROR_ACCESS_DENIED',

                    /*
                     * ======================================================================
                     * Mobile API Error Codes
                     * ======================================================================
                     */

                    /*
                        ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                        ENGINEERING NOTES
                        ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                        Error codes 6000 through 9999 reserved for MOBILE API errors ONLY
                        ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                    */

                    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                    // Generic Mobile API Error Codes
                    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                    /**
                     * Error Code: 6000
                     */
                    'MIN_MOBILE_API_ERROR_CODE',
                    /**
                     * Error Code: 9999
                     */
                    'MAX_MOBILE_API_ERROR_CODE',


                    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                    // Mobile API Invite and Re-invite Error Codes
                    // Active error codes: 6898
                    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

                    /**
                     * Error Code: 6898
                     * Invite restriction error
                     */
                    'ERROR_REINVITE_RESTRICTION',


                    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                    // Mobile API Employee Error Codes
                    // Active Error Codes: 6899, 6900
                    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                    /**
                     * Error Code: 6899
                     * Employee update restriction error
                     */
                    'ERROR_EMPLOYEE_UPDATE_RESTRICTION',
                    /**
                     * Error Code: 6900
                     * Employee deleted restriction error
                     */
                    'ERROR_EMPLOYEE_DELETED_RESTRICTION',

                    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                    // Mobile API Personal Employee Error Codes
                    // Active error codes: 8500
                    // Range: 8000 through 8999
                    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

                    /**
                     * Error Code: 8500
                     * Personal account delete action has errors.
                     */
                    'ERROR_PERSONAL_DELETED_ACCOUNT',

                    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                    // Mobile Clock In Error Codes
                    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

                    /**
                     * Error Code: 6000
                     */
                    'CLOCK_IN_RESTRICTED_BY_EMPLOYER_EXACT',
                    /**
                     * Error Code: 6005
                     */
                    'CLOCK_IN_RESTRICTED_BY_EMPLOYER_5',
                    /**
                     * Error Code: 6010
                     */
                    'CLOCK_IN_RESTRICTED_BY_EMPLOYER_10',
                    /**
                     * Error Code: 6015
                     */
                    'CLOCK_IN_RESTRICTED_BY_EMPLOYER_15',
                    /**
                     * Error Code: 6030
                     */
                    'CLOCK_IN_RESTRICTED_BY_EMPLOYER_30',
                    /**
                     * Error Code: 6999
                     */
                    'CLOCK_IN_RESTRICTED_BY_EMPLOYER',

                    /*
                     * ======================================================================
                     * Internal API Error Codes
                     *
                     * ======================================================================
                     */

                    /*
                        ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                        ENGINEERING NOTES
                        ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                        Internal API error codes range from 10000 to 19999
                        ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                    */

                    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                    // Internal API Clock In Error Codes
                    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                    /**
                     * Error Code: 10001
                     */
                    'CLOCK_IN_OUTOF_SYNC_WITH_SERVER_TIME',

                    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                    // Internal API Clock Out Error Codes
                    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                    /**
                     * Error Code: 10002
                     */
                    'CLOCK_OUT_OUTOF_SYNC_WITH_SERVER_TIME',

                    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                    // Internal API Archive Employee Error Codes
                    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                    /**
                     * ErrorCode: 20
                     * Employee is archived and not available
                     */
                    'EMPLOYEE_IS_ARCHIVED',
                    /**
                     * Error Code: 6901
                     * Employee archived restriction error
                     */
                    'ERROR_EMPLOYEE_ARCHIVED_RESTRICTION',
                    /**
                     * Error Code: 770000
                     */
                    'ARCHIVE_EMPLOYEE_GENERIC_ERROR',
                    /**
                     * Error Code: 770100
                     */
                    'CHECKING_ARCHIVE_RESTRICTIONS_ERROR',
                    /**
                     * ErrorCode: 770409
                     * Employee is archived and not available
                     */
                    'EMPLOYEE_IS_ARCHIVING',
                    /**
                     * Error Code: 771000
                     */
                    'ACTIVE_EMPLOYEE_CLOCKING_OUT_ERROR',
                    /**
                     * Error Code: 772000
                     */
                    'ARCHIVING_ACTIVE_EMPLOYEE_ERROR',
                    /**
                     * Error Code: 772100
                     */
                    'DELETING_ACTIVE_EMPLOYEE_ERROR',
                    /**
                     * Error Code: 773000
                     */
                    'ARCHIVING_TIME_ENTRIES_ERROR',
                    /**
                     * Error Code: 774000
                     */
                    'ARCHIVING_SCHEDULES_ERROR',
                    /**
                     * Error Code: 775000
                     */
                    'ARCHIVING_TIME_OFF_REQUESTS_ERROR',
                    /**
                     * Error Code: 776000
                     */
                    'ARCHIVING_ACTIVE_EMPLOYEE_JOBS_ERROR',
                    /**
                     * Error Code: 777000
                     */
                    'DELETING_ACTIVE_EMPLOYEE_AUTH_TOKENS_ERROR',
                    /**
                     * Error Code: 778000
                     */
                    'ARCHIVING_ACTIVE_EMPLOYEE_USER_ERROR',
                    /**
                     * Error Code: 779000
                     */
                    'UPDATING_ARCHIVE_RESTRICTIONS_ERROR',

                    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                    // Internal API Unarchive Employee Error Codes
                    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                    /**
                     * Error Code: 780000
                     */
                    'UNARCHIVE_EMPLOYEE_GENERIC_ERROR',
                    /**
                     * ErrorCode: 780409
                     * Employee is currently unarchiving.
                     */
                    'EMPLOYEE_IS_UNARCHIVING',

                    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                    // Internal API Generic Error Codes
                    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                    /**
                     * Error Code: 12736
                     * Unknown source error
                     */
                    'ERROR_UNKNOWN'
                ],

                // Enum property values for each enum property name as an array
                // Enter null if the values are equal to the names
                // IMPORTANT: EACH ARRAY, IF NOT NULL, MUST BE OF EQUAL LENGTH
                [
                    /**
                     * UNKNOWN
                     */
                    -1,
                    /*
                     * ======================================================================
                     * Global Error Codes
                     *
                     * Available for internal API and mobile API.
                     * Global error codes range from 0 to 5999
                     * ======================================================================
                     */

                    // ~~~~~~-~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                    // Global Generic Error Codes
                    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                    /**
                     * NONE (equal to EzNovaErrorCode.NONE)
                     * No error
                     * Error Code: 0
                     */
                    0,
                    /**
                     * ERROR (equal to EzNovaErrorCode.ERROR)
                     * General Error
                     * Error code: 1
                     */
                    1,
                    /**
                     * UNAUTHORIZED (equal to EzNovaErrorCode.UNAUTHORIZED)
                     * Unauthorized error
                     * Error Code: 401
                     */
                    401,
                    /**
                     * FORBIDDEN (equal to EzNovaErrorCode.FORBIDDEN)
                     * Forbidden error
                     * Error Code: 403
                     */
                    403,
                    /**
                     * INTERNAL (equal to EzNovaErrorCode.INTERNAL)
                     * Internal server error
                     * Error Code: 500
                     */
                    500,
                    /**
                     * NO_ERROR
                     * Error Code: 0
                     * No error
                     */
                    0,
                    /**
                     * INTERNAL_ERROR
                     * Error Code: 1
                     * Internal server error
                     */
                    1,
                    /**
                     * ERROR_EXCEPTION_SEE_MESSAGE
                     * Error Code: 3
                     * Exception, see message
                     */
                    3,
                    /**
                     * ERROR_MISSING_PARAM
                     * Error Code: 5
                     * Bad or missing parameter
                     */
                    5,
                    /**
                     * ERROR_OPERATION_FAILED
                     * Error Code: 999
                     * Operation Failed
                     */
                    999,
                    /**
                     * HTTP_ERROR_CODE
                     * Error Code: 1000
                     * HttpStatus Related Error Codes
                     */
                    1000,
                    /**
                     * BAD_FIELD_EXCEPTION
                     * Error Code: 1400
                     * Bad field exception
                     */
                    1400,

                    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                    // Global Clock In Error Codes
                    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                    /**
                     * ERROR_ACTIVE_CLOCKIN
                     * Error Code: 1
                     * Active clock in error
                     */
                    1,
                    /**
                     * ERROR_NO_ACTIVE_CLOCKIN
                     * Error Code: 2
                     * No active clock in error
                     */
                    2,

                    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                    // Global Time Entry Error Codes
                    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                    /**
                     * ERROR_MODIFY_TIME_ENTRY_REQUIRES_NOTES
                     * Error Code: 4
                     * Modify time entry requires notes error
                     */
                    4,
                    /**
                     * ERROR_TIMEENTRY_DOES_NOT_EXIST
                     * Error Code: 9
                     */
                    9,

                    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                    // Global Location Error Codes
                    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                    /**
                     * ERROR_LOCATION_NOT_ACCEPTABLE
                     * Error Code: 6
                     */
                    6,

                    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                    // Global User Error Codes
                    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                    /**
                     * ERROR_USER_IS_BANNED
                     * Error Code: 7
                     * User is banned
                     */
                    7,
                    /**
                     * ERROR_USER_EXISTS
                     * User exists
                     * Error Code: 8
                     */
                    8,
                    /**
                     * ERROR_CANNOT_CLEAR_USERNAME
                     * User exists
                     * Error Code: 30
                     */
                    30,
                    /**
                     * ERROR_CANNOT_CLEAR_EMAIL_USERNAME
                     * Clear user name: email
                     * Error Code: 31
                     */
                    31,
                    /**
                     * ERROR_CANNOT_CLEAR_PHONENUMBER_USERNAME
                     * User exists
                     * Error Code: 32
                     */
                    32,
                    /**
                     * ERROR_USER_PHONE_NUMBER_EXISTS
                     * Error Code: 80
                     * User phone number exists
                     */
                    80,
                    /**
                     * ERROR_USER_NAME_EXISTS
                     * Error Code: 81
                     * User name as email exists
                     */
                    81,
                    /**
                     * ERROR_EMAIL_ADDRESS_EXISTS
                     * Error Code: 800
                     * User name as email exists
                     */
                    800,

                    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                    // Global Subscription Error Codes
                    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                    /**
                     * ERROR_FREE_TRIAL_EXPIRED
                     * Error Code: 10
                     */
                    10,
                    /**
                     * FAILED_TO_DOWNGRADE_TO_FREE
                     * Error Code: 13
                     */
                    13,
                    /**
                     * SUBSCRIBE_TO_PLAN_FAILED
                     * Error Code: 14
                     */
                    14,
                    /**
                     * ERROR_CANCEL_SUBSCRIPTION_PLAN
                     * Error Code: 15
                     */
                    15,
                    /**
                     * ERROR_INVALID_LICENSE
                     * Error Code: 402
                     * Invalid License
                     */
                    402,
                    /**
                     * SUBSCRIPTION_NOT_FOUND
                     * Error Code: 404
                     */
                    404,
                    /**
                     * SUBSCRIPTION_VALIDATION_ERROR
                     * Error Code: 424
                     */
                    424,
                    /**
                     * SUBSCRIPTION_PAYMENT_NEEDED
                     * Error Code: 1412
                     * Subscription payment needed
                     */
                    1412,
                    /**
                     * ERROR_DISCOUNT_CODE_NOT_VALID
                     * Error Code: 5514
                     */
                    5514,
                    /**
                     * BRAINTREE_ERROR_RISK_THRESHOLD
                     * Error Code: 5614
                     */
                    5614,
                    /**
                     * BRAINTREE_VALIDATION_ERROR
                     * Generic BrainTree Error (see errorMessages)
                     * ErrorCode: 5900
                     */
                    5900,
                    /**
                     * ERROR_NO_AVAILABLE_LICENSE_SLOTS
                     * No available employee slots for current license
                     * ErrorCode: 5901
                     */
                    5901,

                    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                    // Global Employer Error Codes
                    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                    /**
                     * DEFAULT_EMPLOYER_DENIED_ACTION_EXCEPTION_ERROR_CODE
                     * Error Code: 11
                     */
                    11,
                    /**
                     * PIN_ALREADY_IN_USE_FOR_EMPLOYER
                     * Error Code: 19
                     * Employee PIN is already in use error.
                     */
                    19,

                    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                    // Global API Consumer Error Codes
                    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                    /**
                     * DEFAULT_EZCLOCKER_EXTERNAL_API_CONSUMER_EXCEPTION_ERROR_CODE
                     * Error Code: 12
                     */
                    12,

                    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                    // Global Report Error Codes
                    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                    /**
                     * REPORT_TYPE_NOT_YET_SUPPORTED
                     * Error Code: 16
                     */
                    16,
                    /**
                     * REPORT_GENERATOR_NOT_AVAIALBLE
                     * Error Code: 17
                     */
                    17,
                    /**
                     * EMAIL_REPORT_NOT_SUPPORTED
                     * Error Code: 18
                     */
                    18,

                    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                    // Global Employee Error Codes
                    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                    /**
                     * EMPLOYEE_INVITE_EXPIRED
                     * ErrorCode: 21
                     * Employee invite is expired or already used
                     */
                    21,
                    /**
                     * EMPLOYEE_NOT_FOUND
                     * Error Code: 404
                     */
                    404,

                    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                    // Global Break-In Error Codes
                    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                    /**
                     * ERROR_ACTIVE_BREAKIN
                     * Error Code: 40
                     * Active break in error
                     */
                    40,
                    /**
                     * ERROR_NO_ACTIVE_BREAKIN
                     * Error Code: 41
                     * Active break out error
                     */
                    41,

                    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                    // Global Authentication Error Codes
                    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                    /**
                     * ERROR_AUTHENTICATION_DENIED
                     * Error Code: 1401
                     * UNAUTHORIZED error
                     */
                    1401,
                    /**
                     * ERROR_ACCESS_DENIED
                     * Error Code: 1403
                     * FORBIDDEN error
                     */
                    1403,

                    /*
                     * ======================================================================
                     * Mobile API Error Codes
                     * ======================================================================
                     */

                    /*
                        ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                        ENGINEERING NOTES
                        ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                        Error codes 6000 through 9999 reserved for MOBILE API errors ONLY
                        ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                    */

                    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                    // Generic Mobile API Error Codes
                    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                    /**
                     * MIN_MOBILE_API_ERROR_CODE
                     * Error Code: 6000
                     */
                    6000,
                    /**
                     * MAX_MOBILE_API_ERROR_CODE
                     * Error Code: 9999
                     */
                    9999,

                    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                    // Mobile API Invite and Re-invite Error Codes
                    // Active error codes: 6898
                    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

                    /**
                     * ERROR_REINVITE_RESTRICTION
                     * Error Code: 6898
                     * Invite restriction error
                     */
                    6898,

                    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                    // Mobile API Employee Error Codes
                    // Active Error Codes: 6899, 6900
                    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                    /**
                     * ERROR_EMPLOYEE_UPDATE_RESTRICTION
                     * Error Code: 6899
                     * Employee update restriction error
                     */
                    6899,
                    /**
                     * ERROR_EMPLOYEE_DELETED_RESTRICTION
                     * Error Code: 6900
                     * Employee deleted restriction error
                     */
                    6900,

                    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                    // Mobile API Personal Employee Error Codes
                    // Active error codes: 8500
                    // Range: 8000 through 8999
                    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

                    /**
                     * ERROR_PERSONAL_DELETED_ACCOUNT
                     * Error Code: 8500
                     * Personal account delete action has errors.
                     */
                    8500,

                    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                    // Mobile Clock In Error Codes
                    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

                    /**
                     * CLOCK_IN_RESTRICTED_BY_EMPLOYER_EXACT
                     * Error Code: 6000
                     */
                    6000,
                    /**
                     * CLOCK_IN_RESTRICTED_BY_EMPLOYER_5
                     * Error Code: 6005
                     */
                    6005,
                    /**
                     * CLOCK_IN_RESTRICTED_BY_EMPLOYER_10
                     * Error Code: 6010
                     */
                    6010,
                    /**
                     * CLOCK_IN_RESTRICTED_BY_EMPLOYER_15
                     * Error Code: 6015
                     */
                    6015,
                    /**
                     * CLOCK_IN_RESTRICTED_BY_EMPLOYER_30
                     * Error Code: 6030
                     */
                    6030,
                    /**
                     * CLOCK_IN_RESTRICTED_BY_EMPLOYER
                     * Error Code: 6999
                     */
                    6999,

                    /*
                     * ======================================================================
                     * Internal API Error Codes
                     * ======================================================================
                     */

                    /*
                        ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                        ENGINEERING NOTES
                        ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                        Internal API error codes range from 10000 to 19999
                        ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                    */

                    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                    // Internal API Clock In Error Codes
                    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

                    /**
                     * CLOCK_IN_OUTOF_SYNC_WITH_SERVER_TIME
                     * Error Code: 10001
                     */
                    10001,

                    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                    // Internal API Clock Out Error Codes
                    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

                    /**
                     * CLOCK_OUT_OUTOF_SYNC_WITH_SERVER_TIME
                     * Error Code: 10002
                     */
                    10002,

                    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                    // Internal API Archive Employee Error Codes
                    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

                    /**
                     * EMPLOYEE_IS_ARCHIVED
                     * ErrorCode: 20
                     * Employee is archived and not available
                     */
                    20,
                    /**
                     * ERROR_EMPLOYEE_ARCHIVED_RESTRICTION
                     * Error Code: 6901
                     * Employee archived restriction error
                     */
                    6901,
                    /**
                     * ARCHIVE_EMPLOYEE_GENERIC_ERROR
                     * Error Code: 770000
                     */
                    770000,
                    /**
                     * CHECKING_ARCHIVE_RESTRICTIONS_ERROR
                     * Error Code: 770100
                     */
                    770100,
                    /**
                     * EMPLOYEE_IS_ARCHIVING
                     * ErrorCode: 770409
                     * Employee is archived and not available
                     */
                    770409,
                    /**
                     * ACTIVE_EMPLOYEE_CLOCKING_OUT_ERROR
                     * Error Code: 771000
                     */
                    771000,
                    /**
                     * ARCHIVING_ACTIVE_EMPLOYEE_ERROR
                     * Error Code: 772000
                     */
                    772000,
                    /**
                     * DELETING_ACTIVE_EMPLOYEE_ERROR
                     * Error Code: 772100
                     */
                    772100,
                    /**
                     * ARCHIVING_TIME_ENTRIES_ERROR
                     * Error Code: 773000
                     */
                    773000,
                    /**
                     * ARCHIVING_SCHEDULES_ERROR
                     * Error Code: 774000
                     */
                    774000,
                    /**
                     * ARCHIVING_TIME_OFF_REQUESTS_ERROR
                     * Error Code: 775000
                     */
                    775000,
                    /**
                     * ARCHIVING_ACTIVE_EMPLOYEE_JOBS_ERROR
                     * Error Code: 776000
                     */
                    776000,
                    /**
                     * DELETING_ACTIVE_EMPLOYEE_AUTH_TOKENS_ERROR
                     * Error Code: 777000
                     */
                    777000,
                    /**
                     * ARCHIVING_ACTIVE_EMPLOYEE_USER_ERROR
                     * Error Code: 778000
                     */
                    778000,
                    /**
                     * UPDATING_ARCHIVE_RESTRICTIONS_ERROR
                     * Error Code: 779000
                     */
                    779000,

                    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                    // Internal API Unarchive Employee Error Codes
                    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                    /**
                     * UNARCHIVE_EMPLOYEE_GENERIC_ERROR
                     * Error Code: 780000
                     */
                    780000,
                    /**
                     * EMPLOYEE_IS_UNARCHIVING
                     * ErrorCode: 780409
                     * Employee is currently unarchiving.
                     */
                    780409,

                    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                    // Internal API Generic Error Codes
                    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                    /**
                     * ERROR_UNKNOWN
                     * Error Code: 12736
                     * Unknown source error
                     */
                    12736
                ],

                // Optional array of additional data for eac enumeration property.
                // Enter null if not needed.
                // IMPORTANT: EACH ARRAY, IF NOT NULL, MUST BE OF EQUAL LENGTH
                [
                    /**
                     * UNKNOWN
                     */
                    new EzErrorCodeInfo(
                        // statusCode
                        0,
                        // errorCode
                        -1,
                        // category
                        'UNKNOWN',
                        // displayName
                        'UNKNOWN',
                        // textErrorMessage
                        'UNKNOWN',
                        // htmlErrorMessage
                        '<div>UNKNOWN</div>'),

                    // NONE (equal to EzNovaErrorCode.NONE)
                    new EzErrorCodeInfo(
                        // statusCode
                        EzNovaErrorCode.ezEnumData(EzNovaErrorCode.NONE).statusCode,
                        // errorCode
                        EzNovaErrorCode.NONE,
                        // category
                        'No Error',
                        // displayName
                        'No Error',
                        // textErrorMessage
                        EzNovaErrorCode.ezEnumData(EzNovaErrorCode.NONE).textErrorMessage,
                        // htmlErrorMessage
                        EzNovaErrorCode.ezEnumData(EzNovaErrorCode.NONE).htmlErrorMessage),

                    // ERROR (equal to EzNovaErrorCode.ERROR)
                    new EzErrorCodeInfo(
                        // statusCode
                        EzNovaErrorCode.ezEnumData(EzNovaErrorCode.ERROR).statusCode,
                        // errorCode
                        EzNovaErrorCode.ERROR,
                        // category
                        'Server Error',
                        // displayName
                        'Internal Server Error',
                        // textErrorMessage
                        EzNovaErrorCode.ezEnumData(EzNovaErrorCode.ERROR).textErrorMessage,
                        // htmlErrorMessage
                        EzNovaErrorCode.ezEnumData(EzNovaErrorCode.ERROR).htmlErrorMessage),

                    /**
                     * UNAUTHORIZED (equal to EzNovaErrorCode.UNAUTHORIZED)
                     */
                    new EzErrorCodeInfo(
                        // statusCode
                        EzNovaErrorCode.ezEnumData(EzNovaErrorCode.UNAUTHORIZED).statusCode,
                        // errorCode
                        EzNovaErrorCode.UNAUTHORIZED,
                        // category
                        'Server Error',
                        // displayName
                        'Unauthorized',
                        // textErrorMessage
                        EzNovaErrorCode.ezEnumData(EzNovaErrorCode.UNAUTHORIZED).textErrorMessage,
                        // htmlErrorMessage
                        EzNovaErrorCode.ezEnumData(EzNovaErrorCode.UNAUTHORIZED).htmlErrorMessage),

                    /**
                     * FORBIDDEN (equal to EzNovaErrorCode.FORBIDDEN)
                     */
                    new EzErrorCodeInfo(
                        // statusCode
                        EzNovaErrorCode.ezEnumData(EzNovaErrorCode.FORBIDDEN).statusCode,
                        // errorCode
                        EzNovaErrorCode.FORBIDDEN,
                        // category
                        'Server Error',
                        // displayName
                        'Unauthorized',
                        // textErrorMessage
                        EzNovaErrorCode.ezEnumData(EzNovaErrorCode.FORBIDDEN).textErrorMessage,
                        // htmlErrorMessage
                        EzNovaErrorCode.ezEnumData(EzNovaErrorCode.FORBIDDEN).htmlErrorMessage),

                    /**
                     * INTERNAL (equal to EzNovaErrorCode.INTERNAL)
                     */
                    new EzErrorCodeInfo(
                        // statusCode
                        EzNovaErrorCode.ezEnumData(EzNovaErrorCode.INTERNAL).statusCode,
                        // errorCode
                        EzNovaErrorCode.INTERNAL,
                        // category
                        'Server Error',
                        // displayName
                        'Internal Server Error',
                        // textErrorMessage
                        EzNovaErrorCode.ezEnumData(EzNovaErrorCode.INTERNAL).textErrorMessage,
                        // htmlErrorMessage
                        EzNovaErrorCode.ezEnumData(EzNovaErrorCode.INTERNAL).htmlErrorMessage),

                    // NO_ERROR
                    new EzErrorCodeInfo(
                        EzNovaErrorCode.ezEnumData(EzNovaErrorCode.NONE).statusCode,
                        EzNovaErrorCode.ezEnumData(EzNovaErrorCode.NONE).errorCode,
                        'EzClocker',
                        'No Error',
                        EzNovaErrorCode.ezEnumData(EzNovaErrorCode.NONE).textErrorMessage,
                        EzNovaErrorCode.ezEnumData(EzNovaErrorCode.NONE).htmlErrorMessage),

                    // INTERNAL_ERROR
                    new EzErrorCodeInfo(
                        EzHttpStatus.INTERNAL_SERVER_ERROR,
                        1,
                        'EzClocker',
                        'Internal Error',
                        'Internal server error'),

                    // ERROR_EXCEPTION_SEE_MESSAGE
                    new EzErrorCodeInfo(
                        EzHttpStatus.INTERNAL_SERVER_ERROR,
                        3,
                        'EzClocker',
                        'EzClocker Error',
                        EzHttpStatus.ezEnumData(EzHttpStatus.INTERNAL_SERVER_ERROR).textErrorMessage),

                    // ERROR_MISSING_PARAM
                    new EzErrorCodeInfo(
                        EzHttpStatus.INTERNAL_SERVER_ERROR,
                        5,
                        'EzClocker',
                        'EzClocker Missing Parameter Error',
                        EzHttpStatus.ezEnumData(EzHttpStatus.INTERNAL_SERVER_ERROR).textErrorMessage),

                    // ERROR_OPERATION_FAILED
                    new EzErrorCodeInfo(
                        EzHttpStatus.INTERNAL_SERVER_ERROR,
                        1000,
                        'EzClocker',
                        'EzClocker Operation Failed',
                       EzNovaErrorCode.ezEnumData( EzNovaErrorCode.NONE).textErrorMessage),

                    // HTTP_ERROR_CODE
                    new EzErrorCodeInfo(
                        EzHttpStatus.INTERNAL_SERVER_ERROR,
                        1000,
                        'EzClocker',
                        'EzClocker Error',
                       EzNovaErrorCode.ezEnumData( EzNovaErrorCode.NONE).textErrorMessage),

                    // BAD_FIELD_EXCEPTION
                    new EzErrorCodeInfo(
                        EzHttpStatus.BAD_REQUEST,
                        1400,
                        'EzClocker',
                        'EzClocker Bad Field Error',
                        'Bad request'),

                    // ERROR_ACTIVE_CLOCKIN
                    new EzErrorCodeInfo(
                        EzHttpStatus.INTERNAL_ERROR,
                        1,
                        'EzClocker',
                        'EzClocker Active Clock In Error',
                        EzHttpStatus.ezEnumData(EzHttpStatus.INTERNAL_SERVER_ERROR).textErrorMessage),

                    // ERROR_NO_ACTIVE_CLOCKIN
                    new EzErrorCodeInfo(
                        EzHttpStatus.INTERNAL_SERVER_ERROR,
                        2,
                        'EzClocker',
                        'EzClocker Active Clock In Error',
                        EzHttpStatus.ezEnumData(EzHttpStatus.INTERNAL_SERVER_ERROR).textErrorMessage),

                    // ERROR_MODIFY_TIME_ENTRY_REQUIRES_NOTES
                    new EzErrorCodeInfo(
                        EzHttpStatus.INTERNAL_SERVER_ERROR,
                        4,
                        'EzClocker',
                        'EzClocker Time Entry Error',
                        EzHttpStatus.ezEnumData(EzHttpStatus.INTERNAL_SERVER_ERROR).textErrorMessage),

                    // ERROR_TIMEENTRY_DOES_NOT_EXIST
                    new EzErrorCodeInfo(
                        EzHttpStatus.INTERNAL_SERVER_ERROR,
                        9,
                        'EzClocker',
                        'EzClocker Time Entry Error',
                        EzHttpStatus.ezEnumData(EzHttpStatus.INTERNAL_SERVER_ERROR).textErrorMessage),

                    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                    // Global Location Error Codes
                    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

                    // ERROR_LOCATION_NOT_ACCEPTABLE
                    new EzErrorCodeInfo(
                        EzHttpStatus.INTERNAL_SERVER_ERROR,
                        6,
                        'EzClocker',
                        'EzClocker Location Error',
                        EzHttpStatus.ezEnumData(EzHttpStatus.INTERNAL_SERVER_ERROR).textErrorMessage),


                    // ERROR_USER_IS_BANNED
                    new EzErrorCodeInfo(
                        EzHttpStatus.INTERNAL_SERVER_ERROR,
                        7,
                        'EzClocker',
                        'EzClocker User Error',
                        EzHttpStatus.ezEnumData(EzHttpStatus.INTERNAL_SERVER_ERROR).textErrorMessage),

                    // ERROR_USER_EXISTS
                    new EzErrorCodeInfo(
                        EzHttpStatus.CONFLICT,
                        8,
                        'EzClocker',
                        'EzClocker User Error',
                        'A user already exists with the same email address and/or phone number.',
                        '<div>A user already exists with the same email address and/or phone number.</div>'),

                    // ERROR_CANNOT_CLEAR_USERNAME
                    new EzErrorCodeInfo(
                        EzHttpStatus.CONFLICT,
                        30,
                        'EzClocker',
                        'EzClocker Error',
                        'You cannot clear an account\'s user name {USER_NAME}.'),

                    // ERROR_CANNOT_CLEAR_EMAIL_USERNAME
                    new EzErrorCodeInfo(
                        EzHttpStatus.CONFLICT,
                        31,
                        'EzClocker',
                        'EzClocker Error',
                        'You cannot clear the email address {EMAIL_ADDRESS} because it is used as the user name for the account.'),

                    // ERROR_CANNOT_CLEAR_PHONENUMBER_USERNAME
                    new EzErrorCodeInfo(
                        EzHttpStatus.CONFLICT,
                        32,
                        'EzClocker',
                        'EzClocker Error',
                        'You cannot clear the phone number {PHONE_NUMBER} because it is used as the user name for the account.'),

                    // ERROR_USER_PHONE_NUMBER_EXISTS
                    new EzErrorCodeInfo(
                        EzHttpStatus.CONFLICT,
                        8 * 10,
                        'EzClocker',
                        'EzClocker Error',
                        'The phone number {PHONE_NUMBER} is already in use by another ezClocker account.',
                        '<div>The phone number {PHONE_NUMBER} is already in use by another ezClocker account.</div>'),

                    // ERROR_USER_NAME_EXISTS
                    new EzErrorCodeInfo(
                        EzHttpStatus.CONFLICT,
                        8 * 10 + 1,
                        'EzClocker',
                        'EzClocker User Error',
                        'The user name {USER_NAME} is already in use by another ezClocker account.',
                        '<div>The user name {USER_NAME} is already in use by another ezClocker account.</div>'),

                    // ERROR_EMAIL_ADDRESS_EXISTS
                    new EzErrorCodeInfo(
                        EzHttpStatus.CONFLICT,
                        607 * 100,
                        'EzClocker',
                        'EzClocker Error',
                        'The email {EMAIL_ADDRESS} is already in use by another ezClocker account.',
                        '<div>The email {EMAIL_ADDRESS} is already in use by another ezClocker account.</div>'),

                    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                    // Global Subscription Error Codes
                    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

                    // ERROR_FREE_TRIAL_EXPIRED
                    new EzErrorCodeInfo(
                        EzHttpStatus.INTERNAL_SERVER_ERROR,
                        10,
                        'EzClocker Subscriptions',
                        'EzClocker Subscription Error',
                        'Your free trial is expired.'),

                    // FAILED_TO_DOWNGRADE_TO_FREE
                    new EzErrorCodeInfo(
                        EzHttpStatus.INTERNAL_SERVER_ERROR,
                        13,
                        'EzClocker Subscriptions',
                        'EzClocker Subscription Error',
                        EzHttpStatus.ezEnumData(EzHttpStatus.INTERNAL_SERVER_ERROR).reasonPhrase),

                    // SUBSCRIBE_TO_PLAN_FAILED
                    new EzErrorCodeInfo(
                        EzHttpStatus.INTERNAL_SERVER_ERROR,
                        14,
                        'EzClocker Subscriptions',
                        'EzClocker Subscription Error',
                        EzHttpStatus.ezEnumData(EzHttpStatus.INTERNAL_SERVER_ERROR).reasonPhrase),

                    // ERROR_CANCEL_SUBSCRIPTION_PLAN
                    new EzErrorCodeInfo(
                        EzHttpStatus.INTERNAL_SERVER_ERROR,
                        15,
                        'EzClocker Subscriptions',
                        'EzClocker Subscription Error',
                        EzHttpStatus.ezEnumData(EzHttpStatus.INTERNAL_SERVER_ERROR).reasonPhrase),

                    // ERROR_INVALID_LICENSE
                    new EzErrorCodeInfo(
                        EzNovaErrorCode.ezEnumData(EzNovaErrorCode.NONE).statusCode,
                        403,
                        'EzClocker Subscriptions',
                        'EzClocker Subscription Error',
                        EzNovaErrorCode.ezEnumData(EzNovaErrorCode.NONE).textErrorMessage,
                        EzNovaErrorCode.ezEnumData(EzNovaErrorCode.NONE).htmlErrorMessage),

                    // SUBSCRIPTION_NOT_FOUND
                    new EzErrorCodeInfo(
                        EzHttpStatus.NOT_FOUND,
                        404,
                        'EzClocker Subscriptions',
                        'EzClocker Subscription Error',
                        'Braintree subscription was not found.'),

                    // SUBSCRIPTION_VALIDATION_ERROR
                    new EzErrorCodeInfo(
                        EzHttpStatus.FAILED_DEPENDENCY,
                        424,
                        'EzClocker Subscriptions',
                        'EzClocker Subscription Error',
                        'Braintree subscription was not found.'),

                    // SUBSCRIPTION_PAYMENT_NEEDED
                    new EzErrorCodeInfo(
                        1412,
                        412, // EzHttpStatus.PRECONDITION_FAILED,
                        'EzClocker Subscriptions',
                        'EzClocker Subscription Error',
                        'Precondition failed'),

                    // ERROR_DISCOUNT_CODE_NOT_VALID
                    new EzErrorCodeInfo(
                        EzHttpStatus.INTERNAL_SERVER_ERROR,
                        5514,
                        'EzClocker Subscriptions',
                        'EzClocker Subscription Error',
                        'Discount code is not valid.'),

                    // BRAINTREE_ERROR_RISK_THRESHOLD
                    new EzErrorCodeInfo(
                        EzHttpStatus.INTERNAL_SERVER_ERROR,
                        5614,
                        'EzClocker Subscriptions',
                        'EzClocker Subscription Error',
                        'You have attempted to subscribe too many times and your bank is not blocking transactions on your credit card. Please try again in 24 hours or contact ezClocker support at support@ezclocker.com.'),

                    // BRAINTREE_VALIDATION_ERROR
                    new EzErrorCodeInfo(
                        EzHttpStatus.INTERNAL_SERVER_ERROR,
                        5914,
                        'EzClocker Subscriptions',
                        'EzClocker Subscription Error',
                        'Validation error (see response errorMessages for details).'),

                    // ERROR_NO_AVAILABLE_LICENSE_SLOTS
                    new EzErrorCodeInfo(
                        EzNovaErrorCode.ezEnumData(EzNovaErrorCode.NONE).statusCode,
                        5902,
                        'EzClocker Subscriptions',
                        'EzClocker Subscription Error',
                        EzNovaErrorCode.ezEnumData(EzNovaErrorCode.NONE).textErrorMessage,
                        EzNovaErrorCode.ezEnumData(EzNovaErrorCode.NONE).htmlErrorMessage),

                    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                    // Global Employer Error Codes
                    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

                    // DEFAULT_EMPLOYER_DENIED_ACTION_EXCEPTION_ERROR_CODE
                    new EzErrorCodeInfo(
                        EzHttpStatus.INTERNAL_SERVER_ERROR,
                        11,
                        'EzClocker',
                        'EzClocker Error',
                        EzHttpStatus.ezEnumData(EzHttpStatus.INTERNAL_SERVER_ERROR).textErrorMessage),

                    // PIN_ALREADY_IN_USE_FOR_EMPLOYER
                    new EzErrorCodeInfo(
                        EzHttpStatus.CONFLICT,
                        19,
                        'EzClocker',
                        'EzClocker Error',
                        'The entered Kiosk PIN is already assigned to another employee.'),

                    // DEFAULT_EZCLOCKER_EXTERNAL_API_CONSUMER_EXCEPTION_ERROR_CODE
                    new EzErrorCodeInfo(
                        EzHttpStatus.INTERNAL_SERVER_ERROR,
                        12,
                        'EzClocker',
                        'EzClocker Error',
                        EzHttpStatus.ezEnumData(EzHttpStatus.INTERNAL_SERVER_ERROR).textErrorMessage),

                    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                    // Global Report Error Codes
                    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

                    // REPORT_TYPE_NOT_YET_SUPPORTED
                    new EzErrorCodeInfo(
                        EzHttpStatus.INTERNAL_SERVER_ERROR,
                        16,
                        'EzClocker',
                        'EzClocker Error',
                        EzHttpStatus.ezEnumData(EzHttpStatus.INTERNAL_SERVER_ERROR).textErrorMessage),

                    // REPORT_GENERATOR_NOT_AVAIALBLE
                    new EzErrorCodeInfo(
                        EzHttpStatus.INTERNAL_SERVER_ERROR,
                        17,
                        'EzClocker',
                        'EzClocker Error',
                        EzHttpStatus.ezEnumData(EzHttpStatus.INTERNAL_SERVER_ERROR).textErrorMessage),

                    // EMAIL_REPORT_NOT_SUPPORTED
                    new EzErrorCodeInfo(
                        EzHttpStatus.INTERNAL_SERVER_ERROR,
                        18,
                        'EzClocker',
                        'EzClocker Error',
                        EzHttpStatus.ezEnumData(EzHttpStatus.INTERNAL_SERVER_ERROR).textErrorMessage),

                    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                    // Global Employee Error Codes
                    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

                    // EMPLOYEE_INVITE_EXPIRED
                    new EzErrorCodeInfo(
                        EzHttpStatus.BAD_REQUEST,
                        21,
                        'EzClocker',
                        'EzClocker Error',
                        'The employee invite to ezClocker is expired or already used.'),

                    // EMPLOYEE_NOT_FOUND
                    new EzErrorCodeInfo(
                        EzHttpStatus.NOT_FOUND,
                        404,
                        'EzClocker',
                        'EzClocker Error',
                        'Employee account does not exist.'),

                    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                    // Global Break-In Error Codes
                    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

                    // ERROR_ACTIVE_BREAKIN
                    new EzErrorCodeInfo(
                        EzHttpStatus.INTERNAL_SERVER_ERROR,
                        40,
                        'EzClocker',
                        'EzClocker Error',
                        EzHttpStatus.ezEnumData(EzHttpStatus.INTERNAL_SERVER_ERROR).textErrorMessage),

                    // ERROR_NO_ACTIVE_BREAKIN
                    new EzErrorCodeInfo(
                        EzHttpStatus.INTERNAL_SERVER_ERROR,
                        41,
                        'EzClocker',
                        'EzClocker Error',
                        EzHttpStatus.ezEnumData(EzHttpStatus.INTERNAL_SERVER_ERROR).textErrorMessage),

                    // ERROR_AUTHENTICATION_DENIED
                    new EzErrorCodeInfo(
                        EzHttpStatus.UNAUTHORIZED,
                        1401,
                        'EzClocker',
                        'EzClocker Error',
                        'Unauthorized'),

                    // ERROR_ACCESS_DENIED
                    new EzErrorCodeInfo(
                        EzHttpStatus.FORBIDDEN,
                        1403,
                        'EzClocker',
                        'EzClocker Error',
                        'Forbidden'),

                    /*
                     * ======================================================================
                     * Mobile API Error Codes
                     * ======================================================================
                     */

                    /*
                        ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                        ENGINEERING NOTES
                        ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                        Error codes 6000 through 9999 reserved for MOBILE API errors ONLY
                        ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                    */

                    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                    // Generic Mobile API Error Codes
                    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

                    // MIN_MOBILE_API_ERROR_CODE
                    new EzErrorCodeInfo(
                        EzHttpStatus.INTERNAL_SERVER_ERROR,
                        6000,
                        'EzClocker',
                        'EzClocker Error',
                        'Unhandled internal server error.'),

                    // MAX_MOBILE_API_ERROR_CODE
                    new EzErrorCodeInfo(
                        EzHttpStatus.INTERNAL_SERVER_ERROR,
                        9999,
                        'EzClocker',
                        'EzClocker Error',
                        'Unhandled internal server error'),

                    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                    // Mobile API Invite and Re-invite Error Codes
                    // Active error codes: 6898
                    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

                    // ERROR_REINVITE_RESTRICTION
                    new EzErrorCodeInfo(
                        EzHttpStatus.INTERNAL_SERVER_ERROR,
                        6898,
                        'EzClocker',
                        'EzClocker Error',
                        EzHttpStatus.ezEnumData(EzHttpStatus.INTERNAL_SERVER_ERROR).textErrorMessage),

                    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                    // Mobile API Employee Error Codes
                    // Active Error Codes: 6899, 6900
                    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

                    // ERROR_EMPLOYEE_UPDATE_RESTRICTION
                    new EzErrorCodeInfo(
                        EzHttpStatus.INTERNAL_SERVER_ERROR,
                        6899,
                        'EzClocker',
                        'EzClocker Error',
                        EzHttpStatus.ezEnumData(EzHttpStatus.INTERNAL_SERVER_ERROR).textErrorMessage),

                    // ERROR_EMPLOYEE_DELETED_RESTRICTION
                    new EzErrorCodeInfo(
                        EzHttpStatus.INTERNAL_SERVER_ERROR,
                        6900,
                        'EzClocker',
                        'EzClocker Error',
                        EzHttpStatus.ezEnumData(EzHttpStatus.INTERNAL_SERVER_ERROR).textErrorMessage),

                    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                    // Mobile API Personal Employee Error Codes
                    // Active error codes: 8500
                    // Range: 8000 through 8999
                    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

                    // ERROR_PERSONAL_DELETED_ACCOUNT
                    new EzErrorCodeInfo(
                        EzHttpStatus.INTERNAL_SERVER_ERROR,
                        8001,
                        'EzClocker',
                        'EzClocker Error',
                        EzHttpStatus.ezEnumData(EzHttpStatus.INTERNAL_SERVER_ERROR).textErrorMessage),

                    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                    // Mobile Clock In Error Codes
                    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

                    // CLOCK_IN_RESTRICTED_BY_EMPLOYER_EXACT
                    new EzErrorCodeInfo(
                        EzHttpStatus.FORBIDDEN,
                        6001,
                        'EzClocker',
                        'EzClocker Error',
                        'Your employer has restricted clock in to on or after the scheduled start time.'),

                    // CLOCK_IN_RESTRICTED_BY_EMPLOYER_5
                    new EzErrorCodeInfo(
                        EzHttpStatus.FORBIDDEN,
                        6005,
                        'EzClocker',
                        'EzClocker Error',
                        'Your employer has restricted early clock in to within 5 minutes of the scheduled start time.'),

                    // CLOCK_IN_RESTRICTED_BY_EMPLOYER_10
                    new EzErrorCodeInfo(
                        EzHttpStatus.FORBIDDEN,
                        6010,
                        'EzClocker',
                        'EzClocker Error',
                        'Your employer has restricted early clock in to within 10 minutes of the scheduled start time.'),

                    // CLOCK_IN_RESTRICTED_BY_EMPLOYER_15
                    new EzErrorCodeInfo(
                        EzHttpStatus.FORBIDDEN,
                        6015,
                        'EzClocker',
                        'EzClocker Error',
                        'Your employer has restricted early clock in to within 15 minutes of the schedules start time.'),

                    // CLOCK_IN_RESTRICTED_BY_EMPLOYER_30
                    new EzErrorCodeInfo(
                        EzHttpStatus.FORBIDDEN,
                        6030,
                        'EzClocker',
                        'EzClocker Error',
                        'Your employer has restricted early clock in to within 30 minutes of the schedules start time.'),

                    // CLOCK_IN_RESTRICTED_BY_EMPLOYER
                    new EzErrorCodeInfo(
                        EzHttpStatus.FORBIDDEN,
                        6999,
                        'EzClocker',
                        'EzClocker Error',
                        'Your employer has restricted early clock in to within a specific number of minutes of the schedule start time.'),

                    /*
                     * ======================================================================
                     * Internal API Error Codes
                     * ======================================================================
                     */

                    /*
                        ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                        ENGINEERING NOTES
                        ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                        Internal API error codes range from 10000 to 19999
                        ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                    */

                    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                    // Internal API Clock In Error Codes
                    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

                    // CLOCK_IN_OUTOF_SYNC_WITH_SERVER_TIME
                    new EzErrorCodeInfo(
                        EzHttpStatus.INTERNAL_SERVER_ERROR,
                        10001,
                        'EzClocker',
                        'EzClocker Error',
                        EzHttpStatus.ezEnumData(EzHttpStatus.INTERNAL_SERVER_ERROR).reasonPhrase),

                    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                    // Internal API Clock Out Error Codes
                    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

                    // CLOCK_OUT_OUTOF_SYNC_WITH_SERVER_TIME
                    new EzErrorCodeInfo(
                        EzHttpStatus.INTERNAL_SERVER_ERROR,
                        10002,
                        'EzClocker',
                        'EzClocker Error',
                        EzHttpStatus.ezEnumData(EzHttpStatus.INTERNAL_SERVER_ERROR).reasonPhrase),

                    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                    // Internal API Archive Employee Error Codes
                    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

                    // EMPLOYEE_IS_ARCHIVED
                    new EzErrorCodeInfo(
                        EzHttpStatus.NOT_FOUND,
                        20,
                        'EzClocker',
                        'EzClocker Error',
                        'The employee is archived and not available.'),

                    // ERROR_EMPLOYEE_ARCHIVED_RESTRICTION
                    new EzErrorCodeInfo(
                        EzHttpStatus.INTERNAL_SERVER_ERROR,
                        6901,
                        'EzClocker',
                        'EzClocker Error',
                        EzHttpStatus.ezEnumData(EzHttpStatus.INTERNAL_SERVER_ERROR).reasonPhrase),

                    // ARCHIVE_EMPLOYEE_GENERIC_ERROR
                    new EzErrorCodeInfo(
                        EzHttpStatus.UNPROCESSABLE_ENTITY,
                        770000,
                        'EzClocker',
                        'EzClocker Error',
                        'An unexpected error occurred while attempting to archive an employee.'),

                    // CHECKING_ARCHIVE_RESTRICTIONS_ERROR
                    new EzErrorCodeInfo(
                        EzHttpStatus.UNPROCESSABLE_ENTITY,
                        770100,
                        'EzClocker',
                        'EzClocker Error',
                        'An unexpected error occurred while evaluating archive restrictions for free accounts.'),

                    // EMPLOYEE_IS_ARCHIVING
                    new EzErrorCodeInfo(
                        EzHttpStatus.CONFLICT,
                        EzHttpStatus.CONFLICT + 770000,
                        'EzClocker',
                        'EzClocker Error',
                        'The employee is currently archiving.'),

                    // ACTIVE_EMPLOYEE_CLOCKING_OUT_ERROR
                    new EzErrorCodeInfo(
                        EzHttpStatus.UNPROCESSABLE_ENTITY,
                        771000,
                        'EzClocker',
                        'EzClocker Error',
                        'An unexpected error occurred while making sure the archiving employee is clocked out.'),

                    // ARCHIVING_ACTIVE_EMPLOYEE_ERROR
                    new EzErrorCodeInfo(
                        EzHttpStatus.UNPROCESSABLE_ENTITY,
                        772000,
                        'EzClocker',
                        'EzClocker Error',
                        'An unexpected error occurred while archiving the employee\'s information.'),

                    // DELETING_ACTIVE_EMPLOYEE_ERROR
                    new EzErrorCodeInfo(
                        EzHttpStatus.UNPROCESSABLE_ENTITY,
                        772001,
                        'EzClocker',
                        'EzClocker Error',
                        'An unexpected error occurred while removing the employee from the employer\'s active employee listings.'),

                    // ARCHIVING_TIME_ENTRIES_ERROR
                    new EzErrorCodeInfo(
                        EzHttpStatus.UNPROCESSABLE_ENTITY,
                        773000,
                        'EzClocker',
                        'EzClocker Error',
                        'An unexpected error occurred while archiving the employee\'s time entries.',
                        '<div>An unexpected error occurred while archiving the employee\'s time entries.</div>'),

                    // ARCHIVING_SCHEDULES_ERROR
                    new EzErrorCodeInfo(
                        EzHttpStatus.UNPROCESSABLE_ENTITY,
                        774000,
                        'EzClocker',
                        'EzClocker Error',
                        'An unexpected error occurred while archiving the employee\'s schedules.',
                        '<div>An unexpected error occurred while archiving the employee\'s schedules.</div>'),

                    // ARCHIVING_TIME_OFF_REQUESTS_ERROR
                    new EzErrorCodeInfo(
                        EzHttpStatus.UNPROCESSABLE_ENTITY,
                        775000,
                        'EzClocker',
                        'EzClocker Error',
                        'An unexpected error occurred while archiving the employee\'s time off requests.',
                        '<div>An unexpected error occurred while archiving the employee\'s time off requests.</div>'),

                    // ARCHIVING_ACTIVE_EMPLOYEE_JOBS_ERROR
                    new EzErrorCodeInfo(
                        EzHttpStatus.UNPROCESSABLE_ENTITY,
                        776000,
                        'EzClocker',
                        'EzClocker Error',
                        'An unexpected error occurred while archiving the employee\'s job assignments.',
                        '<div>An unexpected error occurred while archiving the employee\'s job assignments.</div>'),

                    // DELETING_ACTIVE_EMPLOYEE_AUTH_TOKENS_ERROR
                    new EzErrorCodeInfo(
                        EzHttpStatus.UNPROCESSABLE_ENTITY,
                        777000,
                        'EzClocker',
                        'EzClocker Error',
                        'An unexpected error occurred while deleting the employee\'s active authentications.',
                        '<div>An unexpected error occurred while deleting the employee\'s active authentications.</div>'),

                    // ARCHIVING_ACTIVE_EMPLOYEE_USER_ERROR
                    new EzErrorCodeInfo(
                        EzHttpStatus.UNPROCESSABLE_ENTITY,
                        778000,
                        'EzClocker',
                        'EzClocker Error',
                        'An unexpected error occurred while archiving the employee\'s user account.',
                        '<div>An unexpected error occurred while archiving the employee\'s user account.</div>'),

                    // UPDATING_ARCHIVE_RESTRICTIONS_ERROR
                    new EzErrorCodeInfo(
                        EzHttpStatus.CONFLICT,
                        78409,
                        'EzClocker',
                        'EzClocker Error',
                        'EzClocker is currently restoring the employee from the employee archive.',
                        '<div>EzClocker is currently restoring the employee from the employee archive.</div>'),

                    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                    // Internal API Unarchive Employee Error Codes
                    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

                    // UNARCHIVE_EMPLOYEE_GENERIC_ERROR
                    new EzErrorCodeInfo(
                        EzHttpStatus.INTERNAL_SERVER_ERROR,
                        78999,
                        'Employee Unarchive',
                        'Employee Unarchive Error',
                        'An unexpected error occurred while unarchiving a employee.',
                        '<div>An unexpected error occurred while unarchiving a employee.</div>'),

                    // EMPLOYEE_IS_UNARCHIVING
                    new EzErrorCodeInfo(
                        EzHttpStatus.FORBIDDEN,
                        780409,
                        'Employee Unarchive',
                        'Employee is Unarchiving',
                        'The employee is currently unarchiving.',
                        '<div>The employee is currently unarchiving.</div>'),

                    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                    // Internal API Generic Error Codes
                    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

                    // ERROR_UNKNOWN
                    new EzErrorCodeInfo(
                        EzNovaErrorCode.ezEnumData(EzNovaErrorCode.NONE).statusCode,
                        12736,
                        'EzClocker',
                        'EzClocker Error',
                        EzNovaErrorCode.ezEnumData(EzNovaErrorCode.NONE).textErrorMessage,
                        EzNovaErrorCode.ezEnumData(EzNovaErrorCode.NONE).htmlErrorMessage)
                ]);
        }
    }
}
