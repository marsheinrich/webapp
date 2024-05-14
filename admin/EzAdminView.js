import {
    // EzException,
    // EzExceptionInClassMethod,
    EzBadParamException,
    // EzBadStateException,
    // EzStaticClassException,
    // EzNotSupportedException
} from '/ezlibrary/exceptions/EzExceptions.js';

import {
    EzObject,
    EzBoolean,
    // EzNumber,
    // EzFloat,
    // EzString,
    // EzArray,
    // EzUrl,
    EzHtml,
    // EzFunction,
    // EzJson,
    // EzConsole,
    // EzAsync,
    // EzUTF8CharHelper,
    EzPromise
} from '/ezlibrary/helpers/EzHelpers.js';

import {
    // EzElementEventName,
    // EzEnvironment,
    // EzRequestMethod,
    // EzMediaType,
    // EzFeatureToggleViewName,
    // EzFeatureToggleId,
    // EzFeaturePackageId
    // EzUserRoleFeature
    // EzCharacterEncoding
    // EzClockerContextEventName,
    // EzValidationResponseStatus,
    // EzUserPermissionType,
    // EzClockerFeature,
    // EzDialogResponseStatus,
    // EzLocale
    EzRegistrationState
} from '/ezlibrary/enums/EzEnumerations.js';

import { EzClass } from '/ezlibrary/EzClass.js';

import { EzUI } from '/public/javascript/common/ezui.js';

import { EzDialog } from '/public/javascript/common/ezclocker-dialog-helper.js';

/**
 * @class
 * @extends {EzClass}
 * @description
 * Implementation of the EzClocker Administration View
 * -----------------------------------------------------------------
 * Import with:
 *     import { EzAdminView } from '/templates/EzAdminView.js';
 * -----------------------------------------------------------------
 * Ready Check:
 *     globalThis.ezApi.ezclocker[EzAdminView.ezApiName] &&
 *     globalThis.ezApi.ezclocker[EzAdminView.ezApiName].ready
 * -----------------------------------------------------------------
 * Listen for Ready Event:
 *     document.addEventListener(
 *         EzAdminView.ezEventNames.onReady,
 *         <destination_class_name>.#ezRegistrator);
 * -----------------------------------------------------------------
 * Static references:
 *     Inside this class...: EzAdminView.ezInstance
 *     Outside this class..: ezApi.ezclocker.EzAdminView
 * -----------------------------------------------------------------
 */
export class EzAdminView extends EzClass {
    /**
     * @static
     * @public @readonly @property
     * Returns the name of this class's singleton instance when registered with ezApi.
     * @returns {string}
     */
    static get ezApiName() {
        return 'EzAdminView';
    }

    /**
     * @static
     * @public @readonly @property
     * Returns an object of event names that this class may trigger.
     * @returns {object}
     */
    static get ezEventNames() {
        return {
            onReady: 'ezOn_EzAdminView_Ready'
        };
    }

    /**
     * @static
     * @private @field
     * Stores the singleton instance of this class that was created by and registerd with EzApi.
     * @type {EzAdminView}
     */
    static #ezInstance = EzObject.hasProperty(globalThis, 'ezApi') &&
        EzObject.isValid(globalThis.ezApi) && EzBoolean.isTrue(globalThis.ezApi.ready) &&
        EzObject.isValid(globalThis.ezApi.ezclocker[EzAdminView.ezApiName])
        ? globalThis.ezApi.ezclocker[EzAdminView.ezApiName]
        : null;

    /**
     * @static
     * @public @property @getter
     * Returns the singleton instance of this class that is registered with EzApi (if available yet)
     * @returns {EzAdminView}
     */
    static get ezInstance() {
        return EzAdminView.#ezInstance;
    }

    /**
     * @static
     * @public @property @setter
     * Sets the singleton instance of of this class that is registered with EzApi.
     * @param {EzAdminView} instance
     */
    static set ezInstance(instance) {
        if (null != EzAdminView.#ezInstance) {
            throw new EzException('EzAdminView\'s singleton instance is already reigstered with EzApi.');
        }

        EzAdminView.#ezInstance = instance;
    }

