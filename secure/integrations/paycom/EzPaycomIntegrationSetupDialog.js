import { EzBadParamException } from '/ezlibrary/exceptions/EzBadParamException.js';

import { EzRegistrationState } from '/ezlibrary/enums/EzRegistrationState.js';

import { EzEventEngine } from '/ezlibrary/ez-event-engine.js';

import { EzUI } from '/public/javascript/common/ezui.js';
import { EzDialog } from '/public/javascript/common/ezclocker-dialog-helper.js';

import { EzIntegrationProviderId } from '/secure/integrations/ez-integration-enums.js';
import { EzIntegrationMappingViewType } from '/secure/integrations/EzIntegrationSetupDialog/EzIntegrationMappingViewType.js';
import { EzIntegrationSetupDialog2 } from '/secure/integrations/EzIntegrationSetupDialog/EzIntegrationSetupDialog2.js';

import { EzPaycomIntegrationSetupController } from '/secure/integrations/paycom/EzPaycomIntegrationSetupController.js';
import { EzPaycomIntegrationSetupRequest } from '/secure/integrations/paycom/EzPaycomIntegrationSetupRequest.js';
import { EzPaycomIntegrationSetupResponse } from '/secure/integrations/paycom/EzPaycomIntegrationSetupResponse.js';

/**
    @public
    View for the copy schedule forward feature on the ezClocker website for employers.
 */
export class EzPaycomIntegrationSetupDialog extends EzIntegrationSetupDialog2 {
    /**
        @public @static @field
        @type {EzClockerContext}
     */
    static #ezInstance = Object.prototype.hasOwnProperty.call(globalThis, 'ezApi') &&
        globalThis.ezApi &&
        Object.prototype.hasOwnProperty.call(globalThis.ezApi, 'ezclocker') &&
        globalThis.ezApi.ezclocker &&
        Object.prototype.hasOwnProperty.call(globalThis.ezApi.ezclocker, EzPaycomIntegrationSetupDialog.ezApiName) &&
        globalThis.ezApi.ezclocker[EzPaycomIntegrationSetupDialog.ezApiName]
        ? globalThis.ezApi.ezclocker[EzPaycomIntegrationSetupDialog.ezApiName]
        : null;

    /**
        @public @static @field
        @type {String}
        Acceptable values: null, 'PENDING', 'REGISTERED'
     */
    static #ezApiRegistrationState = Object.prototype.hasOwnProperty.call(globalThis, 'ezApi') &&
        globalThis.ezApi &&
        Object.prototype.hasOwnProperty.call(globalThis.ezApi, 'ezclocker') &&
        globalThis.ezApi.ezclocker &&
        Object.prototype.hasOwnProperty.call(globalThis.ezApi.ezclocker, EzPaycomIntegrationSetupDialog.ezApiName) &&
        globalThis.ezApi.ezclocker[EzPaycomIntegrationSetupDialog.ezApiName]
        ? EzRegistrationState.REGISTERED
        : null;

    /**
        @public @static @readonly @property
        Returns the name of the singleton instance of this class stored in ezApi.
        @returns {string}
     */
    static get ezApiName() {
        return 'ezPaycomIntegrationSetupDialog';
    }

    /**
        @public @static @readonly @property
        Returns an object of property = event name for events triggered by this class.
        @returns {string}
     */
    static get ezEventNames() {
        return {
            onReady: 'ezOn_EzPaycomIntegrationSetupDialog_Ready',
            onIntegrationSetupDialogVisible: 'ezOn_EzPaycomIntegrationSetupDialog_Visible',
            onIntegrationSetupDialogClose: 'ezOn_EzPaycomIntegrationSetupDialog_Closed',
            onIntegrationSetupDialogSubmitted: 'ezOn_EzPaycomIntegrationSetupDialog_Submitted',
            onIntegrationSetupDialogError: 'ezOn_EzPaycomIntegrationSetupDialog_Error',
            onIntegrationSetupDialogDataReady: 'ezOn_EzPaycomIntegrationSetupDialog_DataReady'
        };
    }

