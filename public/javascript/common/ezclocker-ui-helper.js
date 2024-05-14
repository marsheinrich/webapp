/* globals
    isBadReference, isEmptyString
*/

/* exported addCssClass */
/**
 *
 * @param {*} jquerySelector
 * @param {*} cssClassName
 * @deprecated Use ezUi object instead
 */
function addCssClass(jquerySelector, cssClassName) {
    if (isBadReference(jquerySelector)) {
        return;
    }
    if (isEmptyString(cssClassName)) {
        return;
    }
    $(jquerySelector).addClass(cssClassName);
}

/* exported removeCssClass */
/**
 * @deprecated Use ezUi object instead
 * @param {*} jquerySelector
 * @param {*} cssClassName
 */
function removeCssClass(jquerySelector, cssClassName) {
    if (isBadReference(jquerySelector)) {
        return;
    }
    if (isEmptyString(cssClassName)) {
        return;
    }
    $(jquerySelector).removeClass(cssClassName);
}

/* exported hideBody */
/**
 * @deprecated Use ezUi object instead
 * @param {*} callback
 */
function hideBody(callback) {
    $('body').hide(callback);
}

/* exported hideBodySlow */
/**
 * @deprecated Use ezUi object instead
 * @param {*} callback
 */
function hideBodySlow(callback) {
    $('body').fadeOut('slow', callback);
}

/* exported showBody */
/**
 * @deprecated Use ezUi object instead
 * @param {} callback
 */
function showBody(callback) {
    $('body').fadeIn('slow', callback);
}

/* exported showError */
/**
 * @deprecated Use ezUi object instead
 * @param {*} jquerySelector
 * @param {*} message
 */
function showError(jquerySelector, message) {
    if (isBadReference(jquerySelector)) {
        return;
    }
    if (isEmptyString(message)) {
        return;
    }
    $(jquerySelector).html(message);
    $(jquerySelector).show().fadeIn();
}

/* exported hideError */
/**
 * @deprecated Use ezUi object instead
 * @param {*} jquerySelector
 */
function hideError(jquerySelector) {
    if (isBadReference(jquerySelector)) {
        return;
    }
    $(jquerySelector).hide().fadeOut();
}

/* exported bindEnterKeyPressToAction */
/**
 * @deprecated Use ezUi object instead
 */
var ENTER_KEY_CODE = 13;

/* exported blah */
/**
 * @deprecated Use ezUi object instead
 * @param {*} jquerySelector
 * @param {*} actionCallback
 */
function bindEnterKeyPressToAction(jquerySelector, actionCallback) {
    if (isBadReference(jquerySelector)) {
        window.console.error('Attempt to bind the enter key to an action failed because of a undefined selector.');
        return;
    }
    if (isBadReference(actionCallback)) {
        window.console.warn('Skipped binding enter key. No callback action was provided.');
        return;
    }
    bindKeyPressToAction(jquerySelector, ENTER_KEY_CODE, actionCallback);
}

/* exported bindKeyPressToAction */
/**
 * @deprecated Use ezUi object instead
 * @param {*} jquerySelector
 * @param {*} keycode
 * @param {*} actionCallback
 */
function bindKeyPressToAction(jquerySelector, keycode, actionCallback) {
    if (isBadReference(keycode)) {
        window.console.warn('Skipped binding keypress. No keycode was provided.');
        return;
    }
    if (isBadReference(actionCallback)) {
        window.console.warn('Skipped binding keypress. No callback action was provided.');
        return;
    }
    if (isBadReference(jquerySelector)) {
        window.console.error('Attempt to bind a key press to an action failed because of a undefined selector.');
        return;
    }
    $(jquerySelector).keydown(function(event) {
        if (event.keyCode == keycode) {
            actionCallback(jquerySelector);
        }
    });
}

/* exported disableTag */
/**
 * @deprecated Use ezUi object instead
 * @param {*} jquerySelector
 */
function disableTag(jquerySelector) {
    if (isBadReference(jquerySelector)) {
        window.console.error('Attempt to disable tag failed because of a undefined selector.');
        return;
    }
    $(jquerySelector).prop('disabled', true);
}

