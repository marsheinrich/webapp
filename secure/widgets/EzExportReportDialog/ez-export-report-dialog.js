import {
    EzException,
    EzBadParamException
} from '/ezlibrary/exceptions/EzExceptions.js';

import {
    EzObject,
    EzBoolean,
    EzString,
    EzArray
} from '/ezlibrary/helpers/EzHelpers.js';

import {
    EzRegistrationState,
    EzClockerContextEventName,
    EzElementEventName,
    EzClockerFeature
} from '/ezlibrary/enums/EzEnumerations.js';

import { EzClass } from '/ezlibrary/EzClass.js';

import { EzDateTime } from '/public/javascript/common/ez-date-time.js';

import { EzEventEngine } from '/ezlibrary/ez-event-engine.js';

import { EzNavigation } from '/public/javascript/common/ezclocker-navigation-helper.js';

import { EzClockerContext } from '/ezlibrary/EzClockerContext/ez-context.js';

import { EzEmployerOption } from '/ezlibrary/EzEmployerOption.js';

// TODO: Fix amplitude
import { EzAnalyticsAndMetrics } from '/ezlibrary/analytics_metrics/EzAnalyticsAndMetrics.js';

import {
    EzIntegrationProviderId,
    EzIntegrationType
} from '/secure/integrations/ez-integration-enums.js';

import { EzUI } from '/public/javascript/common/ezui.js';
import { EzDialogConfig } from '/ezlibrary/ux/dialogs/EzDialogConfig.js';
import { EzDialog } from '/public/javascript/common/ezclocker-dialog-helper.js';

import { EzExportDialogMode } from '/secure/widgets/EzExportReportDialog/EzExportDialogMode.js';
import { EzExportAction } from '/secure/widgets/EzExportReportDialog/EzExportAction.js';
import { EzReportProviderType } from '/secure/widgets/EzExportReportDialog/EzReportProviderType.js';
import { EzReportFormat } from '/secure/widgets/EzExportReportDialog/EzReportFormat.js';
import { EzEmployerReports } from '/secure/widgets/EzExportReportDialog/ez-employer-reports.js';
import { EzEmployeeReports } from '/secure/widgets/EzExportReportDialog/ez-employee-reports.js';
import {
    EzExportEmployerReportEventHandlers
} from '/secure/widgets/EzExportReportDialog/ez-export-employer-report-event-handlers.js';
import { EzQBOIntegrationSetupResponse } from '/secure/integrations/quickbooks/EzQBOIntegrationSetupResponse.js';
import { EzGustoIntegrationSetupResponse } from '/secure/integrations/gusto/EzGustoIntegrationSetupResponse.js';

export class EzExportReportTabId {
    /**
        @public @static @readonly @property
        Returns an array of enum property names for EzExportReportTabId
        @returns {array}
     */
    static get ezNames() {
        return [
            'UNKNOWN',
            'SELECTED_EMPLOYEE',
            'ALL_EMPLOYEES',
            'JOBS',
            'Integrations'
        ]
    }

    /**
        @public @static @readonly @property
        Returns an array of enum property name values.
        The value of an index in the ezValues array lines up with the enum property name for the same index from EzExportReportTabId.
     */
    static get ezValues() {
        return [
            'UnknownTab',
            'SelectedEmployeeTab',
            'AllEmployeesTab',
            'JobsTab',
            'INTEGRATIONS'
        ]
    }

    static get UNKNOWN() {
        return EzExportReportTabId.ezValues[0];
    }

    static get SELECTED_EMPLOYEE() {
        return EzExportReportTabId.ezValues[1];
    }

    static get ALL_EMPLOYEES() {
        return EzExportReportTabId.ezValues[2];
    }

    static get JOBS() {
        return EzExportReportTabId.ezValues[3];
    }

    static get INTEGRATIONS() {
        return EzExportReportTabId.ezValues[4];
    }

    /**
        @public @static @method
        Returns the enumeration property value for the enum property that matches the provided enumPropertyName.
        If no match is found, EzExportReportTabId.UNKNOWN is returned.
        @returns {string}
        A valid EzExportReportTabId enumeration property value.
     */
    static ezValueOf(enumPropertyName) {
        let index = EzExportReportTabId.ezNames.indexOf(enumPropertyName);

        if (0 > index) {
            return EzExportReportTabId.UNKNOWN;
        }

        return EzExportReportTabId.ezValues[EzExportReportTabId.ezNames[index]];
    }
}

/**
    Controller for the employer or employee export dialog
    Import with:
        import { EzwEmployerExportTimeSheetDialog } from '/secure/widgets/EzExportReportDialog/ez-export-report-dialog.js';

        globalThis.ezApi.ezclocker[EzwEmployerExportTimeSheetDialog.ezApiName] &&
        globalThis.ezApi.ezclocker[EzwEmployerExportTimeSheetDialog.ezApiName].ready &&
 */
export class EzwEmployerExportTimeSheetDialog extends EzClass {
    /**
        @public @static @readonly @property
        Returns the name of this class's singleton instance when registered with ezApi.
        @returns {string}
     */
    static get ezApiName() {
        return 'ezwEmployerExportTimeSheetDialog';
    }

    /**
        @public @static @readonly @property
        Returns an object of event names that this class may trigger.
        @returns {object}
     */
    static get ezEventNames() {
        return {
            onReady: 'ezOn_EzwEmployerExportTimeSheetDialog_Ready',
            onExportDialogReady: 'ezOn_EzwEmployerExportTimeSheetDialog_Ready'
        };
    }

    /**
        @static
        @private @field
        Stores the singleton instance of this class that was created by and registerd with EzApi.
        @type {EzwEmployerExportTimeSheetDialog}
     */
    static #ezInstance = EzObject.hasProperty(globalThis, 'ezApi') &&
        EzObject.isValid(globalThis.ezApi) && EzBoolean.isTrue(globalThis.ezApi.ready) &&
        EzObject.isValid(globalThis.ezApi.ezclocker[EzwEmployerExportTimeSheetDialog.ezApiName])
        ? globalThis.ezApi.ezclocker[EzwEmployerExportTimeSheetDialog.ezApiName]
        : null;

    /**
        @public @static @getter @property
        Returns the singleton instance of this class that is registered with EzApi (if available yet)
        @param {EzwEmployerExportTimeSheetDialog}
     */
    static get ezInstance() {
        return EzwEmployerExportTimeSheetDialog.#ezInstance;
    }

    /**
        @public @static @getter @property
        Sets the singleton instance of of this class that is registered with EzApi.
        @param {EzwEmployerExportTimeSheetDialog} ezwEmployerExportTimeSheetDialog
     */
    static set ezInstance(ezwEmployerExportTimeSheetDialog) {
        if (null != EzwEmployerExportTimeSheetDialog.#ezInstance) {
            throw new Error('EzwEmployerExportTimeSheetDialog\'s singleton instance is already reigstered with EzApi.');
        }

        EzwEmployerExportTimeSheetDialog.#ezInstance = ezwEmployerExportTimeSheetDialog;
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
        EzObject.isValid(globalThis.ezApi.ezclocker[EzwEmployerExportTimeSheetDialog.ezApiName])
        ? EzRegistrationState.REGISTERED
        : null;

    /**
        @public @static @property @getter
        Returns the ezApi registration state of this classes's singleton instance.
        @returns {string}
        A valid enum property value from EzRegistrationState
     */
    static get ezApiRegistrationState() {
        return EzwEmployerExportTimeSheetDialog.#ezApiRegistrationState;
    }

    /**
        @public @static @property @setter
        Sets the ezApi registration state of this classes's singleton instance.
        @param {string} ezApiRegistrationState
        A valid enum property value from EzRegistrationState
     */
    static set ezApiRegistrationState(ezApiRegistrationState) {
        EzwEmployerExportTimeSheetDialog.#ezApiRegistrationState = EzRegistrationState.ezValueOf(ezApiRegistrationState);
    }


    /**
        @public @static @readonly @property
        Returns if all necessary dependences are ready and therefore it is ok for this class to
        register it's singleton instance with ezApi.
        @returns {boolean}
     */
    static get #ezCanRegister() {
        return EzRegistrationState.PENDING === EzwEmployerExportTimeSheetDialog.ezApiRegistrationState &&
            EzObject.hasProperty(globalThis, 'ezApi') &&
            EzObject.isValid(globalThis.ezApi) && EzBoolean.isTrue(globalThis.ezApi.ready) &&

            globalThis.ezApi.ezclocker[EzAnalyticsAndMetrics.ezApiName] &&
            globalThis.ezApi.ezclocker[EzAnalyticsAndMetrics.ezApiName].ready &&

            globalThis.ezApi.ezclocker[EzDateTime.ezApiName] &&
            globalThis.ezApi.ezclocker[EzDateTime.ezApiName].ready &&

            globalThis.ezApi.ezclocker[EzEventEngine.ezApiName] &&
            globalThis.ezApi.ezclocker[EzEventEngine.ezApiName].ready &&

            globalThis.ezApi.ezclocker[EzClockerContextEventName.ezApiName] &&
            globalThis.ezApi.ezclocker[EzClockerContextEventName.ezApiName].ready &&

            globalThis.ezApi.ezclocker[EzClockerContext.ezApiName] &&
            globalThis.ezApi.ezclocker[EzClockerContext.ezApiName].ready &&

            globalThis.ezApi.ezclocker[EzNavigation.ezApiName] &&
            globalThis.ezApi.ezclocker[EzNavigation.ezApiName].ready &&

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
        return null != EzwEmployerExportTimeSheetDialog.ezInstance &&
            EzRegistrationState.REGISTERED === EzwEmployerExportTimeSheetDialog.ezApiRegistrationState;
    }

    /**
        @private @static @method
        Attempts to register the singleton instance for this class with ezAp. Returns true
        if successful, false otherwise.
        @returns {boolean}
     */
    static #ezRegistrator() {
        if (EzwEmployerExportTimeSheetDialog.#ezCanRegister && !EzwEmployerExportTimeSheetDialog.#ezIsRegistered) {
            globalThis.ezApi.ezRegisterNewApi(EzwEmployerExportTimeSheetDialog, EzwEmployerExportTimeSheetDialog.ezApiName);
        }

