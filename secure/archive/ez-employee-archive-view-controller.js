import { EzClass } from '/ezlibrary/EzClass.js';

import {
    EzObject,
    EzBoolean,
    EzString,
    EzPromise
} from '/ezlibrary/helpers/EzHelpers.js';

import {
    EzRegistrationState,
    EzElementEventName,
    EzClockerContextEventName
} from '/ezlibrary/enums/EzEnumerations.js';

import { EzEventEngine } from '/ezlibrary/ez-event-engine.js';

import { EzClockerContext } from '/ezlibrary/EzClockerContext/ez-context.js';

// TODO: Fix team chat defects then re-enable
//import { EzClockerFeature } from '/ezlibrary/EzClockerFeature.js';

import { EzEmployerService } from '/secure/javascript/common/ezclocker-employer-services.js';
import { EzUx } from '/ezlibrary/ux/EzUx.js';
import { EzUI } from '/public/javascript/common/ezui.js';

import { EzEmployeeArchiveView } from '/secure/archive/ez-employee-archive-view.js';

// TODO: Fix team chat defects then re-enable
//import { EzTeamChatDialog } from '/secure/widgets/EzTeamChatDialog/EzTeamChatDialog.js';

/**
    @class
    @extends {EzClass}
    @description
    Controller for the ezClocker employee archive page
    ---------------------------------------------------------------------------
    Import with:
        import { EzEmployeeArchiveController } from '/secure/archive/ez-employee-archive-view-controller.js';
    ---------------------------------------------------------------------------
    Singleton instance ready for use when the below evaluates to true:
        globalThis.ezApi.ezclocker[EzEmployeeArchiveController.ezApiName] &&
        globalThis.ezApi.ezclocker[EzEmployeeArchiveController.ezApiName] .ready
    ---------------------------------------------------------------------------
    Listen to onReady event:
        document.addEventListener(
            EzEmployeeArchiveController.ezEventNames.onReady,
            this.ezRegistrator);
    ---------------------------------------------------------------------------
    Singleton Instance Reference:
        ezApi.ezclocker.ezEmployeeArchiveController
    ---------------------------------------------------------------------------
 */
export class EzEmployeeArchiveController extends EzClass {
    /**
     * @public @readonly @property
     * @returns {string}
     */
    get ezClassName() {
        return 'EzEmployeeArchiveController';
    }

    /**
     * @protected @method
     * Initializes EzEmployeeArchiveController
     * @returns {EzEmployeeArchiveController}
     */
    ezInit() {
        EzEmployeeArchiveController.ezInstance.ezInitUx();
        return EzEmployeeArchiveController.ezInstance;
    }

    /**
     * @protected @method
     * Initializes the page UX
     */
    ezInitUx() {
        ezApi.ezclocker.ezEventEngine.ezWantEventEx({
            eventName: EzClockerContextEventName.onSelectedEmployerLicenseReady,
            handlerName: EzEmployeeArchiveController.ezApiName,
            handlerFunction: EzEmployeeArchiveController.ezInstance.ezHandleSelectedEmployerAccountLicenseReady
        });

        return ezApi.ezclocker.ezUi.ezStartPageWaitExecute(
            'Loading archived employee data ...',
            (waitDone) => ezApi.ezclocker.ezEventEngine.ezWantEvent(
                //EzClockerContextEventName.onSelectedEmployerAccountReady,
                'EzClockerContext_SelectedEmployer_Ready',
                EzEmployeeArchiveController.ezApiName,
                () => EzEmployeeArchiveController.ezInstance.ezGetEmployerArchiveData()
                    .then(
                        () => {

                            // Refresh the archived employee data every 5mins
                            setInterval(
                                EzEmployeeArchiveController.ezInstance.ezGetEmployerArchiveData,
                                300000);

                            // TODO: Fix team chat defects then re-enable
                            //ezApi.ezclocker.ezEventEngine.ezWantElementEvent(
                            //    'EzNavigationTeamChatButton',
                            //    EzElementEventName.CLICK,
                            //    EzEmployeeArchiveController.ezApiName,
                            //    ezApi.ezclocker.ezTeamChatDialog.ezShow);

                            ezApi.ezclocker.ezEventEngine.ezWantElementEvent(
                                '_NavDashboard',
                                EzElementEventName.CLICK,
                                EzEmployeeArchiveController.ezApiName,
                                ezApi.ezclocker.ezNavigation.navigateToEmployerDashboard);

                            ezApi.ezclocker.ezEventEngine.ezWantElementEvent(
                                '_NavSchedules',
                                EzElementEventName.CLICK,
                                EzEmployeeArchiveController.ezApiName,
                                ezApi.ezclocker.ezNavigation.navigateToEmployerSchedules);

                            ezApi.ezclocker.ezEventEngine.ezWantElementEvent(
                                '_NaviSignout',
                                EzElementEventName.CLICK,
                                EzEmployeeArchiveController.ezApiName,
                                ezApi.ezclocker.ezNavigation.signOut);

                            ezApi.ezclocker.ezEmployeeArchiveView.ezRender();

                            return waitDone()
                                .then(
                                    () => {
                                    EzUx.enable('_NavDashboard');

                                    EzUx.enable('_NavSchedules');

                                    EzUx.enable('_NaviSignout');
                                });
                        },
                        () => {
                            EzEmployeeArchiveController.ezInstance.ezInitUx();

                            return waitDone()
                                .then(ezApi.ezIgnoreResolve);
                        })));
    }

