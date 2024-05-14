window.console.warn('DEPREACATED: dashboard.js is going away, please move to other libraries.');
/**
 * Navigates to the dashboard screen
 */
function navigateToDashboard() {
    window.location.assign('./employerDashboard.html');
}

function sizeDivHeightToWindow(div, body) {
    var windowHeight = $(window).height();
    var margin = parseInt($(body).css('margin-bottom')) + parseInt($(body).css('margin-top'));
    div.height(windowHeight - margin);
}

function sizeBodyToWindow(body) {
    var windowHeight = $(window).height();
    var margin = parseInt($(body).css('margin-bottom')) + parseInt($(body).css('margin-top'));
    body.height(windowHeight - margin);
}
var accountService = '../_account';
var _EmployerServiceURI = '../_employer';
var employeeService = '../_employee';
var timeEntryService = '../_timeEntry';
var subscriptionService = '../_subscriptionPlan';
/**
 * Gets the logged in users's associated employers
 * @param successHandler
 * @param errorHandler
 */
function getActiveEmployers(successHandler, errorHandler) {
    postJSON(_EmployerServiceURI + '/active', '', successHandler, errorHandler);
}

/* exported getSubscriptionPlans */
/**
 * @deprecated DO NOT USE
 *
 * @public
 * Gets all the active subscription plans
 */
function getSubscriptionPlans(successHandler, errorHandler) {
    var serviceUrl = subscriptionService + '/active';
    postJSON(serviceUrl, '', successHandler, errorHandler);
}
/**
 * Performs a quick subscribe action
 * @param employerId
 * @param subscriptionId
 * @param successHandler
 * @param errorHandler
 */
function quickSubscribeToPlan(employerId, subscriptionId, successHandler, errorHandler) {
    var serviceUrl = subscriptionService + '/quickSubscribe/' + employerId + '/' + subscriptionId;
    postJSON(serviceUrl, '', successHandler, errorHandler);
}
/**
 * Gets billing information for the employer
 * @param employerId
 * @param successHandler
 * @param errorHandler
 */
function getBillingAddress(employerId, successHandler, errorHandler) {
    var serviceUrl = subscriptionService + '/getBillingAddress/' + employerId;
    postJSON(serviceUrl, '', successHandler, errorHandler);
}
/**
 * Gets the credit card information for the employer
 * @param employerId
 * @param successHandler
 * @param errorHandler
 */
function getCreditCardInfoAddress(employerId, successHandler, errorHandler) {
    var serviceUrl = subscriptionService + '/getCreditCardInfo/' + employerId;
    postJSON(serviceUrl, '', successHandler, errorHandler);
}
/**
 * Gets all the billing information for the employer (address + credit card)
 * @param employerId
 * @param successHandler
 * @param errorHandler
 */
function getBillingInformation(employerId, successHandler, errorHandler) {
    var serviceUrl = subscriptionService + '/getBillingInformation/' + employerId;
    postJSON(serviceUrl, '', successHandler, errorHandler);
}
/**
 * Performs a quick subscribe action
 * @param employerId
 * @param subscriptionId
 * @param successHandler
 * @param errorHandler
 */
function changeSubscriptionPlan(employerId, subscriptionId, successHandler, errorHandler) {
    var serviceUrl = subscriptionService + '/change/' + employerId + '/' + subscriptionId;
    postJSON(serviceUrl, '', successHandler, errorHandler);
}
/**
 * Gets the current subscription plan
 * @param employerId
 * @param successHandler
 * @param errorHandler
 */
function getActiveSubscriptionPlanForEmployer(employerId, successHandler, errorHandler) {
    var serviceUrl = subscriptionService + '/current/' + employerId;
    postJSON(serviceUrl, '', successHandler, errorHandler);
}
/**
 * Gets the employer image
 * @param employerId
 * @param postSuccess
 * @param postError
 */
var loadingImageTag;
var loadingImageEmployerId;

