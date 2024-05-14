import {
    EzException,
    EzBadParamException
} from '/ezlibrary/exceptions/EzExceptions.js';

import { 
    EzObject 
} from '/ezlibrary/helpers/EzHelpers.js';

import {
    EzRegistrationState,
    EzClockerContextEventName
} from '/ezlibrary/enums/EzEnumerations.js';

import { EzClass } from '/ezlibrary/EzClass.js';

import { EzEventEngine } from '/ezlibrary/ez-event-engine.js';

import { EzNavigation } from '/public/javascript/common/ezclocker-navigation-helper.js';

import { EzClockerAccountType } from '/ezlibrary/EzClockerAccountType.js';
import { EzEmployerOption } from '/ezlibrary/EzEmployerOption.js';

/**
    Provides ezClocker option api services
    TODO: Rename to EzEmployerOptionsInternalApiClient

    Import with:
        import { EzOptionsService } from '/public/javascript/services/ezclocker-options.js';

        globalThis.ezApi.ezclocker[EzOptionsService.ezApiName] &&
        globalThis.ezApi.ezclocker[EzOptionsService.ezApiName].ready

        document.addEventListener(
            EzOptionsService.ezEventNames.onReady,
            this.#ezRegistrator);
 */
class EzOptionsService extends EzClass {
    static #ezInstance = Object.prototype.hasOwnProperty.call(globalThis, 'ezApi') &&
        globalThis.ezApi && globalThis.ezApi.ready &&
        Object.prototype.hasOwnProperty.call(globalThis.ezApi, 'ezclocker') &&
        globalThis.ezApi.ezclocker[EzOptionsService.ezApiName]
        ? globalThis.ezApi.ezclocker[EzOptionsService.ezApiName]
        : null;

    static #ezApiRegistrationState = null != EzOptionsService.#ezInstance
        ? EzOptionsService.ezApiRegistrationState
        : null;

    /**
        @public @getter @property
        Returns the singleton instance for EzOptionsService
        @returns {EzOptionsService}
     */
    static get ezInstance() {
        return EzOptionsService.#ezInstance;
    }

    /**
        @public @setter @property
        Sets the singleton instance for EzOptionsService
        @param {EzOptionsService} ezOptionsService
     */
    static set ezInstance(ezOptionsService) {
        if (null != EzOptionsService.#ezInstance) {
            throw new EzException(
                'EzEmployeeDashboardController\'s singleton instance is already assigned.');
        }

        EzOptionsService.#ezInstance = ezOptionsService;
    }

    /**
        @public @getter @property
        Returns the state of EzOptionsService's singleton instance registration with ezApi.
        @returns {string}
        Returns a enumeration property value from EzRegistrationState or null.
     */
    static get ezApiRegistrationState() {
        return EzOptionsService.#ezApiRegistrationState;
    }

    /**
        @public @setter @property
        Sets the state of EzOptionsService's singleton instance registration with ezApi.
        @param {string}
        A valid enumeration property value from EzRegistrationState or null.
     */
    static set ezApiRegistrationState(ezRegistrationState) {
        EzOptionsService.#ezApiRegistrationState = EzRegistrationState.ezValueOf(ezRegistrationState);

        if (EzRegistrationState.UNKNOWN === EzOptionsService.#ezApiRegistrationState) {
            EzOptionsService.#ezApiRegistrationState = null;
        }
    }

    static get ezApiName() {
        return 'ezOptionsService';
    }

    static get ezEventNames() {
        return {
            onReady: 'ezOn_EzOptionsService_Ready',
        };
    }

    static get ezCanRegister() {
        return EzRegistrationState.PENDING === EzOptionsService.ezApiRegistrationState &&
            Object.prototype.hasOwnProperty.call(globalThis, 'ezApi') &&
            globalThis.ezApi && globalThis.ezApi.ready &&

            globalThis.ezApi.ezclocker[EzEventEngine.ezApiName] &&
            globalThis.ezApi.ezclocker[EzEventEngine.ezApiName].ready &&

            globalThis.ezApi.ezclocker[EzNavigation.ezApiName] &&
            globalThis.ezApi.ezclocker[EzNavigation.ezApiName].ready;
    }

    static #ezRegistrator() {
        if (!EzOptionsService.ezCanRegister) {
            return false;
        }

