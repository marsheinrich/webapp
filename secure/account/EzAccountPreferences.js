import {
    EzException,
    EzBadParamException
} from '/ezlibrary/exceptions/EzExceptions.js';

import {
    EzObject,
    EzBoolean,
    EzNumber,
    EzString,
    EzHtml,
    EzPromise
} from '/ezlibrary/helpers/EzHelpers.js';

import {
    EzRegistrationState,
    EzInstanceState,
    EzElementEventName,
    EzClockerContextEventName
} from '/ezlibrary/enums/EzEnumerations.js';

import { EzEmployerOption } from '/ezlibrary/EzEmployerOption.js';

import { EzClass } from '/ezlibrary/EzClass.js';

import { EzDateTime } from '/public/javascript/common/ez-date-time.js';

import { EzFeatureToggles } from '/ezlibrary/ez-feature-toggles2.js';

import { EzClockerContext } from '/ezlibrary/EzClockerContext/ez-context.js';


/**
 * @class
 * @extends {EzClass}
 * @description
 * Implementation of employer preferences options for the Account view/page
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 * Import with:
 *     import { EzAccountPreferences } from '/secure/account/EzAccountPreferences.js';
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 * Singleton instance ready for use when the below evaluates to true:
 *     globalThis.ezApi.ezclocker[EzAccountPreferences.ezApiName] &&
 *     globalThis.ezApi.ezclocker[EzAccountPreferences.ezApiName].ready &&
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 * Listen to onReady event:
 *     document.addEventListener(
 *         EzAccountPreferences.ezEventNames.onReady,
 *         this.#ezRegistrator);
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 * Singleton Instance Reference:
 *     ezApi.ezclocker.ezAccountPreferences
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 */
export class EzAccountPreferences extends EzClass {
    /**
     * @public @field
     * Stores if the Over time option checkbox is disabled or not.
     * @type {boolean}
     */
    ezOvertimeDisabled = true;

    /**
     * @public @field
     * Stores if the Over time option's after hours input is disabled or not.
     * @type {boolean}
     */
    ezOvertimeAfterHoursDisabled = true;

    /**
     * @public @field
     * Stores if the daily overtime option checkbox is disabled or not
     * @type {boolean}
     */
    ezDailyOvertimeDisabled = true;

    /**
     * @public @field
     * Stores if the daily over time option's after hours input is disabled or not.
     * @type {boolean}
     */
    ezDailyOvertimeAfterHoursDisabled = true;

    /**
     * @public @field
     * Stores if the Daily double time feature is enabled or not.
     * TODO: This feature is not yet fully implemented and is therfore disabled by default.
     * @type {boolean}
     */
    // TODO: Finish doube time feature
    #ezEnableDailyDoubleTimeFeature = false;
    get ezEnableDailyDoubleTimeFeature() {
        return this.#ezEnableDailyDoubleTimeFeature;
    }
    set ezEnableDailyDoubleTimeFeature(ezEnableDailyDoubleTimeFeature) {
        this.#ezEnableDailyDoubleTimeFeature = ezApi.ezIsTrue(ezEnableDailyDoubleTimeFeature);
    }

    /**
     * @public @field
     * Stores if the daily double overtime option checkbox is disabled or not
     * TODO: This feature is not yet fully implemented and is therfore disabled by default.
     * @type {boolean}
     */
    // TODO: Finish daily doube time feature
    ezDailyDoubleTimeDisabled = true;

    /**
     * @public @field
     * Stores if the daily double time after hours input is disabled or not
     * TODO: This feature is not yet fully implemented and is therfore disabled by default.
     * @type {boolean}
     */
    // TODO: Finish daily doube time feature
    ezDailyDoubleTimeAfterHoursDisabled = true;

    /**
     * @pprivate @field
     * Stores the preferred timezone option's value
     * @type {string}
     */
    #ezPreferredTimeZoneOptionValue = null;
    /**
     * @public @property @getter
     * Gets the preferred timezone option's value
     * @returns {string}
     */
    get ezPreferredTimeZoneOptionValue() {
        return this.#ezPreferredTimeZoneOptionValue;
    }
    /**
     * @public @property @setter
     * Sets the preferred timezone option's value
     * @param {string} ezPreferredTimeZoneOptionValue
     */
    set ezPreferredTimeZoneOptionValue(ezPreferredTimeZoneOptionValue) {
        ezPreferredTimeZoneOptionValue = EzString.stringOrDefault(
            ezPreferredTimeZoneOptionValue,
            ezApi.ezclocker.ezDateTime.ezGuessLocalTimeZone());

        if (this.#ezPreferredTimeZoneOptionValue !== ezPreferredTimeZoneOptionValue) {
            this.#ezPreferredTimeZoneOptionValue = ezPreferredTimeZoneOptionValue;

            ezApi.ezclocker.ezDateTime.activeTimeZone = EzAccountPreferences.ezInstance.ezPreferredTimeZoneOptionValue;

            ezApi.ezclocker.ezEventEngine.ezTriggerEvent(
                EzAccountPreferences.ezEventNames.onPreferredTimeZoneChanged,
                ezApi.ezclocker.ezEventEngine.ezBuildEventData(
                    EzAccountPreferences.ezApiName,
                    "Preferred time zone option value changed",
                    this.ezPreferredTimeZoneOptionValue));
        }
    }

    /**
     * @public @method
     * Initializes EzAccountPreferences
     * @returns {EzAccountPreferences}
     */
    ezInit() {
        if (null == EzAccountPreferences.ezInstance) {
            let className = 'EzTimeEntryService';

            throw new EzException(
                EzString.em`
                    Do not call ${className}.ezInit() directly unless you have first assigned
                    ${className}.ezInstance equal to the ${className} instance in use.
                    Calls to ${className}.ezInit() should really only get made during the registration with ezApi.`);
        }

        if (EzAccountPreferences.ezInstance.ezStates.includes(EzInstanceState.INITIALIZED)) {
            let className = 'EzTimeEntryService';

            // Already initialized
            ezApi.ezclocker.ezLogger.warn(
                EzString.msg`
                    ${className} is already initialized.
                    Verify ${className} is only registered once with ezApi.
                    Verify ${className}.ezInit() is only called once duriong initialization/registration.
                    Do not create a local instance of ${className} and always use the
                    ezApi.ezclocker.${EzAccountPreferences.ezApiName} or ${className}.ezInstance
                    references - both point to the same instance.`);
            return;
        }

        ezApi.ezclocker.ezEventEngine.ezRegisterEvent(
            EzAccountPreferences.ezApiName,
            EzAccountPreferences.ezEventNames.onPreferredTimeZoneChanged);

        ezApi.ezclocker.ezEventEngine.ezWantEvent(
            EzAccountPreferences.ezEventNames.onPreferredTimeZoneChanged,
            EzAccountPreferences.ezApiName,
            EzAccountPreferences.ezInstance.ezHandlePreferredTimeZoneChanged);

        // Register want events
        ezApi.ezclocker.ezEventEngine.ezWantEvent(
            EzFeatureToggles.ezEventNames.onFeatureTogglesApplied,
            EzAccountPreferences.ezApiName,
            EzAccountPreferences.ezInstance.ezInitUX,
            true);

        ezApi.ezclocker.ezEventEngine.ezWantEvent(
            EzClockerContextEventName.onSelectedEmployerAccountReady,
            EzAccountPreferences.ezApiName,
            EzAccountPreferences.ezInstance.ezHandleOnSelectedEmployerAccountReadyChanged,
            true);

        ezApi.ezclocker.ezEventEngine.ezWantEvent(
            EzClockerContextEventName.onSelectedEmployerAccountChanged,
            EzAccountPreferences.ezApiName,
            EzAccountPreferences.ezInstance.ezHandleOnSelectedEmployerAccountReadyChanged,
            true);

        ezApi.ezclocker.ezEventEngine.ezWantEvent(
            EzClockerContextEventName.onSelectedEmployerLicenseReady,
            EzAccountPreferences.ezApiName,
            EzAccountPreferences.ezInstance.ezHandleOnSelectedEmployerAccountLicenseReadyUpdated,
            true);

        ezApi.ezclocker.ezEventEngine.ezWantEvent(
            EzClockerContextEventName.onSelectedEmployerLicenseUpdated,
            EzAccountPreferences.ezApiName,
            EzAccountPreferences.ezInstance.ezHandleOnSelectedEmployerAccountLicenseReadyUpdated,
            true);

        ezApi.ezclocker.ezEventEngine.ezWantEvent(
            EzDateTime.ezEventNames.onSupportedTimeZonesReady,
            EzAccountPreferences.ezApiName,
            EzAccountPreferences.ezInstance.ezLoadAvailableTimeZones,
            true);

        ezApi.ezclocker.ezEventEngine.ezWantEvent(
            EzDateTime.ezEventNames.onActiveTimeZoneChanged,
            EzAccountPreferences.ezApiName,
            EzAccountPreferences.ezInstance.ezHandleOnActiveTimeZoneChangedEvent,
            true);

        return EzAccountPreferences.ezInstance;
    }

    /**
     * @public @method
     * Initializes the UX for this view
     */
    ezInitUX() {
        ezApi.ezclocker.ezEventEngine.ezWantElementEvent(
            'EzPageBody',
            EzElementEventName.BEFORE_UNLOAD,
            EzAccountPreferences.ezApiName,
            EzAccountPreferences.ezInstance.ezUpdateOptionsCache);

        // Overtime option preferences controls
        ezApi.ezclocker.ezEventEngine.ezWantElementEvent(
            'EzAccountOptionCalculateOvertime',
            EzElementEventName.CHANGE,
            EzAccountPreferences.ezApiName,
            EzAccountPreferences.ezInstance.ezHandleCalculateOvertimeCheckboxChange);

        ezApi.ezclocker.ezEventEngine.ezWantElementEvent(
            'EzAccountOptionCalculateDailyOvertime',
            EzElementEventName.CHANGE,
            EzAccountPreferences.ezApiName,
            EzAccountPreferences.ezInstance.ezHandleCalculateDailyOvertimeCheckboxChange);

        ezApi.ezclocker.ezEventEngine.ezWantElementEvent(
            'EzAccountOptionCalculateDailyDoubleTime',
            EzElementEventName.CHANGE,
            EzAccountPreferences.ezApiName,
            EzAccountPreferences.ezInstance.ezHandleCalculateDailyDoubleTimeCheckboxChangeEvent);

        // Clock In and Out Preference Controls
        ezApi.ezclocker.ezEventEngine.ezWantElementEvent(
            'EZOPTION_RESTRICT_CLOCK_IN_TO_SCHEDULE',
            EzElementEventName.CHANGE,
            EzAccountPreferences.ezApiName,
            EzAccountPreferences.ezInstance.ezHandleRestrictClockInToScheduleCheckboxChange);

        // Rounding clock in and clock out Preference Controls
        ezApi.ezclocker.ezEventEngine.ezWantElementEvent(
            'EZOPTION_ROUND_CLOCK_IN_CLOCK_OUT',
            EzElementEventName.CHANGE,
            EzAccountPreferences.ezApiName,
            EzAccountPreferences.ezInstance.ezHandleRoundingClockInOutChange);

        // Rounding clock in and clock out Preference Controls
        ezApi.ezclocker.ezEventEngine.ezWantElementEvent(
            'EZOPTION_TIME_OFF_RESTRICT_REQUEST_START_DATE',
            EzElementEventName.CHANGE,
            EzAccountPreferences.ezApiName,
            (ezEvent) => EzAccountPreferences.ezInstance.ezHandleTimeOffRestrictChange(ezEvent, true));

        // Pay period Preference Controls
        ezApi.ezclocker.ezEventEngine.ezWantElementEvent(
            'options_pay_period_select_id',
            EzElementEventName.CHANGE,
            EzAccountPreferences.ezApiName,
            EzAccountPreferences.ezInstance.ezHandlePayPeriodChange);

        // Notify employee before shift starts Preference Controls
        ezApi.ezclocker.ezEventEngine.ezWantElementEvent(
            'EZOPTION_NOTIFY_EMPLOYEE_BEFORE_SHIFT_STARTS_CHECKED',
            EzElementEventName.CHANGE,
            EzAccountPreferences.ezApiName,
            EzAccountPreferences.ezInstance.ezHandleNotifyEmployeeBeforeShiftChange);

        // Breaks Preference Controls
        ezApi.ezclocker.ezEventEngine.ezWantElementEvent(
            'EZOPTION_ALLOW_RECORDING_OF_UNPAID_BREAKS',
            EzElementEventName.CHANGE,
            EzAccountPreferences.ezApiName,
            EzAccountPreferences.ezInstance.ezHandle_EZOPTION_ALLOW_RECORDING_OF_UNPAID_BREAKS);

        ezApi.ezclocker.ezEventEngine.ezWantElementEvent(
            'EZOPTION_ALLOW_AUTOMATIC_BREAKS',
            EzElementEventName.CHANGE,
            EzAccountPreferences.ezApiName,
            EzAccountPreferences.ezInstance.ezHandle_EZOPTION_ALLOW_AUTOMATIC_BREAKS);

        // Save Options Button
        ezApi.ezclocker.ezEventEngine.ezWantElementEvent(
            'EzSavePreferencesOptions',
            EzElementEventName.CLICK,
            EzAccountPreferences.ezApiName,
            EzAccountPreferences.ezInstance.ezUpdateOptionsCache);
    }

