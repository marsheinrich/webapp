// TODO: Enable these imports once momentjs is removed from all HTML files
/*
import { moment } from 'moment';
import { moment-timezone } 'moment-timezone';
*/

import {
    EzException,
    EzBadParamException
} from '/ezlibrary/exceptions/EzExceptions.js';

import {
    EzObject,
    EzBoolean,
    EzNumber,
    EzString,
    EzArray,
} from '/ezlibrary/helpers/EzHelpers.js';

import {
    EzRegistrationState,
    EzClockerContextEventName,
    EzLocale
} from '/ezlibrary/enums/EzEnumerations.js';

import { EzClass } from '/ezlibrary/EzClass.js';
import { EzEventEngine } from '/ezlibrary/ez-event-engine.js';

import { EzOptionsService } from '/public/javascript/services/ezclocker-options.js';

import { EzEmployerOption } from '/ezlibrary/EzEmployerOption.js';

/**
    Represents a DateTime for ezclocker
    ---------------------------------------------------------------------------
    Import with:
        import { EzDateTime, ezDateTime } from '/public/javascript/common/ez-date-time.js';
    ---------------------------------------------------------------------------
        globalThis.ezApi.ezclocker?.[EzDateTime.ezApiName]?.ready
    ---------------------------------------------------------------------------
        document.addEventListener(
            EzDateTime.ezEventNames.onReady,
            this.#ezRegistrator);
    ---------------------------------------------------------------------------
 */
export class EzDateTime extends EzClass {
    /**
     * @static
     * @public @method
     * Determines if the provided timeZoneId is considered value.
     * @param {undefined|null|string} timeZoneId
     * @returns {boolean}
     */
    static ezIsValidTimeZone(timeZoneId) {
        if (!EzString.hasLength(timeZoneId)) {
            return false;
        }

        return EzObject.isValid(moment.tz.zone(timeZoneId));
    }

    /**
     * @static
     * @public @readonly @property
     * Returns format string for: 8:30 PM
     * @returns {string}
     */
    static get SHORT_TIME_FORMAT() {
        return 'LT';
    }

    /**
     * @static
     * @public @readonly @property
     * Returns format string for: 8:30:25 PM
     * @returns {string}
     */
    static get SHORT_TIME_WITH_SECONDS_FORMAT() {
        return 'LTS';
    }

    /**
     * @static
     * @public @readonly @property
     * Returns format string for: 09/04/1986
     * @returns {string}
     */
    static get TWO_DIGIT_SHORT_DATE() {
        return 'L'
    }

    /**
     * @static
     * @public @readonly @property
     * Returns format string for: 9/4/1986
     * @returns {string}
     */
    static get SHORT_DATE() {
        return 'l';
    }

    /**
     * @static
     * @public @readonly @property
     * Returns format string for: September 4, 1986
     * @returns {string}
     */
    static get LONG_MONTH_DATE_FORMAT() {
        return 'LL';
    }

    /**
     * @static
     * @public @readonly @property
     * Returns format string for: Sep 4, 1986
     * @returns {string}
     */
    static get SHORT_MONTH_DATE_FORMAT() {
        return 'll';
    }

    /**
     * @static
     * @public @readonly @property
     * Returns format string for: September 4, 1986 8:30 PM
     * @returns {string}
     */
    static get LONG_MONTH_DATE_SHORT_TIME_FORMAT() {
        return 'LLL';
    }

    /**
     * @static
     * @public @readonly @property
     * Returns format string for: Sep 4, 1986 8:30 PM
     * @returns {string}
     */
    static get SHORT_MONTH_DATE_SHORT_TIME_FORMAT() {
        return 'lll'
    }

    /**
     * @static
     * @public @readonly @property
     * Returns format string for: Thursday, September 4, 1986 8:30 PM
     * @returns {string}
     */
    static LONG_MONTH_DAY_DATE_SHORT_TIME_FORMAT() {
        return 'LLLL';
    }

    /**
     * @static
     * @public @readonly @property
     * Returns format string for: Thu, Sep 4, 1986 8:30 PM
     * @returns {string}
     */
    static SHORT_MONTH_DAY_DATE_SHORT_TIME_FORMAT() {
        return 'llll';
    }

    /**
     * @public @static @readonly @property
     * Returns the default display date and time format string for moment.js
        Format string: 'L LT'
     * Returns in localized format: 09/04/1986 8:30 PM
     * @returns {string}
     */
    static get DEFAULT_DISPLAY_DATE_TIME() {
        return 'L LT'
    }

    /**
     * @public @static @readonly @property
     * Returns the default display date and time with seconds format string for moment.js
        Format string: 'L LTS'
     * Returns in localized format: 09/04/1986 8:30:25 PM
     */
    static get DEFAULT_DISPLAY_DATE_TIME_WITH_SECONDS() {
        return 'L LTS';
    }

    /**
     * @public @static @readonly @property
     * Returns the default display date format string for moment.js
        Format string: 'L'
     * Returns in localized format: 09/04/1986
     * @returns {string}
     */
    static get DEFAULT_MOMENT_DATE_FORMAT() {
        return 'L';
    }

    /**
     * @static
     * @public @readonly @property
     * Returns the format string for displaying the date as: MM/YYYY
     * @returns {string}
     */
    static get DEFAULT_MONTH_YEAR_DISPLAY_FORMAT() {
        return 'MM/YYYY';
    }

    /**
     * @public @static @readonly @property
     * Returns the default display day and date format string for moment.js
        Format string: 'dddd L'
     * Returns in localized format: Thursday 09/04/1986
     */
    static get DEFAULT_MOMENT_DAY_NAME_DATE_FORMAT() {
        return 'ddd L';
    }

    /**
     * @public @static @readonly @property
     * Returns the default time display without seconds format string for moment.js
        Format string: 'LT'
     * Returns in localized format: 8:30 PM
     * @returns {string}
     */
    static get DEFAULT_MOMENT_HH_MM_TIME_FORMAT() {
        return 'LT';
    }

    /**
     * @public @static @readonly @property
     * Returns the default time display format string for moment.js
        Format string: 'LTS'
     * Returns in localized format: 8:30:25 PM
     * @returns {string}
     */
    static get DEFAULT_MOMENT_HH_MM_SS_TIME_FORMAT() {
        return 'LTS'
    }

    /**
     * @public @static @readonly @property
     * Returns the REGEX value for validation ISO dates.
     * @returns {regex}
     */
    static get ISO_VALIDATION_REGEX() {
        return /^([\+-]?\d{4}(?!\d{2}\b))((-?)((0[1-9]|1[0-2])(\3([12]\d|0[1-9]|3[01]))?|W([0-4]\d|5[0-2])(-?[1-7])?|(00[1-9]|0[1-9]\d|[12]\d{2}|3([0-5]\d|6[1-6])))([T\s]((([01]\d|2[0-3])((:?)[0-5]\d)?|24\:?00)([\.,]\d+(?!:))?)?(\17[0-5]\d([\.,]\d+)?)?([zZ]|([\+-])([01]\d|2[0-3]):?([0-5]\d)?)?)?)?$/;
    }

    static get DEFAULT_MM_DD_YYYY_FORMAT() {
        return 'MM/DD/YYYY';
    }

    /**
     * @public @static @readonly @property
     * Returns the default date picker display format string.
     * @returns {string}
     */
    static get DEFAULT_DATE_PICKER_FORMAT() {
        return 'mm/dd/yy';
    }

    /**
     * @public @static @readonly @property
     * Returns the default date and time display format string for moment.js.
     * @returns {regex}
     */
    static get DEFAULT_MOMENT_DATE_TIME_FORMAT() {
        return `${this.DEFAULT_MOMENT_DATE_FORMAT}[ at ]${this.DEFAULT_MOMENT_HH_MM_TIME_FORMAT}`.trim();
    }

    /**
     * @public @static @readonly @property
     * Returns the default date and time display format (with seconds) string for moment.js.
     * @returns {regex}
     */
    static get DEFAULT_MOMENT_DATE_TIME_WITH_SECONDS_FORMAT() {
        return `${this.DEFAULT_MOMENT_DATE_FORMAT}[ at ]${this.DEFAULT_MOMENT_HH_MM_SS_TIME_FORMAT}`.trim();
    }

    /**
     * @public @static @readonly @property
     * Returns the default date picker display format string.
     * @returns {string}
     */
    static get DEFAULT_MONTH_DAY_YEAR_FORMAT() {
        return this.DEFAULT_DATE_PICKER_FORMAT;
    }

    /**
     * @private @static @field
        Stores the reference to EzDateTime's singleton instance registered with ezApi.
     */
    static #ezInstance = Object.hasOwn(globalThis, 'ezApi') &&
        globalThis.ezApi &&
        Object.hasOwn(globalThis.ezApi, 'ezclocker') &&
        globalThis.ezApi.ezclocker &&
        Object.hasOwn(globalThis.ezApi.ezclocker, EzDateTime.ezApiName) &&
        globalThis.ezApi.ezclocker[EzDateTime.ezApiName]
        ? globalThis.ezApi.ezclocker[EzDateTime.ezApiName]
        : null;

    /**
     * @public @static @field
     * @type {string}
     */
    static #ezApiRegistrationState = null;

    /**
     * @public @static @getter @property
     * Returns the singleton instance of EzDateTime registered with EzApi (if available yet)
     */
    static get ezInstance() {
        return EzDateTime.#ezInstance;
    }

    /**
     * @public @static @getter @property
     * Returns the singleton instance of EzDateTime registered with EzApi (if available yet)
     */
    static set ezInstance(aEzDateTime) {
        if (null != EzDateTime.#ezInstance) {
            throw new Error('EzDateTime\'s singleton instance is already reigstered with EzApi.');
        }

        EzDateTime.#ezInstance = aEzDateTime;
        if (null != EzDateTime.#ezInstance) {
            EzDateTime.ezApiRegistrationState = EzRegistrationState.REGISTERED;
        }
    }

    /**
     * @public @static @property @getter
     * Returns the ezApi registration state of this classes's singleton instance.
     * @returns {string}
     * A valid enum property value from EzRegistrationState
     */
    static get ezApiRegistrationState() {
        return EzDateTime.#ezApiRegistrationState;
    }

    /**
     * @public @static @property @setter
     * Sets the ezApi registration state of this classes's singleton instance.
     * @param {string} ezApiRegistrationState
     * A valid enum property value from EzRegistrationState
     */
    static set ezApiRegistrationState(ezApiRegistrationState) {
        EzDateTime.#ezApiRegistrationState = ezApiRegistrationState;
    }

    /**
     * @public @static @readonly @property
     * Returns the name of this class's singleton instance when registered with ezApi.
     * @returns {string}
     */
    static get ezApiName() {
        return 'ezDateTime';
    }

    /**
     * @public @static @readonly @property
     * Returns an object of event names triggered by EzDateTime
     * @returns {object}
     */
    static get ezEventNames() {
        return {
            onReady: 'ezOn_EzDateTime_Ready',
            onActiveTimeZoneChanged: 'ezOn_EzDateTime_ActiveTimeZone_Changed',
            onSupportedTimeZonesReady: 'ezOn_EzDateTime_SupportedTimeZones_Ready'
        };
    }

    /**
     * @public @static @readonly @property
     * Returns if all necessary dependences are ready and therefore it is ok for this class to
        register it's singleton instance with ezApi.
     * @returns {boolean}
     */
    static get ezCanRegister() {
        return EzRegistrationState.PENDING === EzDateTime.ezApiRegistrationState &&
            Object.hasOwn(globalThis, 'ezApi') &&
            globalThis?.ezApi?.ready && globalThis?.ezApi?.ezclocker &&
            globalThis.ezApi.ezclocker?.[EzClockerContextEventName.ezApiName]?.ready &&
            globalThis.ezApi.ezclocker?.[EzEventEngine.ezApiName]?.ready &&
            globalThis.ezApi.ezclocker?.[EzOptionsService.ezApiName]?.ready;
    }

    /**
     * @private @static @method
        Attempts to register the singleton instance for this class with ezApi. Returns true
        if successful, false otherwise.
     * @returns {boolean}
     */
    static #ezRegistrator() {
        if (EzDateTime.ezCanRegister) {
            globalThis.ezApi.ezRegisterNewApi(EzDateTime, EzDateTime.ezApiName);
        }

