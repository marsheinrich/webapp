import {
    EzBadParamException
} from '/ezlibrary/exceptions/EzExceptions.js';

import {
    EzNumber,
    EzString,
    EzPromise
} from '/ezlibrary/helpers/EzHelpers.js';

import { EzClass } from '/ezlibrary/EzClass.js';

import { EzUserRole } from '/ezlibrary/EzUserRole.js';

import { EzHttpHelper } from '/public/javascript/common/ezclocker-http-helper.js';
import { EzNavigation } from '/public/javascript/common/ezclocker-navigation-helper.js';

/**
    Provides access to ezClockers Account APIs
    Import with:
        import { EzAccountServices } from '/public/javascript/services/ezclocker-account-services.js';

        globalThis.ezApi.ezclocker[EzAccountServices.ezApiName] &&
        globalThis.ezApi.ezclocker[EzAccountServices.ezApiName].ready

        document.addEventListener(
            EzAccountServices.ezEventNames.onReady,
            this.#ezRegistrator);
 */
export class EzAccountServices extends EzClass {
    static ezInstance = null;
    static ezApiRegistrationState = null;

    static get ezApiName() {
        return 'ezAccountServices';
    }

    static get ezEventNames() {
        return {
            onReady: 'ezOn_EzAccountServices_Ready'
        };
    }

    static get ezCanRegister() {
        return 'PENDING' === EzAccountServices.ezApiRegistrationState &&
            Object.prototype.hasOwnProperty.call(globalThis, 'ezApi') &&
            globalThis.ezApi && globalThis.ezApi.ready &&

            globalThis.ezApi.ezclocker[EzHttpHelper.ezApiName] &&
            globalThis.ezApi.ezclocker[EzHttpHelper.ezApiName].ready &&

            globalThis.ezApi.ezclocker[EzNavigation.ezApiName] &&
            globalThis.ezApi.ezclocker[EzNavigation.ezApiName].ready;
    }

