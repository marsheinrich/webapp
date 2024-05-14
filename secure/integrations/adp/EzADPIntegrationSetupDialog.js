import { EzBadParamException } from '/ezlibrary/exceptions/EzBadParamException.js';

import {
    EzBoolean,
    EzString,
    EzHtml
} from '/ezlibrary/helpers/EzHelpers.js';

import {
    EzRegistrationState,
    EzElementEventName,
    EzClockerContextEventName,
    EzFeaturePackageId,
    EzIntegrationProviderId,
    EzIntegrationSetupDialogDisplayMode
} from '/ezlibrary/enums/EzEnumerations.js';

import { EzClockerPayRateType } from '/secure/integrations/EzClockerPayRateType.js';

import { EzEmployeeIntegrationMapRequest } from '/secure/integrations/entities/EzEmployeeIntegrationMapRequest.js';
import { DataTagIntegrationMapRequest } from '/secure/integrations/entities/DataTagIntegrationMapRequest.js';

import { EzIntegrationMappingViewType } from '/secure/integrations/EzIntegrationSetupDialog/EzIntegrationMappingViewType.js';
import { EzIntegrationSetupDialog } from '/secure/integrations/EzIntegrationSetupDialog/EzIntegrationSetupDialog.js';

import { EzADPHeaderFieldName } from '/secure/integrations/adp/EzADPHeaderFieldName.js';
import { EzADPIntegrationSetupDialogController } from '/secure/integrations/adp/EzADPIntegrationSetupDialogController.js';
import { EzADPIntegrationSetupResponse } from '/secure/integrations/adp/EzADPIntegrationSetupResponse.js';
import { EzADPIntegrationSetupRequest } from '/secure/integrations/adp/EzADPIntegrationSetupRequest.js';
import { PayRateIntegrationMapRequest } from '/secure/integrations/entities/PayRateIntegrationMapRequest.js';

/**
 * @class
 * @extends {EzIntegrationSetupDialog}
 * @description
 * View for the copy schedule forward feature on the ezClocker website for employers.
 */
export class EzADPIntegrationSetupDialog extends EzIntegrationSetupDialog {
    /**
     * @public @constructor
     * Creates a new instance of EzADPIntegrationSetupDialog
     */
    constructor() {
        super(
            EzIntegrationProviderId.ADP_WORKFORCE_NOW,
            new EzADPIntegrationSetupDialogController());

        this.ezDialogId = 'EzADPIntegrationSetupDialog';

        // Header input ids
        this.ezHeaderInputIds['ezAPDCompanyCodeInputId'] = EzADPHeaderFieldName.ezToInputId(EzADPHeaderFieldName.COMPANY_CODE);
        this.ezHeaderInputIds['ezADPBatchNumberInputId'] = EzADPHeaderFieldName.ezToInputId(EzADPHeaderFieldName.BATCH_NUMBER);

        this.ezSupportedMappings = [
            EzIntegrationMappingViewType.EMPLOYEE_MAPPING,
            EzIntegrationMappingViewType.JOB_MAPPING,
            EzIntegrationMappingViewType.HOURS_TYPE_MAPPING
        ];

        this.ezSupportedEzClockerPayRateTypes = [
            EzClockerPayRateType.PAID_SICK,
            EzClockerPayRateType.PAID_PTO,
            EzClockerPayRateType.PAID_HOLIDAY
        ];

        this.ezUnsupportedEzClockerPayRateTypes = [
            EzClockerPayRateType.UNKNOWN,
            EzClockerPayRateType.UNPAID
        ];

        // Tab button ids
        this.ezTabIds[EzIntegrationMappingViewType.EMPLOYEE_MAPPING] = ezApi.ezIdTemplate`
            ${this.ezDialogId}_
            ${EzIntegrationMappingViewType.ezToIdSuffix(EzIntegrationMappingViewType.EMPLOYEE_MAPPING)}_Button`;
        this.ezTabIds[EzIntegrationMappingViewType.JOB_MAPPING] = ezApi.ezIdTemplate`
            ${this.ezDialogId}_
            ${EzIntegrationMappingViewType.ezToIdSuffix(EzIntegrationMappingViewType.JOB_MAPPING)}_Button`;
        this.ezTabIds[EzIntegrationMappingViewType.HOURS_TYPE_MAPPING] = ezApi.ezIdTemplate`
            ${this.ezDialogId}_
            ${EzIntegrationMappingViewType.ezToIdSuffix(EzIntegrationMappingViewType.HOURS_TYPE_MAPPING)}_Button`;

        // Dialog tab view ids
        this.ezViewIds[EzIntegrationMappingViewType.EMPLOYEE_MAPPING] = ezApi.ezIdTemplate`
            ${this.ezDialogId}_
            ${EzIntegrationMappingViewType.ezToIdSuffix(EzIntegrationMappingViewType.EMPLOYEE_MAPPING)}_TabView`;
        this.ezViewIds[EzIntegrationMappingViewType.JOB_MAPPING] = ezApi.ezIdTemplate`
            ${this.ezDialogId}_
            ${EzIntegrationMappingViewType.ezToIdSuffix(EzIntegrationMappingViewType.JOB_MAPPING)}_TabView`;
        this.ezViewIds[EzIntegrationMappingViewType.HOURS_TYPE_MAPPING] = ezApi.ezIdTemplate`
            ${this.ezDialogId}_
            ${EzIntegrationMappingViewType.ezToIdSuffix(EzIntegrationMappingViewType.HOURS_TYPE_MAPPING)}_TabView`;

        // Setup the initial tab data
        this.ezTabs[EzIntegrationMappingViewType.EMPLOYEE_MAPPING] = {
            id: this.ezTabIds[EzIntegrationMappingViewType.EMPLOYEE_MAPPING],
            tabViewId: this.ezViewIds[EzIntegrationMappingViewType.EMPLOYEE_MAPPING],
            caption: EzIntegrationMappingViewType.ezToDisplayValue(EzIntegrationMappingViewType.EMPLOYEE_MAPPING),
            tabGroup: this.ezTabGroupName,
            visible: true,
            active: false,
            ezView: EzHtml.build`
                <div id="${this.ezViewIds[EzIntegrationMappingViewType.EMPLOYEE_MAPPING]}"
                    data-tabgroup="${this.ezTabGroupName}" class="ez-tab-view-container" style="display:none">
                </div>`
        };
        this.ezTabs[EzIntegrationMappingViewType.JOB_MAPPING] = {
            id: this.ezTabIds[EzIntegrationMappingViewType.JOB_MAPPING],
            tabViewId: this.ezViewIds[EzIntegrationMappingViewType.JOB_MAPPING],
            caption: EzIntegrationMappingViewType.ezToDisplayValue(EzIntegrationMappingViewType.JOB_MAPPING),
            tabGroup: this.ezTabGroupName,
            visible: true,
            active: false,
            ezView: EzHtml.build`
                <div id="${this.ezViewIds[EzIntegrationMappingViewType.JOB_MAPPING]}"
                    data-tabgroup="${this.ezTabGroupName}" class="ez-tab-view-container" style="display:none">
                </div>`
        };
        this.ezTabs[EzIntegrationMappingViewType.HOURS_TYPE_MAPPING] = {
            id: this.ezTabIds[EzIntegrationMappingViewType.HOURS_TYPE_MAPPING],
            tabViewId: this.ezViewIds[EzIntegrationMappingViewType.HOURS_TYPE_MAPPING],
            caption: EzIntegrationMappingViewType.ezToDisplayValue(EzIntegrationMappingViewType.HOURS_TYPE_MAPPING),
            tabGroup: this.ezTabGroupName,
            visible: true,
            active: false,
            ezView: EzHtml.build`
                <div id="${this.ezViewIds[EzIntegrationMappingViewType.HOURS_TYPE_MAPPING]}"
                    data-tabgroup="${this.ezTabGroupName}" class="ez-tab-view-container" style="display:none">
                </div>`
        };
    }

    /**
     * @override
     */
    get ezIntegrationEmployeeMapFieldDisplayName() {
        return `${this.ezIntegrationName} Employee`;
    }

    /**
     * @override
     */
    get ezIntegrationJobMapFieldDisplayName() {
        return `${this.ezIntegrationName} Department Code`;
    }

    /**
     * @override
     */
    get ezIntegrationHoursTypeMapFieldDisplayName() {
        return `${this.ezIntegrationName} Hour Types`;
    }

    /**
     * @override
     * @public @method
     * Initializes the ezUxIds property for the class instance
     * @returns {Object}
     * Returns the ezUxIds object to assign to this.ezUxIds
     */
    ezInitUxIds() {
        super.ezInitUxIds();

        EzADPIntegrationSetupDialog.ezInstance.ezUxIdsProperty.elementIds.ezErrorMessageContainerId =
            ezApi.ezIdTemplate`${EzADPIntegrationSetupDialog.ezInstance.ezUxIdsProperty.ezDialogId}_ValidationErrorContainer`;

        EzADPIntegrationSetupDialog.ezInstance.ezUxIdsProperty.elementIds.ezErrorMessageId = `${EzADPIntegrationSetupDialog.ezInstance.ezUxIdsProperty.ezDialogId}_EzValidationErrorMessage`;
    }

    /**
     * @override
     * @public @method
     * Initializes EzADPIntegrationSetupDialog
     */
    ezInit() {
        super.ezInit();

        ezApi.ezclocker.ezEventEngine.ezRegisterEvent(
            EzADPIntegrationSetupDialog.ezApiName,
            EzADPIntegrationSetupDialog.ezEventNames.onIntegrationSetupDialogVisible);

        ezApi.ezclocker.ezEventEngine.ezRegisterEvent(
            EzADPIntegrationSetupDialog.ezApiName,
            EzADPIntegrationSetupDialog.ezEventNames.onIntegrationSetupDialogClose);

        ezApi.ezclocker.ezEventEngine.ezRegisterEvent(
            EzADPIntegrationSetupDialog.ezApiName,
            EzADPIntegrationSetupDialog.ezEventNames.onIntegrationSetupDialogSubmitted);

        ezApi.ezclocker.ezEventEngine.ezRegisterEvent(
            EzADPIntegrationSetupDialog.ezApiName,
            EzADPIntegrationSetupDialog.ezEventNames.onIntegrationSetupDialogError);

        ezApi.ezclocker.ezEventEngine.ezRegisterEvent(
            EzADPIntegrationSetupDialog.ezApiName,
            EzADPIntegrationSetupDialog.ezEventNames.onIntegrationSetupDialogDataReady);

        return EzADPIntegrationSetupDialog.ezInstance;
    }

