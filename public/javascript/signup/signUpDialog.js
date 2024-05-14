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
                    EzSignUp.#ezRegistrator);

                document.addEventListener(
                    EzUI.ezEventNames.onReady,
                    EzSignUp.#ezRegistrator);

                document.addEventListener(
                    EzAnimator.ezEventNames.onReady,
                    EzSignUp.#ezRegistrator);
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

        return EzString.hasLength(companyName)
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

        return EzString.hasLength(username)
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

        return EzString.hasLength(password)
            ? password.trim()
            : password;
    }

    /**
        @public @readonly @property
        Returns the trimmed value in the industry list box
        @returns {string}
     */
    get ezIndustry() {
        let industry = ezApi.ezclocker.ezUi.ezGetInputValue('ez_industry');

        return EzString.hasLength(industry)
            ? industry.trim()
            : industry;
    }


    /**
        @protected @method
        Initializes EzSignUp
     */
    ezInit() {
        ezApi.ezclocker.ezUi.ezHideElement('body');

        let mobilePagePath = ezApi.ezclocker.ezNavigation.ezRemoveVersionFromUri('p/try');

        if (ezApi.ezclocker.ezBrowserInfo.ezRedirectIfMobilePhone(mobilePagePath)) {
            return;
        }

        ezApi.ezclocker.ezUi.ezShowElement('body');

        EzSignUp.ezInstance.ezInitUX();

        return EzSignUp.ezInstance;
    }

    /**
        @protected @method
        Initializes the Sign-up dialog UX
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

        ezApi.ezclocker.ezUi.ezSetInputValue(
            'ez_industry',
            EzString.EMPTY);
    }

    /**
        @protected @method
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
        if (EzString.hasLength(EzSignUp.ezInstance.ezCompanyName) &&
            EzString.hasLength(EzSignUp.ezInstance.ezUsername) &&
            EzString.hasLength(EzSignUp.ezInstance.ezIndustry) &&
            EzString.hasLength(EzSignUp.ezInstance.ezPassword)) {
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
        @param {string} message
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

        let vResult = ezApi.ezclocker.ezValidation.ezValidateEmailAddress(EzSignUp.ezInstance.ezUsername);

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

        let password = EzSignUp.ezInstance.ezPassword;

        if (EzString.hasLength(password)) {
            password = password.trim();
        }

        vResult = ezApi.ezclocker.ezValidation.ezValidatePassword(password);

        if (0 != vResult.errorCode) {
            EzSignUp.ezInstance.ezShowErrorMessage(vResult.message);

            return false;
        }

        let industry = EzSignUp.ezInstance.ezIndustry;
        if (!EzString.hasLength(industry)) {
            EzSignUp.ezInstance.ezShowErrorMessage("Please select an industry.");
            return false;
        }

        return true;
    }

    /**
        @protected @method
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
                EzSignUp.ezInstance.ezIndustry,
                // developer token
                null,
                // Affiliate id
                null)
                .then(
                    (response) => EzSignUp.ezInstance.ezRecordUtmParams(response.employer.id, response.employer.userId)
                        .then(
                            () => waitDone()
                                .then(
                                    () => {
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

                                        ezApi.ezclocker.ezDialog.ezShowOKMessage(
                                            'Sign Up Success!',
                                            EzHtml.build`
                                                <h3>Your Employer account is ready to go!</h3>
                                                <h4>Thank you for choosing ezClocker!</h4>
                                                <p>Click the OK button below to continue to your Employer dashboard.</p>`,
                                            null,
                                            600)
                                            .then(
                                                () => {
                                                    // Sign in and navigate to the dashboard
                                                    return ezApi.ezclocker.ezAccountServices.ezSignIn(
                                                        EzSignUp.ezInstance.ezUsername,
                                                        EzSignUp.ezInstance.ezPassword,
                                                        ezApi.ezclocker.ezNavigation.ezGetPublicApiUrl('redirect/dashboard'),
                                                        false,
                                                        'EzSignUpDialogsContainer');
                                                });

                                    }),
                            (eResponse) => waitDone()
                                .then(
                                    () => {
                                        let eResponseError = ezApi.ezclocker.ezHttpHelper.extractErrorResponseMessageOrDefault(
                                            eResponse,
                                            'EzClocker is unable to create new accounts at this time. Please try again in a few minutes.');

                                        if (EzObject.isValid(ezApi.ezclocker.ezGoogleAnalytics)) {
                                            ezApi.ezclocker.ezGoogleAnalyticsIntegration.ezLogEvent(
                                                'Employer Sign Up',
                                                'Stand Alone',
                                                `Error: ${eResponseError}`);
                                        }

                                        ezApi.ezclocker.ezDialog.ezShowError('Sign Up Error', eResponseError);
                                    }))));
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
                ezApi.ezclocker.ezUi.ezGetInputValue('ez_userName').trim(),
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
