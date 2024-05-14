import { EzException } from '/ezlibrary/exceptions/EzException.js';
import { EzBadParamException } from '/ezlibrary/exceptions/EzBadParamException.js';

import { EzRegistrationState } from '/ezlibrary/enums/EzRegistrationState.js';

import { EzClass } from '/ezlibrary/EzClass.js';

import { EzDateTime } from '/public/javascript/common/ez-date-time.js';

import { EzEventEngine } from '/ezlibrary/ez-event-engine.js';

import { EzClockerContextEventName } from '/ezlibrary/EzClockerContext/EzClockerContextEventName.js';
import { EzClockerContext } from '/ezlibrary/EzClockerContext/ez-context.js';

// import { EzClockerFeature } from '/ezlibrary/EzClockerFeature.js';
// import { EzFeatureToggles } from '/ezlibrary/ez-feature-toggles2.js';
// import { EzElementEventName } from '/ezlibrary/EzElementEventName.js';
// import { EzEmployerOption } from '/ezlibrary/EzEmployerOption.js';

import { EzNavigation } from '/public/javascript/common/ezclocker-navigation-helper.js';
import { EzUI } from '/public/javascript/common/ezui.js';
import { EzDialog } from '/public/javascript/common/ezclocker-dialog-helper.js';

/**
    EzExampleClass Template
    Import with:
        import { EzwEmployerExportTimeSheetDialog } from '/secure/widgets/EzExportReportDialog/ez-export-report-dialog.js';

        globalThis.ezApi.ezclocker[EzwEmployerExportTimeSheetDialog.ezApiName] &&
        globalThis.ezApi.ezclocker[EzwEmployerExportTimeSheetDialog.ezApiName].ready &&
 */
export class EzExample extends EzClass {
    /**
        @public @static @field
        @type {EzwEmployerExportTimeSheetDialog}
     */
    static #ezInstance =
        Object.prototype.hasOwnProperty.call(globalThis, 'ezApi') &&
        globalThis.ezApi &&
        Object.prototype.hasOwnProperty.call(globalThis.ezApi, 'ezclocker') &&
        globalThis.ezApi.ezclocker &&
        Object.prototype.hasOwnProperty.call(globalThis.ezApi.ezclocker, EzExample.ezApiName) &&
        globalThis.ezApi.ezclocker[EzExample.ezApiName]
            ? globalThis.ezApi.ezclocker[EzExample.ezApiName]
            : null;

    /**
        @public @static @field
        @type {String}
        Acceptable values: null, 'PENDING', 'REGISTERED'
     */
    static #ezApiRegistrationState =
        Object.prototype.hasOwnProperty.call(globalThis, 'ezApi') &&
        globalThis.ezApi &&
        Object.prototype.hasOwnProperty.call(globalThis.ezApi, 'ezclocker') &&
        globalThis.ezApi.ezclocker &&
        Object.prototype.hasOwnProperty.call(globalThis.ezApi.ezclocker, EzExample.ezApiName) &&
        globalThis.ezApi.ezclocker[EzExample.ezApiName]
            ? EzRegistrationState.REGISTERED
            : null;

    /**
        @public @static @readonly @property
        Returns the name of this class's singleton instance when registered with ezApi.
        @returns {string}
     */
    static get ezApiName() {
        return 'ezwEmployerExportTimeSheetDialog';
    }

    /**
        @public @static @readonly @property
        Returns an object of event names that this class may trigger.
        @returns {object}
             */
    static get ezEventNames() {
        return {
            onReady: 'ezOn_EzExample_Ready',
        };
    }

    /**
        @public @static @property @getter
        Returns the ezApi registration state of this classes's singleton instance.
        @returns {string}
        A valid enum property value from EzRegistrationState
     */
    static get ezApiRegistrationState() {
        return EzExample.#ezApiRegistrationState;
    }

    /**
        @public @static @property @setter
        Sets the ezApi registration state of this classes's singleton instance.
        @param {string} ezApiRegistrationState
        A valid enum property value from EzRegistrationState
     */
    static set ezApiRegistrationState(ezApiRegistrationState) {
        EzExample.#ezApiRegistrationState = EzRegistrationState.ezValueOf(ezApiRegistrationState);
    }