    /**
     * @override
     * @public @method
     * Initializes the EzADPIntegrationSetupDialog UX
     */
    ezInitUX() {
        super.ezInitUX();

        ezApi.ezclocker.ezEventEngine.ezWantEvent(
            EzClockerContextEventName.onSelectedEmployerLicenseReady,
            EzADPIntegrationSetupDialog.ezApiName, () => {
                let activeEmployerLicense = ezApi.ezclocker.ezClockerContext.ezGetEmployerContext().selectedEmployerAccountLicense;

                const timeOffFeature = activeEmployerLicense.featurePackages.find(
                    (feature) => EzFeaturePackageId.TIME_OFF === feature.featurePackageId || EzFeaturePackageId.TIME_OFF_YEARLY === feature.featurePackageId);

                if (!timeOffFeature || (timeOffFeature && !timeOffFeature.enabled)) {
                    EzADPIntegrationSetupDialog.ezInstance.ezSupportedMappings = EzADPIntegrationSetupDialog.ezInstance.ezSupportedMappings.filter(
                        mapping => mapping !== EzIntegrationMappingViewType.HOURS_TYPE_MAPPING);
                }

                EzADPIntegrationSetupDialog.ezInstance.ezBuildTabViews();

                ezApi.ezclocker.ezUi.ezPrependContent(
                    EzADPIntegrationSetupDialog.ezInstance.ezUxIds.parentIds.ezContentParentId,
                    EzADPIntegrationSetupDialog.ezInstance.ezBuildFullscreenHtml());

                ezApi.ezclocker.ezEventEngine.ezWantElementEvent(
                    `${EzADPIntegrationSetupDialog.ezInstance.ezDialogId}_FullScreenOK`,
                    EzElementEventName.CLICK,
                    EzADPIntegrationSetupDialog.ezApiName,
                    EzADPIntegrationSetupDialog.ezInstance.ezSubmit);

                ezApi.ezclocker.ezUi.ezAppendContent(
                    EzADPIntegrationSetupDialog.ezInstance.ezUxIds.parentIds.ezDialogParentContainerId,
                    EzADPIntegrationSetupDialog.ezInstance.ezBuildDialogHtml());

                EzADPIntegrationSetupDialog.ezInstance.ezInitDialog();

                EzADPIntegrationSetupDialog.ezInstance.ezSupportedMappings.forEach(
                    (ezIntegrationMappingViewType) => ezApi.ezclocker.ezEventEngine.ezWantElementEvent(
                        EzADPIntegrationSetupDialog.ezInstance.ezTabIds[ezIntegrationMappingViewType],
                        EzElementEventName.CLICK,
                        EzADPIntegrationSetupDialog.ezApiName,
                        EzADPIntegrationSetupDialog.ezInstance.ezHandleTabClick)
                );
            });
    }

    /**
     * @override
     * @public @method
     * Initializes the dialog's data
     */
    ezInitData() {
        super.ezInitData()
            .then(
                () => ezApi.ezclocker.ezEventEngine.ezTriggerEvent(
                    EzADPIntegrationSetupDialog.ezEventNames.onIntegrationSetupDialogDataReady,
                    EzADPIntegrationSetupDialog.ezApiName));
    }

    /**
     * @public @method
     * Resets the dialog's state and data to the initial values.
     */
    ezResetDialog() {
        EzADPIntegrationSetupDialog.ezInstance.ezJobCodesById = {};
        EzADPIntegrationSetupDialog.ezInstance.ezJobCodes = [];
        EzADPIntegrationSetupDialog.ezInstance.ezIntegrationResponse = null;
        EzADPIntegrationSetupDialog.ezInstance.ezIntegrationSetupDialogDisplayMode = EzIntegrationSetupDialogDisplayMode.DIALOG;

        ezUi.ezHideElement(EzADPIntegrationSetupDialog.ezInstance.ezUxIds.elementIds.ezErrorMessageContainerId);
        ezUi.ezContent(EzADPIntegrationSetupDialog.ezInstance.ezUxIds.elementIds.ezErrorMessageId, EzString.EMPTY);
    }

    /**
     * @override
     * @public
     * Shows the view to the user
     * @param {EzIntegrationSetupDialogDisplayMode} ezIntegrationSetupDialogDisplayMode
     */
    ezShow(ezIntegrationSetupDialogDisplayMode, closeCallback) {
        super.ezShow(ezIntegrationSetupDialogDisplayMode, closeCallback);

        ezUi.ezPageWaitExecute(EzString.msg`Loading ${EzADPIntegrationSetupDialog.ezInstance.ezIntegrationName} configuration ...`,
            (waitDone) => {
                ezApi.ezclocker.ezEventEngine.ezWantEvent(
                    EzADPIntegrationSetupDialog.ezEventNames.onIntegrationSetupDialogDataReady,
                    EzADPIntegrationSetupDialog.ezApiName, () => {

                        EzADPIntegrationSetupDialog.ezInstance.ezUpdateDialogHeaderValues();

                        EzADPIntegrationSetupDialog.ezInstance.ezBuildSupportedMappingViews();

                        EzADPIntegrationSetupDialog.ezInstance.ezShowDialogInMode();
                        waitDone();
                    });

                EzADPIntegrationSetupDialog.ezInstance.ezInitData();
            });
    }

    /**
     * @public @method
     * Shows the dialog UX in the specified display mode
     */
    ezShowDialogInMode() {
        const self = ezApi.ezclocker[EzADPIntegrationSetupDialog.ezApiName];

        if ('FULL_SCREEN' === EzADPIntegrationSetupDialog.ezInstance.ezIntegrationSetupDialogDisplayMode) {
            let dialogElement = ezUi.ezFindByElementOrId(EzADPIntegrationSetupDialog.ezInstance.ezDialogId);
            if (EzADPIntegrationSetupDialog.ezInstance.ezFullScreenParentId !== dialogElement.parentElement.id) {
                ezUi.ezReparentElement(
                    `${EzADPIntegrationSetupDialog.ezInstance.ezDialogId}_DialogContent`,
                    EzADPIntegrationSetupDialog.ezInstance.ezFullScreenContentId);
            }

            EzADPIntegrationSetupDialog.ezInstance.ezActivateTab(EzIntegrationMappingViewType.EMPLOYEE_MAPPING);

            ezUi.ezHideElementAnimated(
                EzADPIntegrationSetupDialog.ezInstance.ezContentId,
                'slideOutLeft')
                .then(() => ezUi.ezShowElementAnimated(
                    EzADPIntegrationSetupDialog.ezInstance.ezFullScreenParentId,
                    'slideInRight',
                    'grid'))
                .then(() => {
                    ezApi.ezclocker.ezEventEngine.ezTriggerEvent(
                        EzADPIntegrationSetupDialog.ezEventNames.onIntegrationSetupDialogVisible,
                        self);
                });
        } else {
            let dialogElement = ezUi.ezFindByElementOrId(EzADPIntegrationSetupDialog.ezInstance.ezDialogId);
            if (EzADPIntegrationSetupDialog.ezInstance.ezDialogId !== dialogElement.parentElement.id) {
                ezUi.ezReparentElement(
                    ezApi.ezIdTemplate`${EzADPIntegrationSetupDialog.ezInstance.ezDialogId}_DialogContent`,
                    EzADPIntegrationSetupDialog.ezInstance.ezDialogId);
            }

            ezApi.ezclocker.ezDialog.ezShowDialog(EzADPIntegrationSetupDialog.ezInstance.ezDialogId).then(() => {
                EzADPIntegrationSetupDialog.ezInstance.ezActivateTab(EzIntegrationMappingViewType.EMPLOYEE_MAPPING);

                ezApi.ezclocker.ezEventEngine.ezTriggerEvent(
                    EzADPIntegrationSetupDialog.ezEventNames.onIntegrationSetupDialogVisible,
                    self);
            });
        }
    }

    /**
     * @override
     * @public @method
     * Closes the visible view
     */
    ezClose() {
        super.ezClose();

        if ('FULL_SCREEN' === EzADPIntegrationSetupDialog.ezInstance.ezIntegrationSetupDialogDisplayMode) {
            ezUi.ezHideElementAnimated(
                EzADPIntegrationSetupDialog.ezInstance.ezFullScreenParentId,
                'slideOutRight')
                .then(
                    () => ezUi.ezShowElementAnimated(
                        EzADPIntegrationSetupDialog.ezInstance.ezContentId,
                        'slideInLeft'));
        } else {
            ezApi.ezclocker.ezDialog.ezCloseDialog(EzADPIntegrationSetupDialog.ezInstance.ezDialogId);
        }

        ezApi.ezclocker.ezEventEngine.ezTriggerEvent(
            EzADPIntegrationSetupDialog.ezEventNames.onIntegrationSetupDialogClose,
            EzADPIntegrationSetupDialog.ezInstance);

        if (ezApi.ezIsFunction(EzADPIntegrationSetupDialog.ezInstance.ezCloseCallback)) {
            EzADPIntegrationSetupDialog.ezInstance.ezCloseCallback();
        }

        EzADPIntegrationSetupDialog.ezInstance.ezResetDialog();

        ezApi.ezclocker.ezNavigation.ezNavigateToEmployerIntegrationsPage()
    }

    /**
     * @public @method
     * Determines if the configuration data is valid and all required data is available.
     * @param {ADPIntegrationRequest} integrationSetupRequest
     * @returns {Boolean}
     */
    ezValidateConfiguration(integrationSetupRequest) {
        if (!ezApi.ezIsValid(integrationSetupRequest)) {
            throw new EzBadParamException(
                'integrationSetupRequest',
                EzADPIntegrationSetupDialog.ezInstance,
                EzADPIntegrationSetupDialog.ezInstance.ezValidateConfiguration);
        }

        let validationSuccess = !EzADPIntegrationSetupDialog.ezInstance.ezDuplicateEmployeeMapIdDetected;

        if (ezApi.ezIsTrue(validationSuccess)) {
            EzADPIntegrationSetupDialog.ezInstance.ezHideValidationError(
                EzADPIntegrationSetupDialog.ezInstance.ezHeaderInputIds.ezPayChexClientIdInputId,
                EzIntegrationMappingViewType.EMPLOYEE_MAPPING);
            EzADPIntegrationSetupDialog.ezInstance.ezHideValidationError(
                null,
                EzIntegrationMappingViewType.PAY_RATE_MAPPING);
            EzADPIntegrationSetupDialog.ezInstance.ezHideValidationError(
                null,
                EzIntegrationMappingViewType.HOURS_TYPE_MAPPING);
            EzADPIntegrationSetupDialog.ezInstance.ezHideValidationError(
                null,
                EzIntegrationMappingViewType.JOB_MAPPING);
        }

        EzADPIntegrationSetupDialog.ezInstance.ezApplyNormalTab(EzADPIntegrationSetupDialog.ezInstance.ezTabIds[EzIntegrationMappingViewType.EMPLOYEE_MAPPING]);

        ezApi.ezclocker.ezUi.ezRemoveClass(
            EzADPIntegrationSetupDialog.ezInstance.ezHeaderInputIds.ezAPDCompanyCodeInputId,
            'ez-input-validation-error');

        ezApi.ezclocker.ezUi.ezRemoveClass(
            EzADPIntegrationSetupDialog.ezInstance.ezHeaderInputIds.ezADPBatchNumberInputId,
            'ez-input-validation-error');

        if (!EzString.hasLength(integrationSetupRequest.ezGetCompanyCode())) {
            ezApi.ezclocker.ezUi.ezAddClass(
                EzADPIntegrationSetupDialog.ezInstance.ezHeaderInputIds.ezAPDCompanyCodeInputId,
                'ez-input-validation-error');

            EzADPIntegrationSetupDialog.ezInstance.ezShowValidationError(`${EzADPIntegrationSetupDialog.ezInstance.ezIntegrationName} client id is required.`);

            validationSuccess = false;
        }

        if (EzBoolean.isFalse(integrationSetupRequest.ezHasEmployeeMappings())) {
            EzADPIntegrationSetupDialog.ezInstance.ezApplyErrorTab(
                EzADPIntegrationSetupDialog.ezInstance.ezTabIds[EzIntegrationMappingViewType.EMPLOYEE_MAPPING]);
            EzADPIntegrationSetupDialog.ezInstance.ezShowValidationError('Please map at least one employee');
            validationSuccess = false;
        }

        return validationSuccess;
    }

