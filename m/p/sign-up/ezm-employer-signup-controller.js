// Helper Imports
import {
    EzString
} from '/ezlibrary/helpers/EzHelpers.js';


import { EzInstanceState } from '/ezlibrary/EzInstanceState.js';

import { EzUserRole } from '/ezlibrary/EzUserRole.js';

import { EzUI } from '/public/javascript/common/ezui.js';

/**
 * @public
 * Controller for the m.employerSignup.html mobile page
 */
class EzEmployerSignupViewController {
    static ezApiName = 'ezEmployerSignupViewController';
    static ezEventNames = {
        onReady: 'ezOn_EzEmployerSignupViewController_Ready'
    };
    static ezInstance = null;
    static ezApiRegistrationState = null;
    static ezCanRegister() {
        return 'PENDING' === EzEmployerSignupViewController.ezApiRegistrationState &&
            Object.prototype.hasOwnProperty.call(globalThis, 'ezApi') &&
            globalThis['ezApi'] && globalThis['ezApi'].ready &&
            ezApi.ezclocker[EzUserRole.ezApiName] && ezApi.ezclocker[EzUserRole.ezApiName].ready &&
            ezApi.ezclocker[EzUI.ezApiName] && ezApi.ezclocker[EzUI.ezApiName].ready;
    }
    static ezRegistrator() {
        if (EzEmployerSignupViewController.ezCanRegister()) {
            EzEmployerSignupViewController.ezInstance = ezApi.ezRegisterNewApi(
                EzEmployerSignupViewController,
                EzEmployerSignupViewController.ezApiName);

            EzEmployerSignupViewController.ezApiRegistrationState = 'REGISTERED';
        }
    }
    static {
        if (null == this.ezApiRegistrationState) {
            this.ezApiRegistrationState = 'PENDING';

            // Must wait to initialize until after EzUI is ready
            document.addEventListener(
                'onEzApiReady',
                this.ezRegistrator);

            document.addEventListener(
                EzUserRole.ezEventNames.onReady,
                this.ezRegistrator);

            document.addEventListener(
                EzUI.ezEventNames.onReady,
                this.ezRegistrator);
        }
    }

    constructor() {
        this.ezStates.push(EzInstanceState.CONSTRUCTED);
    }

    ready = false;
    ezStates = [];

    ezInit() {
        EzEmployerSignupViewController.ezInstance.ezInitUx();
        return EzEmployerSignupViewController.ezInstance;
    }

    ezInitUx() {
        const self = EzEmployerSignupViewController.ezInstance;
        try {
            ezApi.ezclocker.ezUi.ezSetElementAttribute('EzDownloadAndriodButton', 'href',
                ezApi.ezclocker.ezmNav.ANDRIOD_BUSINESS_APPSTORE_URL);
            ezApi.ezclocker.ezUi.ezSetElementAttribute('EzDownloadiPhoneButton', 'href',
                ezApi.ezclocker.ezmNav.IPHONE_BUSINESS_APPSTORE_URL);

            self.hideErrorMessage();
            self.loadParams();

            ezApi.ezclocker.ezUi.ezId('_SignUp').on('click', self.signUp);
        } finally {
            let signUpError = ezApi.ezclocker.ezUrlHelper.getErrorParam();
            if (ezApi.ezStringHasLength(signUpError)) {
                ezUi.ezHtml('_ErrorMessage', signUpError);
                ezUi.ezFadeIn('_ErrorMessage');
            }
            ezUi.ezFocusInput('_EmployerName');
        }
    }

    showErrorMessage(message) {
        ezApi.ezclocker.ezmMobileHelper.ezmStopPageWait();
        ezApi.ezId('_ErrorMessage').html(message);
        ezApi.ezId('_ErrorMessage').fadeIn('slow');
    }

    hideErrorMessage() {
        ezApi.ezId('_ErrorMessage').hide();
    }

    loadParams() {
        ezApi.ezId('_EmployerName').val(ezApi.ezclocker.ezUrlHelper.getNameParam());
        ezApi.ezId('_Source').val(ezApi.ezclocker.ezUrlHelper.getSourceParam());
        ezApi.ezId('_EmailAddress').val(ezApi.ezclocker.ezUrlHelper.getEmailParam());
        ezApi.ezId('_ErrorMessage').html(ezApi.ezclocker.ezUrlHelper.getErrorParam());
    }

    signUp() {
        const self = EzEmployerSignupViewController.ezInstance;

        ezApi.ezclocker.ezmMobileHelper.ezmStartPageWait('creating your account', 'a');
        self.hideErrorMessage();

        let email = ezApi.ezId('_EmailAddress').val();
        let vResponse = ezApi.ezclocker.ezValidation.ezValidateEmailAddress(email);
        if (vResponse.errorCode !== 0) {
            self.showErrorMessage(vResponse.message);
            return;
        }

        let password = ezApi.ezId('_Password').val();
        vResponse = ezApi.ezclocker.ezValidation.ezValidatePassword(password);
        if (vResponse.errorCode !== 0) {
            self.showErrorMessage(vResponse.message);
            return;
        }

        ezApi.ezclocker.ezAccountServices.ezSignUp(
            EzUserRole.ROLE_EMPLOYER,
            email,
            password,
            null,
            EzString.encodeHtml(ezUi.ezGetInputValue('_EmployerName')),
            EzString.encodeHtml(ezUi.ezGetInputValue('_EmployerName')),
            null,
            null,
            null,
            null).then(self.signUpSuccess, self.signUpError);
    }

