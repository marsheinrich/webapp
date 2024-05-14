/*==============================*/
/**** DEPRECATED: DO NOT USE ****/
/*==============================*/

/* DEPRECATED: STOP USING EVERYTHING IN THIS FILE, USE ezclocker-dailog-helper.js instead!!! */
window.console.warn(
    'DEPRECATED: Do not use ezclocker-dialog.js! Convert all uses of ezclocker-dialog.js to ezclocker-dialog-helper.js');

/* exported
    ezReportInternalBugDialog, ezServiceDownDialog, ezSomethingIsWrong, ezServiceLegalBlockDialog,
    ezSessionExpiredDialog, ezShowError, ezOkCancelMessage, ezActionDialog, showTip, ezFocusInputWrapper,
    ezUnfocusInputWrapper, ezClockerYesNoDialog
*/

/* globals
    ezNavigation
*/

var OK_DIALOG_RESPONSE = {
    'dialogStatus': 'OK'
};
var NO_DIALOG_RESPONSE = {
    'dialogStatus': 'NO'
};
var YES_DIALOG_RESPONSE = {
    'dialogStatus': 'YES'
};
var CANCEL_DIALOG_RESPONSE = {
    'dialogStatus': 'CANCEL'
};

/**
 * @deprecated Use ezApi.ezDialog instead
 *
 * @public
 * Dialog for reporting internally detected errors
 *
 * @param jqXHR
 * @param error
 * @param message
 */
function ezReportInternalBugDialog(jqXHR, error, message) {
    var jsonData;
    if (jqXHR) {
        jsonData = JSON.stringify(jqXHR, null, 2);
    } else {
        jsonData = 'No additional details available.';
    }

    ezShowMessage(
        error,
        'The ezClocker web service reported that your last action might have uncovered a bug in the website. Help the ezClocker team squash the pest by '
        +
        'by sending the information below to <a href="mailto:feedback@ezclocker.com">feedback@ezclocker.com</a> and help the ezClocker team squash the pest.<br/><br/>'
        +
        '<div style="background-color: #e0e0e0;color:#000000; padding: 8px;"><h3>ezClocker Website Bug Report</h3>' +
        '<textarea style="-webkit-box-sizing: border-box; -moz-box-sizing: border-box; box-sizing: border-box; ' +
        'height: 200px; width: 100%; font-size: 10pt; font-style: monospace;">' +
        'Error reported: ' + error + '\n' +
        'Error Details:\n' + jsonData + '\n\n' +
        'Additional Information: ' + message + '\n</textarea>',
        function() {
            location.reload(); // refresh the browser to reset the page;
        }, null, 800, 550
    );
}

/**
 * @deprecated Use ezApi.ezDialog instead
 *
 * Dialog to inform the user that their session
 * has expired.
 */
function ezServiceDownDialog(statusCode) {
    ezShowMessage(
        'ezClocker Connectivity',
        'The ezClocker services are not available at this time. The ezClocker team is aware of the problem and is working hard to restore connectivity.</br><br/>'
        +
        'Contact <a href="mailto:support@ezclocker.com">support@ezclocker.com</a> if you have ' +
        'questions or need immediate assistence. (status-code: ' + statusCode + ')',
        function() {
            ezNavigation.signOut();
        });
}

/**
 * @deprecated Use ezApi.ezDialog instead
 *
 * @param {*} title
 * @param {*} em
 * @param {*} sc
 * @param {*} jqXHR
 * @param {*} response
 */
function ezSomethingIsWrong(title, em, sc, jqXHR, response) {
    if (!em) {
        return Promise.resolve();
    } // do not show if there is no error message
    response = response || '';
    title = title || 'ezClocker Error';
    sc = sc || '500';
    jqXHR = jqXHR || {
        details: 'No additional information available.'
    };
    return new Promise(function(resolve) {
        ezShowMessage(
            title,
            em + '</br><br/>' +
            'Contact <a href="mailto:support@ezclocker.com">support@ezclocker.com</a> if you have ' +
            'questions or need immediate assistence. (status-code: ' + sc + ')<br/></br> ' +
            'Error Details:<br/>' +
            '<pre>' + JSON.stringify(jqXHR, null, 2) + '</pre><br/><br/>' + response,
            function() {
                resolve();
            }
        );
    });
}