    /**
     * @public
     * Closes the visible view
     */
    ezSubmit() {
        let integrationSetupRequest = new EzADPIntegrationSetupRequest(
            ezUi.ezIsCheckBoxChecked(EzADPIntegrationSetupDialog.ezInstance.ezHeaderInputIds.ezIntegrationEnableInputId));

        EzADPIntegrationSetupDialog.ezInstance.ezApplySupportedMappingsToRequest(integrationSetupRequest);

        integrationSetupRequest.ezSetCompanyCode(
            ezApi.ezclocker.ezUi.ezGetInputValue(EzADPIntegrationSetupDialog.ezInstance.ezHeaderInputIds.ezAPDCompanyCodeInputId));

        integrationSetupRequest.ezSetBatchNumber(
            ezApi.ezclocker.ezUi.ezGetInputValue(EzADPIntegrationSetupDialog.ezInstance.ezHeaderInputIds.ezADPBatchNumberInputId));

        if (EzBoolean.isFalse(EzADPIntegrationSetupDialog.ezInstance.ezValidateConfiguration(integrationSetupRequest))) {
            return;
        }

        ezApi.ezclocker.ezUi.ezPageWaitExecute(
            `Saving ${EzADPIntegrationSetupDialog.ezInstance.ezIntegrationName} integration configuration ...`,
            (waitDone) => EzADPIntegrationSetupDialog.ezInstance.ezController.ezSaveIntegrationSetup(
                EzADPIntegrationSetupDialog.ezInstance.ezIntegrationProviderId,
                integrationSetupRequest)
                .then(
                    (response) => waitDone()
                        .then(() => {
                            ezApi.ezclocker.ezEventEngine.ezTriggerEvent(
                                EzADPIntegrationSetupDialog.ezEventNames.onIntegrationSetupDialogSubmitted,
                                response);

                            if (ezApi.ezIsTrue(integrationSetupRequest.ezEnableIntegration)) {
                                ezApi.ezclocker.ezDialog.ezShowMessage(
                                    EzADPIntegrationSetupDialog.ezInstance.ezDialogTitle,
                                    `You have successfully setup your ${EzADPIntegrationSetupDialog.ezInstance.ezIntegrationName} integration!`)
                                    .then(EzADPIntegrationSetupDialog.ezInstance.ezClose);
                            } else {
                                EzADPIntegrationSetupDialog.ezInstance.ezClose();
                            }
                        }),
                    (eResponse, jqXHR) => waitDone()
                        .then(() => {
                            ezApi.ezclocker.ezLogger.error(`Failed ADP Integration. Error: ${ezApi.ezToJson(eResponse)}`);

                            ezApi.ezclocker.ezDialog.ezShowPossibleDefectError(
                                `${EzADPIntegrationSetupDialog.ezInstance.ezIntegrationName} Integration Setup Error`,
                                `Unable to save your ${EzADPIntegrationSetupDialog.ezInstance.ezIntegrationName} integration configuration at this time.`,
                                jqXHR,
                                eResponse,
                                {
                                    url: ezApi.ezclocker.ezNavigation.ezGetInternalApiUrl(ezApi.ezUrlTemplate`
                                    integrations/${EzIntegrationProviderId.ADP_WORKFORCE_NOW}/adp-integration`),
                                    payload: ezApi.ezToJson(integrationSetupRequest)
                                });

                            ezApi.ezclocker.ezEventEngine.ezTriggerEvent(
                                EzADPIntegrationSetupDialog.ezEventNames.onIntegrationSetupDialogError,
                                eResponse);
                        })));
    }

    /**
     * @public @method
     * Updates the dialog's header inputs with data from the saved configuration (if any)
     */
    ezUpdateDialogHeaderValues() {
        if (ezApi.ezIsNotValid(EzADPIntegrationSetupDialog.ezInstance.ezIntegrationResponse)) {
            ezApi.ezclocker.ezUi.ezSetInputValue(EzADPIntegrationSetupDialog.ezInstance.ezHeaderInputIds.ezAPDCompanyCodeInputId, EzString.EMPTY);
            ezApi.ezclocker.ezUi.ezSetInputValue(EzADPIntegrationSetupDialog.ezInstance.ezHeaderInputIds.ezADPBatchNumberInputId, EzString.EMPTY);
            ezApi.ezclocker.ezUi.ezSetCheckboxValue(EzADPIntegrationSetupDialog.ezInstance.ezHeaderInputIds.ezIntegrationEnableInputId, false);
            return;
        }

        ezApi.ezclocker.ezUi.ezSetInputValue(EzADPIntegrationSetupDialog.ezInstance.ezHeaderInputIds.ezAPDCompanyCodeInputId,
            EzString.stringOrEmpty(EzADPIntegrationSetupDialog.ezInstance.ezIntegrationResponse.ezGetCompanyCode()));
        ezApi.ezclocker.ezUi.ezSetInputValue(EzADPIntegrationSetupDialog.ezInstance.ezHeaderInputIds.ezADPBatchNumberInputId,
            EzString.stringOrEmpty(EzADPIntegrationSetupDialog.ezInstance.ezIntegrationResponse.ezGetBatchNumber()));
        ezApi.ezclocker.ezUi.ezSetCheckboxValue(EzADPIntegrationSetupDialog.ezInstance.ezHeaderInputIds.ezIntegrationEnableInputId,
            ezApi.ezIsTrue(EzADPIntegrationSetupDialog.ezInstance.ezIntegrationResponse.ezEnableIntegration));
    }

    /**
     * @public @method
     * Applies all the supported mappings to the setup request.
     * @param {APDIntegrationSetupRequest} integrationSetupRequest
     */
    ezApplySupportedMappingsToRequest(integrationSetupRequest) {
        EzADPIntegrationSetupDialog.ezInstance.ezSupportedMappings.forEach(
            (ezIntegrationMappingViewType) => {
                switch (ezIntegrationMappingViewType) {
                    case EzIntegrationMappingViewType.EMPLOYEE_MAPPING:
                        EzADPIntegrationSetupDialog.ezInstance.ezApplyEmployeeMappings(integrationSetupRequest);
                        break;
                    case EzIntegrationMappingViewType.JOB_MAPPING:
                        EzADPIntegrationSetupDialog.ezInstance.ezApplyJobMappings(integrationSetupRequest);
                        break;
                    case EzIntegrationMappingViewType.HOURS_TYPE_MAPPING:
                        EzADPIntegrationSetupDialog.ezInstance.ezApplyHoursTypeMappings(integrationSetupRequest);
                        break;
                    case EzIntegrationMappingViewType.PAY_RATE_MAPPING:
                    default:
                        ezApi.ezclocker.ezLogger.error(ezApi.ezEM`
                            Integration mapping id ${ezIntegrationMappingViewType} is not currently supported in
                            ${EzADPIntegrationSetupDialog.ezInstance.ezIntegrationName}`);
                }
            });
    }

    /**
     * @public @method
     * Adds the employee mappings to the provided integrationSetupRequest
     * @param {EzAPDIntegrationSetupRequest} integrationSetupRequest
    */
    ezApplyEmployeeMappings(integrationSetupRequest) {
        if (!ezApi.ezIsValid(integrationSetupRequest)) {
            throw new EzBadParamException(
                'integrationSetupRequest',
                EzADPIntegrationSetupDialog.ezInstance,
                EzADPIntegrationSetupDialog.ezInstance.ezApplyEmployeeMappings);
        }

        let employees = ezApi.ezclocker.ezClockerContext.ezGetSelectedEmployerAccountEmployeeAccounts();

        if (!ezApi.ezArrayHasLength(employees)) {
            // No employees to map
            return;
        }

        let mapIds = [];

        EzADPIntegrationSetupDialog.ezInstance.ezDuplicateEmployeeMapIdDetected = false;

        employees.forEach(
            (employee) => {
                let employeeIdStr = employee.id.toString();

                let employeeMappingInputId = `${EzADPIntegrationSetupDialog.ezInstance.ezDialogId}_IntegrationEmployeeMappingInput_${employeeIdStr}`;

                if (ezApi.ezElementExists(employeeMappingInputId)) {
                    let providerEmployeeName = ezUi.ezGetInputValue(employeeMappingInputId).trim();

                    ezApi.ezclocker.ezUi.ezRemoveElementClass(employeeMappingInputId, 'ez-input-validation-error');

                    if (EzString.hasLength(providerEmployeeName)) {
                        if (0 <= mapIds.indexOf(providerEmployeeName.toLowerCase())) {
                            EzADPIntegrationSetupDialog.ezInstance.ezDuplicateEmployeeMapIdDetected = true;
                            EzADPIntegrationSetupDialog.ezInstance.ezShowValidationError(
                                ezApi.ezEM`
                                    One or more duplicate ${EzADPIntegrationSetupDialog.ezInstance.ezIntegrationEmployeeMapFieldDisplayName}s detected.
                                    All employee maps must have unique ${EzADPIntegrationSetupDialog.ezInstance.ezIntegrationEmployeeMapFieldDisplayName}s`,
                                employeeMappingInputId,
                                EzIntegrationMappingViewType.EMPLOYEE_MAPPING);
                        } else {
                            mapIds.push(providerEmployeeName.toLowerCase());
                        }

                        let ezEmployeeIntegrationMapRequest = EzADPIntegrationSetupDialog.ezInstance.ezGetCurrentMapInstance(employeeMappingInputId);

                        if (!ezApi.ezIsValid(ezEmployeeIntegrationMapRequest)) {
                            ezEmployeeIntegrationMapRequest = new EzEmployeeIntegrationMapRequest();
                        }

                        ezEmployeeIntegrationMapRequest.ezEmployerId = employee.employerId;
                        ezEmployeeIntegrationMapRequest.ezEmployeeId = employee.id;
                        ezEmployeeIntegrationMapRequest.ezEmployerIntegrationMapId = EzString.EMPTY;
                        ezEmployeeIntegrationMapRequest.ezIntegrationProviderId = EzIntegrationProviderId.ADP_WORKFORCE_NOW;
                        ezEmployeeIntegrationMapRequest.mappedByUserId = ezApi.ezclocker.ezClockerContext.ezGetUserContext().userAccount.id;

                        ezEmployeeIntegrationMapRequest.providerConnectionId = ezUi.ezGetInputValue(employeeMappingInputId);
                        ezEmployeeIntegrationMapRequest.providerEmployeeId = ezUi.ezGetInputValue(employeeMappingInputId);
                        ezEmployeeIntegrationMapRequest.providerEmployeeName = ezUi.ezGetInputValue(employeeMappingInputId);
                        ezEmployeeIntegrationMapRequest.integrationEmployeeFirstName = EzString.EMPTY;
                        ezEmployeeIntegrationMapRequest.integrationEmployeeLastName = EzString.EMPTY;

                        integrationSetupRequest.ezAddEzEmployeeIntegrationMapRequest(ezEmployeeIntegrationMapRequest);
                    }
                }
            });
    }

