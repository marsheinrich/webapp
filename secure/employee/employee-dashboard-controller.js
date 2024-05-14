import {
    EzBadParamException
} from '/ezlibrary/exceptions/EzExceptions.js';

import {
    EzObject,
    EzBoolean,
    EzString,
    EzPromise,
    EzJson,
    EzHtml
} from '/ezlibrary/helpers/EzHelpers.js';

import { EzClass } from '/ezlibrary/EzClass.js';

import {
    EzDataTagMap,
    EzTimeEntry,
} from '/ezlibrary/entities/EzEntities.js';

import {
    EzRegistrationState,
    EzElementEventName,
    EzUserPermissionType,
    EzClockerContextEventName,
    EzEmployeeBreakMode,
    EzEmployeeDashboardMode,
    EzFeaturePackageId,
    EzLicenseFeatureId
} from '/ezlibrary/enums/EzEnumerations.js';

import { EzClockerContext } from '/ezlibrary/EzClockerContext/ez-context.js';

import { EzNavigation } from '/public/javascript/common/ezclocker-navigation-helper.js';
import { EzEmployerService } from '/secure/javascript/common/ezclocker-employer-services.js';
import { EzOptionsService } from '/public/javascript/services/ezclocker-options.js';

import { EzEmployerOption } from '/ezlibrary/EzEmployerOption.js';
import { EzFeatureToggles } from '/ezlibrary/ez-feature-toggles2.js';
import { EzFeaturePackageManager } from '/ezlibrary/EzFeaturePackageManager.js';

import { EzUI } from '/public/javascript/common/ezui.js';

import { EzAnalyticsAndMetrics } from '/ezlibrary/analytics_metrics/EzAnalyticsAndMetrics.js';

import { EzClockInClockOutHelper } from '/secure/javascript/common/ez-clockin-clockout-helper.js';

import { EzTimeAddEditDialogViewConfiguration } from '/secure/widgets/EzTimeAddEditDialog/EzTimeAddEditDialogViewConfiguration.js';
import { EzTimeAddEditDialogController } from '/secure/widgets/EzTimeAddEditDialog/EzTimeAddEditDialogController.js';
import { EzwEmployerExportTimeSheetDialog } from '/secure/widgets/EzExportReportDialog/ez-export-report-dialog.js';

import { EzBreakInBreakOutHelper } from '/secure/employee/EzBreakInBreakOutHelper.js';
import { EzEmployeeDashboardView } from '/secure/employee/employeeDashboard-DisplayEmployeeInfo.js';
import { EzPayPeriod } from "/ezlibrary/enums/EzPayPeriod";

import { EzTeamChatDialog } from '/secure/widgets/EzTeamChatDialog/EzTeamChatDialog.js';

/**
 * @class
 * @extends {EzClass}
 * @description
 * Employee Dashboard Page Controller
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 * Import with:
 * import { EzEmployeeDashboardController } from '/secure/employee/employee-dashboard-controller.js';
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 * Check ready state with:
 *      globalThis.ezApi?.ezclocker?.[EzEmployeeDashboardController.ezApiName]
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 * Singleton instance from within the EzEmployeeDashboardController class:
 *      EzEmployeeDashboardController.ezInstance
 * Singleton instance from outside the EzEmployeeDashboardController class:
 *      ezApi.ezclocker.ezEmployeeDashboardController
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 */
export class EzEmployeeDashboardController extends EzClass {
    /**
     * @private @field
     * Stores the EzEmployeeDashboardMode
     * Default: EzEmployeeDashboardMode.EMPLOYEE
     * @type {string}
     * A valid enumeration property value from EzEmployeeDashboardMode
     */
    #ezEmployeeDashboardMode = EzEmployeeDashboardMode.EMPLOYEE;
    /**
     * @public @property @getter
     * Gets the EzEmployeeDashboardMode
     * @returns {string}
     * A valid enumeration property value from EzEmployeeDashboardMode
     */
    get ezEmployeeDashboardMode() {
        return this.#ezEmployeeDashboardMode;
    }
    /**
     * @public @property @setter
     * Sets the EzEmployeeDashboardMode
     * @param {string} ezEmployeeDashboardMode
     * A valid enumeration property value from EzEmployeeDashboardMode
     */
    set ezEmployeeDashboardMode(ezEmployeeDashboardMode = EzEmployeeDashboardMode.EMPLOYEE) {
        ezEmployeeDashboardMode = EzEmployeeDashboardMode.ezAsEnum(ezEmployeeDashboardMode)

        this.#ezEmployeeDashboardMode = EzEmployeeDashboardMode.UNKNOWN !== ezEmployeeDashboardMode
            ? ezEmployeeDashboardMode
            : EzEmployeeDashboardMode.EMPLOYEE;
    }

    /**
     * @private @field
     * Stores the current employee's break mode
     * @type {string}
     * A valid enumeration property value from EzEmployeeBreakMode
     */
    #ezEmployeeBreakMode = EzEmployeeBreakMode.CLOCK_IN;
    /**
     * @public @property @getter
     * Gets the current employee's break mode
     * @returns {string}
     * A valid enumeration property value from EzEmployeeBreakMode
     */
    get ezEmployeeBreakMode() {
        return this.#ezEmployeeBreakMode;
    }
    /**
     * @public @property @setter
     * Sets the current employee's break mode
     * @param {string} ezEmployeeBreakMode
     * A valid enumeration property value from EzEmployeeBreakMode
     */
    set ezEmployeeBreakMode(ezEmployeeBreakMode) {
        this.#ezEmployeeBreakMode = EzEmployeeBreakMode.ezAsEnum(ezEmployeeBreakMode);
    }

