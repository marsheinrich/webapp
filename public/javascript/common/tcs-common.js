window.console.error('DEPRECATED DEPENDENCY: /public/javascript/common/tcs-common.js  !! DO NOT USE !!');
var blockingUserActions = false;

if (!window.window.location.origin) {
    window.window.location.origin = window.location.protocol + '//' + window.location.hostname + (window.location.port ?
        ':' + window.location.port : '');
}

/**
 * @deprecated
 * Converts the string date into an ISO date
 */
function generateISO8601Date() {
    var stringValue = $('#_DateToFormat').val();
    var dateTime = new Date(stringValue);
    $('#_GenerateISO8601DateResults').html(dateTime.toISOString());
}

/**
 * @deprecated
 * Returns the current domain + port + ezClocker local
 * debug path (if detected correctly)
 */
function getCurrentDomain() {
    var origin = window.location.origin;
    var pathname = location.pathname;
    var domain = origin;
    if (pathname.indexOf('/ezClockerR1') === 0) {
        // if true, we are local
        domain += '/ezClockerR1';
    } else if (pathname.indexOf('/ezClockerR2') === 0) {
        // if true, we are local
        domain += '/ezClockerR2';
    } else if (pathname.indexOf('/ezClocker') === 0) {
        // if true, we are local
        domain += '/ezClocker';
    }
    return domain;
}

/**
 * @deprecated
 * @param {*} pageName
 */
function logPageHit(pageName) {
    getJSON('./special/logPageHit?pageName=' + pageName, '', logIndexPageHandler, logIndexPageHandler, true);
}

/**
 * @deprecated
 */
function logIndexPageHandler() {
    // do nothing
}

/**
 * @deprecated
 * Returns the current time zone for the browser
 * Requires jstz-1.0.4.min.js
 * @returns
 */
function getCurrentTimeZone() {
    ezApi.p.logger.warn(
        'Using deprecated tcs-common.js:getCurrentTimeZone. Use ezclocker-dateUtils.js:getCurrentTimeZone instead');
    var tz = jstz.determine(); // Determines the time zone of the browser client
    return tz.name();
}

/**
 * @deprecated
 * @param {*} event
 */
function selectAll(event) {
    $(this).focus(function() {
        this.select();
    });
}

/**
 * @deprecated
 * Returns the object code for the clippy flash plugin
 * @returns
 */
