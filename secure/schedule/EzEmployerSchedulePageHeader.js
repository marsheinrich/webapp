import {
    EzObject,
    EzBoolean,
    EzPromise,
    EzHtml
} from '/ezlibrary/helpers/EzHelpers.js';
import {
    EzRegistrationState,
    EzElementEventName,
    EzAccountNavButtonActiveOption,
    EzClockerContextEventName
} from '/ezlibrary/enums/EzEnumerations.js';
import { EzClass } from '/ezlibrary/EzClass.js';

import { EzUI } from '/public/javascript/common/ezui.js';
import { EzHelp } from '/secure/widgets/EzHelp/EzHelp.js';
import { EzAccountNavButton } from '/secure/widgets/EzAccountNavButton/EzAccountNavButton.js';

import { EzScheduleViewDataHelper } from '/secure/schedule/EzScheduleViewDataHelper.js';

/**
 * @class
 * @extends {EzClass}
 * @description
 * Controls the Employer schedule view's page header UX
 * ---------------------------------------------------------------------
 * Import with:
 *     import { EzEmployerSchedulePageHeader } from '/secure/schedule/EzEmployerSchedulePageHeader.js';
 * ---------------------------------------------------------------------
 * Ready Check:
 *     globalThis.ezApi.ezclocker[EzEmployerSchedulePageHeader.ezApiName] &&
 *     globalThis.ezApi.ezclocker[EzEmployerSchedulePageHeader.ezApiName].ready
 * ---------------------------------------------------------------------
 * Listen for Ready Event:
 *     document.addEventListener(
 *         EzEmployerSchedulePageHeader.ezEventNames.onReady,
 *         this.#ezRegistrator);
 * ---------------------------------------------------------------------
 * Static references:
 *     Inside this class...: EzSubscribeToPlanDialog.ezInstance
 *     Outside this class..: ezApi.ezclocker.ezSubscribeToPlanDialog
 * ---------------------------------------------------------------------
 */
export class EzEmployerSchedulePageHeader extends EzClass {
    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    // Class Static Section (non-initialization related)
    //  * Static fields (public, private, protected)
    //  * Static getter/setter methods  (public, private, protected)
    //  * Static methods  (public, private, protected)
    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

    /**
     * @static
     * @public @readonly @property
     * Returns an object with categories with key=value pairs to use as a constant value
     * for the id of commonly manipulated HTML elements.
     * @returns {object}
     */
    static get ezIds() {
        return {
            ezScheduleViewMainUx: {
                ezPageHeaderId: 'pageHeader',
                headerLayoutContainerId: 'EzScheduleView_HeaderLayoutContainer'
            },
            ezSelectWeekUx: {
                layoutContainerId: 'EzScheduleSelectWeek_Container',
                headerLabelId: 'EzScheduleSelectWeek_HeaderLabel',
                inputContainerId: 'EzScheduleSelectWeekInputLayoutContainer',
                inputLabelId: 'EzScheduleSelectWeekLabel',
                navigatePreviousWeekButtonId: '_navigatePreviousWeek',
                selectedWeekDateInputId: 'scheduleWeek',
                navigateNextWeekButtonId: '_navigateNextWeek'
            },
            ezManageLocationsUx: {
                buttonContainerId: 'EzScheduleView_ManageLocations_ButtonContainerId',
                manageLocationsButtonId: 'showLocationSlide',
            },
            ezExportSchedulesUx: {
                featureToggleContainerId: 'EzfExportScheduleFeatureContainer',
                buttonContainerId: 'EzScheduleView_ExportSchedule_ButtonContainerId',
                exportScheduleButtonId: '_EzExportScheduleButton',
            },
            ezPublishScheduleUx: {
                featureToggleContainerId: 'EzfPublishSchedule',
                publishScheduleMenuButtonId: 'EzSubscriptionView_PublishSchedule_MenuButton',
                publishScheduleMenuButtonSelectToPublishMenuItemId: 'EzSubscriptionView_PublishSchedule_MenuButton_SelectToPublish_MenuItemId',
                publishScheduleMenuButtonSelectedWeekMenuItemId: 'EzSubscriptionView_PublishSchedule_MenuButton_SelectedWeek_MenuItemId',
                publishScheduleMenuButtonAllSchedulesMenuItemId: 'EzSubscriptionView_PublishSchedule_MenuButton_AllSchedules_MenuItemId',
            },
            ezTotalScheduleHoursUx: {
                containerId: 'EzSubscriptionView_TotalScheduleHours_ContainerId',
                layoutContainerId: 'EzSubscriptionView_TotalScheduleHours_LayoutContainerId',
                totalScheduleHoursContainerId: '_TotalScheduledHours'
            }
        };
    }

    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    // Class Fields and Properties Section
    //  * Class fields (non-static, private, public, or protected)
    //  * Class getter/setter methods (non-static, private, public, or protected)
    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~


    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    // Class Methods Section
    //  * Methods (non-static, private, public, or protected)
    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

