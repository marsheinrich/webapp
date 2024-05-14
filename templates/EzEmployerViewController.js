/**
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    DO NOT MODIFY THIS FILE UNLESS YOU INTEND TO UPDATE THE TEMPLATE
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 */

/**
    Remove if EzBadParamException not used
 */
import {
    EzBadParamException
} from '/ezlibrary/exceptions/EzBadParamException.js';

import {
    EzObject,
    EzNumber, // remove if not used
    EzFloat, // remove if not used
    EzBoolean,
    EzString,
    EzArray, // remove if not used
    EzFunction, // remove if not used
    EzJson,
    EzPromise,
    EzHtml,
    EzUrl // remove if not used
} from '/ezlibrary/helpers/EzHelpers.js';

import {
    EzRegistrationState,
    EzElementEventName,
} from '/ezlibrary/enums/EzEnumerations.js';

import { EzClass } from '/ezlibrary/EzClass.js';

/**
    Provides access to: ezApi.ezclocker.ezEventEngine
 */
import { EzEventEngine } from '/ezlibrary/ez-event-engine.js';

/**
    Provides access to: ezApi.ezclocker.ezHttpHelper
 */
import { EzHttpHelper } from '/public/javascript/common/ezclocker-http-helper.js';

/**
    Provides access to: ezApi.ezclocker.ezUrlHelper
 */
import { EzUrlHelper } from '/public/javascript/common/ezclocker-url-helper2.js';

/**
    Provides access to: ezApi.ezclocker.ezNavigation
 */
import { EzNavigation } from '/public/javascript/common/ezclocker-navigation-helper.js';

/**
    Provides access to: ezApi.ezclocker.ezClockerContext
 */
import { EzClockerContext } from '/ezlibrary/EzClockerContext/ez-context.js';

/**
    Provides access to: ezApi.ezclocker.ezLicenseHelper
 */
import { EzLicenseHelper } from '/secure/javascript/common/ezclocker-license-helper.js';

/**
    Provides access to: ezApi.ezclocker.ezUi
 */
import { EzUI } from '/public/javascript/common/ezui.js';

/**
    Provides access to: ezApi.ezclocker.ezDialog
 */
import { EzDialog } from '/public/javascript/common/ezclocker-dialog-helper.js';

/**
    Provides access to: ezApi.ezclocker.ezEmployerLogoController
 */
import { EzEmployerLogoController } from '/secure/account/account-CompanyLogo.js';

/**
    Provides access to: ezApi.ezclocker.ezHelp
 */
import { EzHelp } from '/secure/widgets/EzHelp/EzHelp.js';

/**
    Provides access to: ezApi.ezclocker.ezSendFeedbackDialog
 */
import { EzSendFeedbackDialog } from '/secure/components/EzSendFeedbackDialog/EzSendFeedbackDialog.js';

/**
    @class
    @extends {EzClass}
    @description
    Employer View Controller Template
    Use as the starting point for all views available to Employer,
    Payroll Manager, or Manager accounts.
    ---------------------------------------------------------------------
    Using Template:
        Step 1: Copy the following files to the folder where the view will reside:
            * EmployerView.html
            * EzEmployerViewController.js
        Step 2: Rename the EmployerView and EzEmployerViewControler.js as needed
            Example:
                EmployerView.html rename to index.html
                EzEmployerViewController.js rename to EzTimeOffViewController.js
        Step 3: Perform a find & replace in the EzEmployerViewController.js file:
            Replace all instances of EzEmployerViewController with the official name of the view.
            Example:
                EzEmployerViewController.js renamed to EzTimeOffViewController.js
                Find: EzEmployerViewController
                Replace with: EzTimeOffViewController
    ---------------------------------------------------------------------
    Import With:
        import { EzEmployerViewController } from '/src/main/webapp/templates/EzEmployerViewController.js';
    ---------------------------------------------------------------------
    Class ready check:
        globalThis.ezApi.ezclocker[EzEmployerViewController.ezApiName] &&
        globalThis.ezApi.ezclocker[EzEmployerViewController.ezApiName].ready;
    ---------------------------------------------------------------------
    Listen for class onReady event:
        document.addEventListener(
            EzEmployerViewController.ezEventNames.onReady,
            this.#ezRegistrator);
    ---------------------------------------------------------------------------
 */
export class EzEmployerViewController extends EzClass {
    /**
        @static
        @public @readonly @property
        Returns the name of this class's singleton instance when registered with ezApi.
        @returns {string}
     */
    static get ezApiName() {
        return 'EzEmployerViewController';
    }

