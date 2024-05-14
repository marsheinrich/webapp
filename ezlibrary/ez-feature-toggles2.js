import {
    EzBadParamException
} from '/ezlibrary/exceptions/EzExceptions.js';

import {
    EzObject,
    EzBoolean,
    EzString,
    EzFunction,
    EzJson
} from '/ezlibrary/helpers/EzHelpers.js';

import {
    EzEnvironment,
    EzRegistrationState
} from '/ezlibrary/enums/EzEnumerations.js';

import { EzClass } from '/ezlibrary/EzClass.js';
import { EzEventEngine } from '/ezlibrary/ez-event-engine.js';

import { EzHttpHelper } from '/public/javascript/common/ezclocker-http-helper.js';
import { EzNavigation } from '/public/javascript/common/ezclocker-navigation-helper.js';

import { EzUrlHelper } from '/public/javascript/common/ezclocker-url-helper2.js';


/**
 * @class
 * @description
 * Provides data driven UX feature toggling
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 * Feature Id Format: esf{feature_name}
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 * Tag features in HTML with:
 *      <div
 *          data-feature-id="ezf{feature_name}"
 *          id="Ez{feature_name}FeatureContainer"
 *          class="ezFeatureContainer"
 *          style="display:none">
 *          {feature_html}
 *      </div>
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 * For JS feature toggles:
 *      // Using call backs
 *      ezApi.ezclocker.ezFeatureToggles.ezExecuteIfFeatureEnabled(
 *          {viewName},
 *          esf{feature_name},
 *          function() {
 *              // Feature enabled code here
 *          },
 *          function () {
 *              // optional feature disabled code here
 *          });
 *
 *      // Using if statements
 *      if (ezApi.ezclocker.ezFeatureToggles.ezViewFeatureEnabled({viewName}, esf{feature_name})) {
 *          // feature enabled code here
 *      }
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 * Import with:
 *     import { EzFeatureToggles } from '/ezlibrary/ez-feature-toggles2.js';
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 * Singleton instance ready for use when the below evaluates to true:
 *     globalThis.ezApi.ezclocker?.[EzFeatureToggles.ezApiName]?.ready
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 * Listen to onReady event:
 *     document.addEventListener(
 *         EzFeatureToggles.ezEventNames.onReady,
 *         this.ezRegistrator);
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 * Singleton Instance Access:
 *     From within this class: EzFeatureToggles.ezInstance
 *     From outside of this class: ezApi.ezclocker.ezFeatureToggles
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 */
export class EzFeatureToggles extends EzClass {
    /**
     * @static
     * @public @method @readonly @property
     * Returns the name of this class's singleton instance when registered with ezApi.
     * @returns {string}
     */
    static get ezApiName() {
        return 'ezFeatureToggles';
    }

    /**
     * @static
     * @public @method @readonly @property
     * Returns an object of event names that this class may trigger.
     * @returns {object}
     */
    static get ezEventNames() {
        return {
            onReady: 'ezOn_EzFeatureToggles_Ready',
            onFeatureTogglesReady: 'EzFeatureToggles_Ready',
            onFeatureTogglesApplied: 'EzFeatureToggles_Applied'
        };
    }

    /**
     * @static
     * @private @field
        Stores the singleton instance of this class that was created by and registerd with EzApi.
     * @type {EzFeatureToggles}
     */
    static #ezInstance = EzObject.hasProperty(globalThis, 'ezApi') &&
        EzObject.isValid(globalThis.ezApi) && EzBoolean.isTrue(globalThis.ezApi.ready) &&
        EzObject.isValid(globalThis.ezApi.ezclocker[EzFeatureToggles.ezApiName])
        ? globalThis.ezApi.ezclocker[EzFeatureToggles.ezApiName]
        : null;

    /**
     * @static
     * @public @method @property @getter
     * Returns the singleton instance of this class that is registered with EzApi (if available yet)
     * @returns {EzFeatureToggles}
     */
    static get ezInstance() {
        return EzFeatureToggles.#ezInstance;
    }

    /**
     * @static
     * @public @method @property @getter
        Sets the singleton instance of of this class that is registered with EzApi.
     * @param {EzFeatureToggles} ezFeatureToggles
     */
    static set ezInstance(ezFeatureToggles) {
        if (null != EzFeatureToggles.#ezInstance) {
            throw new Error('EzFeatureToggles\'s singleton instance is already reigstered with EzApi.');
        }

        EzFeatureToggles.#ezInstance = ezFeatureToggles;
    }

