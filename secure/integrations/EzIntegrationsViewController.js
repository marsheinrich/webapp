import {
    EzBadParamException
} from '/ezlibrary/exceptions/EzBadParamException.js';

import {
    EzObject,
    EzBoolean,
    EzString,
    EzJson,
    EzPromise
} from '/ezlibrary/helpers/EzHelpers.js';

import {
    EzRegistrationState,
    EzAccountNavButtonActiveOption,
    EzElementEventName
} from '/ezlibrary/enums/EzEnumerations.js';

import { EzClass } from '/ezlibrary/EzClass.js';
import { EzEventEngine } from '/ezlibrary/ez-event-engine.js';
import { EzHttpHelper } from '/public/javascript/common/ezclocker-http-helper.js';
import { EzUrlHelper } from '/public/javascript/common/ezclocker-url-helper2.js';
import { EzNavigation } from '/public/javascript/common/ezclocker-navigation-helper.js';
import { EzClockerContext } from '/ezlibrary/EzClockerContext/ez-context.js';
import { EzFeatureToggles } from '/ezlibrary/ez-feature-toggles2.js';
import { EzUserRoleFeatures } from '/ezlibrary/ez-user-role-features.js';
import { EzEmployerService } from '/secure/javascript/common/ezclocker-employer-services.js';
import { EzLicenseHelper } from '/secure/javascript/common/ezclocker-license-helper.js';
import { EzUI } from '/public/javascript/common/ezui.js';
import { EzDialog } from '/public/javascript/common/ezclocker-dialog-helper.js';

import { EzHelp } from '/secure/widgets/EzHelp/EzHelp.js';
import { EzAccountNavButton } from '/secure/widgets/EzAccountNavButton/EzAccountNavButton.js';


/**
 * @class
 * @extends {EzClass}
 * @description
 * Controller for the integrations view
 */
export class EzIntegrationsViewController extends EzClass {
    /**
     * @public @readonly @property
     * Returns the user-readable name of the view
     * @returns {string}
     */
    get ezViewDisplayName() {
        return 'Page Name';
    }

    /**
     * @public @readonly @proeprty
     * Returns the name of the view (aka an id) that is used (normally) with feature toggle configurations.
     * @returns {string}
     */
    get ezViewName() {
        return 'VIEW_NAME';
    }

    /**
     * @public @readonly @property
     * Returns the id of the <body> tag for this view.
     * @returns {string}
     */
    get ezViewId() {
        return 'EzPageView_Body';
    }

    /**
     * @public @readonly @property
     * Returns an object of key = 'html id' for all the Ids used by the view
     * @returns {object}
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
            // widgets: {
            //     ezPageViewHeaderId: 'EzPageViewHeader'
            // },
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
     * @public @method
     * Initializes EzIntegrationsViewController
     */
    ezInit() {
        ezApi.ezclocker.ezUi.ezStartPageWait('Loading available integrations ...');

        ezApi.ezclocker.ezEventEngine.ezWantEvent(
            EzIntegrationsViewController.ezEventNames.ezOnInitialized,
            EzIntegrationsViewController.ezApiName,
            ezApi.ezclocker.ezUi.ezStopPageWait);

        EzIntegrationsViewController.ezInstance.ezRegisterPageViewEvents();

        EzIntegrationsViewController.ezInstance.ezRegisterLicenseEvents();

        EzIntegrationsViewController.ezInstance.ezRegisterWantEvents();

        return EzIntegrationsViewController.ezInstance;
    }

    /**
     * @public @method
     * Processes the ready state flags and executes any additional processing that needs done after all ready flags return true.
     * Triggers the EzIntegrationsViewController.ezEventNames.ezOnInitialized event
     * after all ready flags return true and all additional processing is complete.
     */
    ezProcessReadyStateFlags() {
        return EzIntegrationsViewController.ezInstance.ezInitData()
            .then(
                () => {
                    EzIntegrationsViewController.ezInstance.ezInitUx();

                    ezApi.ezclocker.ezEventEngine.ezTriggerEvent(
                        EzIntegrationsViewController.ezEventNames.ezOnInitialized,
                        ezApi.ezclocker.ezEventEngine.ezBuildEventData(
                            EzIntegrationsViewController.ezApiName,
                            'EzIntegrationsViewController Initialized',
                            EzIntegrationsViewController.ezInstance),
                        EzIntegrationsViewController.ezInstance);
                });
        // }
    }

