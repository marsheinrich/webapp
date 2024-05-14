import {
    EzObject,
    EzBoolean,
    EzString,
    EzHtml,
    EzUrl
} from '/ezlibrary/helpers/EzHelpers.js';

import {
    EzRegistrationState,
    EzElementEventName
} from '/ezlibrary/enums/EzEnumerations.js';

import { EzClass } from '/ezlibrary/EzClass.js';

import { EzEventEngine } from '/ezlibrary/ez-event-engine.js';

import { EzLocalBrowserInfo } from '/ezlibrary/analytics_metrics/EzLocalBrowserInfo.js';

import {
    EzCookies,
    EzClockerCookieName
} from '/public/javascript/common/ez-cookies.js';
import { EzLayoutHelper } from '/public/javascript/common/ezclocker-layout-helper.js';
import { EzUrlHelper } from '/public/javascript/common/ezclocker-url-helper2.js';
import { EzNavigation } from '/public/javascript/common/ezclocker-navigation-helper.js';
import { EzBrowserInfo } from '/public/javascript/common/ezclocker-mobile-helper.js';
import { EzUI } from '/public/javascript/common/ezui.js';
import { EzAnimator } from '/ezlibrary/ez-animator.js';
import { EzRequestPasswordResetDialog } from '/public/webcomponents/EzRequestPasswordResetDialog/ez-request-password-reset-dialog.js';

import { EzValidationResponseStatus } from '/ezlibrary/EzValidationResponse.js';
import { EzValidation } from '/public/javascript/common/ez-validation.js';

import { EzAnalyticsAndMetrics } from '/ezlibrary/analytics_metrics/EzAnalyticsAndMetrics.js';

/**
 * @class
 * @extends {EzClass}
 * @description
 * Controller/view for ezClocker Sign-in page
 * ---------------------------------------------------------------------------
 * Import with:
 *     import { EzSignInView } from '/public/signin/ez-signin.js';
 * ---------------------------------------------------------------------------
 * Singleton instance ready for use when the below evaluates to true:
 *     globalThis.ezApi.ezclocker[EzSignInView.ezApiName] &&
 *     globalThis.ezApi.ezclocker[EzSignInView.ezApiName].ready
 * ---------------------------------------------------------------------------
 * Listen to onReady event:
 *     document.addEventListener(
 *         EzSignInView.ezEventNames.onReady,
 *         this.#ezRegistrator);
 * ---------------------------------------------------------------------------
 * Singleton Instance Reference:
 *     Inside this class: EzSignInView.ezInstance
 *     Outside this class: ezApi.ezclocker.ezSignInView
 * ---------------------------------------------------------------------------
 */
export class EzSignInView extends EzClass {
    /**
     * @private @field
     * Stores the remember me option
     * @type {boolean}
     */
    #ezRememberMe = false;
    /**
     * @public @property @getter
     * Gets the remember me option
     * @returns {boolean}
     */
    get ezRememberMe() {
        return this.#ezRememberMe;
    }
    /**
     * @public @property @setter
     * Sets the remember me option
     * @param {boolean} ezRememberMe
     */
    set ezRememberMe(ezRememberMe) {
        this.#ezRememberMe = EzBoolean.booleanOrFalse(ezRememberMe);
    }

    /**
     * @private @field
     * Stores the current user name
     * @type {string}
     */
    #ezCurrentUserName = EzString.EMPTY;
    /**
     * @public @property @getter
     * Gets the current user name
     * @returns {string}
     */
    get ezCurrentUserName() {
        return this.#ezCurrentUserName;
    }
    /**
     * @public @property @setter
     * Sets the current user name
     * @param {string} error
     */
    set ezCurrentUserName(ezCurrentUserName) {
        this.#ezCurrentUserName = EzString.stringOrEmpty(ezCurrentUserName);
    }

    /**
     * @private @field
     * Stores the error message to display
     * @type {string}
     */
    #error = null;
    /**
     * @public @property @getter
     * Gets the error message to display
     * @returns {string}
     */
    get error() {
        return this.#error;
    }
    /**
     * @public @property @setter
     * Sets the error message to display
     * @param {string} error
     */
    set error(error) {
        this.#error = EzString.stringOrEmpty(error);
    }

    /**
     * @private @field
     * Stores the email to auto-fill
     * @type {string}
     */
    #email = null;
    /**
     * @public @property @getter
     * Gets the email to auto-fill
     * @returns {string}
     */
    get email() {
        return this.#email;
    }
    /**
     * @public @property @setter
     * Sets the email to auto-fill
     * @param {string} error
     */
    set email(email) {
        this.#email = EzString.stringOrEmpty(email);
    }

