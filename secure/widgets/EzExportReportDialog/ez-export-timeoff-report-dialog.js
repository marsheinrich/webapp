import {
    EzException,
    EzBadParamException
} from '/ezlibrary/exceptions/EzExceptions.js';

import {
    EzObject,
    EzBoolean,
    EzString,
    EzArray, EzHtml
} from '/ezlibrary/helpers/EzHelpers.js';

import {
    EzRegistrationState,
    EzClockerContextEventName,
    EzElementEventName,
} from '/ezlibrary/enums/EzEnumerations.js';

import { EzClass } from '/ezlibrary/EzClass.js';

import { EzDateTime } from '/public/javascript/common/ez-date-time.js';

import { EzEventEngine } from '/ezlibrary/ez-event-engine.js';

import { EzClockerContext } from '/ezlibrary/EzClockerContext/ez-context.js';

import { EzUI } from '/public/javascript/common/ezui.js';
import { EzDialogConfig } from '/ezlibrary/ux/dialogs/EzDialogConfig.js';
import { EzDialog } from '/public/javascript/common/ezclocker-dialog-helper.js';

import { EzExportDialogMode } from '/secure/widgets/EzExportReportDialog/EzExportDialogMode.js';
import { EzExportAction } from '/secure/widgets/EzExportReportDialog/EzExportAction.js';
import { EzEmployerReports } from '/secure/widgets/EzExportReportDialog/ez-employer-reports.js';
import {
    EzExportEmployerReportEventHandlers
} from '/secure/widgets/EzExportReportDialog/ez-export-employer-report-event-handlers.js';
import {EzReportFormat} from "./EzReportFormat";

export class EzExportTimeOffReport {
    /**
        @public @static @readonly @property
        Returns an array of enum property names for EzExportTimeOffReport
        @returns {array}
     */
    static get ezNames() {
        return [
            'SELECTED_EMPLOYEE',
        ]
    }

    /**
        @public @static @readonly @property
        Returns an array of enum property name values.
        The value of an index in the ezValues array lines up with the enum property name for the same index from EzExportTimeOffReport.
     */
    static get ezValues() {
        return [
            'SelectedEmployeeTab',
        ]
    }

    static get SELECTED_EMPLOYEE() {
        return EzExportTimeOffReport.ezValues[0];
    }

    /**
        @public @static @method
        Returns the enumeration property value for the enum property that matches the provided enumPropertyName.
        @returns {string}
        A valid EzExportTimeOffReport enumeration property value.
     */
    static ezValueOf(enumPropertyName) {
        let index = EzExportTimeOffReport.ezNames.indexOf(enumPropertyName);

        if (0 > index) {
            return EzExportTimeOffReport.SELECTED_EMPLOYEE;
        }

        return EzExportTimeOffReport.ezValues[EzExportTimeOffReport.ezNames[index]];
    }
}

/**
    Controller for the employer or employee export dialog
    Import with:
        import { EzwEmployerExportTimeOffDialog } from '/secure/widgets/EzExportReportDialog/ez-export-report-dialog.js';

        globalThis.ezApi.ezclocker[EzwEmployerExportTimeOffDialog.ezApiName] &&
        globalThis.ezApi.ezclocker[EzwEmployerExportTimeOffDialog.ezApiName].ready &&
 */
export class EzwEmployerExportTimeOffDialog extends EzClass {
    /**
        @public @static @readonly @property
        Returns the name of this class's singleton instance when registered with ezApi.
        @returns {string}
     */
    static get ezApiName() {
        return 'ezwEmployerExportTimeOffDialog';
    }

    /**
        @public @static @readonly @property
        Returns an object of event names that this class may trigger.
        @returns {object}
     */
    static get ezEventNames() {
        return {
            onReady: 'ezOn_EzwEmployerExportTimeOffDialog_Ready',
            onExportDialogReady: 'ezOn_EzwEmployerExportTimeOffDialog_Ready'
        };
    }

    /**
        @static
        @private @field
        Stores the singleton instance of this class that was created by and registerd with EzApi.
        @type {EzwEmployerExportTimeOffDialog}
     */
    static #ezInstance = EzObject.hasProperty(globalThis, 'ezApi') &&
        EzObject.isValid(globalThis.ezApi) && EzBoolean.isTrue(globalThis.ezApi.ready) &&
        EzObject.isValid(globalThis.ezApi.ezclocker[EzwEmployerExportTimeOffDialog.ezApiName])
        ? globalThis.ezApi.ezclocker[EzwEmployerExportTimeOffDialog.ezApiName]
        : null;

    /**
        @public @static @getter @property
        Returns the singleton instance of this class that is registered with EzApi (if available yet)
        @param {EzwEmployerExportTimeOffDialog}
     */
    static get ezInstance() {
        return EzwEmployerExportTimeOffDialog.#ezInstance;
    }