    /**
     * @public @method
     * Registers the view controller's events with the EzEventEngine
     */
    ezRegisterPageViewEvents() {
        ezApi.ezclocker.ezEventEngine.ezRegisterEvent(
            EzIntegrationsViewController.ezApiName,
            EzIntegrationsViewController.ezEventNames.ezOnInitialized);
    }

    /**
     * @public @method
     * Registers event handlers for the EzLicenseHelper events.
     */
    ezRegisterLicenseEvents() {
        ezApi.ezclocker.ezLicenseHelper.ezHookLicenseEvents(
            EzIntegrationsViewController.ezApiName,
            // License valid handler
            () => {
                ezApi.ezclocker.ezLicenseHelper.ezUnhookLicenseEvents(EzIntegrationsViewController.ezApiName);

                EzIntegrationsViewController.ezInstance.ezInitUx();
            },
            // License expired handler (using default)
            null,
            // License error handler
            (eResponse) => {
                ezApi.ezclocker.ezLicenseHelper.ezUnhookLicenseEvents(
                    EzIntegrationsViewController.ezApiName);

                ezApi.ezclocker.ezLogger.error(
                    EzString.em`
                        Failed to obtain the employer's license.
                        Error: ${EzJson.toJson(eResponse)}`);

                ezApi.ezclocker.ezDialog.ezShowError(
                    'License Error',
                    eResponse.message);
            },
            // Free trial expired handler (using default)
            null,
            // License violation (using default)
            null);
    }

    /**
     * @public @method
     * Registers want events from the EzEventEngine for the Page View
     */
    ezRegisterWantEvents() {
        // Hook feature toggles ready event
        ezApi.ezclocker.ezEventEngine.ezWantEvent(
            "ezLicenseFeatureToggle",
            EzIntegrationsViewController.ezApiName,
            EzIntegrationsViewController.ezInstance.ezProcessReadyStateFlags,
            true);

        ezApi.ezclocker.ezEventEngine.ezWantEvent(
            //EzClockerContextEventName.onSelectedEmployerLicenseReady,
            'EzClockerContext_SelectedEmployer_License_Ready',
            EzIntegrationsViewController.ezApiName,
            EzIntegrationsViewController.ezInstance.onLicenseReady,
            true);

        // Employer info
        ezApi.ezclocker.ezEventEngine.ezWantEvent(
            //EzClockerContextEventName.onSelectedEmployerAccountChanged,
            'EzClockerContext_SelectedEmployer_Changed',
            EzIntegrationsViewController.ezApiName,
            EzIntegrationsViewController.ezInstance.ezHandleOnSelectedEmployerAccountReadyChanged,
            true);

        ezApi.ezclocker.ezEventEngine.ezWantEvent(
            //EzClockerContextEventName.onSelectedEmployerAccountReady,
            'EzClockerContext_SelectedEmployer_Ready',
            EzIntegrationsViewController.ezApiName,
            (ezEvent) => EzIntegrationsViewController.ezInstance.ezHandleOnSelectedEmployerAccountReadyChanged(ezEvent),
            true);

        ezApi.ezclocker.ezEventEngine.ezWantEvent(
            EzFeatureToggles.ezEventNames.onFeatureTogglesReady,
            EzIntegrationsViewController.ezApiName,
            (ezEvent) => ezEvent.data.ezApplyViewFeatureToggles('account'),
            true);

        ezApi.ezclocker.ezEventEngine.ezWantEvent(
            EzUserRoleFeatures.ezEventNames.onEzUserRoleFeaturesReady,
            EzIntegrationsViewController.ezApiName,
            () => ezApi.ezclocker.ezUserRoleFeatures.ezApplyUserRoleFeaturesForCurrentUser('account'),
            true);
    }

    /**
     * @public @method
     */
    onLicenseReady() {
        EzIntegrationsViewController.ezInstance.ezProcessReadyStateFlags();
    }

    /**
     * @public @method
     * Initializes any data needed before the UX renders
     */
    ezInitData() {
        return ezApi.ezAsyncAction(
            (finished) => {
                // Obtain any data from the API that is needed before the UX renders
                return finished();
            });
    }

    /**
     * @public @method
     * Initializes the view's UX
     */
    ezInitUx() {
        EzIntegrationsViewController.ezInstance.ezRender()
            .then(
                () => {
                    let integrationProviderIdStr = ezApi.ezclocker.ezUrlHelper.ezGetUrlParam('edit');

                    if (EzString.hasLength(integrationProviderIdStr)) {
                        ezApi.ezclocker.ezAvailableIntegrations.ezShowIntegrationSetup(integrationProviderIdStr);
                    }

                    ezApi.ezclocker.ezAccountNavButton.ezActiveOptionValue = EzAccountNavButtonActiveOption.ACCOUNT_INTEGRATIONS_OPTION;

                    ezApi.ezclocker.ezHelp.ezEnableHelp('EzShowHelpButton')
                        .then(
                            EzPromise.ignoreResolve,
                            EzPromise.ignoreReject);

                    ezApi.ezclocker.ezUi.ezPageWaitStop();
                });
    }

