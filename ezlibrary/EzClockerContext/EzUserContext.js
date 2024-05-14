import {
    EzObject,
    EzBoolean,
    EzString,
    EzPromise,
    EzJson
} from '/ezlibrary/helpers/EzHelpers.js';

import { EzRegistrationState } from '/ezlibrary/enums/EzRegistrationState.js';
import { EzClass } from '/ezlibrary/EzClass.js';

import { EzClockerContextEventName } from '/ezlibrary/EzClockerContext/EzClockerContextEventName.js';
import { EzEventEngine } from '/ezlibrary/ez-event-engine.js';
import { EzHttpHelper } from '/public/javascript/common/ezclocker-http-helper.js';
import { EzUrlHelper } from '/public/javascript/common/ezclocker-url-helper2.js';
import { EzNavigation } from '/public/javascript/common/ezclocker-navigation-helper.js';

import { EzTickerTimer } from '/public/javascript/common/ez-ticker-timer.js';

/**
 * Represents the authenticatd user's context
 * Import with:
 * import { EzUserContext } from '/ezlibrary/EzClockerContext/EzUserContext.js';
 * globalThis.ezApi.ezclocker[EzUserContext.ezApiName] &&
 * globalThis.ezApi.ezclocker[EzUserContext.ezApiName] .ready &&
 *
 * document.addEventListener(
 *     EzUserContext.ezEventNames.onReady,
 *     this.#ezRegistrator);
 */
export class EzUserContext extends EzClass {
    /**
     * @public @field
     */;
    userAccont = null;

    /**
     * @public @field
     */;
    userAccountRoles = [];

    /**
     * @public @field
     */
    isAdmin = false;

    /**
     * @public @field
     */
    isSupport = false;

    /**
     * @public @field
     */
    isDeveloper = false;

    /**
     * @public @field
     */
    isEmployer = false;

    /**
     * @public @field
     */
    isPayrollManager = false

    /**
     * @public @field
     */
    isManager = false;

    /**
     * @public @field
     */
    isEmployee = false;

    /**
     * @public @field
     */
    isPersonal = false;

    /**
     * @private @field
     * Stores the user context updator interval ticker info object
     * @type {object}
     */
    #ezUserContextUpdatorIntervalTicker = null;
    /**
     * @public @property @getter
     * Gets the user context updator interval ticker info object
     * @returns {object}
     */
    get ezUserContextUpdatorIntervalTicker() {
        return this.#ezUserContextUpdatorIntervalTicker;
    }
    /**
     * @public @property @getter
     * Sets the user context updator interval ticker info object
     * @returns {object}
     */
    set ezUserContextUpdatorIntervalTicker(ezUserContextUpdatorIntervalTicker) {
        this.#ezUserContextUpdatorIntervalTicker = EzObject.assignOrNull(ezUserContextUpdatorIntervalTicker);
    }

    /**
     * @public @readonly @property
     * Gets if the authenticated user is one of the following conditions:
     * 1) Is a Employer account
     * 2) Is a Payroll Manager account that can act as a employer account
     * 3) Is a Manager account acting as a employer account.
     * @returns {boolean}
     */
    get isEmployerPayrollManagerOrManager() {
        return EzBoolean.isTrue(this.isEmployer) ||
            EzBoolean.isTrue(this.isPayrollManager) ||
            EzBoolean.isTrue(this.isManager);
    }

    /**
     * @public @readonly @property
     * Gets if the authenticated user not a Personal account and meets one of the following conditions:
     * 1) Is a Employer account
     * 2) Is a Payroll Manager account that can act as a employer account
     * 3) Is a Manager account acting as a employer account.
     * @returns {boolean}
     */
    get isEmployerOrActingAsEmployer() {
        return EzBoolean.isFalse(this.isPersonal) &&
            this.isEmployerPayrollManagerOrManager;

    }

