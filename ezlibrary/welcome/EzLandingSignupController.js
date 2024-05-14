import { EzBadParamException } from '/ezlibrary/exceptions/EzBadParamException.js';

import { EzClass } from '/ezlibrary/EzClass.js';

import { EzUserRole } from '/ezlibrary/EzUserRole.js';

import { EzAnalyticsAndMetrics } from '/ezlibrary/analytics_metrics/EzAnalyticsAndMetrics.js';

import { EzAccountServices } from '/public/javascript/services/ezclocker-account-services.js';

import { EzValidationResponseStatus } from '/ezlibrary/EzValidationResponse.js';
import { EzValidation } from '/public/javascript/common/ez-validation.js';

import { EzHttpHelper } from '/public/javascript/common/ezclocker-http-helper.js';
import { EzUrlHelper } from '/public/javascript/common/ezclocker-url-helper2.js';
import { EzUI } from '/public/javascript/common/ezui.js';
import { EzDialog } from '/public/javascript/common/ezclocker-dialog-helper.js';


/**
    Landing page sign-up controller
    Import with:
    import { EzSignUp } from '/ezlibrary/EzLandingSignupController.js';
 */
class EzSignUp extends EzClass {
    /**
        @public @static @field
        @type {EzSignUp}
     */
    static ezInstance = null;

    /**
        @public @static @field
        @type {string}
     */
    static ezApiRegistrationState = null;

    /**
        @public @static @readonly @property
        @returns {string}
     */
    static get ezApiName() {
        return 'ezSignUp';
    }

    /**
        @public @static @readonly @property
        @returns {object}
     */
    static get ezEventNames() {
        return {
            onReady: 'ezOn_EzSignUp_Ready',
        };
    }

    /**
        @public @static @readonly @property
        @returns {boolean}
     */
    static get ezCanRegister() {
        return 'PENDING' === EzSignUp.ezApiRegistrationState &&
            Object.prototype.hasOwnProperty.call(globalThis, 'ezApi') &&
            globalThis.ezApi && globalThis.ezApi.ready &&

            globalThis.ezApi.ezclocker[EzUserRole.ezApiName] &&
            globalThis.ezApi.ezclocker[EzUserRole.ezApiName].ready &&

            globalThis.ezApi.ezclocker[EzGoogleAnalyticsIntegration.ezApiName] &&
            globalThis.ezApi.ezclocker[EzGoogleAnalyticsIntegration.ezApiName].ready &&

            globalThis.ezApi.ezclocker[EzAnalyticsAndMetrics.ezApiName] &&
            globalThis.ezApi.ezclocker[EzAnalyticsAndMetrics.ezApiName].ready &&

            globalThis.ezApi.ezclocker[EzAccountServices.ezApiName] &&
            globalThis.ezApi.ezclocker[EzAccountServices.ezApiName].ready &&

            globalThis.ezApi.ezclocker[EzValidation.ezApiName] &&
            globalThis.ezApi.ezclocker[EzValidation.ezApiName].ready &&

            globalThis.ezApi.ezclocker[EzHttpHelper.ezApiName] &&
            globalThis.ezApi.ezclocker[EzHttpHelper.ezApiName].ready &&

            globalThis.ezApi.ezclocker[EzUrlHelper.ezApiName] &&
            globalThis.ezApi.ezclocker[EzUrlHelper.ezApiName].ready &&

            globalThis.ezApi.ezclocker[EzUI.ezApiName] &&
            globalThis.ezApi.ezclocker[EzUI.ezApiName].ready &&

            globalThis.ezApi.ezclocker[EzDialog.ezApiName] &&
            globalThis.ezApi.ezclocker[EzDialog.ezApiName].ready;
    }

