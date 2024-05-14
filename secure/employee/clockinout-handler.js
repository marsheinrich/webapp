/* exported EzClockInOutHandler */





/*
 * ==================================================================================================
 *  DEPRECATED: EmployeeDashboard uses secure/common/ez-clockin-clockout-helper.js!!!
 *  This file will get deleted in the near future!!!
 * ==================================================================================================
*/




/**
 * [CONSTRUCTOR]
 *
 * Javascript support for dashboard clock in/out functionality
 *
 * @returns {EzClockInOutHandler}
 */
function EzClockInOutHandler() {
    this.ready = false;
    this.ezApiName = 'ezClockInOutHandler';
    return this;
}

/**
 * @protected
 * Initializes EzClockerInOutHandler
 *
 * @returns {EzClockInOutHandler}
 */
EzClockInOutHandler.prototype.ezInit = function() {
    var self = ezApi.ezclocker.ezClockInOutHandler;

    self.ready = true;
    return self;
};

/**
 * @public
 * Refreshes the active clock in data.
 *
 * @returns {Promise.resolve}
 */
EzClockInOutHandler.prototype.ezRefreshActiveClockIn = function(quiet) {
    if (quiet) {
        return ezApi.ezclocker.ezClockerContext.ezRefreshActiveEmployeeActiveClockIn();
    }

    return ezUi.ezStartPageWaitResolve('Checking clock in/out status ...', function(waitDone, resolve) {
        ezApi.ezclocker.ezClockerContext.ezRefreshActiveEmployeeActiveClockIn().then(function(employeeInfo) {
            waitDone();
            return resolve(employeeInfo);
        });
    });
};

/**
 * [API]
 *
 * @public
 * Performs a clock-in
 *
 * @param {Number} employer
 * @param {Number} employee
 * @param {moment} startPeriodMoment
 * @param {moment} endPeriodMoment
 *
 * @returns {Promise}
 */
EzClockInOutHandler.prototype.breakIn = function(employer, employee) {
    var self = ezApi.ezclocker.ezClockInOutHandler;

    if (ezApi.isNotValid(employer) || ezApi.isNotValid(employee)) {
        return ezApi.ezReject('Unable to take a break without an employer or employee reference.');
    }

    return ezApi.ezPromise(function(resolve, reject) {
        return self.ezRefreshActiveBreakIn().then(function(activeBreakIn) {
            if (ezApi.ezIsValid(activeBreakIn)) {
                ezApi.ezclocker.ezClockerContext.ezGetActiveEmployee().activeBreak = activeBreakIn;
                ezApi.ezclocker.ezClockerContext.ezGetActiveEmployee().isActiveClockIn = false;
                return resolve(ezApi.ezCreateErrorResponse(1, 'Employee is already in break period.'));
            }

            return ezApi.ezclocker.ezHtml5GPS.getLocation().then(
                function(position) {
                    // geo break in
                    if (ezApi.ezIsValid(position)) {
                        return self.breakInWithGeo(employer, employee, position).then(function(response) {
                            ezApi.ezclocker.ezClockerContext.ezGetActiveEmployee().activeBreak = response;
                            ezApi.ezclocker.ezClockerContext.ezGetActiveEmployee().isActiveClockIn = false;
                            ezApi.ezclocker.ezClockerContext.ezGetActiveEmployee().isActiveBreak = true;
                            return resolve(response);
                        }, reject);
                    }
                    return self.breakInWithoutGeo(employer, employee).then(function(response) {
                        ezApi.ezclocker.ezClockerContext.ezGetActiveEmployee().activeBreak = response;
                        ezApi.ezclocker.ezClockerContext.ezGetActiveEmployee().isActiveClockIn = false;
                        ezApi.ezclocker.ezClockerContext.ezGetActiveEmployee().isActiveBreak = true;
                        return resolve(response);
                    }, reject);

                },
                function() {
                    // non-geo clock in
                    return self.breakInWithoutGeo(employer, employee).then(function(response) {
                        ezApi.ezclocker.ezClockerContext.ezGetActiveEmployee().activeBreak = response;
                        ezApi.ezclocker.ezClockerContext.ezGetActiveEmployee().isActiveClockIn = false;
                        ezApi.ezclocker.ezClockerContext.ezGetActiveEmployee().isActiveBreak = true;
                        return resolve(response);
                    }, reject);
                }, reject);
        }, reject);
    });
};

