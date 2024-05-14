/**
    EzClocker Exceptions Imports
    NOTE: Remove all imported exceptions you do not use in the class.
 */
import {
    EzException,
    EzExceptionInClassMethod,
    EzBadParamException,
    EzBadStateException,
    EzStaticClassException
} from '/ezlibrary/exceptions/EzExceptions.js';

/**
    EzClocker Helper Classes
    NOTE: Remove all imports you do not use
 */
import {
    EzObject,
    EzNumber,
    EzFloat,
    EzBoolean,
    EzString,
    EzArray,
    EzFunction,
    EzPromise,
    EzJson,
    EzHtml,
    EzUrl
} from '/ezlibrary/helpers/EzHelpers.js';

/**
    EzClocker Enumeration Imports
    NOTE: Remove any enumerations you do not use
 */
import {
    EzRegistrationState,
    EzElementEventName
} from '/ezlibrary/enums/EzEnumerations.js';

/**
   Base class for all EzApi registered classes
 */
import { EzClass } from '/ezlibrary/EzClass.js';

/**
  Access via: ezApi.ezclocker.ezUi
  Used for HTML document manipulation
  NOTE: Remove the EzUI import and the related ready checks and ready event hook
  if not using in the class.
 */
import { EzUI } from '/public/javascript/common/ezui.js';

/**
    @class
    @extends {EzClass}
    @description
    Provides Recycled Employee administration actions
    ---------------------------------------------------------------------
    Import with:
        import { EzRecycledEmployeeAdminActions } from '/admin/EzRecycledEmployeeAdminActions.js';
    ---------------------------------------------------------------------
    Ready Check:
        globalThis.ezApi.ezclocker[EzRecycledEmployeeAdminActions.ezApiName] &&
        globalThis.ezApi.ezclocker[EzRecycledEmployeeAdminActions.ezApiName].ready
    ---------------------------------------------------------------------
    Listen for Ready Event:
        document.addEventListener(
            EzRecycledEmployeeAdminActions.ezEventNames.onReady,
            this.#ezRegistrator);
    ---------------------------------------------------------------------
*/
export class EzRecycledEmployeeAdminActions extends EzClass {
    /**
      @static
      @public @readonly @property
      Returns the name of this class's singleton instance when registered with ezApi.
      NOTE: Use the name of the class with the first letter as lower case for the
      ezApiName value.
      @returns {string}
   */
    static ezApiName = 'ezRecycledEmployeeAdminActions';

    /**
        @static
        @public @readonly @property
        Returns an object of event names that this class may trigger.
        NOTE:
        Always include the onReady event with value based upon the following template:
            onReady: 'ezOn_EzRecycledEmployeeAdminActions_Ready'
        @returns {object}
     */
    static ezEventNames = {
        onReady: 'ezOn_EzRecycledEmployeeAdminActions_Ready'
        /* Add any events this classes triggers using ezApi.ezEventEngine.ezTriggerEvent below */
        // Example: onEzRecycledEmployeeAdminActionsDataLoaded: 'ezOn_EzRecycledEmployeeAdminActions_DataLoaded'
    };

    /**
        @static
        @private @field
        Stores the singleton instance of this class that was created by and registerd with EzApi.
        @type {EzRecycledEmployeeAdminActions}
     */
    static #ezInstance = EzObject.hasProperty(globalThis, 'ezApi') &&
        EzObject.isValid(globalThis.ezApi) && EzBoolean.isTrue(globalThis.ezApi.ready) &&
        EzObject.isValid(globalThis.ezApi.ezclocker[EzRecycledEmployeeAdminActions.ezApiName])
        ? globalThis.ezApi.ezclocker[EzRecycledEmployeeAdminActions.ezApiName]
        : null;

    /**
        @static
        @public @property @getter
        Returns the singleton instance of this class that is registered with EzApi (if available yet)
        @returns {EzRecycledEmployeeAdminActions}
     */
    static get ezInstance() {
        return EzRecycledEmployeeAdminActions.#ezInstance;
    }