    /**
        @public @static @getter @property
        Returns the singleton instance of this class that is registered with EzApi (if available yet)
        @param {EzwEmployerExportTimeSheetDialog}
     */
    static get ezInstance() {
        return EzExample.#ezInstance;
    }

    /**
        @public @static @getter @property
        Sets the singleton instance of of this class that is registered with EzApi.
        @param {EzExample} ezExample
     */
    static set ezInstance(ezExample) {
        if (null != EzExample.#ezInstance) {
            throw new EzException('EzExample singleton instance is already reigstered with EzApi.');
        }

        EzExample.#ezInstance = ezExample;
    }

    /**
        @public @static @readonly @property
        Returns if all necessary dependences are ready and therefore it is ok for this class to
        register it's singleton instance with ezApi.
        @returns {boolean}
     */
    static get ezCanRegister() {
        return (
            EzRegistrationState.PENDING === EzExample.ezApiRegistrationState &&
            Object.prototype.hasOwnProperty.call(globalThis, 'ezApi') &&
            globalThis.ezApi &&
            globalThis.ezApi.ready &&
            globalThis.ezApi.ezclocker[EzDateTime.ezApiName] &&
            globalThis.ezApi.ezclocker[EzDateTime.ezApiName].ready &&
            globalThis.ezApi.ezclocker[EzEventEngine.ezApiName] &&
            globalThis.ezApi.ezclocker[EzEventEngine.ezApiName].ready &&
            globalThis.ezApi.ezclocker[EzClockerContextEventName.ezApiName] &&
            globalThis.ezApi.ezclocker[EzClockerContextEventName.ezApiName].ready &&
            globalThis.ezApi.ezclocker[EzClockerContext.ezApiName] &&
            globalThis.ezApi.ezclocker[EzClockerContext.ezApiName].ready &&
            globalThis.ezApi.ezclocker[EzNavigation.ezApiName] &&
            globalThis.ezApi.ezclocker[EzNavigation.ezApiName].ready &&
            globalThis.ezApi.ezclocker[EzUI.ezApiName] &&
            globalThis.ezApi.ezclocker[EzUI.ezApiName].ready &&
            globalThis.ezApi.ezclocker[EzDialog.ezApiName] &&
            globalThis.ezApi.ezclocker[EzDialog.ezApiName].ready
        );
    }

