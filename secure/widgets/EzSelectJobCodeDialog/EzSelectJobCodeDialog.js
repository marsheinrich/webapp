import {
    EzException,
    EzBadParamException
} from '/ezlibrary/exceptions/EzExceptions.js';

import {
    EzObject,
    EzBoolean,
    EzString
} from '/ezlibrary/helpers/EzHelpers.js';

import {
    EzRegistrationState,
    EzDataTagFilterType,
    EzDataTagType,
    EzElementEventName,
    EzSelectJobCodeDialogMode
} from '/ezlibrary/enums/EzEnumerations.js';

import { EzClass } from '/ezlibrary/EzClass.js';

import { EzDateTime } from '/public/javascript/common/ez-date-time.js';

import { EzEventEngine } from '/ezlibrary/ez-event-engine.js';

import { EzClockerContext } from '/ezlibrary/EzClockerContext/ez-context.js';

import { EzNavigation } from '/public/javascript/common/ezclocker-navigation-helper.js';

import { EzDataTagService } from '/secure/javascript/services/ezclocker-datatag-service.js';

import { EzUI } from '/public/javascript/common/ezui.js';

import { EzDialogConfig } from '/ezlibrary/ux/dialogs/EzDialogConfig.js';

import { EzDialog } from '/public/javascript/common/ezclocker-dialog-helper.js';

import { EzSelectJobCodeShowDialogOptions } from '/secure/widgets/EzSelectJobCodeDialog/EzSelectJobCodeDialogShowOptions.js';

/**
    Select employee assigned job dialog
    Import with:
        import { EzSelectJobCodeDialog } from '/secure/widgets/EzSelectJobCodeDialog/EzSelectJobCodeDialog.js';

        globalThis.ezApi.ezclocker[EzSelectJobCodeDialog.ezApiName] &&
        globalThis.ezApi.ezclocker[EzSelectJobCodeDialogezEventNames.ezApiName].ready

        document.addEventListener(
            EzSelectJobCodeDialog.ezEventNames.onReady,
            this.#ezRegistrator);
 */
export class EzSelectJobCodeDialog extends EzClass {
    /**
        @public @static @field
        @type {EzClockerContext}
     */
    static #ezInstance = Object.prototype.hasOwnProperty.call(globalThis, 'ezApi') &&
        globalThis.ezApi &&
        Object.prototype.hasOwnProperty.call(globalThis.ezApi, 'ezclocker') &&
        globalThis.ezApi.ezclocker &&
        Object.prototype.hasOwnProperty.call(globalThis.ezApi.ezclocker, EzSelectJobCodeDialog.ezApiName) &&
        globalThis.ezApi.ezclocker[EzSelectJobCodeDialog.ezApiName]
        ? globalThis.ezApi.ezclocker[EzSelectJobCodeDialog.ezApiName]
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
        Object.prototype.hasOwnProperty.call(globalThis.ezApi.ezclocker, EzSelectJobCodeDialog.ezApiName) &&
        globalThis.ezApi.ezclocker[EzSelectJobCodeDialog.ezApiName]
        ? EzRegistrationState.REGISTERED
        : null;

    /**
        @public @static @readonly @property
        Returns the name of this class's singleton instance when registered with ezApi.
        @returns {string}
     */
    static get ezApiName() {
        return 'ezSelectJobCodeDialog';
    }

    /**
        @public @static @readonly @property
        Returns an object of event names that this class may trigger.
        @returns {object}
     */
    static get ezEventNames() {
        return {
            onReady: 'ezOn_EzSelectJobCodeDialog_Ready',
            onJobSelected: 'ezOn_EzSelectJobCodeDialog_JobSelected',
            onNoJobSelected: 'ezOn_EzSelectJobCodeDialog_NoJobSelected'
        };
    }

    /**
        @public @static @property @getter
        Returns the ezApi registration state of this classes's singleton instance.
        @returns {string}
        A valid enum property value from EzRegistrationState
     */
    static get ezApiRegistrationState() {
        return EzSelectJobCodeDialog.#ezApiRegistrationState;
    }

    /**
        @public @static @property @setter
        Sets the ezApi registration state of this classes's singleton instance.
        @param {string} ezApiRegistrationState
        A valid enum property value from EzRegistrationState
     */
    static set ezApiRegistrationState(ezApiRegistrationState) {
        EzSelectJobCodeDialog.#ezApiRegistrationState = EzRegistrationState.ezValueOf(ezApiRegistrationState);
    }

    /**
        @public @static @getter @property
        Returns the singleton instance of EzDateTime registered with EzApi (if available yet)
        @param {EzClockerContext}
     */
    static get ezInstance() {
        return EzSelectJobCodeDialog.#ezInstance;
    }

    /**
        @public @static @getter @property
        Returns the singleton instance of EzDateTime registered with EzApi (if available yet)
     */
    static set ezInstance(ezSelectJobCodeDialog) {
        if (null != EzSelectJobCodeDialog.#ezInstance) {
            throw new Error('EzSelectJobCodeDialog\'s singleton instance is already reigstered with EzApi.');
        }

        EzSelectJobCodeDialog.#ezInstance = ezSelectJobCodeDialog;
    }

    /**
        @public @static @readonly @property
        Returns if all necessary dependences are ready and therefore it is ok for this class to
        register it's singleton instance with ezApi.
        @returns {boolean}
     */
    static get ezCanRegister() {
        return EzRegistrationState.PENDING === EzSelectJobCodeDialog.ezApiRegistrationState &&
            Object.prototype.hasOwnProperty.call(globalThis, 'ezApi') &&
            globalThis.ezApi && globalThis.ezApi.ready &&

            globalThis.ezApi.ezclocker[EzDateTime.ezApiName] &&
            globalThis.ezApi.ezclocker[EzDateTime.ezApiName].ready &&

            globalThis.ezApi.ezclocker[EzEventEngine.ezApiName] &&
            globalThis.ezApi.ezclocker[EzEventEngine.ezApiName].ready &&

            globalThis.ezApi.ezclocker[EzNavigation.ezApiName] &&
            globalThis.ezApi.ezclocker[EzNavigation.ezApiName].ready &&

            globalThis.ezApi.ezclocker[EzClockerContext.ezApiName] &&
            globalThis.ezApi.ezclocker[EzClockerContext.ezApiName].ready &&

            globalThis.ezApi.ezclocker[EzDataTagService.ezApiName] &&
            globalThis.ezApi.ezclocker[EzDataTagService.ezApiName].ready &&

            globalThis.ezApi.ezclocker[EzUI.ezApiName] &&
            globalThis.ezApi.ezclocker[EzUI.ezApiName].ready &&

            globalThis.ezApi.ezclocker[EzDialog.ezApiName] &&
            globalThis.ezApi.ezclocker[EzDialog.ezApiName].ready;
    }