    /**
        @public @static @getter @property
        Sets the singleton instance of of this class that is registered with EzApi.
        @param {EzwEmployerExportTimeOffDialog} ezwEmployerExportTimeoffDialog
     */
    static set ezInstance(ezwEmployerExportTimeoffDialog) {
        if (null != EzwEmployerExportTimeOffDialog.#ezInstance) {
            throw new Error('EzwEmployerExportTimeOffDialog\'s singleton instance is already reigstered with EzApi.');
        }

        EzwEmployerExportTimeOffDialog.#ezInstance = ezwEmployerExportTimeoffDialog;
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
        EzObject.isValid(globalThis.ezApi.ezclocker[EzwEmployerExportTimeOffDialog.ezApiName])
        ? EzRegistrationState.REGISTERED
        : null;

    /**
        @public @static @property @getter
        Returns the ezApi registration state of this classes' singleton instance.
        @returns {string}
        A valid enum property value from EzRegistrationState
     */
    static get ezApiRegistrationState() {
        return EzwEmployerExportTimeOffDialog.#ezApiRegistrationState;
    }

    /**
        @public @static @property @setter
        Sets the ezApi registration state of this classes' singleton instance.
        @param {string} ezApiRegistrationState
        A valid enum property value from EzRegistrationState
     */
    static set ezApiRegistrationState(ezApiRegistrationState) {
        EzwEmployerExportTimeOffDialog.#ezApiRegistrationState = EzRegistrationState.ezValueOf(ezApiRegistrationState);
    }


    /**
        @public @static @readonly @property
        Returns if all necessary dependences are ready, and therefore it is ok for this class to
        register its singleton instance with ezApi.
        @returns {boolean}
     */
    static get #ezCanRegister() {
        return EzRegistrationState.PENDING === EzwEmployerExportTimeOffDialog.ezApiRegistrationState &&
            EzObject.hasProperty(globalThis, 'ezApi') &&
            EzObject.isValid(globalThis.ezApi) && EzBoolean.isTrue(globalThis.ezApi.ready) &&

            globalThis.ezApi.ezclocker[EzDateTime.ezApiName] &&
            globalThis.ezApi.ezclocker[EzDateTime.ezApiName].ready &&

            globalThis.ezApi.ezclocker[EzEventEngine.ezApiName] &&
            globalThis.ezApi.ezclocker[EzEventEngine.ezApiName].ready &&

            globalThis.ezApi.ezclocker[EzClockerContextEventName.ezApiName] &&
            globalThis.ezApi.ezclocker[EzClockerContextEventName.ezApiName].ready &&

            globalThis.ezApi.ezclocker[EzClockerContext.ezApiName] &&
            globalThis.ezApi.ezclocker[EzClockerContext.ezApiName].ready &&

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
        return null != EzwEmployerExportTimeOffDialog.ezInstance &&
            EzRegistrationState.REGISTERED === EzwEmployerExportTimeOffDialog.ezApiRegistrationState;
    }

    /**
        @private @static @method
        Attempts to register the singleton instance for this class with ezAp. Returns true
        if successful, false otherwise.
        @returns {boolean}
     */
    static #ezRegistrator() {
        if (EzwEmployerExportTimeOffDialog.#ezCanRegister && !EzwEmployerExportTimeOffDialog.#ezIsRegistered) {
            globalThis.ezApi.ezRegisterNewApi(EzwEmployerExportTimeOffDialog, EzwEmployerExportTimeOffDialog.ezApiName);
        }