/* exported enableTag */
/**
 * @deprecated Use ezUi object instead
 * @param {*} jquerySelector
 */
function enableTag(jquerySelector) {
    if (isBadReference(jquerySelector)) {
        window.console.error('Attempt to enable tag failed beacuse of a undefined selector.');
        return;
    }
    $(jquerySelector).prop('disabled', false);
}

/* exported disableJQueryButton */
/**
 * @deprecated Use ezUi object instead
 * @param {*} jquerySelector
 */
function disableJQueryButton(jquerySelector) {
    if (isBadReference(jquerySelector)) {
        window.console.error('Attempt to disable jQuery button failed because of a undefined selector.');
        return;
    }
    $(jquerySelector).button('disable');
}

/* exported enableJQueryButton */
/**
 * @deprecated Use ezUi object instead
 * @param {*} jquerySelector
 */
function enableJQueryButton(jquerySelector) {
    if (isBadReference(jquerySelector)) {
        window.console.error('Attempt to enable jQuery button failed beacuse of a undefined selector.');
        return;
    }
    $(jquerySelector).button('enable');
}

/* exported undefinedToDash */
/**
 * @deprecated Use ezUi object instead
 * @param {*} value
 */
function undefinedToDash(value) {
    var trimValue = trimEmptyToUndefined(value);
    if (isBadReference(trimValue)) {
        return '-';
    }
    return value;
}

/* exported trimEmptyToUndefined */
/**
 * @deprecated Use ezUi object instead
 * @param {*} value
 */
function trimEmptyToUndefined(value) {
    if (isBadReference(value)) {
        return undefined;
    }
    if (value.trim().length === 0) {
        return undefined;
    }
    return value;
}

/* exported getURLParameter */
/**
 * @deprecated Use ezUi object instead
 * @param {*} name
 */
function getURLParameter(name) {
    //TODO: Clean up the code
    //DEPRECATED: Use ezclocker-navigation.js instead
    window.console.warn(
        'Using deprecated method ezclocker-ui-helper.js:getUrlParam(). Please use ezclocker-navigation.js:getUrlParam() instead.'
    );
    return decodeURI((RegExp(name + '=' + '(.+?)(&|$)').exec(location.search))) || null;
}

/* exported showErrorLabel */
/**
 * @deprecated Use ezUi object instead
 * @param {*} label
 * @param {*} message
 */
function showErrorLabel(label, message) {
    //TODO: Clean up the code
    //DEPRECATED: Use showError(jquerySelector) instead
    window.console.warn(
        'Using deprecated method ezclocker-ui-helper.js:showErrorLabel(). Please use ezclocker-ui-helper.js:showError() instead.'
    );
    showError(label, message);
}

/* exported hideErrorLabel */
/**
 *  @deprecated Use ezUi object instead
 * @param {*} label
 * @param {*} style
 */
function hideErrorLabel(label) {
    //TODO: Clean up the code
    //DEPRECATED: Use hideError(jquerySelector) instead
    window.console.warn(
        'Using deprecated method ezclocker-ui-helper.js:hideErrorLabel(). Please use ezclocker-ui-helper.js:hideError() instead.'
    );
    hideError(label);
}

/* exported addStyle */
/**
 * @deprecated Use ezUi object instead
 * @param {*} jquerySelector
 * @param {*} className
 */
function addStyle(jquerySelector, className) {
    //TODO: Clean up the code
    //DEPRECATED: Use addCssClass(jquerySelector, cssClasName) instead
    window.console.warn(
        'Using deprecated method ezclocker-ui-helper.js:addStyle(). Please use ezclocker-ui-helper.js:addCssClass() instead.'
    );
    addCssClass(jquerySelector, className);
}

/* exported removeStyle */
/**
 * @deprecated Use ezUi object instead
 * @param {*} jquerySelector
 * @param {*} className
 */
function removeStyle(jquerySelector, className) {
    //TODO: Clean up the code
    //DEPRECATED: Use removeCssClass(jquerySelector, cssClasName) instead
    window.console.warn(
        'Using deprecated method ezclocker-ui-helper.js:removeStyle(). Please use ezclocker-ui-helper.js:removeCssClass() instead.'
    );
    removeCssClass(jquerySelector, className);
}