    /**
        @static
        @public @property @setter
        Sets the singleton instance of of this class that is registered with EzApi.
        @param {EzRecycledEmployeeAdminActions} instance
     */
    static set ezInstance(instance) {
        if (null != EzRecycledEmployeeAdminActions.#ezInstance) {
            throw new EzException('EzRecycledEmployeeAdminActions\'s singleton instance is already reigstered with EzApi.');
        }

        EzRecycledEmployeeAdminActions.#ezInstance = instance;
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
        EzObject.isValid(globalThis.ezApi.ezclocker[EzRecycledEmployeeAdminActions.ezApiName])
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
        return EzRecycledEmployeeAdminActions.#ezApiRegistrationState;
    }

    /**
        @static
        @public @property @setter
        Sets the ezApi registration state of this classes's singleton instance.
        @param {string} ezApiRegistrationState
        A valid enum property value from EzRegistrationState
     */
    static set ezApiRegistrationState(ezApiRegistrationState) {
        EzRecycledEmployeeAdminActions.#ezApiRegistrationState = EzRegistrationState.ezValueOf(ezApiRegistrationState);
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
        return EzRegistrationState.PENDING === EzRecycledEmployeeAdminActions.ezApiRegistrationState &&
            EzObject.hasProperty(globalThis, 'ezApi') &&
            EzObject.isValid(globalThis.ezApi) && EzBoolean.isTrue(globalThis.ezApi.ready) &&

            /*
                IMPORTANT NOTE:
                If a ready check is added here then you must also add the onReady event
                listener in the static initialization section.
            */

            /* Add ready checks below for all dependencies used in this class that also register with EzApi */

            globalThis.ezApi.ezclocker[EzUI.ezApiName] &&
            globalThis.ezApi.ezclocker[EzUI.ezApiName].ready;
    }

