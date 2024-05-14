/* exported showTimeEntryAudit */
/**
 * @public
 * @param {Long} timeEntryId
 */
function showTimeEntryAudit(timeEntryId) {
    ezApi.s.ezSecureTimeEntryAuditService.getTimeEntryAuditsForTimeEntryId(timeEntryId,
        function(response) { // success
            ezApi.s.ezSecureTimeEntryAuditService.showDialog(response.timeEntryAudits);
        },
        function(errorResponse) { // failure
            ezApi.p.logger.error('Failed to obtain time entry audit information: ' + errorResponse);
            ezApi.s.ezSecureTimeEntryAuditService.showDialog(undefined);
        }
    );
}

/* exported displayHeader */
/**
 * @public
 */
function displayHeader() {
    var htmlForHeader = '';
    if (ezApi.s.ezEmployeeContext.activeEmployee.individualAccount === true) {
        htmlForHeader += '<table class="dashBoardHeaderTable"><tr><td class="leftTopAlignCell">';
        htmlForHeader += '<table><tr><td><img class="logoImage" src="../public/images/logos/ezclocker_logo_48x48.bmp"></td>';
        htmlForHeader += '<td><label class="logo">ezClocker</label></td></tr></table></td>';
        htmlForHeader += '<td class="rightTopAlignCell"><!-- <button disabled class="headerButton">Dashboard</button> -->';
        htmlForHeader += '<button class="headerButton" id="signOutButton" type="button" onclick="signOut()">Sign Out</button></td></tr></table>';
    } else {
        htmlForHeader += '<table class="dashBoardHeaderTable"><tr><td class="leftTopAlignCell">';
        htmlForHeader += '<table><tr><td><img class="logoImage" src="../public/images/logos/ezclocker_logo_48x48.bmp"></td>';
        htmlForHeader += '<td><label class="logo">ezClocker</label></td></tr></table></td>';
        htmlForHeader += '<td class="rightTopAlignCell">';
        //htmlForHeader += '<button disabled type="button" class="headerButton">Dashboard</button>';
        htmlForHeader += '<button class="headerButton" id="scheduleButton" type="button" >Schedules</button>';
        htmlForHeader += '<button class="headerButton" id="signOutButton" type="button" onclick="signOut()">Sign Out</button></td></tr></table>';
    }
    ezUi.ezHtml('_EzClockerHeader', htmlForHeader);
    ezUi.ezHookElementEvent('scheduleButton', 'click', showEmployeeSchedulePage);
}

function showEmployeeSchedulePage() {
    ezApi.p.nav.navigateToSecurePage('schedule.html');
}
