import { EzClass } from '/ezlibrary/EzClass.js';

import {
    EzObject,
    EzBoolean,
    EzNumber,
    EzString,
    EzArray,
    EzPromise,
    EzHtml
} from '/ezlibrary/helpers/EzHelpers.js';

import {
    EzRegistrationState
} from '/ezlibrary/enums/EzEnumerations.js';

import { EzHttpHelper } from '/public/javascript/common/ezclocker-http-helper.js'
import { EzNavigation } from '/public/javascript/common/ezclocker-navigation-helper.js';

import { EzEventEngine } from '/ezlibrary/ez-event-engine.js';

import { EzUI } from '/public/javascript/common/ezui.js';

import { EzDialogConfig } from '/ezlibrary/ux/dialogs/EzDialogConfig.js';

import { EzDialog } from '/public/javascript/common/ezclocker-dialog-helper.js';

import { EzClockInClockOutHelper } from '/secure/javascript/common/ez-clockin-clockout-helper.js';

/**
    @class
    @extends {EzClass}
    Dialog that displays the currently active clocked in employees.
    -----------------------------------------------------------------
    Import with:
        import { EzWhoIsClockedInDialog } from '/secure/widgets/EzWhoIsClockedInDialog/EzWhoIsClockedInDialog.js';
    -----------------------------------------------------------------
    Ready status check:
        globalThis.ezApi.ezclocker[EzWhoIsClockedInDialog.ezApiName] &&
        globalThis.ezApi.ezclocker[EzWhoIsClockedInDialog.ezApiName].ready
    -----------------------------------------------------------------
    Ready event hook:
        document.addEventListener(
            EzWhoIsClockedInDialog.ezEventNames.onReady,
            this.#ezRegistrator);
    -----------------------------------------------------------------
 */
export class EzWhoIsClockedInDialog extends EzClass {
    /**
        @static
        @public @readonly @property
        Returns the name of this class's singleton instance when registered with ezApi.
        @returns {string}
     */
    static get ezApiName() {
        return 'ezWhoIsClockedInDialog';
    }

    /**
        @static
        @public @readonly @property
        Returns an object of event names that this class may trigger.
        @returns {object}
     */
    static get ezEventNames() {
        return {
            onReady: 'ezOn_EzWhoIsClockedInDialog_Ready',
            onClosed: 'ezOn_EzWhoIsClockedInDialog_Closed',
        };
    }

    /**
        @static
        @private @field
        Stores the singleton instance of this class that was created by and registerd with EzApi.
        @type {EzWhoIsClockedInDialog}
     */
    static #ezInstance = EzObject.hasProperty(globalThis, 'ezApi') &&
        EzObject.isValid(globalThis.ezApi) && EzBoolean.isTrue(globalThis.ezApi.ready) &&
        EzObject.isValid(globalThis.ezApi.ezclocker[EzWhoIsClockedInDialog.ezApiName])
        ? globalThis.ezApi.ezclocker[EzWhoIsClockedInDialog.ezApiName]
        : null;

    /**
        @static
        @public @property @getter
        Returns the singleton instance of this class that is registered with EzApi (if available yet)
        @returns {EzWhoIsClockedInDialog}
     */
    static get ezInstance() {
        return EzWhoIsClockedInDialog.#ezInstance;
    }

    /**
        @static
        @public @property @setter
        Sets the singleton instance of of this class that is registered with EzApi.
        @param {EzWhoIsClockedInDialog} instance
     */
    static set ezInstance(instance) {
        if (null != EzWhoIsClockedInDialog.#ezInstance) {
            throw new Error('EzWhoIsClockedInDialog\'s singleton instance is already reigstered with EzApi.');
        }

        EzWhoIsClockedInDialog.#ezInstance = instance;
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
        EzObject.isValid(globalThis.ezApi.ezclocker[EzWhoIsClockedInDialog.ezApiName])
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
        return EzWhoIsClockedInDialog.#ezApiRegistrationState;
    }

