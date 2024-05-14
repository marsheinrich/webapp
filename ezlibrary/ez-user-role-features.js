import {
    EzObject,
    EzBoolean,
    EzString
} from '/ezlibrary/helpers/EzHelpers.js';

import { EzRegistrationState } from '/ezlibrary/enums/EzRegistrationState.js';

import { EzClass } from '/ezlibrary/EzClass.js';

import {
    EzEnvironment,
    EzUserRoleFeature
} from '/ezlibrary/enums/EzEnumerations.js';

import { EzEventEngine } from '/ezlibrary/ez-event-engine.js';

import { EzNavigation } from '/public/javascript/common/ezclocker-navigation-helper.js';

import { EzFeatureToggles } from '/ezlibrary/ez-feature-toggles2.js';

/**
    @class
    @summary
    Creates a new instance of EzUserRoleFeatures
    ---------------------------------------------------------------------------
    Import with:
        import { EzUserRoleFeatures } from '/ezlibrary/ez-user-role-features.js';
    ---------------------------------------------------------------------------
    Is ready check:
        globalThis.ezApi.ezclocker[EzUserRoleFeatures.ezApiName] &&
        globalThis.ezApi.ezclocker[EzUserRoleFeatures.ezApiName].ready &&
    ---------------------------------------------------------------------------
    Listen for ready event:
        document.addEventListener(
            EzUserRoleFeatures.ezEventNames.onReady,
            this.#ezRegistrator);
    ---------------------------------------------------------------------------
 */
export class EzUserRoleFeatures extends EzClass {
    /**
        @static
        @public @readonly @property
        Returns the name of this class's singleton instance when registered with ezApi.
        @returns {string}
     */
    static get ezApiName() {
        return 'ezUserRoleFeatures';
    }

    /**
        @static
        @public @readonly @property
        Returns an object of event names that this class may trigger.
        @returns {object}
     */
    static get ezEventNames() {
        return {
            onReady: 'ezOn_EzUserRoleFeatures_Ready',
            onEzUserRoleFeaturesReady: 'EzUserRoleFeatures_Ready',
            onEzUserRoleFeaturesApplied: 'EzUserRoleFeatures_Applied'
        };
    }

    /**
        @static
        @private @field
        Stores the singleton instance of this class that was created by and registerd with EzApi.
        @type {EzUserRoleFeatures}
     */
    static #ezInstance = EzObject.hasProperty(globalThis, 'ezApi') &&
        EzObject.isValid(globalThis.ezApi) && EzBoolean.isTrue(globalThis.ezApi.ready) &&
        EzObject.isValid(globalThis.ezApi.ezclocker[EzUserRoleFeatures.ezApiName])
        ? globalThis.ezApi.ezclocker[EzUserRoleFeatures.ezApiName]
        : null;

    /**
        @static
        @public @property @getter
        Returns the singleton instance of this class that is registered with EzApi (if available yet)
        @returns {EzUserRoleFeatures}
     */
    static get ezInstance() {
        return EzUserRoleFeatures.#ezInstance;
    }

    /**
        @static
        @public @property @getter
        Sets the singleton instance of of this class that is registered with EzApi.
        @param {EzUserRoleFeatures} ezUserRoleFeatures
     */
    static set ezInstance(ezUserRoleFeatures) {
        if (null != EzUserRoleFeatures.#ezInstance) {
            throw new Error('EzUserRoleFeatures\'s singleton instance is already reigstered with EzApi.');
        }

        EzUserRoleFeatures.#ezInstance = ezUserRoleFeatures;
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
        EzObject.isValid(globalThis.ezApi.ezclocker[EzUserRoleFeatures.ezApiName])
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
        return EzUserRoleFeatures.#ezApiRegistrationState;
    }

