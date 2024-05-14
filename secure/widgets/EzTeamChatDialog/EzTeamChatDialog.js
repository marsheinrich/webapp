import { EzRegistrationState } from '/ezlibrary/enums/EzRegistrationState.js';

import { EzClass } from '/ezlibrary/EzClass.js';

import { EzDateTime } from '/public/javascript/common/ez-date-time.js';

import {
    EzObject,
    EzNumber,
    EzString
} from '/ezlibrary/helpers/EzHelpers.js';

import { EzEventEngine } from '/ezlibrary/ez-event-engine.js';
import {
    EzElementEventName,
    EzFeatureToggleId,
    EzFeatureToggleViewName,
    EzClockerContextEventName
} from '/ezlibrary/enums/EzEnumerations.js';

import { EzClockerContext } from '/ezlibrary/EzClockerContext/ez-context.js';

//import { EzClockerFeature } from '/ezlibrary/EzClockerFeature.js';
import { EzFeatureToggles } from '/ezlibrary/ez-feature-toggles2.js';

import { EzUI } from '/public/javascript/common/ezui.js';

import { EzDialogConfig, EzDialog } from '/public/javascript/common/ezclocker-dialog-helper.js';

//import { EzTeamChatClient } from '/ezlibrary/EzTeamChat/EzTeamChatClient.js';

/**
    Requires the host HTML file to import:
        <script src="/ezlibrary/EzTeamChat/ez-team-chat-ui.bundle.js"></script>
    Import with:
        import { EzTeamChatDialog } from '/secure/widgets/EzTeamChatDialog/EzTeamChatDialog.js';

        document.addEventListener(
            EzTeamChatDialog.ezEventNames.onReady,
            this.#ezRegistrator)

        globalThis.ezApi.ezclocker[EzTeamChatDialog.ezApiName] &&
        globalThis.ezApi.ezclocker[EzTeamChatDialog.ezApiName].ready
 */
export class EzTeamChatDialog extends EzClass {
    static get TEAM_CHAR_BASE_URL() {
//        return 'https://unnivm.github.io/mychat/';
		return '/ezwp/ezteamchat/build/index.html';
    }

    /**
        @public @static @field
        @type {EzTeamChatDialog}
     */
    static #ezInstance = Object.prototype.hasOwnProperty.call(globalThis, 'ezApi') &&
        globalThis.ezApi &&
        Object.prototype.hasOwnProperty.call(globalThis.ezApi, 'ezclocker') &&
        globalThis.ezApi.ezclocker &&
        Object.prototype.hasOwnProperty.call(globalThis.ezApi.ezclocker, EzTeamChatDialog.ezApiName) &&
        globalThis.ezApi.ezclocker[EzTeamChatDialog.ezApiName]
        ? globalThis.ezApi.ezclocker[EzTeamChatDialog.ezApiName]
        : null;

    /**
        @public @static @field
        @type {String}
        Acceptable values: null, 'PENDING', 'REGISTERED'
     */
    static #ezApiRegistrationState = Object.prototype.hasOwnProperty.call(globalThis, 'ezApi') &&
        globalThis.ezApi &&
        Object.prototype.hasOwnProperty.call(globalThis.ezApi, 'ezclocker') &&
        globalThis.ezApi.ezclocker &&
        Object.prototype.hasOwnProperty.call(globalThis.ezApi.ezclocker, EzTeamChatDialog.ezApiName) &&
        globalThis.ezApi.ezclocker[EzTeamChatDialog.ezApiName]
        ? EzRegistrationState.REGISTERED
        : null;

    /**
        @public @static @readonly @property
        Returns the name of this class's singleton instance when registered with ezApi.
        @returns {string}
     */
    static get ezApiName() {
        return 'ezTeamChatDialog';
    }

    /**
        @public @static @readonly @property
        Returns an object of event names that this class may trigger.
        @returns {object}
     */
    static get ezEventNames() {
        return {
            onReady: 'ezOn_EzTeamChatDialog_Ready'
        };
    }

