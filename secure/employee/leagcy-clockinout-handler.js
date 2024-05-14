// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// DO NOT USE THIS CLASS
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// Class has not been updated to the latest syntax in a long time
// Will most likely remove this class in a future release
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

/* exported EzClockInOutHandler */

/**
 * Javascript support for dashboard clock in/out functionality
 *
 * @returns {EzClockInOutHandler}
 */
function EzClockInOutHandler() {
    this.ready = false;

    this.EMPLOYEE_CLOCK_IN_OUT_COMPLETE_EVENT_NAME = 'ezEmployeeClockInOutComplete';

    this.activeClockIn = null;

    return this;
}

/**
 * @protected
 * Initializes EzClockerInOutHandler
 *
 * @returns {EzClockInOutHandler}
 */
EzClockInOutHandler.prototype.ezInit = function () {
    let self = ezApi.ezclocker.ezClockInOutHandler;
    self.ready = true;
    return self;
};

/**
 * @public
 *
 * @returns {Promise.resolve}
 */
EzClockInOutHandler.prototype.ezRefreshActiveClockIn = function () {
    let self = ezApi.ezclocker.ezClockInOutHandler;

    return ezApi.ezResolver(function (resolve) {
        self.activeClockIn = null;
        ezApi.ezclocker.ezClockerContext.ezRefreshActiveEmployeeActiveClockIn().then(
            function () {
                let aEmployee = ezApi.ezclocker.ezClockerContext.ezGetActiveEmployee();
                self.activeClockIn = aEmployee.activeClockIn;

                // is clocked in
                if (ezApi.ezIsNotValid(aEmployee.activeClockIn)) {
                    ezApi.ezclocker.ezEmployeeDashboardView.ezEnableClockIn();
                    return resolve(aEmployee.activeClockIn);
                }

                ezApi.ezclocker.ezEmployeeDashboardView.ezEnableClockOut();
                return resolve(aEmployee.activeClockIn);
            });
    });
};

/**
 * @public
 * Creates the TimeEntry payload
 * @param {long} employerId
 * @param {long} employeeId
 * @param {boolean} overrideLocationCheck
 * @param {object} position
 * @param {string} clockIn
 * @param {string} clockOut
 * @returns {object}
 * TimeEntry payload
 */
EzClockInOutHandler.prototype.ezCreateTimeEntryPayload = function (employerId, employeeId, overrideLocationCheck,
    position, clockIn, clockOut) {

    let lng = ezApi.isValid(position) && ezApi.isValid(position.coords) && ezApi.isValid(position.coords.longitude) ?
        position.coords.longitude : null;
    let lat = ezApi.isValid(position) && ezApi.isValid(position.coords) && ezApi.isValid(position.coords.latitude) ?
        position.coords.latitude : null;
    let accuracy = ezApi.isValid(position) && ezApi.isValid(position.coords) &&
        ezApi.isValid(position.coords.accuracy) ? position.coords.accuracy : null;
    let eId = ezApi.isValid(employerId) ? employerId : null;
    let empId = ezApi.isValid(employeeId) ? employeeId : null;
    let olc = ezApi.isTrue(overrideLocationCheck);
    let cin = ezApi.isNotEmptyString(clockIn) ? clockIn : '';
    let cout = ezApi.isNotEmptyString(clockOut) ? clockOut : '';

    return {
        clockInIso8601: cin,
        clockOutIso8601: cout,
        employerId: eId,
        employeeId: empId,
        notes: '',
        description: '',
        overrideLocationCheck: olc,
        longitude: lng,
        latitude: lat,
        accuracy: accuracy,
        radius: '',
        gpsSource: 'BROWSER'
    };
};

/**
 * @public
 * Performs a clock-in
 *
 * @returns {Promise.resolve}
 */
