import {
    EzObject,
    EzBoolean,
    EzNumber,
    EzString,
    EzHtml,
    EzJson
} from '/ezlibrary/helpers/EzHelpers.js';

import {
    EzRegistrationState,
    EzAmplitudeIntegrationEventId,
    EzElementEventName
} from '/ezlibrary/enums/EzEnumerations.js';

import { EzClass } from '/ezlibrary/EzClass.js';

import { EzEventEngine } from '/ezlibrary/ez-event-engine.js';

import { EzHttpHelper } from '/public/javascript/common/ezclocker-http-helper.js';
import { EzNavigation } from '/public/javascript/common/ezclocker-navigation-helper.js';
import { EzUrlHelper } from '/public/javascript/common/ezclocker-url-helper2.js';

import { EzVersion } from '/ezlibrary/EzVersion.js'

import { EzAnalyticsAndMetrics } from '/ezlibrary/analytics_metrics/EzAnalyticsAndMetrics.js';

import { EzValidationResponseStatus } from '/ezlibrary/EzValidationResponse.js';

import { EzUserRole } from '/ezlibrary/EzUserRole.js';

import { EzUI } from '/public/javascript/common/ezui.js';

import { EzValidation } from '/public/javascript/common/ez-validation.js';

import { EzAnimator } from '/ezlibrary/ez-animator.js';


/**
 * EzClocker's main sign-up dialog
 */
export class EzSignUp extends EzClass {
    /**
        @static
        @public @readonly @property
        Returns the name of this class's singleton instance when registered with ezApi.
        @returns {string}
     */
    static get ezApiName() {
        return 'ezSignUp';
    }

    /**
        @static
        @public @readonly @property
        Returns an object of event names that this class may trigger.
        @returns {object}
     */
    static get ezEventNames() {
        return {
            onReady: 'ezOn_EzSignUp_Ready'
        };
    }

    /**
        @static
        @private @field
        Stores the singleton instance of this class that was created by and registerd with EzApi.
        @type {EzSignUp}
     */
    static #ezInstance = EzObject.hasProperty(globalThis, 'ezApi') &&
        EzObject.isValid(globalThis.ezApi) && EzBoolean.isTrue(globalThis.ezApi.ready) &&
        EzObject.isValid(globalThis.ezApi.ezclocker[EzSignUp.ezApiName])
        ? globalThis.ezApi.ezclocker[EzSignUp.ezApiName]
        : null;

    /**
        @static
        @public @property @getter
        Returns the singleton instance of this class that is registered with EzApi (if available yet)
        @returns {EzSignUp}
     */
    static get ezInstance() {
        return EzSignUp.#ezInstance;
    }

    /**
        @static
        @public @property @setter
        Sets the singleton instance of of this class that is registered with EzApi.
        @param {EzSignUp} instance
     */
    static set ezInstance(instance) {
        if (null != EzSignUp.#ezInstance) {
            throw new Error('EzSignUp\'s singleton instance is already reigstered with EzApi.');
        }

        EzSignUp.#ezInstance = instance;
    }

    /**
        @static
        @private @field
        Stores the EzApi registration state for this class.
        Default value is NULL
        Class is registerd with EzApi when value is EzRegistrationState.REGISTERED
        @type {string}
        A valid enum property value from EzRegistrationState
     */
    static #ezApiRegistrationState = EzObject.hasProperty(globalThis, 'ezApi') &&
        EzObject.isValid(globalThis.ezApi) && EzBoolean.isTrue(globalThis.ezApi.ready) &&
        EzObject.isValid(globalThis.ezApi.ezclocker[EzSignUp.ezApiName])
        ? EzRegistrationState.REGISTERED
        : null;

    /**
        @static
        @public @property @getter
        Returns the ezApi registration state of this classes's singleton instance.
        @returns {string}
        A valid enum property value from EzRegistrationState
     */
    static get ezApiRegistrationState() {
        return EzSignUp.#ezApiRegistrationState;
    }

    /**
        @static
        @public @property @setter
        Sets the ezApi registration state of this classes's singleton instance.
        @param {string} ezApiRegistrationState
        A valid enum property value from EzRegistrationState
     */
    static set ezApiRegistrationState(ezApiRegistrationState) {
        EzSignUp.#ezApiRegistrationState = EzRegistrationState.ezValueOf(ezApiRegistrationState);
    }

