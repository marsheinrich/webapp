import { EzBadParamException } from '/ezlibrary/exceptions/EzBadParamException.js';

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

import { EzACSHeaderFieldName } from '/secure/integrations/acs/EzACSHeaderFieldName.js';
import { EzACSIntegrationSetupResponse } from '/secure/integrations/acs/EzACSIntegrationSetupResponse.js';
import { EzACSIntegrationSetupRequest } from '/secure/integrations/acs/EzACSIntegrationSetupRequest.js';
import { EzACSIntegrationSetupController } from '/secure/integrations/acs/EzACSIntegrationSetupController.js';

/**
    @public
    View for the copy schedule forward feature on the ezClocker website for employers.
 */
export class EzACSIntegrationSetupDialog extends EzIntegrationSetupDialog {
    static ezInstance = null;
    static ezApiRegistrationState = null;

    static get ezApiName() {
        return 'ezACSIntegrationSetupDialog';
    }

    static get ezEventNames() {
        return {
            onReady: 'ezOn_EzACSIntegrationSetupDialog_Ready',
            onIntegrationSetupDialogVisible: 'ezOn_EzACSIntegrationSetupDialog_Visible',
            onIntegrationSetupDialogClose: 'ezOn_EzACSIntegrationSetupDialog_Closed',
            onIntegrationSetupDialogSubmitted: 'ezOn_EzACSIntegrationSetupDialog_Submitted',
            onIntegrationSetupDialogError: 'ezOn_EzACSIntegrationSetupDialog_Error',
            onIntegrationSetupDialogDataReady: 'ezOn_EzACSIntegrationSetupDialog_DataReady'
        };
    }


    static get ezCanRegister() {
        return 'PENDING' === EzACSIntegrationSetupDialog.ezApiRegistrationState &&
            Object.prototype.hasOwnProperty.call(globalThis, 'ezApi') &&
            globalThis.ezApi && globalThis.ezApi.ready &&

            globalThis.ezApi.ezclocker[EzEventEngine.ezApiName] &&
            globalThis.ezApi.ezclocker[EzEventEngine.ezApiName].ready &&

            globalThis.ezApi.ezclocker[EzUI.ezApiName] &&
            globalThis.ezApi.ezclocker[EzUI.ezApiName].ready &&

            globalThis.ezApi.ezclocker[EzDialog.ezApiName] &&
            globalThis.ezApi.ezclocker[EzDialog.ezApiName].ready;
    }

    static #ezRegistrator() {
        if (!EzACSIntegrationSetupDialog.ezCanRegister) {
            return false;
        }