    /**
     * @public @readonly @property
     * @returns {object}
     */
    get ezIds() {
        return {
            pageBodyId: 'EzPageBody',
            pageHeaderId: 'EzPageHeader',
            pageContentId: 'EzPageContent',
            forms: {
                ezSignInFormId: 'EzClockerSignInForm'
            },
            containers: {
                ezSignInDialogContainerId: 'EzSignInDialogContainer',
                hideDialogsContainerId: 'EzHideDialogsDiv',
                signInContainerId: 'EzSignInContainer',
                signInBoxId: '_SignInBox',
                signInErrorTopId: 'EzSignInErrorTop',
                signInErrorBottomId: 'EzSignInErrorBottom',
                welcomeBackSubBannerId: 'EzWelcomeBackSubBanner'
            },
            links: {
                forgotPasswordLinkId: 'EzForgotPasswordLink',
                signUpLinkId: 'EzSignUpLink'
            },
            buttons: {
                signInButtonId: 'EzSignInButton',
                cancelButtonId: 'EzCancelSignInButton',
                passwordHideButtonId: 'EzPasswordHideButton',
                passwordShowButtonId: 'EzPasswordShowButton'
            },
            images: {
                showPasswordImg: 'EzShowPasswordImg',
                hidePasswordImg: 'EzHidePasswordImg'
            },
            inputs: {
                rememberEmailCheckboxId: 'EzRememberEmail',
                rememberMeCheckboxId: 'remember-me',
                userNameInputId: 'j_username',
                passwordInputId: 'j_password'
            }
        };
    }

    /**
     * @public @readonly @property
     * Returns the mobile sign-in page url
     * @returns {string}
     */
    get mobilePagePath() {
        return ezApi.ezclocker.ezNavigation.ezRemoveVersionFromUri(
            `p/download${ezApi.ezclocker.ezUrlHelper.ezGetWindowLocationSearch()}`);
    }

    /**
     * @public @readonly @property
     * Returns EzSigninView's page header html
     * @returns {string}
     */
    get ezSignInViewPageHeaderHTML() {
        return EzHtml.build`
            <div
                id="${EzSignInView.ezInstance.ezIds.pageHeaderId}"
                class="ezPageHeader-ezClockerWhite ez-bottom-shadow">
                <a
                    id="EzPageHeaderLogoLink"
                    href="#"
                    onclick="ezApi.ezclocker.ezNavigation.ezNavigateToMain();">
                    <img
                        id="EzPageHeaderLogo"
                        class="ezPageHeaderLogo"
                        src="/public/images/logos/ezclocker_logo_2015.svg"
                        alt="ezClocker"/>
                </a>
            </div>`;
    }

    /**
     * @public @readonly @property
     * Builds the HTML sign-in form
     * @returns {string}
     */
    get ezSigninDialogHtml() {
        return EzHtml.build`
            <div
                id="EzSignInDialogContainer"
                class="animate__animated animate__fadeIn"
                style="display:none">
                <form
                    id="${EzSignInView.ezInstance.ezIds.forms.ezSignInFormId}"
                    action="${ezApi.ezclocker.ezNavigation.ezGetSigninUrl()}"
                    method="POST">
                    <div
                        id="EzSignInContainer"
                        class="ezFixedDialogBox">
                        <div
                            class="ezFixedDialogBanner ezGrid-align-center">
                            Sign In
                            <div
                                id="EzWelcomeBackSubBanner"
                                class="ezFixedDialogSubBanner"
                                style="display:none">
                                Welcome back!
                            </div>
                        </div>
                        <div
                            id="EzSignInErrorTop"
                            class="ezErrorBox"
                            style="display:none">
                        </div>
                        <input
                            id="EzMobile"
                            type="checkbox"
                            name="mobile"
                            style="display:none" />
                        <div
                            class="ezContainers-large-input-box">
                            <label
                                class="ezMajorInputLabel"
                                for="${EzSignInView.ezInstance.ezIds.inputs.userNameInputId}"">
                                Email Address or Phone Number
                            </label>
                            <input
                                id="${EzSignInView.ezInstance.ezIds.inputs.userNameInputId}""
                                class="ezLargeInputEditor ezFullWidthEditor"
                                type="text"
                                name="${EzSignInView.ezInstance.ezIds.inputs.userNameInputId}"/>
                        </div>
                        <div
                            id="EzSignInPasswordInputContainer"
                            class="ezContainers-large-input-box">
                            <label
                                class="ezMajorInputLabel"
                                for="${EzSignInView.ezInstance.ezIds.inputs.passwordInputId}">
                                Password
                            </label>
                            <div
                                id="EzSignInPasswordInputLayoutContainer"
                                class="ezAutoCol_AxMin ezGrid-align-full ezGrid-vertical-align-middle ezGrid-col-gap_8">
                                <input
                                    id="${EzSignInView.ezInstance.ezIds.inputs.passwordInputId}"
                                    class="ezLargeInputEditor ezFullWidthEditor"
                                    name="${EzSignInView.ezInstance.ezIds.inputs.passwordInputId}"
                                    type="password"
                                    autocomplete="new-password"/>
                                <div
                                    id="EzToggleShowHidePasswordContainer"
                                    class="ezGrid-align-middle-center">
                                    <button
                                        id="${EzSignInView.ezInstance.ezIds.buttons.passwordShowButtonId}"
                                        class="ezButtons-tool-navy-large"
                                        type="button"
                                        title="Show Password">
                                        <img
                                            id="${EzSignInView.ezInstance.ezIds.images.showPasswordImg}"
                                            class="ezPasswordShowHideImg"
                                            src="/public/images/icons/view-white.svg"/>
                                        <img
                                            id="${EzSignInView.ezInstance.ezIds.images.hidePasswordImg}"
                                            class="ezPasswordShowHideImg"
                                            src="/public/images/icons/hide-view-white.svg"
                                            style="display:none"/>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div
                            id="EzRememberMeCheckboxInputContainer"
                            class="ezContainers-large-input-box">
                            <div>
                                <input
                                    id="${EzSignInView.ezInstance.ezIds.inputs.rememberMeCheckboxId}"
                                    type="checkbox"
                                    name="${EzSignInView.ezInstance.ezIds.inputs.rememberMeCheckboxId}"
                                    checked style="display:none"/>
                                <input
                                    id="${EzSignInView.ezInstance.ezIds.inputs.rememberEmailCheckboxId}"
                                    type="checkbox"
                                    name="${EzSignInView.ezInstance.ezIds.inputs.rememberEmailCheckboxId}"/>
                                <label
                                    for="${EzSignInView.ezInstance.ezIds.inputs.rememberEmailCheckboxId}">
                                    Remember my user name or email address for seven days.
                                </label>
                            </div>
                        </div>
                        <div
                            id="EzSignInErrorBottom"
                            class="ezErrorBox"
                            style="display:none">
                        </div>
                        <div
                            id="EzSignInButtonContainer"
                            class="ezAutoCol_A">
                            <div
                                class="ezRightAlignedButtonContainer">
                                <button
                                    id="${EzSignInView.ezInstance.ezIds.buttons.signInButtonId}"
                                    class="ezButtons-action-ezActionGreen ezMiddleAlign"
                                    type="submit">
                                    Sign In
                                </button>
                                <button
                                    id="${EzSignInView.ezInstance.ezIds.buttons.cancelButtonId}"
                                    class="ezButtons-action-ezClockerYellow ezMiddleAlign"
                                    type="button">
                                    Cancel
                                </button>
                            </div>
                        </div>
                        <hr/>
                        <div
                            id="EzForgotPasswordContainer"
                            class="ezCenterAlignedContainer">
                            <a
                                id="${EzSignInView.ezInstance.ezIds.links.forgotPasswordLinkId}"
                                href="#"
                                class="ezLargeNavyLink">
                                Forgot your password?
                            </a>
                        </div>
                        <div
                            id="EzSignUpContainer"
                            class="ezCenterAlignedContainer">
                            Don't have an account?
                            <a
                                id="EzSignUpLink"
                                href="#"
                                class="ezLargeNavyLink">
                                Sign Up for free!
                            </a>
                        </div>
                    </div>
                </form>
            </div>`;
    }

