import {
    EzException,
    EzBadParamException
} from '/ezlibrary/exceptions/EzExceptions.js';

import {
    EzString,
    EzFunction,
    EzPromise,
    EzJson,
    EzHtml
} from '/ezlibrary/helpers/EzHelpers.js';

import {
    EzElementEventName,
    EzIntegrationProviderId,
    EzIntegrationSetupDialogDisplayMode
} from '/ezlibrary/enums/EzEnumerations.js';

import { EzUxIdsProperty } from '/ezlibrary/EzUxIdsProperty.js';

import { EzClockerPayRateType } from '/secure/integrations/EzClockerPayRateType.js';

import { EzIntegrationMappingViewType } from '/secure/integrations/EzIntegrationSetupDialog/EzIntegrationMappingViewType.js';
import { EzIntegrationHeaderFieldName } from '/secure/integrations/EzIntegrationSetupDialog/EzIntegrationHeaderFieldName.js';

import { EzDialogConfig } from '/ezlibrary/ux/dialogs/EzDialogConfig.js';

import '/public/javascript/common/ezui.js';

/**
 * @class
 * @description
 * Generic integration setup dialog.
 */
export class EzIntegrationSetupDialog {
    /**
     * @public
     * Creates a new instance of EzIntegrationSetupDialog
     * @param {EzIntegrationProviderId|String} ezIntegrationProviderId
     * @param {Object} controllerRef
     */
    constructor(ezIntegrationProviderId, controllerRef) {
        if (!ezIntegrationProviderId) {
            throw new EzBadParamException(
                'ezIntegrationProviderId',
                this,
                this.constructor);
        }
        if (!controllerRef) {
            throw new EzBadParamException(
                'controllerRef',
                this.ezTypeName,
                this.constructor);
        }

        this.ezIntegrationProviderId = ezIntegrationProviderId;

        this.ezDialogId = `Ez${this.ezIntegrationCodeId}IntegrationSetupDialog`;

        this.ezIntegrationName = EzIntegrationProviderId.ezToDisplayValue(this.ezIntegrationProviderId);

        this.ezIntegrationCodeId = EzIntegrationProviderId.ezToCodeId(this.ezIntegrationProviderId);

        this.ezController = controllerRef;

        // UX Ids and class name constants (except for tabIds, these are in a different property)
        this.ezUxIds = new EzUxIdsProperty(this.ezDialogId);
    }

    /**
     * @public @field
     * @type {object}
     */
    ezUxIds = {};

    /**
     * @public @field
     * @type {string}
     */
    ezDialogId;

    /**
     * @public @field
     * @type {object}
     */
    ezHeaderInputIds = {
        ezIntegrationEnableInputId:
            `${this.ezIntegrationProviderId}_${EzIntegrationHeaderFieldName.ezToInputId(EzIntegrationHeaderFieldName.INTEGRATION_ENABLED)}`
    };

    /**
     * @public @field
     * @type {string}
     */
    ezIntegrationProviderId;

    /**
     * @public @field
     * @type {object}
     */
    ezController;

    /**
     * @public @field
     * @type {string}
     */
    ezIntegrationName;

    /**
     * @public @field
     * @type {string}
     */
    ezIntegrationCodeId;

    /**
     * @public @field
     * @type {array}
     */
    ezSupportedMappings = [
        EzIntegrationMappingViewType.EMPLOYEE_MAPPING,
        EzIntegrationMappingViewType.PAY_RATE_MAPPING,
        EzIntegrationMappingViewType.HOURS_TYPE_MAPPING,
        EzIntegrationMappingViewType.JOB_MAPPING,
        EzIntegrationMappingViewType.ADDITIONAL_RESOURCES
    ];

    /**
     * @public @field
     * @type {array}
     */
    ezSupportedEzClockerPayRateTypes = [
        EzClockerPayRateType.REGULAR,
        EzClockerPayRateType.OVERTIME
    ];

