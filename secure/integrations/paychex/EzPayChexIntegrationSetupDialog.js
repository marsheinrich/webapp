import { EzBadParamException } from '/ezlibrary/exceptions/EzBadParamException.js';

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

import { EzPayChexIntegrationSetupController } from '/secure/integrations/paychex/EzPayChexIntegrationSetupController.js';
import { EzPayChexIntegrationSetupResponse } from '/secure/integrations/paychex/EzPayChexIntegrationSetupResponse.js';
import { EzPayChexIntegrationSetupRequest } from '/secure/integrations/paychex/EzPayChexIntegrationSetupRequest.js';
import { EzPayChexHeaderFieldName } from '/secure/integrations/paychex/EzPayChexHeaderFieldName.js';

import {
    EzRegistrationState,
    EzElementEventName,
    EzClockerContextEventName,
    EzFeaturePackageId
} from '/ezlibrary/enums/EzEnumerations.js';

/**
    @public
    View for the copy schedule forward feature on the ezClocker website for employers.
 */
export class EzPayChexIntegrationSetupDialog extends EzIntegrationSetupDialog {
    /**
        @public @static @field
        @type {EzClockerContext}
     */
    static #ezInstance = Object.prototype.hasOwnProperty.call(globalThis, 'ezApi') &&
        globalThis.ezApi &&
        Object.prototype.hasOwnProperty.call(globalThis.ezApi, 'ezclocker') &&
        globalThis.ezApi.ezclocker &&
        Object.prototype.hasOwnProperty.call(globalThis.ezApi.ezclocker, EzPayChexIntegrationSetupDialog.ezApiName) &&
        globalThis.ezApi.ezclocker[EzPayChexIntegrationSetupDialog.ezApiName]
        ? globalThis.ezApi.ezclocker[EzPayChexIntegrationSetupDialog.ezApiName]
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
        Object.prototype.hasOwnProperty.call(globalThis.ezApi.ezclocker, EzPayChexIntegrationSetupDialog.ezApiName) &&
        globalThis.ezApi.ezclocker[EzPayChexIntegrationSetupDialog.ezApiName]
        ? EzRegistrationState.REGISTERED
        : null;

    /**
        @public @static @readonly @property
        Returns the name of the singleton instance of this class stored in ezApi.
        @returns {string}
     */
    static get ezApiName() {
        return 'ezPayChexIntegrationSetupDialog';
    }

    /**
        @public @static @readonly @property
        Returns an object of property = event name for events triggered by this class.
        @returns {string}
     */
    static get ezEventNames() {
        return {
            onReady: 'ezOn_EzPayChexIntegrationSetupDialog_Ready',
            onIntegrationSetupDialogVisible: 'ezOn_EzPayChexIntegrationSetupDialog_Visible',
            onIntegrationSetupDialogClose: 'ezOn_EzPayChexIntegrationSetupDialog_Closed',
            onIntegrationSetupDialogSubmitted: 'ezOn_EzPayChexIntegrationSetupDialog_Submitted',
            onIntegrationSetupDialogError: 'ezOn_EzPayChexIntegrationSetupDialog_Error',
            onIntegrationSetupDialogDataReady: 'ezOn_EzPayChexIntegrationSetupDialog_DataReady'
        };
    }

    /**
        @public @static @property @getter
        Returns the ezApi registration state of this classes's singleton instance.
        @returns {string}
        A valid enum property value from EzRegistrationState
     */
    static get ezApiRegistrationState() {
        return EzPayChexIntegrationSetupDialog.#ezApiRegistrationState;
    }

    /**
        @public @static @property @setter
        Sets the ezApi registration state of this classes's singleton instance.
        @param {string} ezApiRegistrationState
        A valid enum property value from EzRegistrationState
     */
    static set ezApiRegistrationState(ezApiRegistrationState) {
        EzPayChexIntegrationSetupDialog.#ezApiRegistrationState = EzRegistrationState.ezValueOf(ezApiRegistrationState);
    }

    /**
        @public @static @getter @property
        Returns the singleton instance of EzDateTime registered with EzApi (if available yet)
        @param {EzClockerContext}
     */
    static get ezInstance() {
        return EzPayChexIntegrationSetupDialog.#ezInstance;
    }

    /**
        @public @static @getter @property
        Returns the singleton instance of EzDateTime registered with EzApi (if available yet)
     */
    static set ezInstance(ezwEmployerExportTimeSheetDialog) {
        if (null != EzPayChexIntegrationSetupDialog.#ezInstance) {
            throw new Error('EzPaycomIntegrationSetupDialog\'s singleton instance is already reigstered with EzApi.');
        }

        EzPayChexIntegrationSetupDialog.#ezInstance = ezwEmployerExportTimeSheetDialog;
    }

    /**
        @public @static @readonly @property
        Returns if the single instance of this class has all it's dependent ezApi references ready and can now register with ezApi.
        @returns {boolean}
     */
    static get ezCanRegister() {
        return 'PENDING' === EzPayChexIntegrationSetupDialog.ezApiRegistrationState &&
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
        return null != EzPayChexIntegrationSetupDialog.ezInstance &&
            EzRegistrationState.REGISTERED === EzPayChexIntegrationSetupDialog.ezApiRegistrationState;
    }

    /**
        @private @static @method
        Registers the singleton instance of this class with ezApi. Returns true if registered, false if unable to register.
        @returns {boolean}
     */
    static #ezRegistrator() {
        if (EzPayChexIntegrationSetupDialog.ezCanRegister && !EzPayChexIntegrationSetupDialog.#ezIsRegistered) {
            globalThis.ezApi.ezRegisterNewApi(EzPayChexIntegrationSetupDialog, EzPayChexIntegrationSetupDialog.ezApiName);
        }

