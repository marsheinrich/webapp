/*==============================*/
/**** DEPRECATED: DO NOT USE ****/
/*==============================*/

/* exported getQuickBooksConnectUrlForGetAllEmployees */
/**
 * Returns the url for conecting to quick books
 * @param urlPrefix
 * @param employerId
 * @returns {String}
 * @deprecated DO NOT USE
 */
function getQuickBooksConnectUrlForGetAllEmployees(urlPrefix, employerId) {
    var data = 'employerId=' + encodeURIComponent(employerId) + '&requestType=getAllEmployees';
    return urlPrefix + '/RequestToken' + '?' + data;
}

/* exported queryEmployeeTimeEntries */
/**
 * @deprecated DO NOT USE
 */
function queryEmployeeTimeEntries(urlPrefix, employerId, employeeId) {
    return urlPrefix + '_timeEntry/getPeriod/' + employerId + '/' + employeeId;
}

/* exported queryPreviousPeriod */
/**
 * @deprecated DO NOT USE
 */
function queryPreviousPeriod(urlPrefix, employerId, employeeId) {
    return urlPrefix + '_timeEntry/getPreviousPeriod/' + employerId + '/' + employeeId;
}