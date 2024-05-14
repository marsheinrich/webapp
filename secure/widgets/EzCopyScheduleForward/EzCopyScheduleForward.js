import { EzBadParamException } from '/ezlibrary/exceptions/EzBadParamException.js';

import { EzClass } from '/ezlibrary/EzClass.js';

import { EzValidationResponseStatus } from '/ezlibrary/EzValidationResponse.js';

import { EzEventEngine } from '/ezlibrary/ez-event-engine.js';

import { EzUI } from '/public/javascript/common/ezui.js';

import { EzDialogConfig } from '/ezlibrary/ux/dialogs/EzDialogConfig.js';

import { EzDialog } from '/public/javascript/common/ezclocker-dialog-helper.js';

/**
    View for the copy schedule forward feature on the ezClocker website for employers.
    Import with:
    import { EzCopyScheduleForwardView } from '/secure/widgets/EzCopyScheduleForward/EzCopyScheduleForward.js';
 */
class EzCopyScheduleForwardView extends EzClass {
    static ezApiName = 'ezCopyScheduleForwardView';
    static ezEventNames = {
        onReady: 'ezOn_EzCopyScheduleForwardView_Ready',
        onShow: 'ezOn_EzCopyScheduleForwardView_ShowEvent',
        onClose: 'ezOn_EzCopyScheduleForwardView_CloseEvent',
        onSubmitSuccess: 'ezOn_EzCopyScheduleForwardView_SubmitSuccessEvent',
        onSubmitFailure: 'ezOn_EzCopyScheduleForwardView_SubmitFailureEvent'
    };
    /** @public @static @property */
    static ezInstance =  null;
    /** @private @static @property */
    static ezApiRegistrationState =  null;
    static ezCanRegister() {
        return 'PENDING' === EzCopyScheduleForwardView.ezApiRegistrationState &&
                Object.prototype.hasOwnProperty.call(globalThis, 'ezApi') &&
                globalThis.ezApi && globalThis.ezApi.ready &&

                globalThis.ezApi.ezclocker[EzEventEngine.ezApiName] &&
                globalThis.ezApi.ezclocker[EzEventEngine.ezApiName].ready &&

                globalThis.ezApi.ezclocker[EzUI.ezApiName] &&
                globalThis.ezApi.ezclocker[EzUI.ezApiName].ready &&

                globalThis.ezApi.ezclocker[EzDialog.ezApiName] &&
                globalThis.ezApi.ezclocker[EzDialog.ezApiName].ready;
    }
    static ezRegistrator() {
        if (!EzCopyScheduleForwardView.ezCanRegister()) {
            return false;
        }

        EzCopyScheduleForwardView.ezInstance = ezApi.ezRegisterNewApi(
            EzCopyScheduleForwardView,
            EzCopyScheduleForwardView.ezApiName);
        EzCopyScheduleForwardView.ezApiRegistrationState = 'REGISTERED';
        return true;
    }
    static {
        if (null == this.ezApiRegistrationState) {
            this.ezApiRegistrationState = 'PENDING';

            if (!this.ezRegistrator()) {
                document.addEventListener(
                    'onEzApiReady',
                    this.ezRegistrator);

                document.addEventListener(
                    EzEventEngine.ezEventNames.onReady,
                    this.ezRegistrator);

                document.addEventListener(
                    EzUI.ezEventNames.onReady,
                    this.ezRegistrator);

                document.addEventListener(
                    EzDialog.ezEventNames.onReady,
                    this.ezRegistrator);
            }
        }
    }

    /**
        @public @constructor
     */
    constructor() {
        super();
    }

    ezSchedulesToCopyForward = [];
    ezEmployeeId = -1;
    ezEmployerId = -1;

    get ezParentContainerId() {
        return '_HideDialogsDiv';
    }

    get MINIMUM_COPY_WEEKS_VALUE() {
        return 1;
    }

    get MAXIMUM_COPY_WEEKS_VALUE() {
        return 8;
    }