    /**
     * @public @method
     * Adds the job mappings to the provided integrationSetupRequest
     * @param {EzAPDIntegrationSetupRequest} integrationSetupRequest
     */
    ezApplyJobMappings(integrationSetupRequest) {
        if (!ezApi.ezIsValid(integrationSetupRequest)) {
            throw new EzBadParamException(
                'integrationSetupRequest',
                EzADPIntegrationSetupDialog.ezInstance,
                EzADPIntegrationSetupDialog.ezInstance.ezApplyJobMappings);
        }

        for (let prop in EzADPIntegrationSetupDialog.ezInstance.ezJobCodesById) {
            let jobCode = EzADPIntegrationSetupDialog.ezInstance.ezJobCodesById[prop];
            let inputId = `${EzADPIntegrationSetupDialog.ezInstance.ezDialogId}_DataTagMappingInput_${jobCode.id.toString()}`;

            if (ezUi.ezElementExists(inputId)) {
                let ezIntegrationDataTag = ezUi.ezGetInputValue(inputId).trim();

                if (EzString.hasLength(ezIntegrationDataTag)) {
                    let dataTagIntegrationMapRequest = EzADPIntegrationSetupDialog.ezInstance.ezGetCurrentMapInstance(inputId);
                    if (ezApi.ezIsNotValid(dataTagIntegrationMapRequest)) {
                        dataTagIntegrationMapRequest = new DataTagIntegrationMapRequest();
                    }

                    dataTagIntegrationMapRequest.ezIntegrationproviderId = EzString.EMPTY;
                    dataTagIntegrationMapRequest.ezUserId = ezApi.ezclocker.ezClockerContext.ezGetUserContext().userAccount.id;
                    dataTagIntegrationMapRequest.ezEmployerId = ezApi.ezclocker.ezClockerContext.ezGetSelectedEmployerAccount().id;
                    dataTagIntegrationMapRequest.ezIntegrationProviderId = EzIntegrationProviderId.ADP_WORKFORCE_NOW;
                    dataTagIntegrationMapRequest.ezClockerDataTagId = jobCode.id;
                    dataTagIntegrationMapRequest.ezContextId = EzString.EMPTY;
                    dataTagIntegrationMapRequest.ezIntegrationDataTag = ezIntegrationDataTag;

                    integrationSetupRequest.ezAddDataTagIntegrationMapRequest(dataTagIntegrationMapRequest);
                }
            }
        }
    }

    /**
     @public @method
     Adds the job mappings to the provided integrationSetupRequest
     @param {EzAPDIntegrationSetupRequest} integrationSetupRequest
     */
    ezApplyHoursTypeMappings(integrationSetupRequest) {
        if (!ezApi.ezIsValid(integrationSetupRequest)) {
            throw new EzBadParamException(
                'integrationSetupRequest',
                EzADPIntegrationSetupDialog.ezInstance.
                    EzADPIntegrationSetupDialog.ezInstance.ezApplyHoursTypeMappings);
        }

        EzADPIntegrationSetupDialog.ezInstance.ezSupportedEzClockerPayRateTypes.forEach((ezClockerPayRateType) => {
            let inputId = `${EzADPIntegrationSetupDialog.ezInstance.ezDialogId}_HoursTypeMappingInput_${ezClockerPayRateType}`;
            if (ezUi.ezElementExists(inputId)) {
                let ezIntegrationHourType = ezApi.ezclocker.ezUi.ezGetInputValue('hourly_type_' + inputId).trim();
                let ezIntegrationHourCode = ezApi.ezclocker.ezUi.ezGetInputValue('hourly_code_' + inputId).trim();

                let payRateIntegrationMapRequest = new PayRateIntegrationMapRequest();

                if (EzString.hasLength(ezIntegrationHourCode)) {
                    payRateIntegrationMapRequest.ezEmployerId =
                        ezApi.ezclocker.ezClockerContext.ezGetSelectedEmployerAccount().id;
                    payRateIntegrationMapRequest.ezUserId =
                        ezApi.ezclocker.ezClockerContext.ezGetUserContext().userAccount.id;
                    payRateIntegrationMapRequest.ezClockerPayRateType = ezClockerPayRateType;
                    payRateIntegrationMapRequest.ezContextId = EzString.EMPTY;
                    payRateIntegrationMapRequest.ezIntegrationPayRateCode = ezIntegrationHourCode;
                    payRateIntegrationMapRequest.integrationHourlyType = ezIntegrationHourType;
                    payRateIntegrationMapRequest.ezIntegrationHourlyType = ezIntegrationHourType;

                    integrationSetupRequest.ezAddPayRateIntegrationMapRequest(payRateIntegrationMapRequest);
                }
            }
        });
    }

