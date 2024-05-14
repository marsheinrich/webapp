import { EzClass } from '/ezlibrary/EzClass.js';

/**
 * Provides various formatting utilities
 */
class EzFormat extends EzClass {
    // Formats: https://en.wikipedia.org/wiki/National_conventions_for_writing_telephone_numbers
    // Example Phone Number: 1-234-567-8987 (12345678987)
    static get MINIMIZED_NANP_PHONE_NUMBER_REGEX() {
        return /^(\d{1}|)?(\d{3})(\d{3})(\d{4})$/; // 12345678987
    }
    static get MINIMIZED_US_PHONE_NUMBER_10_DIGITS_REGEX() {
        return /^(\d{3})(\d{3})(\d{4})$/; // 2345678987
    }
    static get MINIMIZED_US_PHONE_NUMBER_9_DIGITS_REGEX() {
        return /^(\d{3})(\d{3})(\d{3})$/; // 345678987
    }
    static get MINIMIZED_US_PHONE_NUMBER_8_DIGITS_REGEX() {
        return /^(\d{3})(\d{3})(\d{2})$/; // 45678987
    }
    static get MINIMIZED_US_PHONE_NUMBER_7_DIGITS_REGEX() {
        return /^(\d{3})(\d{4})(\d{1})$/; // 5678987
    }
    static get MINIMIZED_US_PHONE_NUMBER_6_DIGITS_REGEX() {
        return /^(\d{3})(\d{3})$/; // 567898
    }
    static get MINIMIZED_US_PHONE_NUMBER_5_DIGITS_REGEX() {
        return /^(\d{3})(\d{2})$/; // 56789
    }
    static get MINIMIZED_US_PHONE_NUMBER_4_DIGITS_REGEX() {
        return /^(\d{3})(\d{1})$/; // 5678
    }
    static get MINIMIZED_US_PHONE_NUMBER_3_DIGITS_REGEX() {
        return /^(\d{3})$/; // 567
    }
    static get MINIMIZED_US_PHONE_NUMBER_2_DIGITS_REGEX() {
        return /^(\d{2})$/; // 56
    }
    static get MINIMIZED_US_PHONE_NUMBER_1_DIGITS_REGEX() {
        return /^(\d{1})$/; // 5
    }
    static get MINIMIZED_NANP_PHONE_NUMBER_COUNTRY_CODE_REGEX() {
        return /^(\d{1})$/; // 1
    }
    static get FORMATTED_US_PHONE_NUMBER_REGEX() {
        return new RegExp(/^(\+1|)-(\d{3})-(\d{3})\-(\d{4})$/);
    }
    static get BASIC_FORMATTED_US_PHONE_NUMBER_REGEX() {
        return new RegExp(/(\d{3})-(\d{3})-(\d{4})$/);
    }

    /** @public @static @property */
    static ezApiName = 'ezFormat';
    /** @public @static @property */
    static ezEventNames = {
        onReady: 'ezOn_EzFormat_Ready',
        onResetPasswordSubmitted: 'EzRequestPasswordResetDialog_OnSubmitted',
        onResetPasswordCanceled: 'EzRequestPasswordResetDialog_OnCanceled',
        onResetPasswordError: 'EzRequestPasswordResetDialog_OnError'
    };
    /** @public @static @property */
    static ezInstance = null;
    /** @private @static @property */
    static ezApiRegistrationState = null;
    /** @private @static @method */
    static ezCanRegister() {
        return 'PENDING' === EzFormat.ezApiRegistrationState &&
            Object.prototype.hasOwnProperty.call(globalThis, 'ezApi') &&
            globalThis.ezApi && globalThis.ezApi.ready;
    }
    /** @private @static @method */
    static ezRegistrator() {
        if (!EzFormat.ezCanRegister()) {
            return false;
        }
        EzFormat.ezInstance = ezApi.ezRegisterNewApi(
            EzFormat,
            EzFormat.ezApiName);
        EzFormat.ezApiRegistrationState = 'REGISTERED';
        return true;
    }
    static {
        if (null == this.ezApiRegistrationState) {
            this.ezApiRegistrationState = 'PENDING';

            if (!this.ezRegistrator()) {
                document.addEventListener(
                    'onEzApiReady',
                    this.ezRegistrator);
            }
        }
    }

    constructor() {
        super();
    }

