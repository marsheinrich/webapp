import {
    EzBadParamException
} from '/ezlibrary/exceptions/EzExceptions.js';

import {
    EzObject,
    EzBoolean,
    EzNumber,
    EzString,
    EzArray
} from '/ezlibrary/helpers/EzHelpers.js';

import { EzClass } from '/ezlibrary/EzClass.js';

import {
    EzRegistrationState
} from '/ezlibrary/enums/EzEnumerations.js';

import {
    EzValidationResponseStatus,
    EzValidationResponse
} from '/ezlibrary/EzValidationResponse.js';

import { EzUI } from '/public/javascript/common/ezui.js';

/**
 * @class
 * @description
 * Provides various validation utility methods
 * ---------------------------------------------------------------------
 * Import with:
 *      import { EzValidation } from '/public/javascript/common/ez-validation.js';
 * ---------------------------------------------------------------------
 * Singleton instance ready:
 *      globalThis.ezApi.ezclocker[EzValidation.ezApiName] &&
 *      globalThis.ezApi.ezclocker[EzValidation.ezApiName].ready
 * ---------------------------------------------------------------------
 * Listen for onReady event with:
 *      document.addEventListener(
 *          EzValidation.ezEventNames.onReady,
 *          <CLASS>.#ezRegistrator);
 * ---------------------------------------------------------------------
 * Singleton instance:
 *  Inside this class...: EzValidation.ezInstance
 *  Outside this class..: ezApi.ezclocker.EzValidation
 */
