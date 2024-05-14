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

import { EzQBOHeaderFieldName } from '/secure/integrations/quickbooks/EzQBOHeaderFieldName.js';
import { EzQBOIntegrationSetupResponse } from '/secure/integrations/quickbooks/EzQBOIntegrationSetupResponse.js';
import { EzQBOIntegrationSetupRequest } from '/secure/integrations/quickbooks/EzQBOIntegrationSetupRequest.js';
import { EzQBOIntegrationSetupController } from '/secure/integrations/quickbooks/EzQBOIntegrationSetupController.js';
import { EzQBOCustomerMapping } from '/secure/integrations/quickbooks/EzQBOCustomerMapping.js';

/**
    @public
    View for the copy schedule forward feature on the ezClocker website for employers.
 */
export class EzQBOIntegrationSetupDialog extends EzIntegrationSetupDialog {
    /**
        @public @static @field
        @type {EzClockerContext}
     */
    static #ezInstance = Object.prototype.hasOwnProperty.call(globalThis, 'ezApi') &&
        globalThis.ezApi &&
        Object.prototype.hasOwnProperty.call(globalThis.ezApi, 'ezclocker') &&
        globalThis.ezApi.ezclocker &&
        Object.prototype.hasOwnProperty.call(globalThis.ezApi.ezclocker, EzQBOIntegrationSetupDialog.ezApiName) &&
        globalThis.ezApi.ezclocker[EzQBOIntegrationSetupDialog.ezApiName]
        ? globalThis.ezApi.ezclocker[EzQBOIntegrationSetupDialog.ezApiName]
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
        Object.prototype.hasOwnProperty.call(globalThis.ezApi.ezclocker, EzQBOIntegrationSetupDialog.ezApiName) &&
        globalThis.ezApi.ezclocker[EzQBOIntegrationSetupDialog.ezApiName]
        ? EzRegistrationState.REGISTERED
        : null;

    /**
        @public @static @readonly @property
        Returns the name of the singleton instance of this class stored in ezApi.
        @returns {string}
     */
    static get ezApiName() {
        return 'ezQBOIntegrationSetupDialog';
    }

    /**
        @public @static @readonly @property
        Returns an object of property = event name for events triggered by this class.
        @returns {string}
     */
    static get ezEventNames() {
        return {
            onReady: 'ezOn_EzQBOIntegrationSetupDialog_Ready',
            onIntegrationSetupDialogVisible: 'ezOn_EzQBOIntegrationSetupDialog_Visible',
            onIntegrationSetupDialogClose: 'ezOn_EzQBOIntegrationSetupDialog_Closed',
            onIntegrationSetupDialogSubmitted: 'ezOn_EzQBOIntegrationSetupDialog_Submitted',
            onIntegrationSetupDialogError: 'ezOn_EzQBOIntegrationSetupDialog_Error',
            onIntegrationSetupDialogDataReady: 'ezOn_EzQBOIntegrationSetupDialog_DataReady'
        };
    }

    /**
        @public @static @property @getter
        Returns the ezApi registration state of this classes's singleton instance.
        @returns {string}
        A valid enum property value from EzRegistrationState
     */
    static get ezApiRegistrationState() {
        return EzQBOIntegrationSetupDialog.#ezApiRegistrationState;
    }

    /**
        @public @static @property @setter
        Sets the ezApi registration state of this classes's singleton instance.
        @param {string} ezApiRegistrationState
        A valid enum property value from EzRegistrationState
     */
    static set ezApiRegistrationState(ezApiRegistrationState) {
        EzQBOIntegrationSetupDialog.#ezApiRegistrationState = EzRegistrationState.ezValueOf(ezApiRegistrationState);
    }

    /**
        @public @static @getter @property
        Returns the singleton instance of EzDateTime registered with EzApi (if available yet)
        @param {EzClockerContext}
     */
    static get ezInstance() {
        return EzQBOIntegrationSetupDialog.#ezInstance;
    }

    /**
        @public @static @getter @property
        Returns the singleton instance of EzDateTime registered with EzApi (if available yet)
     */
    static set ezInstance(ezwEmployerExportTimeSheetDialog) {
        if (null != EzQBOIntegrationSetupDialog.#ezInstance) {
            throw new Error('EzPaycomIntegrationSetupDialog\'s singleton instance is already reigstered with EzApi.');
        }

        EzQBOIntegrationSetupDialog.#ezInstance = ezwEmployerExportTimeSheetDialog;
    }

    /**
        @public @static @readonly @property
        Returns if the single instance of this class has all it's dependent ezApi references ready and can now register with ezApi.
        @returns {boolean}
     */
    static get ezCanRegister() {
        return 'PENDING' === EzQBOIntegrationSetupDialog.ezApiRegistrationState &&
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
        return null != EzQBOIntegrationSetupDialog.ezInstance &&
            EzRegistrationState.REGISTERED === EzQBOIntegrationSetupDialog.ezApiRegistrationState;
    }

    /**
       @private @static @method
       Registers the singleton instance of this class with ezApi. Returns true if registered, false if unable to register.
       @returns {boolean}
    */
    static #ezRegistrator() {
        if (EzQBOIntegrationSetupDialog.ezCanRegister && !EzQBOIntegrationSetupDialog.#ezIsRegistered) {
            globalThis.ezApi.ezRegisterNewApi(EzQBOIntegrationSetupDialog, EzQBOIntegrationSetupDialog.ezApiName);
        }