function getClippyContent(urlPrefix, value) {
    var result =
        '<object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" width="24px" height="24px" id="clippy" >';
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
 * @deprecated
 * Returns a date from an ISO8601 String
 * @param isostr
 * @returns
 */
function dateFromISO8601(isostr) {
    //TODO: Fix all referneces to this
    ezApi.p.logger.warn(
        'Using deprecated tcs-common.js:dateFromISO8601. Use ezclocker-dateUtils.js:dateFromISO8601 instead');
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
 * @deprecated
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
 * @deprecated
 * If mobile browser, redirect to the passed url
 * @param urlPrefix
 * @param newUrl
 */
function redirectMobile(urlPrefix, newUrl) {
    if (jQuery.browser.mobile) {
        var url = urlPrefix + newUrl;
        window.location.assign(url);
        return true;
    }
    return false;
}

/**
 * @deprecated
 * Determines if the mobile browser is andriod
 * or not.
 * @returns {Boolean}
 */
function isAndriod() {
    if (jQuery.browser.mobile) {
        var ua = navigator.userAgent.toLowerCase();
        var isAndroidBrowser = ua.indexOf('android') > -1; //&& ua.indexOf("mobile");
        return isAndroidBrowser;
    }
    return false;
}

/**
 * @deprecated
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
 * @deprecated
 * Gets the current date as a string
 * @returns {String}
 */
function getCurrentDateString() {
    var now = new Date();
    var day = now.getDay();
    if (day < 10) {
        day = '0' + day;
    }
    var month = now.getMonth() + 1;
    if (month < 10) {
        month = '0' + month;
    }
    var year = now.getFullYear();
    var dateString = month + '/' + day + '/' + year;
    return dateString;
}

/**
 * @deprecated
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
 * @deprecated
 * Attempts to log the user in with the passed user name and password
 * @param userName
 * @param password
 */
function executeLogin(pathAdjustment, userName, password) {
    //TODO: Cleanup uses
    //DEPRECATED: Use ezclocker-accounts.js:executeLogin() instead
    ezApi.p.logger.warn(
        'Using deprecated tcs-common.js:executeLogin() method. Use ezclocker-accounts.js:signIn() instead.');
    var signInForm = '<form id="signInForm" action="' + pathAdjustment +
        '/resources/j_spring_security_check" method="post">' +
        '<input type="text" name="j_username" value="' + userName + '"/>' +
        '<input type="password" name="j_password" value="' + password + '"/></form>';
    $('body').append(signInForm);
    $('form#signInForm').submit();
}

/**
 * @deprecated
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
 * @deprecated
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

/**
 * @deprecated
 * @param {*} divToCenter
 * @param {*} divContainer
 */
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
 * @deprecated
 * Gets the URL param passed
 * @param name
 * @returns
 */
function getURLParameter(name) {
    return decodeURI((RegExp(name + '=' + '(.+?)(&|$)').exec(location.search) || [null, null])[1]);
}

/**
 * @deprecated
 * Returns the email adddress in the param (for auto-filling the email address field)
 * @returns
 */
function getEmailAddressParam() {
    var result = getURLParameter('email');
    if (result === null || result.length === 0) {
        return '';
    }
    return decodeURIComponent(result);
}

/**
 * @deprecated
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
        function(result, statusCode, jqXHR) {
            clockInResult = jQuery.parseJSON(result);
        },
        function(jqXHR, status, error) {},
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
        function(result, statusCode, jqXHR) {
            clockOutResult = jQuery.parseJSON(result);
        },
        function(jqXHR, status, error) {},
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
 * @deprecated
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
    if (headerDiv !== null) {
        nonContentHeight += $(headerDiv).outerHeight(true);
    }
    if (menuDiv !== null) {
        nonContentHeight += $(menuDiv).outerHeight(true);
    }
    if (footerDiv !== null) {
        nonContentHeight += $(footerDiv).outerHeight(true);
    }

    if (headerDiv !== null) {
        headerDiv.width(bodyWidth);
    }
    if (contentDiv !== null) {
        contentDiv.width(bodyWidth - 10);
        contentDiv.height(windowHeight - (nonContentHeight + 50));
    }
}

/**
 * @deprecated
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

/**
 * @deprecated
 * @param {*} body
 * @param {*} headerDiv
 * @param {*} footerDiv
 */
function sizeFootertoHeader(body, headerDiv, footerDiv) {
    footerDiv.width(headerDiv.outerWidth(true));
}

/**
 * @deprecated
 * Loads an image tag from a url
 * @param imgTag
 * @param url
 */
function loadImage(imgTag, url) {
    $(imgTag).attr('src', url);
}

/**
 * @deprecated
 * Returns the url for the contact us links
 */
function getContactUsLink() {
    $('a#ezclocker_emailUsLink').attr('href', getSendFeedbackLink());
    $('label#ezclocker_copyright').html(getEzClockerCopyright());
}

/**
 * @deprecated
 * Checks the bounds of a string
 * @param o
 * @param n
 * @param min
 * @param max
 * @returns {Boolean}
 */
function checkLength(stringValue, min, max) {
    //TODO: Deprecrated
    ezApi.p.logger.warn(
        'DEPRECATED: tcs-common.js:checkLength is deprecreated. Please use ezclocker-validators.js:validateStringLength'
    );
    if (stringValue === undefined) {
        return false;
    }
    if (stringValue.length < max && stringValue.length > min) {
        return true;
    }
    return false;
}

/**
 * @deprecated
 * Performs the spring logout directly
 */
function logout() {
    window.location.assign('../resources/j_spring_security_logout');
}

/***
 * @deprecated
 * Performs a form post, interrupting the default behavior
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
 * @deprecated
 * Performs a form post, interrupting the default behavior
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
 * @deprecated
 * Performs a post to a service - assuming JSON response
 * NOTE: This function does not have a content-type header!!!!!
 * Use <method>JSON_ContentJSON functions to include the content header!!!
 * @param postUrl
 * @param postData
 * @param postSuccess
 * @param postError
 */
function postJSON(url, data, postSuccess, postError, async) {
    try {
        if (async ===undefined) {
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
 * @deprecated
 * Performs a POST to a service
 * JSON content
 * JSON Response
 * @param postUrl
 * @param postData
 * @param postSuccess
 * @param postError
 */
function postJSON_ContentJSON(url, data, success, error, async) {
    try {
        if (async ===undefined) {
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
 * @deprecated
 * Performs a POST to a service - assuming JSON response
 * @param postUrl
 * @param postData
 * @param postSuccess
 * @param postError
 */
function postFormUrlEncoded_acceptsJson(url, data, success, error, async) {
    try {
        if (async ===undefined) {
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
 * @deprecated
 * Performs a POST to a service
 * @param postUrl
 * @param postData
 * @param postSuccess
 * @param postError
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
 * @deprecated
 * Performs a PUT to a service - assuming JSON response
 * NOTE: This function does not have a content-type header!!!!!
 * Use <method>JSON_ContentJSON functions to include the content header!!!
 * @param postUrl
 * @param postData
 * @param postSuccess
 * @param postError
 */
function putJSON(url, data, success, error, async) {
    try {
        if (async ===undefined) {
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
 * @deprecated
 * Performs a PUT to a service
 * JSON content
 * JSON Response
 * @param postUrl
 * @param postData
 * @param postSuccess
 * @param postError
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
 * @deprecated
 * Performs a PUT to a service
 * @param postUrl
 * @param postData
 * @param postSuccess
 * @param postError
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
 * @deprecated
 * Performs a DELETE to a service - assuming JSON response
 * NOTE: This function does not have a content-type header!!!!!
 * Use <method>JSON_ContentJSON functions to include the content header!!!
 * @param url
 * @param data
 * @param success
 * @param error
 */
function deleteJSON(url, data, success, error, async) {
    try {
        if (async ===undefined) {
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
 * @deprecated
 * Performs a DELETE to a service
 * JSON content
 * JSON Response
 * @param postUrl
 * @param postData
 * @param postSuccess
 * @param postError
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
 * @deprecated
 * Performs a DELETE to a service
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
 * @deprecated
 * Performs a get to a service - assuming JSON response
 * NOTE: This function does not have a content-type header!!!!!
 * Use <method>JSON_ContentJSON functions to include the content header!!!
 * @param postUrl
 * @param postData
 * @param postSuccess
 * @param postError
 */
function getJSON(url, data, successHandler, errorHandler, async) {
    try {
        if (async ===undefined) {
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

/**
 * @deprecated
 * Performs a POST to a service
 * JSON content
 * JSON Response
 * @param postUrl
 * @param postData
 * @param postSuccess
 * @param postError
 */
function getJSON_ContentJSON(url, data, success, error, async) {
    try {
        if (async ===undefined) {
            async = true;
        }
        $.ajax({
            type: 'GET',
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
 * @deprecated
 * Performs a get to a service - assuming JSON response
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
 * @deprecated
 * Performs a post
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
 * @deprecated
 * Handles generic post errors
 */
function handlePostError() {
    // Ignore ALL errors

    //if (jqXHR == undefined) {
    //	alert("Unable to execute test: Possible script errors");
    //	return false;
    //}

    //alert("Error running tests: " + error.toString());
    //return true;
}

/**
 * @deprecated
 * Adds the application/json accept header
 * @param jqXHR
 * JQuery Response Object
 * @returns {Boolean}
 */
function addJSONAcceptHeader(jqXHR) {
    if (jqXHR === undefined) {
        return false;
    }

    jqXHR.setRequestHeader('accept', 'application/json');
}

/**
 * @deprecated
 * Adds headers
 * @param jqXHR
 * @returns {Boolean}
 */
function addJsonAcceptUrlEncodeContentTypeHeaders(jqXHR) {
    if (jqXHR === undefined) {
        return false;
    }

    jqXHR.setRequestHeader('accept', 'application/json');
    jqXHR.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
}

/**
 * @deprecated
 * Adds the application/json accept and content-type header
 * @param jqXHR
 * @returns {Boolean}
 */
function addContentTypeAndAcceptHeaders(jqXHR) {
    if (jqXHR === undefined) {
        return false;
    }

    jqXHR.setRequestHeader('accept', 'application/json');
    jqXHR.setRequestHeader('content-type', 'application/json');
}

/**
 * @deprecated
 * Adds the application/json accept header
 * @param jqXHR
 * JQuery Response Object
 * @returns {Boolean}
 */
function addAuthHeaders(jqXHR, employerId, authToken) {
    if (jqXHR === undefined) {
        return false;
    }
    jqXHR.setRequestHeader('accept', 'application/json');
    jqXHR.setRequestHeader('content-type', 'application/json');
    jqXHR.setRequestHeader('employerId', employerId);
    jqXHR.setRequestHeader('authToken', authToken);
}

/**
 * @deprecated
 * Makes sure a possible string value is returned instead of null or undefined
 * @param value
 * @returns
 */
function validString(value) {
    if (value === null) {
        return '';
    }
    if (value === undefined) {
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
    window.location.assign('../index.html');
}

/**
 * @deprecated
 * Post a file upload form
 * @param url
 * @param data
 * @param successHandler
 * @param errorHandler
 * @returns {Boolean}
 */
function postFileUpload(url, formData, successHandler, errorHandler, uploadProgress) {
    var request = new XMLHttpRequest();
    request.addEventListener('progress', uploadProgress, false);
    request.addEventListener('load', successHandler, false);
    request.addEventListener('error', errorHandler, false);
    request.addEventListener('abort', errorHandler, false);
    request.open('POST', url);
    request.send(formData);
}

/**
 * @deprecated
 * Returns the version of Internet Explorer or a -1
 */
function getInternetExplorerVersion() {
    var rv = -1; // Return value assumes failure.
    if (navigator.appName == 'Microsoft Internet Explorer') {
        var ua = navigator.userAgent;
        var re = new RegExp('MSIE ([0-9]{1,}[.0-9]{0,})');
        if (re.exec(ua) !== null) {
            rv = parseFloat(RegExp.$1);
        }
    }
    return rv;
}

/**
 * @deprecated
 * Handles success responses that we just want to ignore
 * @param result
 * @param statusCode
 * @param jqXHR
 */
function ignoreSuccess(result, statusCode, jqXHR) {
    // do nothing
}

/**
 * @deprecated
 * Handles error responses that we just want to ignore
 * @param jqXHR
 * @param status
 * @param error
 */
function ignoreError(jqXHR, status, error) {
    // do nothing
}

/**
 * @deprecated
 * Displays unhandled exception will processing services
 * @param exception
 */
function reportJavascriptError(exception) {
    ezApi.p.logger.log(exception);
}