    /**
     * @public @field
     * @type {array}
     */
    ezUnsupportedEzClockerPayRateTypes = [
        EzClockerPayRateType.UNKNOWN,
        EzClockerPayRateType.REGULAR,
        EzClockerPayRateType.OVERTIME,
        EzClockerPayRateType.PTO,
        EzClockerPayRateType.HOLIDAY,
        EzClockerPayRateType.SICK,
        EzClockerPayRateType.UNPAID
    ];

    /**
     * @public @field
     * @type {string}
     */
    ezIntegrationSetupDialogDisplayMode = EzIntegrationSetupDialogDisplayMode.DIALOG

    /**
     * @public @field
     * @type {string}
     */
    ezActiveIntegrationMappingViewType = EzIntegrationMappingViewType.UNKNOWN

    /**
     * @public @field
     * @type {object}
     */
    ezJobCodesById = {};

    /**
     * @public @field
     * @type {array}
     */
    ezJobCodes = [];

    /**
     * @public @field
     * @type {object}
     */
    ezIntegrationResponse = null;

    /**
     * @public @field
     * @type {function}
     */
    ezCloseCallback = null;

    /**
     * @public @field
     * @type {boolean}
     */
    ezDuplicateEmployeeMapIdDetected = false;

    /**
     * @public @field
     * @type {object}
     */
    ezTabIds = {};

    /**
     * @public @field
     * @type {object}
     */
    ezViewIds = {};

    /**
     * @public @field
     * @type {object}
     */
    ezTabs = {};

    /**
     * @public @property @getter
     * @returns {object}
     * @deprecated
     * Migrate to using ezUxIds property instead
     */
    get ezUxIdsProperty() {
        return this.ezUxIds;
    }

    /**
     * @public @property @setter
     * @param {object} ezUxIdsProperty
     * @deprecated
     * Migrate to using ezUxIds property instead
     */
    set ezUxIdsProperty(ezUxIdsProperty) {
        this.ezUxIds = ezUxIdsProperty;
    }

    /**
     * @public @readonly @property
     * @returns {string}
     */
    get ezDialogTitle() {
        return `ezClocker ${this.ezIntegrationName} Setup`;
    }

    /**
     * @public @readonly @property
     * @returns {string}
     */
    get ezTabGroupName() {
        return `${this.ezIntegrationCodeId}_TabGroup`;
    }

    /**
     * @public @readonly @property
     * @returns {string}
     */
    get ezIntegrationEmployeeMapFieldDisplayName() {
        return 'Employee Id'
    }

    /**
     * @public @readonly @property
     * @returns {string}
     */
    get ezIntegrationPayRateMapFieldDisplayName() {
        return 'Pay Rate Id'
    }

    /**
     * @public @readonly @property
     * @returns {string}
     */
    get ezIntegrationJobMapFieldDisplayName() {
        return 'Job Code';
    }

    // Legacy properties for Ux ids (use ezUxIds reference going forward)
    /**
     * @public @readonly @property
     * @returns {string}
     */
    get ezDialogWrapperParentId() {
        return this.ezUxIds.ezFullScreenParentId;
    }

    /**
     * @public @readonly @property
     * @returns {string}
     */
    get ezContentParentId() {
        return this.ezUxIds.parentIds.ezContentParentId;
    }

    /**
     * @public @readonly @property
     * @returns {string}
     */
    get ezFullScreenParentId() {
        return this.ezUxIds.parentIds.ezFullScreenParentId;
    }

    /**
     * @public @readonly @property
     * @returns {string}
     */
    get ezFullScreenContentId() {
        return this.ezUxIds.parentIds.ezFullScreenContentId;
    }

    /**
     * @public @readonly @property
     * @returns {string}
     */
    get ezFullScreenOkButtonId() {
        return this.ezUxIds.parentIds.ezFullScreenOkButtonId;
    }

    /**
     * @public @readonly @property
     * @returns {string}
     */
    get ezFullScreenCancelButtonId() {
        return this.ezUxIds.parentIds.ezFullScreenCancelButtonId;
    }

