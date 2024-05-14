/*
    DEPRECATED:
    Now using widget at: src/main/webapp/secure/widgets/EzAddEditEmployeeDialog.js
*/

import { EzUserRole } from '/ezlibrary/EzUserRole.js';
import { EzElementEventName } from '/ezlibrary/EzElementEventName.js';

/**
 * Creates a new instance of EzInviteEmployeeDialog
 */
class EzInviteEmployeeDialog {
    static ezApiName = 'ezInviteEmployeeDialog';
    static ezEventNames = {
        onInviteEmployeeDialogShow: ezApi.ezIdTemplate`on${EzInviteEmployeeDialog.ezApiName}_Show`,
        onInviteEmployeeDialogCanceled: ezApi.ezIdTemplate`on${EzInviteEmployeeDialog.ezApiName}_Canceled`,
        onInviteEmployeeDialogClosed: ezApi.ezIdTemplate`on${EzInviteEmployeeDialog.ezApiName}_Canceled`,
        onInviteEmployeeDialogEmployeeAdded: ezApi.ezIdTemplate`on${EzInviteEmployeeDialog.ezApiName}_Added`,
        onInviteEmployeeDialogEmployeeAddError: ezApi.ezIdTemplate`on${EzInviteEmployeeDialog.ezApiName}_AddError`,
        onInviteEmployeeDialogEmployeeAddCanceled: ezApi.ezIdTemplate`on${EzInviteEmployeeDialog.ezApiName}_AddCanceled`,
        onInviteEmployeeDialogEmployeeUpdated: ezApi.ezIdTemplate`on${EzInviteEmployeeDialog.ezApiName}_Updated`,
        onInviteEmployeeDialogEmployeeUpdateError: ezApi.ezIdTemplate`on${EzInviteEmployeeDialog.ezApiName}_UpdatError`,
        onInviteEmployeeDialogEmployeeUpdatCanceled: ezApi.ezIdTemplate`on${EzInviteEmployeeDialog.ezApiName}_UpdateCanceled`
    };

    static {
        document.addEventListener('onEzApiReady',
            () => ezApi.ezRegisterNewApi(EzInviteEmployeeDialog, EzInviteEmployeeDialog.ezApiName));
    }

    /**
     * @param {string|null} dialogId
     */
    constructor(parentContainerId, dialogId) {
        this.ready = false;
        this.ezTypeName = 'EzInviteEmployeeDialog';

        this.DEFAULT_DIALOG_ID = 'inviteEmployeeDialog';
        this.ERROR_MESSAGE_TITLE = 'Invite Employee Error';
        this.DEFAULT_ERROR_MESSAGE = 'Invite of employee failed.';

        this.ezParentContainerId = ezApi.ezIsEmptyString(parentContainerId)
            ? '_HideDialogsDiv'
            : parentContainerId;

        this.visibile = false;
        this.employeeUser = null;
        this.activeEmployee = null;
        this.ezDialogMode = 'ADD';

        this.ezDialogId = ezApi.ezIsEmptyString(dialogId)
            ? this.DEFAULT_DIALOG_ID
            : dialogId;

        this.ezEventNames = EzInviteEmployeeDialog.ezEventName;
    }

    /**
     * @protected
     * Initializes the EzInviteEmployeeDialog
     *
     * @returns {EzInviteEmployeeDialog}
     */
    ezInit() {
        let self = ezApi.ezclocker[EzInviteEmployeeDialog.ezApiName];

        ezApi.ezclocker.ezEventEngine.ezRegisterEvent(
            EzInviteEmployeeDialog.ezApiName,
            EzInviteEmployeeDialog.ezEventName.onInviteEmployeeDialogEmployeeAdded);
        ezApi.ezclocker.ezEventEngine.ezRegisterEvent(
            EzInviteEmployeeDialog.ezApiName,
            EzInviteEmployeeDialog.ezEventName.onInviteEmployeeDialogEmployeeAddError);
        ezApi.ezclocker.ezEventEngine.ezRegisterEvent(
            EzInviteEmployeeDialog.ezApiName,
            EzInviteEmployeeDialog.ezEventName.onInviteEmployeeDialogEmployeeAddCanceled);
        ezApi.ezclocker.ezEventEngine.ezRegisterEvent(
            EzInviteEmployeeDialog.ezApiName,
            EzInviteEmployeeDialog.ezEventNames.onInviteEmployeeDialogEmployeeUpdated);
        ezApi.ezclocker.ezEventEngine.ezRegisterEvent(
            EzInviteEmployeeDialog.ezApiName,
            EzInviteEmployeeDialog.ezEventNames.onInviteEmployeeDialogEmployeeUpdateError);
        ezApi.ezclocker.ezEventEngine.ezRegisterEvent(
            EzInviteEmployeeDialog.ezApiName,
            EzInviteEmployeeDialog.ezEventNames.onInviteEmployeeDialogEmployeeUpdatCanceled);

        ezApi.ezclocker.ezEventEngine.ezRegisterEvent(
            EzInviteEmployeeDialog.ezApiName,
            EzInviteEmployeeDialog.ezEventNames.onInviteEmployeeDialogShow);
        ezApi.ezclocker.ezEventEngine.ezRegisterEvent(
            EzInviteEmployeeDialog.ezApiName,
            EzInviteEmployeeDialog.ezEventNames.onInviteEmployeeDialogCanceled);
        ezApi.ezclocker.ezEventEngine.ezRegisterEvent(
            EzInviteEmployeeDialog.ezApiName,
            EzInviteEmployeeDialog.ezEventNames.onInviteEmployeeDialogClosed);


        self.INVITE_EMPLOYEE_API_ROOT = ezApi.ezclocker.nav.getInternalApiUrl('employer/invite-employee', 'v1');
        self.UPDATE_EMPLOYEE_API_ROOT = ezApi.ezclocker.nav.getInternalApiUrl('employees/', 'v2');

        self.ezInitUx();

        self.ready = true;
        return self;
    }

