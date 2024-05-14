window.console.error('DEPRECATED DEPENDENCY: /public/javascript/tcs-common.js  !! DO NOT USE !!');
var blockingUserActions = false;

if (!window.window.location.origin) {
    window.window.location.origin = window.location.protocol + '//' + window.location.hostname + (window.location.port ?
        ':' + window.location.port : '');
}

/**
 * Converts the string date into an ISO date
 */
function generateISO8601Date() {
    var stringValue = $('#_DateToFormat').val();
    var dateTime = new Date(stringValue);
    $('#_GenerateISO8601DateResults').html(dateTime.toISOString());
}

/**
 * Returns the current domain + port + ezClocker local
 * debug path (if detected correctly)
 */
function getCurrentDomain() {
    var origin = window.location.origin;
    var pathname = location.pathname;
    var domain = origin;
    if (pathname.indexOf('/ezClockerR1') == 0) { // if true, we are local
        domain += '/ezClockerR1';
    } else if (pathname.indexOf('/ezClockerR2') == 0) { // if true, we are local
        domain += '/ezClockerR2';
    } else if (pathname.indexOf('/ezClocker') == 0) {// if true, we are local
        domain += '/ezClocker';
    }
    return domain;
}

function logPageHit(pageName) {
    getJSON('./special/logPageHit?pageName=' + pageName, '', logIndexPageHandler, logIndexPageHandler, true);
}

function logIndexPageHandler() {
    // do nothing
}

/**
 * Returns the current time zone for the browser
 * Requires jstz-1.0.4.min.js
 * @returns
 */
function getCurrentTimeZone() {
    window.console.warn(
        'Using deprecated tcs-common.js:getCurrentTimeZone. Use ezclocker-dateUtils.js:getCurrentTimeZone instead');
    var tz = jstz.determine(); // Determines the time zone of the browser client
    return tz.name();
}

function selectAll(event) {
    $(this).focus(function () {
        this.select();
    });
}

/**
 * Returns the object code for the clippy flash plugin
 * @returns
 */
function getClippyContent(urlPrefix, value) {
    var result = '<object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" width="24px" height="24px" id="clippy" >';
    result += '<param name="movie" value="' + urlPrefix + 'public/flash/clippy.swf"/>';
    result += '<param name="allowScriptAccess" value="always" />';
    result += '<param name="quality" value="high" />';
    result += '<param name="scale" value="noscale" />';
    result += '<param NAME="FlashVars" value="text=' + value + '">';
    result += '<param name="bgcolor" value="#ffffff">';
    result += '<embed src="' + urlPrefix + 'public/flash/clippy.swf"';
    result += ' width="24px"';
    result += ' height="24px"';
    result += ' name="clippy"';
    result += ' quality="high"';
    result += ' allowScriptAccess="always"';
    result += ' type="application/x-shockwave-flash"';
    result += ' pluginspage="http://www.macromedia.com/go/getflashplayer"';
    result += ' FlashVars="text=' + value + '"';
    result += ' bgcolor="#ffffff"';
    result += '/>';
    result += '</object>';
    return result;
}

/**
 * Returns a date from an ISO8601 String
 * @param isostr
 * @returns
 */
function dateFromISO8601(isostr) {
    var parts = isostr.match(/\d+/g);
    var year = parts[0];
    var month = parts[1];
    var day = parts[2];
    var hour = parts[3];
    var min = parts[4];
    var sec = parts[5];
    return new Date(year, month - 1, day, hour, min, sec);
}

/**
 * Returns a time-zoned date (required timezone-js)
 * @param isostr
 * @returns {Date}
 */
function timeZoneDateFromIso8601(isostr, timezone) {
    var parts = isostr.match(/\d+/g);
    var year = parts[0];
    var month = parts[1];
    var day = parts[2];
    var hour = parts[3];
    var min = parts[4];
    var sec = parts[5];
    var result = new timezoneJS.Date(year, month - 1, day, hour, min, sec, timezone);
    return result;
}

/**
 * If mobile browser, redirect to the passed url
 * @param urlPrefix
 * @param newUrl
 */