        return EzRegistrationState.REGISTERED === EzQBOIntegrationSetupDialog.ezApiRegistrationState;
    }

    /**
        @static
        Static initializer
     */
    static {
        if (!EzQBOIntegrationSetupDialog.#ezIsRegistered) {
            EzQBOIntegrationSetupDialog.ezApiRegistrationState = EzRegistrationState.PENDING;

            if (!EzQBOIntegrationSetupDialog.#ezRegistrator()) {
                document.addEventListener(
                    'onEzApiReady',
                    () => {
                        if (!EzQBOIntegrationSetupDialog.#ezRegistrator()) {
                            document.addEventListener(
                                EzEventEngine.ezEventNames.onReady,
                                EzQBOIntegrationSetupDialog.#ezRegistrator);

                            document.addEventListener(
                                EzUI.ezEventNames.onReady,
                                EzQBOIntegrationSetupDialog.#ezRegistrator);

                            document.addEventListener(
                                EzDialog.ezEventNames.onReady,
                                EzQBOIntegrationSetupDialog.#ezRegistrator);
                        }
                    });
            }
        }
    }

    constructor() {
        super(
            // ezIntegrationProviderId
            EzIntegrationProviderId.QUICKBOOKS_ONLINE,
            // controllerRef
            new EzQBOIntegrationSetupController());

        this.ezDialogId = 'EzQBOIntegrationSetupDialog';
		this.ezIntegrationName = "QBO"; //TODO fix later

        this.ezSupportedMappings = [
            EzIntegrationMappingViewType.EMPLOYEE_MAPPING,
            EzIntegrationMappingViewType.JOB_MAPPING,
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
		
		this.customerMappingCode = new EzQBOCustomerMapping();

        // Tab button ids
        this.ezTabIds[EzIntegrationMappingViewType.EMPLOYEE_MAPPING] = ezApi.ezIdTemplate`
            ${this.ezDialogId}_
            ${EzIntegrationMappingViewType.ezToIdSuffix(EzIntegrationMappingViewType.EMPLOYEE_MAPPING)}_Button`;

        // Dialog tab view ids
        this.ezViewIds[EzIntegrationMappingViewType.EMPLOYEE_MAPPING] = ezApi.ezIdTemplate`
            ${this.ezDialogId}_
            ${EzIntegrationMappingViewType.ezToIdSuffix(EzIntegrationMappingViewType.EMPLOYEE_MAPPING)}_TabView`;
			
		//and for customer mapping
        this.ezTabIds[EzIntegrationMappingViewType.JOB_MAPPING] = ezApi.ezIdTemplate`
            ${this.ezDialogId}_
            ${EzIntegrationMappingViewType.ezToIdSuffix(EzIntegrationMappingViewType.JOB_MAPPING)}_Button`;

        // Dialog tab view ids
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
        return 'QBO Employee First Name';
    }

    /**
        @public @readonly @property
        @returns {string}
     */
    get ezIntegrationEmployeeMapFieldLastName() {
        return 'QBO Employee Last Name';
    }

    /**
        @override
        @public @readonly @property
        @returns {string}
     */
    get ezIntegrationJobMapFieldDisplayName() {
        return `Quickbooks Online Customer`;
    }

    /**
     * @protected
     * Initializes EzQBOIntegrationSetupDialog
     */
    ezInit() {
        super.ezInit();

        ezApi.ezclocker.ezEventEngine.ezRegisterEvent(
            EzQBOIntegrationSetupDialog.ezApiName,
            EzQBOIntegrationSetupDialog.ezEventNames.onIntegrationSetupDialogVisible);

        ezApi.ezclocker.ezEventEngine.ezRegisterEvent(
            EzQBOIntegrationSetupDialog.ezApiName,
            EzQBOIntegrationSetupDialog.ezEventNames.onIntegrationSetupDialogClose);

        ezApi.ezclocker.ezEventEngine.ezRegisterEvent(
            EzQBOIntegrationSetupDialog.ezApiName,
            EzQBOIntegrationSetupDialog.ezEventNames.onIntegrationSetupDialogSubmitted);

        ezApi.ezclocker.ezEventEngine.ezRegisterEvent(
            EzQBOIntegrationSetupDialog.ezApiName,
            EzQBOIntegrationSetupDialog.ezEventNames.onIntegrationSetupDialogError);

        ezApi.ezclocker.ezEventEngine.ezRegisterEvent(
            EzQBOIntegrationSetupDialog.ezApiName,
            EzQBOIntegrationSetupDialog.ezEventNames.onIntegrationSetupDialogDataReady);

        return EzQBOIntegrationSetupDialog.ezInstance;
    }

    /**
        @override
        @protected @method
        Initializes the ezUxIds property for the class instance
     */
    ezInitUxIds() {
        super.ezInitUxIds();

        EzQBOIntegrationSetupDialog.ezInstance.ezUxIds.elementIds.ezErrorMessageContainerId =
            ezApi.ezIdTemplate`${EzQBOIntegrationSetupDialog.ezInstance.ezDialogId}_ValidationErrorContainer`;

        EzQBOIntegrationSetupDialog.ezInstance.ezUxIds.elementIds.ezErrorMessageId =
            `${EzQBOIntegrationSetupDialog.ezInstance.ezDialogId}_EzValidationErrorMessage`;
			
        EzQBOIntegrationSetupDialog.ezInstance.ezUxIds.elementIds.ezQBOSignOutId =
            ezApi.ezIdTemplate`${EzQBOIntegrationSetupDialog.ezInstance.ezDialogId}_ezQBOSignOutId`;
    }

    /**
        @override
        @protected @method
        Initializes the EzQBOIntegrationSetupDialog UX
     */
    ezInitUX() {
        super.ezInitUX();

        EzQBOIntegrationSetupDialog.ezInstance.ezBuildTabViews();

        ezApi.ezclocker.ezUi.ezPrependContent(
            EzQBOIntegrationSetupDialog.ezInstance.ezUxIds.parentIds.ezContentParentId,
            EzQBOIntegrationSetupDialog.ezInstance.ezBuildFullscreenHtml());
			
        ezApi.ezclocker.ezEventEngine.ezWantElementEvent(
            EzQBOIntegrationSetupDialog.ezInstance.ezUxIds.parentIds.ezFullScreenOkButtonId,
            EzElementEventName.CLICK,
            EzQBOIntegrationSetupDialog.ezApiName,
            EzQBOIntegrationSetupDialog.ezInstance.ezSubmit);

        ezApi.ezclocker.ezUi.ezAppendContent(
            EzQBOIntegrationSetupDialog.ezInstance.ezUxIds.parentIds.ezDialogParentContainerId,
            EzQBOIntegrationSetupDialog.ezInstance.ezBuildDialogHtml());

        EzQBOIntegrationSetupDialog.ezInstance.ezInitDialog();

        EzQBOIntegrationSetupDialog.ezInstance.ezSupportedMappings.forEach(
            (ezIntegrationMappingViewType) => ezApi.ezclocker.ezEventEngine.ezWantElementEvent(
                EzQBOIntegrationSetupDialog.ezInstance.ezTabIds[ezIntegrationMappingViewType],
                EzElementEventName.CLICK,
                EzQBOIntegrationSetupDialog.ezApiName,
                EzQBOIntegrationSetupDialog.ezInstance.ezHandleTabClick));
    }

    /**
        @override
        @protected @method
        Initializes the dialog's data
        @returns {Promise.resolve}
    */
    ezInitData() {
        return ezApi.ezAsyncAction(
            (finished) => super.ezInitData()
                .then(
                    () => {
                        ezApi.ezclocker.ezEventEngine.ezTriggerEvent(
                            EzQBOIntegrationSetupDialog.ezEventNames.onIntegrationSetupDialogDataReady,
                            EzQBOIntegrationSetupDialog.ezApiName);
                        return finished();
                    }));
    }

    /**
       @protected
       Resets the dialog's state and data to the initial values.
    */
    ezResetDialog() {
        EzQBOIntegrationSetupDialog.ezInstance.ezJobCodesById = {};
        EzQBOIntegrationSetupDialog.ezInstance.ezJobCodes = [];
        EzQBOIntegrationSetupDialog.ezInstance.ezIntegrationResponse = null;
        EzQBOIntegrationSetupDialog.ezInstance.ezIntegrationSetupDialogDisplayMode = EzIntegrationSetupDialogDisplayMode.DIALOG;

        ezApi.ezclocker.ezUi.ezHideElement(EzQBOIntegrationSetupDialog.ezInstance.ezUxIds.elementIds.ezErrorMessageContainerId);
        ezApi.ezclocker.ezUi.ezContent(EzQBOIntegrationSetupDialog.ezInstance.ezUxIds.elementIds.ezErrorMessageId, '');
    }

    /**
        @override
        @public @method
        Shows the view to the user
        @param {EzIntegrationSetupDialogDisplayMode} ezIntegrationSetupDialogDisplayMode
        @returns {Promise.resolve}
     */
    ezShow(ezIntegrationSetupDialogDisplayMode, closeCallback) {
        return ezApi.ezclocker.ezUi.ezPageWaitResolve(
            `Loading ${EzQBOIntegrationSetupDialog.ezInstance.ezIntegrationName} configuration ...`,
            (finished) => super.ezShow(ezIntegrationSetupDialogDisplayMode, closeCallback)
                .then(
                    () => {
                        ezApi.ezclocker.ezEventEngine.ezWantEvent(
                            EzQBOIntegrationSetupDialog.ezEventNames.onIntegrationSetupDialogDataReady,
                            EzQBOIntegrationSetupDialog.ezApiName,
                            () => {
                                EzQBOIntegrationSetupDialog.ezInstance.ezBuildSupportedMappingViews();

                                return EzQBOIntegrationSetupDialog.ezInstance.ezShowDialogInMode()
                                    .then(
                                        () => {
                                            EzQBOIntegrationSetupDialog.ezInstance.ezUpdateDialogHeaderValues();
                                            return finished()
                                        });
                            });

                        return EzQBOIntegrationSetupDialog.ezInstance.ezInitData()
                            .then(ezApi.ezIgnoreResolve);
                    }));
    }

    /**
        @protected @method
        Shows the dialog UX in the specified display mode
        @returns {Promise.resolve}
     */
    ezShowDialogInMode() {
        return ezApi.ezAsyncAction(
            (finished) => {
                if ('FULL_SCREEN' === EzQBOIntegrationSetupDialog.ezInstance.ezIntegrationSetupDialogDisplayMode) {
                    let dialogElement = ezApi.ezclocker.ezUi.ezFindByElementOrId(EzQBOIntegrationSetupDialog.ezInstance.ezDialogId);

                    if (EzQBOIntegrationSetupDialog.ezInstance.ezFullScreenParentId !== dialogElement.parentElement.id) {
                        ezApi.ezclocker.ezUi.ezReparentElement(
                            ezApi.ezIdTemplate`${EzQBOIntegrationSetupDialog.ezInstance.ezDialogId}_DialogContent`,
                            EzQBOIntegrationSetupDialog.ezInstance.ezFullScreenContentId);
                    }

                    EzQBOIntegrationSetupDialog.ezInstance.ezActivateTab(EzIntegrationMappingViewType.EMPLOYEE_MAPPING);

                    return ezApi.ezclocker.ezUi.ezHideElementAnimated(
                        EzQBOIntegrationSetupDialog.ezInstance.ezContentId,
                        'slideOutLeft')
                        .then(
                            () => ezApi.ezclocker.ezUi.ezShowElementAnimated(
                                EzQBOIntegrationSetupDialog.ezInstance.ezFullScreenParentId,
                                'slideInRight',
                                'grid'))
                        .then(
                            () => {
                                ezApi.ezclocker.ezEventEngine.ezTriggerEvent(
                                    EzQBOIntegrationSetupDialog.ezEventNames.onIntegrationSetupDialogVisible,
                                    EzQBOIntegrationSetupDialog.ezInstance);
                                return finished();
                            });
                } else {
                    let dialogElement = ezApi.ezclocker.ezUi.ezFindByElementOrId(EzQBOIntegrationSetupDialog.ezInstance.ezDialogId);

                    if (EzQBOIntegrationSetupDialog.ezInstance.ezDialogId !== dialogElement.parentElement.id) {
                        ezApi.ezclocker.ezUi.ezReparentElement(
                            ezApi.ezIdTemplate`${EzQBOIntegrationSetupDialog.ezInstance.ezDialogId}_DialogContent`,
                            EzQBOIntegrationSetupDialog.ezInstance.ezDialogId);
                    }

                    return ezApi.ezclocker.ezDialog.ezShowDialog(EzQBOIntegrationSetupDialog.ezInstance.ezDialogId).then(
                        () => {
                            EzQBOIntegrationSetupDialog.ezInstance.ezActivateTab(EzIntegrationMappingViewType.EMPLOYEE_MAPPING);

                            ezApi.ezclocker.ezEventEngine.ezTriggerEvent(
                                EzQBOIntegrationSetupDialog.ezEventNames.onIntegrationSetupDialogVisible,
                                EzQBOIntegrationSetupDialog.ezInstance);

                            return finished();
                        });
                }
            });
    }

    /**
        @override
        @public @method
        Closes the visible view
     */
    ezClose() {
        super.ezClose();
        if ('FULL_SCREEN' === EzQBOIntegrationSetupDialog.ezInstance.ezIntegrationSetupDialogDisplayMode) {
            ezApi.ezclocker.ezUi.ezHideElementAnimated(
                EzQBOIntegrationSetupDialog.ezInstance.ezFullScreenParentId,
                'slideOutRight')
                .then(() => ezApi.ezclocker.ezUi.ezShowElementAnimated(
                    EzQBOIntegrationSetupDialog.ezInstance.ezContentId,
                    'slideInLeft'));
        } else {
            ezApi.ezclocker.ezDialog.ezCloseDialog(EzQBOIntegrationSetupDialog.ezInstance.ezDialogId);
        }

        ezApi.ezclocker.ezEventEngine.ezTriggerEvent(
            EzQBOIntegrationSetupDialog.ezEventNames.onIntegrationSetupDialogClose,
            EzQBOIntegrationSetupDialog.ezInstance);

        if (ezApi.ezIsFunction(EzQBOIntegrationSetupDialog.ezInstance.ezCloseCallback)) {
            EzQBOIntegrationSetupDialog.ezInstance.ezCloseCallback();
        }

        EzQBOIntegrationSetupDialog.ezInstance.ezResetDialog();
		ezApi.ezclocker.nav.ezNavigateToEmployerIntegrationsPage()
    }

    /**
        @protected @method
        Determines if the configuration data is valid and all required data is available.
        @param {EzQBOIntegrationSetupRequest} ezQBOIntegrationSetupRequest
        @returns {Boolean}
     */
    ezValidateConfiguration(ezQBOIntegrationSetupRequest) {
        if (!ezApi.ezIsValid(ezQBOIntegrationSetupRequest)) {
            throw new EzBadParamException(
                'ezQBOIntegrationSetupRequest',
                EzQBOIntegrationSetupDialog.ezInstance,
                EzQBOIntegrationSetupDialog.ezInstance.ezValidateConfiguration);
        }

        let validationSuccess = !EzQBOIntegrationSetupDialog.ezInstance.ezDuplicateEmployeeMapIdDetected;
        if (EzQBOIntegrationSetupDialog.ezInstance.ezDuplicateCustomerMapIdDetected) {
			validationSuccess = false;
		}
        if (ezApi.ezIsTrue(validationSuccess)) {
            EzQBOIntegrationSetupDialog.ezInstance.ezHideValidationError(
                EzQBOIntegrationSetupDialog.ezInstance.ezHeaderInputIds.ezPayChexClientIdInputId,
                EzIntegrationMappingViewType.EMPLOYEE_MAPPING);
            EzQBOIntegrationSetupDialog.ezInstance.ezHideValidationError(
                null,
                EzIntegrationMappingViewType.PAY_RATE_MAPPING);
            EzQBOIntegrationSetupDialog.ezInstance.ezHideValidationError(
                null,
                EzIntegrationMappingViewType.JOB_MAPPING);
        }

        if (!ezQBOIntegrationSetupRequest.ezHasEmployeeMappings()) {
            EzQBOIntegrationSetupDialog.ezInstance.ezShowValidationError('You must map at least one employee.');
            validationSuccess = false;
        }

        return validationSuccess;
    }

    ezQBOSignout() {
	  let url = '/_api/v1/integrations/oauth2/disconnect/INTUIT';
	  
        return ezApi.ezPromise(
            (resolve, reject) => {
                return ezApi.ezclocker.ezHttpHelper.ezGet(
                    url)
                    .then(
                        ezApi.ezclocker.ezHttpHelper.ezProcessApiResolve,
                        ezApi.ezclocker.ezHttpHelper.ezProcessApiReject)
                    .then(
                        (response) => {
							ezApi.ezclocker.ezNavigation.ezNavigateToSecurePage('integrations');
                            return resolve(response);
                        },
                        (eResponse) => {
                            ezApi.ezclocker.ezLogger.error(
                                ezApi.ezEM`
                                    Failed to refresh the selected employer's integration employees.
                                    Error: ${ezApi.ezToJson(eResponse)}`);
									
							ezApi.ezclocker.ezNavigation.ezNavigateToSecurePage('integrations');
                            return reject(eResponse);
                        });
            });
	  
	  
    }
    /**
        @override
        @public @method
        Closes the visible view
     */
    ezSubmit() {
        let integrationSetupRequest = new EzQBOIntegrationSetupRequest();
        integrationSetupRequest.ezEnableIntegration = ezApi.ezclocker.ezUi.ezIsCheckBoxChecked(
            EzQBOIntegrationSetupDialog.ezInstance.ezHeaderInputIds.ezIntegrationEnableInputId);
        EzQBOIntegrationSetupDialog.ezInstance.ezApplySupportedMappingsToRequest(integrationSetupRequest);

//iansubmit		
        if (ezApi.ezIsFalse(EzQBOIntegrationSetupDialog.ezInstance.ezValidateConfiguration(integrationSetupRequest))) {
            return;
        }

        ezApi.ezclocker.ezUi.ezPageWaitExecute(
            `Saving ${EzQBOIntegrationSetupDialog.ezInstance.ezIntegrationName} integration configuration ...`,
            (waitDone) => EzQBOIntegrationSetupDialog.ezInstance.ezController.ezSaveIntegrationSetup(
                EzQBOIntegrationSetupDialog.ezInstance.ezIntegrationProviderId,
                integrationSetupRequest)
                .then(
                    (response) => {
                        waitDone();
                        ezApi.ezclocker.ezEventEngine.ezTriggerEvent(
                            EzQBOIntegrationSetupDialog.ezEventNames.onIntegrationSetupDialogSubmitted,
                            response);

                        if (ezApi.ezIsTrue(integrationSetupRequest.ezEnableIntegration)) {
                            ezApi.ezclocker.ezDialog.ezShowMessage(
                                EzQBOIntegrationSetupDialog.ezInstance.ezDialogTitle,
                                `You have successfully setup your ${EzQBOIntegrationSetupDialog.ezInstance.ezIntegrationName} integration!`)
                                .then(EzQBOIntegrationSetupDialog.ezInstance.ezClose);
                        } else {
                            EzQBOIntegrationSetupDialog.ezInstance.ezClose();
                        }
                    },
                    (eResponse, jqXHR) => {
                        ezApi.ezclocker.logger.error(ezApi.ezEM`
                            Failed ${EzQBOIntegrationSetupDialog.ezInstance.ezIntegrationName} Integration. Error: ${ezApi.ezToJson(eResponse)}`);
                        waitDone();

                        ezApi.ezclocker.ezDialog.ezShowPossibleDefectError(
                            ezApi.ezEM`${EzQBOIntegrationSetupDialog.ezInstance.ezIntegrationName} Integration Setup Error`,
                            'Unable to save your QBO integration configuration at this time.',
                            jqXHR,
                            eResponse,
                            {
                                url: ezApi.ezclocker.nav.ezGetInternalApiUrl(
                                    ezApi.ezUrlTemplate`integrations/${EzIntegrationProviderId.QBO}/QBO`),
                                payload: ezApi.ezToJson(integrationSetupRequest)
                            });

                        ezApi.ezclocker.ezEventEngine.ezTriggerEvent(
                            EzQBOIntegrationSetupDialog.ezEventNames.onIntegrationSetupDialogError,
                            eResponse);
                    }));
    }

    /**
        @protected @method
        Updates the dialog's header inputs with data from the saved configuration (if any)
     */
    ezUpdateDialogHeaderValues() {
        if (ezApi.ezIsNotValid(EzQBOIntegrationSetupDialog.ezInstance.ezIntegrationResponse)) {
            ezApi.ezclocker.ezUi.ezSetCheckboxValue(EzQBOIntegrationSetupDialog.ezInstance.ezHeaderInputIds.ezIntegrationEnableInputId, false);
            return;
        }

        ezApi.ezclocker.ezUi.ezSetCheckboxValue(
            EzQBOIntegrationSetupDialog.ezInstance.ezHeaderInputIds.ezIntegrationEnableInputId,
            ezApi.ezIsTrue(EzQBOIntegrationSetupDialog.ezInstance.ezIntegrationResponse.ezEnableIntegration));
    }

    /**
        @protected @method
        Applies all the supported mappings to the setup request.
        @param {EzQBOIntegrationSetupRequest} integrationSetupRequest
     */
    ezApplySupportedMappingsToRequest(integrationSetupRequest) {
        EzQBOIntegrationSetupDialog.ezInstance.ezSupportedMappings.forEach((ezIntegrationMappingViewType) => {
            switch (ezIntegrationMappingViewType) {
                case EzIntegrationMappingViewType.EMPLOYEE_MAPPING:
                    EzQBOIntegrationSetupDialog.ezInstance.ezApplyEmployeeMappings(integrationSetupRequest);
                    break;
                case EzIntegrationMappingViewType.JOB_MAPPING:
                    EzQBOIntegrationSetupDialog.ezInstance.ezApplyJobMappings(integrationSetupRequest);
                    break;
                case EzIntegrationMappingViewType.PAY_RATE_MAPPING:
                    EzQBOIntegrationSetupDialog.ezInstance.ezApplyPayTypeMappings(integrationSetupRequest);
                    break;
                default:
                    ezApi.ezclocker.logger.error(
                        ezApi.ezEM`
                            Integration mapping id ${ezIntegrationMappingViewType} is not currently supported in
                            ${EzQBOIntegrationSetupDialog.ezInstance.ezIntegrationName}`);
            }
        });
    }

    /**
        @protected @method
        Adds the employee mappings to the provided integrationSetupRequest
        @param {EzQBOIntegrationSetupRequest} integrationSetupRequest
    */
    ezApplyEmployeeMappings(integrationSetupRequest) {
        if (!ezApi.ezIsValid(integrationSetupRequest)) {
            throw new EzBadParamException(
                'integrationSetupRequest',
                EzQBOIntegrationSetupDialog.ezInstance,
                EzQBOIntegrationSetupDialog.ezInstance.ezApplyEmployeeMappings);
        }

        let employees = ezApi.ezclocker.ezClockerContext.ezGetSelectedEmployerAccountEmployeeAccounts();
        if (!ezApi.ezArrayHasLength(employees)) {
            // No employees to map
            return;
        }

        let mapIds = [];
        EzQBOIntegrationSetupDialog.ezInstance.ezDuplicateEmployeeMapIdDetected = false;
		
		let onlineEmployees = EzQBOIntegrationSetupDialog.ezInstance.getQBOnlineEmployees(false);

        employees.forEach(
            (employee) => {
                let employeeIdStr = employee.id.toString();
				let onlineEmployeeId = `${EzQBOIntegrationSetupDialog.ezInstance.ezDialogId}_onlineEmployee_${employeeIdStr}`;

				let selectId = `${EzQBOIntegrationSetupDialog.ezInstance.ezDialogId}_onlineEmployee_${employeeIdStr}`;
				let selectedProviderEmployeeId = ezApi.ezclocker.ezUi.ezGetInputValue(selectId);

                if (ezApi.ezElementExists(onlineEmployeeId)) {
                    let ezEmployeeIntegrationMapRequest = null;
					let matchedOnlineEmployee = null;
					for (let qboEmp of onlineEmployees) {
						if (selectedProviderEmployeeId === qboEmp.providerEmployeeId) {
							ezEmployeeIntegrationMapRequest = EzQBOIntegrationSetupDialog.ezInstance.findQBOnlineEmployeeMap(qboEmp.providerEmployeeId);
							matchedOnlineEmployee = qboEmp;
							break;
						}
					}
				
					if (ezApi.ezIsNotValid(ezEmployeeIntegrationMapRequest)) {
						ezEmployeeIntegrationMapRequest = new EzEmployeeIntegrationMapRequest();
					}
                    let mapKey = selectedProviderEmployeeId;

                    ezApi.ezclocker.ezUi.ezRemoveElementClass(onlineEmployeeId, 'ez-input-validation-error');

                    if (matchedOnlineEmployee && ezApi.ezStringHasLength(mapKey)) {
                        if (0 <= mapIds.indexOf(mapKey)) {
                            EzQBOIntegrationSetupDialog.ezInstance.ezDuplicateEmployeeMapIdDetected = true;
                            EzQBOIntegrationSetupDialog.ezInstance.ezShowValidationError(
                                ezApi.ezEM`
                                    One or more duplicate ${EzQBOIntegrationSetupDialog.ezInstance.ezIntegrationEmployeeMapFieldDisplayName}s detected.
                                    All employee maps must have unique QBO employees`,
                                onlineEmployeeId,
                                EzIntegrationMappingViewType.EMPLOYEE_MAPPING);
                            EzQBOIntegrationSetupDialog.ezInstance.ezShowValidationError(
                                null,
                                onlineEmployeeId,
                                null);
                        } else {
                            mapIds.push(mapKey);
                        }

                        ezEmployeeIntegrationMapRequest.ezEmployerId = employee.employerId;
                        ezEmployeeIntegrationMapRequest.ezEmployeeId = employee.id;
                        ezEmployeeIntegrationMapRequest.ezEmployerIntegrationMapId = '';
                        ezEmployeeIntegrationMapRequest.ezIntegrationProviderId = EzIntegrationProviderId.QBO;
                        ezEmployeeIntegrationMapRequest.mappedByUserId = ezApi.ezclocker.ezClockerContext.ezGetUserContext().userAccount.id;

                        ezEmployeeIntegrationMapRequest.providerConnectionId = matchedOnlineEmployee.providerConnectionId;
                        ezEmployeeIntegrationMapRequest.providerEmployeeId = matchedOnlineEmployee.providerEmployeeId;
                        ezEmployeeIntegrationMapRequest.providerEmployeeName = `${matchedOnlineEmployee.integrationEmployeeFirstName} ${matchedOnlineEmployee.integrationEmployeeLastName}`;
                        ezEmployeeIntegrationMapRequest.integrationEmployeeFirstName = matchedOnlineEmployee.integrationEmployeeFirstName;
                        ezEmployeeIntegrationMapRequest.integrationEmployeeLastName = matchedOnlineEmployee.integrationEmployeeLastName;

                        integrationSetupRequest.ezAddEzEmployeeIntegrationMapRequest(ezEmployeeIntegrationMapRequest);
                    }
                }
            });
    }
	
	
    /**
        @protected @method
        Adds the pay type mappings to the provided integrationSetupRequest
        @param {EzQBOIntegrationSetupRequest} integrationSetupRequest
     */
    ezApplyPayTypeMappings(integrationSetupRequest) {
        if (!ezApi.ezIsValid(integrationSetupRequest)) {
            throw new EzBadParamException(
                'integrationSetupRequest',
                EzQBOIntegrationSetupDialog.ezInstance,
                EzQBOIntegrationSetupDialog.ezInstance.ezApplyEmployeeMappings);
        }

        EzQBOIntegrationSetupDialog.ezInstance.ezSupportedEzClockerPayRateTypes.forEach(
            (ezClockerPayRateType) => {
                let inputId = `${EzQBOIntegrationSetupDialog.ezInstance.ezDialogId}_PayRateMappingInput_${ezClockerPayRateType}`;
                if (ezApi.ezclocker.ezUi.ezElementExists(inputId)) {
                    let ezIntegrationPayRateType = ezApi.ezclocker.ezUi.ezGetInputValue(inputId).trim();

                    if (ezApi.ezStringHasLength(ezIntegrationPayRateType)) {
                        let payRateIntegrationMapRequest = EzQBOIntegrationSetupDialog.ezInstance.ezGetCurrentMapInstance(inputId);
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
        @param {EzQBOIntegrationSetupRequest} integrationSetupRequest
     */
    ezApplyJobMappings(integrationSetupRequest) {
        if (!ezApi.ezIsValid(integrationSetupRequest)) {
            throw new EzBadParamException(
                'integrationSetupRequest',
                EzQBOIntegrationSetupDialog.ezInstance,
                EzQBOIntegrationSetupDialog.ezInstance.ezApplyJobMappings);
        }
		const self = EzQBOIntegrationSetupDialog.ezInstance;
		let onlineCustomers = EzQBOIntegrationSetupDialog.ezInstance.getQBOnlineCustomers(false);
		let findQBOnlineCustomerMap = EzQBOIntegrationSetupDialog.ezInstance.findQBOnlineCustomerMap;
		
        EzQBOIntegrationSetupDialog.ezInstance.ezDuplicateCustomerMapIdDetected = false;
		let failedOnlineCustomerId = EzQBOIntegrationSetupDialog.ezInstance.customerMappingCode.ezApplyJobMappings(ezApi, self, integrationSetupRequest, 
				EzQBOIntegrationSetupDialog.ezInstance.ezJobCodesById,
				EzQBOIntegrationSetupDialog.ezInstance.ezDialogId,
				onlineCustomers,
				findQBOnlineCustomerMap);
		if (ezApi.ezIsValid(failedOnlineCustomerId)) {
			EzQBOIntegrationSetupDialog.ezInstance.ezDuplicateEmployeeMapIdDetected = true;
			EzQBOIntegrationSetupDialog.ezInstance.ezShowValidationError(
				ezApi.ezEM`
					One or more duplicate ${EzQBOIntegrationSetupDialog.ezInstance.ezIntegrationEmployeeMapFieldDisplayName}s detected.
					All customer maps must have unique QBO customers`,
				failedOnlineCustomerId,
				EzIntegrationMappingViewType.EMPLOYEE_MAPPING);
			EzQBOIntegrationSetupDialog.ezInstance.ezShowValidationError(
				null,
				failedOnlineCustomerId,
				null);
		}
    }

	findQBOnlineCustomerMap(providerCustomerId) {
        let ezIntegrationResponse = ezApi.ezIsValid(EzQBOIntegrationSetupDialog.ezInstance.ezIntegrationResponse)
            ? EzQBOIntegrationSetupDialog.ezInstance.ezIntegrationResponse
            : new EzQBOIntegrationSetupResponse();

		let onlineCustomerMap = ezIntegrationResponse.ezGetAllCustomerMappings();
		for (let key in onlineCustomerMap) {
			let obj = onlineCustomerMap[key];
			if (obj.providerCustomerId === providerCustomerId) {
				return obj;
			}
		}

		return null;
	}		

    /**
        @protected @method
        Removes the normal styles and applies the validation error styles to the provided tabId
        @param {EzIntegrationMappingViewType} ezIntegrationMappingViewType
     */
    ezApplyErrorTab(ezIntegrationMappingViewType) {
        if (!ezApi.ezStringHasLength(ezIntegrationMappingViewType) ||
            !ezApi.ezHasOwnProperty(EzQBOIntegrationSetupDialog.ezInstance.ezTabIds, ezIntegrationMappingViewType)) {
            return;
        }

        let tabId = EzQBOIntegrationSetupDialog.ezInstance.ezTabIds[ezIntegrationMappingViewType];
        ezApi.ezclocker.ezUi.ezSetElementDataAttributeValue(tabId, 'ezValidationError', 'true');
        if (ezIntegrationMappingViewType === EzQBOIntegrationSetupDialog.ezInstance.ezActiveIntegrationMappingViewType) {
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
            !ezApi.ezHasOwnProperty(EzQBOIntegrationSetupDialog.ezInstance.ezTabIds, ezIntegrationMappingViewType)) {
            return;
        }

        let tabId = EzQBOIntegrationSetupDialog.ezInstance.ezTabIds[ezIntegrationMappingViewType];
        ezApi.ezclocker.ezUi.ezSetElementDataAttributeValue(tabId, 'ezValidationError', 'false');
        if (ezIntegrationMappingViewType === EzQBOIntegrationSetupDialog.ezInstance.ezActiveIntegrationMappingViewType) {
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
                EzQBOIntegrationSetupDialog.ezInstance,
                EzQBOIntegrationSetupDialog.ezInstance.ezActivateTab);
        }

        if (!ezApi.ezHasOwnProperty(EzQBOIntegrationSetupDialog.ezInstance.ezTabs, ezIntegrationMappingViewType)) {
            throw ezApi.ezException(`Tab with id=${ezIntegrationMappingViewType} does not exist.`);
        }

        if (ezIntegrationMappingViewType === EzQBOIntegrationSetupDialog.ezInstance.ezActiveIntegrationMappingViewType) {
            // already active
            return;
        }

        let previouslyActiveIntegrationMappingViewType = EzQBOIntegrationSetupDialog.ezInstance.ezActiveIntegrationMappingViewType;
        EzQBOIntegrationSetupDialog.ezInstance.ezActiveIntegrationMappingViewType = ezIntegrationMappingViewType;
        if (ezApi.ezStringHasLength(previouslyActiveIntegrationMappingViewType) &&
            EzIntegrationMappingViewType.UNKNOWN !== previouslyActiveIntegrationMappingViewType) {
            // Deactivate current

            // Hide the tabs view
            ezApi.ezclocker.ezUi.ezHideElement(EzQBOIntegrationSetupDialog.ezInstance.ezTabs[previouslyActiveIntegrationMappingViewType].tabViewId);
            let previousTabId = EzQBOIntegrationSetupDialog.ezInstance.ezTabIds[previouslyActiveIntegrationMappingViewType];
            ezApi.ezclocker.ezUi.ezSetElementDataAttributeValue(previousTabId, 'active', 'false');
            if ('true' === ezApi.ezclocker.ezUi.ezGetElementDataAttributeValue(previousTabId, 'ezValidationError')) {
                EzQBOIntegrationSetupDialog.ezInstance.ezApplyErrorTab(previouslyActiveIntegrationMappingViewType);
            } else {
                EzQBOIntegrationSetupDialog.ezInstance.ezApplyNormalTab(previouslyActiveIntegrationMappingViewType);
            }
            EzQBOIntegrationSetupDialog.ezInstance.ezTabs[previouslyActiveIntegrationMappingViewType].active = false;
        }

        // Activate the new tab
        let tabId = EzQBOIntegrationSetupDialog.ezInstance.ezTabIds[EzQBOIntegrationSetupDialog.ezInstance.ezActiveIntegrationMappingViewType];
        EzQBOIntegrationSetupDialog.ezInstance.ezTabs[EzQBOIntegrationSetupDialog.ezInstance.ezActiveIntegrationMappingViewType].active = true;
        ezApi.ezclocker.ezUi.ezSetElementDataAttributeValue(tabId, 'active', 'true');
        if ('true' === ezApi.ezclocker.ezUi.ezGetElementDataAttributeValue(tabId, 'ezValidationError')) {
            EzQBOIntegrationSetupDialog.ezInstance.ezApplyErrorTab(EzQBOIntegrationSetupDialog.ezInstance.ezActiveIntegrationMappingViewType);
        } else {
            EzQBOIntegrationSetupDialog.ezInstance.ezApplyNormalTab(EzQBOIntegrationSetupDialog.ezInstance.ezActiveIntegrationMappingViewType);
        }

        EzQBOIntegrationSetupDialog.ezInstance.ezShowTabHelp(ezIntegrationMappingViewType);

        // Display the tab's view
        ezApi.ezclocker.ezUi.ezShowElement(
            EzQBOIntegrationSetupDialog.ezInstance.ezTabs[EzQBOIntegrationSetupDialog.ezInstance.ezActiveIntegrationMappingViewType].tabViewId);
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
                    `${EzQBOIntegrationSetupDialog.ezInstance.ezDialogId}_HelpTitle`,
                    'Pay Rate Mapping');
                ezApi.ezclocker.ezUi.ezContent(
                    `${EzQBOIntegrationSetupDialog.ezInstance.ezDialogId}_IntegrationHelp`,
                    'Pay Rate mapping is not supported by the QBO integration.');
                break;
            case EzIntegrationMappingViewType.JOB_MAPPING:
                ezApi.ezclocker.ezUi.ezContent(
                    `${EzQBOIntegrationSetupDialog.ezInstance.ezDialogId}_HelpTitle`,
                    'Job Mapping');
                ezApi.ezclocker.ezUi.ezContent(
                    `${EzQBOIntegrationSetupDialog.ezInstance.ezDialogId}_IntegrationHelp`,
                    ezApi.ezTemplate`
                        <p>
                        For each ezClocker job select the corresponding QBO customer.
                        </p>
                        <p>
                        To help get you started, ezClocker made it's best guess as to what the matching customer's
                        name is in QBO. Please review our best guess before you continue.
                        </p>`);
                break;
            case EzIntegrationMappingViewType.EMPLOYEE_MAPPING:
            default:
                ezApi.ezclocker.ezUi.ezContent(
                    `${EzQBOIntegrationSetupDialog.ezInstance.ezDialogId}_HelpTitle`,
                    'Employee Mapping');
                ezApi.ezclocker.ezUi.ezContent(
                    `${EzQBOIntegrationSetupDialog.ezInstance.ezDialogId}_IntegrationHelp`,
                    ezApi.ezTemplate`
                        <p>
                        For each ezClocker employee select the corresponding QBO employee.
                        </p>
                        <p>
                        To help get you started, ezClocker made it's best guess as to what the matching employee's
                        name is in QBO. Please review our best guess before you continue.
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
        EzQBOIntegrationSetupDialog.ezInstance.ezIntegrationResponse = null;
        return ezApi.ezResolver((resolve) => EzQBOIntegrationSetupDialog.ezInstance.ezController.ezGetIntegrationSetup(
            EzQBOIntegrationSetupDialog.ezInstance.ezIntegrationProviderId).then(
                (response) => {
                    EzQBOIntegrationSetupDialog.ezInstance.ezIntegrationResponse = response;
					
					if (!EzQBOIntegrationSetupDialog.ezInstance.ezGetOath2SessionExists()) {
			          ezApi.ezclocker.ezUi.ezHideElement('EzQBOIntegrationSetupDialog_ezQBOSignOutId');
					}

                    return resolve();
                },
                (eResponse) => {
                    ezApi.ezclocker.logger.error(
                        ezApi.ezEM`
                        Failed to get existing ${EzQBOIntegrationSetupDialog.ezInstance.ezIntegrationName} integration configuration.
                        Error: ${ezApi.ezToJson(eResponse)}`);
                    ezApi.ezclocker.ezDialog.ezShowPossibleDefectError(
                        `${EzQBOIntegrationSetupDialog.ezInstance.ezIntegrationName} Integration Configuration Load Error`,
                        'Unable to get the existing QBO configuration at this time.',
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
        EzQBOIntegrationSetupDialog.ezInstance.ezJobCodes = [];
        EzQBOIntegrationSetupDialog.ezInstance.ezJobCodesById = null;
        return ezApi.ezResolver(
            (resolve) => ezApi.ezclocker.ezClockerContext.ezRefreshSelectedEmployerAvailableJobs()
                .then(
                    (response) => {
                        if (ezApi.ezArrayHasLength(response.availableJobs)) {
                            EzQBOIntegrationSetupDialog.ezInstance.ezJobCodesById = response.availableJobsById;
                            EzQBOIntegrationSetupDialog.ezInstance.ezJobCodes = response.availableJobs;
                        }
                        return resolve(EzQBOIntegrationSetupDialog.ezInstance.ezJobCodes);
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

        EzQBOIntegrationSetupDialog.ezInstance.ezSupportedMappings.forEach(
            (ezIntegrationMappingViewType) => {
                if (ezApi.ezHasOwnProperty(EzQBOIntegrationSetupDialog.ezInstance.ezTabs, ezIntegrationMappingViewType)) {
                    let ezTab = EzQBOIntegrationSetupDialog.ezInstance.ezTabs[ezIntegrationMappingViewType];
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

        let logoUrl = EzIntegrationProviderId.ezToIntegrationLogoUrl(EzIntegrationProviderId.QUICKBOOKS_ONLINE);
        let logoText = EzIntegrationProviderId.ezToIntegrationLogoText(EzIntegrationProviderId.QUICKBOOKS_ONLINE);
		let qboSignOutClickHandler = `ezApi.ezclocker.ezQBOIntegrationSetupDialog.ezQBOSignout()`;
		
        return ezApi.ezTemplate`
            <div id="${EzQBOIntegrationSetupDialog.ezInstance.ezDialogId}">
                <div id="${EzQBOIntegrationSetupDialog.ezInstance.ezDialogId}_DialogContent" class="ez-white-borderless-box8 ezAutoRow_A_A">
                    <div id="${EzQBOIntegrationSetupDialog.ezInstance.ezDialogId}_Header" class="ezContainer-integration-setup-header">
                        <div id="${EzQBOIntegrationSetupDialog.ezInstance.ezDialogId}_Toptable" class="ezGridNoGap ezAutoCol_AxA">
                            <div class="ezContainer-integration-logo">
                                <img src="${logoUrl}" class="ezContainer-integration-logo-img"/>
                                ${logoText}
                            </div>
                            <div id="${EzQBOIntegrationSetupDialog.ezInstance.ezDialogId}_HeaderEnabledContainer"
                                class="ezGrid-vertical-align-top ezGrid-align-right">
                                <label for="${EzQBOIntegrationSetupDialog.ezInstance.ezHeaderInputIds.ezIntegrationEnableInputId}"
                                    class="ezInputLabel ezBold">
                                    <input id="${EzQBOIntegrationSetupDialog.ezInstance.ezHeaderInputIds.ezIntegrationEnableInputId}"
                                        type="checkbox"/>
                                    ${EzQBOHeaderFieldName.ezToDisplayValue(EzQBOHeaderFieldName.INTEGRATION_ENABLED)}
                                </label>
								<div>
								  <button id="${EzQBOIntegrationSetupDialog.ezInstance.ezUxIds.elementIds.ezQBOSignOutId}" onclick="${qboSignOutClickHandler}" class="deleteMajorButton">Disconnect from QBO</button>
								</div>
                            </div>
                        </div>
                        <div style="height:10px;"></div>
                        <div id="${EzQBOIntegrationSetupDialog.ezInstance.ezUxIds.elementIds.ezErrorMessageContainerId}"
                            class="ez-floating-error-container" style="display:none">
                            <div id="${EzQBOIntegrationSetupDialog.ezInstance.ezUxIds.elementIds.ezErrorMessageId}"></div>
                        </div>
                    </div>
                    <div id="${EzQBOIntegrationSetupDialog.ezInstance.ezDialogId}_SetupContainer"
                        class="ezSubContentView-no-border-no-scroll ezAutoCol_75xA">
                        <div id="${EzQBOIntegrationSetupDialog.ezInstance.ezDialogId}_TabContainer" class="ezTabContainer">
                            <div id="${EzQBOIntegrationSetupDialog.ezInstance.ezDialogId}_Tabs" class="ezTabsContainer">
                                ${tabsHtml}
                            </div>
                            <div id="${EzQBOIntegrationSetupDialog.ezInstance.ezDialogId}_TabViews" class="ezSubContentView-no-border-no-scroll">
                                ${tabsViewHtml}
                            </div>
                        </div>
                        ${EzQBOIntegrationSetupDialog.ezInstance.ezBuildTabHelpHtml()}
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
            <div id="${EzQBOIntegrationSetupDialog.ezInstance.ezDialogId}_HelpContainer" class="ezContainer-side-help-box">
                <div class="ezContainer-side-help-box-title">
                    <img src="/public/images/integrations/help-navy.svg" class="ezContainer-side-help-box-img"/>
                    <lable id="${EzQBOIntegrationSetupDialog.ezInstance.ezDialogId}_HelpTitle">Employee Mapping</label>
                </div>
                <div id="${EzQBOIntegrationSetupDialog.ezInstance.ezDialogId}_IntegrationHelp" class="ezContainer-side-help-box-content">
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
            <div id="${EzQBOIntegrationSetupDialog.ezInstance.ezFullScreenParentId}" class="ezContainer-full-screen-overlay" style="display:none">
                <div id="${EzQBOIntegrationSetupDialog.ezInstance.ezFullScreenParentId}_ButtonBar" class="ezContainer-white-right-aligned-button-container">
                    <button id="${EzQBOIntegrationSetupDialog.ezInstance.ezFullScreenOkButtonId}" class="ezDefaultNormalButton">Save</button>
                    <button id="${EzQBOIntegrationSetupDialog.ezInstance.ezFullScreenCancelButtonId}" 
                                   onclick="ezApi.ezclocker.nav.ezNavigateToEmployerIntegrationsPage()"
								   class="ezNormalButton">Cancel</button>
                </div>
                <div id="${EzQBOIntegrationSetupDialog.ezInstance.ezFullScreenContentId}" class="ezSubContentView-no-scroll ezPad8">
                </div>
            </div>`;
    }

    /**
        @protected @method
        Builds the views for each tab
     */
    ezBuildTabViews() {
        EzQBOIntegrationSetupDialog.ezInstance.ezSupportedMappings.forEach(
            (ezIntegrationMappingViewType) => {
                if (ezApi.ezHasOwnProperty(EzQBOIntegrationSetupDialog.ezInstance.ezViewIds, ezIntegrationMappingViewType) &&
                    ezApi.ezHasOwnProperty(EzQBOIntegrationSetupDialog.ezInstance.ezTabs, ezIntegrationMappingViewType)) {

                    switch (ezIntegrationMappingViewType) {
                        case EzIntegrationMappingViewType.EMPLOYEE_MAPPING:
                            EzQBOIntegrationSetupDialog.ezInstance.ezTabs[ezIntegrationMappingViewType].ezView =
                                EzQBOIntegrationSetupDialog.ezInstance.ezBuildEmployeeMappingTabView();
                            break;
                        case EzIntegrationMappingViewType.JOB_MAPPING:
                            EzQBOIntegrationSetupDialog.ezInstance.ezTabs[ezIntegrationMappingViewType].ezView =
                                EzQBOIntegrationSetupDialog.ezInstance.ezBuildJobMappingTabView();
                            break;
                        case EzIntegrationMappingViewType.PAY_RATE_MAPPING:
                            EzQBOIntegrationSetupDialog.ezInstance.ezTabs[ezIntegrationMappingViewType].ezView =
                                EzQBOIntegrationSetupDialog.ezInstance.ezBuildPayRateMappingTabView();
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
        EzQBOIntegrationSetupDialog.ezInstance.ezSupportedMappings.forEach(
            (ezIntegrationMappingViewType) => {
                let buildMappingListFunction = null;
                switch (ezIntegrationMappingViewType) {
                    case EzIntegrationMappingViewType.EMPLOYEE_MAPPING:
                        buildMappingListFunction = EzQBOIntegrationSetupDialog.ezInstance.ezBuildEmployeeMappingList;
                        break;
                    case EzIntegrationMappingViewType.PAY_RATE_MAPPING:
                        buildMappingListFunction = EzQBOIntegrationSetupDialog.ezInstance.ezBuildPayRateMappingList;
                        break;
                    case EzIntegrationMappingViewType.JOB_MAPPING:
                        buildMappingListFunction = EzQBOIntegrationSetupDialog.ezInstance.ezBuildJobMappingsList;
                        break;
                    default:
                        ezApi.ezclocker.logger.error(
                            `Mapping view ${ezIntegrationMappingViewType} is not supported yet.`);
                }

                if (ezApi.ezIsFunction(buildMappingListFunction)) {
                    ezApi.ezclocker.ezUi.ezAppendContent(
                        `${EzQBOIntegrationSetupDialog.ezInstance.ezViewIds[ezIntegrationMappingViewType]}_TableBody`,
                        buildMappingListFunction());
                }
            });
    }

    /**
        @protected @method
        Builds the tabs integration's employee mapping view
     */
    ezBuildEmployeeMappingTabView() {
        let viewId = EzQBOIntegrationSetupDialog.ezInstance.ezViewIds[EzIntegrationMappingViewType.EMPLOYEE_MAPPING];
        return ezApi.ezTemplate`
            <div id="${viewId}" data-tabgroup="QBOIntegrationTabs" class="ez-tab-view-container"
                style="display:none">
                <div id="${viewId}_ListDiv" class="ezContainer-integration-input-container">
                    <table id="${viewId}_Table" class="ez-table-full-width">
                        <thead id="${viewId}_TableHeader" class="ez-table-header">
                            <tr id="${viewId}_TableHeaderRow" class="ez-table-row">
                                <th id="${viewId}_TableHeaderCell_EzEmployeeName" class="ez-table-cell-header-fixed">
                                    EzClocker Employees
                                </th>
                                <th id="${viewId}_TableHeaderCell_QBOEmployee"
                                    class="ez-table-cell-header-fixed">
                                    QuickBooks Online Employee
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
        let viewId = EzQBOIntegrationSetupDialog.ezInstance.ezViewIds[EzIntegrationMappingViewType.EMPLOYEE_MAPPING];
        ezApi.ezclocker.ezUi.ezClearContent(`${viewId}_TableBody`);

		let oauth2SessionExists = EzQBOIntegrationSetupDialog.ezInstance.ezGetOath2SessionExists();
        if (!oauth2SessionExists) {
	        let oauthButtonClickHandler = `ezApi.ezclocker.ezQBOIntegrationSetupDialog.onClickOauthLogin()`;

            return ezApi.ezTemplate`
                <tr id="${viewId}_TableBodyMappingRow_NoEmployees" class="ez-table-row">
                    <td id="${viewId}_TableBodyMappingCell_NoEmployees" class="ez-table-cell" colspan="2" >
                        You need to connect to Intuit.<br>
						<button onclick="${oauthButtonClickHandler}">Connect to QBO</button>

                    </td>
                </tr>`;
        }
		
        let employees = ezApi.ezclocker.ezClockerContext.ezGetSelectedEmployerAccountEmployeeAccounts();
        if (!ezApi.ezArrayHasLength(employees)) {
            return ezApi.ezTemplate`
                <tr id="${viewId}_TableBodyMappingRow_NoEmployees" class="ez-table-row">
                    <td id="${viewId}_TableBodyMappingCell_NoEmployees" class="ez-table-cell" colspan="2" >
                        No Employees available
                    </td>
                </tr>`;
        }

        let ezIntegrationResponse = ezApi.ezIsValid(EzQBOIntegrationSetupDialog.ezInstance.ezIntegrationResponse)
            ? EzQBOIntegrationSetupDialog.ezInstance.ezIntegrationResponse
            : new EzQBOIntegrationSetupResponse();

        let employeeListHtml = '';
		
		let integrationCompanyName = EzQBOIntegrationSetupDialog.ezInstance.ezGetIntegrationCompanyName();
        if (integrationCompanyName) {
            employeeListHtml += ezApi.ezTemplate`
                <tr id="${viewId}_TableBodyMappingRow_NoEmployees" class="ez-table-row">
                    <td id="${viewId}_TableBodyMappingCell_NoEmployees" class="ez-table-cell" style="font-size: 12pt" colspan="2" >
                        Connected to company: ${integrationCompanyName}
                    </td>
                </tr>`;
        }
		
		
		//convert map to array
		let onlineEmployees = EzQBOIntegrationSetupDialog.ezInstance.getQBOnlineEmployees(true);

        employees.forEach(
            (employee) => {
                let ezEmployeeIntegrationMapRequest =
                    ezIntegrationResponse.ezGetEmployeeMappingForEmployeeId(employee.id);
                if (ezApi.ezIsValid(ezEmployeeIntegrationMapRequest)) {
                    employeeListHtml += EzQBOIntegrationSetupDialog.ezInstance.ezBuildEmployeeMappingRow(
                        viewId,
                        employee,
                        ezEmployeeIntegrationMapRequest, onlineEmployees);
                } else {
                    employeeListHtml += EzQBOIntegrationSetupDialog.ezInstance.ezBuildEmployeeMappingRow(
                        viewId,
                        employee,
                        null, onlineEmployees);
                }
            });

        return employeeListHtml;
    }
	
	onClickOauthLogin() {
        let ezIntegrationResponse = ezApi.ezIsValid(EzQBOIntegrationSetupDialog.ezInstance.ezIntegrationResponse)
            ? EzQBOIntegrationSetupDialog.ezInstance.ezIntegrationResponse
            : new EzQBOIntegrationSetupResponse();
			
		let url = ezIntegrationResponse.ezGetOauth2LoginUrl();
		window.location.replace(url);
	}
	
	getQBOnlineEmployees(addEmployeeIdFlag) {
        let ezIntegrationResponse = ezApi.ezIsValid(EzQBOIntegrationSetupDialog.ezInstance.ezIntegrationResponse)
            ? EzQBOIntegrationSetupDialog.ezInstance.ezIntegrationResponse
            : new EzQBOIntegrationSetupResponse();
			
		let onlineEmployees = ezIntegrationResponse.ezGetAllIntegrationEmployees();

		//add in .ezEmployeeId
		if (addEmployeeIdFlag) {
			let onlineEmployeeMap = ezIntegrationResponse.ezGetAllEmployeeMappings();
			for (let key in onlineEmployeeMap) {
				let obj = onlineEmployeeMap[key];
				let ezEmployeeId = null; 
				for (let qboEmp of onlineEmployees) {
					if (obj.providerEmployeeId === qboEmp.providerEmployeeId) {
						qboEmp.ezEmployeeId = obj.ezEmployeeId;
						break;
					}
				}
			}
		}

		return onlineEmployees;
	}		
	getQBOnlineCustomers(addCustomerIdFlag) {
        let ezIntegrationResponse = ezApi.ezIsValid(EzQBOIntegrationSetupDialog.ezInstance.ezIntegrationResponse)
            ? EzQBOIntegrationSetupDialog.ezInstance.ezIntegrationResponse
            : new EzQBOIntegrationSetupResponse();
			
		let onlineCustomers = ezIntegrationResponse.ezGetAllIntegrationCustomers();

		//add in .ezEmployeeId
		if (addCustomerIdFlag) {
			let onlineCustomerMap = ezIntegrationResponse.ezGetAllCustomerMappings(); 
			for (let key in onlineCustomerMap) {
				let obj = onlineCustomerMap[key];
				let ezEmployeeId = null; 
				for (let qboEmp of onlineCustomers) {
					if (obj.providerCustomerId === qboEmp.providerCustomerId) {
						qboEmp.ezDataTagId = obj.ezDataTagId;
						break;
					}
				}
			}
		}

		return onlineCustomers;
	}		
	ezGetOath2SessionExists() {
        let ezIntegrationResponse = ezApi.ezIsValid(EzQBOIntegrationSetupDialog.ezInstance.ezIntegrationResponse)
            ? EzQBOIntegrationSetupDialog.ezInstance.ezIntegrationResponse
            : new EzQBOIntegrationSetupResponse();
			
		return ezIntegrationResponse.ezGetOath2SessionExists();
	}
	ezGetIntegrationCompanyName() {
        let ezIntegrationResponse = ezApi.ezIsValid(EzQBOIntegrationSetupDialog.ezInstance.ezIntegrationResponse)
            ? EzQBOIntegrationSetupDialog.ezInstance.ezIntegrationResponse
            : new EzQBOIntegrationSetupResponse();
			
		return ezIntegrationResponse.ezGetIntegrationCompanyName();
	}
	
	findQBOnlineEmployeeMap(providerEmployeeId) {
        let ezIntegrationResponse = ezApi.ezIsValid(EzQBOIntegrationSetupDialog.ezInstance.ezIntegrationResponse)
            ? EzQBOIntegrationSetupDialog.ezInstance.ezIntegrationResponse
            : new EzQBOIntegrationSetupResponse();
			

		let onlineEmployeeMap = ezIntegrationResponse.ezGetAllEmployeeMappings();
		for (let key in onlineEmployeeMap) {
			let obj = onlineEmployeeMap[key];
			if (obj.providerEmployeeId === providerEmployeeId) {
				return obj;
			}
		}

		return null;
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
    ezBuildEmployeeMappingRow(viewId, employee, ezEmployeeIntegrationMapRequest, onlineEmployees) {
        if (ezApi.ezIsNotValid(employee)) {
            throw new EzBadParamException(
                'employee',
                EzQBOIntegrationSetupDialog.ezInstance,
                EzQBOIntegrationSetupDialog.ezInstance.ezBuildEmployeeMappingRow);
        }
        if (!ezApi.ezIsNumber(employee.id)) {
            throw new EzBadParamException(
                'employee.id',
                EzQBOIntegrationSetupDialog.ezInstance,
                EzQBOIntegrationSetupDialog.ezInstance.ezBuildEmployeeMappingRow);
        }
        if (!ezApi.ezStringHasLength(employee.employeeName)) {
            throw new EzBadParamException(
                'employee.employeeName',
                EzQBOIntegrationSetupDialog.ezInstance,
                EzQBOIntegrationSetupDialog.ezInstance.ezBuildEmployeeMappingRow);
        }

        let employeeIdStr = employee.id.toString();
        let mappingJson = '';
		let allOptions = EzQBOIntegrationSetupDialog.ezInstance.buildProviderEmployeeOptions(onlineEmployees, employee);	

        if (ezApi.ezIsValid(ezEmployeeIntegrationMapRequest)) {
            mappingJson = ezApi.ezToJson(ezEmployeeIntegrationMapRequest);
        }

        let rowId = `${viewId}_TableBody_Mapping`;
        let onlineEmployeeId =
            `${EzQBOIntegrationSetupDialog.ezInstance.ezDialogId}_onlineEmployee_${employeeIdStr}`;

        return ezApi.ezTemplate`
            <tr id="${rowId}Row_EzEmployee_${employeeIdStr}" class="ez-table-row" data-ezid="${employeeIdStr}">
                <td id="${rowId}Cell_EzEmployee_${employeeIdStr}_EmployeeName"
                    class="ez-table-cell ez-cell-align-middle-left" data-ezid="${employeeIdStr}">
                    ${employee.employeeName}
                </td>
                <td id="${rowId}Cell_EzEmployee_${employeeIdStr}_QBOEmployee"
                    class="ez-table-cell ez-cell-align-middle-center" data-ezid="${employeeIdStr}">
					
				
					<select id="${onlineEmployeeId}" class="ezSelect ezFullWidthEditor" data-ezid="${employeeIdStr}" data-mapping-json='${mappingJson}' >
					    ${allOptions}
                    </select>

                </td>
            </tr>`;
    }
	
	//build a <option> list of all QBO employees
	buildProviderEmployeeOptions(onlineEmployees, employee) {
		const self = EzQBOIntegrationSetupDialog.ezInstance;
		
        if (!ezApi.ezArrayHasLength(onlineEmployees)) {
            return ezApi.ezTemplate`
                <option value="-1" selected>
                    No Employees
                </option>`;
        }

        let selectedQBOEmployeeId = null; 
		for (let qboEmp of onlineEmployees) {
			if (employee.id === qboEmp.ezEmployeeId) {
				selectedQBOEmployeeId = qboEmp.providerEmployeeId;
				break;
			}
		}
		
        let employeeNotSelected = 'selected';
		if (selectedQBOEmployeeId) {
			employeeNotSelected = '';
		}

        let selectOptions = ezApi.ezTemplate`
            <option
                value="-1"
                ${employeeNotSelected}>
                [ Select an QBO Employee ]
            </option>`;
			
		let employees = [];
		onlineEmployees.forEach(
			(onlineEmployee) => {
			   let firstName = ezApi.ezStringOrEmpty(onlineEmployee.integrationEmployeeFirstName);
			   let lastName = ezApi.ezStringOrEmpty(onlineEmployee.integrationEmployeeLastName);
			   let obj = {};
			   obj.fullName = firstName + ' ' + lastName;
			   obj.providerEmployeeId = ezApi.ezStringOrEmpty(onlineEmployee.providerEmployeeId);
			   obj.emailVerified = ezApi.ezIsValid(onlineEmployee.employeeEmail);
			   employees.push(obj);
		});
					
        employees.forEach(
            (employee) => {
				//warn user if an employee email hsa not yet been verified in QBO
				let emailUnverified = (employee.emailVerified) 
				 ? ""
				 :'(email unverified in QBO!)';
				
                let isSelected = (employee.providerEmployeeId == selectedQBOEmployeeId)
                    ? 'selected'
                    : '';
                    selectOptions = ezApi.ezTemplate`${selectOptions}
                        <option
                            id="_SelectEmployee_${employee.providerEmployeeId}"
                            value="${employee.providerEmployeeId}"
                            ${isSelected}>
                            ${employee.fullName} ${emailUnverified}
                        </option>`;
            });

        return selectOptions;
						
	}

    /**
       @protected @method
       Builds the integration's Pay Rate mapping view
       NOTE: QBO does not currently support pay rate mapping
    */
    ezBuildPayRateMappingTabView() {
        let viewId = EzQBOIntegrationSetupDialog.ezInstance.ezViewIds[EzIntegrationMappingViewType.PAY_RATE_MAPPING];
        return ezApi.ezTemplate`
            <div id="${viewId}" data-tabgroup="QBOIntegrationTabs" class="ez-tab-view-container"
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
                                    ${EzQBOIntegrationSetupDialog.ezInstance.ezIntegrationPayRateMapFieldDisplayName}
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

        let ezIntegrationResponse = ezApi.ezIsValid(EzQBOIntegrationSetupDialog.ezInstance.ezIntegrationResponse)
            ? EzQBOIntegrationSetupDialog.ezInstance.ezIntegrationResponse
            : new EzQBOIntegrationSetupResponse();

        let payRateListHtml = '';
        EzQBOIntegrationSetupDialog.ezInstance.ezSupportedEzClockerPayRateTypes.forEach(
            (payRateType) => {
                let payRateIntegrationMapRequest =
                    ezIntegrationResponse.ezGetPayRateIntegrationMapRequestForPayRateType(payRateType);
                if (ezApi.ezIsValid(payRateIntegrationMapRequest) &&
                    ezApi.ezStringHasLength(payRateIntegrationMapRequest.ezClockerPayRateType) &&
                    payRateType === payRateIntegrationMapRequest.ezClockerPayRateType) {
                    payRateListHtml += EzQBOIntegrationSetupDialog.ezInstance.ezBuildPayRateRow(viewId, payRateType, payRateIntegrationMapRequest);
                } else {
                    payRateListHtml += EzQBOIntegrationSetupDialog.ezInstance.ezBuildPayRateRow(viewId, payRateType, null);
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
                EzQBOIntegrationSetupDialog.ezInstance,
                EzQBOIntegrationSetupDialog.ezInstance.ezBuildPayRateRow);
        }
        if (ezApi.ezIsNotValid(ezClockerPayRateType)) {
            throw new EzBadParamException(
                'ezClockerPayRateType',
                EzQBOIntegrationSetupDialog.ezInstance,
                EzQBOIntegrationSetupDialog.ezInstance.ezBuildPayRateRow);
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
                    <input id="${EzQBOIntegrationSetupDialog.ezInstance.ezDialogId}_PayRateMappingInput_${ezClockerPayRateType}"
                        class="ezFullWidthEditor" type="text" data-ezid="${ezClockerPayRateType}"
                        data-mappingJson='${mappingJson}' ${value} autocomplete="${ezClockerPayRateType}"/>
                </td>
            </tr>`;
    }

    /**
        @protected @method
        Builds the Job Mapping View for QBO
        NOTE: QBO does not currently support job mapping
     */
    ezBuildJobMappingTabView() {
        let viewId = EzQBOIntegrationSetupDialog.ezInstance.ezViewIds[EzIntegrationMappingViewType.JOB_MAPPING];
        return ezApi.ezTemplate`
            <div id="${viewId}" data-tabgroup="QBOIntegrationTabs" class="ez-tab-view-container"
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
                                    ${EzQBOIntegrationSetupDialog.ezInstance.ezIntegrationJobMapFieldDisplayName}
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
        let viewId = EzQBOIntegrationSetupDialog.ezInstance.ezViewIds[EzIntegrationMappingViewType.JOB_MAPPING];
        ezApi.ezclocker.ezUi.ezClearContent(`${viewId}_TableBody`);

        if (!ezApi.ezIsValid(EzQBOIntegrationSetupDialog.ezInstance.ezJobCodes)) {
            return ezApi.ezTemplate`
                <tr id="${viewId}_TableBody_MappingRow_NowJobs" class="ez-table-row">
                    <td id="${viewId}_TableBody_MappingCell_NoJobs" class="ez-table-cell" colspan="2">
                        No jobs available
                    </td>
                </tr>`;
        }
		
        let jobCodes = []
        for (let jobCode of EzQBOIntegrationSetupDialog.ezInstance.ezJobCodes) {
			jobCode.customerName = jobCode.displayValue;
			jobCodes.push(jobCode);
		}

		let oauth2SessionExists = EzQBOIntegrationSetupDialog.ezInstance.ezGetOath2SessionExists();
        if (!oauth2SessionExists) {
	        let oauthButtonClickHandler = `ezApi.ezclocker.ezQBOIntegrationSetupDialog.onClickOauthLogin()`;

            return ezApi.ezTemplate`
                <tr id="${viewId}_TableBodyMappingRow_NoEmployees" class="ez-table-row">
                    <td id="${viewId}_TableBodyMappingCell_NoEmployees" class="ez-table-cell" colspan="2" >
                        You need to connect to Intuit.<br>
						<button onclick="${oauthButtonClickHandler}">Connect to QBO</button>

                    </td>
                </tr>`;
        }
		

        let ezIntegrationResponse = ezApi.ezIsValid(EzQBOIntegrationSetupDialog.ezInstance.ezIntegrationResponse)
            ? EzQBOIntegrationSetupDialog.ezInstance.ezIntegrationResponse
            : new EzQBOIntegrationSetupResponse();

        let customerListHtml = '';
		
		let integrationCompanyName = EzQBOIntegrationSetupDialog.ezInstance.ezGetIntegrationCompanyName();
        if (integrationCompanyName) {
            customerListHtml += ezApi.ezTemplate`
                <tr id="${viewId}_TableBodyMappingRow_NoEmployees" class="ez-table-row">
                    <td id="${viewId}_TableBodyMappingCell_NoEmployees" class="ez-table-cell" style="font-size: 12pt" colspan="2" >
                        Connected to company: ${integrationCompanyName}
                    </td>
                </tr>`;
        }
		
		
		//convert map to array
		let onlineCustomers = EzQBOIntegrationSetupDialog.ezInstance.getQBOnlineCustomers(true);
        jobCodes.forEach(
            (customer) => {
                let ezCustomerIntegrationMapRequest =
                    ezIntegrationResponse.ezGetCustomerMappingForCustomerId(customer.id);
					
                if (ezApi.ezIsValid(ezCustomerIntegrationMapRequest)) {
                    customerListHtml += EzQBOIntegrationSetupDialog.ezInstance.ezBuildCustomerMappingRow(
                        viewId,
                        customer,
                        ezCustomerIntegrationMapRequest, onlineCustomers);
                } else {
                    customerListHtml += EzQBOIntegrationSetupDialog.ezInstance.ezBuildCustomerMappingRow(
                        viewId,
                        customer,
                        null, onlineCustomers);
                }
            });

        return customerListHtml;
	}

//////////////////////////////////////////
    ezBuildCustomerMappingRow(viewId, customer, ezCustomerIntegrationMapRequest, onlineCustomers) {
        if (ezApi.ezIsNotValid(customer)) {
            throw new EzBadParamException(
                'customer',
                EzQBOIntegrationSetupDialog.ezInstance,
                EzQBOIntegrationSetupDialog.ezInstance.ezBuildCustomerMappingRow);
        }
        if (!ezApi.ezIsNumber(customer.id)) {
            throw new EzBadParamException(
                'customer.id',
                EzQBOIntegrationSetupDialog.ezInstance,
                EzQBOIntegrationSetupDialog.ezInstance.ezBuildCustomerMappingRow);
        }
        if (!ezApi.ezStringHasLength(customer.customerName)) {
            throw new EzBadParamException(
                'customer.customerName',
                EzQBOIntegrationSetupDialog.ezInstance,
                EzQBOIntegrationSetupDialog.ezInstance.ezBuildCustomerMappingRow);
        }

        let customerIdStr = customer.id.toString();
        let mappingJson = '';
		let allOptions = EzQBOIntegrationSetupDialog.ezInstance.buildProviderCustomerOptions(onlineCustomers, customer);	

        if (ezApi.ezIsValid(ezCustomerIntegrationMapRequest)) {
            mappingJson = ezApi.ezToJson(ezCustomerIntegrationMapRequest);
        }

        let rowId = `${viewId}_TableBody_Mapping`;
        let onlineCustomerId =
            `${EzQBOIntegrationSetupDialog.ezInstance.ezDialogId}_onlineCustomer_${customerIdStr}`;

        return ezApi.ezTemplate`
            <tr id="${rowId}Row_EzCustomer_${customerIdStr}" class="ez-table-row" data-ezid="${customerIdStr}">
                <td id="${rowId}Cell_EzCustomer_${customerIdStr}_EmployeeName"
                    class="ez-table-cell ez-cell-align-middle-left" data-ezid="${customerIdStr}">
                    ${customer.customerName}
                </td>
                <td id="${rowId}Cell_EzCustomer_${customerIdStr}_QBOEmployee"
                    class="ez-table-cell ez-cell-align-middle-center" data-ezid="${customerIdStr}">
					
				
					<select id="${onlineCustomerId}" class="ezSelect ezFullWidthEditor" data-ezid="${customerIdStr}" data-mapping-json='${mappingJson}' >
					    ${allOptions}
                    </select>

                </td>
            </tr>`;
    }
	
	//build a <option> list of all QBO customs
	buildProviderCustomerOptions(onlineCustomers, customer) {
		const self = EzQBOIntegrationSetupDialog.ezInstance;
		return EzQBOIntegrationSetupDialog.ezInstance.customerMappingCode.buildProviderCustomerOptions(ezApi, self, onlineCustomers, customer);
	}

////////////////////////////////////////
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
                EzQBOIntegrationSetupDialog.ezInstance,
                EzQBOIntegrationSetupDialog.ezInstance.ezBuildJobMappingRow);
        }
        if (ezApi.ezIsNotValid(dataTag)) {
            throw new EzBadParamException(
                'dataTag',
                EzQBOIntegrationSetupDialog.ezInstance.ezInstance,
                EzQBOIntegrationSetupDialog.ezInstance.ezBuildJobMappingRow);
        }
        if (!ezApi.ezIsNumber(dataTag.id)) {
            throw new EzBadParamException(
                'dataTag.id',
                EzQBOIntegrationSetupDialog.ezInstance,
                EzQBOIntegrationSetupDialog.ezInstance.ezBuildJobMappingRow);
        }
        if (!ezApi.ezStringHasLength(dataTag.tagName)) {
            throw new EzBadParamException(
                'dataTag.tagName',
                EzQBOIntegrationSetupDialog.ezInstance,
                EzQBOIntegrationSetupDialog.ezInstance.ezBuildJobMappingRow);
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
                    <input id="${EzQBOIntegrationSetupDialog.ezInstance.ezDialogId}_DataTagMappingInput_${dataTagIdStr}" class="ezFullWidthEditor"
                        type="text" data-ezid="${dataTagIdStr}" data-mapping-json='${mappingJson}'
                        ${value} autocomplete="ezDataTag${dataTagIdStr}"/>
                </td>
            </tr>`;
    }

    /**
        @protected @method
        Builds additional resources tab view
     */
    ezBuildAdditionalResourcesTabView() {
        let viewId = EzQBOIntegrationSetupDialog.ezInstance.ezViewIds[EzIntegrationMappingViewType.ADDITIONAL_RESOURCES];
        return ezApi.ezTemplate`
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
                                    ${EzQBOIntegrationSetupDialog.ezInstance.ezIntegrationJobMapFieldDisplayName}
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
                EzQBOIntegrationSetupDialog.ezInstance,
                EzQBOIntegrationSetupDialog.ezInstance.ezHandleTabClick);
        }

        if ('false' === ezApi.ezclocker.ezUi.ezGetElementDataAttributeValue(ezEvent.data.elementEvent.target, 'active')) {
            // Activate only if not already active
            EzQBOIntegrationSetupDialog.ezInstance.ezActivateTab(
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
        ezApi.ezclocker.ezUi.ezId(EzQBOIntegrationSetupDialog.ezInstance.ezDialogId).off('focus');

        ezApi.ezclocker.ezUi.ezFocusElement(EzQBOIntegrationSetupDialog.ezInstance.ezHeaderInputIds.ezIntegrationEnableInputId);

        EzQBOIntegrationSetupDialog.ezInstance.ezSupportedMappings.forEach(
            (ezIntegrationMappingViewType) =>
                ezApi.ezclocker.ezUi.ezScrollTo(`${EzQBOIntegrationSetupDialog.ezInstance.ezTabs[ezIntegrationMappingViewType].tabViewId}_ListDiv`, 0, 0));
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
                EzQBOIntegrationSetupDialog.ezInstance.ezUxIds.classNames.ezInputValidationErrorClass);
        }

        if (ezApi.ezStringHasLength(ezIntegrationMappingViewType)) {
            EzQBOIntegrationSetupDialog.ezInstance.ezApplyErrorTab(ezIntegrationMappingViewType);
        }

        if (ezApi.ezStringHasLength(em)) {
            ezApi.ezclocker.ezUi.ezContent(
                EzQBOIntegrationSetupDialog.ezInstance.ezUxIds.elementIds.ezErrorMessageId,
                em);
            ezApi.ezclocker.ezUi.ezShowElement(EzQBOIntegrationSetupDialog.ezInstance.ezUxIds.elementIds.ezErrorMessageContainerId);
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
                EzQBOIntegrationSetupDialog.ezInstance.ezUxIds.classNames.ezInputValidationErrorClass);
        }

        if (ezApi.ezStringHasLength(ezIntegrationMappingViewType)) {
            EzQBOIntegrationSetupDialog.ezInstance.ezApplyNormalTab(ezIntegrationMappingViewType);
        }

        if (ezApi.ezclocker.ezUi.ezIsElementVisible(EzQBOIntegrationSetupDialog.ezInstance.ezUxIds.elementIds.ezErrorMessageContainerId)) {
            ezApi.ezclocker.ezUi.ezClearContent(EzQBOIntegrationSetupDialog.ezInstance.ezUxIds.elementIds.ezErrorMessageId);
            ezApi.ezclocker.ezUi.ezHideElement(EzQBOIntegrationSetupDialog.ezInstance.ezUxIds.elementIds.ezErrorMessageContainerId);
        }
    }
}