    /**
     * @public
     * Initializes EzFormat
     * @returns {EzFormat}
     */
    ezInit() {
        let self = ezApi.ezclocker[EzFormat.ezApiName];

        self.ready = true;
        return self;
    }

    /**
     * @public
     * @param {string} amount
     * @param {string} dollarIcon
     * @returns {string}
     */
    ezFormatDollarString(amount, dollarIcon) {
        var dollarCents = amount.split('.');
        var result = '0.00';
        if (dollarCents.length >= 1) {
            if (dollarCents[0].length === 0) {
                result = '0.';
            } else {
                result = dollarCents[0] + '.';
            }

            if (dollarCents.length >= 2) {
                if (dollarCents[1].length === 0) {
                    dollarCents[1] = '00';
                } else if (dollarCents[1].length == 1) {
                    dollarCents[1] = '0' + dollarCents[1];
                } else if (dollarCents[1].length > 2) {
                    dollarCents[1] = dollarCents[1].substring(0, 1);
                }
                result = result + dollarCents[1];
            }
        }

        return dollarIcon + result;
    }

    /**
        @public
        Minimizes the phone number by removing all non-digets from the provdied phoneNumber.
        @param {String} phoneNumber
        @returns {String}
     */
    ezMinimizePhoneNumber(phoneNumber) {
        return ezApi.ezStringHasLength(phoneNumber)
            ? phoneNumber.replace(/\D/g, '')
            : '';
    }

    /**
        @public
        Returns a US formatted phone number using the provided parts.
        @param {String} internationalCode
        @param {String} areaCode
        @param {String} prefix
        @param {String} number
        @returns {String}
     */
    ezBuildUSPhoneNumber(countryCode, areaCode, prefix, number) {
        let result = [];

        if (ezApi.ezStringHasLength(countryCode)) {
            result.push(countryCode);
            result.push('-');
        }

        result.push(ezApi.ezStringHasLength(areaCode)
            ? areaCode.padEnd(3, 'X')
            : 'XXX');
        result.push('-');

        result.push(ezApi.ezStringHasLength(prefix)
            ? prefix.padEnd(3, 'X')
            : 'XXX');
        result.push('-');

        result.push(ezApi.ezStringHasLength(number)
            ? number.padEnd(4, 'X')
            : 'XXXX');

        return result.join('');
    }

    /**
        @public
        Determinse if the provided phone number matches one of the following formats:
            +1 (555) 555-5555
            (555) 555-5555
        @param {String} phoneNumber
        @returns {Boolean}
     */
    ezIsUSPhoneNumber(phoneNumber) {
        if (!ezApi.ezStringHasLength(phoneNumber)) {
            return false;
        }

        let matched = EzFormat.FORMATTED_US_PHONE_NUMBER_REGEX.exec(phoneNumber);

        if (ezApi.ezIsValid(matched) && 5 == matched.length) {
            return true;
        }

        matched = EzFormat.BASIC_FORMATTED_US_PHONE_NUMBER_REGEX.exec(phoneNumber);

        return ezApi.ezIsValid(matched) && 4 == matched.length;
    }

