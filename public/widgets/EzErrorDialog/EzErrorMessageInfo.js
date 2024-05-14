

/**
    Error message information object sent to EzErrorDialog to display to user.
 */
class EzErrorMessageInfo {
    /**
        @param {String|null} userFixActions
        @param {String} errorMessage
        @param {String|null} userFixActions
        @param {String|null} userFixActions
        @param {Object|null} errorResponse
        @param {Number|null} employerId
        @param {Number|null} employeeId
        @param {String|null} supportEmailTopic
        @param {String|null} supportEmailBody
        @param {Number|null} optionalDialogWidth
        @param {Number|null} optionalDialogHeight
     */
    constructor(errorTitle, errorMessage, rootCause, userFixActions, errorResponse, employerId, employeeId,
        supportEmailTopic, supportEmailBody, optionalDialogWidth, optionalDialogHeight) {

        this.errorTitle = '';
        this.errorMessage = '';
        this.rootCause = '';
        this.userFixActions = '';
        this.errorResponse = '';
        this.employerId = '';
        this.employeeId = '';
        this.supportEmailTopic = '';
        this.supportEmailBody = '';
        this.optionalDialogWidth = null;
        this.optionalDialogHeight = null;

        if (!ezApi.ezStringHasLength(errorMessage)) {
            throw ezApi.ezBadParam(
                'errorMessage',
                this.ezTypeName,
                'ezSetErrorMessage');
        }

        this.ezSetErrorTitle(errorTitle);
        this.ezSetErrorMessage(errorMessage);
        this.ezSetRootCause(rootCause);
        this.ezSetUserFixActions(userFixActions);
        this.ezSetErrorResponse(errorResponse);
        this.ezSetEmployerId(employerId);
        this.ezSetEmployeeId(employeeId);
        this.ezSetSupportEmailTopic(supportEmailTopic);
        this.ezSetSupportEmailBody(supportEmailBody);
        this.ezSetOptionalDialogHeight(optionalDialogHeight);
        this.ezSetOptionalDialogWidth(optionalDialogWidth);
    }

    ezSetErrorTitle(errorTitle) {
        this.errorTitle = errorTitle;
    }

    ezGetErrorTitle() {
        return ezApi.ezStringHasLength(this.errorTitle)
            ? this.errorTitle
            : 'EzClocker Error';
    }

    ezSetOptionalDialogHeight(optionalDialogHeight) {
        this.optionalDialogHeight = optionalDialogHeight;

    }

    ezGetOptionalDialogHeight() {
        return  ezApi.ezIsNumber(this.optionalDialogHeight)
            ? this.optionalDialogHeight
            : null;

    }

    ezSetOptionalDialogWidth(optionalDialogWidth) {
        this.optionalDialogWidth = optionalDialogWidth;
    }

    ezGetOptionalDialogWidth() {
        return  ezApi.ezIsNumber(this.optionalDialogWidth)
            ? this.optionalDialogWidth
            : null;
    }

    ezSetErrorMessage(errorMessage) {
        if (!ezApi.ezStringHasLength(errorMessage)) {
            throw ezApi.ezBadParam(
                'errorMessage',
                this.ezTypeName,
                'ezSetErrorMessage');
        }

        this.errorMessage = errorMessage;
    }

    ezGetErrorMessage() {
        return this.errorMessage;
    }


    ezSetRootCause(rootCause) {
        this.rootCause = rootCause;
    }

    ezGetRootCause() {
        return this.rootCause;
    }

    ezSetUserFixActions(userFixActions) {
        this.userFixActions = userFixActions;
    }

    ezGetUserFixActions() {
        return this.userFixActions;
    }

    ezSetErrorResponse(errorResponse) {
        this.errorResponse = errorResponse;
    }

    ezGetErrorResponse() {
        return ezApi.ezIsValid(this.errorResponse)
            ? this.errorResponse
            : {
                errorCode: 12736,
                message: this.ezGetErrorMesssage()
            };
    }

    ezSetEmployerId(employerId) {
        this.employerId = employerId;
    }

    ezGetEmployerId() {
        if (!ezApi.ezIsValid(this.employerId)) {
            this.employerId = ezApi.ezclocker.ezClockerContext.ezGetActiveEmployer().id;
        }

        return this.employerId;
    }

    ezSetEmployeeId(employeeId) {
        this.employeeId = employeeId;
    }

    ezGetEmployeeId() {
        if (!ezApi.ezIsValid(this.employeeId)) {
            this.employeeId = ezApi.ezclocker.ezClockerContext.ezGetActiveEmployee().id;
        }

        return this.employeeId;
    }

    ezSetSupportEmailTopic(supportEmailTopic) {
        this.supportEmailTopic = supportEmailTopic;
    }

    ezGetSupportEmailTopic() {
        return this.supportEmailTopic;
    }

    ezSetSupportEmailBody(supportEmailBody) {
        this.supportEmailBody = supportEmailBody;
    }

    ezGetSupportEmailBody() {
        return this.supportEmailBody;
    }

    ezGetSupportEmailUrl() {
        return ezApi.ezUrlTemplate`mailto:suport@ezclocker.com${this.ezGetSupportEmailParams()}`;
    }

    ezGetSupportEmailParams() {
        if (ezApi.ezStringHasLength(this.ezGetSupportEmailTopic())) {
            let supportBody = ezApi.ezStringHasLength(this.ezGetSupportEmailBody())
                ? ezApi.ezUrlTemplate`&body=${this.ezGetSupportEmailBody()}`
                : '';
            return ezApi.ezUrlTemplate`?topic=${this.ezGetSupportEmailTopic()}${supportBody}`;
        }

        return '';
    }
}

export {
    EzErrorMessageInfo
};
