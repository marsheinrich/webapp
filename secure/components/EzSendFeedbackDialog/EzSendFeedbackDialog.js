import { EzClass } from '/ezlibrary/EzClass.js';

import { EzClockerContext } from '/ezlibrary/EzClockerContext/ez-context.js';

import { EzUI } from '/public/javascript/common/ezui.js';

import { EzDialogConfig } from '/ezlibrary/ux/dialogs/EzDialogConfig.js';

import { EzDialog } from '/public/javascript/common/ezclocker-dialog-helper.js';

/**
    Provides a send feedback dialog to the main website.
    Import from:
    import { EzSendFeedbackDialog } from '/secure/components/EzSendFeedbackDialog/EzSendFeedbackDialog.js';
 */
class EzSendFeedbackDialog extends EzClass {
    static ezInstance = null;
    static ezApiRegistrationState = null;

    static get ezApiName() {
        return 'ezSendFeedbackDialog';
    }

    static get ezEventNames() {
        return {
            onReady: 'ezOn_EzSendFeedbackDialog_Ready',
            ezOnSendFeedbackDialogClose: 'EzSendFeedbackDialog_Close',
            ezOnSendFeedbackDialogCancel: 'EzSendFeedbackDialog_Cancel',
            ezOnSendFeedbackDialogSubmit: 'EzSendFeedbackDialog_Submit',
            ezOnSendFeedbackDialogError: 'EzSendFeedbackDialog_Error'
        };
    }

    static get ezCanRegister() {
        return 'PENDING' === EzSendFeedbackDialog.ezApiRegistrationState &&
            Object.prototype.hasOwnProperty.call(globalThis, 'ezApi') &&
            globalThis.ezApi && globalThis.ezApi.ready &&

            globalThis.ezApi.ezclocker[EzClockerContext.ezApiName] &&
            globalThis.ezApi.ezclocker[EzClockerContext.ezApiName] .ready &&

            globalThis.ezApi.ezclocker[EzUI.ezApiName] &&
            globalThis.ezApi.ezclocker[EzUI.ezApiName] .ready &&

            globalThis.ezApi.ezclocker[EzDialog.ezApiName] &&
            globalThis.ezApi.ezclocker[EzDialog.ezApiName] .ready;
    }

    static #ezRegistrator() {
        if (!EzSendFeedbackDialog.ezCanRegister) {
            return false;
        }

