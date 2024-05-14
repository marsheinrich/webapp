window.console.warn(
    'DEPRECATED: ezclocker-http.js is deprecated. Please plan to switch to ezclocker-http-helper.js instead.');
// POST FUNCTIONS
//===============
function ezPostJSON(url, payload, success, error, async) {
    try {
        if (async ===undefined) {
            async = true;
        }
        $.ajax({
            type: 'POST',
            url: url,
            data: payload,
            async: async,
            beforeSend: function bedforeSend(jqxhr) {
                addJSONContentTypeAndAcceptHeaders(jqxhr);
            },
            success: success,
            error: error
        });
    } catch (exception) {
        handleHttpException(exception);
    }
}

/**
 * Performs a POST to a service
 * @param postUrl
 * @param postData
 * @param postSuccess
 * @param postError
 */
function ezPostJSON_WithAuth(url, data, postSuccess, postError, employerId, authToken, developerToken) {
    try {
        $.ajax({
            type: 'POST',
            url: url,
            data: data,
            dataType: 'text',
            async: true,
            beforeSend: function bedforeSend(jqxhr) {
                addJSONContentTypeAndAcceptHeaders(jqxhr);
                addAuthHeaders(jqxhr, employerId, authToken, developerToken);
            },
            success: postSuccess,
            error: postError
        });
    } catch (exception) {
        handleHttpException(exception);
    }
}

function ezPost(url, data, postSuccess, postError, async) {
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

function ezPostForm(url, data, postSuccess, postError, async) {
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
                addContentType('application/x-www-form-urlencoded', jqxhr);
            },
            success: postSuccess,
            error: postError
        });
    } catch (exception) {
        reportJavascriptError(exception);
    }
}
var postJSON = ezPost; // patch for old code = this needs to go away

/**
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

// PUT FUNCTIONS
//==============

/**
 * Performs a put to a service - assuming JSON response
 */
function ezPutJSON(url, payload, success, error, async) {
    try {
        if (async ===undefined) {
            async = true;
        }
        $.ajax({
            type: 'PUT',
            url: url,
            data: payload,
            async: async,
            beforeSend: function bedforeSend(jqxhr) {
                addJSONContentTypeAndAcceptHeaders(jqxhr);
            },
            success: success,
            error: error
        });
    } catch (exception) {
        handleHttpException(exception);
    }
}

/**
 * Performs a PUT to a service
 * @param postUrl
 * @param postData
 * @param postSuccess
 * @param postError
 */
function ezPutJSON_WithAuth(url, data, postSuccess, postError, employerId, authToken, developerToken) {
    try {
        $.ajax({
            type: 'PUT',
            url: url,
            data: data,
            dataType: 'text',
            async: true,
            beforeSend: function bedforeSend(jqxhr) {
                addJSONContentTypeAndAcceptHeaders(jqxhr);
                addAuthHeaders(jqxhr, employerId, authToken, developerToken);
            },
            success: postSuccess,
            error: postError
        });
    } catch (exception) {
        handleHttpException(exception);
    }
}

// GET FUNCTIONS
//==============

/**
 * Performs a GET to a service
 */
function ezGet(url, success, error, async) {
    try {
        if (async ===undefined) {
            async = true;
        }
        $.ajax({
            type: 'GET',
            url: url,
            async: async,
            success: success,
            error: error
        });
    } catch (exception) {
        handleHttpException(exception);
    }
}

/**
 * Performs a GET to a service
 */
function ezGETJSON(url, success, error, async) {
    try {
        if (async ===undefined) {
            async = true;
        }
        $.ajax({
            type: 'GET',
            url: url,
            async: async,
            beforeSend: function bedforeSend(jqxhr) {
                addJSONContentTypeAndAcceptHeaders(jqxhr);
            },
            success: success,
            error: error
        });
    } catch (exception) {
        handleHttpException(exception);
    }
}

/**
 * Performs a GET to a service
 */
function ezGetJSON(url, payload, success, error, async) {
    try {
        if (async ===undefined) {
            async = true;
        }
        $.ajax({
            type: 'GET',
            url: url,
            data: payload,
            async: async,
            beforeSend: function bedforeSend(jqxhr) {
                addJSONContentTypeAndAcceptHeaders(jqxhr);
            },
            success: success,
            error: error
        });
    } catch (exception) {
        handleHttpException(exception);
    }
}

/**
 * Performs the GET with authentication
 * @param url
 * @param data
 * @param postSuccess
 * @param postError
 * @param employerId
 * @param authToken
 * @param developerToken
 */
function ezGetJSON_WithAuth(url, data, postSuccess, postError, employerId, authToken, developerToken) {
    try {
        $.ajax({
            type: 'GET',
            url: url,
            data: data,
            dataType: 'text',
            async: true,
            beforeSend: function bedforeSend(jqxhr) {
                addJSONContentTypeAndAcceptHeaders(jqxhr);
                addAuthHeaders(jqxhr, employerId, authToken, developerToken);
            },
            success: postSuccess,
            error: postError
        });
    } catch (exception) {
        handleHttpException(exception);
    }
}

// DELETE FUNCTIONS
//=================

/**
 * Performs a DELETE to a service
 */
function ezDeleteJSON(url, payload, success, error, async) {
    if (async ===undefined) {
        async = true;
    }
    $.ajax({
        type: 'DELETE',
        url: url,
        data: payload,
        async: async,
        beforeSend: function bedforeSend(jqxhr) {
            addJSONContentTypeAndAcceptHeaders(jqxhr);
        },
        success: success,
        error: error
    });
}

// UTILITIES
//==========

function addJSONAcceptHeader(jqXHR) {
    if (jqXHR === undefined) {
        return false;
    }
    jqXHR.setRequestHeader('accept', 'application/json');
}

/**
 * Adds the application/json accept and content-type header
 */
function addJSONContentTypeAndAcceptHeaders(jqXHR) {
    if (jqXHR === undefined) {
        return false;
    }
    jqXHR.setRequestHeader('accept', 'application/json');
    jqXHR.setRequestHeader('content-type', 'application/json');
}

/**
 * Adds the application/json accept header
 * @param jqXHR
 * JQuery Response Object
 * @returns {Boolean}
 */
function addAuthHeaders(jqXHR, employerId, authToken, developerToken) {
    if (jqXHR === undefined) {
        return false;
    }
    jqXHR.setRequestHeader('accept', 'application/json');
    jqXHR.setRequestHeader('content-type', 'application/json');
    if (employerId !== null && employerId.length !== 0) {
        jqXHR.setRequestHeader('x-ezclocker-employerId', employerId);
    }
    if (authToken !== null && authToken.length !== 0) {
        jqXHR.setRequestHeader('x-ezclocker-authToken', authToken);
    }
    if (developerToken !== null && developerToken.length !== 0) {
        jqXHR.setRequestHeader('x-ezclocker-developertoken', developerToken);
    }
}

function handleHttpException(exception) {
    // nothing right now
}

function genericReportError(jqXHR, status, error) {
    alert(error);
}

/**
 * Adds query params to a string url
 * @param url
 * @param queryName
 * @param queryValue
 * @returns
 */
function addQueryParam(url, queryName, queryValue) {
    url += (url.indexOf('?') == -1) ? '?' : '&';
    url += queryName + '=' + queryValue;
    return url;
}