    /**
     * @public @method
     * Initializes EzEmployerSchedulePageHeader
     * @returns {EzEmployerSchedulePageHeader}
     */
    ezInit() {
        EzEmployerSchedulePageHeader.ezInstance.ezInitUX();

        return EzEmployerSchedulePageHeader.ezInstance;
    }

    /**
     * @protected @method
     * Initializes EzEmployerSchedulePageHeader UX
     */
    ezInitUX() {
        ezApi.ezclocker.ezUi.ezSetContent(
            EzEmployerSchedulePageHeader.ezIds.ezScheduleViewMainUx.ezPageHeaderId,
            EzEmployerSchedulePageHeader.ezInstance.ezBuildScheduleHeaderHtml());

        ezApi.ezclocker.ezEventEngine.ezWantEvent(
            EzClockerContextEventName.onUserContextReady,
            EzEmployerSchedulePageHeader.ezApiName,
            () => ezApi.ezclocker.ezHelp.ezEnableHelp('EzShowHelpButton')
                .then(
                    () => {
                        ezApi.ezclocker.ezAccountNavButton.ezActiveOptionValue = EzAccountNavButtonActiveOption.ACCOUNT_OPTION;

                        ezApi.ezclocker.ezAccountNavButton.ezInitUX();
                    },
                    EzPromise.ignoreReject));

        // Schedule navigation buttons
        ezApi.ezclocker.ezEventEngine.ezWantElementEvent(
            EzEmployerSchedulePageHeader.ezIds.ezSelectWeekUx.navigatePreviousWeekButtonId,
            EzElementEventName.CLICK,
            EzEmployerSchedulePageHeader.ezApiName,
            EzEmployerSchedulePageHeader.ezInstance.ezNavigatePreviousWeek);

        ezApi.ezclocker.ezEventEngine.ezWantElementEvent(
            EzEmployerSchedulePageHeader.ezIds.ezSelectWeekUx.navigateNextWeekButtonId,
            EzElementEventName.CLICK,
            EzEmployerSchedulePageHeader.ezApiName,
            EzEmployerSchedulePageHeader.ezInstance.ezNavigateNextWeek);

        ezApi.ezclocker.ezDateTime.ezSetDatePickerValue(
            EzEmployerSchedulePageHeader.ezIds.ezSelectWeekUx.selectedWeekDateInputId,
            ezApi.ezclocker.ezScheduleViewDataHelper.ezScheduleSelectedMomentInWeek);

        ezApi.ezclocker.ezEventEngine.ezWantEvent(
            EzScheduleViewDataHelper.ezEventNames.onScheduleSelectedMomentInWeekChanged,
            EzEmployerSchedulePageHeader.ezApiName,
            EzEmployerSchedulePageHeader.ezInstance.ezHandleOnScheduleSelectedMomentInWeekChanged);

        // Select week date picker
        ezApi.ezclocker.ezDateTime.ezInitDateTimePicker(
            EzEmployerSchedulePageHeader.ezIds.ezSelectWeekUx.selectedWeekDateInputId,
            {
                onSelect: EzEmployerSchedulePageHeader.ezInstance.ezProcessSelectedWeekDateInputOnSelectBlurCloseEvents,
                onBlur: EzEmployerSchedulePageHeader.ezInstance.ezProcessSelectedWeekDateInputOnSelectBlurCloseEvents,
                onClose: EzEmployerSchedulePageHeader.ezInstance.ezProcessSelectedWeekDateInputOnSelectBlurCloseEvents
            });

        // Select to publish button
        ezApi.ezclocker.ezUi.ezSetInputValue(
            EzEmployerSchedulePageHeader.ezIds.ezPublishScheduleUx.publishScheduleMenuButtonId,
            'default');

        ezApi.ezclocker.ezEventEngine.ezWantElementEvent(
            EzEmployerSchedulePageHeader.ezIds.ezPublishScheduleUx.publishScheduleMenuButtonId,
            EzElementEventName.CHANGE,
            EzEmployerSchedulePageHeader.ezApiName,
            EzEmployerSchedulePageHeader.ezInstance.ezHandlePublishScheduleMenutButtonChange);
    }