EzClockInOutHandler.prototype.clockIn = function () {
    let self = ezApi.ezclocker.ezClockInOutHandler;

    if (!ezApi.ezclocker.ezClockerContext.ezIsActiveEmployeeValid()) {
        ezApi.ezclocker.ezDialog.ezReportInternalBugDialog(null, 'Clock In Error', 'Unable to clock you in at this time.',
            'An active employee is required to clock in.');
        return ezApi.ezReject();
    }

    return ezApi.ezResolver(function (resolve, reject) {
        self.ezRefreshActiveClockIn().then(function (activeClockIn) {
            if (ezApi.ezIsValid(activeClockIn)) {
                self.ezHandleSuccessClockOutResponse();
                return resolve(ezApi.ezCreateErrorResponse(1, 'Employee is already clocked in.'));
            }
            ezUi.ezStartPageWaitExecute('Clocking you in ...', function (waitDone) {
                ezApi.ezclocker.ezHtml5GPS.getLocation({
                    enableHighAccuracy: true,
                    timeout: 30000,
                    maximumAge: 0
                }).then(
                    function (position) {
                        if (ezApi.ezIsValid(position)) {
                            return self.clockInWithGeo(position)
                                .then(self.ezHandleSuccessClockInResponse, self
                                    .ezHandleFailedClockInResponse)
                                .then(function () {
                                    waitDone();
                                    return resolve();
                                }, reject);
                        }
                        return self.clockInWithoutGeo()
                            .then(self.ezHandleSuccessClockInResponse, self.ezHandleFailedClockInResponse)
                            .then(function () {
                                waitDone();
                                return resolve();
                            }, reject);
                    },
                    function (errorCode) {
                        let em = ezApi.ezclocker.ezHtml5GPS.getMessageForErrorCode(errorCode);
                        ezApi.ezclocker.logger.error('GPS error: ' + errorCode + ', ' + em);
                        return self.clockInWithoutGeo()
                            .then(self.ezHandleSuccessClockInResponse, self.ezHandleFailedClockInResponse)
                            .then(function () {
                                waitDone();
                                return resolve();
                            }, reject);
                    });
            });
        });
    });
};

/**
 * @private
 * Handles successful clock in responses
 *
 * @param {Object} timeEntry
 *
 * @returns {Promise.resolve}
 */
EzClockInOutHandler.prototype.ezHandleSuccessClockInResponse = function () {
    let self = ezApi.ezclocker.ezClockInOutHandler;

    return ezApi.ezResolver((resolve) => {
        ezApi.ezclocker.ezEmployeeDashboardController.ezRefreshTimeEntriesForPeriod().then(
            () => {
                ezApi.ezclocker.ezEventEngine.ezTriggerEvent(
                    self.EMPLOYEE_CLOCK_IN_OUT_COMPLETE_EVENT_NAME);

                return resolve();
            });
    });
};

/**
 * @private
 * Handles failed clock in responses
 *
 * @returns {Promise.resolve}
 */
EzClockInOutHandler.prototype.ezHandleFailedClockInResponse = function (eResponse) {
    let self = ezApi.ezclocker.ezClockInOutHandler;

    eResponse = ezApi.ezIsNotValid(eResponse)
        ? ezApi.ezclocker.ezServices.ezBuildErrorResponse(500, 'Unexpected error with no additional details.')
        : eResponse;

    ezApi.ezclocker.logger.error('Failed to clock in. Error: ' + ezApi.ezToJson(eResponse));
    ezApi.ezclocker.ezDialog.ezShowNon200ServiceError('Clock In Error', eResponse, 'Unable to clock in at this time.');

    ezApi.ezclocker.ezEvents.ezTriggerEvent(self.EMPLOYEE_CLOCK_IN_OUT_COMPLETE_EVENT_NAME);
    return ezApi.ezResolve(eResponse);
};

/**
 * @public
 * Performs a clock in with GEO location data
 *
 * @param {object} position
 * @param {boolean} overrideLocationCheck
 *
 * @returns {Promise}
 */
