// Exception Imports
import {
    EzException,
    EzBadParamException
} from '/ezlibrary/exceptions/EzExceptions.js';

// Helper Imports
import {
    EzObject,
    EzBoolean,
    EzNumber,
    EzString,
    EzArray,
    EzJson,
    EzPromise
} from '/ezlibrary/helpers/EzHelpers.js';

// Base Class Imports
import { EzClass } from '/ezlibrary/EzClass.js';

// Enumeration Imports
import {
    EzRegistrationState,
    EzTimeEntryType,
    EzEntityType,
    EzDataTagFilterType,
    EzPrimaryAccountType,
    EzDataTagType,
    EzTimeAddEditDialogMode
} from '/ezlibrary/enums/EzEnumerations.js';

// Entity classes
import {
    EzDataTag,
    EzDataTagMap
} from '/ezlibrary/entities/EzEntities.js';

// Core Class Imports
import { EzEventEngine } from '/ezlibrary/ez-event-engine.js';
import { EzDateTime } from '/public/javascript/common/ez-date-time.js';
import { EzClockerContext } from '/ezlibrary/EzClockerContext/ez-context.js';
import { EzClockerFeature } from '/ezlibrary/EzClockerFeature.js';
import { EzAnalyticsAndMetrics } from '/ezlibrary/analytics_metrics/EzAnalyticsAndMetrics.js';

// Other Class Imports
import { EzDataTagService } from '/secure/javascript/services/ezclocker-datatag-service.js';

// UX Class Imports
import { EzUI } from '/public/javascript/common/ezui.js';
import { EzDialog } from '/public/javascript/common/ezclocker-dialog-helper.js';
import { EzValidation } from '/public/javascript/common/ez-validation.js';
import { EzTimeAddEditDialogView } from '/secure/widgets/EzTimeAddEditDialog/EzTimeAddEditDialogView.js';

/**
 * @class
 * @extends {EzClass}
 * @description
 * Controller for the Add Time Entry dialog.
 * Import with:
 *     import {EzTimeAddEditDialogController} from '/secure/widgets/EzTimeAddEditDialog/EzTimeAddEditDialogController.js';
 *
 *     globalThis.ezApi.ezclocker[EzTimeAddEditDialogController.ezApiName] &&
 *     globalThis.ezApi.ezclocker[EzTimeAddEditDialogController.ezApiName].ready
 *
 *     document.addEventListener(
 *         EzTimeAddEditDialogController.ezEventNames.onReady,
 *         this.#ezRegistrator);
 */