function redirectMobile(urlPrefix, newUrl) {
    if (jQuery.browser.mobile) {
        window.location = urlPrefix + newUrl;
        return true;
    }
    return false;
}

/**
 * Determines if the mobile browser is andriod
 * or not.
 * @returns {Boolean}
 */
function isAndriod() {
    if (jQuery.browser.mobile) {
        var ua = navigator.userAgent.toLowerCase();
        var isAndroid = ua.indexOf('android') > -1; //&& ua.indexOf("mobile");
        return isAndroid;
    }
    return false;
}

/**
 *
 * @returns {Boolean}
 */
function isMobileiOS() {
    if (jQuery.browser.mobile) {
        var ua = navigator.userAgent.toLowerCase();
        var isMobileiOSBrowser = ua.indexOf('mac os x') > -1;
        return isMobileiOSBrowser;
    }
    return false;
}

/**
 * Gets the current date as a string
 * @returns {String}
 */
function getCurrentDateString() {
    //TODO: Fix all references to this
    window.console.warn(
        'Using deprecated tcs-common:getCurrentDateString. Please use ezclocker-dateUtils:getCurrentDateString instead.'
    );
    var now = new Date();
    var day = now.getDate();
    if (day.length == 1) {
        day = '0' + day;
    }
    var month = now.getMonth() + 1;
    if (month.length == 1) {
        month = '0' + month;
    }
    var year = now.getFullYear();
    var dateString = month + '/' + day + '/' + year;
    return dateString;
}

/**
 * Sizes a div to the size of the window
 * @param div
 * @param body
 */
function sizeDivToWindow(div, body) {
    if (div === null) {
        return;
    }
    var windowHeight = $(window).height();
    div.height(windowHeight - 40 + 'px');
}

/**
 * Attempts to log the user in with the passed user name and password
 * @param userName
 * @param password
 */
function executeLogin(pathAdjustment, userName, password) {
    var signInForm = '<form id="signInForm" action="' + pathAdjustment + '/resources/j_spring_security_check" method="post">' +
        '<input type="hidden" value="/redirectToDashboard" name="targetUrl"/>' +
        '<input type="text" name="j_username" value="' + userName + '"/>' +
        '<input type="password" name="j_password" value="' + password + '"/></form>';
    $('body').append(signInForm);
    $('form#signInForm').submit();
}

/**
 * Centers a div within its container
 * @param divToCenter
 * @param divContainer
 */
function centerDivWithinDiv(divToCenter, divContainer) {
    var left = $(divContainer).innerWidth() / 2;
    var adjust = $(divToCenter).outerWidth(true) / 2;
    if (adjust > left) {
        $(divToCenter).css('margin-left', 0);
    } else {
        $(divToCenter).css('margin-left', left - adjust);
    }
}

/**
 * Centers a div within its container
 * @param divToCenter
 * @param divContainer
 */
function centerDivInBody(divToCenter) {
    var left = $('body').innerWidth() / 2;
    var adjust = $(divToCenter).outerWidth(true) / 2;
    if (adjust > left) {
        $(divToCenter).css('margin-left', 0);
    } else {
        $(divToCenter).css('margin-left', left - adjust);
    }
}

function horizontalCenterDivWithinDiv(divToCenter, divContainer) {
    var top = $(divContainer).innerHeight() / 2;
    var adjust = $(divToCenter).outerHeight(true) / 2;
    if (adjust > top) {
        $(divToCenter.css('margin-top', 0));
    } else {
        $(divToCenter).css('margin-top', top - adjust);
    }
}

/**
 * Gets the URL param passed
 * @param name
 * @returns
 */
function getURLParameter(name) {
    window.console.warn('DEPRECATED: use exclocker-url-helper2.js:urlHelper.getEmployerIdParam');
    return decodeURI(
        (RegExp(name + '=' + '(.+?)(&|$)').exec(location.search) || [null])[1]
    );
}

/**
 * Returns the email adddress in the param (for auto-filling the email address field)
 * @returns
 */
