import {
    EzObject,
    EzBoolean,
    EzPromise
} from '/ezlibrary/helpers/EzHelpers.js';

import {
    EzRegistrationState
} from '/ezlibrary/enums/EzEnumerations.js';

import { EzDateTime } from '/public/javascript/common/ez-date-time.js';

import { EzUI } from '/public/javascript/common/ezui.js';

/**
    @class
    @description
    Provides date time utility methods.
    @deprecated
    Migrate to using just the functionality of EzDateTime methods and stop all use of this class. It will get
    removed in a future version.
 */
export class EzDateUtils {
    /**
        @public @static @readonly @property
        Returns the name of this class's singleton instance when registered with ezApi.
        @returns {String}
        @deprecated
        Migrate to EzDateTime functionality
     */
    static get ezApiName() {
        return 'ezDateUtils';
    }

    /**
        @public @static @readonly @property
        Returns an object of event names that this class may trigger.
        @returns {object}
        @deprecated
        Migrate to EzDateTime functionality
     */
    static get ezEventNames() {
        return {
            onReady: 'ezOn_EzDateUtils_Ready'
        };
    }

    /**
         @static
         @private @field
         Stores the singleton instance of this class that was created by and registerd with EzApi.
         @type {EzDateUtils}
         @deprecated
        Migrate to EzDateTime functionality
     */
    static #ezInstance = EzObject.hasProperty(globalThis, 'ezApi') &&
        EzObject.isValid(globalThis.ezApi) && EzBoolean.isTrue(globalThis.ezApi.ready) &&
        EzObject.isValid(globalThis.ezApi.ezclocker[EzDateUtils.ezApiName])
        ? globalThis.ezApi.ezclocker[EzDateUtils.ezApiName]
        : null;

    /**
        @static
        @public @property @getter
        Returns the singleton instance of this class that is registered with EzApi (if available yet)
        @returns {EzDateUtils}
        @deprecated
        Migrate to EzDateTime functionality
     */
    static get ezInstance() {
        return EzDateUtils.#ezInstance;
    }

    /**
        @static
        @public @property @setter
        Sets the singleton instance of of this class that is registered with EzApi.
        @param {EzDateUtils} instance
        @deprecated
        Migrate to EzDateTime functionality
     */
    static set ezInstance(instance) {
        if (null != EzDateUtils.#ezInstance) {
            throw new Error('EzDateUtils\'s singleton instance is already reigstered with EzApi.');
        }

        EzDateUtils.#ezInstance = instance;
    }

    /**
        @static
        @private @field
        Stores the EzApi registration state for this class.
        Default value is NULL
        Class is registerd with EzApi when value is EzRegistrationState.REGISTERED
        @type {string}
        A valid enum property value from EzRegistrationState
        @deprecated
        Migrate to EzDateTime functionality
     */
    static #ezApiRegistrationState = EzObject.hasProperty(globalThis, 'ezApi') &&
        EzObject.isValid(globalThis.ezApi) && EzBoolean.isTrue(globalThis.ezApi.ready) &&
        EzObject.isValid(globalThis.ezApi.ezclocker[EzDateUtils.ezApiName])
        ? EzRegistrationState.REGISTERED
        : null;

    /**
        @static
        @public @property @getter
        Returns the ezApi registration state of this classes's singleton instance.
        @returns {string}
        A valid enum property value from EzRegistrationState
        @deprecated
        Migrate to EzDateTime functionality
     */
    static get ezApiRegistrationState() {
        return EzDateUtils.#ezApiRegistrationState;
    }

    /**
        @static
        @public @property @setter
        Sets the ezApi registration state of this classes's singleton instance.
        @param {string} ezApiRegistrationState
        A valid enum property value from EzRegistrationState
        @deprecated
        Migrate to EzDateTime functionality
     */
    static set ezApiRegistrationState(ezApiRegistrationState) {
        EzDateUtils.#ezApiRegistrationState = EzRegistrationState.ezValueOf(ezApiRegistrationState);
    }

    /**
        @static
        @private @readonly @property
        Returns true when all required dependencies for this class report ready.
        In otherwords, the require dependency's singleton instance is created
        and is registered with and accessable from EzApi with ezApi.ezclocker.{dependency_name}.
        @returns {boolean}
        @deprecated
        Migrate to EzDateTime functionality
     */
    static get #ezCanRegister() {
        return EzRegistrationState.PENDING === EzDateUtils.ezApiRegistrationState &&
            EzObject.hasProperty(globalThis, 'ezApi') &&
            EzObject.isValid(globalThis.ezApi) && EzBoolean.isTrue(globalThis.ezApi.ready) &&

            globalThis.ezApi.ezclocker[EzDateTime.ezApiName] &&
            globalThis.ezApi.ezclocker[EzDateTime.ezApiName].ready &&