    /**
        @static
        @public @property @setter
        Sets the ezApi registration state of this classes's singleton instance.
        @param {string} ezApiRegistrationState
        A valid enum property value from EzRegistrationState
     */
    static set ezApiRegistrationState(ezApiRegistrationState) {
        EzWhoIsClockedInDialog.#ezApiRegistrationState = EzRegistrationState.ezValueOf(ezApiRegistrationState);
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
        return EzRegistrationState.PENDING === EzWhoIsClockedInDialog.ezApiRegistrationState &&
            EzObject.hasProperty(globalThis, 'ezApi') &&
            EzObject.isValid(globalThis.ezApi) && EzBoolean.isTrue(globalThis.ezApi.ready) &&

            globalThis.ezApi.ezclocker[EzEventEngine.ezApiName] &&
            globalThis.ezApi.ezclocker[EzEventEngine.ezApiName].ready &&

            globalThis.ezApi.ezclocker[EzNavigation.ezApiName] &&
            globalThis.ezApi.ezclocker[EzNavigation.ezApiName].ready &&

            globalThis.ezApi.ezclocker[EzHttpHelper.ezApiName] &&
            globalThis.ezApi.ezclocker[EzHttpHelper.ezApiName].ready &&

            globalThis.ezApi.ezclocker[EzUI.ezApiName] &&
            globalThis.ezApi.ezclocker[EzUI.ezApiName].ready &&

            globalThis.ezApi.ezclocker[EzDialog.ezApiName] &&
            globalThis.ezApi.ezclocker[EzDialog.ezApiName].ready &&

            globalThis.ezApi.ezclocker[EzClockInClockOutHelper.ezApiName] &&
            globalThis.ezApi.ezclocker[EzClockInClockOutHelper.ezApiName].ready;
    }