        return EzRegistrationState.REGISTERED === EzwEmployerExportTimeSheetDialog.ezApiRegistrationState;
    }

    /**
        @static
        Static Initializer
     */
    static {
        if (!EzwEmployerExportTimeSheetDialog.#ezIsRegistered) {
            EzwEmployerExportTimeSheetDialog.ezApiRegistrationState = EzRegistrationState.PENDING;

            if (!EzwEmployerExportTimeSheetDialog.#ezRegistrator()) {
                document.addEventListener(
                    EzwEmployerExportTimeSheetDialog.ezOnEzApiReadyEventName,
                    EzwEmployerExportTimeSheetDialog.#ezRegistrator);

                document.addEventListener(
                    EzAnalyticsAndMetrics.ezEventNames.onReady,
                    EzwEmployerExportTimeSheetDialog.#ezRegistrator);

                document.addEventListener(
                    EzDateTime.ezEventNames.onReady,
                    EzwEmployerExportTimeSheetDialog.#ezRegistrator);

                document.addEventListener(
                    EzEventEngine.ezEventNames.onReady,
                    EzwEmployerExportTimeSheetDialog.#ezRegistrator);

                document.addEventListener(
                    EzClockerContextEventName.ezEventNames.onReady,
                    EzwEmployerExportTimeSheetDialog.#ezRegistrator);

                document.addEventListener(
                    EzClockerContext.ezEventNames.onReady,
                    EzwEmployerExportTimeSheetDialog.#ezRegistrator);

                document.addEventListener(
                    EzNavigation.ezEventNames.onReady,
                    EzwEmployerExportTimeSheetDialog.#ezRegistrator);

                document.addEventListener(
                    EzUI.ezEventNames.onReady,
                    EzwEmployerExportTimeSheetDialog.#ezRegistrator);

                document.addEventListener(
                    EzDialog.ezEventNames.onReady,
                    EzwEmployerExportTimeSheetDialog.#ezRegistrator);
            }
        }
    }

    /**
        @private @static @field
        Stores the generated help image uri
        @returns {string}
     */
    static #ezHelpImageUri = null;

    /**
        @public @static @readonly @proeprty
        @returns {string}
     */
    static get INCLUDE_DAY_TOTALS_DEFAULT_HINT() {
        return 'Include a time total for each day.';
    }

    /**
        @public @readonly @property
        Returns the help image uri
        @returns {string}
     */
    static get ezHelpImageUri() {
        if (null == EzwEmployerExportTimeSheetDialog.#ezHelpImageUri) {
            EzwEmployerExportTimeSheetDialog.#ezHelpImageUri = ezApi.ezclocker.ezNavigation.ezGetPublicImagesUrl('/public/images/info.svg');
        }

        return EzwEmployerExportTimeSheetDialog.#ezHelpImageUri;
    }

    /**
        @public @readonly @property
        Returns the help image's style data
        @returns {string}
     */
    static get ezHelpImageStyle() {
        return 'margin-left:4px;width:18px;height:18px';
    }

    /**
        @public @constructor
     */
    constructor() {
        super();
    }

    /**
        @private @field
        Stores if the Jobs tab restores the previous report option or not.
        Default is FALSE.
        @type {boolean}
     */
    #ezLoadPreviousJobSelection = false;

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
    ezEmployeeReports = new EzEmployeeReports();
    ezInternalEventHandlers = new EzExportEmployerReportEventHandlers();
    ezActiveTabId = null;
    ezActiveTab = null;
    ezEmployerReportOptionEventsHooked = false;
    activeExportMode = EzExportDialogMode.EMPLOYER;
    exportActionContext = {
        action: EzExportAction.EXPORT_SELECTED_EMPLOYEE
    };
    exportPeriod = {
        exportStartMoment: ezApi.ezclocker.ezDateTime.ezNowWithStartOfDay(),
        exportEndMoment: ezApi.ezclocker.ezDateTime.ezNowWithEndOfDay().add(13, 'days')
    };
    ezHasIntegrations = false;
    ezActiveIntegrations = null;

    /**
        @public @property @setter
        Returns if the dialog will load the previouslly selected Job report options or use the default.
        If true, the previous selection is loaded. If false false the default selection is used.
        @returns {boolean}
     */
    get ezLoadPreviousJobSelection() {
        return this.#ezLoadPreviousJobSelection;
    }

    /**
        @public @property @setter
        Sets if the dialog will load the previouslly selected Job report options or use the default
        Set true to load the previous selections, false to use the defaults.
        @param {boolean}
     */
    set ezLoadPreviousJobSelection(ezLoadPreviousJobSelection) {
        this.#ezLoadPreviousJobSelection = EzBoolean.isTrue(ezLoadPreviousJobSelection);
    }

    /**
        @public @readonly @property
        Returns an array of EzExportReportTabId enum property values in the order the
        tabs will display in the dialog.
        @returns {array}
     */
    get ezTabIds() {
        return [
            EzExportReportTabId.SELECTED_EMPLOYEE,
            EzExportReportTabId.ALL_EMPLOYEES,
            EzExportReportTabId.JOBS,
            EzExportReportTabId.INTEGRATIONS
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
        return 'EzExportTimeSheet';
    }

    /**
        @public @readonly @property
        Returns the dialog's content container id
        @returns {string}
     */
    get ezContentContainerId() {
        return 'EzExportTimeSheetDialogContentContainer';
    }

    /**
        @public @readonly @property
        Returns an object that contains commonly references html element ids for this dialog.
        @returns {object}
        Object format: {
            dialogId: <dialogId>
            containers: { <elementNameId: 'elementid' ... },
            inputs: { <elementNameId: 'elementid'... },
            buttons: { <elementNameId: 'elementid'... },
            images: { <elementNameId: 'elementid'... }
            <... other categories as needed>
        }
     */
    get ezIds() {
        return {
            dialogId: this.ezDialogId,
            containers: {

            },
            labels: {
                includeDayTotalsCheckboxLabelId: 'EzReportWithDailyTotalsLabel'
            },
            inputs: {
                totalsInDecimalFormatCheckboxId: 'EzReportWithDecimalTotals',
                timeIn24HourFormatCheckboxId: 'EzReportWith24hrTime',
                includeDayTotalsCheckboxId: 'EzReportWithDailyTotals',
                singleEmployeeExportFormatSelectId: 'EzEmployerExportTimeSheetDialog_FormatSelection',
                jobReportGroupByDateRadioBoxId: 'EzJobReport_GroupByDate',
                jobReportGroupByEmployeeRadioBoxId: 'EzJobReport_GroupByEmployee'
            },
            buttons: {

            },
            images: {
                includeDayTotalsCheckboxHelpImgId: 'EzReportWithDailyTotalsHelpImg'
            }
        }
    }

    /**
        @protected @method
        Initializes ezwEmployerExportTimeSheetDialog
        @returns {EzwEmployerExportTimeSheetDialog}
     */
    ezInit() {
        ezApi.ezclocker.ezEventEngine.ezRegisterEvent(
            EzwEmployerExportTimeSheetDialog.ezApiName,
            EzwEmployerExportTimeSheetDialog.ezEventNames.onExportDialogReady);

        EzwEmployerExportTimeSheetDialog.ezInstance.REPORTS_API_BASE_URI =
            ezApi.ezclocker.nav.ezGetInternalApiUrl('reports', 'v1');

        EzwEmployerExportTimeSheetDialog.ezInstance.EMPLOYEE_EXPORT_TIME_ENTRY_REPORT_URI =
            ezApi.ezclocker.nav.ezGetInternalApiUrl('reports/export/employee', 'v1');

        ezApi.ezclocker.ezEventEngine.ezWantEvent(
            EzClockerContextEventName.onUserContextReady,
            EzwEmployerExportTimeSheetDialog.ezApiName,
            EzwEmployerExportTimeSheetDialog.ezInstance.ezInitUX);

        // TODO: Fix amplitude
        //EzwEmployerExportTimeSheetDialog.ezInstance.amplitudeInstance = amplitude.getInstance();
        //EzwEmployerExportTimeSheetDialog.ezInstance.amplitudeInstance.init('63b4edbc4ad58e5fc414875544c4a3db');

        return EzwEmployerExportTimeSheetDialog.ezInstance;
    }

    /**
        @protected @method
        Initializes the dialog's UX
        @param {Function|null} exportCallback
     */
    ezInitUX() {
        EzwEmployerExportTimeSheetDialog.ezInstance.ezInitDialog();
    }

    /**
        @protected @method
        Initializes the dialog
     */
    ezInitDialog() {
        if (!ezApi.ezElementExists(EzwEmployerExportTimeSheetDialog.ezInstance.ezParentContainerId)) {
            ezApi.ezclocker.ezUi.ezAppendContent(
                'body',
                ezApi.ezTemplate`
                    <div id="${EzwEmployerExportTimeSheetDialog.ezInstance.ezParentContainerId}" style="display:none"></div>`);
        }

        ezApi.ezclocker.ezUi.ezAppendContent(
            EzwEmployerExportTimeSheetDialog.ezInstance.ezParentContainerId,
            EzwEmployerExportTimeSheetDialog.ezInstance.ezBuildExportReportDialogHTML());

        let dialogConfig = new EzDialogConfig(EzwEmployerExportTimeSheetDialog.ezInstance.ezDialogId);

        dialogConfig.width = 800;
        dialogConfig.height = 550;
        dialogConfig.buttons = [
            {
                id: 'EzExportDialog_ExportButton',
                text: 'Export',
                click: EzwEmployerExportTimeSheetDialog.ezInstance.exportTimeSheet
            },
            {
                id: 'EzExportDialog_CancelButton',
                text: 'Cancel',
                click: EzwEmployerExportTimeSheetDialog.ezInstance.ezClose
            }
        ];
        ezApi.ezclocker.ezDialog.ezInitDialogWithConfig(EzwEmployerExportTimeSheetDialog.ezInstance.ezDialogId, dialogConfig);

        EzwEmployerExportTimeSheetDialog.ezInstance.ezInitDialogControls()
            .then(
                () => ezApi.ezclocker.ezEventEngine.ezTriggerEvent(
                    EzwEmployerExportTimeSheetDialog.ezEventNames.onExportDialogReady,
                    EzwEmployerExportTimeSheetDialog.ezInstance));
    }

    /**
        @protected @method
        Starts initialization of the export dialog (mode not important at this point)
        @returns {Promise.resolve}
     */
    ezInitDialogControls() {
        return ezApi.ezAsyncAction(
            (finished) => {
                // Initialize any special controls for the employee mode
                return EzwEmployerExportTimeSheetDialog.ezInstance.ezInitEmployeeDialogControls()
                    // Initialize any special controls for the empoyer mode
                    .then(EzwEmployerExportTimeSheetDialog.ezInstance.ezInitEmployerDialogControls)
                    .then(finished);
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
                EzwEmployerExportTimeSheetDialog.ezInstance.ezInitDatePickers(
                    'EzEmployerExportTimeSheetDialog_StartDate',
                    'EzEmployerExportTimeSheetDialog_EndDate');

                ezApi.ezclocker.ezUi.ezId('_ExportOptions').buttonset();

                // Employer tab navigation
                ezApi.ezclocker.ezEventEngine.ezWantElementEvent(
                    EzwEmployerExportTimeSheetDialog.ezInstance.ezTabs[EzExportReportTabId.SELECTED_EMPLOYEE].id,
                    EzElementEventName.CLICK,
                    EzwEmployerExportTimeSheetDialog.ezApiName,
                    (ezEvent) => EzwEmployerExportTimeSheetDialog.ezInstance.ezInternalEventHandlers.handleShowSelectEmployeeTabClick(
                        ezEvent.data.elementEvent));

                ezApi.ezclocker.ezEventEngine.ezWantElementEvent(
                    EzwEmployerExportTimeSheetDialog.ezInstance.ezTabs[EzExportReportTabId.ALL_EMPLOYEES].id,
                    EzElementEventName.CLICK,
                    EzwEmployerExportTimeSheetDialog.ezApiName,
                    (ezEvent) => EzwEmployerExportTimeSheetDialog.ezInstance.ezInternalEventHandlers.handleShowAllEmployeesTabClick(
                        ezEvent.data.elementEvent));

                ezApi.ezclocker.ezEventEngine.ezWantElementEvent(
                    EzwEmployerExportTimeSheetDialog.ezInstance.ezTabs[EzExportReportTabId.JOBS].id,
                    EzElementEventName.CLICK,
                    EzwEmployerExportTimeSheetDialog.ezApiName,
                    (ezEvent) => EzwEmployerExportTimeSheetDialog.ezInstance.ezInternalEventHandlers.handleShowJobsClick(
                        ezEvent.data.elementEvent));

                ezApi.ezclocker.ezEventEngine.ezWantElementEvent(
                    EzwEmployerExportTimeSheetDialog.ezInstance.ezTabs[EzExportReportTabId.INTEGRATIONS].id,
                    EzElementEventName.CLICK,
                    EzwEmployerExportTimeSheetDialog.ezApiName,
                    (ezEvent) => EzwEmployerExportTimeSheetDialog.ezInstance.checkIntegrationOAuth(
                        ezEvent.data.elementEvent));

                ezApi.ezclocker.ezEventEngine.ezWantElementEvent(
                    'accountSetupIntegrationButton',
                    EzElementEventName.CLICK,
                    EzwEmployerExportTimeSheetDialog.ezApiName,
                    ezApi.ezclocker.nav.navigateToEmployerAccountPage);

                return finished();
            });
    }
	
	checkIntegrationOAuth(event) {
	    EzwEmployerExportTimeSheetDialog.ezInstance.ezInternalEventHandlers.handleIntegrationsClick(event);
		
        let selectedIntegration = ezApi.ezclocker.ezClockerContext.ezReadActiveAccountOption(
            ezApi.ezclocker.ezOptionsService.EZOPTION_SELECTED_INTEGRATION,
            'NONE');
		//TODO move this logic somewhere!!
		if (selectedIntegration == 'xQUICKBOOKS_ONLINE') {
			ezApi.ezclocker.http.ezGet(ezApi.ezclocker.nav.ezGetInternalApiUrl('integrations/qbo-integration', 'v1')) 
				.then(ezApi.ezclocker.ezServices.ezProcessApiResolve, ezApi.ezclocker.ezServices.ezProcessApiReject)
				.then(
					(response) => {
						let resp = new EzQBOIntegrationSetupResponse(response);
						let loggedInOAuth = resp.ezGetOath2SessionExists();
						if (! loggedInOAuth) {
							ezApi.ezclocker.ezDialog.ezShowError('Quickbooks',
								'You need to connect to QBO. Go to the Account page and click on Quickbooks Online.');
						}
					},
					(eResponse) => {
						ezApi.ezclocker.logger.error(
							ezApi.ezEM`
								Failed to get the existing QBO integration configuration.
								Error: ${ezApi.ezToJson(eResponse)}`);
					});		
		} else if (selectedIntegration == 'xGUSTO') {
			ezApi.ezclocker.http.ezGet(ezApi.ezclocker.nav.ezGetInternalApiUrl('integrations/gusto-integration', 'v1')) 
				.then(ezApi.ezclocker.ezServices.ezProcessApiResolve, ezApi.ezclocker.ezServices.ezProcessApiReject)
				.then(
					(response) => {
						let resp = new EzGustoIntegrationSetupResponse(response);
						let loggedInOAuth = resp.ezGetOath2SessionExists();
						if (! loggedInOAuth) {
							ezApi.ezclocker.ezDialog.ezShowError('Quickbooks',
								'You need to connect to Gusto. Go to the Account page and click on Gusto.');
						}
					},
					(eResponse) => {
						ezApi.ezclocker.logger.error(
							ezApi.ezEM`
								Failed to get the existing Gusto integration configuration.
								Error: ${ezApi.ezToJson(eResponse)}`);
					});		
		}
	
		
	}

    /**
        @protected @method
        Initialzies the Employee mode dialog inputs
        @param {moment} startMomentStartOfDay
        @param {moment} endMomentEndOfDay
        @returns {Promise.resolve}
     */
    ezInitEmployeeDialogControls() {
        return ezApi.ezAsyncAction(
            (finished) => {
                EzwEmployerExportTimeSheetDialog.ezInstance.ezInitDatePickers(
                    'EzEmployeeExportTimeSheetDialog_StartDate',
                    'EzEmployeeExportTimeSheetDialog_EndDate');
                return finished();
            });
    }

    /**
        @protected @method
        Initialilzes date pickers with the provided ids.
        @param {String} startPeriodDatePickerId
        @param {String} endPeriodDatePickerId
     */
    ezInitDatePickers(startPeriodDatePickerId, endPeriodDatePickerId) {
        if (!EzString.stringHasLength(startPeriodDatePickerId)) {
            throw new EzBadParamException(
                'startPeriodDatePickerId',
                EzwEmployerExportTimeSheetDialog.ezInstance,
                EzwEmployerExportTimeSheetDialog.ezInstance.ezInitDatePickers);
        }
        if (!EzString.stringHasLength(endPeriodDatePickerId)) {
            throw new EzBadParamException(
                'endPeriodDatePickerId',
                EzwEmployerExportTimeSheetDialog.ezInstance,
                EzwEmployerExportTimeSheetDialog.ezInstance.ezInitDatePickers);
        }

        ezApi.ezclocker.ezUi.ezId(startPeriodDatePickerId).datepicker({
            dateFormat: ezApi.ezclocker.ezDateTime.ezGetPreferredDatePickerFormat(),
            defaultDate: ezApi.ezclocker.ezDateTime.ezToJsDate(EzwEmployerExportTimeSheetDialog.ezInstance.ezGetStartPeriodMoment()),
            changeYear: true,
            changeMonth: true,
            buttonText: 'Select report start period...',
            showOn: 'button',
            onClick: ezApi.ezId(startPeriodDatePickerId).select,
        });

        ezApi.ezclocker.ezDateTime.ezSetDatePickerValueStartOfDay(
            startPeriodDatePickerId,
            EzwEmployerExportTimeSheetDialog.ezInstance.ezGetStartPeriodMoment());

        ezApi.ezclocker.ezUi.ezId(endPeriodDatePickerId).datepicker({
            dateFormat: ezApi.ezclocker.ezDateTime.ezGetPreferredDatePickerFormat(),
            defaultDate: ezApi.ezclocker.ezDateTime.ezToJsDate(EzwEmployerExportTimeSheetDialog.ezInstance.ezGetEndPeriodMoment()),
            constrainInput: true,
            changeYear: true,
            changeMonth: true,
            buttonText: 'Select report end period...',
            showOn: 'button',
            onClick: ezApi.ezId(endPeriodDatePickerId).select,
        });

        ezApi.ezclocker.ezDateTime.ezSetDatePickerValueEndOfDay(
            endPeriodDatePickerId,
            EzwEmployerExportTimeSheetDialog.ezInstance.ezGetEndPeriodMoment());

        EzwEmployerExportTimeSheetDialog.ezInstance.ezHookDatePickerEvents(startPeriodDatePickerId, endPeriodDatePickerId);
    }

    /**
        @protected @method
        Hooks date picker events
        @param {String} startPeriodDatePickerId
        @param {String} endPeriodDatePickerId
     */
    ezHookDatePickerEvents(startPeriodDatePickerId, endPeriodDatePickerId) {
        if (!EzString.stringHasLength(startPeriodDatePickerId)) {
            throw new EzBadParamException(
                'startPeriodDatePickerId',
                EzwEmployerExportTimeSheetDialog.ezInstance,
                EzwEmployerExportTimeSheetDialog.ezInstance.ezHookDatePickerEvents);
        }
        if (!EzString.stringHasLength(endPeriodDatePickerId)) {
            throw new EzBadParamException(
                'endPeriodDatePickerId',
                EzwEmployerExportTimeSheetDialog.ezInstance,
                EzwEmployerExportTimeSheetDialog.ezInstance.ezHookDatePickerEvents);
        }

        ezApi.ezclocker.ezEventEngine.ezWantElementEvent(
            startPeriodDatePickerId,
            EzElementEventName.CHANGE,
            EzwEmployerExportTimeSheetDialog.ezApiName,
            (event) => {
                event.ezStartPeriodDatePickerId = startPeriodDatePickerId;
                event.ezEndPeriodDatePickerId = endPeriodDatePickerId;
                EzwEmployerExportTimeSheetDialog.ezInstance.ezHandleStartDatePickerChange(event);
            });

        ezApi.ezclocker.ezEventEngine.ezWantElementEvent(
            endPeriodDatePickerId,
            EzElementEventName.CHANGE,
            EzwEmployerExportTimeSheetDialog.ezApiName,
            (event) => {
                event.ezStartPeriodDatePickerId = startPeriodDatePickerId;
                event.ezEndPeriodDatePickerId = endPeriodDatePickerId;
                EzwEmployerExportTimeSheetDialog.ezInstance.ezHandleEndDatePickerChange(event);
            });
    }

    /**
        @protected @method
        Un-Hooks date picker events
        @param {String} startPeriodDatePickerId
        @param {String} endPeriodDatePickerId
     */
    ezUnhookDatePickerEvents(startPeriodDatePickerId, endPeriodDatePickerId) {
        if (!EzString.stringHasLength(startPeriodDatePickerId)) {
            throw new EzBadParamException(
                'startPeriodDatePickerId',
                self,
                EzwEmployerExportTimeSheetDialog.ezInstance.ezUnhookDatePickerEvents);
        }
        if (!EzString.stringHasLength(endPeriodDatePickerId)) {
            throw new EzBadParamException(
                'endPeriodDatePickerId',
                self,
                EzwEmployerExportTimeSheetDialog.ezInstance.ezUnhookDatePickerEvents);
        }

        if (ezApi.ezclocker.ezUi.ezElementExists(startPeriodDatePickerId)) {
            ezApi.ezclocker.ezEventEngine.ezUnwantElementEvent(
                startPeriodDatePickerId,
                EzElementEventName.CHANGE,
                EzwEmployerExportTimeSheetDialog.ezApiName);
        }

        if (ezApi.ezclocker.ezUi.ezElementExists(endPeriodDatePickerId)) {
            ezApi.ezclocker.ezEventEngine.ezUnwantElementEvent(
                endPeriodDatePickerId,
                EzElementEventName.CHANGE,
                EzwEmployerExportTimeSheetDialog.ezApiName);
        }
    }

    /**
        @protected @method
        Handles the start date picker's change event
        @param {Object} event
     */
    ezHandleStartDatePickerChange(event) {
        if (!EzObject.isValid(event)) {
            throw new EzBadParamException(
                'event',
                EzwEmployerExportTimeSheetDialog.ezInstance,
                EzwEmployerExportTimeSheetDialog.ezInstance.ezHandleStartDatePickerChange);
        }
        if (!EzString.stringHasLength(event.ezStartPeriodDatePickerId)) {
            throw new EzBadParamException(
                'event.ezStartPeriodDatePickerId',
                EzwEmployerExportTimeSheetDialog.ezInstance,
                EzwEmployerExportTimeSheetDialog.ezInstance.ezHandleStartDatePickerChange);
        }
        if (!EzString.stringHasLength(event.ezEndPeriodDatePickerId)) {
            throw new EzBadParamException(
                'event.ezEndPeriodDatePickerId',
                EzwEmployerExportTimeSheetDialog.ezInstance,
                EzwEmployerExportTimeSheetDialog.ezInstance.ezHandleStartDatePickerChange);
        }

        let datePickerStartMoment =
            ezApi.ezclocker.ezDateTime.ezMomentFromDatePickerStartOfDay(event.ezStartPeriodDatePickerId);

        ezApi.ezclocker.ezDateTime.ezSetDatePickerMinDateStartOfDay(
            event.ezEndPeriodDatePickerId,
            ezApi.ezclocker.ezDateTime.ezMomentWithPTZ(datePickerStartMoment));

        if (ezApi.ezclocker.ezClockerContext.ezGetUserContext().isAdmin || ezApi.ezclocker.ezClockerContext.ezGetUserContext().isSupport) {
            // No restrictions applied to the period selections
            ezApi.ezclocker.ezUi.ezId(event.ezEndPeriodDatePickerId)
                .datepicker('option', 'maxDate', null);
        } else {
            ezApi.ezclocker.ezDateTime.ezSetDatePickerMaxDateEndOfDay(
                event.ezEndPeriodDatePickerId,
                ezApi.ezclocker.ezDateTime.ezMomentWithPTZ(datePickerStartMoment).add(60, 'days'));
        }

        let datePickerEndMoment =
            ezApi.ezclocker.ezDateTime.ezMomentFromDatePickerEndOfDay(event.ezEndPeriodDatePickerId);

        if (datePickerStartMoment.isAfter(datePickerEndMoment)) {
            ezApi.ezclocker.ezDateTime.ezSetDatePickerValueEndOfDay(
                event.ezEndPeriodDatePickerId,
                ezApi.ezclocker.ezDateTime.ezMomentWithPTZ(datePickerStartMoment));

            datePickerEndMoment =
                ezApi.ezclocker.ezDateTime.ezMomentFromDatePickerEndOfDay(event.ezEndPeriodDatePickerId);

            EzwEmployerExportTimeSheetDialog.ezInstance.ezSetEndPeriodMoment(datePickerEndMoment);
        }

        EzwEmployerExportTimeSheetDialog.ezInstance.ezSetStartPeriodMoment(datePickerStartMoment);
    }

    /**
        @protected @method
        Handles the end date picker's change event
        @param {Object} event
     */
    ezHandleEndDatePickerChange(event) {
        if (!EzObject.isValid(event)) {
            throw new EzBadParamException(
                'event',
                EzwEmployerExportTimeSheetDialog.ezInstance,
                EzwEmployerExportTimeSheetDialog.ezInstance.ezHandleEndDatePickerChange);
        }
        if (!EzString.stringHasLength(event.ezStartPeriodDatePickerId)) {
            throw new EzBadParamException(
                'event.ezStartPeriodDatePickerId',
                EzwEmployerExportTimeSheetDialog.ezInstance,
                EzwEmployerExportTimeSheetDialog.ezInstance.ezHandleEndDatePickerChange);
        }
        if (!EzString.stringHasLength(event.ezEndPeriodDatePickerId)) {
            throw new EzBadParamException(
                'event.ezEndPeriodDatePickerId',
                EzwEmployerExportTimeSheetDialog.ezInstance,
                EzwEmployerExportTimeSheetDialog.ezInstance.ezHandleEndDatePickerChange);
        }

        let datePickerStartMoment =
            ezApi.ezclocker.ezDateTime.ezMomentFromDatePickerStartOfDay(event.ezStartPeriodDatePickerId);

        let datePickerEndMoment =
            ezApi.ezclocker.ezDateTime.ezMomentFromDatePickerEndOfDay(event.ezEndPeriodDatePickerId);

        if (datePickerStartMoment.isAfter(datePickerEndMoment)) {
            ezApi.ezclocker.ezDialog.ezShowErrorDialog(
                'Period End Date Error',
                ezApi.ezEM`
                    The period end date must occure after the period start date of
                    ${ezApi.ezclocker.ezDateTime.ezToDisplayDate(datePickerStartMoment)}`)
                .then(
                    () => {
                        ezApi.ezclocker.ezDateTime.ezSetDatePickerValueEndOfDay(
                            event.ezEndPeriodDatePickerId,
                            EzwEmployerExportTimeSheetDialog.ezInstance.ezGetEndPeriodMoment());

                        datePickerEndMoment = ezApi.ezclocker.ezDateTime.ezMomentFromDatePickerEndOfDay(event.ezEndPeriodDatePickerId);

                        EzwEmployerExportTimeSheetDialog.ezInstance.ezSetEndPeriodMoment(
                            EzwEmployerExportTimeSheetDialog.ezInstance.ezGetEndPeriodMoment());
                    });
            return;
        }

        EzwEmployerExportTimeSheetDialog.ezInstance.ezSetEndPeriodMoment(datePickerEndMoment);
    }

    /**
        @protected @method
        Resets the dialog to its initial state.
     */
    ezResetDialog() {
        EzwEmployerExportTimeSheetDialog.ezInstance.activeEmployerId = EzObject.isValid(ezApi.ezclocker.ezClockerContext.ezGetActiveEmployer())
            ? ezApi.ezclocker.ezClockerContext.ezGetActiveEmployer().id
            : -1;

        EzwEmployerExportTimeSheetDialog.ezInstance.activeEmployeeId = EzObject.isValid(ezApi.ezclocker.ezClockerContext.ezGetActiveEmployee())
            ? ezApi.ezclocker.ezClockerContext.ezGetActiveEmployee().id
            : -1;

        ezApi.ezclocker.ezUi.ezHideElement('ezDateRangeError');

        ezApi.ezclocker.ezUi.ezSetCheckboxValue('EzRadioAllEmployeesByEmployee', true);

        ezApi.ezclocker.ezUi.ezSetCheckboxValue('EzRadioGroupByJob', true);
    }

    /**
        @protected @method
        Resets the dialog to it's initial state for an employer.
     */
    ezResetDialogForEmployer() {
        EzwEmployerExportTimeSheetDialog.ezInstance.ezResetDialog();

        EzwEmployerExportTimeSheetDialog.ezInstance.activeExportMode = EzExportDialogMode.EMPLOYER;

        ezApi.ezclocker.ezUi.ezId(EzwEmployerExportTimeSheetDialog.ezInstance.ezDialogId).dialog(
            'option',
            'height',
            550);

        ezApi.ezclocker.ezUi.ezId(EzwEmployerExportTimeSheetDialog.ezInstance.ezDialogId).dialog(
            'option',
            'title',
            'Export Time Entries');

        EzwEmployerExportTimeSheetDialog.ezInstance.ezShowExportModeUI();

        EzwEmployerExportTimeSheetDialog.ezInstance.ezLoadEmployerReportOptions()
            .then(
                () => {
                    EzwEmployerExportTimeSheetDialog.ezInstance.ezLoadAvailableEmployees();

                    ezApi.ezclocker.ezFeatureToggles.ezApplyViewFeatureToggles(
                        ezApi.ezclocker.ezEmployerDashboardController.ezFeatureViewName);

                    if (ezApi.ezIsFalse(
                        ezApi.ezclocker.ezClockerContext.ezActiveEmployerFeatureEnabled(EzClockerFeature.EZ_JOBS))) {
                        ezApi.ezclocker.ezUi.ezHideElement('EzEmployerExportTimeSheetDialog_Jobs');
                    }

                    EzwEmployerExportTimeSheetDialog.ezInstance.ezHookEmployerReportOptionEvents();
                });
    }

    /**
        @protected @method
        Resets the dialog to the initial state for an employee
     */
    ezResetDialogForEmployee() {
        EzwEmployerExportTimeSheetDialog.ezInstance.ezResetDialog();

        EzwEmployerExportTimeSheetDialog.ezInstance.activeExportMode = EzExportDialogMode.EMPLOYEE;

        EzwEmployerExportTimeSheetDialog.ezInstance.exportActionContext.action = EzExportAction.EXPORT_CURRENT_EMPLOYEE;

        ezApi.ezclocker.ezUi.ezId(EzwEmployerExportTimeSheetDialog.ezInstance.ezDialogId).dialog(
            'option',
            'height',
            300);

        ezApi.ezclocker.ezUi.ezId(EzwEmployerExportTimeSheetDialog.ezInstance.ezDialogId).dialog(
            'option',
            'title',
            'Export Your Time Entries');

        EzwEmployerExportTimeSheetDialog.ezInstance.ezShowExportModeUI();

        ezApi.ezclocker.ezFeatureToggles.ezApplyViewFeatureToggles(
            ezApi.ezclocker.ezEmployeeDashboardController.ezFeatureViewName);
    }

    /**
        @public @method
        Shows the export dialog in the specified mode.
        @param {EzExportDialogMode|String} ezExportDialogMode
        @param {moment} startMoment
        @param {moment} endMOment
        @param {EzExportAction|String|null} ezExportAction
     */
    ezShow(ezExportDialogMode, startMoment, endMoment, ezExportAction) {
        if (!EzString.stringHasLength(ezExportDialogMode)) {
            throw new EzBadParamException(
                'ezExportDialogMode',
                EzwEmployerExportTimeSheetDialog.ezInstance,
                EzwEmployerExportTimeSheetDialog.ezInstance.ezShow);
        }

        EzwEmployerExportTimeSheetDialog.ezInstance.activeExportMode = ezExportDialogMode;

        switch (EzwEmployerExportTimeSheetDialog.ezInstance.activeExportMode) {
            case EzExportDialogMode.EMPLOYER:
                EzwEmployerExportTimeSheetDialog.ezInstance.showDialog(startMoment, endMoment, ezExportAction);
                break;
            case EzExportDialogMode.EMPLOYEE:
                // Specifying the export action not supported for employee
                EzwEmployerExportTimeSheetDialog.ezInstance.showDialogForEmployee(startMoment, endMoment);
                break;
            case EzExportDialogMode.UNKNOWN:
            default:
                throw ezApi.ezException(
                    `Export dialog mode ${EzwEmployerExportTimeSheetDialog.ezInstance.activeExportMode} is currently not supported.`);
        }
    }

    /**
        @protected @method
        Shows the dialog for the employer mode
        @param {moment} startMoment
        @param {moment} endMoment
        @param {EzExportAction|String|null} ezExportAction
     */
    showDialog(startMoment, endMoment, ezExportAction) {
        EzwEmployerExportTimeSheetDialog.ezInstance.ezResetDialogForEmployer();

        if (EzObject.isValid(startMoment) && EzObject.isValid(endMoment)) {
            EzwEmployerExportTimeSheetDialog.ezInstance.ezSetExportPeriod(startMoment, endMoment);
        }

        EzwEmployerExportTimeSheetDialog.ezInstance.ezToggleLicenseFeatures(ezExportAction)
            .then(
                () => {

                    EzwEmployerExportTimeSheetDialog.ezInstance.exportActionContext.action = EzString.stringHasLength(ezExportAction)
                        ? ezExportAction
                        : EzExportAction.EXPORT_SELECTED_EMPLOYEE;

                    EzwEmployerExportTimeSheetDialog.ezInstance.ezShowDialogContentContainer();
                    EzwEmployerExportTimeSheetDialog.ezInstance.ezActivateTabForCurrentAction();
                    EzwEmployerExportTimeSheetDialog.ezInstance.ezHideDatePickerSelectButtons(
                        'EzEmployerExportTimeSheetDialog_StartDate',
                        'EzEmployerExportTimeSheetDialog_EndDate');

                    ezApi.ezclocker.ezDialog.ezShowDialog(EzwEmployerExportTimeSheetDialog.ezInstance.ezDialogId);
                });
    }

    /**
        @protected @method
        Toggles License features on/off in the UX
        @returns {Promise.resolve}
     */
    ezToggleLicenseFeatures() {
        return ezApi.ezAsyncAction(
            (finished) => {
                EzwEmployerExportTimeSheetDialog.ezInstance.ezHideTab(EzExportReportTabId.INTEGRATIONS);
                EzwEmployerExportTimeSheetDialog.ezInstance.ezHideTab(EzExportReportTabId.JOBS);

                if (EzBoolean.isFalse(ezApi.ezclocker.ezClockerContext.ezGetUserContext().isEmployee) &&
                    EzBoolean.isFalse(ezApi.ezclocker.ezClockerContext.ezGetUserContext().isPersonal)) {
                    if (0 <= ezApi.ezclocker.ezClockerContext.ezGetSelectedEmployerAccountSubscriptionPlanFeatures().indexOf('JOBS')) {
                        EzwEmployerExportTimeSheetDialog.ezInstance.ezShowTab(EzExportReportTabId.JOBS);
                    }

                    if (0 <= ezApi.ezclocker.ezClockerContext.ezGetSelectedEmployerAccountSubscriptionPlanFeatures().indexOf('INTEGRATIONS')) {
                        // Load integrations
                        return EzwEmployerExportTimeSheetDialog.ezInstance.ezLoadEmployerIntegrations()
                            .then(finished);
                    }
                }

                return finished();
            });
    }

    /**
        @protected @method
        Shows the dialog for employee dashboard
        @param {moment} startMoment
        @param {moment} endMoment
     */
    showDialogForEmployee(startMoment, endMoment) {
        EzwEmployerExportTimeSheetDialog.ezInstance.ezResetDialogForEmployee();

        if (EzObject.isValid(startMoment) && EzObject.isValid(endMoment)) {
            EzwEmployerExportTimeSheetDialog.ezInstance.ezSetExportPeriod(startMoment, endMoment);
        }

        ezApi.ezclocker.ezDialog.ezShowDialog(EzwEmployerExportTimeSheetDialog.ezInstance.ezDialogId).then(() => {
            EzwEmployerExportTimeSheetDialog.ezInstance.ezShowDialogContentContainer();
            EzwEmployerExportTimeSheetDialog.ezInstance.ezHideDatePickerSelectButtons(
                'EzEmployeeExportTimeSheetDialog_StartDate',
                'EzEmployeeExportTimeSheetDialog_EndDate');
            ezApi.ezclocker.ezUi.ezFocusElement('EzExportDialog_ExportButton');
        });
    }

    /**
        @public
        Closes the export time-sheet dialog
     */
    ezClose() {
        EzwEmployerExportTimeSheetDialog.ezInstance.ezHideDialogContentContainer();

        ezApi.ezclocker.ezDialog.ezCloseDialog(EzwEmployerExportTimeSheetDialog.ezInstance.ezDialogId);

        EzwEmployerExportTimeSheetDialog.ezInstance.ezHideExportModeUI();
    }

    /**
        @protected @method
        Hides the date pickers select buttons
        @param {String} startPeriodDatePickerId
        @param {String} endPeriodDatePickerId
     */
    ezHideDatePickerSelectButtons(startPeriodDatePickerId, endPeriodDatePickerId) {
        if (!EzString.stringHasLength(startPeriodDatePickerId)) {
            throw new EzBadParamException(
                'startPeriodDatePickerId',
                EzwEmployerExportTimeSheetDialog.ezInstance,
                EzwEmployerExportTimeSheetDialog.ezInstance.ezHideDatePickerSelectButtons);
        }
        if (!EzString.stringHasLength(endPeriodDatePickerId)) {
            throw new EzBadParamException(
                'endPeriodDatePickerId',
                EzwEmployerExportTimeSheetDialog.ezInstance,
                EzwEmployerExportTimeSheetDialog.ezInstance.ezHideDatePickerSelectButtons);
        }

        ezApi.ezclocker.ezUi.ezId(startPeriodDatePickerId).datepicker(
            'option',
            'buttonText',
            null);

        ezApi.ezclocker.ezUi.ezId(startPeriodDatePickerId).datepicker(
            'option',
            'showOn',
            'focus');

        ezApi.ezclocker.ezUi.ezId(endPeriodDatePickerId).datepicker(
            'option',
            'buttonText',
            null);

        ezApi.ezclocker.ezUi.ezId(endPeriodDatePickerId).datepicker(
            'option',
            'showOn',
            'focus');
    }

    /**
        @protected @method
        Shows the dialog's content container (all UX)
        @returns {Promise.resolve}
     */
    ezShowDialogContentContainer() {
        return ezApi.ezclocker.ezUi.ezShowElement(EzwEmployerExportTimeSheetDialog.ezInstance.ezContentContainerId);
    }

    /**
        @protected @method
        Hides the dialog's content container (all UX)
        @returns {Promise.resolve}
     */
    ezHideDialogContentContainer() {
        return ezApi.ezclocker.ezUi.ezHideElementAnimated(
            EzwEmployerExportTimeSheetDialog.ezInstance.ezContentContainerId);
    }

    /**
        @protected @method
        Sets the proper export dialog ui display-able based on the export mode
     */
    ezShowExportModeUI() {
        let showModeId = EzwEmployerExportTimeSheetDialog.ezInstance.activeExportMode === EzExportDialogMode.EMPLOYEE
            ? 'EzEMPLOYEE_EXPORT_MODE'
            : 'EzEMPLOYER_EXPORT_MODE';

        let hideModeId = EzwEmployerExportTimeSheetDialog.ezInstance.activeExportMode === EzExportDialogMode.EMPLOYEE
            ? 'EzEMPLOYER_EXPORT_MODE'
            : 'EzEMPLOYEE_EXPORT_MODE';

        ezApi.ezclocker.ezUi.ezHideElement(hideModeId);
        ezApi.ezclocker.ezUi.ezShowElement(showModeId);
    }

    /**
        @protected @method
        Hides all UX for all export modes.
     */
    ezHideExportModeUI() {
        ezApi.ezclocker.ezUi.ezHideElement('EzEMPLOYEE_EXPORT_MODE');
        ezApi.ezclocker.ezUi.ezHideElement('EzEMPLOYER_EXPORT_MODE');
    }

    /**
        @protected @method
        Loads the employer's active integrations
        @returns {Promise.resolve}
     */
    ezLoadEmployerIntegrations() {
        EzwEmployerExportTimeSheetDialog.ezInstance.ezHasIntegrations = false;

        EzwEmployerExportTimeSheetDialog.ezInstance.ezActiveIntegrations = null;

        return ezApi.ezclocker.ezUi.ezPageWaitAsync(
            'Loading available integrations ...',
            (waitDone, finished) => EzwEmployerExportTimeSheetDialog.ezInstance.ezUpdateAvailableIntegrationsSelect()
                .then(
                    () => {
                        EzwEmployerExportTimeSheetDialog.ezInstance.ezShowTab(EzExportReportTabId.INTEGRATIONS);

                        return waitDone().then(finished)
                    }));
    }

    /**
        @protected @method
        Gets and/or loads the available integrations for the active employer.
        @returns {Promise.resolve}
     */
    ezUpdateAvailableIntegrationsSelect() {
        return ezApi.ezAsyncAction(
            (finished) => {
                let employerIntegrations = ezApi.ezclocker.ezClockerContext.ezGetSelectedEmployerAccountActiveIntegrations();

                if (0 != employerIntegrations.errorCode) {
                    return ezApi.ezclocker.ezClockerContext.ezLoadSelectedEmployerAccountActiveIntegrations()
                        .then(
                            (response) => {
                                EzwEmployerExportTimeSheetDialog.ezInstance.ezHasIntegrations = EzArray.arrayHasLength(response.activeIntegrations);

                                EzwEmployerExportTimeSheetDialog.ezInstance.ezBuildAvailableIntegrationsSelectOptions(response);

                                return finished();
                            },
                            (eResponse) => {
                                ezApi.ezclocker.ezLogger.error(
                                    ezApi.ezEM`
                                        Failed to determine if the active employer has any integrations enabled.
                                        Error: ${ezApi.ezToJson(eResponse)}`);

                                EzwEmployerExportTimeSheetDialog.ezInstance.ezHasIntegrations = false;

                                EzwEmployerExportTimeSheetDialog.ezInstance.ezBuildAvailableIntegrationsSelectOptions(eResponse);

                                return finished();
                            });
                } else {
                    EzwEmployerExportTimeSheetDialog.ezInstance.ezBuildAvailableIntegrationsSelectOptions(employerIntegrations);

                    EzwEmployerExportTimeSheetDialog.ezInstance.ezHasIntegrations = EzArray.arrayHasLength(employerIntegrations.activeIntegrations);

                    return finished();
                }
            });
    }

    /**
        @protected @method
        Builds the HTML options for the active integrations selection box
        @param {Object} employerIntegrations
     */
    ezBuildAvailableIntegrationsSelectOptions(employerIntegrations) {
        if (!EzObject.isValid(employerIntegrations) ||
            !EzArray.arrayHasLength(employerIntegrations.activeIntegrations)) {
            // No integrations available
            ezApi.ezclocker.ezUi.ezContent(
                'options_integrations',
                EzwEmployerExportTimeSheetDialog.ezInstance.ezBuildIntegrationOptionHtml(
                    'NoIntegrations',
                    'NONE',
                    '[No Integrations Available]',
                    true));
            return;
        }

        let activeIntegrationOptions = EzwEmployerExportTimeSheetDialog.ezInstance.ezBuildIntegrationOptionHtml(
            'SelectAIntegration',
            'NONE',
            '[ Select a Integration ]',
            false);

        let selectedIntegration = ezApi.ezclocker.ezClockerContext.ezReadActiveAccountOption(
            ezApi.ezclocker.ezOptionsService.EZOPTION_SELECTED_INTEGRATION,
            'NONE');

        let sortedIntegrationNames = [];

        employerIntegrations.activeIntegrations.forEach(
            (employerIntegrationMap) => {
                if (EzObject.isValid(employerIntegrationMap.enabled)) {
                    let ezIntegrationProviderId = employerIntegrationMap.ezIntegrationProviderId;

                    if (EzIntegrationProviderId.UNKNOWN !== ezIntegrationProviderId &&
                        (EzIntegrationType.TIME_ENTRY_EXPORT === EzIntegrationProviderId.ezToEzIntegrationType(ezIntegrationProviderId) ||
                            EzIntegrationType.TIME_ENTRY_EXPORT_FILE === EzIntegrationProviderId.ezToEzIntegrationType(ezIntegrationProviderId))) {
                        sortedIntegrationNames.push({
                            name: EzIntegrationProviderId.ezToIntegrationProductName(ezIntegrationProviderId),
                            ezIntegrationProviderId: ezIntegrationProviderId,
                            employerIntegrationMapId: employerIntegrationMap.id,
                            selected: EzBoolean.isTrue(
                                1 === employerIntegrations.activeIntegrations.length ||
                                ezIntegrationProviderId === selectedIntegration ||
                                EzBoolean.isTrue(employerIntegrationMap.primaryIntegration))
                        });
                    }
                }
            });

        sortedIntegrationNames.sort(
            (integrationA, integrationB) => {
                if (integrationA.name === integrationB.name) {
                    return 0;
                }

                return integrationA.name > integrationB.name
                    ? 1
                    : -1;
            });

        sortedIntegrationNames.forEach(
            (integrationInfo) => {
                let optionHtml = EzwEmployerExportTimeSheetDialog.ezInstance.ezBuildIntegrationOptionHtml(
                    integrationInfo.employerIntegrationMapId,
                    integrationInfo.ezIntegrationProviderId,
                    integrationInfo.name,
                    integrationInfo.selected);

                activeIntegrationOptions = ezApi.ezTemplate`${activeIntegrationOptions}${optionHtml}`;
            });

        ezApi.ezclocker.ezUi.ezContent('options_integrations', activeIntegrationOptions);
    }

    /**
        @protected @method
        Builds the integration select option HTML tag
        @param {Number} id
        @param {String} value
        @param {String} display,
        @param {Boolean|null} isSelected
        @returns {String}
     */
    ezBuildIntegrationOptionHtml(id, value, display, isSelected) {
        if (!EzObject.isValid(id)) {
            throw new EzBadParamException(
                'id',
                EzwEmployerExportTimeSheetDialog.ezInstance,
                EzwEmployerExportTimeSheetDialog.ezInstance.ezBuildIntegrationOptionHtml);
        }
        if (!EzString.stringHasLength(display)) {
            throw new EzBadParamException(
                'display',
                EzwEmployerExportTimeSheetDialog.ezInstance,
                EzwEmployerExportTimeSheetDialog.ezInstance.ezBuildIntegrationOptionHtml);
        }

        let selected = EzBoolean.isTrue(isSelected)
            ? 'selected'
            : '';

        return ezApi.ezTemplate`
            <option
                id="${EzwEmployerExportTimeSheetDialog.ezInstance.ezDialogId}_${id}"
                value="${value}"
                ${selected}>
                ${display}
            </option>`;
    }

    /**
        @protected @method
        Sets the employer report options to any saved values
        @returns {Promise.resolve}
     */
    ezLoadEmployerReportOptions() {
        if (ezApi.ezclocker.ezClockerContext.ezGetUserContext().isPayrollManager) {
            return EzwEmployerExportTimeSheetDialog.ezInstance.ezLoadPayrollManagerReportOptions();
        } else if (ezApi.ezclocker.ezClockerContext.ezGetUserContext().isManager) {
            return EzwEmployerExportTimeSheetDialog.ezInstance.ezLoadManagerReportOptions();
        }

        // Using activeEmployer to allow this dialog to be shared outside of employer dashboard
        return ezApi.ezAsyncAction(
            (finished) => {
                // Use decimal totals option
                let value = ezApi.ezclocker.ezClockerContext.ezReadActiveEmployerOption(
                    EzEmployerOption.EZOPTION_USE_DECIMAL_TOTALS_IN_EXPORT_REPORTS,
                    '0');
                ezApi.ezclocker.ezUi.ezSetCheckboxValue(
                    EzwEmployerExportTimeSheetDialog.ezInstance.ezIds.inputs.totalsInDecimalFormatCheckboxId,
                    EzBoolean.isTrue(ezApi.ezclocker.ezOptionsService.ezOptionValueToBoolean(value)));

                // Day Totals
                value = ezApi.ezclocker.ezClockerContext.ezReadActiveEmployerOption(
                    EzEmployerOption.EZOPTION_SHOW_DAY_TOTALS_IN_EXPORT_REPORTS,
                    '1');
                ezApi.ezclocker.ezUi.ezSetCheckboxValue(
                    EzwEmployerExportTimeSheetDialog.ezInstance.ezIds.inputs.includeDayTotalsCheckboxId,
                    EzBoolean.isTrue(ezApi.ezclocker.ezOptionsService.ezOptionValueToBoolean(value)));

                // Use 24hr time option
                value = ezApi.ezclocker.ezClockerContext.ezReadActiveEmployerOption(
                    EzEmployerOption.EZOPTION_USE_24HOURTIME_IN_EXPORT_REPORTS,
                    '0');
                ezApi.ezclocker.ezUi.ezSetCheckboxValue(
                    EzwEmployerExportTimeSheetDialog.ezInstance.ezIds.inputs.timeIn24HourFormatCheckboxId,
                    EzBoolean.isTrue(ezApi.ezclocker.ezOptionsService.ezOptionValueToBoolean(value)));

                if (EzwEmployerExportTimeSheetDialog.ezInstance.ezLoadPreviousJobSelection) {
                    // Jobs report group by date
                    value = ezApi.ezclocker.ezClockerContext.ezReadActiveEmployerOption(
                        EzEmployerOption.EZOPTION_EMPLOYER_JOBS_REPORT_GROUP_BY_DATE,
                        '1');
                    ezApi.ezclocker.ezUi.ezSetRadioBoxValue(
                        EzwEmployerExportTimeSheetDialog.ezInstance.ezIds.inputs.jobReportGroupByDateRadioBoxId,
                        EzBoolean.isTrue(ezApi.ezclocker.ezOptionsService.ezOptionValueToBoolean(value)));

                    // Jobs report group by employee
                    value = ezApi.ezclocker.ezClockerContext.ezReadActiveEmployerOption(
                        EzEmployerOption.EZOPTION_EMPLOYER_JOBS_REPORT_GROUP_BY_EMPLOYEE,
                        '0');
                    ezApi.ezclocker.ezUi.ezSetRadioBoxValue(
                        EzwEmployerExportTimeSheetDialog.ezInstance.ezIds.inputs.jobReportGroupByEmployeeRadioBoxId,
                        EzBoolean.isTrue(ezApi.ezclocker.ezOptionsService.ezOptionValueToBoolean(value)));
                } else {
                    // Load default settings
                    ezApi.ezclocker.ezUi.ezSetRadioBoxValue(
                        EzwEmployerExportTimeSheetDialog.ezInstance.ezIds.inputs.jobReportGroupByEmployeeRadioBoxId,
                        false);

                    ezApi.ezclocker.ezUi.ezSetRadioBoxValue(
                        EzwEmployerExportTimeSheetDialog.ezInstance.ezIds.inputs.jobReportGroupByDateRadioBoxId,
                        true);
                }

                return finished();
            });
    }

    /**
        @protected @method
        Sets the employer report options to any saved values
        @returns {Promise.resolve}
     */
    ezLoadPayrollManagerReportOptions() {
        // Use decimal totals option
        return ezApi.ezAsyncAction(
            (finished) => {
                let value = ezApi.ezclocker.ezClockerContext.ezReadActiveAccountOption(
                    EzEmployerOption.EZOPTION_PAYROLL_MANAGER_USE_DECIMAL_TOTALS_IN_EXPORT_REPORTS,
                    '0');
                ezApi.ezclocker.ezUi.ezSetCheckboxValue(
                    EzwEmployerExportTimeSheetDialog.ezInstance.ezIds.inputs.totalsInDecimalFormatCheckboxId,
                    EzBoolean.isTrue(ezApi.ezclocker.ezOptionsService.ezOptionValueToBoolean(value)));

                // Day Totals
                value = ezApi.ezclocker.ezClockerContext.ezReadActiveEmployerOption(
                    EzEmployerOption.EZOPTION_PAYROLL_MANAGER_SHOW_DAY_TOTALS_IN_EXPORT_REPORTS,
                    '1');
                ezApi.ezclocker.ezUi.ezSetCheckboxValue(
                    EzwEmployerExportTimeSheetDialog.ezInstance.ezIds.inputs.includeDayTotalsCheckboxId,
                    EzBoolean.isTrue(ezApi.ezclocker.ezOptionsService.ezOptionValueToBoolean(value)));

                // Use 24hr time option
                value = ezApi.ezclocker.ezClockerContext.ezReadActiveAccountOption(
                    EzEmployerOption.EZOPTION_PAYROLL_MANAGER_USE_24HOURTIME_IN_EXPORT_REPORTS,
                    '0');
                ezApi.ezclocker.ezUi.ezSetCheckboxValue(
                    EzwEmployerExportTimeSheetDialog.ezInstance.ezIds.inputs.timeIn24HourFormatCheckboxId,
                    EzBoolean.isTrue(ezApi.ezclocker.ezOptionsService.ezOptionValueToBoolean(value)));

                // Jobs report group by date
                value = ezApi.ezclocker.ezClockerContext.ezReadActiveEmployerOption(
                    EzEmployerOption.EZOPTION_PAYROLL_MANAGER_JOBS_REPORT_GROUP_BY_DATE,
                    '1');
                ezApi.ezclocker.ezUi.ezSetRadioBoxValue(
                    EzwEmployerExportTimeSheetDialog.ezInstance.ezIds.inputs.jobReportGroupByDateRadioBoxId,
                    EzBoolean.isTrue(ezApi.ezclocker.ezOptionsService.ezOptionValueToBoolean(value)));

                // Jobs report group by employee
                value = ezApi.ezclocker.ezClockerContext.ezReadActiveEmployerOption(
                    EzEmployerOption.EZOPTION_PAYROLL_MANAGER_JOBS_REPORT_GROUP_BY_EMPLOYEE,
                    '0');
                ezApi.ezclocker.ezUi.ezSetRadioBoxValue(
                    EzwEmployerExportTimeSheetDialog.ezInstance.ezIds.inputs.jobReportGroupByEmployeeRadioBoxId,
                    EzBoolean.isTrue(ezApi.ezclocker.ezOptionsService.ezOptionValueToBoolean(value)));

                return finished();
            });
    }

    /**
        @protected @method
        Sets the employer report options to any saved values
        @returns {Promise.resolve}
     */
    ezLoadManagerReportOptions() {
        return ezApi.ezAsyncAction(
            (finished) => {
                // Use decimal totals option
                let value = ezApi.ezclocker.ezClockerContext.ezReadActiveAccountOption(
                    EzEmployerOption.EZOPTION_MANAGER_USE_DECIMAL_TOTALS_IN_EXPORT_REPORTS,
                    '0');
                ezApi.ezclocker.ezUi.ezSetCheckboxValue(
                    EzwEmployerExportTimeSheetDialog.ezInstance.ezIds.inputs.totalsInDecimalFormatCheckboxId,
                    EzBoolean.isTrue(ezApi.ezclocker.ezOptionsService.ezOptionValueToBoolean(value)));

                // Day Totals
                value = ezApi.ezclocker.ezClockerContext.ezReadActiveEmployerOption(
                    EzEmployerOption.EZOPTION_MANAGER_SHOW_DAY_TOTALS_IN_EXPORT_REPORTS,
                    '1');
                ezApi.ezclocker.ezUi.ezSetCheckboxValue(
                    EzwEmployerExportTimeSheetDialog.ezInstance.ezIds.inputs.includeDayTotalsCheckboxId,
                    EzBoolean.isTrue(ezApi.ezclocker.ezOptionsService.ezOptionValueToBoolean(value)));

                // Use 24hr time option
                value = ezApi.ezclocker.ezClockerContext.ezReadActiveAccountOption(
                    EzEmployerOption.EZOPTION_MANAGER_USE_24HOURTIME_IN_EXPORT_REPORTS,
                    '0');
                ezApi.ezclocker.ezUi.ezSetCheckboxValue(
                    EzwEmployerExportTimeSheetDialog.ezInstance.ezIds.inputs.timeIn24HourFormatCheckboxId,
                    EzBoolean.isTrue(ezApi.ezclocker.ezOptionsService.ezOptionValueToBoolean(value)));

                // Jobs report group by date
                value = ezApi.ezclocker.ezClockerContext.ezReadActiveEmployerOption(
                    EzEmployerOption.EZOPTION_MANAGER_JOBS_REPORT_GROUP_BY_DATE,
                    '1');
                ezApi.ezclocker.ezUi.ezSetRadioBoxValue(
                    EzwEmployerExportTimeSheetDialog.ezInstance.ezIds.inputs.jobReportGroupByDateRadioBoxId,
                    EzBoolean.isTrue(ezApi.ezclocker.ezOptionsService.ezOptionValueToBoolean(value)));

                // Jobs report group by employee
                value = ezApi.ezclocker.ezClockerContext.ezReadActiveEmployerOption(
                    EzEmployerOption.EZOPTION_MANAGER_JOBS_REPORT_GROUP_BY_EMPLOYEE,
                    '0');
                ezApi.ezclocker.ezUi.ezSetRadioBoxValue(
                    EzwEmployerExportTimeSheetDialog.ezInstance.ezIds.inputs.jobReportGroupByEmployeeRadioBoxId,
                    EzBoolean.isTrue(ezApi.ezclocker.ezOptionsService.ezOptionValueToBoolean(value)));

                return finished();
            });
    }

    /**
        @protected @method
        Loads the employee dialog with any saved report options
        @returns {Promise.resolve}
     */
    ezLoadEmployeeReportOptions() {
        return ezApi.ezResolver(
            (resolve) => ezApi.ezclocker.ezOptionsService.readEmployerOptionList(EzwEmployerExportTimeSheetDialog.ezInstance.activeEmployerId)
                .then(
                    (response) => {
                        for (let index in response) {
                            let option = response[index].employerOption;
                            ezApi.ezclocker.ezOptionsService.ezSetEmployeeOption(option.optionName, option.optionValue);
                        }
                        ezApi.ezclocker.ezUi.ezSetCheckboxValue(
                            '_ReportWithDecimalTotals',
                            ezApi.ezclocker.ezOptionsService.ezGetEmployeeOption(
                                EzEmployerOption.EZOPTION_EMPLOYEE_USE_DECIMAL_TOTALS_IN_EXPORT_REPORTS,
                                false));
                        ezApi.ezclocker.ezUi.ezSetCheckboxValue(
                            '_ReportWith24hrTime',
                            ezApi.ezclocker.ezOptionsService.ezGetEmployeeOption(
                                EzEmployerOption.EZOPTION_EMPLOYEE_USE_DECIMAL_TOTALS_IN_EXPORT_REPORTS,
                                false));
                        return resolve();
                    },
                    () => {
                        ezApi.ezclocker.ezUi.ezSetCheckboxValue(
                            '_ReportWithDecimalTotals',
                            false);
                        ezApi.ezclocker.ezUi.ezSetCheckboxValue(
                            '_ReportWith24hrTime',
                            false);
                    }));
    }

    /**
        @protected @method
        Saves the selected employer report options
        @returns {Promise.resolve}
     */
    ezSaveEmployerReportOptions() {
        if (ezApi.ezclocker.ezClockerContext.ezGetUserContext().isAdmin ||
            ezApi.ezclocker.ezClockerContext.ezGetUserContext().isSupport) {
            // Do not save options if admin or support
            return Promise.resolve();
        }

        if (ezApi.ezclocker.ezClockerContext.ezGetUserContext().isPayrollManager) {
            return EzwEmployerExportTimeSheetDialog.ezInstance.ezSavePayrollManagerReportOptions();
        } else if (ezApi.ezclocker.ezClockerContext.ezGetUserContext().isManager) {
            return EzwEmployerExportTimeSheetDialog.ezInstance.ezSaveManagerReportOptions();
        }

        return ezApi.ezAsyncAction(
            (finished) => ezApi.ezclocker.ezClockerContext.ezSaveSelectedEmployerOption(
                EzEmployerOption.EZOPTION_USE_DECIMAL_TOTALS_IN_EXPORT_REPORTS,
                EzBoolean.isTrue(
                    ezApi.ezclocker.ezUi.ezIsCheckBoxChecked(
                        EzwEmployerExportTimeSheetDialog.ezInstance.ezIds.inputs.totalsInDecimalFormatCheckboxId))
                    ? '1'
                    : '0')
                .then(
                    () => ezApi.ezclocker.ezClockerContext.ezSaveSelectedEmployerOption(
                        EzEmployerOption.EZOPTION_USE_24HOURTIME_IN_EXPORT_REPORTS,
                        EzBoolean.isTrue(
                            ezApi.ezclocker.ezUi.ezIsCheckBoxChecked(
                                EzwEmployerExportTimeSheetDialog.ezInstance.ezIds.inputs.timeIn24HourFormatCheckboxId))
                            ? '1'
                            : '0')
                        .then(
                            () => ezApi.ezclocker.ezClockerContext.ezSaveSelectedEmployerOption(
                                EzEmployerOption.EZOPTION_SHOW_DAY_TOTALS_IN_EXPORT_REPORTS,
                                EzBoolean.isTrue(
                                    ezApi.ezclocker.ezUi.ezIsCheckBoxChecked(
                                        EzwEmployerExportTimeSheetDialog.ezInstance.ezIds.inputs.includeDayTotalsCheckboxId))
                                    ? '1'
                                    : '0')
                                .then(
                                    () => ezApi.ezclocker.ezClockerContext.ezSaveSelectedEmployerOption(
                                        EzEmployerOption.EZOPTION_JOBS_REPORT_GROUP_BY_DATE,
                                        EzBoolean.isTrue(
                                            ezApi.ezclocker.ezUi.ezIsRadioBoxChecked(
                                                EzwEmployerExportTimeSheetDialog.ezInstance.ezIds.inputs.jobReportGroupByDateRadioBoxId))
                                            ? '1'
                                            : '0')
                                        .then(
                                            () => ezApi.ezclocker.ezClockerContext.ezSaveSelectedEmployerOption(
                                                EzEmployerOption.EZOPTION_JOBS_REPORT_GROUP_BY_EMPLOYEE,
                                                EzBoolean.isTrue(
                                                    ezApi.ezclocker.ezUi.ezIsRadioBoxChecked(
                                                        EzwEmployerExportTimeSheetDialog.ezInstance.ezIds.inputs.jobReportGroupByEmployeeRadioBoxId))
                                                    ? '1'
                                                    : '0')
                                                .then(
                                                    finished,
                                                    (eResponse) => EzwEmployerExportTimeSheetDialog.ezInstance.ezHandleSaveOptionError(
                                                        EzEmployerOption.EZOPTION_JOBS_REPORT_GROUP_BY_EMPLOYEE,
                                                        eResponse,
                                                        finished)),
                                            (eResponse) => EzwEmployerExportTimeSheetDialog.ezInstance.ezHandleSaveOptionError(
                                                EzEmployerOption.EZOPTION_JOBS_REPORT_GROUP_BY_DATE,
                                                eResponse,
                                                finished)),
                                    (eResponse) => EzwEmployerExportTimeSheetDialog.ezInstance.ezHandleSaveOptionError(
                                        EzEmployerOption.EZOPTION_SHOW_DAY_TOTALS_IN_EXPORT_REPORTS,
                                        eResponse,
                                        finished)),
                            (eResponse) => EzwEmployerExportTimeSheetDialog.ezInstance.ezHandleSaveOptionError(
                                EzEmployerOption.EZOPTION_USE_24HOURTIME_IN_EXPORT_REPORTS,
                                eResponse,
                                finished)),
                    (eResponse) => EzwEmployerExportTimeSheetDialog.ezInstance.ezHandleSaveOptionError(
                        EzEmployerOption.EZOPTION_USE_DECIMAL_TOTALS_IN_EXPORT_REPORTS,
                        eResponse,
                        finished)));
    }

    /**
        @protected @method
        Saves the payroll manager account report options
        @returns {Promise.resolve}
     */
    ezSavePayrollManagerReportOptions() {
        if (ezApi.ezclocker.ezClockerContext.ezGetUserContext().isAdmin ||
            ezApi.ezclocker.ezClockerContext.ezGetUserContext().isSupport) {
            // Do not save options if admin or support
            return Promise.resolve();
        }

        return ezApi.ezAsyncAction(
            (finished) => ezApi.ezclocker.ezClockerContext.ezSaveActiveAccountOption(
                EzEmployerOption.EZOPTION_PAYROLL_MANAGER_USE_DECIMAL_TOTALS_IN_EXPORT_REPORTS,
                EzBoolean.isTrue(ezUi.ezIsCheckBoxChecked(EzwEmployerExportTimeSheetDialog.ezInstance.ezIds.inputs.totalsInDecimalFormatCheckboxId))
                    ? '1'
                    : '0')
                .then(
                    () => ezApi.ezclocker.ezClockerContext.ezSaveActiveAccountOption(
                        EzEmployerOption.EZOPTION_PAYROLL_MANAGER_USE_24HOURTIME_IN_EXPORT_REPORTS,
                        EzBoolean.isTrue(ezUi.ezIsCheckBoxChecked(EzwEmployerExportTimeSheetDialog.ezInstance.ezIds.inputs.timeIn24HourFormatCheckboxId))
                            ? '1'
                            : '0')
                        .then(
                            () => ezApi.ezclocker.ezClockerContext.ezSaveSelectedEmployerOption(
                                EzEmployerOption.EZOPTION_PAYROLL_MANAGER_SHOW_DAY_TOTALS_IN_EXPORT_REPORTS,
                                EzBoolean.isTrue(ezUi.ezIsCheckBoxChecked(EzwEmployerExportTimeSheetDialog.ezInstance.ezIds.inputs.includeDayTotalsCheckboxId))
                                    ? '1'
                                    : '0')
                                .then(
                                    () => ezApi.ezclocker.ezClockerContext.ezSaveSelectedEmployerOption(
                                        EzEmployerOption.EZOPTION_PAYROLL_MANAGER_JOBS_REPORT_GROUP_BY_DATE,
                                        EzBoolean.isTrue(
                                            ezApi.ezclocker.ezUi.ezIsRadioBoxChecked(
                                                EzwEmployerExportTimeSheetDialog.ezInstance.ezIds.inputs.jobReportGroupByDateRadioBoxId))
                                            ? '1'
                                            : '0')
                                        .then(
                                            () => ezApi.ezclocker.ezClockerContext.ezSaveSelectedEmployerOption(
                                                EzEmployerOption.EZOPTION_PAYROLL_MANAGER_JOBS_REPORT_GROUP_BY_EMPLOYEE,
                                                EzBoolean.isTrue(
                                                    ezApi.ezclocker.ezUi.ezIsRadioBoxChecked(
                                                        EzwEmployerExportTimeSheetDialog.ezInstance.ezIds.inputs.jobReportGroupByEmployeeRadioBoxId))
                                                    ? '1'
                                                    : '0')
                                                .then(
                                                    finished,
                                                    (eResponse) => EzwEmployerExportTimeSheetDialog.ezInstance.ezHandleSaveOptionError(
                                                        EzEmployerOption.EZOPTION_PAYROLL_MANAGER_JOBS_REPORT_GROUP_BY_EMPLOYEE,
                                                        eResponse,
                                                        finished)),
                                            (eResponse) => EzwEmployerExportTimeSheetDialog.ezInstance.ezHandleSaveOptionError(
                                                EzEmployerOption.EZOPTION_PAYROLL_MANAGER_JOBS_REPORT_GROUP_BY_DATE,
                                                eResponse,
                                                finished)),
                                    (eResponse) => EzwEmployerExportTimeSheetDialog.ezInstance.ezHandleSaveOptionError(
                                        EzEmployerOption.EZOPTION_PAYROLL_MANAGER_SHOW_DAY_TOTALS_IN_EXPORT_REPORTS,
                                        eResponse,
                                        finished)),
                            (eResponse) => EzwEmployerExportTimeSheetDialog.ezInstance.ezHandleSaveOptionError(
                                EzEmployerOption.EZOPTION_PAYROLL_MANAGER_USE_24HOURTIME_IN_EXPORT_REPORTS,
                                eResponse,
                                finished)),
                    (eResponse) => EzwEmployerExportTimeSheetDialog.ezInstance.ezHandleSaveOptionError(
                        EzEmployerOption.EZOPTION_PAYROLL_MANAGER_USE_DECIMAL_TOTALS_IN_EXPORT_REPORTS,
                        eResponse,
                        finished)));
    }

    /**
        @protected @method
        Saves the manager account report options
        @returns {Promise.resolve}
     */
    ezSaveManagerReportOptions() {
        if (ezApi.ezclocker.ezClockerContext.ezGetUserContext().isAdmin ||
            ezApi.ezclocker.ezClockerContext.ezGetUserContext().isSupport) {
            // Do not save options if admin or support
            return Promise.resolve();
        }

        return ezApi.ezAsyncAction(
            (finished) => ezApi.ezclocker.ezClockerContext.ezSaveActiveAccountOption(
                EzEmployerOption.EZOPTION_MANAGER_USE_DECIMAL_TOTALS_IN_EXPORT_REPORTS,
                EzBoolean.isTrue(ezUi.ezIsCheckBoxChecked(EzwEmployerExportTimeSheetDialog.ezInstance.ezIds.inputs.totalsInDecimalFormatCheckboxId))
                    ? '1'
                    : '0')
                .then(
                    () => ezApi.ezclocker.ezClockerContext.ezSaveActiveAccountOption(
                        EzEmployerOption.EZOPTION_MANAGER_USE_24HOURTIME_IN_EXPORT_REPORTS,
                        EzBoolean.isTrue(ezUi.ezIsCheckBoxChecked(EzwEmployerExportTimeSheetDialog.ezInstance.ezIds.inputs.timeIn24HourFormatCheckboxId))
                            ? '1'
                            : '0')
                        .then(
                            () => ezApi.ezclocker.ezClockerContext.ezSaveSelectedEmployerOption(
                                EzEmployerOption.EZOPTION_MANAGER_SHOW_DAY_TOTALS_IN_EXPORT_REPORTS,
                                EzBoolean.isTrue(ezUi.ezIsCheckBoxChecked(EzwEmployerExportTimeSheetDialog.ezInstance.ezIds.inputs.includeDayTotalsCheckboxId))
                                    ? '1'
                                    : '0')
                                .then(
                                    () => ezApi.ezclocker.ezClockerContext.ezSaveSelectedEmployerOption(
                                        EzEmployerOption.EZOPTION_MANAGER_JOBS_REPORT_GROUP_BY_DATE,
                                        EzBoolean.isTrue(
                                            ezApi.ezclocker.ezUi.ezIsRadioBoxChecked(
                                                EzwEmployerExportTimeSheetDialog.ezInstance.ezIds.inputs.jobReportGroupByDateRadioBoxId))
                                            ? '1'
                                            : '0')
                                        .then(
                                            () => ezApi.ezclocker.ezClockerContext.ezSaveSelectedEmployerOption(
                                                EzEmployerOption.EZOPTION_MANAGER_JOBS_REPORT_GROUP_BY_EMPLOYEE,
                                                EzBoolean.isTrue(
                                                    ezApi.ezclocker.ezUi.ezIsRadioBoxChecked(
                                                        EzwEmployerExportTimeSheetDialog.ezInstance.ezIds.inputs.jobReportGroupByEmployeeRadioBoxId))
                                                    ? '1'
                                                    : '0')
                                                .then(
                                                    finished,
                                                    (eResponse) => EzwEmployerExportTimeSheetDialog.ezInstance.ezHandleSaveOptionError(
                                                        EzEmployerOption.EZOPTION_MANAGER_JOBS_REPORT_GROUP_BY_EMPLOYEE,
                                                        eResponse,
                                                        finished)),
                                            (eResponse) => EzwEmployerExportTimeSheetDialog.ezInstance.ezHandleSaveOptionError(
                                                EzEmployerOption.EZOPTION_MANAGER_JOBS_REPORT_GROUP_BY_DATE,
                                                eResponse,
                                                finished)),
                                    (eResponse) => EzwEmployerExportTimeSheetDialog.ezInstance.ezHandleSaveOptionError(
                                        EzEmployerOption.EZOPTION_MANAGER_SHOW_DAY_TOTALS_IN_EXPORT_REPORTS,
                                        eResponse,
                                        finished)),
                            (eResponse) => EzwEmployerExportTimeSheetDialog.ezInstance.ezHandleSaveOptionError(
                                EzEmployerOption.EZOPTION_MANAGER_USE_24HOURTIME_IN_EXPORT_REPORTS,
                                eResponse,
                                finished)),
                    (eResponse) => EzwEmployerExportTimeSheetDialog.ezInstance.ezHandleSaveOptionError(
                        EzEmployerOption.EZOPTION_MANAGER_USE_DECIMAL_TOTALS_IN_EXPORT_REPORTS,
                        eResponse,
                        finished)));
    }

    /**
        @protected @method
        Handles save option error responses
        @param {string} reportOptionName
        @param {object} eResponse
        @param {function} finished
        @returns {Promise.resolve}
     */
    ezHandleSaveOptionError(reportOptionName, eResponse, finished) {
        if (!EzString.stringHasLength(reportOptionName)) {
            throw new EzBadParamException(
                'reportOptionName',
                EzwEmployerExportTimeSheetDialog.ezInstance,
                EzwEmployerExportTimeSheetDialog.ezInstance.ezHandleOptionSaveError);
        }
        if (!EzFunction.isFunction(finished)) {
            throw new EzBadParamException(
                'finished',
                EzwEmployerExportTimeSheetDialog.ezInstance,
                EzwEmployerExportTimeSheetDialog.ezInstance.ezHandleOptionSaveError);
        }

        ezApi.ezclocker.ezLogger.error(
            ezApi.ezEM`
                Unable to save employer report option "${reportOptionName}".
                Error: ${ezApi.ezToJson(eResponse)}`);

        return finished();
    }

    /**
        @protected @method
        Saves the employee report options as set in the dialog.
        @returns {Promise.resolve}
     */
    ezSaveEmployeeReportOptions() {
        if (ezApi.ezclocker.ezClockerContext.ezGetUserContext().isAdmin ||
            ezApi.ezclocker.ezClockerContext.ezGetUserContext().isSupport) {
            // Do not save options if admin or support
            return Promise.resolve();
        }

        return ezApi.ezResolve(
            (resolve) => ezApi.ezclocker.ezOptionsService.ezSaveEmployeeOption(
                EzwEmployerExportTimeSheetDialog.ezInstance.activeEmployerId,
                EzwEmployerExportTimeSheetDialog.ezInstance.activeEmployeeId,
                EzEmployerOption.EZOPTION_EMPLOYEE_USE_DECIMAL_TOTALS_IN_EXPORT_REPORTS,
                false)
                .then(
                    () => ezApi.ezclocker.ezOptionsService.saveEmployeeOption(
                        EzwEmployerExportTimeSheetDialog.ezInstance.activeEmployerId,
                        EzwEmployerExportTimeSheetDialog.ezInstance.employeeId,
                        EzEmployerOption.EZOPTION_EMPLOYEE_USE_24HOURTIME_IN_EXPORT_REPORTS,
                        false)
                        .then(
                            resolve,
                            (eResponse, jqXHR) => EzwEmployerExportTimeSheetDialog.ezInstance.ezShowSaveEmployeeOptionError(
                                eResponse,
                                jqXHR,
                                EzEmployerOption.EZOPTION_EMPLOYEE_USE_24HOURTIME_IN_EXPORT_REPORTS)
                                .then(resolve)),
                    (eResponse, jqXHR) => EzwEmployerExportTimeSheetDialog.ezInstance.ezShowSaveEmployeeOptionError(
                        eResponse,
                        jqXHR,
                        EzEmployerOption.EZOPTION_EMPLOYEE_USE_DECIMAL_TOTALS_IN_EXPORT_REPORTS)
                        .then(resolve)));
    }

    /**
        @protected @method
        Shows the failure to save an employee option dialog
        @returns {Promise.resolve}
     */
    ezShowSaveEmployeeOptionError(eResponse, jqXHR, ezEmployerOption) {
        let eResponseMsg = EzString.stringHasLength(eResponse.getMessage())
            ? eResponse.getMessage()
            : 'Unexpected service error';

        let errorCode = EzObject.isValid(eResponse.getErrorCode())
            ? `Error code: ${eResponse.getErrorCode()}`
            : '';

        let additionalDetails = ezApi.ezEM`
            ${eResponseMsg}
            ${errorCode}
            Response data:
            ${ezApi.ezToJson(eResponse)}`;

        ezApi.ezclocker.ezLogger.error(
            ezApi.ezTemplate`
                Unable to save the employee option
                ${ezEmployerOption}.
                Error: ${ezApi.ezToJson(eResponse)}`);

        return ezApi.ezclocker.ezDialog.ezShowPossibleDefectError(
            'Save Report Options Error',
            'Unable to save your selected report options at this time.',
            jqXHR,
            ezApi.ezEM`
                Failed to save report option
                ${ezEmployerOption}.
                ${additionalDetails}`,
            ezApi.ezclocker.ezOptionsService.ezBuildPersistEmployerOptionUrl(
                EzwEmployerExportTimeSheetDialog.ezInstance.activeEmployerId,
                ezEmployerOption));
    }

    /**
        @protected @method
        Hooks the report option ifChecked events
     */
    ezHookEmployerReportOptionEvents() {
        if (EzwEmployerExportTimeSheetDialog.ezInstance.activeExportMode === EzExportDialogMode.EMPLOYER) {
            ezApi.ezclocker.ezEventEngine.ezWantElementEvent(
                'EzRadioAllEmployeesByEmployee',
                EzElementEventName.CHANGE,
                EzwEmployerExportTimeSheetDialog.ezApiName,
                EzwEmployerExportTimeSheetDialog.ezInstance.ezHandleEzRadioAllEmployeesByEmployeeOnChange);

            ezApi.ezclocker.ezEventEngine.ezWantElementEvent(
                'EzRadioAllEmployeesByDate',
                EzElementEventName.CHANGE,
                EzwEmployerExportTimeSheetDialog.ezApiName,
                EzwEmployerExportTimeSheetDialog.ezInstance.ezHandleEzRadioAllEmployeesByDateOnChange);

            ezApi.ezclocker.ezEventEngine.ezWantElementEvent(
                'EzRadioAllEmployeesSummary',
                EzElementEventName.CHANGE,
                EzwEmployerExportTimeSheetDialog.ezApiName,
                EzwEmployerExportTimeSheetDialog.ezInstance.ezHandleEzRadioAllEmployeesSummaryOnChange);

            // All employees report use decimal totals option
            ezApi.ezclocker.ezEventEngine.ezWantElementEvent(
                EzwEmployerExportTimeSheetDialog.ezInstance.ezIds.inputs.totalsInDecimalFormatCheckboxId,
                EzElementEventName.CHANGE,
                EzwEmployerExportTimeSheetDialog.ezApiName,
                EzwEmployerExportTimeSheetDialog.ezInstance.ezOnExportWithDecimalTotalsCheckboxChanged);

            ezApi.ezclocker.ezEventEngine.ezWantElementEvent(
                EzwEmployerExportTimeSheetDialog.ezInstance.ezIds.inputs.includeDayTotalsCheckboxId,
                EzElementEventName.CHANGE,
                EzwEmployerExportTimeSheetDialog.ezApiName,
                EzwEmployerExportTimeSheetDialog.ezInstance.ezOnExportWithDailyTotalsCheckboxChanged);

            // All employees report use 24hr time option
            ezApi.ezclocker.ezEventEngine.ezWantElementEvent(
                EzwEmployerExportTimeSheetDialog.ezInstance.ezIds.inputs.timeIn24HourFormatCheckboxId,
                EzElementEventName.CHANGE,
                EzwEmployerExportTimeSheetDialog.ezApiName,
                EzwEmployerExportTimeSheetDialog.ezInstance.ezOnExportWith24hrTimeCheckboxChanged);

            ezApi.ezclocker.ezEventEngine.ezWantElementEvent(
                EzwEmployerExportTimeSheetDialog.ezInstance.ezIds.inputs.singleEmployeeExportFormatSelectId,
                EzElementEventName.CHANGE,
                EzwEmployerExportTimeSheetDialog.ezApiName,
                EzwEmployerExportTimeSheetDialog.ezInstance.ezOnEzEmployerExportTimeSheetDialogFormatSelectionSelectChanged);

            EzwEmployerExportTimeSheetDialog.ezInstance.ezEmployerReportOptionEventsHooked = true;
        }
    }

    /**
        @protected @method
        Loads the available employees into the employee select combo box
     */
    ezLoadAvailableEmployees() {
        let sortedEmployees = ezApi.ezclocker.ezClockerContext.ezGetSelectedEmployerAccountEmployeeAccounts();

        let availableEmployeeOptions = '';
        if (EzArray.arrayHasLength(sortedEmployees)) {
            let activeEmployee = ezApi.ezclocker.ezClockerContext.ezGetActiveEmployee();
            let activeEmployeeId = EzObject.isValid(activeEmployee)
                ? ezApi.ezNumberOrDefault(activeEmployee.id, -1)
                : -1;

            for (let index in sortedEmployees) {
                let employee = sortedEmployees[index];
                let selected = activeEmployeeId === employee.id
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
            'EzEmployerExportTimeSheetDialog_EmployeeSelection',
            availableEmployeeOptions);
    }


    /**
        @protected @method
        Performs the export of the time-sheet based on the action and options selected by the user
        @returns {Promise.resolve}
     */
    exportTimeSheet() {
        // TODO: Fix amplitude
        // ezApi.ezclocker.ezAmplitudeIntegration.ezTrack('Export timesheets');

        EzwEmployerExportTimeSheetDialog.ezInstance.ezClose();

        switch (EzwEmployerExportTimeSheetDialog.ezInstance.activeExportMode) {
            case EzExportDialogMode.EMPLOYEE:
                return EzwEmployerExportTimeSheetDialog.ezInstance.ezEmployeeModeExport();
            case EzExportDialogMode.EMPLOYER:
            default:
                // TODO: Fix amplitude
                // EzwEmployerExportTimeSheetDialog.ezInstance.amplitudeInstance.logEvent('Export timesheets');
                return EzwEmployerExportTimeSheetDialog.ezInstance.ezEmployerModeExport();
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
                switch (EzwEmployerExportTimeSheetDialog.ezInstance.exportActionContext.action) {
                    case EzExportAction.EXPORT_SELECTED_EMPLOYEE:
                    case EzExportAction.EXPORT_CURRENT_EMPLOYEE:
                        return EzwEmployerExportTimeSheetDialog.ezInstance.exExecuteExportSelectedEmployee(waitDone);
                    case EzExportAction.EXPORT_ALL_EMPLOYEES:
                        return EzwEmployerExportTimeSheetDialog.ezInstance.ezExecuteExportAllEmployeesTimeEntries(waitDone);
                    case EzExportAction.EXPORT_JOBS:
                        return EzwEmployerExportTimeSheetDialog.ezInstance.ezExecuteExportJobs(waitDone);
                    case EzExportAction.EXPORT_INTEGRATION:
                    default:
                        return EzwEmployerExportTimeSheetDialog.ezInstance.ezExecuteIntegrationExport(waitDone);
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
        let startPeriodMoment = EzwEmployerExportTimeSheetDialog.ezInstance.ezGetStartPeriodMoment();

        let endPeriodMoment = EzwEmployerExportTimeSheetDialog.ezInstance.ezGetEndPeriodMoment();

        // Exports the currently selected employee
        return EzwEmployerExportTimeSheetDialog.ezInstance.ezEmployerReports.exportTimeSheetForEmployee(
            ezApi.ezclocker.ezUi.ezGetInputValue(
                EzwEmployerExportTimeSheetDialog.ezInstance.ezIds.inputs.singleEmployeeExportFormatSelectId),
            ezApi.ezclocker.ezClockerContext.ezGetSelectedEmployerAccount().id,
            EzwEmployerExportTimeSheetDialog.ezInstance.ezGetSelectedEmployeeId(),
            startPeriodMoment,
            endPeriodMoment,
            ezApi.ezclocker.ezDateTime.activeTimeZone)
            .then(waitDone);
    }

    /**
        @protected @method
        Starts the export of the all employees time entry report.
        @param {Function} waitDone
     */
    ezExecuteExportAllEmployeesTimeEntries(waitDone) {
        if (ezApi.ezclocker.ezUi.ezIsCheckBoxChecked('EzRadioAllEmployeesByDate')) {
            // All employees time period report by day
            return EzwEmployerExportTimeSheetDialog.ezInstance.ezEmployerReports.exportTimeSheetForAllEmployees(
                EzReportProviderType.ALL_EMPLOYEES_TIME_PERIOD_GROUPED_BY_DAY,
                EzReportFormat.CSV,
                ezApi.ezclocker.ezClockerContext.ezGetSelectedEmployerAccount().id,
                EzwEmployerExportTimeSheetDialog.ezInstance.ezGetStartPeriodMoment(),
                EzwEmployerExportTimeSheetDialog.ezInstance.ezGetEndPeriodMoment(),
                ezApi.ezclocker.ezDateTime.activeTimeZone)
                .then(waitDone);
        }

        if (ezApi.ezclocker.ezUi.ezIsCheckBoxChecked('EzRadioAllEmployeesSummary')) {
            // All employee's summery time period report
            return EzwEmployerExportTimeSheetDialog.ezInstance.ezEmployerReports
                .exportAllEmployeeTimePeriodSummaryReport(
                    EzReportFormat.CSV,
                    EzwEmployerExportTimeSheetDialog.ezInstance.ezGetStartPeriodMoment(),
                    EzwEmployerExportTimeSheetDialog.ezInstance.ezGetEndPeriodMoment(),
                    ezApi.ezclocker.ezDateTime.activeTimeZone,
                    EzReportProviderType.EZ_GENERIC_CSV_SUMMARY_REPORT)
                .then(waitDone);
        }

        // All employee time periods report by employee
        return EzwEmployerExportTimeSheetDialog.ezInstance.ezEmployerReports
            .exportTimeSheetForAllEmployees(
                EzReportProviderType.ALL_EMPLOYEES_TIME_PERIOD_REPORT_BY_EMPLOYEE,
                EzReportFormat.CSV,
                ezApi.ezclocker.ezClockerContext.ezGetSelectedEmployerAccount().id,
                EzwEmployerExportTimeSheetDialog.ezInstance.ezGetStartPeriodMoment(),
                EzwEmployerExportTimeSheetDialog.ezInstance.ezGetEndPeriodMoment(),
                ezApi.ezclocker.ezDateTime.activeTimeZone)
            .then(waitDone);
    }

    /**
        @protected @method
        Starts the export for the Jobs report
        @param {Function} waitDone
     */
    ezExecuteExportJobs(waitDone) {
        // Assumes all employees by default
        return EzwEmployerExportTimeSheetDialog.ezInstance.ezEmployerReports.exportJobs(
            EzReportProviderType.EMPLOYER_JOB_REPORT,
            EzReportFormat.CSV,
            ezApi.ezclocker.ezClockerContext.ezGetSelectedEmployerAccount().id,
            EzwEmployerExportTimeSheetDialog.ezInstance.ezGetStartPeriodMoment(),
            EzwEmployerExportTimeSheetDialog.ezInstance.ezGetEndPeriodMoment(),
            ezApi.ezclocker.ezDateTime.activeTimeZone)
            .then(waitDone);
    }

    /**
        @protected @method
        Sarts the export to the selected integration
        @param {Function} waitDone
     */
    ezExecuteIntegrationExport(waitDone) {
        let ezIntegrationProviderId = ezApi.ezclocker.ezUi.ezGetInputValue('options_integrations');

        ezApi.ezclocker.ezClockerContext.ezSaveActiveAccountOption(
            EzEmployerOption.EZOPTION_SELECTED_INTEGRATION,
            EzString.stringHasLength(ezIntegrationProviderId)
                ? ezIntegrationProviderId
                : 'NONE');

        if (!EzString.stringHasLength(ezIntegrationProviderId)) {
            ezApi.ezclocker.ezDialog.ezShowOk(
                'Export to Integration',
                'Please select the integration you wish to export time entry data to.');
            return waitDone();
        }
		console.log("Mon52c " + ezIntegrationProviderId);
        if (ezIntegrationProviderId == 'QUICKBOOKS_ONLINE' || ezIntegrationProviderId == 'GUSTO_API') {
            waitDone()
                .then(
                    () => EzwEmployerExportTimeSheetDialog.ezInstance.ezEmployerReports.ezExportIntegrationDirect(
                        // EzIntegrationProviderId
                        ezIntegrationProviderId,
                        // startMoment
                        EzwEmployerExportTimeSheetDialog.ezInstance.exportPeriod.exportStartMoment,
                        // endMoment
                        EzwEmployerExportTimeSheetDialog.ezInstance.exportPeriod.exportEndMoment,
                        // timeZoneId
                        ezApi.ezclocker.ezDateTime.activeTimeZone));
        } else {
            waitDone()
                .then(
                    () => EzwEmployerExportTimeSheetDialog.ezInstance.ezEmployerReports.ezExportIntegrationFile(
                        // EzIntegrationProviderId
                        ezIntegrationProviderId,
                        // startMoment
                        EzwEmployerExportTimeSheetDialog.ezInstance.exportPeriod.exportStartMoment,
                        // endMoment
                        EzwEmployerExportTimeSheetDialog.ezInstance.exportPeriod.exportEndMoment,
                        // timeZoneId
                        ezApi.ezclocker.ezDateTime.activeTimeZone));
        }
    }

    /**
        @protected @method
        Exports a report for the employee dialog mode.
     */
    ezEmployeeModeExport() {
        ezApi.ezclocker.ezUi.ezPageWaitExecute(
            'Preparing report ...',
            (waitDone) => EzwEmployerExportTimeSheetDialog.ezInstance.ezSaveEmployeeReportOptions()
                .then(
                    () => EzwEmployerExportTimeSheetDialog.ezInstance.ezEmployeeReports
                        .ezDownloadActiveEmployeeTimePeriodReport(
                            // Employer Id
                            ezApi.ezclocker.ezClockerContext.ezGetActiveEmployer().id,
                            // Employee Id
                            EzwEmployerExportTimeSheetDialog.ezInstance.ezGetSelectedEmployeeId(),
                            // customerId
                            null,
                            // Start period begin of day
                            EzwEmployerExportTimeSheetDialog.ezInstance.ezGetStartPeriodMoment(),
                            // End perioed end of day
                            EzwEmployerExportTimeSheetDialog.ezInstance.ezGetEndPeriodMoment(),
                            ezApi.ezclocker.ezDateTime.activeTimeZone))
                .then(waitDone));
    }

    /**
        @protected @method
        Enables a radio group
     */
    ezEnableRadioGroup() {
        ezApi.ezclocker.ezUi.ezShowElement('radioOptionsForGroup');
    }

    /**
        @protected @method
        Disables a radio group
     */
    ezDisableRadioGroup() {
        ezApi.ezclocker.ezUi.ezHideElement('radioOptionsForGroup');
    }

    /**
        @protected @method
        Sets the report period st art and end moments and then updated the date pickers.
        NOTE: Do not use this method to set the internal export period moments from the date pickers!
        Use the specific ezSetEndPeriodMoment or ezSetStartPeriodMoment methods instead.
        @param {moment} startPeriodMoment
        @param {moment} endPeriodMoment
     */
    ezSetExportPeriod(startPeriodMoment, endPeriodMoment) {
        if (!EzObject.isValid(startPeriodMoment)) {
            throw new EzBadParamException(
                'startPeriodMoment',
                EzwEmployerExportTimeSheetDialog.ezInstance,
                EzwEmployerExportTimeSheetDialog.ezInstance.ezSetExportPeriod);
        }
        if (!EzObject.isValid(endPeriodMoment)) {
            throw new EzBadParamException(
                'endPeriodMoment',
                EzwEmployerExportTimeSheetDialog.ezInstance,
                EzwEmployerExportTimeSheetDialog.ezInstance.ezSetExportPeriod);
        }

        EzwEmployerExportTimeSheetDialog.ezInstance.ezSetStartPeriodMoment(startPeriodMoment);
        EzwEmployerExportTimeSheetDialog.ezInstance.ezSetEndPeriodMoment(endPeriodMoment);

        EzwEmployerExportTimeSheetDialog.ezInstance.ezUpdateDatePickersWithExportPeriod();
    }

    /**
        @protected @method
        Gets the period start moment to use.
        @returns {moment}
     */
    ezGetStartPeriodMoment() {
        let periodStartMoment = EzwEmployerExportTimeSheetDialog.ezInstance.exportPeriod.exportStartMoment;

        let startDatePickerId =
            EzExportDialogMode.EMPLOYEE === EzwEmployerExportTimeSheetDialog.ezInstance.activeExportMode
                ? 'EzEmployeeExportTimeSheetDialog_StartDate'
                : 'EzEmployerExportTimeSheetDialog_StartDate';

        if (!EzObject.isValid(periodStartMoment)) {
            periodStartMoment = ezApi.ezclocker.ezDateTime.ezMomentFromDatePickerStartOfDay(startDatePickerId);
            EzwEmployerExportTimeSheetDialog.ezInstance.exportPeriod.exportStartMoment = periodStartMoment;
        }

        return periodStartMoment;
    }

    /**
        @protected @method
        Sets the EzwEmployerExportTimeSheetDialog.ezInstance.exportPeriod.exportStartMoment value equal to the startPeriodMoment provided.
        @param {moment} startPeriodMoment
     */
    ezSetStartPeriodMoment(startPeriodMoment) {
        if (!EzObject.isValid(startPeriodMoment)) {
            throw new EzBadParamException(
                'startPeriodMoment',
                EzwEmployerExportTimeSheetDialog.ezInstance,
                EzwEmployerExportTimeSheetDialog.ezInstance.ezSetStartPeriodMoment);
        }

        EzwEmployerExportTimeSheetDialog.ezInstance.exportPeriod.exportStartMoment =
            ezApi.ezclocker.ezDateTime.ezSetMomentStartOfDay(startPeriodMoment);
    }

    /**
        @protected @method
        Gets the period end moment to use.
        @returns {moment}
     */
    ezGetEndPeriodMoment() {
        let periodEndMoment = EzwEmployerExportTimeSheetDialog.ezInstance.exportPeriod.exportEndMoment;

        let endDatePickerId =
            EzExportDialogMode.EMPLOYEE === EzwEmployerExportTimeSheetDialog.ezInstance.activeExportMode
                ? 'EzEmployeeExportTimeSheetDialog_EndDate'
                : 'EzEmployerExportTimeSheetDialog_EndDate';

        if (!EzObject.isValid(periodEndMoment)) {
            periodEndMoment = ezApi.ezclocker.ezDateTime.ezMomentFromDatePickerEndOfDay(endDatePickerId);
            EzwEmployerExportTimeSheetDialog.ezInstance.exportPeriod.exportEndMoment = periodEndMoment;
        }

        return periodEndMoment;
    }

    /**
        @protected @method
        Sets the EzwEmployerExportTimeSheetDialog.ezInstance.exportPeriod.exportEndMoment value equal to the startPeriodMoment provided.
        @param {moment} endPeriodMoment
     */
    ezSetEndPeriodMoment(endPeriodMoment) {
        if (!EzObject.isValid(endPeriodMoment)) {
            throw new EzBadParamException(
                'endPeriodMoment',
                EzwEmployerExportTimeSheetDialog.ezInstance,
                EzwEmployerExportTimeSheetDialog.ezInstance.ezSetEndPeriodMoment);
        }

        EzwEmployerExportTimeSheetDialog.ezInstance.exportPeriod.exportEndMoment =
            ezApi.ezclocker.ezDateTime.ezSetMomentEndOfDay(endPeriodMoment);
    }

    /**
        @protected @method
        Updates the date pickers with the values in exportPeriod
     */
    ezUpdateDatePickersWithExportPeriod() {
        let startDatePickerId =
            EzExportDialogMode.EMPLOYEE === EzwEmployerExportTimeSheetDialog.ezInstance.activeExportMode
                ? 'EzEmployeeExportTimeSheetDialog_StartDate'
                : 'EzEmployerExportTimeSheetDialog_StartDate';

        let endDatePickerId =
            EzExportDialogMode.EMPLOYEE === EzwEmployerExportTimeSheetDialog.ezInstance.activeExportMode
                ? 'EzEmployeeExportTimeSheetDialog_EndDate'
                : 'EzEmployerExportTimeSheetDialog_EndDate';

        if (!ezApi.ezclocker.ezUi.ezElementExists(startDatePickerId) ||
            !ezApi.ezclocker.ezUi.ezElementExists(endDatePickerId)) {
            return;
        }

        // Unhook change events before updating values
        EzwEmployerExportTimeSheetDialog.ezInstance.ezUnhookDatePickerEvents(startDatePickerId, endDatePickerId);

        // Set start date picker value
        let aStartMoment = EzwEmployerExportTimeSheetDialog.ezInstance.ezGetStartPeriodMoment();
        let aEndMoment = EzwEmployerExportTimeSheetDialog.ezInstance.ezGetEndPeriodMoment();

        ezApi.ezclocker.ezDateTime.ezSetDatePickerValueStartOfDay(
            startDatePickerId,
            aStartMoment);

        // Set restrictions on end date for ~ 30 days
        ezApi.ezclocker.ezDateTime.ezSetDatePickerMinDateStartOfDay(
            endDatePickerId,
            ezApi.ezclocker.ezDateTime.ezMomentWithPTZ(aStartMoment));

        ezApi.ezclocker.ezDateTime.ezSetDatePickerMaxDateEndOfDay(
            endDatePickerId,
            ezApi.ezclocker.ezDateTime.ezMomentWithPTZ(aStartMoment)
                .add(60, 'days'));

        // Set the end date picker value
        ezApi.ezclocker.ezDateTime.ezSetDatePickerValueEndOfDay(
            endDatePickerId,
            aEndMoment);

        EzwEmployerExportTimeSheetDialog.ezInstance.ezHookDatePickerEvents(startDatePickerId, endDatePickerId);
    }

    /**
        @protected @method
        Activates the tab associated with the current action (for employer mode only)
     */
    ezActivateTabForCurrentAction() {
        if (EzExportDialogMode.EMPLOYER !== EzwEmployerExportTimeSheetDialog.ezInstance.activeExportMode) {
            // Only for employer mode
            return;
        }

        let tabId;
        let tabViewId;

        switch (EzwEmployerExportTimeSheetDialog.ezInstance.exportActionContext.action) {
            case EzExportAction.EXPORT_ALL_EMPLOYEES:
                tabId = EzwEmployerExportTimeSheetDialog.ezInstance.ezTabs[EzExportReportTabId.ALL_EMPLOYEES].id;
                tabViewId = EzwEmployerExportTimeSheetDialog.ezInstance.ezTabs[EzExportReportTabId.ALL_EMPLOYEES].tabViewId;
                break;
            case EzExportAction.EXPORT_JOBS:
                tabId = EzwEmployerExportTimeSheetDialog.ezInstance.ezTabs[EzExportReportTabId.JOBS].id;
                tabViewId = EzwEmployerExportTimeSheetDialog.ezInstance.ezTabs[EzExportReportTabId.JOBS].tabViewId;
                break;
            case EzExportAction.EXPORT_INTEGRATION:
                tabId = EzwEmployerExportTimeSheetDialog.ezInstance.ezTabs[EzExportReportTabId.INTEGRATIONS].id;
                tabViewId = EzwEmployerExportTimeSheetDialog.ezInstance.ezTabs[EzExportReportTabId.INTEGRATIONS].tabViewId;
                break;
            case EzExportAction.EXPORT_CURRENT_EMPLOYEE:
            case EzExportAction.EXPORT_SELECTED_EMPLOYEE:
            default:
                tabId = EzwEmployerExportTimeSheetDialog.ezInstance.ezTabs[EzExportReportTabId.SELECTED_EMPLOYEE].id;
                tabViewId = EzwEmployerExportTimeSheetDialog.ezInstance.ezTabs[EzExportReportTabId.SELECTED_EMPLOYEE].tabViewId;
                break;
        }

        EzwEmployerExportTimeSheetDialog.ezInstance.ezActivateTab(tabId);

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
                EzwEmployerExportTimeSheetDialog.ezInstance,
                EzwEmployerExportTimeSheetDialog.ezInstance.ezActivateTab);
        }
        if (!EzObject.hasProperty(EzwEmployerExportTimeSheetDialog.ezInstance.ezTabs, aTabIdToActivate)) {
            throw new EzException(`Tab id ${aTabIdToActivate} does not exist.`);
        }

        if (aTabIdToActivate === EzwEmployerExportTimeSheetDialog.ezInstance.ezActiveTabId) {
            // already active
            return;
        }

        if (EzString.stringHasLength(EzwEmployerExportTimeSheetDialog.ezInstance.ezActiveTabId) &&
            EzObject.hasProperty(EzwEmployerExportTimeSheetDialog.ezInstance.ezTabs, EzwEmployerExportTimeSheetDialog.ezInstance.ezActiveTabId)) {

            // Deactivate current
            ezApi.ezCallback(
                EzwEmployerExportTimeSheetDialog.ezInstance.ezTabs[EzwEmployerExportTimeSheetDialog.ezInstance.ezActiveTabId].onBeforeUnactivate,
                EzwEmployerExportTimeSheetDialog.ezInstance.ezTabs[EzwEmployerExportTimeSheetDialog.ezInstance.ezActiveTabId]);

            ezApi.ezclocker.ezUi.ezHideElement(
                EzwEmployerExportTimeSheetDialog.ezInstance.ezTabViews[EzwEmployerExportTimeSheetDialog.ezInstance.ezActiveTabId].id);

            ezApi.ezclocker.ezUi.ezRemoveClass(
                EzwEmployerExportTimeSheetDialog.ezInstance.ezTabViews[EzwEmployerExportTimeSheetDialog.ezInstance.ezActiveTabId].id,
                'ezActiveTabView');

            ezApi.ezclocker.ezUi.ezRemoveClass(EzwEmployerExportTimeSheetDialog.ezInstance.ezActiveTabId, 'ezActiveTab');

            ezApi.ezclocker.ezUi.ezSetElementDataAttributeValue(
                EzwEmployerExportTimeSheetDialog.ezInstance.ezActiveTabId,
                'active',
                'false');

            EzwEmployerExportTimeSheetDialog.ezInstance.ezTabs[EzwEmployerExportTimeSheetDialog.ezInstance.ezActiveTabId].active = false;

            EzwEmployerExportTimeSheetDialog.ezInstance.ezActiveTabId = null;
        }

        // Activate the new tab
        ezApi.ezCallback(
            EzwEmployerExportTimeSheetDialog.ezInstance.ezTabs[aTabIdToActivate].onBeforeActivate,
            EzwEmployerExportTimeSheetDialog.ezInstance.ezTabs[aTabIdToActivate]);

        EzwEmployerExportTimeSheetDialog.ezInstance.ezTabs[aTabIdToActivate].active = true;

        ezApi.ezclocker.ezUi.ezSetElementDataAttributeValue(aTabIdToActivate, 'active', 'true');

        ezApi.ezclocker.ezUi.ezAddClass(aTabIdToActivate, 'ezActiveTab');

        // Display the tab's view
        ezApi.ezclocker.ezUi.ezAddClass(EzwEmployerExportTimeSheetDialog.ezInstance.ezTabViews[aTabIdToActivate].id, 'ezActiveTabView');

        ezApi.ezclocker.ezUi.ezShowElement(EzwEmployerExportTimeSheetDialog.ezInstance.ezTabViews[aTabIdToActivate].id);

        EzwEmployerExportTimeSheetDialog.ezInstance.ezActiveTabId = aTabIdToActivate;
    }

    /**
        @protected @method
        Handles actions needed before the intergation tab is activated
        @param {Object} tabInfo
     */
    ezHandleEzEmployerIntegrationsViewBeforeActivate() {
        ezApi.ezclocker.ezUi.ezDisableElementOpacity('EzExportReportTotalsFormatOptionsContainer');

        ezApi.ezclocker.ezUi.ezAddElementClass('EzReportWithDecimalTotalsLabel', 'ezText-input-label-disabled');

        ezApi.ezclocker.ezUi.ezDisableImage('EzReportWithDecimalTotalsHelpText');

        ezApi.ezclocker.ezUi.ezDisableElement(EzwEmployerExportTimeSheetDialog.ezInstance.ezIds.inputs.totalsInDecimalFormatCheckboxId);

        EzwEmployerExportTimeSheetDialog.ezInstance.ezEnableDailyTotalsOption();

        ezApi.ezclocker.ezUi.ezAddElementClass('EzReportWith24hrTimeLabel', 'ezText-input-label-disabled');

        ezApi.ezclocker.ezUi.ezDisableImage('EzReportWith24hrTimeLabelHelpText');

        ezApi.ezclocker.ezUi.ezDisableElement(EzwEmployerExportTimeSheetDialog.ezInstance.ezIds.inputs.timeIn24HourFormatCheckboxId);
    }

    /**
        @protected @method
        Enables the Include Day Totals check box
     */
    ezEnableDailyTotalsOption() {
        if (EzExportAction.EXPORT_INTEGRATION === EzwEmployerExportTimeSheetDialog.ezInstance.activeExportMode) {
            EzwEmployerExportTimeSheetDialog.ezInstance.ezDisableDailyTotalsOption('Not available for integration exports.');
            return;
        }

        if (EzExportAction.EXPORT_ALL_EMPLOYEES === EzwEmployerExportTimeSheetDialog.ezInstance.activeExportMode) {
            if (EzBoolean.isTrue(ezApi.ezclocker.ezUi.ezIsRadioBoxChecked('EzRadioAllEmployeesByDate'))) {
                EzwEmployerExportTimeSheetDialog.ezInstance.ezDisableDailyTotalsOption(
                    'Not available for All Employees Summary & Detail by Date report.');
                return;
            }

            if (EzBoolean.isTrue(ezApi.ezclocker.ezUi.ezIsRadioBoxChecked('EzRadioAllEmployeesSummary'))) {
                EzwEmployerExportTimeSheetDialog.ezInstance.ezDisableDailyTotalsOption(
                    'Not available for All Employees Summary Only report.');
                return;
            }
        }

        ezApi.ezclocker.ezUi.ezRemoveElementClass('EzReportWithDailyTotalsLabel', 'ezText-input-label-disabled');

        ezApi.ezclocker.ezUi.ezEnableImage(EzwEmployerExportTimeSheetDialog.ezInstance.ezIds.images.includeDayTotalsCheckboxHelpImgId);

        ezApi.ezclocker.ezUi.ezEnableElement(EzwEmployerExportTimeSheetDialog.ezInstance.ezIds.inputs.includeDayTotalsCheckboxId);

        ezApi.ezclocker.ezUi.ezSetElementHint(
            EzwEmployerExportTimeSheetDialog.ezInstance.ezIds.inputs.includeDayTotalsCheckboxId,
            EzwEmployerExportTimeSheetDialog.ezInstance.INCLUDE_DAY_TOTALS_DEFAULT_HINT);

        ezApi.ezclocker.ezUi.ezSetElementHint(
            EzwEmployerExportTimeSheetDialog.ezInstance.ezIds.inputs.includeDayTotalsCheckboxId,
            EzwEmployerExportTimeSheetDialog.ezInstance.INCLUDE_DAY_TOTALS_DEFAULT_HINT);
    }

    /**
        @protected @method
        Disables the Include Day Totals check box
     */
    ezDisableDailyTotalsOption(reasonDisabled) {
        ezApi.ezclocker.ezUi.ezAddElementClass(
            'EzReportWithDailyTotalsLabel',
            'ezText-input-label-disabled');

        ezApi.ezclocker.ezUi.ezDisableImage(
            EzwEmployerExportTimeSheetDialog.ezInstance.ezIds.images.includeDayTotalsCheckboxHelpImgId);

        ezApi.ezclocker.ezUi.ezDisableElement(
            EzwEmployerExportTimeSheetDialog.ezInstance.ezIds.inputs.includeDayTotalsCheckboxId);

        if (EzString.stringHasLength(reasonDisabled)) {
            ezApi.ezclocker.ezUi.ezSetElementHint(
                EzwEmployerExportTimeSheetDialog.ezInstance.ezIds.labels.includeDayTotalsCheckboxLabelId,
                reasonDisabled);

            ezApi.ezclocker.ezUi.ezSetElementHint(
                EzwEmployerExportTimeSheetDialog.ezInstance.ezIds.inputs.includeDayTotalsCheckboxId,
                reasonDisabled);
        } else {
            ezApi.ezclocker.ezUi.ezSetElementHint(
                EzwEmployerExportTimeSheetDialog.ezInstance.ezIds.labels.includeDayTotalsCheckboxLabelId,
                EzwEmployerExportTimeSheetDialog.ezInstance.INCLUDE_DAY_TOTALS_DEFAULT_HINT);

            ezApi.ezclocker.ezUi.ezSetElementHint(
                EzwEmployerExportTimeSheetDialog.ezInstance.ezIds.inputs.includeDayTotalsCheckboxId,
                EzwEmployerExportTimeSheetDialog.ezInstance.INCLUDE_DAY_TOTALS_DEFAULT_HINT);
        }

    }

    /**
        @protected @method
        Handles actions needed before the integration tab is un-activatd
        @param {Object} tabInfo
     */
    ezHandleEzEmployerIntegrationsViewBeforeUnactivate() {
        ezApi.ezclocker.ezUi.ezEnableElementOpacity('EzExportReportTotalsFormatOptionsContainer');

        ezApi.ezclocker.ezUi.ezRemoveElementClass('EzReportWithDecimalTotalsLabel', 'ezText-input-label-disabled');

        ezApi.ezclocker.ezUi.ezEnableImage('EzReportWithDecimalTotalsHelpText');

        ezApi.ezclocker.ezUi.ezEnableElement(EzwEmployerExportTimeSheetDialog.ezInstance.ezIds.inputs.totalsInDecimalFormatCheckboxId);

        EzwEmployerExportTimeSheetDialog.ezInstance.ezDisableDailyTotalsOption('Not available for integration exports.');

        ezApi.ezclocker.ezUi.ezRemoveElementClass('EzReportWith24hrTimeLabel', 'ezText-input-label-disabled');

        ezApi.ezclocker.ezUi.ezEnableImage('EzReportWith24hrTimeLabelHelpText');

        ezApi.ezclocker.ezUi.ezEnableElement(EzwEmployerExportTimeSheetDialog.ezInstance.ezIds.inputs.timeIn24HourFormatCheckboxId);
    }

    /**
        @protected @method
        Returns the selected/active employeeId to run the report for.
        @returns {Number}
     */
    ezGetSelectedEmployeeId() {
        return EzwEmployerExportTimeSheetDialog.ezInstance.activeExportMode === EzExportDialogMode.EMPLOYEE
            ? ezApi.ezclocker.ezClockerContext.ezGetActiveEmployee().id
            : ezApi.ezToNumber(
                ezApi.ezclocker.ezUi.ezGetInputValue('EzEmployerExportTimeSheetDialog_EmployeeSelection'));
    }

    /**
        @protected @method
        Returns the selected integration
     */
    ezGetSelectedIntegration() {
        return EzwEmployerExportTimeSheetDialog.ezInstance.activeExportMode !== EzExportDialogMode.EMPLOYEE
            ? ezApi.ezStringOrEmpty(
                ezApi.ezclocker.ezUi.ezGetInputValue('options_integrations'))
            : '';
    }

    /**
        @protected @method
        Handles the employer's report period date pickers's onchange event
     */
    ezHandleDatePickerChange() {
        let startDatePickerId = EzExportDialogMode.EMPLOYEE === EzwEmployerExportTimeSheetDialog.ezInstance.activeExportMode
            ? 'EzEmployeeExportTimeSheetDialog_StartDate'
            : 'EzEmployerExportTimeSheetDialog_StartDate';

        let endDatePickerId = EzExportDialogMode.EMPLOYEE === EzwEmployerExportTimeSheetDialog.ezInstance.activeExportMode
            ? 'EzEmployeeExportTimeSheetDialog_EndDate'
            : 'EzEmployerExportTimeSheetDialog_EndDate';

        EzwEmployerExportTimeSheetDialog.ezInstance.ezSetStartPeriodMoment(
            ezApi.ezclocker.ezDateTime.ezMomentFromDatePickerStartOfDay(startDatePickerId));

        EzwEmployerExportTimeSheetDialog.ezInstance.ezSetEndPeriodMoment(
            ezApi.ezclocker.ezDateTime.ezMomentFromDatePickerStartOfDay(endDatePickerId));
    }

    /**
        @protected @method
        Handles the group by job check Changed event
     */
    ezOnGroupByJobRadioChanged() {
        if (EzwEmployerExportTimeSheetDialog.ezInstance.activeExportMode !== EzExportDialogMode.EMPLOYER) {
            return;
        }

        ezApi.ezclocker.ezClockerContext.ezSaveActiveEmployerOption(
            ezApi.ezclocker.ezOptionsService.EZOPTION_EMPLOYER_JOBS_REPORT_GROUP_BY_JOB,
            EzBoolean.isTrue(ezApi.ezclocker.ezUi.ezIsCheckBoxChecked('EzRadioGroupByJob'))
                ? '1'
                : '0');
    }

    /**
        @protected @method
        Handles the decimal totals change event
    */
    ezOnExportWithDecimalTotalsCheckboxChanged() {
        if (EzExportDialogMode.EMPLOYER !== EzwEmployerExportTimeSheetDialog.ezInstance.activeExportMode) {
            return;
        }

        ezApi.ezclocker.ezClockerContext.ezSaveActiveEmployerOption(
            ezApi.ezclocker.ezOptionsService.EZOPTION_USE_DECIMAL_TOTALS_IN_EXPORT_REPORTS,
            EzBoolean.isTrue(ezApi.ezclocker.ezUi.ezIsCheckBoxChecked(EzwEmployerExportTimeSheetDialog.ezInstance.ezIds.inputs.totalsInDecimalFormatCheckboxId))
                ? '1'
                : '0');
    }

    /**
        @protected @method
        Handles the daily totals checkbox change event
     */
    ezOnExportWithDailyTotalsCheckboxChanged() {
        if (EzExportDialogMode.EMPLOYER !== EzwEmployerExportTimeSheetDialog.ezInstance.activeExportMode) {
            return;
        }

        ezApi.ezclocker.ezClockerContext.ezSaveActiveEmployerOption(
            ezApi.ezclocker.ezOptionsService.EZOPTION_SHOW_DAY_TOTALS_IN_EXPORT_REPORTS,
            EzBoolean.isTrue(ezApi.ezclocker.ezUi.ezIsCheckBoxChecked(EzwEmployerExportTimeSheetDialog.ezInstance.ezIds.inputs.includeDayTotalsCheckboxId))
                ? '1'
                : '0');
    }

    /**
        @protected @method
        Handles the Summary & Detail by Date radio button change event
     */
    ezHandleEzRadioAllEmployeesByDateOnChange() {
        if (EzBoolean.isTrue(ezApi.ezclocker.ezUi.ezIsRadioBoxChecked('EzRadioAllEmployeesByDate'))) {
            EzwEmployerExportTimeSheetDialog.ezInstance.ezDisableDailyTotalsOption(
                'Not available for All Employees Summary & Detail by Date report.');
        } else {
            EzwEmployerExportTimeSheetDialog.ezInstance.ezEnableDailyTotalsOption();
        }
    }

    /**
        @protected @method
        Handles the Summary Only radio button change event
     */
    ezHandleEzRadioAllEmployeesSummaryOnChange() {
        if (EzBoolean.isTrue(ezApi.ezclocker.ezUi.ezIsRadioBoxChecked('EzRadioAllEmployeesSummary'))) {
            EzwEmployerExportTimeSheetDialog.ezInstance.ezDisableDailyTotalsOption(
                'Not available for All Employees Summary Only report.');
        } else {
            EzwEmployerExportTimeSheetDialog.ezInstance.ezEnableDailyTotalsOption();
        }
    }

    /**
        @protected @method
        Handles the Summary & Detail by Employee radio button change event
     */
    ezHandleEzRadioAllEmployeesByEmployeeOnChange() {
        EzwEmployerExportTimeSheetDialog.ezInstance.ezEnableDailyTotalsOption();
    }

    /**
        @protected @method
        Handles the use 24 hour time change event
     */
    ezOnExportWith24hrTimeCheckboxChanged() {
        if (EzExportDialogMode.EMPLOYER !== EzwEmployerExportTimeSheetDialog.ezInstance.activeExportMode) {
            return;
        }

        ezApi.ezclocker.ezClockerContext.ezSaveActiveEmployerOption(
            ezApi.ezclocker.ezOptionsService.EZOPTION_USE_24HOURTIME_IN_EXPORT_REPORTS,
            EzBoolean.isTrue(ezApi.ezclocker.ezUi.ezIsCheckBoxChecked(EzwEmployerExportTimeSheetDialog.ezInstance.ezIds.inputs.timeIn24HourFormatCheckboxId))
                ? '1'
                : '0');
    }

    /**
        @protected @method
        Handles the single employee report select export format select box change
     */
    ezOnEzEmployerExportTimeSheetDialogFormatSelectionSelectChanged() {
        if (EzExportDialogMode.EMPLOYER !== EzwEmployerExportTimeSheetDialog.ezInstance.activeExportMode) {
            return;
        }

        let singleEmployeeExportFormat = ezApi.ezclocker.ezUi.ezGetInputValue(
            EzwEmployerExportTimeSheetDialog.ezInstance.ezIds.inputs.singleEmployeeExportFormatSelectId);

        switch (singleEmployeeExportFormat.toUpperCase()) {
            case EzReportFormat.PDF:
                EzwEmployerExportTimeSheetDialog.ezInstance.ezDisableDailyTotalsOption(
                    'Not available for Selected Employee PDF report.');
                break;
            case EzReportFormat.CSV:
            default:
                EzwEmployerExportTimeSheetDialog.ezInstance.ezEnableDailyTotalsOption();
        }
    }

    /**
        @protected @method
        Shows the tab button for the provided tabId
        @param {String} tabId
     */
    ezShowTab(tabId) {
        if (EzwEmployerExportTimeSheetDialog.ezInstance.activeExportMode !== EzExportDialogMode.EMPLOYER) {
            // Employee view does not currently have tabs
            return;
        }

        if (!EzString.stringHasLength(tabId) || !EzObject.hasProperty(EzwEmployerExportTimeSheetDialog.ezInstance.ezTabs, tabId)) {
            throw new EzBadParamException(
                'tabId',
                EzwEmployerExportTimeSheetDialog.ezInstance,
                EzwEmployerExportTimeSheetDialog.ezInstance.ezShowTab);
        }

        ezApi.ezclocker.ezUi.ezShowElement(EzwEmployerExportTimeSheetDialog.ezInstance.ezTabs[tabId].id);

        EzwEmployerExportTimeSheetDialog.ezInstance.ezTabs[tabId].visible = true;
    }

    /**
        @protected @method
        Hides the tab button (and view) for the provided tabId
        @param {String} tabId
     */
    ezHideTab(tabId) {
        if (EzwEmployerExportTimeSheetDialog.ezInstance.activeExportMode !== EzExportDialogMode.EMPLOYER) {
            // Employee view does not currently have tabs
            return;
        }

        if (!EzString.stringHasLength(tabId) || !EzObject.hasProperty(EzwEmployerExportTimeSheetDialog.ezInstance.ezTabs, tabId)) {
            throw new EzBadParamException(
                'tabId',
                EzwEmployerExportTimeSheetDialog.ezInstance,
                EzwEmployerExportTimeSheetDialog.ezInstance.ezHideTab);
        }

        if (tabId === EzwEmployerExportTimeSheetDialog.ezInstance.ezActiveTabId) {
            EzwEmployerExportTimeSheetDialog.ezInstance.ezActivateTab(EzExportReportTabId.SELECTED_EMPLOYEE);
        }

        ezApi.ezclocker.ezUi.ezHideElement(EzwEmployerExportTimeSheetDialog.ezInstance.ezTabs[tabId].tabViewId);

        ezApi.ezclocker.ezUi.ezHideElement(EzwEmployerExportTimeSheetDialog.ezInstance.ezTabs[tabId].id);

        EzwEmployerExportTimeSheetDialog.ezInstance.ezTabs[tabId].visible = false;
    }

    /**
        @protected @method
        Builds the export report dialog's HTML
        @returns {String}
     */
    ezBuildExportReportDialogHTML() {
        return ezApi.ezTemplate`
            <div
                id="${EzwEmployerExportTimeSheetDialog.ezInstance.ezDialogId}"
                title="Export Time Sheet"
                style="display:none">
                <input
                    id="EzExportTimeSheetDialog_TimeZone"
                    type="hidden"/>
                <input
                    id="EzExportTimeSheetDialog_EmployerId"
                    type="hidden" />
                <input
                    id="EzExportTimeSheetDialog_EmployeeId"
                    type="hidden"/>
                <div
                    id="EzExportTimeSheetDialogContentContainer"
                    style="display:none">
                    ${EzwEmployerExportTimeSheetDialog.ezInstance.ezBuildEmployeeExportModeHtml()}
                    ${EzwEmployerExportTimeSheetDialog.ezInstance.ezBuildEmployerExportModeHtml()}
                    <div
                        id="ezDateRangeError"
                        class="ezErrorBox"
                        style="display:none">
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

        for (let tabId in EzwEmployerExportTimeSheetDialog.ezInstance.ezTabs) {
            let tab = EzwEmployerExportTimeSheetDialog.ezInstance.ezTabs[tabId];

            let hideTabStyle = ezApi.ezIsFalse(tab.visible)
                ? 'style="display:none"'
                : '';

            tabsHtml = ezApi.ezTemplate`${tabsHtml}
                <button
                    id="${tab.id}"
                    type="button"
                    class="ezTab"
                    ${hideTabStyle}
                    data-active="${tab.active.toString()}"
                    data-tabgroup="${tab.tabGroup}"
                    data-tabviewid="${tab.tabViewId}">
                    ${tab.caption}
                </button>`;
        }

        return ezApi.ezTemplate`
            <!-- Employer Export Mode -->
            <div
                id="EzEMPLOYER_EXPORT_MODE"
                style="display:none">
                <div
                    id="EzEmployerExportTimeSheetDialog"
                    title="Export Time Sheets">
                    <div
                        id="EzExportTypeTabs"
                        class="ezTabContainer"
                        style="height:240px">
                        <div
                            class="ezTabsContainer">
                            ${tabsHtml}
                        </div>
                        ${EzwEmployerExportTimeSheetDialog.ezInstance.ezBuildTabViewsHtml()}
                    </div>
                    ${EzwEmployerExportTimeSheetDialog.ezInstance.ezBuildEmployerExportTimesheetOptions()}
                </div>
            </div>`;
    }

    ezBuildTabViewsHtml() {

        let tabViewsHtml;

        EzwEmployerExportTimeSheetDialog.ezInstance.ezTabIds.forEach(
            (tabId) => {
                if (!EzObject.hasProperty(EzwEmployerExportTimeSheetDialog.ezInstance.ezTabViews, tabId)) {
                    ezApi.ezclocker.ezLogger.error(`Tab view does not exist for tabId=${tabId}`);
                } else {
                    tabViewsHtml = ezApi.ezTemplate`${tabViewsHtml}
                        ${EzwEmployerExportTimeSheetDialog.ezInstance.ezTabViews[tabId].view}`;
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
                style="height:180px; display:none">
                <h3
                    class="ezH3">
                    Single Employee Time Entries Report
                </h3>
                <div
                    id="EzExportSelectedEmployeeViewLayout"
                    class="ezTabs-section-grid-cols_360x360">
                    <div
                        class="ezContainer-labeled-input-vertical">
                        <label
                            for="EzEmployerExportTimeSheetDialog_EmployeeSelection"
                            class="ezH4">
                            Select Employee
                        </label>
                        <select
                            id="EzEmployerExportTimeSheetDialog_EmployeeSelection"
                            class="ezFullWidth">
                        </select>
                    </div>
                    <div
                        class="ezContainer-labeled-input-vertical">
                        <label
                            for="${EzwEmployerExportTimeSheetDialog.ezInstance.ezIds.inputs.singleEmployeeExportFormatSelectId}"
                            class="ezH4">
                            Select Export Format
                        </label>
                        <select
                            id="${EzwEmployerExportTimeSheetDialog.ezInstance.ezIds.inputs.singleEmployeeExportFormatSelectId}"
                            class="ezFullWidth">
                            <option
                                value="${EzReportFormat.CSV}"
                                selected>
                                ${EzReportFormat.CSV}
                            </option>
                            <option
                                value="${EzReportFormat.PDF}">
                                ${EzReportFormat.PDF}
                            </option>
                        </select>
                    </div>
                </div>
            </div>`;
    }

    /**
        @protected @method
        Builds the All Employees tab view html
        @returns {string}
     */
    ezBuildAllEmployeesTabViewHtml(tabViewId) {
        let summaryOnlyTipHelp = ezApi.ezMsg`
            The report will show total hours in a grid format.
            Best all employees report if you have assigned hourly rates for jobs.
            This is also the best all employees report for payroll use.`;

        return ezApi.ezTemplate`
            <!-- All Employees Tab View -->
            <div
                id="${tabViewId}"
                data-tabgroup="exportReportTabs"
                class="ezTabs-content"
                style="height:180px; display:none">
                <h3
                    class="ezH3">
                    All Employees Time Entries Report
                </h3>
                <p>
                    Export a CSV time entries report for all employees during the selected period.
                </p>
                <h4
                    class="ezH4">
                    Select Report Grouping
                </h4>
                <div
                    id="EzEmployerExportAllEmployeesGroupingContainer"
                    class="ezTopMargin_8 ezAutoCol_AxAxA">
                    <div
                        class="ezContainer-radio-check-input">
                        <label
                            for="EzRadioAllEmployeesByEmployee">
                            <input
                                id="EzRadioAllEmployeesByEmployee"
                                name="ALL_EMPLOYEES_GROUPING_RADIO_GROUP"
                                type="radio"
                                checked/>
                            Summary & Detail by Employee
                            <img
                                id="EzReportAllEmployeesByEmployeeHelpText"
                                src="${EzwEmployerExportTimeSheetDialog.ezHelpImageUri}"
                                class="ezMiddleAlign"
                                style="${EzwEmployerExportTimeSheetDialog.ezHelpImageStyle}"
                                title="The report will contain summary of hours and all time entries grouped by employee" />
                        </label>
                    </div>
                    <div
                        class="ezContainer-radio-check-input">
                        <label
                            for="EzRadioAllEmployeesByDate">
                            <input
                                id="EzRadioAllEmployeesByDate"
                                name="ALL_EMPLOYEES_GROUPING_RADIO_GROUP"
                                type="radio"/>
                            Summary & Detail by Date
                            <img
                                id="EzReportAllEmployeesByDateHelpText"
                                src="${EzwEmployerExportTimeSheetDialog.ezHelpImageUri}"
                                class="ezMiddleAlign"
                                style="${EzwEmployerExportTimeSheetDialog.ezHelpImageStyle}"
                                title="The report will contain summary of hours and all time entries grouped by date" />
                        </label>
                    </div>
                    <div
                        class="ezContainer-radio-check-input">
                        <label
                            for="EzRadioAllEmployeesSummary">
                            <input
                                id="EzRadioAllEmployeesSummary"
                                name="ALL_EMPLOYEES_GROUPING_RADIO_GROUP"
                                type="radio"/>
                            Summary Only
                            <img
                                id="EzReportAllEmployeesBySummaryHelpText"
                                src="${EzwEmployerExportTimeSheetDialog.ezHelpImageUri}"
                                class="ezMiddleAlign"
                                style="${EzwEmployerExportTimeSheetDialog.ezHelpImageStyle}"
                                title="${summaryOnlyTipHelp}" />
                        </label>
                    </div>
                </div>
            </div>`;
    }

    /**
        @protected @method
        Builds the Jobs tab view html
        @returns {string}
     */
    ezBuildJobsTabViewHtml(tabViewId) {
        return ezApi.ezTemplate`
            <!-- Jobs Tab View -->
            <div
                id="${tabViewId}"
                data-tabgroup="exportReportTabs"
                class="ezTabs-content"
                style="height:180px; display:none">
                <h3
                    class="ezH3">
                    Time Entries Job Report
                    </h3>
                <p>
                    Export a CSV time entries report for all employees grouped by job.
                </p>
                <h4
                    class="ezH4">
                    Select Report Grouping
                </h4>
                <div
                    id="${tabViewId}_GroupingContainer"
                    class="ezTopMargin_8 ezAutoCol_Max_Max ezGrid-align-middle-left ezGrid-align-space-evenly">
                    <div
                        class="ezContainer-radio-check-input"
                        style="margin-right:20px">
                        <label
                            for="${EzwEmployerExportTimeSheetDialog.ezInstance.ezIds.inputs.jobReportGroupByDateRadioBoxId}">
                            <input
                                id="${EzwEmployerExportTimeSheetDialog.ezInstance.ezIds.inputs.jobReportGroupByDateRadioBoxId}"
                                name="JOBS_GROUPING_RADIO_GROUP"
                                type="radio"
                                checked/>
                                Group by Job then Date
                            <img
                                id="${EzwEmployerExportTimeSheetDialog.ezInstance.ezIds.inputs.jobReportGroupByDateRadioBoxId}_HelpImg"
                                src="${EzwEmployerExportTimeSheetDialog.ezHelpImageUri}"
                                class="ezMiddleAlign"
                                style="${EzwEmployerExportTimeSheetDialog.ezHelpImageStyle}"
                                title="The report will group time entries by job then date." />
                        </label>
                    </div>
                    <div
                        class="ezContainer-radio-check-input">
                        <label
                            for="${EzwEmployerExportTimeSheetDialog.ezInstance.ezIds.inputs.jobReportGroupByEmployeeRadioBoxId}">
                            <input
                                id="${EzwEmployerExportTimeSheetDialog.ezInstance.ezIds.inputs.jobReportGroupByEmployeeRadioBoxId}"
                                name="JOBS_GROUPING_RADIO_GROUP"
                                type="radio"/>
                                Group by Job then Employee
                            <img
                                id="${EzwEmployerExportTimeSheetDialog.ezInstance.ezIds.inputs.jobReportGroupByEmployeeRadioBoxId}_HelpImg"
                                src="${EzwEmployerExportTimeSheetDialog.ezHelpImageUri}"
                                class="ezMiddleAlign"
                                style="${EzwEmployerExportTimeSheetDialog.ezHelpImageStyle}"
                                title="The report will group time entries by job then by employee then by date." />
                        </label>
                    </div>
                </div>
            </div>`;
    }

    /**
        @protected @method
        Builds the Integrations tab view html
        @returns {string}
     */
    ezBuildIntegrationsTabViewHtml(tabViewId) {
        return ezApi.ezTemplate`
            <div
                data-feature-id="ezfIntegrations"
                class="ezFeatureContainer"
                class="ezTabs-content"
                style="displaay:none">
                <div
                    id="${tabViewId}"
                    data-tabgroup="exportReportTabs"
                    style="height:180px; display:none">
                    <div
                        class="ezContainer-scroll-box"
                        style="height:160px;">
                        ${EzwEmployerExportTimeSheetDialog.ezInstance.ezBuildEmployerIntegrationsAbsentHtml()}
                        <div
                            id="EzIntegrationPresent"
                            style="display:none">
                            <h3
                                class="ezH3">
                                Export Employee Time Totals to Integration
                            </h3>
                            <p>
                                Export your employee's total time for the selected period to the selected
                                integration.
                            </p>
                            <h4
                                class="ezH4">
                                Select Integration:
                            </h4>
                            <div
                                id="EzEmployerExportAllEmployeesGroupingContainer"
                                class="ezAutoCol_A">
                                <select
                                    id="options_integrations"
                                    class="ezFullWidth">
                                </select>
                                <!--
                                <button
                                    id="EzManageIntegrationsButton"
                                    class="ezEditButton"
                                    onclick="ezApi.ezclocker.nav.ezNavigateToEmployerAccountPage()">
                                    Manage integrations...
                                </button>
                                -->
                            </div>
                        </div>
                    </div>
                </div>
            </div>`;
    }

    /**
        @protected @method
        Builds the employer's export time sheet options
        @returns {String}
     */
    ezBuildEmployerExportTimesheetOptions() {
        let includeDayTotalsHelp = ezApi.ezMsg`
            A total is added for each day.
            Does not apply to the following reports:
            Selected Employee: PDF Format Report,
            All Employees: Summary & Detail by Date Report,
            All Employees: Summary Report,
            and the Integrations Exports`;

        let totalsInDecimalHelp = ezApi.ezEM`
            Payroll hours are almost always reported in decimal hours.
            This allows your payroll provider to simply multiply hours
            to the wage to obtain gross pay.
            Example: 32 hours 45 minutes will display as 32.75`;

        return ezApi.ezTemplate`
            <!-- Employer export report options -->
            <div
                id="${EzwEmployerExportTimeSheetDialog.ezInstance.ezDialogId}_EmployerReportOptionsContainer"
                class="ezPad4">
                <div
                    class="ezLightGrayBox marginTop10">
                    <div
                        class="ezAutoCol_AxA">
                        <div
                            class="ezTransparentInputContainer">
                            <label
                                for="EzEmployerExportTimeSheetDialog_StartDate"
                                class="ezBold">
                                Period Start Date
                            </label>
                            <input
                                id="EzEmployerExportTimeSheetDialog_StartDate"
                                type="text"
                                class="ezFullWidth"/>
                        </div>
                        <div
                            class="ezTransparentInputContainer">
                            <label
                                for="EzEmployerExportTimeSheetDialog_EndDate"
                                class="ezBold">
                                Period End Date
                            </label>
                            <input
                                id="EzEmployerExportTimeSheetDialog_EndDate"
                                type="text"
                                class="ezFullWidth"/>
                        </div>
                    </div>
                </div>
                <div
                    id="EzExportReportTotalsFormatOptionsContainer"
                    class="ezWhiteBox8 ezAutoCol_AxAxA ezGrid-align-space-between ezGrid-vertical-align-middle ezTopMargin_20">
                    <label
                        id="EzReportWithDecimalTotalsLabel"
                        for="${EzwEmployerExportTimeSheetDialog.ezInstance.ezIds.inputs.totalsInDecimalFormatCheckboxId}"
                        class="ezInputs-checkbox-radio-label">
                        <input
                            id="${EzwEmployerExportTimeSheetDialog.ezInstance.ezIds.inputs.totalsInDecimalFormatCheckboxId}"
                            type="checkbox" />
                        Totals in decimal format
                        <img
                            id="EzReportWithDecimalTotalsHelpText"
                            src="/public/images/info.svg"
                            class="ezMiddleAlign"
                            style="width: 18px; height: 18px"
                            title="${totalsInDecimalHelp}"/>
                    </label>
                    <label
                        id="${EzwEmployerExportTimeSheetDialog.ezInstance.ezIds.labels.includeDayTotalsCheckboxLabelId}"
                        for="${EzwEmployerExportTimeSheetDialog.ezInstance.ezIds.inputs.includeDayTotalsCheckboxId}"
                        class="ezInputs-checkbox-radio-label">
                        <input
                            id="${EzwEmployerExportTimeSheetDialog.ezInstance.ezIds.inputs.includeDayTotalsCheckboxId}"
                            type="checkbox" />
                        Include day totals
                        <img
                            id="${EzwEmployerExportTimeSheetDialog.ezInstance.ezIds.images.includeDayTotalsCheckboxHelpImgId}"
                            src="/public/images/info.svg"
                            class="ezMiddleAlign"
                            title="${includeDayTotalsHelp}"
                            style="width: 18px; height: 18px"/>
                    </label>
                    <label
                        id="EzReportWith24hrTimeLabel"
                        for="EzReportWith24hrTime"
                        class="ezInputs-checkbox-radio-label">
                        <input
                            id="EzReportWith24hrTime"
                            type="checkbox" />
                        Time in 24 hour format
                        <img
                            id="EzReportWith24hrTimeLabelHelpText"
                            src="/public/images/info.svg"
                            title="1:30 will display as 13:30"
                            class="ezMiddleAlign" style="width: 18px; height: 18px"/>
                    </label>
                </div>
            </div>`;
    }

    /**
        @protected @method
        Builds the absent (aka no setup integrations) html info UX
        @returns {String}
     */
    ezBuildEmployerIntegrationsAbsentHtml() {
        let availableIntegrationBullets = ezApi.ezTemplate`
            <ul>
                <li>
                    ${EzIntegrationProviderId.ezToIntegrationProductName(EzIntegrationProviderId.ACS_TECHNOLOGIES)}
                </li>
                <li>
                    ${EzIntegrationProviderId.ezToIntegrationProductName(EzIntegrationProviderId.ADP_WORKFORCE_NOW)}
                </li>
                <li>
                    ${EzIntegrationProviderId.ezToIntegrationProductName(EzIntegrationProviderId.GUSTO)}
                </li>
                <li>
                    ${EzIntegrationProviderId.ezToIntegrationProductName(EzIntegrationProviderId.PAYCHEX)}
                </li>
            </ul>`;

        return ezApi.ezTemplate`
            <div
                id="EzIntegrationAbsent"
                style="display:none">
                <div
                    class="ezH4">
                    Export ezClocker Employee Time
                </div>
                <p>
                    You can now export your employee's time data to the following
                    payroll applications:
                </p>
                ${availableIntegrationBullets}
                <p>
                    To setup your integration go to your account page and scroll to the
                    Integrations section. Once setup, your integration will appear
                    here.
                </p>
                <p>
                    <button id="accountSetupIntegrationButton"
                        title="Click to setup integration" class="actionButton">
                        Click Here to go to your Account page to get setup!
                    </button>
                </p>
            </div>`;
    }

    /**
        @protected @method
        Builds the employee export mode's HTML UX
        @returns {String}
     */
    ezBuildEmployeeExportModeHtml() {
        return ezApi.ezTemplate`
            <div
                id="EzEMPLOYEE_EXPORT_MODE"
                class="ezDialog-content"
                style="display:none">
                <div
                    class="ezH3">
                    Select Report Period
                </div>
                <div
                    class="ezAutoCol_AxA ezGrid-fullsize ezGridGap_8">
                    <div
                        class="ezContainer-labeled-input-vertical">
                        <label
                            for="EzEmployeeExportTimeSheetDialog_StartDate">
                            Period Start Date
                        </label>
                        <div
                            class="ezContainer-date-picker">
                            <input
                                id="EzEmployeeExportTimeSheetDialog_StartDate"
                                type="text"/>
                        </div>
                    </div>
                    <div
                        class="ezContainer-labeled-input-vertical">
                        <label
                            for="EzEmployeeExportTimeSheetDialog_EndDate">
                            Period End Date
                        </label>
                        <div
                            class="ezContainer-date-picker">
                            <input
                                id="EzEmployeeExportTimeSheetDialog_EndDate"
                                class="fullWidthEditor"
                                type="text" />
                        </div>
                    </div>
                </div>
            </div>`;
    }

    /**
        @protected @method
        Builds the available tabs and sets to EzwEmployerExportTimeSheetDialog.ezInstance.ezTabs
        @returns {object}
     **/
    ezBuildTabs() {
        let tabsInfo = {};

        // Selected employee tab
        let ezExportReportTabId = EzwEmployerExportTimeSheetDialog.ezInstance.ezTabIds[0];
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

        // All employees tab
        ezExportReportTabId = EzwEmployerExportTimeSheetDialog.ezInstance.ezTabIds[1];
        ezTabViewId = `${ezExportReportTabId}_View`;
        tabsInfo[ezExportReportTabId] = {
            id: ezExportReportTabId,
            tabViewId: ezTabViewId,
            caption: 'All Employees',
            tabGroup: 'exportReportTabs',
            visible: true,
            active: false,
            onBeforeActivate: null,
            onBeforeUnactivate: null,
            onActivated: null
        };

        // Jobs tab
        ezExportReportTabId = EzwEmployerExportTimeSheetDialog.ezInstance.ezTabIds[2];
        ezTabViewId = `${ezExportReportTabId}_View`;
        tabsInfo[ezExportReportTabId] = {
            id: ezExportReportTabId,
            tabViewId: ezTabViewId,
            caption: 'Jobs',
            tabGroup: 'exportReportTabs',
            visible: true,
            active: false,
            onBeforeActivate: null,
            onBeforeUnactivate: null,
            onActivated: null
        },

            // Integrations tab
            ezExportReportTabId = EzwEmployerExportTimeSheetDialog.ezInstance.ezTabIds[3];
        ezTabViewId = `${ezExportReportTabId}_View`;
        tabsInfo[ezExportReportTabId] = {
            id: ezExportReportTabId,
            tabViewId: ezTabViewId,
            caption: 'Integrations',
            tabGroup: 'exportReportTabs',
            visible: false,
            active: false,
            onBeforeActivate: EzwEmployerExportTimeSheetDialog.ezInstance.ezHandleEzEmployerIntegrationsViewBeforeActivate,
            onBeforeUnactivate: EzwEmployerExportTimeSheetDialog.ezInstance.ezHandleEzEmployerIntegrationsViewBeforeUnactivate,
            onActivated: null
        }

        return tabsInfo;
    }

    /**
        @protected @method
        Builds the views for each tab in EzwEmployerExportTimeSheetDialog.ezInstance.ezTabs
        @returns {object}
     */
    ezBuildTabViews() {
        let tabViewInfo = {};

        // Selected employee tab
        let ezExportReportTabId = EzwEmployerExportTimeSheetDialog.ezInstance.ezTabIds[0];
        let ezTabViewId = `${ezExportReportTabId}_View`;
        tabViewInfo[ezExportReportTabId] = {
            id: ezTabViewId,
            view: EzwEmployerExportTimeSheetDialog.ezInstance.ezBuildSelectedEmployeeTabViewHtml(ezTabViewId)
        };

        // All employees tab
        ezExportReportTabId = EzwEmployerExportTimeSheetDialog.ezInstance.ezTabIds[1];
        ezTabViewId = `${ezExportReportTabId}_View`;
        tabViewInfo[ezExportReportTabId] = {
            id: ezTabViewId,
            view: EzwEmployerExportTimeSheetDialog.ezInstance.ezBuildAllEmployeesTabViewHtml(ezTabViewId)
        };

        // Jobs tab
        ezExportReportTabId = EzwEmployerExportTimeSheetDialog.ezInstance.ezTabIds[2];
        ezTabViewId = `${ezExportReportTabId}_View`;
        tabViewInfo[ezExportReportTabId] = {
            id: ezTabViewId,
            view: EzwEmployerExportTimeSheetDialog.ezInstance.ezBuildJobsTabViewHtml(ezTabViewId)
        };

        // Integrations tab
        ezExportReportTabId = EzwEmployerExportTimeSheetDialog.ezInstance.ezTabIds[3];
        ezTabViewId = `${ezExportReportTabId}_View`;
        tabViewInfo[ezExportReportTabId] = {
            id: ezTabViewId,
            view: EzwEmployerExportTimeSheetDialog.ezInstance.ezBuildIntegrationsTabViewHtml(ezTabViewId)
        };

        return tabViewInfo;
    }
}