    /**
     * @protected
     * Initializes the dialog's UX
     *
     * @returns {EzInviteEmployeeDialog}
     */
    ezInitUx() {
        let self = ezApi.ezclocker[EzInviteEmployeeDialog.ezApiName];

        ezUi.ezAppendContent(self.ezParentContainerId, self.ezBuildDialogHtml());

        ezApi.ezId(self.ezDialogId).dialog({
            dialogClass: ezApi.ezclocker.ezDialog.DEFAULTS.dialogClass,
            closeOnEscape: ezApi.ezclocker.ezDialog.DEFAULTS.closeOnEscape,
            autoOpen: ezApi.ezclocker.ezDialog.DEFAULTS.autoOpen,
            position: ezApi.ezclocker.ezDialog.DEFAULTS.position,
            show: ezApi.ezclocker.ezDialog.DEFAULTS.show,
            hide: ezApi.ezclocker.ezDialog.DEFAULTS.hide,
            resizable: ezApi.ezclocker.ezDialog.DEFAULTS.resizable,
            width: 850,
            modal: true,
            buttons: {
                Add: {
                    text: 'Add',
                    id: '_Invite_InviteButton',
                    click: self.ezSubmit
                },
                Update: {
                    text: 'Update',
                    id: 'EzUpdateEmployeeInfoButton',
                    click: self.ezSubmit
                },
                Cancel: self.ezCancel
            },
            close: () => ezApi.ezclocker.ezEventEngine.ezTriggerEvent(
                EzInviteEmployeeDialog.ezEventNames.onInviteEmployeeDialogClosed,
                ezApi.ezclocker.ezEventEngine.ezBuildEventData(
                    EzInviteEmployeeDialog.ezApiName,
                    'Invite or add employee dialog was closed',
                    ezApi.ezclocker[EzInviteEmployeeDialog.ezApiName]))
        });

        ezApi.ezId('EzRadioSendInviteByEmail').iCheck({
            checkboxClass: 'icheckbox_flat-orange',
            radioClass: 'iradio_flat-orange',
            increaseArea: '20%'
        });

        ezApi.ezId('EzRadioSendInviteByPhone').iCheck({
            checkboxClass: 'icheckbox_flat-orange',
            radioClass: 'iradio_flat-orange',
            increaseArea: '20%'
        });

        ezApi.ezId('EzRadioDonotSendInvite').iCheck({
            checkboxClass: 'icheckbox_flat-orange',
            radioClass: 'iradio_flat-orange',
            increaseArea: '20%'
        });

        ezUi.ezHide('EzUpdateEmployeeInfoButton');

        self.ezHookUxEvents();
    }

    /**
        @protected
        Hooks UX element events for the dialog
     */
    ezHookUxEvents() {
        let self = ezApi.ezclocker[EzInviteEmployeeDialog.ezApiName];

        ezApi.ezclocker.ezEventEngine.ezWantElementEvent(
            'EzEmployeeInvite_PinNumber',
            EzElementEventName.KEY_UP,
            EzInviteEmployeeDialog.ezApiName,
            ezApi.ezclocker.ezInviteEmployeeDialog.ezOnPinKeyPress);

        ezApi.ezclocker.ezEventEngine.ezWantElementEvent(
            'EzLearnAboutPinNumber',
            EzElementEventName.CLICK,
            EzInviteEmployeeDialog.ezApiName,
            () => ezApi.ezclocker.ezDialog.showTip(
                'Kiosk PIN Number',
                ezApi.ezclocker.ezDialog.EMPLOYEE_PIN_TIP,
                '_HideDialogsDiv').then(ezApi.ezIgnoreResolve));

        ezApi.ezclocker.ezEventEngine.ezWantElementEvent(
            'EzLearnAboutInviteEmployee',
            EzElementEventName.CLICK,
            EzInviteEmployeeDialog.ezApiName,
            () => ezApi.ezclocker.ezDialog.showTip(
                'Inviting Employees',
                ezApi.ezclocker.ezDialog.EMPLOYEE_INVITE_TIP,
                '_HideDialogsDiv').then(ezApi.ezIgnoreResolve));

        ezApi.ezclocker.ezEventEngine.ezWantElementEvent(
            '_Invite_Name',
            EzElementEventName.BLUR,
            EzInviteEmployeeDialog.ezApiName,
            self.ezOnInviteEmployeeNameBlur);
        ezApi.ezclocker.ezEventEngine.ezWantElementEvent(
            '_Invite_Name',
            EzElementEventName.KEY_UP,
            EzInviteEmployeeDialog.ezApiName,
            self.ezOnInviteEmployeeNameBlur);

        ezApi.ezclocker.ezEventEngine.ezWantElementEvent(
            '_Invite_PhoneNumber',
            EzElementEventName.BLUR,
            EzInviteEmployeeDialog.ezApiName,
            self.ezOnInviteEmployeePhoneNumberBlur);
        ezApi.ezclocker.ezEventEngine.ezWantElementEvent(
            '_Invite_PhoneNumber',
            EzElementEventName.KEY_UP,
            EzInviteEmployeeDialog.ezApiName,
            self.ezOnInviteEmployeePhoneNumberBlur);

        ezApi.ezclocker.ezEventEngine.ezWantElementEvent(
            '_Invite_EmailAddress',
            EzElementEventName.BLUR,
            EzInviteEmployeeDialog.ezApiName,
            self.ezOnInviteEmployeeEmailIdBlur);
        ezApi.ezclocker.ezEventEngine.ezWantElementEvent(
            '_Invite_EmailAddress',
            EzElementEventName.KEY_UP,
            EzInviteEmployeeDialog.ezApiName,
            self.ezOnInviteEmployeeEmailIdBlur);

        ezApi.ezclocker.ezEventEngine.ezWantElementEvent(
            'EzEmployeeInvite_PinNumber',
            EzElementEventName.KEY_PRESS,
            EzInviteEmployeeDialog.ezApiName,
            self.ezOnPinKeyPress);

        ezApi.ezclocker.ezEventEngine.ezWantElementEvent(
            'EzAddEditEmployeeDialogRoleSelect',
            EzElementEventName.CHANGE,
            EzInviteEmployeeDialog.ezApiName,
            self.ezUpdateRoleHelp);
    }

