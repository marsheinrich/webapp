import {
    EzBadParamException,
    EzBadStateException
} from '/ezlibrary/exceptions/EzExceptions.js';

import {
    EzObject,
    EzNumber,
    EzBoolean,
    EzString,
    EzArray,
    EzHtml,
    EzPromise,
    EzJson
} from '/ezlibrary/helpers/EzHelpers.js';

import {
    EzRegistrationState,
    EzClockerContextEventName,
    EzClockerFeature,
    EzElementEventName,
    EzAccountNavButtonActiveOption
} from '/ezlibrary/enums/EzEnumerations.js';

import { EzClass } from '/ezlibrary/EzClass.js';
import { EzEventEngine } from '/ezlibrary/ez-event-engine.js';
import { EzClockerContext } from '/ezlibrary/EzClockerContext/ez-context.js';

import { EzAnalyticsAndMetrics } from '/ezlibrary/analytics_metrics/EzAnalyticsAndMetrics.js';

import { EzHttpHelper } from '/public/javascript/common/ezclocker-http-helper.js';
import { EzNavigation } from '/public/javascript/common/ezclocker-navigation-helper.js';
import { EzTickerTimer } from '/public/javascript/common/ez-ticker-timer.js';

import { EzFeatureToggles } from '/ezlibrary/ez-feature-toggles2.js';
import { EzFeaturePackageManager } from '/ezlibrary/EzFeaturePackageManager.js';
import { EzEmployerOption } from '/ezlibrary/EzEmployerOption.js';
import { EzEmployerService } from '/secure/javascript/common/ezclocker-employer-services.js';
import { EzEmployeeService } from '/secure/javascript/services/ezclocker-employee-service.js';
import { EzEmployeeApi } from '/secure/javascript/common/ez-employee-api.js';
import { EzLocationService } from '/secure/javascript/services/ezclocker-location-service.js';
import { EzOptionsService } from '/public/javascript/services/ezclocker-options.js';
import { EzLicenseHelper } from '/secure/javascript/common/ezclocker-license-helper.js';

import { EzUI } from '/public/javascript/common/ezui.js';
import { EzSpinner } from '/public/webcomponents/spinner/EzSpinner.js';
import { EzDialogConfig } from '/ezlibrary/ux/dialogs/EzDialogConfig.js';

import { EzNovaIntegrationAuthenticationState } from '/secure/integrations/ez-integration-wizard-context.js';
import {
    EzNovaOAuthProviderId,
    EzIntegrationProviderId
} from '/secure/integrations/ez-integration-enums.js';

import { EzTeamChatDialog } from '/secure/widgets/EzTeamChatDialog/EzTeamChatDialog.js';

import { EzExportDialogMode } from '/secure/widgets/EzExportReportDialog/EzExportDialogMode.js';
import { EzExportAction } from '/secure/widgets/EzExportReportDialog/EzExportAction.js';
import { EzJobCodeDialog } from '/secure/widgets/EzJobCodeDialog/ez-jobcode-dialog.js';
import { EzNoAvailEmplDialog } from '/secure/employer/ez-no-available-employee-slots-dialog.js';
import { EzwEmployerExportTimeSheetDialog } from '/secure/widgets/EzExportReportDialog/ez-export-report-dialog.js';
import { EzEmployerTimesheetReportDialog } from '/secure/employer/employerDashboard-DownloadTimeSheet.js';
import { EzEmployeeDisplayController } from '/secure/employer/employerDashboard-DisplayEmployeeInfo.js';
import { EzWhoIsClockedInDialog } from '/secure/widgets/EzWhoIsClockedInDialog/EzWhoIsClockedInDialog.js';

import { EzHelp } from '/secure/widgets/EzHelp/EzHelp.js';
import { EzAccountNavButton } from '/secure/widgets/EzAccountNavButton/EzAccountNavButton.js';

/**
 * @class
 * @extends {EzClass}
 * @description
 * UX Controller for the Employer Dashboard
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 * Import with:
 *     import { EzEmployerDashboardController } from '/secure/employer/employer-dashboard-controller.js';
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 */
export class EzEmployerDashboardController extends EzClass {
    /**
     * @public @readonly @property
     * Gets the employer account missing error message.
     * @returns {string}
     */
    get EMPLOYER_ACCOUNT_MISSING_ERROR() {
        return EzString.em`
            EzClocker is currently unable to locate any employer accounts for your user.\n
            If you are positive you have an ezCLocker employer account then the ezClocker cloud services are not currently reachable or responding.
            Verify your local internet connection is still active. Otherwise, the ezClocker team is possibly deploying updates...or working up a sweat
            trying to diagnose and resolve an unexpected outage or failure.\n\n
            Please contact ezClocker suppoort a support@ezclocker.com if you need any additional information or assistance. When contact support,
            please provide what actions you were performing in ezClocker, any steps you followed. When sending an email, include any technical details
            about the error reported below (either copy+paste or include the screen shot).\n\n
            The ezClocker team appologizes for the disruption!
            Additional technical details: `;
    }

    /**
     * @public @readonly @property
     * Returns the name of the view for the feature toggle system.
     * @returns {string}
     */
    get ezFeatureViewName() {
        return 'employerDashboard';
    }

    /**
     * @public @readonly @property
     * Gets the employer dashboard HTML page id
     * @returns {string}
     */
    get ezDashboardPageContainerId() {
        return 'EzEmployerDashboardPage';
    }