    signUpSuccess(result) {
        const self = EzEmployerSignupViewController.ezInstance;

        ezApi.ezclocker.ezmMobileHelper.ezmStopPageWait();

        if (ezApi.ezIsValid(result) && 0 !== result.errorCode) {
            self.showErrorMessage(ezApi.ezclocker.ezmMobileHelper.uhOhMessageSignUp);
            return;
        }

        ezApi.ezclocker.ezGoogleAnalytics.logEvent('Employer Sign Up', 'Mobile', 'Success');

        self.ezRecordUtmParams().then(function() {
            self.showNextStepMessage();
        });
    }

    signUpError(eResponse) {
        const self = EzEmployerSignupViewController.ezInstance;

        ezApi.ezclocker.ezmMobileHelper.ezmStopPageWait();
        if (ezApi.isNotEmptyString(eResponse.message)) {
            self.showErrorMessage(eResponse.message);
            ezApi.ezclocker.ezGoogleAnalytics.logEvent('Employer Sign Up', 'Mobile', eResponse.message);
            return;
        }
        ezApi.ezclocker.ezGoogleAnalytics.logEvent('Sign Up', 'Mobile Employer Sign Up',
            ezApi.ezclocker.ezmMobileHelper.uhOhMessageSignUp);
        self.showErrorMessage(ezApi.ezclocker.ezmMobileHelper.uhOhMessageSignUp);
    }

    /**
     * @private
     * Records the UTM params settings for signup
     */
    ezRecordUtmParams() {
        return ezApi.ezPromise(
            (resolve) => {
                let medium = ezApi.ezclocker.ezUrlHelper.getUrlParam(ezApi.ezclocker.ezUtmTagMapService.UTM_TAG_NAMES.UTM_MEDIUM);
                let source = ezApi.ezclocker.ezUrlHelper.getUrlParam(ezApi.ezclocker.ezUtmTagMapService.UTM_TAG_NAMES.UTM_SOURCE);
                let campaign = ezApi.ezclocker.ezUrlHelper.getUrlParam(ezApi.ezclocker.ezUtmTagMapService.UTM_TAG_NAMES.UTM_CAMPAIGN);
                if (ezApi.ezIsEmptyString(medium) && ezApi.ezIsEmptyString(source) && ezApi.ezIsEmptyString(campaign)) {
                    return resolve();
                }

                ezApi.ezclocker.ezUtmTagMapService.ezSaveUtmTagMap(
                    null /* employer id */,
                    null /* employee id */,
                    null /* user id */,
                    ezUi.ezGetInputValue('_EmailAddress').trim() /* email address */,
                    medium,
                    source,
                    campaign)
                    .then(
                        resolve,
                        (eResponse) => {
                            ezApi.ezclocker.logger.error('Failed to record the UTM params for sign up. ' +
                                ezApi.ezToJson(eResponse, 3));
                            return resolve();
                        });
            });
    }

    showNextStepMessage() {
        if (ezApi.ezclocker.ezmMobileHelper.ezmIsAndriod()) {
            $.mobile.pageContainer.pagecontainer('change', '#_DownloadAndriod');
            return;
        }
        if (ezApi.ezclocker.ezmMobileHelper.ezmIsIos()) {
            $.mobile.pageContainer.pagecontainer('change', '#_DownloadiPhone');
            return;
        }
        window.alert('Success! You can now sign in to the mobile website!');
        navigateTo('m.signin.html?email=' + ezApi.ezId('emailAddress').val());
    }

    signInMobileWebsite() {
        $.mobile.pageContainer.pagecontainer('change', 'm.signin.html?email=' + ezApi.ezId('emailAddress').val(), {
            transition: 'fade',
            changeHash: false,
            reload: true
        });
    }

    introduceAndNavigateToNativeEmployerApps(e, p) {
        ezApi.ezclocker.ezmMobileHelper.ezmStartPageWait('taking you to the app store', 'a');
        if (ezApi.ezclocker.ezmMobileHelper.ezmIsAndriod()) {
            ezApi.ezclocker.ezmNav.ezmNavToGoooglePlayStore(true);
        }
        if (ezApi.ezclocker.ezmMobileHelper.ezmIsIos()) {
            ezApi.ezclocker.ezmNav.ezmNavToIosAppStore(e, p);
        }
        ezApi.ezclocker.ezmMobileHelper.ezmStopPageWait();
    }
}

export {
    EzEmployerSignupViewController
};
