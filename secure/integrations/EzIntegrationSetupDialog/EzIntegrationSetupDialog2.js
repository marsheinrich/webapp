import {
    EzException,
    EzBadParamException
} from '/ezlibrary/exceptions/EzExceptions.js';

import {
    // EzObject,
    // EzBoolean,
    // EzString,
    // EzArray,
    EzHtml,
    EzJson,
    EzPromise
} from '/ezlibrary/helpers/EzHelpers.js';

import { EzElementEventName } from '/ezlibrary/enums/EzEnumerations.js';

import '/public/javascript/common/ezui.js';
import '/public/javascript/common/ezclocker-dialog-helper.js';

import { EzUxIdsProperty } from '/ezlibrary/EzUxIdsProperty.js';

import { EzEmployeeIntegrationMapRequest } from '/secure/integrations/entities/EzEmployeeIntegrationMapRequest.js';
import { PayRateIntegrationMapRequest } from '/secure/integrations/entities/PayRateIntegrationMapRequest.js';
import { DataTagIntegrationMapRequest } from '/secure/integrations/entities/DataTagIntegrationMapRequest.js';

import { EzIntegrationHeaderFieldName } from '/secure/integrations/EzIntegrationSetupDialog/EzIntegrationHeaderFieldName.js';
import { EzIntegrationMappingViewType } from '/secure/integrations/EzIntegrationSetupDialog/EzIntegrationMappingViewType.js';
import { EzIntegrationProviderId } from '/secure/integrations/ez-integration-enums.js';
import { EzIntegrationSetupDialogDisplayMode } from '/secure/integrations/EzIntegrationSetupDialogDisplayMode.js';
import { EzClockerPayRateType } from '/secure/integrations/EzClockerPayRateType.js';

import { EzDialogConfig } from '/ezlibrary/ux/dialogs/EzDialogConfig.js';

/**
    Generic integration setup dialog.
    Import with:
        import { EzIntegrationSetupDialog2 } from '/secure/integrations/EzIntegrationSetupDialog/EzIntegrationSetupDialog2.js';
 */
export class EzIntegrationSetupDialog2 {
    /**
        @public
        Creates a new instance of EzIntegrationSetupDialog
        @param {EzIntegrationProviderId|String} ezIntegrationProviderId
        @param {Object} controllerRef
     */
    constructor(ezIntegrationProviderId, controllerRef) {
        if (!ezIntegrationProviderId) {
            throw new EzBadParamException(
                'ezIntegrationProviderId',
                self,
                self.constructor);
        }
        if (!controllerRef) {
            throw new EzBadParamException(
                'controllerRef',
                self.ezTypeName,
                self.constructor);
        }
        this.ezIntegrationProviderId = ezIntegrationProviderId;

        this.ezController = controllerRef;

        this.#ezUxIds = new EzUxIdsProperty(`Ez${this.ezIntegrationCodeId}IntegrationSetupDialog`);
    }

    /**
        @private @field
        Stores the EzIntegrationProviderId for this dialog
        @type {string}
        A valid enumeration property value from EzIntegrationProviderId
     */
    #ezIntegrationProviderId = EzIntegrationProviderId.UNKNOWN;

    /**
        @private @field
        Stores the controller to use with this dialog.
        @type {object}
     */
    #ezController = null;

    /**
        @private @field
        Stores the EzIntegrationSetupDialogDisplayMode for this dialog.
        @type {string}
        A valid enumeration property value from EzIntegrationSetupDialogDisplayMode.
     */
    #ezIntegrationSetupDialogDisplayMode = EzIntegrationSetupDialogDisplayMode.DIALOG;

    /**
        @private @field
        Stores the EzIntegrationMappingViewType for this dialog.
        @type {string}
        A valid enumeration property value form EzIntegrationMappingViewType
     */
    #ezActiveIntegrationMappingViewType = EzIntegrationMappingViewType.UNKNOWN;

    /**
        @private @field
        Stores job code id to job code object
        @type {object}
     */
    #ezJobCodesById = {};

    /**
        @private @field
        Stores an array of job codes.
        @type {array}
     */
    #ezJobCodes = [];

    /**
        @private @field
        Stores the EzIntegrationResponse for the dialog
        @type {object}
     */
    #ezIntegrationResponse = null;

    /**
        @private @field
        Stores the function to call back when the dialog closes.
        @type {function}
     */
    #ezCloseCallback = null;

    /**
        @private @field
        Stores if any duplicate employee mappings were detected
        @type {boolean}
     */
    #ezDuplicateEmployeeMapIdDetected = false;

    /**
        @private @field
        Stores an object of EzIntegrationMappingViewType to html ids for the tab buttons used in the dialog.
        @type {object}
     */
    #ezTabIds = {};

    /**
        @private @field
        Stores an object of EzIntegrationMappingViewType to html ids for the tab views used in the dialog.
        @type {object}
     */
    #ezViewIds = {};

    /**
        @private @field
        Stores on object of EzIntegrationMappingViewType to html id for the tabs used in the dialog
        @type {object}
     */
    #ezTabs = {};

    /**
        @private @field
        Stores on object of EzIntegrationMappingViewType to string help text for the tabs used in the dialog
        @type {object}
     */
    #ezTabHelp = {};

    /**
        @private @field
        Stores an object of html element ids used in the dialog.
        @type {object}
     */
    #ezUxIds = null;

    /**
        @public @property @getter
        Gets the ezIntegrationProviderId for this dialog.
        @returns {string}
        A valid enum property value from EzIntegrationProviderId;
     */
    get ezIntegrationProviderId() {
        return this.#ezIntegrationProviderId;
    }

    /**
        @public @property @setter
        Sets the EzIntegrationProviderId for this dialog.
        @param {string} ezIntegrationProviderId
        A valid enum property value from EzIntegrationProviderId
     */
    set ezIntegrationProviderId(ezIntegrationProviderId) {
        this.#ezIntegrationProviderId = ezIntegrationProviderId;
    }

    /**
        @public @getter @property
        Gets the controller to use with this dialog.
        @returns {object}
     */
    get ezController() {
        return this.#ezController;
    }

    /**
        @public @setter @property
        Sets the controller to use with this dialog
        @param {object} ezController
     */
    set ezController(ezController) {
        this.#ezController = ezController;
    }

    /**
        @public @property @getter
        Gets an object of html element ids used in the dialog.
        @returns {object}
     */
    get ezUxIds() {
        return this.#ezUxIds;
    }

    /**
        @public @property @getter
        Sets an object of html element ids used in the dialog.
        @returns {object}
     */
    set ezUxIds(ezUxIds) {
        this.#ezUxIds = ezUxIds;
    }

    /**
        @public @property @getter
        Gets an object of job code id to job code.
        @returns {object}
     */
    get ezJobCodesById() {
        return this.#ezJobCodesById;
    }

    /**
        @public @property @getter
        Sets an object of job code id to job code.
        @returns {object}
     */
    set ezJobCodesById(ezJobCodesById) {
        this.#ezJobCodesById = ezJobCodesById;
    }

    /**
        @public @property @getter
        Gets an array of job codes
        @returns {array}
     */
    get ezJobCodes() {
        return this.#ezJobCodes;
    }

    /**
        @public @property @getter
        Sets an array of job codes
        @returns {array}
     */
    set ezJobCodes(ezJobCodes) {
        this.#ezJobCodes = ezJobCodes
    }

    /**
        @public @property @getter
        Gets the ezIntegrationResponse
        @returns {object|null}
     */
    get ezIntegrationResponse() {
        return this.#ezIntegrationResponse;
    }

    /**
        @public @property @getter
        Sets the ezIntegrationResponse
        @returns {object|null}
     */
    set ezIntegrationResponse(ezIntegrationResponse) {
        this.#ezIntegrationResponse = ezIntegrationResponse;
    }

    /**
        @public @property @getter
        Gets a callback function for when the dialog closes.
        @returns {function|null}
     */
    get ezCloseCallback() {
        return this.#ezCloseCallback;
    }

    /**
        @public @property @getter
        Sets a callback function for when the dialog closes.
        @returns {function|null}
     */
    set ezCloseCallback(ezCloseCallback) {
        this.#ezCloseCallback = ezCloseCallback;
    }

    /**
        @public @property @getter
        Gets if duplicate employee mapping ids were detected
        @returns {boolean}
     */
    get ezDuplicateEmployeeMapIdDetected() {
        return this.#ezDuplicateEmployeeMapIdDetected;
    }

    /**
        @public @property @getter
        Sets if duplicate employee mapping ids were detected
        @returns {boolean}
     */
    set ezDuplicateEmployeeMapIdDetected(ezDuplicateEmployeeMapIdDetected) {
        this.#ezDuplicateEmployeeMapIdDetected = ezDuplicateEmployeeMapIdDetected;
    }

    /**
        @public @getter @property
        Gets the dialogs EzIntegrationMappingViewType
        @returns {string}
     */
    get ezActiveIntegrationMappingViewType() {
        return this.#ezActiveIntegrationMappingViewType;
    }

    /**
        @public @setter @property
        Sets the dialog's EzIntegrationMappingViewType property.
        @param {string} ezIntegrationMappingViewType
        A valid enum property from EzIntegrationMappingViewType
     */
    set ezActiveIntegrationMappingViewType(ezIntegrationMappingViewType) {
        this.#ezActiveIntegrationMappingViewType = ezIntegrationMappingViewType;
    }

    /**
        @public @getter @property
        Gets the dialog's EzIntegrationSetupDialogDisplayMode
        @returns {string}
     */
    get ezIntegrationSetupDialogDisplayMode() {
        return this.#ezIntegrationSetupDialogDisplayMode;
    }

