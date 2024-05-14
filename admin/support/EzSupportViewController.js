import { EzClass } from "../../ezlibrary/EzClass";
import { EzRegistrationState } from "../../ezlibrary/enums/EzRegistrationState";
import { EzEventEngine } from "../../ezlibrary/ez-event-engine";
import { EzServices } from "../../public/javascript/common/ez-services";
import { EzUI } from "../../public/javascript/common/ezui";
import { EzSupportApiClient } from "./EzSupportApiClient";
import { EzSupportViewRenderer } from "./EzSupportViewRenderer";
import { EzDialog } from '/public/javascript/common/ezclocker-dialog-helper.js';
import {
    EzObject,
    EzBoolean,
    EzString,
    EzArray,
    EzHtml,
    EzJson,
    EzPromise
} from '/ezlibrary/helpers/EzHelpers.js';

export class EzSupportViewController extends EzClass {
    /**
     * @static
     * @public @readonly @property
     * Returns the name of this class's singleton instance when registered with ezApi.
     * @returns {string}
     */
    static get ezApiName() {
        return 'ezSupportViewController';
    }

    /**
     * @static
     * @public @readonly @property
     * Returns an object of event names that this class may trigger.
     * @returns {object}
     */
    static get ezEventNames() {
        return {
            onReady: 'ezOn_EzSupportViewController_Ready',
        };
    }

    /**
     * @static
     * @private @field
     * Stores the singleton instance of this class that was created by and registerd with EzApi.
     * @type {EzSupportViewController}
     */
    static #ezInstance = EzObject.hasProperty(globalThis, 'ezApi') &&
    EzObject.isValid(globalThis.ezApi) && EzBoolean.isTrue(globalThis.ezApi.ready) &&
    EzObject.isValid(globalThis.ezApi.ezclocker[EzSupportViewController.ezApiName])
        ? globalThis.ezApi.ezclocker[EzSupportViewController.ezApiName]
        : null;
    /**
     * @static
     * @public @property @getter
     * Returns the singleton instance of this class that is registered with EzApi (if available yet)
     * @returns {EzSupportViewController}
     */
    static get ezInstance() {
        return EzSupportViewController.#ezInstance;
    }
    /**
     * @static
     * @public @property @setter
     * Sets the singleton instance of of this class that is registered with EzApi.
     * @param {EzSupportViewController} instance
     */
    static set ezInstance(instance) {
        if (null != EzSupportViewController.#ezInstance) {
            throw new Error('EzSupportViewController\'s singleton instance is already reigstered with EzApi.');
        }

        EzSupportViewController.#ezInstance = instance;
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
    EzObject.isValid(globalThis.ezApi.ezclocker[EzSupportViewController.ezApiName])
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
        return EzSupportViewController.#ezApiRegistrationState;
    }
    /**
     * @static
     * @public @property @setter
     * Sets the ezApi registration state of this classes's singleton instance.
     * @param {string} ezApiRegistrationState
     * A valid enum property value from EzRegistrationState
     */
    static set ezApiRegistrationState(ezApiRegistrationState) {
        EzSupportViewController.#ezApiRegistrationState = EzRegistrationState.ezValueOf(ezApiRegistrationState);
    }

    /**
     * @public @static @readonly @property
     * @returns {boolean}
     */
    static get #ezCanRegister() {
        return EzRegistrationState.PENDING === EzSupportViewController.ezApiRegistrationState &&
            Object.hasOwn(globalThis, 'ezApi') &&
            globalThis['ezApi'] && globalThis['ezApi'].ready &&

            globalThis.ezApi.ezclocker[EzEventEngine.ezApiName] &&
            globalThis.ezApi.ezclocker[EzEventEngine.ezApiName].ready &&

            globalThis.ezApi.ezclocker[EzServices.ezApiName] &&
            globalThis.ezApi.ezclocker[EzServices.ezApiName].ready &&

            globalThis.ezApi.ezclocker[EzUI.ezApiName] &&
            globalThis.ezApi.ezclocker[EzUI.ezApiName].ready &&

            globalThis.ezApi.ezclocker[EzSupportApiClient.ezApiName] &&
            globalThis.ezApi.ezclocker[EzSupportApiClient.ezApiName].ready &&