    /**
        @public @static @property @getter
        Returns the ezApi registration state of this classes's singleton instance.
        @returns {string}
        A valid enum property value from EzRegistrationState
     */
    static get ezApiRegistrationState() {
        return EzTeamChatDialog.#ezApiRegistrationState;
    }

    /**
        @public @static @property @setter
        Sets the ezApi registration state of this classes's singleton instance.
        @param {string} ezApiRegistrationState
        A valid enum property value from EzRegistrationState
     */
    static set ezApiRegistrationState(ezApiRegistrationState) {
        EzTeamChatDialog.#ezApiRegistrationState = EzRegistrationState.ezValueOf(ezApiRegistrationState);
    }

    /**
        @public @static @getter @property
        Returns the singleton instance of this class that is registered with EzApi (if available yet)
        @param {EzTeamChatDialog}
     */
    static get ezInstance() {
        return EzTeamChatDialog.#ezInstance;
    }

    /**
        @public @static @getter @property
        Sets the singleton instance of of this class that is registered with EzApi.
        @param {EzTeamChatDialog} ezTeamChatDialog
     */
    static set ezInstance(ezTeamChatDialog) {
        if (null != EzTeamChatDialog.#ezInstance) {
            throw new Error('EzTeamChatDialog\'s singleton instance is already reigstered with EzApi.');
        }

        EzTeamChatDialog.#ezInstance = ezTeamChatDialog;
    }

    /**
        @public @static @readonly @property
        @returns {boolean}
     */
    static get ezCanRegister() {
        return EzRegistrationState.PENDING === EzTeamChatDialog.ezApiRegistrationState &&
            Object.prototype.hasOwnProperty.call(globalThis, 'ezApi') &&
            globalThis.ezApi && globalThis.ezApi.ready &&

            globalThis.ezApi.ezclocker[EzDateTime.ezApiName] &&
            globalThis.ezApi.ezclocker[EzDateTime.ezApiName].ready &&

            globalThis.ezApi.ezclocker[EzEventEngine.ezApiName] &&
            globalThis.ezApi.ezclocker[EzEventEngine.ezApiName].ready &&

            globalThis.ezApi.ezclocker[EzClockerContext.ezApiName] &&
            globalThis.ezApi.ezclocker[EzClockerContext.ezApiName].ready &&

            globalThis.ezApi.ezclocker[EzFeatureToggles.ezApiName] &&
            globalThis.ezApi.ezclocker[EzFeatureToggles.ezApiName].ready &&

            globalThis.ezApi.ezclocker[EzUI.ezApiName] &&
            globalThis.ezApi.ezclocker[EzUI.ezApiName].ready &&

            globalThis.ezApi.ezclocker[EzDialog.ezApiName] &&
            globalThis.ezApi.ezclocker[EzDialog.ezApiName].ready;

//            globalThis.ezApi.ezclocker[EzTeamChatClient.ezApiName] &&
//            globalThis.ezApi.ezclocker[EzTeamChatClient.ezApiName].ready;
    }

