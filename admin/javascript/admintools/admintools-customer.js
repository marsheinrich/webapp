/**
 * Wraps service calls to the /_api/v1/users api
 * 
 * Additional Dependencies
 * public/javascript/common/ezclocker-http-helper.js
 * public/javascript/common/ezclocker-validators.js
 * public/javascript/common/ezclocker-navigation.js
 */

var adminCustomerInfo = {
    getUserAccountInformation : function (email, success, failure) {
        if (isBadReference(email)) {
            if (!isBadReference(failure)) {
                failure('{"message":"Email is required.","errorCode":"400"}');
            }
            return;
        }
        if (isBadReference(success)) {
            return;
        } // nothing to do
        var userAccountInformation = {
            users:undefined,
            authorities:undefined,
            employerAccounts:[],
            employeeAccounts:[]			
        };
        getUsers(email, function(response, jqXHR) {
            userAccountInformation.users = response;
            if (isBadReference(userAccountInformation.users)) {
                failure('{"message":"User with email ' + email + ' was not found.","errorCode":"404"}');
            }
            getAuthoritiesForUser(email, function (_response, _jqXHR) {
                userAccountInformation.authorities = _response;
            }, failure);
            userAccountInformation.users.forEach(function(user) {
                getEmployersForUser(userId, function(_response, _jqXHR) {
                    var userEmployerMap = {
                        userid:userId,
                        employerAccounts: _response
                    };
                    userAccountInformation.employerAccounts.push(userEmployerMap);					
                });
                getEmployeesForUser(userId, function(_response, _jqXHR){
                    var userEmployerMap = {
                        userid: userId,
                        employerAccounts: _response
                    };
                    userAccountInformation.employerAccounts.push(userEmployerMap);					
                });
            });
            success(userAccountInformation);
        }, failure);
    },
    getUsers: function (email, success, failure) {		
        if (isBadReference(email)) {
            if (!isBadReference(failure)) {
                failure('{"message":"Email is required.","errorCode":"400"}');
            }
            return;
        }
        if (isBadReference(success)) {
            return;
        } // nothing to do
		
        var url = getInternalApiServiceUrl('users');
        httpHelper.httpGETJson(url, undefined, true,
            function (jqXHR) {
                httpHelper.addHeader(jqXHR, 'x-ezclocker-user', email);
            },
            function (response, jqXHR) { // success
                success(response);
            },
            function (errorResponse, jqXHR) { // failure
                logger.error(errorResponse);
                if (isBadRequest(failure)) {
                    return;
                }
                failure(errorResponse);
            }
        );
    },
    getAuthoritiesForUser: function(email, success, failure) {
        if (isBadReference(email)) {
            if (!isBadReference(failure)) {
                failure('{"message":"Email is required.","errorCode":"400"}');
            }
            return;
        }
        if (isBadReference(success)) {
            return;
        } // nothing to do
        var url = getInternalApiServiceUrl('authority');
        httpHelper.httpGETJson(url, undefined, true,
            function (jqXHR) { // before
                httpHelper.addHeader('x-ezclocker-user', email);
            },
            function (response, jqXHR) { // success
                success(response);
            },
            function (errorResponse, jqXHR) { // failure
                logger.error(errorResponse);
                if (isBadRequest(failure)) {
                    return;
                }
                failure(errorResponse);
            }
        );
    },
    getEmployersForUser: function(userId, success, failure) {
        if (isBadReference(userId)) {
            if (!isBadReference(failure)) {
                failure('{"message":"User id is required.","errorCode":"400"}');
            }
            return;
        }
        if (isBadReference(success)) {
            return;
        } // nothing to do
        // _api/v1/employer/{employerId}
        var url = getInternalApiServiceUrl('employer?userId=' + userId);
        httpHelper.httpGETJson(url, undefined,
            function (response, jqXHR) { // success
                success(response);
            },
            function (errorResponse, jqXHR) { // failure
                logger.error(errorResponse);
                if (isBadRequest(failure)) {
                    return;
                }
                failure(errorResponse);
            }
        );
    },
    getEmployeesForUser: function(userId, employerId, success, failure) {
        if (isBadReference(userId)) {
            if (!isBadReference(failure)) {
                failure('{"message":"User id is required.","errorCode":"400"}');
            }
            return;
        }
        if (isBadReference(employerId)) {
            if (!isBadReference(failure)) {
                failure('{"message":"Employer id is required.","errorCode":"400"}');
            }
            return;
        }		
        if (isBadReference(success)) {
            return;
        } // nothing to do
        var url = getInternalApiServiceUrl('employee');
        httpHelper.httpGETJson(url, undefined, true,
            function (jqXHR) { // before handler
                httpHelper.addHeader(jqXHR, 'employerId', employerId);
            },
            function (response, jqXHR) { // success
                success(response);
            },
            function (errorResponse, jqXHR) { // failure
                logger.error(errorResponse);
                if (isBadRequest(failure)) {
                    return;
                }
                failure(errorResponse);
            }
        );
    }
}; 