    /**
        @public @setter @property
        Sets the dialog's EzIntegrationSetupDialogDisplayMode
        @param {string} ezIntegrationSetupDialogDisplayMode
        A valid enum property from EzIntegrationSetupDialogDisplayMode
     */
    set ezIntegrationSetupDialogDisplayMode(ezIntegrationSetupDialogDisplayMode) {
        this.#ezIntegrationSetupDialogDisplayMode = ezIntegrationSetupDialogDisplayMode;
    }

    /**
        @public @readonly @property
        Integration name associated with the ezIntegrationProviderId configured for this dialog.
        @returns {string}
     */
    get ezIntegrationName() {
        return EzIntegrationProviderId.ezToDisplayValue(this.ezIntegrationProviderId);
    }

    /**
        @public @readonly @property
        Integration code id associated with the ezIntegrationProviderId configured for this dialog.
        @returns {string}
     */
    get ezIntegrationCodeId() {
        return EzIntegrationProviderId.ezToCodeId(this.ezIntegrationProviderId);
    }

    /**
        @public @readonly @property
        Returns the title for this dialog.
        @returns {string}
     */
    get ezDialogTitle() {
        return `ezClocker ${this.ezIntegrationName} Setup`;
    }

    /**
        @public @readonly @property
        Returns the tab group name for this dialog's tabs
        @returns {string}
     */
    get ezTabGroupName() {
        return `${this.ezIntegrationCodeId}_TabGroup`;
    }

    /**
        @public @readonly @property
        Returns an object of EzIntegrationMappingViewType to html id for the tab buttons of this integration setup
        view.
        @returns {object}
     */
    get ezTabIds() {
        return this.#ezTabIds;
    }

    /**
        @public @readonly @property
        Returns an object of EzIntegrationMappingViewType to tab content view ids of this integration setup view.
     */
    get ezViewIds() {
        return this.#ezViewIds;
    }

    /**
        @public @readonly @property
        Returns an object of EzIntegrationMappingViewType to tab configuration property for this integration setup
        view's tabs.
        @returns {object}
     */
    get ezTabs() {
        return this.#ezTabs;
    }

    /**
        @public @readonly @property
        Returns the id of this integration setup dialog.
     */
    get ezDialogId() {
        return this.ezUxIds.ezDialogId;
    }

    /**
        @public @readonly @property
        Returns an object of EzIntegrationMappingViewType to tab help text
        @returns {object}
     */
    get ezTabHelp() {
        return this.#ezTabHelp;
    }

    /**
        Returns an object of integration setup input header ids.
        @returns {object}
     */
    get ezHeaderInputIds() {
        return {
            integrationEnableInputId:
                EzIntegrationHeaderFieldName.ezToInputId(EzIntegrationHeaderFieldName.INTEGRATION_ENABLED)
        };
    }

    /**
        @public @readonly @property
        Returns an array of the supported mapping configurations
        @returns {array}
     */
    get ezSupportedMappings() {
        return [
            EzIntegrationMappingViewType.EMPLOYEE_MAPPING,
            EzIntegrationMappingViewType.PAY_RATE_MAPPING,
            EzIntegrationMappingViewType.JOB_MAPPING,
            EzIntegrationMappingViewType.ADDITIONAL_RESOURCES
        ];
    }

    /**
        @public @readonly @property
        Returns the employee mapping field display name for this integration.
        @returns {string}
     */
    get ezIntegrationEmployeeMapFieldDisplayName() {
        return `${this.ezIntegrationName} Employee Id`;
    }

    /**
        @public @readonly @property
        Returns the pay rate mapping field display name for this integration.
        @returns {string}
     */
    get ezIntegrationPayRateMapFieldDisplayName() {
        return `${this.ezIntegrationName} Pay Rate`;
    }

    /**
        @public @readonly @property
        Returns the job mapping field display name for this integration.
        @returns {string}
     */
    get ezIntegrationJobMapFieldDisplayName() {
        return `${this.ezIntegrationName} Job Code`;
    }

    /**
        @public @readonly @property
        Returns the additional resources tab display name.
        @returns {string}
     */
    get ezIntegrationAdditionalResourcesDisplayName() {
        return `${this.ezIntegrationName} Additional Resources`;
    }

    /**
        @public @readonly @property
        Returns an array of pay types supported by this integration.
        @returns {array}
     */
    get ezSupportedEzClockerPayRateTypes() {
        return [
            EzClockerPayRateType.REGULAR,
            EzClockerPayRateType.OVERTIME
        ];
    }

    /**
        @public @readonly @property
        Returns an array of pay types not supported by this integration.
        @returns {array}
     */
    get ezUnsupportedEzClockerPayRateTypes() {
        return [
            EzClockerPayRateType.UNKNOWN,
            EzClockerPayRateType.PTO,
            EzClockerPayRateType.HOLIDAY,
            EzClockerPayRateType.SICK,
            EzClockerPayRateType.UNPAID
        ];
    }

    /**
        @public @readonly @property
        Returns the integration setup persistance url
     */
    get ezPersistIntegrationSetupUrl() {
        return `integrations/${this.ezIntegrationProviderId}`;
    }

    /**
        @protected
        Initializes EzIntegrationSetupDialog
        @returns {object}
     */
    ezInit() {
        this.ezInitUxIds();
        this.ezInitUX();
        return this;
    }

    /**
        @protected
        Initializes the ezUxIds property for the class instance
     */
    ezInitUxIds() {
        this.ezUxIds.parentIds['ezDialogParentContainerId'] = '_HideDialogsDiv';
        this.ezUxIds.parentIds['ezDialogWrapperParentId'] = `${this.ezDialogId}_DialogWrapper`;
        this.ezUxIds.parentIds['ezContentParentId'] = '_AccountPage';
        this.ezUxIds.parentIds['ezContentId'] = '_EzClockerMainContent';
        this.ezUxIds.parentIds['ezFullScreenParentId'] = `${this.ezDialogId}_NonDialogContainer`;
        this.ezUxIds.parentIds['ezFullScreenContentId'] = `${this.ezDialogId}_NonDialogContainer_Content`;
        this.ezUxIds.parentIds['ezFullScreenOkButtonId'] = `${this.ezDialogId}_NonDialogContainer_OK`;
        this.ezUxIds.parentIds['ezFullScreenCancelButtonId'] = `${this.ezDialogId}_NonDialogContainer_Cancel`;
        this.ezUxIds.classNames = {
            ezInputValidationErrorClass: 'ez-input-validation-error'
        };
        this.ezUxIds.elementIds['ezErrorMessageContainerId'] =
            `${this.ezUxIds.ezDialogId}_ValidationErrorContainer`;
        this.ezUxIds.elementIds['ezErrorMessageId'] =
            `${this.ezUxIds.ezDialogId}_EzValidationErrorMessage`;


        if (!this.ezUxIds) {
            throw new EzException(
                ezApi.ezEM`
                    Initialization of EzIntegrationSetupDialog property ezUxIds failed or did not result in a valid object.
                    Please check classes extended from EzIntegrationSetupDialog and if the ezInitUxIds() method is
                    overriden. Result from the method should return a valid object with the following root properties:
                    ${ezApi.ezToJson(new EzUxIdsProperty(this.ezIntegrationProviderId))}`);
        }
    }

    /**
        @protected @method
        Initializes the dialog's UX
     */
    ezInitUX() {
        if (!ezApi.ezclocker.ezUi.ezElementExists(this.ezUxIds.parentIds.ezDialogParentContainerId)) {
            ezApi.ezclocker.ezUi.ezAppendContent(
                'body',
                `<div
                    id="${this.ezUxIds.parentIds.ezDialogParentContainerId}"
                    style="display:none">
                </div>`);
        }

        this.ezBuildTabViewIds();

        this.ezBuildTabIds();

        this.ezBuildTabs();

        this.ezBuildTabViews();

        this.ezBuildTabHelp();

        ezApi.ezclocker.ezUi.ezPrependContent(
            this.ezUxIds.parentIds.ezContentParentId,
            this.ezBuildFullscreenHtml());

        ezApi.ezclocker.ezUi.ezAppendContent(
            this.ezUxIds.parentIds.ezDialogParentContainerId,
            this.ezBuildDialogHtml());

        this.ezInitDialog();

        // Hook tab button clicks
        this.ezHookUxEvents();
    }

    /**
        @protected @method
        Hooks UX events
     */
    ezHookUxEvents() {
        let self = this;
        ezApi.ezclocker.ezEventEngine.ezWantElementEvent(
            `${this.ezDialogId}_FullScreenOK`,
            EzElementEventName.CLICK,
            this.ezDialogId,
            () => self.ezSubmit());

        ezApi.ezclocker.ezEventEngine.ezWantElementEvent(
            window,
            EzElementEventName.KEY_DOWN,
            this.ezDialogId,
            (ezEvent) => {
                if (13 == ezEvent.data.elementEvent.keyCode || 13 == ezEvent.data.elementEvent.which) {
                    self.ezSubmit();
                } else if (27 == ezEvent.data.elementEvent.keyCode || 27 == ezEvent.data.elementEvent.which) {
                    self.ezCancel();
                }
            });

        this.ezSupportedMappings.forEach(
            (ezIntegrationMappingViewType) => {
                if (ezApi.ezHasOwnProperty(self.ezTabIds, ezIntegrationMappingViewType)) {
                    ezApi.ezclocker.ezEventEngine.ezWantElementEvent(
                        self.ezTabIds[ezIntegrationMappingViewType],
                        EzElementEventName.CLICK,
                        self.ezDialogId,
                        (ezEvent) => {
                            if (!ezApi.ezIsValid(ezEvent) || !ezApi.ezIsValid(ezEvent.data.elementEvent)) {
                                throw new EzBadParamException(
                                    'ezEvent',
                                    self.ezInstance,
                                    self.ezBuildJobMappingRow);
                            }

                            if ('false' === ezApi.ezclocker.ezUi.ezGetElementDataAttributeValue(ezEvent.data.elementEvent.target, 'active')) {
                                // Activate only if not already active
                                self.ezActivateTab(
                                    ezApi.ezclocker.ezUi.ezGetElementDataAttributeValue(
                                        ezEvent.data.elementEvent.target,
                                        'ezintegrationmappingviewtype'));
                            }
                        });
                }
            });
    }

