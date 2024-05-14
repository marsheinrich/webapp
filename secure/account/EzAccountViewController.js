import {
    EzBadParamException
} from '/ezlibrary/exceptions/EzExceptions.js';

import {
    EzObject,
    EzBoolean,
    EzString,
    EzHtml,
    EzPromise
} from '/ezlibrary/helpers/EzHelpers.js';

import { EzClass } from '/ezlibrary/EzClass.js';

import { EzStateTracker } from '/ezlibrary/EzStateTracker.js';

import {
    EzRegistrationState,
    EzElementEventName,
    EzAccountNavButtonActiveOption,
    EzClockerContextEventName,
    EzSubscriptionPlanProvider
} from '/ezlibrary/enums/EzEnumerations.js';

import { EzEventEngine } from '/ezlibrary/ez-event-engine.js';

import { EzDateTime } from '/public/javascript/common/ez-date-time.js';

import { EzNavigation } from '/public/javascript/common/ezclocker-navigation-helper.js';

// TODO: Finish support for user roles in account page
// import { EzUserRoleFeatures } from '/ezlibrary/ez-user-role-features.js';

import { EzFeatureToggles } from '/ezlibrary/ez-feature-toggles2.js';

import { EzClockerContext } from '/ezlibrary/EzClockerContext/ez-context.js';

import { EzEmployerService } from '/secure/javascript/common/ezclocker-employer-services.js';
import { EzEmployeeService } from '/secure/javascript/services/ezclocker-employee-service.js';

import { EzLicenseHelper } from '/secure/javascript/common/ezclocker-license-helper.js';

import { EzUI } from '/public/javascript/common/ezui.js';

import { EzSpinner } from '/public/webcomponents/spinner/EzSpinner.js';

import { EzDialogResponseStatus } from '/ezlibrary/ux/dialogs/EzDialogResponseStatus.js';

import { EzDialog } from '/public/javascript/common/ezclocker-dialog-helper.js';

import { EzSubscriptionPlansView } from '/secure/account/EzSubscriptionPlansView.js';
import { EzSubscriptionInfoViewController } from '/secure/account/EzSubscriptionInfoViewController.js';
import { EzAccountSubscriptionActions } from '/secure/account/EzAccountSubscriptionActions';
import { EzSubscriptionDialog } from '/secure/widgets/EzSubscriptionDialog/EzSubscriptionDialog.js';
import { EzDeleteAccountWizard } from '/secure/widgets/EzDeleteAccountWizard/EzDeleteAccountWizard.js';
import { EzAccountPreferences } from '/secure/account/EzAccountPreferences.js';
import { EzAccountDebugTools } from '/secure/account/EzAccountDebugTools.js';

import { EzSendFeedbackDialog } from '/secure/components/EzSendFeedbackDialog/EzSendFeedbackDialog.js';

import { EzHelp } from '/secure/widgets/EzHelp/EzHelp.js';

import { EzChangeAccountPasswordDialog } from '/secure/widgets/EzChangeAccountPasswordDialog/EzChangeAccountPasswordDialog.js';
import { EzUpdateCompanyInfoDialog } from '/secure/widgets/EzUpdateCompanyInfoDialog/EzUpdateCompanyInfoDialog.js';
import { EzUpdateCreditCardDialog } from '/secure/widgets/EzUpdateCreditCardDialog/EzUpdateCreditCardDialog.js';
import { EzBillingAddressDialog } from '/secure/widgets/EzBillingAddressDialog/EzBillingAddressDialog.js';
import { EzEmployerLogoController } from '/secure/widgets/EzImageUpload/EzEmployerLogoController.js';
import { EzChangeUsernamePasswordDialog } from '/secure/widgets/EzChangeUsernamePasswordDialog/EzChangeUsernamePasswordDialog.js';
import { EzAccountNavButton } from '/secure/widgets/EzAccountNavButton/EzAccountNavButton.js';

/**
 * @class
 * @extends {EzClass}
 * @description
 * Account page view controller
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 * Import with:
 *     import { EzAccountViewController } from '/secure/account/EzAccountViewController.js';
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 * Check if singleton instance is ready:
 *     globalThis.globalThis.ezApi.ezclocker?.[EzAccountViewController.ezApiName]?.ready
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 * Listen to onReady event:
 *     document.addEventListener(
 *         EzAccountViewController.ezEventNames.onReady,
 *         {listening_class}.#ezRegistrator);
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 * Static references:
 *      From outside this class: globalThis.ezApi.ezclocker.ezAccountViewController
 *      From within this class: EzAccountViewController.ezInstance
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 */
export class EzAccountViewController extends EzClass {
    /**
     * @static
     * @public @readonly @property
     * Returns the generic credit card image url
     */
    static get GENERIC_CREDITCARD_IMG_URL() {
        return '/images/icons/generic-credit-card.svg';
    }