/**
 * @deprecated Use ezApi.ezDialog instead
 *
 * Present dialog for legal blocks, censorship, government mandates
 */
function ezServiceLegalBlockDialog() {
    ezShowMessage(
        'Unavailable for Legal Reasons',
        'Law enforcement, a government authority, or another entity in which ezClocker is bound to has requested that we deny access at this time. ezClocker is unable to provide '
        +
        'additional information at this time. However, if you have have questions or need to seek immediate assistence please contact us at '
        +
        '<a href="mailto:support@ezclocker.com">support@ezclocker.com</a> and we will respond as soon as possible.<br/><br/>' +
        'Additional information about this error: <a target="_research_error" href="https://en.wikipedia.org/wiki/HTTP_451">Unavaialble for Legal Reasons Error</a>',
        function() {
            ezNavigation.signOut();
        });
}

/**
 * @deprecated Use ezApi.ezDialog instead
 *
 * Dialog to inform the user that their session
 * has expired.
 */
function ezSessionExpiredDialog() {
    ezShowMessage(
        'Session Expired',
        'Your current authentication session as expired. Please re-login to continue.',
        function() {
            ezNavigation.signOut();
        });
}

var yesNoDialog_ignoreClose = false;

/**
 * @deprecated Use ezApi.ezDialog instead
 *
 * @param {*} title
 * @param {*} message
 * @param {*} onCloseCallback
 * @param {*} width
 * @param {*} height
 * @param {*} useOldResponse
 */
function ezYesNoDialog(title, message, onCloseCallback, width, height, useOldResponse) {
    if (!useOldResponse) {
        useOldResponse = false;
    }
    if (!title) {
        title = 'Confirm';
    }
    if (!width) {
        width = 500;
    }
    if (!height) {
        height = 300;
    }
    var existingDialog = $('#_EzYesNoDialog');
    if (existingDialog.length === 0) {
        var dialogHtml = '<div id="_EzYesNoDialog" class="ezClockerDialog" title="' + title + '">';
        dialogHtml +=
            '<table class="ezClockerDialogContent"><tr><td class="ezClockerDialogImageCell"><img class="ezClockerDialogImage" src="' +
            ezNavigation.getPublicImagesUrl('info_32x32.ico') + '"/></td>';
        dialogHtml += '<td class="ezClockerDialogMessageCell" id="_EzYesNoDialog_DialogMessage">' + message +
            '</td></tr></table></div>';
        $('body').append(dialogHtml);
        existingDialog = $('#_EzYesNoDialog');
    }
    $('#_EzYesNoDialog').attr('title', title);
    $('#_EzYesNoDialog_DialogMessage').html(message);
    $(existingDialog).dialog({
        closeOnEscape: true,
        autoOpen: false,
        modal: true,
        show: 'blind',
        width: width,
        height: height,
        showOpt: {
            direction: 'down'
        },
        position: {
            my: 'center',
            at: 'center',
            of: window
        },
        buttons: {
            'Yes': {
                text: 'Yes',
                click: function() {
                    yesNoDialog_ignoreClose = true;
                    $(existingDialog).dialog('close');
                    if (onCloseCallback) {
                        if (useOldResponse) {
                            onCloseCallback('YES');
                            return;
                        }
                        onCloseCallback(YES_DIALOG_RESPONSE);
                    }
                }
            },
            'No': {
                text: 'No',
                click: function() {
                    yesNoDialog_ignoreClose = true;
                    $(existingDialog).dialog('close');
                    if (onCloseCallback) {
                        if (useOldResponse) {
                            onCloseCallback('NO');
                            return;
                        }
                        onCloseCallback(NO_DIALOG_RESPONSE);
                    }
                }
            }
        },
        close: function() {
            if (yesNoDialog_ignoreClose) {
                return;
            }
            if (onCloseCallback) {
                if (useOldResponse) {
                    onCloseCallback('NO');
                    return;
                }
                onCloseCallback(NO_DIALOG_RESPONSE);
            }
        }
    });
    $(existingDialog).dialog('open');
}

