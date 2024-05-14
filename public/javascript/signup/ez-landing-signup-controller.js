import { EzUserRole } from '/ezlibrary/EzUserRole.js';

import { EzNavigation } from '/public/javascript/common/ezclocker-navigation-helper.js';

/**
    @deprecated
    Use the EzLandingSignupController.js class instead of this class.
    Will remove in a future release.
    Landing page sign-up controller
 */
class EzSignUp {
    static ezApiName = 'ezSignUp';
    static ezEventNames = {
        onReady: 'ezOn_EzSignUp_Ready'
    };
    static ezInstance = null;
    static ezApiRegistrationState = null;
    static ezCanRegister() {
        return 'PENDING' === EzSignUp.ezApiRegistrationState &&
            Object.prototype.hasOwnProperty.call(globalThis, 'ezApi') && globalThis['ezApi'].ready &&
            ezApi.ezclocker[EzNavigation.ezApiName] && ezApi.ezclocker[EzNavigation.ezApiName].ready;
    }
    static ezRegistrator() {
        if (EzSignUp.ezCanRegister()) {
            EzSignUp.ezInstance = ezApi.ezRegisterNewApi(
                EzSignUp,
                EzSignUp.ezApiName);

            EzSignUp.ezApiRegistrationState = 'REGISTERED';
        }
    }
    static {
        if (null == this.ezApiRegistrationState) {
            this.ezApiRegistrationState = 'PENDING';

            document.addEventListener(
                'onEzApiReady',
                this.ezRegistrator);

            document.addEventListener(
                EzNavigation.ezEventNames.onReady,
                this.ezRegistrator);
        }
    }

    constructor() {
        this.ready = false;
        this.ezTypeName = 'EzSignUp';

        this.ezIds = {
            companyNameInputId: 'ez_companyName',
            usernameInputId: 'ez_userEmail',
            passwordInputIdId: 'ez_password',
        };

        this.isMobile = false;
        this.browserType = 'Website';
    }

    /**
        @public
        Initializes EzSignUp
     */
    ezInit() {
        const self = EzSignUp.ezInstance;

        ezUi.ezHookElementEvent('ez_signUp', 'click', self.ezSubmit);
        self.amplitudeInstance = amplitude.getInstance();
        self.amplitudeInstance.init('63b4edbc4ad58e5fc414875544c4a3db');

        self.ready = true;
        return self;
    }

    /**
        @public
     */
    hideErrorMessages() {
        ezUi.ezHide('signupEmailError');
        ezUi.ezHide('signupPasswordError');
        ezUi.ezHide('signupNameError');
    }

    /**
        @public
        @param {*} inputRef
        @param {*} message
     */
    showErrorMessage(errorBoxId, message) {
        ezApi.ezId(errorBoxId).html(message).fadeIn();
    }

    /**
        @public
        Determines if the browser is a mobile browser
     */
    ezIsMobileBrowser() {
        const self = EzSignUp.ezInstance;

        try {
            self.isMobile = ezApi.ezclocker.ezMobile.isMobileBrowser();
        } catch (ex) {
            ezApi.ezclocker.logger.error(
                ezApi.ezEM`Failed to determine if the browser is mobile or not. Error: ${ezApi.ezToJson(ex)}`);

            self.isMobile = false;
        }

        self.browserType = self.isMobile
            ? 'Mobile'
            : 'Website';

        return self.isMobile;
    }

    /**
        @public
     */
    validateSignupSubmit(companyName, userName, password) {
        const self = EzSignUp.ezInstance;

        self.hideErrorMessages();

        let vResponse = ezApi.ezclocker.ezValidation.ezValidateCompanyName(companyName);
        if (0 != vResponse.errorCode) {
            self.showErrorMessage(
                'signupEmailError',
                vResponse.message);
            return false;
        }


        vResponse = ezApi.ezclocker.ezValidation.ezValidateUsername(userName);
        if (0 != vResponse.errorCode) {
            self.showErrorMessage(
                'signupEmailError',
                vResponse.message);
            return false;
        }

        vResponse = ezApi.ezclocker.ezValidation.ezValidatePassword(password);
        if (0 != vResponse.errorCode) {
            self.showErrorMessage(
                'signupEmailError',
                vResponse.message);
            return false;
        }

        return true;
    }

