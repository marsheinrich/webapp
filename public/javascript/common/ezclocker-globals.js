/*==============================*/
/**** DEPRECATED: DO NOT USE ****/
/*==============================*/

/* exported
    currentEmployerId, currentEmployeeId, currentTimeEntryId, currentUserId, setEmployerIdFromUrlParam
*/

/* globals
    getURLParameter
*/

var currentEmployerId = null;
var currentEmployeeId = null;
var currentTimeEntryId = null;
var currentUserId = null;

/**
 * Pulls the selected employer from the url param
 * @returns
 */
function setEmployerIdFromUrlParam() {
    var result = getURLParameter('employer');
    if (result === 'null' || result.length === 0) {
        currentEmployerId = '';
        window.location.assign('../index.html');
        return;
    }
    currentEmployerId = decodeURIComponent(result);
}