/**
 * [API]
 *
 * @public
 * Refreshes the active clock in data.
 *
 * @param {Number} employer
 * @param {Number} employee
 * @param {Boolean} refreshUi
 *
 * @returns {Promise.resolve}
 */
EzClockInOutHandler.prototype.ezRefreshActiveBreakIn = function() {
    var self = ezApi.ezclocker.ezClockInOutHandler;

    return ezApi.ezResolver(function(resolve) {
        self.activeBreakIn = null;
        ezApi.ezclocker.ezClockerContext.ezRefreshActiveEmployeeActiveBreak().then(
            function() {
                var aEmployee = ezApi.ezclocker.ezClockerContext.ezGetActiveEmployee();
                self.activeBreak = aEmployee.activeBreak;

                // is break in
                if (ezApi.ezIsNotValid(aEmployee.activeBreak)) {
                    aEmployee.isActiveBreak = false;
                    ezApi.ezclocker.ezEmployeeDashboardView.ezEnableClockIn();
                    return resolve(aEmployee.activeBreak);
                }

                aEmployee.isActiveBreak = false;
                ezApi.ezclocker.ezEmployeeDashboardView.ezEnableClockOut();
                return resolve(aEmployee.activeBreak);
            });
    });
};

/**
 * @public
 * Creates the TimeEntry payload
 *
 * @param {Number} employerId
 * @param {Number} employeeId
 * @param {Number|null} customerId
 * @param {Number|null} scheduleId
 * @param {Number|null} associatedScheduleId
 * @param {String|null} clockInIso
 * @param {String|null} clockOutIso
 * @param {String|null} notes
 * @param {String|null} modifiedBy
 * @param {String|null} geoDataStatus
 * @param {Object|null} geoPosition
 * @param {String|null} geoSource
 * @param {Boolean|null} overrideLocationCheck
 * @param {Boolean|null} doNotAudit
 * @param {String|null} source
 *
 * @returns {Object}
 * TimeEntry payload
 */
EzClockInOutHandler.prototype.ezCreateTimeEntryPayload = function(employerId, employeeId, customerId, scheduleId,
    associatedScheduleId, clockInIso, clockOutIso, notes, modifiedBy, geoDataStatus, geoPosition, geoSource,
    dataTagMaps, assignedJobs, jobMappings, overrideLocationCheck, doNotAudit, source) {

    if (!ezApi.ezIsNumber(employerId)) {
        throw ezApi.ezBadParam('employerId', 'EzClockInOutHandler', 'ezCreateTimeEntryPayload');
    }
    if (!ezApi.ezIsNumber(employeeId)) {
        throw ezApi.ezBadParam('employeeId', 'EzClockInOutHandler', 'ezCreateTimeEntryPayload');
    }

    return {
        employerId: employerId,
        employeeId: employeeId,
        customerId: customerId,
        scheduleId: scheduleId,
        associatedScheduleId: associatedScheduleId,

        clockInIso: ezApi.ezAssignOrDefault(clockInIso, null),
        clockInTimeZoneId: ezApi.ezIsNotEmptyString(clockInIso)
            ? ezApi.ezclocker.ezDateTime.activeTimeZone
            : null,
        clockOutIso: ezApi.ezAssignOrDefault(clockOutIso, null),
        clockOutTimeZoneId: ezApi.ezIsNotEmptyString(clockOutIso)
            ? ezApi.ezclocker.ezDateTime.activeTimeZone
            : null,
        isActiveClockIn: ezApi.ezIsNotValid(clockOutIso),

        modifiedBy: ezApi.ezAssignOrDefault(modifiedBy, null),
        description: ezApi.ezAssignOrDefault(notes, ''),
        notes: ezApi.ezAssignOrDefault(notes, ''),

        dataTagMaps: ezApi.ezIsArray(dataTagMaps)
            ? dataTagMaps
            : null,
        assignedJobs: ezApi.ezIsArray(assignedJobs)
            ? dataTagMaps
            : null,
        jobMappings: ezApi.ezIsArray(jobMappings)
            ? jobMappings
            : null,
        targetDateTimeZone: ezApi.ezclocker.ezDateTime.activeTimeZone,
        longitude: ezApi.ezIsValid(geoPosition) &&
            ezApi.ezIsValid(geoPosition.coords) &&
            ezApi.ezIsValid(geoPosition.coords.longitude)
            ? geoPosition.coords.longitude
            : null,
        latitude: ezApi.ezIsValid(geoPosition) &&
            ezApi.ezIsValid(geoPosition.coords) &&
            ezApi.ezIsValid(geoPosition.coords.latitude)
            ? geoPosition.coords.latitude
            : null,
        accuracy: ezApi.ezIsValid(geoPosition) &&
            ezApi.ezIsValid(geoPosition.coords) &&
            ezApi.ezIsValid(geoPosition.coords.accuracy)
            ? geoPosition.coords.accuracy
            : null,
        altitudeAccuracy: ezApi.ezIsValid(geoPosition) &&
            ezApi.ezIsValid(geoPosition.coords) &&
            ezApi.ezIsValid(geoPosition.coords.altitude)
            ? geoPosition.coords.altitude
            : null,
        altitude: ezApi.ezIsValid(geoPosition) &&
            ezApi.ezIsValid(geoPosition.coords) &&
            ezApi.ezIsValid(geoPosition.coords.altitudeAccuracy)
            ? geoPosition.coords.altitudeAccuracy
            : null,
        speed: ezApi.ezIsValid(geoPosition) &&
            ezApi.ezIsValid(geoPosition.coords) &&
            ezApi.ezIsValid(geoPosition.coords.speed)
            ? geoPosition.coords.speed
            : null,
        geoTimestamp: ezApi.ezIsValid(geoPosition) &&
            ezApi.ezIsValid(geoPosition.timestamp)
            ? geoPosition.timestamp
            : null,
        radius: null,
        gpsDataStatus: ezApi.ezAssignOrDefault(geoDataStatus, 'UNKNOWN'),
        gpsSource: ezApi.ezAssignOrDefault(geoSource, 'BROWSER'),
        overrideLocationCheck: ezApi.ezIsTrue(overrideLocationCheck),
        doNotAudit: ezApi.ezIsTrue(doNotAudit),
        source: ezApi.ezAssignOrDefault(source, 'website'),
        locTime: ezApi.ezclocker.ezDateTime.ezNowAsIso()
    };
};