    /**
        @private @static @readonly @property
        Returns if this class's singleton instance is registered with ezApi yet.
        @returns {boolean}
     */
    static get #ezIsRegistered() {
        return null != EzExample.ezInstance && EzRegistrationState.REGISTERED === EzExample.ezApiRegistrationState;
    }

    /**
        @private @static @method
        Attempts to register the singleton instance for this class with ezApi. Returns true
        if successful, false otherwise.
        @returns {boolean}
     */
    static #ezRegistrator() {
        if (EzExample.ezCanRegister && !EzExample.#ezIsRegistered) {
            globalThis.ezApi.ezRegisterNewApi(EzExample, EzExample.ezApiName);
        }

        return EzRegistrationState.REGISTERED === EzExample.ezApiRegistrationState;
    }

    /**
        @static
        Static Initializer
     */
    static {
        if (!EzExample.#ezIsRegistered) {
            EzExample.ezApiRegistrationState = EzRegistrationState.PENDING;

            if (!EzExample.#ezRegistrator()) {
                document.addEventListener(
                    EzClass.ezOnEzApiReadyEventName, 
                    EzExample.#ezRegistrator);

                document.addEventListener(
                    EzDateTime.ezEventNames.onReady, 
                    EzExample.#ezRegistrator);

                document.addEventListener(
                    EzEventEngine.ezEventNames.onReady, 
                    EzExample.#ezRegistrator);

                document.addEventListener(
                    EzClockerContextEventName.ezEventNames.onReady, 
                    EzExample.#ezRegistrator);

                document.addEventListener(
                    EzClockerContext.ezEventNames.onReady, 
                    EzExample.#ezRegistrator);

                document.addEventListener(
                    EzNavigation.ezEventNames.onReady, 
                    EzExample.#ezRegistrator);

                document.addEventListener(
                    EzUI.ezEventNames.onReady, 
                    EzExample.#ezRegistrator);

                document.addEventListener(EzDialog.ezEventNames.onReady, EzExample.#ezRegistrator);
            }
        }
    }

    // Constants

    static get DEFAULT_PROPERTY1() {
        return 'Default value for property 1';
    }

    /**
     * @public @constructor
     */
    constructor() {
        super();
    }

    /**
     * @private @field
     * Stores the value for property 1
     * @type {string}
     */
    #ezProperty1 = EzExample.DEFAULT_PROPERTY1;
    /**
     * @public @property @getter
     * Gets the value of property 1
     * @returns {string}
     */
    get ezProperty1() {
        return this.#ezProperty1;
    }
    /**
     * @public @property @setter
     * Sets the value of property 1
     * @param {string} ezProperty1
     */
    set ezProperty1(ezProperty1) {
        this.#ezProperty1 = ezApi.ezStringOrDefault(ezProperty1, EzExample.DEFAULT_PROPERTY1);
    }

    /**
     * @protected @method
     * Initializes EzExample
     * @returns {EzExample}
     */
    ezInit() {
        // Perform initialization here
        EzExample.ezInstance
            .ezInitData()
            .then(EzExample.ezInstance.ezInitUX)
            .then(() => {
                // Actions that happen after data and ux is loaded (if any)
            });

        return EzExample.ezInstance;
    }

    /**
     * @protected @method
     * Initializes needed data for EzExample
     * @returns {Promise.resolve}
     */
    ezInitData() {
        return ezApi.ezAsyncAction((finished) => {
            // Initialize any data needed before the UX loads

            return finished;
        });
    }

    /**
     * @protected @method
     * Initializes the UX for EzExample
     * @returns {Promise.resolve}
     */
    ezInitUX() {
        return ezApi.ezAsyncAction((finished) => {
            // Initialize the main UX

            EzExample.ezInstance.ezApplyFeatureToggles().then(EzExample.ezInstance.ezApplyUserRoleFeatureToggles).then(finished);
        });
    }

    /**
     * @protected @method
     * Applies any feature toggles (such as hiding/showing UX) based upon
     * @returns {Promise.resolve}
     */
    ezApplyFeatureToggles() {
        return ezApi.ezAsyncAction((finished) => {
            // apply feature toggles (if any)

            /* Example Code
                // Let the class handle the feature toggles

                ezApi.ezclocker.ezFeatureToggles.ezApplyViewFeatureToggles('EzExample');

                // or with if statement

                if (ezApi.ezclocker.ezFeatureToggles.ezViewFeatureEnabled('EzExample', 'esfEzExampleFeatureA')) {
                    // feature enabled code here
                } else {
                    // feature disabled code here
                }

            */
            return finished();
        });
    }

    /**
     * @protected @method
     * Initializes the UX for EzExample
     * @returns {Promise.resolve}
     */
    ezApplyUserRoleFeatureToggles() {
        return ezApi.ezAsyncAction((finished) => {
            // apply user role related feature toggles (if any)

            /* Example Code
                if (ezApi.ezclocker.ezClockerContext.ezGetUserContext().isEmployer ||
                    ezApi.ezclocker.ezClockerContext.ezGetUserContext().isPayrollManager ||
                    ezApi.ezclocker.ezClockerContext.ezGetUserContext().isManager) {
                        // enable or disable features for employers, payroll managers, and managers
                }
                if (ezApi.ezclocker.ezClockerContext.ezGetUserContext().isEmployee) {
                    // Enable or disable features for employees
                }
            */

            return finished();
        });
    }

    /**
     * @protected @method
     * Example method with param validation
     * @param {string} entityProp1
     * @param {number} entityProp2
     * @param {obect} entityProp3
     */
    ezAddEntity(entityProp1, entityProp2, entityProp3) {
        if (!ezApi.ezStringHasLength(entityProp1)) {
            throw new EzBadParamException('entityProp1', EzExample, EzExample.ezAddEntity);
        }
        if (!ezApi.ezIsNumber(entityProp2)) {
            throw new EzBadParamException('entityProp2', EzExample, EzExample.ezAddEntity);
        }
        if (!ezApi.ezIsValid(entityProp3)) {
            throw new EzBadParamException('entityProp3', EzExample, EzExample.ezAddEntity);
        }

        // code to add an entity
    }
}