    /**
     * @public @readonly @property
     * Gets if the authenticated user meets all the following conditions:
     * 1) Is a employer account
     * 2) Not a Payroll Manager account
     * 3) Not a Manager account
     * 4) Not a Employee account
     * 5) Not a Personal account
     * @returns {boolean}
     */
    get isPureEmployer() {
        return EzBoolean.isTrue(this.isEmployer) &&
            EzBoolean.isFalse(this.isPayrollManager) &&
            EzBoolean.isFalse(this.isManager) &&
            EzBoolean.isFalse(this.isEmployee) &&
            EzBoolean.isFalse(this.isPersonal);
    }

    /**
     * @public @readonly @property
     * Gets if the authenticated user meets all of the following conditions:
     * 1) Is a Employee account (for non-personal employer)
     * 2) Not a Employer account
     * 3) Not a Payroll Manager account
     * 4) Not a Manager account
     * 5) Not a Personal account
     * @returns {boolean}
     */
    get isPureEmployee() {
        return EzBoolean.isTrue(this.isEmployee) &&
            EzBoolean.isFalse(this.isEmployer) &&
            EzBoolean.isFalse(this.isPayrollManager) &&
            EzBoolean.isFalse(this.isManager) &&
            EzBoolean.isFalse(this.isPersonal);
    }

    /**
     * @public @method
     * Initializes EzUserContext
     * @returns {EzUserContext}
     */
    ezInit() {
        ezApi.ezclocker.ezEventEngine.ezRegisterEvent(
            EzUserContext.ezApiName,
            EzUserContext.ezEventNames.onUserContextModuleReady);

        ezApi.ezclocker.ezEventEngine.ezRegisterEvent(
            EzUserContext.ezApiName,
            EzUserContext.ezEventNames.onUserContextReady);

        ezApi.ezclocker.ezEventEngine.ezRegisterEvent(
            EzUserContext.ezApiName,
            EzClockerContextEventName.onUserContextUpdated);

        EzUserContext.ezInstance.ezSetDefaultUserContext();

        ezApi.ezclocker.ezEventEngine.ezTriggerEvent(
            EzUserContext.ezEventNames.onUserContextModuleReady,
            EzUserContext.ezInstance);

        return EzUserContext.ezInstance;
    }

    /**
     * @public @method
     * Sets the default user context values.
     */
    ezSetDefaultUserContext() {
        EzUserContext.ezInstance.ready = false;
        EzUserContext.ezInstance.userAccont = null;
        EzUserContext.ezInstance.userAccountRoles = [];
        EzUserContext.ezInstance.isAdmin = false;
        EzUserContext.ezInstance.isSupport = false;
        EzUserContext.ezInstance.isDeveloper = false;
        EzUserContext.ezInstance.isEmployer = false;
        EzUserContext.ezInstance.isPayrollManager = false;
        EzUserContext.ezInstance.isManager = false;
        EzUserContext.ezInstance.isEmployee = false;
        EzUserContext.ezInstance.isPersonal = false;
    }