    /**
        @static
        @private @readonly @property
        Returns true when all required dependencies for this class report ready.
        In otherwords, the require dependency's singleton instance is created
        and is registered with and accessable from EzApi with ezApi.ezclocker.{dependency_name}.
        @returns {boolean}
     */
    static get #ezCanRegister() {
        return EzRegistrationState.PENDING === EzSignUp.ezApiRegistrationState &&
            EzObject.hasProperty(globalThis, 'ezApi') &&
            EzObject.isValid(globalThis.ezApi) && EzBoolean.isTrue(globalThis.ezApi.ready) &&

            globalThis.ezApi.ezclocker[EzEventEngine.ezApiName] &&
            globalThis.ezApi.ezclocker[EzEventEngine.ezApiName].ready &&

            globalThis.ezApi.ezclocker[EzHttpHelper.ezApiName] &&
            globalThis.ezApi.ezclocker[EzHttpHelper.ezApiName].ready &&

            globalThis.ezApi.ezclocker[EzNavigation.ezApiName] &&
            globalThis.ezApi.ezclocker[EzNavigation.ezApiName].ready &&

            globalThis.ezApi.ezclocker[EzUrlHelper.ezApiName] &&
            globalThis.ezApi.ezclocker[EzUrlHelper.ezApiName].ready &&

            globalThis.ezApi.ezclocker[EzVersion.ezApiName] &&
            globalThis.ezApi.ezclocker[EzVersion.ezApiName].ready &&

            globalThis.ezApi.ezclocker[EzAnalyticsAndMetrics.ezApiName] &&
            globalThis.ezApi.ezclocker[EzAnalyticsAndMetrics.ezApiName].ready &&

            globalThis.ezApi.ezclocker[EzUI.ezApiName] &&
            globalThis.ezApi.ezclocker[EzUI.ezApiName].ready &&

            globalThis.ezApi.ezclocker[EzAnimator.ezApiName] &&
            globalThis.ezApi.ezclocker[EzAnimator.ezApiName].ready &&