/**
 * @public
 * Performs a clock-in
 *
 * @param {Number} employer
 * @param {Number} employee
 * @param {moment} startPeriodMoment
 * @param {moment} endPeriodMoment
 *
 * @returns {Promise}
 */
EzClockInOutHandler.prototype.ezClockIn = function(employerId, employeeId, selectedPeriod) {
    var self = ezApi.ezclocker.ezClockInOutHandler;

    if (!ezApi.ezIsNumber(employerId)) {
        throw ezApi.ezBadParam('employerId', 'EzClockInOutHandler', 'clockIn');
    }
    if (!ezApi.ezIsNumber(employeeId)) {
        throw ezApi.ezBadParam('employeeId', 'EzClockInOutHandler', 'clockIn');
    }

    return ezApi.ezPromise(function(resolve, reject) {
        var clockInIsoSnapshot = ezApi.ezclocker.ezDateTime.ezNowAsIso();

        self.ezRefreshActiveClockIn(true).then(
            function(employeeInfo) {
                if (ezApi.ezIsValid(employeeInfo.activeClockIn)) {
                    return resolve(ezApi.ezCreateErrorResponse(1, 'Employee is already clocked in.'));
                }

                ezApi.ezclocker.ezHtml5GPS.getLocation({
                    enableHighAccuracy: true,
                    timeout: 30000,
                    maximumAge: 0
                }).then(
                    function(geoPosition) {
                        // geo clock in
                        if (ezApi.ezIsValid(geoPosition)) {
                            return self.ezClockInWithGeo(employerId, employeeId, clockInIsoSnapshot, selectedPeriod,
                                geoPosition)
                                .then(resolve, reject);
                        }
                        return self.ezClockInWithoutGeo(employerId, employeeId, clockInIsoSnapshot, selectedPeriod)
                            .then(resolve, reject);
                    },
                    function(errorCode) {
                        // non-geo clock in
                        var em = ezApi.ezclocker.ezHtml5GPS.getMessageForErrorCode(errorCode);
                        ezApi.ezclocker.logger.error('GPS error: ' + errorCode + ', ' + em);

                        // Perform clock out without geo
                        return self.ezClockInWithoutGeo(employerId, employeeId, clockInIsoSnapshot, selectedPeriod)
                            .then(resolve, reject);
                    });
            });
    });
};