        ezApi.ezRegisterNewApi(EzOptionsService, EzOptionsService.ezApiName);
        EzOptionsService.ezApiRegistrationState = EzRegistrationState.REGISTERED;
        return true;
    }

    // Static constructor
    static {
        if (null == EzOptionsService.ezApiRegistrationState) {
            EzOptionsService.ezApiRegistrationState = EzRegistrationState.PENDING;

            if (!EzOptionsService.#ezRegistrator()) {
                document.addEventListener(
                    'onEzApiReady',
                    () => {
                        if (!EzOptionsService.#ezRegistrator()) {
                            document.addEventListener(
                                EzEventEngine.ezEventNames.onReady,
                                EzOptionsService.#ezRegistrator);

                            document.addEventListener(
                                EzNavigation.ezEventNames.onReady,
                                EzOptionsService.#ezRegistrator);
                        }
                    });
            }
        }
    }

    /**
        @public @constructor
        Creates a new instance of EzOptionsService
     */
    constructor() {
        super();
    }

    ezEmployerOptions = {};
    ezEmployeeOptions = {};

    /**
        @protected @method
        Initializes EzOptionsService
        @returns {EzOptionsService}
     */
    ezInit() {
        EzOptionsService.ezInstance.ezInitDeprecatedConstants();

        // Register want events
        ezApi.ezclocker.ezEventEngine.ezWantEvent(
            EzClockerContextEventName.onActiveEmployerReady,
            EzOptionsService.ezApiName,
            EzOptionsService.ezInstance.ezSetDefaultOptionValues);

        return EzOptionsService.ezInstance;
    }

    /**
        @deprecated
        Stop all usee of the constants inside EzOptionsService and migrate to the EzEmployerOption enumeration.
        The constants will get removed in a future release.
        DO NOT ADD NEW OPTION CONSTANTS TO THIS METHOD - Add them to /ezlibrary/EzEmployerOption.js.
        @protected
        Initializes the constants inside EzOptionsService
     */
    ezInitDeprecatedConstants() {
        let self = EzOptionsService.ezInstance;

        // DEPRECATED URLS
        self.INTERNAL_GET_OPTION_URL = ezApi.ezclocker.ezNavigation.getInternalClassicServiceUrl('employerOptions/get');
        self.INTERNAL_SET_OPTION_URL = ezApi.ezclocker.ezNavigation.getInternalClassicServiceUrl('employerOptions/set');
        self.INTERNAL_GET_OPTIONLIST_URL = ezApi.ezclocker.ezNavigation.getInternalClassicServiceUrl('employerOptions/getAll');
        self.INTERNAL_SET_OPTIONLIST_URL = ezApi.ezclocker.ezNavigation.getInternalClassicServiceUrl('employerOptions/setAll');

        // Generic Account (can be used for all accounts if read/write goes through EzClockerContext)
        self.EZOPTION_SELECTED_EMPLOYEE_ID =
            EzEmployerOption.ezToOptionForAccountType(EzEmployerOption.EZOPTION_SELECTED_EMPLOYEE_ID);
        // 'EZOPTION_GENERIC_ACCOUNT_SELECTED_EMPLOYEE_ID';
        self.EZOPTION_SELECTED_PERIOD =
            EzEmployerOption.ezToOptionForAccountType(EzEmployerOption.EZOPTION_SELECTED_PERIOD);
        // 'EZOPTION_GENERIC_ACCOUNT_SELECTED_PERIOD';
        self.EZOPTION_SELECTED_SCHEDULE_WEEK =
            EzEmployerOption.ezToOptionForAccountType(EzEmployerOption.EZOPTION_SELECTED_SCHEDULE_WEEK);
        // 'EZOPTION_GENERIC_ACCOUNT_SCHEDULE_WEEK';
        self.EZOPTION_SELECTED_PERIOD_START_ISO =
            EzEmployerOption.ezToOptionForAccountType(EzEmployerOption.EZOPTION_SELECTED_PERIOD_START_ISO);
        // 'EZOPTION_GENERIC_SELECTED_PERIOD_START_ISO';
        self.EZOPTION_SELECTED_PERIOD_END_ISO =
            EzEmployerOption.ezToOptionForAccountType(EzEmployerOption.EZOPTION_SELECTED_PERIOD_END_ISO);
        // 'EZOPTION_GENERIC_SELECTED_PERIOD_END_ISO';
        self.EZOPTION_ENABLE_PUSH_NOTIFICATIONS =
            EzEmployerOption.ezToOptionForAccountType(EzEmployerOption.EZOPTION_ENABLE_PUSH_NOTIFICATIONS);
        // 'EZOPTION_GENERIC_ENABLE_PUSH_NOTIFICATIONS';
        self.EZOPTION_USE_24HOUR_TIME_IN_REPORTS =
            EzEmployerOption.ezToOptionForAccountType(EzEmployerOption.EZOPTION_USE_24HOUR_TIME_IN_REPORTS);
        // 'EZOPTION_GENERIC_USE_24HOUR_TIME_IN_REPORTS';
        self.EZOPTION_TOTALS_AS_DECIMAL_IN_REPORTS =
            EzEmployerOption.ezToOptionForAccountType(EzEmployerOption.EZOPTION_TOTALS_AS_DECIMAL_IN_REPORTS);
        // 'EZOPTION_GENERIC_TOTALS_AS_DECIMAL_IN_REPORTS';
        self.EZOPTION_PREFERRED_TIMEZONE =
            EzEmployerOption.ezToOptionForAccountType(EzEmployerOption.EZOPTION_PREFERRED_TIMEZONE);
        // 'EZOPTION_GENERIC_PREFERRED_TIMEZONE';
        self.EZOPTION_GROUP_JOBS_REPORT_BY_JOB =
            EzEmployerOption.ezToOptionForAccountType(EzEmployerOption.EZOPTION_GROUP_JOBS_REPORT_BY_JOB);
        // 'EZOPTION_GENERIC_GROUP_JOBS_REPORT_BY_JOB';
        self.EZOPTION_SELECTED_INTEGRATION =
            EzEmployerOption.ezToOptionForAccountType(EzEmployerOption.EZOPTION_SELECTED_INTEGRATION);

        // Employer Accounts
        self.EZOPTION_EMPLOYER_SELECTED_PERIOD_STARTDATE =
            EzEmployerOption.ezToOptionForAccountType(EzEmployerOption.EZOPTION_EMPLOYER_SELECTED_PERIOD_STARTDATE);
        // 'PeriodStartDate';
        self.EZOPTION_EMPLOYER_SELECTED_PERIOD_ENDDATE =
            EzEmployerOption.ezToOptionForAccountType(EzEmployerOption.EZOPTION_EMPLOYER_SELECTED_PERIOD_ENDDATE);
        // 'PeriodEndDate';
        self.EZOPTION_EMPLOYER_SELECTED_PERIOD =
            EzEmployerOption.ezToOptionForAccountType(EzEmployerOption.EZOPTION_EMPLOYER_SELECTED_PERIOD);
        // 'EMPLOYER_SELECTED_PERIOD';
        self.EZOPTION_EMPLOYER_SELECTED_EMPLOYEE_ID =
            EzEmployerOption.ezToOptionForAccountType(EzEmployerOption.EZOPTION_EMPLOYER_SELECTED_EMPLOYEE_ID);
        // 'EMPLOYER_SELECTED_EMPLOYEE_ID';
        self.EZOPTION_PUSH_NOTIFICATIONS_ENABLED =
            EzEmployerOption.ezToOptionForAccountType(EzEmployerOption.EZOPTION_PUSH_NOTIFICATIONS_ENABLED);
        // 'PUSH_NOTIFICATIONS_ENABLED';
        self.EZOPTION_EMPLOYER_LAST_SELECTED_SCHEDULE_WEEK =
            EzEmployerOption.ezToOptionForAccountType(EzEmployerOption.EZOPTION_EMPLOYER_LAST_SELECTED_SCHEDULE_WEEK);
        // 'EMPLOYER_LAST_SELECTED_SCHEDULE_WEEK';
        self.EZOPTION_USE_24HOURTIME_IN_EXPORT_REPORTS =
            EzEmployerOption.ezToOptionForAccountType(EzEmployerOption.EZOPTION_USE_24HOURTIME_IN_EXPORT_REPORTS);
        // 'USE_24HOURTIME_IN_EXPORT_REPORTS';
        self.EZOPTION_USE_DECIMAL_TOTALS_IN_EXPORT_REPORTS =
            EzEmployerOption.ezToOptionForAccountType(EzEmployerOption.EZOPTION_USE_DECIMAL_TOTALS_IN_EXPORT_REPORTS);
        // 'USE_DECIMAL_TOTALS_IN_EXPORT_REPORTS';
        self.EZOPTION_EMPLOYER_DASHBOARD_PREFERRED_TIMEZONE =
            EzEmployerOption.ezToOptionForAccountType(EzEmployerOption.EZOPTION_EMPLOYER_DASHBOARD_PREFERRED_TIMEZONE);
        // 'EMPLOYER_DASHBOARD_PREFERRED_TIMEZONE';
        self.EZOPTION_EMPLOYER_JOBS_REPORT_GROUP_BY_JOB =
            EzEmployerOption.ezToOptionForAccountType(EzEmployerOption.EZOPTION_EMPLOYER_JOBS_REPORT_GROUP_BY_JOB);
        // 'EMPLOYER_JOBS_REPORT_GROUP_BY_JOB';
        self.EZOPTION_EMPLOYER_SELECTED_INTEGRATION =
            EzEmployerOption.ezToOptionForAccountType(EzEmployerOption.EZOPTION_EMPLOYER_SELECTED_INTEGRATION);

        // Employee Accounts
        // 'EMPLOYEE_SELECTED_PERIOD';
        self.EZOPTION_EMPLOYEE_SELECTED_PERIOD =
            EzEmployerOption.ezToOptionForAccountType(EzEmployerOption.EZOPTION_EMPLOYEE_SELECTED_PERIOD);
        // 'EMPLOYEE_LAST_SELECTED_SCHEDULE_WEEK';
        self.EZOPTION_EMPLOYEE_LAST_SELECTED_SCHEDULE_WEEK =
            EzEmployerOption.ezToOptionForAccountType(EzEmployerOption.EZOPTION_EMPLOYEE_LAST_SELECTED_SCHEDULE_WEEK);
        // 'EMPLOYEE_USE_24HOURTIME_IN_EXPORT_REPORTS';
        self.EZOPTION_EMPLOYEE_USE_24HOURTIME_IN_EXPORT_REPORTS =
            EzEmployerOption.ezToOptionForAccountType(EzEmployerOption.EZOPTION_EMPLOYEE_USE_24HOURTIME_IN_EXPORT_REPORTS);
        // 'EMPLOYEE_USE_DECIMAL_TOTALS_IN_EXPORT_REPORTS'
        self.EZOPTION_EMPLOYEE_USE_DECIMAL_TOTALS_IN_EXPORT_REPORTS =
            EzEmployerOption.ezToOptionForAccountType(EzEmployerOption.EZOPTION_EMPLOYEE_USE_DECIMAL_TOTALS_IN_EXPORT_REPORTS);

        // Manager Accounts
        // 'Manager_PeriodStartDate';
        self.EZOPTION_MANAGER_EMPLOYER_SELECTED_PERIOD_STARTDATE =
            EzEmployerOption.ezToOptionForAccountType(EzEmployerOption.EZOPTION_MANAGER_EMPLOYER_SELECTED_PERIOD_STARTDATE);
        // 'Manager_PeriodEndDate';
        self.EZOPTION_MANAGER_EMPLOYER_SELECTED_PERIOD_ENDDATE =
            EzEmployerOption.ezToOptionForAccountType(EzEmployerOption.EZOPTION_MANAGER_EMPLOYER_SELECTED_PERIOD_ENDDATE);
        // 'MANAGER_EMPLOYER_SELECTED_EMPLOYEE_ID';
        self.EZOPTION_MANAGER_EMPLOYER_SELECTED_EMPLOYEE_ID =
            EzEmployerOption.ezToOptionForAccountType(EzEmployerOption.EZOPTION_MANAGER_EMPLOYER_SELECTED_EMPLOYEE_ID);
        // 'MANAGER_EMPLOYER_SELECTED_PERIOD';
        self.EZOPTION_MANAGER_EMPLOYER_SELECTED_PERIOD =
            EzEmployerOption.ezToOptionForAccountType(EzEmployerOption.EZOPTION_MANAGER_EMPLOYER_SELECTED_PERIOD);
        // 'MANAGER_EMPLOYER_LAST_SELECTED_SCHEDULE_WEEK';
        self.EZOPTION_MANAGER_EMPLOYER_LAST_SELECTED_SCHEDULE_WEEK =
            EzEmployerOption.ezToOptionForAccountType(EzEmployerOption.EZOPTION_MANAGER_EMPLOYER_LAST_SELECTED_SCHEDULE_WEEK);
        // 'MANAGER_PUSH_NOTIFICATIONS_ENABLED';
        self.EZOPTION_MANAGER_PUSH_NOTIFICATIONS_ENABLED =
            EzEmployerOption.ezToOptionForAccountType(EzEmployerOption.EZOPTION_MANAGER_PUSH_NOTIFICATIONS_ENABLED);
        // 'MANAGER_USE_24HOURTIME_IN_EXPORT_REPORTS';
        self.EZOPTION_MANAGER_USE_24HOURTIME_IN_EXPORT_REPORTS =
            EzEmployerOption.ezToOptionForAccountType(EzEmployerOption.EZOPTION_MANAGER_USE_24HOURTIME_IN_EXPORT_REPORTS);
        // 'MANAGER_USE_DECIMAL_TOTALS_IN_EXPORT_REPORTS';
        self.EZOPTION_MANAGER_USE_DECIMAL_TOTALS_IN_EXPORT_REPORTS =
            EzEmployerOption.ezToOptionForAccountType(EzEmployerOption.EZOPTION_MANAGER_USE_DECIMAL_TOTALS_IN_EXPORT_REPORTS);
        // 'MANAGER_EMPLOYER_DASHBOARD_PREFERRED_TIMEZONE';
        self.EZOPTION_MANAGER_EMPLOYER_DASHBOARD_PREFERRED_TIMEZONE =
            EzEmployerOption.ezToOptionForAccountType(EzEmployerOption.EZOPTION_MANAGER_EMPLOYER_DASHBOARD_PREFERRED_TIMEZONE);
        // 'MANAGER_EMPLOYER_JOBS_REPORT_GROUP_BY_JOB';
        self.EZOPTION_MANAGER_EMPLOYER_JOBS_REPORT_GROUP_BY_JOB =
            EzEmployerOption.ezToOptionForAccountType(EzEmployerOption.EZOPTION_MANAGER_EMPLOYER_JOBS_REPORT_GROUP_BY_JOB);
        // MANAGER_SELECTED_INTEGRATION
        self.EZOPTION_MANAGER_SELECTED_INTEGRATION =
            EzEmployerOption.ezToOptionForAccountType(EzEmployerOption.EZOPTION_MANAGER_SELECTED_INTEGRATION);

        // Global Option Constants
        // 'startDay';
        self.EZOPTION_EMPLOYER_SCHEDULE_START_DAY =
            EzEmployerOption.ezToOptionForAccountType(EzEmployerOption.EZOPTION_EMPLOYER_SCHEDULE_START_DAY);
        // 'REQUIRE_LOCATION_FOR_CLOCKINOUT';
        self.EZOPTION_REQUIRE_LOCATION_FOR_CLOCKINOUT =
            EzEmployerOption.ezToOptionForAccountType(EzEmployerOption.EZOPTION_REQUIRE_LOCATION_FOR_CLOCKINOUT);
        // 'EMPLOYER_DISABLE_TIME_ENTRY_EDITING';
        self.EZOPTION_EMPLOYER_DISABLE_TIME_ENTRY_EDITING =
            EzEmployerOption.ezToOptionForAccountType(EzEmployerOption.EZOPTION_EMPLOYER_DISABLE_TIME_ENTRY_EDITING);
        // 'CALCULATE_OVERTIME_IN_TIME_SHEET_EXPORTS';
        self.EZOPTION_CALCULATE_OVERTIME_IN_TIME_SHEET_EXPORTS =
            EzEmployerOption.ezToOptionForAccountType(EzEmployerOption.EZOPTION_CALCULATE_OVERTIME_IN_TIME_SHEET_EXPORTS);
        // 'CALCULATE_WEEKLY_OVERTIME_AFTER_HOURS';
        self.EZOPTION_CALCULATE_WEEKLY_OVERTIME_AFTER_HOURS =
            EzEmployerOption.ezToOptionForAccountType(EzEmployerOption.EZOPTION_CALCULATE_WEEKLY_OVERTIME_AFTER_HOURS);
        // 'CALCULATE_DAILY_OVERTIME';
        self.EZOPTION_CALCULATE_DAILY_OVERTIME =
            EzEmployerOption.ezToOptionForAccountType(EzEmployerOption.EZOPTION_CALCULATE_DAILY_OVERTIME);
        // 'CALCULATE_DAILY_OVERTIME_AFTER_HOURS';
        self.EZOPTION_CALCULATE_DAILY_OVERTIME_AFTER_HOURS =
            EzEmployerOption.ezToOptionForAccountType(EzEmployerOption.EZOPTION_CALCULATE_DAILY_OVERTIME_AFTER_HOURS);
        // 'CALCULATE_DAILY_DOUBLE_TIME';
        self.EZOPTION_CALCULATE_DAILY_DOUBLE_TIME =
            EzEmployerOption.ezToOptionForAccountType(EzEmployerOption.EZOPTION_CALCULATE_DAILY_DOUBLE_TIME);
        // 'CALCULATE_DAILY_DOUBLE_TIME_AFTER_HOURS';
        self.EZOPTION_CALCULATE_DAILY_DOUBLE_TIME_AFTER_HOURS =
            EzEmployerOption.ezToOptionForAccountType(EzEmployerOption.EZOPTION_CALCULATE_DAILY_DOUBLE_TIME_AFTER_HOURS);
        // 'RESTRICT_CLOCK_IN_TO_SCHEDULE';
        self.EZOPTION_RESTRICT_CLOCK_IN_TO_SCHEDULE =
            EzEmployerOption.ezToOptionForAccountType(EzEmployerOption.EZOPTION_RESTRICT_CLOCK_IN_TO_SCHEDULE);
        // 'TIME_ROUNDING_METHOD';
        self.EZOPTION_TIME_OFF_RESTRICT_REQUEST_START_DATE =
            EzEmployerOption.ezToOptionForAccountType(EzEmployerOption.EZOPTION_TIME_OFF_RESTRICT_REQUEST_START_DATE);
        // 'TIME_ROUNDING_METHOD';
        self.EZOPTION_TIME_OFF_MINIMUM_DAYS_IN_FUTURE =
            EzEmployerOption.ezToOptionForAccountType(EzEmployerOption.EZOPTION_TIME_OFF_MINIMUM_DAYS_IN_FUTURE);
        self.EZOPTION_SELECTED_PAY_PERIOD =
            EzEmployerOption.ezToOptionForAccountType(EzEmployerOption.EZOPTION_SELECTED_PAY_PERIOD);
        self.EZOPTION_PAY_PERIOD_LAST_CLOSING_DATE =
            EzEmployerOption.ezToOptionForAccountType(EzEmployerOption.EZOPTION_PAY_PERIOD_LAST_CLOSING_DATE);
        // 'TIME_ROUNDING_METHOD';
        self.EZOPTION_ROUND_CLOCK_IN_CLOCK_OUT =
            EzEmployerOption.ezToOptionForAccountType(EzEmployerOption.EZOPTION_ROUND_CLOCK_IN_CLOCK_OUT);
        // 'ALLOW_EARLY_CLOCK_AT_MINS_BEFORE_SCHEDULE';
        self.EZOPTION_ALLOW_EARLY_CLOCK_AT_MINS_BEFORE_SCHEDULE =
            EzEmployerOption.ezToOptionForAccountType(EzEmployerOption.EZOPTION_ALLOW_EARLY_CLOCK_AT_MINS_BEFORE_SCHEDULE);
        // 'ROUND_CLOCK_IN_CLOCK_OUT_OPTIONS';
        self.EZOPTION_ROUND_CLOCK_IN_CLOCK_OUT_OPTIONS =
            EzEmployerOption.ezToOptionForAccountType(EzEmployerOption.EZOPTION_ROUND_CLOCK_IN_CLOCK_OUT_OPTIONS);
        // 'ALLOW_RECORDING_OF_UNPAID_BREAKS';
        self.EZOPTION_ALLOW_RECORDING_OF_UNPAID_BREAKS =
            EzEmployerOption.ezToOptionForAccountType(EzEmployerOption.EZOPTION_ALLOW_RECORDING_OF_UNPAID_BREAKS);
        // 'ALLOW_AUTOMATIC_BREAKS';
        self.EZOPTION_ALLOW_AUTOMATIC_BREAKS =
            EzEmployerOption.ezToOptionForAccountType(EzEmployerOption.EZOPTION_ALLOW_AUTOMATIC_BREAKS);
        // 'AUTO_BREAK_WORK_HOURS_OPTION';
        self.AUTO_BREAK_WORK_HOURS_OPTION =
            EzEmployerOption.ezToOptionForAccountType(EzEmployerOption.AUTO_BREAK_WORK_HOURS_OPTION);
        // 'AUTO_BREAK_WORK_MINUTES_OPTION';
        self.AUTO_BREAK_WORK_MINUTES_OPTION =
            EzEmployerOption.ezToOptionForAccountType(EzEmployerOption.AUTO_BREAK_WORK_MINUTES_OPTION);
        // 'NOTIFY_EMPLOYEE_MISSED_CLOCK_IN_CLOCK_OUT';
        self.EZOPTION_NOTIFY_EMPLOYEE_MISSED_CLOCK_IN_CLOCK_OUT =
            EzEmployerOption.ezToOptionForAccountType(EzEmployerOption.EZOPTION_NOTIFY_EMPLOYEE_MISSED_CLOCK_IN_CLOCK_OUT);
        // 'NOTIFY_EMPLOYER_EMPLOYEE_MISSED_CLOCK_IN_CLOCK_OUT';
        self.EZOPTION_NOTIFY_EMPLOYER_EMPLOYEE_MISSED_CLOCK_IN_CLOCK_OUT =
            EzEmployerOption.ezToOptionForAccountType(EzEmployerOption.EZOPTION_NOTIFY_EMPLOYER_EMPLOYEE_MISSED_CLOCK_IN_CLOCK_OUT);
        // 'NOTIFY_EMPLOYEE_BEFORE_SHIFT_STARTS';
        self.EZOPTION_NOTIFY_EMPLOYEE_BEFORE_SHIFT_STARTS =
            EzEmployerOption.ezToOptionForAccountType(EzEmployerOption.EZOPTION_NOTIFY_EMPLOYEE_BEFORE_SHIFT_STARTS);
        // 'ALLOW_EMPLOYEES_TO_SEE_COWORKER_SCHEDULES';
        self.EZOPTION_ALLOW_EMPLOYEES_TO_SEE_COWORKER_SCHEDULES =
            EzEmployerOption.ezToOptionForAccountType(EzEmployerOption.EZOPTION_ALLOW_EMPLOYEES_TO_SEE_COWORKER_SCHEDULES);
        // 'WORK_WEEK_START_TIME';
        self.EZOPTION_WORK_DAY_START_TIME =
            EzEmployerOption.ezToOptionForAccountType(EzEmployerOption.EZOPTION_WORK_DAY_START_TIME);
        // 'WORK_WEEK_START_TIME';
        self.EZOPTION_WORK_WEEK_START_TIME =
            EzEmployerOption.ezToOptionForAccountType(EzEmployerOption.EZOPTION_WORK_WEEK_START_TIME);
        // 'TOTAL_HOURS_IN_WORK_WEEK';
        self.EZOPTION_TOTAL_HOURS_IN_WORK_WEEK =
            EzEmployerOption.ezToOptionForAccountType(EzEmployerOption.EZOPTION_TOTAL_HOURS_IN_WORK_WEEK);
        // 'TOTAL_HOURS_IN_WORK_DAY';
        self.EZOPTION_TOTAL_HOURS_IN_WORK_DAY =
            EzEmployerOption.ezToOptionForAccountType(EzEmployerOption.EZOPTION_TOTAL_HOURS_IN_WORK_DAY);
        // 'MIDNIGHT';
        self.EZOPTION_MIDNIGHT =
            EzEmployerOption.ezToOptionForAccountType(EzEmployerOption.EZOPTION_MIDNIGHT);
        self.NOTIFY_TIME_OFF_REQUESTS_UPDATED =
            EzEmployerOption.ezToOptionForAccountType(EzEmployerOption.NOTIFY_TIME_OFF_REQUESTS_UPDATED);

        // Other deprecated constants
        self.EMPLOYER_SELECTED_EMPLOYEE_ID_KEY = self.EZOPTION_EMPLOYER_SELECTED_EMPLOYEE_ID;
        self.EMPLOYER_SELECTED_ENDDATE_KEY = self.EZOPTION_EMPLOYER_SELECTED_PERIOD_ENDDATE;
        self.EMPLOYER_SELECTED_PERIOD_KEY = self.EZOPTION_EMPLOYER_SELECTED_PERIOD;
        self.EMPLOYER_LAST_SELECTED_SCHEDULE_WEEK = self.EZOPTION_EMPLOYER_LAST_SELECTED_SCHEDULE_WEEK;
        self.EMPLOYEE_USE_24HOURTIME_IN_EXPORT_REPORTS = self.EZOPTION_EMPLOYEE_USE_24HOURTIME_IN_EXPORT_REPORTS;
        self.EMPLOYER_USE_DECIMAL_TOTALS_IN_EXPORT_REPORTS = self.EZOPTION_USE_DECIMAL_TOTALS_IN_EXPORT_REPORTS;
        self.EMPLOYER_USE_24HOURTIME_IN_EXPORT_REPORTS = self.EZOPTION_USE_24HOURTIME_IN_EXPORT_REPORTS;
    }


    /**
        @public
        Returns the default schedule week moment and iso values.
        @returns {object}
     */
    ezGetDefaultScheduleWeek() {
        return !ezApi.ezIsValid(ezApi.ezclocker.ezDateTime)
            ? {
                scheduleWeekMoment: moment(),
                scheduleWeekIso: moment().format()
            }
            : {
                scheduleWeekMoment: ezApi.ezclocker.ezDateTime.ezNowWithStartOfDay(),
                scheduleWeekIso: ezApi.ezclocker.ezDateTime.ezMomentToIsoString(
                    ezApi.ezclocker.ezDateTime.ezNowWithStartOfDay()),
            };
    }

    /**
        @public
        Returns the default selected period moment and iso valus.
        @returns {object}
     */
    ezGetDefaultPeriod() {
        return !ezApi.ezIsValid(ezApi.ezclocker.ezDateTime)
            ? {
                periodStart: moment().subtract(7, 'days'),
                startMoment: moment().subtract(7, 'days'),
                startIso: moment().subtract(7, 'days').format(),
                periodEnd: moment().add(7, 'days'),
                endMoment: moment().subtract(7, 'days'),
                endIso: moment().add(7, 'days').format()
            }
            : {
                periodStart: ezApi.ezclocker.ezDateTime.ezNowWithStartOfDay().subtract(7, 'days'),
                startMoment: ezApi.ezclocker.ezDateTime.ezNowWithStartOfDay().subtract(7, 'days'),
                startIso: ezApi.ezclocker.ezDateTime.ezMomentToIsoString(
                    ezApi.ezclocker.ezDateTime.ezNowWithStartOfDay().subtract(7, 'days')),
                periodEnd: ezApi.ezclocker.ezDateTime.ezAddDays(ezApi.ezclocker.ezDateTime.ezNowWithEndOfDay(), 7),
                endMoment: ezApi.ezclocker.ezDateTime.ezAddDays(ezApi.ezclocker.ezDateTime.ezNowWithEndOfDay(), 7),
                endIso: ezApi.ezclocker.ezDateTime.ezMomentToIsoString(
                    ezApi.ezclocker.ezDateTime.ezAddDays(ezApi.ezclocker.ezDateTime.ezNowWithEndOfDay(), 7)),
            };
    }


    /**
        @protected
        Sets the default values for all known options
     */
    ezSetDefaultOptionValues() {
        ezApi.ezclocker.ezOptionsService.ezSetDefaultEmployeeOptionValues();
        ezApi.ezclocker.ezOptionsService.ezSetDefaultEmployerOptionValues();
    }

    /**
        @public
        Caches ALL the available options for an employer
        @param {Number} employerId
        @returns {Promise.resolve}
     */
    ezCacheEmployerOptions(employerId) {
        const self = EzOptionsService.ezInstance;

        return ezApi.ezResolver(
            (resolve) => {
                ezApi.ezclocker.http.ezGet(
                    ezApi.ezclocker.nav.ezGetInternalApiUrl(
                        ezApi.ezUrlTemplate`employer/${employerId}/options`,
                        'v1'))
                    .then(
                        ezApi.ezclocker.ezServices.ezProcessApiResolve,
                        ezApi.ezclocker.ezServices.ezProcessApiReject)
                    .then(
                        (response) => {
                            if (0 === response.errorCode && ezApi.ezArrayHasLength(response.entities)) {
                                response.entities.forEach((employerOption) => {
                                    if (ezApi.ezIsValid(employerOption) &&
                                        ezApi.ezStringHasLength(employerOption.optionName)) {
                                        self.ezEmployerOptions[employerOption.optionName] =
                                            !ezApi.ezStringHasLength(employerOption.optionValue)
                                                ? ''
                                                : employerOption.optionValue;
                                    }
                                });
                            }

                            return resolve(self.ezEmployerOptions);
                        },
                        (eResponse) => {
                            ezApi.ezclocker.logger.error(
                                ezApi.ezEM`
                                    Failed to cache employer options.
                                    ${ezApi.ezclocker.ezDialog.ezExtractErrorMessageFromResponse(eResponse)},
                                    ${ezApi.ezToJson(eResponse)}`);

                            return resolve(self.ezEmployerOptions);
                        });
            });
    }

    /**
        @public
        Saves all the cached employer options in one bulk operation.
        @param {Number} employerId
        @returns {Promise}
     */
    ezSaveEmployerOptions(employerId) {
        const self = EzOptionsService.ezInstance;

        let responses = [];

        return ezApi.ezPromise(
            (resolve, reject) => {
                let employerOptionNames = Object.keys(self.ezEmployerOptions);
                let hasErrorResponse = false;

                for (let employerOptionName of employerOptionNames) {
                    self.ezPersistEmployerOption(
                        employerId,
                        employerOptionName,
                        self.ezEmployerOptions[employerOptionName])
                        .then(
                            (response) => {
                                responses.push(response);

                                return ezApi.ezIsTrue(hasErrorResponse)
                                    ? reject(responses)
                                    : resolve(responses);
                            },
                            (eResponse) => {
                                hasErrorResponse = true;
                                responses.push(
                                    ezApi.ezclocker.ezServices.ezBuildErrorResponse(
                                        eResponse.errorCode,
                                        eResponse.message));

                                return reject(responses);
                            });
                }
            });
    }

    /**
        @deprecated
        Migrate to ezApi.ezclocker.ezOptionsService.ezPersistEmployerOption()
        @public
        Saves the employer option value
        @param {number} employerId
        @param {string} optionName
        @param {string} optionValue
        @returns {Promise}
     */
    saveEmployerOption(employerId, optionName, optionValue) {
        return EzOptionsService.ezInstance.ezPersistEmployerOption(employerId, optionName, optionValue);
    }

    /**
        @public
        Persists the employer option to the backend db.
        @param {number} employerId
        @param {string} ezEmployerOption
        A constant from EzEmployerOption
        @param {*} optionValue
        @returns {Promise}
     */
    ezPersistEmployerOption(employerId, ezEmployerOption, optionValue) {
        if (!ezApi.ezIsNumber(employerId)) {
            throw new EzBadParamException(
                'employerId',
                EzOptionsService.ezInstance,
                EzOptionsService.ezInstance.ezPersistEmployerOption);
        }
        if (!ezApi.ezStringHasLength(ezEmployerOption)) {
            throw new EzBadParamException(
                'ezEmployerOption',
                EzOptionsService.ezInstance,
                EzOptionsService.ezInstance.ezPersistEmployerOption);
        }
        if (!ezApi.ezIsValid(optionValue)) {
            throw new EzBadParamException(
                'optionValue',
                EzOptionsService.ezInstance,
                EzOptionsService.ezInstance.ezPersistEmployerOption);
        }
        if (!ezApi.ezIsString(optionValue)) {
            optionValue = optionValue.toString();
        }

        return ezApi.ezPromise(
            (resolve, reject) => {
                ezApi.ezclocker.ezHttpHelper.ezPost(
                    ezApi.ezclocker.ezNavigation.ezGetInternalApiServiceUrl(`employer/options/${ezEmployerOption}`, 'v2'),
                    ezApi.ezToJson({
                        'optionName': ezEmployerOption,
                        'optionValue': EzOptionsService.ezInstance.ezNormalizeOptionValue(optionValue)
                    }))
                    .then(
                        ezApi.ezclocker.ezServices.ezProcessApiResolve,
                        ezApi.ezclocker.ezServices.ezProcessApiReject)
                    .then(
                        (response) => {
                            if (EzObject.isValid(response) && EzObject.isValid(response.employerOption)) {
                                // Cache the updated option
                                EzOptionsService.ezInstance.ezEmployerOptions[response.employerOption.optionName] = response.employerOption.optionValue;

                                return resolve(response);
                            }

                            return reject(response);
                        },
                        reject);
            });
    }

    /**
        @public
        Returns true if the value is 1, true, or yes.
        Returns false if the value is null, empty string, 0, false, or no.
        Returns false if none of the previous conditions matched (error state)
        @param {String} optionValue
        @returns {Boolean}
     */
    ezOptionValueToBoolean(optionValue, defaultValue) {
        defaultValue = ezApi.ezIsTrue(defaultValue);

        if (!ezApi.ezIsValid(optionValue)) {
            return defaultValue;
        }

        if (ezApi.ezIsBoolean(optionValue)) {
            return optionValue;
        }

        if (ezApi.ezStringHasLength(optionValue)) {
            optionValue = optionValue.toUpperCase();
            if ('1' === optionValue ||
                'TRUE' === optionValue ||
                'T' === optionValue ||
                'YES' === optionValue ||
                'Y' === optionValue ||
                'OK' === optionValue) {
                return true;
            }
            if ('0' === optionValue ||
                'FALSE' === optionValue ||
                'F' === optionValue ||
                'NO' === optionValue ||
                'N' === optionValue ||
                'CANCEL' === optionValue) {
                return false;
            }
        }
    }

    /**
        @public
        Converts a boolean value to it's optionValue string
        true returns '1'
        false returns '0'
        @param {Boolean} booleanValue
        @returns {String}
     */
    ezBooleanToOptionValue(booleanValue) {
        if (!ezApi.ezIsBoolean(booleanValue)) {
            return '0';
        }

        return ezApi.ezIsTrue(booleanValue)
            ? '1'
            : '0';
    }

    /**
        @public
        Returns the number (via parseInt) if the value is a string number.
        Returns the default value if the value is NOT a string number.
        Returns NaN if defaultValue is not provided and the optionValue is not a number.
        @param {String} optionValue
        @param {Number|NaN|null} defaultValue
        @returns {Number|NaN}
     */
    ezOptionValueToNumber(optionValue, defaultValue) {
        defaultValue = !ezApi.ezIsNumber(defaultValue) || isNaN(defaultValue)
            ? NaN
            : defaultValue;

        if (ezApi.ezIsNumber(optionValue)) {
            return optionValue;
        }

        if (!ezApi.ezStringHasLength(optionValue)) {
            return defaultValue;
        }

        if ('NaN' === optionValue) {
            return NaN;
        }

        let result = parseInt(optionValue);
        if (isNaN(result)) {
            return defaultValue;
        }

        return result;
    }

    /**
        @public
        Converts the provided numberValue to the optionValue string.
        Null or undefined numberValue will return 'NaN'
        @returns {String}
     */
    ezNumberToOptionValue(numberValue) {
        if (!ezApi.ezIsNumber(numberValue)) {
            return 'NaN';
        }

        return numberValue.toString();
    }

    /**
        @deprecated Migrate to ezApi.ezclocker.ezOptionsService.ezOptionValueToMoment
        @public
        Returns the iso date time of the optionValue.
        If the valid is not a valid ISO, then the defaultValue is returned.
        If the default value is not provided, null is returned.
        @param {String} optionValue
        @param {Number} defaultValue
        @returns {moment}
     */
    ezOptionValueToIsoDateTime(optionValue, defaultValue) {
        defaultValue = ezApi.ezIsValid(defaultValue)
            ? defaultValue
            : null;

        if (ezApi.ezIsEmptyString(optionValue)) {
            throw new EzBadParamException(
                'aOptionValue',
                EzOptionsService.ezInstance,
                EzOptionsService.ezInstance.ezOptionValueToIsoDateTime);
        }

        if (!ezApi.ezclocker.ezDateTime.ezIsValidIsoDateTime(optionValue)) {
            return defaultValue;
        }

        return ezApi.ezclocker.ezDateTime.ezCreateFromIso(optionValue);
    }

    /**
        @public
        Returns the iso date time of the optionValue.
        If the valid is not a valid ISO, then the defaultValue is returned.
        If the default value is not provided, null is returned.
        @param {String} aOptionValue
        @param {Number} aDefaultValue
        @returns {moment}
     */
    ezOptionValueToMoment(aOptionValue, aDefaultValue) {
        aDefaultValue = ezApi.ezIsValid(aDefaultValue)
            ? aDefaultValue
            : null;

        if (ezApi.ezIsEmptyString(aOptionValue)) {
            throw new EzBadParamException(
                'aOptionValue',
                EzOptionsService.ezInstance,
                EzOptionsService.ezInstance.ezOptionValueToMoment);
        }

        if (!ezApi.ezclocker.ezDateTime.ezIsValidIsoString(aOptionValue)) {
            return aDefaultValue;
        }

        return ezApi.ezclocker.ezDateTime.ezCreateFromIso(aOptionValue);
    }

    /**
        @public
        Converts the provided momentValue to the optionValue string (an ISO date time)
        If the momentValue is null or undefined, a blank string is returned.
        @returns {String}
     */
    ezMomentToOptionValue(momentValue) {
        if (!ezApi.ezIsValid(momentValue)) {
            return '';
        }

        return ezApi.ezclocker.ezDateTime.ezToIsoDateTime(momentValue);
    }

    /**
        @public
        Sets the default employee options values
     */
    ezSetDefaultEmployeeOptionValues() {
        const self = EzOptionsService.ezInstance;

        self.ezEmployeeOptions[self.EZOPTION_EMPLOYEE_SELECTED_PERIOD] = self.ezGetDefaultPeriod();
        self.ezEmployeeOptions[self.EZOPTION_EMPLOYEE_LAST_SELECTED_SCHEDULE_WEEK] =
            ezApi.ezclocker.ezDateTime.ezNowWithStartOfDay();
    }

    /**
        @public
        Sets the default employer option values
     */
    ezSetDefaultEmployerOptionValues() {
        const self = EzOptionsService.ezInstance;

        self.ezEmployerOptions[self.EZOPTION_EMPLOYER_SELECTED_PERIOD_STARTDATE] =
            ezApi.ezclocker.ezDateTime.ezToIsoDateTime(
                ezApi.ezclocker.ezDateTime.ezMinusDays(ezApi.ezclocker.ezDateTime.ezNowWithStartOfDay(), 7));
        self.ezEmployerOptions[self.EZOPTION_EMPLOYER_SELECTED_PERIOD_ENDDATE] =
            ezApi.ezclocker.ezDateTime.ezToIsoDateTime(
                ezApi.ezclocker.ezDateTime.ezAddDays(ezApi.ezclocker.ezDateTime.ezNowWithEndOfDay(), 7));
        self.ezEmployerOptions[self.EZOPTION_EMPLOYER_SELECTED_PERIOD] = self.ezGetDefaultPeriod();
        self.ezEmployerOptions[self.EZOPTION_EMPLOYER_LAST_SELECTED_SCHEDULE_WEEK] =
            ezApi.ezclocker.ezDateTime.ezToIsoDateTime(ezApi.ezclocker.ezDateTime.ezNowWithStartOfDay());

        self.ezEmployerOptions[self.EZOPTION_EMPLOYER_DASHBOARD_PREFERRED_TIMEZONE] =
            ezApi.ezclocker.ezDateTime.activeTimeZone;
        self.ezEmployerOptions[self.EZOPTION_EMPLOYER_SELECTED_EMPLOYEE_ID] = null;
        self.ezEmployerOptions[self.EZOPTION_PUSH_NOTIFICATIONS_ENABLED] = '1';
        self.ezEmployerOptions[self.EZOPTION_REQUIRE_LOCATION_FOR_CLOCKINOUT] = '0';
        self.ezEmployerOptions[self.EZOPTION_EMPLOYER_DISABLE_TIME_ENTRY_EDITING] = '0';

        self.ezEmployerOptions[self.EZOPTION_ALLOW_RECORDING_OF_UNPAID_BREAKS] = '1';
        self.ezEmployerOptions[self.EZOPTION_ALLOW_AUTOMATIC_BREAKS] = '0';
        self.ezEmployerOptions[self.AUTO_BREAK_WORK_HOURS_OPTION] = '4';
        self.ezEmployerOptions[self.AUTO_BREAK_WORK_MINUTES_OPTION] = '15';

        self.ezEmployerOptions[self.EZOPTION_USE_24HOURTIME_IN_EXPORT_REPORTS] = '0';
        self.ezEmployerOptions[self.EZOPTION_USE_DECIMAL_TOTALS_IN_EXPORT_REPORTS] = '0';
        self.ezEmployerOptions[self.EZOPTION_EMPLOYEE_USE_24HOURTIME_IN_EXPORT_REPORTS] = '0';
        self.ezEmployerOptions[self.EZOPTION_EMPLOYER_JOBS_REPORT_GROUP_BY_JOB] = '1';
        self.ezEmployerOptions[self.EZOPTION_EMPLOYER_SCHEDULE_START_DAY] = 0;

        self.ezEmployerOptions[self.EZOPTION_CALCULATE_OVERTIME_IN_TIME_SHEET_EXPORTS] = '0';
        self.ezEmployerOptions[self.EZOPTION_CALCULATE_WEEKLY_OVERTIME_AFTER_HOURS] = '40';
    }

    /**
        @public
        Normalizes the value of an option to bring the values to a consistent format. Some were stored in a
        different format for earlier relases.
        @param {string|null} ezOptionValueToBoolean
        @returns {string}
     */
    ezNormalizeOptionValue(optionValue) {
        if (ezApi.ezIsString(optionValue)) {
            if ('true' === optionValue.toLowerCase()) {
                return '1';
            }

            if ('false' === optionValue.toLowerCase()) {
                return '0';
            }

            return optionValue;
        }

        if (ezApi.ezIsBoolean(optionValue)) {
            return optionValue
                ? '1'
                : '0';
        }

        if (!ezApi.ezIsValid(optionValue)) {
            return '';
        }

        return optionValue;
    }

    /**
        @public
        Returns an employer option or the defaultValue if the option did not exist.
        @param {string} optionName
        @param {*} defaultValue
        @returns {*}
     */
    ezGetEmployerOption(optionName, defaultValue) {
        const self = EzOptionsService.ezInstance;

        if (!ezApi.ezHasOwnProperty(self.ezEmployerOptions, optionName)) {
            self.ezEmployerOptions[optionName] = self.ezNormalizeOptionValue(defaultValue);
            return self.ezEmployerOptions[optionName];
        }

        return self.ezEmployerOptions[optionName];
    }

    /**
        @public
        Sets an employer option's value. Returns the optionValue that was set.
        @param {string} optionName
        @param {string} optionValue
        @returns {string}
     */
    ezSetEmployerOption(optionName, optionValue) {
        const self = EzOptionsService.ezInstance;

        if (ezApi.ezIsEmptyString(optionName)) {
            throw new EzBadParamException(
                'optionName',
                self,
                self.ezSetEmployerOption);
        }

        self.ezEmployerOptions[optionName] = ezApi.ezclocker.ezOptionsService.ezNormalizeOptionValue(optionValue);

        self.ezPersistEmployerOption(
            ezApi.ezclocker.ezClockerContext.ezGetActiveEmployer().id,
            optionName,
            self.ezEmployerOptions[optionName])
            .then(
                ezApi.ezIgnoreResolve,
                (eResponse) => ezApi.ezclocker.logger.error(
                    ezApi.ezEM`
                        Failed to persist employer option "${optionName}=${optionValue}".
                        Error: ${ezApi.ezToJson(eResponse, 2)}`));

        return self.ezEmployerOptions[optionName];
    }

    /**
        @public
        Gets an employee's option. Returns the default value if the employee's option did not exist.
        @param {string} optionName
        @param {string} defaultValue
        @return {string}
     */
    ezGetEmployeeOption(optionName, defaultValue) {
        const self = EzOptionsService.ezInstance;

        if (!ezApi.ezHasOwnProperty(self.ezEmployerOptions, optionName)) {
            self.ezEmployeeOptions[optionName] = self.ezNormalizeOptionValue(defaultValue);
            return self.ezEmployeeOptions[optionName];
        }

        return self.ezNormalizeOptionValue(self.ezEmployerOptions[optionName]);
    }

    /**
        @public
        Sets an employee option to the provided value. Returns the optionValue that was set.
        @param {string} optionName
        @param {*} optionValue
        @returns {*}
     */
    ezSetEmployeeOption(optionName, optionValue) {
        const self = EzOptionsService.ezInstance;

        if (ezApi.ezIsEmptyString(optionName)) {
            throw new EzBadParamException(
                'optionName',
                self,
                self.ezSetEmployerOption);
        }

        optionValue = self.ezNormalizeOptionValue(optionValue);
        self.ezEmployeeOptions[optionName] = optionValue;
        return optionValue;
    }

    /**
        @deprecated Migrate to ezApi.ezclocker.ezClockerContext functionality
        @public
        Reads the employer's last selected period from the stored options.
        @param {number} employerId
        @returns {Promise.resolve}
     */
    readEmployerSelectedPeriod(employerId) {
        const self = EzOptionsService.ezInstance;

        if (!ezApi.ezIsNumber(employerId)) {
            throw new EzBadParamException(
                'employerId',
                self,
                self.readEmployerSelectedPeriod);
        }

        return ezApi.ezResolver((resolve) => self.ezReadEmployerOption(
            employerId,
            self.EZOPTION_EMPLOYER_SELECTED_PERIOD,
            ezApi.ezToJson(self.ezGetDefaultPeriod()))
            .then(ezApi.ezclocker.ezServices.ezProcessApiResolve, ezApi.ezclocker.ezServices.ezProcessApiReject)
            .then(
                (response) => {
                    let employerPeriod = ezApi.ezFromJson(response.employerOption.optionValue);
                    return resolve({
                        periodStart: ezApi.ezIsNotValid(employerPeriod) ||
                            ezApi.ezIsNotEmptyString(employerPeriod.startDateIso8601)
                            ? ezApi.ezclocker.ezDateTime.ezCreateFromIso(employerPeriod.startDateIso8601)
                            : self.ezGetDefaultPeriod().startMoment,
                        periodEnd: ezApi.ezIsNotValid(employerPeriod) ||
                            ezApi.ezIsNotEmptyString(employerPeriod.endDateIso8601)
                            ? ezApi.ezclocker.ezDateTime.ezCreateFromIso(employerPeriod.endDateIso8601)
                            : self.ezGetDefaultPeriod().endMoment,
                    });
                },
                (eResponse) => {
                    ezApi.ezclocker.logger.error(ezApi.ezEM`
                        Failed to read the employer\s elected period. Error: ${ezApi.ezToJson(eResponse)}`);

                    return resolve(self.ezGetDefaultPeriod());
                }));
    }

    /**
        @public
        Reads an employer option (as a string) for the provided optionKey. Returns the defaultValue
        if unable to read the option.
        @param {Number} employerId
        @param {String} optionKey
        @param {String} defaultValue
        @returns {Promise.resolve}
     */
    ezReadEmployerOptionValue(employerId, optionKey, defaultValue) {
        const self = EzOptionsService.ezInstance;

        if (!ezApi.ezIsNumber(employerId)) {
            throw new EzBadParamException(
                'employerId',
                self,
                self.ezReadEmployerOptionValue);
        }
        if (!ezApi.ezStringHasLength(optionKey)) {
            throw new EzBadParamException(
                'optionKey',
                self,
                self.ezReadEmployerOptionValue);
        }

        if (!ezApi.ezIsString(defaultValue)) {
            defaultValue = '';
        }

        return ezApi.ezResolver(
            (resolve) => {
                self.ezReadEmployerOption(employerId, optionKey, defaultValue)
                    .then(
                        ezApi.ezclocker.ezServices.ezProcessApiResolve,
                        ezApi.ezclocker.ezServices.ezProcessApiReject)
                    .then(
                        (response) => resolve(response.optionValue),
                        (eResponse) => {
                            ezApi.ezclocker.error(
                                ezApi.ezEM`
                                    Failed to read employer option value for optionName=${optionKey}.
                                    Error: ${ezApi.ezToJson(eResponse)}`);

                            return resolve(defaultValue);
                        });
            });
    }

    /**
        @public
        Saves the employers last selected period
        @param {number} employerId
        @param {moment} startMoment
        @param {moment} endMoment
        @returns {Promise}
     */
    saveEmployerSelectedPeriod(employerId, startMoment, endMoment) {
        const self = EzOptionsService.ezInstance;

        if (!ezApi.ezIsNumber(employerId)) {
            throw new EzBadParamException(
                'employerId',
                self,
                self.saveEmployerSelectedPeriod);
        }

        return ezApi.ezPromise(
            (resolve, reject) => {
                startMoment = ezApi.isValid(startMoment)
                    ? startMoment
                    : self.ezGetDefaultPeriod().startMoment;
                endMoment = ezApi.isValid(endMoment)
                    ? endMoment
                    : self.ezGetDefaultPeriod().endMoment;

                self.ezEmployerOptions[self.EZOPTION_EMPLOYER_SELECTED_PERIOD] = {
                    periodStart: startMoment,
                    startMoment: startMoment,
                    startIso: ezApi.ezclocker.ezDateTime.ezMomentToIsoString(startMoment),
                    periodEnd: endMoment,
                    endMoment: endMoment,
                    endIso: ezApi.ezclocker.ezDateTime.ezMomentToIsoString(endMoment)
                };

                self.ezPersistEmployerOption(
                    employerId,
                    self.EZOPTION_EMPLOYER_SELECTED_PERIOD,
                    ezApi.ezToJson({
                        startDateIso8601: ezApi.ezclocker.ezDateTime.ezMomentToIsoString(startMoment),
                        endDateIso8601: ezApi.ezclocker.ezDateTime.ezMomentToIsoString(endMoment)
                    }))
                    .then(resolve, reject);
            });
    }

    /**
        @public
        Saves the employer's last selected employee
        @param {Number} employerId
        @param {Number} employeeId
        @returns {Promise}
     */
    saveEmployerSelectedEmployee(employerId, employeeId) {
        const self = EzOptionsService.ezInstance;

        if (!ezApi.ezIsNumber(employerId)) {
            throw new EzBadParamException(
                'employerId',
                self,
                self.saveEmployerSelectedEmployee);
        }
        if (!ezApi.ezIsNumber(employeeId)) {
            throw new EzBadParamException(
                'employeeId',
                self,
                self.saveEmployerSelectedEmployee);
        }

        return self.ezPersistEmployerOption(
            employerId,
            self.EZOPTION_EMPLOYER_SELECTED_EMPLOYEE_ID,
            employeeId);
    }

    /**
        @deprecated Migrate to ezApi.ezclocker.ezOptionsService.ezReadEmployerSelectedEmployee()
        @public
        Returns the employer's last selected employee option
        @param {number} employerId
        @returns {Promise}
     */
    readEmployerSelectedEmployee(employerId) {
        return EzOptionsService.ezInstance.ezReadEmployerSelectedEmployee(employerId);
    }

    /**
        @public
        Returns the employer's last selected employee option
        @param {number} employerId
        @returns {Promise.resolve}
     */
    ezReadEmployerSelectedEmployee(employerId) {
        const self = EzOptionsService.ezInstance;

        return ezApi.ezPromise(
            (resolve) => {
                self.ezReadEmployerOption(employerId, self.EZOPTION_EMPLOYER_SELECTED_EMPLOYEE_ID)
                    .then(
                        (optionResult) => {
                            let value = optionResult.employerOption.optionValue;
                            return ezApi.ezStringHasLength(value)
                                ? resolve(value)
                                : resolve(null);
                        },
                        (eResponse) => {
                            ezApi.ezclocker.logger.error(
                                ezApi.ezEM`
                                    Failed to read the employer selected employee option.
                                    Error: ${ezApi.ezToJson(eResponse)}`);
                            return resolve(null);
                        });
            });
    }

    /**
        @public
        Reads the employer option value
        @param {number} employerId
        @param {string} optionName
        @param {string} defaultValue
        @returns {Promise}
     */
    ezReadEmployerOption(employerId, optionName, defaultValue) {
        const self = EzOptionsService.ezInstance;

        if (!ezApi.ezIsNumber(employerId)) {
            throw new EzBadParamException(
                'employerId',
                self,
                self.ezReadEmployerOption);
        }
        if (ezApi.ezIsEmptyString(optionName)) {
            throw new EzBadParamException(
                'optionName',
                self,
                self.ezReadEmployerOption);
        }

        let url = ezApi.ezclocker.nav.ezGetInternalApiUrl(
            ezApi.ezUrlTemplate`employer/${employerId}/options/${ezApi.ezEncode(optionName)}
                ?defaultValue=${ezApi.ezEncode(self.ezNormalizeOptionValue(defaultValue))}`);

        return ezApi.ezclocker.http.ezGet(url)
            .then(
                ezApi.ezclocker.ezServices.ezProcessApiResolve,
                ezApi.ezclocker.ezServices.ezProcessApiReject);
    }

    /**
        @deprecated
        Migrate to EzOptionsService.ezInstance.ezReadEmployerOption()
        @public
        Reads the employer option value
        @param {number} employerId
        @param {string} optionName
        @param {string} defaultValue
        @returns {Promise}
     */
    readEmployerOption(employerId, optionName, defaultValue) {
        return EzOptionsService.ezInstance.ezReadEmployerOption(
            employerId,
            optionName,
            defaultValue);
    }

    /**
        @public
        Reads the employers option list
        @param {number} employerId
        @returns {Promise}
     */
    readEmployerOptionList(employerId) {
        const self = EzOptionsService.ezInstance;

        if (!ezApi.ezIsNumber(employerId)) {
            throw new EzBadParamException(
                'employerId',
                self,
                self.readEmployerOptionList);
        }

        return ezApi.ezPromise(
            (resolve, reject) => ezApi.ezclocker.http.ezGet(
                ezApi.ezclocker.nav.ezGetInternalApiUrl(
                    ezApi.ezUrlTemplate`employer/${employerId}/options`))
                .then(
                    ezApi.ezclocker.ezServices.ezProcessApiResolve,
                    ezApi.ezclocker.ezServices.ezProcessApiReject)
                .then(
                    (response) => {
                        if (ezApi.ezArrayHasLength(response.entities)) {
                            return resolve(response);
                        }

                        response.entities.forEach(
                            (option) => {
                                if (ezApi.ezIsValid(option) && ezApi.ezStringHasLength(option.optionName)) {
                                    self.ezEmployerOptions[option.optionName] =
                                        self.ezNormalizeOptionValue(option.optionValue);
                                }
                            });

                        return resolve(response.entities);
                    },
                    (eResponse) => {
                        ezApi.ezclocker.logger.error(
                            `Failed to read the employer option list. Error: ${ezApi.ezToJson(eResponse)}`);

                        return reject(eResponse);
                    }));
    }

    /**
        @public
        Saves the employer's option list
        @param {Number} employerId
        @param {Array} optionList
     */
    saveEmployerOptionList(employerId, optionList) {
        const self = EzOptionsService.ezInstance;

        if (!ezApi.ezIsNumber(employerId)) {
            throw new EzBadParamException(
                'employerId',
                self,
                self.saveEmployerOptionList);
        }
        if (!ezApi.ezArrayHasLength(optionList)) {
            throw new EzBadParamException(
                'optionList',
                self,
                self.saveEmployerOptionList);
        }

        return ezApi.ezPromise(
            (resolve, reject) => ezApi.ezclocker.http.ezPost(
                ezApi.ezclocker.nav.ezGetInternalApiUrl(
                    ezApi.ezUrlTemplate`employer/${employerId}/options/bulk`),
                ezApi.ezToJson({
                    employerId: employerId,
                    entities: optionList
                }))
                .then(
                    ezApi.ezclocker.ezServices.ezProcessApiResolve,
                    ezApi.ezclocker.ezServices.ezProcessApiReject)
                .then(
                    (response) => {
                        let eOptions = response.entities;
                        if (ezApi.ezArrayHasLength(eOptions)) {
                            eOptions.forEach(
                                option => self.ezEmployerOptions[option.optionName] = option.optionValue);
                        }

                        return resolve(response);
                    },
                    (eResponse) => {
                        ezApi.ezclocker.logger.error(
                            `Failed to save the employer option list. Error: ${ezApi.ezToJson(eResponse)}`);

                        return reject(eResponse);
                    }));
    }

    /**
        @deprecated Migrate to ezApi.ezclocker.ezOptionsService.ezReadEmployeeOption()
        @public
        Returns the employee option value
        @param {number} employerId
        @param {number} employeeId
        @param {string} optionName
        @param {string} defaultValue
        @returns {Promise}
     */
    readEmployeeOption(employerId, employeeId, optionName, defaultValue) {
        return EzOptionsService.ezInstance.ezReadEmployeeOption(
            employerId,
            employeeId,
            optionName,
            defaultValue);
    }

    /**
        @public
        Returns the employee option value
        @param {number} employerId
        @param {number} employeeId
        @param {string} optionName
        @param {string} defaultValue
        @returns {Promise}
     */
    ezReadEmployeeOption(employerId, employeeId, optionName, defaultValue) {
        return EzOptionsService.ezInstance.ezReadEmployerOption(
            employerId,
            ezApi.ezIdTemplate`${employeeId}_${optionName}`,
            defaultValue);
    }

    /**
        @deprecated Migrate to ezApi.ezclocker.ezSaveEmployeeOption()
        @public
        Saves the provided employee option value
        @param {Number} employerId
        @param {Number} employeeId
        @param {String} optionName
        @param {*} optionValue
        @return {Promise}
     */
    saveEmployeeOption(employerId, employeeId, optionName, optionValue) {
        return EzOptionsService.ezInstance.ezSaveEmployeeOption(
            employerId,
            employeeId,
            optionName,
            optionValue);
    }

    /**
        @public
        Saves the provided employee option value
        @param {Number} employerId
        @param {Number} employeeId
        @param {String} optionName
        @param {*} optionValue
        @return {Promise}
     */
    ezSaveEmployeeOption(employerId, employeeId, optionName, optionValue) {
        const self = EzOptionsService.ezInstance;

        if (!ezApi.ezIsNumber(employerId)) {
            throw new EzBadParamException(
                'employerId',
                self,
                self.ezSaveEmployeeOption);
        }
        if (!ezApi.ezIsNumber(employeeId)) {
            throw new EzBadParamException(
                'employeeId',
                self,
                self.ezSaveEmployeeOption);
        }
        if (!ezApi.ezStringHasLength(optionName)) {
            throw new EzBadParamException(
                'optionName',
                self,
                self.ezSaveEmployeeOption);
        }

        optionValue = ezApi.ezIsValid(optionValue)
            ? optionValue
            : null;

        return self.ezPersistEmployerOption(
            employerId,
            `${employeeId}_${optionName}`,
            optionValue);
    }

    /**
        @protected
        Determiens if the current user is a manager, employee, or personal account and if so prepends the account id
        to the provided aOptionKey. Otherwise, the aOptionKey is returned as provided.
        @param {String} aOptionKey
        @returns {String}
     */
    ezPrependAccountIdToOptionKey(ezClockerAccountType, aAccountId, aOptionKey) {
        const self = EzOptionsService.ezInstance;

        if (!ezApi.ezStringHasLength(ezClockerAccountType)) {
            throw new EzBadParamException(
                'ezClockerAccountType',
                self,
                self.ezPrependAccountIdToOptionKey);
        }
        if (!ezApi.ezStringHasLength(aOptionKey)) {
            throw new EzBadParamException(
                'aOptionKey',
                self,
                self.ezPrependAccountIdToOptionKey);
        }

        if (EzClockerAccountType.PAYROLL_MANAGER === ezClockerAccountType ||
            EzClockerAccountType.PAYROLL_MANAGER_AS_EMPLOYER === ezClockerAccountType ||
            EzClockerAccountType.MANAGER === ezClockerAccountType ||
            EzClockerAccountType.MANAGER_AS_EMPLOYER === ezClockerAccountType ||
            EzClockerAccountType.EMPLOYEE === ezClockerAccountType ||
            EzClockerAccountType.PERSONAL === ezClockerAccountType) {

            if (!ezApi.ezIsNumber(aAccountId)) {
                throw new EzBadParamException(
                    'aAccountId',
                    self,
                    self.ezPrependAccountIdToOptionKey);
            }

            return `${aAccountId.toString()}_${aOptionKey}`;
        }

        return aOptionKey;
    }

    /**
        [READY]
        [Active Account]
        @public
        Returns the option key name to use for a given option name. Some accounts support two different sets
        of options (manager account as the prime example) and need to swtich sets in on the employer dashboard vs
        an employee dashboard.
        @param {String} aOptionName
        @returns {String}
    */
    ezGetActiveAccountOptionKeyNameForAccountType(ezClockerAccountType, aOptionName) {
        const self = EzOptionsService.ezInstance;

        if (!ezApi.ezStringHasLength(ezClockerAccountType)) {
            throw new EzBadParamException(
                'ezClockerAccountType',
                self,
                self.ezGetActiveAccountOptionKeyNameForAccountType);
        }
        if (!ezApi.ezStringHasLength(aOptionName)) {
            throw new EzBadParamException(
                'aOptionName',
                self,
                self.ezGetActiveAccountOptionKeyNameForAccountType);
        }

        switch (ezClockerAccountType) {
            case EzClockerAccountType.EMPLOYER:
                return EzEmployerOption.ezToEmployerOption(aOptionName);
            case EzClockerAccountType.PAYROLL_MANAGER_AS_EMPLOYER:
                return EzEmployerOption.ezToPayrollManagerAsEmployerOption(aOptionName);
            case EzClockerAccountType.PAYROLL_MANAGER:
                return EzEmployerOption.ezToPayrollManagerOption(aOptionName);
            case EzClockerAccountType.MANAGER_AS_EMPLOYER:
                return EzEmployerOption.ezToManagerAsEmployerOption(aOptionName);
            case EzClockerAccountType.MANAGER:
                return EzEmployerOption.ezToManagerOption(aOptionName);
            case EzClockerAccountType.EMPLOYEE:
                return EzEmployerOption.ezToEmployeeOption(aOptionName);
            case EzClockerAccountType.PERSONAL:
                return EzEmployerOption.ezToPersonalOption(aOptionName);
            default:
                return aOptionName;
        }
    }
}

export {
    EzOptionsService
};