    /**
     * @public @method
     * Prompt to publish schedules before navigating
     */
    ezPublishBeforeNavigation() {
        if (EzBoolean.isFalse(ezApi.ezclocker.ezEmployerScheduleController.ezPublishSchedulesPending)) {
            return EzPromise.finished();
        }

        return ezApi.ezclocker.ezDialog.ezShowYesNo(
            'Publish Schedule',
            'Do you want to publish before you navigate?')
            .then(
                (dialogResult) => ezApi.ezclocker.ezDialog.NO_DIALOG_RESPONSE.dialogStatus !== dialogResult.dialogStatus
                    ? ezApi.ezclocker.ezScheduleViewDataHelper.ezPublishSchedulesForWeek(true)
                        .then(EzPromise.finished())
                    : EzPromise.finished());
    }

    /**
     * @public @method
     * Navigates to the next week
     */
    ezNavigateNextWeek() {
        ezApi.ezclocker.ezEmployerSchedulePageHeader.ezPublishBeforeNavigation()
            .then(
                () => ezApi.ezclocker.ezScheduleViewDataHelper.ezScheduleSelectedMomentInWeek = ezApi.ezclocker.ezDateTime.ezPlusDays(
                    ezApi.ezclocker.ezScheduleViewDataHelper.ezScheduleSelectedMomentInWeek,
                    7));
    }

    /**
     * @public @method
     * Navigates to the previous week
     */
    ezNavigatePreviousWeek() {
        ezApi.ezclocker.ezEmployerSchedulePageHeader.ezPublishBeforeNavigation()
            .then(
                () => ezApi.ezclocker.ezScheduleViewDataHelper.ezScheduleSelectedMomentInWeek = ezApi.ezclocker.ezDateTime.ezMinusDays(
                    ezApi.ezclocker.ezScheduleViewDataHelper.ezScheduleSelectedMomentInWeek,
                    7));
    }

