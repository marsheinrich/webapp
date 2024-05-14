import {
    EzObject,
    EzBoolean,
    EzNumber,
    EzString,
    EzArray
} from '/ezlibrary/helpers/EzHelpers.js';

import { EzBadParamException } from '/ezlibrary/exceptions/EzBadParamException.js';

import { EzRegistrationState } from '/ezlibrary/enums/EzRegistrationState.js';

import { EzClass } from '/ezlibrary/EzClass.js';

import { EzEventEngine } from '/ezlibrary/ez-event-engine.js';

import { EzClockerContextEventName } from '/ezlibrary/EzClockerContext/EzClockerContextEventName.js';
import { EzClockerContext } from '/ezlibrary/EzClockerContext/ez-context.js';

import { EzUI } from '/public/javascript/common/ezui.js';

import { EzClockerFeature } from '/ezlibrary/EzClockerFeature.js';
import { EzFeatureToggles } from '/ezlibrary/ez-feature-toggles2.js';

/**
    Displays time entry audit information
 */
export class EzTimeEntryAuditDialog extends EzClass {

    /**
        @static
        @public @readonly @property
        Returns the name of this class's singleton instance when registered with ezApi.
        @returns {string}
     */
    static get ezApiName() {
        return 'ezTimeEntryAuditDialog';
    }

    /**
        @static
        @public @readonly @property
        Returns an object of event names that this class may trigger.
        @returns {object}
     */
    static get ezEventNames() {
        return {
            onReady: 'ezOn_EzTimeEntryAuditDialog_Ready'
        };
    }

    /**
        @static
        @private @field
        Stores the singleton instance of this class that was created by and registerd with EzApi.
        @type {EzTimeEntryAuditDialog}
     */
    static #ezInstance = EzObject.hasProperty(globalThis, 'ezApi') &&
        EzObject.isValid(globalThis.ezApi) && EzBoolean.isTrue(globalThis.ezApi.ready) &&
        EzObject.isValid(globalThis.ezApi.ezclocker[EzTimeEntryAuditDialog.ezApiName])
        ? globalThis.ezApi.ezclocker[EzTimeEntryAuditDialog.ezApiName]
        : null;

    /**
        @static
        @public @property @getter
        Returns the singleton instance of this class that is registered with EzApi (if available yet)
        @returns {EzTimeEntryAuditDialog}
     */
    static get ezInstance() {
        return EzTimeEntryAuditDialog.#ezInstance;
    }

    /**
        @static
        @public @property @setter
        Sets the singleton instance of of this class that is registered with EzApi.
        @param {EzTimeEntryAuditDialog} ezTimeEntryAuditDialog
     */
    static set ezInstance(ezTimeEntryAuditDialog) {
        if (null != EzTimeEntryAuditDialog.#ezInstance) {
            throw new Error('ezTimeEntryAuditDialog\'s singleton instance is already reigstered with EzApi.');
        }

        EzTimeEntryAuditDialog.#ezInstance = ezTimeEntryAuditDialog;
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
        EzObject.isValid(globalThis.ezApi.ezclocker[EzTimeEntryAuditDialog.ezApiName])
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
        return EzTimeEntryAuditDialog.#ezApiRegistrationState;
    }

    /**
        @static
        @public @property @setter
        Sets the ezApi registration state of this classes's singleton instance.
        @param {string} ezApiRegistrationState
        A valid enum property value from EzRegistrationState
     */
    static set ezApiRegistrationState(ezApiRegistrationState) {
        EzTimeEntryAuditDialog.#ezApiRegistrationState = EzRegistrationState.ezValueOf(ezApiRegistrationState);
    }

    static get #ezCanRegister() {
        return EzRegistrationState.PENDING === EzTimeEntryAuditDialog.ezApiRegistrationState &&
            Object.prototype.hasOwnProperty.call(globalThis, 'ezApi') &&
            globalThis.ezApi && globalThis.ezApi.ready &&

            globalThis.ezApi.ezclocker[EzEventEngine.ezApiName] &&
            globalThis.ezApi.ezclocker[EzEventEngine.ezApiName].ready &&