EzClockInOutHandler.prototype.clockInWithGeo = function (position, overrideLocationCheck) {
    let self = ezApi.ezclocker.ezClockInOutHandler;

    if (!ezApi.ezclocker.ezClockerContext.ezIsActiveEmployeeValid()) {
        ezApi.ezclocker.ezDialog.ezReportInternalBugDialog(null, 'Clock In Error', 'Unable to clock you in at this time.',
            'An active employee is required to clock in with GPS.');
        return ezApi.ezResolve();
    }
    let aEmployee = ezApi.ezclocker.ezClockerContext.ezGetActiveEmployee();

    let timeEntryRequest = self.ezCreateTimeEntryPayload(aEmployee.employerId, aEmployee.id,
        overrideLocationCheck, position, ezApi.ezclocker.ezDateTime.ezNowUTC().toISOString(), '');

    timeEntryRequest.gpsDataStatus = 'ACTIVE';
    timeEntryRequest.clockInGpsDataStatus = 'ACTIVE';
    timeEntryRequest.clockOutGpsDataStatus = 'UNKNOWN';
    return self.submitClockIn(timeEntryRequest);
};

/**
 * @public
 * Performs a clock in without GEO location data
 *
 * @returns {Promise}
 */
EzClockInOutHandler.prototype.clockInWithoutGeo = function () {
    let self = ezApi.ezclocker.ezClockInOutHandler;

    if (!ezApi.ezclocker.ezClockerContext.ezIsActiveEmployeeValid()) {
        ezApi.ezclocker.ezDialog.ezReportInternalBugDialog(null, 'Clock In Error', 'Unable to clock you in at this time.',
            'An active employee is required to clock in without GPS.');
        return ezApi.ezReject();
    }
    let aEmployee = ezApi.ezclocker.ezClockerContext.ezGetActiveEmployee();

    let clockInDateTimeMoment = ezApi.ezclocker.ezDateTime.ezNowUTC().toISOString();
    let payload = self.ezCreateTimeEntryPayload(aEmployee.employerId, aEmployee.id, false, null, clockInDateTimeMoment, '');
    return self.submitClockIn(payload);
};

/**
 * @public
 * Submits a clock-in action
 *
 * @param {object} timeEntryRequest
 *
 * @returns {Promise}
 */
EzClockInOutHandler.prototype.submitClockIn = function (timeEntryRequest) {
    let self = ezApi.ezclocker.ezClockInOutHandler;

    if (ezApi.isNotValid(timeEntryRequest) || ezApi.isNotValid(timeEntryRequest.employerId) ||
        ezApi.isNotValid(timeEntryRequest.employeeId)) {
        return ezApi.ezReject('A valid timeEntryRequest is required in call to EzClockInOutHandler.submitClockIn');
    }

    return ezApi.ezPromise(function (resolve, reject) {
        let url = ezApi.ezclocker.nav.getInternalApiServiceUrl('timeentry/clockin/' + timeEntryRequest.employerId +
            '/' + timeEntryRequest.employeeId, 'v1');
        url = ezApi.ezclocker.ezServices.ezAddQueryParam(url, 'source', 'website');
        url = ezApi.ezclocker.ezServices.ezAddQueryParam(
            url, 
            'timezone', 
            ezApi.ezEncode(ezApi.ezclocker.ezDateUtils.ezGetBrowserTimezone()));

        ezApi.ezclocker.http.ezPost(url, ezApi.ezToJson(timeEntryRequest))
            .then(ezApi.ezclocker.ezServices.ezProcessApiResolvesubmitClockIn, ezApi.ezclocker.ezServices
                .ezProcessApiResolvesubmitClockOut)
            .then(
                function (response) {
                    self.activeClockIn = response.timeEntry;
                    return resolve(response.timeEntry);
                },
                function (errorResponse) { // failure
                    let em = 'Unable to clock employee in due to the following error: ';
                    em += errorResponse && errorResponse.message
                        ? errorResponse.message
                        : 'Service is currently not available. Please try again later.';
                    ezApi.ezclocker.logger.error(em);
                    ezApi.ezclocker.ezDialog.ezShowError('Clock In Error', em);
                    return reject(em);
                });
    });
};

/**
 * @public
 * Performs a clock in
 *
 * @returns {Promise.resolve}
 */