    /**
     * @public @readonly @property
     * @returns {string}
     */
    get ezDialogParentContainerId() {
        return this.ezUxIds.parentIds.ezDialogParentContainerId;
    }

    /**
     * @public @readonly @property
     * @returns {string}
     */
    get ezContentId() {
        return this.ezUxIds.parentIds.ezContentId;
    }

    /**
     * @protected @method
     * Initializes EzIntegrationSetupDialog
     * @returns {EzIntegrationSetupDialog}
     */
    ezInit() {
        this.ezInitUxIds();
        this.ezInitUX();
        return this;
    }

    /**
     * @protected @method
     * Initializes the ezUxIds property for the class instance
     */
    ezInitUxIds() {
        this.ezUxIds.parentIds['ezDialogParentContainerId'] = '_HideDialogsDiv';
        this.ezUxIds.parentIds['ezDialogWrapperParentId'] = `${this.ezDialogId}_DialogWrapper`;
        this.ezUxIds.parentIds['ezContentParentId'] = 'EzDialogPageBody';
        this.ezUxIds.parentIds['ezContentId'] = '_AccountPage';
        this.ezUxIds.parentIds['ezFullScreenParentId'] = `${this.ezDialogId}_NonDialogContainer`;
        this.ezUxIds.parentIds['ezFullScreenContentId'] = `${this.ezDialogId}_NonDialogContainer_Content`;
        this.ezUxIds.parentIds['ezFullScreenOkButtonId'] = `${this.ezDialogId}_NonDialogContainer_OK`;
        this.ezUxIds.parentIds['ezFullScreenCancelButtonId'] = `${this.ezDialogId}_NonDialogContainer_Cancel`;
        this.ezUxIds.classNames = {
            ezInputValidationErrorClass: 'ez-input-validation-error'
        };

        if (!this.ezUxIds) {
            throw new EzException(
                ezApi.ezEM`
                    Initialization of EzIntegrationSetupDialog property ezUxIds failed or did not result in a valid object.
                    Please check classes extended from EzIntegrationSetupDialog and if the ezInitUxIds() method is
                    overriden. Result from the method should return a valid object with the following root properties:
                    ${EzJson.toJson(new EzUxIdsProperty(this.ezIntegrationProviderId))}`);
        }
    }

    /**
     * @protected @method
     * Initializes the dialog's UX
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

        let self = this;

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
    }

    /**
     * @protected @method
     * Initializes the dialog component/widget
     */
    ezInitDialog() {
        let ezDialogOptions = new EzDialogConfig(this.ezDialogId);

        ezDialogOptions.title = EzHtml.build`
            ${EzIntegrationProviderId.ezToIntegrationProductName(this.ezIntegrationProviderId)}
            Integration Setup`;

        ezDialogOptions.width = 1280;

        ezDialogOptions.focus = this.ezHandleInitialDialogFocus;

        ezDialogOptions.buttons = [
            {
                text: 'Ok',
                id: `${this.ezDialogId}SaveButton`,
                click: this.ezSubmit
            },
            {
                text: 'Cancel',
                id: `${this.ezDialogId}CancelButton`,
                click: this.ezClose
            }
        ];

        ezApi.ezclocker.ezDialog.ezInitDialogWithConfig(this.ezDialogId, ezDialogOptions);

        if (!ezApi.ezclocker.ezUi.ezElementExists(this.ezUxIds.parentIds.ezDialogParentContainerId)) {
            ezApi.ezclocker.ezUi.ezAppendContent(
                'body',
                `<div
                    id="${this.ezDialogParentContainerId}"
                    style="display:none">
                </div>`);
        }

        // Set the dialog wrapper's parent id to enable swapping out to full screen
        let dialogWrapper = ezApi.ezclocker.ezUi.ezFindElementBySelector(`[aria-describedby="${this.ezDialogId}"]`);

        dialogWrapper.id = this.ezDialogWrapperParentId;
    }