            globalThis.ezApi.ezclocker[EzClockerContextEventName.ezApiName] &&
            globalThis.ezApi.ezclocker[EzClockerContextEventName.ezApiName].ready &&

            globalThis.ezApi.ezclocker[EzClockerContext.ezApiName] &&
            globalThis.ezApi.ezclocker[EzClockerContext.ezApiName].ready &&

            globalThis.ezApi.ezclocker[EzClockerFeature.ezApiName] &&
            globalThis.ezApi.ezclocker[EzClockerFeature.ezApiName].ready &&

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
        return null != EzTimeEntryAuditDialog.ezInstance &&
            EzRegistrationState.REGISTERED === EzTimeEntryAuditDialog.ezApiRegistrationState;
    }

    /**
        @static
        @private @method
        Attempts to register the singleton instance for this class with ezApi. Returns true
        if successful, false otherwise.
        @returns {boolean}
     */
    static #ezRegistrator() {
        if (EzTimeEntryAuditDialog.#ezCanRegister && !EzTimeEntryAuditDialog.#ezIsRegistered) {
            globalThis.ezApi.ezRegisterNewApi(EzTimeEntryAuditDialog, EzTimeEntryAuditDialog.ezApiName);
        }

        return EzTimeEntryAuditDialog.#ezIsRegistered;
    }

    /**
        @static
        Static Initialization
        ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        >> IMPORTANT <<
        ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        Make sure the following properties and methods get defined BEFORE this static initialization section:
            1) Property getter EzTimeEntryAuditDialog.ezApiName
            2) Property getter EzTimeEntryAuditDialog.ezEventNames
            3) Property getter EzTimeEntryAuditDialog.ezInstance
            4) Property setter EzTimeEntryAuditDialog.ezInstance
            5) Property getter EzTimeEntryAuditDialog.ezApiRegistrationState
            6) Property setter EzTimeEntryAuditDialog.ezApiRegistrationState
            7) Property getter EzTimeEntryAuditDialog.#ezCanRegister
            8) Property getter EzTimeEntryAuditDialog.#ezIsRegistered
            9) Method EzTimeEntryAuditDialog.#ezRegistrator()
     */
    static {
        if (!EzTimeEntryAuditDialog.#ezIsRegistered) {
            EzTimeEntryAuditDialog.ezApiRegistrationState = EzRegistrationState.PENDING;

            if (!EzTimeEntryAuditDialog.#ezRegistrator()) {
                document.addEventListener(
                    EzTimeEntryAuditDialog.ezOnEzApiReadyEventName,
                    () => {
                        if (!EzTimeEntryAuditDialog.#ezRegistrator()) {

                            document.addEventListener(
                                EzEventEngine.ezEventNames.onReady,
                                EzTimeEntryAuditDialog.#ezRegistrator);

                            document.addEventListener(
                                EzClockerContextEventName.ezEventNames.onReady,
                                EzTimeEntryAuditDialog.#ezRegistrator);

                            document.addEventListener(
                                EzClockerContext.ezEventNames.onReady,
                                EzTimeEntryAuditDialog.#ezRegistrator);

                            document.addEventListener(
                                EzClockerFeature.ezEventNames.onReady,
                                EzTimeEntryAuditDialog.#ezRegistrator);

                            document.addEventListener(
                                EzUI.ezEventNames.onReady,
                                EzTimeEntryAuditDialog.#ezRegistrator);
                        }
                    });
            }
        }
    }

    /**
        @public @constructor
        Constructor for EzTimeEntryAuditDialog
     */
    constructor() {
        super();
    }

    /**
        @public @readonly @proeprty
        Returns the date time format string for the dialog.
        @returns {string}
     */
    get DATE_TIME_FORMAT() {
        return 'MM/DD/YYYY hh:mm:ss A';
    }

    /**
        @public @field
        Stores if the features were initialized or not
        @type {boolean}
     */
    ezFeaturesInitialized = false;

    /**
        @public @field
        Stores if the job column should show or not
        @type {boolean}
     */
    ezShowJobColumn = false;

    /**
        @public @field
        Stores time entry audit data array
        @type {array}
     */
    ezTimeEntryAuditData = [];

    /**
        @public @field
        Stores time entry audit data by id
        @type {object}
     */
    ezTimeEntryAuditDataById = {};

    ezDependenciesReady = {
        selectedEmployerLicenseReady: false,
        selectedEmployerAccountReady: false,
        featureTogglesReady: false,
        ezAllDependenciesReady: () => {
            return EzTimeEntryAuditDialog.ezInstance.ezDependenciesReady.selectedEmployerLicenseReady &&
                EzTimeEntryAuditDialog.ezInstance.ezDependenciesReady.selectedEmployerAccountReady &&
                EzTimeEntryAuditDialog.ezInstance.ezDependenciesReady.featureTogglesReady;
        }
    };

    /**
        @public @readonly @property
        Gets the root HTML element id for the dialog.
        @returns {string}
     */
    get ezDialogId() {
        return 'EzTimeEntryAuditDialog';
    }

    /**
        @protected @method
        Initializes the time entry audit dialog.
        @returns {EzTimeEntryAuditDialog}
     */
    ezInit() {
        ezApi.ezclocker.ezEventEngine.ezWantEventEx(
            ezApi.ezclocker.ezEventEngine.ezCreateWantEventSettings(
                // aEventName
                EzClockerContextEventName.onSelectedEmployerLicenseReady,
                // aHandlerName
                EzTimeEntryAuditDialog.ezApiName,
                // aHandlerFunction
                () => {
                    EzTimeEntryAuditDialog.ezInstance.ezDependenciesReady.selectedEmployerLicenseReady = true;
                    EzTimeEntryAuditDialog.ezInstance.ezInitFeatures();
                },
                // aImmediateTriggerIfAlreadyTriggered
                true,
                // aUnwantAfterFirstTrigger
                true));

        ezApi.ezclocker.ezEventEngine.ezWantEventEx(
            ezApi.ezclocker.ezEventEngine.ezCreateWantEventSettings(
                // aEventName
                EzClockerContextEventName.onSelectedEmployerAccountReady,
                // aHandlerName
                EzTimeEntryAuditDialog.ezApiName,
                // aHandlerFunction
                () => {
                    EzTimeEntryAuditDialog.ezInstance.ezDependenciesReady.selectedEmployerAccountReady = true;
                    EzTimeEntryAuditDialog.ezInstance.ezInitFeatures();
                },
                // aImmediateTriggerIfAlreadyTriggered
                true,
                // aUnwantAfterFirstTrigger
                true));

        ezApi.ezclocker.ezEventEngine.ezWantEventEx(
            ezApi.ezclocker.ezEventEngine.ezCreateWantEventSettings(
                // aEventName
                EzFeatureToggles.ezEventNames.onFeatureTogglesReady,
                // aHandlerName
                EzTimeEntryAuditDialog.ezApiName,
                // aHandlerFunction
                () => {
                    EzTimeEntryAuditDialog.ezInstance.ezDependenciesReady.featureTogglesReady = true;
                    EzTimeEntryAuditDialog.ezInstance.ezInitFeatures();
                },
                // aImmediateTriggerIfAlreadyTriggered
                true,
                // aUnwantAfterFirstTrigger
                true));

        return EzTimeEntryAuditDialog.ezInstance;
    }

    /**
        @protected @method
        Initializes optional features of the time entry audit dialog.
     */
    ezInitFeatures() {
        if (!EzTimeEntryAuditDialog.ezInstance.ezFeaturesInitialized && EzTimeEntryAuditDialog.ezInstance.ezDependenciesReady.ezAllDependenciesReady()) {
            EzTimeEntryAuditDialog.ezInstance.ezFeaturesInitialized = true;

            EzTimeEntryAuditDialog.ezInstance.ezShowJobColumn = EzBoolean.isTrue(
                ezApi.ezclocker.ezClockerContext.ezSelectedEmployerAccountFeatureEnabled(EzClockerFeature.EZ_JOBS));

            EzTimeEntryAuditDialog.ezInstance.ezInitUx();
        }
    }

    /**
        @protected @method
        Initializes the time entry audit dialog's UX
     */
    ezInitUx() {
        EzTimeEntryAuditDialog.ezInstance.ezInjectDialog();

        ezApi.ezclocker.ezUi.ezId(EzTimeEntryAuditDialog.ezInstance.ezDialogId).dialog(
            {
                draggable: true,
                resizable: true,
                closeOnEscape: true,
                autoOpen: false,
                width: '90%',
                modal: true,
                //dialogClass: 'noDialogTitle ezAllSideShadow',
                show: 'blind',
                showOpt: {
                    direction: 'down'
                },
                buttons: [{
                    text: 'Close',
                    click: EzTimeEntryAuditDialog.ezInstance.ezClose
                }]
            });
    }

    /**
        @protected @method
        Injects the dialog into the HTML document
     */
    ezInjectDialog() {
        ezApi.ezclocker.ezDialog.ezInjectDialogUx(
            ezApi.ezTemplate`
                <div
                    id="${EzTimeEntryAuditDialog.ezInstance.ezDialogId}"
                    title="Time Entry Audit">
                </div>`);
    }

    /**
        @public @method
        Closes the EzTimeEntryAuditDialog
     */
    ezClose() {
        // Clear data
        EzTimeEntryAuditDialog.ezInstance.ezTimeEntryAuditData = [];
        EzTimeEntryAuditDialog.ezInstance.ezTimeEntryAuditDataById = {};
        ezApi.ezclocker.ezDialog.ezCloseDialog(EzTimeEntryAuditDialog.ezInstance.ezDialogId);
    }

    /**
        @public @method
        Shows the EzTimeEntryAuditDialog
        @param {number} timeEntryId
     */
    ezShow(timeEntryId) {
        if (!EzNumber.isNumber(timeEntryId)) {
            throw new EzBadParamException(
                'timeEntryId',
                EzTimeEntryAuditDialog.ezInstance,
                EzTimeEntryAuditDialog.ezInstance.ezShow);
        }

        EzTimeEntryAuditDialog.ezInstance.ezInitData(timeEntryId)
            .then(
                () => ezApi.ezclocker.ezDialog.ezShowDialog(EzTimeEntryAuditDialog.ezInstance.ezDialogId)
                    .then(ezApi.ezIgnoreResolve),
                (eResponse, jqXHR) => {
                    EzTimeEntryAuditDialog.ezInstance.ezclocker.ezDialog.ezShowPossibleDefectError(
                        'Time Entry Audit Error',
                        'ezClocker is currently unable to obtain the audit data for the time entry.',
                        jqXHR,
                        eResponse);
                });
    }

    /**
        @protected @method
        Initializes the time entry audit data
        @param {number} timeEntryId
        @returns {Promise}
     */
    ezInitData(timeEntryId) {
        if (!EzNumber.isNumber(timeEntryId)) {
            throw new EzBadParamException(
                'timeEntryId',
                EzTimeEntryAuditDialog.ezInstance,
                EzTimeEntryAuditDialog.ezInstance.ezInitData);
        }

        EzTimeEntryAuditDialog.ezInstance.ezTimeEntryId = timeEntryId;

        return ezApi.ezPromise(
            (success, failed) => {
                EzTimeEntryAuditDialog.ezInstance.ezGetTimeEntryAuditsForTimeEntryId(EzTimeEntryAuditDialog.ezInstance.ezTimeEntryId)
                    .then(
                        (response) => {
                            if (!EzArray.arrayHasLength(response.entities)) {
                                ezApi.ezclocker.ezUi.ezContent(EzTimeEntryAuditDialog.ezInstance.ezDialogId,
                                    ezApi.ezTemplate`
                                        <h3>
                                            Time Entry Modification Audit
                                        </h3>
                                        <div
                                            class="ezLightGrayBox8">
                                            Audit data is not available for this time entry.
                                            <p>
                                                Time entries may not have audit data in the following cases:
                                                <ul>
                                                    <li>
                                                        The time entry was created prior to the audit feature availability.
                                                    </li>
                                                    <li>
                                                        Audit data is not restored when un-archiving an employee.
                                                    </li>
                                                </ul>
                                                Please contact ezClocker suport at <a href="mailto:support@ezclocker.com">
                                                support@ezclocker.com</a> and ask the support agent to investigate the probable root
                                                cause if you believe none of the above cases apply.
                                            </p>
                                        </div>`);
                                return success(response);
                            }

                            EzTimeEntryAuditDialog.ezInstance.ezTimeEntryAuditData = response.entities
                                .map(
                                    (timeEntryAudit) => {
                                        EzTimeEntryAuditDialog.ezInstance.ezTimeEntryAuditDataById[timeEntryAudit.id.toString()] = timeEntryAudit;

                                        return timeEntryAudit;
                                    })
                                .sort(
                                    (timeEntryAuditA, timeEntryAuditB) => {
                                        if (timeEntryAuditA.id === timeEntryAuditB.id) {
                                            return 0;
                                        }

                                        return timeEntryAuditA.id > timeEntryAuditB.id
                                            ? -1
                                            : 1;
                                    });

                            EzTimeEntryAuditDialog.ezInstance.ezRenderTimeEntryAudit();

                            return success(response);
                        },
                        (eResponse, jqXHR) => {
                            ezApi.ezclocker.ezLogger.error(
                                `Failed to obtain time entry audit data. Error: ${ezApi.ezToJson(eResponse)}`);

                            return failed(eResponse, jqXHR);
                        });
            });
    }

    /**
        @protected @method
        Renders the time entry audit data UX
    */
    ezRenderTimeEntryAudit() {
        let jobHeaderColumn = EzBoolean.isTrue(EzTimeEntryAuditDialog.ezInstance.ezShowJobColumn)
            ? ezApi.ezTemplate`
                <td
                    id="EzAuditJobs"
                    class="timeEntryAuditHeader">
                    Jobs
                </td>`
            : EzString.EMPTY;

        ezApi.ezclocker.ezUi.ezContent(
            EzTimeEntryAuditDialog.ezInstance.ezDialogId,
            ezApi.ezTemplate`
                <h3>Time Entry Modification Audit</h3>
                <table
                    id="EzTimeEntryAuditTable"
                    class="timeEntryAuditTable fullWidth">
                    <thead>
                        <tr>
                            <td
                                id="EzAuditAction"
                                class="timeEntryAuditHeader" >
                                Action
                            </td>
                            <td
                                id="EzAuditActionDate"
                                class="timeEntryAuditHeader">
                                Action Date
                            </td>
                            <td
                                id="EzAuditChangedBy"
                                class="timeEntryAuditHeader">
                                Changed By
                            </td>
                            <td
                                id="EzAuditClockIn"
                                class="timeEntryAuditHeader">
                                Clock In
                            </td>
                            <td
                                id="EzAuditClockOut"
                                class="timeEntryAuditHeader">
                                Clock Out
                            </td>
                            ${jobHeaderColumn}
                            <td
                                id="EzAuditNotes"
                                class="timeEntryAuditHeader">
                                Notes
                            </td>
                            <td
                                id="EzAuditSource"
                                class="timeEntryAuditHeader">
                                Source
                            </td>
                        </tr>
                    </thead>
                </table>`);

        for (let timeEntryAudit of EzTimeEntryAuditDialog.ezInstance.ezTimeEntryAuditData) {
            let clockIn = EzString.hasLength(timeEntryAudit.clockInIso8601)
                ? ezApi.ezclocker.ezDateTime.ezToDisplayDateTime(
                    ezApi.ezclocker.ezDateTime.ezCreateFromIso(timeEntryAudit.clockInIso8601))
                : '--';

            let clockOut = !EzBoolean.booleanOrFalse(timeEntryAudit.isActiveClockIn) && EzString.hasLength(timeEntryAudit.clockOutIso8601)
                ? ezApi.ezclocker.ezDateTime.ezToDisplayDateTime(
                    ezApi.ezclocker.ezDateTime.ezCreateFromIso(timeEntryAudit.clockOutIso8601))
                : '--';

            let modified = EzString.hasLength(timeEntryAudit.modifiedIso)
                ? ezApi.ezclocker.ezDateTime.ezToDisplayDateTimeWithSeconds(
                    ezApi.ezclocker.ezDateTime.ezCreateFromIso(timeEntryAudit.modifiedIso))
                : 'n/a';

            let rowId = timeEntryAudit.id;

            let jobColumn = EzBoolean.isTrue(EzTimeEntryAuditDialog.ezInstance.ezShowJobColumn)
                ? ezApi.ezTemplate`
                    <td
                        id="EzAuditJobs_${rowId}"
                        class="timeEntryAuditDataCell">
                        ${EzTimeEntryAuditDialog.ezInstance.ezBuildAuditJobInfo(timeEntryAudit.timeEntryAssignedJobsList)}
                    </td>`
                : EzString.EMPTY;

            let source = EzString.hasLength(timeEntryAudit.source) && 'null' !== timeEntryAudit.source
                ? timeEntryAudit.source
                : '[data not available]';

            ezApi.ezclocker.ezUi.ezAppendContent(
                'EzTimeEntryAuditTable',
                ezApi.ezTemplate`
                    <tr
                        id="_AuditRow_${rowId}">
                        <td
                            id="_AuditAction_${rowId}"
                            class="timeEntryAuditDataCell">
                            ${timeEntryAudit.status}
                        </td>
                        <td
                            id="_AuditActionDate_${rowId}"
                            class="timeEntryAuditDataCell">
                            ${modified}
                        </td>
                        <td
                            id="_AuditChangedBY_${rowId}"
                            class="timeEntryAuditDataCell">
                            ${timeEntryAudit.modifiedBy}
                        </td>
                        <td
                            id="_AuditClockIn_${rowId}"
                            class="timeEntryAuditDataCell">
                            ${clockIn}
                        </td>
                        <td
                            id="_AuditClockOut_${rowId}"
                            class="timeEntryAuditDataCell" >
                            ${clockOut}
                        </td>
                        ${jobColumn}
                        <td
                            id="_AuditNote_${rowId}"
                            class="timeEntryAuditDataCell" >
                            ${timeEntryAudit.notes}
                        </td>
                        <td
                            id="_AuditSource_${rowId}"
                            class="timeEntryAuditDataCell">
                            ${source}
                        </td>
                    </tr>`);
        }
    }

    /**
        @protected @method
        Builds the time entry audit's job information column
        @param {array} timeEntryAssignedJobsList
        @returns {string}
     */
    ezBuildAuditJobInfo(timeEntryAssignedJobsList) {
        let assignedJobs = EzString.EMPTY;

        if (!EzArray.arrayHasLength(timeEntryAssignedJobsList)) {
            return assignedJobs;
        }

        timeEntryAssignedJobsList.forEach(
            (jobDataTag) => {
                assignedJobs += !EzString.hasLength(assignedJobs)
                    ? jobDataTag.tagName
                    : `, ${jobDataTag.tagName}`;
            });

        return assignedJobs;
    }

    /**
        @protected @method
        Obtains the time entry's audit data.
        @param {number} timeEntryId
        @returns {Promise}
     */
    ezGetTimeEntryAuditsForTimeEntryId(timeEntryId) {
        if (!EzNumber.isNumber(timeEntryId)) {
            throw new EzBadParamException(
                'timeEntryId',
                EzTimeEntryAuditDialog.ezInstance,
                EzTimeEntryAuditDialog.ezInstance.ezGetTimeEntryAuditsForTimeEntryId);
        }

        return ezApi.ezclocker.ezHttpHelper.ezGet(
            ezApi.ezclocker.ezNavigation.getInternalApiServiceUrl(
                `audits/timeentry/audit/${timeEntryId}`,
                'v1'))
            .then(
                ezApi.ezclocker.ezServices.ezProcessApiResolve,
                ezApi.ezclocker.ezServices.ezProcessApiReject);
    }
}