    static #ezRegistrator() {
        if (!EzAccountServices.ezCanRegister) {
            return false;
        }
        EzAccountServices.ezInstance = ezApi.ezRegisterNewApi(
            EzAccountServices,
            EzAccountServices.ezApiName);
        EzAccountServices.ezApiRegistrationState = 'REGISTERED';
        return true;
    }

    static {
        if (null == EzAccountServices.ezApiRegistrationState) {
            EzAccountServices.ezApiRegistrationState = 'PENDING';

            if (!EzAccountServices.#ezRegistrator()) {
                document.addEventListener(
                    'onEzApiReady',
                    EzAccountServices.#ezRegistrator);

                //document.addEventListener(
                //    EzHttpHelper.ezEventNames.onReady,
                //    EzAccountServices.#ezRegistrator);

                //document.addEventListener(
                //    EzNavigation.ezEventNames.onReady,
                //    EzAccountServices.#ezRegistrator);
            }
        }
    }

    /** @public @field */
    user = null;

    /** @public @field */
    currentUserInfo = null;

    /** @public @readonly @property */
    get EZ_GENERATED_AUTOMATIC_SIGN_IN_FORM_ID() {
        return 'EzGeneratedAutomaticSignInForm';
    }

    /**
        @protected @method
     */
    ezInit() {
        return EzAccountServices.ezInstance;
    }

    /**
        @deprecated Migrate to using EzClockerContext to obtain the user account
        @public
        Loads information for the currently logged in user
        @returns {Promise}
     */
    loadCurrentUser() {
        const self = EzAccountServices.ezInstance;

        let lastKnownUser = self.user;
        self.user = null;

        return ezApi.ezPromise(
            (resolve, reject) => {
                let url = ezApi.ezclocker.nav.getInternalApiUrl('account/user', 'v1');
                ezApi.ezclocker.ezHttpHelper.ezGet(url)
                    .then(
                        ezApi.ezclocker.ezServices.ezProcessApiResolve,
                        ezApi.ezclocker.ezServices.ezProcessApiReject)
                    .then(
                        (response) => {
                            self.user = response;
                            return resolve(self.user, lastKnownUser);
                        },
                        (eResponse) => reject(eResponse, lastKnownUser)
                    );
            });
    }

    /**
        @deprecated Migrate to using EzClockerContext to obtain the user account
        @public
        Obtains the current User account
        @param {Function|null} success
        @param {Failure|null} failure
     */
    currentUser(success, failure) {
        const self = EzAccountServices.ezInstance;

        let lastKnownUser = self.user;
        self.user = null;

        let url = ezApi.ezclocker.nav.getInternalApiUrl('account/user', 'v1');
        ezApi.ezclocker.ezHttpHelper.get(url)
            .then(
                (response) => {
                    if (ezApi.ezclocker.ezHttpHelper.isErrorResponse(response)) {
                        let em = ezApi.ezclocker.ezHttpHelper.extractErrorResponseMessage(response);
                        ezApi.ezclocker.logger.error(em);
                        return ezApi.callBack(failure, response);
                    }
                    self.user = response;
                    return ezApi.callBack(success, self.user, lastKnownUser);
                },
                (eResponse) => {
                    let em = ezApi.ezclocker.ezHttpHelper.extractErrorResponseMessageOrDefault(eResponse,
                        'Unable to obtain developer token for logged in user.');
                    ezApi.ezclocker.logger.error(em);
                    return ezApi.callBack(failure, eResponse, lastKnownUser);
                });
    }

    /**
        @public
        Obtains the user information for the provied employeeId
        @returns {Promise}
        Promise.resolve result: {
            errorCode: 0,
            message: 'success',
            entity: {EzNovaUser}
        }
        Promise.reject result: {
            errorCode: {error_number},
            message: {error_message_string},
            entity: {null|EzNovaUser}
        }
     */
    ezGetEmployeeUserInfo(employeeId) {
        if (!EzNumber.isNumber(employeeId)) {
            throw new EzBadParamException(
                'employeeId',
                EzAccountServices.ezInstance,
                EzAccountServices.ezInstance.ezGetEmployeeUserInfo);
        }

        return ezApi.ezclocker.ezHttpHelper.ezGet(
            ezApi.ezclocker.nav.ezGetInternalApiUrl(
                `account/employee/${employeeId}/user-info`))
            .then(
                ezApi.ezclocker.ezServices.ezProcessApiResponse,
                ezApi.ezclocker.ezServices.ezProcessApiReject);
    }

    /**
        @public
        Returns employee information for the logged in user.
        @deprecated Use ezApi.ezclocker.ezAccountServices.loggedInUserEmployeeInfo instead
     */
    loggedInUserInfo() {
        const self = EzAccountServices.ezInstance;

        return ezApi.ezPromise((resolve, reject) => {
            let lastCurrentUserInfo = self.currentUserInfo;
            self.currentUserInfo = null;

            let postUrl = ezApi.ezclocker.nav.getInternalClassicServiceUrl('employee/getEmployeeInfo');
            ezApi.ezclocker.ezHttpHelper.ezPost(postUrl, '')
                .then(
                    (response) => {
                        if (response.errorCode !== 0) {
                            ezApi.ezclocker.logger.error(
                                ezApi.ezEM`
                                    Unable to retrieve user information from the ezClocker service.
                                    <p>Additional Info: [${response.message}]</p>`);
                            return reject(response, lastCurrentUserInfo);
                        }
                        self.currentUserInfo = response.employeeInformation;
                        return resolve(self.currentUserInfo);
                    },
                    (eResponse) => {
                        ezApi.ezclocker.logger.error(
                            ezApi.ezEm`
                                Unable to retrieve user information from the ezClocker service.
                                <p>Additional Info: [${eResponse.message}]</p>`);
                        return reject(eResponse, lastCurrentUserInfo);
                    }
                );
        });
    }

    /**
        @public
        Returns employee information for the logged in user.
        @returns {Promise}
     */
    loggedInUserEmployeeInfo() {
        const self = EzAccountServices.ezInstance;

        return ezApi.ezPromise((resolve, reject) => {
            let lastCurrentUserInfo = self.currentUserInfo;
            self.currentUserInfo = null;

            let postUrl = ezApi.ezclocker.nav.getInternalClassicServiceUrl('employee/getEmployeeInfo');
            ezApi.ezclocker.ezHttpHelper.ezPost(postUrl, '')
                .then(
                    (response) => {
                        if (response.errorCode !== 0) {
                            ezApi.ezclocker.logger.error(
                                ezApi.ezEM`
                                    Unable to retrieve user information from the ezClocker service.
                                    <p>Additional Info: [${response.message}]</p>`);
                            return reject(response, lastCurrentUserInfo);
                        }
                        self.currentUserInfo = response.employeeInformation;
                        return resolve(self.currentUserInfo);
                    },
                    (eResponse) => {
                        ezApi.ezclocker.logger.error(
                            ezApi.ezEM`
                                Unable to retrieve user information from the ezClocker service.
                                <p>Additional Info: [${eResponse.message}]</p>`);
                        return reject(eResponse, lastCurrentUserInfo);
                    });
        });
    }

    /**
        @public
        Signs up for the personal app
        @returns {Promise}
     */
    ezSignUpPersonal(email, password, mobile, affiliateId) {
        let url = ezApi.ezclocker.nav.getPublicApiServiceUrl(
            ezApi.ezUrlTemplate`account/ezclocker/signup
                ?mobile=${ezApi.ezIsTrue(mobile)}`);

        let signUpRequest = {
            inviteCode: null,
            accountType: 'personal',
            affiliateId: ezApi.isValid(affiliateId) ? affiliateId : null,
            emailAddress: email,
            employerId: null,
            employerName: null,
            inviteToken: null,
            name: email,
            displayName: email,
            password: password,
            source: 'website',
            businessType: null,
            pin: null,
            developerToken: null
        };

        return ezApi.ezclocker.ezHttpHelper.ezPost(url, ezApi.ezToJson(signUpRequest));
    }

    /**
        @deprecated Migrate to ezApi.ezclocker.ezAccountServices.ezSignUp()
        @public
        Creates a new account based on the aAccountType value
        @param {String} aAccountType
        @param {String} aName
        @param {Number} aEmployerId
        @param {String} aInviteToken
        @param {String} aCompanyName
        @param {String} aEmailAddress
        @param {String} aPassword
        @param {Function|null} success
        @param {Function|null} failure
        @returns {Promise}
     */
    signUp(aAccountType, aName, aEmployerId, aInviteToken, aCompanyName, aEmailAddress, aPassword, success, failure) {
        return ezApi.ezPromise(
            (resolve, reject) =>
                ezApi.ezclocker.ezAccountServices.ezSignUp(
                    // aUserRole
                    aAccountType,
                    // aUserName
                    aEmailAddress,
                    // aPassword
                    aPassword,
                    // aPin
                    null,
                    // aDisplayName
                    aName,
                    // aCompanyName
                    aCompanyName,
                    // aInviteToken
                    aInviteToken,
                    // aEmployerId
                    aEmployerId,
                    // aBusinessType
                    null,
                    // aDeveloperToken
                    null)
                    .then(
                        (response) => {
                            if (ezApi.ezIsFunction(success)) {
                                success(response);
                            }
                            return resolve(response);
                        },
                        (eResponse) => {
                            if (ezApi.ezIsFunction(failure)) {
                                failure(eResponse);
                            }
                            return reject(eResponse);
                        }));
    }

    /**
        @public
        Creates a new account based on the aAccountType value
        @param {EzUserRole} ezUserRole
        @param {String} aUserName
        @param {String} aPassword
        @param {String} aDisplayName
        @param {String} aCompanyName
        @param {Number} aEmployerId
        @param {String} aInviteToken
        @param {String} aDeveloperToken
        @returns {Promise}
     */
    ezSignUp(aEzUserRole, aUserName, aPassword, aPin, aDisplayName, aCompanyName, aInviteToken, aEmployerId,
        aBusinessType, aDeveloperToken) {

        if (EzUserRole.UNKNOWN === aEzUserRole) {
            throw new EzBadParamException(
                'aUserRole',
                EzAccountServices,
                EzAccountServices.ezSignUp);
        }
        if (!EzString.hasLength(aUserName)) {
            throw new EzBadParamException(
                'aUserName',
                EzAccountServices,
                EzAccountServices.ezSignUp);
        }
        if (!EzString.hasLength(aPassword)) {
            throw new EzBadParamException(
                'aPassword',
                EzAccountServices,
                EzAccountServices.ezSignUp);
        }

        return EzPromise.promise(
            (resolve, reject) => {
                // Default role to employer
                let aUserRole = EzUserRole.UNKNOWN !== aEzUserRole
                    ? aEzUserRole
                    : EzUserRole.ezAuthorityNameToRoleName(EzUserRole.ROLE_EMPLOYER);
                let em = ezApi.ezEM`Signing up with account type ${aUserRole} is not supported through the website.`;

                let signUpRequest = {};
                switch (aUserRole) {
                    case 'ROLE_EMPLOYER':
                        signUpRequest = {
                            inviteToken: null,
                            inviteCode: null,
                            employerId: null,
                            developerToken: EzString.hasLength(aDeveloperToken)
                                ? aDeveloperToken
                                : null,

                            accountType: EzUserRole.ezToLegacyAccountType(aUserRole),

                            emailAddress: aUserName,
                            password: aPassword,
                            pin: null,

                            name: EzString.hasLength(aDisplayName)
                                ? aDisplayName
                                : aUserName,
                            displayName: EzString.hasLength(aDisplayName)
                                ? aDisplayName
                                : aUserName,

                            employerName: EzString.hasLength(aCompanyName)
                                ? aCompanyName
                                : 'My Company',
                            businessType: EzString.hasLength(aBusinessType)
                                ? aBusinessType
                                : null,

                            source: 'website'
                        };
                        break;
                    case 'ROLE_MANAGER':
                    case 'ROLE_EMPLOYEE':
                        signUpRequest = {
                            inviteToken: aInviteToken,
                            inviteCode: aInviteToken,
                            employerId: aEmployerId,
                            developerToken: EzString.hasLength(aDeveloperToken)
                                ? aDeveloperToken
                                : null,

                            accountType: EzUserRole.ezToLegacyAccountType(aUserRole),

                            emailAddress: aUserName,
                            password: aPassword,
                            pin: EzString.hasLength(aPin)
                                ? aPin
                                : null,

                            name: EzString.hasLength(aDisplayName)
                                ? aDisplayName
                                : aUserName,
                            displayName: EzString.hasLength(aDisplayName)
                                ? aDisplayName
                                : aUserName,

                            employerName: null,
                            businessType: null,

                            source: 'website'
                        };
                        break;
                    case 'ROLE_PERSONAL':
                        signUpRequest = {
                            inviteToken: null,
                            inviteCode: null,
                            employerId: null,
                            developerToken: EzString.hasLength(aDeveloperToken)
                                ? aDeveloperToken
                                : null,

                            accountType: EzUserRole.ezToLegacyAccountType(aUserRole),

                            emailAddress: aUserName,
                            password: aPassword,
                            pin: EzString.hasLength(aPin)
                                ? aPin
                                : null,

                            name: EzString.hasLength(aDisplayName)
                                ? aDisplayName
                                : aUserName,
                            displayName: EzString.hasLength(aDisplayName)
                                ? aDisplayName
                                : aUserName,

                            employerName: null,
                            businessType: null,

                            source: 'website'
                        };
                        break;
                    case 'ROLE_DEVELOPER':
                        signUpRequest = {
                            inviteToken: null,
                            inviteCode: null,
                            employerId: null,
                            developerToken: null,

                            accountType: EzUserRole.ezToLegacyAccountType(aUserRole),

                            emailAddress: aUserName,
                            password: aPassword,
                            pin: null,

                            name: EzString.hasLength(aDisplayName)
                                ? aDisplayName
                                : aUserName,
                            displayName: EzString.hasLength(aDisplayName)
                                ? aDisplayName
                                : aUserName,

                            employerName: null,
                            businessType: null,

                            source: 'website'
                        };
                        break;
                    default:
                        ezApi.ezclocker.logger.error(em);
                        return reject({
                            errorCode: 400,
                            message: em
                        });
                }

                return ezApi.ezclocker.ezHttpHelper.ezPost(
                    ezApi.ezclocker.ezNavigation.getPublicApiServiceUrl('account/ezclocker/signup', 'v1'),
                    ezApi.ezToJson(signUpRequest))
                    .then(
                        ezApi.ezclocker.ezServices.ezProcessApiResolve,
                        ezApi.ezclocker.ezServices.ezProcessApiReject)
                    .then(resolve, reject);
            });
    }

    /**
        @public
        Processes the acceptance of an employee invite.
        NOTE: Do not html encode the name or email address before calling this method. Encoding is performed
        automaticlly.
        @param {String} aInviteToken
        @param {String} aName
        @param {String} aEmailAddress
        @param {String} aPassword
        @param {String} aSource
        @returns {Promise}
     */
    ezAcceptEmployeeInvite(aInviteToken, aName, aEmailAddress, aPassword, aSource) {
        const self = EzAccountServices.ezInstance;

        if (!EzString.hasLength(aInviteToken)) {
            throw new EzBadParamException('aInviteToken',
                self,
                self.ezAcceptEmployeeInvite);
        }
        if (!EzString.hasLength(aName)) {
            throw new EzBadParamException(
                'aName',
                self,
                self.ezAcceptEmployeeInvite);
        }
        if (!EzString.hasLength(aEmailAddress)) {
            throw new EzBadParamException(
                'aEmailAddress',
                self,
                self.ezAcceptEmployeeInvite);
        }
        if (!EzString.hasLength(aPassword)) {
            throw new EzBadParamException(
                'aPassword',
                self,
                self.ezAcceptEmployeeInvite);
        }

        return ezApi.ezclocker.ezHttpHelper.ezPost(
            ezApi.ezclocker.nav.getPublicApiServiceUrl('account/ezclocker/accept-employee-invite', 'v1'),
            ezApi.ezToJson(
                {
                    inviteToken: aInviteToken,
                    name: EzString.encodeHtml(aName),
                    displayName: EzString.encodeHtml(aName),
                    emailAddress: EzString.encodeHtml(aEmailAddress),
                    password: ezApi.ezAssignOrDefault(aPassword, null),
                    source: ezApi.ezAssignOrDefault(aSource, 'WEBSITE')
                }))
            .then(
                ezApi.ezclocker.ezServices.ezProcessApiResolve,
                ezApi.ezclocker.ezServices.ezProcessApiReject);
    }

    /**
        @public
        Silently sign in a user and direct to the target url

        @param {String} userName
        @param {String} password
        @param {String} mobile
        @param {String} targetUrl
        @param {String|null} parentContainer

        @deprecated Migrate to ezApi.ezclocker.ezAccountServices.ezSignIn()
     */
    silentSignIn(userName, password, mobile, targetUrl, parentContainer) {
        const self = EzAccountServices.ezInstance;

        self.ezSignIn(userName, password, targetUrl, mobile, parentContainer);
    }

    /**
        @deprecated
        Migrate to EzAccountServices.ezInstance.ezSignIn(userName, password, targetUrl, mobile, parentContainerId)
        @public
        Silently sign in a user and direct to the target url
        @param {String} userName
        @param {String} password
        @param {String} targetUrl
        @param {String} mobile
        @param {String|null} parentContainer
     */
    signIn(userName, password, targetUrl, mobile, parentContainer) {
        return EzAccountServices.ezInstance.ezSignIn(
            userName,
            password,
            targetUrl,
            mobile,
            parentContainer);
    }

    /**
        @public
        Silently sign in a user and direct to the target url
        @param {string} userName
        @param {string} password
        @param {string} targetUrl
        @param {boolean} mobile
        @param {boolean} rememberMe
        @param {String|null} parentContainerId
     */
    ezSignIn(userName, password, targetUrl, mobile, parentContainerId) {
        const self = EzAccountServices.ezInstance;

        if (!EzString.hasLength(userName)) {
            throw new EzBadParamException(
                'userName',
                EzAccountServices.ezInstance,
                EzAccountServices.ezInstance.ezSignIn);
        }
        if (!EzString.hasLength(password)) {
            throw new EzBadParamException(
                'password',
                EzAccountServices.ezInstance,
                EzAccountServices.ezInstance.ezSignIn);
        }

        EzAccountServices.ezInstance.ezBuildGeneratedAutomaticSignInForm(
            ezApi.ezclocker.ezNavigation.ezGetSigninUrl(),
            userName,
            password,
            mobile,
            EzString.hasLength(parentContainerId)
                ? parentContainerId
                : 'body');

        ezApi.ezclocker.ezUi.ezSubmitForm(EzAccountServices.ezInstance.EZ_GENERATED_AUTOMATIC_SIGN_IN_FORM_ID);
    }

    /**
        @protected
        Builds an HTML sign-in form used in automatic sign-in (ezSignIn)
        @param {string} url
        @param {string} userName
        @oaram {string} password
        @param {boolean} mobile
        @param {string} parentContainerI
        d
     */
    ezBuildGeneratedAutomaticSignInForm(url, userName, password, mobile, parentContainerId) {
        const self = EzAccountServices.ezInstance;

        if (!EzString.hasLength(url)) {
            throw new EzBadParamException(
                'url',
                EzAccountServices.ezInstance,
                EzAccountServices.ezInstance.ezInjectGeneratedAutomaticSignInForm);
        }

        parentContainerId = EzString.hasLength(parentContainerId)
            ? parentContainerId
            : 'body';

        let mobileChecked = ezApi.ezIsTrue(mobile)
            ? 'checked'
            : '';

        // NOTE: remember-me must always be true to make sure the authentication is re-used.
        ezApi.ezclocker.ezUi.ezAppendContent(
            parentContainerId,
            ezApi.ezTemplate`
                <div id="${self.EZ_GENERATED_AUTOMATIC_SIGN_IN_FORM_ID}Container" style="display:none">
                    <form id="${self.EZ_GENERATED_AUTOMATIC_SIGN_IN_FORM_ID}" action="${url}" method="POST">
                        <!-- <input id="EzTargetUrl" type="text" name="targetUrl" value=""/> -->
                        <input id="EzUserName" type="text" name="j_username" value="${userName}"/>
                        <input id="EzPassword" type="password" name="j_password" value="${password}"/>
                        <input id="EzRememberMe" type="checkbox" name="remember-me" checked/>
                        <input id="EzMobile" type="checkbox" name="mobile" ${mobileChecked}/>
                    </form>
                </div>`);
    }

    signOut() {
        return ezApi.ezclocker.ezNavigation.signOut();
    }

    /**
        @public
        Executes the call to reset the user's password to a new password.
        @param {String} token
        @param {String} email
        @param {String} password
        @param {String} confirmPassword
        @returns {Promise)
     */
    ezResetPassword(token, email, password, confirmPassword) {
        if (!EzString.hasLength(token)) {
            throw new EzBadParamException(
                'token',
                self,
                self.ezResetPassword);
        }
        if (!EzString.hasLength(email)) {
            throw new EzBadParamException(
                'email',
                self,
                self.ezResetPassword);
        }
        if (!EzString.hasLength(password)) {
            throw new EzBadParamException(
                'password',
                self,
                self.ezResetPassword);
        }
        if (!EzString.hasLength(confirmPassword)) {
            throw new EzBadParamException(
                'confirmPassword',
                self,
                self.ezResetPassword);
        }

        return ezApi.ezclocker.ezHttpHelper.ezPut(
            ezApi.ezclocker.nav.ezGetPublicApiUrl(ezApi.ezUrlTemplate`account/reset-password`, 'v1'),
            ezApi.ezToJson({
                resetToken: token,
                email: email,
                username: email,
                newPassword: password,
                confirmationPassword: confirmPassword,
                source: 'website'
            }))
            .then(
                ezApi.ezclocker.ezServices.ezProcessApiResolve,
                ezApi.ezclocker.ezServices.ezProcessApiReject);
    }

    /**
        @deprecated Migrate to ezAccountServices.ezResetPassword(token, email, password, confirmPassword)
        @public
        Executes the call to reset the user's password to a new password.
        @param {String} token
        @param {String} email
        @param {String} password
        @param {String} confirmPassword
        @param {Function|null} success
        @param {Function|null} failure
     */
    resetPassword(token, email, password, confirmPassword, success, failure) {
        return EzAccountServices.ezInstance.ezResetPassword(token, email, password, confirmPassword)
            .then(
                (response) => ezApi.callBack(success, response),
                (eResponse) => ezApi.callBack(failure, eResponse));
    }

    /**
        @deprecated
        Migrate to ezApi.ezclocker.ezAccountServices.ezRequestPasswordReset()
     */
    forgotPasswordReset(email, mobilePhoneNumber, success, failure) {
        EzAccountServices.ezInstance.ezRequestPasswordReset(email, mobilePhoneNumber)
            .then(success, failure);
    }

    /**
        @deprecated
        Migrate to ezApi.ezclocker.ezAccountServices.ezRequestPasswordReset()
     */
    requestPasswordReset(email, success, failure) {
        EzAccountServices.ezInstance.ezRequestPasswordReset(email, '')
            .then(success, failure);
    }

    /**
        @public
        Calles the request password reset service to send a reset password link to the customer.
        @param {Strijng} username
        @param {String} emailAddress
        @param {String} mobilePhoneNumber
        @returns {Promise}
     */
    ezRequestPasswordReset(username, emailAddress, mobilePhoneNumber) {
        let url = ezApi.ezclocker.ezNavigation.ezGetPublicApiUrl(
            ezApi.ezUrlTemplate`
                account/request-reset-password
                    ?un=${ezApi.ezEncode(username)}
                    &em=${ezApi.ezEncode(emailAddress)}
                    &mp=${ezApi.ezEncode(mobilePhoneNumber)}`);

        return ezApi.ezclocker.ezHttpHelper.ezPost(url)
            .then(
                ezApi.ezclocker.ezServices.ezProcessApiResolve,
                ezApi.ezclocker.ezServices.ezProcessApiReject);
    }

    /**
        @deprecated
        Migrate to ezApi.ezclocker.ezAccountServices.ezChangeUserName()
     */
    changeUserName(changeAccountEmailData, success, failure) {
        ezApi.ezclocker.ezAccountServices.ezChangeUserName(changeAccountEmailData)
            .then(
                (response) => ezApi.callBack(success, response),
                (eResponse) => ezApi.callBack(failure, eResponse));
    }

    /**
        @public
        Calls the service to change the username/email of an account.
        @param {Object} changeUserNameRequest
        @returns {Promise}
     */
    ezChangeUserName(changeUserNameRequest) {
        const self = EzAccountServices.ezInstance;
        if (ezApi.ezIsNotValid(changeUserNameRequest)) {
            throw new EzBadParamException(
                'changeUserNameRequest',
                self,
                self.ezChangeUserName);
        }

        let url = ezApi.ezclocker.nav.getInternalApiServiceUrl('account/username', 'v1');
        return ezApi.ezclocker.ezHttpHelper.ezPut(
            // url
            url,
            // payload
            ezApi.ezToJson(changeUserNameRequest),
            // async
            true,
            // beforeHandler
            null,
            // autoHandleResponse
            false)
            .then(
                ezApi.ezclocker.ezServices.ezProcessApiResolve,
                ezApi.ezclocker.ezServices.ezProcessApiReject);
    }

    /**
        @public
        Performs a sign in without redirecting the user to their dashboard.
        @param {String} userName
        @param {String} password
        @returns {Promise}
     */
    ezSilentSignIn(userName, password) {
        const self = EzAccountServices.ezInstance;

        if (!EzString.hasLength(userName)) {
            throw new EzBadParamException(
                'userName',
                self,
                self.ezSilentSignIn);
        }
        if (!EzString.hasLength(password)) {
            throw new EzBadParamException(
                'password',
                self,
                self.ezSilentSignIn);
        }

        let url = `${ezApi.ezclocker.nav.ezGetSigninUrl()}?j_username=${ezApi.ezEncode(userName)}&j_password=${password}`;

        return ezApi.ezclocker.ezHttpHelper.ezPost(url);
    }

    /**
        @public
        Signs the user out of ezClocker (however, it does not navigate the user away from the current page)
        @returns {Promise}
     */
    ezSignOut() {
        return ezApi.ezclocker.ezHttpHelper.ezGet(ezApi.ezclocker.nav.ezGetSignOutUrl());
    }
}