export class EzTimeAddEditDialogController extends EzClass {
    /**
     * @public @field
     * Stores the array of Jobs available to the active employee to assign to a break or time entry.
     * @type {array}
     */
    #ezAvailableJobs = [];
    /**
     * @public @property @getter
     * Gets an array of available job names
     * @returns {array}
     */
    get ezAvailableJobs() {
        if (!EzArray.isArray(this.#ezAvailableJobs)) {
            this.#ezAvailableJobs = [];
        }

        return this.#ezAvailableJobs;
    }
    /**
     * @public @property @setter
     * Sets the array of available job names
     * @param {array}
     */
    set ezAvailableJobs(ezAvailableJobs) {
        this.#ezAvailableJobs = EzArray.isArray(ezAvailableJobs)
            ? EzDataTag.toArrayOfEzDataTags(ezAvailableJobs)
            : [];
    }

    /**
     * @deprecated
     * Migrate to EzTimeAddEditDialogController.ezEventNames static reference instead.
     * @public @readonly @property
     * @returns {object}
     */
    get ezEventNames() {
        return EzTimeAddEditDialogController.ezEventNames;
    }

    /**
     * @public @method
     * Shows the EzTimeAddEditDialogView with the provided EzTimeAddEditDialogViewConfiguration
     * @param {EzTimeAddEditDialogViewConfiguration} ezTimeAddEditDialogViewConfiguration
     */
    ezShow(ezTimeAddEditDialogViewConfiguration) {
        if (!EzObject.isValid(ezTimeAddEditDialogViewConfiguration)) {
            throw new EzBadParamException(
                'ezTimeAddEditDialogViewConfiguration',
                EzTimeAddEditDialogController.ezInstance,
                EzTimeAddEditDialogController.ezInstance.ezShow);
        }

        return ezApi.ezAsyncOperation(
            () => EzTimeAddEditDialogView.ezInstance.ezResetDialog()
                .then(
                    () => EzTimeAddEditDialogController.ezInstance.ezInitData()
                        .then(
                            () => EzTimeAddEditDialogController.ezInstance.ezUpdateEzTimeEditDialogViewConfiguration(
                                ezTimeAddEditDialogViewConfiguration)
                                .then(
                                    () => {
                                        EzTimeAddEditDialogView.ezInstance.ezShow();

                                        ezApi.ezclocker.ezEventEngine.ezTriggerEvent(
                                            EzTimeAddEditDialogController.ezEventNames.onTimeEntryDialogShow,
                                            ezApi.ezclocker.ezEventEngine.ezBuildEventData(
                                                EzTimeAddEditDialogController.ezApiName,
                                                'Add/edit time entry dialog shown.',
                                                EzTimeAddEditDialogController.ezInstance));
                                    }),
                            (eResponse, jqXHR) => ezApi.ezclocker.ezDialog.ezReportInternalBugDialog(
                                jqXHR,
                                'Unable to obtain the time entry data for the add/update time entry dialog.',
                                eResponse.message,
                                eResponse,
                                null,
                                false))));
    }

    /**
     * @public @method
     * Closes the dialog
     */
    ezClose() {
        EzTimeAddEditDialogController.ezInstance.ezAvailableJobs = [];

        EzTimeAddEditDialogController.ezInstance.ezTimeEntry = null;

        ezApi.ezclocker.ezEventEngine.ezTriggerEvent(
            EzTimeAddEditDialogController.ezEventNames.onTimeEntryDialogClosed,
            ezApi.ezclocker.ezEventEngine.ezBuildEventData(
                EzTimeAddEditDialogController.ezApiName,
                'Add/edit time entry dialog closed.',
                EzTimeAddEditDialogController.ezInstance));
    }

    /**
     * @public @method
     * Ignores data in the dialog, performs no changes, and closes the dialog.
     */
    ezCancel() {
        ezApi.ezclocker.ezEventEngine.ezTriggerEvent(
            EzTimeAddEditDialogController.ezEventNames.onTimeEntryDialogCanceled,
            ezApi.ezclocekr.ezEventEngine.ezInstance.ezBuildEventData(
                EzTimeAddEditDialogController.ezApiName,
                'Add/Edit Time Entry Dialog Canceled',
                EzTimeAddEditDialogController.ezInstance));

        EzTimeAddEditDialogController.ezInstance.ezClose();
    }

    /**
     * @public @method
     * Updates the EzTimeAddEditDialogView's configuration
     * @param {EzTimeAddEditDialogViewConfiguration} ezTimeAddEditDialogViewConfiguration
     * @returns {Promise.resolve}}
     */
    ezUpdateEzTimeEditDialogViewConfiguration(ezTimeAddEditDialogViewConfiguration) {
        if (!EzObject.isValid(ezTimeAddEditDialogViewConfiguration)) {
            throw new EzBadParamException(
                'ezConfigureEzTimeEditDialogView',
                EzTimeAddEditDialogController.ezInstance,
                EzTimeAddEditDialogController.ezInstance.ezUpdateEzTimeEditDialogViewConfiguration);
        }

        ezTimeAddEditDialogViewConfiguration.ezPrimaryAccountType = EzPrimaryAccountType.ezValueOf(
            ezApi.ezclocker.ezClockerContext.ezGetUserContextPrimaryAccountType());

        ezTimeAddEditDialogViewConfiguration.ezAvailableJobs = EzTimeAddEditDialogController.ezInstance.ezAvailableJobs;

        // Default time entry mode is ADD_TIME_ENTRY
        let ezTimeAddEditDialogMode = EzTimeAddEditDialogMode.ADD_TIME_ENTRY;

        if (ezTimeAddEditDialogViewConfiguration.ezEditingTimeEntry) {
            EzTimeAddEditDialogController.ezInstance.ezAddEditingTimeEntryArchivedJob(ezTimeAddEditDialogViewConfiguration);

            // Determine the dialog mode from the provided time entry
            switch (ezTimeAddEditDialogViewConfiguration.ezEditingTimeEntry.timeEntryType) {
                case EzTimeEntryType.CLOCK_IN:
                    ezTimeAddEditDialogMode =
                        EzBoolean.isTrue(ezTimeAddEditDialogViewConfiguration.ezEditingTimeEntry.isActiveClockIn)
                            ? EzTimeAddEditDialogMode.UPDATE_ACTIVE_TIME_ENTRY
                            : EzTimeAddEditDialogMode.UPDATE_TIME_ENTRY;

                    break;
                case EzTimeEntryType.BREAK:
                    ezTimeAddEditDialogMode = EzTimeAddEditDialogMode.UPDATE_BREAK;

                    break;
                case EzTimeEntryType.BREAK_IN:
                    ezTimeAddEditDialogMode =
                        EzBoolean.isTrue(ezTimeAddEditDialogViewConfiguration.ezEditingTimeEntry.isActiveBreak)
                            ? EzTimeAddEditDialogMode.UPDATE_ACTIVE_BREAK
                            : EzTimeAddEditDialogMode.UPDATE_BREAK;

                    break;
                case EzTimeEntryType.NORMAL:
                default:
                    ezTimeAddEditDialogMode = EzTimeAddEditDialogMode.UPDATE_TIME_ENTRY;

                    break;
            }
        } else if (EzObject.isValid(ezTimeAddEditDialogViewConfiguration.ezAddingTimeEntry) &&
            EzObject.isValid(ezTimeAddEditDialogViewConfiguration.ezAddingTimeEntry.timeEntryType) &&
            EzTimeEntryType.NORMAL !== ezTimeAddEditDialogViewConfiguration.ezAddingTimeEntry.timeEntryType) {
            // Switch to ADD_BREAK if the timeEntryType is not NULL and NOT NORMAL
            ezTimeAddEditDialogMode = EzTimeAddEditDialogMode.ADD_BREAK;
        }

        return EzTimeAddEditDialogView.ezInstance.ezConfigureDialog(
            ezTimeAddEditDialogViewConfiguration,
            ezTimeAddEditDialogMode);
    }

    /**
     * @protected @method
     * Initializes EzTimeAddEditDialogController
     * @returns {EzTimeAddEditDialogController}
     */
    ezInit() {
        ezApi.ezclocker.ezEventEngine.ezRegisterEvent(
            EzTimeAddEditDialogController.ezApiName,
            EzTimeAddEditDialogController.ezEventNames.onTimeEntryDialogShow);

        ezApi.ezclocker.ezEventEngine.ezRegisterEvent(
            EzTimeAddEditDialogController.ezApiName,
            EzTimeAddEditDialogController.ezEventNames.onTimeEntryDialogClosed);

        ezApi.ezclocker.ezEventEngine.ezRegisterEvent(
            EzTimeAddEditDialogController.ezApiName,
            EzTimeAddEditDialogController.ezEventNames.onTimeEntryDialogCanceled);

        ezApi.ezclocker.ezEventEngine.ezRegisterEvent(
            EzTimeAddEditDialogController.ezApiName,
            EzTimeAddEditDialogController.ezEventNames.onTimeEntryDialogTimeEntryAdded);

        ezApi.ezclocker.ezEventEngine.ezRegisterEvent(
            EzTimeAddEditDialogController.ezApiName,
            EzTimeAddEditDialogController.ezEventNames.onTimeEntryDialogTimeEntryUpdated);

        ezApi.ezclocker.ezEventEngine.ezWantEvent(
            EzTimeAddEditDialogView.ezEventNames.onSubmitAdd,
            EzTimeAddEditDialogController.ezApiName,
            EzTimeAddEditDialogController.ezInstance.ezHandleEzTimeEditDialogViewOnSubmitAddEvent);

        ezApi.ezclocker.ezEventEngine.ezWantEvent(
            EzTimeAddEditDialogView.ezEventNames.onSubmitUpdate,
            EzTimeAddEditDialogController.ezApiName,
            EzTimeAddEditDialogController.ezInstance.ezHandleEzTimeEditDialogViewOnSubmitUpdateEvent);

        ezApi.ezclocker.ezEventEngine.ezWantEvent(
            EzTimeAddEditDialogView.ezEventNames.onClose,
            EzTimeAddEditDialogController.ezApiName,
            EzTimeAddEditDialogController.ezInstance.ezClose);

        return EzTimeAddEditDialogController.ezInstance;
    }

    /**
     * @public @method
     * Initializes the data needed in the dialog.
     * @returns {Promise}
     */
    ezInitData() {
        return EzTimeAddEditDialogController.ezInstance.ezGetActiveEmployeeJobs();
    }

    /**
     * @protected @method
     * Evaluates the editing time entry's jobs and if the assigned job is an archived job, the archived job is added to
     * the available jobs list so that the job assignment isn't lost during editing.
     * @param {EzTimeAddEditDialogViewConfiguration} ezTimeAddEditDialogViewConfiguration
     */
    ezAddEditingTimeEntryArchivedJob(ezTimeAddEditDialogViewConfiguration) {
        if (EzArray.hasLength(ezTimeAddEditDialogViewConfiguration.ezTimeEntry.assignedJobs)) {
            // Checking if the editing time entry's assigned job is available.
            // If the editing time entry has assignedJobs but the DataTag assigned is archived
            // the archived DataTag is added to the ezAvailableJobs so the job appears in the
            // available job's select box which will prevent losing the assignment.

            let timeEntryAssignedDataTag = ezTimeAddEditDialogViewConfiguration.ezTimeEntry.assignedJobs[0];

            if (EzObject.isValid(timeEntryAssignedDataTag) && EzBoolean.isTrue(timeEntryAssignedDataTag.archived)) {
                // Add the one archived job code
                EzTimeAddEditDialogController.ezInstance.ezAvailableJobs.push(timeEntryAssignedDataTag);

                ezTimeAddEditDialogViewConfiguration.ezAvailableJobs = EzTimeAddEditDialogController.ezInstance.ezAvailableJobs;
            }
        }
    }

    /**
     * @protected @method
     * Triggers the ezOnTimeEntryDialogTimeEntryAdded event
     */
    ezOnTimeEntryDialogTimeEntryAdded() {
        ezApi.ezclocker.ezEventEngine.ezTriggerEvent(
            EzTimeAddEditDialogController.ezEventNames.onTimeEntryDialogTimeEntryAdded,
            ezApi.ezclocker.ezEventEngine.ezBuildEventData(
                EzTimeAddEditDialogController.ezInstance,
                'New time entry added.',
                EzTimeAddEditDialogView.ezInstance.ezTimeAddEditDialogViewConfiguration.ezTimeEntry));
    }

    /**
     * @protected @method
     * Triggers the ezOnTimeEntryDialogTimeEntryUpdated event
     */
    ezOnTimeEntryDialogTimeEntryUpdated() {
        ezApi.ezclocker.ezEventEngine.ezTriggerEvent(
            EzTimeAddEditDialogController.ezEventNames.onTimeEntryDialogTimeEntryUpdated,
            ezApi.ezclocker.ezEventEngine.ezBuildEventData(
                EzTimeAddEditDialogController.ezInstance,
                'Time entry updated.',
                EzTimeAddEditDialogView.ezInstance.ezTimeAddEditDialogViewConfiguration.ezTimeEntry));
    }

    /**
     * @protected @method
     * Generate the add job code options.
     * @returns {Promise.resolve}
     * A resolve only promise
     */
    ezGetActiveEmployeeJobs() {
        if (!ezApi.ezclocker.ezClockerContext.ezActiveEmployerFeatureEnabled(EzClockerFeature.EZ_JOBS)) {
            EzTimeAddEditDialogController.ezInstance.ezAvailableJobs = [];
            return EzPromise.resolve(EzTimeAddEditDialogController.ezInstance.ezAvailableJobs);
        }

        EzTimeAddEditDialogController.ezInstance.ezAvailableJobs = [];

        let aEmployee = ezApi.ezclocker.ezClockerContext.ezGetActiveEmployee();

        return ezApi.ezclocker.ezUi.ezStartPageWaitResolve(
            'Loading available jobs ...',
            (waitDone, resolve) => ezApi.ezclocker.ezDataTagService.ezGetAllDataTagsAssignedToEmployee(
                aEmployee.id,
                EzDataTagType.JOB_CODE,
                EzDataTagFilterType.ACTIVE)
                .then(
                    (response) => {
                        EzTimeAddEditDialogController.ezInstance.ezAvailableJobs = response.entities;

                        return waitDone()
                            .then(
                                () => resolve(EzTimeAddEditDialogController.ezInstance.ezAvailableJobs));
                    }),
            (eResponse) => {
                EzTimeAddEditDialogController.ezInstance.ezAvailableJobs = [];

                if (!EzObject.isValid(aEmployee)) {
                    aEmployee = {
                        id: 'UNKNOWN',
                        employeeName: 'UNKNOWN'
                    };
                }

                return waitDone()
                    .then(
                        () => ezApi.ezclocker.ezDialog.ezShowServiceResponseErrorDialog(
                            'Available Jobs Error',
                            EzString.em`
                                Unable to obtain the list of job assignments available to
                                employee ${aEmployee.employeeName}`,
                            eResponse,
                            EzString.em`
                                Failed to obtain the jobs assigned to employee ${aEmployee.employeeName}
                                (id=${aEmployee.id.toString()}).
                                Failed to obtain the jobs assigned to all employees.`)
                            .then(resolve))
            });
    }

    /**
     * @protected @method
     * Handles the EzTimeAddEditDialogView's onSubmitAdd event and calls the api to add the new time entry or break.
     * @param {object} ezEvent
     */
    ezHandleEzTimeEditDialogViewOnSubmitAddEvent(ezEvent) {
        if (!EzObject.isValid(ezEvent)) {
            throw new EzBadParamException(
                'ezEvent',
                EzTimeAddEditDialogController.ezInstance,
                EzTimeAddEditDialogController.ezInstance.ezHandleEzTimeEditDialogViewOnSubmitAddEvent);
        }
        if (!EzObject.isValid(ezEvent.data)) {
            throw new EzBadParamException(
                'ezEvent.data',
                EzTimeAddEditDialogController.ezInstance,
                EzTimeAddEditDialogController.ezInstance.ezHandleEzTimeEditDialogViewOnSubmitAddEvent);
        }

        let ezEventData = ezEvent.data;

        EzTimeAddEditDialogController.ezInstance.ezLogAmplitudeEvent(EzTimeAddEditDialogController.ezInstance.ezGenerateSubmitTimeAmplitudeLogEvent());

        switch (EzTimeAddEditDialogView.ezInstance.ezTimeAddEditDialogMode) {
            case EzTimeAddEditDialogMode.ADD_TIME_ENTRY:
                return EzTimeAddEditDialogController.ezInstance.ezAddTimeEntry(
                    ezEventData.clockInMoment,
                    ezEventData.clockOutMoment,
                    EzString.stringOrEmpty(ezEventData.notes))
                    .then(
                        EzTimeAddEditDialogView.ezInstance.ezClose,
                        (eResponse) => EzTimeAddEditDialogController.ezInstance.ezShowSubmitAddUpdateError(eResponse)
                            .then(EzPromise.ignoreResolve));
            case EzTimeAddEditDialogMode.ADD_BREAK:
                if (ezEventData.clockOutMoment.diff(ezEventData.clockInMoment) > 60 * 60 * 1000) {
                    ezApi.ezclocker.ezDialog.ezShowYesNo(
                        'Add Time Break',
                        'Your total break time is greater than an hour. Do you wish to continue?',
                        ezEventData.timeEntryId,
                        600)
                        .then(
                            (dialogResult) => {
                                if (ezApi.ezclocker.ezDialog.NO_DIALOG_RESPONSE.dialogStatus === dialogResult.dialogStatus) {
                                    return;
                                }

                                return EzTimeAddEditDialogController.ezInstance.ezAddBreak(
                                    ezEventData.clockInMoment,
                                    ezEventData.clockOutMoment,
                                    EzString.stringOrEmpty(ezEventData.notes))
                                    .then(
                                        EzTimeAddEditDialogView.ezInstance.ezClose,
                                        (eResponse) => EzTimeAddEditDialogController.ezInstance.ezShowSubmitAddUpdateError(eResponse)
                                            .then(EzPromise.ignoreResolve));
                            },
                            ezApi.ezIgnoreReject)
                } else {
                    return EzTimeAddEditDialogController.ezInstance.ezAddBreak(
                        ezEventData.clockInMoment,
                        ezEventData.clockOutMoment,
                        EzString.stringOrEmpty(ezEventData.notes))
                        .then(
                            EzTimeAddEditDialogView.ezInstance.ezClose,
                            (eResponse) => EzTimeAddEditDialogController.ezInstance.ezShowSubmitAddUpdateError(eResponse)
                                .then(EzPromise.ignoreResolve));
                }
        }
    }

    /**
     * @protected @method
     * Adds a new time entry with the provided data.
     * @param {moment} clockInMoment
     * @param {moment} clockOutMoment
     * @param {string} notes
     * @returns {Promise}
     * Promise.resolve contains the time entry entity added.
     * Promise.reject contains the service error response object.
     */
    ezAddTimeEntry(clockInMoment, clockOutMoment, notes) {
        if (!EzObject.isValid(clockInMoment)) {
            throw new EzBadParamException(
                'clockInMoment',
                EzTimeAddEditDialogController.ezInstance,
                EzTimeAddEditDialogController.ezInstance.ezAddTimeEntry);
        }
        if (!EzObject.isValid(clockOutMoment)) {
            throw new EzBadParamException(
                'clockOutMoment',
                EzTimeAddEditDialogController.ezInstance,
                EzTimeAddEditDialogController.ezInstance.ezAddTimeEntry);
        }
        if (!EzString.hasLength(notes)) {
            notes = EzString.EMPTY;
        }

        let ezTimeAddEditDialogViewConfiguration =
            EzTimeAddEditDialogView.ezInstance.ezTimeAddEditDialogViewConfiguration;

        let addingTimeEntry = ezTimeAddEditDialogViewConfiguration.ezTimeEntry;

        if (!EzObject.isValid(addingTimeEntry)) {
            throw new EzException(
                EzString.em`
                    Unable to add the time entry due to the following error:
                    The time data from the time editor dialog is null.`);
        }

        addingTimeEntry.employerId = ezApi.ezclocker.ezClockerContext.ezGetActiveEmployer().id;

        addingTimeEntry.employeeId = ezApi.ezclocker.ezClockerContext.ezGetActiveEmployee().id;

        addingTimeEntry.clockInIso = ezApi.ezclocker.ezDateTime.ezToIsoDateTime(clockInMoment);

        addingTimeEntry.clockOutIso = ezApi.ezclocker.ezDateTime.ezToIsoDateTime(clockOutMoment);

        addingTimeEntry.notes = EzString.encodeHtml(notes);

        let addTimeEntryJsonPayload = EzJson.toJson(
            ezTimeAddEditDialogViewConfiguration.ezCreateAddTimeEntryRequest(
                EzTimeAddEditDialogController.ezInstance.ezBuildDataTagMapsPayload()));

        return EzTimeAddEditDialogController.ezInstance.ezAddBreakOrTimeEntry(addTimeEntryJsonPayload);
    }

    /**
     * @public @method
     * Adds a new break with the provided data.
     * @param {moment} clockInMoment
     * @param {moment} clockOutMoment
     * @param {string} notes
     * @returns {Promise}
     * Promise.resolve contains the break entity added.
     * Promise.reject contains the service error response object.
     */
    ezAddBreak(clockInMoment, clockOutMoment, notes) {
        if (!EzObject.isValid(clockInMoment)) {
            throw new EzBadParamException(
                'clockInMoment',
                EzTimeAddEditDialogController.ezInstance,
                EzTimeAddEditDialogController.ezInstance.ezAddTimeEntry);
        }
        if (!EzObject.isValid(clockOutMoment)) {
            throw new EzBadParamException(
                'clockOutMoment',
                EzTimeAddEditDialogController.ezInstance,
                EzTimeAddEditDialogController.ezInstance.ezAddTimeEntry);
        }
        if (!EzString.hasLength(notes)) {
            notes = EzString.EMPTY;
        }

        let addingBreak = EzTimeAddEditDialogView.ezInstance.ezTimeAddEditDialogViewConfiguration.ezTimeEntry;

        if (!EzObject.isValid(addingBreak)) {
            throw new EzException(
                EzString.em`
                    Unable to add the new break due to the following error:
                    The time data from the time editor dialog is null.`);
        }

        addingBreak.employerId = ezApi.ezclocker.ezClockerContext.ezGetActiveEmployer().id;

        addingBreak.employeeId = ezApi.ezclocker.ezClockerContext.ezGetActiveEmployee().id;

        addingBreak.clockInIso = ezApi.ezclocker.ezDateTime.ezToIsoDateTime(clockInMoment);

        addingBreak.clockOutIso = ezApi.ezclocker.ezDateTime.ezToIsoDateTime(clockOutMoment);

        addingBreak.notes = EzString.hasLength(notes) && EzString.hasLength(notes.trim())
            ? EzString.encodeHtml(notes.trim())
            : EzString.encodeHtml('Break');

        let addBreakJsonPayload = EzJson.toJson(
            EzTimeAddEditDialogView.ezInstance.ezTimeAddEditDialogViewConfiguration.ezCreateAddBreakTimeEntryRequest(
                EzTimeAddEditDialogController.ezInstance.ezBuildDataTagMapsPayload()));

        return EzTimeAddEditDialogController.ezInstance.ezAddBreakOrTimeEntry(addBreakJsonPayload)
            .then(
                EzTimeAddEditDialogView.ezInstance.ezClose,
                (eResponse) => EzTimeAddEditDialogController.ezInstance.ezShowSubmitAddUpdateError(eResponse)
                    .then(EzPromise.ignoreResolve));
    }

    /**
     * @protected @method
     * Adds a new break or time entry (depending upon the provided timeEntryType) for the active employee
     * @param {string} addBreakOrTimeEntryJsonPayload
     * JSON payload for the service (as a string)
     * @returns {Promise}
     * Promise.resolve contains the added break or time entry entity.
     * Promise.reject contains the service error response object.
     */
    ezAddBreakOrTimeEntry(addBreakOrTimeEntryJsonPayload) {
        if (!EzString.hasLength(addBreakOrTimeEntryJsonPayload)) {
            throw new EzBadParamException(
                'addBreakOrTimeEntryJsonPayload',
                EzTimeAddEditDialogController.ezInstance,
                EzTimeAddEditDialogController.ezInstance.ezAddBreakOrTimeEntry);
        }

        return ezApi.ezclocker.ezUi.ezStartPageWaitPromise(
            EzTimeAddEditDialogController.ezInstance.ezGenerateWaitSpinnerSubmitMessage(),
            (waitDone, resolve, reject) => ezApi.ezclocker.ezHttpHelper.ezPost(
                ezApi.ezclocker.ezNavigation.ezGetInternalApiUrl('timeentry', 'v2'),
                addBreakOrTimeEntryJsonPayload)
                .then(
                    ezApi.ezclocker.ezHttpHelper.ezProcessApiResolve,
                    ezApi.ezclocker.ezHttpHelper.ezProcessApiReject)
                .then(
                    (response) => ezApi.ezclocker.ezSpinner.ezWaitDoneResolve(
                        waitDone,
                        () => {
                            EzTimeAddEditDialogView.ezInstance.ezTimeAddEditDialogViewConfiguration.ezAddingTimeEntry =
                                response.timeEntry;

                            EzTimeAddEditDialogController.ezInstance.ezOnTimeEntryDialogTimeEntryAdded();

                            return resolve(
                                EzTimeAddEditDialogView.ezInstance.ezTimeAddEditDialogViewConfiguration.ezAddingTimeEntry);
                        }),
                    (eResponse) => ezApi.ezclocker.ezSpinner.ezWaitDoneReject(waitDone, reject, eResponse)));
    }

    /**
     * @protected @method
     * Handles the EzTimeAddEditDialogView's onSubmitUpdate event and calls the api to update the modified time entry or break.
     * @param {object} ezEvent
     */
    ezHandleEzTimeEditDialogViewOnSubmitUpdateEvent(ezEvent) {
        if (!EzObject.isValid(ezEvent)) {
            throw new EzBadParamException(
                'ezEvent',
                EzTimeAddEditDialogController.ezInstance,
                EzTimeAddEditDialogController.ezInstance.ezHandleEzTimeEditDialogViewOnSubmitUpdateEvent);
        }
        if (!EzObject.isValid(ezEvent.data)) {
            throw new EzBadParamException(
                'ezEvent.data',
                EzTimeAddEditDialogController.ezInstance,
                EzTimeAddEditDialogController.ezInstance.ezHandleEzTimeEditDialogViewOnSubmitUpdateEvent);
        }

        let ezEventData = ezEvent.data;

        EzTimeAddEditDialogController.ezInstance.ezLogAmplitudeEvent(EzTimeAddEditDialogController.ezInstance.ezGenerateSubmitTimeAmplitudeLogEvent());

        switch (EzTimeAddEditDialogView.ezInstance.ezTimeAddEditDialogMode) {
            case EzTimeAddEditDialogMode.UPDATE_TIME_ENTRY:
            case EzTimeAddEditDialogMode.UPDATE_ACTIVE_TIME_ENTRY:
                return EzTimeAddEditDialogController.ezInstance.ezUpdateTimeEntry(
                    ezEventData.clockInMoment,
                    ezEventData.clockOutMoment,
                    EzString.stringOrEmpty(ezEventData.notes))
                    .then(
                        EzTimeAddEditDialogView.ezInstance.ezClose,
                        (eResponse) => EzTimeAddEditDialogController.ezInstance.ezShowSubmitAddUpdateError(eResponse)
                            .then(EzPromise.ignoreResolve));
            case EzTimeAddEditDialogMode.UPDATE_BREAK:
            case EzTimeAddEditDialogMode.UPDATE_ACTIVE_BREAK:
                return EzTimeAddEditDialogController.ezInstance.ezUpdateBreak(
                    ezEventData.clockInMoment,
                    ezEventData.clockOutMoment,
                    EzString.stringOrEmpty(ezEventData.notes))
                    .then(
                        EzTimeAddEditDialogView.ezInstance.ezClose,
                        (eResponse) => EzTimeAddEditDialogController.ezInstance.ezShowSubmitAddUpdateError(eResponse)
                            .then(EzPromise.ignoreResolve));
            default:
                throw new EzException(
                    EzString.em`
                        Handler for EzTimeAddEditDialogView onSubmitUpdate event is unable to continue due to
                        an incompatable EzTimeAddEditDialogMode of
                        ${EzTimeAddEditDialogView.ezInstance.ezTimeAddEditDialogMode}`);
        }
    }

    /**
     * @protected @method
     * Updates an existing time entry with the provided data.
     * @param {moment} clockInMoment
     * @param {moment} clockOutMoment
     * @param {string} notes
     * @returns {Promise}
     * Promise.resolve returns the updated break or time entry entity
     * Promise.reject returns the service response error.
     */
    ezUpdateTimeEntry(clockInMoment, clockOutMoment, notes) {
        if (!EzObject.isValid(clockInMoment)) {
            throw new EzBadParamException(
                'clockInMoment',
                EzTimeAddEditDialogController.ezInstance,
                EzTimeAddEditDialogController.ezInstance.ezUpdateTimeEntry);
        }
        if (!EzObject.isValid(clockOutMoment)) {
            throw new EzBadParamException(
                'clockOutMoment',
                EzTimeAddEditDialogController.ezInstance,
                EzTimeAddEditDialogController.ezInstance.ezUpdateTimeEntry);
        }
        if (!EzString.hasLength(notes)) {
            notes = EzString.EMPTY;
        }

        let updatingTimeEntry = EzTimeAddEditDialogView.ezInstance.ezTimeAddEditDialogViewConfiguration.ezTimeEntry;

        if (!EzObject.isValid(updatingTimeEntry)) {
            throw new EzException(
                EzString.em`
                    Unable to update the time entry due to the following error:
                    The time data from the time editor dialog is null.`);
        }

        updatingTimeEntry.clockInIso = ezApi.ezclocker.ezDateTime.ezToIso(clockInMoment);

        updatingTimeEntry.clockOutIso = ezApi.ezclocker.ezDateTime.ezToIso(clockOutMoment);

        updatingTimeEntry.notes = EzString.encodeHtml(notes);

        return EzTimeAddEditDialogController.ezInstance.ezUpdateBreakOrTimeEntry(
            updatingTimeEntry.id,
            EzJson.toJson(
                EzTimeAddEditDialogView.ezInstance.ezTimeAddEditDialogViewConfiguration.ezCreateUpdateTimeEntryRequest(
                    EzTimeAddEditDialogController.ezInstance.ezBuildDataTagMapsPayload())));
    }

    /**
     * @public @method
     * Updates an existing break with the provided data.
     * @param {moment} clockInMoment
     * @param {moment} clockOutMoment
     * @param {string} notes
     * @returns {Promise}
     * Promise.resolve returns the updated break or time entry entity
     * Promise.reject returns the service response error.
     */
    ezUpdateBreak(clockInMoment, clockOutMoment, notes) {
        if (!EzObject.isValid(clockInMoment)) {
            throw new EzBadParamException(
                'clockInMoment',
                EzTimeAddEditDialogController.ezInstance,
                EzTimeAddEditDialogController.ezInstance.ezUpdateBreak);
        }
        if (!EzObject.isValid(clockOutMoment)) {
            throw new EzBadParamException(
                'clockOutMoment',
                EzTimeAddEditDialogController.ezInstance,
                EzTimeAddEditDialogController.ezInstance.ezUpdateBreak);
        }
        if (!EzString.hasLength(notes)) {
            notes = EzString.EMPTY;
        }

        let updatingBreak = EzTimeAddEditDialogView.ezInstance.ezTimeAddEditDialogViewConfiguration.ezTimeEntry;

        if (!EzObject.isValid(updatingBreak)) {
            throw new EzException(
                EzString.em`
                    Unable to update the break due to the folowing error:
                    The time data from the time editor dialog is null.`);
        }

        updatingBreak.clockInIso = ezApi.ezclocker.ezDateTime.ezToIso(clockInMoment);

        updatingBreak.clockOutIso = ezApi.ezclocker.ezDateTime.ezToIso(clockOutMoment);

        updatingBreak.notes = EzString.encodeHtml(notes);

        return EzTimeAddEditDialogController.ezInstance.ezUpdateBreakOrTimeEntry(
            updatingBreak.id,
            EzJson.toJson(
                EzTimeAddEditDialogView.ezInstance.ezTimeAddEditDialogViewConfiguration.ezCreateUpdateBreakTimeEntryRequest(
                    EzTimeAddEditDialogController.ezInstance.ezBuildDataTagMapsPayload())));
    }

    /**
     * @protected @method
     * Updates the edited time entry
     * @param {number} breakOrTimeEntryId
     * @param {string} updateBreakOrTimeEntryJsonPayload
     * JSON payload string
     * @returns {Promise}
     * Promise.resolve returns the updated break or time entry entity
     * Promise.reject returns the service response error.
     */
    ezUpdateBreakOrTimeEntry(breakOrTimeEntryId, updateBreakOrTimeEntryJsonPayload) {
        if (!EzNumber.isNumber(breakOrTimeEntryId)) {
            throw new EzBadParamException(
                'breakOrTimeEntryId',
                EzTimeAddEditDialogController.ezInstance,
                EzTimeAddEditDialogController.ezInstance.ezUpdateBreakOrTimeEntry);
        }
        if (!EzString.hasLength(updateBreakOrTimeEntryJsonPayload)) {
            throw new EzBadParamException(
                'updateBreakOrTimeEntryJsonPayload',
                EzTimeAddEditDialogController.ezInstance,
                EzTimeAddEditDialogController.ezInstance.ezUpdateBreakOrTimeEntry);
        }

        // Report if the wrong dialog mode is being used for updating a time entry
        if (EzTimeAddEditDialogMode.UPDATE_TIME_ENTRY !== EzTimeAddEditDialogView.ezInstance.ezTimeAddEditDialogMode &&
            EzTimeAddEditDialogMode.UPDATE_ACTIVE_TIME_ENTRY !== EzTimeAddEditDialogView.ezInstance.ezTimeAddEditDialogMode &&
            EzTimeAddEditDialogMode.UPDATE_BREAK !== EzTimeAddEditDialogView.ezInstance.ezTimeAddEditDialogMode &&
            EzTimeAddEditDialogMode.UPDATE_ACTIVE_BREAK !== EzTimeAddEditDialogView.ezInstance.ezTimeAddEditDialogMode) {
            ezApi.ezclocker.ezLogger.warn(
                `Submitting UPDATE time for dialog mode ${EzTimeAddEditDialogView.ezInstance.ezTimeAddEditDialogMode}`);
        }

        return ezApi.ezclocker.ezUi.ezStartPageWaitPromise(
            EzTimeAddEditDialogController.ezInstance.ezGenerateWaitSpinnerSubmitMessage(),
            (waitDone, resolve, reject) => ezApi.ezclocker.ezHttpHelper.ezPut(
                ezApi.ezclocker.ezNavigation.ezGetInternalApiUrl(`timeentry/${breakOrTimeEntryId}`, 'v2'),
                updateBreakOrTimeEntryJsonPayload)
                .then(
                    ezApi.ezclocker.ezHttpHelper.ezProcessApiResolve,
                    ezApi.ezclocker.ezHttpHelper.ezProcessApiReject)
                .then(
                    (response) => {
                        EzTimeAddEditDialogView.ezInstance.ezTimeAddEditDialogViewConfiguration.ezEditingTimeEntry =
                            response.timeEntry;

                        EzTimeAddEditDialogController.ezInstance.ezOnTimeEntryDialogTimeEntryUpdated();

                        return ezApi.ezclocker.ezSpinner.ezWaitDoneResolve(
                            waitDone,
                            resolve,
                            [EzTimeAddEditDialogView.ezInstance.ezTimeAddEditDialogViewConfiguration.ezEditingTimeEntry]);
                    },
                    (eResponse) => ezApi.ezclocker.ezSpinner.ezWaitDoneReject(waitDone, reject, [eResponse])));
    }

    /**
     * @protected @method
     * Shows errors from add time entry API
     * @param {object} eResponse
     * ezClocker error response object
     * @param {string} additionalMsg
     * Any additional string message to append to the error log.
     * @returns
     */
    ezShowSubmitAddUpdateError(eResponse, additionalMsg) {
        let aTimeEntry = EzTimeAddEditDialogView.ezInstance.ezTimeAddEditDialogViewConfiguration.ezTimeEntry;

        if (!EzObject.isValid(aTimeEntry)) {
            aTimeEntry.id = 'UNKNOWN';
        }

        let aEmployee = ezApi.ezclocker.ezClockerContext.ezGetActiveEmployee();

        if (!EzObject.isValid(aEmployee)) {
            aEmployee.id = 'UNKNOWN';

            aEmployee.employeeName = 'UNKNOWN';
        }

        let dueToError = EzObject.isValid(eResponse) && EzString.hasLength(eResponse.message)
            ? ` due to error: ${eResponse.message}.`
            : ' at this time.';

        let title = 'Save Time Data Error';

        let errorLogMsg = 'Failed to save the time data';

        let userMsg = 'Unable to save the time data';

        let isPersonalEmployee = EzBoolean.isTrue(ezApi.ezclocker.ezClockerContext.ezGetActiveEmployee.individualAccount);

        let employeeOrPersonal = !isPersonalEmployee
            ? `for employee ${ezApi.ezclocker.ezClockerContext.ezGetActiveEmployee().employeeName}`
            : EzString.EMPTY;

        let forEmployeeNameAndId = !isPersonalEmployee
            ? `for employee ${aEmployee.employeeName} (employeeId=${aEmployee.id})`
            : `for personal user ${aEmployee.employeeName} (personalId=${aEmployee.id})`;

        switch (EzTimeAddEditDialogView.ezInstance.ezTimeAddEditDialogMode) {
            case EzTimeEntryType.ADD_TIME_ENTRY:
                title = 'Add Time Entry Error';

                userMsg = `Unable to add a time entry ${employeeOrPersonal}`;

                errorLogMsg = `Failed to add the new time entry ${forEmployeeNameAndId}.`;

                break;
            case EzTimeEntryType.UPDATE_TIME_ENTRY:
                title = 'Update Time Entry Error';

                userMsg = `Unable to update the time entry ${employeeOrPersonal}`;

                errorLogMsg = `Failed to update the time entry (timeEntryId=${aTimeEntry.id}) ${forEmployeeNameAndId}.`;

                break;
            case EzTimeEntryType.UPDATE_ACTIVE_TIME_ENTRY:
                title = 'Update Active Time Entry Error';

                userMsg = `Unable to update the active time entry ${employeeOrPersonal}`;

                errorLogMsg = `Failed to update the active time entry (timeEntryId=${aTimeEntry.id}) ${forEmployeeNameAndId}.`;

                break;
            case EzTimeEntryType.ADD_BREAK:
                title = 'Add Break Error';

                userMsg = `Unable to add a break ${employeeOrPersonal}`;

                errorLogMsg = `Failed to add the new break ${forEmployeeNameAndId}.`;

                break;
            case EzTimeEntryType.UPDATE_BREAK:
                title = 'Update Break Error';

                userMsg = `Unable to update the break for employee ${aEmployee.employeeName}`;

                errorLogMsg = `Failed to update the break (breakId=${aTimeEntry.id}) ${forEmployeeNameAndId}.`;

                break;
            case EzTimeEntryType.UPDATE_ACTIVE_BREAK:
                title = 'Update Active Break Error';

                userMsg = `Unable to update the active break for employee ${aEmployee.employeeName}`;

                errorLogMsg = `Failed to update the active break (breakId=${aTimeEntry.id}) ${forEmployeeNameAndId}.`;

                break;
            default:
                errorLogMsg = EzString.em`${errorLogMsg} (id=${aTimeEntry.id}) ${forEmployeeNameAndId}.`;
        }

        return ezApi.ezclocker.ezDialog.ezShowServiceResponseErrorDialog(
            // errorTitle
            title,
            // errorMessage
            `${userMsg} ${dueToError}`,
            // Error response object
            eResponse,
            // additionalDetails
            `${errorLogMsg} ${EzString.stringOrEmpty(additionalMsg)}`);
    }

    /**
     * @protected @method
     * Builds the DataTagMaps property of the API payloads
     * @returns {null|array}
     */
    ezBuildDataTagMapsPayload() {
        let dataTagMapsPayload = [];

        let selectedJobId = parseInt(
            ezApi.ezclocker.ezUi.ezGetInputValue(
                EzTimeAddEditDialogView.ezInstance.ezIds.inputs.ezJobSelectInputId));

        let timeEntry = EzTimeAddEditDialogView.ezInstance.ezTimeAddEditDialogViewConfiguration.ezTimeEntry;

        if (EzNumber.isNumber(selectedJobId) && !EzNumber.isNAN(selectedJobId) && -1 !== selectedJobId) {
            let dataTagMap = new EzDataTagMap(
                // id
                null,
                // employerId
                ezApi.ezclocker.ezClockerContext.ezGetActiveEmployer().id,
                // dataTagId
                selectedJobId,
                // assignedEzEntityTypeName
                EzEntityType.TIME_ENTRY,
                // assignedEzEntityId
                ezApi.ezclocker.ezClockerContext.ezGetActiveEmployee().id,
                // assignedToAllEntities
                false,
                // level
                0,
                false);

            dataTagMapsPayload.push(dataTagMap);
        } else if (EzObject.isValid(timeEntry) && EzArray.hasLength(timeEntry.jobMappings)) {
            // Only one DataTagMap per time-entry supported right now.
            let updatedDataTagMap = EzDataTagMap.asEzDataTagMap(timeEntry.jobMappings[0]);

            updatedDataTagMap.remove = true;

            dataTagMapsPayload.push(updatedDataTagMap);
        }

        return EzArray.hasLength(dataTagMapsPayload)
            ? dataTagMapsPayload
            : null;
    }

    /**
     * @protected @method
     * Generates the submit wait spinner's message based upon the EzTimeAddEditDialogMode
     * @returns {string}
     */
    ezGenerateWaitSpinnerSubmitMessage() {
        let employeeOrPersonal = EzBoolean.isFalse(ezApi.ezclocker.ezClockerContext.ezGetActiveEmployee.individualAccount)
            ? ` for employee ${ezApi.ezclocker.ezClockerContext.ezGetActiveEmployee().employeeName}`
            : EzString.EMPTY;

        switch (EzTimeAddEditDialogView.ezInstance.ezTimeAddEditDialogMode) {
            case EzTimeEntryType.ADD_TIME_ENTRY:
                return `Adding the new time entry${employeeOrPersonal} ...`;
            case EzTimeEntryType.UPDATE_TIME_ENTRY:
                return `Updating time entry${employeeOrPersonal} ...`;
            case EzTimeEntryType.UPDATE_ACTIVE_TIME_ENTRY:
                return `Updating the active clock in${employeeOrPersonal} ...`;
            case EzTimeEntryType.ADD_BREAK:
                return `Adding new break${employeeOrPersonal} ...`;
            case EzTimeEntryType.UPDATE_BREAK:
                return `Updating break${employeeOrPersonal} ...`;
            case EzTimeEntryType.UPDATE_ACTIVE_BREAK:
                return `Updating the active break${employeeOrPersonal} ...`;
            default:
                return `Saving time${employeeOrPersonal} ...`;
        }
    }

    /**
     * @protected @method
     * Generates the Amplitude log message for Submit time based upon the EzTimeAddEditDialogMode
     * @returns {string}
     */
    ezGenerateSubmitTimeAmplitudeLogEvent() {
        let ezTimeAddEditDialogMode = EzTimeAddEditDialogView.ezInstance.ezTimeAddEditDialogMode;

        switch (ezTimeAddEditDialogMode) {
            case EzTimeEntryType.ADD_TIME_ENTRY:
                return EzString.msg`
                    Adding new time
                    (EzTimeAddEditDialogMode=${ezTimeAddEditDialogMode})`;
            case EzTimeEntryType.UPDATE_TIME_ENTRY:
                return EzString.msg`
                    Updating time entry
                    (EzTimeAddEditDialogMode=${ezTimeAddEditDialogMode})`;
            case EzTimeEntryType.UPDATE_ACTIVE_TIME_ENTRY:
                return EzString.msg`
                    Updating the active clock in
                    (EzTimeAddEditDialogMode=${ezTimeAddEditDialogMode})`;
            case EzTimeEntryType.ADD_BREAK:
                return EzString.msg`
                    Adding new break
                    (EzTimeAddEditDialogMode=${ezTimeAddEditDialogMode})`;
            case EzTimeEntryType.UPDATE_BREAK:
                return EzString.msg`
                    Updating existing break
                    (EzTimeAddEditDialogMode=${ezTimeAddEditDialogMode})`;
            case EzTimeEntryType.UPDATE_ACTIVE_BREAK:
                return EzString.msg`
                    Updating the active break
                    (EzTimeAddEditDialogMode=${ezTimeAddEditDialogMode})`;
            default:
                return EzString.msg`
                    Saving time data
                    (EzTimeAddEditDialogMode=${ezTimeAddEditDialogMode})`;
        }
    }

    /**
     * @protected @method
     * Logs an amplitude event if amplitude is available and the event name is not null or empty.
     * @param {string} eventName
     */
    ezLogAmplitudeEvent(eventName) {
        if (EzString.hasLength(eventName)) {
            ezApi.ezclocker.ezAnalyticsAndMetrics.ezAmplitudeIntegration.ezTrack(eventName);
        }
    }

    /**
     * @public @static @readonly @property
     * Gets the name of this class's singleton instance when registered with ezApi.
     * @returns {string}
     */
    static get ezApiName() {
        return 'ezTimeAddEditDialogController';
    }

    /**
     * @public @static @readonly @property
     * Gets an object of event names that this class may trigger.
     * @returns {object}
     */
    static get ezEventNames() {
        return {
            onReady: 'ezOn_EzTimeAddEditDialog_Ready',
            onTimeEntryDialogShow: 'ezOn_EzTimeAddEditDialog_Show',
            onTimeEntryDialogClosed: 'ezOn_EzTimeAddEditDialog_Closed',
            onTimeEntryDialogCanceled: 'ezOn_EzTimeAddEditDialog_Cancled',
            onTimeEntryDialogTimeEntryAdded: 'ezOn_EzTimeAddEditDialog_TimeEntry_Added',
            onTimeEntryDialogTimeEntryUpdated: 'ezOn_EzTimeAddEditDialog_TimeEntry_Updated'
        };
    }

    /**
     * @static
     * @private @field
     * Stores the singleton instance of this class that was created by and registerd with EzApi.
     * @type {EzTimeAddEditDialogController}
     */
    static #ezInstance = globalThis?.ezApi?.ready && globalThis.ezApi?.ezclocker?.[EzTimeAddEditDialogController.ezApiName]
        ? globalThis.ezApi.ezclocker[EzTimeAddEditDialogController.ezApiName]
        : null;
    /**
     * @static
     * @public @property @getter
     * Gets the singleton instance of this class that is registered with EzApi (if available yet)
     * @returns {EzTimeAddEditDialogController}
     */
    static get ezInstance() {
        return EzTimeAddEditDialogController.#ezInstance;
    }
    /**
     * @static
     * @public @property @setter
     * Sets the singleton instance of of this class that is registered with EzApi.
     * @param {EzTimeAddEditDialogController} instance
     */
    static set ezInstance(instance) {
        if (null != EzTimeAddEditDialogController.#ezInstance) {
            throw new Error('EzTimeAddEditDialogController\'s singleton instance is already reigstered with EzApi.');
        }

        EzTimeAddEditDialogController.#ezInstance = instance;
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
    static #ezApiRegistrationState = globalThis?.ezApi?.ready && globalThis.ezApi?.ezclocker?.[EzTimeAddEditDialogController.ezApiName]
        ? EzRegistrationState.REGISTERED
        : null;
    /**
     * @static
     * @public @property @getter
     * Gets the ezApi registration state of this classes's singleton instance.
     * @returns {string}
     * A valid enum property value from EzRegistrationState
     */
    static get ezApiRegistrationState() {
        return EzTimeAddEditDialogController.#ezApiRegistrationState;
    }
    /**
     * @static
     * @public @property @setter
     * Sets the ezApi registration state of this classes's singleton instance.
     * @param {string} ezApiRegistrationState
     * A valid enum property value from EzRegistrationState
     */
    static set ezApiRegistrationState(ezApiRegistrationState) {
        EzTimeAddEditDialogController.#ezApiRegistrationState = EzRegistrationState.ezValueOf(ezApiRegistrationState);
    }

    /**
     * @static
     * @private @readonly @property
     * Gets true when all required dependencies for this class report ready.
     * In otherwords, the require dependency's singleton instance is created
     * and is registered with and accessable from EzApi with ezApi.ezclocker.{dependency_name}.
     * @returns {boolean}
     */
    static get #ezCanRegister() {
        return EzRegistrationState.PENDING === EzTimeAddEditDialogController.ezApiRegistrationState &&
            globalThis?.ezApi?.ready && globalThis.ezApi?.ezclocker &&
            globalThis.ezApi.ezclocker?.[EzEventEngine.ezApiName]?.ready &&
            globalThis.ezApi.ezclocker?.[EzClockerContext.ezApiName]?.ready &&
            globalThis.ezApi.ezclocker?.[EzDateTime.ezApiName]?.ready &&
            globalThis.ezApi.ezclocker?.[EzDataTagService.ezApiName]?.ready &&
            globalThis.ezApi.ezclocker?.[EzUI.ezApiName]?.ready &&
            globalThis.ezApi.ezclocker?.[EzDialog.ezApiName]?.ready &&
            globalThis.ezApi.ezclocker?.[EzValidation.ezApiName]?.ready &&
            globalThis.ezApi.ezclocker?.[EzTimeAddEditDialogView.ezApiName]?.ready &&
            globalThis.ezApi.ezclocker?.[EzAnalyticsAndMetrics.ezApiName]?.ready;
    }

    /**
     * @private @static @readonly @property
     * Gets if this class's singleton instance is registered with ezApi yet.
     * @returns {boolean}
     */
    static get #ezIsRegistered() {
        return null != EzTimeAddEditDialogController.ezInstance &&
            EzRegistrationState.REGISTERED === EzTimeAddEditDialogController.ezApiRegistrationState;
    }

