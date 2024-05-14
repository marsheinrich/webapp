import {
    EzBadParamException
} from '/ezlibrary/exceptions/EzExceptions.js';

import { EzEventEngine } from '/ezlibrary/ez-event-engine.js';

import {
    EzJobCodeFilterType,
    EzElementEventName
} from '/ezlibrary/enums/EzEnumerations.js';

import {
    EzObject,
    EzBoolean,
    EzNumber,
    EzString,
    EzArray,
    EzHtml
} from '/ezlibrary/helpers/EzHelpers.js';

import { EzNavigation } from '/public/javascript/common/ezclocker-navigation-helper.js';

import { EzUI } from '/public/javascript/common/ezui.js';

/**
 * @class
 * @description
 * View class for ezClocker's Manage Job Codes dialog.
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 * >> AVOID CREATING NEW INSTANCES IN EZCLOCKER CODE BASE <<
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 * Use only the singleton instance created during the static initialization
 * flow. No need to create a new instance of the class.
 * You may safely access EzJobCodeDialog's singleton instance when:
 *     1) The EzManageJobCodesDialogView.ezEventNames.onReady event is triggered
 *     2) The following statement evaluates to true:
 *         globalThis['ezApi'] && globalThis.ezApi.ready &&
 *         globalThis.ezApi.ezclocker[EzManageJobCodesDialogView.ezApiName] &&
 *         globalThis.ezApi.ezclocker[EzManageJobCodesDialogView.ezApiName].ready
 * You may access the singleton reference via:
 *     1) EzApi as globalThis.ezApi.ezclocker.ezManageJobCodesDialogView
 *     2) EzManageJobCodesDialogView's static ezInstance property (EzManageJobCodesDialogView.ezInstance)
 * ---------------------------------------------------------------------------
 * Import with:
 *     import { EzManageJobCodesDialogView } from '/secure/widgets/EzJobCodeDialog/EzManageJobCodesDialogView.js';
 * ---------------------------------------------------------------------------
 * Ready evaluation:
 *     globalThis.ezApi.ezclocker[EzManageJobCodesDialogView.ezApiName] &&
 *     globalThis.ezApi.ezclocker[EzManageJobCodesDialogView.ezApiName].ready
 * ---------------------------------------------------------------------------
 * Ready event hook:
 *     document.addEventListener(
 *         EzManageJobCodesDialogView.ezEventNames.onReady,
 *         this.#ezRegistrator);
 * ---------------------------------------------------------------------------
 */
export class EzManageJobCodesDialogView {
    /**
     * @static
     * @public @readonly @property
     * Returns the name of this class's singleton instance when registered with ezApi.
     * @returns {string}
     */
    static get ezApiName() {
        return 'ezManageJobCodesDialogView';
    }

    /**
     * @static
     * @public @readonly @property
     * Returns an object of event names that this class may trigger.
     * @returns {object}
     */
    static get ezEventNames() {
        return {
            onReady: 'ezOn_EzManageJobCodesDialogView_Ready',
        };
    }

    /**
     * @static
     * @private @field
     * Stores the ready state for this class.
     * Default value is NULL
     * @type {String}
     * Values: null, 'PENDING', 'READY'
     */
    static #ezReadyState = null;

    /**
     * @static
     * @private @readonly @property
     * Gets if ready state for this class.
     * @returns {boolean}
     */
    static get ezIsReady() {
        return 'READY' === EzManageJobCodesDialogView.#ezReadyState;
    }

    /**
     * @static
     * @private @readonly @property
     * Returns true when all required dependencies for this class report ready.
     * In otherwords, the require dependency's singleton instance is created
     * and is registered with and accessable from EzApi with ezApi.ezclocker.{dependency_name}.
     * @returns {boolean}
     */
    static get #ezCanCheckReady() {
        return Object.prototype.hasOwnProperty.call(globalThis, 'ezApi') &&
            globalThis.ezApi && globalThis.ezApi.ready &&

            globalThis.ezApi.ezclocker[EzEventEngine.ezApiName] &&
            globalThis.ezApi.ezclocker[EzEventEngine.ezApiName].ready &&

            globalThis.ezApi.ezclocker[EzNavigation.ezApiName] &&
            globalThis.ezApi.ezclocker[EzNavigation.ezApiName].ready &&