    /**
     * @static
     * @private @field
        Stores the EzApi registration state for this class.
        Default value is NULL
        Class is registerd with EzApi when value is EzRegistrationState.REGISTERED
     * @type {string}
        A valid enum property value from EzRegistrationState
     */
    static #ezApiRegistrationState = EzObject.hasProperty(globalThis, 'ezApi') &&
        EzObject.isValid(globalThis.ezApi) && EzBoolean.isTrue(globalThis.ezApi.ready) &&
        EzObject.isValid(globalThis.ezApi.ezclocker[EzFeatureToggles.ezApiName])
        ? EzRegistrationState.REGISTERED
        : null;

    /**
     * @static
     * @public @method @property @getter
     * Returns the ezApi registration state of this classes's singleton instance.
     * @returns {string}
        A valid enum property value from EzRegistrationState
     */
    static get ezApiRegistrationState() {
        return EzFeatureToggles.#ezApiRegistrationState;
    }

    /**
     * @static
     * @public @method @property @setter
        Sets the ezApi registration state of this classes's singleton instance.
     * @param {string}ezApiRegistrationState
        A valid enum property value from EzRegistrationState
     */
    static set ezApiRegistrationState(ezApiRegistrationState) {
        EzFeatureToggles.#ezApiRegistrationState = EzRegistrationState.ezValueOf(ezApiRegistrationState);
    }

    /**
     * @static
     * @private @readonly @property
     * Returns true when all required dependencies for this class report ready.
        In otherwords, the require dependency's singleton instance is created
        and is registered with and accessable from EzApi with ezApi.ezclocker.{dependency_name}.
     * @returns {boolean}
     */
    static get #ezCanRegister() {
        return EzRegistrationState.PENDING === EzFeatureToggles.ezApiRegistrationState &&
            EzObject.isValid(globalThis.ezApi) && EzBoolean.isTrue(globalThis.ezApi.ready) &&

            globalThis.ezApi.ezclocker[EzEventEngine.ezApiName] &&
            globalThis.ezApi.ezclocker[EzEventEngine.ezApiName].ready &&

            globalThis.ezApi.ezclocker[EzHttpHelper.ezApiName] &&
            globalThis.ezApi.ezclocker[EzHttpHelper.ezApiName].ready &&

            globalThis.ezApi.ezclocker[EzNavigation.ezApiName] &&
            globalThis.ezApi.ezclocker[EzNavigation.ezApiName].ready &&