function loadEmployerImage(employerId, imageTag) {
    //TODO: Fix all reference to this
    window.console.warn(
        'Using deprecreated dasjboard.js:loadEmployerImage. Please use ezclocker-employer-services:loadEmployerImage instead'
    );
    if (employerId === undefined || employerId === null) {
        var imageUrl = getPublicImage('dallas.png');
        $(imageTag).attr('src', imageUrl);
        return;
    }
    loadingImageTag = imageTag;
    loadingImageEmployerId = employerId;
    var existsUrl = _EmployerServiceURI + '/logo/exists/' + employerId;
    postJSON(existsUrl, '', employerLogoSuccess, employerLogoError);
}

function employerLogoSuccess(result, statusCode, jqXHR) {
    $(loadingImageTag).attr('class', 'employerImage');
    var logoExistsResult = JSON.parseJSON(result);
    var imageUrl;
    if (logoExistsResult.message == 'False') {
        imageUrl = getPublicImage('dallas.png');
        $(loadingImageTag).attr('src', imageUrl);
        return;
    }
    imageUrl = _EmployerServiceURI + '/logo/download/' + loadingImageEmployerId;
    $(loadingImageTag).attr('src', imageUrl);
}

function employerLogoError(jqXHR, status, error) {
    var imageUrl = getPublicImage('dallas.png');
    $(loadingImageTag).attr('src', imageUrl);
}
/**
 * Loads an user image icon
 * @param employerId
 * @param postSuccess
 * @param postError
 */
var loadingUserImageTag;
var loadingUserImageUserId;

function loadUserImage(userId, imageTag) {
    loadingUserImageTag = imageTag;
    loadingUserImageUserId = userId;
    var existsUrl = accountService + '/picture/exists/' + userId;
    postJSON(existsUrl, '', userImageSuccess, userImageError);
}

function userImageSuccess(result, statusCode, jqXHR) {
    var logoExistsResult = JSON.parseJSON(result);
    var imageUrl;
    if (logoExistsResult.message == 'False') {
        imageUrl = '../public/images/noimage.png';
        $(loadingUserImageTag).attr('src', imageUrl);
        return;
    }
    imageUrl = accountService + '/picture/download/' + userId;
    $(loadingUserImageTag).attr('src', imageUrl);
}

function userImageError(jqXHR, status, error) {
    var imageUrl = '../public/images/noimage.png';
    $(loadingUserImageTag).attr('src', imageUrl);
}
/**
 * Gets the employer information
 * @param successHandler
 * @param errorHandler
 */
function getEmployerInformation(employerId, successHandler, errorHandler) {
    var serviceUrl = _EmployerServiceURI + '/get/' + employerId;
    postJSON(serviceUrl, '', successHandler, errorHandler);
}

/* exported getEmployees */
/**
 * @deprecated DO NOT USE, Switch to ez-context.js
 *
 * @public
 * Gets the employer's employee information
 *
 * @param employeeCombo
 */
function getEmployees(employerId, successHandler, errorHandler) {
    var serviceUrl = employeeService + '/getEmployees/' + employerId;
    postJSON(serviceUrl, '', successHandler, errorHandler);
}
/**
 * Returns the current user
 * @param successHandler
 * @param errorHandler
 */
function getCurrentUser(successHandler, errorHandler) {
    postJSON(accountService + '/currentUser', '', successHandler, errorHandler);
}

/* exported getEmployeeData */
/**
 * @deprecated DO NOT USE, switch to ez-context.js functionality
 *
 * @public *
 * Gets a specific employee's data
 *
 * @param employeeId
 * @param successHandler
 * @param errorHandler
 */
function getEmployeeData(employerId, employeeId, successHandler, errorHandler) {
    var serviceUrl = employeeService + '/get/' + employerId + '/' + employeeId;
    postJSON(serviceUrl, '', successHandler, errorHandler);
}

/* exported getEmployeeInformation */
/**
 * @deprecated DO NOT USE, switch to ez-context.js functionality
 *
 * @public
 * Gets all the employer information for the logged in user
 *
 * @param userId
 * @param successHandler
 * @param errorHandler
 */
function getEmployeeInformation(successHandler, errorHandler) {
    postJSON(employeeService + '/getEmployeeInfo', '', successHandler, errorHandler);
}
/**
 * Gets specific employee data as CSV
 * @param employeeId
 * @returns {String}
 */
function getEmployeeDataCSVUrl(employeeId) {
    return timeEntryService + '/getAllCSV/' + employeeId;
}
/**
 * Gets a specific employee's time data
 * @param employeeId
 * @param successHandler
 * @param errorHandler
 */