        return EzRegistrationState.REGISTERED === EzPayChexIntegrationSetupDialog.ezApiRegistrationState;
    }

    /**
        @static
        Static initializer
     */
    static {
        if (!EzPayChexIntegrationSetupDialog.#ezIsRegistered) {
            EzPayChexIntegrationSetupDialog.ezApiRegistrationState = EzRegistrationState.PENDING;

            if (!EzPayChexIntegrationSetupDialog.#ezRegistrator()) {
                document.addEventListener(
                    'onEzApiReady',
                    () => {
                        if (!this.#ezRegistrator()) {
                            document.addEventListener(
                                EzEventEngine.ezEventNames.onReady,
                                EzPayChexIntegrationSetupDialog.#ezRegistrator);

                            document.addEventListener(
                                ezApi.ezclocker.ezUi.ezEventNames.onReady,
                                EzPayChexIntegrationSetupDialog.#ezRegistrator);

                            document.addEventListener(
                                EzDialog.ezEventNames.onReady,
                                EzPayChexIntegrationSetupDialog.#ezRegistrator);
                        }
                    });
            }
        }
    }

    /**
        Creates a new instance of EzPayChexIntegrationSetupDialog
     */
    constructor() {
        super(
            // ezIntegrationProviderId
            EzIntegrationProviderId.PAYCHEX,
            // controllerRef
            new EzPayChexIntegrationSetupController());

        this.ezDialogId = 'EzPayChexIntegrationSetupDialog';

        // Header input ids
        this.ezHeaderInputIds['ezPayChexClientIdInputId'] =
            EzPayChexHeaderFieldName.ezToInputId(EzPayChexHeaderFieldName.PAYCHEX_CLIENT_ID),
            this.ezHeaderInputIds['ezPayChexIntegrationEnableInputId'] =
            EzPayChexHeaderFieldName.ezToInputId(EzPayChexHeaderFieldName.INTEGRATION_ENABLED)

        this.ezSupportedEzClockerPayRateTypes = [
            EzClockerPayRateType.REGULAR,
            EzClockerPayRateType.OVERTIME,
            EzClockerPayRateType.PAID_SICK,
            EzClockerPayRateType.PAID_PTO,
            EzClockerPayRateType.PAID_HOLIDAY
        ];

        this.ezUnsupportedEzClockerPayRateTypes = [
            EzClockerPayRateType.UNKNOWN,
            EzClockerPayRateType.UNPAID
        ];

        this.ezSupportedMappings = [
            EzIntegrationMappingViewType.EMPLOYEE_MAPPING,
            EzIntegrationMappingViewType.PAY_RATE_MAPPING,
            EzIntegrationMappingViewType.JOB_MAPPING,
            //EzIntegrationMappingViewType.ADDITIONAL_RESOURCES
        ];

        // Tab button ids
        this.ezTabIds[EzIntegrationMappingViewType.EMPLOYEE_MAPPING] = ezApi.ezIdTemplate`
            ${this.ezDialogId}_
            ${EzIntegrationMappingViewType.ezToIdSuffix(EzIntegrationMappingViewType.EMPLOYEE_MAPPING)}_Button`;
        this.ezTabIds[EzIntegrationMappingViewType.PAY_RATE_MAPPING] = ezApi.ezIdTemplate`
            ${this.ezDialogId}_
            ${EzIntegrationMappingViewType.ezToIdSuffix(EzIntegrationMappingViewType.PAY_RATE_MAPPING)}_Button`;
        this.ezTabIds[EzIntegrationMappingViewType.JOB_MAPPING] = ezApi.ezIdTemplate`
            ${this.ezDialogId}_
            ${EzIntegrationMappingViewType.ezToIdSuffix(EzIntegrationMappingViewType.JOB_MAPPING)}_Button`;


        // Dialog tab view ids
        this.ezViewIds[EzIntegrationMappingViewType.EMPLOYEE_MAPPING] = ezApi.ezIdTemplate`
            ${this.ezDialogId}_
            ${EzIntegrationMappingViewType.ezToIdSuffix(EzIntegrationMappingViewType.EMPLOYEE_MAPPING)}_TabView`;
        this.ezViewIds[EzIntegrationMappingViewType.PAY_RATE_MAPPING] = ezApi.ezIdTemplate`
            ${this.ezDialogId}_
            ${EzIntegrationMappingViewType.ezToIdSuffix(EzIntegrationMappingViewType.PAY_RATE_MAPPING)}_TabView`;
        this.ezViewIds[EzIntegrationMappingViewType.JOB_MAPPING] = ezApi.ezIdTemplate`
            ${this.ezDialogId}_
            ${EzIntegrationMappingViewType.ezToIdSuffix(EzIntegrationMappingViewType.JOB_MAPPING)}_TabView`;

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
        this.ezTabs[EzIntegrationMappingViewType.PAY_RATE_MAPPING] = {
            id: this.ezTabIds[EzIntegrationMappingViewType.PAY_RATE_MAPPING],
            tabViewId: this.ezViewIds[EzIntegrationMappingViewType.PAY_RATE_MAPPING],
            caption: EzIntegrationMappingViewType.ezToDisplayValue(EzIntegrationMappingViewType.PAY_RATE_MAPPING),
            tabGroup: this.ezTabGroupName,
            visible: true,
            active: false,
            ezView: ezApi.ezTemplate`
                <div id="${this.ezViewIds[EzIntegrationMappingViewType.PAY_RATE_MAPPING]}"
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
            ezView: ezApi.ezTemplate`
                <div id="${this.ezViewIds[EzIntegrationMappingViewType.JOB_MAPPING]}"
                    data-tabgroup="${this.ezTabGroupName}" class="ez-tab-view-container" style="display:none">
                </div>`
        };
    }

    /**
        @override
        @pubilc @readonly @property
        @returns {string}
     */
    get ezIntegrationEmployeeMapFieldDisplayName() {
        return `${this.ezIntegrationName} Worker Id`;
    }

    /**
        @override
        @pubilc @readonly @property
        @returns {string}
     */
    get ezIntegrationPayRateMapFieldDisplayName() {
        return `${this.ezIntegrationName} Pay Components`;
    }

    /**
        @override
        @pubilc @readonly @property
        @returns {string}
     */
    get ezIntegrationJobMapFieldDisplayName() {
        return `${this.ezIntegrationName} Labor Assignment`;
    }

    /**
        @override
        @protected @method
        Initializes the ezUxIds property for the class instance
        @returns {Object}
        Returns the ezUxIds object to assign to this.ezUxIds
     */
    ezInitUxIds() {
        super.ezInitUxIds();

        EzPayChexIntegrationSetupDialog.ezInstance.ezUxIdsProperty.elementIds.ezErrorMessageContainerId =
            `${EzPayChexIntegrationSetupDialog.ezInstance.ezUxIdsProperty.ezDialogId}_ValidationErrorContainer`;

        EzPayChexIntegrationSetupDialog.ezInstance.ezUxIdsProperty.elementIds.ezErrorMessageId =
            `${EzPayChexIntegrationSetupDialog.ezInstance.ezUxIdsProperty.ezDialogId}_EzValidationErrorMessage`;
    }

    /**
        @override
        @protected @method
        Initializes EzPayChexIntegrationSetupDialog
     */
    ezInit() {
        super.ezInit();

        ezApi.ezclocker.ezEventEngine.ezRegisterEvent(
            EzPayChexIntegrationSetupDialog.ezApiName,
            EzPayChexIntegrationSetupDialog.ezEventNames.onIntegrationSetupDialogVisible);

        ezApi.ezclocker.ezEventEngine.ezRegisterEvent(
            EzPayChexIntegrationSetupDialog.ezApiName,
            EzPayChexIntegrationSetupDialog.ezEventNames.onIntegrationSetupDialogClose);

        ezApi.ezclocker.ezEventEngine.ezRegisterEvent(
            EzPayChexIntegrationSetupDialog.ezApiName,
            EzPayChexIntegrationSetupDialog.ezEventNames.onIntegrationSetupDialogSubmitted);

        ezApi.ezclocker.ezEventEngine.ezRegisterEvent(
            EzPayChexIntegrationSetupDialog.ezApiName,
            EzPayChexIntegrationSetupDialog.ezEventNames.onIntegrationSetupDialogError);

        ezApi.ezclocker.ezEventEngine.ezRegisterEvent(
            EzPayChexIntegrationSetupDialog.ezApiName,
            EzPayChexIntegrationSetupDialog.ezEventNames.onIntegrationSetupDialogDataReady);

        return EzPayChexIntegrationSetupDialog.ezInstance;
    }

    /**
        @override
        @protected @method
        Initializes the EzPayChexIntegrationSetupDialog UX
     */
    ezInitUX() {
        super.ezInitUX();

        ezApi.ezclocker.ezEventEngine.ezWantEvent(
            EzClockerContextEventName.onSelectedEmployerLicenseReady,
            EzPayChexIntegrationSetupDialog.ezApiName,
            () => {
                let activeEmployerLicense = ezApi.ezclocker.ezClockerContext.ezGetEmployerContext().selectedEmployerAccountLicense;

                const timeOffFeature = activeEmployerLicense.featurePackages.find(
                    (feature) => EzFeaturePackageId.TIME_OFF === feature.featurePackageId || EzFeaturePackageId.TIME_OFF_YEARLY === feature.featurePackageId);

                if (!timeOffFeature || (timeOffFeature && !timeOffFeature.enabled)) {
                    EzPayChexIntegrationSetupDialog.ezInstance.ezSupportedEzClockerPayRateTypes =
                        EzPayChexIntegrationSetupDialog.ezInstance.ezSupportedEzClockerPayRateTypes.filter(
                            (payRate) => payRate !== EzClockerPayRateType.PAID_SICK &&
                                payRate !== EzClockerPayRateType.PAID_PTO &&
                                payRate !== EzClockerPayRateType.PAID_HOLIDAY
                        );
                }
            });

        EzPayChexIntegrationSetupDialog.ezInstance.ezBuildTabViews();

        ezApi.ezclocker.ezUi.ezPrependContent(
            EzPayChexIntegrationSetupDialog.ezInstance.ezUxIds.parentIds.ezContentParentId,
            EzPayChexIntegrationSetupDialog.ezInstance.ezBuildFullscreenHtml());

        ezApi.ezclocker.ezEventEngine.ezWantElementEvent(
            ezApi.ezIdTemplate`${EzPayChexIntegrationSetupDialog.ezInstance.ezDialogId}_FullScreenOK`,
            EzElementEventName.CLICK,
            EzPayChexIntegrationSetupDialog.ezApiName,
            EzPayChexIntegrationSetupDialog.ezInstance.ezSubmit);

        ezApi.ezclocker.ezUi.ezAppendContent(
            EzPayChexIntegrationSetupDialog.ezInstance.ezDialogParentContainerId,
            EzPayChexIntegrationSetupDialog.ezInstance.ezBuildDialogHtml());

        EzPayChexIntegrationSetupDialog.ezInstance.ezInitDialog();

        EzPayChexIntegrationSetupDialog.ezInstance.ezSupportedMappings.forEach(
            (ezIntegrationMappingViewType) => ezApi.ezclocker.ezEventEngine.ezWantElementEvent(
                EzPayChexIntegrationSetupDialog.ezInstance.ezTabIds[ezIntegrationMappingViewType],
                EzElementEventName.CLICK,
                EzPayChexIntegrationSetupDialog.ezApiName,
                EzPayChexIntegrationSetupDialog.ezInstance.ezHandleTabClick));
    }

    /**
        @override
        @protected @method
        Initializes the dialog's data
     */
    ezInitData() {
        super.ezInitData()
            .then(() => ezApi.ezclocker.ezEventEngine.ezTriggerEvent(
                EzPayChexIntegrationSetupDialog.ezEventNames.onIntegrationSetupDialogDataReady,
                EzPayChexIntegrationSetupDialog.ezApiName));
    }

    /**
        @protected @method
        Resets the dialog's state and data to the initial values.
     */
    ezResetDialog() {
        EzPayChexIntegrationSetupDialog.ezInstance.ezJobCodesById = {};
        EzPayChexIntegrationSetupDialog.ezInstance.ezJobCodes = [];
        EzPayChexIntegrationSetupDialog.ezInstance.ezIntegrationResponse = null;
        EzPayChexIntegrationSetupDialog.ezInstance.ezIntegrationSetupDialogDisplayMode = EzIntegrationSetupDialogDisplayMode.DIALOG;

        EzPayChexIntegrationSetupDialog.ezInstance.ezHideValidationError(
            EzPayChexIntegrationSetupDialog.ezInstance.ezHeaderInputIds.ezPayChexClientIdInputId,
            EzIntegrationMappingViewType.EMPLOYEE_MAPPING);
        EzPayChexIntegrationSetupDialog.ezInstance.ezHideValidationError(
            null,
            EzIntegrationMappingViewType.PAY_RATE_MAPPING);
        EzPayChexIntegrationSetupDialog.ezInstance.ezHideValidationError(
            null,
            EzIntegrationMappingViewType.JOB_MAPPING);
        EzPayChexIntegrationSetupDialog.ezInstance.ezDuplicateEmployeeMapIdDetected = false;

        ezApi.ezclocker.ezUi.ezHideElement(EzPayChexIntegrationSetupDialog.ezInstance.ezUxIds.elementIds.ezErrorMessageContainerId);
        ezApi.ezclocker.ezUi.ezContent(EzPayChexIntegrationSetupDialog.ezInstance.ezUxIds.elementIds.ezErrorMessageId, '');
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
            ezApi.ezMessageTemplate`Loading ${EzPayChexIntegrationSetupDialog.ezInstance.ezIntegrationName} configuration ...`,
            (waitDone) => {
                ezApi.ezclocker.ezEventEngine.ezWantEvent(
                    EzPayChexIntegrationSetupDialog.ezEventNames.onIntegrationSetupDialogDataReady,
                    EzPayChexIntegrationSetupDialog.ezApiName, () => {
                        EzPayChexIntegrationSetupDialog.ezInstance.ezUpdateDialogHeaderValues();

                        EzPayChexIntegrationSetupDialog.ezInstance.ezBuildSupportedMappingViews();


                        EzPayChexIntegrationSetupDialog.ezInstance.ezShowDialogInMode();
                        return waitDone().then(ezApi.ezIgnoreResolve);
                    });

                EzPayChexIntegrationSetupDialog.ezInstance.ezInitData();
            });
    }

    /**
        @protected @method
        Shows the dialog UX in the specified display mode
     */
    ezShowDialogInMode() {
        if ('FULL_SCREEN' === EzPayChexIntegrationSetupDialog.ezInstance.ezIntegrationSetupDialogDisplayMode) {
            let dialogElement = ezApi.ezclocker.ezUi.ezFindByElementOrId(EzPayChexIntegrationSetupDialog.ezInstance.ezDialogId);
            if (EzPayChexIntegrationSetupDialog.ezInstance.ezFullScreenParentId !== dialogElement.parentElement.id) {
                ezApi.ezclocker.ezUi.ezReparentElement(
                    ezApi.ezIdTemplate`${EzPayChexIntegrationSetupDialog.ezInstance.ezDialogId}_DialogContent`,
                    EzPayChexIntegrationSetupDialog.ezInstance.ezFullScreenContentId);
            }

            EzPayChexIntegrationSetupDialog.ezInstance.ezActivateTab(EzIntegrationMappingViewType.EMPLOYEE_MAPPING);

            ezApi.ezclocker.ezUi.ezHideElementAnimated(
                EzPayChexIntegrationSetupDialog.ezInstance.ezContentId,
                'slideOutLeft')
                .then(
                    () => ezApi.ezclocker.ezUi.ezShowElementAnimated(
                        EzPayChexIntegrationSetupDialog.ezInstance.ezFullScreenParentId,
                        'slideInRight',
                        'grid'))
                .then(
                    () => {
                        ezApi.ezclocker.ezEventEngine.ezTriggerEvent(
                            EzPayChexIntegrationSetupDialog.ezEventNames.onIntegrationSetupDialogVisible,
                            EzPayChexIntegrationSetupDialog.ezInstance);
                    });
        } else {
            let dialogElement = ezApi.ezclocker.ezUi.ezFindByElementOrId(EzPayChexIntegrationSetupDialog.ezInstance.ezDialogId);
            if (EzPayChexIntegrationSetupDialog.ezInstance.ezDialogId !== dialogElement.parentElement.id) {
                ezApi.ezclocker.ezUi.ezReparentElement(
                    ezApi.ezIdTemplate`${EzPayChexIntegrationSetupDialog.ezInstance.ezDialogId}_DialogContent`,
                    EzPayChexIntegrationSetupDialog.ezInstance.ezDialogId);
            }

            ezApi.ezclocker.ezDialog.ezShowDialog(EzPayChexIntegrationSetupDialog.ezInstance.ezDialogId).then(() => {
                EzPayChexIntegrationSetupDialog.ezInstance.ezActivateTab(EzIntegrationMappingViewType.EMPLOYEE_MAPPING);

                ezApi.ezclocker.ezEventEngine.ezTriggerEvent(
                    EzPayChexIntegrationSetupDialog.ezEventNames.onIntegrationSetupDialogVisible,
                    EzPayChexIntegrationSetupDialog.ezInstance);
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
        if ('FULL_SCREEN' === EzPayChexIntegrationSetupDialog.ezInstance.ezIntegrationSetupDialogDisplayMode) {
            ezApi.ezclocker.ezUi.ezHideElementAnimated(
                EzPayChexIntegrationSetupDialog.ezInstance.ezFullScreenParentId,
                'slideOutRight')
                .then(() => ezApi.ezclocker.ezUi.ezShowElementAnimated(
                    EzPayChexIntegrationSetupDialog.ezInstance.ezContentId,
                    'slideInLeft'));
        } else {
            ezApi.ezclocker.ezDialog.ezCloseDialog(EzPayChexIntegrationSetupDialog.ezInstance.ezDialogId);
        }

        ezApi.ezclocker.ezEventEngine.ezTriggerEvent(
            EzPayChexIntegrationSetupDialog.ezEventNames.onIntegrationSetupDialogClose,
            EzPayChexIntegrationSetupDialog.ezInstanc);

        if (ezApi.ezIsFunction(EzPayChexIntegrationSetupDialog.ezInstance.ezCloseCallback)) {
            EzPayChexIntegrationSetupDialog.ezInstance.ezCloseCallback();
        }

        EzPayChexIntegrationSetupDialog.ezInstance.ezResetDialog();
        ezApi.ezclocker.nav.ezNavigateToEmployerIntegrationsPage()
    }

    /**
        @protected @method
        Determines if the configuration data is valid and all required data is available.
        @param {EzPayChexIntegrationSetupRequest} integrationSetupRequest
        @returns {Boolean}
     */
    ezValidateConfiguration(integrationSetupRequest) {
        if (!ezApi.ezIsValid(integrationSetupRequest)) {
            throw new EzBadParamException(
                'integrationSetupRequest',
                EzPayChexIntegrationSetupDialog.ezInstance.
                    EzPayChexIntegrationSetupDialog.ezInstance.ezValidateConfiguration);
        }

        let validationSuccess = !EzPayChexIntegrationSetupDialog.ezInstance.ezDuplicateEmployeeMapIdDetected;

        if (ezApi.ezIsTrue(validationSuccess)) {
            EzPayChexIntegrationSetupDialog.ezInstance.ezHideValidationError(
                EzPayChexIntegrationSetupDialog.ezInstance.ezHeaderInputIds.ezPayChexClientIdInputId,
                EzIntegrationMappingViewType.EMPLOYEE_MAPPING);
            EzPayChexIntegrationSetupDialog.ezInstance.ezHideValidationError(
                null,
                EzIntegrationMappingViewType.PAY_RATE_MAPPING);
            EzPayChexIntegrationSetupDialog.ezInstance.ezHideValidationError(
                null,
                EzIntegrationMappingViewType.JOB_MAPPING);
        }

        if (!ezApi.ezStringHasLength(integrationSetupRequest.ezGetPayChexClientId())) {
            EzPayChexIntegrationSetupDialog.ezInstance.ezShowValidationError(
                ezApi.ezEM`Please enter your ${EzPayChexIntegrationSetupDialog.ezInstance.ezIntegrationName} client id.`,
                'ezPayChexClientId',
                EzIntegrationMappingViewType.EMPLOYEE_MAPPING);
            validationSuccess = false;
        }

        if (ezApi.ezIsFalse(integrationSetupRequest.ezHasEmployeeMappings())) {
            EzPayChexIntegrationSetupDialog.ezInstance.ezApplyErrorTab('EzPayChexIntegrationDialog_EmployeeMapping');
            EzPayChexIntegrationSetupDialog.ezInstance.ezShowValidationError(
                ezApi.ezEM`
                    To save your ${EzPayChexIntegrationSetupDialog.ezInstance.ezIntegrationName} integration configuration you map at least one employee`,
                null,
                EzIntegrationMappingViewType.EMPLOYEE_MAPPING);
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
        let integrationSetupRequest = new EzPayChexIntegrationSetupRequest(
            ezApi.ezclocker.ezUi.ezIsCheckBoxChecked(EzPayChexIntegrationSetupDialog.ezInstance.ezHeaderInputIds.ezPayChexIntegrationEnableInputId));

        integrationSetupRequest.ezSetPayChexClientId(
            ezApi.ezStringOrEmpty(ezUi.ezGetInputValue(EzPayChexIntegrationSetupDialog.ezInstance.ezHeaderInputIds.ezPayChexClientIdInputId)));

        EzPayChexIntegrationSetupDialog.ezInstance.ezApplySupportedMappingsToRequest(integrationSetupRequest);

        if (ezApi.ezIsFalse(EzPayChexIntegrationSetupDialog.ezInstance.ezValidateConfiguration(integrationSetupRequest))) {
            return;
        }

        ezApi.ezclocker.ezUi.ezPageWaitExecute(`Saving ${EzPayChexIntegrationSetupDialog.ezInstance.ezIntegrationName} integration configuration ...`,
            (waitDone) => EzPayChexIntegrationSetupDialog.ezInstance.ezController.ezSaveIntegrationSetup(
                EzPayChexIntegrationSetupDialog.ezInstance.ezIntegrationProviderId,
                integrationSetupRequest)
                .then(
                    (response) => {
                        waitDone();
                        ezApi.ezclocker.ezEventEngine.ezTriggerEvent(
                            EzPayChexIntegrationSetupDialog.ezEventNames.onIntegrationSetupDialogSubmitted,
                            response);

                        if (ezApi.ezIsTrue(integrationSetupRequest.ezEnableIntegration) &&
                            ezApi.ezIsTrue(integrationSetupRequest.ezIsFirstTime)) {
                            ezApi.ezclocker.ezDialog.ezShowMessage(
                                EzPayChexIntegrationSetupDialog.ezInstance.ezDialogTitle,
                                ezApi.ezMsg`You have successfully setup your ${EzPayChexIntegrationSetupDialog.ezInstance.ezIntegrationName} integration!`)
                                .then(EzPayChexIntegrationSetupDialog.ezInstance.ezClose);
                        } else {
                            EzPayChexIntegrationSetupDialog.ezInstance.ezClose();
                        }
                    },
                    (eResponse, jqXHR) => {
                        ezApi.ezclocker.logger.error(ezApi.ezEM`
                        Failed ${EzPayChexIntegrationSetupDialog.ezInstance.ezIntegrationName} Integration. Error: ${ezApi.ezToJson(eResponse)}`);
                        waitDone();

                        ezApi.ezclocker.ezDialog.ezShowPossibleDefectError(
                            ezApi.ezEM`
                                ${EzPayChexIntegrationSetupDialog.ezInstance.ezIntegrationName} Integration Setup Error`,
                            'Unable to save your PayChex integration configuration at this time.',
                            jqXHR,
                            eResponse,
                            {
                                url: ezApi.ezclocker.nav.ezGetInternalApiUrl(
                                    ezApi.ezUrlTemplate`integrations/${EzIntegrationProviderId.PAYCHEX}/paychex-integration`),
                                payload: ezApi.ezToJson(integrationSetupRequest)
                            });

                        ezApi.ezclocker.ezEventEngine.ezTriggerEvent(
                            EzPayChexIntegrationSetupDialog.ezEventNames.onIntegrationSetupDialogError,
                            eResponse);
                    }));
    }

    /**
        @protected @method
        Updates the dialog's header inputs with data from the saved configuration (if any)
     */
    ezUpdateDialogHeaderValues() {
        if (!ezApi.ezIsValid(EzPayChexIntegrationSetupDialog.ezInstance.ezIntegrationResponse)) {
            ezApi.ezclocker.ezUi.ezSetInputValue(EzPayChexIntegrationSetupDialog.ezInstance.ezHeaderInputIds.ezPayChexClientIdInputId, '');
            ezApi.ezclocker.ezUi.ezSetCheckboxValue(EzPayChexIntegrationSetupDialog.ezInstance.ezHeaderInputIds.ezPayChexIntegrationEnableInputId, false);
            return;
        }

        ezApi.ezclocker.ezUi.ezSetInputValue(
            EzPayChexIntegrationSetupDialog.ezInstance.ezHeaderInputIds.ezPayChexClientIdInputId,
            ezApi.ezStringOrEmpty(EzPayChexIntegrationSetupDialog.ezInstance.ezIntegrationResponse.ezGetPayChexClientId()));

        ezApi.ezclocker.ezUi.ezSetCheckboxValue(
            EzPayChexIntegrationSetupDialog.ezInstance.ezHeaderInputIds.ezPayChexIntegrationEnableInputId,
            ezApi.ezIsTrue(EzPayChexIntegrationSetupDialog.ezInstance.ezIntegrationResponse.ezEnableIntegration));
    }

    /**
        @protected @method
        Applies all the supported mappings to the setup request.
        @param {EzPayChexIntegrationSetupRequest} integrationSetupRequest
     */
    ezApplySupportedMappingsToRequest(integrationSetupRequest) {
        EzPayChexIntegrationSetupDialog.ezInstance.ezSupportedMappings.forEach((ezIntegrationMappingViewType) => {
            switch (ezIntegrationMappingViewType) {
                case EzIntegrationMappingViewType.EMPLOYEE_MAPPING:
                    EzPayChexIntegrationSetupDialog.ezInstance.ezApplyEmployeeMappings(integrationSetupRequest);
                    break;
                case EzIntegrationMappingViewType.JOB_MAPPING:
                    EzPayChexIntegrationSetupDialog.ezInstance.ezApplyJobMappings(integrationSetupRequest);
                    break;
                case EzIntegrationMappingViewType.PAY_RATE_MAPPING:
                    EzPayChexIntegrationSetupDialog.ezInstance.ezApplyPayTypeMappings(integrationSetupRequest);
                    break;
                default:
                    ezApi.ezclocker.logger.error(ezApi.ezEM`
                        Integration mapping id ${ezIntegrationMappingViewType} is not currently supported in
                        ${EzPayChexIntegrationSetupDialog.ezInstance.ezIntegrationName}`);
            }
        });
    }

    /**
        @protected @method
        Adds the employee mappings to the provided integrationSetupRequest
        @param {EzPayChexIntegrationSetupRequest} integrationSetupRequest
    */
    ezApplyEmployeeMappings(integrationSetupRequest) {
        if (!ezApi.ezIsValid(integrationSetupRequest)) {
            throw new EzBadParamException(
                'integrationSetupRequest',
                EzPayChexIntegrationSetupDialog.ezInstance.
                    EzPayChexIntegrationSetupDialog.ezInstance.ezApplyEmployeeMappings);
        }

        let employees = ezApi.ezclocker.ezClockerContext.ezGetSelectedEmployerAccountEmployeeAccounts();
        if (!ezApi.ezArrayHasLength(employees)) {
            // No employees to map
            return;
        }

        let mapIds = [];
        EzPayChexIntegrationSetupDialog.ezInstance.ezDuplicateEmployeeMapIdDetected = false;

        employees.forEach((employee) => {
            let employeeIdStr = employee.id.toString();

            let employeeMappingInputId =
                ezApi.ezSingleLineTemplate`${EzPayChexIntegrationSetupDialog.ezInstance.ezDialogId}_IntegrationEmployeeMappingInput_${employeeIdStr}`;

            if (ezApi.ezElementExists(employeeMappingInputId)) {
                let providerEmployeeName = ezApi.ezclocker.ezUi.ezGetInputValue(employeeMappingInputId).trim();

                ezApi.ezclocker.ezUi.ezRemoveElementClass(employeeMappingInputId, 'ez-input-validation-error');

                if (ezApi.ezStringHasLength(providerEmployeeName)) {
                    if (0 <= mapIds.indexOf(providerEmployeeName.toLowerCase())) {
                        EzPayChexIntegrationSetupDialog.ezInstance.ezDuplicateEmployeeMapIdDetected = true;
                        EzPayChexIntegrationSetupDialog.ezInstance.ezShowValidationError(
                            ezApi.ezEM`One or more duplicate ${EzPayChexIntegrationSetupDialog.ezInstance.ezIntegrationEmployeeMapFieldDisplayName}s detected.
                            All employee maps must have unique ${EzPayChexIntegrationSetupDialog.ezInstance.ezIntegrationEmployeeMapFieldDisplayName}s`,
                            employeeMappingInputId,
                            EzIntegrationMappingViewType.EMPLOYEE_MAPPING);
                    } else {
                        mapIds.push(providerEmployeeName.toLowerCase());
                    }

                    let ezEmployeeIntegrationMapRequest = EzPayChexIntegrationSetupDialog.ezInstance.ezGetCurrentMapInstance(employeeMappingInputId);
                    if (!ezApi.ezIsValid(ezEmployeeIntegrationMapRequest)) {
                        ezEmployeeIntegrationMapRequest = new EzEmployeeIntegrationMapRequest();
                    }

                    ezEmployeeIntegrationMapRequest.ezEmployerId = employee.employerId;
                    ezEmployeeIntegrationMapRequest.ezEmployeeId = employee.id;
                    ezEmployeeIntegrationMapRequest.ezEmployerIntegrationMapId = '';
                    ezEmployeeIntegrationMapRequest.ezIntegrationProviderId = EzIntegrationProviderId.PAYCHEX;
                    ezEmployeeIntegrationMapRequest.mappedByUserId =
                        ezApi.ezclocker.ezClockerContext.ezGetUserContext().userAccount.id;

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
        @protected @method
        Adds the job mappings to the provided integrationSetupRequest
        @param {EzPayChexIntegrationSetupRequest} integrationSetupRequest
     */
    ezApplyJobMappings(integrationSetupRequest) {
        if (!ezApi.ezIsValid(integrationSetupRequest)) {
            throw new EzBadParamException(
                'integrationSetupRequest',
                EzPayChexIntegrationSetupDialog.ezInstance.
                    EzPayChexIntegrationSetupDialog.ezInstance.ezApplyJobMappings);
        }

        for (let prop in EzPayChexIntegrationSetupDialog.ezInstance.ezJobCodesById) {
            let jobCode = EzPayChexIntegrationSetupDialog.ezInstance.ezJobCodesById[prop];
            let inputId = ezApi.ezSingleLineTemplate`${EzPayChexIntegrationSetupDialog.ezInstance.ezDialogId}_DataTagMappingInput_${jobCode.id.toString()}`;

            if (ezUi.ezElementExists(inputId)) {
                let ezIntegrationDataTag = ezApi.ezclocker.ezUi.ezGetInputValue(inputId).trim();

                if (ezApi.ezStringHasLength(ezIntegrationDataTag)) {
                    let dataTagIntegrationMapRequest = EzPayChexIntegrationSetupDialog.ezInstance.ezGetCurrentMapInstance(inputId);
                    if (ezApi.ezIsNotValid(dataTagIntegrationMapRequest)) {
                        dataTagIntegrationMapRequest = new DataTagIntegrationMapRequest();
                    }

                    dataTagIntegrationMapRequest.ezIntegrationproviderId = '';
                    dataTagIntegrationMapRequest.ezUserId =
                        ezApi.ezclocker.ezClockerContext.ezGetUserContext().userAccount.id;
                    dataTagIntegrationMapRequest.ezEmployerId =
                        ezApi.ezclocker.ezClockerContext.ezGetSelectedEmployerAccount().id;
                    dataTagIntegrationMapRequest.ezIntegrationProviderId =
                        EzIntegrationProviderId.PAYCHEX;
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
        Adds the pay type mappings to the provided integrationSetupRequest
        @param {EzPayChexIntegrationSetupRequest} integrationSetupRequest
     */
    ezApplyPayTypeMappings(integrationSetupRequest) {
        if (!ezApi.ezIsValid(integrationSetupRequest)) {
            throw new EzBadParamException(
                'integrationSetupRequest',
                EzPayChexIntegrationSetupDialog.ezInstance.
                    EzPayChexIntegrationSetupDialog.ezInstance.ezApplyPayTypeMappings);
        }

        EzPayChexIntegrationSetupDialog.ezInstance.ezSupportedEzClockerPayRateTypes.forEach((ezClockerPayRateType) => {
            let inputId = ezApi.ezSingleLineTemplate`${EzPayChexIntegrationSetupDialog.ezInstance.ezDialogId}_PayRateMappingInput_${ezClockerPayRateType}`;
            if (ezUi.ezElementExists(inputId)) {
                let ezIntegrationPayRateType = ezApi.ezclocker.ezUi.ezGetInputValue(inputId).trim();

                if (!ezApi.ezStringHasLength(ezIntegrationPayRateType)) {
                    switch (ezClockerPayRateType) {
                        case EzClockerPayRateType.REGULAR:
                            ezIntegrationPayRateType = 'Regular';
                            break;
                        case EzClockerPayRateType.OVERTIME:
                            ezIntegrationPayRateType = 'Overtime';
                            break;
                        case EzClockerPayRateType.PAID_PTO:
                            ezIntegrationPayRateType = 'Paid Time Off';
                            break;
                        case EzClockerPayRateType.PAID_SICK:
                            ezIntegrationPayRateType = 'Sick Days';
                            break;
                        case EzClockerPayRateType.PAID_HOLIDAY:
                            ezIntegrationPayRateType = 'Holiday';
                            break;
                        default:
                            ezIntegrationPayRateType = '';
                    }
                }

                if (ezApi.ezStringHasLength(ezIntegrationPayRateType)) {
                    let payRateIntegrationMapRequest = EzPayChexIntegrationSetupDialog.ezInstance.ezGetCurrentMapInstance(inputId);
                    if (!ezApi.ezIsValid(payRateIntegrationMapRequest)) {
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
        Removes the normal styles and applies the validation error styles to the provided tabId
        @param {EzIntegrationMappingViewType} ezIntegrationMappingViewType
     */
    ezApplyErrorTab(ezIntegrationMappingViewType) {
        if (!ezApi.ezStringHasLength(ezIntegrationMappingViewType) ||
            !ezApi.ezHasOwnProperty(EzPayChexIntegrationSetupDialog.ezInstance.ezTabIds, ezIntegrationMappingViewType)) {
            return;
        }

        let tabId = EzPayChexIntegrationSetupDialog.ezInstance.ezTabIds[ezIntegrationMappingViewType];
        ezApi.ezclocker.ezUi.ezSetElementDataAttributeValue(tabId, 'ezValidationError', 'true');
        if (ezIntegrationMappingViewType === EzPayChexIntegrationSetupDialog.ezInstance.ezActiveIntegrationMappingViewType) {
            ezApi.ezclocker.ezUi.ezRemoveClass(tabId, 'ezActiveTab');
            ezApi.ezclocker.ezUi.ezRemoveClass(tabId, 'ezTab');
            ezApi.ezclocker.ezUi.ezRemoveClass(tabId, 'ezErrorTab');
            ezApi.ezclocker.ezUi.ezAddElementClass(tabId, 'ezErrorActiveTab');
        } else {
            ezApi.ezclocker.ezUi.ezRemoveElementClass(tabId, 'ezActiveTab');
            ezApi.ezclocker.ezUi.ezRemoveElementClass(tabId, 'ezTab');
            ezApi.ezclocker.ezUi.ezRemoveElementClass(tabId, 'ezErrorActiveTab');
            ezApi.ezclocker.ezUi.ezAddElementClass(tabId, 'ezErrorTab');
        }
    }

    /**
        @protected @method
        Removes validation error styles and applies the normal styles to the provided tabId
        @param {EzIntegrationMappingViewType} ezIntegrationMappingViewType
     */
    ezApplyNormalTab(ezIntegrationMappingViewType) {
        if (!ezApi.ezStringHasLength(ezIntegrationMappingViewType) ||
            !ezApi.ezHasOwnProperty(EzPayChexIntegrationSetupDialog.ezInstance.ezTabIds, ezIntegrationMappingViewType)) {
            return;
        }

        let tabId = EzPayChexIntegrationSetupDialog.ezInstance.ezTabIds[ezIntegrationMappingViewType];
        ezApi.ezclocker.ezUi.ezSetElementDataAttributeValue(tabId, 'ezValidationError', 'false');
        if (ezIntegrationMappingViewType === EzPayChexIntegrationSetupDialog.ezInstance.ezActiveIntegrationMappingViewType) {
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
                EzPayChexIntegrationSetupDialog.ezInstance.
                    EzPayChexIntegrationSetupDialog.ezInstance.ezActivateTab);
        }

        if (!ezApi.ezHasOwnProperty(EzPayChexIntegrationSetupDialog.ezInstance.ezTabs, ezIntegrationMappingViewType)) {
            throw ezApi.ezException(ezApi.ezEM`Tab id=${ezIntegrationMappingViewType} does not exist.`);
        }

        if (ezIntegrationMappingViewType === EzPayChexIntegrationSetupDialog.ezInstance.ezActiveIntegrationMappingViewType) {
            // already active
            return;
        }

        let previouslyActiveIntegrationMappingViewType = EzPayChexIntegrationSetupDialog.ezInstance.ezActiveIntegrationMappingViewType;
        EzPayChexIntegrationSetupDialog.ezInstance.ezActiveIntegrationMappingViewType = ezIntegrationMappingViewType;
        if (ezApi.ezStringHasLength(previouslyActiveIntegrationMappingViewType) &&
            EzIntegrationMappingViewType.UNKNOWN !== previouslyActiveIntegrationMappingViewType) {
            // Deactivate current

            // Hide the tabs view
            ezApi.ezclocker.ezUi.ezHideElement(EzPayChexIntegrationSetupDialog.ezInstance.ezTabs[previouslyActiveIntegrationMappingViewType].tabViewId);
            let previousTabId = EzPayChexIntegrationSetupDialog.ezInstance.ezTabIds[previouslyActiveIntegrationMappingViewType];
            ezApi.ezclocker.ezUi.ezSetElementDataAttributeValue(previousTabId, 'active', 'false');
            if ('true' === ezApi.ezclocker.ezUi.ezGetElementDataAttributeValue(previousTabId, 'ezValidationError')) {
                EzPayChexIntegrationSetupDialog.ezInstance.ezApplyErrorTab(previouslyActiveIntegrationMappingViewType);
            } else {
                EzPayChexIntegrationSetupDialog.ezInstance.ezApplyNormalTab(previouslyActiveIntegrationMappingViewType);
            }
            EzPayChexIntegrationSetupDialog.ezInstance.ezTabs[previouslyActiveIntegrationMappingViewType].active = false;
        }

        // Activate the new tab
        let tabId = EzPayChexIntegrationSetupDialog.ezInstance.ezTabIds[EzPayChexIntegrationSetupDialog.ezInstance.ezActiveIntegrationMappingViewType];
        EzPayChexIntegrationSetupDialog.ezInstance.ezTabs[EzPayChexIntegrationSetupDialog.ezInstance.ezActiveIntegrationMappingViewType].active = true;
        ezApi.ezclocker.ezUi.ezSetElementDataAttributeValue(tabId, 'active', 'true');
        if ('true' === ezApi.ezclocker.ezUi.ezGetElementDataAttributeValue(tabId, 'ezValidationError')) {
            EzPayChexIntegrationSetupDialog.ezInstance.ezApplyErrorTab(EzPayChexIntegrationSetupDialog.ezInstance.ezActiveIntegrationMappingViewType);
        } else {
            EzPayChexIntegrationSetupDialog.ezInstance.ezApplyNormalTab(EzPayChexIntegrationSetupDialog.ezInstance.ezActiveIntegrationMappingViewType);
        }

        EzPayChexIntegrationSetupDialog.ezInstance.ezShowTabHelp(ezIntegrationMappingViewType);

        ezApi.ezclocker.ezUi.ezShowElement(EzPayChexIntegrationSetupDialog.ezInstance.ezTabs[EzPayChexIntegrationSetupDialog.ezInstance.ezActiveIntegrationMappingViewType].tabViewId);
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
                    ezApi.ezIdTemplate`${EzPayChexIntegrationSetupDialog.ezInstance.ezDialogId}_HelpTitle`,
                    'Pay Rate Mapping');
                ezApi.ezclocker.ezUi.ezContent(
                    ezApi.ezIdTemplate`${EzPayChexIntegrationSetupDialog.ezInstance.ezDialogId}_IntegrationHelp`,
                    ezApi.ezMsg`
                        Map ezClocker's pay rates to the matching Pay Components you set in PAYCHEX.
                        Note that capitalization, spacing, and punctuation must match what is in PAYCHEX.
                        If you do not use Pay Components in Paychex then leave the fields blank.`);
                break;
            case EzIntegrationMappingViewType.JOB_MAPPING:
                ezApi.ezclocker.ezUi.ezContent(
                    ezApi.ezIdTemplate`${EzPayChexIntegrationSetupDialog.ezInstance.ezDialogId}_HelpTitle`,
                    'Job Mapping');
                ezApi.ezclocker.ezUi.ezContent(
                    ezApi.ezIdTemplate`${EzPayChexIntegrationSetupDialog.ezInstance.ezDialogId}_IntegrationHelp`,
                    ezApi.ezMsg`
                        Enter the PAYCHEX Labor Assignment that matches the ezClocker Job name.
                        You only need to map Jobs if you use PAYCHEX's Labor Distribution offering.`);
                break;
            case EzIntegrationMappingViewType.EMPLOYEE_MAPPING:
            default:
                ezApi.ezclocker.ezUi.ezContent(
                    ezApi.ezIdTemplate`${EzPayChexIntegrationSetupDialog.ezInstance.ezDialogId}_HelpTitle`,
                    'Employee Mapping');
                ezApi.ezclocker.ezUi.ezContent(
                    ezApi.ezIdTemplate`${EzPayChexIntegrationSetupDialog.ezInstance.ezDialogId}_IntegrationHelp`,
                    'Next to each ezClocker employee name enter the matching PAYCHEX worker id.');
                break;
        }
    }

    /**
        @protected @method
        Loads any existing integration configuration from the DB
        @returns {Resolve}
     */
    ezLoadIntegrationSetupConfiguration() {
        EzPayChexIntegrationSetupDialog.ezInstance.ezIntegrationResponse = null;

        return ezApi.ezResolver(
            (resolve) => EzPayChexIntegrationSetupDialog.ezInstance.ezController.ezGetIntegrationSetup(
                EzPayChexIntegrationSetupDialog.ezInstance.ezIntegrationProviderId)
                .then(
                    (response) => {
                        EzPayChexIntegrationSetupDialog.ezInstance.ezIntegrationResponse = response;
                        return resolve(response);
                    },
                    (eResponse) => {
                        ezApi.ezclocker.logger.error(
                            ezApi.ezEM`
                                Failed to get existing ${EzPayChexIntegrationSetupDialog.ezInstance.ezIntegrationName} integration configuration.
                                Error: ${ezApi.ezToJson(eResponse)}`);
                        ezApi.ezclocker.ezDialog.ezShowPossibleDefectError(
                            ezApi.ezEM`${EzPayChexIntegrationSetupDialog.ezInstance.ezIntegrationName} Integration Configuration Load Error`,
                            'Unable to get the existing PayChex configuration at this time.',
                            ezApi.ezToJson(eResponse));
                        return resolve(eResponse);
                    }));
    }

    /**
        @protected @method
        Loads the employer's data tags (if any)
        The ezRefreshSelectedEmployerAvailableJobs() response = {
            availableJobs: {array_availableJobs},
            archivedJobs: {array_archivedJobs},
            availableJobsById: {object_availableJobsById},
            availableArchivedJobsById: {object_archivedJobsById}
        }
        @returns {Resolve}
     */
    ezLoadEmployerDataTags() {
        EzPayChexIntegrationSetupDialog.ezInstance.ezJobCodes = [];
        EzPayChexIntegrationSetupDialog.ezInstance.ezJobCodesById = {};

        return ezApi.ezResolver(
            (resolve) => ezApi.ezclocker.ezClockerContext.ezRefreshSelectedEmployerAvailableJobs()
                .then(
                    (response) => {
                        if (ezApi.ezArrayHasLength(response.availableJobs)) {
                            EzPayChexIntegrationSetupDialog.ezInstance.ezJobCodesById = response.availableJobsById;
                            EzPayChexIntegrationSetupDialog.ezInstance.ezJobCodes = response.availableJobs;
                        }
                        return resolve(EzPayChexIntegrationSetupDialog.ezInstance.ezJobCodes);
                    },
                    (eResponse) => {
                        ezApi.ezclocker.logger.error(
                            ezApi.ezEM`
                            Failed to load the available jobs for the employer.
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

        EzPayChexIntegrationSetupDialog.ezInstance.ezSupportedMappings.forEach(
            (ezIntegrationMappingViewType) => {
                let ezTab = EzPayChexIntegrationSetupDialog.ezInstance.ezTabs[ezIntegrationMappingViewType];
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
            });

        let logoUrl = EzIntegrationProviderId.ezToIntegrationLogoUrl(EzIntegrationProviderId.PAYCHEX);

        let logoText = EzIntegrationProviderId.ezToIntegrationLogoText(EzIntegrationProviderId.PAYCHEX);

        return ezApi.ezTemplate`
            <div id="${EzPayChexIntegrationSetupDialog.ezInstance.ezDialogId}">
                <div id="${EzPayChexIntegrationSetupDialog.ezInstance.ezDialogId}_DialogContent" class="ez-white-borderless-box8 ezAutoRow_A_A">
                    <div id="${EzPayChexIntegrationSetupDialog.ezInstance.ezDialogId}_Header" class="ezContainer-integration-setup-header">
                        <div id="${EzPayChexIntegrationSetupDialog.ezInstance.ezDialogId}_Toptable" class="ezGridNoGap ezAutoCol_AxA">
                            <div class="ezContainer-integration-logo">
                                <img src="${logoUrl}" class="ezContainer-integration-logo-img"/>
                                ${logoText}
                            </div>
                            <div id="${EzPayChexIntegrationSetupDialog.ezInstance.ezDialogId}_HeaderEnabledContainer"
                                class="ezGrid-vertical-align-top ezGrid-align-right">
                                <label for="${EzPayChexIntegrationSetupDialog.ezInstance.ezHeaderInputIds.ezPayChexIntegrationEnableInputId}"
                                    class="ezInputLabel ezBold">
                                    <input id="${EzPayChexIntegrationSetupDialog.ezInstance.ezHeaderInputIds.ezPayChexIntegrationEnableInputId}"
                                        type="checkbox"/>
                                    ${EzPayChexHeaderFieldName.ezToDisplayValue(EzPayChexHeaderFieldName.INTEGRATION_ENABLED)}
                                </label>
                            </div>
                        </div>
                        <div style="height:10px;"></div>
                        <div id="${EzPayChexIntegrationSetupDialog.ezInstance.ezDialogId}_HeaderInputs" class="ezGrid-vertical-align-top ezGrid-align-full">
                            <label for="${EzPayChexIntegrationSetupDialog.ezInstance.ezHeaderInputIds.ezPayChexClientIdInputId}" class="ezInputLabel ezBold">
                                ${EzPayChexHeaderFieldName.ezToDisplayValue(EzPayChexHeaderFieldName.PAYCHEX_CLIENT_ID)}
                            </label>
                            <input id="${EzPayChexIntegrationSetupDialog.ezInstance.ezHeaderInputIds.ezPayChexClientIdInputId}" type="text"
                                class="ezDialogEditor" placeholder="enter PAYCHEX client id"/>
                            ${EzPayChexIntegrationSetupDialog.ezInstance.ezBuildHelpTipHTML('The Client Id is the PAYCHEX assigned unique id for your company.')}
                        </div>
                        <div id="${EzPayChexIntegrationSetupDialog.ezInstance.ezUxIds.elementIds.ezErrorMessageContainerId}" class="ez-floating-error-container"
                            style="display:none">
                            <div id="${EzPayChexIntegrationSetupDialog.ezInstance.ezUxIds.elementIds.ezErrorMessageId}"></div>
                        </div>
                    </div>
                    <div id="${EzPayChexIntegrationSetupDialog.ezInstance.ezDialogId}_SetupContainer"
                        class="ezSubContentView-no-border-no-scroll ezAutoCol_75xA">
                        <div id="${EzPayChexIntegrationSetupDialog.ezInstance.ezDialogId}_TabContainer" class="ezTabContainer">
                            <div id="${EzPayChexIntegrationSetupDialog.ezInstance.ezDialogId}_Tabs" class="ezTabsContainer">
                                ${tabsHtml}
                            </div>
                            <div id="${EzPayChexIntegrationSetupDialog.ezInstance.ezDialogId}_TabViews" class="ezSubContentView-no-border-no-scroll">
                                ${tabsViewHtml}
                            </div>
                        </div>
                        ${EzPayChexIntegrationSetupDialog.ezInstance.ezBuildTabHelpHtml()}
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
            <div id="${EzPayChexIntegrationSetupDialog.ezInstance.ezDialogId}_HelpContainer" class="ezContainer-side-help-box">
                <div class="ezContainer-side-help-box-title">
                    <img src="/public/images/integrations/help-navy.svg" class="ezContainer-side-help-box-img"/>
                    <lable id="${EzPayChexIntegrationSetupDialog.ezInstance.ezDialogId}_HelpTitle">Employee Mapping</label>
                </div>
                <div id="${EzPayChexIntegrationSetupDialog.ezInstance.ezDialogId}_IntegrationHelp" class="ezContainer-side-help-box-content">
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
            <div id="${EzPayChexIntegrationSetupDialog.ezInstance.ezFullScreenParentId}" class="ezContainer-full-screen-overlay" style="display:none">
                <div id="${EzPayChexIntegrationSetupDialog.ezInstance.ezFullScreenParentId}_ButtonBar" class="ezContainer-white-right-aligned-button-container">
                    <button id="${EzPayChexIntegrationSetupDialog.ezInstance.ezDialogId}_FullScreenOK" class="ezDefaultNormalButton">Save</button>
                    <button id="${EzPayChexIntegrationSetupDialog.ezInstance.ezDialogId}_FullScreenCancel"
                        onclick="ezApi.ezclocker.nav.ezNavigateToEmployerIntegrationsPage()"
                        class="ezNormalButton">Cancel</button>
                </div>
                <div id="${EzPayChexIntegrationSetupDialog.ezInstance.ezFullScreenContentId}" class="ezSubContentView-no-scroll ezPad8">
                </div>
            </div>`;
    }

    /**
        @protected @method
        Builds the views for each tab
     */
    ezBuildTabViews() {
        EzPayChexIntegrationSetupDialog.ezInstance.ezSupportedMappings.forEach(
            (ezIntegrationMappingViewType) => {
                if (ezApi.ezHasOwnProperty(EzPayChexIntegrationSetupDialog.ezInstance.ezViewIds, ezIntegrationMappingViewType) &&
                    ezApi.ezHasOwnProperty(EzPayChexIntegrationSetupDialog.ezInstance.ezTabs, ezIntegrationMappingViewType)) {
                    switch (ezIntegrationMappingViewType) {
                        case EzIntegrationMappingViewType.EMPLOYEE_MAPPING:
                            EzPayChexIntegrationSetupDialog.ezInstance.ezTabs[ezIntegrationMappingViewType].ezView = EzPayChexIntegrationSetupDialog.ezInstance.ezBuildEmployeeMappingTabView();
                            break;
                        case EzIntegrationMappingViewType.JOB_MAPPING:
                            EzPayChexIntegrationSetupDialog.ezInstance.ezTabs[ezIntegrationMappingViewType].ezView = EzPayChexIntegrationSetupDialog.ezInstance.ezBuildJobMappingTabView();
                            break;
                        case EzIntegrationMappingViewType.PAY_RATE_MAPPING:
                            EzPayChexIntegrationSetupDialog.ezInstance.ezTabs[ezIntegrationMappingViewType].ezView = EzPayChexIntegrationSetupDialog.ezInstance.ezBuildPayRateMappingTabView();
                            break;
                        default:
                            ezApi.ezclocker.logger.error(
                                ezApi.ezEM`Integration mapping type ${ezIntegrationMappingViewType} is not currently supported`);
                    }
                }
            });
    }

    /**
        @protected @method
        Builds the supported mapping views UX
     */
    ezBuildSupportedMappingViews() {
        EzPayChexIntegrationSetupDialog.ezInstance.ezSupportedMappings.forEach(
            (ezIntegrationMappingViewType) => {
                let buildMappingListFunction = null;
                switch (ezIntegrationMappingViewType) {
                    case EzIntegrationMappingViewType.EMPLOYEE_MAPPING:
                        buildMappingListFunction = EzPayChexIntegrationSetupDialog.ezInstance.ezBuildEmployeeMappingList;
                        break;
                    case EzIntegrationMappingViewType.PAY_RATE_MAPPING:
                        buildMappingListFunction = EzPayChexIntegrationSetupDialog.ezInstance.ezBuildPayRateMappingList;
                        break;
                    case EzIntegrationMappingViewType.JOB_MAPPING:
                        buildMappingListFunction = EzPayChexIntegrationSetupDialog.ezInstance.ezBuildJobMappingsList;
                        break;
                    default:
                        ezApi.ezclocker.logger.error(
                            ezApi.ezEM`Mapping view ${ezIntegrationMappingViewType} is not supported yet.`);
                }

                if (ezApi.ezIsFunction(buildMappingListFunction)) {
                    ezApi.ezclocker.ezUi.ezAppendContent(
                        ezApi.ezSingleLineTemplate`${EzPayChexIntegrationSetupDialog.ezInstance.ezViewIds[ezIntegrationMappingViewType]}_TableBody`,
                        buildMappingListFunction());
                }
            });
    }

    /**
        @protected @method
        Builds the employee mapping view
        @returns {String}
     */
    ezBuildEmployeeMappingTabView() {
        let viewId = EzPayChexIntegrationSetupDialog.ezInstance.ezViewIds[EzIntegrationMappingViewType.EMPLOYEE_MAPPING];
        return ezApi.ezTemplate`
            <div id="${viewId}" data-tabgroup="${EzPayChexIntegrationSetupDialog.ezInstance.ezIntegrationProviderId}_Tabs" class="ez-tab-view-container"
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
                                    ${EzPayChexIntegrationSetupDialog.ezInstance.ezIntegrationEmployeeMapFieldDisplayName}
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
        let viewId = EzPayChexIntegrationSetupDialog.ezInstance.ezViewIds[EzIntegrationMappingViewType.EMPLOYEE_MAPPING];
        ezApi.ezclocker.ezUi.ezClearContent(ezApi.ezSingleLineTemplate`${viewId}_TableBody`);

        let employees = ezApi.ezclocker.ezClockerContext.ezGetSelectedEmployerAccountEmployeeAccounts();
        if (!ezApi.ezArrayHasLength(employees)) {
            return ezApi.ezTemplate`
                <tr id="${viewId}_TableBodyMappingRow_NoEmployees" class="ez-table-row">
                    <td id="${viewId}_TableBodyMappingCell_NoEmployees" class="ez-table-cell" colspan="2" >
                        No Employees available
                    </td>
                </tr>`;
        }

        let ezIntegrationResponse = ezApi.ezIsValid(EzPayChexIntegrationSetupDialog.ezInstance.ezIntegrationResponse)
            ? EzPayChexIntegrationSetupDialog.ezInstance.ezIntegrationResponse
            : new EzPayChexIntegrationSetupResponse();

        let employeeListHtml = '';
        EzPayChexIntegrationSetupDialog.ezInstance.ezDuplicateEmployeeMapIdDetected = false;
        let mappingErrors = [];
        employees.forEach((employee) => {
            let employeeMappingInputId =
                ezApi.ezIdTemplate`${EzPayChexIntegrationSetupDialog.ezInstance.ezDialogId}_IntegrationEmployeeMappingInput_${employee.id}`;
            let ezEmployeeIntegrationMapRequest =
                ezIntegrationResponse.ezGetEmployeeMappingForEmployeeId(employee.id);

            if (ezApi.ezIsValid(ezEmployeeIntegrationMapRequest)) {
                let providerEmployeeName =
                    ezApi.ezStringOrEmpty(ezEmployeeIntegrationMapRequest.providerEmployeeName);

                employeeListHtml += EzPayChexIntegrationSetupDialog.ezInstance.ezBuildEmployeeMappingRow(
                    viewId,
                    employee,
                    providerEmployeeName,
                    employeeMappingInputId,
                    ezEmployeeIntegrationMapRequest);
            } else {
                employeeListHtml += EzPayChexIntegrationSetupDialog.ezInstance.ezBuildEmployeeMappingRow(
                    viewId,
                    employee,
                    '',
                    employeeMappingInputId,
                    null);
            }
        });

        if (ezApi.ezArrayHasLength(mappingErrors)) {
            mappingErrors.forEach((mappingError) => {
                EzPayChexIntegrationSetupDialog.ezInstance.ezShowValidationError(
                    mappingError.em,
                    mappingError.inputId,
                    mappingError.tabId);
            });
        }

        return employeeListHtml;
    }

    /**
        @protected @method
        Builds the HTML for a employee mapping row
        @param {String} viewId
        @param {Object} employee
        @param {EzEmployeeIntegrationMapRequest|null} ezEmployeeIntegrationMapRequest
        @returns {String}
     */
    ezBuildEmployeeMappingRow(viewId, employee, providerEmployeeMappingValue, employeeMappingInputId, ezEmployeeIntegrationMapRequest) {
        if (!ezApi.ezStringHasLength(viewId)) {
            throw new EzBadParamException(
                'viewId',
                EzPayChexIntegrationSetupDialog.ezInstance.
                    EzPayChexIntegrationSetupDialog.ezInstance.ezBuildEmployeeMappingRow);
        }
        if (!ezApi.ezIsValid(employee)) {
            throw new EzBadParamException(
                'ezIntegrationMappingViewType',
                EzPayChexIntegrationSetupDialog.ezInstance.
                    EzPayChexIntegrationSetupDialog.ezInstance.ezBuildEmployeeMappingRow);
        }
        if (!ezApi.ezIsNumber(employee.id)) {
            throw new EzBadParamException(
                'employee.id',
                EzPayChexIntegrationSetupDialog.ezInstance.
                    EzPayChexIntegrationSetupDialog.ezInstance.ezBuildEmployeeMappingRow);
        }
        if (!ezApi.ezStringHasLength(employee.employeeName)) {
            throw new EzBadParamException(
                'employee.employeeName',
                EzPayChexIntegrationSetupDialog.ezInstance.
                    EzPayChexIntegrationSetupDialog.ezInstance.ezBuildEmployeeMappingRow);
        }

        let employeeIdStr = employee.id.toString();
        let mappingJson = '';

        if (ezApi.ezIsValid(ezEmployeeIntegrationMapRequest)) {
            mappingJson = ezApi.ezToJson(ezEmployeeIntegrationMapRequest);
        }

        let rowId = ezApi.ezIdTemplate`${viewId}_TableBody_Mapping`;
        return ezApi.ezTemplate`
            <tr id="${rowId}Row_EzEmployee_${employeeIdStr}" class="ez-table-row" data-ezid="${employeeIdStr}">
                <td id="${rowId}Cell_EzEmployee_${employeeIdStr}_EmployeeName"
                    class="ez-table-cell ez-cell-align-middle-left" data-ezid="${employeeIdStr}">
                    ${employee.employeeName}
                </td>
                <td id="${rowId}Cell_EzEmployee_${employeeIdStr}_IntegrationEmployeeMap"
                    class="ez-table-cell ez-cell-align-middle-center" data-ezid="${employeeIdStr}">
                    <input id="${employeeMappingInputId}" type="text" class="ezDialogEditor"
                        data-ezid="${employeeIdStr}" name="${employeeMappingInputId}"
                        autocomplete="${employeeMappingInputId}" data-mapping-json="${mappingJson}"
                        placeholder="enter ${EzPayChexIntegrationSetupDialog.ezInstance.ezIntegrationEmployeeMapFieldDisplayName}"
                        value="${providerEmployeeMappingValue}"/>
                </td>
            </tr>`;
    }

    /**
        @protected @method
        Builds the pay rate mapping view
        @returns {String}
     */
    ezBuildPayRateMappingTabView() {
        let viewId = EzPayChexIntegrationSetupDialog.ezInstance.ezViewIds[EzIntegrationMappingViewType.PAY_RATE_MAPPING];
        return ezApi.ezTemplate`
            <div id="${viewId}" data-tabgroup="payChexIntegrationTabs" class="ez-tab-view-container"
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
                                    ${EzPayChexIntegrationSetupDialog.ezInstance.ezIntegrationPayRateMapFieldDisplayName}
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
        let viewId = EzPayChexIntegrationSetupDialog.ezInstance.ezViewIds[EzIntegrationMappingViewType.PAY_RATE_MAPPING];
        ezApi.ezclocker.ezUi.ezClearContent(ezApi.ezSingleLineTemplate`${viewId}_TableBody`);

        let ezIntegrationResponse = ezApi.ezIsValid(EzPayChexIntegrationSetupDialog.ezInstance.ezIntegrationResponse)
            ? EzPayChexIntegrationSetupDialog.ezInstance.ezIntegrationResponse
            : new EzPayChexIntegrationSetupResponse();

        let payRateListHtml = '';
        EzPayChexIntegrationSetupDialog.ezInstance.ezSupportedEzClockerPayRateTypes.forEach((payRateType) => {
            let payRateIntegrationMapRequest =
                ezIntegrationResponse.ezGetPayRateIntegrationMapRequestForPayRateType(payRateType);
            if (ezApi.ezIsValid(payRateIntegrationMapRequest) &&
                ezApi.ezStringHasLength(payRateIntegrationMapRequest.ezClockerPayRateType) &&
                payRateType === payRateIntegrationMapRequest.ezClockerPayRateType) {
                payRateListHtml += EzPayChexIntegrationSetupDialog.ezInstance.ezBuildPayRateRow(viewId, payRateType, payRateIntegrationMapRequest);
            } else {
                payRateListHtml += EzPayChexIntegrationSetupDialog.ezInstance.ezBuildPayRateRow(viewId, payRateType, null);
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
                EzPayChexIntegrationSetupDialog.ezInstance.
                    EzPayChexIntegrationSetupDialog.ezInstance.ezBuildPayRateRow);
        }
        if (!ezApi.ezIsValid(ezClockerPayRateType)) {
            throw new EzBadParamException(
                'ezClockerPayRateType',
                EzPayChexIntegrationSetupDialog.ezInstance.
                    EzPayChexIntegrationSetupDialog.ezInstance.ezBuildPayRateRow);
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
        let inputId = ezApi.ezSingleLineTemplate`${EzPayChexIntegrationSetupDialog.ezInstance.ezDialogId}_PayRateMappingInput_${ezClockerPayRateType}`;
        return ezApi.ezTemplate`
            <tr id="${rowId}Row_EzPayRateType_${ezClockerPayRateType}" class="ez-table-row"
                data-ezid="${ezClockerPayRateType}">
                <td id="${rowId}Cell_EzPayRateTypeDisplay_${ezClockerPayRateType}"
                    class="ez-table-cell ez-cell-align-middle-left" data-ezid="${ezClockerPayRateType}">
                    ${EzClockerPayRateType.ezToDisplayValue(ezClockerPayRateType)}
                </td>
                <td id="${rowId}Cell_PayRateMapping_${ezClockerPayRateType}"
                    class="ez-table-cell ez-cell-align-middle-center" data-ezid="${ezClockerPayRateType}">
                    <input id="${inputId}" type="text" class="ezDialogEditor" data-ezid="${ezClockerPayRateType}"
                        name="${inputId}" autocomplete="${inputId}" data-mappingJson="${mappingJson}"
                        placeholder="enter ${EzPayChexIntegrationSetupDialog.ezInstance.ezIntegrationPayRateMapFieldDisplayName}" ${value}/>
                </td>
            </tr>`;
    }

    /**
        @protected @method
        Builds the job mapping tab view
        @returns {String}
     */
    ezBuildJobMappingTabView() {
        let viewId = EzPayChexIntegrationSetupDialog.ezInstance.ezViewIds[EzIntegrationMappingViewType.JOB_MAPPING];
        return ezApi.ezTemplate`
            <div id="${viewId}" data-tabgroup="payChexIntegrationTabs" class="ez-tab-view-container"
                style="display:none">
                <div id="${viewId}_ListDiv" class="ezContainer-integration-input-container">
                    <table id="${viewId}_Table" class="ez-table-full-width">
                        <thead id="${viewId}_TableHeader" class="ez-table-header">
                            <tr id="${viewId}_TableHeaderRow" class="ez-table-row">
                                <th id="${viewId}_TableHeaderCell_EzDataTag_TagName" class="ez-table-cell-header-fixed">
                                    EzClocker Jobs
                                </th>
                                <th id="${viewId}_TableHeaderCell_IntegrationJobMapping" class="ez-table-cell-header-fixed">
                                    ${EzPayChexIntegrationSetupDialog.ezInstance.ezIntegrationJobMapFieldDisplayName}
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
        let viewId = EzPayChexIntegrationSetupDialog.ezInstance.ezViewIds[EzIntegrationMappingViewType.JOB_MAPPING];
        ezApi.ezclocker.ezUi.ezClearContent(ezApi.ezSingleLineTemplate`${viewId}_TableBody`);

        if (!ezApi.ezIsValid(EzPayChexIntegrationSetupDialog.ezInstance.ezJobCodesById)) {
            return ezApi.ezTemplate`
                <tr id="${viewId}_TableBody_MappingRow_NowJobs" class="ez-table-row">
                    <td id="${viewId}_TableBody_MappingCell_NoJobs" class="ez-table-cell" colspan="2" >
                        No jobs available
                    </td>
                </tr>`;
        }

        let ezIntegrationResponse = ezApi.ezIsValid(EzPayChexIntegrationSetupDialog.ezInstance.ezIntegrationResponse)
            ? EzPayChexIntegrationSetupDialog.ezInstance.ezIntegrationResponse
            : new EzPayChexIntegrationSetupResponse();

        let jobsMappingHtml = '';
        for (let jobCode of EzPayChexIntegrationSetupDialog.ezInstance.ezJobCodes) {
            let dataTagIntegrationMapRequest = ezIntegrationResponse.ezGetDataTagMappingForDataTagId(jobCode.id);

            jobsMappingHtml += ezApi.ezIsValid(dataTagIntegrationMapRequest) &&
                ezApi.ezIsNumber(dataTagIntegrationMapRequest.id) &&
                ezApi.ezStringHasLength(dataTagIntegrationMapRequest.integrationDataTagId)
                ? EzPayChexIntegrationSetupDialog.ezInstance.ezBuildJobMappingRow(viewId, jobCode, dataTagIntegrationMapRequest)
                : EzPayChexIntegrationSetupDialog.ezInstance.ezBuildJobMappingRow(viewId, jobCode, null);
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
                EzPayChexIntegrationSetupDialog.ezInstance.
                    EzPayChexIntegrationSetupDialog.ezInstance.ezBuildJobMappingRow);
        }
        if (!ezApi.ezIsValid(dataTag)) {
            throw new EzBadParamException(
                'dataTag',
                EzPayChexIntegrationSetupDialog.ezInstance.
                    EzPayChexIntegrationSetupDialog.ezInstance.ezBuildJobMappingRow);
        }
        if (!ezApi.ezIsNumber(dataTag.id)) {
            throw new EzBadParamException(
                'dataTag.id',
                EzPayChexIntegrationSetupDialog.ezInstance.
                    EzPayChexIntegrationSetupDialog.ezInstance.ezBuildJobMappingRow);
        }
        if (!ezApi.ezStringHasLength(dataTag.tagName)) {
            throw new EzBadParamException(
                'dataTag.tagNam',
                EzPayChexIntegrationSetupDialog.ezInstance.
                    EzPayChexIntegrationSetupDialog.ezInstance.ezBuildJobMappingRow);
        }

        let dataTagIdStr = dataTag.id.toString();
        let mappingJson = '';
        let integrationDataTagId = '';
        if (ezApi.ezIsValid(dataTagIntegrationMapRequest)) {
            mappingJson = ezApi.ezToJson(dataTagIntegrationMapRequest);
            integrationDataTagId = ezApi.ezStringOrEmpty(dataTagIntegrationMapRequest.integrationDataTagId);
        }

        let value = ezApi.ezStringHasLength(integrationDataTagId)
            ? ezApi.ezSingleLineTemplate`value="${integrationDataTagId}"`
            : '';
        let rowId = ezApi.ezSingleLineTemplate`${viewId}_TableBody_Mapping`;
        let inputId = ezApi.ezSingleLineTemplate`${EzPayChexIntegrationSetupDialog.ezInstance.ezDialogId}_DataTagMappingInput_${dataTagIdStr}`;

        return ezApi.ezTemplate`
            <tr id="${rowId}_Row_DataTag_${dataTagIdStr}" class="ez-table-row" data-ezid="${dataTagIdStr}">
                <td id="${rowId}Cell_DataTag_${dataTagIdStr}_TagName"
                    class="ez-table-cell ez-cell-align-middle-left" data-ezid="${dataTagIdStr}">
                    ${dataTag.tagName}
                </td>
                <td id="${rowId}Cell_DataTag_${dataTagIdStr}_IntegrationDataTagMap"
                    class="ez-table-cell ez-cell-align-middle-center" data-ezid="${dataTagIdStr}">
                    <input id="${inputId}" type="text" class="ezDialogEditor" data-ezid="${dataTagIdStr}"
                        name="${inputId}" autocomplete="${inputId}" data-mapping-json="${mappingJson}"
                        placeholder="enter ${EzPayChexIntegrationSetupDialog.ezInstance.ezIntegrationJobMapFieldDisplayName}" ${value}/>
                </td>
            </tr>`;
    }

    /**
        @protected @method
        Builds additional resources tab view
     */
    ezBuildAdditionalResourcesTabView() {
        let viewId = EzPayChexIntegrationSetupDialog.ezInstance.ezViewIds[EzIntegrationMappingViewType.ADDITIONAL_RESOURCES];

        return ezApi.ezTemplate`
            <div id="${viewId}" data-tabgroup="EzPayChexIntegrationTabs" class="ez-tab-view-container"
                style="display:none">
                <div id="${viewId}_ListDiv" class="ezContainer-integration-input-container">
                    <table id="${viewId}_Table" class="ez-table-full-width">
                        <thead id="${viewId}_TableHeader" class="ez-table-header">
                            <tr id="${viewId}_TableHeaderRow" class="ez-table-row">
                                <th id="${viewId}_TableHeaderCell_EzDataTag_TagName" class="ez-table-cell-header-fixed">
                                    Additional Help and Resources
                                </th>
                                <th id="${viewId}_TableHeaderCell_IntegrationJobMapping"
                                    class="ez-table-cell-header-fixed">
                                    ${EzPayChexIntegrationSetupDialog.ezInstance.ezIntegrationJobMapFieldDisplayName}
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
                EzPayChexIntegrationSetupDialog.ezInstance.
                    EzPayChexIntegrationSetupDialog.ezInstance.ezBuildJobMappingRow);
        }

        if ('false' === ezApi.ezclocker.ezUi.ezGetElementDataAttributeValue(ezEvent.data.elementEvent.target, 'active')) {
            // Activate only if not already active
            EzPayChexIntegrationSetupDialog.ezInstance.ezActivateTab(
                ezApi.ezclocker.ezUi.ezGetElementDataAttributeValue(ezEvent.data.elementEvent.target, 'ezintegrationmappingviewtype'));
        }
    }

    /**
        @protected @method
        Handles the initial focus of the dialog
     */
    ezHandleInitialDialogFocus() {
        ezApi.ezclocker.ezUi.ezId(EzPayChexIntegrationSetupDialog.ezInstance.ezDialogId).off('focus');

        ezApi.ezclocker.ezUi.ezFocusElement(
            EzPayChexIntegrationSetupDialog.ezInstance.ezHeaderInputIds.ezPayChexClientIdInputId);

        EzPayChexIntegrationSetupDialog.ezInstance.ezSupportedMappings.forEach(
            (ezIntegrationMappingViewType) => ezApi.ezclocker.ezUi.ezScrollTo(
                `${EzPayChexIntegrationSetupDialog.ezInstance.ezTabs[ezIntegrationMappingViewType].tabViewId}_ListDiv`, 0, 0));
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
                EzPayChexIntegrationSetupDialog.ezInstance.ezUxIds.classNames.ezInputValidationErrorClass);
        }

        if (ezApi.ezStringHasLength(ezIntegrationMappingViewType)) {
            EzPayChexIntegrationSetupDialog.ezInstance.ezApplyErrorTab(ezIntegrationMappingViewType);
        }

        if (ezApi.ezStringHasLength(em)) {
            ezApi.ezclocker.ezUi.ezContent(
                EzPayChexIntegrationSetupDialog.ezInstance.ezUxIds.elementIds.ezErrorMessageId,
                em);
            ezApi.ezclocker.ezUi.ezShowElement(EzPayChexIntegrationSetupDialog.ezInstance.ezUxIds.elementIds.ezErrorMessageContainerId);
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
                EzPayChexIntegrationSetupDialog.ezInstance.ezUxIds.classNames.ezInputValidationErrorClass);
        }

        if (ezApi.ezStringHasLength(ezIntegrationMappingViewType)) {
            EzPayChexIntegrationSetupDialog.ezInstance.ezApplyNormalTab(ezIntegrationMappingViewType);
        }

        if (ezUi.ezIsElementVisible(EzPayChexIntegrationSetupDialog.ezInstance.ezUxIds.elementIds.ezErrorMessageContainerId)) {
            ezApi.ezclocker.ezUi.ezClearContent(EzPayChexIntegrationSetupDialog.ezInstance.ezUxIds.elementIds.ezErrorMessageId);
            ezApi.ezclocker.ezUi.ezHideElement(EzPayChexIntegrationSetupDialog.ezInstance.ezUxIds.elementIds.ezErrorMessageContainerId);
        }
    }
}