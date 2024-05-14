import { EzEnum } from '/ezlibrary/enums/EzEnum.js';

/**
    @public
    Constructor fo enumeration EzDialogPromptResult
    @returns {EzDialogPromptResult}
 */
export class EzDialogPromptResult extends EzEnum {
    static get ENUM_NAME() {
        return 'EzDialogResult';
    }
    static get UNKNOWN() {
        return 'UNKNOWN';
    }
    static get OK() {
        return 'OK';
    }
    static get CANCEL() {
        return 'CANCEL';
    }
    static get YES() {
        return 'YES';
    }
    static get NO() {
        return 'NO';
    }
    static get CONTINUE() {
        return 'CONTINUE';
    }
    static get CLOSE() {
        return 'CLOSE';
    }
    static get CUSTOM() {
        return 'CUSTOM';
    }

    static ezApiName = 'EzDialogPromptResult';
    static ezEventNames = {
        onReady: 'ezOn_EzDialogPromptResult_Ready'
    };
    static ezInstance = null;
    static ezApiRegistrationState = null;
    static ezCanRegister() {
        return 'PENDING' === EzDialogPromptResult.ezApiRegistrationState &&
            ezApi && ezApi.ready;
    }
    static ezRegistrator() {
        if (EzInstanceState.ezCanRegister())  {
            EzDialogPromptResult.ezInstance = ezApi.ezRegisterEnumeration(EzDialogPromptResult);

            EzDialogPromptResult.ezApiRegistrationState = 'REGISTERED';
        }
    }
    // Static Constructor
    static {
        if (null == this.ezApiRegistrationState) {
            this.ezApiRegistrationState = 'PENDING';

            document.addEventListener(
                'onEzApiReady',
                this.ezRegistrator);
        }
    }

    constructor() {
        super();
    }
}

class EzDialogPromptImages extends EzEnum {
    static get ENUM_NAME() {
        return 'EzDialogPromptImages';
    }
    static get UNKNOWN() {
        return 'UNKNOWN';
    }
    static get NONE() {
        return '';
    }
    static get INFO() {
        return ezApi.ezclocker.nav.getPublicImagesUrl('icons/info.svg');
    }
    static get WARN() {
        return ezApi.ezclocker.nav.getPublicImagesUrl('icons/warn-triangle-orange.svg');
    }
    static get ERROR() {
        return ezApi.ezclocker.nav.getPublicImagesUrl('icons/alert-dark-red.svg');
    }

    static ezApiName = 'EzDialogPromptImages';
    static ezEventNames = {
        onReady: 'ezOn_EzDialogPromptImages_Ready'
    };
    static ezInstance = null;
    static ezApiRegistrationState = null;
    static ezCanRegister() {
        return 'PENDING' === EzDialogPromptImages.ezApiRegistrationState &&
            ezApi && ezApi.ready;
    }
    static ezRegistrator() {
        if (EzDialogPromptImages.ezCanRegister())  {
            EzDialogPromptImages.ezInstance = ezApi.ezRegisterEnumeration(EzDialogPromptImages);

            EzDialogPromptImages.ezApiRegistrationState = 'REGISTERED';
        }
    }
    // Static Constructor
    static {
        if (null == this.ezApiRegistrationState) {
            this.ezApiRegistrationState = 'PENDING';

            document.addEventListener(
                'onEzApiReady',
                this.ezRegistrator);
        }
    }

    constructor() {
        super();
    }
}

/**
 * @public
 * Constructor for EzDialog top rovide message, error, bug reporting, and question dialog abilities to ezClocker UI.
 *
 * @returns {EzDialog}
 */
class EzDialog {
    static ezApiName = 'ezDialog';
    static ezEventNames = {
        onReady: 'ezOn_EzDialog_Ready'
    };
    static ezInstance = null;
    static ezApiRegistrationState = null;
    static ezCanRegister() {
        return 'PENDING' === EzDialog.ezApiRegistrationState &&
            ezApi && ezApi.ready;
    }
    static ezRegistrator() {
        if (EzDialog.ezCanRegister())  {
            EzDialog.ezInstance = ezApi.ezRegisterNewApi(
                EzDialog,
                EzDialog.ezApiName);

            EzDialog.ezApiRegistrationState = 'REGISTERED';
        }
    }
    // Static Constructor
    static {
        if (null == this.ezApiRegistrationState) {
            this.ezApiRegistrationState = 'PENDING';

            document.addEventListener(
                'onEzApiReady',
                this.ezRegistrator);
        }
    }

    constructor() {
        this.ready = false;

        this.DEFAULT_DIALOG_PROPERTIES = {
            dialogClass: 'dialog-shadow',
            closeOnEscape: true,
            autoOpen: false,
            modal: true,
            width: 500,
            show: {
                // 'effect': 'slide',
                'effect': 'scale',
                // 'direction': 'left',
                // 'duration': 250
                'percent': 100
            },
            hide: {
                // 'effect': 'slide',
                'effect': 'scale',
                // 'direction': 'right',
                // 'duration': 250,
                'percent': 0
            },
            position: {
                'my': 'center',
                'at': 'center',
                'of': window
            },
            resizeable: false
        };

        return this;
    }

    /**
     * @protected
     * Initializes EzDialog
     *
     * @returns {EzDialog}
     */
    ezInit() {
        return EzDialog.ezInstance;
    }

    ezBuildDialogFromTemplate(dialogId, imgUrl) {
        return '<div id="' + dialogId + '" class="ezClockerDialog">' +
            '<table class="ezClockerDialogContent">' +
            '<tr><td class="ezClockerDialogImageCell">' +
            '<img class="ezClockerDialogImage" id="' + dialogId + '_Image" ' +
            'src="' + imgUrl + '"/></td>' +
            '<td class="ezClockerDialogMessageCell" id="' + dialogId + '_DialogMessage"></td>' +
            '</tr></table></div>';
    }