export class EzValidation extends EzClass {
    /**
     * ------------------------------------------------------------
     * Regular Expression for RFC2822
     * Most likely not a perfect regex for the whole definition.
     * Doesn't include length checks
     * ------------------------------------------------------------
     * Documentation
     * https://datatracker.ietf.org/doc/html/rfc2822
     * ------------------------------------------------------------
     * Supported Email Examples
     *
     * simple@example.com
     * very.common@example.com
     * disposable.style.email.with+symbol@example.com
     * other.email-with-hyphen@example.com
     * fully-qualified-domain@example.com
     * user.name+tag+sorting@example.com
     * x@example.com
     * example-indeed@strange-example.com
     * test/test@test.com
     * example@s.example
     * mailhost!username@example.org
     * user%example.com@example.org
     * user-@example.org
     * ------------------------------------------------------------
     * Unsupported Email Examples
     *
     *  space-in-front@example.org
     * admin@mailserver1
     * " "@example.org
     * "john..doe"@example.org
     * "very.(),:;<>[]\".VERY.\"very@\\ \"very\".unusual"@strange.example.com
     * postmaster@[123.123.123.123]
     * postmaster@[IPv6:2001:0db8:85a3:0000:0000:8a2e:0370:7334]
     * example@example,com
     * Abc.example.com
     * A@b@c@example.com
     * a"b(c)d,e:f;g<h>i[j\k]l@example.com
     * just"not"right@example.com
     * this is"not\allowed@example.com
     * this\ still\"not\\allowed@example.com
     * i_like_underscore@but_its_not_allowed_in_this_part.example.com
     * QA[icon]CHOCOLATE[icon]@test.com
     * ------------------------------------------------------------
     */
    static get EMAIL_VALIDATE_RFC2822() {
        // Original RegEx: /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
        // Simplified RegEx: ^[a-z\d!#$%&'*/=?^_`{|}~-]+(?:\.[a-z\d!#$%&'*/=?^_`{|}~-]+)*@(?:[a-z\d](?:[a-z\d-]*[a-z\d])?\.)+[a-z\d](?:[a-z\d-]*[a-z\d])?$
        return /^[a-z\d!#$%&'*/=?^_`{|}~-]+(?:\.[a-z\d!#$%&'*/=?^_`{|}~-]+)*@(?:[a-z\d](?:[a-z\d-]*[a-z\d])?\.)+[a-z\d](?:[a-z\d-]*[a-z\d])?$/;
    }

    /**
     * @static
     * @public @readonly @property
     * Gets the US Phone Number with country code and area code formatting RegEx
     * Template: +1 (000) 000-0000
     * https://regexr.com/7g5hl
     * @returns {regex}
     */
    static get FORMATTED_US_PHONE_NUMBER_REGEX() {
        return /^(\+1|) \((\d{3})\) (\d{3})-(\d{4})$/;
    }

    /**
     * @static
     * @public @readonly @property
     * Gets the US phone number with area code RegEx
     * Template: (000) 000-0000
     * https://regexr.com/7g5hf
     * @returns {regex}
     */
    static get BASIC_FORMATTED_US_PHONE_NUMBER_REGEX() {
        return /^\((\d{3})\) (\d{3})-(\d{4})$/;
    }

    /**
     * @static
     * @public @readonly @property
     * @returns {number}
     */
    static get MINIMUM_EZCLOCKER_PASSWORD_LENGTH() {
        return 8;
    }

    /**
     * @static
     * @public @readonly @property
     * Gets the maximum password length
     * @returns {number}
     */
    static get MAXIMUM_EZCLOCKER_PASSWORD_LENGTH() {
        return 256;
    }

    /**
     * @static
     * @public @readonly @property
     * Gets the PASSWORD_VALID string
     * @returns {string}
     */
    static get PASSWORD_VALID() {
        return 'PASSWORD_VALID';
    }

    /**
     * @static
     * @public @readonly @property
     * Gets the 'EMAIL_VALID' string
     * @returns {string}
     */
    static get EMAIL_VALID() {
        return 'EMAIL_VALID';
    }

    /**
     * @static
     * @public @readonly @property
     * Gets the 'VALID' string
     * @returns {string}
     */
    static get VALID_RESPONSE() {
        return 'VALID';
    }

    /**
     * @static
     * @public @readonly @property
     * Gets the Kiosk PIN validation RegEx
     * @returns {regex}
     */
    static get ezKioskPINValidationRegEx() {
        return /\d{4}$/g;
    }

    /**
     * @public @readonly @property
     * @returns {string}
     * @deprecated
     * Migrate to using the static version only
     */
    static get PASSWORD_VALIDATION_ERROR() {
        return `All ezClocker passwords must have between ${EzValidation.MINIMUM_EZCLOCKER_PASSWORD_LENGTH} and ${EzValidation.MAXIMUM_EZCLOCKER_PASSWORD_LENGTH} characters.`;
    }

    /**
     * @public @readonly @property
     * Gets the array of unsupported email Countries
     * @type {array}
     */
    get ezUnsupportedEmailCountries() {
        return ['.ru', '.cn'];
    }

    /**
     * @public @readonly @property
     * @returns {number}
     * @deprecated
     * Migrate to using the static version only
     */
    get MINIMUM_EZCLOCKER_PASSWORD_LENGTH() {
        return EzValidation.MINIMUM_EZCLOCKER_PASSWORD_LENGTH;
    }
    /**
     * @public @readonly @property
     * @returns {number}
     * @deprecated
     * Migrate to using the static version only
     */
    get MAXIMUM_EZCLOCKER_PASSWORD_LENGTH() {
        return EzValidation.MAXIMUM_EZCLOCKER_PASSWORD_LENGTH;
    }

    /**
     * @public @readonly @property
     * @returns {string}
     * @deprecated
     * Migrate to using the static version only
     */
    get PASSWORD_VALID() {
        return EzValidation.PASSWORD_VALID;
    }

    /**
     * @public @readonly @property
     * @returns {string}
     * @deprecated
     * Migrate to using the static version only
     */
    get EMAIL_VALID() {
        return EzValidation.EMAIL_VALID;
    }

    /**
     * @public @readonly @property
     * @returns {string}
     * @deprecated
     * Migrate to using the static version only
     */
    get VALID_RESPONSE() {
        return EzValidation.VALID_RESPONSE;
    }

    /**
     * @public @method
     * Initializes EzValidation
     * @returns {EzValidation}
     */
    ezInit() {
        return EzValidation.ezInstance;
    }

    /**
     * @public @method
     * Resets the content and hides the provided errorWarningBoxIdsArray
     * Clears the error highlight on the inputIdsArray
     * @param {array} errorWarningBoIdsArray
     * @param {array} inputIdsArray
     */
    ezResetValidationErrors(errorWarningBoxIdsArray, inputIdsArray) {
        if (EzArray.arrayHasLength(errorWarningBoxIdsArray)) {
            for (let errorBoxId of errorWarningBoxIdsArray) {
                ezApi.ezclocker.ezUi.ezContent(errorBoxId, '');
                ezApi.ezclocker.ezUi.ezHideElement(errorBoxId);
            }
        }

        if (EzArray.arrayHasLength(inputIdsArray)) {
            for (let inputId of inputIdsArray) {
                ezApi.ezclocker.ezUi.ezHideInputError(inputId);
            }
        }
    }

    /**
     * @public @method
     * Validates the provided teamPin
     * @param {String} teamPin
     * @param {boolean|null} errorOnEmpty
     * @returns {EzValidationResponse}
     */
    ezValidateTeamPin(teamPin, errorOnEmpty) {
        let pinValidationFailed = EzBoolean.isTrue(errorOnEmpty) && !EzString.hasLength(teamPin);

        // RegEx validation check
        pinValidationFailed = pinValidationFailed || 0 != teamPin.length && !EzValidation.ezKioskPINValidationRegEx.test(teamPin);

        if (EzBoolean.isTrue(pinValidationFailed)) {
            return new EzValidationResponse(
                EzValidationResponseStatus.ERROR,
                'Kiosk PIN must consist of four numbers (unique for each employee with a Kiosk PIN).');
        }

        return new EzValidationResponse(
            EzValidationResponseStatus.VALID,
            'Team PIN is valid');
    }

    /**
     * @public @method
     * Validates tem pin entries
     * @param {String} inputId
     * @param {String|null} errorBoxId
     * @returns {EzValidationResponse}
     * @deprecated Migrate to ezValidateTeamPinInput(inputId, errorMessageBoxId)
     */
    ezOnKeyPressValidateTeamPinEditor(inputId) {
        if (!EzString.hasLength(inputId) || !ezApi.ezclocker.ezUi.ezElementExists(inputId)) {
            throw new EzBadParamException(
                'inputId',
                EzValidation.ezInstance,
                EzValidation.ezInstance.ezOnKeyPressValidateTeamPinEditor);
        }

        return EzValidation.ezInstance.ezValidateTeamPin(ezApi.ezclocker.ezUi.ezGetInputValue(inputId));
    }

    /**
     * @public @method
     * Validates the value of a team pin input editor.
     * @param {String} inputId
     * @param {String|null} errorMessageBoxId
     * @param {String|null} warningMessageBoxId
     * @param {boolean|null} errorOnEmpty
     * @returns {EzValidationResponse}
     */
    ezValidateTeamPinInput(inputId, errorMessageBoxId, warningMessageBoxId, errorOnEmpty) {
        let vResponse = EzValidation.ezInstance.ezValidateTeamPin(
            ezApi.ezclocker.ezUi.ezGetInputValue(inputId),
            EzBoolean.isTrue(errorOnEmpty));

        return EzValidation.ezInstance.ezProcessInputValidationResult(
            vResponse,
            inputId,
            errorMessageBoxId,
            warningMessageBoxId);
    }

    /**
     * @public @method
     * Processes the validation response and applies or removes input error highlighting and
     * error message box content.
     * @param {EzValidationResponse} vResponse
     * @param {string} inputId
     * @param {undefined|null|string} errorMessageBoxId
     * @param {undefined|null|string} warningMessageBoxId
     * @returns {EzValidationResponse}
     */
    ezProcessInputValidationResult(vResponse, inputId, errorMessageBoxId, warningMessageBoxId) {
        if (!EzObject.isValid(vResponse)) {
            throw new EzBadParamException(
                'vResponse',
                EzValidation.ezInstance,
                EzValidation.ezInstance.ezProcessInputValidationResult);
        }

        if (EzString.hasLength(inputId) && ezApi.ezclocker.ezUi.ezElementExists(inputId)) {
            ezApi.ezclocker.ezUi.ezHideInputError(inputId);
            ezApi.ezclocker.ezUi.ezHideInputWarning(inputId);
        }

        if (EzString.hasLength(errorMessageBoxId) && ezApi.ezclocker.ezUi.ezElementExists(errorMessageBoxId)) {
            ezApi.ezclocker.ezUi.ezContent(errorMessageBoxId, '');
            ezApi.ezclocker.ezUi.ezHideElement(errorMessageBoxId);
        }

        if (EzValidationResponseStatus.VALID === vResponse.ezGetStatus()) {
            // Valid, inputs already reset
            return vResponse;
        }

        if (EzValidationResponseStatus.ERROR === vResponse.ezGetStatus()) {
            if (EzString.hasLength(inputId) && ezApi.ezclocker.ezUi.ezElementExists(inputId)) {
                ezApi.ezclocker.ezUi.ezShowInputError(inputId);
            }

            if (EzString.hasLength(errorMessageBoxId) && ezApi.ezclocker.ezUi.ezElementExists(errorMessageBoxId) &&
                EzString.hasLength(vResponse.ezGetMessage())) {
                ezApi.ezclocker.ezUi.ezContent(errorMessageBoxId, vResponse.ezGetMessage());
                ezApi.ezclocker.ezUi.ezShowElement(errorMessageBoxId);
            }
        }

        if (EzValidationResponseStatus.ERROR_UNSUPPORTED === vResponse.ezGetStatus()) {
            if (EzString.hasLength(inputId) && ezApi.ezclocker.ezUi.ezElementExists(inputId)) {
                ezApi.ezclocker.ezUi.ezShowInputError(inputId);
            }

            if (EzString.hasLength(errorMessageBoxId) && ezApi.ezclocker.ezUi.ezElementExists(errorMessageBoxId)
                && EzString.hasLength(vResponse.ezGetMessage())) {
                ezApi.ezclocker.ezUi.ezContent(errorMessageBoxId, vResponse.ezGetMessage());
                ezApi.ezclocker.ezUi.ezShowElement(errorMessageBoxId);
            }
        }

        if (EzValidationResponseStatus.WARNING === vResponse.ezGetStatus()) {
            if (EzString.hasLength(inputId) && ezApi.ezclocker.ezUi.ezElementExists(inputId)) {
                ezApi.ezclocker.ezUi.ezShowInputWarning(inputId);
            }

            if (EzString.hasLength(errorMessageBoxId) && ezApi.ezclocker.ezUi.ezElementExists(warningMessageBoxId) &&
                EzString.hasLength(vResponse.ezGetMessage())) {
                ezApi.ezclocker.ezUi.ezContent(warningMessageBoxId, vResponse.ezGetMessage());
                ezApi.ezclocker.ezUi.ezShowElement(warningMessageBoxId);
            }
        }

        return vResponse;
    }

    /**
     * @public @method
     * Validates the length of a team pin
     * Response Object:
     * <code>
     * {
     *    errorCode: {0|ERROR_CODE},
     *    message: {MESSAGE}
     * }
     * </code>
     * @param {String} inputId
     * @param {String} errorBoxId
     * @returns {Object}
     * @deprecated Migrate to ezValidateTeamPinInput
     */
    ezValidateTeamPinLength(inputId, errorBoxId) {
        return EzValidation.ezInstance.ezValidateTeamPinInput(inputId, errorBoxId);
    }

    /**
     * @public @method
     * Shows an error box with the provided message.
     * @param {String} errorBoxId
     * @param {String} message
     */
    ezShowErrorBoxMessage(errorBoxId, errorMessage) {
        if (!EzString.hasLength(errorBoxId) || !ezApi.ezclocker.ezUi.ezElementExists(errorBoxId)) {
            // No error box id to show message in!
            return;
        }
        if (!EzString.hasLength(errorMessage)) {
            // No message to show
            return;
        }

        ezApi.ezclocker.ezUi.ezContent(errorBoxId, errorMessage);

        ezApi.ezclocker.ezUi.ezShowElement(errorBoxId);
    }

    /**
     * @public @method
     * Generates a validation response object
     * @param {string|null} message
     * @param {number|null} errorCode
     * @returns {EzValidationResponse}
     */
    ezBuildValidationResponse(message, errorCode) {
        let validationStatus = EzValidationResponseStatus.VALID;
        if (0 < errorCode) {
            validationStatus = EzValidationResponseStatus.ERROR;
        }
        if (0 > errorCode) {
            validationStatus = EzValidationResponseStatus.WARNING;
        }

        return new EzValidationResponse(
            validationStatus,
            EzString.hasLength(message)
                ? message
                : EzValidationResponseStatus.ezToDisplay(validationStatus));
    }

    /**
     * @public @method
     * Validate an employee name
     * @param {String} employeeName
     * @param {boolean|null}
     */
    ezValidateEmployeeName(employeeName, errorOnEmpty) {
        if (!EzBoolean.isTrue(errorOnEmpty) && !EzString.hasLength(employeeName)) {
            return new EzValidationResponse(
                EzValidationResponseStatus.VALID,
                'Empty employee name is valid.');
        }

        if (!EzString.hasLength(employeeName) || !EzValidation.ezInstance.ezIsMinLength(employeeName, 1)) {
            return new EzValidationResponse(
                EzValidationResponseStatus.ERROR,
                'Employee name must have at least one character.');
        }

        return new EzValidationResponse(
            EzValidationResponseStatus.VALID,
            'Employee name is valid.');
    }

    /**
     * @public @method
     * Validates the value of a employe name input editor.
     * @param {String} inputId
     * @param {String|null} errorMessageBoxId
     * @param {String|null} warningMessageBoxId
     * @param {boolean|null} errorOnEmpty
     * @returns {EzValidationResponse}
     */
    ezValidateEmployeeNameInput(inputId, errorMessageBoxId, warningMessageBoxId, errorOnEmpty) {
        let vResponse = EzValidation.ezInstance.ezValidateEmployeeName(
            ezApi.ezclocker.ezUi.ezGetInputValue(inputId),
            EzBoolean.isTrue(errorOnEmpty));

        return EzValidation.ezInstance.ezProcessInputValidationResult(vResponse, inputId, errorMessageBoxId, warningMessageBoxId);
    }

    /**
     * @public @method
     * Validate company name
     * @param {String} companyName
     * @param {boolean|null} errorOnEmpty
     */
    ezValidateCompanyName(companyName, errorOnEmpty) {
        if (!EzBoolean.isTrue(errorOnEmpty) && !EzString.hasLength(companyName)) {
            return new EzValidationResponse(
                EzValidationResponseStatus.VALID,
                'Empty company name is valid.');
        }

        if (!EzValidation.ezInstance.ezIsMinLength(companyName, 1)) {
            return new EzValidationResponse(
                EzValidationResponseStatus.ERROR,
                'The company name must have at least one character.');
        }

        return new EzValidationResponse(
            EzValidationResponseStatus.VALID,
            'Company name is valid.');
    }

    /**
     * @public @method
     * Validates the value of a company name input editor.
     * @param {String} inputId
     * @param {String|null} errorMessageBoxId
     * @param {String|null} warningMessageBoxId
     * @param {boolean|null} errorOnEmpty
     * @returns {EzValidationResponse}
     */
    ezValidateCompanyNameInput(inputId, errorMessageBoxId, warningMessageBoxId, errorOnEmpty) {
        let vResponse = EzValidation.ezInstance.ezValidateCompanyName(
            ezApi.ezclocker.ezUi.ezGetInputValue(inputId),
            EzBoolean.isTrue(errorOnEmpty));

        return EzValidation.ezInstance.ezProcessInputValidationResult(vResponse, inputId, errorMessageBoxId, warningMessageBoxId);
    }

    /**
     * @public @method
     * Evaluates the provided item's length property and returns true if it is >= minLength. False otherwise
     * @param {string|array} stringOrArray
     * @param {number} minLength
     */
    ezIsMinLength(stringOrArray, minLength) {
        if (!EzNumber.isNumber(minLength)) {
            throw ezApi.ezBadParam(
                'maxLength',
                EzValidation.ezInstance.ezTypeName,
                'ezExceedsMaxLength');
        }
        if (!EzObject.isValid(stringOrArray) || !(EzString.isString(stringOrArray) || ezApi.ezIsArray(stringOrArray))) {
            throw ezApi.ezBadParam(
                'stringOrArray',
                EzValidation.ezInstance.ezTypeName,
                'ezExceedsMaxLength');
        }
        return minLength <= stringOrArray.length;
    }

    /**
     * @public @method
     * Validates the username and password, returning validation results as:
     * {
     *     isValid: {true|false},
     *     username: {un},
     *     password: {pw},
     *     usernameVerification: {
     *         errorCode: {0|ERROR_CODE},
     *         message: {VALID|ERROR_MESSAGE}
     *     },
     *     passwordVerification: {
     *         errorCode: {0|ERROR_CODE},
     *         message: {VALID|ERROR_MESSAGE}
     *     }
     * }
     * @param {null|string} un
     * @param {null|string} pw
     * @returns {Object}
     * Returns: {
     *     username: un,
     *     password: pw,
     *     isValid: {boolean},
     *     usernameVerification: {EzValidationResponse},
     *     passwordVerification: {EzValidationResponse}
     * };
     */
    ezValidateSignIn(un, pw) {
        let vSignInResponse = {
            username: un,
            password: pw,
            isValid: false,
            usernameVerification: EzValidation.ezInstance.ezValidateUsername(un),
            passwordVerification: EzValidation.ezInstance.ezValidatePassword(pw)
        };

        vSignInResponse.isValid =
            EzValidationResponseStatus.VALID === vSignInResponse.usernameVerification.ezGetStatus() &&
            EzValidationResponseStatus.VALID === vSignInResponse.passwordVerification.ezGetStatus();

        return vSignInResponse;
    }

    /**
     * @public @method
     * Validates the value of a company name input editor.
     * @param {String} inputId
     * @param {String|null} errorMessageBoxId
     * @param {String|null} unErrorMessageBoxId
     * @param {String|null} unWarningMessageBoxId
     * @param {String|null} pwErrorMessasgeBoxId
     * @param {String|null} pwWarningMessageBoxId
     * @returns {Object}
     */
    ezValidateSignInInputs(unInputId, pwInputId, errorMessageBoxId, unErrorMessageBoxId,
        unWarningMessageBoxId, pwErrorMessasgeBoxId, pwWarningMessageBoxId) {
        let vSignInResponse = EzValidation.ezInstance.ezValidateSignIn(
            ezApi.ezclocker.ezUi.ezGetInputValue(unInputId),
            ezApi.ezclocker.ezUi.ezGetInputValue(pwInputId));

        vSignInResponse.usernameVerification = EzValidation.ezInstance.ezProcessInputValidationResult(
            vSignInResponse.usernameVerification,
            unInputId,
            unErrorMessageBoxId,
            unWarningMessageBoxId);

        vSignInResponse.passwordVerification = EzValidation.ezInstance.ezProcessInputValidationResult(
            vSignInResponse.passwordVerification,
            pwInputId,
            pwErrorMessasgeBoxId,
            pwWarningMessageBoxId);

        if (EzBoolean.isFalse(vSignInResponse.isValid) && EzString.hasLength(errorMessageBoxId) &&
            ezApi.ezclocker.ezUi.ezElementExists(errorMessageBoxId)) {
            EzValidation.ezInstance.ezShowErrorBoxMessage(
                errorMessageBoxId,
                ezApi.ezEM`
                    <div>${vSignInResponse.usernameVerification.message}</div>
                    <div>${vSignInResponse.passwordVerification.message}</div>`);
        }

        return vSignInResponse;
    }

    /**
     * @public @method
     * Evaluates the provided item's length property and returns false if length < maxLength, true otherwise.
     * @param {String|Array} stringOrArray
     * @param {Number} maxLength
     */
    ezExceedsMaxLength(stringOrArray, maxLength) {
        if (!EzNumber.isNumber(maxLength)) {
            throw new EzBadParamException(
                'maxLength',
                EzValidation.ezInstance,
                EzValidation.ezInstance.ezExceedsMaxLength);
        }
        if (!EzObject.isValid(stringOrArray) || !(EzString.isString(stringOrArray) || ezApi.ezIsArray(stringOrArray))) {
            throw new EzBadParamException(
                'stringOrArray',
                EzValidation.ezInstance,
                EzValidation.ezInstance.ezExceedsMaxLength);
        }

        return maxLength < stringOrArray.length;
    }

    /**
     * @public @method
     * Validates a possible password meets the required criteria. Response errorCode is zero if the password is valid.
     * @param {String} password
     * @param {boolean|null} errorOnEmpty
     * @returns {EzValidationResponse}
     */
    ezValidatePassword(password, errorOnEmpty) {
        if (!EzBoolean.isTrue(errorOnEmpty) && !EzString.hasLength(password)) {
            return new EzValidationResponse(
                EzValidationResponseStatus.VALID,
                'Empty password is valid');
        }

        return !EzString.hasLength(password) ||
            EzValidation.MINIMUM_EZCLOCKER_PASSWORD_LENGTH > password.length ||
            EzValidation.MAXIMUM_EZCLOCKER_PASSWORD_LENGTH < password.length
            ? new EzValidationResponse(
                EzValidationResponseStatus.ERROR,
                EzValidation.PASSWORD_VALIDATION_ERROR)
            : new EzValidationResponse(
                EzValidationResponseStatus.VALID,
                'Password is valid');
    }

    /**
     * @public @method
     * Validates a legacy password (prior to the length increase to 8)
     * meets the required criteria. Response errorCode is zero if the password is valid.
     * @param {String} password
     * @param {boolean|null} errorOnEmpty
     * @returns {EzValidationResponse}
     */
    ezValidateLegacyPassword(password, errorOnEmpty) {
        if (!EzBoolean.isTrue(errorOnEmpty) && !EzString.hasLength(password)) {
            return new EzValidationResponse(
                EzValidationResponseStatus.VALID,
                'Empty password is valid');
        }

        return !EzString.hasLength(password) ||
            4 > password.length ||
            EzValidation.ezInstance.MAXIMUM_EZCLOCKER_PASSWORD_LENGTH < password.length
            ? new EzValidationResponse(
                EzValidationResponseStatus.ERROR,
                EzValidation.PASSWORD_VALIDATION_ERROR)
            : new EzValidationResponse(
                EzValidationResponseStatus.VALID,
                'Password is valid');
    }

    /**
     * @public @method
     * Validates the value of a password input editor.
     * @param {String} inputId
     * @param {String|null} errorMessageBoxId
     * @param {String|null} warningMessageBoxId
     * @param {boolean|null} errorOnEmpty
     * @returns {EzValidationResponse}
     */
    ezValidatePasswordInput(inputId, errorMessageBoxId, warningMessageBoxId, errorOnEmpty) {
        let vResponse = EzValidation.ezInstance.ezValidatePassword(
            ezApi.ezclocker.ezUi.ezGetInputValue(inputId),
            EzBoolean.isTrue(errorOnEmpty));

        return EzValidation.ezInstance.ezProcessInputValidationResult(vResponse, inputId, errorMessageBoxId, warningMessageBoxId);
    }

    /**
     * @public @method
     * Validates an account user name.
     * @param {String} username
     * @param {boolean|null} errorOnEmpty
     * @returns {EzValidationResponse}
     */
    ezValidateUsername(username, errorOnEmpty) {
        if (EzBoolean.isTrue(errorOnEmpty) && !EzString.hasLength(username)) {
            return new EzValidationResponse(
                EzValidationResponseStatus.ERROR,
                'Please enter a valid user name.');
        }

        if (-1 != username.indexOf('@')) {
            return EzValidation.ezInstance.ezValidateEmailAddress(username);
        }

        return new EzValidationResponse(
            EzValidationResponseStatus.VALID,
            'Username is valid');
    }

    /**
     * @public @method
     * Validates the value of a username input editor.
     * @param {String} inputId
     * @param {String|null} errorMessageBoxId
     * @param {String|null} warningMessageBoxId
     * @param {boolean|null} errorOnEmpty
     * @returns {EzValidationResponse}
     */
    ezValidateUsernameInput(inputId, errorMessageBoxId, warningMessageBoxId, errorOnEmpty) {
        let vResponse = EzValidation.ezInstance.ezValidateUsername(
            ezApi.ezclocker.ezUi.ezGetInputValue(inputId),
            EzBoolean.isTrue(errorOnEmpty));

        return EzValidation.ezInstance.ezProcessInputValidationResult(vResponse, inputId, errorMessageBoxId, warningMessageBoxId);
    }

    /**
     * @public @method
     * Validates an employee role selection
     * @param {string} inputId
     * @param {string} errorMessageBoxId
     * @param {string} warningMessageBoxId
     * @param {boolean|null} errorOnEmpty
     * @returns {EzValidationResponse}
     */
    ezValidateEmployeeRoleSelectInput(inputId, errorMessageBoxId, warningMessageBoxId, errorOnEmpty) {
        let vResponse = EzValidation.ezInstance.ezValidateEmployeeRoleSelect(
            ezApi.ezclocker.ezUi.ezGetInputValue(inputId),
            EzBoolean.isTrue(errorOnEmpty));

        return EzValidation.ezInstance.ezProcessInputValidationResult(
            vResponse,
            inputId,
            errorMessageBoxId,
            warningMessageBoxId);
    }

    /**
     * @public @method
     * Validates an employee role selection
     * @param {string} selectedRole
     * @param {boolean|null} errorOnEmpty
     * @returns {EzValidationResponse}
     */
    ezValidateEmployeeRoleSelect(selectedRole, errorOnEmpty) {
        if (!EzBoolean.isTrue(errorOnEmpty) && !EzString.hasLength(selectedRole)) {
            return new EzValidationResponse(
                EzValidationResponseStatus.ERROR,
                'Valid employee role selection is required.');
        }

        return new EzValidationResponse(
            EzValidationResponseStatus.VALID,
            'Selected role is valid.');
    }

    /**
     * @public @method
     * Evalutes to determine if the provided string is a valid email address or not.
     * Optionally, pass true for errorOnEmpty to generate an error message if the provided
     * emailAddress is empty or null.
     * @param {String} emailAddress
     * @param {boolean|null|undefined} errorOnEmpty
     * @returns {Object}
     */
    ezValidateEmailAddress(emailAddress, errorOnEmpty) {
        // Make sure it is lower case
        emailAddress = ezApi.ezStringOrEmpty(emailAddress)
            .trim()
            .toLowerCase();

        if (EzBoolean.isTrue(errorOnEmpty) && !EzString.hasLength(emailAddress)) {
            return !EzBoolean.isTrue(errorOnEmpty)
                ? new EzValidationResponse(
                    EzValidationResponseStatus.VALID,
                    'Email address is valid.')
                : new EzValidationResponse(
                    EzValidationResponseStatus.ERROR,
                    'A valid email address is required.');
        }

        if (EzString.hasLength(emailAddress)) {
            if (320 < emailAddress.length) {
                return new EzValidationResponse(
                    EzValidationResponseStatus.ERROR,
                    'Valid email addresses must have no more than 320 characters (including the @ symbol)');
            }

            if (0 <= emailAddress.indexOf(' ')) {
                return new EzValidationResponse(
                    EzValidationResponseStatus.ERROR,
                    'Valid email addresses can not have a space.');
            }

            let eaParts = emailAddress.split('@');
            if (2 != eaParts.length) {
                return new EzValidationResponse(
                    EzValidationResponseStatus.ERROR,
                    'Valid email addresses must contain the @ symbol.');
            }

            if (0 == eaParts[0].length || 64 < eaParts[0].length) {
                return new EzValidationResponse(
                    EzValidationResponseStatus.ERROR,
                    'Valid email addresses can only have up to 64 characters before the @ symbol.');
            }

            if (0 == eaParts[1].length || 255 < eaParts[1].length) {
                return new EzValidationResponse(
                    EzValidationResponseStatus.ERROR,
                    'Valid email addresses must have between one and 255 characters after the @ symbol.');
            }

            if (!EzValidation.EMAIL_VALIDATE_RFC2822.test(emailAddress)) {
                return new EzValidationResponse(
                    EzValidationResponseStatus.ERROR,
                    'Please enter a valid email address.');
            }

            for (let countryId of EzValidation.ezInstance.ezUnsupportedEmailCountries) {
                if (emailAddress.toLowerCase().endsWith(countryId)) {
                    let em = `EzClocker does not allow using email addreses from ${eaParts[1]} as your user name.`;
                    return new EzValidationResponse(
                        EzValidationResponseStatus.ERROR_UNSUPPORTED,
                        em,
                        ezApi.ezTemplate`
                            <p>
                                ${em}
                                Please use an alternate email address to sign up for ezClocker.
                            </p>
                            <p>
                                If you need to create a new email address to use with ezClocker we recommend using one
                                of the following email providers:
                                <ul>
                                    <li>
                                        <a href="https://mail.google.com" target="mail.google.com">
                                            Google Gmail at https://mail.google.com
                                        </a>
                                    </li>
                                    <li>
                                        <a href="https://www.zoho.com/mail/" target="mail.zoho.com">
                                            Zoho Mail at https://www.zoho.com/mail
                                        </a>
                                    </li>
                                    <li>
                                        <a href="https://outlook.live.com" target="outlook.live.com">
                                            Microsoft Outlook at https://outlook.live.com
                                        </a>
                                    </li>
                                    <li>
                                        <a href="https://mail.yahoo.com" target="mail.yahoo.com">
                                            Yahoo Mail at https://mail.yahoo.com
                                        </a>
                                    </li>
                                </ul>
                            </p>`);
                }
            }
        }

        return new EzValidationResponse(
            EzValidationResponseStatus.VALID,
            'Email address is valid.');
    }

    /**
     * @public @method
     * Validates the value of an email address input editor.
     * @param {String} inputId
     * @param {String|null} errorMessageBoxId
     * @param {String|null} warningMessageBoxId
     * @param {boolean|null} errorOnEmpty
     * @returns {EzValidationResponse}
     */
    ezValidateEmailAddressInput(inputId, errorMessageBoxId, warningMessageBoxId, errorOnEmpty) {
        let vResponse = EzValidation.ezInstance.ezValidateEmailAddress(
            ezApi.ezclocker.ezUi.ezGetInputValue(inputId),
            EzBoolean.isTrue(errorOnEmpty));

        return EzValidation.ezInstance.ezProcessInputValidationResult(vResponse, inputId, errorMessageBoxId, warningMessageBoxId);
    }

    /**
     * @public @method
     * Evalutes to determine if the provided string is a valid email address or not.
     * @param {String} phoneNumber
     * @param {boolean|null} forSendingSMS
     * @param {boolean|null} errorOnEmpty
     * @returns {Object}
     */
    ezValidatePhoneNumber(phoneNumber, forSendingSMS, errorOnEmpty) {
        if (EzBoolean.isFalse(errorOnEmpty) && !EzString.hasLength(phoneNumber)) {
            return new EzValidationResponse(
                EzValidationResponseStatus.VALID,
                'Empty password is valid.');
        }

        if (EzString.hasLength(phoneNumber) &&
            !ezApi.ezclocker.ezFormat.ezIsUSPhoneNumber(phoneNumber)) {
            return new EzValidationResponse(
                EzValidationResponseStatus.ERROR,
                'Please verify the phone number is correct.');
        }

        if (EzBoolean.isTrue(forSendingSMS) && !EzString.hasLength(phoneNumber.trim())) {
            return new EzValidationResponse(
                EzValidationResponseStatus.ERROR,
                'You must enter a phone number if you want to send messages via text');
        }

        if (EzBoolean.isTrue(errorOnEmpty) && !EzString.hasLength(phoneNumber.trim())) {
            return new EzValidationResponse(
                EzValidationResponseStatus.ERROR,
                'Please enter a valid phone number.');
        }

        return new EzValidationResponse(
            EzValidationResponseStatus.VALID,
            EzValidation.ezInstance.PASSWORD_VALID);
    }

    /**
     * @public @method
     * Validates the value of an email address input editor.
     * @param {String} inputId
     * @param {boolean|null} forSendingSMS
     * @param {String|null} errorMessageBoxId
     * @param {String|null} warningMessageBoxId
     * @param {boolean|null} errorOnEmpty
     * @returns {EzValidationResponse}
     */
    ezValidatePhoneNumberInput(inputId, forSendingSMS, errorMessageBoxId, warningMessageBoxId, errorOnEmpty) {
        let vResponse = EzValidation.ezInstance.ezValidatePhoneNumber(
            ezApi.ezclocker.ezUi.ezGetInputValue(inputId),
            EzBoolean.isTrue(forSendingSMS),
            EzBoolean.isTrue(errorOnEmpty));

        return EzValidation.ezInstance.ezProcessInputValidationResult(vResponse, inputId, errorMessageBoxId, warningMessageBoxId);
    }

    /**
     * @public @method
     * Validates a hourly rate input box value
     * @param {string} inputId
     * @param {string} errorMessageBoxId
     * @param {string} warningMessageBoxId
     * @param {boolean|null|undefined} errorOnEmpty
     * @returns {EzValidationResponseStatus}
     */
    ezValidateHourlyRateInput(inputId, errorMessageBoxId, warningMessageBoxId, errorOnEmpty) {
        let vResponse = EzValidation.ezInstance.ezValidateHourlyRate(
            ezApi.ezclocker.ezUi.ezGetInputValue(inputId),
            EzBoolean.isTrue(errorOnEmpty));

        return EzValidation.ezInstance.ezProcessInputValidationResult(vResponse, inputId, errorMessageBoxId, warningMessageBoxId);
    }

    /**
     * @public @method
     * Validates the provided hourly rate
     * @param {string} hourlyRate
     * @param {boolean|null|undefined} errorOnEmpty
     * @returns {EzValidationResponseStatus}
     */
    ezValidateHourlyRate(hourlyRate, errorOnEmpty) {
        if (EzBoolean.isFalse(errorOnEmpty) && !EzString.hasLength(hourlyRate)) {
            return new EzValidationResponse(
                EzValidationResponseStatus.VALID,
                'Empty hourly rate is valid.');
        }

        if (hourlyRate && 0 > hourlyRate) {
            return new EzValidationResponse(
                EzValidationResponseStatus.ERROR,
                'Hourly Rate must be more than 0.');
        }

        return new EzValidationResponse(
            EzValidationResponseStatus.VALID,
            'Hourly Rate is valid.');
    }

    /**
     * @public @method
     * Validates the new password and verifies it equals the confirmPassword value.
     * @param {String} password
     * @param {String} confirmPassword
     * @returns {Object}
     */
    validateResetPasswords(newPassword, confirmPassword) {
        let vResponse = EzValidation.ezInstance.ezValidatePassword(newPassword);

        if (EzValidationResponseStatus.ERROR === vResponse.ezGetStatus()) {
            return vResponse;
        }

        if (confirmPassword !== newPassword) {
            return new EzValidationResponse(
                EzValidationResponseStatus.ERROR,
                'The new password does not match the confirmation password.');
        }

        return new EzValidationResponse(
            EzValidationResponseStatus.VALID,
            'Reset passwords valid');
    }

    /**
     * @public @method
     * Validates the value of an email address input editor.
     * @param {String} inputId
     * @param {String|null} errorMessageBoxId
     * @param {String|null} warningMessageBoxId
     * @returns {EzValidationResponse}
     */
    ezValidateResetPasswordInputs(newPWInputId, confirmPWInputId, errorMessageBoxId, warningMessageBoxId) {
        let vResponse = EzValidation.ezInstance.ezValidatePassword(
            ezApi.ezclocker.ezUi.ezGetInputValue(newPWInputId),
            true);

        if (EzValidationResponseStatus.ERROR === vResponse.ezGetStatus()) {
            return EzValidation.ezInstance.ezProcessInputValidationResult(vResponse, newPWInputId, errorMessageBoxId, warningMessageBoxId);
        }

        vResponse = EzValidation.ezInstance.ezValidatePassword(
            ezApi.ezclocker.ezUi.ezGetInputValue(confirmPWInputId),
            true);

        if (EzValidationResponseStatus.ERROR === vResponse.ezGetStatus()) {
            return EzValidation.ezInstance.ezProcessInputValidationResult(vResponse, confirmPWInputId, errorMessageBoxId, warningMessageBoxId);
        }

        vResponse = EzValidation.ezInstance.validateResetPasswords(
            ezApi.ezclocker.ezUi.ezGetInputValue(newPWInputId),
            ezApi.ezclocker.ezUi.ezGetInputValue(confirmPWInputId));

        return EzValidation.ezInstance.ezProcessInputValidationResult(vResponse, newPWInputId, errorMessageBoxId, warningMessageBoxId);
    }

    /**
     * @public @method
     * Validates if the stringValue has min length and is less than max length
     * @param {String|null} stringValue
     * @param {Number} min
     * @param {Number} max
     * @returns {Boolean}
     */
    ezValidateStringLength(stringValue, min, max) {
        if (!EzString.isString(stringValue)) {
            throw new EzBadParamException(
                'stringValue',
                EzValidation.ezInstance,
                EzValidation.ezInstance.ezValidateStringLength);
        }
        if (!EzNumber.isNumber(min)) {
            throw new EzBadParamException(
                'min',
                EzValidation.ezInstance,
                EzValidation.ezInstance.ezValidateStringLength);
        }
        if (!EzNumber.isNumber(max)) {
            throw new EzBadParamException(
                'max',
                EzValidation.ezInstance,
                EzValidation.ezInstance.ezValidateStringLength);
        }

        let utf8EncodedLength = new TextEncoder().encode(stringValue).length;

        return max > utf8EncodedLength && min < utf8EncodedLength;
    }

    /**
     * @public @method
     * Validates if the stringValue has min length and is less than max length
     * @param {String|null} stringValue
     * @param {Number} minCharLength
     * @param {Number} maxCharLength
     * @returns {Boolean}
     */
    ezValidateStringByteSize(stringValue, minCharLength, maxCharLength) {
        if (!EzString.isString(stringValue)) {
            throw new EzBadParamException(
                'stringValue',
                EzValidation.ezInstance,
                EzValidation.ezInstance.ezValidateStringLength);
        }

        if (!EzNumber.isNumber(minCharLength)) {
            minCharLength = 0;
        }

        if (!EzNumber.isNumber(maxCharLength)) {
            maxCharLength = minCharLength + 256; // default length
        }

        let bytesPerCharacter = new TextEncoder().encode('W').length;

        let minByteLength = minCharLength * bytesPerCharacter;

        let maxByteLength = maxCharLength * bytesPerCharacter;

        let utf8EncodedLength = new TextEncoder().encode(stringValue).length;

        let displayStringLength = 0 != utf8EncodedLength
            ? utf8EncodedLength / bytesPerCharacter
            : 0;

        if (maxByteLength < utf8EncodedLength) {
            return new EzValidationResponse(
                EzValidationResponseStatus.ERROR,
                ezApi.ezEM`
                    The entered text has a length of ${displayStringLength} characters. The maximum number of
                    characters you may enter is ${maxCharLength}.`,
                null,
                'MAXIMUM_LENGTH_EXCEEDED');
        }

        if (minByteLength > utf8EncodedLength) {
            return new EzValidationResponse(
                EzValidationResponseStatus.ERROR,
                `You must enter a minimum of ${minCharLength} characters.`,
                null,
                'MINIMUM_LENGTH_NOT_MET');
        }

        return new EzValidationResponse(
            EzValidationResponseStatus.VALID,
            ezApi.ezMsg`
                The entered text character count is greater than or equal to ${minCharLength}
                and less than or equal to ${maxCharLength}.`,
            null,
            'VALID');
    }

    /**
     * @public @method
     * Returns true if current >= minimum. Will return false if either params are not numbers.
     * @param {Number} current
     * @param {Number} minimum
     * @returns {Boolean}
     */
    ezValidateMinValue(current, minimum) {
        if (!EzNumber.isNumber(current)) {
            throw new EzBadParamException(
                'current',
                EzValidation.ezInstance,
                EzValidation.ezInstance.ezValidateMinValue);
        }
        if (!EzNumber.isNumber(minimum)) {
            throw new EzBadParamException(
                'minimum',
                EzValidation.ezInstance,
                EzValidation.ezInstance.ezValidateMinValue);
        }

        return current >= minimum
            ? new EzValidationResponse(
                EzValidationResponseStatus.VALID,
                'Value is within the minimum')
            : new EzValidationResponse(
                EzValidationResponseStatus.ERROR,
                `Enter a value greater than or equal to ${minimum}.`);
    }

    /**
     * @public @method
     * Returns true if current <= maximum. Returns false if either params are not numbers.
     * @param {Number} current
     * @param {Number} maximum
     * @returns {Boolean}
     */
    ezValidateMaxValue(current, maximum) {
        if (!EzNumber.isNumber(current)) {
            throw new EzBadParamException(
                'current',
                EzValidation.ezInstance,
                EzValidation.ezInstance.ezValidateMaxValue);
        }
        if (!EzNumber.isNumber(maximum)) {
            throw new EzBadParamException(
                'maximum',
                EzValidation.ezInstance,
                EzValidation.ezInstance.ezValidateMaxValue);
        }

        return current <= maximum
            ? new EzValidationResponse(
                EzValidationResponseStatus.VALID,
                'Value is within the minimum')
            : new EzValidationResponse(
                EzValidationResponseStatus.ERROR,
                ezApi.ezEM`Enter a value less than or equal to ${maximum}.`);
    }

    /**
     * @public @method
     * Determinse if the provided phone number matches one of the following formats:
     *     +1 (555) 555-5555
     *     (555) 555-5555
     * @param {String} phoneNumber
     * @returns {Boolean}
     */
    ezIsUSPhoneNumber(phoneNumber) {
        let matched = EzValidation.FORMATTED_US_PHONE_NUMBER_REGEX.exec(phoneNumber);

        if (EzObject.isValid(matched) && 5 == matched.length) {
            return true;
        }

        matched = EzValidation.BASIC_FORMATTED_US_PHONE_NUMBER_REGEX.exec(phoneNumber);

        return EzObject.isValid(matched) && 4 == matched.length;
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
        return 'ezValidation';
    }

    /**
     * @static
     * @public @readonly @property
     * @returns {object}
     */
    static ezEventNames() {
        return {
            onReady: 'ezOn_EzValidation_Ready'
        };
    }

    /**
     * @static
     * @private @field
     * Stores the singleton instance of this class that was created by and registerd with EzApi.
     * @type {EzValidation}
     */
    static #ezInstance = globalThis?.ezApi?.ready && globalThis.ezApi?.ezclocker?.[EzValidation.ezApiName]
        ? globalThis.ezApi.ezclocker[EzValidation.ezApiName]
        : null;
    /**
     * @static
     * @public @property @getter
     * Returns the singleton instance of this class that is registered with EzApi (if available yet)
     * @returns {EzValidation}
     */
    static get ezInstance() {
        return EzValidation.#ezInstance;
    }
    /**
     * @static
     * @public @property @setter
     * Sets the singleton instance of of this class that is registered with EzApi.
     * @param {EzValidation} instance
     */
    static set ezInstance(instance) {
        if (null != EzValidation.#ezInstance) {
            throw new Error('EzValidation\'s singleton instance is already reigstered with EzApi.');
        }

        EzValidation.#ezInstance = instance;
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
    static #ezApiRegistrationState = globalThis?.ezApi?.ready && globalThis.ezApi?.ezclocker?.[EzValidation.ezApiName]
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
        return EzValidation.#ezApiRegistrationState;
    }
    /**
     * @static
     * @public @property @setter
     * Sets the ezApi registration state of this classes's singleton instance.
     * @param {string} ezApiRegistrationState
     * A valid enum property value from EzRegistrationState
     */
    static set ezApiRegistrationState(ezApiRegistrationState) {
        EzValidation.#ezApiRegistrationState = EzRegistrationState.ezValueOf(ezApiRegistrationState);
    }

    /** SA
     * @static
     * @private @readonly @property
     * Returns true when all required dependencies for this class report ready.
     * In otherwords, the require dependency's singleton instance is created
     * and is registered with and accessable from EzApi with ezApi.ezclocker.{dependency_name}.
     * @returns {boolean}
     */
    static get #ezCanRegister() {
        return 'PENDING' === EzValidation.ezApiRegistrationState &&
            globalThis?.ezApi?.ready &&
            globalThis.ezApi?.ezclocker?.[EzUI.ezApiName]?.ready;
    }