    /**
     * @public @method
     * Loads the user context
     * @param {EzClockerContext} ezClockerContext
     * @returns {Promise}
     * Resolve returns this instance
     * Reject returns error response from the service
     */
    ezLoadUserContext(ezClockerContext) {
        EzUserContext.ezInstance.ready = false;

        if (!EzObject.isValid(ezClockerContext)) {
            ezClockerContext = ezApi.ezclocker?.ezClockerContext;

            if (!EzObject.isValid(ezClockerContext)) {
                throw new EzBadParamException(
                    'ezClockerContext',
                    EzUserContext.ezInstance,
                    EzUserContext.ezInstance.ezLoadUserContext);
            }
        }

        if (EzBoolean.isFalse(ezApi.ezclocker.ezUrlHelper.ezIsLocationUrlEzClockerSecure())) {
            EzUserContext.ezInstance.ezSetUserContext(
                null,
                ezClockerContext);

            return EzPromise.resolve(this);
        }

        return EzPromise.asyncAction(
            // _api/v1/users/context
            (finished) => ezApi.ezclocker.ezHttpHelper.ezGet(
                ezApi.ezclocker.ezNavigation.ezGetInternalApiUrl(
                    `users/full-context?time-zone-id=${ezApi.ezclocker.ezDateTime.activeTimeZone}`,
                    'v1'))
                .then(
                    ezApi.ezclocker.ezHttpHelper.ezProcessApiResolve,
                    ezApi.ezclocker.ezHttpHelper.ezProcessApiReject)
                .then(
                    (response) => {
                        let userContext = response.entity;

                        if (!EzObject.isValid(userContext)) {
                            ezApi.ezclocker.ezLogger.error(
                                EzString.em`
                                    Full context response did not contain a userContext instance.
                                    Response: ${EzJson.toJson(userContext)}`);

                            return finished(response);
                        }

                        EzUserContext.ezInstance.ezSetUserContext(userContext, ezClockerContext);

                        // Load the other contexes from what was provided via the user context.
                        if (userContext.isEmployer) {
                            // Employer Accounts
                            ezClockerContext.ezLoadEmployerContextFromUserContext(userContext);
                        } else if (userContext.isPayrollManager) {
                            // Manager Accounts
                            ezClockerContext.ezLoadPayrollManagerContextFromUserContext(userContext);
                        } else if (userContext.isManager) {
                            // Manager Accounts
                            ezClockerContext.ezLoadManagerContextFromUserContext(userContext);
                        } else if (userContext.isEmployee) {
                            // Employee Accounts
                            ezClockerContext.ezLoadEmployeeContextFromUserContext(userContext);
                        } else if (userContext.isPersonal) {
                            // Personal Accounts
                            ezClockerContext.ezLoadPersonalContextFromUserContext(userContext);
                        }

                        let activeAccount = ezClockerContext.ezGetActiveAccount();

                        if (EzObject.isValid(activeAccount) && EzBoolean.isTrue(activeAccount.ready)) {
                            ezClockerContext.ezTriggerActiveAccountReady(activeAccount);
                        } else {
                            ezApi.ezclocker.ezLogger.warn(
                                EzString.em`
                                    The EzClockerContext did not initialize with an active account.
                                    Assuming the current user is not logged in.`);
                        }

                        if (ezClockerContext.ezUserContext.isEmployee &&
                            !ezClockerContext.ezUserContext.isPersonal && !ezClockerContext.ezUserContext.isEmployer &&
                            !ezClockerContext.ezUserContext.isPayrollManager && !ezClockerContext.ezUserContext.isManager) {
                            // Only start the updator if it is an employee account
                            EzUserContext.ezInstance.ezStartUserContextUpdatorIntervalTicker();
                        } else {
                            EzUserContext.ezInstance.ezStopUserContextUpdatorIntervalTicker();
                        }

                        return finished(EzUserContext.ezInstance);
                    },
                    (eResponse) => {
                        ezApi.ezclocker.ezLogger.error(
                            `Failed to load the user context. Error: ${EzJson.toJson(eResponse)}`);

                        EzUserContext.ezInstance.ezSetUserContext(null, ezClockerContext);

                        return finished(eResponse);
                    }));
    }

    /**
     * @protected @method
     * Starts the user context updator interval ticker
     */
    ezStartUserContextUpdatorIntervalTicker() {
        EzUserContext.ezInstance.ezUserContextUpdatorIntervalTicker = ezApi.ezclocker.ezTickerTimer.ezStartIntervalTicker(
            EzUserContext.ezInstance.ezHandleUserContextUpdatorIntervalTickerTigger,
            15 * 60 * 1000, // Every 15 minutes
            // 30000, // Every 30 seconds
            `${EzUserContext.ezApiName}_UserContextUpdater_IntervalTicker`);
    }

    /**
     * @protected @method
     * Stops the user context updator interval ticker
     */
    ezStopUserContextUpdatorIntervalTicker() {
        if (EzString.hasLength(EzUserContext.ezInstance?.ezUserContextUpdatorIntervalTicker?.ezIntervalTickerId)) {
            ezApi.ezclocker.ezTickerTimer.ezStopIntervalTicker(
                EzUserContext.ezInstance.ezUserContextUpdatorIntervalTicker.ezIntervalTickerId);
        }
    }