    /**
     * @public @method
     * Initializes EzSignInView
     * @returns {EzSignInView}
     */
    ezInit() {
        ezApi.ezclocker.ezEventEngine.ezWantEvent(
            EzSignInView.ezApiName,
            EzRequestPasswordResetDialog.ezEventNames.onResetPasswordSubmitted,
            EzSignInView.ezInstance.ezShow);

        ezApi.ezclocker.ezEventEngine.ezWantEvent(
            EzSignInView.ezApiName,
            EzRequestPasswordResetDialog.ezEventNames.onResetPasswordCanceled,
            EzSignInView.ezInstance.ezShow);

        ezApi.ezclocker.ezEventEngine.ezWantEvent(
            EzSignInView.ezApiName,
            EzRequestPasswordResetDialog.ezEventNames.onResetPasswordError,
            EzSignInView.ezInstance.ezShow);

        EzSignInView.ezInstance.ezRememberMe = false;

        EzSignInView.ezInstance.ezCurrentUserName = EzString.EMPTY;

        EzSignInView.ezInstance.ezError = EzString.EMPTY;

        EzSignInView.ezInstance.ezInitUX();

        return EzSignInView.ezInstance;
    }

    /**
     * @protected @method
     * Resets the dialog to its default state
     */
    ezResetDialog() {
        ezApi.ezclocker.ezUi.ezHideElement(EzSignInView.ezInstance.ezIds.containers.welcomeBackSubBannerId);

        EzSignInView.ezInstance.ezHideSignInErrorBox();

        ezApi.ezclocker.ezUi.ezSetInputValue(EzSignInView.ezInstance.ezIds.inputs.passwordInputId, EzString.EMPTY);

        ezApi.ezclocker.ezUi.ezGetInputValue(EzSignInView.ezInstance.ezIds.inputs.userNameInputId, EzString.EMPTY);

        ezApi.ezclocker.ezUi.ezSetCheckboxValue(EzSignInView.ezInstance.ezIds.inputs.rememberEmailCheckboxId, false);
    }

