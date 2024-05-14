/* exported disablePageWait, resizeDisablePageWait, enablePageWait, disablePage, resizeDisablePage, enablePage */

/** Disables the page with a wait spinner **/
var pageDisabledWait = false; // if the system is currently blocking user actions

/**
 * Disables input on a page with a wait spinner
 * @param imagePrefix
 */
function disablePageWait(imagePrefix) {
    //DEPRECATED: Use ezclocker-spinner.js:waitSpinner.showFullPage();()
    window.console.warn('Using deprecated method disablePageWait(). Please switch to using ezclocker-spinner.js (waitSpinner).');
    if (pageDisabledWait) {
        return;
    }
    if (imagePrefix === null) {
        imagePrefix = '..';
    }
    pageDisabledWait = true;
    $(window).bind('resize', resizeDisablePageWait);
    $('body').append(
        '<div id="_ProgressDiv" class="progressDiv"><div class="progressImageDiv" id="_ImageDiv"><img id="_ProgressSpinner" src="' +
    imagePrefix + '/public/images/spinners/large_spinner.gif"/></div></div>');
    resizeDisablePageWait();
}
/**
 * Resizes the page spinner when the page resizes
 */
function resizeDisablePageWait() {
    //DEPRECATED: Use ezclocker-spinner.js:hideOrangeSpinner()
    window.console.warn('Using deprecated method resizeDisablePageWait(). Please switch to using ezclocker-spinner.js (waitSpinner).');
    if (!pageDisabledWait) {
        return;
    }
    $('div#_ProgressDiv').outerHeight(window.innerHeight);
    $('div#_ProgressDiv').outerWidth(window.innerWidth);
    var width = parseInt(($('div#_ProgressDiv').width() / 2) - (128 / 2));
    $('div#_ImageDiv').css('margin-left', width + 'px');
    var height = parseInt(($('div#_ProgressDiv').height() / 2) - (128 / 2));
    $('div#_ImageDiv').css('margin-top', height + 'px');
}
/**
 * Enables the page, removing the wait spinner
 */
function enablePageWait() {
    //DEPRECATED: Use ezclocker-spinner.js:hideOrangeSpinner()
    window.console.warn('Using deprecated method ezcocker-block-user-actions.js:enablePageWait(). ' + 'Please switch to using ezclocker-spinner.js:hideOrangeSpinner().');
    $(window).unbind('resize', resizeDisablePageWait);
    $('div#_ProgressDiv').remove();
    pageDisabledWait = false;
}
/** Disables the page without a wait spinner - for dialogs mostly **/
var pageDisabled = false;
/**
 * Disables a page, no spinner
 */
function disablePage() {
    window.console.warn('Using deprecated method disablePage(). Please switch to using ezclocker-spinner.js (waitSpinner).');
    if (pageDisabled) {
        return;
    }
    pageDisabled = true;
    $(window).bind('resize', resizeDisablePage);
    $('body').append('<div id="_ProgressDiv" class="progressDiv"></div></div>');
    resizeDisablePage();
}
/**
 * Resizes the disable div if the page resizes
 */
function resizeDisablePage() {
    if (!pageDisabled) {
        return;
    }
    $('div#_ProgressDiv').outerHeight(window.innerHeight);
    $('div#_ProgressDiv').outerWidth(window.innerWidth);
}
/**
 * Enables the page, removing the disable div
 */
function enablePage() {
    window.console.warn('Using deprecated method enablePage(). Please switch to using ezclocker-spinner.js (waitSpinner).');
    $(window).unbind('resize', resizeDisablePage);
    $('div#_ProgressDiv').remove();
    pageDisabled = false;
}
