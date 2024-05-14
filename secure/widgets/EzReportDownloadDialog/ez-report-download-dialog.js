import { EzUI } from '/public/javascript/common/ezui.js';

import { EzDialogConfig } from '/ezlibrary/ux/dialogs/EzDialogConfig.js';

import { EzDialog } from '/public/javascript/common/ezclocker-dialog-helper.js';
/**
    Provides the download button for reports
 */
class EzReportDownloadDialog {
    /** @public @static @property */
    static ezApiName = 'ezReportDownloadDialog';
    /** @public @static @property */
    static ezEventNames = {
        onReady: 'ezOn_EzReportDownloadDialog_Ready',
    };

    /** @public @static @property */
    static ezInstance = null;

    /** @private @static @property */
    static ezApiRegistrationState = null;

    /** @private @static @method */
    static ezCanRegister() {
        return 'PENDING' === EzReportDownloadDialog.ezApiRegistrationState &&
            Object.prototype.hasOwnProperty.call(globalThis, 'ezApi') && globalThis['ezApi'].ready &&
            ezApi.ezclocker[EzUI.ezApiName] && ezApi.ezclocker[EzUI.ezApiName].ready &&
            ezApi.ezclocker[EzDialog.ezApiName] && ezApi.ezclocker[EzDialog.ezApiName].ready;
    }

    /** @private @static @method */
    static ezRegistrator() {
        if (EzReportDownloadDialog.ezCanRegister()) {
            EzReportDownloadDialog.ezInstance = ezApi.ezRegisterNewApi(
                EzReportDownloadDialog,
                EzReportDownloadDialog.ezApiName);

            EzReportDownloadDialog.ezApiRegistrationState = 'REGISTERED';
        }
    }

    static {
        if (null == this.ezApiRegistrationState) {
            this.ezApiRegistrationState = 'PENDING';

            document.addEventListener(
                'onEzApiReady',
                this.ezRegistrator);

            document.addEventListener(
                EzUI.ezEventNames.onReady,
                this.ezRegistrator);

            document.addEventListener(
                EzDialog.ezEventNames.onReady,
                this.ezRegistrator);
        }
    }

    constructor() {
        this.ready = false;
        this.ezTypeName = 'EzReportDownloadDialog';

        this.parentContainerId = '_HideDialogsDiv';
        this.ezDialogId = 'EzReportDownloadDialog';
        this.ezDialogTitle = 'ezClocker Report Download';

        this.ezDoneCallback = null;
        this.ezDownloadUrl = '#';
        this.ezDownloadName = 'Click Here to Download the Report';
        this.ezTargetWindowId = '_DOWNLOAD_REPORT';
    }

    ezInit() {
        const self = ezApi.ezclocker[EzReportDownloadDialog.ezApiName];

        self.ezInitUX();

        self.ready = true;
        return self;
    }

    ezInitUX() {
        const self = ezApi.ezclocker[EzReportDownloadDialog.ezApiName];

        self.ezInjectDialog();
    }

    ezInjectDialog() {
        const self = ezApi.ezclocker[EzReportDownloadDialog.ezApiName];

        if (!ezUi.ezDoesElementExist(self.parentContainerId)) {
            ezUi.ezAppendContent('body', ezApi.ezTemplate`
                <div id="${self.parentContainerId}" style="display:none"></div>`);
        }

        ezUi.ezAppendContent(self.parentContainerId, ezApi.ezTemplate`
            <div id="${self.ezDialogId}">
                <h3>Your report is ready!</h3>
                <div id="${self.ezDialogId}_LinkContainer" style="margin-top:10px;padding:10px;text-align:center;">
                </div>
            </div>`);

        let ezDialogConfig = new EzDialogConfig(self.ezDialogId);
        ezDialogConfig.title = self.ezDialogTitle;
        ezDialogConfig.buttons = [
            {
                text: 'Close',
                id: ezApi.ezSingleLineTemplate`${self.ezDialogId}_Close`,
                click: self.ezClose
            }
        ];

        ezApi.ezclocker.ezDialog.ezInitDialogWithConfig(self.ezDialogId, ezDialogConfig);
    }

    ezShow(downloadUrl, downloadName, doneCallback) {
        const self = ezApi.ezclocker.ezReportDownloadDialog;

        self.ezDownloadUrl = ezApi.ezStringHasLength(downloadUrl)
            ? downloadUrl
            : '#';
        self.ezDownloadName = ezApi.ezIsEmptyString(downloadName)
            ? 'Click Here to Download the Report'
            : downloadName;
        self.ezDoneCallback = ezApi.ezIsFunction(doneCallback)
            ? doneCallback
            : null;

        ezApi.ezclocker.ezUi.ezContent(
            `${self.ezDialogId}_LinkContainer`,
            ezApi.ezTemplate`
                <a id="${self.ezDialogId}DownloadButton" href="${self.ezDownloadUrl}"
                    onclick="ezApi.ezclocker.ezReportDownloadDialog.ezClose()" class="ezDownloadLink">
                    <img src="/public/images/icons/download-white.svg"
                        style="margin-right:10px;width:24px;vertical-align:middle" alt="."/>
                    ${self.ezDownloadName}
                </a>`);

        ezApi.ezclocker.ezDialog.ezShowDialogById(self.ezDialogId);
    }

    /**
     * @public
     * Closes the open dialog
     */
    ezClose() {
        const self = ezApi.ezclocker[EzReportDownloadDialog.ezApiName];

        if (ezApi.ezIsFalse(self.ezIsVisible)) {
            return;
        }

        if (ezApi.ezIsFunction(self.ezDoneCallback)) {
            self.ezDoneCallback();
        }

        ezUi.ezClearContent(ezApi.ezIdTemplate`${self.ezDialogId}_LinkContainer`);
        ezApi.ezclocker.ezDialog.ezCloseDialogById(self.ezDialogId);
    }
}

export {
    EzReportDownloadDialog
};