    get ezDialogTitle() {
        return 'Copy Forward';
    }

    get ezDialogId() {
        return 'EzCopyScheduleForwardView';
    }

    get ezDialogButtonIds() {
        return {
            cancel: `${this.ezDialogId}_Cancel`,
            copy: `${this.ezDialogId}_Copy`
        };
    }

    get ezDialogInputIds() {
        return {
            ezNumberOfWeeksInputId: `${this.ezDialogId}_NumberOfWeeks`
        };
    }

    get ezEventNames() {
        return EzCopyScheduleForwardView.ezEventNames;
    }

    /**
        @protected
        Initializes EzCopyScheduleForwardView
     */
    ezInit() {
        ezApi.ezclocker.ezEventEngine.ezRegisterEvent(
            EzCopyScheduleForwardView.ezApiName,
            EzCopyScheduleForwardView.ezEventNames.onShow);
        ezApi.ezclocker.ezEventEngine.ezRegisterEvent(
            EzCopyScheduleForwardView.ezApiName,
            EzCopyScheduleForwardView.ezEventNames.onClose);
        ezApi.ezclocker.ezEventEngine.ezRegisterEvent(
            EzCopyScheduleForwardView.ezApiName,
            EzCopyScheduleForwardView.ezEventNames.onSubmitSuccess);
        ezApi.ezclocker.ezEventEngine.ezRegisterEvent(
            EzCopyScheduleForwardView.ezApiName,
            EzCopyScheduleForwardView.ezEventNames.onSubmitFailure);

        EzCopyScheduleForwardView.ezInstance.ezInitUX();

        return EzCopyScheduleForwardView.ezInstance;
    }

    /**
        @protected
        Initializes the EzCopyScheduleForwardView UX
     */
    ezInitUX() {
        let self = EzCopyScheduleForwardView.ezInstance;

        ezApi.ezclocker.ezUi.ezAppendContent(self.ezParentContainerId, self.ezBuildCopyScheduleDialogHtml());

        let dialogConfig = new EzDialogConfig(self.ezDialogId);

        dialogConfig.title = self.ezDialogTitle;

        dialogConfig.buttons = [
            {
                text: 'Cancel',
                id: ezApi.ezIdTemplate`${self.ezDialogId}_Cancel`,
                click: self.ezClose
            },
            {
                text: 'Copy',
                id: ezApi.ezIdTemplate`${self.ezDialogId}_Copy`,
                click: self.ezSubmit
            }
        ];
        ezApi.ezclocker.ezDialog.ezInitJQueryDialog(self.ezDialogId, dialogConfig);
    }

    ezBuildCopyScheduleDialogHtml() {
        return ezApi.ezTemplate`
            <div id="EzCopyScheduleForwardView">
                <div id="EzCopyScheduleForwardViewInstructionsContainer" class="ezInstructionContainer">
                    The copy forward feature allows you to duplicate the selected employee's schedule for a week to a
                    future week. You can duplicate an employee's schedule up to 8 weeks into the future at a time.
                </div>
                <div id="EzCopyScheduleForwardViewInputContainer" class="ezInputContainer">
                    <label for="EzCopyScheduleForwardView_NumberOfWeeks" class="ezInputLabel">
                        Enter the number of weeks you wish to copy the schedule forward (maximum of 8):
                    </label>
                    <input id="EzCopyScheduleForwardView_NumberOfWeeks" type="number" min="1" max="8" value="1"/>
                    <div id="EzCopyScheduleForwardView_ErrorMessage" class="ezHiddenDefault ezErrorContainer">
                        error
                    </div>
                </div>
            </div>`;
    }

    /**
        @public
        Sets the schedules to copy forward
        @param {array} selectedWeekSchedules
     */
    ezSetSelectedWeekSchedules(schedulesToCopyForward) {
        let self = EzCopyScheduleForwardView.ezInstance;

        self.ezSchedulesToCopyForward = ezApi.ezArrayHasLength(schedulesToCopyForward)
            ? schedulesToCopyForward
            : [];
    }