    /**
        @public
        Submit the sign up to ezclocker
     */
    ezSubmit() {
        const self = EzSignUp.ezInstance;

        self.amplitudeInstance.logEvent('Signup');

        let companyName = ezUi.ezGetInputValue(self.companyNameId);
        companyName = ezApi.ezStringHasLength(companyName)
            ? companyName.trim()
            : companyName;

        let userName = ezUi.ezGetInputValue(self.userEmailId);
        userName = ezApi.ezStringHasLength(userName)
            ? userName.trim()
            : userName;

        let password = ezUi.ezGetInputValue(self.userPasswordId);
        password = ezApi.ezStringHasLength(password)
            ? password.trim()
            : password;

        if (!self.validateSignupSubmit(companyName, userName, password)) {
            return;
        }

        return ezUi.ezStartPageWait(
            'Creating your account',
            (waitDone) => ezApi.ezclocker.ezAccountServices
                .ezSignUp(
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
                    (response) => {
                        // Face book lead tracking
                        if (ezApi.ezIsValid(fbq)) {
                            fbq('track', 'Lead');
                        }

                        // Google analytics conversion tracking
                        if (ezApi.ezclocker.ezGoogleAnalytics) {
                            ezApi.ezclocker.ezGoogleAnalytics.logEvent(
                                'Employer Sign Up',
                                'Landing Page',
                                'Success');
                            ezApi.ezclocker.ezGoogleAnalytics.reportConversion('prd');
                        }

                        return self.ezRecordUtmParams(
                            response.employer.employerId,
                            response.employer.userId)
                            .then(
                                () => {
                                    waitDone();
                                    return ezApi.ezclocker.ezDialog
                                        .ezShowOKMessage(
                                            'Sign Up Success!',
                                            ezApi.ezTemplate`
                                            <h2>Your Employer account is ready to go!</h2>
                                            <p>Click the OK button below to continue to your Employer dashboard.</p>
                                            <h3>Welcome to ezClocker!</h3>`)
                                        // Sign in and navigate to the dashboard
                                        .then(() => ezApi.ezclocker.ezAccountServices
                                            .ezSignIn(
                                                userName,
                                                password,
                                                ezApi.ezclocker.nav.ezGetPublicApiUrl('redirect/dashboard'),
                                                false,
                                                'EzHiddenDialogsContainer'));

                                });
                    },
                    (eResponse) => {
                        waitDone();
                        if (8 == eResponse.errorCode || 409 == eResponse.errorCode) {
                            // user already exists
                            ezApi.ezclocker.ezDialog.ezShowError(
                                'User Account Exists',
                                eResponse.message,
                                () => ezApi.ezclocker.nav.ezNavigateToSignIn('', userName),
                                null,
                                'auto',
                                'auto');
                            return;
                        }

                        let em = ezApi.ezclocker.http.extractErrorResponseMessageOrDefault(
                            eResponse,
                            'ezClocker is unable to create new accounts at this time. Please try again in a few minutes.');

                        if (ezApi.ezIsValid(ezApi.ezclocker.ezGoogleAnalytics)) {
                            ezApi.ezclocker.ezGoogleAnalytics.logEvent(
                                'Employer Sign Up',
                                'Stand Alone',
                                ezApi.ezEM`Error: ${em}`);
                        }

                        ezApi.ezclocker.ezDialog.ezShowError('Sign Up Error', em);
                    }));
    }

    /**
        @protected
        Records the UTM params settings for signup
    */
    ezRecordUtmParams(employerId, userId) {
        const self = EzSignUp.ezInstance;

        return ezApi.ezPromise((resolve) => ezApi.ezclocker.ezUtmTagMapService
            .ezSaveUtmTagMap(
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
                ezUi.ezGetInputValue(self.userEmailId).trim(),
                ezApi.ezclocker.ezUrlHelper
                    .getUrlParam(ezApi.ezclocker.ezUtmTagMapService.UTM_TAG_NAMES.UTM_MEDIUM),
                ezApi.ezclocker.ezUrlHelper
                    .getUrlParam(ezApi.ezclocker.ezUtmTagMapService.UTM_TAG_NAMES.UTM_SOURCE),
                ezApi.ezclocker.ezUrlHelper
                    .getUrlParam(ezApi.ezclocker.ezUtmTagMapService.UTM_TAG_NAMES.UTM_CAMPAIGN))
            .then(
                resolve,
                (eResponse) => {
                    ezApi.ezclocker.logger.error(ezApi.ezEM`
                        Failed to record the UTM params for sign up. Error: ${ezApi.ezToJson(eResponse)}`);
                    return resolve();
                }));
    }
}

export {
    EzSignUp
};