    /**
        @public @static @property @getter
        Returns the ezApi registration state of this classes's singleton instance.
        @returns {string}
        A valid enum property value from EzRegistrationState
     */
    static get ezApiRegistrationState() {
        return EzPaycomIntegrationSetupDialog.#ezApiRegistrationState;
    }

    /**
        @public @static @property @setter
        Sets the ezApi registration state of this classes's singleton instance.
        @param {string} ezApiRegistrationState
        A valid enum property value from EzRegistrationState
     */
    static set ezApiRegistrationState(ezApiRegistrationState) {
        EzPaycomIntegrationSetupDialog.#ezApiRegistrationState = EzRegistrationState.ezValueOf(ezApiRegistrationState);
    }

    /**
        @public @static @getter @property
        Returns the singleton instance of EzDateTime registered with EzApi (if available yet)
        @param {EzClockerContext}
     */
    static get ezInstance() {
        return EzPaycomIntegrationSetupDialog.#ezInstance;
    }

    /**
        @public @static @getter @property
        Returns the singleton instance of EzDateTime registered with EzApi (if available yet)
     */
    static set ezInstance(ezwEmployerExportTimeSheetDialog) {
        if (null != EzPaycomIntegrationSetupDialog.#ezInstance) {
            throw new Error('EzPaycomIntegrationSetupDialog\'s singleton instance is already reigstered with EzApi.');
        }

        EzPaycomIntegrationSetupDialog.#ezInstance = ezwEmployerExportTimeSheetDialog;
    }

    /**
        @public @static @readonly @property
        Returns if the single instance of this class has all it's dependent ezApi references ready and can now register with ezApi.
        @returns {boolean}
     */
    static get ezCanRegister() {
        return 'PENDING' === EzPaycomIntegrationSetupDialog.ezApiRegistrationState &&
            Object.prototype.hasOwnProperty.call(globalThis, 'ezApi') &&
            globalThis.ezApi && globalThis.ezApi.ready &&

            globalThis.ezApi.ezclocker[EzEventEngine.ezApiName] &&
            globalThis.ezApi.ezclocker[EzEventEngine.ezApiName].ready &&

            globalThis.ezApi.ezclocker[EzUI.ezApiName] &&
            globalThis.ezApi.ezclocker[EzUI.ezApiName].ready &&

            globalThis.ezApi.ezclocker[EzDialog.ezApiName] &&
            globalThis.ezApi.ezclocker[EzDialog.ezApiName].ready;
    }