    /**
     * @protected @method
     * Initializes the view's UX
     */
    ezInitUX() {
        if (ezApi.ezclocker.ezBrowserInfo.ezRedirectIfMobilePhone(EzSignInView.ezInstance.mobilePagePath)) {
            return;
        }

        ezApi.ezclocker.ezUi.ezAppendContent(
            EzSignInView.ezInstance.ezIds.pageBodyId,
            EzHtml.build`
                <div
                    id="${EzSignInView.ezInstance.ezIds.pageContentId}">
                    ${EzSignInView.ezInstance.ezSignInViewPageHeaderHTML}
                    ${EzSignInView.ezInstance.ezSigninDialogHtml}
                </div>`);

        ezApi.ezclocker.ezUi.ezSetCheckboxValue(
            EzSignInView.ezInstance.ezIds.inputs.rememberEmailCheckboxId,
            false);

        EzSignInView.ezInstance.ezSigninError = ezApi.ezclocker.ezUrlHelper.getErrorParam();

        if (EzString.hasLength(EzSignInView.ezInstance.ezCurrentUserName)) {
            ezApi.ezclocker.ezUi.ezSetInputValue(
                EzSignInView.ezInstance.ezIds.inputs.userNameInputId,
                EzSignInView.ezInstance.ezCurrentUserName);
        }

        ezApi.ezclocker.ezEventEngine.ezWantElementEvent(
            EzSignInView.ezInstance.ezIds.inputs.userNameInputId,
            EzElementEventName.BLUR,
            EzSignInView.ezApiName,
            EzSignInView.ezInstance.ezHandleUsernameInputBlurEvent);

        ezApi.ezclocker.ezEventEngine.ezWantElementEvent(
            EzSignInView.ezInstance.ezIds.inputs.passwordInputId,
            EzElementEventName.BLUR,
            EzSignInView.ezApiName,
            EzSignInView.ezInstance.ezHandlePasswordInputBlurEvent);

        ezApi.ezclocker.ezEventEngine.ezWantElementEvent(
            EzSignInView.ezInstance.ezIds.buttons.passwordShowButtonId,
            EzElementEventName.CLICK,
            EzSignInView.ezApiName,
            EzSignInView.ezInstance.ezToggleShowHidePassword);

        ezApi.ezclocker.ezEventEngine.ezWantElementEvent(
            EzSignInView.ezInstance.ezIds.buttons.signInButtonId,
            EzElementEventName.CLICK,
            EzSignInView.ezApiName,
            EzSignInView.ezInstance.ezSubmit);

        ezApi.ezclocker.ezEventEngine.ezWantElementEvent(
            EzSignInView.ezInstance.ezIds.buttons.cancelButtonId,
            EzElementEventName.CLICK,
            EzSignInView.ezApiName,
            EzSignInView.ezInstance.ezCancel);

        document.onkeydown = EzSignInView.ezInstance.ezHandleEnterKey;

        ezApi.ezclocker.ezEventEngine.ezWantElementEvent(
            EzSignInView.ezInstance.ezIds.links.forgotPasswordLinkId,
            EzElementEventName.CLICK,
            EzSignInView.ezApiName,
            EzSignInView.ezInstance.ezShowRequestPasswordReset);

        ezApi.ezclocker.ezEventEngine.ezWantElementEvent(
            EzSignInView.ezInstance.ezIds.links.signUpLinkId,
            EzElementEventName.CLICK,
            EzSignInView.ezApiName,
            () => ezApi.ezclocker.ezNavigation.navigateToPublicPage('signup.html'));

        ezApi.ezclocker.ezLayoutHelper.sizeContentHeightWithinContainer('window', 'EzPage');

        ezApi.ezclocker.ezEventEngine.ezWantElementEvent(
            'window',
            EzElementEventName.RESIZE,
            EzSignInView.ezApiName,
            () => ezApi.ezclocker.ezLayoutHelper.sizeContentHeightWithinContainer('window', 'EzPage'));

        ezApi.ezclocker.ezEventEngine.ezWantElementEvent(
            EzSignInView.ezInstance.ezIds.links.signUpLinkId,
            EzElementEventName.CLICK,
            EzSignInView.ezApiName,
            () => ezApi.ezclocker.ezNavigation.ezNavigateToSignUp(
                ezApi.ezclocker.ezUi.ezGetInputValue(EzSignInView.ezInstance.ezIds.inputs.userNameInputId).trim()));

        EzSignInView.ezInstance.ezShow();
    }

    /**
     * @public @method
     * Shows the sign-in view
     */
    ezShow() {
        EzSignInView.ezInstance.ezResetDialog();

        EzSignInView.ezInstance.ezLoadCookies();

        ezApi.ezclocker.ezUi.ezShowElement(EzSignInView.ezInstance.ezIds.containers.ezSignInDialogContainerId);

        let focusInputId = !EzString.hasLength(
            ezApi.ezclocker.ezUi.ezGetInputValue(EzSignInView.ezInstance.ezIds.inputs.userNameInputId).trim())
            ? EzSignInView.ezInstance.ezIds.inputs.userNameInputId
            : EzSignInView.ezInstance.ezIds.inputs.passwordInputId;

        ezApi.ezclocker.ezUi.ezFocusInput(focusInputId);

        EzSignInView.ezInstance.ezCurrentUserName = ezApi.ezclocker.ezUi.ezGetInputValue(
            EzSignInView.ezInstance.ezIds.inputs.userNameInputId);

        EzSignInView.ezInstance.ezPassword = ezApi.ezclocker.ezUi.ezGetInputValue(
            EzSignInView.ezInstance.ezIds.inputs.passwordInputId);

        if (EzString.hasLength(EzSignInView.ezInstance.ezSigninError)) {
            EzSignInView.ezInstance.ezShowSignInErrorBox(
                EzUrl.decodeURL(EzSignInView.ezInstance.ezSigninError));
        }
    }

    /**
     * @public @method
     * Hides the dialog without submitting data
     */
    ezClose() {
        EzSignInView.ezInstance.ezResetDialog();
    }

    /**
     * @public @method
     */
    ezCancel() {
        EzSignInView.ezInstance.ezClose();

        ezApi.ezclocker.ezNavigation.ezSilentSignOut()
            .then(
                ezApi.ezclocker.ezNavigation.ezNavigateToMain,
                ezApi.ezclocker.ezNavigation.ezNavigateToMain);
    }