EzClockInOutHandler.prototype.clockOut = function () {
    let self = ezApi.ezclocker.ezClockInOutHandler;

    if (!ezApi.ezclocker.ezClockerContext.ezIsActiveEmployeeValid()) {
        ezApi.ezclocker.ezDialog.ezReportInternalBugDialog(null, 'Clock In Error', 'Unable to clock you in at this time.',
            'An active employee is required to clock in without GPS.');
        return ezApi.ezReject();
    }

    return ezApi.ezResolver(function (resolve, reject) {
        self.ezRefreshActiveClockIn().then(function (activeClockIn) {
            if (ezApi.ezIsNotValid(activeClockIn)) {
                self.ezHandleSuccessClockInResponse();
                return resolve();
            }
            return ezUi.ezStartPageWaitExecute('Clocking you out ...', function (waitDone) {
                return ezApi.ezclocker.ezHtml5GPS.getLocation({
                    enableHighAccuracy: true,
                    timeout: 30000,
                    maximumAge: 0
                }).then(
                    function (position) {
                        return ezApi.ezIsValid(position)
                            ? self.clockOutWithGeo(position)
                                .then(self.ezHandleSuccessClockOutResponse, self
                                    .ezHandleFailureClockOutResponse)
                                .then(function () {
                                    waitDone();
                                    return resolve();
                                }, reject)
                            : self.clockOutWithoutGeo()
                                .then(self.ezHandleSuccessClockOutResponse, self
                                    .ezHandleFailureClockOutResponse)
                                .then(function () {
                                    waitDone();
                                    return resolve();
                                }, reject);
                    },
                    function (errorCode) {
                        let em = ezApi.ezclocker.ezHtml5GPS.getMessageForErrorCode(errorCode);
                        ezApi.ezclocker.logger.debug('GPS error: ' + errorCode + ', ' + em);
                        self.clockOutWithoutGeo()
                            .then(self.ezHandleSuccessClockOutResponse, self
                                .ezHandleFailureClockOutResponse)
                            .then(function () {
                                waitDone();
                                return resolve();
                            }, reject);
                    });
            });
        });
    });
};

/**
 * @private
 * Handles successful clock out responses.
 *
 * @param {Object} eResponse
 *
 * @returns {Promise.resolve}
 */
EzClockInOutHandler.prototype.ezHandleSuccessClockOutResponse = function () {
    let self = ezApi.ezclocker.ezClockInOutHandler;

    return ezApi.ezResolver(function (resolve) {
        ezApi.ezclocker.ezEmployeeDashboardController.ezRefreshTimeEntriesForPeriod().then(
            function () {
                ezApi.ezclocker.ezEvents.ezTriggerEvent(self.EMPLOYEE_CLOCK_IN_OUT_COMPLETE_EVENT_NAME);
                return resolve();
            });
    });
};

/**
 * @private
 * Handles failed clock out responses
 *
 * @param {object} eResponse
 *
 * @returns {Promise.resolve}
 */
EzClockInOutHandler.prototype.ezHandleFailureClockOutResponse = function (eResponse) {
    let self = ezApi.ezclocker.ezClockInOutHandler;

    eResponse = ezApi.ezIsNotValid(eResponse)
        ? ezApi.ezclocker.ezServices.ezBuildErrorResponse(500, 'Unexpected error with no additional details.')
        : eResponse;

    ezApi.ezclocker.logger.error('Failed to clock out. Error: ' + ezApi.ezToJson(eResponse));
    ezApi.ezclocker.ezDialog.ezShowNon200ServiceError('Clock Out Error', eResponse, 'Unable to clock in at this time.');
    ezApi.ezclocker.ezEvents.ezTriggerEvent(self.EMPLOYEE_CLOCK_IN_OUT_COMPLETE_EVENT_NAME);
    return ezApi.ezResolve(eResponse);
};


/**
 * @public
 * Performs a clock out with GEO location data
 *
 * @param {object} position
 * @param {boolean} overrideLocationCheck
 *
 * @returns {Promise}
 */