            globalThis.ezApi.ezclocker[EzUI.ezApiName] &&
            globalThis.ezApi.ezclocker[EzUI.ezApiName].ready;
    }

    /**
        @static
        @private @readonly @property
        Returns if this class's singleton instance is registered with ezApi yet.
        @returns {boolean}
        @deprecated
        Migrate to EzDateTime functionality
    */
    static get #ezIsRegistered() {
        return null != EzDateUtils.ezInstance &&
            EzRegistrationState.REGISTERED === EzDateUtils.ezApiRegistrationState;
    }

    /**
        @static
        @private @method
        Attempts to register the singleton instance for this class with ezApi. Returns true
        if successful, false otherwise.
        @returns {boolean}
        @deprecated
        Migrate to EzDateTime functionality
     */
    static #ezRegistrator() {
        if (EzDateUtils.#ezCanRegister && !EzDateUtils.#ezIsRegistered) {
            globalThis.ezApi.ezRegisterNewApi(EzDateUtils, EzDateUtils.ezApiName);
        }

        return EzDateUtils.#ezIsRegistered;
    }

    /**
        @static
        Static Initialization
        @deprecated
        Migrate to EzDateTime functionality
        ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        >> IMPORTANT <<
        ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        Make sure the following properties and methods get defined BEFORE this static initialization section:
            1) Property getter EzDateUtils.ezApiName
            2) Property getter EzDateUtils.ezEventNames
            3) Property getter EzDateUtils.ezInstance
            4) Property setter EzDateUtils.ezInstance
            5) Property getter EzDateUtils.ezApiRegistrationState
            6) Property setter EzDateUtils.ezApiRegistrationState
            7) Property getter EzDateUtils.#ezCanRegister
            8) Property getter EzDateUtils.#ezIsRegistered
            9) Method EzDateUtils.#ezRegistrator()
     */
    static {
        if (!EzDateUtils.#ezIsRegistered) {
            EzDateUtils.ezApiRegistrationState = EzRegistrationState.PENDING;

            if (!EzDateUtils.#ezRegistrator()) {
                document.addEventListener(
                    EzDateUtils.ezOnEzApiReadyEventName,
                    EzDateUtils.#ezRegistrator);

                document.addEventListener(
                    EzUI.ezEventNames.onReady,
                    EzDateUtils.#ezRegistrator);
            }
        }
    }

    /**
        @static
        @public @field
        @type {string}
     */
    static DEFAULT_MOMENT_DATE_FORMAT = EzDateTime.DEFAULT_MOMENT_DATE_FORMAT;

    /**
        @static
        @public @field
        @type {array}
     */
    static SUPPORTED_TIMEZONE_ABBR = EzDateTime.EZCLOCKER_SUPPORTED_TIMEZONES_ABBR;

    /**
        @public @constructor
        >> DO NOT CREATE NEW INSTANCES OUTSIDE OF THE STATIC INITIALIZATION FLOW <<
        Use the static singleton instance available from ezApi: ezApi.ezclocker.ezDateUtils.
        @deprecated
        Migrate to EzDateTime functionality
     */
    constructor() {
        this.ezStates.push(EzInstanceState.CONSTRUCTED);
    }

    /**
        @public @method
        Provides various date processing methods
        @returns {EzDateUtils}
        @deprecated
        Migrate to EzDateTime functionality
     */
    ezInit() {
        return EzDateUtils.ezInstance;
    }

    /**
        @public @method
        Converts a datepicker date to a moment
        @deprecated
        Use ezApi.ezclocker.ezDateTime.ezMomentFromDatePickerStartOfDay or
        ezApi.ezclocker.ezDateTime.ezMomentFromDatePickerEndOfDay
     */
    ezMomentFromPicker(pickerId) {
        if (ezApi.ezStringHasLength(pickerId)) {
            return null;
        }

        let jsDate = ezApi.ezclocker.ezUi.ezId(pickerId).datepicker('getDate');

        return ezApi.ezclocker.ezDateTime.ezNow()
            .startOf('day')
            .year(jsDate.getFullYear())
            .month(jsDate.getMonth())
            .date(jsDate.getDate());
    }

    /**
        @public @method
        Applies the time pickers time to the moment (ignoring the timezone on the time picker date).
        Assumes the moment instance is in the needed timezone already.
        @param {moment} aMoment
        @param {string} timePickerId
        @deprecated Use ezApi.ezclocker.ezDateTime.ezAppendTimeFromTimePicker(timePickerId, aMoment)
     */
    ezApplyTimepickerTimeToMoment(aMoment, timePickerId) {
        if (!EzObject.isValid(aMoment) || !ezApi.ezStringHasLength(timePickerId)) {
            return aMoment;
        }

        let jsDate = ezApi.ezclocker.ezUi.ezId(timePickerId).timepicker('getTimeAsDate');

        aMoment.hour(jsDate.getHours());

        aMoment.minute(jsDate.getMinutes());

        aMoment.second(0);

        aMoment.millisecond(0);

        return aMoment;
    }

    /**
        @public @method
        Calculates the actual date for the provided day relative to the selectedMoment
        taking into account the day the week will start within.
        @param {moment} selectedMoment
        @param {int} weekStartDay
        @param {int} dayInWeek
        @returns {moment}
        @deprecated
        Migrate to method or property from EzDateTime
     */
    ezCalculateMomentForDayInWeek(selectedMoment, weekStartDay, dayInWeek) {
        let selectedDatMoment = selectedMoment.startOf('day');

        let momentInWeek = ezApi.ezclocker.ezDateTime.ezCreateFromMoment(selectedDatMoment);

        let selectedDay = selectedDatMoment.get('day');

        if (selectedDay > dayInWeek) {
            momentInWeek = momentInWeek.subtract(
                selectedDay - dayInWeek,
                'days');
        } else if (selectedDay < dayInWeek) {
            momentInWeek = momentInWeek.add(
                dayInWeek - selectedDay,
                'days');
        }

        if (dayInWeek < weekStartDay) {
            momentInWeek = momentInWeek.add(
                7,
                'days');
        }

        return momentInWeek;
    }

    /**
        @public @method
        Returns the provided moment as a string formatted as MM/DD/YYYY
        See https://momentjs.com/docs/#/displaying/ for formatting
        @param {moment} moment
        @returns {string}
        @deprecated
        Migrate to: zApi.ezclocker.ezDateTime.ezNow().format(EzDateTime.DEFAULT_MOMENT_DATE_FORMAT);
     */
    ezMomentDateDisplay(moment) {
        if (!EzObject.isValid(moment)) {
            return '';
        }

        return ezApi.ezclocker.ezDateTime.ezNow()
            .format(EzDateTime.DEFAULT_MOMENT_DATE_FORMAT);
    }

    /**
        @public @method
        Returns the time in the moment formatted as: hh:mm a
        See 'https://momentjs.com/docs/#/displaying' for formatting
        @param {moment} aMoment
        @returns {string}
        @deprecated
        Migrate to:
        ezApi.ezclocker.ezDateTime.ezMomentWithPTZ(aMoment).format(EzDateUtils.DEFAULT_MOMENT_TIME_FORMAT);
     */
    ezMomentTimeDisplay(aMoment) {
        if (!EzObject.isValid(aMoment)) {
            return '';
        }

        return ezApi.ezclocker.ezDateTime.ezMomentWithPTZ(aMoment)
            .format(EzDateTime.DEFAULT_MOMENT_TIME_FORMAT);
    }

    /**
        @public @method
        Attempts to use moment.js + moment-timezone first, then falls back to using
        jstz, and finally simply reports UTC.
        @param {boolean} ignoreOption
        Set the ignore option to true to get the actual browser timezone, otherwise, the value set as the employer
        selected timezone is used instead.
        @returns {string}
        User's preferred timezone id
        @deprecated
        Migrate to:
        ezApi.ezclocker.ezDateTime.activeTimeZone() or
        ezApi.ezclocker.ezDateTime.ezGuessLocalTimeZone()
     */
    ezGetBrowserTimezone(ignoreOption) {
        if (ignoreOption) {
            return ezApi.ezclocker.ezDateTime.ezGuessLocalTimeZone();
        }

        return ezApi.ezclocker.ezDateTime.activeTimeZone;
    }

    /**
        @public @method
        Gets the current date as a string
        @returns {String}
        @deprecated
        Migrate to: ezApi.ezclocker.ezDateTime.ezNow().format(ezApi.ezclocker.ezDateTime.ezGetPreferredDisplayDateFormat())
     */
    ezGetCurrentDateAsString() {
        return ezApi.ezclocker.ezDateTime.ezNow()
            .format(ezApi.ezclocker.ezDateTime.ezGetPreferredDisplayDateFormat());
    }

    /**
        @public @method
        Returns a moment instance with timezone set the the browser's current time zone.
        @param {string} isoDateTime
        @deprecated
        Migrate to: ezApi.ezclocker.ezDateTime.ezCreateFromIso() directly
     */
    ezIsoToMomentWithBrowserTimezone(isoDateTime) {
        return ezApi.ezclocker.ezDateTime.ezCreateFromIso(isoDateTime);
    }

    /**
        @public @method
        Returns the timezones in JSON format:
        {
        "value": "Central Standard Time",
        "abbr": "CDT",
        "offset": -5,
        "isdst": true,
        "text": "(UTC-06:00) Central Time (US & Canada)",
        "utc": [
        "America/Chicago",
        "America/Indiana/Knox",
        "America/Indiana/Tell_City",
        "America/Matamoros",
        "America/Menominee",
        "America/North_Dakota/Beulah",
        "America/North_Dakota/Center",
        "America/North_Dakota/New_Salem",
        "America/Rainy_River",
        "America/Rankin_Inlet",
        "America/Resolute",
        "America/Winnipeg",
        "CST6CDT"
        ]},
        @returns {array}
        @deprecated
        Migrate to: ezApi.ezclocker.ezDateTime.ezAllKnownTimeZones
     */
    ezGetAvailableTimeZones() {
        return EzPromise.resolve(ezApi.ezclocker.ezDateTime.ezAllKnownTimeZones);
    }

    /**
        @public @method
        Load the supported time zones
        @deprecated
        Migrate to: ezApi.ezclocker.ezDateTime.ezSupportedTimeZones
     */
    ezLoadSupportedTimeZones() {
        return ezApi.ezclocker.ezDateTime.ezSupportedTimeZones;
    }

    /**
        @public @method
        Returns the date that represents the Monday for the week the provided date is within. If the provided dateInWeek
        is not valid, the method will act upon the current date.
        @param {moment|date|string} aDateInWeek
        @returns {moment}
        @deprecated
        Migrate to using a property or method from EzDateTime
     */
    ezFindMondayDateForDateInWeek(aDateInWeek) {
        if (!EzObject.isValid(aDateInWeek)) {
            return null;
        }

        let momentInWeek = ezApi.ezclocker.ezDateTime.ezCreateFromValue(aDateInWeek);

        let day = momentInWeek.getDay();

        if (0 === day) {
            // sunday
            return ezApi.ezclocker.ezDateTime.ezCreateFromMoment(momentInWeek)
                .subtract(6, 'days');
        }

        if (1 === day) {
            // Monday
            return momentInWeek;
        }

        return ezApi.ezclocker.ezDateTime.ezCreateFromMoment(momentInWeek)
            .subtract(day - 1, 'days');
    }

    /**
        @public @method
        Evaluates the passed dateString, if it is a valid date, the dateString is returned. Otherwise,
        the current date is returned.
        @param {string} dateString
        @returns {string}
        @deprecated
        Migrate to method or property from EzDateTime
     */
    ezValidDateStringOrNow(dateString) {
        return EzDateUtils.ezInstance.ezValidDateString(
            dateString,
            EzDateUtils.ezInstance.ezCurrentDateString());
    }

    /**
        @public @method
        Validates the pendingDateString, if valid, returns pendingDateString. Otherwise, returns defaultDateString
        @param {string} pendingDateString
        @param {string} defaultDateString
        @returns {string}
        @deprecated
        Migrate to method or property from EzDateTime
     */
    ezValidDateString(pendingDateString, defaultDateString) {
        try {
            let pendingDate = ezApi.ezclocker.ezDateTime.ezCreateFromValue(pendingDateString);

            if ('Invalid Date' === pendingDate.toString()) {
                return EzDateUtils.ezInstance.ezCurrentDateString();
            }

            return pendingDateString;
        } catch (ex) {
            return defaultDateString;
        }
    }

    /**
        @public @method
        Returns the current time zone for the browser
        @returns {moment}
        @deprecated
        Migrate to: ezApi.ezclocker.ezDateTime.activeTimeZone
     */
    ezCurrentTimeZone() {
        return ezApi.ezclocker.ezDateTime.activeTimeZone;
    }

    /**
        @public @method
        Gets the current moment as a string
        @returns {String}
        @deprecated
        Migrate to: ezApi.ezclocker.ezDateTime.ezNow().format(ezApi.ezclocker.ezDateTime.ezGetPreferredDisplayDateFormat())
     */
    ezCurrentDateString() {
        return ezApi.ezclocker.ezDateTime
            .ezNow()
            .format(ezApi.ezclocker.ezDateTime.ezGetPreferredDisplayDateFormat());
    }

    /**
        @public @method
        Returns the current date as a Date object.
        @returns {moment}
        @deprecated
        Migrate to: ezApi.ezclocker.ezDateTime.ezNow();
     */
    ezCurrentDate() {
        return ezApi.ezclocker.ezDateTime.ezNow();
    }

    /**
        @public @method
        Returns a moment from an ISO8601 String
        @param isostr
        @returns {moment}
        @deprecated
        Migrate to: ezApi.ezclocker.ezDateTime.ezCreateFromIso(isoStr);
     */
    dateFromISO8601(isoStr) {
        return ezApi.ezclocker.ezDateTime.ezCreateFromIso(isoStr);
    }
}