    /**
        @protected @method
        Initializes the dialog component/widget
     */
    ezInitDialog() {
        let ezDialogOptions = new EzDialogConfig(this.ezDialogId);

        ezDialogOptions.title = `${EzIntegrationProviderId.ezToIntegrationProductName(this.ezIntegrationProviderId)} Integration Setup`;

        ezDialogOptions.width = 1280;

        let self = this;
        ezDialogOptions.focus = () => {
            ezApi.ezclocker.ezUi.ezId(self.ezDialogId).off('focus');
            self.ezSupportedMappings.forEach(
                (ezIntegrationMappingViewType) => ezApi.ezclocker.ezUi.ezScrollTo(
                    `${self.ezTabs[ezIntegrationMappingViewType].tabViewId}_ListDiv`,
                    0,
                    0));
        };
        ezDialogOptions.buttons = [
            {
                text: 'Ok',
                id: `${self.ezDialogId}SaveButton`,
                click: () => self.ezSubmit()
            },
            {
                text: 'Cancel',
                id: `${self.ezDialogId}CancelButton`,
                click: () => self.ezClose()
            }
        ];

        ezApi.ezclocker.ezDialog.ezInitDialogWithConfig(this.ezDialogId, ezDialogOptions);

        if (!ezApi.ezclocker.ezUi.ezElementExists(this.ezUxIds.parentIds.ezDialogParentContainerId)) {
            ezApi.ezclocker.ezUi.ezAppendContent(
                'body',
                `<div
                    id="${this.ezUxIds.parentIds.ezDialogParentContainerId}"
                    style="display:none"></div>`);
        }

        // Set the dialog wrapper's parent id to enable swapping out to full screen
        ezApi.ezclocker.ezUi.ezFindElementBySelector(`[aria-describedby="${self.ezDialogId}"]`).id = this.ezUxIds.parentIds.ezDialogWrapperParentId;
    }

    /**
        @protected @method
        Initialize the dialog's data
        @returns {Promise.resolve}
     */
    ezInitData() {
        let self = this;
        return ezApi.ezAsyncAction(
            (finished) => self.ezLoadEmployerDataTags()
                .then(() => self.ezLoadIntegrationSetupConfiguration())
                .then(() => {
                    self.ezBuildSupportedMappingViews();
                    return finished();
                }));
    }

    /**
        @protected @method
        Loads the intergation's setup configuration
        @returns {Promise.resolve}
     */
    ezLoadIntegrationSetupConfiguration() {
        this.ezIntegrationResponse = null;

        if (!ezApi.ezIsValid(this.ezController)) {
            throw new EzException(
                ezApi.ezEM`
                    You must assign a valid controller to this instance's ezController property before you can call the
                    ezLoadIntegrationSetupConfiguration() method.`);
        }

        let self = this;
        return ezApi.ezAsyncAction(
            (finished) => self.ezController.ezGetIntegrationSetup(self.ezIntegrationProviderId)
                .then(
                    (response) => {
                        self.ezIntegrationResponse = response;
                        return finished();
                    },
                    (eResponse) => {
                        ezApi.ezclocker.ezLogger.error(
                            ezApi.ezEM`
                                Failed to get existing ${self.ezIntegrationName} integration configuration.
                                Error: ${ezApi.ezToJson(eResponse)}`);
                        ezApi.ezclocker.ezDialog.ezShowPossibleDefectError(
                            `${self.ezIntegrationName} Integration Configuration Load Error`,
                            'Unable to get the existing ACS configuration at this time.',
                            ezApi.ezToJson(eResponse));
                        return finished();
                    }));
    }

    /**
        @protected @method
        Loads the active employer's data tags (aka jobs)
     */
    ezLoadEmployerDataTags() {
        this.ezJobCodes = [];

        this.ezJobCodesById = null;

        if (-1 == this.ezSupportedMappings.indexOf(EzIntegrationMappingViewType.JOB_MAPPING)) {
            // Does not support data tags
            return ezApi.ezResolve();
        }

        let self = this;
        return ezApi.ezAsyncAction(
            (finished) => ezApi.ezclocker.ezClockerContext.ezRefreshSelectedEmployerAvailableJobs()
                .then(
                    (response) => {
                        if (ezApi.ezArrayHasLength(response.availableJobs)) {
                            self.ezJobCodesById = response.availableJobsById;
                            self.ezJobCodes = response.availableJobs;
                        }

                        return finished(self.ezJobCodes);
                    },
                    (eResponse) => {
                        ezApi.ezclocker.ezLogger.error(
                            ezApi.EM`
                                Failed to load the available jobs for the employ er.
                                Error: ${ezApi.ezToJson(eResponse)}`);

                        return ezApi.ezclocker.ezDialog.ezShowPossibleDefectError(
                            'Available Jobs Error',
                            'Unable to get the available Jobs for your employer at this time.',
                            ezApi.ezToJson(eResponse))
                            .then(() => finished(eResponse));
                    }));
    }

    /**
        @protected @method
        Returns the current map instance converted from the stored mappingJson data on the input associated with the
        provided inputId.
        @param {String} inputId
        @returns {Object|null}
     */
    ezGetCurrentMapInstance(inputId) {
        let mappingJson = ezApi.ezclocker.ezUi.ezGetElementDataAttributeValue(inputId, 'mapping-json');

        return ezApi.ezStringHasLength(mappingJson)
            ? ezApi.ezFromJson(mappingJson)
            : null;
    }

    /**
        @protected @method
        Builds input help tip HTML
        @param {String} message
        @returns {String}
     */
    ezBuildHelpTipHTML(message) {
        return ezApi.ezTemplate`
            <div
                class="ezContainer-mini-help-box">
                <img
                    src="/public/images/integrations/help-gray.svg"
                    class="ezContainer-mini-help-box-img"/>
                ${message}
            </div>`;
    }

    /**
        @protected @method
        Resets the dialog's state and data to the initial values.
     */
    ezResetDialog() {
        // Reset the dialog's data
        this.ezJobCodesById = {};
        this.ezJobCodes = [];
        this.ezIntegrationResponse = null;

        // Reset the dialog's state
        this.ezIntegrationSetupDialogDisplayMode = EzIntegrationSetupDialogDisplayMode.DIALOG;

        this.ezHideValidationError(
            null,
            EzIntegrationMappingViewType.EMPLOYEE_MAPPING);

        this.ezHideValidationError(
            null,
            EzIntegrationMappingViewType.PAY_RATE_MAPPING);

        this.ezHideValidationError(
            null,
            EzIntegrationMappingViewType.JOB_MAPPING);

        this.ezHideValidationError(
            null,
            EzIntegrationMappingViewType.ADDITIONAL_RESOURCES);

        this.ezDuplicateEmployeeMapIdDetected = false;

        this.ezHideErrorMessage();
    }

    /**
        @public @method
        Shows the integrations dialog in the provided mode (or uses the default if not provided)
        Optionally assigns the provided closeCallback function if not null.
        @param {EzIntegrationSetupDialogDisplayMode} ezIntegrationSetupDialogDisplayMode
        @param {function|null} closeCallback
        @returns {Promise.resolve}
     */
    ezShow(ezIntegrationSetupDialogDisplayMode, closeCallback) {
        return ezApi.ezAsyncAction(
            (finished) => {
                if (ezApi.ezStringHasLength(ezIntegrationSetupDialogDisplayMode)) {
                    this.ezIntegrationSetupDialogDisplayMode = ezIntegrationSetupDialogDisplayMode;
                }

                this.ezCloseCallback = ezApi.ezIsFunction(closeCallback)
                    ? closeCallback
                    : null;

                let self = this;

                return this.ezInitData()
                    .then(
                        () => {
                            self.ezShowDialogInMode();

                            self.ezUpdateDialogHeaderValues();

                            return finished();
                        });
            });
    }

    /**
        @protected @method
        Updates the dialog's header inputs with data from the saved configuration (if any)
     */
    ezUpdateDialogHeaderValues() {
        if (!ezApi.ezIsValid(this.ezIntegrationResponse)) {
            ezApi.ezclocker.ezUi.ezSetCheckboxValue(
                this.ezHeaderInputIds.integrationEnableInputId,
                false);
            return;
        }

        ezApi.ezclocker.ezUi.ezSetCheckboxValue(
            this.ezHeaderInputIds.integrationEnableInputId,
            ezApi.ezIsTrue(this.ezIntegrationResponse.ezEnableIntegration));
    }