    /**
     * @private @field
     * Stores the dashboard dependency ready flags
     * @type {object}
     */
    #ezDashboardDependencyReadyFlags = {
        userContextReady: false,
        selectedEmployerAccountReady: false,
        selectedEmployerLicenseReady: false,
        validLicenseReady: false,
        dashboardInitialized: false,
        featureTogglesReady: false,
        featurePackagesLoaded: false,
        ezDashboardDependenciesReady: () => {
            return EzEmployerDashboardController.ezInstance.ezDashboardDependencyReadyFlags.userContextReady &&
                EzEmployerDashboardController.ezInstance.ezDashboardDependencyReadyFlags.selectedEmployerAccountReady &&
                EzEmployerDashboardController.ezInstance.ezDashboardDependencyReadyFlags.selectedEmployerLicenseReady &&
                EzEmployerDashboardController.ezInstance.ezDashboardDependencyReadyFlags.validLicenseReady;
        },
        ezFeatureToggleDependenciesReady: () => {
            return EzEmployerDashboardController.ezInstance.ezDashboardDependencyReadyFlags.ezDashboardDependenciesReady() &&
                EzEmployerDashboardController.ezInstance.ezDashboardDependencyReadyFlags.dashboardInitialized &&
                EzEmployerDashboardController.ezInstance.ezDashboardDependencyReadyFlags.featureTogglesReady;
        },
        ezAccountRoleToggleDependenciesReady: () => {
            return EzEmployerDashboardController.ezInstance.ezDashboardDependencyReadyFlags.ezDashboardDependenciesReady() &&
                EzEmployerDashboardController.ezInstance.ezDashboardDependencyReadyFlags.dashboardInitialized;
        },
        ezFeaturePackageDependenciesReady: () => {
            return EzEmployerDashboardController.ezInstance.ezDashboardDependencyReadyFlags.ezDashboardDependenciesReady() &&
                EzEmployerDashboardController.ezInstance.ezDashboardDependencyReadyFlags.dashboardInitialized &&
                EzEmployerDashboardController.ezInstance.ezDashboardDependencyReadyFlags.featurePackagesLoaded;
        }
    };
    /**
     * @public @property @getter
     * Gets the dashboard dependency ready flags
     * @returns {object}
     */
    get ezDashboardDependencyReadyFlags() {
        return this.#ezDashboardDependencyReadyFlags;
    }
    /**
     * @public @property @setter
     * Sets the dashboard dependency ready flags
     * @param {object} ezDashboardDependencyReadyFlags
     */
    set ezDashboardDependencyReadyFlags(ezDashboardDependencyReadyFlags) {
        if (!EzObject.isValid(ezDashboardDependencyReadyFlags)) {
            throw new EzBadParamException(
                'ezDashboardDependencyReadyFlags',
                this,
                this.ezDashboardDependencyReadyFlags);
        }

        this.#ezDashboardDependencyReadyFlags = ezDashboardDependencyReadyFlags;
    }

    /**
     * @private @field
     * Stores the EmployerDashboardController's state flags
     * @tpe {object}
     */
    #ezStateFlags = {
        dashboardInitialized: false,
        eventsRegistered: false,
        wantEventsRegistered: false,
        dataInitialized: false,
        uxEventsHooked: false,
        uxRendered: false,
        uxInitialized: false,
        featureTogglesApplied: false,
        featurePackageTogglesApplied: false,
        accountRoleTogglesApplied: false,
        licenseTogglesApplied: false
    };
    /**
     * @public @property @getter
     * Gets the EmployerDashboardController's state flags
     * @returns {object}
     */
    get ezStateFlags() {
        return this.#ezStateFlags;
    }
    /**
     * @public @property @setter
     * Sets the EmployerDashboardController's state flags
     * @param {object} ezStateFlags
     */
    set ezStateFlags(ezStateFlags) {
        if (!EzObject.isValid(ezStateFlags)) {
            throw new EzBadParamException(
                'ezStateFlags',
                this,
                this.ezStateFlags);
        }

        this.#ezStateFlags = ezStateFlags;
    }

    /**
     * @private @field
     * Stores if the employer has enabled the recording of breaks (a value of true allows the selection
        of the Break time type in the add/update dialog)
     * @type {boolean}
     */
    #allowRecordingBreaks = false;
    /**
     * @public @getter @property
     * Gets if the employer has enabled the recording of breaks (a value of true allows the selection
        of the Break time type in the add/update dialog)
     * @returns {boolean}
     */
    get allowRecordingBreaks() {
        return this.#allowRecordingBreaks;
    }
    /**
     * @public @getter @property
     * Sets if the employer has enabled the recording of breaks (a value of true allows the selection
        of the Break time type in the add/update dialog)
     * @returns {boolean}
     */
    set allowRecordingBreaks(allowRecordingBreaks) {
        this.#allowRecordingBreaks = ezApi.ezIsTrue(allowRecordingBreaks);
    }

    /**
     * @private @field
     * Stores the array of known employers for the authenticated user
     * @type {array}
     */
    #knownEmployers = [];
    /**
     * @public @property @getter
     * Gets the array of known employers for the authenticated user
     * @returns {array}
     */
    get knownEmployers() {
        return this.#knownEmployers;
    }
    /**
     * @public @property @setter
     * Sets the array of known employers for the authenticated user
     * @returns {array}
     */
    set knownEmployers(knownEmployers) {
        this.#knownEmployers = EzArray.arrayOrEmpty(knownEmployers);
    }

    /**
     * @private @field
     * Stores the currently active employer account
     * @type {object}
     */
    #activeEmployer = null;
    /**
     * @public @property @getter
     * Gets the currently active employer account
     * @returns {object}
     */
    get activeEmployer() {
        return this.#activeEmployer;
    }
    /**
     * @public @property @setter
     * Sets the currently active employer account
     * @returns {object}
     */
    set activeEmployer(activeEmployer) {
        this.#activeEmployer = EzObject.assignOrNull(activeEmployer);
    }

    /**
     * @private @field
     * Stores the active employer account's id
     * @type {number}
     */
    #activeEmployerId = null;
    /**
     * @public @property @getter
     * Gets the active employer account's id
     * @returns {number}
     */
    get activeEmployerId() {
        return this.#activeEmployerId;
    }
    /**
     * @public @property @setter
     * Sets the active employer account's id
     * @returns {number}
     */
    set activeEmployerId(activeEmployerId) {
        this.#activeEmployerId = EzNumber.numberOrNull(activeEmployerId);
    }

    /**
     * @private @field
     * Stores the currently active (selected) employee account
     * @type {object}
     */
    #activeEmployee = null;
    /**
     * @public @property @getter
     * Gets the currently active (selected) employee account
     * @returns {object}
     */
    get activeEmployee() {
        return this.#activeEmployee;
    }
    /**
     * @public @property @setter
     * Sets the currently active (selected) employee account
     * @returns {object}
     */
    set activeEmployee(activeEmployee) {
        this.#activeEmployee = EzObject.assignOrNull(activeEmployee);
    }

    /**
     * @private @field
     * Stores active employee's total hours for currently selected time period
     * @type {string}
     */
    #activeEmployeePeriodTotal = '00:00';
    /**
     * @public @property @getter
     * Gets active employee's total hours for currently selected time period
     * @returns {string}
     */
    get activeEmployeePeriodTotal() {
        return this.#activeEmployeePeriodTotal;
    }
    /**
     * @public @property @setter
     * Sets active employee's total hours for currently selected time period
     * @returns {string}
     */
    set activeEmployeePeriodTotal(activeEmployeePeriodTotal) {
        this.#activeEmployeePeriodTotal = EzString.stringOrDefault(
            activeEmployeePeriodTotal,
            '00:00');
    }

    /**
     * @private @field
     * Stores the active employee's time entry locations for the time entries in the currently selected time period.
     * @type {array}
     */
    #activeEmployeeTimeEntryLocations = [];
    /**
     * @public @property @getter
     * Gets the active employee's time entry locations for the time entries in the currently selected time period.
     * @returns {array}
     */
    get activeEmployeeTimeEntryLocations() {
        return this.#activeEmployeeTimeEntryLocations;
    }
    /**
     * @public @property @setter
     * Sets the active employee's time entry locations for the time entries in the currently selected time period.
     * @returns {array}
     */
    set activeEmployeeTimeEntryLocations(activeEmployeeTimeEntryLocations) {
        this.#activeEmployeeTimeEntryLocations = EzArray.arrayOrEmpty(activeEmployeeTimeEntryLocations);
    }

    /**
     * @private @field
     * Stores the currently selected time period's start moment (date time)
     * @type {moment}
     */
    #periodStart = ezApi.ezclocker.ezDateTime.ezNowWithStartOfDay();
    /**
     * @public @property @getter
     * Gets the currently selected time period's start moment (date time)
     * @returns {moment}
     */
    get periodStart() {
        return this.#periodStart;
    }
    /**
     * @public @property @setter
     * Sets the currently selected time period's start moment (date time)
     * @returns {moment}
     */
    set periodStart(periodStart) {
        this.#periodStart = EzObject.assignOrDefault(
            periodStart,
            ezApi.ezclocker.ezDateTime.ezNowWithStartOfDay());
    }

    /**
     * @private @field
     * Stores the currently selected time period's end moment (date time)
     * @type {moment}
     */
    #periodEnd = ezApi.ezclocker.ezDateTime.ezNowWithEndOfDay();
    /**
     * @public @property @getter
     * Gets the currently selected time period's end moment (date time)
     * @returns {moment}
     */
    get periodEnd() {
        return this.#periodEnd;
    }
    /**
     * @public @property @setter
     * Sets the currently selected time period's end moment (date time)
     * @returns {moment}
     */
    set periodEnd(periodEnd) {
        this.#periodEnd = EzObject.assignOrDefault(
            periodEnd,
            ezApi.ezclocker.ezDateTime.ezNowWithEndOfDay());
    }

    /**
     * @private @field
     * Stores the currently selected time period's start date value for display
     * @type {string}
     */
    #periodStartDisplay = ezApi.ezclocker.ezDateTime.ezToDisplayDate(this.periodStart);
    /**
     * @public @property @getter
     * Gets the currently selected time period's start date value for display
     * @returns {string}
     */
    get periodStartDisplay() {
        return this.#periodStartDisplay;
    }
    /**
     * @public @property @setter
     * Sets the currently selected time period's start date value for display
     * @returns {string}
     */
    set periodStartDisplay(periodStartDisplay) {
        this.#periodStartDisplay = EzString.stringOrDefault(
            periodStartDisplay,
            ezApi.ezclocker.ezDateTime.ezToDisplayDate(this.periodStart));
    }

    /**
     * @private @field
     * Stores the currently selected time period's end date value for display
     * @type {string}
     */
    #periodEndDisplay = ezApi.ezclocker.ezDateTime.ezToDisplayDate(this.periodEnd);
    /**
     * @public @property @getter
     * Gets the currently selected time period's end date value for display
     * @returns {string}
     */
    get periodEndDisplay() {
        return this.#periodEndDisplay;
    }
    /**
     * @public @property @setter
     * Sets the currently selected time period's end date value for display
     * @returns {string}
     */
    set periodEndDisplay(periodEndDisplay) {
        this.#periodEndDisplay = EzString.stringOrDefault(
            periodEndDisplay,
            ezApi.ezclocker.ezDateTime.ezToDisplayDate(this.periodEnd));
    }

    /**
     * @private @field
     * Stores the add/edit time entries dialog mode
     * @type {string}
     */
    #ezDialogMode = 'ADD';
    /**
     * @public @property @getter
     * Gets the add/edit time entries dialog mode
     * @returns {string}
     */
    get ezDialogMode() {
        return this.#ezDialogMode;
    }
    /**
     * @public @property @setter
     * Sets the add/edit time entries dialog mode
     * @returns {string}
     */
    set ezDialogMode(ezDialogMode) {
        this.#ezDialogMode = EzString.stringOrDefault(ezDialogMode, 'ADD');
    }

    /**
     * @private @field
     * Stores if the license and role related features have been applied or not.
     * @type {boolean}
     */
    #ezFeaturesApplied = false;
    /**
     * @public @property @getter
     * Gets if the license and role related features have been applied or not.
     * @returns {boolean}
     */
    get ezFeaturesApplied() {
        return this.#ezFeaturesApplied;
    }
    /**
     * @public @property @setter
     * Sets if the license and role related features have been applied or not.
     * @returns {boolean}
     */
    set ezFeaturesApplied(ezFeaturesApplied) {
        this.#ezFeaturesApplied = EzBoolean.isTrue(ezFeaturesApplied);
    }

    /**
     * @protected
     * Initializes the ezEmployerDashboardController
     * @returns {EzEmployerDashboardController}
     */
    ezInit() {
        EzEmployerDashboardController.ezInstance.ezRegisterEvents();

        ezApi.ezclocker.ezSpinner.ezStartPageWaitUntilEvent(
            'Loading dashboard ...',
            EzEmployerDashboardController.ezEventNames.onEmployerDashboardControllerInitialized)
            .then(EzPromise.ignoreFinished);

        EzEmployerDashboardController.ezInstance.ezRegisterWantEvents();

        ezApi.ezclocker.ezLicenseHelper.ezHookLicenseEvents(
            EzEmployerDashboardController.ezApiName,
            // License valid handler
            () => {
                ezApi.ezclocker.ezLicenseHelper.ezUnhookLicenseEvents(EzEmployerDashboardController.ezApiName);

                EzEmployerDashboardController.ezInstance.ezDashboardDependencyReadyFlags.validLicenseReady = true;

                EzEmployerDashboardController.ezInstance.ezProcessReadyFlags()
                    .then(EzPromise.ignoreResolve);
            },
            // License expired handler (using default)
            null,
            // License error handler
            (eResponse) => {
                ezApi.ezclocker.ezLicenseHelper.ezUnhookLicenseEvents(
                    EzEmployerDashboardController.ezApiName);

                ezApi.ezclocker.ezLogger.error(
                    EzString.em`
                        Failed to obtain the employer's license.
                        Error: ${EzJson.toJson(eResponse.data)}`);

                ezApi.ezclocker.ezDialog.ezShowError(
                    'License Error',
                    eResponse.message);

                EzEmployerDashboardController.ezInstance.ezProcessReadyFlags()
                    .then(EzPromise.ignoreResolve);

                ezApi.ezclocker.ezNavigation.ezNavigateToEmployerAccountPage();
            },
            // Free trial expired handler (using default)
            null,
            // License violation (using default)
            null);

        EzEmployerDashboardController.ezInstance.ezProcessReadyFlags()
            .then(EzPromise.ignoreResolve);

        return EzEmployerDashboardController.ezInstance;
    }

    /**
     * @protected @method
     * Registers events triggered by EzEmployerDashboardController
     */
    ezRegisterEvents() {
        if (EzBoolean.isFalse(EzEmployerDashboardController.ezInstance.ezStateFlags.eventsRegistered)) {
            EzEmployerDashboardController.ezInstance.ezStateFlags.eventsRegistered = true;

            ezApi.ezclocker.ezEventEngine.ezRegisterEvent(
                EzEmployerDashboardController.ezApiName,
                EzEmployerDashboardController.ezEventNames.onEmployerDashboardControllerInitialized);
        }
    }

    /**
     * @protected @method
     * Registers want events for EzEmployerDashboardController
     */
    ezRegisterWantEvents() {
        if (EzBoolean.isFalse(EzEmployerDashboardController.ezInstance.ezStateFlags.wantEventsRegistered)) {
            EzEmployerDashboardController.ezInstance.ezStateFlags.wantEventsRegistered = true;

            // User context ready event hook
            ezApi.ezclocker.ezEventEngine.ezWantEventEx({
                eventName: EzClockerContextEventName.onUserContextReady,
                handlerName: EzEmployerDashboardController.ezApiName,
                handlerFunction: () => {
                    EzEmployerDashboardController.ezInstance.ezDashboardDependencyReadyFlags.userContextReady = true;

                    EzEmployerDashboardController.ezInstance.ezProcessReadyFlags()
                        .then(EzPromise.ignoreResolve);
                },
                options: {
                    immediateTriggerIfAlreadyTriggered: true,
                    unwantAfterFirstTrigger: true
                }
            });

            // Selected Employer License Ready Event Hook
            ezApi.ezclocker.ezEventEngine.ezWantEventEx({
                eventName: EzClockerContextEventName.onSelectedEmployerLicenseReady,
                handlerName: EzEmployerDashboardController.ezApiName,
                handlerFunction: () => {
                    EzEmployerDashboardController.ezInstance.ezDashboardDependencyReadyFlags.selectedEmployerLicenseReady = true;

                    ezApi.ezclocker.ezClockerContext.ezValidateSelectedEmployerAccountLicense();

                    EzEmployerDashboardController.ezInstance.ezProcessReadyFlags()
                        .then(EzPromise.ignoreResolve);
                }
            });

            // Selected Employer Account Ready Event Hook
            ezApi.ezclocker.ezEventEngine.ezWantEventEx({
                eventName: EzClockerContextEventName.onSelectedEmployerAccountReady,
                handlerName: EzEmployerDashboardController.ezApiName,
                handlerFunction: () => {
                    EzEmployerDashboardController.ezInstance.ezDashboardDependencyReadyFlags.selectedEmployerAccountReady = true;

                    EzEmployerDashboardController.ezInstance.ezProcessReadyFlags()
                        .then(EzPromise.ignoreResolve);
                }
            });

            // Feature Toggles Ready Event Hook
            ezApi.ezclocker.ezEventEngine.ezWantEventEx({
                eventName: EzFeatureToggles.ezEventNames.onFeatureTogglesReady,
                handlerName: EzEmployerDashboardController.ezApiName,
                handlerFunction: () => {
                    EzEmployerDashboardController.ezInstance.ezDashboardDependencyReadyFlags.featureTogglesReady = true;

                    EzEmployerDashboardController.ezInstance.ezProcessReadyFlags()
                        .then(EzPromise.ignoreResolve);
                },
                options: {
                    immediateTriggerIfAlreadyTriggered: true,
                    unwantAfterFirstTrigger: true
                }
            });

            if (EzBoolean.isFalse(ezApi.ezclocker.ezFeaturePackageManager.ezStateFlags.featurePackagesLoaded)) {
                // Feature packages loaded event hook
                ezApi.ezclocker.ezEventEngine.ezWantEvent(
                    EzFeaturePackageManager.ezEventNames.onFeaturePackagesLoaded,
                    EzEmployerDashboardController.ezApiName,
                    () => {
                        EzEmployerDashboardController.ezInstance.ezDashboardDependencyReadyFlags.featurePackagesLoaded = true;

                        EzEmployerDashboardController.ezInstance.ezProcessReadyFlags()
                            .then(EzPromise.ignoreResolve);
                    },
                    true);
            }

            // Selected Employer License Updated Event Hook
            ezApi.ezclocker.ezEventEngine.ezWantEventEx({
                eventName: EzClockerContextEventName.onSelectedEmployerLicenseUpdated,
                handlerName: EzEmployerDashboardController.ezApiName,
                handlerFunction: EzEmployerDashboardController.ezInstance.ezHandleOnSelectedEmployerLicenseUpdated
            });
        }
    }

    /**
     * @protected @method
     * Calls each type of ready flag processor methods
     * @returns {Promise.resolve}
     */
    ezProcessReadyFlags() {
        return EzEmployerDashboardController.ezInstance.ezProcessDashboardReadyFlags()
            .then(EzEmployerDashboardController.ezInstance.ezProcessFeatureToggleReadyFlags)
            .then(EzEmployerDashboardController.ezInstance.ezProcessAccountRoleToggleReadyFlags)
            .then(EzEmployerDashboardController.ezInstance.ezProcessFeaturePackageReadyFlags);
    }

    /**
     * @protected @method
     * Processes the dashboard ready flags and executes actions after the below conditions return true:
     *  1) false == EzEmployerDashboardController.ezInstance.ezStateFlags.dashboardInitialized
     *  2) true == EzEmployerDashboardController.ezInstance.ezDashboardDependencyReadyFlags.ezDashboardDependenciesReady()
     * @returns {Promise.resolve}
     */
    ezProcessDashboardReadyFlags() {
        return EzPromise.asyncAction(
            (finished) => {
                if (EzBoolean.isFalse(EzEmployerDashboardController.ezInstance.ezStateFlags.dashboardInitialized) &&
                    EzEmployerDashboardController.ezInstance.ezDashboardDependencyReadyFlags.ezDashboardDependenciesReady()) {
                    EzEmployerDashboardController.ezInstance.ezStateFlags.dashboardInitialized = true;

                    return EzEmployerDashboardController.ezInstance.ezInitData()
                        .then(
                            () => EzEmployerDashboardController.ezInstance.ezInitUX()
                                .then(
                                    () => {
                                        EzEmployerDashboardController.ezInstance.ezHandleOnSelectedEmployerLicenseReady();

                                        EzEmployerDashboardController.ezInstance.ezApplyLicenseFeatureToggles();

                                        ezApi.ezclocker.ezAnalyticsAndMetrics.ezAmplitudeIntegration.ezTrack('Employer Dashboard');

                                        if (!EzArray.arrayHasLength(ezApi.ezclocker.ezClockerContext.ezGetSelectedEmployerAccountEmployeeAccounts())) {
                                            EzEmployerDashboardController.ezInstance.ezShowDemoVideo();
                                        }

                                        EzEmployerDashboardController.ezInstance.ezDashboardDependencyReadyFlags.dashboardInitialized = true;

                                        ezApi.ezclocker.ezEventEngine.ezTriggerEvent(
                                            EzEmployerDashboardController.ezEventNames.onEmployerDashboardControllerInitialized,
                                            ezApi.ezclocker.ezEventEngine.ezBuildEventData(
                                                EzEmployerDashboardController.ezApiName,
                                                'Employer dashboard ready',
                                                EzEmployerDashboardController.ezInstance));

                                        return finished();
                                    }));
                }

                return finished();
            });
    }

    /**
     * @protected @method
     * Resets any toggles applied from the license
     * @returns {Promise.resolve}
     */
    ezResetLicenseToggles() {
        return EzPromise.asyncAction(
            (finished) => {
                ezApi.ezclocker.ezUi.ezHideElement('EzManageJobButton');

                ezApi.ezclocker.ezEventEngine.ezUnwantElementEvent(
                    'EzManageJobButton',
                    EzElementEventName.CLICK,
                    EzEmployerDashboardController.ezApiName);

                //hack. show team chat
                //ezApi.ezclocker.ezUi.ezHideElement('EzNavigationTeamChatButton');
                //
                // ezApi.ezclocker.ezEventEngine.ezUnwantElementEvent(
                //    'EzNavigationTeamChatButton',
                //    EzElementEventName.CLICK,
                //    EzEmployerDashboardController.ezApiName);

                return finished();
            });
    }

    /**
     * @protected @method
     * Applies the license feature toggles
     * @returns {Promise.resolve}
     */
    ezApplyLicenseFeatureToggles() {
        return EzPromise.asyncAction(
            (finished) => {
                if (EzBoolean.isFalse(EzEmployerDashboardController.ezInstance.ezStateFlags.licenseTogglesApplied)) {
                    EzEmployerDashboardController.ezInstance.ezStateFlags.licenseTogglesApplied = true;

                    return EzEmployerDashboardController.ezInstance.ezResetLicenseToggles()
                        .then(
                            () => {
                                if (ezApi.ezclocker.ezClockerContext.ezSelectedEmployerAccountFeatureEnabled(EzClockerFeature.EZ_JOBS)) {
                                    ezApi.ezclocker.ezEventEngine.ezWantElementEvent(
                                        'EzManageJobButton',
                                        EzElementEventName.CLICK,
                                        EzEmployerDashboardController.ezApiName,
                                        ezApi.ezclocker.ezJobCodeDialog.ezShow);

                                    ezApi.ezclocker.ezUi.ezShowElement('EzManageJobButton');
                                }

                                if (ezApi.ezclocker.ezClockerContext.ezSelectedEmployerAccountFeatureEnabled(EzClockerFeature.EZ_TEAM_CHAT)) {
                                    ezApi.ezclocker.ezEventEngine.ezWantElementEvent(
                                        'EzNavigationTeamChatButton',
                                        EzElementEventName.CLICK,
                                        EzEmployerDashboardController.ezApiName,
                                        () => ezApi.ezclocker.ezTeamChatDialog.ezShow(false));

                                    ezApi.ezclocker.ezUi.ezShowElement('EzNavigationTeamChatButton');
                                }

                                return finished();
                            });
                }

                return finished();
            });
    }

    /**
     * @protected @method
     * Resets the any toggles applied due to the authenticated account's role
     * @returns {Promise.resolve}
     */
    ezResetAccountRoleToggles() {
        return EzPromise.asyncAction(
            (finished) => {
                // Reset any toggles applied due to the authenticated account's role
                ezApi.ezclocker.ezUi.ezContent(
                    '_EmployerDashboardName',
                    'Employer Dashboard');

                ezApi.ezclocker.ezUi.ezShowElement('_EmployerDashboardName');

                return finished();
            });
    }

    /**
     * @protected @method
     * Processes ready check flags for account role feature toggles and executes actions when the following
     * evaluate to true:
     *  1) false == EzEmployerDashboardController.ezInstance.ezStateFlags.accountRoleTogglesApplied
     *  2) true == EzEmployerDashboardController.ezInstance.ezDashboardDependencyReadyFlags.ezAccountRoleToggleDependenciesReady()
     * @returns {Promise.resolve}
     */
    ezProcessAccountRoleToggleReadyFlags() {
        return EzPromise.asyncAction(
            (finished) => {
                let dashboardName = 'Dashboard';

                if (EzBoolean.isFalse(EzEmployerDashboardController.ezInstance.ezStateFlags.accountRoleTogglesApplied) &&
                    EzEmployerDashboardController.ezInstance.ezDashboardDependencyReadyFlags.ezAccountRoleToggleDependenciesReady()) {
                    EzEmployerDashboardController.ezInstance.ezStateFlags.accountRoleTogglesApplied = true;

                    return EzEmployerDashboardController.ezInstance.ezResetAccountRoleToggles()
                        .then(
                            () => {
                                // ROLE_EMPLOYER
                                if (ezApi.ezclocker.ezClockerContext.ezGetUserContext().isEmployer) {

                                    ezApi.ezclocker.ezUi.ezEnableElement('EzExportTimeSheetButton');

                                    ezApi.ezclocker.ezEventEngine.ezWantElementEvent(
                                        'EzExportTimeSheetButton',
                                        EzElementEventName.CLICK,
                                        EzEmployerDashboardController.ezApiName,
                                        EzEmployerDashboardController.ezInstance.ezShowExportTimeSheets);

                                    dashboardName = `Employer ${dashboardName}`;
                                }

                                // ROLE_PAYROLL_MANAGER
                                if (ezApi.ezclocker.ezClockerContext.ezGetUserContext().isPayrollManager) {
                                    ezApi.ezclocker.ezUi.ezEnableElement('EzExportTimeSheetButton');

                                    ezApi.ezclocker.ezEventEngine.ezWantElementEvent(
                                        'EzExportTimeSheetButton',
                                        EzElementEventName.CLICK,
                                        EzEmployerDashboardController.ezApiName,
                                        EzEmployerDashboardController.ezInstance.ezShowExportTimeSheets);

                                    dashboardName = `Payroll Manager ${dashboardName}`;
                                }

                                // ROLE_MANAGER
                                if (ezApi.ezclocker.ezClockerContext.ezGetUserContext().isManager) {
                                    ezApi.ezclocker.ezUi.ezEnableElement('EzExportTimeSheetButton');

                                    ezApi.ezclocker.ezEventEngine.ezWantElementEvent(
                                        'EzExportTimeSheetButton',
                                        EzElementEventName.CLICK,
                                        EzEmployerDashboardController.ezApiName,
                                        EzEmployerDashboardController.ezInstance.ezShowExportTimeSheets);

                                    dashboardName = `Manager ${dashboardName}`;
                                }

                                // All roles
                                ezApi.ezclocker.ezUi.ezContent(
                                    '_EmployerDashboardName',
                                    dashboardName);

                                ezApi.ezclocker.ezUi.ezShowElement('_EmployerDashboardName');

                                return finished();
                            });
                }

                return finished();
            });
    }

    /**
     * @protected @method
     * Resets any toggles applied by feature toggles
     * @returns {Promise.resolve}
     */
    ezResetFeatureToggles() {
        // No feature toggles to reset at this time
        return EzPromise.resolve();
    }

    /**
     * @protected @method
     * Processes the ready check flags for feature toggles and then executes actions when the following evaluate as true:
     *  1) false == EzEmployerDashboardController.ezInstance.ezStateFlags.featureTogglesApplied
     *  2) true == EzEmployerDashboardController.ezInstance.ezDashboardDependencyReadyFlags.ezFeatureToggleDependenciesReady()
     * @returns {Promise.resolve}
     */
    ezProcessFeatureToggleReadyFlags() {
        return EzPromise.asyncAction(
            (finished) => {
                if (EzBoolean.isFalse(EzEmployerDashboardController.ezInstance.ezStateFlags.featureTogglesApplied) &&
                    EzEmployerDashboardController.ezInstance.ezDashboardDependencyReadyFlags.ezFeatureToggleDependenciesReady()) {
                    EzEmployerDashboardController.ezInstance.ezStateFlags.featureTogglesApplied = true;

                    return EzEmployerDashboardController.ezInstance.ezResetFeatureToggles()
                        .then(
                            () => {
                                ezApi.ezclocker.ezFeatureToggles.ezApplyViewFeatureToggles(EzEmployerDashboardController.ezInstance.ezFeatureViewName);

                                return finished();
                            });
                }

                return finished();
            });
    }

    /**
     * @protected @method
     * Resets any toggles applied by the feature packages
     * @returns {Promise.resolve}
     */
    ezResetFeaturePackageToggles() {
        // No feature package toogles to reset at this time
        return EzPromise.resolve();
    }

    /**
     * @protected @method
     * Processes the ready check flags for feature package dependencies and executes actions when the following evalutes
     * as true:
     *  1) true == EzEmployerDashboardController.ezInstance.ezStateFlags.featurePackageTogglesApplied
     *  2) false == EzEmployerDashboardController.ezInstance.ezDashboardDependencyReadyFlags.ezFeaturePackagesReady()
     * @returns {Promise.resolve}
     */
    ezProcessFeaturePackageReadyFlags() {
        return EzPromise.asyncAction(
            (finished) => {
                if (EzBoolean.isFalse(EzEmployerDashboardController.ezInstance.ezStateFlags.featurePackageTogglesApplied) &&
                    EzEmployerDashboardController.ezInstance.ezDashboardDependencyReadyFlags.ezFeaturePackageDependenciesReady()) {
                    EzEmployerDashboardController.ezInstance.ezStateFlags.featurePackageTogglesApplied = true;

                    return EzEmployerDashboardController.ezInstance.ezResetFeaturePackageToggles()
                        .then(
                            () => ezApi.ezclocker.ezFeaturePackageManager.ezApplyFeaturePackageToggles()
                                .then(finished));
                }

                return finished();
            });
    }

    /**
     * @protected @method
     * Initializes any data needed during EzEmployerDashboardController initialization when the following is true:
     *  1) false == EzEmployerDashboardController.ezInstance.ezStateFlags.dataInitialized
     * @returns {Promise.resolve}
     */
    ezInitData() {
        return EzPromise.asyncAction(
            (finished) => {
                if (EzBoolean.isFalse(EzEmployerDashboardController.ezInstance.ezStateFlags.dataInitialized)) {
                    EzEmployerDashboardController.ezInstance.ezStateFlags.dataInitialized = true;

                    EzEmployerDashboardController.ezInstance.allowRecordingBreaks =
                        ezApi.ezclocker.ezOptionsService.ezOptionValueToBoolean(
                            ezApi.ezclocker.ezClockerContext.ezReadSelectedEmployerAccountOption(
                                ezApi.ezclocker.ezOptionsService.EZOPTION_ALLOW_RECORDING_OF_UNPAID_BREAKS,
                                EzEmployerOption.EZOPTION_VALUE_FALSE),
                            false);
                }

                return finished();
            });
    }

    /**
     * @protected @method
     * Initializes various UX elements for the employer dashboard when the following evalutes as true:
     *  1) false == EzEmployerDashboardController.ezInstance.ezStateFlags.uxInitialized
     * @returns {Promise.resolve}
     */
    ezInitUX() {
        return EzPromise.asyncAction(
            (finished) => {
                if (EzBoolean.booleanOrFalse(EzEmployerDashboardController.ezInstance?.ezAccountSuspended)) {
                    return Promise.resolve();
                }

                if (ezApi.ezclocker.ezClockerContext?.ezGetActiveEmployer() && 0 > ezApi.ezclocker.ezClockerContext.ezGetActiveEmployer()?.id) {
                    EzEmployerDashboardController.ezInstance.ezAccountSuspended = true;

                    globalThis.ezApi.ezclocker.ezDialog.ezShowErrorDialog(
                        'Account Suspended',
                        EzHtml.build`
                                    <p>
                                        Your account is currently suspended due to an unresolved subscription billing issue.
                                    </p>
                                    <p>
                                        Please contact the ezClocker support team at
                                        <a href="mailto:support@ezclocker.com">support@ezclocker.com</a>
                                        or call 1-800-769-8174 for help resolving the issue and re-enabling your account.
                                    </p>`)
                        .then(
                            () => ezApi.ezclocker.ezNavigation.ezSignOut());

                    return Promise.resolve();
                }


                if (EzEmployerDashboardController.ezInstance.ezStateFlags.uxInitialized) {
                    return finished();
                }

                ezApi.ezclocker.ezAccountNavButton.ezActiveOptionValue = EzAccountNavButtonActiveOption.ACCOUNT_OPTION;

                return EzEmployerDashboardController.ezInstance.ezRender()
                    .then(
                        () => ezApi.ezclocker.ezHelp.ezEnableHelp('EzShowHelpButton')
                            .then(
                                () => ezApi.ezclocker.ezFeaturePackageManager.ezApplyFeaturePackageToggles()
                                    .then(
                                        () => {
                                            EzEmployerDashboardController.ezInstance.ezStateFlags.uxInitialized = true;

                                            return finished();
                                        }),
                                finished));
            });
    }

    /**
     * @protected @method
     * Begins rendering of the employer dashboard when the following evalutes to true:
     *  1) true == EzObject.isValid(ezApi.ezclocker.ezClockerContext.ezGetSelectedEmployerAccount()
     *  2) false == EzEmployerDashboardController.ezInstance.ezStateFlags.uxRendered
     * Requires a valid selected employer account from the EzClockerContext
     * @returns {Promise.resolve}
     */
    ezRender() {
        if (!EzObject.isValid(ezApi.ezclocker.ezClockerContext.ezGetSelectedEmployerAccount())) {
            throw new EzBadStateException(
                'Expected a valid selected employer account instance from the EzClockerContext.',
                'The EzClockerContext returned an undefined or null selected employer instance.',
                this,
                this.ezRender);
        }

        return EzPromise.asyncAction(
            (finished) => {
                if (EzBoolean.isFalse(EzEmployerDashboardController.ezInstance.ezStateFlags.uxRendered)) {
                    EzEmployerDashboardController.ezInstance.ezStateFlags.uxRendered = true;

                    ezApi.ezclocker.ezUi.ezAppendContent(
                        'EzPageViewHeader',
                        EzEmployerDashboardController.ezInstance.ezBuildDashboardHeaderHtml());

                    ezApi.ezclocker.ezUi.ezContent(
                        '_EmployerNameCell',
                        EzEmployerDashboardController.ezInstance.ezBuildHeaderEmployerNameHtml());

                    ezApi.ezclocker.ezEmployerService.ezLoadEmployerImage(ezApi.ezclocker.ezClockerContext.ezGetSelectedEmployerAccount().id)
                        .then(
                            (imageUrl) => ezApi.ezclocker.ezUi.setImgElementSrc(
                                '_EmployerLogoImage',
                                imageUrl));

                    ezApi.ezclocker.ezUi.ezAppendContent(
                        'EzPageViewHeader',
                        EzEmployerDashboardController.ezInstance.ezBuildDashboardMenuHtml());

                    EzEmployerDashboardController.ezInstance.ezHookUxEvents();

                    ezApi.ezclocker.ezUi.ezShowElementAnimated(
                        EzEmployerDashboardController.ezInstance.ezDashboardPageContainerId,
                        'animate__fadeIn');

                    return finished();
                }

                return finished();
            });
    }

    /**
     * @protiected @method
     * Hooks any UX related events when the following evaluates as true:
     *  1) EzEmployerDashboardController.ezInstance.ezStateFlags.uxEventsHooked
     */
    ezHookUxEvents() {
        if (EzBoolean.isFalse(EzEmployerDashboardController.ezInstance.ezStateFlags.uxEventsHooked)) {
            EzEmployerDashboardController.ezInstance.ezStateFlags.uxEventsHooked = true;

            ezApi.ezclocker.ezEventEngine.ezWantElementEvent(
                '_NavSignout',
                EzElementEventName.CLICK,
                EzEmployerDashboardController.ezApiName,
                ezApi.ezclocker.ezNavigation.signOut);

            ezApi.ezclocker.ezEventEngine.ezWantElementEvent(
                '_NavSchedules',
                EzElementEventName.CLICK,
                EzEmployerDashboardController.ezApiName,
                ezApi.ezclocker.ezNavigation.ezNavigateToEmployerSchedules);

            ezApi.ezclocker.ezEventEngine.ezWantElementEvent(
                '_NavEmployeeArchive',
                EzElementEventName.CLICK,
                EzEmployerDashboardController.ezApiName,
                ezApi.ezclocker.ezNavigation.ezNavigateToEmployeeArchive);

            ezApi.ezclocker.ezEventEngine.ezWantElementEvent(
                'EzWhoIsClockedInButton',
                EzElementEventName.CLICK,
                EzEmployerDashboardController.ezApiName,
                EzEmployerDashboardController.ezInstance.ezHandleWhoIsClockedInButtonClick);
        }
    }

    /**
     * @protected @method
     * Handles the Who Is Clocked In button's click event
     */
    ezHandleWhoIsClockedInButtonClick() {
        ezApi.ezclocker.ezUi.ezDisableElement('EzWhoIsClockedInButton');

        ezApi.ezclocker.ezEventEngine.ezWantEvent(
            EzWhoIsClockedInDialog.ezEventNames.onClosed,
            EzEmployerDashboardController.ezApiName,
            () => {
                ezApi.ezclocker.ezUi.ezEnableElement('EzWhoIsClockedInButton');

                ezApi.ezclocker.ezEventEngine.ezUnwantEvent(
                    EzWhoIsClockedInDialog.ezEventNames.onClosed,
                    EzEmployerDashboardController.ezApiName);
            });

        ezApi.ezclocker.ezWhoIsClockedInDialog.ezShow();
    }

    /**
     * @protected @method
     * Navigates to the integrations wizard
     */
    ezShowIntegrationsWizard() {
        ezApi.ezclocker.ezNavigation.ezNavigateToSecurePage('integrations/');
    }

    /**
     * @public
     * Clears the selected employee
     */
    ezClearSelectedEmployee() {
        EzEmployerDashboardController.ezInstance.ezSetActiveEmployeeTimeEntryData();

        ezApi.ezclocker.ezClockerContext.ezSetActiveEmployee(-1);
    }

    /**
     * @protected
     * Shows the introduction demo video
     */
    ezShowDemoVideo() {
        const dialogId = 'EzDemoVideoDialog';

        // youtube.com video
        const videoUrl = 'https://www.youtube.com/embed/7gX3kNyVvMc';

        const videoWidth = '800';

        const videoHeight = '450';

        const allowProperty = 'accelerometer; autoplay; clipboard-write; encrypted-media; picture-in-picture';

        ezApi.ezclocker.ezUi.ezAppendContent(
            'body',
            EzHtml.build`
                <div
                    id="${dialogId}"
                    class="ezClockerDialog"
                    title="Getting Started">
                    <div
                        id="${dialogId}_LayoutContainer"
                        class="ezAutoCol_AxA">
                        <div
                            id="${dialogId}_EzDemoLeftCol">
                        </div>
                        <div
                            id="${dialogId}_EzDemoCenterCol">
                            <h1>
                                Thank you for choosing ezClocker!
                            </h1>
                            <p>
                                Watch the video below to learn how to get started using ezClocker.
                            </p>
                            <iframe
                                id="${dialogId}_EzDemoVideoIFrame"
                                width="${videoWidth}"
                                height="${videoHeight}"
                                src="${videoUrl}"
                                frameborder="0"
                                allow="${allowProperty}"
                                allowfullscreen>
                            </iframe>
                        </div>
                    </div>
                    <div
                        id="${dialogId}_EzDemoRightCol">
                    </div>
                </div>`);

        const overviewVideoDialogConfig = new EzDialogConfig(dialogId);

        overviewVideoDialogConfig.title = 'Getting Started';

        overviewVideoDialogConfig.width = 900;

        overviewVideoDialogConfig.minWidth = 900;

        overviewVideoDialogConfig.height = 675;

        overviewVideoDialogConfig.minHeight = 675;

        overviewVideoDialogConfig.resizable = false;

        overviewVideoDialogConfig.close = () => ezApi.ezclocker.ezDialog.ezCloseDestroyAndRemoveDialog(dialogId);

        overviewVideoDialogConfig.buttons = [
            {
                id: `${dialogId}_CloseButton`,
                text: 'Close',
                click: () => ezApi.ezclocker.ezDialog.ezCloseDialog(dialogId)
            }
        ];

        ezApi.ezclocker.ezDialog.ezInitDialogWithConfig(dialogId, overviewVideoDialogConfig);

        ezApi.ezclocker.ezDialog.ezShowDialog(dialogId);
    }

    /**
     * @protected
     * Shows the 'over view later' footer bar so new users can view the overview video at a later time.
     */
    ezShowOverViewLaterVideoFooter() {
        ezApi.ezclocker.ezUi.ezAppendContent(
            'body',
            EzHtml.build`
                <div
                    id="EzOverViewLaterBar"
                    class="ezFooter ezAlignRight">
                    <button
                        id="EzViewDemoButtonBtn"
                        class="ezEditButton">
                        View Demo Video
                    </button>
                </div>`);
    }

    /**
     * @public
     * Displays the employer's export time sheet dialog
     */
    ezShowExportTimeSheets() {
        const selectedPeriod = ezApi.ezclocker.ezClockerContext.ezGetActiveAccountSelectedPeriod();

        ezApi.ezclocker.ezwEmployerExportTimeSheetDialog.ezShow(
            EzExportDialogMode.EMPLOYER,
            selectedPeriod.ezPeriodStartMoment,
            selectedPeriod.ezPeriodEndMoment,
            EzExportAction.EXPORT_SELECTED_EMPLOYEE);
    }

    /**
     * @public
     * Launches the integration export wizard when the employer has already added an integration.
     * @returns {Promise}
     */
    ezGetActiveIntegration() {
        return EzPromise.promise(
            (resolve, reject) => {
                ezApi.ezclocker.ezHttpHelper.ezGet(
                    ezApi.ezclocker.ezNavigation.ezGetInternalApiUrl('integrations/active', 'v1'))
                    .then(
                        ezApi.ezclocker.ezHttpHelper.ezProcessApiResolve,
                        ezApi.ezclocker.ezHttpHelper.ezProcessApiReject)
                    .then(
                        resolve,
                        (eResponse) => {
                            ezApi.ezclocker.ezLogger.error(
                                EzString.em`
                                    Failed to obtain active integrations for the current employer.
                                    Error response: ${EzJson.toJson(eResponse)}`);
                            return reject(eResponse);
                        });
            });
    }

    /**
     * @public
     * Launches the primary time entry export integration.
     * @returns {Promise}
     */
    ezLaunchPrimaryTimeEntryExportIntegration() {
        return EzPromise.promise(
            (resolve, reject) => {
                const activeIntegrations = ezApi.ezclocker.ezClockerContext.ezGetActiveEmployer().activeIntegrations;

                if (!EzObject.isValid(activeIntegrations)) {
                    // Employer does not have any active integrations
                    return reject();
                }

                const primaryTimeEntryExportIntegrationMap = activeIntegrations.primaryIntegrations['TIME_ENTRY_EXPORT'];

                if (EzObject.isValid(primaryTimeEntryExportIntegrationMap)) {
                    return resolve(primaryTimeEntryExportIntegrationMap);
                }

                // Employer does not have a primary time entry export integration
                return reject();
            });
    }

    /**
     * @public
     * @param {Object} timeEntryIntegrationMap
     */
    ezLaunchTimeEntryExportIntegrationFromMap(exportTimeEntryIntegrationMap) {
        if (!EzObject.isValid(exportTimeEntryIntegrationMap)) {
            // nothing to launch
            return;
        }

        if (EzString.stringHasLength(exportTimeEntryIntegrationMap.integrationProviderId) &&
            !EzString.stringHasLength(exportTimeEntryIntegrationMap.integrationAuthType)) {
            exportTimeEntryIntegrationMap.integrationAuthType = EzIntegrationProviderId.ezGetIntegrationAuthTypeFromProviderId(
                exportTimeEntryIntegrationMap.integrationProviderId);
        }

        if (EzString.stringHasLength(exportTimeEntryIntegrationMap.integrationProviderId) &&
            !EzString.stringHasLength(exportTimeEntryIntegrationMap.authProviderId)) {
            exportTimeEntryIntegrationMap.authProviderId = EzNovaOAuthProviderId.ezFromEzIntegrationProviderId(
                exportTimeEntryIntegrationMap.integrationProviderId);
        }

        // Setting the context from the provided integration map
        ezApi.ezclocker.ezWizardCommon.ezWizardContext.ezInitializeWizardContext(
            {
                integrationProviderId: exportTimeEntryIntegrationMap.integrationProviderId,
                integrationType: exportTimeEntryIntegrationMap.integrationType,
                eznAuthType: exportTimeEntryIntegrationMap.integrationAuthType,
                authProviderId: exportTimeEntryIntegrationMap.authProviderId,
                integrationAuthenticationState: EzNovaIntegrationAuthenticationState.UNAUTHORIZED,
                integrationProviderConnectionId: null,
                integrationMessage: '',
                ezWizardPage: null
            },
            ezApi.ezclocker.ezWizardCommon.ezWizardContext);

        ezApi.ezclocker.ezWizardCommon.ezSaveActiveIntegrationCookies();

        ezApi.ezclocker.ezIntegrationWizardController.ezLoadIntegrationProviderWizard();
    }

    /**
     * @public
     * Launches the new Integration wizard
     */
    ezLaunchDefaultIntegrationWizard() {
        ezApi.ezclocker.ezWizardCommon.ezWizardContext.ezLoadEzWizardContextDefaults(
            ezApi.ezclocker.ezWizardCommon.ezWizardContext.ezWizardContextId);

        ezApi.ezclocker.ezWizardCommon.ezSaveActiveIntegrationCookies();

        ezApi.ezclocker.ezIntegrationWizardController.ezLoadIntegrationProviderWizard();
    }

    /**
     * @protected
     * Handles the EzClockerContext onSelectedEmployerAccountReady event.
     */
    ezHandleOnSelectedEmployerLicenseReady() {
        ezApi.ezclocker.ezClockerContext.ezValidateSelectedEmployerAccountLicense();
    }

    /**
     * @protected
     * Handles the EzClockerContext onSelectedEmployerLicenseUpdated event.
     */
    ezHandleOnSelectedEmployerLicenseUpdated() {
        // Reset license related ready and state flags
        EzEmployerDashboardController.ezInstance.ezDashboardDependencyReadyFlags.validLicenseReady = false;
        EzEmployerDashboardController.ezInstance.ezStateFlags.featurePackageTogglesApplied = false;
        EzEmployerDashboardController.ezInstance.ezStateFlags.licenseTogglesApplied = false;

        ezApi.ezclocker.ezLicenseHelper.ezHookLicenseEvents(
            EzEmployerDashboardController.ezApiName,
            // License valid handler
            () => {
                ezApi.ezclocker.ezLicenseHelper.ezUnhookLicenseEvents(EzEmployerDashboardController.ezApiName);

                EzEmployerDashboardController.ezInstance.ezDashboardDependencyReadyFlags.validLicenseReady = true;

                EzEmployerDashboardController.ezInstance.ezProcessReadyFlags()
                    .then(EzPromise.ignoreResolve);
            },
            // License expired handler (using default)
            null,
            // License error handler
            (eResponse) => {
                ezApi.ezclocker.ezLicenseHelper.ezUnhookLicenseEvents(EzEmployerDashboardController.ezApiName);

                ezApi.ezclocker.ezLogger.error(
                    EzString.em`
                        Failed to update the employer's license.
                        Error: ${EzJson.toJson(eResponse)}`);

                ezApi.ezclocker.ezDialog.ezShowError('License Error', eResponse.message);

                EzEmployerDashboardController.ezInstance.ezDashboardDependencyReadyFlags.validLicenseReady = false;

                EzEmployerDashboardController.ezInstance.ezProcessReadyFlags()
                    .then(EzPromise.ignoreResolve);
            },
            // Free trial expired handler (using default)
            null);

        ezApi.ezclocker.ezClockerContext.ezValidateSelectedEmployerAccountLicense();
    }

    /**
     * @protected @method
     * Builds the html for the header's employer name display
     * @returns {string}
     */
    ezBuildHeaderEmployerNameHtml() {
        return ezApi.ezclocker.ezUrlHelper.ezShowIds
            ? EzHtml.build`
                ${EzString.stringOrDefault(ezApi.ezclocker.ezClockerContext.ezGetSelectedEmployerAccount().employerName, 'Company Name')}
                <span
                    id="EzShowIds_EmployerIdSpan"
                    class="ezContainer-showids">
                    (${ezApi.ezclocker.ezClockerContext.ezGetSelectedEmployerAccount().id})
                </span>`
            : EzString.stringOrDefault(ezApi.ezclocker.ezClockerContext.ezGetSelectedEmployerAccount().employerName, 'Company Name');
    }

    /**
     * @protected @method
     * Builds the employer dashboard's header HTML
     * @returns {string}
     */
    ezBuildDashboardHeaderHtml() {
        return EzHtml.build`
            <div
                id="EzEmployeeSchedulePageViewHeader"
                class="ezHeader">
                <div
                    id="EzPageViewHeader_EmployerLogoContainer"
                    class="ezHeader-employer-logo-container">
                    <div
                        id="EmployerLogoImgContainer"
                        class="ezHeader-logo-image-container">
                        <img
                            id="_EmployerLogoImage"
                            class="ezHeader-employer-logo" alt=" "
                            src="/public/images/spinners/orange-spinner.gif" />
                    </div>
                    <div
                        id="_EmployerNameContainer"
                        class="ezAutoRow_A_A">
                        <div
                            id="_EmployerNameCell"
                            class="ezHeader-employer-name">
                        </div>
                        <div
                            id="_EmployerDashboardName"
                            class="ez-header-page-name-text"
                            style="display:none">
                        </div>
                    </div>
                </div>
                <div
                    id="EzPageViewHeader_NavigationButtons"
                    class="ezHeader-navigation-button-container">
                    <span
                        data-feature-package-id="ezFP_TEAM_CHAT"
                        data-feature-id="ezfTeamChat"
                        style="display:none">
                        <button
                            id="EzNavigationTeamChatButton"
                            class="ezHeaderButton">
                            Team Chat
                        </button>
                    </span>
                    <button
                        id="_NavDashboard"
                        class="ezHeaderButton"
                        disabled>
                        Dashboard
                    </button>
                    <button
                        id="_NavSchedules"
                        class="ezHeaderButton">
                        Schedules
                    </button>
                    <button
                        id="_NavEmployeeArchive"
                        class="ezHeaderButton">
                        Employee Archive
                    </button>
                    <button
                        id="EzShowHelpButton"
                        class="ezHeaderButton">
                        Help
                    </button>
                    <button
                        id="_NavSignout"
                        class="ezHeaderButton">
                        Sign Out
                    </button>
                </div>
            </div>`;
    }


    /**
     * @protected @method
     * Builds the employer dashboard's menu html
     * @returns {string}
     */
    ezBuildDashboardMenuHtml() {
        return EzHtml.build`
            <div
                id="EzEmployerMenu"
                class="ezClockerMainMenu2015 leftRightBottomShadow">
                <table
                    id="DashboardMenuTable"
                    style="width:100%">
                    <tr>
                        <td>
                            <div
                            id="EzSelectedEmployeeContainer">
                            </div>
                        </td>
                        <td
                            class="ezRightAlign ezMiddleAlign">
                            <span
                                data-feature-id="JOBS"
                                data-license-feature-id="JOBS"
                                style="display:none"
                                class="ezFeatureContainer">
                                <button
                                    id="EzManageJobButton"
                                    class="majorButton">
                                    Manage Jobs...
                                </button>
                            </span>
                            <button
                                id="EzWhoIsClockedInButton"
                                class="majorButton">
                                Who is Clocked In?
                            </button>
                            <button
                                id="EzExportTimeSheetButton"
                                class="majorButton"
                                disabled>
                                Export Time Sheets...
                            </button>
                        </td>
                    </tr>
                </table>
            </div>`;
    }

    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    // Class Initialization and EzApi Registration Section
    // !! DO NOT PLACE ANY non-initialization fields, getter/setter methods, static methods, or class methods beyond this section !!
    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

    /**
     * @static
     * @public @readonly @property
     * Gets the name of this class's singleton instance when registered with ezApi.
     * @returns {string}
     */
    static get ezApiName() {
        return 'ezEmployerDashboardController';
    }

    /**
     * @static
     * @public @readonly @property
     * Gets an object of event names that this class may trigger.
     * @returns {object}
     */
    static get ezEventNames() {
        return {
            onReady: 'ezOn_EzEmployerDashboardController_Ready',
            onEmployerDashboardControllerInitialized: 'ezOn_EmployerDashboardController_Initialized'
        };
    }

    /**
     * @static
     * @private @field
     * Stores the singleton instance of this class that was created by and registerd with EzApi.
     * @type {EzEmployerDashboardController}
     */
    static #ezInstance = globalThis?.ezApi?.ready && globalThis.ezApi?.ezclocker?.[EzEmployerDashboardController.ezApiName]
        ? globalThis.ezApi.ezclocker[EzEmployerDashboardController.ezApiName]
        : null;
    /**
     * @static
     * @public @property @getter
     * Gets the singleton instance of this class that is registered with EzApi (if available yet)
     * @returns {EzEmployerDashboardController}
     */
    static get ezInstance() {
        return EzEmployerDashboardController.#ezInstance;
    }
    /**
     * @static
     * @public @property @setter
     * Sets the singleton instance of of this class that is registered with EzApi.
     * @param {EzEmployerDashboardController} instance
     */
    static set ezInstance(instance) {
        if (null != EzEmployerDashboardController.#ezInstance) {
            throw new Error('EzEmployerDashboardController\'s singleton instance is already reigstered with EzApi.');
        }

        EzEmployerDashboardController.#ezInstance = instance;
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
    static #ezApiRegistrationState = globalThis?.ezApi?.ready && globalThis.ezApi?.ezclocker?.[EzEmployerDashboardController.ezApiName]
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
        return EzEmployerDashboardController.#ezApiRegistrationState;
    }
    /**
     * @static
     * @public @property @setter
     * Sets the ezApi registration state of this classes's singleton instance.
     * @param {string} ezApiRegistrationState
     * A valid enum property value from EzRegistrationState
     */
    static set ezApiRegistrationState(ezApiRegistrationState) {
        EzEmployerDashboardController.#ezApiRegistrationState = EzRegistrationState.ezValueOf(ezApiRegistrationState);
    }

    /**
     * @surpress
     * @static
     * @private @readonly @property
     * Gets true when all required dependencies for this class report ready.
     * In otherwords, the require dependency's singleton instance is created
     * and is registered with and accessable from EzApi with ezApi.ezclocker.{dependency_name}.
     * @returns {boolean}
     */
    static get #ezCanRegister() {
        return EzRegistrationState.PENDING === EzEmployerDashboardController.ezApiRegistrationState &&
            globalThis?.ezApi?.ready && globalThis.ezApi?.ezclocker &&
            globalThis.ezApi.ezclocker?.[EzEventEngine.ezApiName]?.ready &&
            globalThis.ezApi.ezclocker?.[EzHttpHelper.ezApiName]?.ready &&
            globalThis.ezApi.ezclocker?.[EzNavigation.ezApiName]?.ready &&
            globalThis.ezApi.ezclocker?.[EzTickerTimer.ezApiName]?.ready &&
            globalThis.ezApi.ezclocker?.[EzClockerContextEventName.ezApiName]?.ready &&
            globalThis.ezApi.ezclocker?.[EzClockerContext.ezApiName]?.ready &&
            globalThis.ezApi.ezclocker?.[EzEmployerService.ezApiName]?.ready &&
            globalThis.ezApi.ezclocker?.[EzEmployeeService.ezApiName]?.ready &&
            globalThis.ezApi.ezclocker?.[EzEmployeeApi.ezApiName]?.ready &&
            globalThis.ezApi.ezclocker?.[EzLocationService.ezApiName]?.ready &&
            globalThis.ezApi.ezclocker?.[EzLicenseHelper.ezApiName]?.ready &&
            globalThis.ezApi.ezclocker?.[EzOptionsService.ezApiName]?.ready &&
            globalThis.ezApi.ezclocker?.[EzFeatureToggles.ezApiName]?.ready &&
            globalThis.ezApi.ezclocker?.[EzFeaturePackageManager.ezApiName]?.ready &&
            globalThis.ezApi.ezclocker?.[EzUI.ezApiName]?.ready &&
            globalThis.ezApi.ezclocker?.[EzSpinner.ezApiName]?.ready &&
            globalThis.ezApi.ezclocker?.[EzAnalyticsAndMetrics.ezApiName]?.ready &&
            globalThis.ezApi.ezclocker?.[EzJobCodeDialog.ezApiName]?.ready &&
            globalThis.ezApi.ezclocker?.[EzNoAvailEmplDialog.ezApiName]?.ready &&
            globalThis.ezApi.ezclocker?.[EzWhoIsClockedInDialog.ezApiName]?.ready &&
            globalThis.ezApi.ezclocker?.[EzEmployerTimesheetReportDialog.ezApiName]?.ready &&
            globalThis.ezApi.ezclocker?.[EzwEmployerExportTimeSheetDialog.ezApiName]?.ready &&
            globalThis.ezApi.ezclocker?.[EzEmployeeDisplayController.ezApiName]?.ready &&
            globalThis.ezApi.ezclocker?.[EzTeamChatDialog.ezApiName]?.ready &&
            globalThis.ezApi.ezclocker?.[EzHelp.ezApiName]?.ready &&
            globalThis.ezApi.ezclocker?.[EzAccountNavButton.ezApiName]?.ready;
    }

    /**
     * @static
     * @private @readonly @property
     * Gets if this class's singleton instance is registered with ezApi yet.
     * @returns {boolean}
     */
    static get #ezIsRegistered() {
        return null != EzEmployerDashboardController.ezInstance &&
            EzRegistrationState.REGISTERED === EzEmployerDashboardController.ezApiRegistrationState;
    }

    /**
     * @static
     * @private @method
     * Attempts to register the singleton instance for this class with ezApi. Returns true
     * if successful, false otherwise.
     * @returns {boolean}
     */
    static #ezRegistrator() {
        if (EzEmployerDashboardController.#ezCanRegister && !EzEmployerDashboardController.#ezIsRegistered) {
            globalThis.ezApi.ezRegisterNewApi(EzEmployerDashboardController, EzEmployerDashboardController.ezApiName);
        }

        return EzEmployerDashboardController.#ezIsRegistered;
    }

    /**
     * @static
     * Static Initialization
     * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
     * >> IMPORTANT <<
     * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
     * Make sure the following properties and methods get defined BEFORE this static initialization section:
     *     1) Property getter EzEmployerDashboardController.ezApiName
     *     2) Property getter EzEmployerDashboardController.ezEventNames
     *     3) Property getter EzEmployerDashboardController.ezInstance
     *     4) Property setter EzEmployerDashboardController.ezInstance
     *     5) Property getter EzEmployerDashboardController.ezApiRegistrationState
     *     6) Property setter EzEmployerDashboardController.ezApiRegistrationState
     *     7) Property getter EzEmployerDashboardController.#ezCanRegister
     *     8) Property getter EzEmployerDashboardController.#ezIsRegistered
     *     9) Method EzEmployerDashboardController.#ezRegistrator()
     */
    static {
        if (!EzEmployerDashboardController.#ezIsRegistered) {
            EzEmployerDashboardController.ezApiRegistrationState = EzRegistrationState.PENDING;

            if (!EzEmployerDashboardController.#ezRegistrator()) {
                document.addEventListener(
                    EzEmployerDashboardController.ezOnEzApiReadyEventName,
                    EzEmployerDashboardController.#ezRegistrator);

                document.addEventListener(
                    EzEventEngine.ezEventNames.onReady,
                    EzEmployerDashboardController.#ezRegistrator);

                document.addEventListener(
                    EzNavigation.ezEventNames.onReady,
                    EzEmployerDashboardController.#ezRegistrator);

                document.addEventListener(
                    EzHttpHelper.ezEventNames.onReady,
                    EzEmployerDashboardController.#ezRegistrator);

                document.addEventListener(
                    EzTickerTimer.ezEventNames.onReady,
                    EzEmployerDashboardController.#ezRegistrator);

                document.addEventListener(
                    EzClockerContextEventName.ezEventNames.onReady,
                    EzEmployerDashboardController.#ezRegistrator);

                document.addEventListener(
                    EzClockerContext.ezEventNames.onReady,
                    EzEmployerDashboardController.#ezRegistrator);

                document.addEventListener(
                    EzEmployerService.ezEventNames.onReady,
                    EzEmployerDashboardController.#ezRegistrator);

                document.addEventListener(
                    EzEmployeeService.ezEventNames.onReady,
                    EzEmployerDashboardController.#ezRegistrator);

                document.addEventListener(
                    EzEmployeeApi.ezEventNames.onReady,
                    EzEmployerDashboardController.#ezRegistrator);

                document.addEventListener(
                    EzLocationService.ezEventNames.onReady,
                    EzEmployerDashboardController.#ezRegistrator);

                document.addEventListener(
                    EzOptionsService.ezEventNames.onReady,
                    EzEmployerDashboardController.#ezRegistrator);

                document.addEventListener(
                    EzLicenseHelper.ezEventNames.onReady,
                    EzEmployerDashboardController.#ezRegistrator);

                document.addEventListener(
                    EzFeaturePackageManager.ezEventNames.onReady,
                    EzEmployerDashboardController.#ezRegistrator);

                document.addEventListener(
                    EzFeatureToggles.ezEventNames.onReady,
                    EzEmployerDashboardController.ezRegistrator);

                document.addEventListener(
                    EzUI.ezEventNames.onReady,
                    EzEmployerDashboardController.#ezRegistrator);

                document.addEventListener(
                    EzSpinner.ezEventNames.onReady,
                    EzEmployerDashboardController.#ezRegistrator);

                document.addEventListener(
                    EzAnalyticsAndMetrics.ezEventNames.onReady,
                    EzEmployerDashboardController.#ezRegistrator);

                document.addEventListener(
                    EzJobCodeDialog.ezEventNames.onReady,
                    EzEmployerDashboardController.#ezRegistrator);

                document.addEventListener(
                    EzNoAvailEmplDialog.ezEventNames.onReady,
                    EzEmployerDashboardController.#ezRegistrator);

                document.addEventListener(
                    EzWhoIsClockedInDialog.ezEventNames.onReady,
                    EzEmployerDashboardController.#ezRegistrator);

                document.addEventListener(
                    EzEmployerTimesheetReportDialog.ezEventNames.onReady,
                    EzEmployerDashboardController.#ezRegistrator);

                document.addEventListener(
                    EzEmployerTimesheetReportDialog.ezEventNames.onReady,
                    EzEmployerDashboardController.#ezRegistrator);

                document.addEventListener(
                    EzwEmployerExportTimeSheetDialog.ezEventNames.onReady,
                    EzEmployerDashboardController.#ezRegistrator);

                document.addEventListener(
                    EzHelp.ezEventNames.onReady,
                    EzEmployerDashboardController.#ezRegistrator);

                document.addEventListener(
                    EzAccountNavButton.ezEventNames.onReady,
                    EzEmployerDashboardController.#ezRegistrator);
            }
        }
    }

    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    // !! DO NOT PLACE ANY non-initialization fields, getter/setter methods, static methods, or class methods beyond above section !!
    // NO CODE AFTER THIS SECTION
    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
}