    /**
        @static
        @public @property @setter
        Sets the ezApi registration state of this classes's singleton instance.
        @param {string}ezApiRegistrationState
        A valid enum property value from EzRegistrationState
     */
    static set ezApiRegistrationState(ezApiRegistrationState) {
        EzUserRoleFeatures.#ezApiRegistrationState = EzRegistrationState.ezValueOf(ezApiRegistrationState);
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
        return EzRegistrationState.PENDING === EzUserRoleFeatures.ezApiRegistrationState &&
            EzObject.isValid(globalThis.ezApi) && EzBoolean.isTrue(globalThis.ezApi.ready) &&

            globalThis.ezApi.ezclocker[EzEventEngine.ezApiName] &&
            globalThis.ezApi.ezclocker[EzEventEngine.ezApiName].ready &&

            globalThis.ezApi.ezclocker[EzNavigation.ezApiName] &&
            globalThis.ezApi.ezclocker[EzNavigation.ezApiName].ready &&

            globalThis.ezApi.ezclocker[EzFeatureToggles.ezApiName] &&
            globalThis.ezApi.ezclocker[EzFeatureToggles.ezApiName].ready;
    }

    /**
        @static
        @private @readonly @property
        Returns if this class's singleton instance is registered with ezApi yet.
        @returns {boolean}
     */
    static get #ezIsRegistered() {
        return null != EzUserRoleFeatures.ezInstance &&
            EzRegistrationState.REGISTERED === EzUserRoleFeatures.ezApiRegistrationState;
    }

    /**
        @static
        @private @method
        Attempts to register the singleton instance for this class with ezApi. Returns true
        if successful, false otherwise.
        @returns {boolean}
     */
    static #ezRegistrator() {
        if (EzUserRoleFeatures.#ezCanRegister && !EzUserRoleFeatures.#ezIsRegistered) {
            globalThis.ezApi.ezRegisterNewApi(EzUserRoleFeatures, EzUserRoleFeatures.ezApiName);
        }

        return EzUserRoleFeatures.#ezIsRegistered;
    }

    /**
        @static
        Static Initialization
        ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        >> IMPORTANT <<
        ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        Make sure the following properties and methods get defined BEFORE this static initialization section:
            1) Property getter EzUserRoleFeatures.ezApiName
            2) Property getter EzUserRoleFeatures.ezEventNames
            3) Property getter EzUserRoleFeatures.ezInstance
            4) Property setter EzUserRoleFeatures.ezInstance
            5) Property getter EzUserRoleFeatures.ezApiRegistrationState
            6) Property setter EzUserRoleFeatures.ezApiRegistrationState
            7) Property getter EzUserRoleFeatures.#ezCanRegister
            8) Property getter EzUserRoleFeatures.#ezIsRegistered
            9) Method EzUserRoleFeatures.#ezRegistrator()
     */
    static {
        if (!EzUserRoleFeatures.#ezIsRegistered) {
            EzUserRoleFeatures.ezApiRegistrationState = EzRegistrationState.PENDING;

            document.addEventListener(
                EzEventEngine.ezEventNames.onReady,
                EzUserRoleFeatures.#ezRegistrator);

            document.addEventListener(
                EzNavigation.ezEventNames.onReady,
                EzUserRoleFeatures.#ezRegistrator)

            document.addEventListener(
                EzFeatureToggles.ezEventNames.onReady,
                EzUserRoleFeatures.#ezRegistrator);
        }
    }

    get DEFAULT_ROLE_FEATURES() {
        return {
            'UNKNOWN': {
                views: {
                    admin: {},
                    employerDashboard: {},
                    employeeDashboard: {},
                    employerSchedules: {},
                    employeeSchedules: {},
                    archive: {},
                    account: {
                        'EZROLE_FEATURE_ACCOUNT_SUBSCRIPTION_EDITING': {
                            enabled: false
                        },
                        'EZROLE_FEATURE_ACCOUNT_CHANGE_EMPLOYER_PASSWORD': {
                            enabled: false
                        },
                        'EZROLE_FEATURE_ACCOUNT_DELETE_ACCOUNT': {
                            enabled: false
                        },
                        'EZROLE_FEATURE_ACCOUNT_CHANGE_EMPLOYER_EMAIL': {
                            enabled: false
                        }
                    }
                }
            },
            'NONE': {
                views: {
                    admin: {},
                    employerDashboard: {},
                    employeeDashboard: {},
                    employerSchedules: {},
                    employeeSchedules: {},
                    archive: {},
                    account: {
                        'EZROLE_FEATURE_ACCOUNT_SUBSCRIPTION_EDITING': {
                            enabled: true
                        },
                        'EZROLE_FEATURE_ACCOUNT_CHANGE_EMPLOYER_PASSWORD': {
                            enabled: false
                        },
                        'EZROLE_FEATURE_ACCOUNT_DELETE_ACCOUNT': {
                            enabled: false
                        },
                        'EZROLE_FEATURE_ACCOUNT_CHANGE_EMPLOYER_EMAIL': {
                            enabled: false
                        }
                    }
                }
            },
            'ROLE_EZCLOCKER_SUPPORT': {
                views: {
                    admin: {},
                    employerDashboard: {},
                    employeeDashboard: {},
                    employerSchedules: {},
                    employeeSchedules: {},
                    archive: {},
                    account: {
                        'EZROLE_FEATURE_ACCOUNT_SUBSCRIPTION_EDITING': {
                            enabled: true
                        },
                        'EZROLE_FEATURE_ACCOUNT_CHANGE_EMPLOYER_PASSWORD': {
                            enabled: false
                        },
                        'EZROLE_FEATURE_ACCOUNT_DELETE_ACCOUNT': {
                            enabled: false
                        },
                        'EZROLE_FEATURE_ACCOUNT_CHANGE_EMPLOYER_EMAIL': {
                            enabled: false
                        }
                    }
                }
            },
            'ROLE_DEVELOPER': {
                views: {
                    admin: {},
                    employerDashboard: {},
                    employeeDashboard: {},
                    employerSchedules: {},
                    employeeSchedules: {},
                    archive: {},
                    account: {
                        'EZROLE_FEATURE_ACCOUNT_SUBSCRIPTION_EDITING': {
                            enabled: false
                        },
                        'EZROLE_FEATURE_ACCOUNT_CHANGE_EMPLOYER_PASSWORD': {
                            enabled: false
                        },
                        'EZROLE_FEATURE_ACCOUNT_DELETE_ACCOUNT': {
                            enabled: false
                        },
                        'EZROLE_FEATURE_ACCOUNT_CHANGE_EMPLOYER_EMAIL': {
                            enabled: false
                        }
                    }
                }
            },
            'ROLE_ADMIN': {
                views: {
                    admin: {},
                    employerDashboard: {},
                    employeeDashboard: {},
                    employerSchedules: {},
                    employeeSchedules: {},
                    archive: {},
                    account: {
                        'EZROLE_FEATURE_ACCOUNT_SUBSCRIPTION_EDITING': {
                            enabled: true
                        },
                        'EZROLE_FEATURE_ACCOUNT_CHANGE_EMPLOYER_PASSWORD': {
                            enabled: true
                        },
                        'EZROLE_FEATURE_ACCOUNT_DELETE_ACCOUNT': {
                            enabled: true
                        },
                        'EZROLE_FEATURE_ACCOUNT_CHANGE_EMPLOYER_EMAIL': {
                            enabled: false
                        }
                    }
                }
            },
            'ROLE_EMPLOYER': {
                views: {
                    admin: {},
                    employerDashboard: {},
                    employeeDashboard: {},
                    employerSchedules: {},
                    employeeSchedules: {},
                    archive: {},
                    account: {
                        'EZROLE_FEATURE_ACCOUNT_SUBSCRIPTION_EDITING': {
                            enabled: true
                        },
                        'EZROLE_FEATURE_ACCOUNT_CHANGE_EMPLOYER_PASSWORD': {
                            enabled: true
                        },
                        'EZROLE_FEATURE_ACCOUNT_DELETE_ACCOUNT': {
                            enabled: true
                        },
                        'EZROLE_FEATURE_ACCOUNT_CHANGE_EMPLOYER_EMAIL': {
                            enabled: false
                        }
                    }
                }
            },
            'ROLE_MANAGER': {
                views: {
                    admin: {},
                    employerDashboard: {},
                    employeeDashboard: {},
                    employerSchedules: {},
                    employeeSchedules: {},
                    archive: {},
                    account: {
                        'EZROLE_FEATURE_ACCOUNT_SUBSCRIPTION_EDITING': {
                            enabled: false
                        },
                        'EZROLE_FEATURE_ACCOUNT_CHANGE_EMPLOYER_PASSWORD': {
                            enabled: false
                        },
                        'EZROLE_FEATURE_ACCOUNT_DELETE_ACCOUNT': {
                            enabled: false
                        },
                        'EZROLE_FEATURE_ACCOUNT_CHANGE_EMPLOYER_EMAIL': {
                            enabled: false
                        }
                    }
                }
            },
            'ROLE_EMPLOYEE': {
                views: {
                    admin: {},
                    employerDashboard: {},
                    employeeDashboard: {},
                    employerSchedules: {},
                    employeeSchedules: {},
                    archive: {},
                    account: {
                        'EZROLE_FEATURE_ACCOUNT_SUBSCRIPTION_EDITING': {
                            enabled: false
                        },
                        'EZROLE_FEATURE_ACCOUNT_CHANGE_EMPLOYER_PASSWORD': {
                            enabled: false
                        },
                        'EZROLE_FEATURE_ACCOUNT_DELETE_ACCOUNT': {
                            enabled: false
                        },
                        'EZROLE_FEATURE_ACCOUNT_CHANGE_EMPLOYER_EMAIL': {
                            enabled: false
                        }
                    }
                }
            },
            'ROLE_PERSONAL': {
                views: {
                    admin: {},
                    employerDashboard: {},
                    employeeDashboard: {},
                    employerSchedules: {},
                    employeeSchedules: {},
                    archive: {},
                    account: {
                        'EZROLE_FEATURE_ACCOUNT_SUBSCRIPTION_EDITING': {
                            enabled: false
                        },
                        'EZROLE_FEATURE_ACCOUNT_CHANGE_EMPLOYER_PASSWORD': {
                            enabled: false
                        },
                        'EZROLE_FEATURE_ACCOUNT_DELETE_ACCOUNT': {
                            enabled: false
                        },
                        'EZROLE_FEATURE_ACCOUNT_CHANGE_EMPLOYER_EMAIL': {
                            enabled: false
                        }
                    }
                }
            }
        };
    }

    /**
        @public @constructor
        >> AVOID CREATING NEW INSTANCES OUTSIDE OF THE STATIC INITIALIZATION FLOW <<
        Use the static singleton instance available from ezApi: ezApi.ezclocker.ezUserRoleFeatures.
     */
    constructor() {
        super();
    }

    ezEnvironment = EzEnvironment.PRD;

    ezUserRoleFeatures = EzUserRoleFeature.DEFAULT_ROLE_FEATURES;

    ezContextReady = false;

    ezFeatureTogglesDone = false;

    ezUserRoleFeaturesLoaded = false;

    events = {
        ezOnUserRoleFeaturesReadyEventName: 'ezUserRoleFeatures.onReady.onEzUserRoleFeaturesReady',
        ezOnUserRoleFeaturesDoneEventName: 'ezUserRoleFeatures.onReady.onEzUserRoleFeaturesDone'
    };

    ezEventNames = EzUserRoleFeatures.ezEventNames;

    /**
        @protected @method
        Initializes EzUserRoleFeatures
        @returns {EzUserRoleFeatures}
     */
    ezInit() {
        ezApi.ezclocker.ezEventEngine.ezRegisterEvent(
            EzUserRoleFeatures.ezApiName,
            EzUserRoleFeatures.ezInstance.ezEventNames.onEzUserRoleFeaturesReady);

        ezApi.ezclocker.ezEventEngine.ezRegisterEvent(
            EzUserRoleFeatures.ezApiName,
            EzUserRoleFeatures.ezInstance.ezEventNames.onEzUserRoleFeaturesApplied);

        // Legacy events
        EzUserRoleFeatures.ezInstance.events.ezOnUserRoleFeaturesReadyEventName = ezApi.ezRegisterGlobalEvent(
            'ezUserRoleFeatures',
            'onReady',
            'onEzUserRoleFeaturesReady');

        EzUserRoleFeatures.ezInstance.events.ezOnUserRoleFeaturesDoneEventName = ezApi.ezRegisterGlobalEvent(
            'ezUserRoleFeatures',
            'onReady',
            'onEzUserRoleFeaturesDone');

        ezApi.ezclocker.ezEventEngine.ezWantEvent(
            EzFeatureToggles.ezEventNames.onFeatureTogglesApplied,
            EzUserRoleFeatures.ezApiName,
            () => {
                EzUserRoleFeatures.ezInstance.ezFeatureTogglesDone = true;
                EzFeatureToggles.ezInstance.ezGetEnvironment()
                    .then(
                        () => {
                            EzUserRoleFeatures.ezInstance.ezLoadUserRoleFeatures();
                            EzUserRoleFeatures.ezInstance.ezTriggerUserRoleFeaturesReady();
                        });
            });

        ezApi.ezclocker.ezEventEngine.ezWantEvent(
            'EzClockerContext_UserContext_Ready',
            //EzClockerContextEventName.onUserContextReady,
            EzUserRoleFeatures.ezApiName,
            () => {
                EzUserRoleFeatures.ezInstance.ezContextReady = true;
                EzFeatureToggles.ezInstance.ezGetEnvironment()
                    .then(
                        () => {
                            EzUserRoleFeatures.ezInstance.ezLoadUserRoleFeatures();
                            EzUserRoleFeatures.ezInstance.ezTriggerUserRoleFeaturesReady();
                        });
            });

        return EzUserRoleFeatures.ezInstance;
    }

    /**
        @protected @method
        Triggers the onUserRoleFeaturesReady event if all aother required events have been caught and processed.
     */
    ezTriggerUserRoleFeaturesReady() {
        if (EzBoolean.isTrue(EzUserRoleFeatures.ezInstance.ezFeatureTogglesDone) &&
            EzBoolean.isTrue(EzUserRoleFeatures.ezInstance.ezContextReady) &&
            EzBoolean.isTrue(EzUserRoleFeatures.ezInstance.ezUserRoleFeaturesLoaded)) {

            ezApi.ezclocker.ezEventEngine.ezTriggerEvent(
                EzUserRoleFeatures.ezInstance.ezEventNames.onEzUserRoleFeaturesReady,
                ezApi.ezclocker.ezEventEngine.ezBuildEventData(
                    EzUserRoleFeatures.ezApiName,
                    'EzUserRoleFeatures is ready',
                    EzUserRoleFeatures.ezInstance));
        }
    }

    /**
        @protected @method
        Triggers the ezOnUserRoleFeaturesDone event
     */
    ezTriggerUserRoleFeaturesDone() {
        ezApi.ezclocker.ezEventEngine.ezTriggerEvent(
            EzUserRoleFeatures.ezInstance.ezEventNames.onEzUserRoleFeaturesApplied,
            ezApi.ezclocker.ezEventEngine.ezBuildEventData(
                EzUserRoleFeatures.ezApiName,
                'EzUserRoleFeatures have applied',
                EzUserRoleFeatures.ezInstance));
    }

    /**
        @protected @method
        Loads the user feature roles from the dynamic content
     */
    ezLoadUserRoleFeatures() {
        if (EzBoolean.isTrue(EzUserRoleFeatures.ezInstance.ezUserRoleFeaturesLoaded)) {
            // Already loaded
            return;
        }

        let ezUserRoleFeaturesFilename = 'user-role-features';

        let url = window.location.href;
        if (-1 != url.indexOf('://localhost:')) {
            EzUserRoleFeatures.ezInstance.ezEnvironment = EzEnvironment.LOC;
        }

        switch (EzUserRoleFeatures.ezInstance.ezEnvironment) {
            case EzEnvironment.LOC:
                ezUserRoleFeaturesFilename += '-loc.json';
                break;
            case EzEnvironment.DEV:
                ezUserRoleFeaturesFilename += '-dev.json';
                break;
            case EzEnvironment.QAL:
                ezUserRoleFeaturesFilename += '-qal.json';
                break;
            case EzEnvironment.E2E:
                ezUserRoleFeaturesFilename += '-e2e.json';
                break;
            case EzEnvironment.PRD:
            default:
                ezUserRoleFeaturesFilename += '.json';
                break;
        }

        ezApi.ezclocker.ezHttpHelper.ezGet(EzUserRoleFeatures.ezInstance.ezGetDynamicPageUrl(ezUserRoleFeaturesFilename)).then(
            function(response) {
                EzUserRoleFeatures.ezInstance.ezUserRoleFeatures = ezApi.ezFromJson(response);
                EzUserRoleFeatures.ezInstance.ezUserRoleFeaturesLoaded = true;
            },
            function(eResponse) {
                EzUserRoleFeatures.ezInstance.ezUserRoleFeatures = EzUserRoleFeatures.DEFAULT_ROLE_FEATURES;
                ezApi.ezclocker.logger.warn(
                    ezApi.ezEM`
                        Unable to load the feature toggle settings file ${ezUserRoleFeaturesFilename}.
                        Using the default settings instead.
                        Response: ${ezApi.ezToJson(eResponse)}`);
                EzUserRoleFeatures.ezInstance.ezUserRoleFeaturesLoaded = true;
            });
    }

    /**
        @protected @method
        Obtains the enviornment by evaluating the current url
     */
    ezGetEnvironmentFromUrl() {
        let url = window.location.href;

        if (-1 !== url.indexOf('localhost') ||
            -1 !== url.indexOf('127.0.0.1') ||
            -1 !== url.indexOf('loc.ezclocker.com')) {
            return EzEnvironment.LOC;
        }


        if (-1 !== url.indexOf('dev.ezclocker.com') ||
            -1 !== url.indexOf('dev1.ezclocker.com') ||
            -1 !== url.indexOf('dev2.ezclocker.com')) {
            return EzEnvironment.DEV;
        }

        if (-1 !== url.indexOf('qal.ezclocker.com')) {
            return EzEnvironment.QAL;
        }

        if (-1 !== url.indexOf('e2e.ezclocker.com')) {
            return EzEnvironment.E2E;
        }

        if (-1 !== url.indexOf('prf.ezclocker.com')) {
            return EzEnvironment.PRF;
        }

        return EzEnvironment.PRD;
    }

    /**
     * Obtains the current environment
     *
     * @returns {Promise.resolve}
     */
    ezGetEnvironment() {
        return ezApi.ezResolver(
            (resolve) => ezApi.ezclocker.ezHttpHelper.ezGet(
                ezApi.ezclocker.ezNavigation.ezGetPublicApiServiceUrl('version', 'v1'))
                .then(
                    (response) => {
                        if (EzString.stringHasLength(response.environment)) {
                            EzUserRoleFeatures.ezInstance.ezEnvironment = response.environment;
                        } else if (EzString.stringHasLength(response.targetEnvironment)) {
                            EzUserRoleFeatures.ezInstance.ezEnvironment = response.targetEnvironment;
                        } else {
                            EzUserRoleFeatures.ezInstance.ezEnvironment = EzUserRoleFeatures.ezInstance.ezGetEnvironmentFromUrl();
                        }

                        if (!EzString.stringHasLength(EzFeatureToggles.ezInstance.ezEnvironment)) {
                            EzUserRoleFeatures.ezInstance.ezEnvironment = EzEnvironment.PRD;
                        }

                        let urlEnv = EzUserRoleFeatures.ezInstance.ezGetEnvironmentFromUrl();

                        if (urlEnv !== EzUserRoleFeatures.ezInstance.environment && EzEnvironment.QAL === urlEnv || EzEnvironment.LOC === urlEnv) {
                            EzUserRoleFeatures.ezInstance.ezEnvironment = ezApi.ezclocker.ezUrlHelper.ezGetEnvironmentFromUrl();
                        }

                        return resolve(EzUserRoleFeatures.ezInstance.ezEnvironment);
                    },
                    (eResponse) => {
                        if (EzBoolean.isTrue(EzUserRoleFeatures.ezInstance.ezDebugMode)) {
                            ezApi.ezclocker.ezLogger.error(
                                `EzUserRoleFeatures: Unable to determine the current deployment environment. Error: ${ezApi.ezToJson(eResponse)}`);
                        } else {
                            ezApi.ezclocker.ezLogger.warn(
                                'EzUserRoleFeatures: Environment information was not available. Defaulting to enviornment PRD');
                        }

                        EzUserRoleFeatures.ezInstance.ezEnvironment = EzEnvironment.PRD;

                        return resolve(EzUserRoleFeatures.ezInstance.ezEnvironment);
                    }));
    }

    /**
        @public @method
        Returns the page url for the page pageName.
        @param {string}pageName
     */
    ezGetDynamicPageUrl(pageName) {
        return `/dynamic/${pageName}`
    }

    /**
        @public
        Determiens if a role feature is visible for the logged in user
        @param {string} viewName
        @param {string} featureId
     */
    ezApplyUserRoleFeaturesForCurrentUser(viewName) {
        if (!EzString.stringHasLength(viewName)) {
            return;
        }

        let userContext = ezApi.ezclocker.ezClockerContext.ezGetUserContext();

        userContext.userAccountRoles.forEach(
            (userRole) => {
                if (EzObject.isValid(userRole) && EzObject.isValid(EzUserRoleFeatures.ezInstance.ezUserRoleFeatures[userRole])) {
                    EzUserRoleFeatures.ezInstance.ezApplyUserRoleFeaturesRole(
                        EzUserRoleFeatures.ezInstance.ezUserRoleFeatures[userRole],
                        viewName);
                }
            });

        EzUserRoleFeatures.ezInstance.ezTriggerUserRoleFeaturesDone();
    }

    /**
        @public @method
        Applies a user role feature toggle using the provided roleFeatures and the viewName.
        @param {Object} roleFeatures
        @param {string} viewName
     */
    ezApplyUserRoleFeaturesRole(roleFeatures, viewName) {
        if (!EzObject.isValid(roleFeatures) || !EzObject.isValid(viewName)) {
            return;
        }

        if (!EzObject.isValid(roleFeatures.views[viewName])) {
            return;
        }

        let viewUserFeatures = roleFeatures.views[viewName];

        for (let userRoleFeatureId in viewUserFeatures) {
            if (Object.prototype.hasOwnProperty.call(viewUserFeatures, userRoleFeatureId)) {
                let userRoleFeatureIdFeatureElements =
                    document.querySelectorAll(`[data-user-role-feature-id="${userRoleFeatureId}"]`);

                userRoleFeatureIdFeatureElements.forEach(
                    (element) => {
                        if (EzObject.isValid(element.dataset) && EzObject.isValid(element.dataset['dataFeatureId'])) {

                            // Determine if the feature toggle is on or not
                            let featureId = element.dataset['dataFeatureId'];

                            if (ezApi.ezclocker.ezFeatureToggles.ezViewFeatureEnabled(viewName, featureId)) {
                                if (!EzBoolean.isTrue(viewUserFeatures[userRoleFeatureId].enabled)) {
                                    element.parentNode.removeChild(element);
                                }
                            }
                        } else {
                            if (!EzBoolean.isTrue(viewUserFeatures[userRoleFeatureId].enabled)) {
                                element.parentNode.removeChild(element);
                            }
                        }
                    });
            }
        }
    }

    /**
        @public @method
        Determines if a user role feature id is enabled for a user and view
        @param {string} viewName
        @param {string} featureId
        @returns {boolean}
     */
    ezUserRoleFeatureEnabledForUser(viewName, featureId) {
        let userContext = ezApi.ezclocker.ezClockerContext.ezGetUserContext();

        if (!EzObject.isValid(featureId) || !EzString.stringHasLength(featureId) ||
            !EzObject.isValid(viewName) || !EzString.stringHasLength(viewName)) {
            return false;
        }

        userContext.userAccountRoles.forEach(
            (userRole) => {
                if (EzObject.isValid(userRole) && EzObject.isValid(EzUserRoleFeatures.ezInstance.ezUserRoleFeatures[userRole])) {
                    if (!EzObject.hasProperty(EzUserRoleFeatures.ezInstance.ezUserRoleFeatures, userRole)) {
                        return false;
                    }

                    let roleFeatures = EzUserRoleFeatures.ezInstance.ezUserRoleFeatures[userRole];
                    if (!EzObject.hasProperty(roleFeatures.views, viewName)) {
                        return false;
                    }

                    let view = roleFeatures.views[viewName];
                    if (!EzObject.hasProperty(view, featureId)) {
                        return false;
                    }

                    return EzBoolean.isTrue(view[featureId].enabled);
                }
            });
    }
}