    /**
     * @protected
     * Resets the ui to the initial defaults
     */
    ezReset() {
        let self = ezApi.ezclocker[EzInviteEmployeeDialog.ezApiName];

        ezUi.ezDisable('_Invite_InviteButton');
        ezUi.ezSetCheckboxValue('EzRadioSendInviteByEmail', true);
        ezUi.ezSetCheckboxValue('_sendInvite', true);

        ezUi.ezSetInputValue('_Invite_EmailAddress', '');
        ezUi.ezSetInputValue('_Invite_PhoneNumber', '');
        ezUi.ezSetInputValue('EzEmployeeInvite_PinNumber', '');
        ezUi.ezSetSelectValue('EzAddEditEmployeeDialogRoleSelect', 'ROLE_EMPLOYEE');

        ezUi.ezSetInputValue('_Invite_Name', '');
        ezUi.ezSetElementCss('_Invite_Name', 'border', 'none');
        ezUi.ezSetElmentCss('_Invite_Name', 'background-color', 'inherit');

        if ('UPDATE' === self.ezDialogMode && ezApi.ezIsValid(self.activeEmployee)) {
            ezUi.ezId(self.ezDialogId).dialog({ 'title': 'Update Employee' });

            ezUi.ezHide('EzAddEditEmployeeInviteCheckContainer');
            ezUi.ezHide('_Invite_InviteButton');
            ezUi.ezShow('EzUpdateEmployeeInfoButton');
            ezUi.ezSetInputValue('_Invite_Name', self.activeEmployee.employeeName);
            ezUi.ezSetInputValue('_Invite_EmailAddress', self.employeeUser.username);
            ezUi.ezSetInputValue('EzEmployeeInvite_PinNumber', self.activeEmployee.teamPin);

            let primaryRole = ezApi.ezIsString(self.activeEmployee.primaryRole)
                ? self.activeEmployee.primaryRole
                : 'ROLE_EMPLOYEE';

            if ('EMPLOYEE' === primaryRole) {
                primaryRole = 'ROLE_EMPLOYEE';
            } else if ('MANAGER' == primaryRole) {
                primaryRole = 'ROLE_MANAGER';
            }

            ezUi.ezSetSelectValue('EzAddEditEmployeeDialogRoleSelect', primaryRole);
            ezUi.ezHide('EzSendInviteRadioButtonSet');
        } else { // Add and Invite Mode
            self.activeEmployee = null;
            self.employeeUser = null;

            ezUi.ezId(self.ezDialogId).dialog({ 'title': 'Add Employee' });

            ezUi.ezHide('EzUpdateEmployeeInfoButton');

            ezUi.ezShow('EzSendInviteRadioButtonSet');
            ezUi.ezShow('EzAddEditEmployeeInviteCheckContainer');
            ezUi.ezShow('_Invite_InviteButton');
        }

        self.ezUpdateRoleHelp();
    }

    /**
     * @public
     * Shows the dialog UX to the user
     */
    ezShow(dialgoMode, activeEmployee, employeeUser) {
        let self = ezApi.ezclocker[EzInviteEmployeeDialog.ezApiName];

        self.ezDialogMode = ezApi.ezStringHasLength(dialgoMode)
            ? dialgoMode
            : 'ADD';
        self.activeEmployee = ezApi.ezIsValid(activeEmployee)
            ? activeEmployee
            : null;
        self.employeeUser = employeeUser || null;

        self.ezReset();

        ezApi.ezclocker.ezDialog.ezShowDialog(self.ezDialogId).then(() => {
            ezUi.ezFocusElement('Invite');

            ezApi.ezclocker.ezEventEngine.ezTriggerEvent(
                EzInviteEmployeeDialog.ezEventNames.onInviteEmployeeDialogShow,
                ezApi.ezclocker.ezEventEngine.ezBuildEventData(
                    EzInviteEmployeeDialog.ezApiName,
                    'Invite or add employee dialog is visible',
                    self));
        });
    }

