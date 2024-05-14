import {
    EzBadParamException
} from '/ezlibrary/exceptions/EzExceptions.js';

import {
    EzObject,
    //EzBoolean,
    //EzNumber,
    // EzFloat,
    EzString,
    //EzArray,
    // EzUrl,
    // EzHtml,
    // EzFunction,
    // EzJson,
    // EzConsole,
    // EzAsync,
    //EzPromise,
    // EzUTF8CharHelper
} from '/ezlibrary/helpers/EzHelpers.js';

import {
    EzLocale
} from '/ezlibrary/enums/EzEnumerations.js';


export class EzDateTime {
    /**
     * @static
     * @public @static @readonly @property
     * Returns the REGEX value for validation ISO dates.
     * @returns {regex}
     */
    static get ISO_VALIDATION_REGEX() {
        return /^([\+-]?\d{4}(?!\d{2}\b))((-?)((0[1-9]|1[0-2])(\3([12]\d|0[1-9]|3[01]))?|W([0-4]\d|5[0-2])(-?[1-7])?|(00[1-9]|0[1-9]\d|[12]\d{2}|3([0-5]\d|6[1-6])))([T\s]((([01]\d|2[0-3])((:?)[0-5]\d)?|24\:?00)([\.,]\d+(?!:))?)?(\17[0-5]\d([\.,]\d+)?)?([zZ]|([\+-])([01]\d|2[0-3]):?([0-5]\d)?)?)?)?$/;
    }