    /**
     * @protected @method
     * Handles the EzAccountPreferences onPreferredTimeZoneChanged event
     */
    ezHandlePreferredTimeZoneChanged() {
        // Update the time-zone select box with the new value
        if (ezApi.ezclocker.ezUi.ezElementExists('EZOPTION_EMPLOYER_DASHBOARD_PREFERRED_TIMEZONE')) {
            ezApi.ezclocker.ezUi.ezSetInputValue(
                'EZOPTION_EMPLOYER_DASHBOARD_PREFERRED_TIMEZONE',
                EzAccountPreferences.ezInstance.ezPreferredTimeZoneOptionValue);
        }
    }

    /**
     * @protected @method
     * Handles change event for EZOPTION_ALLOW_AUTOMATIC_BREAKS checkbox
     */
    ezHandle_EZOPTION_ALLOW_AUTOMATIC_BREAKS() {
        if (ezApi.ezclocker.ezUi.ezIsCheckBoxChecked('EZOPTION_ALLOW_AUTOMATIC_BREAKS')) {
            ezApi.ezclocker.ezUi.ezRemoveElementClass(
                'EZOPTION_ALLOW_AUTOMATIC_BREAKS_ConfigContainer',
                'ezDisabledLabel');

            ezApi.ezclocker.ezUi.ezEnableElement('AUTO_BREAK_WORK_MINUTES_OPTION');

            ezApi.ezclocker.ezUi.ezEnableElement('AUTO_BREAK_WORK_HOURS_OPTION');
        } else {
            ezApi.ezclocker.ezUi.ezAddElementClass(
                'EZOPTION_ALLOW_AUTOMATIC_BREAKS_ConfigContainer',
                'ezDisabledLabel');

            ezApi.ezclocker.ezUi.ezDisableElement('AUTO_BREAK_WORK_MINUTES_OPTION');

            ezApi.ezclocker.ezUi.ezDisableElement('AUTO_BREAK_WORK_HOURS_OPTION');
        }
    }

    /**
     * @protected @method
     * Handles the change event for checkbox EZOPTION_ALLOW_RECORDING_OF_UNPAID_BREAKS
     * ezApi.ezclocker.ezUi.ezIsCheckBoxChecked('EZOPTION_ALLOW_AUTOMATIC_BREAKS')
     */
    ezHandle_EZOPTION_ALLOW_RECORDING_OF_UNPAID_BREAKS() {
        // No actions to perform at this time
    }

    /**
     * @protected @method
     * Handles the selected employer account ready/changed events.
     */
    ezHandleOnSelectedEmployerAccountReadyChanged() {
        EzAccountPreferences.ezInstance.ezEnableFeatures();

        ezApi.ezclocker.ezUi.ezShowElement('_DisplayPreferenceMessages');

        EzAccountPreferences.ezInstance.ezReadSelectedEmployerOptions();
    }

    /**
     * @protected @method
     */
    ezHandleRestrictClockInToScheduleCheckboxChange() {
        if (ezApi.ezclocker.ezUi.ezIsCheckBoxChecked('EZOPTION_RESTRICT_CLOCK_IN_TO_SCHEDULE')) {
            ezApi.ezclocker.ezUi.ezEnableElement('EZOPTION_ALLOW_EARLY_CLOCK_AT_MINS_BEFORE_SCHEDULE');

            ezApi.ezclocker.ezUi.ezRemoveElement('EzEarlyClockInNotRestrictedOption');
        } else {
            ezApi.ezclocker.ezUi.ezDisableElement('EZOPTION_ALLOW_EARLY_CLOCK_AT_MINS_BEFORE_SCHEDULE');

            ezApi.ezclocker.ezUi.ezPrependHtml('EZOPTION_ALLOW_EARLY_CLOCK_AT_MINS_BEFORE_SCHEDULE',
                '<option id="EzEarlyClockInNotRestrictedOption" value="-1">Not restricted</option>');

            ezApi.ezclocker.ezUi.ezSetInputValue(
                'EZOPTION_ALLOW_EARLY_CLOCK_AT_MINS_BEFORE_SCHEDULE',
                '-1');
        }
    }

    /**
     * @protected @method
     * Handles the EzAccountOptionCalculateOvertime checkbox change event
     */
    ezHandleCalculateOvertimeCheckboxChange() {
        if (ezApi.ezclocker.ezUi.ezIsCheckBoxChecked('EzAccountOptionCalculateOvertime')) {
            EzAccountPreferences.ezInstance.load_EZOPTION_CALCULATE_WEEKLY_OVERTIME_AFTER_HOURS();
            EzAccountPreferences.ezInstance.load_EZOPTION_CALCULATE_DAILY_OVERTIME();
            EzAccountPreferences.ezInstance.load_EZOPTION_CALCULATE_DAILY_DOUBLE_TIME();
        } else {
            EzAccountPreferences.ezInstance.ezDisableOvertimeAfterHoursOption();
            EzAccountPreferences.ezInstance.ezDisableDailyOvertimeOption();
            EzAccountPreferences.ezInstance.ezDisableDailyDoubleTimeOption();
        }
    }

    /**
     * @protected @method
     * Handles the EzAccountOptionCalculateOvertime checkbox change event
     */
    ezHandleCalculateDailyOvertimeCheckboxChange() {
        if (ezApi.ezclocker.ezUi.ezIsCheckBoxChecked('EzAccountOptionCalculateDailyOvertime')) {
            EzAccountPreferences.ezInstance.ezEnableDailyOvertimeAfterHoursOption();
        } else {
            EzAccountPreferences.ezInstance.ezDisableDailyOvertimeAfterHoursOption();
        }
    }

    /**
     * @protected @method
     * Handles the EzAccountOptionCalculateDailyDoubleTime checkbox change event
     */
    ezHandleCalculateDailyDoubleTimeCheckboxChangeEvent() {
        if (!EzAccountPreferences.ezInstance.ezEnableDailyDoubleTimeFeature) {
            return;
        }

        if (ezApi.ezclocker.ezUi.ezIsCheckBoxChecked('EzAccountOptionCalculateDailyDoubleTime')) {
            EzAccountPreferences.ezInstance.ezEnableDailyDoubleTimeAfterHoursOption();
        } else {
            EzAccountPreferences.ezInstance.ezDisableDailyDoubleTimeAfterHoursOption();
        }
    }

    /**
     * @protected @method
     * Handles the EZOPTION_ROUND_CLOCK_IN_CLOCK_OUT checkbox change event.
     */
    ezHandleRoundingClockInOutChange() {
        if (ezApi.ezclocker.ezUi.ezIsCheckboxChecked('EZOPTION_ROUND_CLOCK_IN_CLOCK_OUT')) {
            ezApi.ezclocker.ezUi.ezEnableElement('EZOPTION_ROUND_CLOCK_IN_CLOCK_OUT_OPTIONS');

            ezApi.ezclocker.ezUi.ezRemoveElement('EzRoundingClockInClockOutNotSelected');

            ezApi.ezclocker.ezUi.ezSetInputValue('EZOPTION_ROUND_CLOCK_IN_CLOCK_OUT_OPTIONS', 'NEAREST_15');
        } else {
            ezApi.ezclocker.ezUi.ezDisableElement('EZOPTION_ROUND_CLOCK_IN_CLOCK_OUT_OPTIONS');

            ezApi.ezclocker.ezUi.ezPrependHtml(
                'EZOPTION_ROUND_CLOCK_IN_CLOCK_OUT_OPTIONS',
                EzHtml.build`
                    <option
                        id="EzRoundingClockInClockOutNotSelected"
                        value="NONE">
                        Not selected
                    </option>`);

            ezApi.ezclocker.ezUi.ezSetInputValue(
                'EZOPTION_ROUND_CLOCK_IN_CLOCK_OUT_OPTIONS',
                'NONE');
        }
    }

    /**
     * @protected @method
     * Handles the EZOPTION_SELECTED_PAY_PERIOD drop down change event.
     */
    ezHandlePayPeriodChange() {
        ezApi.ezclocker.ezUi.ezShowElement('options_pay_period_last_closing_date_section_id');
        const yesterdayDayMoment =
            moment().subtract(1, 'days').tz(ezApi.ezclocker.ezDateTime.activeTimeZone).startOf('day');
        if (ezApi.ezclocker.ezUi.ezGetInputValue('options_pay_period_select_id') !== 'NONE') {
            if (ezApi.ezclocker.ezUi.ezGetInputValue('options_pay_period_select_id') === 'MONTHLY') {
                ezApi.ezclocker.ezUi.ezHideElement('options_pay_period_last_closing_date_section_id');

                ezApi.ezclocker.ezUi.ezSetInputValue('options_pay_period_last_closing_date_id', undefined);
            } else {
                ezApi.ezclocker.ezUi.ezEnableElement('options_pay_period_last_closing_date_id');

                ezApi.ezclocker.ezUi.ezSetInputValue('options_pay_period_last_closing_date_id', yesterdayDayMoment.format('YYYY-MM-DD'));
            }
        } else {
            ezApi.ezclocker.ezUi.ezDisableElement('options_pay_period_last_closing_date_id');

            ezApi.ezclocker.ezUi.ezSetInputValue('options_pay_period_last_closing_date_id', undefined);
        }
    }

    /**
     * @protected @method
     * Handles the EZOPTION_TIME_OFF_RESTRICT_REQUEST_START_DATE checkbox change event.
     */
    ezHandleTimeOffRestrictChange($event, allowTimeOffFeatures = true) {
        if (!allowTimeOffFeatures) {
            ezApi.ezclocker.ezUi.ezDisableElement('EZOPTION_TIME_OFF_RESTRICT_REQUEST_START_DATE');
            ezApi.ezclocker.ezUi.ezDisableElement('EZOPTION_TIME_OFF_MINIMUM_DAYS_IN_FUTURE');
        } else {
            if (!$event) {
                ezApi.ezclocker.ezUi.ezEnableElement('EZOPTION_TIME_OFF_RESTRICT_REQUEST_START_DATE');
                ezApi.ezclocker.ezUi.ezSetCheckboxValue(
                    'EZOPTION_TIME_OFF_RESTRICT_REQUEST_START_DATE',
                    ezApi.ezclocker.ezOptionsService.ezOptionValueToBoolean(
                        ezApi.ezclocker.ezClockerContext.ezReadSelectedEmployerAccountOption(
                            ezApi.ezclocker.ezOptionsService.EZOPTION_TIME_OFF_RESTRICT_REQUEST_START_DATE,
                            EzEmployerOption.EZOPTION_VALUE_FALSE),
                        false));
            }

            if (ezApi.ezclocker.ezUi.ezIsCheckboxChecked('EZOPTION_TIME_OFF_RESTRICT_REQUEST_START_DATE')) {
                ezApi.ezclocker.ezUi.ezEnableElement('EZOPTION_TIME_OFF_MINIMUM_DAYS_IN_FUTURE');

                ezApi.ezclocker.ezUi.ezRemoveElement('EzTimeOffMinimumDaysInFutureNotSelected');

                ezApi.ezclocker.ezUi.ezSetInputValue('EZOPTION_TIME_OFF_MINIMUM_DAYS_IN_FUTURE', '3');
            } else {
                ezApi.ezclocker.ezUi.ezDisableElement('EZOPTION_TIME_OFF_MINIMUM_DAYS_IN_FUTURE');

                ezApi.ezclocker.ezUi.ezPrependHtml(
                    'EZOPTION_TIME_OFF_MINIMUM_DAYS_IN_FUTURE',
                    EzHtml.build`
                    <option
                        id="EzTimeOffMinimumDaysInFutureNotSelected"
                        value="NONE">
                        Not selected
                    </option>`);

                ezApi.ezclocker.ezUi.ezSetInputValue(
                    'EZOPTION_TIME_OFF_MINIMUM_DAYS_IN_FUTURE',
                    'NONE');
            }
        }
    }

    /**
     * @protected @method
     * Handles the EZOPTION_NOTIFY_EMPLOYEE_BEFORE_SHIFT_STARTS_CHECKED checkbox change event.
     */
    ezHandleNotifyEmployeeBeforeShiftChange() {
        if (ezApi.ezclocker.ezUi.ezIsCheckboxChecked('EZOPTION_NOTIFY_EMPLOYEE_BEFORE_SHIFT_STARTS_CHECKED')) {
            ezApi.ezclocker.ezUi.ezEnableElement('EZOPTION_NOTIFY_EMPLOYEE_BEFORE_SHIFT_STARTS');

            ezApi.ezclocker.ezUi.ezRemoveElement('EzNeverRemindEmployees');

            const notifyEmployeeShiftValue = ezApi.ezclocker.ezUi.ezGetInputValue('EZOPTION_NOTIFY_EMPLOYEE_BEFORE_SHIFT_STARTS') || '0';

            if (notifyEmployeeShiftValue === '0') {
                ezApi.ezclocker.ezUi.ezSetInputValue('EZOPTION_NOTIFY_EMPLOYEE_BEFORE_SHIFT_STARTS', '1');
            }
        } else {
            ezApi.ezclocker.ezUi.ezDisableElement('EZOPTION_NOTIFY_EMPLOYEE_BEFORE_SHIFT_STARTS');

            ezApi.ezclocker.ezUi.ezPrependHtml(
                'EZOPTION_NOTIFY_EMPLOYEE_BEFORE_SHIFT_STARTS',
                EzHtml.build`
                    <option
                        id="EzNeverRemindEmployees"
                        value="0">
                        Never
                    </option>`);

            ezApi.ezclocker.ezUi.ezSetInputValue(
                'EZOPTION_NOTIFY_EMPLOYEE_BEFORE_SHIFT_STARTS',
                '0');
        }
    }