    /**
     * @protected @method
     * Builds the main HTML content for the EzEmployerSchedulePageHeader UX
     * @returns {string}
     * Returns HTML for the main content UX.
     */
    ezBuildScheduleHeaderHtml() {
        return EzHtml.build`
            <div
                id="${EzEmployerSchedulePageHeader.ezIds.ezScheduleViewMainUx.headerLayoutContainerId}"
                class="ezAutoCol_83xA ezGrid-vertical-align-bottom ezGrid-align-space-between">
                <div
                    id="${EzEmployerSchedulePageHeader.ezIds.ezSelectWeekUx.layoutContainerId}"
                    class="ezAutoCol_AxAxAxA ezGrid-col-gap_8 ezGrid-align-left ezGrid-vertical-align-bottom">
                    <div
                        id="EzScheduleView_SelectWeek_LayoutContainer"
                        class="ezAutoRow_AxA ezGrid-align-left ezGrid-vertical-align-top">
                        <label
                            id="${EzEmployerSchedulePageHeader.ezIds.ezSelectWeekUx.inputLabelId}"
                            for="${EzEmployerSchedulePageHeader.ezIds.ezSelectWeekUx.selectedWeekDateInputId}">
                            <h1
                                id="${EzEmployerSchedulePageHeader.ezIds.ezSelectWeekUx.headerLabelId}"
                                class="ezHeader1">
                                Select Week
                            </h1>
                        </label>
                        <div
                            id="${EzEmployerSchedulePageHeader.ezIds.ezSelectWeekUx.inputContainerId}"
                            class="ezAutoCol_AxAxA ezGrid-col-gap_8 ezGrid-align-left ezGrid-vertical-align-middle">
                            <button
                                id="${EzEmployerSchedulePageHeader.ezIds.ezSelectWeekUx.navigatePreviousWeekButtonId}"
                                class="ezMajorButton">
                                &lt;
                            </button>
                            <input
                                id="${EzEmployerSchedulePageHeader.ezIds.ezSelectWeekUx.selectedWeekDateInputId}"
                                type="text"
                                class="largerDatePicker" />
                            <button
                                id="${EzEmployerSchedulePageHeader.ezIds.ezSelectWeekUx.navigateNextWeekButtonId}"
                                class="ezMajorButton">
                                &gt;
                            </button>
                        </div>
                    </div>
                    <div
                        id="${EzEmployerSchedulePageHeader.ezIds.ezManageLocationsUx.buttonContainerId}"
                        class="ezGrid-vertical-align-bottom">
                        <button
                            id="${EzEmployerSchedulePageHeader.ezIds.ezManageLocationsUx.manageLocationsButtonId}"
                            class="ezMajorButton">
                            Manage Locations...
                        </button>
                    </div>
                    <div
                        id="${EzEmployerSchedulePageHeader.ezIds.ezExportSchedulesUx.buttonContainerId}"
                        class="ezGrid-vertical-align-bottom">
                        <div
                            id="${EzEmployerSchedulePageHeader.ezIds.ezExportSchedulesUx.featureToggleContainerId}"
                            class="ezFeatureContainer"
                            data-feature-id="ezfExportSchedule"
                            style="display:none">
                            <button
                                id="${EzEmployerSchedulePageHeader.ezIds.ezExportSchedulesUx.exportScheduleButtonId}"
                                class="ezMajorButton">
                                Export schedule...
                            </button>
                        </div>
                    </div>
                    <div
                        id="EzScheduleView_PublishSchedule_LayoutContainer"
                        class="ezGrid-vertical-align-bottom">
                        <div
                            id="${EzEmployerSchedulePageHeader.ezIds.ezPublishScheduleUx.featureToggleContainerId}"
                            class="ezFeatureContainer"
                            data-feature-id="ezfPublishSchedule"
                            style="display:none">
                            <select
                                id="${EzEmployerSchedulePageHeader.ezIds.ezPublishScheduleUx.publishScheduleMenuButtonId}"
                                class="ezSelectButton-default-ezClockerOrange"
                                name="publishSchedule">
                                <option
                                    id="${EzEmployerSchedulePageHeader.ezIds.ezPublishScheduleUx.publishScheduleMenuButtonSelectToPublishMenuItemId}"
                                    class="ezSelectButton-option-title"
                                    value="default"
                                    disabled
                                    selected>
                                    Select to publish
                                </option>
                                <option
                                    id="${EzEmployerSchedulePageHeader.ezIds.ezPublishScheduleUx.publishScheduleMenuButtonSelectedWeekMenuItemId}"
                                    class="ezSelectButton-option"
                                    value="publishCurrent">
                                    Selected Week
                                </option>
                                <option
                                    id="${EzEmployerSchedulePageHeader.ezIds.ezPublishScheduleUx.publishScheduleMenuButtonAllSchedulesMenuItemId}"
                                    class="ezSelectButton-option"
                                    value="publishAll">
                                    All Schedules
                                </option>
                            </select>
                        </div>
                    </div>
                </div>
                <div
                    id="${EzEmployerSchedulePageHeader.ezIds.ezTotalScheduleHoursUx.containerId}">
                    <div
                        id="${EzEmployerSchedulePageHeader.ezIds.ezTotalScheduleHoursUx.layoutContainerId}"
                        class="totalScheduleHoursContainer">
                        Period Scheduled Hours
                        <div
                            id="${EzEmployerSchedulePageHeader.ezIds.ezTotalScheduleHoursUx.totalScheduleHoursContainerId}"
                            class="totalScheduleHours">
                            00:00
                        </div>
                    </div>
                </div>
            </div>`;
    }

    /**
     * @protected @method
     * Handles the EzEmployerSchedulePageHeader.ezIds.ezPublishScheduleUx.publishScheduleMenuButtonId's
     * CHANGE event.
     * @param {object} ezEvent
     */
    ezHandlePublishScheduleMenutButtonChange(ezEvent) {
        return 'publishAll' === ezApi.ezclocker.ezUi.ezGetInputValue(ezEvent.data.elementId)
            ? ezApi.ezclocker.ezScheduleViewDataHelper.ezPublishAllSchedules()
            : ezApi.ezclocker.ezScheduleViewDataHelper.ezPublishSchedulesForWeek();
    }