/**
 * [API]
 *
 * @public
 * Performs a clock in with GEO location data
 *
 * @param {Number} employer
 * @param {Number} employee
 * @param {Object} position
 * @param {Boolean} overrideLocationCheck
 *
 * @returns {Promise}
 */
EzClockInOutHandler.prototype.breakInWithGeo = function(employer, employee, position, overrideLocationCheck) {
    var self = ezApi.ezclocker.ezClockInOutHandler;

    if (ezApi.isNotValid(employer) ||
        ezApi.isNotValid(employee)) {
        return ezApi.ezReject('Unable to clock in without an employer or employee reference.');
    }

    var timeEntryRequest = self.ezCreateTimeEntryPayload(employer.id, employee.id,
        ezApi.ezclocker.ezDateTime.ezNowUTC().toISOString(), null, position, overrideLocationCheck);
    timeEntryRequest.gpsDataStatus = 'ACTIVE';
    timeEntryRequest.clockInGpsDataStatus = 'ACTIVE';
    timeEntryRequest.clockOutGpsDataStatus = 'UNKNOWN';
    timeEntryRequest.timeEntryType = 'Break';
    timeEntryRequest.isActiveBreak = true;
    timeEntryRequest.notes = 'Break';
};

/**
 * [API]
 *
 * @public
 * Performs a clock in without GEO location data
 *
 * @param {Number} employer
 * @param {Number} employee
 * @param {moment} currentStartPeriodDate
 * @param {moment} currentEndPeriodDate
 *
 * @returns {Promise}
 */
EzClockInOutHandler.prototype.breakInWithoutGeo = function(employer, employee) {
    var self = ezApi.ezclocker.ezClockInOutHandler;

    if (!employer || !employee) {
        return ezApi.ezReject('Unable to clock in without an employer or employee reference.');
    }
    var clockInDateTimeMoment = ezApi.ezclocker.ezDateTime.ezNowUTC().toISOString();
    var payload = self.ezCreateTimeEntryPayload(employer.id, employee.id, clockInDateTimeMoment, null, null, false);
    payload.timeEntryType = 'Break';
    payload.isActiveBreak = true;
    payload.notes = 'Break';
    return self.submitBreakIn(payload, employer, employee);
};

/**
 * [API]
 *
 * @public
 * Submits a clock out time entry request
 *
 * @param {Object} timeEntryRequest
 *
 * @returns {Promise}
 */
EzClockInOutHandler.prototype.submitBreakIn = function(timeEntryRequest) {

    return ezApi.ezPromise(function(resolve, reject) {
        var url = ezApi.ezclocker.nav.getInternalApiServiceUrl('timeentry/break-in', 'v2');
        ezApi.ezclocker.http.ezPost(url, ezApi.ezToJson(timeEntryRequest))
            .then(ezApi.ezclocker.ezServices.ezProcessApiResolve, ezApi.ezclocker.ezServices.ezProcessApiReject)
            .then(function(response) {
                ezApi.ezclocker.ezClockerContext.ezSetActiveEmployeeActiveClockIn();
                return resolve(response);
            }, reject);
    });
};

/**
 * [API]
 *
 * @public
 *
 * Performs a clock in
 * @param {Number} employer
 * @param {Number} employee
 *
 * @returns {Promise}
 */