            globalThis.ezApi.ezclocker[EzValidation.ezApiName] &&
            globalThis.ezApi.ezclocker[EzValidation.ezApiName].ready;
    }

    /**
        @static
        @private @readonly @property
        Returns if this class's singleton instance is registered with ezApi yet.
        @returns {boolean}
     */
    static get #ezIsRegistered() {
        return null != EzSignUp.ezInstance &&
            EzRegistrationState.REGISTERED === EzSignUp.ezApiRegistrationState;
    }

    /**
        @static
        @private @method
        Attempts to register the singleton instance for this class with ezApi. Returns true
        if successful, false otherwise.
        @returns {boolean}
     */
    static #ezRegistrator() {
        if (EzSignUp.#ezCanRegister && !EzSignUp.#ezIsRegistered) {
            globalThis.ezApi.ezRegisterNewApi(EzSignUp, EzSignUp.ezApiName);
        }

        return EzSignUp.#ezIsRegistered;
    }

    /**
        @static
        Static Initialization
        ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        >> IMPORTANT <<
        ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        Make sure the following properties and methods get defined BEFORE this static initialization section:
            1) Property getter EzSignUp.ezApiName
            2) Property getter EzSignUp.ezEventNames
            3) Property getter EzSignUp.ezInstance
            4) Property setter EzSignUp.ezInstance
            5) Property getter EzSignUp.ezApiRegistrationState
            6) Property setter EzSignUp.ezApiRegistrationState
            7) Property getter EzSignUp.#ezCanRegister
            8) Property getter EzSignUp.#ezIsRegistered
            9) Method EzSignUp.#ezRegistrator()
     */
    static {
        if (!EzSignUp.#ezIsRegistered) {
            EzSignUp.ezApiRegistrationState = EzRegistrationState.PENDING;

            if (!EzSignUp.#ezRegistrator()) {
                document.addEventListener(
                    EzSignUp.ezOnEzApiReadyEventName,
                    EzSignUp.#ezRegistrator);

                document.addEventListener(
                    EzEventEngine.ezEventNames.onReady,
                    EzSignUp.#ezRegistrator);

                document.addEventListener(
                    EzHttpHelper.ezEventNames.onReady,
                    EzSignUp.#ezRegistrator);

                document.addEventListener(
                    EzNavigation.ezEventNames.onReady,
                    EzSignUp.#ezRegistrator);

                document.addEventListener(
                    EzUrlHelper.ezEventNames.onReady,
                    EzSignUp.#ezRegistrator);

                document.addEventListener(
                    EzVersion.ezEventNames.onReady,
                    EzSignUp.#ezRegistrator);

                document.addEventListener(
                    EzAnalyticsAndMetrics.ezEventNames.onReady,
                    EzSignUp.ezRegistrator);

                document.addEventListener(
                    EzUI.ezEventNames.onReady,
                    EzSignUp.#ezRegistrator);

                document.addEventListener(
                    EzValidation.ezEventNames.onReady,
                    EzSignUp.#ezRegistrator);

                document.addEventListener(
                    EzAnimator.ezEventNames.onReady,
                    EzSignUp.ezRegistrator);
            }
        }
    }

    /**
        @public @readonly @property
        Returns the trimmed value in the company name input box
        @returns {string}
     */
    get ezCompanyName() {
        let companyName = ezApi.ezclocker.ezUi.ezGetInputValue('ez_companyName');

        return ezApi.ezStringHasLength(companyName)
            ? companyName.trim()
            : companyName;
    }

    /**
        @public @readonly @property
        Returns the trimmed value in the user name input box
        @returns {string}
     */
    get ezUsername() {
        let username = ezApi.ezclocker.ezUi.ezGetInputValue('ez_userName');

        return ezApi.ezStringHasLength(username)
            ? username.trim()
            : username;
    }

    /**
        @public @readonly @property
        Returns the trimmed value in the password input box
        @returns {string}
     */
    get ezPassword() {
        let password = ezApi.ezclocker.ezUi.ezGetInputValue('ez_password');

        return ezApi.ezStringHasLength(password)
            ? password.trim()
            : password;
    }

    /**
        @protected @method
        Initializes EzSignUp
        @returns {EzSignUp}
     */
    ezInit() {
        let mobilePagePath = ezApi.ezclocker.nav.ezRemoveVersionFromUri(
            `p/download${ezApi.ezclocker.ezUrlHelper.ezGetWindowLocationSearch()}`);

        if (ezApi.ezclocker.ezBrowserInfo.ezRedirectIfMobilePhone(mobilePagePath)) {
            ezApi.ezclocker.ezUi.ezHideElement('body');
            return;
        }

        EzSignUp.ezInstance.ezInitUX();

        return EzSignUp.ezInstance;
    }

    /**
        @protected @method
        Initializes EzSignUp
     */
    ezInitUX() {
        ezApi.ezclocker.ezUi.ezHide('signUpError');

        ezApi.ezclocker.ezEventEngine.ezWantElementEvent(
            '_signUpContainer',
            EzElementEventName.KEY_PRESS,
            EzSignUp.ezApiName,
            EzSignUp.ezInstance.ezHandleEnterKeyPress);

        ezApi.ezclocker.ezUi.ezSetInputValue(
            'ez_userName',
            ezApi.ezclocker.ezUrlHelper.getEmailParam());
            
        ezApi.ezclocker.ezUi.ezSetInputValue(
            'ez_userName',
            ezApi.ezclocker.ezUrlHelper.getIndustryParam());

        ezApi.ezclocker.ezUi.ezFocus('ez_companyName');

       ezApi.ezclocker.ezEventEngine.ezWantElementEvent(
            'EzSignUpButton',
            EzElementEventName.CLICK,
            EzSignUp.ezApiName,
            EzSignUp.ezInstance.ezQuickSignUpFormSubmit);

        ezApi.ezclocker.ezEventEngine.ezWantElementEvent(
            'EzCancelSignUpButton',
            EzElementEventName.CLICK,
            EzSignUp.ezApiName,
            ezApi.ezclocker.ezNavigation.ezNavigateToMain);

        ezApi.ezclocker.ezAnimator.ezApplyRipple(
            'EzSignUpButton',
            'ez-action-ripple');

        ezApi.ezclocker.ezAnimator.ezApplyRipple(
            'EzCancelSignUpButton',
            'ez-major-ripple');
    }

    /**
        @protected
        Handles enter key submission
        @param {object} event
     */
    ezHandleEnterKeyPress(event) {
        if (13 == event.keyCode) {
            EzSignUp.ezInstance.ezQuickSignUpFormSubmit();
        }
    }

    /**
        @protected @method
        Validates the signup entries
     */
    ezValidateLandingSignup() {
        if (ezApi.ezStringHasLength(EzSignUp.ezInstance.ezCompanyName) &&
            ezApi.ezStringHasLength(EzSignUp.ezInstance.ezUsername) &&
            ezApi.ezStringHasLength(EzSignUp.ezInstance.ezPassword)) {
            ezApi.ezclocker.ezSignUpNowFold.ezHideErrorMessages();
        }
    }

    /**
        @protected @method
        Hides any visible error messages
     */
    ezHideErrorMessages() {
        ezApi.ezclocker.ezUi.ezHideElement('signUpError');
    }

    /**
        @protected @method
        Shows the error message box
        @param {String} message
     */
    ezShowErrorMessage(message) {
        ezApi.ezclocker.ezUi.ezShowElement('signUpError');

        ezApi.ezclocker.ezUi.ezContent('signUpError', message);
    }

    /**
        @protected @method
        Validates the signup data during submission
     */
    ezValidateSignupSubmit() {
        EzSignUp.ezInstance.ezHideErrorMessages();

        let username = EzSignUp.ezInstance.ezUsername;

        let password = EzSignUp.ezInstance.ezPassword;

        let vResult = ezApi.ezclocker.ezValidation.ezValidateEmailAddress(username);

        if (0 != vResult.errorCode) {
            if (EzValidationResponseStatus.ezToErrorCode(EzValidationResponseStatus.ERROR_UNSUPPORTED) == vResult.errorCode) {
                // Unsupported email domain error
                ezApi.ezclocker.ezDialog.ezShowErrorDialog(
                    'Unsupported Email',
                    EzHtml.build`
                            <p>
                                ${vResult.message}
                                Please use an alternate email address to sign up for ezClocker.
                            </p>
                            <p>
                                If you need to create a new email address to use with ezClocker we recommend using one
                                of the following email providers:
                                <ul>
                                    <li>
                                        <a href="https://mail.google.com" target="mail.google.com">
                                            Google Gmail (https://mail.google.com)
                                        </a>
                                    </li>
                                    <li>
                                        <a href="https://www.zoho.com/mail/" target="mail.zoho.com">
                                            Zoho Mail (https://www.zoho.com/mail)
                                    </li>
                                    <li>
                                        <a href="https://outlook.live.com" target="outlook.live.com">
                                            Microsoft Outlook (https://outlook.live.com)
                                        </a>
                                    </li>
                                    <li>
                                        <a href="https://mail.yahoo.com" target="mail.yahoo.com">
                                            Yahoo Mail (https://mail.yahoo.com)
                                        </a>
                                    </li>
                                </ul>
                            </p>`)
                    .then(ezApi.ezIgnoreResolve);
            }

            EzSignUp.ezInstance.ezShowErrorMessage(vResult.message);

            return false;
        }

        vResult = ezApi.ezclocker.ezValidation.ezValidatePassword(password);

        if (0 != vResult.errorCode) {
            EzSignUp.ezInstance.ezShowErrorMessage(vResult.message);

            return false;
        }

        return true;
    }

    /**
        @protected
        Executes the signup submission
     */
    ezQuickSignUpFormSubmit() {
        if (!EzSignUp.ezInstance.ezValidateSignupSubmit()) {
            return;
        }

        return ezApi.ezclocker.ezUi.ezStartPageWait(
            'Creating your account',
            (waitDone) => ezApi.ezclocker.ezAccountServices.ezSignUp(
                // Role
                EzUserRole.ROLE_EMPLOYER,
                // User name
                EzSignUp.ezInstance.ezUsername,
                // password
                EzSignUp.ezInstance.ezPassword,
                null,
                // Name
                EzSignUp.ezInstance.ezCompanyName,
                // Company Name
                EzSignUp.ezInstance.ezCompanyName,
                // invite token
                null,
                // Employer id
                null,
                // business type
                null,
                // developer token
                null,
                // Affiliate id
                null)
                .then(
                    (response) => {
                        if (EzObject.isValid(ezApi.ezclocker.ezAnalyticsAndMetrics.ezAmplitudeIntegration) &&
                            EzBoolean.isTrue(ezApi.ezclocker.ezAnalyticsAndMetrics.ezAmplitudeIntegration.ezEnabled)) {
                            let amplitudeEventProperties = EzAmplitudeIntegrationEventId.ezGetAmplitudePropertiesForEventId(
                                EzAmplitudeIntegrationEventId.EMPLOYER_SIGN_UP);

                            amplitudeEventProperties.companyName = EzSignUp.ezInstance.ezCompanyName;
                            amplitudeEventProperties.username = EzSignUp.ezInstance.ezUsername;
                            amplitudeEventProperties.result = 'Success';
                            amplitudeEventProperties.response = response;

                            ezApi.ezclocker.ezAnalyticsAndMetrics.ezAmplitudeIntegration.ezTrack(
                                EzAmplitudeIntegrationEventId.EMPLOYER_SIGN_UP,
                                amplitudeEventProperties);
                        }

                        // UTM tracking
                        return EzSignUp.ezInstance.ezRecordUtmParams(
                            response.employer.id,
                            response.employer.userId)
                            .then(
                                () => waitDone()
                                    .then(
                                        () => ezApi.ezclocker.ezDialog.ezShowOKMessage(
                                            'Sign Up Success!',
                                            EzHtml.build`
                                                <h3>Thank you for choosing ezClocker!</h3>
                                                <h2>Your Employer account is ready to go!</h2>
                                                <p>Click the OK button below to continue to your Employer dashboard.</p>`)
                                            .then(
                                                // Sign in and navigate to the dashboard
                                                () => ezApi.ezclocker.ezAccountServices.ezSignIn(
                                                    EzSignUp.ezInstance.ezUsername,
                                                    EzSignUp.ezInstance.ezPassword,
                                                    ezApi.ezclocker.ezNavigation.ezGetPublicApiUrl('redirect/dashboard'),
                                                    false,
                                                    'EzSignUpDialogsContainer'))));
                    },
                    (eResponse) => waitDone()
                        .then(
                            () => {
                                let eResponseError = ezApi.ezclocker.ezHttpHelper.extractErrorResponseMessageOrDefault(
                                    eResponse,
                                    'EzClocker is unable to create new accounts at this time. Please try again in a few minutes.');

                                if (EzObject.isValid(ezApi.ezclocker.ezGoogleAnalytics)) {
                                    ezApi.ezclocker.ezGoogleAnalytics.logEvent(
                                        'Employer Sign Up',
                                        'Stand Alone',
                                        `Error: ${eResponseError}`);
                                }

                                ezApi.ezclocker.ezDialog.ezShowError(
                                    'Sign Up Error',
                                    eResponseError);
                            })));
    }

    /**
        @protected @method
        Records the UTM params settings for signup
        @param {number} employerId
        @param {number} userId
     */
    ezRecordUtmParams(employerId, userId) {
        return ezApi.ezPromise(
            (resolve) => ezApi.ezclocker.ezUtmTagMapService.ezSaveUtmTagMap(
                // employer id
                EzNumber.isNumber(employerId)
                    ? employerId
                    : null,
                // employee id
                EzNumber.isNumber(userId)
                    ? userId
                    : null,
                // user id
                null,
                // user name
                EzSignUp.ezInstance.ezUsername,
                ezApi.ezclocker.ezUrlHelper.getUrlParam(
                    ezApi.ezclocker.ezUtmTagMapService.UTM_TAG_NAMES.UTM_MEDIUM),
                ezApi.ezclocker.ezUrlHelper.getUrlParam(
                    ezApi.ezclocker.ezUtmTagMapService.UTM_TAG_NAMES.UTM_SOURCE),
                ezApi.ezclocker.ezUrlHelper.getUrlParam(
                    ezApi.ezclocker.ezUtmTagMapService.UTM_TAG_NAMES.UTM_CAMPAIGN))
                .then(
                    resolve,
                    (eResponse) => {
                        ezApi.ezclocker.ezLogger.error(
                            EzString.em`
                                Failed to record the UTM parameters for sign up.
                                Error response: ${EzJson.toJson(eResponse)}`);

                        return resolve();
                    }));
    }
}