    /**
     * @private @static @method
     * Attempts to register the singleton instance for this class with ezApi. Returns true
     * if successful, false otherwise.
     * @returns {boolean}
     */
    static #ezRegistrator() {
        if (EzTimeAddEditDialogController.#ezCanRegister && !EzTimeAddEditDialogController.#ezIsRegistered) {
            globalThis.ezApi.ezRegisterNewApi(EzTimeAddEditDialogController, EzTimeAddEditDialogController.ezApiName);
        }

        return EzRegistrationState.REGISTERED === EzTimeAddEditDialogController.ezApiRegistrationState;
    }

    /**
     * @static
     * Static Initializer
     */
    static {
        if (null == EzTimeAddEditDialogController.ezApiRegistrationState) {
            EzTimeAddEditDialogController.ezApiRegistrationState = EzRegistrationState.PENDING;

            if (!EzTimeAddEditDialogController.#ezRegistrator()) {
                document.addEventListener(
                    EzClass.ezOnEzApiReadyEventName,
                    EzTimeAddEditDialogController.#ezRegistrator);

                document.addEventListener(
                    EzDateTime.ezEventNames.onReady,
                    EzTimeAddEditDialogController.#ezRegistrator);

                document.addEventListener(
                    EzEventEngine.ezEventNames.onReady,
                    EzTimeAddEditDialogController.#ezRegistrator);

                document.addEventListener(
                    EzClockerContext.ezEventNames.onReady,
                    EzTimeAddEditDialogController.#ezRegistrator);

                document.addEventListener(
                    EzDataTagService.ezEventNames.onReady,
                    EzTimeAddEditDialogController.#ezRegistrator);

                document.addEventListener(
                    EzUI.ezEventNames.onReady,
                    EzTimeAddEditDialogController.#ezRegistrator);

                document.addEventListener(
                    EzDialog.ezEventNames.onReady,
                    EzTimeAddEditDialogController.#ezRegistrator);

                document.addEventListener(
                    EzValidation.ezEventNames.onReady,
                    EzTimeAddEditDialogController.#ezRegistrator);

                document.addEventListener(
                    EzTimeAddEditDialogView.ezEventNames.onReady,
                    EzTimeAddEditDialogController.#ezRegistrator);

                document.addEventListener(
                    EzAnalyticsAndMetrics.ezEventNames.onReady,
                    EzTimeAddEditDialogController.#ezRegistrator);
            }
        }
    }
}