EzClockInOutHandler.prototype.endBreak = function(employer, employee) {
    var self = ezApi.ezclocker.ezClockInOutHandler;

    if (ezApi.isNotValid(employer) || ezApi.isNotValid(employee)) {
        return ezApi.Reject('Unable to clock out without an employer or employee reference.');
    }

    return ezApi.ezPromise(function(resolve, reject) {
        return self.ezRefreshActiveBreakIn().then(function(activeBreakIn) {
            if (ezApi.ezIsNotValid(activeBreakIn)) {
                ezApi.ezclocker.ezClockerContext.ezGetActiveEmployee().activeBreak = null;
                ezApi.ezclocker.ezClockerContext.ezGetActiveEmployee().isActiveBreak = false;
                return resolve();
            }

            return ezApi.ezclocker.ezHtml5GPS.getLocation().then(
                function(position) {
                    if (ezApi.ezIsValid(position)) {
                        return self.endBreakWithGeo(employer, employee, position).then(function(response) {
                            ezApi.ezclocker.ezClockerContext.ezGetActiveEmployee().activeBreak = null;
                            ezApi.ezclocker.ezClockerContext.ezGetActiveEmployee().isActiveBreak = false;
                            return resolve(response);
                        }, reject);
                    }
                    return self.endBreakWithoutGeo(employer, employee).then(function(response) {
                        ezApi.ezclocker.ezClockerContext.ezGetActiveEmployee().activeBreak = null;
                        ezApi.ezclocker.ezClockerContext.ezGetActiveEmployee().isActiveBreak = false;
                        return resolve(response);
                    }, reject);
                },
                function() {
                    return self.endBreakWithoutGeo(employer, employee).then(function(response) {
                        ezApi.ezclocker.ezClockerContext.ezGetActiveEmployee().activeBreak = null;
                        ezApi.ezclocker.ezClockerContext.ezGetActiveEmployee().isActiveBreak = false;
                        self.ezRefreshActiveBreakIn();
                        return resolve(response);
                    }, reject);
                }, reject);
        }, reject);
    });
};

/**
 * [API]
 *
 * @public
 * Performs a clock out with GEO location data
 *
 * @param {Number} employer
 * @param {Number} employee
 * @param {Object} position
 * @param {Boolean} overrideLocationCheck
 *
 * @returns {Promise}
 */
EzClockInOutHandler.prototype.endBreakWithGeo = function(employer, employee, position, overrideLocationCheck) {
    var self = ezApi.ezclocker.ezClockInOutHandler;

    if (ezApi.anyNotValid(employer, employee)) {
        return ezApi.Reject('Unable to clock out without an employer or employee reference.');
    }
    if (ezApi.isNotValid(position)) {
        ezApi.ezclocker.logger.warn('Call to clock out with geo does not have a valid position. Redirecting to clock out without geo.');
        return self.endBreakWithoutGeo(employer, employee);
    }

    var clockOutDateTimeMoment = ezApi.ezclocker.ezDateTime.ezNowUTC().toISOString();
    var payload = self.ezCreateTimeEntryPayload(employer.id, employee.id, null, clockOutDateTimeMoment, position,
        overrideLocationCheck);
    payload.clockInGpsDataStatus = 'ACTIVE';
    payload.timeEntryType = 'Break';
    payload.isActiveBreak = false;
    payload.notes = 'Break';
    return self.submitEndBreak(payload);
};

/**
 * [API]
 *
 * @public
 * Performs a clock out without GEO location data
 *
 * @param {Number} employer
 * @param {Number} employee
 *
 * @returns {Promise}
 */
EzClockInOutHandler.prototype.endBreakWithoutGeo = function(employer, employee) {
    var self = ezApi.ezclocker.ezClockInOutHandler;

    if (ezApi.anyNotValid(employer, employee)) {
        return ezApi.ezReject('Unable to clock out without an employer or employee reference.');
    }

    var clockOutDateTimeMoment = ezApi.ezclocker.ezDateTime.ezNowUTC().toISOString();
    var timeEntryRequest = self.ezCreateTimeEntryPayload(employer.id, employee.id, null, clockOutDateTimeMoment, null, false);
    timeEntryRequest.timeEntryType = 'Break';
    timeEntryRequest.clockOutGpsDataStatus = 'DISABLED';
    timeEntryRequest.isActiveBreak = false;
    timeEntryRequest.notes = 'Break';
    return self.submitEndBreak(timeEntryRequest);
};

/**
 * [API]
 *
 * @public
 * Submits a clock out time entry request
 *
 * @param {Object} timeEntryRequest
 *
 * @returns {Promise}
 */
EzClockInOutHandler.prototype.submitEndBreak = function(timeEntryRequest) {

    return ezApi.ezPromise(function(resolve, reject) {
        var url = ezApi.ezclocker.nav.getInternalApiServiceUrl('timeentry/break-out', 'v2');
        ezApi.ezclocker.http.ezPost(url, ezApi.ezToJson(timeEntryRequest))
            .then(ezApi.ezclocker.ezServices.ezProcessApiResolve, ezApi.ezclocker.ezServices.ezProcessApiReject)
            .then(function(response) {
                ezApi.ezclocker.ezClockerContext.ezSetActiveEmployeeActiveClockIn();
                return resolve(response);
            }, reject);
    });
};

