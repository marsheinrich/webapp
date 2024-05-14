/**
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 * @module /secure/widgets/EzJobCodeDialog/ez-jobcode-dialog.js
 * @summary EzClocker Job Code Management Dialog Module
 * @description
 * ---------------------------------------------------------------------------
 * Exported Classes:
 *     1) EzJobCodeDialog
 * ---------------------------------------------------------------------------
 * Import Statements:
 *     import { EzJobCodeDialog } from '/secure/widgets/EzJobCodeDialog/ez-jobcode-dialog.js';
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 */

import {
    EzException,
    EzBadParamException,
    EzBadStateException
} from '/ezlibrary/exceptions/EzExceptions.js';

import {
    EzObject,
    EzBoolean,
    EzNumber,
    EzString,
    EzArray,
    EzHtml,
    EzPromise
} from '/ezlibrary/helpers/EzHelpers.js';

import {
    EzRegistrationState,
    EzJobCodeFilterType,
    EzEntityType,
    EzDataTagType,
    EzElementEventName,
    EzClockerContextEventName
} from '/ezlibrary/enums/EzEnumerations.js';

import { EzClass } from '/ezlibrary/EzClass.js';
import { EzDateTime } from '/public/javascript/common/ez-date-time.js';

import { EzEventData } from '/ezlibrary/entities/EzEventData.js';
import { EzWantEventDef } from '/ezlibrary/events/EzWantEventDef.js';
import { EzWantElementEventDef } from '/ezlibrary/events/EzWantElementEventDef.js';
import { EzEventEngine } from '/ezlibrary/ez-event-engine.js';

import { EzClockerContext } from '/ezlibrary/EzClockerContext/ez-context.js';

import { EzDataTag } from '/ezlibrary/entities/EzDataTag.js';
import { EzDataTagMap } from '/ezlibrary/entities/EzDataTagMap.js';
import { EzDataTagService } from '/secure/javascript/services/ezclocker-datatag-service.js';
import { EzInternalDataTagMapApiClient } from '/secure/javascript/services/ezclocker-datatagmap-service.js';

import { EzUI } from '/public/javascript/common/ezui.js';

import { EzDialogConfig } from '/ezlibrary/ux/dialogs/EzDialogConfig.js';
import { EzDialog } from '/public/javascript/common/ezclocker-dialog-helper.js';

import { EzManageJobCodesDialogView } from '/secure/widgets/EzJobCodeDialog/EzManageJobCodesDialogView.js';
import {
    EzJobCodeAssignEmployeeDialogMode,
    EzJobCodeAssignEmployeeDialog
} from '/secure/widgets/EzJobCodeDialog/ez-jobcode-assign-employee-dialog.js';

/**
 * @class
 * @extends {EzClass}
 * @description
 * A controller & view class for ezClocker's Manage Job Codes dialog.
 * ---------------------------------------------------------------------------
 * Import with:
 *     import { EzJobCodeDialog } from '/secure/widgets/EzJobCodeDialog/ez-jobcode-dialog.js';
 * ---------------------------------------------------------------------------
 * Singleton instance ready for use when the below evaluates to true:
 *     globalThis.ezApi.ezclocker[EzJobCodeDialog.ezApiName] &&
 *     globalThis.ezApi.ezclocker[EzJobCodeDialog.ezApiName].ready
 * ---------------------------------------------------------------------------
 * Listen to onReady event:
 *     document.addEventListener(
 *         EzJobCodeDialog.ezEventNames.onReady,
 *         this.#ezRegistrator);
 * ---------------------------------------------------------------------------
 * Singleton Instance Reference:
 *     Inside this class...: EzJobCodeDialog.ezInstance
 *     Outside this class..: ezApi.ezclocker.ezJobCodeDialog
 * ---------------------------------------------------------------------------
 */
export class EzJobCodeDialog extends EzClass {
    /**
     * @static
     * @public @readonly @property
     * Returns the name of this class's singleton instance when registered with ezApi.
     * @returns {string}
     */
    static get ezApiName() {
        return 'ezJobCodeDialog';
    }

    /**
     * @static
     * @public @readonly @property
     * Returns an object of event names that this class may trigger.
     * @returns {object}
     */
    static get ezEventNames() {
        return {
            onReady: 'ezOn_EzJobCodeDialog_Ready',
            onDataTagDataTagMapsRefreshed: 'EzJobCodeDialog_DataTag_DataTagMaps_Refreshed',
            onActiveJobCodeModified: 'EzJobCodeDialog_ActiveJobCode_Modified',
            onActiveJobCodeSaveStarted: 'EzJobCodeDialog_ActiveJobCode_SaveStarted',
            onActiveJobCodeSaveError: 'EzJobCodeDialog_ActiveJobCode_SaveError',
            onActiveJobCodeDialogClosed: 'EzJobCodeDialog_Closed',
            onJobCodeDialogJobCodeArchived: 'ezOn_EzJobCodeDialog_JobCode_Archived',
            onJobCodeDialogJobCodeUnarchived: 'ezOn_EzJobCodeDialog_JobCode_Unarchived',
            onJobCodeDialogJobCodeDeleted: 'ezOn_EzJobCodeDialog_JobCode_Deleted',
        };
    }

    /**
     * @static
     * @private @field
     * Stores the singleton instance of this class that was created by and registerd with EzApi.
     * @type {EzJobCodeDialog}
     */
    static #ezInstance = globalThis?.ezApi?.ready && globalThis.ezApi.ezclocker?.[EzJobCodeDialog.ezApiName]
        ? globalThis.ezApi.ezclocker[EzJobCodeDialog.ezApiName]
        : null;

    /**
     * @static
     * @public @property @getter
     * Returns the singleton instance of this class that is registered with EzApi (if available yet)
     * @returns {EzJobCodeDialog}
     */
    static get ezInstance() {
        return EzJobCodeDialog.#ezInstance;
    }

    /**
     * @static
     * @public @property @setter
     * Sets the singleton instance of of this class that is registered with EzApi.
     * @param {EzJobCodeDialog} instance
     */
    static set ezInstance(instance) {
        if (null != EzJobCodeDialog.#ezInstance) {
            throw new Error('EzJobCodeDialog\'s singleton instance is already reigstered with EzApi.');
        }

        EzJobCodeDialog.#ezInstance = instance;
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
    static #ezApiRegistrationState = globalThis?.ezApi?.ready && globalThis.ezApi?.ezclocker?.[EzJobCodeDialog.ezApiName]
        ? globalThis.ezApi.ezclocker[EzJobCodeDialog.ezApiName]
        : null;

    /**
     * @static
     * @public @property @getter
     * Returns the ezApi registration state of this classes's singleton instance.
     * @returns {string}
     * A valid enum property value from EzRegistrationState
     */
    static get ezApiRegistrationState() {
        return EzJobCodeDialog.#ezApiRegistrationState;
    }

    /**
     * @static
     * @public @property @setter
     * Sets the ezApi registration state of this classes's singleton instance.
     * @param {string} ezApiRegistrationState
     * A valid enum property value from EzRegistrationState
     */
    static set ezApiRegistrationState(ezApiRegistrationState) {
        EzJobCodeDialog.#ezApiRegistrationState = EzRegistrationState.ezValueOf(ezApiRegistrationState);
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
        return EzRegistrationState.PENDING === EzJobCodeDialog.ezApiRegistrationState &&
            globalThis?.ezApi?.ready && globalThis.ezApi?.ezclocker &&
            globalThis.ezApi.ezclocker?.[EzEventEngine.ezApiName]?.ready &&
            globalThis.ezApi.ezclocker?.[EzDateTime.ezApiName]?.ready &&
            globalThis.ezApi.ezclocker?.[EzClockerContextEventName.ezApiName]?.ready &&
            globalThis.ezApi.ezclocker?.[EzClockerContext.ezApiName]?.ready &&
            globalThis.ezApi.ezclocker?.[EzDataTagService.ezApiName]?.ready &&
            globalThis.ezApi.ezclocker?.[EzInternalDataTagMapApiClient.ezApiName]?.ready &&
            globalThis.ezApi.ezclocker?.[EzUI.ezApiName]?.ready &&
            globalThis.ezApi.ezclocker?.[EzDialog.ezApiName]?.ready &&
            EzManageJobCodesDialogView?.ezIsReady &&
            globalThis.ezApi.ezclocker?.[EzJobCodeAssignEmployeeDialog.ezApiName]?.ready;
    }

    /**
     * @static
     * @private @readonly @property
     * Returns if this class's singleton instance is registered with ezApi yet.
     * @returns {boolean}
     */
    static get #ezIsRegistered() {
        return null != EzJobCodeDialog.ezInstance &&
            EzRegistrationState.REGISTERED === EzJobCodeDialog.ezApiRegistrationState;
    }

    /**
     * @static
     * @private @method
     * Attempts to register the singleton instance for this class with ezApi. Returns true
     * if successful, false otherwise.
     * @returns {boolean}
     */
    static #ezRegistrator() {
        if (EzJobCodeDialog.#ezCanRegister && !EzJobCodeDialog.#ezIsRegistered) {
            globalThis.ezApi.ezRegisterNewApi(EzJobCodeDialog, EzJobCodeDialog.ezApiName);
        }

