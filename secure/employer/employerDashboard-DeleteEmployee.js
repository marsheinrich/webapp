import {
    EzObject,
    EzBoolean,
    EzString,
    EzHtml,
    EzUrl
} from '/ezlibrary/helpers/EzHelpers.js'

import {
    EzRegistrationState,
    EzFeatureToggleViewName,
    EzFeatureToggleId
} from '/ezlibrary/enums/EzEnumerations.js';

import { EzClass } from '/ezlibrary/EzClass.js';

import { EzUI } from '/public/javascript/common/ezui.js';

/**
    Handles deleting the currently selected employee
    Import with:
        import { EzDeleteEmployeeController } from '/secure/employer/employerDashboard-DeleteEmployee.js';
 */
export class EzDeleteEmployeeController extends EzClass {
    /**
        @static
        @public @readonly @property
        Returns the name of this class's singleton instance when registered with ezApi.
        @returns {string}
     */
    static get ezApiName() {
        return 'ezDeleteEmployeeController';
    }

    /**
        @static
        @public @readonly @property
        Returns an object of event names that this class may trigger.
        @returns {object}
     */
    static get ezEventNames() {
        return {
            onReady: 'ezOn_EzDeleteEmployeeController_Ready'
        };
    }

    /**
        @static
        @private @field
        Stores the singleton instance of this class that was created by and registerd with EzApi.
        @type {EzDeleteEmployeeController}
     */
    static #ezInstance = EzObject.hasProperty(globalThis, 'ezApi') &&
        EzObject.isValid(globalThis.ezApi) && EzBoolean.isTrue(globalThis.ezApi.ready) &&
        EzObject.isValid(globalThis.ezApi.ezclocker[EzDeleteEmployeeController.ezApiName])
        ? globalThis.ezApi.ezclocker[EzDeleteEmployeeController.ezApiName]
        : null;

    /**
        @static
        @public @property @getter
        Returns the singleton instance of this class that is registered with EzApi (if available yet)
        @returns {EzDeleteEmployeeController}
     */
    static get ezInstance() {
        return EzDeleteEmployeeController.#ezInstance;
    }

    /**
        @static
        @public @property @setter
        Sets the singleton instance of of this class that is registered with EzApi.
        @param {EzDeleteEmployeeController} instance
     */
    static set ezInstance(instance) {
        if (null != EzDeleteEmployeeController.#ezInstance) {
            throw new Error('EzDeleteEmployeeController\'s singleton instance is already reigstered with EzApi.');
        }

        EzDeleteEmployeeController.#ezInstance = instance;
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
        EzObject.isValid(globalThis.ezApi.ezclocker[EzDeleteEmployeeController.ezApiName])
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
        return EzDeleteEmployeeController.#ezApiRegistrationState;
    }

    /**
        @static
        @public @property @setter
        Sets the ezApi registration state of this classes's singleton instance.
        @param {string} ezApiRegistrationState
        A valid enum property value from EzRegistrationState
     */
    static set ezApiRegistrationState(ezApiRegistrationState) {
        EzDeleteEmployeeController.#ezApiRegistrationState = EzRegistrationState.ezValueOf(ezApiRegistrationState);
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
        return EzRegistrationState.PENDING === EzDeleteEmployeeController.ezApiRegistrationState &&
            EzObject.hasProperty(globalThis, 'ezApi') &&
            EzObject.isValid(globalThis.ezApi) && EzBoolean.isTrue(globalThis.ezApi.ready) &&

            ezApi.ezclocker[EzUI.ezApiName] &&
            ezApi.ezclocker[EzUI.ezApiName].ready;
    }