/**
 * @deprecated Use ezApi.ezDialog instead
 *
 * @param {*} title
 * @param {*} message
 * @param {*} onCloseCallback
 * @param {*} passThroughData
 * @param {*} width
 * @param {*} height
 */
function ezShowError(title, message, onCloseCallback, passThroughData, width, height) {
    if (!title) {
        title = 'Error';
    }
    if (!width) {
        width = 500;
    }
    if (!height) {
        height = 300;
    }
    var existingDialog = $('#_EzErrorDialog');
    if (existingDialog.length === 0) {
        var dialogHtml = '<div id="_EzErrorDialog" class="ezClockerDialog" title="' + title + '">';
        dialogHtml += '<table class="ezClockerDialogContent"><tr><td class="ezClockerDialogImageCell"></td>';
        dialogHtml += '<td class="ezClockerDialogMessageCell">' + message + '</td></tr></table></div>';
        $('body').append(dialogHtml);
        existingDialog = $('#_EzErrorDialog');
    }
    $(existingDialog).dialog({
        closeOnEscape: true,
        autoOpen: false,
        width: width,
        height: height,
        modal: true,
        show: 'blind',
        showOpt: {
            direction: 'down'
        },
        position: {
            my: 'center',
            at: 'center',
            of: window
        },
        buttons: {
            'Ok': {
                text: 'Ok',
                click: function() {
                    $(existingDialog).dialog('close');
                }
            }
        },
        close: function() {
            if (onCloseCallback) {
                onCloseCallback(OK_DIALOG_RESPONSE, passThroughData);
            }
        }
    });
    $(existingDialog).dialog('open');
}

/**
 * @deprecated Use ezApi.ezDialog instead
 *
 * @public
 * Inserts a OK message dialog into the page and displays it.
 * Reuses the existing dialog if already inserted.
 *
 * @param {string} message
 * @param {function} resultFunction
 *
 * @returns {*}
 * Returns value selected in result
 */
function ezShowMessage(title, message, onCloseCallback, passThroughData, width, height, useOldResponse) {
    if (!useOldResponse) {
        useOldResponse = false;
    }
    title = title || 'Message';
    if (!width) {
        width = 500;
    }
    if (width === 0) {
        width = undefined;
    }
    if (!height) {
        height = 300;
    }
    if (height === 0) {
        height = undefined;
    }
    var existingDialog = $('div#_EzOkDialog');
    if (existingDialog.length === 0) {
        var dialogHtml = '<div id="_EzOkDialog" class="ezClockerDialog" title="' + title + '">';
        dialogHtml +=
            '<table class="ezClockerDialogContent"><tr><td class="ezClockerDialogImageCell"><img class="ezClockerDialogImage" src="' +
            ezNavigation.getPublicImagesUrl('dialog_info_32x32.png') + '"/></td>';
        dialogHtml += '<td class="ezClockerDialogMessageCell" id="_EzOkDialog_DialogMessage">' + message +
            '</td></tr></table></div>';
        $('body').append(dialogHtml);
        existingDialog = $('#_EzOkDialog');
    }
    $('#_EzOkDialog').attr('title', title);
    $('#_EzOkDialog_DialogMessage').html(message);
    $(existingDialog).dialog({
        closeOnEscape: true,
        autoOpen: false,
        width: width,
        height: height,
        modal: true,
        show: 'blind',
        showOpt: {
            direction: 'down'
        },
        position: {
            my: 'center',
            at: 'center',
            of: window
        },
        buttons: [{
            id: '_SubscriptionExpiredOkButton',
            text: 'Ok',
            click: function() {
                if (onCloseCallback) {
                    onCloseCallback(passThroughData);
                }
                $(existingDialog).dialog('close');
            }
        }]
    });
    $(existingDialog).dialog('open');
}

/**
 * @deprecated Use ezApi.ezDialog instead
 *
 * @public
 * Inserts a OK message dialog into the page and displays it.
 * Reuses the existing dialog if already inserted.
 *
 * @param message
 * @param resultFunction
 *
 * Returns value selected in result
 */