    /**
     * @public @method
     * Renders the UX for the page view by bulding html and injecting
     * into the approperate containers within document.
     */
    ezRender() {
        return ezApi.ezAsyncAction(
            (finished) => {
                // Main navigation
                ezApi.ezclocker.ezEventEngine.ezWantElementEvent(
                    '_NavSignout',
                    EzElementEventName.CLICK,
                    EzIntegrationsViewController.ezApiName,
                    ezApi.ezclocker.nav.signOut);

                ezApi.ezclocker.ezEventEngine.ezWantElementEvent(
                    '_NavAccount',
                    EzElementEventName.CLICK,
                    EzIntegrationsViewController.ezApiName,
                    ezApi.ezclocker.nav.ezNavigateToEmployerAccountPage);

                ezApi.ezclocker.ezEventEngine.ezWantElementEvent(
                    '_NavSchedules',
                    EzElementEventName.CLICK,
                    EzIntegrationsViewController.ezApiName,
                    ezApi.ezclocker.nav.ezNavigateToEmployerSchedules);

                ezApi.ezclocker.ezEventEngine.ezWantElementEvent(
                    '_NavEmployeeArchive',
                    EzElementEventName.CLICK,
                    EzIntegrationsViewController.ezApiName,
                    ezApi.ezclocker.nav.ezNavigateToEmployeeArchive);

                ezApi.ezclocker.ezEventEngine.ezWantElementEvent(
                    '_NavDashboard',
                    EzElementEventName.CLICK,
                    EzIntegrationsViewController.ezApiName,
                    ezApi.ezclocker.nav.ezNavigateToEmployerDashboard);

                ezApi.ezclocker.ezEventEngine.ezWantElementEvent(
                    '_NavTimeOff',
                    EzElementEventName.CLICK,
                    EzIntegrationsViewController.ezApiName,
                    ezApi.ezclocker.nav.ezNavigateToTimeOff);

                ezApi.ezclocker.ezEventEngine.ezWantElementEvent(
                    '_NavIntegrations',
                    EzElementEventName.CLICK,
                    EzIntegrationsViewController.ezApiName,
                    ezApi.ezclocker.nav.ezNavigateToEmployerIntegrationsPage);

                EzIntegrationsViewController.ezInstance.ezLoadCompanyLogo();

                return finished();
            });
    }

    /**
     * @public @method
     * Updates the UX state based upon the users's roles
     */
    ezUpdateUxStateForUserRole() {
        if (ezApi.ezclocker.ezClockerContext.ezGetUserContext().isEmployer) {
            ezApi.ezclocker.ezUi.ezEnableElement(EzIntegrationsViewController.ezInstance.ezIds.buttons.ezNavigateToEmployerAccountPage);
        } else {
            ezApi.ezclocker.ezUi.ezDisableElement(EzIntegrationsViewController.ezInstance.ezIds.buttons.ezNavigateToEmployerAccountPage);
        }

        if (ezApi.ezclocker.ezClockerContext.ezGetUserContext().isPayrollManager) {
            ezApi.ezclocker.ezUi.ezSetContent(
                EzIntegrationsViewController.ezInstance.ezIds.containers.ezPageViewHeaderPageViewNameContainerId,
                `Payroll Manager ${EzIntegrationsViewController.ezInstance.ezViewDisplayName}`);
        } else if (ezApi.ezclocker.ezClockerContext.ezGetUserContext().isManager) {
            ezApi.ezclocker.ezUi.ezSetContent(
                EzIntegrationsViewController.ezInstance.ezIds.containers.ezPageViewHeaderPageViewNameContainerId,
                `Manager ${EzIntegrationsViewController.ezInstance.ezViewDisplayName}`);
        } else {
            ezApi.ezclocker.ezUi.ezSetContent(
                EzIntegrationsViewController.ezInstance.ezIds.containers.ezPageViewHeaderPageViewNameContainerId,
                `Employer ${EzIntegrationsViewController.ezInstance.ezViewDisplayName}`);
        }
    }


