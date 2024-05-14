import {
    EzBoolean,
    EzHtml,
    EzJson,
    EzNumber,
    EzObject,
    EzPromise,
    EzString,
} from '/ezlibrary/helpers/EzHelpers.js';

import { EzBadParamException } from '/ezlibrary/exceptions/EzBadParamException.js';

import { EzClass } from '/ezlibrary/EzClass.js';

import {
    EzElementEventName,
    EzFeaturePackageId,
    EzNavigationButtonState,
    EzRegistrationState,
    EzUserPermissionType,
    EzUserRole,
    EzLicenseFeatureId
} from '/ezlibrary/enums/EzEnumerations.js';

import { EzClockerIdContext } from '/ezlibrary/EzClockerContext/EzClockerIdContext.js';

import { EzUserPermission } from '/ezlibrary/EzUserPermission.js';
import { EzUserPermissionsClient } from '/ezlibrary/EzUserPermissionsClient.js';
import {
    EzValidationResponse,
    EzValidationResponseStatus
} from '/ezlibrary/EzValidationResponse.js';

import '/public/javascript/common/ez-format.js';

import { EzEmployeeInviteRequest } from '/ezlibrary/entities/requests/EzEmployeeInviteRequest.js';
import { EzUpdateEmployeeInfoRequestEntity } from '/ezlibrary/entities/requests/EzUpdateEmployeeInfoRequestEntity.js';
import { EzFeaturePackageManager } from '/ezlibrary/EzFeaturePackageManager.js';

// TODO: Fix Amplitude before re-enabling
// import { EzAmplitudeIntegration } from '/ezlibrary/analytics_metrics/amplitude/EzAmplitudeIntegration.js';
import { EzAnalyticsAndMetrics } from '/ezlibrary/analytics_metrics/EzAnalyticsAndMetrics.js';

import { EzUx } from '/ezlibrary/ux/EzUx.js';
import { EzUI } from '/public/javascript/common/ezui.js';

import { EzDialogConfig } from '/ezlibrary/ux/dialogs/EzDialogConfig.js';

import { EzDialog } from '/public/javascript/common/ezclocker-dialog-helper.js';


/**
 * @class
 * Creates a new instance of EzInviteEmployeeDialog
 * ---------------------------------------------------------------------
 * Import With:
 *  import { EzInviteEmployeeDialog } from '/secure/widgets/EzInviteEmployeeDialog/EzInviteEmployeeDialog.js';
 * ---------------------------------------------------------------------
 */
export class EzInviteEmployeeDialog extends EzClass {
    /**
     * @public @constructor
     * >> DO NOT CREATE NEW INSTANCES OUTSIDE OF THE STATIC INITIALIZATION FLOW <<
     * Use the static singleton instance available from ezApi: ezApi.ezclocker.ezJobCodeDialog.
     */
    constructor() {
        super();

        this.ezCurrentNavigationButtonId = this.ezIds.navigationEmployeeInfoButtonId;

        this.ezCurrentNavigationViewId = this.ezIds.navigationViewEmployeeInfoId;
    }

    /**
     * @public @field
     * @type {object}
     */
    employeeUser = null;

    /**
     * @public @field
     * @type {object}
     */
    activeEmployee = null;

    /**
     * @public @field
     * @type {string}
     */
    ezDialogMode = 'ADD';

    /**
     * @public @field
     * @type {object}
     */
    ezUserPermissions = {};

    /**
     * @public @field
     * @type {string}
     */
    ezCurrentNavigationButtonId = EzString.EMPTY;

    /**
     * @public @field
     * @type {string}
     */
    ezCurrentNavigationViewId = EzString.EMPTY;

    ezBankTimeOffResponse = [];

    /**
     * @public @readonly @property
     * @returns {string}
     */
    get ezDialogId() {
        return 'EzInviteEmployeeDialog';
    }

    /**
     * @public @readonly @property
     * @type {object}
     */
    get ezIds() {
        return {
            dialogId: this.ezDialogId,
            containers: {
                parentContainerId: '_HideDialogsDiv',
                roleInfoBoxId: `${this.ezDialogId}_RoleInfoBox`,
                contentContainerId: `${this.ezDialogId}_ContentContainer`
            },
            links: {
                learnAboutInviteLinkId: `${this.ezDialogId}_EzLearnAboutInviteEmployee`,
                learnAboutPinNumberLinkId: `${this.ezDialogId}_EzLearnAboutPinNumber`
            },
            roleSelectInputId: `${this.ezDialogId}_EmployeeRoleSelect`,
            roleSelectInput_DisabledInfoLabelId: `${this.ezDialogId}_EmployeeRoleSelect_DisabledInfoLabel`,
            roleSelectInput_NoModificationLabelId: `${this.ezDialogId}_EmployeeRoleSelect_NoModificationLabel`,
            roleSelectInput_RestrictedToEmployeeLabelId: `${this.ezDialogId}_EmployeeRoleSelect_RestrictedToEmployeeLabel`,
            validationErrorMessageBoxId: `${this.ezDialogId}_ErrorMessage`,

            employeeNameValidationErrorContainerId: `${this.ezDialogId}_EmployeeName_ValidationErrorContainer`,
            emailAddressValidationErrorContainerId: `${this.ezDialogId}_EmployeeEmailAddress_ValidationErrorContainer`,
            phoneNumberValidationErrorContainerId: `${this.ezDialogId}_EmployeePhoneNumber_ValidationErrorContainer`,
            pinNumberValidationErrorContainerId: `${this.ezDialogId}_EmployeePinNumber_ValidationErrorContainer`,
            hourlyRateValidationErrorContainerId: `${this.ezDialogId}_EmployeeHourlyRate_ValidationErrorContainer`,
            timeoffBankValidationErrorContainerId: `${this.ezDialogId}_EmployeeTimeOffBank_ValidationErrorContainer`,

            navigationContainerId: `${this.ezDialogId}_NavigationContainer`,
            navigationEmployeeInfoButtonId: `${this.ezDialogId}_NavigationContainer_NavigationPane_EmployeeInfoButton`,
            navigationViewEmployeeInfoId: `${this.ezDialogId}_NavigationContainer_NavigationViewPane_EmployeeInfoView`,
            navigationEmployeePermissionsButtonId: `${this.ezDialogId}_NavigationContainer_NavigationPane_EmployeePermissionsButton`,
            navigationEmployeeTimeOffBankButtonId: `${this.ezDialogId}_NavigationContainer_NavigationPane_EmployeeTimeOffBankButton`,
            navigationViewEmployeePermissionsId: `${this.ezDialogId}_NavigationContainer_NavigationViewPane_EmployeePermissionsView`,
            navigationViewEmployeeTimeoffBankId: `${this.ezDialogId}_NavigationContainer_NavigationViewPane_EmployeeTimeOffBankView`,
            allowMobileClockInOutCheckboxId: `${this.ezDialogId}_NavigationContainer_NavigationViewPane_EmployeePermissionsView_AllowMobileClockInOutCheckbox`,
            allowWebsiteClockInOutCheckboxId: `${this.ezDialogId}_NavigationContainer_NavigationViewPane_EmployeePermissionsView_AllowWebsiteClockInOutCheckbox`,
            inputs: {
                hourlyRateInputPrefixId: `${this.ezDialogId}_EmployeeBaseHourlyPayRate`,
                hourlyRateInputId: `${this.ezDialogId}_EmployeeBaseHourlyPayRateA`,
                sendInviteRadioButtonSetId: `${this.ezDialogId}_SendInviteRadioButtonSet`,
                sendInviteBySMSRadioId: `${this.ezDialogId}_SendInviteByPhoneRadio`,
                sendInviteByEmailRadioId: `${this.ezDialogId}_SendInviteByEmailRadio`,
                doNotSendInviteRadioId: `${this.ezDialogId}_DonotSendInviteRadio`,
                pinNumberInputId: `${this.ezDialogId}_EmployeePinNumber`,
                phoneNumberInputId: `${this.ezDialogId}_EmployeePhoneNumber`,
                emailAddressInputId: `${this.ezDialogId}_EmployeeEmailAddress`,
                employeeNameInputId: `${this.ezDialogId}_EmployeeName`,
                yearlyPTOBankInputid: `${this.ezDialogId}_Employee_PTO_Bank_Input`,
                yearlySickBankInputid: `${this.ezDialogId}_Employee_Sick_Bank_Input`
            },
            buttons: {
                updateButtonId: `${this.ezDialogId}_UpdateButton`,
                inviteButtonId: `${this.ezDialogId}_InviteButton`
            }
        };
    }

    /**
     * @public @readonly @property
     * Returns the dialog's email address input value
     * @returns {string}
     */
    get ezEmailAddress() {
        return EzString.stringOrEmpty(
            EzUx.getInputValue(EzInviteEmployeeDialog.ezInstance.ezIds.inputs.emailAddressInputId))
            .toLowerCase()
            .trim();
    }

    /**
     * @public @readonly @property
     * Returns the dialog's pin number input value
     * @returns {string}
     */
    get ezPinNumber() {
        return EzString.stringOrEmpty(
            EzUx.getInputValue(EzInviteEmployeeDialog.ezInstance.ezIds.inputs.pinNumberInputId))
            .trim();
    }

    /**
     * @public @readonly @property
     * Returns a formatted phone number from the dialog's phone number input value
     * @returns {string}
     */
    get ezFormattedPhoneNumber() {
        let phoneNumber = EzUx.getInputValue(
            EzInviteEmployeeDialog.ezInstance.ezIds.inputs.phoneNumberInputId);

        if (!ezApi.ezclocker.ezFormat.ezIsUSPhoneNumber(phoneNumber)) {
            phoneNumber = EzString.hasLength(phoneNumber)
                ? ezApi.ezclocker.ezFormat.ezFormatUSPhoneNumber(phoneNumber)
                : EzString.EMPTY;
            // Update the value in the editor
            EzUx.setInputValue(
                EzInviteEmployeeDialog.ezInstance.ezIds.inputs.phoneNumberInputId,
                phoneNumber);
        }

        return phoneNumber;
    }

    /**
     * @public @property @setter
     * Returns the dialog's phone number input value
     * @returns {string}
     */
    get ezPhoneNumber() {
        return this.ezFormattedPhoneNumber;
    }
    /**
     * @public @property @setter
     * Sets the phone number editor value
     * @param {string} phoneNumber
     */
    set ezPhoneNumber(phoneNumber) {
        if (EzString.hasLength(phoneNumber)) {
            if ('1-' === phoneNumber.charAt(0)) {
                phoneNumber = phoneNumber.slice(2);
            } else if ('1' === phoneNumber.charAt(0)) {
                phoneNumber = phoneNumber.slice(1);
            }

            if ('-' === phoneNumber.charAt(0)) {
                phoneNumber = phoneNumber.slice(1);
            }
        }

        if (ezApi.ezclocker.ezFormat.ezIsUSPhoneNumber(phoneNumber)) {
            EzUx.setInputValue(
                EzInviteEmployeeDialog.ezInstance.ezIds.inputs.phoneNumberInputId,
                phoneNumber);
        } else {
            EzUx.setInputValue(
                EzInviteEmployeeDialog.ezInstance.ezIds.inputs.phoneNumberInputId,
                EzString.hasLength(phoneNumber)
                    ? ezApi.ezclocker.ezFormat.ezFormatUSPhoneNumber(phoneNumber)
                    : EzString.EMPTY);
        }
    }

    /**
     * @public @readonly @property
     * Returns the entered employee name
     * @returns {string}
     */
    get ezEmployeeName() {
        return EzString.stringOrEmpty(
            EzUx.getInputValue(EzInviteEmployeeDialog.ezInstance.ezIds.inputs.employeeNameInputId))
            .trim();
    }

    /**
     * @public @readonly @property
     * Returns the team pin dialog input value
     * @returns {string}
     */
    get ezTeamPin() {
        return EzUx.getInputValue(EzInviteEmployeeDialog.ezInstance.ezIds.inputs.pinNumberInputId);
    }

    /**
     * @public @readonly @property
     * Returns the dialog's hourly rate input value
     * @returns {number}
     * Returns a Float number
     */
    get ezHourlyRate() {
        return ezApi.ezclocker.ezClockerContext.ezGetUserContext().isEmployer ||
            ezApi.ezclocker.ezClockerContext.ezGetUserContext().isPayrollManager
            ? EzNumber.strToFloat(
                EzUx.getInputValue(EzInviteEmployeeDialog.ezInstance.ezIds.inputs.hourlyRateInputId))
            : null;
    }

    /**
     * @public @readonly @property
     * Returns if the send invite by email radio is checked or not.
     * @returns {Boolean}
     */
    get ezSendInviteByEmail() {
        return EzUx.isCheckboxChecked(EzInviteEmployeeDialog.ezInstance.ezIds.inputs.sendInviteByEmailRadioId);
    }

    /**
     * @public @readonly @property
     * Returns if the send invite by SMS/Text radio is checked or not.
     * @returns {Boolean}
     */
    get ezSendInviteBySMSInvite() {
        return EzUx.isCheckboxChecked(EzInviteEmployeeDialog.ezInstance.ezIds.inputs.sendInviteBySMSRadioId);
    }

