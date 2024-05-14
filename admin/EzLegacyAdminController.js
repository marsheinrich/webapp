import {
    // EzException,
    // EzExceptionInClassMethod,
    EzBadParamException,
    // EzBadStateException,
    // EzStaticClassException,
    // EzNotSupportedException
} from '/ezlibrary/exceptions/EzExceptions.js';

import {
    EzObject,
    EzBoolean,
    // EzNumber,
    // EzFloat,
    EzString,
    // EzArray,
    EzUrl,
    EzHtml,
    // EzFunction,
    // EzJson,
    // EzConsole,
    // EzAsync,
    // EzUTF8CharHelper,
    EzPromise
} from '/ezlibrary/helpers/EzHelpers.js';

import {
    // EzElementEventName,
    // EzEnvironment,
    // EzRequestMethod,
    // EzMediaType,
    // EzFeatureToggleViewName,
    // EzFeatureToggleId,
    // EzFeaturePackageId
    // EzUserRoleFeature
    // EzCharacterEncoding
    // EzClockerContextEventName,
    // EzValidationResponseStatus,
    // EzUserPermissionType,
    // EzClockerFeature,
    // EzDialogResponseStatus,
    // EzLocale
    EzRegistrationState
} from '/ezlibrary/enums/EzEnumerations.js';

import { EzClass } from '/ezlibrary/EzClass.js';

import { EzEventEngine } from '/ezlibrary/ez-event-engine.js';

import { EzUI } from '/public/javascript/common/ezui.js';

import { EzDialog } from '/public/javascript/common/ezclocker-dialog-helper.js';

/**
 * @class
 * @extends {EzClass}
 * @description
 * Description of what class is for here :)
 * -----------------------------------------------------------------
 * Import with:
 *     import { EzLegacyAdminController } from '/templates/EzLegacyAdminController.js';
 * -----------------------------------------------------------------
 * Ready Check:
 *     globalThis.ezApi.ezclocker[EzLegacyAdminController.ezApiName] &&
 *     globalThis.ezApi.ezclocker[EzLegacyAdminController.ezApiName].ready
 * -----------------------------------------------------------------
 * Listen for Ready Event:
 *     document.addEventListener(
 *         EzLegacyAdminController.ezEventNames.onReady,
 *         <destination_class_name>.#ezRegistrator);
 * -----------------------------------------------------------------
 * Static references:
 *     Inside this class...: EzLegacyAdminController.ezInstance
 *     Outside this class..: ezApi.ezclocker.EzLegacyAdminController
 * -----------------------------------------------------------------
 */
export class EzLegacyAdminController extends EzClass {
    /**
     * @static
     * @public @readonly @property
     * Returns the name of this class's singleton instance when registered with ezApi.
     * @returns {string}
     */
    static get ezApiName() {
        return 'ezLegacyAdminController';
    }

    /**
     * @static
     * @public @readonly @property
     * Returns an object of event names that this class may trigger.
     * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
     * ENGINEERING NOTES
     *     You must always define the onReady event name for classes that
     *     register singleton instances with EzApi.
     *
     *     The registration with EzApi flow will trigger this classes
     *     onReady event once it has completed all registration steps.
     *
     *     You can add additional event name 'constants' for events this
     *     class triggers that other external classes might also want
     *     to listen to.
     *
     *     Adding event names below provides external
     *     classes with a constant for the event name so they can avoid
     *     typos when listenting for events.
     * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
     * @returns {object}
     */
    static get ezEventNames() {
        return {
            onReady: 'ezOn_EzLegacyAdminController_Ready'
        };
    }

    /**
     * @static
     * @private @field
     * Stores the singleton instance of this class that was created by and registerd with EzApi.
     * @type {EzLegacyAdminController}
     */
    static #ezInstance = EzObject.hasProperty(globalThis, 'ezApi') &&
        EzObject.isValid(globalThis.ezApi) && EzBoolean.isTrue(globalThis.ezApi.ready) &&
        EzObject.isValid(globalThis.ezApi.ezclocker[EzLegacyAdminController.ezApiName])
        ? globalThis.ezApi.ezclocker[EzLegacyAdminController.ezApiName]
        : null;