    /**
     * @protected @method
     * Initializes the dialogs data
     * @returns {Promise.resolve}
     */
    ezInitData() {
        let self = this;

        return this.ezLoadEmployerDataTags()
            .then(self.ezLoadIntegrationSetupConfiguration);
    }

    /**
     * @protected @method
     * Loads the intergation's setup configuration
     * @returns {Promise.resolve}
     */
    ezLoadIntegrationSetupConfiguration() {
        let self = this;

        this.ezIntegrationResponse = null;

        return EzPromise.asyncAction(
            (finished) => self.ezController.ezGetIntegrationSetup(self.ezIntegrationProviderId)
                .then(
                    (response) => {
                        self.ezIntegrationResponse = response;

                        return finished();
                    },
                    (eResponse) => {
                        ezApi.ezclocker.logger.error(
                            ezApi.ezEM`
                                Failed to get existing ${self.ezIntegrationName} integration configuration.
                                Error: ${EzJson.toJson(eResponse)}`);

                        ezApi.ezclocker.ezDialog.ezShowPossibleDefectError(
                            `${self.ezIntegrationName} Integration Configuration Load Error`,
                            'Unable to get the existing ACS configuration at this time.',
                            EzJson.toJson(eResponse));

                        return finished();
                    }));
    }

    /**
     * @protected @method
     * Loads the active employer's data tags (aka jobs)
     * @returns {Promise.resolve}
     */
    ezLoadEmployerDataTags() {
        let self = this;

        this.ezJobCodes = [];

        this.ezJobCodesById = null;

        return EzPromise.asyncAction(
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
                                Error: ${EzJson.toJson(eResponse)}`);

                        return ezApi.ezclocker.ezDialog.ezShowPossibleDefectError(
                            'Available Jobs Error',
                            'Unable to get the available Jobs for your employer at this time.',
                            EzJson.toJson(eResponse))
                            .then(
                                () => finished(eResponse));
                    }));
    }

    /**
     * @protected @method
     * Returns the current map instance converted from the stored mappingJson data on the input associated with the
     * provided inputId.
     * @param {String} inputId
     * @returns {Object|null}
     */
    ezGetCurrentMapInstance(inputId) {
        let mappingJson = ezApi.ezclocker.ezUi.ezGetElementDataAttributeValue(
            inputId,
            'mapping-json');

        let mapping = EzJson.fromJson(mappingJson);

        return !EzString.isString(mapping)
            ? mapping
            : null;
    }

    /**
     * @protected @method
     * Builds input help tip HTML
     * @param {String} message
     * @returns {String}
     */
    ezBuildHelpTipHTML(message) {
        return EzHtml.build`
            <div
                class="ezContainer-mini-help-box">
                <img
                    src="/public/images/integrations/help-gray.svg"
                    class="ezContainer-mini-help-box-img"/>
                ${message}
            </div>`;
    }

    /**
     * @public @method
     * Shows the integrations dialog in the provided mode (or uses the default if not provided)
     * Optionally assigns the provided closeCallback function if not null.
     * @param {EzIntegrationSetupDialogDisplayMode} ezIntegrationSetupDialogDisplayMode
     * @param {function|null} closeCallback
     * @returns {Promise.resolve}
     */
    ezShow(ezIntegrationSetupDialogDisplayMode, closeCallback) {
        let self = this;

        return EzPromise.asyncAction(
            (finished) => {
                if (EzString.hasLength(ezIntegrationSetupDialogDisplayMode)) {
                    self.ezIntegrationSetupDialogDisplayMode = ezIntegrationSetupDialogDisplayMode;
                }

                self.ezCloseCallback = EzFunction.isFunction(closeCallback)
                    ? closeCallback
                    : null;

                return finished();
            });
    }

    /**
     * @public @method
     */
    ezSubmit() {
        // Provided for child classs to have common method to override
    }

    /**
     * @public @method
     */
    ezCancel() {
        this.ezClose();
    }

    /**
     * @public @method
     */
    ezClose() {
        // Provided for child classs to have common method to override
    }
}