    /**
        @protected @method
        Shows the dialog in the configured EzIntegrationSetupDialogDisplayMode
        @returns {Promise.resolve}
     */
    ezShowDialogInMode() {
        const self = this;

        return EzPromise.asyncAction(
            (finished) => {
                if ('FULL_SCREEN' === self.ezIntegrationSetupDialogDisplayMode) {
                    let dialogElement = ezApi.ezclocker.ezUi.ezFindByElementOrId(self.ezDialogId);

                    if (self.ezUxIds.parentIds.ezFullScreenParentId !== dialogElement.parentElement.id) {
                        ezApi.ezclocker.ezUi.ezReparentElement(
                            `${self.ezDialogId}_DialogContent`,
                            self.ezUxIds.parentIds.ezFullScreenParentId);
                    }

                    if (ezApi.ezArrayHasLength(self.ezSupportedMappings)) {
                        self.ezActivateTab(self.ezSupportedMappings[0]);
                    }

                    ezApi.ezclocker.ezUi.ezHideElementAnimated(
                        self.ezUxIds.parentIds.ezContentId,
                        'slideOutLeft');

                    ezApi.ezclocker.ezUi.ezShowElementAnimated(
                        self.ezUxIds.parentIds.ezFullScreenParentId,
                        'slideInRight',
                        'grid');

                    return finished();
                } else {
                    let dialogElement = ezApi.ezclocker.ezUi.ezFindByElementOrId(self.ezDialogId);

                    if (self.ezUxIds.parentIds.ezDialogParentContainerId !== dialogElement.parentElement.id) {
                        ezApi.ezclocker.ezUi.ezReparentElement(
                            `${self.ezDialogId}_DialogContent`,
                            self.ezUxIds.parentIds.ezDialogParentContainerId);
                    }

                    ezApi.ezclocker.ezDialog.ezShowDialog(self.ezDialogId);

                    if (ezApi.ezArrayHasLength(self.ezSupportedMappings)) {
                        self.ezActivateTab(self.ezSupportedMappings[0]);
                    }

                    return finished();
                }
            });
    }

    /**
       @protected @method
       Sets the tag associated with the provided aTabIdToActive as active.
       @param {String} ezIntegrationMappingViewType
    */
    ezActivateTab(ezIntegrationMappingViewType) {
        const self = this;

        if (!ezApi.ezStringHasLength(ezIntegrationMappingViewType)) {
            throw new EzBadParamException(
                'ezIntegrationMappingViewType',
                self.ezInstance,
                self.ezActivateTab);
        }

        if (!ezApi.ezHasOwnProperty(self.ezTabs, ezIntegrationMappingViewType)) {
            throw new EzException(`Tab id=${ezIntegrationMappingViewType} does not exist.`);
        }

        if (ezIntegrationMappingViewType === self.ezActiveIntegrationMappingViewType) {
            // already active
            return;
        }

        let previouslyActiveIntegrationMappingViewType = self.ezActiveIntegrationMappingViewType;

        self.ezActiveIntegrationMappingViewType = ezIntegrationMappingViewType;

        if (ezApi.ezStringHasLength(previouslyActiveIntegrationMappingViewType) &&
            EzIntegrationMappingViewType.UNKNOWN !== previouslyActiveIntegrationMappingViewType) {
            // Deactivate current

            // Hide the tabs view
            ezApi.ezclocker.ezUi.ezHideElement(self.ezTabs[previouslyActiveIntegrationMappingViewType].tabViewId);

            let previousTabId = self.ezTabIds[previouslyActiveIntegrationMappingViewType];

            ezApi.ezclocker.ezUi.ezSetElementDataAttributeValue(previousTabId, 'active', 'false');

            if ('true' === ezApi.ezclocker.ezUi.ezGetElementDataAttributeValue(previousTabId, 'ezValidationError')) {
                self.ezApplyErrorTab(previouslyActiveIntegrationMappingViewType);
            } else {
                self.ezApplyNormalTab(previouslyActiveIntegrationMappingViewType);
            }

            self.ezTabs[previouslyActiveIntegrationMappingViewType].active = false;
        }

        // Activate the new tab
        let tabId = self.ezTabIds[self.ezActiveIntegrationMappingViewType];

        self.ezTabs[self.ezActiveIntegrationMappingViewType].active = true;

        ezApi.ezclocker.ezUi.ezSetElementDataAttributeValue(tabId, 'active', 'true');

        if ('true' === ezApi.ezclocker.ezUi.ezGetElementDataAttributeValue(tabId, 'ezValidationError')) {
            self.ezApplyErrorTab(self.ezActiveIntegrationMappingViewType);
        } else {
            self.ezApplyNormalTab(self.ezActiveIntegrationMappingViewType);
        }

        self.ezShowTabHelp(ezIntegrationMappingViewType);

        ezApi.ezclocker.ezUi.ezShowElement(
            self.ezTabs[self.ezActiveIntegrationMappingViewType].tabViewId);
    }

    /**
        @protected
        Displays the help text for the activated tab
        @param {EzIntegrationMappingViewType} ezIntegrationMappingViewType
     */
    ezShowTabHelp(ezIntegrationMappingViewType) {
        const self = this;

        if (!ezApi.ezStringHasLength(ezIntegrationMappingViewType)) {
            throw new EzBadParamException(
                'ezIntegrationMappingViewType',
                self,
                self.ezShowTabHelp);
        }

        if (!ezApi.ezHasOwnProperty(self.ezTabHelp, ezIntegrationMappingViewType)) {
            ezApi.ezclocker.ezUi.ezContent(
                `${self.ezDialogId}_HelpTitle`,
                '');
            ezApi.ezclocker.ezUi.ezContent(
                `${self.ezDialogId}_IntegrationHelp`,
                '');
            // No tab help to show
            return;
        }

        ezApi.ezclocker.ezUi.ezContent(
            `${self.ezDialogId}_HelpTitle`,
            self.ezTabHelp[ezIntegrationMappingViewType].title);

        ezApi.ezclocker.ezUi.ezContent(
            `${self.ezDialogId}_IntegrationHelp`,
            self.ezTabHelp[ezIntegrationMappingViewType].help);
    }

    /**
        @public @method
        Submits the dialog's input for use/persistance
        @returns {Promise.resolve}
        Returns resolve/reject from the ezPersistIntegrationMappings() call.
     */
    ezSubmit() {
        let isEnabled = ezApi.ezclocker.ezUi.ezIsCheckBoxChecked(
            this.ezHeaderInputIds.integrationEnableInputId);

        let integrationSetupRequest = this.ezCreateIntegrationSetupRequest(isEnabled);

        // Provided for child classs to have common method to override
        return this.ezPersistIntegrationMappings(integrationSetupRequest);
    }

    /**
        @public @method
        Cancels the dialogs input - all changes ignored.
     */
    ezCancel() {
        this.ezClose();
    }

    /**
        @public @method
        Closes the dialog UX
     */
    ezClose() {
        if ('FULL_SCREEN' === this.ezIntegrationSetupDialogDisplayMode) {
            // Unhook the window resize event
            ezApi.ezclocker.ezEventEngine.ezUnwantElementEvent(
                'window',
                EzElementEventName.RESIZE,
                this.ezDialogId);


            let self = this;
            ezApi.ezclocker.ezUi.ezHideElementAnimated(
                this.ezUxIds.parentIds.ezFullScreenParentId,
                'slideOutRight')
                .then(
                    () => ezApi.ezclocker.ezUi.ezShowElementAnimated(
                        self.ezUxIds.parentIds.ezContentId,
                        'slideInLeft'));
        } else {
            ezApi.ezclocker.ezDialog.ezCloseDialog(this.ezDialogId);
        }

        if (ezApi.ezIsFunction(this.ezCloseCallback)) {
            this.ezCloseCallback();
        }

        this.ezResetDialog();
        ezApi.ezclocker.nav.ezNavigateToEmployerIntegrationsPage()
    }

    /**
        @protected @method
        Assigns the tab ids for each supported mapping.
     */
    ezBuildTabIds() {
        let tabIdPrefix = `${this.ezDialogId}_`;

        let tabIdSuffix = `_Button`;

        let self = this;
        this.ezSupportedMappings.forEach(
            (ezIntegrationMappingViewType) => {
                self.ezTabIds[ezIntegrationMappingViewType] =
                    `${tabIdPrefix}${EzIntegrationMappingViewType.ezToIdSuffix(ezIntegrationMappingViewType)}${tabIdSuffix}`;
            });
    }

    /**
        @protected @method
        Assigns the tab ids for each supported mapping.
     */
    ezBuildTabHelp() {
        let self = this;
        this.ezSupportedMappings.forEach(
            (ezIntegrationMappingViewType) => {
                self.ezTabHelp[ezIntegrationMappingViewType] = {
                    title: '',
                    help: ''
                };
            });
    }

    /**
        @protected @method
        Builds the tab's content view ids
     */
    ezBuildTabViewIds() {
        let tabViewIdPrefix = `${this.ezDialogId}_`;

        let tabViewIdSuffix = `_TabView`;

        let self = this;
        this.ezSupportedMappings.forEach(
            (ezIntegrationMappingViewType) => {
                // Dialog tab view ids
                self.ezViewIds[ezIntegrationMappingViewType] =
                    `${tabViewIdPrefix}${EzIntegrationMappingViewType.ezToIdSuffix(ezIntegrationMappingViewType)}${tabViewIdSuffix}`;
            });
    }

    /**
        @protected @method
        Builds the tab configurations
     */
    ezBuildTabs() {
        let self = this;

        this.ezSupportedMappings.forEach(
            (ezIntegrationMappingViewType) => {
                self.ezTabs[ezIntegrationMappingViewType] = {
                    id: self.ezTabIds[ezIntegrationMappingViewType],
                    tabViewId: self.ezViewIds[ezIntegrationMappingViewType],
                    caption: EzIntegrationMappingViewType.ezToDisplayValue(ezIntegrationMappingViewType),
                    tabGroup: self.ezTabGroupName,
                    visible: true,
                    active: false,
                    ezView: ezApi.ezTemplate`
                        <div
                            id="${self.ezViewIds[ezIntegrationMappingViewType]}"
                            data-tabgroup="${self.ezTabGroupName}"
                            class="ez-tab-view-container"
                            style="display:none">
                        </div>`
                };
            });
    }