    /**
        @private @static @readonly @property
        Returns if this class's singleton instance is registered with ezApi yet.
        @returns {boolean}
     */
    static get #ezIsRegistered() {
		//console.log("FRIOCTrr");
        return null != EzTeamChatDialog.ezInstance &&
            EzRegistrationState.REGISTERED === EzTeamChatDialog.ezApiRegistrationState;
    }

    /**
        @private @static @method
        Attempts to register the singleton instance for this class with ezApi. Returns true
        if successful, false otherwise.
        @returns {boolean}
     */
    static #ezRegistrator() {
        if (EzTeamChatDialog.ezCanRegister && !EzTeamChatDialog.#ezIsRegistered) {
            globalThis.ezApi.ezRegisterNewApi(EzTeamChatDialog, EzTeamChatDialog.ezApiName);
        }

        return EzRegistrationState.REGISTERED === EzTeamChatDialog.ezApiRegistrationState;
    }

    /**
        Static initialization
     */
    static {
        if (!EzTeamChatDialog.#ezIsRegistered) {
            EzTeamChatDialog.ezApiRegistrationState = EzRegistrationState.PENDING;

            if (!EzTeamChatDialog.#ezRegistrator()) {
                document.addEventListener(
                    EzClass.ezOnEzApiReadyEventName,
                    () => {
                        if (!EzTeamChatDialog.#ezRegistrator()) {
                            document.addEventListener(
                                EzDateTime.ezEventNames.onReady,
                                EzTeamChatDialog.#ezRegistrator);

                            document.addEventListener(
                                EzEventEngine.ezEventNames.onReady,
                                EzTeamChatDialog.#ezRegistrator);

                            document.addEventListener(
                                EzClockerContext.ezEventNames.onReady,
                                EzTeamChatDialog.#ezRegistrator);

                            document.addEventListener(
                                EzFeatureToggles.ezEventNames.onReady,
                                EzTeamChatDialog.ezRegistrator);

                            document.addEventListener(
                                EzUI.ezEventNames.onReady,
                                EzTeamChatDialog.#ezRegistrator);

                            document.addEventListener(
                                EzDialog.ezEventNames.onReady,
                                EzTeamChatDialog.#ezRegistrator);

//                            document.addEventListener(
//                                EzTeamChatClient.ezEventNames.onReady,
//                                EzTeamChatDialog.#ezRegistrator);
                        }
                    });
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
        @public @readonly @property
        @returns {string}
     */
    get ezDialogId() {
        return 'EzTeamChatDialog';
    }

    /**
        @protected @method
        Initializes EzTeamChatDialog
        @returns {EzTeamChatDialog}
     */
    ezInit() {
        ezApi.ezclocker.ezEventEngine.ezWantEventEx({
            eventName: EzFeatureToggles.ezEventNames.onFeatureTogglesReady,
            handlerName: EzTeamChatDialog.ezApiName,
            handlerFunction: EzTeamChatDialog.ezInstance.ezHandleFeatureTogglesReady,
            options: {
                immediateTriggerIfAlreadyTriggered: true,
                unwantAfterFirstTrigger: true
            }
        });

        ezApi.ezclocker.ezEventEngine.ezWantEvent(
            EzClockerContextEventName.onSelectedEmployerAccountReady,
            EzTeamChatDialog.ezApiName,
            EzTeamChatDialog.ezInstance.ezHandleSelectedEmployerAccountReadyEvent);

        ezApi.ezclocker.ezEventEngine.ezWantEvent(
            EzClockerContextEventName.onActiveEmployeeReady,
            EzTeamChatDialog.ezApiName,
            EzTeamChatDialog.ezInstance.ezHandleActiveEmployeeReadyEvent);

        return EzTeamChatDialog.ezInstance;
    }

    /**
        @protected @method
        Initializes the dialog's UX
     */
    ezInitUX() {
        ezApi.ezclocker.ezUi.ezAppendContent(
            'body',
            EzTeamChatDialog.ezInstance.ezBuildTeamChatDialog());

        let ezDialogConfig = new EzDialogConfig(EzTeamChatDialog.ezInstance.ezDialogId);
        ezDialogConfig.title = 'Team Chat';
        ezDialogConfig.width = '60%' //1320;
        ezDialogConfig.height = 820;
        ezDialogConfig.resizable = true;
        ezDialogConfig.position = {
            my: 'right-8 bottom-8',
            at: 'right bottom',
            of: window,
            collision: 'fit'
        };
        ezDialogConfig.modal = false;
        ezDialogConfig.buttons = [
            {
                text: 'Close',
                id: EzTeamChatDialog.ezInstance.ezAddTimeEntryButtonId,
                click: EzTeamChatDialog.ezInstance.ezClose,
            }
        ];

        ezApi.ezclocker.ezDialog.ezInitDialogWithConfig(
            EzTeamChatDialog.ezInstance.ezDialogId,
            ezDialogConfig);
    }

    /**
        @protected @method
        Applies any needed role toggles to the UX
     */
    ezApplyRoleToggles() {
        // Apply any role toggles here
    }

    /**
        @protected @method
        Applies any needed Feature toggles to the UX
     */
    ezApplyFeatureToggles() {
        // apply any feature toggles here
    }

    /**
        @protected @method
        Initializes Team Chat for the employer
     */
    ezInitEmployerTeamChatClient() {
		//console.log("FRIOCTa");
        let employer = ezApi.ezclocker.ezClockerContext.ezGetSelectedEmployerAccount();
        if (!EzObject.isValid(employer) || !EzNumber.isNumber(employer.id)) {
            return;
        }

//        ezApi.ezclocker.ezTeamChatClient.ezGetAwsEmployer(employer.id)
//            .then(
//                (data) => {
//					console.log("FRIOCTc");
//                    EzTeamChatDialog.ezInstance.ezHandleEzTeamChatClientSuccessResponse('ezGetAwsEmployer', data);
//                    ezApi.ezclocker.ezLogger.info(`[data.data.getEmployer]: ${data.data.getEmployer}`);
//
//                    if (!data.data.getEmployer) {
//                        ezApi.ezclocker.ezTeamChatClient.ezCreateNewAwsEmployer(employer.id, employer.employerName);
//
//                        const employerEmployees = ezApi.ezclocker.ezClockerContext.ezGetSelectedEmployerAccountEmployeeAccountsById();
//
//                        if (ezApi.ezArrayHasLength(employerEmployees)) {
//                            for (let employeeId of employerEmployees) {
//                                ezApi.ezclocker.ezTeamChatClient.createNewAwsEmployee(
//                                    employer.id,
//                                    employeeId,
//                                    employerEmployees[employeeId].employeeName)
//                                    .then(
//                                        (response) => EzTeamChatDialog.ezInstance.ezHandleEzTeamChatClientSuccessResponse('ezGetAwsEmployer', response),
//                                        (eResponse) => EzTeamChatDialog.ezInstance.ezHandleEzTeamChatClientFailureResponse(
//                                            ezApi.ezclocker.ezTeamChatClient,
//                                            ezApi.ezclocker.ezTeamChatClient.createNewAwsEmployee,
//                                            eResponse))
//                                    .catch(
//                                        (err) => EzTeamChatDialog.ezInstance.ezHandleEzTeamChatClientFailureResponse(
//                                            ezApi.ezclocker.ezTeamChatClient,
//                                            ezApi.ezclocker.ezTeamChatClient.createNewAwsEmployee,
//                                            err));
//                            }
//                        }
//
//                    }
//                },
//                (eResponse) => EzTeamChatDialog.ezInstance.ezHandleEzTeamChatClientFailureResponse(
//                    ezApi.ezclocker.ezTeamChatClient,
//                    ezApi.ezclocker.ezTeamChatClient.ezGetAwsEmployer,
//                    eResponse))
//            .catch(
//                (err) => EzTeamChatDialog.ezInstance.ezHandleEzTeamChatClientFailureResponse(
//                    ezApi.ezclocker.ezTeamChatClient,
//                    ezApi.ezclocker.ezTeamChatClient.ezGetAwsEmployer,
//                    err));
    }

    /**
        @protected @method
        Handles the EzClockerContextEventName.onSelectedEmployerAccountReady event
        Processes employer account data and creates EzTeamChat employer if needed.
        @param {ezEvent}
     */
    ezHandleSelectedEmployerAccountReadyEvent(ezEvent) {
        if (ezApi.ezclocker.ezFeatureToggles.ezIsViewFeatureOn(
            EzFeatureToggleViewName.ezTeamChatDialog,
            EzFeatureToggleId.ezfTeamChat)) {
            EzTeamChatDialog.ezInstance.ezInitEmployerTeamChatClient();
        }
    }

    /**
        @protected @method
        Initializes Team Chat for the employee
     */
    ezInitEmployeeTeamChatClient() {
        let activeEmployeeId = ezApi.ezclocker.ezClockerContext.ezGetActiveEmployee().id;

//        ezApi.ezclocker.ezTeamChatClient.ezGetAwsEmployee(activeEmployeeId)
//            .then(
//                (data) => {
//                    if (!data.data.getEmployee) {
//                        ezApi.ezclocker.ezTeamChatClient.ezCreateNewAwsEmployee(
//                            ezApi.ezclocker.ezClockerContext.ezGetActiveEmployer().id,
//                            activeEmployeeId,
//                            ezApi.ezclocker.ezClockerContext.ezGetActiveEmployee().employeeName)
//                            .then(
//                                (response) => EzTeamChatDialog.ezInstance.ezHandleEzTeamChatClientSuccessResponse(
//                                    ezApi.ezclocker.ezTeamChatClient,
//                                    ezApi.ezclocker.ezTeamChatClient.ezCreateNewAwsEmployee,
//                                    response),
//                                (eResponse) => EzTeamChatDialog.ezInstance.ezHandleEzTeamChatClientFailureResponse(
//                                    ezApi.ezclocker.ezTeamChatClient,
//                                    ezApi.ezclocker.ezTeamChatClient.ezCreateNewAwsEmployee,
//                                    eResponse))
//                            .catch(
//                                (err) => EzTeamChatDialog.ezInstance.ezHandleEzTeamChatClientFailureResponse(
//                                    ezApi.ezclocker.ezTeamChatClient,
//                                    ezApi.ezclocker.ezTeamChatClient.ezCreateNewAwsEmployee,
//                                    err));
//                    }
//                },
//                EzTeamChatDialog.ezInstance.ezHandleEzTeamChatApiReject);
    }



    /**
        @protected @method
        Handles the EzClockerContextEventName.onActiveEmployeeReady
        Initializes the EZTeamChat feature by adding employees.
     */
    ezHandleActiveEmployeeReadyEvent() {
        if (ezApi.ezclocker.ezFeatureToggles.ezIsViewFeatureOn(
            EzFeatureToggleViewName.ezTeamChatDialog,
            EzFeatureToggleId.ezfTeamChat)) {
            EzTeamChatDialog.ezInstance.ezInitEmployeeTeamChatClient();
        }
    }

    /**
        @public @method
        Shows the team chat dialog.
     */
    ezShow(isEmployee) {
		console.log("FriOct-cliiick2");
        if (!ezApi.ezclocker.ezFeatureToggles.ezIsViewFeatureOn(
            EzFeatureToggleViewName.ezTeamChatDialog,
            EzFeatureToggleId.ezfTeamChat)) {
			console.log("FriOct-cliiick2 -not enabled");
            // Feature is not enabled
            return;
        }

        EzTeamChatDialog.ezInstance.ezIsEmployee = ezApi.ezIsTrue(isEmployee);
        ezApi.ezclocker.ezDialog.ezShowDialog(EzTeamChatDialog.ezInstance.ezDialogId);
		console.log("FriOct-cliiick2");

        EzTeamChatDialog.ezInstance.ezInjectTeamChatIFrame();
		console.log("FriOct-cliiick3");
    }

    /**
        @public @method
        Closes the team chat dialog
     */
    ezClose() {
        ezApi.ezclocker.ezDialog.ezCloseDialog(EzTeamChatDialog.ezInstance.ezDialogId);
    }

    /**
        @protected @method
        Builds the HTML for the team chat dialog
        @returns {string}
     */
    ezBuildTeamChatDialog() {
        return ezApi.ezTemplate`
            <div id="${EzTeamChatDialog.ezInstance.ezDialogId}_HiddenContainer" style="display:none">
                <style>
                    .ezTeamChatContainer {
                        display: grid;
                        grid-template-columns: auto;
                        grid-template-rows: auto;
                        justify-content: stretch;
                        align-content: stretch;
                    }
                    .ezTeamChatIFrame {
                        border-style: none;
                        border-width: 0px;
                    }
                </style>
                <div id="${EzTeamChatDialog.ezInstance.ezDialogId}" title="ezClocker Team Chat">
                    <div id="${EzTeamChatDialog.ezInstance.ezDialogId}_IFrameContainer" class="ezTeamChatContainer" frameborder="0">
                    </div>
                </div>
            </div>`;
    }

    /**
        @protected @method
        Injects the team chat iFrame html
     */
    ezInjectTeamChatIFrame() {
		console.log("OctFri:iframe");
        let teamChatUrl;

        if (ezApi.ezclocker.ezClockerContext.ezGetUserContext().isEmployer) {
            const employerEmployees = ezApi.ezclocker.ezClockerContext.ezGetSelectedEmployerAccountEmployeeAccountsById();
            ezApi.ezclocker.ezLogger.debug(`Employer employees: ${employerEmployees}`);

            let employerId = ezApi.ezclocker.ezClockerContext.ezGetActiveEmployer().id;

//            for (let employeeId in employerEmployees) {
//                ezApi.ezclocker.ezTeamChatClient.ezCreateNewAwsEmployee(
//                    employerId,
//                    employerEmployees[employeeId].id,
//                    employerEmployees[employeeId].employeeName)
//                    .then(
//                        (response) => EzTeamChatDialog.ezInstance.ezHandleEzTeamChatClientSuccessResponse(
//                            ezApi.ezclocker.ezTeamChatClient,
//                            ezApi.ezclocker.ezTeamChatClient.ezCreateNewAwsEmployee,
//                            response),
//                        (eResponse) => EzTeamChatDialog.ezInstance.ezHandleEzTeamChatClientFailureResponse(
//                            ezApi.ezclocker.ezTeamChatClient,
//                            ezApi.ezclocker.ezTeamChatClient.ezCreateNewAwsEmployee,
//                            eResponse))
//                    .catch(
//                        (err) => EzTeamChatDialog.ezInstance.ezHandleEzTeamChatClientFailureResponse(
//                            ezApi.ezclocker.ezTeamChatClient,
//                            ezApi.ezclocker.ezTeamChatClient.ezCreateNewAwsEmployee,
//                            err));
//            }

//            for (let employee in employerEmployees) {
//                if (employerEmployees[employee].id === ezApi.ezclocker.ezClockerContext.ezGetActiveEmployee().id) {
//                    ezApi.ezclocker.ezTeamChatClient.ezUpdateAwsEmployee(
//                        employerEmployees[employee].id,
//                        employerEmployees[employee].employeeName,
//                        employerEmployees[employee].employeeContactEmail)
//                        .then(
//                            (response) => EzTeamChatDialog.ezInstance.ezHandleEzTeamChatClientSuccessResponse(
//                                ezApi.ezclocker.ezTeamChatClient,
//                                ezApi.ezclocker.ezTeamChatClient.ezUpdateAwsEmployee,
//                                response),
//                            (eResponse) => EzTeamChatDialog.ezInstance.ezHandleEzTeamChatClientFailureResponse(
//                                ezApi.ezclocker.ezTeamChatClient,
//                                ezApi.ezclocker.ezTeamChatClient.ezUpdateAwsEmployee,
//                                eResponse))
//                        .catch(
//                            (err) => EzTeamChatDialog.ezInstance.ezHandleEzTeamChatClientFailureResponse(
//                                ezApi.ezclocker.ezTeamChatClient,
//                                ezApi.ezclocker.ezTeamChatClient.ezUpdateAwsEmployee,
//                                err));
//                    break;
//                }
//            }
        }
		console.log("xxOctFri:iframe..zlaunching..");

		let employerId = ezApi.ezclocker.ezClockerContext.ezGetActiveEmployer().id;
		let employeeId = ezApi.ezclocker.ezClockerContext.ezGetActiveEmployee().id;

        if (ezApi.ezclocker.ezClockerContext.ezGetUserContext().isEmployer) {
            teamChatUrl = ezApi.ezUrlTemplate`${EzTeamChatDialog.TEAM_CHAR_BASE_URL}
			?employerId=${employerId}`;
			//no employee

//                ?userId=${ezApi.ezclocker.ezClockerContext.ezGetActiveEmployer().id}
//                &name=${ezApi.ezclocker.ezClockerContext.ezGetActiveEmployer().employerName}
//                &filterId=${ezApi.ezclocker.ezClockerContext.ezGetActiveEmployer().id}`;
        } else {
            teamChatUrl = ezApi.ezUrlTemplate`${EzTeamChatDialog.TEAM_CHAR_BASE_URL}
			?employerId=${employerId}
			&employeeId=${employeeId}`;

//                ?userId=${ezApi.ezclocker.ezClockerContext.ezGetActiveEmployer().id}
//                &name=${ezApi.ezclocker.ezClockerContext.ezGetActiveEmployer().employerName}
//                &filterId=${ezApi.ezclocker.ezClockerContext.ezGetActiveEmployee().id}`;
        }
		console.log("xOctFri:iframe url: " + teamChatUrl);

        ezApi.ezclocker.ezUi.ezContent(
            `${EzTeamChatDialog.ezInstance.ezDialogId}_IFrameContainer`,
            ezApi.ezTemplate`
                <iframe id="${EzTeamChatDialog.ezInstance.ezDialogId}_TeamChatIFrame" width="100%"
                    src="${teamChatUrl}"
                    class="ezTeamChatIFrame"/>`);

        EzTeamChatDialog.ezInstance.ezHandleDialogResizeEvent();

        ezApi.ezclocker.ezEventEngine.ezWantElementEvent(
            EzTeamChatDialog.ezInstance.ezDialogId,
            EzElementEventName.RESIZE,
            EzTeamChatDialog.ezApiName,
            EzTeamChatDialog.ezInstance.ezHandleDialogResizeEvent);
    }

    /**
        @protected @method
        Removes the teamchat iframe from the dialog
     */
    ezRemoveTeamChatIFrame() {
        ezApi.ezclocker.ezEventEngine.ezUnwantElementEvent(
            EzTeamChatDialog.ezInstance.ezDialogId,
            EzElementEventName.RESIZE,
            EzTeamChatDialog.ezApiName);

        ezApi.ezclocker.ezUi.ezRemoveElement(`${EzTeamChatDialog.ezInstance.ezDialogId}_IFrameContainer`);
    }

    /**
        @protected @method
        Handles the dialog resize event.
     */
    ezHandleDialogResizeEvent() {
        ezApi.ezclocker.ezUi.ezSetElementProperty(
            `${EzTeamChatDialog.ezInstance.ezDialogId}_TeamChatIFrame`,
            'height',
            ezApi.ezclocker.ezUi.ezGetElementHeight(EzTeamChatDialog.ezInstance.ezDialogId));
    }

//    /**
//        @protected @method
//        Perform a soft delete for a user in AWS
//        @param {*} employeeId
//     */
//    ezHandleDeleteEmployee(employeeId) {
//        if (null == employeeId) {
//            throw new EzBadParamException(
//                'employeeId',
//                EzTeamChatDialog.ezInstance,
//                EzTeamChatDialog.ezInstance.ezHandleDeleteEmployee);
//        }
//
//        ezApi.ezclocker.ezTeamChatClient.ezDeleteEmployee(employeeId)
//            .then(
//                (response) => EzTeamChatDialog.ezInstance.ezHandleEzTeamChatClientSuccessResponse(
//                    EzTeamChatDialog.ezInstance.ezHandleDeleteEmployee,
//                    response),
//                (eResponse) => EzTeamChatDialog.ezInstance.ezHandleEzTeamChatClientFailureResponse(
//                    EzTeamChatDialog.ezInstance.ezHandleDeleteEmployee,
//                    eResponse))
//            .catch((err) => EzTeamChatDialog.ezInstance.ezHandleEzTeamChatClientFailureResponse(
//                EzTeamChatDialog.ezInstance.ezHandleDeleteEmployee,
//                err));
//    }

    /**
        @protected @method
        Handles the promise reject of EzTeamChat AWS Api calls using the wrapper class EzTeamChatClient
        @param {object} eResponse
        {
            errorCode: <number>,
            message: <string>
        }
     */
    ezHandleEzTeamChatApiReject(eResponse) {
        if (ezApi.ezIsValid(eResponse)) {

            let errorCode = 500;
            if (ezApi.ezIsNumber(eResponse.errorCode)) {
                errorCode = eResponse.errorCode;
            } else if (ezApi.ezIsValid(eResponse.status)) {
                errorCode = eResponse.status;
            }
            errorCode = errorCode.toString();

            let stack = ezApi.ezIsValid(eResponse.stack)
                ? eResponse.stack
                : 'none';

            ezApi.ezclocker.ezLogger.error(
                ezApi.ezEM`
                    EzTeamChat AWS API error: (${errorCode}) ${eResponse.message},
                    Additional details: ${ezApi.ezToJson(eResponse)}
                    Stack: ${stack}`);
        } else {
            ezApi.ezclocker.ezLogger.error('Error calling a EzTeamChat AWS API function. No additional details provided.');
        }
    }

    /**
        @protected @method
        Handles success responses from the EzTeamChatClient
        @param {undefined|null|Object} clazzInstance
        @param {undefined|null|Function} clazzMethod
        @param {*} response
     */
    ezHandleEzTeamChatClientSuccessResponse(clazzInstance, clazzMethod, response) {
        if (ezApi.ezStringHasLength(operationInfo)) {
            ezApi.ezclocker.ezLogger.info(`[SUCCESS]: ${operationInfo}`);
        }

        let className = ezApi.ezGuessClassName(clazzInstance, '');
        let methodName = ezApi.ezGuessMethodName(clazzMethod);
        let classAndMethod = ezApi.ezStringHasLength(methodName) && ezApi.ezStringHasLength(className)
            ? `${className}.${methodName}`
            : `${className}${methodName}`;

        if (ezApi.ezIsValid(response)) {
            ezApi.ezclocker.ezLogger.debug(`[SUCCESS]: ${classAndMethod}, Response: ${ezApi.ezToJson(response)}`);
        }
    }

    /**
        @protected @method
        Handles success responses from the EzTeamChatClient
        @param {undefined|null|Object} clazzInstance
        @param {undefined|null|Function} clazzMethod
        @param {*} eResponse
     */
    ezHandleEzTeamChatClientFailureResponse(clazzInstance, clazzMethod, eResponse) {
		console.log("FRIOctfail");
		console.log(eResponse);
        if (ezApi.ezIsValid(eResponse)) {
            ezApi.ezclocker.ezLogger.error(`[FAILURE]: ${ezApi.ezErrorEntityAsErrorMessage(eResponse, '', clazzInstance, clazzMethod)}`);
        }
    }

    /**
        @protected @method
        Handles the Feature Toggles ready event
     */
    ezHandleFeatureTogglesReady() {
        if (ezApi.ezclocker.ezFeatureToggles.ezIsViewFeatureOn(
            EzFeatureToggleViewName.ezTeamChatDialog,
            EzFeatureToggleId.ezfTeamChat)) {
            EzTeamChatDialog.ezInstance.ezInitUX();

            EzTeamChatDialog.ezInstance.ezApplyFeatureToggles();
        }
    }
}