        return EzJobCodeDialog.#ezIsRegistered;
    }

    /**
     * @static
     * Static Initialization
     * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
     * >> IMPORTANT <<
     * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
     * Make sure the following properties and methods get defined BEFORE this static initialization section:
     *      1) Property getter EzJobCodeDialog.ezApiName
     *      2) Property getter EzJobCodeDialog.ezEventNames
     *      3) Property getter EzJobCodeDialog.ezInstance
     *      4) Property setter EzJobCodeDialog.ezInstance
     *      5) Property getter EzJobCodeDialog.ezApiRegistrationState
     *      6) Property setter EzJobCodeDialog.ezApiRegistrationState
     *      7) Property getter EzJobCodeDialog.#ezCanRegister
     *      8) Property getter EzJobCodeDialog.#ezIsRegistered
     *      9) Method EzJobCodeDialog.#ezRegistrator()
     */
    static {
        if (!EzJobCodeDialog.#ezIsRegistered) {
            EzJobCodeDialog.ezApiRegistrationState = EzRegistrationState.PENDING;

            if (!EzJobCodeDialog.#ezRegistrator()) {
                document.addEventListener(
                    EzJobCodeDialog.ezOnEzApiReadyEventName,
                    EzJobCodeDialog.#ezRegistrator);

                document.addEventListener(
                    EzClockerContextEventName.ezEventNames.onReady,
                    EzJobCodeDialog.#ezRegistrator);

                document.addEventListener(
                    EzClockerContext.ezEventNames.onReady,
                    EzJobCodeDialog.#ezRegistrator);

                document.addEventListener(
                    EzDataTagService.ezEventNames.onReady,
                    EzJobCodeDialog.#ezRegistrator);

                document.addEventListener(
                    EzInternalDataTagMapApiClient.ezEventNames.onReady,
                    EzJobCodeDialog.#ezRegistrator);

                document.addEventListener(
                    EzUI.ezEventNames.onReady,
                    EzJobCodeDialog.#ezRegistrator);

                document.addEventListener(
                    EzDialog.ezEventNames.onReady,
                    EzJobCodeDialog.#ezRegistrator);

                document.addEventListener(
                    EzManageJobCodesDialogView.ezEventNames.onReady,
                    EzJobCodeDialog.#ezRegistrator);

                document.addEventListener(
                    EzJobCodeAssignEmployeeDialog.ezEventNames.onReady,
                    EzJobCodeDialog.#ezRegistrator);
            }
        }
    }

    /**
     * @public @constructor
     * >> DO NOT CREATE NEW INSTANCES OUTSIDE OF THE STATIC INITIALIZATION FLOW <<
     * Use the static singleton instance available from ezApi: ezApi.ezclocker.ezJobCodeDialog.
     */
    constructor() {
        super();
    }

    /**
     * @private @field
     * Stores the EzManageJobCodeDialgoView instance.
     * @type {EzManageJobCodesDialogView}
     */
    #ezManageJobCodesDialogView = null;
    /**
     * @public @readonly @proeprty
     * Get the EzManageJobCodeDialgoView instance.
     * @returns {EzManageJobCodesDialogView}
     */
    get ezManageJobCodesDialogView() {
        return this.#ezManageJobCodesDialogView;
    }

    /**
     * @private @field
     * Stores if a job code (DataTag) is currently persisting to the DB or not.
     * @type {Boolean}
     */
    #ezSavingJobCode = false;
    /**
     * @public
     * @property @getter
     * @description
     * Gets if a job code is currently persisting to the DB or not.
     * @returns {Boolean}
     */
    get ezSavingJobCode() {
        return this.#ezSavingJobCode;
    }
    /**
     * @public @property @getter
     * Sets if a job code is currently persisting to the DB or not.
     * @returns {Boolean}
     */
    set ezSavingJobCode(ezSavingJobCode) {
        this.#ezSavingJobCode = EzBoolean.isTrue(ezSavingJobCode);
    }

    /**
     * @private @field
     * Stores if the UX's current state will display any Jobs (DataTags).
     * @type {Boolean}
     */
    #ezHasVisibleJobs = false;
    /**
     * @public @property @getter
     * Gets if the UX's current state will display any Jobs (DataTags).
     * @returns {Boolean}
     */
    get ezHasVisibleJobs() {
        return this.#ezHasVisibleJobs;
    }
    /**
     * @public @property @setter
     * Sets if the UX's current state will display any Jobs (DataTags).
     * @param {Boolean}
     */
    set ezHasVisibleJobs(ezHasVisibleJobs) {
        this.#ezHasVisibleJobs = EzBoolean.isTrue(ezHasVisibleJobs);
    }

    /**
     * @private @field
     * Stores if the EzJobCodeDialog is currently loading or not.
     * @type {Boolean}
     */
    #ezDialogLoading = false;
    /**
     * @public @property @getter
     * Gets if the EzJobCodeDialog is currently loading or not.
     * @returns {Boolean}
     */
    get ezDialogLoading() {
        return this.#ezDialogLoading;
    }
    /**
     * @public @property @setter
     * Sets if the EzJobCodeDialog is currently loading or not.
     * @param {Boolean} ezDialogLoading
     */
    set ezDialogLoading(ezDialogLoading) {
        this.#ezDialogLoading = EzBoolean.isTrue(ezDialogLoading);
    }

    /**
     * @private @field
     * Stores if the currently active job code is modified or not.
     * @type {Boolean}
     */
    #ezActiveJobCodeModified = false;
    /**
     * @public @property @getter
     * Gets if the currently active job code is modified or not.
     * @returns {Boolean}
     */
    get ezActiveJobCodeModified() {
        return this.#ezActiveJobCodeModified;
    }
    /**
     * @public @property @setter
     * Sets the if the currently active job code is modified or not.
     * @param {Boolean} ezActiveJobCodeModified
     */
    set ezActiveJobCodeModified(ezActiveJobCodeModified) {
        this.#ezActiveJobCodeModified = EzBoolean.isTrue(ezActiveJobCodeModified);
    }

    /**
     * @private @field
     * Stores if a validation error is visible or not.
     * @type {Boolean}
     */
    #ezValidationErrorVisible = false;
    /**
     * @public @property @getter
     * Gets if a validation error is visible or not.
     * @returns {Boolean}
     */
    get ezValidationErrorVisible() {
        return this.#ezValidationErrorVisible;
    }
    /**
     * @public @property @setter
     * Sets if a validation error is visible or not.
     * @param {Boolean} ezValidationErrorVisible
     */
    set ezValidationErrorVisible(ezValidationErrorVisible) {
        this.#ezValidationErrorVisible = EzBoolean.isTrue(ezValidationErrorVisible);
    }

    /**
     * @private @field
     * Stores if the dialog should close after a data persistance operation.
     * @type {Boolean}
     */
    #ezCloseAfterSaveComplete = false;
    /**
     * @public
     * @property @getter
     * @description
     * Gets if the dialog should close after a data persistance operation.
     * @returns {Boolean}
     */
    get ezCloseAfterSaveComplete() {
        return this.#ezCloseAfterSaveComplete;
    }
    /**
     * @public @property @getter
     * Sets if the dialog should close after a data persistance operation.
     * @param {Boolean} ezCloseAfterSaveComplete
     */
    set ezCloseAfterSaveComplete(ezCloseAfterSaveComplete) {
        this.#ezCloseAfterSaveComplete = EzBoolean.isTrue(ezCloseAfterSaveComplete);
    }

    /**
     * @private @field
     * Stores the array of available job codes for the employer.
     * @type {array}
     */
    #ezAvailableJobCodes = [];
    /**
     * @public @property @getter
     * Gets the array of available job codes for the employer.
     * @returns {Boolean}
     */
    get ezAvailableJobCodes() {
        return this.#ezAvailableJobCodes;
    }
    /**
     * @public @property @setter
     * Sets the array of available job codes for the employer.
     * @param {Boolean} ezAvailableJobCodes
     */
    set ezAvailableJobCodes(ezAvailableJobCodes) {
        this.#ezAvailableJobCodes = [];

        if (EzArray.arrayHasLength(ezAvailableJobCodes)) {
            ezAvailableJobCodes.forEach(
                (jobCode) => {
                    if (EzObject.isValid(jobCode)) {
                        this.#ezAvailableJobCodes.push(jobCode);
                    }
                });

            EzJobCodeDialog.ezInstance.ezIndexAvailableJobCodes();
        }
    }

    /**
     * @private @field
     * Stores the reference to the currently active/editing job code.
     * @type {object}
     */
    #ezActiveJobCode = null;
    /**
     * @public @property @getter
        Gets the reference to the currently active/editing job code.
     * @returns {object}
     */
    get ezActiveJobCode() {
        return this.#ezActiveJobCode;
    }
    /**
     * @public @property @setter
     * Sets the reference to the currently active/editing job code.
     * @param {undefined|null|object} ezActiveJobCode
     */
    set ezActiveJobCode(ezActiveJobCode) {
        this.#ezActiveJobCode = EzObject.assignOrNull(ezActiveJobCode);

        this.ezUpdateUxState().then(EzPromise.ignoreResolve);
    }
    /**
     * @public @method
     * Sets the active job code but does not call the ezUpdateUxState
     * @param {undefined|null|object} ezActiveJobCode
     */
    ezSilentSetActiveJobCode(ezActiveJobCode) {
        this.#ezActiveJobCode = EzObject.assignOrNull(ezActiveJobCode);
    }

    /**
     * @public @property @getter
        Gets the value in the HTML input element with id=EzJobCodeDialog.ezInstance.ezManageJobCodesDialogView.ezIds.inputs.hourlyRateInputPrefixIdA.
        If the element does not exist yet or the input's value is blank then '0.00' is returned.
     * @returns {String}
     */
    get ezHourlyRateAInputValue() {
        let inputId = `${EzJobCodeDialog.ezInstance.ezManageJobCodesDialogView.ezIds.inputs.hourlyRateInputPrefixId}A`;

        return ezApi.ezclocker.ezUi.ezElementExists(inputId)
            ? ezApi.ezclocker.ezUi.ezGetInputValue(inputId)
            : '0.00';
    }
    /**
     * @puvlic @property @getter
     * Sets the value of the HTML input element with id=EzJobCodeDialog.ezInstance.ezManageJobCodesDialogView.ezIds.inputs.hourlyRateInputPrefixIdA.
        If the provided ezHourlyRateInputValue is undefined, null, or empty then the value of '0.00' is set.
     * @param {undefined|null|String} ezHourlyRateInputValue
     */
    set ezHourlyRateAInputValue(ezHourlyRateAInputValue) {
        let inputId = `${EzJobCodeDialog.ezInstance.ezManageJobCodesDialogView.ezIds.inputs.hourlyRateInputPrefixId}A`;

        if (ezApi.ezclocker.ezUi.ezElementExists(inputId)) {
            ezApi.ezclocker.ezUi.ezSetInputValue(
                inputId,
                EzString.stringOrDefault(
                    ezHourlyRateAInputValue,
                    '0.00'));
        }
    }

    /**
     * @public @property @getter
        Gets the value in the HTML input element with id=EzJobCodeDialog.ezInstance.ezManageJobCodesDialogView.ezIds.inputs.hourlyRateInputPrefixIdB.
        If the element does not exist yet or the input's value is blank then '0.00' is returned.
     * @returns {String}
     */
    get ezHourlyRateBInputValue() {
        let inputId = `${EzJobCodeDialog.ezInstance.ezManageJobCodesDialogView.ezIds.inputs.hourlyRateInputPrefixId}B`;

        return ezApi.ezclocker.ezUi.ezElementExists(inputId)
            ? ezApi.ezclocker.ezUi.ezGetInputValue(inputId)
            : '0.00';
    }
    /**
     * @public @property @getter
     * Sets the value of the HTML input element with id=EzJobCodeDialog.ezInstance.ezManageJobCodesDialogView.ezIds.inputs.hourlyRateInputPrefixIdB.
        If the provided ezHourlyRateInputValue is undefined, null, or empty then the value of '0.00' is set.
     * @param {undefined|null|String} ezHourlyRateInputValue
     */
    set ezHourlyRateBInputValue(ezHourlyRateInputValue) {
        let inputId = `${EzJobCodeDialog.ezInstance.ezManageJobCodesDialogView.ezIds.inputs.hourlyRateInputPrefixId}B`;

        if (ezApi.ezclocker.ezUi.ezElementExists(inputId)) {
            ezApi.ezclocker.ezUi.ezSetInputValue(
                inputId,
                EzString.stringOrDefault(
                    ezHourlyRateInputValue,
                    '0.00'));
        }
    }

    /**
     * @public @property @getter
     * Gets the value in the HTML input element with id=EzJobCodeDialog.ezInstance.ezManageJobCodesDialogView.ezIds.inputs.hourlyRateInputId.
     * If the element does not exist yet or the input's value is blank then '0.00' is returned.
     * @returns {String}
     */
    get ezHourlyRateInputValue() {
        let hourlyRateInputValue = ezApi.ezclocker.ezUi.ezElementExists(EzJobCodeDialog.ezInstance.ezManageJobCodesDialogView.ezIds.inputs.hourlyRateInputId)
            ? ezApi.ezclocker.ezUi.ezGetInputValue(EzJobCodeDialog.ezInstance.ezManageJobCodesDialogView.ezIds.inputs.hourlyRateInputId)
            : '0.00';

        return EzString.stringHasLength(hourlyRateInputValue)
            ? hourlyRateInputValue
            : '0.00';
    }
    /**
     * @puvlic @property @getter
     * Sets the value of the HTML input element with id=EzJobCodeDialog.ezInstance.ezManageJobCodesDialogView.ezIds.inputs.hourlyRateInputId.
     * If the element does not exist yet an EzException is thrown.
     * If the provided ezHourlyRateInputValue is undefined, null, or empty then the value of '0.00' is set.
     * @param {undefined|null|String} ezHourlyRateInputValue
     */
    set ezHourlyRateInputValue(ezHourlyRateInputValue) {
        if (!ezApi.ezclocker.ezUi.ezElementExists(EzJobCodeDialog.ezInstance.ezManageJobCodesDialogView.ezIds.inputs.hourlyRateInputId)) {
            throw new EzException(
                EzString.em`
                    Unable to set the HTML input value.
                    The HTML input element with
                    id=${EzJobCodeDialog.ezInstance.ezManageJobCodesDialogView.ezIds.inputs.hourlyRateInputId}
                    does not exist yet.`);
        }

        ezApi.ezclocker.ezUi.ezSetInputValue(
            EzJobCodeDialog.ezInstance.ezManageJobCodesDialogView.ezIds.inputs.hourlyRateInputId,
            EzString.stringOrDefault(
                ezHourlyRateInputValue,
                '0.00'));
    }

    /**
     * @public @getter @property
     * Gets the value in the HTML input with id EzJobCodeDialog.ezInstance.ezManageJobCodesDialogView.ezIds.inputs.jobCodeNameInputId.
     * If the element does not exist then an empty string is returned.
     * @returns {String}
     */
    get ezJobCodeNameInputValue() {
        return ezApi.ezclocker.ezUi.ezElementExists(EzJobCodeDialog.ezInstance.ezManageJobCodesDialogView.ezIds.inputs.jobCodeNameInputId)
            ? ezApi.ezclocker.ezUi.ezGetInputValue(EzJobCodeDialog.ezInstance.ezManageJobCodesDialogView.ezIds.inputs.jobCodeNameInputId)
            : EzString.EMPTY;
    }

    /**
     * @public @getter @property
     * Gets the value in the HTML input with id EzJobCodeDialog.ezInstance.ezManageJobCodesDialogView.ezIds.inputs.jobCodeNameInputId.
     * If the element does not exist then an EzException is thrown.
     * If the provided ezJobCodeNameInputValue is undefined or null then a blank string is set.
     * @returns {undefined|null|String}
     */
    set ezJobCodeNameInputValue(ezJobCodeNameInputValue) {
        if (!ezApi.ezclocker.ezUi.ezElementExists(EzJobCodeDialog.ezInstance.ezManageJobCodesDialogView.ezIds.inputs.jobCodeNameInputId)) {
            throw new EzException(
                EzString.em`
                    Unable to set the HTML input value.
                    The HTML input element with id=${EzJobCodeDialog.ezInstance.ezManageJobCodesDialogView.ezIds.inputs.jobCodeNameInputId} does not exist yet.`);
        }

        ezApi.ezclocker.ezUi.ezSetInputValue(
            EzJobCodeDialog.ezInstance.ezManageJobCodesDialogView.ezIds.inputs.jobCodeNameInputId,
            EzString.stringOrEmpty(ezJobCodeNameInputValue));
    }

    /**
     * @public @getter @property
     * Gets the value in the HTML input with id EzJobCodeDialog.ezInstance.ezManageJobCodesDialogView.ezIds.inputs.jobCodeCodeInputId.
     * If the element does not exist then an empty string is returned.
     * @returns {String}
     */
    get ezJobCodeCodeInputValue() {
        return ezApi.ezclocker.ezUi.ezElementExists(EzJobCodeDialog.ezInstance.ezManageJobCodesDialogView.ezIds.inputs.jobCodeCodeInputId)
            ? ezApi.ezclocker.ezUi.ezGetInputValue(EzJobCodeDialog.ezInstance.ezManageJobCodesDialogView.ezIds.inputs.jobCodeCodeInputId)
            : EzString.EMPTY;
    }

    /**
     * @public @getter @property
     * Gets the value in the HTML input with id EzJobCodeDialog.ezInstance.ezManageJobCodesDialogView.ezIds.inputs.jobCodeCodeInputId.
     * If the element does not exist then an EzException is thrown.
     * If the provided ezJobCodeNameInputValue is undefined or null then a blank string is set.
     * @returns {undefined|null|String}
     */
    set ezJobCodeCodeInputValue(ezJobCodeCodeInputValue) {
        if (!ezApi.ezclocker.ezUi.ezElementExists(EzJobCodeDialog.ezInstance.ezManageJobCodesDialogView.ezIds.inputs.jobCodeCodeInputId)) {
            throw new EzException(
                EzString.em`
                    Unable to set the HTML input value.
                    The HTML input element with id=${EzJobCodeDialog.ezInstance.ezManageJobCodesDialogView.ezIds.inputs.jobCodeCodeInputId} does not exist yet.`);
        }

        ezApi.ezclocker.ezUi.ezSetInputValue(
            EzJobCodeDialog.ezInstance.ezManageJobCodesDialogView.ezIds.inputs.jobCodeCodeInputId,
            EzString.stringOrEmpty(ezJobCodeCodeInputValue));
    }

    /**
     * @protected @method
     * Gets the value of the HTML select element with id=EzJobCodeDialog.ezInstance.ezManageJobCodesDialogView.ezIds.inputs.jobCodeFilterSelectId.
     * If the element does not exist, 'ACTIVE' is returned.
     * @returns {string}
     * A valid enum property value from EzJobCodeFilterType
     */
    get ezJobCodeFilterSelectValue() {
        if (!ezApi.ezclocker.ezUi.ezElementExists(EzJobCodeDialog.ezInstance.ezManageJobCodesDialogView.ezIds.inputs.jobCodeFilterSelectId)) {
            return EzJobCodeFilterType.ACTIVE;
        }

        return ezApi.ezclocker.ezUi.ezGetInputValue(EzJobCodeDialog.ezInstance.ezManageJobCodesDialogView.ezIds.inputs.jobCodeFilterSelectId);
    }

    /**
     * @protected @method
     * Sets the value of the HTML select element with id=EzJobCodeDialog.ezInstance.ezManageJobCodesDialogView.ezIds.inputs.jobCodeFilterSelectId.
     * If the HTML element does not exist, an EzException is thrown.
     * If the provided ezJobCodeFilterSelectValue is undefined, null, or blank, then the value 'ACTIVE' is set.
     * @param {string}
     * A valid enum property value from EzJobCodeFilterType
     */
    set ezJobCodeFilterSelectValue(ezJobCodeFilterType) {
        if (!ezApi.ezclocker.ezUi.ezElementExists(EzJobCodeDialog.ezInstance.ezManageJobCodesDialogView.ezIds.inputs.jobCodeFilterSelectId)) {
            throw new EzException(
                EzString.em`
                    Unable to set the HTML select element's value to ${ezJobCodeFilterType}.
                    The HTML select elemit does not exist yet.`);
        }

        ezApi.ezclocker.ezUi.ezSetInputValue(
            EzJobCodeDialog.ezInstance.ezManageJobCodesDialogView.ezIds.inputs.jobCodeFilterSelectId,
            EzJobCodeFilterType.ezAsEnum(ezJobCodeFilterType));
    }

    #ezDialogConfig = null;

    /**
     * @public @readonly @property
     * Gets the EzDialogConfig
     */
    get ezDialogConfig() {
        if (null == this.#ezDialogConfig) {
            this.#ezDialogConfig = new EzDialogConfig(this.ezManageJobCodesDialogView.ezDialogId);
            this.#ezDialogConfig.title = 'Manage Jobs';
            this.#ezDialogConfig.dialogClass = 'ez-dialog-shadow ez-dialog-no-scroll';
            this.#ezDialogConfig.closeOnEscape = true;
            this.#ezDialogConfig.autoOpen = false;
            this.#ezDialogConfig.modal = true;
            this.#ezDialogConfig.resizeable = false;
            this.#ezDialogConfig.maxWidth = 970;
            this.#ezDialogConfig.maxHeight = 1280;
            this.#ezDialogConfig.buttons = [
                {
                    id: `${this.#ezManageJobCodesDialogView.ezDialogId}_CloseButton`,
                    text: 'Close',
                    click: EzJobCodeDialog.ezInstance.ezClose
                }
            ];
            this.#ezDialogConfig.close = EzJobCodeDialog.ezInstance.ezClose;
            this.ezCalculateWindowBasedDialogSize();
        }

        return this.#ezDialogConfig;
    }

    /**
     * @public @property @setter
     * Sets the EzDialogConfig reference
     * @param {EzDialogConfig} ezDialogConfig
     */
    set ezDialogConfig(ezDialogConfig) {
        this.#ezDialogConfig = EzObject.isValid(ezDialogConfig)
            ? ezDialogConfig
            : null;
    }

    /**
     * @private @field
        Stores if the code should ignore all Assign al employee checkbox events or not.
     * @type {boolean}
     */
    #ezIgnoreAssignAllEmployeesCheckboxEvents = false;

    /**
     * @public @property @getter
        Gets if the code should ignore all Assign al employee checkbox events or not.
     * @returns {boolean}
     */
    get ezIgnoreAssignAllEmployeesCheckboxEvents() {
        return this.#ezIgnoreAssignAllEmployeesCheckboxEvents;
    }

    /**
     * @public @property @getter
        SGets if the code should ignore all Assign al employee checkbox events or not.
     * @param {boolean} ignoreAssignAllEmployeesCheckboxEvents
     */
    set ezIgnoreAssignAllEmployeesCheckboxEvents(ignoreAssignAllEmployeesCheckboxEvents) {
        this.#ezIgnoreAssignAllEmployeesCheckboxEvents = EzBoolean.isTrue(ignoreAssignAllEmployeesCheckboxEvents);
    }

    /**
     * @public @method
        Initializes EzJobCodeDialog
     * @returns {EzJobCodeDialog}
     */
    ezInit() {
        // Bulk registration of EzJobCodeDialog events with EzEventEngine
        ezApi.ezclocker.ezEventEngine.ezRegisterEvents(
            EzJobCodeDialog.ezApiName,
            [
                EzJobCodeDialog.ezEventNames.onDataTagDataTagMapsRefreshed,
                EzJobCodeDialog.ezEventNames.onActiveJobCodeModified,
                EzJobCodeDialog.ezEventNames.onActiveJobCodeSaveStarted,
                EzJobCodeDialog.ezEventNames.onActiveJobCodeSaveError,
                EzJobCodeDialog.ezEventNames.onActiveJobCodeDialogClosed,
                EzJobCodeDialog.ezEventNames.onJobCodeDialogJobCodeArchived,
                EzJobCodeDialog.ezEventNames.onJobCodeDialogJobCodeUnarchived,
                EzJobCodeDialog.ezEventNames.onJobCodeDialogJobCodeDeleted
            ]);

        // Bulk registration of want events with EzEventEngine
        ezApi.ezclocker.ezEventEngine.ezWantEvents(
            EzJobCodeDialog.ezApiName,
            [
                new EzWantEventDef(
                    EzJobCodeDialog.ezEventNames.onJobCodeDialogJobCodeArchived,
                    EzJobCodeDialog.ezInstance.ezHandleOnJobCodeDialogJobCodeArchived),
                new EzWantEventDef(
                    EzJobCodeDialog.ezEventNames.onJobCodeDialogJobCodeUnarchived,
                    EzJobCodeDialog.ezInstance.ezHandleOnJobCodeDialogJobCodeUnarchived),
                new EzWantEventDef(
                    EzJobCodeDialog.ezEventNames.onJobCodeDialogJobCodeDeleted,
                    EzJobCodeDialog.ezInstance.ezHandleOnJobCodeDialogJobCodeDeleted),
                new EzWantEventDef(
                    EzJobCodeDialog.ezEventNames.onActiveJobCodeModified,
                    EzJobCodeDialog.ezInstance.ezHandleOnActiveJobCodeModified),
                new EzWantEventDef(
                    EzJobCodeDialog.ezEventNames.onActiveJobCodeDialogClosed,
                    EzJobCodeDialog.ezInstance.ezClose),
                new EzWantEventDef(
                    EzJobCodeDialog.ezEventNames.onActiveJobCodeSaveStarted,
                    EzJobCodeDialog.ezInstance.ezHandleOnActiveJobSaveStarted),
                new EzWantEventDef(
                    EzJobCodeDialog.ezEventNames.onActiveJobCodeSaveError,
                    EzJobCodeDialog.ezInstance.ezHandleOnActiveJobCodeSaveError),
                new EzWantEventDef(
                    EzClockerContextEventName.onUserContextReady,
                    EzJobCodeDialog.ezInstance.ezApplyRoleToggles),
                new EzWantEventDef(
                    EzJobCodeAssignEmployeeDialog.ezEventNames.onEzJobCodeAssignEmployeeDialogClose,
                    () => EzJobCodeDialog.ezInstance.ezUpdateUxState()
                        .then(EzPromise.ignoreResolve)),
                new EzWantEventDef(
                    EzJobCodeAssignEmployeeDialog.ezEventNames.onEzJobCodeAssignEmployeeDialogUpdatedEmployeeAssignment,
                    EzJobCodeDialog.ezInstance.ezHandleEzJobCodeAssignEmployeeDialogUpdatedEmployeeAssignmentEvent)
            ]);

        EzJobCodeDialog.ezInstance.ezInitUx();

        return EzJobCodeDialog.ezInstance;
    }

    /**
     * @protected @method
        Initializes the dialog UX
     */
    ezInitUx() {
        EzJobCodeDialog.ezInstance.ezInitDialogView();

        ezApi.ezclocker.ezDialog.ezInitDialogWithConfig(
            EzJobCodeDialog.ezInstance.ezManageJobCodesDialogView.ezDialogId,
            EzJobCodeDialog.ezInstance.ezDialogConfig);

        // Builk registration of element event hooks with EzEventEngine
        ezApi.ezclocker.ezEventEngine.ezWantElementEvents(
            EzJobCodeDialog.ezApiName,
            [
                /*
                new EzWantElementEventDef(
                    'window',
                    EzElementEventName.RESIZE,
                    EzJobCodeDialog.ezInstance.ezHandleWindowResize),
                */
                new EzWantElementEventDef(
                    EzJobCodeDialog.ezInstance.ezManageJobCodesDialogView.ezIds.buttons.editorUnarchiveJobCodeButtonId,
                    EzElementEventName.CLICK,
                    EzJobCodeDialog.ezInstance.ezUnarchiveActiveJobCode),
                new EzWantElementEventDef(
                    EzJobCodeDialog.ezInstance.ezManageJobCodesDialogView.ezIds.buttons.editorArchiveJobCodeButtonId,
                    EzElementEventName.CLICK,
                    EzJobCodeDialog.ezInstance.ezArchiveActiveJobCode),
                /*
                new EzWantElementEventDef(
                    EzJobCodeDialog.ezInstance.ezManageJobCodesDialogView.ezDialogId,
                    EzElementEventName.RESIZE,
                    EzJobCodeDialog.ezInstance.ezHandleDialogResize),
                */
                new EzWantElementEventDef(
                    EzJobCodeDialog.ezInstance.ezManageJobCodesDialogView.ezIds.inputs.jobCodeNameInputId,
                    EzElementEventName.BLUR,
                    EzJobCodeDialog.ezInstance.ezHandleJobCodeNameInputBlur),
                new EzWantElementEventDef(
                    EzJobCodeDialog.ezInstance.ezManageJobCodesDialogView.ezIds.inputs.jobCodeCodeInputId,
                    EzElementEventName.BLUR,
                    EzJobCodeDialog.ezInstance.ezHandleJobCodeCodeInputBlur),
                new EzWantElementEventDef(
                    EzJobCodeDialog.ezInstance.ezManageJobCodesDialogView.ezIds.inputs.jobCodeFilterSelectId,
                    EzElementEventName.CHANGE,
                    EzJobCodeDialog.ezInstance.ezHandleOnJobCodeDialogJobCodeFilterSelectChange),
                new EzWantElementEventDef(
                    EzJobCodeDialog.ezInstance.ezManageJobCodesDialogView.ezIds.containers.availableJobCodesContainerId,
                    EzElementEventName.KEY_DOWN,
                    EzJobCodeDialog.ezInstance.ezHandleAvailableJobCodesContainerKeyDownEvent),
                new EzWantElementEventDef(
                    EzJobCodeDialog.ezInstance.ezManageJobCodesDialogView.ezIds.inputs.assignToAllEmployeesCheckboxId,
                    EzElementEventName.CHANGE,
                    EzJobCodeDialog.ezInstance.ezHandleAssignToAllEmployeesCheckboxChangeEvent),
            ]);
    }

    /**
     * @protected @method
        Initializes the dialogs view class EzManageJobCodeDialogView and
        injects the view into the document.
     */
    ezInitDialogView() {
        // Create the dialog's view
        EzJobCodeDialog.ezInstance.#ezManageJobCodesDialogView = new EzManageJobCodesDialogView(
            'EzJobCodeDialog',
            '_HideDialogsDiv');

        EzJobCodeDialog.ezInstance.ezManageJobCodesDialogView.ezInjectView
            .apply(EzJobCodeDialog.ezInstance.ezManageJobCodesDialogView);
    }

    /**
     * @protected
        Toggles UX elements to match what the logged in user's role is.
     */
    ezApplyRoleToggles() {
        let inputType2 = ezApi.ezclocker.ezClockerContext.ezGetUserContext().isManager
            ? `${EzJobCodeDialog.ezInstance.ezManageJobCodesDialogView.ezIds.inputs.hourlyRateInputPrefixId}A`
            : `${EzJobCodeDialog.ezInstance.ezManageJobCodesDialogView.ezIds.inputs.hourlyRateInputPrefixId}B`;

        let containerId = ezApi.ezclocker.ezClockerContext.ezGetUserContext().isManager
            ? `${EzJobCodeDialog.ezInstance.ezManageJobCodesDialogView.ezIds.inputs.hourlyRateInputPrefixId}A_Container`
            : `${EzJobCodeDialog.ezInstance.ezManageJobCodesDialogView.ezIds.inputs.hourlyRateInputPrefixId}B_Container`;

        EzJobCodeDialog.ezInstance.ezManageJobCodesDialogView.ezIds.inputs.hourlyRateInputId = ezApi.ezclocker.ezClockerContext.ezGetUserContext().isManager
            ? `${EzJobCodeDialog.ezInstance.ezManageJobCodesDialogView.ezIds.inputs.hourlyRateInputPrefixId}B`
            : `${EzJobCodeDialog.ezInstance.ezManageJobCodesDialogView.ezIds.inputs.hourlyRateInputPrefixId}A`;

        if (ezApi.ezclocker.ezUi.ezElementExists(inputType2)) {
            ezApi.ezclocker.ezUi.ezRemoveElement(inputType2);
            ezApi.ezclocker.ezUi.ezRemoveElement(containerId);

            if (!ezApi.ezclocker.ezClockerContext.ezGetUserContext().isManager) {

                ezApi.ezclocker.ezEventEngine.ezWantElementEvent(
                    EzJobCodeDialog.ezInstance.ezManageJobCodesDialogView.ezIds.inputs.hourlyRateInputId,
                    EzElementEventName.BLUR,
                    EzJobCodeDialog.ezApiName,
                    EzJobCodeDialog.ezInstance.ezOnHourlyRateBlur);
            }
        }
    }

    /**
     * @protected @method
        Initializes the job code dialog data.
     * @returns {Promise}
        A resolve only promise
     */
    ezInitData() {
        return EzJobCodeDialog.ezInstance.ezLoadEmployerJobCodes();
    }

    /**
     * @protected @method
        Resets the dialog's data
     */
    ezResetDialog() {
        ezApi.ezclocker.ezUi.ezHideElement('EzJobCodeLayoutTable');

        this.ezCloseAfterSaveComplete = false;

        EzJobCodeDialog.ezInstance.ezAvailableJobCodes = [];

        EzJobCodeDialog.ezInstance.ezActiveJobCode = null;

        EzJobCodeDialog.ezInstance.ezActiveJobCodeModified = false;

        EzJobCodeDialog.ezInstance.ezDialogLoading = false;

        EzJobCodeDialog.ezInstance.ezJobCodeFilterSelectValue = EzJobCodeFilterType.ACTIVE;
    }

    /**
     * @public @method
     * Shows the dialog
     */
    ezShow() {
        if (EzBoolean.isTrue(EzJobCodeDialog.ezInstance.ezDialogLoading)) {
            ezApi.ezclocker.ezLogger.warn('EzJobCodeDialog.ezShow() will ignore additional calls if the dialog is in progress of loading.');
            return;
        }

        EzJobCodeDialog.ezInstance.ezResetDialog();

        try {
            EzJobCodeDialog.ezInstance.ezDialogLoading = true;

            return EzJobCodeDialog.ezInstance.ezInitData()
                .then(
                    () => ezApi.ezclocker.ezDialog.ezShowDialog(EzJobCodeDialog.ezInstance.ezManageJobCodesDialogView.ezDialogId)
                        .then(
                            () => EzJobCodeDialog.ezInstance.ezRenderAvailableJobCodes()
                                .then(
                                    () => {
                                        ezApi.ezclocker.ezUi.ezShowElement('EzJobCodeLayoutTable');
                                        return EzJobCodeDialog.ezInstance.ezUpdateUxState()
                                            .then(EzJobCodeDialog.ezInstance.ezShowDialogContentContainer());
                                    })));
        } finally {
            EzJobCodeDialog.ezInstance.ezDialogLoading = false;
        }
    }

    /**
     * @public @method
        Closes the open dialog
     */
    ezClose() {
        EzJobCodeDialog.ezInstance.ezCloseAfterSaveComplete = true;

        return EzJobCodeDialog.ezInstance.ezSaveIfActiveJobCodeModified()
            .then(
                () => {
                    EzJobCodeDialog.ezInstance.ezHideDialogContentContainer();
                    ezApi.ezclocker.ezDialog.ezCloseDialog(EzJobCodeDialog.ezInstance.ezManageJobCodesDialogView.ezDialogId);

                    if (ezApi.ezclocker.ezClockerContext.ezIsActiveEmployeeReady()) {
                        // Refresh the active employee to pick up any changes to that employee
                        ezApi.ezclocker.ezUi.ezPageWaitExecute(
                            'Updating selected employee ... ',
                            (waitDone) => ezApi.ezclocker.ezClockerContext.ezRefreshActiveEmployee()
                                .then(
                                    waitDone,
                                    (eResponse) => waitDone()
                                        .then(
                                            () => ezApi.ezclocker.ezLogger.error(
                                                EzString.em`
                                                        Failed to refresh the active employee after closing the Job Code dialog.
                                                        Error: ${ezApi.ezToJson(eResponse)}`))))
                            .catch(
                                (err) => {
                                    if (EzObject.isValid(err) &&
                                        EzString.stringHasLength(err.message) &&
                                        -1 === err.message.indexOf('An Active Employee is required')) {
                                        ezApi.ezclocker.ezLogger.error(
                                            EzString.em`
                                                        Failed to refresh the active employee on Manage Jobs dialog close due to the following error:
                                                        ${err.message}.`);
                                    }
                                    // Otherwise, ignoring the exception as it isn't important
                                });
                    }
                });
    }

    /**
     * @protected @method
     * Handles Hourly Rate Input's key up event
     * @param {Object} ezEvent
        Normally of type EzEventData
     */
    ezOnHourlyRateBlur(ezEvent) {
        const numericValue = parseFloat(EzJobCodeDialog.ezInstance.ezHourlyRateInputValue);

        EzJobCodeDialog.ezInstance.ezHourlyRateInputValue = isNaN(numericValue) || 0 > numericValue
            ? '0.00'
            : numericValue.toFixed(2);

        EzJobCodeDialog.ezInstance.ezHandleJobCodeCodeInputBlur(ezEvent);
    }

    /**
     * @protected @method
     * Shows the dialog's content container (all UX)
     * @returns {Promise.resolve}
     */
    ezShowDialogContentContainer() {
        return ezApi.ezclocker.ezUi.ezShowElement(
            EzJobCodeDialog.ezInstance.ezManageJobCodesDialogView.ezIds.containers.dialogContentContainerId,
            'grid');
    }

    /**
     * @protected @method
        Hides the dialog's content container (all UX)
     * @returns {Promise.resolve}
     */
    ezHideDialogContentContainer() {
        return ezApi.ezclocker.ezUi.ezHideElement(
            EzJobCodeDialog.ezInstance.ezManageJobCodesDialogView.ezIds.containers.dialogContentContainerId);
    }

    /**
     * @protected @method
        Calculates dialog HTML element sizes based on the current window size and other container sizes.
     * @returns {Object}
        Object contains the calculated sizes:
        {
            dialogWidth: {number},
            dialogHeight: {number}
        }
     */
    ezCalculateDialogElementSizes() {
        let jobCodeTitleContainerHeight = ezApi.ezclocker.ezUi.ezElementHeight('EzJobCodeDialog_JobCodeTitleContainer');

        return {
            dialogWidth: EzJobCodeDialog.ezInstance.ezDialogConfig.width,
            dialogHeight: EzJobCodeDialog.ezInstance.ezDialogConfig.height,
            maxColumnHeight: EzJobCodeDialog.ezInstance.ezDialogConfig.height - jobCodeTitleContainerHeight - (16 * 2)
        };
    }

    /**
     * @protected @method
        Calculates the dialogs width and height based on the current window's width and height.
        Values stored in the EzJobCodeDialog.ezInstance.ezDialogConfig property.
     */
    ezCalculateWindowBasedDialogSize() {
        // Dialog width based on current screen width or the maximum dialog width size
        let dialogWidth = (window.innerWidth / 2) + (window.innerWidth / 4);

        EzJobCodeDialog.ezInstance.ezDialogConfig.width = dialogWidth < EzJobCodeDialog.ezInstance.ezDialogConfig.maxWidth
            ? dialogWidth
            : EzJobCodeDialog.ezInstance.ezDialogConfig.maxWidth;

        // Dialog height based on the current screen height or the set maximum dialog height
        let dialogHeight = (window.innerHeight / 2) + (window.innerHeight / 4) + 100;

        EzJobCodeDialog.ezInstance.ezDialogConfig.height = dialogHeight < EzJobCodeDialog.ezInstance.ezDialogConfig.maxHeight
            ? dialogHeight
            : EzJobCodeDialog.ezInstance.ezDialogConfig.maxHeight;
    }

    /**
     * @protected @method
     * Handles the window resize event to adjust the size of the dialog.
     */
    ezHandleWindowResize() {
        EzJobCodeDialog.ezInstance.ezCalculateWindowBasedDialogSize();

        // Dialog width and height adjusted here so other calculations can use the values
        ezApi.ezclocker.ezUi.ezId(EzJobCodeDialog.ezInstance.ezManageJobCodesDialogView.ezDialogId).dialog({
            height: EzJobCodeDialog.ezInstance.ezDialogConfig.height,
            width: EzJobCodeDialog.ezInstance.ezDialogConfig.width
        });
    }

    /**
     * @protected @method
     * Handles the dialog resizing event
     */
    ezHandleDialogResize() {
        let dialogElementSizes = EzJobCodeDialog.ezInstance.ezCalculateDialogElementSizes();

        ezApi.ezclocker.ezUi.ezAddCss(
            'EzJobCodeLayoutTable',
            {
                'height': dialogElementSizes.maxColumnHeight,
                'max-height': dialogElementSizes.maxColumnHeight
            });

        ezApi.ezclocker.ezUi.ezAddCss(
            EzJobCodeDialog.ezInstance.ezManageJobCodesDialogView.ezIds.containers.availableJobCodesContainerId,
            'height',
            dialogElementSizes.maxColumnHeight);

        ezApi.ezclocker.ezUi.ezAddCss(
            EzJobCodeDialog.ezInstance.ezManageJobCodesDialogView.ezIds.containers.availableJobCodesContainerId,
            'max-height',
            dialogElementSizes.maxColumnHeight);

        ezApi.ezclocker.ezUi.ezAddCss(
            'EzJobCodeDialog_LeftContainer',
            {
                'height': (dialogElementSizes.maxColumnHeight),
                'max-height': (dialogElementSizes.maxColumnHeight),
                'width': '50%',
                'max-width': '50%'
            });
    }

    /**
     * @protected @method
     * Handles resizing of the visual help panel
     */
    ezHandleVisualHelpPanelResize() {
        if (!ezApi.ezclocker.ezUi.ezElementExists(EzJobCodeDialog.ezInstance.ezManageJobCodesDialogView.ezIds.containers.rightContentContainerId)) {
            return;
        }

        ezApi.ezclocker.ezUi.ezSizeToParent(
            EzJobCodeDialog.ezInstance.ezManageJobCodesDialogView.ezIds.containers.rightContentContainerId,
            EzJobCodeDialog.ezInstance.ezManageJobCodesDialogView.ezIds.containers.visualHelpAddJobContainerId,
            90,
            40);

        ezApi.ezclocker.ezUi.ezId(EzJobCodeDialog.ezInstance.ezManageJobCodesDialogView.ezIds.containers.visualHelpAssignEmployeeContainerId).height(
            ezApi.ezclocker.ezUi.ezId(EzJobCodeDialog.ezInstance.ezManageJobCodesDialogView.ezIds.containers.visualHelpAddJobContainerId).height());
    }


    /**
     * @protected @method
        Displays the assign employee pick dialog
     */
    ezShowAssignEmployeeDialog() {
        if (!EzObject.isValid(EzJobCodeDialog.ezInstance.ezActiveJobCode)) {
            return;
        }

        if (!EzString.stringHasLength(EzJobCodeDialog.ezInstance.ezActiveJobCode.tagName)) {
            ezApi.ezclocker.ezDialog.ezShowOk(
                'Manage Jobs',
                'Please enter a valid name for your job before assigning employees.')
                .then(EzPromise.ignoreResolve);
            ezApi.ezclocker.ezUi.ezFocus(EzJobCodeDialog.ezInstance.ezManageJobCodesDialogView.ezIds.inputs.jobCodeNameInputId);

            return;
        }

        return EzJobCodeDialog.ezInstance.ezSaveIfActiveJobCodeModified()
            .then(
                () => ezApi.ezclocker.ezJobCodeAssignEmployeeDialog.ezShow(
                    EzJobCodeDialog.ezInstance.ezActiveJobCode));
    }

    /**
     * @protected @method
        Displays the assign employee pick dialog
     * @param {number} editingAssignedEmployeeDataTagIndex
     */
    ezEditAssignedEmployeeDataTag(editingAssignedEmployeeDataTagIndex) {
        if (!EzNumber.isNumber(editingAssignedEmployeeDataTagIndex)) {
            throw new EzBadParamException(
                'editingAssignedEmployeeDataTagIndex',
                EzJobCodeDialog.ezInstance,
                EzJobCodeDialog.ezInstance.ezEditAssignedEmployeeDataTag);
        }

        if (!EzObject.isValid(EzJobCodeDialog.ezInstance.ezActiveJobCode)) {
            throw new EzBadStateException(
                'Expected a valid DataTag instance returned from call to EzJobCodeDialog.ezInstance.ezActiveJobCode.',
                'Call to EzJobCodeDialog.ezInstance.ezActiveJobCode returned an undefined or null instance.',
                EzJobCodeDialog.ezInstance,
                EzJobCodeDialog.ezInstance.ezEditAssignedEmployeeDataTag);
        }

        ezApi.ezclocker.ezJobCodeAssignEmployeeDialog.ezShow(
            EzJobCodeDialog.ezInstance.ezActiveJobCode,
            editingAssignedEmployeeDataTagIndex);
    }

    /**
     * @protected @method
     * Handles the EzJobCodeAssignEmployeeDialog.ezEventNames.onEzJobCodeAssignEmployeeDialogUpdatedEmployeeAssignment event
     * @param {ezEvent}
        EzEvent Data: {
            mode: {string: EzJobCodeAssignEmployeeDialog enum property value},
            employeeId: {number: employeeId}
            dataTag: {object: DataTag the employee was asssigned to}
            updatedDataTagMap: {object: Either the new DataTagMap (if created) or the updated DataTagMap},
            dataTagMapIndex: {number: null if a new DataTabMap, index of the DataTagMap within the DataTag's ezDataTagMaps array}
        }
     */
    ezHandleEzJobCodeAssignEmployeeDialogUpdatedEmployeeAssignmentEvent(ezEvent) {
        if (!EzObject.isValid(ezEvent)) {
            throw new EzBadParamException(
                'ezEvent',
                EzJobCodeDialog.ezInstance,
                EzJobCodeDialog.ezInstance.ezHandleEmployeeJobAssignmentUpdatedEvent);
        }

        if (!EzObject.isValid(ezEvent.data)) {
            return;
        }

        let employee = EzNumber.isNumber(ezEvent.data.employeeId)
            ? ezApi.ezclocker.ezClockerContext.ezGetSelectedEmployerAccountEmployeeAccountsById(ezEvent.data.employeeId)
            : null;

        if (EzObject.isValid(employee)) {
            employee.primaryJob = 1 == ezEvent.data.updatedDataTagMap.level
                ? ezEvent.data.updatedDataTagMap
                : null;
        } else {
            ezApi.ezclocker.ezLogger.warn(
                EzString.em`
                    Unable to update the primaryJob reference for employee with employeeId=${ezEvent.data.employeeId}.
                    EzClockerContext does not have a reference for employeeId=${ezEvent.data.employeeId}`);
        }

        if (EzJobCodeAssignEmployeeDialogMode.NEW_EMPLOYEE_ASSIGNMENT === ezEvent.data.mode) {
            if (!EzArray.isArray(ezEvent.data.dataTag.ezDataTagMaps)) {
                ezEvent.data.dataTag.ezDataTagMaps = [];
            }

            ezEvent.data.dataTag.ezDataTagMaps.push(ezEvent.data.updatedDataTagMap);
        }

        if (EzJobCodeAssignEmployeeDialogMode.EDITING_EMPLOYEE_ASSIGNMENT === ezEvent.data.mode) {
            if (!EzArray.isArray(ezEvent.data.dataTag.ezDataTagMaps) ||
                0 > ezEvent.data.dataTagMapIndex ||
                ezEvent.data.dataTagMapIndex >= ezEvent.data.dataTag.ezDataTagMaps.length) {
                // Need to refresh the entire DataTag's assignments as it might not have been done yet
                return EzJobCodeDialog.ezInstance.ezLoadJobCodeAssignments(ezEvent.data.dataTag)
                    .then(EzJobCodeDialog.ezInstance.ezUpdateUxState);
            }

            // In place update the updated DataTabMap and refresh the ux
            ezEvent.data.dataTag.ezDataTagMaps[ezEvent.data.dataTagMapIndex] = ezEvent.data.updatedDataTagMap;
        }

        EzJobCodeDialog.ezInstance.ezUpdateUxState();
    }

    /**
     * @protected @method
     * Handles the add new job code button click
     */
    ezHandleAddNewJobCodeButtonClick() {
        EzJobCodeDialog.ezInstance.ezAddNewJobCode();
    }

    /**
     * @protected @method
        Adds the active job code as a NEW job code record.
     * @returns {Promise.resolve}
     */
    ezAddNewJobCode() {
        return EzPromise.asyncAction(
            (finished) => EzJobCodeDialog.ezInstance.ezSaveIfActiveJobCodeModified()
                .then(
                    () => {
                        // Initialize the new job
                        let newDataTag = new EzDataTag(
                            // aId
                            null,
                            // aEmployerId
                            ezApi.ezclocker.ezClockerContext.ezGetActiveEmployer().id,
                            //aDataTagType
                            EzDataTagType.JOB_CODE,
                            // aTagName
                            EzJobCodeDialog.ezInstance.ezGenerateNewJobCodeTagName(),
                            // aDescription
                            null,
                            // aValueName
                            null,
                            // aValueType
                            null,
                            // aValue
                            null,
                            // aEnabled
                            true,
                            // aArchived
                            false,
                            // aDeleted
                            false,
                            // aPersonalId
                            null);

                        /**
                         * @method
                         * Handles the common actions for the two flows
                         * @param {object} aDataTag
                         * @param {boolean} modified
                         */
                        let postAddNewJobCode = (aDataTag, modified) => {
                            return EzJobCodeDialog.ezInstance.ezRefreshJobCodes(aDataTag.id)
                                .then(
                                    () => {
                                        EzJobCodeDialog.ezInstance.ezActiveJobCodeModified = EzBoolean.isTrue(modified);

                                        return finished();
                                    });
                        };

                        // Save the new job
                        return EzJobCodeDialog.ezInstance.ezSaveDataTag(newDataTag)
                            .then(
                                (saveDataTagResult) => postAddNewJobCode(saveDataTagResult.dataTag, false),
                                (eResponse) => {
                                    ezApi.ezclocker.ezLogger.error(
                                        EzString.em`
                                            Failed to save a new DataTag/JobCode. new job code due to error: ${eResponse.message}.
                                            [DataTag: ${ezApi.ezToJson(newDataTag)}]
                                            [Error response: ${ezApi.ezToJson(eResponse)}]`);

                                    // Save failed, so just add the job and flag it 'modified' to attempt again later.
                                    return postAddNewJobCode(newDataTag, true);
                                });
                    }));
    }

    /**
     * @protected @method
        Determines if the tag name already exists
     * @returns {Boolean}
     */
    ezTagNameExists(tagName) {
        let tagNameExists = false;

        // Validate name is unique
        EzJobCodeDialog.ezInstance.ezAvailableJobCodes.forEach(
            (jobCode) => {
                if (EzObject.isValid(jobCode) && jobCode.tagName.toLowerCase() === tagName.toLowerCase()) {
                    tagNameExists = true;
                }
            });

        return tagNameExists;
    }

    /**
     * @protected @method
        Generates a new unique tag name.
     * @returns {String}
     */
    ezGenerateNewJobCodeTagName() {
        if (!EzArray.arrayHasLength(EzJobCodeDialog.ezInstance.ezAvailableJobCodes)) {
            return 'Job 1';
        }

        let tagNameIndex = EzJobCodeDialog.ezInstance.ezAvailableJobCodes.length + 1;

        while (EzJobCodeDialog.ezInstance.ezTagNameExists(`Job ${tagNameIndex.toString()}`) && tagNameIndex < 200) {
            tagNameIndex++;
        }

        return 200 <= tagNameIndex
            ? `Job ${ezApi.ezclocker.ezDateTime.ezNowVersionStamp}`
            : `Job ${tagNameIndex}`;
    }

    /**
     * @protected @method
     * Returns the first visible job code index or null if no visible job codes available.
     * @returns {Number|null}
     */
    ezGetFirstVisibleJobCodeIndex() {
        if (!EzArray.arrayHasLength(EzJobCodeDialog.ezInstance.ezAvailableJobCodes)) {
            return null;
        }

        for (let index = 0; index < EzJobCodeDialog.ezInstance.ezAvailableJobCodes.length; index++) {
            let jobCode = EzJobCodeDialog.ezInstance.ezGetAvailableJobCodeByIndex(index);

            if (EzObject.isValid(jobCode) && !EzJobCodeDialog.ezInstance.ezIsJobFilterHidden(jobCode)) {
                return index;
            }
        }

        return null;
    }

    /**
     * @protected @method
        Selects the job code in the UX reference by the provided jobCodeIndex
     * @param {number} jobCodeIndex
     * @returns {Promise.resolve}
     */
    ezSelectJobCodeBarForIndex(jobCodeIndex) {
        if (!EzNumber.isNumber(jobCodeIndex) || 0 > jobCodeIndex || jobCodeIndex > EzJobCodeDialog.ezInstance.ezAvailableJobCodes.length) {
            throw new EzBadParamException(
                'jobCodeIndex',
                EzJobCodeDialog.ezInstance,
                EzJobCodeDialog.ezInstance.ezSelectJobCodeBarForIndex);
        }

        return EzBoolean.isTrue(EzJobCodeDialog.ezInstance.ezHasVisibleJobs)
            ? EzJobCodeDialog.ezInstance.ezActivateJobCodeForIndex(jobCodeIndex)
            // JobCode is filtered out of the UX
            : EzJobCodeDialog.ezInstance.ezActivateJobCodeForIndex(null);
    }

    /**
     * @protected @method
     * Sets the active job code by the provided index. Used when the job code does not yet have an id.
     * @param {number} jobCodeIndex
        A valid number within the range of the EzJobCodeDialog.ezInstance.ezAvailableJobCodes array is required.
     * @returns {Promise.resolve}
     */
    ezActivateJobCodeForIndex(jobCodeIndex) {
        if (!EzNumber.isNumber(jobCodeIndex)) {
            throw new EzBadParamException(
                'jobCodeIndex',
                EzJobCodeDialog.ezInstance,
                EzJobCodeDialog.ezInstance.ezActivateJobCodeForIndex);
        }
        if (0 > jobCodeIndex) {
            return EzJobCodeDialog.ezInstance.ezActivateJobCode(null);
        }
        if (jobCodeIndex >= EzJobCodeDialog.ezInstance.ezAvailableJobCodes.length) {
            throw new EzBadStateException(
                EzString.em`
                    Expected the provided jobCodeIndex param value of ${jobCodeIndex} to be a valid index for the
                    EzJobCodeDialog.ezInstance.ezAvailableJobCodes array.`,
                EzString.em`
                    The provided jobCodeIndex param value of ${jobCodeIndex} is out of range for the
                    EzJobCodeDialog.ezInstance.ezAvailableJobCodes which has a length of ${EzJobCodeDialog.ezInstance.ezAvailableJobCodes.length}`,
                EzJobCodeDialog.ezInstance,
                EzJobCodeDialog.ezInstance.ezActivateJobCodeForIndex);
        }
        if (!EzArray.arrayHasLength(EzJobCodeDialog.ezInstance.ezAvailableJobCodes)) {
            throw new EzBadStateException(
                EzString.em`
                    Expected the provided jobCodeIndex param value of ${jobCodeIndex} to be a valid index for the
                    EzJobCodeDialog.ezInstance.ezAvailableJobCodes array.`,
                'The EzJobCodeDialog.ezInstance.ezAvailableJobCodes does not have a length.',
                EzJobCodeDialog.ezInstance,
                EzJobCodeDialog.ezInstance.ezActivateJobCodeForIndex);
        }

        return EzPromise.asyncAction(
            (finished) => {
                if (EzBoolean.isFalse(EzJobCodeDialog.ezInstance.ezHasVisibleJobs)) {
                    return EzJobCodeDialog.ezInstance.ezActivateJobCode(null)
                        .then(finished);
                }

                if (EzObject.isValid(EzJobCodeDialog.ezInstance.ezActiveJobCode) &&
                    jobCodeIndex === EzJobCodeDialog.ezInstance.ezActiveJobCode.ezIndex) {
                    // JobCode is already active
                    return EzJobCodeDialog.ezInstance.ezSaveIfActiveJobCodeModified()
                        .then(EzJobCodeDialog.ezInstance.ezUpdateUxState)
                        .then(finished);
                }

                let jobCodeToActivate = EzJobCodeDialog.ezInstance.ezGetAvailableJobCodeByIndex(jobCodeIndex);

                if (!EzObject.isValid(jobCodeToActivate)) {
                    throw new EzBadStateException(
                        `Expected call EzJobCodeDialog.ezInstance.ezGetAvailableJobCodeByIndex(${jobCodeIndex}) to return a valid DataTag/JobCode instance.`,
                        `Call to EzJobCodeDialog.ezInstance.ezGetAvailableJobCodeByIndex(${jobCodeIndex}) returned undefined or null.`,
                        EzJobCodeDialog.ezInstance,
                        EzJobCodeDialog.ezInstance.ezActivateJobCodeForIndex);
                }

                return EzJobCodeDialog.ezInstance.ezActivateJobCode(jobCodeToActivate)
                    .then(finished);
            });
    }

    /**
     * @public @method
     * Sets the active job code to the job code associated with the provided jobCodeId if it exists
        in the internal ezActiveJobCodesById object. Otherwise, the active job code is cleared.
     * @param {number} jobCodeId
        A valid number is required for jobCodeId
     * @returns {Promise}
        Promise.resolve indicates the job code was activated
        Promise.reject indicates the job code was NOT activated.
     */
    ezActivateJobCodeForId(jobCodeId) {
        if (!EzNumber.isNumber(jobCodeId)) {
            throw new EzBadParamException(
                'jobCodeIndex',
                EzJobCodeDialog.ezInstance,
                EzJobCodeDialog.ezInstance.ezActivateJobCodeForId);
        }

        if (!EzArray.arrayHasLength(EzJobCodeDialog.ezInstance.ezAvailableJobCodes)) {
            throw new EzBadStateException(
                `Expected one of the available job codes to have an id equal to provided jobCodeId or ${jobCodeId}.`,
                'The EzJobCodeDialog.ezInstance.ezAvailableJobCodes is empty.',
                EzJobCodeDialog.ezInstance,
                EzJobCodeDialog.ezInstance.ezActivateJobCodeForId);
        }

        return EzPromise.asyncAction(
            (finished) => {
                if (EzBoolean.isFalse(EzJobCodeDialog.ezInstance.ezHasVisibleJobs)) {
                    // No visible jobs to activate
                    return EzJobCodeDialog.ezInstance.ezActivateJobCode(null)
                        .then(finished);
                }

                if (EzObject.isValid(EzJobCodeDialog.ezInstance.ezActiveJobCode) &&
                    jobCodeId == EzJobCodeDialog.ezInstance.ezActiveJobCode.id) {
                    EzJobCodeDialog.ezInstance.ezSaveIfActiveJobCodeModified()
                        .then(EzJobCodeDialog.ezInstance.ezUpdateUxState)
                        .then(finished);
                }

                let jobCodeToActivate = EzJobCodeDialog.ezInstance.ezGetJobCodeById(jobCodeId);

                if (!EzObject.isValid(jobCodeToActivate)) {
                    throw new EzBadStateException(
                        `Expected call EzJobCodeDialog.ezInstance.ezGetJobCodeById(${jobCodeId}) to return a valid DataTag/JobCode instance.`,
                        `Call to EzJobCodeDialog.ezInstance.ezGetJobCodeById(${jobCodeId}) returned undefined or null.`,
                        EzJobCodeDialog.ezInstance,
                        EzJobCodeDialog.ezInstance.ezActivateJobCodeForId);
                }

                return EzJobCodeDialog.ezInstance.ezActivateJobCode(jobCodeToActivate)
                    .then(finished);
            });
    }

    /**
     * @protected @method
     * Sets the active job code to the provided jobCode instance.
        If null, the help panel is shown instead.
     * @param {Object} jobCode
     * @returns {Promise.resolve}
     */
    ezActivateJobCode(jobCode) {
        return EzPromise.asyncAction(
            (finished) => EzJobCodeDialog.ezInstance.ezSaveIfActiveJobCodeModified()
                .then(
                    () => {
                        if (!EzObject.isValid(jobCode) || EzJobCodeDialog.ezInstance.ezIsJobFilterHidden(jobCode)) {
                            EzJobCodeDialog.ezInstance.ezDeActivateJobCodeBar();

                            EzJobCodeDialog.ezInstance.ezActiveJobCode = null;
                            EzJobCodeDialog.ezInstance.ezActiveJobCodeModified = false;

                            // No active job code
                            return EzJobCodeDialog.ezInstance.ezUpdateUxState()
                                .then(finished);
                        }

                        EzJobCodeDialog.ezInstance.ezActiveJobCode = jobCode;
                        EzJobCodeDialog.ezInstance.ezActiveJobCodeModified = false;

                        return EzJobCodeDialog.ezInstance.ezLoadJobCodeAssignments(jobCode)
                            .then(
                                () => EzJobCodeDialog.ezInstance.ezUpdateUxState()
                                    .then(
                                        () => {
                                            // Set focus the job code Name input UX
                                            ezApi.ezclocker.ezUi.ezFocus(
                                                EzJobCodeDialog.ezInstance.ezManageJobCodesDialogView.ezIds.inputs.jobCodeNameInputId);

                                            // Select all the text in the input
                                            ezApi.ezclocker.ezUi.ezSelectAll(
                                                EzJobCodeDialog.ezInstance.ezManageJobCodesDialogView.ezIds.inputs.jobCodeNameInputId);

                                            return finished();
                                        }));
                    }));
    }

    /**
     * @protected @method
        Scrolls the JobBar associated with the provided jobCode into view if it is currently off screen.
     * @param {object} dataTag
     */
    ezScrollJobBarIntoView(dataTag) {
        if (!EzObject.isValid(dataTag)) {
            throw new EzBadParamException(
                'dataTag',
                EzJobCodeDialog.ezInstance,
                EzJobCodeDialog.ezInstance.ezScrollJobBarIntoView);
        }

        let jobCodeBarId = null;

        if (EzObject.hasProperty(dataTag, 'ezIndex') && !EzNumber.isNumber(dataTag.ezIndex) && 0 > dataTag.ezIndex) {
            jobCodeBarId = `EzJobCodeDialog_JobCodeBar${dataTag.ezIndex}`;
        } else {
            for (let index = 0; index < EzJobCodeDialog.ezInstance.ezAvailableJobCodes.length; index++) {
                let aDataTag = EzJobCodeDialog.ezInstance.ezAvailableJobCodes[index];

                if (EzObject.isValid(aDataTag) && aDataTag.id === dataTag.id) {
                    dataTag.ezIndex = index;

                    jobCodeBarId = `EzJobCodeDialog_JobCodeBar${index}`;

                    break;
                }
            }
        }

        if (EzString.stringHasLength(jobCodeBarId)) {
            ezApi.ezclocker.ezUi.ezElementScrollIntoViewIfNeeded(jobCodeBarId);
        }
    }

    /**
     * @protected @method
        Loads the employee assignment DataTagMaps for the provided DataTag (aka JobCode) entity.
        The obtained array of DataTagMaps is assigned to a property named ezDataTagMaps on the provided
        jobCode (DataTag) entity:
            jobCode.ezDataTagMaps = [ ... ]
        An empty array is assigned if no DataTagMaps return from the API or an error occurs.
        The error is logged but NOT returned in the promise.
     * @param {object} dataTag
        A valid DataTag as a JobCode
     * @returns {Promise.resolve}
        If successfull returns the array of DataTagMaps (aka employees assigned to the job) if any exist (or empty array if none exist.)
        Upon failure, the original array is returned (if available) or an empty array.
     */
    ezLoadJobCodeAssignments(dataTag, forceRefresh) {
        if (!EzObject.isValid(dataTag)) {
            throw new EzBadParamException(
                'dataTag',
                EzJobCodeDialog.ezInstance,
                EzJobCodeDialog.ezInstance.ezLoadJobCodeAssignments);
        }

        return ezApi.ezclocker.ezUi.ezPageWaitAsync(
            `Refreshing employee assignments for job ${dataTag.tagName} ...`,
            (waitDone, finished) => {

                if (!EzNumber.isNumber(dataTag.id)) {
                    // Not yet persisted
                    dataTag.ezDataTagMaps = [];
                    return waitDone().then(() => finished(dataTag.ezDataTagMaps));
                }

                if (!EzArray.arrayHasLength(dataTag.ezDataTagMaps) || EzBoolean.isTrue(forceRefresh)) {
                    // Show spinner while the initial assigned DataTagMaps load for the DataTag/JobCode
                    return ezApi.ezclocker.ezInternalDataTagMapApiClient.ezGetDataTagAssignments(dataTag.id, EzEntityType.EMPLOYEE)
                        .then(
                            (ezEntityCollectionResponse) => {
                                dataTag.ezDataTagMaps = EzObject.isValid(ezEntityCollectionResponse) && EzArray.isArray(ezEntityCollectionResponse.entities)
                                    ? ezEntityCollectionResponse.entities
                                    : [];

                                EzJobCodeDialog.ezInstance.ezTriggeronDataTagDataTagMapsRefreshed(dataTag);

                                return waitDone()
                                    .then(
                                        () => finished(dataTag.ezDataTagMaps));
                            },
                            (ezEntityCollectionErrorResponse) => {
                                EzJobCodeDialog.ezInstance.ezHandleGetDataTagAssignmentsFailure(
                                    ezEntityCollectionErrorResponse,
                                    dataTag);

                                return waitDone()
                                    .then(
                                        () => {
                                            dataTag.ezDataTagMaps = EzArray.arrayOrEmpty(dataTag.ezDataTagMaps);
                                            EzJobCodeDialog.ezInstance.ezTriggeronDataTagDataTagMapsRefreshed(dataTag);

                                            return finished(dataTag.ezDataTagMaps);
                                        });
                            });
                }

                return waitDone().then(() => finished(dataTag.ezDataTagMaps));
            });
    }

    /**
     * @protected @method
        Triggers the EzJobCodeDialog's onDataTagDataTagMapsRefreshed event for the provided jobCode.
     * @param {object} dataTag
     */
    ezTriggeronDataTagDataTagMapsRefreshed(dataTag) {
        if (!EzObject.isValid(dataTag)) {
            throw new EzBadParamException(
                'dataTag',
                EzJobCodeDialog.ezInstance,
                EzJobCodeDialog.ezInstance.ezTriggeronDataTagDataTagMapsRefreshed);
        }

        ezApi.ezclocker.ezEventEngine.ezTriggerEvent(
            EzJobCodeDialog.ezEventNames.onDataTagDataTagMapsRefreshed,
            new EzEventData(
                this,
                'Refreshed DataTag/JobCode\'s assigned DataTagMaps',
                dataTag));
    }

    /**
     * @protected @method
     * Handles failure responses from ezApi.ezclocker.ezInternalDataTagMapApiClient.ezGetDataTagAssignments(...) to the
        ezClocker api.
     * @param {EzEntityCollectionResponse} ezEntityCollectionErrorResponse
     * @param {object} dataTag
     */
    ezHandleGetDataTagAssignmentsFailure(ezEntityCollectionErrorResponse, dataTag) {
        if (!EzObject.isValid(dataTag)) {
            throw new EzBadParamException(
                'dataTag',
                EzJobCodeDialog.ezInstance,
                EzJobCodeDialog.ezInstance.ezHandleGetDataTagAssignmentsFailure);
        }

        let em = `Failed to obtain the assigned employees for the DataTag (as a JobCode) with dataTagId=${dataTag.id}.`;

        if (EzObject.isValid(ezEntityCollectionErrorResponse)) {
            em = EzNumber.isNumber(ezEntityCollectionErrorResponse.errorCode)
                ? `[Error ${ezEntityCollectionErrorResponse.errorCode}]: ${em}`
                : `[Error 500]: ${em}`;

            if (EzString.stringHasLength(ezEntityCollectionErrorResponse.message)) {
                em = `${em} ${ezEntityCollectionErrorResponse.message}`;
            }

            em = `${em} (Error esponse=${ezApi.ezToJson(ezEntityCollectionErrorResponse)})`;

            ezApi.ezclocker.ezLogger.error(em);

            dataTag.ezDataTagMaps = ezEntityCollectionErrorResponse.entities;
        } else {
            dataTag.ezDataTagMaps = [];
        }
    }

    /**
     * @protected @method
        Only saves the active job code if it is modified.
     * @returns {Promise.resolve}
        {
            errorCode: {number}
            message: {string}
            saved: {boolean},
            dataTag: {object}
        }
     */
    ezSaveIfActiveJobCodeModified() {
        return EzPromise.asyncAction(
            (finished) => {
                return EzObject.isValid(EzJobCodeDialog.ezInstance.ezActiveJobCode) && EzBoolean.isTrue(EzJobCodeDialog.ezInstance.ezActiveJobCodeModified)
                    ? EzJobCodeDialog.ezInstance.ezSaveDataTag(EzJobCodeDialog.ezInstance.ezActiveJobCode)
                        .then(
                            (saveDataTagResult) => {
                                EzJobCodeDialog.ezInstance.ezActiveJobCodeModified = false;
                                return finished(saveDataTagResult.dataTag);
                            })
                    : finished(EzJobCodeDialog.ezInstance.ezActiveJobCode);
            });
    }

    /**
     * @protected @method
        Saves the active job code editor values to the entity and then calls
        EzEmployerAddJobCodesDialog.ezCreateUpdateJobCode() to persist in the DB.
     * @param {object} dataTag
     * @returns {Promise.resolve}
        {
            errorCode: {number},
            message: {string}
            saved: {boolean},
            originalDataTag: {objet},
            updatedDataTag: {null|object}
        }
     */
    ezSaveDataTag(dataTag) {
        if (!EzObject.isValid(dataTag)) {
            throw new EzBadParamException(
                'dataTag',
                EzJobCodeDialog.ezInstance,
                EzJobCodeDialog.ezInstance.ezSaveDataTag);
        }

        return EzJobCodeDialog.ezInstance.ezPreSaveDataTag(dataTag)
            .then(
                () => ezApi.ezclocker.ezUi.ezPageWaitAsync(
                    `Saving job ${dataTag.tagName} ...`,
                    (waitDone, finished) => {
                        // Save the editor values to the active job code

                        ezApi.ezclocker.ezEventEngine.ezTriggerEvent(
                            EzJobCodeDialog.ezEventNames.onActiveJobCodeSaveStarted,
                            ezApi.ezclocker.ezEventEngine.ezBuildEventData(
                                EzJobCodeDialog.ezApiName,
                                `Saving job ${dataTag.tagName} ...`,
                                dataTag));

                        let handleUpdateCreateResponse = (jobCodeUpdateCreateResult) => {
                            return EzJobCodeDialog.ezInstance.ezPostSaveDataTag(jobCodeUpdateCreateResult)
                                .then(
                                    (saveDataTagResult) => waitDone()
                                        .then(() => finished(saveDataTagResult)));
                        };

                        return EzNumber.isNumber(dataTag.id)
                            // Update an existing data tag
                            ? EzJobCodeDialog.ezInstance.ezUpdateExistingDataTag(dataTag)
                                .then(handleUpdateCreateResponse)
                            // Create a new data tag
                            : EzJobCodeDialog.ezInstance.ezCreateNewDataTag(dataTag)
                                .then(handleUpdateCreateResponse);
                    }));
    }

    /**
     * @protected @method
        Actions performed prior to saving a data tag (update or create)
     * @param {object} dataTag
     * @returns {Promise}
        Success resolve indicates the pre-save step was successful.
        Reject response indicates the pre-save step failed and saving should not continue.
     */
    ezPreSaveDataTag(dataTag) {
        if (!EzObject.isValid(dataTag)) {
            throw new EzBadParamException(
                'dataTag',
                EzJobCodeDialog.ezInstance,
                EzJobCodeDialog.ezInstance.ezPreSaveDataTag);
        }

        return ezApi.ezPromise(
            (success, failure) => EzJobCodeDialog.ezInstance.ezValidateActiveJobCode()
                .then(
                    (validationResult) => {
                        if (!EzJobCodeDialog.ezInstance.ezProcessValidationError(validationResult)) {
                            ezApi.ezclocker.ezEventEngine.ezTriggerEvent(
                                EzJobCodeDialog.ezEventNames.onActiveJobCodeSaveError,
                                ezApi.ezclocker.ezEventEngine.ezBuildEventData(
                                    EzJobCodeDialog.ezApiName,
                                    'Validation of the editing job code failed.',
                                    {
                                        errorCode: 400,
                                        message: 'Validation of editing job failed.',
                                        dataTag: dataTag,
                                        validationResult: validationResult,
                                        response: null,
                                        eResponse: null
                                    }));

                            // Pre-save step failed - saving should not continue.
                            return failure(dataTag);
                        }

                        // Pre-save step was a success. Saving can continue.
                        return EzJobCodeDialog.ezInstance.ezPersistJobCodeEditorInputs()
                            .then(success);
                    }));
    }

    /**
     * @protected @method
        Actions performed after a DataTag is saved (updated or created).
        Caller must send either a valid ezClocker API response as the response parameter OR
        a valid ezClocker API error response as the eResponse parameter.
        If both the response parameter and eResponse parameter is valid, then only the response parameter is used.
     * @param {object} jobCodeUpdateCreateResult
        {
            errorCode: {number},
            message: {string}
            saved: {boolean},
            originalDataTag: {objet},
            updatedDataTag: {null|object}
        }
     * @returns {Promise.resolve}
     * Returns a simplified entity where the updated and/or original dataTag is returend as dataTag.
        {
            errorCode: {number}
            message: {string}
            saved: {boolean},
            dataTag: {object}
        }
     */
    ezPostSaveDataTag(jobCodeUpdateCreateResult) {
        if (!EzObject.isValid(jobCodeUpdateCreateResult)) {
            throw new EzBadParamException(
                'jobCodeUpdateCreateResult',
                EzJobCodeDialog.ezInstance,
                EzJobCodeDialog.ezInstance.ezPostSaveDataTag);
        }

        return EzPromise.asyncAction(
            (finished) => {
                if (!EzBoolean.isTrue(jobCodeUpdateCreateResult.saved)) {

                    let errorReason = EzString.stringOrDefault(
                        jobCodeUpdateCreateResult.message,
                        `EzClocker encounterd an unexpected error while saving the job ${jobCodeUpdateCreateResult.originalDataTag.tagName}`);

                    let em = `Failed to save job ${jobCodeUpdateCreateResult.originalDataTag.tagName} due to error: ${errorReason}`;

                    // Handle the error response
                    ezApi.ezclocker.ezEventEngine.ezTriggerEvent(
                        EzJobCodeDialog.ezEventNames.onActiveJobCodeSaveError,
                        ezApi.ezclocker.ezEventEngine.ezBuildEventData(
                            EzJobCodeDialog.ezApiName,
                            em,
                            {
                                errorCode: EzNumber.numberOrDefault(jobCodeUpdateCreateResult.errorCode, 500),
                                message: em,
                                dataTag: jobCodeUpdateCreateResult.originalDataTag,
                                validationResult: null
                            }));

                    return finished({
                        errorCode: jobCodeUpdateCreateResult.errorCode,
                        message: em,
                        dataTag: originalDataTag,
                        saved: false
                    });
                }

                // Otherwise, assumes a succesful response
                jobCodeUpdateCreateResult.updatedDataTag.ezIndex = jobCodeUpdateCreateResult.originalDataTag.ezIndex;
                EzJobCodeDialog.ezInstance.ezAvailableJobCodes[jobCodeUpdateCreateResult.updatedDataTag.ezIndex] = jobCodeUpdateCreateResult.updatedDataTag;

                if (EzObject.isValid(EzJobCodeDialog.ezInstance.ezActiveJobCode) &&
                    EzJobCodeDialog.ezInstance.ezActiveJobCode.id == jobCodeUpdateCreateResult.updatedDataTag.id) {
                    EzJobCodeDialog.ezInstance.ezSilentSetActiveJobCode = jobCodeUpdateCreateResult.updatedDataTag;
                }

                let successMessage = `Successfully saved job ${jobCodeUpdateCreateResult.updatedDataTag.tagName}.`;

                return finished({
                    errorCode: 0,
                    message: successMessage,
                    dataTag: jobCodeUpdateCreateResult.updatedDataTag,
                    saved: true
                });
            });
    }


    /*
    ezHandleOnActiveJobCodeSaveComplete(ezEvent) {
        if (!EzObject.isValid(ezEvent) || !EzObject.isValid(ezEvent.data)) {
            throw new EzBadParamException(
                'event',
                EzJobCodeDialog.ezInstance,
                EzJobCodeDialog.ezInstance.ezHandleOnActiveJobCodeSaveComplete);
        }

        let dataTag = ezEvent.data.dataTag;

        // Update the DataTag instance in the local cache
        EzJobCodeDialog.ezInstance.ezAvailableJobCodes[dataTag.ezIndex] = dataTag;

        EzJobCodeDialog.ezInstance.ezActiveJobCodeModified = false;

        if (EzObject.isValid(EzJobCodeDialog.ezInstance.ezActiveJobCode) &&
            EzJobCodeDialog.ezInstance.ezActiveJobCode.id == dataTag.id) {
            // If currently editing the job that was saved, update the UX to reflect
            // the updated DataTag's data.
            return EzJobCodeDialog.ezInstance.ezUpdateUxState()
                .then(
                    () => {
                        ezApi.ezclocker.ezUi.ezHideElement(EzJobCodeDialog.ezInstance.ezManageJobCodesDialogView.ezIds.containers.saveStatusContainerId);

                        if (EzBoolean.isTrue(EzJobCodeDialog.ezInstance.ezCloseAfterSaveComplete)) {
                            ezApi.ezclocker.ezDialog.ezCloseDialog(EzJobCodeDialog.ezInstance.ezManageJobCodesDialogView.ezDialogId);
                        }
                    });
        }

        ezApi.ezclocker.ezUi.ezHideElement(EzJobCodeDialog.ezInstance.ezManageJobCodesDialogView.ezIds.containers.saveStatusContainerId);

        if (EzBoolean.isTrue(EzJobCodeDialog.ezInstance.ezCloseAfterSaveComplete)) {
            ezApi.ezclocker.ezDialog.ezCloseDialog(EzJobCodeDialog.ezInstance.ezManageJobCodesDialogView.ezDialogId);
        }
    }
    */

    /**
     * @protected @method
        Displays the validation error box
     * @param {String} message
     */
    ezShowValidationError(message) {
        if (!EzString.stringHasLength(message)) {
            return; // no message
        }

        ezApi.ezclocker.ezUi.ezContent(EzJobCodeDialog.ezInstance.ezManageJobCodesDialogView.ezIds.containers.validationErrorContainerId, message);
        if (EzBoolean.isFalse(EzJobCodeDialog.ezInstance.ezValidationErrorVisible)) {
            ezApi.ezclocker.ezUi.ezShowElement(EzJobCodeDialog.ezInstance.ezManageJobCodesDialogView.ezIds.containers.validationErrorContainerId);
            EzJobCodeDialog.ezInstance.ezValidationErrorVisible = true;
        }
    }

    /**
     * @protected @method
        Hides the validation error box
     */
    ezHideValidationError() {
        if (EzBoolean.isFalse(EzJobCodeDialog.ezInstance.ezValidationErrorVisible)) {
            return;
        }

        ezApi.ezclocker.ezUi.ezSetContent(
            EzJobCodeDialog.ezInstance.ezManageJobCodesDialogView.ezIds.containers.validationErrorContainerId,
            EzString.EMPTY);

        ezApi.ezclocker.ezUi.ezHideElement(
            EzJobCodeDialog.ezInstance.ezManageJobCodesDialogView.ezIds.containers.validationErrorContainerId);

        EzJobCodeDialog.ezInstance.ezValidationErrorVisible = false;
    }

    /**
     * @protected @method
        Validates the active job code and displays the error if necessary.
     */
    ezValidate() {
        return EzPromise.asyncAction(
            (finished) => EzJobCodeDialog.ezInstance.ezValidateActiveJobCode()
                .then(
                    (validationResult) => {
                        if (EzBoolean.isFalse(validationResult.valid)) {
                            EzJobCodeDialog.ezInstance.ezShowValidationError(validationResult.message);

                            if (ezApi.ezclocker.ezUi.ezElementExists(validationResult.focusElementId) &&
                                EzString.stringHasLength(validationResult.focusElementId)) {
                                ezApi.ezclocker.ezUi.ezFocus(validationResult.focusElementId);
                            }

                            return finished(false);
                        }

                        EzJobCodeDialog.ezInstance.ezHideValidationError();

                        return finished(true);
                    }));
    }

    /**
     * @protected @method
        Processes the validation result from ezValidateActiveJobCode
     * @param {Object} validationResult
     * @returns {Boolean}
     */
    ezProcessValidationError(validationResult) {
        if (!EzObject.isValid(validationResult)) {
            EzJobCodeDialog.ezInstance.ezHideValidationError();
            return true;
        }

        if (EzBoolean.isFalse(validationResult.valid)) {
            EzJobCodeDialog.ezInstance.ezShowValidationError(validationResult.message);

            if (EzString.stringHasLength(validationResult.focusElementId)) {
                ezApi.ezclocker.ezUi.ezFocus(validationResult.focusElementId);
            }

            return false;
        }

        EzJobCodeDialog.ezInstance.ezHideValidationError();

        return true;
    }

    /**
     * @protected @method
        Validates the active job code. Returns a validation object in the form of:
            {
                valid: {Boolean},
                message: {String}
            }
     * @returns {Promise.resolve}
        Resolve contains the validation result
     */
    ezValidateActiveJobCode() {
        return EzPromise.asyncAction(
            (finished) => {
                let validationResult = {
                    valid: true,
                    message: 'Active job is valid.',
                    focusElementId: null
                };

                if (!EzObject.isValid(EzJobCodeDialog.ezInstance.ezActiveJobCode)) {
                    // Active job code is not set
                    validationResult.valid = true;

                    validationResult.message = EzString.EMPTY;

                    validationResult.focusElementId = EzJobCodeDialog.ezInstance.ezManageJobCodesDialogView.ezIds.buttons.addJobCodeButtonId;

                    return finished(validationResult);
                }

                // Job code tag name validation (must have one)
                if (!EzString.stringHasLength(EzJobCodeDialog.ezInstance.ezActiveJobCode.tagName)) {
                    validationResult.valid = false;

                    validationResult.message = 'All jobs must have a name.';

                    validationResult.focusElementId = EzJobCodeDialog.ezInstance.ezManageJobCodesDialogView.ezIds.inputs.jobCodeNameInputId;

                    return finished(validationResult);
                }

                if (EzArray.arrayHasLength(EzJobCodeDialog.ezInstance.ezAvailableJobCodes)) {
                    // Validate name is unique
                    return EzJobCodeDialog.ezInstance.ezValidateUniqueJobName(
                        EzJobCodeDialog.ezInstance.ezActiveJobCode.id,
                        EzJobCodeDialog.ezInstance.ezActiveJobCode.tagName)
                        .then(finished);
                }

                return finished(validationResult);
            });
    }

    /**
     * @protected @method
        Validates the provided jobCode's tagname is unique
     * @param {string} jobName
     */
    ezValidateUniqueJobName(jobCodeId, jobName) {
        if (!EzObject.isValid(jobCodeId)) {
            throw new EzBadParamException(
                'jobCodeId',
                EzJobCodeDialog.ezInstance,
                EzJobCodeDialog.ezInstance.ezValidateUniqueJobName);
        }
        if (!EzObject.isValid(jobName)) {
            throw new EzBadParamException(
                'jobName',
                EzJobCodeDialog.ezInstance,
                EzJobCodeDialog.ezInstance.ezValidateUniqueJobName);
        }

        return EzPromise.asyncAction(
            (finished) => {
                let validationResult = {
                    valid: true,
                    message: `Job ${jobName} is valid.`,
                    focusElementId: null
                };

                // Validate name is unique
                EzJobCodeDialog.ezInstance.ezAvailableJobCodes.forEach(
                    (aJobCode) => {
                        if (EzObject.isValid(aJobCode) && null !== aJobCode.id && aJobCode.id !== jobCodeId &&
                            aJobCode.tagName.toLowerCase() === jobName.toLowerCase()) {
                            validationResult.valid = false;

                            validationResult.message = EzString.em`
                                A job with the name ${aJobCode.tagName} already exists.
                                Please enter a unique job name.`;

                            validationResult.focusElementId = EzJobCodeDialog.ezInstance.ezManageJobCodesDialogView.ezIds.inputs.jobCodeNameInputId;

                            return finished(validationResult);
                        }
                    });

                return finished(validationResult);
            });
    }

    /**
     * @protected @method
        Archives the job code at the provided index in EzJobCodeDialog.ezInstance.ezAvailableJobCodes
     * @param {number} jobCodeIndex
     * @returns {Promise.resolve}
     * Returns if the job was archived in the resolve (true or false)
     */
    ezArchiveJobCodeAtIndex(jobCodeIndex) {
        return EzPromise.asyncAction(
            (finished) => {
                if (!EzNumber.isNumber(jobCodeIndex) || !EzArray.arrayHasLength(EzJobCodeDialog.ezInstance.ezAvailableJobCodes) ||
                    0 > jobCodeIndex || jobCodeIndex > EzJobCodeDialog.ezInstance.ezAvailableJobCodes.length) {
                    // Bad index, do nothing
                    return finished(false);
                }

                let jobCode = EzJobCodeDialog.ezInstance.ezGetAvailableJobCodeByIndex(jobCodeIndex);

                if (!EzObject.isValid(jobCode)) {
                    return finished(false);
                }

                EzJobCodeDialog.ezInstance.ezSaveIfActiveJobCodeModified()
                    .then(
                        (/* saveDataTagResponse */) => ezApi.ezclocker.ezDialog.ezShowYesNo(
                            'Archive Job Code?',
                            `Please confirm that you wish to archive the job ${jobCode.tagName}?`)
                            .then(
                                (dialogResponse) => {
                                    return !EzObject.isValid(dialogResponse) ||
                                        ezApi.ezclocker.ezDialog.YES_DIALOG_RESPONSE.dialogStatus !== dialogResponse.dialogStatus
                                        ? finished(false)
                                        : ezApi.ezclocker.ezJobCodeDialog.ezExecuteArchiveJobCode(jobCode)
                                            .then(() => finished(true));
                                }));
            });
    }

    /**
     * @protected @method
        Executes the archive job code service call
     * @param {number} jobCodeIndex
     * @returns {Promise.resolve}
     * Returns if the job was archived in the resolve (true or false)
     */
    ezExecuteArchiveJobCode(jobCode) {
        if (!EzObject.isValid(jobCode)) {
            throw new EzBadParamException(
                'jobCode',
                EzJobCodeDialog.ezInstance,
                EzJobCodeDialog.ezInstance.ezExecuteArchiveJobCode);
        }

        let jcIndex = jobCode.ezIndex;

        return ezApi.ezclocker.ezUi.ezPageWaitAsync(
            `Archiving Job ${jobCode.tagName} ...`,
            (waitDone, finished) => EzJobCodeDialog.ezInstance.ezRemovePrimaryEmployeeAssignments(jobCode)
                .then(
                    () => ezApi.ezclocker.ezDataTagService.ezArchiveDataTag(jobCode.id)
                        .then(
                            (response) => waitDone()
                                .then(
                                    () => {
                                        ezApi.ezclocker.ezEventEngine.ezTriggerEvent(
                                            EzJobCodeDialog.ezEventNames.onJobCodeDialogJobCodeArchived,
                                            ezApi.ezclocker.ezEventEngine.ezBuildEventData(
                                                EzJobCodeDialog.ezApiName,
                                                `Archived job ${jobCode.tagName}`,
                                                {
                                                    archivedJobIndex: jcIndex,
                                                    archivedJobCode: response.entity
                                                }));

                                        return finished(true);
                                    }),
                            (eResponse) => waitDone()
                                .then(
                                    () => EzJobCodeDialog.ezInstance.ezShowArchiveJobCodeError(eResponse, jobCode)
                                        .then(
                                            () => finished(false))))));
    }

    /**
     * @protected @method
     * Handles the onJobCodeDialogJobCodeArchived after a job code is archived.
     * @param {ezEvent}
        ezEvent = {
            triggerOwner: EzJobCodeDialog.ezApiName,
            message: `Archived job ${archivedJobCode.tagName}`,
            data: {archivedJobCode}
        }
     */
    ezHandleOnJobCodeDialogJobCodeArchived(ezEvent) {
        if (!EzObject.isValid(ezEvent) && !EzObject.isValid(ezEvent.data)) {
            throw new EzBadParamException(
                'ezEvent',
                EzJobCodeDialog.ezInstance,
                EzJobCodeDialog.ezInstance.ezHandleOnJobCodeDialogJobCodeArchived);
        }

        let archivedJobCode = ezEvent.data.archivedJobCode;

        archivedJobCode.ezIndex = ezEvent.data.archivedJobIndex;

        EzJobCodeDialog.ezInstance.ezAvailableJobCodes[archivedJobCode.ezIndex] = archivedJobCode;

        // Refresh the job codes
        EzJobCodeDialog.ezInstance.ezRefreshJobCodes(EzJobCodeDialog.ezInstance.ezActiveJobCode.id)
            .then(EzPromise.ignoreResolve);
    }

    /**
     * @protected @method
        Unarchives the job code at the provided index in EzJobCodeDialog.ezInstance.ezAvailableJobCodes
     * @param {number} jobCodeIndex
     * @returns {Promise.resolve}
     * Returns if the job code was unarchived
     */
    ezUnarchiveJobCodeAtIndex(jobCodeIndex) {
        return EzPromise.asyncAction(
            (finished) => {
                if (!EzNumber.isNumber(jobCodeIndex) || !EzArray.arrayHasLength(EzJobCodeDialog.ezInstance.ezAvailableJobCodes) ||
                    0 > jobCodeIndex || jobCodeIndex > EzJobCodeDialog.ezInstance.ezAvailableJobCodes.length) {
                    // Bad index, do nothing
                    return finished(false);
                }

                let jobCode = EzJobCodeDialog.ezInstance.ezGetAvailableJobCodeByIndex(jobCodeIndex);

                if (!EzObject.isValid(jobCode)) {
                    ezApi.ezclocker.logger.error(
                        EzString.em`
                            Unable to unarchive job code for index=${jobCodeIndex}.
                            Then index references a undefined or null job code instance.`);
                    return finished(false);
                }

                return EzJobCodeDialog.ezInstance.ezSaveIfActiveJobCodeModified()
                    .then(
                        (/* saveDataTagResponse */) => ezApi.ezclocker.ezDialog.ezShowYesNo(
                            'Unarchive Job',
                            `Please confirm that you wish to unarchive the job ${jobCode.tagName}?`)
                            .then(
                                (dialogResponse) => {
                                    if (!EzObject.isValid(dialogResponse) ||
                                        ezApi.ezclocker.ezDialog.YES_DIALOG_RESPONSE.dialogStatus !== dialogResponse.dialogStatus) {
                                        return finished(false);
                                    }

                                    return EzJobCodeDialog.ezInstance.ezExecuteUnarchiveJobCode(jobCode);
                                }));
            });
    }

    /**
     * @protected @method
        Performs the unarchive operation upon the provided job code
     * @param {object} jobCode
     * @returns {Promise.resolve}
        Resolve returns true if unarchived, false otherwise.
     */
    ezExecuteUnarchiveJobCode(jobCode) {
        if (!EzObject.isValid(jobCode)) {
            throw new EzBadParamException(
                'jobCode',
                EzJobCodeDialog.ezInstance,
                EzJobCodeDialog.ezInstance.ezExecuteUnarchiveJobCode);
        }

        let jcIndex = jobCode.ezIndex;

        return ezApi.ezclocker.ezUi.ezStartPageWaitResolve(
            `Unarchiving job ${jobCode.tagName} ...`,
            (resolve) => ezApi.ezclocker.ezDataTagService.ezUnarchiveDataTag(jobCode.id)
                .then(
                    (response) => {
                        let unarchivedJobCode = response.entity;

                        unarchivedJobCode.ezIndex = jcIndex;

                        ezApi.ezclocker.ezEventEngine.ezTriggerEvent(
                            EzJobCodeDialog.ezEventNames.onJobCodeDialogJobCodeUnarchived,
                            ezApi.ezclocker.ezEventEngine.ezBuildEventData(
                                EzJobCodeDialog.ezApiName,
                                `Unarchived job ${unarchivedJobCode.tagName}`,
                                {
                                    unarchivedJobCodeIndex: jcIndex,
                                    unarchivedJobCode: unarchivedJobCode
                                }));

                        return resolve(true);
                    },
                    (eResponse) => {
                        resolve(false);

                        return EzJobCodeDialog.ezInstance.ezShowArchiveJobCodeError(eResponse, jobCode);
                    }));
    }

    /**
     * @protected @method
     * Handles the onJobCodeDialogJobCodeUnarchived event
     * @param {object} ezevent
        ezEvent = {
            triggerOwner: EzJobCodeDialog.ezApiName,
            message: `Archived job ${archivedJobCode.tagName}`,
            data: {
                unarchivedJobCodeIndex: {unarchivedJobCode.ezIndex},
                unarchivedJobCode: {unarchivedJobCode}
            }
        }
     */
    ezHandleOnJobCodeDialogJobCodeUnarchived(ezEvent) {
        if (!EzObject.isValid(ezEvent) || !EzObject.isValid(ezEvent.data)) {
            throw new EzBadParamException(
                'ezEvent',
                EzJobCodeDialog.ezInstance,
                EzJobCodeDialog.ezInstance.ezHandleUnarchivedJobCodeEvent);
        }

        let unarchivedJobCode = ezEvent.data.unarchivedJobCode;

        unarchivedJobCode.ezIndex = ezEvent.data.unarchivedJobCodeIndex;

        EzJobCodeDialog.ezInstance.ezAvailableJobCodes[unarchivedJobCode.ezIndex] = unarchivedJobCode;

        EzJobCodeDialog.ezInstance.ezRefreshJobCodes(EzJobCodeDialog.ezInstance.ezActiveJobCode.id)
            .then(EzPromise.ignoreResolve);
    }

    /**
     * @protected @method
        Deletes the job code at the provided jobCodeIndex
     * @param {number} jobCodeIndex
     * @returns {Promise.resolve}
     */
    ezDeleteJobCodeAtIndex(jobCodeIndex) {
        return EzPromise.asyncAction(
            (finished) => {
                if (!EzNumber.isNumber(jobCodeIndex) || !EzArray.arrayHasLength(EzJobCodeDialog.ezInstance.ezAvailableJobCodes) ||
                    0 > jobCodeIndex || jobCodeIndex > EzJobCodeDialog.ezInstance.ezAvailableJobCodes.length) {
                    // Bad index, do nothing
                    ezApi.ezclocker.ezLogger.error(
                        'Unable to delete a job code due to an undefined, null, or out of range index reference.');

                    return finished();
                }

                let jobCode = EzJobCodeDialog.ezInstance.ezGetAvailableJobCodeByIndex(jobCodeIndex);

                if (!EzObject.isValid(jobCode)) {
                    ezApi.ezclocker.ezLogger.error(
                        EzString.em`
                            Unable to delete the job code for index=${jobCodeIndex}.
                            The index references an undefined or null job code instance.`);

                    return finished();
                }

                return ezApi.ezclocker.ezDialog.ezShowYesNo(
                    'Remove Job Code',
                    `Please confirm that you want to remove the Job ${jobCode.tagName}?`)
                    .then(
                        (dialogResponse) => {
                            return !EzObject.isValid(dialogResponse) || ezApi.ezclocker.ezDialog.YES_DIALOG_RESPONSE.dialogStatus !== dialogResponse.dialogStatus
                                ? finished()
                                : EzJobCodeDialog.ezInstance.ezExecuteDeleteJobCode(jobCode)
                                    .then(finished);
                        });
            });
    }

    /**
     * @protected @method
        Executes the delete job code action upon the provided jobcode.
     * @returns {Promise.resolve}
        Resolve returns true if deleted, false otherwise.
     */
    ezExecuteDeleteJobCode(jobCode) {
        if (!EzObject.isValid(jobCode)) {
            throw new EzBadParamException(
                'jobCode',
                EzJobCodeDialog.ezInstance,
                EzJobCodeDialog.ezInstance.ezExecuteDeleteJobCode);
        }

        return ezApi.ezclocker.ezUi.ezPageWaitAsync(
            `Deleting job code '${jobCode.tagName} ...`,
            (waitDone, finished) => {
                if (!EzNumber.isNumber(jobCode.id)) {
                    // Job was never saved, just remove it
                    return EzJobCodeDialog.ezInstance.ezRemovePrimaryEmployeeAssignments(jobCode)
                        .then(
                            () => EzJobCodeDialog.ezInstance.ezRefreshJobCodes(null)
                                .then(
                                    () => {
                                        ezApi.ezclocker.ezEventEngine.ezTriggerEvent(
                                            EzJobCodeDialog.ezEventNames.onJobCodeDialogJobCodeDeleted,
                                            ezApi.ezclocker.ezEventEngine.ezBuildEventData(
                                                EzJobCodeDialog.ezApiName,
                                                `Deleted job ${jobCode.tagName}`,
                                                {
                                                    deletedJob: jobCode
                                                }));
                                        return waitDone().then(finished);
                                    }));
                }

                return ezApi.ezclocker.ezDataTagService.ezDeleteDataTag(jobCode.id)
                    .then(
                        () => EzJobCodeDialog.ezInstance.ezRemovePrimaryEmployeeAssignments(jobCode)
                            .then(
                                () => {
                                    // NOTE: Job codes get refreshed in the handler of the below event
                                    // See: EzJobCodeDialog.ezInstance.ezHandleOnJobCodeDialogJobCodeDeleted

                                    ezApi.ezclocker.ezEventEngine.ezTriggerEvent(
                                        EzJobCodeDialog.ezEventNames.onJobCodeDialogJobCodeDeleted,
                                        ezApi.ezclocker.ezEventEngine.ezBuildEventData(
                                            EzJobCodeDialog.ezApiName,
                                            `Deleted job ${jobCode.tagName}`,
                                            {
                                                deletedJobCode: jobCode
                                            }));

                                    return waitDone().then(finished);
                                }),
                        (eResponse) => EzJobCodeDialog.ezInstance.ezShowDeleteJobCodeError(eResponse, jobCode)
                            .then(
                                () => waitDone().then(finished)));
            });
    }

    /**
     * @protected @method
        1) Re-loads the employer job codes
        2) Renders the job codes
        3) Re-select (if provided) jobCodeId
     */
    ezRefreshJobCodes(jobCodeId) {
        return EzPromise.asyncAction(
            (finished) => EzJobCodeDialog.ezInstance.ezLoadEmployerJobCodes()
                .then(
                    () => EzJobCodeDialog.ezInstance.ezRenderAvailableJobCodes()
                        .then(
                            () => {
                                return EzNumber.isNumber(jobCodeId)
                                    ? EzJobCodeDialog.ezInstance.ezActivateJobCodeForId(jobCodeId)
                                        .then(finished)
                                    : EzJobCodeDialog.ezInstance.ezActivateJobCode(null)
                                        .then(finished);
                            })));
    }

    /**
     * @protected @method
     * Handles the onJobCodeDialogJobCodeDeleted event
     * @param {object} ezevent
        ezEvent = {
            triggerOwner: EzJobCodeDialog.ezApiName,
            message: `Archived job ${archivedJobCode.tagName}`,
            data: {
                deletedJobCodeIndex: {unarchivedJobCode.ezIndex},
                deletedJobCode: {unarchivedJobCode}
            }
        }
     */
    ezHandleOnJobCodeDialogJobCodeDeleted(ezEvent) {
        if (!EzObject.isValid(ezEvent) || !EzObject.isValid(ezEvent.data)) {
            throw new EzBadParamException(
                'ezEvent',
                EzJobCodeDialog.ezInstance, EzPromise.ignoreResolve,
                EzJobCodeDialog.ezInstance.ezHandleOnJobCodeDialogJobCodeDeleted);
        }

        EzJobCodeDialog.ezInstance.ezRefreshJobCodes(null)
            .then(
                () => {
                    let nextIndex = EzJobCodeDialog.ezInstance.ezDetermineNextSelectableJobCodeIndex(ezEvent.data.deletedJobCode);

                    if (EzNumber.isNumber(nextIndex)) {
                        EzJobCodeDialog.ezInstance.ezActivateJobCodeForIndex(nextIndex)
                            .then(EzPromise.ignoreResolve);
                    } else {
                        // No active job code
                        EzJobCodeDialog.ezInstance.ezActivateJobCode(null)
                            .then(EzPromise.ignoreResolve);
                    }
                });
    }

    /**
     * @protected @method
        Determines the next selectable job code index based upon the provided jobCodeToActOn & jkobCodeToActOnIndex &
        the currently active job code.
     * @param {number} previouslyActiveJobCodeIndex
     * @returns {number}
     */
    ezDetermineNextSelectableJobCodeIndex(previouslyActiveJobCodeIndex) {
        if (!EzNumber.isNumber(previouslyActiveJobCodeIndex)) {
            return EzJobCodeDialog.ezInstance.ezGetFirstVisibleJobCodeIndex();
        }

        if (EzNumber.isNumber(EzJobCodeDialog.ezInstance.ezActiveJobCode.ezIndex) &&
            previouslyActiveJobCodeIndex !== EzJobCodeDialog.ezInstance.ezActiveJobCode.ezIndex &&
            EzBoolean.isFalse(EzJobCodeDialog.ezInstance.ezIsJobFilterHidden(EzJobCodeDialog.ezInstance.ezActiveJobCode))) {
            return EzJobCodeDialog.ezInstance.ezActiveJobCode.ezIndex;
        }

        if (previouslyActiveJobCodeIndex >= EzJobCodeDialog.ezInstance.ezAvailableJobCodes.length) {
            previouslyActiveJobCodeIndex = EzJobCodeDialog.ezInstance.ezActivateJobCodeBar.length - 1;
        }

        let nextJobCodeIndex = previouslyActiveJobCodeIndex - 1;
        while (0 <= nextJobCodeIndex &&
            EzJobCodeDialog.ezInstance.ezIsJobFilterHidden(EzJobCodeDialog.ezInstance.ezGetAvailableJobCodeByIndex(nextJobCodeIndex))) {
            nextJobCodeIndex = nextJobCodeIndex - 1;
        }

        return 0 > nextJobCodeIndex
            ? EzJobCodeDialog.ezInstance.ezGetFirstVisibleJobCodeIndex()
            : nextJobCodeIndex;
    }

    /**
     * @protected @method
        Remove the primary assigned
     * @return {Promise.resolve}
     */
    ezRemovePrimaryEmployeeAssignments(ezJobCode) {
        if (!EzObject.isValid(ezJobCode) || !EzArray.arrayHasLength(ezJobCode.ezDataTagMaps)) {
            return ezApi.ezResolve();
        }

        let employees = ezApi.ezclocker.ezClockerContext.ezGetActiveEmployer().employees;
        if (!EzArray.arrayHasLength(employees)) {
            return ezApi.ezResolve();
        }

        return EzPromise.asyncAction(
            (finished) => {
                ezJobCode.ezDataTagMaps.forEach(
                    (dataTagMap) => {
                        if (1 == dataTagMap.level) {
                            employees.forEach(
                                (employee) => {
                                    if (employee.id == dataTagMap.assignedEzEntityId) {
                                        employee.primaryEmployer = null;
                                    }
                                });
                        }
                    });
                return finished();
            });

    }

    /**
     * @protected
        Creates a new job code to the db.
     * @param {object} dataTag
     * @returns {Promise.resolve}
        Resolve returns the following entity:
        {
            errorCode: {number},
            message: {string}
            saved: {boolean},
            originalDataTag: {objet},
            updatedDataTag: {null|object}
        }
     */
    ezCreateNewDataTag(dataTag) {
        if (!EzObject.isValid(dataTag)) {
            throw new EzBadParamException(
                'dataTag',
                EzJobCodeDialog.ezInstance,
                EzJobCodeDialog.ezInstance.ezCreateNewDataTag);
        }

        return ezApi.ezclocker.ezUi.ezPageWaitAsync(
            `Creating new job ${dataTag.tagName} ...`,
            (waitDone, finished) => ezApi.ezclocker.ezDataTagService.ezCreateDataTag(dataTag)
                .then(
                    (response) => waitDone()
                        .then(
                            () => {

                                let ezDataTag = new EzDataTag();
                                ezDataTag.ezCopyFrom(response.entity);

                                return finished({
                                    errorCode: response.errorCode,
                                    message: response.message,
                                    saved: true,
                                    updatedDataTag: ezDataTag,
                                    originalDataTag: dataTag
                                });
                            }),
                    (eResponse) => waitDone()
                        .then(
                            () => {
                                ezApi.ezclocker.ezLogger.error(
                                    EzString.em`
                                        Failed to persist the new DataTag/JobCode due to error: ${eResponse.message}.
                                        [DataTag: ${ezApi.ezToJson(dataTag)}]
                                        [Error response: ${ezApi.ezToJson(eResponse)}]`);

                                return EzJobCodeDialog.ezInstance.ezShowCreateNewDataTagError(eResponse, dataTag)
                                    .then(
                                        () => finished({
                                            errorCode: eResponse.errorCode,
                                            message: eResponse.message,
                                            saved: false,
                                            originalJobCode: dataTag,
                                            updatedJobCode: null
                                        }));
                            })));
    }

    /**
     * @protected @method
        Updates the associated DataTag with the same id as the provided jobCode.
     * @param {object} dataTag
        The provided jobCode MUST have an id to put.
     * @returns {Promise.resolve}
        Resolve returns the following entity:
        {
            errorCode: {number},
            message: {string}
            saved: {boolean},
            originalDataTag: {objet},
            updatedDataTag: {null|object}
        }
     */
    ezUpdateExistingDataTag(dataTag) {
        if (!EzObject.isValid(dataTag)) {
            throw new EzBadParamException(
                'jobCode',
                EzJobCodeDialog.ezInstance,
                EzJobCodeDialog.ezInstance.ezPutJobCode);
        }
        if (!EzNumber.isNumber(dataTag.id)) {
            throw new EzBadStateException(
                'Expected the provided jobCode param to have a valid id.',
                'THe provided jobCode param has an undefined or null id.',
                EzJobCodeDialog.ezInstance,
                EzJobCodeDialog.ezInstance.ezPutJobCode);
        }

        // Create the put DataTag payload from the provided jobCode.
        let updateDataTagPayload = new EzDataTag();
        updateDataTagPayload.ezCopyFrom(dataTag);

        return ezApi.ezclocker.ezUi.ezPageWaitAsync(
            `Saving job ${dataTag.tagName} ...`,
            (waitDone, finished) => ezApi.ezclocker.ezDataTagService.ezUpdateDataTag(
                dataTag.id,
                updateDataTagPayload,
                EzEntityType.EMPLOYEE)
                .then(
                    (response) => {
                        let updateDataTag = new EzDataTag();
                        updateDataTag.ezCopyFrom(response.entity);

                        return waitDone().then(
                            () => finished({
                                errorCode: 0,
                                message: response.message,
                                saved: true,
                                originalDataTag: dataTag,
                                updatedDataTag: updateDataTag
                            }));
                    },
                    (eResponse) => {
                        ezApi.ezclocker.ezLogger.error(
                            EzString.em`
                                Failed to persist an existing DataTag/JobCode due to error: ${eResponse.message}.
                                [DataTag: ${ezApi.ezToJson(dataTag)}]
                                [Error response: ${ezApi.ezToJson(eResponse)}]`);

                        return waitDone()
                            .then(
                                () => EzJobCodeDialog.ezInstance.ezShowUpdateDataTagError(eResponse, dataTag)
                                    .then(
                                        () => finished({
                                            errorCode: eResponse.errorCode,
                                            message: eResponse.message,
                                            saved: false,
                                            originalDataTag: dataTag,
                                            updatedDataTag: null
                                        })));
                    }));
    }

    /**
     * @protected @method
        Loads employee assignments for the provided job code
     * @param {EzDataTag} jobCode
     * @returns {Promise}
        A resolve only promise.
     */
    ezGetEmployeeAssignmentsForJobCode(jobCode) {
        return ezApi.ezclocker.ezUi.ezStartPageWaitResolve(
            `Loading employee assignments for job code ${jobCode.tagName} ...`,
            (waitDone, resolve) => {
                if (!EzObject.isValid(jobCode)) {
                    return waitDone()
                        .then(
                            () => EzJobCodeDialog.ezInstance.ezShowLoadJobCodeEmployeeAssignmentsError(
                                ezApi.ezclocker.ezUi.ezCreateRejectResponse(
                                    'A valid job code is required to load employee assignments.'))
                                .then(resolve));
                }

                if (EzArray.arrayHasLength(jobCode.ezEmployeeAssignments)) {
                    return waitDone().then(resolve);
                }

                return ezApi.ezclocker.ezInternalDataTagMapApiClient.ezGetDataTagAssignments(jobCode.id, EzEntityType.EMPLOYEE)
                    .then(
                        (response) => waitDone()
                            .then(
                                () => {
                                    if (!EzObject.isValid(response) || 0 != response.errorCode) {
                                        return EzJobCodeDialog.ezInstance.ezShowLoadJobCodeEmployeeAssignmentsError(response, jobCode)
                                            .then(resolve);
                                    }

                                    jobCode.ezEmployeeAssignments = EzArray.arrayHasLength(response.entities)
                                        ? response.entities
                                        : [];

                                    return resolve();
                                }),
                        (eResponse) => waitDone()
                            .then(
                                () => EzJobCodeDialog.ezInstance.ezShowLoadJobCodeEmployeeAssignmentsError(eResponse, jobCode)
                                    .then(resolve)));
            });
    }

    /**
     * @protected @method
        Obtains the logged in employer's available job codes from the API
     * @returns {Promise}
        A resolve only promise.
     */
    ezLoadEmployerJobCodes() {
        return ezApi.ezclocker.ezUi.ezStartPageWaitResolve(
            'Loading available Job Codes ...',
            (waitDone, resolve) => ezApi.ezclocker.ezDataTagService.ezGetDataTagsByEmployerIdWithFilteredAssignedEntityTypeName(
                EzDataTagType.JOB_CODE,
                EzEntityType.EMPLOYEE)
                .then(
                    (response) => waitDone()
                        .then(
                            () => {
                                EzJobCodeDialog.ezInstance.ezAvailableJobCodes = response.entities;

                                if (!EzArray.arrayHasLength(EzJobCodeDialog.ezInstance.ezAvailableJobCode)) {
                                    return resolve();
                                }

                                let assignmentLoadCount = 0;

                                let handleLoadJobCodeAssignmentResponse = () => {
                                    assignmentLoadCount++;
                                    if (assignmentLoadCount >= EzJobCodeDialog.ezInstance.ezAvailableJobCodes.length) {
                                        return resolve();
                                    }
                                }

                                for (let dataTag of EzJobCodeDialog.ezInstance.ezAvailableJobCodes) {
                                    EzJobCodeDialog.ezInstance.ezLoadJobCodeAssignments(dataTag)
                                        .then(handleLoadJobCodeAssignmentResponse);
                                }
                            }),
                    (eResponse) => waitDone()
                        .then(
                            () => {
                                ezApi.ezclocker.ezLogger.error(
                                    EzString.em`
                                        Failed to load the employer's job codes due to the following error: ${eResponse.message}
                                        Error response: ${ezApi.ezToJson(eResponse)}`);

                                EzJobCodeDialog.ezInstance.ezAvailableJobCodes = [];

                                return EzJobCodeDialog.ezInstance.ezShowGetEmployerJobCodesError(eResponse)
                                    .then(resolve);
                            })));
    }

    /**
     * @protected @method
     * Sets the EzJobCodeDialog.ezInstance.ezAvailableJobCodes value at the provided availableJobCOdeIndex equal to the provided
        jobCode.
        Will throw if the provided jobCode is null or undefined. Will ignore setting if the index is null,
        undefined, or out of range.
     * @param {number} availableJobCodeIndex
     * @param {Object} jobCode
     */
    ezSetAvailableJobCodeByIndex(availableJobCodeIndex, jobCode) {
        if (!EzObject.isValid(jobCode)) {
            throw new EzBadParamException(
                'jobCode',
                EzJobCodeDialog.ezInstance,
                EzJobCodeDialog.ezInstance.ezSetAvailableJobCodeByIndex);
        }

        if (!EzNumber.isNumber(availableJobCodeIndex)) {
            ezApi.ezclocker.ezLogger.error(
                EzString.em`
                    A valid availableJobCodeIndex param is required to set a job code reference in the
                    EzJobCodeDialog.ezInstance.ezAvailableJobCodes array.`);
            return null;
        }

        if (0 > availableJobCodeIndex || availableJobCodeIndex < EzJobCodeDialog.ezInstance.ezAvailableJobCodes.length) {
            ezApi.ezclocker.ezLogger.error(
                EzString.em`
                    Unable to set a job code at a specific index in the EzJobCodeDialog.ezInstance.ezAvailableJobCodes array.
                    The provided availableJobCodeIndex=${availableJobCodeIndex} is out of range for the
                    EzJobCodeDialog.ezInstance.ezAvailableJobCodes array.`);
            return null;
        }

        EzJobCodeDialog.ezInstance.ezAvailableJobCodes[availableJobCodeIndex] = jobCode;

        jobCode.ezIndex = availableJobCodeIndex;
    }

    /**
     * @protected @method
     * Returns the job code in the EzJobCodeDialog.ezInstance.ezAvailableJobCodes array at the provided index.
        If the index is out of range or not an number, null is returned.
     * @param {number} availableJobCodeIndex
     * @returns {Object|null}
     * Returns the job code at the availableJobCodeIndex or null.
     */
    ezGetAvailableJobCodeByIndex(availableJobCodeIndex) {
        if (!EzNumber.isNumber(availableJobCodeIndex)) {
            ezApi.ezclocker.ezLogger.error(
                EzString.em`
                    A valid availableJobCodeIndex param is required to obtain a job code reference from the
                    EzJobCodeDialog.ezInstance.ezAvailableJobCodes array. Returned null as the result.`);
            return null;
        }
        if (0 > availableJobCodeIndex || availableJobCodeIndex >= EzJobCodeDialog.ezInstance.ezAvailableJobCodes.length) {
            ezApi.ezclocker.ezLogger.error(
                EzString.em`
                    The provided availableJobCodeIndex=${availableJobCodeIndex} is out of range for the
                    EzJobCodeDialog.ezInstance.ezAvailableJobCodes array. Returning null as the response.`);
            return null;
        }

        let jobCode = EzJobCodeDialog.ezInstance.ezAvailableJobCodes[availableJobCodeIndex];

        if (!EzObject.isValid(jobCode)) {
            ezApi.ezclocker.ezLogger.error(
                EzString.em`
                    Detected that the job code reference EzJobCodeDialog.ezInstance.ezAvailableJobCodes at
                    index=${availableJobCodeIndex} is undefined or null.
                    Available job codes should not have undefined or null references!`);
            return null;
        }

        return jobCode;
    }

    /**
     * @protected @method
     * Returns the ezAvailableJobCodes array. The result is guaranteed to be an array, empty array is returned
        if the internal ezAvailableJobCodes storage is not a valid array.
     * @returns {Array}
     */
    ezGetAvailableJobCodes() {
        return ezApi.ezArrayOrEmpty(ezApi.ezclocker.ezJobCodeDialog.ezAvailableJobCodes);
    }

    /**
     * @protected @method
     * Returns the jobCode associated with the provided Id if it exists in the internal ezAvailableJobCodesById
        object.
     * @param {number} jobCodeId
     * @returns {Object|null}
     */
    ezGetJobCodeById(jobCodeId) {
        if (!EzNumber.isNumber(jobCodeId)) {
            throw new EzBadParamException(
                'jobCodeId',
                EzJobCodeDialog.ezInstance,
                EzJobCodeDialog.ezInstance.ezGetJobCodeById);
        }

        return ezApi.ezHasOwnProperty(EzJobCodeDialog.ezInstance.ezAvailableJobCodesById, jobCodeId)
            ? EzJobCodeDialog.ezInstance.ezAvailableJobCodesById[jobCodeId.toString()]
            : null;
    }

    /**
     * @protected @method
        Indexes the job codes so that each job code knows it's location in the ezAvailableJobCode array.
        Also builds an object that indexes each job code by id (if they have one)
     */
    ezIndexAvailableJobCodes() {
        if (!EzArray.arrayHasLength(EzJobCodeDialog.ezInstance.ezAvailableJobCodes)) {
            return;
        }

        EzJobCodeDialog.ezInstance.ezAvailableJobCodesById = {};

        EzJobCodeDialog.ezInstance.ezSortAvailableJobCodesByTagName();

        for (let index = 0; index < EzJobCodeDialog.ezInstance.ezAvailableJobCodes.length; index++) {
            let jobCode = EzJobCodeDialog.ezInstance.ezGetAvailableJobCodeByIndex(index);

            if (EzObject.isValid(jobCode)) {
                jobCode.ezIndex = index;

                if (EzNumber.isNumber(jobCode.id)) {
                    // Does not include job codes with null ids
                    EzJobCodeDialog.ezInstance.ezAvailableJobCodesById[jobCode.id.toString()] = jobCode;
                }
            }
        }
    }

    /**
     * @protected @method
        Sortes the available job codes by tag name.
     */
    ezSortAvailableJobCodesByTagName() {
        if (!EzArray.arrayHasLength(EzJobCodeDialog.ezInstance.ezAvailableJobCodes)) {
            return;
        }

        EzJobCodeDialog.ezInstance.ezAvailableJobCodes.sort(
            (jobCodeA, jobCodeB) => {
                let tagNameA = EzObject.isValid(jobCodeA) && EzString.stringHasLength(jobCodeA.tagName)
                    ? jobCodeA.tagName.trim().toUpperCase()
                    : EzString.EMPTY;

                let tagNameB = EzObject.isValid(jobCodeB) && EzString.stringHasLength(jobCodeB.tagName)
                    ? jobCodeB.tagName.trim().toUpperCase()
                    : EzString.EMPTY;

                if (tagNameA === tagNameB) {
                    return 0;
                }

                return EzJobCodeDialog.ezInstance.ezAlphaNumericOrderTagNames(tagNameA, tagNameB);
            });
    }

    /**
     * @protected @method
        Determines tagNameA's alpha numeric order is before tagNameB
     * @returns {Boolean}
     */
    ezAlphaNumericOrderTagNames(tagNameA, tagNameB) {
        let alist = tagNameA.split(/(\d+)/);
        let blist = tagNameB.split(/(\d+)/);

        if (EzString.EMPTY === alist.slice(-1)) {
            alist.pop();
        }

        if (EzString.EMPTY === blist.slice(-1)) {
            blist.pop();
        }

        for (let i = 0, len = alist.length; i < len; i++) {
            if (alist[i] !== blist[i]) {
                return alist[i].match(/\d/)
                    ? +alist[i] - +blist[i]
                    : alist[i].localeCompare(blist[i]);
            }
        }

        return true;
    }

    /**
     * @protected @method
     * Sets the primaryJobCodeId to null for ezClockerContext stored employee's
        included in the provided array of ids.
     * @parm {Array} employeeIds
     */
    ezClearEmployeeEntitiesPrimaryJobCodeId(employeeIds) {
        if (!EzArray.arrayHasLength(employeeIds)) {
            return;
        }

        let employerContext = ezApi.ezclocker.ezClockerContext.employerContext;

        for (let index in employeeIds) {
            let employeeId = employeeIds[index];

            if (EzObject.hasProperty(employerContext.selectedEmployerAccountEmployeeAccountsById, employeeId)) {
                employerContext.selectedEmployerAccountEmployeeAccountsById[employeeId].primaryJobCodeId = null;
            }
        }
    }

    /**
     * @protected @method
        Hides the editors
     */
    ezHideEditors() {
        ezApi.ezclocker.ezUi.ezHideElement(EzJobCodeDialog.ezInstance.ezManageJobCodesDialogView.ezIds.containers.editingContainerId);
    }

    /**
     * @protected @method
     * Shows the editors
     */
    ezShowEditors() {
        ezApi.ezclocker.ezUi.ezShowElement(EzJobCodeDialog.ezInstance.ezManageJobCodesDialogView.ezIds.containers.editingContainerId);
    }

    /**
     * @protected @method
        Refreshes the active job code bars. Used when job codes are added or removed to make sure the sorting
        and indexing is correct.
     * @returns {Promise.resolve}
     */
    ezRefreshJobCodeBars(jobCodeId) {
        return EzPromise.asyncAction(
            (finished) => {
                EzJobCodeDialog.ezInstance.ezHasVisibleJobs = EzJobCodeDialog.ezInstance.ezManageJobCodesDialogView.ezBuildJobCodeBarsHtml
                    .apply(
                        EzJobCodeDialog.ezInstance.ezManageJobCodesDialogView,
                        [
                            EzJobCodeDialog.ezInstance.ezAvailableJobCodes,
                            EzJobCodeDialog.ezInstance.ezJobCodeFilterSelectValue
                        ]);

                if (EzBoolean.isFalse(EzJobCodeDialog.ezInstance.ezHasVisibleJobs)) {
                    EzJobCodeDialog.ezInstance.ezHideEditors();
                    EzJobCodeDialog.ezInstance.ezShowVisualHelpPanel();
                    return finished();
                }

                // After refreshing, select the provided jobcode that matches the jobCodeId
                if (EzNumber.isNumber(jobCodeId)) {
                    return EzJobCodeDialog.ezInstance.ezActivateJobCodeForId(jobCodeId)
                        .then(
                            () => {
                                if (EzObject.isValid(EzJobCodeDialog.ezInstance.ezActiveJobCode)) {
                                    EzJobCodeDialog.ezInstance.ezScrollJobCodeBarIntoView(EzJobCodeDialog.ezInstance.ezActiveJobCode.ezIndex);
                                }
                                return finished();
                            });
                }

                // If an activeJob code is available, then scroll to that jobBar
                if (EzObject.isValid(EzJobCodeDialog.ezInstance.ezActiveJobCode)) {
                    return EzJobCodeDialog.ezInstance.ezSelectJobCodeBarForIndex(EzJobCodeDialog.ezInstance.ezActiveJobCode.ezIndex)
                        .then(
                            () => {
                                if (EzObject.isValid(EzJobCodeDialog.ezInstance.ezActiveJobCode)) {
                                    EzJobCodeDialog.ezInstance.ezScrollJobCodeBarIntoView(EzJobCodeDialog.ezInstance.ezActiveJobCode.ezIndex);
                                }
                                return finished();
                            });
                }

                // Otherwise, select the first JobCode
                ezApi.ezclocker.ezUi.ezScrollTo(
                    EzJobCodeDialog.ezInstance.ezManageJobCodesDialogView.ezIds.containers.availableJobCodesContainerId,
                    0,
                    0);

                let firstVisibleIndex = EzJobCodeDialog.ezInstance.ezGetFirstVisibleJobCodeIndex();

                if (EzNumber.isNumber(firstVisibleIndex)) {
                    return EzJobCodeDialog.ezInstance.ezSelectJobCodeBarForIndex(firstVisibleIndex)
                        .then(finished);
                }

                return finished();
            });
    }

    /**
     * @public @method
     * Scolles the Job Code bar into view
     * @param {number} jobCodeIndex
     */
    ezScrollJobCodeBarIntoView(jobCodeIndex) {
        if (!EzNumber.isNumber(jobCodeIndex)) {
            return;
        }

        let jobCodeBarId = `EzJobCodeDialog_JobCodeBar${jobCodeIndex}`;

        if (ezApi.ezclocker.ezUi.ezElementExists(jobCodeBarId)) {
            ezApi.ezclocker.ezUi.ezScrollIntoView(jobCodeBarId);
        }
    }

    /**
     * @protected @method
     * Renders the available job code bars
     * @returns {Promise.resolve}
     */
    ezRenderAvailableJobCodes() {
        return EzPromise.asyncAction(
            (finished) => {
                EzJobCodeDialog.ezInstance.ezHasVisibleJobs = EzJobCodeDialog.ezInstance.ezManageJobCodesDialogView.ezBuildJobCodeBarsHtml
                    .apply(
                        EzJobCodeDialog.ezInstance.ezManageJobCodesDialogView,
                        [
                            EzJobCodeDialog.ezInstance.ezAvailableJobCodes,
                            EzJobCodeDialog.ezInstance.ezJobCodeFilterSelectValue
                        ]);

                if (EzBoolean.isFalse(EzJobCodeDialog.ezInstance.ezHasVisibleJobs)) {
                    EzJobCodeDialog.ezInstance.ezHideEditors();
                    EzJobCodeDialog.ezInstance.ezShowVisualHelpPanel();
                    return finished();
                }

                ezApi.ezclocker.ezUi.ezScrollTo(
                    EzJobCodeDialog.ezInstance.ezManageJobCodesDialogView.ezIds.containers.availableJobCodesContainerId,
                    0,
                    0);

                let firstVisibleIndex = EzJobCodeDialog.ezInstance.ezGetFirstVisibleJobCodeIndex();

                if (EzNumber.isNumber(firstVisibleIndex)) {
                    return EzJobCodeDialog.ezInstance.ezSelectJobCodeBarForIndex(firstVisibleIndex)
                        .then(finished);
                }

                return finished();
            });
    }

    /**
     * @protected @method
     * Returns if a job code is hiddent due to the current filter
     * @param {Object} jobCode
     * @returns {Boolean}
     */
    ezIsJobFilterHidden(jobCode) {
        if (!EzObject.isValid(jobCode)) {
            return true;
        }

        switch (EzJobCodeDialog.ezInstance.ezJobCodeFilterSelectValue) {
            case EzJobCodeFilterType.ACTIVE:
                return EzBoolean.isTrue(jobCode.archived) || EzBoolean.isFalse(jobCode.enabled);
            case EzJobCodeFilterType.ARCHIVED:
                return !EzBoolean.isTrue(jobCode.archived);
            case EzJobCodeFilterType.DISABLED:
                return !EzBoolean.isFalse(jobCode.enabled);
            case EzJobCodeFilterType.UNKNOWN:
            case EzJobCodeFilterType.ALL:
            default:
                return false;
        }
    }

    /**
     * @protected @method
     * Activates the job code bar associated with the provided jobCodeIndex
     * @param {number} jobCodeIndex
     */
    ezActivateJobCodeBar(jobCodeIndex) {
        if (!EzArray.arrayHasLength(EzJobCodeDialog.ezInstance.ezAvailableJobCodes) || !EzNumber.isNumber(jobCodeIndex) || 0 > jobCodeIndex ||
            EzJobCodeDialog.ezInstance.ezAvailableJobCodes.length < jobCodeIndex) {
            ezApi.ezclocker.ezLogger.error(`Unable to activate the job code bar at index=${jobCodeIndex}`);
            return;
        }

        ezApi.ezclocker.ezUi.ezAddElementClass(
            `EzJobCodeDialog_JobCodeBar${jobCodeIndex}`,
            'ezActivateddJobCodeBar');

        ezApi.ezclocker.ezUi.ezAddElementClass(
            `EzJobCodeDialog_JobCodeBar_JobCodeName${jobCodeIndex}`,
            'ezActivatedJobCodeName');

        ezApi.ezclocker.ezUi.ezAddElementClass(
            `EzJobCodeDialog_JobCodeBar_JobCodeCode${jobCodeIndex}`,
            'ezActivatedJobCodeCode');
    }

    /**
     * @protected @method
     * De-activates the job code bar associated with the provided jobCodeIndex
     */
    ezDeActivateJobCodeBar() {
        if (EzArray.arrayHasLength(EzJobCodeDialog.ezInstance.ezAvailableJobCodes) &&
            EzObject.isValid(EzJobCodeDialog.ezInstance.ezActiveJobCode) &&
            EzNumber.isNumber(EzJobCodeDialog.ezInstance.ezActiveJobCode.ezIndex) &&
            ezApi.ezclocker.ezUi.ezElementExists(`EzJobCodeDialog_JobCodeBar${EzJobCodeDialog.ezInstance.ezActiveJobCode.ezIndex}`)) {
            EzJobCodeDialog.ezInstance.ezDeactiveJobCodeBarForJobCodeIndex(EzJobCodeDialog.ezInstance.ezActiveJobCode.ezIndex);
        } else {
            // Deactivate ALL the bars
            EzJobCodeDialog.ezInstance.ezDeActivateAllJobCodeBars();
        }
    }

    /**
     * @protected @method
     * Deactivates ALL the job code bars (resetting to default)
     */
    ezDeActivateAllJobCodeBars() {
        for (let index = 0; index < EzJobCodeDialog.ezInstance.ezAvailableJobCodes.length; index++) {
            EzJobCodeDialog.ezInstance.ezDeactiveJobCodeBarForJobCodeIndex(index);
        }
    }

    /**
     * @protected @method
     * Deactivates the job code bar associated with the provided jobCodeIndex.
     * @param {undefined|null|number} jobCodeIndex
     */
    ezDeactiveJobCodeBarForJobCodeIndex(jobCodeIndex) {
        if (EzNumber.isNumber(jobCodeIndex) && 0 <= jobCodeIndex && ezApi.ezElementExists(`EzJobCodeDialog_JobCodeBar${jobCodeIndex}`)) {
            ezApi.ezclocker.ezUi.ezRemoveClass(
                `EzJobCodeDialog_JobCodeBar${jobCodeIndex}`,
                'ezActivateddJobCodeBar');

            ezApi.ezclocker.ezUi.ezRemoveClass(
                `EzJobCodeDialog_JobCodeBar_JobCodeName${jobCodeIndex}`,
                'ezActivatedJobCodeName');

            ezApi.ezclocker.ezUi.ezRemoveClass(
                `EzJobCodeDialog_JobCodeBar_JobCodeCode${jobCodeIndex}`,
                'ezActivatedJobCodeCode');
        }
    }

    /**
     * @protected @method
     * Updates the UX state based upon current dialog data
     * @returns {Promise.resolve}
     */
    ezUpdateUxState() {
        return EzPromise.asyncAction(
            (finished) => EzJobCodeDialog.ezInstance.ezUpdateUxStateActiveJobCodeEditors()
                .then(EzJobCodeDialog.ezInstance.ezUpdateUxStateAssignedEmployeesList)
                .then(EzJobCodeDialog.ezInstance.ezUpdateUxStateArchiveUnarchiveButtons)
                .then(EzJobCodeDialog.ezInstance.ezUpdateUxStateActiveJobCodeBar)
                .then(
                    () => EzJobCodeDialog.ezInstance.ezManageJobCodesDialogView.ezFitAvailableJobCodesListToView
                        .apply(EzJobCodeDialog.ezInstance.ezManageJobCodesDialogView))
                .then(finished));
    }

    /**
     * @protected @method
     * Updates the Active Job Code editors state based upon current dialog data
     * @returns {Promise.resolve}
     */
    ezUpdateUxStateActiveJobCodeEditors() {
        return EzPromise.asyncAction(
            (finished) => {
                if (!EzObject.isValid(EzJobCodeDialog.ezInstance.ezActiveJobCode)) {
                    // No active job code selected
                    EzJobCodeDialog.ezInstance.ezManageJobCodesDialogView.ezShowHideModifiedIndicator
                        .apply(EzJobCodeDialog.ezInstance.ezManageJobCodesDialogView, [false]);

                    // Set the Name input to empty string
                    EzJobCodeDialog.ezInstance.ezJobCodeNameInputValue = EzString.EMPTY;

                    // Set the Code input to empty string
                    EzJobCodeDialog.ezInstance.ezJobCodeCodeInputValue = EzString.EMPTY;

                    if (ezApi.ezclocker.ezUi.ezElementExists(`${EzJobCodeDialog.ezInstance.ezManageJobCodesDialogView.ezIds.inputs.hourlyRateInputPrefixId}A`)) {
                        // Set the hourly rate A input to '0.00'
                        EzJobCodeDialog.ezInstance.ezHourlyRateAInputValue = '0.00';
                    }

                    if (ezApi.ezclocker.ezUi.ezElementExists(`${EzJobCodeDialog.ezInstance.ezManageJobCodesDialogView.ezIds.inputs.hourlyRateInputPrefixId}B`)) {
                        // Set the hourly rate A input to '0.00'
                        EzJobCodeDialog.ezInstance.ezHourlyRateBInputValue = '0.00';
                    }

                    // Clear any existing employee assignment html
                    ezApi.ezclocker.ezUi.ezContent(
                        EzJobCodeDialog.ezInstance.ezManageJobCodesDialogView.ezIds.containers.assignedEmployeesContainerId,
                        EzString.EMPTY);

                    // Uncheck the assign all employees checkbox
                    EzJobCodeDialog.ezInstance.ezSilentSetAssignToAllEmployeesCheckbox(false);

                    // Clear any employee assignment cards
                    ezApi.ezclocker.ezUi.ezSetContent(
                        EzJobCodeDialog.ezInstance.ezManageJobCodesDialogView.ezIds.containers.assignedEmployeesContainerId,
                        EzString.EMPTY);

                    // Disable the editors
                    EzJobCodeDialog.ezInstance.ezEnableDisableJobCodeEditors(false);

                    // No job code selected
                    EzJobCodeDialog.ezInstance.ezShowVisualHelpPanel();

                    return finished();
                }

                // Active job code is selected

                EzJobCodeDialog.ezInstance.ezHideVisualHelpPanel();

                // Enable the editors if not archived and enabled boolean is true
                EzJobCodeDialog.ezInstance.ezEnableDisableJobCodeEditors(
                    EzBoolean.isFalse(EzJobCodeDialog.ezInstance.ezActiveJobCode.archived) &&
                    EzBoolean.isTrue(EzJobCodeDialog.ezInstance.ezActiveJobCode.enabled));

                // Set the Job Code's Name input value with the active job codes tagName property
                EzJobCodeDialog.ezInstance.ezJobCodeNameInputValue = EzJobCodeDialog.ezInstance.ezActiveJobCode.tagName;

                // Set the job codes Code input value from the active job codes description property.
                EzJobCodeDialog.ezInstance.ezJobCodeCodeInputValue = EzJobCodeDialog.ezInstance.ezActiveJobCode.description;

                const numericValue = parseFloat(EzJobCodeDialog.ezInstance.ezActiveJobCode.value);

                if (ezApi.ezclocker.ezUi.ezElementExists(`${EzJobCodeDialog.ezInstance.ezManageJobCodesDialogView.ezIds.inputs.hourlyRateInputPrefixId}A`)) {
                    // Set the job code's hourly rate input value from the active job code's value property.
                    EzJobCodeDialog.ezInstance.ezHourlyRateAInputValue = isNaN(numericValue) || 0 > numericValue
                        ? '0.00'
                        : numericValue.toFixed(2);
                }

                if (ezApi.ezclocker.ezUi.ezElementExists(`${EzJobCodeDialog.ezInstance.ezManageJobCodesDialogView.ezIds.inputs.hourlyRateInputPrefixId}B`)) {
                    // Set the job code's hourly rate input value from the active job code's value property.
                    EzJobCodeDialog.ezInstance.ezHourlyRateBInputValue = isNaN(numericValue) || 0 > numericValue
                        ? '0.00'
                        : numericValue.toFixed(2);
                }

                EzJobCodeDialog.ezInstance.ezManageJobCodesDialogView.ezShowHideModifiedIndicator.apply(
                    EzJobCodeDialog.ezInstance.ezManageJobCodesDialogView,
                    [EzJobCodeDialog.ezInstance.ezActiveJobCodeModified]);

                return finished();
            });
    }

    /**
     * @protected @method
     * Updates the Archive/Unarchive buttons based on current dialog data and state.
     * @returns {Promise.resolve}
     */
    ezUpdateUxStateArchiveUnarchiveButtons() {
        return EzPromise.asyncAction(
            (finished) => {
                if (!EzObject.isValid(EzJobCodeDialog.ezInstance.ezActiveJobCode)) {
                    // No active job code

                    ezApi.ezclocker.ezUi.ezHideElement(EzJobCodeDialog.ezInstance.ezManageJobCodesDialogView.ezIds.buttons.editorArchiveJobCodeButtonId);
                    ezApi.ezclocker.ezUi.ezHideElement(EzJobCodeDialog.ezInstance.ezManageJobCodesDialogView.ezIds.buttons.editorUnarchiveJobCodeButtonId);

                    return finished();
                }

                if (EzBoolean.isTrue(EzJobCodeDialog.ezInstance.ezActiveJobCode.archived)) {
                    // Enable un-archive buttons
                    ezApi.ezclocker.ezUi.ezHideElement(EzJobCodeDialog.ezInstance.ezManageJobCodesDialogView.ezIds.buttons.editorArchiveJobCodeButtonId);
                    ezApi.ezclocker.ezUi.ezShowElement(EzJobCodeDialog.ezInstance.ezManageJobCodesDialogView.ezIds.buttons.editorUnarchiveJobCodeButtonId);

                    return finished();
                }

                // Enable archive buttons
                ezApi.ezclocker.ezUi.ezHideElement(EzJobCodeDialog.ezInstance.ezManageJobCodesDialogView.ezIds.buttons.editorUnarchiveJobCodeButtonId);
                ezApi.ezclocker.ezUi.ezShowElement(EzJobCodeDialog.ezInstance.ezManageJobCodesDialogView.ezIds.buttons.editorArchiveJobCodeButtonId);

                return finished();
            });
    }

    /**
     * @protected @method
     * Updates the active job code's assigned employee list's UX state.
     * Updates the assigned employee cards if not assigned to all employees.
     * Checks the assigned to all employees checkbox if any DataTagMap for the active job
     * has the assignToAllEntities flag as true.
     * Also cleans up the array of ezDataTagMaps for the active job by removing
     * 'unnecessary' and orghaned DataTagMaps.
     * @returns {Promise.resolve}
     */
    ezUpdateUxStateAssignedEmployeesList() {
        return EzPromise.asyncAction(
            (finished) => {
                // Clear assigned employees data
                ezApi.ezclocker.ezUi.ezSetContent(
                    EzJobCodeDialog.ezInstance.ezManageJobCodesDialogView.ezIds.containers.assignedEmployeesContainerId,
                    EzString.EMPTY);

                if (!EzObject.isValid(EzJobCodeDialog.ezInstance.ezActiveJobCode)) {
                    EzJobCodeDialog.ezInstance.ezDisableAssignEmployeeEditing();
                    return finished();
                }

                if (!EzArray.arrayHasLength(EzJobCodeDialog.ezInstance.ezActiveJobCode.ezDataTagMaps)) {
                    EzJobCodeDialog.ezInstance.ezEnableAssignEmployeeEditing();
                    return finished();
                }

                let cleanEzDataTagMaps = [];

                let assignedToAll = false;

                // Update the assigned employees UX based upon the data tab maps on the active job code.
                for (let index = 0; index < EzJobCodeDialog.ezInstance.ezActiveJobCode.ezDataTagMaps.length; index++) {
                    let dataTagMap = EzJobCodeDialog.ezInstance.ezActiveJobCode.ezDataTagMaps[index];

                    if (EzObject.isValid(dataTagMap) && EzEntityType.EMPLOYEE === dataTagMap.assignedEzEntityTypeName) {
                        if (EzBoolean.isTrue(dataTagMap.assignedToAllEntities)) {
                            // If one of the DataTagMaps has their assignedToAllEntities flag as true then
                            // all other maps can get ignored.
                            assignedToAll = true;
                            cleanEzDataTagMaps.push(dataTagMap);
                        } else if (EzBoolean.isFalse(assignedToAll) && EzNumber.isNumber(dataTagMap.assignedEzEntityId)) {
                            // Found a DataTagMap with a employee id assignment - generate the the assigned employee card HTML

                            cleanEzDataTagMaps.push(dataTagMap);

                            dataTagMap.ezDataTagMapIndex = index;

                            EzJobCodeDialog.ezInstance.ezManageJobCodesDialogView.ezBuildAndAppendAssignedEmployeeHtml(
                                EzJobCodeDialog.ezInstance.ezActiveJobCode,
                                dataTagMap);
                        } else {
                            // No additional processing needed after deleting orphaned data tags.
                            EzJobCodeDialog.ezInstance.ezDeleteOrphanedDataTagMap(dataTagMap)
                                .then(EzPromise.ignoreResolve);
                        }

                    }
                }

                // Updated the active job's ezDataTagMaps with removed 'unncessary/junk' or orghaned DataTagMaps
                EzJobCodeDialog.ezInstance.ezActiveJobCode.ezDataTagMaps = cleanEzDataTagMaps;

                if (EzBoolean.isTrue(assignedToAll)) {
                    EzJobCodeDialog.ezInstance.ezDisableAssignEmployeeEditing();
                } else {
                    EzJobCodeDialog.ezInstance.ezEnableAssignEmployeeEditing();
                }

                return finished();
            });
    }

    /**
     * @protected @method
     * Updates the Job Code Bar for the active job code with the latest tagName and description data
     */
    ezUpdateUxStateActiveJobCodeBar() {
        return EzPromise.asyncAction(
            (finished) => {
                EzJobCodeDialog.ezInstance.ezDeActivateAllJobCodeBars();

                if (!EzObject.isValid(EzJobCodeDialog.ezInstance.ezActiveJobCode) || !EzNumber.isNumber(EzJobCodeDialog.ezInstance.ezActiveJobCode.ezIndex)) {
                    return finished();
                }

                EzJobCodeDialog.ezInstance.ezActivateJobCodeBar(EzJobCodeDialog.ezInstance.ezActiveJobCode.ezIndex);

                EzJobCodeDialog.ezInstance.ezScrollJobBarIntoView(EzJobCodeDialog.ezInstance.ezActiveJobCode);

                ezApi.ezclocker.ezUi.ezContent(`EzJobCodeDialog_JobCodeBar_JobCodeName${EzJobCodeDialog.ezInstance.ezActiveJobCode.ezIndex}`,
                    EzString.stringHasLength(EzJobCodeDialog.ezInstance.ezActiveJobCode.tagName)
                        ? EzJobCodeDialog.ezInstance.ezActiveJobCode.tagName
                        : EzString.EMPTY);

                ezApi.ezclocker.ezUi.ezContent(`EzJobCodeDialog_JobCodeBar_JobCodeCode${EzJobCodeDialog.ezInstance.ezActiveJobCode.ezIndex}`,
                    EzString.stringHasLength(EzJobCodeDialog.ezInstance.ezActiveJobCode.description)
                        ? EzJobCodeDialog.ezInstance.ezActiveJobCode.description
                        : EzString.EMPTY);

                return finished();
            });
    }

    /**
     * @protected @method
     * Sets the assign to all employee's checkbox checked value but ignores any change events.
     * @param {boolean checked
     */
    ezSilentSetAssignToAllEmployeesCheckbox(checked) {
        EzJobCodeDialog.ezInstance.ezIgnoreAssignAllEmployeesCheckboxEvents = true;
        ezApi.ezclocker.ezUi.ezSetCheckboxValue(
            EzJobCodeDialog.ezInstance.ezManageJobCodesDialogView.ezIds.inputs.assignToAllEmployeesCheckboxId,
            EzBoolean.isTrue(checked));
        EzJobCodeDialog.ezInstance.ezIgnoreAssignAllEmployeesCheckboxEvents = false;
    }

    /**
     * @protected @method
     * Disables assigned employee editing and sets the assign to all employees checkbox to true
     */
    ezDisableAssignEmployeeEditing() {
        // Assigned to all checkbox is checked
        EzJobCodeDialog.ezInstance.ezSilentSetAssignToAllEmployeesCheckbox(true);

        ezApi.ezclocker.ezUi.ezHideElement(EzJobCodeDialog.ezInstance.ezManageJobCodesDialogView.ezIds.containers.employeeAssignmentEditorId);
    }

    /**
     * @protected @method
     * Enables assign employee editing and sets the assign to all employees checkbox to false
     */
    ezEnableAssignEmployeeEditing() {
        // Assigned to all checkbox is not checked
        EzJobCodeDialog.ezInstance.ezSilentSetAssignToAllEmployeesCheckbox(false);

        ezApi.ezclocker.ezUi.ezShowElement(EzJobCodeDialog.ezInstance.ezManageJobCodesDialogView.ezIds.containers.employeeAssignmentEditorId);

        ezApi.ezclocker.ezUi.ezSetElementAttribute(
            EzJobCodeDialog.ezInstance.ezManageJobCodesDialogView.ezIds.inputs.assignToAllEmployeesCheckboxId,
            'title',
            'Allow all employees to select this job.');

        ezApi.ezclocker.ezUi.ezSetElementAttribute(
            'EzJobCodeEditor_AssignToAllEmployeesLabel',
            'title',
            'Allow all employees to select this job.');

        ezApi.ezclocker.ezUi.ezSetElementAttribute(
            EzJobCodeDialog.ezInstance.ezManageJobCodesDialogView.ezIds.buttons.assignedEmployeesActionBarAssignEmployeeButtonId,
            'title',
            'Assign this job to a specific employee.');
    }

    /**
     * @protected @method
        Disables all the JobCode editors.
     */
    ezEnableDisableJobCodeEditors(enabled) {
        if (EzBoolean.isTrue(enabled)) {
            ezApi.ezclocker.ezUi.ezEnableElement(EzJobCodeDialog.ezInstance.ezManageJobCodesDialogView.ezIds.inputs.jobCodeNameInputId);
            ezApi.ezclocker.ezUi.ezEnableElement(EzJobCodeDialog.ezInstance.ezManageJobCodesDialogView.ezIds.inputs.jobCodeCodeInputId);
            ezApi.ezclocker.ezUi.ezEnableElement(EzJobCodeDialog.ezInstance.ezManageJobCodesDialogView.ezIds.inputs.hourlyRateInputId);
            ezApi.ezclocker.ezUi.ezEnableElement(EzJobCodeDialog.ezInstance.ezManageJobCodesDialogView.ezIds.inputs.assignToAllEmployeesCheckboxId);
            ezApi.ezclocker.ezUi.ezEnableElement(EzJobCodeDialog.ezInstance.ezManageJobCodesDialogView.ezIds.buttons.assignedEmployeesActionBarAssignEmployeeButtonId);
        } else {
            ezApi.ezclocker.ezUi.ezDisableElement(EzJobCodeDialog.ezInstance.ezManageJobCodesDialogView.ezIds.inputs.jobCodeNameInputId);
            ezApi.ezclocker.ezUi.ezDisableElement(EzJobCodeDialog.ezInstance.ezManageJobCodesDialogView.ezIds.inputs.jobCodeCodeInputId);
            ezApi.ezclocker.ezUi.ezDisableElement(EzJobCodeDialog.ezInstance.ezManageJobCodesDialogView.ezIds.inputs.hourlyRateInputId);
            ezApi.ezclocker.ezUi.ezDisableElement(EzJobCodeDialog.ezInstance.ezManageJobCodesDialogView.ezIds.inputs.assignToAllEmployeesCheckboxId);
            ezApi.ezclocker.ezUi.ezDisableElement(EzJobCodeDialog.ezInstance.ezManageJobCodesDialogView.ezIds.buttons.assignedEmployeesActionBarAssignEmployeeButtonId);
        }
    }

    /**
     * @protected @method
        Deletes the 'orphaned' DataTagMap
        Orphaned DataTagMap's have null or negative assignedEzEntityId values AND their
        assignToAllEntities value is null.
     */
    ezDeleteOrphanedDataTagMap(dataTagMap) {
        // Delete the 'orphaned' DataTagMap as it contains no useful data.
        return EzPromise.asyncAction(
            (finished) => {
                if (!EzObject.isValid(dataTagMap) || !EzNumber.isNumber(dataTagMap.id)) {
                    // Ignore any calls without a valid dataTagMap instance or dataTagMap.id value
                    ezApi.ezclocker.ezLogger.error('Ignored a request to delete an orphaned DataTagMap with a undefined or null dataTagMap parameter.');

                    return finished();
                }

                if (EzBoolean.isTrue(dataTagMap.assignedToAllEntities) ||
                    (EzNumber.isNumber(dataTagMap.assignedEzEnitytId) && 0 >= dataTagMap.assignedEzEnitytId)) {
                    ezApi.ezclocker.ezLogger.error(
                        EzString.em`
                            Stopped orphan deletion of DataTagMap with dataTagMapId=${dataTagMap.id}:
                            Can only delete a DataTagMap as 'orphaned' if the DataTagMap's property assignedEzEntityId is undefined, null, or negative AND
                            the DataTagMap's assignedToAllEntities property is null.
                            [DataTagMap: ${ezApi.ezToJson(dataTagMap)}]`);

                    return finished();
                }

                return ezApi.ezclocker.ezInternalDataTagMapApiClient.ezDeleteDataTagMap(dataTagMap.id)
                    .then(
                        // Nothing needs done if the orphaned DataTagMap is deleted with success
                        finished,
                        (eResponse) => {
                            // Only logging errors when deleting orphanged DataTagMaps. User doesn't need to
                            // know about it.
                            ezApi.ezclocker.ezLogger.error(
                                EzString.em`
                                    Encountered an unexpected error while attempting to delete the orphaned DataTagMap with dataTagMapId=${dataTagMap.id}.
                                    [Error #${eResponse.errorCode}]: ${eResponse.message}]
                                    [Orphaned DataTagMap: ${ezApi.ezToJson(dataTagMap)}]
                                    [Error Response: ${ezApi.ezToJson(eResponse)}]`);

                            return finished();
                        });
            });
    }

    /**
     * @protected @method
     * Handles the remove assigned employee button click0
     * @param {number} assignedEmployeeDataTagIndex
     */
    ezOnRemoveAssignedEmployee(assignedEmployeeDataTagIndex) {
        if (!EzNumber.isNumber(assignedEmployeeDataTagIndex)) {
            throw new EzBadParamException(
                'editingAssignedEmployeeDataTagIndex',
                EzJobCodeDialog.ezInstance,
                EzJobCodeDialog.ezInstance.ezOnRemoveAssignedEmployee);
        }

        if (!EzObject.isValid(EzJobCodeDialog.ezInstance.ezActiveJobCode)) {
            throw new EzBadStateException(
                'Expected a valid DataTag instance returned from call to EzJobCodeDialog.ezInstance.ezActiveJobCode.',
                'Call to EzJobCodeDialog.ezInstance.ezActiveJobCode returned an undefined or null instance.',
                EzJobCodeDialog.ezInstance,
                EzJobCodeDialog.ezInstance.ezOnRemoveAssignedEmployee);
        }

        let dataTagMap = EzJobCodeDialog.ezInstance.ezActiveJobCode.ezDataTagMaps[assignedEmployeeDataTagIndex];

        if (!EzObject.isValid(dataTagMap)) {
            throw new EzBadStateException(
                EzString.em`
                    Expected a valid DataTagMap instance returned from call to
                    EzJobCodeDialog.ezInstance.ezActiveJobCode.ezDataTagMaps[${assignedEmployeeDataTagIndex}].`,
                `Call to EzJobCodeDialog.ezInstance.ezActiveJobCode.ezDataTagMaps[${assignedEmployeeDataTagIndex}] returned an undefined or null instance.`,
                EzJobCodeDialog.ezInstance,
                EzJobCodeDialog.ezInstance.ezOnRemoveAssignedEmployee);
        }

        return EzJobCodeDialog.ezInstance.ezDeleteAssignedEmployeeDataTagMap(dataTagMap)
            .then(EzPromise.ignoreResolve);
    }

    /**
     * @protected @method
        Deletes a employee assigned employee DataTagMap.
        Requires a valid EzJobCodeDialog.ezInstance.ezActiveJobCode
     * @param {Object} dataTagMap
     * @returns {Promise.resolve}
     */
    ezDeleteAssignedEmployeeDataTagMap(dataTagMap) {
        if (!EzObject.isValid(dataTagMap)) {
            throw new EzBadParamException(
                'dataTagMap',
                EzJobCodeDialog.ezInstance,
                EzJobCodeDialog.ezInstance.ezDeleteJobCodeAssignedEmployee);
        }

        if (!EzObject.isValid(dataTagMap.assignedEzEntityId)) {
            // Removing a data tag map that does not have an assignedEzEntityId (most likely an assign all mapping)
            return EzJobCodeDialog.ezInstance.ezDeleteDataTagMap(dataTagMap);
        }

        let assignedEmployee = ezApi.ezclocker.ezClockerContext.ezGetSelectedEmployerAccountEmployeeAccountForEmployeeId(dataTagMap.assignedEzEntityId);

        if (!EzObject.isValid(assignedEmployee)) {
            throw new EzBadStateException(
                EzString.em`
                    Expected a valid Employee instance returned from call to
                    ezApi.ezclocker.ezClockerContext.ezGetSelectedEmployerAccountEmployeeAccountForEmployeeId(${dataTagMap.assignedEzEntityId}).`,
                EzString.em`
                    Call to ezApi.ezclocker.ezClockerContext.ezGetSelectedEmployerAccountEmployeeAccountForEmployeeId(${dataTagMap.assignedEzEntityId})
                    returned an undefined or null instance.`,
                EzJobCodeDialog.ezInstance,
                EzJobCodeDialog.ezInstance.ezDeleteAssignedEmployeeDataTagMap);
        }

        if (!EzObject.isValid(EzJobCodeDialog.ezInstance.ezActiveJobCode)) {
            throw new EzBadStateException(
                'Expected a valid DataTag instance returned from call to EzJobCodeDialog.ezInstance.ezActiveJobCode.',
                'Call to EzJobCodeDialog.ezInstance.ezActiveJobCode returned a undefined or null reference.',
                EzJobCodeDialog.ezInstance,
                EzJobCodeDialog.ezInstance.ezDeleteAssignedEmployeeDataTagMap);
        }

        return ezApi.ezclocker.ezDialog.ezShowYesNo(
            'Remove Employee Job Assignment',
            ezApi.ezMsg`
                Please confirm that you want to remove employee ${assignedEmployee.employeeName}
                from job ${EzJobCodeDialog.ezInstance.ezActiveJobCode.tagName}?`)
            .then(
                (dialogResponse) => {
                    return EzObject.isValid(dialogResponse) && ezApi.ezclocker.ezDialog.YES_DIALOG_RESPONSE.dialogStatus === dialogResponse.dialogStatus
                        ? ezApi.ezclocker.ezUi.ezPageWaitAsync(
                            ezApi.ezMsg`
                                Removing job assignment for employee ${assignedEmployee.employeeName} ...`,
                            (waitDone, finished) => EzJobCodeDialog.ezInstance.ezDeleteDataTagMap(dataTagMap)
                                .then(
                                    () => waitDone().then(finished)))
                        : ezApi.ezResolve();
                });
    }

    /**
     * @protected @method
        Deletes the provided DataTagMap entity
     * @param {Object} dataTagMap
     * @returns {Promise.resolve}
     */
    ezDeleteDataTagMap(dataTagMap) {
        if (!EzObject.isValid(dataTagMap)) {
            throw new EzBadParamException(
                'dataTagMap',
                EzJobCodeDialog.ezInstance,
                EzJobCodeDialog.ezInstance.ezDeleteDataTagMap);
        }

        return EzPromise.asyncAction(
            (finished) => ezApi.ezclocker.ezInternalDataTagMapApiClient.ezDeleteDataTagMap(dataTagMap.id)
                .then(
                    (/* ezEntityResponse */) => EzJobCodeDialog.ezInstance.ezRefreshJobCodes(EzJobCodeDialog.ezInstance.ezActiveJobCode.id)
                        .then(finished),
                    (ezEntityErrorResponse) => () => EzJobCodeDialog.ezInstance.ezShowOnRemoveAssignedEmployeeError(ezEntityErrorResponse)
                        .then(
                            () => EzJobCodeDialog.ezInstance.ezActivateJobCodeForId(EzJobCodeDialog.ezInstance.ezActiveJobCode.id)
                                .then(finished))));
    }

    /**
     * @protected @method
     * Shows the visual help panel when no jobs have been created.
     */
    ezShowVisualHelpPanel() {
        EzJobCodeDialog.ezInstance.ezHideEditors();

        ezApi.ezclocker.ezUi.ezShowElement(EzJobCodeDialog.ezInstance.ezManageJobCodesDialogView.ezIds.containers.visualHelpContainerId);
    }

    /**
     * @protected @method
        Removes the visual help panel from the UX
     */
    ezHideVisualHelpPanel() {
        ezApi.ezclocker.ezEventEngine.ezUnwantElementEvent(
            EzJobCodeDialog.ezInstance.ezManageJobCodesDialogView.ezIds.containers.rightContentContainerId,
            EzElementEventName.RESIZE,
            EzJobCodeDialog.ezApiName);

        if (!ezApi.ezclocker.ezUi.ezElementExists(EzJobCodeDialog.ezInstance.ezManageJobCodesDialogView.ezIds.containers.visualHelpContainerId)) {
            // Not currently visible
            EzJobCodeDialog.ezInstance.ezShowEditors();
            return false;
        }

        ezApi.ezclocker.ezUi.ezHideElement(EzJobCodeDialog.ezInstance.ezManageJobCodesDialogView.ezIds.containers.visualHelpContainerId);

        EzJobCodeDialog.ezInstance.ezShowEditors();

        return true;
    }

    /**
     * @protected @method
        Saves the editor values to the backing entity.
     * @returns {Promise.resolve}
     */
    ezPersistJobCodeEditorInputs() {
        return EzPromise.asyncAction(
            (finished) => {
                if (!EzObject.isValid(EzJobCodeDialog.ezInstance.ezActiveJobCode)) {
                    // No active job code
                    return finished({
                        errorCode: 0,
                        message: 'No active job code editors to persist'
                    });
                }

                let tagName = EzString.stringOrDefault(
                    EzJobCodeDialog.ezInstance.ezJobCodeNameInputValue,
                    `New Job ${EzJobCodeDialog.ezInstance.ezAvailableJobCodes.length}`)
                    .trim();

                let description = EzString.stringOrEmpty(EzJobCodeDialog.ezInstance.ezJobCodeCodeInputValue).trim();

                let hourlyRate = EzString.stringOrEmpty(EzJobCodeDialog.ezInstance.ezHourlyRateInputValue).trim();

                if (EzJobCodeDialog.ezInstance.ezActiveJobCode.tagName === tagName &&
                    EzJobCodeDialog.ezInstance.ezActiveJobCode.description === description &&
                    EzJobCodeDialog.ezInstance.ezActiveJobCode.value === hourlyRate) {
                    // already saved
                    return finished({
                        errorCode: 0,
                        message: 'Active job code editors already persisted'
                    });
                }

                EzJobCodeDialog.ezInstance.ezActiveJobCode.tagName = tagName;
                EzJobCodeDialog.ezInstance.ezActiveJobCode.description = description;
                EzJobCodeDialog.ezInstance.ezActiveJobCode.value = hourlyRate;
                EzJobCodeDialog.ezInstance.ezActiveJobCode.displayValue = EzJobCodeDialog.ezInstance.ezActiveJobCode.tagName;
                EzJobCodeDialog.ezInstance.ezActiveJobCodeModified = true;

                EzJobCodeDialog.ezInstance.ezUpdateUxState();

                return finished({
                    errorCode: 0,
                    message: 'Persisted active job code editors.'
                });
            });
    }

    /**
     * @protected @method
        Assigns the job to all employees
     * @returns {Promise.resolve}
     */
    ezAssignActiveDataTagToAllEmployees() {
        return EzPromise.asyncAction(
            (finished) => {
                return EzObject.isValid(EzJobCodeDialog.ezInstance.ezActiveJobCode)
                    // An active job code is selected, continue with assignment
                    ? EzJobCodeDialog.ezInstance.ezRefreshDataTag(EzJobCodeDialog.ezInstance.ezActiveJobCode)
                        .then(
                            (refreshedDataTag) => {
                                /**
                                 * @method
                                    Executes the common flow between the two flow options in the code below.
                                 */
                                let ezCommonFlow_AssignActiveDataTagToAllEmployees = () => {
                                    return EzJobCodeDialog.ezInstance.ezAssignDataTagToAllEmployees(refreshedDataTag)
                                        .then(
                                            () =>
                                                EzJobCodeDialog.ezInstance.ezRefreshJobCodes(refreshedDataTag.id)
                                                    .then(finished));
                                };

                                /**
                                 * @method
                                    -------------------------------------
                                    Flow A
                                    -------------------------------------
                                    The DataTag has existing employee DataTagMap assignments, therefore
                                    the existing employee DataTagMap assignments get evaluated in the following way:
                                        1) If the DataTag has existing employee DataTagMap assignments:
                                            1a) If any of the DataTagMaps return true for property assignedToAllEntities,
                                               then the flow assumes the assignment is already done and performs no additional actions.
                                            1b) Prompts the user to confirm removal of the existing employee DataTagMap assignments.
                                                1b-1) If the employee accepts, then the existing employee assignments get removed and
                                                      a new DataTagMap is assigned with property assignedToAllEntities set to true.
                                                1b-2) If the user declines, then no other actions get performed.
                                        2) If the DataTag does not ahve any existing employee DataTagMap assignments,
                                           then a new DataTagMap is assigned with property assignedToAllEntities set to true.
                                 */
                                let ezFlowA_AssignActiveDataTagToAllEmployees = () => {
                                    // Checking to see if any of the DataTagMap assignments for the DataTag already has
                                    // the assignedToAllEntities boolean as true.
                                    for (const dataTagMap of refreshedDataTag.ezDataTagMaps) {
                                        if (EzBoolean.isTrue(dataTagMap.assignedToAllEntities)) {
                                            // Already assigned to all
                                            return finished();
                                        }
                                    }

                                    return EzJobCodeDialog.ezInstance.ezPromptUserAssignJobToAllEmployees()
                                        .then(
                                            ezCommonFlow_AssignActiveDataTagToAllEmployees,
                                            finished);

                                }

                                /**
                                 * @method
                                    -------------------------------------
                                    Flow B
                                    -------------------------------------
                                    The DataTag does not have any existing employee DataTagMap assignments, therefore
                                    a new DataTagMap is assigned with property assignedToAllEntities set to true.
                                 */
                                let ezFlowB_AssignActiveDataTagToAllEmployees = () => {
                                    return ezCommonFlow_AssignActiveDataTagToAllEmployees();
                                }

                                // Flow option #1
                                return EzArray.arrayHasLength(refreshedDataTag.ezDataTagMaps)
                                    ? ezFlowA_AssignActiveDataTagToAllEmployees()
                                    : ezFlowB_AssignActiveDataTagToAllEmployees();
                            })
                    // No actions performed if a job is not active (aka selected)
                    : finished();
            });
    }

    /**
     * @protected @method
        Prompts the user to accept or decline removal of all existing employee DataTagMaps assigned to the DataTag.
     * @returns {Promise}
        Promise resolve indicates the user accepted the change.
        Promise reject indicates the user declined the change.
     */
    ezPromptUserAssignJobToAllEmployees() {
        return ezApi.ezPromise(
            (accepted, declined) => {
                return ezApi.ezclocker.ezDialog.ezShowYesNo(
                    'Assign Job to All Employees',
                    ezApi.ezMsg`
                        Assigning the job to all employees will remove any individual employee assignments (including primary assignments)
                        for job "${EzJobCodeDialog.ezInstance.ezActiveJobCode.tagName}".
                        <ul>
                            <li>
                                Click <b>Yes</b> to confirm that you wish to assign all employees to job
                                "${EzJobCodeDialog.ezInstance.ezActiveJobCode.tagName}".
                            </li>
                            <li>
                                Click <b>No</b> to leave the current assignments and make no changes.
                            </li>
                        </ul>
                        <p
                            class="ezText-small-navy">
                            Note: You cannot restore any removed indvidiual employee assignments.
                        </p>`)
                    .then(
                        (dialogResponse) => {
                            if (!EzObject.isValid(dialogResponse) ||
                                ezApi.ezclocker.ezDialog.YES_DIALOG_RESPONSE.dialogStatus !== dialogResponse.dialogStatus) {

                                EzJobCodeDialog.ezInstance.ezSilentSetAssignToAllEmployeesCheckbox(false);

                                return declined();
                            }

                            return accepted();
                        });
            });
    }

    /**
     * @protected @method
        Saves the provided datatag and updates the job code assignments for that dataTag.
     * @param {dataTag}
     * @returns {Promise.resolve}
        If successful, the resolve contains the updated datatag and assignments.
        A failure will return the provided dataTag as it was provided.
     */
    ezRefreshDataTag(dataTag) {
        if (!EzObject.isValid(dataTag)) {
            throw new EzBadParamException(
                'dataTag',
                EzJobCodeDialog.ezInstance,
                EzJobCodeDialog.ezInstance.ezRefreshDataTag);
        }

        return ezApi.ezclocker.ezUi.ezPageWaitAsync(
            `Saving Job '${dataTag.tagName}'  ...`,
            (waitDone, finished) => EzJobCodeDialog.ezInstance.ezSaveDataTag(dataTag)
                .then(
                    (saveDataTagResponse) => waitDone()
                        .then(
                            () => EzJobCodeDialog.ezInstance.ezLoadJobCodeAssignments(saveDataTagResponse.dataTag, true)
                                .then(
                                    () => finished(saveDataTagResponse.dataTag)))));
    }

    /**
     * @protected @method
        Creates the Assign to all employees data tag mapping for the active job code.
     * @returns {Promise.resolve}
     */
    ezAssignDataTagToAllEmployees(dataTag) {
        if (!EzObject.isValid(dataTag)) {
            throw new EzBadParamException(
                'dataTag',
                EzJobCodeDialog.ezInstance,
                EzJobCodeDialog.ezInstance.ezAssignDataTagToAllEmployees);
        }

        return ezApi.ezclocker.ezUi.ezPageWaitAsync(
            `Assigning Job '${EzJobCodeDialog.ezInstance.ezActiveJobCode.tagName}' to all employees ...`,
            (waitDone, finished) => {

                /**
                 * @method
                 * Handles the common action between the two possible flows
                    of calling ezCreateAssignToAllEmployeesDataTag
                 * @returns {Promise.resolve}
                 */
                let finallyCreateAssignToAllEmployeesDataTag = (dataTag) => {
                    return EzJobCodeDialog.ezInstance.ezCreateAssignToAllEmployeesDataTag(dataTag)
                        .then(() => waitDone().then(finished));
                }

                return EzJobCodeDialog.ezInstance.ezSaveDataTag(dataTag)
                    .then(
                        (saveDataTagResponse) => EzJobCodeDialog.ezInstance.ezLoadJobCodeAssignments(saveDataTagResponse.dataTag, true)
                            .then(
                                () => {
                                    return EzJobCodeDialog.ezInstance.ezIsDataTagAssignedToAllEmployees(saveDataTagResponse.dataTag)
                                        ? EzJobCodeDialog.ezInstance.ezPurgeDataTagEmployeeAssignments()
                                            .then(finallyCreateAssignToAllEmployeesDataTag)
                                        : finallyCreateAssignToAllEmployeesDataTag(saveDataTagResponse.dataTag);
                                }))
            });
    }

    /**
     * @protected @method
        Removes all employee assignments from the active job code.
     * @returns {Promise.resolve}
        If successful, returns the updated dataTag with an empty ezDataTagMaps array.
        Otherwise, returns the provided dataTag as it was provided.
     */
    ezPurgeDataTagEmployeeAssignments(dataTag) {
        if (!EzObject.isValid(dataTag)) {
            throw new EzBadParamException(
                'dataTag',
                EzJobCodeDialog.ezInstance,
                EzJobCodeDialog.ezInstance.ezPurgeDataTagEmployeeAssignments);
        }

        return ezApi.ezclocker.ezUi.ezPageWaitAsync(
            `Removing all individual employee assignments from job ${dataTag.tagName} ...`,
            (waitDone, finished) => ezApi.ezclocker.ezInternalDataTagMapApiClient.ezPurgeDataTagMapsForDataTagIdAndAssignedEntityTypeName(
                dataTag.id,
                EzEntityType.EMPLOYEE)
                .then(
                    (response) => {
                        EzJobCodeDialog.ezInstance.ezClearEmployeeEntitiesPrimaryJobCodeId(response.entities);
                        dataTag.ezDataTagMaps = [];

                        return waitDone().then(() => finished(dataTag));
                    },
                    (eResponse) => waitDone()
                        .then(
                            () => EzJobCodeDialog.ezInstance.ezShowPurgeActiveJobCodeEmployeeAssignmentsError(eResponse)
                                .then(() => finished(dataTag)))));
    }

    /**
     * @protected @method
        Determines if the provided dataTag's ezDataTagMaps array contains a DataTagMap with the assignedToAllEntities property as true.
     * @param {object} dataTag
     * @returns {boolean}
     */
    ezIsDataTagAssignedToAllEmployees(dataTag) {
        if (!EzObject.isValid(dataTag)) {
            throw new EzBadParamException(
                'dataTag',
                EzJobCodeDialog.ezInstance,
                EzJobCodeDialog.ezInstance.ezIsDataTagAssignedToAllEmployees);
        }

        if (EzArray.arrayHasLength(dataTag.ezDataTagMaps)) {
            // Checking to see if any of the DataTagMap assignments for the DataTag already has
            // the assignedToAllEntities boolean as true.
            for (const dataTagMap of dataTag.ezDataTagMaps) {
                if (EzBoolean.isTrue(dataTagMap.assignedToAllEntities)) {
                    // Already assigned to all
                    return true;
                }
            }
        }

        return false;
    }

    /**
     * @protected @method
        Creates a new DataTagMap that is assigned to all employees for the provided dataTag.
     * @param {object} dataTag
     * @returns {}
     */
    ezCreateAssignToAllEmployeesDataTag(dataTag) {
        if (!EzObject.isValid(dataTag)) {
            throw new EzBadParamException(
                'dataTag',
                EzJobCodeDialog.ezInstance,
                EzJobCodeDialog.ezInstance.ezCreateAssignToAllEmployeesDataTag);
        }

        return EzPromise.asyncAction(
            (finished) => {
                let assignToAllEmployeeMap = new EzDataTagMap(
                    // id
                    null,
                    // employerId
                    ezApi.ezclocker.ezClockerContext.ezGetActiveEmployer().id,
                    // dataTagId
                    dataTag.id,
                    // assignedEzEntityTypeName
                    EzEntityType.EMPLOYEE,
                    // assignedEzEntityId
                    null,
                    // assignedToAllEntities
                    true,
                    // level
                    0);

                return ezApi.ezclocker.ezInternalDataTagMapApiClient.ezCreateDataTagMap(assignToAllEmployeeMap)
                    .then(
                        () => EzJobCodeDialog.ezInstance.ezLoadJobCodeAssignments(dataTag, true)
                            .then(finished()),
                        (eResponse) => EzJobCodeDialog.ezInstance.ezShowAssignDataTagToAllEmployeesError(
                            eResponse,
                            assignToAllEmployeeMap,
                            dataTag)
                            .then(finished));
            });
    }

    /**
     * @protected @method
        Unassigns the active jbo code from all employees
     * @returns {Promise.resolve}
     */
    ezUnassignActiveDataTagFromAllEmployees() {
        return EzPromise.asyncAction(
            (finished) => {
                if (!EzObject.isValid(EzJobCodeDialog.ezInstance.ezActiveJobCode)) {
                    return finished();
                }

                return EzJobCodeDialog.ezInstance.ezLoadJobCodeAssignments(EzJobCodeDialog.ezInstance.ezActiveJobCode, true)
                    .then(
                        (dataTagMaps) => {
                            if (!EzArray.arrayHasLength(dataTagMaps)) {
                                // No assigments, nothing to do
                                return finished();
                            }

                            return ezApi.ezclocker.ezUi.ezPageWaitAsync(
                                `Removing all employee assignments to job ${EzJobCodeDialog.ezInstance.ezActiveJobCode.tagName} ...`,
                                (waitDone, finished) => EzJobCodeDialog.ezInstance.ezSaveIfActiveJobCodeModified()
                                    .then(
                                        (updatedDataTag) => {
                                            return EzJobCodeDialog.ezInstance.ezLoadJobCodeAssignments(updatedDataTag, true)
                                                .then(
                                                    (dataTagMaps) => {
                                                        if (!EzArray.arrayHasLength(dataTagMaps)) {
                                                            // No data tag maps to remove
                                                            return finished();
                                                        }

                                                        let dataTagMapsToDelete = [];

                                                        dataTagMaps.forEach(
                                                            (dataTagMap) => {
                                                                if (EzObject.isValid(dataTagMap) &&
                                                                    EzBoolean.isTrue(dataTagMap.assignedToAllEntities) ||
                                                                    !EzNumber.isNumber(dataTagMap.assignedEzEntityId) ||
                                                                    0 > dataTagMap.assignedEzEntityId) {
                                                                    dataTagMapsToDelete.push(dataTagMap);
                                                                }
                                                            });

                                                        return EzJobCodeDialog.ezInstance.ezDeleteDataTagMaps(dataTagMapsToDelete)
                                                            .then(
                                                                (deleteDatTagMapsResponse) => {
                                                                    updatedDataTag.ezDataTagMaps = [];

                                                                    if (EzArray.arrayHasLength(deleteDatTagMapsResponse.errorResponses)) {
                                                                        ezApi.ezclocker.ezLogger.error(
                                                                            EzString.em`
                                                                                Failures during deletion of DataTagMaps:
                                                                                ${ezApi.ezToJson(deleteDatTagMapsResponse.errorResponses)}`);
                                                                    }

                                                                    return EzJobCodeDialog.ezInstance.ezRefreshJobCodes(updatedDataTag.id)
                                                                        .then(EzJobCodeDialog.ezUpdateUxState)
                                                                        .then(waitDone)
                                                                        .then(finished);
                                                                });
                                                    });
                                        }));
                        });
            });
    }

    /**
     * @protected @method
        Creates the Assign to all employees data tag mapping for the active job code.
     * @param {array} dataTagMapsToDelete
     * @returns {Promise.resolve}
        {
            errorResponses: [..eResponses (if any)]
        }
     */
    ezDeleteDataTagMaps(dataTagMapsToDelete) {
        return EzPromise.asyncAction(
            (finished) => {
                let deletedDataTagMapCount = 0;

                let failedDataTagMapResponses = [];

                if (!EzArray.arrayHasLength(dataTagMapsToDelete)) {
                    return finished({
                        errorResponses: failedDataTagMapResponses
                    });
                }

                for (let dataTagMapToDelete of dataTagMapsToDelete) {
                    ezApi.ezclocker.ezInternalDataTagMapApiClient.ezDeleteDataTagMap(dataTagMapToDelete.id)
                        .then(
                            () => {
                                deletedDataTagMapCount++;

                                if (deletedDataTagMapCount >= dataTagMapsToDelete.length) {
                                    return finished({
                                        errorResponses: failedDataTagMapResponses
                                    });
                                }
                            },
                            (eResponse) => {
                                deletedDataTagMapCount++;
                                eResponse.dataTagMapToDelete = dataTagMapToDelete;
                                failedDataTagMapResponses.push(eResponse);

                                if (deletedDataTagMapCount >= dataTagMapsToDelete.length) {
                                    return finished({
                                        errorResponses: failedDataTagMapResponses
                                    });
                                }
                            });
                }
            });
    }

    /**
     * @protected @method
        Unarchvies the active job code
     */
    ezArchiveActiveJobCode() {
        if (EzObject.isValid(EzJobCodeDialog.ezInstance.ezActiveJobCode.ezIndex)) {
            EzJobCodeDialog.ezInstance.ezArchiveJobCodeAtIndex(EzJobCodeDialog.ezInstance.ezActiveJobCode.ezIndex)
                .then(EzPromise.ignoreResolve);
        }
    }

    /**
     * @protected @method
        Unarchives the active job code
     */
    ezUnarchiveActiveJobCode() {
        if (EzObject.isValid(EzJobCodeDialog.ezInstance.ezActiveJobCode.ezIndex)) {
            EzJobCodeDialog.ezInstance.ezUnarchiveJobCodeAtIndex(EzJobCodeDialog.ezInstance.ezActiveJobCode.ezIndex)
                .then(EzPromise.ignoreResolve);
        }
    }

    /**
     * @protected @method
     * Handles the job code name input's onblur event
     */
    ezHandleJobCodeNameInputBlur(ezEvent) {
        if (!EzObject.isValid(ezEvent)) {
            throw new EzBadParamException(
                'ezEvent',
                EzJobCodeDialog.ezInstance,
                EzJobCodeDialog.ezInstance.ezHandleJobCodeNameInputBlur);
        }

        if (!EzObject.isValid(EzJobCodeDialog.ezInstance.ezActiveJobCode)) {
            return;
        }

        ezApi.ezclocker.ezUi.ezStartPageWait(
            'Saving job ...',
            (waitDone) => {

                let dataTagName = ezApi.ezclocker.ezUi.ezGetInputValue(EzJobCodeDialog.ezInstance.ezManageJobCodesDialogView.ezIds.inputs.jobCodeNameInputId);

                if (EzJobCodeDialog.ezInstance.ezActiveJobCode.tagName === dataTagName) {
                    // No change, no validation needed.
                    return waitDone();
                }

                return EzJobCodeDialog.ezInstance.ezValidateDataTagNeverAssigned(EzJobCodeDialog.ezInstance.ezActiveJobCode.id)
                    .then(
                        (dataTagAssigned) => {
                            if (dataTagAssigned) {
                                // Job already has assignments, renaming not allowed

                                ezApi.ezclocker.ezUi.ezSetInputValue(
                                    EzJobCodeDialog.ezInstance.ezManageJobCodesDialogView.ezIds.inputs.jobCodeNameInputId,
                                    EzJobCodeDialog.ezInstance.ezActiveJobCode.tagName);

                                return ezApi.ezclocker.ezDialog.ezShowOK(
                                    'Renaming Assigned Jobs',
                                    EzHtml.template`
                                        <p>
                                            EzClocker does not allow you to modify the name of a Job that is assigned.
                                        </p>
                                        <p>
                                            Instead of modifying a job's name perform the following tasks:
                                            <ol>
                                                <li>Archive the existing job with the name you no longer wish to use</li>
                                                <li>Create a new job with the new name.</li>
                                            </ol>
                                        </p>`);
                            }

                            // Job does not have existing assignments, validate the name is unique.
                            return EzJobCodeDialog.ezInstance.ezValidateUniqueJobName(
                                EzJobCodeDialog.ezInstance.ezActiveJobCode.id,
                                dataTagName)
                                .then(
                                    (validationResponse) => {
                                        if (EzBoolean.isFalse(validationResponse.valid)) {
                                            EzJobCodeDialog.ezInstance.ezProcessValidationError(validationResponse);

                                            return waitDone();
                                        }

                                        EzJobCodeDialog.ezInstance.ezHideValidationError();

                                        if (EzJobCodeDialog.ezInstance.ezActiveJobCode.tagName !== EzJobCodeDialog.ezInstance.ezJobCodeNameInputValue ||
                                            EzJobCodeDialog.ezInstance.ezActiveJobCode.description !== EzJobCodeDialog.ezInstance.ezJobCodeCodeInputValue ||
                                            EzJobCodeDialog.ezInstance.ezActiveJobCode.value !== EzJobCodeDialog.ezInstance.ezHourlyRateInputValue) {
                                            return EzJobCodeDialog.ezInstance.ezPersistJobCodeEditorInputs()
                                                .then(EzJobCodeDialog.ezInstance.ezSaveIfActiveJobCodeModified)
                                                .then(waitDone);
                                        }

                                        return EzJobCodeDialog.ezInstance.ezSaveIfActiveJobCodeModified()
                                            .then(waitDone);
                                    });
                        });
            });
    }

    /**
     * @protected @method
     * Handles the CHANGE event for the HTML Select input with id EzJobCodeDialog.ezInstances.ezIds.inputs.jobCodeFilterSelectId
     */
    ezHandleOnJobCodeDialogJobCodeFilterSelectChange() {
        EzJobCodeDialog.ezInstance.ezRenderAvailableJobCodes()
            .then(
                () => {
                    switch (EzJobCodeDialog.ezInstance.ezJobCodeFilterSelectValue) {
                        case EzJobCodeFilterType.ARCHIVED:
                            ezApi.ezclocker.ezUi.ezDisable(EzJobCodeDialog.ezInstance.ezManageJobCodesDialogView.ezIds.buttons.addJobCodeButtonId);
                            break;
                        case EzJobCodeFilterType.ACTIVE:
                        case EzJobCodeFilterType.ALL:
                        case EzJobCodeFilterType.UNKNOWN:
                            ezApi.ezclocker.ezUi.ezEnable(EzJobCodeDialog.ezInstance.ezManageJobCodesDialogView.ezIds.buttons.addJobCodeButtonId);
                    }
                });
    }

    /**
     * @protected @method
     * Handles the click event of active job codes.
     * @param {number} jobCodeIndex
     */
    ezHandleJobCodeBarClick(jobCodeIndex) {
        EzJobCodeDialog.ezInstance.ezSaveIfActiveJobCodeModified()
            .then(
                () => {
                    if (!EzArray.arrayHasLength(EzJobCodeDialog.ezInstance.ezAvailableJobCodes) || !EzNumber.isNumber(jobCodeIndex) ||
                        0 > jobCodeIndex || jobCodeIndex > EzJobCodeDialog.ezInstance.ezAvailableJobCodes.length) {
                        // Bad index, nothing to select
                        return;
                    }

                    EzJobCodeDialog.ezInstance.ezSelectJobCodeBarForIndex(jobCodeIndex)
                        .then(EzPromise.ignoreResolve);
                });
    }

    /**
     * @protected @method
     * Handles the onActiveJobCodeModified event
     */
    ezHandleOnActiveJobCodeModified() {
        EzJobCodeDialog.ezInstance.ezSaveActiveJobCode();
    }

    /**
     * @protected
     * Handles the onActiveJobCodeSaveStarted event
     */
    ezHandleOnActiveJobSaveStarted() {
        ezApi.ezclocker.ezUi.ezShowElement(EzJobCodeDialog.ezInstance.ezManageJobCodesDialogView.ezIds.containers.saveStatusContainerId);
    }

    /**
     * @protected @method
     * Handles the onActiveJobCodeSaveError event
        event.data:
            {
                message: eResponse.message,
                errorCode: eResponse.errorCode,
                jobCode: savingJobCode,
                eResponse: eResponse,
                validationResult: {
                    valid: false,
                    message: " A job with the name Cook already exists.",
                    "focusElementId": "EzJobCodeDialog_JobCodeNameInput"
                }
            }
     * @param {Object} ezEvent
        Data returned on the event available at: ezEvent.data
     */
    ezHandleOnActiveJobCodeSaveError(ezEvent) {
        ezApi.ezclocker.ezUi.ezHideElement(EzJobCodeDialog.ezInstance.ezManageJobCodesDialogView.ezIds.containers.saveStatusContainerId);

        ezApi.ezclocker.ezLogger.error(
            EzString.em`
                Save DataTag (JobCode) failed.
                [Error event: ${ezApi.ezToJson(ezEvent)}`);

        let errorData = ezEvent.data;

        if (EzObject.isValid(errorData) && EzObject.isValid(errorData.eResponse)) {
            let eDetails = EzString.em`
                [Error code]\n
                ${errorData.eResponse}\n\n
                [Error Message]\n
                ${errorData.message}\n\n
                [Error Response]\n
                ${ezApi.ezToJson(errorData.eResponse)}\n\n
                [Full Error]\n
                ${ezApi.ezToJsoN(errorData)}`;

            ezApi.ezclocker.ezDialog.ezShowErrorWithDetails(
                'Job Save Error',
                EzString.em`
                    EzClocker encountered an unexpected error while saving the selected job code.
                    <p>
                        [Error #${errorData.errorCode}]: ${errorData.message}
                    </p>`,
                eDetails);
        }
    }

    /**
     * @protected @method
     * Handles unarchiving a job
     * @param {number} jobCodeIndex
     */
    ezHandleUnarchiveJobButtonClickEvent(jobCodeIndex) {
        if (!EzNumber.isNumber(jobCodeIndex)) {
            throw new EzBadParamException(
                'jobCodeIndex',
                EzJobCodeDialog.ezInstance,
                EzJobCodeDialog.ezInstance.ezHandleDeleteJobButtonClickEvent);
        }

        EzJobCodeDialog.ezInstance.ezUnarchiveJobCodeAtIndex(jobCodeIndex)
            .then(EzPromise.ignoreResolve);
    }

    /**
     * @protected @method
     * Handles blue events for job code editors.
     */
    ezHandleJobCodeCodeInputBlur() {
        if (!EzObject.isValid(EzJobCodeDialog.ezInstance.ezActiveJobCode)) {
            return;
        }

        if (EzJobCodeDialog.ezInstance.ezActiveJobCode.tagName !== EzJobCodeDialog.ezInstance.ezJobCodeNameInputValue ||
            EzJobCodeDialog.ezInstance.ezActiveJobCode.description !== EzJobCodeDialog.ezInstance.ezJobCodeCodeInputValue ||
            EzJobCodeDialog.ezInstance.ezActiveJobCode.value !== EzJobCodeDialog.ezInstance.ezHourlyRateInputValue) {
            return EzJobCodeDialog.ezInstance.ezPersistJobCodeEditorInputs()
                .then(EzJobCodeDialog.ezInstance.ezSaveIfActiveJobCodeModified)
                .then(EzPromise.ignoreResolve);
        }

        return EzJobCodeDialog.ezInstance.ezSaveIfActiveJobCodeModified()
            .then(EzPromise.ignoreResolve);
    }




    /**
     * @protected @method
        Determines if the data tag with the provided dataTagId has any data tag assignments.
     * @param {number} dataTagId
     * @returns {Promise.resolve}
        Promise.resolve returns a boolean resul;t
     */
    ezValidateDataTagNeverAssigned(dataTagId) {
        return ezApi.ezclocker.ezUi.ezPageWaitAsync(
            'Validating Job name ...',
            (waitDone, finished) => ezApi.ezclocker.ezDataTagService.ezDataTagHasAssignments(dataTagId)
                .then(
                    (response) => waitDone()
                        .then(
                            () => finished(
                                "TRUE" === response.message.toUpperCase())),
                    (eResponse) => waitDone()
                        .then(
                            () => {
                                ezApi.ezclocker.ezLogger.error(
                                    EzString.em`
                                        EzClocker encountered an unexpected error while validating the data tag's name.
                                        Error: ${EzJson.toJson(eResponse)}`);

                                return ezApi.ezclocker.ezDialog.ezShowErrorWithDetails(
                                    'Job Name Validation Error',
                                    EzString.em`
                                        EzClocker encountered an unexpected error while validating the data tag's name.
                                        <p>
                                            [Error #${eResponse.errorCode}]: ${eResponse.message}
                                        </p>`,
                                    eResponse)
                                    .then(
                                        () => finished(false));
                            })));
    }

    /**
     * @protected @method
     * Handles archiving a job
     * @param {number} jobCodeIndex
     */
    ezHandleArchiveJobButtonClickEvent(jobCodeIndex) {
        if (!EzNumber.isNumber(jobCodeIndex)) {
            throw new EzBadParamException(
                'jobCodeIndex',
                EzJobCodeDialog.ezInstance,
                EzJobCodeDialog.ezInstance.ezHandleDeleteJobButtonClickEvent);
        }

        EzJobCodeDialog.ezInstance.ezArchiveJobCodeAtIndex(jobCodeIndex)
            .then(EzPromise.ignoreResolve);
    }

    /**
     * @protected @method
     * Handles deleting a job
     * @param {number} jobCodeIndex
     */
    ezHandleDeleteJobButtonClickEvent(jobCodeIndex) {
        if (!EzNumber.isNumber(jobCodeIndex)) {
            throw new EzBadParamException(
                'jobCodeIndex',
                EzJobCodeDialog.ezInstance,
                EzJobCodeDialog.ezInstance.ezHandleDeleteJobButtonClickEvent);
        }

        EzJobCodeDialog.ezInstance.ezDeleteJobCodeAtIndex(jobCodeIndex);
    }

    /**
     * @protected @method
     * Handles the assign all employees checkbox change event
     */
    ezHandleAssignToAllEmployeesCheckboxChangeEvent() {
        if (EzBoolean.isTrue(EzJobCodeDialog.ezInstance.ezIgnoreAssignAllEmployeesCheckboxEvents)) {
            return;
        }

        if (!EzObject.isValid(EzJobCodeDialog.ezInstance.ezActiveJobCode)) {
            // No active job code
            return;
        }

        if (ezApi.ezclocker.ezUi.ezIsCheckBoxChecked(EzJobCodeDialog.ezInstance.ezManageJobCodesDialogView.ezIds.inputs.assignToAllEmployeesCheckboxId)) {
            return EzJobCodeDialog.ezInstance.ezAssignActiveDataTagToAllEmployees()
                .then(EzPromise.ignoreResolve);
        }

        return EzJobCodeDialog.ezInstance.ezUnassignActiveDataTagFromAllEmployees()
            .then(EzPromise.ignoreResolve);
    }

    /**
     * @protected @method
     * Handles the onKeyDown event of the available job codes container
     * Associated HTML element id:
     *      EzJobCodeDialog.ezInstance.ezManageJobCodesDialogView.ezIds.containers.availableJobCodesContainerId
     */
    ezHandleAvailableJobCodesContainerKeyDownEvent() {
        if (!EzObject.isValid(ezApi.ezActiveJobCode) ||
            !EzArray.arrayHasLength(EzJobCodeDialog.ezInstance.ezAvailableJobCodes) ||
            EzBoolean.isFalse(EzJobCodeDialog.ezInstance.ezHasVisibleJobs)) {
            return;
        }

        EzJobCodeDialog.ezInstance.ezSelectJobCodeBarForIndex(
            EzJobCodeDialog.ezInstance.ezDetermineNextSelectableJobCodeIndex(EzJobCodeDialog.ezInstance.ezActiveJobCode.ezIndex))
            .then(EzPromise.ignoreResolve);
    }

    /**
     * @protected @method
     * Shows an api response error
     * @param {Object} eResponse
     * @param {String} eTitle
     * @param {String} errorLogMessage
     * @param {String} userMessage
     * @param {String} optionalData
     * @returns {Promise.resolve}
     * Returns resolver from error dialog call.
     */
    ezShowApiError(eTitle, eMessage, eDetails, eResponse) {
        if (!EzString.stringHasLength(eTitle)) {
            eTitle = 'Manage Jobs Error';
        }

        if (!EzString.stringHasLength(eMessage)) {
            eMessage = 'EzClocker encountered an unexpected error while performing an action for Manage Jobs.';
        }

        if (!EzString.stringHasLength(eDetails)) {
            eDetails = EzObject.isValid(eResponse)
                ? `[Details: ${eDetails}] [Error response: ${ezApi.ezToJson(eResponse)}]`
                : `[Details: ${eDetails}]`;
        }

        return ezApi.ezclocker.ezDialog.ezShowErrorWithDetails(
            eTitle,
            eMessage,
            eDetails);
    }

    /**
     * @protected @method
     * Shows error for loading job code employee assignments
     * @param {Object} eResponse
     * @param {Object} jobCode
     * @returns {Promise.resolve}
     * Returns resolver from error dialog call.
     */
    ezShowLoadJobCodeEmployeeAssignmentsError(eResponse, jobCode) {
        let jobName = '(no name)';

        let eDetails = 'NO ADDITIONAL DETAILS PROVIDED';

        if (EzObject.isValid(jobCode)) {
            eDetails = `[Job: ${ezApi.ezToJson(jobCode)}`;

            if (EzString.stringHasLength(jobCode.tagName)) {
                jobName = jobCode.tagName;
            }
        }

        if (EzObject.isValid(eResponse)) {

        }


        return ezApi.ezclocker.ezDialog.ezShowErrorWithDetails(
            'Job Code Employee Assignments Error',
            `Unable to load the employee assignments for job ${jobName} at this time.`,
            eDetails);
    }

    /**
     * @protected @method
     * Shows errors for get employer job codes API call
     * @param {Object} eResponse
     * @returns {Promise.resolve}
     * Returns resolver from error dialog call.
     */
    ezShowGetEmployerJobCodesError(eResponse) {
        return EzJobCodeDialog.ezInstance.ezShowApiError(
            'Job Code Employee Assignments Error',
            'Unable to load the available Jobs at this time.',
            'NO ADDITIONAL DETAILS AVAILABLE',
            eResponse);
    }

    /**
     * @protected @method
     * Shows errors for get all job code employee assignments API call
     * @param {Object} eResponse
     * @returns {Promise.resolve}
     * Returns resolver from error dialog call.
     */
    ezShowGetAllJobCodesEmployeeAssignmentsError(eResponse) {
        return EzJobCodeDialog.ezInstance.ezShowApiError(
            'Job Code Employee Assignments Error',
            'Unable to load the job\'s employee assignments at this time.',
            'NO ADDITIONAL DETAILS AVAILABLE',
            eResponse);
    }

    /**
     * @protected @method
     * Shows add active job code errors
     * @param {object} eResponse
     * @param {object} dataTag
     * @returns {Promise.resolve}
     * Returns resolver from error dialog call.
     */
    ezShowCreateNewDataTagError(eResponse, dataTag) {
        let dataTagJson = EzObject.isValid(dataTag)
            ? ezApi.ezToJson(dataTag)
            : 'n/a';
        let eResponseJson = EzObject.isValid(eResponse)
            ? ezApi.ezToJson(eResponse)
            : 'n/a';

        return EzJobCodeDialog.ezInstance.ezShowErrorWithDetails(
            'Add Job Code Error',
            ezApi.ezTemplate`
                Unable to add the new job due to the following error:
                <p>${EzString.stringOrDefault(eResponse.message, 'No specific message was provided.')}</p>`,
            ezApi.ezTemplate`
                [Job]\n
                ${dataTagJson}\n
                \n
                [Error Response]\n
                ${eResponseJson}`);
    }

    /**
     * @protected @method
     * Shows errors for PUT job code API call
     * @param {object} eResponse
     * @param {object} dataTag
     * @returns {Promise.resolve}
     * Returns resolver from error dialog call.
     */
    ezShowUpdateDataTagError(eResponse, dataTag) {
        let dataTagJson = EzObject.isValid(dataTag)
            ? ezApi.ezToJson(dataTag)
            : 'n/a';
        let eResponseJson = EzObject.isValid(eResponse)
            ? ezApi.ezToJson(eResponse)
            : 'n/a';

        return EzJobCodeDialog.ezInstance.ezShowErrorWithDetails(
            'Update Job Code Error',
            ezApi.ezTemplate`
                Unable to update the job due to the following error:
                <p>${EzString.stringOrDefault(eResponse.message, 'No specific message was provided.')}</p>`,
            ezApi.ezTemplate`
                [Job]\n
                ${dataTagJson}\n
                \n
                [Error Response]\n
                ${eResponseJson}`);
    }

    /**
     * @protected @method
     * Shows errors for delete job code API call
     * @param {object} eResponse
     * @param {object} dataTag
     * @returns {Promise.resolve}
     * Returns resolver from error dialog call.
     */
    ezShowDeleteJobCodeError(eResponse, dataTag) {
        let jobName = '(no name)';

        let eDetails = 'NO ADDITIONAL DETAILS AVAILABLE';

        if (EzObject.isValid(dataTag)) {
            if (EzString.stringHasLength(dataTag.tagName)) {
                jobName = EzString.stringOrDefault(
                    dataTag.tagName,
                    '(no name)');
            }

            eDetails = EzString.em`
                ${eDetails}
                [DataTag]\n
                ${ezApi.ezToJson(dataTag, 3)}\n\n`;
        }

        let eMessage = `Unable to delete the job ${jobName}`;

        if (EzObject.isValid(eResponse)) {
            if (EzString.stringHasLength(eResponse)) {
                eMessage = ezApi.ezTemplate`
                    ${eMessage} due to error:
                    <p>
                        ${eResponse.message}
                    </p>`;
            }

            eDetails = EzString.em`
                [Error]\n
                Error #(${EzNumber.numberOrDefault(eResponse.errorCode, 500)}): ${eMessage}\n\n
                [Error Response]\n
                ${ezApi.ezToJson(eResponse, 3)}]\n\n
                ${eDetails}`;
        }

        return EzJobCodeDialog.ezInstance.ezShowApiError(
            'Delete Job Code Error',
            eMessage,
            eDetails);
    }

    /**
     * @protected @method
     * Shows errors for archive job code API call
     * @param {undefiend|null|object} eResponse
     * @param {undefiend|null|object} jobCode
     * @returns {Promise.resolve}
     * Returns resolver from error dialog call.
     */
    ezShowArchiveJobCodeError(eResponse, jobCode) {
        let jobName = '(no name)';

        let eDetails = EzString.EMPTY;

        if (EzObject.isValid(jobCode)) {
            if (EzString.stringHasLength(jobCode.tagName)) {
                jobName = jobCode.tagName;
            }

            eDetails = `[Job #${jobCode.id}: ${ezApi.ezToJson(jobCode)}`;
        }

        return EzJobCodeDialog.ezInstance.ezShowApiError(
            'Archive Job Code Error',
            `Unable to archive job ${jobName}.`,
            eDetails,
            eResponse);
    }

    /**
     * @protected @method
     * Shows errors for remove assigned employee API call
     * @param {Object} eResponse
     * @returns {Promise.resolve}
     * Returns resolver from error dialog call.
     */
    ezShowOnRemoveAssignedEmployeeError(eResponse) {
        let jobName = EzObject.isValid(EzJobCodeDialog.ezInstance.ezActiveJobCode) &&
            EzString.stringHasLength(EzJobCodeDialog.ezInstance.ezActiveJobCode.tagName)
            ? EzJobCodeDialog.ezInstance.ezActiveJobCode.tagName
            : '(no name)';

        return EzJobCodeDialog.ezInstance.ezShowApiError(
            'Remove Employee Job Assignment Error',
            `Unable to unassign the employee from job ${jobName} at this time.`,
            'NO ADDITIONAL DETAILS AVAILABLE',
            eResponse);
    }

    /**
     * @protected @method
     * Shows errors for purge job code employee assignments API call
     * @param {Object} eResponse
     * @returns {Promise.resolve}
     * Returns resolver from error dialog call.
     */
    ezShowPurgeActiveJobCodeEmployeeAssignmentsError(eResponse) {
        let jobName = '(no name)';

        let eDetails = 'NO ADDITIONAL DETAILS AVAILABLE';

        if (EzObject.isValid(EzJobCodeDialog.ezInstance.ezActiveJobCode)) {
            eDetails = `Job #${EzJobCodeDialog.ezInstance.ezActiveJobCode.id}: ${ezApi.ezToJson(EzJobCodeDialog.ezInstance.ezActiveJobCode)}]`;

            if (EzString.stringHasLength(EzJobCodeDialog.ezInstance.ezActiveJobCode.tagName)) {
                jobName = EzJobCodeDialog.ezInstance.ezActiveJobCode.tagName;
            }
        }

        return EzJobCodeDialog.ezInstance.ezShowApiError(
            'Unassign All Employees from Job Error',
            `Unable to unassign all assigned employees from job ${jobName} at this time.`,
            eDetails,
            eResponse);
    }

    /**
     * @protected @method
     * Shows errors for assign to all api call
     * @param {undefined|null|object} eResponse
     * @param {undefined|null|object} dataTagMap
     * @param {undefined|null|object} dataTag
     * @returns {Promise.resolve}
     * Returns resolver from error dialog call.
     */
    ezShowAssignDataTagToAllEmployeesError(eResponse, dataTagMap, dataTag) {
        let jobName = '(no name)';

        let eDetails = 'NO ADDITIONAL DETAILS AVAILABLE';

        if (EzObject.isValid(dataTagMap)) {
            eDetails = EzString.build`
                [DataTagMap]
                ${ezApi.ezToJson(dataTagMap, 3)}`;
        }

        if (EzObject.isValid(dataTag)) {
            if (EzString.stringHasLength(dataTag.tagName)) {
                jobName = EzString.stringOrDefault(
                    dataTag.tagName,
                    '(no name)');
            }

            eDetails = EzString.build`
                ${eDetails}
                [DataTag]
                ${ezApi.ezToJson(dataTag, 3)}`;
        }

        let eMessage = `Unable to assign all employees to job ${jobName}`;

        if (EzObject.isValid(eResponse)) {
            if (EzString.stringHasLength(eResponse)) {
                eMessage = ezApi.ezTemplate`
                    ${eMessage} due to error:
                    <p>
                        ${eResponse.message}
                    </p>`;
            }

            eDetails = EzString.build`
                [Error]
                Error #${EzNumber.numberOrDefault(eResponse.errorCode, 500)}: ${eMessage}
                [Error Response]
                ${ezApi.ezToJson(eResponse, 3)}]
                ${eDetails}`;
        }

        return ezApi.ezclocker.ezDialog.ezShowErrorWithDetails(
            'Assign All Employees to Job Error',
            eMessage,
            eDetails);
    }

    /**
     * @protected @method
     * Shows errors for remove assign to all employees api call
     * @param {array} failedDataTagMapDeletes
     * @param {array} failedDataTagMapResponses
     * @returns {Promise.resolve}
     * Returns resolver from error dialog call.
     */
    ezShowRemoveAssignToAllEmployeesError(dataTagTagName, failedDataTagMapResponses) {
        let fullErrorResponse = {
            errorCode: 500,
            fullErrorCode: '500.',
            message: 'Failed to remove job assignment from all employees.'
        };

        for (let eResponse of failedDataTagMapResponses) {
            let eMessage = EzObject.hasProperty(eResponse, 'message')
                ? EzString.stringOrEmpty(eResponse.message)
                : EzString.EMPTY;

            let eCode = EzObject.hasProperty(eResponse, 'errorCode')
                ? EzObject.assignOrDefault(eResponse.errorCode, 500)
                : 500;

            fullErrorResponse.fullErrorCode = `${fullErrorResponse.fullErrorCode}.${eCode}`;

            let eDataTagMapId = EzObject.hasProperty(eResponse, 'deletingDataTagMap') && EzObject.isValid(eResponse.deletingDataTagMap)
                ? EzNumber.numberOrDefault(eResponse.deletingDataTagMap.id, '??')
                : '??';

            fullErrorResponse.message = EzString.stringHasLength(eMessage)
                ? `${fullErrorResponse.message} [Error code: ${eCode.toString()}.ID${eDataTagMapId.toString()} - ${eMessage}]`
                : `${fullErrorResponse.message} [Error code: ${eCode.toString()}.ID${eDataTagMapId.toString()}]`;
        }

        let mailToUrl = ezApi.ezUrlTemplate`
            mailto://support@ezclocker.com
            ?subject='Please help me resolve the error I received while unassigning a job from all employees'
            &body='The error message I received: ${fullErrorResponse.message}`;

        return EzJobCodeDialog.ezInstance.ezShowApiError(
            fullErrorResponse,
            'Removing Job Assignment from All Employee\'s Error',
            EzString.em`
                EzClocker encountered an unexpected error while unassigning job ${dataTagTagName} from all employees.
                However, if the Assign job to all employees checkbox for the job ${dataTagTagName} in the
                Manage Jobs dialog is unchecked then unassinging the job from all employees was successful. If
                the "Assign job to all employees" checkbox is still checked please contact ezClocker support at
                <a href="${mailToUrl}">support@ezclocker.com</a> for help resolving the error.`);
    }

    /**
     * @public @method
     * Shows a dialog with information about Primary Jobs.
     * @returns {Promise.resolve}
     */
    ezShowPrimaryJobHelpPopUp() {
        return ezApi.ezclocker.ezDialog.ezShowOK(
            "About Primary Jobs",
            EzHtml.template`
                <p>
                    The employee's Primary Job represents the job a employee would assign to most of their time entries. Assigning a Primary Job simplifies
                    the clock in operation for employees who normally assign the same job to their time entries.
                </p>
                <p>
                    The Manage Jobs dialog allows you to designate if the job a employee is assigned to is their Primary Job by checking the
                    "Set as Employee's Primary Job" checkbox in the Assign Employee dialog. A employee can only have one Primary Job.
                <p>
                <p>
                    When an employee has a Primary Job assigned:
                    <ul>
                        <li>The Primary Job is automaticlly assigned to the time entry when the employee clocks in.</li>
                        <li>The employee is not asked to select a Job when clocking in.</li>
                        <li>Employees can still edit their time entry and change the assigned job if needed after clocking in.</li>
                    </ul>
                </p>`,
            null,
            '50%');
    }
}