    /**
        @private @static @readonly @property
        Returns if this class's singleton instance is registered with ezApi yet.
        @returns {boolean}
     */
    static get #ezIsRegistered() {
        return null != EzPaycomIntegrationSetupDialog.ezInstance &&
            EzRegistrationState.REGISTERED === EzPaycomIntegrationSetupDialog.ezApiRegistrationState;
    }

    /**
        @private @static @method
        Registers the singleton instance of this class with ezApi. Returns true if registered, false if unable to register.
        @returns {boolean}
     */
    static #ezRegistrator() {
        if (EzPaycomIntegrationSetupDialog.ezCanRegister && !EzPaycomIntegrationSetupDialog.#ezIsRegistered) {
            globalThis.ezApi.ezRegisterNewApi(EzPaycomIntegrationSetupDialog, EzPaycomIntegrationSetupDialog.ezApiName);
        }

        return EzRegistrationState.REGISTERED === EzPaycomIntegrationSetupDialog.ezApiRegistrationState;
    }

    /**
        @static
        Static initializer
     */
    static {
        if (!EzPaycomIntegrationSetupDialog.#ezIsRegistered) {
            EzPaycomIntegrationSetupDialog.ezApiRegistrationState = EzRegistrationState.PENDING;

            if (!EzPaycomIntegrationSetupDialog.#ezRegistrator()) {
                document.addEventListener(
                    'onEzApiReady',
                    () => {
                        if (!EzPaycomIntegrationSetupDialog.#ezRegistrator()) {
                            document.addEventListener(
                                EzEventEngine.ezEventNames.onReady,
                                EzPaycomIntegrationSetupDialog.#ezRegistrator);

                            document.addEventListener(
                                EzUI.ezEventNames.onReady,
                                EzPaycomIntegrationSetupDialog.#ezRegistrator);

                            document.addEventListener(
                                EzDialog.ezEventNames.onReady,
                                EzPaycomIntegrationSetupDialog.#ezRegistrator);
                        }
                    });
            }
        }
    }

    /**
        @public @constructor
        Creates a new instance of EzPaycomIntegrationSetupDialog
     */
    constructor() {
        super(EzIntegrationProviderId.PAYCOM, new EzPaycomIntegrationSetupController());
    }

    /**
        @override
        @public @readonly @method
        Returns the id for the dialog
        @returns {string}
     */
    get ezDialogId() {
        return 'EzPaycomIntegrationSetupDialog';
    }

    /**
        @override
        @public @readonly @property
        Returns the integration setup persistance url
     */
    get ezPersistIntegrationSetupUrl() {
        return `integrations/${EzPaycomIntegrationSetupDialog.ezInstance.ezIntegrationProviderId}/paycom-integration`;
    }

    /**
        @override
        @public @readonly @property
        Returns an array of the supported mapping configurations
        @returns {array}
     */
    get ezSupportedMappings() {
        return [
            EzIntegrationMappingViewType.EMPLOYEE_MAPPING,
            EzIntegrationMappingViewType.PAY_RATE_MAPPING,
        ];
    }

    /**
        @override
        @public @readonly @property
        Returns the employee mapping field display name for this integration.
        @returns {string}
     */
    get ezIntegrationEmployeeMapFieldDisplayName() {
        return `${this.ezIntegrationName} EE Code`;
    }

    /**
        @override
        @public @readonly @property
        Returns the pay rate mapping field display name for this integration.
        @returns {string}
     */
    get ezIntegrationPayRateMapFieldDisplayName() {
        return `${this.ezIntegrationName} Earning Code`;
    }

    /**
        @override
        @public @readonly @property
        Returns the job mapping field display name for this integration.
        @returns {string}
     */
    get ezIntegrationJobMapFieldDisplayName() {
        return `${this.ezIntegrationName} Department Code`;
    }

    /**
        @public @method
        Shows the integrations dialog in the provided mode (or uses the default if not provided)
        Optionally assigns the provided closeCallback function if not null.
        @param {EzIntegrationSetupDialogDisplayMode} ezIntegrationSetupDialogDisplayMode
        @param {function|null} closeCallback
     */
    ezShow(ezIntegrationSetupDialogDisplayMode, closeCallback) {
        let internalCloseCallback = ezApi.ezIsFunction(closeCallback)
            ? () => {
                closeCallback();
                EzPaycomIntegrationSetupDialog.ezInstance.ezTriggerOnCloseEvent();
            }
            : EzPaycomIntegrationSetupDialog.ezInstance.ezTriggerOnCloseEvent;

        super.ezShow(ezIntegrationSetupDialogDisplayMode, internalCloseCallback);
    }

    /**
        @override
        @protected @method
        Closes the visible view
     */
    ezSubmit() {
        super.ezSubmit()
            .then(
                (response) => {
                    EzPaycomIntegrationSetupDialog.ezInstance.ezTriggerOnSubmittedEvent(response);
                    EzPaycomIntegrationSetupDialog.ezInstance.ezClose();
                },
                EzPaycomIntegrationSetupDialog.ezInstance.ezTriggerOnErrorEvent);
    }

    /**
        @override
        @protected @method
        Initializes EzPaycomIntegrationSetupDialog
     */
    ezInit() {
        super.ezInit();

        ezApi.ezclocker.ezEventEngine.ezRegisterEvent(
            EzPaycomIntegrationSetupDialog.ezApiName,
            EzPaycomIntegrationSetupDialog.ezEventNames.onIntegrationSetupDialogVisible);

        ezApi.ezclocker.ezEventEngine.ezRegisterEvent(
            EzPaycomIntegrationSetupDialog.ezApiName,
            EzPaycomIntegrationSetupDialog.ezEventNames.onIntegrationSetupDialogClose);

        ezApi.ezclocker.ezEventEngine.ezRegisterEvent(
            EzPaycomIntegrationSetupDialog.ezApiName,
            EzPaycomIntegrationSetupDialog.ezEventNames.onIntegrationSetupDialogSubmitted);

        ezApi.ezclocker.ezEventEngine.ezRegisterEvent(
            EzPaycomIntegrationSetupDialog.ezApiName,
            EzPaycomIntegrationSetupDialog.ezEventNames.onIntegrationSetupDialogError);

        ezApi.ezclocker.ezEventEngine.ezRegisterEvent(
            EzPaycomIntegrationSetupDialog.ezApiName,
            EzPaycomIntegrationSetupDialog.ezEventNames.onIntegrationSetupDialogDataReady);

        return EzPaycomIntegrationSetupDialog.ezInstance;
    }

    /**
        @override
        @protected @method
        Initializes the dialog's data
        @returns {Promise.resolve}
     */
    ezInitData() {
        return ezApi.ezclocker.ezUi.ezPageWaitResolve(
            'Loading integration configuration ...',
            (resolve) => super.ezInitData()
                .then(resolve));
    }

    /**
        @override
        @protected @method
        Returns a new EzIntegrationSetupResponse instance for the integration
        @returns {object}
     */
    ezCreateNewIntegrationResponse() {
        return new EzPaycomIntegrationSetupResponse();
    }

    /**
        @protected @method
        Creates a new integration setup request entity for the integration.
        @param {boolean} enabled
        @returns {object}
     */
    ezCreateIntegrationSetupRequest(enabled) {
        return new EzPaycomIntegrationSetupRequest(enabled);
    }

    /**
        @override
        @protected @method
        Resets the dialog's state and data to the initial values.
     */
    ezResetDialog() {
        super.ezResetDialog();

        EzPaycomIntegrationSetupDialog.ezInstance.ezHideValidationError(
            null,
            EzIntegrationMappingViewType.PAY_RATE_MAPPING);

        EzPaycomIntegrationSetupDialog.ezInstance.ezHideValidationError(
            null,
            EzIntegrationMappingViewType.JOB_MAPPING);

        EzPaycomIntegrationSetupDialog.ezInstance.ezDuplicateEmployeeMapIdDetected = false;

        EzPaycomIntegrationSetupDialog.ezInstance.ezHideErrorMessage();
    }

    /**
        @override
        @protected @method
        Shows the dialog UX in the specified display mode
     */
    ezShowDialogInMode() {
        super.ezShowDialogInMode();
        EzPaycomIntegrationSetupDialog.ezInstance.triggerOnVisibleEvent();
    }

    /**
        @override
        @protected @method
        Initializes the tab help text for each tab.
     */
    ezBuildTabHelp() {
        EzPaycomIntegrationSetupDialog.ezInstance.ezTabHelp[EzIntegrationMappingViewType.EMPLOYEE_MAPPING] = {
            title: 'Employee Code Mapping',
            help: ezApi.ezMsg`
                EzClocker will only export data for mapped employees. Next to each ezClocker employee enter the corresponding Paycom employee export code.
                <p>
                The Paycom employee export code is normally one of the following:
                <ul>
                    <li> Paycom employee code (a maximum of 10 characters).
                    <li> Employee Social Security number (only digits, no dashes).
                    <li> Paycom clock sequence number.
                </ul>
                </p>`
        };

        EzPaycomIntegrationSetupDialog.ezInstance.ezTabHelp[EzIntegrationMappingViewType.PAY_RATE_MAPPING] = {
            title: 'Earning Code Mapping',
            help: ezApi.ezMsg`
                You must map ezClocker's Regular and Overtime pay rates to the corresponding Paycom Earning Code.
                Paycom Earing Codes are alphanumeric and have a maximum of three characters in length.`
        };
    }

    /**
        @override
        @protected @method
        Determines if the configuration data is valid and all required data is available.
        @param {object} integrationSetupRequest
        @returns {Boolean}
     */
    ezValidateConfiguration(integrationSetupRequest) {
        if (!ezApi.ezIsValid(integrationSetupRequest)) {
            throw new EzBadParamException(
                'integrationSetupRequest',
                EzPaycomIntegrationSetupDialog.ezInstance,
                EzPaycomIntegrationSetupDialog.ezInstance.ezValidateConfiguration);
        }

        let validationSuccess = !EzPaycomIntegrationSetupDialog.ezInstance.ezDuplicateEmployeeMapIdDetected;

        if (ezApi.ezIsTrue(validationSuccess)) {
            EzPaycomIntegrationSetupDialog.ezInstance.ezHideValidationError(
                null,
                EzIntegrationMappingViewType.PAY_RATE_MAPPING);
        }

        if (ezApi.ezIsFalse(integrationSetupRequest.ezHasEmployeeMappings())) {
            EzPaycomIntegrationSetupDialog.ezInstance.ezApplyErrorTab('EzPaycomIntegrationDialog_EmployeeMapping');
            EzPaycomIntegrationSetupDialog.ezInstance.ezShowValidationError(
                `To save your ${EzPaycomIntegrationSetupDialog.ezInstance.ezIntegrationName} integration configuration you map at least one employee`,
                null,
                EzIntegrationMappingViewType.EMPLOYEE_MAPPING);

            validationSuccess = false;
        }

        return validationSuccess;
    }

    /**
        @protected
        Handles the tab button clicks
        @param {Object} ezEvent
     */
    ezHandleTabClick(ezEvent) {
        if (!ezApi.ezIsValid(ezEvent) || !ezApi.ezIsValid(ezEvent.data.elementEvent)) {
            throw new EzBadParamException(
                'ezEvent',
                EzPaycomIntegrationSetupDialog.ezInstance.ezInstance,
                EzPaycomIntegrationSetupDialog.ezInstance.ezBuildJobMappingRow);
        }

        if ('false' === ezApi.ezclocker.ezUi.ezGetElementDataAttributeValue(ezEvent.data.elementEvent.target, 'active')) {
            // Activate only if not already active
            EzPaycomIntegrationSetupDialog.ezInstance.ezActivateTab(
                ezApi.ezclocker.ezUi.ezGetElementDataAttributeValue(
                    ezEvent.data.elementEvent.target,
                    'ezintegrationmappingviewtype'));
        }
    }

    /**
        @protected @method
        Triggers the dialog's OnClose event
     */
    ezTriggerOnCloseEvent() {
        ezApi.ezclocker.ezEventEngine.ezTriggerEvent(
            EzPaycomIntegrationSetupDialog.ezEventNames.onIntegrationSetupDialogClose,
            EzPaycomIntegrationSetupDialog.ezInstance);
    }

    /**
        @protected @method
        Triggers the dialog's onSubmitted event
        @param {object} response
     */
    ezTriggerOnSubmittedEvent(response) {
        if (!ezApi.ezIsValid(response)) {
            throw new EzBadParamException(
                'response',
                EzPaycomIntegrationSetupDialog.ezInstance,
                EzPaycomIntegrationSetupDialog.ezInstance.ezTriggerPaycomSetupDialogOnSubmitted);
        }

        ezApi.ezclocker.ezEventEngine.ezTriggerEvent(
            EzPaycomIntegrationSetupDialog.ezEventNames.onIntegrationSetupDialogSubmitted,
            response);
    }

    /**
        @protected @method
        Triggers the dialog's onError event
        @param {object} eResponse
     */
    ezTriggerOnErrorEvent(eResponse) {
        if (!ezApi.ezIsValid(eResponse)) {
            throw new EzBadParamException(
                'eResponse',
                EzPaycomIntegrationSetupDialog.ezInstance,
                EzPaycomIntegrationSetupDialog.ezInstance.ezTriggerPaycomSetupDialogOnSubmitted);
        }

        ezApi.ezclocker.ezEventEngine.ezTriggerEvent(
            EzPaycomIntegrationSetupDialog.ezEventNames.onIntegrationSetupDialogError,
            eResponse);
    }

    /**
        @protected @method
        Triggers the dialog's onVisible event.
     */
    triggerOnVisibleEvent() {
        ezApi.ezclocker.ezEventEngine.ezTriggerEvent(
            EzPaycomIntegrationSetupDialog.ezEventNames.onIntegrationSetupDialogVisible,
            EzPaycomIntegrationSetupDialog.ezInstance);
    }
}