    /**
     * @public @method
     * Handles the EzClockerContext onSelectedEmployerLicenseUpdated event.
     */
    ezHandleOnSelectedEmployerLicenseUpdated() {
        ezApi.ezclocker.ezLicenseHelper.ezHookLicenseEvents(
            EzIntegrationsViewController.ezApiName,
            // License valid handler
            () => {
                ezApi.ezclocker.ezLicenseHelper.ezUnhookLicenseEvents(EzIntegrationsViewController.ezApiName);

                ezApi.ezclocker.ezEmployeeDisplayController.ezUpdateInviteEmployeeButton();
            },
            // License expired handler (using default)
            null,
            // License error handler
            (eResponse) => {
                ezApi.ezclocker.ezLicenseHelper.ezUnhookLicenseEvents(EzIntegrationsViewController.ezApiName);

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


    /**
     * @public @method
     */
    ezLoadCompanyLogo() {
        ezApi.ezclocker.ezEmployerService.ezLoadEmployerImage(
            ezApi.ezclocker.ezClockerContext.ezGetSelectedEmployerAccount().id)
            .then(
                (imageUrl) => {
                    ezApi.ezclocker.ezUi.setImgElementSrc(
                        '_EmployerLogo',
                        imageUrl);
                });
    }

    /**
     * @protected @method
     * Handles the selected employer ready and updated events
     * Employer data available at: eventData.data
     */
    ezHandleOnSelectedEmployerAccountReadyChanged(eventData) {
        EzIntegrationsViewController.ezInstance.ezUpdateCompanyInfoUI(eventData.data.account);
    }

    /**
     * @public @method
     * Updates the company information ui
     */
    ezUpdateCompanyInfoUI(companyInfo) {
        if (!EzObject.isValid(companyInfo)) {
            throw new EzBadParamException(
                'companyInfo',
                EzIntegrationsViewController.ezInstance,
                EzIntegrationsViewController.ezInstance.ezUpdateCompanyInfoUI);
        }

        if (!companyInfo.ready) {
            ezApi.ezclocker.ezUi.ezSetContent('_EmployerNameCell', '');
            return;
        }

        ezApi.ezclocker.ezUi.ezSetContent('_EmployerNameCell', EzString.stringOrEmpty(companyInfo.employerName));
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
        return 'EzIntegrationsViewController';
    }

    /**
     * @static
     * @public @readonly @property
     * Returns an object of event names that this class may trigger.
     * @returns {object}
     */
    static get ezEventNames() {
        return {
            onReady: 'ezOn_EzIntegrationsViewController_Ready',
            ezOnInitialized: 'ezOn_EzIntegrationsViewController_Initialized'
        };
    }

    /**
     * @static
     * @private @field
     * Stores the singleton instance of this class that was created by and registerd with EzApi.
     * @type {EzIntegrationsViewController}
     */
    static #ezInstance = globalThis.ezApi?.ready && globalThis.ezApi?.ezclocker?.[EzIntegrationsViewController.ezApiName]
        ? globalThis.ezApi.ezclocker[EzIntegrationsViewController.ezApiName]
        : null;

    /**
     * @static
     * @public @property @getter
     * Returns the singleton instance of this class that is registered with EzApi (if available yet)
     * @returns {EzIntegrationsViewController}
     */
    static get ezInstance() {
        return EzIntegrationsViewController.#ezInstance;
    }

    /**
     * @static
     * @public @property @setter
     * Sets the singleton instance of of this class that is registered with EzApi.
     * @param {EzIntegrationsViewController} instance
     */
    static set ezInstance(instance) {
        if (null != EzIntegrationsViewController.#ezInstance) {
            throw new Error('EzIntegrationsViewController\'s singleton instance is already reigstered with EzApi.');
        }

        EzIntegrationsViewController.#ezInstance = instance;
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
    static #ezApiRegistrationState = globalThis.ezApi?.ready && globalThis.ezApi?.ezclocker?.[EzIntegrationsViewController.ezApiName]
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
        return EzIntegrationsViewController.#ezApiRegistrationState;
    }

    /**
     * @static
     * @public @property @setter
     * Sets the ezApi registration state of this classes's singleton instance.
     * @param {string} ezApiRegistrationState
     * A valid enum property value from EzRegistrationState
     */
    static set ezApiRegistrationState(ezApiRegistrationState) {
        EzIntegrationsViewController.#ezApiRegistrationState = EzRegistrationState.ezValueOf(ezApiRegistrationState);
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
        return EzRegistrationState.PENDING === EzIntegrationsViewController.ezApiRegistrationState &&
            EzObject.hasProperty(globalThis, 'ezApi') &&
            EzObject.isValid(globalThis.ezApi) && EzBoolean.isTrue(globalThis.ezApi.ready) &&

            globalThis.ezApi.ezclocker[EzEventEngine.ezApiName] &&
            globalThis.ezApi.ezclocker[EzEventEngine.ezApiName].ready &&

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

            globalThis.ezApi.ezclocker[EzEmployerService.ezApiName] &&
            globalThis.ezApi.ezclocker[EzEmployerService.ezApiName].ready &&

            globalThis.ezApi.ezclocker[EzHelp.ezApiName] &&
            globalThis.ezApi.ezclocker[EzHelp.ezApiName].ready &&

            globalThis.ezApi.ezclocker[EzAccountNavButton.ezApiName] &&
            globalThis.ezApi.ezclocker[EzAccountNavButton.ezApiName].ready;
    }

    /**
     * @static
     * @private @readonly @property
     * Returns if this class's singleton instance is registered with ezApi yet.
     * @returns {boolean}
     */
    static get #ezIsRegistered() {
        return null != EzIntegrationsViewController.ezInstance &&
            EzRegistrationState.REGISTERED === EzIntegrationsViewController.ezApiRegistrationState;
    }

    /**
     * @static
     * @private @method
     * Attempts to register the singleton instance for this class with ezApi. Returns true
     * if successful, false otherwise.
     * @returns {boolean}
     */
    static #ezRegistrator() {
        if (EzIntegrationsViewController.#ezCanRegister && !EzIntegrationsViewController.#ezIsRegistered) {
            globalThis.ezApi.ezRegisterNewApi(EzIntegrationsViewController, EzIntegrationsViewController.ezApiName);
        }

        return EzIntegrationsViewController.#ezIsRegistered;
    }

    /**
     * @static
     * Static Initialization
     * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
     * >> IMPORTANT <<
     * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
     * Make sure the following properties and methods get defined BEFORE this static initialization section:
     *     1) Property getter EzIntegrationsViewController.ezApiName
     *     2) Property getter EzIntegrationsViewController.ezEventNames
     *     3) Property getter EzIntegrationsViewController.ezInstance
     *     4) Property setter EzIntegrationsViewController.ezInstance
     *     5) Property getter EzIntegrationsViewController.ezApiRegistrationState
     *     6) Property setter EzIntegrationsViewController.ezApiRegistrationState
     *     7) Property getter EzIntegrationsViewController.#ezCanRegister
     *     8) Property getter EzIntegrationsViewController.#ezIsRegistered
     *     9) Method EzIntegrationsViewController.#ezRegistrator()
     */
    static {
        if (!EzIntegrationsViewController.#ezIsRegistered) {
            EzIntegrationsViewController.ezApiRegistrationState = EzRegistrationState.PENDING;

            if (!EzIntegrationsViewController.#ezRegistrator()) {
                document.addEventListener(
                    EzIntegrationsViewController.ezOnEzApiReadyEventName,
                    () => {
                        if (!EzIntegrationsViewController.#ezRegistrator()) {
                            document.addEventListener(
                                EzEventEngine.ezEventNames.onReady,
                                EzIntegrationsViewController.#ezRegistrator);

                            // Remove EzHttpHelper listener if not using ezApi.ezclocker.ezHttpHelper
                            document.addEventListener(
                                EzHttpHelper.ezEventNames.onReady,
                                EzIntegrationsViewController.#ezRegistrator);

                            document.addEventListener(
                                EzUrlHelper.ezEventNames.onReady,
                                EzIntegrationsViewController.#ezRegistrator);

                            document.addEventListener(
                                EzNavigation.ezEventNames.onReady,
                                EzIntegrationsViewController.#ezRegistrator);

                            document.addEventListener(
                                EzClockerContext.ezEventNames.onReady,
                                EzIntegrationsViewController.#ezRegistrator);

                            document.addEventListener(
                                EzEmployerService.ezEventNames.onReady,
                                EzIntegrationsViewController.#ezRegistrator);

                            document.addEventListener(
                                EzUI.ezEventNames.onReady,
                                EzIntegrationsViewController.#ezRegistrator);

                            document.addEventListener(
                                EzSendFeedbackDialog.ezEventNames.onReady,
                                EzIntegrationsViewController.ezRegistrator);

                            document.addEventListener(
                                EzDialog.ezEventNames.onReady,
                                EzIntegrationsViewController.#ezRegistrator);

                            document.addEventListener(
                                EzHelp.ezEventNames.onReady,
                                EzIntegrationsViewController.ezRegistrator);

                            document.addEventListener(
                                EzAccountNavButton.ezEventNames.onReady,
                                EzIntegrationsViewController.#ezRegistrator);
                        }
                    });
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
