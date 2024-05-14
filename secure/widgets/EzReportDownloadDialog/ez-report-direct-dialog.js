import { EzUI } from '/public/javascript/common/ezui.js';

import { EzDialogConfig } from '/ezlibrary/ux/dialogs/EzDialogConfig.js';

import { EzDialog } from '/public/javascript/common/ezclocker-dialog-helper.js';
/**
    Provides the download button for reports
 */
class EzReportDirectDialog {
    /** @public @static @property */
    static ezApiName = 'EzReportDirectDialog';
    /** @public @static @property */
    static ezEventNames = {
        onReady: 'ezOn_EzReportDirectDialog_Ready',
    };

    /** @public @static @property */
    static ezInstance = null;

    /** @private @static @property */
    static ezApiRegistrationState = null;

    /** @private @static @method */
    static ezCanRegister() {
        return 'PENDING' === EzReportDirectDialog.ezApiRegistrationState &&
            Object.prototype.hasOwnProperty.call(globalThis, 'ezApi') && globalThis['ezApi'].ready &&
            ezApi.ezclocker[EzUI.ezApiName] && ezApi.ezclocker[EzUI.ezApiName].ready &&
            ezApi.ezclocker[EzDialog.ezApiName] && ezApi.ezclocker[EzDialog.ezApiName].ready;
    }

    /** @private @static @method */
    static ezRegistrator() {
        if (EzReportDirectDialog.ezCanRegister()) {

            EzReportDirectDialog.ezInstance = ezApi.ezRegisterNewApi(
                EzReportDirectDialog,
                EzReportDirectDialog.ezApiName);

            EzReportDirectDialog.ezApiRegistrationState = 'REGISTERED';
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
        this.ezTypeName = 'EzReportDirectDialog';

        this.parentContainerId = '_HideDialogsDiv';
        this.ezDialogId = 'EzReportDirectDialog';
        this.ezDialogTitle = 'ezClocker Export Time Sheets';

        this.ezDoneCallback = null;
        this.ezDownloadUrl = '#';
        this.ezTargetWindowId = '_DOWNLOAD_REPORT';
    }

    ezInit() {
        const self = ezApi.ezclocker[EzReportDirectDialog.ezApiName];
        self.ezInitUX();

        self.ready = true;
        return self;
    }

    ezInitUX() {
        const self = ezApi.ezclocker[EzReportDirectDialog.ezApiName];

        self.ezInjectDialog();
    }

    ezInjectDialog() {
        const self = ezApi.ezclocker[EzReportDirectDialog.ezApiName];

        if (!ezUi.ezDoesElementExist(self.parentContainerId)) {
            ezUi.ezAppendContent('body', ezApi.ezTemplate`
                <div id="${self.parentContainerId}" style="display:none"></div>`);
        }

        ezUi.ezAppendContent(self.parentContainerId, ezApi.ezTemplate`
            <div id="${self.ezDialogId}">
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

    ezShow(downloadUrl, doneCallback) {
        const self = ezApi.ezclocker.EzReportDirectDialog;

        self.ezDownloadUrl = ezApi.ezStringHasLength(downloadUrl)
            ? downloadUrl
            : '#';
        self.ezDoneCallback = ezApi.ezIsFunction(doneCallback)
            ? doneCallback
            : null;

		self.doExport(downloadUrl, self.ezShow2);
		
    }
	
    ezShow2(response) {
        const self = ezApi.ezclocker.EzReportDirectDialog;
        ezApi.ezclocker.ezwEmployerExportTimeSheetDialog.ezClose();
        if (ezApi.ezIsFunction(self.ezDoneCallback)) {
            self.ezDoneCallback();
        }
		
		const errCode = response ? ezApi.ezReturnValidOrDefault(response.errorCode, 0) : 0;
		const numEntriesExported = response ? ezApi.ezReturnValidOrDefault(response.numEntriesExported, 0) : 0;

		let htmlContent = '';
		if (errCode != 0) {
			const errMsg = response ? ezApi.ezReturnValidOrDefault(response.message, '') : '';
			htmlContent =  ezApi.ezTemplate`
			    <h3>Export Failed</h3>
				<div>${errMsg}</div>
			    `;
		} else if (numEntriesExported == 0) {
			htmlContent =  ezApi.ezTemplate`
			    <h3>No time entries are available within the period.</h3>
			    `;
		} else {
			htmlContent =  ezApi.ezTemplate`
			    <h3>You have successfully exported ${numEntriesExported} time entries.</h3>
			    `;
		}
			
        ezApi.ezclocker.ezUi.ezContent(
            `${self.ezDialogId}_LinkContainer`,
			htmlContent);

        ezApi.ezclocker.ezDialog.ezShowDialogById(self.ezDialogId);
    }
	
    doExport(url, doneCallback) {
        const self = ezApi.ezclocker.EzReportDirectDialog;
        return ezApi.ezPromise(
            (resolve, reject) => {
                return ezApi.ezclocker.ezHttpHelper.ezGet(
                    url)
                    .then(
                        ezApi.ezclocker.ezHttpHelper.ezProcessApiResolve,
                        ezApi.ezclocker.ezHttpHelper.ezProcessApiReject)
                    .then(
                        (response) => {
							doneCallback(response);
                            return resolve(response);
                        },
                        (eResponse) => {
//                            ezApi.ezclocker.ezLogger.error(
//                                ezApi.ezEM`
//                                    Failed to refreshz.
//                                    Error: ${ezApi.ezToJson(eResponse)}`);
//                            return reject(eResponse);
							doneCallback(eResponse);
                            return resolve(eResponse);
                        });
            });
    }
	
	self1
	

    /**
     * @public
     * Closes the open dialog
     */
    ezClose() {
        const self = ezApi.ezclocker[EzReportDirectDialog.ezApiName];

        if (ezApi.ezIsFalse(self.ezIsVisible)) {
            return;
        }

        ezUi.ezClearContent(ezApi.ezIdTemplate`${self.ezDialogId}_LinkContainer`);
        ezApi.ezclocker.ezDialog.ezCloseDialogById(self.ezDialogId);
    }
}

export {
    EzReportDirectDialog
};