    ezResolveDialogResult(dialogId, resolver, dialogResult) {
        if (ezApi.ezIsEmptyString(dialogId)) {
            return ezApi.ezCallback(resolver, dialogResult);
        }
        if (ezApi.ezElementExists(dialogId)) {
            ezApi.ezId(dialogId).dialog('close');
            ezUi.ezRemove(dialogId);
        }
        return ezApi.ezCallback(resolver, dialogResult);
    }

    ezInitDialog(dialogId, dialogButtons, additionalOptions) {
        const self = EzDialog.ezInstance;

        if (ezApi.isEmptyArray(dialogButtons)) {
            ezApi.ezId(dialogId).dialog({
                dialogClass: self.DEFAULTS.dialogClass,
                closeOnEscape: self.DEFAULTS.closeOnEscape,
                autoOpen: self.DEFAULTS.autoOpen,
                modal: self.DEFAULTS.modal,
                width: self.DEFAULTS.width,
                show: self.DEFAULTS.show,
                hide: self.DEFAULTS.hide,
                position: self.DEFAULTS.position,
                resizeable: self.DEFAULTS.resizeable,
                buttons: [{
                    autoOpen: false,
                    text: 'OK',
                    id: dialogId + '_OK',
                    click: function() {
                        return self.ezResolveDialogResult(dialogId, null, {
                            id: dialogId,
                            dialogStatus: self.OK_DIALOG_RESPONSE.dialogStatus,
                        });
                    }
                }]
            });
        } else {
            ezApi.ezId(dialogId).dialog({
                dialogClass: self.DEFAULTS.dialogClass,
                closeOnEscape: self.DEFAULTS.closeOnEscape,
                autoOpen: self.DEFAULTS.autoOpen,
                modal: self.DEFAULTS.modal,
                width: self.DEFAULTS.width,
                show: self.DEFAULTS.show,
                hide: self.DEFAULTS.hide,
                position: self.DEFAULTS.position,
                resizeable: self.DEFAULTS.resizeable,
                buttons: dialogButtons
            });
        }
        if (ezApi.isValid(additionalOptions)) {
            ezApi.ezId(dialogId).dialog(additionalOptions);
        }
        return ezApi.ezId(dialogId);
    }

    /**
     * @public
     * Shows the dialog associated with the provided id. Dialog needs to have been configured already!
     * @param {string} dialogId
     * @param {string|null} closeEventName
     */
    ezShowDialogById(dialogId, showEventName) {

        ezUi.ezForceStopPageWait();
        if (ezApi.isEmptyString(dialogId)) {
            return false;
        }
        if (!ezApi.ezElementExists(dialogId)) {
            return false;
        }
        try {
            ezApi.ezId(dialogId).dialog('open');

            if (ezApi.isNotEmptyString(showEventName) && ezApi.ezclocker.ezEventEngine.ezIsEventRegistered(showEventName)) {
                ezApi.ezclocker.ezEventEngine.ezTriggerEvent(
                    showEventName,
                    {
                        dialogId: dialogId
                    });
            }

            return true;
        } catch (error) {
            ezApi.ezclocker.ezLogger.error('Failed to show dialog with id ' + dialogId + ' due to error: ' +
                ezApi.ezToJson(error));
            return false;
        }
    }

    /**
     * @public
     * Closes a visible dialog.
     * @param {string} dialogId
     * @param {string|null} closeEventName
     */
    ezCloseDialogById(dialogId, closeEventName) {

        if (ezApi.isEmptyString(dialogId)) {
            return false;
        }
        if (!ezApi.ezElementExists(dialogId)) {
            return false;
        }
        try {
            ezApi.ezId(dialogId).dialog('close');
            if (ezApi.isNotEmptyString(closeEventName) && ezApi.ezclocker.ezEventEngine.ezIsEventRegistered(closeEventName)) {
                ezApi.ezclocker.ezEventEngine.ezTriggerEvent(
                    closeEventName,
                    {
                        dialogId: dialogId
                    });
            }
            return true;
        } catch (error) {
            ezApi.ezclocker.logger.error('Failed to close dialog with id ' + dialogId + ' due to error: ' + ezApi.ezToJson(
                error));
            return false;
        }
    }

    ezSetDialogOptions(dialogId, title, message, width, height) {
        const self = EzDialog.ezInstance;

        ezApi.ezId(dialogId).dialog({
            width: ezApi.ezAssignOrDefault(width, self.DEFAULTS.width)
        });
        if (ezApi.isValid(height)) {
            ezApi.ezId(dialogId).dialog({
                height: ezApi.ezAssignOrDefault(height)
            });
        }
        ezApi.ezId(dialogId).dialog({
            title: ezApi.ezAssignOrDefault(title, 'Confirm')
        });
        ezApi.ezId(dialogId + '_DialogMessage').html(ezApi.ezAssignOrDefault(message,
            'Everyone from ezClocker hopes your day is going great!'));

    }

    ezBuildErrorResponse(errorCode, errorMessage) {
        const self = EzDialog.ezInstance;

        return {
            errorCode: ezApi.isValid(errorCode) ? errorCode : 500,
            message: ezApi.isNotEmptyString(errorMessage) ? errorMessage : 'An unexpected error occured.' +
                self.TRY_AGAIN_THEN_REPORT
        };
    }

    ezShowUnauthenticatedError() {
        const self = EzDialog.ezInstance;

        ezUi.ezForceStopPageWait();
        return self.ezShowError('Authentication Session Expired',
            'Your authentication session is expired. Please sign in.', ezApi.ezclocker.nav.signOut);
    }

    ezGenerateErrorMessage(responseMessage, errorCode) {
        const self = EzDialog.ezInstance;

        let em = ezApi.isNotEmptyString(responseMessage) ? 'Error reported: ' + responseMessage + '.<br/>' +
            self.TRY_AGAIN_THEN_REPORT : self.TRY_AGAIN_THEN_REPORT;

        if (ezApi.isValid(errorCode)) {
            em += '<br/><i>Error Code ' + errorCode + '</i>';
        }
        return em;
    }

