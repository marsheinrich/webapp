import { EzBadParamException } from '/ezlibrary/exceptions/EzBadParamException.js';

import { EzRegistrationState } from '/ezlibrary/enums/EzRegistrationState.js';

import { EzElementEventName } from '/ezlibrary/EzElementEventName.js';

import { EzEventEngine } from '/ezlibrary/ez-event-engine.js';

import { EzIntegrationProviderId } from '/secure/integrations/ez-integration-enums.js';
import { EzClockerPayRateType } from '/secure/integrations/EzClockerPayRateType.js';
import { EzIntegrationSetupDialogDisplayMode } from '/secure/integrations/EzIntegrationSetupDialogDisplayMode.js';

import { EzEmployeeIntegrationMapRequest } from '/secure/integrations/entities/EzEmployeeIntegrationMapRequest.js';
import { PayRateIntegrationMapRequest } from '/secure/integrations/entities/PayRateIntegrationMapRequest.js';
import { DataTagIntegrationMapRequest } from '/secure/integrations/entities/DataTagIntegrationMapRequest.js';

import { EzUI } from '/public/javascript/common/ezui.js';
import { EzDialog } from '/public/javascript/common/ezclocker-dialog-helper.js';

import { EzIntegrationMappingViewType } from '/secure/integrations/EzIntegrationSetupDialog/EzIntegrationMappingViewType.js';
import { EzIntegrationSetupDialog } from '/secure/integrations/EzIntegrationSetupDialog/EzIntegrationSetupDialog.js';

import { EzGustoCSVHeaderFieldName } from '/secure/integrations/gusto-csv/EzGustoCSVHeaderFieldName.js';
import { EzGustoCSVIntegrationSetupResponse } from '/secure/integrations/gusto-csv/EzGustoCSVIntegrationSetupResponse.js';
import { EzGustoCSVIntegrationSetupRequest } from '/secure/integrations/gusto-csv/EzGustoCSVIntegrationSetupRequest.js';
import { EzGustoCSVIntegrationSetupController } from '/secure/integrations/gusto-csv/EzGustoCSVIntegrationSetupController.js';

/**
    @public
    View for the copy schedule forward feature on the ezClocker website for employers.
 */
export class EzGustoCSVIntegrationSetupDialog extends EzIntegrationSetupDialog {
    /**
        @public @static @field
        @type {EzClockerContext}
     */
    static #ezInstance = Object.prototype.hasOwnProperty.call(globalThis, 'ezApi') &&
        globalThis.ezApi &&
        Object.prototype.hasOwnProperty.call(globalThis.ezApi, 'ezclocker') &&
        globalThis.ezApi.ezclocker &&
        Object.prototype.hasOwnProperty.call(globalThis.ezApi.ezclocker, EzGustoCSVIntegrationSetupDialog.ezApiName) &&
        globalThis.ezApi.ezclocker[EzGustoCSVIntegrationSetupDialog.ezApiName]
        ? globalThis.ezApi.ezclocker[EzGustoCSVIntegrationSetupDialog.ezApiName]
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
        Object.prototype.hasOwnProperty.call(globalThis.ezApi.ezclocker, EzGustoCSVIntegrationSetupDialog.ezApiName) &&
        globalThis.ezApi.ezclocker[EzGustoCSVIntegrationSetupDialog.ezApiName]
        ? EzRegistrationState.REGISTERED
        : null;

    /**
        @public @static @readonly @property
        Returns the name of the singleton instance of this class stored in ezApi.
        @returns {string}
     */
    static get ezApiName() {
        return 'ezGustoCSVIntegrationSetupDialog';
    }

    /**
        @public @static @readonly @property
        Returns an object of property = event name for events triggered by this class.
        @returns {string}
     */
    static get ezEventNames() {
        return {
            onReady: 'ezOn_EzGustoCSVIntegrationSetupDialog_Ready',
            onIntegrationSetupDialogVisible: 'ezOn_EzGustoCSVIntegrationSetupDialog_Visible',
            onIntegrationSetupDialogClose: 'ezOn_EzGustoCSVIntegrationSetupDialog_Closed',
            onIntegrationSetupDialogSubmitted: 'ezOn_EzGustoCSVIntegrationSetupDialog_Submitted',
            onIntegrationSetupDialogError: 'ezOn_EzGustoCSVIntegrationSetupDialog_Error',
            onIntegrationSetupDialogDataReady: 'ezOn_EzGustoCSVIntegrationSetupDialog_DataReady'
        };
    }

    /**
        @public @static @property @getter
        Returns the ezApi registration state of this classes's singleton instance.
        @returns {string}
        A valid enum property value from EzRegistrationState
     */
    static get ezApiRegistrationState() {
        return EzGustoCSVIntegrationSetupDialog.#ezApiRegistrationState;
    }

    /**
        @public @static @property @setter
        Sets the ezApi registration state of this classes's singleton instance.
        @param {string} ezApiRegistrationState
        A valid enum property value from EzRegistrationState
     */
    static set ezApiRegistrationState(ezApiRegistrationState) {
        EzGustoCSVIntegrationSetupDialog.#ezApiRegistrationState = EzRegistrationState.ezValueOf(ezApiRegistrationState);
    }

    /**
        @public @static @getter @property
        Returns the singleton instance of EzDateTime registered with EzApi (if available yet)
        @param {EzClockerContext}
     */
    static get ezInstance() {
        return EzGustoCSVIntegrationSetupDialog.#ezInstance;
    }

    /**
        @public @static @getter @property
        Returns the singleton instance of EzDateTime registered with EzApi (if available yet)
     */
    static set ezInstance(ezwEmployerExportTimeSheetDialog) {
        if (null != EzGustoCSVIntegrationSetupDialog.#ezInstance) {
            throw new Error('EzPaycomIntegrationSetupDialog\'s singleton instance is already reigstered with EzApi.');
        }

        EzGustoCSVIntegrationSetupDialog.#ezInstance = ezwEmployerExportTimeSheetDialog;
    }

    /**
        @public @static @readonly @property
        Returns if the single instance of this class has all it's dependent ezApi references ready and can now register with ezApi.
        @returns {boolean}
     */
    static get ezCanRegister() {
        return 'PENDING' === EzGustoCSVIntegrationSetupDialog.ezApiRegistrationState &&
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
        return null != EzGustoCSVIntegrationSetupDialog.ezInstance &&
            EzRegistrationState.REGISTERED === EzGustoCSVIntegrationSetupDialog.ezApiRegistrationState;
    }

    /**
       @private @static @method
       Registers the singleton instance of this class with ezApi. Returns true if registered, false if unable to register.
       @returns {boolean}
    */
    static #ezRegistrator() {
        if (EzGustoCSVIntegrationSetupDialog.ezCanRegister && !EzGustoCSVIntegrationSetupDialog.#ezIsRegistered) {
            globalThis.ezApi.ezRegisterNewApi(EzGustoCSVIntegrationSetupDialog, EzGustoCSVIntegrationSetupDialog.ezApiName);
        }