    /**
     * @public @method
     * Loads the company logo into the UX
     */
    static ezLoadCompanyLogoURL() {
        return ezApi.ezclocker.ezEmployerService.ezLoadEmployerImage(
            ezApi.ezclocker.ezClockerContext.ezGetSelectedEmployerAccount().id)
            .then(
                (imageUrl) => {
                    ezApi.ezclocker.ezUi.setImgElementSrc(
                        EzAccountViewController.ezInstance.ezIds.images.pageHeaderEmployerLogoImageId,
                        imageUrl);

                    ezApi.ezclocker.ezUi.setImgElementSrc(
                        EzAccountViewController.ezInstance.ezIds.images.accountPageExampleEmployerLogo,
                        imageUrl);
                });
    }

    /**
     * @protected @method
     * Handles the onSelectedEmployerLicenseReady event from EzClockerContext
     */
    ezHandleSelectedEmployerAccountLicenseReady() {
        EzEmployeeArchiveController.ezInstance.ezApplyLicenseFeatureToggles();
    }

    /**
     * @protected @method
     * Applies license feature toggles as needed
     */
    ezApplyLicenseFeatureToggles() {
        // TODO: Fix team chat defects then re-enable
        /*
        if (ezApi.ezclocker.ezClockerContext.ezSelectedEmployerAccountFeatureEnabled(EzClockerFeature.EZ_TEAM_CHAT)) {
            // Actions to enable team chat features
            ezApi.ezclocker.ezUi.ezEnableElement('EzNavigationTeamChatButton');

            ezApi.ezclocker.ezUi.ezShowElement('EzNavigationTeamChatButton');
        } else {
            // Actions to disable team chat features
            ezApi.ezclocker.ezUi.ezDisableElement('EzNavigationTeamChatButton');
            ezApi.ezclocker.ezUi.ezHideElement('EzNavigationTeamChatButton');
        }
        */
    }

    /**
     * @protected @method
     * Obtains the available archived employee data.
     * @returns {Promise}
     */
    ezGetEmployerArchiveData() {
        return EzPromise.promise(
            (resolve, reject) => {
                return ezApi.ezclocker.ezClockerContext.ezLoadSelectedEmployerAccountArchivedEmployees()
                    .then(
                        (archivedEmployees) => resolve(archivedEmployees),
                        (eResponse) => {
                            if (EzString.stringHasLength(eResponse.message)) {
                                ezApi.ezclocker.ezDialog.ezShowError(
                                    'Archived Employee Error',
                                    EzString.em`
                                        Unable to load employee archive data at this time.<br/>
                                        Error reported: ${eResponse.message}<br/>`);
                            } else {
                                ezApi.ezclocker.ezDialog.ezShowError(
                                    'Archived Employee Error',
                                    'Unable to load employee archive data at this time.');
                            }
                            return reject([]);
                        });
            });
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
        return 'ezEmployeeArchiveController';
    }

    /**
     * @static
     * @public @readonly @property
     * Returns an object of event names that this class may trigger.
     * @returns {object}
     */
    static get ezEventNames() {
        return {
            onReady: 'ezOn_EzEmployeeArchiveController_Ready',
        };
    }

    /**
     * @static
     * @private @field
     * Stores the singleton instance of this class that was created by and registerd with EzApi.
     * @type {EzEmployeeArchiveController}
     */
    static #ezInstance = EzObject.hasProperty(globalThis, 'ezApi') &&
        EzObject.isValid(globalThis.ezApi) && EzBoolean.isTrue(globalThis.ezApi.ready) &&
        EzObject.isValid(globalThis.ezApi.ezclocker[EzEmployeeArchiveController.ezApiName])
        ? globalThis.ezApi.ezclocker[EzEmployeeArchiveController.ezApiName]
        : null;
    /**
     * @static
     * @public @property @getter
     * Returns the singleton instance of this class that is registered with EzApi (if available yet)
     * @returns {EzEmployeeArchiveController}
     */
    static get ezInstance() {
        return EzEmployeeArchiveController.#ezInstance;
    }
    /**
     * @static
     * @public @property @setter
     * Sets the singleton instance of of this class that is registered with EzApi.
     * @param {EzEmployeeArchiveController} instance
     */
    static set ezInstance(instance) {
        if (null != EzEmployeeArchiveController.#ezInstance) {
            throw new Error('EzEmployeeArchiveController\'s singleton instance is already reigstered with EzApi.');
        }

        EzEmployeeArchiveController.#ezInstance = instance;
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
        EzObject.isValid(globalThis.ezApi.ezclocker[EzEmployeeArchiveController.ezApiName])
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
        return EzEmployeeArchiveController.#ezApiRegistrationState;
    }