    /**
        @private @static @readonly @property
        Returns if this class's singleton instance is registered with ezApi yet.
        @returns {boolean}
     */
    static get #ezIsRegistered() {
        return null != EzSelectJobCodeDialog.ezInstance &&
            EzRegistrationState.REGISTERED === EzSelectJobCodeDialog.ezApiRegistrationState;
    }

    /**
        @private @static @method
        Attempts to register the singleton instance for this class with ezApi. Returns true
        if successful, false otherwise.
        @returns {boolean}
     */
    static #ezRegistrator() {
        if (EzSelectJobCodeDialog.ezCanRegister && !EzSelectJobCodeDialog.#ezIsRegistered) {
            globalThis.ezApi.ezRegisterNewApi(EzSelectJobCodeDialog, EzSelectJobCodeDialog.ezApiName);
        }

        return EzRegistrationState.REGISTERED === EzSelectJobCodeDialog.ezApiRegistrationState;
    }

    /**
        @static
        Static Initializer
     */
    static {
        if (!EzSelectJobCodeDialog.#ezIsRegistered) {
            EzSelectJobCodeDialog.ezApiRegistrationState = EzRegistrationState.PENDING;

            if (!EzSelectJobCodeDialog.#ezRegistrator()) {
                document.addEventListener(
                    'onEzApiReady',
                    () => {
                        if (!EzSelectJobCodeDialog.#ezRegistrator()) {

                            document.addEventListener(
                                EzDateTime.ezEventNames.onReady,
                                EzSelectJobCodeDialog.#ezRegistrator);

                            document.addEventListener(
                                EzEventEngine.ezEventNames.onReady,
                                EzSelectJobCodeDialog.#ezRegistrator);

                            document.addEventListener(
                                EzNavigation.ezEventNames.onReady,
                                EzSelectJobCodeDialog.#ezRegistrator);

                            document.addEventListener(
                                EzClockerContext.ezEventNames.onReady,
                                EzSelectJobCodeDialog.#ezRegistrator);

                            document.addEventListener(
                                EzDataTagService.ezEventNames.onReady,
                                EzSelectJobCodeDialog.#ezRegistrator);

                            document.addEventListener(
                                EzUI.ezEventNames.onReady,
                                EzSelectJobCodeDialog.#ezRegistrator);

                            document.addEventListener(
                                EzDialog.ezEventNames.onReady,
                                EzSelectJobCodeDialog.#ezRegistrator);
                        }
                    });
            }
        }
    }

    /**
        @public @static @readonly @property
        Returns the default dialog help HTML
        @returns {string}
     */
    static get DEFAULT_EMPLOYEE_ASSIGNED_JOBS_DIALOG_MODE_HELP() {
        return '';
    }

    /**
        @public @static @readonly @property
        Returns the default dialog help HTML
        @returns {string}
     */
    static get DEFAULT_ALL_EMPLOYER_JOBS_DIALOG_MODE_HELP() {
        return ezApi.ezTemplate`
            <div
                id="EzSelectJobCodeDialog_DefaultHelpContainer"
                class="ezText-small-navy">
                <ul>
                    <li>
                        Select a job from the available jobs above and click OK.
                    </li>
                    <li>
                        If you do not wish to select a job either press the Escape (ESC) key or select the
                        "None (no job assignment)" option and then click OK.
                    </li></ul>
            </div>`;
    }

    /**
        @public @static @readonly @property
        Returns the default dialog job select input label
        @returns {string}
     */
    static get DEFAULT_EMPLOYEE_ASSIGNED_JOBS_DIALOG_MODE_SELECT_INPUT_LABEL() {
        return 'Select a Job';
    }

    /**
        @public @static @readonly @property
        Returns the default dialog job select input label
        @returns {string}
     */
    static get DEFAULT_ALL_EMPLOYER_JOBS_DIALOG_MODE_SELECT_INPUT_LABEL() {
        return 'Available Jobs';
    }

    /**
        @public @static @readonly @property
        Returns the default dialog title
        @returns {string}
     */
    static get DEFAULT_EMPLOYEE_ASSIGNED_JOBS_DIALOG_MODE_TITLE() {
        return 'Employee Job Selection';
    }

    /**
        @public @static @readonly @property
        Returns the default dialog title
        @returns {string}
     */
    static get DEFAULT_ALL_EMPLOYER_JOBS_DIALOG_MODE_TITLE() {
        return 'Job Selection';
    }

    /**
        @static
        @public @readonly @property
        Returns the ID for the clock-in button on the employer dashboard.
        @returns {string}
     */
    static get EMPLOYER_CLOCK_IN_BUTTON_ID() {
        return '_EmployeeClockInButton';
    }

    /**
        @static
        @public @readonly @property
        Returns the ID for the clock-in/break-in/out button on the employee dashboard.
        @returns {string}
     */
    static get EMPLOYEE_CLOCK_IN_BREAK_IN_OUT_BUTTON_ID() {
        return 'clockInBreakInOut';
    }

    /**
        @public @constructor
     */
    constructor() {
        super();
    }

    #ezDialogShowing = false;

    /**
        @private @field
        Stores the dialog mode
        @type {string}
        A valid enum property value from EzSelectJobCodeDialogMode
     */
    #ezDialogMode = EzSelectJobCodeDialogMode.EMPLOYEE_ASSIGNED_JOBS;

    /**
        @private @field
        Stores the dialog's title
        @type {string}
        A valid enum property value from EzSelectJobCodeDialogMode
     */
    #ezDialogTitle = EzSelectJobCodeDialogMode.DEFAULT_EMPLOYEE_ASSIGNED_JOBS_DIALOG_MODE_TITLE;

    /**
        @private @field
        Stores the dialog's help HTML
        @type {string}
        A valid enum property value from EzSelectJobCodeDialogMode
     */
    #ezDialogHelpHtml = EzSelectJobCodeDialog.DEFAULT_EMPLOYEE_ASSIGNED_JOBS_DIALOG_MODE_HELP;

    /**
        @private @field
        Stores the dialog's select input label
        @type {string}
        A valid enum property value from EzSelectJobCodeDialogMode
     */
    #ezDialogSelectInputLabel = EzSelectJobCodeDialog.DEFAULT_EMPLOYEE_ASSIGNED_JOBS_DIALOG_MODE_SELECT_INPUT_LABEL;

    /**
        @private @field
        Stores the HTML element id that the user interacted with to show this dialog (normally an HTML button id, inputid, or link id)
        @type {array}
     */
    #ezShowDialogElementId = null;

    /**
        @private @field
        Stores the array of available jobs
        @type {array}
     */
    #ezAvailableJobs = [];

    /**
        @public @property @setter
        Stores the selected job index value
        @type {number}
     */
    #ezSelectedJobIndex = -1;

    /**
        @public @property @setter
        Gets the selected job index value
        @returns {number}
     */
    get ezSelectedJobIndex() {
        return this.#ezSelectedJobIndex;
    }

    /**
        @public @property @setter
        Sets the selected job index value
        @param {number} ezSelectedJobIndex
     */
    set ezSelectedJobIndex(ezSelectedJobIndex) {
        this.#ezSelectedJobIndex = ezApi.ezIsNumber(ezSelectedJobIndex)
            ? ezSelectedJobIndex
            : -1;
    }


    /**
        @public @property @getter
        Returns an array of available jobs
        @returns {array}
     */
    get ezAvailableJobs() {
        return this.#ezAvailableJobs;
    }

    /**
        @public @property @getter
        Sets the array of available jobs
        @param {array}
     */
    set ezAvailableJobs(ezAvailableJobs) {
        this.#ezAvailableJobs = ezApi.ezArrayHasLength(ezAvailableJobs)
            ? ezAvailableJobs
            : [];
    }

    /**
        @public @property @getter
        Returns the clock in button id associated with this dialog.
        @returns {string|null}
     */
    get ezShowDialogElementId() {
        return this.#ezShowDialogElementId;
    }

    /**
        @public @property @setter
        Sets the clock in button id that would show this dialog.
        @param {undefined|null|string}
     */
    set ezShowDialogElementId(ezShowDialogElementId) {
        this.#ezShowDialogElementId = ezApi.ezStringHasLength(ezShowDialogElementId)
            ? ezShowDialogElementId
            : null;
    }

    /**
        @public @readonly @property
        Returns the reference to the html element associated with the clock in button id (if set).
        If the element does not exist or the clock in button id is not set, then null is returned.
        @return {object|null}
     */
    get ezShowDialogElement() {
        return ezApi.ezStringHasLength(EzSelectJobCodeDialog.ezInstance.ezShowDialogElementId) &&
            ezApi.ezclocker.ezUi.ezElementExists(EzSelectJobCodeDialog.ezInstance.ezShowDialogElementId)
            ? ezApi.ezclocker.ezUi.ezId(EzSelectJobCodeDialog.ezInstance.ezShowDialogElementId)
            : null;
    }

    /**
        @public @readonly @property
        Determines if this dialog is open and visible to the user.
        @returns {boolean}
     */
    get ezDialogOpen() {
        return ezApi.ezclocker.ezUi.ezId(this.ezIds.dialogId).dialog('isOpen');
    }

    /**
        @public @readonly @property
        Returns an object of HTML element ids commonly used in this dialog.
        @returns {object}
     */
    get ezIds() {
        return {
            dialogId: 'EzSelectJobCodeDialog',
            labels: {
                jobSelectInputLabelId: 'EzSelectedJobCodeDialog_JobSelectInputLabel'
            },
            inputs: {
                jobSelectInputId: 'EzSelectedJobCodeDialog_JobSelectInput'
            },
            containers: {
                helpContainerId: 'EzSelectedJobCodeDialog_HelpContainer'
            }
        }
    }

    /**
        @public @property @getter
        Returns the dialog's title.
        @returns {string}
     */
    get ezDialogTitle() {
        return this.#ezDialogTitle;
    }

    /**
        @public @property @setter
        Sets the dialog's title
        @returns {string}
     */
    set ezDialogTitle(ezDialogTitle) {
        this.#ezDialogTitle = ezApi.ezStringOrDefault(
            ezDialogTitle,
            this.ezGetDefaultDialogTitleForDialogMode);

        if (ezApi.ezclocker.ezUi.ezElementExists(EzSelectJobCodeDialog.ezInstance.ezIds.dialogId)) {
            // If the element is available, update the help HTML now. Otherwise, it will update durin ezShow call.
            ezApi.ezclocker.ezUi.ezId(EzSelectJobCodeDialog.ezInstance.ezIds.dialogId).dialog({
                title: EzSelectJobCodeDialog.ezInstance.ezDialogTitle
            });
        }
    }

    /**
        @public @property @getter
        Returns the dialog's help html
        @returns {string}
     */
    get ezDialogHelpHtml() {
        return this.#ezDialogHelpHtml;
    }

    /**
        @public @property @setter
        Sets the dialog's help html
        @returns {string}
     */
    set ezDialogHelpHtml(ezDialogHelpHtml) {
        this.#ezDialogHelpHtml = ezApi.ezIsString(ezDialogHelpHtml)
            ? ezApi.ezTemplate`${ezDialogHelpHtml}`
            : ezApi.ezTemplate`${this.ezGetDefaultHelpForDialogMode}`;

        if (ezApi.ezclocker.ezUi.ezElementExists(EzSelectJobCodeDialog.ezInstance.ezIds.containers.helpContainerId)) {
            // If the element is available, update the help HTML now. Otherwise, it will update durin ezShow call.
            ezApi.ezclocker.ezUi.ezContent(
                EzSelectJobCodeDialog.ezInstance.ezIds.containers.helpContainerId,
                EzSelectJobCodeDialog.ezInstance.ezDialogHelpHtml);
        }
    }

    /**
        @public @property @getter
        Returns the dialog's select input label
        @returns {string}
     */
    get ezDialogSelectInputLabel() {
        return this.#ezDialogSelectInputLabel;
    }

    /**
        @public @property @setter
        Sets the dialog's select input label
        @returns {string}
     */
    set ezDialogSelectInputLabel(ezDialogSelectInputLabel) {
        this.#ezDialogSelectInputLabel = ezApi.ezStringOrDefault(
            ezDialogSelectInputLabel,
            this.ezGetDefaultSelectInputLabelForDialogMode);

        if (ezApi.ezclocker.ezUi.ezElementExists(EzSelectJobCodeDialog.ezInstance.ezIds.labels.selectJobCodeInputLabelId)) {
            // If the element is available, update the help HTML now. Otherwise, it will update durin ezShow call.
            ezApi.ezclocker.ezUi.ezContent(
                EzSelectJobCodeDialog.ezInstance.ezIds.labels.selectJobCodeInputLabelId,
                EzSelectJobCodeDialog.ezInstance.ezDialogSelectInputLabel);
        }
    }

    /**
        @public @property @getter
        Returns the dialog mode to show this dialog in
        @returns {string}
        A valid enum property value from EzSelectJobCodeDialogMode
     */
    get ezDialogMode() {
        return this.#ezDialogMode;
    }

    /**
        @public @property @getter
        Sets the dialog mode to show this dialog in
        @param {string}
        A valid enum property value from EzSelectJobCodeDialogMode
     */
    set ezDialogMode(ezSelectJobCodeDialogMode) {
        let ezSelectJobCodeDialogModeToUse = EzSelectJobCodeDialogMode.ezValueOf(ezSelectJobCodeDialogMode);

        if (this.#ezDialogMode !== ezSelectJobCodeDialogModeToUse) {
            this.#ezDialogMode = ezSelectJobCodeDialogModeToUse;

            if (EzBoolean.isTrue(this.ezDialogOpen)) {
                // Close and re-open to re-initialize the dialog in the new mode
                ezApi.ezclocker.ezDialog.ezCloseDialog(this.ezIds.dialogId);

                this.ezShow(
                    this.#ezDialogMode,
                    this.ezShowDialogButtonId,
                    this.ezGetDefaultDialogTitleForDialogMode(),
                    this.ezGetDefaultSelectInputLabelForDialogMode(),
                    this.ezGetDefaultHelpForDialogMode());
            } else {
                this.ezDialogTitle = this.ezGetDefaultDialogTitleForDialogMode();
                this.ezDialogSelectInputLabel = this.ezGetDefaultSelectInputLabelForDialogMode();
                this.ezDialogHelpHtml = this.ezGetDefaultHelpForDialogMode();
            }
        }
    }

    /**
        @public @method
        Shows the EzSelectJobCodeDialog UX
        @param {undefined|null|string} ezSelectJobCodeDialogMode
        A valid enum property value from EzSelectJobCodeDialogMode.
        If not provided, will assume EzSelectJobCodeDialogMode.EMPLOYEE_ASSIGNED_JOBS
        @param {undefined|null|string} showDialogElementId
        The html element id that the user interacts with to show this dialog. The dialog will appear directly below
        the element if it exists. Otherwise, the dialog appears window center.
        @param {undefined|null|string} dialogTitle
        @param {undefined|null|string} dialogSelectInputLabel
        @param {undefined|null|string} dialogHelpHtml
     */
    ezShow(ezSelectJobCodeDialogMode, showDialogElementId, dialogTitle, dialogSelectInputLabel, dialogHelpHtml) {
        if (EzBoolean.isTrue(this.#ezDialogShowing)) {
            // Dialog already attempting to show
            ezApi.ezclocker.ezLogger.warn(
                'Ignored EzSelectJobCodeDialog.ezShow() call: The dialog is currently in progress of showing from a previous call.');
            return;
        }

        this.#ezDialogShowing = true;

        EzSelectJobCodeDialog.ezInstance.ezDialogMode = EzObject.isValid(ezSelectJobCodeDialogMode)
            ? ezSelectJobCodeDialogMode
            : EzSelectJobCodeDialogMode.EMPLOYEE_ASSIGNED_JOBS;

        let ezSelectJobCodeShowDialogOptions = new EzSelectJobCodeShowDialogOptions(
            EzObject.isValid(ezSelectJobCodeDialogMode)
                ? ezSelectJobCodeDialogMode
                : EzSelectJobCodeDialogMode.EMPLOYEE_ASSIGNED_JOBS,
            ezApi.ezIsString(dialogTitle)
                ? dialogTitle
                : EzSelectJobCodeDialog.ezInstance.ezGetDefaultDialogTitleForDialogMode(),
            ezApi.ezIsString(dialogSelectInputLabel)
                ? dialogSelectInputLabel
                : EzSelectJobCodeDialog.ezInstance.ezGetDefaultSelectInputLabelForDialogMode(),
            ezApi.ezIsString(dialogHelpHtml)
                ? dialogHelpHtml
                : EzSelectJobCodeDialog.ezInstance.ezGetDefaultHelpForDialogMode(),
            ezApi.ezStringHasLength(showDialogElementId)
                ? showDialogElementId
                : null);

        let self = this;

        return ezApi.ezclocker.ezUi.ezPageWaitExecute(
            'Loading available job assignments ...',
            (waitDone) => EzSelectJobCodeDialog.ezInstance.ezShowDialog(ezSelectJobCodeShowDialogOptions)
                .then(waitDone)
                .then(() => self.#ezDialogShowing = false));
    }

    /**
        @public @method
        Closes the EzSelectJobCodeDialog
     */
    ezClose() {
        if (-1 == EzSelectJobCodeDialog.ezInstance.ezSelectedJobIndex) {
            EzSelectJobCodeDialog.ezInstance.ezTriggerOnNoJobSelectedEvent();
        } else {
            EzSelectJobCodeDialog.ezInstance.ezTriggerOnJobSelectedEvent();
        }

        EzSelectJobCodeDialog.ezInstance.ezSelectedJobIndex = -1;
        ezApi.ezclocker.ezDialog.ezCloseDialog(EzSelectJobCodeDialog.ezInstance.ezIds.dialogId);
    }

    /**
        @public @method
        Ignores any data entered or selected
        Triggers the default selection
        Closes the dialog.
     */
    ezCancel() {
        EzSelectJobCodeDialog.ezInstance.ezSelectedJobIndex = -1;
        EzSelectJobCodeDialog.ezInstance.ezClose();
    }

    /**
        @public @method
        Submits the users input data and/or selections in EzSelectJobCodeDialog UX
     */
    ezSubmit() {
        EzSelectJobCodeDialog.ezInstance.ezClose();
    }

    /**
        @protected @method
        Initializes the EzSelectJobCodeDialog
        @returns {EzSelectJobCodeDialog}
     */
    ezInit() {
        ezApi.ezclocker.ezEventEngine.ezRegisterEvent(
            EzSelectJobCodeDialog.ezApiName,
            EzSelectJobCodeDialog.ezEventNames.onJobSelected);

        ezApi.ezclocker.ezEventEngine.ezRegisterEvent(
            EzSelectJobCodeDialog.ezApiName,
            EzSelectJobCodeDialog.ezEventNames.onNoJobSelected);

        EzSelectJobCodeDialog.ezInstance.ezInitUX();

        return EzSelectJobCodeDialog.ezInstance;
    }

    /**
        @protected @method
        Initializes the EzSelectJobCodeDialog UX
     */
    ezInitUX() {
        ezApi.ezclocker.ezUi.ezAppendContent(
            'body',
            EzSelectJobCodeDialog.ezInstance.ezBuildSelectJobCodeDialogHTML());

        let dialogConfig = new EzDialogConfig(EzSelectJobCodeDialog.ezInstance.ezIds.dialogId);

        dialogConfig.width = '600';

        dialogConfig.modal = false;

        dialogConfig.draggable = false;

        dialogConfig.buttons = [
            {
                id: 'EzExportDialog_ExportButton',
                text: 'OK',
                click: EzSelectJobCodeDialog.ezInstance.ezSubmit
            }
        ];

        dialogConfig.dialogClass = EzString.stringHasLength(dialogConfig.dialogClass)
            ? `${dialogConfig.dialogClass} ezDialog-no-close-button`
            : 'ezDialog-no-close-button';

        dialogConfig.closeOnEscape = true;

        ezApi.ezclocker.ezDialog.ezInitDialogWithConfig(
            EzSelectJobCodeDialog.ezInstance.ezIds.dialogId,
            dialogConfig);
    }

    /**
        @protected @method
        Initializes the EzSelectJobCodeDialog's data
        @returns {Promise.resolve}
     */
    ezInitData(ezSelectJobCodeShowDialogOptions) {
        if (!EzObject.isValid(ezSelectJobCodeShowDialogOptions)) {
            throw new EzBadParamException(
                'ezSelectJobCodeShowDialogOptions',
                EzSelectJobCodeDialog.ezInstance,
                EzSelectJobCodeDialog.ezInstance.ezInitData);
        }

        return ezApi.ezAsyncAction(
            (finished) => {
                EzSelectJobCodeDialog.ezInstance.ezAvailableJobs = [];
                switch (EzSelectJobCodeDialog.ezInstance.ezDialogMode) {
                    case EzSelectJobCodeDialogMode.EMPLOYEE_ASSIGNED_JOBS:
                        return ezApi.ezclocker.ezDataTagService.ezGetAllDataTagsAssignedToEmployee(
                            ezApi.ezclocker.ezClockerContext.ezGetActiveEmployee().id,
                            EzDataTagType.JOB_CODE,
                            EzDataTagFilterType.ACTIVE)
                            .then(
                                (response) => {
                                    EzSelectJobCodeDialog.ezInstance.ezAvailableJobs = response.entities;

                                    return finished(ezSelectJobCodeShowDialogOptions)
                                },
                                (eResponse) => {
                                    ezApi.ezclocker.ezLogger.error(
                                        ezApi.ezEM`
                                            Unable to obtain the active jobs assign to the active employee.
                                            Error response: ${ezApi.ezToJson(eResponse)}`);

                                    return finished(ezSelectJobCodeShowDialogOptions);
                                });
                    case EzSelectJobCodeDialogMode.ALL_EMPLOYER_JOBS:
                    case EzSelectJobCodeDialogMode.CUSTOM:
                        throw new EzException(
                            ezApi.ezEm`
                                The dialog mode ${EzSelectJobCodeDialog.ezInstance.ezDialogMode} is pending
                                implementation and not yet available for use.`);
                }
            });
    }

    /**
        @protected @method
        Resets the UX to the initial state
        @param {EzSelectJobCodeShowDialogOptions} ezSelectJobCodeShowDialogOptions
        @returns {Promise.resolve}
        Resolve returns the updated ezSelectJobCodeShowDialogOptions
     */
    ezResetUX(ezSelectJobCodeShowDialogOptions) {
        if (!EzObject.isValid(ezSelectJobCodeShowDialogOptions)) {
            throw new EzBadParamException(
                'ezSelectJobCodeShowDialogOptions',
                EzSelectJobCodeDialog.ezInstance,
                EzSelectJobCodeDialog.ezInstance.ezResetUX);
        }

        return ezApi.ezAsyncAction(
            (finished) => {
                ezApi.ezclocker.ezEventEngine.ezWantElementEvent(
                    EzSelectJobCodeDialog.ezInstance.ezIds.inputs.jobSelectInputId,
                    EzElementEventName.CHANGE,
                    EzSelectJobCodeDialog.ezApiName,
                    EzSelectJobCodeDialog.ezInstance.ezHandleJobSelectInputChangeEvent);

                if (ezApi.ezclocker.ezUi.ezElementExists(EzSelectJobCodeDialog.ezInstance.ezIds.dialogId)) {
                    ezApi.ezclocker.ezUi.ezId(EzSelectJobCodeDialog.ezInstance.ezIds.dialogId).dialog({
                        title: EzSelectJobCodeDialog.ezInstance.ezDialogTitle
                    });
                }

                if (ezApi.ezclocker.ezUi.ezElementExists(EzSelectJobCodeDialog.ezInstance.ezIds.labels.helpContainerId)) {
                    ezApi.ezclocker.ezUi.ezContent(
                        EzSelectJobCodeDialog.ezInstance.ezIds.containers.helpContainerId,
                        EzSelectJobCodeDialog.ezInstance.ezDialogHelpHtml);
                }

                if (ezApi.ezclocker.ezUi.ezElementExists(EzSelectJobCodeDialog.ezInstance.ezIds.labels.selectJobCodeInputLabelId)) {
                    ezApi.ezclocker.ezUi.ezContent(
                        EzSelectJobCodeDialog.ezInstance.ezIds.labels.selectJobCodeInputLabelId,
                        EzSelectJobCodeDialog.ezInstance.ezDialogSelectInputLabel);
                }

                // Reset the selected job index
                EzSelectJobCodeDialog.ezInstance.ezSelectedJobIndex = -1;

                return finished(ezSelectJobCodeShowDialogOptions);
            });
    }

    /**
        @protected @method
        Shows the dialog's UX
        @param {EzSelectJobCodeShowDialogOptions} ezSelectJobCodeShowDialogOptions
        @returns {Promise.resolve}
        Resolve returns the updated ezSelectJobCodeShowDialogOptions
     */
    ezShowDialog(ezSelectJobCodeShowDialogOptions) {
        if (!EzObject.isValid(ezSelectJobCodeShowDialogOptions)) {
            throw new EzBadParamException(
                'ezSelectJobCodeShowDialogOptions',
                EzSelectJobCodeDialog.ezInstance,
                EzSelectJobCodeDialog.ezInstance.ezShowDialog);
        }

        return ezApi.ezAsyncAction(
            (finished) => EzSelectJobCodeDialog.ezInstance.ezBeforeShowDialog(ezSelectJobCodeShowDialogOptions)
                .then(
                    (updatedEzSelectJobCodeShowDialogOptions) => {
                        if (EzBoolean.isTrue(updatedEzSelectJobCodeShowDialogOptions.ezAllowShowDialog)) {

                            EzSelectJobCodeDialog.ezInstance.ezLoadAvailableJobSelectOptions();

                            if (ezApi.ezclocker.ezUi.ezElementExists(EzSelectJobCodeDialog.EMPLOYER_CLOCK_IN_BUTTON_ID)) {
                                ezApi.ezclocker.ezUi.ezDisableElement(EzSelectJobCodeDialog.EMPLOYER_CLOCK_IN_BUTTON_ID);
                                const employerClockInButtonHeight = ezApi.ezclocker.ezUi.ezGetElementHeight(
                                    EzSelectJobCodeDialog.EMPLOYER_CLOCK_IN_BUTTON_ID);

                                let newPosition = {
                                    my: 'left top',
                                    at: `left top+${employerClockInButtonHeight + 5}`,
                                    of: `#${EzSelectJobCodeDialog.EMPLOYER_CLOCK_IN_BUTTON_ID}`,
                                    collision: 'fit'
                                };

                                // Employer dashboard
                                // Update show position based on if the clock in button id was provided
                                ezApi.ezclocker.ezUi.ezId(EzSelectJobCodeDialog.ezInstance.ezIds.dialogId)
                                    .dialog('option', 'position', newPosition);
                            } else if (ezApi.ezclocker.ezUi.ezElementExists(EzSelectJobCodeDialog.EMPLOYEE_CLOCK_IN_BREAK_IN_OUT_BUTTON_ID)) {
                                ezApi.ezclocker.ezUi.ezDisableElement(EzSelectJobCodeDialog.EMPLOYEE_CLOCK_IN_BREAK_IN_OUT_BUTTON_ID);
                                const employeeClockInBreaInOutButtonHeight = ezApi.ezclocker.ezUi.ezGetElementHeight(
                                    EzSelectJobCodeDialog.EMPLOYEE_CLOCK_IN_BREAK_IN_OUT_BUTTON_ID);

                                let newPosition = {
                                    my: 'right top',
                                    at: `right top+${employeeClockInBreaInOutButtonHeight + 5}`,
                                    of: `#${EzSelectJobCodeDialog.EMPLOYEE_CLOCK_IN_BREAK_IN_OUT_BUTTON_ID}`,
                                    collision: 'fit'
                                };

                                // Employee dashboard
                                // Update show position based on if the clock in button id was provided
                                ezApi.ezclocker.ezUi.ezId(EzSelectJobCodeDialog.ezInstance.ezIds.dialogId)
                                    .dialog('option', 'position', newPosition);
                            }

                            ezApi.ezclocker.ezDialog.ezShowDialog(EzSelectJobCodeDialog.ezInstance.ezIds.dialogId);
                        } else {
                            // Dialog not going to show
                            EzSelectJobCodeDialog.ezInstance.ezTriggerOnNoJobSelectedEvent();
                        }

                        return finished(updatedEzSelectJobCodeShowDialogOptions);
                    }));
    }

    /**
        @protected @method
        Actions performed before the ezShowDialog() method is called.
        @param {EzSelectJobCodeShowDialogOptions} ezSelectJobCodeShowDialogOptions
        @returns {Promise.resolve}
        Resolve returns the updated ezSelectJobCodeShowDialogOptions
     */
    ezBeforeShowDialog(ezSelectJobCodeShowDialogOptions) {
        if (!EzObject.isValid(ezSelectJobCodeShowDialogOptions)) {
            throw new EzBadParamException(
                'ezSelectJobCodeShowDialogOptions',
                EzSelectJobCodeDialog.ezInstance,
                EzSelectJobCodeDialog.ezInstance.ezBeforeShowDialog);
        }

        return ezApi.ezAsyncAction(
            (finished) => EzSelectJobCodeDialog.ezInstance.ezApplyShowDialogOptions(ezSelectJobCodeShowDialogOptions)
                .then(
                    (updatedEzSelectJobCodeShowDialogOptions) => EzSelectJobCodeDialog.ezInstance.ezInitData(updatedEzSelectJobCodeShowDialogOptions)
                        .then(
                            (updatedEzSelectJobCodeShowDialogOptions2) => {
                                updatedEzSelectJobCodeShowDialogOptions2.ezAllowShowDialog = ezApi.ezArrayHasLength(
                                    EzSelectJobCodeDialog.ezInstance.ezAvailableJobs);

                                return finished(updatedEzSelectJobCodeShowDialogOptions2);
                            })));
    }

    /**
        @protected @method
        Applies the EzSelectJobCodeShowDialogOptions to this dialog
        @param {EzSelectJobCodeShowDialogOptions} ezSelectJobCodeShowDialogOptions
        @returns {Promise.resolve}
        Resolve returns the updated ezSelectJobCodeShowDialogOptions
     */
    ezApplyShowDialogOptions(ezSelectJobCodeShowDialogOptions) {
        if (!EzObject.isValid(ezSelectJobCodeShowDialogOptions)) {
            throw new EzBadParamException(
                'ezSelectJobCodeShowDialogOptions',
                EzSelectJobCodeDialog.ezInstance,
                EzSelectJobCodeDialog.ezInstance.ezApplyShowDialogOptions);
        }

        return ezApi.ezAsyncAction(
            (finished) => {
                EzSelectJobCodeDialog.ezInstance.ezDialogMode = EzObject.isValid(ezSelectJobCodeShowDialogOptions.ezSelectJobCodeDialogMode)
                    ? ezSelectJobCodeShowDialogOptions.ezSelectJobCodeDialogMode
                    : EzSelectJobCodeDialogMode.EMPLOYEE_ASSIGNED_JOBS;

                    EzSelectJobCodeDialog.ezInstance.ezDialogTitle = ezApi.ezIsString(ezSelectJobCodeShowDialogOptions.ezDialogTitle)
                        ? ezSelectJobCodeShowDialogOptions.ezDialogTitle
                        : EzSelectJobCodeDialog.ezInstance.ezGetDefaultDialogTitleForDialogMode();

                EzSelectJobCodeDialog.ezInstance.ezDialogSelectInputLabel = ezApi.ezIsString(ezSelectJobCodeShowDialogOptions.ezDialogSelectInputLabel)
                    ? ezSelectJobCodeShowDialogOptions.ezDialogSelectInputLabel
                    : EzSelectJobCodeDialog.ezInstance.ezGetDefaultSelectInputLabelForDialogMode();

                EzSelectJobCodeDialog.ezInstance.ezDialogHelp = ezApi.ezIsString(ezSelectJobCodeShowDialogOptions.ezDialogHelpHtml)
                    ? ezSelectJobCodeShowDialogOptions.ezDialogHelpHtml
                    : EzSelectJobCodeDialog.ezInstance.ezGetDefaultHelpForDialogMode();

                EzSelectJobCodeDialog.ezInstance.ezShowDialogElementId = ezApi.ezStringHasLength(ezSelectJobCodeShowDialogOptions.ezShowDialogElementId)
                    ? ezSelectJobCodeShowDialogOptions.ezShowDialogElementId
                    : null;

                return finished(ezSelectJobCodeShowDialogOptions);
            });
    }


    /**
        @protected @method
        Returns the default dialog title for the current mode
        @returns {string}
     */
    ezGetDefaultDialogTitleForDialogMode() {
        switch (EzSelectJobCodeDialog.ezInstance.ezDialogMode) {
            case EzSelectJobCodeDialogMode.CUSTOM:
                return EzSelectJobCodeDialog.ezInstance.ezDialogTitle;
            case EzSelectJobCodeDialogMode.ALL_EMPLOYER_JOBS:
                return EzSelectJobCodeDialog.DEFAULT_ALL_EMPLOYER_JOBS_DIALOG_MODE_TITLE;
            case EzSelectJobCodeDialogMode.EMPLOYEE_ASSIGNED_JOBS:
            default:
                return EzSelectJobCodeDialog.DEFAULT_EMPLOYEE_ASSIGNED_JOBS_DIALOG_MODE_TITLE;
        }
    }

    /**
        @protected @method
        Returns the default dialog help HTML for the current mode
        @returns {string}
     */
    ezGetDefaultHelpForDialogMode() {
        switch (EzSelectJobCodeDialog.ezInstance.ezDialogMode) {
            case EzSelectJobCodeDialogMode.CUSTOM:
                return EzSelectJobCodeDialog.ezInstance.ezDialogHelpHtml;
            case EzSelectJobCodeDialogMode.ALL_EMPLOYER_JOBS:
                return EzSelectJobCodeDialog.DEFAULT_ALL_EMPLOYER_JOBS_DIALOG_MODE_HELP;
            case EzSelectJobCodeDialogMode.EMPLOYEE_ASSIGNED_JOBS:
            default:
                return EzSelectJobCodeDialog.DEFAULT_EMPLOYEE_ASSIGNED_JOBS_DIALOG_MODE_HELP;
        }
    }

    /**
        @protected @method
        Returns the default dialog select input label for the current mode
        @returns {string}
     */
    ezGetDefaultSelectInputLabelForDialogMode() {
        switch (EzSelectJobCodeDialog.ezInstance.ezDialogMode) {
            case EzSelectJobCodeDialogMode.CUSTOM:
                return EzSelectJobCodeDialog.ezInstance.ezDialogSelectInputLabel;
            case EzSelectJobCodeDialogMode.ALL_EMPLOYER_JOBS:
                return EzSelectJobCodeDialog.DEFAULT_ALL_EMPLOYER_JOBS_DIALOG_MODE_SELECT_INPUT_LABEL;
            case EzSelectJobCodeDialogMode.EMPLOYEE_ASSIGNED_JOBS:
            default:
                return EzSelectJobCodeDialog.DEFAULT_EMPLOYEE_ASSIGNED_JOBS_DIALOG_SELECT_INPUT_LABEL;
        }
    }

    /**
        @protected @method
        Handles the job select input's change event.
     */
    ezHandleJobSelectInputChangeEvent() {
        EzSelectJobCodeDialog.ezInstance.ezSelectedJobIndex = parseInt(
            ezApi.ezclocker.ezUi.ezGetInputValue(EzSelectJobCodeDialog.ezInstance.ezIds.inputs.jobSelectInputId));
    }

    /**
        @protected @method
        Triggers the OnNoJobSelected event
     */
    ezTriggerOnNoJobSelectedEvent() {
        ezApi.ezclocker.ezEventEngine.ezTriggerEvent(
            EzSelectJobCodeDialog.ezEventNames.onNoJobSelected,
            ezApi.ezclocker.ezEventEngine.ezBuildEventData(
                EzSelectJobCodeDialog.ezApiName,
                'No job selected',
                {
                    ezSelectJobCodeDialog: EzSelectJobCodeDialog.ezInstance
                }));
    }

    /**
        @protected @method
        Triggers the OnJobSelected event
     */
    ezTriggerOnJobSelectedEvent() {
        if (!ezApi.ezIsNumber(EzSelectJobCodeDialog.ezInstance.ezSelectedJobIndex) || -1 == EzSelectJobCodeDialog.ezInstance.ezSelectedJobIndex) {
            EzSelectJobCodeDialog.ezInstance.ezTriggerOnNoJobSelectedEvent();
        } else if (EzSelectJobCodeDialog.ezInstance.ezSelectedJobIndex >= EzSelectJobCodeDialog.ezInstance.ezAvailableJobs.length) {
            ezApi.ezclocker.ezLogger.error(
                ezApi.ezEM`
                    The EzSelectJobCodeDialog's ezSelectedJobIndex of ${EzSelectJobCodeDialog.ezInstance.ezSelectedJobIndex} is out of
                    range for the EzSelectJobCodeDialog's ezAvailableJobs array. Defaulting to no job selected result.
                    Available jobs size: ${ezApi.ezToJson(EzSelectJobCodeDialog.ezInstance.ezAvailableJobs).length}
                    Available jobs: ${ezApi.ezToJson(EzSelectJobCodeDialog.ezInstance.ezAvailableJobs)}`);

            EzSelectJobCodeDialog.ezInstance.ezTriggerOnNoJobSelectedEvent();
        } else {
            let selectedJob = EzSelectJobCodeDialog.ezInstance.ezAvailableJobs[EzSelectJobCodeDialog.ezInstance.ezSelectedJobIndex];

            if (!EzObject.isValid(selectedJob)) {
                ezApi.ezclocker.ezLogger.error(
                    ezApi.ezEM`
                        Unable to match the EzSelectJobCoDialog's ezSelectedJobIndex of ${EzSelectJobCodeDialog.ezInstance.ezSelectedJobIndex} to
                        a valid job within the EzSelectJobCoDialog's ezAvailableJobs.
                        Known available jobs: ${ezApi.ezToJson(EzSelectJobCodeDialog.ezInstance.ezAvailableJobs)}`);

                EzSelectJobCodeDialog.ezInstance.ezTriggerOnNoJobSelectedEvent();
            } else {
                ezApi.ezclocker.ezEventEngine.ezTriggerEvent(
                    EzSelectJobCodeDialog.ezEventNames.onJobSelected,
                    ezApi.ezclocker.ezEventEngine.ezBuildEventData(
                        EzSelectJobCodeDialog.ezApiName,
                        'Job selected',
                        {
                            ezSelectJobCodeDialog: EzSelectJobCodeDialog.ezInstance,
                            selectedJob: selectedJob
                        }));
            }
        }
    }

    /**
        @protected @method
        Builds the dialogs static html.
        @returns {string}
     */
    ezBuildSelectJobCodeDialogHTML() {
        return ezApi.ezTemplate`
            <div
                id="${EzSelectJobCodeDialog.ezInstance.ezIds.dialogId}"
                title="${EzSelectJobCodeDialog.ezInstance.ezDialogTitle}"
                class="ezClockerDialog">
                <div
                    id="${EzSelectJobCodeDialog.ezInstance.ezIds.dialogId}_InputContainer"
                    class="ezMargin_8x8x8x8 ezInputContainer">
                    <label
                        id="${EzSelectJobCodeDialog.ezInstance.ezIds.labels.selectJobCodeInputLabelId}"
                        for="${EzSelectJobCodeDialog.ezInstance.ezIds.inputs.jobSelectInputId}"
                        class="ezMajorInputLabel">
                        ${EzSelectJobCodeDialog.ezInstance.ezDialogSelectInputLabel}
                    </label>
                    <select
                        id="${EzSelectJobCodeDialog.ezInstance.ezIds.inputs.jobSelectInputId}"
                        class="ezInputs-large-full-width">
                    </select>
                </div>
                <div
                    id="${EzSelectJobCodeDialog.ezInstance.ezIds.inputs.helpContainerId}">
                    ${EzSelectJobCodeDialog.ezInstance.ezDialogHelpHtml}
                </div>
            </div>`;
    }

    /**
        @protected @method
        Builds the job select input's options
     */
    ezLoadAvailableJobSelectOptions() {
        // Unhook the on change event
        ezApi.ezclocker.ezEventEngine.ezUnwantElementEvent(
            EzSelectJobCodeDialog.ezInstance.ezIds.inputs.jobSelectInputId,
            EzElementEventName.CHANGE,
            EzSelectJobCodeDialog.ezApiName);

        ezApi.ezclocker.ezUi.ezContent(
            EzSelectJobCodeDialog.ezInstance.ezIds.inputs.jobSelectInputId,
            ezApi.ezTemplate`
                <option
                    value="-1"
                    data-ez-data-tag-id="-1"
                    selected>
                    None (no job assignment)
                </option>`);

        for (let index = 0; index < EzSelectJobCodeDialog.ezInstance.ezAvailableJobs.length; index++) {
            let jobDataTag = EzSelectJobCodeDialog.ezInstance.ezAvailableJobs[index];

            ezApi.ezclocker.ezUi.ezAppendContent(
                EzSelectJobCodeDialog.ezInstance.ezIds.inputs.jobSelectInputId,
                ezApi.ezTemplate`
                    <option
                        value="${index}"
                        data-ez-data-tag-id="${jobDataTag.id}">
                        ${jobDataTag.tagName}
                    </option>`);
        }

        // Hook the on change event
        ezApi.ezclocker.ezEventEngine.ezWantElementEvent(
            EzSelectJobCodeDialog.ezInstance.ezIds.inputs.jobSelectInputId,
            EzElementEventName.CHANGE,
            EzSelectJobCodeDialog.ezApiName,
            EzSelectJobCodeDialog.ezInstance.ezHandleJobSelectInputChangeEvent);
    }
}
