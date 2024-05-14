window.console.error('DEPRECATED DEPENDENCY: /public/javascript/common/ezclocker-loader.js - Migrate to EzSpinner.js');

// NOTE: Don't forget to also include the ezclocker-loader.css file!

/**
 * Assumes the document is within the /public folder
 * @param id
 * @param status
 */
function showPublicLoader(id, status) {
    'use strict';
    showLoader('.', id, status);
}

/**
 * Assumes the document is within the /secure folder and the needed loader image
 * is under in the ../public folder.
 * @param id
 * @param status
 */
function showSecureLoader(id, status) {
    showLoader('..', id, status);
}

var loaderContainer = null;
/**
 * Shows a loader in the body
 * @param id
 * @param status
 */
function showLoader(urlprefix, id, status) {
    'use strict';
    if ($('#' + id).length !== 0) {
        return;
    } // already visible

    var loaderHtml = '';
    if (loaderContainer === null) {
        loaderHtml += '<div id="_LoaderContainer" class="loaderContainer"></div>';
        $('body').prepend(loaderHtml);
        loaderContainer = $('#_LoaderContainer');
        loaderContainer.attr('top', $(window).height() - 20);
        loaderContainer.width($(window).width() - 20);
    }
    loaderHtml = '<img id="_Loader_' + id + '" class="loader" src="' + urlprefix +
        '/public/images/spinners/orange-bar-loader.gif" alt="' + status + '"/>';
    loaderContainer.append(loaderHtml);
}

/**
 * Removes the loader from the html
 * @param id
 */
function removeLoader(id) {
    $('#_Loader_' + id).remove();
}

/**
 * Updates the status of the loader
 * @param id
 * @param status
 */
function updateLoaderStatus(id, status) {
    $('#_Loader_' + id).attr('alt', status);
}