/**
 * [API]
 *
 * @public
 * Performs a clock in with GEO location data
 *
 * @param {Number} employer
 * @param {Number} employee
 * @param {Object} position
 * @param {Boolean} overrideLocationCheck
 *
 * @returns {Promise}
 */
EzClockInOutHandler.prototype.clockInWithGeo = function(employer, employee, position, overrideLocationCheck) {
    var self = ezApi.ezclocker.ezClockInOutHandler;

    if (ezApi.isNotValid(employer) ||
        ezApi.isNotValid(employee)) {
        return ezApi.ezReject('Unable to clock in without an employer or employee reference.');
    }

    var timeEntryRequest = self.ezCreateTimeEntryPayload(employer.id, employee.id,
        ezApi.ezclocker.ezDateTime.ezNowUTC().toISOString(), null, position, overrideLocationCheck);
    timeEntryRequest.gpsDataStatus = 'ACTIVE';
    timeEntryRequest.clockInGpsDataStatus = 'ACTIVE';
    timeEntryRequest.clockOutGpsDataStatus = 'UNKNOWN';
    return self.submitClockIn(timeEntryRequest);
};

/**
 * [API]
 *
 * @public
 * Performs a clock in without GEO location data
 *
 * @param {Number} employer
 * @param {Number} employee
 * @param {moment} currentStartPeriodDate
 * @param {moment} currentEndPeriodDate
 *
 * @returns {Promise}
 */
EzClockInOutHandler.prototype.clockInWithoutGeo = function(employer, employee) {
    var self = ezApi.ezclocker.ezClockInOutHandler;

    if (!employer || !employee) {
        return ezApi.ezReject('Unable to clock in without an employer or employee reference.');
    }
    var clockInDateTimeMoment = ezApi.ezclocker.ezDateTime.ezNowUTC().toISOString();
    var payload = self.ezCreateTimeEntryPayload(employer.id, employee.id, clockInDateTimeMoment, null, null, false);
    return self.submitClockIn(payload, employer, employee);
};

/**
 * [API]
 *
 * @public
 * Submits a clock in time entry request.
 *
 * @param {Object} timeEntryRequest
 * @param {moment} currentStartPeriodDate
 * @param {moment} currentEndPeriodDate
 *
 * @returns {Promise}
 */
EzClockInOutHandler.prototype.submitClockIn = function(timeEntryRequest) {
    if (ezApi.isNotValid(timeEntryRequest) || ezApi.isNotValid(timeEntryRequest.employerId) ||
        ezApi.isNotValid(timeEntryRequest.employeeId)) {
        return ezApi.ezReject(
            'Time entry request, employer, employee, current period references are required to submit a clock in.'
        );
    }

    return ezApi.ezPromise(function(resolve, reject) {
        var url = ezApi.ezclocker.nav.getInternalApiServiceUrl('timeentry/clock-in', 'v2');
        ezApi.ezclocker.http.ezPost(url, ezApi.ezToJson(timeEntryRequest))
            .then(ezApi.ezclocker.ezServices.ezProcessApiResolve, ezApi.ezclocker.ezServices.ezProcessApiReject)
            .then(function(response) {
                ezApi.ezclocker.ezClockerContext.ezSetActiveEmployeeActiveClockIn(response.timeEntry);
                return resolve(response.timeEntry);
            }, reject);
    });
};

/**
 * [API]
 *
 * @public
 *
 * Performs a clock in
 * @param {Number} employer
 * @param {Number} employee
 *
 * @returns {Promise}
 */