        return EzRegistrationState.REGISTERED === EzwEmployerExportTimeOffDialog.ezApiRegistrationState;
    }

    /**
        @static
        Static Initializer
     */
    static {
        if (!EzwEmployerExportTimeOffDialog.#ezIsRegistered) {
            EzwEmployerExportTimeOffDialog.ezApiRegistrationState = EzRegistrationState.PENDING;

            if (!EzwEmployerExportTimeOffDialog.#ezRegistrator()) {
                document.addEventListener(
                    EzwEmployerExportTimeOffDialog.ezOnEzApiReadyEventName,
                    EzwEmployerExportTimeOffDialog.#ezRegistrator);

                document.addEventListener(
                    EzDateTime.ezEventNames.onReady,
                    EzwEmployerExportTimeOffDialog.#ezRegistrator);

                document.addEventListener(
                    EzEventEngine.ezEventNames.onReady,
                    EzwEmployerExportTimeOffDialog.#ezRegistrator);

                document.addEventListener(
                    EzClockerContextEventName.ezEventNames.onReady,
                    EzwEmployerExportTimeOffDialog.#ezRegistrator);

                document.addEventListener(
                    EzClockerContext.ezEventNames.onReady,
                    EzwEmployerExportTimeOffDialog.#ezRegistrator);

                document.addEventListener(
                    EzUI.ezEventNames.onReady,
                    EzwEmployerExportTimeOffDialog.#ezRegistrator);

                document.addEventListener(
                    EzDialog.ezEventNames.onReady,
                    EzwEmployerExportTimeOffDialog.#ezRegistrator);

                document.addEventListener(
                    EzwEmployerExportTimeOffDialog.ezEventNames.onReady,
                    EzwEmployerExportTimeOffDialog.#ezRegistrator);
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
        @private @field
        Stores an object with information about the dialog's tabs
        @type {object}
     */
    #ezTabs = null

    /**
        @private @field
        Stores an object with information about each tabs view
        @type {object}
     */
    #ezTabViews = null;

    ezEmployerReports = new EzEmployerReports();
    ezInternalEventHandlers = new EzExportEmployerReportEventHandlers();
    ezActiveTabId = null;
    ezActiveTab = null;
    ezEmployerReportOptionEventsHooked = false;
    activeExportMode = EzExportDialogMode.EMPLOYEE;
    exportActionContext = {
        action: EzExportAction.EXPORT_SELECTED_EMPLOYEE
    };
    ezHasIntegrations = false;
    ezActiveIntegrations = null;


    /**
        @public @readonly @property
        Returns an array of EzExportTimeOffReport enum property values in the order the
        tabs will display in the dialog.
        @returns {array}
     */
    get ezTabIds() {
        return [
            EzExportTimeOffReport.SELECTED_EMPLOYEE
        ];
    }

    /**
        @public @readonly @property
        Returns an object with information about the dialog's tabs
        @returns {object}
     */
    get ezTabs() {
        if (null == this.#ezTabs) {
            this.#ezTabs = this.ezBuildTabs();
        }

        return this.#ezTabs;
    }

    /**
        @public @readonly @property
        Returns an object with information about each tab's view
        @returns {object}
     */
    get ezTabViews() {
        if (null == this.#ezTabViews) {
            this.#ezTabViews = this.ezBuildTabViews();
        }

        return this.#ezTabViews;
    }

    /**
        @public @readonly @property
        Returns the parent container id to inject the dialog into
        @returns {string}
     */
    get ezParentContainerId() {
        return '_HideDialogsDiv';
    }

    /**
        @public @readonly @property
        Returns the dialog's <div> id
        @returns {string}
     */
    get ezDialogId() {
        return 'EzExportTimeOff';
    }

    /**
        @public @readonly @property
        Returns the dialog's content container id
        @returns {string}
     */
    get ezContentContainerId() {
        return 'EzExportTimeOffDialogContentContainer';
    }

    /**
        @public @readonly @property
        Returns an object that contains commonly references html element ids for this dialog.
        @returns {object}
        Object format: {
            dialogId: <dialogId>
            containers: { <elementNameId: 'elementid' ... },
            inputs: { <elementNameId: 'elementid'... },
        }
     */
    get ezIds() {
        return {
            dialogId: this.ezDialogId,
            containers: {

            },
            selects: {
                singleEmployeeExportSelectId: 'EzEmployerExportTimeOffDialog_EmployeeSelection',
                singleEmployeeExportYearSelectId: 'EzEmployerExportTimeOffDialog_YearSelection'
            }
        }
    }

    /**
        @protected @method
        Initializes ezwEmployerExportTimeOffDialog
        @returns {EzwEmployerExportTimeOffDialog}
     */
    ezInit() {
        ezApi.ezclocker.ezEventEngine.ezRegisterEvent(
            EzwEmployerExportTimeOffDialog.ezApiName,
            EzwEmployerExportTimeOffDialog.ezEventNames.onExportDialogReady);

        EzwEmployerExportTimeOffDialog.ezInstance.REPORTS_API_BASE_URI =
            ezApi.ezclocker.nav.ezGetInternalApiUrl('reports', 'v1');

        EzwEmployerExportTimeOffDialog.ezInstance.EMPLOYEE_EXPORT_TIME_ENTRY_REPORT_URI =
            ezApi.ezclocker.nav.ezGetInternalApiUrl('reports/export/employee', 'v1');

        ezApi.ezclocker.ezEventEngine.ezWantEvent(
            EzClockerContextEventName.onUserContextReady,
            EzwEmployerExportTimeOffDialog.ezApiName,
            EzwEmployerExportTimeOffDialog.ezInstance.ezInitUX);

        return EzwEmployerExportTimeOffDialog.ezInstance;
    }

    /**
        @protected @method
        Initializes the dialog's UX
        @param {Function|null} exportCallback
     */
    ezInitUX() {
        EzwEmployerExportTimeOffDialog.ezInstance.ezInitDialog();
    }

    /**
        @protected @method
        Initializes the dialog
     */
    ezInitDialog() {
        if (!ezApi.ezElementExists(EzwEmployerExportTimeOffDialog.ezInstance.ezParentContainerId)) {
            ezApi.ezclocker.ezUi.ezAppendContent(
                'body',
                ezApi.ezTemplate`
                    <div id="${EzwEmployerExportTimeOffDialog.ezInstance.ezParentContainerId}" style="display:none"></div>`);
        }

        ezApi.ezclocker.ezUi.ezAppendContent(
            EzwEmployerExportTimeOffDialog.ezInstance.ezParentContainerId,
            EzwEmployerExportTimeOffDialog.ezInstance.ezBuildExportReportDialogHTML()
        );

        let dialogConfig = new EzDialogConfig(EzwEmployerExportTimeOffDialog.ezInstance.ezDialogId);

        dialogConfig.width = "auto";
        dialogConfig.height = "auto";
        dialogConfig.buttons = [
            {
                id: 'EzExportDialog_ExportButton',
                text: 'Export',
                click: EzwEmployerExportTimeOffDialog.ezInstance.exportTimeSheet
            },
            {
                id: 'EzExportDialog_CancelButton',
                text: 'Cancel',
                click: EzwEmployerExportTimeOffDialog.ezInstance.ezClose
            }
        ];
        ezApi.ezclocker.ezDialog.ezInitDialogWithConfig(EzwEmployerExportTimeOffDialog.ezInstance.ezDialogId, dialogConfig);

        EzwEmployerExportTimeOffDialog.ezInstance.ezInitDialogControls()
            .then(
                () => ezApi.ezclocker.ezEventEngine.ezTriggerEvent(
                    EzwEmployerExportTimeOffDialog.ezEventNames.onExportDialogReady,
                    EzwEmployerExportTimeOffDialog.ezInstance));
    }

    /**
        @protected @method
        Starts initialization of the export dialog (mode not important at this point)
        @returns {Promise.resolve}
     */
    ezInitDialogControls() {
        return ezApi.ezAsyncAction(
            (finished) => {
                // Initialize any special controls for the employer mode
                return EzwEmployerExportTimeOffDialog.ezInstance.ezInitEmployerDialogControls().then(finished);
            });
    }

    /**
        @protected @method
        Initializes the Employer mode dialog controls
        @returns {Promise.resolve}
     */
    ezInitEmployerDialogControls() {
        return ezApi.ezAsyncAction(
            (finished) => {

                ezApi.ezclocker.ezUi.ezId('_ExportOptions').buttonset();

                // Employer tab navigation
                ezApi.ezclocker.ezEventEngine.ezWantElementEvent(
                    EzwEmployerExportTimeOffDialog.ezInstance.ezTabs[EzExportTimeOffReport.SELECTED_EMPLOYEE].id,
                    EzElementEventName.CLICK,
                    EzwEmployerExportTimeOffDialog.ezApiName,
                    (ezEvent) => EzwEmployerExportTimeOffDialog.ezInstance.ezInternalEventHandlers.handleShowSelectEmployeeTabClick(
                        ezEvent.data.elementEvent));

                return finished();
            });
    }

    /**
        @protected @method
        Resets the dialog to its initial state.
     */
    ezResetDialog() {
        EzwEmployerExportTimeOffDialog.ezInstance.activeEmployerId = EzObject.isValid(ezApi.ezclocker.ezClockerContext.ezGetActiveEmployer())
            ? ezApi.ezclocker.ezClockerContext.ezGetActiveEmployer().id
            : -1;

        // EzwEmployerExportTimeOffDialog.ezInstance.activeEmployeeId = EzObject.isValid(ezApi.ezclocker.ezClockerContext.ezGetActiveEmployee())
        //     ? ezApi.ezclocker.ezClockerContext.ezGetActiveEmployee().id
        //     : -1;

        ezApi.ezclocker.ezUi.ezHideElement('ezDateRangeError');


    }

    /**
        @protected @method
        Resets the dialog to it's initial state for an employer.
     */
    ezResetDialogForEmployer(selectedEmployee, selectedYear) {
        EzwEmployerExportTimeOffDialog.ezInstance.ezResetDialog();

        EzwEmployerExportTimeOffDialog.ezInstance.activeExportMode = EzExportDialogMode.EMPLOYER;

        ezApi.ezclocker.ezUi.ezId(EzwEmployerExportTimeOffDialog.ezInstance.ezDialogId).dialog(
            'option',
            'title',
            'Export Time Off to PDF');

        ezApi.ezclocker.ezUi.ezShowElement('EzEMPLOYER_EXPORT_MODE');


        EzwEmployerExportTimeOffDialog.ezInstance.ezLoadAvailableEmployees(selectedEmployee);
        EzwEmployerExportTimeOffDialog.ezInstance.renderRequestYears(selectedYear);
    }

    /**
        @public @method
        Shows the export dialog in the specified mode.
        @param {EzExportDialogMode|String} ezExportDialogMode
        @param {moment} startMoment
        @param {moment} endMOment
        @param {EzExportAction|String|null} ezExportAction
     */
    ezShow(ezExportDialogMode, selectedEmployee, selectedYear, ezExportAction) {
        if (!EzString.stringHasLength(ezExportDialogMode)) {
            throw new EzBadParamException(
                'ezExportDialogMode',
                EzwEmployerExportTimeOffDialog.ezInstance,
                EzwEmployerExportTimeOffDialog.ezInstance.ezShow);
        }

        EzwEmployerExportTimeOffDialog.ezInstance.activeExportMode = ezExportDialogMode;

        switch (EzwEmployerExportTimeOffDialog.ezInstance.activeExportMode) {
            case EzExportDialogMode.EMPLOYER:
                EzwEmployerExportTimeOffDialog.ezInstance.showDialog(selectedEmployee, selectedYear, ezExportAction);
                break;
            case EzExportDialogMode.UNKNOWN:
            default:
                throw ezApi.ezException(
                    `Export dialog mode ${EzwEmployerExportTimeOffDialog.ezInstance.activeExportMode} is currently not supported.`);
        }
    }

    /**
        @protected @method
        Shows the dialog for the employer mode
        @param {moment} startMoment
        @param {moment} endMoment
        @param {EzExportAction|String|null} ezExportAction
     */
    showDialog(selectedEmployee, selectedYear, ezExportAction) {
        EzwEmployerExportTimeOffDialog.ezInstance.ezResetDialogForEmployer(selectedEmployee, selectedYear);

        EzwEmployerExportTimeOffDialog.ezInstance.exportActionContext.action = EzString.stringHasLength(ezExportAction)
            ? ezExportAction
            : EzExportAction.EXPORT_SELECTED_EMPLOYEE;

        EzwEmployerExportTimeOffDialog.ezInstance.ezShowDialogContentContainer();
        EzwEmployerExportTimeOffDialog.ezInstance.ezActivateTabForCurrentAction();

        ezApi.ezclocker.ezDialog.ezShowDialog(EzwEmployerExportTimeOffDialog.ezInstance.ezDialogId);
    }

    /**
        @public
        Closes the export time-sheet dialog
     */
    ezClose() {
        EzwEmployerExportTimeOffDialog.ezInstance.ezHideDialogContentContainer();

        ezApi.ezclocker.ezDialog.ezCloseDialog(EzwEmployerExportTimeOffDialog.ezInstance.ezDialogId);

        EzwEmployerExportTimeOffDialog.ezInstance.ezHideExportModeUI();
    }

    /**
        @protected @method
        Shows the dialog's content container (all UX)
        @returns {Promise.resolve}
     */
    ezShowDialogContentContainer() {
        return ezApi.ezclocker.ezUi.ezShowElement(EzwEmployerExportTimeOffDialog.ezInstance.ezContentContainerId);
    }

    /**
        @protected @method
        Hides the dialog's content container (all UX)
        @returns {Promise.resolve}
     */
    ezHideDialogContentContainer() {
        return ezApi.ezclocker.ezUi.ezHideElementAnimated(
            EzwEmployerExportTimeOffDialog.ezInstance.ezContentContainerId);
    }

    /**
        @protected @method
        Hides all UX for all export modes.
     */
    ezHideExportModeUI() {
        ezApi.ezclocker.ezUi.ezHideElement('EzEMPLOYER_EXPORT_MODE');
    }

    /**
     * @public
     * Renders the available locations in the edit dialog
     */
    renderRequestYears(selectedYear = ezApi.ezclocker.ezDateTime.ezNow().year()) {
        let minYear = 2022;

        let diffYear = parseInt(selectedYear) - minYear;

        let htmlForYearsSelect = EzString.EMPTY;

        Array(...Array(diffYear + 3))
            .forEach(
                (_, diff) => {
                    let valueForYearsSelect = parseInt(minYear + diff);

                    htmlForYearsSelect = EzHtml.build`
                        ${htmlForYearsSelect}
                        <option
                            value="${valueForYearsSelect}">
                            ${valueForYearsSelect}
                        </option>`;
                });

        ezApi.ezclocker.ezUi.ezSetContent(
            EzwEmployerExportTimeOffDialog.ezInstance.ezIds.selects.singleEmployeeExportYearSelectId,
            htmlForYearsSelect);

        ezApi.ezclocker.ezUi.ezEnableElement(EzwEmployerExportTimeOffDialog.ezInstance.ezIds.selects.singleEmployeeExportYearSelectId);

        ezApi.ezclocker.ezUi.ezSetInputValue(
            EzwEmployerExportTimeOffDialog.ezInstance.ezIds.selects.singleEmployeeExportYearSelectId,
            selectedYear);
    }

    /**
        @protected @method
        Loads the available employees into the employee select combo box
     */
    ezLoadAvailableEmployees(activeEmployeeId = ezApi.ezclocker.ezClockerContext.ezGetActiveEmployee().id) {

        let sortedEmployees = ezApi.ezclocker.ezClockerContext.ezGetSelectedEmployerAccountEmployeeAccounts();

        let availableEmployeeOptions = '';
        if (EzArray.arrayHasLength(sortedEmployees)) {

            for (let index in sortedEmployees) {
                let employee = sortedEmployees[index];
                let selected = parseInt(activeEmployeeId) === employee.id
                    ? 'selected'
                    : '';

                availableEmployeeOptions = ezApi.ezTemplate`${availableEmployeeOptions}
                    <option
                        value="${employee.id}"
                        ${selected}>
                        ${employee.employeeName}
                    </option>`;
            }
        } else {
            availableEmployeeOptions = ezApi.ezTemplate`
                <option
                    value="-1">
                    [ No Employees Available ]
                </option>`;
        }

        ezApi.ezclocker.ezUi.ezContent(
            EzwEmployerExportTimeOffDialog.ezInstance.ezIds.selects.singleEmployeeExportSelectId,
            availableEmployeeOptions);
    }


    /**
        @protected @method
        Performs the export of the time-sheet based on the action and options selected by the user
        @returns {Promise.resolve}
     */
    exportTimeSheet() {
        switch (EzwEmployerExportTimeOffDialog.ezInstance.activeExportMode) {
            case EzExportDialogMode.EMPLOYER:
                return EzwEmployerExportTimeOffDialog.ezInstance.ezEmployerModeExport();
        }
    }


    /**
        @protected @method
        Starts the export of employer mode time entry reports
     */
    ezEmployerModeExport() {
        return ezApi.ezclocker.ezUi.ezPageWaitExecute(
            'Preparing report ...',
            (waitDone) => {
                switch (EzwEmployerExportTimeOffDialog.ezInstance.exportActionContext.action) {
                    case EzExportAction.EXPORT_SELECTED_EMPLOYEE:
                    case EzExportAction.EXPORT_CURRENT_EMPLOYEE:
                        return EzwEmployerExportTimeOffDialog.ezInstance.exExecuteExportSelectedEmployee(waitDone).then(waitDone)
                    default:
                        return EzwEmployerExportTimeOffDialog.ezInstance.exExecuteExportSelectedEmployee(waitDone).then(waitDone)
                }
            });
    }

    /**
        @protected @method
        Starts the export of the selected employee time entry report.
        @param {Function} waitDone
        @returns {Promise.resolve}
     */
    exExecuteExportSelectedEmployee(waitDone) {
        const year = ezApi.ezclocker.ezUi.ezGetInputValue(
            EzwEmployerExportTimeOffDialog.ezInstance.ezIds.selects.singleEmployeeExportYearSelectId);
        const firstDayOfYearMoment = ezApi.ezclocker.ezDateTime.ezFromIso(`${year}-01-01T00:00:00`);

        const lastDayOfYearMoment = ezApi.ezclocker.ezDateTime.ezFromIso(`${year}-12-31T23:59:59`);

        const selectedEmployeeId =  ezApi.ezclocker.ezUi.ezGetInputValue(
            EzwEmployerExportTimeOffDialog.ezInstance.ezIds.selects.singleEmployeeExportSelectId);

        // Exports the currently selected employee
        let downloadReportUrl = ezApi.ezclocker.ezNavigation.getInternalApiUrl(
            ezApi.ezUrlTemplate`reports/
                        employee/${selectedEmployeeId}
                        /time-offs
                        /${EzReportFormat.PDF}
                        ?period-start-iso=${firstDayOfYearMoment.toISOString()}
                        &period-end-iso=${lastDayOfYearMoment.toISOString()}
                        &customer-id=${ezApi.ezclocker.ezClockerContext.ezGetSelectedEmployerAccount().userId}
                        &target-time-zone-id=${ezApi.ezEncode(ezApi.ezclocker.ezDateTime.activeTimeZone)}`,
            'v1');

        EzwEmployerExportTimeOffDialog.ezInstance.ezClose();

        ezApi.ezclocker.ezReportDownloadDialog.ezShow(downloadReportUrl);

        return waitDone(downloadReportUrl);
    }

    /**
        @protected @method
        Activates the tab associated with the current action (for employer mode only)
     */
    ezActivateTabForCurrentAction() {
        if (EzExportDialogMode.EMPLOYER !== EzwEmployerExportTimeOffDialog.ezInstance.activeExportMode) {
            // Only for employer mode
            return;
        }

        let tabId;
        let tabViewId;

        switch (EzwEmployerExportTimeOffDialog.ezInstance.exportActionContext.action) {
            case EzExportAction.EXPORT_CURRENT_EMPLOYEE:
            case EzExportAction.EXPORT_SELECTED_EMPLOYEE:
            default:
                tabId = EzwEmployerExportTimeOffDialog.ezInstance.ezTabs[EzExportTimeOffReport.SELECTED_EMPLOYEE].id;
                tabViewId = EzwEmployerExportTimeOffDialog.ezInstance.ezTabs[EzExportTimeOffReport.SELECTED_EMPLOYEE].tabViewId;
                break;
        }

        EzwEmployerExportTimeOffDialog.ezInstance.ezActivateTab(tabId);

        ezApi.ezclocker.ezUi.ezFocus(tabViewId);
    }

    /**
        @protected @method
        Sets the tag associated with the provided aTabIdToActive as active.
        @param {String} aTabIdToActivate
     */
    ezActivateTab(aTabIdToActivate) {
        if (!EzString.stringHasLength(aTabIdToActivate)) {
            throw new EzBadParamException(
                'aTabIdToActivate',
                EzwEmployerExportTimeOffDialog.ezInstance,
                EzwEmployerExportTimeOffDialog.ezInstance.ezActivateTab);
        }
        if (!EzObject.hasProperty(EzwEmployerExportTimeOffDialog.ezInstance.ezTabs, aTabIdToActivate)) {
            throw new EzException(`Tab id ${aTabIdToActivate} does not exist.`);
        }

        if (aTabIdToActivate === EzwEmployerExportTimeOffDialog.ezInstance.ezActiveTabId) {
            // already active
            return;
        }

        if (EzString.stringHasLength(EzwEmployerExportTimeOffDialog.ezInstance.ezActiveTabId) &&
            EzObject.hasProperty(EzwEmployerExportTimeOffDialog.ezInstance.ezTabs, EzwEmployerExportTimeOffDialog.ezInstance.ezActiveTabId)) {

            // Deactivate current
            ezApi.ezCallback(
                EzwEmployerExportTimeOffDialog.ezInstance.ezTabs[EzwEmployerExportTimeOffDialog.ezInstance.ezActiveTabId].onBeforeUnactivate,
                EzwEmployerExportTimeOffDialog.ezInstance.ezTabs[EzwEmployerExportTimeOffDialog.ezInstance.ezActiveTabId]);

            ezApi.ezclocker.ezUi.ezHideElement(
                EzwEmployerExportTimeOffDialog.ezInstance.ezTabViews[EzwEmployerExportTimeOffDialog.ezInstance.ezActiveTabId].id);

            ezApi.ezclocker.ezUi.ezRemoveClass(
                EzwEmployerExportTimeOffDialog.ezInstance.ezTabViews[EzwEmployerExportTimeOffDialog.ezInstance.ezActiveTabId].id,
                'ezActiveTabView');

            ezApi.ezclocker.ezUi.ezRemoveClass(EzwEmployerExportTimeOffDialog.ezInstance.ezActiveTabId, 'ezActiveTab');

            ezApi.ezclocker.ezUi.ezSetElementDataAttributeValue(
                EzwEmployerExportTimeOffDialog.ezInstance.ezActiveTabId,
                'active',
                'false');

            EzwEmployerExportTimeOffDialog.ezInstance.ezTabs[EzwEmployerExportTimeOffDialog.ezInstance.ezActiveTabId].active = false;

            EzwEmployerExportTimeOffDialog.ezInstance.ezActiveTabId = null;
        }

        // Activate the new tab
        ezApi.ezCallback(
            EzwEmployerExportTimeOffDialog.ezInstance.ezTabs[aTabIdToActivate].onBeforeActivate,
            EzwEmployerExportTimeOffDialog.ezInstance.ezTabs[aTabIdToActivate]);

        EzwEmployerExportTimeOffDialog.ezInstance.ezTabs[aTabIdToActivate].active = true;

        ezApi.ezclocker.ezUi.ezSetElementDataAttributeValue(aTabIdToActivate, 'active', 'true');

        ezApi.ezclocker.ezUi.ezAddClass(aTabIdToActivate, 'ezActiveTab');

        // Display the tab's view
        ezApi.ezclocker.ezUi.ezAddClass(EzwEmployerExportTimeOffDialog.ezInstance.ezTabViews[aTabIdToActivate].id, 'ezActiveTabView');

        ezApi.ezclocker.ezUi.ezShowElement(EzwEmployerExportTimeOffDialog.ezInstance.ezTabViews[aTabIdToActivate].id);

        EzwEmployerExportTimeOffDialog.ezInstance.ezActiveTabId = aTabIdToActivate;
    }

    /**
        @protected @method
        Returns the selected/active employeeId to run the report for.
        @returns {Number}
     */
    ezGetSelectedEmployeeId() {
        return EzwEmployerExportTimeOffDialog.ezInstance.activeExportMode === ezApi.ezToNumber(
                ezApi.ezclocker.ezUi.ezGetInputValue(EzwEmployerExportTimeOffDialog.ezInstance.ezIds.selects.singleEmployeeExportSelectId));
    }

    /**
        @protected @method
        Builds the export report dialog's HTML
        @returns {String}
     */
    ezBuildExportReportDialogHTML() {
        return ezApi.ezTemplate`
            <div
                id="${EzwEmployerExportTimeOffDialog.ezInstance.ezDialogId}"
                title="Export Time Off">
                <div
                    id="EzExportTimeOffDialogContentContainer">
                    ${EzwEmployerExportTimeOffDialog.ezInstance.ezBuildEmployerExportModeHtml()}
                    <div
                        id="ezDateRangeError"
                        class="ezErrorBox"
                        style="display:none">
                    </div>
                </div>
            </div>`;
    }

    ezBuildTabViewsHtml() {

        let tabViewsHtml;

        EzwEmployerExportTimeOffDialog.ezInstance.ezTabIds.forEach(
            (tabId) => {
                if (!EzObject.hasProperty(EzwEmployerExportTimeOffDialog.ezInstance.ezTabViews, tabId)) {
                    ezApi.ezclocker.ezLogger.error(`Tab view does not exist for tabId=${tabId}`);
                } else {
                    tabViewsHtml = ezApi.ezTemplate`${tabViewsHtml}
                        ${EzwEmployerExportTimeOffDialog.ezInstance.ezTabViews[tabId].view}`;
                }
            });

        return tabViewsHtml;
    }

    /**
        @protected @method
        Builds the Selected Employee tab view html
        @returns {string}
     */
    ezBuildSelectedEmployeeTabViewHtml(tabViewId) {
        return ezApi.ezTemplate`
            <!-- Selected Employee Tab View -->
            <div
                id="${tabViewId}"
                data-tabgroup="exportReportTabs"
                class="ezTabs-content"
                style="height:180px;">
                <div
                    id="EzExportSelectedEmployeeViewLayout"
                    class="ezTabs-section-grid-cols_360x360" style="grid-template-columns: 200px 200px;">
                    <div
                        class="ezContainer-labeled-input-vertical">
                        <label
                            for="${EzwEmployerExportTimeOffDialog.ezInstance.ezIds.selects.singleEmployeeExportSelectId}"
                            class="ezH4">
                            Select Employee
                        </label>
                        <select
                            id="${EzwEmployerExportTimeOffDialog.ezInstance.ezIds.selects.singleEmployeeExportSelectId}"
                            class="ezFullWidth">
                        </select>
                    </div>
                    <div
                        class="ezContainer-labeled-input-vertical">
                        <label
                            for="${EzwEmployerExportTimeOffDialog.ezInstance.ezIds.selects.singleEmployeeExportYearSelectId}"
                            class="ezH4">
                            Select Year
                        </label>
                        <select
                            id="${EzwEmployerExportTimeOffDialog.ezInstance.ezIds.selects.singleEmployeeExportYearSelectId}"
                            class="ezFullWidth">
                        </select>
                    </div>
                </div>
            </div>`;
    }

    /**
     @protected @method
     Builds the employer export mode's HTML UX
     @returns {String}
     */
    ezBuildEmployerExportModeHtml() {
        let tabsHtml = '';

        for (let tabId in EzwEmployerExportTimeOffDialog.ezInstance.ezTabs) {

            let tab = EzwEmployerExportTimeOffDialog.ezInstance.ezTabs[tabId];

            let hideTabStyle = ezApi.ezIsFalse(tab.visible)
                ? 'style="display:none"'
                : '';

            tabsHtml = ezApi.ezTemplate`${tabsHtml}
                <button
                    id="${tab.id}"
                    type="button"
                    class="ezTab"
                    data-active="${tab.active.toString()}"
                    data-tabgroup="${tab.tabGroup}"
                    data-tabviewid="${tab.tabViewId}">
                    ${tab.caption}
                </button>`;
        }

        return ezApi.ezTemplate`
            <!-- Employer Export Mode -->
            <div
                id="EzEMPLOYER_EXPORT_MODE">
                <div
                    id="EzwEmployerExportTimeOffDialog"
                    title="Export Time Off">
                    <div
                        id="EzExportTypeTabs"
                        class="ezTabContainer"
                        style="height:240px">
                        <div
                            class="ezTabsContainer">
                            ${tabsHtml}
                        </div>
                        ${EzwEmployerExportTimeOffDialog.ezInstance.ezBuildTabViewsHtml()}
                    </div>
                </div>
            </div>`;
    }

    /**
        @protected @method
        Builds the available tabs and sets to EzwEmployerExportTimeOffDialog.ezInstance.ezTabs
        @returns {object}
     **/
    ezBuildTabs() {
        let tabsInfo = {};

        // Selected employee tab
        let ezExportReportTabId = EzwEmployerExportTimeOffDialog.ezInstance.ezTabIds[0];
        let ezTabViewId = `${ezExportReportTabId}_View`;
        tabsInfo[ezExportReportTabId] = {
            id: ezExportReportTabId,
            tabViewId: ezTabViewId,
            caption: 'Selected Employee',
            tabGroup: 'exportReportTabs',
            visible: true,
            active: true,
            onBeforeActivate: null,
            onBeforeUnactivate: null,
            onActivated: null
        };

        return tabsInfo;
    }

    /**
        @protected @method
        Builds the views for each tab in EzwEmployerExportTimeOffDialog.ezInstance.ezTabs
        @returns {object}
     */
    ezBuildTabViews() {
        let tabViewInfo = {};

        // Selected employee tab
        let ezExportReportTabId = EzwEmployerExportTimeOffDialog.ezInstance.ezTabIds[0];
        let ezTabViewId = `${ezExportReportTabId}_View`;
        tabViewInfo[ezExportReportTabId] = {
            id: ezTabViewId,
            view: EzwEmployerExportTimeOffDialog.ezInstance.ezBuildSelectedEmployeeTabViewHtml(ezTabViewId)
        };

        return tabViewInfo;
    }
}