    /**
        @private @static @method
     */
    static #ezRegistrator() {
        if (!EzSignUp.ezCanRegister) {
            return false;
        }
        EzSignUp.ezInstance = ezApi.ezRegisterNewApi(
            EzSignUp,
            EzSignUp.ezApiName);
        EzSignUp.ezApiRegistrationState = 'REGISTERED';
        return true;
    }

    // Static constructor
    static {
        if (null == this.ezApiRegistrationState) {
            this.ezApiRegistrationState = 'PENDING';

            if (!this.#ezRegistrator()) {
                document.addEventListener(
                    'onEzApiReady',
                    this.#ezRegistrator);

                document.addEventListener(
                    EzUserRole.ezEventNames.onReady,
                    this.#ezRegistrator);

                document.addEventListener(
                    EzGoogleAnalyticsIntegration.ezEventNames.onReady,
                    this.#ezRegistrator);

                document.addEventListener(
                    EzAnalyticsAndMetrics.ezEventNames.onReady,
                    this.#ezRegistrator);

                document.addEventListener(
                    EzAccountServices.ezEventNames.onReady,
                    this.#ezRegistrator);

                document.addEventListener(
                    EzValidation.ezEventNames.onReady,
                    this.#ezRegistrator);

                document.addEventListener(
                    EzHttpHelper.ezEventNames.onReady,
                    this.#ezRegistrator);

                document.addEventListener(
                    EzUrlHelper.ezEventNames.onReady,
                    this.#ezRegistrator);

                document.addEventListener(
                    EzUI.ezEventNames.onReady,
                    this.#ezRegistrator);

                document.addEventListener(
                    EzDialog.ezEventNames.onReady,
                    this.#ezRegistrator);
            }
        }
    }

    /**
        @public @constructor
     */
    constructor() {
        super();
    }

    /**
        @public @field
        @type {boolean}
     */
    isMobile = false;

    /**
        @public @field
        @type {string}
     */
    browserType = 'Website';

    /**
        @public @readonly @property
        @returns {object}
     */
    get ezIds() {
        return {
            companyNameInputId: 'ez_companyName',
            usernameInputId: 'ez_userEmail',
            passwordInputId: 'ez_password',
            signupCompanyNameErrorBoxId: 'signupNameError',
            signupEmailErrorBoxId: 'signupEmailError',
            signupPasswordErrorBoxId: 'signupPasswordError'
        };
    }

    /**
        @protected @method
        Initializes EzSignUp
        @returns {EzSignUp}
     */
    ezInit() {
        EzSignUp.ezInstance.ezInitUX();
        return EzSignUp.ezInstance;
    }

    /**
        @protected @method
        Initializes the UX for the landing signup controller
     */
    ezInitUX() {
        ezApi.ezclocker.ezUi.ezHookElementEvent(
            'ez_signUp',
            'click',
            EzSignUp.ezInstance.ezSubmit);
    }

    /**
        @public @method
     */
    hideErrorMessages() {
        const self = EzSignUp.ezInstance;

        ezApi.ezclocker.ezUi.ezHideElement(self.ezIds.signupCompanyNameErrorBoxId);
        ezApi.ezclocker.ezUi.ezHideElement(self.ezIds.signupEmailErrorBoxId);
        ezApi.ezclocker.ezUi.ezHideElement(self.ezIds.signupPasswordErrorBoxId);
    }

    /**
        @public @method
        @param {string} errorBoxId
        @param {string} message
     */
    showErrorMessage(errorBoxId, message) {
        ezApi.ezclocker.ezUi.ezContent(errorBoxId, message);
        ezApi.ezclocker.ezUi.ezShowElement(errorBoxId);
    }

    /**
        @public @method
        Determines if the browser is a mobile browser
        @returns {boolean}
     */
    ezIsMobileBrowser() {
        const self = EzSignUp.ezInstance;

        try {
            self.isMobile = ezApi.ezclocker.ezMobile.isMobileBrowser();
        } catch (ex) {
            ezApi.ezclocker.ezLogger.error(
                `Failed to determine if the browser is mobile or not. Error: ${ezApi.ezToJson(ex)}`);

            self.isMobile = false;
        }

        self.browserType = self.isMobile
            ? 'Mobile'
            : 'Website';

        return self.isMobile;
    }

    /**
        @public @method
        @param {string} companyName
        @param {string} userName
        @param {string} password
        @returns {boolean}
     */
    validateSignupSubmit(companyName, userName, password, errorOnBlank) {
        errorOnBlank = ezApi.ezIsTrue(errorOnBlank);

        EzSignUp.ezInstance.hideErrorMessages();

        let vResult = ezApi.ezclocker.ezValidation.ezValidateCompanyName(companyName, errorOnBlank);
        if (0 != vResult.ezGetErrorCode()) {
            EzSignUp.ezInstance.showErrorMessage(
                EzSignUp.ezInstance.ezIds.signupCompanyNameErrorBoxId,
                vResult.ezGetMessage());
            return false;
        }

        vResult = ezApi.ezclocker.ezValidation.ezValidateEmailAddress(userName, errorOnBlank);
        if (0 != vResult.ezGetErrorCode()) {
            if (EzValidationResponseStatus.ezToErrorCode(
                EzValidationResponseStatus.ERROR_UNSUPPORTED) == vResult.errorCode) {
                // Unsupported email domain error
                ezApi.ezclocker.ezDialo.ezShowErrorDialog(
                    'Unsupported Email',
                    vResult.ezGetHtmlMessage())
                    .then(ezApi.ezIgnoreResolve);
            }
            EzSignUp.ezInstance.showErrorMessage(
                EzSignUp.ezInstance.ezIds.signupEmailErrorBoxId,
                vResult.ezGetMessage());
            return false;
        }

        vResult = ezApi.ezclocker.ezValidation.ezValidatePassword(password, errorOnBlank);
        if (0 != vResult.ezGetErrorCode()) {
            EzSignUp.ezInstance.showErrorMessage(
                EzSignUp.ezInstance.ezIds.signupEmailErrorBoxId,
                vResult.ezGetMessage());
            return false;
        }

        return true;
    }

    /**
        @public @method
        Submit the sign up to ezclocker
     */
    ezSubmit() {
        const self = EzSignUp.ezInstance;

        ezApi.ezclocker.ezAnalyticsAndMetrics.ezAmplitudeIntegration.ezTrack('Sign-Up');

        let companyName = ezApi.ezclocker.ezUi.ezGetInputValue(self.ezIds.companyNameInputId);
        companyName = ezApi.ezStringHasLength(companyName)
            ? companyName.trim()
            : companyName;

        let userName = ezApi.ezclocker.ezUi.ezGetInputValue(self.ezIds.usernameInputId);
        userName = ezApi.ezStringHasLength(userName)
            ? userName.trim()
            : userName;

        let password = ezApi.ezclocker.ezUi.ezGetInputValue(self.ezIds.passwordInputId);
        password = ezApi.ezStringHasLength(password)
            ? password.trim()
            : password;

        if (!self.validateSignupSubmit(companyName, userName, password, true)) {
            return;
        }

        return ezApi.ezclocker.ezUi.ezStartPageWait(
            'Creating your account',
            (waitDone) => ezApi.ezclocker.ezAccountServices.ezSignUp(
                // Role
                EzUserRole.ROLE_EMPLOYER,
                // User name
                userName,
                // password
                password,
                // Pin NUmber
                null,
                // Name
                companyName,
                // Company Name
                companyName,
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
                    (response) => self.ezHandleSignupSuccess(response, waitDone),
                    (eResponse) => self.ezHandleSignupFailure(eResponse, waitDone)));

    }

    /**
        @protected @method
        Handles successful signup response
        @param {object} response
        @param {function} waitDone
        @returns {Promise}
     */
    ezHandleSignupSuccess(response, waitDone) {
        const self = EzSignUp.ezInstance;

        if (!ezApi.ezIsValid(response)) {
            throw new EzBadParamException(
                'response',
                self,
                self.ezHandleSignUpSuccess);
        }
        if (!ezApi.ezIsFunction(waitDone)) {
            throw new EzBadParamException(
                'waitDone',
                self,
                self.ezHandleSignUpSuccess);
        }

        let userName = ezApi.ezclocker.ezUi.ezGetInputValue(self.ezIds.usernameInputId);
        userName = ezApi.ezStringHasLength(userName)
            ? userName.trim()
            : userName;

        let password = ezApi.ezclocker.ezUi.ezGetInputValue(self.ezIds.passwordInputId);
        password = ezApi.ezStringHasLength(password)
            ? password.trim()
            : password;

        // Face book lead tracking
        if (ezApi.ezIsValid(fbq)) {
            fbq('track', 'Lead');
        }

        return self.ezRecordUtmParams(
            response.employer.employerId,
            response.employer.userId)
            .then(
                () => waitDone()
                    .then(
                        () => ezApi.ezclocker.ezDialog.ezShowOKMessage(
                            'Sign Up Success!',
                            ezApi.ezTemplate`
                                <h2>Your Employer account is ready to go!</h2>
                                <p>Click the OK button below to continue to your Employer dashboard.</p>
                                <h3>Welcome to ezClocker!</h3>`,
                            null,
                            600)
                            // Sign in and navigate to the dashboard
                            .then(
                                () => ezApi.ezclocker.ezAccountServices.ezSignIn(
                                    userName,
                                    password,
                                    ezApi.ezclocker.ezNavigation.ezGetPublicApiUrl('redirect/dashboard'),
                                    false,
                                    'EzHiddenDialogsContainer'))));
}

/**
    @protected @method
    Handles signup failures
    @param {object} eResponse
    @param {function} waitDone
 */
ezHandleSignupFailure(eResponse, waitDone) {
    const self = EzSignUp.ezInstance;

    if (!ezApi.ezIsValid(eResponse)) {
        throw new EzBadParamException(
            'response',
            self,
            self.ezHandleSignUpSuccess);
    }
    if (!ezApi.ezIsFunction(waitDone)) {
        throw new EzBadParamException(
            'waitDone',
            self,
            self.ezHandleSignUpSuccess);
    }

    let userName = ezApi.ezclocker.ezUi.ezGetInputValue(self.ezIds.usernameInputId);
    userName = ezApi.ezStringHasLength(userName)
        ? userName.trim()
        : userName;

    waitDone();
    if (8 == eResponse.errorCode || 409 == eResponse.errorCode) {
        // user already exists
        ezApi.ezclocker.ezDialog.ezShowError(
            'User Account Exists',
            eResponse.message,
            () => ezApi.ezclocker.ezNavigation.ezNavigateToSignIn('', userName),
            null,
            'auto',
            'auto');
        return;
    }

    let em = ezApi.ezclocker.ezHttpHelper.extractErrorResponseMessageOrDefault(
        eResponse,
        ezApi.ezEM`
                EzClocker is unable to create new accounts at this time.
                Please try again in a few minutes.`);

    if (ezApi.ezIsValid(ezApi.ezclocker.ezGoogleAnalytics)) {
        ezApi.ezclocker.ezGoogleAnalytics.logEvent(
            'Employer Sign Up',
            'Stand Alone',
            ezApi.ezEM`Error: ${em}`);
    }

    ezApi.ezclocker.ezDialog.ezShowError('Sign Up Error', em);
}

/**
    @protected @method
    Records the UTM params settings for signup
    @param {number} employerId
    @param {number} userId
    @returns {Promise}
*/
ezRecordUtmParams(employerId, userId) {
    const self = EzSignUp.ezInstance;

    return ezApi.ezPromise((resolve) => ezApi.ezclocker.ezUtmTagMapService.ezSaveUtmTagMap(
        // employer id
        ezApi.ezIsNumber(employerId)
            ? employerId
            : null,
        // employee id
        ezApi.ezIsNumber(userId)
            ? userId
            : null,
        // user id
        null,
        // user name
        ezApi.ezclocker.ezUi.ezGetInputValue(self.ezIds.usernameInputId).trim(),
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
                    `Failed to record the UTM params for sign up. Error: ${ezApi.ezToJson(eResponse)}`);
                return resolve();
            }));
}
}

export {
    EzSignUp
};