            globalThis.ezApi.ezclocker[EzUrlHelper.ezApiName] &&
            globalThis.ezApi.ezclocker[EzUrlHelper.ezApiName].ready;
    }

    /**
     * @static
     * @private @readonly @property
     * Returns if this class's singleton instance is registered with ezApi yet.
     * @returns {boolean}
     */
    static get #ezIsRegistered() {
        return null != EzFeatureToggles.ezInstance &&
            EzRegistrationState.REGISTERED === EzFeatureToggles.ezApiRegistrationState;
    }

    /**
     * @static
     * @private @method
        Attempts to register the singleton instance for this class with ezApi. Returns true
        if successful, false otherwise.
     * @returns {boolean}
     */
    static #ezRegistrator() {
        if (EzFeatureToggles.#ezCanRegister && !EzFeatureToggles.#ezIsRegistered) {
            globalThis.ezApi.ezRegisterNewApi(EzFeatureToggles, EzFeatureToggles.ezApiName);
        }

        return EzFeatureToggles.#ezIsRegistered;
    }

    /**
     * @static
        Static Initialization
        ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        >> IMPORTANT <<
        ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        Make sure the following properties and methods get defined BEFORE this static initialization section:
            1) Property getter EzFeatureToggles.ezApiName
            2) Property getter EzFeatureToggles.ezEventNames
            3) Property getter EzFeatureToggles.ezInstance
            4) Property setter EzFeatureToggles.ezInstance
            5) Property getter EzFeatureToggles.ezApiRegistrationState
            6) Property setter EzFeatureToggles.ezApiRegistrationState
            7) Property getter EzFeatureToggles.#ezCanRegister
            8) Property getter EzFeatureToggles.#ezIsRegistered
            9) Method EzFeatureToggles.#ezRegistrator()
     */
    static {
        if (!EzFeatureToggles.#ezIsRegistered) {
            EzFeatureToggles.ezApiRegistrationState = EzRegistrationState.PENDING;

            if (!EzFeatureToggles.#ezRegistrator()) {
                document.addEventListener(
                    EzFeatureToggles.ezOnEzApiReadyEventName,
                    EzFeatureToggles.#ezRegistrator);

                document.addEventListener(
                    EzEventEngine.ezEventNames.onReady,
                    EzFeatureToggles.#ezRegistrator);

                document.addEventListener(
                    EzHttpHelper.ezEventNames.onReady,
                    EzFeatureToggles.#ezRegistrator);

                document.addEventListener(
                    EzNavigation.ezEventNames.onReady,
                    EzFeatureToggles.#ezRegistrator);

                document.addEventListener(
                    EzUrlHelper.ezEventNames.onReady,
                    EzFeatureToggles.#ezRegistrator);
            }
        }
    }

    /**
     * @public @field
     * Stores if debug mode is enabled or not
     * @type {boolean}
     */
    ezDebugMode = false;

    /**
     * @public @field
     * Stores a reference to the feature toggle data
     * @type {object}
     */
    ezFeatures = this.DEFAULT_FEATURES;

    /**
     * @public @field
     * Stores the current deployment enviornment
     * @type {string}
     * A valid enumeration property value from EzEnvironment
     */
    ezEnvironment = EzEnvironment.PRD;

    /**
     * @public @field
     * Stores the name of the current view
     * @type {string}
     */
    ezCurrentView = '';

    /**
     * @public @field
     * Stores an alternate reference to the static property EzFeatureToggles.ezEventNames
     * @type {object}
     * @deprecated
     * Migrate to using the static property: EzFeatureToggles.ezEventNames
     */
    ezEventNames = EzFeatureToggles.ezEventNames;

    /**
     * @public @readonly @property
     * Returns the default feature toggle instance
     * @returns {object}
     */
    get DEFAULT_FEATURES() {
        return {
            'views': {
                'ezEmployerTimeOffView': {
                    'ezfTimeOff': {
                        'enabled': true,
                        'featureOn': true
                    },
                },
                'ezEmployeerTimeOffView': {
                    'ezfTimeOff': {
                        'enabled': true,
                        'featureOn': true
                    },
                },
                'ezTeamChatDialog': {
                    "ezfTeamChat": {
                        "enabled": true,
                        "featureOn": true
                    }
                },
                'account': {
                    'ezfYearlySubscriptions2023': {
                        'enabled': true,
                        'featureOn': true
                    },
                    'ezfEZOPTION_REQUIRE_LOCATION_FOR_CLOCKINOUT': {
                        'enabled': true,
                        'featureOn': true
                    },
                    'ezfIntegrations': {
                        'enabled': true,
                        'featureOn': true
                    },
                    'ezScheduleDrivenClockIn': {
                        'enabled': true,
                        'featureOn': true
                    },
                    'ezfEZOPTION_ALLOW_RECORDING_OF_UNPAID_BREAKS': {
                        'enabled': true,
                        'featureOn': true
                    },
                    'ezfEZOPTION_ALLOW_AUTOMATIC_BREAKS': {
                        'enabled': true,
                        'featureOn': true
                    },
                    'ezfEZOPTION_NOTIFY_EMPLOYER_EMPLOYEE_MISSED_CLOCK_IN_CLOCK_OUT': {
                        'enabled': true,
                        'featureOn': true
                    },
                    'ezfEZOPTION_NOTIFY_EMPLOYEE_MISSED_CLOCK_IN_CLOCK_OUT': {
                        'enabled': true,
                        'featureOn': true
                    },
                    'ezfEZOPTION_ALLOW_EMPLOYEES_TO_SEE_COWORKER_SCHEDULES': {
                        'enabled': true,
                        'featureOn': true
                    },
                    'ezfEZOPTION_ALLOW_TIME_OFF_REQUESTS': {
                        'enabled': true,
                        'featureOn': true
                    },
                    'ezRoundClockInClockOut': {
                        'enabled': true,
                        'featureOn': true
                    },
                    'ezfTimeOff': {
                        'enabled': true,
                        'featureOn': true
                    },
                    "ezfTeamChat": {
                        "enabled": true,
                        "featureOn": true
                    },
                    "ezfRemindEmployeesBeforeShiftStarts": {
                        "enabled": true,
                        "featureOn": true
                    }
                },
                'employerDashboard': {
                    'ezfActiveTimeZoneDisplay': {
                        'enabled': true,
                        'featureOn': true
                    },
                    'ezfIntegrations': {
                        'enabled': true,
                        'featureOn': true
                    },
                    'JOBS': {
                        'enabled': true,
                        'featureOn': true
                    },
                    'ezfEmployePdfReport': {
                        'enabled': true,
                        'featureOn': true,
                        'style': 'display:grid;'
                    },
                    'ezfTimeOff': {
                        'enabled': true,
                        'featureOn': true
                    },
                    "ezfTeamChat": {
                        "enabled": true,
                        "featureOn": true
                    }
                },
                'employerSchedule': {
                    'ezfActiveTimeZoneDisplay': {
                        'enabled': true,
                        'featureOn': true
                    },
                    'ezfPublishSchedule': {
                        'enabled': true,
                        'featureOn': true
                    },
                    'ezfExportSchedule': {
                        'enabled': true,
                        'featureOn': true
                    },
                    'ezfTimeOff': {
                        'enabled': true,
                        'featureOn': true
                    },
                    "ezfTeamChat": {
                        "enabled": true,
                        "featureOn": true
                    }
                },
                'employeeDashboard': {
                    'ezfTimeOff': {
                        'enabled': true,
                        'featureOn': true
                    },
                    "ezfTeamChat": {
                        "enabled": true,
                        "featureOn": true
                    }
                },
                'employeeSchedule': {
                    'ezfExportSchedule': {
                        'enabled': true,
                        'featureOn': true
                    },
                    'ezfTimeOff': {
                        'enabled': true,
                        'featureOn': true
                    },
                    "ezfTeamChat": {
                        "enabled": true,
                        "featureOn": true
                    }
                }
            }
        };
    }

    /**
     * @public @method
     * Initializes EzFeatureToggles
     * @returns {EzFeatureToggles}
     */
    ezInit() {
        ezApi.ezclocker.ezEventEngine.ezRegisterEvent(
            EzFeatureToggles.ezApiName,
            EzFeatureToggles.ezEventNames.onFeatureTogglesReady);

        ezApi.ezclocker.ezEventEngine.ezRegisterEvent(
            EzFeatureToggles.ezApiName,
            EzFeatureToggles.ezEventNames.onFeatureTogglesApplied);

        EzFeatureToggles.ezInstance.ezGetEnvironment()
            .then(EzFeatureToggles.ezInstance.ezLoadFeatures)
            .then(
                () => {
                    ezApi.ezclocker.ezEventEngine.ezTriggerEvent(
                        EzFeatureToggles.ezEventNames.onFeatureTogglesReady,
                        ezApi.ezclocker.ezEventEngine.ezBuildEventData(
                            EzFeatureToggles.ezApiName,
                            'EzFeatureToggles is ready.',
                            EzFeatureToggles.ezInstance
                        ));
                });

        return EzFeatureToggles.ezInstance;
    }

    /**
     * @public @method
     * Obtains the enviornment by evaluating the current url
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
     * @public @method
     * Obtains the current environment
     * @returns {Promise.resolve}
     */
    ezGetEnvironment() {
        return ezApi.ezResolver(
            (resolve) => ezApi.ezclocker.ezHttpHelper.ezGet(
                ezApi.ezclocker.ezNavigation.ezGetPublicApiServiceUrl('version', 'v1'))
                .then(
                    (response) => {
                        if (EzString.stringHasLength(response.environment)) {
                            EzFeatureToggles.ezInstance.ezEnvironment = response.environment;
                        } else if (EzString.stringHasLength(response.targetEnvironment)) {
                            EzFeatureToggles.ezInstance.ezEnvironment = response.targetEnvironment;
                        } else {
                            EzFeatureToggles.ezInstance.ezEnvironment = EzFeatureToggles.ezInstance.ezGetEnvironmentFromUrl();
                        }

                        if (!EzString.stringHasLength(EzFeatureToggles.ezInstance.ezEnvironment)) {
                            EzFeatureToggles.ezInstance.ezEnvironment = EzEnvironment.PRD;
                        }

                        let urlEnv = EzFeatureToggles.ezInstance.ezGetEnvironmentFromUrl();

                        if (urlEnv !== EzFeatureToggles.ezInstance.environment && EzEnvironment.QAL === urlEnv || EzEnvironment.LOC === urlEnv) {
                            EzFeatureToggles.ezInstance.ezEnvironment = ezApi.ezclocker.ezUrlHelper.ezGetEnvironmentFromUrl();
                        }

                        return resolve(EzFeatureToggles.ezInstance.ezEnvironment);
                    },
                    (eResponse) => {
                        if (EzBoolean.isTrue(EzFeatureToggles.ezInstance.ezDebugMode)) {
                            ezApi.ezclocker.ezLogger.error(
                                `Unable to determine the current deployment environment. Error: ${ezApi.ezToJson(eResponse)}`);
                        } else {
                            ezApi.ezclocker.ezLogger.warn(
                                'EzFeatureToggles: Environment information was not available. Defaulting to enviornment PRD');
                        }

                        EzFeatureToggles.ezInstance.ezEnvironment = EzEnvironment.PRD;

                        return resolve(EzFeatureToggles.ezInstance.ezEnvironment);
                    }));
    }

    /**
     * @public @method
     * Obtains the dynamic features from S3
     * @returns {Promise.resolve}
     */
    ezLoadFeatures() {
        return ezApi.ezResolver(
            (resolve) => {
                let url = window.location.href;

                if (-1 !== url.indexOf('://localhost:')) {
                    EzFeatureToggles.ezInstance.ezEnvironment = EzEnvironment.LOC;
                }

                let featureToggleFilename = 'feature-toggles.json';
                switch (EzFeatureToggles.ezInstance.ezEnvironment) {
                    case EzEnvironment.LOC:
                        // Use the embedded default for local
                        EzFeatureToggles.ezInstance.ezFeatures = EzFeatureToggles.ezInstance.DEFAULT_FEATURES;
                        return resolve();
                    case EzEnvironment.DEV:
                        featureToggleFilename = `feature-toggles-${EzFeatureToggles.ezInstance.ezEnvironment}.json?v=${moment().format('x')}`;
                        break;
                    case EzEnvironment.QAL:
                        featureToggleFilename = `feature-toggles-${EzFeatureToggles.ezInstance.ezEnvironment}.json?v=${moment().format('x')}`;
                        break;
                    case EzEnvironment.E2E:
                        featureToggleFilename = `feature-toggles-${EzFeatureToggles.ezInstance.ezEnvironment}.json?v=${moment().format('x')}`;
                        break;
                    case EzEnvironment.PRF:
                        featureToggleFilename = `feature-toggles-${EzFeatureToggles.ezInstance.ezEnvironment}.json?v=${moment().format('x')}`;
                        break;
                    case EzEnvironment.PRD:
                    default:
                        //featureToggleFilename = `feature-toggles.json?v=${moment().format('x')}`;
                        // TODO: REMOVE THIS AFTER TESTING TEAMCHAT IN PRODUCTIOn
                        // TEMPORARY CHANGE TO PULL DEV FEATURE TOGGLES FOR DEVELOPMENT BUILD ONLY
                        featureToggleFilename = `feature-toggles-${EzFeatureToggles.ezInstance.ezEnvironment}.json?v=${moment().format('x')}`;
                        break;
                }

                return ezApi.ezclocker.ezHttpHelper.ezGet(
                    EzFeatureToggles.ezInstance.ezGetDynamicPageUrl(featureToggleFilename))
                    .then(
                        (response) => {
                            EzFeatureToggles.ezInstance.ezFeatures = ezApi.ezFromJson(response);

                            return resolve();
                        },
                        (eResponse) => {
                            EzFeatureToggles.ezInstance.ezFeatures = EzFeatureToggles.ezInstance.DEFAULT_FEATURES;

                            if (EzBoolean.isTrue(EzFeatureToggles.ezInstance.ezDebugMode)) {
                                ezApi.ezclocker.logger.warn(
                                    ezApi.ezEM`
                                        Unable to load the feature toggle settings file ${featureToggleFilename}. Using the default
                                        settings instead. Response: ${ezApi.ezToJson(eResponse)}`);
                            }

                            return resolve();
                        });
            });
    }

    /**
     * Returns the full ezClocker dynamic/{pagename} url
     * @param {string} pageName
     * @returns {string}
     */
    ezGetDynamicPageUrl(pageName) {
        return `/dynamic/${pageName}`;
    }

    /**
     * @public @method
     * Determines if a view feature is enabled or not for JS use
     * @param {string} viewName
     * @param {string} featureId
     * @returns {boolean}
     */
    ezViewFeatureEnabled(viewName, featureId) {
        if (!EzObject.isValid(EzFeatureToggles.ezInstance.ezFeatures)) {
            return false;
        }
        if (!EzObject.hasProperty(EzFeatureToggles.ezInstance.ezFeatures.views, viewName)) {
            return false;
        }
        if (!EzObject.hasProperty(EzFeatureToggles.ezInstance.ezFeatures.views[viewName], featureId)) {
            return false;
        }

        return EzFeatureToggles.ezInstance.ezFeatures.views[viewName][featureId].enabled;
    }

    /**
     * @public @method
     * Determiens if a view feature is on or not
     * @param {string} viewName
     * @param {string} featureId
     * @returns {boolean}
     */
    ezIsViewFeatureOn(viewName, featureId) {
        if (!EzObject.isValid(EzFeatureToggles.ezInstance.ezFeatures)) {
            return false;
        }
        if (!EzObject.hasProperty(EzFeatureToggles.ezInstance.ezFeatures.views, viewName)) {
            return false;
        }
        if (!EzObject.hasProperty(EzFeatureToggles.ezInstance.ezFeatures.views[viewName], featureId)) {
            return false;
        }

        return EzFeatureToggles.ezInstance.ezViewFeatureEnabled(viewName, featureId) &&
            EzFeatureToggles.ezInstance.ezFeatures.views[viewName][featureId].featureOn;
    }

    /**
     * @public @method
     * Executes the provided executeFunction if the viewName's featureId is enabled. Otherwise, the didNotExecuteResult
     * is returned.
     * @param {string} viewName
     * @param {string} featureId
     * @param {undefined|null|function} executeFunction
     * @param {*} didNotExecuteResult
     * @returns {*}
     * Returns the result of the executeFunction called, or the didNotExecuteResult if the executeFunction was not called.
     */
    ezExecuteIfFeatureEnabled(viewName, featureId, executeFunction, didNotExecuteResult) {
        if (!EzString.stringHasLength(viewName)) {
            throw new EzBadParamException(
                'viewName',
                EzFeatureToggles.ezInstance,
                EzFeatureToggles.ezInstance.ezExecuteIfFeatureEnabled);
        }
        if (!EzString.stringHasLength(featureId)) {
            throw new EzBadParamException(
                'viewName',
                EzFeatureToggles.ezInstance,
                EzFeatureToggles.ezInstance.ezExecuteIfFeatureEnabled);
        }
        if (!EzFunction.isFunction(executeFunction)) {
            throw new EzBadParamException(
                'executeFunction',
                EzFeatureToggles.ezInstance,
                EzFeatureToggles.ezInstance.ezExecuteIfFeatureEnabled);
        }

        return EzFeatureToggles.ezInstance.ezViewFeatureEnabled(viewName, featureId)
            ? executeFunction()
            : didNotExecuteResult;
    }

    /**
     * @public @method
     * Returns if a specified feature id is enabled for the provided employerid
     * @param {string} viewName
     * @param {string} featureId
     * @param {number} employerId
     * @returns {boolean}
     */
    ezViewFeatureEnabledForEmployer(viewName, featureId, employerId) {
        return EzFeatureToggles.ezInstance.ezFeatures.views
            ?.[viewName]
            ?.[featureId]
            ?.employerIds['eId*'] ||
            EzFeatureToggles.ezInstance.ezFeatures.views
                ?.[viewName]
                ?.[featureId]
                ?.employerIds[`eId${employerId}`];
    }

    /**
     * @public @method
     * Applies the needed actions for features associated with provided view name
     * @param {String} viewName
     */
    ezApplyViewFeatureToggles(viewName) {
        let view = EzFeatureToggles.ezInstance.ezFeatures.views[viewName];

        if (!EzObject.isValid(view)) {
            // feature toggles not supported for view
            return;
        }
        //console.log("FRIOct33xx");

        for (let id in view) {
            let featureGroup = view[id];

            if (EzBoolean.isTrue(featureGroup.enabled)) {
                let featureElements = document.querySelectorAll(`[data-feature-id="${id}"]`);

                featureElements.forEach(
                    (ele) => {
                        let msg = EzString.msg`
                            [FEATURE TOGGLE][${EzJson.toJson(ele.id)}]:${id}=${EzJson.toJson(featureGroup)}`;

                        ezApi.ezclocker.logger.debug(msg);


                        if (ezApi.ezIsFalse(featureGroup.featureOn)) {
                            ele.style.display = 'none';
                        } else if (featureGroup.style) {
                            ele.style = featureGroup.style;
                        } else {
                            ele.style.display = 'contents';
                        }
                    });
            }
        }

        ezApi.ezclocker.ezEventEngine.ezTriggerEvent(
            EzFeatureToggles.ezEventNames.onFeatureTogglesApplied,
            ezApi.ezclocker.ezEventEngine.ezBuildEventData(
                EzFeatureToggles.ezApiName,
                'EzFeatureToggles have applied.',
                EzFeatureToggles.ezInstance));
    }
}