    /**
     * @static
     * @private @field
     * Stores the EzApi registration state for this class.
     * This class is considered register with EzApi when the
     * ezApiRegistrationState value equals EzRegistrationState.REGISTERED
     * @type {string}
     * A valid enum property value from EzRegistrationState
     */
    static #ezApiRegistrationState = EzObject.hasProperty(globalThis, 'ezApi') &&
        EzObject.isValid(globalThis.ezApi) && EzBoolean.isTrue(globalThis.ezApi.ready) &&
        EzObject.isValid(globalThis.ezApi.ezclocker[EzAdminView.ezApiName])
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
        return EzAdminView.#ezApiRegistrationState;
    }

    /**
     * @static
     * @public @property @setter
     * Sets the ezApi registration state of this classes's singleton instance.
     * @param {string} ezApiRegistrationState
     * A valid enum property value from EzRegistrationState
     */
    static set ezApiRegistrationState(ezApiRegistrationState) {
        EzAdminView.#ezApiRegistrationState = EzRegistrationState.ezValueOf(ezApiRegistrationState);
    }

    /**
     * @static
     * @private @readonly @property
     * Returns true when all required dependencies for this class report that their
     * singleton instance is created and registered with ezApi. Dependency classes
     * report they are ready by triggering their onRead event.
     * @returns {boolean}
     */
    static get #ezCanRegister() {
        return EzRegistrationState.PENDING === EzAdminView.ezApiRegistrationState &&
            EzObject.hasProperty(globalThis, 'ezApi') &&
            EzObject.isValid(globalThis.ezApi) && EzBoolean.isTrue(globalThis.ezApi.ready) &&

            globalThis.ezApi.ezclocker[EzClockerContext.ezApiName] &&
            globalThis.ezApi.ezclocker[EzClockerContext.ezApiName].ready &&

            globalThis.ezApi.ezclocker[EzUI.ezApiName] &&
            globalThis.ezApi.ezclocker[EzUI.ezApiName].ready &&

            globalThis.ezApi.ezclocker[EzDialog.ezApiName] &&
            globalThis.ezApi.ezclocker[EzDialog.ezApiName].ready;
    }

    /**
     * @static
     * @private @readonly @property
     * Returns if this class's singleton instance is registered with ezApi yet.
     * @returns {boolean}
     */
    static get #ezIsRegistered() {
        return null != EzAdminView.ezInstance &&
            EzRegistrationState.REGISTERED === EzAdminView.ezApiRegistrationState;
    }

    /**
     * @static
     * @private @method
     * Attempts to register the singleton instance for this class with ezApi. Returns true
     * if successful, false otherwise.
     * @returns {boolean}
     */
    static #ezRegistrator() {
        if (EzAdminView.#ezCanRegister && !EzAdminView.#ezIsRegistered) {
            globalThis.ezApi.ezRegisterNewApi(EzAdminView, EzAdminView.ezApiName);
        }

        return EzAdminView.#ezIsRegistered;
    }

    /**
     * @static
     * Static Initialization
     * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
     * >> IMPORTANT <<
     * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
     * Make sure the following static properties and methods always appear
     * BEFORE this static initialization section:
     *    1) Property getter EzAdminView.ezApiName
     *    2) Property getter EzAdminView.ezEventNames
     *    3) Property getter EzAdminView.ezInstance
     *    4) Property setter EzAdminView.ezInstance
     *    5) Property getter EzAdminView.ezApiRegistrationState
     *    6) Property setter EzAdminView.ezApiRegistrationState
     *    7) Property getter EzAdminView.#ezCanRegister
     *    8) Property getter EzAdminView.#ezIsRegistered
     *    9) Method EzAdminView.#ezRegistrator()
     * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
     */
    static {
        if (!EzAdminView.#ezIsRegistered) {
            EzAdminView.ezApiRegistrationState = EzRegistrationState.PENDING;

            if (!EzAdminView.#ezRegistrator()) {
                document.addEventListener(
                    EzAdminView.ezOnEzApiReadyEventName,
                    EzAdminView.#ezRegistrator);

                document.addEventListener(
                    EzSubscribeToPlanDialog.ezOnEzApiReadyEventName,
                    EzAdminView.#ezRegistrator);

                document.addEventListener(
                    EzUI.ezEventNames.onReady,
                    EzAdminView.#ezRegistrator);

                document.addEventListener(
                    EzDialog.ezEventNames.onReady,
                    EzAdminView.#ezRegistrator);
            }
        }
    }

    /**
     * @public @constructor
     * >> DO NOT CREATE NEW INSTANCES OUTSIDE OF THE STATIC INITIALIZATION FLOW <<
     */
    constructor() {
        super();
    }

    get ezAdminViewHeaderHtml() {
        return EzHtml.build`
            <div
                id="EzAdminViewHeader"
                class="ezClockerHeader2015NonFixed bottomShadow ezAutoCol_50x50">
                <a
                    id="EzAdminViewHeaderSignOutLink"
                    href="#"
                    onclick="ezApi.ezclocker.ezNavigation.ezSignOut();">
                    <img
                        id="EzClockerLogoImg"
                        class="ezClockerHeader2015"
                        src="/public/images/logos/ezclocker_logo_2015.svg"
                        alt="ezClocker" />
                </a>
            </div>`;
    }

    get ezAdminViewActionsHtml() {
        return EzHtml.build`
            <div
                id="EzAdminActionsContainer"
                class="ezAutoCol_A ezPad4 ezGrid-vertical-align-middle ezGrid-align-right">
                <a
                    id="EzAdminSignoutLink"
                    class="ezButtonLink_default-large-navy"
                    href="#"
                    onclick="ezApi.ezclocker.ezNavigation.ezSignOut()">
                    Sign Out
                </a>
            </div>`;
    }

    /**
     * @public @method
     * Initializes EzAdminView
     */
    ezInit() {
        EzAdminView.ezInstance.ezRegisterEvents();

        EzAdminView.ezInstance.ezInitData()
            .then(EzAdminView.ezInstance.ezInitUx);

        return EzAdminView.ezInstance;
    }

    /**
     * @protected @method
     * Registers the events this class triggers using EzEventEngine.
     */
    ezRegisterEvents() {
        /* Register events below that get triggered by this class using ezApi.ezclocker.ezEventEngine.ezTriggerEvent */

    }

    /**
     * @protected @method
     * Initializes EzAdminView data
     */
    ezInitData() {
        return EzPromise.asyncAction(
            (finished) => {
                // Initialize any data needed before the UX is rendered
                return finished();
            });
    }

    /**
     * @protected @method
     * Initializes EzAdminView UX
     */
    ezInitUX() {
        return EzPromise.asyncAction(
            (finished) => {
                // Initialize the UX and render
                ezApi.ezclocker.ezUi.ezSetContent(
                    // Use the ID of the conainer you will inject the content html into
                    'EzAdminView',
                    EzHtml.build`
                        ${ezApi.ezclocker.ezAdminView.ezAdminViewHeaderHtml()}
                        ${ezApi.ezclocker.ezAdminView.ezAdminViewActionsHtml()}
                        ${ezApi.ezclocker.ezAdminView.ezBuildContentHtml()}
                        ${ezApi.ezclocker.ezAdminViewController.ezBuildLegacyScriptHtml()}`);

                return finished();
            });
    }

    /**
     * @protected @method
     * Builds the main HTML content for the EzAdminView UX
     */
    ezBuildContentHtml() {
        // Return the UX content html
        return EzHtml.build`
            <div
                id="EzAdminPageContent"
                class="ezPageContent">
                <div
                    id="EzAdminPageContentBlock"
                    class="ezPageContentBlock">
                    <h1
                        class="ezH1">
                        EzClocker Admin Services
                    </h1>
                    <div
                        id="EzAdminActionsContainer"
                        class="ezContiner-ezClockerNavy-pad8">
                        <h3
                            class="ezH3-ezClockerWhite ezBottomMargin_8">
                            Admin Actions
                        </h3>
                        <div
                            id="EzAdminActionButtonsContainer"
                            class="ezAutoCol_AxAxA ezGridGap_4 ezGrid-align-left ezGrid-vertical-align-middle">
                            <a
                                href="#EzAdminAction_ViewEmployerRecycledEmployees"
                                class="ezButton-link-ezClockerWhite">
                                View Employer Recycled Employees
                            </a>
                            <a
                                href="#EzAdminAction_RestoreRecycledEmployee"
                                class="ezButton-link-ezClockerWhite">
                                Restore Recycled Employee
                            </a>
                        </div>
                    </div>

                    <div
                        id="EzActionsGroupContainer_RecycledEmployees"
                        class="ezContiner-ezClockerNavy-pad8-top-margin-10">
                        <h1
                            class="ezH1-ezClockerWhite ezBottomMargin_8">
                            Hijack Account Actions
                        </h1>
                        <div
                            id="EzActionsContainer_RecycledEmployees"
                            class="ezWhiteBox">
0
                            <!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->
                            <!-- WHO IS HIJACKED  -->
                            <!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->
                            <div
                                style="background-color:#E8F7FF"
                                class="TestBox">
                                <h1
                                    class="warningText">
                                    Who is Hijacked?
                                </h1>
                                <button
                                    onclick="ezApi.ezclocker.ezAdminViewController.ezViewHijacks()">
                                    View Hijacked Accounts...
                                </button>
                                <div
                                    id="_WhoIsHijacked"
                                    style="background-color: #ffc500"
                                    class="ResultsBox">
                                    results appear here
                                </div>
                                <div
                                    id="viewJumpEmployer"
                                    style="margin-top:4px;padding:4px;border-style:solid;border-width:1px">
                                    <a
                                        href="/secure/employerDashboard.html"
                                        target="_EmployerDashboardHijack">
                                        Jump to Employer Dashboard
                                    </a>
                                </div>
                                <div
                                    id="viewJumpEmployee"
                                    style="margin-top:4px;padding:4px;border-style:solid;border-width:1px">
                                    <a
                                        href="/secure/employeeDashboard.html"
                                        target="_EmployeeDashboardHijack">
                                        Jump to Employee Dashboard
                                    </a>
                                </div>
                            </div>

                            <!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->
                            <!-- RESTORE HIJACK  -->
                            <!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->
                            <div
                                id="EzRetoreHijackContainer"
                                class="TestBox">
                                <div
                                    style="background-color: #C0F991"
                                    class="TestBox">
                                    <p>
                                        Releasing a hijacked account release ALL hijacked accounts (employee and employer).
                                    </p>
                                    <p>
                                        Log out of the hijacked account and close the browser window. Then click the
                                        release button below to release the account.
                                    </p>
                                    <button
                                        id="EzRestoreHijackButton"
                                        style="font-size: 18pt;">
                                        Release Hijack
                                    </button>
                                    <div
                                        id="_HijackResults2"
                                        class="ResultsBox">
                                    </div>
                                </div>
                            </div>

                            <!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->
                            <!-- HIJACK EMPLOYER  -->
                            <!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->
                            <div
                                class="TestBox">
                                <h1>
                                    Hijack Employer Account
                                </h1>
                                <div
                                    style="padding: 4px;">
                                    <label
                                        for="EzHijackEmployerId">
                                        Employer Id:
                                    </label>
                                    <input
                                        id="EzHijackEmployerId"
                                        type="text"/>
                                </div>
                                <button
                                    id="EzHijackEmployerButton"
                                    onclick="ezApi.ezclocker.ezAdminViewController.ezHijackEmployer()">
                                    Hijack Employer...
                                </button>
                                <div
                                    id="EzHijackEmployerResults"
                                    class="ResultsBox">
                                </div>
                                <div
                                    id="jumpEmployer"
                                    style="margin-top:4px;padding:4px;border-style:solid;border-width:1px">
                                    <a
                                        href="/secure/employerDashboard.html"
                                        target="_EmployerDashboardHijack">
                                        Jump to Employer Dashboard
                                    </a>
                                </div>
                            </div>

                            <!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->
                            <!-- HIJACK EMPLOYEE  -->
                            <!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->
                            <div
                                class="TestBox">
                                <h1>
                                    Hijack Employee Account
                                </h1>
                                <div
                                    style="padding: 4px;">
                                    <label
                                        for="_HijackEmployeeId"
                                        style="padding: 4px;">
                                        Employee Id:
                                    </label>
                                    <input
                                        id="_HijackEmployeeId"
                                        type="text"/>
                                </div>
                                <div
                                    style="padding: 4px;">
                                    <button
                                        id="EzHijackEmployeeButton"
                                        onclick="ezApi.ezclocker.ezAdminViewController.ezHijackEmployee">
                                        Hijack Employee...
                                    </button>
                                </div>
                                <div
                                    id="EzHijackEmployeeResults"
                                    class="ResultsBox">
                                </div>
                                <div
                                    id="jumpEmployee"
                                    style="margin-top:4px;padding:4px;border-style:solid;border-width:1px">
                                    <a
                                        href="/secure/employeeDashboard.html"
                                        target="_EmployeeDashboardHijack">
                                        Jump to Employer Dashboard
                                    </a>
                                </div>
                            </div>

                            <!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->
                            <!-- HIJACK PAYROLL MANAGER -->
                            <!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->
                            <div
                                class="TestBox">
                                <h1>
                                    Hijack Payroll Manager Account
                                </h1>
                                <div
                                    style="padding: 4px;">
                                    <label
                                        for="EzHijackPayrollManagerId"
                                        style="padding: 4px;">
                                        Payroll Manager (employee) id:
                                    </label>
                                    <input
                                        id="EzHijackPayrollManagerId"
                                        type="text" />
                                </div>
                                <div
                                    style="padding: 4px;">
                                    Payroll Manager EmployerId
                                </div>
                                <div
                                    style="padding: 4px;">
                                    <button
                                        id="EzHijackPayrollManagerButton"
                                        onclick="ezApi.ezclocker.ezAdminViewController.ezHijackPayrollManager">
                                        Hijack Payroll Manager...
                                    </button>
                                </div>
                                <div
                                    id="EzHijackPayrollManagerResults"
                                    class="ResultsBox">
                                </div>
                                <div
                                    id="jumpPayrollManagerEmployee"
                                    style="margin-top:4px;padding:4px;border-style:solid;border-width:1px">
                                    <a
                                        href="/secure/employer?v=r72-3"
                                        target="_EzPayrollManagerEmployeeDashboardHijack">
                                        Jump to Payroll Manager Dashboard
                                    </a>
                                </div>
                            </div>

                            <!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->
                            <!-- HIJACK MANAGER -->
                            <!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->
                            <div
                                class="TestBox">
                                <h1>
                                    Hijack Manager Account
                                </h1>
                                <div
                                    style="padding: 4px;">
                                    <label
                                        for="EzHijackManagerId"
                                        style="padding: 4px;">Manager (Employee) Id:
                                    </label>
                                    <input
                                        id="EzHijackManagerId"
                                        type="text"/>
                                </div>
                                <div
                                    style="padding: 4px;">
                                    <button
                                        id="EzHijackManagerButton"
                                        onclick="ezApi.ezclocker.ezAdminViewController.ezHijackManager()">
                                        Hijack Manager...
                                    </button>
                                </div>
                                <div
                                    id="EzHijackManagerResults"
                                    class="ResultsBox">
                                </div>
                                <div
                                    id="jumpEmployee"
                                    style="margin-top:4px;padding:4px;border-style:solid;border-width:1px">
                                    <a
                                        href="/secure/employer?v=r72-3"
                                        target="_EzManagerDashboardHijack">
                                        Jump to Manager Dashboard
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->
                    <!-- SWAP PASSWORD FOR A USER -->
                    <!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->
                    <div
                        id="EzActionsGroupContainer_SwapAccountPasswordActions"
                        class="ezContiner-ezClockerNavy-pad8-top-margin-10">
                        <h1
                            class="ezH1-ezClockerWhite ezBottomMargin_8">
                            Swap Account Password Actions
                        </h1>
                        <div
                            id="EzActionsContainer_RecycledEmployees"
                            class="ezWhiteBox">
                            <div
                                class="TestBox">
                                <h1>
                                    Swap Password
                                </h1>
                                <div
                                    class="testBoxLine">
                                    <label
                                        for="EzSwapPasswordAccountUserName">
                                        Account Username:
                                    </label>
                                    <input
                                        id="EzSwapPasswordAccountUserName"
                                        class="ezFullWidth"
                                        type="text"/>
                                </div>
                                <div
                                    class="testBoxLine">
                                    <button
                                        id="EzSwapPasswordButton"
                                        onclick="ezApi.ezclocker.ezAdminViewController.ezSwapPasswordForUser()">
                                        Swap Password ...
                                    </button>
                                    <button
                                        id="EzRestoreSwapPasswordButton"
                                        style="font-size: 18pt;display:none;"
                                        onclick="ezApi.ezclocker.ezAdminViewController.ezRestoreSwapPassword()">
                                        Restore swapped password ...
                                    </button>
                                </div>
                                <div
                                    id="EzSwapPasswordResults"
                                    class="ResultsBox">
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->
                    <!-- Delete Account -->
                    <!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->
                    <div
                        id="EzActionsGroupContainer_DeleteAccountActions"
                        class="ezContiner-ezClockerNavy-pad8-top-margin-10">
                        <h1
                            class="ezH1-ezClockerWhite ezBottomMargin_8">
                            Delete Account Admin Actions
                        </h1>
                        <div
                            id="EzActionsContainer_RecycledEmployees"
                            class="ezWhiteBox">
                            <div
                                class="TestBox">
                                <h1>
                                    Delete User Account
                                </h1>
                                <h3
                                    class="warningText">
                                    This operation cannot be reversed!
                                </h3>
                                <h4>
                                    Service: http://{domain}/_api/v1/account
                                </h4>
                                <div
                                    class="ezInputBox">
                                    <label
                                        for="ezAdminDeleteAccountUserName">
                                        Account User Name:
                                    </label>
                                    <input
                                        id="ezAdminDeleteAccountUserName"
                                        class="ezFullWidth"
                                        type="text"/>
                                </div>
                                <div
                                    class="ezButtonBox">
                                    <button
                                        onclick="deleteAccount()">
                                        Delete Account
                                    </button>
                                </div>
                                <div
                                    id="ezAdminDeleteUserAccountResults"
                                    class="ResultsBox">
                                    <em>
                                        Results Appear Here
                                    </em>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->
                    <!-- VIEW EMPLOYEE INFO -->
                    <!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->
                    <div
                        id="EzActionsGroupContainer_EmployeeActions"
                        class="ezContiner-ezClockerNavy-pad8-top-margin-10">
                        <h1
                            class="ezH1-ezClockerWhite ezBottomMargin_8">
                            Employee Admin Actions
                        </h1>
                        <div
                            id="EzActionsContainer_ViewFullEmployeeInfo"
                            class="ezWhiteBox">
                            <div
                                id="EzViewFullEmployeeInfoSection"
                                class="TestBox">
                                <h1>
                                    View Full Employee Info
                                </h1>
                                <div
                                    class="testBoxLine">
                                    <label
                                        for="EzViewFullEmployeeInfoEmployeeId">
                                        Employee Id:
                                    </label>
                                    <input
                                        id="EzViewFullEmployeeInfoEmployeeId"
                                        type="text"/>
                                </div>
                                <div
                                    class="testBoxLine">
                                    <button
                                        id="EzViewFullEmployeeInfoButton">
                                        View full employee info ...
                                    </button>
                                </div>
                                <div
                                    id="EzViewFullEmployeeInfoResults"
                                    class="ResultsBox"
                                    style="max-width:100%">
                                </div>
                            </div>
                        </div>

                        <!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->
                        <!-- VIEW EMPLOYER RESCYCLED EMPLOYEES -->
                        <!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->
                        <div
                            id="EzActionsContainer_RecycledEmployees"
                            class="ezWhiteBox">
                            <a
                                id="EzAdminAction_ViewEmployerRecycledEmployees"/>
                            <div
                                id="EzViewEmployerRecycledEmployeesSection"
                                class="TestBox">
                                <h1>
                                    View Employer Recycled Employees
                                </h1>
                                Enter either the Employer Id OR the Employer Username (not both!).
                                <div
                                    class="testBoxLine">
                                    <label
                                        for="EzRecycledEmployeeEmployerId">
                                        Employer Id:
                                    </label>
                                    <input
                                        id="EzRecycledEmployeeEmployerId"
                                        type="text"/>
                                </div>
                                <div
                                    class="testBoxLine">
                                    <label
                                        for="EzRecycledEmployeeEmployerUserName">
                                        Employer Username:
                                    </label>
                                    <input
                                        id="EzRecycledEmployeeEmployerUserName"
                                        type="text"/>
                                </div>
                                <div
                                    class="testBoxLine">
                                    <button
                                        id="EzViewRecycledEmployeesButton">
                                        View employer recycled employees ...
                                    </button>
                                </div>
                                <div
                                    id="EzViewRestoreRecycledEmployeeResultsWarning">
                                    Some recycled employees might already have been restored because previous restores did
                                    not delete the recycled data. Restoring an already restored employee could result in errors or
                                    duplicate employees.
                                </div>
                                <div
                                    id="EzViewRestoreRecycledEmployeeResults"
                                    class="ResultsBox"
                                    style="max-width:100%">
                                </div>
                            </div>

                            <!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->
                            <!-- RESTORE RESCYCLED EMPLOYEE -->
                            <!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->
                            <a
                                id="EzAdminAction_RestoreRecycledEmployee" />
                            <div
                                id="EzRestoreRecycledEmployeeSection"
                                class="TestBox">
                                <h1>
                                    Restore Recycled Employee
                                </h1>
                                If you need to see the available recycled employees then see the View Employer Recycled
                                Employees section above. To restore a recycled employee enter the original employee id from the
                                recycled employee entity and/or the recycled employee entitie's id in the input boxes below.
                                <div
                                    class="testBoxLine">
                                    <label
                                        for="EzRecycledEmployeeId">
                                        Recycled Employee Id (id column in recycled_emplyee table):
                                    </label>
                                    <input
                                        id="EzRecycledEmployeeId"
                                        type="text">
                                </div>
                                <div
                                    class="testBoxLine">
                                    <label
                                        for="EzRecycledEmployeeOriginalEmployeeId">
                                        Recycled Employee's Original Employee Id (original_employee_id column in
                                        recycled_employee table):
                                    </label>
                                    <input
                                        id="EzRecycledEmployeeOriginalEmployeeId"
                                        type="text"/>
                                </div>
                                <div
                                    class="testBoxLine">
                                    <label
                                        for="EzRestoreRecycledEmployeeTimeEntries">
                                        <input
                                            id="EzRestoreRecycledEmployeeTimeEntries"
                                            type="checkbox"
                                            checked/>
                                        Also restore recycled time entries for the employee?
                                    </label>
                                </div>
                                <div
                                    class="testBoxLine">
                                    <label
                                        for="EzRestoreRecycledEmployeeIfOriginalIdNull">
                                        <input
                                            id="EzRestoreRecycledEmployeeIfOriginalIdNull"
                                            type="checkbox"/>
                                        Restore employee even if original employee id is null?
                                    </label>
                                </div>
                                <div
                                    class="testBoxLine">
                                    <button
                                        id="EzRestoreRecycledEmployeeButton">
                                        Restore Recycled Employee...
                                    </button>
                                </div>
                                <div
                                    id="EzRestoreRecycledEmployeeResults"
                                    class="ResultsBox"
                                    style="max-width:100%;overflow:scroll">
                                </div>
                            </div>

                            <!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->
                            <!-- Create Employee Invite Admin Action -->
                            <!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->
                            <div
                                class="TestBox">
                                <h1>
                                    Create an invite
                                </h1>
                                <div
                                    class="ezInputBox">
                                    <label
                                        for="ezAdminCreateInviteFullUserName">
                                        Employee Name:
                                    </label>
                                    <input
                                        class="ezFullWidth"
                                        type="text"
                                        id="ezAdminCreateInviteFullUserName" />
                                </div>
                                <div
                                    class="ezInputBox">
                                    <label
                                        for="ezAdminCreateInviteEmailId">
                                        Employee User Name:
                                    </label>
                                    <input
                                        id="ezAdminCreateInviteEmailId"
                                        class="ezFullWidth"
                                        type="text"/>
                                </div>
                                <div
                                    class="ezButtonBox">
                                    <button
                                        onclick="createEmployeeInvite()">
                                        Create an Invite
                                    </button>
                                </div>
                                <div
                                    id="ezAdminCreateEnInviteResults"
                                    class="ResultsBox">
                                    <em>
                                        Results Appear Here
                                    </em>
                                </div>
                            </div>

                            <!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->
                            <!-- Remove Employee -->
                            <!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->
                            <div
                                class="TestBox">
                                <h1>
                                    Remove Employee
                                </h1>
                                <h4>
                                    Service: http://{domain}/_employee/remove/{employerId}/{employeeId}
                                </h4>
                                <h4>
                                    Removes the employee and their associated tables
                                </h4>
                                <form
                                    id="removeEmployeeForm"
                                    action="../_employee/remove"
                                    enctype="application/json"
                                    method="post"
                                    onsubmit="removeEmployeeSubmit()'>
                                    EmployerId:
                                    <br />
                                    <input
                                        id="employerIdOfEmployee"
                                        type="text"/>
                                    <br />
                                    EmployeeId:
                                    <br />
                                    <input
                                        id="employeeId"
                                        type="text"/>
                                    <br />
                                    <input
                                        type="submit"
                                        value="Remove employee...">
                                    <br />
                                </form>
                                <div
                                    id="removeEmployeeResults"
                                    class="ResultsBox">
                                    <em>
                                        Results Appear Here
                                    </em>
                                </div>
                            </div>

                            <!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->
                            <!-- Move Employee to New Employer -->
                            <!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->
                            <div
                                class="TestBox">
                                <h1>
                                    Move employees to new employer
                                </h1>
                                <div
                                    class="ezInputBox">
                                    <label
                                        for="ezAdminBulkMoveEmployeesFromEmployer">
                                        Employee login user name (name or email id, as applicable):
                                    </label>
                                    <input
                                        id="ezAdminBulkMoveEmployeesFromEmployer"
                                        class="ezFullWidth"
                                        type="text"/>
                                </div>
                                <div
                                    class="ezInputBox">
                                    <label
                                        for="ezAdminBulkMoveEmployeesToEmployer">
                                        Target Employer login user name (name or email id, as applicable):
                                    </label>
                                    <input
                                        id="ezAdminBulkMoveEmployeesToEmployer"
                                        class="ezFullWidth"
                                        type="text"/>
                                </div>
                                <div
                                    id="moveEmployeeToEmployerSubmitButton"
                                    class="ezButtonBox">
                                    <button
                                        onclick="moveEmployeeToEmployer()">
                                        Move Employee
                                    </button>
                                </div>
                                <div
                                    id="ezAdminBulkMoveEmployeesResults"
                                    class="ResultsBox">
                                    <em>
                                        Results Appear Here
                                    </em>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->
                    <!-- Remove Employer -->
                    <!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->
                    <div
                        id="EzActionsGroupContainer_EmployerActions"
                        class="ezContiner-ezClockerNavy-pad8-top-margin-10">
                        <h1
                            class="ezH1-ezClockerWhite ezBottomMargin_8">
                            Employer Admin Actions
                        </h1>
                        <div
                            id="EzActionsContainer_RecycledEmployees"
                            class="ezWhiteBox">
                            <div
                                class="TestBox">
                                <h1>
                                    Remove Employer
                                </h1>
                                <h4>
                                    Service: http://{domain}/_employer/remove/{employerId}
                                </h4>
                                <h4>
                                    Removes the employer, all employees, all time entries, and other associated tables for
                                    the employer
                                </h4>
                                <form
                                    id="removeEmployerForm"
                                    action="../_employer/remove" enctype="application/json"
                                    method="post"
                                    onsubmit="removeEmployerSubmit()">
                                    EmployerId:
                                    <br />
                                    <input
                                        id="employerId"
                                        type="text"/>
                                    <br />
                                    <input
                                        type="submit"
                                        value="Remove employer...">
                                    <br />
                                </form>
                                <div
                                    id="removeEmployerResults"
                                    class="ResultsBox">
                                    <em>
                                        Results Appear Here
                                    </em>
                                </div>
                            </div>

                            <!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->
                            <!-- Bulk Add Employer Locations -->
                            <!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->
                            <script>
                                function postBulkAddEmployerLocation() {
                                    let url = '../_api/v1/support/import/bulk-locations/' +
                                        $("#_BulkLocation_EmployerId").val();

                                    $("#bulkAddEmployerLocation").attr("action", url);

                                    $("#bulkAddEmployerLocation").submit();
                                }
                            </script>
                            <div
                                class="TestBox">
                                <form
                                    id="bulkAddEmployerLocation"
                                    method="post"
                                    enctype="multipart/form-data"
                                    target="_new_tab_bulk">
                                    <input
                                        id="_csvFile"
                                        type="file"
                                        name="csvFile"/>
                                    <br />
                                    Employer Id:
                                    <input
                                        id="_BulkLocation_EmployerId"
                                        type="text"
                                        name="employerId"/>
                                    <br />
                                    <input
                                        id="_SplitStreet"
                                        name="splitStreet"
                                        type="checkbox"
                                        checked/>
                                        Split Street Column?
                                </form>
                                <button
                                    onclick="postBulkAddEmployerLocation()">
                                    Go!
                                </button>
                            </div>
                        </div>
                    </div>

                    <!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->
                    <!-- List Developer Employers -->
                    <!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->
                    <div
                        id="EzActionsGroupContainer_DeveloperAccountActions"
                        class="ezContiner-ezClockerNavy-pad8-top-margin-10">
                        <h1
                            class="ezH1-ezClockerWhite ezBottomMargin_8">
                            Developer Account Actions
                        </h1>
                        <div
                            id="EzActionsContainer_RecycledEmployees"
                            class="ezWhiteBox">
                            <div
                                class="TestBox">
                                <h1>
                                    List Developer Employers
                                </h1>
                                <h4>
                                    Service: http://{domain}/_employer/developer
                                </h4>
                                <h4>
                                    List all employers associated with your developer token
                                </h4>
                                <form
                                    id="listDeveloperEmployersForm"
                                    action="../_employer/developer"
                                    enctype="application/json"
                                    method="post"
                                    onsubmit="listDeveloperEmployersSubmit()">
                                    DeveloperToken:
                                    <br />
                                    <input
                                        id="developerToken"
                                        name="developerToken"
                                        type="text"/>
                                    <br />
                                    <input
                                        type="submit"
                                        value="List all employers...">
                                    <br />
                                </form>
                                <div
                                    id="listDeveloperEmployersResults"
                                    class="ResultsBox">
                                    <em>
                                        Results Appear Here
                                    </em>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->
                    <!-- Test Email Template -->
                    <!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->
                    <div
                        id="EzActionsGroupContainer_EmailActions"
                        class="ezContiner-ezClockerNavy-pad8-top-margin-10">
                        <h1
                            class="ezH1-ezClockerWhite ezBottomMargin_8">
                            Email Admin Actions
                        </h1>
                        <div
                            id="EzActionsContainer_RecycledEmployees"
                            class="ezWhiteBox">
                            <div
                                class="TestBox">
                                <form
                                    id="_ForceEmailQueue"
                                    action="../_email/forceEmailQueue"
                                    enctype="application/json"
                                    method="post"
                                    onsubmit="forceEmailQueueSubmit()">
                                    <input
                                        type="submit"
                                        value="Force Email Queue" />
                                </form>
                            </div>
                            <div
                                class="TestBox">
                                <h1>
                                    Test Email Template
                                </h1>
                                <h4>
                                    Service: http://{domain}/email/template/test
                                </h4>
                                <h4>
                                    Sends an email using a template and data passed to the recipient (for testing)
                                </h4>
                                Name (template ID/name):
                                <br />
                                <input
                                    id="_EmailTestName"
                                    name="name"
                                    type="text"
                                    value="NEW_EMPLOYER_HTML"/>
                                <br />
                                DataFields (Json array of key/value pairs in format: [{"key":"value",{"key":"value"}]):
                                <br />
                                <textarea
                                    id="_EmailTestDataFields"
                                    name="dataFields"
                                    rows="25"
                                    cols="100">
                                    {"EMPLOYER_NAME":"Employer Name"}
                                </textarea>
                                <br />
                                Recpient:
                                <br />
                                <input
                                    id="_EmailTestRecipient"
                                    name="recipient"
                                    type="text"
                                    value="jason.ridge@gmail.com"/>
                                <br />
                                <button
                                    onclick="sendTestEmail()">
                                    Send email test...
                                </button>
                                <br />
                                <div
                                    id="_TestEmailResults"
                                    class="ResultsBox">
                                    <em>
                                        Results Appear Here
                                    </em>
                                </div>
                            </div>

                            <!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->
                            <!-- Add Email Template -->
                            <!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->
                            <div
                                class="TestBox">
                                <h1>
                                    Add Email Template
                                </h1>
                                <h4>
                                    Service: http://{domain}/email/template/add
                                </h4>
                                <h4>
                                    Adds a new email template to the DB
                                </h4>
                                <form
                                    id="addEmailTemplateForm"
                                    action="../_email/template/add"
                                    enctype="application/json"
                                    method="post"
                                    onsubmit="addEmailTemplateSubmit()">
                                    Template Name (unique):
                                    <br/>
                                    <input
                                        name="name"
                                        type="text"/>
                                    <br/>
                                    Template Subject Line:
                                    <br/>
                                    <input
                                        name="subject"
                                        style="width: 500px;"
                                        type="text" />
                                    <br/>
                                    Template Body:
                                    <br/>
                                    NOTE: For replacement tags, use the following format: {-table_name.field_name-}
                                    <br/>
                                    <textarea
                                        name="body"
                                        rows="25"
                                        cols="100">
                                    </textarea>
                                    <br/>
                                    <input
                                        type="submit"
                                        value="Add email template...">
                                    <br />
                                </form>
                                <div
                                    id="addEmailTemplateResults"
                                    class="ResultsBox">
                                    <em>
                                        Results Appear Here
                                    </em>
                                </div>
                            </div>

                            <!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->
                            <!-- Update Email Template -->
                            <!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->
                            <div
                                class="TestBox">
                                <h1>
                                    Update Email Template (by name)
                                </h1>
                                <h4>
                                    Service: http://{domain}/email/template/update
                                </h4>
                                <h4>
                                    Updates an existing email template
                                </h4>
                                <form
                                    id="updateEmailTemplateForm"
                                    action="../_email/template/update"
                                    enctype="application/json"
                                    method="post"
                                    onsubmit="updateEmailTemplateSubmit()">
                                    Template Name (required):
                                    <br/>
                                    <input
                                        name="name"
                                        type="text"/>
                                    <br/>
                                    Template Subject Line (optional, leave blank to not update):
                                    <br/>
                                    <input
                                        name="subject"
                                        style="width: 500px;"
                                        type="text"/>
                                    <br/>
                                    Template Body (optional, leave blank to not update):
                                    <br/>
                                    NOTE: For replacement tags, use the following format: {-table_name.field_name-}
                                    <br/>
                                    <textarea
                                        name="body"
                                        rows="25"
                                        cols="100">
                                    </textarea>
                                    <br/>
                                    <input
                                        type="submit"
                                        value="Update email template...">
                                    <br/>
                                </form>
                                <div
                                    id="updateEmailTemplateResults"
                                    class="ResultsBox">
                                    <em>
                                        Results Appear Here
                                    </em>
                                </div>
                            </div>

                            <!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->
                            <!-- Remove Email Template -->
                            <!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->
                            <div
                                class="TestBox">
                                <h1>
                                    Remove Email Template (by name)
                                </h1>
                                <h4>
                                    Service: http://{domain}/email/template/remove
                                </h4>
                                <h4>
                                    Removes an existing email template
                                </h4>
                                <form
                                    id="removeEmailTemplateForm"
                                    action="../_email/template/remove"
                                    enctype="application/json"
                                    method="post"
                                    onsubmit="removeEmailTemplateSubmit()">
                                    Template Name (required):
                                    <br/>
                                    <input
                                        name="name"
                                        type="text"/>
                                    <br/>
                                    <input
                                        type="submit"
                                        value="Remove email template...">
                                    <br/>
                                </form>
                                <div
                                    id="removeEmailTemplateResults"
                                    class="ResultsBox">
                                    <em>
                                        Results Appear Here
                                    </em>
                                </div>
                            </div>

                            <!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->
                            <!-- Get Email Template by Name -->
                            <!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->
                            <div
                                class="TestBox">
                                <h1>
                                    Get Email Template (by name)
                                </h1>
                                <h4>
                                    Service: http://{domain}/email/template/get
                                </h4>
                                <h4>
                                    Gets an existing email template
                                </h4>
                                <form
                                    id="getEmailTemplateForm"
                                    action="../_email/template/get"
                                    enctype="application/json"
                                    method="post"
                                    onsubmit="getEmailTemplateSubmit()">
                                    Template Name (required):
                                    <br/>
                                    <input
                                        name="name"
                                        type="text"/>
                                    <br/>
                                    <input
                                        type="submit"
                                        value="Get email template...">
                                    <br/>
                                </form>
                                <div
                                    id="getEmailTemplateResults"
                                    class="ResultsBox">
                                    <em>
                                        Results Appear Here
                                    </em>
                                </div>
                            </div>

                            <!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->
                            <!-- Get All Email Templates -->
                            <!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->
                            <div
                                class="TestBox">
                                <h1>
                                    List All Available Email Templates
                                </h1>
                                <h4>
                                    Service: http://{domain}/email/template/names
                                </h4>
                                <form
                                    id="getEmailTemplateNamesForm"
                                    action="../_email/template/names"
                                    enctype="application/json"
                                    method="get">
                                    <input
                                        type="submit"
                                        value="Get email template names...">
                                    <br/>
                                </form>
                                <div
                                    id="getEmailTemplateNamesResults"
                                    class="ResultsBox">
                                    <em>
                                        Results Appear Here
                                    </em>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>`;
    }
}