    /**
     * Evaluates an ezClocker service response. If the response is not valid, or has an errorCode
     * value that is not zero, the response is considered an error response.
     * Returns a promise, resolving if the response is an error response. Rejecting if the service
     * is not an error response.
     * @param {object} response
     * @param {string|null} errorTitle
     * @param {string|null} errorMessage
     * @param {boolean|null} showUi
     * @returns {Promise}
     */
    ezIsServiceResponseError(response, errorTitle, errorMessage, showUi) {
        const self = EzDialog.ezInstance;

        return ezApi.ezPromise(function(resolve, reject) {
            showUi = ezApi.ezIsTrue(showUi) ? true : false;
            if (ezApi.isNotValid(response) || (ezApi.isValid(response) && response.errorCode !== 0)) {
                let eMessage = ezApi.isEmptyString(errorMessage) ? '' : errorMessage;
                let em = eMessage + EzDialog.ezInstance.ezGenerateErrorMessage(response.message);
                let eTitle = ezApi.isEmptyString(errorTitle) ? 'ezClocker Error' : errorTitle;
                self.ezHandleSpecialErrorCodes(response.errorCode, eTitle, em, showUi).then(
                    function() {
                        resolve(response);
                    });
            } else {
                reject(response);
            }
        });
    }

    /**
     * @public
     * Handles special error codes that have defined actions. If none match, then the error is just logged.
     * Optionally, an error message UI can pop-up if showUi = true
     * @param {string|null} errorTitle
     * @param {string|null} errorMessage
     * @param {boolean|null} showUi
     * @returns {Promise}
     */
    ezHandleSpecialErrorCodes(errorCode, errorTitle, errorMessage, showUi) {
        const self = EzDialog.ezInstance;

        showUi = ezApi.ezIsTrue(showUi) ? true : false;
        if (showUi) {
            ezUi.ezForceStopPageWait();
        }
        switch (errorCode) {
            case 401:
                ezApi.ezclocker.logger.error('User is not logged in. Redirecting to sign-in page.');
                ezApi.ezclocker.nav.signOut();
                return ezApi.ezResolve();
            case 403:
                ezApi.ezclocker.logger.error('User does not have a valid license - directing to account page.');
                ezApi.ezclocker.nav.navigateToSecurePage('account.html?employer=' +
                    ezApi.s.ezEmployerDashboardController.activeEmployerId + '&expired=1');
                return ezApi.ezResolve();
            case 409:
                // Normally user exists error, let UX handle it
                return ezApi.ezResolve();
            default:
                if (!showUi) {
                    ezApi.ezclocker.logger.error(errorMessage);
                    return ezApi.ezResolve();
                } else {
                    self.ezShowError(errorTitle, errorMessage, function() {
                        return ezApi.ezResolve();
                    });
                }
        }
    }

    /**
     * Generates a basic error message for service call failures.
     * @param {string|null} errorTitledollarCents[1].length === 1
     * @param {object|null} eResponse
     * @param {string|null} defaultErrorMessage
     * @param {boolean|null} showUi
     * Default of showUi is assumed true if not set
     */
    ezShowNon200ServiceError(errorTitle, eResponse, defaultErrorMessage, showUi) {
        const self = EzDialog.ezInstance;

        showUi = !ezApi.ezIsTrue(showUi) ? false : true;
        if (showUi) {
            ezUi.ezForceStopPageWait();
        }
        return ezApi.ezPromise(function(resolve) {
            let eTitle = ezApi.isEmptyString(errorTitle) ? 'ezClocker Error' : errorTitle;
            let dMessage = ezApi.isEmptyString(defaultErrorMessage) ?
                'ezClocker encountered an error while performing a task. No additional details were provided.' :
                defaultErrorMessage;
            let eCode = ezApi.isValid(eResponse) ? eResponse.errorCode : null;
            let eMessage = ezApi.isEmptyString(eResponse.message) ? dMessage : eResponse.message;
            eMessage = ezApi.isValid(eCode) ?
                self.ezGenerateErrorMessage(eMessage, eCode) :
                self.ezGenerateErrorMessage(eMessage);
            ezApi.ezclocker.logger.error(eMessage + ' Error response: ' + ezApi.ezToJson(eResponse));
            if (showUi) {
                self.ezShowError(eTitle, eMessage, function() {
                    return resolve();
                });
            }
            return resolve(eResponse, eTitle, eMessage);
        });
    }

    /**
     * @public
     * Returns the message in the response, or blank string if none.
     * @param {object|null}
     */
    ezExtractErrorMessageFromResponse(eResponse) {
        return ezApi.isNotEmptyString(eResponse) && ezApi.isNotEmptyString(eResponse.message) ?
            eResponse.message :
            '';
    }

    ezCreateDefectDetails(errorCode, errorMessage, additionalDetails, serviceDetails) {
        return '<div><textarea style="width:100%;height:200px;">' +
            '******************************\n' +
            ': Error Details              :\n' +
            '******************************\n' +
            ' Error Code: ' + ezApi.ezAssignOrDefault(errorCode, '500') + '\n\n' +
            '------------------------------\n' +
            ': Error                      :\n' +
            '------------------------------\n' +
            ezApi.ezToJson(ezApi.ezAssignOrDefault(errorMessage, 'N/A')) + '\n\n' +
            '------------------------------\n' +
            ': Additional Details         :\n' +
            '------------------------------\n' +
            ezApi.ezToJson(ezApi.ezAssignOrDefault(additionalDetails, 'N/A')) + '\n\n' +
            '------------------------------\n' +
            ': Service Details            :\n' +
            '------------------------------\n' +
            ezApi.ezToJson(ezApi.ezAssignOrDefault(serviceDetails, 'N/A')) + '</textarea></div>';
    }