    /**
     * @static
     * @private @readonly @property
     * Returns if this class's singleton instance is registered with ezApi yet.
     * @returns {boolean}
     */
    static get #ezIsRegistered() {
        return null != EzValidation.ezInstance &&
            EzRegistrationState.REGISTERED === EzValidation.ezApiRegistrationState;
    }

    /**
     * @static
     * @private @method
     * Attempts to register the singleton instance for this class with ezApi. Returns true
     * if successful, false otherwise.
     * @returns {boolean}
     */
    static #ezRegistrator() {
        if (EzValidation.#ezCanRegister && !EzValidation.#ezIsRegistered) {
            globalThis.ezApi.ezRegisterNewApi(EzValidation, EzValidation.ezApiName);
        }

        return EzValidation.#ezIsRegistered;
    }

    /**
     * @static
     * Static Initialization
     * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
     * >> IMPORTANT <<
     * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
     * Make sure the following properties and methods get defined BEFORE this static initialization section:
     *      1) Property getter EzValidation.ezApiName
     *      2) Property getter EzValidation.ezEventNames
     *      3) Property getter EzValidation.ezInstance
     *      4) Property setter EzValidation.ezInstance
     *      5) Property getter EzValidation.ezApiRegistrationState
     *      6) Property setter EzValidation.ezApiRegistrationState
     *      7) Property getter EzValidation.#ezCanRegister
     *      8) Property getter EzValidation.#ezIsRegistered
     *      9) Method EzValidation.#ezRegistrator()
     */
    static {
        if (null == EzValidation.ezApiRegistrationState) {
            EzValidation.ezApiRegistrationState = EzRegistrationState.PENDING;

            if (!EzValidation.#ezRegistrator()) {
                document.addEventListener(
                    EzValidation.ezOnEzApiReadyEventName,
                    EzValidation.#ezRegistrator);

                document.addEventListener(
                    EzUI.ezEventNames.onReady,
                    EzValidation.#ezRegistrator);
            }
        }
    }
    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    // NO CODE AFTER THIS SECTION
    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
}