    /**
     * @public
     * Closes the add/invite dialog
     */
    ezClose() {
        let self = ezApi.ezclocker[EzInviteEmployeeDialog.ezApiName];

        ezApi.ezclocker.ezDialog.ezCloseDialog(self.ezDialogId);
    }

    /**
        @public
        Cancels the add/invite dialog without performing any modifications or additions.
     */
    ezCancel() {
        let self = ezApi.ezclocker[EzInviteEmployeeDialog.ezApiName];

        if ('ADD' === self.ezDialogMode) {
            ezApi.ezclocker.ezEventEngine.ezTriggerEvent(
                EzInviteEmployeeDialog.ezEventNames.onInviteEmployeeDialogEmployeeAddCanceled,
                EzInviteEmployeeDialog.ezApiName,
                ezApi.ezclocker.ezEventEngine.ezBuildEventData(
                    EzInviteEmployeeDialog.ezApiName,
                    'Add employee dialog was canceled',
                    self));
        } else {
            ezApi.ezclocker.ezEventEngine.ezTriggerEvent(
                EzInviteEmployeeDialog.ezEventNames.onInviteEmployeeDialogEmployeeUpdatCanceled,
                EzInviteEmployeeDialog.ezApiName,
                ezApi.ezclocker.ezEventEngine.ezBuildEventData(
                    EzInviteEmployeeDialog.ezApiName,
                    'Invite employee dialog was canceled',
                    self));
        }

        ezApi.ezclocker.ezEventEngine.ezTriggerEvent(
            EzInviteEmployeeDialog.ezEventNames.onInviteEmployeeDialogCanceled,
            ezApi.ezclocker.ezEventEngine.ezBuildEventData(
                EzInviteEmployeeDialog.ezApiName,
                'Invite/add employee dialog was canceled',
                self));

        self.ezClose();
    }

    /**
     * @protected
     * Submits the employee invite
     */
    ezSubmit() {
        let self = ezApi.ezclocker[EzInviteEmployeeDialog.ezApiName];

        let sendEmailInvite = false;
        let sendPhoneInvite = false;

        ezUi.ezHideElement('_InviteErrorMessage');

        let vResponse = self.ezValidate();
        if (0 != vResponse.errorCode) {
            ezUi.ezContent('_InviteErrorMessage', vResponse.message);
            ezUi.ezShowElement('_InviteErrorMessage');
            ezApi.ezclocker.logger.error(self.ERROR_MESSAGE_TITLE + ': ' + vResponse.message);
            return;
        }

        vResponse = ezApi.ezclocker.ezValidation.ezValidateTeamPinLength('EzEmployeeInvite_PinNumber',
            'EzEmployeeInvite_PinNumberError');
        if (ezApi.ezIsValid(vResponse) && 0 != vResponse.errorCode) {
            return;
        }

        if (ezUi.ezIsCheckBoxChecked('EzRadioSendInviteByEmail') &&
            ezApi.ezStringHasLength(ezUi.ezGetInputValue('_Invite_EmailAddress'))) {
            sendEmailInvite = true;
        } else if (ezUi.ezIsCheckBoxChecked('EzRadioSendInviteByPhone') &&
            ezApi.ezStringHasLength(ezUi.ezGetInputValue('_Invite_PhoneNumber'))) {
            sendPhoneInvite = true;
        }

        // All employees will always get the ROLE_EMPLOYEE
        let selectedAuthorities = [
            'ROLE_EMPLOYEE'
        ];

        if ('ROLE_MANAGER' === ezUi.ezGetInputValue('EzAddEditEmployeeDialogRoleSelect')) {
            selectedAuthorities.push('ROLE_MANAGER');
        }

        if ('UPDATE' === self.ezDialogMode) {
            self.ezSubmitUpdatedEmployeeInfo(selectedAuthorities);
        } else {
            self.ezSubmitAddEmployee(selectedAuthorities, sendEmailInvite, sendPhoneInvite);
        }
    }