    /**
     * Dialog for reporting internally detected errors
     *
     * @param jqXHR
     * @param error
     * @param message
     */
    ezReportInternalBugDialog(jqXHR, error, errorMessage, additionalDetails, action, refreshPage) {
        const self = EzDialog.ezInstance;

        ezUi.ezForceStopPageWait();
        refreshPage = ezApi.ezIsTrue(refreshPage) ? true : false;
        ezApi.ezclocker.logger.error(error);
        let emDetails = ezApi.isEmptyString(additionalDetails) ? '' : ' ' + additionalDetails;
        let serviceDetails = 'N/A';
        let ec = '500';

        if (ezApi.isValid(jqXHR)) {
            serviceDetails = ezApi.ezToJson(jqXHR);
            ec = ezApi.isValid(jqXHR.statusCode) ? jqXHR.statusCode : '500';
        }

        let closeAction = ezApi.isFunction(action)
            ? action = function() {
                if (ezApi.ezIsTrue(refreshPage)) {
                    window.location.reload(); // refresh the browser to reset the page;
                }
            }
            : self.ezSendErrorReport(self.ezCreateDefectDetails(ec, errorMessage, emDetails, serviceDetails));

        // title, message, onCloseCallback, passThroughData, width, height
        return self.ezShowOKMessage(error,
            'The ezClocker detected a bug in the website. We have already sent the bug details to the ezClocker team ' +
            'so they can squash the pest. If you continue experience problems ' +
            'or need immediate help please contact <a href="mailto:support@ezclocker.com">support@ezclocker.com</a>. ' +
            'The ezClocker team appologizes for any disruption to your day.').then(closeAction);
    }

    /**
     * Sends an unhandled exception to exceptions@ezclocker.com
     * @param {string} errorReportDetails
     */
    ezSendErrorReport(errorReportDetails) {
        ezApi.ezclocker.http.ezPost(ezApi.ezclocker.nav.getInternalClassicApiUrl('email/send-error-report'),
            ezApi.ezToJson({
                userId: null,
                errorDetails: errorReportDetails
            })).then(ezApi.ezIgnoreResolve, ezApi.ezIgnoreReject);
    }

    ezCreateSupportContactInfo() {
        return '<p>Please contact ezClocker support at <a href="mailto:support@ezclocker.com">support@ezclocker.com</a> ' +
            'if you have questions or need immediate assistence. Please include an error messages or details with your ' +
            'support request. The ezClocker team appologizes for any disruption to your day.</p>';
    }

    /**
     * Dialog to inform the user that their session has expired.
     */
    ezServiceDownDialog(statusCode) {
        const self = EzDialog.ezInstance;

        ezUi.ezForceStopPageWait();
        self.ezShowOKMessage('ezClocker Connectivity',
            'Error Code: ' + ezApi.ezAssignOrDefault(statusCode, '500') +
            '<p>The ezClocker services are not available at this time. The ezClocker team is aware of the problem ' +
            'and is working hard to restore service.</p>' + self.ezCreateSupportContactInfo()).then(ezApi.p
                .nav.signOut);
    }

    ezSomethingIsWrong(title, em, sc, jqXHR, response) {
        const self = EzDialog.ezInstance;

        ezUi.ezForceStopPageWait();
        if (ezApi.isEmptyString(em)) {
            // do not show if there is no error message
            return ezApi.ezResolve();
        }
        jqXHR = ezApi.ezAssignOrDefault(jqXHR, {
            details: 'No additional information available.'
        });
        return self.ezShowOKMessage(ezApi.ezAssignOrDefault(title, 'ezClocker Error'), '<h4>Error</h4>' + em +
            '<p>Please contact <a href="mailto:support@ezclocker.com">support@ezclocker.com</a> and include the ' +
            'contents of this error message if you have questions or need immediate assistence.</p>' +
            '<h4>Technical Details</h4><ul><li>Error Code: ' + ezApi.ezAssignOrDefault(sc, '500') + '</li>' +
            '<li>Details: <pre>' + ezApi.ezAssignOrDefault(ezApi.ezToJson(jqXHR, 3)),
            'No additional details' +
            '</pre></li>', '<li>Service Response: <pre>' + ezApi.ezAssignOrDefault(ezApi.ezToJson(response,
                3), 'None Available') +
        '</pre></li></ul>');
    }

    /**
     * Present dialog for legal blocks, censorship, government mandates
     */
    ezServiceLegalBlockDialog() {
        const self = EzDialog.ezInstance;

        ezUi.ezForceStopPageWait();
        self.ezShowOKMessage('Unavailable for Legal Reasons',
            'Law enforcement, a government authority, or another entity in which ezClocker is bound to has ' +
            'requested that we deny access at this time. We cannot provide any additional information at this time.' +
            '<p>Additional information about the error is availalbe online from Wikipedia: ' +
            '<a target="_research_error" href="https://en.wikipedia.org/wiki/HTTP_451">' +
            'Read about the Unavaialble for Legal Reasons Error on Wikipedia</a>').then(ezApi.ezclocker.nav.signOut);
    }

    /**
     * Dialog to inform the user that their session has expired.
     */
    ezSessionExpiredDialog() {
        const self = EzDialog.ezInstance;

        ezUi.ezForceStopPageWait();
        self.ezShowOKMessage('Session Expired',
            'Your current authentication session is expired. Please sign in.').then(ezApi.ezclocker.nav.signOut);
    }

