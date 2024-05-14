// DEPRECATED: DO NOT USE THIS MODULE ANYMORE
// Switch to /public/javascript/common/ez-context.js with /secure/javascript/services/ezclocker-employee-service.js instead.

window.console.error('DEPRECATED DEPENDENCY: /secure/javascript/common/ezclocker-employee-services.js !! DO NOT USE !!');

/* globals
    getServiceUrl, ezPostJSON, getIsClockedInUrl
 */

/* exported getEmployees */
/**
 * @deprecated DO NOT USE, switch to ez-context.js functionality
 *
 * @public
 * Gets all employees for an employer
 *
 * @param employerId
 * @param successHandler
 * @param errorHandler
 */
function getEmployees(employerId, successHandler, errorHandler) {
    ezApi.ezclocker.logger.dev('getEmployees', 'Use ezApi.ezclocker.ezEmployeeService', 'ezclocker-employee-services.js');
    if (ezApi.ezIsNotValid(successHandler) || ezApi.isNotValid(employerId)) {
        ezApi.ezclocker.logger.warn('Cancled to call ezclocker-employee-services:getEmployees due to bad or missing params.');
        return; // nothing to do or no one wants the data
    }
    var url = getServiceUrl('_employee/getEmployees/' + employerId);
    ezPostJSON(url, '', successHandler, errorHandler);
}

/* exported getEmployeeData */
/**
 * @deprecated DO NOT USE, switch to ez-context.js functionality
 *
 * @public
 * Gets a specific employee's data
 *
 * @param employeeId
 * @param successHandler
 * @param errorHandler
 */
function getEmployeeData(employerId, employeeId, successHandler, errorHandler) {
    ezApi.ezclocker.logger.dev('getEmployeeData', 'Use ezApi.ezclocker.ezEmployeeService', 'ezclocker-employee-services.js');
    if (ezApi.ezIsNotValid(successHandler) || ezApi.isNotValid(employerId) ||
        ezApi.ezIsNotValid(employerId) || ezApi.isNotValid(employerId)) {
        ezApi.ezclocker.logger.warn('Cancled to call ezclocker-employee-services:getEmployeeData due to bad or missing params.');
        return; // nothing to do or no one wants the data
    }
    var url = getServiceUrl('_employee/get/' + employerId + '/' + employeeId);
    ezPostJSON(url, '', successHandler, errorHandler);
}

/* exported isEmployeeClockedIn */
/**
 * @deprecated DO NOT USE, switch to ez-context.js functionality
 *
 * @public
 * Determines if an employee for an employer is clocked in or not.
 *
 * @param urlPrefix
 * @param employer
 * @param employee
 *
 * @returns {Boolean}
 */
function isEmployeeClockedIn(urlPrefix, employer, employee, trueCallBack, falseCallBack) {
    ezApi.ezclocker.logger.dev('isEmployeeClockedIn', 'Use ezApi.ezclocker.ezEmployeeService', 'ezclocker-employee-services.js');
    if (employee === null || employee === null) {
        if (!ezApi.isNotValid(falseCallBack)) {
            falseCallBack(false);
        }
        return;
    }
    var url = getIsClockedInUrl(urlPrefix, employer.id, employee.id);
    ezApi.ezclocker.http.post(url).then(
        function(response) {
            var isClockedInResult = response;
            if (!ezApi.isNotValid(falseCallBack) && isClockedInResult.message == 'True') {
                trueCallBack(false);
                return;
            }
            if (!ezApi.isNotValid(trueCallBack)) {
                falseCallBack(true);
            }
        },
        function() {
            if (!ezApi.isNotValid(falseCallBack)) {
                falseCallBack(false);
            }
        }
    );
}

/* exported clockEmployeeIn */
/**
 * @deprecated DO NOT USE, switch to ez-context.js functionality
 *
 * @public
 * Clocks the employee for the employer out
 *
 * @param urlPrefix
 * @param employer
 * @param employee
 *
 * @returns
 */
function clockEmployeeIn(urlPrefix, employer, employee) {
    ezApi.ezclocker.logger.dev('clockEmployeeIn', 'Use ezApi.ezclocker.ezEmployeeService', 'ezclocker-employee-services.js');
    var url = ezApi.ezclocker.nav.getInternalClassicApiUrl('timeEntry/clockIn/' + employer.id + '/' + employee.id +
        '?clockInDateTime=' + ezApi.ezclocker.ezDateTime.ezToIsoDateTime(ezApi.ezclocker.ezDateTime.ezNow()));
    return ezApi.ezPromise(function(resolve, reject) {
        ezApi.ezclocker.http.post(url).then(
            function(response) {
                resolve(response);
            },
            function(eResponse) {
                ezApi.ezclocker.logger.error('Failed to clock employee in: ' + ezApi.ezToJson(eResponse));
                reject(eResponse);
            });
    });
}

/* exported clockEmployeeIn_ISO8601 */
/**
 * @deprecated DO NOT USE, switch to ez-context.js functionality
 *
 * @public
 * Clocks in using an ISO8601 Date format
 *
 * @param urlPrefix
 * @param employer
 * @param employee
 * @param clockInSuccessCallBack
 * @param clockInErrorCallBack
 */
function clockEmployeeIn_ISO8601(urlPrefix, employer, employee, clockInSuccessCallBack, clockInErrorCallBack) {
    ezApi.ezclocker.logger.dev('clockEmployeeIn_ISO8601', 'Use ezApi.ezclocker.ezEmployeeService', 'ezclocker-employee-services.js');
    var url = ezApi.ezclocker.nav.getInternalClassicApiUrl('timeEntry/clockIn/' + employer.id + '/' + employee.id +
        '?clockInISO8601Utc=' +
        ezApi.ezEncode(ezApi.ezclocker.ezDateTime.ezToIsoDateTime(ezApi.ezclocker.ezDateTime.ezNow())) +
        '&timeZoneId=' + ezApi.ezEncode(ezApi.ezclocker.ezDateTime.activeTimeZone));
    ezApi.ezclocker.http.post(url).then(clockInSuccessCallBack, clockInErrorCallBack);
}