    /**
     * @protected @method
     * Handles the user context updator interval ticker trigger
     */
    ezHandleUserContextUpdatorIntervalTickerTigger() {
        ezApi.ezclocker.ezLogger.info('Handling user context updator interval tricker trigger.')

        EzUserContext.ezInstance.ezStopUserContextUpdatorIntervalTicker();

        return EzUserContext.ezInstance.ezRefreshUserContext(ezApi.ezclocker.ezClockerContext)
            .then(EzUserContext.ezInstance.ezStartUserContextUpdatorIntervalTicker);
    }

    /**
     * @public @method
     * Refreshes the user context if it is already loaded and ready.
     * @returns {Promise.resolve}
     */
    ezRefreshUserContext(ezClockerContext) {
        if (!EzObject.isValid(ezClockerContext)) {
            ezClockerContext = ezApi.ezclocker.ezClockerContext;

            if (!EzObject.isValid(ezClockerContext)) {
                // No context to work with
                return EzPromise.resolve(EzUserContext.ezInstance);
            }
        }

        if (!EzUserContext.ezInstance.ready || !ezClockerContext['ezUserContextReady'] ||
            !ezApi.ezclocker.ezUrlHelper.ezIsLocationUrlEzClockerSecure()) {
            return EzPromise.resolve(EzUserContext.ezInstance);
        }

        return EzPromise.asyncAction(
            // _api/v1/users/context
            (resolve) => ezApi.ezclocker.ezHttpHelper.ezGet(
                ezApi.ezclocker.ezNavigation.ezGetInternalApiUrl(
                    `users/full-context?time-zone-id=${ezApi.ezclocker.ezDateTime.activeTimeZone}`,
                    'v1'))
                .then(
                    ezApi.ezclocker.ezHttpHelper.ezProcessApiResolve,
                    ezApi.ezclocker.ezHttpHelper.ezProcessApiReject)
                .then(
                    (response) => {
                        let userContext = response.entity;

                        if (!EzObject.isValid(userContext)) {
                            ezApi.ezclocker.ezLogger.error(
                                EzString.em`
                                    Full context response did not contain a userContext instance.
                                    Response: ${EzJson.toJson(userContext)}`);

                            return resolve(EzUserContext.ezInstance);
                        }

                        EzUserContext.ezInstance.ezSetUserContext(userContext, ezClockerContext);

                        // Load the other contexes from what was provided via the user context.
                        if (userContext.isEmployer) {
                            // Employer Accounts
                            ezClockerContext.ezLoadEmployerContextFromUserContext(userContext);
                        } else if (userContext.isPayrollManager) {
                            // Manager Accounts
                            ezClockerContext.ezLoadPayrollManagerContextFromUserContext(userContext);
                        } else if (userContext.isManager) {
                            // Manager Accounts
                            ezClockerContext.ezLoadManagerContextFromUserContext(userContext);
                        } else if (userContext.isEmployee) {
                            // Employee Accounts
                            ezClockerContext.ezLoadEmployeeContextFromUserContext(userContext);
                        } else if (userContext.isPersonal) {
                            // Personal Accounts
                            ezClockerContext.ezLoadPersonalContextFromUserContext(userContext);
                        }

                        let activeAccount = ezClockerContext.ezGetActiveAccount();

                        if (!activeAccount?.ready) {
                            ezApi.ezclocker.ezLogger.warn(
                                EzString.em`
                                    The EzClockerContext did not initialize with an active account.
                                    Assuming the current user is not logged in.`);
                        }

                        EzUserContext.ezInstance.ezTriggerUserContextUpdated();

                        return resolve(EzUserContext.ezInstance);
                    },
                    (eResponse) => {
                        ezApi.ezclocker.ezLogger.error(
                            `Failed to load the user context. Error: ${EzJson.toJson(eResponse)}`);

                        return resolve(EzUserContext.ezInstance);
                    }));
    }

    /**
     * @public @method
     * Triggers the EzClockerContextEventName.onActiveAccountUpdated event
     */
    ezTriggerUserContextUpdated() {
        ezApi.ezclocker.ezEventEngine.ezTriggerEvent(
            EzClockerContextEventName.onUserContextUpdated,
            'EzuserContext is updated.',
            {
                ezUserContext: EzClockerContext.ezInstance.ezUserContext
            });
    }