    /**
       @static
       @private @readonly @property
       Returns if this class's singleton instance is registered with ezApi yet.
       @returns {boolean}
     */
    static get #ezIsRegistered() {
        return null != EzRecycledEmployeeAdminActions.ezInstance &&
            EzRegistrationState.REGISTERED === EzRecycledEmployeeAdminActions.ezApiRegistrationState;
    }

    /**
       @static
       @private @method
       Attempts to register the singleton instance for this class with ezApi. Returns true
       if successful, false otherwise.
       @returns {boolean}
     */
    static #ezRegistrator() {
        if (EzRecycledEmployeeAdminActions.#ezCanRegister && !EzRecycledEmployeeAdminActions.#ezIsRegistered) {
            globalThis.ezApi.ezRegisterNewApi(EzRecycledEmployeeAdminActions, EzRecycledEmployeeAdminActions.ezApiName);
        }

        return EzRecycledEmployeeAdminActions.#ezIsRegistered;
    }

    /**
        @static
        Static Initialization
        ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        >> IMPORTANT <<
        ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        Make sure the following properties and methods get defined BEFORE this static initialization section:
           1) Property getter EzRecycledEmployeeAdminActions.ezApiName
           2) Property getter EzRecycledEmployeeAdminActions.ezEventNames
           3) Property getter EzRecycledEmployeeAdminActions.ezInstance
           4) Property setter EzRecycledEmployeeAdminActions.ezInstance
           5) Property getter EzRecycledEmployeeAdminActions.ezApiRegistrationState
           6) Property setter EzRecycledEmployeeAdminActions.ezApiRegistrationState
           7) Property getter EzRecycledEmployeeAdminActions.#ezCanRegister
           8) Property getter EzRecycledEmployeeAdminActions.#ezIsRegistered
           9) Method EzRecycledEmployeeAdminActions.#ezRegistrator()
     */
    static {
        if (!EzRecycledEmployeeAdminActions.#ezIsRegistered) {
            EzRecycledEmployeeAdminActions.ezApiRegistrationState = EzRegistrationState.PENDING;

            if (!EzRecycledEmployeeAdminActions.#ezRegistrator()) {
                document.addEventListener(
                    EzRecycledEmployeeAdminActions.ezOnEzApiReadyEventName,
                    EzRecycledEmployeeAdminActions.#ezRegistrator);

                /*
                    IMPORTANT:
                    If a dependency ready check is added to the EzRecycledEmployeeAdminActions.#ezCanRegister()
                    then you must also add the onReady listener here.
                */

                // NOTE: Remove this listener if your class does not render UX or
                // need to manipulate the HTML document.
                document.addEventListener(
                    EzUI.ezEventNames.onReady,
                    EzRecycledEmployeeAdminActions.#ezRegistrator);
            }
        }
    }

    /**
        @public @constructor
        >> DO NOT CREATE NEW INSTANCES OUTSIDE OF THE STATIC INITIALIZATION FLOW <<
        Use the static singleton instance available from ezApi: ezApi.ezclocker.ezRecycledEmployeeAdminActions.
     */
    constructor() {
        super();
    }

    get ezIds() {
        return {
            containers: {
                ezViewRestoreRecycledEmployeeResultsContainerId: 'EzViewRestoreRecycledEmployeeResults',
                ezEmployerRecyledEmployeesLayoutContainerId: 'EzEmployerRecyledEmployeesLayoutContainer',
                ezRestoreRecycledEmployeeResultsContainerId: 'EzRestoreRecycledEmployeeResults'
            },
            buttons: {
                ezViewRecycledEmployeesButtonId: 'EzViewRecycledEmployeesButton',
                ezRestoreRecycledEmployeeButtonId: 'EzRestoreRecycledEmployeeButton'
            },
            inputs: {
                ezRecycledEmployeeEmployerIdInputId: 'EzRecycledEmployeeEmployerId',
                ezRecycledEmployeeEmployerUserNameInputId: 'EzRecycledEmployeeEmployerUserName',
                ezRecycledEmployeeIdInputId: 'EzRecycledEmployeeId',
                ezRecycledEmployeeOriginalEmployeeIdInputId: 'EzRecycledEmployeeOriginalEmployeeId',
                ezRestoreRecycledEmployeeTimeEntriesCheckboxId: 'EzRestoreRecycledEmployeeTimeEntries',
                ezRestoreRecycledEmployeeIfOriginalIdNullCheckboxId: 'EzRestoreRecycledEmployeeIfOriginalIdNull'
            }
        };
    }

    ezInit() {
        ezApi.ezclocker.ezEventEngine.ezWantElementEvent(
            EzRecycledEmployeeAdminActions.ezInstance.ezIds.buttons.ezViewRecycledEmployeesButtonId,
            EzElementEventName.CLICK,
            EzRecycledEmployeeAdminActions.ezApiName,
            EzRecycledEmployeeAdminActions.ezInstance.ezViewRecycledEmployees);

        ezApi.ezclocker.ezEventEngine.ezWantElementEvent(
            EzRecycledEmployeeAdminActions.ezInstance.ezIds.buttons.ezRestoreRecycledEmployeeButtonId,
            EzElementEventName.CLICK,
            EzRecycledEmployeeAdminActions.ezApiName,
            EzRecycledEmployeeAdminActions.ezInstance.ezRestoreRecycledEmployee);
    }

    /**
        @public @method
        Obtains the recycled employees for the employer id or employer user name and displays the
        results on the admin page.
     */
    ezViewRecycledEmployees() {
        let employerId = ezApi.ezclocker.ezUi.ezGetInputValue(
            EzRecycledEmployeeAdminActions.ezInstance.ezIds.inputs.ezRecycledEmployeeEmployerIdInputId);

        let employerUserName = ezApi.ezclocker.ezUi.ezGetInputValue(
            EzRecycledEmployeeAdminActions.ezInstance.ezIds.inputs.ezRecycledEmployeeEmployerUserNameInputId);

        if (EzString.stringHasLength(employerId)) {
            return EzRecycledEmployeeAdminActions.ezInstance.ezGetRecycledEmployeesForEmployerId(EzNumber.asNumber(employerId));
        }

        if (EzString.stringHasLength(employerUserName)) {
            return EzRecycledEmployeeAdminActions.ezInstance.ezGetRecycledEmployeesForEmployerUserName(employerUserName);
        }
    }

    /**
        @public @method
        Gets the list of recycled employees for the entered employer id
        @param {Number} employerId
     */
    ezGetRecycledEmployeesForEmployerId(employerId) {
        if (!EzNumber.isNumber(employerId)) {
            return;
        }

        ezApi.ezclocker.ezUi.ezContent(
            EzRecycledEmployeeAdminActions.ezInstance.ezIds.containers.ezViewRestoreRecycledEmployeeResultsContainerId,
            `Getting list of recycled employees for employerId=${employerId} ...`);

        return ezApi.ezclocker.ezHttpHelper.ezGet(`/_api/v1/admin/recycle-center/employer/${employerId}/recycled-employees`)
            .then(
                (response) => EzRecycledEmployeeAdminActions.ezInstance.ezDisplayEmployerRecycledEmployees(response.entities),
                (eResponse) => {
                    ezApi.ezclocker.ezUi.ezContent(
                        EzRecycledEmployeeAdminActions.ezInstance.ezIds.containers.ezViewRestoreRecycledEmployeeResultsContainerId,
                        EzHtml.build`
                            <h3>View Recycled Employees Error</h3>
                            <p>${eResponse.message}</p>
                            <div>Error response: ${EzJson.toJson(eResponse, true, true)}</div>`);
                });
    }

    /**
        @public @method
        Gets the list of recycled employees for the entered employer user name
        @param {String} employerUserName
     */
    ezGetRecycledEmployeesForEmployerUserName(employerUserName) {
        if (!EzString.stringHasLength(employerUserName)) {
            return;
        }

        ezApi.ezclocker.ezUi.ezContent(
            EzRecycledEmployeeAdminActions.ezInstance.ezIds.containers.ezViewRestoreRecycledEmployeeResultsContainerId,
            `Getting list of recycled employees for employer with username=${employerUserName} ...`);

        return ezApi.ezclocker.ezHttpHelper.ezGet(`/_api/v1/admin/recycle-center/employer/username/${employerUserName}/recycled-employees`)
            .then(
                (response) => EzRecycledEmployeeAdminActions.ezInstance.ezDisplayEmployerRecycledEmployees(response.entities),
                (eResponse) => {
                    ezApi.ezclocker.ezUi.ezContent(
                        EzRecycledEmployeeAdminActions.ezInstance.ezIds.containers.ezViewRestoreRecycledEmployeeResultsContainerId,
                        EzHtml.build`
                            <h3>View Recycled Employees Error</h3>
                            <p>${eResponse.message}</p>
                            <div>Error response: ${EzJson.toJson(eResponse, true, true)}</div>`);
                });
    }

    /**
        @public @method
        Displays the employer's recycled employees
     */
    ezDisplayEmployerRecycledEmployees(recycledEmployees) {
        let recycledEmployeeResults = '';

        if (EzArray.arrayHasLength(recycledEmployees)) {
            for (let recycledEmployee of recycledEmployees) {

                let deletedDisplayDate = EzString.stringHasLength(recycledEmployee.deletedDateTimeIso)
                    ? ezApi.ezclocker.ezDateTime.ezToDisplayDateTime(
                        ezApi.ezclocker.ezDateTime.ezFromIso(recycledEmployee.deletedDateTimeIso))
                    : 'N/A';
                let recycledEmployeeName = recycledEmployee.name;
                let originalEmployeeId = EzNumber.numberOrNull(recycledEmployee.originalEmployeeId);
                let recycledEmployeeId = EzNumber.numberOrNull(recycledEmployee.id);
                let resultsId = EzRecycledEmployeeAdminActions.ezInstance.ezIds.containers.ezViewRestoreRecycledEmployeeResultsContainerId;

                let restoreButton = EzNumber.isNumber(recycledEmployee.id)
                    ? EzHtml.build`
                        <button
                            id="EzRecycledEmployeeInfo_RestoreButton"
                            onclick="ezApi.ezclocker.ezRecycledEmployeeAdminActions.ezHandleRestoreEmployerRecycledEmployeeClick('${recycledEmployeeName}', '${resultsId}', ${recycledEmployeeId}, ${originalEmployeeId})">
                            Restore Recycled Employee ${recycledEmployee.employeeName} (${recycledEmployeeId})...
                        </button>`
                    : EzHtml.build`
                        <div
                            class="ezText-error-ezDarkAlertRed">
                            Cannot restore this recycled employee due to a mising recycled employee id.
                        </div>`;

                recycledEmployeeResults = EzHtml.build`${recycledEmployeeResults}
                    <div
                        id="EzRecycledEmployeeInfo_${recycledEmployee.id}">
                        <h3>${recycledEmployee.employeeName}</h3>
                        <ul>
                            <li>
                                Recycled employee id: ${recycledEmployeeId}
                            </li>
                            <li>
                                Original employee id: ${originalEmployeeId}
                            </li>
                            <li>
                                Deleted date: ${deletedDisplayDate}
                            </li>
                        </ul>
                        ${restoreButton}
                    </div>`;
            }
        } else {
            recycledEmployeeResults = '<h3>Employer does not have any recycled employees.</h3>';
        }

        ezApi.ezclocker.ezUi.ezContent(
            EzRecycledEmployeeAdminActions.ezInstance.ezIds.containers.ezViewRestoreRecycledEmployeeResultsContainerId,
            EzHtml.build`
                <div
                    id="EzEmployerRecycledEmployeeListResults">
                    <h2>
                        Employer Recycled Employees
                    </h2>
                    <div
                        id="EzEmployerRecyledEmployeesLayoutContainer"
                        class="ezAutoCol_AxAxA">
                        ${recycledEmployeeResults}
                    </div>
                </div>`);
    }

    /**
        @protected @method
        Handles the restore employer recycled employee list view's button click
        @param {string} resultsContainerId
        @param {number} recycledEmployeeId
        @param {number} originalEmployeeId
     */
    ezHandleRestoreEmployerRecycledEmployeeClick(recycledEmployeeName, resultsContainerId, recycledEmployeeId, originalEmployeeId) {
        ezApi.ezclocker.ezUi.ezContent(
            resultsContainerId,
            EzHtml.build`
                <h3>
                    Restoring Recycled Employee ${recycledEmployeeName}
                </h3>
                <img src="/images/Infinity-172px.svg" style="width:172"/>`);

        EzRecycledEmployeeAdminActions.ezInstance.ezRestoreRecycledEmployee(
            resultsContainerId,
            recycledEmployeeId,
            originalEmployeeId,
            true,
            false);
    }

    /**
        @public @method
        Restores a recycled (deleted) employee
     */
    ezRestoreRecycledEmployee(outputContainerId, recycledEmployeeId, originalEmployeeId, alsoRestoreRecycledTimeEntries, restoreEmployeeEvenIfOriginalIdNull) {
        if (!EzString.stringHasLength(outputContainerId)) {
            outputContainerId = EzRecycledEmployeeAdminActions.ezInstance.ezIds.containers.ezRestoreRecycledEmployeeResultsContainerId;
        }

        let payload = {
            recycledEmployeeId: EzNumber.isNumber(recycledEmployeeId)
                ? recycledEmployeeId
                : EzNumber.asNumber(
                    ezApi.ezclocker.ezUi.ezGetInputValue(
                        EzRecycledEmployeeAdminActions.ezInstance.ezIds.inputs.ezRecycledEmployeeIdInputId)),
            originalEmployeeId: EzNumber.isNumber(originalEmployeeId)
                ? originalEmployeeId
                : EzNumber.asNumber(
                    ezApi.ezclocker.ezUi.ezGetInputValue(
                        EzRecycledEmployeeAdminActions.ezInstance.ezIds.inputs.ezRecycledEmployeeOriginalEmployeeIdInputId)),
            restoreTimeEntries: EzBoolean.isBoolean(alsoRestoreRecycledTimeEntries)
                ? alsoRestoreRecycledTimeEntries
                : ezApi.ezclocker.ezUi.ezIsCheckBoxChecked(
                    EzRecycledEmployeeAdminActions.ezInstance.ezIds.inputs.ezRestoreRecycledEmployeeTimeEntriesCheckboxId),
            restoreEmployeeIfOriginalEmployeeIdNull: EzBoolean.isTrue(restoreEmployeeEvenIfOriginalIdNull)
                ? restoreEmployeeEvenIfOriginalIdNull
                : ezApi.ezclocker.ezUi.ezIsCheckboxChecked(
                    EzRecycledEmployeeAdminActions.ezInstance.ezIds.inputs.ezRestoreRecycledEmployeeIfOriginalIdNullCheckboxId)
        };

        if (!EzNumber.isNumber(payload.recycledEmployeeId)) {
            ezApi.ezclocker.ezUi.ezContent(
                EzRecycledEmployeeAdminActions.ezInstance.ezIds.containers.ezRestoreRecycledEmployeeResultsContainerId,
                'Error: Please enter a valid recycled employee id.');

            return ezApi.ezclocker.ezDialog.ezShowError(
                'Restore Recycled Employee Error',
                'Error: Please enter a valid recycled employee id.');
        }

        ezApi.ezclocker.ezUi.ezContent(
            'EzRestoreRecycledEmployeeResults',
            `Restoring recycled employee id ${recycledEmployeeId} ...`);

        return ezApi.ezclocker.ezHttpHelper.ezAxiosPost(
            // url
            '/_api/v1/admin/recycle-center/restore/employee',
            // params
            null,
            // headers
            null,
            // payload
            payload,
            // downloadStatusCallback
            (downloadStatus) => {
                ezApi.ezclocker.ezUi.ezContent(
                    outputContainerId,
                    `Restoring recycled employee status ... ${downloadStatus.progress}%`);
            },
            null)
            .then(
                (response) => {
                    ezApi.ezclocker.ezUi.ezContent(
                        outputContainerId,
                        200 == response.status
                            ? EzHtml.build`
                                <h2
                                    class="ezText-success-ezClockerGreen">
                                    Successfully Restore Recycled Employee
                                </h2>
                                <div>
                                    <h3
                                        class="ezText-success-ezClockerGreen">
                                        Restore Log
                                    </h3>
                                    <div
                                        id="EzRestoreRecycledEmployeeResponseLog">
                                        ${response.data}
                                    </div>
                                </div>
                                <div>
                                    <h3
                                        class="ezText-success-ezClockerGreen"
                                        id="EzRestoreRecycledEmployeeResponse">
                                        Success Response
                                    </h3>
                                    ${EzJson.toJson(response)}
                                </div>`
                            : EzHtml.build`
                                <h2
                                    class="ezText-error-ezDarkAlertRed">
                                    Failed to Restore Restore Recycled Employee
                                </h2>
                                <div>
                                    <h3
                                        class="ezText-error-ezDarkAlertRed">
                                        Error Log
                                    </h3>
                                    <div
                                        id="EzRestoreRecycledEmployeeResponseLog">
                                        ${response.data}
                                    </div>
                                </div>
                                <div>
                                    <h3
                                        class="ezText-error-ezDarkAlertRed">
                                        Error Response
                                    </h3>
                                    <textarea
                                        id="EzRestoreRecycledEmployeeResponse"
                                        style="width:100%;height:100px;">
                                        ${EzJson.toJson(response)}
                                    </textarea>
                                </div>`);
                },
                (eResponse) => {
                    ezApi.ezclocker.ezUi.ezContent(
                        outputContainerId,
                        EzHtml.build`
                            <h2>
                                Failed to Restore Restore Recycled Employee
                            </h2>
                            <div>
                                <h3
                                    class="ezText-error-ezDarkAlertRed">
                                    Error Log
                                </h3>
                                <div
                                    id="EzRestoreRecycledEmployeeResponseLog">
                                    ${EzString.stringOrDefault(eResponse.response.data, '{}')}
                                </div>
                            </div>
                            <div>
                                <h3 class="ezText-error-ezDarkAlertRed">
                                    Error Response
                                </h3>
                                <textarea
                                    id="EzRestoreRecycledEmployeeResponse"
                                    style="width:100%;height:100px;">
                                    ${EzJson.toJson(eResponse)}
                                </textarea>
                            </div>`);
                });
    }
}