function getEmailAddressParam() {
    var result = getURLParameter('email');
    if (result == null || result.length == 0) {
        return '';
    }
    return decodeURIComponent(result);
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
function isEmployeeClockedIn(urlPrefix, employer, employee) {
    window.console.warn(
        'Using deprecated tcs-common.js:isEmployeeClockedIn. Use ezclocker-employee-services.js:isEmployeeClockedIn instead.'
    );
    if (employer == null || employee == null) {
        return false;
    }
    var url = getIsClockedInUrl(urlPrefix, employer.id, employee.id);
    var isClockedIn = true;
    postJSON(url, '',
        function (result) {
            //{"errorCode":0,"message":"True","timeEntry":null}
            var isClockedInResult = jQuery.parseJSON(result);
            if (isClockedInResult.message != 'True') {
                isClockedIn = false;
            }
        },
        function () {
            isClockedIn = false;
        },
        false // async
    );
    return isClockedIn;
}

/**
 * Returns a string padding with a zero (if the value is < 10)
 * @param i
 * @returns
 */
function padStringWithZero(i) {
    return (i < 10) ? '0' + i.toString() : '' + i.toString();
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
    var url = getClockInUrl(urlPrefix, employer.id, employee.id);
    var dateTime = new Date();
    var clockInResult = null;
    // "MM/dd/yyyy HH:mm:ss"
    postData = 'clockInDateTime=' +
        padStringWithZero(1 + dateTime.getMonth()) + '/' +
        padStringWithZero(dateTime.getDate()) + '/' +
        dateTime.getFullYear().toString() + ' ' +
        padStringWithZero(dateTime.getHours()) + ':' +
        padStringWithZero(dateTime.getMinutes()) + ':' +
        padStringWithZero(dateTime.getSeconds());
    postJSON(url, postData,
        function (result) {
            clockInResult = jQuery.parseJSON(result);
        },
        function () { },
        false // async
    );
    return clockInResult;
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
    var url = getClockInUrl(urlPrefix, employer.id, employee.id);
    var dateTime = new Date();
    postData = 'clockInISO8601Utc=' + encodeURIComponent(dateTime.toISOString()) + '&timeZoneId=' + encodeURIComponent(
        getCurrentTimeZone());
    postJSON(url, postData, clockInSuccessCallBack, clockInErrorCallBack);
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
    var url = getClockInUrl(urlPrefix, employer.id, employee.id);
    var dateTime = new Date();
    postData = 'clockInISO8601Utc=' + encodeURIComponent(dateTime.toISOString()) +
        '&timeZoneId=' + encodeURIComponent(getCurrentTimeZone()) +
        '&longitude=' + position.coords.longitude +
        '&latitude=' + position.coords.latitude +
        '&accuracy=' + position.coords.Accuracy +
        //"&radius=" + position.coords.radius + (NOT AVAILALBE FROM BROWSER)
        '&overrideLocationCheck=' + overrideLocationCheck;
    postJSON(url, postData, clockInSuccessCallBack, clockInErrorCallBack);
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
    var url = getClockOutUrl(urlPrefix, employer.id, employee.id);
    var dateTime = new Date();
    var clockOutResult = null;
    // "MM/dd/yyyy HH:mm:ss"
    postData = 'clockOutDateTime=' +
        padStringWithZero(1 + dateTime.getMonth()) + '/' +
        padStringWithZero(dateTime.getDate()) + '/' +
        dateTime.getFullYear().toString() + ' ' +
        padStringWithZero(dateTime.getHours()) + ':' +
        padStringWithZero(dateTime.getMinutes()) + ':' +
        padStringWithZero(dateTime.getSeconds());
    postJSON(url, postData,
        function (result) {
            clockOutResult = jQuery.parseJSON(result);
        },
        function () { },
        false // async
    );
    return clockOutResult;
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
    var url = getClockOutUrl(urlPrefix, employer.id, employee.id);
    var dateTime = new Date();
    postData = 'clockOutISO8601Utc=' + encodeURIComponent(dateTime.toISOString()) + '&timeZoneId=' + encodeURIComponent(
        getCurrentTimeZone());
    postJSON(url, postData, clockOutSuccessCallBack, clockOutErrorCallBack);
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
    var url = getClockOutUrl(urlPrefix, employer.id, employee.id);
    var dateTime = new Date();
    postData = 'clockOutISO8601Utc=' + encodeURIComponent(dateTime.toISOString()) +
        '&timeZoneId=' + encodeURIComponent(getCurrentTimeZone()) +
        '&longitude=' + position.coords.longitude +
        '&latitude=' + position.coords.latitude +
        '&accuracy=' + position.coords.Accuracy +
        //"&radius=" + position.coords.radius + (NOT AVAILALBE FROM BROWSER)
        '&overrideLocationCheck=' + overrideLocationCheck;
    postJSON(url, postData, clockOutSuccessCallBack, clockOutErrorCallBack);
}

/**
 * Sizes the "content" window to fill the screen
 * @param headerDiv
 * @param menuDiv
 * @param contentDiv
 * @param footerDiv
 * @param body
 */
function sizeContentToWindow(headerDiv, menuDiv, contentDiv, footerDiv, body) {
    var windowHeight = $(window).height();
    var bodyWidth = $(body).width();

    var nonContentHeight = 0;
    if (headerDiv != null) {
        nonContentHeight += $(headerDiv).outerHeight(true);
    }
    if (menuDiv != null) {
        nonContentHeight += $(menuDiv).outerHeight(true);
    }
    if (footerDiv != null) {
        nonContentHeight += $(footerDiv).outerHeight(true);
    }

    if (headerDiv != null) {
        headerDiv.width(bodyWidth);
    }
    if (contentDiv != null) {
        contentDiv.width(bodyWidth - 10);
        contentDiv.height(windowHeight - (nonContentHeight + 50));
    }
}

/**
 * Sizes content to the window (page doesn't have footer)
 * @param headerDiv
 * @param menuDiv
 * @param contentDiv
 * @param body
 */
function sizeContentToWindowNoFooter(headerDiv, menuDiv, contentDiv, body) {
    var windowHeight = $(window).height();
    var nonContentHeight = $(headerDiv).outerHeight(true) + $(menuDiv).outerHeight(true);
    var bodyWidth = body.outerWidth(false);
    headerDiv.width(bodyWidth);
    contentDiv.width(bodyWidth + 18);
    contentDiv.height(windowHeight - nonContentHeight - 20);
}

function sizeFootertoHeader(body, headerDiv, footerDiv) {
    footerDiv.width(headerDiv.outerWidth(true));
}

/**
 * Loads an image tag from a url
 * @param imgTag
 * @param url
 */
function loadImage(imgTag, url) {
    $(imgTag).attr('src', url);
}

/**
 * Returns the url for the contact us links
 */
function getContactUsLink() {
    $('a#ezclocker_emailUsLink').attr('href', getSendFeedbackLink());
    $('label#ezclocker_copyright').html(getEzClockerCopyright());
}

/**
 * Checks the bounds of a string
 * @deprecated
 * @param o
 * @param n
 * @param min
 * @param max
 * @returns {Boolean}
 */
function checkLength(stringValue, min, max) {
    window.console.warn(
        'DEPRECATED: tcs-common.js:checkLength is deprecreated. Please use ezclocker-validators.js:validateStringLength'
    );
    if (stringValue == undefined) {
        return false;
    }
    if (stringValue.length < max && stringValue.length > min) {
        return true;
    }
    return false;
}

/**
 * Performs the spring logout directly
 * @deprecated
 */
function logout() {
    window.console.error(
        'Using broken tcs-common.js:logout function. Immediate switch to using ezclocker-navigation.js:signOut()');
    signOut(); // attempt to use if by chance the js file was included already
    window.location = '../resources/j_spring_security_logout';
}

/***
 * Performs a form post, interrupting the default behavior
 * @deprecated
 * @param event
 * Actual post form event
 * @param form
 * Form that was submitted
 * @param postSuccess
 * Function to handle post success
 * @param postError
 * Function to handle post failures
 */
function postForm(event, form, postSuccess, postError) {
    try {
        // Stop normal posting...
        event.preventDefault();

        var formData = $(form).serialize();
        var postUrl = $(form).attr('action');
        var method = $(form).attr('method');
        $.ajax({
            type: method,
            url: postUrl,
            dataType: 'text',
            data: formData,
            success: postSuccess,
            error: postError
        });

        return true;
    } catch (exception) {
        reportJavascriptError(exception);
    }
}

/**
 * @deprecated
 * @param {*} form
 * @param {*} postSuccess
 * @param {*} postError
 */
function postDialogForm(form, postSuccess, postError) {
    try {
        var formData = $(form).serialize();
        var postUrl = $(form).attr('action');
        var method = $(form).attr('method');
        $.ajax({
            type: method,
            url: postUrl,
            dataType: 'text',
            data: formData,
            success: postSuccess,
            error: postError
        });

        return true;
    } catch (exception) {
        reportJavascriptError(exception);
    }
}

/***
 * Performs a form post, interrupting the default behavior
 * @deprecated
 * @param event
 * Actual post form event
 * @param form
 * Form that was submitted
 * @param postSuccess
 * Function to handle post success
 * @param postError
 * Function to handle post failures
 */
function postUrlForm(event, form, url, postSuccess, postError) {
    try {
        // Stop normal posting...
        event.preventDefault();

        var formData = $(form).serialize();
        var postUrl = url;
        var method = $(form).attr('method');
        $.ajax({
            type: method,
            url: postUrl,
            dataType: 'text',
            data: formData,
            success: postSuccess,
            error: postError
        });

        return true;
    } catch (exception) {
        reportJavascriptError(exception);
    }
}

/**
 * Performs a post to a service - assuming JSON response
 * NOTE: This function does not have a content-type header!!!!!
 * Use <method>JSON_ContentJSON functions to include the content header!!!
 * @deprecated
 * @param postUrl
 * @param postData
 * @param postSuccess
 * @param postError
 */
function postJSON(url, data, postSuccess, postError, async) {
    try {
        if (async == undefined) {
            async = true;
        }
        $.ajax({
            type: 'POST',
            url: url,
            data: data,
            dataType: 'text',
            async: async,
            beforeSend: function bedforeSend(jqxhr) {
                addJSONAcceptHeader(jqxhr);
            },
            success: postSuccess,
            error: postError
        });
    } catch (exception) {
        reportJavascriptError(exception);
    }
}

/**
 * Performs a POST to a service
 * JSON content
 * JSON Response
 * @deprecated
 * @param postUrl
 * @param postData
 * @param postSuccess
 * @param postError
 */
function postJSON_ContentJSON(url, data, success, error, async) {
    try {
        if (async == undefined) {
            async = true;
        }
        $.ajax({
            type: 'POST',
            url: url,
            data: data,
            dataType: 'text',
            async: async,
            beforeSend: function bedforeSend(jqxhr) {
                addContentTypeAndAcceptHeaders(jqxhr);
            },
            success: success,
            error: error
        });
    } catch (exception) {
        reportJavascriptError(exception);
    }
}

/**
 * Performs a POST to a service - assuming JSON response
 * @deprecated
 * @param {*} url
 * @param {*} data
 * @param {*} success
 * @param {*} error
 * @param {*} async
 */
function postFormUrlEncoded_acceptsJson(url, data, success, error, async) {
    try {
        if (async == undefined) {
            async = true;
        }
        $.ajax({
            type: 'POST',
            url: url,
            data: data,
            dataType: 'text',
            async: async,
            beforeSend: function bedforeSend(jqxhr) {
                addJsonAcceptUrlEncodeContentTypeHeaders(jqxhr);
            },
            success: postSuccess,
            error: postError
        });
    } catch (exception) {
        reportJavascriptError(exception);
    }
}

/**
 * Performs a POST to a service
 * @deprecated
 * @param {*} url
 * @param {*} data
 * @param {*} postSuccess
 * @param {*} postError
 * @param {*} employerId
 * @param {*} authToken
 */
function postJSON_WithAuth(url, data, postSuccess, postError, employerId, authToken) {
    try {
        $.ajax({
            type: 'POST',
            url: url,
            data: data,
            dataType: 'text',
            async: true,
            beforeSend: function bedforeSend(jqxhr) {
                addAuthHeaders(jqxhr, employerId, authToken);
            },
            success: postSuccess,
            error: postError
        });
    } catch (exception) {
        reportJavascriptError(exception);
    }
}

/**
 * Performs a PUT to a service - assuming JSON response
 * NOTE: This function does not have a content-type header!!!!!
 * Use <method>JSON_ContentJSON functions to include the content header!!!
 * @deprecated
 * @param postUrl
 * @param postData
 * @param postSuccess
 * @param postError
 */
function putJSON(url, data, success, error, async) {
    try {
        if (async == undefined) {
            async = true;
        }
        $.ajax({
            type: 'PUT',
            url: url,
            data: data,
            dataType: 'text',
            async: async,
            beforeSend: function bedforeSend(jqxhr) {
                addJSONAcceptHeader(jqxhr);
            },
            success: success,
            error: error
        });
    } catch (exception) {
        reportJavascriptError(exception);
    }
}

/**
 * Performs a PUT to a service
 * JSON content
 * JSON Response
 * @deprecated
 * @param url
 * @param data
 * @param sucess
 * @param error
 */
function putJSON_ContentJSON(url, data, sucess, error) {
    try {
        $.ajax({
            type: 'PUT',
            url: url,
            data: data,
            dataType: 'text',
            async: true,
            beforeSend: function bedforeSend(jqxhr) {
                addContentTypeAndAcceptHeaders(jqxhr);
            },
            success: sucess,
            error: error
        });
    } catch (exception) {
        reportJavascriptError(exception);
    }
}

/**
 * Performs a PUT to a service
 * @deprecated
 * @param url
 * @param data
 * @param postSuccess
 * @param postError
 * @param employerId
 * @param authToken
 */
function putJSON_WithAuth(url, data, postSuccess, postError, employerId, authToken) {
    try {
        $.ajax({
            type: 'PUT',
            url: url,
            data: data,
            dataType: 'text',
            async: true,
            beforeSend: function bedforeSend(jqxhr) {
                addAuthHeaders(jqxhr, employerId, authToken);
            },
            success: postSuccess,
            error: postError
        });
    } catch (exception) {
        reportJavascriptError(exception);
    }
}

/**
 * Performs a DELETE to a service - assuming JSON response
 * NOTE: This function does not have a content-type header!!!!!
 * Use <method>JSON_ContentJSON functions to include the content header!!!
 * @deprecated
 * @param url
 * @param data
 * @param success
 * @param error
 */
function deleteJSON(url, data, success, error, async) {
    try {
        if (async == undefined) {
            async = true;
        }
        $.ajax({
            type: 'DELETE',
            url: url,
            data: data,
            dataType: 'text',
            async: async,
            beforeSend: function bedforeSend(jqxhr) {
                addJSONAcceptHeader(jqxhr);
            },
            success: success,
            error: error
        });
    } catch (exception) {
        reportJavascriptError(exception);
    }
}

/**
 * Performs a DELETE to a service
 * JSON content
 * JSON Response
 * @deprecated
 * @param url
 * @param data
 * @param sucess
 * @param error
 */
function deleteJSON_ContentJSON(url, data, sucess, error) {
    try {
        $.ajax({
            type: 'DELETE',
            url: url,
            data: data,
            dataType: 'text',
            async: true,
            beforeSend: function bedforeSend(jqxhr) {
                addContentTypeAndAcceptHeaders(jqxhr);
            },
            success: sucess,
            error: error
        });
    } catch (exception) {
        reportJavascriptError(exception);
    }
}

/**
 * Performs a DELETE to a service
 * @deprecated
 * @param postUrl
 * @param postData
 * @param postSuccess
 * @param postError
 */
function deleteJSON_WithAuth(url, data, postSuccess, postError, employerId, authToken) {
    try {
        $.ajax({
            type: 'DELETE',
            url: url,
            data: data,
            dataType: 'text',
            async: true,
            beforeSend: function bedforeSend(jqxhr) {
                addAuthHeaders(jqxhr, employerId, authToken);
            },
            success: postSuccess,
            error: postError
        });
    } catch (exception) {
        reportJavascriptError(exception);
    }
}

/**
 * Performs a get to a service - assuming JSON response
 * NOTE: This function does not have a content-type header!!!!!
 * Use <method>JSON_ContentJSON functions to include the content header!!!
 * @deprecated
 * @param postUrl
 * @param postData
 * @param postSuccess
 * @param postError
 */
function getJSON(url, data, successHandler, errorHandler, async) {
    try {
        if (async == undefined) {
            async = true;
        }
        $.ajax({
            type: 'GET',
            data: data,
            url: url,
            dataType: 'text',
            async: async,
            beforeSend: function bedforeSend(jqxhr) {
                addJSONAcceptHeader(jqxhr);
            },
            success: successHandler,
            error: errorHandler
        });
    } catch (exception) {
        reportJavascriptError(exception);
    }
}

// /**
//  * Performs a POST to a service
//  * JSON content
//  * JSON Response
//  * @deprecated
//  * @param {*} url
//  * @param {*} data
//  * @param {*} success
//  * @param {*} error
//  * @param {*} async
//  */
// function postJSON_ContentJSON(url, data, success, error, async) {
//     try {
//         if (async == undefined) {
//             async = true;
//         }
//         $.ajax({
//             type: 'GET',
//             url: url,
//             data: data,
//             dataType: 'text',
//             async: async,
//             beforeSend: function bedforeSend(jqxhr) {
//                 addContentTypeAndAcceptHeaders(jqxhr);
//             },
//             success: success,
//             error: error
//         });
//     } catch (exception) {
//         reportJavascriptError(exception);
//     }
// }

/**
 * Performs a GET to a service
 * JSON content
 * JSON Response
 * @deprecated
 * @param postUrl
 * @param postData
 * @param postSuccess
 * @param postError
 */
function getJSON_ContentJSON(url, data, sucess, error) {
    try {
        $.ajax({
            type: 'PUT',
            url: url,
            data: data,
            dataType: 'text',
            async: true,
            beforeSend: function bedforeSend(jqxhr) {
                addContentTypeAndAcceptHeaders(jqxhr);
            },
            success: sucess,
            error: error
        });
    } catch (exception) {
        reportJavascriptError(exception);
    }
}

/**
 * Performs a get to a service - assuming JSON response
 * @deprecated
 * @param postUrl
 * @param postData
 * @param postSuccess
 * @param postError
 */
function getJSON_WithAuth(url, data, successHandler, errorHandler, employerId, authToken) {
    try {
        $.ajax({
            type: 'GET',
            data: data,
            url: url,
            dataType: 'text',
            async: true,
            beforeSend: function bedforeSend(jqxhr) {
                addAuthHeaders(jqxhr, employerId, authToken);
            },
            success: successHandler,
            error: errorHandler
        });
    } catch (exception) {
        reportJavascriptError(exception);
    }
}

/**
 * Performs a post
 * @deprecated
 * @param postUrl
 * URL to post to
 * @param dataType
 * Type of data expected in result
 * @param data
 * Data to post
 * @param contextType
 * Type of data posting
 * @param postSuccess
 * Function on success
 * @param postError
 * Function on errror
 * @param beforeSend
 * Function before send
 * @returns {Boolean}
 */
function postBody(postUrl, dataType, data, contextType, postSuccess, postError, beforeSend) {
    try {
        $.ajax({
            type: 'POST',
            url: postUrl,
            contexttype: contextType,
            dataType: dataType,
            data: data,
            beforeSend: beforeSend,
            success: postSuccess,
            error: postError
        });
        return true;
    } catch (exception) {
        reportJavascriptError(exception);
    }
}

/**
 * Handles generic post errors
 * @deprecated
 * @param jqXHR
 * @param status
 * @param error
 * @returns {Boolean}
 */
function handlePostError() {
    // do nothing
}

/**
 * Adds the application/json accept header
 * @param jqXHR
 * JQuery Response Object
 * @returns {Boolean}
 */
function addJSONAcceptHeader(jqXHR) {
    if (jqXHR == undefined) {
        return false;
    }

    jqXHR.setRequestHeader('accept', 'application/json');
}

/**
 * Adds headers
 * @deprecated
 * @param jqXHR
 * @returns {Boolean}
 */
function addJsonAcceptUrlEncodeContentTypeHeaders(jqXHR) {
    if (jqXHR == undefined) {
        return false;
    }

    jqXHR.setRequestHeader('accept', 'application/json');
    jqXHR.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
}

/**
 * Adds the application/json accept and content-type header
 * @deprecated
 * @param jqXHR
 * @returns {Boolean}
 */
function addContentTypeAndAcceptHeaders(jqXHR) {
    if (jqXHR == undefined) {
        return false;
    }

    jqXHR.setRequestHeader('accept', 'application/json');
    jqXHR.setRequestHeader('content-type', 'application/json');
}

/**
 * Adds the application/json accept header
 * @deprecated
 * @param jqXHR
 * JQuery Response Object
 * @returns {Boolean}
 */
function addAuthHeaders(jqXHR, employerId, authToken) {
    if (jqXHR == undefined) {
        return false;
    }
    jqXHR.setRequestHeader('accept', 'application/json');
    jqXHR.setRequestHeader('content-type', 'application/json');
    jqXHR.setRequestHeader('employerId', employerId);
    jqXHR.setRequestHeader('authToken', authToken);
    jqXHR.setRequestHeader('x-ezclocker-employerId', employerId);
    jqXHR.setRequestHeader('x-ezclocker-authToken', authToken);
}

/**
 * Makes sure a possible string value is returned instead of null or undefined
 * @deprecated
 * @param value
 * @returns
 */
function validString(value) {
    if (value == null) {
        return '';
    }
    return value;
}

/**
 * @deprecated
 * @param {*} internalDiv
 * @param {*} dialogId
 */
function createDialog(internalDiv, dialogId) {
    var dialogHtml = '<div class="dialog" id="' + dialogId + '">';

    $(document).showDialog(dialogHtml, internalDiv);
}

/**
 * @deprecated
 */
function returnToIndex() {
    window.location = '../index.html';
}

/**
 * Post a file upload form
 * @deprecated
 * @param url
 * @param data
 * @param successHandler
 * @param errorHandler
 * @returns {Boolean}
 */
function postFileUpload(url, formData, successHandler, errorHandler, uploadProgress) {
    var request = new XMLHttpRequest();
    request.upload.addEventListener('progress', uploadProgress, false);
    request.addEventListener('load', successHandler, false);
    request.addEventListener('error', errorHandler, false);
    request.addEventListener('abort', errorHandler, false);
    request.open('POST', url);
    request.send(formData);
}
/**
 * @deprecated
 * @param {*} pathAdjustment
 * @param {*} errorCode
 * @param {*} defaultErrorMessage
 * @param {*} employerId
 */
function handleEmployerErrorCodeReturn(pathAdjustment, errorCode, defaultErrorMessage, employerId) {
    if (errorCode == 0) {
        return false;
    }
    if (errorCode == 403) { // invalid license,
        window.location = pathAdjustment + '/secure/account.html?employer=' + employerId + '&expired=1';
        return true;
    }
    window.alert(defaultErrorMessage);
}

/**
 * Returns the version of Internet Explorer or a -1
 * @deprecated
 */
function getInternetExplorerVersion() {
    var rv = -1; // Return value assumes failure.
    if (navigator.appName == 'Microsoft Internet Explorer') {
        var ua = navigator.userAgent;
        var re = new RegExp('MSIE ([0-9]{1,}[.0-9]{0,})');
        if (re.exec(ua) != null) {
            rv = parseFloat(RegExp.$1);
        }
    }
    return rv;
}

/**
 * Handles success responses that we just want to ignore
 * @deprecated
 */
function ignoreSuccess() {
    // do nothing
}

/**
 * Handles error responses that we just want to ignore
 * @deprecated
 */
function ignoreError() {
    // do nothing
}

/**
 * Displays unhandled exception will processing services
 * @deprecated
 * @param exception
 */
function reportJavascriptError(exception) {
    window.alert('Unexpected error: ' + exception);
}