    /**
        @static
        @public @readonly @property
        Returns an object of event names that this class may trigger.
        @returns {object}
     */
    static get ezEventNames() {
        return {
            onReady: 'ezOn_EzEmployerViewController_Ready',
            ezOnInitialized: 'ezOn_EzEmployerViewController_Initialized'
        };
    }

    /**
        @static
        @private @field
        Stores the singleton instance of this class that was created by and registerd with EzApi.
        @type {EzEmployerViewController}
     */
    static #ezInstance = EzObject.hasProperty(globalThis, 'ezApi') &&
        EzObject.isValid(globalThis.ezApi) && EzBoolean.isTrue(globalThis.ezApi.ready) &&
        EzObject.isValid(globalThis.ezApi.ezclocker[EzEmployerViewController.ezApiName])
        ? globalThis.ezApi.ezclocker[EzEmployerViewController.ezApiName]
        : null;

    /**
        @static
        @public @property @getter
        Returns the singleton instance of this class that is registered with EzApi (if available yet)
        @returns {EzEmployerViewController}
     */
    static get ezInstance() {
        return EzEmployerViewController.#ezInstance;
    }

    /**
        @static
        @public @property @setter
        Sets the singleton instance of of this class that is registered with EzApi.
        @param {EzEmployerViewController} instance
     */
    static set ezInstance(instance) {
        if (null != EzEmployerViewController.#ezInstance) {
            throw new Error('EzEmployerViewController\'s singleton instance is already reigstered with EzApi.');
        }

        EzEmployerViewController.#ezInstance = instance;
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
        EzObject.isValid(globalThis.ezApi.ezclocker[EzEmployerViewController.ezApiName])
        ? EzRegistrationState.REGISTERED
        : null;

    /**
        @static
        @public @property @getter
        Returns the ezApi registration state of this classes's singleton instance.
        @returns {string}
        A valid enum property value from EzRegistrationState
     */
    static get ezApiRegistrationState() {
        return EzEmployerViewController.#ezApiRegistrationState;
    }

    /**
        @static
        @public @property @setter
        Sets the ezApi registration state of this classes's singleton instance.
        @param {string} ezApiRegistrationState
        A valid enum property value from EzRegistrationState
     */
    static set ezApiRegistrationState(ezApiRegistrationState) {
        EzEmployerViewController.#ezApiRegistrationState = EzRegistrationState.ezValueOf(ezApiRegistrationState);
    }

    /**
        @static
        @private @readonly @property
        Returns true when all required dependencies for this class report ready.
        In otherwords, the require dependency's singleton instance is created
        and is registered with and accessable from EzApi with ezApi.ezclocker.{dependency_name}.
        @returns {boolean}
     */
    static get #ezCanRegister() {
        return EzRegistrationState.PENDING === EzEmployerViewController.ezApiRegistrationState &&
            EzObject.hasProperty(globalThis, 'ezApi') &&
            EzObject.isValid(globalThis.ezApi) && EzBoolean.isTrue(globalThis.ezApi.ready) &&

            globalThis.ezApi.ezclocker[EzEventEngine.ezApiName] &&
            globalThis.ezApi.ezclocker[EzEventEngine.ezApiName].ready &&

            globalThis.ezApi.ezclocker[EzHttpHelper.ezApiName] &&
            globalThis.ezApi.ezclocker[EzHttpHelper.ezApiName].ready &&

            globalThis.ezApi.ezclocker[EzUrlHelper.ezApiName] &&
            globalThis.ezApi.ezclocker[EzUrlHelper.ezApiName].ready &&

            globalThis.ezApi.ezclocker[EzNavigation.ezApiName] &&
            globalThis.ezApi.ezclocker[EzNavigation.ezApiName].ready &&

            globalThis.ezApi.ezclocker[EzClockerContext.ezApiName] &&
            globalThis.ezApi.ezclocker[EzClockerContext.ezApiName].ready &&

            globalThis.ezApi.ezclocker[EzLicenseHelper.ezApiName] &&
            globalThis.ezApi.ezclocker[EzLicenseHelper.ezApiName].ready &&

            globalThis.ezApi.ezclocker[EzUI.ezApiName] &&
            globalThis.ezApi.ezclocker[EzUI.ezApiName].ready &&

            globalThis.ezApi.ezclocker[EzDialog.ezApiName] &&
            globalThis.ezApi.ezclocker[EzDialog.ezApiName].ready &&

            globalThis.ezApi.ezclocker[EzSendFeedbackDialog.ezApiName] &&
            globalThis.ezApi.ezclocker[EzSendFeedbackDialog.ezApiName].ready &&

            globalThis.ezApi.ezclocker[EzEmployerLogoController.ezApiName] &&
            globalThis.ezApi.ezclocker[EzEmployerLogoController.ezApiName].ready &&

            globalThis.ezApi.ezclocker[EzHelp.ezApiName] &&
            globalThis.ezApi.ezclocker[EzHelp.ezApiName].ready;
    }