    /**
     * @static
     * @public @property @getter
     * Returns the singleton instance of this class that is registered with EzApi (if available yet)
     * @returns {EzLegacyAdminController}
     */
    static get ezInstance() {
        return EzLegacyAdminController.#ezInstance;
    }

    /**
     * @static
     * @public @property @setter
     * Sets the singleton instance of of this class that is registered with EzApi.
     * @param {EzLegacyAdminController} instance
     */
    static set ezInstance(instance) {
        if (null != EzLegacyAdminController.#ezInstance) {
            throw new EzException('EzLegacyAdminController\'s singleton instance is already reigstered with EzApi.');
        }

        EzLegacyAdminController.#ezInstance = instance;
    }

    /**
     * @static
     * @private @field
     * Stores the EzApi registration state for this class.
     * This class is considered register with EzApi when the
     * ezApiRegistrationState value equals EzRegistrationState.REGISTERED
     * @type {string}
     * A valid enum property value from EzRegistrationState
     */
    static #ezApiRegistrationState = EzObject.hasProperty(globalThis, 'ezApi') &&
        EzObject.isValid(globalThis.ezApi) && EzBoolean.isTrue(globalThis.ezApi.ready) &&
        EzObject.isValid(globalThis.ezApi.ezclocker[EzLegacyAdminController.ezApiName])
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
        return EzLegacyAdminController.#ezApiRegistrationState;
    }

    /**
     * @static
     * @public @property @setter
     * Sets the ezApi registration state of this classes's singleton instance.
     * @param {string} ezApiRegistrationState
     * A valid enum property value from EzRegistrationState
     */
    static set ezApiRegistrationState(ezApiRegistrationState) {
        EzLegacyAdminController.#ezApiRegistrationState = EzRegistrationState.ezValueOf(ezApiRegistrationState);
    }

    /**
     * @static
     * @private @readonly @property
     * Returns true when all required dependencies for this class report that their
     * singleton instance is created and registered with ezApi. Dependency classes
     * report they are ready by triggering their onRead event.
     * @returns {boolean}
     */
    static get #ezCanRegister() {
        return EzRegistrationState.PENDING === EzLegacyAdminController.ezApiRegistrationState &&
            EzObject.hasProperty(globalThis, 'ezApi') &&
            EzObject.isValid(globalThis.ezApi) && EzBoolean.isTrue(globalThis.ezApi.ready) &&

            globalThis.ezApi.ezclocker[EzClockerContext.ezApiName] &&
            globalThis.ezApi.ezclocker[EzClockerContext.ezApiName].ready &&

            globalThis.ezApi.ezclocker[EzUI.ezApiName] &&
            globalThis.ezApi.ezclocker[EzUI.ezApiName].ready &&

            globalThis.ezApi.ezclocker[EzDialog.ezApiName] &&
            globalThis.ezApi.ezclocker[EzDialog.ezApiName].ready;
    }

    /**
     * @static
     * @private @readonly @property
     * Returns if this class's singleton instance is registered with ezApi yet.
     * @returns {boolean}
     */
    static get #ezIsRegistered() {
        return null != EzLegacyAdminController.ezInstance &&
            EzRegistrationState.REGISTERED === EzLegacyAdminController.ezApiRegistrationState;
    }

    /**
     * @static
     * @private @method
     * Attempts to register the singleton instance for this class with ezApi. Returns true
     * if successful, false otherwise.
     * @returns {boolean}
     */
    static #ezRegistrator() {
        if (EzLegacyAdminController.#ezCanRegister && !EzLegacyAdminController.#ezIsRegistered) {
            globalThis.ezApi.ezRegisterNewApi(EzLegacyAdminController, EzLegacyAdminController.ezApiName);
        }

        return EzLegacyAdminController.#ezIsRegistered;
    }

    /**
     * @static
     * Static Initialization
     * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
     * >> IMPORTANT <<
     * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
     * Make sure the following static properties and methods always appear
     * BEFORE this static initialization section:
     *    1) Property getter EzLegacyAdminController.ezApiName
     *    2) Property getter EzLegacyAdminController.ezEventNames
     *    3) Property getter EzLegacyAdminController.ezInstance
     *    4) Property setter EzLegacyAdminController.ezInstance
     *    5) Property getter EzLegacyAdminController.ezApiRegistrationState
     *    6) Property setter EzLegacyAdminController.ezApiRegistrationState
     *    7) Property getter EzLegacyAdminController.#ezCanRegister
     *    8) Property getter EzLegacyAdminController.#ezIsRegistered
     *    9) Method EzLegacyAdminController.#ezRegistrator()
     * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
     */
    static {
        if (!EzLegacyAdminController.#ezIsRegistered) {
            EzLegacyAdminController.ezApiRegistrationState = EzRegistrationState.PENDING;

            if (!EzLegacyAdminController.#ezRegistrator()) {
                document.addEventListener(
                    EzLegacyAdminController.ezOnEzApiReadyEventName,
                    EzLegacyAdminController.#ezRegistrator);

                document.addEventListener(
                    EzSubscribeToPlanDialog.ezOnEzApiReadyEventName,
                    EzLegacyAdminController.#ezRegistrator);

                document.addEventListener(
                    EzUI.ezEventNames.onReady,
                    EzLegacyAdminController.#ezRegistrator);

                document.addEventListener(
                    EzDialog.ezEventNames.onReady,
                    EzLegacyAdminController.#ezRegistrator);
            }
        }
    }

    /**
     * @public @constructor
     * >> DO NOT CREATE NEW INSTANCES OUTSIDE OF THE STATIC INITIALIZATION FLOW <<
     */
    constructor() {
        super();
    }

    testEmailPayLoad = EzString.EMPTY;

    lastUrl = EzString.EMPTY;

    get ezProcessingSpinnerHtml() {
        return EzHtml.build`
            <img
                id="EzAdminProcessingSpinnerImg"
                class="ezAdmin-processing-spinner"
                src="/images/spinners/infinity-snake-spinner-black.svg"/>`;
    }

    /**
     * @public @method
     * Initializes EzLegacyAdminController
     * @returns {EzLegacyAdminController}
     */
    ezInit() {
        return EzLegacyAdminController.ezInstance;
    }


    sendTestEmail() {
        EzLegacyAdminController.ezInstance.lastUrl = '../v1/_email/template/test';

        let data = ezApi.ezclocker.ezUi.ezGetInputValue('_EmailTestDataFields');

        EzLegacyAdminController.ezInstance.testEmailPayLoad = {
            templateName: ezApi.ezclocker.ezGetInputValue("_EmailTestName"),
            recipient: ezApi.ezclocker.ezGetInputValue('_EmailTestRecipient'),
            dataFields: data.trim()
        };

        ezApi.ezclocker.ezUi.ezSetContent(
            '_TestEmailResults',
            EzHtml.build`
                <div
                    id="SendTestEmail_EndpointContainer">
                    <h4>
                        Endpoint
                    </h4>
                    ${lastUrl}
                </div>
                 <div
                    id="SendTestEmail_PayloadContainer">
                    <h4>
                        Payload
                    </h4>
                    ${EzLegacyAdminController.ezInstance.testEmailPayLoad}
                </div>
                <div
                    id="SendTestEmail_ResultsContainer">
                    ${EzLegacyAdminController.ezInstance.ezProcessingSpinnerHtml}
                </div>`);

        ezApi.ezclocker.ezHttpHelper.ezPost(
            EzLegacyAdminController.ezInstance.lastUrl,
            EzLegacyAdminController.ezInstance.testEmailPayLoad)
            .then(
                EzLegacyAdminController.ezInstance.sendTestEmailSuccess,
                EzLegacyAdminController.ezInstance.handelError);
    }

    sendTestEmailSuccess(response) {
        ezApi.ezclocker.ezUi.ezAppendContent(
            'SendTestEmail_ResultsContainer',
            EzHtml.build`
                <h4>
                    Response
                </h4>
                <div
                    id="SendTestEmail_ResponseContainer">
                    ${EzJson.toJson(response, 3, true)}
                </div>`);
    }

    // Force Email Queue
    forceEmailQueueSubmit(event) {
        ezApi.ezclocker.ezHttpHelper.ezHandleSubmitForm(event)
            .then(
                EzLegacyAdminController.ezInstance.forceEmailQueueSuccess,
                EzLegacyAdminController.ezInstance.handelError);
    }

    forceEmailQueueSuccess(response) {
        alert(
            EzString.msg(
                "Successfuly forced processing of the email queue.",
                "Response: ",
                EzJSON.toJson(response)));
    }

    getEmailTemplateSubmit(event) {
        ezApi.ezclocker.ezSetContent(
            'getEmailTemplateResults',
            EzLegacyAdminController.ezInstance.ezProcessingSpinnerHtml);

        ezApi.ezclocker.ezHttpHelper.ezHandleSubmitForm(event)
            .then(
                (response) => ezApi.ezclocker.ezSetContent(
                    'getEmailTemplateResults',
                    response.toString()),
                EzLegacyAdminController.ezInstance.handelError);
    }

    removeEmailTemplateSubmit(event) {
        ezApi.ezclocker.ezSetContent(
            'removeEmailTemplateResults',
            EzLegacyAdminController.ezInstance.ezProcessingSpinnerHtml);

        ezApi.ezclocker.ezHttpHelper.ezHandleSubmitForm(event)
            .then(
                (response) => ezApi.ezclocker.ezSetContent(
                    'removeEmailTemplateResults',
                    response.toString()),
                EzLegacyAdminController.ezInstance.handelError);
    }

    // Update email template
    updateEmailTemplateSubmit(event) {
        ezApi.ezclocker.ezSetContent(
            'updateEmailTemplateResults',
            EzLegacyAdminController.ezInstance.ezProcessingSpinnerHtml);

        ezApi.ezclocker.ezHttpHelper.ezHandleSubmitForm(event)
            .then(
                (response) => ezApi.ezclocker.ezSetContent(
                    'updateEmailTemplateResults',
                    response.toString()),
                EzLegacyAdminController.ezInstance.handelError);
    }

    addEmailTemplateSubmit(event) {
        ezApi.ezclocker.ezSetContent(
            'addEmailTemplateResults',
            EzLegacyAdminController.ezInstance.ezProcessingSpinnerHtml);

        ezApi.ezclocker.ezHttpHelper.ezHandleSubmitForm(event)
            .then(
                (response) => ezApi.ezclocker.ezSetContent(
                    'addEmailTemplateResults',
                    response.toString()),
                EzLegacyAdminController.ezInstance.handelError);
    }

    listDeveloperEmployersSubmit(event) {
        ezApi.ezclocker.ezSetContent(
            'listDeveloperEmployersResults',
            EzLegacyAdminController.ezInstance.ezProcessingSpinnerHtml);

        ezApi.ezclocker.ezHttpHelper.ezHandleSubmitForm(event)
            .then(
                (response) => ezApi.ezclocker.ezSetContent(
                    'listDeveloperEmployersResults',
                    response.toString()),
                EzLegacyAdminController.ezInstance.handelError);
    }

    removeEmployerSubmit(event) {
        ezApi.ezclocker.ezSetContent(
            'removeEmployerResults',
            EzLegacyAdminController.ezInstance.ezProcessingSpinnerHtml);

        let customEndpoint = EzUrl.build`
            ${event.currentTarget.action}/
            ${ezApi.ezclocker.ezUi.ezGetInputValue('employerId')}`;

        ezApi.ezclocker.ezHttpHelper.ezHandleSubmitForm(
            event,
            customEndpoint)

        ezApi.ezclocker.ezHttpHelper.ezHandleSubmitForm(event)
            .then(
                (response) => ezApi.ezclocker.ezSetContent(
                    'removeEmployerResults',
                    response.toString()),
                EzLegacyAdminController.ezInstance.handelError);
    }

    removeEmployeeSubmit(event) {
        ezApi.ezclocker.ezSetContent(
            'removeEmployeeResults',
            EzLegacyAdminController.ezInstance.ezProcessingSpinnerHtml);

        let customEndpoint = EzUrl.build`
            ${event.currentTarget.action}
            /${ezApi.ezclocker.ezUi.ezGetInputValue('employerIdOfEmployee')}
            /${ezApi.ezclocker.ezUi.ezGetInputValue('employeeId')}`;

        ezApi.ezclocker.ezHttpHelper.ezHandleSubmitForm(
            event,
            customEndpoint)

        ezApi.ezclocker.ezHttpHelper.ezHandleSubmitForm(event)
            .then(
                (response) => ezApi.ezclocker.ezSetContent(
                    'removeEmployeeResults',
                    response.toString()),
                EzLegacyAdminController.ezInstance.handelError);
    }

    getPromoCodeUrl() {
        ezApi.ezclocker.ezHttpHelper.ezGet('/special/server/domain')
            .then(
                EzLegacyAdminController.ezInstance.generatePromoUrl,
                EzLegacyAdminController.ezInstance.handelError);
    }

    generatePromoUrl(response) {
        let code = ezApi.ezclocker.ezUi.ezGetInputValue('_PromoCode');

        let data = ezApi.ezclocker.ezUi.ezGetInputValue('_PromoData');

        let target = ezApi.ezclocker.ezUi.ezGetInputValue('_PromoTarget');

        let domain = response.message;

        let promoUrl = EzUrl.build`
            ${domain}/promo
            ?code=${encodeURIComponent(code)}`;

        if (EzString.hasLength(data)) {
            promoUrl = EzUrl.build`
                ${promoUrl}
                &data=${encodeURIComponent(data)}`;
        }

        if (EzString.hasLength(target)) {
            promoUrl = EzUrl.build`
                ${promoUrl}
                &url=${encodeURIComponent(target)}`;
        }

        ezApi.ezclocker.ezSetContent(
            '_PromoUrlResults',
            EzHtml.build`
                <a
                    href="${promoUrl}"
                    target="_new">
                    ${promoUrl}
                </a>`);
    }

    /**
     * @public @method
     * Handles the delete account button click
     */
    deleteAccount() {
        let userName = ezApi.ezclocker.ezUi.ezGetInputValue('ezAdminDeleteAccountUserName');

        if (!EzString.hasLength(userName)) {
            ezApi.ezclocker.ezUi.ezSetContent(
                'ezAdminDeleteUserAccountResults',
                EzHtml.build`
                    <h4>
                        Delete Account Failed
                    </h4>
                    <h4>
                        Response
                    </h4>
                    <div
                        id="EzDeleteAccountResponseContainer">
                        Please enter a valid username
                    </div>`);

            return;
        }

        ezApi.ezclocker.ezHttpHelper.ezDelete(
            ezApi.ezclocker.ezNavigation.ezGetInternalApiUrl(
                `account?username=${userName}`))
            .then(
                ezApi.ezclocker.ezHttpHelper.ezProcessApiResolve,
                ezApi.ezclocker.ezHttpHelper.ezProcessApiReject)
            .then(
                (response) => ezApi.ezclocker.ezUi.ezSetContent(
                    'ezAdminDeleteUserAccountResults',
                    EzHtml.build`
                        <h4>
                            Account Successfully Deleted
                        </h4>
                        <h4>
                            Response
                        </h4>
                        <div
                            id="EzDeleteAccountResponseContainer">
                            ${EzJson.toJson(response, 3, true)}`),
                (eResponse) => ezApi.ezclocker.ezUi.ezSetContent(
                    'ezAdminDeleteUserAccountResults',
                    EzHtml.build`
                        <h4>
                            Delete Account Failed
                        </h4>
                        <h4>
                            Response
                        </h4>
                        <div
                            id="EzDeleteAccountResponseContainer">
                            ${EzJson.toJson(eResponse, 3, true)}`));

    }

    createEmployeeInvite() {
        let userFullName = ezApi.ezclocker.ezUi.ezGetInputValue('ezAdminCreateInviteFullUserName');

        let userEmail = ezApi.ezclocker.ezUi.ezGetInputValue('ezAdminCreateInviteEmailId');

        if (ezApi.ezStringHasLength(userFullName) && ezApi.ezStringHasLength(userEmail)) {
            let url = `/_api/v1/admin/create-employee-invite?full-name=${userFullName}&user-name=${userEmail}`;

            ezApi.ezclocker.ezHttpHelper.ezGet(url)
                .then(
                    (response) => {
                        ezApi.ezclocker.ezUi.ezSetInputValue('ezAdminCreateInviteFullUserName', '');

                        ezApi.ezclocker.ezUi.ezSetInputValue('ezAdminCreateInviteEmailId', '');

                        if (200 !== response.errorCode) {
                            ezApi.ezclocker.ezUi.ezContent(
                                'ezAdminCreateEnInviteResults',
                                ezApi.ezToJson(response.message, 3));

                            return;
                        }

                        ezApi.ezclocker.ezUi.ezContent(
                            'ezAdminCreateEnInviteResults',
                            EzHtml.build`
                                    Invite created for ${userFullName}: ${response.message}`);
                    },
                    (eResponse) => {
                        ezApi.ezclocker.ezUi.ezSetInputValue('ezAdminCreateInviteFullUserName', '');

                        ezApi.ezclocker.ezUi.ezSetInputValue('ezAdminCreateInviteEmailId', '');

                        ezApi.ezclocker.ezUi.ezContent(
                            'ezAdminCreateEnInviteResults',
                            ezApi.ezToJson(eResponse, 3));
                    });
        } else {
            ezApi.ezclocker.ezUi.ezContent(
                'ezAdminCreateEnInviteResults',
                'Username and email id are both required. Please enter both');
        }
    }

    moveEmployeeToEmployer() {
        document.getElementById('moveEmployeeToEmployerSubmitButton').disabled = true;

        document.getElementById('moveEmployeeToEmployerSubmitButton').hidden = true;

        let employeeEmail = ezApi.ezclocker.ezUi.ezGetInputValue('ezAdminBulkMoveEmployeesFromEmployer');

        let toEmployerEmailId = ezApi.ezclocker.ezUi.ezGetInputValue('ezAdminBulkMoveEmployeesToEmployer');

        if (ezApi.ezStringHasLength(employeeEmail) && ezApi.ezStringHasLength(toEmployerEmailId)) {
            ezApi.ezclocker.ezUi.ezContent(
                'ezAdminBulkMoveEmployeesResults',
                'Please wait..... Transaction in process. Employee ' + employeeEmail + ' being moved to ' + toEmployerEmailId);

            let url = ezApi.ezclocker.ezNavigation.ezGetInternalApiUrl(
                '_admin/data/migration/move/employee' + '?employeeEmail=' + employeeEmail + '&destination-employerEmail=' + toEmployerEmailId);

            ezApi.ezclocker.http.ezGet(url).then(
                (response) => {
                    ezApi.ezclocker.ezUi.ezSetInputValue('ezAdminBulkMoveEmployeesFromEmployer', '');

                    ezApi.ezclocker.ezUi.ezSetInputValue('ezAdminBulkMoveEmployeesToEmployer', '');

                    document.getElementById('moveEmployeeToEmployerSubmitButton').disabled = false;

                    document.getElementById('moveEmployeeToEmployerSubmitButton').hidden = false;

                    if (0 !== response.errorCode) {
                        ezApi.ezclocker.ezUi.ezContent(
                            'ezAdminBulkMoveEmployeesResults',
                            ezApi.ezToJson(response, 3));

                        return;
                    }

                    ezApi.ezclocker.ezUi.ezContent('ezAdminBulkMoveEmployeesResults', 'Employee ' + employeeEmail + ' moved to ' + toEmployerEmailId);
                },
                (eResponse) => {
                    ezApi.ezclocker.ezUi.ezSetInputValue('ezAdminBulkMoveEmployeesFromEmployer', '');

                    ezApi.ezclocker.ezUi.ezSetInputValue('ezAdminBulkMoveEmployeesToEmployer', '');

                    document.getElementById('moveEmployeeToEmployerSubmitButton').disabled = false;

                    document.getElementById('moveEmployeeToEmployerSubmitButton').hidden = false;

                    ezApi.ezclocker.ezUi.ezContent('ezAdminBulkMoveEmployeesResults', ezApi.ezToJson(eResponse, 3));
                });
        } else {
            ezApi.ezclocker.ezUi.ezContent(
                'ezAdminBulkMoveEmployeesResults',
                ezApi.ezclocker.ezToJson('Employee email id and employer email id are both required. Please enter both', 3));
        }
    }

    handelError(jqXHR, status, error) {
        alert(error);
    }
}