    /**
     * @protected @method
     * Handles the AUTO_BREAK_WORK_HOURS_OPTION change event
     */
    handle_AUTO_BREAK_WORK_HOURS_OPTION_BlurEvent() {
        let inputValue = ezApi.ezclocker.ezUi.ezGetTrimInputValue('AUTO_BREAK_WORK_HOURS_OPTION');

        let intValue = EzNumber.strToInt(inputValue);

        if (isNaN(intValue)) {
            intValue = 4;

            ezApi.ezclocker.ezUi.ezSetInputValue(
                'AUTO_BREAK_WORK_HOURS_OPTION',
                intValue.toString());
        } else if (1 > intValue) {
            intValue = 1;

            ezApi.ezclocker.ezUi.ezSetInputValue(
                'AUTO_BREAK_WORK_HOURS_OPTION',
                intValue.toString());
        } else if (24 < intValue) {
            intValue = 24;

            ezApi.ezclocker.ezUi.ezSetInputValue(
                'AUTO_BREAK_WORK_HOURS_OPTION',
                intValue.toString());
        }
    }

    /**
     * @protected @method
     * Handles the AUTO_BREAK_WORK_MINUTES_OPTION change event
     */
    handle_AUTO_BREAK_WORK_MINUTES_OPTION_BlurEvent() {
        let inputValue = ezApi.ezclocker.ezUi.ezGetTrimInputValue('AUTO_BREAK_WORK_MINUTES_OPTION');

        let intValue = EzNumber.strToInt(inputValue);

        if (isNaN(intValue)) {
            intValue = 30;

            ezApi.ezclocker.ezUi.ezSetInputValue(
                'AUTO_BREAK_WORK_MINUTES_OPTION',
                intValue.toString());
        } else if (1 > intValue) {
            intValue = 1;

            ezApi.ezclocker.ezUi.ezSetInputValue(
                'AUTO_BREAK_WORK_MINUTES_OPTION',
                intValue.toString());
        }

        if (30 < intValue) {
            intValue = 30;

            ezApi.ezclocker.ezUi.ezSetInputValue(
                'AUTO_BREAK_WORK_MINUTES_OPTION',
                intValue.toString());
        }
    }

    /**
     * @protected @method
     * Loads the EZOPTION_CALCULATE_OVERTIME_IN_TIME_SHEET_EXPORTS option into the
     * EzAccountOptionCalculateOvertime checkbox.
     * If EZOPTION_CALCULATE_OVERTIME_IN_TIME_SHEET_EXPORTS is:
     *     * True (checked): Will also call the following
     *         EzAccountPreferences.ezInstance.load_EZOPTION_CALCULATE_WEEKLY_OVERTIME_AFTER_HOURS()
     *         EzAccountPreferences.ezInstance.load_EZOPTION_CALCULATE_DAILY_OVERTIME()
     *         EzAccountPreferences.ezInstance.load_EZOPTION_CALCULATE_DAILY_DOUBLE_TIME()
     *     * False (unchecked): Will disable the following
     *         EzAccountPreferences.ezInstance.ezDisableOvertimeAfterHoursOption();
     *         EzAccountPreferences.ezInstance.ezDisableDailyOvertimeOption();
     *         EzAccountPreferences.ezInstance.ezDisableDailyDoubleTimeOption();
     */
    load_EZOPTION_CALCULATE_OVERTIME_IN_TIME_SHEET_EXPORTS() {
        EzAccountPreferences.ezInstance.ezEnableOvertimeOption();

        ezApi.ezclocker.ezUi.ezSetCheckboxValue('EzAccountOptionCalculateOvertime',
            ezApi.ezclocker.ezOptionsService.ezOptionValueToBoolean(
                ezApi.ezclocker.ezClockerContext.ezReadSelectedEmployerAccountOption(
                    ezApi.ezclocker.ezOptionsService.EZOPTION_CALCULATE_OVERTIME_IN_TIME_SHEET_EXPORTS,
                    EzEmployerOption.EZOPTION_VALUE_FALSE),
                false));

        if (ezApi.ezclocker.ezUi.ezIsCheckBoxChecked('EzAccountOptionCalculateOvertime')) {
            // Enable overtime after hours option
            EzAccountPreferences.ezInstance.load_EZOPTION_CALCULATE_WEEKLY_OVERTIME_AFTER_HOURS();

            // Enable daily overtime option
            // The below loader will also load the after hours if needed.
            EzAccountPreferences.ezInstance.load_EZOPTION_CALCULATE_DAILY_OVERTIME();

            // Enable the daily double time option
            // The below loader will also load the after hours if needed.
            EzAccountPreferences.ezInstance.load_EZOPTION_CALCULATE_DAILY_DOUBLE_TIME();
        } else {
            EzAccountPreferences.ezInstance.ezDisableOvertimeAfterHoursOption();
            EzAccountPreferences.ezInstance.ezDisableDailyOvertimeOption();
            EzAccountPreferences.ezInstance.ezDisableDailyDoubleTimeOption();
        }
    }

    /**
     * @protected @method
     * Loads the EZOPTION_CALCULATE_WEEKLY_OVERTIME_AFTER_HOURS value into the
     * EzAccountOptionCalcOverTimeAfter input.
     */
    load_EZOPTION_CALCULATE_WEEKLY_OVERTIME_AFTER_HOURS() {
        EzAccountPreferences.ezInstance.ezEnableOvertimeAfterHoursOption();

        ezApi.ezclocker.ezUi.ezSetInputValue(
            'EzAccountOptionCalcOverTimeAfter',
            ezApi.ezclocker.ezOptionsService.ezOptionValueToNumber(
                ezApi.ezclocker.ezClockerContext.ezReadSelectedEmployerAccountOption(
                    ezApi.ezclocker.ezOptionsService.EZOPTION_CALCULATE_WEEKLY_OVERTIME_AFTER_HOURS,
                    '40'),
                40));
    }

    /**
     * @protected @method
     * Loads the EZOPTION_CALCULATE_DAILY_OVERTIME option into the
     * EzAccountOptionCalculateDailyOvertime input box.
     * If the EZOPTION_CALCULATE_DAILY_OVERTIME is:
     *     * True (checked): Will also call EzAccountPreferences.ezInstance.load_EZOPTION_CALCULATE_DAILY_OVERTIME_AFTER_HOURS()
     *     * False (unchecked): Will disable the daily overtime after hours input.
     */
    load_EZOPTION_CALCULATE_DAILY_OVERTIME() {
        EzAccountPreferences.ezInstance.ezEnableDailyOvertimeOption();

        ezApi.ezclocker.ezUi.ezSetCheckboxValue('EzAccountOptionCalculateDailyOvertime',
            ezApi.ezclocker.ezOptionsService.ezOptionValueToBoolean(
                ezApi.ezclocker.ezClockerContext.ezReadSelectedEmployerAccountOption(
                    ezApi.ezclocker.ezOptionsService.EZOPTION_CALCULATE_DAILY_OVERTIME,
                    EzEmployerOption.EZOPTION_VALUE_FALSE),
                false));

        if (ezApi.ezclocker.ezUi.ezIsCheckBoxChecked('EzAccountOptionCalculateDailyOvertime')) {
            EzAccountPreferences.ezInstance.load_EZOPTION_CALCULATE_DAILY_OVERTIME_AFTER_HOURS();
        } else {
            EzAccountPreferences.ezInstance.ezDisableDailyOvertimeAfterHoursOption();
        }
    }

    /**
     * @protected @method
     * Loads the EZOPTION_CALCULATE_DAILY_OVERTIME_AFTER_HOURS option into the
     * EzAccountOptionCalcDailyOverTimeAfter input box.
     */
    load_EZOPTION_CALCULATE_DAILY_OVERTIME_AFTER_HOURS() {
        EzAccountPreferences.ezInstance.ezEnableDailyOvertimeAfterHoursOption();

        ezApi.ezclocker.ezUi.ezSetInputValue(
            'EzAccountOptionCalcDailyOverTimeAfter',
            ezApi.ezclocker.ezOptionsService.ezOptionValueToNumber(
                ezApi.ezclocker.ezClockerContext.ezReadSelectedEmployerAccountOption(
                    ezApi.ezclocker.ezOptionsService.EZOPTION_CALCULATE_DAILY_OVERTIME_AFTER_HOURS,
                    '8'),
                8));
    }


    /**
     * @protected @method
     * Loads the EZOPTION_CALCULATE_DAILY_DOUBLE_TIME option into the UX
     * Sets the EzAccountOptionCalculateDailyDoubleTime checkbox.
     * If the EZOPTION_CALCULATE_DAILY_DOUBLE_TIME is:
     *     * True (checked): Will also call EzAccountPreferences.ezInstance.load_EZOPTION_CALCULATE_DAILY_DOUBLE_TIME_AFTER_HOURS()
     *     * False (unchecked): Will disable the daily doube time after hours input.
     */
    load_EZOPTION_CALCULATE_DAILY_DOUBLE_TIME() {
        if (!EzAccountPreferences.ezInstance.ezEnableDailyDoubleTimeFeature) {
            // Feature is disable, no need to load
            return;
        }

        EzAccountPreferences.ezInstance.ezEnableDailyDoubleTimeOption();

        ezApi.ezclocker.ezUi.ezSetCheckboxValue(
            'EzAccountOptionCalculateDailyDoubleTime',
            ezApi.ezclocker.ezOptionsService.ezOptionValueToBoolean(
                ezApi.ezclocker.ezClockerContext.ezReadSelectedEmployerAccountOption(
                    ezApi.ezclocker.ezOptionsService.EZOPTION_CALCULATE_DAILY_DOUBLE_TIME,
                    EzEmployerOption.EZOPTION_VALUE_FALSE),
                false));

        if (ezApi.ezclocker.ezUi.ezIsCheckBoxChecked('EzAccountOptionCalculateDailyDoubleTime')) {
            EzAccountPreferences.ezInstance.load_EZOPTION_CALCULATE_DAILY_DOUBLE_TIME_AFTER_HOURS();
        } else {
            EzAccountPreferences.ezInstance.ezDisableDailyDoubleTimeAfterHoursOption();
        }
    }


    /**
     * @protected @method
     * Saves the EZOPTION_EMPLOYER_SCHEDULE_START_DAY option.
     */
    saveEZOPTION_EMPLOYER_SCHEDULE_START_DAY() {
        let inputValue = ezApi.ezclocker.ezUi.ezGetTrimInputValue('options_schedule_day');

        return ezApi.ezclocker.ezClockerContext.ezSaveSelectedEmployerOption(
            ezApi.ezclocker.ezOptionsService.EZOPTION_EMPLOYER_SCHEDULE_START_DAY,
            ezApi.ezIsNotEmptyString(inputValue)
                ? inputValue
                : '0');
    }

    /**
     * @protected @method
     * Saves the EZOPTION_SELECTED_PAY_PERIOD option.
     */
    saveEZOPTION_SELECTED_PAY_PERIOD() {
        let inputValue = ezApi.ezclocker.ezUi.ezGetTrimInputValue('options_pay_period_select_id');

        return ezApi.ezclocker.ezClockerContext.ezSaveSelectedEmployerOption(
            ezApi.ezclocker.ezOptionsService.EZOPTION_SELECTED_PAY_PERIOD,
            ezApi.ezIsNotEmptyString(inputValue)
                ? inputValue
                : 'NONE');
    }

    /**
     * @protected @method
     * Saves the EZOPTION_PAY_PERIOD_LAST_CLOSING_DATE option.
     */
    saveEZOPTION_PAY_PERIOD_LAST_CLOSING_DATE() {
        let inputValue = ezApi.ezclocker.ezUi.ezGetTrimInputValue('options_pay_period_last_closing_date_id');

        let inputValueMoment = moment(inputValue).tz(ezApi.ezclocker.ezDateTime.activeTimeZone).startOf('day');

        const yesterdayDayMoment = moment().subtract(1, 'days').tz(ezApi.ezclocker.ezDateTime.activeTimeZone).startOf('day');

        if (ezApi.ezIsNotEmptyString(inputValue)) {
            if ((inputValueMoment.isValid() === false) || inputValueMoment.diff(yesterdayDayMoment) > 0) {
                ezApi.ezclocker.ezUi.ezId('options_pay_period_last_closing_date_id').val(
                    yesterdayDayMoment.format('YYYY-MM-DD')
                );
                inputValueMoment = yesterdayDayMoment;
            }

            return ezApi.ezclocker.ezClockerContext.ezSaveSelectedEmployerOption(
                ezApi.ezclocker.ezOptionsService.EZOPTION_PAY_PERIOD_LAST_CLOSING_DATE,
                ezApi.ezclocker.ezDateTime.ezToIso(inputValueMoment, 'UTC')
            );
        } else {
            return Promise.resolve();
        }
    }