    /**
     * @protected @method
     * Handles the EzScheduleViewDataHelper.ezEventNames.OnScheduleSelectedMomentInWeekChanged event
     */
    ezHandleOnScheduleSelectedMomentInWeekChanged() {
        let selectedMomentInDatePickerIsoDate = ezApi.ezclocker.ezDateTime.ezToIsoDate(
            ezApi.ezclocker.ezDateTime.ezDateTimeFromDatePickerWithTimeAtStartOfDay(
                EzEmployerSchedulePageHeader.ezIds.ezSelectWeekUx.selectedWeekDateInputId));

        if (selectedMomentInDatePickerIsoDate !== ezApi.ezclocker.ezDateTime.ezToIsoDate(
            ezApi.ezclocker.ezScheduleViewDataHelper.ezScheduleSelectedMomentInWeek)) {
            ezApi.ezclocker.ezDateTime.ezSetDatePickerDateWithTimeAtStartOfDay(
                EzEmployerSchedulePageHeader.ezIds.ezSelectWeekUx.selectedWeekDateInputId,
                ezApi.ezclocker.ezScheduleViewDataHelper.ezScheduleSelectedMomentInWeek);
        }
    }

    /**
     * @protected @method
     * Handles the selectedWeekDateInput's onSelect, onBlur, onClose events
     * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
     * For more information relating to JQuery datepicker see:
     * --> API documentation: https://api.jqueryui.com/datepicker/
     * --> Info for onSelect event: https://api.jqueryui.com/datepicker/#option-onSelect
     * --> Info for onClose Event: https://api.jqueryui.com/datepicker/#option-onClose
     * --> Info for onChangeMonthYear Event: https://api.jqueryui.com/datepicker/#option-onChangeMonthYear
     * @param {string} dateText
     * @param {object} inst
     */
    ezProcessSelectedWeekDateInputOnSelectBlurCloseEvents() {
        ezApi.ezclocker.ezUi.ezDisableElement(
            EzEmployerSchedulePageHeader.ezIds.ezSelectWeekUx.selectedWeekDateInputId);

        let selectedWeekDateTime = ezApi.ezclocker.ezDateTime.ezMomentFromDatePickerStartOfDay(
            EzEmployerSchedulePageHeader.ezIds.ezSelectWeekUx.selectedWeekDateInputId);

        if (ezApi.ezclocker.ezDateTime.ezToIsoDate(selectedWeekDateTime) !==
            ezApi.ezclocker.ezDateTime.ezToIsoDate(ezApi.ezclocker.ezScheduleViewDataHelper.ezScheduleSelectedMomentInWeek)) {
            ezApi.ezclocker.ezScheduleViewDataHelper.ezScheduleSelectedMomentInWeek = selectedWeekDateTime;
        }

        ezApi.ezclocker.ezUi.ezEnableElement(
            EzEmployerSchedulePageHeader.ezIds.ezSelectWeekUx.selectedWeekDateInputId);
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
        return 'ezEmployerSchedulePageHeader';
    }

    /**
     *  @static
     *  @public @readonly @property
     *  Returns an object of event names that this class may trigger.
     *  @returns {object}
     */
    static get ezEventNames() {
        return {
            onReady: 'ezOn_EzEmployerSchedulePageHeader_Ready'
        };
    }

    /**
     * @static
     * @private @field
     * Stores the singleton instance of this class that was created by and registerd with EzApi.
     * @type {EzEmployerSchedulePageHeader}
     */
    static #ezInstance = EzObject.hasProperty(globalThis, 'ezApi') &&
        EzObject.isValid(globalThis.ezApi) && EzBoolean.isTrue(globalThis.ezApi.ready) &&
        EzObject.isValid(globalThis.ezApi.ezclocker[EzEmployerSchedulePageHeader.ezApiName])
        ? globalThis.ezApi.ezclocker[EzEmployerSchedulePageHeader.ezApiName]
        : null;

    /**
     * @static
     * @public @property @getter
     * Returns the singleton instance of this class that is registered with EzApi (if available yet)
     * @returns {EzEmployerSchedulePageHeader}
     */
    static get ezInstance() {
        return EzEmployerSchedulePageHeader.#ezInstance;
    }

    /**
     * @static
     * @public @property @setter
     * Sets the singleton instance of of this class that is registered with EzApi.
     * @param {EzEmployerSchedulePageHeader} instance
     */
    static set ezInstance(instance) {
        if (null != EzEmployerSchedulePageHeader.#ezInstance) {
            throw new EzException('EzEmployerSchedulePageHeader\'s singleton instance is already reigstered with EzApi.');
        }

        EzEmployerSchedulePageHeader.#ezInstance = instance;
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
    static #ezApiRegistrationState = EzObject.hasProperty(globalThis, 'ezApi') &&
        EzObject.isValid(globalThis.ezApi) && EzBoolean.isTrue(globalThis.ezApi.ready) &&
        EzObject.isValid(globalThis.ezApi.ezclocker[EzEmployerSchedulePageHeader.ezApiName])
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
        return EzEmployerSchedulePageHeader.#ezApiRegistrationState;
    }