            globalThis.ezApi.ezclocker[EzSupportViewRenderer.ezApiName] &&
            globalThis.ezApi.ezclocker[EzSupportViewRenderer.ezApiName].ready;
    }

    /**
     * @static
     * @private @readonly @property
     * Returns if this class's singleton instance is registered with ezApi yet.
     * @returns {boolean}
     */
    static get #ezIsRegistered() {
        return null != EzSupportViewController.ezInstance &&
            EzRegistrationState.REGISTERED === EzSupportViewController.ezApiRegistrationState;
    }

    /**
     * @static
     * @private @method
     * Attempts to register the singleton instance for this class with ezApi. Returns true
     * if successful, false otherwise.
     * @returns {boolean}
     */
    static #ezRegistrator() {
        if (EzSupportViewController.#ezCanRegister && !EzSupportViewController.#ezIsRegistered) {

            globalThis.ezApi.ezRegisterNewApi(
                EzSupportViewController,
                EzSupportViewController.ezApiName,
                null,
                [
                    EzSupportViewController.ezShortApiName
                ]);
        }

        return EzSupportViewController.#ezIsRegistered;
    }

    /**
     * @static
     * Static Initialization
     * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
     * >> IMPORTANT <<
     * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
     * Make sure the following properties and methods get defined BEFORE this static initialization section:
     *     1) Property getter EzSupportViewController.ezApiName
     *     2) Property getter EzSupportViewController.ezEventNames
     *     3) Property getter EzSupportViewController.ezInstance
     *     4) Property setter EzSupportViewController.ezInstance
     *     5) Property getter EzSupportViewController.ezApiRegistrationState
     *     6) Property setter EzSupportViewController.ezApiRegistrationState
     *     7) Property getter EzSupportViewController.#ezCanRegister
     *     8) Property getter EzSupportViewController.#ezIsRegistered
     *     9) Method EzSupportViewController.#ezRegistrator()
     */
    static {
        if (!EzSupportViewController.#ezIsRegistered) {
            EzSupportViewController.ezApiRegistrationState = EzRegistrationState.PENDING;

            document.addEventListener(
                'onEzApiReady',
                () => {
                    if (!EzSupportViewController.#ezRegistrator()) {
                        document.addEventListener(
                            EzEventEngine.ezEventNames.onReady,
                            EzSupportViewController.#ezRegistrator);

                        document.addEventListener(
                            EzServices.ezEventNames.onReady,
                            EzSupportViewController.#ezRegistrator);

                        document.addEventListener(
                            EzUI.ezEventNames.onReady,
                            EzSupportViewController.#ezRegistrator);

                        document.addEventListener(
                            EzSupportApiClient.ezEventNames.onReady,
                            EzSupportViewController.#ezRegistrator);

                        document.addEventListener(
                            EzSupportViewRenderer.ezEventNames.onReady,
                            EzSupportViewController.#ezRegistrator);

                        document.addEventListener(
                            EzDialog.ezEventNames.onReady,
                            EzSupportViewController.#ezRegistrator);
                    }
                } );
        }
    }

    ezHijackedAccounts = [];

    ezActiveHijackedAccount = null;

    ezHijackedUser = null;

    get ezIds() {
        return {
            containers: {
                EzSupportSwapPasswordResultsId: 'EzSupportSwapPasswordResults'
            },
            buttons: {
                EzSupportSwapPasswordButtonId: 'EzSupportSwapPasswordButton',
            },
            inputs: {
                EzSupportSwapPasswordUsernameInputId: 'EzSupportSwapPasswordAccountUserName'
            }
        };
    }

    /**
     * @protected @method
     * Initializes the EzSupportViewController
     * @returns {EzSupportViewController}
     */
    ezInit() {
        return EzSupportViewController.ezInstance;
    }

    validateSupportLookups(emailElementId, phoneNumberElementId, userInformationElementId, validationErrorElementId, requestType = 'LOOKUP_USER') {
        ezApi.ezclocker.ezSupportViewRenderer.clearResultsTable();
        const emailIdInputValue = (emailElementId && ezApi.ezclocker.ezUi.ezGetInputValue(emailElementId)) || undefined;
        const phoneNumberInputValue = (phoneNumberElementId && ezApi.ezclocker.ezUi.ezGetInputValue(phoneNumberElementId)) || undefined;
        const userNameInputValue = (userInformationElementId && ezApi.ezclocker.ezUi.ezGetInputValue(userInformationElementId)) || undefined;

        if (!emailIdInputValue && !phoneNumberInputValue && !userNameInputValue) {
            return ezApi.ezclocker.ezSupportViewRenderer.ezDisplayErrorComponent(validationErrorElementId, 'You must enter only one input search criteria.');
        }

        if (emailIdInputValue && emailIdInputValue.trim() === '' && phoneNumberInputValue && phoneNumberInputValue.trim() === '' && userNameInputValue && userNameInputValue.trim() === '') {
            return ezApi.ezclocker.ezSupportViewRenderer.ezDisplayErrorComponent(validationErrorElementId, 'You must enter only one input search criteria.');
        }

        let countOfSearchParameters = 0;

        if (emailIdInputValue) {
            countOfSearchParameters = countOfSearchParameters + 1;
        }

        if (phoneNumberInputValue) {
            countOfSearchParameters = countOfSearchParameters + 1;
        }

        if (userNameInputValue) {
            countOfSearchParameters = countOfSearchParameters + 1;
        }

        if (countOfSearchParameters !== 1) {
            return ezApi.ezclocker.ezSupportViewRenderer.ezDisplayErrorComponent(validationErrorElementId, 'You must enter only one input search criteria.');

        }

        if (emailIdInputValue) {
            const matchedAtSignForEmail = emailIdInputValue.match(/@/g);
            if (!matchedAtSignForEmail || matchedAtSignForEmail.length !== 1) {
                return ezApi.ezclocker.ezSupportViewRenderer.ezDisplayErrorComponent(validationErrorElementId, 'There must be 1 @ sign for email.');
            } else {
                return  EzSupportViewController.ezInstance.createUserInfoRequest(emailIdInputValue, undefined, undefined, requestType);
            }
        } else if (phoneNumberInputValue) {
            let phoneNumberInputValueRawNumber = phoneNumberInputValue.replaceAll('-', '');
            phoneNumberInputValueRawNumber = phoneNumberInputValueRawNumber.replaceAll('%', '');
            if (isNaN(phoneNumberInputValueRawNumber)) {
                return ezApi.ezclocker.ezSupportViewRenderer.ezDisplayErrorComponent(validationErrorElementId, 'Phone number not all digits.');
            } else {
                return EzSupportViewController.ezInstance.createUserInfoRequest(undefined, phoneNumberInputValue, undefined, requestType);
            }
        } else if (userNameInputValue) {
            return EzSupportViewController.ezInstance.createUserInfoRequest(undefined, undefined, userNameInputValue, requestType);
        }
    }

    submitAndRenderSupportResponse(request, apiPath, requestType = 'LOOKUP_USER', tableBodyId = 'userInformationResultsTableBodyId', responseWarningElementId = 'basicUserLookBasicInformation_ResponseWarning') {
        return EzPromise.asyncAction((finished) => {
                return ezApi.ezclocker.ezUi.ezStartPageWait(
                    'Fetching support information ...',
                    (waitDone) => {

                        return ezApi.ezclocker.ezSupportApiClient.ezSearchUser(apiPath, '_api/v1', request).then((response, jqXHR) => {
                                return waitDone().then(() => {
                                    ezApi.ezclocker.ezSupportViewRenderer.renderLookupBasicInformationTable(response, tableBodyId, responseWarningElementId, requestType);
                                    return finished();

                                }),
                                (eResponse) => waitDone().then(() => {
                                    return ezApi.ezclocker.ezDialog.ezShowPossibleDefectError(
                                        'Unable to get user info',
                                        eResponse.message,
                                        jqXHR,
                                        eResponse,
                                        `REQUEST: ${EzJson.toJson(request)}`)
                                        .then(finished);
                                } );
                            })
                            .catch((eResponse, jqXHR) => {
                                return waitDone().then(() => {
                                    return ezApi.ezclocker.ezDialog.ezShowPossibleDefectError(
                                        'Unable to get user info',
                                        eResponse.message,
                                        jqXHR,
                                        eResponse,
                                        `REQUEST: ${EzJson.toJson(request)}`)
                                        .then(finished);
                                } );
                            })
                    }
                )
            });
    }

    validateAndLookupArchive() {
        const userInfoRequest = EzSupportViewController.ezInstance.validateSupportLookups(
            'lookUpArchiveEmployeeEmailAddress',
            'lookUpArchiveEmployeeMobilePhoneNumber',
            'lookUpArchiveEmployeeUserName',
            'lookUpArchiveEmployeeButton_ValidationError',
            'LOOKUP_ARCHIVE_EMPLOYEE'
        )

        if (userInfoRequest) {
            return EzSupportViewController.ezInstance.submitAndRenderSupportResponse(userInfoRequest, 'support/lookup/archive-employee', 'LOOKUP_ARCHIVE_EMPLOYEE', 'lookUpArchiveEmployeeResultsTableBodyId', 'lookUpArchiveEmployeeButton_ResponseWarning');
        }
    }

    validateAndLookupBySubscription() {
        const userInfoRequest = EzSupportViewController.ezInstance.validateSupportLookups(
            'lookupUserSubscriptionEmailAddress',
            undefined,
            undefined,
            'lookupUserSubscriptionButton_ValidationError',
            'LOOKUP_USER_SUBSCRIPTION'
        )

        if (userInfoRequest) {
            return EzSupportViewController.ezInstance.submitAndRenderSupportResponse(userInfoRequest, 'support/lookup/user-subscription', 'LOOKUP_USER_SUBSCRIPTION', 'lookupUserSubscriptionResultsTableBodyId', 'lookupUserSubscriptionButton_ResponseWarning');
        }
    }

    validateAndLookupBasicInformation() {
        const userInfoRequest = EzSupportViewController.ezInstance.validateSupportLookups(
            'userInformationEmailAddress',
            'userInformationMobilePhoneNumber',
            'userInformationUserName',
            'basicUserLookBasicInformation_ValidationError',
            'LOOKUP_USER'
        )

        if (userInfoRequest) {
            return EzSupportViewController.ezInstance.submitAndRenderSupportResponse(userInfoRequest, 'support/lookup/user-info', 'LOOKUP_USER');
        }
    }

    validateAndLookupEmployeeInformationByPhoneNumber() {
        ezApi.ezclocker.ezSupportViewRenderer.clearResultsTable();
        const employeePhoneNumber = ezApi.ezclocker.ezUi.ezGetInputValue('lookupEmployeeByMobilePhoneNumber');

        if (!employeePhoneNumber) {
            return ezApi.ezclocker.ezSupportViewRenderer.ezDisplayErrorComponent('lookupEmployeeByMobilePhoneButton_ValidationError', 'You must enter phone search criteria.');
        }

        let phoneNumberRequest = {}

        if (employeePhoneNumber) {
            phoneNumberRequest = EzSupportViewController.ezInstance.createUserInfoRequest(undefined, employeePhoneNumber, undefined, 'LOOKUP_EMPLOYEE');

        }

        return EzSupportViewController.ezInstance.submitAndRenderSupportResponse(phoneNumberRequest, 'support/lookup/employee-details', 'LOOKUP_EMPLOYEE', 'lookupEmployeeByMobilePhoneResultsTableBodyId', 'lookupEmployeeByMobilePhoneButton_ResponseWarning');

    }

    createUserInfoRequest(emailId, userPhoneNumber, userId, requestType = 'LOOKUP_USER') {
        let phoneNumberSplit = (userPhoneNumber && userPhoneNumber.split('-')) || [];
        return {
            emailId,
            userPhoneNumber,
            userName: userId,
            supportRequestType: requestType,
            areaCode: phoneNumberSplit.length >= 1 && !isNaN(phoneNumberSplit[0]) ? phoneNumberSplit[0] : undefined,
            phonePrefix: phoneNumberSplit.length >= 2 && !isNaN(phoneNumberSplit[1]) ? phoneNumberSplit[1] : undefined,
            phoneNumber: phoneNumberSplit.length >= 3 && !isNaN(phoneNumberSplit[2]) ? phoneNumberSplit[2] : undefined,

        }
    }

    handleUserDeleteAction() {
        return ezApi.ezclocker.ezDialog.ezShowYesNo(
            'Confirmation',
            'Are you sure you want to delete User Account?').then(dialogResult => {
                if (dialogResult.dialogStatus && dialogResult.dialogStatus.toLowerCase() === 'yes') {
                    return ezApi.ezclocker.ezSupportViewController.deleteAccount();
                } else {
                    return Promise.resolve(dialogResult);
                }

        });
    }

    deleteAccount() {
        let userName = ezApi.ezClocker.ezUi.ezGetInputValue('ezAdminDeleteAccountUserName');
        if (ezApi.ezStringHasLength(userName)) {
            let url = ezApi.ezclocker.nav.ezGetInternalApiUrl('account?username=' + userName);
            return ezApi.ezclocker.http.ezDelete(url).then(
                function (response) {
                    if (0 !== response.errorCode) {
                        ezApi.ezClocker.ezUi.ezContent('deleteUserAccountResultsTableBodyId', ezApi.ezToJson(response, 3));
                        return;
                    }
                    ezApi.ezclocker.ezSupportViewRenderer.ezDisplayErrorComponent('deleteUserAccountButton_SuccessMessage', 'Account Deleted');
                },
                function (eResponse) {
                    ezApi.ezClocker.ezUi.ezContent('deleteUserAccountResultsTableBodyId', ezApi.ezToJson(eResponse, 3));
                });
        } else {
            return ezApi.ezclocker.ezSupportViewRenderer.ezDisplayErrorComponent('deleteUserAccountButton_ValidationError', 'You must enter user name to delete.');
        }
    }

    reactivateEmployer() {
        let employerId = ezApi.ezClocker.ezUi.ezGetInputValue('reactivateEmployerId');

        let url = ezApi.ezclocker.nav.ezGetInternalApiUrl(`support/employer/${employerId}/reactivate`);
        return ezApi.ezclocker.http.ezPost(url).then(response => {
            if (response === 1) {
                ezApi.ezClocker.ezUi.ezContent('reactivateEmployerIdResultsId', ezApi.ezToJson(`The employer id ${employerId} has been reactivated`, 3));
            } else {
                ezApi.ezClocker.ezUi.ezContent('reactivateEmployerIdResultsId', ezApi.ezToJson('The employer ID doesn\'t exist or is not blocked.', 3));
            }

        })
        .catch(eResponse => {
            ezApi.ezClocker.ezUi.ezContent('reactivateEmployerIdResultsId', ezApi.ezToJson(eResponse, 3));
        })
    }

    changeBillingProviderSubscription() {
        let emailId = ezApi.ezClocker.ezUi.ezGetInputValue('changeBillingProviderEmailAddress');
        let subscriptionPlan = ezApi.ezClocker.ezUi.ezGetInputValue('changeBillingProviderOptions');

        let url = ezApi.ezclocker.nav.ezGetInternalApiUrl(`support/subscription/${subscriptionPlan}/employer?emailId=${emailId}`);
        return ezApi.ezclocker.http.ezPost(url).then(response => {
            if (response === 1) {
                ezApi.ezClocker.ezUi.ezContent('changeBillingProviderResultsId', ezApi.ezToJson(`${emailId}'s subscription updated to ${subscriptionPlan}`, 3));
            } else {
                ezApi.ezClocker.ezUi.ezContent('changeBillingProviderResultsId', ezApi.ezToJson('Something went wrong. Please reach out to the technical team.', 3));
            }

        })
        .catch(eResponse => {
            ezApi.ezClocker.ezUi.ezContent('changeBillingProviderResultsId', ezApi.ezToJson(eResponse, 3));
        })

    }

    createEmployeeInvite(){
        let userFullName = ezApi.ezclocker.ezUi.ezGetInputValue('ezAdminCreateInviteFullUserName');

        let userEmail = ezApi.ezclocker.ezUi.ezGetInputValue('ezAdminCreateInviteEmailId');

        ezApi.ezclocker.ezUi.ezContent(
            'createEmployeeLinkBasicInformationButton_ValidationError', ''
        );

        if (ezApi.ezStringHasLength(userFullName) || ezApi.ezStringHasLength(userEmail)) {
            let url = `/_api/v1/admin/create-employee-invite?full-name=${userFullName}&user-name=${userEmail}`;

            ezApi.ezclocker.ezHttpHelper.ezGet(url)
                .then(
                    function (response) {
                        ezApi.ezclocker.ezUi.ezSetInputValue('ezAdminCreateInviteFullUserName', '');

                        ezApi.ezclocker.ezUi.ezSetInputValue('ezAdminCreateInviteEmailId', '');

                        if (200 !== response.errorCode) {
                            ezApi.ezclocker.ezUi.ezContent(
                                'createEmployeeLinkResultsTableBodyId',
                                ezApi.ezToJson(response.message, 3));

                            ezApi.ezclocker.ezSupportViewRenderer.ezDisplayErrorComponent(
                                'createEmployeeLinkBasicInformationButton_Success',
                                EzHtml.build`
                                    Invite created for ${userFullName}: ${response.message}`);

                            return;

                        }
                    },
                    function (eResponse) {
                        ezApi.ezclocker.ezUi.ezSetInputValue('ezAdminCreateInviteFullUserName', '');

                        ezApi.ezclocker.ezUi.ezSetInputValue('ezAdminCreateInviteEmailId', '');

                        ezApi.ezclocker.ezSupportViewRenderer.ezDisplayErrorComponent('createEmployeeLinkBasicInformationButton_Success', '');

                        ezApi.ezclocker.ezUi.ezContent(
                            'createEmployeeLinkResultsTableBodyId',
                            ezApi.ezToJson(eResponse, 3));
                    });
        } else {
            ezApi.ezclocker.ezSupportViewRenderer.ezDisplayErrorComponent(
                'createEmployeeLinkBasicInformationButton_ValidationError',
                'Either Username or email id are required. Please enter either');
        }
    }

    ezSwapPasswordForUser() {
        ezApi.ezclocker.ezUi.ezDisableElement('EzSupportSwapPasswordButton');

        let swapPasswordEmail = EzString.trimOrEmpty(
            ezApi.ezclocker.ezUi.ezGetInputValue(
                'EzSupportSwapPasswordAccountUserName'));

        if (!EzString.stringHasLength(swapPasswordEmail)) {
            EzSupportViewController.ezInstance.ezHandleResultFailure(
                'EzSupportSwapPasswordResults',
                EzHtml.build`
                    <h1>Error: Account Username Required</h2>
                    Please enter a valid account username (email address, user name, or phone number).`);

            ezApi.ezclocker.ezUi.ezEnableElement('EzSupportSwapPasswordButton');

            return;
        }

        ezApi.ezclocker.ezUi.ezContent(
            'EzSupportSwapPasswordResults',
            EzHtml.build`
                <h1>Swapping real password with temporary password ...</h1>
                NOTE: The account owner will not be able to login while the password is swapped.`);

        ezApi.ezclocker.ezHttpHelper.ezPost(
            `/api/v1/admin/hijack/user/generate-temp-password?user-name=${swapPasswordEmail}`)
            .then(
                ezApi.ezclocker.ezServices.ezProcessApiResolve,
                ezApi.ezclocker.ezServices.ezProcessApiReject)
            .then(
                (response) => {
                    let cleanResponse = {
                        errorCode: response.errorCode,
                        message: response.message,
                        status: response.jqXHR && response.jqXHR.status
                    };

                    EzSupportViewController.ezInstance.ezHandleResultSuccess(
                        'EzSupportSwapPasswordResults',
                        cleanResponse);

                    ezApi.ezclocker.ezUi.ezShowElement("restorePassword_WarningMessageId");

                    EzSupportViewController.ezInstance.ezRefreshSwapHijackState();
                },
                (eResponse) => {
                    ezApi.ezclocker.ezUi.ezEnableElement('EzSupportSwapPasswordButton');

                    EzSupportViewController.ezInstance.ezHandleResultFailure(
                        'EzSupportSwapPasswordResults',
                        eResponse,
                        EzHtml.build`
                            <h2>Failure: User Password Swapped</h2>
                            <div>
                                <label for="EzPasswordSwapResponseTextArea">Swap Log:</label>
                                <textarea id="EzPasswordSwapResponseTextArea"
                                    style="width:100%;height:250px">
                                    ${eResponse.message}
                                </textarea>
                            </div>`);

                    EzSupportViewController.ezInstance.ezRefreshSwapHijackState();
                });
    }

    ezRestoreSwapPassword() {
        ezApi.ezclocker.ezUi.ezDisableElement('EzSupportRestoreSwapPasswordButton');

        let swapPasswordEmail = ezApi.ezclocker.ezUi.ezGetInputValue('EzSupportSwapPasswordAccountUserName');

        if (!EzString.stringHasLength(swapPasswordEmail)) {
            EzSupportViewController.ezInstance.ezHandleResultFailure(
                'EzSupportSwapPasswordResults',
                EzHtml.build`
                    <h1>Error: Account Username Required</h2>
                    Please enter a valid account username (email address, user name, or phone number).`);

            ezApi.ezclocker.ezUi.ezEnableElement('EzSupportSwapPasswordButton');

            return;
        }

        swapPasswordEmail = swapPasswordEmail.trim();

        ezApi.ezclocker.ezUi.ezContent(
            'EzSupportSwapPasswordResults',
            '<h1>Restoring the original account password ...</h1>');

        ezApi.ezclocker.ezHttpHelper.ezPost(
            `/api/v1/admin/hijack/user/restore-swapped-password?user-name=${swapPasswordEmail}`)
            .then(
                ezApi.ezclocker.ezServices.ezProcessApiResolve,
                ezApi.ezclocker.ezServices.ezProcessApiReject)
            .then(
                (response) => {
                    let cleanResponse = {
                        errorCode: response.errorCode,
                        message: response.message,
                        httpStatus: (response.jqXHR && response.jqXHR.status)
                    }

                    EzSupportViewController.ezInstance.ezHandleResultSuccess(
                        'EzSupportSwapPasswordResults',
                        cleanResponse);

                    EzSupportViewController.ezInstance.ezRefreshSwapHijackState();

                    ezApi.ezclocker.ezUi.ezHideElement('EzSupportRestoreSwapPasswordButton');

                    ezApi.ezclocker.ezUi.ezHideElement("restorePassword_WarningMessageId");

                    ezApi.ezclocker.ezUi.ezShowElement('EzSupportSwapPasswordButton');

                    ezApi.ezclocker.ezUi.ezEnableElement('EzSupportSwapPasswordButton');

                    EzSupportViewController.ezInstance.ezRefreshSwapHijackState();
                },
                (eResponse) => {
                    ezApi.ezclocker.ezUi.ezEnableElement('EzSupportSwapPasswordButton');

                    EzSupportViewController.ezInstance.ezHandleResultFailure(
                        'EzSupportSwapPasswordResults',
                        eResponse,
                        EzHtml.build`
                            <h2>Failure: User Password Restored</h2>
                            <div>
                                <label for="EzPasswordSwapResponseTextArea">Swap Log:</label>
                                <textarea id="EzPasswordSwapResponseTextArea"
                                    style="width:100%;height:250px">
                                    ${eResponse.message}
                                </textarea>
                            </div>`);

                    EzSupportViewController.ezInstance.ezRefreshSwapHijackState();
                });
    }

    ezHandleResultSuccess(resultsContainerId, response, additionalSuccessContent) {
        let responseMessage = EzString.stringHasLength(response.message)
            ? response.message
            : 'Success';

        ezApi.ezclocker.ezUi.ezContent(
            resultsContainerId,
            EzHtml.build`
                <h2>
                    ${responseMessage}
                </h2>
                <p>
                    ${EzString.stringOrEmpty(additionalSuccessContent)}
                </p>
                <div>
                    <h2>
                        Response JSON
                    </h2>
                    <textarea
                        id="EzAdminResponseJson"
                        style="width:100%;height:200px;">
                        ${EzJson.toJson(response, 3)}
                    </textarea>
                </div>`);
    }

    /**
     * @public @method
     * Generic handler for admin operation failure results
     * @param {string} resultsContainerId
     * @param {object} eResponse
     * @param {string} additionalErrorContent
     */
    ezHandleResultFailure(resultsContainerId, eResponse, additionalErrorContent) {
        let message = EzObject.isValid(eResponse) && EzString.stringHasLength(eResponse.message)
            ? eResponse.message
            : 'Failed';

        // Show error message
        ezApi.ezclocker.ezUi.ezContent(
            resultsContainerId,
            EzHtml.build`
                <h1>${message}</h1>
                <p>Please contact the ezClocker engineering team if you need help resolving the failure.</p>
                ${ezApi.ezStringOrEmpty(additionalErrorContent)}
                <div>
                    <h2>Error Details</h2>
                    <pre>
                        <code class="json">
                            ${EzJson.toJson(eResponse, 3, true)}
                        </code>
                    </pre>
                </div>`);
    }

    ezRefreshSwapHijackState() {
        EzSupportViewController.ezInstance.ezRefreshCurrentlyHijackedUserInfo()
            .then(
                (hijackedUserResponse) => {
                    EzSupportViewController.ezInstance.ezRefreshSwappedPasswordState()
                        .then(
                            (passwordSwapResponse) => {
                                EzSupportViewController.ezInstance.ezInitRestoreHijackButton(
                                    passwordSwapResponse,
                                    hijackedUserResponse);
                            });
                });
    }

    ezRefreshCurrentlyHijackedUserInfo() {
        return ezApi.ezAsyncAction(
            (finished) => {
                return ezApi.ezclocker.ezHttpHelper.ezGet('/api/v1/admin/hijack')
                    .then(
                        ezApi.ezclocker.ezServices.ezProcessApiResolve,
                        ezApi.ezclocker.ezServices.ezProcessApiReject)
                    .then(
                        (response) => {
                            if (!EzArray.arrayHasLength(response.responses)) {
                                EzSupportViewController.ezInstance.ezHijackedAccounts = [];
                                EzSupportViewController.ezInstance.ezActiveHijackedAccount = null;
                                EzSupportViewController.ezInstance.ezHijackedUser = null;

                                EzSupportViewController.ezInstance.ezInitRestoreHijackButton(false, false);
                                return finished(false);
                            }
                            EzSupportViewController.ezInstance.ezInitRestoreHijackButton();
                            EzSupportViewController.ezInstance.ezHijackedAccounts = response.responses;
                            EzSupportViewController.ezInstance.ezActiveHijackedAccount = EzSupportViewController.ezInstance.ezHijackedAccounts[0];

                            return finished(true);
                        },
                        (eResponse) => {
                            EzSupportViewController.ezInstance.ezHandleResultFailure('_WhoIsHijacked', eResponse);
                            return finished(false);
                        });
            });
    }

    ezRefreshSwappedPasswordState() {
        ezApi.ezclocker.ezUi.ezDisableElement('EzSupportSwapPasswordButton');

        return ezApi.ezAsyncAction(
            (finished) => {
                return ezApi.ezclocker.ezHttpHelper.ezGet(
                    '/api/v1/admin/hijack/user/swap-password')
                    .then(
                        ezApi.ezclocker.ezServices.ezProcessApiResolve,
                        ezApi.ezclocker.ezServices.ezProcessApiReject)
                    .then(
                        (response) => {
                            EzSupportViewController.ezInstance.ezHijackedAccounts = response.entities;

                            if (EzArray.arrayHasLength(EzSupportViewController.ezInstance.ezHijackedAccounts)) {
                                EzSupportViewController.ezInstance.ezActiveHijackedAccount = EzSupportViewController.ezInstance.ezHijackedAccounts[0];

                                return ezApi.ezclocker.ezHttpHelper.ezGet(
                                    `/_api/v1/users/${EzSupportViewController.ezInstance.ezActiveHijackedAccount.hijackedUserId}`)
                                    .then(
                                        ezApi.ezclocker.ezServices.ezProcessApiResolve,
                                        ezApi.ezclocker.ezServices.ezProcessApiReject)
                                    .then(
                                        (userResponse) => {
                                            ezApi.ezclocker.ezUi.ezEnableElement('EzSupportSwapPasswordButton');

                                            ezApi.ezclocker.ezUi.ezSetInputValue(
                                                'EzSupportSwapPasswordAccountUserName',
                                                userResponse.email);

                                            return finished(true);
                                        },
                                        (eUserResponse) => {
                                            ezApi.ezclocker.ezUi.ezEnableElement('EzSupportSwapPasswordButton');

                                            let cleanedUserResponse = {
                                                errorCode: eUserResponse.errorCode,
                                                message: eUserResponse.message,
                                                entity: eUserResponse.entity,
                                                httpStatus: eUserResponse.jqXHR && eUserResponse.jqXHR.status
                                            }

                                            EzSupportViewController.ezInstance.ezHandleResultFailure(
                                                'EzSupportSwapPasswordResults',
                                                cleanedUserResponse.message,
                                                cleanedUserResponse);

                                            return finished(false);
                                        });
                            } else {
                                ezApi.ezclocker.ezUi.ezSetInputValue('EzSupportSwapPasswordAccountUserName', '');

                                EzSupportViewController.ezInstance.ezInitRestoreHijackButton(false);

                                ezApi.ezclocker.ezUi.ezEnableElement('EzSupportSwapPasswordButton');

                                return finished(false);
                            }
                        },
                        (eResponse) => {
                            ezApi.ezclocker.ezUi.ezEnableElement('EzSupportSwapPasswordButton');

                            EzSupportViewController.ezInstance.ezHandleResultFailure(
                                'EzSupportSwapPasswordResults',
                                eResponse,
                                `${eResponse.message} (ErrorCode: ${eResponse.errorCode})`,);

                            return finished(false);
                        });
            });
    }

    ezInitRestoreHijackButton(isPasswordSwapped, isHijacked) {
        ezApi.ezclocker.ezUi.ezDisableElement('EzSupportSwapPasswordButton');
        if (ezApi.ezIsTrue(isPasswordSwapped)) {
            ezApi.ezclocker.ezUi.ezDisableElement('EzSupportSwapPasswordButton');
            ezApi.ezclocker.ezUi.ezHideElement('EzSupportSwapPasswordButton');

            ezApi.ezclocker.ezUi.ezShowElement('EzSupportRestoreSwapPasswordButton');
            ezApi.ezclocker.ezUi.ezEnableElement('EzSupportRestoreSwapPasswordButton');

        } else if (ezApi.ezIsTrue(isHijacked)) {

            ezApi.ezclocker.ezUi.ezDisableElement('EzSupportSwapPasswordButton');
            ezApi.ezclocker.ezUi.ezShowElement('EzSupportSwapPasswordButton');

            ezApi.ezclocker.ezUi.ezDisableElement('EzSupportRestoreSwapPasswordButton');
            ezApi.ezclocker.ezUi.ezHideElement('EzSupportRestoreSwapPasswordButton');

            ezApi.ezclocker.ezUi.ezContent(
                'EzSupportSwapPasswordButton',
                'Swap Password ...');

        } else {
            ezApi.ezclocker.ezUi.ezEnableElement('EzSupportSwapPasswordButton');
            ezApi.ezclocker.ezUi.ezShowElement('EzSupportSwapPasswordButton');

            ezApi.ezclocker.ezUi.ezDisableElement('EzSupportRestoreSwapPasswordButton');
            ezApi.ezclocker.ezUi.ezHideElement('EzSupportRestoreSwapPasswordButton');
        }
    }

    getTimeEntries() {
        let employeeId = ezApi.ezclocker.ezUi.ezGetInputValue('ezAdminTimeEntryEmployeeId');

        let employerId = ezApi.ezclocker.ezUi.ezGetInputValue('ezAdminTimeEntryEmployerId');

        ezApi.ezclocker.ezUi.ezContent(
            'timeEntriesInformationButton_ValidationError', ''
        );

        if (!employerId && !employeeId) {
            ezApi.ezclocker.ezUi.ezContent(
                'timeEntriesInformationButton_ValidationError', 'Please enter at least employer id or employee id'
            );
            return;
        }

        let queryString;

        if (employeeId) {
            queryString = `?employeeId=${employeeId}`;
        }

        if (employerId && queryString) {
            queryString = `${queryString}&employerId=${employerId}`;
        }

        if (employerId && !queryString) {
            queryString = `?employerId=${employerId}`;
        }

        let url = `v1/support/lookup/time-entries${queryString}`;

        return EzSupportViewController.ezInstance.submitAndRenderSupportResponse(undefined, url, 'LOOKUP_TIME_ENTRIES', 'timeEntriesResultsTableBodyId', 'timeEntriesInformationButton_ValidationError');


    }
}