    /**
     @private @field
     Stores the ready check flags
     @type {string}
     */
    #ezReadyCheckFlags = {
        featurePackageManagerReady: false

    };
    /**
     @public @property @getter
     Gets the ready check flags
     @returns {object}
     */
    get ezReadyCheckFlags() {
        return this.#ezReadyCheckFlags;
    }
    /**
     @public @property @getter
     Sets the ready check flags
     @param {object} ezReadyCheckFlags
     */
    set ezReadyCheckFlags(ezReadyCheckFlags) {
        if (!EzObject.isValid(ezReadyCheckFlags)) {
            throw new EzBadParamException(
                'ezReadyCheckFlags',
                this,
                this.ezReadyCheckFlags);
        }

        this.#ezReadyCheckFlags.featurePackageManagerReady = EzBoolean.isTrue(ezReadyCheckFlags.featurePackageManagerReady);
    }

    /**
     * @protected
     * Initializes the EzInviteEmployeeDialog
     * @returns {EzInviteEmployeeDialog}
     */
    ezInit() {
        ezApi.ezclocker.ezEventEngine.ezRegisterEvent(
            EzInviteEmployeeDialog.ezApiName,
            EzInviteEmployeeDialog.ezEventNames.onInviteEmployeeDialogEmployeeAdded);

        ezApi.ezclocker.ezEventEngine.ezRegisterEvent(
            EzInviteEmployeeDialog.ezApiName,
            EzInviteEmployeeDialog.ezEventNames.onInviteEmployeeDialogEmployeeAddError);

        ezApi.ezclocker.ezEventEngine.ezRegisterEvent(
            EzInviteEmployeeDialog.ezApiName,
            EzInviteEmployeeDialog.ezEventNames.onInviteEmployeeDialogEmployeeAddCanceled);

        ezApi.ezclocker.ezEventEngine.ezRegisterEvent(
            EzInviteEmployeeDialog.ezApiName,
            EzInviteEmployeeDialog.ezEventNames.onInviteEmployeeDialogEmployeeUpdated);

        ezApi.ezclocker.ezEventEngine.ezRegisterEvent(
            EzInviteEmployeeDialog.ezApiName,
            EzInviteEmployeeDialog.ezEventNames.onInviteEmployeeDialogEmployeeUpdateError);

        ezApi.ezclocker.ezEventEngine.ezRegisterEvent(
            EzInviteEmployeeDialog.ezApiName,
            EzInviteEmployeeDialog.ezEventNames.onInviteEmployeeDialogEmployeeUpdateCanceled);

        ezApi.ezclocker.ezEventEngine.ezRegisterEvent(
            EzInviteEmployeeDialog.ezApiName,
            EzInviteEmployeeDialog.ezEventNames.onInviteEmployeeDialogShow);

        ezApi.ezclocker.ezEventEngine.ezRegisterEvent(
            EzInviteEmployeeDialog.ezApiName,
            EzInviteEmployeeDialog.ezEventNames.onInviteEmployeeDialogCanceled);

        ezApi.ezclocker.ezEventEngine.ezRegisterEvent(
            EzInviteEmployeeDialog.ezApiName,
            EzInviteEmployeeDialog.ezEventNames.onInviteEmployeeDialogClosed);

        ezApi.ezclocker.ezEventEngine.ezWantEventEx({
            eventName: EzFeaturePackageManager.ezEventNames.onFeaturePackagesLoaded,
            handlerName: EzInviteEmployeeDialog.ezApiName,
            handlerFunction: () => {
                EzInviteEmployeeDialog.ezInstance.ezReadyCheckFlags.featurePackageManagerReady = true;

                EzInviteEmployeeDialog.ezInstance.ezProcessReadyChecks();
            }
        });

        EzInviteEmployeeDialog.ezInstance.ezInitUx();

        return EzInviteEmployeeDialog.ezInstance;
    }

    /**
     * @public @method
     * Processes the ready check flags and when all evaluate as true, calls ezInitUX
     */
    ezProcessReadyChecks() {
        if (EzBoolean.isTrue(EzInviteEmployeeDialog.ezInstance.ezReadyCheckFlags.featurePackageManagerReady) &&
            (EzBoolean.isTrue(ezApi.ezclocker.ezFeaturePackageManager.ezFeaturePackageEnabled(EzFeaturePackageId.TIME_OFF) ||
                EzBoolean.isTrue(ezApi.ezclocker.ezFeaturePackageManager.ezFeaturePackageEnabled(EzFeaturePackageId.TIME_OFF_YEARLY))))) {

            EzUx.show(EzInviteEmployeeDialog.ezInstance.ezIds.navigationEmployeeTimeOffBankButtonId);
        } else {
            EzUx.hide(EzInviteEmployeeDialog.ezInstance.ezIds.navigationEmployeeTimeOffBankButtonId);
        }
    }

    /**
     * @public @method
     * Initializes the dialog's UX
     */
    ezInitUx() {
        if (!EzUx.elementExists(EzInviteEmployeeDialog.ezInstance.ezIds.containers.parentContainerId)) {
            EzUx.appendContent(
                'body',
                EzHtml.build`
                    <div
                        id="${EzInviteEmployeeDialog.ezInstance.ezIds.containers.parentContainerId}"
                        style="display:none">
                    </div>`);
        }

        EzUx.appendContent(
            EzInviteEmployeeDialog.ezInstance.ezIds.containers.parentContainerId,
            EzInviteEmployeeDialog.ezInstance.ezBuildDialogHtml());

        let ezDialogConfig = new EzDialogConfig(EzInviteEmployeeDialog.ezInstance.ezDialogId);

        ezDialogConfig.width = 1024;

        ezDialogConfig.buttons = {
            Add: {
                id: EzInviteEmployeeDialog.ezInstance.ezIds.buttons.inviteButtonId,
                text: 'Add',
                click: EzInviteEmployeeDialog.ezInstance.ezSubmit
            },
            Update: {
                id: EzInviteEmployeeDialog.ezInstance.ezIds.buttons.updateButtonId,
                text: 'Update',
                click: EzInviteEmployeeDialog.ezInstance.ezSubmit
            },
            Cancel: EzInviteEmployeeDialog.ezInstance.ezCancel
        };

        ezDialogConfig.close = () => ezApi.ezclocker.ezEventEngine.ezTriggerEvent(
            EzInviteEmployeeDialog.ezEventNames.onInviteEmployeeDialogClosed,
            ezApi.ezclocker.ezEventEngine.ezBuildEventData(
                EzInviteEmployeeDialog.ezApiName,
                'Invite or add employee dialog was closed',
                EzInviteEmployeeDialog.ezInstance));

        ezApi.ezclocker.ezDialog.ezInitDialogWithConfig(
            EzInviteEmployeeDialog.ezInstance.ezDialogId,
            ezDialogConfig);

        EzInviteEmployeeDialog.ezInstance.ezHookUxEvents();

        EzUx.hide(EzInviteEmployeeDialog.ezInstance.ezIds.buttons.updateButtonId);
    }

    /**
     * @public @method
     * Builds the dialog's HTML
     * @returns {string}
     */
    ezBuildDialogHtml() {
        return EzHtml.build`
            <div
                id="${EzInviteEmployeeDialog.ezInstance.ezDialogId}"
                class="ezAutoRow"
                style="display:none"
                title="Add Employee">
                <!--Invite Employee Dialog -->
                ${EzInviteEmployeeDialog.ezInstance.ezBuildNavigation()}
                ${EzInviteEmployeeDialog.ezInstance.ezBuildInviteMethodHtmlBox()}
            </div>`;

    }

    /**
     * @public @method
     * Builds the navigation system for the invite/update employee dialog.
     * @returns {string}
     * Returns the HTML for the navigation system
     */
    ezBuildNavigation() {
        return EzHtml.build`
            <div
                id="${EzInviteEmployeeDialog.ezInstance.ezIds.navigationContainerId}"
                class="ezPad4 ezAutoRow ezAutoCol_200PXxA">
                <div
                    id="${EzInviteEmployeeDialog.ezInstance.ezIds.navigationContainerId}_NavigationPane"
                    class="ezAutoRow_Min_Min ezGridGap_2">
                    <button
                        id="${EzInviteEmployeeDialog.ezInstance.ezIds.navigationEmployeeInfoButtonId}"
                        class="ez-navy-left-nav-button" data-state="${EzNavigationButtonState.SELECTED}"
                        data-view="${EzInviteEmployeeDialog.ezInstance.ezIds.navigationViewEmployeeInfoId}">
                        General
                    </button>
                    <button
                        id="${EzInviteEmployeeDialog.ezInstance.ezIds.navigationEmployeePermissionsButtonId}"
                        class="ez-navy-left-nav-button" data-state="${EzNavigationButtonState.UNSELECTED}"
                        data-view="${EzInviteEmployeeDialog.ezInstance.ezIds.navigationViewEmployeePermissionsId}">
                        Permissions
                    </button>
                    <button
                        id="${EzInviteEmployeeDialog.ezInstance.ezIds.navigationEmployeeTimeOffBankButtonId}"
                        class="ez-navy-left-nav-button" data-state="${EzNavigationButtonState.UNSELECTED}" style="height: 50px"
                        data-view="${EzInviteEmployeeDialog.ezInstance.ezIds.navigationViewEmployeeTimeoffBankId}">
                        Time Off Bank
                    </button>
                </div>
                <div
                    id="${EzInviteEmployeeDialog.ezInstance.ezIds.navigationContainerId}_NavigationViewPane"
                    class="ez-border-medium-rounded-right-navy ezAutoCol_100 ezAutoRow_600px_600px">
                    ${EzInviteEmployeeDialog.ezInstance.ezBuildEmployeeInfoView()}
                    ${EzInviteEmployeeDialog.ezInstance.ezBuildEmployeePermissionView()}
                    ${EzInviteEmployeeDialog.ezInstance.ezBuildEmployeeTimeOffBankView()}
                </div>
            </div>`;
    }

    /**
     * @public @method
     * Builds the employee permissions navigation view
     * @returns {string}
     * HTML for the permissions navigation view
     */
    ezBuildEmployeePermissionView() {
        return EzHtml.build`
            <div
                id="${EzInviteEmployeeDialog.ezInstance.ezIds.navigationViewEmployeePermissionsId}"
                class="ezPad8 ezAutoRow_A_A_A ezGridGap_8"
                style="display:none">
                <div
                    id="${EzInviteEmployeeDialog.ezInstance.ezIds.navigationViewEmployeePermissionsId}_Row1"
                    class="ezInputLabelGroupContainer">
                    <label
                        id="${EzInviteEmployeeDialog.ezInstance.ezIds.allowMobileClockInOutCheckboxId}_Label"
                        for="${EzInviteEmployeeDialog.ezInstance.ezIds.allowMobileClockInOutCheckboxId}">
                        <input
                            id="${EzInviteEmployeeDialog.ezInstance.ezIds.allowMobileClockInOutCheckboxId}"
                            type="checkbox"
                            checked>
                        Allow employee to use ezClocker's mobile app to clock in and out of their shifts.
                    </label>
                </div>
                <div
                    id="${EzInviteEmployeeDialog.ezInstance.ezIds.navigationViewEmployeePermissionsId}_Row2"
                    class="ezInputLabelGroupContainer">
                    <label
                        id="${EzInviteEmployeeDialog.ezInstance.ezIds.allowWebsiteClockInOutCheckboxId}Label"
                        for="${EzInviteEmployeeDialog.ezInstance.ezIds.allowWebsiteClockInOutCheckboxId}">
                        <input
                            id="${EzInviteEmployeeDialog.ezInstance.ezIds.allowWebsiteClockInOutCheckboxId}"
                            type="checkbox"
                            checked>
                        Allow employee to use ezClocker's website to clock in and out of their shifts.
                    </label>
                </div>
                <div
                    id="${EzInviteEmployeeDialog.ezInstance.ezIds.navigationViewEmployeePermissions_DisabledInfoId}"
                    class="ezText-micro-navy"
                    style="display:none">
                    You cannot modify your own permissions. Please contact your Employer or Payroll Manager if you
                    need to change your permissions.
                </div>
            </div>`;
    }

    /**
     * @public @method
     * Builds the employee time off bank view
     * @returns {string}
     * HTML for the time off bank view
     */
    ezBuildEmployeeTimeOffBankView() {
        return EzHtml.build`
            <div
                id="${EzInviteEmployeeDialog.ezInstance.ezIds.navigationViewEmployeeTimeoffBankId}"
                class="ezPad8 ezAutoRow_A_A_A ezGridGap_8">
                <div
                    id="${EzInviteEmployeeDialog.ezInstance.ezIds.navigationViewEmployeeTimeoffBankId}_Row1"
                    class="ezInputLabelGroupContainer">
                    <label
                        id="${EzInviteEmployeeDialog.ezInstance.ezIds.inputs.yearlyPTOBankInputid}_Label"
                        for="${EzInviteEmployeeDialog.ezInstance.ezIds.inputs.yearlyPTOBankInputid}">
                        Yearly PTO Bank
                    </label>
                    <input
                        id="${EzInviteEmployeeDialog.ezInstance.ezIds.inputs.yearlyPTOBankInputid}"
                        style="padding-left:5px;text-align:left;width=100%"
                        placeholder=""
                        type="number">
                    </input>
                </div>
                <div
                    id="${EzInviteEmployeeDialog.ezInstance.ezIds.navigationViewEmployeeTimeoffBankId}_Row2"
                    class="ezInputLabelGroupContainer">
                    <label
                        id="${EzInviteEmployeeDialog.ezInstance.ezIds.inputs.yearlySickBankInputid}Label"
                        for="${EzInviteEmployeeDialog.ezInstance.ezIds.inputs.yearlySickBankInputid}">
                        Yearly Sick Bank
                   </label>
                   <input
                        id="${EzInviteEmployeeDialog.ezInstance.ezIds.inputs.yearlySickBankInputid}"
                        style="padding-left:5px;text-align:left;width=100%"
                        placeholder=""
                        type="number">
                    </input>
                </div>
                <div
                    id="${EzInviteEmployeeDialog.ezInstance.ezIds.timeoffBankValidationErrorContainerId}"
                    class="ezContainer-validation-error-box"
                    style="display:none">
                </div>
            </div>`;
    }

    /**
     * @public @method
     * Builds the employee information navigation view
     * @returns {string}
     * HTML for the employee information navigation view
     */
    ezBuildEmployeeInfoView() {
        return EzHtml.build`
            <div
                id="${EzInviteEmployeeDialog.ezInstance.ezIds.navigationViewEmployeeInfoId}">
                <div
                    id="${EzInviteEmployeeDialog.ezInstance.ezIds.employeeInfoViewId}_Cols"
                    class="ezAutoCol_50xA">
                    ${EzInviteEmployeeDialog.ezInstance.ezBuildInputColumnHtml()}
                    ${EzInviteEmployeeDialog.ezInstance.ezBuildEmployeeRoleColumnHtml()}
                </div>
            </div>`;
    }

    /**
     * @public @method
     * Builds the input column html for the dialog
     * @returns {string}
     */
    ezBuildInputColumnHtml() {
        return EzHtml.build`
            <div
                id="${EzInviteEmployeeDialog.ezInstance.ezDialogId}_InfoCol"
                class="ezPaddedBox4">
                <div
                    id="${EzInviteEmployeeDialog.ezInstance.ezIds.validationErrorMessageBoxId}"
                    class="ezErrorBox"
                    style="display:none">
                </div>
                <div
                    id="${EzInviteEmployeeDialog.ezInstance.ezIds.inputs.employeeNameInputId}_Container"
                    class="ezContainers_InputBox">
                    <label
                        id="${EzInviteEmployeeDialog.ezInstance.ezIds.inputs.employeeNameInputId}_Label"
                        for="${EzInviteEmployeeDialog.ezInstance.ezIds.inputs.employeeNameInputId}"
                        class="ezInputLabel">
                        Name
                    </label>
                    <input
                        id="${EzInviteEmployeeDialog.ezInstance.ezIds.inputs.employeeNameInputId}"
                        style="padding-top:4px;width:100%;"
                        type="text"/>
                    <div
                        id="${EzInviteEmployeeDialog.ezInstance.ezIds.employeeNameValidationErrorContainerId}"
                        class="ezContainer-validation-error-box"
                        style="display:none">
                    </div>
                </div>
                <div
                    id="${EzInviteEmployeeDialog.ezInstance.ezIds.inputs.emailAddressInputId}_Container"
                    class="ezContainers_InputBox">
                    <label
                        id="${EzInviteEmployeeDialog.ezInstance.ezIds.inputs.emailAddressInputId}_Label"
                        for="${EzInviteEmployeeDialog.ezInstance.ezIds.inputs.emailAddressInputId}"
                        class="ezInputLabel">
                        Email Address
                    </label>
                    <input
                        id="${EzInviteEmployeeDialog.ezInstance.ezIds.inputs.emailAddressInputId}"
                        type="text"
                        style="padding-top:4px;width:100%"/>
                    <div
                        id="${EzInviteEmployeeDialog.ezInstance.ezIds.emailAddressValidationErrorContainerId}"
                        class="ezContainer-validation-error-box"
                        style="display:none">
                    </div>
                </div>
                <div
                    id="${EzInviteEmployeeDialog.ezInstance.ezIds.inputs.phoneNumberInputId}_Container"
                    class="ezContainers_InputBox">
                    <label
                        id="${EzInviteEmployeeDialog.ezInstance.ezIds.inputs.phoneNumberInputId}_Label"
                        for="${EzInviteEmployeeDialog.ezInstance.ezIds.inputs.phoneNumberInputId}"
                        class="ezInputLabel">
                        Mobile Phone Number
                    </label>
                    <input
                        id="${EzInviteEmployeeDialog.ezInstance.ezIds.inputs.phoneNumberInputId}"
                        type="text"
                        name="mobilePhone"
                        placeholder="(optional if email entered)"
                        title="Format: 555-555-5555" style="padding-top: 4px; width: 100%"/>
                    <div
                        id="${EzInviteEmployeeDialog.ezInstance.ezIds.phoneNumberValidationErrorContainerId}"
                        class="ezContainer-validation-error-box"
                        style="display:none">
                    </div>
                    <div
                        id="${EzInviteEmployeeDialog.ezInstance.ezIds.inputs.phoneNumberInputId}_FormatHint"
                        class="ezInputFormatLabel">
                        Format: 555-555-5555
                    </div>
                </div>
                <div
                    id="${EzInviteEmployeeDialog.ezInstance.ezIds.inputs.pinNumberInputId}_Container"
                    class="ezContainers_InputBox">
                    <label
                        id="${EzInviteEmployeeDialog.ezInstance.ezIds.inputs.pinNumberInputId}_Label"
                        for="${EzInviteEmployeeDialog.ezInstance.ezIds.inputs.pinNumberInputId}"
                        class="ezInputLabel">
                        Kiosk PIN Number
                        <span class="whatIsThisLink">(</span>
                        <a
                            id="${EzInviteEmployeeDialog.ezInstance.ezIds.links.learnAboutPinNumberLinkId}"
                            class="whatIsThisLink"
                            title="Learn what the pin number is used for."
                            href="#">
                            what is this?
                        </a>
                        <span class="whatIsThisLink">)</span>
                    </label>
                    <input
                        id="${EzInviteEmployeeDialog.ezInstance.ezIds.inputs.pinNumberInputId}"
                        class="ezNumber ezFullWidthEditor"
                        type="number"
                        placeholder="(optional)"
                        maxlength="4"
                        max="9999"/>
                    <div
                        id="${EzInviteEmployeeDialog.ezInstance.ezIds.pinNumberValidationErrorContainerId}"
                        class="ezContainer-validation-error-box"
                        style="display:none">
                    </div>
                    <div
                        id="${EzInviteEmployeeDialog.ezInstance.ezIds.inputs.pinNumberInputId}_Info"
                        class="ezContainer-editor-info-box">
                        Four numbers, unique for each employee.
                    </div>
                </div>
                <div
                    id="${EzInviteEmployeeDialog.ezInstance.ezDialogId}_InviteInfoContainer"
                    class="ezTopMargin_8 ezLightGrayBox"
                    style="display:none">
                </div>
            </div>`;
    }

    /**
     * @public @method
     * Builds the employee invitation information HTML (if any), and only in edit mode
     * @returns {string}
     */
    ezBuildEmployeeInviteInfoHtml() {
        if ('ADD' === EzInviteEmployeeDialog.ezInstance.ezDialogMode) {
            return EzString.EMPTY;
        }

        let employee = ezApi.ezclocker.ezClockerContext.ezGetActiveEmployee();

        if (!EzObject.isValid(employee)) {
            return EzString.EMPTY;
        }

        let employeeInviteInfo;

        if (EzBoolean.isTrue(employee.invited)) {
            let invitedDate = EzString.hasLength(employee.invitedIso)
                ? ezApi.ezclocker.ezDateTime.ezFromIso(employee.invitedIso)
                : null;

            // Invited On
            employeeInviteInfo = EzObject.isValid(invitedDate)
                ? EzHtml.build`
                    <div
                        id="${EzInviteEmployeeDialog.ezInstance.ezDialogId}_InvitedOnText"
                        class="ezText-small-black">
                        Employee invited to ezClocker on
                        ${ezApi.ezclocker.ezDateTime.ezToDisplayDateTime(invitedDate)}.
                    </div>`
                : EzHtml.build`
                    <div
                        id="${EzInviteEmployeeDialog.ezInstance.ezDialogId}_InvitedOnText"
                        class="ezText-small-black">
                        Employee is invited to ezClocker.
                    </div>`;

            if (EzBoolean.isTrue(employee.acceptedInvite)) {
                let acceptedInviteDate = EzString.hasLength(employee.acceptedInviteIso)
                    ? ezApi.ezclocker.ezDateTime.ezFromIso(employee.acceptedInviteIso)
                    : null;

                // Accepted Invite
                return EzString.hasLength(acceptedInviteDate)
                    ? EzHtml.build`${employeeInviteInfo}
                        <div
                            id="${EzInviteEmployeeDialog.ezInstance.ezDialogId}_InviteAcceptedOnText"
                            class="ezText-small-black">
                            Employee accepted the invite to ezClocker on
                            ${acceptedInviteDate}.
                        </div>`
                    : EzHtml.build`${employeeInviteInfo}
                        <div
                            id="${EzInviteEmployeeDialog.ezInstance.ezDialogId}_InviteAcceptedOnText"
                            class="ezText-small-black">
                            Employee accepted the invite to ezClocker.
                        </div>`;
            } else {
                // Not accepted Invite Yet
                return EzHtml.build`${employeeInviteInfo}
                    <div
                        id="${EzInviteEmployeeDialog.ezInstance.ezDialogId}_InviteNotAcceptedText"
                        class="ezText-small-black">
                        Employee has not accepted the invite yet.
                    </div>`;
            }
        }

        // Not invited yet
        return EzHtml.build`
            <div
                id="${EzInviteEmployeeDialog.ezInstance.ezDialogId}_NotInvitedText"
                class="ezText-small-black">
                You have not invited the employee to use ezClocker yet.
            </div>`;
    }

    /**
     * @public @method
     * Builds the employee role column html for the dialog.
     * @returns {string}
     */
    ezBuildEmployeeRoleColumnHtml() {
        return EzHtml.build`
            <div
                id="${EzInviteEmployeeDialog.ezInstance.ezDialogId}_RoleCol"
                class="ezPaddedBox4">
                <div
                    id="${EzInviteEmployeeDialog.ezInstance.ezIds.inputs.hourlyRateInputId}_Container"
                    class="ezContainers_InputBox">
                    <label
                        id="${EzInviteEmployeeDialog.ezInstance.ezIds.inputs.hourlyRateInputId}_Label"
                        for="${EzInviteEmployeeDialog.ezInstance.ezIds.inputs.hourlyRateInputId}"
                        class="ezInputLabel">
                        Base Hourly Rate
                    </label>
                    <div
                        style="display:flex;">
                        <span
                            style="margin-right:4px;margin-top:5px;">
                            $
                        </span>
                        <input
                            id="${EzInviteEmployeeDialog.ezInstance.ezIds.inputs.hourlyRateInputPrefixId}A"
                            class="ezSelect ezFullWidthEditor"
                            style="padding-left:5px;text-align:left;"
                            placeholder="0.00 (optional)"
                            type="text">
                        </input>
                        <div
                            id="${EzInviteEmployeeDialog.ezInstance.ezIds.hourlyRateValidationErrorContainerId}"
                            class="ezContainer-validation-error-box"
                            style="display:none">
                        </div>
                        <input
                            id="${EzInviteEmployeeDialog.ezInstance.ezIds.inputs.hourlyRateInputPrefixId}B"
                            class="ezSelect ezFullWidthEditor"
                            style="padding-left:5px;text-align:left;"
                            placeholder="0.00 (optional)"
                            type="password"
                            disabled>
                        </input>
                    </div>
                </div>
                <div
                    id="${EzInviteEmployeeDialog.ezInstance.ezIds.roleSelectInputId}_Container"
                    class="ezContainers_InputBox">
                    <label
                        id="${EzInviteEmployeeDialog.ezInstance.ezIds.roleSelectInputId}_Label"
                        for="${EzInviteEmployeeDialog.ezInstance.ezIds.roleSelectInputId}"
                        class="ezInputLabel">
                        Role
                    </label>
                    <select
                        id="${EzInviteEmployeeDialog.ezInstance.ezIds.roleSelectInputId}"
                        class="ezSelect ezFullWidthEditor">
                        <option
                            id="${EzInviteEmployeeDialog.ezInstance.ezDialogId}_EmployeeRoleEmployeeOption"
                            class="ezOption"
                            value="${EzUserRole.ROLE_EMPLOYEE}">
                            ${EzUserRole.ezToRoleName(EzUserRole.ROLE_EMPLOYEE)}
                        </option>
                        <option
                            id="${EzInviteEmployeeDialog.ezInstance.ezDialogId}_EmployeeRoleManagerOption"
                            class="ezOption"
                            value="${EzUserRole.ROLE_MANAGER}">
                            ${EzUserRole.ezToRoleName(EzUserRole.ROLE_MANAGER)}
                        </option>
                        <option
                            id="${EzInviteEmployeeDialog.ezInstance.ezDialogId}_EmployeeRoleManagerOption"
                            class="ezOption"
                            value="${EzUserRole.ROLE_PAYROLL_MANAGER}">
                            ${EzUserRole.ezToRoleName(EzUserRole.ROLE_PAYROLL_MANAGER)}
                        </option>
                    </select>
                    <span
                        id="${EzInviteEmployeeDialog.ezInstance.ezIds.roleSelectInput_DisabledInfoLabelId}"
                        class="ezText-micro-navy"
                        style="display:none">
                        Note: You cannot change your own role. Please contact your Employer or
                        Payroll Manager if you need your role changed.
                    </span>
                    <span
                        id="${EzInviteEmployeeDialog.ezInstance.ezIds.roleSelectInput_NoModificationLabelId}"
                        class="ezText-micro-navy"
                        style="display:none">
                        Note: Only the Employer account or Payroll Manager accounts can modify an existing employee's role.
                    </span>
                    <span
                        id="${EzInviteEmployeeDialog.ezInstance.ezIds.roleSelectInput_RestrictedToEmployeeLabelId}"
                        class="ezText-micro-navy"
                        style="display:none">
                        Note: Manager accounts can only add employees with the Employee role.
                        Please contact your Employer or Payroll Manager if the employee needs the Manager or
                        Payroll Manager role.
                    </span>
                </div>
                <div
                    id="${EzInviteEmployeeDialog.ezInstance.ezIds.containers.roleInfoBoxId}"
                    class="ezInfoBox ezMargin_4x4x4x4">
                    Employees only have access to the employee dashboard where they can:
                    <ul>
                        <li>
                            Clock in and out
                        </li>
                        <li>
                            View time entries and edit notes
                        </li>
                        <li>
                            Optionally add and edit their time entries
                        </li>
                        <li>
                            View their schedule
                        </li>
                    </ul>
                </div>
            </div>`;
    }

    /**
     * @public @method
     * Builds the invite method box HTML for the dialog
     * @returns {string}
     */
    ezBuildInviteMethodHtmlBox() {
        return EzHtml.build`
            <div
                id="${EzInviteEmployeeDialog.ezInstance.ezIds.inputs.sendInviteRadioButtonSetId}"
                class="ezContainer-content-box ezMargin_4x4x4x4">
                <div
                    class="ezBottomMargin_10">
                    <label
                        class="ezBold">
                        Employee Invite Method
                    </label>
                    <label
                        class="whatIsThisLink">
                        (
                    </label>
                    <a
                        id="${EzInviteEmployeeDialog.ezInstance.ezIds.links.learnAboutInviteLinkId}"
                        class="whatIsThisLink"
                        title="Learn more about sending invites to your employee."
                        href="#">
                        what is this?
                    </a>
                    <label
                        class="whatIsThisLink">
                        )
                    </label>
                </div>
                <div
                    class="ezAutoCol_33x33xA ezGridGap_8 ezGrid-vertical-align-middle ezGrid-align-full">
                    <div
                        id="${EzInviteEmployeeDialog.ezInstance.ezIds.inputs.sendInviteByEmailRadioId}_Box"
                        class="ezContainer-radio-check-input"
                        title="Check to send your employee an invite to use ezClocker via email">
                        <label
                            id="${EzInviteEmployeeDialog.ezInstance.ezIds.inputs.sendInviteByEmailRadioId}_Label"
                            for="${EzInviteEmployeeDialog.ezInstance.ezIds.inputs.sendInviteByEmailRadioId}"
                            class="ezText-radio-checkbox-label"
                            title="Check to send your employee an invite to use ezClocker via email">
                            <input
                                id="${EzInviteEmployeeDialog.ezInstance.ezIds.inputs.sendInviteByEmailRadioId}"
                                type="radio"
                                name="EzRadioGroupInviteMethod"
                                title="Check to send your employee an invite to use ezClocker via email"
                                checked/>
                                Send invite via Email
                        </label>
                    </div>
                    <div
                        id="${EzInviteEmployeeDialog.ezInstance.ezIds.inputs.sendInviteBySMSRadioId}_Box"
                        class="ezContainer-radio-check-input"
                        title="Check to send employee an invite to use ezClocker via SMS text message">
                        <label
                            id="${EzInviteEmployeeDialog.ezInstance.ezIds.inputs.sendInviteBySMSRadioId}_Label"
                            for="${EzInviteEmployeeDialog.ezInstance.ezIds.inputs.sendInviteBySMSRadioId}"
                            class="ezText-radio-checkbox-label"
                            title="Check to send employee an invite to use ezClocker via SMS text message">
                            <input
                                id="${EzInviteEmployeeDialog.ezInstance.ezIds.inputs.sendInviteBySMSRadioId}"
                                type="radio"
                                name="EzRadioGroupInviteMethod"
                                title="Check to send employee an invite to use ezClocker via SMS text message"/>
                                Send invite via SMS Text
                        </label>
                    </div>
                    <div
                        id="${EzInviteEmployeeDialog.ezInstance.ezIds.inputs.doNotSendInviteRadioId}_Box"
                        class="ezContainer-radio-check-input"
                        title="Check to NOT send your employee an invite to use ezClocker">
                        <label
                            id="${EzInviteEmployeeDialog.ezInstance.ezIds.inputs.doNotSendInviteRadioId}_Label"
                            for="${EzInviteEmployeeDialog.ezInstance.ezIds.inputs.doNotSendInviteRadioId}"
                            class="ezText-radio-checkbox-label"
                            title="Check to NOT send your employee an invite to use ezClocker">
                            <input
                                id="${EzInviteEmployeeDialog.ezInstance.ezIds.inputs.doNotSendInviteRadioId}"
                                type="radio"
                                name="EzRadioGroupInviteMethod"
                                title="Check to NOT send your employee an invite to use ezClocker"/>
                                Do not send an invite
                        </label>
                    </div>
                </div>
            </div>`;
    }

    /**
     * @public @method
     * Resets the dialog to the Update Employee mode state
     */
    ezResetUpdateEmployeeState() {
        return EzPromise.asyncAction(
            (finished) => {
                EzUx.id$(EzInviteEmployeeDialog.ezInstance.ezDialogId)?.dialog({
                    'title': `Update Employee: ${EzInviteEmployeeDialog.ezInstance.activeEmployee.employeeName}`
                });

                let primaryRole = EzString.hasLength(EzInviteEmployeeDialog.ezInstance.activeEmployee.primaryRole)
                    ? EzInviteEmployeeDialog.ezInstance.activeEmployee.primaryRole
                    : EzUserRole.ROLE_EMPLOYEE;

                if ('EMPLOYEE' === primaryRole) {
                    primaryRole = EzUserRole.ROLE_EMPLOYEE;
                } else if ('MANAGER' == primaryRole) {
                    primaryRole = EzUserRole.ROLE_MANAGER;
                }

                EzUx.hide(EzInviteEmployeeDialog.ezInstance.ezIds.buttons.inviteButtonId);

                if (EzBoolean.isTrue(EzInviteEmployeeDialog.ezInstance.ezReadyCheckFlags.featurePackageManagerReady) &&
                    (ezApi.ezclocker.ezClockerContext.ezActiveEmployerLicenseHasFeature(EzLicenseFeatureId.TIME_OFF) ||
                        ezApi.ezclocker.ezClockerContext.ezActiveEmployerLicenseHasFeature(EzLicenseFeatureId.TIME_OFF_YEARLY) ||
                        ezApi.ezclocker.ezFeaturePackageManager.ezFeaturePackageEnabled(EzFeaturePackageId.TIME_OFF) ||
                        ezApi.ezclocker.ezFeaturePackageManager.ezFeaturePackageEnabled(EzFeaturePackageId.TIME_OFF_YEARLY))) {
                    EzUx.show(EzInviteEmployeeDialog.ezInstance.ezIds.navigationEmployeeTimeOffBankButtonId);
                } else {
                    EzUx.hide(EzInviteEmployeeDialog.ezInstance.ezIds.navigationEmployeeTimeOffBankButtonId);
                }

                EzUx.hide(EzInviteEmployeeDialog.ezInstance.ezIds.inputs.sendInviteRadioButtonSetId);

                EzUx.show(EzInviteEmployeeDialog.ezInstance.ezIds.buttons.updateButtonId);

                EzUx.setInputValue(
                    EzInviteEmployeeDialog.ezInstance.ezIds.inputs.employeeNameInputId,
                    EzInviteEmployeeDialog.ezInstance.activeEmployee.employeeName);

                EzUx.setInputValue(
                    EzInviteEmployeeDialog.ezInstance.ezIds.inputs.pinNumberInputId,
                    EzInviteEmployeeDialog.ezInstance.activeEmployee.teamPin);

                if (!EzObject.isValid(EzInviteEmployeeDialog.ezInstance.employeeUser.nonEmailUsername) ||
                    EzBoolean.isFalse(EzInviteEmployeeDialog.ezInstance.employeeUser.nonEmailUsername)) {
                    EzUx.setInputValue(
                        EzInviteEmployeeDialog.ezInstance.ezIds.inputs.emailAddressInputId,
                        EzInviteEmployeeDialog.ezInstance.employeeUser.username.toLowerCase());
                } else {
                    EzUx.setInputValue(
                        EzInviteEmployeeDialog.ezInstance.ezIds.inputs.emailAddressInputId,
                        EzInviteEmployeeDialog.ezInstance.employeeUser.emailUserName.toLowerCase());
                }

                EzInviteEmployeeDialog.ezInstance.ezPhoneNumber = EzInviteEmployeeDialog.ezInstance.activeEmployee.mobilePhone;

                if (EzUx.elementExists(EzInviteEmployeeDialog.ezInstance.ezIds.roleSelectInputId)) {
                    EzUx.setSelectValue(
                        EzInviteEmployeeDialog.ezInstance.ezIds.roleSelectInputId,
                        primaryRole);
                }

                return EzInviteEmployeeDialog.ezInstance.ezLoadEmployeeUserPermissions()
                    .then(
                        () => EzInviteEmployeeDialog.ezInstance.ezLoadEmployeeTimeOffBank())
                    .then(
                        finished,
                        finished);
            });
    }

    /**
     * @public @method
     * Updates the dialog to the add employee mode state
     */
    ezResetAddEmployeeState() {
        return EzPromise.asyncAction(
            (finished) => {
                EzUx.id$(EzInviteEmployeeDialog.ezInstance.ezDialogId).dialog({
                    title: 'Add Employee'
                });

                EzUx.hide(EzInviteEmployeeDialog.ezInstance.ezIds.buttons.updateButtonId);

                EzUx.show(EzInviteEmployeeDialog.ezInstance.ezIds.inputs.sendInviteRadioButtonSetId);

                EzUx.show(EzInviteEmployeeDialog.ezInstance.ezIds.buttons.inviteButtonId);

                return finished();
            });
    }

    /**
     * @public @method
     * Resets the ui to the initial defaults
     */
    ezReset() {
        return EzPromise.asyncAction(
            (finished) => {
                EzUx.setCheckboxValue(
                    EzInviteEmployeeDialog.ezInstance.ezIds.inputs.sendInviteByEmailRadioId,
                    true);

                EzUx.setInputValue(
                    EzInviteEmployeeDialog.ezInstance.ezIds.inputs.employeeNameInputId,
                    EzString.EMPTY);

                EzUx.setInputValue(
                    EzInviteEmployeeDialog.ezInstance.ezIds.inputs.emailAddressInputId,
                    EzString.EMPTY);

                EzInviteEmployeeDialog.ezInstance.ezPhoneNumber = EzString.EMPTY;

                EzUx.setInputValue(
                    EzInviteEmployeeDialog.ezInstance.ezIds.inputs.pinNumberInputId,
                    EzString.EMPTY);

                EzUx.setInputValue(
                    EzInviteEmployeeDialog.ezInstance.ezIds.inputs.hourlyRateInputId,
                    EzString.EMPTY);

                EzUx.setInputValue(
                    EzInviteEmployeeDialog.ezInstance.ezIds.inputs.yearlyPTOBankInputid, EzString.EMPTY
                );

                EzUx.setInputValue(
                    EzInviteEmployeeDialog.ezInstance.ezIds.inputs.yearlySickBankInputid, EzString.EMPTY
                );

                EzUx.setSelectValue(
                    EzInviteEmployeeDialog.ezInstance.ezIds.roleSelectInputId,
                    EzUserRole.ROLE_EMPLOYEE);

                if (EzUx.elementExists(EzInviteEmployeeDialog.ezInstance.ezDialogId)) {
                    EzUx.id$(EzInviteEmployeeDialog.ezInstance.ezDialogId).dialog(
                        'option',
                        'position',
                        {
                            my: 'center',
                            at: 'center',
                            of: window,
                            collision: 'fit'
                        });
                }

                EzInviteEmployeeDialog.ezInstance.ezUserPermissions[
                    EzUserPermissionType.DISALLOW_EMPLOYEE_MOBILE_TIMEENTRY] = null;

                EzInviteEmployeeDialog.ezInstance.ezUserPermissions[
                    EzUserPermissionType.DISALLOW_EMPLOYEE_WEB_TIMEENTRY] = null;

                EzInviteEmployeeDialog.ezInstance.ezUserPermissions[
                    EzUserPermissionType.DISALLOW_EMPLOYEE_TIMEENTRY] = null;

                EzInviteEmployeeDialog.ezInstance.ezUserPermissions[
                    EzUserPermissionType.DISALLOW_VIEW_OTHER_EMPLOYEE_PAY_INFO] = null;

                EzUx.setCheckboxValue(
                    EzInviteEmployeeDialog.ezInstance.ezIds.allowMobileClockInOutCheckboxId,
                    true);

                EzUx.setCheckboxValue(
                    EzInviteEmployeeDialog.ezInstance.ezIds.allowWebsiteClockInOutCheckboxId,
                    true);

                return 'UPDATE' === EzInviteEmployeeDialog.ezInstance.ezDialogMode &&
                    EzObject.isValid(EzInviteEmployeeDialog.ezInstance.activeEmployee)
                    ? EzInviteEmployeeDialog.ezInstance.ezResetUpdateEmployeeState()
                        .then(EzInviteEmployeeDialog.ezInstance.ezPostResetActions)
                        .then(finished)
                    : EzInviteEmployeeDialog.ezInstance.ezResetAddEmployeeState()
                        .then(EzInviteEmployeeDialog.ezInstance.ezPostResetActions)
                        .then(finished);
            });
    }

    /**
     * @public @method
     * Additional reset actions to perform after the initial ezReset call is complete.
     * @returns {Promise.resolve}
     */
    ezPostResetActions() {
        return EzPromise.asyncAction(
            (finished) => {
                EzInviteEmployeeDialog.ezInstance.ezCurrentNavigationButtonId = EzInviteEmployeeDialog.ezInstance.ezIds.navigationEmployeeInfoButtonId;

                EzInviteEmployeeDialog.ezInstance.ezCurrentNavigationViewId = EzInviteEmployeeDialog.ezInstance.ezIds.navigationViewEmployeeInfoId;

                EzUx.findElement(EzInviteEmployeeDialog.ezInstance.ezIds.navigationEmployeeInfoButtonId).dataset['state'] =
                    EzNavigationButtonState.SELECTED;

                EzUx.findElement(EzInviteEmployeeDialog.ezInstance.ezIds.navigationEmployeePermissionsButtonId).dataset['state'] =
                    EzNavigationButtonState.UNSELECTED;

                EzUx.findElement(EzInviteEmployeeDialog.ezInstance.ezIds.navigationEmployeeTimeOffBankButtonId).dataset['state'] =
                    EzNavigationButtonState.UNSELECTED;

                EzUx.hide(EzInviteEmployeeDialog.ezInstance.ezIds.navigationViewEmployeePermissionsId);

                EzUx.hide(EzInviteEmployeeDialog.ezInstance.ezIds.navigationViewEmployeeTimeoffBankId);

                EzUx.show(EzInviteEmployeeDialog.ezInstance.ezIds.navigationViewEmployeeInfoId);

                let inviteInfoHTML = EzInviteEmployeeDialog.ezInstance.ezBuildEmployeeInviteInfoHtml();

                if (EzString.hasLength(inviteInfoHTML)) {
                    EzUx.setContent(
                        `${EzInviteEmployeeDialog.ezInstance.ezDialogId}_InviteInfoContainer`,
                        inviteInfoHTML);

                    EzUx.show(`${EzInviteEmployeeDialog.ezInstance.ezDialogId}_InviteInfoContainer`);
                } else {
                    EzUx.hide(`${EzInviteEmployeeDialog.ezInstance.ezDialogId}_InviteInfoContainer`);
                }

                EzUx.hide(EzInviteEmployeeDialog.ezInstance.ezIds.validationErrorMessageBoxId);

                EzInviteEmployeeDialog.ezInstance.ezResetValidationErrors();

                EzInviteEmployeeDialog.ezInstance.ezUpdateRoleHelp();

                return finished();
            });
    }

    /**
     * @public @method
     * Loads the employee permissions into the ux
     * @returns {Promise.resolve}
     */
    ezLoadEmployeeUserPermissions() {
        EzUx.setCheckboxValue(
            EzInviteEmployeeDialog.ezInstance.ezIds.allowWebsiteClockInOutCheckboxId,
            true);

        return EzPromise.asyncAction(
            (finished) => {
                EzInviteEmployeeDialog.ezInstance.ezGetUserPermission(
                    EzUserPermissionType.DISALLOW_EMPLOYEE_MOBILE_TIMEENTRY)
                    .then(
                        (disallowEmployeeMobileTimeEntryPermission) => {
                            EzUx.setCheckboxValue(
                                EzInviteEmployeeDialog.ezInstance.ezIds.allowMobileClockInOutCheckboxId,
                                !disallowEmployeeMobileTimeEntryPermission.enabled);

                            EzInviteEmployeeDialog.ezInstance.ezGetUserPermission(
                                EzUserPermissionType.DISALLOW_EMPLOYEE_WEB_TIMEENTRY)
                                .then(
                                    (disallowEmployeeWebTimeEntryPermission) => {
                                        EzUx.setCheckboxValue(
                                            EzInviteEmployeeDialog.ezInstance.ezIds.allowWebsiteClockInOutCheckboxId,
                                            !disallowEmployeeWebTimeEntryPermission.enabled);

                                        // Check for legacy value and only set if it was enabled
                                        EzInviteEmployeeDialog.ezInstance.ezGetUserPermission(
                                            EzUserPermissionType.DISALLOW_EMPLOYEE_TIMEENTRY)
                                            .then(
                                                (disallowEmployeeTimeentryPermission) => {
                                                    if (disallowEmployeeTimeentryPermission.enabled) {
                                                        EzUx.setCheckboxValue(
                                                            EzInviteEmployeeDialog.ezInstance.ezIds.allowMobileClockInOutCheckboxId,
                                                            false);
                                                    }

                                                    return finished();
                                                });
                                    });
                        });
            });
    }

    /**
     * @public @method
     * Loads the employee time off bank into the ux
     * @returns {Promise.resolve}
     */
    ezLoadEmployeeTimeOffBank() {
        const activeEmployeeId = EzInviteEmployeeDialog.ezInstance.activeEmployee.id;

        let url = `${ezApi.ezclocker.ezNavigation.ezGetInternalApiUrl('timeoff-bank', 'v1')}/employee/${activeEmployeeId}`;

        ezApi.ezclocker.ezUi.ezPageWaitExecute(
            'Fetching time off bank requests ...',
            (waitDone) => ezApi.ezclocker.ezHttpHelper.ezGet(url)
                .then(
                    ezApi.ezclocker.ezServices.ezProcessApiResolve,
                    ezApi.ezclocker.ezServices.ezProcessApiReject)
                .then(
                    (response) => {
                        EzInviteEmployeeDialog.ezInstance.ezBankTimeOffResponse = response.entities;

                        response.entities.forEach(
                            timeOffBank => {
                                if (timeOffBank.ezTimeOffBankType === 'PAID_PTO') {
                                    EzUx.setInputValue(EzInviteEmployeeDialog.ezInstance.ezIds.inputs.yearlyPTOBankInputid, timeOffBank.bankDecimalHours);

                                } else if (timeOffBank.ezTimeOffBankType === 'PAID_SICK') {
                                    EzUx.setInputValue(EzInviteEmployeeDialog.ezInstance.ezIds.inputs.yearlySickBankInputid, timeOffBank.bankDecimalHours);

                                }
                            });

                        waitDone();
                    },
                    (eResponse) => waitDone()
                        .then(
                            () => ezApi.ezclocker.ezDialog.ezShowPossibleDefectError(
                                'Error Obtaining Time Off Bank Data',
                                eResponse.message,
                                eResponse,
                                ezApi.ezEM`URL: ${url}`)
                        )
                )
        );
    }

    /**
     * @proteccted @method
     * Removes the employee's user permission with the permissionId equal to the one provided.
     * @param {string} permissionId
     * @returns {Promise}
     * Resolve returns success response
     * Reject returns error response
     */
    ezRemoveEmployeeUserPermission(permissionId) {
        let ezClockerIdContext = new EzClockerIdContext();

        ezClockerIdContext.ezLoadIdsFromEzClockerContext(
            EzObject.isValid(EzInviteEmployeeDialog.ezInstance.activeEmployee)
                ? EzInviteEmployeeDialog.ezInstance.activeEmployee
                : -1);


        return EzUserPermissionsClient.ezInstance.ezRemoveAllEmployeeUserPermissionForPermissionId(
            ezClockerIdContext,
            permissionId);
    }

    /**
     * @proteccted @method
     * Returns the EzUserPermission for the provided permissionId for the active employee or
     * Returns the default state of the EzUserPermission for the provided permissionId.
     * @param {string} permissionId
     * @returns {Promise.resolve}
     * Resolve returns the EzUserPermission instance
     */
    ezGetUserPermission(permissionId) {
        return EzPromise.asyncAction(
            (finished) => {
                let ezClockerIdContext = new EzClockerIdContext();

                ezClockerIdContext.ezLoadIdsFromEzClockerContext(
                    EzObject.isValid(EzInviteEmployeeDialog.ezInstance.activeEmployee)
                        ? EzInviteEmployeeDialog.ezInstance.activeEmployee
                        : -1);

                let currentUserRoles = EzInviteEmployeeDialog.ezInstance.ezBuildEmployeeAuthorities();

                return EzUserPermissionsClient.ezInstance.ezReadEmployeeUserPermissionForPermissionId(
                    ezClockerIdContext, permissionId)
                    .then(
                        (ezUserPermission) => {
                            ezUserPermission = EzObject.isValid(ezUserPermission)
                                ? ezUserPermission
                                : new EzUserPermission(
                                    ezClockerIdContext.ezGetActiveEmployerId(),
                                    ezClockerIdContext.ezGetActiveEmployeeId(),
                                    permissionId,
                                    EzUserPermissionType.ezGetPermissionIdDefaultValue(permissionId),
                                    EzUserPermissionType.isUserPermissionIdEnabledByDefaultForAtLeastOneUserRole(
                                        permissionId, currentUserRoles));

                            return finished(ezUserPermission);
                        },
                        () => finished(
                            new EzUserPermission(
                                ezClockerIdContext.ezGetActiveEmployerId(),
                                ezClockerIdContext.ezGetActiveEmployeeId(),
                                permissionId,
                                EzUserPermissionType.ezGetPermissionIdDefaultValue(permissionId),
                                EzUserPermissionType.isUserPermissionIdEnabledByDefaultForAtLeastOneUserRole(
                                    permissionId, currentUserRoles))));
            });
    }

    /**
     * @proteccted @method
     * Adds the default employee permissions for teams.
     * @param {object} employee
     * @returns {Promise}
     */
    ezSetEmployeeTeamPermissions(employee) {
        if (!EzObject.isValid(employee) || !EzString.hasLength(employee.teamPin)) {
            return ezApi.ezResolve(employee);
        }

        let url = ezApi.ezclocker.nav.getInternalApiUrl(`users/${employee.id}/permissions`);

        let payload = EzJson.toJson({
            employeeId: employee.id,
            enabled: EzString.hasLength(employee.teamPin),
            permissionId: 'DISALLOW_EMPLOYEE_TIMEENTRY'
        });

        return EzPromise.promise(
            (resolve, reject) => ezApi.ezclocker.ezHttpHelper.ezPost(url, payload, true, null, false)
                .then(
                    resolve,
                    (eResponse) => {
                        if (404 == eResponse.errorCode) {
                            return resolve();
                        }

                        return reject(eResponse);
                    }));
    }

    /**
     * @proteccted @method
     * Toggles UX elements to match what the logged in user's role is.
     */
    ezApplyRoleToggles() {
        EzUx.hide(EzInviteEmployeeDialog.ezInstance.ezIds.roleSelectInput_DisabledInfoLabelId);

        EzUx.hide(EzInviteEmployeeDialog.ezInstance.ezIds.roleSelectInput_NoModificationLabelId);

        EzUx.hide(EzInviteEmployeeDialog.ezInstance.ezIds.roleSelectInput_RestrictedToEmployeeLabelId);

        if (ezApi.ezclocker.ezClockerContext.ezGetUserContext().isEmployer || ezApi.ezclocker.ezClockerContext.ezGetUserContext().isPayrollManager) {
            EzUx.enable(EzInviteEmployeeDialog.ezInstance.ezIds.roleSelectInputId);

            EzUx.hide(EzInviteEmployeeDialog.ezInstance.ezIds.roleSelectInput_DisabledInfoLabelId);

            EzUx.enable(EzInviteEmployeeDialog.ezInstance.ezIds.allowMobileClockInOutCheckboxId);

            EzUx.enable(EzInviteEmployeeDialog.ezInstance.ezIds.allowMobileClockInOutCheckboxId);
        } else if (ezApi.ezclocker.ezClockerContext.ezGetUserContext().isManager) {
            EzUx.disable(EzInviteEmployeeDialog.ezInstance.ezIds.roleSelectInputId);

            EzUx.disable(EzInviteEmployeeDialog.ezInstance.ezIds.allowMobileClockInOutCheckboxId);

            EzUx.disable(EzInviteEmployeeDialog.ezInstance.ezIds.allowMobileClockInOutCheckboxId);

            if ('UPDATE' === EzInviteEmployeeDialog.ezInstance.ezDialogMode) {
                if (ezApi.ezclocker.ezClockerContext.ezGetUserContext().userAccount.id === EzInviteEmployeeDialog.ezInstance.activeEmployee.userId) {
                    EzUx.show(EzInviteEmployeeDialog.ezInstance.ezIds.roleSelectInput_DisabledInfoLabelId);
                } else {
                    EzUx.show(EzInviteEmployeeDialog.ezInstance.ezIds.roleSelectInput_NoModificationLabelId);
                }
            } else {
                EzUx.disable(EzInviteEmployeeDialog.ezInstance.ezIds.allowMobileClockInOutCheckboxId);

                EzUx.disable(EzInviteEmployeeDialog.ezInstance.ezIds.allowMobileClockInOutCheckboxId);

                EzUx.show(EzInviteEmployeeDialog.ezInstance.ezIds.roleSelectInput_RestrictedToEmployeeLabelId);
            }
        }

        let inputType2 = ezApi.ezclocker.ezClockerContext.ezGetUserContext().isManager
            ? `${EzInviteEmployeeDialog.ezInstance.ezIds.inputs.hourlyRateInputPrefixId}A`
            : `${EzInviteEmployeeDialog.ezInstance.ezIds.inputs.hourlyRateInputPrefixId}B`;

        EzInviteEmployeeDialog.ezInstance.ezIds.inputs.hourlyRateInputId = ezApi.ezclocker.ezClockerContext.ezGetUserContext().isManager
            ? `${EzInviteEmployeeDialog.ezInstance.ezIds.inputs.hourlyRateInputPrefixId}B`
            : `${EzInviteEmployeeDialog.ezInstance.ezIds.inputs.hourlyRateInputPrefixId}A`;

        if (EzUx.elementExists(inputType2)) {
            EzUx.removeElement(inputType2);
        }

        if (EzInviteEmployeeDialog.ezInstance.activeEmployee) {
            EzUx.setInputValue(
                EzInviteEmployeeDialog.ezInstance.ezIds.inputs.hourlyRateInputId,
                EzObject.assignOrDefault(
                    EzInviteEmployeeDialog.ezInstance.activeEmployee?.hourlyRate?.toFixed(2),
                    '0.00'));
        } else {
            EzUx.setInputValue(
                EzInviteEmployeeDialog.ezInstance.ezIds.inputs.hourlyRateInputId,
                '0.00');
        }

        ezApi.ezclocker.ezEventEngine.ezWantElementEvent(
            EzInviteEmployeeDialog.ezInstance.ezIds.inputs.hourlyRateInputId,
            EzElementEventName.BLUR,
            EzInviteEmployeeDialog.ezApiName,
            EzInviteEmployeeDialog.ezInstance.ezOnHourlyRateBlur);
    }

    /**
     * @public @method
     * Displays the dialog
     */
    ezShow(dialgoMode, activeEmployee, employeeUser) {
        EzInviteEmployeeDialog.ezInstance.ezDialogMode = EzString.hasLength(dialgoMode)
            ? dialgoMode
            : 'ADD';

        EzInviteEmployeeDialog.ezInstance.activeEmployee = EzObject.isValid(activeEmployee)
            ? activeEmployee
            : null;

        EzInviteEmployeeDialog.ezInstance.employeeUser = EzObject.isValid(employeeUser)
            ? employeeUser
            : null;

        EzInviteEmployeeDialog.ezInstance.ezReset()
            .then(
                () => {
                    ezApi.ezclocker.ezDialog.ezShowDialog(EzInviteEmployeeDialog.ezInstance.ezDialogId)
                        .then(
                            () => {
                                EzInviteEmployeeDialog.ezInstance.ezApplyRoleToggles();

                                EzUx.focus(EzInviteEmployeeDialog.ezInstance.ezIds.inputs.employeeNameInputId);

                                ezApi.ezclocker.ezEventEngine.ezTriggerEvent(
                                    EzInviteEmployeeDialog.ezEventNames.onInviteEmployeeDialogShow,
                                    ezApi.ezclocker.ezEventEngine.ezBuildEventData(
                                        EzInviteEmployeeDialog.ezApiName,
                                        'Invite or add employee dialog is visible',
                                        EzInviteEmployeeDialog.ezInstance));
                            });
                });
    }

    /**
     * @public @method
     * Closes the dialog
     */
    ezClose() {
        ezApi.ezclocker.ezDialog.ezCloseDialog(EzInviteEmployeeDialog.ezInstance.ezDialogId);
    }

    /**
     * @public @method
     * Cancels the add/invite dialog without performing any modifications or additions.
     */
    ezCancel() {
        if ('ADD' === EzInviteEmployeeDialog.ezInstance.ezDialogMode) {
            ezApi.ezclocker.ezEventEngine.ezTriggerEvent(
                EzInviteEmployeeDialog.ezEventNames.onInviteEmployeeDialogEmployeeAddCanceled,
                EzInviteEmployeeDialog.ezApiName,
                ezApi.ezclocker.ezEventEngine.ezBuildEventData(
                    EzInviteEmployeeDialog.ezApiName,
                    'Add employee dialog was canceled',
                    EzInviteEmployeeDialog.ezInstance));
        } else {
            ezApi.ezclocker.ezEventEngine.ezTriggerEvent(
                EzInviteEmployeeDialog.ezEventNames.onInviteEmployeeDialogEmployeeUpdateCanceled,
                EzInviteEmployeeDialog.ezApiName,
                ezApi.ezclocker.ezEventEngine.ezBuildEventData(
                    EzInviteEmployeeDialog.ezApiName,
                    'Invite employee dialog was canceled',
                    EzInviteEmployeeDialog.ezInstance));
        }

        ezApi.ezclocker.ezEventEngine.ezTriggerEvent(
            EzInviteEmployeeDialog.ezEventNames.onInviteEmployeeDialogCanceled,
            ezApi.ezclocker.ezEventEngine.ezBuildEventData(
                EzInviteEmployeeDialog.ezApiName,
                'Invite/add employee dialog was canceled',
                EzInviteEmployeeDialog.ezInstance));

        EzInviteEmployeeDialog.ezInstance.ezClose();
    }

    /**
     * @public @method
     * Determines the user permissions to apply upon submit
     */
    ezGatherUserPermissions() {
        let userPermissions = [];

        let ezClockerIdContext = new EzClockerIdContext();

        ezClockerIdContext.ezLoadIdsFromEzClockerContext(
            EzObject.isValid(EzInviteEmployeeDialog.ezInstance.activeEmployee)
                ? EzInviteEmployeeDialog.ezInstance.activeEmployee
                : -1);

        let employeeRoles = EzInviteEmployeeDialog.ezInstance.ezBuildEmployeeAuthorities();

        userPermissions.push(
            new EzUserPermission(
                ezClockerIdContext.ezGetActiveEmployerId(),
                ezClockerIdContext.ezGetActiveEmployeeId(),
                EzUserPermissionType.DISALLOW_EMPLOYEE_MOBILE_TIMEENTRY,
                null,
                employeeRoles.includes(EzUserRole.ROLE_EMPLOYEE) &&
                !EzUx.isCheckboxChecked(EzInviteEmployeeDialog.ezInstance.ezIds.allowMobileClockInOutCheckboxId),
                EzUserPermissionType.ezGetPermissionIdChildRestrictions(EzUserPermissionType.DISALLOW_EMPLOYEE_MOBILE_TIMEENTRY),
                EzUserPermissionType.ezGetPermissionIdAppliesToRoles(EzUserPermissionType.DISALLOW_EMPLOYEE_MOBILE_TIMEENTRY)));

        userPermissions.push(
            new EzUserPermission(
                ezClockerIdContext.ezGetActiveEmployerId(),
                ezClockerIdContext.ezGetActiveEmployeeId(),
                EzUserPermissionType.DISALLOW_EMPLOYEE_WEB_TIMEENTRY,
                null,
                employeeRoles.includes(EzUserRole.ROLE_EMPLOYEE) &&
                !EzUx.isCheckboxChecked(EzInviteEmployeeDialog.ezInstance.ezIds.allowWebsiteClockInOutCheckboxId),
                EzUserPermissionType.ezGetPermissionIdChildRestrictions(EzUserPermissionType.DISALLOW_EMPLOYEE_WEB_TIMEENTRY),
                EzUserPermissionType.ezGetPermissionIdAppliesToRoles(EzUserPermissionType.DISALLOW_EMPLOYEE_WEB_TIMEENTRY)));

        return userPermissions;
    }

    /**
     * @public @method
     * Submits the employee invite dialog data changes
     */
    ezSubmit() {
        EzInviteEmployeeDialog.ezInstance.ezValidate()
            .then(
                (validated) => {
                    if (EzBoolean.isFalse(validated) ||
                        ('UPDATE' !== EzInviteEmployeeDialog.ezInstance.ezDialogMode && !EzInviteEmployeeDialog.ezInstance.ezValidateInviteSelection()) ||
                        !EzInviteEmployeeDialog.ezInstance.ezValidateTimeoffBankValues()) {
                        document.getElementById(EzInviteEmployeeDialog.ezInstance.ezIds.navigationEmployeeInfoButtonId).click();

                        return;
                    }

                    if ('UPDATE' === EzInviteEmployeeDialog.ezInstance.ezDialogMode) {
                        let ezUpdateEmployeeInfoRequestEntity = EzInviteEmployeeDialog.ezInstance.ezBuildUpdateEmployeeInfoRequestEntity();

                        EzInviteEmployeeDialog.ezInstance.ezSubmitUpdatedEmployeeInfo(ezUpdateEmployeeInfoRequestEntity);

                        // TODO: Fix Amplitude before re-enabling
                        /*
                        ezApi.ezclocker.ezAmplitudeIntegration.ezTrack(
                            'EZ_UX_EMPLOYEE_UPDATED',
                            'Updated employee information.',
                            ezUpdateEmployeeInfoRequestEntity);
                        */
                    } else {
                        let ezEmployeeInviteRequest = EzInviteEmployeeDialog.ezInstance.ezBuildEzEmployeeInviteRequest();

                        EzInviteEmployeeDialog.ezInstance.ezSubmitAddEmployee(ezEmployeeInviteRequest);

                        // TODO: Fix Amplitude before re-enabling
                        /*
                        ezApi.ezclocker.ezAmplitudeIntegration.ezTrack(
                            'EZ_INVITE_EMPLOYEE',
                            'Invited a new employee',
                            ezEmployeeInviteRequest);
                        */
                    }
                });
    }

    /**
     * @public @method
     * Builds the Add/update employee payload's permission array
     * @returns {array}
     */
    ezBuildPaylodPermissions() {
        let userPermissions = EzInviteEmployeeDialog.ezInstance.ezGatherUserPermissions();

        let payloadPermissions = [];

        for (let ezUserPermission of userPermissions) {
            if (ezUserPermission.enabled) {

                // Push in the child restrictions (if any)
                if (ezApi.ezArrayHasLength(ezUserPermission.ezGetChildRestrictions())) {
                    ezUserPermission.ezGetChildRestrictions().forEach(
                        (childRestriction) => {
                            if (EzString.hasLength(childRestriction)) {
                                payloadPermissions.push(childRestriction);
                            }
                        });

                    // Add the main permission id
                    if (EzString.hasLength(ezUserPermission.permissionId)) {
                        payloadPermissions.push(ezUserPermission.permissionId);
                    }
                }
            }
        }

        return payloadPermissions;
    }

    /**
     * @protected  @method
     * Returns the signs-in with input value.
     * @returns {string}
     */
    ezGetSignsInWith() {
        return EzString.stringOrEmpty(
            EzUx.getInputValue(
                `${EzInviteEmployeeDialog.ezInstance.ezDialogId}_EmployeeSignsInWith`));
    }

    /**
     * @public @method
     * Builds the EzUpdateEmployeeInfoRequestEntity instance used as the payload when updating employee information
     * @returns {EzUpdateEmployeeInfoRequestEntity}
     */
    ezBuildUpdateEmployeeInfoRequestEntity() {
        let ezClockerIdContext = new EzClockerIdContext();

        ezClockerIdContext.ezLoadIdsFromEzClockerContext(EzInviteEmployeeDialog.ezInstance.activeEmployee);

        ezClockerIdContext.userId = EzInviteEmployeeDialog.ezInstance.activeEmployee.userId;

        return new EzUpdateEmployeeInfoRequestEntity(
            // ezClockerIdContext,
            ezClockerIdContext,
            // Employee Name
            EzString.hasLength(EzInviteEmployeeDialog.ezInstance.ezEmployeeName)
                ? EzInviteEmployeeDialog.ezInstance.ezEmployeeName
                : null,
            // Employee email
            EzString.hasLength(EzInviteEmployeeDialog.ezInstance.ezEmailAddress)
                ? EzInviteEmployeeDialog.ezInstance.ezEmailAddress
                : null,
            // mobilePhone
            EzString.hasLength(EzInviteEmployeeDialog.ezInstance.ezPhoneNumber)
                ? EzInviteEmployeeDialog.ezInstance.ezPhoneNumber
                : null,
            // username
            // This is the generated non-email and non-mobile phone user name. The user is not
            // able to update or change this value at this time. It is generated once during the
            // add employee if it needs set.
            null,
            // hourlyRate
            EzInviteEmployeeDialog.ezInstance.ezHourlyRate,
            // pin
            EzInviteEmployeeDialog.ezInstance.ezPinNumber,
            // authorities
            EzInviteEmployeeDialog.ezInstance.ezBuildEmployeeAuthorities(),
            // permissions
            EzInviteEmployeeDialog.ezInstance.ezBuildPaylodPermissions());
    }

    /**
     * @protected  @method
     * Calls the update employee info service
     * @param {EzUpdateEmployeeInfoRequestEntity} ezUpdateEmployeeInfoRequestEntity
     */
    ezSubmitUpdatedEmployeeInfo(ezUpdateEmployeeInfoRequestEntity) {
        if (!EzObject.isValid(ezUpdateEmployeeInfoRequestEntity)) {
            throw new EzBadParamException(
                'ezUpdateEmployeeInfoRequestEntity',
                EzInviteEmployeeDialog.ezInstance,
                EzInviteEmployeeDialog.ezInstance.ezSubmitUpdatedEmployeeInfo);
        }

        /*
        Moved to: EzInviteEmployeeDialog.ezInstance.ezBuildUpdateEmployeeInfoRequestEntity()
        let ezClockerIdContext = new EzClockerIdContext();

        ezClockerIdContext.ezLoadIdsFromEzClockerContext(EzInviteEmployeeDialog.ezInstance.activeEmployee);

        ezClockerIdContext.userId = EzInviteEmployeeDialog.ezInstance.activeEmployee.userId;

       let ezUpdateEmployeeInfoRequestEntity = new EzUpdateEmployeeInfoRequestEntity(
            // ezClockerIdContext,
            ezClockerIdContext,
            // Employee Name
            EzString.hasLength(EzInviteEmployeeDialog.ezInstance.ezEmployeeName)
                ? EzInviteEmployeeDialog.ezInstance.ezEmployeeName
                : null,
            // Employee email
            EzString.hasLength(EzInviteEmployeeDialog.ezInstance.ezEmailAddress)
                ? EzInviteEmployeeDialog.ezInstance.ezEmailAddress
                : null,
            // mobilePhone
            EzString.hasLength(EzInviteEmployeeDialog.ezInstance.ezPhoneNumber)
                ? EzInviteEmployeeDialog.ezInstance.ezPhoneNumber
                : null,
            // username
            // This is the generated non-email and non-mobile phone user name. The user is not
            // able to update or change this value at this time. It is generated once during the
            // add employee if it needs set.
            null,
            // hourlyRate
            EzInviteEmployeeDialog.ezInstance.ezHourlyRate,
            // pin
            EzInviteEmployeeDialog.ezInstance.ezPinNumber,
            // authorities
            EzInviteEmployeeDialog.ezInstance.ezBuildEmployeeAuthorities(),
            // permissions
            EzInviteEmployeeDialog.ezInstance.ezBuildPaylodPermissions());*/

        return ezApi.ezclocker.ezUi.ezStartPageWaitExecute(
            `Updating employee ${EzInviteEmployeeDialog.ezInstance.ezEmployeeName} ...`,
            (waitDone) => ezApi.ezclocker.ezHttpHelper.ezPut(
                ezApi.ezclocker.ezNavigation.ezGetInternalApiUrl(
                    `employees/${EzInviteEmployeeDialog.ezInstance.activeEmployee.id}`,
                    'v2'),
                EzJson.toJson(ezUpdateEmployeeInfoRequestEntity))
                .then(
                    ezApi.ezclocker.ezHttpHelper.ezProcessApiResolve,
                    ezApi.ezclocker.ezHttpHelper.ezProcessApiReject)
                .then(
                    (response) => {
                        ezApi.ezclocker.ezEventEngine.ezTriggerEvent(
                            EzInviteEmployeeDialog.ezEventNames.onInviteEmployeeDialogEmployeeUpdated,
                            ezApi.ezclocker.ezEventEngine.ezBuildEventData(
                                EzInviteEmployeeDialog.ezApiName,
                                'Updated employee',
                                response));

                        return EzInviteEmployeeDialog.ezInstance.ezSetEmployeeTeamPermissions(response.employee)
                            .then(
                                () => waitDone()
                                    .then(
                                        () => EzInviteEmployeeDialog.ezInstance.ezUpdateTimeOffBankValuesForEmployee(null))
                                    .then(EzInviteEmployeeDialog.ezInstance.ezClose),
                                (eResponse) => {
                                    ezApi.ezclocker.ezLogger.error(
                                        EzString.em`
                                            Failed to set DISALLOW_EMPOLOYEE_TIMEENTRY value for
                                            employeeId=${response.employee.id}. Error: ${EzJson.toJson(eResponse)}`);

                                    return waitDone()
                                        .then(
                                            () => {
                                                EzInviteEmployeeDialog.ezInstance.ezClose();

                                                ezApi.ezclocker.ezEventEngine.ezTriggerEvent(
                                                    EzInviteEmployeeDialog.ezEventNames.onInviteEmployeeDialogEmployeeUpdateError,
                                                    ezApi.ezclocker.ezEventEngine.ezBuildEventData(
                                                        EzInviteEmployeeDialog.ezApiName,
                                                        'Update employee error',
                                                        eResponse));

                                                return EzInviteEmployeeDialog.ezInstance.ezReportResponseError(eResponse);
                                            });
                                });
                    },
                    (eResponse) => waitDone()
                        .then(
                            () => {
                                ezApi.ezclocker.ezEventEngine.ezTriggerEvent(
                                    EzInviteEmployeeDialog.ezEventNames.onInviteEmployeeDialogEmployeeUpdateError,
                                    ezApi.ezclocker.ezEventEngine.ezBuildEventData(
                                        EzInviteEmployeeDialog.ezApiName,
                                        'Update employee error',
                                        eResponse));

                                return EzInviteEmployeeDialog.ezInstance.ezReportResponseError(eResponse);
                            })));
    }

    /**
     * @public @method
     * Builds the EzEmployeeInviteRequest instance used as the payload when inviting a new employee
     * @returns {EzEmployeeInviteRequest}
     */
    ezBuildEzEmployeeInviteRequest() {
        return new EzEmployeeInviteRequest(
            // employerId
            ezApi.ezclocker.ezClockerContext.ezGetActiveEmployer().id,
            // name
            EzInviteEmployeeDialog.ezInstance.ezEmployeeName,
            // email
            EzString.hasLength(EzInviteEmployeeDialog.ezInstance.ezEmailAddress)
                ? EzInviteEmployeeDialog.ezInstance.ezEmailAddress
                : null,
            // mobilePhone
            ezApi.ezStringOrNull(EzInviteEmployeeDialog.ezInstance.ezPhoneNumber)
                ? EzInviteEmployeeDialog.ezInstance.ezPhoneNumber
                : null,
            // username
            // This is the generated non-email and non-mobile phone user name. The user is not
            // able to set this value at this time as it is generated on the server.
            null,
            // hourlyRate
            !ezApi.ezclocker.ezClockerContext.ezGetUserContext().isManager
                ? EzInviteEmployeeDialog.ezInstance.ezHourlyRate
                : null,
            // pin
            EzString.hasLength(EzInviteEmployeeDialog.ezInstance.ezPinNumber)
                ? EzInviteEmployeeDialog.ezInstance.ezPinNumber
                : null,
            // authorities
            EzInviteEmployeeDialog.ezInstance.ezBuildEmployeeAuthorities(),
            // permissions
            EzInviteEmployeeDialog.ezInstance.ezBuildPaylodPermissions(),
            // sendInviteByEmail
            EzString.hasLength(EzInviteEmployeeDialog.ezInstance.ezEmailAddress) && EzInviteEmployeeDialog.ezInstance.ezSendInviteByEmail,
            // sendInviteToMobilePhone
            EzString.hasLength(EzInviteEmployeeDialog.ezInstance.ezPhoneNumber) && EzInviteEmployeeDialog.ezInstance.ezSendInviteBySMSInvite);
    }

    /**
     * @public @method
     * Submits the add new employee information to the employer/invite-employee service.
     * @param {EzEmployeeInviteRequest} ezEmployeeInviteRequest
     */
    ezSubmitAddEmployee(ezEmployeeInviteRequest) {
        if (!EzObject.isValid(ezEmployeeInviteRequest)) {
            throw new EzBadParamException(
                'ezEmployeeInviteRequest',
                EzInviteEmployeeDialog.ezInstance,
                EzInviteEmployeeDialog.ezInstance.ezSubmitAddEmployee);
        }

        /* Moved to: EzInviteEmployeeDialog.ezInstance.ezBuildEzEmployeeInviteRequest()
        let ezEmployeeInviteRequest = new EzEmployeeInviteRequest(
            // employerId
            ezApi.ezclocker.ezClockerContext.ezGetActiveEmployer().id,
            // name
            EzInviteEmployeeDialog.ezInstance.ezEmployeeName,
            // email
            EzString.hasLength(EzInviteEmployeeDialog.ezInstance.ezEmailAddress)
                ? EzInviteEmployeeDialog.ezInstance.ezEmailAddress
                : null,
            // mobilePhone
            ezApi.ezStringOrNull(EzInviteEmployeeDialog.ezInstance.ezPhoneNumber)
                ? EzInviteEmployeeDialog.ezInstance.ezPhoneNumber
                : null,
            // username
            // This is the generated non-email and non-mobile phone user name. The user is not
            // able to set this value at this time as it is generated on the server.
            null,
            // hourlyRate
            !ezApi.ezclocker.ezClockerContext.ezGetUserContext().isManager
                ? EzInviteEmployeeDialog.ezInstance.ezHourlyRate
                : null,
            // pin
            EzString.hasLength(EzInviteEmployeeDialog.ezInstance.ezPinNumber)
                ? EzInviteEmployeeDialog.ezInstance.ezPinNumber
                : null,
            // authorities
            EzInviteEmployeeDialog.ezInstance.ezBuildEmployeeAuthorities(),
            // permissions
            EzInviteEmployeeDialog.ezInstance.ezBuildPaylodPermissions(),
            // sendInviteByEmail
            EzString.hasLength(EzInviteEmployeeDialog.ezInstance.ezEmailAddress) && EzInviteEmployeeDialog.ezInstance.ezSendInviteByEmail,
            // sendInviteToMobilePhone
            EzString.hasLength(EzInviteEmployeeDialog.ezInstance.ezPhoneNumber) && EzInviteEmployeeDialog.ezInstance.ezSendInviteBySMSInvite);
        */

        let payload = EzJson.toJson(ezEmployeeInviteRequest);

        ezApi.ezclocker.ezUi.ezStartPageWaitExecute(
            `Adding employee ${EzInviteEmployeeDialog.ezInstance.ezEmployeeName} ...`,
            (waitDone) => ezApi.ezclocker.ezHttpHelper.ezPost(
                ezApi.ezclocker.ezNavigation.ezGetInternalApiUrl('employer/invite-employee', 'v1'),
                payload)
                .then(
                    ezApi.ezclocker.ezHttpHelper.ezProcessApiResolve,
                    ezApi.ezclocker.ezHttpHelper.ezProcessApiReject)
                .then(
                    (response) => EzInviteEmployeeDialog.ezInstance.ezSetEmployeeTeamPermissions(response.employee)
                        .then(
                            () => waitDone()
                                .then(
                                    () => EzInviteEmployeeDialog.ezInstance.ezUpdateTimeOffBankValuesForEmployee(response?.employee?.id))
                                .then(
                                    () => {
                                        ezApi.ezclocker.ezEventEngine.ezTriggerEvent(
                                            EzInviteEmployeeDialog.ezEventNames.onInviteEmployeeDialogEmployeeAdded,
                                            ezApi.ezclocker.ezEventEngine.ezBuildEventData(
                                                EzInviteEmployeeDialog.ezApiName,
                                                'Added mew employee',
                                                response));

                                        EzInviteEmployeeDialog.ezInstance.ezClose();
                                    }),
                            (eResponse) => {
                                ezApi.ezclocker.ezLogger.error(
                                    EzString.em`
                                            Failed to set DISALLOW_EMPOLOYEE_TIMEENTRY value for
                                            employeeId=${response.employee.id}.
                                            Error: ${EzJson.toJson(eResponse)}`);

                                return waitDone()
                                    .then(
                                        () => {
                                            ezApi.ezclocker.ezEventEngine.ezTriggerEvent(
                                                EzInviteEmployeeDialog.ezEventNames.onInviteEmployeeDialogEmployeeAddError,
                                                ezApi.ezclocker.ezEventEngine.ezBuildEventData(
                                                    EzInviteEmployeeDialog.ezApiName,
                                                    'Add employee error',
                                                    eResponse));

                                            EzInviteEmployeeDialog.ezInstance.ezClose();
                                        });
                            }),
                    (eResponse) => waitDone()
                        .then(
                            () => {
                                ezApi.ezclocker.ezEventEngine.ezTriggerEvent(
                                    EzInviteEmployeeDialog.ezEventNames.onInviteEmployeeDialogEmployeeAddError,
                                    ezApi.ezclocker.ezEventEngine.ezBuildEventData(
                                        EzInviteEmployeeDialog.ezApiName,
                                        'Add employee error',
                                        eResponse));

                                return EzInviteEmployeeDialog.ezInstance.ezReportResponseError(eResponse);
                            })));
    }

    /**
     * @public @method
     * Reports the submit error response
     * @param {object} eResponse
     */
    ezReportResponseError(eResponse) {
        let errorDialogTitle = 'UPDATE' === EzInviteEmployeeDialog.ezInstance.ezDialogMode
            ? 'Update Employee Error'
            : 'Add Employee Error';

        if (!EzObject.isValid(eResponse)) {
            return ezApi.ezclocker.ezDialog.ezShowError(
                errorDialogTitle,
                EzString.em`
                    EzClocker encountered an unexpected error with no details.
                    ${EzDialog.REFRESH_PAGE_THEN_REPORT}`)
                .then(EzPromise.ignoreResolve);
        }

        ezApi.ezclocker.ezLogger.error(
            `${errorDialogTitle}: ${eResponse.message} [Error response: ${EzJson.toJson(eResponse)}]`);

        switch (eResponse.errorCode) {
            // User Exists
            case 8:
            // Phone number exists
            case 70:
            // User name exists
            case 71:
            // Email address exists
            case 700:
            // Cannot clear username error codes
            case 30:
            case 31:
            case 32:
                return ezApi.ezclocker.ezDialog.ezShowError(
                    'Account Already Exists',
                    EzString.em`
                        ${eResponse.message}
                        <p>
                            EzClocker requires a unique email address, user name and/or phone number for all accounts.
                        </p>`)
                    .then(
                        () => {
                            EzUx.focus(EzInviteEmployeeDialog.ezInstance.ezIds.inputs.emailAddressInputId);

                            EzUx.selectAll(EzInviteEmployeeDialog.ezInstance.ezIds.inputs.emailAddressInputId);
                        });
            // User has a free subscription and has reached the maximum updates per day
            case 6899:
            // PIN_ALREADY_IN_USE_FOR_EMPLOYER
            case 19:
            // Conflict (aka PIN already in use or user already exists)
            case 409:
            // ERROR_NO_AVAILABLE_LICENSE_SLOTS
            case 5901:
            // General bad request error
            case 400:
            default:
                return ezApi.ezclocker.ezDialog.ezShowError(
                    errorDialogTitle,
                    eResponse.message)
                    .then(EzPromise.ignoreResolve);
        }
    }

    /**
     * @public @method
     * Returns if the do not send invite radio is checked or not.
     * @returns {Boolean}
     */
    ezDoNotSendInvite() {
        return EzUx.isCheckboxChecked(EzInviteEmployeeDialog.ezInstance.ezIds.inputs.doNotSendInviteRadioId);
    }

    /**
     * @protected  @method
     * Returns the employee's selected authorities
     * @returns {Array}
     */
    ezBuildEmployeeAuthorities() {
        // All employees will always get the ROLE_EMPLOYEE
        let employeeAuthorities = [];

        let selectedRole = EzUx.getInputValue(
            EzInviteEmployeeDialog.ezInstance.ezIds.roleSelectInputId);

        if (EzUserRole.ROLE_MANAGER === EzString.stringOrEmpty(selectedRole)) {
            employeeAuthorities.push(EzUserRole.ROLE_MANAGER);
        }

        if (EzUserRole.ROLE_PAYROLL_MANAGER === EzString.stringOrEmpty(selectedRole)) {
            employeeAuthorities.push(EzUserRole.ROLE_PAYROLL_MANAGER);
        }

        employeeAuthorities.push(EzUserRole.ROLE_EMPLOYEE);

        return employeeAuthorities;
    }

    /**
     * @public @method
     * Resets all the validation errors messages, highlights, and event hooks.
     */
    ezResetValidationErrors() {
        EzInviteEmployeeDialog.ezInstance.ezHideValidationError();

        EzUx.hideInputError(EzInviteEmployeeDialog.ezInstance.ezIds.inputs.employeeNameInputId);

        EzUx.hideInputError(EzInviteEmployeeDialog.ezInstance.ezIds.inputs.emailAddressInputId);

        EzUx.hideInputError(EzInviteEmployeeDialog.ezInstance.ezIds.inputs.phoneNumberInputId);

        EzUx.hideInputError(EzInviteEmployeeDialog.ezInstance.ezIds.inputs.pinNumberInputId);

        EzUx.hideInputError(EzInviteEmployeeDialog.ezInstance.ezIds.roleSelectInputId);

        EzUx.setContent(
            EzInviteEmployeeDialog.ezInstance.ezIds.employeeNameValidationErrorContainerId,
            EzString.EMPTY);

        EzUx.hide(EzInviteEmployeeDialog.ezInstance.ezIds.employeeNameValidationErrorContainerId);

        EzUx.setContent(
            EzInviteEmployeeDialog.ezInstance.ezIds.emailAddressValidationErrorContainerId,
            EzString.EMPTY);

        EzUx.hide(EzInviteEmployeeDialog.ezInstance.ezIds.emailAddressValidationErrorContainerId);

        EzUx.setContent(
            EzInviteEmployeeDialog.ezInstance.ezIds.phoneNumberValidationErrorContainerId,
            EzString.EMPTY);

        EzUx.hide(EzInviteEmployeeDialog.ezInstance.ezIds.phoneNumberValidationErrorContainerId);

        EzUx.setContent(
            EzInviteEmployeeDialog.ezInstance.ezIds.pinNumberValidationErrorContainerId,
            EzString.EMPTY);

        EzUx.hide(EzInviteEmployeeDialog.ezInstance.ezIds.pinNumberValidationErrorContainerId);

        EzUx.setContent(
            EzInviteEmployeeDialog.ezInstance.ezIds.hourlyRateValidationErrorContainerId,
            EzString.EMPTY);

        EzUx.hide(EzInviteEmployeeDialog.ezInstance.ezIds.hourlyRateValidationErrorContainerId);

        EzUx.setContent(
            EzInviteEmployeeDialog.ezInstance.ezIds.timeoffBankValidationErrorContainerId,
            EzString.EMPTY);

        EzUx.hide(EzInviteEmployeeDialog.ezInstance.ezIds.timeoffBankValidationErrorContainerId);

        ezApi.ezclocker.ezEventEngine.ezUnwantElementEvent(
            EzInviteEmployeeDialog.ezInstance.ezIds.inputs.employeeNameInputId,
            EzElementEventName.KEY_UP,
            EzInviteEmployeeDialog.ezApiName);

        ezApi.ezclocker.ezEventEngine.ezUnwantElementEvent(
            EzInviteEmployeeDialog.ezInstance.ezIds.inputs.emailAddressInputId,
            EzElementEventName.KEY_UP,
            EzInviteEmployeeDialog.ezApiName);

        ezApi.ezclocker.ezEventEngine.ezUnwantElementEvent(
            EzInviteEmployeeDialog.ezInstance.ezIds.inputs.phoneNumberInputId,
            EzElementEventName.KEY_UP,
            EzInviteEmployeeDialog.ezApiName);
    }

    /**
     * @public @method
     * Validates the Employee Name Input
     * @returns {EzValidationResponse}
     */
    ezValidateEmployeeName() {
        // Reset Employee Name Validation Error
        EzUx.setContent(
            EzInviteEmployeeDialog.ezInstance.ezIds.employeeNameValidationErrorContainerId,
            EzString.EMPTY);

        EzUx.hide(
            EzInviteEmployeeDialog.ezInstance.ezIds.employeeNameValidationErrorContainerId);

        // Validate employee name
        return ezApi.ezclocker.ezValidation.ezValidateEmployeeNameInput(
            EzInviteEmployeeDialog.ezInstance.ezIds.inputs.employeeNameInputId,
            EzInviteEmployeeDialog.ezInstance.ezIds.employeeNameValidationErrorContainerId,
            EzInviteEmployeeDialog.ezInstance.ezIds.employeeNameValidationErrorContainerId,
            true);
    }

    /**
     * @public @method
     * Validates the employee's email input value
     * @returns {EzValidationResponse}
     */
    ezValidateEmployeeEmail() {
        return ezApi.ezclocker.ezValidation.ezValidateEmailAddressInput(
            EzInviteEmployeeDialog.ezInstance.ezIds.inputs.emailAddressInputId,
            EzInviteEmployeeDialog.ezInstance.ezIds.emailAddressValidationErrorContainerId,
            EzInviteEmployeeDialog.ezInstance.ezIds.emailAddressValidationErrorContainerId,
            false);
    }

    /**
     * @public @method
     * Validates the provided phone number phone number input
     * @param {string} phoneNumber
     * @param {Boolean} ignoreBlank
     * @deprecated
     * Migrate to:
     *  ezApi.ezclocker.ezValidation.ezInstance.ezValidatePhoneNumber(phoneNumber, forSendingSMS, errorOnEmpty)
     */
    ezValidatePhoneNumber(phoneNumber, ignoreBlank) {
        if (!EzBoolean.isTrue(ignoreBlank) || (EzBoolean.isTrue(ignoreBlank) && EzString.hasLength(phoneNumber))) {
            let vResponse = ezApi.ezclocker.ezValidation.ezValidatePhoneNumberInput(
                EzInviteEmployeeDialog.ezInstance.ezIds.inputs.phoneNumberInputId,
                EzUx.isCheckboxChecked(EzInviteEmployeeDialog.ezInstance.ezIds.inputs.sendInviteBySMSRadioId),
                EzInviteEmployeeDialog.ezInstance.ezIds.validationErrorMessageBoxId);

            if (EzValidationResponseStatus.ERROR === vResponse.ezGetStatus()) {
                ezApi.ezclocker.ezEventEngine.ezWantElementEvent(
                    EzInviteEmployeeDialog.ezInstance.ezIds.inputs.phoneNumberInputId,
                    EzElementEventName.KEY_UP,
                    EzInviteEmployeeDialog.ezApiName,
                    EzInviteEmployeeDialog.ezInstance.ezOnInviteEmployeePhoneNumberKeyUp);

                return vResponse;
            }
        }

        ezApi.ezclocker.ezEventEngine.ezUnwantElementEvent(
            EzInviteEmployeeDialog.ezInstance.ezIds.inputs.phoneNumberInputId,
            EzElementEventName.KEY_UP,
            EzInviteEmployeeDialog.ezApiName);

        return new EzValidationResponse(
            EzValidationResponseStatus.VALID,
            'Phone number is valid.');
    }

    /**
     * @public @method
     * Validates the employee's phone number input value
     * @returns {EzValidationResponse}
     */
    ezValidateEmployeePhoneNumber() {
        EzUx.setInputValue(
            EzInviteEmployeeDialog.ezInstance.ezIds.inputs.phoneNumberInputId,
            EzInviteEmployeeDialog.ezInstance.ezFormattedPhoneNumber);

        return ezApi.ezclocker.ezValidation.ezValidatePhoneNumberInput(
            EzInviteEmployeeDialog.ezInstance.ezIds.inputs.phoneNumberInputId,
            EzUx.isCheckboxChecked(EzInviteEmployeeDialog.ezInstance.ezIds.inputs.sendInviteBySMSRadioId),
            EzInviteEmployeeDialog.ezInstance.ezIds.phoneNumberValidationErrorContainerId,
            EzInviteEmployeeDialog.ezInstance.ezIds.phoneNumberValidationErrorContainerId,
            false);
    }

    /**
     * @public @method
     * Validates the Team Pin input
     * @returns {EzValidationResponse}
     */
    ezValidateKioskPIN() {
        EzUx.hide(EzInviteEmployeeDialog.ezInstance.ezIds.pinNumberValidationErrorContainerId);

        if (EzString.hasLength(EzInviteEmployeeDialog.ezInstance.ezTeamPin)) {
            if (4 < EzInviteEmployeeDialog.ezInstance.ezTeamPin.length) {
                EzUx.setInputValue(
                    EzInviteEmployeeDialog.ezInstance.ezIds.inputs.pinNumberInputId,
                    EzInviteEmployeeDialog.ezInstance.ezTeamPin.substring(0, 4));
            }

            return ezApi.ezclocker.ezValidation.ezValidateTeamPinInput(
                EzInviteEmployeeDialog.ezInstance.ezIds.inputs.pinNumberInputId,
                EzInviteEmployeeDialog.ezInstance.ezIds.pinNumberValidationErrorContainerId,
                EzInviteEmployeeDialog.ezInstance.ezIds.pinNumberValidationErrorContainerId);
        }

        return new EzValidationResponse(
            EzValidationResponseStatus.VALID,
            'Team PIN is valid');
    }

    /**
     * @public @method
     * Validates the employee's hourly rate input value
     * @returns {EzValidationResponse}
     */
    ezValidateEmployeeHourlyRate() {
        return ezApi.ezclocker.ezValidation.ezValidateHourlyRateInput(
            EzInviteEmployeeDialog.ezInstance.ezIds.inputs.hourlyRateInputId,
            EzInviteEmployeeDialog.ezInstance.ezIds.hourlyRateValidationErrorContainerId,
            EzInviteEmployeeDialog.ezInstance.ezIds.hourlyRateValidationErrorContainerId,
            false);
    }

    /**
     * @public @method
     * Validates that the employee has an email or phone number during the update.
     * @returns {Promise.resolve}
     * Resolve returns true if validated, false otherwise
     */
    ezValidateUpdateEmployeeHasEmailOrPhone() {
        // Preventing user from clearing the phone number or email address if used as a username.
        return EzPromise.asyncAction(
            (finished) => EzInviteEmployeeDialog.ezInstance.ezGetEmployeeUserInfo()
                .then(
                    (employeeUserInfo) => {
                        if (null == employeeUserInfo) {
                            return finished(true);
                        }

                        if (EzBoolean.isTrue(employeeUserInfo.nonEmailUsername)) {
                            if (0 !== employeeUserInfo.username.indexOf('ez') &&
                                !EzString.hasLength(EzInviteEmployeeDialog.ezInstance.ezPhoneNumber)) {

                                let em = EzString.em`
                                This employee uses their phone number to sign into ezClocker.
                                A valid phone number is required before you can update
                                the employee's information.`;

                                EzInviteEmployeeDialog.ezInstance.ezShowValidationError(em);

                                return finished(false);
                            }

                            return finished(true);
                        }

                        if (!EzString.hasLength(EzInviteEmployeeDialog.ezInstance.ezEmailAddress)) {
                            let em = EzString.em`
                                This employee uses their email address to sign into ezClocker.
                                A valid email address is required before you can update
                                the employee's information.`;

                            EzInviteEmployeeDialog.ezInstance.ezShowValidationError(em);

                            return finished(false);
                        }

                        return finished(true);
                    }));
    }

    /**
     * @public @method
     * Validates the selected invite method has data to allow the invite to get sent.
     */
    ezValidateInviteSelection() {
        if (EzInviteEmployeeDialog.ezInstance.ezSendInviteByEmail &&
            !EzString.hasLength(EzInviteEmployeeDialog.ezInstance.ezEmailAddress)) {
            EzInviteEmployeeDialog.ezInstance.ezShowErrorMessage(
                'An email address is required in order to invite an employee via email.');

            EzUx.showInputError(EzInviteEmployeeDialog.ezInstance.ezIds.inputs.emailAddressInputId);

            return false;
        }

        if (EzInviteEmployeeDialog.ezInstance.ezSendInviteBySMSInvite &&
            !EzString.hasLength(EzInviteEmployeeDialog.ezInstance.ezPhoneNumber)) {
            EzInviteEmployeeDialog.ezInstance.ezShowErrorMessage(
                'A phone number is required in order to invite an employee via SMS (text).');

            EzUx.showInputError(EzInviteEmployeeDialog.ezInstance.ezIds.inputs.phoneNumberInputId);

            return false;
        }

        return true;
    }

    /**
     * @public @method
     * Validates the dialogs input data
     * Returns true if all validations passed. False otherwise.
     * @returns {boolean}
     */
    ezValidate() {
        return EzPromise.asyncAction(
            (finished) => {
                EzInviteEmployeeDialog.ezInstance.ezResetValidationErrors();

                let validated = EzValidationResponseStatus.VALID === EzInviteEmployeeDialog.ezInstance.ezValidateEmployeeName().ezStatus;

                validated = validated && EzValidationResponseStatus.VALID === EzInviteEmployeeDialog.ezInstance.ezValidateEmployeeEmail().ezStatus;

                validated = validated && EzValidationResponseStatus.VALID === EzInviteEmployeeDialog.ezInstance.ezValidateEmployeePhoneNumber().ezStatus;

                validated = validated && EzValidationResponseStatus.VALID === EzInviteEmployeeDialog.ezInstance.ezValidateKioskPIN().ezStatus;

                if (!ezApi.ezclocker.ezClockerContext.ezGetUserContext().isManager) {
                    validated = validated && EzValidationResponseStatus.VALID === EzInviteEmployeeDialog.ezInstance.ezValidateEmployeeHourlyRate().ezStatus;
                }

                return validated
                    ? EzInviteEmployeeDialog.ezInstance.ezValidateUpdateEmployeeHasEmailOrPhone()
                        .then(finished)
                    : finished(false);
            });
    }

    /**
     * @public @method
     * Obtains the editing employee's user information
     * @returns {Promise.resolve}
     * Resolve contains the employee user info OR null if it doesn't exist.
     */
    ezGetEmployeeUserInfo() {
        return EzPromise.asyncAction(
            (finished) => {
                if ('UPDATE' !== EzInviteEmployeeDialog.ezInstance.ezDialogMode ||
                    !EzObject.isValid(EzInviteEmployeeDialog.ezInstance.activeEmployee) ||
                    !EzNumber.isNumber(EzInviteEmployeeDialog.ezInstance.activeEmployee.id)) {
                    return finished(null);
                }

                return ezApi.ezclocker.ezAccountServices.ezGetEmployeeUserInfo(EzInviteEmployeeDialog.ezInstance.activeEmployee.id)
                    .then(
                        (response) => finished(response.entity),
                        (eResponse) => {
                            ezApi.ezclocker.ezLogger.error(
                                EzString.em`
                                    Failed to obtain the employee's user information due to the following error:
                                    ${eResponse.message}.
                                    [Error Response: ${EzJson.toJson(eResponse)}]`);

                            finished(null)
                        });
            });
    }

    /**
     * @public @method
     * Shows the validation error box
     */
    ezHideValidationError() {
        EzUx.setContent(
            EzInviteEmployeeDialog.ezInstance.ezIds.validationErrorMessageBoxId,
            EzString.EMPTY);

        EzUx.hide(EzInviteEmployeeDialog.ezInstance.ezIds.validationErrorMessageBoxId);
    }

    /**
     * @public @method
     * Shows the validation error box (if not already visible)
     * and appends the em to the content.
     * @param {string} em
     */
    ezShowValidationError(em) {
        if (!EzString.hasLength(em)) {
            return;
        }

        let eMessage = EzUx.getContent(EzInviteEmployeeDialog.ezInstance.ezIds.validationErrorMessageBoxId);

        eMessage = EzString.hasLength(eMessage)
            ? EzHtml.build`
                ${eMessage}
                <div
                    class="ezPad2">
                    ${em}
                </div>`
            : EzHtml.build`
                <div
                    class="ezPad2">
                    ${em}
                </div>`;

        EzUx.setContent(
            EzInviteEmployeeDialog.ezInstance.ezIds.validationErrorMessageBoxId,
            eMessage);

        EzUx.show(
            EzInviteEmployeeDialog.ezInstance.ezIds.validationErrorMessageBoxId);
    }

    /**
     * @public @method
     * Hooks UX element events for the dialog
     */
    ezHookUxEvents() {
        // Employee Email
        ezApi.ezclocker.ezEventEngine.ezWantElementEvent(
            EzInviteEmployeeDialog.ezInstance.ezIds.inputs.emailAddressInputId,
            EzElementEventName.BLUR,
            EzInviteEmployeeDialog.ezApiName,
            EzInviteEmployeeDialog.ezInstance.ezOnInviteEmployeeEmailIdBlur);

        // Employee Phone Number
        ezApi.ezclocker.ezEventEngine.ezWantElementEvent(
            EzInviteEmployeeDialog.ezInstance.ezIds.inputs.phoneNumberInputId,
            EzElementEventName.BLUR,
            EzInviteEmployeeDialog.ezApiName,
            EzInviteEmployeeDialog.ezInstance.ezOnInviteEmployeePhoneNumberBlur);

        // Employee PIN number
        ezApi.ezclocker.ezEventEngine.ezWantElementEvent(
            EzInviteEmployeeDialog.ezInstance.ezIds.inputs.pinNumberInputId,
            EzElementEventName.BLUR,
            EzInviteEmployeeDialog.ezApiName,
            EzInviteEmployeeDialog.ezInstance.ezOnPinBlur);

        // NOTE: Hourly rate wired up in ezApplyRoles

        ezApi.ezclocker.ezEventEngine.ezWantElementEvent(
            EzInviteEmployeeDialog.ezInstance.ezIds.roleSelectInputId,
            EzElementEventName.CHANGE,
            EzInviteEmployeeDialog.ezApiName,
            EzInviteEmployeeDialog.ezInstance.ezUpdateRoleHelp);

        ezApi.ezclocker.ezEventEngine.ezWantElementEvent(
            EzInviteEmployeeDialog.ezInstance.ezIds.links.learnAboutPinNumberLinkId,
            EzElementEventName.CLICK,
            EzInviteEmployeeDialog.ezApiName,
            () => ezApi.ezclocker.ezDialog.showTip(
                'Kiosk PIN Number',
                ezApi.ezclocker.ezDialog.EMPLOYEE_PIN_TIP,
                EzInviteEmployeeDialog.ezInstance.ezIds.containers.parentContainerId)
                .then(EzPromise.ignoreResolve));

        ezApi.ezclocker.ezEventEngine.ezWantElementEvent(
            EzInviteEmployeeDialog.ezInstance.ezIds.links.learnAboutInviteLinkId,
            EzElementEventName.CLICK,
            EzInviteEmployeeDialog.ezApiName,
            () => ezApi.ezclocker.ezDialog.showTip(
                'Inviting Employees',
                ezApi.ezclocker.ezDialog.EMPLOYEE_INVITE_TIP,
                EzInviteEmployeeDialog.ezInstance.ezIds.containers.parentContainerId)
                .then(EzPromise.ignoreResolve));

        // Navigation button for employee info
        ezApi.ezclocker.ezEventEngine.ezWantElementEvent(
            EzInviteEmployeeDialog.ezInstance.ezIds.navigationEmployeeInfoButtonId,
            EzElementEventName.CLICK,
            EzInviteEmployeeDialog.ezApiName,
            EzInviteEmployeeDialog.ezInstance.ezHandleNavigationButtonOnClick);

        // Navigation button for employee permissions
        ezApi.ezclocker.ezEventEngine.ezWantElementEvent(
            EzInviteEmployeeDialog.ezInstance.ezIds.navigationEmployeePermissionsButtonId,
            EzElementEventName.CLICK,
            EzInviteEmployeeDialog.ezApiName,
            EzInviteEmployeeDialog.ezInstance.ezHandleNavigationButtonOnClick);

        // Navigation button for employee time off bank
        ezApi.ezclocker.ezEventEngine.ezWantElementEvent(
            EzInviteEmployeeDialog.ezInstance.ezIds.navigationEmployeeTimeOffBankButtonId,
            EzElementEventName.CLICK,
            EzInviteEmployeeDialog.ezApiName,
            EzInviteEmployeeDialog.ezInstance.ezHandleNavigationButtonOnClick);

    }

    /**
     * @public @method
     * Formats the hourly rate input value and returns the updated value
     * @returns {number}
     */
    ezFormatHourlyRate() {
        const value = EzUx.getInputValue(
            EzInviteEmployeeDialog.ezInstance.ezIds.inputs.hourlyRateInputId);

        if (EzString.hasLength(value)) {
            let numericValue = parseFloat(value);

            if (isNaN(numericValue)) {
                return 0.00;
            }

            if (0 > numericValue) {
                numericValue = -1 * numericValue;
            }

            return numericValue.toFixed(2);
        }

        return 0.00;
    }

    /**
     * @public @method
     * Validates the employee email input
     */
    ezValidateEmployeeEmailInput() {
        if (EzValidationResponseStatus.VALID !== EzInviteEmployeeDialog.ezInstance.ezValidateEmployeeEmail().ezStatus) {
            return;
        }

        if (EzString.hasLength(EzInviteEmployeeDialog.ezInstance.ezEmailAddress) &&
            !EzString.hasLength(EzInviteEmployeeDialog.ezInstance.ezFormattedPhoneNumber) &&
            !EzInviteEmployeeDialog.ezInstance.ezDoNotSendInvite()) {
            EzUx.setCheckboxValue(EzInviteEmployeeDialog.ezInstance.ezIds.inputs.sendInviteByEmailRadioId, true);

            EzUx.setCheckboxValue(EzInviteEmployeeDialog.ezInstance.ezIds.inputs.sendInviteBySMSRadioId, false);
        }
    }

    /**
     * @public @method
     * Validates the phone number input
     */
    ezValidatePhoneNumberInput() {
        if (EzValidationResponseStatus.VALID !== EzInviteEmployeeDialog.ezInstance.ezValidateEmployeePhoneNumber().ezStatus) {
            return;
        }

        if (EzString.hasLength(EzInviteEmployeeDialog.ezInstance.ezPhoneNumber) &&
            !EzString.hasLength(EzInviteEmployeeDialog.ezInstance.ezEmailAddress) &&
            !EzInviteEmployeeDialog.ezInstance.ezDoNotSendInvite()) {
            EzUx.setCheckboxValue(
                EzInviteEmployeeDialog.ezInstance.ezIds.inputs.sendInviteByEmailRadioId,
                false);

            EzUx.setCheckboxValue(
                EzInviteEmployeeDialog.ezInstance.ezIds.inputs.sendInviteBySMSRadioId,
                true);
        }
    }

    /**
     * @public @method
     * Updates the help text for the selected role
     */
    ezUpdateRoleHelp() {
        let selectedRole = EzUx.getInputValue(EzInviteEmployeeDialog.ezInstance.ezIds.roleSelectInputId);

        let helpText = EzString.EMPTY;

        let helpBullets = EzString.EMPTY;

        if (EzUserRole.ROLE_EMPLOYEE === selectedRole) {
            helpText = 'Employees only have access to the employee dashboard where they can:';

            helpBullets = EzHtml.build`
                <li>
                    Clock in and out
                </li>
                <li>
                    View time entries and edit notes
                </li>
                <li>
                    Optionally add and edit their time entries
                </li>
                <li>
                    View their schedule
                </li>`;
        } else if (EzUserRole.ROLE_PAYROLL_MANAGER === selectedRole) {
            helpText = 'Payroll Managers have similar access as the Employer except for the following restrictions:';

            helpBullets = EzHtml.build`
                <li>
                    Cannot access the Employer Account page and therefore:
                    <ul>
                        <li>
                            Cannot change company information or logos.
                        </li>
                        <li>
                            Cannot subscribe, cancel, or change subscriptions.
                        </li>
                        <li>
                            Cannot enter, view, or edit payment information.
                        </li>
                        <li>
                            Cannot change the Employer account's email or password.
                        </li>
                        <li>
                            Cannot delete the Employer account.
                        </li>
                    </ul>
                </li>`;
        } else if (EzUserRole.ROLE_MANAGER === selectedRole) {
            helpText = EzHtml.build`
                Managers have similar access as the Employer or Payroll Manager except for the following
                additional restructions:`;

            helpBullets = EzHtml.build`
                <li>
                    Cannot view another employee's pay rate.
                </li>
                <li>
                    Cannot access the Employer Account page and therefore:
                    <ul>
                        <li>
                            Cannot change company information or logos.
                        </li>
                        <li>
                            Cannot subscribe, cancel, or change subscriptions.
                        </li>
                        <li>
                            Cannot enter, view, or edit payment information.
                        </li>
                        <li>
                            Cannot change the Employer account's email or password.
                        </li>
                        <li>
                            Cannot delete the Employer account.
                        </li>
                    </ul>
                </li>`;
        }

        EzUx.setContent(
            EzInviteEmployeeDialog.ezInstance.ezIds.containers.roleInfoBoxId,
            EzHtml.build`
                <div>
                    ${helpText}
                    <ul>
                        ${helpBullets}
                    </ul>
                </div>`);
    }

    /**
     * @public @method
     * Hides the error message container
     */
    ezHideErrorMessage() {
        EzUx.setContent(EzInviteEmployeeDialog.ezInstance.ezIds.validationErrorMessageBoxId, EzString.EMPTY);
        EzUx.hide(EzInviteEmployeeDialog.ezInstance.ezIds.validationErrorMessageBoxId);
    }

    /**
     * @public @method
     * Shows the error message container
     * @param {string} em
     */
    ezShowErrorMessage(em) {
        if (EzString.hasLength(em)) {
            EzUx.setContent(
                EzInviteEmployeeDialog.ezInstance.ezIds.validationErrorMessageBoxId,
                em);

            EzUx.show(EzInviteEmployeeDialog.ezInstance.ezIds.validationErrorMessageBoxId);
        }
    }

    ezValidateTimeoffBankValues() {
        const yearlyPTO = EzUx.getInputValue(EzInviteEmployeeDialog.ezInstance.ezIds.inputs.yearlyPTOBankInputid);

        const yearlyPTOValue = EzString.hasLength(yearlyPTO)
            ? parseInt(yearlyPTO)
            : null;

        const yearlySick = EzUx.getInputValue(EzInviteEmployeeDialog.ezInstance.ezIds.inputs.yearlySickBankInputid);

        const yearlySickValue = EzString.hasLength(yearlySick)
            ? parseInt(yearlySick)
            : null;

        const yearDays = moment().isLeapYear()
            ? 366
            : 365;

        EzUx.hide(EzInviteEmployeeDialog.ezInstance.ezIds.timeoffBankValidationErrorContainerId);

        EzUx.setContent(
            EzInviteEmployeeDialog.ezInstance.ezIds.timeoffBankValidationErrorContainerId,
            EzString.EMPTY);

        if (yearlyPTOValue && !isNaN(yearlyPTOValue) && yearlyPTOValue > (yearDays * 24)) {
            EzUx.show(EzInviteEmployeeDialog.ezInstance.ezIds.timeoffBankValidationErrorContainerId);

            EzUx.setContent(
                EzInviteEmployeeDialog.ezInstance.ezIds.timeoffBankValidationErrorContainerId,
                'PTO bank hours are greater than total hours in a year.');

            return false;
        } else if (yearlySickValue && !isNaN(yearlySickValue) && yearlySickValue > (yearDays * 24)) {
            EzUx.show(EzInviteEmployeeDialog.ezInstance.ezIds.timeoffBankValidationErrorContainerId);

            EzUx.setContent(
                EzInviteEmployeeDialog.ezInstance.ezIds.timeoffBankValidationErrorContainerId,
                'Sick bank hours are greater than total hours in a year.');

            return false;
        }

        return true;
    }

    /**
     * @public @method
     * Updates the employee's time-off bank values
     * @param {undefined|null|number} newEmployeeId
     * Default: null
     */
    ezUpdateTimeOffBankValuesForEmployee(newEmployeeId = null) {
        const timeOffBankList = [];

        const yearlyPTO = EzUx.getInputValue(EzInviteEmployeeDialog.ezInstance.ezIds.inputs.yearlyPTOBankInputid);

        const yearlyPTOValue = EzString.hasLength(yearlyPTO)
            ? parseInt(yearlyPTO)
            : null;

        let ptoRequest = !newEmployeeId
            ? EzInviteEmployeeDialog.ezInstance.ezBankTimeOffResponse.find(response => 'PAID_PTO' === response.ezTimeOffBankType)
            : undefined;

        if (ptoRequest && yearlyPTOValue !== parseInt(ptoRequest.bankDecimalHours)) {
            ptoRequest.bankDecimalHours = yearlyPTOValue;

            ptoRequest.updatedIso = ezApi.ezclocker.ezDateTime.ezNowAsIso();

            timeOffBankList.push(ptoRequest);
        } else if (!ptoRequest) {
            ptoRequest = {};

            ptoRequest.bankDecimalHours = yearlyPTOValue;

            ptoRequest.ezTimeOffBankType = 'PAID_PTO';

            ptoRequest.employeeId = newEmployeeId || EzInviteEmployeeDialog.ezInstance.activeEmployee.id;

            ptoRequest.employerId = ezApi.ezclocker.ezClockerContext.ezGetActiveEmployer().id;

            ptoRequest.ezTimeOffBankAccrualType = 'MANUAL';

            ptoRequest.createdIso = ezApi.ezclocker.ezDateTime.ezNowAsIso();

            timeOffBankList.push(ptoRequest);
        }

        const yearlySick = EzUx.getInputValue(EzInviteEmployeeDialog.ezInstance.ezIds.inputs.yearlySickBankInputid);

        const yearlySickValue = EzString.hasLength(yearlySick)
            ? parseInt(yearlySick)
            : null;

        let sickRequest = !newEmployeeId
            ? EzInviteEmployeeDialog.ezInstance.ezBankTimeOffResponse.find(response => 'PAID_SICK' === response.ezTimeOffBankType)
            : undefined;

        if (sickRequest && (yearlySickValue !== parseInt(sickRequest.bankDecimalHours))) {
            sickRequest.bankDecimalHours = yearlySickValue;

            sickRequest.updatedIso = ezApi.ezclocker.ezDateTime.ezNowAsIso();

            timeOffBankList.push(sickRequest);
        } else if (!sickRequest) {
            sickRequest = {};

            sickRequest.bankDecimalHours = yearlySickValue;

            sickRequest.ezTimeOffBankType = 'PAID_SICK';

            sickRequest.employeeId = newEmployeeId || EzInviteEmployeeDialog.ezInstance.activeEmployee.id;

            sickRequest.employerId = ezApi.ezclocker.ezClockerContext.ezGetActiveEmployer().id;

            sickRequest.ezTimeOffBankAccrualType = 'MANUAL';

            sickRequest.createdIso = ezApi.ezclocker.ezDateTime.ezNowAsIso();

            timeOffBankList.push(sickRequest);
        }

        if (0 < timeOffBankList.length) {
            return ezApi.ezclocker.ezUi.ezPageWaitExecute(
                'Updating time off bank ...',
                (waitDone) => ezApi.ezclocker.ezHttpHelper.ezPost(
                    ezApi.ezclocker.ezNavigation.ezGetInternalApiUrl('timeoff-bank', 'v1'),
                    EzJson.toJson(timeOffBankList))
                    .then(
                        () => waitDone(),
                        (eResponse) => waitDone()
                            .then(
                                () => ezApi.ezclocker.ezDialog.ezShowPossibleDefectError(
                                    'Error Updating Time Off Bank Data',
                                    eResponse.message,
                                    eResponse,
                                    `URL: ${ezApi.ezclocker.ezNavigation.ezGetInternalApiUrl('timeoff-bank', 'v1')}`))));

        }
    }

    /**
     * @public @method
     * Clears the time off bank values
     */
    ezClearTimeOffBankValues() {
        EzUx.hide(EzInviteEmployeeDialog.ezInstance.ezIds.timeoffBankValidationErrorContainerId);

        EzUx.setContent(
            EzInviteEmployeeDialog.ezInstance.ezIds.timeoffBankValidationErrorContainerId,
            EzString.EMPTY);

        EzUx.setInputValue(
            EzInviteEmployeeDialog.ezInstance.ezIds.inputs.yearlyPTOBankInputid,
            EzString.EMPTY);

        EzUx.setInputValue(
            EzInviteEmployeeDialog.ezInstance.ezIds.inputs.yearlySickBankInputid,
            EzString.EMPTY);
    }

    /**
     * @protected @method
     * Shows a specific view within the navigation system (showing within the ${EzInviteEmployeeDialog.ezInstance.ezDialog}_NavigationViewPane)
     * @param {object} ezEvent
     * {
     *     "triggerOwner":"ezEventEngine",
     *     "message":"onclick",
     *     "data":{
     *         "elementId":"EzInviteEmployeeDialog_NavigationContainer_NavigationPane_EmployeePermissionsButton",
     *         "elementEvent":{
     *             // Normal click event object
     *             "target": <button_reference>
     *             ...
     *         }
     *     }
     * }
     */
    ezHandleNavigationButtonOnClick(ezEvent) {
        if (!EzObject.isValid(ezEvent)) {
            throw new EzBadParamException(
                'ezEvent',
                EzInviteEmployeeDialog.ezInstance.ezTypeName,
                'ezHandleOnNavigationButtonClick(ezEvent)');
        }

        if (EzNavigationButtonState.UNSELECTED === ezEvent.data.elementEvent.target.dataset['state']) {
            EzUx.findElement(EzInviteEmployeeDialog.ezInstance.ezCurrentNavigationButtonId).dataset['state'] = EzNavigationButtonState.UNSELECTED;

            EzUx.hide(EzInviteEmployeeDialog.ezInstance.ezCurrentNavigationViewId);

            ezEvent.data.elementEvent.target.dataset['state'] = EzNavigationButtonState.SELECTED;

            EzInviteEmployeeDialog.ezInstance.ezCurrentNavigationButtonId = ezEvent.data.elementEvent.target.id;

            EzInviteEmployeeDialog.ezInstance.ezCurrentNavigationViewId =
                ezEvent.data.elementEvent.target.dataset['view'];

            EzUx.show(EzInviteEmployeeDialog.ezInstance.ezCurrentNavigationViewId);
        }
    }

    /**
     * @protected @method
     * Handles the invite employee phone number input element's onblur event.
     */
    ezOnInviteEmployeePhoneNumberBlur() {
        EzInviteEmployeeDialog.ezInstance.ezValidatePhoneNumberInput();
    }

    /**
     * @protected @method
     * Handles the invite employee phone number input element's onkeyup event.
     */
    ezOnInviteEmployeePhoneNumberKeyUp() {
        EzInviteEmployeeDialog.ezInstance.ezValidatePhoneNumberInput();
    }

    /**
     * @protected @method
     * Shows the failure message in a dialog.
     */
    ezOnFailureInviteDialog(event, eResponse) {
        ezApi.ezclocker.ezLogger.error(`Failed to invite employee: ${EzJson.toJson(eResponse)}`);

        ezApi.ezclocker.ezDialog.ezShowError(
            'Invite Employee Error',
            event.detail.message);
    }

    /**
     * @protected @method
     * Handles the invite employee email input element's onblur event.
     */
    ezOnInviteEmployeeEmailIdBlur() {
        EzInviteEmployeeDialog.ezInstance.ezValidateEmployeeEmailInput();
    }

    /**
     * @protected @method
     * Handles the invite employee email input element's onkeyup event.
     */
    ezOnInviteEmployeeEmailKeyUp() {
        EzInviteEmployeeDialog.ezInstance.ezValidateEmployeeEmailInput();
    }

    /**
     * @protected @method
     * Handles the invite employee name input element's onkeyup event.
     */
    ezOnInviteEmployeeNameKeyUp() {
        ezApi.ezclocker.ezValidation.ezValidateEmployeeName();
    }

    /**
     * @protected @method
     * Handles the Pin input's blur event.
     */
    ezOnPinBlur() {
        EzInviteEmployeeDialog.ezInstance.ezValidateKioskPIN();
    }

    /**
     * @protected @method
     * Handles Hourly Rate Input's key up event
     */
    ezOnHourlyRateBlur() {
        EzUx.setInputValue(
            EzInviteEmployeeDialog.ezInstance.ezIds.inputs.hourlyRateInputId,
            EzInviteEmployeeDialog.ezInstance.ezFormatHourlyRate());

        EzInviteEmployeeDialog.ezInstance.ezValidateEmployeeHourlyRate();
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
     * @returns {string}
     */
    static get ezApiName() {
        return 'ezInviteEmployeeDialog';
    }

    /**
     * @static
     * @public @readonly @property
     * @returns {object}
     */
    static get ezEventNames() {
        return {
            onReady: 'ezOn_EzInviteEmployeeDialog_Ready',
            onInviteEmployeeDialogEmployeeAdded: 'ezOn_EzInviteEmployeeDialog_EmployeeAdded',
            onInviteEmployeeDialogEmployeeAddError: 'ezOn_EzInviteEmployeeDialog_EmployeeAddError',
            onInviteEmployeeDialogEmployeeAddCanceled: 'ezOn_EzInviteEmployeeDialog_EmployeeAddCanceled',
            onInviteEmployeeDialogEmployeeUpdated: 'ezOn_EzInviteEmployeeDialog_EmployeeUpdated',
            onInviteEmployeeDialogEmployeeUpdateError: 'ezOn_EzInviteEmployeeDialog_EmployeeUpdateError',
            onInviteEmployeeDialogEmployeeUpdateCanceled: 'ezOn_EzInviteEmployeeDialog_EmployeeUpdateCanceled',
            onInviteEmployeeDialogShow: 'ezOn_EzInviteEmployeeDialog_DialogShow',
            onInviteEmployeeDialogCanceled: 'ezOn_EzInviteEmployeeDialog_DialogCanceled',
            onInviteEmployeeDialogClosed: 'ezOn_EzInviteEmployeeDialog_DialogClosed'
        };
    }

    /**
     * @static
     * @private @field
     * Stores the singleton instance of this class that was created by and registerd with EzApi.
     * @type {EzInviteEmployeeDialog}
     */
    static #ezInstance = globalThis?.ezApi?.ready && globalThis.ezApi?.ezclocker?.[EzInviteEmployeeDialog.ezApiName]
        ? globalThis.ezApi.ezclocker?.[EzInviteEmployeeDialog.ezApiName]
        : null;
    /**
     * @static
     * @public @property @getter
     * Returns the singleton instance of this class that is registered with EzApi (if available yet)
     * @returns {EzInviteEmployeeDialog}
     */
    static get ezInstance() {
        return EzInviteEmployeeDialog.#ezInstance;
    }
    /**
     * @static
     * @public @property @setter
     * Sets the singleton instance of of this class that is registered with EzApi.
     * @param {EzInviteEmployeeDialog} ezInviteEmployeeDialog
     */
    static set ezInstance(ezInviteEmployeeDialog) {
        if (null != EzInviteEmployeeDialog.#ezInstance) {
            throw new Error('EzInviteEmployeeDialog\'s singleton instance is already reigstered with EzApi.');
        }

        EzInviteEmployeeDialog.#ezInstance = ezInviteEmployeeDialog;
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
    static #ezApiRegistrationState = globalThis?.ezApi?.ready && globalThis.ezApi?.ezclocker?.[EzInviteEmployeeDialog.ezApiName]
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
        return EzInviteEmployeeDialog.#ezApiRegistrationState;
    }
    /**
     * @static
     * @public @property @setter
     * Sets the ezApi registration state of this classes's singleton instance.
     * @param {string} ezApiRegistrationState
     * A valid enum property value from EzRegistrationState
     */
    static set ezApiRegistrationState(ezApiRegistrationState) {
        EzInviteEmployeeDialog.#ezApiRegistrationState = EzRegistrationState.ezValueOf(ezApiRegistrationState);
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
        return EzRegistrationState.PENDING === EzInviteEmployeeDialog.ezApiRegistrationState &&
            globalThis?.ezApi?.ready && globalThis.ezApi?.ezclocker &&
            // TODO: Fix Amplitude before re-enabling
            // globalThis.ezApi.ezclocker?.[EzAmplitudeIntegration.ezApiName]?.ready &&
            globalThis.ezApi.ezclocker?.[EzAnalyticsAndMetrics.ezApiName]?.ready &&
            globalThis.ezApi.ezclocker?.[EzUI.ezApiName]?.ready &&
            globalThis.ezApi.ezclocker?.[EzFeaturePackageManager.ezApiName]?.ready &&
            globalThis.ezApi.ezclocker?.[EzDialog.ezApiName]?.ready;
    }

    /**
     * @static
     * @private @readonly @property
     * Returns if this class's singleton instance is registered with ezApi yet.
     * @returns {boolean}
     */
    static get #ezIsRegistered() {
        return null != EzInviteEmployeeDialog.ezInstance &&
            EzRegistrationState.REGISTERED === EzInviteEmployeeDialog.ezApiRegistrationState;
    }

    /**
     * @static
     * @private @method
     * Attempts to register the singleton instance for this class with ezApi. Returns true
     * if successful, false otherwise.
     * @returns {boolean}
     */
    static #ezRegistrator() {
        if (EzInviteEmployeeDialog.#ezCanRegister && !EzInviteEmployeeDialog.#ezIsRegistered) {
            globalThis.ezApi.ezRegisterNewApi(EzInviteEmployeeDialog, EzInviteEmployeeDialog.ezApiName);
        }

        return EzInviteEmployeeDialog.#ezIsRegistered;
    }

    /**
     * @static
     * Static Initialization
     * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
     * >> IMPORTANT <<
     * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
     * Make sure the following properties and methods get defined BEFORE this static initialization section:
     *     1) Property getter EzInviteEmployeeDialog.ezApiName
     *     2) Property getter EzInviteEmployeeDialog.ezEventNames
     *     3) Property getter EzInviteEmployeeDialog.ezInstance
     *     4) Property setter EzInviteEmployeeDialog.ezInstance
     *     5) Property getter EzInviteEmployeeDialog.ezApiRegistrationState
     *     6) Property setter EzInviteEmployeeDialog.ezApiRegistrationState
     *     7) Property getter EzInviteEmployeeDialog.#ezCanRegister
     *     8) Property getter EzInviteEmployeeDialog.#ezIsRegistered
     *     9) Method EzInviteEmployeeDialog.#ezRegistrator()
     */
    static {
        if (!EzInviteEmployeeDialog.#ezIsRegistered) {
            EzInviteEmployeeDialog.ezApiRegistrationState = EzRegistrationState.PENDING;

            if (!EzInviteEmployeeDialog.#ezRegistrator()) {
                document.addEventListener(
                    EzInviteEmployeeDialog.ezOnEzApiReadyEventName,
                    EzInviteEmployeeDialog.#ezRegistrator);

                // TODO: Fix Amplitude before re-enabling
                /*
                document.addEventListener(
                    EzAmplitudeIntegration.ezEventNames.onReady,
                    EzInviteEmployeeDialog.#ezRegistrator);
                */

                document.addEventListener(
                    EzAnalyticsAndMetrics.ezEventNames.onReady,
                    EzInviteEmployeeDialog.#ezRegistrator);

                document.addEventListener(
                    EzUI.ezEventNames.onReady,
                    EzInviteEmployeeDialog.#ezRegistrator);

                document.addEventListener(
                    EzDialog.ezEventNames.onReady,
                    EzInviteEmployeeDialog.#ezRegistrator);

                document.addEventListener(
                    EzFeaturePackageManager.ezEventNames.onReady,
                    EzInviteEmployeeDialog.#ezRegistrator);
            }
        }
    }

    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    // !! DO NOT PLACE ANY non-initialization fields, getter/setter methods, static methods, or class methods beyond above section !!
    // NO CODE AFTER THIS SECTION
    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
}