    /**
     * @static
     * @public @property @setter
     * Sets the ezApi registration state of this classes's singleton instance.
     * @param {string} ezApiRegistrationState
     * A valid enum property value from EzRegistrationState
     */
    static set ezApiRegistrationState(ezApiRegistrationState) {
        EzEmployerSchedulePageHeader.#ezApiRegistrationState = EzRegistrationState.ezValueOf(ezApiRegistrationState);
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
        return EzRegistrationState.PENDING === EzEmployerSchedulePageHeader.ezApiRegistrationState &&
            globalThis?.ezApi?.ready && globalThis.ezApi?.ezclocker &&
            globalThis.ezApi.ezclocker?.[EzUI.ezApiName]?.ready &&
            globalThis.ezApi.ezclocker?.[EzAccountNavButton.ezApiName]?.ready &&
            globalThis.ezApi.ezclocker?.[EzHelp.ezApiName]?.ready &&
            globalThis.ezApi.ezclocker?.[EzScheduleViewDataHelper.ezApiName]?.ready;
    }

    /**
     * @static
     * @private @readonly @property
     * Returns if this class's singleton instance is registered with ezApi yet.
     * @returns {boolean}
     */
    static get #ezIsRegistered() {
        return null != EzEmployerSchedulePageHeader.ezInstance &&
            EzRegistrationState.REGISTERED === EzEmployerSchedulePageHeader.ezApiRegistrationState;
    }

    /**
     * @static
     * @private @method
     * Attempts to register the singleton instance for this class with ezApi. Returns true
     * if successful, false otherwise.
     * @returns {boolean}
     */
    static #ezRegistrator() {
        if (EzEmployerSchedulePageHeader.#ezCanRegister && !EzEmployerSchedulePageHeader.#ezIsRegistered) {
            globalThis.ezApi.ezRegisterNewApi(EzEmployerSchedulePageHeader, EzEmployerSchedulePageHeader.ezApiName);
        }

        return EzEmployerSchedulePageHeader.#ezIsRegistered;
    }

    /**
     * @static
     * Static Initialization
     * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
     * >> IMPORTANT <<
     * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
     * Make sure the following properties and methods get defined BEFORE this static initialization section:
     *    1) Property getter EzEmployerSchedulePageHeader.ezApiName
     *    2) Property getter EzEmployerSchedulePageHeader.ezEventNames
     *    3) Property getter EzEmployerSchedulePageHeader.ezInstance
     *    4) Property setter EzEmployerSchedulePageHeader.ezInstance
     *    5) Property getter EzEmployerSchedulePageHeader.ezApiRegistrationState
     *    6) Property setter EzEmployerSchedulePageHeader.ezApiRegistrationState
     *    7) Property getter EzEmployerSchedulePageHeader.#ezCanRegister
     *    8) Property getter EzEmployerSchedulePageHeader.#ezIsRegistered
     *    9) Method EzEmployerSchedulePageHeader.#ezRegistrator()
     */
    static {
        if (!EzEmployerSchedulePageHeader.#ezIsRegistered) {
            EzEmployerSchedulePageHeader.ezApiRegistrationState = EzRegistrationState.PENDING;

            if (!EzEmployerSchedulePageHeader.#ezRegistrator()) {
                document.addEventListener(
                    EzEmployerSchedulePageHeader.ezOnEzApiReadyEventName,
                    EzEmployerSchedulePageHeader.#ezRegistrator);

                document.addEventListener(
                    EzUI.ezEventNames.onReady,
                    EzEmployerSchedulePageHeader.#ezRegistrator);

                document.addEventListener(
                    EzHelp.ezEventNames.onReady,
                    EzEmployerSchedulePageHeader.#ezRegistrator);

                document.addEventListener(
                    EzAccountNavButton.ezEventNames.onReady,
                    EzEmployerSchedulePageHeader.#ezRegistrator);

                document.addEventListener(
                    EzScheduleViewDataHelper.ezEventNames.onReady,
                    EzEmployerSchedulePageHeader.#ezRegistrator);
            }
        }
    }

    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    // NO CODE AFTER THIS SECTION
    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
}