    /**
     * @public @method
     * Handles the sign-in submit button click
     */
    ezSubmit() {
        if (EzBoolean.isFalse(EzSignInView.ezInstance.ezValidateSignInFields())) {
            // Not valid, do not submit
            return false;
        }

        EzSignInView.ezInstance.ezSaveCookies();

        ezApi.ezclocker.ezUi.ezSubmitForm(EzSignInView.ezInstance.ezIds.forms.ezSignInFormId);

        return true;
    }

    /**
     * @protected @method
     * Handles the checkbox change for remember me
     * @param {object} ezEvent
     */
    ezHandleRememberMeChange(ezEvent) {
        EzSignInView.ezInstance.ezRememberMe = EzObject.isValid(ezEvent) && EzObject.isValid(ezEvent.data.event.currentTarget)
            ? ezEvent.data.event.currentTarget.checked
            : false;
    }

    /**
     * @protected @method
     * Saves the user name + remember me settings to the cookies.
     */
    ezSaveCookies() {
        EzSignInView.ezInstance.ezCurrentUserName = ezApi.ezclocker.ezUi.ezGetInputValue(EzSignInView.ezInstance.ezIds.inputs.userNameInputId);

        EzSignInView.ezInstance.ezRememberMe = ezApi.ezclocker.ezUi.ezIsCheckBoxChecked(EzSignInView.ezInstance.ezIds.inputs.rememberEmailCheckboxId);

        if (EzBoolean.isTrue(EzSignInView.ezInstance.ezRememberMe)) {
            ezApi.ezclocker.ezCookies.ezSetPathExpiryCookie(
                EzClockerCookieName.REMEMBER_ME,
                true);

            ezApi.ezclocker.ezCookies.ezSetPathExpiryCookie(
                EzClockerCookieName.USER_NAME,
                EzSignInView.ezInstance.ezCurrentUserName);
        } else {
            ezApi.ezclocker.ezCookies.ezSetPathExpiryCookie(
                EzClockerCookieName.REMEMBER_ME,
                false);

            ezApi.ezclocker.ezCookies.ezSetPathExpiryCookie(
                EzClockerCookieName.USER_NAME,
                EzString.EMPTY);
        }
    }

    /**
     * @protected @method
     * Loads dialog values from cookies (if any)
     */
    ezLoadCookies() {
        EzSignInView.ezInstance.ezRememberMe = EzBoolean.isTrue(
            ezApi.ezclocker.ezCookies.ezReadCookie(EzClockerCookieName.REMEMBER_ME));

        ezApi.ezclocker.ezUi.ezSetCheckboxValue(
            EzSignInView.ezInstance.ezIds.inputs.rememberEmailCheckboxId,
            EzSignInView.ezInstance.ezRememberMe);

        EzSignInView.ezInstance.ezCurrentUserName = EzString.stringOrEmpty(ezApi.ezclocker.ezUrlHelper.getEmailParam());

        if (!EzString.hasLength(EzSignInView.ezInstance.ezCurrentUserName)) {
            EzSignInView.ezInstance.ezCurrentUserName = EzString.stringOrEmpty(ezApi.ezclocker.ezCookies.ezReadCookie(EzClockerCookieName.USER_NAME));
        }

        if (EzString.hasLength(EzSignInView.ezInstance.ezCurrentUserName)) {
            ezApi.ezclocker.ezUi.ezShowElement(EzSignInView.ezInstance.ezIds.containers.welcomeBackSubBannerId);

            ezApi.ezclocker.ezUi.ezSetInputValue(
                EzSignInView.ezInstance.ezIds.inputs.userNameInputId,
                EzSignInView.ezInstance.ezCurrentUserName);
        }
    }

    /**
     * @protected @method
     * Shows the password reset dialog
     */
    ezShowRequestPasswordReset() {
        ezApi.ezclocker.ezRequestPasswordResetDialog.ezShow(
            ezApi.ezclocker.ezUi.ezGetInputValue(EzSignInView.ezInstance.ezIds.inputs.userNameInputId).trim());
    }

    /**
     * @protected @method
     * Validates the sign-in fields.
     */
    ezValidateSignInFields() {
        EzSignInView.ezInstance.ezHideSignInErrorBox();
        EzSignInView.ezInstance.ezHideUsernameError();
        EzSignInView.ezInstance.ezHidePasswordError();

        EzSignInView.ezInstance.ezPassword = EzString.stringOrEmpty(
            ezApi.ezclocker.ezUi.ezGetInputValue(EzSignInView.ezInstance.ezIds.inputs.passwordInputId));

        // Trim the username...
        EzSignInView.ezInstance.ezCurrentUserName = EzString.stringOrEmpty(
            ezApi.ezclocker.ezUi.ezGetInputValue(EzSignInView.ezInstance.ezIds.inputs.userNameInputId)).trim();

        if (EzSignInView.ezInstance.ezCurrentUserName !== ezApi.ezclocker.ezUi.ezGetInputValue(EzSignInView.ezInstance.ezIds.inputs.userNameInputId)) {
            ezApi.ezclocker.ezUi.ezSetInputValue(
                EzSignInView.ezInstance.ezIds.inputs.userNameInputId,
                EzSignInView.ezInstance.ezCurrentUserName);
        }

        let isValid = true;

        let ezValidationResponse = ezApi.ezclocker.ezValidation.ezValidateUsername(EzSignInView.ezInstance.ezCurrentUserName, true);

        if (EzValidationResponseStatus.VALID !== ezValidationResponse.ezStatus) {
            EzSignInView.ezInstance.ezShowUsernameError('Please enter the user name or mobile phone number you used to sign-up.');
            isValid = false;
        }

        ezValidationResponse = ezApi.ezclocker.ezValidation.ezValidateLegacyPassword(EzSignInView.ezInstance.ezPassword, true);

        if (EzValidationResponseStatus.VALID !== ezValidationResponse.ezStatus) {
            EzSignInView.ezInstance.ezShowPasswordError(`Please enter the password you created when you signed-up.`);
            isValid = false;
        }

        return isValid;
    }