    /**
     * @protected
     * Calls the update employee info service
     *
     * @param {Array} selectedAuthorities
     */
    ezSubmitUpdatedEmployeeInfo(selectedAuthorities) {
        let self = ezApi.ezclocker[EzInviteEmployeeDialog.ezApiName];

        let waitMessage =
            ezApi.ezMessageTemplate`Updating information for employee ${ezUi.ezGetInputValue('_Invite_Name')} ...`;
        let url = ezApi.ezUrlTemplate`${self.UPDATE_EMPLOYEE_API_ROOT}${self.activeEmployee.id}`;
        let payload = ezApi.ezToJson({
            employeeId: self.activeEmployee.id,
            employerId: self.activeEmployee.employerId,
            userId: self.activeEmployee.userId,
            name: ezUi.ezGetInputValue('_Invite_Name'),
            email: ezUi.ezGetInputValue('_Invite_EmailAddress'),
            pin: ezUi.ezGetInputValue('EzEmployeeInvite_PinNumber'),
            sendInviteByEmail: false,
            sendInviteByPhone: false,
            hourlyRate: null,
            targetTimeZoneId: ezApi.ezclocker.ezDateTime.activeTimeZone,
            authorities: selectedAuthorities
        });

        ezUi.ezStartPageWaitExecute(waitMessage,
            (waitDone) => ezApi.ezclocker.http.ezPut(url, payload)
                .then(ezApi.ezclocker.ezServices.ezProcessApiResolve, ezApi.ezclocker.ezServices.ezProcessApiReject)
                .then(
                    (response) => self.ezSetEmployeeTeamPermissions(response.employee).then(
                        () => {
                            waitDone();
                            self.ezClose();
                            ezApi.ezclocker.ezEventEngine.ezTriggerEvent(
                                self.ezEventNames.onInviteEmployeeDialogEmployeeUpdated,
                                ezApi.ezclocker.ezEventEngine.ezBuildEventData(
                                    EzInviteEmployeeDialog.ezApiName,
                                    'Updated employee',
                                    response));
                        },
                        (eResponse) => {
                            ezApi.ezclocker.logger.error(ezApi.ezEM`
                                Failed to set DISALLOW_EMPOLOYEE_TIMEENTRY value for
                                employeeId=${response.employee.id}. Error: ${ezApi.ezToJson(eResponse)}`);

                            waitDone();
                            self.ezClose();
                            ezApi.ezclocker.ezEventEngine.ezTriggerEvent(
                                self.ezEventNames.onInviteEmployeeDialogEmployeeUpdateError,
                                ezApi.ezclocker.ezEventEngine.ezBuildEventData(
                                    EzInviteEmployeeDialog.ezApiName,
                                    'Update employee error',
                                    eResponse));
                        }),
                    (eResponse) => {
                        waitDone();
                        if (409 == eResponse.errorCode || 19 == eResponse.errorCode) {
                            ezApi.ezclocker.ezDialog.ezShowOK('PIN Number in Use', eResponse.message)
                                .then(ezApi.ezIgnoreResolve);
                        } else if (8 == eResponse.errorCode) {
                            ezApi.ezclocker.ezDialog.ezShowOK('Email in Use', ezApi.ezEM`
                                An ezClocker account is already using the email address
                                "${ezUi.ezGetInputValue('_Invite_EmailAddress')}".
                                <p>
                                    EzClocker only allows one account per email address.
                                    Please use a different email address.
                                </p>`)
                                .then(() => {
                                    ezUi.ezFocus('_Invite_EmailAddress');
                                    ezUi.ezSelectAll('_Invite_EmailAddress');
                                });
                        } else {
                            ezApi.ezclocker.logger.error(ezApi.ezEM`
                                Failed update employee info. Error: ${ezApi.ezToJson(eResponse)}`);
                        }

                        ezApi.ezclocker.ezEventEngine.ezTriggerEvent(
                            self.ezEventNames.onInviteEmployeeDialogEmployeeUpdateError,
                            ezApi.ezclocker.ezEventEngine.ezBuildEventData(
                                EzInviteEmployeeDialog.ezApiName,
                                'Update employee error',
                                eResponse));
                    }));
    }