EzClockInOutHandler.prototype.clockOutWithGeo = function (position, overrideLocationCheck) {
    let self = ezApi.ezclocker.ezClockInOutHandler;

    if (!ezApi.ezclocker.ezClockerContext.ezIsActiveEmployeeValid()) {
        ezApi.ezclocker.ezDialog.ezReportInternalBugDialog(null, 'Clock In Error', 'Unable to clock you in at this time.',
            'An active employee is required to clock out with GPS.');
        return ezApi.ezResolve();
    }
    let aEmployee = ezApi.ezclocker.ezClockerContext.ezGetActiveEmployee();

    if (ezApi.ezIsNotValid(position)) {
        ezApi.ezclocker.logger.warn('Call to clock out with geo does not have a valid position. Redirecting to clock out without geo.');
        return self.clockOutWithoutGeo();
    }

    let clockOutDateTimeMoment = ezApi.ezclocker.ezDateTime.ezNowUTC().toISOString();
    let payload = self.ezCreateTimeEntryPayload(aEmployee.employerId, aEmployee.id, overrideLocationCheck, position, null,
        clockOutDateTimeMoment);
    payload.clockInGpsDataStatus = 'ACTIVE';
    return self.submitClockOut(payload);
};


/**
 * @public
 * Performs a clock out without GEO location data
 *
 * @returns {Promise}
 */
EzClockInOutHandler.prototype.clockOutWithoutGeo = function () {
    let self = ezApi.ezclocker.ezClockInOutHandler;

    if (!ezApi.ezclocker.ezClockerContext.ezIsActiveEmployeeValid()) {
        ezApi.ezclocker.ezDialog.ezReportInternalBugDialog(null, 'Clock In Error', 'Unable to clock you in at this time.',
            'An active employee is required to clock out without GPS.');
        return ezApi.ezResolve();
    }
    let aEmployee = ezApi.ezclocker.ezClockerContext.ezGetActiveEmployee();

    let clockOutDateTimeMoment = ezApi.ezclocker.ezDateTime.ezNowUTC().toISOString();
    let timeEntryRequest = self.ezCreateTimeEntryPayload(aEmployee.employerId, aEmployee.id, true, null, null, clockOutDateTimeMoment);
    timeEntryRequest.clockOutGpsDataStatus = 'DISABLED';
    return self.submitClockOut(timeEntryRequest);
};

/**
 * @public
 * Submits a clock-out action
 *
 * @param {object} timeEntryRequest
 *
 * @returns {Promise}
 */
EzClockInOutHandler.prototype.submitClockOut = function (timeEntryRequest) {
    let self = ezApi.ezclocker.ezClockInOutHandler;

    return ezApi.ezPromise(function (resolve, reject) {
        let url = ezApi.ezclocker.nav.getInternalApiServiceUrl('timeentry/clockout/' + timeEntryRequest.employerId +
            '/' + timeEntryRequest.employeeId, 'v1');
        url = ezApi.ezclocker.ezServices.ezAddQueryParam(url, 'source', 'website');
        url = ezApi.ezclocker.ezServices.ezAddQueryParam(
            url, 
            'timezone', 
            ezApi.ezEncode(ezApi.ezclocker.ezDateUtils.ezGetBrowserTimezone()));

        ezApi.ezclocker.http.ezPost(url, ezApi.ezToJson(timeEntryRequest))
            .then(ezApi.ezclocker.ezServices.ezProcessApiResolve, ezApi.ezclocker.ezServices.ezProcessApiReject)
            .then(
                (response) => {
                    self.activeClockIn = null;
                    return resolve(response);
                },
                (eResponse) => {
                    let em = ezApi.isValid(eResponse) && ezApi.isNotEmptyString(eResponse.message)
                        ? 'Unable to clock employee out due to the following error: \n\n' + eResponse.message
                        : 'Clock out service is not currently available. Please try again later.';
                    ezApi.ezclocker.logger.error(em + ' Error Response: ' + ezApi.ezToJson(eResponse, 3));
                    //TODO: re-factor to get ui out
                    ezApi.ezclocker.ezDialog.ezShowError('Clock In Error', em);
                    return reject(em);
                });
    });
};


/**
 * ezApi registration
 */
document.addEventListener('onEzApiReady', () => {
    ezApi.ezRegisterSecure('ezClockInOutHandler', new EzClockInOutHandler());
    ezApi.ezclocker.ezClockInOutHandler.ezInit();
    // Legacy assignment
    ezApi.ezRegisterWindow('ezClockInOutHandler', ezApi.ezclocker.ezClockInOutHandler);
});