    /**
        @protected @method
        Builds the export report dialog's HTML
        @returns {String}
     */
    ezBuildDialogHtml() {
        let tabsHtml = '';

        let tabsViewHtml = '';

        let self = this;
        this.ezSupportedMappings.forEach(
            (ezIntegrationMappingViewType) => {
                if (ezApi.ezHasOwnProperty(self.ezTabs, ezIntegrationMappingViewType)) {
                    let ezTab = self.ezTabs[ezIntegrationMappingViewType];

                    let hideTabStyle = ezApi.ezIsFalse(ezTab.visible)
                        ? 'style="display:none"'
                        : '';

                    tabsHtml += ezApi.ezTemplate`
                        <button
                            id="${ezTab.id}"
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

        let logoUrl = EzIntegrationProviderId.ezToIntegrationLogoUrl(this.ezIntegrationProviderId);

        let logoText = EzIntegrationProviderId.ezToIntegrationLogoText(this.ezIntegrationProviderId);

        return ezApi.ezTemplate`
            <div
                id="${this.ezDialogId}">
                <div
                    id="${this.ezDialogId}_DialogContent"
                    class="ezContainer-alpha-white-silver-border-8 ezAutoRow_A_A">
                    <div
                        id="${this.ezDialogId}_Header"
                        class="ezContainer-integration-setup-header">
                        <div
                            id="${this.ezDialogId}_Toptable"
                            class="ezGridNoGap ezAutoCol_AxA">
                            <div
                                class="ezContainer-integration-logo">
                                <img
                                    src="${logoUrl}"
                                    class="ezContainer-integration-logo-img"/>
                                ${logoText}
                            </div>
                            <div
                                id="${this.ezDialogId}_HeaderEnabledContainer"
                                class="ezGrid-vertical-align-top ezGrid-align-right">
                                <label
                                    for="${this.ezHeaderInputIds.integrationEnableInputId}"
                                    class="ezInputLabel ezBold">
                                    <input
                                        id="${this.ezHeaderInputIds.integrationEnableInputId}"
                                        type="checkbox"/>
                                    ${EzIntegrationHeaderFieldName.ezToDisplayValue(EzIntegrationHeaderFieldName.INTEGRATION_ENABLED)}
                                </label>
                            </div>
                        </div>
                        <div
                            style="height:10px;">
                        </div>
                        <div
                            id="${this.ezUxIds.elementIds.ezErrorMessageContainerId}"
                            class="ez-floating-error-container"
                            style="display:none">
                            <div
                                id="${this.ezUxIds.elementIds.ezErrorMessageId}">
                            </div>
                        </div>
                    </div>
                    <div
                        id="${this.ezDialogId}_SetupContainer"
                        class="ezAutoCol_75xA">
                        <div
                            id="${this.ezDialogId}_TabContainer"
                            class="ezTabContainer">
                            <div
                                id="${this.ezDialogId}_Tabs"
                                class="ezTabsContainer">
                                ${tabsHtml}
                            </div>
                            <div
                                id="${this.ezDialogId}_TabViews"
                                class="ezSubContentView-no-border-no-scroll">
                                ${tabsViewHtml}
                            </div>
                        </div>
                        ${this.ezBuildTabHelpHtml()}
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
            <div
                id="${this.ezDialogId}_HelpContainer"
                class="ezContainer-side-help-box">
                <div
                    class="ezContainer-side-help-box-title">
                    <img
                        src="/public/images/integrations/help-navy.svg"
                        class="ezContainer-side-help-box-img"/>
                    <lable
                        id="${this.ezDialogId}_HelpTitle">
                        Employee Mapping
                    </label>
                </div>
                <div
                    id="${this.ezDialogId}_IntegrationHelp"
                    class="ezContainer-side-help-box-content">
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
            <div
                id="${this.ezUxIds.parentIds.ezFullScreenParentId}"
                class="ezContainer-full-screen-overlay"
                style="display:none">
                <div
                    id="${this.ezUxIds.parentIds.ezFullScreenParentId}_ButtonBar"
                    class="ezContainer-white-right-aligned-button-container">
                    <button
                        id="${this.ezDialogId}_FullScreenOK"
                        class="ezDefaultNormalButton">
                        Save
                    </button>
                    <button
                        id="${this.ezDialogId}_FullScreenCancel"
                        onclick="ezApi.ezclocker.nav.ezNavigateToEmployerIntegrationsPage()"
                        class="ezNormalButton">
                        Cancel
                    </button>
                </div>
            </div>`;
    }

    /**
        @protected
        Builds the views for each tab
     */
    ezBuildTabViews() {
        let self = this;
        this.ezSupportedMappings.forEach(
            (ezIntegrationMappingViewType) => {
                if (ezApi.ezHasOwnProperty(self.ezViewIds, ezIntegrationMappingViewType) &&
                    ezApi.ezHasOwnProperty(self.ezTabs, ezIntegrationMappingViewType)) {
                    switch (ezIntegrationMappingViewType) {
                        case EzIntegrationMappingViewType.EMPLOYEE_MAPPING:
                            self.ezTabs[EzIntegrationMappingViewType.EMPLOYEE_MAPPING].ezView =
                                self.ezBuildEmployeeMappingTabView();
                            break;
                        case EzIntegrationMappingViewType.JOB_MAPPING:
                            self.ezTabs[EzIntegrationMappingViewType.JOB_MAPPING].ezView =
                                self.ezBuildJobMappingTabView();
                            break;
                        case EzIntegrationMappingViewType.PAY_RATE_MAPPING:
                            self.ezTabs[EzIntegrationMappingViewType.PAY_RATE_MAPPING].ezView =
                                self.ezBuildPayRateMappingTabView();
                            break;
                        case EzIntegrationMappingViewType.ADDITIONAL_RESOURCES:
                            self.ezTabs[EzIntegrationMappingViewType.ADDITIONAL_RESOURCES].ezView =
                                self.ezBuildAdditionalResourcesTabView();
                            break;
                        default:
                            ezApi.ezclocker.ezLogger.error(
                                `Integration mapping type ${ezIntegrationMappingViewType} is not currently supported`);
                    }
                }
            });
    }

    ezBuildEmployeeMappingTabView() {
        if (!ezApi.ezHasOwnProperty(this.ezViewIds, EzIntegrationMappingViewType.EMPLOYEE_MAPPING)) {
            return;
        }

        let viewId = this.ezViewIds[EzIntegrationMappingViewType.EMPLOYEE_MAPPING];

        return ezApi.ezTemplate`
            <div
                id="${viewId}"
                data-tabgroup="${this.ezTabGroupName}"
                class="ez-tab-view-container"
                style="display:none">
                <div
                    id="${viewId}_ListDiv"
                    class="ezContainer-integration-input-container">
                    <table
                        id="${viewId}_Table"
                        class="ez-table-full-width">
                        <thead
                            id="${viewId}_TableHeader"
                            class="ez-table-header">
                            <tr
                                id="${viewId}_TableHeaderRow"
                                class="ez-table-row">
                                <th
                                    id="${viewId}_TableHeaderCell_EzEmployeeName"
                                    class="ez-table-cell-header-fixed">
                                    EzClocker Employees
                                </th>
                                <th
                                    id="${viewId}_TableHeaderCell_IntegrationEmployeeFieldMapName"
                                    class="ez-table-cell-header-fixed">
                                    ${this.ezIntegrationEmployeeMapFieldDisplayName}
                                </th>
                            </tr>
                        </thead>
                        <tbody
                            id="${viewId}_TableBody"
                            class="ez-table-body">
                        </tbody>
                    </table>
                </div>
            </div>`;
    }

    ezBuildPayRateMappingTabView() {
        let viewId = this.ezViewIds[EzIntegrationMappingViewType.PAY_RATE_MAPPING];

        return ezApi.ezTemplate`
            <div
                id="${viewId}" data-tabgroup="${this.ezTabGroupName}"
                class="ez-tab-view-container"
                style="display:none">
                <div
                    id="${viewId}_ListDiv" class="ezContainer-integration-input-container">
                    <table
                        id="${viewId}_Table"
                        class="ez-table-full-width">
                        <thead
                            id="${viewId}_TableHeader"
                            class="ez-table-header">
                            <tr
                                id="${viewId}_TableHeaderRow"
                                class="ez-table-row">
                                <th
                                    id="${viewId}_TableHeaderCell_EzPayTypeName"
                                    class="ez-table-cell-header-fixed">
                                    EzClocker Pay Types
                                </th>
                                <th
                                    id="${viewId}_TableHeaderCell_IntegrationPayTypeMapping"
                                    class="ez-table-cell-header-fixed">
                                    ${this.ezIntegrationPayRateMapFieldDisplayName}
                                </th>
                            </tr>
                        </thead>
                        <tbody
                            id="${viewId}_TableBody"
                            class="ez-table-body">
                        </tbody>
                    </table>
                </div>
            </div>`;
    }

    ezBuildJobMappingTabView() {
        let viewId = this.ezViewIds[EzIntegrationMappingViewType.JOB_MAPPING];

        return ezApi.ezTemplate`
            <div
                id="${viewId}" data-tabgroup="${this.ezTabGroupName}"
                class="ez-tab-view-container"
                style="display:none">
                <div
                    id="${viewId}_ListDiv"
                    class="ezContainer-integration-input-container">
                    <table
                        id="${viewId}_Table"
                        class="ez-table-full-width">
                        <thead
                            id="${viewId}_TableHeader"
                            class="ez-table-header">
                            <tr
                                id="${viewId}_TableHeaderRow"
                                class="ez-table-row">
                                <th
                                    id="${viewId}_TableHeaderCell_EzDataTag_TagName"
                                    class="ez-table-cell-header-fixed">
                                    EzClocker Jobs
                                </th>
                                <th
                                    id="${viewId}_TableHeaderCell_IntegrationJobMapping"
                                    class="ez-table-cell-header-fixed">
                                    ${this.ezIntegrationJobMapFieldDisplayName}
                                </th>
                            </tr>
                        </thead>
                        <tbody
                            id="${viewId}_TableBody"
                            class="ez-table-body">
                        </tbody>
                    </table>
                </div>
            </div>`;
    }

    ezBuildAdditionalResourcesTabView() {
        let viewId = this.ezViewIds[EzIntegrationMappingViewType.JOB_MAPPING];

        return ezApi.ezTemplate`
            <div
                id="${viewId}" data-tabgroup="${this.ezTabGroupName}"
                class="ez-tab-view-container"
                style="display:none">
                <div
                    id="${viewId}_ListDiv"
                    class="ezContainer-integration-input-container">
                    <table
                        id="${viewId}_Table"
                        class="ez-table-full-width">
                        <thead
                            id="${viewId}_TableHeader"
                            class="ez-table-header">
                            <tr
                                id="${viewId}_TableHeaderRow"
                                class="ez-table-row">
                                <th
                                    id="${viewId}_TableHeaderCell_EzDataTag_TagName"
                                    class="ez-table-cell-header-fixed">
                                    EzClocker Jobs
                                </th>
                                <th
                                    id="${viewId}_TableHeaderCell_IntegrationJobMapping"
                                    class="ez-table-cell-header-fixed">
                                    ${this.ezIntegrationAdditionalResourcesDisplayName}
                                </th>
                            </tr>
                        </thead>
                        <tbody
                            id="${viewId}_TableBody"
                            class="ez-table-body">
                        </tbody>
                    </table>
                </div>
            </div>`;
    }

    /**
        @protected @method
        Shows the provided message in the error message box.
        @param {string} msg
     */
    ezShowErrorMessage(msg) {
        ezApi.ezclocker.ezUi.ezContent(this.ezUxIds.elementIds.ezErrorMessageId, msg);
        ezApi.ezclocker.ezUi.ezShowElement(this.elementIds.ezErrorMessageContainerId);
    }

    /**
        @protected @method
        Hides the error message box
     */
    ezHideErrorMessage() {
        ezApi.ezclocker.ezUi.ezHideElement(this.ezUxIds.elementIds.ezErrorMessageContainerId);
        ezApi.ezclocker.ezUi.ezContent(this.ezUxIds.elementIds.ezErrorMessageId, '');
    }

    /**
        @protected
        Removes the normal styles and applies the validation error styles to the provided tabId
        @param {EzIntegrationMappingViewType} ezIntegrationMappingViewType
     */
    ezApplyErrorTab(ezIntegrationMappingViewType) {
        if (!ezApi.ezStringHasLength(ezIntegrationMappingViewType) ||
            !ezApi.ezHasOwnProperty(this.ezTabIds, ezIntegrationMappingViewType)) {
            return;
        }

        let tabId = this.ezTabIds[ezIntegrationMappingViewType];

        ezApi.ezclocker.ezUi.ezSetElementDataAttributeValue(tabId, 'ezValidationError', 'true');

        if (ezIntegrationMappingViewType === this.ezActiveIntegrationMappingViewType) {
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
        @protected
        Removes validation error styles and applies the normal styles to the provided tabId
        @param {EzIntegrationMappingViewType} ezIntegrationMappingViewType
     */
    ezApplyNormalTab(ezIntegrationMappingViewType) {
        if (!ezApi.ezStringHasLength(ezIntegrationMappingViewType) ||
            !ezApi.ezHasOwnProperty(this.ezTabIds, ezIntegrationMappingViewType)) {
            return;
        }

        let tabId = this.ezTabIds[ezIntegrationMappingViewType];

        ezApi.ezclocker.ezUi.ezSetElementDataAttributeValue(
            tabId,
            'ezValidationError',
            'false');

        if (ezIntegrationMappingViewType === this.ezActiveIntegrationMappingViewType) {
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
        Shows the validation error box
        @param {String} em
        @param {String|Null} inputId
        @param {String|Null} tabId
    */
    ezShowValidationError(em, inputId, ezIntegrationMappingViewType) {
        if (ezApi.ezStringHasLength(inputId) && ezApi.ezclocker.ezUi.ezElementExists(inputId)) {
            ezApi.ezclocker.ezUi.ezAddElementClass(
                inputId,
                this.ezUxIds.classNames.ezInputValidationErrorClass);
        }

        if (ezApi.ezStringHasLength(ezIntegrationMappingViewType)) {
            this.ezApplyErrorTab(ezIntegrationMappingViewType);
        }

        if (ezApi.ezStringHasLength(em)) {
            this.ezShowErrorMessage(em);
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
                this.ezUxIds.classNames.ezInputValidationErrorClass);
        }

        if (ezApi.ezStringHasLength(ezIntegrationMappingViewType)) {
            this.ezApplyNormalTab(ezIntegrationMappingViewType);
        }

        if (ezApi.ezclocker.ezUi.ezIsElementVisible(this.ezUxIds.elementIds.ezErrorMessageContainerId)) {
            this.ezHideErrorMessage();
        }
    }

    /**
        @protected
        Builds the supported mapping views UX
     */
    ezBuildSupportedMappingViews() {
        let self = this;
        this.ezSupportedMappings.forEach(
            (ezIntegrationMappingViewType) => {
                switch (ezIntegrationMappingViewType) {
                    case EzIntegrationMappingViewType.EMPLOYEE_MAPPING:
                        ezApi.ezclocker.ezUi.ezAppendContent(
                            `${self.ezViewIds[ezIntegrationMappingViewType]}_TableBody`,
                            self.ezBuildEmployeeMappingList());
                        break;
                    case EzIntegrationMappingViewType.PAY_RATE_MAPPING:
                        ezApi.ezclocker.ezUi.ezAppendContent(
                            `${self.ezViewIds[ezIntegrationMappingViewType]}_TableBody`,
                            self.ezBuildPayRateMappingList());
                        break;
                    case EzIntegrationMappingViewType.HOURS_TYPE_MAPPING:
                        ezApi.ezclocker.ezUi.ezAppendContent(
                            `${self.ezViewIds[ezIntegrationMappingViewType]}_TableBody`,
                            self.ezBuildPayRateMappingList());
                        break;
                    case EzIntegrationMappingViewType.JOB_MAPPING:
                        ezApi.ezclocker.ezUi.ezAppendContent(
                            `${self.ezViewIds[ezIntegrationMappingViewType]}_TableBody`,
                            self.ezBuildJobMappingsList());
                        break;
                    default:
                        ezApi.ezclocker.ezLogger.error(`Mapping view ${ezIntegrationMappingViewType} is not supported yet.`);
                }
            });
    }

    /**
        @protected @method
        Returns a new EzIntegrationSetupResponse instance for the integration
        @returns {object}
     */
    ezCreateNewIntegrationResponse() {
        return new EzIntegrationSetupResponse();
    }

    /**
        @protected
        Builds the employee mapping html
        @returns {String}
     */
    ezBuildEmployeeMappingList() {
        let viewId = this.ezViewIds[EzIntegrationMappingViewType.EMPLOYEE_MAPPING];

        ezApi.ezclocker.ezUi.ezClearContent(`${viewId}_TableBody`);

        let employees = ezApi.ezclocker.ezClockerContext.ezGetSelectedEmployerAccountEmployeeAccounts();

        if (!ezApi.ezArrayHasLength(employees)) {
            return ezApi.ezTemplate`
                <tr
                    id="${viewId}_TableBodyMappingRow_NoEmployees" class="ez-table-row">
                    <td
                        id="${viewId}_TableBodyMappingCell_NoEmployees"
                        class="ez-table-cell"
                        colspan="2">
                        No Employees available
                    </td>
                </tr>`;
        }

        let ezIntegrationResponse = ezApi.ezIsValid(this.ezIntegrationResponse)
            ? this.ezIntegrationResponse
            : this.ezCreateNewIntegrationResponse();

        let employeeListHtml = '';

        this.ezDuplicateEmployeeMapIdDetected = false;

        let mappingErrors = [];

        let self = this;
        employees.forEach(
            (employee) => {
                let employeeMappingInputId =
                    ezApi.ezIdTemplate`${self.ezDialogId}_IntegrationEmployeeMappingInput_${employee.id}`;

                let ezEmployeeIntegrationMapRequest =
                    ezIntegrationResponse.ezGetEmployeeMappingForEmployeeId(employee.id);

                if (ezApi.ezIsValid(ezEmployeeIntegrationMapRequest)) {
                    let providerEmployeeName =
                        ezApi.ezStringOrEmpty(ezEmployeeIntegrationMapRequest.providerEmployeeName);

                    employeeListHtml += self.ezBuildEmployeeMappingRow(
                        viewId,
                        employee,
                        providerEmployeeName,
                        employeeMappingInputId,
                        ezEmployeeIntegrationMapRequest);
                } else {
                    employeeListHtml += self.ezBuildEmployeeMappingRow(
                        viewId,
                        employee,
                        '',
                        employeeMappingInputId,
                        null);
                }
            });

        if (ezApi.ezArrayHasLength(mappingErrors)) {
            mappingErrors.forEach(
                (mappingError) => {
                    self.ezShowValidationError(
                        mappingError.em,
                        mappingError.inputId,
                        mappingError.tabId);
                });
        }

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
    ezBuildEmployeeMappingRow(viewId, employee, providerEmployeeMappingValue, employeeMappingInputId, ezEmployeeIntegrationMapRequest) {
        if (!ezApi.ezStringHasLength(viewId)) {
            throw new EzBadParamException(
                'viewId',
                this,
                this.ezBuildEmployeeMappingRow);
        }
        if (!ezApi.ezIsValid(employee)) {
            throw new EzBadParamException(
                'ezIntegrationMappingViewType',
                this,
                this.ezBuildEmployeeMappingRow);
        }
        if (!ezApi.ezIsNumber(employee.id)) {
            throw new EzBadParamException(
                'employee.id',
                this,
                this.ezBuildEmployeeMappingRow);
        }
        if (!ezApi.ezStringHasLength(employee.employeeName)) {
            throw new EzBadParamException(
                'employee.employeeName',
                this,
                this.ezBuildEmployeeMappingRow);
        }

        let employeeIdStr = employee.id.toString();

        let mappingJson = '';

        if (ezApi.ezIsValid(ezEmployeeIntegrationMapRequest)) {
            mappingJson = ezApi.ezToJson(ezEmployeeIntegrationMapRequest);
        }

        let rowId = ezApi.ezIdTemplate`${viewId}_TableBody_Mapping`;

        return ezApi.ezTemplate`
            <tr
                id="${rowId}Row_EzEmployee_${employeeIdStr}"
                data-ezid="${employeeIdStr}"
                class="ez-table-row">
                <td
                    id="${rowId}Cell_EzEmployee_${employeeIdStr}_EmployeeName"
                    data-ezid="${employeeIdStr}"
                    class="ez-table-cell ez-cell-align-middle-left">
                    ${employee.employeeName}
                </td>
                <td
                    id="${rowId}Cell_EzEmployee_${employeeIdStr}_IntegrationEmployeeMap"
                    class="ez-table-cell ez-cell-align-middle-center"
                    data-ezid="${employeeIdStr}">
                    <input
                        id="${employeeMappingInputId}"
                        data-ezid="${employeeIdStr}"
                        data-mapping-json="${mappingJson}"
                        type="text"
                        class="ezDialogEditor"
                        name="${employeeMappingInputId}"
                        autocomplete="${employeeMappingInputId}"
                        placeholder="enter ${this.ezIntegrationEmployeeMapFieldDisplayName}"
                        value="${providerEmployeeMappingValue}"/>
                </td>
            </tr>`;
    }

    /**
        @protected
        Builds the Pay Rate mapping html
        @returns {String}
    */
    ezBuildPayRateMappingList() {
        let viewId = this.ezViewIds[EzIntegrationMappingViewType.PAY_RATE_MAPPING];

        ezApi.ezclocker.ezUi.ezClearContent(`${viewId}_TableBody`);

        let ezIntegrationResponse = ezApi.ezIsValid(this.ezIntegrationResponse)
            ? this.ezIntegrationResponse
            : this.ezCreateNewIntegrationResponse();

        let payRateListHtml = '';

        let self = this;
        this.ezSupportedEzClockerPayRateTypes.forEach(
            (payRateType) => {
                let payRateIntegrationMapRequest =
                    ezIntegrationResponse.ezGetPayRateIntegrationMapRequestForPayRateType(payRateType);

                if (ezApi.ezIsValid(payRateIntegrationMapRequest) &&
                    ezApi.ezStringHasLength(payRateIntegrationMapRequest.ezClockerPayRateType) &&
                    payRateType === payRateIntegrationMapRequest.ezClockerPayRateType) {
                    payRateListHtml += self.ezBuildPayRateRow(viewId, payRateType, payRateIntegrationMapRequest);
                } else {
                    payRateListHtml += self.ezBuildPayRateRow(viewId, payRateType, null);
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
                this,
                this.ezBuildPayRateRow);
        }
        if (!ezApi.ezIsValid(ezClockerPayRateType)) {
            throw new EzBadParamException(
                'ezClockerPayRateType',
                this,
                this.ezBuildPayRateRow);
        }

        let mappingJson = '';

        let integrationPayRateCode = '';

        if (ezApi.ezIsValid(payRateIntegrationMapRequest)) {
            mappingJson = EzJson.toJson(payRateIntegrationMapRequest);

            integrationPayRateCode = ezApi.ezStringOrEmpty(payRateIntegrationMapRequest.integrationPayRateCode);
        }

        let value = ezApi.ezStringHasLength(integrationPayRateCode)
            ? `value="${integrationPayRateCode}"`
            : '';

        let rowId = `${viewId}_TableBody_Mapping`;

        let inputId = `${this.ezDialogId}_PayRateMappingInput_${ezClockerPayRateType}`;

        return EzHtml.build`
            <tr
                id="${rowId}Row_EzPayRateType_${ezClockerPayRateType}"
                data-ezid="${ezClockerPayRateType}"
                class="ez-table-row">
                <td
                    id="${rowId}Cell_EzPayRateTypeDisplay_${ezClockerPayRateType}"
                    data-ezid="${ezClockerPayRateType}"
                    class="ez-table-cell ez-cell-align-middle-left">
                    ${EzClockerPayRateType.ezToDisplayValue(ezClockerPayRateType)}
                </td>
                <td
                    id="${rowId}Cell_PayRateMapping_${ezClockerPayRateType}"
                    data-ezid="${ezClockerPayRateType}"
                    class="ez-table-cell ez-cell-align-middle-center">
                    <input
                        id="${inputId}"
                        data-ezid="${ezClockerPayRateType}"
                        data-mappingJson='${mappingJson}'
                        type="text"
                        class="ezDialogEditor"
                        name="${inputId}"
                        autocomplete="${inputId}"
                        placeholder="enter ${this.ezIntegrationPayRateMapFieldDisplayName}"
                        ${value}/>
                </td>
            </tr>`;
    }

    /**
        @protected
        Builds the Job Mappings List HTML
        @returns {String}
     */
    ezBuildJobMappingsList() {
        let viewId = this.ezViewIds[EzIntegrationMappingViewType.JOB_MAPPING];

        ezApi.ezclocker.ezUi.ezClearContent(`${viewId}_TableBody`);

        if (!ezApi.ezIsValid(this.ezJobCodesById)) {
            return ezApi.ezTemplate`
                <tr
                    id="${viewId}_TableBody_MappingRow_NowJobs"
                    class="ez-table-row">
                    <td
                        id="${viewId}_TableBody_MappingCell_NoJobs"
                        class="ez-table-cell"
                        colspan="2">
                        No jobs available
                    </td>
                </tr>`;
        }

        let ezIntegrationResponse = ezApi.ezIsValid(this.ezIntegrationResponse)
            ? this.ezIntegrationResponse
            : this.ezCreateNewIntegrationResponse();

        let jobsMappingHtml = '';

        for (let jobCode of this.ezJobCodes) {
            let dataTagIntegrationMapRequest = ezIntegrationResponse.ezGetDataTagMappingForDataTagId(jobCode.id);

            jobsMappingHtml += ezApi.ezIsValid(dataTagIntegrationMapRequest) &&
                ezApi.ezIsNumber(dataTagIntegrationMapRequest.id) &&
                ezApi.ezStringHasLength(dataTagIntegrationMapRequest.integrationDataTagId)
                ? this.ezBuildJobMappingRow(viewId, jobCode, dataTagIntegrationMapRequest)
                : this.ezBuildJobMappingRow(viewId, jobCode, null);
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
                this,
                this.ezBuildJobMappingRow);
        }
        if (!ezApi.ezIsValid(dataTag)) {
            throw new EzBadParamException(
                'dataTag',
                this,
                this.ezBuildJobMappingRow);
        }
        if (!ezApi.ezIsNumber(dataTag.id)) {
            throw new EzBadParamException(
                'dataTag.id',
                this,
                this.ezBuildJobMappingRow);
        }
        if (!ezApi.ezStringHasLength(dataTag.tagName)) {
            throw new EzBadParamException(
                'dataTag.tagNam',
                self,
                self.ezBuildJobMappingRow);
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

        let inputId = `${this.ezDialogId}_DataTagMappingInput_${dataTagIdStr}`;

        return ezApi.ezTemplate`
            <tr
                id="${rowId}_Row_DataTag_${dataTagIdStr}"
                data-ezid="${dataTagIdStr}"
                class="ez-table-row">
                <td
                    id="${rowId}Cell_DataTag_${dataTagIdStr}_TagName"
                    data-ezid="${dataTagIdStr}"
                    class="ez-table-cell ez-cell-align-middle-left">
                    ${dataTag.tagName}
                </td>
                <td
                    id="${rowId}Cell_DataTag_${dataTagIdStr}_IntegrationDataTagMap"
                    data-ezid="${dataTagIdStr}"
                    class="ez-table-cell ez-cell-align-middle-center">
                    <input
                        id="${inputId}"
                        data-ezid="${dataTagIdStr}"
                        data-mapping-json="${mappingJson}"
                        type="text"
                        class="ezDialogEditor"
                        name="${inputId}"
                        autocomplete="${inputId}"
                        placeholder="enter ${this.ezIntegrationJobMapFieldDisplayName}"
                        ${value}/>
                </td>
            </tr>`;
    }

    /**
        @protected
        Applies all the supported mappings to the setup request.
        @param {EzPayChexIntegrationSetupRequest} integrationSetupRequest
     */
    ezApplySupportedMappingsToRequest(integrationSetupRequest) {
        if (!ezApi.ezIsValid(integrationSetupRequest)) {
            throw new EzBadParamException(
                'integrationSetupRequest',
                this,
                this.ezApplySupportedMappingsToRequest);
        }

        if (-1 != this.ezSupportedMappings.indexOf(EzIntegrationMappingViewType.EMPLOYEE_MAPPING)) {
            this.ezApplyEmployeeMappings(integrationSetupRequest);
        }
        if (-1 != this.ezSupportedMappings.indexOf(EzIntegrationMappingViewType.PAY_RATE_MAPPING)) {
            this.ezApplyPayTypeMappings(integrationSetupRequest);
        }
        if (-1 != this.ezSupportedMappings.indexOf(EzIntegrationMappingViewType.JOB_MAPPING)) {
            this.ezApplyJobMappings(integrationSetupRequest);
        }
        if (-1 != this.ezSupportedMappings.indexOf(EzIntegrationMappingViewType.ADDITIONAL_RESOURCES)) {
            this.ezApplyAdditionalResourcesMappings(integrationSetupRequest);
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
                this,
                this.ezApplyPayTypeMappings);
        }

        let self = this;
        this.ezSupportedEzClockerPayRateTypes.forEach(
            (ezClockerPayRateType) => {
                let inputId = `${self.ezDialogId}_PayRateMappingInput_${ezClockerPayRateType}`;

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
                            default:
                                ezIntegrationPayRateType = '';
                        }
                    }

                    if (ezApi.ezStringHasLength(ezIntegrationPayRateType)) {
                        let payRateIntegrationMapRequest = self.ezGetCurrentMapInstance(inputId);

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
        Adds the job mappings to the provided integrationSetupRequest
        @param {object} integrationSetupRequest
     */
    ezApplyJobMappings(integrationSetupRequest) {
        if (!ezApi.ezIsValid(integrationSetupRequest)) {
            throw new EzBadParamException(
                'integrationSetupRequest',
                this,
                this.ezApplyJobMappings);
        }

        let self = this;
        for (let prop in self.ezJobCodesById) {
            let jobCode = self.ezJobCodesById[prop];

            let inputId = `${self.ezDialogId}_DataTagMappingInput_${jobCode.id.toString()}`;

            if (ezApi.ezclocker.ezUi.ezElementExists(inputId)) {
                let ezIntegrationDataTag = ezApi.ezclocker.ezUi.ezGetInputValue(inputId).trim();

                if (ezApi.ezStringHasLength(ezIntegrationDataTag)) {
                    let dataTagIntegrationMapRequest = self.ezGetCurrentMapInstance(inputId);

                    if (ezApi.ezIsNotValid(dataTagIntegrationMapRequest)) {
                        dataTagIntegrationMapRequest = new DataTagIntegrationMapRequest();
                    }

                    dataTagIntegrationMapRequest.ezIntegrationproviderId = '';
                    dataTagIntegrationMapRequest.ezUserId = ezApi.ezclocker.ezClockerContext.ezGetUserContext().userAccount.id;
                    dataTagIntegrationMapRequest.ezEmployerId = ezApi.ezclocker.ezClockerContext.ezGetSelectedEmployerAccount().id;
                    dataTagIntegrationMapRequest.ezIntegrationProviderId = EzIntegrationProviderId.PAYCHEX;
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
       Adds the employee mappings to the provided integrationSetupRequest
       @param {object} integrationSetupRequest
    */
    ezApplyEmployeeMappings(integrationSetupRequest) {
        if (!ezApi.ezIsValid(integrationSetupRequest)) {
            throw new EzBadParamException(
                'integrationSetupRequest',
                this,
                this.ezApplyEmployeeMappings);
        }

        let employees = ezApi.ezclocker.ezClockerContext.ezGetSelectedEmployerAccountEmployeeAccounts();

        if (!ezApi.ezArrayHasLength(employees)) {
            // No employees to map
            return;
        }

        let mapIds = [];

        this.ezDuplicateEmployeeMapIdDetected = false;

        let self = this;
        employees.forEach(
            (employee) => {
                let employeeIdStr = employee.id.toString();

                let employeeMappingInputId = `${self.ezDialogId}_IntegrationEmployeeMappingInput_${employeeIdStr}`;

                if (ezApi.ezElementExists(employeeMappingInputId)) {
                    let providerEmployeeName = ezApi.ezclocker.ezUi.ezGetInputValue(employeeMappingInputId).trim();

                    ezApi.ezclocker.ezUi.ezRemoveElementClass(employeeMappingInputId, 'ez-input-validation-error');

                    if (ezApi.ezStringHasLength(providerEmployeeName)) {
                        if (0 <= mapIds.indexOf(providerEmployeeName.toLowerCase())) {
                            self.ezDuplicateEmployeeMapIdDetected = true;
                            self.ezShowValidationError(
                                ezApi.ezEM`
                                    One or more duplicate ${self.ezIntegrationEmployeeMapFieldDisplayName}s detected.
                                    All employee maps must have unique ${self.ezIntegrationEmployeeMapFieldDisplayName}s`,
                                employeeMappingInputId,
                                EzIntegrationMappingViewType.EMPLOYEE_MAPPING);
                        } else {
                            mapIds.push(providerEmployeeName.toLowerCase());
                        }

                        let ezEmployeeIntegrationMapRequest = self.ezGetCurrentMapInstance(employeeMappingInputId);

                        if (!ezApi.ezIsValid(ezEmployeeIntegrationMapRequest)) {
                            ezEmployeeIntegrationMapRequest = new EzEmployeeIntegrationMapRequest();
                        }

                        ezEmployeeIntegrationMapRequest.ezEmployerId = employee.employerId;
                        ezEmployeeIntegrationMapRequest.ezEmployeeId = employee.id;
                        ezEmployeeIntegrationMapRequest.ezEmployerIntegrationMapId = '';
                        ezEmployeeIntegrationMapRequest.ezIntegrationProviderId = EzIntegrationProviderId.PAYCHEX;
                        ezEmployeeIntegrationMapRequest.mappedByUserId =
                            ezApi.ezclocker.ezClockerContext.ezGetUserContext().userAccount.id;

                        ezEmployeeIntegrationMapRequest.providerConnectionId = ezUi.ezGetInputValue(employeeMappingInputId);
                        ezEmployeeIntegrationMapRequest.providerEmployeeId = ezUi.ezGetInputValue(employeeMappingInputId);
                        ezEmployeeIntegrationMapRequest.providerEmployeeName = ezUi.ezGetInputValue(employeeMappingInputId);
                        ezEmployeeIntegrationMapRequest.integrationEmployeeFirstName = '';
                        ezEmployeeIntegrationMapRequest.integrationEmployeeLastName = '';

                        integrationSetupRequest.ezAddEzEmployeeIntegrationMapRequest(ezEmployeeIntegrationMapRequest);
                    }
                }
            });
    }

    /**
        @protected @method
        Applies the additional resource mappings to the integrationSetupRequest provided.
        @param {object} integrationSetupRequest
     */
    ezApplyAdditionalResourceMappings(integrationSetupRequest) {
        if (!ezApi.ezIsValid(integrationSetupRequest)) {
            throw new EzBadParamException(
                'integrationSetupRequest',
                this,
                this.ezApplyAdditionalResourceMappings);
        }

        integrationSetupRequest.additionalResourceMapRequest = [];
    }

    /**
        @protected
        Determines if the configuration data is valid and all required data is available.
        @param {EzPaycomIntegrationSetupRequest} integrationSetupRequest
        @returns {Boolean}
     */
    ezValidateConfiguration(integrationSetupRequest) {
        if (!ezApi.ezIsValid(integrationSetupRequest)) {
            throw new EzBadParamException(
                'integrationSetupRequest',
                this,
                this.ezValidateConfiguration);
        }

        return true;
    }

    /**
        @protected @method
        Creates a new integration setup request entity for the integration.
        @param {boolean} enabled
        @returns {object}
     */
    ezCreateIntegrationSetupRequest(enabled) {
        return new EzIntegrationSetupRequest(enabled);
    }

    /**
        @protected @method
        Persists the integration mappings
        @returns {Promise}
        Resolve returns the post integration setup api response
        Reject returns a failure response if validation files OR
        the post integration setup api response upon failure
     */
    ezPersistIntegrationMappings(integrationSetupRequest) {
        if (!ezApi.ezIsValid(integrationSetupRequest)) {
            throw new EzBadParamException(
                'integrationSetupRequest',
                this,
                this.ezPersistIntegrationMappings);
        }

        this.ezApplySupportedMappingsToRequest(integrationSetupRequest);

        if (ezApi.ezIsFalse(this.ezValidateConfiguration(integrationSetupRequest))) {
            return ezApi.ezResolve({
                errorCode: 400,
                message: 'Validation failed'
            });
        }

        let self = this;
        return ezApi.ezPromise(
            (resolve, reject) => ezApi.ezclocker.ezUi.ezPageWaitExecute(
                `Saving ${self.ezIntegrationName} integration configuration ...`,
                (waitDone) => self.ezController.ezSaveIntegrationSetup(
                    self.ezIntegrationProviderId,
                    integrationSetupRequest)
                    .then(
                        (response) => waitDone()
                            .then(
                                () => ezApi.ezIsTrue(integrationSetupRequest.ezEnableIntegration) && ezApi.ezIsTrue(integrationSetupRequest.ezIsFirstTime)
                                    ? ezApi.ezclocker.ezDialog.ezShowMessage(
                                        self.ezDialogTitle,
                                        `You have successfully setup your ${self.ezIntegrationName} integration!`)
                                        .then(() => resolve(response))
                                    : resolve(response)),
                        (eResponse, jqXHR) => waitDone()
                            .then(
                                () => {
                                    ezApi.ezclocker.ezLogger.error(
                                        `Failed ${self.ezIntegrationName} Integration. Error: ${ezApi.ezToJson(eResponse)}`);

                                    ezApi.ezclocker.ezDialog.ezShowPossibleDefectError(
                                        `${self.ezIntegrationName} Integration Setup Error`,
                                        'Unable to save your Paycom integration configuration at this time.',
                                        jqXHR,
                                        eResponse,
                                        {
                                            url: ezApi.ezclocker.ezNavigation.ezGetInternalApiUrl(
                                                `integrations/${self.ezIntegrationProviderId}/paycom-integration`),
                                            payload: ezApi.ezToJson(integrationSetupRequest)
                                        })
                                        .then(() => reject(eResponse));
                                }))));
    }
}
