import { EzEnumeration2 } from '/ezlibrary/enums/EzEnumeration2.js';

import { EzEmployerOptionInfo } from '/ezlibrary/entities/EzEmployerOptionInfo.js';

import { EzClockerAccountType } from '/ezlibrary/EzClockerAccountType.js';

import { EzPayPeriod } from "/ezlibrary/enums/EzPayPeriod";
import { EzString } from "/ezlibrary/helpers/EzString";
/**
 * @class
 * @extends {EzEnumeration2}
 * @description
 * Enumeration of available employer option keys with default values.
 * ---------------------------------------------------------------------------
 * ENGINEERING NOTES:
 * Currently not included in the EzEnumerations.js bundle
 * ---------------------------------------------------------------------------
 * Import with:
 *  import { EzEmployerOption } from '/ezlibrary/EzEmployerOption.js';
 */
export class EzEmployerOption extends EzEnumeration2 {
    /**
     * @private @field
     * Stores the singleton instance of this enumeration class.
     * @type {MyEnumerationClass}
     */
    static #ezEnumerationSingleton = null;

    /**
     * @static
     * Static Initialization
     */
    static {
        if (null == EzEmployerOption.#ezEnumerationSingleton) {
            EzEmployerOption.#ezEnumerationSingleton = new EzEmployerOption(
                // Enum property names
                [
                    'UNKNOWN',
                    /*
                        ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                        Generic Account Option Names
                        Generic option names can be used for all accounts types if readin/writing the option is through the EzClockerContext.
                        ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                    */
                    'EZOPTION_SELECTED_EMPLOYEE_ID',
                    'EZOPTION_SELECTED_PERIOD',
                    'EZOPTION_SELECTED_SCHEDULE_WEEK',
                    'EZOPTION_SELECTED_PERIOD_START_ISO',
                    'EZOPTION_SELECTED_PERIOD_END_ISO',
                    'EZOPTION_ENABLE_PUSH_NOTIFICATIONS',
                    'EZOPTION_USE_24HOUR_TIME_IN_REPORTS',
                    'EZOPTION_TOTALS_AS_DECIMAL_IN_REPORTS',
                    'EZOPTION_PREFERRED_TIMEZONE',
                    'EZOPTION_GROUP_JOBS_REPORT_BY_JOB',
                    'EZOPTION_SELECTED_INTEGRATION',
                    'EZOPTION_JOBS_REPORT_GROUP_BY_DATE',
                    'EZOPTION_JOBS_REPORT_GROUP_BY_EMPLOYEE',

                    /*
                        ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                        Employer Account Option Names
                        ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                    */
                    'EZOPTION_EMPLOYER_SELECTED_PERIOD_STARTDATE',
                    'EZOPTION_EMPLOYER_SELECTED_PERIOD_ENDDATE',
                    'EZOPTION_EMPLOYER_SELECTED_PERIOD',
                    'EZOPTION_EMPLOYER_SELECTED_EMPLOYEE_ID',
                    'EZOPTION_PUSH_NOTIFICATIONS_ENABLED',
                    'EZOPTION_EMPLOYER_LAST_SELECTED_SCHEDULE_WEEK',
                    'EZOPTION_USE_24HOURTIME_IN_EXPORT_REPORTS',
                    'EZOPTION_USE_DECIMAL_TOTALS_IN_EXPORT_REPORTS',
                    'EZOPTION_SHOW_DAY_TOTALS_IN_EXPORT_REPORTS',
                    'EZOPTION_EMPLOYER_DASHBOARD_PREFERRED_TIMEZONE',
                    'EZOPTION_EMPLOYER_SELECTED_INTEGRATION',
                    'EZOPTION_EMPLOYER_JOBS_REPORT_GROUP_BY_JOB',
                    'EZOPTION_EMPLOYER_JOBS_REPORT_GROUP_BY_DATE',
                    'EZOPTION_EMPLOYER_JOBS_REPORT_GROUP_BY_EMPLOYEE',
                    'EZOPTION_PAYROLL_MANAGER_SELECTED_INTEGRATION',
                    'EZOPTION_PAYROLL_MANAGER_EMPLOYER_SELECTED_PERIOD_STARTDATE',
                    'EZOPTION_PAYROLL_MANAGER_EMPLOYER_SELECTED_PERIOD_ENDDATE',
                    'EZOPTION_PAYROLL_MANAGER_EMPLOYER_SELECTED_EMPLOYEE_ID',
                    'EZOPTION_PAYROLL_MANAGER_EMPLOYER_SELECTED_PERIOD',
                    'EZOPTION_PAYROLL_MANAGER_EMPLOYER_LAST_SELECTED_SCHEDULE_WEEK',
                    'EZOPTION_PAYROLL_MANAGER_PUSH_NOTIFICATIONS_ENABLED',
                    'EZOPTION_PAYROLL_MANAGER_SHOW_DAY_TOTALS_IN_EXPORT_REPORTS',
                    'EZOPTION_PAYROLL_MANAGER_USE_24HOURTIME_IN_EXPORT_REPORTS',
                    'EZOPTION_PAYROLL_MANAGER_USE_DECIMAL_TOTALS_IN_EXPORT_REPORTS',
                    'EZOPTION_PAYROLL_MANAGER_EMPLOYER_DASHBOARD_PREFERRED_TIMEZONE',
                    'EZOPTION_PAYROLL_MANAGER_EMPLOYER_JOBS_REPORT_GROUP_BY_JOB',
                    'EZOPTION_PAYROLL_MANAGER_EMPLOYER_SELECTED_INTEGRATION',
                    'EZOPTION_PAYROLL_MANAGER_JOBS_REPORT_GROUP_BY_DATE',
                    'EZOPTION_PAYROLL_MANAGER_JOBS_REPORT_GROUP_BY_EMPLOYEE',
                    'EZOPTION_TIME_OFF_RESTRICT_REQUEST_START_DATE',
                    'EZOPTION_TIME_OFF_MINIMUM_DAYS_IN_FUTURE',
                    'EZOPTION_SELECTED_PAY_PERIOD',
                    'EZOPTION_PAY_PERIOD_LAST_CLOSING_DATE',

                    /*
                        ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                        Manager Accounts
                        ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                    */
                    'EZOPTION_MANAGER_SELECTED_INTEGRATION',
                    'EZOPTION_MANAGER_EMPLOYER_SELECTED_PERIOD_STARTDATE',
                    'EZOPTION_MANAGER_EMPLOYER_SELECTED_PERIOD_ENDDATE',
                    'EZOPTION_MANAGER_EMPLOYER_SELECTED_EMPLOYEE_ID',
                    'EZOPTION_MANAGER_EMPLOYER_SELECTED_PERIOD',
                    'EZOPTION_MANAGER_EMPLOYER_LAST_SELECTED_SCHEDULE_WEEK',
                    'EZOPTION_MANAGER_PUSH_NOTIFICATIONS_ENABLED',
                    'EZOPTION_MANAGER_SHOW_DAY_TOTALS_IN_EXPORT_REPORTS',
                    'EZOPTION_MANAGER_USE_24HOURTIME_IN_EXPORT_REPORTS',
                    'EZOPTION_MANAGER_USE_DECIMAL_TOTALS_IN_EXPORT_REPORTS',
                    'EZOPTION_MANAGER_EMPLOYER_DASHBOARD_PREFERRED_TIMEZONE',
                    'EZOPTION_MANAGER_EMPLOYER_JOBS_REPORT_GROUP_BY_JOB',
                    'EZOPTION_MANAGER_JOBS_REPORT_GROUP_BY_DATE',
                    'EZOPTION_MANAGER_JOBS_REPORT_GROUP_BY_EMPLOYEE',

                    /*
                        ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                        Employee and Personal Account Options
                        ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                    */
                    'EZOPTION_EMPLOYEE_SELECTED_PERIOD',
                    'EZOPTION_EMPLOYEE_LAST_SELECTED_SCHEDULE_WEEK',
                    'EZOPTION_EMPLOYEE_USE_24HOURTIME_IN_EXPORT_REPORTS',
                    'EZOPTION_EMPLOYEE_USE_DECIMAL_TOTALS_IN_EXPORT_REPORTS',
                    'EZOPTION_EMPLOYEE_SHOW_DAY_TOTALS_IN_EXPORT_REPORTS',

                    /*
                        ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                        Kiosk Constants
                        ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                    */
                    'EZOPTION_KIOSK_AUTO_LOGOUT_SECONDS',

                    /*
                        ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                        Global
                        ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                    */
                    'EZOPTION_EMPLOYER_SCHEDULE_START_DAY',
                    'EZOPTION_REQUIRE_LOCATION_FOR_CLOCKINOUT',
                    'EZOPTION_EMPLOYER_DISABLE_TIME_ENTRY_EDITING',
                    'EZOPTION_CALCULATE_OVERTIME_IN_TIME_SHEET_EXPORTS',
                    'EZOPTION_CALCULATE_WEEKLY_OVERTIME_AFTER_HOURS',
                    'EZOPTION_CALCULATE_DAILY_OVERTIME',
                    'EZOPTION_CALCULATE_DAILY_OVERTIME_AFTER_HOURS',
                    'EZOPTION_CALCULATE_DAILY_DOUBLE_TIME',
                    'EZOPTION_CALCULATE_DAILY_DOUBLE_TIME_AFTER_HOURS',
                    'EZOPTION_RESTRICT_CLOCK_IN_TO_SCHEDULE',
                    'EZOPTION_ROUND_CLOCK_IN_CLOCK_OUT',
                    'EZOPTION_ALLOW_EARLY_CLOCK_AT_MINS_BEFORE_SCHEDULE',
                    'EZOPTION_ROUND_CLOCK_IN_CLOCK_OUT_OPTIONS',
                    'EZOPTION_ALLOW_RECORDING_OF_UNPAID_BREAKS',
                    'EZOPTION_ALLOW_AUTOMATIC_BREAKS',
                    'AUTO_BREAK_WORK_HOURS_OPTION',
                    'AUTO_BREAK_WORK_MINUTES_OPTION',
                    'EZOPTION_NOTIFY_EMPLOYEE_MISSED_CLOCK_IN_CLOCK_OUT',
                    'EZOPTION_NOTIFY_EMPLOYER_EMPLOYEE_MISSED_CLOCK_IN_CLOCK_OUT',
                    'EZOPTION_NOTIFY_EMPLOYEE_BEFORE_SHIFT_STARTS',
                    'EZOPTION_ALLOW_EMPLOYEES_TO_SEE_COWORKER_SCHEDULES',
                    'EZOPTION_ALLOW_TIME_OFF_REQUESTS',
                    'EZOPTION_WORK_DAY_START_TIME',
                    'EZOPTION_WORK_WEEK_START_TIME',
                    'EZOPTION_TOTAL_HOURS_IN_WORK_WEEK',
                    'EZOPTION_TOTAL_HOURS_IN_WORK_DAY',
                    'EZOPTION_MIDNIGHT',

                    /*
                        ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                        Deprecated constants
                        ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                    */
                    'EMPLOYER_SELECTED_EMPLOYEE_ID_KEY',
                    'EMPLOYER_SELECTED_ENDDATE_KEY',
                    'EMPLOYER_SELECTED_PERIOD_KEY',
                    'EMPLOYER_LAST_SELECTED_SCHEDULE_WEEK',
                    'EMPLOYEE_USE_24HOURTIME_IN_EXPORT_REPORTS',
                    'EMPLOYER_USE_DECIMAL_TOTALS_IN_EXPORT_REPORTS',
                    'EMPLOYER_USE_24HOURTIME_IN_EXPORT_REPORTS',
                    'NOTIFY_TIME_OFF_REQUESTS_UPDATED'
                ],
                // Enum property values for each enum property name as an array
                // Enter null if the values are equal to the names
                [
                    'UNKNOWN',
                    /*
                        ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                        Generic Account Option Names
                        Generic option names can be used for all accounts types if readin/writing the option is through the EzClockerContext.
                        ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                    */
                    // EZOPTION_SELECTED_EMPLOYEE_ID
                    'EZOPTION_GENERIC_ACCOUNT_SELECTED_EMPLOYEE_ID',

                    // EZOPTION_SELECTED_PERIOD
                    'EZOPTION_GENERIC_ACCOUNT_SELECTED_PERIOD',

                    // EZOPTION_SELECTED_SCHEDULE_WEEK
                    'EZOPTION_GENERIC_ACCOUNT_SCHEDULE_WEEK',

                    // EZOPTION_SELECTED_PERIOD_START_ISO
                    'EZOPTION_GENERIC_SELECTED_PERIOD_START_ISO',

                    // EZOPTION_SELECTED_PERIOD_END_ISO
                    'EZOPTION_GENERIC_SELECTED_PERIOD_END_ISO',

                    // EZOPTION_ENABLE_PUSH_NOTIFICATIONS
                    'EZOPTION_GENERIC_ENABLE_PUSH_NOTIFICATIONS',

                    // EZOPTION_USE_24HOUR_TIME_IN_REPORTS
                    'EZOPTION_GENERIC_USE_24HOUR_TIME_IN_REPORTS',

                    // EZOPTION_TOTALS_AS_DECIMAL_IN_REPORTS
                    'EZOPTION_GENERIC_TOTALS_AS_DECIMAL_IN_REPORTS',

                    // EZOPTION_PREFERRED_TIMEZONE
                    'EZOPTION_GENERIC_PREFERRED_TIMEZONE',

                    // EZOPTION_GROUP_JOBS_REPORT_BY_JOB
                    'EZOPTION_GENERIC_GROUP_JOBS_REPORT_BY_JOB',

                    // EZOPTION_SELECTED_INTEGRATION
                    'EZOPTION_GENERIC_SELECTED_INTEGRATION',

                    // EZOPTION_JOBS_REPORT_GROUP_BY_DATE
                    'JOBS_REPORT_GROUP_BY_DATE',

                    // EZOPTION_JOBS_REPORT_GROUP_BY_EMPLOYEE
                    'JOBS_REPORT_GROUP_BY_EMPLOYEE',

                    /*
                        ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                        Employer Account Option Names
                        ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                    */
                    // EZOPTION_EMPLOYER_SELECTED_PERIOD_STARTDATE
                    'PeriodStartDate',

                    // EZOPTION_EMPLOYER_SELECTED_PERIOD_ENDDATE
                    'PeriodEndDate',

                    // EZOPTION_EMPLOYER_SELECTED_PERIOD
                    'EMPLOYER_SELECTED_PERIOD',

                    // EZOPTION_EMPLOYER_SELECTED_EMPLOYEE_ID
                    'EMPLOYER_SELECTED_EMPLOYEE_ID',

                    // EZOPTION_PUSH_NOTIFICATIONS_ENABLED
                    'PUSH_NOTIFICATIONS_ENABLED',

                    // EZOPTION_EMPLOYER_LAST_SELECTED_SCHEDULE_WEEK
                    'EMPLOYER_LAST_SELECTED_SCHEDULE_WEEK',

                    // EZOPTION_USE_24HOURTIME_IN_EXPORT_REPORTS
                    'USE_24HOURTIME_IN_EXPORT_REPORTS',

                    // EZOPTION_USE_DECIMAL_TOTALS_IN_EXPORT_REPORTS
                    'USE_DECIMAL_TOTALS_IN_EXPORT_REPORTS',

                    // EZOPTION_SHOW_DAY_TOTALS_IN_EXPORT_REPORTS
                    'SHOW_DAY_TOTALS_IN_EXPORT_REPORTS',

                    // EZOPTION_EMPLOYER_DASHBOARD_PREFERRED_TIMEZONE
                    'EMPLOYER_DASHBOARD_PREFERRED_TIMEZONE',

                    // EZOPTION_EMPLOYER_SELECTED_INTEGRATION
                    'EMPLOYER_SELECTED_INTEGRATION',

                    // EZOPTION_EMPLOYER_JOBS_REPORT_GROUP_BY_JOB
                    'EMPLOYER_JOBS_REPORT_GROUP_BY_JOB',

                    // EZOPTION_EMPLOYER_JOBS_REPORT_GROUP_BY_DATE
                    'JOBS_REPORT_GROUP_BY_DATE',

                    // EZOPTION_EMPLOYER_JOBS_REPORT_GROUP_BY_EMPLOYEE
                    'JOBS_REPORT_GROUP_BY_EMPLOYEE',

                    /*
                        ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                        Payroll Manager Accounts
                        ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                    */
                    // EZOPTION_PAYROLL_MANAGER_SELECTED_INTEGRATION
                    'PAYROLL_MANAGER_SELECTED_INTEGRATION',

                    // EZOPTION_PAYROLL_MANAGER_EMPLOYER_SELECTED_PERIOD_STARTDATE
                    'PAYROLL_MANAGER_PeriodStartDate',

                    // EZOPTION_PAYROLL_MANAGER_EMPLOYER_SELECTED_PERIOD_ENDDATE
                    'PAYROLL_MANAGER_PeriodEndDate',

                    // EZOPTION_PAYROLL_MANAGER_EMPLOYER_SELECTED_EMPLOYEE_ID
                    'PAYROLL_MANAGER_EMPLOYER_SELECTED_EMPLOYEE_ID',

                    // EZOPTION_PAYROLL_MANAGER_EMPLOYER_SELECTED_PERIOD
                    'PAYROLL_MANAGER_EMPLOYER_SELECTED_PERIOD',

                    // EZOPTION_PAYROLL_MANAGER_EMPLOYER_LAST_SELECTED_SCHEDULE_WEEK
                    'PAYROLL_MANAGER_EMPLOYER_LAST_SELECTED_SCHEDULE_WEEK',

                    // EZOPTION_PAYROLL_MANAGER_PUSH_NOTIFICATIONS_ENABLED
                    'PAYROLL_MANAGER_PUSH_NOTIFICATIONS_ENABLED',

                    // EZOPTION_PAYROLL_MANAGER_SHOW_DAY_TOTALS_IN_EXPORT_REPORTS
                    'PAYROLL_MANAGER_SHOW_DAY_TOTALS_IN_EXPORT_REPORTS',

                    // EZOPTION_PAYROLL_MANAGER_USE_24HOURTIME_IN_EXPORT_REPORTS
                    'PAYROLL_MANAGER_USE_24HOURTIME_IN_EXPORT_REPORTS',

                    // EZOPTION_PAYROLL_MANAGER_USE_DECIMAL_TOTALS_IN_EXPORT_REPORTS
                    'PAYROLL_MANAGER_USE_DECIMAL_TOTALS_IN_EXPORT_REPORTS',

                    // EZOPTION_PAYROLL_MANAGER_EMPLOYER_DASHBOARD_PREFERRED_TIMEZONE
                    'PAYROLL_MANAGER_EMPLOYER_DASHBOARD_PREFERRED_TIMEZONE',

                    // EZOPTION_PAYROLL_MANAGER_EMPLOYER_JOBS_REPORT_GROUP_BY_JOB
                    'PAYROLL_MANAGER_EMPLOYER_JOBS_REPORT_GROUP_BY_JOB',

                    // EZOPTION_PAYROLL_MANAGER_EMPLOYER_SELECTED_INTEGRATION
                    'PAYROLL_EMPLOYER_SELECTED_INTEGRATION',

                    // EZOPTION_PAYROLL_MANAGER_JOBS_REPORT_GROUP_BY_DATE
                    'PAYROLL_JOBS_REPORT_GROUP_BY_DATE',

                    // EZOPTION_PAYROLL_MANAGER_JOBS_REPORT_GROUP_BY_EMPLOYEE
                    'PAYROLL_JOBS_REPORT_GROUP_BY_EMPLOYEE',

                    // EZOPTION_TIME_OFF_RESTRICT_REQUEST_START_DATE
                    'TIME_OFF_RESTRICT_REQUEST_START_DATE',

                    // EZOPTION_TIME_OFF_MINIMUM_DAYS_IN_FUTURE
                    'TIME_OFF_MINIMUM_DAYS_IN_FUTURE',

                    // EZOPTION_SELECTED_PAY_PERIOD
                    'SELECTED_PAY_PERIOD',

                    // EZOPTION_PAY_PERIOD_LAST_CLOSING_DATE
                    'PAY_PERIOD_LAST_CLOSING_DATE',


                    /*
                        ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                        Manager Accounts
                        ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                    */
                    // EZOPTION_MANAGER_SELECTED_INTEGRATION
                    'MANAGER_SELECTED_INTEGRATION',

                    // EZOPTION_MANAGER_EMPLOYER_SELECTED_PERIOD_STARTDATE
                    'Manager_PeriodStartDate',

                    // EZOPTION_MANAGER_EMPLOYER_SELECTED_PERIOD_ENDDATE
                    'Manager_PeriodEndDate',

                    // EZOPTION_MANAGER_EMPLOYER_SELECTED_EMPLOYEE_ID
                    'MANAGER_EMPLOYER_SELECTED_EMPLOYEE_ID',

                    // EZOPTION_MANAGER_EMPLOYER_SELECTED_PERIOD
                    'MANAGER_EMPLOYER_SELECTED_PERIOD',

                    // EZOPTION_MANAGER_EMPLOYER_LAST_SELECTED_SCHEDULE_WEEK
                    'MANAGER_EMPLOYER_LAST_SELECTED_SCHEDULE_WEEK',

                    // EZOPTION_MANAGER_PUSH_NOTIFICATIONS_ENABLED
                    'MANAGER_PUSH_NOTIFICATIONS_ENABLED',

                    // EZOPTION_MANAGER_SHOW_DAY_TOTALS_IN_EXPORT_REPORTS
                    'MANAGER_SHOW_DAY_TOTALS_IN_EXPORT_REPORTS',

                    // EZOPTION_MANAGER_USE_24HOURTIME_IN_EXPORT_REPORTS
                    'MANAGER_USE_24HOURTIME_IN_EXPORT_REPORTS',

                    // EZOPTION_MANAGER_USE_DECIMAL_TOTALS_IN_EXPORT_REPORTS
                    'MANAGER_USE_DECIMAL_TOTALS_IN_EXPORT_REPORTS',

                    // EZOPTION_MANAGER_EMPLOYER_DASHBOARD_PREFERRED_TIMEZONE
                    'MANAGER_EMPLOYER_DASHBOARD_PREFERRED_TIMEZONE',

                    // EZOPTION_MANAGER_EMPLOYER_JOBS_REPORT_GROUP_BY_JOB
                    'MANAGER_EMPLOYER_JOBS_REPORT_GROUP_BY_JOB',

                    // EZOPTION_MANAGER_JOBS_REPORT_GROUP_BY_DATE
                    'MANAGER_JOBS_REPORT_GROUP_BY_DATE',

                    // EZOPTION_MANAGER_JOBS_REPORT_GROUP_BY_EMPLOYEE
                    'MANAGER_JOBS_REPORT_GROUP_BY_EMPLOYEE',

                    /*
                        ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                        Employee and Personal Account Options
                        ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                    */
                    // EZOPTION_EMPLOYEE_SELECTED_PERIOD
                    'EMPLOYEE_SELECTED_PERIOD',

                    // EZOPTION_EMPLOYEE_LAST_SELECTED_SCHEDULE_WEEK
                    'EMPLOYEE_LAST_SELECTED_SCHEDULE_WEEK',

                    // EZOPTION_EMPLOYEE_USE_24HOURTIME_IN_EXPORT_REPORTS
                    'EMPLOYEE_USE_24HOURTIME_IN_EXPORT_REPORTS',

                    // EZOPTION_EMPLOYEE_USE_DECIMAL_TOTALS_IN_EXPORT_REPORTS
                    'EMPLOYEE_USE_DECIMAL_TOTALS_IN_EXPORT_REPORTS',

                    // EZOPTION_EMPLOYEE_SHOW_DAY_TOTALS_IN_EXPORT_REPORTS
                    'EMPLOYEE_SHOW_DAY_TOTALS_IN_EXPORT_REPORT',

                    /*
                        ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                        Kiosk Constants
                        ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                    */
                    // EZOPTION_KIOSK_AUTO_LOGOUT_SECONDS
                    'KIOSK_AUTO_LOGOUT_SECONDS',

                    /*
                        ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                        Global
                        ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                    */
                    // EZOPTION_EMPLOYER_SCHEDULE_START_DAY
                    'startDay',

                    // EZOPTION_REQUIRE_LOCATION_FOR_CLOCKINOUT
                    'REQUIRE_LOCATION_FOR_CLOCKINOUT',

                    // EZOPTION_EMPLOYER_DISABLE_TIME_ENTRY_EDITING
                    'EMPLOYER_DISABLE_TIME_ENTRY_EDITING',

                    // EZOPTION_CALCULATE_OVERTIME_IN_TIME_SHEET_EXPORTS
                    'CALCULATE_OVERTIME_IN_TIME_SHEET_EXPORTS',

                    // EZOPTION_CALCULATE_WEEKLY_OVERTIME_AFTER_HOURS
                    'CALCULATE_WEEKLY_OVERTIME_AFTER_HOURS',

                    // EZOPTION_CALCULATE_DAILY_OVERTIME
                    'CALCULATE_DAILY_OVERTIME',

                    // EZOPTION_CALCULATE_DAILY_OVERTIME_AFTER_HOURS
                    'CALCULATE_DAILY_OVERTIME_AFTER_HOURS',

                    // EZOPTION_CALCULATE_DAILY_DOUBLE_TIME
                    'CALCULATE_DAILY_DOUBLE_TIME',

                    // EZOPTION_CALCULATE_DAILY_DOUBLE_TIME_AFTER_HOURS
                    'CALCULATE_DAILY_DOUBLE_TIME_AFTER_HOURS',

                    // EZOPTION_RESTRICT_CLOCK_IN_TO_SCHEDULE
                    'RESTRICT_CLOCK_IN_TO_SCHEDULE',

                    // EZOPTION_ROUND_CLOCK_IN_CLOCK_OUT
                    'ROUND_CLOCK_IN_CLOCK_OUT',

                    // EZOPTION_ALLOW_EARLY_CLOCK_AT_MINS_BEFORE_SCHEDULE
                    'ALLOW_EARLY_CLOCK_AT_MINS_BEFORE_SCHEDULE',

                    // EZOPTION_ROUND_CLOCK_IN_CLOCK_OUT_OPTIONS
                    'ROUND_CLOCK_IN_CLOCK_OUT_OPTION',

                    // EZOPTION_ALLOW_RECORDING_OF_UNPAID_BREAKS
                    'ALLOW_RECORDING_OF_UNPAID_BREAKS',

                    // EZOPTION_ALLOW_AUTOMATIC_BREAKS
                    'ALLOW_AUTOMATIC_BREAKS',

                    // AUTO_BREAK_WORK_HOURS_OPTION
                    'AUTO_BREAK_WORK_HOURS_OPTION',

                    // AUTO_BREAK_WORK_MINUTES_OPTION
                    'AUTO_BREAK_WORK_MINUTES_OPTION',

                    // EZOPTION_NOTIFY_EMPLOYEE_MISSED_CLOCK_IN_CLOCK_OUT
                    'NOTIFY_EMPLOYEE_MISSED_CLOCK_IN_CLOCK_OUT',

                    // EZOPTION_NOTIFY_EMPLOYER_EMPLOYEE_MISSED_CLOCK_IN_CLOCK_OUT
                    'NOTIFY_EMPLOYER_EMPLOYEE_MISSED_CLOCK_IN_CLOCK_OUT',

                    // EZOPTION_NOTIFY_EMPLOYEE_BEFORE_SHIFT_STARTS
                    'NOTIFY_EMPLOYEE_BEFORE_SHIFT_STARTS',

                    // EZOPTION_ALLOW_EMPLOYEES_TO_SEE_COWORKER_SCHEDULES
                    'ALLOW_EMPLOYEES_TO_SEE_COWORKER_SCHEDULES',

                    // EZOPTION_ALLOW_TIME_OFF_REQUESTS
                    'ALLOW_TIME_OFF_REQUESTS',

                    // EZOPTION_WORK_DAY_START_TIME
                    'WORK_DAY_START_TIME',

                    // EZOPTION_WORK_WEEK_START_TIME
                    'WORK_WEEK_START_TIME',

                    // EZOPTION_TOTAL_HOURS_IN_WORK_WEEK
                    'TOTAL_HOURS_IN_WORK_WEEK',

                    // EZOPTION_TOTAL_HOURS_IN_WORK_DAY
                    'TOTAL_HOURS_IN_WORK_DAY',

                    // EZOPTION_MIDNIGHT
                    'MIDNIGHT',

                    /*
                        ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                        Deprecated constants
                        ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                    */
                    // EMPLOYER_SELECTED_EMPLOYEE_ID_KEY
                    'EMPLOYER_SELECTED_EMPLOYEE_ID',

                    // EMPLOYER_SELECTED_ENDDATE_KEY
                    'PeriodEndDate',

                    // EMPLOYER_SELECTED_PERIOD_KEY
                    'EMPLOYER_SELECTED_PERIOD',

                    // EMPLOYER_LAST_SELECTED_SCHEDULE_WEEK
                    'EMPLOYER_LAST_SELECTED_SCHEDULE_WEEK',

                    // EMPLOYEE_USE_24HOURTIME_IN_EXPORT_REPORTS
                    'EMPLOYEE_USE_24HOURTIME_IN_EXPORT_REPORTS',

                    // EMPLOYER_USE_DECIMAL_TOTALS_IN_EXPORT_REPORTS
                    'USE_DECIMAL_TOTALS_IN_EXPORT_REPORTS',

                    // EMPLOYER_USE_24HOURTIME_IN_EXPORT_REPORTS
                    'USE_24HOURTIME_IN_EXPORT_REPORTS',

                    // NOTIFY_TIME_OFF_REQUESTS_UPDATED
                    'NOTIFY_TIME_OFF_REQUESTS_UPDATED'
                ],
                // Optional array of additional data for eac enumeration property.
                // Enter null if not needed.
                [
                    /*
                        ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                        Generic Account Option Names
                        Generic option names can be used for all accounts types if readin/writing the option is through the EzClockerContext.
                        ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                    */
                    // EZOPTION_SELECTED_EMPLOYEE_ID
                    new EzEmployerOptionInfo(
                        'UNKNOWN',
                        'UNKNOWN',
                        'UNKNOWN'),
                    /*
                        ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                        Generic Account Option Names
                        Generic option names can be used for all accounts types if readin/writing the option is through the EzClockerContext.
                        ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                    */
                    // EZOPTION_SELECTED_EMPLOYEE_ID
                    new EzEmployerOptionInfo(
                        'EZOPTION_GENERIC_ACCOUNT_SELECTED_EMPLOYEE_ID',
                        '-1',
                        -1),

                    // EZOPTION_SELECTED_PERIOD
                    new EzEmployerOptionInfo(
                        'EZOPTION_GENERIC_ACCOUNT_SELECTED_PERIOD',
                        '',
                        ''),

                    // EZOPTION_SELECTED_SCHEDULE_WEEK
                    new EzEmployerOptionInfo(
                        'EZOPTION_GENERIC_ACCOUNT_SCHEDULE_WEEK',
                        '',
                        ''),

                    // EZOPTION_SELECTED_PERIOD_START_ISO
                    new EzEmployerOptionInfo(
                        'EZOPTION_GENERIC_SELECTED_PERIOD_START_ISO',
                        '',
                        ''),

                    // EZOPTION_SELECTED_PERIOD_END_ISO
                    new EzEmployerOptionInfo(
                        'EZOPTION_GENERIC_SELECTED_PERIOD_END_ISO',
                        '',
                        ''),

                    // EZOPTION_ENABLE_PUSH_NOTIFICATIONS
                    new EzEmployerOptionInfo(
                        'EZOPTION_GENERIC_ENABLE_PUSH_NOTIFICATIONS',
                        '0',
                        false),

                    // EZOPTION_USE_24HOUR_TIME_IN_REPORTS
                    new EzEmployerOptionInfo(
                        'EZOPTION_GENERIC_USE_24HOUR_TIME_IN_REPORTS',
                        '0',
                        false),

                    // EZOPTION_TOTALS_AS_DECIMAL_IN_REPORTS
                    new EzEmployerOptionInfo(
                        'EZOPTION_GENERIC_TOTALS_AS_DECIMAL_IN_REPORTS',
                        '0',
                        false),

                    // EZOPTION_PREFERRED_TIMEZONE
                    new EzEmployerOptionInfo(
                        'EZOPTION_GENERIC_PREFERRED_TIMEZONE',
                        '',
                        ''),

                    // EZOPTION_GROUP_JOBS_REPORT_BY_JOB
                    new EzEmployerOptionInfo(
                        'EZOPTION_GENERIC_GROUP_JOBS_REPORT_BY_JOB',
                        '0',
                        false),

                    // EZOPTION_SELECTED_INTEGRATION
                    new EzEmployerOptionInfo(
                        'EZOPTION_GENERIC_SELECTED_INTEGRATION',
                        '',
                        ''),

                    // EZOPTION_JOBS_REPORT_GROUP_BY_DATE
                    new EzEmployerOptionInfo(
                        'JOBS_REPORT_GROUP_BY_DATE',
                        '0',
                        false),

                    // EZOPTION_JOBS_REPORT_GROUP_BY_EMPLOYEE
                    new EzEmployerOptionInfo(
                        'JOBS_REPORT_GROUP_BY_EMPLOYEE',
                        '0',
                        false),

                    /*
                        ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                        Employer Account Option Names
                        ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                    */
                    // EZOPTION_EMPLOYER_SELECTED_PERIOD_STARTDATE
                    new EzEmployerOptionInfo(
                        'PeriodStartDate',
                        '',
                        ''),
                        //ezApi.ezclocker.ezDateTime.ezNowAsIso(),
                        //ezApi.ezclocker.ezDateTime.ezNowAsIso()),

                    // EZOPTION_EMPLOYER_SELECTED_PERIOD_ENDDATE
                    new EzEmployerOptionInfo(
                        'PeriodEndDate',
                        '',
                        ''),
                        /*
                        ezApi.ezclocker.ezDateTime.ezToIso(
                            ezApi.ezclocker.ezDateTime.ezAddDays(
                                ezApi.ezclocker.ezDateTime.ezNow(),
                                6))
                            .toIso(),
                        ezApi.ezclocker.ezDateTime.ezToIso(
                            ezApi.ezclocker.ezDateTime.ezAddDays(
                                ezApi.ezclocker.ezDateTime.ezNow(),
                                6))
                            .toIso()),
                        */

                    // EZOPTION_EMPLOYER_SELECTED_PERIOD
                    new EzEmployerOptionInfo(
                        'EMPLOYER_SELECTED_PERIOD',
                        '',
                        ''),

                    // EZOPTION_EMPLOYER_SELECTED_EMPLOYEE_ID
                    new EzEmployerOptionInfo(
                        'EMPLOYER_SELECTED_EMPLOYEE_ID',
                        '-1',
                        -1),

                    // EZOPTION_PUSH_NOTIFICATIONS_ENABLED
                    new EzEmployerOptionInfo(
                        'PUSH_NOTIFICATIONS_ENABLED',
                        '1',
                        true),

                    // EZOPTION_EMPLOYER_LAST_SELECTED_SCHEDULE_WEEK
                    new EzEmployerOptionInfo(
                        'EMPLOYER_LAST_SELECTED_SCHEDULE_WEEK',
                        '',
                        ''),
                        /*
                        ezApi.ezclocker.ezDateTime.ezNowAsIso(),
                        ezApi.ezclocker.ezDateTime.ezNowAsIso()),
                        */

                    // EZOPTION_USE_24HOURTIME_IN_EXPORT_REPORTS
                    new EzEmployerOptionInfo(
                        'USE_24HOURTIME_IN_EXPORT_REPORTS',
                        '0',
                        false),

                    // EZOPTION_USE_DECIMAL_TOTALS_IN_EXPORT_REPORTS
                    new EzEmployerOptionInfo(
                        'USE_DECIMAL_TOTALS_IN_EXPORT_REPORTS',
                        '0',
                        false),

                    // EZOPTION_SHOW_DAY_TOTALS_IN_EXPORT_REPORTS
                    new EzEmployerOptionInfo(
                        'SHOW_DAY_TOTALS_IN_EXPORT_REPORTS',
                        '1',
                        true),

                    // EZOPTION_EMPLOYER_DASHBOARD_PREFERRED_TIMEZONE
                    new EzEmployerOptionInfo(
                        'EMPLOYER_DASHBOARD_PREFERRED_TIMEZONE',
                        'AUTOMATIC',
                        'AUTOMATIC'),

                    // EZOPTION_EMPLOYER_SELECTED_INTEGRATION
                    new EzEmployerOptionInfo(
                        'EMPLOYER_SELECTED_INTEGRATION',
                        '',
                        ''),

                    // EZOPTION_EMPLOYER_JOBS_REPORT_GROUP_BY_JOB
                    new EzEmployerOptionInfo(
                        'EMPLOYER_JOBS_REPORT_GROUP_BY_JOB',
                        '0',
                        false),

                    // EZOPTION_EMPLOYER_JOBS_REPORT_GROUP_BY_DATE
                    new EzEmployerOptionInfo(
                        'JOBS_REPORT_GROUP_BY_DATE',
                        '1',
                        true),

                    // EZOPTION_EMPLOYER_JOBS_REPORT_GROUP_BY_EMPLOYEE
                    new EzEmployerOptionInfo(
                        'JOBS_REPORT_GROUP_BY_EMPLOYEE',
                        '0',
                        false),

                    /*
                        ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                        Payroll Manager Accounts
                        ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                    */
                    // EZOPTION_PAYROLL_MANAGER_SELECTED_INTEGRATION
                    new EzEmployerOptionInfo(
                        'PAYROLL_MANAGER_SELECTED_INTEGRATION',
                        '',
                        ''),

                    // EZOPTION_PAYROLL_MANAGER_EMPLOYER_SELECTED_PERIOD_STARTDATE
                    new EzEmployerOptionInfo(
                        'PAYROLL_MANAGER_PeriodStartDate',
                        '',
                        ''),

                    // EZOPTION_PAYROLL_MANAGER_EMPLOYER_SELECTED_PERIOD_ENDDATE
                    new EzEmployerOptionInfo(
                        'PAYROLL_MANAGER_PeriodEndDate',
                        '',
                        ''),

                    // EZOPTION_PAYROLL_MANAGER_EMPLOYER_SELECTED_EMPLOYEE_ID
                    new EzEmployerOptionInfo(
                        'PAYROLL_MANAGER_EMPLOYER_SELECTED_EMPLOYEE_ID',
                        '-1',
                        -1),

                    // EZOPTION_PAYROLL_MANAGER_EMPLOYER_SELECTED_PERIOD
                    new EzEmployerOptionInfo(
                        'PAYROLL_MANAGER_EMPLOYER_SELECTED_PERIOD',
                        '',
                        ''),

                    // EZOPTION_PAYROLL_MANAGER_EMPLOYER_LAST_SELECTED_SCHEDULE_WEEK
                    new EzEmployerOptionInfo(
                        'PAYROLL_MANAGER_EMPLOYER_LAST_SELECTED_SCHEDULE_WEEK',
                        '',
                        ''),

                    // EZOPTION_PAYROLL_MANAGER_PUSH_NOTIFICATIONS_ENABLED
                    new EzEmployerOptionInfo(
                        'PAYROLL_MANAGER_PUSH_NOTIFICATIONS_ENABLED',
                        '0',
                        false),

                    // EZOPTION_PAYROLL_MANAGER_SHOW_DAY_TOTALS_IN_EXPORT_REPORTS
                    new EzEmployerOptionInfo(
                        'PAYROLL_MANAGER_SHOW_DAY_TOTALS_IN_EXPORT_REPORTS',
                        '1',
                        true),

                    // EZOPTION_PAYROLL_MANAGER_USE_24HOURTIME_IN_EXPORT_REPORTS
                    new EzEmployerOptionInfo(
                        'PAYROLL_MANAGER_USE_24HOURTIME_IN_EXPORT_REPORTS',
                        '0',
                        false),

                    // EZOPTION_PAYROLL_MANAGER_USE_DECIMAL_TOTALS_IN_EXPORT_REPORTS
                    new EzEmployerOptionInfo(
                        'PAYROLL_MANAGER_USE_DECIMAL_TOTALS_IN_EXPORT_REPORTS',
                        '0',
                        false),

                    // EZOPTION_PAYROLL_MANAGER_EMPLOYER_DASHBOARD_PREFERRED_TIMEZONE
                    new EzEmployerOptionInfo(
                        'PAYROLL_MANAGER_EMPLOYER_DASHBOARD_PREFERRED_TIMEZONE',
                        '0',
                        false),

                    // EZOPTION_PAYROLL_MANAGER_EMPLOYER_JOBS_REPORT_GROUP_BY_JOB
                    new EzEmployerOptionInfo(
                        'PAYROLL_MANAGER_EMPLOYER_JOBS_REPORT_GROUP_BY_JOB',
                        '0',
                        false),

                    // EZOPTION_PAYROLL_MANAGER_EMPLOYER_SELECTED_INTEGRATION
                    new EzEmployerOptionInfo(
                        'PAYROLL_EMPLOYER_SELECTED_INTEGRATION',
                        '',
                        ''),

                    // EZOPTION_PAYROLL_MANAGER_JOBS_REPORT_GROUP_BY_DATE
                    new EzEmployerOptionInfo(
                        'PAYROLL_JOBS_REPORT_GROUP_BY_DATE',
                        '0',
                        false),

                    // EZOPTION_PAYROLL_MANAGER_JOBS_REPORT_GROUP_BY_EMPLOYEE
                    new EzEmployerOptionInfo(
                        'PAYROLL_JOBS_REPORT_GROUP_BY_EMPLOYEE',
                        '0',
                        false),

                    // EZOPTION_TIME_OFF_RESTRICT_REQUEST_START_DATE
                    new EzEmployerOptionInfo(
                        'TIME_OFF_RESTRICT_REQUEST_START_DATE',
                        '0',
                        false),

                    // EZOPTION_TIME_OFF_MINIMUM_DAYS_IN_FUTURE
                    new EzEmployerOptionInfo(
                        'TIME_OFF_MINIMUM_DAYS_IN_FUTURE',
                        '0',
                        false),

                    /*
                        ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                        Manager Accounts
                        ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                    */
                    // EZOPTION_MANAGER_SELECTED_INTEGRATION
                    new EzEmployerOptionInfo(
                        'MANAGER_SELECTED_INTEGRATION',
                        '',
                        ''),

                    // EZOPTION_MANAGER_EMPLOYER_SELECTED_PERIOD_STARTDATE
                    new EzEmployerOptionInfo(
                        'Manager_PeriodStartDate',
                        '',
                        ''),

                    // EZOPTION_MANAGER_EMPLOYER_SELECTED_PERIOD_ENDDATE
                    new EzEmployerOptionInfo(
                        'Manager_PeriodEndDate',
                        '',
                        ''),

                    // EZOPTION_MANAGER_EMPLOYER_SELECTED_EMPLOYEE_ID
                    new EzEmployerOptionInfo(
                        'MANAGER_EMPLOYER_SELECTED_EMPLOYEE_ID',
                        '-1',
                        -1),

                    // EZOPTION_MANAGER_EMPLOYER_SELECTED_PERIOD
                    new EzEmployerOptionInfo(
                        'MANAGER_EMPLOYER_SELECTED_PERIOD',
                        '',
                        ''),

                    // EZOPTION_MANAGER_EMPLOYER_LAST_SELECTED_SCHEDULE_WEEK
                    new EzEmployerOptionInfo(
                        'MANAGER_EMPLOYER_LAST_SELECTED_SCHEDULE_WEEK',
                        '',
                        ''),

                    // EZOPTION_MANAGER_PUSH_NOTIFICATIONS_ENABLED
                    new EzEmployerOptionInfo(
                        'MANAGER_PUSH_NOTIFICATIONS_ENABLED',
                        0,
                        false),

                    // EZOPTION_MANAGER_SHOW_DAY_TOTALS_IN_EXPORT_REPORTS
                    new EzEmployerOptionInfo(
                        'MANAGER_SHOW_DAY_TOTALS_IN_EXPORT_REPORTS',
                        '1',
                        true),

                    // EZOPTION_MANAGER_USE_24HOURTIME_IN_EXPORT_REPORTS
                    new EzEmployerOptionInfo(
                        'MANAGER_USE_24HOURTIME_IN_EXPORT_REPORTS',
                        '0',
                        false),

                    // EZOPTION_MANAGER_USE_DECIMAL_TOTALS_IN_EXPORT_REPORTS
                    new EzEmployerOptionInfo(
                        'MANAGER_USE_DECIMAL_TOTALS_IN_EXPORT_REPORTS',
                        '0',
                        false),

                    // EZOPTION_MANAGER_EMPLOYER_DASHBOARD_PREFERRED_TIMEZONE
                    new EzEmployerOptionInfo(
                        'MANAGER_EMPLOYER_DASHBOARD_PREFERRED_TIMEZONE',
                        '',
                        ''),

                    // EZOPTION_MANAGER_EMPLOYER_JOBS_REPORT_GROUP_BY_JOB
                    new EzEmployerOptionInfo(
                        'MANAGER_EMPLOYER_JOBS_REPORT_GROUP_BY_JOB',
                        '0',
                        false),

                    // EZOPTION_MANAGER_JOBS_REPORT_GROUP_BY_DATE
                    new EzEmployerOptionInfo(
                        'MANAGER_JOBS_REPORT_GROUP_BY_DATE',
                        '0',
                        false),

                    // EZOPTION_MANAGER_JOBS_REPORT_GROUP_BY_EMPLOYEE
                    new EzEmployerOptionInfo(
                        'MANAGER_JOBS_REPORT_GROUP_BY_EMPLOYEE',
                        '0',
                        false),

                    /*
                        ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                        Employee and Personal Account Options
                        ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                    */
                    // EZOPTION_EMPLOYEE_SELECTED_PERIOD
                    new EzEmployerOptionInfo(
                        'EMPLOYEE_SELECTED_PERIOD',
                        '',
                        ''),
                        /*
                        EzString.msg`
                            {
                                "startDate": "${ezApi.ezclocker.ezDateTime.ezNowAsIso()}",
                                "endDate": "${ezApi.ezclocker.ezDateTime.ezToIso(
                            ezApi.ezclocker.ezDateTime.ezAddDays(
                                ezApi.ezclocker.ezDateTime.ezNow(),
                                6))}"
                            }`,
                        EzString.msg`
                            {
                                "startDate": "${ezApi.ezclocker.ezDateTime.ezNowAsIso()}",
                                "endDate": "${ezApi.ezclocker.ezDateTime.ezToIso(
                            ezApi.ezclocker.ezDateTime.ezAddDays(
                                ezApi.ezclocker.ezDateTime.ezNow(),
                                6))}"
                            }`),
                        */

                    // EZOPTION_EMPLOYEE_LAST_SELECTED_SCHEDULE_WEEK
                    new EzEmployerOptionInfo(
                        'EMPLOYEE_LAST_SELECTED_SCHEDULE_WEEK',
                        '',
                        ''),
                        /*
                        ezApi.ezclocker.ezDateTime.ezNowAsIso(),
                        ezApi.ezclocker.ezDateTime.ezNowAsIso()),
                        */

                    // EZOPTION_EMPLOYEE_USE_24HOURTIME_IN_EXPORT_REPORTS
                    new EzEmployerOptionInfo(
                        'EMPLOYEE_USE_24HOURTIME_IN_EXPORT_REPORTS',
                        '0',
                        false),

                    // EZOPTION_EMPLOYEE_USE_DECIMAL_TOTALS_IN_EXPORT_REPORTS
                    new EzEmployerOptionInfo(
                        'EMPLOYEE_USE_DECIMAL_TOTALS_IN_EXPORT_REPORTS',
                        '0',
                        false),

                    // EZOPTION_EMPLOYEE_SHOW_DAY_TOTALS_IN_EXPORT_REPORTS
                    new EzEmployerOptionInfo(
                        'EMPLOYEE_SHOW_DAY_TOTALS_IN_EXPORT_REPORT',
                        '0',
                        false),

                    /*
                        ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                        Kiosk Constants
                        ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                    */
                    // EZOPTION_KIOSK_AUTO_LOGOUT_SECONDS
                    new EzEmployerOptionInfo(
                        'KIOSK_AUTO_LOGOUT_SECONDS',
                        '10',
                        10),

                    /*
                        ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                        Global
                        ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                    */
                    // EZOPTION_EMPLOYER_SCHEDULE_START_DAY
                    new EzEmployerOptionInfo(
                        'startDay',
                        '0',
                        0),

                    // EZOPTION_REQUIRE_LOCATION_FOR_CLOCKINOUT
                    new EzEmployerOptionInfo(
                        'REQUIRE_LOCATION_FOR_CLOCKINOUT',
                        '0',
                        false),

                    // EZOPTION_EMPLOYER_DISABLE_TIME_ENTRY_EDITING
                    new EzEmployerOptionInfo(
                        'EMPLOYER_DISABLE_TIME_ENTRY_EDITING',
                        '1',
                        true),

                    // EZOPTION_CALCULATE_OVERTIME_IN_TIME_SHEET_EXPORTS
                    new EzEmployerOptionInfo(
                        'CALCULATE_OVERTIME_IN_TIME_SHEET_EXPORTS',
                        '0',
                        false),

                    // EZOPTION_CALCULATE_WEEKLY_OVERTIME_AFTER_HOURS
                    new EzEmployerOptionInfo(
                        'CALCULATE_WEEKLY_OVERTIME_AFTER_HOURS',
                        '40',
                        40),

                    // EZOPTION_CALCULATE_DAILY_OVERTIME
                    new EzEmployerOptionInfo(
                        'CALCULATE_DAILY_OVERTIME',
                        '0',
                        false),

                    // EZOPTION_CALCULATE_DAILY_OVERTIME_AFTER_HOURS
                    new EzEmployerOptionInfo(
                        'CALCULATE_DAILY_OVERTIME_AFTER_HOURS',
                        '0',
                        false),

                    // EZOPTION_CALCULATE_DAILY_DOUBLE_TIME
                    new EzEmployerOptionInfo(
                        'CALCULATE_DAILY_DOUBLE_TIME',
                        '8',
                        8),

                    // EZOPTION_CALCULATE_DAILY_DOUBLE_TIME_AFTER_HOURS
                    new EzEmployerOptionInfo(
                        'CALCULATE_DAILY_DOUBLE_TIME_AFTER_HOURS',
                        '12',
                        12),

                    // EZOPTION_RESTRICT_CLOCK_IN_TO_SCHEDULE
                    new EzEmployerOptionInfo(
                        'RESTRICT_CLOCK_IN_TO_SCHEDULE',
                        '0',
                        false),

                    // EZOPTION_ROUND_CLOCK_IN_CLOCK_OUT
                    new EzEmployerOptionInfo(
                        'ROUND_CLOCK_IN_CLOCK_OUT',
                        '0',
                        false),

                    // EZOPTION_ALLOW_EARLY_CLOCK_AT_MINS_BEFORE_SCHEDULE
                    new EzEmployerOptionInfo(
                        'ALLOW_EARLY_CLOCK_AT_MINS_BEFORE_SCHEDULE',
                        '0',
                        false),

                    // EZOPTION_ROUND_CLOCK_IN_CLOCK_OUT_OPTIONS
                    new EzEmployerOptionInfo(
                        'ROUND_CLOCK_IN_CLOCK_OUT_OPTION',
                        '0',
                        false),

                    // EZOPTION_ALLOW_RECORDING_OF_UNPAID_BREAKS
                    new EzEmployerOptionInfo(
                        'ALLOW_RECORDING_OF_UNPAID_BREAKS',
                        '1',
                        true),

                    // EZOPTION_ALLOW_AUTOMATIC_BREAKS
                    new EzEmployerOptionInfo(
                        'ALLOW_AUTOMATIC_BREAKS',
                        '0',
                        false),

                    // AUTO_BREAK_WORK_HOURS_OPTION
                    new EzEmployerOptionInfo(
                        'AUTO_BREAK_WORK_HOURS_OPTION',
                        '4',
                        4),

                    // AUTO_BREAK_WORK_MINUTES_OPTION
                    new EzEmployerOptionInfo(
                        'AUTO_BREAK_WORK_MINUTES_OPTION',
                        '30',
                        30),

                    // EZOPTION_NOTIFY_EMPLOYEE_MISSED_CLOCK_IN_CLOCK_OUT
                    new EzEmployerOptionInfo(
                        'NOTIFY_EMPLOYEE_MISSED_CLOCK_IN_CLOCK_OUT',
                        '0',
                        false),

                    // EZOPTION_NOTIFY_EMPLOYER_EMPLOYEE_MISSED_CLOCK_IN_CLOCK_OUT
                    new EzEmployerOptionInfo(
                        'NOTIFY_EMPLOYER_EMPLOYEE_MISSED_CLOCK_IN_CLOCK_OUT',
                        '0',
                        false),

                    // EZOPTION_NOTIFY_EMPLOYEE_BEFORE_SHIFT_STARTS
                    new EzEmployerOptionInfo(
                        'NOTIFY_EMPLOYEE_BEFORE_SHIFT_STARTS',
                        '0',
                        false),

                    // EZOPTION_ALLOW_EMPLOYEES_TO_SEE_COWORKER_SCHEDULES
                    new EzEmployerOptionInfo(
                        'ALLOW_EMPLOYEES_TO_SEE_COWORKER_SCHEDULES',
                        '0',
                        false),

                    // EZOPTION_ALLOW_TIME_OFF_REQUESTS
                    new EzEmployerOptionInfo(
                        'ALLOW_TIME_OFF_REQUESTS',
                        '0',
                        false),

                    // EZOPTION_WORK_DAY_START_TIME
                    new EzEmployerOptionInfo(
                        'WORK_DAY_START_TIME',
                        '00:00:00',
                        '00:00:00'),

                    // EZOPTION_WORK_WEEK_START_TIME
                    new EzEmployerOptionInfo(
                        'WORK_WEEK_START_TIME',
                        '00:00:00',
                        '00:00:00'),

                    // EZOPTION_TOTAL_HOURS_IN_WORK_WEEK
                    new EzEmployerOptionInfo(
                        'TOTAL_HOURS_IN_WORK_WEEK',
                        '40',
                        40),

                    // EZOPTION_TOTAL_HOURS_IN_WORK_DAY
                    new EzEmployerOptionInfo(
                        'TOTAL_HOURS_IN_WORK_DAY',
                        '8',
                        8),

                    // EZOPTION_MIDNIGHT
                    new EzEmployerOptionInfo(
                        'MIDNIGHT',
                        '23:59:59',
                        '23:59:59'),

                    /*
                        ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                        Deprecated constants
                        ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                    */
                    // EMPLOYER_SELECTED_EMPLOYEE_ID_KEY
                    new EzEmployerOptionInfo(
                        'EMPLOYER_SELECTED_EMPLOYEE_ID',
                        '-1',
                        -1),

                    // EMPLOYER_SELECTED_ENDDATE_KEY
                    new EzEmployerOptionInfo(
                        'PeriodEndDate',
                        '0',
                        false),

                    // EMPLOYER_SELECTED_PERIOD_KEY
                    new EzEmployerOptionInfo(
                        'EMPLOYER_SELECTED_PERIOD',
                        '',
                        ''),

                    // EMPLOYER_LAST_SELECTED_SCHEDULE_WEEK
                    new EzEmployerOptionInfo(
                        'EMPLOYER_LAST_SELECTED_SCHEDULE_WEEK',
                        '',
                        ''),
                        /*
                        ezApi.ezclocker.ezDateTime.ezNowAsIso(),
                        ezApi.ezclocker.ezDateTime.ezNowAsIso()),
 */

                    // EMPLOYEE_USE_24HOURTIME_IN_EXPORT_REPORTS
                    new EzEmployerOptionInfo(
                        'EMPLOYEE_USE_24HOURTIME_IN_EXPORT_REPORTS',
                        '0',
                        false),

                    // EMPLOYER_USE_DECIMAL_TOTALS_IN_EXPORT_REPORTS
                    new EzEmployerOptionInfo(
                        'USE_DECIMAL_TOTALS_IN_EXPORT_REPORTS',
                        '0',
                        false),

                    // EMPLOYER_USE_24HOURTIME_IN_EXPORT_REPORTS
                    new EzEmployerOptionInfo(
                        'USE_24HOURTIME_IN_EXPORT_REPORTS',
                        '0',
                        false),

                    // NOTIFY_TIME_OFF_REQUESTS_UPDATED
                    new EzEmployerOptionInfo(
                        'NOTIFY_TIME_OFF_REQUESTS_UPDATED',
                        '1',
                        true),

                    new EzEmployerOptionInfo(
                        'SELECTED_PAY_PERIOD',
                        'NONE',
                        EzPayPeriod.NONE),

                    new EzEmployerOptionInfo(
                        'PAY_PERIOD_LAST_CLOSING_DATE',
                        EzString.EMPTY,
                        EzString.EMPTY
                    ),
                ]);
    }
    }

    /**
     * @public @constructor
     * >> DO NOT CREATE NEW INSTANCES <<
     * The static initializer will create a singleton instance that injects the static properties and methods
     * that you then use to access enumeration values.
     */
    constructor(name, value, optionalData) {
        super(name, value, optionalData);
    }

    /**
     * @static
     * @public @readonly @property
     * Returns the default string value that represents true for a employer option
     * @returns {string}
     */
    static EZOPTION_VALUE_TRUE = '1';

    /**
     * @static
     * @public @readonly @property
     * Returns the default string value that represents false for a employer option
     * @returns {string}
     */
    static EZOPTION_VALUE_FALSE = '0';


    /**
     * @static
     * @public @method
     * Pre-pends 'EZOPTION_' to the enumeration value.
     * @param {String} enumnValue
     * @returns {String}
     */
    static ezToInputId(enumValue) {
        return `EZOPTION_${enumValue.toUpperCase()}`;
    }

    /**
     * @static
     * @public @method
     * Returns the option key name to use for an employer account.
     * @param {String} aOptionKeyName
     * @returns {String}
     */
    static ezToEmployerOption(enumValue) {
        switch (enumValue) {
            // Selected Integration
            case EzEmployerOption.EZOPTION_SELECTED_INTEGRATION:
                return EzEmployerOption.EZOPTION_EMPLOYER_SELECTED_INTEGRATION;
            // Selected employee id
            case EzEmployerOption.EZOPTION_SELECTED_EMPLOYEE_ID:
            case EzEmployerOption.EZOPTION_PAYROL_MANAGER_EMPLOYER_SELECTED_EMPLOYEE_ID:
            case EzEmployerOption.EZOPTION_MANAGER_EMPLOYER_SELECTED_EMPLOYEE_ID:
            case EzEmployerOption.EZOPTION_EMPLOYER_SELECTED_EMPLOYEE_ID:
                return EzEmployerOption.EZOPTION_EMPLOYER_SELECTED_EMPLOYEE_ID;
            // Schedule selected week
            case EzEmployerOption.EZOPTION_SELECTED_SCHEDULE_WEEK:
                return EzEmployerOption.EZOPTION_SELECTED_SCHEDULE_WEEK;
            case EzEmployerOption.EZOPTION_EMPLOYEE_LAST_SELECTED_SCHEDULE_WEEK:
            case EzEmployerOption.EZOPTION_PAYROLL_MANAGER_EMPLOYER_LAST_SELECTED_SCHEDULE_WEEK:
            case EzEmployerOption.EZOPTION_MANAGER_EMPLOYER_LAST_SELECTED_SCHEDULE_WEEK:
                return EzEmployerOption.EZOPTION_EMPLOYER_LAST_SELECTED_SCHEDULE_WEEK;
            // Selected period
            case EzEmployerOption.EZOPTION_SELECTED_PERIOD:
            case EzEmployerOption.EZOPTION_EMPLOYEE_SELECTED_PERIOD:
            case EzEmployerOption.EZOPTION_PAYROLL_MANAGER_EMPLOYER_SELECTED_PERIOD:
            case EzEmployerOption.EZOPTION_MANAGER_EMPLOYER_SELECTED_PERIOD:
                return EzEmployerOption.EZOPTION_EMPLOYER_SELECTED_PERIOD;
            // Selected Period Start
            case EzEmployerOption.EZOPTION_SELECTED_PERIOD_START_ISO:
            case EzEmployerOption.EZOPTION_PAYROLL_MANAGER_EMPLOYER_SELECTED_PERIOD_STARTDATE:
            case EzEmployerOption.EZOPTION_MANAGER_EMPLOYER_SELECTED_PERIOD_STARTDATE:
                return EzEmployerOption.EZOPTION_EMPLOYER_SELECTED_PERIOD_STARTDATE;
            // Selected Period End
            case EzEmployerOption.EZOPTION_SELECTED_PERIOD_END_ISO:
            case EzEmployerOption.EZOPTION_PAYROLL_MANAGER_EMPLOYER_SELECTED_PERIOD_ENDDATE:
            case EzEmployerOption.EZOPTION_MANAGER_EMPLOYER_SELECTED_PERIOD_ENDDATE:
                return EzEmployerOption.EZOPTION_EMPLOYER_SELECTED_PERIOD_ENDDATE;
            // Show Day Totals
            case EzEmployerOption.EZOPTION_EMPLOYEE_SHOW_DAY_TOTALS_IN_EXPORT_REPORTS:
            case EzEmployerOption.EZOPTION_PAYROLL_MANAGER_SHOW_DAY_TOTALS_IN_EXPORT_REPORTS:
            case EzEmployerOption.EZOPTION_MANAGER_SHOW_DAY_TOTALS_IN_EXPORT_REPORTS:
                return EzEmployerOption.EZOPTION_SHOW_DAY_TOTALS_IN_EXPORT_REPORTS
            // Use 24 hour time in export
            case EzEmployerOption.EZOPTION_USE_24HOUR_TIME_IN_REPORTS:
            case EzEmployerOption.EZOPTION_EMPLOYEE_USE_24HOURTIME_IN_EXPORT_REPORTS:
            case EzEmployerOption.EZOPTION_PAYROLL_MANAGER_USE_24HOURTIME_IN_EXPORT_REPORTS:
            case EzEmployerOption.EZOPTION_MANAGER_USE_24HOURTIME_IN_EXPORT_REPORTS:
                return EzEmployerOption.EZOPTION_USE_24HOURTIME_IN_EXPORT_REPORTS;
            // Use decimal totals in export
            case EzEmployerOption.EZOPTION_EMPLOYEE_USE_DECIMAL_TOTALS_IN_EXPORT_REPORTS:
            case EzEmployerOption.EZOPTION_TOTALS_AS_DECIMAL_IN_REPORTS:
            case EzEmployerOption.EZOPTION_PAYROLL_MANAGER_USE_DECIMAL_TOTALS_IN_EXPORT_REPORTS:
            case EzEmployerOption.EZOPTION_MANAGER_USE_DECIMAL_TOTALS_IN_EXPORT_REPORTS:
                return EzEmployerOption.EZOPTION_USE_DECIMAL_TOTALS_IN_EXPORT_REPORTS;
            // Preferred timezone
            case EzEmployerOption.EZOPTION_PREFERRED_TIMEZONE:
            case EzEmployerOption.EZOPTION_PAYROLL_MANAGER_EMPLOYER_DASHBOARD_PREFERRED_TIMEZONE:
            case EzEmployerOption.EZOPTION_MANAGER_EMPLOYER_DASHBOARD_PREFERRED_TIMEZONE:
                return EzEmployerOption.EZOPTION_EMPLOYER_DASHBOARD_PREFERRED_TIMEZONE;
            // Group jobs report by job
            case EzEmployerOption.EZOPTION_GROUP_JOBS_REPORT_BY_JOB:
            case EzEmployerOption.EZOPTION_PAYROLL_MANAGER_EMPLOYER_JOBS_REPORT_GROUP_BY_JOB:
            case EzEmployerOption.EZOPTION_MANAGER_EMPLOYER_JOBS_REPORT_GROUP_BY_JOB:
                return EzEmployerOption.EZOPTION_EMPLOYER_JOBS_REPORT_GROUP_BY_JOB;
            case EzEmployerOption.EZOPTION_JOBS_REPORT_GROUP_BY_DATE:
            case EzEmployerOption.EZOPTION_PAYROLL_JOBS_REPORT_GROUP_BY_DATE:
            case EzEmployerOption.EZOPTION_MANAGER_JOBS_REPORT_GROUP_BY_DATE:
                return EzEmployerOption.EZOPTION_EMPLOYER_JOBS_REPORT_GROUP_BY_DATE;
            case EzEmployerOption.EZOPTION_JOBS_REPORT_GROUP_BY_EMPLOYEE:
            case EzEmployerOption.EZOPTION_PAYROLL_JOBS_REPORT_GROUP_BY_EMPLOYEE:
            case EzEmployerOption.EZOPTION_MANAGER_JOBS_REPORT_GROUP_BY_EMPLOYEE:
                return EzEmployerOption.EZOPTION_EMPLOYER_JOBS_REPORT_GROUP_BY_EMPLOYEE;
            case EzEmployerOption.EZOPTION_SELECTED_PAY_PERIOD:
                return EzEmployerOption.EZOPTION_SELECTED_PAY_PERIOD;
            case EzEmployerOption.EZOPTION_PAY_PERIOD_LAST_CLOSING_DATE:
                return EzEmployerOption.EZOPTION_PAY_PERIOD_LAST_CLOSING_DATE;

            default:
                return enumValue;
        }
    }

    /**
     * @static
     * @public @method
     * Returns the option key name to use for a manager acting as a employer account.
     * @param {String} aOptionKeyName
     * @returns {String}
     */
    static ezToManagerAsEmployerOption(enumValue) {
        switch (enumValue) {
            // Selected employee id
            case EzEmployerOption.EZOPTION_EMPLOYER_SELECTED_EMPLOYEE_ID:
            case EzEmployerOption.EZOPTION_SELECTED_EMPLOYEE_ID:
                return EzEmployerOption.EZOPTION_MANAGER_EMPLOYER_SELECTED_EMPLOYEE_ID;
            // Schedule selected week
            case EzEmployerOption.EZOPTION_SELECTED_SCHEDULE_WEEK:
            case EzEmployerOption.EZOPTION_EMPLOYEE_LAST_SELECTED_SCHEDULE_WEEK:
            case EzEmployerOption.EZOPTION_EMPLOYER_LAST_SELECTED_SCHEDULE_WEEK:
                return EzEmployerOption.EZOPTION_MANAGER_EMPLOYER_LAST_SELECTED_SCHEDULE_WEEK;
            // Selected period
            case EzEmployerOption.EZOPTION_SELECTED_PERIOD:
            case EzEmployerOption.EZOPTION_EMPLOYER_SELECTED_PERIOD:
            case EzEmployerOption.EZOPTION_EMPLOYEE_SELECTED_PERIOD:
                return EzEmployerOption.EZOPTION_MANAGER_EMPLOYER_SELECTED_PERIOD;
            // Selected period start date
            case EzEmployerOption.EZOPTION_SELECTED_PERIOD_START_ISO:
            case EzEmployerOption.EZOPTION_EMPLOYER_SELECTED_PERIOD_STARTDATE:
                return EzEmployerOption.EZOPTION_MANAGER_EMPLOYER_SELECTED_PERIOD_STARTDATE;
            // Selected Period End
            case EzEmployerOption.EZOPTION_SELECTED_PERIOD_END_ISO:
            case EzEmployerOption.EZOPTION_EMPLOYER_SELECTED_PERIOD_ENDDATE:
                return EzEmployerOption.EZOPTION_MANAGER_EMPLOYER_SELECTED_PERIOD_ENDDATE;
            // Push notifications
            case EzEmployerOption.EZOPTION_ENABLE_PUSH_NOTIFICATIONS:
            case EzEmployerOption.EZOPTION_PUSH_NOTIFICATIONS_ENABLED:
                return EzEmployerOption.EZOPTION_MANAGER_PUSH_NOTIFICATIONS_ENABLED;
            case EzEmployerOption.EZOPTION_SHOW_DAY_TOTALS_IN_EXPORT_REPORTS:
                return EzEmployerOption.EZOPTION_MANAGER_SHOW_DAY_TOTALS_IN_EXPORT_REPORTS;
            // Use 24 hour time in exports
            case EzEmployerOption.EZOPTION_USE_24HOUR_TIME_IN_REPORTS:
            case EzEmployerOption.EZOPTION_USE_24HOURTIME_IN_EXPORT_REPORTS:
            case EzEmployerOption.EZOPTION_EMPLOYEE_USE_24HOURTIME_IN_EXPORT_REPORTS:
                return EzEmployerOption.EZOPTION_MANAGER_USE_24HOURTIME_IN_EXPORT_REPORTS;
            // Use decimal in export totals
            case EzEmployerOption.EZOPTION_EMPLOYEE_USE_DECIMAL_TOTALS_IN_EXPORT_REPORTS:
            case EzEmployerOption.EZOPTION_TOTALS_AS_DECIMAL_IN_REPORTS:
            case EzEmployerOption.EZOPTION_USE_DECIMAL_TOTALS_IN_EXPORT_REPORTS:
                return EzEmployerOption.EZOPTION_MANAGER_USE_DECIMAL_TOTALS_IN_EXPORT_REPORTS;
            // Preferred timezone
            case EzEmployerOption.EZOPTION_PREFERRED_TIMEZONE:
            case EzEmployerOption.EZOPTION_EMPLOYER_DASHBOARD_PREFERRED_TIMEZONE:
                return EzEmployerOption.EZOPTION_MANAGER_EMPLOYER_DASHBOARD_PREFERRED_TIMEZONE;
            // Group jobs report by job
            case EzEmployerOption.EZOPTION_GROUP_JOBS_REPORT_BY_JOB:
            case EzEmployerOption.EZOPTION_EMPLOYER_JOBS_REPORT_GROUP_BY_JOB:
                return EzEmployerOption.EZOPTION_MANAGER_EMPLOYER_JOBS_REPORT_GROUP_BY_JOB;
            // Jobs report group by date
            case EzEmployerOption.EZOPTION_JOBS_REPORT_GROUP_BY_DATE:
            case EzEmployerOption.EZOPTION_PAYROLL_JOBS_REPORT_GROUP_BY_DATE:
            case EzEmployerOption.EZOPTION_EMPLOYER_JOBS_REPORT_GROUP_BY_DATE:
                return EzEmployerOption.EZOPTION_MANAGER_JOBS_REPORT_GROUP_BY_DATE;
            // Jobs report group by employee
            case EzEmployerOption.EZOPTION_JOBS_REPORT_GROUP_BY_EMPLOYEE:
            case EzEmployerOption.EZOPTION_PAYROLL_JOBS_REPORT_GROUP_BY_EMPLOYEE:
            case EzEmployerOption.EZOPTION_EMPLOYER_JOBS_REPORT_GROUP_BY_EMPLOYEE:
                return EzEmployerOption.EZOPTION_MANAGER_JOBS_REPORT_GROUP_BY_EMPLOYEE;
            default:
                return enumValue;
        }
    }

    /**
     * @static
     * @public @method
     * Returns the option key name to use for a manager (not acting as an employer)
     * @param {String} aOptionKeyName
     * @returns {String}
     */
    static ezToManagerOption(enumValue) {
        switch (enumValue) {
            // Selected Integration
            case EzEmployerOption.EZOPTION_SELECTED_INTEGRATION:
                return EzEmployerOption.EZOPTION_MANAGER_SELECTED_INTEGRATION;
            // Selected schedule week
            case EzEmployerOption.EZOPTION_SELECTED_SCHEDULE_WEEK:
            case EzEmployerOption.EZOPTION_EMPLOYER_LAST_SELECTED_SCHEDULE_WEEK:
                return EzEmployerOption.EZOPTION_EMPLOYEE_LAST_SELECTED_SCHEDULE_WEEK;
            // Selected period
            case EzEmployerOption.EZOPTION_SELECTED_PERIOD:
            case EzEmployerOption.EZOPTION_EMPLOYER_SELECTED_PERIOD:
            case EzEmployerOption.EZOPTION_MANAGER_EMPLOYER_SELECTED_PERIOD:
                return EzEmployerOption.EZOPTION_EMPLOYEE_SELECTED_PERIOD;
            // Use 24 hour in exports
            case EzEmployerOption.EZOPTION_USE_24HOURTIME_IN_EXPORT_REPORTS:
                return EzEmployerOption.EZOPTION_EMPLOYEE_USE_24HOURTIME_IN_EXPORT_REPORTS;
            default:
                return enumValue;
        }
    }

    /**
     * @static
     * @public @method
     * Returns the option key name to use for a manager acting as a employer account.
     * @param {String} aOptionKeyName
     * @returns {String}
     */
    static ezToPayrollManagerAsEmployerOption(enumValue) {
        switch (enumValue) {
            // Selected employee id
            case EzEmployerOption.EZOPTION_EMPLOYER_SELECTED_EMPLOYEE_ID:
            case EzEmployerOption.EZOPTION_SELECTED_EMPLOYEE_ID:
                return EzEmployerOption.EZOPTION_PAYROLL_MANAGER_EMPLOYER_SELECTED_EMPLOYEE_ID;
            // Schedule selected week
            case EzEmployerOption.EZOPTION_SELECTED_SCHEDULE_WEEK:
            case EzEmployerOption.EZOPTION_EMPLOYEE_LAST_SELECTED_SCHEDULE_WEEK:
            case EzEmployerOption.EZOPTION_EMPLOYER_LAST_SELECTED_SCHEDULE_WEEK:
                return EzEmployerOption.EZOPTION_PAYROLL_MANAGER_EMPLOYER_LAST_SELECTED_SCHEDULE_WEEK;
            // Selected period
            case EzEmployerOption.EZOPTION_SELECTED_PERIOD:
            case EzEmployerOption.EZOPTION_EMPLOYER_SELECTED_PERIOD:
            case EzEmployerOption.EZOPTION_EMPLOYEE_SELECTED_PERIOD:
                return EzEmployerOption.EZOPTION_PAYROLL_MANAGER_EMPLOYER_SELECTED_PERIOD;
            // Selected period start date
            case EzEmployerOption.EZOPTION_SELECTED_PERIOD_START_ISO:
            case EzEmployerOption.EZOPTION_EMPLOYER_SELECTED_PERIOD_STARTDATE:
                return EzEmployerOption.EZOPTION_PAYROLL_MANAGER_EMPLOYER_SELECTED_PERIOD_STARTDATE;
            // Selected Period End
            case EzEmployerOption.EZOPTION_SELECTED_PERIOD_END_ISO:
            case EzEmployerOption.EZOPTION_EMPLOYER_SELECTED_PERIOD_ENDDATE:
                return EzEmployerOption.EZOPTION_PAYROLL_MANAGER_EMPLOYER_SELECTED_PERIOD_ENDDATE;
            // Push notifications
            case EzEmployerOption.EZOPTION_ENABLE_PUSH_NOTIFICATIONS:
            case EzEmployerOption.EZOPTION_PUSH_NOTIFICATIONS_ENABLED:
                return EzEmployerOption.EZOPTION_PAYROLL_MANAGER_PUSH_NOTIFICATIONS_ENABLED;
            // Use 24 hour time in exports
            case EzEmployerOption.EZOPTION_SHOW_DAY_TOTALS_IN_EXPORT_REPORTS:
            case EzEmployerOption.EZOPTION_EMPLOYEE_SHOW_DAY_TOTALS_IN_EXPORT_REPORTS:
                return EzEmployerOption.EZOPTION_PAYROLL_MANAGER_SHOW_DAY_TOTALS_IN_EXPORT_REPORTS;
            case EzEmployerOption.EZOPTION_USE_24HOUR_TIME_IN_REPORTS:
            case EzEmployerOption.EZOPTION_USE_24HOURTIME_IN_EXPORT_REPORTS:
            case EzEmployerOption.EZOPTION_EMPLOYEE_USE_24HOURTIME_IN_EXPORT_REPORTS:
                return EzEmployerOption.EZOPTION_PAYROLL_MANAGER_USE_24HOURTIME_IN_EXPORT_REPORTS;
            // Use decimal in export totals
            case EzEmployerOption.EZOPTION_EMPLOYEE_USE_DECIMAL_TOTALS_IN_EXPORT_REPORTS:
            case EzEmployerOption.EZOPTION_TOTALS_AS_DECIMAL_IN_REPORTS:
            case EzEmployerOption.EZOPTION_USE_DECIMAL_TOTALS_IN_EXPORT_REPORTS:
                return EzEmployerOption.EZOPTION_PAYROLL_MANAGER_USE_DECIMAL_TOTALS_IN_EXPORT_REPORTS;
            // Preferred timezone
            case EzEmployerOption.EZOPTION_PREFERRED_TIMEZONE:
            case EzEmployerOption.EZOPTION_EMPLOYER_DASHBOARD_PREFERRED_TIMEZONE:
                return EzEmployerOption.EZOPTION_PAYROLL_MANAGER_EMPLOYER_DASHBOARD_PREFERRED_TIMEZONE;
            // Group jobs report by job
            case EzEmployerOption.EZOPTION_GROUP_JOBS_REPORT_BY_JOB:
            case EzEmployerOption.EZOPTION_EMPLOYER_JOBS_REPORT_GROUP_BY_JOB:
                return EzEmployerOption.EZOPTION_PAYROLL_MANAGER_EMPLOYER_JOBS_REPORT_GROUP_BY_JOB;
            // Jobs report group by date
            case EzEmployerOption.EZOPTION_JOBS_REPORT_GROUP_BY_DATE:
            case EzEmployerOption.EZOPTION_MANAGER_JOBS_REPORT_GROUP_BY_DATE:
            case EzEmployerOption.EZOPTION_EMPLOYER_JOBS_REPORT_GROUP_BY_DATE:
                return EzEmployerOption.EZOPTION_PAYROLL_JOBS_REPORT_GROUP_BY_DATE;
            // Jobs report group by employee
            case EzEmployerOption.EZOPTION_JOBS_REPORT_GROUP_BY_EMPLOYEE:
            case EzEmployerOption.EZOPTION_MANAGER_JOBS_REPORT_GROUP_BY_EMPLOYEE:
            case EzEmployerOption.EZOPTION_EMPLOYER_JOBS_REPORT_GROUP_BY_EMPLOYEE:
                return EzEmployerOption.EZOPTION_PAYROLL_JOBS_REPORT_GROUP_BY_EMPLOYEE;
            default:
                return enumValue;
        }
    }

    /**
     * @static
     * @public @method
     * Returns the option key name to use for a manager (not acting as an employer)
     * @param {String} aOptionKeyName
     * @returns {String}
     */
    static ezToPayrollManagerOption(enumValue) {
        switch (enumValue) {
            // Selected Integration
            case EzEmployerOption.EZOPTION_SELECTED_INTEGRATION:
                return EzEmployerOption.EZOPTION_PAYROLL_MANAGER_SELECTED_INTEGRATION;
            // Selected schedule week
            case EzEmployerOption.EZOPTION_SELECTED_SCHEDULE_WEEK:
            case EzEmployerOption.EZOPTION_EMPLOYER_LAST_SELECTED_SCHEDULE_WEEK:
                return EzEmployerOption.EZOPTION_EMPLOYEE_LAST_SELECTED_SCHEDULE_WEEK;
            // Selected period
            case EzEmployerOption.EZOPTION_SELECTED_PERIOD:
            case EzEmployerOption.EZOPTION_EMPLOYER_SELECTED_PERIOD:
            case EzEmployerOption.EZOPTION_MANAGER_EMPLOYER_SELECTED_PERIOD:
                return EzEmployerOption.EZOPTION_EMPLOYEE_SELECTED_PERIOD;
            case EzEmployerOption.EZOPTION_SHOW_DAY_TOTALS_IN_EXPORT_REPORTS:
                return EzEmployerOption.EZOPTION_EMPLOYEE_SHOW_DAY_TOTALS_IN_EXPORT_REPORTS;
            // Use 24 hour in exports
            case EzEmployerOption.EZOPTION_USE_24HOURTIME_IN_EXPORT_REPORTS:
                return EzEmployerOption.EZOPTION_EMPLOYEE_USE_24HOURTIME_IN_EXPORT_REPORTS;
            default:
                return enumValue;
        }
    }

    /**
     * @static
     * @public @method
     * Returns the option key name to use for a manager (not acting as an employer)
     * @param {String} aOptionKeyName
     * @returns {String}
     */
    static ezToEmployeeOption(enumValue) {
        switch (enumValue) {
            // Selected schedule week
            case EzEmployerOption.EZOPTION_SELECTED_SCHEDULE_WEEK:
            case EzEmployerOption.EZOPTION_EMPLOYER_LAST_SELECTED_SCHEDULE_WEEK:
                return EzEmployerOption.EZOPTION_EMPLOYEE_LAST_SELECTED_SCHEDULE_WEEK;
            // Selected period
            case EzEmployerOption.EZOPTION_SELECTED_PERIOD:
            case EzEmployerOption.EZOPTION_EMPLOYER_SELECTED_PERIOD:
            case EzEmployerOption.EZOPTION_PAYROLL_EMPLOYER_SELECTED_PERIOD:
            case EzEmployerOption.EZOPTION_MANAGER_EMPLOYER_SELECTED_PERIOD:
                return EzEmployerOption.EZOPTION_EMPLOYEE_SELECTED_PERIOD;
            // Use 24 hour in exports
            case EzEmployerOption.EZOPTION_USE_24HOURTIME_IN_EXPORT_REPORTS:
                return EzEmployerOption.EZOPTION_EMPLOYEE_USE_24HOURTIME_IN_EXPORT_REPORTS;
            default:
                return enumValue;
        }
    }

    /**
     * @static
     * @public @method
     * Returns the option key name to use for a manager (not acting as an employer)
     * @param {string} aOptionKeyName
     * @returns {string}
     */
    static ezToPersonalOption(enumValue) {
        return EzEmployerOption.ezToEmployeeOption(enumValue);
    }

    /**
     * @static
     * @public @method
     * Returns the option name for the userContext's account type
     * @param {string} enumValue
     * @returns {string}
     */
    static ezToOptionForAccountType(enumValue) {
        let userContext = ezApi.ezIsValid(ezApi.ezclocker.ezClockerContext) &&
            ezApi.ezIsFunction(ezApi.ezclocker.ezClockerContext.ezGetUserContext)
            ? ezApi.ezclocker.ezClockerContext.ezGetUserContext()
            : null;

        let ezClockerAccountType = EzClockerAccountType.EMPLOYER;

        if (ezApi.ezIsValid(userContext)) {
            if (userContext.isEmployer) {
                ezClockerAccountType = EzClockerAccountType.EMPLOYER;
            } else if (userContext.isManager &&
                ezApi.ezIsValid(ezApi.ezclocker.ezClockerContext.ezGetSelectedEmployerAccount()) &&
                ezApi.ezIsTrue(ezApi.ezclocker.ezClockerContext.ezGetSelectedEmployerAccount().ready)) {
                ezClockerAccountType = EzClockerAccountType.MANAGER_AS_EMPLOYER;
            } else if (userContext.isManager) {
                ezClockerAccountType = EzClockerAccountType.MANAGER;
            } else if (userContext.isEmployee) {
                ezClockerAccountType = EzClockerAccountType.EMPLOYEE;
            } else if (userContext.isPersoanl) {
                ezClockerAccountType = EzClockerAccountType.PERSONAL;
            }
        }

        switch (ezClockerAccountType) {
            case EzClockerAccountType.EMPLOYER:
                return EzEmployerOption.ezToEmployerOption(enumValue);
            case EzClockerAccountType.MANAGER_AS_EMPLOYER:
                return EzEmployerOption.ezToManagerAsEmployerOption(enumValue);
            case EzClockerAccountType.MANAGER:
                return EzEmployerOption.ezToManagerOption(enumValue);
            case EzClockerAccountType.PAYROLL_MANAGER:
                return EzEmployerOption.ezToPayrollManagerOption(enumValue);
            case EzClockerAccountType.PAYROLL_MANAGER_AS_EMPLOYER:
                return EzEmployerOption.ezToPayrollManagerOption(enumValue);
            case EzClockerAccountType.EMPLOYEE:
                return EzEmployerOption.ezToEmployeeOption(enumValue);
            case EzClockerAccountType.PERSONAL:
                return EzEmployerOption.ezToPersonalOption(enumValue);
            default:
                return enumValue;
        }
    }
}