    /**
     * @protected @method
     * Handles the Username input's OnBlur event
     */
    ezHandleUsernameInputBlurEvent() {
        EzSignInView.ezInstance.ezHideUsernameError();
    }

    /**
     * @protected @method
     * Highlights the username input box and shows the provided error message.
     */
    ezShowUsernameError(msg) {
        ezApi.ezclocker.ezUi.ezShowInputError(EzSignInView.ezInstance.ezIds.inputs.userNameInputId);
        EzSignInView.ezInstance.ezShowSignInErrorBox(msg.replaceAll('+', ' '));
    }

    /**
     * @protected @method
     * Returns the username input box to it's non-error state.
     */
    ezHideUsernameError() {
        ezApi.ezclocker.ezUi.ezHideInputError(EzSignInView.ezInstance.ezIds.inputs.userNameInputId);
    }

    /**
     * @protected @method
     * Handles the password input's OnBlur event
     */
    ezHandlePasswordInputBlurEvent() {
        EzSignInView.ezInstance.ezHidePasswordError();
    }

    /**
     * @protected @method
     * Highlights the password input box and shows the provided error message.
     */
    ezShowPasswordError(msg) {
        ezApi.ezclocker.ezUi.ezShowInputError(EzSignInView.ezInstance.ezIds.inputs.passwordInputId);
        EzSignInView.ezInstance.ezShowSignInErrorBox(msg.replaceAll('+', ' '));
    }

    /**
     * @protected @method
     * Returns the password input box to it's non-error state.
     */
    ezHidePasswordError() {
        ezApi.ezclocker.ezUi.ezHideInputError(EzSignInView.ezInstance.ezIds.inputs.passwordInputId);
    }


    /**
     * @protected @method
     * Shows the error message box
     * @param {String} em
     */
    ezShowSignInErrorBox(em) {
        if (!EzString.hasLength(em)) {
            return;
        }

        em = em.replaceAll('+', ' ')
            .replaceAll(
                'RESET_YOUR_PASSWORD_LINK',
                EzHtml.build`
                    <a
                        id="EzSignInErrorResetPasswordLink"
                        href="#"
                        onclick="ezApi.ezclocker.ezSignInView.ezShowRequestPasswordReset()">
                        reset your password
                    </a>`);

        let currentEm = ezApi.ezclocker.ezUi.ezGetElementContent(EzSignInView.ezInstance.ezIds.containers.signInErrorTopId);

        em = EzString.hasLength(currentEm)
            ? EzHtml.build`
                ${currentEm}
                <div>
                    ${em}
                </div>`
            : EzHtml.build`
                <div>
                    ${em}
                </div>`;

        ezApi.ezclocker.ezUi.ezContent(
            EzSignInView.ezInstance.ezIds.containers.signInErrorTopId,
            em);

        ezApi.ezclocker.ezUi.ezShowElement(EzSignInView.ezInstance.ezIds.containers.signInErrorTopId);

        ezApi.ezclocker.ezUi.ezContent(EzSignInView.ezInstance.ezIds.containers.signInErrorBottomId, em);

        ezApi.ezclocker.ezUi.ezShowElement(EzSignInView.ezInstance.ezIds.containers.signInErrorBottomId);
    }

    /**
     * @protected @method
     * Hides the error message box.
     */
    ezHideSignInErrorBox() {
        ezApi.ezclocker.ezUi.ezClearElement(EzSignInView.ezInstance.ezIds.containers.signInErrorTopId);

        ezApi.ezclocker.ezUi.ezHideElement(EzSignInView.ezInstance.ezIds.containers.signInErrorTopId);

        ezApi.ezclocker.ezUi.ezClearElement(EzSignInView.ezInstance.ezIds.containers.signInErrorBottomId);

        ezApi.ezclocker.ezUi.ezHideElement(EzSignInView.ezInstance.ezIds.containers.signInErrorBottomId);
    }

    /**
     * @protected @method
     * @param {object} event
     */
    ezHandleEnterKey(event) {
        if (13 == event.keyCode || 13 == event.which) {
            EzSignInView.ezInstance.ezSubmit();
        }
    }