    /**
     * @public @method
     * Sets the user context data from the provided userContext instance
     * @param {object} userContext
     */
    ezSetUserContext(newUserContext, ezClockerContext) {
        // Default context
        EzUserContext.ezInstance.ezSetDefaultUserContext();

        if (!EzObject.isValid(newUserContext)) {
            return;
        }

        if (!EzObject.isValid(ezClockerContext)) {
            throw new EzBadParamException(
                'ezClockerContext',
                EzUserContext.ezInstance,
                EzUserContext.ezInstance.ezSetUserContext);
        }

        // User Account Information
        EzUserContext.ezInstance.userAccount = newUserContext.userAccount;
        EzUserContext.ezInstance.userAccountRoles = newUserContext.userAccountRoles;
        EzUserContext.ezInstance.isAdmin = newUserContext.isAdmin;
        EzUserContext.ezInstance.isSupport = newUserContext.isSupport;
        EzUserContext.ezInstance.isDeveloper = newUserContext.isDeveloper;
        EzUserContext.ezInstance.isEmployer = newUserContext.isEmployer;
        EzUserContext.ezInstance.isPayrollManager = newUserContext.isPayrollManager;
        EzUserContext.ezInstance.isManager = newUserContext.isManager;
        EzUserContext.ezInstance.isEmployee = newUserContext.isEmployee;
        EzUserContext.ezInstance.isPersonal = newUserContext.isPersonal;
        EzUserContext.ezInstance.ready = true;

        ezClockerContext['userContext'] = EzUserContext.ezInstance;

        ezClockerContext.ezTriggerEzClockerContextEvent(
            EzUserContext.ezEventNames.onUserContextReady,
            'User context is ready.',
            EzUserContext.ezInstance);
    }

    /*
    =========================================================================================================================
    Start of EzClocker Class Initialization and EzApi Registration Section
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    !! FROM THIS POINT FORWARD: ONLY PLACE INITIALIZATION CODE !!
    || All other class code MUST go above this section. ||
    =========================================================================================================================
    */

    /**
     * @static
     * @public @readonly @property
     * Returns the name of this class's singleton instance when registered with ezApi.
     * @returns {string}
     */
    static get ezApiName() {
        return 'ezUserContext';
    }

    /**
     * @static
     * @public @readonly @property
     * Returns an object of event names that this class may trigger.
     * @returns {object}
     */
    static get ezEventNames() {
        return {
            onReady: 'ezOn_EzUserContext_Ready',
            onUserContextModuleReady: EzClockerContextEventName.onUserContextModuleReady,
            onUserContextReady: EzClockerContextEventName.onUserContextReady
        };
    }

    /**
     * @static
     * @private @field
     * Stores the singleton instance of this class that was created by and registerd with EzApi.
     * @type {EzUserContext}
     */
    static #ezInstance = globalThis?.ezApi?.ready && globalThis.ezApi?.ezclocker?.[EzUserContext.ezApiName]
        ? globalThis.ezApi.ezclocker[EzUserContext.ezApiName]
        : null;
    /**
     * @static
     * @public @property @getter
     * Returns the singleton instance of this class that is registered with EzApi (if available yet)
     * @returns {EzUserContext}
     */
    static get ezInstance() {
        return EzUserContext.#ezInstance;
    }
    /**
     * @static
     * @public @property @setter
     * Sets the singleton instance of of this class that is registered with EzApi.
     * @param {EzUserContext} instance
     */
    static set ezInstance(instance) {
        if (null != EzUserContext.#ezInstance) {
            throw new Error('EzUserContext\'s singleton instance is already reigstered with EzApi.');
        }

        EzUserContext.#ezInstance = instance;
    }