        return EzDateTime.#isRegistered;
    }

    /**
     * @private @static @readonly @property
     * Returns if this class's singleton instance is registered with ezApi yet.
     * @returns {boolean}
     */
    static get #isRegistered() {
        return null != EzDateTime.ezInstance &&
            EzRegistrationState.REGISTERED === EzDateTime.ezApiRegistrationState;
    }

    // Static initilization block
    static {
        if (!EzDateTime.#isRegistered && null == EzDateTime.ezApiRegistrationState) {
            EzDateTime.ezApiRegistrationState = EzRegistrationState.PENDING;

            if (!EzDateTime.#ezRegistrator()) {
                document.addEventListener(
                    'onEzApiReady',
                    () => {
                        if (!EzDateTime.#ezRegistrator()) {
                            document.addEventListener(
                                EzClockerContextEventName.ezEventNames.onReady,
                                EzDateTime.#ezRegistrator);

                            document.addEventListener(
                                EzEventEngine.ezEventNames.onReady,
                                EzDateTime.#ezRegistrator);

                            document.addEventListener(
                                EzOptionsService.ezEventNames.onReady,
                                EzDateTime.#ezRegistrator);
                        }
                    });
            }
        }
    }

    /**
     * @static
     * @public @readonly @property
     * Returns an array of ezClocker supported time zone abbreviations.
     * From timezones.json, object: {
            "value": <string>,
            "abbr": <string>, (value stored in this array)
            "offset": <number>,
            "isdst": <boolean>,
            "text": <string>,
            "utc": [
              <string>,
              ...
              <string>
            ]
  },
        }
     * @returns {array}
     */
    static get EZCLOCKER_SUPPORTED_TIMEZONES_ABBR() {
        return [
            'HST', // Hawaiian Standard Time
            'AKDT', // Alaskan Standard Time
            'PDT', // Pacific Daylight Time
            'PST', // Pacific Standard Time
            'UMST', // US Mountain Standard Time
            'MDT', // Mountain Standard Time
            'CDT', // Central Standard Time
            'CCST', // Canada Central Standard Time
            'EDT', // Eastern Daylight Time
            'UEDT', // US Eastern Standard Time
            'WPST', // West Pacific Standard Time
        ];
    }

    /**
     * @public @field
     * @type {string}
     */
    ezPreferredDisplayDateTimeFormat = EzDateTime.DEFAULT_DISPLAY_DATE_TIME;

    /**
     * @public @field
     * @type {string}
     */
    ezPreferredDateFormat = EzDateTime.DEFAULT_MOMENT_DATE_FORMAT;

    /**
     * @public @field
     * @type {string}
     */
    ezPreferredDateTimeFormat = EzDateTime.DEFAULT_MOMENT_DATE_TIME_FORMAT;

    /**
     * @public @field
     * @type {string}
     */
    ezPreferredDateTimeWithSecondsFormat = EzDateTime.DEFAULT_MOMENT_DATE_TIME_WITH_SECONDS_FORMAT;

    /**
     * @public @field
     * @type {string}
     */
    ezPreferredDatePickerFormat = EzDateTime.DEFAULT_DATE_PICKER_FORMAT;

    /**
     * @public @field
     * @type {string}
     */
    ezPreferredMomentDayNameAndDateFormat = EzDateTime.DEFAULT_MOMENT_DAY_NAME_DATE_FORMAT;

    /**
     * @private @field
        Stores the preferred locale to use
     * @type {string}
     * A valid enum property value from EzLocale
     */
    #ezPreferredLocale = EzLocale.DEFAULT;
    /**
     * @public @property @getter
     * Gets the preferred locale to use
     * @returns {string}
     * A valid enum property value from EzLocale
     */
    get ezPreferredLocale() {
        return this.#ezPreferredLocale;
    }
    /**
     * @public @property @setter
     * Sets the preferred locale to use
     * @param {string} ezLocale
     * A valid enum property value from EzLocale
     */
    set ezPreferredLocale(ezLocale) {
        this.#ezPreferredLocale = EzLocale.ezLocaleForValue(ezLocale);

        // Inject the locale into the browser document
        this.ezInjectMomentLocaleIntoDocument();

        // Set the moment.js locale to the preferred
        // TODO: Finish locale work
        //moment.locale(this.#ezPreferredLocale);
    }

    /**
     * @public @field
     * @type {boolean}
     */
    ezLoadedPreferredTimeZoneOption = false;

    /**
     * @public @field
        Stores if the preferred locale option was loaded yet
     * @type {boolean}
     */
    ezLoadedPreferredLocaleOption = false;

    /**
     * @private @field
        Stores the current active time zone id
     * @returns {string}
     */
    #activeTimeZone = null;

    /**
     * @public @property
     * @returns {string}
     */
    get activeTimeZone() {
        if (null == this.#activeTimeZone) {
            this.activeTimeZone = this.ezGuessLocalTimeZone();
        }

        return this.#activeTimeZone;
    }

    /**
     * @public @property
     * @param {string}
     */
    set activeTimeZone(timeZoneId) {
        timeZoneId = !EzString.hasLength(timeZoneId) || '0' === timeZoneId || ' ' === timeZoneId ||
            'AUTOMATIC' === timeZoneId
            ? this.ezGuessLocalTimeZone()
            : timeZoneId;

        if (this.#activeTimeZone !== timeZoneId) {
            try {
                this.#activeTimeZone = timeZoneId;

                moment.tz.setDefault(timeZoneId);
            } catch (err) {
                this.#activeTimeZone = ezApi.ezclocker.ezDateTime.ezGuessLocalTimeZone();

                moment.tz.setDefault(this.#activeTimeZone);
            }

            ezApi.ezclocker.ezEventEngine.ezTriggerEvent(
                EzDateTime.ezEventNames.onActiveTimeZoneChanged,
                ezApi.ezclocker.ezEventEngine.ezBuildEventData(
                    EzDateTime.ezApiName,
                    'Active time zone changed.',
                    this.activeTimeZone));
        }
    }

    /**
     * @public @readonly @property
     * Returns the event names triggered by EzDateTime
     * @returns {object}
     * @deprecated
     * Migrate to:
     * The satic EzDateTime.ezEventNames property: EzDateTime.ezEventNames
     */
    get ezEventNames() {
        return EzDateTime.ezEventNames;
    }

    /**
     * @public @readonly @property
     * Returns the browser's default language (locale)
     * @returns {string}
     */
    get ezBrowserLanguage() {
        let lang = navigator.language;

        return EzString.hasLength(lang)
            ? lang
            : EzLocale.DEFAULT;
    }

    /**
     * @public @readonly @property
     * Returns EzLocale based upon the browser default language
     * @returns {string}
     * A valid enum property value from EzLocale
     */
    get ezBrowserLocale() {
        let browserLang = this.ezBrowserLanguage;

        return EzLocale.ezLocaleForValue(
            2 <= browserLang.length
                ? browserLang
                    .slice(0, 2)
                    .toUpperCase()
                : browserLang.toUpperCase());
    }

    /**
     * @private @field
        Stores the all the known time zones
     * @type {array}
     */
    #ezAllKnownTimeZones = [];
    /**
     * @public @property @getter
     * Gets the all the known time zones
     * @returns {array}
     */
    get ezAllKnownTimeZones() {
        return this.#ezAllKnownTimeZones;
    }
    /**
     * @public @property @setter
     * Sets the all the known time zones
     * @param {array} ezAllKnownTimeZones
     */
    set ezAllKnownTimeZones(ezAllKnownTimeZones) {
        this.#ezAllKnownTimeZones = EzArray.arrayOrEmpty(ezAllKnownTimeZones);
    }

    /**
     * @private @field
        Stores the supported time zones
     * @type {array}
     */
    #ezSupportedTimeZones = [];
    /**
     * @public @property @getter
     * Gets
     * @returns {array}
     */
    get ezSupportedTimeZones() {
        return this.#ezSupportedTimeZones;
    }
    /**
     * @public @property @setter
     * Sets
     * @param {array} ezSupportedTimeZones
     */
    set ezSupportedTimeZones(ezSupportedTimeZones) {
        this.#ezSupportedTimeZones = EzArray.arrayOrEmpty(ezSupportedTimeZones);
    }

    /**
     * @protected
        Initializes EzDateTime
     * @returns {EzDateTime}
     */
    ezInit() {
        ezApi.ezclocker.ezEventEngine.ezRegisterEvent(
            EzDateTime.ezApiName,
            EzDateTime.ezEventNames.onActiveTimeZoneChanged);

        ezApi.ezclocker.ezEventEngine.ezRegisterEvent(
            EzDateTime.ezApiName,
            EzDateTime.ezEventNames.onSupportedTimeZonesReady);

        ezApi.ezclocker.ezEventEngine.ezWantEvent(
            EzDateTime.ezEventNames.onActiveTimeZoneChanged,
            EzDateTime.ezApiName,
            EzDateTime.ezInstance.ezDisplayActiveTimezone);

        ezApi.ezclocker.ezEventEngine.ezWantEvent(
            EzClockerContextEventName.onSelectedEmployerAccountReady,
            EzDateTime.ezApiName,
            EzDateTime.ezInstance.ezLoadSelectedEmployerPreferredTimezoneOption,
            true);

        // This event hook must use the string as the EzClockerContext
        // might not be available by the time this object is initialized.
        ezApi.ezclocker.ezEventEngine.ezWantEvent(
            EzClockerContextEventName.onActiveEmployerReady,
            EzDateTime.ezApiName,
            EzDateTime.ezInstance.ezLoadActiveEmployerPreferredTimezoneOption,
            true);

        EzDateTime.ezInstance.ezLoadActiveEmployerPreferredTimezoneOption();

        EzDateTime.ezInstance.ezLoadAuthenticatedUserPreferredLocaleOption();

        EzDateTime.ezInstance.ezLoadSupportedTimeZones();

        return EzDateTime.ezInstance;
    }

    /**
     * @public @method
     * Sets the active time zone to the active employer's preffered timezone option value.
     * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
     * ENGINEERING NOTES
     * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
     * Selected Employer is only available when user is an Employer or
     * Manager account.
     * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
     */
    ezLoadSelectedEmployerPreferredTimezoneOption() {
        if (EzBoolean.isTrue(EzDateTime.ezInstance.ezLoadedPreferredTimeZoneOption)) {
            // Already loaded
            return;
        }

        if (EzBoolean.isTrue(globalThis.ezApi.ezclocker['ezClockerContext']?.ready) &&
            EzBoolean.isTrue(globalThis.ezApi.ezclocker['ezClockerContext']?.ezActiveEmployerReady)) {
            EzDateTime.ezInstance.ezLoadedPreferredTimeZoneOption = true;

            EzDateTime.ezInstance.activeTimeZone = ezApi.ezclocker.ezClockerContext.ezReadSelectedEmployerAccountOption(
                EzEmployerOption.EZOPTION_PREFERRED_TIMEZONE,
                'AUTOMATIC');
        }
    }

    /**
     * @protected @method
        Loads the authenticated users's preferred locale option
     */
    ezLoadAuthenticatedUserPreferredLocaleOption() {
        if (EzBoolean.isTrue(EzDateTime.ezInstance.ezLoadedPreferredLocaleOption)) {
            // Already loaded
            return;
        }

        // Sets the locale from the browser's navigator.language property
        EzDateTime.ezInstance.ezPreferredLocale = EzDateTime.ezInstance.ezBrowserLocale;

        if (EzBoolean.isTrue(globalThis.ezApi.ezclocker['ezClockerContext']?.ready) &&
            EzBoolean.isTrue(ezApi.ezclocker.ezClockerContext.ezGetUserContext().ready)) {

            // TODO: Add user level options and ready the preferred locale value

            EzDateTime.ezInstance.ezLoadedPreferredLocaleOption = true;
        }
    }

    /**
     * @protected
     * Sets the active time zone to the active employer's preffered timezone option value.
     */
    ezLoadActiveEmployerPreferredTimezoneOption() {
        if (EzBoolean.isTrue(EzDateTime.ezInstance.ezLoadedPreferredTimeZoneOption)) {
            // Already loaded
            return;
        }

        if (EzBoolean.isTrue(globalThis.ezApi.ezclocker['ezClockerContext']?.ready) &&
            EzBoolean.isTrue(ezApi.ezclocker.ezClockerContext.ezActiveEmployerReady)) {
            EzDateTime.ezInstance.activeTimeZone = ezApi.ezclocker.ezClockerContext.ezReadActiveEmployerOption(
                EzEmployerOption.EZOPTION_PREFERRED_TIMEZONE,
                'AUTOMATIC');

            EzDateTime.ezInstance.ezLoadedPreferredTimeZoneOption = true;
        }
    }

    /**
     * @public @method
        Load the supported time zones
     * @deprecated
     * Migrate to using a property or method from EzDateTime
     */
    ezLoadSupportedTimeZones() {
        // Reset the lists
        this.#ezAllKnownTimeZones = [];

        this.#ezSupportedTimeZones = [];

        ezApi.ezclocker.ezHttpHelper.ezGet(
            ezApi.ezclocker.ezNavigation.ezGetUrlFromBase('public/javascript/common/timezones.json'))
            .then(
                (timezonesResponse) => {
                    timezonesResponse.sort(
                        (left, right) => {
                            if (left.value === right.value) {
                                return 0;
                            }

                            return left.value < right.value
                                ? -1
                                : 1;
                        });

                    EzDateTime.ezInstance.ezAllKnownTimeZones = timezonesResponse;

                    //EzDateTime.ezInstance.ezSupportedTimeZones.push(ezApi.ezclocker.ezDateTime.activeTimeZone);

                    for (let timeZone of EzDateTime.ezInstance.ezAllKnownTimeZones) {
                        if (-1 !== EzDateTime.EZCLOCKER_SUPPORTED_TIMEZONES_ABBR.indexOf(timeZone.abbr)) {
                            if (-1 == timeZone.utc.indexOf(ezApi.ezclocker.ezDateTime.activeTimeZone)) {
                                EzDateTime.ezInstance.ezSupportedTimeZones.push(timeZone);
                            }
                        }
                    }

                    ezApi.ezclocker.ezEventEngine.ezTriggerEvent(
                        EzDateTime.ezEventNames.onSupportedTimeZonesReady,
                        ezApi.ezclocker.ezEventEngine.ezBuildEventData(
                            EzDateTime.ezApiName,
                            'Supported time zones ready',
                            EzDateTime.ezInstance.ezSupportedTimeZones))
                },
                (eResponse) => {
                    ezApi.ezclocker.ezLogger.error(
                        EzString.em`
                                Failed to load all the available time zones due to the following error:
                                ${eResponse.message}
                                Error response: EzJson.toJson(eResponse)`);

                    let localTimeZoneInfo = {
                        value: ezApi.ezclocker.ezDateTime.activeTimeZone,
                        utc: [ezApi.ezclocker.ezDateTime.activeTimeZone]
                    };

                    EzDateTime.ezInstance.ezAllKnownTimeZones.push(localTimeZoneInfo);

                    EzDateTime.ezInstance.ezSupportedTimeZones.push(localTimeZoneInfo);

                    ezApi.ezclocker.ezEventEngine.ezTriggerEvent(
                        EzDateTime.ezEventNames.onSupportedTimeZonesReady,
                        ezApi.ezclocker.ezEventEngine.ezBuildEventData(
                            EzDateTime.ezApiName,
                            'Supported time zones ready',
                            EzDateTime.ezInstance.ezSupportedTimeZones))
                });
    }


    /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    | Public Methods
    /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
    /**
     * @public @method
     * Returns the default option object for the JQuery Date Picker Input
     * @returns {Object}
     */
    ezGetDefaultDatePickerOptions() {
        return {
            dateFormat: ezApi.ezclocker.ezDateTime.ezGetPreferredDatePickerFormat(),
            defaultDate: ezApi.ezclocker.ezDateTime.ezToJsDate(ezApi.ezclocker.ezDateTime.ezNowWithStartOfDay()),
            constrainInput: false,
            changeMonth: true,
            changeYear: true
        };
    }

    /**
     * @deprecated
     * Migrate to ezApi.ezclocker.ezDateTime.ezInitDatePicker(
            dateTimePickerId,
            eventHandlers,
            propertyOverrides,
            aInitialMoment)
     * @public @method
        Applies the jQuery DatePicker initialization to the provided elementId.
        Component details: https://jqueryui.com/datepicker/
     * @param {string} dateTimePickerId
     * @param {Object|null} eventHandlers
     * @param {Object|null} propertyOverrides
     * @param {moment|null} aInitialMoment
     * @returns {Object}
     * Returns the jQuery reference to the datepicker.
     */
    ezInitDateTimePicker(dateTimePickerId, eventHandlers, propertyOverrides, aInitialMoment) {
        return EzDateTime.ezInstance.ezInitDatePicker(
            dateTimePickerId,
            eventHandlers,
            propertyOverrides,
            aInitialMoment);
    }

    /**
     * @public @method
        Applies the jQuery DatePicker initialization to the provided elementId.
        Component details: https://jqueryui.com/datepicker/
     * @param {string} datePickerId
     * @param {Object|null} eventHandlers
     * @param {Object|null} propertyOverrides
     * @param {moment|null} aInitialMoment
     * @returns {Object}
     * Returns the jQuery reference to the datepicker.
     */
    ezInitDatePicker(datePickerId, eventHandlers, propertyOverrides, aInitialMoment, isEndPeriod) {
        if (!EzString.hasLength(datePickerId)) {
            throw new EzBadParamException(
                'datePickerId',
                EzDateTime.ezInstance,
                EzDateTime.ezInstance.ezInitDatePicker);
        }
        if (!ezApi.ezclocker.ezUi.ezElementExists(datePickerId)) {
            throw new EzException(`The date picker HTML element with id=${datePickerId} does not currently exist.`);
        }

        let datePickerOptions = EzDateTime.ezInstance.ezGetDefaultDatePickerOptions();

        if (EzObject.isValid(eventHandlers)) {
            for (let eHandlers in eventHandlers) {
                if (ezApi.ezIsFunction(eventHandlers[eHandlers])) {
                    datePickerOptions[eHandlers] = eventHandlers[eHandlers];
                }
            }
        }

        if (EzObject.isValid(propertyOverrides)) {
            for (let pOverrides in propertyOverrides) {
                datePickerOptions[pOverrides] = propertyOverrides[pOverrides];
            }
        }

        // Initialize the datepicker with the options.
        let aDatePicker = ezApi.ezclocker.ezUi.ezId(datePickerId).datepicker(datePickerOptions);

        // Assign the initial value (if any)
        aInitialMoment = EzDateTime.ezInstance.ezIsValidMoment(aInitialMoment)
            ? aInitialMoment
            : EzDateTime.ezInstance.ezNowWithStartOfDay();

        if (EzBoolean.isTrue(isEndPeriod)) {
            EzDateTime.ezInstance.ezSetDatePickerValueEndOfDay(datePickerId, aInitialMoment);
        } else {
            EzDateTime.ezInstance.ezSetDatePickerValueStartOfDay(datePickerId, aInitialMoment);
        }

        return aDatePicker;
    }

    /**
     * @public @method
     * Creates a moment instance from the provided iso8601DateTime value
     * @param {sring|null}
     * @returns {moment}
     * @deprecated Migrate to  EzDateTime.ezInstance.ezFromIso()
     */
    ezFromIso8601(iso8601DateTime) {
        return EzDateTime.ezInstance.ezFromIso(iso8601DateTime);
    }

    /**
     * @public @method
     * Creates a new moment with the provided ISO string.
        If the iso string is empty, null is returned. If the iso string is not valid, ezNowWithStartOfDay is returned.
     * @param {string} isoDateTimeString
     * @returns {moment}
     * @deprecated Migrate to  EzDateTime.ezInstance.ezFromIso()
     */
    ezCreateFromIso(isoString) {
        return EzDateTime.ezInstance.ezFromIso(isoString);
    }

    /**
     * @public @method
     * Creates a moment instance from the provided iso string OR returns the provided defaultMoment if
        the iso string is not valid.
     * @param {string} isoString
     * @param {moment} aDefaultMoment
     * @returns {moment}
     * @deprecated Migrate to  EzDateTime.ezInstance.ezFromIsoOrDefault()
     */
    ezCreateFromIsoOrDefaultMoment(isoString, aDefaultMoment) {
        return EzDateTime.ezInstance.ezFromIsoOrDefault(isoString, aDefaultMoment);
    }

    /**
     * TODO: Finish locale work
     *
     * @public @method
     * Creates a moment instance from the provided iso8601DateTime value.
     * Sets the timezone to the preferred time zone.
     * @param {string} isoString
     * @param {undefined|null|string} ezLocale
     * A valid enum property value from EzLocale
     * Default is: EzDateTime.ezInstance.ezPreferredLocale
     * @returns {moment}
     */
    ezFromIso(isoString /*, ezLocale = EzDateTime.ezInstance.ezPreferredLocale*/) {
        if (!EzDateTime.ezInstance.ezIsValidIso(isoString)) {
            throw new EzBadParamException(
                'isoString',
                EzDateTime.ezInstance,
                EzDateTime.ezInstance.ezFromIso);
        }

        /*
        if (!EzString.hasLength(ezLocale)) {
            ezLocale = EzDateTime.ezInstance.ezPreferredLocale;
        }

        let aMoment = moment(isoString).locale(ezLocale);
        */

        return moment(isoString).tz(EzDateTime.ezInstance.activeTimeZone);
    }

    /**
     @public @method
     Creates a moment instance from the provided iso8601DateTime value.
     Sets the timezone to the input TZ and if absent, preferred time zone.
     @param {string} isoString
     @param {undefined|null|string} timeZone
     @returns {moment}
     */
    ezFromIsoAndTimeZone(dateTimeIso, timeZone = EzDateTime.ezInstance.activeTimeZone) {
        if (!EzDateTime.ezInstance.ezIsValidIso(dateTimeIso)) {
            throw new EzBadParamException(
                'dateTimeIso',
                EzDateTime.ezInstance,
                EzDateTime.ezInstance.ezFromIso);
        }

        return moment(dateTimeIso).tz(timeZone);
    }

    /**
     * @public @method
     * Creates a moment instance from the provided iso8601DateTime value
     * @param {string} isoString
     * @param {moment} aDefaultMoment
     * @returns {moment}
     */
    ezFromIsoOrDefault(dateTimeIso, aDefaultMoment) {
        if (!EzDateTime.ezInstance.ezIsValidIso(dateTimeIso)) {
            return aDefaultMoment;
        }

        // Do not 'refactor' the below two lines (rat hole... lol)
        return moment(dateTimeIso).tz(EzDateTime.ezInstance.activeTimeZone);
    }

    /**
     * @public @method
     * Uses a REGEX expiress to validate the provied isoDateTime has the ISO-8601 format.
     * @param {undefiend|null|string} isoDateTimeValue
     * Returns object in format:
     *      {
     *          isoValue: {string},
     *          dateTimeMoment: {null|moment},
     *          valid: {boolean},
     *          message: {string}
     *      };
     * @deprecated
     * Migrate to ezApi.ezclocker.ezDateTime.ezValidateIso(isoDateTime);
     */
    ezValidateIsIso8601(isoDateTime) {
        return EzDateTime.ezInstance.ezValidateIso(isoDateTime);
    }

    /**
     * @public @method
     * Uses a REGEX expiress to validate the provied isoDateTime has the ISO-8601 format.
     * @param {string} isoString
     * @returns {Object}
     * Returns object in format:
     *      {
     *          isoValue: {string},
     *          dateTimeMoment: {null|moment},
     *          valid: {boolean},
     *          message: {string}
     *      };
     * @deprecated
     * Migrate to ezApi.ezclocker.ezDateTime.ezValidateIso(isoDateTime);
     */
    ezValidateIsoString(isoDateTime) {
        return EzDateTime.ezInstance.ezValidateIso(isoDateTime);
    }

    /**
     * @public @method
     * Uses a REGEX expiress to validate the provied isoDateTime has the ISO-8601 format.
     * @param {string} isoString
     * @returns {Object}
     * Returns object in format:
     *      {
     *          isoValue: {string},
     *          dateTimeMoment: {null|moment},
     *          valid: {boolean},
     *          message: {string}
     *      };
     */
    ezValidateIso(isoDateTime) {
        let response = {
            isoValue: EzString.stringOrNull(isoDateTime),
            dateTimeMoment: null,
            valid: false,
            message: 'The provided value is not a valid ISO string.'
        };

        if (!EzString.hasLength(isoDateTime)) {
            response.message = 'A null, undefined, or empty value is not a valid ISO string.';
        } else if (EzDateTime.ISO_VALIDATION_REGEX.test(isoDateTime)) {
            response.valid = true;

            response.message = 'The provided value is a valid ISO string.';
        }

        return response;
    }

    /**
     * @public @method
     * Determines if the provided isoDateTime is a valid ISO date time string.
     * @param {string} isoDateTime
     * @returns {boolean}
     */
    ezIsValidIso(isoDateTime) {
        return EzBoolean.isTrue(EzDateTime.ezInstance.ezValidateIso(isoDateTime).valid);
    }

    /**
     * @public @method
     * Appends the time from the time picker to the provided moment instance.
     * @param {string} timePickerId
     * @param {moment} aMoment
     * @returns {moment}
     */
    ezAppendTimeFromTimePicker(timePickerId, aMoment) {
        if (!EzString.hasLength(timePickerId)) {
            throw new EzBadParamException(
                'timePickerId',
                EzDateTime.ezInstance,
                EzDateTime.ezInstance.ezAppendTimeFromTimePicker);
        }

        if (!EzDateTime.ezInstance.ezIsValidMoment(aMoment)) {
            throw new EzBadParamException(
                'aMoment',
                EzDateTime.ezInstance,
                EzDateTime.ezInstance.ezAppendTimeFromTimePicker);
        }

        aMoment = EzDateTime.ezInstance.ezMomentWithPTZ(aMoment);

        let hour = ezApi.ezclocker.ezUi.ezId(timePickerId).timepicker('getHour');

        let min = ezApi.ezclocker.ezUi.ezId(timePickerId).timepicker('getMinute');

        if (!EzObject.isValid(hour) || !EzObject.isValid(min)) {
            return null;
        }

        return EzDateTime.ezInstance
            .ezMomentWithPTZ(aMoment)
            .hours(hour)
            .minutes(min)
            .seconds(0)
            .milliseconds(0);
    }

    /**
     * @public @method
     * Returns the defaul options for time picker initialization.
     * @returns {Object}
     */
    ezGetDefaultTimePickerOptions() {
        return {
            timeFormat: 'hh:mm tt',
            showPeriod: true,
            showLeadingZero: true
        };
    }

    /**
     * @public @method
        Initializes a UX time picker with defaults. Applies any additional options or overrides to the default
        options provided in timePickerOptionsOverrides.
     * @param {string} timePickerId
     * @param {undefiend|null|moment} initialMoment
     * @param {Object|null} timePickerOptionsOverrides
     * @returns {Object}
        Jquery referece to the time picker
     */
    ezInitTimePicker(timePickerId, initialMoment, timePickerOptionsOverrides) {
        if (!EzString.hasLength(timePickerId)) {
            throw new EzBadParamException(
                'timePickerId',
                EzDateTime.ezInstance,
                EzDateTime.ezInstance.ezInitTimePicker);
        }

        if (!EzObject.isValid(initialMoment)) {
            initialMoment = ezApi.ezclocker.ezDateTime.ezNow();
        }

        let timePickerOptions = EzDateTime.ezInstance.ezGetDefaultTimePickerOptions();

        if (EzObject.isValid(timePickerOptionsOverrides)) {
            for (let prop in timePickerOptionsOverrides) {
                timePickerOptions[prop] = timePickerOptionsOverrides[prop];
            }
        }

        let timePickerRef = ezApi.ezclocker.ezUi.ezId(timePickerId).timepicker(timePickerOptions);

        EzDateTime.ezInstance.ezSetTimePickerValue(timePickerId, initialMoment);

        return timePickerRef;
    }

    /**
     * @public @method
     * Obtains a moment instance, in the selected timezone for the date in a date-picker.
     * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
     * ENGINEERING NOTES
     * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
     * JQuery UI date pickers store the value as a Javascript Date in the local time zone.
     * EzClocker sets date pickers with the display date only (ignoring the time and zone)
     * When the date is read from the date picker, the time and zone must get ignored to
     * nake sure the date doesn't translate when converting it to the moment in the user's
     * selected time zone.
     * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
     * @returns {moment}
     * @deprecated
     * Migrate to one of the following:
     * EzDateTime.ezInstance.ezMomentFromDatePickerStartOfDay(
     *     datePickerId,
     *     returnNullInsteadOfTodayIfNull)
     * EzDateTime.ezInstance.ezMomentFromDatePickerEndOfDay(
     *     datePickerId,
     *     returnNullInsteadOfTodayIfNull)
     */
    ezDateFromDatePicker(datePickerId) {
        return EzDateTime.ezInstance.ezMomentFromDatePickerStartOfDay(datePickerId, false);
    }

    /**
     * @public @method
     * Obtains a moment instance, in the selected timezone for the date in a date-picker.
     * The time is set to the start of day.
     * Set returnNullInsteadOfTodayIfNull to true to have the call return null instead of today if the date pickers
     * date is null.
     * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
     * ENGINEERING NOTES
     * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
     * JQuery UI date pickers store the value as a Javascript Date in the local time zone.
     * EzClocker sets date pickers with the display date only (ignoring the time and zone)
     * When the date is read from the date picker, the time and zone must get ignored to
     * nake sure the date doesn't translate when converting it to the moment in the user's
     * selected time zone.
     * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
     * @param {string} datePickerId
     * @param {boolean} returnNullInsteadOfTodayIfNull
     * @returns {moment}
     * @deprecated
     * Migrate to one of the following:
     * EzDateTime.ezInstance.ezDateTimeFromDatePickerWithTimeAtStartOfDay(
     *     datePickerId,
     *     returnNullInsteadOfTodayIfNull)
     *
     * EzDateTime.ezInstance.ezDateTimeFromDatePickerWithTimeAtEndOfDay(
     *     datePickerId,
     *     returnNullInsteadOfTodayIfNull)
     */
    ezMomentFromDatePicker(datePickerId, returnNullInsteadOfTodayIfNull) {
        return EzDateTime.ezInstance.ezMomentFromDatePickerStartOfDay(
            datePickerId,
            returnNullInsteadOfTodayIfNull);
    }

    /**
     * @public @method
     * Creates a moment with the active time zone from the date value in the date picker with the
        provided datePickerId.
     * The moment's time value is forced to the start of day.
        Set returnNullInsteadOfTodayIfNull to true to have the call return null instead of today if the date pickers
        date is null.
        ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        ENGINEERING NOTES
        ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        JQuery UI date pickers store the value as a Javascript Date in the local time zone.
        EzClocker sets date pickers with the display date only (ignoring the time and zone)
        When the date is read from the date picker, the time and zone must get ignored to
        nake sure the date doesn't translate when converting it to the moment in the user's
        selected time zone.
        ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
     * @param {string} datePickerId
     * @param {boolean} returnNullInsteadOfTodayIfNull
     * @param {string} timeZoneId
     * @returns {moment}
     */
    ezMomentFromDatePickerStartOfDay(datePickerId, returnNullInsteadOfTodayIfNull, timeZoneId = EzDateTime.ezInstance.activeTimeZone) {
        if (!EzString.hasLength(datePickerId)) {
            throw new EzBadParamException(
                'datePickerId',
                EzDateTime.ezInstance,
                EzDateTime.ezInstance.ezMomentFromDatePickerStartOfDay);
        }

        if (!ezApi.ezclocker.ezUi.ezElementExists(datePickerId)) {
            return EzBoolean.booleanOrFalse(returnNullInsteadOfTodayIfNull)
                ? returnNullInsteadOfTodayIfNull
                : EzDateTime.ezInstance.ezNowWithStartOfDay(timeZoneId);
        }

        let jsDate = ezApi.ezclocker.ezUi.ezId(datePickerId).datepicker('getDate');

        if (!EzObject.isValid(jsDate)) {
            return EzBoolean.booleanOrFalse(returnNullInsteadOfTodayIfNull)
                ? null
                : EzDateTime.ezInstance.ezNowWithStartOfDay();
        }

        // Step 1: Create a moment with time at beginning of day in the users's selected time zone
        return EzDateTime.ezInstance.ezNowWithStartOfDay(
            EzDateTime.ezInstance.ezUseTimeZoneId(timeZoneId))
            // Step 2: Set only the year, month, and date from the JSDate (ignoring its timezone)
            .year(jsDate.getFullYear())
            .month(jsDate.getMonth())
            .date(jsDate.getDate());
    }

    /**
     * @public @method
     * Creates a moment with the active time zone from the date value in the date picker with the
     * provided datePickerId.
     * The moment's time value is forced to the start of day.
     * Set returnNullInsteadOfTodayIfNull to true to have the call return null instead of today if the date pickers
     * date is null.
     * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
     * ENGINEERING NOTES
     * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
     * JQuery UI date pickers store the value as a Javascript Date in the local time zone.
     * EzClocker sets date pickers with the display date only (ignoring the time and zone)
     * When the date is read from the date picker, the time and zone must get ignored to
     * nake sure the date doesn't translate when converting it to the moment in the user's
     * selected time zone.
     * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
     * @param {string} datePickerId
     * @param {boolean} returnNullInsteadOfTodayIfNull
     * @param {string} timeZoneId
     * Optionally in the specified timeZoneId
     * Default: EzDateTime.ezInstance.activeTimeZone
     * @returns {moment}
     */
    ezDateTimeFromDatePickerWithTimeAtStartOfDay(datePickerId, timeZoneId = EzDateTime.ezInstance.activeTimeZone) {
        if (!EzString.hasLength(datePickerId) || !ezApi.ezclocker.ezUi.ezElementExists(datePickerId)) {
            throw new EzBadParamException(
                'datePickerId',
                EzDateTime.ezInstance,
                EzDateTime.ezInstance.ezMomentFromDatePickerStartOfDay);
        }

        let jsDate = ezApi.ezclocker.ezUi.ezId(datePickerId).datepicker('getDate');

        if (!EzObject.isValid(jsDate)) {
            throw new EzClockerException(
                EzString.em`
                    The date picker (id=${datePickerId}') did not return a valid Javascript date instance from the call to
                    ezApi.ezclocker.ezUi.ezId(${datePickerId}).datepicker('getDate')`);
        }

        // Step 1: Create a moment with time at beginning of day in the users's selected time zone
        return EzDateTime.ezInstance.ezNowWithStartOfDay(
            EzDateTime.ezInstance.ezUseTimeZoneId(timeZoneId))
            // Step 2: Set only the year, month, and date from the JSDate (ignoring its timezone)
            .year(jsDate.getFullYear())
            .month(jsDate.getMonth())
            .date(jsDate.getDate());
    }

    /**
     * @public @method
     * Creates a moment with the active time zone from the date value in the date picker with the
     * provided datePickerId.
     * The moment's time value is forced to the end of day.
     * Set returnNullInsteadOfTodayIfNull to true to have the call return null instead of today if the date pickers
     * date is null.
     * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
     * ENGINEERING NOTES
     * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
     * JQuery UI date pickers store the value as a Javascript Date in the local time zone.
     * EzClocker sets date pickers with the display date only (ignoring the time and zone)
     * When the date is read from the date picker, the time and zone must get ignored to
     * nake sure the date doesn't translate when converting it to the moment in the user's
     * selected time zone.
     * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
     * @param {string} datePickerId
     * @param {string} timeZoneId
     * Optionally return the date in the provided timeZoneId
     * Default: EzDateTime.ezInstance.activeTimeZone
     * @returns {moment}
     */
    ezDateTimeFromDatePickerWithTimeAtEndOfDay(datePickerId, timeZoneId = EzDateTime.ezInstance.activeTimeZone) {
        if (!EzString.hasLength(datePickerId) || !ezApi.ezclocker.ezUi.ezElementExists(datePickerId)) {
            throw new EzBadParamException(
                'datePickerId',
                EzDateTime.ezInstance,
                EzDateTime.ezInstance.ezMomentFromDatePickerEndOfDay);
        }

        let jsDate = ezApi.ezclocker.ezUi.ezId(datePickerId).datepicker('getDate');

        if (!EzObject.isValid(jsDate)) {
            throw new EzClockerException(
                EzString.em`
                    The date picker (id=${datePickerId}') did not return a valid Javascript date instance from the call to
                    ezApi.ezclocker.ezUi.ezId(${datePickerId}).datepicker('getDate')`);
        }

        // Step 1: Create a moment with time at the end of day in the users's selected time zone
        return EzDateTime.ezInstance.ezNowWithEndOfDay(timeZoneId)
            // Step 2: Set only the year, month, and date from the JSDate (ignoring its timezone)
            .year(jsDate.getFullYear())
            .month(jsDate.getMonth())
            .date(jsDate.getDate());
    }

    /**
     * @public @method
     * Creates a moment with the active time zone from the date value in the date picker with the
     * provided datePickerId.
     * The moment's time value is forced to the end of day.
     * Set returnNullInsteadOfTodayIfNull to true to have the call return null instead of today if the date pickers
     * date is null.
     * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
     * ENGINEERING NOTES
     * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
     * JQuery UI date pickers store the value as a Javascript Date in the local time zone.
     * EzClocker sets date pickers with the display date only (ignoring the time and zone)
     * When the date is read from the date picker, the time and zone must get ignored to
     * nake sure the date doesn't translate when converting it to the moment in the user's
     * selected time zone.
     * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
     * @param {string} datePickerId
     * @returns {moment}
     */
    ezMomentFromDatePickerEndOfDay(datePickerId, returnNullInsteadOfTodayIfNull) {
        if (!EzString.hasLength(datePickerId)) {
            throw new EzBadParamException(
                'datePickerId',
                EzDateTime.ezInstance,
                EzDateTime.ezInstance.ezMomentFromDatePickerEndOfDay);
        }

        if (!ezApi.ezclocker.ezUi.ezElementExists(datePickerId)) {
            return EzDateTime.ezInstance.ezNowWithEndOfDay();
        }

        let jsDate = ezApi.ezclocker.ezUi.ezId(datePickerId).datepicker('getDate');

        if (!EzObject.isValid(jsDate)) {
            return EzBoolean.isTrue(returnNullInsteadOfTodayIfNull)
                ? null
                : EzDateTime.ezInstance.ezNowWithEndOfDay();
        }

        // Step 1: Create a moment with time at the end of day in the users's selected time zone
        let aMoment = EzDateTime.ezInstance.ezNowWithEndOfDay();

        // Step 2: Set only the year, month, and date from the JSDate (ignoring its timezone)
        return aMoment
            .year(jsDate.getFullYear())
            .month(jsDate.getMonth())
            .date(jsDate.getDate());
    }

    /**
     * @public @method
     * Gets the date picker element's date as a string with a language-sensitive representation of the date portion
        of the specified date in the user agent's timezone. In otherwords, returns a locale specific display date (which
        may not be mm/dd/yyyy).
        ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        ENGINEERING NOTES
        ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        JQuery UI date pickers store the value as a Javascript Date in the local time zone.
        EzClocker sets date pickers with the display date only (ignoring the time and zone)
        When the date is read from the date picker, the time and zone must get ignored to
        nake sure the date doesn't translate when converting it to the moment in the user's
        selected time zone.
        ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
     * @param {string} datePickerId
     * @returns {string}
     */
    ezGetDatePickerLocaleDisplayDate(datePickerId) {
        if (!EzString.hasLength(datePickerId)) {
            throw new EzBadParamException(
                'datePickerId',
                EzDateTime.ezInstance,
                EzDateTime.ezInstance.ezGetDatePickerLocaleDisplayDate);
        }

        if (!ezApi.ezclocker.ezUi.ezElementExists(datePickerId)) {
            return EzDateTime.ezInstance.ezToDisplayDate(EzDateTime.ezInstance.ezNowWithEndOfDay());
        }

        let jsDate = ezApi.ezclocker.ezUi.ezId(datePickerId).datepicker('getDate');

        if (!EzObject.isValid(jsDate)) {
            return EzDateTime.ezInstance.ezToDisplayDate(EzDateTime.ezInstance.ezNowWithEndOfDay());
        }

        return jsDate.toLocaleDateString();
    }

    /**
     * @public @method
     * Gets the date picker element's date as a string in ezClocker's default display date format.
        ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        ENGINEERING NOTES
        ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        JQuery UI date pickers store the value as a Javascript Date in the local time zone.
        EzClocker sets date pickers with the display date only (ignoring the time and zone)
        When the date is read from the date picker, the time and zone must get ignored to
        nake sure the date doesn't translate when converting it to the moment in the user's
        selected time zone.
        ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
     * @param {string} datePickerId
     * @returns {string}
     */
    ezGetDatePickerDisplayDate(datePickerId) {
        if (!EzString.hasLength(datePickerId)) {
            throw new EzBadParamException(
                'datePickerId',
                EzDateTime.ezInstance,
                EzDateTime.ezInstance.ezGetDatePickerDisplayDate);
        }

        if (!ezApi.ezclocker.ezUi.ezElementExists(datePickerId)) {
            return EzDateTime.ezInstance.ezToDisplayDate(EzDateTime.ezInstance.ezNowWithEndOfDay());
        }

        let jsDate = ezApi.ezclocker.ezUi.ezId(datePickerId).datepicker('getDate');

        if (!EzObject.isValid(jsDate)) {
            return EzDateTime.ezInstance.ezToDisplayDate(EzDateTime.ezInstance.ezNowWithEndOfDay());
        }

        // Step 1: Create a moment with time at the end of day in the users's selected time zone
        let aMoment = EzDateTime.ezInstance.ezNowWithEndOfDay();

        // Step 2: Set only the year, month, and date from the JSDate (ignoring its timezone)
        return EzDateTime.ezInstance.ezToDisplayDate(
            aMoment
                .year(jsDate.getFullYear())
                .month(jsDate.getMonth())
                .date(jsDate.getDate()));
    }

    /**
     * @public @method
     * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
     * ENGINEERING NOTES
     * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
     * JQuery Date Picker Formatting Values
     *     d - day of month (no leading zero)
     *     dd - day of month (two digit)
     *     o - day of the year (no leading zeros)
     *     oo - day of the year (three digit)
     *     D - day name short
     *     DD - day name long
     *     m - month of year (no leading zero)
     *     mm - month of year (two digit)
     *     M - month name short
     *     MM - month name long
     *     y - year (two digit)
     *     yy - year (four digit)
     *     @ - Unix timestamp (ms since 01/01/1970)
     *     ! - Windows ticks (100ns since 01/01/0001)
     *     '...' - literal text
     *     '' - single quote
     *
     * MomentJS Date Formatting Values
     *             TOKEN   EXAMPLE
     *     Month
     *             M       1 2 ... 11 12
     *             Mo      1st 2nd ... 11th 12th
     *             MM  01 02 ... 11 12
     *             MMM Jan Feb ... Nov Dec
     *             MMMM    January February ... November December
     *     Quarter
     *             Q       1 2 3 4
     *             Qo      1st 2nd 3rd 4th
     *     Day of Month
     *             D       1 2 ... 30 31
     *             Do      1st 2nd ... 30th 31st
     *             DD      01 02 ... 30 31
     *     Day of Year
     *             DDD     1 2 ... 364 365
     *             DDDo    1st 2nd ... 364th 365th
     *             DDDD    001 002 ... 364 365
     *     Day of Week
     *             d       0 1 ... 5 6
     *             do      0th 1st ... 5th 6th
     *             dd      Su Mo ... Fr Sa
     *             ddd     Sun Mon ... Fri Sat
     *             dddd    Sunday Monday ... Friday Saturday
     *     Day of Week (Locale)
     *             e       0 1 ... 5 6
     *     Day of Week (ISO)
     *             E       1 2 ... 6 7
     *     Week of Year
     *             w       1 2 ... 52 53
     *             wo      1st 2nd ... 52nd 53rd
     *             ww      01 02 ... 52 53
     *     Week of Year (ISO)
     *              W      1 2 ... 52 53
     *             Wo      1st 2nd ... 52nd 53rd
     *             WW      01 02 ... 52 53
     *     Year
     *             YY      70 71 ... 29 30
     *             YYYY    1970 1971 ... 2029 2030
     *             YYYYYY  -001970 -001971 ... +001907 +001971
     *                     Note: Expanded Years (Covering the full time value range of approximately 273,790 years forward or backward from 01 January, 1970)
     *             Y       1970 1971 ... 9999 +10000 +10001
     *                     Note: This complies with the ISO 8601 standard for dates past the year 9999
     *     Era Year
     *             y       1 2 ... 2020 ...
     *     Era
     *             N       BC AD
     *             NN      BC AD
     *             NNN     BC AD
     *                     Note: Abbr era name
     *             NNNN    Before Christ, Anno Domini
     *                     Note: Full era name
     *             NNNNN   BC AD
     *                     Note: Narrow era name
     *     Week Year
     *             gg      70 71 ... 29 30
     *             gggg    1970 1971 ... 2029 2030
     *     Week Year (ISO)
     *             GG      70 71 ... 29 30
     *             GGGG    1970 1971 ... 2029 2030
     *     AM/PM
     *             A       AM PM
     *             a       am pm
     *     Hour
     *             H       0 1 ... 22 23
     *             HH      00 01 ... 22 23
     *             h       1 2 ... 11 12
     *             hh      01 02 ... 11 12
     *             k       1 2 ... 23 24
     *             kk      01 02 ... 23 24
     *     Minute
     *             m       0 1 ... 58 59
     *             mm      00 01 ... 58 59
     *     Second
     *             s       0 1 ... 58 59
     *             ss      00 01 ... 58 59
     *     Fractional Second
     *             S       0 1 ... 8 9
     *             SS      00 01 ... 98 99
     *             SSS     000 001 ... 998 999
     *             SSSS... 000[0..] 001[0..] ... 998[0..] 999[0..]
     *     Time Zone
     *             z       EST CST ... MST PST
     *             zz      EST CST ... MST PST
     *                     Note: as of 1.6.0, the z/zz format tokens have been deprecated from plain moment objects.
     *                     However, they *do* work if you are using a specific time zone with the moment-timezone addon.
     *             Z       -07:00 -06:00 ... +06:00 +07:00
     *             ZZ      -0700 -0600 ... +0600 +0700
     *     Unix Timestamp
     *             X       1360013296
     *     Unix Millisecond Timestamp
     *             x       1360013296123
     * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
     */
    ezDatePickerDateFormatToMomentDateFormat(datePickerDateFormat) {
        return datePickerDateFormat
            .replace(/DD/, 'dddd')
            .replace(/D/, 'ddd')
            .replace(/dd/, 'DD')
            .replace(/d/, 'D')
            .replace(/MM/, 'MMMM')
            .replace(/M/, 'MMM')
            .replace(/mm/, 'MM')
            .replace(/m/, 'M')
            .replace(/yy/, 'YYYY')
            .replace(/y/, 'YY')
            .replace(/o/, 'DDD')
            .replace(/oo/, 'DDDD')
            .replace(/@/, 'X')
            .replace(/!/, 'x');
    }

    /**
     * @public @method
     * Sets the date picker's input value (but not the date picker's internal date value) equal to the provided
        aMoment formatted with the date picker control's dateFormat value. Nothing is set if the date picker's
        input value is already equal to the formatted display date
        ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        ENGINEERING NOTES
        ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        JQuery UI date pickers store the value as a Javascript Date, in the local time zone.
        In order to not have the aMoment converted to local timezone when setting the date picker
        the 'display date' is used from the aMoment time.
        When the display date is set in the date picker, the timezone switches to local time zone.
        However, the date is the same as it was in aMoment - which means when reading from the date
        picker the timezone MUST get ignored and only the month, day, and year value is used.
        ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
     * @param {string} datePickerId
     * @param {moment} aMoment
     */
    ezSetDatePickerInputValueWithMomentDisplayDate(datePickerId, aMoment) {
        if (!EzString.hasLength(datePickerId)) {
            throw new EzBadParamException(
                'datePickerId',
                EzDateTime.ezInstance,
                EzDateTime.ezInstance.ezSetDatePickerInputValueWithMomentDisplayDate);
        }
        if (!ezApi.ezclocker.ezUi.ezElementExists(datePickerId)) {
            throw new EzBadParamException(
                'datePickerId',
                EzDateTime.ezInstance,
                EzDateTime.ezInstance.ezSetDatePickerInputValueWithMomentDisplayDate,
                `Date picker HTML element with id=${datePickerId} does not currently exist.`);
        }
        if (!EzObject.isValid(aMoment)) {
            throw new EzBadParamException(
                'aMoment',
                EzDateTime.ezInstance,
                EzDateTime.ezInstance.ezSetDatePickerInputValueWithMomentDisplayDate);
        }

        let momentAtStartOfDayWithPTZ = EzDateTime.ezInstance.ezSetMomentStartOfDay(aMoment);

        let datePickerDateFormat = ezApi.ezclocker.ezUi.ezId(datePickerId).datepicker("option", "dateFormat");

        datePickerDateFormat = EzString.hasLength(datePickerDateFormat)
            ? EzDateTime.ezInstance.ezDatePickerDateFormatToMomentDateFormat(datePickerDateFormat)
            : EzDateTime.ezInstance.DEFAULT_MM_DD_YYYY;

        let datePickerDisplayDate = momentAtStartOfDayWithPTZ.format(datePickerDateFormat);

        // Set the date pickers input text box equal to the same value
        if (datePickerDisplayDate !== ezApi.ezclocker.ezUi.ezGetInputValue(datePickerId)) {
            ezApi.ezclocker.ezUi.ezSetInputValue(datePickerId, datePickerDisplayDate);
        }
    }

    /**
     * @public @method
     * Sets a datepicker value from the provided moment.
     * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
     * ENGINEERING NOTES
     * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
     * JQuery UI date pickers store the value as a Javascript Date, in the local time zone.
     * In order to not have the aMoment converted to local timezone when setting the date picker
     * the 'display date' is used from the aMoment time.
     * When the display date is set in the date picker, the timezone switches to local time zone.
     * However, the date is the same as it was in aMoment - which means when reading from the date
     * picker the timezone MUST get ignored and only the month, day, and year value is used.
     * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
     * @param {string} datePickerId
     * @param {moment} aMoment
     * @deprecated Migrate to either ezSetDatePickerValueStartOfDay or ezSetDatePickerValueEndOfDay
     */
    ezSetDatePickerValue(datePickerId, aMoment) {
        if (!EzString.hasLength(datePickerId)) {
            throw new EzBadParamException(
                'datePickerId',
                EzDateTime.ezInstance,
                EzDateTime.ezInstance.ezSetDatePickerValue);
        }
        if (!ezApi.ezclocker.ezUi.ezElementExists(datePickerId)) {
            throw new EzBadParamException(
                'datePickerId',
                EzDateTime.ezInstance,
                EzDateTime.ezInstance.ezSetDatePickerValue,
                `Date picker HTML element with id=${datePickerId} does not currently exist.`);
        }
        if (!EzDateTime.ezInstance.ezIsValidMoment(aMoment)) {
            throw new EzBadParamException(
                'aMoment',
                EzDateTime.ezInstance,
                EzDateTime.ezInstance.ezSetDatePickerValue);
        }

        let momentStartOfDayPTZ = EzDateTime.ezInstance.ezSetMomentStartOfDay(aMoment);

        let pickerMomentStartOfDayPTZ = EzDateTime.ezInstance.ezMomentFromDatePickerStartOfDay(datePickerId);

        if (EzDateTime.ezInstance.ezIsValidMoment(pickerMomentStartOfDayPTZ) &&
            EzDateTime.ezInstance.ezEquals(momentStartOfDayPTZ, pickerMomentStartOfDayPTZ)) {
            EzDateTime.ezInstance.ezSetDatePickerInputValueWithMomentDisplayDate(
                datePickerId,
                momentStartOfDayPTZ);
        } else {
            EzDateTime.ezInstance.ezSetDatePickerInputAndDateValueWithMomentDisplayDate(
                datePickerId,
                momentStartOfDayPTZ);
        }
    }

    /**
     * @public @method
     * Sets a datepicker value from the provided moment. Time is set to the beginning of the day.
     * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
     * ENGINEERING NOTES
     * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
     * JQuery UI date pickers store the value as a Javascript Date, in the local time zone.
     * In order to not have the aMoment converted to local timezone when setting the date picker
     * the 'display date' is used from the aMoment time.
     * When the display date is set in the date picker, the timezone switches to local time zone.
     * However, the date is the same as it was in aMoment - which means when reading from the date
     * picker the timezone MUST get ignored and only the month, day, and year value is used.
     * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
     * @param {string} datePickerId
     * @param {moment} aMoment
     * @param {string} timeZoneId
     * Optionally set the date to the provided timeZoneId before setting the date picker's date.
     * Default: EzDateTime.ezInstance.activeTimeZone
     */
    ezSetDatePickerDateWithTimeAtStartOfDay(datePickerId, aMoment, timeZoneId = EzDateTime.ezInstance.activeTimeZone) {
        if (!EzString.hasLength(datePickerId) || !ezApi.ezclocker.ezUi.ezElementExists(datePickerId)) {
            throw new EzBadParamException(
                'datePickerId',
                EzDateTime.ezInstance,
                EzDateTime.ezInstance.ezSetDatePickerValueStartOfDay);
        }
        if (!EzDateTime.ezInstance.ezIsValidMoment(aMoment)) {
            throw new EzBadParamException(
                'aMoment',
                EzDateTime.ezInstance,
                EzDateTime.ezInstance.ezSetDatePickerValueStartOfDay);
        }

        let newDateTimeForDatePicker = EzDateTime.ezInstance.ezSetMomentStartOfDay(
            aMoment,
            timeZoneId);

        let currentPickerMoment = EzDateTime.ezInstance.ezDateTimeFromDatePickerWithTimeAtStartOfDay(
            datePickerId,
            timeZoneId);

        if (EzDateTime.ezInstance.ezEquals(currentPickerMoment, newDateTimeForDatePicker)) {
            EzDateTime.ezInstance.ezSetDatePickerInputValueWithMomentDisplayDate(datePickerId, aMoment);
        } else {
            EzDateTime.ezInstance.ezSetDatePickerInputAndDateValueWithMomentDisplayDate(datePickerId, aMoment);
        }
    }

    /**
     * @public @method
     * Sets the date picker controls date and input value equal to the provided aMoment formatted
     * with the date picker control's dateFormat value.
     * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
     * ENGINEERING NOTES
     * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
     * JQuery UI date pickers store the value as a Javascript Date, in the local time zone.
     * In order to not have the aMoment converted to local timezone when setting the date picker
     * the 'display date' is used from the aMoment time.
     * When the display date is set in the date picker, the timezone switches to local time zone.
     * However, the date is the same as it was in aMoment - which means when reading from the date
     * picker the timezone MUST get ignored and only the month, day, and year value is used.
     * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
     * @param {string} datePickerId
     * @param {moment} aMoment
     * @param {string} timeZoneId
     * Optionally set the date to the provided timeZoneId before setting the date picker's date.
     * Default: EzDateTime.ezInstance.activeTimeZone
     */
    ezSetDatePickerInputAndDateValueWithMomentDisplayDate(datePickerId, aMoment, timeZoneId = EzDateTime.ezInstance.activeTimeZone) {
        if (!EzString.hasLength(datePickerId) || !ezApi.ezclocker.ezUi.ezElementExists(datePickerId)) {
            throw new EzBadParamException(
                'datePickerId',
                EzDateTime.ezInstance,
                EzDateTime.ezInstance.ezSetDatePickerInputAndDateValueWithMomentDisplayDate);
        }
        if (!EzDateTime.ezInstance.ezIsValidMoment(aMoment)) {
            throw new EzBadParamException(
                'aMoment',
                EzDateTime.ezInstance,
                EzDateTime.ezInstance.ezSetDatePickerInputAndDateValueWithMomentDisplayDate);
        }

        let datePickerDateFormat = ezApi.ezclocker.ezUi.ezId(datePickerId).datepicker("option", "dateFormat");

        datePickerDateFormat = EzString.hasLength(datePickerDateFormat)
            ? EzDateTime.ezInstance.ezDatePickerDateFormatToMomentDateFormat(datePickerDateFormat)
            : EzDateTime.ezInstance.DEFAULT_MOMENT_DATE_FORMAT;

        let datePickerDisplayDate = EzDateTime.ezInstance.ezDateTimeWithTimeZone(aMoment, timeZoneId)
            .format(datePickerDateFormat);

        // Set the date from the display date value
        // Calling setDate should not trigger any events
        ezApi.ezclocker.ezUi.ezId(datePickerId).datepicker('setDate', datePickerDisplayDate);

        // Set the date pickers input text box equal to the same value
        if (ezApi.ezclocker.ezUi.ezGetInputValue(datePickerId) !== datePickerDisplayDate) {
            // Setting the input value will trigger the inputs onChange event.
            ezApi.ezclocker.ezUi.ezSetInputValue(datePickerId, datePickerDisplayDate);
        }
    }

    /**
     * @public @method
     * Sets a datepicker value from the provided moment. Time is set to the beginning of the day.
     * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
     * ENGINEERING NOTES
     * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
     * JQuery UI date pickers store the value as a Javascript Date, in the local time zone.
     * In order to not have the aMoment converted to local timezone when setting the date picker
     * the 'display date' is used from the aMoment time.
     * When the display date is set in the date picker, the timezone switches to local time zone.
     * However, the date is the same as it was in aMoment - which means when reading from the date
     * picker the timezone MUST get ignored and only the month, day, and year value is used.
     * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
     * @param {string} datePickerId
     * @param {moment} aMoment
     */
    ezSetDatePickerValueStartOfDay(datePickerId, aMoment) {
        if (!EzString.hasLength(datePickerId)) {
            throw new EzBadParamException(
                'datePickerId',
                EzDateTime.ezInstance,
                EzDateTime.ezInstance.ezSetDatePickerValueStartOfDay);
        }
        if (!EzDateTime.ezInstance.ezIsValidMoment(aMoment)) {
            throw new EzBadParamException(
                'aMoment',
                EzDateTime.ezInstance,
                EzDateTime.ezInstance.ezSetDatePickerValueStartOfDay);
        }
        if (!ezApi.ezclocker.ezUi.ezElementExists(datePickerId)) {
            throw new EzBadParamException(
                'datePickerId',
                EzDateTime.ezInstance,
                EzDateTime.ezInstance.ezSetDatePickerValueStartOfDay,
                `Date picker HTML element with id=${datePickerId} does not currently exist.`);
        }

        aMoment = EzDateTime.ezInstance.ezSetMomentStartOfDay(aMoment);

        let currentPickerMoment = EzDateTime.ezInstance.ezMomentFromDatePickerStartOfDay(datePickerId);

        if (EzObject.isValid(currentPickerMoment) && aMoment.isSame(currentPickerMoment)) {
            EzDateTime.ezInstance.ezSetDatePickerInputValueWithMomentDisplayDate(datePickerId, aMoment);
            return;
        }

        EzDateTime.ezInstance.ezSetDatePickerInputAndDateValueWithMomentDisplayDate(datePickerId, aMoment);
    }

    /**
     * @public @method
     * Sets a datepicker value from the provided moment. Time is set to the end of the day.
     * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
     * ENGINEERING NOTES
     * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
     * JQuery UI date pickers store the value as a Javascript Date, in the local time zone.
     * In order to not have the aMoment converted to local timezone when setting the date picker
     * the 'display date' is used from the aMoment time.
     * When the display date is set in the date picker, the timezone switches to local time zone.
     * However, the date is the same as it was in aMoment - which means when reading from the date
     * picker the timezone MUST get ignored and only the month, day, and year value is used.
     * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
     * @param {string} datePickerId
     * @param {moment} aMoment
     */
    ezSetDatePickerValueEndOfDay(datePickerId, aMoment) {
        if (!EzString.hasLength(datePickerId)) {
            throw new EzBadParamException(
                'datePickerId',
                EzDateTime.ezInstance,
                EzDateTime.ezInstance.ezSetDatePickerValueEndOfDay);
        }
        if (!EzDateTime.ezInstance.ezIsValidMoment(aMoment)) {
            throw new EzBadParamException(
                'aMoment',
                EzDateTime.ezInstance,
                EzDateTime.ezInstance.ezSetDatePickerValueEndOfDay);
        }

        aMoment = EzDateTime.ezInstance.ezSetMomentEndOfDay(aMoment);

        let currentPickerMoment = EzDateTime.ezInstance.ezMomentFromDatePickerEndOfDay(datePickerId);

        if (EzObject.isValid(currentPickerMoment) && aMoment.isSame(currentPickerMoment)) {
            EzDateTime.ezInstance.ezSetDatePickerInputValueWithMomentDisplayDate(datePickerId, aMoment);
            return;
        }

        EzDateTime.ezInstance.ezSetDatePickerInputAndDateValueWithMomentDisplayDate(datePickerId, aMoment);
    }

    /**
     * @public @method
     * Sets the date picker's minimum date with time at start of day.
     * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
     * ENGINEERING NOTES
     * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
     * JQuery UI date pickers store the value as a Javascript Date, in the local time zone.
     * In order to not have the aMoment converted to local timezone when setting the date picker
     * the 'display date' is used from the aMoment time.
     * When the display date is set in the date picker, the timezone switches to local time zone.
     * However, the date is the same as it was in aMoment - which means when reading from the date
     * picker the timezone MUST get ignored and only the month, day, and year value is used.
     * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
     * @param {string} datePickerId
     * @param {moment} aMoment
     */
    ezSetDatePickerMinDateStartOfDay(datePickerId, aMoment) {
        if (!EzString.hasLength(datePickerId)) {
            throw new EzBadParamException(
                'aMoment',
                EzDateTime.ezInstance,
                EzDateTime.ezInstance.ezSetDatePickerMinDateStartOfDay);
        }

        if (!ezApi.ezclocker.ezUi.ezElementExists(datePickerId)) {
            throw new EzBadParamException(
                'datePickerId',
                EzDateTime.ezInstance,
                EzDateTime.ezInstance.ezSetDatePickerMinDateStartOfDay);
        }

        if (!EzDateTime.ezInstance.ezIsValidMoment(aMoment)) {
            throw new EzBadParamException(
                'aMoment',
                EzDateTime.ezInstance,
                EzDateTime.ezInstance.ezSetDatePickerMinDateStartOfDay);
        }

        ezApi.ezclocker.ezUi.ezId(datePickerId).datepicker(
            'option',
            'minDate',
            EzDateTime.ezInstance.ezToJsDate(EzDateTime.ezInstance.ezSetMomentStartOfDay(aMoment)));
    }

    /**
     * @public @method
     * Sets the date picker's minimum date with time at endof day.
     * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
     * ENGINEERING NOTES
     * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
     * JQuery UI date pickers store the value as a Javascript Date, in the local time zone.
     * In order to not have the aMoment converted to local timezone when setting the date picker
     * the 'display date' is used from the aMoment time.
     * When the display date is set in the date picker, the timezone switches to local time zone.
     * However, the date is the same as it was in aMoment - which means when reading from the date
     * picker the timezone MUST get ignored and only the month, day, and year value is used.
     * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
     * @param {string} datePickerId
     * @param {moment} aMoment
     */
    ezSetDatePickerMinDateEndOfDay(datePickerId, aMoment) {
        if (!EzString.hasLength(datePickerId)) {
            throw new EzBadParamException(
                'datePickerId',
                EzDateTime.ezInstance,
                EzDateTime.ezInstance.ezSetDatePickerMinDateEndOfDay);
        }
        if (!ezApi.ezclocker.ezUi.ezElementExists(datePickerId)) {
            throw new EzBadParamException(
                'datePickerId',
                EzDateTime.ezInstance,
                EzDateTime.ezInstance.ezSetDatePickerMinDateEndOfDay);
        }
        if (!EzDateTime.ezInstance.ezIsValidMoment(aMoment)) {
            throw new EzBadParamException(
                'aMoment',
                EzDateTime.ezInstance,
                EzDateTime.ezInstance.ezSetDatePickerMinDateEndOfDay);
        }

        ezApi.ezclocker.ezUi.ezId(datePickerId).datepicker(
            'option',
            'minDate',
            EzDateTime.ezInstance.ezToDisplayDate(EzDateTime.ezInstance.ezSetMomentEndOfDay(aMoment)));
    }

    /**
     * @public @method
     * Sets the date picker's maximum date with time at end of day.
     * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
     * ENGINEERING NOTES
     * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
     * JQuery UI date pickers store the value as a Javascript Date, in the local time zone.
     * In order to not have the aMoment converted to local timezone when setting the date picker
     * the 'display date' is used from the aMoment time.
     * When the display date is set in the date picker, the timezone switches to local time zone.
     * However, the date is the same as it was in aMoment - which means when reading from the date
     * picker the timezone MUST get ignored and only the month, day, and year value is used.
     * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
     * @param {string} datePickerId
     * @param {moment} aMoment
     */
    ezSetDatePickerMaxDateEndOfDay(datePickerId, aMoment) {
        if (!EzString.hasLength(datePickerId)) {
            throw new EzBadParamException(
                'datePickerId',
                EzDateTime.ezInstance,
                EzDateTime.ezInstance.ezSetDatePickerMaxDateEndOfDay);
        }
        if (!ezApi.ezclocker.ezUi.ezElementExists(datePickerId)) {
            throw new EzBadParamException(
                'datePickerId',
                EzDateTime.ezInstance,
                EzDateTime.ezInstance.ezSetDatePickerMaxDateEndOfDay);
        }
        if (!EzDateTime.ezInstance.ezIsValidMoment(aMoment)) {
            throw new EzBadParamException(
                'aMoment',
                EzDateTime.ezInstance,
                EzDateTime.ezInstance.ezSetDatePickerMaxDateEndOfDay);
        }

        ezApi.ezclocker.ezUi.ezId(datePickerId).datepicker(
            'option',
            'maxDate',
            EzDateTime.ezInstance.ezToDisplayDate(EzDateTime.ezInstance.ezSetMomentEndOfDay(aMoment)));
    }

    /**
     * @public @method
     * Converts the provided aMoment to a JavaScript Date
     * @param {moment} aMoment
     * @returns {Date}
     */
    ezToJsDate(aMoment) {
        if (!EzDateTime.ezInstance.ezIsValidMoment(aMoment)) {
            throw new EzBadParamException(
                'aMoment',
                EzDateTime.ezInstance,
                EzDateTime.ezInstance.ezToJsDate);
        }

        return EzDateTime.ezInstance.ezMomentWithPTZ(aMoment).toDate();
    }

    /**
     * @public @method
     * Creates a moment instance from a date picker's value and a time picker's value.
     * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
     * ENGINEERING NOTES
     * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
     * JQuery UI date pickers store the value as a Javascript Date, in the local time zone.
     * In order to not have the aMoment converted to local timezone when setting the date picker
     * the 'display date' is used from the aMoment time.
     * When the display date is set in the date picker, the timezone switches to local time zone.
     * However, the date is the same as it was in aMoment - which means when reading from the date
     * picker the timezone MUST get ignored and only the month, day, and year value is used.
     * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
     * @param {string} datePickerId
     * @param {string} timePickerId
     * @returns {moment}
     */
    ezDateTimeFromPickers(datePickerId, timePickerId, timeZone) {
        if (!EzString.hasLength(datePickerId)) {
            throw new EzBadParamException(
                'datePickerId',
                EzDateTime.ezInstance,
                EzDateTime.ezInstance.ezDateTimeFromPickers);
        }

        if (!EzString.hasLength(timePickerId)) {
            throw new EzBadParamException(
                'timePickerId',
                EzDateTime.ezInstance,
                EzDateTime.ezInstance.ezDateTimeFromPickers);
        }

        let datePickerMoment = EzDateTime.ezInstance.ezMomentFromDatePickerStartOfDay(datePickerId, false, timeZone);

        let hour = ezApi.ezclocker.ezUi.ezId(timePickerId).timepicker('getHour');

        if (!EzNumber.isNumber(hour)) {
            hour = 0;
        }

        let min = ezApi.ezclocker.ezUi.ezId(timePickerId).timepicker('getMinute');

        if (!EzNumber.isNumber(min)) {
            min = 0;
        }

        return datePickerMoment
            .hour(hour)
            .minute(min)
            .second(0)
            .millisecond(0);
    }

    /**
     * @public @method
     * Creates a moment instance from a date picker's value and a time picker's value.
     * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
     * ENGINEERING NOTES
     * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
     * JQuery UI date pickers store the value as a Javascript Date, in the local time zone.
     * In order to not have the aMoment converted to local timezone when setting the date picker
     * the 'display date' is used from the aMoment time.
     * When the display date is set in the date picker, the timezone switches to local time zone.
     * However, the date is the same as it was in aMoment - which means when reading from the date
     * picker the timezone MUST get ignored and only the month, day, and year value is used.
     * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
     * @param {string} datePickerId
     * @param {string} timePickerId
     * @returns {moment}
     */
    ezMomentFromPickers(datePickerId, timePickerId) {
        if (!EzString.hasLength(datePickerId)) {
            throw new EzBadParamException(
                'datePickerId',
                EzDateTime.ezInstance,
                EzDateTime.ezInstance.ezMomentFromPickers);
        }
        if (!EzString.hasLength(timePickerId)) {
            throw new EzBadParamException(
                'timePickerId',
                EzDateTime.ezInstance,
                EzDateTime.ezInstance.ezMomentFromPickers);
        }

        let datePickerMoment = EzDateTime.ezInstance.ezMomentFromDatePickerStartOfDay(datePickerId);

        let hour = ezApi.ezclocker.ezUi.ezId('edit_clockInTime').timepicker('getHour');

        if (!EzNumber.isNumber(hour)) {
            hour = 0;
        }

        let min = ezApi.ezclocker.ezUi.ezId('edit_clockInTime').timepicker('getMinute');

        if (!EzNumber.isNumber(min)) {
            min = 0;
        }

        return datePickerMoment
            .hour(hour)
            .minute(min)
            .second(0)
            .millisecond(0);
    }

    /**
     * @public @method
     * Returns the string formatted MM/DD/YYYY for the provided moment.js instance. If none provided,
     * returns the current date instead.
     * @param {moment} momentInstance
     * @returns {string}
     * @deprecated Migrate to  EzDateTime.ezInstance.ezToDisplayDate()
     */
    ezDateString(aMoment) {
        return EzDateTime.ezInstance.ezToDisplayDate(aMoment);
    }

    static get NEVER_SET_MOMENT_UTC() {
        return moment()
            .tz('UTC')
            .year(0)
            // Janurary (zero based month)
            .month(0)
            .date(1)
            .hour(0)
            .minute(0)
            .second(0)
            .millisecond(0);
    }

    static get NEVER_SET_DATE_ISO() {
        return EzDateTime.ezInstance.ezToIsoDate(EzDateTime.NEVER_SET_MOMENT_UTC);
    }

    static get NEVER_SET_DATE_TIME_ISO() {
        return EzDateTime.ezInstance.ezToIso(EzDateTime.NEVER_SET_MOMENT_UTC);
    }

    static getNeverSetDateTimeIso(noZone, noMilliseconds, noMillisecondsOrSeconds, noTime) {
        if (EzBoolean.isTrue(noTime)) {
            return EzDateTime.NEVER_SET_DATE_ISO;
        }

        if (EzBoolean.isTrue(noMillisecondsOrSeconds)) {
            return EzBoolean.isTrue(noZone)
                ? `${EzDateTime.NEVER_SET_DATE_ISO}T00:00`
                : `${EzDateTime.NEVER_SET_DATE_ISO}T00:00Z`;
        }

        if (EzBoolean.isTrue(noMilliseconds)) {
            return EzBoolean.isTrue(noZone)
                ? `${EzDateTime.NEVER_SET_DATE_ISO}T00:00:00`
                : `${EzDateTime.NEVER_SET_DATE_ISO}T00:00:00Z`;
        }

        return EzDateTime.NEVER_SET_DATE_TIME_ISO;
    }

    static get NEVER_SET_DISPLAY_DATE() {
        return '-';
    }

    static get NEVER_EXPIRE_MOMENT_UTC() {
        return moment()
            .tz('UTC')
            .year(9999)
            // Janurary (zero based month)
            .month(0)
            .date(1)
            .hour(23)
            .minute(59)
            .second(59)
            .millisecond(999);
    }

    static get NEVER_EXPIRE_DATE_ISO() {
        return EzDateTime.ezInstance.ezToIsoDate(EzDateTime.NEVER_EXPIRE_MOMENT_UTC);
    }

    static get NEVER_EXPIRE_DATE_TIME_ISO() {
        return EzDateTime.ezInstance.ezToIso(EzDateTime.NEVER_EXPIRE_MOMENT_UTC);
    }

    static getNeverExpireDateTimeIso(noZone, noTime, noMillisecondsOrSeconds, noMilliseconds) {
        if (EzBoolean.isTrue(noTime)) {
            return EzDateTime.NEVER_EXPIRE_DATE_ISO;
        }

        if (EzBoolean.isTrue(noMillisecondsOrSeconds)) {
            return EzBoolean.isTrue(noZone)
                ? `${EzDateTime.NEVER_EXPIRE_DATE_ISO}T00:00`
                : `${EzDateTime.NEVER_EXPIRE_DATE_ISO}T00:00Z`;
        }

        if (EzBoolean.isTrue(noMilliseconds)) {
            return EzBoolean.isTrue(noZone)
                ? `${EzDateTime.NEVER_EXPIRE_DATE_ISO}T00:00:00`
                : `${EzDateTime.NEVER_EXPIRE_DATE_ISO}T00:00:00Z`;
        }

        return EzDateTime.NEVER_SET_DATE_TIME_ISO;
    }

    static get NEVER_EXPIRE_DISPLAY_DATE() {
        return 'NEVER';
    }

    /**
     * @public @method
     * Determines if the provided aMoment (or possibly string) represents a never expire date.
     * @param {undefined|null|moment|string} aMomentOrString
     * Supported string values:
     *      equals '-'
     *      starts with '9999/01/01'
     *      starts with '9999.01.01'
     *      starts with '01/01/9999'
     *      starts with '01-01-9999'
     *      starts with '01.01.9999'
     *      equals '9999-01-01T23:59:59:999Z'
     *      equals '9999-01-01T23:59:59:999'
     *      equals '9999-01-01T23:59:59Z'
     *      equals '9999-01-01T23:59:59'
     *      equals '9999-01-01T23:59Z'
     *      equals '9999-01-01T23:59'
     *      equals '9999-01-01'
     * @returns {boolean}
     */
    ezIsNeverExpire(aMomentOrString) {
        if (EzString.isString(aMomentOrString)) {
            aMomentOrString = aMomentOrString.toUpperCase();

            return !EzString.hasLength(aMomentOrString) ||
                EzDateTime.NEVER_EXPIRE_DISPLAY_DATE === aMomentOrString ||
                EzDateTime.NEVER_EXPIRE_DATE_ISO === aMomentOrString ||
                EzDateTime.NEVER_EXPIRE_DATE_TIME_ISO === aMomentOrString ||
                '01-01-9999' === aMomentOrString ||
                // No zone
                EzDateTime.getNeverExpireDateTimeIso(true, false, false, false) == aMomentOrString ||
                // No milliseconds
                EzDateTime.getNeverExpireDateTimeIso(false, false, false, true) == aMomentOrString ||
                // No zone, no milliseconds
                EzDateTime.getNeverExpireDateTimeIso(true, false, false, true) == aMomentOrString ||
                // No milliseconds, no seconds
                EzDateTime.getNeverExpireDateTimeIso(false, false, true, true) == aMomentOrString ||
                // No Zone, no milliseconds, no seconds
                EzDateTime.getNeverExpireDateTimeIso(true, false, true, true) == aMomentOrString ||
                aMomentOrString.startsWith('9999/01/01') ||
                aMomentOrString.startsWith('9999.01.01') ||
                aMomentOrString.startsWith('01/01/9999') ||
                aMomentOrString.startsWith('01-01-9999') ||
                aMomentOrString.startsWith('01.01.9999');
        } else if (EzDateTime.ezInstance.ezIsValidMoment(aMomentOrString)) {
            return EzDateTime.NEVER_EXPIRE_DATE_ISO === EzDateTime.ezInstance.ezToIsoDate(
                EzDateTime.ezInstance.ezToUTC(aMomentOrString));
        }

        return false;
    }

    /**
     * @public @method
     * Determines if the provided aMoment (or possibly string) represents a never set date.
     * @param {undefined|null|moment|string} aMomentOrString
     * Supported string values:
     *      equals 'NEVER'
     *      starts with '0000/01/01'
     *      starts with '0000.01.01'
     *      starts with '01/01/0000'
     *      starts with '01-01-0000'
     *      starts with '01.01.0000'
     *      equals '0000-01-01T00:00:00:000Z'
     *      equals '0000-01-01T00:00:00:000'
     *      equals '0000-01-01T00:00:00Z'
     *      equals '0000-01-01T00:00:00'
     *      equals '0000-01-01T00:00Z'
     *      equals '0000-01-01T00:00'
     *      equals '0000-01-01'
     * @returns {boolean}
     */
    ezIsNeverSet(aMomentOrString) {
        if (EzString.isString(aMomentOrString)) {
            aMomentOrString = aMomentOrString.toUpperCase();

            return !EzString.hasLength(aMomentOrString) ||
                EzDateTime.NEVER_SET_DISPLAY_DATE === aMomentOrString ||
                EzDateTime.NEVER_SET_DATE_ISO === aMomentOrString ||
                EzDateTime.NEVER_SET_DATE_TIME_ISO === aMomentOrString ||
                '01-01-0000' === aMomentOrString ||
                // No zone
                EzDateTime.getNeverSetDateTimeIso(true, false, false, false) == aMomentOrString ||
                // No milliseconds
                EzDateTime.getNeverSetDateTimeIso(false, false, false, true) == aMomentOrString ||
                // No zone, no milliseconds
                EzDateTime.getNeverSetDateTimeIso(true, false, false, true) == aMomentOrString ||
                // No milliseconds, no seconds
                EzDateTime.getNeverSetDateTimeIso(false, false, true, true) == aMomentOrString ||
                // No Zone, no milliseconds, no seconds
                EzDateTime.getNeverSetDateTimeIso(true, false, true, true) == aMomentOrString ||
                aMomentOrString.startsWith('0000/01/01') ||
                aMomentOrString.startsWith('0000.01.01') ||
                aMomentOrString.startsWith('01/01/0000') ||
                aMomentOrString.startsWith('01-01-0000') ||
                aMomentOrString.startsWith('01.01.0000');
        } else if (EzDateTime.ezInstance.ezIsValidMoment(aMomentOrString)) {
            let isoDate = EzDateTime.ezInstance.ezToIsoDate(
                EzDateTime.ezInstance.ezToUTC(aMomentOrString));
            return EzDateTime.NEVER_SET_DATE_ISO === isoDate || '0000-01-01' === isoDate;
        }

        return false;
    }

    /**
     * @public @method
     * Transforms the provided isoDateTime to a displayable date
     * @param {undefined|null|string} isoDateTime
     * @returns {string}
     */
    ezIsoToDisplayDate(isoDateTime) {
        if (!EzString.hasLength(isoDateTime)) {
            return EzString.EMPTY;
        }

        if (EzDateTime.ezInstance.ezIsNeverExpire(isoDateTime)) {
            return EzDateTime.NEVER_EXPIRE_DISPLAY_DATE;
        }

        if (EzDateTime.ezInstance.ezIsNeverSet(isoDateTime)) {
            return EzDateTime.NEVER_SET_DISPLAY_DATE;
        }

        try {
            let aMoment = EzDateTime.ezInstance.ezFromIso(isoDateTime);

            return EzDateTime.ezInstance.ezToDisplayDate(aMoment);
        } catch (err) {
            ezApi.ezclocker.ezLogger.error(
                EzString.em`
                    Unable to transform iso date time '${isoDateTime} to a display date
                    due to the following error: ${err.message}`);

            return isoDateTime;
        }
    }

    /**
     * @public @method
     * Transforms the provided isoDateTime to a displayable string in format: MM/YYYY
     * @param {undefined|null|string} isoDateTime
     * @returns {string}
     */
    ezIsoToDisplayMonthYear(isoDateTime) {
        if (!EzString.hasLength(isoDateTime)) {
            return EzString.EMPTY;
        }

        try {
            let aMoment = EzDateTime.ezInstance.ezFromIso(isoDateTime);

            if (EzDateTime.ezInstance.ezIsNeverExpire(aMoment)) {
                return EzDateTime.NEVER_EXPIRE_DISPLAY_DATE;
            }

            if (EzDateTime.ezInstance.ezIsNeverSet(aMoment)) {
                return EzDateTime.NEVER_SET_DISPLAY_DATE;
            }

            return EzDateTime.ezInstance.ezToDisplayMonthYear(aMoment);
        } catch (err) {
            ezApi.ezclocker.ezLogger.error(
                EzString.em`
                    Unable to transform iso date time '${isoDateTime} to a display month and year format
                    due to the following error: ${err.message}`);

            return isoDateTime;
        }
    }

    /**
     * @public @method
     * Transforms the provided aMoment to a display string in formation: MM/YYYY
     * @param {moment} aMoment
     * @returns {string}
     */
    ezToDisplayMonthYear(aMoment) {
        if (!EzDateTime.ezInstance.ezIsValidMoment(aMoment)) {
            throw new EzBadParamException(
                'aMoment',
                EzDateTime.ezInstance,
                EzDateTime.ezInstance.ezToDisplayDate);
        }

        if (EzDateTime.ezInstance.ezIsNeverExpire(aMoment)) {
            return EzDateTime.NEVER_EXPIRE_DATE_TIME_ISO;
        }

        if (EzDateTime.ezInstance.ezIsNeverSet(aMoment)) {
            return EzDateTime.NEVER_SET_DISPLAY_DATE;
        }

        return EzDateTime.ezInstance.ezMomentWithPTZ(aMoment)
            .format(EzDateTime.DEFAULT_MONTH_YEAR_DISPLAY_FORMAT);
    }

    /**
     * @public @method
     * Returns the string formatted MM/DD/YYYY for the provided moment.js instance. If none provided,
     * returns the current date instead.
     * @param {moment} momentInstance
     * @returns {string}
     */
    ezToDisplayDate(aMoment) {
        if (!EzDateTime.ezInstance.ezIsValidMoment(aMoment)) {
            throw new EzBadParamException(
                'aMoment',
                EzDateTime.ezInstance,
                EzDateTime.ezInstance.ezToDisplayDate);
        }

        if (EzDateTime.ezInstance.ezIsNeverExpire(aMoment)) {
            return EzDateTime.NEVER_EXPIRE_DATE_TIME_ISO;
        }

        if (EzDateTime.ezInstance.ezIsNeverSet(aMoment)) {
            return EzDateTime.NEVER_SET_DISPLAY_DATE;
        }

        return EzDateTime.ezInstance.ezMomentWithPTZ(aMoment)
            .format(EzDateTime.ezInstance.ezGetPreferredDisplayDateFormat());
    }

    /**
     * @public @method
     * Sets the preferred display date format for moment objects
     * @param {string} ezPreferredDateFormat
     */
    ezSetPreferredDisplayDateFormat(ezPreferredDateFormat) {
        EzDateTime.ezInstance.ezPreferredDateFormat = EzString.hasLength(ezPreferredDateFormat)
            ? ezPreferredDateFormat
            : EzDateTime.DEFAULT_MOMENT_DATE_FORMAT;
    }

    /**
     * @public @method
     * Gets the preferred display date format for moment objects
     * Default: 'MM/DD/YYYY'
     * Example: '06/07/2021'
     * @returns {string}
     */
    ezGetPreferredDisplayDateFormat() {
        return EzDateTime.ezInstance.ezPreferredDateFormat;
    }

    /**
     * @public @method
     * Get the name of the day
     * @returns {string}
     */
    ezToDayNameDisplay(aMoment) {
        if (!EzDateTime.ezInstance.ezIsValidMoment(aMoment)) {
            throw new EzBadParamException(
                'aMoment',
                EzDateTime.ezInstance,
                EzDateTime.ezInstance.ezToDayNameDisplay);
        }

        aMoment = EzDateTime.ezInstance.ezMomentWithPTZ(aMoment);

        return aMoment.format('dddd');
    }

    /**
     * @public @method
     * Returns the day name plus date string for display using the preferred moment day name and ate format value.
     * @param {moment} aMoment
     * @returns {string}
     */
    ezToDisplayDayNameAndDate(aMoment) {
        if (!EzDateTime.ezInstance.ezIsValidMoment(aMoment)) {
            throw new EzBadParamException(
                'aMoment',
                EzDateTime.ezInstance,
                EzDateTime.ezInstance.ezToDisplayDayNameAndDate);
        }

        aMoment = EzDateTime.ezInstance.ezMomentWithPTZ(aMoment);

        return aMoment.format(EzDateTime.ezInstance.ezGetPreferredMomentDayNameAndDateFormat());
    }

    /**
     * @public @method
     * Gets the preferred date picker display format string.
     * Default: 'mm/dd/yy'
     * Example: '06/07/2021'
     * @#returns {string}
     */
    ezGetPreferredDatePickerFormat() {
        return EzDateTime.ezInstance.ezPreferredDatePickerFormat;
    }

    /**
     * @public @method
     * Sets the preferred date picker display format
     * @param {string} datePickerFormat
     */
    ezSetPreferredDatePickerFormat(datePickerFormat) {
        EzDateTime.ezInstance.ezPreferredDatePickerFormat = EzString.hasLength(datePickerFormat)
            ? datePickerFormat
            : EzDateTime.DEFAULT_DATE_PICKER_FORMAT;
    }

    /**
     * @public @method
     * Returns the preferred day name plus date format string for moment objects.
     * Default format: 'dddd MM/DD/YYYY'
     * Example: Monday '06/07/2021'
     * @returns {string}
     */
    ezGetPreferredMomentDayNameAndDateFormat() {
        return EzDateTime.ezInstance.ezPreferredMomentDayNameAndDateFormat;
    }

    /**
     * @public @method
     * Sets the preferred moment Day Name and Date format string.
     * @param {string} preferredMomentDayNameAndDateFormat
     */
    ezSetPreferredMomentDayNameAndDateFormat(preferredMomentDayNameAndDateFormat) {
        EzDateTime.ezInstance.ezPreferredMomentDayNameAndDateFormat =
            EzString.hasLength(preferredMomentDayNameAndDateFormat)
                ? preferredMomentDayNameAndDateFormat
                : EzDateTime.DEFAULT_MOMENT_DAY_NAME_DATE_FORMAT;
    }

    /**
     * @public @method
     * Returns a date range in format: "{sDate} - {eDate}"
     * @param {moment} sMoment
     * @param {moment} eMoment
     * @returns {string}
     */
    ezToDisplayDateRange(sMoment, eMoment) {
        if (!EzDateTime.ezInstance.ezIsValidMoment(sMoment)) {
            throw new EzBadParamException(
                'sMoment',
                EzDateTime.ezInstance,
                EzDateTime.ezInstance.ezToDisplayDateRange);
        }

        if (!EzDateTime.ezInstance.ezIsValidMoment(eMoment)) {
            throw new EzBadParamException(
                'eMoment',
                EzDateTime.ezInstance,
                EzDateTime.ezInstance.ezToDisplayDateRange);
        }

        sMoment = EzDateTime.ezInstance.ezMomentWithPTZ(sMoment);

        eMoment = EzDateTime.ezInstance.ezMomentWithPTZ(eMoment);

        let startDate = sMoment.format(EzDateTime.ezInstance.ezPreferredDateFormat);

        let endDate = eMoment.format(EzDateTime.ezInstance.ezPreferredDateFormat);

        return `${startDate} - ${endDate}`;
    }

    /**
     * @public @method
     * Returns the string hh:mm a format of the provided moment. If the moment is not valid, then the current time is used.
     * @param {moment} aMoment
     * @returns {string}
     */
    ezTimeString(aMoment) {
        if (!EzDateTime.ezInstance.ezIsValidMoment(aMoment)) {
            throw new EzBadParamException(
                'aMoment',
                EzDateTime.ezInstance,
                EzDateTime.ezInstance.ezTimeString);
        }

        aMoment = EzDateTime.ezInstance.ezMomentWithPTZ(aMoment);

        return aMoment.format('hh:mm a');
    }

    /**
     * @public @method
     * Returns the provided moment to the configured preferred date time display format.
     * Template: "MM/DD/YYYY[ at ]hh:mm a"
     * Templated provided from field: ezApi.ezclocker.ezDateTime.ezPreferredDateTimeFormat
     * Field default built from constants:
            EzDateTime.DEFAULT_MOMENT_DATE_TIME_FORMAT
            EzDateTime.DEFAULT_MOMENT_DATE_FORMAT
            EzDateTime.DEFAULT_MOMENT_HH_MM_TIME_FORMAT
     * Documentation for moment.js formatting: https://momentjs.com/docs/#/displaying/
     * @param {moment} aMoment
     * @returns {string}
     */
    ezToDisplayDateTime(aMoment) {
        if (!EzDateTime.ezInstance.ezIsValidMoment(aMoment)) {
            throw new EzBadParamException(
                'aMoment',
                EzDateTime.ezInstance,
                EzDateTime.ezInstance.ezToDisplayDateTime);
        }

        aMoment = EzDateTime.ezInstance.ezMomentWithPTZ(aMoment);

        return aMoment.format(EzDateTime.ezInstance.ezPreferredDateTimeFormat);
    }

    /**
     * @public @method
     * Returns the provided moment to the configured preferred date time display format.
     * Template: "MM/DD/YYYY[ at ]hh:mm:ss a"
     * Templated provided from field: ezApi.ezclocker.ezDateTime.ezPreferredDateTimeFormat
     * Field default built from constants:
            EzDateTime.DEFAULT_MOMENT_DATE_TIME_FORMAT
            EzDateTime.DEFAULT_MOMENT_DATE_FORMAT
            EzDateTime.DEFAULT_MOMENT_HH_MM_SS_TIME_FORMAT
     * Documentation for moment.js formatting: https://momentjs.com/docs/#/displaying/
     * @param {moment} aMoment
     * @returns {string}
     */
    ezToDisplayDateTimeWithSeconds(aMoment) {
        if (!EzDateTime.ezInstance.ezIsValidMoment(aMoment)) {
            throw new EzBadParamException(
                'aMoment',
                EzDateTime.ezInstance,
                EzDateTime.ezInstance.ezToDisplayDateTimeWithSeconds);
        }

        aMoment = EzDateTime.ezInstance.ezMomentWithPTZ(aMoment);

        return aMoment.format(EzDateTime.ezInstance.ezPreferredDateTimeWithSecondsFormat);
    }

    /**
     * @deprecated
     * Migrate to: ezApi.ezclocker.ezDateTime.ezToIso()
     * @public @method
     * Returns the ISO string in the selected timezone, for the provided moment.
     * Template: "YYYY-MM-DDTHH:mm:ss.sssZ"
     * Documentation for moment.js formatting: https://momentjs.com/docs/#/displaying/
     * @param {moment} aMoment
     * @returns {string}
     */
    ezToIsoDateTime(aMoment) {
        return EzDateTime.ezInstance.ezToIso(aMoment);
    }

    /**
     * @public @method
     * Converts the provided moment to a ISO date string in the format of YYYY-MM-DD
     * Template: "YYYY-MM-DD"
        ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        ENGINEERING NOTES
        ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
     * Documentation for moment.js formatting: https://momentjs.com/docs/#/displaying/
        ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
     * @param {moment} aMoment
     * @returns {string}
     */
    ezToIsoDate(aMoment) {
        if (!EzDateTime.ezInstance.ezIsValidMoment(aMoment)) {
            throw new EzBadParamException(
                'aMoment',
                EzDateTime.ezInstance,
                EzDateTime.ezInstance.ezToIsoDate);
        }

        aMoment = EzDateTime.ezInstance.ezMomentWithPTZ(aMoment);

        return aMoment.format('YYYY-MM-DD');
    }

    /**
     * @public @method
     * Returns the ISO string in the selected timezone, for the provided moment.
     * Template: "YYYY-MM-DDTHH:mm:ss.sssZ"
     * Documentation for moment.js formatting: https://momentjs.com/docs/#/displaying/
     * @param {moment} aMoment
     * @returns {string}
     * Returns the provided moment in ISO format: "YYYY-MM-DDTHH:mm:ss.sssZ"
     */
    ezToIso(aMoment, timeZoneId) {
        if (!EzDateTime.ezInstance.ezIsValidMoment(aMoment)) {
            throw new EzBadParamException(
                'aMoment',
                EzDateTime.ezInstance,
                EzDateTime.ezInstance.ezToIso);
        }

        return aMoment.tz(EzDateTime.ezInstance.ezUseTimeZoneId(timeZoneId)).format();
    }

    /**
     * @public @method
     * Returns the moment as a 'UNIX' MS timestamp.
     * Template: "x"
     * Documentation for moment.js formatting: https://momentjs.com/docs/#/displaying/
     * @param {moment} aMoment
     * @returns {tsring}
     */
    ezToTimestamp(aMoment) {
        if (!EzDateTime.ezInstance.ezIsValidMoment(aMoment)) {
            throw new EzBadParamException(
                'aMoment',
                EzDateTime.ezInstance,
                EzDateTime.ezInstance.ezToTimestamp);
        }

        return EzDateTime.ezInstance.ezMomentWithPTZ(aMoment).format('x');
    }

    /**
     * @public @method
     * Returns the provided date as a version string in the formation: 'YYYYMMDDHHmmssSSS'
     * See https://momentjs.com/docs/#/displaying/ for formatting string details.
     * @param {moment} aMoment
     * @returns {String}
     */
    ezToVersionStamp(aMoment) {
        if (!EzDateTime.ezInstance.ezIsValidMoment(aMoment)) {
            throw new EzBadParamException(
                'aMoment',
                EzDateTime.ezInstance,
                EzDateTime.ezInstance.ezToTimestamp);
        }

        return EzDateTime.ezInstance.ezMomentWithPTZ(aMoment).format('YYYYMMDDHHmmssSSS');
    }

    /**
     * @public @readonly @property
     * Returns the current date and time as a version string in the formation: 'YYYYMMDDHHmmssSSS'
     * See https://momentjs.com/docs/#/displaying/ for formatting string details.
     * @returns {String}
     */
    get ezNowVersionStamp() {
        return EzDateTime.ezInstance.ezNow().format('YYYYMMDDHHmmssSSS');
    }

    /**
     * @public @method
     * Returns the moment.now() as a 'UNIX' MS timestamp.
     * Template: "x"
     * Documentation for moment.js formatting: https://momentjs.com/docs/#/displaying/
     * @param {moment} aMoment
     * @returns {tsring}
     */
    ezNowAsTimestamp() {
        return EzDateTime.ezInstance.ezNow().format('x');

    }

    /**
     * @public @method
     * Returns the moment as a ISO String in UTC time zone
     * @param {moment} aMoment
     * @returns {string}
     * @deprecated
     * Migrate to: ezApi.ezclocker.ezDateTime.ezToIsoUTC(aMoment)
     */
    ezToUTCIsoDateTime(aMoment) {
        if (!EzDateTime.ezInstance.ezIsValidMoment(aMoment)) {
            throw new EzBadParamException(
                'aMoment',
                EzDateTime.ezInstance,
                EzDateTime.ezInstance.ezToUTCIsoDateTime);
        }

        return EzDateTime.ezInstance.ezToIsoUTC(aMoment);
    }

    /**
     * @public @method
     * Returns the moment as a ISO String in UTC time zone
     * @param {moment} aMoment
     * @returns {string}
     */
    ezToIsoUTC(aMoment) {
        if (!EzDateTime.ezInstance.ezIsValidMoment(aMoment)) {
            throw new EzBadParamException(
                'aMoment',
                EzDateTime.ezInstance,
                EzDateTime.ezInstance.ezToIsoUTC);
        }

        return aMoment.tz('UTC').format();
    }


    /**
     * @public @method
     * Returns a moment instance in the preferred timezone for the date, with time at the beginning of the date.
     * @param {number} aMonth
     * From 0 to 11
     * @param {number} aDay
     * From 1 to 31
     * @param {number} aYear
     * @returns {moment}
     */
    ezFromDate(aMonth, aDay, aYear) {
        if (!EzNumber.isNumber(aMonth)) {
            throw new EzBadParamException(
                'aMonth',
                EzDateTime.ezInstance,
                EzDateTime.ezInstance.ezFromDate);
        }
        if (!EzNumber.isNumber(aDay)) {
            throw new EzBadParamException(
                'aDay',
                EzDateTime.ezInstance,
                EzDateTime.ezInstance.ezFromDate);
        }
        if (!EzNumber.isNumber(aYear)) {
            throw new EzBadParamException(
                'aYear',
                EzDateTime.ezInstance,
                EzDateTime.ezInstance.ezFromDate);
        }

        return EzDateTime.ezInstance.ezNow()
            .set('year', aYear)
            .set('date', aDay)
            .set('month', aMonth)
            .set('hour', 0)
            .set('minute', 0)
            .set('second', 0)
            .set('millisecond', 0);
    }

    /**
     * @public @method
     * Returns the moment from the provided date string in format mm/dd/yyyy
     * @param {string} dateString
     * @returns {moment}
     */
    ezFromDateString(dateString) {
        if (!EzString.hasLength(dateString)) {
            throw new EzBadParamException(
                'dateString',
                EzDateTime.ezInstance,
                EzDateTime.ezInstance.ezFromDateString);
        }

        let dateParts = dateString.split('/');

        // month is zero based
        return EzDateTime.ezInstance.ezFromDate(
            parseInt(dateParts[0]) - 1,
            parseInt(dateParts[1]),
            parseInt(dateParts[2]));
    }

    /**
     * @public @method
     * Returns the moment from the provided date string.
     * String is expected to be in the format of the  EzDateTime.ezInstance.ezPreferredDateFormat result
     * @param {string} preferredDateString
     * @returns {moment}
     */
    ezMomentFromPreferredDateString(preferredDateString) {
        if (!EzString.hasLength(preferredDateString)) {
            throw new EzBadParamException(
                'preferredDateString',
                EzDateTime.ezInstance,
                EzDateTime.ezInstance.ezMomentFromPreferredDateString);
        }

        let aMoment = moment(
            preferredDateString,
            EzDateTime.ezInstance.ezPreferredDateFormat,
            true);

        if (!aMoment.isValid()) {
            throw new EzException(
                EzString.em`
                    The provided preferredDateString value of "${preferredDateString}" did not translate to a momentjs instance.
                    Assumed formatting of ${EzDateTime.ezInstance.ezPreferredDateFormat}`);
        }

        return EzDateTime.ezInstance.ezMomentWithPTZ(aMoment);
    }

    /**
     * @public @method
     * @param {string} aValue
     * @returns {moment}
     */
    ezCreateFromValue(aValue) {
        if (!EzString.hasLength(aValue)) {
            throw new EzBadParamException(
                'aValue',
                EzDateTime.ezInstance,
                EzDateTime.ezInstance.ezCreateFromValue);
        }

        let aMoment = !moment(aValue);

        return aMoment.isValid()
            ? EzDateTime.ezInstance.ezMomentWithPTZ(aMoment)
            : EzDateTime.ezInstance.ezNowWithStartOfDay();
    }

    /**
     * @public @method
     * @param {string} dateTimeString
     * @param {string} expectedFormat
     * @returns {moment}
     */
    ezCreateFromValueInFormat(dateTimeString, expectedFormat) {
        if (!EzString.hasLength(dateTimeString) || !EzString.hasLength(expectedFormat)) {
            return null;
        }

        let aMoment = moment(dateTimeString, expectedFormat);

        return aMoment.isValid()
            ? EzDateTime.ezInstance.ezMomentWithPTZ(aMoment)
            : EzDateTime.ezInstance.ezNowWithStartOfDay();
    }

    /**
     * @public @method
     * Returns the current date and time as an ISO string
     * @param {undefined|null|string} timeZoneId
     * Default: ezApi.ezclocker.ezDateTime.activeTimeZone
     * @returns {string}
     */
    ezNowAsIso(timeZoneId = EzDateTime.ezInstance.activeTimeZone) {
        return EzDateTime.ezInstance.ezToIso(EzDateTime.ezInstance.ezNow(timeZoneId));
    }

    /**
     * @public @method
     * @param {undefined|null|string} timeZoneId
     * Default: ezApi.ezclocker.ezDateTime.activeTimeZone
     * @returns {moment}
     */
    ezNow(timeZoneId = EzDateTime.ezInstance.activeTimeZone) {
        return moment().tz(EzDateTime.ezInstance.ezUseTimeZoneId(timeZoneId));
    }

    /**
     * @public @method
     * Returns a moment instance in the provided timeZoneId
     * (or ezApi.ezclocker.ezDateTime.activeTimeZone timeZoneId is not provided)
     * for the current date with the time at: 00:00:00.000.
     * @param {undefined|null|string} timeZoneId
     * Default: ezApi.ezclocker.ezDateTime.activeTimeZone
     * @returns {moment}
     */
    ezNowWithStartOfDay(timeZoneId = EzDateTime.ezInstance.activeTimeZone) {
        return EzDateTime.ezInstance.ezNow(timeZoneId).startOf('day');
    }

    /**
     * @public @method
     * Returns a moment instance in the provided timeZoneId
     * (or ezApi.ezclocker.ezDateTime.activeTimeZone timeZoneId is not provided)
     * for the current date with the time at: 23:59:59.999.
     * @param {undefined|null|string} timeZoneId
     * Default: ezApi.ezclocker.ezDateTime.activeTimeZone
     * @returns {moment}
     */
    ezNowWithEndOfDay(timeZoneId = EzDateTime.ezInstance.activeTimeZone) {
        return EzDateTime.ezInstance.ezNow(timeZoneId).endOf('day');
    }

    /**
     * @public @method
     * Returns a new moment instance in the following way:
     *  1) Creates a new temp moment instance from the provided aMoment in the ezApi.ezclocker.ezDateTime.activeTimeZone.
     *  2) Creates a new moment instance from the temp instance with:
     *      a) The year from the provided aMoment
     *      b) The month set as 1 (Janurary)
     *      c) The date in the month as 1
     *      d) The time at the beginning of the day (00:00:00.000)
     * @param {moment} aMoment
     * @returns {moment}
     */
    ezSetMomentFirstDayOfYear(aMoment, timeZoneId = EzDateTime.ezInstance.activeTimeZone) {
        if (!EzDateTime.ezInstance.ezIsValidMoment(aMoment)) {
            throw new EzBadParamException(
                'aMoment',
                EzDateTime.ezInstance,
                EzDateTime.ezInstance.ezSetMomentFirstDayOfYear);
        }

        return EzDateTime.ezInstance.ezDateTimeWithTimeAtStartOfDay(aMoment, timeZoneId).date(1).day(1);
    }

    /**
     * @public @method
     * Returns a new moment instance in the following way:
     *  1) Creates a new temp moment instance from the provided aMoment in the ezApi.ezclocker.ezDateTime.activeTimeZone.
     *  2) Creates a new moment instance from the temp instance with:
     *      a) The year from the provided aMoment
     *      b) The month set as 1 (Janurary)
     *      c) The date in the month as 1
     *      d) The time at the end of the day (23:59:59.999)
     * @param {moment} aMoment
     * @returns {moment}
     */
    ezSetMomentLastDayOfYear(aMoment, timeZoneId = EzDateTime.ezInstance.activeTimeZone) {
        if (!EzDateTime.ezInstance.ezIsValidMoment(aMoment)) {
            throw new EzBadParamException(
                'aMoment',
                EzDateTime.ezInstance,
                EzDateTime.ezInstance.ezSetMomentLastDayOfYear);
        }

        return EzDateTime.ezInstance.ezDateTimeWithTimeAtEndOfDay(aMoment, timeZoneId).date(12).day(31);
    }

    /**
     * @public @method
     * Returns a new moment instance in the following way:
     *  1) Creates a new moment instance from the provided aMoment in the provided timeZoneId
     *      a) Sets the new moment instance's hour to 0
     *      b) Sets the new moment instance's minutes to 0
     *      c) Sets the new moment instance's seconds to 0
     *      d) Sets the new moment instance's milliseconds to 0
     * @param {moment} aMoment
     * @returns {moment}
     * @deprecated
     * Migrate to: ezApi.ezclocker.ezDateTime.ezDateTimeWithTimeAtStartOfDay(aMoment, timeZoneId)
     */
    ezSetMomentStartOfDay(aMoment, timeZoneId = EzDateTime.ezInstance.activeTimeZone) {
        if (!EzDateTime.ezInstance.ezIsValidMoment(aMoment)) {
            throw new EzBadParamException(
                'aMoment',
                EzDateTime.ezInstance,
                EzDateTime.ezInstance.ezSetMomentStartOfDay);
        }

        return EzDateTime.ezInstance.ezDateTimeWithTimeAtStartOfDay(aMoment, timeZoneId);
    }

    /**
     * @public @method
     * Returns a new moment instance in the following way:
     *  1) Creates a new moment instance from the provided aMoment in the provided timeZoneId
     *      a) Sets the new moment instance's hour to 0
     *      b) Sets the new moment instance's minutes to 0
     *      c) Sets the new moment instance's seconds to 0
     *      d) Sets the new moment instance's milliseconds to 0
     * @param {moment} aMoment
     * @returns {moment}
     */
    ezDateTimeWithTimeAtStartOfDay(aMoment, timeZoneId = EzDateTime.ezInstance.activeTimeZone) {
        if (!EzDateTime.ezInstance.ezIsValidMoment(aMoment)) {
            throw new EzBadParamException(
                'aMoment',
                EzDateTime.ezInstance,
                EzDateTime.ezInstance.ezDateTimeWithTimeAtStartOfDay);
        }

        return EzDateTime.ezInstance.ezDateTimeWithTimeZone(aMoment, timeZoneId)
            .hours(0)
            .minutes(0)
            .seconds(0)
            .milliseconds(0);
    }

    /**
     * @public @method
     * Returns a new moment instance in the following way:
     *  1) Creates a new moment instance from the provided aMoment in the provided timeZoneId
     *      a) Sets the new moment instance's hour to 23
     *      b) Sets the new moment instance's minutes to 59
     *      c) Sets the new moment instance's seconds to 59
     *      d) Sets the new moment instance's milliseconds to 999
     * @param {moment} aMoment
     * @returns {moment}
     * @deprecated
     * Migrate to: ezApi.ezclocker.ezDateTime.ezDateTimeWithTimeAtEndOfDay(aMoment, timeZoneId)
     */
    ezSetMomentEndOfDay(aMoment, timeZoneId = EzDateTime.ezInstance.activeTimeZone) {
        if (!EzDateTime.ezInstance.ezIsValidMoment(aMoment)) {
            throw new EzBadParamException(
                'aMoment',
                EzDateTime.ezInstance,
                EzDateTime.ezInstance.ezSetMomentEndOfDay);
        }

        return EzDateTime.ezInstance.ezDateTimeWithTimeAtEndOfDay(aMoment, timeZoneId);
    }

    /**
     * @public @method
     * Returns a new moment instance in the following way:
     *  1) Creates a new moment instance from the provided aMoment in the provided timeZoneId
     *      a) Sets the new moment instance's hour to 23
     *      b) Sets the new moment instance's minutes to 59
     *      c) Sets the new moment instance's seconds to 59
     *      d) Sets the new moment instance's milliseconds to 999
     * @param {moment} aMoment
     * @returns {moment}
     */
    ezDateTimeWithTimeAtEndOfDay(aMoment, timeZoneId = EzDateTime.ezInstance.activeTimeZone) {
        if (!EzDateTime.ezInstance.ezIsValidMoment(aMoment)) {
            throw new EzBadParamException(
                'aMoment',
                EzDateTime.ezInstance,
                EzDateTime.ezInstance.ezDateTimeWithTimeAtEndOfDay);
        }

        return EzDateTime.ezInstance.ezDateTimeWithTimeZone(aMoment, timeZoneId)
            .hours(23)
            .minutes(59)
            .seconds(59)
            .milliseconds(999);
    }

    /**
     * @public @method
     * Returns a new moment instance created from the provided aMoment then sets the time zone to the
     * provdied timeZoneId.
     * Uses ezApi.ezclocker.ezDateTime.activeTimeZone if the provided timeZoneId is not a valid time zone.
     * @param {moment} aMoment
     * @param {string} timeZoneId
     * Default: ezApi.ezclocker.ezDateTime.activeTimeZone
     * @returns {moment}
     */
    ezDateTimeWithTimeZone(aMoment, timeZoneId) {
        if (!EzDateTime.ezInstance.ezIsValidMoment(aMoment)) {
            throw new EzBadParamException(
                'aMoment',
                EzDateTime.ezInstance,
                EzDateTime.ezInstance.ezDateTimeWithTimeZone);
        }

        return moment(aMoment).tz(EzDateTime.ezInstance.ezUseTimeZoneId(timeZoneId));
    }

    /**
     * @public @method
     * Determines if the provided moment is a valid moment object.
     * @returns {boolean}
     */
    ezIsValidMoment(aMoment) {
        return EzObject.isValid(aMoment) && aMoment?._isAMomentObject && aMoment?._isValid;
    }

    /**
     * @public @method
     * Returns the provided aMoment if it is a valid moment instance.
     * If the provided aMoment is not a valid moment instance, then returns
     * a new moment instance with the current date and time.
     * @returns {moment}
     * @deprecated
     * Migrate to:
     *  ezApi.ezclocker.ezDateTime.ezDateTimeOrNow(aMoment)
     */
    ezAssignMomentOrNow(aMoment) {
        return EzDateTime.ezInstance.ezDateTimeOrNow(aMoment);
    }

    /**
     * @public @method
     * Returns the provided aMoment if it is a valid moment instance.
     * If the provided aMoment is not a valid moment instance, then returns
     * a new moment instance with the current date and time.
     * @returns {moment}
     */
    ezDateTimeOrNow(aMoment) {
        return ezApi.ezclocker.ezDateTime.ezIsValidMoment(aMoment)
            ? aMoment
            : ezApi.ezclocker.ezDateTime.ezNow();
    }

    /**
     * @public @method
     * If the provided aMoment is a vallid moment then the aMoment is return with
     * it's time set to the start of the day.
     * If the provided aMoment is not a valid moment, then now is returned
     * with it's time set to the start of the day.
     * @param {undefined|null|moment} aMoment
     * @returns {moment}
     * @deprecated
     * Migrate to:
     *  ezApi.ezclocker.ezDateTime.ezDateTimeOrNowWithTimeAtStartOfDay(aMoment);
     */
    ezAssignMomentOrNowThenSetTimeAtStartOfDay(aMoment) {
        return ezApi.ezclocker.ezDateTime.ezDateTimeOrNowWithTimeAtStartOfDay(aMoment);
    }

    /**
     * @public @method
     * If the provided aMoment is a vallid moment then the aMoment is return with
     * it's time set to the start of the day.
     * If the provided aMoment is not a valid moment, then now is returned
     * with it's time set to the start of the day.
     * @param {undefined|null|moment} aMoment
     * @returns {moment}
     */
    ezDateTimeOrNowWithTimeAtStartOfDay(aMoment) {
        return ezApi.ezclocker.ezDateTime.ezIsValidMoment(aMoment)
            ? ezApi.ezclocker.ezDateTime.ezDateTimeWithTimeAtStartOfDay(aMoment)
            : ezApi.ezclocker.ezDateTime.ezNowWithStartOfDay();
    }

    /**
     * @public @method
     * Returns a time period object with:
     *  1) The start date as today's date with time at the beginning of the day in the active time zone.
     *  2) The end date as today's date plus 13 days with the time at the end of the day in the active time zone.
     * @returns {object}
     */
    ezCreateDefaultSelectedPeriod() {
        let nowEzDateTimeWithTimeAtStartOfDayActive = EzDateTime.ezInstance.ezNowWithStartOfDay()

        return EzDateTime.ezInstance.ezCreateSelectedPeriod(
            nowEzDateTimeWithTimeAtStartOfDayActive,
            EzDateTime.ezInstance.ezDateTimeWithTimeAtEndOfDay(
                nowEzDateTimeWithTimeAtStartOfDayActive.add(13, 'days')));
    }

    /**
     * @public @method
     * Creates the default selected period object, sets the values as ISO strings, and converts to JSON
     * @returns {string}
     */
    ezCreateDefaultSelectedPeriodJson() {
        let selectedPeriod = EzDateTime.ezInstance.ezCreateDefaultSelectedPeriod();

        selectedPeriod.ezPeriodStartMoment = EzDateTime.ezInstance.ezToIso(selectedPeriod.ezPeriodStartMoment);

        selectedPeriod.ezPeriodEndMoment = EzDateTime.ezInstance.ezToIso(selectedPeriod.ezPeriodEndMoment);

        return ezApi.ezToJson(selectedPeriod);
    }

    /**
     * Transforms the provided momentInYear to the last date time of the year the
     * provided momentInYear is for.
     * @param {moment} momentInYear
     * @returns {moment}
     */
    ezToEndOfYear(momentInYear) {
        if (!EzDateTime.ezInstance.ezIsValidMoment(momentInYear)) {
            throw new EzBadParamException(
                'momentInYear',
                EzDateTime.ezInstance,
                EzDateTime.ezInstance.ezToEndOfYear);
        }

        return EzDateTime.ezInstance.ezMomentWithPTZ(momentInYear)
            .endOf('year');
    }

    /**
     * @public @method
     * Returns the provied aMoment as a display string formatted
     * for the date input controls.
     * @param {moment} aMoment
     * @returns {string}
     */
    ezToDatePickerDisplayDate(aMoment) {
        if (!EzDateTime.ezInstance.ezIsValidMoment(aMoment)) {
            throw new EzBadParamException(
                'aMoment',
                EzDateTime.ezInstance,
                EzDateTime.ezInstance.ezToDatePickerDisplayDate);
        }

        return EzDateTime.ezInstance.ezMomentWithPTZ(aMoment)
            .format(EzDateTime.DEFAULT_MM_DD_YYYY_FORMAT);
    }

    /**
     * @public @method
     * Creates the default employee options
     * @param {moment} periodStartMoment
     * @param {moment} periodEndMoment
     * @returns {object}
     * Returns time period object:
     *  {
     *      ezStartEzDateTimeActive: {moment},
     *      ezStartEzDateTimeUTC: {moment}
     *      ezStartIsoActive: {string},
     *      ezStartIsoUTC: {string},
     *      ezEndEzDateTimeActive: {moment},
     *      ezEndEzDateTimeUTC: {moment},
     *      ezEndIsoActive: {string},
     *      ezEndIsoUTC: {string},
     *
     *      In addition, contains  additional Legacy properties: Please migrate to using of the properties above
     *      ezPeriodStartMoment: {moment},
     *      periodStartMoment: {moment},
     *      periodStartIso: {string},
     *      ezPeriodEndMoment: {moment},
     *      periodEndMoment: {moment},
     *      periodEndIso: {string}
     *  };
     */
    ezCreateSelectedPeriod(periodStartMoment, periodEndMoment) {
        if (!EzDateTime.ezInstance.ezIsValidMoment(periodStartMoment)) {
            throw new EzBadParamException(
                'periodStartMoment',
                EzDateTime.ezInstance,
                EzDateTime.ezInstance.ezCreateSelectedPeriod);
        }
        if (!EzDateTime.ezInstance.ezIsValidMoment(periodEndMoment)) {
            throw new EzBadParamException(
                'periodEndMoment',
                EzDateTime.ezInstance,
                EzDateTime.ezInstance.ezCreateSelectedPeriod);
        }

        let startMomentActive = EzDateTime.ezInstance.ezMomentWithPTZ(periodStartMoment);
        let startMomentUTC = ezApi.ezclocker.ezDateTime.ezDateTimeWithTimeZone(periodStartMoment, 'UTC');
        let startIsoActive = EzDateTime.ezInstance.ezToIso(startMomentActive);
        let startIsoUTC = EzDateTime.ezInstance.ezToIso(startMomentUTC);

        let endEzDateTimeActive = EzDateTime.ezInstance.ezMomentWithPTZ(periodEndMoment);
        let endEzDateTimeUTC = ezApi.ezclocker.ezDateTime.ezDateTimeWithTimeZone(periodStartMoment, 'UTC');
        let endIsoActive = EzDateTime.ezInstance.ezToIso(endEzDateTimeActive);
        let endIsoUTC = EzDateTime.ezInstance.ezToIso(endEzDateTimeUTC);

        // TODO: Create an EzTimePeriod JS class
        return {
            ezStartEzDateTimeActive: startMomentActive,
            ezStartEzDateTimeUTC: startMomentUTC,
            ezStartIsoActive: startIsoActive,
            ezStartIsoUTC: startIsoUTC,
            ezEndEzDateTimeActive: endEzDateTimeActive,
            ezEndEzDateTimeUTC: endEzDateTimeUTC,
            ezEndIsoActive: endIsoActive,
            ezEndIsoUTC: endIsoUTC,
            // Legacy properties - migrate to one of the above
            ezPeriodStartMoment: startMomentActive,
            periodStartMoment: startMomentActive,
            periodStartIso: startIsoActive,
            ezPeriodEndMoment: endEzDateTimeActive,
            periodEndMoment: endEzDateTimeActive,
            periodEndIso: endIsoActive
        };
    }

    ezCreateSelectedPeriodJSON(periodStartMoment, periodEndMoment) {
        if (!EzDateTime.ezInstance.ezIsValidMoment(periodStartMoment)) {
            throw new EzBadParamException(
                'periodStartMoment',
                EzDateTime.ezInstance,
                EzDateTime.ezInstance.ezCreateSelectedPeriod);
        }
        if (!EzDateTime.ezInstance.ezIsValidMoment(periodEndMoment)) {
            throw new EzBadParamException(
                'periodEndMoment',
                EzDateTime.ezInstance,
                EzDateTime.ezInstance.ezCreateSelectedPeriod);
        }

        let startMomentActive = EzDateTime.ezInstance.ezMomentWithPTZ(periodStartMoment);
        let startMomentUTC = ezApi.ezclocker.ezDateTime.ezDateTimeWithTimeZone(periodStartMoment, 'UTC');
        let startIsoActive = EzDateTime.ezInstance.ezToIso(startMomentTarget);
        let startIsoUTC = EzDateTime.ezInstance.ezToIso(startMomentUTC);

        let endEzDateTimeActive = EzDateTime.ezInstance.ezMomentWithPTZ(periodEndMoment);
        let endEzDateTimeUTC = EzDateTime.ezInstance.ezMomentWithPTZ(periodEndMoment);
        let endIsoActive = EzDateTime.ezInstance.ezToIso(endMoment);
        let endIsoUTC = EzDateTime.ezInstance.ezToIso(endMoment);

        // TODO: Create an EzTimePeriod JS class
        return {
            //ezStartEzDateTimeActive: startMomentActive,
            //ezStartEzDateTimeUTC: startMomentUTC,
            ezStartIsoActive: startIsoActive,
            ezStartIsoUTC: startIsoUTC,
            //ezEndEzDateTimeActive: endEzDateTimeActive,
            //ezEndEzDateTimeUTC: endEzDateTimeUTC,
            ezEndIsoActive: endIsoActive,
            ezEndIsoUTC: endIsoUTC,
            // Legacy properties - migrate to one of the above
            //ezPeriodStartMoment: startMomentActive,
            //periodStartMoment: startMomentActive,
            periodStartIso: startIsoActive,
            //ezPeriodEndMoment: endEzDateTimeActive,
            //periodEndMoment: endEzDateTimeActive,
            periodEndIso: endEndIsoActive
        };
    }

    /**
     * @public @method
     * Creates a selected period object from the provided moments, sets the values as ISO strings, converts to JSON
     * @param {moment} periodStartMoment
     * @param {moment} periodEndMoment
     * @returns {string}
     */
    ezCreateSelectedPeriodJson(periodStartMoment, periodEndMoment) {
        if (!EzDateTime.ezInstance.ezIsValidMoment(periodStartMoment)) {
            throw new EzBadParamException(
                periodStartMoment,
                EzDateTime.ezInstance,
                EzDateTime.ezInstance.ezCreateSelectedPeriodJson);
        }
        if (!EzDateTime.ezInstance.ezIsValidMoment(periodEndMoment)) {
            throw new EzBadParamException(
                periodEndMoment,
                EzDateTime.ezInstance,
                EzDateTime.ezInstance.ezCreateSelectedPeriodJson);
        }

        return EzJson.toJson(
            EzDateTime.ezInstance.ezCreateSelectedPeriod(periodStartMoment, periodEndMoment));
    }

    /**
     * @public @method
     * Sets the aMoment instnace to the preferred time zone then executes the moment.add() function using the provided
     * aValueKey and aAmountToAdd as the params.
     * The aValueKey can be either the full name or short hand value:
     *     years|y
     *     quarters|Q
     *     months|M
     *     weeks|w
     *     days|d
     *     hours|h
     *     minutes|m
     *     seconds|s
     *     milliseconds|ms
     *     Calling:  EzDateTime.ezInstance.ezMomentWithPTZ({aMoment}).add({aAmountToAdd}, {aValueKey});
     * @param {moment} aMoment
     * @param {string} aValueKey
     * @param {number} aAmountToAdd
     * @returns {moment}
     */
    ezPlus(aMoment, aValueKey, aAmountToAdd) {
        if (!EzDateTime.ezInstance.ezIsValidMoment(aMoment)) {
            throw new EzBadParamException(
                'aMoment',
                EzDateTime.ezInstance,
                EzDateTime.ezInstance.ezAdd);
        }

        if (!EzString.hasLength(aValueKey)) {
            throw new EzBadParamException(
                'aValueKey',
                EzDateTime.ezInstance,
                EzDateTime.ezInstance.ezAdd);
        }

        if (!EzNumber.isNumber(aAmountToAdd)) {
            throw new EzBadParamException(
                'aAmountToAdd',
                EzDateTime.ezInstance,
                EzDateTime.ezInstance.ezAdd);
        }

        aMoment = EzDateTime.ezInstance.ezMomentWithPTZ(aMoment);

        return aMoment.add(aAmountToAdd, aValueKey);
    }

    /**
     * @public @method
     * Sets the aMoment instance to the preferred time zone then executes the moment.add() function using the provided
     * aValueKey and aAmountToAdd as the params.
     * The aValueKey can be either the full name or short hand value:
     *     years|y
     *     quarters|Q
     *     months|M
     *     weeks|w
     *     days|d
     *     hours|h
     *     minutes|m
     *     seconds|s
     *     milliseconds|ms
     *     Calling:  EzDateTime.ezInstance.ezMomentWithPTZ({aMoment}).add({aAmountToAdd}, {aValueKey});
     * @param {moment} aMoment
     * @param {string} aValueKey
     * @param {number} aAmountToAdd
     * @returns {moment}
     */
    ezAdd(aMoment, aValueKey, aAmountToAdd) {
        return ezPlus(aMoment, aValueKey, aAmountToAdd);
    }


    /**
     * @public @method
     * Sets the aMoment instance to the UTC time zone then executes the moment.add() function using the provided
     * aValueKey and aAmountToAdd as the params.
     * The aValueKey can be either the full name or short hand value:
     *     years|y
     *     quarters|Q
     *     months|M
     *     weeks|w
     *     days|d
     *     hours|h
     *     minutes|m
     *     seconds|s
     *     milliseconds|ms
     * Calls:  EzDateTime.ezInstance.ezToUTC({aMoment}).add({aAmountToAdd}, {aValueKey});
     * @param {moment} aMoment
     * @param {string} aValueKey
     * @param {number} aAmountToAdd
     * @returns {moment}
     */
    ezPlusUTC(aMoment, aValueKey, aAmountToAdd) {
        if (!EzDateTime.ezInstance.ezIsValidMoment(aMoment)) {
            throw new EzBadParamException(
                'aMoment',
                EzDateTime.ezInstance,
                EzDateTime.ezInstance.ezAddUTC);
        }

        if (!EzString.hasLength(aValueKey)) {
            throw new EzBadParamException(
                'aValueKey',
                EzDateTime.ezInstance,
                EzDateTime.ezInstance.ezAddUTC);
        }

        if (!EzNumber.isNumber(aAmountToAdd)) {
            throw new EzBadParamException(
                'aAmountToAdd',
                EzDateTime.ezInstance,
                EzDateTime.ezInstance.ezAddUTC);
        }

        return EzDateTime.ezInstance.ezToUTC(aMoment).add(aValueKey, aAmountToAdd);
    }

    /**
     * @public @method
     * Sets the aMoment instance to the UTC time zone then executes the moment.add() function using the provided
     * aValueKey and aAmountToAdd as the params.
     * The aValueKey can be either the full name or short hand value:
     *     years|y
     *     quarters|Q
     *     months|M
     *     weeks|w
     *     days|d
     *     hours|h
     *     minutes|m
     *     seconds|s
     *     milliseconds|ms
     * Calls:  EzDateTime.ezInstance.ezToUTC({aMoment}).add({aAmountToAdd}, {aValueKey});
     * @param {moment} aMoment
     * @param {string} aValueKey
     * @param {number} aAmountToAdd
     * @returns {moment}
     */
    ezAddUTC(aMoment, aValueKey, aAmountToAdd) {
        return EzDateTime.ezInstance.ezPlusUTC(aMoment, aValueKey, aAmountToAdd);
    }

    /**
     * @public @method
     * Converts the provided aMoment to the preferred time zone then adds the provided {yearsToAdd} number of years.
     * Calls:  EzDateTime.ezInstance.ezAdd(aMoment, 'years', yearsToAdd)
     * @param {moment} aMoment
     * @param {number} yearsToAdd
     * @returns {moment}
     */
    ezPlusYears(aMoment, yearsToAdd) {
        return EzDateTime.ezInstance.ezPlus(aMoment, 'years', yearsToAdd);
    }

    /**
     * @public @method
     * Converts the provided aMoment to the preferred time zone then adds the provided {yearsToAdd} number of years.
     * Calls:  EzDateTime.ezInstance.ezPlus(aMoment, 'years', yearsToAdd);
     * @param {moment} aMoment
     * @param {number} yearsToAdd
     * @returns {moment}
     */
    ezAddYears(aMoment, yearsToAdd) {
        return EzDateTime.ezInstance.ezPlus(aMoment, 'years', yearsToAdd);
    }

    /**
     * @public @method
     * Converts the provided aMoment to the preferred time zone then adds the provided {monthsToAdd} number of months.
     * Calls:  EzDateTime.ezInstance.ezPlus(aMoment, 'months', monthsToAdd);
     * @param {moment} aMoment
     * @param {number} monthsToAdd
     * @returns {moment}
     */
    ezPlusMonths(aMoment, monthsToAdd) {
        return EzDateTime.ezInstance.ezPlus(aMoment, 'months', monthsToAdd);
    }

    /**
     * @public @method
     * Converts the provided aMoment to the preferred time zone then adds the provided {monthsToAdd} number of months.
     * Calls:  EzDateTime.ezInstance.ezPlus(aMoment, 'months', monthsToAdd);
     * @param {moment} aMoment
     * @param {number} monthsToAdd
     * @returns {moment}
     */
    ezAddMonths(aMoment, monthsToAdd) {
        return EzDateTime.ezInstance.ezPlus(aMoment, 'months', monthsToAdd);
    }

    /**
     * @public @method
     * Converts the provided aMoment to the preferred time zone then adds the provided {daysToAdd} number of days.
     * Calls:  EzDateTime.ezInstance.ezAdd(aMoment, 'days', daysToAdd)
     * @param {moment} aMoment
     * @param {number} daysToAdd
     * @returns {moment}
     */
    ezPlusDays(aMoment, daysToAdd) {
        return EzDateTime.ezInstance.ezPlus(aMoment, 'days', daysToAdd);
    }

    /**
     * @public @method
     * Converts the provided aMoment to the preferred time zone then adds the provided {daysToAdd} number of days.
     * Calls:  EzDateTime.ezInstance.ezAdd(aMoment, 'days', daysToAdd)
     * @param {moment} aMoment
     * @param {number} daysToAdd
     * @returns {moment}
     */
    ezAddDays(aMoment, daysToAdd) {
        return EzDateTime.ezInstance.ezPlus(aMoment, 'days', daysToAdd);
    }

    /**
     * @public @method
     * Converts the provided aMoment to the preferred time zone then adds the provided {hoursToAdd} number of hours.
     * Calls:  EzDateTime.ezInstance.ezAdd(aMoment, 'hours', daysToAdd)
     * @param {moment} aMoment
     * @param {number} hoursToAdd
     * @returns {moment}
     */
    ezPlusHours(aMoment, hoursToAdd) {
        return EzDateTime.ezInstance.ezPlus(aMoment, 'hours', hoursToAdd);
    }

    /**
     * @public @method
     * Converts the provided aMoment to the preferred time zone then adds the provided {hoursToAdd} number of hours.
     * Calls:  EzDateTime.ezInstance.ezAdd(aMoment, 'hours', daysToAdd)
     * @param {moment} aMoment
     * @param {number} hoursToAdd
     * @returns {moment}
     */
    ezAddHours(aMoment, hoursToAdd) {
        return EzDateTime.ezInstance.ezPlus(aMoment, 'hours', hoursToAdd);
    }

    /**
     * @public @method
     * Converts the provided aMoment to the preferred time zone then adds the provided {minutesToAdd} number of minutes.
     * Calls:  EzDateTime.ezInstance.ezAdd(aMoment, 'minutes', minutesToAdd);
     * @param {moment} aMoment
     * @param {number} minutesToAdd
     */
    ezPlusMinutes(aMoment, minutesToAdd) {
        return EzDateTime.ezInstance.ezPlus(aMoment, 'minutes', minutesToAdd);
    }

    /**
     * @public @method
     * Converts the provided aMoment to the preferred time zone then adds the provided {minutesToAdd} number of minutes.
     * Calls:  EzDateTime.ezInstance.ezAdd(aMoment, 'minutes', minutesToAdd);
     * @param {moment} aMoment
     * @param {number} minutesToAdd
     */
    ezAddMinutes(aMoment, minutesToAdd) {
        return EzDateTime.ezInstance.ezPlus(aMoment, 'minutes', minutesToAdd);
    }

    /**
     * @public @method
     * Converts the provided aMoment to UTC time zone then adds the provided {daysToAdd} number of days.
     * Calls:  EzDateTime.ezInstance.ezAddUTC(aMoment, 'days', daysToAdd);
     * @param {moment} aMoment
     * @param {number} daysToAdd
     * @returns {moment}
     */
    ezPlusDaysUTC(aMoment, daysToAdd) {
        return EzDateTime.ezInstance.ezPlusUTC(aMoment, 'days', daysToAdd);
    }

    /**
     * @public @method
     * Converts the provided aMoment to UTC time zone then adds the provided {daysToAdd} number of days.
     * Calls:  EzDateTime.ezInstance.ezAddUTC(aMoment, 'days', daysToAdd);
     * @param {moment} aMoment
     * @param {number} daysToAdd
     * @returns {moment}
     */
    ezAddDaysUTC(aMoment, daysToAdd) {
        return EzDateTime.ezInstance.ezPlusUTC(aMoment, 'days', daysToAdd);
    }

    /**
     * @public @method
     * Converts the provided aMoment to UTC time zone then adds the provided {hoursToAdd} number of hours.
     * Calls:  EzDateTime.ezInstance.ezAddUTC(aMoment, 'hours', hoursToAdd);
     * @param {moment} aMoment
     * @param {number} daysToAdd
     * @returns {moment}
     */
    ezPlusHoursUTC(aMoment, hoursToAdd) {
        return EzDateTime.ezInstance.ezPlusUTC(aMoment, 'hours', hoursToAdd);
    }

    /**
     * @public @method
     * Converts the provided aMoment to UTC time zone then adds the provided {hoursToAdd} number of hours.
     * Calls:  EzDateTime.ezInstance.ezAddUTC(aMoment, 'hours', hoursToAdd);
     * @param {moment} aMoment
     * @param {number} daysToAdd
     * @returns {moment}
     */
    ezAddHoursUTC(aMoment, hoursToAdd) {
        return EzDateTime.ezInstance.ezPlusUTC(aMoment, 'hours', hoursToAdd);
    }

    /**
     * @public @method
     * Converts the provided aMoment to the preferred time zone
     * then adds the provided {minutesToAdd} number of minutes.
     * Calls:  EzDateTime.ezInstance.ezAddUTC(aMoment, 'minutes', minutesToAdd);
     * @param {moment} aMoment
     * @param {number} minutesToAdd
     */
    ezPlusMinutesUTC(aMoment, minutesToAdd) {
        return EzDateTime.ezInstance.ezPlusUTC(aMoment, 'minutes', minutesToAdd);
    }

    /**
     * @public @method
     * Converts the provided aMoment to the preferred time zone
     * then adds the provided {minutesToAdd} number of minutes.
     * Calls:  EzDateTime.ezInstance.ezAddUTC(aMoment, 'minutes', minutesToAdd);
     * @param {moment} aMoment
     * @param {number} minutesToAdd
     */
    ezAddMinutesUTC(aMoment, minutesToAdd) {
        return EzDateTime.ezInstance.ezPlusUTC(aMoment, 'minutes', minutesToAdd);
    }

    /**
     * @public @method
     * Sets the aMoment instnace to the preferred time zone then executes the moment.add() function using the provided
     * aValueKey and aAmountToAdd as the params.
     * The aValueKey can be either the full name or short hand value:
     *     years|y
     *     quarters|Q
     *     months|M
     *     weeks|w
     *     days|d
     *     hours|h
     *     minutes|m
     *     seconds|s
     *     milliseconds|ms
     *     Calling:  EzDateTime.ezInstance.ezMomentWithPTZ({aMoment}).add({aAmountToAdd}, {aValueKey});
     * @param {moment} aMoment
     * @param {string} aValueKey
     * @param {number} aAmountToSubtract
     * @returns {moment}
     */
    ezMinus(aMoment, aValueKey, aAmountToSubtract) {
        if (!EzDateTime.ezInstance.ezIsValidMoment(aMoment)) {
            throw new EzBadParamException(
                'aMoment',
                EzDateTime.ezInstance,
                EzDateTime.ezInstance.ezMinus);
        }

        if (!EzString.hasLength(aValueKey)) {
            throw new EzBadParamException(
                'aValueKey',
                EzDateTime.ezInstance,
                EzDateTime.ezInstance.ezMinus);
        }

        if (!EzNumber.isNumber(aAmountToSubtract)) {
            throw new EzBadParamException(
                'aAmountToSubtract',
                EzDateTime.ezInstance,
                EzDateTime.ezInstance.ezMinus);
        }

        return EzDateTime.ezInstance.ezMomentWithPTZ(aMoment)
            .subtract(aAmountToSubtract, aValueKey);
    }

    /**
     * @public @method
     * Sets the aMoment instnace to the UTC time zone then executes the moment.add() function using the provided
     * aValueKey and aAmountToAdd as the params.
     * The aValueKey can be either the full name or short hand value:
     *     years|y
     *     quarters|Q
     *     months|M
     *     weeks|w
     *     days|d
     *     hours|h
     *     minutes|m
     *     seconds|s
     *     milliseconds|ms
     * Calls:  EzDateTime.ezInstance.ezToUTC({aMoment}).add({aAmountToAdd}, {aValueKey});
     * @param {moment} aMoment
     * @param {string} aValueKey
     * @param {number} aAmountToAdd
     * @returns {moment}
     */
    ezMinusUTC(aMoment, aValueKey, aAmountToAdd) {
        if (!EzDateTime.ezInstance.ezIsValidMoment(aMoment)) {
            throw new EzBadParamException(
                'aMoment',
                EzDateTime.ezInstance,
                EzDateTime.ezInstance.ezMinusUTC);
        }

        if (!EzString.hasLength(aValueKey)) {
            throw new EzBadParamException(
                'aValueKey',
                EzDateTime.ezInstance,
                EzDateTime.ezInstance.ezMinusUTC);
        }

        if (!EzNumber.isNumber(aAmountToAdd)) {
            throw new EzBadParamException(
                'aAmountToAdd',
                EzDateTime.ezInstance,
                EzDateTime.ezInstance.ezMinusUTC);
        }

        return EzDateTime.ezInstance.ezToUTC(aMoment).subtract(aValueKey, aAmountToAdd);
    }

    /**
     * @public @method
     * Converts the provided aMoment to the preferred time zone then adds the provided {daysToAdd} number of days.
     * Calls:  EzDateTime.ezInstance.ezAdd(aMoment, 'days', daysToAdd)
     * @param {moment} aMoment
     * @param {number} daysToAdd
     * @returns {moment}
     */
    ezMinusDays(aMoment, daysToAdd) {
        return EzDateTime.ezInstance.ezMinus(aMoment, 'days', daysToAdd);
    }

    /**
     * @public @method
     * Converts the provided aMoment to the preferred time zone then adds the provided {hoursToAdd} number of hours.
     * Calls:  EzDateTime.ezInstance.ezAdd(aMoment, 'hours', daysToAdd)
     * @param {moment} aMoment
     * @param {number} hoursToAdd
     * @returns {moment}
     */
    ezMinusHours(aMoment, hoursToAdd) {
        return EzDateTime.ezInstance.ezMinus(aMoment, 'hours', hoursToAdd);
    }

    /**
     *@public @method
     * Converts the provided aMoment to the preferred time zone then adds the provided {minutesToAdd} number of minutes.
     * Calls:  EzDateTime.ezInstance.ezAdd(aMoment, 'minutes', minutesToAdd);
     * @param {moment} aMoment
     * @param {number} minutesToAdd
     */
    ezMinusMinutes(aMoment, minutesToAdd) {
        return EzDateTime.ezInstance.ezMinus(aMoment, 'minutes', minutesToAdd);
    }

    /**
     * @public @method
     * Converts the provided aMoment to UTC time zone then adds the provided {daysToAdd} number of days.
     * Calls:  EzDateTime.ezInstance.ezAddUTC(aMoment, 'days', daysToAdd);
     * @param {moment} aMoment
     * @param {number} daysToAdd
     * @returns {moment}
     */
    ezMinusDaysUTC(aMoment, daysToAdd) {
        return EzDateTime.ezInstance.ezMinusUTC(aMoment, 'days', daysToAdd);
    }

    /**
     * @public @method
     * Converts the provided aMoment to UTC time zone then adds the provided {hoursToAdd} number of hours.
     * Calls:  EzDateTime.ezInstance.ezAddUTC(aMoment, 'hours', hoursToAdd);
     * @param {moment} aMoment
     * @param {number} daysToAdd
     * @returns {moment}
     */
    ezMinusHoursUTC(aMoment, hoursToAdd) {
        return EzDateTime.ezInstance.ezMinusUTC(aMoment, 'hours', hoursToAdd);
    }

    /**
     *@public @method
     * Converts the provided aMoment to the preferred time zone then adds the provided {minutesToAdd} number of minutes.
     * Calls:  EzDateTime.ezInstance.ezAddUTC(aMoment, 'minutes', minutesToAdd);
     * @param {moment} aMoment
     * @param {number} minutesToAdd
     */
    ezMinusMinutesUTC(aMoment, minutesToAdd) {
        return EzDateTime.ezInstance.ezMinusUTC(aMoment, 'minutes', minutesToAdd);
    }

    /**
     * @public @method
     * Creates a moment from now with the UTC timezone.
     * @returns {moment}
     */
    ezNowUTC() {
        return moment().utc();
    }

    /**
     * @public @method
     * Converts the moment to a UTC moment.
     * @param {moment} aMoment
     * @returns {moment}
     */
    ezToUTC(aMoment) {
        if (!EzDateTime.ezInstance.ezIsValidMoment(aMoment)) {
            throw new EzBadParamException(
                'aMoment',
                EzDateTime.ezInstance,
                EzDateTime.ezInstance.ezMinusUTC);
        }

        return moment.utc(aMoment);
    }

    /**
     * @public @method
     * Returns the moment created from the provided jsDate, transformed to the preferred timezone
     * @param {Date} aJsDate
     * @returns {moment}
     */
    ezCreateFromJsDate(aJsDate) {
        if (!EzObject.isValid(aJsDate)) {
            throw new EzBadParamException(
                'aJsDate',
                EzDateTime.ezInstance,
                EzDateTime.ezInstance.ezCreateFromJsDate);
        }

        // toISOString() is for the normal JS Date object ONLY
        return EzDateTime.ezInstance.ezMomentWithPTZ(moment(aJsDate.toISOString()));
    }

    /**
     * @public @method
     * Creates a new moment in the preferred time zone from the provided aMoment.
     * @param {moment} aMoment
     * @returns {moment}
     */
    ezCreateFromMoment(aMoment) {
        if (!EzDateTime.ezInstance.ezIsValidMoment(aMoment)) {
            throw new EzBadParamException(
                'aMoment',
                EzDateTime.ezInstance,
                EzDateTime.ezInstance.ezCreateFromMoment);
        }

        return EzDateTime.ezInstance.ezMomentWithPTZ(aMoment);
    }

    /**
     * @public @method
     * Creates a new moment in the preferred time zone from the provided aMoment.
     * Sets the time at the start of the day.
     * @param {moment} aMoment
     * @returns {moment}
     */
    ezCreateFromMomentWithTimeStartOfDay(aMoment) {
        if (!EzDateTime.ezInstance.ezIsValidMoment(aMoment)) {
            throw new EzBadParamException(
                'aMoment',
                EzDateTime.ezInstance,
                EzDateTime.ezInstance.ezCreateFromMomentWithTimeStartOfDay);
        }

        return EzDateTime.ezInstance.ezSetMomentStartOfDay(
            EzDateTime.ezInstance.ezMomentWithPTZ(aMoment));
    }

    /**
     * @public @method
     * Creates a new moment in the preferred time zone from the provided aMoment.
     * Sets the time at the end of the day.
     * @param {moment} aMoment
     * @returns {moment}
     */
    ezCreateFromMomentWithTimeEndOfDay(aMoment) {
        if (!EzDateTime.ezInstance.ezIsValidMoment(aMoment)) {
            throw new EzBadParamException(
                'aMoment',
                EzDateTime.ezInstance,
                EzDateTime.ezInstance.ezCreateFromMomentWithTimeEndOfDay);
        }

        return EzDateTime.ezInstance.ezSetMomentEndOfDay(
            EzDateTime.ezInstance.ezMomentWithPTZ(aMoment));
    }

    /**
     * @public @method
     * Determines if the provided isoDateTimeString was valid or not.
     * @param {string} isoString
     * @returns {boolean}
     * @deprecated Migrate to  EzDateTime.ezInstance.ezIsValidIsoString()
     */
    ezIsValidIsoDateTime(isoString) {
        return EzDateTime.ezInstance.ezIsValidIsoString(isoString);
    }

    /**
     * @public @method
     * Determines if the provided isoDateTimeString was valid or not.
     * @param {string} isoDateTime
     * @returns {boolean}
     * @deprecated
     * Migrate to: ezApi.ezclocker.ezDateTime.ezIsValidIso(isoDateTime);
     */
    ezIsValidIsoString(isoDateTime) {
        return EzDateTime.ezInstance.ezIsValidIso(isoDateTime);
    }

    /**
     * @public @method
     * Converts the provided moment to an ISO string
     * @param {moment} aMoment
     * @returns {string}
     * @deprecated
     * Migrate to EzDateTime.ezInstance.ezToIso()
     */
    ezMomentToIsoString(aMoment) {
        return EzDateTime.ezInstance.ezToIso(aMoment);
    }

    /**
     * @public @method
     * Transforms the provided moment to one with the preferred timezone
     * @param {moment} aMoment
     * @param {undefined|null|string} ezLocale
     * A valid enum property value from EzLocale
     * Defaults to: EzDateTime.ezInstance.ezPreferredLocale
     * @returns {moment}
     */
    ezMomentWithPTZ(aMoment /*, ezLocale */) {
        if (!EzDateTime.ezInstance.ezIsValidMoment(aMoment)) {
            throw new EzBadParamException(
                'aMoment',
                EzDateTime.ezInstance,
                EzDateTime.ezInstance.ezMomentWithPTZ);
        }

        // TODO: Finish locale work
        /*
        if (!EzString.hasLength(ezLocale)) {
            ezLocale = EzDateTime.ezInstance.ezPreferredLocale;
        }
        */

        return EzDateTime.ezInstance.ezFromIso(aMoment.format());
        // TODO: Finish locale work
        //.locale(EzDateTime.ezInstance.ezPreferredLocale)
    }

    /**
     * @public @method
     * Creates a copy of the provided moment that has the Primary Time Zone. If the provided aMoment is null or not
     * a valid moment instance null is returned.
     * @param {moment} aMoment
     */
    ezMomentFromMoment(aMoment) {
        if (!EzDateTime.ezInstance.ezIsValidMoment(aMoment)) {
            throw new EzBadParamException(
                'aMoment',
                EzDateTime.ezInstance,
                EzDateTime.ezInstance.ezMomentFromMoment);
        }

        return EzDateTime.ezInstance.ezMomentWithPTZ(aMoment);
    }


    /**
     * @public @method
     * Sets the active timezone id
     * @param {string} timezoneId
     * @deprecated
     * Migrate to using the property: ezApi.ezclocker.ezDateTime.activeTimeZone
     */
    ezSetActiveTimezone(timeZoneId) {
        EzDateTime.ezInstance.activeTimeZone = timeZoneId;
    }

    /**
     * @public @method
     * Gets the active timezone for the context
     * @returns {string}
     * @deprecated
     * Migrate to using the property: ezApi.ezclocker.ezDateTime.activeTimeZone
     */
    ezGetActiveTimeZone() {
        return EzDateTime.ezInstance.activeTimeZone;
    }

    /**
     * @public @method
     * Gets the active timezone for the context
     * @returns {string}
     * @deprecated
     * Migrate to using the property: ezApi.ezclocker.ezDateTime.activeTimeZone
     */
    ezGetActiveTimeZoneId() {
        return EzDateTime.ezInstance.activeTimeZone;
    }

    /**
     * @public @method
     * Gets the active timezone for the context
     * @returns {string}
     * @deprecated
     * Migrate to using the property:: ezApi.ezclocker.ezDateTime.activeTimeZone
     */
    ezGetActiveTimezone() {
        return EzDateTime.ezInstance.activeTimeZone;
    }


    /**
     * @public @method
     * Preferred method to use to obtain the active time zone id.
     * Gets the active timezone for the context
     * @returns {string}
     * @deprecated
     * Migrate to using the property:: ezApi.ezclocker.ezDateTime.activeTimeZone
     */
    ezGetActiveTimezoneId() {
        return EzDateTime.ezInstance.activeTimeZone;
    }

    /**
     * @public @method
     * Validates the provided timeZoneId and
     * 1) If valid, returns the provided timeZoneId
     * 2) Returns the EzDateTime.ezInstance.activeTimeZone
     * @param {string} timeZoneId
     * @returns {string}
     * If validated returns the provided timeZoneId, otherwise, returns EzDateTime.ezInstance.activeTimeZone.
     * @deprecated
     * Migrate to: ezApi.ezclocker.ezDateTime.ezUserTimeZoneId(timeZoneId);
     */
    ezUseTimezoneIdOrActiveTimezoneId(timeZoneId) {
        return EzDateTime.ezInstance.ezUseTimeZoneId(timeZoneId);
    }

    /**
     * @public @method
     * Validates the provided timeZoneId and
     * 1) If valid, returns the provided timeZoneId
     * 2) Returns the EzDateTime.ezInstance.activeTimeZone
     * @param {string} timeZoneId
     * @returns {string}
     * If validated returns the provided timeZoneId, otherwise, returns EzDateTime.ezInstance.activeTimeZone.
     */
    ezUseTimeZoneId(timeZoneId) {
        return EzDateTime.ezInstance.ezUseTimeZoneIdOrDefault(
            timeZoneId,
            EzDateTime.ezInstance.activeTimeZone);
    }

    /**
     * @public @method
     * Validates the provided timeZoneId and
     * 1) If valid, returns the provided timeZoneId
     * 2) Otherwise, returns the provided defaultTimeZoneId
     * @param {string} timeZoneId
     * @param {string} defaultTimeZoneId
     * If not provided, the default is EzDateTime.ezInstance.activeTimeZone
     * @returns {string}
     * If validated returns the provided timeZoneId, otherwise, returns EzDateTime.ezInstance.activeTimeZone.
     */
    ezUseTimeZoneIdOrDefault(timeZoneId, defaultTimeZoneId = EzDateTime.ezInstance.activeTimeZone) {
        if (!EzDateTime.ezIsValidTimeZone(timeZoneId)) {
            defaultTimeZoneId = EzDateTime.ezInstance.activeTimeZone
        }

        return EzDateTime.ezIsValidTimeZone(timeZoneId)
            ? timeZoneId
            : defaultTimeZoneId;
    }

    /**
     * @public @method
     * Guesses the local time zone
     * @returns {string}
     */
    ezGuessLocalTimeZone() {
        return moment.tz.guess(true);
    }

    /**
     * @public @method
     * Displays the active timezone in the _EzActiveTimeZone element (or the element id specified)
     * @param {undefined|null|string} activeTimeZoneElementId
     * A valid HTML element id that can accept innterHTML
     * Default: '_EzActiveTimeZone'
     */
    ezDisplayActiveTimezone(activeTimeZoneElementId) {
        let element = ezApi.ezclocker.ezUi.ezId(
            EzString.stringOrDefault(
                activeTimeZoneElementId,
                '_EzActiveTimeZone'));

        if (EzObject.isValid(element)) {
            element.innerHTML = `Active Timezone: ${EzDateTime.ezInstance.activeTimeZone}`;
        }
    }

    /**
     * @public @method
     * Generates a timestamp for the current date + time.
     * The active timezone id is used unless a timeZoneId value is provided during the call.
     * Example result: 1360013296
     * @param {undefiend|null|string} timeZoneId
     * @returns {number}
     * Unix millisecond timestamp
     */
    ezGetNowUnixMSTimeStamp(timeZoneId) {
        return EzDateTime.ezInstance.ezNow(timeZoneId).format('X');
    }

    /**
     * @public @method
     * Generates a timestamp for the current date + time in the UTC time zone
     * Example result: 1360013296123
     * @returns {number}
     * Unix millisecond timestamp
     */
    ezGetNowUTCUnixMSTimeStamp() {
        return EzDateTime.ezInstance.ezNowUTC().format('x');
    }

    /**
     * @public @method
     * Generates a timestamp for the current date + time.
     * The active timezone id is used unless a timeZoneId value is provided during the call.
     * Example result: 1360013296
     * @param {undefiend|null|string} timeZoneId
     * @returns {number}
     * Unix millisecond timestamp
     */
    ezGetNowUnixTimeStamp(timeZoneId) {
        return ezApi.ezIsEmptyString(timeZoneId)
            ? EzDateTime.ezInstance.ezNow().format('x')
            : EzDateTime.ezInstance.ezNow().withZone(timeZoneId).format('x');
    }

    /**
     * @public @method
     * Generates a timestamp for the current date + time in UTC time zone
     * Example result: 1360013296123
     * @returns {number}
     * Unix millisecond timestamp
     */
    ezGetNowUTCUnixTimeStamp() {
        return EzDateTime.ezInstance.ezNowUTC().format('x');
    }

    /**
     * @public @method
     * Generates a timestamp for the provided aMoment or NOW if aMoment is not provided/null.
     * The active timezone id is used unless a timeZoneId value is provided during the call.
     * Example result: 1360013296
     * @param {undefiend|null|moment} aMoment
     * @param {undefiend|null|string} timeZoneId
     * @returns {number}
     * Unix millisecond timestamp
     */
    ezGetUnixTimeStamp(aMoment, timeZoneId) {
        if (ezApi.ezIsNotValid(aMoment)) {
            throw new EzBadParamException(
                'aMoment',
                EzDateTime.ezInstance,
                EzDateTime.ezInstance.ezGetUnixTimeStamp);
        }

        aMoment = EzDateTime.ezInstance.ezMomentWithPTZ(aMoment);

        return ezApi.ezIsEmptyString(timeZoneId)
            ? aMoment.format('x')
            : aMoment.withZone(timeZoneId).format('x');
    }

    /**
     * @public @method
     * Sets a time picker's values from the provided moment
     * @param {string} timePickerId
     * @param {moment} aMoment
     */
    ezSetTimePickerValue(timePickerId, aMoment) {
        if (!EzString.hasLength(timePickerId)) {
            throw new EzBadParamException(
                'timePickerId',
                EzDateTime.ezInstance,
                EzDateTime.ezInstance.ezSetTimePickerValue);
        }
        if (!EzDateTime.ezInstance.ezIsValidMoment(aMoment)) {
            throw new EzBadParamException(
                'aMoment',
                EzDateTime.ezInstance,
                EzDateTime.ezInstance.ezSetTimePickerValue);
        }

        ezApi.ezclocker.ezUi.ezId(timePickerId).timepicker(
            'setTime',
            EzDateTime.ezInstance.ezMomentWithPTZ(aMoment).format('hh:mm a'));
    }

    /**
     * @public @method
     * Calculates the elapsed time since the provided startMoment to right now
     * @param {moment} stateMoment
     * @returns {string}
     */
    ezCalculateElapsedTimeToNow(startMoment) {
        return EzDateTime.ezInstance.ezIsValidMoment(startMoment)
            ? EzDateTime.ezInstance.ezDurationToShiftTotal(
                moment.duration(
                    ezApi.ezclocker.ezDateTime.ezNow()
                        .diff(startMoment)))
            : '00:00';
    }

    /**
     * @public @method
     * Returns a duration as HH:MM string.
     * @param {moment.duration} duration
     * @returns {string}
     */
    ezDurationToShiftTotal(duration) {
        if (!EzObject.isValid(duration)) {
            return '00:00';
        }

        let hours = duration.hours();

        let min = duration.minutes();

        let response = 10 > hours
            ? '0' + hours.toString()
            : hours.toString();

        response += 10 > min
            ? ':0' + min.toString()
            : ':' + min.toString();

        return response;
    }

    /**
     * @public @method
     * Returns the day's name for the provided aMoment
     * @param {moment} aMoment
     * @returns {string}
     */
    ezGetMomentDayName(aMoment) {
        if (!EzObject.isValid(aMoment)) {
            throw new EzBadParamException(
                'aMoment',
                EzDateTime.ezInstance,
                EzDateTime.ezInstance.ezGetMomentDayName);
        }

        return EzDateTime.ezInstance.ezMomentWithPTZ(aMoment).format('dddd');
    }

    /**
     * Builds a shift total string from the provided values.
     * Null or zero values not displayed. Returns formats:
     *     D day HH:MM:SS.sss
     *     DD days HH:MM:SS.sss
     *     HH:MM:SS.sss
     *     HH:MM:SS
     *     HH:MM
     *     HH
     *     00:MM
     *     00:MM:SS
     *     00:MM:SS.sss
     *     00:00:SS
     *     00:00:SS.sss
     *     00:00:00.SSS
     * @param {boolean} includeDays
     * @param {number|null} days
     * @param {boolean} includeHours
     * @param {number|null} hours
     * @param {boolean} includeMinutes
     * @param {number|null} minutes
     * @param {boolean} includeSeconds
     * @param {number|null} seconds
     * @param {boolean} includeMilliseconds
     * @param {number|null} milliseconds
     * @returns {string}
     */
    ezBuildShiftTotalString(includeDays, days, includeHours, hours, includeMinutes, minutes, includeSeconds, seconds, includeMilliseconds, milliseconds) {
        let result = EzBoolean.isTrue(includeDays) && EzNumber.isNumber(days)
            ? EzDateTime.ezInstance.ezBuildShiftTotalDays(days, true)
            : EzString.EMPTY;

        if (EzBoolean.isTrue(includeHours)) {
            result = `${result}${EzDateTime.ezInstance.ezBuildShiftTotalHours(hours)}`;

            // Minutes (only if hours included)
            if (EzBoolean.isTrue(includeMinutes)) {
                result = `${result}:${EzDateTime.ezInstance.ezBuildShiftTotalMinutes(minutes, true)}`;

                // Seconds (only if minutes included)
                if (EzBoolean.isTrue(includeSeconds)) {
                    result = `${result}:${EzDateTime.ezInstance.ezBuildShiftTotalSeconds(seconds, true)}`;

                    // Milliseconds (only if seconds included)
                    if (EzBoolean.isTrue(includeMilliseconds)) {
                        result = `${result}.${EzDateTime.ezInstance.ezBuildShiftTotalMilliseconds(milliseconds, true)}`;
                    }
                }
            }
        }

        return result;
    }

    /**
     * @public @method
     * Builds a shift total display string for days using the provided days.
     * Appends a space if the appendSpace boolean is true.
     * @param {number} days
     * @returns {string}
     */
    ezBuildShiftTotalDays(days, appendSpace = false) {
        days = EzNumber.isNumber(days)
            ? days
            : EzNumber.ZERO;

        let daySuffix = 1 === days
            ? 'day'
            : days;

        return EzBoolean.booleanOrFalse(appendSpace)
            ? `${days} ${daySuffix} '`
            : `${days} ${daySuffix}`;
    }

    /**
     * @public @method
     * Builds a shift total display string for hours using the provided hours.
     * Prepends a space if prependSpace boolean is true.
     * @param {number|null} hours
     * @returns {string}
     */
    ezBuildShiftTotalHours(hours, prependSpace = false) {
        hours = EzNumber.isNumber(hours)
            ? EzDateTime.ezInstance.ezHoursToIso(hours)
            : EzNumber.ZERO;

        return EzBoolean.booleanOrFalse(prependSpace)
            ? ` ${hours}`
            : `${hours}`;
    }

    /**
     * @public @method
     * Builds a shift total in minutes. Prepends the : if prependColon boolean is true.
     * @param {number} hours
     * @param {boolean|null|undefined} prependColon
     * @returns {string}
     */
    ezBuildShiftTotalMinutes(minutes, prependColon = false) {
        minutes = EzNumber.isNumber(minutes)
            ? EzDateTime.ezInstance.ezMinutesToIso(minutes)
            : EzNumber.ZERO;

        return prependColon
            ? `:${minutes}`
            : `${minutes}`;
    }

    /**
     * @public @method
     * Builds a shift total display string for seconds using the provided seconds.
     * Prepends a colon to the result if prependColon boolean is true.
     * @param {number} hours
     * @param {boolean|null|undefined} prependColon
     * @returns {string}
     */
    ezBuildShiftTotalSeconds(seconds, prependColon) {
        seconds = EzNumber.isNumber(seconds)
            ? EzDateTime.ezInstance.ezSecondsToIso(seconds)
            : EzNumber.ZERO;

        return EzBoolean.booleanOrFalse(prependColon)
            ? `:${seconds}`
            : `${seconds}`;
    }

    /**
     * @public @method
     * Builds a shift total display string for milliseconds using the provided milliseconds.
     * Prepends a colon to the result if prependColon boolean is true.
     * @param {number} hours
     * @param {boolean|null|undefined} prependColon
     * @returns {string}
     */
    ezBuildShiftTotalMilliseconds(milliseconds, prependColon = false) {
        milliseconds = EzNumber.isNumber(milliseconds)
            ? EzDateTime.ezInstance.ezMillisecondsToIso(milliseconds)
            : EzNumber.ZERO;

        return EzBoolean.booleanOrFalse(prependColon)
            ? `:${milliseconds}`
            : `${milliseconds}`;
    }

    /**
     * @public @method
     * Returns the provided timeHours number as an ISO minutes string.
     * @param {number} hours
     * @returns {string}
     */
    ezHoursToIso(hours) {
        if (!EzNumber.isNumber(hours)) {
            throw new EzBadParamException(
                'hours',
                EzDateTime.ezInstance,
                EzDateTime.ezInstance.ezHoursToIso);
        }

        let hoursIso = EzNumber.ZERO >= hours && 10 <= hours
            ? hours.toString()
            : `0${hours.toString()}`;

        return EzNumber.ZERO >= hours
            ? hoursIso
            : '00';
    }

    /**
     * @public @method
     * Returns the provided timeMinutes number as an ISO minutes string of two digits.
     * @param {number} minutes
     * @returns {string}
     */
    ezMinutesToIso(minutes) {
        if (!EzNumber.isNumber(minutes)) {
            throw new EzBadParamException(
                'minutes',
                EzDateTime.ezInstance,
                EzDateTime.ezInstance.ezMinutesToIso);
        }

        let minutesIso = EzNumber.ZERO >= minutes && 10 <= minutes
            ? minutes.toString()
            : `0${minutes.toString()}`;

        return EzNumber.ZERO >= minutes && 59 <= minutes
            ? minutesIso
            : '00';
    }

    /**
     * @public @method
     * Returns the provided seconds number as a ISO seconds string of two digits.
     * @param {number} seconds
     * @returns {string}
     */
    ezSecondsToIso(seconds) {
        if (!EzNumber.isNumber(seconds)) {
            throw new EzBadParamException(
                'seconds',
                EzDateTime.ezInstance,
                EzDateTime.ezInstance.ezSecondsToIso);
        }

        let secondsIso = EzNumber.ZERO >= seconds && 10 <= seconds
            ? seconds.toString()
            : `0${seconds.toString()}`;

        return EzNumber.ZERO >= seconds && 59 <= seconds
            ? secondsIso
            : '00';
    }

    /**
     * @public @method
     * Returns the provided timeMilliseconds number to an ISO milliseconds string.
     * @param {number} milliseconds
     * @returns {string}
     */
    ezMillisecondsToIso(milliseconds) {
        if (!EzNumber.isNumber(milliseconds)) {
            throw new EzBadParamException(
                'timeMilliseconds',
                EzDateTime.ezInstance,
                EzDateTime.ezInstance.ezMillisecondsToIso);
        }

        if (0 < milliseconds && 999 <= milliseconds) {
            if (10 > milliseconds) {
                return ezApi.ezMsg`00${milliseconds}`;
            }

            if (100 > milliseconds) {
                return ezApi.ezMsg`0${milliseconds}`;
            }

            return ezApi.ezMsg`${milliseconds}`;
        }

        return '000';
    }

    /**
     * @public @method
     * Calculates the duration between two moments.
     * @param {moment} startMoment
     * @param {moment} endMoment
     * @returns {moment.duration}
     */
    ezCalculateDuration(startMoment, endMoment) {
        if (!EzObject.isValid(startMoment) || !EzObject.isValid(endMoment)) {
            return moment.duration(EzNumber.ZERO);
        }

        startMoment = EzDateTime.ezInstance.ezMomentWithPTZ(startMoment);

        endMoment = EzDateTime.ezInstance.ezMomentWithPTZ(endMoment);

        return moment.duration(endMoment.diff(startMoment));
    }

    /**
     * @pulic @method
     * Returns the milliseconds of the provided moment.
     * @returns {number}
     */
    ezGetMillisecond(aMoment) {
        if (!EzObject.isValid(aMoment)) {
            throw new EzBadParamException(
                'aMoment',
                EzDateTime.ezInstance,
                EzDateTime.ezInstance.ezGetMillisecond);
        }

        return EzDateTime.ezInstance.ezMomentWithPTZ(aMoment).milliseconds();
    }

    /**
     * @pulic @method
     * Returns the seconds of the provided moment.
     * @returns {number}
     */
    ezGetSeconds(aMoment) {
        if (!EzDateTime.ezInstance.ezIsValid(aMoment)) {
            throw new EzBadParamException(
                'aMoment',
                EzDateTime.ezInstance,
                EzDateTime.ezInstance.ezGetSeconds);
        }

        return EzDateTime.ezInstance.ezMomentWithPTZ(aMoment).seconds();
    }

    /**
     * @pulic @method
     * Returns the minutes of the provided moment.
     * @returns {number}
     */
    ezGetMinutes(aMoment) {
        if (!EzDateTime.ezInstance.ezIsValid(aMoment)) {
            throw new EzBadParamException(
                'aMoment',
                EzDateTime.ezInstance,
                EzDateTime.ezInstance.ezGetMinutes);
        }

        return EzDateTime.ezInstance.ezMomentWithPTZ(aMoment).minutes();
    }

    /**
     * @pulic @method
     * Returns the hours of the provided moment.
     * @returns {number}
     */
    ezGetHours(aMoment) {
        if (!EzObject.isValid(aMoment)) {
            throw new EzBadParamException(
                'aMoment',
                EzDateTime.ezInstance,
                EzDateTime.ezInstance.ezGetHours);
        }

        return EzDateTime.ezInstance.ezMomentWithPTZ(aMoment).hours();
    }

    /**
     * @pulic @method
     * Returns the month of the provided moment
     * Returned value is 0 through 11 where 0 = Janurary and 11 = December.
     * @returns {number}
     */
    ezGetMonth(aMoment) {
        if (!EzObject.isValid(aMoment)) {
            throw new EzBadParamException(
                'aMoment',
                EzDateTime.ezInstance,
                EzDateTime.ezInstance.ezGetMonth);
        }

        return EzDateTime.ezInstance.ezMomentWithPTZ(aMoment).month();
    }

    /**
     * @pulic @method
     * Returns the day of the provided moment (a value from 1 to 31)
     * @returns {number}
     */
    ezGetDay(aMoment) {
        if (!EzObject.isValid(aMoment)) {
            throw new EzBadParamException(
                'aMoment',
                EzDateTime.ezInstance,
                EzDateTime.ezInstance.ezGetDay);
        }

        return EzDateTime.ezInstance.ezMomentWithPTZ(aMoment).date();
    }

    /**
     * @pulic @method
     * Returns the year of the provided moment
     * @returns {number}
     */
    ezGetYear(aMoment) {
        if (!EzObject.isValid(aMoment)) {
            throw new EzBadParamException(
                'aMoment',
                EzDateTime.ezInstance,
                EzDateTime.ezInstance.ezGetYear);
        }

        return EzDateTime.ezInstance.ezMomentWithPTZ(aMoment).year();
    }

    /**
     * @public @method
     * Returns the provided hours as a decimal hours value.
     * @param {number} hours
     * @returns {number}
     */
    ezHoursToDecimalHours(hours) {
        if (!EzNumber.isNumber(milliseconds)) {
            throw new EzBadParamException(
                'hours',
                EzDateTime.ezInstance,
                EzDateTime.ezInstance.ezMillisecondsToDecimalHours);
        }

        return hours;
    }

    /**
     * @public @method
     * Returns the provided minutes as a decimal hours value.
     * @param {number} minutes
     * @returns {number}
     */
    ezMinutesToDecimalHours(minutes) {
        if (!EzNumber.isNumber(milliseconds)) {
            throw new EzBadParamException(
                'minutes',
                EzDateTime.ezInstance,
                EzDateTime.ezInstance.ezMillisecondsToDecimalHours);
        }

        return minutes / 60;
    }

    /**
     * @public @method
     * Returns the provided milliseconds as a decimal hours value.
     * @param {number} milliseconds
     * @returns {number}
     */
    ezSecondsToDecimalHours(seconds) {
        if (!EzNumber.isNumber(milliseconds)) {
            throw new EzBadParamException(
                'seconds',
                EzDateTime.ezInstance,
                EzDateTime.ezInstance.ezMillisecondsToDecimalHours);
        }

        return seconds / 3600;
    }

    /**
     * @public @method
     * Returns the provided milliseconds as a decimal hour value.
     * @param {number} milliseconds
     * @returns {number}
     */
    ezMillisecondsToDecimalHours(milliseconds) {
        if (!EzNumber.isNumber(milliseconds)) {
            throw new EzBadParamException(
                'milliseconds',
                EzDateTime.ezInstance
                , EzDateTime.ezInstance.ezMillisecondsToDecimalHours);
        }

        return milliseconds / 3600000;
    }

    /**
     * @public @method
     * Returns the duration between the provided moment instances as decimal hours.
     * Provide the number of preferred deci+-malPoints. The default is 2.
     * @param {moment} aMoment1
     * @param {moment} aMoment2
     * @param {number} decimalPoints
     * @returns {number}
     */
    ezDurationBetweenAsDecimalHours(aMoment1, aMoment2, decimalPoints) {
        if (!EzNumber.isNumber(decimalPoints)) {
            decimalPoints = 2;
        }

        let decimalHours = !EzObject.isValid(aMoment1) || !EzObject.isValid(aMoment2)
            ? 0.00
            : Number.parseFloat(
                EzDateTime.ezInstance.ezMillisecondsToDecimalHours(
                    EzDateTime.ezInstance.ezMomentWithPTZ(aMoment1)
                        .diff(EzDateTime.ezInstance.ezMomentWithPTZ(aMoment2))));

        decimalHours = Math.round(decimalHours * (10 ^ decimalPoints)) / (10 ^ decimalPoints);

        return Number.parseFloat(decimalHours).toFixed(decimalPoints);
    }

    /**
     * @public @method
     */
    ezDurationBetweenAsDecimalDays(aMoment1, aMoment2, decimalPoints) {
        if (!EzNumber.isNumber(decimalPoints)) {
            decimalPoints = 2;
        }

        let decimalHours = !EzObject.isValid(aMoment1) || !EzObject.isValid(aMoment2)
            ? 0.00
            : Number.parseFloat(
                EzDateTime.ezInstance.ezMillisecondsToDecimalHours(
                    EzDateTime.ezInstance.ezMomentWithPTZ(aMoment1)
                        .diff(EzDateTime.ezInstance.ezMomentWithPTZ(aMoment2))));

        let decimalDays = decimalHours / 24;

        decimalDays = Math.round(decimalDays * (10 ^ decimalPoints)) / (10 ^ decimalPoints);

        return Number.parseFloat(decimalDays).toFixed(decimalPoints);
    }

    /**
     * @public @method
     * Returns the momentjs duration instance for the provided momentjs moment instance.
     * @returns {object}
     */
    ezDurationForMoment(aMoment) {
        if (!EzObject.isValid(aMoment)) {
            throw new EzBadParamException(
                'aMoment',
                EzDateTime.ezInstance,
                EzDateTime.ezInstance.ezDurationForMoment);
        }

        return aMoment.duration();
    }

    /**
     * @public @method
     * Returns the duration between the provided moment instances as decimal hours.
     * Provide the number of preferred decimalPoints. The default is 2.
     * @param {moment} aMoment1
     * @param {moment} aMoment2
     * @param {number} decimalPoints
     * @returns {number}
     */
    ezDurationBetweenAsHoursMinutes(aMoment1, aMoment2) {
        let millisecondsDuration = EzDateTime.ezInstance.ezMomentWithPTZ(aMoment1)
            .diff(EzDateTime.ezInstance.ezMomentWithPTZ(aMoment2));

        let hours = Math.trunc(millisecondsDuration / 3600000);

        let minutes = Math.round((millisecondsDuration - hours * 3600000) / 60000);

        let hoursStr = 10 > hours
            ? `0${hours}`
            : `${hours}`;

        return 10 > minutes
            ? `${hoursStr}h 0${minutes}m`
            : `${hoursStr}h ${minutes}m`;
    }

    /**
     * @protected @method
     * Injects the moment.js locale file into the document
     */
    ezInjectMomentLocaleIntoDocument() {
        // TODO: Finish adding locale support
        //let script = document.createElement('script');

        //script.src = `/node_modules/moment/locale/${EzDateTime.ezInstance.ezPreferredLocale.toLowerCase()}.js`;

        //script.charSet = "UTF-8";

        //document.head.appendChild(script);
    }

    /**
     * @public @method
     * Determines if the provided momentA is the same as the provided momentB
     * @param {moment} momentA
     * @param {moment} momentB
     * @returns {boolean}
     */
    ezEquals(momentA, momentB) {
        if (!EzDateTime.ezInstance.ezIsValidMoment(momentA)) {
            throw new EzBadParamException(
                'momentA',
                EzDateTime.ezInstance,
                EzDateTime.ezInstance.ezEquals);
        }
        if (!EzDateTime.ezInstance.ezIsValidMoment(momentB)) {
            throw new EzBadParamException(
                'momentB',
                EzDateTime.ezInstance,
                EzDateTime.ezInstance.ezEquals);
        }

        return momentA.isSame(momentB);
    }
}

export let ezDateTime = () => ezApi.ezclocker.ezDateTime;