    /**
     * @protected @method
     * Handles the password show/hide button click to toggle showing the password
     */
    ezToggleShowHidePassword() {
        let passwordInputEditor = ezApi.ezclocker.ezUi.ezFindByElementOrId(EzSignInView.ezInstance.ezIds.inputs.passwordInputId);

        if (!EzObject.isValid(passwordInputEditor)) {
            // Could not find the element, ignore the call
            ezApi.ezclocker.ezLogger.error('Unable to toggle show/hide password: Password input not available.');

            return;
        }

        let passwordVisible = passwordInputEditor.type === "text";

        passwordInputEditor.type = passwordVisible
            ? 'password'
            : 'text';

        ezApi.ezclocker.ezUi.ezSetElementTitle(
            EzSignInView.ezInstance.ezIds.buttons.passwordShowButtonId,
            passwordVisible
                ? 'Show Password'
                : 'Hide Password');

        ezApi.ezclocker.ezUi.ezHideElement(
            passwordVisible
                ? EzSignInView.ezInstance.ezIds.images.hidePasswordImg
                : EzSignInView.ezInstance.ezIds.images.showPasswordImg);

        ezApi.ezclocker.ezUi.ezShowElement(
            passwordVisible
                ? EzSignInView.ezInstance.ezIds.images.showPasswordImg
                : EzSignInView.ezInstance.ezIds.images.hidePasswordImg);
    }

    /*
    =========================================================================================================================
    Start of EzClocker Class Initialization and EzApi Registration Section
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    !! FROM THIS POINT FORWARD: ONLY PLACE INITIALIZATION CODE !!
    || All other class code MUST go above this section. ||
    =========================================================================================================================
    */

    /**
     * @static
     * @public @readonly @property
     * Returns the name of this class's singleton instance when registered with ezApi.
     * @returns {string}
     */
    static get ezApiName() {
        return 'ezSignInView';
    }

    /**
     * @static
     * @public @readonly @property
     * Returns an object of event names that this class may trigger.
     * @returns {object}
     */
    static get ezEventNames() {
        return {
            onReady: 'ezOn_EzSignInView_Ready'
        };
    }

    /**
     * @static
     * @private @field
     * Stores the singleton instance of this class that was created by and registerd with EzApi.
     * @type {EzSignInView}
     */
    static #ezInstance = EzObject.hasProperty(globalThis, 'ezApi') &&
        EzObject.isValid(globalThis.ezApi) && EzBoolean.isTrue(globalThis.ezApi.ready) &&
        EzObject.isValid(globalThis.ezApi.ezclocker[EzSignInView.ezApiName])
        ? globalThis.ezApi.ezclocker[EzSignInView.ezApiName]
        : null;

    /**
     * @static
     * @public @property @getter
     * Returns the singleton instance of this class that is registered with EzApi (if available yet)
     * @returns {EzSignInView}
     */
    static get ezInstance() {
        return EzSignInView.#ezInstance;
    }

    /**
     * @static
     * @public @property @setter
     * Sets the singleton instance of of this class that is registered with EzApi.
     * @param {EzSignInView} ezInstance
     */
    static set ezInstance(ezInstance) {
        if (null != EzSignInView.#ezInstance) {
            throw new Error('EzSignInView\'s singleton instance is already reigstered with EzApi.');
        }

        EzSignInView.#ezInstance = ezInstance;
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
    static #ezApiRegistrationState = EzObject.hasProperty(globalThis, 'ezApi') &&
        EzObject.isValid(globalThis.ezApi) && EzBoolean.isTrue(globalThis.ezApi.ready) &&
        EzObject.isValid(globalThis.ezApi.ezclocker[EzSignInView.ezApiName])
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
        return EzSignInView.#ezApiRegistrationState;
    }

    /**
     * @static
     * @public @property @setter
     * Sets the ezApi registration state of this classes's singleton instance.
     * @param {string} ezApiRegistrationState
     * A valid enum property value from EzRegistrationState
     */
    static set ezApiRegistrationState(ezApiRegistrationState) {
        EzSignInView.#ezApiRegistrationState = EzRegistrationState.ezValueOf(ezApiRegistrationState);
    }

    /**
     * @static
     * @private @readonly @property
     * Returns true when all required dependencies for this class report ready.
     * In otherwords, the require dependency's singleton instance is created
     * and is registered with and accessable from EzApi with ezApi.ezclocker.{dependency_name}.
     * @returns {boolean}
     */
    static get #ezCanRegister() {
        return EzRegistrationState.PENDING === EzSignInView.ezApiRegistrationState &&
            EzObject.hasProperty(globalThis, 'ezApi') &&
            EzObject.isValid(globalThis.ezApi) && EzBoolean.isTrue(globalThis.ezApi.ready) &&

            globalThis.ezApi.ezclocker[EzCookies.ezApiName] &&
            globalThis.ezApi.ezclocker[EzCookies.ezApiName].ready &&

            globalThis.ezApi.ezclocker[EzElementEventName.ezApiName] &&
            globalThis.ezApi.ezclocker[EzElementEventName.ezApiName].ready &&

            globalThis.ezApi.ezclocker[EzEventEngine.ezApiName] &&
            globalThis.ezApi.ezclocker[EzEventEngine.ezApiName].ready &&

            globalThis.ezApi.ezclocker[EzLocalBrowserInfo.ezApiName] &&
            globalThis.ezApi.ezclocker[EzLocalBrowserInfo.ezApiName].ready &&

            globalThis.ezApi.ezclocker[EzLayoutHelper.ezApiName] &&
            globalThis.ezApi.ezclocker[EzLayoutHelper.ezApiName].ready &&

            globalThis.ezApi.ezclocker[EzUrlHelper.ezApiName] &&
            globalThis.ezApi.ezclocker[EzUrlHelper.ezApiName].ready &&