    /**
     * @static
     * @public @property @setter
     * Sets the ezApi registration state of this classes's singleton instance.
     * @param {string} ezApiRegistrationState
     * A valid enum property value from EzRegistrationState
     */
    static set ezApiRegistrationState(ezApiRegistrationState) {
        EzEmployeeArchiveController.#ezApiRegistrationState = EzRegistrationState.ezValueOf(ezApiRegistrationState);
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
        return EzRegistrationState.PENDING === EzEmployeeArchiveController.ezApiRegistrationState &&
            EzObject.hasProperty(globalThis, 'ezApi') && EzObject.isValid(globalThis.ezApi) &&
            EzBoolean.isTrue(globalThis.ezApi.ready) &&

            globalThis.ezApi.ezclocker[EzEventEngine.ezApiName] &&
            globalThis.ezApi.ezclocker[EzEventEngine.ezApiName].ready &&

            globalThis.ezApi.ezclocker[EzClockerContext.ezApiName] &&
            globalThis.ezApi.ezclocker[EzClockerContext.ezApiName].ready &&

            globalThis.ezApi.ezclocker[EzEmployerService.ezApiName] &&
            globalThis.ezApi.ezclocker[EzEmployerService.ezApiName].ready &&

            globalThis.ezApi.ezclocker[EzUI.ezApiName] &&
            globalThis.ezApi.ezclocker[EzUI.ezApiName].ready &&

            globalThis.ezApi.ezclocker[EzEmployeeArchiveView.ezApiName] &&
            globalThis.ezApi.ezclocker[EzEmployeeArchiveView.ezApiName].ready;

        // TODO: Fix team chat defects then re-enable
        //globalThis.ezApi.ezclocker[EzTeamChatDialog.ezApiName] &&
        //globalThis.ezApi.ezclocker[EzTeamChatDialog.ezApiName].ready;
    }

    /**
     * @static
     * @private @readonly @property
     * Returns if this class's singleton instance is registered with ezApi yet.
     * @returns {boolean}
     */
    static get #ezIsRegistered() {
        return null != EzEmployeeArchiveController.ezInstance &&
            EzRegistrationState.REGISTERED === EzEmployeeArchiveController.ezApiRegistrationState;
    }

    /**
     * @static
     * @private @method
     * Attempts to register the singleton instance for this class with ezApi. Returns true
     * if successful, false otherwise.
     * @returns {boolean}
     */
    static #ezRegistrator() {
        if (EzEmployeeArchiveController.#ezCanRegister && !EzEmployeeArchiveController.#ezIsRegistered) {
            globalThis.ezApi.ezRegisterNewApi(EzEmployeeArchiveController, EzEmployeeArchiveController.ezApiName);
        }

        return EzEmployeeArchiveController.#ezIsRegistered;
    }

    /**
     * @static
     * Static Initialization
     * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
     * >> IMPORTANT <<
     * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
     * Make sure the following properties and methods get defined BEFORE this static initialization section:
     *     1) Property getter EzEmployeeArchiveController.ezApiName
     *     2) Property getter EzEmployeeArchiveController.ezEventNames
     *     3) Property getter EzEmployeeArchiveController.ezInstance
     *     4) Property setter EzEmployeeArchiveController.ezInstance
     *     5) Property getter EzEmployeeArchiveController.ezApiRegistrationState
     *     6) Property setter EzEmployeeArchiveController.ezApiRegistrationState
     *     7) Property getter EzEmployeeArchiveController.#ezCanRegister
     *     8) Property getter EzEmployeeArchiveController.#ezIsRegistered
     *     9) Method EzEmployeeArchiveController.#ezRegistrator()
     */
    static {
        if (!EzEmployeeArchiveController.#ezIsRegistered) {
            EzEmployeeArchiveController.ezApiRegistrationState = EzRegistrationState.PENDING;

            if (!EzEmployeeArchiveController.#ezRegistrator()) {
                document.addEventListener(
                    EzEmployeeArchiveController.ezOnEzApiReadyEventName,
                    EzEmployeeArchiveController.#ezRegistrator);

                document.addEventListener(
                    EzEventEngine.ezEventNames.onReady,
                    EzEmployeeArchiveController.#ezRegistrator);

                document.addEventListener(
                    EzClockerContext.ezEventNames.onReady,
                    EzEmployeeArchiveController.#ezRegistrator);

                document.addEventListener(
                    EzEmployerService.ezEventNames.onReady,
                    EzEmployeeArchiveController.#ezRegistrator);

                document.addEventListener(
                    EzEmployeeArchiveView.ezEventNames.onReady,
                    EzEmployeeArchiveController.#ezRegistrator);

                // TODO: Fix team chat defects then re-enable
                //document.addEventListener(
                //    EzTeamChatDialog.ezEventNames.onReady,
                //    EzEmployeeArchiveController.#ezRegistrator)
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