    static #ezApiRegistrationState = globalThis?.ezApi?.ready && globalThis.ezApi?.ezclocker?.[EzUserContext.ezApiName]
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
        return EzUserContext.#ezApiRegistrationState;
    }
    /**
     * @static
     * @public @property @setter
     * Sets the ezApi registration state of this classes's singleton instance.
     * @param {string} ezApiRegistrationState
     * A valid enum property value from EzRegistrationState
     */
    static set ezApiRegistrationState(ezApiRegistrationState) {
        EzUserContext.#ezApiRegistrationState = EzRegistrationState.ezValueOf(ezApiRegistrationState);
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
        return EzBoolean.requireAll(
            EzRegistrationState.PENDING === EzUserContext.ezApiRegistrationState,
            globalThis?.ezApi?.ready,
            globalThis?.ezApi?.ezclocker?.[EzEventEngine.ezApiName]?.ready,
            globalThis?.ezApi?.ezclocker?.[EzHttpHelper.ezApiName]?.ready,
            globalThis?.ezApi?.ezclocker?.[EzUrlHelper.ezApiName]?.ready,
            globalThis?.ezApi?.ezclocker?.[EzNavigation.ezApiName]?.ready,
            globalThis?.ezApi?.ezclocker?.[EzTickerTimer.ezApiName]?.ready);
    }

    /**
     * @static
     * @private @readonly @property
     * Returns if this class's singleton instance is registered with ezApi yet.
     * @returns {boolean}
     */
    static get #ezIsRegistered() {
        return EzUserContext.ezInstance && EzRegistrationState.REGISTERED === EzUserContext.ezApiRegistrationState;
    }

    /**
     * @static
     * @private @method
     * Attempts to register the singleton instance for this class with ezApi. Returns true if successful, false otherwise.
     * @returns {boolean}
     */
    static #ezRegistrator() {
        if (EzUserContext.#ezCanRegister && !EzUserContext.#ezIsRegistered) {
            globalThis.ezApi.ezRegisterNewApi(EzUserContext, EzUserContext.ezApiName);

            EzUserContext.ezApiRegistrationState = EzRegistrationState.REGISTERED;
        }

        return EzUserContext.#ezIsRegistered;
    }

    /**
     * @static
     * Static Initialization
     * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
     * >> IMPORTANT <<
     * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
     * Make sure the following properties and methods get defined BEFORE this static initialization section:
     *     1) Property getter EzUserContext.ezApiName
     *     2) Property getter EzUserContext.ezEventNames
     *     3) Property getter EzUserContext.ezInstance
     *     4) Property setter EzUserContext.ezInstance
     *     5) Property getter EzUserContext.ezApiRegistrationState
     *     6) Property setter EzUserContext.ezApiRegistrationState
     *     7) Property getter EzUserContext.#ezCanRegister
     *     8) Property getter EzUserContext.#ezIsRegistered
     *     9) Method EzUserContext.#ezRegistrator()
     */
    static {
        if (!EzUserContext.#ezIsRegistered) {
            EzUserContext.ezApiRegistrationState = EzRegistrationState.PENDING;

            if (!EzUserContext.#ezRegistrator()) {
                document.addEventListener(
                    EzUserContext.ezOnEzApiReadyEventName,
                    EzUserContext.#ezRegistrator);

                document.addEventListener(
                    EzEventEngine.ezEventNames.onReady,
                    EzUserContext.#ezRegistrator);

                document.addEventListener(
                    EzHttpHelper.ezEventNames.onReady,
                    EzUserContext.#ezRegistrator);

                document.addEventListener(
                    EzUrlHelper.ezEventNames.onReady,
                    EzUserContext.#ezRegistrator);

                document.addEventListener(
                    EzNavigation.ezEventNames.onReady,
                    EzUserContext.#ezRegistrator);

                document.addEventListener(
                    EzTickerTimer.ezEventNames.onReady,
                    EzUserContext.#ezRegistrator);
            }
        }
    }

    /*
    =========================================================================================================================
    End of EzClocker Class Initialization and EzApi Registration Section
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    !! DO NOT PLACE ANY NON-INITIALIZTION CODE BETWEEN THE START AND END OF THIS INITILIZATION SECTON !!
    !! DO NOT PLACE ANY CODE OF ANY KIND BELOW THIS POINT !!
    =========================================================================================================================
    */
}