    /**
        @static
        @private @readonly @property
        Returns if this class's singleton instance is registered with ezApi yet.
        @returns {boolean}
     */
    static get #ezIsRegistered() {
        return null != EzEmployerViewController.ezInstance &&
            EzRegistrationState.REGISTERED === EzEmployerViewController.ezApiRegistrationState;
    }

    /**
        @static
        @private @method
        Attempts to register the singleton instance for this class with ezApi. Returns true
        if successful, false otherwise.
        @returns {boolean}
     */
    static #ezRegistrator() {
        if (EzEmployerViewController.#ezCanRegister && !EzEmployerViewController.#ezIsRegistered) {
            globalThis.ezApi.ezRegisterNewApi(EzEmployerViewController, EzEmployerViewController.ezApiName);
        }

        return EzEmployerViewController.#ezIsRegistered;
    }

    /**
        @static
        Static Initialization
        ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        >> IMPORTANT <<
        ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        Make sure the following properties and methods get defined BEFORE this static initialization section:
            1) Property getter EzEmployerViewController.ezApiName
            2) Property getter EzEmployerViewController.ezEventNames
            3) Property getter EzEmployerViewController.ezInstance
            4) Property setter EzEmployerViewController.ezInstance
            5) Property getter EzEmployerViewController.ezApiRegistrationState
            6) Property setter EzEmployerViewController.ezApiRegistrationState
            7) Property getter EzEmployerViewController.#ezCanRegister
            8) Property getter EzEmployerViewController.#ezIsRegistered
            9) Method EzEmployerViewController.#ezRegistrator()
     */
    static {
        if (!EzEmployerViewController.#ezIsRegistered) {
            EzEmployerViewController.ezApiRegistrationState = EzRegistrationState.PENDING;

            if (!EzEmployerViewController.#ezRegistrator()) {
                document.addEventListener(
                    EzEmployerViewController.ezOnEzApiReadyEventName,
                    () => {
                        if (!EzEmployerViewController.#ezRegistrator()) {
                            document.addEventListener(
                                EzEventEngine.ezEventNames.onReady,
                                EzAccountViewController.#ezRegistrator);

                            // Remove EzHttpHelper listener if not using ezApi.ezclocker.ezHttpHelper
                            document.addEventListener(
                                EzHttpHelper.ezEventNames.onReady,
                                EzAccountViewController.#ezRegistrator);

                            document.addEventListener(
                                EzUrlHelper.ezEventNames.onReady,
                                EzAccountViewController.#ezRegistrator);

                            document.addEventListener(
                                EzNavigation.ezEventNames.onReady,
                                EzAccountViewController.#ezRegistrator);

                            document.addEventListener(
                                EzClockerContext.ezEventNames.onReady,
                                EzAccountViewController.#ezRegistrator);

                            document.addEventListener(
                                EzLicenseHelper.ezEventNames.onReady,
                                EzEmployerDashboardController.#ezRegistrator);

                            document.addEventListener(
                                EzUI.ezEventNames.onReady,
                                EzAccountViewController.#ezRegistrator);

                            document.addEventListener(
                                EzSendFeedbackDialog.ezEventNames.onReady,
                                EzAccountViewController.ezRegistrator);

                            document.addEventListener(
                                EzDialog.ezEventNames.onReady,
                                EzAccountViewController.#ezRegistrator);

                            document.addEventListener(
                                EzEmployerLogoController.ezEventNames.onReady,
                                EzAccountViewController.#ezRegistrator);

                            document.addEventListener(
                                EzHelp.ezEventNames.onReady,
                                EzAccountViewController.ezRegistrator);
                        }
                    });
            }
        }
    }

    /**
        @public @constructor
        >> DO NOT CREATE NEW INSTANCES OUTSIDE OF THE STATIC INITIALIZATION FLOW <<
        Use the static singleton instance available from ezApi: ezApi.ezclocker.ezJobCodeDialog.
     */
    constructor() {
        super();
    }

    /**
        @private @field
        Stores the dependency ready flags
        @returns {object}
     */
    ezPageViewReadyStateFlags = {
        selectedEmployerReady: false,
        selectedEmployerLicenseReady: false,
        userRoleFeaturesReady: false,
        featureTogglesReady: false
    };

    /**
        @private @readonly @getter
        Returns if all the dependences needed prior to rendering the page are available or not.
        @returns {boolean}
     */
    get ezPageViewReadyState() {
        return EzBoolean.isTrue(this.#ezDependencyReadyFlags.selectedEmployerReady) &&
            EzBoolean.isTrue(this.#ezDependencyReadyFlags.selectedEmployerLicenseReady) &&
            EzBoolean.isTrue(this.#ezDependencyReadyFlags.userRoleFeaturesReady) &&
            EzBoolean.isTrue(this.#ezDependencyReadyFlags.featureTogglesReady);
    }

    /**
        @public @readonly @property
        Returns the user-readable name of the view
        @returns {string}
     */
    get ezViewDisplayName() {
        return 'Page Name';
    }

    /**
        @public @readonly @proeprty
        Returns the name of the view (aka an id) that is used (normally) with feature toggle configurations.
        @returns {string}
     */
    get ezViewName() {
        return 'VIEW_NAME';
    }

    /**
        @public @readonly @property
        Returns the id of the <body> tag for this view.
        @returns {string}
     */
    get ezViewId() {
        return 'EzPageView_Body';
    }

    /**
        @public @readonly @property
        Returns an object of key = 'html id' for all the Ids used by the view
        @returns {object}
     */
    get ezIds() {
        return {
            id: this.ezViewId,
            featureToggleContainers: {
                ezPageViewNavTimeOffFeatureToggleContainerId: 'EzPageView_NavTimeOff_FeatureToggleContainer'
            },
            containers: {
                ezPageViewHeaderContainerId: 'EzPageViewHeader_Container',
                ezPageViewContentContainerId: 'EzPageView_Content_Container',
                ezPageViewHeaderEmployerLogoContainerId: 'EzPageViewHeader_EmployerNameAndLogo_Container',
                ezPageViewHeaderEmployerLogoImgContainerId: 'EzPageViewHeader_EmployerLogoImg_Container',
                ezPageViewHeaderEmployerNamePageNameContainerId: 'EzPageViewHeader_EmployerNamePageName_Container',
                ezPageViewHeaderEmployerNameContainerId: 'EzPageViewHeader_EmployerName_Container',
                ezPageViewHeaderPageViewNameContainerId: 'EzPageViewHeader_PageViewName_Container',
                ezPageViewHeaderNavigationContainerId: 'EzPageViewHeader_Navigation_Container',
                eZPageViewContentId: 'EZPageView_Content_Container',
                ezPageViewHideDialogsContainerId: '_HideDialogsDiv'
            },
            widgets: {
                ezPageViewHeaderId: 'EzPageViewHeader'
            },
            inputs: {

            },
            buttons: {
                ezPageViewNavDashboardButtonId: 'EzPageView_NavDashboardButton',
                ezPageViewNavSchedulesId: 'EzPageView_NavSchedules',
                ezPageViewNavTimeOffId: 'EzPageView_NavTimeOff',
                ezPageViewNavEmployeeArchiveId: 'EzPageView_NavEmployeeArchive',
                ezPageViewNavAccountButtonId: 'EzPageView_NavAccountButton',
                ezPageViewNavIntegrationsButtonId: 'EzPageView_NavIntegrationsButton',
                ezPageViewShowHelpButtonId: 'EzPageView_ShowHelpButton',
                ezPageViewNavSignoutButtonId: 'EzPageView_NavSignoutButton'
            },
            images: {
                ezPageViewHeaderEmployerLogoImgId: 'EzPageViewHeader_EmployerLogoImg'
            }
        }
    }

    /**
        @protected
        Initializes EzAccountViewController
     */
    ezInit() {
        EzPromise.ezAsyncAction(
            `Loading ${EzEmployerViewController.ezInstance.ezViewDisplayName} ...`,
            (waitDone) => {
                ezApi.ezclocker.ezEventEngine.ezWantEvent(
                    EzEmployerViewController.ezEventNames.ezOnInitialized,
                    EzEmployerViewController.ezApiName,
                    waitDone);

                EzEmployerViewController.ezInstance.ezRegisterPageViewEvents();

                EzEmployerViewController.ezInstance.ezRegisterEvents();

                EzEmployerViewController.ezInstance.ezRegisterLicenseEvents();

                EzEmployerViewController.ezInstance.ezRegisterWantEvents(waitDone);
            });

        return EzEmployerViewController.ezInstance;
    }

    /**
        @protected @method
        Processes the ready state flags and executes any additional processing that needs done after all ready flags return true.
        Triggers the EzEmployerViewController.ezEventNames.ezOnInitialized event
        after all ready flags return true and all additional processing is complete.
     */
    ezProcessReadyStateFlags() {
        if (self.ezPageViewReadyState) {
            return EzEmployerViewController.ezInitData()
                .then(
                    () => {
                        return EzEmployerViewController.ezInstance.ezInitUx()
                            .then(
                                () => {
                                    // Apply any feature toggles
                                    ezApi.ezclocker.ezFeatureToggles.ezApplyViewFeatureToggles(
                                        EzEmployerViewController.ezInstance.ezViewName());

                                    // Enable features based upon the user's roles
                                    ezApi.ezclocker.ezUserRoleFeatures.ezApplyUserRoleFeaturesForCurrentUser(
                                        EzEmployerViewController.ezInstance.ezViewName());

                                    // Update the UX state based upon the user's roles
                                    EzEmployerViewController.ezInstance.ezUpdateUxStateForUserRole();

                                    ezApi.ezclocker.ezClockerContext.ezValidateSelectedEmployerAccountLicense();

                                    ezApi.ezclocker.ezEventEngine.ezTriggerEvent(
                                        EzEmployerViewController.ezEventNames.ezOnInitialized,
                                        ezApi.ezclocker.ezEventEngine.ezBuildEventData(
                                            EzEmployerViewController.ezApiName,
                                            'EzEmployerViewController Initialized',
                                            EzEmployerViewController.ezInstance),
                                        EzEmployerViewController.ezInstance);
                                })
                    });
        }
    }

    /**
        @protected @method
        Registers the view controller's events with the EzEventEngine
     */
    ezRegisterPageViewEvents() {
        // Register any events the view controller triggers (except for the onReady event)

        ezApi.ezclocker.ezEventEngine.ezRegisterEvent(
            EzEmployerViewController.ezApiName,
            EzEmployerViewController.ezEventNames.ezOnInitialized);
    }

    /**
        @protected @method
        Registers event handlers for the EzLicenseHelper events.
     */
    ezRegisterLicenseEvents() {
        ezApi.ezclocker.ezLicenseHelper.ezHookLicenseEvents(
            EzEmployerViewController.ezApiName,
            // License valid handler
            () => {
                ezApi.ezclocker.ezLicenseHelper.ezUnhookLicenseEvents(EzEmployerViewController.ezApiName);
                EzEmployerViewController.ezInstance.ezInitUX();
            },
            // License expired handler (using default)
            null,
            // License error handler
            (eResponse) => waitDone()
                .then(
                    () => {
                        ezApi.ezclocker.ezLicenseHelper.ezUnhookLicenseEvents(
                            EzEmployerViewController.ezApiName);

                        ezApi.ezclocker.ezLogger.error(
                            ezApi.ezEM`
                                Failed to obtain the employer's license.
                                Error: ${EzJson.toJson(eResponse)}`);

                        ezApi.ezclocker.ezDialog.ezShowError(
                            'License Error',
                            eResponse.message);
                    }),
            // Free trial expired handler (using default)
            null,
            // License violation (using default)
            null);
    }

    /**
        @protected @method
        Registers want events from the EzEventEngine for the Page View
        @param {undefined|null|function} waitDone
        Optional waitDone function call back that stops any visible wait spinners.
     */
    ezRegisterWantEvents(waitDone) {
        // Hook feature toggles ready event
        ezApi.ezclocker.ezEventEngine.ezWantEvent(
            EzFeatureToggles.ezEventNames.onFeatureTogglesReady,
            EzEmployerViewController.ezApiName,
            () => {
                EzEmployerViewController.ezInstance.ezPageViewReadyStateFlags.featureTogglesReady = true;
                EzEmployerViewController.ezInstance.ezProcessReadyStateFlags(waitDone);
            },
            true);

        // Hook user role features ready event
        ezApi.ezclocker.ezEventEngine.ezWantEvent(
            EzUserRoleFeatures.ezEventNames.onEzUserRoleFeaturesReady,
            EzEmployerViewController.ezApiName,
            () => {
                EzEmployerViewController.ezInstance.ezPageViewReadyStateFlags.userRoleFeaturesReady = true;
                EzEmployerViewController.ezInstance.handleEmployerViewControllerReady(waitDone);
            },
            true);

        // Hook employer account ready event
        ezApi.ezclocker.ezEventEngine.ezWantEvent(
            EzClockerContextEventName.onSelectedEmployerAccountReady,
            EzEmployerViewController.ezApiName,
            () => {
                EzEmployerViewController.ezInstance.ezPageViewReadyStateFlags.selectedEmployerReady = true;
                EzEmployerViewController.ezInstance.handleEmployerViewControllerReady(waitDone);
            },
            true);

        ezApi.ezclocker.ezEventEngine.ezWantEvent(
            EzClockerContextEventName.onSelectedEmployerLicenseReady,
            EzEmployerDashboardController.ezApiName,
            () => {
                EzEmployerViewController.ezInstance.ezPageViewReadyStateFlags.selectedEmployerLicenseReady = true;
                EzEmployerViewController.ezInstance.handleEmployerViewControllerReady(waitDone);
            },
            true);

        ezApi.ezclocker.ezEventEngine.ezWantEventEx({
            eventName: EzClockerContextEventName.onSelectedEmployerLicenseUpdated,
            handlerName: EzEmployerDashboardController.ezApiName,
            handlerFunction: EzEmployerDashboardController.ezInstance.ezHandleOnSelectedEmployerLicenseUpdated
        });
    }

    /**
        @protected @method
        Initializes any data needed before the UX renders
     */
    ezInitData() {
        return ezApi.ezclocker.ezUi.asyncAction(
            (finished) => {
                // Obtain any data from the API that is needed before the UX renders

                return finished();
            });
    }

    /**
        @protected @method
        Initializes the view's UX
     */
    ezInitUx() {
        return EzPromise.asyncAction(
            (finished) => EzEmployerDashboardController.ezInstance.ezRender()
                .then(
                    () => {
                        EzEmployerViewController.ezHookNavigationButtons();

                        ezApi.ezclocker.ezHelp.ezEnableHelp(
                            EzEmployerViewController.ezInstance.ezIds.buttons.ezPageViewShowHelpButtonId)
                            .then(finished, finished);
                    }));
    }

    /**
        @protected @method
        Renders the UX for the page view by bulding html and injecting
        into the approperate containers within document.
     */
    ezRender() {
        return EzPromise.asyncAction(
            (finished) => {
                // Initializes any UX elements when the page initially loads
                ezApi.ezclocker.ezUi.ezAppendContent(
                    EzEmployerViewController.ezInstance.ezIds.containers.ezPageViewHeaderContainerId,
                    EzEmployerDashboardController.ezInstance.ezBuildHeaderHtml());

                ezApi.ezclocker.ezUi.ezAppendContent(
                    EzEmployerViewController.ezInstance.ezIds.containers.ezPageViewContentContainerId,
                    EzEmployerDashboardController.ezInstance.ezBuildContentHtml());

                ezApi.ezclocker.ezEmployerService.ezLoadEmployerImage(
                    ezApi.ezclocker.ezClockerContext.ezGetSelectedEmployerAccount().id)
                    .then(
                        (imageUrl) => ezApi.ezclocker.ezUi.setImgElementSrc('_EmployerLogoImage', imageUrl));

                ezApi.ezclocker.ezUi.ezSetImgElementSrc(
                    EzEmployerViewController.ezInstance.ezIds.containers.ezPageViewHeaderEmployerLogoImgId,
                    EzString.stringOrDefault.ezAssignOrDefault(
                        ezApi.ezclocker.ezClockerContext.ezGetSelectedEmployerAccount().employerName,
                        EzClockerContext.DEFAULT_EMPLOYER_NAME));

                ezApi.ezclocker.ezUi.ezContent(
                    EzEmployerViewController.ezInstance.ezIds.containers.ezPageViewHeaderEmployerNameContainerId,
                    'true' === ezApi.ezclocker.ezUrlHelper.getUrlParam('show-ids') || 'localhost' === window.location.hostname
                        ? EzHtml.build`
                            ${ezApi.ezclocker.ezClockerContext.ezGetSelectedEmployerAccount().employerName}
                            <div
                                id="EzPageViewHeader_EmployerId_Container">
                                class="ezContainer-contentBox-transparent ezText-micro-navy">
                                ( ${ezApi.ezclocker.ezClockerContext.ezGetSelectedEmployerAccount().id} )
                            </div>`
                        : ezApi.ezclocker.ezClockerContext.ezGetSelectedEmployerAccount().employerName);

                return finished();
            });
    }

    /**
        @protected @method
        Builds the page view's header HTML
        @returns {String}
     */
    ezBuildDashboardHeaderHtml() {
        return EzHtml.build`
            <!-- Page Header -->
            <div
                id="${EzEmployerViewController.ezInstance.ezIds.containers.ezPageViewHeaderId}"
                class="ezHeader">
                <div
                    id="${EzEmployerViewController.ezInstance.ezIds.containers.ezPageViewHeaderEmployerNameAndLogoContainerId}"
                    class="ezHeader-employer-logo-container">
                    <div
                        id="${EzEmployerViewController.ezInstance.ezIds.containers.ezPageViewHeaderEmployerLogoImgContainerId}"
                        class="ezHeader-logo-image-container">
                        <img
                            id="${EzEmployerViewController.ezInstance.ezIds.containers.ezPageViewHeaderEmployerLogoImgId}"
                            class="ezHeader-employer-logo"
                            alt=" "
                            src="/public/images/spinners/orange-spinner.gif" />
                    </div>
                    <div
                        id="${EzEmployerViewController.ezInstance.ezIds.containers.ezPageViewHeaderEmployerNamePageNameContainerId}"
                        class="class="ezAutoRow_A_A">
                        <div
                            id="${EzEmployerViewController.ezInstance.ezIds.containers.ezPageViewHeaderEmployerNameContainerId}"
                            class="ezHeader-employer-name">
                        </div>
                        <div
                            id="${EzEmployerViewController.ezInstance.ezIds.containers.ezPageViewHeaderPageViewNameContainerId}"
                            class="ez-header-page-name-text">
                            ${EzEmployerViewController.ezInstance.ezViewDisplayName}
                        </div>
                    </div>
                </div>
                <div
                    id="${EzEmployerViewController.ezInstance.ezIds.containers.ezPageViewHeaderNavigationContainerId}"
                    class="ezHeader-navigation-button-container">
                    <button
                        id="${EzEmployerViewController.ezInstance.ezIds.containers.ezPageViewNavDashboardButtonId}"
                        class="headerButton">
                        Dashboard
                    </button>
                    <button
                        id="${EzEmployerViewController.ezInstance.ezIds.containers.ezPageViewNavSchedulesId}"
                        class="headerButton">
                        Schedules
                    </button>
                    <span
                        id="${EzEmployerViewController.ezInstance.ezIds.containers.ezPageViewNavTimeOffFeatureToggleContainerId}"
                        data-feature-id="ezfTimeOff"
                        style="display:none">
                        <button
                            id="EzPageView_NavTimeOff"
                            class="headerButton">
                            Time off
                        </button>
                    </span>
                    <button
                        id="${EzEmployerViewController.ezInstance.ezIds.containers.ezPageViewNavEmployeeArchiveId}"
                        class="headerButton">
                        Employee Archive
                    </button>
                    <button
                        id="${EzEmployerViewController.ezInstance.ezIds.containers.ezPageViewNavAccountButtonId}"
                        class="headerButton">
                        Account
                    </button>
                    <button
                        id="${EzEmployerViewController.ezInstance.ezIds.containers.ezPageViewNavIntegrationsButtonId}"
                        class="headerButton">
                        Integrations
                    </button>
                    <button
                        id="${EzEmployerViewController.ezInstance.ezIds.containers.ezPageViewShowHelpButtonId}"
                        class="ezHeaderButton">
                        Help
                    </button>
                    <button
                        id="${EzEmployerViewController.ezInstance.ezIds.containers.ezPageViewNavSignoutButtonId}"
                        class="headerButton">
                        Sign Out
                    </button>
                </div>
            </div>`;
    }

    /**
        @protected @method
        Builds the page view's content html
        @returns {String}
     */
    ezBuildContentHtml() {
        return EzHtml.build`
            <!-- Page Content -->
            PAGE CONTENT HTML HERE`;
    }

    /**
        @protected @method
        Hooks the header's navigation buttons click events
     */
    ezHookNavigationButtons() {
        // Navigate to employer dashboard view
        ezApi.ezclocker.ezEventEngine.ezWantElementEvent(
            EzEmployerViewController.ezInstance.ezIds.buttons.ezPageViewNavDashboardButtonId,
            EzElementEventName.CLICK,
            EzEmployerViewController.ezApiName,
            ezApi.ezclocker.ezNavigation.ezNavigateToEmployerDashboard);

        // Navigate to employer schedules view
        ezApi.ezclocker.ezEventEngine.ezWantElementEvent(
            EzEmployerViewController.ezInstance.ezIds.buttons.ezPageViewNavSchedulesId,
            EzElementEventName.CLICK,
            EzEmployerViewController.ezApiName,
            ezApi.ezclocker.ezNavigation.ezNavigateToEmployerSchedules);

        // Navigate to employer time off view
        ezApi.ezclocker.ezEventEngine.ezWantElementEvent(
            EzEmployerViewController.ezInstance.ezIds.buttons.ezPageViewNavTimeOffId,
            EzElementEventName.CLICK,
            EzEmployerViewController.ezApiName,
            ezApi.ezclocker.ezNavigation.ezNavigateToTimeOff);

        // Navigate to employee archive view
        ezApi.ezclocker.ezEventEngine.ezWantElementEvent(
            EzEmployerViewController.ezInstance.ezIds.buttons.ezPageViewNavEmployeeArchiveId,
            EzElementEventName.CLICK,
            EzEmployerViewController.ezApiName,
            ezApi.ezclocker.ezNavigation.ezNavigateToEmployeeArchive);

        // Navigate to employer account view
        ezApi.ezclocker.ezEventEngine.ezWantElementEvent(
            EzEmployerViewController.ezInstance.ezIds.buttons.ezNavigateToEmployerAccountPage,
            EzElementEventName.CLICK,
            EzEmployerViewController.ezApiName,
            ezApi.ezclocker.ezNavigation.ezNavigateToEmployerAccountPage);

        // Show the help view
        ezApi.ezclocker.ezEventEngine.ezWantElementEvent(
            EzEmployerViewController.ezInstance.ezIds.buttons.ezPageViewShowHelpButtonId,
            EzElementEventName.CLICK,
            EzEmployerViewController.ezApiName,
            ezApi.ezclocker.ezNavigation.ezNavigateToTimeOff);

        // Sign out of ezClocker
        ezApi.ezclocker.ezEventEngine.ezWantElementEvent(
            EzEmployerViewController.ezInstance.ezIds.buttons.ezPageViewNavSignoutButtonId,
            EzElementEventName.CLICK,
            EzEmployerViewController.ezApiName,
            ezApi.ezclocker.ezNavigation.signOut);
    }

    /**
        @protected @method
        Updates the UX state based upon the users's roles
     */
    ezUpdateUxStateForUserRole() {
        if (ezApi.ezclocker.ezClockerContext.ezGetUserContext().isEmployer) {
            ezApi.ezclocker.ezUi.ezEnableElement(EzEmployerViewController.ezInstance.ezIds.buttons.ezNavigateToEmployerAccountPage);
        } else {
            ezApi.ezclocker.ezUi.ezDisableElement(EzEmployerViewController.ezInstance.ezIds.buttons.ezNavigateToEmployerAccountPage);
        }

        if (ezApi.ezclocker.ezClockerContext.ezGetUserContext().isPayrollManager) {
            ezApi.ezclocker.ezUi.ezSetContent(
                EzEmployerViewController.ezInstance.ezIds.containers.ezPageViewHeaderPageViewNameContainerId,
                `Payroll Manager ${EzEmployerViewController.ezInstance.ezViewDisplayName}`);
        } else if (ezApi.ezclocker.ezClockerContext.ezGetUserContext().isManager) {
            ezApi.ezclocker.ezUi.ezSetContent(
                EzEmployerViewController.ezInstance.ezIds.containers.ezPageViewHeaderPageViewNameContainerId,
                `Manager ${EzEmployerViewController.ezInstance.ezViewDisplayName}`);
        } else {
            ezApi.ezclocker.ezUi.ezSetContent(
                EzEmployerViewController.ezInstance.ezIds.containers.ezPageViewHeaderPageViewNameContainerId,
                `Employer ${EzEmployerViewController.ezInstance.ezViewDisplayName}`);
        }
    }


    /**
        @protected @method
        Handles the EzClockerContext onSelectedEmployerLicenseUpdated event.
     */
    ezHandleOnSelectedEmployerLicenseUpdated() {
        ezApi.ezclocker.ezLicenseHelper.ezHookLicenseEvents(
            EzEmployerViewController.ezApiName,
            // License valid handler
            () => {
                ezApi.ezclocker.ezLicenseHelper.ezUnhookLicenseEvents(EzEmployerViewController.ezApiName);

                ezApi.ezclocker.ezEmployeeDisplayController.ezUpdateInviteEmployeeButton();
            },
            // License expired handler (using default)
            null,
            // License error handler
            (eResponse) => {
                ezApi.ezclocker.ezLicenseHelper.ezUnhookLicenseEvents(EzEmployerViewController.ezApiName);

                ezApi.ezclocker.ezLogger.error(
                    ezApi.ezEM`
                        Failed to update the current license.
                        Error response: ${EzJson.toJson(eResponse)}`);

                ezApi.ezclocker.ezDialog.ezShowError(
                    'License Error',
                    eResponse.message);
            },
            // Free trial expired handler (using default)
            null);

        ezApi.ezclocker.ezClockerContext.ezValidateSelectedEmployerAccountLicense();
    }

}