    /**
        @static
        @private @readonly @property
        Returns if this class's singleton instance is registered with ezApi yet.
        @returns {boolean}
     */
    static get #ezIsRegistered() {
        return null != EzWhoIsClockedInDialog.ezInstance &&
            EzRegistrationState.REGISTERED === EzWhoIsClockedInDialog.ezApiRegistrationState;
    }

    /**
        @static
        @private @method
        Attempts to register the singleton instance for this class with ezApi. Returns true
        if successful, false otherwise.
        @returns {boolean}
     */
    static #ezRegistrator() {
        if (EzWhoIsClockedInDialog.#ezCanRegister && !EzWhoIsClockedInDialog.#ezIsRegistered) {
            globalThis.ezApi.ezRegisterNewApi(EzWhoIsClockedInDialog, EzWhoIsClockedInDialog.ezApiName);
        }

        return EzWhoIsClockedInDialog.#ezIsRegistered;
    }

    /**
        @static
        Static Initialization
        ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        >> IMPORTANT <<
        ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        Make sure the following properties and methods get defined BEFORE this static initialization section:
            1) Property getter EzWhoIsClockedInDialog.ezApiName
            2) Property getter EzWhoIsClockedInDialog.ezEventNames
            3) Property getter EzWhoIsClockedInDialog.ezInstance
            4) Property setter EzWhoIsClockedInDialog.ezInstance
            5) Property getter EzWhoIsClockedInDialog.ezApiRegistrationState
            6) Property setter EzWhoIsClockedInDialog.ezApiRegistrationState
            7) Property getter EzWhoIsClockedInDialog.#ezCanRegister
            8) Property getter EzWhoIsClockedInDialog.#ezIsRegistered
            9) Method EzWhoIsClockedInDialog.#ezRegistrator()
     */
    static {
        if (!EzWhoIsClockedInDialog.#ezIsRegistered) {
            EzWhoIsClockedInDialog.ezApiRegistrationState = EzRegistrationState.PENDING;

            if (!EzWhoIsClockedInDialog.#ezRegistrator()) {
                document.addEventListener(
                    EzWhoIsClockedInDialog.ezOnEzApiReadyEventName,
                    () => {
                        if (!EzWhoIsClockedInDialog.#ezRegistrator()) {

                            document.addEventListener(
                                EzEventEngine.ezEventNames.onReady,
                                EzWhoIsClockedInDialog.#ezRegistrator);

                            document.addEventListener(
                                EzHttpHelper.ezEventNames.onReady,
                                EzWhoIsClockedInDialog.#ezRegistrator);

                            document.addEventListener(
                                EzNavigation.ezEventNames.onReady,
                                EzWhoIsClockedInDialog.#ezRegistrator);

                            document.addEventListener(
                                EzUI.ezEventNames.onReady,
                                EzWhoIsClockedInDialog.#ezRegistrator);

                            document.addEventListener(
                                EzDialog.ezEventNames.onReady,
                                EzWhoIsClockedInDialog.#ezRegistrator);

                            document.addEventListener(
                                EzClockInClockOutHelper.ezEventNames.onContextReady,
                                EzWhoIsClockedInDialog.#ezRegistrator)
                        }
                    });
            }
        }
    }

    /**
        @public @constructor
        >> DO NOT CREATE NEW INSTANCES OUTSIDE OF THE STATIC INITIALIZATION FLOW <<
        Use the static singleton instance available from ezApi: ezApi.ezclocker.ezWhoIsClockedInDialog.
     */
    constructor() {
        super();
    }

    ezRefresher = null;

    ezClockedInEmployeeIds = [];

    ezActiveTimeEntries = [];

    ezVisible = false;

    /**
        @public @readonly @property
        Returns the dialog's html element id
        @returns {string}
     */
    get ezDialogId() {
        return 'EzWhoIsClockedInDialog';
    }

    /**
        @public @readonly @property
        Returns the dialog's container html element id
        @returns {string}
     */
    get ezContentContainerId() {
        return `${this.ezDialogId}_ContentContainer`;
    }

    /**
        @public @readonly @property
        Returns an object that contains the important html element ids for the dialog.
        @returns {object}
     */
    get ezIds() {
        return {
            containers: {
                elaspedDecimalHoursContainerId: `${EzWhoIsClockedInDialog.ezInstance.ezDialogId}_Elapsed_DecimalHours_Container`,
                elapsedHoursMinutesContainerId: `${EzWhoIsClockedInDialog.ezInstance.ezDialogId}_Elapsed_HoursMinutes_Container`,
            }
        };
    }

    /**
        @protected @method
        Initilizes the EzWhoIsClockedInDialog
        @returns {EzWhoIsClockedInDialog}
     */
    ezInit() {
        ezApi.ezclocker.ezEventEngine.ezRegisterEvent(
            EzWhoIsClockedInDialog.ezApiName,
            EzWhoIsClockedInDialog.ezEventNames.onClosed);

        ezApi.ezclocker.ezUi.ezAppendContent(
            '_HideDialogsDiv',
            EzWhoIsClockedInDialog.ezInstance.ezBuildDialogHtml());

        let dialogConfig = new EzDialogConfig(EzWhoIsClockedInDialog.ezInstance.ezDialogId);

        dialogConfig.buttons = [
            {
                text: 'Close',
                id: `${EzWhoIsClockedInDialog.ezInstance.ezDialogId}_CloseButton`,
                click: EzWhoIsClockedInDialog.ezInstance.ezClose
            }
        ];

        dialogConfig.close = EzWhoIsClockedInDialog.ezInstance.ezClose;

        dialogConfig.position = {
            my: 'right top',
            at: 'right bottom+10',
            of: '#EzWhoIsClockedInButton',
            collision: 'fit'
        };

        dialogConfig.width = 'auto';

        dialogConfig.modal = false;

        ezApi.ezclocker.ezDialog.ezInitDialogWithConfig(EzWhoIsClockedInDialog.ezInstance.ezDialogId, dialogConfig);

        ezApi.ezclocker.ezEventEngine.ezWantEvent(
            EzClockInClockOutHelper.ezEventNames.onEmployeeClockedIn,
            EzWhoIsClockedInDialog.ezApiName,
            EzWhoIsClockedInDialog.ezInstance.ezUpdateWhoIsClockedIn);

        ezApi.ezclocker.ezEventEngine.ezWantEvent(
            EzClockInClockOutHelper.ezEventNames.onEmployeeClockedOut,
            EzWhoIsClockedInDialog.ezApiName,
            EzWhoIsClockedInDialog.ezInstance.ezUpdateWhoIsClockedIn);

        return EzWhoIsClockedInDialog.ezInstance;
    }

    /**
        @public  @method
        Shows the EzWhoIsClockedInDialog right top relative to right bottom of the provided launchButtonId. If the
        element associated with launchButtonId does not exist, the dialog is presented centered.
        @param {String|null} launchButtonId
     */
    ezShow() {
        EzWhoIsClockedInDialog.ezInstance.ezShowRefreshStatus();

        EzWhoIsClockedInDialog.ezInstance.ezLoadWhoIsClockedIn()
            .then(
                () => {
                    if (!EzArray.arrayHasLength(EzWhoIsClockedInDialog.ezInstance.ezActiveTimeEntries)) {
                        ezApi.ezclocker.ezUi.ezSetContent(
                            EzWhoIsClockedInDialog.ezInstance.ezContentContainerId,
                            EzWhoIsClockedInDialog.ezInstance.ezBuildNoClockedInEmployeesHtml());
                    } else {
                        ezApi.ezclocker.ezUi.ezSetContent(
                            EzWhoIsClockedInDialog.ezInstance.ezContentContainerId,
                            EzWhoIsClockedInDialog.ezInstance.ezBuildWhoIsClockedInTableHtml());

                        EzWhoIsClockedInDialog.ezInstance.ezBuildClockedInEmployeeRowsHtml();
                    }

                    ezApi.ezclocker.ezDialog.ezShowDialog(EzWhoIsClockedInDialog.ezInstance.ezDialogId);
                    EzWhoIsClockedInDialog.ezInstance.ezVisible = true;

                    EzWhoIsClockedInDialog.ezInstance.ezStartRefresher();


                    EzWhoIsClockedInDialog.ezInstance.ezHideRefreshStatus();
                });
    }

    /**
        @public @method
        Closes the EzWhoIsClockedInDialog
     */
    ezClose() {
        EzWhoIsClockedInDialog.ezInstance.ezVisible = false;

        EzWhoIsClockedInDialog.ezInstance.ezStopRefresher();

        ezApi.ezclocker.ezDialog.ezCloseDialog(EzWhoIsClockedInDialog.ezInstance.ezDialogId);

        ezApi.ezclocker.ezUi.ezContent(EzWhoIsClockedInDialog.ezInstance.ezContentContainerId, '');

        ezApi.ezclocker.ezEventEngine.ezTriggerEvent(
            EzWhoIsClockedInDialog.ezEventNames.onClosed,
            EzWhoIsClockedInDialog.ezInstance);
    }

    /**
        @protected @method
        Updates the UX with the latest data.
     */
    ezLoadWhoIsClockedIn() {
        let url = `/_api/v2/employer/active-clock-ins?target-time-zone-id=${ezApi.ezclocker.ezDateTime.activeTimeZone}`;

        return EzPromise.asyncAction(
            (finished) => ezApi.ezclocker.ezHttpHelper.ezGet(url)
                .then(
                    ezApi.ezclocker.ezServices.ezProcessApiResolve,
                    ezApi.ezclocker.ezServices.ezProcessApiReject)
                .then(
                    (response) => {
                        EzWhoIsClockedInDialog.ezInstance.ezActiveTimeEntries = EzArray.arrayOrEmpty(response.entities);

                        return finished();
                    }),
            (eResponse) => {
                ezApi.ezclocker.ezLogger.error(
                    `Failed to obtain the activly clocked in employees. Error response: ${EzJson.toJson(eResponse)}`);

                return finished();
            });
    }

    /**
        @protected @method
        Updates the table with the latest active time entry data
        @returns {Promise.resolve}
     */
    ezUpdateWhoIsClockedIn() {
        EzWhoIsClockedInDialog.ezInstance.ezStopRefresher();

        if (EzBoolean.isFalse(EzWhoIsClockedInDialog.ezInstance.ezVisible)) {
            // Do not update if the dialog is not visible
            return EzPromise.resolve();
        }

        EzWhoIsClockedInDialog.ezInstance.ezShowRefreshStatus();

        return ezApi.ezclocker.ezUi.ezPageWaitAsync(
            'Updating who is clocked in ...',
            (waitDone, finished) => EzWhoIsClockedInDialog.ezInstance.ezLoadWhoIsClockedIn()
                .then(
                    () => {
                        if (!EzArray.arrayHasLength(EzWhoIsClockedInDialog.ezInstance.ezActiveTimeEntries)) {
                            ezApi.ezclocker.ezUi.ezSetContent(
                                EzWhoIsClockedInDialog.ezInstance.ezContentContainerId,
                                EzWhoIsClockedInDialog.ezInstance.ezBuildNoClockedInEmployeesHtml());
                        } else {
                            ezApi.ezclocker.ezUi.ezSetContent(
                                EzWhoIsClockedInDialog.ezInstance.ezContentContainerId,
                                EzWhoIsClockedInDialog.ezInstance.ezBuildWhoIsClockedInTableHtml());

                            EzWhoIsClockedInDialog.ezInstance.ezBuildClockedInEmployeeRowsHtml();
                        }

                        EzWhoIsClockedInDialog.ezInstance.ezStartRefresher();

                        EzWhoIsClockedInDialog.ezInstance.ezHideRefreshStatus();

                        return waitDone().then(finished);
                    }));
    }

    /**
        @protected  @method
        Builds the dialog UX HTML
        @returns {String}
     */
    ezBuildDialogHtml() {
        return ezApi.ezTemplate`
            <div
                id="${EzWhoIsClockedInDialog.ezInstance.ezDialogId}"
                title="Who is Clocked In?">
                <style
                    id="${EzWhoIsClockedInDialog.ezInstance.ezDialogId}_Styles">
                    .whoisClockedInDialog-content-container {
                        padding: 8px;
                        overflow: auto;
                        background-color: var(--ezClockerWhite);
                        color: var(--ezClockerBlack);
                        vertical-align: top;
                        text-align: left;
                    }
                    .ezWhoIsClockedInDialog-grid-title-cell {
                        padding: 8px;
                        background-color: var(--ezClockerNavy);
                        color: var(--ezClockerWhite);
                        font-weight: bold;
                        font-size: 12pt;
                        border-style: solid;
                        border-width: 1px;
                        border-color: var(--ezClockerGray);
                        border-radius: 0px;
                        border-top-radius: 3px;
                    }
                    .ezWhoIsClockedInDialog-grid-data-cell {
                        padding: 4px;
                        text-align: left;
                        vertical-align: middle;
                        background-color: var(--ezClockerWhite);
                        color: var(--ezClockerBlack);
                        border-style: solid;
                        border-width: 1px;
                        border-color: var(--ezClockerGray);
                        font-size: 12pt;
                    }
                    .ezWhoIsClockedInDialog-employee-name-container {
                        padding: 4px;
                        font-weight: bold;
                    }
                    .ezWhoisClockedInDialog-clock-in-date-time-container {
                        padding: 4px;
                    }
                    .ezWhoisClockedInDialog-jobname-container {
                        padding: 4px;
                        color: var(--ezClockerNavy);
                        font-size: 10pt;
                        font-weight: bold;
                    }
                    .ezWhoIsClockedInDialog-elapsed-time-container {
                        padding: 4px;
                        font-size: 12pt;
                        text-align: center;
                        cursor: pointer;
                    }
                    .ezWhoIsClockedInDialog-content-container {
                        background-color: var(--ezClockerWhite);
                        padding: 4px;
                    }
                    .ezWhoIsClockedInDialog-refresh-note {
                        color: var(--ezClockerNavy);
                        font-size: 10pt;
                        padding-top: 10px;
                    }
                    .ezWhoIsClockedInDialog-refresh-status-container {
                        display: grid;
                        position: absolute;
                        top: 0;
                        left: 0;
                        grid-template-columns: auto;
                        grid-template-rows: auto;
                        align-content: center;
                        justify-content: center;
                        background-color: transparent;
                        padding: 4px;
                        width: 95%;
                        margin-top: 45%;
                    }
                    .ezWhoIsClockedInDialog-refresh-status {
                        display: grid;
                        padding: 8px;
                        grid-template-columns: auto auto;
                        grid-template-rows: auto;
                        align-content: center;
                        justify-content: center;
                        background-color: var(--ezClockerWhite);
                        opacity: 0.9;
                        border-color: var(--ezClockerNavy);
                        border-style: solid;
                        border-size: 1px;
                        border-radius: 3px;
                    }
                    .ezWhoIsClockedInDialog-refresh-status-spinner-container {
                        text-align: center;
                    }
                    .ezWhoIsClockedInDialog-refresh-status-spinner {
                        padding: 0px;
                        margin: 0px;
                        height: 32px;
                    }
                    .ezWhoIsClockedInDialog-refresh-status-text {
                        display: grid;
                        align-content: center;
                        justify-content: start;
                        color: var(--ezClockerBlue);
                        font-size: 10pt;
                        font-weight: bold;
                        text-align: center;
                    }
                </style>
                <div
                    id="${EzWhoIsClockedInDialog.ezInstance.ezContentContainerId}_RefreshStatus_Container"
                    class="ezWhoIsClockedInDialog-refresh-status-container"
                    style="display:none">
                    <div
                        id="${EzWhoIsClockedInDialog.ezInstance.ezContentContainerId}_RefreshStatus"
                        class="ezWhoIsClockedInDialog-refresh-status">
                        <div
                            id="${EzWhoIsClockedInDialog.ezInstance.ezContentContainerId}_RefreshStatus_Spinner_Container"
                            class="ezWhoIsClockedInDialog-refresh-status-spinner-container">
                            <img
                                id="${EzWhoIsClockedInDialog.ezInstance.ezContentContainerId}_RefreshStatus_Spinner_Img"
                                class="ezWhoIsClockedInDialog-refresh-status-spinner"
                                src="/public/images/spinners/line-spinner-orange.svg"
                                alt="Please Wait "/>
                        </div>
                        <div
                            id="${EzWhoIsClockedInDialog.ezInstance.ezContentContainerId}_RefreshStatus_Text"
                            class="ezWhoIsClockedInDialog-refresh-status-text">
                            <span>Updating who is clocked in ...</span>
                        </div>
                    </div>
                </div>
                <div
                    id="${EzWhoIsClockedInDialog.ezInstance.ezContentContainerId}"
                    class="ezWhoIsClockedInDialog-content-container">
                </div>
            </div>`;
    }

    /**
        @protected @method
        Builds the no-employees clocked in html
        @returns {string}
     */
    ezBuildNoClockedInEmployeesHtml() {
        return EzHtml.build`
            <h1>
                All employees have clocked out.
            </h1>
            <div
                id="${EzWhoIsClockedInDialog.ezInstance.ezDialogId}_refreshNote"
                class="ezWhoIsClockedInDialog-refresh-note">
                Updated every five minutes when open.
            </div>`;
    }

    /**
        @protected @method
        Builds the dialog's content container html
        @returns {string}
     */
    ezBuildWhoIsClockedInTableHtml() {
        return EzHtml.build`
            <div
                id="${EzWhoIsClockedInDialog.ezInstance.ezDialogId}_DataTableContainer"
                class="whoisClockedInDialog-content-container">
                <table
                    id="${EzWhoIsClockedInDialog.ezInstance.ezDialogId}_DataTable"
                    class="employees">
                    <tr
                        id="${EzWhoIsClockedInDialog.ezInstance.ezDialogId}_DataTable_Title_Row">
                        <td
                            id="${EzWhoIsClockedInDialog.ezInstance.ezDialogId}_DataTable_Name_Title_Cell"
                            class="ezWhoIsClockedInDialog-grid-title-cell">
                            Name
                        </td>
                        <td
                            id="${EzWhoIsClockedInDialog.ezInstance.ezDialogId}_DataTable_ClockInDateTime_Title_Cell"
                            class="ezWhoIsClockedInDialog-grid-title-cell">
                            Clocked In
                        </td>
                        <td
                            id="${EzWhoIsClockedInDialog.ezInstance.ezDialogId}_DataTable_TotalHours_Title_Cell"
                            class="ezWhoIsClockedInDialog-grid-title-cell">
                            Total Hours
                        </td>
                        <td
                            id="${EzWhoIsClockedInDialog.ezInstance.ezDialogId}_DataTable_ViewButton_Title_Cell"
                            class="ezWhoIsClockedInDialog-grid-title-cell">
                        </td>
                    </tr>
                </table>
                <div
                    id="${EzWhoIsClockedInDialog.ezInstance.ezDialogId}_refreshNote"
                    class="ezWhoIsClockedInDialog-refresh-note">
                    Updated every five minutes when open.
                </div>
            </div>`;
    }

    /**
        @protected @method
        Updates the UX with the latest clocked in employee data
     */
    ezBuildClockedInEmployeeRowsHtml() {
        return EzPromise.asyncAction(
            (finished) => {
                // Clear the grid
                EzWhoIsClockedInDialog.ezInstance.ezClockedInEmployeeIds.forEach(
                    (employeeId) => {
                        let employeeRowId = `${EzWhoIsClockedInDialog.ezInstance.ezDialogId}_DataTable_Data_Row_EmployeeId${employeeId}`;

                        if (ezApi.ezclocker.ezUi.ezElementExists(employeeRowId)) {
                            ezApi.ezclocker.ezAnimator.ezFadeOut(employeeRowId)
                                .then(
                                    ezApi.ezclocker.ezUi.ezRemoveElement(employeeRowId));
                        }
                    });

                EzWhoIsClockedInDialog.ezInstance.ezClockedInEmployeeIds = [];

                if (!EzArray.arrayHasLength(EzWhoIsClockedInDialog.ezInstance.ezActiveTimeEntries)) {
                    return finished();
                }

                for (let index = 0; index < EzWhoIsClockedInDialog.ezInstance.ezActiveTimeEntries.length; index++) {
                    let activeTimeEntry = EzWhoIsClockedInDialog.ezInstance.ezActiveTimeEntries[index];

                    if (EzString.stringHasLength(activeTimeEntry.clockInIso) && EzString.stringHasLength(activeTimeEntry.employeeName)) {
                        EzWhoIsClockedInDialog.ezInstance.ezClockedInEmployeeIds.push(activeTimeEntry.employeeId);

                        let employeeRowId = `${EzWhoIsClockedInDialog.ezInstance.ezDialogId}_DataTable_Data_Row_EmployeeId${activeTimeEntry.employeeId}`;

                        // New Clocked In Employee
                        ezApi.ezclocker.ezUi.ezAppendContent(
                            `${EzWhoIsClockedInDialog.ezInstance.ezDialogId}_DataTable`,
                            EzWhoIsClockedInDialog.ezInstance.ezBuildClockedInEmployeeTableRowHtml(
                                activeTimeEntry,
                                index,
                                true));

                        ezApi.ezclocker.ezAnimator.ezFadeIn(employeeRowId)
                            .then(ezApi.ezIgnoreResolve);
                    }
                }

                return finished();
            });
    }

    /**
        @protected @method
        Builds a clocked in employee's table row HTML
        @param {object} employee
     */
    ezBuildClockedInEmployeeTableRowHtml(activeTimeEntry, activeTimeEntryIndex, hideRow) {
        if (!EzObject.isValid(activeTimeEntry)) {
            return '';
        }

        let rowStyles = hideRow
            ? 'styles="display:none"'
            : '';

        return EzHtml.build`
           <tr
                id="${EzWhoIsClockedInDialog.ezInstance.ezDialogId}_DataTable_Data_Row_EmployeeId${activeTimeEntry.employeeId}"
                data-active-time-entry-index="${activeTimeEntryIndex}"
                ${rowStyles}>
                ${EzWhoIsClockedInDialog.ezInstance.ezBuildEmployeeDataCellsHtml(activeTimeEntry)}
            </tr>`;
    }

    /**
        @protected @method
        Builds a clocked in employee's table row cells html
        @param {object} employee
     */
    ezBuildEmployeeDataCellsHtml(activeTimeEntry) {
        if (!EzObject.isValid(activeTimeEntry)) {
            return '';
        }

        let hasClockInData = EzString.stringHasLength(activeTimeEntry.clockInIso);

        let clockInDateTime = EzBoolean.isTrue(hasClockInData)
            ? ezApi.ezclocker.ezDateTime.ezCreateFromIso(activeTimeEntry.clockInIso)
            : null;

        let ezDateTimeNow = ezApi.ezclocker.ezDateTime.ezNow();

        let clockInDateTimeString = EzBoolean.isTrue(hasClockInData)
            ? `${clockInDateTime.format('dddd MM/DD/YYYY')} at ${clockInDateTime.format('hh:mm a')}`
            : 'n/a';

        let elapsedDecimalHours = EzBoolean.isTrue(hasClockInData)
            ? ezApi.ezclocker.ezDateTime.ezDurationBetweenAsDecimalHours(
                ezDateTimeNow,
                clockInDateTime)
            : 'n/a';

        let elapsedHoursMinutes = EzBoolean.isTrue(hasClockInData)
            ? ezApi.ezclocker.ezDateTime.ezDurationBetweenAsHoursMinutes(
                ezDateTimeNow,
                clockInDateTime)
            : 'n/a';

        let jobNameContainer = EzString.stringHasLength(activeTimeEntry.job)
            ? EzHtml.build`
                <div
                    id="${EzWhoIsClockedInDialog.ezInstance.ezDialogId}_JobName_Container_EmployeeId${activeTimeEntry.employeeId}"
                    class="ezWhoisClockedInDialog-jobname-container">
                    Job: ${activeTimeEntry.job}
                </div>`
            : '';

        return EzHtml.build`
            <td
                id="${EzWhoIsClockedInDialog.ezInstance.ezDialogId}_DataTable_Data_Cell_EmployeeName_EmployeeId${activeTimeEntry.employeeId}"
                class="ezWhoIsClockedInDialog-grid-data-cell">
                <div
                    id="${EzWhoIsClockedInDialog.ezInstance.ezDialogId}_EmployeeName_Container_EmployeeId${activeTimeEntry.employeeId}"
                    class="ezWhoIsClockedInDialog-employee-name-container">
                    ${activeTimeEntry.employeeName}
                </div>
            </td>
            <td
                id="${EzWhoIsClockedInDialog.ezInstance.ezDialogId}_DataTable_Data_Cell_ClockInDateTime_EmployeeId${activeTimeEntry.employeeId}"
                class="ezWhoIsClockedInDialog-grid-data-cell">
                <div
                    id="${EzWhoIsClockedInDialog.ezInstance.ezDialogId}_ClockInDateTime_Container_EmployeeId${activeTimeEntry.employeeId}"
                    class="ezWhoisClockedInDialog-clock-in-date-time-container">
                    ${clockInDateTimeString}
                </div>
                ${jobNameContainer}
            </td>
            <td
                id="${EzWhoIsClockedInDialog.ezInstance.ezDialogId}_DataTable_Data_Cell_DecimalHours_EmployeeId${activeTimeEntry.employeeId}"
                class="ezWhoIsClockedInDialog-grid-data-cell">
                <div
                    id="${EzWhoIsClockedInDialog.ezInstance.ezIds.elaspedDecimalHoursContainerId}_${activeTimeEntry.employeeId}"
                    class="ezWhoIsClockedInDialog-elapsed-time-container"
                    style="display:none"
                    onclick="ezApi.ezclocker.ezWhoIsClockedInDialog.ezHandleElapseTimeContainerClick(${EzWhoIsClockedInDialog.ezInstance.ezIds.elaspedDecimalHoursContainerId}_${activeTimeEntry.employeeId}, ${activeTimeEntry.employeeId})"
                    title="Total Decimal Hours (click to switch to hours:minutes format)">
                    <div
                        id="${EzWhoIsClockedInDialog.ezInstance.ezDialogId}_Elapsed_DecimalHours_EmployeeId${activeTimeEntry.employeeId}">
                        ${elapsedDecimalHours} hours
                    </div>
                </div>
                <div
                    id="${EzWhoIsClockedInDialog.ezInstance.ezIds.elapsedHoursMinutesContainerId}_${activeTimeEntry.employeeId}"
                    class="ezWhoIsClockedInDialog-elapsed-time-container"
                    onclick="ezApi.ezclocker.ezWhoIsClockedInDialog.ezHandleElapseTimeContainerClick(${EzWhoIsClockedInDialog.ezInstance.ezIds.elapsedHoursMinutesContainerId}_${activeTimeEntry.employeeId}, ${activeTimeEntry.employeeId})"
                    title="Total hours:minutes (click to switch to decimal hours)">
                    <div
                        id="${EzWhoIsClockedInDialog.ezInstance.ezDialogId}_Elapsed_HoursMinutes_EmployeeId${activeTimeEntry.employeeId}">
                        ${elapsedHoursMinutes}
                    </div>
                </div>
            </td>
            <td
                id="${EzWhoIsClockedInDialog.ezInstance.ezDialogId}_DataTable_Data_Cell_ViewButton_EmployeeId${activeTimeEntry.employeeId}"
                class="ezWhoIsClockedInDialog-grid-data-cell">
                <button
                    id="${EzWhoIsClockedInDialog.ezInstance.ezDialogId}_ViewButton_EmployeeId${activeTimeEntry.employeeId}"
                    class="ezEditButton"
                    onclick="ezApi.ezclocker.ezWhoIsClockedInDialog.ezViewClockedInEmployee(${activeTimeEntry.employeeId}, ${clockInDateTime})">
                    View
                </button>
            </td>`;
    }

    /**
        @protected @method
        Handles click events on the elapse time container to toggle between hours:minuts and decimal hours display.
        @param {number} employeeId
     */
    ezHandleElapseTimeContainerClick(containerId, employeeId) {
        let decimalContainerId = `${EzWhoIsClockedInDialog.ezInstance.ezIds.containers.elaspedDecimalHoursContainerId}_${employeeId}`;

        let hoursMinsContainerId = `${EzWhoIsClockedInDialog.ezInstance.ezIds.containers.elapsedHoursMinutesContainerId}_${employeeId}`;

        if (decimalContainerId === containerId) {
            ezApi.ezclocker.ezUi.ezHideElement(decimalContainerId);

            ezApi.ezclocker.ezUi.ezShowElement(hoursMinsContainerId);
        } else {
            ezApi.ezclocker.ezUi.ezHideElement(hoursMinsContainerId);

            ezApi.ezclocker.ezUi.ezShowElement(decimalContainerId);
        }
    }

    /**
        @protected @method
        Switches the selected employee to the provided employeeId
        @param {Number} employeeId
     */
    ezViewClockedInEmployee(employeeId) {
        if (!EzNumber.isNumber(employeeId)) {
            throw new EzBadParamException(
                'employeeId',
                EzWhoIsClockedInDialog.ezInstance,
                EzWhoIsClockedInDialog.ezInstance.ezViewClockedInEmployee);
        }

        ezApi.ezclocker.ezClockerContext.ezSetActiveEmployeeFromSelectedEmployerAccountActiveEmployeeAccountsIdId(employeeId);
    }

    /**
        @protected @method
        Starts the refresher interval timer
     */
    ezStartRefresher() {
        if (ezApi.ezIsFalse(EzWhoIsClockedInDialog.ezInstance.ezVisible)) {
            return;
        }

        EzWhoIsClockedInDialog.ezInstance.ezRefresher = window.setInterval(
            EzWhoIsClockedInDialog.ezInstance.ezUpdateWhoIsClockedIn,
            // 60 seconds = 60000 milliseconds
            // 5 minutes = 300000 milliseconds
            300000);
    }

    /**        @protected @method
        Stops the refresher interval timer
     */
    ezStopRefresher() {
        window.clearInterval(EzWhoIsClockedInDialog.ezInstance.ezRefresher);

        EzWhoIsClockedInDialog.ezInstance.ezRefresher = null;
    }

    /**
        @protected @method
        Shows the refresh status
     */
    ezShowRefreshStatus() {
        ezApi.ezclocker.ezUi.ezShowElement(
            `${EzWhoIsClockedInDialog.ezInstance.ezContentContainerId}_RefreshStatus_Container`,
            'grid');
    }

    /**
        @protected @method
        Hides the refresh status
     */
    ezHideRefreshStatus() {
        ezApi.ezclocker.ezUi.ezHideElement(`${EzWhoIsClockedInDialog.ezInstance.ezContentContainerId}_RefreshStatus_Container`);
    }
}