    /**
     * @protected
     * Calls the add employee service
     *
     * @param {Array} selectedAuthorities
     * @param {Boolean} sendEmailInvite
     * @param {Boolean} sendPhoneInvite
     *
     */
    ezSubmitAddEmployee(selectedAuthorities, sendEmailInvite, sendPhoneInvite) {
        let self = ezApi.ezclocker[EzInviteEmployeeDialog.ezApiName];

        let waitMessage = ezApi.ezMessageTemplate`Adding employee ${ezUi.ezGetInputValue('_Invite_Name')} ...`;
        let payload = ezApi.ezToJson({
            name: ezUi.ezGetInputValue('_Invite_Name'),
            email: ezApi.ezStringOrEmpty(ezUi.ezGetInputValue('_Invite_EmailAddress')),
            phone: ezApi.ezIsNotEmptyString(ezUi.ezGetInputValue('_Invite_PhoneNumber'))
                ? ezApi.ezMessageTemplate`+1${ezUi.ezGetInputValue('_Invite_PhoneNumber').toString()}`
                : '',
            pin: ezUi.ezGetInputValue('EzEmployeeInvite_PinNumber'),
            sendInviteByEmail: sendEmailInvite,
            sendInviteByPhone: sendPhoneInvite,
            targetTimeZoneId: ezApi.ezclocker.ezDateTime.activeTimeZone,
            authorities: selectedAuthorities,
            permissions: ezApi.ezIsNotEmptyString(ezUi.ezGetInputValue('EzEmployeeInvite_PinNumber'))
                ? ['DISALLOW_EMPLOYEE_TIMEENTRY']
                : []
        });

        ezUi.ezStartPageWaitExecute(waitMessage,
            (waitDone) => ezApi.ezclocker.http.ezPost(self.INVITE_EMPLOYEE_API_ROOT, payload)
                .then(ezApi.ezclocker.ezServices.ezProcessApiResolve, ezApi.ezclocker.ezServices.ezProcessApiReject)
                .then(
                    (response) => self.ezSetEmployeeTeamPermissions(response.employee).then(
                        () => {
                            waitDone();
                            self.ezClose();
                            ezApi.ezclocker.ezEventEngine.ezTriggerEvent(
                                self.ezEventNames.onInviteEmployeeDialogEmployeeAdded,
                                ezApi.ezclocker.ezEventEngine.ezBuildEventData(
                                    EzInviteEmployeeDialog.ezApiName,
                                    'Added mew employee',
                                    response));
                        },
                        (eResponse) => {
                            waitDone();
                            self.ezClose();
                            ezApi.ezclocker.logger.error(ezApi.ezEM`
                                Failed to set DISALLOW_EMPOLOYEE_TIMEENTRY value for
                                employeeId=${response.employee.id}. Error: ${ezApi.ezToJson(eResponse)}`);

                            ezApi.ezclocker.ezEventEngine.ezTriggerEvent(
                                self.ezEventNames.onInviteEmployeeDialogEmployeeAddError,
                                ezApi.ezclocker.ezEventEngine.ezBuildEventData(
                                    EzInviteEmployeeDialog.ezApiName,
                                    'Add employee error',
                                    eResponse));
                        }),
                    (eResponse) => {
                        waitDone();
                        if (409 == eResponse.errorCode || 19 == eResponse.errorCode) {
                            ezApi.ezclocker.ezDialog.ezShowOK('PIN Number in Use', eResponse.message)
                                .then(ezApi.ezIgnoreResolve);
                        } else if (8 == eResponse.errorCode) {
                            ezApi.ezclocker.ezDialog.ezShowOK('Account Already Exists', ezApi.ezTemplate`
                            An ezClocker account already exists using the email address
                            "${ezUi.ezGetInputValue('_Invite_EmailAddress')}".
                            <p>
                                EzClocker only allows one account per email address.
                                Please use a different email address.
                            </p>`)
                                .then(() => {
                                    ezUi.ezFocus('_Invite_EmailAddress');
                                    ezUi.ezSelectAll('_Invite_EmailAddress');
                                });
                        } else {
                            ezApi.ezclocker.logger.error(ezApi.ezEM`
                            Failed to add/invite a new employee. Error: ${ezApi.ezToJson(eResponse)}`);
                        }

                        ezApi.ezclocker.ezEventEngine.ezTriggerEvent(
                            self.ezEventNames.onInviteEmployeeDialogEmployeeAddError,
                            ezApi.ezclocker.ezEventEngine.ezBuildEventData(
                                EzInviteEmployeeDialog.ezApiName,
                                'Add employee error',
                                eResponse));
                    }));
    }

    /**
     * @public
     * Adds the default employee permissions for teams.
     *
     * @param {object} employee
     *
     * @returns {Promise}
     */
    ezSetEmployeeTeamPermissions(employee) {
        if (ezApi.ezIsNotValid(employee) || !ezApi.ezStringHasLength(employee.teamPin)) {
            return ezApi.ezResolve(employee);
        }

        let url = ezApi.ezclocker.nav.getInternalApiUrl(ezApi.ezUrlTemplate`users/${employee.id}/permissions`);

        return ezApi.ezclocker.http.ezPost(url, ezApi.ezToJson({
            employeeId: employee.id,
            enabled: true,
            permissionId: 'DISALLOW_EMPLOYEE_TIMEENTRY'
        }))
            .then(ezApi.ezclocker.ezServices.ezProcessApiResolve, ezApi.ezclocker.ezServices.ezProcessApiReject);
    }

    /**
     * @protected
     * Validates the dialogs input data
     */
    ezValidate() {
        let self = ezApi.ezclocker[EzInviteEmployeeDialog.ezApiName];

        let vResponse = ezApi.ezclocker.ezValidation.ezValidateEmployeeName(ezUi.ezGetInputValue('_Invite_Name'));
        if (0 != vResponse.errorCode) {
            self.ezShowError(vResponse.message);
            ezUi.ezDisable('_Invite_InviteButton');
            return vResponse;
        }

        let inviteEmail = ezApi.ezStringOrEmpty(ezUi.ezGetInputValue('_Invite_EmailAddress')).trim();
        ezUi.ezSetInputValue('_Invite_EmailAddress', inviteEmail);

        vResponse = ezApi.ezclocker.ezValidation.ezValidateEmailAddress(inviteEmail);
        if (0 != vResponse.errorCode) {
            self.ezShowError(vResponse.message);
            ezUi.ezDisable('_Invite_InviteButton');
            return vResponse;
        }


        if (ezUi.ezIsCheckBoxChecked('EzRadioSendInviteByEmail') && ezApi.ezStringHasLength(inviteEmail)) {
            vResponse.errorCode = 1;
            vResponse.message = 'You must enter an email address if you want to send an email';
            ezUi.ezDisable('_Invite_InviteButton');
            return vResponse;
        }

        vResponse = ezApi.ezclocker.ezValidation.ezValidatePhoneNumber(
            ezUi.ezGetInputValue('_Invite_PhoneNumber'),
            ezUi.ezIsCheckBoxChecked('EzRadioSendInviteByPhone'));

        if (0 != vResponse.errorCode) {
            ezUi.ezDisable('_Invite_InviteButton');
            return vResponse;
        }

        ezUi.ezEnable('_Invite_InviteButton');

        return {
            errorCode: 0,
            message: 'Success'
        };
    }