    /**
     * @protected @method
     * Saves the EZOPTION_CALCULATE_DAILY_DOUBLE_TIME option.
     */
    saveEZOPTION_CALCULATE_DAILY_DOUBLE_TIME() {
        if (!EzAccountPreferences.ezInstance.ezEnableDailyDoubleTimeFeature) {
            return;
        }

        return ezApi.ezclocker.ezClockerContext.ezSaveSelectedEmployerOption(
            ezApi.ezclocker.ezOptionsService.EZOPTION_CALCULATE_DAILY_DOUBLE_TIME,
            ezApi.ezclocker.ezUi.ezIsCheckBoxChecked('EzAccountOptionCalculateDailyDoubleTime')
                ? '1'
                : '0');
    }

    /**
     * @protected @method
     * Loads the EZOPTION_CALCULATE_DAILY_DOUBLE_TIME_AFTER_HOURS option into the UX
     * Sets the EzAccountOptionCalculateDailyDoubleTimeAfterHours input value
     */
    load_EZOPTION_CALCULATE_DAILY_DOUBLE_TIME_AFTER_HOURS() {
        if (!EzAccountPreferences.ezInstance.ezEnableDailyDoubleTimeFeature) {
            // Feature is disable, no need to load
            return;
        }

        EzAccountPreferences.ezInstance.ezEnableDailyDoubleTimeAfterHoursOption();

        ezApi.ezclocker.ezUI.ezSetInputValue(
            'EzAccountOptionCalcDailyOverTimeAfter',
            ezApi.ezclocker.ezOptionsService.ezOptionValueToNumber(
                ezApi.ezclocker.ezClockerContext.ezReadSelectedEmployerAccountOption(
                    EzEmployerOption.EZOPTION_CALCULATE_DAILY_DOUBLE_TIME_AFTER_HOURS,
                    "12").toString(),
                12));
    }

    /**
     * @protected @method
     * Saves the EZOPTION_CALCULATE_DAILY_OVERTIME option.
     */
    saveEZOPTION_CALCULATE_DAILY_OVERTIME() {
        // Daily overtime
        return ezApi.ezclocker.ezClockerContext.ezSaveSelectedEmployerOption(
            ezApi.ezclocker.ezOptionsService.EZOPTION_CALCULATE_DAILY_OVERTIME,
            ezApi.ezclocker.ezUi.ezIsCheckBoxChecked('EzAccountOptionCalculateDailyOvertime')
                ? '1'
                : '0');

    }

    /**
     * @protected @method
     * Saves the EZOPTION_CALCULATE_DAILY_OVERTIME option.
     */
    saveEZOPTION_CALCULATE_DAILY_OVERTIME_AFTER_HOURS() {
        let inputValue = ezApi.ezclocker.ezUi.ezGetTrimInputValue('EzAccountOptionCalcDailyOverTimeAfter');

        return ezApi.ezclocker.ezClockerContext.ezSaveSelectedEmployerOption(
            ezApi.ezclocker.ezOptionsService.EZOPTION_CALCULATE_DAILY_OVERTIME_AFTER_HOURS,
            ezApi.ezIsNotEmptyString(inputValue)
                ? inputValue
                : '8');
    }

    /**
     * @protected @method
     * Saves the EZOPTION_CALCULATE_OVERTIME_IN_TIME_SHEET_EXPORTS option.
     */
    saveEZOPTION_CALCULATE_OVERTIME_IN_TIME_SHEET_EXPORTS() {
        // Weekly overtime
        return ezApi.ezclocker.ezClockerContext.ezSaveSelectedEmployerOption(
            ezApi.ezclocker.ezOptionsService.EZOPTION_CALCULATE_OVERTIME_IN_TIME_SHEET_EXPORTS,
            ezApi.ezclocker.ezUi.ezIsCheckBoxChecked('EzAccountOptionCalculateOvertime')
                ? '1'
                : '0');
    }

    /**
     * @protected @method
     * Saves the EZOPTION_CALCULATE_WEEKLY_OVERTIME_AFTER_HOURS option.
     */
    saveEZOPTION_CALCULATE_WEEKLY_OVERTIME_AFTER_HOURS() {
        let inputValue = ezApi.ezclocker.ezUi.ezGetTrimInputValue('EzAccountOptionCalcOverTimeAfter');

        return ezApi.ezclocker.ezClockerContext.ezSaveSelectedEmployerOption(
            ezApi.ezclocker.ezOptionsService.EZOPTION_CALCULATE_WEEKLY_OVERTIME_AFTER_HOURS,
            ezApi.ezIsNotEmptyString(inputValue)
                ? inputValue
                : '40');
    }

    /**
     * @protected @method
     * Saves the EZOPTION_ALLOW_EMPLOYEES_TO_SEE_COWORKER_SCHEDULES
     */
    saveEZOPTION_ALLOW_EMPLOYEES_TO_SEE_COWORKER_SCHEDULES() {
        return ezApi.ezclocker.ezClockerContext.ezSaveSelectedEmployerOption(
            ezApi.ezclocker.ezOptionsService.EZOPTION_ALLOW_EMPLOYEES_TO_SEE_COWORKER_SCHEDULES,
            ezApi.ezclocker.ezUi.ezIsCheckBoxChecked(
                EzEmployerOption.ezToInputId(EzEmployerOption.EZOPTION_ALLOW_EMPLOYEES_TO_SEE_COWORKER_SCHEDULES))
                ? '1'
                : '0');
    }

    /**
     * @protected @method
     * Saves the EZOPTION_ALLOW_TIME_OFF_REQUESTS
     */
    saveEZOPTION_ALLOW_TIME_OFF_REQUESTS() {
        return ezApi.ezclocker.ezClockerContext.ezSaveSelectedEmployerOption(
            EzEmployerOption.EZOPTION_ALLOW_TIME_OFF_REQUESTS,
            ezApi.ezclocker.ezUi.ezIsCheckBoxChecked(EzEmployerOption.ezToInputId(EzEmployerOption.EZOPTION_ALLOW_TIME_OFF_REQUESTS))
                ? '1'
                : '0');
    }

    /**
     * @protected @method
     * Saves the EZOPTION_ALLOW_EARLY_CLOCK_AT_MINS_BEFORE_SCHEDULE option.
     */
    saveEZOPTION_ALLOW_EARLY_CLOCK_AT_MINS_BEFORE_SCHEDULE() {
        let inputValue = ezApi.ezclocker.ezUi.ezGetTrimInputValue('EZOPTION_ALLOW_EARLY_CLOCK_AT_MINS_BEFORE_SCHEDULE');

        return ezApi.ezclocker.ezClockerContext.ezSaveSelectedEmployerOption(
            ezApi.ezclocker.ezOptionsService.EZOPTION_ALLOW_EARLY_CLOCK_AT_MINS_BEFORE_SCHEDULE,
            EzString.stringHasLength(inputValue)
                ? inputValue
                : '0');
    }

    /**
     * @protected @method
     * Saves the EZOPTION_ROUND_CLOCK_IN_CLOCK_OUT_OPTIONS option.
     */
    saveEZOPTION_ROUND_CLOCK_IN_CLOCK_OUT_OPTIONS() {
        let inputValue = ezApi.ezclocker.ezUi.ezGetTrimInputValue('EZOPTION_ROUND_CLOCK_IN_CLOCK_OUT_OPTIONS');

        return ezApi.ezclocker.ezClockerContext.ezSaveSelectedEmployerOption(
            ezApi.ezclocker.ezOptionsService.EZOPTION_ROUND_CLOCK_IN_CLOCK_OUT_OPTIONS,
            EzString.stringHasLength(inputValue)
                ? inputValue
                : 'NONE');
    }

    /**
     * @protected @method
     * Saves the EZOPTION_TIME_OFF_MINIMUM_DAYS_IN_FUTURE option.
     */
    saveEZOPTION_TIME_OFF_MINIMUM_DAYS_IN_FUTURE() {
        let inputValue = ezApi.ezclocker.ezUi.ezGetTrimInputValue('EZOPTION_TIME_OFF_MINIMUM_DAYS_IN_FUTURE');

        return ezApi.ezclocker.ezClockerContext.ezSaveSelectedEmployerOption(
            ezApi.ezclocker.ezOptionsService.EZOPTION_TIME_OFF_MINIMUM_DAYS_IN_FUTURE,
            EzString.stringHasLength(inputValue)
                ? inputValue
                : 'NONE');
    }

    /**
     * @protected @method
     * Saves the EZOPTION_NOTIFY_EMPLOYEE_BEFORE_SHIFT_STARTS option.
     */
    saveEZOPTION_NOTIFY_EMPLOYEE_BEFORE_SHIFT_STARTS() {
        let inputValue = ezApi.ezclocker.ezUi.ezGetTrimInputValue('EZOPTION_NOTIFY_EMPLOYEE_BEFORE_SHIFT_STARTS');

        return ezApi.ezclocker.ezClockerContext.ezSaveSelectedEmployerOption(
            ezApi.ezclocker.ezOptionsService.EZOPTION_NOTIFY_EMPLOYEE_BEFORE_SHIFT_STARTS,
            EzString.stringHasLength(inputValue)
                ? inputValue
                : '0');
    }

    /**
     * @protected @method
     * Saves the EZOPTION_RESTRICT_CLOCK_IN_TO_SCHEDULE option.
     */
    saveEZOPTION_RESTRICT_CLOCK_IN_TO_SCHEDULE() {
        // Restrict Early Clock In
        return ezApi.ezclocker.ezClockerContext.ezSaveSelectedEmployerOption(
            ezApi.ezclocker.ezOptionsService.EZOPTION_RESTRICT_CLOCK_IN_TO_SCHEDULE,
            ezApi.ezclocker.ezUi.ezIsCheckBoxChecked('EZOPTION_RESTRICT_CLOCK_IN_TO_SCHEDULE')
                ? '1'
                : '0');
    }

    /**
     * @protected @method
     * Saves the EZOPTION_ROUND_CLOCK_IN_CLOCK_OUT option.
     */
    saveEZOPTION_ROUND_CLOCK_IN_CLOCK_OUT() {
        return ezApi.ezclocker.ezClockerContext.ezSaveSelectedEmployerOption(
            ezApi.ezclocker.ezOptionsService.EZOPTION_ROUND_CLOCK_IN_CLOCK_OUT,
            ezApi.ezclocker.ezUi.ezIsCheckBoxChecked('EZOPTION_ROUND_CLOCK_IN_CLOCK_OUT')
                ? '1'
                : '0');
    }

    /**
     * @protected @method
     * Saves the EZOPTION_TIME_OFF_RESTRICT_REQUEST_START_DATE option.
     */
    saveEZOPTION_TIME_OFF_RESTRICT_REQUEST_START_DATE() {
        return ezApi.ezclocker.ezClockerContext.ezSaveSelectedEmployerOption(
            ezApi.ezclocker.ezOptionsService.EZOPTION_TIME_OFF_RESTRICT_REQUEST_START_DATE,
            ezApi.ezclocker.ezUi.ezIsCheckBoxChecked('EZOPTION_TIME_OFF_RESTRICT_REQUEST_START_DATE')
                ? '1'
                : '0');
    }

    /**
     * @protected @method
     * Saves the EZOPTION_PREFERRED_TIMEZONE option.
     */
    saveEZOPTION_PREFERRED_TIMEZONE() {
        let inputValue = ezApi.ezclocker.ezUi.ezGetInputValue('EZOPTION_EMPLOYER_DASHBOARD_PREFERRED_TIMEZONE');

        return ezApi.ezclocker.ezClockerContext.ezSaveActiveEmployerOption(
            ezApi.ezclocker.ezOptionsService.EZOPTION_PREFERRED_TIMEZONE,
            inputValue);
    }

    /**
     * @protected @method
     * Saves the EZOPTION_NOTIFY_EMPLOYEE_MISSED_CLOCK_IN_CLOCK_OUT option.
     */
    saveEZOPTION_NOTIFY_EMPLOYEE_MISSED_CLOCK_IN_CLOCK_OUT() {
        let inputValue = ezApi.ezclocker.ezUi.ezGetTrimInputValue('EZOPTION_NOTIFY_EMPLOYEE_MISSED_CLOCK_IN_CLOCK_OUT');

        return EzPromise.asyncAction(
            (finished) => {
                ezApi.ezclocker.ezClockerContext.ezSaveSelectedEmployerOption(
                    ezApi.ezclocker.ezOptionsService.EZOPTION_NOTIFY_EMPLOYEE_MISSED_CLOCK_IN_CLOCK_OUT,
                    EzString.stringHasLength(inputValue)
                        ? inputValue
                        : '0')
                    .then(finished);
            });
    }

    /**
     * @protected @method
     * Saves the EZOPTION_NOTIFY_EMPLOYER_EMPLOYEE_MISSED_CLOCK_IN_CLOCK_OUT option.
     */
    saveEZOPTION_NOTIFY_EMPLOYER_EMPLOYEE_MISSED_CLOCK_IN_CLOCK_OUT() {
        let inputValue = ezApi.ezclocker.ezUi.ezGetTrimInputValue('EZOPTION_NOTIFY_EMPLOYER_EMPLOYEE_MISSED_CLOCK_IN_CLOCK_OUT');

        return ezApi.ezResolver(
            (resolve) => {
                ezApi.ezclocker.ezClockerContext.ezSaveSelectedEmployerOption(
                    ezApi.ezclocker.ezOptionsService.EZOPTION_NOTIFY_EMPLOYER_EMPLOYEE_MISSED_CLOCK_IN_CLOCK_OUT,
                    EzString.stringHasLength(inputValue)
                        ? inputValue
                        : '0')
                    .then(
                        (response) => {
                            return resolve(response);
                        });
            });
    }