    /**
     * @private @field
     * Stores the employee dashboard's ready flags
     * @returns {object}
     */
    #ezReadyFlags = {
        activeEmployeeReady: false,
        activeEmployerReady: false,
        employeeContextReady: false,
        personalContextReady: false,
        personalEmployerIdReady: false,
        featureTogglesReady: false,
        accountRoleTogglesReady: false,
        featurePackagesReady: false,
        ezEmployeeDashboardReady() {
            return EzEmployeeDashboardController.ezInstance.ezReadyFlags.activeEmployeeReady &&
                EzEmployeeDashboardController.ezInstance.ezReadyFlags.activeEmployerReady &&
                EzEmployeeDashboardController.ezInstance.ezReadyFlags.employeeContextReady;
        },
        ezPersonalDashboardReady() {
            return EzEmployeeDashboardController.ezInstance.ezReadyFlags.activeEmployeeReady &&
                EzEmployeeDashboardController.ezInstance.ezReadyFlags.activeEmployerReady &&
                EzEmployeeDashboardController.ezInstance.ezReadyFlags.personalContextReady &&
                EzEmployeeDashboardControl67yler.ezInstance.ezReadyFlags.personalEmployerIdReady;
        },
        ezDashboardReady() {
            return EzEmployeeDashboardController.ezInstance.ezReadyFlags.ezEmployeeDashboardReady() ||
                EzEmployeeDashboardController.ezInstance.ezReadyFlags.ezPersonalDashboardReady();
        },
        ezAccountRoleTogglesReady() {
            return EzEmployeeDashboardController.ezInstance.ezReadyFlags.accountRoleTogglesReady &&
                EzEmployeeDashboardController.ezInstance.ezReadyFlags.ezDashboardReady();
        },
        ezFeatureTogglesReady() {
            return EzEmployeeDashboardController.ezInstance.ezReadyFlags.featureTogglesReady &&
                EzEmployeeDashboardController.ezInstance.ezReadyFlags.ezDashboardReady();
        },
        ezFeaturePackagesReady() {
            return EzEmployeeDashboardController.ezInstance.ezReadyFlags.featurePackagesReady &&
                EzEmployeeDashboardController.ezInstance.ezReadyFlags.ezDashboardReady();
        }
    };
    /**
     * @public @property @getter
     * Gets the employee dashboard's ready flags
     * @returns {object}
     */
    get ezReadyFlags() {
        return this.#ezReadyFlags;
    }
    /**
     * @public @property @setter
     * Sets the employee dashboard's ready flags
     * @param {object} readyFlags
     */
    set ezReadyFlags(readyFlags) {
        if (!EzObject.isValid(readyFlags)) {
            throw new EzBadParamException(
                'readyFlags',
                this,
                'set ezReadyFlags(readyFlags)');
        }

        this.#ezReadyFlags = readyFlags;
    }

    /**
     * @private @field
     * Stores the EmployerDashboardController's state flags
     * @tpe {object}
     */
    #ezStateFlags = {
        dashboardInitialized: false,
        employeeDashboardInitialized: false,
        personalDashboardInitialized: false,
        eventsRegistered: false,
        wantEventsRegistered: false,
        dataInitialized: false,
        uxEventsHooked: false,
        uxRendered: false,
        uxInitialized: false,
        accountRoleTogglesApplied: false,
        licenseTogglesApplied: false,
        featureTogglesApplied: false,
        featurePackageTogglesApplied: false
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
     * @param {object} stateFlags
     */
    set ezStateFlags(stateFlags) {
        if (!EzObject.isValid(stateFlags)) {
            throw new EzBadParamException(
                'ezStateFlags',
                this,
                'set ezStateFlags(stateFlags)');
        }

        this.#ezStateFlags = stateFlags;
    }

    /**
     * @public @readonly @property
     * Returns the feature toggle name for this view
     * @returns {string}
     */
    get ezFeatureViewName() {
        return 'employeeDashboard';
    }

    /**
     * @public @readonly @property
     * Returns the first day of the week as defined by
     * option EZOPTION_EMPLOYER_SCHEDULE_START_DAY.
     * @returns {number}
     */
    get ezScheduleStartDay() {
        return ezApi.ezclocker.ezOptionsService.ezOptionValueToNumber(
            ezApi.ezclocker.ezClockerContext.ezReadActiveAccountOption(
                EzEmployerOption.EZOPTION_EMPLOYER_SCHEDULE_START_DAY,
                EzEmployerOption.EZOPTION_VALUE_FALSE),
            0);
    }

    /**
     * @public @readonly @property
     * Gets if the employer has disallowed clock-in, or clock-out actions in the employee dashboard
     * as defined by EzUserPermissionType.DISALLOW_EMPLOYEE_WEB_TIMEENTRY
     * @returns {boolean}
     */
    get ezDisallowWebTimeEntry() {
        return EzBoolean.booleanOrFalse(
            ezApi.ezclocker.ezClockerContext.ezGetSelectedEmployeePermission(
                EzUserPermissionType.DISALLOW_EMPLOYEE_WEB_TIMEENTRY)
                ?.enabled);
    }

    /**
     * @public @readonly @property
     * Gets if the employer has disallowed manually adding new time entries in the employee dashboard
     * as defined by EzUserPermissionType.DISALLOW_WEB_ADD_TIMEENTRY
     * @returns {boolean}
     */
    get ezDisallowWebAddTimeEntry() {
        return EzBoolean.booleanOrFalse(
            ezApi.ezclocker.ezClockerContext.ezGetSelectedEmployeePermission(
                EzUserPermissionType.DISALLOW_WEB_ADD_TIMEENTRY)
                ?.enabled);
    }

    /**
     * @public @readonly @property
     * Returns if the employee is allowed to edit their time sheet as
     * defined by option EZOPTION_EMPLOYER_DISABLE_TIME_ENTRY_EDITING.
     * @returns {boolean}
     */
    get ezAllowEditTimeSheet() {
        return !EzBoolean.booleanOrFalse(
            ezApi.ezclocker.ezOptionsService.ezOptionValueToBoolean(
                ezApi.ezclocker.ezClockerContext.ezReadActiveEmployerOption(
                    EzEmployerOption.EZOPTION_EMPLOYER_DISABLE_TIME_ENTRY_EDITING,
                    EzEmployerOption.EZOPTION_VALUE_FALSE),
                false));
    }

    /**
     * @public @readonly @property
     * Gets if the employer allows the employee to record unpaid breaks.
     * @returns {boolean}
     * @deprecated
     * Migrate to:
     *      ezApi.ezclocker.ezBreakInBreakOutHelper.ezAllowUnpaidBreaks
     */
    get ezAllowUnpaidBreaks() {
        return ezApi.ezclocker.ezBreakInBreakOutHelper.ezAllowUnpaidBreaks;
    }

    /**
     * @public @method
     * Initializes EzEmployeeDashboardController
     * @returns {EzEmployeeDashboardController}
     */
    ezInit() {
        EzEmployeeDashboardController.ezInstance.ezRegisterEvents();

        ezApi.ezclocker.ezSpinner.ezStartPageWaitUntilEvent(
            'Loading your dashboard ...',
            EzEmployeeDashboardController.ezEventNames.onInitialized);

        EzEmployeeDashboardController.ezInstance.ezRegisterWantEvents();

        EzEmployeeDashboardController.ezInstance.ezProcessReadyFlags()
            .then(EzPromise.ignoreResolve);

        return EzEmployeeDashboardController.ezInstance;
    }

    /**
     * @public @method
     * Registers events triggered by EzEmployeeDashboardController
     */
    ezRegisterEvents() {
        ezApi.ezclocker.ezEventEngine.ezRegisterEvent(
            EzEmployeeDashboardController.ezApiName,
            EzEmployeeDashboardController.ezEventNames.onInitialized);

        ezApi.ezclocker.ezEventEngine.ezRegisterEvent(
            EzEmployeeDashboardController.ezApiName,
            EzEmployeeDashboardController.ezEventNames.onEmployeeDashboardReady);

        ezApi.ezclocker.ezEventEngine.ezRegisterEvent(
            EzEmployeeDashboardController.ezApiName,
            EzEmployeeDashboardController.ezEventNames.onPersonalDashboardReady);
    }

    /**
     * @public @method
     * Registers want events for EzEmployeeDashboardController
     */
    ezRegisterWantEvents() {
        // Feature Toggles Ready Event Hook
        ezApi.ezclocker.ezEventEngine.ezWantEventEx({
            eventName: EzFeatureToggles.ezEventNames.onFeatureTogglesReady,
            handlerName: EzEmployeeDashboardController.ezApiName,
            handlerFunction: () => {
                EzEmployeeDashboardController.ezInstance.ezReadyFlags.featureTogglesReady = true;

                EzEmployeeDashboardController.ezInstance.ezProcessReadyFlags()
                    .then(EzPromise.ignoreResolve);
            },
            options: {
                immediateTriggerIfAlreadyTriggered: true,
                unwantAfterFirstTrigger: true
            }
        });

        // Feature packages loaded event hook
        ezApi.ezclocker.ezEventEngine.ezWantEventEx({
            eventName: EzFeaturePackageManager.ezEventNames.onFeaturePackagesLoaded,
            handlerName: EzEmployeeDashboardController.ezApiName,
            handlerFunction: () => {
                EzEmployeeDashboardController.ezInstance.ezReadyFlags.featurePackagesReady = true;

                EzEmployeeDashboardController.ezInstance.ezProcessReadyFlags()
                    .then(EzPromise.ignoreResolve);
            },
            options: {
                immediateTriggerIfAlreadyTriggered: true,
                unwantAfterFirstTrigger: true
            }
        });

        ezApi.ezclocker.ezEventEngine.ezWantEvent(
            EzClockerContextEventName.onActiveEmployeeReady,
            EzEmployeeDashboardController.ezApiName,
            () => {
                EzEmployeeDashboardController.ezInstance.ezReadyFlags.accountRoleTogglesReady = true;

                EzEmployeeDashboardController.ezInstance.ezReadyFlags.activeEmployeeReady = true;

                EzEmployeeDashboardController.ezInstance.ezProcessReadyFlags()
                    .then(EzPromise.ignoreResolve);
            });

        ezApi.ezclocker.ezEventEngine.ezWantEvent(
            EzClockerContextEventName.onActiveEmployerReady,
            EzEmployeeDashboardController.ezApiName,
            () => {
                EzEmployeeDashboardController.ezInstance.ezReadyFlags.activeEmployerReady = true;

                EzEmployeeDashboardController.ezInstance.ezProcessReadyFlags()
                    .then(EzPromise.ignoreResolve);
            });

        ezApi.ezclocker.ezEventEngine.ezWantEvent(
            EzClockerContextEventName.onEmployeeContextReady,
            EzEmployeeDashboardController.ezApiName,
            () => {
                EzEmployeeDashboardController.ezInstance.ezReadyFlags.employeeContextReady = true;

                EzEmployeeDashboardController.ezInstance.ezProcessReadyFlags()
                    .then(EzPromise.ignoreResolve);
            });

        ezApi.ezclocker.ezEventEngine.ezWantEvent(
            EzClockerContextEventName.onPersonalContextReady,
            EzEmployeeDashboardController.ezApiName,
            () => {
                EzEmployeeDashboardController.ezInstance.ezReadyFlags.personalContextReady = true;

                EzEmployeeDashboardController.ezInstance.ezProcessReadyFlags()
                    .then(EzPromise.ignoreResolve);
            });

        ezApi.ezclocker.ezEventEngine.ezWantEvent(
            EzClockerContextEventName.onPersonalEmployerIdReady,
            EzEmployeeDashboardController.ezApiName,
            () => {
                EzEmployeeDashboardController.ezInstance.ezReadyFlags.personalEmployerIdReady = true;

                EzEmployeeDashboardController.ezInstance.ezProcessReadyFlags()
                    .then(EzPromise.ignoreResolve);
            });

        ezApi.ezclocker.ezEventEngine.ezWantEvent(
            EzClockerContextEventName.onActiveAccountSelectedPeriodChanged,
            EzEmployeeDashboardController.ezApiName,
            EzEmployeeDashboardController.ezInstance.ezHandleOnActiveAccountSelectedPeriodChanged);

        ezApi.ezclocker.ezEventEngine.ezWantEvent(
            EzClockerContextEventName.onActiveEmployeeActiveClockInChanged,
            EzEmployeeDashboardController.ezApiName,
            EzEmployeeDashboardController.ezInstance.ezHandleActiveEmployeeClockInChangedEvent);

        ezApi.ezclocker.ezEventEngine.ezWantEvent(
            EzBreakInBreakOutHelper.ezEventNames.onBreakModeChanged,
            EzEmployeeDashboardController.ezApiName,
            EzEmployeeDashboardController.ezInstance.ezHandleBreakModeChangedEvent);

        ezApi.ezclocker.ezEventEngine.ezWantEvent(
            EzTimeAddEditDialogController.ezEventNames.onTimeEntryDialogTimeEntryAdded,
            EzEmployeeDashboardController.ezApiName,
            EzEmployeeDashboardController.ezInstance.ezHandleEzOnTimeEntryDialogTimeEntryAddedUpdated);

        ezApi.ezclocker.ezEventEngine.ezWantEvent(
            EzTimeAddEditDialogController.ezEventNames.onTimeEntryDialogTimeEntryUpdated,
            EzEmployeeDashboardController.ezApiName,
            EzEmployeeDashboardController.ezInstance.ezHandleEzOnTimeEntryDialogTimeEntryAddedUpdated);
    }

    /**
     * @public @method
     * Calls each type of ready flag processor methods
     * @returns {Promise.resolve}
     */
    ezProcessReadyFlags() {
        return EzPromise.asyncAction(
            (finished) => EzEmployeeDashboardController.ezInstance.ezProcessEmployeeDashboardReadyFlags()
                .then(EzEmployeeDashboardController.ezInstance.ezProcessPersonalDashboardReadyFlags)
                .then(EzEmployeeDashboardController.ezInstance.ezProcessFeatureToggleReadyFlags)
                .then(EzEmployeeDashboardController.ezInstance.ezProcessAccountRoleToggleReadyFlags)
                .then(EzEmployeeDashboardController.ezInstance.ezProcessFeaturePackageReadyFlags)
                .then(finished));
    }

    /**
     * @public @method
     * Processes the ready state flags for the dashboard and executes actions when the following
     * evalutes as true:
     *     1) EzBoolean.isFalse(EzEmployeeDashboardController.ezInstance.ezStateFlags.dashboardInitialized)
     *     2) EzBoolean.isTrue(EzEmployeeDashboardController.ezInstance.ezReadyFlags.ezDashboardReady())
     * @returns {Promise.resolve}
     */
    ezProcessDashboardReadyFlags() {
        return EzPromise.asyncAction(
            (finished) => {
                if (EzBoolean.isFalse(EzEmployeeDashboardController.ezInstance.ezStateFlags.dashboardInitialized) &&
                    EzBoolean.isTrue(EzEmployeeDashboardController.ezInstance.ezReadyFlags.ezDashboardReady())) {
                    EzEmployeeDashboardController.ezInstance.ezStateFlags.dashboardInitialized = true;

                    const employerOptions = ezApi.ezclocker.ezClockerContext.ezGetActiveEmployer().options || {};
                    const payPeriod = employerOptions.SELECTED_PAY_PERIOD || 'NONE';

                    if (payPeriod !== 'NONE') {
                        let updatedSelectedPeriod = ezApi.ezclocker.ezDateTime.ezCreateSelectedPeriod(
                            ezApi.ezclocker.ezDateTime.ezSetMomentStartOfDay(
                                ezApi.ezclocker.ezDateTime.ezDateFromDatePicker(
                                    EzEmployeeDashboardView.ezInstance.ezIds.inputs.selectedPeriodStartDatePickerId)),
                            ezApi.ezclocker.ezDateTime.ezSetMomentEndOfDay(
                                ezApi.ezclocker.ezDateTime.ezDateFromDatePicker(
                                    EzEmployeeDashboardView.ezInstance.ezIds.inputs.selectedPeriodEndDatePickerId)));

                        return ezApi.ezclocker.ezUi.ezPageWaitExecute(
                            'Setting selected period for the account...',
                            (waitDone) => ezApi.ezclocker.ezClockerContext.ezSetActiveAccountSelectedPeriod(updatedSelectedPeriod)
                                .then(
                                    () => EzEmployeeDashboardController.ezInstance.ezRefreshTimeEntriesForPeriod()
                                        .then(
                                            () => {
                                                ezApi.ezclocker.ezEventEngine.ezTriggerEvent(
                                                    EzEmployeeDashboardController.ezEventNames.onInitialized,
                                                    EzEmployeeDashboardController.ezInstance);

                                                return waitDone().then(() => finished());
                                            }))
                        )
                    } else {
                        return ezApi.ezclocker.ezClockerContext.ezRefreshActiveAccountSelectedPeriodMoments()
                            .then(
                                () => EzEmployeeDashboardController.ezInstance.ezRefreshTimeEntriesForPeriod()
                                    .then(
                                        () => {
                                            ezApi.ezclocker.ezEventEngine.ezTriggerEvent(
                                                EzEmployeeDashboardController.ezEventNames.onInitialized,
                                                EzEmployeeDashboardController.ezInstance);

                                            return finished();
                                        }));
                    }
                }

                return finished();
            });
    }

    /**
     * @public @method
     * Processes the ready state flags for the Employee dashboard mode and executes actions when the following
     * evalutes as true:
     *     1) EzBoolean.isFalse(EzEmployeeDashboardController.ezInstance.ezStateFlags.employeeDashboardInitialized)
     *     2) EzBoolean.isTrue(EzEmployeeDashboardController.ezInstance.ezReadyFlags.ezDashboardReady())
     * @returns {Promise.resolve}
     */
    ezProcessEmployeeDashboardReadyFlags() {
        return EzPromise.asyncAction(
            (finished) => {
                if (EzBoolean.isFalse(EzEmployeeDashboardController.ezInstance.ezStateFlags.employeeDashboardInitialized) &&
                    EzBoolean.isTrue(EzEmployeeDashboardController.ezInstance.ezReadyFlags.ezEmployeeDashboardReady())) {
                    EzEmployeeDashboardController.ezInstance.ezStateFlags.employeeDashboardInitialized = true;

                    ezApi.ezclocker.ezEventEngine.ezWantEvent(
                        EzClockerContextEventName.onUserContextUpdated,
                        EzEmployeeDashboardController.ezApiName,
                        () => EzEmployeeDashboardController.ezInstance.ezUpdateEmployeeRoleToggles()
                            .then(EzPromise.ignoreFinished));

                    return EzEmployeeDashboardController.ezInstance.ezInitUX()
                        .then(EzEmployeeDashboardController.ezInstance.ezProcessDashboardReadyFlags)
                        .then(
                            () => {
                                ezApi.ezclocker.ezEventEngine.ezTriggerEvent(
                                    EzEmployeeDashboardController.ezEventNames.onEmployeeDashboardReady,
                                    EzEmployeeDashboardController.ezInstance);

                                return finished();
                            });
                }

                return finished();
            });
    }

    /**
     * @public @method
     * Processes the ready state flags for the personal employee dashboard and executes actions when the following
     * evalutes as true:
     *     1) EzBoolean.isFalse(EzEmployeeDashboardController.ezInstance.ezStateFlags.personalDashboardInitialized)
     *     2) EzBoolean.isTrue(EzEmployeeDashboardController.ezInstance.ezReadyFlags.ezDashboardReady())
     * @returns {Promise.resolve}
     */
    ezProcessPersonalDashboardReadyFlags() {
        return EzPromise.asyncAction(
            (finished) => {
                if (EzBoolean.isFalse(EzEmployeeDashboardController.ezInstance.ezStateFlags.personalDashboardInitialized) &&
                    EzBoolean.isTrue(EzEmployeeDashboardController.ezInstance.ezReadyFlags.ezPersonalDashboardReady())) {
                    EzEmployeeDashboardController.ezInstance.ezStateFlags.personalDashboardInitialized = true;

                    return EzEmployeeDashboardController.ezInstance.ezInitUX()
                        .then(
                            () => {
                                ezApi.ezclocker.ezEventEngine.ezTriggerEvent(
                                    EzEmployeeDashboardController.ezEventNames.onPersonalDashboardReady,
                                    EzEmployeeDashboardController.ezInstance);

                                return finished();
                            });
                }

                return finished();
            });
    }

    /**
     * @public @method
     * Resets any toggles applied by feature toggles
     * @returns {Promise.resolve}
     */
    ezResetFeatureToggles() {
        return EzPromise.asyncAction(
            (finished) => {
                // Reset any toggles applied by feature toggles

                return finished();
            });
    }

    /**
     * @public @method
     * Processes the ready check flags for feature toggles and then executes actions when the following evaluate as true:
     *     1) EzBoolean.isFalse(EzEmployeeDashboardController.ezInstance.ezStateFlags.featureTogglesApplied)
     *     2) EzBoolean.isTrue(EzEmployeeDashboardController.ezInstance.ezReadyFlags.ezFeatureTogglesReady())
     * @returns {Promise.resolve}
     */
    ezProcessFeatureToggleReadyFlags() {
        return EzPromise.asyncAction(
            (finished) => {
                if (EzBoolean.isFalse(EzEmployeeDashboardController.ezInstance.ezStateFlags.featureTogglesApplied) &&
                    EzBoolean.isTrue(EzEmployeeDashboardController.ezInstance.ezReadyFlags.ezFeatureTogglesReady())) {
                    EzEmployeeDashboardController.ezInstance.ezStateFlags.featureTogglesApplied = true;

                    return EzEmployeeDashboardController.ezInstance.ezResetFeatureToggles()
                        .then(
                            () => {
                                ezApi.ezclocker.ezFeatureToggles.ezApplyViewFeatureToggles(EzEmployeeDashboardController.ezInstance.ezFeatureViewName);

                                return finished();
                            });
                }

                return finished();
            });
    }

    /**
     * @public @method
     * Resets the any toggles applied due to the authenticated account's role
     * @returns {Promise.resolve}
     */
    ezResetAccountRoleToggles() {
        return EzPromise.asyncAction(
            (finished) => {
                // Navigate to dashboard button
                ezApi.ezclocker.ezUi.ezHideElement(
                    EzEmployeeDashboardView.ezInstance.ezIds.buttons.navigateToDashboardButtonId);

                // Navigate to schedule button
                ezApi.ezclocker.ezUi.ezHideElement(
                    EzEmployeeDashboardView.ezInstance.ezIds.buttons.navigateToScheduleButtonId);

                // Employer header
                ezApi.ezclocker.ezUi.ezHideElement('EzPageViewHeader_EmployerLogoContainer');

                ezApi.ezclocker.ezUi.ezContent(
                    EzEmployeeDashboardView.ezInstance.ezIds.employerNameCellId,
                    EzString.EMPTY);

                ezApi.ezclocker.ezUi.setImgElementSrc(
                    EzEmployeeDashboardView.ezInstance.ezIds.employerLogoImageId,
                    '/public/images/spinners/orange-spinner.gif');

                // Personal header
                ezApi.ezclocker.ezUi.ezHideElement('EzPersonalHeader');

                // Add time entry button
                ezApi.ezclocker.ezEventEngine.ezUnwantElementEvent(
                    EzEmployeeDashboardView.ezInstance.ezIds.buttons.addTimeEntryButtonId,
                    EzElementEventName.CLICK,
                    EzEmployeeDashboardController.ezApiName);

                ezApi.ezclocker.ezUi.ezHideElement(
                    EzEmployeeDashboardView.ezInstance.ezIds.buttons.addTimeEntryButtonId);

                ezApi.ezclocker.ezUi.ezDisableElement(
                    EzEmployeeDashboardView.ezInstance.ezIds.buttons.addTimeEntryButtonId);

                // Disabled clock in/out container
                ezApi.ezclocker.ezUi.ezHideElement(
                    EzEmployeeDashboardView.ezInstance.ezIds.containers.disabledClockInOutAddContainerId);

                // Enabled clock in/out container
                ezApi.ezclocker.ezUi.ezHideElement(
                    EzEmployeeDashboardView.ezInstance.ezIds.containers.enableClockInOutAddContainerId);

                // Clock and Break in button
                ezApi.ezclocker.ezEventEngine.ezUnwantElementEvent(
                    EzEmployeeDashboardView.ezInstance.ezIds.buttons.clockInBreakInOutButtonId,
                    EzElementEventName.CLICK,
                    EzEmployeeDashboardController.ezApiName);

                // Clock and Break out button
                ezApi.ezclocker.ezEventEngine.ezUnwantElementEvent(
                    EzEmployeeDashboardView.ezInstance.ezIds.buttons.clockOutButtonId,
                    EzElementEventName.CLICK,
                    EzEmployeeDashboardController.ezApiName);

                return finished();
            });
    }

    /**
     * @public @method
     * Processes ready check flags for account role feature toggles and executes actions when the following
     * evaluate to true:
     *     1) false == EzEmployeeDashboardController.ezInstance.ezStateFlags.accountRoleTogglesApplied
     *     2) true == EzEmployeeDashboardController.ezInstance.ezReadyFlags.ezAccountRoleTogglesReady()
     * @returns {Promise.resolve}
     */
    ezProcessAccountRoleToggleReadyFlags() {
        return EzPromise.asyncAction(
            (finished) => {
                if (EzBoolean.isFalse(EzEmployeeDashboardController.ezInstance.ezStateFlags.accountRoleTogglesApplied) &&
                    EzEmployeeDashboardController.ezInstance.ezReadyFlags.ezAccountRoleTogglesReady()) {
                    EzEmployeeDashboardController.ezInstance.ezStateFlags.accountRoleTogglesApplied = true;

                    return EzEmployeeDashboardController.ezInstance.ezUpdateEmployeeRoleToggles()
                        .then(finished);
                }

                return finished();
            });
    }

    /**
     * @public @method
     * Updates the employee role toggles
     * @returns {Promise.resolve}
     */
    ezUpdateEmployeeRoleToggles() {
        return EzPromise.asyncAction(
            (finished) => EzEmployeeDashboardController.ezInstance.ezResetAccountRoleToggles()
                .then(
                    () => {
                        // ROLE_PERSONAL or ROLE_INDIVIDUAL plus ROLE_EMPLOYEE
                        if (EzBoolean.isTrue(ezApi.ezclocker.ezClockerContext?.ezGetUserContext()?.isPersonal)) {
                            // Personal header
                            ezApi.ezclocker.ezUi.ezShowElement('EzPersonalHeader');

                            // Enabled clock in/out container
                            ezApi.ezclocker.ezUi.ezShowElement(
                                EzEmployeeDashboardView.ezInstance.ezIds.containers.enableClockInOutAddContainerId);

                            // Add time entry button
                            ezApi.ezclocker.ezEventEngine.ezWantElementEvent(
                                EzEmployeeDashboardView.ezInstance.ezIds.buttons.addTimeEntryButtonId,
                                EzElementEventName.CLICK,
                                EzEmployeeDashboardController.ezApiName,
                                EzEmployeeDashboardController.ezInstance.ezHandleAddTimeEntryButtonClick);

                            ezApi.ezclocker.ezUi.ezShowElement(
                                EzEmployeeDashboardView.ezInstance.ezIds.buttons.addTimeEntryButtonId);

                            ezApi.ezclocker.ezUi.ezEnableElement(
                                EzEmployeeDashboardView.ezInstance.ezIds.buttons.addTimeEntryButtonId);

                            // Clock and break in button
                            ezApi.ezclocker.ezEventEngine.ezWantElementEvent(
                                EzEmployeeDashboardView.ezInstance.ezIds.buttons.clockInBreakInOutButtonId,
                                EzElementEventName.CLICK,
                                EzEmployeeDashboardController.ezApiName,
                                EzEmployeeDashboardController.ezInstance.ezHandleClockInButtonClick);

                            // Clock and break out button
                            ezApi.ezclocker.ezEventEngine.ezWantElementEvent(
                                EzEmployeeDashboardView.ezInstance.ezIds.buttons.clockOutButtonId,
                                EzElementEventName.CLICK,
                                EzEmployeeDashboardController.ezApiName,
                                EzEmployeeDashboardController.ezInstance.ezHandleClockOutButtonClick);
                        }

                        // ROLE_EMPLOYEE
                        if (!ezApi.ezclocker.ezClockerContext?.ezGetUserContext()?.isPersonal &&
                            EzBoolean.isTrue(ezApi.ezclocker.ezClockerContext?.userContext?.isEmployee)) {
                            // Employer name and logo header
                            ezApi.ezclocker.ezUi.ezShowElement('EzPageViewHeader_EmployerLogoContainer');

                            ezApi.ezclocker.ezUi.ezContent(
                                EzEmployeeDashboardView.ezInstance.ezIds.employerNameCellId,
                                EzString.stringOrEmpty(ezApi.ezclocker.ezClockerContext.ezGetActiveEmployer().employerName));

                            ezApi.ezclocker.ezEmployerService.ezLoadEmployerImage(
                                ezApi.ezclocker.ezClockerContext.ezGetActiveEmployee().employerId)
                                .then(
                                    (imageUrl) => ezApi.ezclocker.ezUi.setImgElementSrc(
                                        EzEmployeeDashboardView.ezInstance.ezIds.employerLogoImageId,
                                        imageUrl));

                            // Navigate to dashboard button
                            ezApi.ezclocker.ezUi.ezShowElement(
                                EzEmployeeDashboardView.ezInstance.ezIds.buttons.navigateToDashboardButtonId);

                            if (!ezApi.ezclocker.ezClockerContext?.ezGetUserContext()?.isPersonal) {
                                // Navigate to schedule button
                                ezApi.ezclocker.ezUi.ezShowElement(
                                    EzEmployeeDashboardView.ezInstance.ezIds.buttons.navigateToScheduleButtonId);
                            }

                            // Allow adding of time entries
                            if (EzBoolean.isTrue(EzEmployeeDashboardController.ezInstance.ezAllowEditTimeSheet)) {
                                // Add time entry button
                                ezApi.ezclocker.ezEventEngine.ezWantElementEvent(
                                    EzEmployeeDashboardView.ezInstance.ezIds.buttons.addTimeEntryButtonId,
                                    EzElementEventName.CLICK,
                                    EzEmployeeDashboardController.ezApiName,
                                    EzEmployeeDashboardController.ezInstance.ezHandleAddTimeEntryButtonClick);

                                ezApi.ezclocker.ezUi.ezShowElement(
                                    EzEmployeeDashboardView.ezInstance.ezIds.buttons.addTimeEntryButtonId);

                                ezApi.ezclocker.ezUi.ezEnableElement(
                                    EzEmployeeDashboardView.ezInstance.ezIds.buttons.addTimeEntryButtonId);
                            }

                            if (EzBoolean.isTrue(EzEmployeeDashboardController.ezInstance.ezDisallowWebTimeEntry) ||
                                EzBoolean.isTrue(EzEmployeeDashboardController.ezInstance.ezDisallowWebAddTimeEntry)) {
                                ezApi.ezclocker.ezUi.ezShowElement(
                                    EzEmployeeDashboardView.ezInstance.ezIds.containers.disabledClockInOutAddContainerId);
                            } else {
                                ezApi.ezclocker.ezUi.ezShowElement(
                                    EzEmployeeDashboardView.ezInstance.ezIds.containers.enableClockInOutAddContainerId);

                                ezApi.ezclocker.ezEventEngine.ezWantElementEvent(
                                    EzEmployeeDashboardView.ezInstance.ezIds.buttons.clockInBreakInOutButtonId,
                                    EzElementEventName.CLICK,
                                    EzEmployeeDashboardController.ezApiName,
                                    EzEmployeeDashboardController.ezInstance.ezHandleClockInButtonClick);

                                ezApi.ezclocker.ezEventEngine.ezWantElementEvent(
                                    EzEmployeeDashboardView.ezInstance.ezIds.buttons.clockOutButtonId,
                                    EzElementEventName.CLICK,
                                    EzEmployeeDashboardController.ezApiName,
                                    EzEmployeeDashboardController.ezInstance.ezHandleClockOutButtonClick);
                            }
                        }

                        //all types get the chat button if employee has a license for it
                        console.log("FRINov4aaa");
                        if (true || ezApi.ezclocker.ezClockerContext.ezSelectedEmployerAccountFeatureEnabled(EzClockerFeature.EZ_TEAM_CHAT)) {
                            console.log("FRINov4b");
                            ezApi.ezclocker.ezEventEngine.ezWantElementEvent(
                                'EzNavigationTeamChatButton',
                                EzElementEventName.CLICK,
                                EzEmployeeDashboardController.ezApiName,
                                () => ezApi.ezclocker.ezTeamChatDialog.ezShow(false));

                            ezApi.ezclocker.ezUi.ezShowElement('EzNavigationTeamChatButton');
                        }

                        return finished();
                    }));
    }

    /**
     * @public @method
     * Processes the ready check flags for feature package dependencies and executes actions when the following evalutes
     * as true:
     *     1) EzBoolean.isFalse(EzEmployeeDashboardController.ezInstance.ezStateFlags.featurePackageTogglesApplied)
     *     2) EzBoolean.isTrue(EzEmployeeDashboardController.ezInstance.ezReadyFlags.ezFeaturePackagesReady())
     * @returns {Promise.resolve}
     */
    ezProcessFeaturePackageReadyFlags() {
        return EzPromise.asyncAction(
            (finished) => {
                if (EzBoolean.isFalse(EzEmployeeDashboardController.ezInstance.ezStateFlags.featurePackageTogglesApplied) &&
                    EzBoolean.isTrue(EzEmployeeDashboardController.ezInstance.ezReadyFlags.ezFeaturePackagesReady())) {
                    EzEmployeeDashboardController.ezInstance.ezStateFlags.featurePackageTogglesApplied = true;

                    ezApi.ezclocker.ezUi.ezHideElement(EzEmployeeDashboardView.ezInstance.ezIds.buttons.navigateToTimeOffButtonId);

                    ezApi.ezclocker.ezUi.ezDisableElement(EzEmployeeDashboardView.ezInstance.ezIds.buttons.navigateToTimeOffButtonId);

                    return ezApi.ezclocker.ezFeaturePackageManager.ezApplyFeaturePackageToggles()
                        .then(
                            () => {
                                if (ezApi.ezclocker.ezClockerContext.ezActiveEmployerLicenseHasFeature(EzLicenseFeatureId.TIME_OFF) ||
                                    ezApi.ezclocker.ezClockerContext.ezActiveEmployerLicenseHasFeature(EzLicenseFeatureId.TIME_OFF_YEARLY) ||
                                    ezApi.ezclocker.ezFeaturePackageManager.ezFeaturePackageEnabled(EzFeaturePackageId.TIME_OFF) ||
                                    ezApi.ezclocker.ezFeaturePackageManager.ezFeaturePackageEnabled(EzFeaturePackageId.TIME_OFF_YEARLY)) {
                                    ezApi.ezclocker.ezEventEngine.ezWantElementEvent(
                                        EzEmployeeDashboardView.ezInstance.ezIds.buttons.navigateToTimeOffButtonId,
                                        EzElementEventName.CLICK,
                                        EzEmployeeDashboardController.ezApiName,
                                        ezApi.ezclocker.ezNavigation.ezNavigateToTimeOff);

                                    ezApi.ezclocker.ezUi.ezShowElement(EzEmployeeDashboardView.ezInstance.ezIds.buttons.navigateToTimeOffButtonId);

                                    ezApi.ezclocker.ezUi.ezEnableElement(EzEmployeeDashboardView.ezInstance.ezIds.buttons.navigateToTimeOffButtonId);
                                }

                                return finished();
                            });
                }

                return finished();
            });
    }

    /**
     * @public @method
     * Initializes any data needed during EzEmployeeDashboardController initialization when the following is true:
     *     1) EzBoolean.isFalse(EzEmployeeDashboardView.ezInstance.ezStateFlags.dataInitialized)
     * @returns {Promise.resolve}
     */
    ezInitData() {
        return EzPromise.asyncAction(
            (finished) => {
                if (EzBoolean.isFalse(EzEmployeeDashboardView.ezInstance.ezStateFlags.dataInitialized)) {
                    EzEmployeeDashboardView.ezInstance.ezStateFlags.dataInitialized = true;

                    return finished();
                }

                return finished();
            });
    }

    /**
     * @public @method
     * Initializes various UX elements for the employer dashboard when the following evalutes as true:
     *     1) EzBoolean.isFalse(EzEmployeeDashboardController.ezInstance.ezStateFlags.uxInitialized)
     * @returns {Promise.resolve}
     */
    ezInitUX() {
        return EzPromise.asyncAction(
            (finished) => {
                if (EzBoolean.isFalse(EzEmployeeDashboardController.ezInstance.ezStateFlags.uxInitialized)) {
                    EzEmployeeDashboardController.ezInstance.ezStateFlags.uxInitialized = true;

                    return EzEmployeeDashboardController.ezInstance.ezRender()
                        .then(
                            () => {
                                EzEmployeeDashboardController.ezInstance.ezHookUxEvents();

                                EzEmployeeDashboardController.ezInstance.ezInitQuickFilterUx();

                                ezApi.ezclocker.ezUi.ezFocusElement(
                                    EzBoolean.isTrue(
                                        ezApi.ezclocker.ezUi.ezIsElementEnabled(
                                            EzEmployeeDashboardView.ezInstance.ezIds.buttons.clockOutButtonId))
                                        ? EzEmployeeDashboardView.ezInstance.ezIds.buttons.clockOutButtonId
                                        : EzEmployeeDashboardView.ezInstance.ezIds.buttons.clockInBreakInOutButtonId);

                                ezApi.ezclocker.ezAnalyticsAndMetrics.ezAmplitudeIntegration.ezTrack('Employee Dashboard');

                                return finished();
                            });
                }

                return finished();
            });
    }

    /**
     * @public @method
     * Begins rendering of the employer dashboard when the following evalutes to true:
     *     1) EzBoolean.isFalse(EzEmployeeDashboardController.ezInstance.ezStateFlags.uxRendered)
     * @returns {Promise.resolve}
     */
    ezRender() {
        return EzPromise.asyncAction(
            (finished) => {
                if (EzBoolean.isFalse(EzEmployeeDashboardController.ezInstance.ezStateFlags.uxRendered)) {
                    EzEmployeeDashboardController.ezInstance.ezStateFlags.uxRendered = true;

                    ezApi.ezclocker.ezUi.ezContent(
                        'EzPageViewHeader',
                        EzEmployeeDashboardController.ezInstance.ezBuildPageHeaderHtml());

                    ezApi.ezclocker.ezUi.ezContent(
                        'EzEmployeeDashboardMenu',
                        EzEmployeeDashboardController.ezInstance.ezBuildEmployeeDashboardMenuHtml());

                    ezApi.ezclocker.ezUi.ezContent(
                        'EzEmployeeDashboardPage',
                        EzEmployeeDashboardController.ezInstance.ezBuildEmployeeDashboardContentHtml());

                    ezApi.ezclocker.ezUi.ezAppendContent(
                        'body',
                        EzEmployeeDashboardController.ezInstance.ezBuildActiveTimeZoneDisplayHtml());
                }

                return finished();
            });
    }

    /**
     * @protected @method
     * Builds the employee dashboard header HTML
     * @returns {string}
     */
    ezBuildPageHeaderHtml() {
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
                            class="ezHeader-employer-logo"
                            alt="employer"
                            src="/public/images/spinners/orange-spinner.gif" />
                    </div>
                    <div
                        id="_EmployerNameCell"
                        class="ezHeader-employer-name">
                    </div>
                </div>
                <div
                    id="EzPersonalHeader"
                    style="display:none">
                    <a
                        id="EzPageHeaderLogoLink"
                        href="#"
                        onclick="ezApi.ezclocker.ezNavigation.navigateToMain();">
                        <img
                            id="EzPageHeaderLogo"
                            src="/public/images/logos/ezclocker_logo_2015.svg"
                            class="ezPageHeaderLogo"
                            alt="ezClocker" />
                    </a>
                </div>
                <div
                    id="EzPageViewHeader_NavigationButtons"
                    class="ezHeader-navigation-button-container">
                    <div
                        id="EzTeamChatPageButton_Column">
                        <span
                            data-feature-package-id="ezFP_TEAM_CHAT"
                            data-feature-id="ezfTeamChat"
                            style="display:none">
                            <button
                                id="EzNavigationTeamChatButton"
                                type="button"
                                class="headerButton">
                                Team Chat
                            </button>
                        </span>
                    </div>
                    <div
                        id="EzNavigateToDashboardPageButton_Column">
                        <button
                            id="EzNavigateToDashboardPageButton"
                            class="headerButton"
                            type="button"
                            disabled>
                            Dashboard
                        </button>
                    </div>
                    <div
                        id="EzNavigateToDashboardPageButton_Column">
                        <button
                            id="EzNavigateToSchedulePageButton"
                            class="headerButton"
                            style="display:none"
                            type="button">
                            Schedules
                        </button>
                    </div>
                    <div
                        id="EzNavigateToTimeOffButton_Column">
                        <span
                            id="ezfTimeOff_FeatureToggle"
                            data-feature-package-id="TIME_OFF"
                            data-feature-id="ezfTimeOff"
                            style="display:none">
                            <button
                                id="EzNavigateToTimeOffPageButton"
                                class="headerButton"
                                disabled>
                                Time Off
                            </button>
                        </span>
                    </div>
                    <div
                        id="EzNavigateToDashboardPageButton_Column">
                        <button
                            id="EzSignOutButton"
                            class="headerButton"
                            type="button">
                            Sign Out
                        </button>
                    </div>
                </div>
            </div>`;
    }

    /**
     * @protected @method
     * Builds the employee dashboard menu html
     * @returns {string}
     */
    ezBuildEmployeeDashboardMenuHtml() {
        return EzHtml.build`
            <div
                id="_filterMenuContainer"
                class="ezLightGrayBox8 ezTopMargin_10 ezBottomMargin_10">
                <table
                    id="EzEmployeeMenuTable"
                    class="ez-table-transparent-full-width">
                    <tr>
                        <td
                            id="_employeeTitle"
                            class="employeeTitle"></td>
                        <td
                            id="EzTotalHoursDisplay"
                            class="ezAlignRight">
                            Total Time:
                            <input
                                id="EzTotalHoursInput"
                                class="totalHours"
                                type="text"
                                value="0"
                                readonly/>
                        </td>
                    </tr>
                    <tr>
                        <td
                            style="padding-bottom: 0px; text-align: top; vertical-align: middle;">
                            <button
                                id="_quickFilterLeftArrowIconId"
                                class="ezToolButton"
                                title="Move Left...">
                                <img
                                    src="/public/images/icons/arrow-left-white.svg"
                                    style="width:24px;"
                                    alt="Go left in pay period">
                                </img>
                            </button>
                            <input
                                id="EzSelectedPeriodStartDatePicker"
                                type="text"
                                name="startDate"
                                value=""/>
                            to
                            <input
                                id="EzSelectedPeriodEndDatePicker"
                                type="text"
                                name="endDate"
                                value=""/>
                        
                            <button
                                id="_quickFilterRightArrowIconId"
                                class="ezToolButton"
                                title="Move Right...">
                                <img
                                    src="/public/images/icons/arrow-right-white.svg"
                                    style="width:24px;"
                                    alt="Go right in pay period">
                                </img>
                            </button> 
                            <button
                                id="EzViewPeriodButton"
                                class="ezMajorButton"
                                title="View pay period for date range"
                                type="button">
                                View Pay Period
                            </button>
                            <button
                                id="exportTimeSheet"
                                class="ezMajorButton"
                                type="button"
                                title="Export your time entries to CSV">
                                Export Time Entries
                            </button>
                        </td>
                        <td
                            class="ezAlignRight">
                            <div
                                id="EzDisabledClockInOutAddContainer"
                                style="display:none">
                                <button
                                    id="EzDisabledClockInBreakInOutButton"
                                    class="ezMajorButton"
                                    type="button"
                                    title="Your employer has disabled Clock In on this dashboard."
                                    disabled>
                                    Clock In
                                </button>
                                <button
                                    id="EzDisabledClockOutButton"
                                    class="ezMajorButton"
                                    type="button"
                                    title="Your employer has disabled Clock Out on this dashboard."
                                    disabled>
                                    Clock Out
                                </button>
                                <button
                                    id="EzDisabledAddTimeEntryButton"
                                    class="ezMajorButton"
                                    type="button"
                                    title="Your employer has disabled Add Time Entries or Breaks."
                                    disabled>
                                    Add Time
                                </button>
                            </div>
                            <div
                                id="EzEnabledClockInOutAddContainer"
                                style="display:none">
                                <button
                                    id="clockInBreakInOut"
                                    class="ezMajorButton"
                                    type="button"
                                    title="Clock in to begin time tracking for your shift.">
                                    Clock In
                                </button>
                                <button
                                    id="clockOut"
                                    class="ezMajorButton"
                                    type="button"
                                    title="You must first clock in before you can clock out."
                                    disabled>
                                    Clock Out
                                </button>
                                <button
                                    id="EzAddTimeEntryButton"
                                    class="ezMajorButton"
                                    type="button"
                                    title="Add a new time entry or break">
                                    Add Time
                                </button>
                            </div>
                        </td>
                    </tr>
                </table>
            </div>`;
    }

    deriveStartDatePerPayPeriod() {
        const employerOptions = ezApi.ezclocker.ezClockerContext.ezGetActiveEmployer().options;
        const yesterdayDayMoment =
            moment().subtract(1, 'days').tz(ezApi.ezclocker.ezDateTime.activeTimeZone).startOf('day');
        const yesterdayDateString = yesterdayDayMoment.format('YYYY-MM-DD');
        const lastClosingDate = employerOptions['PAY_PERIOD_LAST_CLOSING_DATE'] || yesterdayDateString;
        const lastClosingDateMoment = ezApi.ezclocker.ezDateTime.ezSetMomentStartOfDay(moment(lastClosingDate));
        const payPeriod = employerOptions.SELECTED_PAY_PERIOD || 'NONE';
        let payPeriodNumeric = EzPayPeriod[payPeriod];
        let todaysDateMoment = ezApi.ezclocker.ezDateTime.ezNowWithStartOfDay();
        const diff = todaysDateMoment.diff(lastClosingDateMoment, 'days');
        if (payPeriodNumeric === 30) {
            const computedStartDate = (todaysDateMoment.month() + 1) + '/01/' + todaysDateMoment.year();
            return moment(computedStartDate);
        } else if (diff <= payPeriodNumeric) {
            const computedStartDateMoment = lastClosingDateMoment.add(1, 'days');
            return computedStartDateMoment;
        } else {
            const absoluteCurrentPayPeriodNumber = Math.floor(diff / payPeriodNumeric);
            const mostRecentLastClosingDate =
                moment(ezApi.ezclocker.ezDateTime.ezDateString(lastClosingDateMoment)).add((payPeriodNumeric * absoluteCurrentPayPeriodNumber), 'days');
            const computedStartDateMoment = mostRecentLastClosingDate.add(1, 'days');
            return computedStartDateMoment;
        }
    }

    deriveEndDatePerPayPeriod() {
        const startDateFromDatePicker = ezApi.ezclocker.ezDateTime.ezDateFromDatePicker('EzSelectedPeriodStartDatePicker');
        const employerOptions = ezApi.ezclocker.ezClockerContext.ezGetActiveEmployer().options;
        const payPeriod = employerOptions.SELECTED_PAY_PERIOD || 'NONE';
        let payPeriodNumeric = EzPayPeriod[payPeriod];
        let todaysDateMoment = ezApi.ezclocker.ezDateTime.ezNowWithStartOfDay();
        if (payPeriodNumeric === 30) {
            return ezApi.ezclocker.ezDateTime.ezDateString(todaysDateMoment.endOf('month').startOf('day'));

        } else {
            const endDateMoment = moment(startDateFromDatePicker).add(payPeriodNumeric - 1, 'days');
            return endDateMoment;
        }
    }

    renderNextPayPeriod() {
        const employerOptions = ezApi.ezclocker.ezClockerContext.ezGetActiveEmployer().options;
        const payPeriod = employerOptions.SELECTED_PAY_PERIOD || 'NONE';
        const yesterdayDayMoment =
            moment().subtract(1, 'days').tz(ezApi.ezclocker.ezDateTime.activeTimeZone).startOf('day');
        const yesterdayDateString = yesterdayDayMoment.format('YYYY-MM-DD');
        const employerlastClosingDate = employerOptions['PAY_PERIOD_LAST_CLOSING_DATE'] || yesterdayDateString;
        const employerLastClosingDateMoment = ezApi.ezclocker.ezDateTime.ezSetMomentStartOfDay(moment(employerlastClosingDate));
        let payPeriodNumeric = EzPayPeriod[payPeriod];
        let endDateMomentFromDatePicker = ezApi.ezclocker.ezDateTime.ezDateFromDatePicker('EzSelectedPeriodEndDatePicker');
        let endDateMoment;
        if (payPeriodNumeric === 30) {
            const endDateMomentForDerivation = moment(ezApi.ezclocker.ezDateTime.ezDateString(endDateMomentFromDatePicker)).add(1, 'month');
            endDateMoment = moment(ezApi.ezclocker.ezDateTime.ezDateString(endDateMomentForDerivation.endOf('month').startOf('day')));

            ezApi.ezclocker.ezUi.ezSetInputValue('EzSelectedPeriodStartDatePicker', ezApi.ezclocker.ezDateTime.ezDateString(endDateMomentForDerivation.startOf('month').startOf('day')));
        } else {
            let diffBetweenEndDateFromDatePickerAndLastClosingDateMoment = endDateMomentFromDatePicker.diff(employerLastClosingDateMoment, 'days');
            let remainder = (diffBetweenEndDateFromDatePickerAndLastClosingDateMoment % payPeriodNumeric);
            let daysBetweenNextEndPayPeriodAndEndDate = payPeriodNumeric - (remainder === 0 ? payPeriodNumeric : remainder);
            endDateMoment = moment(ezApi.ezclocker.ezDateTime.ezDateString(endDateMomentFromDatePicker)).add((payPeriodNumeric + daysBetweenNextEndPayPeriodAndEndDate), 'days');
            const nextPayPeriodStartDateMoment = moment(endDateMoment).subtract(payPeriodNumeric - 1, 'days');
            let startDate = ezApi.ezclocker.ezDateTime.ezDateString(nextPayPeriodStartDateMoment);
            ezApi.ezclocker.ezUi.ezSetInputValue('EzSelectedPeriodStartDatePicker', startDate);

        }
        ezApi.ezclocker.ezUi.ezId('EzSelectedPeriodEndDatePicker')
            .datepicker(
                'option',
                'minDate',
                ezApi.ezclocker.ezDateTime.ezDateString(moment(ezApi.ezclocker.ezUi.ezGetInputValue('EzSelectedPeriodStartDatePicker'))));

        ezApi.ezclocker.ezUi.ezId('EzSelectedPeriodEndDatePicker')
            .datepicker(
                'option',
                'maxDate',
                ezApi.ezclocker.ezDateTime.ezDateString(moment(ezApi.ezclocker.ezDateTime.ezDateString(endDateMoment)).add(30, 'days')));
        ezApi.ezclocker.ezUi.ezSetInputValue('EzSelectedPeriodEndDatePicker', ezApi.ezclocker.ezDateTime.ezDateString(endDateMoment));
        return EzEmployeeDashboardController.ezInstance.ezHandleQuickFilterSubmit().then(EzPromise.ignoreResolve);

    }

    renderPreviousPayPeriod() {
        const employerOptions = ezApi.ezclocker.ezClockerContext.ezGetActiveEmployer().options;
        const payPeriod = employerOptions.SELECTED_PAY_PERIOD || 'NONE';
        const yesterdayDayMoment =
            moment().subtract(1, 'days').tz(ezApi.ezclocker.ezDateTime.activeTimeZone).startOf('day');
        const yesterdayDateString = yesterdayDayMoment.format('YYYY-MM-DD');
        const employerlastClosingDate = employerOptions['PAY_PERIOD_LAST_CLOSING_DATE'] || yesterdayDateString;
        const employerLastClosingDateMoment = ezApi.ezclocker.ezDateTime.ezSetMomentStartOfDay(moment(employerlastClosingDate));
        let payPeriodNumeric = EzPayPeriod[payPeriod];
        let startDateMomentFromDatePicker = ezApi.ezclocker.ezDateTime.ezDateFromDatePicker('EzSelectedPeriodStartDatePicker');
        let endDateMoment;
        if (payPeriodNumeric === 30) {
            const startDateMoment = moment(ezApi.ezclocker.ezDateTime.ezDateString(startDateMomentFromDatePicker)).subtract(1, 'month');
            endDateMoment = moment(ezApi.ezclocker.ezDateTime.ezDateString(startDateMoment.endOf('month').startOf('day')));

            ezApi.ezclocker.ezUi.ezSetInputValue('EzSelectedPeriodStartDatePicker', ezApi.ezclocker.ezDateTime.ezDateString(startDateMoment.startOf('month').startOf('day')));
        } else {
            let firstStartDateMomentAfterLastClosingDate = moment(employerLastClosingDateMoment).add(1, 'days');
            let diffBetweenStartDateFromDatePickerAndFirstStartDateMoment = startDateMomentFromDatePicker.diff(firstStartDateMomentAfterLastClosingDate, 'days');
            let periodBetweenLastPayPeriodAndStartDate = diffBetweenStartDateFromDatePickerAndFirstStartDateMoment % payPeriodNumeric;
            const previousPayPeriodStartDateMoment = moment(ezApi.ezclocker.ezDateTime.ezDateString(startDateMomentFromDatePicker)).subtract(payPeriodNumeric + periodBetweenLastPayPeriodAndStartDate, 'days');
            let startDate = ezApi.ezclocker.ezDateTime.ezDateString(previousPayPeriodStartDateMoment);
            ezApi.ezclocker.ezUi.ezSetInputValue('EzSelectedPeriodStartDatePicker', startDate);
            endDateMoment = moment(previousPayPeriodStartDateMoment).add(payPeriodNumeric - 1, 'days');
        }
        ezApi.ezclocker.ezUi.ezId('EzSelectedPeriodEndDatePicker')
            .datepicker(
                'option',
                'minDate',
                ezApi.ezclocker.ezDateTime.ezDateString(moment(ezApi.ezclocker.ezUi.ezGetInputValue('EzSelectedPeriodStartDatePicker'))));

        ezApi.ezclocker.ezUi.ezId('EzSelectedPeriodEndDatePicker')
            .datepicker(
                'option',
                'maxDate',
                ezApi.ezclocker.ezDateTime.ezDateString(moment(ezApi.ezclocker.ezDateTime.ezDateString(endDateMoment)).add(30, 'days')));
        ezApi.ezclocker.ezUi.ezSetInputValue('EzSelectedPeriodEndDatePicker', ezApi.ezclocker.ezDateTime.ezDateString(endDateMoment));
        return EzEmployeeDashboardController.ezInstance.ezHandleQuickFilterSubmit().then(EzPromise.ignoreResolve);

    }

    /**
     * @protected @method
     * Builds the employee dashboard's content html
     * @returns {string}
     */
    ezBuildEmployeeDashboardContentHtml() {
        return EzHtml.build`
            <div
                id="_TimeEntryContent"
                class="ezContentView">
            </div>`;
    }

    /**
     * @protected @method
     * Builds the active time zone display html
     * @returns {string}
     */
    ezBuildActiveTimeZoneDisplayHtml() {
        return EzHtml.build`
            <div
                id="_EzActiveTimeZone"
                data-feature-id="ezfActiveTimeZoneDisplay"
                class="ez-debug-timezone-container ezFeatureContainer"
                style="display:none">
            </div>`;
    }

    /**
     * @public @method
     * Hooks any UX related events when the following evaluates as true:
     *     1) EzBoolean.isFalse(EzEmployeeDashboardController.ezInstance.ezStateFlags.uxEventsHooked)
     */
    ezHookUxEvents() {
        if (EzBoolean.isFalse(EzEmployeeDashboardController.ezInstance.ezStateFlags.uxEventsHooked)) {
            EzEmployeeDashboardController.ezInstance.ezStateFlags.uxEventsHooked = true;

            ezApi.ezclocker.ezEventEngine.ezWantElementEvent(
                EzEmployeeDashboardView.ezInstance.ezIds.buttons.exportTimeSheetButtonId,
                EzElementEventName.CLICK,
                EzEmployeeDashboardController.ezApiName,
                EzEmployeeDashboardController.ezInstance.ezShowExportTimeSheetsForEmployee);

            ezApi.ezclocker.ezEventEngine.ezWantElementEvent(
                EzEmployeeDashboardView.ezInstance.ezIds.inputs.totalHoursInputId,
                EzElementEventName.CLICK,
                EzEmployeeDashboardController.ezApiName,
                () => ezApi.ezclocker.ezUi.ezSelectAll(EzEmployeeDashboardView.ezInstance.ezIds.inputs.totalHoursInputId));

            ezApi.ezclocker.ezEventEngine.ezWantElementEvent(
                EzEmployeeDashboardView.ezInstance.ezIds.containers.totalHoursDisplayContainerId,
                EzElementEventName.CLICK,
                EzEmployeeDashboardController.ezApiName,
                () => ezApi.ezclocker.ezUi.ezSelectAll(EzEmployeeDashboardView.ezInstance.ezIds.inputs.totalHoursInputId));

            ezApi.ezclocker.ezEventEngine.ezWantElementEvent(
                EzEmployeeDashboardView.ezInstance.ezIds.buttons.signOutButtonId,
                EzElementEventName.CLICK,
                EzEmployeeDashboardController.ezApiName,
                ezApi.ezclocker.nav.ezSignOut);

            ezApi.ezclocker.ezEventEngine.ezWantElementEvent(
                EzEmployeeDashboardView.ezInstance.ezIds.buttons.navigateToScheduleButtonId,
                EzElementEventName.CLICK,
                EzEmployeeDashboardController.ezApiName,
                ezApi.ezclocker.ezNavigation.ezNavigateToEmployeeSchedules);
        }
    }

    /**
     * @public @method
     * Initializes the quick filter UX
     * @return {Promise.resolve}
     */
    ezInitQuickFilterUx() {
        let selectedPeriod = ezApi.ezclocker.ezClockerContext.ezGetActiveAccountSelectedPeriod();

        if (!EzObject.isValid(selectedPeriod)) {
            selectedPeriod = ezApi.ezclocker.ezDateTime.ezCreateDefaultSelectedPeriod();
        }

        const employerOptions = ezApi.ezclocker.ezClockerContext.ezGetActiveEmployer().options || {};
        const payPeriod = employerOptions.SELECTED_PAY_PERIOD || 'NONE';
        let payPeriodNumeric = EzPayPeriod[payPeriod];

        if (payPeriodNumeric === 0) {
            ezApi.ezclocker.ezUi.ezHideElement('_quickFilterLeftArrowIconId');
            ezApi.ezclocker.ezUi.ezHideElement('_quickFilterRightArrowIconId');
        }

        ezApi.ezclocker.ezDateTime.ezInitDatePicker(
            EzEmployeeDashboardView.ezInstance.ezIds.inputs.selectedPeriodStartDatePickerId,
            {
                onClose: () => {
                    let startMoment = ezApi.ezclocker.ezDateTime.ezDateFromDatePicker(
                        EzEmployeeDashboardView.ezInstance.ezIds.inputs.selectedPeriodStartDatePickerId);

                    ezApi.ezclocker.ezUi
                        .ezId(EzEmployeeDashboardView.ezInstance.ezIds.inputs.selectedPeriodEndDatePickerId)
                        .datepicker('option', 'minDate', ezApi.ezclocker.ezDateTime.ezDateString(startMoment));


                    ezApi.ezclocker.ezUi
                        .ezId(EzEmployeeDashboardView.ezInstance.ezIds.inputs.selectedPeriodEndDatePickerId)
                        .datepicker(
                            'option',
                            'maxDate',
                            ezApi.ezclocker.ezDateTime.ezDateString(startMoment.add(30, 'days'))
                        );
                },
                onClick: () => ezApi.ezclocker.ezUi.ezSelectAll(
                    EzEmployeeDashboardView.ezInstance.ezIds.inputs.selectedPeriodStartDatePickerId),
            },
            {
                dateFormat: ezApi.ezclocker.ezDateTime.ezGetPreferredDatePickerFormat(),
                defaultDate: ezApi.ezclocker.ezDateTime.ezDateString(selectedPeriod.ezPeriodStartMoment),
                constrainInput: true,
            },
            payPeriodNumeric !== 0 ?
                EzEmployeeDashboardController.ezInstance.deriveStartDatePerPayPeriod() :
                selectedPeriod.ezPeriodStartMoment,
            false
        );

        ezApi.ezclocker.ezDateTime.ezInitDatePicker(
            EzEmployeeDashboardView.ezInstance.ezIds.inputs.selectedPeriodEndDatePickerId,
            {
                onClick: () =>
                    ezApi.ezclocker.ezUi.ezSelectAll(
                        EzEmployeeDashboardView.ezInstance.ezIds.inputs.selectedPeriodEndDatePickerId),
            },
            {
                dateFormat: ezApi.ezclocker.ezDateTime.ezGetPreferredDatePickerFormat(),
                defaultDate: ezApi.ezclocker.ezDateTime.ezDateString(selectedPeriod.ezPeriodEndMoment),
                constrainInput: true,
            },
            payPeriodNumeric !== 0 ?
                EzEmployeeDashboardController.ezInstance.deriveEndDatePerPayPeriod() :
                selectedPeriod.ezPeriodEndMoment,
            true
        );


        ezApi.ezclocker.ezEventEngine.ezWantElementEvent(
            EzEmployeeDashboardView.ezInstance.ezIds.buttons.viewSelectedPeriodButtonId,
            EzElementEventName.CLICK,
            EzEmployeeDashboardController.ezApiName,
            EzEmployeeDashboardController.ezInstance.ezHandleQuickFilterSubmit);

        ezApi.ezclocker.ezEventEngine.ezWantElementEvent(
            "_quickFilterRightArrowIconId",
            EzElementEventName.CLICK,
            EzEmployeeDashboardController.ezApiName,
            EzEmployeeDashboardController.ezInstance.renderNextPayPeriod);

        ezApi.ezclocker.ezEventEngine.ezWantElementEvent(
            "_quickFilterLeftArrowIconId",
            EzElementEventName.CLICK,
            EzEmployeeDashboardController.ezApiName,
            EzEmployeeDashboardController.ezInstance.renderPreviousPayPeriod);
    }

    /**
     * @public @method
     * Performs the clock-in operation for the employee
     * @returns {Promise.resolve}
     */
    ezPerformClockIn() {
        ezApi.ezclocker.ezAnalyticsAndMetrics.ezAmplitudeIntegration.ezTrack('Employee Clock In');

        ezApi.ezclocker.ezEmployeeDashboardView.disableClockInOut();

        return EzEmployeeDashboardController.ezInstance.ezObtainNewTimeEntryAssignedDataTagMap()
            .then(
                (timeEntryAssignedDataTagMaps) => ezApi.ezclocker.ezUi.ezStartPageWaitResolve(
                    'Clocking you in ...',
                    (waitDone, resolve) => {
                        ezApi.ezclocker.ezClockInClockOutHelper.ezClockIn(
                            ezApi.ezclocker.ezClockerContext.ezGetActiveEmployer().id,
                            ezApi.ezclocker.ezClockerContext.ezGetActiveEmployee().id,
                            ezApi.ezclocker.ezClockerContext.ezGetActiveAccountSelectedPeriod(),
                            timeEntryAssignedDataTagMaps)
                            .then(
                                (response) => waitDone()
                                    .then(
                                        () => resolve(response)),
                                (eResponse, jqXHR) => waitDone()
                                    .then(
                                        () => {
                                            let _RefreshTimeEntriesAfterError = () => {
                                                return EzEmployeeDashboardController.ezInstance.ezRefreshTimeEntrieAfterError(
                                                    eResponse,
                                                    jqXHR,
                                                    resolve);
                                            }

                                            if (6000 <= eResponse.errorCode && 7000 > eResponse.errorCode) {
                                                return ezApi.ezclocker.ezDialog
                                                    .ezShowErrorDialog('Early Clock In Restricted', eResponse.message)
                                                    .then(EzEmployeeDashboardController.ezInstance.ezRefreshTimeEntriesForPeriod)
                                                    .then(_RefreshTimeEntriesAfterError);
                                            }

                                            return ezApi.ezclocker.ezDialog.ezShowPossibleDefectError(
                                                'Clock In Error',
                                                'An unexpected error occurred while clock in.',
                                                jqXHR,
                                                EzJson.toJson(eResponse))
                                                .then(_RefreshTimeEntriesAfterError);
                                        }))
                    }));
    }

    /**
     * @public @method
     * Determines the Job to assign to the new time entry. Automaticlly generates the new DataTagMap request
     * if the employee has a primary job assignment. Otherwise, will prompt the user to select the job to
     * assign (if they employer is using jobs and as assigned them to the employee or to all employees).
     * @returns {array}
     * Returns an array of the assigned data tag map request for the new time entry.
     */
    ezObtainNewTimeEntryAssignedDataTagMap() {
        return EzPromise.asyncAction(
            (finished) => ezApi.ezclocker.ezClockInClockOutHelper.ezPromptForClockInJobCode('EzPromptForJobCode')
                .then(
                    (dataTagMapRequest) => {
                        if (!EzObject.isValid(dataTagMapRequest)) {
                            return finished(null);
                        }

                        let timeEntryDataTagMap = EzDataTagMap.newTimeEntryDataTagMap(
                            // employerId
                            ezApi.ezclocker.ezClockerContext.ezGetActiveEmployer().id,
                            // dataTagId
                            dataTagMapRequest.dataTagId);

                        return finished([timeEntryDataTagMap.asJSONObject]);
                    }));
    }

    /**
     * @public @method
     * Performs a refresh of the time entries after an error occurred in break in, break out, clock-in, or clock-out
     * @returns (Promise.resolve)
     */
    ezRefreshTimeEntrieAfterError(eResponse, jqXHR, resolve) {
        return EzEmployeeDashboardController.ezInstance.ezRefreshTimeEntriesForPeriod()
            .then(
                () => {
                    ezApi.ezclocker.ezEmployeeDashboardView.ezEnableClockInBreakInOut();

                    return resolve(eResponse, jqXHR);
                });
    }

    /**
     * @public @method
     * Performs the break-in operation for the employee
     * @param {Object} aEmployee
     * @returns {Promise.resolve}
     */
    ezPerformBreakIn() {
        if (EzBoolean.isFalse(ezApi.ezclocker.ezBreakInBreakOutHelper.ezAllowRecordingBreaks)) {
            return ezApi.ezclocker.ezDialog.ezShowOk(
                'Breaks Disabled',
                'Your employer has disabled tracking of unpaid breaks.')
                .then(
                    () => ezApi.ezclocker.ezBreakInBreakOutHelper.ezCurrentBreaMode = EzEmployeeBreakMode.CLOCK_IN);
        }

        ezApi.ezclocker.ezEmployeeDashboardView.disableClockInOut();

        return ezApi.ezclocker.ezUi.ezStartPageWaitResolve(
            'Starting your break ...',
            (waitDone, resolve) => ezApi.ezclocker.ezBreakInBreakOutHelper.ezBreakIn(
                ezApi.ezclocker.ezClockerContext.ezGetActiveEmployer().id,
                ezApi.ezclocker.ezClockerContext.ezGetActiveEmployee().id,
                ezApi.ezclocker.ezClockerContext.ezGetActiveAccountSelectedPeriod())
                .then(
                    (response) => EzEmployeeDashboardController.ezInstance.ezRefreshTimeEntriesForPeriod()
                        .then(() => waitDone().then(() => resolve(response))),
                    (eResponse, jqXHR) => EzEmployeeDashboardController.ezInstance.ezHandleBreakInBreakOutFailure(
                        'Failed to perform a break-in.',
                        'Start Break Error',
                        'An unexpected error occurred while starting a break.',
                        waitDone,
                        eResponse,
                        jqXHR,
                        resolve)));
    }

    /**
     * @public @method
     * Performs the break-out operation for the employee
     * @returns {Promise.resolve}
     */
    ezPerformBreakOut() {
        ezApi.ezclocker.ezEmployeeDashboardView.disableClockInOut();

        return ezApi.ezclocker.ezUi.ezStartPageWaitResolve(
            'Ending your break ...',
            (waitDone, resolve) => ezApi.ezclocker.ezBreakInBreakOutHelper.ezBreakOut(
                ezApi.ezclocker.ezClockerContext.ezGetActiveEmployer().id,
                ezApi.ezclocker.ezClockerContext.ezGetActiveEmployee().id,
                ezApi.ezclocker.ezClockerContext.ezGetActiveAccountSelectedPeriod())
                .then(
                    (response) => EzEmployeeDashboardController.ezInstance.ezRefreshTimeEntriesForPeriod()
                        .then(() => waitDone().then(() => resolve(response))),
                    (eResponse, jqXHR) => EzEmployeeDashboardController.ezInstance.ezHandleBreakInBreakOutFailure(
                        'Failed to perform a break-out.',
                        'End Break Error',
                        'An unexpected error occurred while ending a break.',
                        waitDone,
                        eResponse,
                        jqXHR,
                        resolve)));
    }

    /**
     * @public @method
     * Performs the clock -in operation for the employee
     * @returns {Promise.resolve}
     */
    ezPerformClockOut() {
        ezApi.ezclocker.ezAnalyticsAndMetrics.ezAmplitudeIntegration.ezTrack('Employee Clock Out');

        ezApi.ezclocker.ezEmployeeDashboardView.disableClockInOut();

        return ezApi.ezclocker.ezUi.ezStartPageWaitResolve(
            'Clocking you out ...',
            (waitDone, resolve) => ezApi.ezclocker.ezClockInClockOutHelper.ezClockOut(
                ezApi.ezclocker.ezClockerContext.ezGetActiveEmployer().id,
                ezApi.ezclocker.ezClockerContext.ezGetActiveEmployee().id,
                ezApi.ezclocker.ezClockerContext.ezGetActiveAccountSelectedPeriod())
                .then(
                    () => waitDone()
                        .then(resolve),
                    (eResponse, jqXHR) => waitDone()
                        .then(
                            () => {
                                if (6000 <= eResponse.errorCode && 7000 > eResponse.errorCode) {
                                    return ezApi.ezclocker.ezDialog.ezShowErrorDialog('Early Clock In Restricted', eResponse.message)
                                        .then(EzEmployeeDashboardController.ezInstance.ezRefreshTimeEntriesForPeriod)
                                        .then(
                                            () => resolve(eResponse, jqXHR));
                                }

                                return ezApi.ezclocker.ezDialog.ezShowPossibleDefectError(
                                    'Clock Out Error',
                                    'An unexpected error occurred while clocking you out.',
                                    jqXHR,
                                    EzJson.toJson(eResponse))
                                    .then(
                                        () => EzEmployeeDashboardController.ezInstance.ezRefreshTimeEntrieAfterError(
                                            eResponse,
                                            jqXHR,
                                            resolve));
                            })));
    }

    /**
     * @public @method
     * Refreshes the employee's time entries for the selected period
     * @return {Promise.resolve}
     */
    ezRefreshTimeEntriesForPeriod() {
        let ezSelectedPeriod = ezApi.ezclocker.ezClockerContext.ezGetActiveAccountSelectedPeriod();

        if (!EzObject.isValid(ezSelectedPeriod) ||
            !EzObject.isValid(ezSelectedPeriod.ezPeriodStartMoment) ||
            !EzObject.isValid(ezSelectedPeriod.ezPeriodEndMoment)) {
            ezApi.ezclocker.ezLogger.error(
                'Unable to refresh employee time entries. Period start and/or end moment values are null.');

            return ezApi.ezResolve();
        }

        let dateRangeString = ezApi.ezclocker.ezDateTime.ezToDisplayDateRange(
            ezSelectedPeriod.ezPeriodStartMoment,
            ezSelectedPeriod.ezPeriodEndMoment);

        return ezApi.ezclocker.ezUi.ezStartPageWaitResolve(
            `Refreshing time entries for period ${dateRangeString} ...`,
            (waitDone, resolve) =>
                ezApi.ezclocker.ezClockerContext.ezRefreshActiveEmployeeTimeEntriesForPeriod(ezSelectedPeriod)
                    .then(
                        () => waitDone()
                            .then(resolve),
                        (eResponse, jqXHR) => {
                            ezApi.ezclocker.ezLogger.error(
                                EzString.em`
                                    Failed to refresh time entries.
                                    Error: ${EzJson.toJson(eResponse)}`);

                            return waitDone()
                                .then(
                                    () => ezApi.ezclocker.ezDialog.ezShowPossibleDefectError(
                                        'Error Refreshing Time Entries.',
                                        EzString.em`
                                            Unable to refresh your employee time entries for the selected period of
                                            ${ezApi.ezclocker.ezDateTime.ezDateString(ezSelectedPeriod.ezPeriodStartMoment)}
                                            through
                                            ${ezApi.ezclocker.ezDateTime.ezDateString(ezSelectedPeriod.ezPeriodEndMoment)}
                                            at this time.`,
                                        jqXHR,
                                        eResponse)
                                        .then(resolve));
                        }));
    }

    /**
     * @public @method
     * Shows the export time sheet dialog for the employee
     */
    ezShowExportTimeSheetsForEmployee() {
        let selectedPeriod = ezApi.ezclocker.ezClockerContext.ezGetActiveAccountSelectedPeriod();

        ezApi.ezclocker.ezwEmployerExportTimeSheetDialog.showDialogForEmployee(
            selectedPeriod.ezPeriodStartMoment,
            selectedPeriod.ezPeriodEndMoment,
            ezApi.ezclocker.ezDateTime.activeTimeZone,
            ezApi.ezclocker.ezClockerContext.ezGetActiveEmployer().id,
            ezApi.ezclocker.ezClockerContext.ezGetActiveEmployee().id);
    }

    /**
     * @public @method
     * Handles the ezApi.ezclocker.ezEmployeeContext.onActivePeriodChangeEventName
     * Updates the UX with the latest dates and then filters the dashboard
     * @param {Object} selectedPeriodREsponse
     */
    ezUpdateUXSelectedPeriod(selectedPeriodResponse) {
        let selectedPeriod = EzObject.isValid(selectedPeriodResponse)
            ? selectedPeriodResponse.selectedPeriod
            : ezApi.ezclocker.ezClockerContext.ezGetActiveAccountSelectedPeriod();

        if (EzObject.isValid(selectedPeriod.ezPeriodStartMoment)) {
            let currentFromMoment = ezApi.ezclocker.ezDateTime.ezDateFromDatePicker(
                EzEmployeeDashboardView.ezInstance.ezIds.inputs.selectedPeriodStartDatePickerId);

            if (
                !currentFromMoment.isSame(selectedPeriod.ezPeriodStartMoment) ||
                !ezApi.ezStringHasLength(
                    ezApi.ezclocker.ezUi.ezGetInputValue(
                        EzEmployeeDashboardView.ezInstance.ezIds.inputs.selectedPeriodStartDatePickerId))) {
                ezApi.ezclocker.ezDateTime.ezSetDatePickerValue(
                    EzEmployeeDashboardView.ezInstance.ezIds.inputs.selectedPeriodStartDatePickerId,
                    selectedPeriod.ezPeriodStartMoment);
            }
        }

        if (EzObject.isValid(selectedPeriod.ezPeriodEndMoment)) {
            let currentEndMoment = ezApi.ezclocker.ezDateTime.ezDateFromDatePicker(
                EzEmployeeDashboardView.ezInstance.ezIds.inputs.selectedPeriodEndDatePickerId);

            if (
                !currentEndMoment.isSame(selectedPeriod.ezPeriodEndMoment) ||
                !ezApi.ezStringHasLength(
                    ezApi.ezclocker.ezUi.ezGetInputValue(
                        EzEmployeeDashboardView.ezInstance.ezIds.inputs.selectedPeriodEndDatePickerId))) {
                ezApi.ezclocker.ezDateTime.ezSetDatePickerValue(
                    EzEmployeeDashboardView.ezInstance.ezIds.inputs.selectedPeriodEndDatePickerId,
                    selectedPeriod.ezPeriodEndMoment);
            }
        }
    }

    /**
         * @protected @method
         * Performs the conversion of the clock-in, take-break, and end-break button to the
         * wanted operation state.
         * @param {Object} ezEvent
         * event.data = {
         *    ezAllowAutomaticBreaks: {boolean}
         *    ezAllowRecordingBreaks: {boolean},
         *    ezEmployeeBreakMode: {EzEmployeeBreakMode}
         * }
         */
    ezHandleBreakModeChangedEvent(ezEvent) {
        if (!EzObject.isValid(ezEvent) || !EzObject.isValid(ezEvent.data)) {
            throw new EzBadParamException(
                'ezEvent',
                EzEmployeeDashboardController.ezInstance,
                EzEmployeeDashboardController.ezInstance.ezHandleBreakModeChangedEvent);
        }

        EzEmployeeDashboardView.ezInstance.ezRefreshEmployeeBreakMode();
    }

    /**
     * @protected @method
     * Handles the failure response for break-in and break-out
     * @returns {Promise.resolve}
     */
    ezHandleBreakInBreakOutFailure(em, errorTitle, userErrorMessage, waitDone, eResponse, jqXHR, resolve) {
        ezApi.ezclocker.ezLogger.error(`${em} Error: ${EzJson.toJson(eResponse)}`);

        return waitDone().then(
            ezApi.ezclocker.ezDialog.ezShowPossibleDefectError(
                errorTitle,
                userErrorMessage,
                jqXHR,
                EzJson.toJson(eResponse))
                .then(
                    () => EzEmployeeDashboardController.ezInstance.ezRefreshTimeEntrieAfterError(
                        eResponse,
                        jqXHR,
                        resolve)));
    }

    /**
     * @protected @method
     * Handles the OnActiveAccountSelectedPeriodChanged event
     * Event Data:
     * <code>
     *     {
     *         selectedPeriod: {
     *             ezPeriodStartMoment: selectedPeriodResponse.ezPeriodStartMoment,
     *             ezPeriodEndMoment: selectedPeriodResponse.ezPeriodEndMoment
     *         },
     *         ezPeriodStartMoment: selectedPeriodResponse.ezPeriodStartMoment,
     *         ezPeriodEndMoment: selectedPeriodResponse.ezPeriodEndMoment
     *     }
     * </code>
     * @param {event}
     */
    ezHandleOnActiveAccountSelectedPeriodChanged(event) {
        EzEmployeeDashboardController.ezInstance.ezUpdateUXSelectedPeriod(event.data);

        return EzEmployeeDashboardController.ezInstance.ezRefreshTimeEntriesForPeriod()
            .then(ezApi.ezIgnoreResolve());
    }

    /**
     * @protected @method
     * Handles the clock in button click
     */
    ezHandleClockInButtonClick() {
        if (EzBoolean.isFalse(ezApi.ezclocker.ezBreakInBreakOutHelper.ezAllowRecordingBreaks)) {
            return EzEmployeeDashboardController.ezInstance.ezPerformClockIn()
                .then(EzPromise.ignoreResolve);
        }

        switch (ezApi.ezclocker.ezBreakInBreakOutHelper.ezCurrentBreakMode) {
            case EzEmployeeBreakMode.START_BREAK:
                return EzEmployeeDashboardController.ezInstance.ezPerformBreakIn()
                    .then(ezApi.ezIgnoreResolve);
            case EzEmployeeBreakMode.END_BREAK:
                return EzEmployeeDashboardController.ezInstance.ezPerformBreakOut()
                    .then(ezApi.ezIgnoreResolve);
            case EzEmployeeBreakMode.CLOCK_IN:
            default:
                return EzEmployeeDashboardController.ezInstance.ezPerformClockIn()
                    .then(ezApi.ezIgnoreResolve);
        }
    }

    /**
     * @protected @method
     * Handles the clock out button click
     */
    ezHandleClockOutButtonClick() {
        EzEmployeeDashboardController.ezInstance.ezPerformClockOut();
    }

    /**
     * @protected @method
     * Handles the employee's clock-in event.
     * @param {object} ezEvent
     * ezEvent.data = {
     *     employee: {Object: activeEmployee},
     *     activeClockIn: {Object: activeClockIn}
     * }
     */
    ezHandleActiveEmployeeClockInChangedEvent(ezEvent) {
        if (!EzObject.isValid(ezEvent) || !EzObject.isValid(ezEvent.data)) {
            throw new EzBadParamException(
                'event',
                EzEmployeeDashboardController.ezInstance,
                EzEmployeeDashboardController.ezInstance.ezHandleActiveEmployeeClockInChangedEvent);
        }

        if (!EzObject.isValid(ezEvent.data.activeClockIn)) {
            ezApi.ezclocker.ezClockerContext.ezGetActiveEmployee().isActiveClockIn = false;

            ezApi.ezclocker.ezClockerContext.ezGetActiveEmployee().isActiveBreak = false;

            ezApi.ezclocker.ezEmployeeDashboardView.ezEnableClockInBreakInOut();

            return;
        }

        ezApi.ezclocker.ezClockerContext.ezGetActiveEmployee().isActiveClockIn = EzBoolean.isTrue(ezEvent.data.activeClockIn.isActiveClockIn);

        ezApi.ezclocker.ezClockerContext.ezGetActiveEmployee().isActiveBreak = EzBoolean.isTrue(ezEvent.data.activeClockIn.isActiveBreak);

        if (ezApi.ezclocker.ezClockerContext.ezGetActiveEmployee().isActiveClockIn || ezApi.ezclocker.ezClockerContext.ezGetActiveEmployee().isActiveBreak) {
            ezApi.ezclocker.ezEmployeeDashboardView.ezEnableClockOut();
        } else {
            ezApi.ezclocker.ezEmployeeDashboardView.ezEnableClockInBreakInOut()
        }
    }

    /**
     * @protected @Method
     * Handles the Add Time Entry button click
     */
    ezHandleAddTimeEntryButtonClick() {
        if (EzBoolean.isFalse(ezApi.ezclocker.ezClockerContext?.ezGetUserContext()?.isPersonal) &&
            EzBoolean.isFalse(ezApi.ezclocker.ezEmployeeDashboardController.ezAllowEditTimeSheet)) {
            return ezApi.ezclocker.ezDialog.ezShowOK(
                'Add Time Entry Disabled',
                'Your employer has disabled adding time entries.')
                .then(ezApi.ezIgnoreResolve);
        }

        let newTimeEntry = new EzTimeEntry();

        ezApi.ezclocker.ezTimeAddEditDialogController.ezShow(
            new EzTimeAddEditDialogViewConfiguration(
                ezApi.ezclocker.ezClockerContext.ezGetUserContextPrimaryAccountType(),
                // timeEntry
                newTimeEntry,
                // defaultClockInMoment (current date)
                ezApi.ezclocker.ezDateTime.ezFromIso(newTimeEntry.clockInIso),
                // defaultClockOutMoment (current date)
                ezApi.ezclocker.ezDateTime.ezFromIso(newTimeEntry.clockOutIso),
                // defaultEditReason
                null,
                // allowEditing
                EzEmployeeDashboardController.ezInstance.ezAllowEditTimeSheet,
                // allowEditClockIn
                EzEmployeeDashboardController.ezInstance.ezAllowEditTimeSheet,
                // allowEditClockOut
                EzEmployeeDashboardController.ezInstance.ezAllowEditTimeSheet,
                // allowEditNote
                true,
                // allowBreaks
                ezApi.ezclocker.ezBreakInBreakOutHelper.ezAllowRecordingBreaks,
                // availableJobs
                null
            ));
    }

    /**
     * @protected @method
     * Handles the time entry dialog ezOnTimeEntryDialogTimeEntryAdded event
     */
    ezHandleEzOnTimeEntryDialogTimeEntryAddedUpdated() {
        EzEmployeeDashboardController.ezInstance.ezRefreshTimeEntriesForPeriod()
            .then(ezApi.ezIgnoreResolve);
    }

    /**
     * @protected @method
     * Handles the quick filter submit button click
     */
    ezHandleQuickFilterSubmit() {
        let selectedPeriod = ezApi.ezclocker.ezDateTime.ezCreateSelectedPeriod(
            ezApi.ezclocker.ezDateTime.ezSetMomentStartOfDay(
                ezApi.ezclocker.ezDateTime.ezDateFromDatePicker(
                    EzEmployeeDashboardView.ezInstance.ezIds.inputs.selectedPeriodStartDatePickerId)),
            ezApi.ezclocker.ezDateTime.ezSetMomentEndOfDay(
                ezApi.ezclocker.ezDateTime.ezDateFromDatePicker(
                    EzEmployeeDashboardView.ezInstance.ezIds.inputs.selectedPeriodEndDatePickerId)));

        return ezApi.ezclocker.ezClockerContext.ezSetActiveAccountSelectedPeriod(selectedPeriod)
            .then(EzEmployeeDashboardController.ezInstance.ezRefreshTimeEntriesForPeriod)
            .then(ezApi.ezIgnoreResolve);
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
     * Returns the name of this class's singleton instance when registered with ezApi.
     * @returns {string}
     */
    static get ezApiName() {
        return 'ezEmployeeDashboardController';
    }

    /**
     * @static
     * @public @readonly @property
     * Returns an object of event names that this class may trigger.
     * @returns {object}
     */
    static get ezEventNames() {
        return {
            onReady: 'ezOn_EzEmployeeDashboardController_Ready',
            onInitialized: 'ezOn_EzEmployeeDashboardController_Initialized',
            onPersonalDashboardReady: 'ezOn_PersonalEmployeeDashboard_DataReady',
            onEmployeeDashboardReady: 'ezOn_EmployeeDashboard_DataReady',
        };
    }

    /**
     * @static
     * @private @field
     * Stores the singleton instance of this class that was created by and registerd with EzApi.
     * @type {EzEmployeeDashboardController}
     */
    static #ezInstance = globalThis?.ezApi?.ready && globalThis.ezApi?.ezclocker?.[EzEmployeeDashboardController.ezApiName]
        ? globalThis.ezApi.ezclocker[EzEmployeeDashboardController.ezApiName]
        : null;
    /**
     * @static
     * @public @property @getter
     * Returns the singleton instance of this class that is registered with EzApi (if available yet)
     * @returns {EzEmployeeDashboardController}
     */
    static get ezInstance() {
        return EzEmployeeDashboardController.#ezInstance;
    }
    /**
     * @static
     * @public @property @setter
     * Sets the singleton instance of of this class that is registered with EzApi.
     * @param {EzEmployeeDashboardController} instance
     */
    static set ezInstance(instance) {
        if (null != EzEmployeeDashboardController.#ezInstance) {
            throw new Error('EzEmployeeDashboardController\'s singleton instance is already reigstered with EzApi.');
        }

        EzEmployeeDashboardController.#ezInstance = instance;
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
    static #ezApiRegistrationState = globalThis?.ezApi?.ready && globalThis.ezApi?.ezclocker?.[EzEmployeeDashboardController.ezApiName]
        ? EzRegistrationState.REGISTERED
        : null;
    /**
     * @static
     * @public @property @getter
     * Returns the ezApi registration state of this classes's singleton instance.
     * @returns {string}
     * A valid enum property value from EzRegistrationState
     */
    static get ezApiRegistrationState() {
        return EzEmployeeDashboardController.#ezApiRegistrationState;
    }
    /**
     * @static
     * @public @property @setter
     * Sets the ezApi registration state of this classes's singleton instance.
     * @param {string} ezApiRegistrationState
     * A valid enum property value from EzRegistrationState
     */
    static set ezApiRegistrationState(ezApiRegistrationState) {
        EzEmployeeDashboardController.#ezApiRegistrationState = EzRegistrationState.ezValueOf(ezApiRegistrationState);
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
        return EzRegistrationState.PENDING === EzEmployeeDashboardController.ezApiRegistrationState &&
            globalThis?.ezApi?.ready && globalThis.ezApi?.ezclocker &&
            globalThis.ezApi.ezclocker?.[EzAnalyticsAndMetrics.ezApiName]?.ready &&
            globalThis.ezApi.ezclocker?.[EzClockerContextEventName.ezApiName]?.ready &&
            globalThis.ezApi.ezclocker?.[EzClockerContext.ezApiName]?.ready &&
            globalThis.ezApi.ezclocker?.[EzEmployerService.ezApiName]?.ready &&
            globalThis.ezApi.ezclocker?.[EzOptionsService.ezApiName]?.ready &&
            globalThis.ezApi.ezclocker?.[EzFeatureToggles.ezApiName]?.ready &&
            globalThis.ezApi.ezclocker?.[EzFeaturePackageManager.ezApiName]?.ready &&
            globalThis.ezApi.ezclocker?.[EzNavigation.ezApiName]?.ready &&
            globalThis.ezApi.ezclocker?.[EzUI.ezApiName]?.ready &&
            globalThis.ezApi.ezclocker?.[EzClockInClockOutHelper.ezApiName]?.ready &&
            globalThis.ezApi.ezclocker?.[EzEmployeeDashboardView.ezApiName]?.ready &&
            globalThis.ezApi.ezclocker?.[EzTimeAddEditDialogController.ezApiName]?.ready &&
            globalThis.ezApi.ezclocker?.[EzTeamChatDialog.ezApiName]?.ready &&
            globalThis.ezApi.ezclocker?.[EzwEmployerExportTimeSheetDialog.ezApiName]?.ready;
    }

    /**
     * @static
     * @private @readonly @property
     * Returns if this class's singleton instance is registered with ezApi yet.
     * @returns {boolean}
     */
    static get #ezIsRegistered() {
        return null != EzEmployeeDashboardController.ezInstance &&
            EzRegistrationState.REGISTERED === EzEmployeeDashboardController.ezApiRegistrationState;
    }

    /**
     * @static
     * @private @method
     * Attempts to register the singleton instance for this class with ezApi. Returns true
     * if successful, false otherwise.
     * @returns {boolean}
     */
    static #ezRegistrator() {
        if (EzEmployeeDashboardController.#ezCanRegister && !EzEmployeeDashboardController.#ezIsRegistered) {
            globalThis.ezApi.ezRegisterNewApi(EzEmployeeDashboardController, EzEmployeeDashboardController.ezApiName);
        }

        return EzEmployeeDashboardController.#ezIsRegistered;
    }

    /**
     * @static
     * Static Initialization
     * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
     * >> IMPORTANT <<
     * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
     * Make sure the following properties and methods get defined BEFORE this static initialization section:
     *     1) Property getter EzEmployeeDashboardController.ezApiName
     *     2) Property getter EzEmployeeDashboardController.ezEventNames
     *     3) Property getter EzEmployeeDashboardController.ezInstance
     *     4) Property setter EzEmployeeDashboardController.ezInstance
     *     5) Property getter EzEmployeeDashboardController.ezApiRegistrationState
     *     6) Property setter EzEmployeeDashboardController.ezApiRegistrationState
     *     7) Property getter EzEmployeeDashboardController.#ezCanRegister
     *     8) Property getter EzEmployeeDashboardController.#ezIsRegistered
     *     9) Method EzEmployeeDashboardController.#ezRegistrator()
     */
    static {
        if (!EzEmployeeDashboardController.#ezIsRegistered) {
            EzEmployeeDashboardController.ezApiRegistrationState = EzRegistrationState.PENDING;

            if (!EzEmployeeDashboardController.#ezRegistrator()) {
                document.addEventListener(
                    EzEmployeeDashboardController.ezOnEzApiReadyEventName,
                    EzEmployeeDashboardController.#ezRegistrator);

                document.addEventListener(
                    EzAnalyticsAndMetrics.ezEventNames.onReady,
                    EzEmployeeDashboardController.#ezRegistrator);

                document.addEventListener(
                    EzClockerContextEventName.ezEventNames.onReady,
                    EzEmployeeDashboardController.#ezRegistrator);

                document.addEventListener(
                    EzClockerContext.ezEventNames.onReady,
                    EzEmployeeDashboardController.#ezRegistrator);

                document.addEventListener(
                    EzEmployerService.ezEventNames.onReady,
                    EzEmployeeDashboardController.#ezRegistrator);

                document.addEventListener(
                    EzOptionsService.ezEventNames.onReady,
                    EzEmployeeDashboardController.#ezRegistrator);

                document.addEventListener(
                    EzFeaturePackageManager.ezEventNames.onReady,
                    EzEmployeeDashboardController.#ezRegistrator);

                document.addEventListener(
                    EzFeatureToggles.ezEventNames.onReady,
                    EzEmployeeDashboardController.ezRegistrator);

                document.addEventListener(
                    EzNavigation.ezEventNames.onReady,
                    EzEmployeeDashboardController.#ezRegistrator);

                document.addEventListener(
                    EzUI.ezEventNames.onReady,
                    EzEmployeeDashboardController.#ezRegistrator);

                document.addEventListener(
                    EzClockInClockOutHelper.ezEventNames.onReady,
                    EzEmployeeDashboardController.#ezRegistrator);

                document.addEventListener(
                    EzEmployeeDashboardView.ezEventNames.onReady,
                    EzEmployeeDashboardController.#ezRegistrator);

                document.addEventListener(
                    EzwEmployerExportTimeSheetDialog.ezEventNames.onReady,
                    EzEmployeeDashboardController.#ezRegistrator);

                document.addEventListener(
                    EzTimeAddEditDialogController.ezEventNames.onReady,
                    EzEmployeeDashboardController.#ezRegistrator);
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