    #ezState = {
        ezAccountViewReadyState: null,
        accountPageMaxHeight: null
    };
    ezUpdateState(stateProp, statePropValue) {
        if (EzString.hasLength(stateProp)) {
            this.#ezState[stateProp] = statePropValue;
        }

        EzStateTracker.saveState(
            EzAccountViewController.ezApiName,
            this.ezState);
    }

    /**
     * @public @readonly @property
     * Returns an object of key/values for commonly used ids
     * @returns {object}
     */
    get ezIds() {
        return {
            containers: {
                pageHeaderContainerId: 'EzPageHeader_Container',
                pageHeaderEmployerNameContainerId: 'EzPageHeader_EmployerNameCell'
            },
            images: {
                pageHeaderEmployerLogoImageId: 'EzPageHeader_EmployerLogo',
                accountPageExampleEmployerLogo: 'EzAccountPage_ExampleEmployerLogo'
            },
            buttons: {
                changeEmployerAccountPasswordButtonId: 'EzChangeEmployerAccountPasswordButton',
                changeEmployerEmailButtonId: 'EzChangeEmployerEmailButton'
            }
        };
    }

    /**
     * @public @readonly @property
     * Gets
     * @returns {string}
     */
    get ezPageHeaderHTML() {
        return EzHtml.build`
            <div
                id="EzPageHeader_Container" class="ezHeader">
                <div
                    id="EzPageHeader_EmployerHeaderContainer"
                    class="ezHeader-employer-logo-container">
                    <div
                        id="EzPageHeader_LogoImgContainer"
                        class="ezHeader-logo-image-container">
                        <img
                            id="${EzAccountViewController.ezInstance.ezIds.images.pageHeaderEmployerLogoImageId}"
                            class="ezHeader-employer-logo"
                            alt=" "
                            src="/public/images/spinners/orange-spinner.gif" />
                    </div>
                    <div
                        id="${EzAccountViewController.ezInstance.ezIds.containers.pageHeaderEmployerNameContainerId}"
                        class="ezHeader-employer-name">
                        <img
                            id="EzLoadingEmployerNameSpinner"
                            src="/public/images/spinners/infinity-snake-spinner-orange.svg"
                            style="height:52px"/>
                    </div>
                </div>
                <div
                    id="EzPageViewHeader_NavigationButtons"
                    class="ezHeader-navigation-button-container">
                    <button
                        id="_NavDashboard"
                        class="headerButton">
                        Dashboard
                    </button>
                    <button
                        id="_NavSchedules"
                        class="headerButton">
                        Schedules
                    </button>
                    <button
                        id="_NavEmployeeArchive"
                        class="headerButton">
                        Employee Archive
                    </button>
                    <button
                        id="EzShowHelpButton"
                        class="ezHeaderButton">
                        Help
                    </button>
                    <button
                        id="_NavSignout"
                        class="headerButton">
                        Sign Out
                    </button>
                </div>
            </div>`;
    }

    /**
     * @public @readonly @property
     * Gets
     * @returns {string}
     */
    get ezAccountToolbarContainerHtml() {
        return EzHtml.build`
            <div
                id="EzAccountToolbarContainer"
                class="ezContentView">
                <div
                    class="accountButtonContainer"
                    data-user-role-feature-id="EZROLE_FEATURE_ACCOUNT_TOOLS">
                    <button
                        id="${EzAccountViewController.ezInstance.ezIds.buttons.changeEmployerEmailButtonId}"
                        class="majorButton"
                        title="Change your employer account email address"
                        data-user-role-feature-id="EZROLE_FEATURE_ACCOUNT_CHANGE_EMPLOYER_EMAIL">
                        Change Account E-Mail Address...
                    </button>
                    <button
                        id="${EzAccountViewController.ezInstance.ezIds.buttons.changeEmployerAccountPasswordButtonId}"
                        class="majorButton"
                        title="Change your employer account password"
                        data-user-role-feature-id="EZROLE_FEATURE_ACCOUNT_CHANGE_EMPLOYER_PASSWORD">
                        Change Account Password...
                    </button>
                    <button
                        id="${EzSubscriptionInfoViewController.ezInstance.ezIds.buttons.ezCancelSubscriptionButtonId}"
                        class="deleteMajorButton"
                        title="Cancel your subscription"
                        data-user-role-feature-id="EZROLE_FEATURE_ACCOUNT_SUBSCRIPTION_EDITING">
                        Cancel Subscription
                    </button>
                    <button
                        id="${EzSubscriptionInfoViewController.ezInstance.ezIds.buttons.ezDeleteAccountButtonId}"
                        class="deleteMajorButton"
                        title="Delete your employer account"
                        data-user-role-feature-id="EZROLE_FEATURE_ACCOUNT_DELETE_ACCOUNT">
                        Delete Account
                    </button>
                </div>
            </div>`;
    }

    /**
     * @public @readonly @property
     * Gets
     * @returns {string}
     */
    get ezAccountPreferencesHtml() {
        return EzHtml.build`
            <div
                id="_PreferemcesInformationContainer"
                class="marginTop10">
                <div
                    class="ezContainer-title-box-ezClockerNavy-pad-8 ezAutoCol_AxA ezGrid-vertical-align-middle ezGrid-align-space-between">
                    <div
                        id="EzPreferemcesInformationContainer_Title"
                        class="ezAutoCol_A ezGrid-vertical-align-middle ezGrid-align-left">
                        Account Preferences
                    </div>
                    <div
                        id="EzPreferemcesInformationContainer_TitleActionBar">
                        <button
                            id="EzSavePreferencesOptions"
                            title="Save Employer Options"
                            class="majorButton">
                            Save Preferences
                        </button>
                    </div>
                </div>
                <table
                    id="_PreferencesInformation"
                    class="basicDataTable">
                    <tr>
                        <!-- Pay Period Options -->
                        <td
                            class="basicDataTableCell accountPreferencesCell">
                            <div
                                class="ezContainer_categorybox-navy">
                                Pay Period Options
                            </div>
                            <div
                                id="EzOptions_PayPeriodOptions_Container"
                                class="ezContainer_CategoryContent" style="display: flex;justify-content: space-between;">
                                <div style="width: 45%">
                                    <div
                                        id="EzOptions_PayPeriodOptions_Title"
                                        class="ezOptionLabel">
                                        Pay Period
                                    </div>
                                    <select
                                        id="options_pay_period_select_id"
                                        class="ezFullWidthEditor">
                                        <option
                                            value="NONE">
                                            NONE
                                        </option>
                                        <option
                                            value="WEEKLY">
                                            Weekly
                                        </option>
                                        <option
                                            value="BIWEEKLY">
                                            Bi-Weekly
                                        </option>
                                        <option
                                            value="MONTHLY">
                                            Monthly
                                        </option>
                                    </select>
                                </div>
                                <!-- Option: Last Closing Date -->
                                <div style="width: 45%" id="options_pay_period_last_closing_date_section_id">
                                    <div
                                        id="EzOptions_PayPeriodOptions_LastClosingDate_Title"
                                        class="ezOptionLabel">
                                        Last Closing Date
                                    </div>
                                    <input style="width: 60%; margin: 4px 4px 4px 0;" type="date" id="options_pay_period_last_closing_date_id" name="pay_period_last_closing_date" value=""></input>
                                </div>
                            </div>
                            <div
                                class="ezContainer_categorybox-navy">
                                Schedule Options
                            </div>
                            <div
                                id="EzOptions_ScheduleOptions_Container"
                                class="ezContainer_CategoryContent">
                                <!-- Option: Schedule Start Day -->
                                <div
                                    id="EzOptions_ScheduleOptions_ScheduleStart_Title"
                                    class="ezOptionLabel">
                                    Start Day
                                </div>
                                <select
                                    id="options_schedule_day"
                                    class="ezFullWidthEditor">
                                    <option
                                        value="0">
                                        Sunday
                                    </option>
                                    <option
                                        value="1">
                                        Monday
                                    </option>
                                    <option
                                        value="2">
                                        Tuesday
                                    </option>
                                    <option
                                        value="3">
                                        Wednesday
                                    </option>
                                    <option
                                        value="4">
                                        Thursday
                                    </option>
                                    <option
                                        value="5">
                                        Friday
                                    </option>
                                    <option
                                        value="6">
                                        Saturday
                                    </option>
                                </select>
                            </div>
                            <div
                                id="EzOptions_PayPeriodOptions_ScheduleStart_InfoContainer"
                                class="ezContainer-editor-info-box">
                                Indicates which day appears first on the Schedules page.
                                Does not affect pay periods.
                            </div>
                            <div
                                class="ezContainer_categorybox-navy">
                                Schedule Options
                            </div>
                            <!-- Allow employee to see coworker schedules -->
                            <div
                                id="EzfEZOPTION_ALLOW_EMPLOYEES_TO_SEE_COWORKER_SCHEDULESFeatureContainer"
                                data-feature-id="ezfEZOPTION_ALLOW_EMPLOYEES_TO_SEE_COWORKER_SCHEDULES"
                                class="ezFeatureContainer"
                                style="display:none">
                                <div
                                    class="ezContainer_CategoryContent">
                                    <input
                                        id="EZOPTION_ALLOW_EMPLOYEES_TO_SEE_COWORKER_SCHEDULES"
                                        type="checkbox" />
                                    <label
                                        id="EZOPTION_ALLOW_EMPLOYEES_TO_SEE_COWORKER_SCHEDULESLabel"
                                        for="EZOPTION_ALLOW_EMPLOYEES_TO_SEE_COWORKER_SCHEDULES"
                                        class="ezLabel">
                                        Allow employees to see coworkers' schedules.
                                    </label>
                                </div>
                            </div>
                            <!-- Employer Options -->
                            <div
                                class="ezContainer_categorybox-navy">
                                Employer Options
                            </div>
                            <!-- Enable Push Notification Option -->
                            <div
                                class="ezContainer_CategoryContent">
                                <input
                                    id="PUSH_NOTIFICATIONS_ENABLED"
                                    type="checkbox"/>
                                <label
                                    for="PUSH_NOTIFICATIONS_ENABLED"
                                    class="ezLabel">
                                    Enable Push Notifications
                                </label>
                                <div
                                    class="ezContainer-editor-info-box">
                                    Receive clock in and out notifications on your mobile device.
                                </div>
                            </div>
                            <!-- Preferred Time Zone Option -->
                            <div
                                class="ezContainer_CategoryContent">
                                <label
                                    for="EZOPTION_EMPLOYER_DASHBOARD_PREFERRED_TIMEZONE"
                                    class="ezLabel">
                                    Preferred Time Zone
                                </label>
                                <select
                                    id="EZOPTION_EMPLOYER_DASHBOARD_PREFERRED_TIMEZONE"
                                    class="ezFullWidth">
                                </select>
                                <div
                                    class="ezContainer-editor-info-box">
                                    <div
                                        id="EzSelectedTimeZoneInfo">
                                        Selected time zone:
                                    </div>
                                </div>
                            </div>
                            <div
                                id="EzfEZOPTION_NOTIFY_EMPLOYER_EMPLOYEE_MISSED_CLOCK_IN_CLOCK_OUT"
                                class="ezFeatureContainer"
                                data-feature-id="ezfEZOPTION_NOTIFY_EMPLOYER_EMPLOYEE_MISSED_CLOCK_IN_CLOCK_OUT"
                                style="display:none">
                                <div
                                    class="ezContainer_CategoryContent">
                                    <label
                                        for="EZOPTION_NOTIFY_EMPLOYER_EMPLOYEE_MISSED_CLOCK_IN_CLOCK_OUT"
                                        class="ezLabel">
                                        Notify When Employees Do Not Clock In or Out
                                    </label>
                                    <select
                                        id="EZOPTION_NOTIFY_EMPLOYER_EMPLOYEE_MISSED_CLOCK_IN_CLOCK_OUT"
                                        class="ezFullWidth">
                                        <option
                                            id="EzEmployerEmployeeNoNotificationOption"
                                            value="0">
                                            Do not notify
                                        </option>
                                        <option
                                            id="EzEmployerEmployeeNotificationOption5minutes"
                                            value="5">
                                            5 minutes
                                        </option>
                                        <option
                                            id="EzEmployerEmployeeNotificationOption15minutes"
                                            value="15">
                                            15 minutes
                                        </option>
                                        <option
                                            id="EzEmployerEmployeeNotificationOption30minutes"
                                            value="30">
                                            30 minutes
                                        </option>
                                    </select>
                                    <div
                                        class="ezContainer-editor-info-box">
                                        This option requires a schedule. Receive a notification when an
                                        employee misses a clock in/out.
                                    </div>
                                </div>
                            </div>
                            <!-- Export Options -->
                            <div
                                class="ezContainer_categorybox-navy">
                                Export Options
                            </div>
                            <div
                                class="ezContainer_CategoryContent">
                                <div
                                    id="EzOvertimeFeatureOnlyAvailableLabel"
                                    class="ezLabel">
                                    Overtime features only available for the Standard and Premium
                                    subscription plans.
                                </div>
                                <!-- Overtime Option -->
                                <div
                                    id="EzWeeklyOvertimeFeature">
                                    <div
                                        id="EzOvertimeFeatureOnlyAvailableLabel"
                                        class="ezContainer-editor-info-box">
                                        Weekly overtime is calculated for single or bi-weekly pay periods
                                        only. ezClocker does not currently support
                                        calculating overtime for bi-monthly pay periods.
                                    </div>
                                    <div
                                        class="ezOvertimeCheckboxContainer">
                                        <input
                                            id="EzAccountOptionCalculateOvertime"
                                            type="checkbox"
                                            disabled />
                                        <label
                                            id="EzAccountOptionCalculateOvertimeLabel"
                                            class="ezDisabledLabel"
                                            for="EzAccountOptionCalculateOvertime">
                                            Calculate weekly overtime after:
                                        </label>
                                    </div>
                                    <div
                                        id="EzOvertimeAfterInputContainer"
                                        class="ezOvertimeAfterInputContainer">
                                        <input
                                            id="EzAccountOptionCalcOverTimeAfter"
                                            class="ezNumber ezWeeklyOvertimeHoursInput"
                                            type="number"
                                            min="1"
                                            value="40"
                                            disabled/>
                                        <label
                                            id="EzAccountOptionCalcOverTimeAfterPostLabel"
                                            class="ezDisabledLabel">
                                            hours/week.
                                        </label>
                                    </div>
                                </div>
                                <!-- Daily Over Time Option -->
                                <div
                                    id="EzDailyOverTimeFeature">
                                    <div
                                        id="EzOvertimeAfterInputContainer"
                                        class="ezOvertimeAdditionalCheckboxContainer">
                                        <input
                                            id="EzAccountOptionCalculateDailyOvertime"
                                            type="checkbox"
                                            disabled />
                                        <label
                                            id="EzAccountOptionCalculateDailOvertimeLabel"
                                            for="EzAccountOptionCalculateDailOvertime"
                                            class="ezDisabledLabel">
                                            Calculate daily overtime after&nbsp;
                                        </label>
                                    </div>
                                    <div
                                        id="EzOvertimeAfterInputContainer"
                                        class="ezOvertimeAfterInputContainer">
                                        <input
                                            id="EzAccountOptionCalcDailyOverTimeAfter"
                                            class="ezNumber ezWeeklyOvertimeHoursInput"
                                            type="number"
                                            min="1"
                                            value="8"
                                            disabled/>
                                        <label
                                            id="EzAccountOptionCalcDailyOverTimeAfterPostLabel"
                                            class="ezDisabledLabel">
                                            hours/day.
                                        </label>
                                    </div>
                                </div>
                                <!-- Daily Double Time Option -->
                                <div
                                    id="EzDailyDoubleTimeFeature"
                                    style="display:none">
                                    <div
                                        id="EzOvertimeAfterInputContainer"
                                        class="ezOvertimeAdditionalCheckboxContainer">
                                        <input
                                            id="EzAccountOptionCalculateDailyDoubleTime"
                                            type="checkbox"
                                            disabled/>
                                        <label
                                            id="EzAccountOptionCalculateDailyDoubleTimeLabel"
                                            class="ezDisabledLabel"
                                            for="EzAccountOptionCalculateDailyDoubleTime">
                                            Calculate daily double time after&nbsp;
                                        </label>
                                    </div>
                                    <div
                                        id="EzOvertimeAfterInputContainer"
                                        class="ezOvertimeAfterInputContainer">
                                        <input
                                            id="EzAccountOptionCalcDailyDoubleTimeAfter"
                                            class="ezNumber ezWeeklyOvertimeHoursInput"
                                            type="number"
                                            min="1"
                                            value="12"
                                            disabled/>
                                        <label
                                            id="EzAccountOptionCalcDailyDoubleTimeAfterPostLabel"
                                            class="ezDisabledLabel">
                                            hours/day.
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </td>
                        <!-- Employee Options -->
                        <td
                            class="basicDataTableCell accountPreferencesCell">
                            <div
                                class="ezContainer_categorybox-navy">
                                Employee Options
                            </div>
                            <!-- Allow Edit Time Entry Option -->
                            <div
                                class="ezContainer_CategoryContent">
                                <input
                                    type="checkbox" id="option_allow_edit_timesheet"
                                    name="_allowtoedittimesheet"
                                    checked/>
                                <label
                                    for="_allowtoedittimesheet"
                                    class="ezLabel">
                                    Do not allow employees to edit their time entries.
                                </label>
                                <div class="ezContainer-editor-info-box">
                                    Employees cannot modify their clock in or out times.
                                    However, they may add and edit the time entry note.
                                </div>
                            </div>
                            <!-- Require GPS Clock In Option -->
                            <div
                                id="EzEZOPTION_REQUIRE_LOCATION_FOR_CLOCKINOUT"
                                data-feature-id="ezfEZOPTION_REQUIRE_LOCATION_FOR_CLOCKINOUT"
                                style="display:none"
                                class="ezFeatureContainer">
                                <div
                                    class="ezContainer_CategoryContent">
                                    <input
                                        id="EZOPTION_REQUIRE_LOCATION_FOR_CLOCKINOUT"
                                        type="checkbox" />
                                    <label
                                        id="EZOPTION_REQUIRE_LOCATION_FOR_CLOCKINOUTlabel"
                                        class="ezLabel"
                                        for="EZOPTION_REQUIRE_LOCATION_FOR_CLOCKINOUT">
                                        Require GPS location information to clock in or out.
                                    </label>
                                    <div
                                        class="ezContainer-editor-info-box">
                                        Require employees to have GPS enabled on their mobile devices in
                                        order to clock in or out.
                                    </div>
                                </div>
                            </div>
                            <!-- Restrict Early Clock In Option -->
                            <div
                                id="EzScheduleDrivenClockInFeatureContainer"
                                class="ezFeatureContainer"
                                data-feature-id="ezScheduleDrivenClockIn"
                                style="display:none">
                                <div
                                    class="ezContainer_CategoryContent">
                                    <input
                                        id="EZOPTION_RESTRICT_CLOCK_IN_TO_SCHEDULE"
                                        type="checkbox"/>
                                    <label
                                        for="EZOPTION_RESTRICT_CLOCK_IN_TO_SCHEDULE">
                                        Restrict Early Clock In
                                    </label>
                                    <div
                                        id="EzRestricEarlyClockInContainer">
                                        <select
                                            id="EZOPTION_ALLOW_EARLY_CLOCK_AT_MINS_BEFORE_SCHEDULE"
                                            class="ezSelect" disabled>
                                            <option
                                                id="EzEarlyClockInNotRestrictedOption"
                                                value="-1">
                                                Not restricted
                                            </option>
                                            <option
                                                id="EzEarlyClockInRestrictedToScheduledTime"
                                                value="0">
                                                At (or after) scheduled time
                                            </option>
                                            <option
                                                id="EzEarlyClockInFiveMinutesEarly"
                                                value="5">
                                                5 Minutes before scheduled time
                                            </option>
                                            <option
                                                id="EzEarlyClockInTenMinutesEarly"
                                                value="10">
                                                10 Minutes before scheduled time
                                            </option>
                                            <option
                                                id="EzEarlyClockInFifteenMinutesEarly"
                                                value="15">
                                                15 Minutes before scheduled time
                                            </option>
                                            <option
                                                id="EzEarlyClockInThirtyMinutesEarly"
                                                value="30">
                                                30 Minutes before scheduled time
                                            </option>
                                        </select>
                                    </div>
                                    <div
                                        class="ezContainer-editor-info-box">
                                        If checked, employees will be blocked from clocking in until their
                                        shift starts. This option requires published schedules.
                                    </div>
                                </div>
                            </div>
                            <!-- Allow recording of unpaid breaks Option -->
                            <div
                                id="ezfEZOPTION_ALLOW_RECORDING_OF_UNPAID_BREAKS"
                                class="ezFeatureContainer"
                                data-feature-id="ezfEZOPTION_ALLOW_RECORDING_OF_UNPAID_BREAKS"
                                style="display:none">
                                <div
                                    class="ezContainer_CategoryContent">
                                    <label
                                        for="EZOPTION_ALLOW_RECORDING_OF_UNPAID_BREAKS"
                                        class="ezLabel">
                                        <input
                                            id="EZOPTION_ALLOW_RECORDING_OF_UNPAID_BREAKS"
                                            type="checkbox" />
                                        Allow Breaks
                                    </label>
                                    <div
                                        class="ezContainer-editor-info-box">
                                        If checked employees will be presented with a break button to record
                                        their lunch and unpaid breaks.
                                    </div>
                                </div>
                            </div>
                            <!-- Allow auto breaks Option -->
                            <div
                                id="ezfEZOPTION_ALLOW_AUTOMATIC_BREAKS"
                                class="ezFeatureContainer"
                                data-feature-id="ezfEZOPTION_ALLOW_AUTOMATIC_BREAKS"
                                style="display:none">
                                <div
                                    class="ezContainer_CategoryContent">
                                    <input
                                        id="EZOPTION_ALLOW_AUTOMATIC_BREAKS"
                                        type="checkbox" />
                                    <label
                                        for="EZOPTION_ALLOW_AUTOMATIC_BREAKS"
                                        class="ezLabel">
                                        Enable Automatic Breaks
                                    </label>
                                    <div
                                        id="EZOPTION_ALLOW_AUTOMATIC_BREAKS_ConfigContainer"
                                        class="ezLabel">
                                        <span>
                                            Add a break after&nbsp;
                                        </span>
                                        <input
                                            id="AUTO_BREAK_WORK_HOURS_OPTION" name="AUTO_BREAK_WORK_HOURS_OPTION"
                                            class="ezNumber ezWeeklyOvertimeHoursInput"
                                            min="1" max="24" value="4"
                                            type="number"
                                            style="text-align: center;margin: 0 10px;">
                                        <span>
                                            &nbsp;hours of work for&nbsp;
                                        </span>
                                        <input
                                            id="AUTO_BREAK_WORK_MINUTES_OPTION"
                                            class="ezNumber ezWeeklyOvertimeHoursInput"
                                            name="AUTO_BREAK_WORK_MINUTES_OPTION"
                                            min="1" max="30" value="30"
                                            type="number"
                                            style="text-align: center;margin: 0 10px;">
                                        <span>
                                            &nbsp;minutes.
                                        </span>
                                        </span>
                                        <div
                                            class="ezContainer-editor-info-box">
                                            When checked, ezClocker will automatically add a break of up to thirty
                                            minutes when a employee clocks out AND they have NOT taken a break.
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <!-- Allow auto breaks Option -->
                            <div
                                data-feature-id="ezRoundClockInClockOut"
                                id="EzRoundClockInClockOutFeatureContainer"
                                class="ezFeatureContainer"
                                display="none">
                                <div
                                    class="ezContainer_CategoryContent">
                                    <input
                                        id="EZOPTION_ROUND_CLOCK_IN_CLOCK_OUT"
                                        type="checkbox"/>
                                    <label
                                        for="EZOPTION_ROUND_CLOCK_IN_CLOCK_OUT">
                                        Round clock in and clock out time to the nearest
                                    </label>
                                    <select
                                        id="EZOPTION_ROUND_CLOCK_IN_CLOCK_OUT_OPTIONS"
                                        class="ezSelect"
                                        style="margin-left: 12px;width: 30%"
                                        disabled>
                                        <option
                                            id="EzRoundingClockInClockOutNotSelected"
                                            value="NONE">
                                            Not selected
                                        </option>
                                        <option
                                            id="EzRoundingClockInClockOutSelected5Minutes"
                                            value="NEAREST_5">
                                            5 Minutes
                                        </option>
                                        <option
                                            id="EzRoundingClockInClockOutSelected6Minutes"
                                            value="NEAREST_6">
                                            6 Minutes
                                        </option>
                                        <option
                                            id="EzRoundingClockInClockOutSelected15Minutes"
                                            value="NEAREST_15">
                                            15 Minutes
                                        </option>
                                    </select>
                                    <div
                                        class="ezContainer-editor-info-box">
                                        When an employee clocks in/out the time will be rounded to the nearest 5, 6,
                                        or 15 minutes.
                                    </div>
                                </div>
                            </div>
                            <div
                                data-feature-id="ezRestrictTimeOffRequests"
                                id="EzRestrictTimeOffRequestsFeatureContainer"
                                class="ezFeatureContainer"
                                display="none">
                                <div
                                    class="ezContainer_CategoryContent">
                                    <input
                                        id="EZOPTION_TIME_OFF_RESTRICT_REQUEST_START_DATE"
                                        type="checkbox"/>
                                    <label
                                        for="EZOPTION_TIME_OFF_RESTRICT_REQUEST_START_DATE">
                                        Restrict Time Off Requests
                                    </label>
                                    <select
                                        id="EZOPTION_TIME_OFF_MINIMUM_DAYS_IN_FUTURE"
                                        class="ezSelect"
                                        style="margin-left: 12px;width: 50%"
                                        disabled>
                                        <option
                                            id="EzTimeOffMinimumDaysInFutureNotSelected"
                                            value="NONE">
                                            Not selected
                                        </option>
                                        <option
                                            id="EzTimeOffMinimumDaysInFutureSelected3Days"
                                            value="3">
                                            3 Days
                                        </option>
                                        <option
                                            id="EzTimeOffMinimumDaysInFutureSelected7Days"
                                            value="7">
                                            7 Days
                                        </option>
                                        <option
                                            id="EzTimeOffMinimumDaysInFutureSelected14Days"
                                            value="14">
                                            14 Days
                                        </option>
                                        <option
                                            id="EzTimeOffMinimumDaysInFutureSelected30Days"
                                            value="30">
                                            30 Days
                                        </option>
                                    </select>
                                    <div
                                        class="ezContainer-editor-info-box">
                                        Required Minimum Number Of Days in Future for Time Off Start.
                                    </div>
                                </div>
                            </div>
                            <div
                                data-feature-id="ezfRemindEmployeesBeforeShiftStarts"
                                id="EzRemindEmployeesBeforeShiftStartsContainer"
                                class="ezFeatureContainer"
                                style="display:none">
                                <div
                                    class="ezContainer_CategoryContent">
                                    <input
                                        id="EZOPTION_NOTIFY_EMPLOYEE_BEFORE_SHIFT_STARTS_CHECKED"
                                        type="checkbox"/>
                                    <label
                                        for="EZOPTION_NOTIFY_EMPLOYEE_BEFORE_SHIFT_STARTS_CHECKED">
                                        Remind Employees &nbsp;
                                    </label>
                                    <select
                                        id="EZOPTION_NOTIFY_EMPLOYEE_BEFORE_SHIFT_STARTS"
                                        class="ezSelect"
                                        style="margin: 0 12px;width: 20%"
                                        disabled>
                                        <option
                                            id="EzNeverRemindEmployees"
                                            value="0">
                                            Never
                                        </option>
                                        <option
                                            id="EzRemind1HrBefore"
                                            value="1">
                                            1 Hour
                                        </option>
                                        <option
                                            id="EzRemind4HoursBefore"
                                            value="4">
                                            4 Hours
                                        </option>
                                        <option
                                            id="EzRemind24HoursBefore"
                                            value="24">
                                            24 Hours
                                        </option>
                                    </select>
                                    <span>&nbsp; before their shift starts.</span>
                                    <div
                                        class="ezContainer-editor-info-box">
                                        Send reminder notifications to the employees so they don’t forget to clock in.
                                    </div>
                                </div>
                            </div>
                        </td>
                    </tr>
                    <tr
                        data-feature-id="ezfEZOPTION_NOTIFY_EMPLOYEE_MISSED_CLOCK_IN_CLOCK_OUT">
                        <!-- Employee Notification Options -->
                        <td
                            class="basicDataTableCell accountPreferencesCell"
                            colspan="2">
                            <div
                                id="ezfEZOPTION_NOTIFY_EMPLOYEE_MISSED_CLOCK_IN_CLOCK_OUT"
                                class="ezFeatureContainer"
                                data-feature-id="ezfEZOPTION_NOTIFY_EMPLOYEE_MISSED_CLOCK_IN_CLOCK_OUT"
                                style="display:none">
                                <div
                                    class="ezContainer_categorybox-navy">
                                    Employee Notification Options
                                </div>
                                <div
                                    class="ezContainer_CategoryContent">
                                    <div
                                        class="ezSettingContainer">
                                        <label
                                            for="EZOPTION_NOTIFY_EMPLOYEE_MISSED_CLOCK_IN_CLOCK_OUT"
                                            class="ezLabel">
                                            Notify Employee When They Missed Clocking In or Out
                                        </label>
                                        <select
                                            id="EZOPTION_NOTIFY_EMPLOYEE_MISSED_CLOCK_IN_CLOCK_OUT"
                                            class="ezFullWidth">
                                            <option
                                                id="EzEmployeeNoNotificationOption"
                                                value="0">
                                                Do not notify
                                            </option>
                                            <option
                                                id="EzEmployeeNotificationOption5minutes"
                                                value="5">
                                                5 minutes
                                            </option>
                                            <option
                                                id="EzEmployeeNotificationOption15minutes"
                                                value="15">
                                                15 minutes
                                            </option>
                                            <option
                                                id="EzEmployeeNotificationOption30minutes"
                                                value="30">
                                                30 minutes
                                            </option>
                                        </select>
                                        <div
                                            class="ezOptionsNote">
                                            This option requires a schedule. Employees will be notified when they
                                            forget to clock in/out from their scheduled shift.
                                        </div>
                                    </div>
                                </div>
                                <div
                                    class="ezContainer_CategoryContent">
                                    <label
                                        class="ezLabel"
                                        for="EZOPTION_NOTIFY_EMPLOYEE_BEFORE_SHIFT_STARTS">
                                        Notify Employee Before Shift Starts
                                    </label>
                                    <select
                                        id="EZOPTION_NOTIFY_EMPLOYEE_BEFORE_SHIFT_STARTS"
                                        class="ezFullWidth">
                                        <option
                                            id="EzEmployeeNoNotificationBeforeShiftOption"
                                            value="0">
                                            Do not notify
                                        </option>
                                        <option
                                            id="EzEmployeeNotificationBeforeShiftOption1hour"
                                            value="1">
                                            1 Hour Before
                                        </option>
                                        <option
                                            id="EzEmployeeNotificationBeforeShiftOption2hours"
                                            value="2">
                                            2 Hours Before
                                        </option>
                                        <option
                                            id="EzEmployeeNotificationBeforeShiftOption4hours"
                                            value="4">
                                            4 Hours Before
                                        </option>
                                        <option
                                            id="EzEmployeeNotificationBeforeShiftOption6hours"
                                            value="6">
                                            6 Hours Before
                                        </option>
                                        <option
                                            id="EzEmployeeNotificationBeforeShiftOption8hours"
                                            value="8">
                                            8 Hours Before
                                        </option>
                                        <option
                                            id="EzEmployeeNotificationBeforeShiftOption12hours"
                                            value="12">
                                            12 Hours Before
                                        </option>
                                        <option
                                            id="EzEmployeeNotificationBeforeShiftOption24hours"
                                            value="24">
                                            24 Hours Before
                                        </option>
                                    </select>
                                    <div
                                        class="ezContainer-editor-info-box">
                                        This option requires a schedule. Employees will be sent a reminder
                                        that their shift will be starting soon.
                                    </div>
                                </div>
                            </div>
                        </td>
                    </tr>
                </table>
                <div
                    id="_DisplayPreferenceMessages">
                </div>
            </div>`;
    }

    /**
     * @public @readonly @property
     * Gets
     * @returns {string}
     */
    get ezBillingAddressInfoHtml() {
        return EzHtml.build`
            <div
                id="EzBillingAddressCol"
                class="ezMarginRight2">
                <div
                    id="EzBillingAddressHeader"
                    class="ezContainer-title-box-ezClockerNavy-pad-8 ezAutoCol_AxA ezGrid-vertical-align-middle ezGrid-align-space-between">
                    <div
                        id="EzBillingAddressHeaderText"
                        class="ezGrid-align-middle-left ezGridTopicText">
                        Billing Address
                    </div>
                    <div
                        class="ezGrid-align-middle-right">
                        <button
                            id="_EditBillingAddress"
                            class="ezEditButton"
                            title="Edit your billing information">
                            edit
                        </button>
                    </div>
                </div>
                <div
                    id="EzBillingContactNameCols"
                    class="ezAutoCol_200PXxA ezGridWhite">
                    <div
                        class="ezGrid-align-middle-left ezGridContent ezGridNormalText ezBorderLeftBottom">
                        Contact Name
                    </div>
                    <div
                        id="_BillingAddress_Name"
                        class="ezGridContent ezGridContentText ezBorderLeftRightBottom">
                    </div>
                </div>
                <div
                    id="EzBillingAddressAddressCols"
                    class="ezAutoCol_200PXxA ezGridWhite">
                    <div
                        id="EzBillingAddressAddressLabel"
                        class="ezGrid-align-middle-left ezGridContent ezGridNormalText ezBorderLeftBottom">
                        Address
                    </div>
                    <div
                        id="_BillingAddress_StreetAddress"
                        class="ezGrid-align-middle-left ezGridContent ezGridContentText ezBorderLeftRightBottom">
                    </div>
                </div>
                <div
                    id="EzBillingAddressCityCols"
                    class="ezAutoCol_200PXxA ezGridWhite">
                    <div
                        id="EzBillingAddressCityLabel"
                        class="ezGrid-align-middle-left ezGridContent ezGridNormalText ezBorderLeftBottom">
                        City
                    </div>
                    <div
                        id="_BillingAddress_City"
                        class="ezGrid-align-middle-left ezGridContent ezGridContentText ezBorderLeftRightBottom">
                    </div>
                </div>
                <div
                    id="EzBillingAddressStateCols"
                    class="ezAutoCol_200PXxA ezGridWhite">
                    <div
                        id="EzBillingAddressStateLabel"
                        class="ezGrid-align-middle-left ezGridContent ezGridNormalText ezBorderLeftBottom">
                        State
                    </div>
                    <div
                        id="_BillingAddress_State"
                        class="ezGrid-align-middle-left ezGridContent ezGridContentText ezBorderLeftRightBottom">
                    </div>
                </div>
                <div
                    id="EzBillingAddressZipPostalCodeCols" class="ezAutoCol_200PXxA ezGridWhite">
                    <div
                        id="EzBillingAddressZipLabel"
                        class="ezGrid-align-middle-left ezGridContent ezGridNormalText ezBorderLeftBottom">
                        Zip/Postal Code
                    </div>
                    <div
                        id="_BillingAddress_Zip"
                        class="ezGrid-align-middle-left ezGridContent ezGridContentText ezBorderLeftRightBottom">
                    </div>
                </div>
            </div>`;
    }

    /**
     * @public @readonly @property
     * Gets
     * @returns {string}
     */
    get ezCreditCardInfoHtml() {
        const snakeSpinner = EzSpinner.ezBuildSnakeSpinner(16);

        return EzHtml.build`
            <div
                id="EzCreditCardInfoPanel"
                class="ezMarginLeft2"
                data-user-role-feature-id="EZROLE_FEATURE_ACCOUNT_SUBSCRIPTION_EDITING">
                <div
                    id="EzCreditCardInfoPanel_Rows"
                    class="ezAutoRow">
                    <div
                        id="EzCreditCardInfoPanel_Header"
                        class="ezContainer-title-box-ezClockerNavy-pad-8 ezAutoCol_AxA ezGrid-vertical-align-middle ezGrid-align-space-between">
                        <div
                            id="EzCreditCardInfoPanel_Title"
                            class="ezAutoCol_A ezGrid-vertical-align-middle ezGrid-align-left">
                            Credit Card
                        </div>
                        <div
                            id="EzCreditCardInfoPanel_ActionBar">
                            <button
                                id="_UpdateCreditCard" class="ezEditButton"
                                title="Update your credit card information">
                                update
                            </button>
                        </div>
                    </div>
                    <div
                        id="EzCreditCardTypeCols"
                        class="ezAutoCol_200PXxA ezGridWhite">
                        <div
                            id="EzCreditCardTypeLabel"
                            class="ezGrid-align-middle-left ezGridContent ezGridNormalText ezBorderLeftBottom">
                            Card Type
                        </div>
                        <div
                            id="EzCreditCardType"
                            class="ezGrid-align-middle-left ezGridContent ezGridContentText ezBorderLeftRightBottom">
                            ${snakeSpinner}
                        </div>
                    </div>
                    <div
                        id="EzCreditCardLastFourCols" class="ezAutoCol_200PXxA ezGridWhite">
                        <div
                            id="EzCreditCardLastFourLabel"
                            class="ezGrid-align-middle-left ezGridContent ezGridNormalText ezBorderLeftBottom">
                            Last Four
                        </div>
                        <div
                            id="EzCreditCardLastFour"
                            class="ezGrid-align-middle-left ezGridContent ezGridContentText ezBorderLeftRightBottom">
                            ${snakeSpinner}
                        </div>
                    </div>
                    <div
                        id="EzCreditCardNameOnCardCols" class="ezAutoCol_200PXxA ezGridWhite">
                        <div
                            id="EzCreditCardNameOnCardLabel"
                            class="ezGrid-align-middle-left ezGridContent ezGridNormalText ezBorderLeftBottom">
                            Name on Card
                        </div>
                        <div
                            id="EzCreditCardNameOnCard"
                            class="ezGrid-align-middle-left ezGridContent ezGridContentText ezBorderLeftRightBottom">
                            ${snakeSpinner}
                        </div>
                    </div>
                    <div
                        id="EzCreditCardExpireDateCols" class="ezAutoCol_200PXxA ezGridWhite">
                        <div
                            id="EzCreditCardExpireDateLabel"
                            class="ezGrid-align-middle-left ezGridContent ezGridNormalText ezBorderLeftBottom">
                            Expiration Date
                        </div>
                        <div
                            id="EzCreditCardExpireDate"
                            class="ezGrid-align-middle-left ezGridContent ezGridContentText ezBorderLeftRightBottom">
                            ${snakeSpinner}
                        </div>
                    </div>
                </div>
            </div>`;
    }

    /**
     * @public @readonly @property
     * Gets
     * @returns {string}
     */
    get ezAccountInformationHtml() {
        return EzHtml.build`
            <div
                id="EZROLE_FEATURE_ACCOUNT_SUBSCRIPTION_EDITING"
                class="ezTopMargin_10"
                data-user-role-feature-id="EZROLE_FEATURE_ACCOUNT_SUBSCRIPTION_EDITING">
                <div
                    id="EzBillingInformationGrid"
                    class="ezGridX ezTopMargin_10 ezGridGap_20"
                    style="display:none">
                    <div
                        id="EzBillingInformationRows"
                        class="ezAutoRow">
                        <div
                            id="EzBillingInformationCols"
                            class="ezAutoCol_50xA ezGrid-vertical-align-top">
                            ${EzAccountViewController.ezInstance.ezBillingAddressInfoHtml}
                            ${EzAccountViewController.ezInstance.ezCreditCardInfoHtml}
                        </div>
                    </div>
                </div>
            </div>`;
    }

    /**
     * @public @readonly @property
     * Gets
     * @returns {string}
     */
    get ezCompanyContactInfoHtml() {
        return EzHtml.build`
            <div
                id="EzCompanyInfoCol"
                class="ezMarginRight2"
                data-user-role-feature-id="EZROLE_FEATURE_ACCOUNT_SUBSCRIPTION_EDITING">
                <div
                    id="EzCompanyInfoRows"
                    class="ezAutoRow">
                    <div
                        id="EzCompanyInfoHeader"
                        class="ezContainer-title-box-ezClockerNavy-pad-8 ezAutoCol_AxA ezGrid-vertical-align-middle ezGrid-align-space-between">
                        <div
                            id="EzCompanyInfo_Title"
                            class="ezAutoCol_A ezGrid-vertical-align-middle ezGrid-align-left">
                            Company Information
                        </div>
                        <div
                            id="EzCompanyInfo_TitleActionBar">
                            <button
                                id="_EditCompanyInformation"
                                class="ezEditButton"
                                title="Edit your company information">
                                edit
                            </button>
                        </div>
                    </div>
                    <div
                        id="EzCompanyInfoCompanyNameCols"
                        class="ezAutoCol_200PXxA ezGridWhite">
                        <div
                            class="ezGrid-align-middle-left ezGridContent ezGridNormalText ezBorderLeftBottom">
                            Company Name
                        </div>
                        <div
                            id="EzCompanyInfoNameRows"
                            class="ezGrid-align-middle-left ezGridContent ezGridContentText ezBorderLeftRightBottom">
                            <label
                                id="EzCompanyInfoName">
                            </label>
                        </div>
                    </div>
                    <div
                        id="EzCompanyInfoStreetAddressCols"
                        class="ezAutoCol_200PXxA ezGridWhite">
                        <div
                            class="ezGrid-align-middle-left ezGridContent ezGridNormalText ezBorderLeftBottom">
                            Street Address
                        </div>
                        <div
                            id="EzCompanyInfoStreetAddressRows"
                            class="ezGrid-align-middle-left ezGridContent ezGridContentText ezBorderLeftRightBottom">
                            <label
                                id="EzCompanyInfoStreetAddress">
                            </label>
                        </div>
                    </div>
                    <div
                        id="EzCompanyInfoAdditionalAddressCols"
                        class="ezAutoCol_200PXxA ezGridWhite">
                        <div
                            class="ezGrid-align-middle-left ezGridContent ezGridNormalText ezBorderLeftBottom">
                            Additional Address
                        </div>
                        <div
                            id="EzCompanyInfoAdditionalAddressRows"
                            class="ezGrid-align-middle-left ezGridContent ezGridContentText ezBorderLeftRightBottom">
                            <label
                                id="EzCompanyInfoAdditionalAddress">
                            </label>
                        </div>
                    </div>
                    <div
                        id="EzCompanyInfoCityCols"
                        class="ezAutoCol_200PXxA ezGridWhite">
                        <div
                            class="ezGrid-align-middle-left ezGridContent ezGridNormalText ezBorderLeftBottom">
                            City
                        </div>
                        <div
                            id="EzCompanyInfoCityRows"
                            class="ezGrid-align-middle-left ezGridContent ezGridContentText ezBorderLeftRightBottom">
                            <label
                                id="EzCompanyInfoCity">
                            </label>
                        </div>
                    </div>
                    <div
                        id="EzCompanyInfoStateCols"
                        class="ezAutoCol_200PXxA ezGridWhite">
                        <div
                            class="ezGrid-align-middle-left ezGridContent ezGridNormalText ezBorderLeftBottom">
                            State/Providence
                        </div>
                        <div
                            id="EzCompanyInfoStateRows"
                            class="ezGrid-align-middle-left ezGridContent ezGridContentText ezBorderLeftRightBottom">
                            <label
                                id="EzCompanyInfoState">
                            </label>
                        </div>
                    </div>
                    <div
                        id="EzCompanyInfoZipPostalCodeCols"
                        class="ezAutoCol_200PXxA ezGridWhite">
                        <div
                            class="ezGrid-align-middle-left ezGridContent ezGridNormalText ezBorderLeftBottom">
                            Postal Code
                        </div>
                        <div
                            id="EzCompanyInfoZipPostalCodeRows"
                            class="ezGrid-align-middle-left ezGridContent ezGridContentText ezBorderLeftRightBottom">
                            <label
                                id="EzCompanyInfoPostalCode">
                            </label>
                        </div>
                    </div>
                    <div
                        id="EzCompanyInfoContactPhoneCols"
                        class="ezAutoCol_200PXxA ezGridWhite">
                        <div
                            class="ezGrid-align-middle-left ezGridContent ezGridNormalText ezBorderLeftBottom">
                            Company Contact Phone
                        </div>
                        <div
                            id="EzCompanyInfoContactPhoneRows"
                            class="ezGrid-align-middle-left ezGridContent ezGridContentText ezBorderLeftRightBottom">
                            <label
                                id="EzCompanyInfoContactPhone">
                            </label>
                        </div>
                    </div>
                </div>
            </div>`;
    }

    /**
     * @public @readonly @property
     * Gets
     * @returns {string}
     */
    get ezCompanyLogoInfoHtml() {
        return EzHtml.build`
            <div
                id="EzCompanyLogoCol"
                class="ezMarginLeft2"
                data-user-role-feature-id="EZROLE_FEATURE_EDIT_COMPANY_LOGO">
                <div
                    id="EzCompanyInfoRows"
                    class="ezAutoRow">
                    <div
                        id="EzCompanyLogoHeader"
                        class="ezContainer-title-box-ezClockerNavy-pad-8 ezAutoCol_AxA ezGrid-vertical-align-middle ezGrid-align-space-between">
                        <div
                            id="EzCompanyLogoHeader_Title"
                            class="ezAutoCol_A ezGrid-vertical-align-middle ezGrid-align-left">
                            Company Logo
                        </div>
                        <div
                            id="EzCompanyLogoHeader_ActionBar">
                            <button
                                id="_EditCompanyLogo"
                                class="editButton floatRightButton"
                                title="Change your company logo">
                                change
                            </button>
                        </div>
                    </div>
                    <div
                        id="EzCompanyLogoHelpCols"
                        class="ezAutoCol_A ezGridWhite">
                        <div
                            class="logoRestrictions">
                            <h3>
                                Image Logo Restrictions
                            </h3>
                            <ul>
                                <li>
                                    Supported image types: JPG, PNG, and GIF
                                </li>
                                <li>
                                    Preferred image size: 110px x 40px (pixels)
                                </li>
                                <li>
                                    Maximum file size: 10mb
                                </li>
                            </ul>
                            <div
                                class="logoImageExampleContainer">
                                Example of preferred company logo image size:
                                <table
                                    id="EzAccountCompanyLogoTable"
                                    class="ezTopMargin_10">
                                    <tr>
                                        <td
                                            class="centerImageExample">
                                            <img
                                                src="/public/images/dallas.png"
                                                class="logoImageExample"
                                                alt="Company Logo" />
                                        </td>
                                        <td
                                            class="centerImageExample">
                                            40px High
                                        </td>
                                    </tr>
                                    <tr>
                                        <td
                                            class="centerImageExample">
                                            110px Wide
                                        </td>
                                    </tr>
                                </table>
                            </div>
                        </div>
                        <div
                            id="EzCompanyLogoPreviewContainer"
                            class="ezPad10 ezBorder">
                            <h3>
                                Preview
                            </h3>
                            <div
                                id="EzEmployeeSchedulePageViewHeader"
                                class="ezHeader ezBorder">
                                <div
                                    id="EzPageViewHeader_EmployerLogoContainer"
                                    class="ezHeader-employer-logo-container">
                                    <div
                                        id="EmployerLogoImgContainer"
                                        class="ezHeader-logo-image-container">
                                        <img
                                            id="${EzAccountViewController.ezInstance.ezIds.images.accountPageExampleEmployerLogo}"
                                            class="ezHeader-employer-logo"
                                            src="/public/images/spinners/orange-spinner.gif"
                                            alt="employer"/>
                                    </div>
                                    <div
                                        id="_CompanyNameForLogo"
                                        class="ezHeader-employer-name">
                                        Company Name
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>`;
    }

    /**
     * @public @readonly @property
     * Gets
     * @returns {string}
     */
    get ezCompanyInfoHtml() {
        return EzHtml.build`
            <div
                id="EzCompanyInfoGrid"
                class="ezGridX ezTopMargin_10">
                <div
                    id="EzCompanyInfoRows"
                    class="ezAutoRow">
                    <div
                        id="EzCompanyInfoRows"
                        class="ezAutoCol_50xA ezGrid-vertical-align-top">
                        ${EzAccountViewController.ezInstance.ezCompanyContactInfoHtml}
                        ${EzAccountViewController.ezInstance.ezCompanyLogoInfoHtml}
                    </div>
                </div>
            </div>`;
    }

    /**
     * @private @field
     * Stores the Account View's ready state flags
     * @type {object}
     */
    #ezAccountViewReadyState = {
        isReady: false,
        featureTogglesReady: {
            ezEvent: null,
            ready: false
        },
        // TODO: Finish support for user roles in account page
        /*
         ezUserRoleFeaturesReady: {
            ezEvent: null,
            ready : false
        },
        */
        selectedEmployerAccountReady: {
            ezEvent: null,
            ready: false
        },
        subscriptionContextActiveSubscriptionReady: {
            ezEvent: null,
            ready: false
        },
        subscriptionContextBillingInformationReady: {
            ezEvent: null,
            ready: false
        },
        /*
        subscriptionContextBillingAddressReady: {
            ezEvent: null,
            ready: false
        },
        subscriptionContextActiveCreditCardReady: {
            ezEvent: null,
            ready: false
        }
        */
    };
    /**
     * @public @property @getter
     * Gets the Account View's ready state flags
     * @returns {object}
     */
    get ezAccountViewReadyState() {
        return this.#ezAccountViewReadyState;
    }
    /**
     * @public @property @setter
     * Sets the Account View's ready state flags
     * @param {object} accountViewReadyState
     */
    set ezAccountViewReadyState(accountViewReadyState) {
        if (EzObject.isValid(accountViewReadyState)) {

            this.#ezAccountViewReadyState.featureTogglesReady.ready = EzBoolean.booleanOrFalse(
                accountViewReadyState.featureTogglesReady.ready);
            this.#ezAccountViewReadyState.featureTogglesReady.ezEvent = EzObject.assignOrNull(
                accountViewReadyState.featureTogglesReady.ezEvent);

            // TODO: Finish support for user roles in account page
            /*
            this.#ezAccountViewReadyState.ezUserRoleFeaturesReady.ready = EzBoolean.booleanOrFalse(
                accountViewReadyState.ezUserRoleFeaturesReady.ready);
            this.#ezAccountViewReadyState.ezUserRoleFeaturesReady.ezEvent = EzObject.assignOrNull(
                accountViewReadyState.ezUserRoleFeaturesReady.ezEvent);
            */

            this.#ezAccountViewReadyState.selectedEmployerAccountReady.ready = EzBoolean.booleanOrFalse(
                accountViewReadyState.selectedEmployerAccountReady.ready);
            this.#ezAccountViewReadyState.selectedEmployerAccountReady.ezEvent = EzObject.assignOrNull(
                accountViewReadyState.selectedEmployerAccountReady.ezEvent);

            this.#ezAccountViewReadyState.subscriptionContextActiveSubscriptionReady.ready = EzBoolean.booleanOrFalse(
                accountViewReadyState.subscriptionContextActiveSubscriptionReady.ready);
            this.#ezAccountViewReadyState.subscriptionContextActiveSubscriptionReady.ezEvent = EzObject.assignOrNull(
                accountViewReadyState.subscriptionContextActiveSubscriptionReady.ezEvent);

            this.#ezAccountViewReadyState.subscriptionContextBillingInformationReady.ready = EzBoolean.booleanOrFalse(
                accountViewReadyState.subscriptionContextBillingInformationReady.ready);
            this.#ezAccountViewReadyState.subscriptionContextBillingInformationReady.ezEvent = EzObject.assignOrNull(
                accountViewReadyState.subscriptionContextBillingInformationReady.ezEvent);

            /*
            this.#ezAccountViewReadyState.subscriptionContextBillingAddressReady.ready = EzBoolean.booleanOrFalse(
                accountViewReadyState.subscriptionContextBillingAddressReady.ready);
            this.#ezAccountViewReadyState.subscriptionContextBillingAddressReady.ezEvent = EzObject.assignOrNull(
                accountViewReadyState.subscriptionContextBillingAddressReady.ezEvent);

            this.#ezAccountViewReadyState.subscriptionContextActiveCreditCardReady.ready = EzBoolean.booleanOrFalse(
                accountViewReadyState.subscriptionContextActiveCreditCardReady.ready);
            this.#ezAccountViewReadyState.subscriptionContextActiveCreditCardReady.ezEvent = EzObject.assignOrNull(
                accountViewReadyState.subscriptionContextActiveCreditCardReady.ezEvent);
            */
        }

        if (EzBoolean.isFalse(this.#ezAccountViewReadyState.isReady)) {
            this.#ezAccountViewReadyState.isReady = this.#ezAccountViewReadyState.featureTogglesReady.ready &&
                this.#ezAccountViewReadyState.selectedEmployerAccountReady.ready &&
                // TODO: Finish support for user roles in account page
                //this.#ezAccountViewReadyState.ezUserRoleFeaturesReady.ready &&
                this.#ezAccountViewReadyState.selectedEmployerAccountReady.ready &&
                this.#ezAccountViewReadyState.subscriptionContextActiveSubscriptionReady.ready &&
                this.#ezAccountViewReadyState.subscriptionContextBillingInformationReady.ready;
            //this.#ezAccountViewReadyState.subscriptionContextBillingAddressReady.ready &&
            //this.#ezAccountViewReadyState.subscriptionContextActiveCreditCardReady.ready;

            if (EzBoolean.isTrue(this.#ezAccountViewReadyState.isReady)) {
                globalThis.ezApi.ezclocker.ezEventEngine.ezTriggerEvent(
                    EzAccountViewController.ezEventNames.onStateReady,
                    EzAccountViewController.ezInstance.ezAccountViewReadyState);
            }
        }

        this.ezUpdateState('ezAccountViewReadyState', this.#ezAccountViewReadyState);
    }

    /**
     * @public @method
     * Sets a ready state flag
     * @param {string} readyStateId
     * @param {boolean} isReady
     * @returns {boolean}
     * Returns if all ready state flags are ready.
     */
    ezApplyReadyStateFlag(readyStateId, isReady, ezEvent) {
        if (!Object.hasOwn(EzAccountViewController.ezInstance.ezAccountViewReadyState, readyStateId)) {
            throw new EzBadParamException(
                'readyStateId',
                EzAccountViewController.ezInstance,
                EzAccountViewController.ezInstance.ezApplyReadyStateFlag);
        }

        EzAccountViewController.ezInstance.ezAccountViewReadyState[readyStateId].ready = EzBoolean.booleanOrFalse(isReady);

        EzAccountViewController.ezInstance.ezAccountViewReadyState[readyStateId].ezEvent = EzObject.assignOrNull(ezEvent);

        if (EzBoolean.isFalse(EzAccountViewController.ezInstance.ezAccountViewReadyState.isReady)) {
            EzAccountViewController.ezInstance.ezAccountViewReadyState.isReady =
                EzAccountViewController.ezInstance.ezAccountViewReadyState.featureTogglesReady.ready &&
                // TODO: Finish support for user roles in account page
                //this.#ezAccountViewReadyState.ezUserRoleFeaturesReady.ready &&
                EzAccountViewController.ezInstance.ezAccountViewReadyState.selectedEmployerAccountReady.ready &&
                EzAccountViewController.ezInstance.ezAccountViewReadyState.subscriptionContextActiveSubscriptionReady.ready &&
                EzAccountViewController.ezInstance.ezAccountViewReadyState.subscriptionContextBillingInformationReady.ready;
            //EzAccountViewController.ezInstance.ezAccountViewReadyState.subscriptionContextBillingAddressReady.ready &&
            //EzAccountViewController.ezInstance.ezAccountViewReadyState.subscriptionContextActiveCreditCardReady.ready;

            if (EzBoolean.isTrue(EzAccountViewController.ezInstance.ezAccountViewReadyState.isReady)) {
                globalThis.ezApi.ezclocker.ezEventEngine.ezTriggerEvent(
                    EzAccountViewController.ezEventNames.onStateReady,
                    EzAccountViewController.ezInstance.ezAccountViewReadyState);
            }
        }
    }

    /**
     * @public @method
     * Initializes EzAccountViewController
     * @returns {EzAccountViewController}
     */
    ezInit() {
        globalThis.ezApi.ezclocker.ezEventEngine.ezRegisterEvent(
            EzAccountViewController.ezApiName,
            EzAccountViewController.ezEventNames.onStateReady);

        globalThis.ezApi.ezclocker.ezEventEngine.ezRegisterEvent(
            EzAccountViewController.ezApiName,
            EzAccountViewController.ezEventNames.onEzAccountViewControllerLicenseProcessingCompleted);

        globalThis.ezApi.ezclocker.ezLicenseHelper.ezHookLicenseEvents(
            EzAccountViewController.ezApiName,
            EzAccountViewController.ezInstance.ezLicenseValidHandler,
            EzAccountViewController.ezInstance.ezLicenseExpiredHandler,
            EzAccountViewController.ezInstance.ezLicenseErrorHandler,
            EzAccountViewController.ezInstance.ezFreeTrialExpiredHandler,
            EzAccountViewController.ezInstance.ezLicenseViolationHandler);

        // Events required for ready state
        EzAccountViewController.ezInstance.ezWaitForReadyStateRequiredEvents();

        globalThis.ezApi.ezclocker.ezEventEngine.ezWantEvent(
            EzClockerContextEventName.onSubscriptionContextActiveCreditCardChanged,
            EzAccountViewController.ezApiName,
            EzAccountViewController.ezInstance.ezHandleOnSubscriptionContextCreditCardReadyChanged);

        globalThis.ezApi.ezclocker.ezEventEngine.ezWantEvent(
            EzClockerContextEventName.onSubscriptionContextActiveCreditCardReady,
            EzAccountViewController.ezApiName,
            EzAccountViewController.ezInstance.ezHandleOnSubscriptionContextCreditCardReadyChanged);

        globalThis.ezApi.ezclocker.ezEventEngine.ezWantEvent(
            EzUpdateCreditCardDialog.ezEventNames.onUpdateCreditCardDialogSubmit,
            EzAccountViewController.ezApiName,
            EzAccountViewController.ezInstance.ezHandleOnUpdateCreditCardDialogSubmit);

        globalThis.ezApi.ezclocker.ezEventEngine.ezWantEvent(
            EzClockerContextEventName.onSubscriptionContextActiveSubscriptionChanged,
            EzAccountViewController.ezApiName,
            EzAccountViewController.ezInstance.ezHandleonSubscriptionContextActiveSubscriptionReadyChanged);

        globalThis.ezApi.ezclocker.ezEventEngine.ezWantEvent(
            EzClockerContextEventName.onSubscriptionContextBillingInformationChanged,
            EzAccountViewController.ezApiName,
            EzAccountViewController.ezInstance.ezHandleOnSubscriptionContextBillingInformationReadyChanged);

        globalThis.ezApi.ezclocker.ezEventEngine.ezWantEvent(
            EzClockerContextEventName.onSubscriptionContextBillingAddressChanged,
            EzAccountViewController.ezApiName,
            EzAccountViewController.ezInstance.ezHandleOnSubscriptionContextBillingAddressReadyChanged);

        globalThis.ezApi.ezclocker.ezEventEngine.ezWantEvent(
            EzClockerContextEventName.onSubscriptionContextBillingAddressReady,
            EzAccountViewController.ezApiName,
            EzAccountViewController.ezInstance.ezHandleOnSubscriptionContextBillingAddressReadyChanged);

        globalThis.ezApi.ezclocker.ezEventEngine.ezWantEvent(
            EzBillingAddressDialog.ezEventNames.onBillingAddressDialogSubmitted,
            EzAccountViewController.ezApiName,
            EzAccountViewController.ezInstance.ezHandleOnBillingAddressDialogSubmitted);

        globalThis.ezApi.ezclocker.ezEventEngine.ezWantEvent(
            EzBillingAddressDialog.ezEventNames.onBillingAddressDialogError,
            EzAccountViewController.ezApiName,
            EzAccountViewController.ezInstance.ezHandleOnBillingAddressDialogError);

        globalThis.ezApi.ezclocker.ezEventEngine.ezWantEvent(
            EzClockerContextEventName.onSelectedEmployerAccountChanged,
            EzAccountViewController.ezApiName,
            EzAccountViewController.ezInstance.ezHandleOnSelectedEmployerAccountReadyChanged);

        globalThis.ezApi.ezclocker.ezEventEngine.ezWantEvent(
            EzUpdateCompanyInfoDialog.ezEventNames.onUpdateComputInfoDialogSubmited,
            EzAccountViewController.ezApiName,
            EzAccountViewController.ezInstance.ezHandleOnUpdateCompanyDialogInfoSubmitted);

        globalThis.ezApi.ezclocker.ezEventEngine.ezWantEvent(
            EzClockerContextEventName.onSelectedEmployerLicenseReady,
            EzAccountViewController.ezApiName,
            EzAccountViewController.ezInstance.ezHandleOnSelectedEmployerLicenseReadyOrUpdated);

        globalThis.ezApi.ezclocker.ezEventEngine.ezWantEvent(
            EzClockerContextEventName.onSelectedEmployerLicenseUpdated,
            EzAccountViewController.ezApiName,
            EzAccountViewController.ezInstance.ezHandleOnSelectedEmployerLicenseReadyOrUpdated);

        EzAccountViewController.ezInstance.ezBuildInitialUX();

        EzAccountViewController.ezInstance.ezHandleWindowResize();

        globalThis.ezApi.ezclocker.ezEventEngine.ezWantElementEvent(
            'body',
            EzElementEventName.RESIZE,
            EzAccountViewController.ezApiName,
            EzAccountViewController.ezInstance.ezHandleWindowResize);

        this.ezUpdateState();

        return EzAccountViewController.ezInstance;
    }

    /**
     * @protected @method
     * Presents the user with a spinner while waiting for data events to fire. Once fired, will
     * begin loading the UX with the data.
     */
    ezWaitForReadyStateRequiredEvents() {
        globalThis.ezApi.ezclocker.ezUi.ezPageWaitExecute(
            'Loading account information ...',
            (waitDone) => {
                globalThis.ezApi.ezclocker.ezEventEngine.ezWantEvent(
                    EzAccountViewController.ezEventNames.onStateReady,
                    EzAccountViewController.ezApiName,
                    () => {
                        EzAccountViewController.ezInstance.ezAccountViewReadyState.featureTogglesReady.ezEvent.data.ezApplyViewFeatureToggles('account');

                        // TODO: Finish support for user roles in account page
                        //globalThis.ezApi.ezclocker.ezUserRoleFeatures.ezApplyUserRoleFeaturesForCurrentUser('account');

                        waitDone();
                    });

                globalThis.ezApi.ezclocker.ezEventEngine.ezWantEvent(
                    EzFeatureToggles.ezEventNames.onFeatureTogglesReady,
                    EzAccountViewController.ezApiName,
                    (ezEvent) => {
                        EzAccountViewController.ezInstance.ezApplyReadyStateFlag(
                            'featureTogglesReady',
                            true,
                            ezEvent);
                    },
                    true);

                // TODO: Finish support for user roles in account page
                /*
                globalThis.ezApi.ezclocker.ezEventEngine.ezWantEvent(
                    EzUserRoleFeatures.ezEventNames.onEzUserRoleFeaturesReady,
                    EzAccountViewController.ezApiName,
                    (ezEvent) => {
                        EzAccountViewController.ezInstance.ezApplyReadyStateFlag(
                            'ezUserRoleFeaturesReady',
                            true,
                            ezEvent);

                        // ezEvent.data.ezApplyViewFeatureToggles('account');
                    },
                    true);
                */

                globalThis.ezApi.ezclocker.ezEventEngine.ezWantEvent(
                    EzClockerContextEventName.onSelectedEmployerAccountReady,
                    EzAccountViewController.ezApiName,
                    (ezEvent) => {
                        EzAccountViewController.ezInstance.ezApplyReadyStateFlag(
                            'selectedEmployerAccountReady',
                            true,
                            ezEvent);

                        globalThis.ezApi.ezclocker.ezUi.ezPageWaitExecute(
                            'Loading subscription information ...',
                            (waitDone2) => {
                                globalThis.ezApi.ezclocker.ezEventEngine.ezWantEvent(
                                    EzClockerContextEventName.onSubscriptionContextReady,
                                    EzAccountViewController.ezApiName,
                                    waitDone2,
                                    true);

                                /*
                                globalThis.ezApi.ezclocker.ezLicenseHelper.ezGetEmployerLicense(
                                    globalThis.ezApi.ezclocker.ezClockerContext.ezGetSelectedEmployerAccount().id);
                                */

                                EzAccountViewController.ezInstance.ezHandleOnSelectedEmployerAccountReadyChanged(ezEvent);

                                globalThis.ezApi.ezclocker.ezClockerContext.ezLoadSubscriptionContext();

                                EzAccountViewController.ezInstance.ezInitUX();
                            });
                    },
                    true);

                globalThis.ezApi.ezclocker.ezEventEngine.ezWantEvent(
                    EzClockerContextEventName.onSubscriptionContextActiveSubscriptionReady,
                    EzAccountViewController.ezApiName,
                    (ezEvent) => {
                        EzAccountViewController.ezInstance.ezApplyReadyStateFlag(
                            'subscriptionContextActiveSubscriptionReady',
                            true,
                            ezEvent);

                        EzAccountViewController.ezInstance.ezHandleonSubscriptionContextActiveSubscriptionReadyChanged(ezEvent);
                    },
                    true);

                globalThis.ezApi.ezclocker.ezEventEngine.ezWantEvent(
                    EzClockerContextEventName.onSubscriptionContextBillingInformationReady,
                    EzAccountViewController.ezApiName,
                    (ezEvent) => {
                        EzAccountViewController.ezInstance.ezApplyReadyStateFlag(
                            'subscriptionContextBillingInformationReady',
                            true,
                            ezEvent);

                        EzAccountViewController.ezInstance.ezHandleOnSubscriptionContextBillingInformationReadyChanged(ezEvent);
                    },
                    true);
            });
    }

    /**
     * @protected @method
     * Handles the window resize event
     */
    ezHandleWindowResize() {
        const wHeight = window.innerHeight;

        const bodyHeight = wHeight - globalThis.ezApi.ezclocker.ezUi.ezGetElementHeight('EzPageViewHeader');

        EzAccountViewController.ezInstance.ezUpdateState('accountPageMaxHeight', bodyHeight);

        globalThis.ezApi.ezclocker.ezUi.ezSetElementMaxHeight(
            '_AccountPage',
            bodyHeight);
    }

    /**
     * @public @method
     * Builds the initial UX (called before ezInitUX is called)
     */
    ezBuildInitialUX() {
        globalThis.ezApi.ezclocker.ezUi.ezContent(
            'EzPageViewHeader',
            EzAccountViewController.ezInstance.ezPageHeaderHTML);

        globalThis.ezApi.ezclocker.ezUi.ezSetContent(
            '_AccountPage',
            EzAccountViewController.ezInstance.ezAccountToolbarContainerHtml);

        globalThis.ezApi.ezclocker.ezUi.ezAppendContent(
            '_AccountPage',
            EzAccountViewController.ezInstance.ezBuildAccountViewMainContentHtml());

        window.onscroll = EzAccountViewController.ezInstance.ezHandleWindowOnScrollEvent();
    }

    /**
     * @protected @method
     * Handles the window.onscroll event
     */
    ezHandleWindowOnScrollEvent() {
        if (window.scrollY > globalThis.ezApi.ezclocker.ezUi.ezId('EzPageViewHeader').offsetTop) {
            globalThis.ezApi.ezclocker.ezUi.ezAddElementClass(
                'EzPageViewHeader',
                'ezFixedPageHeader');
        } else {
            globalThis.ezApi.ezclocker.ezUi.ezRemoveElementClass(
                'EzPageViewHeader',
                'ezFixedPageHeader');
        }
    }

    /**
     * @public @method
     * Initializes the UX
     */
    ezInitUX() {
        // Main navigation
        globalThis.ezApi.ezclocker.ezEventEngine.ezWantElementEvent(
            '_NavSchedules',
            EzElementEventName.CLICK,
            EzAccountViewController.ezApiName,
            globalThis.ezApi.ezclocker.ezNavigation.ezNavigateToEmployerSchedules);

        globalThis.ezApi.ezclocker.ezEventEngine.ezWantElementEvent(
            '_NavEmployeeArchive',
            EzElementEventName.CLICK,
            EzAccountViewController.ezApiName,
            globalThis.ezApi.ezclocker.ezNavigation.ezNavigateToEmployeeArchive);

        globalThis.ezApi.ezclocker.ezEventEngine.ezWantElementEvent(
            '_NavDashboard',
            EzElementEventName.CLICK,
            EzAccountViewController.ezApiName,
            globalThis.ezApi.ezclocker.ezNavigation.ezNavigateToEmployerDashboard);

        globalThis.ezApi.ezclocker.ezEventEngine.ezWantElementEvent(
            '_NavSignout',
            EzElementEventName.CLICK,
            EzAccountViewController.ezApiName,
            globalThis.ezApi.ezclocker.ezNavigation.signOut);

        // Edit company info buttons
        globalThis.ezApi.ezclocker.ezEventEngine.ezWantElementEvent(
            '_EditCompanyLogo',
            EzElementEventName.CLICK,
            EzAccountViewController.ezApiName,
            EzAccountViewController.ezInstance.ezEditCompanyLogo);

        globalThis.ezApi.ezclocker.ezEventEngine.ezWantElementEvent(
            '_EditCompanyInformation',
            EzElementEventName.CLICK,
            EzAccountViewController.ezApiName,
            globalThis.ezApi.ezclocker.ezUpdateCompanyInfoDialog.ezShow);

        globalThis.ezApi.ezclocker.ezEventEngine.ezWantElementEvent(
            '_EditBillingAddress',
            EzElementEventName.CLICK,
            EzAccountViewController.ezApiName,
            EzAccountViewController.ezInstance.ezEditBillingAddress);

        globalThis.ezApi.ezclocker.ezEventEngine.ezWantElementEvent(
            '_UpdateCreditCard',
            EzElementEventName.CLICK,
            EzAccountViewController.ezApiName,
            EzAccountViewController.ezInstance.ezEditCreditCardInfo);

        globalThis.ezApi.ezclocker.ezEventEngine.ezWantElementEvent(
            EzSubscriptionInfoViewController.ezInstance.ezIds.buttons.ezCancelSubscriptionButtonId,
            EzElementEventName.CLICK,
            EzAccountViewController.ezApiName,
            EzAccountViewController.ezInstance.handleCancelSubscription);

        globalThis.ezApi.ezclocker.ezEventEngine.ezWantElementEvent(
            '_CancelSubscriptionForm',
            EzElementEventName.SUBMIT,
            EzAccountViewController.ezApiName,
            EzAccountViewController.ezInstance.handleCancelSubscription);

        globalThis.ezApi.ezclocker.ezEventEngine.ezWantElementEvent(
            '_CancelSubscriptionForm2',
            EzElementEventName.SUBMIT,
            EzAccountViewController.ezApiName,
            EzAccountViewController.ezInstance.handleCancelSubscription);

        globalThis.ezApi.ezclocker.ezEventEngine.ezWantElementEvent(
            EzSubscriptionInfoViewController.ezInstance.ezIds.buttons.ezDeleteAccountButtonId,
            EzElementEventName.CLICK,
            EzAccountViewController.ezApiName,
            globalThis.ezApi.ezclocker.ezDeleteAccountWizard.ezDeleteEmployerAccount);

        globalThis.ezApi.ezclocker.ezEventEngine.ezWantElementEvent(
            EzAccountViewController.ezInstance.ezIds.buttons.changeEmployerAccountPasswordButtonId,
            EzElementEventName.CLICK,
            EzAccountViewController.ezApiName,
            globalThis.ezApi.ezclocker.ezChangeAccountPasswordDialog.ezShow);

        globalThis.ezApi.ezclocker.ezEventEngine.ezWantElementEvent(
            EzAccountViewController.ezInstance.ezIds.buttons.changeEmployerEmailButtonId,
            EzElementEventName.CLICK,
            EzAccountViewController.ezApiName,
            globalThis.ezApi.ezclocker.ezChangeUsernamePasswordDialog.ezShow);

        globalThis.ezApi.ezclocker.ezEventEngine.ezWantElementEvent(
            'EZOPTION_ALLOW_AUTOMATIC_BREAKS',
            EzElementEventName.CLICK,
            EzAccountViewController.ezApiName,
            EzAccountViewController.ezInstance.ezHandleAllowAutomaticBreaksCheckboxClick);

        EzAccountViewController.ezInstance.ezLoadCompanyLogo();

        globalThis.ezApi.ezclocker.ezAccountPreferences.ezInitUX();

        globalThis.ezApi.ezclocker.ezAccountNavButton.ezActiveOptionValue = EzAccountNavButtonActiveOption.ACCOUNT_DETAILS_OPTION;

        globalThis.ezApi.ezclocker.ezHelp.ezEnableHelp('EzShowHelpButton');
    }

    /**
     * @public @method
     * Builds the Account view's main content html
     */
    ezBuildAccountViewMainContentHtml() {
        return EzHtml.build`
            <div
                id="_EzClockerMainContent"
                class="ezContentView">
                <div
                    id="_AccountToolsContainer"
                    class="ezSubContentView">
                    ${EzAccountViewController.ezInstance.ezAccountPreferencesHtml}
                    ${EzAccountViewController.ezInstance.ezAccountInformationHtml}
                    ${EzAccountViewController.ezInstance.ezCompanyInfoHtml}
                </div>
            </div>`;
    }

    /**
     * @public @method
     * Shows the edit company logo dialog
     */
    ezEditCompanyLogo() {
        globalThis.ezApi.ezclocker.ezEmployerLogoController.ezShow(
            () => EzAccountViewController.ezInstance.ezLoadCompanyLogo(),
            (eResponse) => {
                globalThis.ezApi.ezclocker.ezLogger.error(`Failed to upload company logo: ${EzJson.toJson(eResponse)}`);

                globalThis.ezApi.ezclocker.ezDialog.ezShowNon200ServiceError(
                    'Logo Upload Error',
                    eResponse,
                    'Unable to upload your company logo at this time.');
            });
    }

    /**
     * @public @method
     * Loads the company logo into the UX
     */
    ezLoadCompanyLogo() {
        return globalThis.ezApi.ezclocker.ezEmployerService.ezLoadEmployerImage(
            globalThis.ezApi.ezclocker.ezClockerContext.ezGetSelectedEmployerAccount().id)
            .then(
                (imageUrl) => {
                    EzAccountViewController.ezInstance.ezUpdateState('companyLogo', imageUrl);

                    globalThis.ezApi.ezclocker.ezUi.setImgElementSrc(
                        EzAccountViewController.ezInstance.ezIds.images.pageHeaderEmployerLogoImageId,
                        imageUrl);

                    globalThis.ezApi.ezclocker.ezUi.setImgElementSrc(
                        EzAccountViewController.ezInstance.ezIds.images.accountPageExampleEmployerLogo,
                        imageUrl);
                });
    }

    /**
     * @public @method
     * Shows the edit billing address dialog
     */
    ezEditBillingAddress() {
        globalThis.ezApi.ezclocker.ezBillingAddressDialog.ezShow();
    }

    /**
     * @protected @method
     * Handles EzBillingAddressDialog.ezEventNames.onBillingAddressDialogSubmitted
     * Updated billing address object: eventData.data
     * @param {Object} eventData
     */
    ezHandleOnBillingAddressDialogSubmitted(eventData) {
        if (!EzObject.isValid(eventData) || !EzObject.isValid(eventData.data)) {
            throw new EzBadParamException(
                'eventData',
                EzAccountViewController.ezInstance,
                EzAccountViewController.ezInstance.ezHandleOnBillingAddressDialogSubmitted);
        }

        globalThis.ezApi.ezclocker.ezClockerContext.ezLoadSubscriptionContextBillingInformation();

        if (EzObject.isValid(eventData.data.entity)) {
            globalThis.ezApi.ezclocker.ezClockerContext.ezSetSubscriptionContextBillingAddress(eventData.data.entity);
        } else {
            globalThis.ezApi.ezclocker.ezClockerContext.ezSetSubscriptionContextBillingAddress(eventData.data);
        }
    }

    /**
     * @protected @method
     * Handles onBillingAddressDialogError event eResponse on: eventData.data
     * @param {Object} eventData
     */
    ezHandleOnBillingAddressDialogError(eventData) {
        if (!EzObject.isValid(eventData) || !EzObject.isValid(eventData.data)) {
            throw new EzBadParamException(
                'eventData',
                EzAccountViewController.ezInstance,
                EzAccountViewController.ezInstance.ezHandleOnBillingAddressDialogError);
        }

        globalThis.ezApi.ezclocker.ezLogger.error(`Failed to update billing address: ${EzJson.toJson(eventData.data)}`);

        globalThis.ezApi.ezclocker.ezClockerContext.ezLoadSubscriptionContextBillingInformation()
            .then(
                () => globalThis.ezApi.ezclocker.ezDialog.ezShowError(
                    'Billing Address',
                    eventData.data.message,
                    globalThis.ezApi.ezclocker.ezBillingAddressDialog.ezShow));
    }

    /***
     * @protected @method
     * Handles the selected employer ready and updated events
     * @param {object} ezEvent
     * ezEvent.data = EzClockerContext.ezInstance.ezGetSelectedEmployerAccountData();
     * Example Object:
     * {
     *     account: EzClockerContext.ezInstance.ezGetSelectedEmployerAccount(),
     *     employees: EzClockerContext.ezInstance.employerContext.selectedEmployerAccountEmployeeAccounts,
     *     options: EzClockerContext.ezInstance.employerContext.selectedEmployerAccountOptions,
     *     license: EzClockerContext.ezInstance.ezGetSelectedEmployerAccountLicense()
     * };
     */
    ezHandleOnSelectedEmployerAccountReadyChanged(eventData) {
        EzAccountViewController.ezInstance.ezUpdateCompanyInfoUI(eventData.data.account);
    }

    /**
     * @protected @method
     * Handles the EzUpdateCompanyInfoDialog's onUpdateComputInfoDialogSubmited
     * @param {object} ezEvent
     * ezEvent.data = EzClockerContext.ezInstance.ezGetSelectedEmployerAccountData();
     * Example Object:
     * {
     *     account: EzClockerContext.ezInstance.ezGetSelectedEmployerAccount(),
     *     employees: EzClockerContext.ezInstance.employerContext.selectedEmployerAccountEmployeeAccounts,
     *     options: EzClockerContext.ezInstance.employerContext.selectedEmployerAccountOptions,
     *     license: EzClockerContext.ezInstance.ezGetSelectedEmployerAccountLicense()
     * };
     */
    ezHandleOnUpdateCompanyDialogInfoSubmitted(ezEvent) {
        EzAccountViewController.ezInstance.ezUpdateCompanyInfoUI(ezEvent.data.account);
    }

    /**
     * @protected @method
     * Handles the billing information's ready and changed events.
     * Billing information available at: eventData.data
     * @param {object} ezEvent
     * ezEvent.data = EzClockerContext.ezInstance.ezSubscriptionContext.activeBillingInformation
     */
    ezHandleOnSubscriptionContextBillingInformationReadyChanged(eventData) {
        EzAccountViewController.ezInstance.ezUpdateBillingAddressUI(eventData.data);
    }

    /**
     * @protected @method
     * Handles the billing information's ready and changed events.
     * Billing information available at: eventData.data
     * @param {object} ezEvent
     * ezEvent.data = EzClockerContext.ezInstance.ezSubscriptionContext.activeSubscription
     */
    ezHandleonSubscriptionContextActiveSubscriptionReadyChanged() {
        EzAccountViewController.ezInstance.ezUpdateBillingAddressUI(
            globalThis.ezApi.ezclocker.ezClockerContext.ezGetSubscriptionContext().activeBillingInformation);
    }

    /**
     * @public @method
     * Builds the 'loading snake' spinner html
     * @returns {string}
     */
    ezBuildSnakeSpinner(height) {
        EzHtml.build`
            <img
                id="EzLoadingEmployerNameSpinner"
                src="/public/images/spinners/infinity-snake-spinner-orange.svg"
                style="height:${EzNumber.numberOrDefault(height, 52)}px"/>`;
    }

    /**
     * @public @method
     * Updates the company information ui
     */
    ezUpdateCompanyInfoUI(companyInfo) {
        if (!EzObject.isValid(companyInfo)) {
            throw new EzBadParamException(
                'companyInfo',
                EzAccountViewController.ezInstance,
                EzAccountViewController.ezInstance.ezUpdateCompanyInfoUI);
        }

        if (!companyInfo.ready) {
            globalThis.ezApi.ezclocker.ezUi.ezSetContent(
                EzAccountViewController.ezInstance.ezIds.containers.pageHeaderEmployerNameContainerId,
                EzSpinner.ezBuildSnakeSpinner(52));

            globalThis.ezApi.ezclocker.ezUi.ezSetContent(
                'EzCompanyInfoName',
                EzSpinner.ezBuildSnakeSpinner(16));

            globalThis.ezApi.ezclocker.ezUi.ezSetContent(
                'EzCompanyInfoStreetAddress',
                EzSpinner.ezBuildSnakeSpinner(16));

            globalThis.ezApi.ezclocker.ezUi.ezSetContent(
                'EzCompanyInfoAdditionalAddress',
                EzSpinner.ezBuildSnakeSpinner(16));

            globalThis.ezApi.ezclocker.ezUi.ezSetContent(
                'EzCompanyInfoCity',
                EzSpinner.ezBuildSnakeSpinner(16));

            globalThis.ezApi.ezclocker.ezUi.ezSetContent(
                'EzCompanyInfoState',
                EzSpinner.ezBuildSnakeSpinner(16));

            globalThis.ezApi.ezclocker.ezUi.ezSetContent(
                'EzCompanyInfoPostalCode',
                EzSpinner.ezBuildSnakeSpinner(16));
            /*
            globalThis.ezApi.ezclocker.ezUi.ezSetContent(
                pageHeaderEmployerNameContainerId'EzCompanyInfoContactName',
                EzSpinner.ezBuildSnakeSpinner(16));
            */
            globalThis.ezApi.ezclocker.ezUi.ezSetContent(
                'EzCompanyInfoContactPhone',
                EzSpinner.ezBuildSnakeSpinner(16));
            /*
            globalThis.ezApi.ezclocker.ezUi.ezSetContent(
                'EzCompanyInfoContactMobilePhone',
                EzSpinner.ezBuildSnakeSpinner(16));
            */
            /*
            globalThis.ezApi.ezclocker.ezUi.ezSetContent(
                'EzCompanyInfoContactEmail',
                EzSpinner.ezBuildSnakeSpinner(16));
            */
        } else {
            globalThis.ezApi.ezclocker.ezUi.ezSetContent(
                EzAccountViewController.ezInstance.ezIds.containers.pageHeaderEmployerNameContainerId,
                EzString.stringOrEmpty(companyInfo.employerName));
            globalThis.ezApi.ezclocker.ezUi.ezSetContent(
                '_CompanyNameForLogo',
                EzString.stringOrEmpty(companyInfo.employerName));
            globalThis.ezApi.ezclocker.ezUi.ezSetContent(
                'EzCompanyInfoName',
                EzString.stringOrEmpty(companyInfo.employerName));
            globalThis.ezApi.ezclocker.ezUi.ezSetContent(
                'EzCompanyInfoStreetAddress',
                EzString.stringOrEmpty(companyInfo.streetAddress));
            globalThis.ezApi.ezclocker.ezUi.ezSetContent(
                'EzCompanyInfoAdditionalAddress',
                EzString.stringOrEmpty(companyInfo.additionalAddress));
            globalThis.ezApi.ezclocker.ezUi.ezSetContent(
                'EzCompanyInfoCity',
                EzString.stringOrEmpty(companyInfo.city));
            globalThis.ezApi.ezclocker.ezUi.ezSetContent(
                'EzCompanyInfoState',
                EzString.stringOrEmpty(companyInfo.address_state));
            globalThis.ezApi.ezclocker.ezUi.ezSetContent(
                'EzCompanyInfoPostalCode',
                EzString.stringOrEmpty(companyInfo.address_postalcode));
            /*
            globalThis.ezApi.ezclocker.ezUi.ezSetContent(
                'EzCompanyInfoContactName',
                EzString.stringOrEmpty(companyInfo.addressPostalcode));
            */
            globalThis.ezApi.ezclocker.ezUi.ezSetContent(
                'EzCompanyInfoContactPhone',
                EzString.stringOrEmpty(companyInfo.mainContactNumber));
            /*
            globalThis.ezApi.ezclocker.ezUi.ezSetContent(
                'EzCompanyInfoContactMobilePhoneCols',
                EzString.stringOrEmpty(companyInfo.addressPostalcode));
            */
            /*
            globalThis.ezApi.ezclocker.ezUi.ezSetContent(
                'EzCompanyInfoContactEmail',
                EzString.stringOrEmpty(companyInfo.addressPostalcode));
            */
        }
    }

    /**
     * @public @method
     * Updates the active employer's billing address information in the UX
     */
    ezUpdateBillingAddressUI(billingAddressInfo) {
        if (!EzObject.isValid(billingAddressInfo)) {
            throw new EzBadParamException(
                'billingAddressInfo',
                self,
                EzAccountViewController.ezInstance.ezUpdateBillingAddressUI);
        }

        if (EzBoolean.isFalse(billingAddressInfo.ready)) {
            globalThis.ezApi.ezclocker.ezUi.ezContent(
                '_BillingAddress_Name',
                EzSpinner.ezBuildSnakeSpinner(16));

            /*
            globalThis.ezApi.ezclocker.ezUi.ezContent(
            'EzBillingAddressContactPhone',
                EzSpinner.ezBuildSnakeSpinner(16));
            */

            /* globalThis.ezApi.ezclocker.ezUi.ezContent(
            'EzBillingAddressContactEmail',
                EzSpinner.ezBuildSnakeSpinner(16));
            */
            globalThis.ezApi.ezclocker.ezUi.ezContent(
                '_BillingAddress_StreetAddress',
                EzSpinner.ezBuildSnakeSpinner(16));

            globalThis.ezApi.ezclocker.ezUi.ezContent(
                '_BillingAddress_City',
                EzSpinner.ezBuildSnakeSpinner(16));

            globalThis.ezApi.ezclocker.ezUi.ezContent(
                '_BillingAddress_State',
                EzSpinner.ezBuildSnakeSpinner(16));

            globalThis.ezApi.ezclocker.ezUi.ezContent(
                '_BillingAddress_Zip',
                EzSpinner.ezBuildSnakeSpinner(16));
            /*
            globalThis.ezApi.ezclocker.ezUi.ezContent(
                'EzBillingAddressCountry',
                EzSpinner.ezBuildSnakeSpinner(16));
            */
        } else {
            let billindAddressContactName = EzString.msg`
                ${EzString.stringOrEmpty(billingAddressInfo.billingFirstName)}
                ${EzString.stringOrEmpty(billingAddressInfo.billingLastName)}`;

            globalThis.ezApi.ezclocker.ezUi.ezContent(
                '_BillingAddress_Name',
                EzString.stringOrDefault(billindAddressContactName));

            /* TODO: Add collection and display of billing contact number
            globalThis.ezApi.ezclocker.ezUi.ezContent(
                'EzBillingAddressContactPhone',
                EzString.stringOrEmpty(billingAddressInfo.billingContactNumber));
            */

            /* TODO: Add collection and display of billing email address
            globalThis.ezApi.ezclocker.ezUi.ezContent(
                'EzBillingAddressContactEmail',
                EzString.stringOrEmpty(billingAddressInfo.billingEmail));
            */

            globalThis.ezApi.ezclocker.ezUi.ezContent(
                '_BillingAddress_StreetAddress',
                EzString.stringOrEmpty(billingAddressInfo.billingStreetAddress));

            globalThis.ezApi.ezclocker.ezUi.ezContent(
                '_BillingAddress_City',
                EzString.stringOrEmpty(billingAddressInfo.billingCity));

            globalThis.ezApi.ezclocker.ezUi.ezContent(
                '_BillingAddress_State',
                EzString.stringOrEmpty(billingAddressInfo.billingState));

            globalThis.ezApi.ezclocker.ezUi.ezContent(
                '_BillingAddress_Zip',
                EzString.stringOrEmpty(billingAddressInfo.billingPostalCode));

            /*  TODO: Add collection and display of billing country
            globalThis.ezApi.ezclocker.ezUi.ezContent(
                'EzBillingAddressCountry',
                EzString.stringOrEmpty(billingAddressInfo.billingCountry));
            */
        }
    }

    /**
     * @protected @method
     * Handles the billing address ready and changed events.
     * Billing address info available at: eventData.data
     * @param {EventData} eventData
     */
    ezHandleOnSubscriptionContextBillingAddressReadyChanged(eventData) {
        EzAccountViewController.ezInstance.ezUpdateBillingAddressUI(eventData.data);
    }

    /**
     * @protected @method
     * Updates the credit card information in the ui
     * Credit card data avaialble at: eventData.data
     */
    ezHandleOnSubscriptionContextCreditCardReadyChanged() {
        EzAccountViewController.ezInstance.ezUpdateCreditCardUI(
            globalThis.ezApi.ezclocker.ezClockerContext.ezGetSubscriptionContext().activeCreditCard);
    }

    /**
     * @protected @method
     * Handles the onUpdateCreditCardDialogSubmit event
     * @param {Object} ezEvent
     * {
     *     "triggerOwner":"ezUpdateCreditCardDialog",
     *     "message":"Update credit card dialog submitted with success",
     *     "data":{
     *         "dialogController":{ ... },
     *         "response":{
     *             "errorCode":0,
     *             "message":"Success",
     *             "creditCardInfo":{ ... },
     *             "status":"success"
     *         }
     *     }
     * }
     */
    ezHandleOnUpdateCreditCardDialogSubmit(ezEvent) {
        ezEvent.data.response.creditCardInfo.ready = true;

        globalThis.ezApi.ezclocker.ezClockerContext.ezSetSubscriptionContextCreditCardInfo(ezEvent.data.response.creditCardInfo);
    }

    /**
     * @public @method
     * Updates the credit information in the UI
     * @param {Object} creditCardInfo
     */
    ezUpdateCreditCardUI() {
        let creditCardInfo = globalThis.ezApi.ezclocker.ezClockerContext?.ezSubscriptionContext?.activeCreditCard;

        if (creditCardInfo?.ready) {
            globalThis.ezApi.ezclocker.ezUi.ezContent(
                'EzCreditCardType',
                EzHtml.build`
                    <img
                        id="EzCreditCardTypeImg"
                        class="ezCreditCardTypeImg"
                        src="${EzString.stringWithLengthOrDefault(creditCardInfo?.creditCardImageUrl, EzAccountViewController.GENERIC_CREDITCARD_IMG_URL)}"/>`);

            globalThis.ezApi.ezclocker.ezUi.ezContent(
                'EzCreditCardLastFour',
                EzString.stringWithLengthOrDefault(
                    creditCardInfo?.cardLastFour,
                    EzString.DASH));

            globalThis.ezApi.ezclocker.ezUi.ezContent(
                'EzCreditCardNameOnCard',
                EzString.stringWithLengthOrDefault(
                    creditCardInfo?.cardHolderName,
                    EzString.DASH));

            globalThis.ezApi.ezclocker.ezUi.ezContent(
                'EzCreditCardExpireDate',
                EzString.stringWithLengthOrDefault(
                    globalThis.ezApi.ezclocker.ezDateTime.ezIsoToDisplayMonthYear(creditCardInfo?.cardExpireIsoDate),
                    EzDateTime.NEVER_SET_DISPLAY_DATE));
        }
    }

    /**
     * @public @method
     * Shows the edit credit card information dialog.
     */
    ezEditCreditCardInfo() {
        globalThis.ezApi.ezclocker.ezUpdateCreditCardDialog.ezShow();
    }

    /**
     * @public @method
     * Shows bug error dialog for this view
     * @param {Object|null} jqXHR
     * @param {Object|null} eResponse
     * @param {String|null} eMessage
     * @param {Function|null} errorCloseAction
     */
    ezShowViewBug(jqXHR, eResponse, eMessage, errorCloseAction) {
        let em = EzString.hasLength(eMessage)
            ? eMessage
            : EzString.EMPTY;

        em += EzObject.isValid(eResponse) && EzString.hasLength(eResponse.message)
            ? eResponse.message
            : `Error: ${EzJson.toJson(eResponse)}`;

        globalThis.ezApi.ezclocker.ezDialog.ezReportInternalBugDialog(
            jqXHR,
            'Account View Error',
            em,
            globalThis.ezApi.ezToJson(eResponse),
            errorCloseAction);
    }

    /**
     * @protected @method
     * Handles canceling the subscription
     */
    handleCancelSubscription() {
        globalThis.ezApi.ezclocker.ezDialog.ezActionDialog(
            'Cancel Subscription',
            EzString.msg`
                <h3>
                    Confirm Cancel Subscription
                </h3>
                <p>
                    Please note that your remaining subscription time will need to expire before you can re-subscribe or
                    switch to the free plan.
                </p>`,
            [
                {
                    id: 'EzConfirmCancelSubscriptionButton',
                    text: 'Yes, cancel my subscription',
                    style: 'background-color:var(--ezClockerWarnning);color:var(--ezClockerWhite)',
                    click: () => {
                        globalThis.ezApi.ezclocker.ezDialog.ezCloseDialog('EzCancelSubscriptionDialog');

                        return globalThis.ezApi.ezclocker.ezAccountSubscriptionActions.ezFeedbackAndCancelSubscription()
                            .then(globalThis.ezApi.ezclocker.ezSubscriptionPlansView.ezUpdateUXState);
                    }
                },
                {
                    id: 'EzDoNotCancelSubscriptionButton',
                    text: 'No, do not cancel my subscription',
                    click: () => globalThis.ezApi.ezclocker.ezDialog.ezCloseDialog('EzCancelSubscriptionDialog')
                }
            ],
            '_HideDialogsDiv',
            'auto',
            'auto',
            'EzCancelSubscriptionDialog');

        globalThis.ezApi.ezclocker.ezUi.ezFocus('EzDoNotCancelSubscriptionButton');
    }

    /**
     * @protected @method
     * Handles the EzClockerContextEventName.onSelectedEmployerAccountReady event.
     */
    ezHandleOnSelectedEmployerLicenseReadyOrUpdated() {
        globalThis.ezApi.ezclocker.ezClockerContext.ezValidateSelectedEmployerAccountLicense();
    }

    /**
     * @public @method
     * Determines if the employer's license is expired or not.
     * @returns {Promise}
     */
    checkLicenseExpired() {
        return EzPromise.promise(
            (resolve, reject) => {
                let expiredParamValue = globalThis.ezApi.ezclocker.ezUrlHelper.getUrlParam('expired');

                EzAccountViewController.ezInstance.ezUpdateState(
                    'urlParams',
                    {
                        expired: expiredParamValue
                    });

                if (!EzString.hasLength(expiredParamValue)) {
                    return resolve();
                }

                let em = 'License Expired';

                return globalThis.ezApi.ezclocker.ezDialog.ezShowMessage(
                    'License Expired',
                    EzString.em`
                        Your license is not currently valid. Please update your billing information and/or select a license
                        plan that fits the number of employees you currently have.`,
                    reject(em));
            });
    }

    /**
     * @protected @method
     * Handles the license valid event
     * @param {object} ezEvent
     * Event data located within the ezEvent parameter in one of two possible ways:
     * 1) ezEvent.data ={
     *      errorCode: 0,
     *      message: EzString.EMPTY,
     *      needToPay: false,
     *      needToArchive: false,
     *      needToSignIn: false,
     *      license: license
     *  }
     * 2) ezEvent = {
     *      errorCode: 500,
     *      message: 'Your ezClocker free trial has expired.',
     *      needToPay: true,
     *      needToArchive: false,
     *      needToSignIn: false,
     *      license: license
     *  }
     */
    ezLicenseValidHandler(ezEvent) {
        if (!ezEvent?.data) {
            // ezEvent.data is missing, duplicate ezEvent to ezEvent.data property.
            ezEvent.data = {
                errorCode: ezEvent?.errorCode,
                message: ezEvent?.message,
                needToPay: ezEvent?.needToPay,
                needToArchive: ezEvent?.needToArchive,
                needToSignIn: ezEvent?.needToSignIn,
                license: ezEvent?.license,
            };
        }

        EzAccountViewController.ezInstance.ezUpdateState(
            'license',
            {
                status: 'VALID',
                data: ezEvent.data
            });

        globalThis.ezApi.ezclocker.ezEventEngine.ezTriggerEvent(
            EzAccountViewController.ezEventNames.onEzAccountViewControllerLicenseProcessingCompleted,
            ezEvent);
    }

    /**
     * @protected @method
     * Handles the free trial expired event
     * @param {Object} ezEvent
     * Event data located within the ezEvent parameter in one of two possible ways:
     * 1) ezEvent.data ={
     *      errorCode: 500,
     *      message: 'Your ezClocker free trial has expired.',
     *      needToPay: true,
     *      needToArchive: false,
     *      needToSignIn: false,
     *      license: license
     *  }
     * 2) ezEvent = {
     *      errorCode: 500,
     *      message: 'Your ezClocker free trial has expired.',
     *      needToPay: true,
     *      needToArchive: false,
     *      needToSignIn: false,
     *      license: license
     *  }
     */
    ezFreeTrialExpiredHandler(ezEvent) {
        if (!ezEvent?.data) {
            // ezEvent.data is missing, duplicate ezEvent to ezEvent.data property.
            ezEvent.data = {
                errorCode: ezEvent?.errorCode,
                message: ezEvent?.message,
                needToPay: ezEvent?.needToPay,
                needToArchive: ezEvent?.needToArchive,
                needToSignIn: ezEvent?.needToSignIn,
                license: ezEvent?.license,
            };
        }

        globalThis.ezApi.ezclocker.ezEventEngine.ezTriggerEvent(
            EzAccountViewController.ezEventNames.onEzAccountViewControllerLicenseProcessingCompleted,
            ezEvent);

        const activeEmployerLicense = globalThis.ezApi.ezclocker.ezClockerContext.ezGetActiveEmployerLicense();

        let paymentAction;

        let userAction;

        if (activeEmployerLicense?.subscriptionPlan?.id) {
            paymentAction = () => globalThis.ezApi.ezclocker.ezAccountSubscriptionActions.ezCollectPaymentFromCustomer(activeEmployerLicense.subscriptionPlan);

            userAction = EzHtml.build`
                <p
                    id="EzSubscriptionFreeTrialExpiredDialog_UserActionMessage">
                    To continue using ezClocker with your current subscription you will need to enter your payment information in the next dialog propt.
                </p>`;
        }
        else {
            paymentAction = () => { /* no payment action to perform */ };

            userAction = EzHtml.build`
                <p
                    id="EzSubscriptionFreeTrialExpiredDialog_UserActionMessage">
                    To continue using ezClocker either select the free subscription (with one employee) or enter your payment information.
                </p>`;
        }

        EzAccountViewController.ezInstance.ezUpdateState(
            'license',
            {
                status: 'FREE_TRIAL_EXPIRED',
                data: ezEvent.data,
                paymentAction,
                userAction
            });

        globalThis.ezApi.ezclocker.ezDialog.ezShowOK(
            'Free Trial Expired',
            EzHtml.build`
                <h3
                    id="EzSubscriptionFreeTrialExpiredDialog_Title">
                    Your free trial period has ended.
                </h3>
                ${userAction}`)
            .then(paymentAction);
    }

    /**
     * @protected @method
     * Handles the free trial expired event
     * @param {Object} ezEvent
     * Event data located within the ezEvent parameter in one of two possible ways:
     * 1) ezEvent.data = {
     *      errorCode: 500,
     *      message: {VIOLATION_MESSAGE},
     *      needToPay: false,
     *      needToArchive: true,
     *      needToSignIn: false,
     *      license: license
     *   }
     * 2) ezEvent = {
     *      errorCode: 500,
     *      message: {VIOLATION_MESSAGE},
     *      needToPay: false,
     *      needToArchive: true,
     *      needToSignIn: false,
     *      license: license
     *   }
     */
    ezLicenseViolationHandler(ezEvent) {
        if (!ezEvent?.data) {
            // ezEvent.data is missing, duplicate ezEvent to ezEvent.data property.
            ezEvent.data = {
                errorCode: ezEvent?.errorCode,
                message: ezEvent?.message,
                needToPay: ezEvent?.needToPay,
                needToArchive: ezEvent?.needToArchive,
                needToSignIn: ezEvent?.needToSignIn,
                license: ezEvent?.license,
            };
        }

        globalThis.ezApi.ezclocker.ezEventEngine.ezTriggerEvent(
            EzAccountViewController.ezEventNames.onEzAccountViewControllerLicenseProcessingCompleted,
            ezEvent);

        let violationMsg;

        let violationActions;

        if (401 === ezEvent?.data?.errorCode || 401 === ezEvent?.errorCode) {
            violationMsg = EzHtml.build`
                EzClocker has detected an issue with your subscription:
                The number of active employees exceeds your subscription's maximum limit.`;

            violationActions = EzHtml.build`
                <p
                    id="EzLicenseErrorDialog_UserAction">
                    You need to upgrade to a subscription that allows the number of employees you have
                    or archive employees until your employee count is less than or equal to the license's
                    employee limit.
                </p>`;
        } else {
            violationMsg = ezEvent?.data?.message || ezEvent?.message;

            if (!EzString.hasLength(violationMsg)) {
                violationMsg = 'EzClocker has detected a problem with your subscription.';
            }

            violationActions = EzHtml.build`
                <p
                    id="EzSubscriptionViolationDialog_UserActions">
                    Please contact ezClocker support at
                    <a
                        id="EzLicenseErrorDialog_EmailSupportLink"
                        href="mailto:support@ezclocker.com?title='EzClocker Detected a Problem with My Account'">
                        support@ezclocker.com
                    </a>
                    at your earliest convenience so support can evaluate your account and prevent any disruption or issues.
                </p>`;
        }

        EzAccountViewController.ezInstance.ezUpdateState(
            'license',
            {
                status: 'VIOLATION',
                data: ezEvent.data,
                violationMessage: violationMsg,
                violationActions
            });

        globalThis.ezApi.ezclocker.ezDialog.ezShowWarning(
            'Subscription Violation',
            EzHtml.build`
                <h3
                    id="EzSubscriptionViolationDialog_Mssage">
                    ${violationMsg}
                </h3>
                ${violationActions}`,
            null,
            500,
            'auto')
            .then(globalThis.ezApi.ezIgnoreResolve);
    }

    /**
     * @protected @method
     * License expired, prompt for payment
     * @param {object} ezEvent
     * Event data at either:
     * 1) ezEvent.data = {
     *      errorCode: 500,
     *      message: {expired_message}
     *      needToPay: true,
     *      needToArchive: false,
     *      needToSignIn: false,
     *      license: license
     *   }
     * 2) ezEvent = {
     *      errorCode: 500,
     *      message: {expired_message}
     *      needToPay: true,
     *      needToArchive: false,
     *      needToSignIn: false,
     *      license: license
     *   }
     */
    ezLicenseExpiredHandler(ezEvent) {
        if (!ezEvent?.data) {
            // ezEvent.data is missing, duplicate ezEvent to ezEvent.data property.
            ezEvent.data = {
                errorCode: ezEvent?.errorCode,
                message: ezEvent?.message,
                needToPay: ezEvent?.needToPay,
                needToArchive: ezEvent?.needToArchive,
                needToSignIn: ezEvent?.needToSignIn,
                license: ezEvent?.license,
            };
        }

        globalThis.ezApi.ezclocker.ezEventEngine.ezTriggerEvent(
            EzAccountViewController.ezEventNames.onEzAccountViewControllerLicenseProcessingCompleted,
            ezEvent);

        const activeEmployerLicense = globalThis.ezApi.ezclocker.ezClockerContext.ezGetActiveEmployerLicense();

        let expireActions;

        let paymentAction;

        if (EzSubscriptionPlanProvider.APPLE_SUBSCRIPTION === activeEmployerLicense?.subscriptionProvider) {
            paymentAction = () => { /* no payment action to perform */ };

            expireActions = EzHtml.build`
                <p
                    id="EzSubscriptionExpiredDialog_Action">
                    Since your subscription is managed by Apple you must update your subscription within the ezClocker mobile app
                    by tapping the  on the Subscription screen.
                </p>
                <p
                    id="EzSubscriptionExpiredDialog_AdditionalHelp">
                    If you have any questions about your ezClocker Apple subscription please contact ezClocker support at
                    <a
                        href="mailto://support@ezclocker.com">
                        support@ezclocker.com
                    </a>.
                </p>`;
        } else if (EzSubscriptionPlanProvider.GOOGLE_PLAY_SUBSCRIPTION === activeEmployerLicense?.subscriptionProvider) {
            paymentAction = () => {
                /* no payment action to perform */
            };

            expireActions = EzHtml.build`
                <p
                    id="EzSubscriptionExpiredDialog_Action">
                    Your subscription is managed by Google Play and you can only modify or update your subscription through your Google Play account.
                </p>
                <p
                    id="EzSubscriptionExpiredDialog_AdditionalHelp">
                    If you have any problems updating or renewing your subscription please contact our support team via email at
                    <a
                        href="mailto://support@ezclocker.com">
                        support@ezclocker.com
                    </a>
                    or call 800-769-8174.
                </p>`;
        } else if (EzSubscriptionPlanProvider.BRAINTREEPAYMENTS_SUBSCRIPTION === activeEmployerLicense?.subscriptionProvider) {
            paymentAction = () => globalThis.ezApi.ezclocker.ezAccountSubscriptionActions.ezCollectPaymentFromCustomer(activeEmployerLicense.subscriptionPlan);

            expireActions = EzHtml.build`
                <p
                    id="EzSubscriptionExpiredDialog_UserActionMessage">
                    To continue using ezClocker click the OK button below to enter or update your payment information.
                </p>`;
        } else {
            paymentAction = () => { /* no payment action to perform */ };

            expireActions = EzHtml.build`
                <p
                    id="EzSubscriptionExpiredDialog_UserActionMessage">
                    To continue using ezClocker either select the Free subscription (with one employee) or select the paid subscription
                    plan you prefer.
                </p>`;
        }

        EzAccountViewController.ezInstance.ezUpdateState(
            'license',
            {
                paymentAction,
                expireActions,
                status: 'EXPIRED',
                data: ezEvent.data
            });

        globalThis.ezApi.ezclocker.ezDialog.ezShowOK(
            'Subscription Expired',
            EzHtml.build`
                <h3
                    id="EzSubscriptionExpiredDialog_Title">
                    Your Subscription Is Expired
                </h3>
                ${expireActions}`,
            null,
            800,
            'auto')
            .then(paymentAction);
    }

    /**
     * @protected @method
     * Handles the license error event
     * @param {object} ezEvent
     * Event data at either:
     * 1) ezEvent.data = {
     *      errorCode: 500,
     *      message: {expired_message}
     *      needToPay: true,
     *      needToArchive: false,
     *      needToSignIn: false,
     *      license: license
     *   }
     * 2) ezEvent = {
     *      errorCode: 500,
     *      message: {expired_message}
     *      needToPay: true,
     *      needToArchive: false,
     *      needToSignIn: false,
     *      license: license
     *   }
     */
    ezLicenseErrorHandler(ezEvent) {
        if (!ezEvent?.data) {
            // ezEvent.data is missing, duplicate ezEvent to ezEvent.data property.
            ezEvent.data = {
                errorCode: ezEvent?.errorCode,
                message: ezEvent?.message,
                needToPay: ezEvent?.needToPay,
                needToArchive: ezEvent?.needToArchive,
                needToSignIn: ezEvent?.needToSignIn,
                license: ezEvent?.license,
            };
        }

        globalThis.ezApi.ezclocker.ezEventEngine.ezTriggerEvent(
            EzAccountViewController.ezEventNames.onEzAccountViewControllerLicenseProcessingCompleted,
            ezEvent);

        let errorMsg;

        let errorActions;

        if (401 === ezEvent?.data?.errorCode || 401 === ezEvent?.errorCode) {
            errorMsg = EzHtml.build`
                EzClocker has detected an issue with your subscription:
                The number of active employees exceeds your subscription's maximum limit.`;

            errorActions = EzHtml.build`
                <p
                    id="EzLicenseErrorDialog_UserAction">
                    You need to upgrade to a subscription that allows the number of employees you have
                    or archive employees until your employee count is less than or equal to the license's
                    employee limit.
                </p>`;
        } else {
            errorMsg = ezEvent?.data?.message || ezEvent?.message;

            if (!EzString.hasLength(errorMsg)) {
                errorMsg = 'EzClocker has detected an issue with your subscription.';
            }

            errorActions = EzHtml.build`
               <p
                    id="EzLicenseErrorDialog_UserAction">
                    Please contact ezClocker support at
                    <a
                        id="EzLicenseErrorDialog_EmailSupportLink"
                        href="mailto:support@ezclocker.com">
                        support@ezclocker.com
                    </a>
                    for additional assistance.
                </p>`;
        }

        EzAccountViewController.ezInstance.ezUpdateState(
            'license',
            {
                status: 'ERROR',
                data: ezEvent.data,
                errorMsg,
                errorActions
            });

        globalThis.ezApi.ezclocker.ezDialog.ezShowError(
            'Employer License Error',
            EzHtml.build`
                <h3
                    id="EzLicenseErrorDialog_Message">
                    ${errorMsg}
                </h3>
                ${errorActions}`)
            .then(EzPromise.ignoreResolve);
    }

    /**
     * @protected @method
     * Handles the Allow Automatic Breaks checkbox click event
     */
    ezHandleAllowAutomaticBreaksCheckboxClick() {
        if (globalThis.ezApi.ezclocker.ezUi.ezIsCheckboxChecked('EZOPTION_ALLOW_AUTOMATIC_BREAKS')) {
            // Show accept dialog
            return globalThis.ezApi.ezclocker.ezDialog.ezShowAgreeDeclineMessageDialog(
                'EzClocker Terms of Service Agreement',
                globalThis.ezApi.ezMsg`
                    <p>
                        By selecting “Agree” below, You agree to allow ezClocker to automatically deduct up to thirty (30)
                        minutes from the total daily time worked as an unpaid lunch break for each hourly employee that
                        fails to clock-out for a meal break during the workday. You also agree to inform each hourly
                        employee that, in the event the employee does not clock out for a lunch break, up to thirty (30)
                        minutes of time for an unpaid meal break will be automatically deducted from the total amount of
                        time worked that day by the employee.
                    </p>
                    <p>
                        For further information and requirements, see the ezClocker
                        <a
                            href="/public/ezclocker_terms_of_service.html?v=r72-3"
                             target="_EzClocker_TOS">
                            Terms of Service
                        </a>.
                    </p>
                    <p>
                        If You agree to the above terms, click the "Agree" button below.
                    </p>`)
                .then(
                    (dialogResponse) => {
                        if (EzDialogResponseStatus.DECLINE === dialogResponse.dialogStatus) {
                            globalThis.ezApi.ezclocker.ezEventEngine.ezUnwantElementEvent(
                                'EZOPTION_ALLOW_AUTOMATIC_BREAKS',
                                EzElementEventName.CHANGE,
                                EzAccountViewController.ezApiName);

                            globalThis.ezApi.ezclocker.ezUi.ezSetCheckboxValue('EZOPTION_ALLOW_AUTOMATIC_BREAKS', false);

                            globalThis.ezApi.ezclocker.ezEventEngine.ezWantElementEvent(
                                'EZOPTION_ALLOW_AUTOMATIC_BREAKS',
                                EzElementEventName.CHANGE,
                                EzAccountViewController.ezApiName,
                                EzAccountViewController.ezInstance.ezHandleAllowAutomaticBreaksCheckboxClick);
                        }
                    });

        }
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
        return 'ezAccountViewController';
    }

    /**
     * @static
     * @public @readonly @property
     * Gets an object of event names that this class may trigger.
     * @returns {object}
     */
    static get ezEventNames() {
        return {
            onReady: 'ezOn_EzAccountViewController_Ready',
            onStateReady: 'ezOn_EzAccountViewController_StateReady',
            onEzAccountViewControllerLicenseProcessingCompleted: 'ezOn_EzAccountViewController_LicenseProcessing_Completed'
        };
    }

    /**
     * @static
     * @private @field
     * Stores the singleton instance of this class that was created by and registerd with EzApi.
     * @type {EzAccountViewController}
     */
    static #ezInstance = globalThis?.ezApi?.ready && globalThis.ezApi?.ezclocker?.[EzAccountViewController.ezApiName]
        ? globalThis.globalThis.ezApi.ezclocker[EzAccountViewController.ezApiName]
        : null;
    /**
     * @static
     * @public @property @getter
     * Gets the singleton instance of this class that is registered with EzApi (if available yet)
     * @returns {EzAccountViewController}
     */
    static get ezInstance() {
        return EzAccountViewController.#ezInstance;
    }
    /**
     * @static
     * @public @property @setter
     * Sets the singleton instance of of this class that is registered with EzApi.
     * @param {EzAccountViewController} instance
     */
    static set ezInstance(instance) {
        if (null != EzAccountViewController.#ezInstance) {
            throw new Error('EzAccountViewController\'s singleton instance is already reigstered with EzApi.');
        }

        EzAccountViewController.#ezInstance = instance;
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
    static #ezApiRegistrationState = globalThis?.ezApi?.ready && globalThis.ezApi?.ezclocker?.[EzAccountViewController.ezApiName]
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
        return EzAccountViewController.#ezApiRegistrationState;
    }
    /**
     * @static
     * @public @property @setter
     * Sets the ezApi registration state of this classes's singleton instance.
     * @param {string} ezApiRegistrationState
     * A valid enum property value from EzRegistrationState
     */
    static set ezApiRegistrationState(ezApiRegistrationState) {
        EzAccountViewController.#ezApiRegistrationState = EzRegistrationState.ezValueOf(ezApiRegistrationState);
    }

    /**
     * @static
     * @private @readonly @property
     * Gets true when all required dependencies for this class report ready.
     * In otherwords, the require dependency's singleton instance is created
     * and is registered with and accessable from EzApi with globalThis.ezApi.ezclocker.{dependency_name}.
     * @returns {boolean}
     */
    static get #ezCanRegister() {
        return EzRegistrationState.PENDING === EzAccountViewController.ezApiRegistrationState &&
            globalThis?.ezApi?.ready && globalThis.ezApi?.ezclocker &&
            globalThis.globalThis.ezApi.ezclocker?.[EzEventEngine.ezApiName]?.ready &&
            globalThis.globalThis.ezApi.ezclocker?.[EzDateTime.ezApiName]?.ready &&
            globalThis.globalThis.ezApi.ezclocker?.[EzNavigation.ezApiName]?.ready &&
            globalThis.globalThis.ezApi.ezclocker?.[EzClockerContext.ezApiName]?.ready &&
            globalThis.globalThis.ezApi.ezclocker?.[EzEmployerService.ezApiName]?.ready &&
            globalThis.globalThis.ezApi.ezclocker?.[EzLicenseHelper.ezApiName]?.ready &&
            globalThis.globalThis.ezApi.ezclocker?.[EzUI.ezApiName]?.ready &&
            globalThis.globalThis.ezApi.ezclocker?.[EzSpinner.ezApiName]?.ready &&
            globalThis.globalThis.ezApi.ezclocker?.[EzDialog.ezApiName]?.ready &&
            globalThis.globalThis.ezApi.ezclocker?.[EzClockerContextEventName.ezApiName]?.ready &&
            globalThis.globalThis.ezApi.ezclocker?.[EzEmployerLogoController.ezApiName]?.ready &&
            globalThis.globalThis.ezApi.ezclocker?.[EzUpdateCompanyInfoDialog.ezApiName]?.ready &&
            globalThis.globalThis.ezApi.ezclocker?.[EzSubscriptionPlansView.ezApiName]?.ready &&
            globalThis.globalThis.ezApi.ezclocker?.[EzSendFeedbackDialog.ezApiName]?.ready &&
            globalThis.globalThis.ezApi.ezclocker?.[EzAccountSubscriptionActions.ezApiName]?.ready &&
            globalThis.globalThis.ezApi.ezclocker?.[EzSubscriptionInfoViewController.ezApiName]?.ready &&
            globalThis.globalThis.ezApi.ezclocker?.[EzSubscriptionDialog.ezApiName]?.ready &&
            globalThis.globalThis.ezApi.ezclocker?.[EzChangeUsernamePasswordDialog.ezApiName]?.ready &&
            globalThis.globalThis.ezApi.ezclocker?.[EzDeleteAccountWizard.ezApiName]?.ready &&
            globalThis.globalThis.ezApi.ezclocker?.[EzAccountPreferences.ezApiName]?.ready &&
            globalThis.globalThis.ezApi.ezclocker?.[EzChangeAccountPasswordDialog.ezApiName]?.ready &&
            globalThis.globalThis.ezApi.ezclocker?.[EzUpdateCreditCardDialog.ezApiName]?.ready &&
            globalThis.globalThis.ezApi.ezclocker?.[EzAccountDebugTools.ezApiName]?.ready &&
            globalThis.globalThis.ezApi.ezclocker?.[EzHelp.ezApiName]?.ready &&
            globalThis.globalThis.ezApi.ezclocker?.[EzAccountNavButton.ezApiName]?.ready;
    }

    /**
     * @static
     * @private @readonly @property
     * Gets if this class's singleton instance is registered with ezApi yet.
     * @returns {boolean}
     */
    static get #ezIsRegistered() {
        return null != EzAccountViewController.ezInstance &&
            EzRegistrationState.REGISTERED === EzAccountViewController.ezApiRegistrationState;
    }

    /**
     * @static
     * @private @method
     * Attempts to register the singleton instance for this class with ezApi. Returns true
     * if successful, false otherwise.
     * @returns {boolean}
     */
    static #ezRegistrator() {
        if (EzAccountViewController.#ezCanRegister && !EzAccountViewController.#ezIsRegistered) {
            globalThis.globalThis.ezApi.ezRegisterNewApi(EzAccountViewController, EzAccountViewController.ezApiName);
        }

        return EzAccountViewController.#ezIsRegistered;
    }

    /**
     * @static
     * Static Initialization
     * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
     * >> IMPORTANT <<
     * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
     * Make sure the following properties and methods get defined BEFORE this static initialization section:
     *     1) Property getter EzAccountViewController.ezApiName
     *     2) Property getter EzAccountViewController.ezEventNames
     *     3) Property getter EzAccountViewController.ezInstance
     *     4) Property setter EzAccountViewController.ezInstance
     *     5) Property getter EzAccountViewController.ezApiRegistrationState
     *     6) Property setter EzAccountViewController.ezApiRegistrationState
     *     7) Property getter EzAccountViewController.#ezCanRegister
     *     8) Property getter EzAccountViewController.#ezIsRegistered
     *     9) Method EzAccountViewController.#ezRegistrator()
     */
    static {
        if (!EzAccountViewController.#ezIsRegistered) {
            EzAccountViewController.ezApiRegistrationState = EzRegistrationState.PENDING;

            if (!EzAccountViewController.#ezRegistrator()) {
                document.addEventListener(
                    EzAccountViewController.ezOnEzApiReadyEventName,
                    EzAccountViewController.#ezRegistrator);

                document.addEventListener(
                    EzEventEngine.ezEventNames.onReady,
                    EzAccountViewController.#ezRegistrator);

                document.addEventListener(
                    EzDateTime.ezEventNames.onReady,
                    EzAccountViewController.#ezRegistrator);

                document.addEventListener(
                    EzNavigation.ezEventNames.onReady,
                    EzAccountViewController.#ezRegistrator);

                document.addEventListener(
                    EzClockerContext.ezEventNames.onReady,
                    EzAccountViewController.#ezRegistrator);

                document.addEventListener(
                    EzEmployerService.ezEventNames.onReady,
                    EzAccountViewController.#ezRegistrator);

                document.addEventListener(
                    EzEmployeeService.ezEventNames.onReady,
                    EzAccountViewController.#ezRegistrator);

                document.addEventListener(
                    EzLicenseHelper.ezEventNames.onReady,
                    EzAccountViewController.#ezRegistrator);

                document.addEventListener(
                    EzUI.ezEventNames.onReady,
                    EzAccountViewController.#ezRegistrator);

                document.addEventListener(
                    EzSpinner.ezEventNames.onReady,
                    EzAccountViewController.#ezRegistrator);

                document.addEventListener(
                    EzDialog.ezEventNames.onReady,
                    EzAccountViewController.#ezRegistrator);

                document.addEventListener(
                    EzClockerContextEventName.ezEventNames.onReady,
                    EzAccountViewController.#ezRegistrator);

                document.addEventListener(
                    EzEmployerService.ezEventNames.onReady,
                    EzAccountViewController.#ezRegistrator);

                document.addEventListener(
                    EzEmployerLogoController.ezEventNames.onReady,
                    EzAccountViewController.#ezRegistrator);

                document.addEventListener(
                    EzUpdateCompanyInfoDialog.ezEventNames.onReady,
                    EzAccountViewController.#ezRegistrator);

                document.addEventListener(
                    EzSubscriptionPlansView.ezEventNames.onReady,
                    EzAccountViewController.#ezRegistrator);

                document.addEventListener(
                    EzSendFeedbackDialog.ezEventNames.onReady,
                    EzAccountViewController.#ezRegistrator);

                document.addEventListener(
                    EzSubscriptionInfoViewController.ezEventNames.onReady,
                    EzAccountViewController.#ezRegistrator);

                document.addEventListener(
                    EzAccountSubscriptionActions.ezEventNames.onReady,
                    EzAccountViewController.#ezRegistrator);

                document.addEventListener(
                    EzSubscriptionDialog.ezEventNames.onReady,
                    EzAccountViewController.#ezRegistrator);

                document.addEventListener(
                    EzChangeUsernamePasswordDialog.ezEventNames.onReady,
                    EzAccountViewController.#ezRegistrator);

                document.addEventListener(
                    EzDeleteAccountWizard.ezEventNames.onReady,
                    EzAccountViewController.#ezRegistrator);

                document.addEventListener(
                    EzAccountPreferences.ezEventNames.onReady,
                    EzAccountViewController.#ezRegistrator);

                document.addEventListener(
                    EzChangeAccountPasswordDialog.ezEventNames.onReady,
                    EzAccountViewController.#ezRegistrator);

                document.addEventListener(
                    EzUpdateCreditCardDialog.ezEventNames.onReady,
                    EzAccountViewController.#ezRegistrator);

                document.addEventListener(
                    EzAccountDebugTools.ezEventNames.onReady,
                    EzAccountViewController.#ezRegistrator);

                document.addEventListener(
                    EzHelp.ezEventNames.onReady,
                    EzAccountViewController.ezRegistrator);

                document.addEventListener(
                    EzAccountNavButton.ezEventNames.onReady,
                    EzAccountViewController.#ezRegistrator);
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