    /**
     * @protected @method
     * Saves the EZOPTION_NOTIFY_EMPLOYEE_BEFORE_SHIFT_STARTS option.
     */
    saveEZOPTION_NOTIFY_EMPLOYEE_BEFORE_SHIFT_STARTS() {
        let inputValue = ezApi.ezclocker.ezUi.ezGetTrimInputValue('EZOPTION_NOTIFY_EMPLOYEE_BEFORE_SHIFT_STARTS');

        return ezApi.ezResolver((resolve) => {
            ezApi.ezclocker.ezClockerContext.ezSaveSelectedEmployerOption(
                ezApi.ezclocker.ezOptionsService.EZOPTION_NOTIFY_EMPLOYEE_BEFORE_SHIFT_STARTS,
                EzString.stringHasLength(inputValue)
                    ? inputValue
                    : '0')
                .then((response) => {
                    return resolve(response);
                });
        });
    }

    /**
     * @protected @method
     * Saves the EZOPTION_REQUIRE_LOCATION_FOR_CLOCKINOUT option.
     */
    saveEZOPTION_REQUIRE_LOCATION_FOR_CLOCKINOUT() {
        return ezApi.ezclocker.ezClockerContext.ezSaveSelectedEmployerOption(
            ezApi.ezclocker.ezOptionsService.EZOPTION_REQUIRE_LOCATION_FOR_CLOCKINOUT,
            ezApi.ezclocker.ezUi.ezIsCheckBoxChecked(
                EzEmployerOption.ezToInputId(EzEmployerOption.EZOPTION_REQUIRE_LOCATION_FOR_CLOCKINOUT))
                ? '1'
                : '0');
    }

    /**
     * @protected @method
     * Saves the EZOPTION_ALLOW_RECORDING_OF_UNPAID_BREAKS option.
     */
    saveEZOPTION_ALLOW_RECORDING_OF_UNPAID_BREAKS() {
        return ezApi.ezclocker.ezClockerContext.ezSaveSelectedEmployerOption(
            ezApi.ezclocker.ezOptionsService.EZOPTION_ALLOW_RECORDING_OF_UNPAID_BREAKS,
            ezApi.ezclocker.ezUi.ezIsCheckBoxChecked('EZOPTION_ALLOW_RECORDING_OF_UNPAID_BREAKS')
                ? EzEmployerOption.EZOPTION_VALUE_TRUE
                : EzEmployerOption.EZOPTION_VALUE_FALSE);
    }

    /**
     * @protected @method
     * Saves the EZOPTION_ALLOW_AUTOMATICE_BREAKS option.
     */
    saveEZOPTION_ALLOW_AUTOMATICE_BREAKS() {
        return ezApi.ezclocker.ezClockerContext.ezSaveSelectedEmployerOption(
            ezApi.ezclocker.ezOptionsService.EZOPTION_ALLOW_AUTOMATIC_BREAKS,
            ezApi.ezclocker.ezUi.ezIsCheckBoxChecked('EZOPTION_ALLOW_AUTOMATIC_BREAKS')
                ? EzEmployerOption.EZOPTION_VALUE_TRUE
                : EzEmployerOption.EZOPTION_VALUE_FALSE);
    }

    /**
     * @protected @method
     * Saves the AUTO_BREAK_WORK_HOURS_OPTION option.
     */
    saveAUTO_BREAK_WORK_HOURS_OPTION() {
        let inputValue = ezApi.ezclocker.ezUi.ezGetTrimInputValue('AUTO_BREAK_WORK_HOURS_OPTION');

        let intValue = parseInt(inputValue);
        if (isNaN(intValue)) {
            intValue = 4;
            ezApi.ezclocker.ezUi.ezSetInputValue(
                'AUTO_BREAK_WORK_HOURS_OPTION',
                intValue.toString());
        } else if (1 > intValue) {
            intValue = 1;
            ezApi.ezclocker.ezUi.ezSetInputValue(
                'AUTO_BREAK_WORK_HOURS_OPTION',
                intValue.toString());
        } else if (24 < intValue) {
            intValue = 24;
            ezApi.ezclocker.ezUi.ezSetInputValue(
                'AUTO_BREAK_WORK_HOURS_OPTION',
                intValue.toString());
        }

        return ezApi.ezclocker.ezClockerContext.ezSaveSelectedEmployerOption(
            ezApi.ezclocker.ezOptionsService.AUTO_BREAK_WORK_HOURS_OPTION,
            intValue.toString());
    }

    /**
     * @protected @method
     * Saves the AUTO_BREAK_WORK_MINUTES_OPTION option.
     */
    saveAUTO_BREAK_WORK_MINUTES_OPTION() {
        let inputValue = ezApi.ezclocker.ezUi.ezGetTrimInputValue('AUTO_BREAK_WORK_MINUTES_OPTION');

        let intValue = parseInt(inputValue);
        if (isNaN(intValue)) {
            intValue = 30;
            ezApi.ezclocker.ezUi.ezSetInputValue(
                'AUTO_BREAK_WORK_MINUTES_OPTION',
                intValue.toString());
        } else if (1 > intValue) {
            intValue = 1;
            ezApi.ezclocker.ezUi.ezSetInputValue(
                'AUTO_BREAK_WORK_MINUTES_OPTION',
                intValue.toString());
        }
        if (30 < intValue) {
            intValue = 30;
            ezApi.ezclocker.ezUi.ezSetInputValue(
                'AUTO_BREAK_WORK_MINUTES_OPTION',
                intValue.toString());
        }

        return ezApi.ezclocker.ezClockerContext.ezSaveSelectedEmployerOption(
            ezApi.ezclocker.ezOptionsService.AUTO_BREAK_WORK_MINUTES_OPTION,
            intValue.toString());
    }

    /**
     * @protected @method
     * Saves the EZOPTION_PUSH_NOTIFICATIONS_ENABLED option.
     */
    saveEZOPTION_PUSH_NOTIFICATIONS_ENABLED() {
        return ezApi.ezclocker.ezClockerContext.ezSaveSelectedEmployerOption(
            ezApi.ezclocker.ezOptionsService.EZOPTION_PUSH_NOTIFICATIONS_ENABLED,
            ezApi.ezclocker.ezUi.ezIsCheckBoxChecked('PUSH_NOTIFICATIONS_ENABLED')
                ? EzEmployerOption.EZOPTION_VALUE_TRUE
                : EzEmployerOption.EZOPTION_VALUE_FALSE);
    }

    /**
     * @protected @method
     * Saves the EZOPTION_EMPLOYER_DISABLE_TIME_ENTRY_EDITING option.
     */
    saveEZOPTION_EMPLOYER_DISABLE_TIME_ENTRY_EDITING() {
        return ezApi.ezclocker.ezClockerContext.ezSaveSelectedEmployerOption(
            ezApi.ezclocker.ezOptionsService.EZOPTION_EMPLOYER_DISABLE_TIME_ENTRY_EDITING,
            ezApi.ezclocker.ezUi.ezIsCheckBoxChecked('option_allow_edit_timesheet')
                ? EzEmployerOption.EZOPTION_VALUE_TRUE
                : EzEmployerOption.EZOPTION_VALUE_FALSE);
    }

    /**
     * @protected @method
     * Saves the EZOPTION_CALCULATE_DAILY_DOUBLE_TIME_AFTER_HOURS option.
     */
    saveEZOPTION_CALCULATE_DAILY_DOUBLE_TIME_AFTER_HOURS() {
        if (!EzAccountPreferences.ezInstance.ezEnableDailyDoubleTimeFeature) {
            // Feature is disable, no need to save
            return;
        }

        let inputValue = ezApi.ezclocker.ezUi.ezGetTrimInputValue('EzAccountOptionCalcDailyOverTimeAfter');

        return ezApi.ezclocker.ezClockerContext.ezSaveSelectedEmployerOption(
            EzEmployerOption.EZOPTION_CALCULATE_DAILY_DOUBLE_TIME_AFTER_HOURS,
            EzString.stringHasLength(inputValue)
                ? inputValue
                : '12');
    }

    /**
     * @protected @method
     * Saves all the preferences back to the employer options cache
     */
    ezUpdateOptionsCache() {
        // Daily double time
        ezApi.ezclocker.ezUi.ezStartPageWaitExecute(
            'Saving preferences ...',
            (waitDone) =>
                EzAccountPreferences.ezInstance.saveEZOPTION_EMPLOYER_SCHEDULE_START_DAY()
                    .then(EzAccountPreferences.ezInstance.saveEZOPTION_CALCULATE_DAILY_DOUBLE_TIME_AFTER_HOURS)
                    .then(EzAccountPreferences.ezInstance.saveEZOPTION_CALCULATE_DAILY_DOUBLE_TIME)
                    .then(EzAccountPreferences.ezInstance.saveEZOPTION_CALCULATE_DAILY_OVERTIME)
                    .then(EzAccountPreferences.ezInstance.saveEZOPTION_CALCULATE_DAILY_OVERTIME_AFTER_HOURS)
                    .then(EzAccountPreferences.ezInstance.saveEZOPTION_CALCULATE_WEEKLY_OVERTIME_AFTER_HOURS)
                    .then(EzAccountPreferences.ezInstance.saveEZOPTION_CALCULATE_OVERTIME_IN_TIME_SHEET_EXPORTS)
                    .then(EzAccountPreferences.ezInstance.saveEZOPTION_ALLOW_EARLY_CLOCK_AT_MINS_BEFORE_SCHEDULE)
                    .then(EzAccountPreferences.ezInstance.saveEZOPTION_ROUND_CLOCK_IN_CLOCK_OUT_OPTIONS)
                    .then(EzAccountPreferences.ezInstance.saveEZOPTION_RESTRICT_CLOCK_IN_TO_SCHEDULE)
                    .then(EzAccountPreferences.ezInstance.saveEZOPTION_ROUND_CLOCK_IN_CLOCK_OUT)
                    .then(EzAccountPreferences.ezInstance.saveEZOPTION_PREFERRED_TIMEZONE)
                    .then(EzAccountPreferences.ezInstance.saveEZOPTION_REQUIRE_LOCATION_FOR_CLOCKINOUT)
                    .then(EzAccountPreferences.ezInstance.saveEZOPTION_PUSH_NOTIFICATIONS_ENABLED)
                    .then(EzAccountPreferences.ezInstance.saveEZOPTION_ALLOW_RECORDING_OF_UNPAID_BREAKS)
                    .then(EzAccountPreferences.ezInstance.saveEZOPTION_ALLOW_AUTOMATICE_BREAKS)
                    .then(EzAccountPreferences.ezInstance.saveAUTO_BREAK_WORK_HOURS_OPTION)
                    .then(EzAccountPreferences.ezInstance.saveAUTO_BREAK_WORK_MINUTES_OPTION)
                    .then(EzAccountPreferences.ezInstance.saveEZOPTION_EMPLOYER_DISABLE_TIME_ENTRY_EDITING)
                    .then(EzAccountPreferences.ezInstance.saveEZOPTION_NOTIFY_EMPLOYEE_MISSED_CLOCK_IN_CLOCK_OUT)
                    .then(EzAccountPreferences.ezInstance.saveEZOPTION_NOTIFY_EMPLOYER_EMPLOYEE_MISSED_CLOCK_IN_CLOCK_OUT)
                    .then(EzAccountPreferences.ezInstance.saveEZOPTION_NOTIFY_EMPLOYEE_BEFORE_SHIFT_STARTS)
                    .then(EzAccountPreferences.ezInstance.saveEZOPTION_ALLOW_EMPLOYEES_TO_SEE_COWORKER_SCHEDULES)
                    .then(EzAccountPreferences.ezInstance.saveEZOPTION_ALLOW_TIME_OFF_REQUESTS)
                    .then(EzAccountPreferences.ezInstance.saveEZOPTION_TIME_OFF_RESTRICT_REQUEST_START_DATE)
                    .then(EzAccountPreferences.ezInstance.saveEZOPTION_TIME_OFF_MINIMUM_DAYS_IN_FUTURE)
                    .then(EzAccountPreferences.ezInstance.saveEZOPTION_SELECTED_PAY_PERIOD)
                    .then(EzAccountPreferences.ezInstance.saveEZOPTION_PAY_PERIOD_LAST_CLOSING_DATE)
                    .then(waitDone));
    }

    /**
     * @protected @method
     * Handles the EzDateTime's onActiveTimeZoneChanged event so that the UX is updated to match the loaded value.
     */
    ezHandleOnActiveTimeZoneChangedEvent() {
        EzAccountPreferences.ezInstance.ezPreferredTimeZoneOptionValue = ezApi.ezclocker.ezDateTime.activeTimeZone;

        ezApi.ezclocker.ezUi.ezContent(
            'EzSelectedTimeZoneInfo',
            `Active Time Zone: ${ezApi.ezclocker.ezDateTime.activeTimeZone}`);
    }