        return EzRegistrationState.REGISTERED === EzGustoCSVIntegrationSetupDialog.ezApiRegistrationState;
    }

    /**
        @static
        Static initializer
     */
    static {
        if (!EzGustoCSVIntegrationSetupDialog.#ezIsRegistered) {
            EzGustoCSVIntegrationSetupDialog.ezApiRegistrationState = EzRegistrationState.PENDING;

            if (!EzGustoCSVIntegrationSetupDialog.#ezRegistrator()) {
                document.addEventListener(
                    'onEzApiReady',
                    () => {
                        if (!EzGustoCSVIntegrationSetupDialog.#ezRegistrator()) {
                            document.addEventListener(
                                EzEventEngine.ezEventNames.onReady,
                                EzGustoCSVIntegrationSetupDialog.#ezRegistrator);

                            document.addEventListener(
                                EzUI.ezEventNames.onReady,
                                EzGustoCSVIntegrationSetupDialog.#ezRegistrator);

                            document.addEventListener(
                                EzDialog.ezEventNames.onReady,
                                EzGustoCSVIntegrationSetupDialog.#ezRegistrator);
                        }
                    });
            }
        }
    }

    constructor() {
        super(
            // ezIntegrationProviderId
            EzIntegrationProviderId.GUSTO,
            // controllerRef
            new EzGustoCSVIntegrationSetupController());

        this.ezDialogId = 'EzGustoCSVIntegrationSetupDialog';

        this.ezSupportedMappings = [
            EzIntegrationMappingViewType.EMPLOYEE_MAPPING,
        ];

        this.ezSupportedEzClockerPayRateTypes = [];

        this.ezUnsupportedEzClockerPayRateTypes = [
            EzClockerPayRateType.UNKNOWN,
            EzClockerPayRateType.REGULAR,
            EzClockerPayRateType.OVERTIME,
            EzClockerPayRateType.PTO,
            EzClockerPayRateType.HOLIDAY,
            EzClockerPayRateType.SICK,
            EzClockerPayRateType.UNPAID
        ];

        // Tab button ids
        this.ezTabIds[EzIntegrationMappingViewType.EMPLOYEE_MAPPING] = ezApi.ezIdTemplate`
            ${this.ezDialogId}_
            ${EzIntegrationMappingViewType.ezToIdSuffix(EzIntegrationMappingViewType.EMPLOYEE_MAPPING)}_Button`;

        // Dialog tab view ids
        this.ezViewIds[EzIntegrationMappingViewType.EMPLOYEE_MAPPING] = ezApi.ezIdTemplate`
            ${this.ezDialogId}_
            ${EzIntegrationMappingViewType.ezToIdSuffix(EzIntegrationMappingViewType.EMPLOYEE_MAPPING)}_TabView`;

        // Setup the initial tab data
        this.ezTabs[EzIntegrationMappingViewType.EMPLOYEE_MAPPING] = {
            id: this.ezTabIds[EzIntegrationMappingViewType.EMPLOYEE_MAPPING],
            tabViewId: this.ezViewIds[EzIntegrationMappingViewType.EMPLOYEE_MAPPING],
            caption: EzIntegrationMappingViewType.ezToDisplayValue(EzIntegrationMappingViewType.EMPLOYEE_MAPPING),
            tabGroup: this.ezTabGroupName,
            visible: true,
            active: false,
            ezView: ezApi.ezTemplate`
                <div id="${this.ezViewIds[EzIntegrationMappingViewType.EMPLOYEE_MAPPING]}"
                    data-tabgroup="${this.ezTabGroupName}" class="ez-tab-view-container" style="display:none">
                </div>`
        };
    }

    /**
        @override
        @public @readonly @property
        @returns {string}
     */
    get ezIntegrationEmployeeMapFieldDisplayName() {
        return `${this.ezIntegrationName} Employee`;
    }

    /**
        @override
        @public @readonly @property
        @returns {string}
     */
    get ezIntegrationPayRateMapFieldDisplayName() {
        return `${this.ezIntegrationName} Pay rate mapping not supported`;
    }

    /**
        @public @readonly @property
        @returns {string}
     */
    get ezIntegrationEmployeeMapFieldFirstName() {
        return 'Gusto Employee First Name';
    }

    /**
        @public @readonly @property
        @returns {string}
     */
    get ezIntegrationEmployeeMapFieldLastName() {
        return 'Gusto Employee Last Name';
    }

    /**
        @override
        @public @readonly @property
        @returns {string}
     */
    get ezIntegrationJobMapFieldDisplayName() {
        return `${this.ezIntegrationName} Job mapping not supported`;
    }

    /**
     * @protected
     * Initializes EzGustoCSVIntegrationSetupDialog
     */
    ezInit() {
        super.ezInit();
        ezApi.ezclocker.ezEventEngine.ezRegisterEvent(
            EzGustoCSVIntegrationSetupDialog.ezApiName,
            EzGustoCSVIntegrationSetupDialog.ezEventNames.onIntegrationSetupDialogVisible);

        ezApi.ezclocker.ezEventEngine.ezRegisterEvent(
            EzGustoCSVIntegrationSetupDialog.ezApiName,
            EzGustoCSVIntegrationSetupDialog.ezEventNames.onIntegrationSetupDialogClose);

        ezApi.ezclocker.ezEventEngine.ezRegisterEvent(
            EzGustoCSVIntegrationSetupDialog.ezApiName,
            EzGustoCSVIntegrationSetupDialog.ezEventNames.onIntegrationSetupDialogSubmitted);

        ezApi.ezclocker.ezEventEngine.ezRegisterEvent(
            EzGustoCSVIntegrationSetupDialog.ezApiName,
            EzGustoCSVIntegrationSetupDialog.ezEventNames.onIntegrationSetupDialogError);

        ezApi.ezclocker.ezEventEngine.ezRegisterEvent(
            EzGustoCSVIntegrationSetupDialog.ezApiName,
            EzGustoCSVIntegrationSetupDialog.ezEventNames.onIntegrationSetupDialogDataReady);

        return EzGustoCSVIntegrationSetupDialog.ezInstance;
    }

    /**
        @override
        @protected @method
        Initializes the ezUxIds property for the class instance
     */
    ezInitUxIds() {
        super.ezInitUxIds();

        EzGustoCSVIntegrationSetupDialog.ezInstance.ezUxIds.elementIds.ezErrorMessageContainerId =
            ezApi.ezIdTemplate`${EzGustoCSVIntegrationSetupDialog.ezInstance.ezDialogId}_ValidationErrorContainer`;

        EzGustoCSVIntegrationSetupDialog.ezInstance.ezUxIds.elementIds.ezErrorMessageId =
            `${EzGustoCSVIntegrationSetupDialog.ezInstance.ezDialogId}_EzValidationErrorMessage`;
    }

    /**
        @override
        @protected @method
        Initializes the EzGustoCSVIntegrationSetupDialog UX
     */
    ezInitUX() {
        super.ezInitUX();

        EzGustoCSVIntegrationSetupDialog.ezInstance.ezBuildTabViews();

        ezApi.ezclocker.ezUi.ezPrependContent(
            EzGustoCSVIntegrationSetupDialog.ezInstance.ezUxIds.parentIds.ezContentParentId,
            EzGustoCSVIntegrationSetupDialog.ezInstance.ezBuildFullscreenHtml());

        ezApi.ezclocker.ezEventEngine.ezWantElementEvent(
            EzGustoCSVIntegrationSetupDialog.ezInstance.ezUxIds.parentIds.ezFullScreenOkButtonId,
            EzElementEventName.CLICK,
            EzGustoCSVIntegrationSetupDialog.ezApiName,
            EzGustoCSVIntegrationSetupDialog.ezInstance.ezSubmit);

        ezApi.ezclocker.ezUi.ezAppendContent(
            EzGustoCSVIntegrationSetupDialog.ezInstance.ezUxIds.parentIds.ezDialogParentContainerId,
            EzGustoCSVIntegrationSetupDialog.ezInstance.ezBuildDialogHtml());

        EzGustoCSVIntegrationSetupDialog.ezInstance.ezInitDialog();

        EzGustoCSVIntegrationSetupDialog.ezInstance.ezSupportedMappings.forEach(
            (ezIntegrationMappingViewType) => ezApi.ezclocker.ezEventEngine.ezWantElementEvent(
                EzGustoCSVIntegrationSetupDialog.ezInstance.ezTabIds[ezIntegrationMappingViewType],
                EzElementEventName.CLICK,
                EzGustoCSVIntegrationSetupDialog.ezApiName,
                EzGustoCSVIntegrationSetupDialog.ezInstance.ezHandleTabClick));
    }

    /**
        @override
        @protected @method
        Initializes the dialog's data
    */
    ezInitData() {
        super.ezInitData()
            .then(
                () => ezApi.ezclocker.ezEventEngine.ezTriggerEvent(
                    EzGustoCSVIntegrationSetupDialog.ezEventNames.onIntegrationSetupDialogDataReady,
                    EzGustoCSVIntegrationSetupDialog.ezApiName));
    }

    /**
       @protected
       Resets the dialog's state and data to the initial values.
    */
    ezResetDialog() {
        EzGustoCSVIntegrationSetupDialog.ezInstance.ezJobCodesById = {};
        EzGustoCSVIntegrationSetupDialog.ezInstance.ezJobCodes = [];
        EzGustoCSVIntegrationSetupDialog.ezInstance.ezIntegrationResponse = null;
        EzGustoCSVIntegrationSetupDialog.ezInstance.ezIntegrationSetupDialogDisplayMode = EzIntegrationSetupDialogDisplayMode.DIALOG;

        ezApi.ezclocker.ezUi.ezHideElement(EzGustoCSVIntegrationSetupDialog.ezInstance.ezUxIds.elementIds.ezErrorMessageContainerId);
        ezApi.ezclocker.ezUi.ezContent(EzGustoCSVIntegrationSetupDialog.ezInstance.ezUxIds.elementIds.ezErrorMessageId, '');
    }

    /**
        @override
        @public @method
        Shows the view to the user
        @param {EzIntegrationSetupDialogDisplayMode} ezIntegrationSetupDialogDisplayMode
     */
    ezShow(ezIntegrationSetupDialogDisplayMode, closeCallback) {
        super.ezShow(ezIntegrationSetupDialogDisplayMode, closeCallback);

        ezApi.ezclocker.ezUi.ezPageWaitExecute(
            `Loading ${EzGustoCSVIntegrationSetupDialog.ezInstance.ezIntegrationName} configuration ...`,
            (waitDone) => {
                ezApi.ezclocker.ezEventEngine.ezWantEvent(
                    EzGustoCSVIntegrationSetupDialog.ezEventNames.onIntegrationSetupDialogDataReady,
                    EzGustoCSVIntegrationSetupDialog.ezApiName, () => {
                        EzGustoCSVIntegrationSetupDialog.ezInstance.ezUpdateDialogHeaderValues();

                        EzGustoCSVIntegrationSetupDialog.ezInstance.ezBuildSupportedMappingViews();

                        EzGustoCSVIntegrationSetupDialog.ezInstance.ezShowDialogInMode();

                        return waitDone().then(ezApi.ezIgnoreResolve);
                    });

                EzGustoCSVIntegrationSetupDialog.ezInstance.ezInitData();
            });
    }

    /**
        @protected @method
        Shows the dialog UX in the specified display mode
     */
    ezShowDialogInMode() {
        if ('FULL_SCREEN' === EzGustoCSVIntegrationSetupDialog.ezInstance.ezIntegrationSetupDialogDisplayMode) {
            let dialogElement = ezApi.ezclocker.ezUi.ezFindByElementOrId(EzGustoCSVIntegrationSetupDialog.ezInstance.ezDialogId);
            if (EzGustoCSVIntegrationSetupDialog.ezInstance.ezFullScreenParentId !== dialogElement.parentElement.id) {
                ezApi.ezclocker.ezUi.ezReparentElement(
                    ezApi.ezIdTemplate`${EzGustoCSVIntegrationSetupDialog.ezInstance.ezDialogId}_DialogContent`,
                    EzGustoCSVIntegrationSetupDialog.ezInstance.ezFullScreenContentId);
            }

            EzGustoCSVIntegrationSetupDialog.ezInstance.ezActivateTab(EzIntegrationMappingViewType.EMPLOYEE_MAPPING);

            ezApi.ezclocker.ezUi.ezHideElementAnimated(
                EzGustoCSVIntegrationSetupDialog.ezInstance.ezContentId,
                'slideOutLeft')
                .then(
                    () => ezApi.ezclocker.ezUi.ezShowElementAnimated(
                        EzGustoCSVIntegrationSetupDialog.ezInstance.ezFullScreenParentId,
                        'slideInRight',
                        'grid'))
                .then(
                    () => {
                        ezApi.ezclocker.ezEventEngine.ezTriggerEvent(
                            EzGustoCSVIntegrationSetupDialog.ezEventNames.onIntegrationSetupDialogVisible,
                            EzGustoCSVIntegrationSetupDialog.ezInstance);
                    });
        } else {
            let dialogElement = ezApi.ezclocker.ezUi.ezFindByElementOrId(EzGustoCSVIntegrationSetupDialog.ezInstance.ezDialogId);
            if (EzGustoCSVIntegrationSetupDialog.ezInstance.ezDialogId !== dialogElement.parentElement.id) {
                ezApi.ezclocker.ezUi.ezReparentElement(
                    ezApi.ezIdTemplate`${EzGustoCSVIntegrationSetupDialog.ezInstance.ezDialogId}_DialogContent`,
                    EzGustoCSVIntegrationSetupDialog.ezInstance.ezDialogId);
            }

            ezApi.ezclocker.ezDialog.ezShowDialog(EzGustoCSVIntegrationSetupDialog.ezInstance.ezDialogId).then(
                () => {
                    EzGustoCSVIntegrationSetupDialog.ezInstance.ezActivateTab(EzIntegrationMappingViewType.EMPLOYEE_MAPPING);

                    ezApi.ezclocker.ezEventEngine.ezTriggerEvent(
                        EzGustoCSVIntegrationSetupDialog.ezEventNames.onIntegrationSetupDialogVisible,
                        EzGustoCSVIntegrationSetupDialog.ezInstance);
                });
        }
    }

    /**
        @override
        @public @method
        Closes the visible view
     */
    ezClose() {
        super.ezClose();
        if ('FULL_SCREEN' === EzGustoCSVIntegrationSetupDialog.ezInstance.ezIntegrationSetupDialogDisplayMode) {
            ezApi.ezclocker.ezUi.ezHideElementAnimated(
                EzGustoCSVIntegrationSetupDialog.ezInstance.ezFullScreenParentId,
                'slideOutRight')
                .then(() => ezApi.ezclocker.ezUi.ezShowElementAnimated(
                    EzGustoCSVIntegrationSetupDialog.ezInstance.ezContentId,
                    'slideInLeft'));
        } else {
            ezApi.ezclocker.ezDialog.ezCloseDialog(EzGustoCSVIntegrationSetupDialog.ezInstance.ezDialogId);
        }

        ezApi.ezclocker.ezEventEngine.ezTriggerEvent(
            EzGustoCSVIntegrationSetupDialog.ezEventNames.onIntegrationSetupDialogClose,
            EzGustoCSVIntegrationSetupDialog.ezInstance);

        if (ezApi.ezIsFunction(EzGustoCSVIntegrationSetupDialog.ezInstance.ezCloseCallback)) {
            EzGustoCSVIntegrationSetupDialog.ezInstance.ezCloseCallback();
        }

        EzGustoCSVIntegrationSetupDialog.ezInstance.ezResetDialog();
        ezApi.ezclocker.nav.ezNavigateToEmployerIntegrationsPage()
    }

    /**
        @protected @method
        Determines if the configuration data is valid and all required data is available.
        @param {EzGustoCSVIntegrationSetupRequest} ezGustoIntegrationSetupRequest
        @returns {Boolean}
     */
    ezValidateConfiguration(ezGustoIntegrationSetupRequest) {
        if (!ezApi.ezIsValid(ezGustoIntegrationSetupRequest)) {
            throw new EzBadParamException(
                'ezGustoIntegrationSetupRequest',
                EzGustoCSVIntegrationSetupDialog.ezInstance,
                EzGustoCSVIntegrationSetupDialog.ezInstance.ezValidateConfiguration);
        }

        let validationSuccess = !EzGustoCSVIntegrationSetupDialog.ezInstance.ezDuplicateEmployeeMapIdDetected;
        if (ezApi.ezIsTrue(validationSuccess)) {
            EzGustoCSVIntegrationSetupDialog.ezInstance.ezHideValidationError(
                EzGustoCSVIntegrationSetupDialog.ezInstance.ezHeaderInputIds.ezPayChexClientIdInputId,
                EzIntegrationMappingViewType.EMPLOYEE_MAPPING);
            EzGustoCSVIntegrationSetupDialog.ezInstance.ezHideValidationError(
                null,
                EzIntegrationMappingViewType.PAY_RATE_MAPPING);
            EzGustoCSVIntegrationSetupDialog.ezInstance.ezHideValidationError(
                null,
                EzIntegrationMappingViewType.JOB_MAPPING);
        }

        if (!ezGustoIntegrationSetupRequest.ezHasEmployeeMappings()) {
            EzGustoCSVIntegrationSetupDialog.ezInstance.ezShowValidationError('You must map at least one employee.');
            validationSuccess = false;
        }

        return validationSuccess;
    }

    /**
        @override
        @public @method
        Closes the visible view
     */
    ezSubmit() {
        let integrationSetupRequest = new EzGustoCSVIntegrationSetupRequest(
            ezApi.ezclocker.ezUi.ezIsCheckBoxChecked(EzGustoCSVIntegrationSetupDialog.ezInstance.ezHeaderInputIds.ezIntegrationEnableInputId));

        EzGustoCSVIntegrationSetupDialog.ezInstance.ezApplySupportedMappingsToRequest(integrationSetupRequest);

        if (ezApi.ezIsFalse(EzGustoCSVIntegrationSetupDialog.ezInstance.ezValidateConfiguration(integrationSetupRequest))) {
            return;
        }

        ezApi.ezclocker.ezUi.ezPageWaitExecute(
            `Saving ${EzGustoCSVIntegrationSetupDialog.ezInstance.ezIntegrationName} integration configuration ...`,
            (waitDone) => EzGustoCSVIntegrationSetupDialog.ezInstance.ezController.ezSaveIntegrationSetup(
                EzGustoCSVIntegrationSetupDialog.ezInstance.ezIntegrationProviderId,
                integrationSetupRequest)
                .then(
                    (response) => {
                        waitDone();
                        ezApi.ezclocker.ezEventEngine.ezTriggerEvent(
                            EzGustoCSVIntegrationSetupDialog.ezEventNames.onIntegrationSetupDialogSubmitted,
                            response);

                        if (ezApi.ezIsTrue(integrationSetupRequest.ezEnableIntegration)) {
                            ezApi.ezclocker.ezDialog.ezShowMessage(
                                EzGustoCSVIntegrationSetupDialog.ezInstance.ezDialogTitle,
                                `You have successfully setup your ${EzGustoCSVIntegrationSetupDialog.ezInstance.ezIntegrationName} integration!`)
                                .then(EzGustoCSVIntegrationSetupDialog.ezInstance.ezClose);
                        } else {
                            EzGustoCSVIntegrationSetupDialog.ezInstance.ezClose();
                        }
                    },
                    (eResponse, jqXHR) => {
                        ezApi.ezclocker.logger.error(ezApi.ezEM`
                            Failed ${EzGustoCSVIntegrationSetupDialog.ezInstance.ezIntegrationName} Integration. Error: ${ezApi.ezToJson(eResponse)}`);
                        waitDone();

                        ezApi.ezclocker.ezDialog.ezShowPossibleDefectError(
                            ezApi.ezEM`${EzGustoCSVIntegrationSetupDialog.ezInstance.ezIntegrationName} Integration Setup Error`,
                            'Unable to save your Gusto integration configuration at this time.',
                            jqXHR,
                            eResponse,
                            {
                                url: ezApi.ezclocker.nav.ezGetInternalApiUrl(
                                    ezApi.ezUrlTemplate`integrations/${EzIntegrationProviderId.GUSTO}/Gusto`),
                                payload: ezApi.ezToJson(integrationSetupRequest)
                            });

                        ezApi.ezclocker.ezEventEngine.ezTriggerEvent(
                            EzGustoCSVIntegrationSetupDialog.ezEventNames.onIntegrationSetupDialogError,
                            eResponse);
                    }));
    }

    /**
        @protected @method
        Updates the dialog's header inputs with data from the saved configuration (if any)
     */
    ezUpdateDialogHeaderValues() {
        if (ezApi.ezIsNotValid(EzGustoCSVIntegrationSetupDialog.ezInstance.ezIntegrationResponse)) {
            ezApi.ezclocker.ezUi.ezSetCheckboxValue(EzGustoCSVIntegrationSetupDialog.ezInstance.ezHeaderInputIds.ezIntegrationEnableInputId, false);
            return;
        }

        ezApi.ezclocker.ezUi.ezSetCheckboxValue(
            EzGustoCSVIntegrationSetupDialog.ezInstance.ezHeaderInputIds.ezIntegrationEnableInputId,
            ezApi.ezIsTrue(EzGustoCSVIntegrationSetupDialog.ezInstance.ezIntegrationResponse.ezEnableIntegration));
    }

    /**
        @protected @method
        Applies all the supported mappings to the setup request.
        @param {EzGustoCSVIntegrationSetupRequest} integrationSetupRequest
     */
    ezApplySupportedMappingsToRequest(integrationSetupRequest) {
        EzGustoCSVIntegrationSetupDialog.ezInstance.ezSupportedMappings.forEach((ezIntegrationMappingViewType) => {
            switch (ezIntegrationMappingViewType) {
                case EzIntegrationMappingViewType.EMPLOYEE_MAPPING:
                    EzGustoCSVIntegrationSetupDialog.ezInstance.ezApplyEmployeeMappings(integrationSetupRequest);
                    break;
                case EzIntegrationMappingViewType.JOB_MAPPING:
                    EzGustoCSVIntegrationSetupDialog.ezInstance.ezApplyJobMappings(integrationSetupRequest);
                    break;
                case EzIntegrationMappingViewType.PAY_RATE_MAPPING:
                    EzGustoCSVIntegrationSetupDialog.ezInstance.ezApplyPayTypeMappings(integrationSetupRequest);
                    break;
                default:
                    ezApi.ezclocker.logger.error(
                        ezApi.ezEM`
                            Integration mapping id ${ezIntegrationMappingViewType} is not currently supported in
                            ${EzGustoCSVIntegrationSetupDialog.ezInstance.ezIntegrationName}`);
            }
        });
    }

    /**
        @protected @method
        Adds the employee mappings to the provided integrationSetupRequest
        @param {EzGustoCSVIntegrationSetupRequest} integrationSetupRequest
    */
    ezApplyEmployeeMappings(integrationSetupRequest) {
        if (!ezApi.ezIsValid(integrationSetupRequest)) {
            throw new EzBadParamException(
                'integrationSetupRequest',
                EzGustoCSVIntegrationSetupDialog.ezInstance,
                EzGustoCSVIntegrationSetupDialog.ezInstance.ezApplyEmployeeMappings);
        }

        let employees = ezApi.ezclocker.ezClockerContext.ezGetSelectedEmployerAccountEmployeeAccounts();
        if (!ezApi.ezArrayHasLength(employees)) {
            // No employees to map
            return;
        }

        let mapIds = [];
        EzGustoCSVIntegrationSetupDialog.ezInstance.ezDuplicateEmployeeMapIdDetected = false;

        employees.forEach(
            (employee) => {
                let employeeIdStr = employee.id.toString();
                let firstNameInputId = `${EzGustoCSVIntegrationSetupDialog.ezInstance.ezDialogId}_IntegrationMappingFirstNameInput_${employeeIdStr}`;
                let lastNameInputId = `${EzGustoCSVIntegrationSetupDialog.ezInstance.ezDialogId}_IntegrationMappingLastNameInput_${employeeIdStr}`;

                if (ezApi.ezElementExists(firstNameInputId) && ezApi.ezElementExists(lastNameInputId)) {
                    let providerEmployeeName =
                        `${ezApi.ezclocker.ezUi.ezGetInputValue(firstNameInputId)} ${ezApi.ezclocker.ezUi.ezGetInputValue(lastNameInputId)}`;

                    ezApi.ezclocker.ezUi.ezRemoveElementClass(firstNameInputId, 'ez-input-validation-error');
                    ezApi.ezclocker.ezUi.ezRemoveElementClass(lastNameInputId, 'ez-input-validation-error');

                    if (ezApi.ezStringHasLength(providerEmployeeName)) {
                        if (0 <= mapIds.indexOf(providerEmployeeName.toLowerCase())) {
                            EzGustoCSVIntegrationSetupDialog.ezInstance.ezDuplicateEmployeeMapIdDetected = true;
                            EzGustoCSVIntegrationSetupDialog.ezInstance.ezShowValidationError(
                                ezApi.ezEM`
                                    One or more duplicate ${EzGustoCSVIntegrationSetupDialog.ezInstance.ezIntegrationEmployeeMapFieldDisplayName}s detected.
                                    All employee maps must have unique ${EzGustoCSVIntegrationSetupDialog.ezInstance.ezIntegrationEmployeeMapFieldDisplayName}s`,
                                firstNameInputId,
                                EzIntegrationMappingViewType.EMPLOYEE_MAPPING);
                            EzGustoCSVIntegrationSetupDialog.ezInstance.ezShowValidationError(
                                null,
                                lastNameInputId,
                                null);
                        } else {
                            mapIds.push(providerEmployeeName.toLowerCase());
                        }

                        let ezEmployeeIntegrationMapRequest = EzGustoCSVIntegrationSetupDialog.ezInstance.ezGetCurrentMapInstance(firstNameInputId);

                        if (ezApi.ezIsNotValid(ezEmployeeIntegrationMapRequest)) {
                            ezEmployeeIntegrationMapRequest = new EzEmployeeIntegrationMapRequest();
                        }

                        ezEmployeeIntegrationMapRequest.ezEmployerId = employee.employerId;
                        ezEmployeeIntegrationMapRequest.ezEmployeeId = employee.id;
                        ezEmployeeIntegrationMapRequest.ezEmployerIntegrationMapId = '';
                        ezEmployeeIntegrationMapRequest.ezIntegrationProviderId =
                            EzIntegrationProviderId.GUSTO;
                        ezEmployeeIntegrationMapRequest.mappedByUserId =
                            ezApi.ezclocker.ezClockerContext.ezGetUserContext().userAccount.id;

                        ezEmployeeIntegrationMapRequest.providerConnectionId =
                            ezApi.ezclocker.ezUi.ezGetInputValue(firstNameInputId);
                        ezEmployeeIntegrationMapRequest.providerEmployeeId =
                            ezApi.ezclocker.ezUi.ezGetInputValue(firstNameInputId);
                        ezEmployeeIntegrationMapRequest.providerEmployeeName = providerEmployeeName;
                        ezEmployeeIntegrationMapRequest.integrationEmployeeFirstName =
                            ezApi.ezclocker.ezUi.ezGetInputValue(firstNameInputId);
                        ezEmployeeIntegrationMapRequest.integrationEmployeeLastName =
                            ezApi.ezclocker.ezUi.ezGetInputValue(lastNameInputId);

                        integrationSetupRequest.ezAddEzEmployeeIntegrationMapRequest(ezEmployeeIntegrationMapRequest);
                    }
                }
            });
    }

    /**
        @protected @method
        Adds the pay type mappings to the provided integrationSetupRequest
        @param {EzGustoCSVIntegrationSetupRequest} integrationSetupRequest
     */
    ezApplyPayTypeMappings(integrationSetupRequest) {
        if (!ezApi.ezIsValid(integrationSetupRequest)) {
            throw new EzBadParamException(
                'integrationSetupRequest',
                EzGustoCSVIntegrationSetupDialog.ezInstance,
                EzGustoCSVIntegrationSetupDialog.ezInstance.ezApplyEmployeeMappings);
        }

        EzGustoCSVIntegrationSetupDialog.ezInstance.ezSupportedEzClockerPayRateTypes.forEach(
            (ezClockerPayRateType) => {
                let inputId = `${EzGustoCSVIntegrationSetupDialog.ezInstance.ezDialogId}_PayRateMappingInput_${ezClockerPayRateType}`;
                if (ezApi.ezclocker.ezUi.ezElementExists(inputId)) {
                    let ezIntegrationPayRateType = ezApi.ezclocker.ezUi.ezGetInputValue(inputId).trim();

                    if (ezApi.ezStringHasLength(ezIntegrationPayRateType)) {
                        let payRateIntegrationMapRequest = EzGustoCSVIntegrationSetupDialog.ezInstance.ezGetCurrentMapInstance(inputId);
                        if (ezApi.ezIsNotValid(payRateIntegrationMapRequest)) {
                            payRateIntegrationMapRequest = new PayRateIntegrationMapRequest();
                        }

                        payRateIntegrationMapRequest.ezEmployerId =
                            ezApi.ezclocker.ezClockerContext.ezGetSelectedEmployerAccount().id;
                        payRateIntegrationMapRequest.ezUserId =
                            ezApi.ezclocker.ezClockerContext.ezGetUserContext().userAccount.id;
                        payRateIntegrationMapRequest.ezClockerPayRateType = ezClockerPayRateType;
                        payRateIntegrationMapRequest.ezContextId = '';
                        payRateIntegrationMapRequest.ezIntegrationPayRateCode = ezIntegrationPayRateType;
                        payRateIntegrationMapRequest.integrationHourlyType = '';

                        integrationSetupRequest.ezAddPayRateIntegrationMapRequest(payRateIntegrationMapRequest);
                    }
                }
            });
    }

    /**
        @protected @method
        Adds the job mappings to the provided integrationSetupRequest
        @param {EzGustoCSVIntegrationSetupRequest} integrationSetupRequest
     */
    ezApplyJobMappings(integrationSetupRequest) {
        if (!ezApi.ezIsValid(integrationSetupRequest)) {
            throw new EzBadParamException(
                'integrationSetupRequest',
                EzGustoCSVIntegrationSetupDialog.ezInstance,
                EzGustoCSVIntegrationSetupDialog.ezInstance.ezApplyJobMappings);
        }

        for (let prop in EzGustoCSVIntegrationSetupDialog.ezInstance.ezJobCodesById) {
            let jobCode = EzGustoCSVIntegrationSetupDialog.ezInstance.ezJobCodesById[prop];
            let inputId = ezApi.ezSingleLineTemplate`${EzGustoCSVIntegrationSetupDialog.ezInstance.ezDialogId}_DataTagMappingInput_${jobCode.id.toString()}`;

            if (ezApi.ezclocker.ezUi.ezElementExists(inputId)) {
                let ezIntegrationDataTag = ezApi.ezclocker.ezUi.ezGetInputValue(inputId).trim();

                if (ezApi.ezStringHasLength(ezIntegrationDataTag)) {
                    let dataTagIntegrationMapRequest = EzGustoCSVIntegrationSetupDialog.ezInstance.ezGetCurrentMapInstance(inputId);
                    if (!ezApi.ezIsValid(dataTagIntegrationMapRequest)) {
                        dataTagIntegrationMapRequest = new DataTagIntegrationMapRequest();
                    }

                    dataTagIntegrationMapRequest.ezIntegrationproviderId = '';
                    dataTagIntegrationMapRequest.ezUserId =
                        ezApi.ezclocker.ezClockerContext.ezGetUserContext().userAccount.id;
                    dataTagIntegrationMapRequest.ezEmployerId =
                        ezApi.ezclocker.ezClockerContext.ezGetSelectedEmployerAccount().id;
                    dataTagIntegrationMapRequest.ezIntegrationProviderId =
                        EzIntegrationProviderId.GUSTO;
                    dataTagIntegrationMapRequest.ezClockerDataTagId = jobCode.id;
                    dataTagIntegrationMapRequest.ezContextId = '';
                    dataTagIntegrationMapRequest.ezIntegrationDataTag = ezIntegrationDataTag;

                    integrationSetupRequest.ezAddDataTagIntegrationMapRequest(dataTagIntegrationMapRequest);
                }
            }
        }
    }

    /**
        @protected @method
        Removes the normal styles and applies the validation error styles to the provided tabId
        @param {EzIntegrationMappingViewType} ezIntegrationMappingViewType
     */
    ezApplyErrorTab(ezIntegrationMappingViewType) {
        if (!ezApi.ezStringHasLength(ezIntegrationMappingViewType) ||
            !ezApi.ezHasOwnProperty(EzGustoCSVIntegrationSetupDialog.ezInstance.ezTabIds, ezIntegrationMappingViewType)) {
            return;
        }

        let tabId = EzGustoCSVIntegrationSetupDialog.ezInstance.ezTabIds[ezIntegrationMappingViewType];
        ezApi.ezclocker.ezUi.ezSetElementDataAttributeValue(tabId, 'ezValidationError', 'true');
        if (ezIntegrationMappingViewType === EzGustoCSVIntegrationSetupDialog.ezInstance.ezActiveIntegrationMappingViewType) {
            ezApi.ezclocker.ezUi.ezRemoveClass(tabId, 'ezActiveTab');
            ezApi.ezclocker.ezUi.ezRemoveClass(tabId, 'ezTab');
            ezApi.ezclocker.ezUi.ezRemoveClass(tabId, 'ezErrorTab');
            ezApi.ezclocker.ezUi.ezAddClass(tabId, 'ezErrorActiveTab');
        } else {
            ezApi.ezclocker.ezUi.ezRemoveClass(tabId, 'ezActiveTab');
            ezApi.ezclocker.ezUi.ezRemoveClass(tabId, 'ezTab');
            ezApi.ezclocker.ezUi.ezRemoveClass(tabId, 'ezErrorActiveTab');
            ezApi.ezclocker.ezUi.ezAddClass(tabId, 'ezErrorTab');
        }
    }

    /**
        @protected @method
        Removes validation error styles and applies the normal styles to the provided tabId
        @param {EzIntegrationMappingViewType} ezIntegrationMappingViewType
     */
    ezApplyNormalTab(ezIntegrationMappingViewType) {
        if (!ezApi.ezStringHasLength(ezIntegrationMappingViewType) ||
            !ezApi.ezHasOwnProperty(EzGustoCSVIntegrationSetupDialog.ezInstance.ezTabIds, ezIntegrationMappingViewType)) {
            return;
        }

        let tabId = EzGustoCSVIntegrationSetupDialog.ezInstance.ezTabIds[ezIntegrationMappingViewType];
        ezApi.ezclocker.ezUi.ezSetElementDataAttributeValue(tabId, 'ezValidationError', 'false');
        if (ezIntegrationMappingViewType === EzGustoCSVIntegrationSetupDialog.ezInstance.ezActiveIntegrationMappingViewType) {
            ezApi.ezclocker.ezUi.ezRemoveClass(tabId, 'ezTab');
            ezApi.ezclocker.ezUi.ezRemoveClass(tabId, 'ezErrorActiveTab');
            ezApi.ezclocker.ezUi.ezRemoveClass(tabId, 'ezErrorTab');
            ezApi.ezclocker.ezUi.ezAddClass(tabId, 'ezActiveTab');
        } else {
            ezApi.ezclocker.ezUi.ezRemoveClass(tabId, 'ezErrorTab');
            ezApi.ezclocker.ezUi.ezRemoveClass(tabId, 'ezActiveTab');
            ezApi.ezclocker.ezUi.ezRemoveClass(tabId, 'ezErrorActiveTab');
            ezApi.ezclocker.ezUi.ezAddClass(tabId, 'ezTab');
        }
    }

    /**
       @protected @method
       Sets the tag associated with the provided aTabIdToActive as active.
       @param {String} ezIntegrationMappingViewType
    */
    ezActivateTab(ezIntegrationMappingViewType) {
        if (!ezApi.ezStringHasLength(ezIntegrationMappingViewType)) {
            throw new EzBadParamException(
                'ezIntegrationMappingViewType',
                EzGustoCSVIntegrationSetupDialog.ezInstance,
                EzGustoCSVIntegrationSetupDialog.ezInstance.ezActivateTab);
        }

        if (!ezApi.ezHasOwnProperty(EzGustoCSVIntegrationSetupDialog.ezInstance.ezTabs, ezIntegrationMappingViewType)) {
            throw ezApi.ezException(`Tab with id=${ezIntegrationMappingViewType} does not exist.`);
        }

        if (ezIntegrationMappingViewType === EzGustoCSVIntegrationSetupDialog.ezInstance.ezActiveIntegrationMappingViewType) {
            // already active
            return;
        }

        let previouslyActiveIntegrationMappingViewType = EzGustoCSVIntegrationSetupDialog.ezInstance.ezActiveIntegrationMappingViewType;
        EzGustoCSVIntegrationSetupDialog.ezInstance.ezActiveIntegrationMappingViewType = ezIntegrationMappingViewType;
        if (ezApi.ezStringHasLength(previouslyActiveIntegrationMappingViewType) &&
            EzIntegrationMappingViewType.UNKNOWN !== previouslyActiveIntegrationMappingViewType) {
            // Deactivate current

            // Hide the tabs view
            ezApi.ezclocker.ezUi.ezHideElement(EzGustoCSVIntegrationSetupDialog.ezInstance.ezTabs[previouslyActiveIntegrationMappingViewType].tabViewId);
            let previousTabId = EzGustoCSVIntegrationSetupDialog.ezInstance.ezTabIds[previouslyActiveIntegrationMappingViewType];
            ezApi.ezclocker.ezUi.ezSetElementDataAttributeValue(previousTabId, 'active', 'false');
            if ('true' === ezApi.ezclocker.ezUi.ezGetElementDataAttributeValue(previousTabId, 'ezValidationError')) {
                EzGustoCSVIntegrationSetupDialog.ezInstance.ezApplyErrorTab(previouslyActiveIntegrationMappingViewType);
            } else {
                EzGustoCSVIntegrationSetupDialog.ezInstance.ezApplyNormalTab(previouslyActiveIntegrationMappingViewType);
            }
            EzGustoCSVIntegrationSetupDialog.ezInstance.ezTabs[previouslyActiveIntegrationMappingViewType].active = false;
        }

        // Activate the new tab
        let tabId = EzGustoCSVIntegrationSetupDialog.ezInstance.ezTabIds[EzGustoCSVIntegrationSetupDialog.ezInstance.ezActiveIntegrationMappingViewType];
        EzGustoCSVIntegrationSetupDialog.ezInstance.ezTabs[EzGustoCSVIntegrationSetupDialog.ezInstance.ezActiveIntegrationMappingViewType].active = true;
        ezApi.ezclocker.ezUi.ezSetElementDataAttributeValue(tabId, 'active', 'true');
        if ('true' === ezApi.ezclocker.ezUi.ezGetElementDataAttributeValue(tabId, 'ezValidationError')) {
            EzGustoCSVIntegrationSetupDialog.ezInstance.ezApplyErrorTab(EzGustoCSVIntegrationSetupDialog.ezInstance.ezActiveIntegrationMappingViewType);
        } else {
            EzGustoCSVIntegrationSetupDialog.ezInstance.ezApplyNormalTab(EzGustoCSVIntegrationSetupDialog.ezInstance.ezActiveIntegrationMappingViewType);
        }

        EzGustoCSVIntegrationSetupDialog.ezInstance.ezShowTabHelp(ezIntegrationMappingViewType);

        // Display the tab's view
        ezApi.ezclocker.ezUi.ezShowElement(
            EzGustoCSVIntegrationSetupDialog.ezInstance.ezTabs[EzGustoCSVIntegrationSetupDialog.ezInstance.ezActiveIntegrationMappingViewType].tabViewId);
    }

    /**
        @protected @method
        Displays the help text for the activated tab
        @param {EzIntegrationMappingViewType} ezIntegrationMappingViewType
     */
    ezShowTabHelp(ezIntegrationMappingViewType) {
        switch (ezIntegrationMappingViewType) {
            case EzIntegrationMappingViewType.PAY_RATE_MAPPING:
                ezApi.ezclocker.ezUi.ezContent(
                    `${EzGustoCSVIntegrationSetupDialog.ezInstance.ezDialogId}_HelpTitle`,
                    'Pay Rate Mapping');
                ezApi.ezclocker.ezUi.ezContent(
                    `${EzGustoCSVIntegrationSetupDialog.ezInstance.ezDialogId}_IntegrationHelp`,
                    'Pay Rate mapping is not supported by the Gusto integration.');
                break;
            case EzIntegrationMappingViewType.JOB_MAPPING:
                ezApi.ezclocker.ezUi.ezContent(
                    `${EzGustoCSVIntegrationSetupDialog.ezInstance.ezDialogId}_HelpTitle`,
                    'Job Mapping');
                ezApi.ezclocker.ezUi.ezContent(
                    ezApi.ezIdTemplate`${EzGustoCSVIntegrationSetupDialog.ezInstance.ezDialogId}_IntegrationHelp`,
                    'Job mapping is not supported by the Gusto integration.');
                break;
            case EzIntegrationMappingViewType.EMPLOYEE_MAPPING:
            default:
                ezApi.ezclocker.ezUi.ezContent(
                    `${EzGustoCSVIntegrationSetupDialog.ezInstance.ezDialogId}_HelpTitle`,
                    'Employee Mapping');
                ezApi.ezclocker.ezUi.ezContent(
                    `${EzGustoCSVIntegrationSetupDialog.ezInstance.ezDialogId}_IntegrationHelp`,
                    ezApi.ezTemplate`
                        <p>
                        For each ezClocker employee enter the employee's First Name and Last Name
                        exactly as it appears in Gusto.
                        </p>
                        <p>
                        To help get you started, ezClocker made it's best guess as to what the matching employee's
                        name is in Gusto. Please review our best guess before you continue.
                        </p>`);
                break;
        }
    }

    /**
        @protected @method
        Loads any existing integration configuration from the DB
        @returns {Resolve}
     */
    ezLoadIntegrationSetupConfiguration() {
        EzGustoCSVIntegrationSetupDialog.ezInstance.ezIntegrationResponse = null;
        return ezApi.ezResolver((resolve) => EzGustoCSVIntegrationSetupDialog.ezInstance.ezController.ezGetIntegrationSetup(
            EzGustoCSVIntegrationSetupDialog.ezInstance.ezIntegrationProviderId).then(
                (response) => {
                    EzGustoCSVIntegrationSetupDialog.ezInstance.ezIntegrationResponse = response;
                    return resolve();
                },
                (eResponse) => {
                    ezApi.ezclocker.logger.error(
                        ezApi.ezEM`
                        Failed to get existing ${EzGustoCSVIntegrationSetupDialog.ezInstance.ezIntegrationName} integration configuration.
                        Error: ${ezApi.ezToJson(eResponse)}`);
                    ezApi.ezclocker.ezDialog.ezShowPossibleDefectError(
                        `${EzGustoCSVIntegrationSetupDialog.ezInstance.ezIntegrationName} Integration Configuration Load Error`,
                        'Unable to get the existing Gusto configuration at this time.',
                        ezApi.ezToJson(eResponse));
                    return resolve();
                }));
    }

    /**
        @protected @method
        Loads the employer's data tags (if any)
        @returns {Resolve}
     */
    ezLoadEmployerDataTags() {
        EzGustoCSVIntegrationSetupDialog.ezInstance.ezJobCodes = [];
        EzGustoCSVIntegrationSetupDialog.ezInstance.ezJobCodesById = null;
        return ezApi.ezResolver(
            (resolve) => ezApi.ezclocker.ezClockerContext.ezRefreshSelectedEmployerAvailableJobs()
                .then(
                    (response) => {
                        if (ezApi.ezArrayHasLength(response.availableJobs)) {
                            EzGustoCSVIntegrationSetupDialog.ezInstance.ezJobCodesById = response.availableJobsById;
                            EzGustoCSVIntegrationSetupDialog.ezInstance.ezJobCodes = response.availableJobs;
                        }
                        return resolve(EzGustoCSVIntegrationSetupDialog.ezInstance.ezJobCodes);
                    },
                    (eResponse) => {
                        ezApi.ezclocker.logger.error(
                            ezApi.ezEM`
                                Failed to load the available jobs for the employ er.
                                Error: ${ezApi.ezToJson(eResponse)}`);

                        return ezApi.ezclocker.ezDialog.ezShowPossibleDefectError(
                            'Available Jobs Error',
                            'Unable to get the available Jobs for your employer at this time.',
                            ezApi.ezToJson(eResponse))
                            .then(resolve);
                    }));
    }

    /**
        @protected @method
        Builds the export report dialog's HTML
        @returns {String}
     */
    ezBuildDialogHtml() {
        let tabsHtml = '';
        let tabsViewHtml = '';

        EzGustoCSVIntegrationSetupDialog.ezInstance.ezSupportedMappings.forEach(
            (ezIntegrationMappingViewType) => {
                if (ezApi.ezHasOwnProperty(EzGustoCSVIntegrationSetupDialog.ezInstance.ezTabs, ezIntegrationMappingViewType)) {
                    let ezTab = EzGustoCSVIntegrationSetupDialog.ezInstance.ezTabs[ezIntegrationMappingViewType];
                    let hideTabStyle = ezApi.ezIsFalse(ezTab.visible)
                        ? 'style="display:none"'
                        : '';

                    tabsHtml += ezApi.ezTemplate`
                        <button id="${ezTab.id}"
                            type="button"
                            class="ezTab"
                            ${hideTabStyle}
                            data-active="${ezTab.active.toString()}"
                            data-tabgroup="${ezTab.tabGroup}"
                            data-tabviewid="${ezTab.tabViewId}"
                            data-ezintegrationmappingviewtype="${ezIntegrationMappingViewType}">
                            ${ezTab.caption}
                        </button>`;
                    tabsViewHtml += ezTab.ezView;
                }
            });

        let logoUrl = EzIntegrationProviderId.ezToIntegrationLogoUrl(EzIntegrationProviderId.GUSTO);
        let logoText = EzIntegrationProviderId.ezToIntegrationLogoText(EzIntegrationProviderId.GUSTO);
        return ezApi.ezTemplate`
            <div id="${EzGustoCSVIntegrationSetupDialog.ezInstance.ezDialogId}">
                <div id="${EzGustoCSVIntegrationSetupDialog.ezInstance.ezDialogId}_DialogContent" class="ez-white-borderless-box8 ezAutoRow_A_A">
                    <div id="${EzGustoCSVIntegrationSetupDialog.ezInstance.ezDialogId}_Header" class="ezContainer-integration-setup-header">
                        <div id="${EzGustoCSVIntegrationSetupDialog.ezInstance.ezDialogId}_Toptable" class="ezGridNoGap ezAutoCol_AxA">
                            <div class="ezContainer-integration-logo">
                                <img src="${logoUrl}" class="ezContainer-integration-logo-img"/>
                                ${logoText} (using CSV File Export)
                            </div>
                            <div id="${EzGustoCSVIntegrationSetupDialog.ezInstance.ezDialogId}_HeaderEnabledContainer"
                                class="ezGrid-vertical-align-top ezGrid-align-right">
                                <label for="${EzGustoCSVIntegrationSetupDialog.ezInstance.ezHeaderInputIds.ezIntegrationEnableInputId}"
                                    class="ezInputLabel ezBold">
                                    <input id="${EzGustoCSVIntegrationSetupDialog.ezInstance.ezHeaderInputIds.ezIntegrationEnableInputId}"
                                        type="checkbox"/>
                                    ${EzGustoCSVHeaderFieldName.ezToDisplayValue(EzGustoCSVHeaderFieldName.INTEGRATION_ENABLED)}
                                </label>
                            </div>
                        </div>
                        <div style="height:10px;"></div>
                        <div id="${EzGustoCSVIntegrationSetupDialog.ezInstance.ezUxIds.elementIds.ezErrorMessageContainerId}"
                            class="ez-floating-error-container" style="display:none">
                            <div id="${EzGustoCSVIntegrationSetupDialog.ezInstance.ezUxIds.elementIds.ezErrorMessageId}"></div>
                        </div>
                    </div>
                    <div id="${EzGustoCSVIntegrationSetupDialog.ezInstance.ezDialogId}_SetupContainer"
                        class="ezSubContentView-no-border-no-scroll ezAutoCol_75xA">
                        <div id="${EzGustoCSVIntegrationSetupDialog.ezInstance.ezDialogId}_TabContainer" class="ezTabContainer">
                            <div id="${EzGustoCSVIntegrationSetupDialog.ezInstance.ezDialogId}_Tabs" class="ezTabsContainer">
                                ${tabsHtml}
                            </div>
                            <div id="${EzGustoCSVIntegrationSetupDialog.ezInstance.ezDialogId}_TabViews" class="ezSubContentView-no-border-no-scroll">
                                ${tabsViewHtml}
                            </div>
                        </div>
                        ${EzGustoCSVIntegrationSetupDialog.ezInstance.ezBuildTabHelpHtml()}
                    </div>
                </div>
            </div>`;
    }

    /**
        @protected @method
        Builds the integration tab's help html
        @returns {String}
     */
    ezBuildTabHelpHtml() {
        return ezApi.ezTemplate`
            <div id="${EzGustoCSVIntegrationSetupDialog.ezInstance.ezDialogId}_HelpContainer" class="ezContainer-side-help-box">
                <div class="ezContainer-side-help-box-title">
                    <img src="/public/images/integrations/help-navy.svg" class="ezContainer-side-help-box-img"/>
                    <lable id="${EzGustoCSVIntegrationSetupDialog.ezInstance.ezDialogId}_HelpTitle">Employee Mapping</label>
                </div>
                <div id="${EzGustoCSVIntegrationSetupDialog.ezInstance.ezDialogId}_IntegrationHelp" class="ezContainer-side-help-box-content">
                </div>
            </div>`;
    }

    /**
        @protected @method
        Builds the HTML for the 'full screen' mode of the setup dialog.
        @returns {String}
     */
    ezBuildFullscreenHtml() {
        return ezApi.ezTemplate`
            <div id="${EzGustoCSVIntegrationSetupDialog.ezInstance.ezFullScreenParentId}" class="ezContainer-full-screen-overlay" style="display:none">
                <div id="${EzGustoCSVIntegrationSetupDialog.ezInstance.ezFullScreenParentId}_ButtonBar" class="ezContainer-white-right-aligned-button-container">
                    <button id="${EzGustoCSVIntegrationSetupDialog.ezInstance.ezFullScreenOkButtonId}" class="ezDefaultNormalButton">Save</button>
                    <button id="${EzGustoCSVIntegrationSetupDialog.ezInstance.ezFullScreenCancelButtonId}"
                                   onclick="ezApi.ezclocker.nav.ezNavigateToEmployerIntegrationsPage()"
                    class="ezNormalButton">Cancel</button>
                </div>
                <div id="${EzGustoCSVIntegrationSetupDialog.ezInstance.ezFullScreenContentId}" class="ezSubContentView-no-scroll ezPad8">
                </div>
            </div>`;
    }

    /**
        @protected @method
        Builds the views for each tab
     */
    ezBuildTabViews() {
        EzGustoCSVIntegrationSetupDialog.ezInstance.ezSupportedMappings.forEach(
            (ezIntegrationMappingViewType) => {
                if (ezApi.ezHasOwnProperty(EzGustoCSVIntegrationSetupDialog.ezInstance.ezViewIds, ezIntegrationMappingViewType) &&
                    ezApi.ezHasOwnProperty(EzGustoCSVIntegrationSetupDialog.ezInstance.ezTabs, ezIntegrationMappingViewType)) {
                    switch (ezIntegrationMappingViewType) {
                        case EzIntegrationMappingViewType.EMPLOYEE_MAPPING:
                            EzGustoCSVIntegrationSetupDialog.ezInstance.ezTabs[ezIntegrationMappingViewType].ezView =
                                EzGustoCSVIntegrationSetupDialog.ezInstance.ezBuildEmployeeMappingTabView();
                            break;
                        case EzIntegrationMappingViewType.JOB_MAPPING:
                            EzGustoCSVIntegrationSetupDialog.ezInstance.ezTabs[ezIntegrationMappingViewType].ezView =
                                EzGustoCSVIntegrationSetupDialog.ezInstance.ezBuildJobMappingTabView();
                            break;
                        case EzIntegrationMappingViewType.PAY_RATE_MAPPING:
                            EzGustoCSVIntegrationSetupDialog.ezInstance.ezTabs[ezIntegrationMappingViewType].ezView =
                                EzGustoCSVIntegrationSetupDialog.ezInstance.ezBuildPayRateMappingTabView();
                            break;
                        default:
                            ezApi.ezclocker.logger.error(
                                `Integration mapping type ${ezIntegrationMappingViewType} is not currently supported`);
                    }
                }
            });
    }

    /**
        @protected @method
        Builds the supported mapping views UX
     */
    ezBuildSupportedMappingViews() {
        EzGustoCSVIntegrationSetupDialog.ezInstance.ezSupportedMappings.forEach(
            (ezIntegrationMappingViewType) => {
                let buildMappingListFunction = null;
                switch (ezIntegrationMappingViewType) {
                    case EzIntegrationMappingViewType.EMPLOYEE_MAPPING:
                        buildMappingListFunction = EzGustoCSVIntegrationSetupDialog.ezInstance.ezBuildEmployeeMappingList;
                        break;
                    case EzIntegrationMappingViewType.PAY_RATE_MAPPING:
                        buildMappingListFunction = EzGustoCSVIntegrationSetupDialog.ezInstance.ezBuildPayRateMappingList;
                        break;
                    case EzIntegrationMappingViewType.JOB_MAPPING:
                        buildMappingListFunction = EzGustoCSVIntegrationSetupDialog.ezInstance.ezBuildJobMappingsList;
                        break;
                    default:
                        ezApi.ezclocker.logger.error(
                            `Mapping view ${ezIntegrationMappingViewType} is not supported yet.`);
                }

                if (ezApi.ezIsFunction(buildMappingListFunction)) {
                    ezApi.ezclocker.ezUi.ezAppendContent(
                        `${EzGustoCSVIntegrationSetupDialog.ezInstance.ezViewIds[ezIntegrationMappingViewType]}_TableBody`,
                        buildMappingListFunction());
                }
            });
    }

    /**
        @protected @method
        Builds the tabs integration's employee mapping view
     */
    ezBuildEmployeeMappingTabView() {
        let viewId = EzGustoCSVIntegrationSetupDialog.ezInstance.ezViewIds[EzIntegrationMappingViewType.EMPLOYEE_MAPPING];
        return ezApi.ezTemplate`
            <div id="${viewId}" data-tabgroup="GustoIntegrationTabs" class="ez-tab-view-container"
                style="display:none">
                <div id="${viewId}_ListDiv" class="ezContainer-integration-input-container">
                    <table id="${viewId}_Table" class="ez-table-full-width">
                        <thead id="${viewId}_TableHeader" class="ez-table-header">
                            <tr id="${viewId}_TableHeaderRow" class="ez-table-row">
                                <th id="${viewId}_TableHeaderCell_EzEmployeeName" class="ez-table-cell-header-fixed">
                                    EzClocker Employees
                                </th>
                                <th id="${viewId}_TableHeaderCell_IntegrationEmployeeFieldMapName"
                                    class="ez-table-cell-header-fixed">
                                    ${EzGustoCSVIntegrationSetupDialog.ezInstance.ezIntegrationEmployeeMapFieldFirstName}
                                </th>
                                <th id="${viewId}_TableHeaderCell_IntegrationEmployeeFieldMapName"
                                    class="ez-table-cell-header-fixed">
                                    ${EzGustoCSVIntegrationSetupDialog.ezInstance.ezIntegrationEmployeeMapFieldLastName}
                                </th>
                            </tr>
                        </thead>
                        <tbody id="${viewId}_TableBody" class="ez-table-body">
                        </tbody>
                    </table>
                </div>
            </div>`;
    }

    /**
        @protected @method
        Builds the employee mapping html
        @returns {String}
     */
    ezBuildEmployeeMappingList() {
        let viewId = EzGustoCSVIntegrationSetupDialog.ezInstance.ezViewIds[EzIntegrationMappingViewType.EMPLOYEE_MAPPING];
        ezApi.ezclocker.ezUi.ezClearContent(`${viewId}_TableBody`);

        let employees = ezApi.ezclocker.ezClockerContext.ezGetSelectedEmployerAccountEmployeeAccounts();
        if (!ezApi.ezArrayHasLength(employees)) {
            return ezApi.ezTemplate`
                <tr id="${viewId}_TableBodyMappingRow_NoEmployees" class="ez-table-row">
                    <td id="${viewId}_TableBodyMappingCell_NoEmployees" class="ez-table-cell" colspan="2" >
                        No Employees available
                    </td>
                </tr>`;
        }

        let ezIntegrationResponse = ezApi.ezIsValid(EzGustoCSVIntegrationSetupDialog.ezInstance.ezIntegrationResponse)
            ? EzGustoCSVIntegrationSetupDialog.ezInstance.ezIntegrationResponse
            : new EzGustoCSVIntegrationSetupResponse();

        let employeeListHtml = '';

        employees.forEach(
            (employee) => {
                let ezEmployeeIntegrationMapRequest =
                    ezIntegrationResponse.ezGetEmployeeMappingForEmployeeId(employee.id);
                if (ezApi.ezIsValid(ezEmployeeIntegrationMapRequest)) {
                    employeeListHtml += EzGustoCSVIntegrationSetupDialog.ezInstance.ezBuildEmployeeMappingRow(
                        viewId,
                        employee,
                        ezEmployeeIntegrationMapRequest);
                } else {
                    employeeListHtml += EzGustoCSVIntegrationSetupDialog.ezInstance.ezBuildEmployeeMappingRow(
                        viewId,
                        employee,
                        null);
                }
            });

        return employeeListHtml;
    }

    /**
        @protected @method
        @param {Array} employees
        Builds the HTML for a employee mapping row
        @param {String} viewId
        @param {Object} employee
        @Param {EzEmployeeIntegrationMapRequest} ezEmployeeIntegrationMapRequest
        @returns {String}
     */
    ezBuildEmployeeMappingRow(viewId, employee, ezEmployeeIntegrationMapRequest) {
        if (ezApi.ezIsNotValid(employee)) {
            throw new EzBadParamException(
                'employee',
                EzGustoCSVIntegrationSetupDialog.ezInstance,
                EzGustoCSVIntegrationSetupDialog.ezInstance.ezBuildEmployeeMappingRow);
        }
        if (!ezApi.ezIsNumber(employee.id)) {
            throw new EzBadParamException(
                'employee.id',
                EzGustoCSVIntegrationSetupDialog.ezInstance,
                EzGustoCSVIntegrationSetupDialog.ezInstance.ezBuildEmployeeMappingRow);
        }
        if (!ezApi.ezStringHasLength(employee.employeeName)) {
            throw new EzBadParamException(
                'employee.employeeName',
                EzGustoCSVIntegrationSetupDialog.ezInstance,
                EzGustoCSVIntegrationSetupDialog.ezInstance.ezBuildEmployeeMappingRow);
        }

        let employeeIdStr = employee.id.toString();
        let mappingJson = '';
        let providerEmployeeFirstName = '';
        let providerEmployeeLastName = '';

        if (ezApi.ezIsValid(ezEmployeeIntegrationMapRequest)) {
            mappingJson = ezApi.ezToJson(ezEmployeeIntegrationMapRequest);
            providerEmployeeFirstName = ezApi.ezStringOrEmpty(ezEmployeeIntegrationMapRequest.integrationEmployeeFirstName);
            providerEmployeeLastName = ezApi.ezStringOrEmpty(ezEmployeeIntegrationMapRequest.integrationEmployeeLastName);
        } else {
            let employeeFirstLastName = ezApi.ezFullNameToFirstLastName(employee.employeeName);
            providerEmployeeFirstName = ezApi.ezStringOrEmpty(employeeFirstLastName.firstName);
            providerEmployeeLastName = ezApi.ezStringOrEmpty(employeeFirstLastName.lastName);
        }

        let firstNameValue = ezApi.ezStringHasLength(providerEmployeeFirstName)
            ? ezApi.ezSingleLineTemplate`value="${providerEmployeeFirstName}"`
            : '';
        let lastNameValue = ezApi.ezStringHasLength(providerEmployeeLastName)
            ? ezApi.ezSingleLineTemplate`value="${providerEmployeeLastName}"`
            : '';
        let rowId = `${viewId}_TableBody_Mapping`;
        let firstNameInputId =
            `${EzGustoCSVIntegrationSetupDialog.ezInstance.ezDialogId}_IntegrationMappingFirstNameInput_${employeeIdStr}`;
        let lastNameInputId =
            `${EzGustoCSVIntegrationSetupDialog.ezInstance.ezDialogId}_IntegrationMappingLastNameInput_${employeeIdStr}`;

        return ezApi.ezTemplate`
            <tr id="${rowId}Row_EzEmployee_${employeeIdStr}" class="ez-table-row" data-ezid="${employeeIdStr}">
                <td id="${rowId}Cell_EzEmployee_${employeeIdStr}_EmployeeName"
                    class="ez-table-cell ez-cell-align-middle-left" data-ezid="${employeeIdStr}">
                    ${employee.employeeName}
                </td>
                <td id="${rowId}Cell_EzEmployee_${employeeIdStr}_IntegrationEmployeeMapFirstName"
                    class="ez-table-cell ez-cell-align-middle-center" data-ezid="${employeeIdStr}">
                    <input id="${firstNameInputId}" type="text" class="ezFullWidthEditor" data-ezid="${employeeIdStr}"
                        name="${firstNameInputId}" autocomplete="${firstNameInputId}" data-mapping-json="${mappingJson}"
                        placeholder="enter ${EzGustoCSVIntegrationSetupDialog.ezInstance.ezIntegrationEmployeeMapFieldDisplayName} first name" ${firstNameValue}/>
                <td id="${rowId}Cell_EzEmployee_${employeeIdStr}_IntegrationEmployeeMapLastName"
                    class="ez-table-cell ez-cell-align-middle-center" data-ezid="${employeeIdStr}">
                    <input id="${lastNameInputId}" type="text" class="ezFullWidthEditor" data-ezid="${employeeIdStr}"
                        name="${lastNameInputId}" autocomplete="${firstNameInputId}" data-mapping-json="${mappingJson}"
                        placeholder="enter ${EzGustoCSVIntegrationSetupDialog.ezInstance.ezIntegrationEmployeeMapFieldDisplayName} last name" ${lastNameValue}/>
                </td>
            </tr>`;
    }

    /**
       @protected @method
       Builds the integration's Pay Rate mapping view
       NOTE: Gusto does not currently support pay rate mapping
    */
    ezBuildPayRateMappingTabView() {
        let viewId = EzGustoCSVIntegrationSetupDialog.ezInstance.ezViewIds[EzIntegrationMappingViewType.PAY_RATE_MAPPING];
        return ezApi.ezTemplate`
            <div id="${viewId}" data-tabgroup="GustoIntegrationTabs" class="ez-tab-view-container"
                style="display:none">
                <div id="${viewId}_ListDiv" class="ezContainer-integration-input-container">
                    <table id="${viewId}_Table" class="ez-table-full-width">
                        <thead id="${viewId}_TableHeader" class="ez-table-header">
                            <tr id="${viewId}_TableHeaderRow" class="ez-table-row">
                                <th id="${viewId}_TableHeaderCell_EzPayTypeName" class="ez-table-cell-header-fixed">
                                    EzClocker Pay Types
                                </th>
                                <th id="${viewId}_TableHeaderCell_IntegrationPayTypeMapping"
                                    class="ez-table-cell-header-fixed">
                                    ${EzGustoCSVIntegrationSetupDialog.ezInstance.ezIntegrationPayRateMapFieldDisplayName}
                                </th>
                            </tr>
                        </thead>
                        <tbody id="${viewId}_TableBody" class="ez-table-body">
                        </tbody>
                    </table>
                </div>
            </div>`;
    }

    /**
        @protected @method
        Builds the Pay Rate mapping html
        @returns {String}
    */
    ezBuildPayRateMappingList() {
        let viewId = this.ezViewIds[EzIntegrationMappingViewType.PAY_RATE_MAPPING];
        ezApi.ezclocker.ezUi.ezClearContent(`${viewId}_TableBody`);

        let ezIntegrationResponse = ezApi.ezIsValid(EzGustoCSVIntegrationSetupDialog.ezInstance.ezIntegrationResponse)
            ? EzGustoCSVIntegrationSetupDialog.ezInstance.ezIntegrationResponse
            : new EzGustoCSVIntegrationSetupResponse();

        let payRateListHtml = '';
        EzGustoCSVIntegrationSetupDialog.ezInstance.ezSupportedEzClockerPayRateTypes.forEach(
            (payRateType) => {
                let payRateIntegrationMapRequest =
                    ezIntegrationResponse.ezGetPayRateIntegrationMapRequestForPayRateType(payRateType);
                if (ezApi.ezIsValid(payRateIntegrationMapRequest) &&
                    ezApi.ezStringHasLength(payRateIntegrationMapRequest.ezClockerPayRateType) &&
                    payRateType === payRateIntegrationMapRequest.ezClockerPayRateType) {
                    payRateListHtml += EzGustoCSVIntegrationSetupDialog.ezInstance.ezBuildPayRateRow(viewId, payRateType, payRateIntegrationMapRequest);
                } else {
                    payRateListHtml += EzGustoCSVIntegrationSetupDialog.ezInstance.ezBuildPayRateRow(viewId, payRateType, null);
                }
            });

        return payRateListHtml;
    }

    /**
        @protected @method
        Builds the HTML for a pay rate mapping row.
        @param {String} viewId
        @param {String} ezClockerPayRateType
        @param {EzPayRateIntegrationMapRequest|null} payRateIntegrationMapRequest
        @returns {String}
        Returns the generated HTML
     */
    ezBuildPayRateRow(viewId, ezClockerPayRateType, payRateIntegrationMapRequest) {
        if (!ezApi.ezStringHasLength(viewId)) {
            throw new EzBadParamException(
                'viewId',
                EzGustoCSVIntegrationSetupDialog.ezInstance,
                EzGustoCSVIntegrationSetupDialog.ezInstance.ezBuildPayRateRow);
        }
        if (ezApi.ezIsNotValid(ezClockerPayRateType)) {
            throw new EzBadParamException(
                'ezClockerPayRateType',
                EzGustoCSVIntegrationSetupDialog.ezInstance,
                EzGustoCSVIntegrationSetupDialog.ezInstance.ezBuildPayRateRow);
        }

        let mappingJson = '';
        let integrationPayRateCode = '';
        if (ezApi.ezIsValid(payRateIntegrationMapRequest)) {
            mappingJson = ezApi.ezToJson(payRateIntegrationMapRequest);
            integrationPayRateCode = ezApi.ezStringOrEmpty(payRateIntegrationMapRequest.integrationPayRateCode);
        }

        let value = ezApi.ezStringHasLength(integrationPayRateCode)
            ? ezApi.ezSingleLineTemplate`value="${integrationPayRateCode}"`
            : '';
        let rowId = ezApi.ezSingleLineTemplate`${viewId}_TableBody_Mapping`;

        return ezApi.ezTemplate`
            <tr id="${rowId}Row_EzPayRateType_${ezClockerPayRateType}" class="ez-table-row"
                data-ezid="${ezClockerPayRateType}">
                <td id="${rowId}Cell_EzPayRateTypeDisplay_${ezClockerPayRateType}"
                    class="ez-table-cell ez-cell-align-middle-left" data-ezid="${ezClockerPayRateType}">
                    ${EzClockerPayRateType.ezToDisplayValue(ezClockerPayRateType)}
                </td>
                <td id="${rowId}Cell_PayRateMapping_${ezClockerPayRateType}"
                    class="ez-table-cell ez-cell-align-middle-center" data-ezid="${ezClockerPayRateType}">
                    <input id="${EzGustoCSVIntegrationSetupDialog.ezInstance.ezDialogId}_PayRateMappingInput_${ezClockerPayRateType}"
                        class="ezFullWidthEditor" type="text" data-ezid="${ezClockerPayRateType}"
                        data-mappingJson="${mappingJson}" ${value} autocomplete="${ezClockerPayRateType}"/>
                </td>
            </tr>`;
    }

    /**
        @protected @method
        Builds the Job Mapping View for Gusto
        NOTE: Gusto does not currently support job mapping
     */
    ezBuildJobMappingTabView() {
        let viewId = EzGustoCSVIntegrationSetupDialog.ezInstance.ezViewIds[EzIntegrationMappingViewType.JOB_MAPPING];
        return ezApi.ezTemplate`
            <div id="${viewId}" data-tabgroup="GustoIntegrationTabs" class="ez-tab-view-container"
                style="display:none">
                <div id="${viewId}_ListDiv" class="ezContainer-integration-input-container">
                    <table id="${viewId}_Table" class="ez-table-full-width">
                        <thead id="${viewId}_TableHeader" class="ez-table-header">
                            <tr id="${viewId}_TableHeaderRow" class="ez-table-row">
                                <th id="${viewId}_TableHeaderCell_EzDataTag_TagName" class="ez-table-cell-header-fixed">
                                    EzClocker Jobs
                                </th>
                                <th id="${viewId}_TableHeaderCell_IntegrationJobMapping"
                                    class="ez-table-cell-header-fixed">
                                    ${EzGustoCSVIntegrationSetupDialog.ezInstance.ezIntegrationJobMapFieldDisplayName}
                                </th>
                            </tr>
                        </thead>
                        <tbody id="${viewId}_TableBody" class="ez-table-body">
                        </tbody>
                    </table>
                </div>
            </div>`;
    }

    /**
        @protected @method
        Builds the Job Mappings List HTML
        @returns {String}
     */
    ezBuildJobMappingsList() {
        let viewId = this.ezViewIds[EzIntegrationMappingViewType.JOB_MAPPING];
        ezApi.ezclocker.ezUi.ezClearContent(`${viewId}_TableBody`);

        if (!ezApi.ezIsValid(EzGustoCSVIntegrationSetupDialog.ezInstance.ezJobCodes)) {
            return ezApi.ezTemplate`
                <tr id="${viewId}_TableBody_MappingRow_NowJobs" class="ez-table-row">
                    <td id="${viewId}_TableBody_MappingCell_NoJobs" class="ez-table-cell" colspan="2">
                        No jobs available
                    </td>
                </tr>`;
        }

        let ezIntegrationResponse = ezApi.ezIsValid(EzGustoCSVIntegrationSetupDialog.ezInstance.ezIntegrationResponse)
            ? EzGustoCSVIntegrationSetupDialog.ezInstance.ezIntegrationResponse
            : new EzGustoCSVIntegrationSetupResponse();

        let jobsMappingHtml = '';
        for (let jobCode of EzGustoCSVIntegrationSetupDialog.ezInstance.ezJobCodes) {
            let dataTagIntegrationMapRequest = ezIntegrationResponse.ezGetDataTagMappingForDataTagId(jobCode.id);

            jobsMappingHtml += ezApi.ezIsValid(dataTagIntegrationMapRequest) &&
                ezApi.ezIsNumber(dataTagIntegrationMapRequest.id) &&
                ezApi.ezStringHasLength(dataTagIntegrationMapRequest.integrationDataTagId)
                ? EzGustoCSVIntegrationSetupDialog.ezInstance.ezBuildJobMappingRow(viewId, jobCode, dataTagIntegrationMapRequest)
                : EzGustoCSVIntegrationSetupDialog.ezInstance.ezBuildJobMappingRow(viewId, jobCode, null);
        }

        return jobsMappingHtml;
    }

    /**
        @protected @method
        Builds a job mapping row for the provided job code.
        @param {String} viewId
        @param {Number} dataTagId
        @param {EzDataTagIntegrationMapRequest|null} dataTagIntegrationMapRequest
     */
    ezBuildJobMappingRow(viewId, dataTag, dataTagIntegrationMapRequest) {
        if (!ezApi.ezStringHasLength(viewId)) {
            throw new EzBadParamException(
                'viewId',
                EzGustoCSVIntegrationSetupDialog.ezInstance,
                EzGustoCSVIntegrationSetupDialog.ezInstance.ezBuildJobMappingRow);
        }
        if (ezApi.ezIsNotValid(dataTag)) {
            throw new EzBadParamException(
                'dataTag',
                EzGustoCSVIntegrationSetupDialog.ezInstance.ezInstance,
                EzGustoCSVIntegrationSetupDialog.ezInstance.ezBuildJobMappingRow);
        }
        if (!ezApi.ezIsNumber(dataTag.id)) {
            throw new EzBadParamException(
                'dataTag.id',
                EzGustoCSVIntegrationSetupDialog.ezInstance,
                EzGustoCSVIntegrationSetupDialog.ezInstance.ezBuildJobMappingRow);
        }
        if (!ezApi.ezStringHasLength(dataTag.tagName)) {
            throw new EzBadParamException(
                'dataTag.tagName',
                EzGustoCSVIntegrationSetupDialog.ezInstance,
                EzGustoCSVIntegrationSetupDialog.ezInstance.ezBuildJobMappingRow);
        }

        let dataTagIdStr = dataTag.id.toString();
        let mappingJson = '';
        let integrationDataTagId = '';

        if (ezApi.ezIsValid(dataTagIntegrationMapRequest)) {
            mappingJson = ezApi.ezToJson(dataTagIntegrationMapRequest);
            integrationDataTagId = ezApi.ezStringOrEmpty(dataTagIntegrationMapRequest.integrationDataTagId);
        }

        let value = ezApi.ezStringHasLength(integrationDataTagId)
            ? `value="${integrationDataTagId}"`
            : '';

        let rowId = `${viewId}_TableBody_Mapping`;

        return ezApi.ezTemplate`
            <tr id="${rowId}_Row_DataTag_${dataTagIdStr}" class="ez-table-row" data-ezid="${dataTagIdStr}">
                <td id="${rowId}Cell_DataTag_${dataTagIdStr}_TagName"
                    class="ez-table-cell ez-cell-align-middle-left" data-ezid="${dataTagIdStr}">
                    ${dataTag.tagName}
                </td>
                <td id="${rowId}Cell_DataTag_${dataTagIdStr}_IntegrationDataTagMap"
                    class="ez-table-cell ez-cell-align-middle-center" data-ezid="${dataTagIdStr}">
                    <input id="${EzGustoCSVIntegrationSetupDialog.ezInstance.ezDialogId}_DataTagMappingInput_${dataTagIdStr}" class="ezFullWidthEditor"
                        type="text" data-ezid="${dataTagIdStr}" data-mapping-json="${mappingJson}"
                        ${value} autocomplete="ezDataTag${dataTagIdStr}"/>
                </td>
            </tr>`;
    }

    /**
        @protected @method
        Builds additional resources tab view
     */
    ezBuildAdditionalResourcesTabView() {
        let viewId = EzGustoCSVIntegrationSetupDialog.ezInstance.ezViewIds[EzIntegrationMappingViewType.ADDITIONAL_RESOURCES];

        return ezApi.ezTemplate`
            <div id="${viewId}" data-tabgroup="EzGustoCSVIntegrationTabs" class="ez-tab-view-container"
                style="display:none">
                <div id="${viewId}_ListDiv" class="ezContainer-integration-input-container">
                    <table id="${viewId}_Table" class="ez-table-full-width">
                        <thead id="${viewId}_TableHeader" class="ez-table-header">
                            <tr id="${viewId}_TableHeaderRow" class="ez-table-row">
                                <th id="${viewId}_TableHeaderCell_EzDataTag_TagName" class="ez-table-cell-header-fixed">
                                    Additional Help and Resources
                                </th>
                                <th id="${viewId}_TableHeaderCell_IntegrationJobMapping" class="ez-table-cell-header-fixed">
                                    ${EzGustoCSVIntegrationSetupDialog.ezInstance.ezIntegrationJobMapFieldDisplayName}
                                </th>
                            </tr>
                        </thead>
                        <tbody id="${viewId}_TableBody" class="ez-table-body">
                        </tbody>
                    </table>
                </div>
            </div>`;
    }

    /**
        @protected @method
        Handles the tab button clicks
        @param {Object} ezEvent
     */
    ezHandleTabClick(ezEvent) {
        if (!ezApi.ezIsValid(ezEvent) || !ezApi.ezIsValid(ezEvent.data.elementEvent)) {
            throw new EzBadParamException(
                'ezEvent',
                EzGustoCSVIntegrationSetupDialog.ezInstance,
                EzGustoCSVIntegrationSetupDialog.ezInstance.ezHandleTabClick);
        }

        if ('false' === ezApi.ezclocker.ezUi.ezGetElementDataAttributeValue(ezEvent.data.elementEvent.target, 'active')) {
            // Activate only if not already active
            EzGustoCSVIntegrationSetupDialog.ezInstance.ezActivateTab(
                ezApi.ezclocker.ezUi.ezGetElementDataAttributeValue(
                    ezEvent.data.elementEvent.target,
                    'ezintegrationmappingviewtype'));
        }
    }

    /**
        @protected @method
        Handles the initial focus of the dialog
     */
    ezHandleInitialDialogFocus() {
        ezApi.ezclocker.ezUi.ezId(EzGustoCSVIntegrationSetupDialog.ezInstance.ezDialogId).off('focus');

        ezApi.ezclocker.ezUi.ezFocusElement(EzGustoCSVIntegrationSetupDialog.ezInstance.ezHeaderInputIds.ezIntegrationEnableInputId);

        EzGustoCSVIntegrationSetupDialog.ezInstance.ezSupportedMappings.forEach(
            (ezIntegrationMappingViewType) =>
                ezApi.ezclocker.ezUi.ezScrollTo(`${EzGustoCSVIntegrationSetupDialog.ezInstance.ezTabs[ezIntegrationMappingViewType].tabViewId}_ListDiv`, 0, 0));
    }

    /**
        @protected @method
        Shows the validation error box
        @param {String} em
        @param {String|Null} inputId
        @param {String|Null} tabId
    */
    ezShowValidationError(em, inputId, ezIntegrationMappingViewType) {
        if (ezApi.ezStringHasLength(inputId) && ezApi.ezclocker.ezUi.ezElementExists(inputId)) {
            ezApi.ezclocker.ezUi.ezAddElementClass(
                inputId,
                EzGustoCSVIntegrationSetupDialog.ezInstance.ezUxIds.classNames.ezInputValidationErrorClass);
        }

        if (ezApi.ezStringHasLength(ezIntegrationMappingViewType)) {
            EzGustoCSVIntegrationSetupDialog.ezInstance.ezApplyErrorTab(ezIntegrationMappingViewType);
        }

        if (ezApi.ezStringHasLength(em)) {
            ezApi.ezclocker.ezUi.ezContent(
                EzGustoCSVIntegrationSetupDialog.ezInstance.ezUxIds.elementIds.ezErrorMessageId,
                em);
            ezApi.ezclocker.ezUi.ezShowElement(EzGustoCSVIntegrationSetupDialog.ezInstance.ezUxIds.elementIds.ezErrorMessageContainerId);
        }
    }

    /**
        @protected @method
        Hides the validation error box.
        @param {String|Null} inputId
        @param {String|Null} tabId
     */
    ezHideValidationError(inputId, ezIntegrationMappingViewType) {
        if (ezApi.ezStringHasLength(inputId) && ezApi.ezclocker.ezUi.ezElementExists(inputId)) {
            ezApi.ezclocker.ezUi.ezRemoveElementClass(
                inputId,
                EzGustoCSVIntegrationSetupDialog.ezInstance.ezUxIds.classNames.ezInputValidationErrorClass);
        }

        if (ezApi.ezStringHasLength(ezIntegrationMappingViewType)) {
            EzGustoCSVIntegrationSetupDialog.ezInstance.ezApplyNormalTab(ezIntegrationMappingViewType);
        }

        if (ezApi.ezclocker.ezUi.ezIsElementVisible(EzGustoCSVIntegrationSetupDialog.ezInstance.ezUxIds.elementIds.ezErrorMessageContainerId)) {
            ezApi.ezclocker.ezUi.ezClearContent(EzGustoCSVIntegrationSetupDialog.ezInstance.ezUxIds.elementIds.ezErrorMessageId);
            ezApi.ezclocker.ezUi.ezHideElement(EzGustoCSVIntegrationSetupDialog.ezInstance.ezUxIds.elementIds.ezErrorMessageContainerId);
        }
    }
}