        EzSendFeedbackDialog.ezInstance = ezApi.ezRegisterNewApi(EzSendFeedbackDialog);
        EzSendFeedbackDialog.ezApiRegistrationState = 'REGISTERED';
        return true;
    }
    // Static constructor
    static {
        if (null == this.ezApiRegistrationState) {
            this.ezApiRegistrationState = 'PENDING';

            if (!this.#ezRegistrator()) {
                document.addEventListener(
                    'onEzApiReady',
                    () => {
                        if (!this.#ezRegistrator()) {
                            document.addEventListener(
                                EzClockerContext.ezEventNames.onReady,
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

    /**
        @public @constructor
     */
    constructor() {
        super();
    }

    /**
        @public @readonly @property
        @returns {string}
     */
    get ezDialogId() {
        return 'EZCSendFeedbackDialog';
    }

    /**
        @deprecated
        Migrate to static reference: EzSendFeedbackDialog.ezEventNames
        @public @readonly @property
        @returns {object}
     */
    get ezEventNames() {
        return EzSendFeedbackDialog.ezEventNames;
    }


    /**
        @protected
        Initializes EzSendFeedbackDialog
        @returns {EzSendFeedbackDialog}
     */
    ezInit() {
        ezApi.ezclocker.ezEventEngine.ezRegisterEvent(
            EzSendFeedbackDialog.ezApiName,
            EzSendFeedbackDialog.ezEventNames.ezOnSendFeedbackDialogClose);

        ezApi.ezclocker.ezEventEngine.ezRegisterEvent(
            EzSendFeedbackDialog.ezApiName,
            EzSendFeedbackDialog.ezEventNames.ezOnSendFeedbackDialogCancel);

        ezApi.ezclocker.ezEventEngine.ezRegisterEvent(
            EzSendFeedbackDialog.ezApiName,
            EzSendFeedbackDialog.ezEventNames.ezOnSendFeedbackDialogSubmit);

        ezApi.ezclocker.ezEventEngine.ezRegisterEvent(
            EzSendFeedbackDialog.ezApiName,
            EzSendFeedbackDialog.ezEventNames.ezOnSendFeedbackDialogError);

        EzSendFeedbackDialog.ezInstance.ezInitUX();

        return EzSendFeedbackDialog.ezInstance;
    }

    /**
        @public
        Injects the dialog into the body of an html page.
     */
    ezInitUX() {
        const self = EzSendFeedbackDialog.ezInstance;

        ezApi.ezclocker.ezUi.ezAppendContent('_HideDialogsDiv', self.ezBuildDialogHTML());

        let dialogConfig = new EzDialogConfig(self.ezDialogId);
        dialogConfig.width = 500;
        dialogConfig.dialogClass = 'no-close';
        dialogConfig.buttons = [
            {
                text: 'Send',
                id: 'EZCSendFeedbackButton',
                click: self.ezSubmit,
                style: 'font-weight:bold'
            },
            {
                text: 'Skip',
                id: 'EZCSkipSendFeedbackButton',
                click: self.ezSkipFeedback
            },
            {
                text: 'Do not cancel my subscription',
                id: 'EZCCancel',
                click: self.ezCancel
            }
        ];
        dialogConfig.close = () => {
            ezApi.ezclocker.ezEventEngine.ezTriggerEvent(
                self.ezEventNames.ezOnSendFeedbackDialogClose,
                ezApi.ezclocker.ezEventEngine.ezBuildEventData(
                    EzSendFeedbackDialog.ezApiName,
                    'Send feedback dialog closed.'));
        };
        ezApi.ezclocker.ezDialog.ezInitDialogWithConfig(self.ezDialogId, dialogConfig);
    }

    /**
        @public
        @param {funciton|null} closeCallback
     */
    ezShow() {
        const self = EzSendFeedbackDialog.ezInstance;

        ezApi.ezclocker.ezDialog.ezShowDialog(self.ezDialogId).then(() => {
            ezApi.ezclocker.ezUi.ezFocus('EZCSendFeedbackData');
        });
    }

    /**
        @public
        Closes the dialog
     */
    ezClose() {
        const self = EzSendFeedbackDialog.ezInstance;

        ezApi.ezclocker.ezDialog.ezCloseDialog(self.ezDialogId);
    }

    /**
        @public
        Cancels sending feedback and following operaions
     */
    ezCancel() {
        const self = EzSendFeedbackDialog.ezInstance;

        ezApi.ezclocker.ezEventEngine.ezTriggerEvent(
            self.ezEventNames.ezOnSendFeedbackDialogCancel,
            ezApi.ezclocker.ezEventEngine.ezBuildEventData(
                EzSendFeedbackDialog.ezApiName,
                'Send feedback dialog canceled.'));
        self.ezClose();
    }

    /**
        @public
        Skips sending feedback but continues with operations
     */
    ezSkipFeedback() {
        const self = EzSendFeedbackDialog.ezInstance;

        ezApi.ezclocker.ezEventEngine.ezTriggerEvent(
            self.ezEventNames.ezOnSendFeedbackDialogSubmit,
            ezApi.ezclocker.ezEventEngine.ezBuildEventData(
                EzSendFeedbackDialog.ezApiName,
                'Send feedback dialog submit, skipped.'));

        self.ezClose();
    }

    /**
        @public
        Submits the feedback
     */
    ezSubmit() {
        const self = EzSendFeedbackDialog.ezInstance;

        ezApi.ezclocker.ezHttpHelper.post(
            ezApi.ezclocker.ezNavigation.getInternalApiServiceUrl('feedback', 'v1'),
            ezApi.ezToJson({
                event: 'SendFeedback',
                source: 'WEBSITE',
                details: ezApi.ezHtmlEncode(ezApi.ezclocker.ezUi.ezGetInputValue('EZCSendFeedbackData'))
            }))
            .then(
                () => {
                    ezApi.ezclocker.ezEventEngine.ezTriggerEvent(
                        self.ezEventNames.ezOnSendFeedbackDialogSubmit,
                        ezApi.ezclocker.ezEventEngine.ezBuildEventData(
                            EzSendFeedbackDialog.ezApiName,
                            'Send feedback dialog submit.',
                            ezApi.ezclocker.ezUi.ezGetInputValue('EZCSendFeedbackData')));
                    self.ezClose();
                },
                (eResponse) => {
                    ezApi.ezclocker.logger.error(
                        ezApi.ezEM`Failed to send feedback to ezClocker: ${ezApi.ezToJson(eResponse)}`);
                    ezApi.ezclocker.ezEventEngine.ezTriggerEvent(
                        self.ezEventNames.ezOnSendFeedbackDialogError,
                        ezApi.ezclocker.ezEventEngine.ezBuildEventData(
                            EzSendFeedbackDialog.ezApiName,
                            'Send feedback dialog submit.',
                            ezApi.ezclocker.ezUi.ezGetInputValue('EZCSendFeedbackData')));
                    self.ezClose();
                });
    }

    /**
        @protected
        Builds the dialogs UX HTML
        @returns {String}
     */
    ezBuildDialogHTML() {
        const self = EzSendFeedbackDialog.ezInstance;

        return ezApi.ezTemplate`
            <style>
            .no-close .ui-dialog-titlebar-close {
                display: none
            }
            div.feedbackInputContainer {
                margin-top: 20px;
            }
            textarea.feedbackInput {
                margin-top: 10px;
                width: 100%;
                height: 150px;
                resize: none;
            }
            </style>
            <div id="${self.ezDialogId}" class="sendFeedbackDialog" title="Send Feedback">
                <h2>Please let us know why you canceled your subscription.</h2>
                <div class="feedbackInputContainer">
                    <textarea class="feedbackInput" id="EZCSendFeedbackData"></textarea>
                </div>
                <p>
                    We use your feedback to help us understand what you need from time tracking software.
                    Customer feedback drives how we determine and prioritize features and improvements.
                </p>
                <h4>Thank you from everyone at ezClocker!</h4>
            </div>`;
    }
}

export {
    EzSendFeedbackDialog
};