    /**
        @public
        Sets the employeeId to copy forward
        @param {*} employeeId
     */
    ezSetEmployeeId(employeeId) {
        let self = EzCopyScheduleForwardView.ezInstance;

        self.ezEmployeeId = ezApi.ezIsValid(employeeId)
            ? employeeId
            : -1;
    }

    /**
        @public
        Sets the employeeId to copy forward
        @param {*} employerId
     */
    ezSetEmployerId(employerId) {
        let self = EzCopyScheduleForwardView.ezInstance;

        self.ezEmployerId = ezApi.ezIsValid(employerId)
            ? employerId
            : -1;
    }

    ezShowError(em) {
        if (ezApi.ezStringHasLength(em)) {
            ezApi.ezclocker.ezUi.ezContent(
                'EzCopyScheduleForwardView_ErrorMessage',
                em);

            ezApi.ezclocker.ezUi.ezShowElement('EzCopyScheduleForwardView_ErrorMessage');
        }
    }

    ezHideError() {
        ezApi.ezclocker.ezUi.ezHideElement('EzCopyScheduleForwardView_ErrorMessage');
        ezApi.ezclocker.ezUi.ezClearContent('EzCopyScheduleForwardView_ErrorMessage');
    }

    ezReset() {
        let self = EzCopyScheduleForwardView.ezInstance;

        self.ezHideError();
    }

    /**
        @public
        Shows the view to the user
     */
    ezShow(employerId, employeeId, selectedWeekSchedules) {
        let self = EzCopyScheduleForwardView.ezInstance;

        if (!ezApi.ezIsNumber(employerId)) {
            throw new EzBadParamException(
                'employerId',
                self,
                self.ezShow);
        }
        if (!ezApi.ezIsNumber(employeeId)) {
            throw new EzBadParamException(
                'employeeId',
                self,
                self.ezShow);
        }
        if (!ezApi.ezIsValid(selectedWeekSchedules)) {
            throw new EzBadParamException(
                'selectedWeekSchedules',
                self,
                self.ezShow);
        }

        self.ezReset();

        self.ezSetSelectedWeekSchedules(selectedWeekSchedules);
        self.ezSetEmployeeId(employeeId);
        self.ezSetEmployerId(employerId);

        if (!ezApi.ezArrayHasLength(self.ezSchedulesToCopyForward)) {
            self.ezShowError('The selected employee does not have schedules to copy forward.');
        }

        if (!ezApi.ezIsValid(self.ezEmployeeId) || -1 === self.ezEmployeeId) {
            ezApi.ezclocker.logger.error('A valid employee id is required to copy forward schedules.');
            ezApi.ezclocker.ezDialog.ezReportInternalBugDialog(
                null,
                self.ezDialogTitle,
                'A valid employee id was not available for the copy forward feature.');
            return;
        }

        ezApi.ezclocker.ezDialog.ezShowDialogWithShowEvent(
            self.ezDialogId,
            EzCopyScheduleForwardView.ezEventNames.onShow);

        ezApi.ezclocker.ezEventEngine.ezTriggerEvent(EzCopyScheduleForwardView.ezEventNames.onShow);
    }

    /**
        @public
        Closes the visible view
     */
    ezClose() {
        let self = EzCopyScheduleForwardView.ezInstance;

        ezApi.ezclocker.ezDialog.ezCloseDialogById(
            self.ezDialogId,
            EzCopyScheduleForwardView.ezEventNames.onClose);

        ezApi.ezclocker.ezEventEngine.ezTriggerEvent(EzCopyScheduleForwardView.ezEventNames.onClose);
    }