function getEmployeeTimeData(employerId, employeeId, successHandler, errorHandler) {
    var serviceUrl = timeEntryService + '/getAllPeriods/' + employerId + '/' + employeeId;
    postJSON(serviceUrl, '', successHandler, errorHandler);
}
/**
 * Returns time entries for the passed period
 * @param startDate
 * @param endDate
 * @param employerId
 * @param employeeId
 * @param successHandler
 * @param errorHandler
 */
function getEmployeeTimeDataForPeriod(startDate, endDate, employerId, employeeId, successHandler, errorHandler) {
    var serviceUrl = timeEntryService + '/getPeriodTimeEntries/' + employerId + '/' + employeeId;
    postJSON(serviceUrl, '', successHandler, errorHandler);
}
/**
 * Returns the current two-week period
 * @param employerId
 * @param employeeId
 * @param successHandler
 * @param errorHandler
 */
function getCurrentTwoWeeks(employerId, employeeId, successHandler, errorHandler) {
    var serviceUrl = timeEntryService + '/getCurrentPeriod/' + employerId + '/' + employeeId;
    postJSON(serviceUrl, '', successHandler, errorHandler);
}
/**
 * Logs out of the system
 */
function logoutService() {
    postJSON(baseUrl + _EmployerServiceURI + '/resources/j_spring_security_logout', doNotCareSuccess, doNotCareError);
}
/**
 * Handler for responses we do not care about
 */
function doNotCareSuccess() {
    // do nothing
}
/**
 * Handler for response errors we do not care about
 */
function doNotCareError() {
    // do nothing
}

function navigateToIndex() {
    window.location.assign('../logout');
}

function navigateToSignup() {
    window.location.assign('../public/signup.html');
}

/* exported getHintImage */
/**
 * @deprecated DO NOT USE
 *
 * @public
 * Returns the image that should be used on left of edit button
 *
 * @returns {String}
 */
function getHintImage(timeEntry) {
    var clockInTimeEntry = new dateFromISO8601(timeEntry.clockInIso8601);
    var clockOutTimeEntry = new dateFromISO8601(timeEntry.clockOutIso8601);
    var clockInValue = clockInTimeEntry.toString('MM/dd/yyyy hh:mm tt');
    var clockOutValue = clockOutTimeEntry.toString('MM/dd/yyyy hh:mm tt');
    if (clockInValue == clockOutValue) {
        return '<img id="hintImage_' + timeEntry.id +
            '" class="hintImage" title="Not Complete" alt="Not Complete" src="../public/images/error.ico"/>';
    }
    var totalHours = timeEntry.totalHours;
    if (totalHours > 8) {
        return '<img id="hintImage_' + timeEntry.id +
            '" class="hintImage" title="Exceeds Eight Hours" alt="Time Exceeds Eight Hours" src="../public/images/warning.ico"/>';
    }
    return '<img id="hintImage_' + timeEntry.id + '" class="hintImage" src="../public/images/good.ico"/>';
}

/* exported getRowCSSClass */
/**
 * @deprecated DO NOT USE
 *
 * @public
 * Returns the class to use for the row
 *
 * @returns {String}
 */
function getRowCSSClass(timeEntry) {
    var clockInTimeEntry = new dateFromISO8601(timeEntry.clockInIso8601);
    var clockOutTimeEntry = new dateFromISO8601(timeEntry.clockOutIso8601);
    var clockInValue = clockInTimeEntry.toString('MM/dd/yyyy hh:mm tt');
    var clockOutValue = clockOutTimeEntry.toString('MM/dd/yyyy hh:mm tt');
    if (clockInValue == clockOutValue) {
        return 'errorMissingClockOut';
    }
    var totalHours = timeEntry.totalHours;
    if (totalHours > 8) {
        return 'errorTotalHours';
    }
    return 'data';
}

function getNotesCSSClass(rowCssClass) {
    if (rowCssClass == 'errorMissingClockOut') {
        return 'notesErrorMissingClockOut';
    } else if (rowCssClass == 'errorTotalHours') {
        return 'notesErrorTotalHours';
    }
    return 'notes';
}