    ezYesNoDialog(title, message, onCloseCallback, width, height, useOldResponse) {
        const self = EzDialog.ezInstance;

        ezUi.ezForceStopPageWait();
        useOldResponse = ezApi.ezIsTrue(useOldResponse) ? true : false;
        if (!ezApi.ezElementExists('_EzYesNoDialog')) {
            ezApi.ezBody().append('<div id="_EzYesNoDialog" class="ezClockerDialog">' +
                '<table class="ezClockerDialogContent"><tr><td class="ezClockerDialogImageCell">' +
                '<img class="ezClockerDialogImage" src="' + ezApi.ezclocker.nav.getPublicImagesUrl('info_32x32.ico') +
                '"/></td><td class="ezClockerDialogMessageCell" id="_EzYesNoDialog_DialogMessage">' +
                '</td></tr></table></div>');

            ezApi.ezId('_EzYesNoDialog').dialog({
                dialogClass: self.DEFAULTS.dialogClass,
                closeOnEscape: self.DEFAULTS.closeOnEscape,
                autoOpen: self.DEFAULTS.autoOpen,
                modal: self.DEFAULTS.modal,
                show: self.DEFAULTS.show,
                width: self.DEFAULTS.width,
                position: self.DEFAULTS.position,
                buttons: {
                    'Yes': {
                        text: 'Yes',
                        click: function() {
                            const self = ezApi.ezSelf('ezDialog');
                            self.yesNoDialog_ignoreClose = true;
                            let payload = ezApi.isTrue(useOldResponse) ? 'YES' : self.YES_DIALOG_RESPONSE;
                            ezApi.ezOnCallback(onCloseCallback, payload);
                            ezApi.ezId('_EzYesNoDialog').dialog('close');
                            ezUi.ezRemove('_EzYesNoDialog');
                        }
                    },
                    'No': {
                        text: 'No',
                        click: function() {
                            const self = ezApi.ezSelf('ezDialog');
                            self.yesNoDialog_ignoreClose = true;
                            let payload = ezApi.isTrue(useOldResponse) ? 'NO' : self.NO_DIALOG_RESPONSE;
                            ezApi.ezOnCallback(onCloseCallback, payload);
                            ezApi.ezId('_EzYesNoDialog').dialog('close');
                            ezUi.ezRemove('_EzYesNoDialog');
                        }
                    }
                },
                close: function() {
                    const self = ezApi.ezSelf('ezDialog');
                    if (self.yesNoDialog_ignoreClose) {
                        return;
                    }
                    let payload = ezApi.isTrue(useOldResponse) ? 'NO' : self.NO_DIALOG_RESPONSE;
                    ezApi.ezOnCallback(onCloseCallback, payload);
                    ezApi.ezId('_EzYesNoDialog').dialog('close');
                    ezUi.ezRemove('_EzYesNoDialog');
                }
            });
        }

        if (ezApi.isValid(width)) {
            ezApi.ezId('_EzYesNoDialog').dialog({
                width: ezApi.ezAssignOrDefault(width)
            });
        }
        if (ezApi.isValid(height)) {
            ezApi.ezId('_EzYesNoDialog').dialog({
                height: ezApi.ezAssignOrDefault(height)
            });
        }
        ezApi.ezId('_EzYesNoDialog').attr('title', ezApi.ezAssignOrDefault(title, 'Confirm'));
        ezApi.ezId('_EzYesNoDialog_DialogMessage').html(message);
        ezApi.ezId('_EzYesNoDialog').dialog('open');
    }

    /**
     * @public
     * Shows a yes/no question dialog.
     * @returns {Promise}
     */
    ezShowYesNo(title, message, passThroughData, width, height, dialogId) {
        const self = EzDialog.ezInstance;

        ezUi.ezForceStopPageWait();
        dialogId = ezApi.isEmptyString(dialogId)
            ? 'EzYesNoDialog_' + ezApi.ezclocker.ezGenerateObjectId()
            : dialogId;

        return ezApi.ezPromise(function(resolve) {
            let ezShowYesNoDialog = ezApi.ezElementExists(dialogId)
                ? ezApi.ezId(dialogId)
                : null;

            if (ezApi.ezIsNotValid(ezShowYesNoDialog)) {
                // Inject the dialog with the specified id
                ezApi.ezBody().append(
                    self.ezBuildDialogFromTemplate(dialogId, ezApi.ezclocker.nav.getPublicImagesUrl('info_32x32.ico')));

                ezShowYesNoDialog = self.ezInitDialog(dialogId, [
                    {
                        text: 'Yes',
                        id: dialogId + '_YesButton',
                        click: function() {
                            return self.ezResolveDialogResult(dialogId, resolve, {
                                id: dialogId,
                                dialogStatus: self.YES_DIALOG_RESPONSE.dialogStatus,
                                passThroughData: passThroughData
                            });
                        }
                    },
                    {
                        text: 'No',
                        id: dialogId + '_NoButton',
                        click: function() {
                            return self.ezResolveDialogResult(dialogId, resolve, {
                                id: dialogId,
                                dialogStatus: self.NO_DIALOG_RESPONSE.dialogStatus,
                                passThroughData: passThroughData
                            });
                        }
                    }
                ]);

                self.ezSetDialogOptions(dialogId, title, message, width, height);
            }

            if (ezShowYesNoDialog.dialog('isOpen')) {
                ezApi.ezclocker.logger.warn('ezShowYesNo dialog with dialogId=' + dialogId + ' is already visible.');
                return;
            }
            ezShowYesNoDialog.dialog('open');
        });
    }