    /**
        @static
        @private @readonly @property
        Returns if this class's singleton instance is registered with ezApi yet.
        @returns {boolean}
     */
    static get #ezIsRegistered() {
        return null != EzDeleteEmployeeController.ezInstance &&
            EzRegistrationState.REGISTERED === EzDeleteEmployeeController.ezApiRegistrationState;
    }

    /**
        @static
        @private @method
        Attempts to register the singleton instance for this class with ezApi. Returns true
        if successful, false otherwise.
        @returns {boolean}
     */
    static #ezRegistrator() {
        if (EzDeleteEmployeeController.#ezCanRegister && !EzDeleteEmployeeController.#ezIsRegistered) {
            globalThis.ezApi.ezRegisterNewApi(EzDeleteEmployeeController, EzDeleteEmployeeController.ezApiName);
        }

        return EzDeleteEmployeeController.#ezIsRegistered;
    }

    /**
        @static
        Static Initialization
        ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        >> IMPORTANT <<
        ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        Make sure the following properties and methods get defined BEFORE this static initialization section:
            1) Property getter EzDeleteEmployeeController.ezApiName
            2) Property getter EzDeleteEmployeeController.ezEventNames
            3) Property getter EzDeleteEmployeeController.ezInstance
            4) Property setter EzDeleteEmployeeController.ezInstance
            5) Property getter EzDeleteEmployeeController.ezApiRegistrationState
            6) Property setter EzDeleteEmployeeController.ezApiRegistrationState
            7) Property getter EzDeleteEmployeeController.#ezCanRegister
            8) Property getter EzDeleteEmployeeController.#ezIsRegistered
            9) Method EzDeleteEmployeeController.#ezRegistrator()
     */
    static {
        if (!EzDeleteEmployeeController.#ezIsRegistered) {
            EzDeleteEmployeeController.ezApiRegistrationState = EzRegistrationState.PENDING;

            if (!EzDeleteEmployeeController.#ezRegistrator()) {
                document.addEventListener(
                    EzDeleteEmployeeController.ezOnEzApiReadyEventName,
                    () => {
                        if (!EzDeleteEmployeeController.#ezRegistrator()) {
                            document.addEventListener(
                                EzUI.ezEventNames.onReady,
                                EzDeleteEmployeeController.#ezRegistrator);
                        }
                    });
            }
        }
    }

    /**
        @public @constructor
        >> DO NOT CREATE NEW INSTANCES OUTSIDE OF THE STATIC INITIALIZATION FLOW <<
        Use the static singleton instance available from ezApi: ezApi.ezclocker.ezDeleteEmployeeController.
     */
    constructor() {
        super();
    }

    /**
        @protected @method
        Initializes EzDeleteEmployeeController
        @returns {EzDeleteEmployeeController}
     */
    ezInit() {
        return EzDeleteEmployeeController.ezInstance;
    }

    /**
        @public @method
        Deletes the employee asociated with the provided Id
     */
    ezDeleteEmployee() {

        return ezApi.ezclocker.ezDialog.ezYesNoDialog(
            'Delete Employee',
            EzHtml.build`
                <p>
                    Please confirm you want to permanently delete all of employee
                    ${ezApi.ezclocker.ezClockerContext.ezGetActiveEmployee().employeeName}'s data?
                </p>
                <h3>
                    You cannot restore a deleted employee.
                </h3>`,
            (dResult) => {
                if (ezApi.ezclocker.ezDialog.YES_DIALOG_RESPONSE.dialogStatus !== dResult.dialogStatus) {
                    return ezApi.ezclocker.ezDialog.ezShowOK(
                        'Delete Employee Canceled',
                        EzString.msg`
                            Employee ${ezApi.ezclocker.ezClockerContext.ezGetActiveEmployee().employeeName}
                            was not deleted.`)
                        .then(ezApi.ezIgnoreResolve);
                }
                EzDeleteEmployeeController.ezInstance.ezExecuteDeleteEmployee();
            });
    }

    /**
        @protected @method
        Performs the deletion of an employee by calling the ezClocker internal api to delete
        employee.
     */
    ezExecuteDeleteEmployee() {
        let employeeId = ezApi.ezclocker.ezClockerContext.ezGetActiveEmployee().id;
        let url = ezApi.ezclocker.ezNavigation.ezGetInternalApiUrl(
            EzUrl.build`
                employees/
                ${ezApi.ezclocker.ezClockerContext.ezGetActiveEmployee().id}
                ?target-time-zone-id=${ezApi.ezclocker.ezDateTime.activeTimeZone}`,
            'v2');

        let employeeName = ezApi.ezclocker.ezClockerContext.ezGetActiveEmployee().employeeName;

        return ezApi.ezclocker.ezUi.ezStartPageWaitExecute(
            `Deleting employee ${employeeName} ...`,
            (waitDone) => ezApi.ezclocker.ezHttpHelper.ezDelete(url)
                .then(
                    ezApi.ezclocker.ezServices.ezProcessApiResolve,
                    ezApi.ezclocker.ezServices.ezProcessApiReject)
                .then(
                    () => ezApi.ezclocker.ezClockerContext.ezRefreshSubscriptionContextActiveSubscription()
                        .then(
                            () => {
                                ezApi.ezclocker.ezEmployeeDisplayController.ezSetActiveEmployeeById();

//                                if (ezApi.ezclocker.ezFeatureToggles.ezIsViewFeatureOn(
//                                    EzFeatureToggleViewName.employerDashboard,
//                                    EzFeatureToggleId.ezfTeamChat)) {
//                                    ezApi.ezclocker.ezTeamChatDialog.ezHandleDeleteEmployee(employeeId);
//                                }

                                return ezApi.ezclocker.ezClockerContext.ezRefreshSelectedEmployerEmployees()
                                    .then(
                                        () => waitDone()
                                            .then(
                                                () => ezApi.ezclocker.ezDialog.ezShowOK(
                                                    'Employee Deleted',
                                                    `Employee ${employeeName} deleted successfully.`)),
                                        (eResponse) => waitDone()
                                            .then(
                                                () => EzDeleteEmployeeController.ezInstance.ezShowServiceResponseErrorDialog(
                                                    'Error Refreshing Active Employees',
                                                    'EzClocker encounted an unexpected error while refreshing the available employees.',
                                                    eResponse)));
                            },
                            (eResponse) => waitDone()
                                .then(
                                    () => EzDeleteEmployeeController.ezInstance.ezShowServiceResponseErrorDialog(
                                        'Error Refreshing Account License',
                                        'EzClocker encounted an unexpected error while refreshing the account license.',
                                        eResponse)
                                        .then(EzPromise.ignoreResolve))),
                    (eResponse) => waitDone()
                        .then(
                            () => EzDeleteEmployeeController.ezInstance.ezHandleDeleteEmployeeError(eResponse)
                                .then(EzPromise.ignoreResolve))));
    }

    /**
        @protected @method
        Handles remove employee error response.
        @param {object} eResponse
        @returns {Promise.resolve}
     */
    ezHandleDeleteEmployeeError(eResponse) {
        return EzErrorCode.ezEnumData(EzErrorCode.ERROR_EMPLOYEE_DELETED_RESTRICTION).errorCode == eResponse.errorCode
            // User has a free subscription and has reached the maximum updates per day
            ? ezApi.ezclocker.ezDialog.ezShowOK(
                'Delete Employee Error',
                eResponse.message)
            : ezApi.ezclocker.ezDialog.ezShowServiceResponseErrorDialog(
                'Delete Employees Error',
                'EzClocker encountered an error while deleting the employee.',
                eResponse,
                EzString.buildStr(
                    'Delete Employee Log\n',
                    eResponse.deleteEmployeeLog,
                    '\n\n',
                    'Delete Employee Errors\n',
                    eResponse.errorsReported));
    }
}