            globalThis.ezApi.ezclocker[EzUI.ezApiName] &&
            globalThis.ezApi.ezclocker[EzUI.ezApiName].ready;
    }

    /**
     * @static
     * @private @method
     * Attempts to register the singleton instance for this class with ezApi. Returns true
     * if successful, false otherwise.
     * @returns {Boolean}
     */
    static #ezCheckReady() {
        if (!EzManageJobCodesDialogView.ezIsReady && EzManageJobCodesDialogView.#ezCanCheckReady) {

            EzManageJobCodesDialogView.#ezReadyState = 'READY';

            document.dispatchEvent(
                new CustomEvent(
                    EzManageJobCodesDialogView.ezEventNames.onReady,
                    {
                        bubbles: true,
                        apiClass: EzManageJobCodesDialogView
                    }));
        }

        return EzManageJobCodesDialogView.ezIsReady;
    }

    /**
     * @static
     * Static Initialization
     * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
     * >> IMPORTANT <<
     * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
     * Make sure the following properties and methods get defined BEFORE this static initialization section:
     *     1) Property getter EzManageJobCodesDialogView.ezEventNames
     *     2) Property getter EzManageJobCodesDialogView.ezApiName
     *     3) Field EzManageJobCodesDialogView.#ezReadyState
     *     4) Property getter EzManageJobCodesDialogView.ezIsReady
     *     5) Property getter EzManageJobCodesDialogView.#ezCanCheckReady
     *     6) Method EzManageJobCodesDialogView.#ezCheckReady()
     */
    static {
        if (!EzManageJobCodesDialogView.ezIsReady) {
            EzManageJobCodesDialogView.ezReadyState = 'PENDING';

            if (!EzManageJobCodesDialogView.#ezCheckReady()) {
                document.addEventListener(
                    'onEzApiReady',
                    () => {
                        if (!EzManageJobCodesDialogView.#ezCheckReady()) {
                            document.addEventListener(
                                EzEventEngine.ezEventNames.onReady,
                                EzManageJobCodesDialogView.#ezCheckReady);

                            document.addEventListener(
                                EzNavigation.ezEventNames.onReady,
                                EzManageJobCodesDialogView.#ezCheckReady);

                            document.addEventListener(
                                EzUI.ezEventNames.onReady,
                                EzManageJobCodesDialogView.#ezCheckReady);
                        }
                    });
            }
        }
    }

    /**
     * @public @constructor
     * Creates a new instance of EzManageJobCodesDialogView.
     * @param {string} parentContainerId
     */
    constructor(dialogId, parentContainerId) {
        if (EzBoolean.isFalse(EzManageJobCodesDialogView.ezIsReady)) {
            throw new EzException(
                'EzManageJobCodesDialogView is not yet ready for consumption');
        }

        if (!EzString.stringHasLength(parentContainerId)) {
            throw new EzBadParamException(
                'dialogId',
                this,
                this.constructor);
        }
        if (!EzString.stringHasLength(parentContainerId)) {
            throw new EzBadParamException(
                'parentContainerId',
                this,
                this.constructor);
        }

        this.#ezDialogId = dialogId;
        this.#ezParentContainerId = parentContainerId;
    }

    /**
     * @private @field
     * Stores the HTML element id of the dialog
     * @type {string}
     */
    #ezDialogId = 'EzJobCodeDialog';

    /**
     * @public @readonly @property
     * Gets this dialog's HTML element id.
     * @returns {String}
     */
    get ezDialogId() {
        return this.#ezDialogId;
    }

    /**
     * @private @field
     * Stores the parent container id that the UX will inject into.
     * @type {string}
     */
    #ezParentContainerId = null;

    /**
     * @public @readonly @property
     * Gets the parent container id that the UX will inject into.
     * @returns {string}
     */
    get ezParentContainerId() {
        return this.#ezParentContainerId;
    }

    /**
     * @public @field
     * Returns an object with categories that contain key=value pairs.
     * Each key represents the 'human readable name' for a HTML element.
     * The value for a key is the id for the HTML element.
     *  Object Template (note that some root categories might not exist in all cases)
     * {
     *     dialogId:'string',
     *     containers: {
     *         'name': 'string'
     *     },
     *     inputs: {
     *         'name': 'string'
     *     },
     *     buttons: {
     *         'name': 'string'
     *     },
     *     media: {
     *         'name': 'string'
     *     }
     * }
     * @returns {Object}
     */
    ezIds = {
        dialogId: this.ezDialogId,
        containers: {
            dialogContentContainerId: `${this.ezDialogId}_ContentContainer`,
            leftContentContainerId: `${this.ezDialogId}_LeftContentContainer`,
            rightContentContainerId: `${this.ezDialogId}_RightContentContainer`,
            editingContainerId: `${this.ezDialogId}_EditingContainer`,
            availableJobCodesContainerId: `${this.ezDialogId}_AvailableJobCodesContainer`,
            assignedEmployeesContainerId: `${this.ezDialogId}_JobCodeEditor_AssignEmployeesEditor_AssignedEmployeesContainer`,
            visualHelpContainerId: `${this.ezDialogId}_VisualHelpContainer`,
            employeeAssignmentEditorId: `${this.ezDialogId}_AssignEmployeesEditor`,
            visualHelpAddJobContainerId: `${this.ezDialogId}_VisualHelp_AddJobContainer`,
            visualHelpAssignEmployeeContainerId: `${this.ezDialogId}_VisualHelp_AssignEmployeeContainer`,
            validationErrorContainerId: `${this.ezDialogId}_ValidationErrorContainer`,
            saveStatusContainerId: `${this.ezDialogId}_SaveStatusContainer`,
            saveStatusTextContainerId: `${this.ezDialogId}_SaveStatusTextContainer`,
            activeJobCodeModifiedIndicatorId: `${this.ezDialogId}_ActiveJobCodeModifiedIndicator`
        },
        inputs: {
            hourlyRateInputPrefixId: `${this.ezDialogId}_JobCodeHourlyRateInput`,
            hourlyRateInputId: `${this.ezDialogId}_JobCodeHourlyRateInputA`,
            jobCodeFilterSelectId: `${this.ezDialogId}_JobCodeFilterSelect`,
            jobCodeCodeInputId: `${this.ezDialogId}_JobCodeCodeInput`,
            jobCodeNameInputId: `${this.ezDialogId}_JobCodeNameInput`,
            assignToAllEmployeesCheckboxId: `${this.ezDialogId}_AssignToAllEmployees`
        },
        buttons: {
            addJobCodeButtonId: `${this.ezDialogId}_AddJobCodeButton`,
            editorArchiveJobCodeButtonId: `${this.ezDialogId}_EditorArchiveJobCodeButton`,
            editorUnarchiveJobCodeButtonId: `${this.ezDialogId}_EditorUnarchiveJobCodeButton`,
            assignedEmployeesActionBarAssignEmployeeButtonId: `${this.ezDialogId}_AssignedEmployees_ActionBar_AssignEmployeeButton`,
            deleteJobCodeButtonId: `${this.ezDialogId}_DeleteJobCodeButton`,
            archiveJobCodeButtonId: `${this.ezDialogId}_ArchiveJobCodeButton`,
            unarchiveJobCodeButtonId: `${this.ezDialogId}_UnarchiveJobCodeButton`
        }
    };

    /**
     * @public @method
     * Injects the views HTML into the parent container id.
     * -------------------------------------------------------------
     * >>> IMPORTANT <<<
     * Call this method in the following way to make sure the proper this context is maintained:
     *     aEzManageJobCodesDialogView.ezInjectView
     *         .apply(aEzManageJobCodesDialogView);
     * -------------------------------------------------------------
     */
    ezInjectView() {
        ezApi.ezclocker.ezUi.ezSetContent(
            this.#ezParentContainerId,
            this.ezBuildDialogHtml());

        ezApi.ezclocker.ezEventEngine.ezWantElementEvent(
            this.ezDialogId,
            EzElementEventName.RESIZE,
            EzManageJobCodesDialogView.ezApiName,
            this.ezFitAvailableJobCodesListToView);

        this.ezFitAvailableJobCodesListToView();
    }

    /**
     * @public @method
     * Adjust the sive of the available job codes list to fit within the dialog's view;
     * -------------------------------------------------------------
     * >>> IMPORTANT <<<
     * Call this method in the following way to make sure the proper this context is maintained:
     *     aEzManageJobCodesDialogView.ezFitAvailableJobCodesListToView
     *         .apply(aEzManageJobCodesDialogView);
     * -------------------------------------------------------------
     */
    ezFitAvailableJobCodesListToView() {
        let self = this;

        return ezApi.ezAsyncAction(
            (finished) => {
                ezApi.ezclocker.ezUi.ezSetElementCss(
                    self.ezIds.containers.availableJobCodesContainerId,
                    'height',
                    `${ezApi.ezclocker.ezUi.ezGetElementHeight(self.ezDialogId) - 85}px`);
                return finished();
            });
    }

    /**
     * @public @method
     * Builds the all the job code bars Html
     * >> IMPORTANT <<
     * Call this method in the following way so that the property this context is maintained:
     *     aManageJobCodesDialogView.ezBuildJobCodeBarsHtml.apply(
     *         aManageJobCodesDialogView,
     *         [
     *             ezAvailableJobCodes, // param 1
     *             ezJobCodeFilterSelectValue // param 2
     *         ]);
     * @param {undefined|null|array} availableJobCodes
     * @param {string} ezJobCodeFilterType
     * A valid enum property value from EzJobCodeFilterType
     * @returns {String}
     * HTML for all the job code bars.
     */
    ezBuildJobCodeBarsHtml(availableJobCodes, ezJobCodeFilterType) {
        let hasVisibleJobs = false;

        let jobCodeBars = EzString.EMPTY;

        if (EzArray.arrayHasLength(availableJobCodes)) {
            for (let index = 0; index < availableJobCodes.length; index++) {
                let dataTag = availableJobCodes[index];

                if (EzObject.isValid(dataTag)) {
                    dataTag.ezIndex = index;

                    if (!this.ezIsDataTagFilterHidden(dataTag, ezJobCodeFilterType)) {
                        dataTag.ezIndex = index;
                        hasVisibleJobs = true;
                        jobCodeBars = `${jobCodeBars}${this.ezBuildJobCodeBarHtml(index, dataTag)}`;
                    }
                }
            }
        }

        ezApi.ezclocker.ezUi.ezContent(
            this.ezIds.containers.availableJobCodesContainerId,
            jobCodeBars);

        return hasVisibleJobs;
    }

    /**
     * @protected @method
     * Builds the dialog's main HTML
     * @returns {String}
     */
    ezBuildDialogHtml() {
        return EzHtml.template`
            <!-- Manage Job Codes Dialog -->
            <div
                id="${this.ezDialogId}"
                data-ezgrid-layout="Columns=(100%), Rows=(auto, auto, auto), Template: GRID(ColA[Row1, Row2, Row3])"
                class="ezAutoCol_100 ezAutoRow_AxAxA ezGrid-align-fullsize"
                title="Manage Jobs">

                ${this.ezBuildValidationErrorHtml()}

                <!-- Left and Right Columns Grid -->
                <div
                    id="${this.ezIds.containers.dialogContentContainerId}"
                    data-ezgrid-layout="Columns=(auto, 50%), Rows=(100%), Template: GRID(ColA[Row1], ColB[Row2])"
                    class="ezAutoCol_Ax50 ezAutoRow_100 ezGridGap_8 ezGrid-align-fullsize">
                    <div
                        id="${this.ezDialogId}_AvailableJobsCol"
                        data-ezgrid-layout="Columns=(100%), Rows=(100%), Template: GRID(ColA[Row1])"
                        class="ezAutoCol_100 ezAutoRow_100 ezGrid-align-fullsize">
                        ${this.ezBuildLeftColumnHTML()}
                    </div>
                    <div
                        id="${this.ezIds.containers.rightContentContainerId}"
                        data-ezgrid-layout="Columns=(100%), Rows=(100%), Template: GRID(ColA[Row1])"
                        class="ezAutoCol_100 ezAutoRow_100 ezGrid-align-fullsize">
                        ${this.ezBuildVisualHelpHTML()}
                        ${this.ezBuildRightColumnHTML()}
                    </div>
                </div>
            </div>`;
    }

    /**
     * @protected @method
     * Builds the validation error box HTML
     * @returns {string}
     */
    ezBuildValidationErrorHtml() {
        return EzHtml.template`
            <div
                id="${this.ezIds.containers.validationErrorContainerId}"
                class="ezErrorBox"
                style="display:none">
            </div>`;
    }

    /**
     * @protected @method
     * Builds the left column HTML
     * @returns {string}
     */
    ezBuildLeftColumnHTML() {
        return EzHtml.template`
            <div
                id="${this.ezDialogId}_AvailableJobsContainer"
                data-ezgrid-layout="Columns=(100%), Rows=(minimum, auto), Template: GRID(ColA[Row1, Row2])"
                class="ezAutoCol_100 ezAutoRow_Min_Max ezGrid-align-full ezGrid-vertical-align-top">
                ${this.ezBuildLeftColumnTitleBarHTML()}
                ${this.ezBuildLeftColumnAvailableJobsHTML()}
            </div>`;
    }

    /**
     * @protected @method
     * Builds the right column HTML
     * @returns {string}
     */
    ezBuildRightColumnHTML() {
        return EzHtml.template`
            <div
                data-ezgrid-layout="Columns=(100%), Rows=(minimum, auto), Template: GRID(ColA[Row1, Row2])"
                id="${this.ezIds.containers.editingContainerId}"
                class="ezAutoRow_Min_Max_A ezGridGap_8 ezGrid-align-full ezGrid-vertical-align-top">
                ${this.ezBuildRightColumnActionButtonsHTML()}
                ${this.ezBuildRightColumnJobEditorsHTML()}
                ${this.ezBuildAssignEmployeeEditorHTML()}
            </div>`;
    }

    /**
     * @protected @method
     * Builds the visual help container HTML
     * @returns {string}
     */
    ezBuildVisualHelpHTML() {
        return EzHtml.template`
            <div
                id="${this.ezIds.containers.visualHelpContainerId}"
                class="ezJobDialogVisualHelpContainer"
                style="display:none">
                <div
                    id="${this.ezIds.containers.visualHelpAddJobContainerId}"
                    class="ezAutoCol_A">
                    <img
                        src="/public/images/add-a-job-help-action.svg"
                        class="ezJobDialogTopVisualHelpImage"/>
                </div>
                <div
                    id="${this.ezIds.containers.visualHelpAssignEmployeeContainerId}"
                    class="ezAutoCol_A">
                    <img
                        src="/public/images/assign-job-employee-help-action.svg"
                        class="ezJobDialogBottomVisualHelpImage"/>
                </div>
                <img
                    src="${ezApi.ezclocker.ezNavigation.ezGetPublicPageUrl('images/assign-job-employee.png')}"
                    class="ezJobDialogBottomVisualHelpImage"/>
            </div>`;
    }

    /**
     * @protected @method
     * Builds the left columns title bar html
     * @returns {string}
     */
    ezBuildLeftColumnTitleBarHTML() {
        return EzHtml.template`
            <div
                id="${this.ezDialogId}_JobCodeTitleContainer"
                data-ezgrid-layout="Colummns=(auto, minimum), Rows=(100%), Template: GRID(ColA[Row1], ColB[Row1])"
                class="ezJobCodeTitleContainer ezAutoCol_AxMin ezAutoRow_100 ezGrid-col-gap_8 ezBorders-top-radius ezShadows-wide-bottom-shadow"
                style="z-index:9999">
                <div
                    id="${this.ezDialogId}_JobCodeBarsTitleFilterContainer"
                    data-ezgrid-layout="Columns=(100%), Rows=(100%), Template: GRID(ColA[Row1])"
                    class="ezJobCodeContainerTitle ezAutoCol_100 ezAutoRow_100 ezGrid-vertical-align-middle ezGrid-align-full">
                        <select
                            id="${this.ezIds.inputs.jobCodeFilterSelectId}"
                            class="ezInputs-large-full-width">
                            <option
                                class="ezOptionHeader"
                                value="${EzJobCodeFilterType.ACTIVE}"
                                selected>
                                Active Job Codes
                            </option>
                            <option
                                class="ezOptionHeader"
                                value="${EzJobCodeFilterType.ARCHIVED}">
                                Archived Job Codes
                            </option>
                            <option
                                class="ezOptionHeader"
                                value="${EzJobCodeFilterType.ALL}">
                                All Job Codes
                            </option>
                        </select>
                </div>
                <div
                    id="${this.ezDialogId}_JobCodeBarsTitle_ActionButtons"
                    data-ezgrid-layout="Columns=(auto), Rows=(auto), Template: GRID(ColA[Row1])"
                    class="ezAutoCol_A ezAutoRow_A ezGrid-vertical-align-middle ezGrid-align-right ezPadding-right-8">
                    ${EzHtml.button(
                        // id
                        this.ezIds.buttons.addJobCodeButtonId,
                        // classes
                        'ezSilverActionButton',
                        // title
                        'Unarchive Job',
                        // onclick
                        'ezApi.ezclocker.ezJobCodeDialog.ezHandleAddNewJobCodeButtonClick()',
                        // additional attributes
                        null,
                        // content
                        'Add')}
                </div>
            </div>`;
    }

    /**
     * @protected @method
     * Builds the left columns available job code list HTML
     * @returns {string}
     */
    ezBuildLeftColumnAvailableJobsHTML() {
        return EzHtml.template`
            <div
                id="${this.ezIds.containers.availableJobCodesContainerId}"
                data-ezgrid-layout="Columns=(100%), Rows=(auto), Template: GRID(ColA[Row1])"
                class="ezAvailableJobCodesContainer ezAutoCol_100 ezAutoRow_auto ezGrid-vertical-align-top ezGrid-align-full ezPadding-top-8 ezBorders-bottom-radius ezShadows-inset-right-left-bottom-shadow">
                <!-- Job Bars Inject Here -->
            </div>`;
    }

    /**
     * @protected @method
     * Builds the right column's action buttons html
     * @returns {string}
     */
    ezBuildRightColumnActionButtonsHTML() {
        return EzHtml.template`
            <div
                id="${this.ezDialogId}_ArchiveCheckBoxContainer"
                class="ezInputLabelGroupContainer ezAlignRight">
                <button
                    id="${this.ezIds.buttons.editorArchiveJobCodeButtonId}"
                    class="ezLargeToolButton"
                    title="Archive Job"
                    style="display:none">
                    <img
                        id="${this.ezIds.buttons.editorArchiveJobCodeButtonId}_Img"
                        alt="Archive"
                        title="Archive Job"
                        class="ezLargeEditButtonImage"
                        src="/public/images/icons/archive-white.svg">
                    Archive
                </button>
                <button
                    id="${this.ezIds.buttons.editorUnarchiveJobCodeButtonId}"
                    class="ezLargeToolButton"
                    title="Unarchive Job"
                    style="display:none">
                    <img
                        id="${this.ezIds.buttons.editorUnarchiveJobCodeButtonId}_Img"
                        alt="Unarchive"
                        title="Unarchive Job"
                        class="ezLargeEditButtonImage"
                        src="/public/images/icons/unarchive-white.svg">
                    Unarchive
                </button>
            </div>`;
    }

    /**
     * @protected @method
     * Builds the right column's Job Editors html
     * @returns {string}
     */
    ezBuildRightColumnJobEditorsHTML() {
        return EzHtml.template`
            <div
                id="${this.ezDialogId}_JobCodeEditorContainer"
                class="ezJobCodeBorderlessContainer">
                <div
                    id="${this.ezDialogId}_NameInputGroup"
                    class="ezInputLabelGroupContainer">
                    <label
                        id="${this.ezIds.inputs.jobCodeNameInputId}_Label"
                        for="${this.ezIds.inputs.jobCodeNameInputId}"
                        class="ezJobCodeInputNameLabel">
                        Name
                    </label>
                    <input
                        id="${this.ezIds.inputs.jobCodeNameInputId}"
                        class="exText ezFullWidthEditor"
                        type="text"
                        placeholder="[Enter new job name]"
                        onblur="ezApi.ezclocker.ezJobCodeDialog.ezHandleJobCodeNameInputOnBlur()"/>
                </div>
                <div
                    id="${this.ezDialogId}_NameInputGroup"
                    class="ezInputLabelGroupContainer">
                    <label
                        id="${this.ezIds.inputs.jobCodeCodeInputId}_JobCodeCodeInputLabel"
                        for="${this.ezIds.inputs.jobCodeCodeInputId}"
                        class="ezJobCodeInputCodeLabel">
                        Code
                    </label>
                    <input
                        id="${this.ezIds.inputs.jobCodeCodeInputId}"
                        class="exText ezFullWidthEditor"
                        type="text"
                        placeholder="[Optional job code or id]"/>
                </div>
                <div
                    id="${this.ezDialogId}_NameInputGroup"
                    class="ezInputLabelGroupContainer">
                    <div
                        id="${this.ezIds.inputs.hourlyRateInputPrefixId}A_Container">
                        <label
                            for="${this.ezIds.inputs.hourlyRateInputPrefixId}A"
                            class="ezJobCodeInputCodeLabel">
                            Hourly Rate
                        </label>
                        <div
                            style="display: flex;">
                            <span style="margin-right:4px;margin-top: 5px">$</span>
                            <input
                                id="${this.ezIds.inputs.hourlyRateInputPrefixId}A"
                                class="exText ezFullWidthEditor"
                                type="text"
                                placeholder="0.00 (optional)"
                                title="Optionally enter the hourly rate for the job to display on reports."/>
                       </div>
                    </div>
                    <div
                        id="${this.ezIds.inputs.hourlyRateInputPrefixId}B_Container">
                        <label
                            for="${this.ezIds.inputs.hourlyRateInputPrefixId}B"
                            class="ezJobCodeInputCodeLabel">
                            Hourly Rate
                        </label>
                        <div
                            style="display: flex;">
                            <span style="margin-right:4px;margin-top: 5px">$</span>
                            <input
                                id="${this.ezIds.inputs.hourlyRateInputPrefixId}B"
                                class="exText ezFullWidthEditor"
                                type="password"
                                placeholder="0.00 (optional)"
                                title="Your employer has disabled viewing and editing the job's hourly rate."
                                readonly
                                disabled/>
                       </div>
                   </div>
                </div>
                <div id="EzActiveJobCodeModifiedIndicator" class="ezText-small-navy ezAlignRight" style="display:none">modified</div>
            </div>`;
    }

    /**
     * @protected @method
     * Builds the assign employee editor HTML
     * @returns {string}
     */
    ezBuildAssignEmployeeEditorHTML() {
        return EzHtml.template`
            <div
                id="${this.ezIds.containers.employeeAssignmentContainerId}"
                class="ezJobCodeBorderlessContainer">
                <div
                    id="${this.ezDialogId}_JobCodeEditor_AssignmentsContainer_CheckBoxContainer"
                    class="ezInputLabelGroupContainer">
                    <input
                        id="${this.ezIds.inputs.assignToAllEmployeesCheckboxId}"
                        type="checkbox"/>
                    <label
                        id="${this.ezIds.inputs.assignToAllEmployeesCheckboxId}_Label"
                        for="${this.ezIds.inputs.assignToAllEmployeesCheckboxId}">
                        Assign job to all employees.
                    </label>
                </div>
                <div
                    id="${this.ezIds.containers.employeeAssignmentEditorId}">
                    <div
                        id="${this.ezDialogId}_JobCodeEditor_AssignEmployeesEditor_AssignedEmployees_ActionBar"
                        class="ezJobCodeActionBar">
                        <button
                            id="${this.ezIds.buttons.assignedEmployeesActionBarAssignEmployeeButtonId}"
                            class="ezEditButton"
                            onclick="ezApi.ezclocker.ezJobCodeDialog.ezShowAssignEmployeeDialog()">
                            Assign Employee...
                        </button>
                    </div>
                    <div
                        id="${this.ezIds.containers.assignedEmployeesContainerId}"
                        class="ezJobCodeBorderContainer ez-small-inset-shadow">
                    </div>
                </div>
            </div>`;
    }

    /**
     * @protected @method
     * Builds the save status html
     * @returns {string}
     */
    ezBuildSaveStatusHTML() {
        return EzHtml.template`
            <div
                data-ezgrid-layout="Columns=(minimum, auto), Rows=(100%), Template: GRID(ColAa[Row1], ColB[Row2])"
                id="${this.ezIds.containers.saveStatusContainerId}"
                class="ezSmallSpinnerContainer ez-dialog-shadow ezAutoCol_MinxA ezAutoRow_100"
                style="display:none;">
                <div
                    id="${this.ezDialogId}_SaveStatusSpinnerContainer"
                    class="ezSmallSpinnerContent ezGrid-align-middle-right">
                    <img
                        src="${ezApi.ezclocker.ezNavigation.ezGetPublicPageUrl('images/spinners/infinity-small.gif')}" />
                </div>
                <div
                    id="${this.ezIds.containers.saveStatusTextContainerId}"
                    class="ezSmallSpinnerContent ezGrid-align-middle-left">
                    saving ...
                </div>
            </div>`;
    }

    /**
     * @protected @method
     * Builds and appens an assigned employee box to the assigned employee's container
     * @param {object} dataTag
     * @param {object} dataTagMap
     * @param {number} dataTagMapIndex
     * @param {number} assignedEmployeeId
     * @returns {boolean}
     * Return strue if the assigned employee HTML was built. False if not build (in cases where the associated employee id doesn't exist anymore)
     */
    ezBuildAndAppendAssignedEmployeeHtml(dataTag, dataTagMap) {
        if (!EzObject.isValid(dataTag)) {
            throw new EzBadParamException(
                'dataTag',
                this,
                this.ezBuildAndAppendAssignedEmployeeHtml);
        }
        if (!EzObject.isValid(dataTagMap)) {
            throw new EzBadParamException(
                'dataTagMap',
                this,
                this.ezBuildAndAppendAssignedEmployeeHtml);
        }

        let assignedEmployee = ezApi.ezclocker.ezClockerContext.ezGetSelectedEmployerAccountEmployeeAccountForEmployeeId(dataTagMap.assignedEzEntityId);

        if (!EzObject.isValid(assignedEmployee)) {
            ezApi.ezclocker.ezLogger.error(
                EzString.em`
                    Expected a valid employee instance for the DataTagMap with dataTagMapId=${dataTagMap.id} from to
                    ezApi.ezclocker.ezClockerContext.ezGetSelectedEmployerAccountEmployeeAccountForEmployeeId(${dataTagMap.assignedEzEntityId})
                    Call to ezApi.ezclocker.ezClockerContext.ezGetSelectedEmployerAccountEmployeeAccountForEmployeeId(${dataTagMap.assignedEzEntityId})
                    returned an undefined or null response.`);

            // TODO: Shold we remove the assignment associated to non-existent employee id?
            //ezApi.ezclocker.ezInternalDataTagMapApiClient.ezDeleteDataTagMap(dataTagMap.id);

            return false;
        }

        let activeDataTagIsArchivedOrDisabled = EzBoolean.isTrue(dataTag.archived) || EzBoolean.isFalse(dataTag.enabled);

        let jobCodeTitleClass = EzBoolean.isTrue(activeDataTagIsArchivedOrDisabled)
            ? 'ezAutoCol_AxA ezGrid-vertical-align-middle ezGrid-align-right ezJobCodeTitleDisabledContainer'
            : 'ezAutoCol_AxA ezGrid-vertical-align-middle ezGrid-align-right ezJobCodeTitleContainer'

        ezApi.ezclocker.ezUi.ezAppendContent(
            this.ezIds.containers.assignedEmployeesContainerId,
            EzHtml.template`
                <div
                    id="${this.ezDialogId}_AssignedEmployeeCard_${dataTagMap.ezDataTagMapIndex}"
                    class="ezAssignedEmployeeDisabledContainer"
                    data-datatag-id="${dataTagMap.dataTagId}"
                    data-datatagmap-id="${dataTagMap.id}"
                    data-datatagmap-index="${dataTagMap.ezDataTagMapIndex}"
                    data-employee-id="${dataTagMap.assignedEzEntityId}"
                    data-primary-job="${dataTagMap.level}">
                    <div
                        id="${this.ezDialogId}_AssignedEmployeeCard_TitleBar_${dataTagMap.ezDataTagMapIndex}"
                        class="${jobCodeTitleClass}">
                        ${this.ezBuildPrimaryJobIndicatorHTML(dataTagMap)}
                        <div
                            id="${this.ezDialogId}_AssignedEmployeeCard_ButtonsBar_${dataTagMap.ezDataTagMapIndex}"
                            class="ezAutoCol_AxA ezGrid-vertical-align-middle ezGrid-align-right">
                            ${this.ezBuildAssignedEmployeeCardButtonsHTML(dataTagMap, activeDataTagIsArchivedOrDisabled)}
                        </div>
                    </div>
                    <div
                        id="${this.ezDialogId}_AssignedEmployeeCard_EmployeeName_${dataTagMap.ezDataTagMapIndex}"
                        data-employee-id="${dataTagMap.assignedEzEntityId}"
                        class="${activeDataTagIsArchivedOrDisabled ? 'ezAssignedEmployeeDisabledName' : 'ezAssignedEmployeeName'}">
                        <img
                            id="${this.ezDialogId}_AssignedEmployeeCard_EmployeeImage_${dataTagMap.ezDataTagMapIndex}"
                            src="${ezApi.ezclocker.ezNavigation.ezGetPublicPageUrl('images/icons/person-gray.svg')}"
                            class="ezAssignedEmployeImage"/>
                            ${assignedEmployee.employeeName}
                    </div>
                </div>`);

        return true;
    }

    /**
     * @protected @method
     * Builds the assigned employee card's buttons HTML.
     * @param {object} dataTagMap
     * @param {undefined|null|boolean} isArchived
     * @returns {string}
     */
    ezBuildAssignedEmployeeCardButtonsHTML(dataTagMap, isArchived) {
        if (!EzObject.isValid(dataTagMap)) {
            throw new EzBadParamException(
                'dataTagMap',
                this,
                this.ezBuildAssignedEmployeeCardButtonsHTML);
        }

        let disabledAttribute = EzString.EMPTY;
        let editButtonTitle = 'Edit the assigned employee';
        let deleteButtonTitle = 'Delete the employee assignment to the job.';
        let buttonImageClass = 'ezButtonImage_16x16';
        let deleteClick = `onclick="ezApi.ezclocker.ezJobCodeDialog.ezOnRemoveAssignedEmployee(${dataTagMap.ezDataTagMapIndex})"`;
        let editClick = `onclick="ezApi.ezclocker.ezJobCodeDialog.ezEditAssignedEmployeeDataTag(${dataTagMap.ezDataTagMapIndex})"`;

        if (EzBoolean.isTrue(isArchived)) {
            disabledAttribute = 'disabled';

            editButtonTitle = 'Unarchive the job to edit the employee assignment.';

            deleteButtonTitle = 'Unarchive the job to delete the employee assignment.';

            buttonImageClass = 'ezButtonImage-disable_16x16';

            deleteClick = EzString.EMPTY;
            editClick = EzString.EMPTY;
        }

        return EzHtml.template`
            <button
                id="EzJobCodeEditor_AssignedEmployee_EditButton_${dataTagMap.ezDataTagMapIndex}"
                data-datatagmap-id="${dataTagMap.id}"
                data-datatagmap-index="${dataTagMap.ezDataTagMapIndex}"
                data-employee-id="${dataTagMap.assignedEzEntityId}"
                class="ezSquareEditButton"
                title="${editButtonTitle}"
                ${disabledAttribute}
                ${editClick}>
                <img
                    id="EzJobCodeEditor_AssignedEmployee_EditButtonImage_${dataTagMap.ezDataTagMapIndex}"
                    class="${buttonImageClass}"
                    src="/public/images/icons/edit-black.svg"
                    title="${editButtonTitle}"
                    alt="Edit">
            </button>
            <button
                id="EzJobCodeEditor_AssignedEmployee_RemoveButton_${dataTagMap.ezDataTagMapIndex}"
                data-datatagmap-id="${dataTagMap.id}"
                data-datatagmap-index="${dataTagMap.ezDataTagMapIndex}"
                data-employee-id="${dataTagMap.assignedEzEntityId}"
                class="ezDeleteEditButton"
                title="${deleteButtonTitle}"
                ${disabledAttribute}
                ${deleteClick}>
                <img
                    id="EzJobCodeEditor_AssignedEmployee_RemoveButton_Image_${dataTagMap.ezDataTagMapIndex}"
                    class="${buttonImageClass}"
                    src="/public/images/icons/delete-white.svg"
                    title="${deleteButtonTitle}"
                    alt="Delete">
            </button>`;
    }

    /**
     * @protected @method
     * Builds the assigned employee card's PrimaryJob indicator HTML.
     * @param {object} dataTagMap
     * @param {undefined|null|boolean} isArchived
     * @returns {string}
     */
    ezBuildPrimaryJobIndicatorHTML(dataTagMap) {
        if (!EzObject.isValid(dataTagMap)) {
            throw new EzBadParamException(
                'dataTagMap',
                this.ezInstance,
                this.ezInstance.ezBuildPrimaryJobIndicatorHTML);
        }

        return 1 == EzNumber.numberOrDefault(dataTagMap.level, 0)
            ? EzHtml.template`
                <div
                    id="${this.ezDialogId}_AssignedEmployeeCard_PrimayJobIndicator_${dataTagMap.ezDataTagMapIndex}"
                    class="ezGrid-align-center ezGrid-vertical-align-middle ezJobCodeDialog-assigneed-employee-primary-container">
                    Primary Job
                </div>`
            : EzHtml.template`
                <div
                    id="${this.ezDialogId}_AssignedEmployeeCard_PrimayJobIndicator_${dataTagMap.ezDataTagMapIndex}"
                    class="ezGrid-align-center ezGrid-vertical-align-middle ezJobCodeDialog-assigneed-employee-non-primary-container">
                </div>`;
    }

    /**
     * @protected @method
     * Returns true the provided ezJobCodeFilterType matches the provided job code's state.
     * Returns false if the provided dataTag is null or undefined OR if the job's state doesn't fit the provided filter.
     * @param {undefined|null|object} dataTag
     * @param {string} ezJobCodeFilterType
     * A valid enum property value from EzJobCodeFilterType
     * @returns {boolean}
     */
    ezIsDataTagFilterHidden(dataTag, ezJobCodeFilterType) {
        if (!EzObject.isValid(dataTag)) {
            return false;
        }

        switch (ezJobCodeFilterType) {
            case EzJobCodeFilterType.ACTIVE:
                return EzBoolean.isTrue(dataTag.archived) || EzBoolean.isFalse(dataTag.enabled);
            case EzJobCodeFilterType.ARCHIVED:
                return !EzBoolean.isTrue(dataTag.archived);
            case EzJobCodeFilterType.DISABLED:
                return !EzBoolean.isFalse(dataTag.enabled);
            case EzJobCodeFilterType.UNKNOWN:
            case EzJobCodeFilterType.ALL:
            default:
                return false;
        }
    }

    /**
     * @protected @method
     * Builds a job code's Job Code Bar HTML
     * @param {number} jobCodeIndex
     * @param {EzDataTag} jobCode
     * @returns {String}
     * String of HTML
     */
    ezBuildJobCodeBarHtml(jobCodeIndex, jobCode) {
        if (!EzNumber.isNumber(jobCodeIndex) || !EzObject.isValid(jobCode)) {
            return EzString.EMPTY;
        }

        let tagNameToUse = EzString.stringHasLength(jobCode.tagName)
            ? jobCode.tagName
            : `New Job ${jobCodeIndex + 1}`;

        let jobDescriptionToUse = EzString.stringHasLength(jobCode.description)
            ? jobCode.description
            : EzString.EMPTY;

        let buttons = EzString.EMPTY;

        if (EzBoolean.isTrue(jobCode.archived)) {
            buttons += EzHtml.button(
                // id
                this.ezIds.buttons.unarchiveJobCodeButtonId,
                // classes
                'ezLargeToolButton',
                // title
                'Unarchive Job',
                // onclick
                `ezApi.ezclocker.ezJobCodeDialog.ezHandleUnarchiveJobButtonClickEvent(${jobCodeIndex})`,
                // additional attributes
                null,
                // content
                EzHtml.template`
                    <img
                        id="${this.ezIds.buttons.unarchiveJobCodeButtonId}_Img"
                        class="ezLargeEditButtonImage"
                        src="/public/images/icons/unarchive-white.svg"
                        alt="Unarchive"
                        title="Unarchive Job">`);
        } else {
            buttons += EzHtml.button(
                // id
                this.ezIds.buttons.archiveJobCodeButtonId,
                // classes
                'ezLargeToolButton',
                // title
                'Archive Job',
                // onclick
                `ezApi.ezclocker.ezJobCodeDialog.ezHandleArchiveJobButtonClickEvent(${jobCodeIndex})`,
                // additional attributes
                null,
                // content
                EzHtml.template`
                    <img
                        id="${this.ezIds.buttons.archiveJobCodeButtonId}_Img"
                        class="ezLargeEditButtonImage"
                        src="/public/images/icons/archive-white.svg"
                        alt="Archive"
                        title="Archive Job">`);
        }

        if (EzBoolean.isTrue(jobCode.archived) || EzBoolean.isFalse(jobCode.enabled)) {
            buttons += EzHtml.button(
                // id
                this.ezIds.buttons.deleteJobCodeButtonId,
                // classes
                'ezRedLargeToolButton',
                // title
                'Delete this job',
                // onclick
                `ezApi.ezclocker.ezJobCodeDialog.ezHandleDeleteJobButtonClickEvent(${jobCodeIndex})`,
                // additional attributes
                null,
                // content
                EzHtml.template`
                    <img
                        id="${this.ezIds.buttons.deleteJobCodeButtonId}_Img"
                        class="ezLargeEditButtonImage"
                        src="/public/images/icons/delete-gray.svg"
                        alt="Delete"
                        title="Must unarchive the job before deleting.">`,
                        ['disabled']);
        } else {
            buttons += EzHtml.button(
                // id
                this.ezIds.buttons.deleteJobCodeButtonId,
                // classes
                'ezRedLargeToolButton',
                // title
                'Delete this job',
                // onclick
                `ezApi.ezclocker.ezJobCodeDialog.ezHandleDeleteJobButtonClickEvent(${jobCodeIndex})`,
                // additional attributes
                null,
                // content
                EzHtml.template`
                    <img
                        id="${this.ezIds.buttons.deleteJobCodeButtonId}_Img"
                        class="ezLargeEditButtonImage"
                        src="/public/images/freepik/delete/del1-white.svg"
                        alt="Delete" title="Delete Job">`);
        }

        let onClickHandler = `onclick="ezApi.ezclocker.ezJobCodeDialog.ezHandleJobCodeBarClick(${jobCodeIndex})"`;

        return EzHtml.template`
            <div
                id="EzJobCodeDialog_JobCodeBar${jobCodeIndex}"
                class="ezJobCodeBar"
                ${onClickHandler}>
                <table
                    class="ezFullWidth"
                    ${onClickHandler}>
                    <tr ${onClickHandler}>
                        <td
                            class="ezJobCodeBarDisplayCell"
                            ${onClickHandler}>
                            <div
                                id="EzJobCodeDialog_JobCodeBar_JobCodeName${jobCodeIndex}"
                                class="ezJobCodeBarJobCodeName"
                                ${onClickHandler}>
                                ${tagNameToUse}
                            </div>
                            <div
                                id="EzJobCodeDialog_JobCodeBar_JobCodeCode${jobCodeIndex}"
                                class="ezJobCodeBarJobCodeCode"
                                placeholder="Optional Job Code or Id"
                                ${onClickHandler}>
                                ${jobDescriptionToUse}
                            </div>
                        </td>
                        <td
                            class="ezJobCodeBarActionCell"
                            ${onClickHandler}>
                            ${buttons}
                        </td>
                    </tr>
                </table>
            </div>`;
    }

    /**
     * @public @method
     * Shows or hides the modified indicator based upon the provided isModified boolean.
        Is isModified is undefined or null, then false is assumed.
        >>> IMPORTANT <<<
        Call this method in the following way to ensure the this context is correct:
                ezManageJobCodesDialogView.ezShowHideModifiedIndicator
                    .apply(ezManageJobCodesDialogView, [isModified]);
     * @param {undefiend|null|boolean} isModified
     */
    ezShowHideModifiedIndicator(isModified) {
        if (EzBoolean.isTrue(isModified)) {
            ezApi.ezclocker.ezUi.ezShowElement(this.ezIds.containers.activeJobCodeModifiedIndicatorId);
        } else {
            ezApi.ezclocker.ezUi.ezHideElement(this.ezIds.containers.activeJobCodeModifiedIndicatorId);
        }
    }

    /**
     * @protected @method
     * Handles the onBlur event for the Job Code Name input box.
     */
    ezHandleJobCodeNameInputOnBlur() {
        if (!EzObject.isValid(EzJobCodeDialog.ezInstance.ezActiveJobCode)) {
            return;
        }

        if (EzJobCodeDialog.ezInstance.ezActiveJobCode.tagName !== EzJobCodeDialog.ezInstance.ezJobCodeNameInputValue) {
            return EzJobCodeDialog.ezInstance.ezValidateDataTagNeverAssigned(EzJobCodeDialog.ezInstance.ezActiveJobCode.id)
                .then(
                    (dataTagAssigned) => {
                        if (dataTagAssigned) {
                            // Reset to the original name
                            ezApi.ezclocker.ezUi.ezSetInputValue(
                                EzJobCodeDialog.ezInstance.ezManageJobCodesDialogView.ezIds.inputs.jobCodeNameInputId,
                                EzJobCodeDialog.ezInstance.ezActiveJobCode.tagName);

                            return ezApi.ezclocker.ezDialog.ezShowOK(
                                'Renaming Assigned Jobs',
                                EzHtml.template`
                                    <p>
                                        EzClocker does not allow you to modify the name of a Job with existing assignments. Renaming a job can cause
                                        confusion when reviewing past reports or time entries that were assigned the job prior to the rename.
                                    </p>
                                    <p>
                                        Instead of modifying a job's name perform the following tasks:
                                        <ol>
                                            <li>Archive the existing job with the name you no longer wish to use</li>
                                            <li>Create a new job with the new name.</li>
                                        </ol>
                                    </p>`);
                        } else {
                            return EzJobCodeDialog.ezInstance.ezPersistJobCodeEditorInputs()
                                .then(EzJobCodeDialog.ezInstance.ezSaveIfActiveJobCodeModified)
                                .then(ezApi.ezIgnoreResolve);
                        }
                    });
        }

        if (EzJobCodeDialog.ezInstance.ezActiveJobCode.description !== EzJobCodeDialog.ezInstance.ezJobCodeCodeInputValue ||
            EzJobCodeDialog.ezInstance.ezActiveJobCode.value !== EzJobCodeDialog.ezInstance.ezHourlyRateInputValue) {
            return EzJobCodeDialog.ezInstance.ezPersistJobCodeEditorInputs()
                .then(EzJobCodeDialog.ezInstance.ezSaveIfActiveJobCodeModified)
                .then(ezApi.ezIgnoreResolve);
        }

        return EzJobCodeDialog.ezInstance.ezSaveIfActiveJobCodeModified()
            .then(ezApi.ezIgnoreResolve);
    }

}