    /**
        @public
        Formats a phone number using the preferred phon enumber format.
     */
    ezFormatUSPhoneNumber(phoneNumber) {
        let self = ezApi.ezclocker[EzFormat.ezApiName];

        if (!ezApi.ezStringHasLength(phoneNumber)) {
            return '';
        }

        let cleaned = self.ezMinimizePhoneNumber(phoneNumber).replace(/\D/g, '');

        // Format: 1-234-567-8989
        let match = cleaned.match(EzFormat.MINIMIZED_NANP_PHONE_NUMBER_REGEX);
        if (ezApi.ezIsValid(match) && 5 === match.length && ezApi.ezStringHasLength(match[1]) &&
            ezApi.ezStringHasLength(match[2]) && ezApi.ezStringHasLength(match[3]) &&
            ezApi.ezStringHasLength(match[4])) {
            return self.ezBuildUSPhoneNumber('', match[2], match[3], match[4]);
        }

        // Format: 234-567-8989
        match = cleaned.match(EzFormat.MINIMIZED_US_PHONE_NUMBER_10_DIGITS_REGEX);
        if (ezApi.ezIsValid(match) && 4 === match.length && ezApi.ezStringHasLength(match[1]) &&
            ezApi.ezStringHasLength(match[2]) && ezApi.ezStringHasLength(match[3])) {
            return self.ezBuildUSPhoneNumber('', match[1], match[2], match[3]);
        }

        // Format: 34-567-8989
        match = cleaned.match(EzFormat.MINIMIZED_US_PHONE_NUMBER_9_DIGITS_REGEX);
        if (ezApi.ezIsValid(match) && 4 === match.length && ezApi.ezStringHasLength(match[1]) &&
            ezApi.ezStringHasLength(match[2]) && ezApi.ezStringHasLength(match[3])) {
            return self.ezBuildUSPhoneNumber('', match[1], match[2], match[3]);
        }

        // Format: 4-567-8989
        match = cleaned.match(EzFormat.MINIMIZED_US_PHONE_NUMBER_8_DIGITS_REGEX);
        if (ezApi.ezIsValid(match) && 4 === match.length && ezApi.ezStringHasLength(match[1]) &&
            ezApi.ezStringHasLength(match[2]) && ezApi.ezStringHasLength(match[3])) {
            return self.ezBuildUSPhoneNumber('', match[1], match[2], match[3]);
        }

        // Format: 567-8989
        match = cleaned.match(EzFormat.MINIMIZED_US_PHONE_NUMBER_7_DIGITS_REGEX);
        if (ezApi.ezIsValid(match) && 3 === match.length && ezApi.ezStringHasLength(match[1]) &&
            ezApi.ezStringHasLength(match[2])) {
            return self.ezBuildUSPhoneNumber('', '', match[1], match[2]);
        }

        // Format: 567-898
        match = cleaned.match(EzFormat.MINIMIZED_US_PHONE_NUMBER_6_DIGITS_REGEX);
        if (ezApi.ezIsValid(match) && 3 === match.length && ezApi.ezStringHasLength(match[1]) &&
            ezApi.ezStringHasLength(match[2])) {
            return self.ezBuildUSPhoneNumber('', '', match[1], match[2]);
        }

        // Format: 567-89
        match = cleaned.match(EzFormat.MINIMIZED_US_PHONE_NUMBER_5_DIGITS_REGEX);
        if (ezApi.ezIsValid(match) && 3 === match.length && ezApi.ezStringHasLength(match[1]) &&
            ezApi.ezStringHasLength(match[2])) {
            return self.ezBuildUSPhoneNumber('', '', match[1], match[2]);
        }

        // Format: 567-8
        match = cleaned.match(EzFormat.MINIMIZED_US_PHONE_NUMBER_4_DIGITS_REGEX);
        if (ezApi.ezIsValid(match) && 3 === match.length && ezApi.ezStringHasLength(match[1]) &&
            ezApi.ezStringHasLength(match[2])) {
            return self.ezBuildUSPhoneNumber('', '', match[1], match[2]);
        }

        // Format: 567
        match = cleaned.match(EzFormat.MINIMIZED_US_PHONE_NUMBER_3_DIGITS_REGEX);
        if (ezApi.ezIsValid(match) && 2 === match.length && ezApi.ezStringHasLength(match[1])) {
            return self.ezBuildUSPhoneNumber('', match[1], '');
        }

        // Format: 56
        match = cleaned.match(EzFormat.MINIMIZED_US_PHONE_NUMBER_2_DIGITS_REGEX);
        if (ezApi.ezIsValid(match) && 2 === match.length && ezApi.ezStringHasLength(match[1])) {
            return self.ezBuildUSPhoneNumber('', match[1], '');
        }

        // Format: 5
        match = cleaned.match(EzFormat.MINIMIZED_US_PHONE_NUMBER_1_DIGITS_REGEX);
        if (ezApi.ezIsValid(match) && 2 === match.length && ezApi.ezStringHasLength(match[1])) {
            return self.ezBuildUSPhoneNumber('', match[1], '');
        }

        // Format: 1
        match = cleaned.match(EzFormat.MINIMIZED_NANP_PHONE_NUMBER_COUNTRY_CODE_REGEX);
        if (ezApi.ezIsValid(match) && 2 === match.length && ezApi.ezStringHasLength(match[1])) {
            return self.ezBuildUSPhoneNumber('', '', '', '');
        }
        return phoneNumber;
    }
}

export {
    EzFormat
};