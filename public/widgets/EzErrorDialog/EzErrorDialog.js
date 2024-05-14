import { EzClass } from '/ezlibrary/EzClass.js';

import { EzErrorMessageInfo } from '/public/widgets/EzErrorDialog/EzErrorMessageInfo.js';

/**
    EzClocker error dialog with support contact info and additional details display.
    Usage Example:
    EzErrorDialog.ezShowErrorDialog(
        EzErrorDialog.ezCreateErrorMessageInfo(
            // errorTitle
            'Change Account Password Error',
            // errorMessage
            ezApi.ezMsg`EzClocker is unable to change your account password at this time. ${rootCause}`,
            // rootCause
            rootCause,
            // userFixActions
            null,
            // eResponse
            eResponse,
            // employerId
            null,
            // employeeId
            null,
            // supportEmailTopic
            'Help with change account password error',
            // supportEmailBody
            null),
            // optionalDialogWidth
            null,
            // optionalDialogHeight
            null).then(ezApi.ezIgnoreResolve());
    Import with:
        import { EzErrorDialog } from '/public/widgets/EzErrorDialog/EzErrorDialog.js';
 */
class EzErrorDialog extends EzClass {
    /**
        @public @static @method
        Creates the error message information object for the dialog to display
         @param {String|null} userFixActions
            @param {String} errorMessage
            @param {String|null} userFixActions
            @param {String|null} userFixActions
            @param {Object|null} eResponse
            @param {Number|null} employerId
            @param {Number|null} employeeId
            @param {String|null} supportEmailTopic
            @param {String|null} supportEmailBody
            @param {Number|null} optionalDialogWidth
            @param {Number|null} optionalDialogHeight
     */
    static ezCreateErrorMessageInfo(errorTitle, errorMessage, rootCause, userFixActions, eResponse, employerId, employeeId,
        supportEmailTopic, supportEmailBody, optionalDialogWidth, optionalDialogHeight) {
        return new EzErrorMessageInfo(
            errorTitle,
            errorMessage,
            rootCause,
            userFixActions,
            eResponse,
            employerId,
            employeeId,
            supportEmailTopic,
            supportEmailBody,
            optionalDialogWidth,
            optionalDialogHeight);
    }

    /**
        @public @static @method
        Shows the error dialog
        @param {EzErrorMessageInfo} ezErrorMessageInfo
        @returns {Promise.resolve}
     */
    static ezShowErrorDialog(ezErrorMessageInfo) {
        let ezErrorDialog = new EzErrorDialog();
        return ezErrorDialog.ezShow(ezErrorMessageInfo);
    }

    /**
        @public @constructor
     */
    constructor() {
        super();
    }

    /**
        @public
        Display error message response
        @param {EzErrorMessageInfo} ezErrorMessageInfo
        @returns {Promise.resolve}
     */
    ezShow(ezErrorMessageInfo) {
        return ezApi.ezResolver((resolve) => {
            if (!ezApi.ezIsValid(ezErrorMessageInfo)) {
                ezApi.ezclocker.logger.error(
                    'Unable to show EzErrorDialog. Provided EzErrorMessageInfo reference is not valid.');
                return resolve();
            }

            let errorReported = ezApi.ezMsg`
                ${ezErrorMessageInfo.ezGetErrorResponse().message} (
                ${ezErrorMessageInfo.ezGetErrorResponse().errorCode})`;
            if (ezApi.ezStringHasLength(ezErrorMessageInfo.ezGetRootCause())) {
                errorReported = ezApi.ezTemplate`${errorReported}
                    Possible Cause:
                    ${ezErrorMessageInfo.ezGetRootCause()}`;
            }

            return ezApi.ezclocker.ezDialog.ezShowErrorDialog(
                ezErrorMessageInfo.ezGetErrorTitle,
                ezApi.ezTemplate`
                    ${ezErrorMessageInfo.ezGetErrorMessage()}<br/>
                    ${ezErrorMessageInfo.ezGetUserFixActions()}
                    <p id="${self.constructor.name}_ContactSupportInfo">
                        If you continue to receive this error please contact ezClocker support at
                        <a id="${self.constructor.name}_MailToLink" href="${ezErrorMessageInfo.ezGetSupportEmailUrl()}">
                            support@ezclocker.com
                        </a>
                        for assistance.
                    </p>
                    <div id="${self.constructor.name}_DetailsContainer"
                        style="color:var(--ezLightFontColor);font-size:var(--ezMicroFontSize);font-style:italic;">
                        <p id="${self.constructor.name}_IfContactSuportInfo">
                            If you contact ezClocker support for help you can provide the additional details below
                            to help support diagnose your error.
                        </p>
                        <TextArea id="${self.constructor.name}_DetailsInput"
                            style="height:100px;width:100%;font-size:6pt;color:var(--ezClockerGray);">
                            ${ezErrorMessageInfo.ezGetErrorTitle()}
                            ----------------------------------
                            Error Message:
                            ${ezErrorMessageInfo.ezGetErrorMessage()}
                            Fix Actions:
                            ${ezErrorMessageInfo.ezGetUserFixActions()}
                            Error Reported:
                            ${errorReported}
                            Signed In Employer id: ${ezErrorMessageInfo.ezGetEmployerId()}
                            Signed In Employee id: ${ezErrorMessageInfo.ezGetEmployeeId()}
                            Error Response:
                            ${ezApi.ezToJson(ezErrorMessageInfo.ezGetErrorResponse(), 3, false)}
                            ----------------------------------
                        </TextArea>
                    </div>`,
                ezErrorMessageInfo,
                ezErrorMessageInfo.ezGetOptionalDialogWidth(),
                ezErrorMessageInfo.ezGetOptionalDialogHeight())
                .then(resolve);
        });
    }
}

export {
    EzErrorDialog
};