    /**
     * @protected
     * Shows an error message dialog;
     */
    ezShowError(message) {
        ezUi.ezHtmlAndShow('_InviteErrorMessage', message);
    }

    /**
     * [EVENT HANDLER]
     *
     * @protected
     * Shows the failure message in a dialog.
     */
    ezOnFailureInviteDialog(event, eResponse) {
        ezApi.ezclocker.logger.error(ezApi.ezEM`Failed to invite employee: ${ezApi.ezToJson(eResponse)}`);
        ezApi.ezclocker.ezDialog.ezShowError('Invite Employee Error', event.detail.message);
    }

    /**
     * @protected
     * Handles the Pin inputs onkeypress event.
     */
    ezOnPinKeyPress() {
        let value = ezUi.ezGetInputValue('EzEmployeeInvite_PinNumber');

        ezUi.ezHideElement('EzEmployeeInvite_PinNumberError');
        if (!ezApi.ezStringHasLength(value)) {
            return; // empty string will result in null
        }

        if (4 < value.length) {
            ezUi.ezSetInputValue('EzEmployeeInvite_PinNumber', value.substring(0, 4));
        }
    }

    /**
        @protected
        Handles the invite employee name input element's onblur event.
     */
    ezOnInviteEmployeeNameBlur() {
        ezUi.ezHideElement('_InviteErrorMessage');

        let value = ezUi.ezGetInputValue('_Invite_Name');

        if (!ezApi.ezStringHasLength(value)) {
            ezApi.ezId('_Invite_Name').css('border', '1px solid #FF0700');
            ezApi.ezId('_Invite_Name').css('background-color', '#ffeeee');
            ezUi.ezDisable('_Invite_InviteButton');
        } else {
            ezUi.ezEnable('_Invite_InviteButton');
            ezApi.ezId('_Invite_Name').css('border', '');
            ezApi.ezId('_Invite_Name').css('background-color', '');
        }
    }

    /**
        @protected
        Handles the invite employee email input element's onblur event.
     */
    ezOnInviteEmployeeEmailIdBlur() {
        ezUi.ezHideElement('_InviteErrorMessage');

        let phoneValue = ezUi.ezGetInputValue('_Invite_PhoneNumber').trim();
        let emailValue = ezUi.ezGetInputValue('_Invite_EmailAddress').trim();

        if (ezApi.ezStringHasLength(emailValue) && !ezApi.ezStringHasLength(phoneValue) &&
            !ezApi.ezId('EzRadioSendInviteByPhone').prop('checked')) {
            ezApi.ezId('EzRadioSendInviteByEmail').iCheck('check');
            ezApi.ezId('EzRadioSendInviteByPhone').iCheck('uncheck');
            ezUi.ezEnable('_Invite_InviteButton');
        }
    }

    /**
        @protected
        Handles the invite employee phone number input element's onblur event.
     */
    ezOnInviteEmployeePhoneNumberBlur() {
        let self = ezApi.ezclocker[EzInviteEmployeeDialog.ezApiName];

        ezUi.ezHide('_InviteErrorMessage');

        let phoneValue = ezUi.ezGetInputValue('_Invite_PhoneNumber').trim();
        let emailValue = ezUi.ezGetInputValue('_Invite_EmailAddress').trim();

        if (!ezApi.ezIsEmptyString(phoneValue) && ezApi.ezIsEmptyString(emailValue) &&
            !ezApi.ezId('EzRadioDonotSendInvite').prop('checked')) {
            ezUi.ezSetCheckboxValue('EzRadioSendInviteByEmail', false).iCheck('uncheck');
            ezUi.ezSetCheckboxValue('EzRadioSendInviteByPhone', true);
            ezUi.ezEnable('_Invite_InviteButton');
        } else {
            self.ezOnInviteEmployeeEmailIdBlur();
        }
    }

    /**
     * @protected
     * Updates the help text for the selected role
     */
    ezUpdateRoleHelp() {
        let selectedRole = ezUi.ezGetInputValue('EzAddEditEmployeeDialogRoleSelect');

        if ('ROLE_EMPLOYEE' === selectedRole) {
            ezUi.ezContent('EzAddEditEmployeeDialogRoleInfoBox', ezApi.ezTemplate`
                <div>
                    Employees only have access to the employee dashboard where they can:
                </div>
                <ul>
                    <li>Clock in and out</li>
                    <li>View time entries and edit notes</li>
                    <li>Optionally add and edit their time entries</li>
                    <li>View their schedule</li>
                </ul>`);
        } else if ('ROLE_MANAGER' === selectedRole) {
            ezUi.ezContent('EzAddEditEmployeeDialogRoleInfoBox', ezApi.ezTemplate`
                <div>
                    Managers have nearly the same access as the Employer account except for the following:
                </div>
                <ul>
                    <li>Cannot subscribe, cancel subscriptions, or change the subscription plan.</li>
                    <li>Cannot change the credit card or billing address.</li>
                    <li>Cannot change the employer email or password.</li>
                    <li>Managers cannot delete the employer account.</li>
                </ul>`);
        }
    }