    ezShowError(title, message, onCloseCallback, passThroughData, width, height) {
        const self = EzDialog.ezInstance;

        ezUi.ezForceStopPageWait();
        if (!ezApi.ezElementExists('_EzErrorDialog')) {
            ezApi.ezBody().append('<div id="_EzErrorDialog" class="ezClockerDialog" title="Error">' +
                '<table class="ezClockerDialogContent"><tr><td class="ezClockerDialogImageCell">' +
                '<img class="ezClockerDialogImage" src="' + ezApi.ezclocker.nav.getPublicImagesUrl(
                    'dialog_error_32x32.png') +
                '"/></td><td class="ezClockerDialogMessageCell" id="_EzErrorDialog_DialogMessage"></td></tr></table></div>'
            );

            ezApi.ezId('_EzErrorDialog').dialog({
                dialogClass: self.DEFAULTS.dialogClass,
                closeOnEscape: self.DEFAULTS.closeOnEscape,
                autoOpen: self.DEFAULTS.autoOpen,
                modal: self.DEFAULTS.modal,
                show: self.DEFAULTS.show,
                width: self.DEFAULTS.width,
                position: self.DEFAULTS.position,
                buttons: {
                    'Ok': {
                        text: 'Ok',
                        click: function() {
                            ezApi.ezId('_EzErrorDialog').dialog('close');
                        }
                    }
                },
                close: function() {
                    ezApi.ezCallback(onCloseCallback, EzDialog.ezInstance.OK_DIALOG_RESPONSE,
                        passThroughData, arguments);
                }
            });
        }
        if (ezApi.isValid(width)) {
            ezApi.ezId('_EzErrorDialog').dialog({
                width: ezApi.ezAssignOrDefault(width)
            });
        }
        if (ezApi.isValid(height)) {
            ezApi.ezId('_EzErrorDialog').dialog({
                height: ezApi.ezAssignOrDefault(height)
            });
        }
        if (ezApi.isNotEmptyString(title)) {
            ezApi.ezId('_EzErrorDialog').attr('title', ezApi.ezAssignOrDefault(title, 'Error'));
        }
        ezUi.ezSetElementAttribute('_EzErrorDialog', 'title', ezApi.ezAssignOrDefault(title, 'Message'));
        ezApi.ezId('_EzErrorDialog_DialogMessage').html(ezApi.assignOrEmpty(message));
        ezApi.ezId('_EzErrorDialog').dialog('open');
    }

    /**
     * Inserts a OK message dialog into the page and displays it. Reuses the existing dialog if already inserted.
     *
     * @param message
     * @param resultFunction
     * Returns value selected in result
     */
    ezShowMessage(title, message, onCloseCallback, passThroughData) {
        const self = EzDialog.ezInstance;

        ezUi.ezForceStopPageWait();
        return self.ezShowOKMessage(title, message, passThroughData, null, null, onCloseCallback);
    }

    /**
     * Inserts a OK message dialog into the page and displays it. Reuses the existing dialog if already inserted.
     *
     * @param message
     * @param resultFunction
     * Returns value selected in result
     */
    ezShowOKMessage(title, message, passThroughData, width, height, onCloseCallback) {
        const self = EzDialog.ezInstance;

        ezUi.ezForceStopPageWait();
        return ezApi.ezPromise(function(resolve) {
            if (!ezApi.ezElementExists('ezOk')) {
                ezApi.ezBody().append('<div id="ezOk" class="ezClockerDialog">' +
                    '<table class="ezClockerDialogContent"><tr><td class="ezClockerDialogImageCell">' +
                    '<img class="ezClockerDialogImage" src="' + ezApi.ezclocker.nav.getPublicImagesUrl(
                        'dialog_info_32x32.png') + '"/>' +
                    '</td><td class="ezClockerDialogMessageCell" id="_EzOkDialog_DialogMessage">' +
                    ezApi.assignOrEmpty(message) +
                    '</td></tr></table></div>'
                );
                ezApi.ezId('ezOk').dialog({
                    dialogClass: self.DEFAULTS.dialogClass,
                    closeOnEscape: self.DEFAULTS.closeOnEscape,
                    autoOpen: self.DEFAULTS.autoOpen,
                    modal: self.DEFAULTS.modal,
                    show: self.DEFAULTS.show,
                    width: self.DEFAULTS.width,
                    position: self.DEFAULTS.position,
                    buttons: [{
                        id: '_SubscriptionExpiredOkButtonezOk',
                        text: 'Ok',
                        click: function() {
                            if (ezApi.isFunction(onCloseCallback)) {
                                onCloseCallback(passThroughData);
                            }
                            ezApi.ezId('ezOk').dialog('close');
                            ezApi.ezId('ezOk').remove();
                            resolve(passThroughData);
                        }
                    }]
                });
            }
            if (ezApi.isValid(width)) {
                ezApi.ezId('ezOk').dialog({
                    width: ezApi.ezAssignOrDefault(width)
                });
            }
            if (ezApi.isValid(height)) {
                ezApi.ezId('ezOk').dialog({
                    height: ezApi.ezAssignOrDefault(height)
                });
            }
            ezApi.ezId('ezOk').attr('title', ezApi.ezAssignOrDefault(title, 'Message'));
            ezApi.ezId('ezOk').dialog('open');
        });
    }

    /**
     * Inserts a OK message dialog into the page and displays it. Reuses the existing dialog if already inserted.
     *
     * @param message
     * @param resultFunction
     * Returns value selected in result
     */
    ezOkCancelMessage(title, message, onCloseCallback, passThroughData, width, height, useOldResponse) {
        const self = EzDialog.ezInstance;

        ezUi.ezForceStopPageWait();
        let existingDialog = ezApi.ezId('_EzOkDialog');
        if (existingDialog.length === 0) {
            ezApi.ezBody().append('<div id="_EzOkDialog" class="ezClockerDialog">' +
                '<table class="ezClockerDialogContent"><tr><td class="ezClockerDialogImageCell">' +
                '<img class="ezClockerDialogImage" src="' + ezApi.ezclocker.nav.getPublicImagesUrl(
                    'dialog_info_32x32.png') +
                '"/></td><td class="ezClockerDialogMessageCell" id="_EzOkDialog_DialogMessage"></td></tr></table></div>'
            );
            existingDialog = ezApi.ezId('_EzOkDialog');

            existingDialog.dialog({
                dialogClass: self.DEFAULTS.dialogClass,
                closeOnEscape: self.DEFAULTS.closeOnEscape,
                autoOpen: self.DEFAULTS.autoOpen,
                modal: self.DEFAULTS.modal,
                show: self.DEFAULTS.show,
                hide: self.DEFAULTS.hide,
                width: self.DEFAULTS.width,
                position: self.DEFAULTS.position,
                buttons: [{
                    id: '_EzOkCancelMessage_OkButton',
                    text: 'Ok',
                    click: function() {
                        existingDialog.dialog('close');
                        if (ezApi.isFunction(onCloseCallback)) {
                            if (ezApi.isTrue(useOldResponse)) {
                                onCloseCallback('OK');
                            } else {
                                onCloseCallback(EzDialog.ezInstance.OK_DIALOG_RESPONSE,
                                    passThroughData);
                            }
                        }
                        existingDialog.dialog('close');
                    }
                },
                {
                    id: '_EzOkCancelMessage_OkButton',
                    text: 'Cancel',
                    click: function() {
                        existingDialog.dialog('close');
                        if (ezApi.isFunction(onCloseCallback)) {
                            if (ezApi.isTrue(useOldResponse)) {
                                // TODO Change this to use a JSON payload instead
                                onCloseCallback('OK');
                            } else {
                                onCloseCallback(EzDialog.ezInstance.CANCEL_DIALOG_RESPONSE,
                                    passThroughData);
                            }
                        }
                    }
                }
                ]
            });
        }

        if (ezApi.isValid(width)) {
            existingDialog.dialog({
                width: ezApi.ezAssignOrDefault(width)
            });
        }
        if (ezApi.isValid(height)) {
            existingDialog.dialog({
                height: ezApi.ezAssignOrDefault(height)
            });
        }
        existingDialog.attr('title', ezApi.ezAssignOrDefault(title, 'Message'));
        ezApi.ezId('_EzOkDialog_DialogMessage').html(ezApi.assignOrEmpty(message));
        existingDialog.dialog('open');
    }

