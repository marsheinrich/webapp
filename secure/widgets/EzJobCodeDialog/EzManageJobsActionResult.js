export class EzManageJobsActionResult {
    constructor(originalDataTag, updated, updatedDataTag, message, errorCode) {
        this.originalDataTag = originalDataTag;
        this.updatedDataTag = updatedDataTag;
        this.updated = updated;
        this.message = message;
        this.errorCode = errorCode;
    }

    ezErrorCode = 0;
    ezMessage = '';

    ezOriginalDataTag = null;
    ezUpdated = false
    ezUpdatedDataTag = null;
}
