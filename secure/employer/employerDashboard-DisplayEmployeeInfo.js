import {
    EzException,
    EzBadParamException
} from '/ezlibrary/exceptions/EzExceptions.js';

import {
    EzObject,
    EzBoolean,
    EzNumber,
    EzString,
    EzArray,
    EzPromise,
    EzUrl,
    EzHtml,
    EzJson
} from '/ezlibrary/helpers/EzHelpers.js';

import { EzDateTime, ezDateTime } from '/public/javascript/common/ez-date-time.js';

import {
    EzGpsDataStatus,
    EzElementEventName,
    EzClockerFeature,
    EzClockerContextEventName,
    EzUserRole,
    EzTimeEntryType
} from '/ezlibrary/enums/EzEnumerations.js'

import { EzClass } from '/ezlibrary/EzClass.js';

import {
    EzDataTagMap,
    EzTimeEntry,
} from '/ezlibrary/entities/EzEntities.js';

import { EzLocationEntity } from '/secure/javascript/services/ezclocker-location-service.js';
import { EzClockerContext } from '/ezlibrary/EzClockerContext/ez-context.js';
import { EzEmployerOption } from '/ezlibrary/EzEmployerOption.js';
import { EzAnalyticsAndMetrics } from '/ezlibrary/analytics_metrics/EzAnalyticsAndMetrics.js';
import { EzNavigation } from '/public/javascript/common/ezclocker-navigation-helper.js';

import { EzUx } from '/ezlibrary/ux/EzUx.js';
import { EzUI } from '/public/javascript/common/ezui.js';
import { EzAccountServices } from '/public/javascript/services/ezclocker-account-services.js';
import { EzGoogleMapsApi } from '/public/javascript/google/google-maps-api.js';
import { EzTimeEntryService } from '/secure/javascript/services/ezclocker-time-entry-service.js';
import { EzClockInClockOutHelper } from '/secure/javascript/common/ez-clockin-clockout-helper.js';
import { EzEmployeeImage } from '/ezlibrary/EzEmployeeImage.js';
import { EzAnimator } from '/ezlibrary/ez-animator.js';

import { EzDeleteEmployeeController } from '/secure/employer/employerDashboard-DeleteEmployee.js';
import { EzInviteEmployeeDialog } from '/secure/widgets/EzInviteEmployeeDialog/EzInviteEmployeeDialog.js';
import { EzTimeAddEditDialogViewConfiguration } from '/secure/widgets/EzTimeAddEditDialog/EzTimeAddEditDialogViewConfiguration.js';
import { EzTimeAddEditDialogController } from '/secure/widgets/EzTimeAddEditDialog/EzTimeAddEditDialogController.js';
import { EzTeamChatDialog } from '/secure/widgets/EzTeamChatDialog/EzTeamChatDialog.js';
import { EzPayPeriod } from "/ezlibrary/enums/EzPayPeriod";

/**
 * @public @method
 * Employee information display controller
 */
export class EzEmployeeDisplayController extends EzClass {
    /**
     * @public @static @readonly @property
     * @returns {string}
     */
    static get ezApiName() {
        return 'ezEmployeeDisplayController';
    }

    /**
     * @public @static @readonly @property
     * @returns {object}
     */
    static get ezEventNames() {
        return {
            onReady: 'ezOn_EzEmployeeDisplayController_Ready',
            onEmployeeComboSelectionChanged: 'ezOn_EzEmployeeDisplayController_EmployeeComboChange'
        };
    }

    /**
     * @public @static @field
     * @type {string}
     */
    static ezInstance = null;

    /**
     * @public @static @field
     * @type {string}
     */
    static ezApiRegistrationState = null;

    /**
     * @public @static @readonly @property
     * @returns {boolean}
     */
    static get ezCanRegister() {
        return 'PENDING' === EzEmployeeDisplayController.ezApiRegistrationState &&
            globalThis?.ezApi?.ready && globalThis.ezApi?.ezclocker &&
            globalThis.ezApi.ezclocker?.[EzDateTime.ezApiName]?.ready &&
            globalThis.ezApi.ezclocker?.[EzAnalyticsAndMetrics.ezApiName]?.ready &&
            globalThis.ezApi.ezclocker?.[EzNavigation.ezApiName]?.ready &&
            globalThis.ezApi.ezclocker?.[EzAccountServices.ezApiName]?.ready &&
            globalThis.ezApi.ezclocker?.[EzClockerContextEventName.ezApiName]?.ready &&
            globalThis.ezApi.ezclocker?.[EzClockerContext.ezApiName]?.ready &&
            globalThis.ezApi.ezclocker?.[EzTimeEntryService.ezApiName]?.ready &&
            globalThis.ezApi.ezclocker?.[EzEmployeeImage.ezApiName]?.ready &&
            globalThis.ezApi.ezclocker?.[EzClockInClockOutHelper.ezApiName]?.ready &&
            globalThis.ezApi.ezclocker?.[EzUI.ezApiName]?.ready &&
            globalThis.ezApi.ezclocker?.[EzGoogleMapsApi.ezApiName]?.ready &&
            globalThis.ezApi.ezclocker?.[EzAnimator.ezApiName]?.ready &&
            globalThis.ezApi.ezclocker?.[EzInviteEmployeeDialog.ezApiName]?.ready &&
            globalThis.ezApi.ezclocker?.[EzDeleteEmployeeController.ezApiName]?.ready &&
            globalThis.ezApi.ezclocker?.[EzTimeAddEditDialogController.ezApiName]?.ready &&
            globalThis.ezApi.ezclocker?.[EzTeamChatDialog.ezApiName]?.ready;
    }

    /**
     * @private @static @method
     * @returns {boolean}
     */
    static #ezRegistrator() {
        if (!EzEmployeeDisplayController.ezCanRegister) {
            return false;
        }

        EzEmployeeDisplayController.ezInstance = ezApi.ezRegisterNewApi(
            EzEmployeeDisplayController,
            EzEmployeeDisplayController.ezApiName);

        EzEmployeeDisplayController.ezApiRegistrationState = 'REGISTERED';