    /**
        @public
        Returns the enter number of weeks (if a valid number). Zero otherwise.
     */
    ezGetCopyWeeks() {
        let self = EzCopyScheduleForwardView.ezInstance;

        let temp = ezApi.ezclocker.ezUi.ezGetInputValue(self.ezDialogInputIds.ezNumberOfWeeksInputId);

        if (ezApi.ezIsValid(temp)) {
            self.copyWeeks = parseInt(temp);
        } else {
            self.copyWeeks = 0;
            ezApi.ezclocker.ezSetInputValue(
                self.ezDialogInputIds.ezNumberOfWeeksInputId,
                self.copyWeeks);
        }
    }

    /**
        @protected
        Validates the data before submission
     */
    ezValidate() {
        let self = EzCopyScheduleForwardView.ezInstance;

        self.ezHideError();

        return ezApi.ezPromise(
            (resolve, reject) => {
                self.ezGetCopyWeeks();

                let vResponse = ezApi.ezclocker.ezValidation.ezValidateMinValue(
                    self.copyWeeks, self.MINIMUM_COPY_WEEKS_VALUE);
                if (EzValidationResponseStatus.ERROR == vResponse.ezGetStatus()) {
                    self.ezShowError(vResponse.message);
                    return reject();
                }

                vResponse = ezApi.ezclocker.ezValidation.ezValidateMaxValue(
                    self.copyWeeks, self.MAXIMUM_COPY_WEEKS_VALUE);
                if (EzValidationResponseStatus.ERROR == vResponse.ezGetStatus()) {
                    self.ezShowError(vResponse.message);
                    return reject();
                }

                return resolve();
            });
    }

    /**
        @protected
        Submits the data configured with the
     */
    ezSubmit() {
        let self = EzCopyScheduleForwardView.ezInstance;

        self.ezValidate()
            .then(
                () => {
                    let payload = {
                        scheduleIdsToCopyForward: self.ezSchedulesToCopyForward,
                        copyWeeks: self.copyWeeks,
                        targetTimeZone: ezApi.ezclocker.ezDateTime.activeTimeZone
                    };

                    if (ezApi.ezIsNumber(self.ezEmployerId)) {
                        payload.employerId = self.ezEmployerId;
                    }

                    if (ezApi.ezIsNumber(self.ezEmployeeId)) {
                        payload.employeeId = self.ezEmployeeId;
                    }

                    ezUi.ezStartPageWaitExecute(
                        ezApi.ezMsg`Copying employee schedules forward ${self.copyWeeks} weeks ...`,
                        (waitDone) => ezApi.ezclocker.http.ezPost(
                            ezApi.ezclocker.nav.getInternalClassicApiUrl(
                                ezApi.ezUrlTemplate`schedules/copy-forward/${self.ezEmployeeId}`),
                            ezApi.ezToJson(payload))
                            .then(
                                (response) => {
                                    waitDone();
                                    self.ezClose();

                                    ezApi.ezclocker.ezEventEngine.ezTriggerEvent(
                                        EzCopyScheduleForwardView.ezEventNames.onSubmitSuccess,
                                        ezApi.ezclocker.ezEventEngine.ezBuildEventData(
                                            EzCopyScheduleForwardView.ezApiName,
                                            'Copy forward completed',
                                            response));

                                    ezApi.ezclocker.ezDialog.ezShowMessage(self.ezDialogTitle,
                                        'Schedules successfully copied forward.');
                                },
                                (eResponse, jqXHR) => {
                                    waitDone();
                                    ezApi.ezclocker.ezEventEngine.ezTriggerEvent(
                                        EzCopyScheduleForwardView.ezEventNames.onSubmitFailure,
                                        ezApi.ezclocker.ezEventEngine.ezBuildEventData(
                                            EzCopyScheduleForwardView.ezApiName,
                                            'Copy forward completed',
                                            eResponse));
                                    ezApi.ezclocker.ezDialog.ezReportInternalBugDialog(
                                        jqXHR,
                                        self.ezDialogTitle,
                                        'Unable to copy forward schedules at this time.',
                                        ezApi.ezToJson(eResponse));
                                }),
                        ezApi.ezIgnoreReject);
                });
    }
}

export {
    EzCopyScheduleForwardView
};