        EzACSIntegrationSetupDialog.ezInstance = ezApi.ezRegisterNewApi(
            EzACSIntegrationSetupDialog,
            EzACSIntegrationSetupDialog.ezApiName);
        EzACSIntegrationSetupDialog.ezApiRegistrationState = 'REGISTERED';
        return true;
    }

    static {
        if (null == this.ezApiRegistrationState) {
            this.ezApiRegistrationState = 'PENDING';

            if (!this.#ezRegistrator()) {
                document.addEventListener(
                    'onEzApiReady',
                    () => {
                        if (!this.#ezRegistrator()) {
                            document.addEventListener(
                                EzEventEngine.ezEventNames.onReady,
                                this.#ezRegistrator);

                            document.addEventListener(
                                EzUI.ezEventNames.onReady,
                                this.#ezRegistrator);

                            document.addEventListener(
                                EzDialog.ezEventNames.onReady,
                                this.#ezRegistrator);
                        }
                    });
            }
        }
    }

    constructor() {
        super(
            // ezIntegrationProviderId
            EzIntegrationProviderId.ACS_TECHNOLOGIES,
            // controllerRef
            new EzACSIntegrationSetupController());

        this.ezDialogId = 'EzACSIntegrationSetupDialog';

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
     */
    get ezIntegrationEmployeeMapFieldDisplayName() {
        return `${this.ezIntegrationName} File Number`;
    }

    /**
        @override
     */
    get ezIntegrationPayRateMapFieldDisplayName() {
        return `${this.ezIntegrationName} Pay rate mapping not supported`;
    }

    /**
        @override
     */
    get ezIntegrationJobMapFieldDisplayName() {
        return `${this.ezIntegrationName} Job mapping not supported`;
    }

    /**
        @override
        @protected @method
        Initializes EzACSIntegrationSetupDialog
     */
    ezInit() {
        super.ezInit();

        ezApi.ezclocker.ezEventEngine.ezRegisterEvent(
            EzACSIntegrationSetupDialog.ezApiName,
            EzACSIntegrationSetupDialog.ezEventNames.onIntegrationSetupDialogVisible);

        ezApi.ezclocker.ezEventEngine.ezRegisterEvent(
            EzACSIntegrationSetupDialog.ezApiName,
            EzACSIntegrationSetupDialog.ezEventNames.onIntegrationSetupDialogClose);

        ezApi.ezclocker.ezEventEngine.ezRegisterEvent(
            EzACSIntegrationSetupDialog.ezApiName,
            EzACSIntegrationSetupDialog.ezEventNames.onIntegrationSetupDialogSubmitted);

        ezApi.ezclocker.ezEventEngine.ezRegisterEvent(
            EzACSIntegrationSetupDialog.ezApiName,
            EzACSIntegrationSetupDialog.ezEventNames.onIntegrationSetupDialogError);

        ezApi.ezclocker.ezEventEngine.ezRegisterEvent(
            EzACSIntegrationSetupDialog.ezApiName,
            EzACSIntegrationSetupDialog.ezEventNames.onIntegrationSetupDialogDataReady);

        return EzACSIntegrationSetupDialog.ezInstance;
    }

    /**
        @override
        @protected @method
        Initializes the ezUxIds property for the class instance
     */
    ezInitUxIds() {
        super.ezInitUxIds();

        EzACSIntegrationSetupDialog.ezInstance.ezUxIds.elementIds.ezErrorMessageContainerId =
            `${EzACSIntegrationSetupDialog.ezInstance.ezUxIdsProperty.ezDialogId}_ValidationErrorContainer`;

        EzACSIntegrationSetupDialog.ezInstance.ezUxIds.elementIds.ezErrorMessageId =
            `${EzACSIntegrationSetupDialog.ezInstance.ezUxIdsProperty.ezDialogId}_EzValidationErrorMessage`;
    }

    /**
        @override
        @protected @method
        Initializes the EzACSIntegrationSetupDialog UX
     */
    ezInitUX() {
        super.ezInitUX();

        EzACSIntegrationSetupDialog.ezInstance.ezBuildTabViews();

        ezApi.ezclocker.ezUi.ezPrependContent(
            EzACSIntegrationSetupDialog.ezInstance.ezUxIds.parentIds.ezContentParentId,
            EzACSIntegrationSetupDialog.ezInstance.ezBuildFullscreenHtml());

        ezApi.ezclocker.ezEventEngine.ezWantElementEvent(
            EzACSIntegrationSetupDialog.ezInstance.ezUxIds.parentIds.ezFullScreenOkButtonId,
            EzElementEventName.CLICK,
            EzACSIntegrationSetupDialog.ezApiName,
            EzACSIntegrationSetupDialog.ezInstance.ezSubmit);

        ezApi.ezclocker.ezUi.ezAppendContent(
            EzACSIntegrationSetupDialog.ezInstance.ezUxIds.parentIds.ezDialogParentContainerId,
            EzACSIntegrationSetupDialog.ezInstance.ezBuildDialogHtml());

        EzACSIntegrationSetupDialog.ezInstance.ezInitDialog();

        EzACSIntegrationSetupDialog.ezInstance.ezSupportedMappings.forEach(
            (ezIntegrationMappingViewType) => ezApi.ezclocker.ezEventEngine.ezWantElementEvent(
                EzACSIntegrationSetupDialog.ezInstance.ezTabIds[ezIntegrationMappingViewType],
                EzElementEventName.CLICK,
                EzACSIntegrationSetupDialog.ezApiName,
                EzACSIntegrationSetupDialog.ezInstance.ezHandleTabClick));
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
                    EzACSIntegrationSetupDialog.ezEventNames.onIntegrationSetupDialogDataReady,
                    EzACSIntegrationSetupDialog.ezApiName));
    }

    /**
        @protected @method
        Resets the dialog's state and data to the initial values.
     */
    ezResetDialog() {
        EzACSIntegrationSetupDialog.ezInstance.ezJobCodesById = {};
        EzACSIntegrationSetupDialog.ezInstance.ezJobCodes = [];
        EzACSIntegrationSetupDialog.ezInstance.ezIntegrationResponse = null;
        EzACSIntegrationSetupDialog.ezInstance.ezIntegrationSetupDialogDisplayMode = EzIntegrationSetupDialogDisplayMode.DIALOG;

        ezApi.ezclocker.ezUi.ezHideElement(EzACSIntegrationSetupDialog.ezInstance.ezUxIds.elementIds.ezErrorMessageContainerId);
        ezApi.ezclocker.ezUi.ezContent(EzACSIntegrationSetupDialog.ezInstance.ezUxIds.elementIds.ezErrorMessageId, '');
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
            `Loading ${EzACSIntegrationSetupDialog.ezInstance.ezIntegrationName} configuration ...`,
            (waitDone) => {
                ezApi.ezclocker.ezEventEngine.ezWantEvent(
                    EzACSIntegrationSetupDialog.ezEventNames.onIntegrationSetupDialogDataReady,
                    EzACSIntegrationSetupDialog.ezApiName, () => {
                        EzACSIntegrationSetupDialog.ezInstance.ezUpdateDialogHeaderValues();

                        EzACSIntegrationSetupDialog.ezInstance.ezBuildSupportedMappingViews();

                        EzACSIntegrationSetupDialog.ezInstance.ezShowDialogInMode();
                        waitDone();
                    });

                EzACSIntegrationSetupDialog.ezInstance.ezInitData();
            });
    }

    /**
        @protected @method
        Shows the dialog in the specified mode (FULL_SCREEN or DIALOG)
     */
    ezShowDialogInMode() {
        if ('FULL_SCREEN' === EzACSIntegrationSetupDialog.ezInstance.ezIntegrationSetupDialogDisplayMode) {
            let dialogElement = ezApi.ezclocker.ezUi.ezFindByElementOrId(EzACSIntegrationSetupDialog.ezInstance.ezDialogId);
            if (EzACSIntegrationSetupDialog.ezInstance.ezFullScreenParentId !== dialogElement.parentElement.id) {
                ezApi.ezclocker.ezUi.ezReparentElement(
                    `${EzACSIntegrationSetupDialog.ezInstance.ezDialogId}_DialogContent`,
                    EzACSIntegrationSetupDialog.ezInstance.ezFullScreenContentId);
            }

            EzACSIntegrationSetupDialog.ezInstance.ezActivateTab(EzIntegrationMappingViewType.EMPLOYEE_MAPPING);

            ezApi.ezclocker.ezUi.ezHideElementAnimated(
                EzACSIntegrationSetupDialog.ezInstance.ezContentId,
                'slideOutLeft')
                .then(() => ezApi.ezclocker.ezUi.ezShowElementAnimated(
                    EzACSIntegrationSetupDialog.ezInstance.ezFullScreenParentId,
                    //'animate__slideInDown',
                    'slideInRight',
                    'grid'))
                .then(() => {
                    ezApi.ezclocker.ezEventEngine.ezTriggerEvent(
                        EzACSIntegrationSetupDialog.ezEventNames.onIntegrationSetupDialogVisible,
                        EzACSIntegrationSetupDialog.ezInstance);
                });
        } else {
            let dialogElement = ezApi.ezclocker.ezUi.ezFindByElementOrId(EzACSIntegrationSetupDialog.ezInstance.ezDialogId);
            if (EzACSIntegrationSetupDialog.ezInstance.ezDialogId !== dialogElement.parentElement.id) {
                ezApi.ezclocker.ezUi.ezReparentElement(
                    ezApi.ezIdTemplate`${EzACSIntegrationSetupDialog.ezInstance.ezDialogId}_DialogContent`,
                    EzACSIntegrationSetupDialog.ezInstance.ezDialogId);
            }

            ezApi.ezclocker.ezDialog.ezShowDialog(EzACSIntegrationSetupDialog.ezInstance.ezDialogId).then(() => {
                EzACSIntegrationSetupDialog.ezInstance.ezActivateTab(EzIntegrationMappingViewType.EMPLOYEE_MAPPING);

                ezApi.ezclocker.ezEventEngine.ezTriggerEvent(
                    EzACSIntegrationSetupDialog.ezEventNames.onIntegrationSetupDialogVisible,
                    EzACSIntegrationSetupDialog.ezInstance);
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

        if ('FULL_SCREEN' === EzACSIntegrationSetupDialog.ezInstance.ezIntegrationSetupDialogDisplayMode) {
            ezApi.ezclocker.ezUi.ezHideElementAnimated(
                EzACSIntegrationSetupDialog.ezInstance.ezFullScreenParentId,
                'slideOutRight')
                .then(() => ezApi.ezclocker.ezUi.ezShowElementAnimated(
                    EzACSIntegrationSetupDialog.ezInstance.ezContentId,
                    'slideInLeft'));

        } else {
            ezApi.ezclocker.ezDialog.ezCloseDialog(EzACSIntegrationSetupDialog.ezInstance.ezDialogId);
        }

        ezApi.ezclocker.ezEventEngine.ezTriggerEvent(
            EzACSIntegrationSetupDialog.ezEventNames.onIntegrationSetupDialogClose,
            EzACSIntegrationSetupDialog.ezInstance);

        if (ezApi.ezIsFunction(EzACSIntegrationSetupDialog.ezInstance.ezCloseCallback)) {
            EzACSIntegrationSetupDialog.ezInstance.ezCloseCallback();
        }

        EzACSIntegrationSetupDialog.ezInstance.ezResetDialog();
		ezApi.ezclocker.nav.ezNavigateToEmployerIntegrationsPage()
    }

    /**
        @protected @method
        Validates the EzACSIntegrationSetupRequest configuration
        @param {EzACSIntegrationSetupRequest} ezACSIntegrationSetupRequest
     */
    ezValidateConfiguration(ezACSIntegrationSetupRequest) {
        if (!ezApi.ezIsValid(ezACSIntegrationSetupRequest)) {
            throw new EzBadParamException(
                'ezACSIntegrationSetupRequest',
                EzACSIntegrationSetupDialog.ezInstance,
                EzACSIntegrationSetupDialog.ezInstance.ezValidateConfiguration);
        }

        let validationSuccess = !EzACSIntegrationSetupDialog.ezInstance.ezDuplicateEmployeeMapIdDetected;

        if (ezApi.ezIsTrue(validationSuccess)) {
            EzACSIntegrationSetupDialog.ezInstance.ezHideValidationError(
                EzACSIntegrationSetupDialog.ezInstance.ezHeaderInputIds.ezPayChexClientIdInputId,
                EzIntegrationMappingViewType.EMPLOYEE_MAPPING);
            EzACSIntegrationSetupDialog.ezInstance.ezHideValidationError(
                null,
                EzIntegrationMappingViewType.PAY_RATE_MAPPING);
            EzACSIntegrationSetupDialog.ezInstance.ezHideValidationError(
                null,
                EzIntegrationMappingViewType.JOB_MAPPING);
        }

        if (!ezACSIntegrationSetupRequest.ezHasEmployeeMappings()) {
            EzACSIntegrationSetupDialog.ezInstance.ezShowValidationError('You must map at least one employee.');
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
        let ezACSIntegrationSetupRequest = new EzACSIntegrationSetupRequest(
            ezApi.ezclocker.ezUi.ezIsCheckBoxChecked(EzACSIntegrationSetupDialog.ezInstance.ezHeaderInputIds.ezIntegrationEnableInputId));

        EzACSIntegrationSetupDialog.ezInstance.ezApplySupportedMappingsToRequest(ezACSIntegrationSetupRequest);

        if (ezApi.ezIsFalse(EzACSIntegrationSetupDialog.ezInstance.ezValidateConfiguration(ezACSIntegrationSetupRequest))) {
            return;
        }

        ezApi.ezclocker.ezUi.ezPageWaitExecute(
            `Saving ${EzACSIntegrationSetupDialog.ezInstance.ezIntegrationName} integration configuration ...`,
            (waitDone) => EzACSIntegrationSetupDialog.ezInstance.ezController.ezSaveIntegrationSetup(
                EzACSIntegrationSetupDialog.ezInstance.ezIntegrationProviderId,
                ezACSIntegrationSetupRequest)
                .then(
                    (response) => waitDone()
                        .then(() => {
                            ezApi.ezclocker.ezEventEngine.ezTriggerEvent(
                                EzACSIntegrationSetupDialog.ezEventNames.onIntegrationSetupDialogSubmitted,
                                response);

                            if (ezApi.ezIsTrue(ezACSIntegrationSetupRequest.ezEnableIntegration)) {
                                ezApi.ezclocker.ezDialog.ezShowMessage(
                                    EzACSIntegrationSetupDialog.ezInstance.ezDialogTitle,
                                    ezApi.ezMsg`You have successfully setup your ${EzACSIntegrationSetupDialog.ezInstance.ezIntegrationName} integration!`)
                                    .then(EzACSIntegrationSetupDialog.ezInstance.ezClose);
                            } else {
                                EzACSIntegrationSetupDialog.ezInstance.ezClose();
                            }
                        }),
                    (eResponse, jqXHR) => waitDone()
                        .then(() => {
                            ezApi.ezclocker.logger.error(ezApi.ezEM`
                                Failed ${EzACSIntegrationSetupDialog.ezInstance.ezIntegrationName} Integration. Error: ${ezApi.ezToJson(eResponse)}`);
                            waitDone();

                            ezApi.ezclocker.ezDialog.ezShowPossibleDefectError(ezApi.ezEM`
                                ${EzACSIntegrationSetupDialog.ezInstance.ezIntegrationName} Integration Setup Error`,
                                'Unable to save your ACS integration configuration at this time.',
                                jqXHR,
                                eResponse,
                                {
                                    url: ezApi.ezclocker.nav.ezGetInternalApiUrl(
                                        ezApi.ezUrlTemplate`integrations/${EzIntegrationProviderId.ACS}/acs`),
                                    payload: ezApi.ezToJson(ezACSIntegrationSetupRequest)
                                });

                            ezApi.ezclocker.ezEventEngine.ezTriggerEvent(
                                EzACSIntegrationSetupDialog.ezEventNames.onIntegrationSetupDialogError,
                                eResponse);
                        })));
    }

    /**
        Updates the dialog's header inputs with data from the saved configuration (if any)
     */
    ezUpdateDialogHeaderValues() {
        if (!ezApi.ezIsValid(EzACSIntegrationSetupDialog.ezInstance.ezIntegrationResponse)) {
            ezApi.ezclocker.ezUi.ezSetCheckboxValue(
                EzACSIntegrationSetupDialog.ezInstance.ezHeaderInputIds.ezIntegrationEnableInputId,
                false);
            return;
        }

        ezApi.ezclocker.ezUi.ezSetCheckboxValue(
            EzACSIntegrationSetupDialog.ezInstance.ezHeaderInputIds.ezIntegrationEnableInputId,
            ezApi.ezIsTrue(EzACSIntegrationSetupDialog.ezInstance.ezIntegrationResponse.ezEnableIntegration));
    }

    /**
        @protected
        Applies all the supported mappings to the setup request.
        @param {EzACSIntegrationSetupRequest} integrationSetupRequest
     */
    ezApplySupportedMappingsToRequest(integrationSetupRequest) {
        EzACSIntegrationSetupDialog.ezInstance.ezSupportedMappings.forEach(
            (ezIntegrationMappingViewType) => {
                switch (ezIntegrationMappingViewType) {
                    case EzIntegrationMappingViewType.EMPLOYEE_MAPPING:
                        EzACSIntegrationSetupDialog.ezInstance.ezApplyEmployeeMappings(integrationSetupRequest);
                        break;
                    case EzIntegrationMappingViewType.JOB_MAPPING:
                        EzACSIntegrationSetupDialog.ezInstance.ezApplyJobMappings(integrationSetupRequest);
                        break;
                    case EzIntegrationMappingViewType.PAY_RATE_MAPPING:
                        EzACSIntegrationSetupDialog.ezInstance.ezApplyPayTypeMappings(integrationSetupRequest);
                        break;
                    default:
                        ezApi.ezclocker.logger.error(ezApi.ezEM`
                            Integration mapping id ${ezIntegrationMappingViewType} is not currently supported in
                            ${EzACSIntegrationSetupDialog.ezInstance.ezIntegrationName}`);
                }
            });
    }

    /**
       Adds the employee mappings to the provided integrationSetupRequest
       @param {EzACSIntegrationSetupRequest} integrationSetupRequest
    */
    ezApplyEmployeeMappings(integrationSetupRequest) {
        if (!ezApi.ezIsValid(integrationSetupRequest)) {
            throw new EzBadParamException(
                'integrationSetupRequest',
                EzACSIntegrationSetupDialog.ezInstance,
                EzACSIntegrationSetupDialog.ezInstance.ezApplyEmployeeMappings);
        }

        let employees = ezApi.ezclocker.ezClockerContext.ezGetSelectedEmployerAccountEmployeeAccounts();

        if (!ezApi.ezArrayHasLength(employees)) {
            // No employees to map
            return;
        }

        let mapIds = [];

        EzACSIntegrationSetupDialog.ezInstance.ezDuplicateEmployeeMapIdDetected = false;

        employees.forEach(
            (employee) => {
                let employeeIdStr = employee.id.toString();
                let employeeMappingInputId = `${EzACSIntegrationSetupDialog.ezInstance.ezDialogId}_IntegrationEmployeeMappingInput_${employeeIdStr}`;

                if (ezApi.ezElementExists(employeeMappingInputId)) {
                    let providerEmployeeName = ezApi.ezclocker.ezUi.ezGetInputValue(employeeMappingInputId).trim();

                    if (ezApi.ezStringHasLength(providerEmployeeName)) {
                        if (0 <= mapIds.indexOf(providerEmployeeName.toLowerCase())) {
                            EzACSIntegrationSetupDialog.ezInstance.ezDuplicateEmployeeMapIdDetected = true;
                            EzACSIntegrationSetupDialog.ezInstance.ezShowValidationError(
                                ezApi.ezEM`
                                    One or more duplicate ${EzACSIntegrationSetupDialog.ezInstance.ezIntegrationEmployeeMapFieldDisplayName}s detected.
                                    All employee maps must have unique ${EzACSIntegrationSetupDialog.ezInstance.ezIntegrationEmployeeMapFieldDisplayName}s`,
                                employeeMappingInputId,
                                EzIntegrationMappingViewType.EMPLOYEE_MAPPING);
                        } else {
                            mapIds.push(providerEmployeeName.toLowerCase());
                        }

                        let ezEmployeeIntegrationMapRequest = EzACSIntegrationSetupDialog.ezInstance.ezGetCurrentMapInstance(employeeMappingInputId);

                        if (!ezApi.ezIsValid(ezEmployeeIntegrationMapRequest)) {
                            ezEmployeeIntegrationMapRequest = new EzEmployeeIntegrationMapRequest();
                        }

                        ezEmployeeIntegrationMapRequest.ezEmployerId = employee.employerId;
                        ezEmployeeIntegrationMapRequest.ezEmployeeId = employee.id;
                        ezEmployeeIntegrationMapRequest.ezEmployerIntegrationMapId = '';
                        ezEmployeeIntegrationMapRequest.ezIntegrationProviderId = EzIntegrationProviderId.ACS;
                        ezEmployeeIntegrationMapRequest.mappedByUserId = ezApi.ezclocker.ezClockerContext.ezGetUserContext().userAccount.id;

                        ezEmployeeIntegrationMapRequest.providerConnectionId = ezApi.ezclocker.ezUi.ezGetInputValue(employeeMappingInputId);
                        ezEmployeeIntegrationMapRequest.providerEmployeeId = ezApi.ezclocker.ezUi.ezGetInputValue(employeeMappingInputId);
                        ezEmployeeIntegrationMapRequest.providerEmployeeName = ezApi.ezclocker.ezUi.ezGetInputValue(employeeMappingInputId);
                        ezEmployeeIntegrationMapRequest.integrationEmployeeFirstName = '';
                        ezEmployeeIntegrationMapRequest.integrationEmployeeLastName = '';

                        integrationSetupRequest.ezAddEzEmployeeIntegrationMapRequest(ezEmployeeIntegrationMapRequest);
                    }
                }
            });
    }

    /**
        Adds the job mappings to the provided integrationSetupRequest
        @param {EzACSIntegrationSetupRequest} integrationSetupRequest
     */
    ezApplyJobMappings(integrationSetupRequest) {
        if (!ezApi.ezIsValid(integrationSetupRequest)) {
            throw new EzBadParamException(
                'integrationSetupRequest',
                EzACSIntegrationSetupDialog.ezInstance,
                EzACSIntegrationSetupDialog.ezInstance.ezHandleTabClick);
        }

        for (let prop in EzACSIntegrationSetupDialog.ezInstance.ezJobCodesById) {

            let jobCode = EzACSIntegrationSetupDialog.ezInstance.ezJobCodesById[prop];

            let inputId = `${EzACSIntegrationSetupDialog.ezInstance.ezDialogId}_DataTagMappingInput_${jobCode.id.toString()}`;

            if (ezApi.ezclocker.ezUi.ezElementExists(inputId)) {
                let ezIntegrationDataTag = ezApi.ezclocker.ezUi.ezGetInputValue(inputId).trim();

                if (ezApi.ezStringHasLength(ezIntegrationDataTag)) {
                    let dataTagIntegrationMapRequest = EzACSIntegrationSetupDialog.ezInstance.ezGetCurrentMapInstance(inputId);

                    if (ezApi.ezIsNotValid(dataTagIntegrationMapRequest)) {
                        dataTagIntegrationMapRequest = new DataTagIntegrationMapRequest();
                    }

                    dataTagIntegrationMapRequest.ezIntegrationproviderId = '';
                    dataTagIntegrationMapRequest.ezUserId = ezApi.ezclocker.ezClockerContext.ezGetUserContext().userAccount.id;
                    dataTagIntegrationMapRequest.ezEmployerId = ezApi.ezclocker.ezClockerContext.ezGetSelectedEmployerAccount().id;
                    dataTagIntegrationMapRequest.ezIntegrationProviderId = EzIntegrationProviderId.ACS;
                    dataTagIntegrationMapRequest.ezClockerDataTagId = jobCode.id;
                    dataTagIntegrationMapRequest.ezContextId = '';
                    dataTagIntegrationMapRequest.ezIntegrationDataTag = ezIntegrationDataTag;

                    integrationSetupRequest.ezAddDataTagIntegrationMapRequest(dataTagIntegrationMapRequest);
                }
            }
        }
    }

    /**
        Adds the pay type mappings to the provided integrationSetupRequest
        @param {EzACSIntegrationSetupRequest} integrationSetupRequest
     */
    ezApplyPayTypeMappings(integrationSetupRequest) {
        if (!ezApi.ezIsValid(integrationSetupRequest)) {
            throw new EzBadParamException(
                'integrationSetupRequest',
                EzACSIntegrationSetupDialog.ezInstance,
                EzACSIntegrationSetupDialog.ezInstance.ezApplyPayTypeMappings);
        }

        EzACSIntegrationSetupDialog.ezInstance.ezSupportedEzClockerPayRateTypes.forEach(
            (ezClockerPayRateType) => {
                let inputId = `${EzACSIntegrationSetupDialog.ezInstance.ezDialogId}_PayRateMappingInput_${ezClockerPayRateType}`;

                if (ezApi.ezclocker.ezUi.ezElementExists(inputId)) {
                    let ezIntegrationPayRateType = ezApi.ezclocker.ezUi.ezGetInputValue(inputId).trim();

                    if (ezApi.ezStringHasLength(ezIntegrationPayRateType)) {
                        let payRateIntegrationMapRequest = EzACSIntegrationSetupDialog.ezInstance.ezGetCurrentMapInstance(inputId);
                        if (ezApi.ezIsNotValid(payRateIntegrationMapRequest)) {
                            payRateIntegrationMapRequest = new PayRateIntegrationMapRequest();
                        }

                        payRateIntegrationMapRequest.ezEmployerId = ezApi.ezclocker.ezClockerContext.ezGetSelectedEmployerAccount().id;
                        payRateIntegrationMapRequest.ezUserId = ezApi.ezclocker.ezClockerContext.ezGetUserContext().userAccount.id;
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
        @protected
        Removes the normal styles and applies the validation error styles to the provided tabId
        @param {EzIntegrationMappingViewType} ezIntegrationMappingViewType
     */
    ezApplyErrorTab(ezIntegrationMappingViewType) {
        if (!ezApi.ezStringHasLength(ezIntegrationMappingViewType) ||
            !ezApi.ezHasOwnProperty(EzACSIntegrationSetupDialog.ezInstance.ezTabIds, ezIntegrationMappingViewType)) {
            return;
        }

        let tabId = EzACSIntegrationSetupDialog.ezInstance.ezTabIds[ezIntegrationMappingViewType];

        ezApi.ezclocker.ezUi.ezSetElementDataAttributeValue(tabId, 'ezValidationError', 'true');

        if (ezIntegrationMappingViewType === EzACSIntegrationSetupDialog.ezInstance.ezActiveIntegrationMappingViewType) {
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
        @protected
        Removes validation error styles and applies the normal styles to the provided tabId
        @param {EzIntegrationMappingViewType} ezIntegrationMappingViewType
     */
    ezApplyNormalTab(ezIntegrationMappingViewType) {
        if (!ezApi.ezStringHasLength(ezIntegrationMappingViewType) ||
            !ezApi.ezHasOwnProperty(EzACSIntegrationSetupDialog.ezInstance.ezTabIds, ezIntegrationMappingViewType)) {
            return;
        }

        let tabId = EzACSIntegrationSetupDialog.ezInstance.ezTabIds[ezIntegrationMappingViewType];

        ezApi.ezclocker.ezUi.ezSetElementDataAttributeValue(tabId, 'ezValidationError', 'false');

        if (ezIntegrationMappingViewType === EzACSIntegrationSetupDialog.ezInstance.ezActiveIntegrationMappingViewType) {
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
       @protected
       Sets the tag associated with the provided aTabIdToActive as active.
       @param {String} ezIntegrationMappingViewType
    */
    ezActivateTab(ezIntegrationMappingViewType) {
        if (!ezApi.ezStringHasLength(ezIntegrationMappingViewType)) {
            throw new EzBadParamException(
                'ezIntegrationMappingViewType',
                EzACSIntegrationSetupDialog.ezInstance,
                EzACSIntegrationSetupDialog.ezInstance.ezActivateTab);
        }

        if (!ezApi.ezHasOwnProperty(EzACSIntegrationSetupDialog.ezInstance.ezTabs, ezIntegrationMappingViewType)) {
            throw ezApi.ezException(M`Tab with id=${ezIntegrationMappingViewType} does not exist.`);
        }

        if (ezIntegrationMappingViewType === EzACSIntegrationSetupDialog.ezInstance.ezActiveIntegrationMappingViewType) {
            // already active
            return;
        }

        let previouslyActiveIntegrationMappingViewType = EzACSIntegrationSetupDialog.ezInstance.ezActiveIntegrationMappingViewType;

        EzACSIntegrationSetupDialog.ezInstance.ezActiveIntegrationMappingViewType = ezIntegrationMappingViewType;

        if (ezApi.ezStringHasLength(previouslyActiveIntegrationMappingViewType) &&
            EzIntegrationMappingViewType.UNKNOWN !== previouslyActiveIntegrationMappingViewType) {
            // Deactivate current tab
            ezApi.ezclocker.ezUi.ezHideElement(EzACSIntegrationSetupDialog.ezInstance.ezTabs[previouslyActiveIntegrationMappingViewType].tabViewId);

            let previousTabId = EzACSIntegrationSetupDialog.ezInstance.ezTabIds[previouslyActiveIntegrationMappingViewType];

            ezApi.ezclocker.ezUi.ezSetElementDataAttributeValue(previousTabId, 'active', 'false');

            if ('true' === ezApi.ezclocker.ezUi.ezGetElementDataAttributeValue(previousTabId, 'ezValidationError')) {
                EzACSIntegrationSetupDialog.ezInstance.ezApplyErrorTab(previouslyActiveIntegrationMappingViewType);
            } else {
                EzACSIntegrationSetupDialog.ezInstance.ezApplyNormalTab(previouslyActiveIntegrationMappingViewType);
            }

            EzACSIntegrationSetupDialog.ezInstance.ezTabs[previouslyActiveIntegrationMappingViewType].active = false;
        }

        // Activate the new tab
        let tabId = EzACSIntegrationSetupDialog.ezInstance.ezTabIds[EzACSIntegrationSetupDialog.ezInstance.ezActiveIntegrationMappingViewType];

        EzACSIntegrationSetupDialog.ezInstance.ezTabs[EzACSIntegrationSetupDialog.ezInstance.ezActiveIntegrationMappingViewType].active = true;

        ezApi.ezclocker.ezUi.ezSetElementDataAttributeValue(tabId, 'active', 'true');

        if ('true' === ezApi.ezclocker.ezUi.ezGetElementDataAttributeValue(tabId, 'ezValidationError')) {
            EzACSIntegrationSetupDialog.ezInstance.ezApplyErrorTab(EzACSIntegrationSetupDialog.ezInstance.ezActiveIntegrationMappingViewType);
        } else {
            EzACSIntegrationSetupDialog.ezInstance.ezApplyNormalTab(EzACSIntegrationSetupDialog.ezInstance.ezActiveIntegrationMappingViewType);
        }

        EzACSIntegrationSetupDialog.ezInstance.ezShowTabHelp(ezIntegrationMappingViewType);

        // Display the tab's view
        ezApi.ezclocker.ezUi.ezShowElement(
            EzACSIntegrationSetupDialog.ezInstance.ezTabs[EzACSIntegrationSetupDialog.ezInstance.ezActiveIntegrationMappingViewType].tabViewId,
            'grid');
    }


    /**
        @protected
        Displays the help text for the activated tab
        @param {EzIntegrationMappingViewType} ezIntegrationMappingViewType
     */
    ezShowTabHelp(ezIntegrationMappingViewType) {
        switch (ezIntegrationMappingViewType) {
            case EzIntegrationMappingViewType.PAY_RATE_MAPPING:
                ezApi.ezclocker.ezUi.ezContent(
                    `${EzACSIntegrationSetupDialog.ezInstance.ezDialogId}_HelpTitle`,
                    'Pay Rate Mapping');
                ezApi.ezclocker.ezUi.ezContent(
                    `${EzACSIntegrationSetupDialog.ezInstance.ezDialogId}_IntegrationHelp`,
                    'Pay rate mapping is not supported by the ACS Technologies integration.');
                break;
            case EzIntegrationMappingViewType.JOB_MAPPING:
                ezApi.ezclocker.ezUi.ezContent(
                    `${EzACSIntegrationSetupDialog.ezInstance.ezDialogId}_HelpTitle`,
                    'Job Mapping');
                ezApi.ezclocker.ezUi.ezContent(
                    `${EzACSIntegrationSetupDialog.ezInstance.ezDialogId}_IntegrationHelp`,
                    'Job mapping is not supported by the ACS Technologies integration.');
                break;
            case EzIntegrationMappingViewType.EMPLOYEE_MAPPING:
            default:
                ezApi.ezclocker.ezUi.ezContent(
                    `${EzACSIntegrationSetupDialog.ezInstance.ezDialogId}_HelpTitle`,
                    'Employee Mapping');
                ezApi.ezclocker.ezUi.ezContent(
                    `${EzACSIntegrationSetupDialog.ezInstance.ezDialogId}_IntegrationHelp`,
                    ezApi.ezTemplate`
                        <p>
                            Next to each ezClocker employee name enter the corresponding ACS Technologies Employee Number.
                        </p>`);
                break;
        }
    }

    ezLoadIntegrationSetupConfiguration() {
        EzACSIntegrationSetupDialog.ezInstance.ezIntegrationResponse = null;

        return ezApi.ezResolver(
            (resolve) => EzACSIntegrationSetupDialog.ezInstance.ezController.ezGetIntegrationSetup(
                EzACSIntegrationSetupDialog.ezInstance.ezIntegrationProviderId)
                .then(
                    (response) => {
                        EzACSIntegrationSetupDialog.ezInstance.ezIntegrationResponse = response;
                        return resolve();
                    },
                    (eResponse) => {
                        ezApi.ezclocker.ezLogger.error(
                            ezApi.ezEM`
                                Failed to get existing ${EzACSIntegrationSetupDialog.ezInstance.ezIntegrationName} integration configuration.
                                Error: ${ezApi.ezToJson(eResponse)}`);

                        ezApi.ezclocker.ezDialog.ezShowPossibleDefectError(
                            `${EzACSIntegrationSetupDialog.ezInstance.ezIntegrationName} Integration Configuration Load Error`,
                            'Unable to get the existing ACS configuration at this time.',
                            ezApi.ezToJson(eResponse));
                        return resolve();
                    }));
    }

    ezLoadEmployerDataTags() {
        EzACSIntegrationSetupDialog.ezInstance.ezJobCodes = [];

        EzACSIntegrationSetupDialog.ezInstance.ezJobCodesById = null;

        return ezApi.ezResolver(
            (resolve) => ezApi.ezclocker.ezClockerContext.ezRefreshSelectedEmployerAvailableJobs()
                .then(
                    (response) => {
                        if (ezApi.ezArrayHasLength(response.availableJobs)) {
                            EzACSIntegrationSetupDialog.ezInstance.ezJobCodesById = response.availableJobsById;
                            EzACSIntegrationSetupDialog.ezInstance.ezJobCodes = response.availableJobs;
                        }

                        return resolve(EzACSIntegrationSetupDialog.ezInstance.ezJobCodes);
                    },
                    (eResponse) => {
                        ezApi.ezclocker.ezLogger.error(
                            ezApi.ezEM`
                                Failed to load the available jobs for the employ er.
                                Error: ${ezApi.ezToJson(eResponse)}`);

                        return ezApi.ezclocker.ezDialog.ezShowPossibleDefectError(
                            'Available Jobs Error',
                            'Unable to get the available Jobs for your employer at this time.',
                            ezApi.ezToJson(eResponse))
                            .then(eResponse);
                    }));
    }

    /**
     * Builds the export report dialog's HTML
     *
     * @returns {String}
     */
    ezBuildDialogHtml() {
        let tabsHtml = '';

        let tabsViewHtml = '';

        EzACSIntegrationSetupDialog.ezInstance.ezSupportedMappings.forEach(
            (ezIntegrationMappingViewType) => {
                if (ezApi.ezHasOwnProperty(EzACSIntegrationSetupDialog.ezInstance.ezTabs, ezIntegrationMappingViewType)) {

                    let ezTab = EzACSIntegrationSetupDialog.ezInstance.ezTabs[ezIntegrationMappingViewType];

                    let hideTabStyle = ezApi.ezIsFalse(ezTab.visible)
                        ? 'style="display:none"'
                        : '';

                    tabsHtml = ezApi.ezTemplate`${tabsHtml}
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

        let logoUrl = EzIntegrationProviderId.ezToIntegrationLogoUrl(EzIntegrationProviderId.ACS_TECHNOLOGIES);

        let logoText = EzIntegrationProviderId.ezToIntegrationLogoText(EzIntegrationProviderId.ACS_TECHNOLOGIES);

        return ezApi.ezTemplate`
            <div id="${EzACSIntegrationSetupDialog.ezInstance.ezDialogId}">
                <div id="${EzACSIntegrationSetupDialog.ezInstance.ezDialogId}_DialogContent" class="ez-white-borderless-box8 ezAutoRow_A_A">
                    <div id="${EzACSIntegrationSetupDialog.ezInstance.ezDialogId}_Header" class="ezContainer-integration-setup-header">
                        <div id="${EzACSIntegrationSetupDialog.ezInstance.ezDialogId}_Toptable" class="ezGridNoGap ezAutoCol_AxA">
                            <div class="ezContainer-integration-logo">
                                <img src="${logoUrl}" class="ezContainer-integration-logo-img-nosize"/>
                                ${logoText}
                            </div>
                            <div id="${EzACSIntegrationSetupDialog.ezInstance.ezDialogId}_HeaderEnabledContainer"
                                class="ezGrid-vertical-align-top ezGrid-align-right">
                                <label for="${EzACSIntegrationSetupDialog.ezInstance.ezHeaderInputIds.ezACSIntegrationEnableInputId}"
                                    class="ezInputLabel ezBold">
                                    <input id="${EzACSIntegrationSetupDialog.ezInstance.ezHeaderInputIds.ezIntegrationEnableInputId}"
                                        type="checkbox"/>
                                    ${EzACSHeaderFieldName.ezToDisplayValue(EzACSHeaderFieldName.INTEGRATION_ENABLED)}
                                </label>
                            </div>
                        </div>
                        <div style="height:10px;"></div>
                        <div id="${EzACSIntegrationSetupDialog.ezInstance.ezUxIds.elementIds.ezErrorMessageContainerId}"
                            class="ez-floating-error-container" style="display:none">
                            <div id="${EzACSIntegrationSetupDialog.ezInstance.ezUxIds.elementIds.ezErrorMessageId}"></div>
                        </div>
                    </div>
                    <div id="${EzACSIntegrationSetupDialog.ezInstance.ezDialogId}_SetupContainer"
                        class="ezSubContentView-no-border-no-scroll ezAutoCol_75xA">
                        <div id="${EzACSIntegrationSetupDialog.ezInstance.ezDialogId}_TabContainer" class="ezTabContainer">
                            <div id="${EzACSIntegrationSetupDialog.ezInstance.ezDialogId}_Tabs" class="ezTabsContainer">
                                ${tabsHtml}
                            </div>
                            <div id="${EzACSIntegrationSetupDialog.ezInstance.ezDialogId}_TabViews" class="ezSubContentView-no-border-no-scroll">
                                ${tabsViewHtml}
                            </div>
                        </div>
                        ${EzACSIntegrationSetupDialog.ezInstance.ezBuildTabHelpHtml()}
                    </div>
                </div>
            </div>`;
    }

    /**
        @protected
        Builds the integration tab's help html
        @returns {String}
     */
    ezBuildTabHelpHtml() {
        return ezApi.ezTemplate`
            <div id="${EzACSIntegrationSetupDialog.ezInstance.ezDialogId}_HelpContainer" class="ezContainer-side-help-box">
                <div class="ezContainer-side-help-box-title">
                    <img src="/public/images/integrations/help-navy.svg" class="ezContainer-side-help-box-img"/>
                    <lable id="${EzACSIntegrationSetupDialog.ezInstance.ezDialogId}_HelpTitle">Employee Mapping</label>
                </div>
                <div id="${EzACSIntegrationSetupDialog.ezInstance.ezDialogId}_IntegrationHelp" class="ezContainer-side-help-box-content">
                </div>
            </div>`;
    }

    /**
        @protected
        Builds the HTML for the 'full screen' mode of the setup dialog.
        @returns {String}
     */
    ezBuildFullscreenHtml() {
        return ezApi.ezTemplate`
            <div id="${EzACSIntegrationSetupDialog.ezInstance.ezFullScreenParentId}" class="ezContainer-full-screen-overlay" style="display:none">
                <div id="${EzACSIntegrationSetupDialog.ezInstance.ezFullScreenParentId}_ButtonBar" class="ezContainer-white-right-aligned-button-container">
                    <button id="${EzACSIntegrationSetupDialog.ezInstance.ezFullScreenOkButtonId}" class="ezDefaultNormalButton">Save</button>
                    <button id="${EzACSIntegrationSetupDialog.ezInstance.ezFullScreenCancelButtonId}" 
					  onclick="ezApi.ezclocker.nav.ezNavigateToEmployerIntegrationsPage()"
					class="ezNormalButton">Cancel</button>
                </div>
                <div id="${EzACSIntegrationSetupDialog.ezInstance.ezFullScreenContentId}" class="ezSubContentView-no-scroll ezPad8">
                </div>
            </div>`;
    }

    /**
        @protected
        Builds the views for each tab
     */
    ezBuildTabViews() {
        EzACSIntegrationSetupDialog.ezInstance.ezSupportedMappings.forEach((ezIntegrationMappingViewType) => {
            switch (ezIntegrationMappingViewType) {
                case EzIntegrationMappingViewType.EMPLOYEE_MAPPING:
                    EzACSIntegrationSetupDialog.ezInstance.ezTabs[ezIntegrationMappingViewType].ezView =
                        EzACSIntegrationSetupDialog.ezInstance.ezBuildEmployeeMappingTabView();
                    break;
                case EzIntegrationMappingViewType.JOB_MAPPING:
                    EzACSIntegrationSetupDialog.ezInstance.ezTabs[ezIntegrationMappingViewType].ezView =
                        EzACSIntegrationSetupDialog.ezInstance.ezBuildJobMappingTabView();
                    break;
                case EzIntegrationMappingViewType.PAY_RATE_MAPPING:
                    EzACSIntegrationSetupDialog.ezInstance.ezTabs[ezIntegrationMappingViewType].ezView =
                        EzACSIntegrationSetupDialog.ezInstance.ezBuildPayRateMappingTabView();
                    break;
                default:
                    ezApi.ezclocker.ezLogger.error(`Integration mapping type ${ezIntegrationMappingViewType} is not currently supported`);
            }
        });
    }

    /**
        @protected
        Builds the supported mapping views UX
     */
    ezBuildSupportedMappingViews() {
        EzACSIntegrationSetupDialog.ezInstance.ezSupportedMappings.forEach(
            (ezIntegrationMappingViewType) => {
                let buildMappingListFunction = null;
                switch (ezIntegrationMappingViewType) {
                    case EzIntegrationMappingViewType.EMPLOYEE_MAPPING:
                        buildMappingListFunction = EzACSIntegrationSetupDialog.ezInstance.ezBuildEmployeeMappingList;
                        break;
                    case EzIntegrationMappingViewType.PAY_RATE_MAPPING:
                        buildMappingListFunction = EzACSIntegrationSetupDialog.ezInstance.ezBuildPayRateMappingList;
                        break;
                    case EzIntegrationMappingViewType.JOB_MAPPING:
                        buildMappingListFunction = EzACSIntegrationSetupDialog.ezInstance.ezBuildJobMappingsList;
                        break;
                    default:
                        ezApi.ezclocker.logger.error(
                            ezApi.ezEM`Mapping view ${ezIntegrationMappingViewType} is not supported yet.`);
                }

                if (ezApi.ezIsFunction(buildMappingListFunction)) {
                    ezApi.ezclocker.ezUi.ezAppendContent(
                        `${EzACSIntegrationSetupDialog.ezInstance.ezViewIds[ezIntegrationMappingViewType]}_TableBody`,
                        buildMappingListFunction());
                }
            });
    }

    /**
        @protected
        Builds the tabs integration's employee mapping view
        @returns {String}
     */
    ezBuildEmployeeMappingTabView() {
        let viewId = EzACSIntegrationSetupDialog.ezInstance.ezViewIds[EzIntegrationMappingViewType.EMPLOYEE_MAPPING];
        return ezApi.ezTemplate`
            <div id="${viewId}" data-tabgroup="${EzACSIntegrationSetupDialog.ezInstance.ezIntegrationProviderId}_Tabs" class="ez-tab-view-container"
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
                                    ${EzACSIntegrationSetupDialog.ezInstance.ezIntegrationEmployeeMapFieldDisplayName}
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
        @protected
        Builds the employee mapping html
        @returns {String}
     */
    ezBuildEmployeeMappingList() {
        let viewId = EzACSIntegrationSetupDialog.ezInstance.ezViewIds[EzIntegrationMappingViewType.EMPLOYEE_MAPPING];
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

        let ezIntegrationResponse = ezApi.ezIsValid(EzACSIntegrationSetupDialog.ezInstance.ezIntegrationResponse)
            ? EzACSIntegrationSetupDialog.ezInstance.ezIntegrationResponse
            : new EzACSIntegrationSetupResponse();

        let employeeListHtml = '';
        employees.forEach((employee) => {
            let ezEmployeeIntegrationMapRequest =
                ezIntegrationResponse.ezGetEmployeeMappingForEmployeeId(employee.id);
            if (ezApi.ezIsValid(ezEmployeeIntegrationMapRequest)) {
                employeeListHtml += EzACSIntegrationSetupDialog.ezInstance.ezBuildEmployeeMappingRow(viewId, employee, ezEmployeeIntegrationMapRequest);
            } else {
                employeeListHtml += EzACSIntegrationSetupDialog.ezInstance.ezBuildEmployeeMappingRow(viewId, employee, null);
            }
        });

        return employeeListHtml;
    }

    /**
        @protected
        Builds the HTML for a employee mapping row
        @param {String} viewId
        @param {Object} employee
        @param {EzEmployeeIntegrationMapRequest|null} ezEmployeeIntegrationMapRequest
        @returns {String}
     */
    ezBuildEmployeeMappingRow(viewId, employee, ezEmployeeIntegrationMapRequest) {
        if (!ezApi.ezStringHasLength(viewId)) {
            throw new EzBadParamException(
                'viewId',
                EzACSIntegrationSetupDialog.ezInstance,
                EzACSIntegrationSetupDialog.ezInstance.ezBuildEmployeeMappingRow);
        }
        if (!ezApi.ezIsValid(employee)) {
            throw new EzBadParamException(
                'employee',
                EzACSIntegrationSetupDialog.ezInstance,
                EzACSIntegrationSetupDialog.ezInstance.ezBuildEmployeeMappingRow);
        }
        if (!ezApi.ezIsNumber(employee.id)) {
            throw new EzBadParamException(
                'employee.id',
                EzACSIntegrationSetupDialog.ezInstance,
                EzACSIntegrationSetupDialog.ezInstance.ezBuildEmployeeMappingRow);
        }
        if (!ezApi.ezStringHasLength(employee.employeeName)) {
            throw new EzBadParamException(
                'employee.employeeName',
                EzACSIntegrationSetupDialog.ezInstance,
                EzACSIntegrationSetupDialog.ezInstance.ezBuildEmployeeMappingRow);
        }

        let employeeIdStr = employee.id.toString();
        let mappingJson = '';
        let providerEmployeeName = '';

        if (ezApi.ezIsValid(ezEmployeeIntegrationMapRequest)) {
            mappingJson = ezApi.ezToJson(ezEmployeeIntegrationMapRequest);
            providerEmployeeName = ezApi.ezStringOrEmpty(ezEmployeeIntegrationMapRequest.providerEmployeeName);
        }

        let value = ezApi.ezStringHasLength(providerEmployeeName)
            ? `value="${providerEmployeeName}"`
            : '';

        let rowId = `${viewId}_TableBody_Mapping`;
        let inputId = `${EzACSIntegrationSetupDialog.ezInstance.ezDialogId}_IntegrationEmployeeMappingInput_${employeeIdStr}`;

        return ezApi.ezTemplate`
            <tr id="${rowId}Row_EzEmployee_${employeeIdStr}" class="ez-table-row" data-ezid="${employeeIdStr}">
                <td id="${rowId}Cell_EzEmployee_${employeeIdStr}_EmployeeName"
                    class="ez-table-cell ez-cell-align-middle-left" data-ezid="${employeeIdStr}">
                    ${employee.employeeName}
                </td>
                <td id="${rowId}Cell_EzEmployee_${employeeIdStr}_IntegrationEmployeeMap"
                    class="ez-table-cell ez-cell-align-middle-center" data-ezid="${employeeIdStr}">
                    <input id="${inputId}" type="text" class="ezFullWidthEditor" data-ezid="${employeeIdStr}"
                        name="${inputId}" autocomplete="${inputId}" data-mapping-json="${mappingJson}"
                        placeholder="enter ${EzACSIntegrationSetupDialog.ezInstance.ezIntegrationEmployeeMapFieldDisplayName}" ${value}/>
                </td>
            </tr>`;
    }

    /**
        @protected
        Builds the integration's Pay Rate mapping view
        NOTE: ACS does not currently support pay rate mapping
        @returns {String}
     */
    ezBuildPayRateMappingTabView() {
        let viewId = EzACSIntegrationSetupDialog.ezInstance.ezViewIds[EzIntegrationMappingViewType.PAY_RATE_MAPPING];

        return ezApi.ezTemplate`
            <div id="${viewId}" data-tabgroup="ACSIntegrationTabs" class="ez-tab-view-container"
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
                                    ${EzACSIntegrationSetupDialog.ezInstance.ezIntegrationPayRateMapFieldDisplayName}
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
        @protected
        Builds the Pay Rate mapping html
        @returns {String}
    */
    ezBuildPayRateMappingList() {
        let viewId = EzACSIntegrationSetupDialog.ezInstance.ezViewIds[EzIntegrationMappingViewType.PAY_RATE_MAPPING];

        ezApi.ezclocker.ezUi.ezClearContent(`${viewId}_TableBody`);

        let ezIntegrationResponse = ezApi.ezIsValid(EzACSIntegrationSetupDialog.ezInstance.ezIntegrationResponse)
            ? EzACSIntegrationSetupDialog.ezInstance.ezIntegrationResponse
            : new EzACSIntegrationSetupResponse();

        let payRateListHtml = '';

        EzACSIntegrationSetupDialog.ezInstance.ezSupportedEzClockerPayRateTypes.forEach(
            (payRateType) => {
                let payRateIntegrationMapRequest =
                    ezIntegrationResponse.ezGetPayRateIntegrationMapRequestForPayRateType(payRateType);
                if (ezApi.ezIsValid(payRateIntegrationMapRequest) &&
                    ezApi.ezStringHasLength(payRateIntegrationMapRequest.ezClockerPayRateType) &&
                    payRateType === payRateIntegrationMapRequest.ezClockerPayRateType) {
                    payRateListHtml += EzACSIntegrationSetupDialog.ezInstance.ezBuildPayRateRow(viewId, payRateType, payRateIntegrationMapRequest);
                } else {
                    payRateListHtml += EzACSIntegrationSetupDialog.ezInstance.ezBuildPayRateRow(viewId, payRateType, null);
                }
            });

        return payRateListHtml;
    }

    /**
        @protected
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
                EzACSIntegrationSetupDialog.ezInstance,
                EzACSIntegrationSetupDialog.ezInstance.ezBuildPayRateRow);
        }

        if (!ezApi.ezIsValid(ezClockerPayRateType)) {
            throw new EzBadParamException(
                'ezClockerPayRateType',
                EzACSIntegrationSetupDialog.ezInstance,
                EzACSIntegrationSetupDialog.ezInstance.ezBuildPayRateRow);
        }

        let mappingJson = '';

        let integrationPayRateCode = '';

        if (ezApi.ezIsValid(payRateIntegrationMapRequest)) {
            mappingJson = ezApi.ezToJson(payRateIntegrationMapRequest);
            integrationPayRateCode = ezApi.ezStringOrEmpty(payRateIntegrationMapRequest.integrationPayRateCode);
        }

        let value = ezApi.ezStringHasLength(integrationPayRateCode)
            ? `value="${integrationPayRateCode}"`
            : '';

        let rowId = `${viewId}_TableBody_Mapping`;

        let inputId = `${EzACSIntegrationSetupDialog.ezInstance.ezDialogId}_PayRateMappingInput_${ezClockerPayRateType}`;

        return ezApi.ezTemplate`
            <tr id="${rowId}Row_EzPayRateType_${ezClockerPayRateType}" class="ez-table-row"
                data-ezid="${ezClockerPayRateType}">
                <td id="${rowId}Cell_EzPayRateTypeDisplay_${ezClockerPayRateType}"
                    class="ez-table-cell ez-cell-align-middle-left" data-ezid="${ezClockerPayRateType}">
                    ${EzClockerPayRateType.ezToDisplayValue(ezClockerPayRateType)}
                </td>
                <td id="${rowId}Cell_PayRateMapping_${ezClockerPayRateType}"
                    class="ez-table-cell ez-cell-align-middle-center" data-ezid="${ezClockerPayRateType}">
                    <input id="inputId" type="text" class="ezFullWidthEditor" data-ezid="${ezClockerPayRateType}"
                        name="hidden" autocomplete="${inputId}" data-mappingJson="${mappingJson}"
                        placeholder="enter ${EzACSIntegrationSetupDialog.ezInstance.ezIntegrationPayRateMapFieldDisplayName}" ${value}/>
                </td>
            </tr>`;
    }

    /**
        @protected
        Builds the Job Mapping View for ACS
        NOTE: ACS does not currently support job mapping
        @returns {String}
     */
    ezBuildJobMappingTabView() {
        let viewId = EzACSIntegrationSetupDialog.ezInstance.ezViewIds[EzIntegrationMappingViewType.JOB_MAPPING];

        return ezApi.ezTemplate`
            <div id="${viewId}" data-tabgroup="ACSIntegrationTabs" class="ez-tab-view-container"
                style="display:none">
                <div id="${viewId}_ListDiv" class="ezContainer-integration-input-container">
                    <table id="${viewId}_Table" class="ez-table-full-width">
                        <thead id="${viewId}_TableHeader" class="ez-table-header">
                            <tr id="${viewId}_TableHeaderRow" class="ez-table-row">
                                <th id="${viewId}_TableHeaderCell_EzDataTag_TagName" class="ez-table-cell-header-fixed">
                                    EzClocker Jobs
                                </th>
                                <th id="${viewId}_TableHeaderCell_IntegrationJobMapping" class="ez-table-cell-header-fixed">
                                    ${EzACSIntegrationSetupDialog.ezInstance.ezIntegrationJobMapFieldDisplayName}
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
        @protected
        Builds the Job Mappings List HTML
        @returns {String}
     */
    ezBuildJobMappingsList() {
        let viewId = EzACSIntegrationSetupDialog.ezInstance.ezViewIds[EzIntegrationMappingViewType.JOB_MAPPING];

        ezApi.ezclocker.ezUi.ezClearContent(`${viewId}_TableBody`);

        if (!ezApi.ezArrayHasLength(EzACSIntegrationSetupDialog.ezInstance.ezJobCodes)) {
            return ezApi.ezTemplate`
                <tr id="${viewId}_TableBody_MappingRow_NowJobs" class="ez-table-row">
                    <td id="${viewId}_TableBody_MappingCell_NoJobs" class="ez-table-cell" colspan="2" >
                        No jobs available
                    </td>
                </tr>`;
        }

        let ezIntegrationResponse = ezApi.ezIsValid(EzACSIntegrationSetupDialog.ezInstance.ezIntegrationResponse)
            ? EzACSIntegrationSetupDialog.ezInstance.ezIntegrationResponse
            : new EzACSIntegrationSetupResponse();

        let jobsMappingHtml = '';

        for (let jobCode of EzACSIntegrationSetupDialog.ezInstance.ezJobCodes) {
            let dataTagIntegrationMapRequest = ezIntegrationResponse.ezGetDataTagMappingForDataTagId(jobCode.id);

            jobsMappingHtml += ezApi.ezIsValid(dataTagIntegrationMapRequest) &&
                ezApi.ezIsNumber(dataTagIntegrationMapRequest.id) &&
                ezApi.ezStringHasLength(dataTagIntegrationMapRequest.integrationDataTagId)
                ? EzACSIntegrationSetupDialog.ezInstance.ezBuildJobMappingRow(viewId, jobCode, dataTagIntegrationMapRequest)
                : EzACSIntegrationSetupDialog.ezInstance.ezBuildJobMappingRow(viewId, jobCode, null);
        }

        return jobsMappingHtml;
    }

    /**
        @protected
        Builds a job mapping row for the provided job code.
        @param {String} viewId
        @param {Number} dataTagId
        @param {EzDataTagIntegrationMapRequest|null} dataTagIntegrationMapRequest
     */
    ezBuildJobMappingRow(viewId, dataTag, dataTagIntegrationMapRequest) {
        if (!ezApi.ezStringHasLength(viewId)) {
            throw new EzBadParamException(
                'viewId',
                EzACSIntegrationSetupDialog.ezInstance,
                EzACSIntegrationSetupDialog.ezInstance.ezBuildPayRateRow);
        }
        if (!ezApi.ezIsValid(dataTag)) {
            throw new EzBadParamException(
                'dataTag',
                EzACSIntegrationSetupDialog.ezInstance,
                EzACSIntegrationSetupDialog.ezInstance.ezBuildPayRateRow);
        }
        if (!ezApi.ezIsNumber(dataTag.id)) {
            throw new EzBadParamException(
                'ataTag.id',
                EzACSIntegrationSetupDialog.ezInstance,
                EzACSIntegrationSetupDialog.ezInstance.ezBuildPayRateRow);
        }
        if (!ezApi.ezStringHasLength(dataTag.tagName)) {
            throw new EzBadParamException(
                'dataTag.tagNam',
                EzACSIntegrationSetupDialog.ezInstance,
                EzACSIntegrationSetupDialog.ezInstance.ezBuildPayRateRow);
        }

        let dataTagIdStr = dataTag.id.toString();
        let mappingJson = '';
        let integrationDataTagId = '';

        if (ezApi.ezIsValid(dataTagIntegrationMapRequest)) {
            mappingJson = ezApi.ezToJson(dataTagIntegrationMapRequest);
            integrationDataTagId = ezApi.ezStringOrEmpty(dataTagIntegrationMapRequest.integrationDataTagId);
        }

        let value = ezApi.ezStringHasLength(integrationDataTagId)
            ? ezApi.ezTemplate`value="${integrationDataTagId}"`
            : '';
        let rowId = `${viewId}_TableBody_Mapping`;
        let inputId = `${EzACSIntegrationSetupDialog.ezInstance.ezDialogId}_DataTagMappingInput_${dataTagIdStr}`;

        return ezApi.ezTemplate`
            <tr id="${rowId}_Row_DataTag_${dataTagIdStr}" class="ez-table-row" data-ezid="${dataTagIdStr}">
                <td id="${rowId}Cell_DataTag_${dataTagIdStr}_TagName"
                    class="ez-table-cell ez-cell-align-middle-left" data-ezid="${dataTagIdStr}">
                    ${dataTag.tagName}
                </td>
                <td id="${rowId}Cell_DataTag_${dataTagIdStr}_IntegrationDataTagMap"
                    class="ez-table-cell ez-cell-align-middle-center" data-ezid="${dataTagIdStr}">
                    <input id="${inputId}" type="text" class="ezFullWidthEditor" data-ezid="${dataTagIdStr}"
                        name="hidden" autocomplete="${inputId}" data-mapping-json="${mappingJson}"
                        placeholder="enter ${EzACSIntegrationSetupDialog.ezInstance.ezIntegrationJobMapFieldDisplayName}" ${value}/>
                </td>
            </tr>`;
    }

    /**
        @protected
        Builds additional resources tab view
        @returns {String}
     */
    ezBuildAdditionalResourcesTabView() {
        let viewId = EzACSIntegrationSetupDialog.ezInstance.ezViewIds[EzIntegrationMappingViewType.ADDITIONAL_RESOURCES];

        return ezApi.ezTemplate`
            <div id="${viewId}" data-tabgroup="ACSIntegrationTabs" class="ez-tab-view-container" style="display:none">
                <div id="${viewId}_ListDiv" class="ezContainer-integration-input-container">
                    <table id="${viewId}_Table" class="ez-table-full-width">
                        <thead id="${viewId}_TableHeader" class="ez-table-header">
                            <tr id="${viewId}_TableHeaderRow" class="ez-table-row">
                                <th id="${viewId}_TableHeaderCell_EzDataTag_TagName" class="ez-table-cell-header-fixed">
                                    Additional Help and Resources
                                </th>
                                <th id="${viewId}_TableHeaderCell_IntegrationJobMapping"
                                    class="ez-table-cell-header-fixed">
                                    ${EzACSIntegrationSetupDialog.ezInstance.ezIntegrationJobMapFieldDisplayName}
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
        @protected
        Handles the tab button clicks
        @param {Object} ezEvent
     */
    ezHandleTabClick(ezEvent) {
        if (!ezApi.ezIsValid(ezEvent) || !ezApi.ezIsValid(ezEvent.data.elementEvent)) {
            throw new EzBadParamException(
                'ezEvent',
                EzACSIntegrationSetupDialog.ezInstance,
                EzACSIntegrationSetupDialog.ezInstance.ezHandleTabClick);
        }

        if ('false' === ezApi.ezclocker.ezUi.ezGetElementDataAttributeValue(ezEvent.data.elementEvent.target, 'active')) {
            // Activate only if not already active
            EzACSIntegrationSetupDialog.ezInstance.ezActivateTab(
                ezApi.ezclocker.ezUi.ezGetElementDataAttributeValue(ezEvent.data.elementEvent.target, 'ezintegrationmappingviewtype'));
        }
    }

    /**
        @protected
        Handles the initial focus of the dialog
     */
    ezHandleInitialDialogFocus() {
        ezApi.ezclocker.ezUi.ezId(EzACSIntegrationSetupDialog.ezInstance.ezDialogId).off('focus');

        ezApi.ezclocker.ezUi.ezFocusElement(EzACSIntegrationSetupDialog.ezInstance.ezHeaderInputIds.ezIntegrationEnableInputId);

        EzACSIntegrationSetupDialog.ezInstance.ezSupportedMappings.forEach(
            (ezIntegrationMappingViewType) =>
                ezApi.ezclocker.ezUi.ezScrollTo(`${EzACSIntegrationSetupDialog.ezInstance.ezTabs[ezIntegrationMappingViewType].tabViewId}_ListDiv`, 0, 0));
    }

    /**
        @protected
        Shows the validation error box
        @param {String} em
        @param {String|Null} inputId
        @param {String|Null} tabId
    */
    ezShowValidationError(em, inputId, ezIntegrationMappingViewType) {
        if (ezApi.ezStringHasLength(inputId) && ezApi.ezclocker.ezUi.ezElementExists(inputId)) {
            ezApi.ezclocker.ezUi.ezAddElementClass(
                inputId,
                EzACSIntegrationSetupDialog.ezInstance.ezUxIds.classNames.ezInputValidationErrorClass);
        }

        if (ezApi.ezStringHasLength(ezIntegrationMappingViewType)) {
            EzACSIntegrationSetupDialog.ezInstance.ezApplyErrorTab(ezIntegrationMappingViewType);
        }

        if (ezApi.ezStringHasLength(em)) {
            ezApi.ezclocker.ezUi.ezContent(
                EzACSIntegrationSetupDialog.ezInstance.ezUxIds.elementIds.ezErrorMessageId,
                em);
            ezApi.ezclocker.ezUi.ezShowElement(EzACSIntegrationSetupDialog.ezInstance.ezUxIds.elementIds.ezErrorMessageContainerId);
        }
    }

    /**
        @protected
        Hides the validation error box.
        @param {String|Null} inputId
        @param {String|Null} tabId
     */
    ezHideValidationError(inputId, ezIntegrationMappingViewType) {
        if (ezApi.ezStringHasLength(inputId) && ezApi.ezclocker.ezUi.ezElementExists(inputId)) {
            ezApi.ezclocker.ezUi.ezRemoveElementClass(
                inputId,
                EzACSIntegrationSetupDialog.ezInstance.ezUxIds.classNames.ezInputValidationErrorClass);
        }

        if (ezApi.ezStringHasLength(ezIntegrationMappingViewType)) {
            EzACSIntegrationSetupDialog.ezInstance.ezApplyNormalTab(ezIntegrationMappingViewType);
        }

        if (ezApi.ezclocker.ezUi.ezIsElementVisible(EzACSIntegrationSetupDialog.ezInstance.ezUxIds.elementIds.ezErrorMessageContainerId)) {
            ezApi.ezclocker.ezUi.ezClearContent(EzACSIntegrationSetupDialog.ezInstance.ezUxIds.elementIds.ezErrorMessageId);
            ezApi.ezclocker.ezUi.ezHideElement(EzACSIntegrationSetupDialog.ezInstance.ezUxIds.elementIds.ezErrorMessageContainerId);
        }
    }
}