            globalThis.ezApi.ezclocker[EzNavigation.ezApiName] &&
            globalThis.ezApi.ezclocker[EzNavigation.ezApiName].ready &&

            globalThis.ezApi.ezclocker[EzBrowserInfo.ezApiName] &&
            globalThis.ezApi.ezclocker[EzBrowserInfo.ezApiName].ready &&

            globalThis.ezApi.ezclocker[EzUI.ezApiName] &&
            globalThis.ezApi.ezclocker[EzUI.ezApiName].ready &&

            globalThis.ezApi.ezclocker[EzAnimator.ezApiName] &&
            globalThis.ezApi.ezclocker[EzAnimator.ezApiName].ready &&

            globalThis.ezApi.ezclocker[EzRequestPasswordResetDialog.ezApiName] &&
            globalThis.ezApi.ezclocker[EzRequestPasswordResetDialog.ezApiName].ready &&

            globalThis.ezApi.ezclocker[EzValidation.ezApiName] &&
            globalThis.ezApi.ezclocker[EzValidation.ezApiName].ready &&

            globalThis.ezApi.ezclocker[EzAnalyticsAndMetrics.ezApiName] &&
            globalThis.ezApi.ezclocker[EzAnalyticsAndMetrics.ezApiName].ready;
    }

    /**
     * @static
     * @private @readonly @property
     * Returns if this class's singleton instance is registered with ezApi yet.
     * @returns {boolean}
     */
    static get #ezIsRegistered() {
        return null != EzSignInView.ezInstance &&
            EzRegistrationState.REGISTERED === EzSignInView.ezApiRegistrationState;
    }

    /**
     * @static
     * @private @method
     * Attempts to register the singleton instance for this class with ezApi. Returns true
     * if successful, false otherwise.
     * @returns {boolean}
     */
    static #ezRegistrator() {
        if (EzSignInView.#ezCanRegister && !EzSignInView.#ezIsRegistered) {
            globalThis.ezApi.ezRegisterNewApi(EzSignInView, EzSignInView.ezApiName);
        }

        return EzSignInView.#ezIsRegistered;
    }

    /**
     * @static
     * Static Initialization
     * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
     * >> IMPORTANT <<
     * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
     * Make sure the following properties and methods get defined BEFORE this static initialization section:
     *     1) Property getter EzSignInView.ezApiName
     *     2) Property getter EzSignInView.ezEventNames
     *     3) Property getter EzSignInView.ezInstance
     *     4) Property setter EzSignInView.ezInstance
     *     5) Property getter EzSignInView.ezApiRegistrationState
     *     6) Property setter EzSignInView.ezApiRegistrationState
     *     7) Property getter EzSignInView.#ezCanRegister
     *     8) Property getter EzSignInView.#ezIsRegistered
     *     9) Method EzSignInView.#ezRegistrator()
     */
    static {
        if (!EzSignInView.#ezIsRegistered) {
            EzSignInView.ezApiRegistrationState = EzRegistrationState.PENDING;

            if (!EzSignInView.#ezRegistrator()) {
                document.addEventListener(
                    EzSignInView.ezOnEzApiReadyEventName,
                    EzSignInView.#ezRegistrator);

                document.addEventListener(
                    EzCookies.ezEventNames.ezOnReady,
                    EzSignInView.#ezRegistrator);

                document.addEventListener(
                    EzElementEventName.ezEventNames.ezOnReady,
                    EzSignInView.#ezRegistrator);

                document.addEventListener(
                    EzEventEngine.ezEventNames.ezOnReady,
                    EzSignInView.#ezRegistrator);

                document.addEventListener(
                    EzLocalBrowserInfo.ezEventNames.ezOnReady,
                    EzSignInView.#ezRegistrator);

                document.addEventListener(
                    EzLayoutHelper.ezEventNames.ezOnReady,
                    EzSignInView.#ezRegistrator);

                document.addEventListener(
                    EzUrlHelper.ezEventNames.ezOnReady,
                    EzSignInView.#ezRegistrator);

                document.addEventListener(
                    EzNavigation.ezEventNames.ezOnReady,
                    EzSignInView.#ezRegistrator);

                document.addEventListener(
                    EzBrowserInfo.ezEventNames.ezOnReady,
                    EzSignInView.#ezRegistrator);

                document.addEventListener(
                    EzUI.ezEventNames.ezOnReady,
                    EzSignInView.#ezRegistrator);

                document.addEventListener(
                    EzAnimator.ezEventNames.ezOnReady,
                    EzSignInView.#ezRegistrator);

                document.addEventListener(
                    EzRequestPasswordResetDialog.ezEventNames.ezOnReady,
                    EzSignInView.#ezRegistrator)

                document.addEventListener(
                    EzValidation.ezEventNames.ezOnReady,
                    EzSignInView.#ezRegistrator);

                document.addEventListener(
                    EzAnalyticsAndMetrics.ezEventNames.onReady,
                    EzSignInView.#ezRegistrator);
            }
        }
    }

    /*
    =========================================================================================================================
    End of EzClocker Class Initialization and EzApi Registration Section
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    !! DO NOT PLACE ANY NON-INITIALIZTION CODE BETWEEN THE START AND END OF THIS INITILIZATION SECTON !!
    !! DO NOT PLACE ANY CODE OF ANY KIND BELOW THIS POINT !!
    =========================================================================================================================
    */
}