EzClockInOutHandler.prototype.clockOut = function(employer, employee) {
    var self = ezApi.ezclocker.ezClockInOutHandler;

    if (ezApi.isNotValid(employer) || ezApi.isNotValid(employee)) {
        return ezApi.Reject('Unable to clock out without an employer or employee reference.');
    }

    return ezApi.ezPromise(function(resolve, reject) {
        return self.ezRefreshActiveClockIn().then(function(activeClockIn) {
            if (ezApi.ezIsNotValid(activeClockIn)) {
                ezApi.ezclocker.ezClockerContext.ezGetActiveEmployee().activeClockIn = null;
                ezApi.ezclocker.ezClockerContext.ezGetActiveEmployee().isActiveClockIn = false;
                return resolve();
            }

            return ezApi.ezclocker.ezHtml5GPS.getLocation({
                enableHighAccuracy: true,
                timeout: 30000,
                maximumAge: 0
            }).then(
                function(position) {
                    if (ezApi.ezIsValid(position)) {
                        return self.clockOutWithGeo(employer, employee, position).then(function(response) {
                            ezApi.ezclocker.ezClockerContext.ezGetActiveEmployee().activeClockIn = null;
                            return resolve(response);
                        }, reject);
                    }
                    return self.clockOutWithoutGeo(employer, employee).then(function(response) {
                        ezApi.ezclocker.ezClockerContext.ezGetActiveEmployee().activeClockIn = null;
                        return resolve(response);
                    }, reject);
                },
                function() {
                    return self.clockOutWithoutGeo(employer, employee).then(function(response) {
                        self.ezRefreshActiveClockIn();
                        return resolve(response);
                    }, reject);
                });
        }, reject);
    });
};

/**
 * [API]
 *
 * @public
 * Performs a clock out with GEO location data
 *
 * @param {Number} employer
 * @param {Number} employee
 * @param {Object} position
 * @param {Boolean} overrideLocationCheck
 *
 * @returns {Promise}
 */
EzClockInOutHandler.prototype.clockOutWithGeo = function(employer, employee, position, overrideLocationCheck) {
    var self = ezApi.ezclocker.ezClockInOutHandler;

    if (ezApi.anyNotValid(employer, employee)) {
        return ezApi.Reject('Unable to clock out without an employer or employee reference.');
    }
    if (ezApi.isNotValid(position)) {
        ezApi.ezclocker.logger.warn('Call to clock out with geo does not have a valid position. Redirecting to clock out without geo.');
        return self.clockOutWithoutGeo(employer, employee);
    }

    var clockOutDateTimeMoment = ezApi.ezclocker.ezDateTime.ezNowUTC().toISOString();
    var payload = self.ezCreateTimeEntryPayload(employer.id, employee.id, null, clockOutDateTimeMoment, position,
        overrideLocationCheck);
    payload.clockInGpsDataStatus = 'ACTIVE';
    return self.submitClockOut(payload);
};

/**
 * [API]
 *
 * @public
 * Performs a clock out without GEO location data
 *
 * @param {Number} employer
 * @param {Number} employee
 *
 * @returns {Promise}
 */
EzClockInOutHandler.prototype.clockOutWithoutGeo = function(employer, employee) {
    var self = ezApi.ezclocker.ezClockInOutHandler;

    if (ezApi.anyNotValid(employer, employee)) {
        return ezApi.ezReject('Unable to clock out without an employer or employee reference.');
    }

    var clockOutDateTimeMoment = ezApi.ezclocker.ezDateTime.ezNowUTC().toISOString();
    var timeEntryRequest = self.ezCreateTimeEntryPayload(employer.id, employee.id, null, clockOutDateTimeMoment, null, false);
    timeEntryRequest.clockOutGpsDataStatus = 'DISABLED';
    return self.submitClockOut(timeEntryRequest);
};

/**
 * [API]
 *
 * @public
 * Submits a clock out time entry request
 *
 * @param {Object} timeEntryRequest
 *
 * @returns {Promise}
 */
EzClockInOutHandler.prototype.submitClockOut = function(timeEntryRequest) {

    return ezApi.ezPromise(function(resolve, reject) {
        var url = ezApi.ezclocker.nav.getInternalApiServiceUrl('timeentry/clock-out', 'v2');
        ezApi.ezclocker.http.ezPost(url, ezApi.ezToJson(timeEntryRequest))
            .then(ezApi.ezclocker.ezServices.ezProcessApiResolve, ezApi.ezclocker.ezServices.ezProcessApiReject)
            .then(function(response) {
                ezApi.ezclocker.ezClockerContext.ezSetActiveEmployeeActiveClockIn();
                return resolve(response);
            }, reject);
    });
};

/**
 * ezApi registration
 */
document.addEventListener('onEzApiReady', function() {
    ezApi.ezRegisterSecure('ezClockInOutHandler', new EzClockInOutHandler());
    ezApi.ezclocker.ezClockInOutHandler.ezInit();
    // Legacy assignment
    ezApi.ezRegisterWindow('ezClockInOutHandler', ezApi.ezclocker.ezClockInOutHandler);
});