function ezOkCancelMessage(title, message, onCloseCallback, passThroughData, width, height, useOldResponse) {
    if (!useOldResponse) {
        useOldResponse = false;
    }
    if (!title) {
        title = 'Message';
    }
    if (!width) {
        width = 500;
    }
    if (!height) {
        height = 300;
    }
    var existingDialog = $('div#_EzOkDialog');
    if (existingDialog.length === 0) {
        var dialogHtml = '<div id="_EzOkDialog" class="ezClockerDialog" title="' + title + '">';
        dialogHtml +=
            '<table class="ezClockerDialogContent"><tr><td class="ezClockerDialogImageCell"><img class="ezClockerDialogImage" src="' +
            ezNavigation.getPublicImagesUrl('dialog_info_32x32.png') + '"/></td>';
        dialogHtml += '<td class="ezClockerDialogMessageCell" id="_EzOkDialog_DialogMessage">' + message +
            '</td></tr></table></div>';
        $('body').append(dialogHtml);
        existingDialog = $('#_EzOkDialog');
    }
    $('#_EzOkDialog').attr('title', title);
    $('#_EzOkDialog_DialogMessage').html(message);
    $(existingDialog).dialog({
        closeOnEscape: true,
        autoOpen: false,
        width: width,
        height: height,
        modal: true,
        show: 'blind',
        showOpt: {
            direction: 'down'
        },
        position: {
            my: 'center',
            at: 'center',
            of: window
        },
        buttons: [{
            id: '_EzOkCancelMessage_OkButton',
            text: 'Ok',
            click: function() {
                if (onCloseCallback) {
                    if (useOldResponse) {
                        //TODO Change this to use a JSON payload instead
                        onCloseCallback('OK');
                        return;
                    }
                    onCloseCallback(OK_DIALOG_RESPONSE, passThroughData);
                }
                $(existingDialog).dialog('close');
            }
        },
        {
            id: '_EzOkCancelMessage_OkButton',
            text: 'Cancel',
            click: function() {
                if (onCloseCallback) {
                    if (useOldResponse) {
                        //TODO Change this to use a JSON payload instead
                        onCloseCallback('OK');
                        return;
                    }
                    onCloseCallback(CANCEL_DIALOG_RESPONSE, passThroughData);
                }
                $(existingDialog).dialog('close');
            }
        }
        ]
    });
    $(existingDialog).dialog('open');
}

/**
 * @deprecated Use ezApi.ezDialog instead
 *
 * @public
 * Injects a pop-up information dialog that allows the caller to specify the action buttons.
 *
 * @param title
 * @param message
 * @param customButtons
 * Example of customButtons object:
 * 	customButtons = [{
 * 		id: "MyDialogButtonId",
 * 		text: "Button Text",
 * 		click: function() {
 * 			// Handler for the click of the button
 * 		}
 * 	}]
 */
function ezActionDialog(title, message, customButtons, width, height, passThroughData, onCloseCallback, id) {
    title = title || 'Message';
    width = width || 800;
    height = height || 600;
    id = id || '_EzActionDialog';
    var existingDialog = $('#' + id);

    if (existingDialog.length === 0) {
        $('body').append(
            '<div id="' + id + '" class="ezClockerDialog" title="' + title + '">' +
            '<table class="ezActionDialog"><tr><td class="ezClockerDialogImageCell"><img class="ezClockerDialogImage" src="' +
            ezNavigation.getPublicImagesUrl('dialog_info_32x32.png') + '"/></td>' +
            '<td class="ezClockerDialogMessageCell" id="' + id + '_DialogMessage">' + message +
            '</td></tr></table></div>'
        );
        existingDialog = $('#' + id);
    }

    existingDialog.attr('title', title);
    $('#' + id + '_DialogMessage').html(message);

    // Wrap the customButtons in an additional function to close the dialog afterwards
    //	for (var x in customButtons) {
    //		var b = customButtons[x];
    //		b.actionClick = b.click;
    //		b.click = function() {
    //			if (b.actionClick) {
    //				b.actionClick();
    //			}
    //			$(existingDialog).dialog('close');
    //		};
    //	}

    existingDialog.dialog({
        closeOnEscape: true,
        autoOpen: false,
        width: width,
        height: height,
        modal: true,
        show: 'blind',
        showOpt: {
            direction: 'down'
        },
        position: {
            my: 'center',
            at: 'center',
            of: window
        },
        buttons: customButtons,
        close: function() {
            if (onCloseCallback) {
                onCloseCallback(passThroughData);
            }
        }
    });
    existingDialog.dialog('open');
    existingDialog.data = passThroughData;
    return existingDialog;
}