/* exported clockEmployeeInGeo_ISO8601 */
/**
 * @deprecated DO NOT USE, switch to ez-context.js functionality
 *
 * @public
 * Clocks in using an ISO8601 Date format and geo location
 *
 * @param urlPrefix
 * @param employer
 * @param employee
 * @param clockInSuccessCallBack
 * @param clockInErrorCallBack
 */
function clockEmployeeInGeo_ISO8601(urlPrefix, employer, employee, position, overrideLocationCheck,
    clockInSuccessCallBack, clockInErrorCallBack) {
    ezApi.ezclocker.logger.dev('clockEmployeeInGeo_ISO8601', 'Use ezApi.ezclocker.ezEmployeeService', 'ezclocker-employee-services.js');
    var url = ezApi.ezclocker.nav.getInternalClassicApiUrl('timeEntry/clockIn/' + employer.id + '/' + employee.id +
        '?clockInISO8601Utc=' + ezApi.ezEncode(ezApi.ezclocker.ezDateTime.ezToIsoDateTime(ezApi.ezclocker.ezDateTime.ezNow())) +
        '&longitude=' + position.coords.longitude +
        '&latitude=' + position.coords.latitude +
        '&accuracy=' + position.coords.Accuracy +
        //"&radius=" + position.coords.radius + (NOT AVAILALBE FROM BROWSER)
        '&overrideLocationCheck=' + overrideLocationCheck +
        '&timeZoneId=' + ezApi.ezEncode(ezApi.ezclocker.ezDateTime.activeTimeZone));
    ezApi.ezclocker.http.post(url).then(
        clockInSuccessCallBack, clockInErrorCallBack);
}

/* exported clockEmployeeOut */
/**
 * @deprecated DO NOT USE, switch to ez-context.js functionality
 *
 * @public
 * Clocks the employee for the employer out
 *
 * @param urlPrefix
 * @param employer
 * @param employee
 *
 * @returns
 */
function clockEmployeeOut(urlPrefix, employer, employee) {
    ezApi.ezclocker.logger.dev('clockEmployeeOut', 'Use ezApi.ezclocker.ezEmployeeService', 'ezclocker-employee-services.js');
    var url = ezApi.ezclocker.nav.getInternalClassicApiUrl('timeEntry/clockOut/' + employer.id + '/' + employee.id +
        '?clockOutDateTime=' + ezApi.ezclocker.ezDateTime.ezToIsoDateTime(ezApi.ezclocker.ezDateTime.ezNow()) +
        '&timeZoneId=' + ezApi.ezclocker.ezDateTime.activeTimeZone);
    return ezApi.ezclocker.http.post(url);
}

/* exported clockEmployeeOut_ISO8601 */
/**
 * @deprecated DO NOT USE, switch to ez-context.js functionality
 *
 * @public
 * Clocks out using the ISO8601 date format
 *
 * @param urlPrefix
 * @param employer
 * @param employee
 *
 * @returns
 */
function clockEmployeeOut_ISO8601(urlPrefix, employer, employee, clockOutSuccessCallBack, clockOutErrorCallBack) {
    ezApi.ezclocker.logger.dev('clockEmployeeOut_ISO8601', 'Use ezApi.ezclocker.ezEmployeeService', 'ezclocker-employee-services.js');
    var url = ezApi.ezclocker.nav.getInternalClassicApiUrl('timeEntry/clockOut/' + employer.id + '/' + employee.id +
        '?clockOutDateTime=' + ezApi.ezclocker.ezDateTime.ezToIsoDateTime(ezApi.ezclocker.ezDateTime.ezNow()) +
        '&timeZoneId=' + ezApi.ezEncode(ezApi.ezclocker.ezDateTime.activeTimeZone));
    ezApi.ezclocker.http.post(url).then(clockOutSuccessCallBack, clockOutErrorCallBack);
}

/* exported clockEmployeeOutGeo_ISO8601 */
/**
 * @deprecated DO NOT USE, switch to ez-context.js functionality
 *
 * @public
 * Clocks out using the ISO8601 date format and geo location
 *
 * @param urlPrefix
 * @param employer
 * @param employee
 *
 * @returns
 */
function clockEmployeeOutGeo_ISO8601(urlPrefix, employer, employee, position, overrideLocationCheck,
    clockOutSuccessCallBack, clockOutErrorCallBack) {
    ezApi.ezclocker.logger.dev('clockEmployeeOutGeo_ISO8601', 'Use ezApi.ezclocker.ezEmployeeService', 'ezclocker-employee-services.js');
    var url = ezApi.ezclocker.nav.getInternalClassicApiUrl('timeEntry/clockOut/' + employer.id + '/' + employee.id +
        '?clockOutDateTime=' + ezApi.ezclocker.ezDateTime.ezToIsoDateTime(ezApi.ezclocker.ezDateTime.ezNow()) +
        '&timeZoneId=' + ezApi.ezEncode(ezApi.ezclocker.ezDateTime.activeTimeZone) +
        '&longitude=' + position.coords.longitude +
        '&latitude=' + position.coords.latitude +
        '&accuracy=' + position.coords.Accuracy +
        //"&radius=" + position.coords.radius + (NOT AVAILALBE FROM BROWSER)
        '&overrideLocationCheck=' + overrideLocationCheck);
    ezApi.ezclocker.http.post(url).then(clockOutSuccessCallBack, clockOutErrorCallBack);
}