    ezHandleCustomButtonClick(originalClick, aDialog) {
        return function() {
            if (ezApi.isFunction(originalClick())) {
                originalClick();
            }
            if (ezApi.isValid(aDialog)) {
                aDialog.dialog('close');
            }
        };
    }

    /**
     * Injects a pop-up information dialog that allows the caller to specify the action buttons.
     *
     * @param title
     * @param message
     * @param customButtons
     * Example of customButtons object: customButtons = [{ id: "MyDialogButtonId", text: "Button Text", click: function() { // Handler for the click of the
     * button } }]
     */
    ezActionDialog(title, message, customButtons, width, height) {
        const self = EzDialog.ezInstance;

        ezUi.ezForceStopPageWait();
        if (!ezApi.ezElementExists('_EzActionDialog')) {
            ezApi.ezBody().append(
                '<div id="_EzActionDialog" class="ezClockerDialog">' +
                '<table class="ezClockerDialogContent"><tr><td class="ezClockerDialogImageCell">' +
                '<img class="ezClockerDialogImage" ' +
                'src="' + ezApi.ezclocker.nav.getPublicImagesUrl('dialog_info_32x32.png') + '"/>' +
                '</td><td class="ezClockerDialogMessageCell" id="_EzActionDialog_DialogMessage">' +
                '</td></tr></table></div>'
            );

            // Wrap the customButtons in an additional function to close the dialog afterwards
            for (let x in customButtons) {
                let bclick = customButtons[x].click;
                customButtons[x].click = self.ezHandleCustomButtonClick(bclick, ezApi.ezId('_EzActionDialog'));
            }

            ezApi.ezId('_EzActionDialog').dialog({
                dialogClass: self.DEFAULTS.dialogClass,
                closeOnEscape: self.DEFAULTS.closeOnEscape,
                autoOpen: self.DEFAULTS.autoOpen,
                modal: self.DEFAULTS.modal,
                show: self.DEFAULTS.show,
                width: self.DEFAULTS.width,
                position: self.DEFAULTS.position,
                buttons: customButtons
            });
        }

        if (ezApi.isValid(width)) {
            ezApi.ezId('_EzActionDialog').dialog({
                width: ezApi.ezAssignOrDefault(width)
            });
        }
        if (ezApi.isValid(height)) {
            ezApi.ezId('_EzActionDialog').dialog({
                height: ezApi.ezAssignOrDefault(height)
            });
        }
        ezUi.ezSetElementAttribute('_EzActionDialog', 'title', title);
        ezUi.ezHtml('_EzActionDialog_DialogMessage', message);
        ezApi.ezId('_EzActionDialog').dialog('open');
        return ezApi.ezId('_EzActionDialog');
    }

    showTip(title, tipType) {
        const self = EzDialog.ezInstance;

        if (tipType === EzDialog.ezInstance.EMPLOYEE_INVITE_TIP) {
            let content = ezApi.isString(self.getEmployeeInviteTip(), '');
            self.ezClockerMessageDialog(content, self.cancelDialog, title, 700);
        }
    }

    getEmployeeInviteTip() {
        let result = '<p>When you invite employees to ezClocker they receive an email stating that your ' +
            'business is inviting them to use ezClocker to track their time. The email will contain a web link ' +
            'that will take the employee to their sign-up screen allowing them to create a password for their ' +
            'new account. After entering their password ezClocker will allow them to login and being tracking ' +
            'their time usign either the native mobile apps or the website.</p>' +
            '<p>Note that invites can expire overtime if the employee takes more than a day to accept the invite. ' +
            'If this happens, you can re-invite the employee from your employer dashboard.</p>' +
            '<p>Finally, ezClocker restricts invites to new users (as determined by email address). ' +
            'If the employee you invite already has an ezClocker account or you attempt to invite yourself ' +
            '(as the employer) you will receive a message stating that the account already exists. To continue, ' +
            'either enter a different email address or contact ezClocker support to get help resetting or converting ' +
            'existing accounts.</p>';
        return result;
    }

    /**
     * @public
     * @deprecated
     * DO NOT USE
     */
    ezClockerMessageDialog(message, resultFunction, title, dialogWidth, dialogHeight) {
        const self = EzDialog.ezInstance;

        ezUi.ezForceStopPageWait();
        ezApi.ezclocker.logger.dep('EzDialog.ezInstance.ezClockerMessageDialog', 'EzDialog.ezInstance.ezShowMessage()',
            'ezclocker-dialog-helper.js');
        self.ezShowMessage(title, message, resultFunction, null, dialogWidth, dialogHeight, true);
    }