var EMPLOYEE_INVITE_TIP = 'EMPLOYEE_INVITE_TIP';

/**
 * @deprecated Use ezApi.ezDialog instead
 *
 * @param {*} title
 * @param {*} tipType
 */
function showTip(title, tipType) {
    if (tipType === EMPLOYEE_INVITE_TIP) {
        var body = getEmployeeInviteTip();
        ezClockerMessageDialog(body, cancelDialog, title, 700, 300);
    }
}

/**
 * @deprecated Use ezApi.ezDialog instead
 */
function cancelDialog() {
    $(this).dialog('close');
}

/**
 * @deprecated Use ezApi.ezDialog instead
 */
function getEmployeeInviteTip() {
    return '<p>When you invite employees to ezClocker they receive an email stating that your business is inviting them' +
        'to use ezClocker to track their time. The email will contain a web link that will take the employee to their sign-up screen ' +
        'allowing them to create a password for their new account. After entering their password ezClocker will allow them to login and being '
        +
        'tracking their time usign either the native mobile apps or the website.</p>' +
        '<p>Note that invites can expire overtime if the employee takes more than a day to accept the invite. If this happens, you can ' +
        're-invite the employee from your employer dashboard.</p>' +
        '<p>Finally, ezClocker restricts invites to new users (as determined by email address). If the employee you invite already has an ezClocker account '
        +
        'or you attempt to invite yourself (as the employer) you will receive a message stating that the account already exists. To continue, either enter a different email address '
        +
        'or contact ezClocker support to get help resetting or converting existing accounts.</p>';
}

/**
 * @deprecated Use ezApi.ezDialog instead
 */
function ezFocusInputWrapper() {
    $(this).parent().addClass('ezDialogTextInputContainerHighlight');
}

/**
 * @deprecated Use ezApi.ezDialog instead
 */
function ezUnfocusInputWrapper() {
    $(this).parent().removeClass('ezDialogTextInputContainerHighlight');
}

/**
 * @deprecated Use ezApi.ezDialog instead
 *
 * @param {*} message
 * @param {*} resultFunction
 * @param {*} title
 * @param {*} dialogWidth
 * @param {*} dialogHeight
 */
function ezClockerMessageDialog(message, resultFunction, title, dialogWidth, dialogHeight) {
    window.console.warn(
        'Using deprecated method ezclocker-dialog.js:ezClockerMessageDialog(imagePrefix, message, resultFunction, title, dialogWidth, dialogHeight). \' + '
        +
        'Please change to ezclocker-dialog.js:ezShowMessage(title, message, onCloseCallBack, passThroughData, width, height)'
    );
    ezShowMessage(title, message, resultFunction, undefined, dialogWidth, dialogHeight, true);
}

/**
 * @deprecated Use ezApi.ezDialog instead
 *
 * @param {*} imagePrefix
 * @param {*} message
 * @param {*} resultFunction
 * @param {*} title
 * @param {*} dialogWidth
 * @param {*} dialogHeight
 */
function ezClockerYesNoDialog(imagePrefix, message, resultFunction, title, dialogWidth, dialogHeight) {
    window.console.warn(
        'Using deprecated method ezclocker-dialog.js:ezClockerYesNoDialog(imagePrefix, message, resultFunction, title, dialogWidth, dialogHeight). \' + '
        +
        'Please change to ezclocker-dialog.js:ezYesNoDialog(title, message, onCloseCallBack, width, height)');
    ezYesNoDialog(title, message, resultFunction, dialogWidth, dialogHeight, true);
}