        return true;
    }

    /**
     * @static
     * Static Initialization
     * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
     * >> IMPORTANT <<
     * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
     * Make sure the following properties and methods get defined BEFORE this static initialization section:
     *     1) Property getter EzEmployeeDisplayController.ezApiName
     *     2) Property getter EzEmployeeDisplayController.ezEventNames
     *     3) Property getter EzEmployeeDisplayController.ezInstance
     *     4) Property setter EzEmployeeDisplayController.ezInstance
     *     5) Property getter EzEmployeeDisplayController.ezApiRegistrationState
     *     6) Property setter EzEmployeeDisplayController.ezApiRegistrationState
     *     7) Property getter EzEmployeeDisplayController.#ezCanRegister
     *     8) Property getter EzEmployeeDisplayController.#ezIsRegistered
     *     9) Method EzEmployeeDisplayController.#ezRegistrator()
     */
    static {
        if (null == EzEmployeeDisplayController.ezApiRegistrationState) {
            EzEmployeeDisplayController.ezApiRegistrationState = 'PENDING';

            if (!EzEmployeeDisplayController.#ezRegistrator()) {
                document.addEventListener(
                    EzEmployeeDisplayController.ezOnEzApiReadyEventName,
                    EzEmployeeDisplayController.#ezRegistrator);

                document.addEventListener(
                    EzDateTime.ezEventNames.onReady,
                    EzEmployeeDisplayController.#ezRegistrator);

                document.addEventListener(
                    EzAnalyticsAndMetrics.ezEventNames.onReady,
                    EzEmployeeDisplayController.#ezRegistrator);

                document.addEventListener(
                    EzNavigation.ezEventNames.onReady,
                    EzEmployeeDisplayController.#ezRegistrator);

                document.addEventListener(
                    EzAccountServices.ezEventNames.onReady,
                    EzEmployeeDisplayController.#ezRegistrator);

                document.addEventListener(
                    EzClockerContextEventName.ezEventNames.onReady,
                    EzEmployeeDisplayController.#ezRegistrator);

                document.addEventListener(
                    EzClockerContext.ezEventNames.onReady,
                    EzEmployeeDisplayController.#ezRegistrator);

                document.addEventListener(
                    EzTimeEntryService.ezEventNames.onReady,
                    EzEmployeeDisplayController.#ezRegistrator);

                document.addEventListener(
                    EzEmployeeImage.ezEventNames.onReady,
                    EzEmployeeDisplayController.#ezRegistrator);

                document.addEventListener(
                    EzClockInClockOutHelper.ezEventNames.onReady,
                    EzEmployeeDisplayController.#ezRegistrator);

                document.addEventListener(
                    EzUI.ezEventNames.onReady,
                    EzEmployeeDisplayController.#ezRegistrator);

                document.addEventListener(
                    EzGoogleMapsApi.ezEventNames.onReady,
                    EzEmployeeDisplayController.#ezRegistrator);

                document.addEventListener(
                    EzAnimator.ezEventNames.onReady,
                    EzEmployeeDisplayController.#ezRegistrator);

                document.addEventListener(
                    EzInviteEmployeeDialog.ezEventNames.onReady,
                    EzEmployeeDisplayController.#ezRegistrator);

                document.addEventListener(
                    EzDeleteEmployeeController.ezEventNames.onReady,
                    EzEmployeeDisplayController.#ezRegistrator);

                document.addEventListener(
                    EzTimeAddEditDialogController.ezEventNames.onReady,
                    EzEmployeeDisplayController.#ezRegistrator);
            }
        }
    }

    /**
     * @public @field
     * @type {string}
     */
    ezActiveClockInContainerState = 'CLOCKED_OUT';

    /**
     * @public @field
     * @type {boolean}
     */
    ezUxEventsHooked = false;

    /**
     * @public @field
     * @type {object}
     */
    ezHintImages = {
        breakLess15Images: {

        },
        breakGreater1HourImages: {

        },
        breakGreater30MinImages: {

        },
        breakGreater15MinImages: {

        },
        errorHintImages: {
            normal: '/public/images/error.ico',
            hot: '/public/images/error_hot.ico'
        },
        warningHintImages: {
            normal: '/public/images/warning.ico',
            hot: '/public/images/warning_hot.ico'
        },
        partialHintImages: {
            normal: '/public/images/partial.ico',
            hot: '/public/images/partial_hot.ico'
        },
        goodHintImages: {
            normal: '/public/images/good.ico',
            hot: '/public/images/good_hot.ico'
        },
    };

    timeOffRequestsUpdated = false;

    /**
     * @deprecated
     * Migrate to: EzEmployeeDisplayController.ezInstance.ezIds.mainContentContainerId
     * @public @readonly @property
     * @returns {string}
     */
    get ezEmployerDashboardMainContentContainerId() {
        return 'EzClockerMainContent';
    }

    /**
     * @deprecated
     * Migrate to: EzEmployeeDisplayController.ezInstance.ezIds.timeEntryContainerId
     * @public @readonly @property
     * @returns {string}
     */
    get ezTimeEntryContainerId() {
        return 'timeEntryContainerDiv';
    }

    /**
     * @public @readonly @property
     * @returns {object}
     */
    get ezIds() {
        return {
            mainContentContainerId: 'EzClockerMainContent',
            timeEntryContainerId: 'timeEntryContainerDiv',
            buttons: {
                quickFilterSubmitButtonId: '_quickFilterSubmit',
                employeeClockInButtonId: '_EmployeeClockInButton',
                employeeClockOutButtonId: '_EmployeeClockOutButton',
                addTimeEntryButtonId: '_AddTimeEntryButton',
                reinviteEmployeeButtonId: '_ReInviteEmployeeButton',
                deleteEmployeeButtonId: '_DeleteEmployeeButton',
                inviteEmployeeButtonId: 'EzInviteEmployeeButton'
            },
            inputs: {
                employeeSelectInputId: 'employeeCombo'
            },
            employeeTotalHoursInputId: '_TotalHours',
            tables: {
                timeEntryGridId: 'EzTimeEntryGrid'
            }
        };
    }

    /**
     * @public @method
     * Initializes EzEmployeeDisplayController
     * @returns {EzEmployeeDisplayController}
     */
    ezInit() {
        // Set full URls for hint images
        EzEmployeeDisplayController.ezInstance.ezHintImages.errorHintImages.normal = ezApi.ezclocker.ezNavigation.ezGetPublicImagesUrl(
            EzEmployeeDisplayController.ezInstance.ezHintImages.errorHintImages.normal);

        EzEmployeeDisplayController.ezInstance.ezHintImages.errorHintImages.hot = ezApi.ezclocker.ezNavigation.ezGetPublicImagesUrl(
            EzEmployeeDisplayController.ezInstance.ezHintImages.errorHintImages.hot);

        EzEmployeeDisplayController.ezInstance.ezHintImages.warningHintImages.normal = ezApi.ezclocker.ezNavigation.ezGetPublicImagesUrl(
            EzEmployeeDisplayController.ezInstance.ezHintImages.warningHintImages.normal);

        EzEmployeeDisplayController.ezInstance.ezHintImages.warningHintImages.hot = ezApi.ezclocker.ezNavigation.ezGetPublicImagesUrl(
            EzEmployeeDisplayController.ezInstance.ezHintImages.warningHintImages.hot);

        EzEmployeeDisplayController.ezInstance.ezHintImages.partialHintImages.normal = ezApi.ezclocker.ezNavigation.ezGetPublicImagesUrl(
            EzEmployeeDisplayController.ezInstance.ezHintImages.partialHintImages.normal);

        EzEmployeeDisplayController.ezInstance.ezHintImages.partialHintImages.hot = ezApi.ezclocker.ezNavigation.ezGetPublicImagesUrl(
            EzEmployeeDisplayController.ezInstance.ezHintImages.partialHintImages.hot);

        EzEmployeeDisplayController.ezInstance.ezHintImages.goodHintImages.normal = ezApi.ezclocker.ezNavigation.ezGetPublicImagesUrl(
            EzEmployeeDisplayController.ezInstance.ezHintImages.goodHintImages.normal);

        EzEmployeeDisplayController.ezInstance.ezHintImages.goodHintImages.hot = ezApi.ezclocker.ezNavigation.ezGetPublicImagesUrl(
            EzEmployeeDisplayController.ezInstance.ezHintImages.goodHintImages.hot);

        ezApi.ezclocker.ezEventEngine.ezRegisterEvent(
            EzEmployeeDisplayController.ezApiName,
            EzEmployeeDisplayController.ezEventNames.onEmployeeComboSelectionChanged);

        ezApi.ezclocker.ezEventEngine.ezWantEvent(
            'ezOn_EmployerDashboardController_Initialized',
            EzEmployeeDisplayController.ezApiName,
            EzEmployeeDisplayController.ezInstance.ezHandleOnActiveAccountReady,
            true);

        // Selected employer employee accounts events
        ezApi.ezclocker.ezEventEngine.ezWantEvent(
            EzClockerContextEventName.onSelectedEmployerEmployeeAccountsUpdated,
            EzEmployeeDisplayController.ezApiName,
            EzEmployeeDisplayController.ezInstance.ezHandleOnSelectedEmployerEmployeeAccountsUpdated,
            true);

        // Active employee active clock-in events
        ezApi.ezclocker.ezEventEngine.ezWantEvent(
            EzClockerContextEventName.onActiveEmployeeActiveClockInChanged,
            EzEmployeeDisplayController.ezApiName,
            EzEmployeeDisplayController.ezInstance.ezHandleOnActiveEmployeeActiveClockInChanged,
            true);

        // Active employee time entries event
        ezApi.ezclocker.ezEventEngine.ezWantEvent(
            EzClockerContextEventName.onActiveEmployeeTimeEntriesChanged,
            EzEmployeeDisplayController.ezApiName,
            EzEmployeeDisplayController.ezInstance.ezHandleOnActiveEmployeeTimeEntriesChanged,
            true);

        // Active employee invite events
        ezApi.ezclocker.ezEventEngine.ezWantEvent(
            EzClockerContextEventName.onActiveEmployeeInviteSuccess,
            EzEmployeeDisplayController.ezApiName,
            EzEmployeeDisplayController.ezInstance.ezHandleOnActiveEmployeeInviteSuccess,
            true);

        ezApi.ezclocker.ezEventEngine.ezWantEvent(
            EzClockerContextEventName.onActiveEmployeeInviteFailure,
            EzEmployeeDisplayController.ezApiName,
            EzEmployeeDisplayController.ezInstance.ezHandleOnActiveEmployeeInviteFailure,
            true);

        // Selected period events
        ezApi.ezclocker.ezEventEngine.ezWantEvent(
            EzClockerContextEventName.onActiveEmployeeSelectedPeriodTotalsReady,
            EzEmployeeDisplayController.ezApiName,
            EzEmployeeDisplayController.ezInstance.ezHandleActiveEmployeeSelectedPeriodTotalsReady,
            true);

        ezApi.ezclocker.ezEventEngine.ezWantEvent(
            EzClockerContextEventName.onActiveEmployeeSelectedPeriodTotalsUpdated,
            EzEmployeeDisplayController.ezApiName,
            EzEmployeeDisplayController.ezInstance.ezHandleActiveEmployeeSelectedPeriodTotalsUpdated,
            true);

        // Employee selection from combo events
        ezApi.ezclocker.ezEventEngine.ezWantEvent(
            EzEmployeeDisplayController.ezEventNames.onEmployeeComboSelectionChanged,
            EzEmployeeDisplayController.ezApiName,
            EzEmployeeDisplayController.ezInstance.ezHandleOnEmployeeComboSelectionChanged,
            true);

        // Active employee events
        ezApi.ezclocker.ezEventEngine.ezWantEvent(
            EzClockerContextEventName.onActiveEmployeeReady,
            EzEmployeeDisplayController.ezApiName,
            EzEmployeeDisplayController.ezInstance.ezHandleOnActiveEmployeeReady,
            true);

        ezApi.ezclocker.ezEventEngine.ezWantEvent(
            EzClockerContextEventName.onActiveEmployeeUpdated,
            EzEmployeeDisplayController.ezApiName,
            EzEmployeeDisplayController.ezInstance.ezHandleonActiveEmployeeUpdated,
            true);

        ezApi.ezclocker.ezEventEngine.ezWantEvent(
            EzClockerContextEventName.onActiveEmployeeChanged,
            EzEmployeeDisplayController.ezApiName,
            EzEmployeeDisplayController.ezInstance.ezHandleonActiveEmployeeChanged,
            true);

        ezApi.ezclocker.ezEventEngine.ezWantEvent(
            EzClockerContextEventName.onActiveEmployeeClosed,
            EzEmployeeDisplayController.ezApiName,
            EzEmployeeDisplayController.ezInstance.ezHandleOnActiveEmployeeClosed,
            true);

        ezApi.ezclocker.ezEventEngine.ezWantEvent(
            EzClockerContextEventName.onActiveEmployeeUserInfoUpdated,
            EzEmployeeDisplayController.ezApiName,
            EzEmployeeDisplayController.ezInstance.ezHandleOnActiveEmployeeUserInfoUpdated,
            true);

        globalThis.window.onresize = EzEmployeeDisplayController.ezInstance.ezHandleWindowResizeEvent;

        return EzEmployeeDisplayController.ezInstance;
    }

    /**
     * @protected @method
     * Handles the EzClockerContext onActiveEmployeeSelectedPeriodTotalsReady event.
     * @param {object} ezEvent
     * Definition of ezEvent for this event:
     *     ezEvent = {
     *         triggerOwner: '{string}',
     *         message: '{string}',
     *         data: {
     *             activeEmployee: {active_employee_ref}
     *             selectedPeriodTotals: {
     *                 totalDecimalHours: "decimal hours as string",
     *                 totalHours: "total hours as HH:MM",
     *                 totalMilliseconds: {total number of milliseconds}
     *             }
     *         }
     *     }
     */
    ezHandleActiveEmployeeSelectedPeriodTotalsReady(ezEvent) {
        if (!EzObject.isValid(ezEvent) || !EzObject.isValid(ezEvent.data) || !EzObject.isValid(ezEvent.data.selectedPeriodTotals)) {
            throw new EzBadParamException(
                'ezEvent',
                EzEmployeeDisplayController.ezInstance,
                EzEmployeeDisplayController.ezInstance.ezHandleActiveEmployeeSelectedPeriodTotalsReady);
        }

        EzEmployeeDisplayController.ezInstance.ezUpdateActiveEmployeeTotalHours(
            EzString.hasLength(ezEvent.data.selectedPeriodTotals.totalHours)
                ? ezEvent.data.selectedPeriodTotals.totalHours
                : '00:00');
    }

    /**
     * @protected @method
     * Handles the EzClockerContext onActiveEmployeeSelectedPeriodTotalsUpdated event.
     * @param {object} ezEvent
     * Definition of ezEvent for this event:
     *     ezEvent = {
     *         triggerOwner: '{string}',
     *         message: '{string}',
     *         data: {
     *             activeEmployee: {active_employee_ref}
     *             selectedPeriodTotals: {
     *                 totalDecimalHours: "decimal hours as string",
     *                 totalHours: "total hours as HH:MM",
     *                 totalMilliseconds: {total number of milliseconds}
     *             }
     *         }
     *     }
     */
    ezHandleActiveEmployeeSelectedPeriodTotalsUpdated(ezEvent) {
        if (!EzObject.isValid(ezEvent) || !EzObject.isValid(ezEvent.data) || !EzObject.isValid(ezEvent.data.selectedPeriodTotals)) {
            throw new EzBadParamException(
                'ezEvent',
                EzEmployeeDisplayController.ezInstance,
                EzEmployeeDisplayController.ezInstance.ezHandleActiveEmployeeSelectedPeriodTotalsUpdated);
        }

        EzEmployeeDisplayController.ezInstance.ezUpdateActiveEmployeeTotalHours(
            EzString.hasLength(ezEvent.data.selectedPeriodTotals.totalHours)
                ? ezEvent.data.selectedPeriodTotals.totalHours
                : '00:00');
    }

    /**
     * @protected @method
     * Resets the main content container by removing and re-injecting the empty container.
     * @returns {Promise.resolve}
     */
    ezResetMainContentContainer() {
        return EzPromise.asyncAction(
            (finished) => EzEmployeeDisplayController.ezInstance.ezResetUxEventHooks()
                .then(
                    () => {
                        if (ezApi.ezclocker.ezUi.ezElementExists(EzEmployeeDisplayController.ezInstance.ezIds.mainContentContainerId)) {
                            ezApi.ezclocker.ezUi.ezRemoveElement(EzEmployeeDisplayController.ezInstance.ezIds.mainContentContainerId);
                        }

                        ezApi.ezclocker.ezUi.ezAppendContent(
                            ezApi.ezclocker.ezEmployerDashboardController.ezDashboardPageContainerId,
                            EzEmployeeDisplayController.ezInstance.ezBuildMainContentHtml());

                        return finished();
                    }));
    }

    /**
     * @protected @method
     * Disconnects hooked events (if any)
     * @returns {Promise.resolve}
     */
    ezResetUxEventHooks() {
        return EzPromise.asyncAction(
            (finished) => {
                if (EzBoolean.isFalse(EzEmployeeDisplayController.ezInstance.ezUxEventsHooked)) {
                    // Already unhooked or never initially hooked
                    return finished();
                }

                if (ezApi.ezclocker.ezUi.ezElementExists(EzEmployeeDisplayController.ezInstance.ezIds.buttons.employeeClockInButtonId)) {
                    ezApi.ezclocker.ezEventEngine.ezUnwantElementEvent(
                        EzEmployeeDisplayController.ezInstance.ezIds.buttons.employeeClockInButtonId,
                        EzElementEventName.CLICK,
                        EzEmployeeDisplayController.ezApiName);
                }

                if (ezApi.ezclocker.ezUi.ezElementExists(EzEmployeeDisplayController.ezInstance.ezIds.buttons.employeeClockOutButtonId)) {
                    ezApi.ezclocker.ezEventEngine.ezUnwantElementEvent(
                        EzEmployeeDisplayController.ezInstance.ezIds.buttons.employeeClockOutButtonId,
                        EzElementEventName.CLICK,
                        EzEmployeeDisplayController.ezApiName);
                }

                if (ezApi.ezclocker.ezUi.ezElementExists(EzEmployeeDisplayController.ezInstance.ezIds.buttons.quickFilterSubmitButtonId)) {
                    ezApi.ezclocker.ezEventEngine.ezUnwantElementEvent(
                        EzEmployeeDisplayController.ezInstance.ezIds.buttons.quickFilterSubmitButtonId,
                        EzElementEventName.CLICK,
                        EzEmployeeDisplayController.ezApiName);
                }

                if (ezApi.ezclocker.ezUi.ezElementExists(EzEmployeeDisplayController.ezInstance.ezIds.buttons.addTimeEntryButtonId)) {
                    ezApi.ezclocker.ezEventEngine.ezUnwantElementEvent(
                        EzEmployeeDisplayController.ezInstance.ezIds.buttons.addTimeEntryButtonId,
                        EzElementEventName.CLICK,
                        EzEmployeeDisplayController.ezApiName);
                }

                if (ezApi.ezclocker.ezUi.ezElementExists(EzEmployeeDisplayController.ezInstance.ezIds.buttons.reinviteEmployeeButtonId)) {
                    ezApi.ezclocker.ezEventEngine.ezUnwantElementEvent(
                        EzEmployeeDisplayController.ezInstance.ezIds.buttons.reinviteEmployeeButtonId,
                        EzElementEventName.CLICK,
                        EzEmployeeDisplayController.ezApiName);
                }

                if (ezApi.ezclocker.ezUi.ezElementExists(EzEmployeeDisplayController.ezInstance.ezIds.buttons.deleteEmployeeButtonId)) {
                    ezApi.ezclocker.ezEventEngine.ezUnwantElementEvent(
                        EzEmployeeDisplayController.ezInstance.ezIds.buttons.deleteEmployeeButtonId,
                        EzElementEventName.CLICK,
                        EzEmployeeDisplayController.ezApiName);
                }

                if (ezApi.ezclocker.ezUi.ezElementExists(EzEmployeeDisplayController.ezInstance.ezIds.employeeTotalHoursInputId)) {
                    ezApi.ezclocker.ezEventEngine.ezWantElementEvent(
                        EzEmployeeDisplayController.ezInstance.ezIds.employeeTotalHoursInputId,
                        EzElementEventName.CLICK,
                        EzEmployeeDisplayController.ezApiName,
                        () => ezApi.ezclocker.ezUi.ezSelectAll(EzEmployeeDisplayController.ezInstance.ezIds.employeeTotalHoursInputId));
                }

                ezApi.ezclocker.ezEventEngine.ezUnwantEvent(
                    EzTimeAddEditDialogController.ezEventNames.onTimeEntryDialogTimeEntryAdded,
                    EzEmployeeDisplayController.ezApiName);

                ezApi.ezclocker.ezEventEngine.ezUnwantEvent(
                    EzTimeAddEditDialogController.ezEventNames.onTimeEntryDialogTimeEntryUpdated,
                    EzEmployeeDisplayController.ezApiName);

                EzEmployeeDisplayController.ezInstance.ezUxEventsHooked = false;

                return finished();
            });
    }

    /**
     * @protected @method
     * Hooks the click events for the employee menu
     * @returns {Promise.resolve}
     */
    ezHookEmployeeMenuButtonEvents() {
        return EzPromise.asyncAction(
            (finished) => {
                if (EzBoolean.isTrue(EzEmployeeDisplayController.ezInstance.ezUxEventsHooked)) {
                    // Already hooked
                    return finished();
                }

                EzEmployeeDisplayController.ezInstance.ezUxEventsHooked = true;

                if (ezApi.ezclocker.ezUi.ezElementExists(EzEmployeeDisplayController.ezInstance.ezIds.buttons.employeeClockInButtonId)) {
                    ezApi.ezclocker.ezEventEngine.ezWantElementEvent(
                        EzEmployeeDisplayController.ezInstance.ezIds.buttons.employeeClockInButtonId,
                        EzElementEventName.CLICK,
                        EzEmployeeDisplayController.ezApiName,
                        EzEmployeeDisplayController.ezInstance.ezHandleClockInButtonClick);
                }

                if (ezApi.ezclocker.ezUi.ezElementExists(EzEmployeeDisplayController.ezInstance.ezIds.buttons.employeeClockOutButtonId)) {
                    ezApi.ezclocker.ezEventEngine.ezWantElementEvent(
                        EzEmployeeDisplayController.ezInstance.ezIds.buttons.employeeClockOutButtonId,
                        EzElementEventName.CLICK,
                        EzEmployeeDisplayController.ezApiName,
                        EzEmployeeDisplayController.ezInstance.ezHandleClockOutButtonClick);
                }

                if (ezApi.ezclocker.ezUi.ezElementExists(EzEmployeeDisplayController.ezInstance.ezIds.buttons.quickFilterSubmitButtonId)) {
                    ezApi.ezclocker.ezEventEngine.ezWantElementEvent(
                        EzEmployeeDisplayController.ezInstance.ezIds.buttons.quickFilterSubmitButtonId,
                        EzElementEventName.CLICK,
                        EzEmployeeDisplayController.ezApiName,
                        () => EzEmployeeDisplayController.ezInstance.ezFilterDashboard()
                            .then(EzPromise.ignoreResolve));
                }

                if (ezApi.ezclocker.ezUi.ezElementExists(EzEmployeeDisplayController.ezInstance.ezIds.buttons.addTimeEntryButtonId)) {
                    ezApi.ezclocker.ezEventEngine.ezWantElementEvent(
                        EzEmployeeDisplayController.ezInstance.ezIds.buttons.addTimeEntryButtonId,
                        EzElementEventName.CLICK,
                        EzEmployeeDisplayController.ezApiName,
                        EzEmployeeDisplayController.ezInstance.ezHandleAddTimeEntryButtonClick);
                }

                if (ezApi.ezclocker.ezUi.ezElementExists(EzEmployeeDisplayController.ezInstance.ezIds.buttons.reinviteEmployeeButtonId)) {
                    ezApi.ezclocker.ezEventEngine.ezWantElementEvent(
                        EzEmployeeDisplayController.ezInstance.ezIds.buttons.reinviteEmployeeButtonId,
                        EzElementEventName.CLICK,
                        EzEmployeeDisplayController.ezApiName,
                        EzEmployeeDisplayController.ezInstance.ezHandleReinviteEmployeeClick);
                }

                const aEmployee = ezApi.ezclocker.ezClockerContext.ezGetActiveEmployee() || {};
                const userContext = ezApi.ezclocker.ezClockerContext.ezGetUserContext();
                const userAccount = (userContext && userContext.userAccount) || {};

                if (ezApi.ezclocker.ezUi.ezElementExists(EzEmployeeDisplayController.ezInstance.ezIds.buttons.deleteEmployeeButtonId) &&
                    (userAccount.id && aEmployee.userId !== userAccount.id)) {
                    ezApi.ezclocker.ezEventEngine.ezWantElementEvent(
                        EzEmployeeDisplayController.ezInstance.ezIds.buttons.deleteEmployeeButtonId,
                        EzElementEventName.CLICK,
                        EzEmployeeDisplayController.ezApiName,
                        ezApi.ezclocker.ezDeleteEmployeeController.ezDeleteEmployee);
                }

                if (ezApi.ezclocker.ezUi.ezElementExists(EzEmployeeDisplayController.ezInstance.ezIds.employeeTotalHoursInputId)) {
                    ezApi.ezclocker.ezEventEngine.ezWantElementEvent(
                        EzEmployeeDisplayController.ezInstance.ezIds.employeeTotalHoursInputId,
                        EzElementEventName.CLICK,
                        EzEmployeeDisplayController.ezApiName,
                        () => ezApi.ezclocker.ezUi.ezSelectAll(EzEmployeeDisplayController.ezInstance.ezIds.employeeTotalHoursInputId));
                }

                ezApi.ezclocker.ezEventEngine.ezWantEvent(
                    EzTimeAddEditDialogController.ezEventNames.onTimeEntryDialogTimeEntryAdded,
                    EzEmployeeDisplayController.ezApiName,
                    EzEmployeeDisplayController.ezInstance.ezHandleOnTimeEntryDialogTimeEntryAdded);

                ezApi.ezclocker.ezEventEngine.ezWantEvent(
                    EzTimeAddEditDialogController.ezEventNames.onTimeEntryDialogTimeEntryUpdated,
                    EzEmployeeDisplayController.ezApiName,
                    EzEmployeeDisplayController.ezInstance.ezHandleOnTimeEntryDialogTimeEntryUpdated);

                return finished();
            });
    }

    /**
     * @public @method
     * Loads the employee associated with the provided Id and sets that employee
     * as the active employee for the dashboard.
     * @param {number} employeeId
     */
    ezSetActiveEmployeeById(employeeId) {
        if (!EzNumber.isNumber(employeeId) || isNaN(employeeId)) {
            employeeId = -1;
        }

        if (0 > employeeId) {
            ezApi.ezclocker.ezClockerContext.ezSetActiveEmployeeFromSelectedEmployerAccountEmployeeAccountsByIndex(-1);
        } else {
            ezApi.ezclocker.ezClockerContext.ezSetSelectedEmployerActiveEmployeeById(employeeId);
        }
    }

    /**
     * @protected @method
     * Creates <option/> tags for each employee in EzEmployeeDisplayController.ezInstance.employees. If selectedEmployeeId is not provided,
     * then -1 is used as the selection id.
     * @returns {string}
     * String of <option/> tags for each employee
     */
    ezRefreshEmployeeSelect(employerAccountInfo) {
        if (!EzObject.isValid(employerAccountInfo)) {
            throw new EzBadParamException(
                'employerAccountInfo',
                EzEmployeeDisplayController.ezInstance,
                EzEmployeeDisplayController.ezInstance.ezRefreshEmployeeSelect);
        }

        if (ezApi.ezclocker.ezUi.ezElementExists(EzEmployeeDisplayController.ezInstance.ezIds.inputs.employeeSelectInputId)) {
            ezApi.ezclocker.ezEventEngine.ezUnwantElementEvent(
                EzEmployeeDisplayController.ezInstance.ezIds.inputs.employeeSelectInputId,
                EzElementEventName.CHANGE,
                EzEmployeeDisplayController.ezApiName);
        }

        if (!ezApi.ezclocker.ezUi.ezElementExists('EzSelectedEmployeeContainer')) {
            return;
        }

        EzEmployeeDisplayController.ezInstance.ezBuildEmployeeSelectContainerHTML();

        ezApi.ezclocker.ezUi.ezContent(
            EzEmployeeDisplayController.ezInstance.ezIds.inputs.employeeSelectInputId,
            EzEmployeeDisplayController.ezInstance.ezBuildAvailableEmployeeSelectionsHTML(employerAccountInfo));

        ezApi.ezclocker.ezEventEngine.ezWantElementEvent(
            EzEmployeeDisplayController.ezInstance.ezIds.inputs.employeeSelectInputId,
            EzElementEventName.CHANGE,
            EzEmployeeDisplayController.ezApiName,
            EzEmployeeDisplayController.ezInstance.ezTriggerEmployeeComboSelectionChanged);

        EzEmployeeDisplayController.ezInstance.ezUpdateInviteEmployeeButton();

        // Manually trigger the event
        EzEmployeeDisplayController.ezInstance.ezTriggerEmployeeComboSelectionChanged();
    }

    /**
     * @protected @method
     * Builds the available employee selections UX HTML
     * @param {object} employerAccountInfo
     */
    ezBuildAvailableEmployeeSelectionsHTML(employerAccountInfo) {
        if (!EzObject.isValid(employerAccountInfo)) {
            throw new EzBadParamException(
                'employerAccountInfo',
                EzEmployeeDisplayController.ezInstance,
                EzEmployeeDisplayController.ezInstance.ezBuildAvailableEmployeeSelectionsHTML);
        }

        if (!EzArray.arrayHasLength(employerAccountInfo.employees)) {
            return EzHtml.build`
                <option value="-1" selected>
                    No Employees
                </option>`;
        }

        let selectedEmployeeId = ezApi.ezclocker.ezOptionsService.ezOptionValueToNumber(
            ezApi.ezclocker.ezClockerContext.ezReadActiveAccountOption(
                EzEmployerOption.EZOPTION_SELECTED_EMPLOYEE_ID,
                '-1'),
            -1);

        if (ezApi.ezclocker.ezClockerContext.ezGetUserContext().isManagerAccount && -1 == selectedEmployeeId) {
            // Use the employer's selected employee to start off if the manager does not initailly have one
            selectedEmployeeId = ezApi.ezclocker.ezOptionsService.ezOptionValueToNumber(
                ezApi.ezclocker.ezClockerContext.ezReadActiveEmployerOption(
                    EzEmployerOption.EZOPTION_SELECTED_EMPLOYEE_ID,
                    '-1'),
                -1);
        }

        let employeeNotSelected = !EzNumber.isNumber(selectedEmployeeId) || -1 == selectedEmployeeId
            ? 'selected'
            : EzString.EMPTY;

        let selectOptions = EzHtml.build`
            <option
                value="-1"
                ${employeeNotSelected}>
                [ Select an Employee ]
            </option>`;

        employerAccountInfo.employees.forEach(
            (employee) => {
                let isSelected = employee.id == parseInt(selectedEmployeeId)
                    ? 'selected'
                    : EzString.EMPTY;

                let roleTag;

                if (EzUserRole.ROLE_MANAGER === employee.primaryRole) {
                    roleTag = " [Manager]";
                } else if (EzUserRole.ROLE_PAYROLL_MANAGER === employee.primaryRole) {
                    roleTag = " [Payroll Manager]";
                } else {
                    roleTag = EzString.EMPTY;
                }

                selectOptions = EzBoolean.isTrue(ezApi.ezclocker.ezUrlHelper.ezShowIds)
                    ? EzHtml.build`
                        ${selectOptions}
                        <option
                            id="_SelectEmployee_${employee.id}"
                            value="${employee.id}"
                            ${isSelected}>
                            ${employee.employeeName}${roleTag}&nbsp;(${employee.id})
                        </option>`
                    : EzHtml.build`
                        ${selectOptions}
                        <option
                            id="_SelectEmployee_${employee.id}"
                            value="${employee.id}"
                            ${isSelected}>
                            ${employee.employeeName}${roleTag}
                        </option>`;
            });

        return selectOptions;
    }

    /**
     * @protected @method
     * Generates the roll tag for the employee
     * @param {object} employee
     * @returns {string}
     */
    ezGenerateRoleTagForEmployee(employee) {
        if (!EzObject.isValid(employee)) {
            return EzString.EMPTY;
        }

        switch (EzString.stringOrEmpty(employee.primaryRole)) {
            case EzUserRole.ROLE_PAYROLL_MANAGER:
                return '&nbsp;(Payroll Manager)';
            case EzUserRole.ROLE_MANAGER:
                return '&nbsp;(Manager)';
            default:
                return EzString.empty;
        }
    }

    /**
     * @protected @method
     * Builds the employee selection combo UX
     */
    ezBuildEmployeeSelectContainerHTML() {
        if (ezApi.ezclocker.ezUi.ezElementExists(EzEmployeeDisplayController.ezInstance.ezIds.inputs.employeeSelectInputId)) {
            // Already in UX
            return;
        }

        if (!ezApi.ezclocker.ezUi.ezElementExists('EzSelectedEmployeeContainer')) {
            return;
        }

        ezApi.ezclocker.ezUi.ezContent(
            'EzSelectedEmployeeContainer',
            EzHtml.build`
                <label
                    for="${EzEmployeeDisplayController.ezInstance.ezIds.inputs.employeeSelectInputId}">
                    Viewing Employee:
                </label>
                <select
                    id="${EzEmployeeDisplayController.ezInstance.ezIds.inputs.employeeSelectInputId}">'
                    loading ...
                </select>
                <button
                    id="${EzEmployeeDisplayController.ezInstance.ezIds.buttons.inviteEmployeeButtonId}"
                    class="ezMajorButton">
                    Add Employee
                </button>`);
    }

    /**
     * @public @method
     * Updates the invite employee button to allow invites or show they have maxed out their license.
     */
    ezUpdateInviteEmployeeButton() {
        let inviteEmployeeButtonClickHandler = EzBoolean.isFalse(ezApi.ezclocker.ezClockerContext.ezGetSelectedEmployerAccountLicense().valid) ||
            0 >= ezApi.ezclocker.ezClockerContext.ezGetSelectedEmployerAccountLicense().availableEmployeeSlots
            ? ezApi.ezclocker.ezNoAvailEmplDialog.ezShow
            : EzEmployeeDisplayController.ezInstance.ezInviteEmployee;

        if (ezApi.ezclocker.ezUi.ezElementExists(EzEmployeeDisplayController.ezInstance.ezIds.buttons.inviteEmployeeButtonId)) {
            ezApi.ezclocker.ezEventEngine.ezUnwantElementEvent(
                EzEmployeeDisplayController.ezInstance.ezIds.buttons.inviteEmployeeButtonId,
                EzElementEventName.CLICK,
                EzEmployeeDisplayController.ezApiName);

            ezApi.ezclocker.ezEventEngine.ezWantElementEvent(
                EzEmployeeDisplayController.ezInstance.ezIds.buttons.inviteEmployeeButtonId,
                EzElementEventName.CLICK,
                EzEmployeeDisplayController.ezApiName,
                inviteEmployeeButtonClickHandler);
        }
    }

    /**
     * @public @method
     * Shows the invite employee dialog.
     */
    ezInviteEmployee() {
        ezApi.ezclocker.ezInviteEmployeeDialog.ezShow('ADD', null, null);
    }

    /**
     * @protected @method
     * Handles the invite employee API call success response
     * @param {object} ezEvent
     * ezEvent.data = {
     *    assignedLocations: []
     *    employee: {object}
     *    employer: {object}
     *    errorCode: {number}
     *    message: {"Success"|Error Message}
     * }
     */
    ezHandleOnInviteEmployeeDialogEmployeeAdded(ezEvent) {
        if (!EzObject.isValid(ezEvent) || !EzObject.isValid(ezEvent.data) || !EzObject.isValid(ezEvent.data.employee)) {
            throw new EzBadParamException(
                'ezEvent',
                EzEmployeeDisplayController.ezInstance,
                EzEmployeeDisplayController.ezInstance.ezHandleOnInviteEmployeeDialogEmployeeAdded);
        }

        let addedEmployee = ezEvent.data.employee;

        return ezApi.ezclocker.ezUi.ezPageWaitAsync(
            'Refreshing employee information ...',
            (waitDone) => ezApi.ezclocker.ezClockerContext.ezRefreshSelectedEmployerEmployees()
                .then(
                    () => ezApi.ezclocker.ezClockerContext.ezSaveActiveAccountOption(
                        EzEmployerOption.EZOPTION_SELECTED_EMPLOYEE_ID,
                        addedEmployee.id.toString())
                        .then(
                            () => ezApi.ezclocker.ezClockerContext.ezRefreshSubscriptionContextActiveSubscription()
                                .then(
                                    () => {
                                        EzEmployeeDisplayController.ezInstance.ezSetActiveEmployeeById(addedEmployee.id);

                                        EzEmployeeDisplayController.ezInstance.ezSetEmployeeSelectValue(addedEmployee.id);

                                        return ezApi.ezclocker.ezClockerContext.ezRefreshActiveEmployeeUserInfo()
                                            .then(
                                                () => waitDone()
                                                    .then(EzPromise.ignoreResolve));
                                    },
                                    (ezRefreshSubscriptionContextActiveSubscriptionErrorResponse) => EzPromise.logReject(
                                        ezRefreshSubscriptionContextActiveSubscriptionErrorResponse,
                                        EzString.em`
                                            Failed to refresh the subscription context's active subscription
                                            due to the following error: ${ezRefreshSubscriptionContextActiveSubscriptionErrorResponse.message}`))),
                    (eResponse) => waitDone()
                        .then(
                            () => {
                                ezApi.ezclocker.ezLogger.error(
                                    EzString.em`
                                        Failed to refresh the employer's employees.
                                        [Error response: ${EzJson.toJson(eResponse)}]`);

                                EzEmployeeDisplayController.ezInstance.ezRefreshActiveEmployeeUX();

                                ezApi.ezclocker.ezDialog.ezShowError(
                                    'Employee Refresh Error',
                                    eResponse.message);
                            })));
    }

    /**
     * @public @method
     * Sets the employee select box's selected value
     */
    ezSetEmployeeSelectValue(employeeId) {
        if (!EzNumber.isNumber(employeeId)) {
            throw new EzBadParamException(
                'employeeId',
                EzEmployeeDisplayController.ezInstance,
                EzEmployeeDisplayController.ezInstance.ezSetEmployeeSelectValue);
        }

        ezApi.ezclocker.ezUi.ezSetInputValue(
            EzEmployeeDisplayController.ezInstance.ezIds.inputs.employeeSelectInputId,
            employeeId);
    }

    /**
     * @public @method
     * Handles the export time sheet button click
     */
    ezHandleExportTimeSheetsButtonClick() {
        ezApi.ezclocker.ezEmployerTimesheetReportDialog.ezShow();
    }

    /**
     * @protected @method
     * Sets the employee email link
     * @param {string} employeeContactEmail
     */
    ezSetEmployeeEmailLink(employeeContactEmail) {
        if (!EzString.hasLength(employeeContactEmail)) {
            ezApi.ezclocker.ezUi.ezContent(
                'EzEmployeeInfoEmployeeEmail',
                EzString.EMPTY);

            return;
        }

        if (ezApi.ezclocker.ezUrlHelper.ezShowIds && employeeContactEmail.indexOf('mailinator.com')) {
            ezApi.ezclocker.ezUi.ezContent(
                'EzEmployeeInfoEmployeeEmail',
                EzHtml.build`
                    <a
                        id="EzEmployeeInfoEmployeeEmail"
                        class="employeeEmailLink"
                        href="https://www.mailinator.com/v4/public/inboxes.jsp?to=${employeeContactEmail.split('@')[0]}"
                        target="${employeeContactEmail}">
                        ${employeeContactEmail}
                    </a>`);
        } else {
            ezApi.ezclocker.ezUi.ezContent(
                'EzEmployeeInfoEmployeeEmail',
                EzHtml.build`
                    <a
                        id="EzEmployeeInfoEmployeeEmail"
                        class="employeeEmailLink"
                        href="mailto:${employeeContactEmail}">
                        ${employeeContactEmail}
                    </a>`);
        }
    }

    /**
     * @protected @method
     * Sets the employee image
     * @param {number} employeeId
     * @returns {Promise.resolve}
     */
    ezSetEmployeeImage(employeeId) {
        return EzPromise.asyncAction(
            (finished) => {
                return ezApi.ezclocker.ezEmployeeImage.ezGetPrimaryEmployeeImageUrl(employeeId)
                    .then(
                        (employeeImageUrl) => {
                            ezApi.ezclocker.ezUi.setImgElementSrc('_EmployeeImage', employeeImageUrl);

                            ezApi.ezclocker.ezUi.ezShowElement('_EmployeeImage');

                            return finished(employeeImageUrl);
                        });
            });
    }

    /**
     * @protected @method
     * Sets the employee name in the selection combo box
     * @param {number} employeeId
     * @param {string} employeeName
     */
    ezSetEmployeeSelectDisplayName(employeeId, employeeName) {
        if (!EzNumber.isNumber(employeeId)) {
            throw new EzBadParamException(
                'employeeId',
                EzEmployeeDisplayController.ezInstance,
                EzEmployeeDisplayController.ezInstance.ezSetEmployeeSelectOptionDisplayName);
        }

        if (!EzString.hasLength(employeeName)) {
            employeeName = `No Name Employee #${employeeId}`;
        }

        if (EzBoolean.isTrue(ezApi.ezclocker.ezUrlHelper.ezShowIds)) {
            // Update selection box name
            ezApi.ezclocker.ezUi.ezContent(
                `_SelectEmployee_${employeeId}`,
                `${employeeName}&nbsp;(${employeeId})`);
        } else {
            // Update selection box name
            ezApi.ezclocker.ezUi.ezContent(
                `_SelectEmployee_${employeeId}`,
                employeeName);
        }
    }

    /**
     * @protected @method
     * Sets the employee name in employee display header bar
     * @param {number} employeeId
     * @param {string} employeeName
     */
    ezSetEmployeeHeaderNameValues(employeeId, employeeName) {
        if (!EzNumber.isNumber(employeeId)) {
            throw new EzBadParamException(
                'employeeId',
                EzEmployeeDisplayController.ezInstance,
                EzEmployeeDisplayController.ezInstance.ezSetEmployeeSelectOptionDisplayName);
        }

        if (!EzString.hasLength(employeeName)) {
            employeeName = `No Name Employee #${employeeId}`;
        }

        // Update employee information bar
        let employeeNameHtml = ezApi.ezclocker.ezUrlHelper.ezShowIds
            ? EzHtml.build`
                <div
                    class="ezContainer-contentBox-transparent ezRightMargin_8">
                    ${employeeName}
                    <span
                        id="EzShowIds_EmployeeName_EmployeeIdSpan"
                        class="ezContainer-showids">
                        (${employeeId})
                    </span>
                </div>`
            : EzHtml.build`
                <div
                    class="ezContainer-contentBox-transparent ezRightMargin_8">
                    ${employeeName}
                </div>`;

        ezApi.ezclocker.ezUi.ezContent(
            'EzEmployeeInfoEmployeeName',
            EzHtml.build`
                    ${employeeNameHtml}
                    <div
                        id="EzEditEmployeeInfoButtonBox"
                        class="ezContainer-toolbutton">
                        <button
                            id="EzEditEmployeeInfo"
                            class="ezTransparentToolButton"
                            onclick="ezApi.ezclocker.ezEmployeeDisplayController.ezUpdateActiveEmployeeInfo()">
                            <img
                                id="EzEditEmployeeInformationImg"
                                class="ezEditButtonImage_18x18"
                                title="Edit Employee Information"
                                src="${ezApi.ezclocker.ezNavigation.ezGetPublicImagesUrl('edit-16x16-white.png')}"/>
                            </button>
                    </div>`);

        EzEmployeeDisplayController.ezInstance.ezEnableEditEmployeeButton();
    }

    /**
     * @protected @method
     * Sets the employee's menu button captions to include the employee name when available.
     * @param {number} employeeId
     * @param {string} employeeName
     */
    ezSetEmployeeMenuButtonCaptions(employeeId, employeeName) {
        if (!EzNumber.isNumber(employeeId)) {
            throw new EzBadParamException(
                'employeeId',
                EzEmployeeDisplayController.ezInstance,
                EzEmployeeDisplayController.ezInstance.ezSetEmployeeSelectOptionDisplayName);
        }

        if (!EzString.hasLength(employeeName)) {
            employeeName = `No Name Employee #${employeeId}`;
        }

        // Update clock in/out buttons
        ezApi.ezclocker.ezUi.ezContent(
            'clockInButtonEmployeeName',
            employeeName);

        ezApi.ezclocker.ezUi.ezContent(
            'clockOutButtonEmployeeName',
            employeeName);
    }

    /**
     * @public @method
     * Updates the active employee's clock in/out status
     * The success response from EzClockerContext.ezRefreshActiveEmployeeActiveClockIn: {
     *     employee: EzEmployeeDisplayController.ezInstance.ezGetActiveEmployee(),
     *     activeClockIn: EzEmployeeDisplayController.ezInstance.ezGetActiveEmployeeActiveClockIn()
     * }
     * @public {Boolean} quiet
     * If true, does not show the wait spinner when updating.
     * @returns {Promise.resolve}
     * Passes along the response from ezApi.ezclocker.ezClockerContext.ezRefreshActiveEmployeeActiveClockIn
     */
    ezUpdateClockInOutStatus(quiet) {
        return EzPromise.asyncAction(
            (finished) => EzBoolean.isTrue(quiet)
                ? ezApi.ezclocker.ezClockerContext.ezRefreshActiveEmployeeActiveClockIn()
                : ezApi.ezclocker.ezUi.ezPageWaitExecute(
                    'Checking clock in/out status ...',
                    (waitDone) => {
                        return ezApi.ezclocker.ezClockerContext.ezRefreshActiveEmployeeActiveClockIn()
                            .then(
                                (response) => {
                                    EzEmployeeDisplayController.ezInstance.ezDetermineIfNewTimeoffAndShowModal();

                                    return waitDone()
                                        .then(
                                            () => finished(response));
                                },
                                (eResponse) => {
                                    let em = EzString.em`
                                        Failed to obtain the clock in or clock out status for the active employee.
                                        Error response: ${EzJson.toJson(eResponse)}`;

                                    ezApi.ezclocker.ezLogger.error(em);

                                    ezApi.ezclocker.ezDialog.ezShowServiceResponseErrorDialog(
                                        'Error Readying Clock In/Out Status',
                                        EzString.em`
                                            EzClocker is unable to obtain the clock in or clock out status for the
                                            currently selected employee.`,
                                        eResponse)
                                        .then(waitDone)
                                        .then(finished);
                                });
                    }))
            .catch(ezApi.ezclocker.ezDialog.ezPromiseCatchHandler);
    }

    /**
     * @public @method
     * Determines if a new time off is available for review and displays message to logged in user.
     */
    ezDetermineIfNewTimeoffAndShowModal() {
        if (EzEmployeeDisplayController.ezInstance.timeOffRequestsUpdated) {
            ezApi.ezclocker.ezDialog.ezShowOKMessage(
                'Time off request!',
                EzHtml.build`
                    <h2>New time off request to review!</h2>
                    <p>You have new or updated time-off requests ready to be reviewed.</p>`,
                null,
                600)
                .then(
                    () => {
                        EzEmployeeDisplayController.ezInstance.timeOffRequestsUpdated = false;

                        ezApi.ezclocker.ezClockerContext.ezSaveSelectedEmployerOption(
                            ezApi.ezclocker.ezOptionsService.NOTIFY_TIME_OFF_REQUESTS_UPDATED,
                            'false');
                    })
        };
    }

    /**
     * @public @method
     * Shows the invite employee dialog.
     */
    ezUpdateActiveEmployeeInfo() {
        ezApi.ezclocker.ezInviteEmployeeDialog.activeEmployee = ezApi.ezclocker.ezClockerContext.ezGetActiveEmployee();

        let showUpdateActiveEmployeeInfoError = (em) => {
            let additionalDetails = EzString.hasLength(em)
                ? EzHtml.build`
                    <div
                        id="EzErrorAdditionalDetailsContainer"
                        class="ez-faded-error-details">
                        Additional Details
                        If you contact ezClocker support about this error please include any information available below:
                        <div
                            id="">
                            <textarea
                                id="EzErrorAdditionalDetailsTextArea"
                                class="ez-error-message-details"
                                rows="8">
                                ${em}
                            </textarea>
                        </div>`
                : EzString.EMPTY;

            return ezApi.ezclocker.ezDialog.ezShowError(
                'Edit Employee Info Error',
                EzHtml.build`
                    <p
                        class="ezText-main-dialog-message">
                        Unable to obtain the employee's user information at this time.
                    </p>
                    ${additionalDetails}`);
        };

        EzEmployeeDisplayController.ezInstance.ezDisableEditEmployeeButton();

        ezApi.ezclocker.ezUi.ezStartPageWaitExecute(
            'Loading employee information ...',
            (waitDone) => ezApi.ezclocker.ezClockerContext.ezRefreshActiveEmployee()
                .then(
                    () => ezApi.ezclocker.ezAccountServices.ezGetEmployeeUserInfo(ezApi.ezclocker.ezInviteEmployeeDialog.activeEmployee.id)
                        .then(
                            (response) => {
                                ezApi.ezclocker.ezInviteEmployeeDialog.ezShow(
                                    'UPDATE',
                                    ezApi.ezclocker.ezClockerContext.ezGetActiveEmployee(),
                                    response.entity);

                                EzEmployeeDisplayController.ezInstance.ezEnableEditEmployeeButton();

                                return waitDone()
                                    .then(EzPromise.ignoreResolve);
                            },
                            (eResponse) => waitDone()
                                .then(
                                    () => {
                                        showUpdateActiveEmployeeInfoError(eResponse.message);

                                        EzEmployeeDisplayController.ezInstance.ezEnableEditEmployeeButton()
                                    })),
                    (eResponse) => waitDone()
                        .then(
                            () => {
                                showUpdateActiveEmployeeInfoError(eResponse.message);

                                EzEmployeeDisplayController.ezInstance.ezEnableEditEmployeeButton();
                            })));
    }

    /**
     * @public @method
     * Disables the employee edit button
     */
    ezDisableEditEmployeeButton() {
        ezApi.ezclocker.ezUi.ezDisableElement('EzEditEmployeeInfo');
    }

    /**
     * @public @method
     * Enables the employee edit button
     */
    ezEnableEditEmployeeButton() {
        ezApi.ezclocker.ezUi.ezEnableElement('EzEditEmployeeInfo');
    }

    /**
     * @protected @method
     * Handles successful update of employe information
     */
    ezHandleOnInviteEmployeeDialogEmployeeUpdated() {
        let currentActiveEmployee = ezApi.ezclocker.ezClockerContext.ezGetActiveEmployee();

        return ezApi.ezclocker.ezUi.ezPageWaitAsync(
            'Refreshing employee information ...',
            (waitDone) => ezApi.ezclocker.ezClockerContext.ezRefreshSelectedEmployerEmployees()
                .then(
                    () => {
                        EzEmployeeDisplayController.ezInstance.ezSetActiveEmployeeById(currentActiveEmployee.id);

                        return ezApi.ezclocker.ezClockerContext.ezRefreshActiveEmployeeUserInfo()
                            .then(waitDone)
                            .then(EzPromise.ignoreResolve);
                    },
                    (eResponse) => waitDone()
                        .then(
                            () => {
                                ezApi.ezclocker.ezLogger.error(
                                    EzString.em`
                                        Failed to refresh the employer's employees.
                                        Error: ${EzJson.toJson(eResponse)}`);

                                ezApi.ezclocker.ezClockerContext.ezSetSelectedEmployerActiveEmployeeById(currentActiveEmployee.id);

                                ezApi.ezclocker.ezDialog.ezShowError(
                                    'Employee Refresh Error',
                                    eResponse.message);
                            })));
    }

    /**
     * @protected @method
     * Updates a time entry visible on the grid
     * @param timeEntry
     */
    ezUpdateTimeEntryInGrid(timeEntry) {
        // ****
        // NOTE: Logic to update totals is broken, do not use this flow until it is fixed.
        // ****

        if (!EzObject.isValid(timeEntry)) {
            // nothing to update
            return;
        }

        // Update this time entry in the context
        timeEntry = ezApi.ezclocker.ezClockerContext.ezUpdateActiveEmployeeTimeEntry(timeEntry);

        let clockInMoment = EzString.hasLength(timeEntry.clockInIso)
            ? ezApi.ezclocker.ezDateTime.ezCreateFromIso(timeEntry.clockInIso)
            : null;

        let clockOutMoment = EzString.hasLength(timeEntry.clockInIso)
            ? ezApi.ezclocker.ezDateTime.ezCreateFromIso(timeEntry.clockOutIso)
            : ezApi.ezclocker.ezDateTime.ezMomentFromMoment(clockInMoment);

        // Set clock in and out dates
        let clockInDateColumnId = ezApi.ezclocker.ezUi.ezBuildEntityLinkedElementId('clockInDate', timeEntry.id);

        let clockOutDateColumnId = ezApi.ezclocker.ezUi.ezBuildEntityLinkedElementId('clockOutDate', timeEntry.id);

        ezApi.ezclocker.ezUi.ezContent(
            clockInDateColumnId,
            EzObject.isValid(clockInMoment)
                ? clockInMoment.format('ddd MM/DD/YYYY')
                : '--');

        ezApi.ezclocker.ezUi.ezContent(
            clockOutDateColumnId,
            EzObject.isValid(clockOutMoment) && EzBoolean.isFalse(timeEntry.isActiveClockIn)
                ? clockOutMoment.format('ddd MM/DD/YYYY')
                : '--');

        // Set clock in and out times
        let clockInTimeColumnId = ezApi.ezclocker.ezUi.ezBuildEntityLinkedElementId('clockInTime', timeEntry.id);

        let clockOutTimeColumnId = ezApi.ezclocker.ezUi.ezBuildEntityLinkedElementId('clockOutTime', timeEntry.id);

        ezApi.ezclocker.ezUi.ezContent(
            clockInTimeColumnId,
            EzObject.isValid(clockInMoment)
                ? clockInMoment.format('hh:mm a')
                : '--');

        ezApi.ezclocker.ezUi.ezContent(
            clockOutTimeColumnId,
            EzObject.isValid(clockOutMoment) && EzBoolean.isFalse(timeEntry.isActiveClockIn)
                ? clockOutMoment.format('hh:mm a')
                : '--');

        // Render the time entry total display
        let totalTimeColumnId = ezApi.ezclocker.ezUi.ezBuildEntityLinkedElementId('totalTime', timeEntry.id);

        ezApi.ezclocker.ezUi.ezContent(totalTimeColumnId, timeEntry.totalForShift);

        let jobCodeColumnId = ezApi.ezclocker.ezUi.ezBuildEntityLinkedElementId('jobcode', timeEntry.id);

        if (ezApi.ezclocker.ezClockerContext.ezActiveEmployerFeatureEnabled(EzClockerFeature.EZ_JOBS)) {
            let jobCodeName = EzArray.arrayHasLength(timeEntry.assignedJobs)
                ? ezApi.ezStringOrEmpty(timeEntry.assignedJobs[0].tagName)
                : EzString.EMPTY;

            ezApi.ezclocker.ezUi.ezContent(jobCodeColumnId, jobCodeName);
        }

        // Render the time entry notes display
        let notesColumnId = ezApi.ezclocker.ezUi.ezBuildEntityLinkedElementId('notes', timeEntry.id);

        ezApi.ezclocker.ezUi.ezContent(notesColumnId, ezApi.ezStringOrEmpty(timeEntry.notes));

        // Set the row highlighting
        let totalHours = parseInt(timeEntry.totalTime.split(':'));

        let rowClass = EzHtml.build`ezGridDataCell ${EzEmployeeDisplayController.ezInstance.ezGetTimeEntryRowCSSClass(timeEntry, totalHours)}`;

        ezApi.ezclocker.ezUi.ezSetElementAttribute(
            clockInDateColumnId,
            'class',
            EzHtml.build`ezGridDateCell ezGridDataCell ${rowClass}`);

        ezApi.ezclocker.ezUi.ezSetElementAttribute(
            clockOutDateColumnId,
            'class',
            EzHtml.build`ezGridDateCell ezGridDataCell ${rowClass}`);

        ezApi.ezclocker.ezUi.ezSetElementAttribute(
            clockInTimeColumnId,
            'class',
            EzHtml.build`ezGridTimeCell ezGridDataCell ${rowClass}`);

        ezApi.ezclocker.ezUi.ezSetElementAttribute(
            clockOutTimeColumnId,
            'class',
            EzHtml.build`ezGridTimeCell ezGridDataCell ${rowClass}`);

        ezApi.ezclocker.ezUi.ezSetElementAttribute(
            totalTimeColumnId,
            'class',
            EzHtml.build`ezGridTotalTimeCell ezGridDataCell ${rowClass}`);

        ezApi.ezclocker.ezUi.ezSetElementAttribute(
            jobCodeColumnId,
            'class',
            EzHtml.build`ezGridJobCell ezGridDataCell ${rowClass}`);

        ezApi.ezclocker.ezUi.ezSetElementAttribute(
            notesColumnId,
            'class',
            EzHtml.build`ezGridNotesCell ezGridDataCell ${rowClass}`);

        ezApi.ezclocker.ezUi.ezSetElementAttribute(
            ezApi.ezclocker.ezUi.ezBuildEntityLinkedElementId('location', timeEntry.id),
            'class',
            EzHtml.build`ezGridMapCell ${ezApi.ezStringOrEmpty(rowClass)} centerCell timeEntryGpsStatusText`);

        EzEmployeeDisplayController.ezInstance.ezUpdateTimeEntryHintImage(timeEntry);
    }

    /**
     * @public @method
     * Returns the CSS class to use for the time entry row
     * @param {object} timeEntry
     * @param {number} totalHours
     * @returns {string}
     * CSS class name to use
     */
    ezGetTimeEntryRowCSSClass(timeEntry, totalHours) {
        if (!EzObject.isValid(timeEntry)) {
            return EzString.EMPTY;
        }

        let ezTimeEntryType = EzString.hasLength(timeEntry.timeEntryType)
            ? EzTimeEntryType.ezValueOf(timeEntry.timeEntryType.toUpperCase())
            : ezTimeEntryType.NORMAL;

        if (EzTimeEntryType.isShiftType(ezTimeEntryType)) {
            if ('EndDateClipped' === timeEntry.partialTimeEntry ||
                'StartDateClipped' === timeEntry.partialTimeEntry ||
                'StartAndEndDateClipped' === timeEntry.partialTimeEntry) {
                // Class from timeEntryTable.css
                return 'ezGridPartialCell';
            }

            if (timeEntry.isActiveClockIn) {
                // Class from timeEntryTable.css
                return 'ezGridClockInCell';
            }

            if (EzObject.isValid(totalHours) && totalHours > 8) {
                // Class from timeEntryTable.css
                return 'ezGridWarningCell';
            }
        }

        if (EzTimeEntryType.isBreakType(ezTimeEntryType)) {
            if (timeEntry.isActiveBreak) {
                // Class from timeEntryTable.css
                return 'ezGridActiveBreakCell';
            }
        }

        if (EzTimeEntryType.isPaidTimeOffType(ezTimeEntryType)) {
            if (timeEntry.isActiveBreak) {
                // Class from timeEntryTable.css
                return 'ezGridActiveBreakCell';
            }
        }

        if (EzTimeEntryType.isUnpaidTimeOffType(ezTimeEntryType)) {
            // Class from timeEntryTable.css
            return 'ezGridUnpaidTimeOffCell';
        }

        return EzString.EMPTY;
    }

    /**
     * @protected @method
     * Updates the provided timeentry's hint image in the gird
     * @param {undefiend|null|object} timeEntry
     */
    ezUpdateTimeEntryHintImage(timeEntry) {
        if (!EzObject.isValid(timeEntry)) {
            return; // nothing to update
        }

        let clockInIsoLocalDTZ = ezApi.ezclocker.ezDateTime.ezToIso(
            ezApi.ezclocker.ezDateTime.ezFromIso(timeEntry.clockInIso8601));

        let clockOutIsoLocalDTZ = ezApi.ezclocker.ezDateTime.ezToIso(
            ezApi.ezclocker.ezDateTime.ezFromIso(timeEntry.clockOutIso8601));

        let hintImageId = `hintImage_${timeEntry.id}`;

        if (clockInIsoLocalDTZ === clockOutIsoLocalDTZ) {
            ezApi.ezclocker.ezUi.ezSetElementAttribute(
                hintImageId,
                'title',
                'Not Complete');

            ezApi.ezclocker.ezUi.ezSetElementAttribute(
                hintImageId,
                'alt',
                'Not Complete');

            ezApi.ezclocker.ezUi.ezSetElementAttribute(
                hintImageId,
                'src',
                '/public/images/error.ico');

            return;
        }

        if (timeEntry.totalHours > 8) {
            ezApi.ezclocker.ezUi.ezSetElementAttribute(
                hintImageId,
                'title',
                'Exceeds Eight Hours');

            ezApi.ezclocker.ezUi.ezSetElementAttribute(
                hintImageId,
                'alt',
                'Time Exceeds Eight Hours');

            ezApi.ezclocker.ezUi.ezSetElementAttribute(
                hintImageId,
                'src',
                '/public/images/warning.ico');

            return;
        }

        if (EzTimeEntryType.isTimeOffType(timeEntry.timeEntryType)) {
            ezApi.ezclocker.ezUi.ezSetElementAttribute(
                hintImageId,
                'title',
                'Approved Time Off');

            ezApi.ezclocker.ezUi.ezSetElementAttribute(
                hintImageId,
                'alt',
                'Approved Time Off');

            ezApi.ezclocker.ezUi.ezSetElementAttribute(
                hintImageId,
                'src',
                '/public/images/approved-time-off.ico');

            return;
        }

        ezApi.ezclocker.ezUi.ezSetElementAttribute(
            hintImageId,
            'title',
            EzString.EMPTY);

        ezApi.ezclocker.ezUi.ezSetElementAttribute(
            hintImageId,
            'alt',
            EzString.EMPTY);

        ezApi.ezclocker.ezUi.ezSetElementAttribute(
            hintImageId,
            'src',
            '/public/images/good.ico');
    }

    /**
     * @public @method
     * Display the active clock in status box
     * @param {object} employeeInfo
     * {
     *     employee: {Active Employee Object},
     *     activeClockIn: {null|Active Time Entry Object}
     * }
     * Displays the active clock in (or out) status box
     */
    ezDisplayActiveClockInStatusBox(employeeInfo) {
        if (!EzObject.isValid(employeeInfo)) {
            throw new EzBadParamException(
                'employeeInfo',
                EzEmployeeDisplayController.ezInstance,
                EzEmployeeDisplayController.ezInstance.ezDisplayActiveClockInStatusBox);
        }

        if (!EzObject.isValid(employeeInfo.activeClockIn) && EzBoolean.isTrue(employeeInfo.isActiveClockIn)) {
            return ezApi.ezclocker.ezClockInClockOutHelper.ezRefreshActiveClockIn()
                .then(EzPromise.ignoreResolve);
        }

        EzEmployeeDisplayController.ezInstance.ezDisableClockInOut();

        let newActiveClockInContainerState;
        if (EzObject.isValid(employeeInfo.activeClockIn)) {
            EzEmployeeDisplayController.ezInstance.ezEnableClockOut();

            newActiveClockInContainerState = `CLOCKED_IN_${employeeInfo.employee.id}_${employeeInfo.activeClockIn.id}`;

            if (newActiveClockInContainerState === EzEmployeeDisplayController.ezInstance.ezActiveClockInContainerState) {
                ezApi.ezclocker.ezUi.ezSetContent(
                    '_ActiveClockInContainer',
                    EzEmployeeDisplayController.ezInstance.ezBuildActiveClockInStatusBox(employeeInfo.activeClockIn));
            } else {
                EzEmployeeDisplayController.ezInstance.ezActiveClockInContainerState = newActiveClockInContainerState;

                return ezApi.ezclocker.ezAnimator.ezFadeOut('_ActiveClockInContainer')
                    .then(
                        () => {
                            ezApi.ezclocker.ezUi.ezSetContent(
                                '_ActiveClockInContainer',
                                EzEmployeeDisplayController.ezInstance.ezBuildActiveClockInStatusBox(employeeInfo.activeClockIn));

                            EzEmployeeDisplayController.ezInstance.ezActiveClockInIntervalTickerInfo =
                                ezApi.ezclocker.ezTickerTimer.ezStartIntervalTicker(
                                    EzEmployeeDisplayController.ezInstance.ezHandleUpdateClockInIntervalTicker,
                                    60000,
                                    'EzActiveClockInIntervalTicker');

                            return ezApi.ezclocker.ezAnimator.ezFadeIn('_ActiveClockInContainer')
                                .then(EzPromise.ignoreResolve);
                        });
            }
        } else {
            EzEmployeeDisplayController.ezInstance.ezEnableClockIn();

            newActiveClockInContainerState = `CLOCKED_OUT_${employeeInfo.employee.id}`;

            if (newActiveClockInContainerState !== EzEmployeeDisplayController.ezInstance.ezActiveClockInContainerState) {
                return ezApi.ezclocker.ezAnimator.ezFadeOut('_ActiveClockInContainer')
                    .then(
                        () => {
                            EzEmployeeDisplayController.ezInstance.ezActiveClockInContainerState = newActiveClockInContainerState;

                            if (EzObject.isValid(EzEmployeeDisplayController.ezInstance.ezActiveClockInIntervalTickerInfo)) {
                                ezApi.ezclocker.ezTickerTimer.ezStopIntervalTicker(
                                    EzEmployeeDisplayController.ezInstance.ezActiveClockInIntervalTickerInfo.ezIntervalTickerId);
                            }

                            ezApi.ezclocker.ezUi.ezSetContent(
                                '_ActiveClockInContainer',
                                EzEmployeeDisplayController.ezInstance.ezBuildClockedOutStatusBox());

                            return ezApi.ezclocker.ezAnimator.ezFadeIn('_ActiveClockInContainer')
                                .then(EzPromise.ignoreResolve);
                        });
            }
        }
    }

    /**
     * @protected @method
     * Enables the 'other' employee actions such as add time entry
     */
    ezEnableEmployeeActions() {
        ezApi.ezclocker.ezUi.ezEnable(EzEmployeeDisplayController.ezInstance.ezIds.buttons.addTimeEntryButtonId);

        ezApi.ezclocker.ezUi.ezEnable(EzEmployeeDisplayController.ezInstance.ezIds.buttons.reinviteEmployeeButtonId);

        const aEmployee = ezApi.ezclocker.ezClockerContext.ezGetActiveEmployee();
        const userContext = ezApi.ezclocker.ezClockerContext.ezGetUserContext();
        const userAccount = (userContext && userContext.userAccount) || {};

        if (userAccount.id && (aEmployee.userId === userAccount.id) && userContext.isEmployerPayrollManagerOrManager) {
            EzEmployeeDisplayController.ezInstance.ezDisableEmployeeDeleteAction();
        } else {
            ezApi.ezclocker.ezUi.ezEnable(EzEmployeeDisplayController.ezInstance.ezIds.buttons.deleteEmployeeButtonId);
        }
    }

    ezDisableEmployeeDeleteAction() {
        ezApi.ezclocker.ezUi.ezDisable(EzEmployeeDisplayController.ezInstance.ezIds.buttons.deleteEmployeeButtonId);
    }

    /**
     * @protected @method
     * Disables the 'other' employee actions such as add time entry
     */
    ezDisableEmployeeActions() {
        ezApi.ezclocker.ezUi.ezDisable(EzEmployeeDisplayController.ezInstance.ezIds.buttons.addTimeEntryButtonId);

        ezApi.ezclocker.ezUi.ezDisable(EzEmployeeDisplayController.ezInstance.ezIds.buttons.reinviteEmployeeButtonId);

        EzEmployeeDisplayController.ezInstance.ezDisableEmployeeDeleteAction();
    }

    /**
     * @public @method
     * Disables the ability to clock in or out
     */
    ezDisableClockInOut() {
        ezApi.ezclocker.ezUi.ezDisable(EzEmployeeDisplayController.ezInstance.ezIds.buttons.employeeClockOutButtonId);

        ezApi.ezclocker.ezUi.ezDisable(EzEmployeeDisplayController.ezInstance.ezIds.buttons.employeeClockInButtonId);
    }

    /**
     * @public @method
     * Enables clock-out abilities in the UI
     */
    ezEnableClockOut() {
        ezApi.ezclocker.ezUi.ezEnable(EzEmployeeDisplayController.ezInstance.ezIds.buttons.employeeClockOutButtonId);

        ezApi.ezclocker.ezUi.ezDisable(EzEmployeeDisplayController.ezInstance.ezIds.buttons.employeeClockInButtonId);
    }

    /**
     * @public @method
     * Enables clock-in abilities in the UI
     */
    ezEnableClockIn() {
        ezApi.ezclocker.ezUi.ezEnable(EzEmployeeDisplayController.ezInstance.ezIds.buttons.employeeClockInButtonId);

        ezApi.ezclocker.ezUi.ezDisable(EzEmployeeDisplayController.ezInstance.ezIds.buttons.employeeClockOutButtonId);
    }

    /**
     * @protected @method
     * Handles the tick events for the update active clock in duration EzIntervalTicker.
     */
    ezHandleUpdateClockInIntervalTicker() {
        let aEmployee = ezApi.ezclocker.ezClockerContext.ezGetActiveEmployee();

        if (EzObject.isValid(aEmployee) && EzObject.isValid(aEmployee.activeClockIn)) {
            ezApi.ezclocker.ezAnimator.ezFlipX('EzActiveClockInDurationDisplay')
                .then(EzPromise.ignoreResolve);

            let cInMoment = ezApi.ezclocker.ezDateTime.ezCreateFromIso(aEmployee.activeClockIn.clockInIso8601);

            ezApi.ezclocker.ezUi.ezSetContent(
                'EzActiveClockInDurationDisplay',
                EzEmployeeDisplayController.ezInstance.ezCalculateElapsedTimeToNow(cInMoment));
        }
    }

    /**
     * @protected @method
     * Builds the HTML for the active clock in status box
     * @param {object} activeClockIn
     * @returns {string}
     * HTML representing the active clock in status box
     */
    ezBuildActiveClockInStatusBox(activeClockIn) {
        if (ezApi.ezIsNotValid(activeClockIn) && ezApi.ezIsNotEmptyString(activeClockIn.clockInIso8601)) {
            ezApi.ezclocker.ezLogger.error(
                EzString.em`
                    A valid active clock in instance is required in call to
                    EzEmployeeDisplayController.ezBuildActiveClockInStatusBox.`);

            return EzEmployeeDisplayController.ezInstance.ezBuildClockedOutStatusBox();
        }

        let cInMoment = ezApi.ezclocker.ezDateTime.ezCreateFromIso(activeClockIn.clockInIso8601);

        return EzHtml.build`
            <table
                class="activeClockInTable">
                <tr>
                    <th
                        class="activeClockInHeader">Status</th>
                    <th
                        class="activeClockInHeader">Date</th>
                    <th
                        class="activeClockInHeader">Time</th>
                    <th
                        class="activeClockInHeader">Total</th>
                </tr>
                <tr>
                    <td
                        class="activeClockInCell">
                        Clocked In
                    </td>
                    <td
                        id="EzActiveClockInDateCell"
                        class="activeClockInCell">
                        ${ezApi.ezclocker.ezDateTime.ezDateString(cInMoment)}
                    </td>
                    <td
                        id="EzActiveClockInTimeCell"
                        class="activeClockInCell">
                        ${ezApi.ezclocker.ezDateTime.ezTimeString(cInMoment)}
                    </td>
                    <td
                        id="EzActiveClockInDurationCell"
                        class="activeClockInCell">
                        <div
                            id="EzActiveClockInDurationDisplay"
                            class="ezActiveClockInDurationDisplay">
                            ${EzEmployeeDisplayController.ezInstance.ezCalculateElapsedTimeToNow(cInMoment)}
                        </div>
                    </td>
                </tr>
            </table>`;
    }

    /**
     * @protected @method
     * Appends a time entry to the time entry grid.
     * Code was moved from ezclocker-time-entry-grid.js to EzEmployeeDisplayController in order to stop using a
     * global function.
     * @param {object} timeEntry
     * @returns {Promise.resolve}
     */
    ezAppendTimeEntry(timeEntry) {
        if (!EzObject.isValid(timeEntry)) {
            // Nothing to append
            return EzPromise.finished();
        }

        let clockInLocation = null;

        let clockOutLocation = null;

        return EzPromise.asyncAction(
            (finished) => ezApi.ezclocker.ezLocationService.ezGetLocationsForTimeEntryId(timeEntry.id)
                .then(
                    (response) => {
                        response.entities.forEach(
                            (location) => {
                                if (!EzObject.isValid(clockInLocation) && EzBoolean.isTrue(location.clockInLocation)) {
                                    clockInLocation = location;
                                } else if (!EzObject.isValid(clockOutLocation) && EzBoolean.isTrue(location.clockOutLocation)) {
                                    clockOutLocation = location;
                                }

                                return EzEmployeeDisplayController.ezInstance.ezBuildTimeEntryRow(
                                    timeEntry,
                                    clockInLocation,
                                    clockOutLocation,
                                    true,
                                    true)
                                    .then(
                                        (timeEntryRow) => {
                                            ezApi.ezclocker.ezUi.ezAppendContent(
                                                '_TimeEntryTableBody',
                                                timeEntryRow);

                                            return finished();
                                        });
                            });
                    },
                    (eResponse) => {
                        ezApi.ezclocker.ezLogger.error(
                            EzString.em`
                                Failed to obtain the locations for timeEntryId=${timeEntry.id}.
                                Error: ${EzJson.toJson(eResponse)}`);

                        clockInLocation = new EzLocationEntity();

                        clockInLocation.employerId = ezApi.ezclocker.ezClockerContext.ezGetActiveEmployer().id;

                        clockInLocation.timeEntryId = timeEntry.id;

                        clockInLocation.acceptable = false;

                        clockOutLocation = new EzLocationEntity();

                        clockInLocation.employerId = ezApi.ezclocker.ezClockerContext.ezGetActiveEmployer().id;

                        clockInLocation.timeEntryId = timeEntry.id;

                        clockInLocation.acceptable = false;

                        return EzEmployeeDisplayController.ezInstance.ezBuildTimeEntryRow(
                            timeEntry,
                            clockInLocation,
                            clockOutLocation,
                            true,
                            true)
                            .then(
                                (timeEntryRow) => {
                                    ezApi.ezclocker.ezUi.ezAppendContent(
                                        '_TimeEntryTableBody',
                                        timeEntryRow);

                                    return finished();
                                });
                    }));
    }

    /**
     * @public @method
     * Handles the time entry delete button click.
     * Prompts the user to confirm delete, and then executes if user selectes yes
     * @param {number} timeEntryId
     */
    ezPromptDeleteTimeEntry(timeEntryId) {
        if (!EzNumber.isNumber(timeEntryId)) {
            throw new EzBadParamException(
                'timeEntryId',
                EzEmployeeDisplayController.ezInstance,
                EzEmployeeDisplayController.ezInstance.ezPromptDeleteTimeEntry);
        }

        return ezApi.ezclocker.ezDialog.ezShowYesNo(
            'Confirm Delete Time Entry',
            'Warning: You cannot revert this operation! Are you sure you want to delete this time entry?')
            .then(
                (dialogResult) => {
                    if (dialogResult.dialogStatus === ezApi.ezclocker.ezDialog.YES_DIALOG_RESPONSE.dialogStatus) {
                        EzEmployeeDisplayController.ezInstance.ezExecuteDeleteTimeEntry(timeEntryId);
                    }
                });
    }

    /**
     * @protected @method
     * Performs the delete time entry operation
     * @param {number} id
     */
    ezExecuteDeleteTimeEntry(timeEntryId) {
        return ezApi.ezclocker.ezUi.ezPageWaitAsync(
            'Deleting time entry',
            (waitDone, finished) => ezApi.ezclocker.ezHttpHelper.ezPost(
                ezApi.ezclocker.ezNavigation.ezGetInternalClassicApiUrl(`timeEntry/remove/${timeEntryId}`))
                .then(
                    ezApi.ezclocker.ezHttpHelper.ezProcessApiResolve,
                    ezApi.ezclocker.ezHttpHelper.ezProcessApiReject)
                .then(
                    () => EzEmployeeDisplayController.ezInstance.ezRefreshActiveEmployeeTimeEntries()
                        .then(() => waitDone().then(finished)),
                    (eResponse, jqXHR) => waitDone()
                        .then(
                            () => {
                                if (EzObject.isValid(eResponse) && ezApi.ezIsNotEmptyString(eResponse.message)) {
                                    ezApi.ezclocker.ezDialog.ezShowError(
                                        'Delete Time Entry Error',
                                        eResponse.message);
                                } else {
                                    ezApi.ezclocker.ezDialog.ezReportInternalBugDialog(
                                        jqXHR,
                                        'Unable to delete time entry.',
                                        eResponse,
                                        null,
                                        false);
                                }

                                return finished();
                            })));
    }

    /**
     * @protected @method
     * Initalizes the employee's quick filter date pickers
     */
    ezInitializeEmployeeQuickFilterDatePickersAndPayPeriodIcons() {
        let periodStartEndMoments = ezApi.ezclocker.ezClockerContext.ezGetActiveAccountContextSelectedPeriod();

        if (!EzObject.isValid(periodStartEndMoments)) {
            throw ezApi.ezException(
                EzString.em`
                   Failed to obtain the active account\'s start end period in call to
                    EzEmployeeDisplayController.ezInitializeEmployeeQuickFilterDatePickersAndPayPeriodIcons`);
        }

        const employerOptions = ezApi.ezclocker.ezClockerContext.ezGetActiveEmployer().options || {};
        const payPeriod = employerOptions.SELECTED_PAY_PERIOD || 'NONE';
        let payPeriodNumeric = EzPayPeriod[payPeriod];

        if (payPeriodNumeric === 0) {
            ezApi.ezclocker.ezUi.ezHideElement('EzEmployeeTimeEntryFilter_QuickFilterLayoutTable_LeftIconId');
            ezApi.ezclocker.ezUi.ezHideElement('EzEmployeeTimeEntryFilter_QuickFilterLayoutTable_RightIconId');
        }

        ezApi.ezclocker.ezUi.ezId('_quickFilterStartDate')
            .datepicker(
                {
                    dateFormat: 'mm/dd/yy',
                    defaultDate: 1,
                    constrainInput: true,
                    changeYear: true,
                    changeMonth: true,
                    onClose: () => {
                        let startMoment = ezApi.ezclocker.ezDateTime.ezDateFromDatePicker('_quickFilterStartDate');

                        ezApi.ezclocker.ezUi.ezId('_quickFilterEndDate')
                            .datepicker(
                                'option',
                                'minDate',
                                ezApi.ezclocker.ezDateTime.ezDateString(startMoment));

                        ezApi.ezclocker.ezUi.ezId('_quickFilterEndDate')
                            .datepicker(
                                'option',
                                'maxDate',
                                ezApi.ezclocker.ezDateTime.ezDateString(startMoment.add(30, 'days')));
                    },
                    onClick: ezApi.ezclocker.ezUi.ezId('_quickFilterStartDate').select,
                });

        let startDate = payPeriod !== 'NONE' ?
            EzEmployeeDisplayController.ezInstance.deriveStartDatePerPayPeriod() :
            ezApi.ezclocker.ezDateTime.ezDateString(periodStartEndMoments.ezPeriodStartMoment);

        ezApi.ezclocker.ezUi.ezSetInputValue('_quickFilterStartDate', startDate);

        ezApi.ezclocker.ezUi.ezId('_quickFilterEndDate')
            .datepicker({
                dateFormat: 'mm/dd/yy',
                constrainInput: true,
                changeYear: true,
                changeMonth: true,
                defaultDate: ezApi.ezclocker.ezDateTime.ezDateString(
                    ezApi.ezclocker.ezDateTime.ezDateFromDatePicker('_quickFilterStartDate')
                        .add(13, 'days')),
                onClick: ezApi.ez('_quickFilterEndDate').select,
            });

        let endDate = payPeriod !== 'NONE' ?
            EzEmployeeDisplayController.ezInstance.deriveEndDatePerPayPeriod() :
            ezApi.ezclocker.ezDateTime.ezDateString(periodStartEndMoments.ezPeriodEndMoment);

        ezApi.ezclocker.ezUi.ezSetInputValue('_quickFilterEndDate', endDate);

        if (payPeriod !== 'NONE') {
            return EzEmployeeDisplayController.ezInstance.ezUpdateSelectedPeriod()
                .then(ezApi.ezIgnoreResolve);
        }
    }

    /**
     * @protected @method
     * Builds the HTML for the time entry display grid
     * @returns {Promise.resolve}
     */
    ezBuildEmployeeTimeEntryGrid() {
        return EzPromise.asyncAction(
            (finished) => EzEmployeeDisplayController.ezInstance.ezResetTimeEntryGrid()
                .then(
                    () => {
                        let activeEmployee = ezApi.ezclocker.ezClockerContext.ezGetActiveEmployee();

                        if (!EzObject.isValid(activeEmployee) || !EzArray.arrayHasLength(activeEmployee.timeEntries)) {
                            ezApi.ezclocker.ezUi.ezContent(
                                EzEmployeeDisplayController.ezInstance.ezIds.timeEntryContainerId,
                                EzHtml.build`
                                    <h1>
                                        The employee does not have time entries for the selected period.
                                    </h1>`);

                            return finished();
                        }

                        return EzEmployeeDisplayController.ezInstance.ezBuildTimeEntryRows()
                            .then(
                                (timeEntryRowsHTML) => {
                                    let jobsCol = ezApi.ezclocker.ezClockerContext.ezActiveEmployerFeatureEnabled(EzClockerFeature.EZ_JOBS)
                                        ? EzHtml.build`
                                            <td
                                                id="${EzEmployeeDisplayController.ezInstance.ezIds.tables.timeEntryGridId}_JobHeaderCell"
                                                class="ezGridHeaderCell ezGridJobHeaderCell">
                                                Job
                                            </td>`
                                        : EzString.EMPTY;

                                    let timeEntryRows = EzString.EMPTY;

                                    timeEntryRowsHTML.forEach((rowHtml) => timeEntryRows += rowHtml);

                                    // Time Entry Header Data
                                    ezApi.ezclocker.ezUi.ezContent(
                                        EzEmployeeDisplayController.ezInstance.ezIds.timeEntryContainerId,
                                        EzHtml.build`
                                            <table
                                                id="${EzEmployeeDisplayController.ezInstance.ezIds.tables.timeEntryGridId}"
                                                class="ezGrid">
                                                <thead
                                                    id="${EzEmployeeDisplayController.ezInstance.ezIds.tables.timeEntryGridId}_Header">
                                                    <tr
                                                        id="${EzEmployeeDisplayController.ezInstance.ezIds.tables.timeEntryGridId}_HeaderRow"
                                                        class="header">
                                                        <td
                                                            id="${EzEmployeeDisplayController.ezInstance.ezIds.tables.timeEntryGridId}_HiddenHeaderCell"
                                                            class="ezGridHiddenCell"></td>
                                                        <td
                                                            id="${EzEmployeeDisplayController.ezInstance.ezIds.tables.timeEntryGridId}_ClockInDateHeaderCell"
                                                            class="ezGridHeaderCell ezGridDateCell">Clocked In Date</td>
                                                        <td
                                                            id="${EzEmployeeDisplayController.ezInstance.ezIds.tables.timeEntryGridId}ClockInTimeHeaderCell"
                                                            class="ezGridHeaderCell ezGridTimeCell">Clocked In Time</td>
                                                        <td
                                                            id="${EzEmployeeDisplayController.ezInstance.ezIds.tables.timeEntryGridId}_ClockOutDateHeaderCell"
                                                            class="ezGridHeaderCell ezGridDateCell">Clocked Out Date</td>
                                                        <td
                                                            id="${EzEmployeeDisplayController.ezInstance.ezIds.tables.timeEntryGridId}_ClockOutTimeHeaderCell"
                                                            class="ezGridHeaderCell ezGridTimeCell">Clocked Out Time</td>
                                                        <td
                                                            id="${EzEmployeeDisplayController.ezInstance.ezIds.tables.timeEntryGridId}_TotalTimeHeaderCell"
                                                            class="ezGridHeaderCell ezGridTotalTimeCell ezRightAlign">
                                                            Total (hh:mm)
                                                        </td>
                                                        ${jobsCol}
                                                        <td
                                                            id="${EzEmployeeDisplayController.ezInstance.ezIds.tables.timeEntryGridId}_NotescCell"
                                                            class="ezGridHeaderCell ezGridNotesHeaderCell">
                                                            Notes
                                                        </td>
                                                        <td
                                                            id="${EzEmployeeDisplayController.ezInstance.ezIds.tables.timeEntryGridId}_LocationHeaderCell"
                                                            class="ezGridHeaderCell ezGridMapCell centerCell">
                                                                <img
                                                                    id="${EzEmployeeDisplayController.ezInstance.ezIds.tables.timeEntryGridId}_LocationHeaderImage"
                                                                    src="/public/images/icons/gps_location_info.svg"
                                                                    alt="Location Information"
                                                                    title="Location Information"
                                                                    class="ezGridLocationHeaderImage"/>
                                                        </td>
                                                    </tr>
                                                </thead>
                                            <tbody
                                                id="${EzEmployeeDisplayController.ezInstance.ezIds.tables.timeEntryGridId}_Body"
                                                class="ezGridData">
                                                ${timeEntryRows}
                                            </tbody>
                                        </table>`);

                                    return finished();
                                });
                    }));
    }

    /**
     * @protected @method
     * Resets the time entry grid
     * @returns {Promise.resolve}
     */
    ezResetTimeEntryGrid() {
        return EzPromise.asyncAction(
            (finished) => {
                // remove the current time entry grid
                if (ezApi.ezclocker.ezUi.ezElementExists(EzEmployeeDisplayController.ezInstance.ezIds.timeEntryContainerId)) {
                    ezApi.ezclocker.ezUi.ezRemoveElement(EzEmployeeDisplayController.ezInstance.ezIds.timeEntryContainerId);
                }

                ezApi.ezclocker.ezUi.ezAppendContent(
                    EzEmployeeDisplayController.ezInstance.ezIds.mainContentContainerId,
                    EzHtml.build`
                    <div
                        id="${EzEmployeeDisplayController.ezInstance.ezIds.timeEntryContainerId}"
                        class="ezGridContainer">
                    </div>`);

                return finished();
            });
    }

    /**
     * @protected @method
     * Builds the time entry grid's time entry rows.
     * @returns {Promise.resolve}
     */
    ezBuildTimeEntryRows() {
        let timeEntries = ezApi.ezclocker.ezClockerContext.ezGetActiveEmployeeTimeEntries();

        if (!EzArray.arrayHasLength(timeEntries)) {
            return EzPromise.finished(EzString.EMPTY);
        }

        return EzPromise.asyncAction(
            (finished) => {
                let timeEntryRowsHTML = [];

                let teProcessedCount = 0;

                let totalTimeEntries = timeEntries.length;

                for (let tIndex = 0; tIndex < totalTimeEntries; tIndex++) {
                    let timeEntry = timeEntries[tIndex];

                    timeEntry.timeEntryIndex = tIndex;

                    timeEntryRowsHTML.push(EzString.EMPTY);

                    EzEmployeeDisplayController.ezInstance.ezBuildTimeEntryRow(
                        timeEntry,
                        true,
                        true)
                        .then(
                            (rowResponse) => {
                                timeEntryRowsHTML[rowResponse.timeEntry.timeEntryIndex] = rowResponse.timeEntryRow;

                                teProcessedCount++;

                                if (teProcessedCount >= totalTimeEntries) {
                                    return finished(timeEntryRowsHTML);
                                }
                            });
                }
            });
    }

    /**
     * @protected @method
     * Builds the HTML for a single time entry row
     * @param {object} timeEntry
     * @param {boolean} showAuditButton
     * @param {boolean} allowEditTimeEntry
     * @returns {Promise.resolve}
     */
    ezBuildTimeEntryRow(timeEntry, showAuditButton, allowEditTimeEntry) {
        if (!EzObject.isValid(timeEntry)) {
            throw new EzBadParamException(
                'timeEntry',
                EzEmployeeDisplayController.ezInstance,
                EzEmployeeDisplayController.ezInstance.ezBuildTimeEntryRow);
        }

        showAuditButton = EzBoolean.booleanOrTrue(showAuditButton);

        allowEditTimeEntry = EzBoolean.booleanOrTrue(allowEditTimeEntry);

        let totalHours = parseInt(timeEntry.totalTime.split(':'));

        let rowClass = `ezGridDataCell ${EzEmployeeDisplayController.ezInstance.ezGetTimeEntryRowCSSClass(timeEntry, totalHours)}`;

        return EzPromise.asyncAction(
            (resolve) => {
                return EzEmployeeDisplayController.ezInstance.ezBuildGPSInfoCell(timeEntry, rowClass)
                    .then(
                        (gpsInfoHtml) => {
                            let clockInMoment = EzString.hasLength(timeEntry.clockInIso)
                                ? ezApi.ezclocker.ezDateTime.ezCreateFromIso(timeEntry.clockInIso)
                                : null;

                            let clockOutMoment = EzString.hasLength(timeEntry.clockOutIso)
                                ? ezApi.ezclocker.ezDateTime.ezCreateFromIso(timeEntry.clockOutIso)
                                : null;

                            let jobCodeName = EzObject.isValid(timeEntry.primaryAssignedJob)
                                ? ezApi.ezStringOrEmpty(timeEntry.primaryAssignedJob.tagName)
                                : EzString.EMPTY;

                            let clockOutHTML = !EzObject.isValid(clockOutMoment) || timeEntry.isActiveClockIn ||
                                timeEntry.isActiveBreak
                                ? EzHtml.build`
                                    <td
                                        id="clockOutDate_${timeEntry.id}"
                                        class="ezGridDateCell ${rowClass}">
                                        --
                                    </td>
                                    <td
                                        id="clockOutTime_${timeEntry.id}"
                                        class="ezGridTimeCell ${rowClass}">
                                        --
                                    </td>`
                                : EzHtml.build`
                                    <td
                                        id="clockOutDate_${timeEntry.id}"
                                        class="ezGridDateCell ${rowClass}">
                                        ${clockOutMoment.format('ddd MM/DD/YYYY')}
                                    </td>
                                    <td
                                        id="clockOutTime_${timeEntry.id}"
                                        class="ezGridTimeCell ${rowClass}">
                                        ${clockOutMoment.format('hh:mm a')}
                                    </td>`;

                            let clockInHTML = !EzObject.isValid(clockInMoment)
                                ? EzHtml.build`
                                    <td
                                        id="clockInDate_${timeEntry.id}"
                                        class="ezGridDateCell ${rowClass}">
                                        --
                                    </td>
                                    <td
                                        id="clockInTime_${timeEntry.id}"
                                        class="ezGridTimeCell ${rowClass}">
                                        --
                                    </td>`
                                : EzHtml.build`
                                    <td
                                        id="clockInDate_${timeEntry.id}"
                                        class="ezGridDateCell ${rowClass}">
                                        ${clockInMoment.format('ddd MM/DD/YYYY')}
                                    </td>
                                    <td
                                        id="clockInTime_${timeEntry.id}"
                                        class="ezGridTimeCell ${rowClass}">
                                        ${clockInMoment.format('hh:mm a')}
                                    </td>`;

                            let jobHTML = ezApi.ezclocker.ezClockerContext.ezActiveEmployerFeatureEnabled(
                                EzClockerFeature.EZ_JOBS)
                                ? EzHtml.build`
                                    <td
                                        id="jobcode_${timeEntry.id}"
                                        class="ezGridJobCell ${rowClass}">
                                        ${jobCodeName}
                                    </td>`
                                : EzString.EMPTY;

                            // Time Entry Buttons
                            let timeEntryRowEditButtonsHTML = EzEmployeeDisplayController.ezInstance.ezBuildTimeEntryRowEditButtons(
                                timeEntry,
                                showAuditButton,
                                allowEditTimeEntry);

                            let timeEntryRowHingImageHTML = EzEmployeeDisplayController.ezInstance.ezBuildTimeEntryRowHintImage(
                                timeEntry,
                                totalHours);

                            return resolve({
                                timeEntryRow: EzHtml.build`
                                    <tr
                                        id="_TimeEntry_${timeEntry.id}"
                                        class="ezGridDataRow">
                                        <td
                                            id="_TimeEntry_${timeEntry.id}_Cell"
                                            class="ezTimeEntryGridButtonCell">
                                            <table
                                                id="EzTimeEntryEditContainer"
                                                class="ezFullWidth">
                                                <tr id="EzTimeEntryEditContainer_Row">
                                                    <td id="EzTimeEntryEditContainer_EditButtonsCell">
                                                        ${timeEntryRowEditButtonsHTML}
                                                    </td>
                                                    <td id="EzTimeEntryEditContainer_HintCell">
                                                        ${timeEntryRowHingImageHTML}
                                                    </td>
                                                </tr>
                                            </table>
                                        </td>
                                        ${clockInHTML}
                                        ${clockOutHTML}
                                        <td
                                            id="totalTime_${timeEntry.id}"
                                            class="ezGridTotalTimeCell ${rowClass} ezRightAlign">
                                            ${timeEntry.totalTime}
                                        </td>
                                        ${jobHTML}
                                        <td
                                            id="notes_${timeEntry.id}"
                                            class="ezGridNotesCell ${rowClass}">
                                            ${ezApi.ezStringOrEmpty(timeEntry.notes)}
                                        </td>
                                        ${gpsInfoHtml}
                                    </tr>`,
                                timeEntry: timeEntry
                            });
                        });
            });
    }

    /**
     * @protected @method
     * Builds the HTML for the time entry row hint image
     * @param {object} timeEntry
     * @param {number} totalHours
     * @returns {string}
     */
    ezBuildTimeEntryRowHintImage(timeEntry, totalHours) {
        if (!EzObject.isValid(timeEntry) || !EzNumber.isNumber(timeEntry.id)) {
            throw new EzBadParamException(
                'timeEntry',
                EzEmployeeDisplayController.ezInstance,
                EzEmployeeDisplayController.ezInstance.ezBuildTimeEntryRowHintImage);
        }

        if (!EzNumber.isNumber(totalHours)) {
            totalHours = 0;
        }

        let nImg = EzEmployeeDisplayController.ezInstance.ezHintImages.goodHintImages.normal;

        let hImg = EzEmployeeDisplayController.ezInstance.ezHintImages.goodHintImages.hot;

        if (timeEntry.ezIsActiveClockIn) {
            return EzHtml.build`
                <div
                    id="EzHintImgContainer${timeEntry.id}"
                    class="ezHintImageContainer"
                    onmouseenter="ezUi.ezSetElementAttribute('EzHintImgContainer${timeEntry.id}', 'src', '${hImg}')"
                    onmouseleave="ezUi.ezSetElementAttribute('EzHintImgContainer${timeEntry.id}', 'src', '${nImg}')">
                    <img
                        id="hintImage_${timeEntry.id}"
                        class="hintImage" alt="Active Clock In"
                        onmouseenter="ezUi.ezSetElementAttribute('EzHintImgContainer${timeEntry.id}', 'src', '${hImg}')"
                        onmouseleave="ezUi.ezSetElementAttribute('EzHintImgContainer${timeEntry.id}', 'src', '${nImg}')"
                        title="Active Clock In"
                        src="/public/images/good.ico"/>
                </div>`;
        }

        if ('EndDateClipped' === timeEntry.partialTimeEntry || 'StartDateClipped' === timeEntry.partialTimeEntry ||
            'StartAndEndDateClipped' === timeEntry.partialTimeEntry) {

            nImg = EzEmployeeDisplayController.ezInstance.ezHintImages.partialHintImages.normal;

            hImg = EzEmployeeDisplayController.ezInstance.ezHintImages.partialHintImages.hot;

            return EzHtml.build`
                <div
                    id="EzHintImgContainer"
                    class="ezHintImageContainer"
                    onmouseenter="ezUi.ezSetElementAttribute('EzHintImgContainer${timeEntry.id}', 'src', '${hImg}')"
                    onmouseleave="ezUi.ezSetElementAttribute('EzHintImgContainer${timeEntry.id}', 'src', '${nImg}')">
                    <img
                        id="hintImage_${timeEntry.id}"
                        class="hintImage"
                        alt="Partial Time Entry"
                        src="${nImg}"
                        onmouseenter="ezUi.ezSetElementAttribute('EzHintImgContainer${timeEntry.id}', 'src', '${hImg}')"
                        onmouseleave="ezUi.ezSetElementAttribute('EzHintImgContainer${timeEntry.id}', 'src', '${nImg}')"
                        title="The time entries clock in or clock out date falls outside of the selected period."/>
                </div>`;
        }

        if (totalHours > 8) {
            nImg = EzEmployeeDisplayController.ezInstance.ezHintImages.warningHintImages.normal;

            hImg = EzEmployeeDisplayController.ezInstance.ezHintImages.warningHintImages.hot;

            return EzHtml.build`
                <div
                    id="EzHintImgContainer"
                    class="ezHintImageContainer"
                    onmouseenter="ezUi.ezSetElementAttribute('EzHintImgContainer${timeEntry.id}', 'src', '${hImg}')"
                    onmouseleave="ezUi.ezSetElementAttribute('EzHintImgContainer${timeEntry.id}', 'src', '${nImg}')">
                    <img
                        id="hintImage_${timeEntry.id}"
                        class="hintImage"
                        alt="Exceeds Eight Hours"
                        src="${nImg}"
                        onmouseenter="ezUi.ezSetElementAttribute('EzHintImgContainer${timeEntry.id}', 'src', '${hImg}')"
                        onmouseleave="ezUi.ezSetElementAttribute('EzHintImgContainer${timeEntry.id}', 'src', '${nImg}')"
                        title="Exceeds Eight Hours"/>
                </div>`;
        }

        // time entry total hours <= 8 hours
        nImg = EzEmployeeDisplayController.ezInstance.ezHintImages.goodHintImages.normal;

        hImg = EzEmployeeDisplayController.ezInstance.ezHintImages.goodHintImages.hot;

        return EzHtml.build`
            <div
                id="EzHintImgContainer"
                class="ezHintImageContainer"
                onmouseenter="ezUi.ezSetElementAttribute('EzHintImgContainer${timeEntry.id}', 'src', '${hImg}')"
                onmouseleave="ezUi.ezSetElementAttribute('EzHintImgContainer${timeEntry.id}', 'src', '${nImg}')">
                <img
                    id="hintImage_${timeEntry.id}"
                    class="hintImage"
                    alt="No problems detected"
                    src="${nImg}"
                    onmouseenter="ezUi.ezSetElementAttribute('EzHintImgContainer${timeEntry.id}', 'src', '${hImg}')"
                    onmouseleave="ezUi.ezSetElementAttribute('EzHintImgContainer${timeEntry.id}', 'src', '${nImg}')"
                    title="No problems detected"/>
            </div>`;
    }

    /**
     * @protected @method
     * Builds the HTML for the time entry row's edit buttons
     * @param {object} timeEntry
     * @param {boolean} showAuditButton
     * @param {boolean} allowEditTimeEntry
     * @returns {string}
     */
    ezBuildTimeEntryRowEditButtons(timeEntry, showAuditButton, allowEditTimeEntry) {
        if (!EzObject.isValid(timeEntry)) {
            throw new EzBadParamException(
                'timeEntry',
                EzEmployeeDisplayController.ezInstance,
                EzEmployeeDisplayController.ezInstance.ezBuildTimeEntryRowEditButtons);
        }

        showAuditButton = EzBoolean.booleanOrTrue(showAuditButton);

        let deleteButton = EzString.EMPTY;

        let editButton;

        if (EzBoolean.booleanOrTrue(allowEditTimeEntry)) {
            deleteButton = EzEmployeeDisplayController.ezInstance.ezBuildTimeEntryRowDeleteButton(timeEntry);

            editButton = EzEmployeeDisplayController.ezInstance.ezBuildTimeEntryRowEditButton(timeEntry);
        } else {
            editButton = EzEmployeeDisplayController.ezInstance.ezBuildTimeEntryRowNoteEditButton(timeEntry);
        }

        let auditButton = EzBoolean.isTrue(showAuditButton)
            ? EzEmployeeDisplayController.ezInstance.ezBuildTimeEntryRowAuditButton(timeEntry)
            : EzString.EMPTY;

        return EzHtml.build`
            ${deleteButton}
            ${editButton}
            ${auditButton}`;
    }

    /**
     * @protected @method
     * Builds the HTML for the a time entry row's note button
     * @param {object} timeEntry
     * @returns {string}
     */
    ezBuildTimeEntryRowNoteEditButton(timeEntry) {
        if (!EzObject.isValid(timeEntry)) {
            throw new EzBadParamException(
                'timeEntry',
                EzEmployeeDisplayController.ezInstance,
                EzEmployeeDisplayController.ezInstance.ezBuildTimeEntryRowNoteEditButton);
        }

        return EzHtml.build`
            <button
                id="noteEditButton_${timeEntry.id}"
                class="ezToolButton"
                title="Edit the time entry notes"
                onclick="ezApi.ezclocker.ezEmployeeDisplayController.ezHandleTimeEntryRowEditButtonClick(${timeEntry.id})">
                <img
                    id="noteEditImg_${timeEntry.id}"
                    class="ezEditButtonImage"
                    alt="Notes"
                    title="Edit time entry notes"
                    src="/public/images/freepik/edit/edit1-white.svg"/>
            </button>`;
    }

    /**
     * @protected @method
     * Builds the HTML for the a time entry row's edit button
     * @param {object} timeEntry
     * @returns {string}
     */
    ezBuildTimeEntryRowEditButton(timeEntry) {
        if (!EzObject.isValid(timeEntry)) {
            throw new EzBadParamException(
                'timeEntry',
                EzEmployeeDisplayController.ezInstance,
                EzEmployeeDisplayController.ezInstance.ezBuildTimeEntryRowEditButton);
        }

        switch (timeEntry.timeEntryType) {
            case 'UNKNOWN':
            case 'BREAK':
            case 'BREAK_IN':
            case 'CLOCK_IN':
            case 'GENERIC_TIME':
            case 'NORMAL':
                return EzHtml.build`
                    <button
                        id="editButton_${timeEntry.id}"
                        class="ezToolButton"
                        title="Edit the time entry"
                        onclick="ezApi.ezclocker.ezEmployeeDisplayController.ezHandleTimeEntryRowEditButtonClick(${timeEntry.id})">
                        <img
                            id="editImage_${timeEntry.id}"
                            class="ezEditButtonImage"
                            alt="Edit"
                            title="Edit the time entry"
                            src="/public/images/freepik/edit/edit1-white.svg"/>
                    </button>`;
            default:
                return EzHtml.build`
                    <button
                        id="editButton_${timeEntry.id}"
                        class="ezToolButton"
                        title="Edit the time entry"
                        onclick="ezApi.ezclocker.ezEmployeeDisplayController.ezHandleTimeEntryRowTimeOffEditButtonClick()">
                        <img
                            id="editImage_${timeEntry.id}"
                            class="ezEditButtonImage"
                            alt="Edit"
                            title="Cannot edit time entries created from a time off request"
                            src="/public/images/freepik/edit/edit1-white.svg"/>
                    </button>`;
        }
    }

    /**
     * @protected @method
     * Handles the click of a time entry edit button for a time entry who has a time-off type.
     * @param {undefined|null|number} parentTimeOffId
     */
    ezHandleTimeEntryRowTimeOffDeleteButtonClick(parentTimeOffId) {
        let timeOffViewLink = EzNumber.isNumber(parentTimeOffId)
            ? EzHtml.build`
                <p>
                    <a
                        id="EzJumptToTimeOffViewLink"
                        class="ezButtonLink_default-large-navy"
                        href="#"
                        onclick="ezApi.ezclocker.ezNavigation.ezNavigateToSecurePage('time-off?toid=${parentTimeOffId}')">
                        Click here to go to ezClocker's Time Off view.
                    </a>
                </p>`
            : EzHtml.build`
                <p>
                    <a
                        id="EzJumptToTimeOffViewLink"
                        class="ezButtonLink_default-large-navy"
                        href="#"
                        onclick="ezApi.ezclocker.ezNavigation.ezNavigateToSecurePage('time-off')">
                        Click here to go to ezClocker's Time Off view.
                    </a>
                </p>`;

        ezApi.ezclocker.ezDialog.ezShowOK(
            'Cannot Delete Time Off Time Entry',
            EzString.msg`
                The time entry you are trying to delete was created from an approved time off request.
                In order to delete time entries created from an approved time off request:
                <ol>
                    <li>
                        Navigate to ezClocker's Time Off view
                    </li>
                    <li>
                        Locate the approved time off request associated with the time entries you wish to delete
                    </li>
                    <li>
                        Deny the approved time off request (which will delete the associated time entries).
                    </li>
                </ol>
                ${timeOffViewLink}`,
            800);

    }

    /**
     * @protected @method
     * Handles the click of a time entry edit button for a time entry who has a time-off type.
     * @param {undefined|null|number} parentTimeOffId
     */
    ezHandleTimeEntryRowTimeOffEditButtonClick(parentTimeOffId) {
        let timeOffViewLink = EzNumber.isNumber(parentTimeOffId)
            ? EzHtml.build`
                <p>
                    <a
                        id="EzJumptToTimeOffViewLink"
                        class="ezButtonLink_default-large-navy"
                        href="#"
                        onclick="ezApi.ezclocker.ezNavigation.ezNavigateToSecurePage('time-off?toid=${parentTimeOffId}')">
                        Click here to go to ezClocker's Time Off view.
                    </a>
                </p>`
            : EzHtml.build`
                <p>
                    <a
                        id="EzJumptToTimeOffViewLink"
                        class="ezButtonLink_default-large-navy"
                        href="#"
                        onclick="ezApi.ezclocker.ezNavigation.ezNavigateToSecurePage('time-off')">
                        Click here to go to ezClocker's Time Off view.
                    </a>
                </p>`;

        ezApi.ezclocker.ezDialog.ezShowOK(
            'Cannot Edit Time Off Time Entry',
            EzString.msg`
                The time entry you are trying to edit was created from an approved time off request.
                In order to modify the duration or dates of a time off:
                <ol>
                    <ul>
                        Navigate to ezClocker's Time Off view
                    </ul>
                    <ul>
                        Deny the currently approved time off request
                    </ul>
                    <ul>
                        Create a new time off requests with the desired duration or dates and then
                        approve the new time off request.
                    </ul>
                </ol>
                ${timeOffViewLink}`,
            800);
    }

    /**
     * @protected @method
     * Handles the edit time entry row button click
     * @param {number} timeEntryId
     */
    ezHandleTimeEntryRowEditButtonClick(timeEntryId) {
        if (!EzNumber.isNumber(timeEntryId)) {
            throw new EzBadParamException(
                'timeEntryId',
                EzEmployeeDisplayController.ezInstance,
                EzEmployeeDisplayController.ezInstance.ezHandleTimeEntryRowEditButtonClick);
        }

        EzTimeAddEditDialogViewConfiguration.ezGetTimeEntryToEdit(timeEntryId)
            .then(
                (response) => {
                    ezApi.ezclocker.ezTimeAddEditDialogController.ezShow(
                        new EzTimeAddEditDialogViewConfiguration(
                            ezApi.ezclocker.ezClockerContext.ezGetUserContextPrimaryAccountType(),
                            // timeEntry
                            response.entity,
                            // defaultClockInMoment
                            ezDateTime().ezFromIso(response.entity.clockInIso),
                            // defaultClockOutMoment
                            ezDateTime().ezFromIso(response.entity.clockOutIso),
                            // defaultEditReason
                            null,
                            // allowEditing
                            true,
                            // allowEditClockIn
                            true,
                            // allowEditClockOut
                            true,
                            // allowEditNote
                            true,
                            // allowBreaks,
                            ezApi.ezclocker.ezEmployerDashboardController.allowRecordingBreaks,
                            // availableJobs
                            []));
                },
                (eResponse) => {
                    ezApi.ezclocker.ezLogger.error(
                        EzString.em`
                            Unable to obtain the data for the time entry with timeEntryId=${timeEntryId}.
                            Error response: ${EzJson.toJson(eResponse)}`);

                    let em = EzString.em`
                        Unable to edit the time entry due to an error response from the
                        ezClocker cloud services.`;

                    let errorDetails = EzString.em`Error reported: ${eResponse.message}`;

                    let mailToBody = EzString.msg`
                        I received the following error when I tried to edit a break/time entry:
                        Error message: ${em}
                        Error details: ${errorDetails}`;

                    let mailToLink = EzUrl.build`mailto:support@ezcocker.com
                        ?subject="Help with error while trying to edit a break/time entry."
                        &body="${mailToBody}"`;

                    ezApi.ezclocker.ezDialog.ezShowErrorDialog(
                        'Edit Time Entry Error',
                        EzHtml.build`
                            <p>
                                ${em}
                            </p>
                            <p>
                                Please try again in a few minutes.
                            </p>
                            <p>
                                If you continue to receive this error please contact ezClocker support at
                                <a href="${mailToLink}">support@ezclocker.com</a> and include any error details
                                provided below.
                                <div
                                    id="errorReported"
                                    class="ez-error-details-container">
                                    <textarea
                                        id="${EzEmployeeDisplayController.ezInstance.ezDialogId}_EditErrorDetails"
                                        readonly="true"
                                        class="ezFullWidthEditor ezText-micro-gray"
                                        rows="3">
                                        ${errorDetails}
                                        ${EzJson.toJson(eResponse)}
                                    </textarea>
                                </div>
                            </p>`);
                });
    }

    /**
     * @protected @method
     * Builds the HTML for the a time entry row's delete button
     * @param {object} timeEntry
     * @returns {string}
     */
    ezBuildTimeEntryRowDeleteButton(timeEntry) {
        if (!EzObject.isValid(timeEntry)) {
            throw new EzBadParamException(
                'timeEntry',
                EzEmployeeDisplayController.ezInstance,
                EzEmployeeDisplayController.ezInstance.ezBuildTimeEntryRowAuditButton);
        }

        switch (timeEntry.timeEntryType) {
            case 'UNKNOWN':
            case 'BREAK':
            case 'BREAK_IN':
            case 'CLOCK_IN':
            case 'GENERIC_TIME':
            case 'NORMAL':
                return EzHtml.build`
                    <button
                        id="deleteButton_${timeEntry.id}"
                        class="ezRedToolButton"
                        onclick="ezApi.ezclocker.ezEmployeeDisplayController.ezPromptDeleteTimeEntry(${timeEntry.id})">
                        <img
                            id="deleteImage_${timeEntry.id}"
                            class="ezEditButtonImage"
                            title="Delete the time entry"
                            src="/public/images/freepik/delete/del1-white.svg"
                            alt="."/>
                    </button>`;
            default:
                return EzHtml.build`
                    <button
                        id="deleteButton_${timeEntry.id}"
                        class="ezRedToolButton"
                        onclick="ezApi.ezclocker.ezEmployeeDisplayController.ezHandleTimeEntryRowTimeOffDeleteButtonClick()">
                        <img
                            id="deleteImage_${timeEntry.id}"
                            class="ezEditButtonImage"
                            title="Cannot delete time entries created from an approved time off request"
                            src="/public/images/freepik/delete/del1-white.svg"
                            alt="."/>
                    </button>`;
        }
    }

    /**
     * @public @method
     * Determines if the provided gpsLocation's latitude and longitude is set and not zero
     * @param {object} gpsLocation
     */
    ezIsValidGPSLocationData(gpsLocation) {
        return EzObject.isValid(gpsLocation) &&
            EzObject.isValid(gpsLocation.latitude) &&
            EzObject.isValid(gpsLocation.longitude) &&
            EzString.hasLength(gpsLocation.latitude) &&
            '0' !== gpsLocation.latitude &&
            EzString.hasLength(gpsLocation.longitude) &&
            '0' !== gpsLocation.longitude;
    }

    /**
     * @protected @method
     * Displays the time entry location in the GPS map.
     * @param {number} timeEntryIndex
     */
    ezViewGPSLocationMap(timeEntryIndex) {
        if (!EzNumber.isNumber(timeEntryIndex)) {
            return;
        }

        let timeEntry = ezApi.ezclocker.ezClockerContext.ezGetActiveEmployeeTimeEntryByIndex(timeEntryIndex);

        let validClockInLocation = EzBoolean.isTrue(EzEmployeeDisplayController.ezInstance.ezIsValidGPSLocationData(timeEntry.clockInLocation));

        let validClockOutLocation = EzBoolean.isTrue(EzEmployeeDisplayController.ezInstance.ezIsValidGPSLocationData(timeEntry.clockOutLocation));

        if (validClockInLocation && validClockOutLocation && EzGpsDataStatus.ACTIVE === timeEntry.clockInGpsDataStatus &&
            EzGpsDataStatus.ACTIVE === timeEntry.clockOutGpsDataStatus) {

            ezApi.ezclocker.ezAnalyticsAndMetrics.ezAmplitudeIntegration.ezTrack('View clock-in and clock-out location in Google maps.');

            ezApi.ezclocker.ezGoogleMapsApi.ezDisplayDualEventMapNoEmployerLocation(
                ezApi.ezclocker.ezClockerContext.ezGetActiveEmployee(),
                timeEntry.clockInLocation.latitude,
                timeEntry.clockInLocation.longitude,
                'Clock In',
                timeEntry.clockInLocation.accuracy,
                timeEntry.clockOutLocation.latitude,
                timeEntry.clockOutLocation.longitude,
                'Clock Out',
                timeEntry.clockOutLocation.accuracy,
                timeEntry);
        } else if (validClockInLocation && EzGpsDataStatus.ACTIVE === timeEntry.clockInGpsDataStatus) {
            ezApi.ezclocker.ezAnalyticsAndMetrics.ezAmplitudeIntegration.ezTrack('View clock-in location in Google maps.');

            ezApi.ezclocker.ezGoogleMapsApi.ezDisplaySingleEventMapNoEmployerInformation(
                ezApi.ezclocker.ezClockerContext.ezGetActiveEmployee(),
                timeEntry.clockInLocation.latitude,
                timeEntry.clockInLocation.longitude,
                timeEntry.clockInLocation.accuracy,
                'Clock In',
                true,
                false,
                timeEntry);
        } else if (validClockOutLocation && EzGpsDataStatus.ACTIVE === timeEntry.clockOutGpsDataStatus) {
            ezApi.ezclocker.ezAnalyticsAndMetrics.ezAmplitudeIntegration.ezTrack('View clock-out location in Google maps.');

            ezApi.ezclocker.ezGoogleMapsApi.ezDisplaySingleEventMapNoEmployerInformation(
                ezApi.ezclocker.ezClockerContext.ezGetActiveEmployee(),
                timeEntry.clockOutLocation.latitude,
                timeEntry.clockOutLocation.longitude,
                timeEntry.clockOutLocation.accuracy,
                'Clock Out',
                false,
                true,
                timeEntry);
        } else {
            ezApi.ezclocker.ezDialog.ezShowOKMessage(
                'GPS Location',
                'The GPS location data for the time entry is not available.');
        }
    }

    /**
     * @protected @method
     * Returns the GPS status to display in a time entry row
     * param {undefined|null|string} gpsDataStatus
     * returns {string}
     */
    ezDetermineGPSStatusDisplayName(gpsDataStatus) {
        if (!EzString.hasLength(gpsDataStatus)) {
            return 'Not available';
        }

        gpsDataStatus = gpsDataStatus.toUpperCase();

        switch (gpsDataStatus) {
            case EzGpsDataStatus.DISABLED:
                return 'Disabled';
            case EzGpsDataStatus.NOT_SUPPORTED:
                return 'Not supported';
            case EzGpsDataStatus.ACTIVE:
                return 'Active';
            case EzGpsDataStatus.UNRELIABLE:
                return 'Unreliable';
            case EzGpsDataStatus.UNKNOWN:
            case EzGpsDataStatus.NONE:
            case EzGpsDataStatus.NOT_AVAILABLE:
            default:
                return 'Not available';
        }
    }

    /**
     * @protected @method
     * @param {number} timeEntryId
     */
    ezShowTimeEntryAudit(timeEntryId) {
        ezApi.ezclocker.ezTimeEntryAuditDialog.ezShow(timeEntryId);
    }

    /**
     * @public @method
     * Returns the quick filter start moment
     * @returns {moment}
     */
    ezGetQuickFilterStartMoment() {
        return ezApi.ezclocker.ezClockerContext.ezGetActiveAccountContextSelectedPeriod().ezPeriodStartMoment;
    }

    /**
     * @public @method
     * Returns the selected quick filter end moment
     * @returns {moment}
     */
    ezGetQuickFilterEndMoment() {
        return ezApi.ezclocker.ezClockerContext.ezGetActiveAccountContextSelectedPeriod().ezPeriodEndMoment;
    }

    /**
     * @protected @method
     * Handles the clock in button click
     */
    ezHandleClockInButtonClick() {
        EzEmployeeDisplayController.ezInstance.ezDisableClockInOut();

        return EzEmployeeDisplayController.ezInstance.ezObtainNewTimeEntryAssignedDataTagMap()
            .then(
                (timeEntryAssignedDataTagMaps) => ezApi.ezclocker.ezUi.ezStartPageWait(
                    `Clocking in employee ${ezApi.ezclocker.ezClockerContext.ezGetActiveEmployee().employeeName} ...`,
                    (waitDone) => {
                        EzEmployeeDisplayController.ezInstance.ezDisableClockInOut();

                        return ezApi.ezclocker.ezClockInClockOutHelper.ezClockIn(
                            ezApi.ezclocker.ezClockerContext.ezGetActiveEmployer().id,
                            ezApi.ezclocker.ezClockerContext.ezGetActiveEmployee().id,
                            ezApi.ezclocker.ezClockerContext.ezGetActiveAccountContextSelectedPeriod(),
                            timeEntryAssignedDataTagMaps)
                            .then(
                                () => {
                                    ezApi.ezclocker.ezAnalyticsAndMetrics.ezAmplitudeIntegration.ezTrack('Clock In');

                                    return waitDone()
                                        .then(EzPromise.ignoreResolve);
                                },
                                // Error messages already handled by ezClockInClockOutHelper call
                                () => waitDone()
                                    .then(EzEmployeeDisplayController.ezInstance.ezEnableClockIn));
                    }));
    }

    /**
     * @protected @method
     * Determines the Job to assign to the new time entry. Automaticlly generates the new DataTagMap request
     * if the employee has a primary job assignment. Otherwise, will prompt the user to select the job to
     * assign (if they employer is using jobs and as assigned them to the employee or to all employees).
     * @returns {array}
     * Returns an array of the assigned data tag map request for the new time entry.
     */
    ezObtainNewTimeEntryAssignedDataTagMap() {
        return EzPromise.asyncAction(
            (finished) => ezApi.ezclocker.ezClockInClockOutHelper.ezPromptForClockInJobCode('_EmployeeClockInButton')
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
     * @protected @method
     * Handles the clock out button click
     */
    ezHandleClockOutButtonClick() {
        return ezApi.ezclocker.ezUi.ezStartPageWait(
            `Clocking out employee ${ezApi.ezclocker.ezClockerContext.ezGetActiveEmployee().employeeName} ...`,
            (waitDone) => {
                EzEmployeeDisplayController.ezInstance.ezDisableClockInOut();

                ezApi.ezclocker.ezClockInClockOutHelper.ezClockOut(
                    ezApi.ezclocker.ezClockerContext.ezGetActiveEmployer().id,
                    ezApi.ezclocker.ezClockerContext.ezGetActiveEmployee().id,
                    ezApi.ezclocker.ezClockerContext.ezGetActiveAccountContextSelectedPeriod())
                    .then(
                        () => {
                            ezApi.ezclocker.ezAnalyticsAndMetrics.ezAmplitudeIntegration.ezTrack('Clock out');

                            return waitDone()
                                .then(EzPromise.ignoreResolve);
                        },
                        () => waitDone()
                            .then(EzEmployeeDisplayController.ezInstance.ezEnableClockOut));
            });
    }

    /**
     * @protected @method
     * Handles the onActiveEmployeeTimeEntriesChange
     * @param {object} eventData {
     *     employee: EzEmployeeDisplayController.ezInstance.activeEmployee,
     *     timeEntries: EzEmployeeDisplayController.ezInstance.activeEmployee.timeEntries,
     *     timeEntriesById: EzEmployeeDisplayController.ezInstance.activeEmployee.timeEntriesById,
     *     timeEntryLocations: EzEmployeeDisplayController.ezInstance.activeEmployee.timeEntryLocations
     * }
     */
    ezHandleOnActiveEmployeeTimeEntriesChanged(eventData) {
        if (!EzObject.isValid(eventData)) {
            throw new EzBadParamException(
                'eventData',
                EzEmployeeDisplayController.ezInstance,
                EzEmployeeDisplayController.ezInstance.ezHandleOnActiveEmployeeTimeEntriesChanged);
        }

        return EzEmployeeDisplayController.ezInstance.ezRefreshTimeEntryUx(eventData.data)
            .then(EzPromise.ignoreResolve);
    }

    /**
     * @protected @method
     * Calculates the elapsed time since the provided startMoment to right now
     * @param {moment} stateMoment
     */
    ezCalculateElapsedTimeToNow(startMoment) {
        if (!EzObject.isValid(startMoment)) {
            return '00:00';
        }

        let endTime = ezApi.ezclocker.ezDateTime.ezNow();

        let duration = moment.duration(endTime.diff(startMoment));

        let hours = duration.hours();

        let min = duration.minutes();

        let response = 10 > hours
            ? EzHtml.build`0${hours.toString()}`
            : hours.toString();

        response += 10 > min
            ? EzHtml.build`:0${min.toString()}`
            : EzHtml.build`:${min.toString()}`;

        return response;
    }

    /**
     * @protected @method
     * Handles the add new time entry button click event.
     */
    ezHandleAddTimeEntryButtonClick() {
        let newTimeEntry = new EzTimeEntry();

        ezApi.ezclocker.ezTimeAddEditDialogController.ezShow(
            new EzTimeAddEditDialogViewConfiguration(
                ezApi.ezclocker.ezClockerContext.ezGetUserContextPrimaryAccountType(),
                // timeEntry
                newTimeEntry,
                // defaultClockInMoment
                // Uses current date
                ezApi.ezclocker.ezDateTime.ezFromIso(newTimeEntry.clockInIso),
                // defaultClockOutMoment
                // Uses current date
                ezApi.ezclocker.ezDateTime.ezFromIso(newTimeEntry.clockInIso),
                // defaultEditReason
                null,
                // allowEditing
                true,
                // allowEditClockIn
                true,
                // allowEditClockOut
                true,
                // allowEditNote
                true,
                // allowBreaks
                ezApi.ezclocker.ezEmployerDashboardController.allowRecordingBreaks,
                // availableJobs
                null));
    }

    /**
     * @protected @method
     * Handles the EzTimeAddEditDialogController onTimeEntryDialogTimeEntryAdded event
     * @param {object} ezEvent
     */
    ezHandleOnTimeEntryDialogTimeEntryAdded(/* ezEvent */) {
        EzEmployeeDisplayController.ezInstance.ezRefreshActiveEmployeeTimeEntries();
    }

    /**
     * @protected @method
     * Handles the EzTimeAddEditDialogController onTimeEntryDialogTimeEntryUpdated event
     * @param {object} ezEvent
     */
    ezHandleOnTimeEntryDialogTimeEntryUpdated(/* ezEvent */) {
        EzEmployeeDisplayController.ezInstance.ezRefreshActiveEmployeeTimeEntries();
    }

    /**
     * @protected @method
     * Handles the onActiveAccountReady event
     * event.data = {
     *     account: {object}
     * }
     * @param {object} eventData
     */
    ezHandleOnActiveAccountReady() {
        EzEmployeeDisplayController.ezInstance.timeOffRequestsUpdated = ezApi.ezclocker.ezOptionsService.ezOptionValueToBoolean(
            ezApi.ezclocker.ezClockerContext.ezReadSelectedEmployerAccountOption(
                ezApi.ezclocker.ezOptionsService.NOTIFY_TIME_OFF_REQUESTS_UPDATED,
                EzEmployerOption.EZOPTION_VALUE_FALSE),
            false);

        EzEmployeeDisplayController.ezInstance.ezRefreshEmployeeSelect(ezApi.ezclocker.ezClockerContext.ezGetSelectedEmployerAccountData());

        ezApi.ezclocker.ezEventEngine.ezWantEvent(
            EzInviteEmployeeDialog.ezEventNames.onInviteEmployeeDialogEmployeeAdded,
            EzEmployeeDisplayController.ezApiName,
            EzEmployeeDisplayController.ezInstance.ezHandleOnInviteEmployeeDialogEmployeeAdded);

        ezApi.ezclocker.ezEventEngine.ezWantEvent(
            EzInviteEmployeeDialog.ezEventNames.onInviteEmployeeDialogEmployeeUpdated,
            EzEmployeeDisplayController.ezApiName,
            EzEmployeeDisplayController.ezInstance.ezHandleOnInviteEmployeeDialogEmployeeUpdated);
    }

    /**
     * @protected @method
     * Handles the onSelectedEmployerReady event
     * ezEvent.data = {
     *     account: {object},
     *     employees: {Array},
     *     options: {object},
     *     license: {object}
     * }
     */
    ezHandleOnSelectedEmployerEmployeeAccountsUpdated() {
        EzEmployeeDisplayController.ezInstance.ezRefreshEmployeeSelect(
            ezApi.ezclocker.ezClockerContext.ezGetSelectedEmployerAccountData());
    }

    /**
     * @protected @method
     * Triggers the EzEmployeeDisplayController.ezEventNames.onEmployeeComboSelectionChanged
     */
    ezTriggerEmployeeComboSelectionChanged() {
        let selectedEmployeeId = ezApi.ezToNumber(ezApi.ezclocker.ezUi.ezGetInputValue('employeeCombo'));

        if (!EzNumber.isNumber(selectedEmployeeId) || 0 >= selectedEmployeeId) {
            selectedEmployeeId = -1;
            EzEmployeeDisplayController.ezInstance.ezDetermineIfNewTimeoffAndShowModal();
        }

        // This is a UX event, not an EzEventEngine event
        ezApi.ezclocker.ezEventEngine.ezTriggerEvent(
            EzEmployeeDisplayController.ezEventNames.onEmployeeComboSelectionChanged,
            ezApi.ezclocker.ezEventEngine.ezBuildEventData(
                EzEmployeeDisplayController.ezApiName,
                'Selected employee changed',
                parseInt(selectedEmployeeId)
            ));
    }

    /**
     * @protected @method
     * Handles employee selection change
     * @param {object} event
     * event.data = {number} // selectedEmployeeId
     */
    ezHandleOnEmployeeComboSelectionChanged(ezEvent) {
        if (!EzObject.isValid(ezEvent) || !EzNumber.isNumber(ezEvent.data)) {
            throw new EzBadParamException(
                'event',
                EzEmployeeDisplayController.ezInstance,
                EzEmployeeDisplayController.ezInstance.ezHandleOnEmployeeComboSelectionChanged);
        }

        const activeEmployee = ezApi.ezclocker.ezClockerContext.ezGetActiveEmployee();

        if (EzObject.isValid(activeEmployee) && ezEvent.data === activeEmployee.id) {
            // Already selected
            return;
        }

        EzEmployeeDisplayController.ezInstance.ezSetActiveEmployeeById(ezEvent.data);
    }

    /**
     * @protected @method
     * Handles onActiveEmployeeReady onActiveEmployeeReady event
    */
    ezHandleOnActiveEmployeeReady(ezEvent) {
        if (!EzObject.isValid(ezEvent)) {
            throw new EzBadParamException(
                'ezEvent',
                EzEmployeeDisplayController.ezInstance,
                EzEmployeeDisplayController.ezInstance.ezHandleOnActiveEmployeeReady);
        }

        ezApi.ezclocker.ezClockerContext.ezSaveActiveAccountOption(
            EzEmployerOption.EZOPTION_SELECTED_EMPLOYEE_ID,
            ezEvent.data.employee.id.toString())
            .then(EzPromise.ignoreResolve);

        EzEmployeeDisplayController.ezInstance.ezRenderEmployeeUI(ezEvent.data)
            .then(EzPromise.ignoreResolve);
    }

    /**
     * @protected @method
     * Handles the onActiveEmployeeChanged
     * @param {object} ezEvent
     * event.data = {
     *     employee: EzEmployeeDisplayController.ezInstance.activeEmployee,
     *     activeClockIn: EzEmployeeDisplayController.ezInstance.ezGetActiveEmployeeActiveClockIn()
     * }
     */
    ezHandleonActiveEmployeeChanged(ezEvent) {
        if (!EzObject.isValid(ezEvent) || !EzObject.isValid(ezEvent.data) || !EzObject.isValid(ezEvent.data.employee)) {
            throw new EzBadParamException(
                'ezEvent',
                EzEmployeeDisplayController.ezInstance,
                EzEmployeeDisplayController.ezInstance.ezHandleonActiveEmployeeChanged);
        }

        ezApi.ezclocker.ezClockerContext.ezSaveActiveAccountOption(
            EzEmployerOption.EZOPTION_SELECTED_EMPLOYEE_ID,
            ezEvent.data.employee.id.toString())
            .then(EzPromise.ignoreResolve);

        ezApi.ezclocker.ezUi.ezSetInputValue(
            EzEmployeeDisplayController.ezInstance.ezIds.inputs.employeeSelectInputId,
            ezEvent.data.employee.id);

        // EzEmployeeDisplayController.ezInstance.ezRenderEmployeeUI(ezEvent.data)
        //   .then(EzPromise.ignoreResolve);

        EzEmployeeDisplayController.ezInstance.ezUpdateActiveEmployeeUx(ezEvent.data)
            .then(EzPromise.ignoreResolve);
    }

    /**
     * @protected @method
     * Handles OnActiveEmployeeUserInfoUpdated event from EzClockerContext
     */
    ezHandleOnActiveEmployeeUserInfoUpdated() {
        EzEmployeeDisplayController.ezInstance.ezRefreshActiveEmployeeUX();
    }

    /**
     * @protected @method
     * Handles onActiveEmployeeReady event
     * @param {object} event
     * Event Data Object (event.data):
     * {
     *     employee: {employeeObject}
     * }
     */
    ezHandleonActiveEmployeeUpdated() {
        EzEmployeeDisplayController.ezInstance.ezRefreshActiveEmployeeUX();
    }

    /**
     * @protected @method
     * Handles onActiveEmployeeClosed event
     */
    ezHandleOnActiveEmployeeClosed() {
        ezApi.ezclocker.ezClockerContext.ezSaveActiveAccountOption(EzEmployerOption.EZOPTION_SELECTED_EMPLOYEE_ID, '-1')
            .then(EzPromise.ignoreResolve);

        EzEmployeeDisplayController.ezInstance.ezUpdateActiveEmployeeUx(null);
    }

    /**
     * @protected @method
     * Handles the onSelectedEmployerReady event
     * @param {object} event
     */
    ezHandleOnActiveEmployeeActiveClockInChanged(event) {
        EzEmployeeDisplayController.ezInstance.ezDisplayActiveClockInStatusBox(event.data);
    }

    /**
     * @protected @method
     * Handles the resend invite button click event.
     */
    ezHandleReinviteEmployeeClick() {
        if (!EzObject.isValid(ezApi.ezclocker.ezClockerContext.ezGetActiveEmployee())) {
            throw new EzException('A valid active employee is required to send or re-send an invite to ezClocker.');
        }

        let aEmployeeName = ezApi.ezclocker.ezClockerContext.ezGetActiveEmployee().employeeName;

        ezApi.ezclocker.ezUi.ezDisable(EzEmployeeDisplayController.ezInstance.ezIds.buttons.reinviteEmployeeButtonId);

        ezApi.ezclocker.ezUi.ezStartPageWaitExecute(
            `Sending invite to ${aEmployeeName} ...`,
            (waitDone) => ezApi.ezclocker.ezClockerContext.ezInviteActiveEmployee()
                .then(waitDone, waitDone));
    }

    /**
     * @protected @method
     * Handles the EzClockerContextEventName.onActiveEmployeeInviteSuccess event
     */
    ezHandleOnActiveEmployeeInviteSuccess(ezEvent) {
        ezApi.ezclocker.ezUi.ezEnable(EzEmployeeDisplayController.ezInstance.ezIds.buttons.reinviteEmployeeButtonId);

        ezApi.ezclocker.ezDialog.ezShowMessage(
            'Resend Invite',
            EzString.msg`
                You have re-invited ${ezEvent.data.employeeName} to ezClocker. Please instruct your employee
                to check their email and/or text messages for the ezClocker invite.`);
    }

    /**
     * @protected @method
     * Handles the EzClockerContextEventName.onActiveEmployeeInviteFailure event
     */
    ezHandleOnActiveEmployeeInviteFailure(ezEvent) {
        if (!EzObject.isValid(ezEvent)) {
            throw new EzBadParamException(
                'ezEvent',
                EzEmployeeDisplayController.ezInstance,
                EzEmployeeDisplayController.ezInstance.ezHandleOnActiveEmployeeInviteFailure);
        }

        ezApi.ezclocker.ezUi.ezEnable(EzEmployeeDisplayController.ezInstance.ezIds.buttons.reinviteEmployeeButtonId);

        let possibleCause = EzString.EMPTY;

        if (404 === ezEvent.data.errorResponse.errorCode) {
            possibleCause = EzString.em`
                Possible cause: User sign in information is missing or not assigned for
                employeeId=${ezEvent.data.employeeId}`;
        }

        if (6898 === ezEvent.data.errorResponse.errorCode) {
            // reinvite restriction error code
            ezApi.ezclocker.ezDialog.ezShowError(
                'Employee Invite Error',
                EzHtml.build`
                    EzClocker is unable to send the invite to ${ezEvent.data.employeeName} at this time.
                    <p>
                        ${ezEvent.data.errorResponse.message}
                    </p>`);
        } else {
            ezApi.ezclocker.ezDialog.ezShowError(
                'Employee Invite Error',
                EzHtml.build`
                    EzClocker is unable to send the invite to ${ezEvent.data.employeeName} at this time.
                    <p>
                        Please contact support at
                        <a
                            href="mailto:suport@ezclocker.com">
                                support@ezclocker.com
                        </a>
                        for additional assistance.
                    </p>
                    <div
                        id="EzErrorMessageDetailsContainer"
                        class="ez-error-details-container">
                        <p>
                            If you contact ezClocker support for help you can provide the additional details below
                            to help support diagnose your error.
                        </p>
                        <TextArea
                            id="EzErrorMessageDetailsInput"
                            class="ez-error-message-details"
                            rows="8">
                            Error reported
                            --------------
                            ${ezEvent.data.errorResponse.message}
                            ${possibleCause}

                            Employer Id
                            --------------
                            ${ezEvent.data.employerId}

                            Employee Id
                            --------------
                            ${ezEvent.data.employeeId}

                            Error Response
                            --------------
                            ${EzJson.toJson(ezEvent.data, 3, false)}
                        </TextArea>
                    </div>`);
        }
    }

    /**
     * @protected @method
     * Builds the main content that is not driven by other controllers.
     */
    ezBuildMainContentHtml() {
        return EzHtml.build`
            <div
                id="${EzEmployeeDisplayController.ezInstance.ezIds.mainContentContainerId}"
                class="ezContentView">
            </div>`;
    }

    /**
     * @protected @method
     * Builds the employee information display HTML view
     */
    ezBuildEmployeeDisplayHtml() {
        ezApi.ezclocker.ezUi.ezContent(
            'EzPageViewSelectedEmployeeHeader',
            EzEmployeeDisplayController.ezInstance.ezBuildSelectedEmployeeUXHTML());

        EzEmployeeDisplayController.ezInstance.ezRefreshActiveEmployeeUX();

        EzEmployeeDisplayController.ezInstance.ezInitializeEmployeeQuickFilterDatePickersAndPayPeriodIcons();

        EzEmployeeDisplayController.ezInstance.ezDisableEmployeeActions();
    }

    /**
     * @protected @method
     * Updates the active employee's time entry total hours value
     * @param {string} totalHoursToDisplay
     */
    ezUpdateActiveEmployeeTotalHours(totalHoursToDisplay) {
        if (!ezApi.ezclocker.ezUi.ezElementExists(EzEmployeeDisplayController.ezInstance.ezIds.employeeTotalHoursInputId)) {
            ezApi.ezclocker.ezLogger.warn(
                EzString.msg`
                    Attempted to update the employee's total hours UX but the element with
                    id=${EzEmployeeDisplayController.ezInstance.ezIds.employeeTotalHoursInputId} does not yet exist.`);

            return;
        }

        if (!EzString.hasLength(totalHoursToDisplay)) {
            ezApi.ezclocker.ezUi.ezSetInputValue(
                EzEmployeeDisplayController.ezInstance.ezIds.employeeTotalHoursInputId,
                '00:00');
        }

        ezApi.ezclocker.ezUi.ezSetInputValue(
            EzEmployeeDisplayController.ezInstance.ezIds.employeeTotalHoursInputId,
            EzString.EMPTY);

        ezApi.ezclocker.ezUi.ezSetElementCss(
            EzEmployeeDisplayController.ezInstance.ezIds.employeeTotalHoursInputId,
            'font-size',
            '24pt');

        ezApi.ezclocker.ezUi.ezSetInputValue(
            EzEmployeeDisplayController.ezInstance.ezIds.employeeTotalHoursInputId,
            totalHoursToDisplay);

        ezApi.ezclocker.ezUi.ezSetElementCss(
            EzEmployeeDisplayController.ezInstance.ezIds.employeeTotalHoursInputId,
            'font-size',
            '18pt');
    }

    /**
     * @protected @method
     * Builds the clocked out status box's HTML
     * @returns {string}
     */
    ezBuildClockedOutStatusBox() {
        return EzHtml.build`
            <table
                id="EzActiveClockInTable"
                class="activeClockInTable">
                <tr
                    id="EzActiveClockInTable_HeaderRow">
                    <th
                        id="EzActiveClockInTable_StatusHeaderCell"
                        class="activeClockInHeader">
                        Status
                    </th>
                </tr>
                <tr
                    id="EzActiveClockInTable_ActiveClockInDataRow">
                    <td
                        id="EzActiveClockInTable_ActiveClockInDataCell"
                        class="activeClockInCell">
                        Clocked Out
                    </td>
                </tr>
            </table>`;
    }

    /**
     * @protected @method
     * Builds the HTML for the a time entry row's audit button
     * @param {object} timeEntry
     * @returns {string}
     */
    ezBuildTimeEntryRowAuditButton(timeEntry) {
        if (!EzObject.isValid(timeEntry)) {
            throw new EzBadParamException(
                'timeEntry',
                EzEmployeeDisplayController.ezInstance,
                EzEmployeeDisplayController.ezInstance.ezBuildTimeEntryRowAuditButton);
        }

        return EzHtml.build`
            <button
                id="auditButton_${timeEntry.id}"
                class="ezToolButton"
                onclick="ezApi.ezclocker.ezEmployeeDisplayController.ezShowTimeEntryAudit(${timeEntry.id})">
                <img
                    id="auditButtonImg_${timeEntry.id}"
                    class="ezEditButtonImage"
                    title="View the time entry\'s audit history."
                    src="/public/images/freepik/shields/shield.svg"
                    alt="."/>
            </button>`;
    }

    /**
     * @protected @method
     * Builds the HTML for the time entry row's GPS information cell
     * @param {object} timeEntry
     * @param {string} rowClass
     * @returns {Promise.resolve}
     */
    ezBuildGPSInfoCell(timeEntry, rowClass) {
        if (!EzObject.isValid(timeEntry)) {
            return EzPromise.finished(
                EzHtml.build`
                    <td
                        id="location_${timeEntry.id}"
                        class="${rowClass} centerCell timeEntryGpsStatusText">
                        ${EzEmployeeDisplayController.ezInstance.ezDetermineGPSStatusDisplayName(EzGpsDataStatus.UNKNOWN)}
                    </td>`);
        }

        return EzPromise.asyncAction(
            (finished) => {
                let validClockInLocation = EzBoolean.isTrue(EzEmployeeDisplayController.ezInstance.ezIsValidGPSLocationData(timeEntry.clockInLocation));

                let validClockOutLocation = EzBoolean.isTrue(EzEmployeeDisplayController.ezInstance.ezIsValidGPSLocationData(timeEntry.clockOutLocation));

                let clockInActive = EzGpsDataStatus.ACTIVE === timeEntry.clockInGpsDataStatus.toUpperCase();

                let clockOutActive = EzGpsDataStatus.ACTIVE === timeEntry.clockOutGpsDataStatus.toUpperCase();

                let hasClockInGps = clockInActive && validClockInLocation;

                let hasClockOutGps = clockOutActive && validClockOutLocation;

                if (clockInActive && !hasClockInGps) {
                    timeEntry.clockInGpsDataStatus = EzGpsDataStatus.NOT_AVAILABLE;
                } else if (clockOutActive && !hasClockOutGps) {
                    timeEntry.clockOutGpsDataStatus = EzGpsDataStatus.NOT_AVAILABLE;
                }

                if (hasClockInGps && hasClockOutGps) {
                    // Both clock-in and clock-out location available
                    return finished(
                        EzEmployeeDisplayController.ezInstance.ezBuildGpsCellHtml(
                            timeEntry,
                            rowClass,
                            true,
                            'View the clock in and clock out locations'));
                } else if (hasClockInGps) {
                    // Data only available for clock in
                    return finished(
                        EzEmployeeDisplayController.ezInstance.ezBuildGpsCellHtml(
                            timeEntry,
                            rowClass,
                            true,
                            'View the clock in location'));
                } else if (hasClockOutGps) {
                    return finished(
                        EzEmployeeDisplayController.ezInstance.ezBuildGpsCellHtml(
                            timeEntry,
                            rowClass,
                            true,
                            'View the clock out location.'));
                }

                return finished(
                    EzEmployeeDisplayController.ezInstance.ezBuildGpsCellHtml(
                        timeEntry,
                        rowClass,
                        false,
                        'Location data not available.'));
            });
    }

    /**
     * @protected @method
     * Generates the GPS table cell HTML
     * @param {object} timeEntry
     * @param {undefined|null|string} rowClass
     * @param {undefined|null|boolean} allowViewMap
     * @returns {string}
     */
    ezBuildGpsCellHtml(timeEntry, rowClass, allowViewMap, imgHint) {
        let cellContents = EzBoolean.isTrue(allowViewMap)
            ? EzHtml.build`
                <button
                    class="ezToolButton"
                    title="${imgHint}"
                    onclick="ezApi.ezclocker.ezEmployeeDisplayController.ezViewGPSLocationMap(${timeEntry.timeEntryIndex})">
                    <img
                        class="ezButtonImage_16x16"
                        alt="View GPS Location"
                        title="${imgHint}"
                        src="${ezApi.ezclocker.ezNavigation.ezGetPublicImagesUrl('maps/viewmap.svg')}"/>
                </button>`
            : EzHtml.build`
                <img
                    class="ezButtonImage_24x24"
                    alt="GPS location not available"
                    title="GPS location not available"
                    src="${ezApi.ezclocker.ezNavigation.ezGetPublicImagesUrl('icons/na-gray.svg')}"/>`;

        return EzHtml.build`
            <td
                id="location_${timeEntry.id}"
                class="ezGridMapCell ${rowClass} centerCell timeEntryGpsStatusText">
                ${cellContents}
            </td>`;
    }

    /**
     * @proected @method
     * Filters the employer dashboard based on the selected employee and selected view period.
     * @returns {Promise.resolve}
    */
    ezFilterDashboard() {
        return ezApi.ezclocker.ezUi.ezPageWaitAsync(
            'Refreshing employee time entries ...',
            (waitDone, finished) => {
                let selectedPeriod = ezApi.ezclocker.ezDateTime.ezCreateSelectedPeriod(
                    ezApi.ezclocker.ezDateTime.ezDateFromDatePicker('_quickFilterStartDate').startOf('day'),
                    ezApi.ezclocker.ezDateTime.ezDateFromDatePicker('_quickFilterEndDate').endOf('day'));

                return ezApi.ezclocker.ezClockerContext.ezSetActiveAccountSelectedPeriod(selectedPeriod)
                    .then(EzEmployeeDisplayController.ezInstance.ezRefreshActiveEmployeeTimeEntries)
                    .then(waitDone)
                    .then(finished);
            });
    }


    /**
     * @proected @method
     * Filters the employer dashboard based on the selected employee and selected view period.
     * @returns {Promise.resolve}
     */
    ezUpdateSelectedPeriod() {
        return ezApi.ezclocker.ezUi.ezPageWaitAsync(
            'Updating employee start and end dates ...',
            (waitDone, finished) => {
                let selectedPeriod = ezApi.ezclocker.ezDateTime.ezCreateSelectedPeriod(
                    ezApi.ezclocker.ezDateTime.ezDateFromDatePicker('_quickFilterStartDate').startOf('day'),
                    ezApi.ezclocker.ezDateTime.ezDateFromDatePicker('_quickFilterEndDate').endOf('day'));

                return ezApi.ezclocker.ezClockerContext.ezSetActiveAccountSelectedPeriod(selectedPeriod)
                    .then(waitDone)
                    .then(finished);
            });
    }


    /**
     * @protected @method
     * Refreshes the active employee's time entries.
     * @returns {Promise.resolve}
     */
    ezRefreshActiveEmployeeTimeEntries() {
        return ezApi.ezclocker.ezUi.ezPageWaitAsync(
            'Refreshing employee time entries ...',
            (waitDone, finished) => ezApi.ezclocker.ezClockerContext.ezRefreshActiveEmployeeTimeEntriesForPeriod(
                ezApi.ezclocker.ezClockerContext.ezGetActiveAccountSelectedPeriod())
                .then(waitDone)
                .then(finished));
    }

    /**
     * @protected @method
     * Performs the QuickRefresh of the employee time entry UI
     * @returns {Promise.resolve}
     */
    ezRefreshTimeEntryUx(employeeInfo) {
        if (!EzObject.isValid(employeeInfo)) {
            throw new EzBadParamException(
                'employeeInfo',
                EzEmployeeDisplayController.ezInstance,
                EzEmployeeDisplayController.ezInstance.ezRefreshTimeEntryUx);
        }

        return ezApi.ezclocker.ezUi.ezPageWaitAsync(
            'Refreshing employee time entries ...',
            (waitDone, finished) => {
                ezApi.ezclocker.ezUi.ezDisable(
                    EzEmployeeDisplayController.ezInstance.ezIds.buttons.quickFilterSubmitButtonId);

                return EzEmployeeDisplayController.ezInstance.ezBuildEmployeeTimeEntryGrid(employeeInfo)
                    .then(
                        () => {
                            ezApi.ezclocker.ezUi.ezEnable(
                                EzEmployeeDisplayController.ezInstance.ezIds.buttons.quickFilterSubmitButtonId);

                            EzEmployeeDisplayController.ezInstance.ezHandleWindowResizeEvent();

                            return waitDone().then(finished);
                        });
            });
    }

    /**
     * @protected @method
     * Handles the document.resize event to update the size of the scrollable section in the page.
     */
    ezHandleWindowResizeEvent() {
        if (!ezApi.ezclocker.ezUi.ezElementExists(EzEmployeeDisplayController.ezInstance.ezIds.timeEntryContainerId)) {
            // Time entry container doesn't exist yet
            return;
        }

        const windowClientHeight = ezApi.ezclocker.ezUi.ezGetElementInnerHeight('window');

        const ezPageViewHeaderHeight = ezApi.ezclocker.ezUi.ezGetElementOuterHeight('EzPageViewHeader');

        const ezPageViewSelectedEmployeeHeaderHeight = ezApi.ezclocker.ezUi.ezGetElementOuterHeight('EzPageViewSelectedEmployeeHeader');

        const ezEmployerDashboardPageEzDomRect = ezApi.ezclocker.ezUi.ezElementClientRect('EzEmployerDashboardPage');

        const timeEntryContainerDivEzDomRect = ezApi.ezclocker.ezUi.ezElementClientRect(
            EzEmployeeDisplayController.ezInstance.ezIds.timeEntryContainerId);

        const additionalPadding = 24;

        const parentContainerAdjustments = (timeEntryContainerDivEzDomRect.ezTop - ezEmployerDashboardPageEzDomRect.ezTop) * 2;

        const topElementsTotalHeight = ezPageViewHeaderHeight + ezPageViewSelectedEmployeeHeaderHeight + parentContainerAdjustments + additionalPadding;

        const timeEntryContainerDivHeight = ezApi.ezclocker.ezUi.ezGetElementOuterHeight(
            EzEmployeeDisplayController.ezInstance.ezIds.timeEntryContainerId);

        // Calculate the maximum height
        const minimumTimeEntryContainerDivHeight = 200;

        let maximumTimeEntryContainerDivHeight = windowClientHeight - topElementsTotalHeight;

        // If the maximum height is lower than the minimum height, just use the minimum.
        if (minimumTimeEntryContainerDivHeight > maximumTimeEntryContainerDivHeight) {
            maximumTimeEntryContainerDivHeight = minimumTimeEntryContainerDivHeight;
        }

        ezApi.ezclocker.ezLogger.info(
            `Updated Employer Dashboard time entry grid height from ${timeEntryContainerDivHeight} to ${maximumTimeEntryContainerDivHeight}`);

        ezApi.ezclocker.ezUi.ezSetElementCss(
            EzEmployeeDisplayController.ezInstance.ezIds.timeEntryContainerId,
            'minHeight',
            minimumTimeEntryContainerDivHeight + 'px');

        ezApi.ezclocker.ezUi.ezSetElementCss(
            EzEmployeeDisplayController.ezInstance.ezIds.timeEntryContainerId,
            'maxHeight',
            maximumTimeEntryContainerDivHeight + 'px');

        ezApi.ezclocker.ezUi.ezSetElementCss(
            EzEmployeeDisplayController.ezInstance.ezIds.timeEntryContainerId,
            'height',
            maximumTimeEntryContainerDivHeight + 'px');
    }

    /**
     * @protected @method
     * Builds the selected employee's UX HTML
     * @returns {string}
     */
    ezBuildSelectedEmployeeUXHTML() {
        return EzHtml.build`
            ${EzEmployeeDisplayController.ezInstance.ezBuildEmployeeInformationContainerHTML()}
            ${EzEmployeeDisplayController.ezInstance.ezBuildEmployeeMenuContainerHTML()}
            ${EzEmployeeDisplayController.ezInstance.ezBuildEmployeeTimeEntryFilterMenuContainerHTML()}`;
    }

    /**
     * @protected @method
     * Builds the selected employee's information UX HTML
     * @returns {string}
     */
    ezBuildEmployeeInformationContainerHTML() {
        return EzHtml.build`
            <table
                id="_EmployeeInformationContainer"
                class="employeeInformationBox bottomShadow">
                <tr>
                    <td>
                        <table
                            id="_EmployeeInformation"
                            class="employeeInformation">
                            <tr>
                                <td
                                    id="_EmployeeImageCell"
                                    class="employeeImageCell">
                                    <img
                                        id="_EmployeeImage"
                                        class="employeeImage"
                                        style="width:60px;height:60px;display:none"
                                        alt="."/>
                                </td>
                                <td>
                                    <div
                                        id="EzEmployeeInfoEmployeeName"
                                        class="employeeNameCell ezBold">
                                    </div>
                                    <div
                                        id="EzEmployeeInfoEmployeeEmail"
                                        class="employeeNameCell">
                                    </div>
                                    <div
                                        id="EzEmployeeInfoEmployeUsernameCell"
                                        class="ezText-username-info">
                                    </div>
                                </td>
                            </tr>
                        </table>
                    </td>
                    <td
                        class="EzEmployerDashboard_ActiveClockInCell">
                        <div
                            id="_ActiveClockInContainer"
                            class="activeClockInContainer">
                            <table
                                class="activeClockInTable">
                                <tr>
                                    <th
                                        id="EzClockInStatusColumn"
                                        class="activeClockInHeader">Status</th>
                                </tr>
                                <tr>
                                    <td
                                        class="activeClockInCell">
                                        Clocked Out
                                    </td>
                                </tr>
                            </table>
                        </div>
                    </td>
                </tr>
            </table>`;
    }

    /**
     * @protected @method
     * Builds the selected employee's menu container UX HTML
     * @returns {string}
     */
    ezBuildEmployeeMenuContainerHTML() {
        return EzHtml.build`
            <div
                class="employeeMenuContainer insetTopShadow"
                id="_EmployeeMenuContainerDiv">
                <table
                    class="fullWidthTable">
                    <tr>
                        <td>
                            <button
                                class="ezMajorButton"
                                id="_EmployeeClockInButton"
                                disabled>
                                <div>
                                    Clock In
                                </div>
                                <div
                                    id="clockInButtonEmployeeName"
                                    class="majorButtonSubLabel">
                                </div>
                            </button>
                            <button
                                class="ezMajorButton"
                                id="_EmployeeClockOutButton"
                                disabled>
                                <div>
                                    Clock Out
                                </div>
                                <div
                                    id="clockOutButtonEmployeeName"
                                    class="majorButtonSubLabel">
                                </div>
                            </button>
                        </td>
                        <td>
                            <div
                                class="floatRightDiv">
                                <table>
                                    <tr>
                                        <td>
                                            <button
                                                class="ezMajorButton"
                                                id="_AddTimeEntryButton"
                                                disabled>
                                                Add Time
                                            </button>
                                        </td>
                                        <td>
                                            <button
                                                id="_ReInviteEmployeeButton"
                                                class="ezMajorButton"
                                                disabled>
                                                <div
                                                    id="EzResendInviteButtonLabel"
                                                    class="ezContainer">
                                                    Resend Invite
                                                </div>
                                            </button>
                                        </td>
                                        <td>
                                            <button
                                                id="_DeleteEmployeeButton"
                                                class="ezDeleteMajorButton"
                                                disabled>
                                                <div
                                                    id="EzDeleteEmployeeButtonLabel"
                                                    class="ezContainer">
                                                    Delete Employee
                                                </div>
                                            </button>
                                        </td>
                                    </tr>
                                </table>
                            </div>
                        </td>
                    </tr>
                </table>
            </div>`;
    }

    /**
     * @protected @method
     * Builds the selected employee's quick-filter menu UX HTML
     * @returns {string}
     */
    ezBuildEmployeeTimeEntryFilterMenuContainerHTML() {
        return EzHtml.build`
            <div
                id="_filterMenuContainer"
                class="filterMenu">
                <table
                    class="noBorderPaddingSpacing fullWidthTable">
                    <tr>
                        <td
                            id="EzEmployeeTimeEntryFilter_SelectionColumn">
                            ${EzEmployeeDisplayController.ezInstance.ezBuildQuickFilterTableHTML()}
                        </td>
                        <td
                            id="EzEmployeeTimeEntries">
                            <!-- empty column -->
                        </td>
                        <td
                            class="rightMiddleCell">
                            <div
                                id="EzTotalHoursContainer">
                                <label
                                    id="EzEmployeeTotalHoursLabel"
                                    for="_TotalHours">
                                        Total Time:
                                </label>
                                <input
                                    id="_TotalHours"
                                    type="text"
                                    class="totalHours"
                                    readonly/>
                            </div>
                        </td>
                    </tr>
                </table>
            </div>`;
    }

    /**
     * @protected @method
     * Builds the quick-filter component UX HTML
     * @returns {string}
     */
    ezBuildQuickFilterTableHTML() {
        return EzHtml.build`
            <table
                id="EzEmployeeTimeEntryFilter_QuickFilterLayoutTable"
                class="noBorderPaddingSpacing">
                <tr>
                    <td
                        id="EzEmployeeTimeEntryFilter_QuickFilterLayoutTable_LeftIconId">
                        <button
                            id="_quickFilterLeftArrowIconId"
                            class="ezToolButton"
                            onclick="ezApi.ezclocker.ezEmployeeDisplayController.renderPreviousPayPeriod()"
                            title="Move Left...">
                            <img
                                src="/public/images/icons/arrow-left-white.svg"
                                style="width:24px;"
                                alt="Go left in pay period">
                            </img>
                        </button>
                    </td>
                    <td
                        id="EzEmployeeTimeEntryFilter_QuickFilterLayoutTable_StartDateCol">
                        <input
                            id="_quickFilterStartDate"
                            name="quickFilterStartDate"
                            type="text"/>
                    </td>
                    <td
                        id="EzEmployeeTimeEntryFilter_QuickFilterLayoutTable_ToCol"
                        class="ez-cell-align-middle-center ezPadding-left-right-8">
                        to
                    </td>
                    <td
                        id="EzEmployeeTimeEntryFilter_QuickFilterLayoutTable_EndDateCol">
                        <input
                            id="_quickFilterEndDate"
                            name="quickFilterEndDate"
                            type="text"/>
                    </td>
                    <td
                        id="EzEmployeeTimeEntryFilter_QuickFilterLayoutTable_RightIconId">
                        <button
                            id="_quickFilterLeftArrowIconId"
                            class="ezToolButton"
                            onclick="ezApi.ezclocker.ezEmployeeDisplayController.renderNextPayPeriod()"
                            title="Move Right...">
                            <img
                                src="/public/images/icons/arrow-right-white.svg"
                                style="width:24px;"
                                alt="Go right in pay period">
                            </img>
                        </button>
                    </td>
                    <td
                        id="EzEmployeeTimeEntryFilter_QuickFilterLayoutTable_ApplyCol">
                        <button
                            id="_quickFilterSubmit"
                            class="ezMajorButton"
                            title="Load selected period...">
                            View Pay Period
                        </button>
                    </td>
                </tr>
            </table>`;
    }

    /**
     * @public @method
     * Derive the end date per-pay period.
     */
    deriveEndDatePerPayPeriod() {
        const startDateFromDatePicker = ezApi.ezclocker.ezDateTime.ezDateFromDatePicker('_quickFilterStartDate');

        const employerOptions = ezApi.ezclocker.ezClockerContext.ezGetActiveEmployer().options;

        const payPeriod = employerOptions.SELECTED_PAY_PERIOD || 'NONE';

        let payPeriodNumeric = EzPayPeriod[payPeriod];

        let todaysDateMoment = ezApi.ezclocker.ezDateTime.ezNowWithStartOfDay();

        if (30 === payPeriodNumeric) {
            return ezApi.ezclocker.ezDateTime.ezDateString(
                todaysDateMoment.endOf('month').startOf('day'));

        } else {
            const endDateMoment = moment(startDateFromDatePicker).add(payPeriodNumeric - 1, 'days');

            return ezApi.ezclocker.ezDateTime.ezDateString(endDateMoment);
        }
    }

    /**
     * @public @method
     * Derive start date per pay-period
     */
    deriveStartDatePerPayPeriod() {
        const employerOptions = ezApi.ezclocker.ezClockerContext.ezGetActiveEmployer().options;

        const yesterdayDayMoment = moment().subtract(1, 'days').tz(ezApi.ezclocker.ezDateTime.activeTimeZone).startOf('day');

        const yesterdayDateString = yesterdayDayMoment.format('YYYY-MM-DD');

        const lastClosingDate = employerOptions['PAY_PERIOD_LAST_CLOSING_DATE'] || yesterdayDateString;

        const lastClosingDateMoment = ezApi.ezclocker.ezDateTime.ezSetMomentStartOfDay(moment(lastClosingDate));

        const computedFirstStartDateMoment = lastClosingDateMoment.add(1, 'days');

        const payPeriod = employerOptions.SELECTED_PAY_PERIOD || 'NONE';

        let payPeriodNumeric = EzPayPeriod[payPeriod];

        let todaysDateMoment = ezApi.ezclocker.ezDateTime.ezNowWithStartOfDay();

        const diff = todaysDateMoment.diff(computedFirstStartDateMoment, 'days');

        if (30 === payPeriodNumeric) {
            const computedStartDate = (todaysDateMoment.month() + 1) + '/01/' + todaysDateMoment.year();

            return ezApi.ezclocker.ezDateTime.ezDateString(moment(computedStartDate));
        } else if (diff < payPeriodNumeric) {
            return ezApi.ezclocker.ezDateTime.ezDateString(computedFirstStartDateMoment);
        } else {
            const absoluteCurrentPayPeriodNumber = Math.floor(diff / payPeriodNumeric);

            const mostRecentStartDateMoment = moment(
                ezApi.ezclocker.ezDateTime.ezDateString(computedFirstStartDateMoment))
                .add((payPeriodNumeric * absoluteCurrentPayPeriodNumber), 'days');

            const computedStartDate = ezApi.ezclocker.ezDateTime.ezDateString(mostRecentStartDateMoment);

            return computedStartDate;
        }


    }

    /**
     * @public @method
     * Render next pay period
     */
    renderNextPayPeriod() {
        const employerOptions = ezApi.ezclocker.ezClockerContext.ezGetActiveEmployer().options;

        const payPeriod = employerOptions.SELECTED_PAY_PERIOD || 'NONE';

        const yesterdayDayMoment = moment()
            .subtract(1, 'days')
            .tz(ezApi.ezclocker.ezDateTime.activeTimeZone)
            .startOf('day');

        const yesterdayDateString = yesterdayDayMoment.format('YYYY-MM-DD');

        const employerlastClosingDate = employerOptions['PAY_PERIOD_LAST_CLOSING_DATE'] || yesterdayDateString;

        const employerLastClosingDateMoment = ezApi.ezclocker.ezDateTime.ezSetMomentStartOfDay(moment(employerlastClosingDate));

        let payPeriodNumeric = EzPayPeriod[payPeriod];

        let endDateMomentFromDatePicker = ezApi.ezclocker.ezDateTime.ezDateFromDatePicker('_quickFilterEndDate');

        let endDateMoment;

        if (30 === payPeriodNumeric) {
            const endDateMomentForDerivation = moment(ezApi.ezclocker.ezDateTime.ezDateString(endDateMomentFromDatePicker))
            .add(1, 'month');

            endDateMoment = moment(ezApi.ezclocker.ezDateTime.ezDateString(
                endDateMomentForDerivation.endOf('month').startOf('day')));

            ezApi.ezclocker.ezUi.ezSetInputValue(
                '_quickFilterStartDate',
                ezApi.ezclocker.ezDateTime.ezDateString(endDateMomentForDerivation.startOf('month').startOf('day')));
        } else {
            let diffBetweenEndDateFromDatePickerAndLastClosingDateMoment = endDateMomentFromDatePicker.diff(employerLastClosingDateMoment, 'days');

            let remainder = (diffBetweenEndDateFromDatePickerAndLastClosingDateMoment % payPeriodNumeric);

            let daysBetweenNextEndPayPeriodAndEndDate = payPeriodNumeric - (remainder === 0 ? payPeriodNumeric : remainder);

            endDateMoment = moment(
                ezApi.ezclocker.ezDateTime.ezDateString(endDateMomentFromDatePicker))
                .add((payPeriodNumeric + daysBetweenNextEndPayPeriodAndEndDate), 'days');

            const nextPayPeriodStartDateMoment = moment(endDateMoment).subtract(payPeriodNumeric - 1, 'days');

            let startDate = ezApi.ezclocker.ezDateTime.ezDateString(nextPayPeriodStartDateMoment);

            ezApi.ezclocker.ezUi.ezSetInputValue('_quickFilterStartDate', startDate);
        }

        ezApi.ezclocker.ezUi.ezId('_quickFilterEndDate')
            .datepicker(
                'option',
                'minDate',
                ezApi.ezclocker.ezDateTime.ezDateString(
                    moment(ezApi.ezclocker.ezUi.ezGetInputValue('_quickFilterStartDate'))));

        ezApi.ezclocker.ezUi.ezId('_quickFilterEndDate')
            .datepicker(
                'option',
                'maxDate',
                ezApi.ezclocker.ezDateTime.ezDateString(
                    moment(ezApi.ezclocker.ezDateTime.ezDateString(endDateMoment)).add(30, 'days')));

        ezApi.ezclocker.ezUi.ezSetInputValue(
            '_quickFilterEndDate',
            ezApi.ezclocker.ezDateTime.ezDateString(endDateMoment));

        return EzEmployeeDisplayController.ezInstance.ezFilterDashboard()
            .then(EzPromise.ignoreResolve);

    }

    /**
     * @public @method`
     * Renders the Previous Pay-Period
     */
    renderPreviousPayPeriod() {
        const employerOptions = ezApi.ezclocker.ezClockerContext.ezGetActiveEmployer().options;

        const payPeriod = employerOptions.SELECTED_PAY_PERIOD || 'NONE';

        const yesterdayDayMoment = moment()
            .subtract(1, 'days')
            .tz(ezApi.ezclocker.ezDateTime.activeTimeZone)
            .startOf('day');

        const yesterdayDateString = yesterdayDayMoment.format('YYYY-MM-DD');

        const employerlastClosingDate = employerOptions['PAY_PERIOD_LAST_CLOSING_DATE'] || yesterdayDateString;

        const employerLastClosingDateMoment = ezApi.ezclocker.ezDateTime.ezSetMomentStartOfDay(
            moment(employerlastClosingDate));

        let payPeriodNumeric = EzPayPeriod[payPeriod];

        let startDateMomentFromDatePicker = ezApi.ezclocker.ezDateTime.ezDateFromDatePicker('_quickFilterStartDate');

        let endDateMoment;

        if (payPeriodNumeric === 30) {
            const startDateMoment = moment(
                ezApi.ezclocker.ezDateTime.ezDateString(startDateMomentFromDatePicker))
                .subtract(1, 'month');

            endDateMoment = moment(
                ezApi.ezclocker.ezDateTime.ezDateString(
                    startDateMoment
                        .endOf('month')
                        .startOf('day')));

            ezApi.ezclocker.ezUi.ezSetInputValue(
                '_quickFilterStartDate',
                ezApi.ezclocker.ezDateTime.ezDateString(
                    startDateMoment
                        .startOf('month')
                        .startOf('day')));
        } else {
            let firstStartDateMomentAfterLastClosingDate = moment(employerLastClosingDateMoment)
                .add(1, 'days');

            let diffBetweenStartDateFromDatePickerAndFirstStartDateMoment = startDateMomentFromDatePicker.diff(
                firstStartDateMomentAfterLastClosingDate,
                'days');

            let periodBetweenLastPayPeriodAndStartDate = diffBetweenStartDateFromDatePickerAndFirstStartDateMoment % payPeriodNumeric;

            const previousPayPeriodStartDateMoment = moment(
                ezApi.ezclocker.ezDateTime.ezDateString(startDateMomentFromDatePicker))
                .subtract(payPeriodNumeric + periodBetweenLastPayPeriodAndStartDate, 'days');

            let startDate = ezApi.ezclocker.ezDateTime.ezDateString(previousPayPeriodStartDateMoment);

            ezApi.ezclocker.ezUi.ezSetInputValue(
                '_quickFilterStartDate',
                startDate);

            endDateMoment = moment(previousPayPeriodStartDateMoment)
                .add(payPeriodNumeric - 1, 'days');
        }

        ezApi.ezclocker.ezUi.ezId('_quickFilterEndDate')
            .datepicker(
                'option',
                'minDate',
                ezApi.ezclocker.ezDateTime.ezDateString(
                    moment(
                        ezApi.ezclocker.ezUi.ezGetInputValue('_quickFilterStartDate'))));

        ezApi.ezclocker.ezUi.ezId('_quickFilterEndDate')
            .datepicker(
                'option',
                'maxDate',
                ezApi.ezclocker.ezDateTime.ezDateString(
                    moment(
                        ezApi.ezclocker.ezDateTime.ezDateString(endDateMoment))
                        .add(30, 'days')));

        ezApi.ezclocker.ezUi.ezSetInputValue(
            '_quickFilterEndDate',
            ezApi.ezclocker.ezDateTime.ezDateString(endDateMoment));

        return EzEmployeeDisplayController.ezInstance.ezFilterDashboard()
            .then(EzPromise.ignoreResolve);
    }

    /**
     * @public @method
     * Renders the employee information. Uses the active employee if an employee is not provided
     * @param {object} employeeInfo {
     *     employee: {employee object},
     *     activeClockIn: {active time entry object}
     * }
     * @returns {Promise.resolve}
     */
    ezRenderEmployeeUI(employeeInfo) {
        return EzPromise.asyncAction(
            (finished) => ezApi.ezclocker.ezUi.ezPageWaitExecute(
                'Loading dashboard ... ',
                (waitDone) => EzEmployeeDisplayController.ezInstance.ezResetMainContentContainer()
                    .then(
                        () => {
                            if (!EzObject.isValid(employeeInfo) || !EzObject.isValid(employeeInfo.employee) || EzBoolean.isFalse(employeeInfo.employee.ready)) {

                                EzEmployeeDisplayController.ezInstance.ezShowClosedEmployeeUx();

                                return waitDone().then(finished);
                            }

                            EzEmployeeDisplayController.ezInstance.ezHideClosedEmployeeUx();

                            EzEmployeeDisplayController.ezInstance.ezBuildEmployeeDisplayHtml();

                            return EzEmployeeDisplayController.ezInstance.ezFilterDashboard()
                                .then(EzEmployeeDisplayController.ezInstance.ezHookEmployeeMenuButtonEvents)
                                .then(
                                    () => EzEmployeeDisplayController.ezInstance.ezUpdateClockInOutStatus(false)
                                        .then(EzEmployeeDisplayController.ezInstance.ezEnableEmployeeActions)
                                        .then(waitDone)
                                        .then(finished));
                        })));
    }


    /**
     * @public @method
     * Updates the employee Ux with the current active employee without changing the QuckFilter values
     */
    ezUpdateActiveEmployeeUx(employeeInfo) {
        return EzPromise.asyncAction(
            (finished) => {
                if (!EzObject.isValid(employeeInfo) || !EzObject.isValid(employeeInfo.employee) || EzBoolean.isFalse(employeeInfo.employee.ready)) {

                    EzEmployeeDisplayController.ezInstance.ezShowClosedEmployeeUx();

                    return finished();
                }

                EzEmployeeDisplayController.ezInstance.ezHideClosedEmployeeUx();

                EzEmployeeDisplayController.ezInstance.ezRefreshActiveEmployeeUX();

                return EzEmployeeDisplayController.ezInstance.ezFilterDashboard()
                    .then(
                        () => EzEmployeeDisplayController.ezInstance.ezUpdateClockInOutStatus(false)
                            .then(EzEmployeeDisplayController.ezInstance.ezEnableEmployeeActions)
                            .then(finished));
            });
    }

    /**
     * @public @method
     * Shows the closed employee UX
     */
    ezShowClosedEmployeeUx() {
        EzUx.hide('EzPageViewSelectedEmployeeHeader');

        EzUx.hide('EzEmployerDashboardPage');

        EzUx.show('EzNoEmployeeSelected');
    }

    /**
     * @public @method
     * Hides the Closed Employee UX
     */
    ezHideClosedEmployeeUx() {
        EzUx.show('EzPageViewSelectedEmployeeHeader');

        EzUx.show('EzEmployerDashboardPage');

        EzUx.hide('EzNoEmployeeSelected');
    }

    /**
     * @public @method
     * Updated the active employee UX with the latest available data.
     */
    ezRefreshActiveEmployeeUX() {
        let updatedActiveEmployee = ezApi.ezclocker.ezClockerContext.ezGetActiveEmployee();

        if (!EzObject.isValid(updatedActiveEmployee)) {
            // No active employee to update information for
            return;
        }

        EzEmployeeDisplayController.ezInstance.ezUpdateInviteEmployeeButton();

        EzEmployeeDisplayController.ezInstance.ezSetEmployeeImage(updatedActiveEmployee.id);

        let updatedEmployeeName = EzString.stringOrEmpty(updatedActiveEmployee.employeeName);

        EzEmployeeDisplayController.ezInstance.ezSetEmployeeSelectDisplayName(
            updatedActiveEmployee.id,
            updatedEmployeeName);

        EzEmployeeDisplayController.ezInstance.ezSetEmployeeHeaderNameValues(
            updatedActiveEmployee.id,
            updatedEmployeeName);

        EzEmployeeDisplayController.ezInstance.ezSetEmployeeMenuButtonCaptions(
            updatedActiveEmployee.id,
            updatedEmployeeName);

        EzEmployeeDisplayController.ezInstance.ezSetEmployeeEmailLink(updatedActiveEmployee.employeeContactEmail);

        ezApi.ezclocker.ezUi.ezSetContent(
            'EzEmployeeInfoEmployeUsernameCell',
            EzString.EMPTY);

        return ezApi.ezclocker.ezClockerContext.ezGetActiveEmployeeUserInfo()
            .then(
                (response) => {
                    let activeEmployeeUserInfo = response.entity;

                    if (EzObject.isValid(activeEmployeeUserInfo) && -1 === activeEmployeeUserInfo.username.indexOf('@')) {
                        ezApi.ezclocker.ezUi.ezSetContent(
                            'EzEmployeeInfoEmployeUsernameCell',
                            EzBoolean.isTrue(ezApi.ezclocker.ezUrlHelper.ezShowIds)
                                ? EzHtml.build`
                                    User Name: ${activeEmployeeUserInfo.username}
                                    <span
                                        id="EzShowIds_ActiveEmployee_UserIdSpan"
                                        class="ezContainer-showids">
                                        (${activeEmployeeUserInfo.id})
                                    </span>`
                                : activeEmployeeUserInfo.username);
                    }
                });
    }
}