    /**
     * @public @method
     * Loads the account preferences
     */
    ezReadSelectedEmployerOptions() {
        ezApi.ezclocker.ezUi.ezSetCheckboxValue(
            'option_allow_edit_timesheet',
            ezApi.ezclocker.ezOptionsService.ezOptionValueToBoolean(
                ezApi.ezclocker.ezClockerContext.ezReadSelectedEmployerAccountOption(
                    ezApi.ezclocker.ezOptionsService.EZOPTION_EMPLOYER_DISABLE_TIME_ENTRY_EDITING,
                    EzEmployerOption.EZOPTION_VALUE_TRUE),
                true));

        ezApi.ezclocker.ezUi.ezId('options_schedule_day').val(
            ezApi.ezclocker.ezOptionsService.ezOptionValueToNumber(
                ezApi.ezclocker.ezClockerContext.ezReadSelectedEmployerAccountOption(
                    ezApi.ezclocker.ezOptionsService.EZOPTION_EMPLOYER_SCHEDULE_START_DAY,
                    '0'),
                false));

        ezApi.ezclocker.ezUi.ezId('options_pay_period_select_id').val(
            ezApi.ezclocker.ezClockerContext.ezReadSelectedEmployerAccountOption(
                ezApi.ezclocker.ezOptionsService.EZOPTION_SELECTED_PAY_PERIOD,
                'NONE'
            )
        );

        const yesterdayDate = ezApi.ezclocker.ezDateTime.ezToIsoDate(moment().subtract(1, 'days'));
        document.getElementById("options_pay_period_last_closing_date_id").setAttribute("max", yesterdayDate);

        const payperiodClosingDate = ezApi.ezclocker.ezClockerContext.ezReadSelectedEmployerAccountOption(
            ezApi.ezclocker.ezOptionsService.EZOPTION_PAY_PERIOD_LAST_CLOSING_DATE,
            undefined
        );
        ezApi.ezclocker.ezUi.ezShowElement('options_pay_period_last_closing_date_section_id');

        if (payperiodClosingDate && ezApi.ezclocker.ezUi.ezGetInputValue('options_pay_period_select_id') !== 'MONTHLY') {
            ezApi.ezclocker.ezUi.ezId('options_pay_period_last_closing_date_id').val(
                ezApi.ezclocker.ezDateTime.ezToIsoDate(moment(payperiodClosingDate))
            );
            ezApi.ezclocker.ezUi.ezEnableElement('options_pay_period_last_closing_date_id');
        } else {
            if (ezApi.ezclocker.ezUi.ezGetInputValue('options_pay_period_select_id') === 'MONTHLY') {
                ezApi.ezclocker.ezUi.ezHideElement('options_pay_period_last_closing_date_section_id');
                ezApi.ezclocker.ezUi.ezSetInputValue('options_pay_period_last_closing_date_id', undefined);
            } else {
                ezApi.ezclocker.ezUi.ezDisableElement('options_pay_period_last_closing_date_id');
            }
        }

        // EZOPTION_ALLOW_EMPLOYEES_TO_SEE_COWORKER_SCHEDULES
        ezApi.ezclocker.ezUi.ezSetCheckboxValue(
            EzEmployerOption.ezToInputId(EzEmployerOption.EZOPTION_ALLOW_EMPLOYEES_TO_SEE_COWORKER_SCHEDULES),
            ezApi.ezclocker.ezOptionsService.ezOptionValueToBoolean(
                ezApi.ezclocker.ezClockerContext.ezReadSelectedEmployerAccountOption(
                    EzEmployerOption.EZOPTION_ALLOW_EMPLOYEES_TO_SEE_COWORKER_SCHEDULES,
                    '0'
                ), false
            )
        );

        ezApi.ezclocker.ezUi.ezSetCheckboxValue(
            EzEmployerOption.ezToInputId(EzEmployerOption.EZOPTION_ALLOW_TIME_OFF_REQUESTS),
            ezApi.ezclocker.ezOptionsService.ezOptionValueToBoolean(
                ezApi.ezclocker.ezClockerContext.ezReadSelectedEmployerAccountOption(
                    EzEmployerOption.EZOPTION_ALLOW_TIME_OFF_REQUESTS,
                    '0'),
                false));

        ezApi.ezclocker.ezUi.ezId('EZOPTION_NOTIFY_EMPLOYEE_MISSED_CLOCK_IN_CLOCK_OUT').val(
            ezApi.ezclocker.ezOptionsService.ezOptionValueToNumber(
                ezApi.ezclocker.ezClockerContext.ezReadSelectedEmployerAccountOption(
                    ezApi.ezclocker.ezOptionsService.EZOPTION_NOTIFY_EMPLOYEE_MISSED_CLOCK_IN_CLOCK_OUT,
                    '0'),
                0));

        ezApi.ezclocker.ezUi.ezId('EZOPTION_NOTIFY_EMPLOYER_EMPLOYEE_MISSED_CLOCK_IN_CLOCK_OUT').val(
            ezApi.ezclocker.ezOptionsService.ezOptionValueToNumber(
                ezApi.ezclocker.ezClockerContext.ezReadSelectedEmployerAccountOption(
                    ezApi.ezclocker.ezOptionsService.EZOPTION_NOTIFY_EMPLOYER_EMPLOYEE_MISSED_CLOCK_IN_CLOCK_OUT,
                    '0'),
                0));

        ezApi.ezclocker.ezUi.ezId('EZOPTION_NOTIFY_EMPLOYEE_BEFORE_SHIFT_STARTS').val(
            ezApi.ezclocker.ezOptionsService.ezOptionValueToNumber(
                ezApi.ezclocker.ezClockerContext.ezReadSelectedEmployerAccountOption(
                    ezApi.ezclocker.ezOptionsService.EZOPTION_NOTIFY_EMPLOYEE_BEFORE_SHIFT_STARTS, '0'), 0));

        ezApi.ezclocker.ezUi.ezSetCheckboxValue(
            'PUSH_NOTIFICATIONS_ENABLED',
            ezApi.ezclocker.ezOptionsService.ezOptionValueToBoolean(
                ezApi.ezclocker.ezClockerContext.ezReadSelectedEmployerAccountOption(
                    ezApi.ezclocker.ezOptionsService.EZOPTION_PUSH_NOTIFICATIONS_ENABLED,
                    EzEmployerOption.EZOPTION_VALUE_TRUE),
                true));

        // EZOPTION_REQUIRE_LOCATION_FOR_CLOCKINOUT
        ezApi.ezclocker.ezUi.ezSetCheckboxValue(
            EzEmployerOption.ezToInputId(EzEmployerOption.EZOPTION_REQUIRE_LOCATION_FOR_CLOCKINOUT),
            ezApi.ezclocker.ezOptionsService.ezOptionValueToBoolean(
                ezApi.ezclocker.ezClockerContext.ezReadSelectedEmployerAccountOption(
                    ezApi.ezclocker.ezOptionsService.EZOPTION_REQUIRE_LOCATION_FOR_CLOCKINOUT,
                    EzEmployerOption.EZOPTION_VALUE_FALSE),
                false));

        ezApi.ezclocker.ezUi.ezSetCheckboxValue(
            'EZOPTION_ALLOW_RECORDING_OF_UNPAID_BREAKS',
            ezApi.ezclocker.ezOptionsService.ezOptionValueToBoolean(
                ezApi.ezclocker.ezClockerContext.ezReadSelectedEmployerAccountOption(
                    ezApi.ezclocker.ezOptionsService.EZOPTION_ALLOW_RECORDING_OF_UNPAID_BREAKS,
                    EzEmployerOption.EZOPTION_VALUE_FALSE),
                false));

        ezApi.ezclocker.ezUi.ezSetCheckboxValue(
            'EZOPTION_ALLOW_AUTOMATIC_BREAKS',
            ezApi.ezclocker.ezOptionsService.ezOptionValueToBoolean(
                ezApi.ezclocker.ezClockerContext.ezReadSelectedEmployerAccountOption(
                    ezApi.ezclocker.ezOptionsService.EZOPTION_ALLOW_AUTOMATIC_BREAKS,
                    EzEmployerOption.EZOPTION_VALUE_FALSE),
                false));

        EzAccountPreferences.ezInstance.ezHandle_EZOPTION_ALLOW_AUTOMATIC_BREAKS();

        ezApi.ezclocker.ezUi.ezSetInputValue(
            'AUTO_BREAK_WORK_HOURS_OPTION',
            ezApi.ezclocker.ezOptionsService.ezOptionValueToNumber(
                ezApi.ezclocker.ezClockerContext.ezReadSelectedEmployerAccountOption(
                    ezApi.ezclocker.ezOptionsService.AUTO_BREAK_WORK_HOURS_OPTION,
                    '4'),
                4));
        ezApi.ezclocker.ezEventEngine.ezWantElementEvent(
            'AUTO_BREAK_WORK_HOURS_OPTION',
            EzElementEventName.BLUR,
            EzAccountPreferences.ezApiName,
            EzAccountPreferences.ezInstance.handle_AUTO_BREAK_WORK_HOURS_OPTION_BlurEvent);


        ezApi.ezclocker.ezUi.ezSetInputValue(
            'AUTO_BREAK_WORK_MINUTES_OPTION',
            ezApi.ezclocker.ezOptionsService.ezOptionValueToNumber(
                ezApi.ezclocker.ezClockerContext.ezReadSelectedEmployerAccountOption(
                    ezApi.ezclocker.ezOptionsService.AUTO_BREAK_WORK_MINUTES_OPTION,
                    '15'),
                15));

        ezApi.ezclocker.ezEventEngine.ezWantElementEvent(
            'AUTO_BREAK_WORK_MINUTES_OPTION',
            EzElementEventName.BLUR,
            EzAccountPreferences.ezApiName,
            EzAccountPreferences.ezInstance.handle_AUTO_BREAK_WORK_MINUTES_OPTION_BlurEvent);

        // Restrict Early Clock In
        ezApi.ezclocker.ezUi.ezSetCheckboxValue(
            'EZOPTION_RESTRICT_CLOCK_IN_TO_SCHEDULE',
            ezApi.ezclocker.ezOptionsService.ezOptionValueToBoolean(
                ezApi.ezclocker.ezClockerContext.ezReadSelectedEmployerAccountOption(
                    ezApi.ezclocker.ezOptionsService.EZOPTION_RESTRICT_CLOCK_IN_TO_SCHEDULE,
                    EzEmployerOption.EZOPTION_VALUE_FALSE),
                false));

        EzAccountPreferences.ezInstance.ezHandleRestrictClockInToScheduleCheckboxChange();

        // Round Clock In Clock Out
        ezApi.ezclocker.ezUi.ezSetCheckboxValue(
            'EZOPTION_ROUND_CLOCK_IN_CLOCK_OUT',
            ezApi.ezclocker.ezOptionsService.ezOptionValueToBoolean(
                ezApi.ezclocker.ezClockerContext.ezReadSelectedEmployerAccountOption(
                    ezApi.ezclocker.ezOptionsService.EZOPTION_ROUND_CLOCK_IN_CLOCK_OUT,
                    EzEmployerOption.EZOPTION_VALUE_FALSE),
                false));

        EzAccountPreferences.ezInstance.ezHandleRoundingClockInOutChange();

        const notifyEmployeeBeforeShiftStartsValue = ezApi.ezclocker.ezOptionsService.ezOptionValueToNumber(
            ezApi.ezclocker.ezClockerContext.ezReadSelectedEmployerAccountOption(
                ezApi.ezclocker.ezOptionsService.EZOPTION_NOTIFY_EMPLOYEE_BEFORE_SHIFT_STARTS,
                '0'),
            0);

        ezApi.ezclocker.ezUi.ezSetInputValue(
            'EZOPTION_NOTIFY_EMPLOYEE_BEFORE_SHIFT_STARTS',
            notifyEmployeeBeforeShiftStartsValue);

        // Notify employee for the schedule checkbox
        ezApi.ezclocker.ezUi.ezSetCheckboxValue(
            'EZOPTION_NOTIFY_EMPLOYEE_BEFORE_SHIFT_STARTS_CHECKED',
            notifyEmployeeBeforeShiftStartsValue === 0 ? false: true
        );

        EzAccountPreferences.ezInstance.ezHandleNotifyEmployeeBeforeShiftChange();

        ezApi.ezclocker.ezUi.ezSetInputValue(
            'EZOPTION_ALLOW_EARLY_CLOCK_AT_MINS_BEFORE_SCHEDULE',
            ezApi.ezclocker.ezOptionsService.ezOptionValueToNumber(
                ezApi.ezclocker.ezClockerContext.ezReadSelectedEmployerAccountOption(
                    ezApi.ezclocker.ezOptionsService.EZOPTION_ALLOW_EARLY_CLOCK_AT_MINS_BEFORE_SCHEDULE,
                    '0'),
                0));

        ezApi.ezclocker.ezUi.ezSetInputValue(
            'EZOPTION_ROUND_CLOCK_IN_CLOCK_OUT_OPTIONS',
            ezApi.ezclocker.ezOptionsService.ezNormalizeOptionValue(
                ezApi.ezclocker.ezClockerContext.ezReadSelectedEmployerAccountOption(
                    ezApi.ezclocker.ezOptionsService.EZOPTION_ROUND_CLOCK_IN_CLOCK_OUT_OPTIONS,
                    'NONE')));

        ezApi.ezclocker.ezUi.ezSetInputValue(
            'EZOPTION_TIME_OFF_MINIMUM_DAYS_IN_FUTURE',
            ezApi.ezclocker.ezOptionsService.ezNormalizeOptionValue(
                ezApi.ezclocker.ezClockerContext.ezReadSelectedEmployerAccountOption(
                    ezApi.ezclocker.ezOptionsService.EZOPTION_TIME_OFF_MINIMUM_DAYS_IN_FUTURE,
                    'NONE')));

        ezApi.ezclocker.ezUi.ezLongFadeOut(
            '_DisplayPreferenceMessages',
            () => ezApi.ezclocker.ezUi.ezSetContent(
                '_DisplayPreferenceMessages',
                EzString.EMPTY));
    }