    /**
     * @public
     * @deprecated
     * DO NOT USE
     */
    ezClockerYesNoDialog(imagePrefix, message, resultFunction, title, dialogWidth, dialogHeight) {
        const self = EzDialog.ezInstance;

        ezUi.ezForceStopPageWait();
        ezApi.ezclocker.logger.dep('EzDialog.ezInstance.ezClockerYesNoDialog', 'EzDialog.ezInstance.ezClockerYesNo()',
            'ezclocker-dialog-helper.js');
        return self.ezYesNoDialog(title, message, resultFunction, dialogWidth, dialogHeight, true);
    }

    // EzDialog.prototype.bootStrapDialogs: {
    //     BS_CONTAINER_ID: '_EzBSDialogContainer',
    ezShowInfo(message, title, passThroughData, dialogId) {
        const self = EzDialog.ezInstance;

        dialogId = ezApi.isEmptyString(dialogId) ? 'bsShowInfoToast' : dialogId;
        if (ezApi.ezclocker.isEmptyString(message)) {
            return this.ezApi.ezResolve({
                'id': dialogId,
                'dialogStatus': self.OK_DIALOG_RESPONSE.dialogStatus,
                'passThroughData': passThroughData
            });
        }
        title = ezApi.isEmptyString(title) ? 'Error' : title;

        return ezApi.ezPromise(function(resolve) {
            title = ezApi.isEmptyString(title) ? 'Info' : title;
            dialogId = ezApi.isEmptyString(dialogId) ? 'bsShowInfoToast' : dialogId;
            let bsToast = '<div id="' + dialogId + 'Container" aria-live="polite" aria-atomic="true" ' +
                '    class="d-flex justify-content-center align-items-center ez-bring-to-front ez-hidden">' +
                '    <div id="' + dialogId + '" ' +
                '        role="alert" aria-live="assertive" aria-atomic="true" ' +
                '        class="toast ez-bring-to-front">' +
                '        <div class="toast-header">' +
                '            <img src="' + ezApi.ezclocker.nav.getPublicImagesUrl('info_32x32.ico') + '" ' +
                '                class="rounded mr-2">' +
                '            <strong class="mr-auto">' + title + '</strong>' +
                '            <button type="button" data-dismiss="toast" aria-label="Close" ' +
                '                class="ml-2 mb-1 close">' +
                '                <span aria-hidden="true">&times;</span>' +
                '            </button>' +
                '        </div>' +
                '        <div class="toast-body">' + message + ' </div>' +
                '    </div>' +
                '</div>';
            ezUi.ezPrependHtml$('body', bsToast);
            ezUi.ezHookElementEvent(dialogId, 'show.bs.toast', function() {
                ezUi.ezRemoveClass(dialogId + 'Container', 'ez-hidden');
            });
            ezUi.ezHookElementEvent(dialogId, 'hidden.bs.toast', function() {
                ezUi.ezAddClass(dialogId + 'Container', 'ez-hidden');
                return resolve({
                    'id': dialogId,
                    'dialogStatus': self.OK_DIALOG_RESPONSE.dialogStatus,
                    'passThroughData': passThroughData
                });
            });
            ezUi.ezId(dialogId).toast({
                adnimation: true,
                autohide: false
            });
            ezUi.ezId(dialogId).css('z-order', '99999999');
            ezUi.ezId(dialogId).toast('show');
        });
    }

    ezShowError(errorMessage, title, passThroughData, dialogId) {
        const self = EzDialog.ezInstance;

        dialogId = ezApi.isEmptyString(dialogId) ? 'bsShowErrorToast' : dialogId;
        if (ezApi.ezclocker.isEmptyString(errorMessage)) {
            return this.ezApi.ezResolve({
                'id': dialogId,
                'dialogStatus': self.OK_DIALOG_RESPONSE.dialogStatus,
                'passThroughData': passThroughData
            });
        }
        title = ezApi.isEmptyString(title) ? 'Error' : title;

        return ezApi.ezPromise(function(resolve) {
            let bsToast =
                '<div id="' + dialogId + 'Container" aria-live="polite" aria-atomic="true" ' +
                '    class="d-flex justify-content-center align-items-center ez-bring-to-front ez-hidden">' +
                '    <div id="' + dialogId + '" ' +
                '        role="alert" aria-live="assertive" aria-atomic="true" ' +
                '        class="toast ez-bring-to-front">' +
                '        <div class="toast-header">' +
                '            <img src="' + ezApi.ezclocker.nav.getPublicImagesUrl('info_32x32.ico') + '" ' +
                '                class="rounded mr-2">' +
                '            <strong class="mr-auto">' + title + '</strong>' +
                '            <button type="button" data-dismiss="toast" aria-label="Close" ' +
                '                class="ml-2 mb-1 close">' +
                '                <span aria-hidden="true">&times;</span>' +
                '            </button>' +
                '        </div>' +
                '        <div class="toast-body">' + errorMessage + ' </div>' +
                '    </div>' +
                '</div>';
            ezUi.ezPrependHtml$('body', bsToast);
            ezUi.ezHookElementEvent(dialogId, 'show.bs.toast', function() {
                ezUi.ezRemoveClass(dialogId + 'Container', 'ez-hidden');
            });
            ezUi.ezHookElementEvent(dialogId, 'hidden.bs.toast', function() {
                ezUi.ezAddClass(dialogId + 'Container', 'ez-hidden');
                return resolve({
                    'id': dialogId,
                    'dialogStatus': self.OK_DIALOG_RESPONSE.dialogStatus,
                    'passThroughData': passThroughData
                });
            });
            ezUi.ezId(dialogId).toast({
                adnimation: true,
                autohide: false
            });
            ezUi.ezId(dialogId).css('z-order', '99999999');
            ezUi.ezId(dialogId).toast('show');
        });
    };
}