    /**
     * @static
     * @private @field
     * Stores the current active time zone id
     * @returns {string}
     */
    static #ezActiveTimeZone = null;
    /**
     * @static
     * @public @property
     * @returns {string}
     */
    static get ezActiveTimeZone() {
        if (null == this.#ezActiveTimeZone) {
            this.#ezActiveTimeZone = this.ezGuessLocalTimeZone();
        }

        return this.#ezActiveTimeZone;
    }
    /**
     * @static
     * @public @property
     * @param {string}
     */
    static set ezActiveTimeZone(timeZoneId) {
        timeZoneId = !EzString.hasLength(timeZoneId) || '0' === timeZoneId || ' ' === timeZoneId || 'AUTOMATIC' === timeZoneId
            ? this.ezGuessLocalTimeZone()
            : timeZoneId;

        if (this.#ezActiveTimeZone !== timeZoneId) {
            try {
                this.#ezActiveTimeZone = timeZoneId;

                moment.tz.setDefault(timeZoneId);
            } catch (err) {
                this.#ezActiveTimeZone = EzDateTime.ezGuessLocalTimeZone();

                moment.tz.setDefault(this.#ezActiveTimeZone);
            }
        }
    }

    /**
     * @static
     * @private @field
     * Stores the preferred locale to use
     * @type {string}
     * A valid enum property value from EzLocale
     */
    static #ezPreferredLocale = EzLocale.DEFAULT;
    /**
     * @static
     * @public @property @getter
     * Gets the preferred locale to use
     * @returns {string}
     * A valid enum property value from EzLocale
     */
    static get ezPreferredLocale() {
        return EzDateTime.#ezPreferredLocale;
    }
    /**
     * @static
     * @public @property @setter
     * Sets the preferred locale to use
     * @param {string} ezLocale
     * A valid enum property value from EzLocale
     */
    static set ezPreferredLocale(ezLocale) {
        this.#ezPreferredLocale = EzLocale.ezLocaleForValue(ezLocale);

        // TODO: Finish implementation using ezLocale
        // Inject the locale into the browser document
        /*
        let script = document.createElement('script');

        script.src = `/node_modules/moment/locale/${EzDateTime.ezInstance.ezPreferredLocale.toLowerCase()}.js`;

        script.charSet = "UTF-8";

        document.head.appendChild(script);

        // Set the moment.js locale to the preferred
        moment.locale(this.#ezPreferredLocale);
        */
    }

    /**
     * @static
     * @public @method
     * @returns {moment}
     */
    static ezNow() {
        return EzDateTime.ezMomentWithPTZ(moment());
    }

    /**
     * @static
     * @public @method
     * Returns the current date and time as an ISO string
     * @returns {string}
     */
    static ezNowAsIso() {
        return EzDateTime.ezToIso(EzDateTime.ezInstance.ezNow());
    }

    /**
     * @static
     * @public @method
     * Transforms the provided moment to one with the preferred timezone
     * @param {moment} aMoment
     * @param {undefined|null|string} ezLocale
     * A valid enum property value from EzLocale
     * Defaults to: EzDateTime.ezInstance.ezPreferredLocale
     * @returns {moment}
     */
    static ezMomentWithPTZ(aMoment/*, ezLocale */) {
        if (!EzDateTime.ezIsValidMoment(aMoment)) {
            throw new EzBadParamException(
                'aMoment',
                EzDateTime,
                EzDateTime.ezMomentWithPTZ);
        }

        // TODO: Finish implementation using ezLocale
        /*
        if (!EzString.stringHasLength(ezLocale)) {
            ezLocale = EzDateTime.ezPreferredLocale;
        }
        */

        return EzDateTime.ezFromIso(aMoment.format());

        // TODO: Finish implementation using ezLocale
        /*
        return EzDateTime.ezFromIso(aMoment.format())
            .locale(EzDateTime.ezPreferredLocale);
        */
    }

    /**
     * @static
     * @public @method
     * Creates a moment instance from the provided iso8601DateTime value.
     * Sets the timezone to the preferred time zone.
     * @param {string} isoString
     * @param {undefined|null|string} ezLocale
     * A valid enum property value from EzLocale
     * Default is: EzDateTime.ezPreferredLocale
     * @returns {moment}
     */
    static ezFromIso(isoString, ezLocale) {
        let vResult = EzDateTime.ezValidateIsoString(isoString);

        if (!vResult.valid) {
            ezApi.ezclocker.ezLogger.error(vResult.message);

            throw new EzBadParamException(
                'isoString',
                EzDateTime,
                EzDateTime.ezFromIso);
        }

        // TODO: Finish implementation using ezLocale
        /*
        if (!EzString.stringHasLength(ezLocale)) {
            ezLocale = EzDateTime.ezPreferredLocale;
        }

        let aMoment = moment(isoString).locale(ezLocale);
        */

        // Do not 'refactor' the below two lines (rat hole... lol)
        let aMoment = moment(isoString);

        return moment.tz(
            aMoment,
            EzDateTime.ezActiveTimeZone);
    }

    /**
     * @static
     * @public @method
     * Determines if the provided moment is a valid moment object.
     * @returns {boolean}
     */
    static ezIsValidMoment(aMoment) {
        if (!EzObject.isValid(aMoment) || !EzFunction.isFunction(aMoment.format)) {
            return false;
        }

        let testIso = aMoment.format();

        return EzDateTime.ezInstance.ezValidateIsoString(testIso);
    }

    /**
     * @static
     * @public @method
     * Validates a possible Iso8601 date time value. Validation result returned as:
     * {
     *    valid: {boolean},
     *    errorMessage: {string|null}
     * }
     * @param {string} isoString
     * Return Object:
     *  {
     *      isoValue: {isoString}
     *      dateTimeMoment: {moment|null}
     *      valid: {boolean},
     *      message: String
     *  }
     * @returns {Object}
     */
    static ezValidateIsoString(isoString) {
        let response = {
            isoValue: isoString,
            dateTimeMoment: null,
            valid: false,
            message: 'The provided value is not a valid ISO string.'
        };

        if (!EzString.stringHasLength(isoString)) {
            response.message = 'A null, undefined, or empty value is not a valid ISO string.';

            return response;
        }

        // Validate using REGEX
        response.valid = EzDateTime.ISO_VALIDATION_REGEX.test(isoString);

        if (response.valid) {
            response.message = 'The provided value is a valid ISO string.';
        }

        return response;
    }

    /**
     * @public @method
     * Guesses the local time zone
     * @returns {string}
     */
    static ezGuessLocalTimeZone() {
        return moment.tz.guess(true);
    }

    /**
     * @public @method
     * Convers the provided aMoment to the preferred time zone
     * then adds the provided {daysToAdd} number of days.
     * Calls:  EzDateTime.ezInstance.ezAdd(aMoment, 'days', daysToAdd)
     * @param {moment} aMoment
     * @param {Number} daysToAdd
     * @returns {moment}
     */
    static ezAddDays(aMoment, daysToAdd) {
        return EzDateTime.ezAdd(aMoment, 'days', daysToAdd);
    }

    /**
     * @public @method
     * Sets the aMoment instnace to the preferred time zone then executes the moment.add() function using the provided
     * aValueKey and aAmountToAdd as the params.
     * The aValueKey can be either the full name or short hand value:
     * years|y
     * quarters|Q
     * months|M
     * weeks|w
     * days|d
     * hours|h
     * minutes|m
     * seconds|s
     * milliseconds|ms
     * Calling:  EzDateTime.ezInstance.ezMomentWithPTZ({aMoment}).add({aAmountToAdd}, {aValueKey});
     * @param {moment} aMoment
     * @param {string} aValueKey
     * @param {Number} aAmountToAdd
     * @returns {moment}
     */
    static ezAdd(aMoment, aValueKey, aAmountToAdd) {
        if (!EzDateTime.ezIsValidMoment(aMoment)) {
            throw new EzBadParamException(
                'aMoment',
                EzDateTime,
                EzDateTime.ezInstance.ezAdd);
        }

        if (!EzString.stringHasLength(aValueKey)) {
            throw new EzBadParamException(
                'aValueKey',
                EzDateTime,
                EzDateTime.ezAdd);
        }

        if (!EzNumber.isNumber(aAmountToAdd)) {
            throw new EzBadParamException(
                'aAmountToAdd',
                EzDateTime,
                EzDateTime.ezAdd);
        }

        aMoment = EzDateTime.ezMomentWithPTZ(aMoment);

        return aMoment.add(
            aAmountToAdd,
            aValueKey);
    }
}