    /**
     * @protected @method
     * Enable/disable features as needed
     */
    ezEnableFeatures() {
        if (!EzAccountPreferences.ezInstance.ezEnableDailyDoubleTimeFeature) {
            ezApi.ezclocker.ezUi.ezHideElement('EzDailyDoubleTimeFeature');
        } else {
            ezApi.ezclocker.ezUi.ezShowElement('EzDailyDoubleTimeFeature');
        }
    }

    /**
     * @protected @method
     * Enable the over time option
     */
    ezEnableOvertimeOption() {
        if (ezApi.ezIsTrue(EzAccountPreferences.ezInstance.ezOvertimeDisabled)) {
            EzAccountPreferences.ezInstance.ezOvertimeDisabled = false;

            ezApi.ezclocker.ezUi.ezHideElement('EzOvertimeFeatureOnlyAvailableLabel');

            ezApi.ezclocker.ezUi.ezRemoveElementClass('EzAccountOptionCalculateOvertimeLabel', 'ezDisabledLabel');
            ezApi.ezclocker.ezUi.ezAddElementClass('EzAccountOptionCalculateOvertimeLabel', 'ezLabel');

            ezApi.ezclocker.ezUi.ezEnableElement('EzAccountOptionCalculateOvertime');
            ezApi.ezclocker.ezUi.ezSetCheckboxValue('EzAccountOptionCalculateOvertime',
                ezApi.ezclocker.ezOptionsService.ezOptionValueToBoolean(
                    ezApi.ezclocker.ezOptionsService.ezEmployerOptions[
                    ezApi.ezclocker.ezOptionsService.EZOPTION_CALCULATE_OVERTIME_IN_TIME_SHEET_EXPORTS],
                    false));

            EzAccountPreferences.ezInstance.ezEnableOvertimeAfterHoursOption();

            EzAccountPreferences.ezInstance.ezEnableDailyOvertimeOption();

            EzAccountPreferences.ezInstance.ezEnableDailyDoubleTimeOption();
        }
    }

    /**
     * @protected @method
     * Disable the overtime option
     */
    ezDisableOvertimeOption() {
        if (EzBoolean.isFalse(EzAccountPreferences.ezInstance.ezOvertimeDisabled)) {
            EzAccountPreferences.ezInstance.ezOvertimeDisabled = true;

            ezApi.ezclocker.ezUi.ezShowElement('EzOvertimeFeatureOnlyAvailableLabel');

            ezApi.ezclocker.ezUi.ezRemoveElementClass('EzAccountOptionCalculateOvertimeLabel', 'ezLabel');
            ezApi.ezclocker.ezUi.ezAddElementClass('EzAccountOptionCalculateOvertimeLabel', 'ezDisabledLabel');

            ezApi.ezclocker.ezUi.ezSetCheckboxValue('EzAccountOptionCalculateOvertime', false);
            ezApi.ezclocker.ezUi.ezDisableElement('EzAccountOptionCalculateOvertime');

            EzAccountPreferences.ezInstance.ezDisableOvertimeAfterHoursOption();

            EzAccountPreferences.ezInstance.ezDisableDailyOvertimeOption();

            EzAccountPreferences.ezInstance.ezDisableDailyDoubleTimeOption();
        }
    }

    /**
     * @protected @method
     * Enables the overtime after hours input box.
     * Should only enable if the EzAccountOptionCalculateOvertime checkbox is checked.
     */
    ezEnableOvertimeAfterHoursOption() {
        if (ezApi.ezclocker.ezUi.ezIsCheckboxChecked('EzAccountOptionCalculateOvertime')) {
            EzAccountPreferences.ezInstance.ezOvertimeAfterHoursDisabled = false;

            ezApi.ezclocker.ezUi.ezEnableElement('EzAccountOptionCalcOverTimeAfter');

            ezApi.ezclocker.ezUi.ezSetInputValue(
                'EzAccountOptionCalcOverTimeAfter',
                ezApi.ezclocker.ezOptionsService.ezOptionValueToNumber(
                    ezApi.ezclocker.ezOptionsService.ezEmployerOptions[
                    ezApi.ezclocker.ezOptionsService.EZOPTION_CALCULATE_WEEKLY_OVERTIME_AFTER_HOURS],
                    40));

            ezApi.ezclocker.ezUi.ezRemoveElementClass(
                'EzAccountOptionCalcOverTimeAfterPostLabel',
                'ezDisabledLabel');

            ezApi.ezclocker.ezUi.ezAddElementClass(
                'EzAccountOptionCalcOverTimeAfterPostLabel',
                'ezLabel');
        }
    }

    /**
     * @protected @method
     * Disables the overtime after hours input box.
     * Should only disable if the EzAccountOptionCalculateOvertime checkbox is NOT checked.
     */
    ezDisableOvertimeAfterHoursOption() {
        if (!ezApi.ezclocker.ezUi.ezIsCheckboxChecked('EzAccountOptionCalculateOvertime')) {
            EzAccountPreferences.ezInstance.ezOvertimeAfterHoursDisabled = true;

            ezApi.ezclocker.ezUi.ezDisableElement('EzAccountOptionCalcOverTimeAfter');

            ezApi.ezclocker.ezUi.ezRemoveElementClass(
                'EzAccountOptionCalcOverTimeAfterPostLabel',
                'ezLabel');

            ezApi.ezclocker.ezUi.ezAddElementClass(
                'EzAccountOptionCalcOverTimeAfterPostLabel',
                'ezDisabledLabel');
        }
    }

    /**
     * @protected @method
     * Enable the daily overtime option
     */
    ezEnableDailyOvertimeOption() {
        if (ezApi.ezIsTrue(EzAccountPreferences.ezInstance.ezDailyOvertimeDisabled)) {
            EzAccountPreferences.ezInstance.ezDailyOvertimeDisabled = false;

            ezApi.ezclocker.ezUi.ezRemoveClass(
                'EzAccountOptionCalculateDailOvertimeLabel', 'ezDisabledLabel');

            ezApi.ezclocker.ezUi.ezAddClass(
                'EzAccountOptionCalculateDailOvertimeLabel', 'ezLabel');

            ezApi.ezclocker.ezUi.ezEnableElement(
                'EzAccountOptionCalculateDailyOvertime');

            ezApi.ezclocker.ezUi.ezSetCheckboxValue(
                'EzAccountOptionCalculateDailyOvertime',
                false);

            EzAccountPreferences.ezInstance.ezDisableDailyOvertimeAfterHoursOption();
        }
    }

    /**
     * @protected @method
     * Disable the daily overtime option
     */
    ezDisableDailyOvertimeOption() {
        if (EzBoolean.isFalse(EzAccountPreferences.ezInstance.ezDailyOvertimeDisabled)) {
            EzAccountPreferences.ezInstance.ezDailyOvertimeDisabled = true;

            ezApi.ezclocker.ezUi.ezAddClass(
                'EzAccountOptionCalculateDailOvertimeLabel',
                'ezDisabledLabel');

            ezApi.ezclocker.ezUi.ezRemoveClass(
                'EzAccountOptionCalculateDailOvertimeLabel',
                'ezLabel');

            ezApi.ezclocker.ezUi.ezSetCheckboxValue(
                'EzAccountOptionCalculateDailyOvertime',
                false);

            ezApi.ezclocker.ezUi.ezDisableElement('EzAccountOptionCalculateDailyOvertime');

            EzAccountPreferences.ezInstance.ezDisableDailyOvertimeAfterHoursOption();
        }
    }

    /**
     * @protected @method
     * Enables the daily overtime after hours option.
     * Enabled once the EzAccountOptionCalculateDailyOvertime checkbox is checked
     */
    ezEnableDailyOvertimeAfterHoursOption() {
        if (ezApi.ezclocker.ezUi.ezIsCheckBoxChecked('EzAccountOptionCalculateDailyOvertime')) {
            EzAccountPreferences.ezInstance.ezDailyOvertimeAfterHoursDisabled = false;

            ezApi.ezclocker.ezUi.ezEnableElement('EzAccountOptionCalcDailyOverTimeAfter');

            ezApi.ezclocker.ezUi.ezRemoveClass(
                'EzAccountOptionCalcDailyOverTimeAfterPostLabel',
                'ezDisabledLabel');

            ezApi.ezclocker.ezUi.ezAddClass(
                'EzAccountOptionCalcDailyOverTimeAfterPostLabel',
                'ezLabel');

            ezApi.ezclocker.ezUi.ezSetInputValue(
                'EzAccountOptionCalcDailyOverTimeAfter',
                ezApi.ezclocker.ezOptionsService.ezOptionValueToNumber(
                    ezApi.ezclocker.ezOptionsService.ezEmployerOptions[
                    ezApi.ezclocker.ezOptionsService.EZOPTION_CALCULATE_DAILY_OVERTIME_AFTER_HOURS],
                    8));
        }
    }

    /**
     * @protected @method
     * Disables the daily overtime after hours option.
     * Diabled if the EzAccountOptionCalculateDailyOvertime checkbox is NOT checked
     */
    ezDisableDailyOvertimeAfterHoursOption() {
        if (!ezApi.ezclocker.ezUi.ezIsCheckBoxChecked('EzAccountOptionCalculateDailyOvertime')) {
            EzAccountPreferences.ezInstance.ezDailyOvertimeAfterHoursDisabled = true;

            ezApi.ezclocker.ezUi.ezDisableElement('EzAccountOptionCalcDailyOverTimeAfter');

            ezApi.ezclocker.ezUi.ezAddClass(
                'EzAccountOptionCalcDailyOverTimeAfterPostLabel',
                'ezDisabledLabel');

            ezApi.ezclocker.ezUi.ezRemoveClass(
                'EzAccountOptionCalcDailyOverTimeAfterPostLabel',
                'ezLabel');
        }
    }

    /**
     * @protected @method
     * Enable the daily double time option
     */
    ezEnableDailyDoubleTimeOption() {
        if (!EzAccountPreferences.ezInstance.ezEnableDailyDoubleTimeFeature) {
            ezApi.ezclocker.ezUi.ezHideElement('EzDailyDoubleTimeFeature');

            return;
        }

        if (ezApi.ezIsTrue(EzAccountPreferences.ezInstance.ezDailyDoubleTimeDisabled)) {
            EzAccountPreferences.ezInstance.ezDailyDoubleTimeDisabled = false;

            EzAccountPreferences.ezInstance.ezDisableDailyDoubleTimeAfterHoursOption();

            ezApi.ezclocker.ezUi.ezRemoveClass(
                'EzAccountOptionCalculateDailyDoubleTimeLabel',
                'ezDisabledLabel');

            ezApi.ezclocker.ezUi.ezAddClass(
                'EzAccountOptionCalculateDailyDoubleTimeLabel',
                'ezLabel');

            ezApi.ezclocker.ezUi.ezSetCheckboxValue(
                'EzAccountOptionCalculateDailyDoubleTime',
                false);

            ezApi.ezclocker.ezUi.ezEnableElement('EzAccountOptionCalculateDailyDoubleTime');
        }
    }

    /**
     * @protected @method
     * Disable the daily double time optoin
     */
    ezDisableDailyDoubleTimeOption() {
        if (!EzAccountPreferences.ezInstance.ezEnableDailyDoubleTimeFeature) {
            ezApi.ezclocker.ezUi.ezHideElement('EzDailyDoubleTimeFeature');
            return;
        }

        if (EzBoolean.isFalse(EzAccountPreferences.ezInstance.ezDailyDoubleTimeDisabled)) {
            EzAccountPreferences.ezInstance.ezDailyDoubleTimeDisabled = true;

            EzAccountPreferences.ezInstance.ezDisableDailyDoubleTimeAfterHoursOption();

            ezApi.ezclocker.ezUi.ezAddClass('EzAccountOptionCalculateDailyDoubleTimeLabel', 'ezDisabledLabel');
            ezApi.ezclocker.ezUi.ezRemoveClass('EzAccountOptionCalculateDailyDoubleTimeLabel', 'ezLabel');

            ezApi.ezclocker.ezUi.ezSetCheckboxValue('EzAccountOptionCalculateDailyDoubleTime', false);
            ezApi.ezclocker.ezUi.ezDisableElement('EzAccountOptionCalculateDailyDoubleTime');
        }
    }

    /**
     * @protected @method
     * Disables the daily double time after hours input box
     * Should disable when the EzAccountOptionCalculateDailyDoubleTime checkbox is NOT checked.
     */
    ezDisableDailyDoubleTimeAfterHoursOption() {
        if (!EzAccountPreferences.ezInstance.ezEnableDailyDoubleTimeFeature) {
            ezApi.ezclocker.ezUi.ezHideElement('EzDailyDoubleTimeFeature');
            return;
        }

        if (ezApi.ezclocker.ezUi.ezIsCheckboxChecked('EzAccountOptionCalculateDailyDoubleTime')) {
            EzAccountPreferences.ezInstance.ezDailyDoubleTimeAfterHoursDisabled = true;

            ezApi.ezclocker.ezUi.ezDisableElement('EzAccountOptionCalcDailyDoubleTimeAfter');

            ezApi.ezclocker.ezUi.ezAddClass('EzAccountOptionCalcDailyDoubleTimeAfterPostLabel', 'ezDisabledLabel');
            ezApi.ezclocker.ezUi.ezRemoveClass('EzAccountOptionCalcDailyDoubleTimeAfterPostLabel', 'ezLabel');
        }
    }