    /**
     * @public @method
        Removes the normal styles and applies the validation error styles to the provided tabId
     * @param {EzIntegrationMappingViewType} ezIntegrationMappingViewType
     */
    ezApplyErrorTab(ezIntegrationMappingViewType) {
        if (!EzString.hasLength(ezIntegrationMappingViewType) ||
            !ezApi.ezHasOwnProperty(EzADPIntegrationSetupDialog.ezInstance.ezTabIds, ezIntegrationMappingViewType)) {
            return;
        }

        let tabId = EzADPIntegrationSetupDialog.ezInstance.ezTabIds[ezIntegrationMappingViewType];

        ezApi.ezclocker.ezUi.ezSetElementDataAttributeValue(tabId, 'ezValidationError', 'true');

        if (ezIntegrationMappingViewType === EzADPIntegrationSetupDialog.ezInstance.ezActiveIntegrationMappingViewType) {
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
     * @public @method
        Removes validation error styles and applies the normal styles to the provided tabId
     * @param {EzIntegrationMappingViewType} ezIntegrationMappingViewType
     */
    ezApplyNormalTab(ezIntegrationMappingViewType) {
        if (!EzString.hasLength(ezIntegrationMappingViewType) ||
            !ezApi.ezHasOwnProperty(EzADPIntegrationSetupDialog.ezInstance.ezTabIds, ezIntegrationMappingViewType)) {
            return;
        }

        let tabId = EzADPIntegrationSetupDialog.ezInstance.ezTabIds[ezIntegrationMappingViewType];

        ezApi.ezclocker.ezUi.ezSetElementDataAttributeValue(tabId, 'ezValidationError', 'false');

        if (ezIntegrationMappingViewType === EzADPIntegrationSetupDialog.ezInstance.ezActiveIntegrationMappingViewType) {
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
     * @public @method
        Sets the tag associated with the provided aTabIdToActive as active.
     * @param {String} ezIntegrationMappingViewType
     */
    ezActivateTab(ezIntegrationMappingViewType) {
        if (!EzString.hasLength(ezIntegrationMappingViewType)) {
            throw new EzBadParamException(
                'ezIntegrationMappingViewType',
                EzADPIntegrationSetupDialog.ezInstance,
                EzADPIntegrationSetupDialog.ezInstance.ezActivateTab);
        }

        if (!ezApi.ezHasOwnProperty(EzADPIntegrationSetupDialog.ezInstance.ezTabs, ezIntegrationMappingViewType)) {
            throw ezApi.ezException(`Tab id ${ezIntegrationMappingViewType} does not exist.`);
        }

        if (ezIntegrationMappingViewType === EzADPIntegrationSetupDialog.ezInstance.ezActiveIntegrationMappingViewType) {
            // already active
            return;
        }

        let previouslyActiveIntegrationMappingViewType = EzADPIntegrationSetupDialog.ezInstance.ezActiveIntegrationMappingViewType;

        EzADPIntegrationSetupDialog.ezInstance.ezActiveIntegrationMappingViewType = ezIntegrationMappingViewType;

        if (EzString.hasLength(previouslyActiveIntegrationMappingViewType) &&
            EzIntegrationMappingViewType.UNKNOWN !== previouslyActiveIntegrationMappingViewType) {
            // Deactivate current

            // Hide the tabs view
            ezApi.ezclocker.ezUi.ezHideElement(EzADPIntegrationSetupDialog.ezInstance.ezTabs[previouslyActiveIntegrationMappingViewType].tabViewId);

            let previousTabId = EzADPIntegrationSetupDialog.ezInstance.ezTabIds[previouslyActiveIntegrationMappingViewType];

            ezApi.ezclocker.ezUi.ezSetElementDataAttributeValue(previousTabId, 'active', 'false');

            if ('true' === ezApi.ezclocker.ezUi.ezGetElementDataAttributeValue(previousTabId, 'ezValidationError')) {
                EzADPIntegrationSetupDialog.ezInstance.ezApplyErrorTab(previouslyActiveIntegrationMappingViewType);
            } else {
                EzADPIntegrationSetupDialog.ezInstance.ezApplyNormalTab(previouslyActiveIntegrationMappingViewType);
            }

            EzADPIntegrationSetupDialog.ezInstance.ezTabs[previouslyActiveIntegrationMappingViewType].active = false;
        }

        // Activate the new tab
        let tabId = EzADPIntegrationSetupDialog.ezInstance.ezTabIds[EzADPIntegrationSetupDialog.ezInstance.ezActiveIntegrationMappingViewType];

        EzADPIntegrationSetupDialog.ezInstance.ezTabs[EzADPIntegrationSetupDialog.ezInstance.ezActiveIntegrationMappingViewType].active = true;

        ezApi.ezclocker.ezUi.ezSetElementDataAttributeValue(tabId, 'active', 'true');

        if ('true' === ezApi.ezclocker.ezUi.ezGetElementDataAttributeValue(tabId, 'ezValidationError')) {
            EzADPIntegrationSetupDialog.ezInstance.ezApplyErrorTab(EzADPIntegrationSetupDialog.ezInstance.ezActiveIntegrationMappingViewType);
        } else {
            EzADPIntegrationSetupDialog.ezInstance.ezApplyNormalTab(EzADPIntegrationSetupDialog.ezInstance.ezActiveIntegrationMappingViewType);
        }

        EzADPIntegrationSetupDialog.ezInstance.ezShowTabHelp(ezIntegrationMappingViewType);

        // Display the tab's view
        ezApi.ezclocker.ezUi.ezShowElement(
            EzADPIntegrationSetupDialog.ezInstance.ezTabs[EzADPIntegrationSetupDialog.ezInstance.ezActiveIntegrationMappingViewType].tabViewId);
    }

    /**
     * @public @method
        Displays the help text for the activated tab
     * @param {EzIntegrationMappingViewType} ezIntegrationMappingViewType
     */
    ezShowTabHelp(ezIntegrationMappingViewType) {
        switch (ezIntegrationMappingViewType) {
            case EzIntegrationMappingViewType.PAY_RATE_MAPPING:
                ezApi.ezclocker.ezUi.ezContent(
                    ezApi.ezIdTemplate`${EzADPIntegrationSetupDialog.ezInstance.ezDialogId}_HelpTitle`,
                    'Pay Rate Mapping');

                ezApi.ezclocker.ezUi.ezContent(
                    ezApi.ezIdTemplate`${EzADPIntegrationSetupDialog.ezInstance.ezDialogId}_IntegrationHelp`,
                    'Pay rate mapping is not supported for ADP Workforce Now');

                break;
            case EzIntegrationMappingViewType.HOURS_TYPE_MAPPING:
                ezApi.ezclocker.ezUi.ezContent(
                    ezApi.ezIdTemplate`${EzADPIntegrationSetupDialog.ezInstance.ezDialogId}_HelpTitle`,
                    'Hour Types Mapping');

                ezApi.ezclocker.ezUi.ezContent(
                    ezApi.ezIdTemplate`${EzADPIntegrationSetupDialog.ezInstance.ezDialogId}_IntegrationHelp`,
                    EzHtml.build`
                        <p>
                            Map your ezClocker time off to ADP Now’s special hour type.
                        </p>`);

                break;
            case EzIntegrationMappingViewType.JOB_MAPPING:
                ezApi.ezclocker.ezUi.ezContent(
                    ezApi.ezIdTemplate`${EzADPIntegrationSetupDialog.ezInstance.ezDialogId}_HelpTitle`,
                    'Job Mapping');

                ezApi.ezclocker.ezUi.ezContent(
                    ezApi.ezIdTemplate`${EzADPIntegrationSetupDialog.ezInstance.ezDialogId}_IntegrationHelp`,
                    EzHtml.build`
                        <p>
                            Enter the ADP Workforce Now Department Code that corresponds to the ezClocker Job name so
                            that employees get paid the correct rate for the work.
                        </p>
                        <p>
                            If you do not map Deparment Codes the default Deparment rate is used.
                        </p>`);
                break;
            case EzIntegrationMappingViewType.EMPLOYEE_MAPPING:
            default:
                ezApi.ezclocker.ezUi.ezContent(
                    ezApi.ezIdTemplate`${EzADPIntegrationSetupDialog.ezInstance.ezDialogId}_HelpTitle`,
                    'Employee Mapping');

                ezApi.ezclocker.ezUi.ezContent(
                    ezApi.ezIdTemplate`${EzADPIntegrationSetupDialog.ezInstance.ezDialogId}_IntegrationHelp`,
                    EzHtml.build`
                        <p>
                            Next to each ezClocker employee name enter the matching ADP Employee File Number.
                        </p>
                        <p>
                            Don't know what the employee's ADP Workforce Now File Number is? You can use the
                            ADP Workforce Now 'Employee File Number' report to view the File Number for each employee.
                        </p>`);
                break;
        }
    }

    /**
     * @public @method
        Loads any existing integration configuration from the DB
     * @returns {Promise.resolve}
     */
    ezLoadIntegrationSetupConfiguration() {
        EzADPIntegrationSetupDialog.ezInstance.ezIntegrationResponse = null;

        return ezApi.ezResolver(
            (resolve) => EzADPIntegrationSetupDialog.ezInstance.ezController.ezGetIntegrationSetup(
                EzADPIntegrationSetupDialog.ezInstance.ezIntegrationProviderId)
                .then(
                    (response) => {
                        EzADPIntegrationSetupDialog.ezInstance.ezIntegrationResponse = response;
                        return resolve();
                    },
                    (eResponse) => {
                        ezApi.ezclocker.ezLogger.error(
                            ezApi.ezEM`
                                Failed to get existing ${EzADPIntegrationSetupDialog.ezInstance.ezIntegrationName} integration configuration.
                                Error: ${ezApi.ezToJson(eResponse)}`);

                        ezApi.ezclocker.ezDialog.ezShowPossibleDefectError(
                            `${EzADPIntegrationSetupDialog.ezInstance.ezIntegrationName} Integration Load Error`,
                            `Unable to get the existing ${EzADPIntegrationSetupDialog.ezInstance.ezIntegrationName} configuration at this time.`,
                            ezApi.ezToJson(eResponse));

                        return resolve();
                    }));
    }

    /**
     * @public @method
        Loads the employer's data tags (if any)
     * @returns {Promise.resolve}
     */
    ezLoadEmployerDataTags() {
        EzADPIntegrationSetupDialog.ezInstance.ezJobCodes = [];

        EzADPIntegrationSetupDialog.ezInstance.ezJobCodesById = null;

        return ezApi.ezResolver(
            (resolve) => ezApi.ezclocker.ezClockerContext.ezRefreshSelectedEmployerAvailableJobs()
                .then(
                    (response) => {
                        if (ezApi.ezArrayHasLength(response.availableJobs)) {
                            EzADPIntegrationSetupDialog.ezInstance.ezJobCodesById = response.availableJobsById;
                            EzADPIntegrationSetupDialog.ezInstance.ezJobCodes = response.availableJobs;
                        }

                        return resolve(EzADPIntegrationSetupDialog.ezInstance.ezJobCodes);
                    },
                    (eResponse) => {
                        ezApi.ezclocker.ezLogger.error(
                            ezApi.ezEM`
                            Failed to load the available jobs for the employ er.
                            Error: ${ezApi.ezToJson(eResponse)}`);

                        return ezApi.ezclocker.ezDialog.ezShowPossibleDefectError(
                            'Jobs Load Error',
                            'Unable to get the existing Jobs data at this time.',
                            ezApi.ezToJson(eResponse))
                            .then(resolve);
                    }));
    }

    /**
     * @public @method
     * Builds the dialog's UX Html from available data
     */
    ezBuildDialogHtml() {
        // Assemble the tab buttons and views
        let tabsHtml = EzString.EMPTY;

        let tabsViewHtml = EzString.EMPTY;

        EzADPIntegrationSetupDialog.ezInstance.ezSupportedMappings.forEach(
            (ezIntegrationMappingViewType) => {
                let ezTab = EzADPIntegrationSetupDialog.ezInstance.ezTabs[ezIntegrationMappingViewType];
                let hideTabStyle = EzBoolean.isFalse(ezTab.visible)
                    ? 'style="display:none"'
                    : EzString.EMPTY;

                tabsHtml += EzHtml.build`
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
            });

        // Assemble the dialog's HTML
        let logoUrl = EzIntegrationProviderId.ezToIntegrationLogoUrl(EzIntegrationProviderId.ADP_WORKFORCE_NOW);

        let logoText = EzIntegrationProviderId.ezToIntegrationLogoText(EzIntegrationProviderId.ADP_WORKFORCE_NOW);

        return EzHtml.build`
            <div id="${EzADPIntegrationSetupDialog.ezInstance.ezDialogId}">
                <div id="${EzADPIntegrationSetupDialog.ezInstance.ezDialogId}_DialogContent" class="ez-white-borderless-box8 ezAutoRow_A_A">
                    <div id="${EzADPIntegrationSetupDialog.ezInstance.ezDialogId}_Header" class="ezContainer-integration-setup-header">
                        <div id="${EzADPIntegrationSetupDialog.ezInstance.ezDialogId}_Toptable" class="ezGridNoGap ezAutoCol_AxA">
                            <div class="ezContainer-integration-logo">
                                <div class="ezContainer-integration-logo">
                                    <img src="${logoUrl}" class="ezContainer-integration-logo-img"/>
                                    ${logoText}
                                </div>
                            </div>
                            <div id="${EzADPIntegrationSetupDialog.ezInstance.ezDialogId}_HeaderEnabledContainer"
                                class="ezGrid-vertical-align-top ezGrid-align-right">
                                <label for="${EzADPIntegrationSetupDialog.ezInstance.ezHeaderInputIds.ezIntegrationEnableInputId}"
                                    class="ezInputLabel ezBold">
                                    <input id="${EzADPIntegrationSetupDialog.ezInstance.ezHeaderInputIds.ezIntegrationEnableInputId}" type="checkbox"/>
                                    Enable Integration
                                </label>
                            </div>
                        </div>
                        <div style="height:10px;"></div>
                        <div id="${EzADPIntegrationSetupDialog.ezInstance.ezDialog}_HeaderInputs" class="ezAutoCol_A">
                            <div id="${EzADPIntegrationSetupDialog.ezInstance.ezDialogId}HeaderCompanyCodeContainer"
                                class="ezGrid-vertical-align-top ezGrid-align-full">
                                <label for="${EzADPIntegrationSetupDialog.ezInstance.ezHeaderInputIds.ezADPCompanyCode}" class="ezInputLabel ezBold">
                                    Company Code
                                </label>
                                <input id="${EzADPIntegrationSetupDialog.ezInstance.ezHeaderInputIds.ezAPDCompanyCodeInputId}" type="text"
                                    class="ezFullWidthEditor" placeholder="Enter Company Code"/>
                                <!-- file name should be PR{COMPANY_CODE}_EPI.csv -->
                                ${EzADPIntegrationSetupDialog.ezInstance.ezBuildHelpTipHTML('Required: Used in the name for the export file.')}
                            </div>
                            <div id="${EzADPIntegrationSetupDialog.ezInstance.ezDialogId}HeaderBatchNumberContainer"
                                class="ezGrid-vertical-align-top ezGrid-align-full">
                                <label for="${EzADPIntegrationSetupDialog.ezInstance.ezHeaderInputIds.ezADPBatchNumberInputId}"
                                    class="ezInputLabel ezBold">
                                    Batch Number
                                </label>
                                <input id="${EzADPIntegrationSetupDialog.ezInstance.ezHeaderInputIds.ezADPBatchNumberInputId}" type="text"
                                    class="ezFullWidthEditor" placeholder="Enter Batch Number"/>
                                ${EzADPIntegrationSetupDialog.ezInstance.ezBuildHelpTipHTML('Optional: Used to identify the export data source as ezClocker.')}
                            </div>
                        </div>
                        <div id="${EzADPIntegrationSetupDialog.ezInstance.ezUxIds.elementIds.ezErrorMessageContainerId}"
                            class="ez-floating-error-container" style="display:none">
                            <div id="${EzADPIntegrationSetupDialog.ezInstance.ezUxIds.elementIds.ezErrorMessageId}"></div>
                        </div>
                    </div>
                    <div id="${EzADPIntegrationSetupDialog.ezInstance.ezDialogId}_SetupContainer"
                        class="ezSubContentView-no-border-no-scroll ezAutoCol_75xA">
                        <div id="${EzADPIntegrationSetupDialog.ezInstance.ezDialogId}_TabContainer" class="ezTabContainer">
                            <div id="${EzADPIntegrationSetupDialog.ezInstance.ezDialogId}_Tabs" class="ezTabsContainer">
                                ${tabsHtml}
                            </div>
                            <div id="${EzADPIntegrationSetupDialog.ezInstance.ezDialogId}_TabViews" class="ezSubContentView-no-border-no-scroll">
                                ${tabsViewHtml}
                            </div>
                        </div>
                        ${EzADPIntegrationSetupDialog.ezInstance.ezBuildTabHelpHtml()}
                    </div>
                </div>
            </div>`;
    }

    /**
     * @public @method
     * Builds the integration tab's help html
     * @returns {String}
     */
    ezBuildTabHelpHtml() {
        return EzHtml.build`
            <div id="${EzADPIntegrationSetupDialog.ezInstance.ezDialogId}_HelpContainer" class="ezContainer-side-help-box">
                <div class="ezContainer-side-help-box-title">
                    <img src="/public/images/integrations/help-navy.svg" class="ezContainer-side-help-box-img"/>
                    <lable id="${EzADPIntegrationSetupDialog.ezInstance.ezDialogId}_HelpTitle">Employee Mapping</label>
                </div>
                <div id="${EzADPIntegrationSetupDialog.ezInstance.ezDialogId}_IntegrationHelp" class="ezContainer-side-help-box-content">
                </div>
            </div>`;
    }

    /**
     * @public @method
     * Builds the HTML for the 'full screen' mode of the setup dialog.
     * @returns {String}
     */
    ezBuildFullscreenHtml() {
        return EzHtml.build`
            <div
                id="${EzADPIntegrationSetupDialog.ezInstance.ezFullScreenParentId}"
                class="ezContainer-full-screen-overlay"
                style="display:none">
                <div
                    id="${EzADPIntegrationSetupDialog.ezInstance.ezFullScreenParentId}_ButtonBar"
                    class="ezContainer-white-right-aligned-button-container">
                    <button
                        id="${EzADPIntegrationSetupDialog.ezInstance.ezDialogId}_FullScreenOK"
                        class="ezDefaultNormalButton">
                        Save
                    </button>
                    <button
                        id="${EzADPIntegrationSetupDialog.ezInstance.ezDialogId}_FullScreenCancel"
                        class="ezNormalButton"
                        onclick="ezApi.ezclocker.ezNavigation.ezNavigateToEmployerIntegrationsPage()">
                        Cancel
                    </button>
                </div>
                <div
                    id="${EzADPIntegrationSetupDialog.ezInstance.ezFullScreenContentId}"
                    class="ezSubContentView-no-scroll ezPad8">
                </div>
            </div>`;
    }

    /**
     * @public @method
     * Builds the views for each tab
     */
    ezBuildTabViews() {
        EzADPIntegrationSetupDialog.ezInstance.ezSupportedMappings.forEach(
            (ezIntegrationMappingViewType) => {
                switch (ezIntegrationMappingViewType) {
                    case EzIntegrationMappingViewType.EMPLOYEE_MAPPING:
                        EzADPIntegrationSetupDialog.ezInstance.ezTabs[ezIntegrationMappingViewType].ezView =
                            EzADPIntegrationSetupDialog.ezInstance.ezBuildEmployeeMappingTabView();

                        break;
                    case EzIntegrationMappingViewType.JOB_MAPPING:
                        EzADPIntegrationSetupDialog.ezInstance.ezTabs[ezIntegrationMappingViewType].ezView =
                            EzADPIntegrationSetupDialog.ezInstance.ezBuildJobMappingTabView();

                        break;
                    case EzIntegrationMappingViewType.HOURS_TYPE_MAPPING:
                        EzADPIntegrationSetupDialog.ezInstance.ezTabs[ezIntegrationMappingViewType].ezView =
                            EzADPIntegrationSetupDialog.ezInstance.ezBuildHoursTypeMappingTabView();

                        break;
                    case EzIntegrationMappingViewType.PAY_RATE_MAPPING:
                        break;
                    default:
                        ezApi.ezclocker.ezLogger.error(
                            `Integration mapping type ${ezIntegrationMappingViewType} is not currently supported`);
                }
            });
    }

    /**
     * @public @method
     * Builds the supported mapping views
     */
    ezBuildSupportedMappingViews() {
        EzADPIntegrationSetupDialog.ezInstance.ezSupportedMappings.forEach(
            (ezIntegrationMappingViewType) => {
                let buildMappingListFunction = null;

                switch (ezIntegrationMappingViewType) {
                    case EzIntegrationMappingViewType.EMPLOYEE_MAPPING:
                        buildMappingListFunction = EzADPIntegrationSetupDialog.ezInstance.ezBuildEmployeeMappingList;

                        break;
                    case EzIntegrationMappingViewType.JOB_MAPPING:
                        buildMappingListFunction = EzADPIntegrationSetupDialog.ezInstance.ezBuildJobMappingsList;

                        break;
                    case EzIntegrationMappingViewType.HOURS_TYPE_MAPPING:
                        buildMappingListFunction = EzADPIntegrationSetupDialog.ezInstance.ezBuildHoursTypeMappingsList;

                        break;
                    case EzIntegrationMappingViewType.PAY_RATE_MAPPING:
                        break;
                    default:
                        ezApi.ezclocker.ezLogger.error(
                            `Mapping view ${ezIntegrationMappingViewType} is not supported yet.`);
                }

                if (ezApi.ezIsFunction(buildMappingListFunction)) {
                    ezApi.ezclocker.ezUi.ezAppendContent(
                        `${EzADPIntegrationSetupDialog.ezInstance.ezViewIds[ezIntegrationMappingViewType]}_TableBody`,
                        buildMappingListFunction());
                }
            });
    }

    /**
     * @public @method
     * Builds the employee mapping tab view
     */
    ezBuildEmployeeMappingTabView() {
        let viewId = EzADPIntegrationSetupDialog.ezInstance.ezViewIds[EzIntegrationMappingViewType.EMPLOYEE_MAPPING];

        return EzHtml.build`
            <div id="${viewId}" data-tabgroup="${EzADPIntegrationSetupDialog.ezInstance.ezTabGroupName}" class="ez-tab-view-container" style="display:none">
                <div id="${viewId}_ListDiv" class="ezContainer-integration-input-container">
                    <table id="${viewId}_Table" class="ez-table-full-width">
                        <thead id="${viewId}_TableHeader" class="ez-table-header">
                            <tr id="${viewId}_TableHeaderRow" class="ez-table-row">
                                <th id="${viewId}_TableHeaderCell_EzEmployeeName" class="ez-table-cell-header-fixed">
                                    EzClocker Employees
                                </th>
                                <th id="${viewId}_TableHeaderCell_IntegrationEmployeeFieldMapName"
                                    class="ez-table-cell-header-fixed">
                                    ${EzADPIntegrationSetupDialog.ezInstance.ezIntegrationEmployeeMapFieldDisplayName}
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
     * @public @method
     * Builds the employee mapping html
     * @returns {String}
     */
    ezBuildEmployeeMappingList() {
        let viewId = EzADPIntegrationSetupDialog.ezInstance.ezViewIds[EzIntegrationMappingViewType.EMPLOYEE_MAPPING];

        ezApi.ezclocker.ezUi.ezClearContent(`${viewId}_TableBody`);

        let employees = ezApi.ezclocker.ezClockerContext.ezGetSelectedEmployerAccountEmployeeAccounts();

        if (!ezApi.ezArrayHasLength(employees)) {
            return EzHtml.build`
                <tr id="${viewId}_TableBody_MappingRow_NoEmployees" class="ez-table-row" data-ezid="-1">
                    <td id="${viewId}_TableBody_MappingCell_NoEmployees" class="ez-table-cell" colspan="2" >
                        No Employees available
                    </td>
                </tr>`;
        }

        let integrationResponse = ezApi.ezIsValid(EzADPIntegrationSetupDialog.ezInstance.ezIntegrationResponse)
            ? EzADPIntegrationSetupDialog.ezInstance.ezIntegrationResponse
            : new EzADPIntegrationSetupResponse();

        let employeeListHtml = EzString.EMPTY;

        employees.forEach(
            (employee) => {
                let ezEmployeeIntegrationMapRequest =
                    integrationResponse.ezGetEmployeeMappingForEmployeeId(employee.id);

                if (ezApi.ezIsValid(ezEmployeeIntegrationMapRequest)) {
                    employeeListHtml += EzADPIntegrationSetupDialog.ezInstance.ezBuildEmployeeMappingRow(
                        viewId,
                        employee,
                        ezEmployeeIntegrationMapRequest);
                } else {
                    employeeListHtml += EzADPIntegrationSetupDialog.ezInstance.ezBuildEmployeeMappingRow(
                        viewId,
                        employee,
                        null);
                }
            });

        return employeeListHtml;
    }

    /**
     * @public @method
     * Builds the HTML for a employee mapping row
     * @param {String} viewId
     * @param {Object} employee
     * @Param {Object} ezEmployeeIntegrationMapRequest
     * @returns {String}
     */
    ezBuildEmployeeMappingRow(viewId, employee, ezEmployeeIntegrationMapRequest) {
        if (ezApi.ezIsNotValid(viewId)) {
            throw new EzBadParamException(
                'viewId',
                EzADPIntegrationSetupDialog.ezInstance,
                EzADPIntegrationSetupDialog.ezInstance.ezBuildEmployeeMappingRow);
        }
        if (ezApi.ezIsNotValid(employee)) {
            throw new EzBadParamException(
                'employee',
                EzADPIntegrationSetupDialog.ezInstance,
                EzADPIntegrationSetupDialog.ezInstance.ezBuildEmployeeMappingRow);
        }
        if (!ezApi.ezIsNumber(employee.id)) {
            throw new EzBadParamException(
                'employee.id',
                EzADPIntegrationSetupDialog.ezInstance,
                EzADPIntegrationSetupDialog.ezInstance.ezBuildEmployeeMappingRow);
        }
        if (!EzString.hasLength(employee.employeeName)) {
            throw new EzBadParamException(
                'employee.employeeName',
                EzADPIntegrationSetupDialog.ezInstance,
                EzADPIntegrationSetupDialog.ezInstance.ezBuildEmployeeMappingRow);
        }

        let employeeIdStr = employee.id.toString();

        let mappingJson = EzString.EMPTY;

        let providerEmployeeName = EzString.EMPTY;

        if (ezApi.ezIsValid(ezEmployeeIntegrationMapRequest)) {
            mappingJson = ezApi.ezToJson(ezEmployeeIntegrationMapRequest);
            providerEmployeeName = EzString.stringOrEmpty(ezEmployeeIntegrationMapRequest.providerEmployeeName);
        }

        let value = EzString.hasLength(providerEmployeeName)
            ? `value="${providerEmployeeName}"`
            : EzString.EMPTY;

        let rowId = `${viewId}_TableBody_Mapping`;

        let inputId = `${EzADPIntegrationSetupDialog.ezInstance.ezDialogId}_IntegrationEmployeeMappingInput_${employeeIdStr}`;

        return EzHtml.build`
            <tr id="${rowId}Row_EzEmployee_${employeeIdStr}" class="ez-table-row" data-ezid="${employeeIdStr}">
                <td id="${rowId}Cell_EzEmployee_${employeeIdStr}_EmployeeName"
                    class="ez-table-cell ez-cell-align-middle-left" data-ezid="${employeeIdStr}">
                    ${employee.employeeName}
                </td>
                <td id="${rowId}Cell_EzEmployee_${employeeIdStr}_IntegrationEmployeeMap"
                    class="ez-table-cell ez-cell-align-middle-center" data-ezid="${employeeIdStr}">
                    <input id="${inputId}" type="text" class="ezFullWidthEditor" data-ezid="${employeeIdStr}"
                        name="hidden" autocomplete="${inputId}" data-mapping-json="${mappingJson}"
                        placeholder="enter ${EzADPIntegrationSetupDialog.ezInstance.ezIntegrationEmployeeMapFieldDisplayName}" ${value}/>
                </td>
            </tr>`;
    }

    /**
     * @public @method
     * Builds the job mapping tab view
     */
    ezBuildJobMappingTabView() {
        let viewId = EzADPIntegrationSetupDialog.ezInstance.ezViewIds[EzIntegrationMappingViewType.JOB_MAPPING];

        return EzHtml.build`
            <div id="${viewId}" data-tabgroup="${EzADPIntegrationSetupDialog.ezInstance.ezTabGroupName}" class="ez-tab-view-container" style="display:none">
                <div id="${viewId}_ListDiv" class="ezContainer-integration-input-container">
                    <table id="${viewId}_Table" class="ez-table-full-width">
                        <thead id="${viewId}_TableHeader" class="ez-table-header">
                            <tr id="${viewId}_TableHeader_Row_DataTag_TagName" class="ez-table-cell-header-fixed">
                                <th id="${viewId}_TableHeader_Cell_DataTag_TagName" \
                                    class="ez-table-cell-header-fixed">
                                    EzClocker Jobs
                                </th>
                                <th id="${viewId}_TableHeader_Cell_IntegrationJobMapFieldDisplayName"
                                    class="ez-table-cell-header-fixed">
                                    ${EzADPIntegrationSetupDialog.ezInstance.ezIntegrationJobMapFieldDisplayName}
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
     * @public @method
     * Builds the Job Mappings List HTML
     * @returns {String}
     */
    ezBuildJobMappingsList() {
        let viewId = EzADPIntegrationSetupDialog.ezInstance.ezViewIds[EzIntegrationMappingViewType.JOB_MAPPING];

        ezApi.ezclocker.ezUi.ezClearContent(`${viewId}_TableBody`);

        if (!ezApi.ezIsValid(EzADPIntegrationSetupDialog.ezInstance.ezJobCodesById)) {
            return EzHtml.build`
                <tr id="${viewId}_TableBody_MappingRow_NowJobs" class="ez-table-row">
                    <td id="${viewId}_TableBody_MappingCell_NoJobs" class="ez-table-cell" colspan="2" >
                        No jobs available
                    </td>
                </tr>`;
        }

        let ezIntegrationResponse = ezApi.ezIsValid(EzADPIntegrationSetupDialog.ezInstance.ezIntegrationResponse)
            ? EzADPIntegrationSetupDialog.ezInstance.ezIntegrationResponse
            : new EzADPIntegrationSetupResponse();

        let jobsMappingHtml = EzString.EMPTY;

        for (let jobCode of EzADPIntegrationSetupDialog.ezInstance.ezJobCodes) {
            let dataTagIntegrationMapRequest = ezIntegrationResponse.ezGetDataTagMappingForDataTagId(jobCode.id);

            jobsMappingHtml += ezApi.ezIsValid(dataTagIntegrationMapRequest) &&
                ezApi.ezIsNumber(dataTagIntegrationMapRequest.id) &&
                EzString.hasLength(dataTagIntegrationMapRequest.integrationDataTagId)
                ? EzADPIntegrationSetupDialog.ezInstance.ezBuildJobMappingRow(viewId, jobCode, dataTagIntegrationMapRequest)
                : EzADPIntegrationSetupDialog.ezInstance.ezBuildJobMappingRow(viewId, jobCode, null);
        }

        return jobsMappingHtml;
    }

    /**
     * @public @method
     * Builds a job mapping row for the provided job code.
     * @param {Number} dataTagId
     * @param {String} dataTagTagName
     * @param {Number|null} jobCodeMappingId
     * @param {String|null} integrationDataTagId
     */
    ezBuildJobMappingRow(viewId, dataTag, dataTagIntegrationMapRequest) {
        if (!EzString.hasLength(viewId)) {
            throw new EzBadParamException(
                'viewId',
                EzADPIntegrationSetupDialog.ezInstance,
                EzADPIntegrationSetupDialog.ezInstance.ezBuildJobMappingRow);
        }
        if (ezApi.ezIsNotValid(dataTag)) {
            throw new EzBadParamException(
                'dataTag',
                EzADPIntegrationSetupDialog.ezInstance,
                EzADPIntegrationSetupDialog.ezInstance.ezBuildJobMappingRow);
        }
        if (!ezApi.ezIsNumber(dataTag.id)) {
            throw new EzBadParamException(
                'dataTag.id',
                EzADPIntegrationSetupDialog.ezInstance,
                EzADPIntegrationSetupDialog.ezInstance.ezBuildJobMappingRow);
        }
        if (!EzString.hasLength(dataTag.tagName)) {
            throw new EzBadParamException(
                'dataTag.tagName',
                EzADPIntegrationSetupDialog.ezInstance,
                EzADPIntegrationSetupDialog.ezInstance.ezBuildJobMappingRow);
        }

        let dataTagIdStr = dataTag.id.toString();

        let mappingJson = EzString.EMPTY;

        let integrationDataTagId = EzString.EMPTY;

        if (ezApi.ezIsValid(dataTagIntegrationMapRequest)) {
            mappingJson = ezApi.ezToJson(dataTagIntegrationMapRequest);
            integrationDataTagId = EzString.stringOrEmpty(dataTagIntegrationMapRequest.integrationDataTagId);
        }

        let value = EzString.hasLength(integrationDataTagId)
            ? `value="${integrationDataTagId}"`
            : EzString.EMPTY;

        let rowId = `${viewId}_TableBody_Mapping`;

        let inputId = `${EzADPIntegrationSetupDialog.ezInstance.ezDialogId}_DataTagMappingInput_${dataTagIdStr}`;

        return EzHtml.build`
            <tr id="${rowId}_Row_DataTag_${dataTagIdStr}" class="ez-table-row" data-ezid="${dataTagIdStr}">
                <td id="${rowId}Cell_DataTag_${dataTagIdStr}_TagName"
                    class="ez-table-cell ez-cell-align-middle-left" data-ezid="${dataTagIdStr}">
                    ${dataTag.tagName}
                </td>
                <td id="${rowId}Cell_DataTag_${dataTagIdStr}_IntegrationDataTagMap"
                    class="ez-table-cell ez-cell-align-middle-center" data-ezid="${dataTagIdStr}">
                    <input id="${inputId}" type="text" class="ezFullWidthEditor" data-ezid="${dataTagIdStr}"
                        name="hidden" autocomplete="${inputId}" data-mapping-json="${mappingJson}"
                        placeholder="enter ${EzADPIntegrationSetupDialog.ezInstance.ezIntegrationJobMapFieldDisplayName}" ${value}/>
                </td>
            </tr>`;
    }

    /**
     @public @method
     Builds the hourse type mapping tab view
     */
    ezBuildHoursTypeMappingTabView() {
        let viewId = EzADPIntegrationSetupDialog.ezInstance.ezViewIds[EzIntegrationMappingViewType.HOURS_TYPE_MAPPING];

        return EzHtml.build`
            <div id="${viewId}" data-tabgroup="${EzADPIntegrationSetupDialog.ezInstance.ezTabGroupName}" class="ez-tab-view-container" style="display:none">
                <div id="${viewId}_ListDiv" class="ezContainer-integration-input-container">
                    <table id="${viewId}_Table" class="ez-table-full-width">
                        <thead id="${viewId}_TableHeader" class="ez-table-header">
                            <tr id="${viewId}_TableHeader_Row_HoursType_TypeName" class="ez-table-cell-header-fixed">
                                <th id="${viewId}_TableHeader_Cell_TimeOff_Type"
                                    class="ez-table-cell-header-fixed">
                                    EzClocker Time Off Type
                                </th>
                                <th id="${viewId}_TableHeader_Cell_ADPHourCode"
                                    class="ez-table-cell-header-fixed">
                                    ADP Hour Code
                                </th>
                                <th id="${viewId}_TableHeader_Cell_ADPHourType"
                                    class="ez-table-cell-header-fixed">
                                    ADP Hour Type
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
     @public @method
     Builds the Job Mappings List HTML
     @returns {String}
     */
    ezBuildHoursTypeMappingsList() {
        let viewId = EzADPIntegrationSetupDialog.ezInstance.ezViewIds[EzIntegrationMappingViewType.HOURS_TYPE_MAPPING];

        ezApi.ezclocker.ezUi.ezClearContent(`${viewId}_TableBody`);

        let ezIntegrationResponse = ezApi.ezIsValid(EzADPIntegrationSetupDialog.ezInstance.ezIntegrationResponse)
            ? EzADPIntegrationSetupDialog.ezInstance.ezIntegrationResponse
            : new EzADPIntegrationSetupResponse();

        let hoursTypeMappingHtml = EzString.EMPTY;

        EzADPIntegrationSetupDialog.ezInstance.ezSupportedEzClockerPayRateTypes.forEach((payRateType) => {
            let payRateIntegrationMapRequest =
                ezIntegrationResponse.ezGetPayRateIntegrationMapRequestForPayRateType(payRateType);
            if (ezApi.ezIsValid(payRateIntegrationMapRequest) &&
                EzString.hasLength(payRateIntegrationMapRequest.ezClockerPayRateType) &&
                payRateType === payRateIntegrationMapRequest.ezClockerPayRateType) {
                hoursTypeMappingHtml += EzADPIntegrationSetupDialog.ezInstance.ezBuildHoursTypeRow(viewId, payRateType, payRateIntegrationMapRequest);
            } else {
                hoursTypeMappingHtml += EzADPIntegrationSetupDialog.ezInstance.ezBuildHoursTypeRow(viewId, payRateType, null);
            }
        });

        return hoursTypeMappingHtml;
    }

    /**
     @public @method
     Builds a job mapping row for the provided job code.
     @param {Number} dataTagId
     @param {String} dataTagTagName
     @param {Number|null} jobCodeMappingId
     @param {String|null} integrationDataTagId
     */
    ezBuildHoursTypeRow(viewId, ezClockerPayRateType, payRateIntegrationMapRequest) {
        let self = this;
        if (!EzString.hasLength(viewId)) {
            throw new EzBadParamException(
                'viewId',
                EzADPIntegrationSetupDialog.ezInstance.ezBuildHoursTypeRow);
        }
        if (!ezApi.ezIsValid(ezClockerPayRateType)) {
            throw new EzBadParamException(
                'ezClockerPayRateType',
                Ez.ezInstance.
                    EzADPIntegrationSetupDialog.ezInstance.ezBuildHoursTypeRow);
        }

        let mappingJson = EzString.EMPTY;

        let ezClockerPayRateCode = EzString.EMPTY;

        let integrationHourlyType = EzString.EMPTY;

        let optionsValue = `<option value="HOURS3" selected>HOUR 3</option><option value="HOURS4">HOUR 4</option><option value="NONE">NONE</option>`;

        if (ezApi.ezIsValid(payRateIntegrationMapRequest)) {
            mappingJson = ezApi.ezToJson(payRateIntegrationMapRequest);

            ezClockerPayRateCode = EzString.stringOrEmpty(payRateIntegrationMapRequest.integrationPayRateCode);

            integrationHourlyType = EzString.stringOrEmpty(payRateIntegrationMapRequest.integrationHourlyType);

            if (payRateIntegrationMapRequest.integrationHourlyType === 'HOURS4') {
                optionsValue = `<option value="HOURS3">HOUR 3</option><option value="HOURS4" selected>HOUR 4</option><option value="NONE">NONE</option>`;
            } else if (payRateIntegrationMapRequest.integrationHourlyType !== 'HOURS4' && payRateIntegrationMapRequest.integrationHourlyType !== 'HOURS3') {
                optionsValue = `<option value="HOURS3">HOUR 3</option><option value="HOURS4">HOUR 4</option><option value="NONE" selected>NONE</option>`;
            }
        }

        let value = EzString.hasLength(ezClockerPayRateCode)
            ? `value="${ezClockerPayRateCode}"`
            : EzString.EMPTY;

        let rowId = `${viewId}_TableBody_Mapping`;

        let inputId = `${EzADPIntegrationSetupDialog.ezInstance.ezDialogId}_HoursTypeMappingInput_${ezClockerPayRateType}`;

        return EzHtml.build`
            <tr id="${rowId}Row_EzHoursType_${ezClockerPayRateType}" class="ez-table-row"
                data-ezid="${ezClockerPayRateType}">
                <td id="${rowId}Cell_EzPayRateTypeDisplay_${ezClockerPayRateType}"
                    class="ez-table-cell ez-cell-align-middle-left" data-ezid="${ezClockerPayRateType}">
                    <span id="${inputId}">${EzClockerPayRateType.ezToDisplayValue(ezClockerPayRateType)}</span>
                </td>
                <td id="${rowId}Cell_PayRateCodeMapping_${ezClockerPayRateCode}"
                    class="ez-table-cell ez-cell-align-middle-center" data-ezid="${ezClockerPayRateCode}">
                    <input id="hourly_code_${inputId}" type="text" class="ezDialogEditor" data-ezid="${ezClockerPayRateCode}"
                        name="${inputId}" autocomplete="${inputId}" data-mappingJson="${mappingJson}"
                        placeholder="enter pay rate code" ${value}/>
                </td>
                <td id="${rowId}Cell_HourlyTypeMapping_${integrationHourlyType}"
                    class="ez-table-cell ez-cell-align-middle-center" data-ezid="${integrationHourlyType}">
                    <select
                        style="width: 50%"
                        id="hourly_type_${inputId}"
                        class="ezFullWidth">
                        ${optionsValue}
                    </select>
                </td>
            </tr>`;
    }

    /**
     * @public @method
     * Buuilds the hour's type option
     * @param {object} payRateIntegrationMapRequest
     * @returns {string}
     */
    buildHoursTypeOptions(payRateIntegrationMapRequest = {}) {
        if (payRateIntegrationMapRequest.integrationHourlyType === 'HOURS3') {
            return `<option value="HOURS3" selected>HOUR 3</option><option value="HOURS4">HOUR 4</option><option value="NONE">NONE</option>`;
        } else if (payRateIntegrationMapRequest.integrationHourlyType === 'HOURS4') {
            return `<option value="HOURS3">HOUR 3</option><option value="HOURS4" selected>HOUR 4</option><option value="NONE">NONE</option>`;
        } else {
            return `<option value="HOURS3">HOUR 3</option><option value="HOURS4">HOUR 4</option><option value="NONE" selected>NONE</option>`;
        }
    }

    /**
     * @public @method
     * Builds additional resources tab view
     */
    ezBuildAdditionalResourcesTabView() {
        let viewId = EzADPIntegrationSetupDialog.ezInstance.ezViewIds[EzIntegrationMappingViewType.ADDITIONAL_RESOURCES];

        return EzHtml.build`
            <div id="${viewId}" data-tabgroup="ACSIntegrationTabs" class="ez-tab-view-container"
                style="display:none">
                <div id="${viewId}_ListDiv" class="ezContainer-integration-input-container">
                    <table id="${viewId}_Table" class="ez-table-full-width">
                        <thead id="${viewId}_TableHeader" class="ez-table-header">
                            <tr id="${viewId}_TableHeaderRow" class="ez-table-row">
                                <th id="${viewId}_TableHeaderCell_EzDataTag_TagName" class="ez-table-cell-header-fixed">
                                    Additional Help and Resources
                                </th>
                                <th id="${viewId}_TableHeaderCell_IntegrationJobMapping" class="ez-table-cell-header-fixed">
                                    ${EzADPIntegrationSetupDialog.ezInstance.ezIntegrationJobMapFieldDisplayName}
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
     * @protected @method
     * Handles the tab button clicks
     * @param {Object} ezEvent
     */
    ezHandleTabClick(ezEvent) {
        if (!ezApi.ezIsValid(ezEvent) || !ezApi.ezIsValid(ezEvent.data.elementEvent)) {
            throw new EzBadParamException(
                'ezEvent',
                EzADPIntegrationSetupDialog.ezInstance,
                EzADPIntegrationSetupDialog.ezInstance.ezHandleTabClick);
        }

        if ('false' === ezApi.ezclocker.ezUi.ezGetElementDataAttributeValue(ezEvent.data.elementEvent.target, 'active')) {
            // Activate only if not already active
            EzADPIntegrationSetupDialog.ezInstance.ezActivateTab(
                ezApi.ezclocker.ezUi.ezGetElementDataAttributeValue(ezEvent.data.elementEvent.target, 'ezintegrationmappingviewtype'));
        }
    }

    /**
     * @protected @method
     * Handles the initial focus of the dialog
     */
    ezHandleInitialDialogFocus() {
        ezApi.ezclocker.ezUi.ezId(EzADPIntegrationSetupDialog.ezInstance.ezDialogId).off('focus');

        ezApi.ezclocker.ezUi.ezFocusElement(EzADPIntegrationSetupDialog.ezInstance.ezHeaderInputIds.ezAPDCompanyCodeInputId);

        EzADPIntegrationSetupDialog.ezInstance.ezSupportedMappings.forEach(
            (ezIntegrationMappingViewType) => ezUi.ezScrollTo(
                `${EzADPIntegrationSetupDialog.ezInstance.ezTabs[ezIntegrationMappingViewType].tabViewId}_ListDiv`, 0, 0));
    }

    /**
     * @public @method
     * Shows the validation error box
     * @param {String} em
     * @param {String|Null} inputId
     * @param {String|Null} tabId
    */
    ezShowValidationError(em, inputId, ezIntegrationMappingViewType) {
        if (EzString.hasLength(inputId) && ezApi.ezclocker.ezUi.ezElementExists(inputId)) {
            ezApi.ezclocker.ezUi.ezAddElementClass(
                inputId,
                EzADPIntegrationSetupDialog.ezInstance.ezUxIds.classNames.ezInputValidationErrorClass);
        }

        if (EzString.hasLength(ezIntegrationMappingViewType)) {
            EzADPIntegrationSetupDialog.ezInstance.ezApplyErrorTab(ezIntegrationMappingViewType);
        }

        if (EzString.hasLength(em)) {
            ezApi.ezclocker.ezUi.ezContent(
                EzADPIntegrationSetupDialog.ezInstance.ezUxIds.elementIds.ezErrorMessageId,
                em);
            ezApi.ezclocker.ezUi.ezShowElement(EzADPIntegrationSetupDialog.ezInstance.ezUxIds.elementIds.ezErrorMessageContainerId);
        }
    }

    /**
     * @public @method
     * Hides the validation error box.
     * @param {String|Null} inputId
     * @param {String|Null} tabId
     */
    ezHideValidationError(inputId, ezIntegrationMappingViewType) {
        if (EzString.hasLength(inputId) && ezApi.ezclocker.ezUi.ezElementExists(inputId)) {
            ezApi.ezclocker.ezUi.ezRemoveElementClass(
                inputId,
                EzADPIntegrationSetupDialog.ezInstance.ezUxIds.classNames.ezInputValidationErrorClass);
        }

        if (EzString.hasLength(ezIntegrationMappingViewType)) {
            EzADPIntegrationSetupDialog.ezInstance.ezApplyNormalTab(ezIntegrationMappingViewType);
        }

        if (ezApi.ezclocker.ezUi.ezIsElementVisible(EzADPIntegrationSetupDialog.ezInstance.ezUxIds.elementIds.ezErrorMessageContainerId)) {
            ezApi.ezclocker.ezUi.ezClearContent(EzADPIntegrationSetupDialog.ezInstance.ezUxIds.elementIds.ezErrorMessageId);

            ezApi.ezclocker.ezUi.ezHideElement(EzADPIntegrationSetupDialog.ezInstance.ezUxIds.elementIds.ezErrorMessageContainerId);
        }
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
        return 'ezADPIntegrationSetupDialog';
    }

    /**
     * @static
     * @public @readonly @property
     * Returns an object of event names that this class may trigger.
     * @returns {object}
     */
    static get ezEventNames() {
        return {
            onReady: 'ezOn_EzADPIntegrationSetupDialog_Ready',
            onIntegrationSetupDialogVisible: 'ezOn_EzADPIntegrationSetupDialog_Visible',
            onIntegrationSetupDialogClose: 'ezOn_EzADPIntegrationSetupDialog__Closed',
            onIntegrationSetupDialogSubmitted: 'ezOn_EzADPIntegrationSetupDialog__Submitted',
            onIntegrationSetupDialogError: 'ezOn_EzADPIntegrationSetupDialog_Error',
            onIntegrationSetupDialogDataReady: 'ezOn_EzADPIntegrationSetupDialog_DataReady'
        };
    }

    /**
     * @static
     * @private @field
     * Stores the singleton instance of this class that was created by and registerd with EzApi.
     * @type {EzADPIntegrationSetupDialog}
     */
    static #ezInstance = globalThis?.ezApi?.ready && globalThis.ezApi?.ezclocker?.[EzADPIntegrationSetupDialog.ezApiName]
        ? globalThis.ezApi.ezclocker[EzADPIntegrationSetupDialog.ezApiName]
        : null;
    /**
     * @static
     * @public @property @getter
     * Returns the singleton instance of this class that is registered with EzApi (if available yet)
     * @returns {EzADPIntegrationSetupDialog}
     */
    static get ezInstance() {
        return EzADPIntegrationSetupDialog.#ezInstance;
    }
    /**
     * @static
     * @public @property @setter
     * Sets the singleton instance of of this class that is registered with EzApi.
     * @param {EzADPIntegrationSetupDialog} instance
     */
    static set ezInstance(instance) {
        if (null != EzADPIntegrationSetupDialog.#ezInstance) {
            throw new Error('EzADPIntegrationSetupDialog\'s singleton instance is already reigstered with EzApi.');
        }

        EzADPIntegrationSetupDialog.#ezInstance = instance;
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
    static #ezApiRegistrationState = globalThis?.ezApi?.ready && globalThis.ezApi?.ezclocker?.[EzADPIntegrationSetupDialog.ezApiName]
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
        return EzADPIntegrationSetupDialog.#ezApiRegistrationState;
    }
    /**
     * @static
     * @public @property @setter
     * Sets the ezApi registration state of this classes's singleton instance.
     * @param {string} ezApiRegistrationState
     * A valid enum property value from EzRegistrationState
     */
    static set ezApiRegistrationState(ezApiRegistrationState) {
        EzADPIntegrationSetupDialog.#ezApiRegistrationState = EzRegistrationState.ezValueOf(ezApiRegistrationState);
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
        return EzRegistrationState.PENDING === EzADPIntegrationSetupDialog.ezApiRegistrationState &&
            globalThis?.ezApi?.ready && globalThis.ezApi?.ezclocker;
    }

    /**
     * @static
     * @private @readonly @property
     * Returns if this class's singleton instance is registered with ezApi yet.
     * @returns {boolean}
     */
    static get #ezIsRegistered() {
        return null != EzADPIntegrationSetupDialog.ezInstance &&
            EzRegistrationState.REGISTERED === EzADPIntegrationSetupDialog.ezApiRegistrationState;
    }

    /**
     * @static
     * @private @method
     * Attempts to register the singleton instance for this class with ezApi. Returns true
     * if successful, false otherwise.
     * @returns {boolean}
     */
    static #ezRegistrator() {
        if (EzADPIntegrationSetupDialog.#ezCanRegister && !EzADPIntegrationSetupDialog.#ezIsRegistered) {
            globalThis.ezApi.ezRegisterNewApi(EzADPIntegrationSetupDialog, EzADPIntegrationSetupDialog.ezApiName);
        }

        return EzADPIntegrationSetupDialog.#ezIsRegistered;
    }

    /**
     * @static
     * Static Initialization
     * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
     * >> IMPORTANT <<
     * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
     * Make sure the following properties and methods get defined BEFORE this static initialization section:
     *     1) Property getter EzADPIntegrationSetupDialog.ezApiName
     *     2) Property getter EzADPIntegrationSetupDialog.ezEventNames
     *     3) Property getter EzADPIntegrationSetupDialog.ezInstance
     *     4) Property setter EzADPIntegrationSetupDialog.ezInstance
     *     5) Property getter EzADPIntegrationSetupDialog.ezApiRegistrationState
     *     6) Property setter EzADPIntegrationSetupDialog.ezApiRegistrationState
     *     7) Property getter EzADPIntegrationSetupDialog.#ezCanRegister
     *     8) Property getter EzADPIntegrationSetupDialog.#ezIsRegistered
     *     9) Method EzADPIntegrationSetupDialog.#ezRegistrator()
     */
    static {
        if (null == EzADPIntegrationSetupDialog.ezApiRegistrationState) {
            EzADPIntegrationSetupDialog.ezApiRegistrationState = EzRegistrationState.PENDING;

            document.addEventListener(
                'onEzApiReady',
                EzADPIntegrationSetupDialog.#ezRegistrator);
        }
    }

    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    // !! DO NOT PLACE ANY non-initialization fields, getter/setter methods, static methods, or class methods beyond above section !!
    // NO CODE AFTER THIS SECTION
    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

}