    /**
        @protected
        Builds the dialog's HTML
     */
    ezBuildDialogHtml() {
        return ezApi.ezTemplate`
            <!--Invite Employee Dialog -->
            <div id="inviteEmployeeDialog" class="ezAutoRow" title="Add Employee">
                <div id="EzAddEditEmployeeDialogCols" class="ezAutoCol_50xA">
                    <div id="EzAddEditEmployeeDialogInfoCol" class="ezPaddedBox4">
                        <div class="ezErrorBox" id="_InviteErrorMessage" style="display:none"></div>
                        <div class="ezPaddedBox4">
                            <label for="_Invite_Name" class="ezInputLabel">
                                Name
                            </label>
                            <input type="text" style="padding-top: 4px; width: 100%" id="_Invite_Name" name="name" />
                        </div>
                    <div class="ezPaddedBox4">
                        <label for="_Invite_EmailAddress" class="ezInputLabel">
                            Email Address
                        </label>
                        <input type="text" style="padding-top: 4px; width: 100%"
                            id="_Invite_EmailAddress" name="emailAddress" />
                    </div>
                    <div class="ezPaddedBox4">
                        <label for="_Invite_PhoneNumber" class="ezInputLabel">Phone Number</label>
                        <input id="_Invite_PhoneNumber" type="text" maxlength="10" style="padding-top: 4px; width: 100%"
                            pattern="[0-9.]+" placeholder="optional - start with area code - numbers only"
                            name="phoneNumber" />
                    </div>
                    <div class="ezPaddedBox4">
                        <label for="EzEmployeeInvite_PinNumber" class="ezInputLabel">
                            Kiosk PIN Number
                            <label class="whatIsThisLink">(</label>
                            <a id="EzLearnAboutPinNumber" title="Learn more about sending invites to your employee."
                                href="#" class="whatIsThisLink">
                                what is this?
                            </a>
                            <label class="whatIsThisLink">)</label>
                        </label>
                        <input id="EzEmployeeInvite_PinNumber" type="number" placeholder="optional" maxlength="4"
                            max="9999" class="ezNumber ezFullWidthEditor" name="teamPin"/>
                        <div id="EzEmployeeInvite_PinNumberError" class="ezErrorBox" style="display:none"></div>
                    </div>
                    <!-- OLD Invite Checkbox
                    <div id="EzAddEditEmployeeInviteCheckContainer" class="ezPaddedBox4">
                        <input id="_sendInvite" type="checkbox" name="sendInvitation" value="sendInvitation" />
                        <label for="_sendInvite" class="ezInputLabel">
                            Invite employee to ezClocker
                            <label class="whatIsThisLink">(</label>
                            <a id="EzLearnAboutInviteEmployee" title="Learn more about sending invites to your employee."
                                href="#" class="whatIsThisLink">
                                what is this?
                            </a>
                            <label class="whatIsThisLink">)</label>
                        </label>
                    </div>
                    -->
                    <div id="EzSendInviteRadioButtonSet" class="ezPaddedBox4">
                        <table>
                            <tr>
                                <td style="white-space: nowrap;">
                                    <label for="EzRadioSendInviteByEmail">
                                    <input type="radio" id="EzRadioSendInviteByEmail" name="Send_Invite" checked/>
                                    Send invite via Email
                                    </label>
                                </td>
                                <td style="white-space: nowrap;padding-left: 15px;">
                                    <label for="EzRadioSendInviteByPhone">
                                        <input type="radio" id="EzRadioSendInviteByPhone" name="Send_Invite"/>
                                        Send invite via SMS
                                    </label>
                                </td>
                                <td style="white-space: nowrap;padding-left: 15px;">
                                    <label for="EzRadioDonotSendInvite">
                                        <input type="radio" id="EzRadioDonotSendInvite" name="Send_Invite"/>
                                            Do not send an invite
                                    </label>
                                </td>
                            </tr>
                        </table>
                    </div>
                </div>
                <div id="EzAddEditEmployeeDialogRoleCol" class="ezPaddedBox4">
                    <label id="EzAddEditEmployeeDialogRoleLabel" for="EzAddEditEmployeeDialogRoleSelect"
                        class="ezInputLabel">
                        Role
                    </label>
                    <select id="EzAddEditEmployeeDialogRoleSelect" class="ezSelect ezFullWidthEditor">
                        <option id="EzAddEditEmployeeDialogRoleOptionEmployee" class="ezOption"
                            value="${EzUserRole.ROLE_EMPLOYEE}">
                            ${EzUserRole.ezToRoleName(EzUserRole.ROLE_EMPLOYEE)}
                        </option>
                        <option id="EzAddEditEmployeeDialogRoleOptionManager" class="ezOption"
                            value="${EzUserRole.ROLE_MANAGER}">
                            ${EzUserRole.ezToRoleName(EzUserRole.ROLE_MANAGER)}
                        </option>
                    </select>
                    <div id="EzAddEditEmployeeDialogRoleInfoBox" class="ezInfoBox">
                        Employees only have access to the employee dashboard where they can:
                        <ul>
                            <li>Clock in and out</li>
                            <li>View time entries and edit notes</li>
                            <li>Optionally add and edit their time entries</li>
                            <li>View their schedule</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>`;
    }
}


export {
    EzInviteEmployeeDialog
};