    /**
     * @protected @method
     * Enables the daily double time after hours input box
     * Should enable when the EzAccountOptionCalculateDailyDoubleTime checkbox is checked.
     */
    ezEnableDailyDoubleTimeAfterHoursOption() {
        if (!EzAccountPreferences.ezInstance.ezEnableDailyDoubleTimeFeature) {
            ezApi.ezclocker.ezUi.ezHideElement('EzDailyDoubleTimeFeature');
            return;
        }

        if (ezApi.ezclocker.ezUi.ezIsCheckboxChecked('EzAccountOptionCalculateDailyDoubleTime')) {
            EzAccountPreferences.ezInstance.ezDailyDoubleTimeAfterHoursDisabled = false;

            ezApi.ezclocker.ezUi.ezEnableElement('EzAccountOptionCalcDailyDoubleTimeAfter');
            ezApi.ezclocker.ezUi.ezSetInputValue('EzAccountOptionCalcDailyDoubleTimeAfter',
                ezApi.ezclocker.ezOptionsService.ezOptionValueToNumber(
                    ezApi.ezclocker.ezOptionsService.ezEmployerOptions[
                    ezApi.ezclocker.ezOptionsService.EZOPTION_CALCULATE_DAILY_DOUBLE_TIME_AFTER_HOURS],
                    12));

            ezApi.ezclocker.ezUi.ezRemoveClass('EzAccountOptionCalcDailyDoubleTimeAfterPostLabel', 'ezDisabledLabel');
            ezApi.ezclocker.ezUi.ezAddClass('EzAccountOptionCalcDailyDoubleTimeAfterPostLabel', 'ezLabel');
        }
    }

    /**
     * @protected @method
     * Handles the selected employer license ready/updated events
     * License available at: eventData.data
     * @param {Object} eventData.data
     */
    ezHandleOnSelectedEmployerAccountLicenseReadyUpdated(eventData) {
        EzAccountPreferences.ezInstance.ezProcessSubscriptionFeatures(eventData.data);
    }

    /**
     * @protected @method
     * Enables/disables features based on subscription
     * @param {Object} selectedEmployerLicense
     */
    ezProcessSubscriptionFeatures(selectedEmployerLicense) {
        if (!ezApi.ezIsValid(selectedEmployerLicense)) {
            throw new EzBadParamException(
                'selectedEmployerLicense',
                EzAccountPreferences.ezInstance,
                EzAccountPreferences.ezInstance.ezProcessSubscriptionFeatures);
        }

        let allowOvertimeFeature = -1 != selectedEmployerLicense.enabledFeatures.indexOf('OVERTIME');

        if (EzBoolean.isFalse(allowOvertimeFeature)) {
            EzAccountPreferences.ezInstance.ezDisableOvertimeOption();
        } else {
            EzAccountPreferences.ezInstance.load_EZOPTION_CALCULATE_OVERTIME_IN_TIME_SHEET_EXPORTS();
        }

        EzAccountPreferences.ezInstance.ezProcessTimeOffFeatures(selectedEmployerLicense);
    }

    /**
     * @protected @method
     * Check for time off based on susbription
     * @param {Object} ezProcessTimeOffFeatures
     */
    ezProcessTimeOffFeatures(selectedEmployerLicense) {
        if (!ezApi.ezIsValid(selectedEmployerLicense)) {
            throw new EzBadParamException(
                'selectedEmployerLicense',
                EzAccountPreferences.ezInstance,
                EzAccountPreferences.ezInstance.ezProcessTimeOffFeatures);
        }

        let allowTimeOffFeatures = -1 != selectedEmployerLicense.enabledFeatures.indexOf('TIME_OFF');

        EzAccountPreferences.ezInstance.ezHandleTimeOffRestrictChange(undefined, allowTimeOffFeatures);

    }

    /**
     * @protected @method
     * Loads the available time-zones into the option picker
     */
    ezLoadAvailableTimeZones() {
        ezApi.ezclocker.ezUi.ezContent(
            'EzSelectedTimeZoneInfo',
            `Active Time Zone: ${ezApi.ezclocker.ezDateTime.activeTimeZone}`);

        let availableTimeZones = EzString.EMPTY;

        let selectDefault = 'selected';

        let automaticValue = `Automatic (${ezApi.ezclocker.ezDateTime.ezGuessLocalTimeZone()})`;

        let selectedValue = automaticValue;

        ezApi.ezclocker.ezDateTime.ezSupportedTimeZones.forEach(
            (tZone) => {
                let isSelected = EzString.EMPTY;

                let timeZoneId = tZone.utc[0];

                let timeZoneDisplay = tZone.value;

                if (timeZoneId === EzAccountPreferences.ezInstance.ezPreferredTimeZoneOptionValue) {
                    selectDefault = EzString.EMPTY;
                    isSelected = 'selected';
                    selectedValue = timeZoneDisplay;
                }

                availableTimeZones = EzHtml.build`
                    ${availableTimeZones}
                    <option
                        id="EzAvailableTimeZone_${tZone.abbr}"
                        value="${timeZoneId}"
                        ${isSelected}>
                        ${timeZoneDisplay}
                    </option>`;
            });

        ezApi.ezclocker.ezUi.ezContent(
            'EZOPTION_EMPLOYER_DASHBOARD_PREFERRED_TIMEZONE',
            EzHtml.build`
                <option
                    id="EzAvailableTimeZone_AUTOMATIC"
                    value="AUTOMATIC"
                    ${selectDefault}>
                    ${automaticValue}
                </option>
                ${availableTimeZones}`);

        ezApi.ezclocker.ezUi.ezSetInputValue(
            'EZOPTION_EMPLOYER_DASHBOARD_PREFERRED_TIMEZONE',
            selectedValue);
    }

    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    // Class Initialization and EzApi Registration Section
    // !! DO NOT PLACE ANY non-initialization fields, getter/setter methods, static methods, or class methods beyond this section !!
    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

/**
     * @static
     * @public @readonly @property
     * Returns the name of this class's singleton instance when registered with ezApi.
     * @returns {string}
     */
    static get ezApiName() {
        return 'ezAccountPreferences';
    }

    /**
     * @static
     * @public @readonly @property
     * Returns an object of event names that this class may trigger.
     * @returns {object}
     */
    static get ezEventNames() {
        return {
            onReady: 'ezOn_EzAccountPreferences_Ready',
            onPreferredTimeZoneChanged: 'ezOn_EzAccountPreferences_PreferredTimeZone_Changed'
        };
    }
    /**
     * @static
     * @private @field
     * Stores the singleton instance of this class that was created by and registerd with EzApi.
     * @type {EzAccountPreferences}
     */
    static #ezInstance = EzObject.hasProperty(globalThis, 'ezApi') &&
        EzObject.isValid(globalThis.ezApi) && EzBoolean.isTrue(globalThis.ezApi.ready) &&
        EzObject.isValid(globalThis.ezApi.ezclocker[EzAccountPreferences.ezApiName])
        ? globalThis.ezApi.ezclocker[EzAccountPreferences.ezApiName]
        : null;

    /**
     * @static
     * @public @property @getter
     * Returns the singleton instance of this class that is registered with EzApi (if available yet)
     * @returns {EzAccountPreferences}
     */
    static get ezInstance() {
        return EzAccountPreferences.#ezInstance;
    }

    /**
     * @static
     * @public @property @setter
     * Sets the singleton instance of of this class that is registered with EzApi.
     * @param {EzAccountPreferences} instance
     */
    static set ezInstance(instance) {
        if (null != EzAccountPreferences.#ezInstance) {
            throw new Error('EzAccountPreferences\'s singleton instance is already reigstered with EzApi.');
        }

        EzAccountPreferences.#ezInstance = instance;
    }

    /**
     * @static
     * @private @field
     * Stores the EzApi registration state for this class.
     * Default value is NULL
     * Class is registerd with EzApi when value is EzRegistrationState.REGISTERED
     * @type {string}
     * A valid enum property value from EzRegistrationState
     */
    static #ezApiRegistrationState = EzObject.hasProperty(globalThis, 'ezApi') &&
        EzObject.isValid(globalThis.ezApi) && EzBoolean.isTrue(globalThis.ezApi.ready) &&
        EzObject.isValid(globalThis.ezApi.ezclocker[EzAccountPreferences.ezApiName])
        ? EzRegistrationState.REGISTERED
        : null;

    /**
     * @static
     * @public @property @getter
     * Returns the ezApi registration state of this classes's singleton instance.
     * @returns {string}
     * A valid enum property value from EzRegistrationState
     */
    static get ezApiRegistrationState() {
        return EzAccountPreferences.#ezApiRegistrationState;
    }

    /**
     * @static
     * @public @property @setter
     * Sets the ezApi registration state of this classes's singleton instance.
     * @param {string} ezApiRegistrationState
     * A valid enum property value from EzRegistrationState
     */
    static set ezApiRegistrationState(ezApiRegistrationState) {
        EzAccountPreferences.#ezApiRegistrationState = EzRegistrationState.ezValueOf(ezApiRegistrationState);
    }

    /**
     * @static
     * @private @readonly @property
     * Returns true when all required dependencies for this class report ready.
     * In otherwords, the require dependency's singleton instance is created
     * and is registered with and accessable from EzApi with ezApi.ezclocker.{dependency_name}.
     * @returns {boolean}
     */
    static get #ezCanRegister() {
        return EzRegistrationState.PENDING === EzAccountPreferences.ezApiRegistrationState &&
            EzObject.hasProperty(globalThis, 'ezApi') &&
            EzObject.isValid(globalThis.ezApi) && EzBoolean.isTrue(globalThis.ezApi.ready) &&

            globalThis.ezApi.ezclocker[EzDateTime.ezApiName] &&
            globalThis.ezApi.ezclocker[EzDateTime.ezApiName].ready &&

            globalThis.ezApi.ezclocker[EzElementEventName.ezApiName] &&
            globalThis.ezApi.ezclocker[EzElementEventName.ezApiName].ready &&

            globalThis.ezApi.ezclocker[EzFeatureToggles.ezApiName] &&
            globalThis.ezApi.ezclocker[EzFeatureToggles.ezApiName].ready &&

            globalThis.ezApi.ezclocker[EzClockerContextEventName.ezApiName] &&
            globalThis.ezApi.ezclocker[EzClockerContextEventName.ezApiName].ready &&

            globalThis.ezApi.ezclocker[EzClockerContext.ezApiName] &&
            globalThis.ezApi.ezclocker[EzClockerContext.ezApiName].ready;
    }

    /**
     * @static
     * @private @readonly @property
     * Returns if this class's singleton instance is registered with ezApi yet.
     * @returns {boolean}
    */
    static get #ezIsRegistered() {
        return null != EzAccountPreferences.ezInstance &&
            EzRegistrationState.REGISTERED === EzAccountPreferences.ezApiRegistrationState;
    }

    /**
     * @static
     * @private @method
     * Attempts to register the singleton instance for this class with ezApi. Returns true
     * if successful, false otherwise.
     * @returns {boolean}
     */
    static #ezRegistrator() {
        if (EzAccountPreferences.#ezCanRegister && !EzAccountPreferences.#ezIsRegistered) {
            globalThis.ezApi.ezRegisterNewApi(EzAccountPreferences, EzAccountPreferences.ezApiName);
        }

        return EzAccountPreferences.#ezIsRegistered;
    }

    /**
     * @static
     * Static Initialization
     * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
     * >> IMPORTANT <<
     * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
     * Make sure the following properties and methods get defined BEFORE this static initialization section:
     *     1) Property getter EzAccountPreferences.ezApiName
     *     2) Property getter EzAccountPreferences.ezEventNames
     *     3) Property getter EzAccountPreferences.ezInstance
     *     4) Property setter EzAccountPreferences.ezInstance
     *     5) Property getter EzAccountPreferences.ezApiRegistrationState
     *     6) Property setter EzAccountPreferences.ezApiRegistrationState
     *     7) Property getter EzAccountPreferences.#ezCanRegister
     *     8) Property getter EzAccountPreferences.#ezIsRegistered
     *     9) Method EzAccountPreferences.#ezRegistrator()
     */
    static {
        if (!EzAccountPreferences.#ezIsRegistered) {
            EzAccountPreferences.ezApiRegistrationState = EzRegistrationState.PENDING;

            if (!EzAccountPreferences.#ezRegistrator()) {
                document.addEventListener(
                    EzAccountPreferences.ezOnEzApiReadyEventName,
                    EzAccountPreferences.#ezRegistrator);

                document.addEventListener(
                    EzDateTime.ezEventNames.onReady,
                    EzAccountPreferences.#ezRegistrator);

                document.addEventListener(
                    EzElementEventName.ezEventNames.onReady,
                    EzAccountPreferences.#ezRegistrator);

                document.addEventListener(
                    EzFeatureToggles.ezEventNames.onReady,
                    EzAccountPreferences.#ezRegistrator);

                document.addEventListener(
                    EzClockerContextEventName.ezEventNames.onReady,
                    EzAccountPreferences.#ezRegistrator);

                document.addEventListener(
                    EzClockerContext.ezEventNames.onReady,
                    EzAccountPreferences.#ezRegistrator);
            }
        }
    }

    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    // NO CODE AFTER THIS SECTION
    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

}
