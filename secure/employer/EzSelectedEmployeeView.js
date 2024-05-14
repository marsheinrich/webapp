import '/ezlibrary/EzEmployeeImage.js';
import { EzElementEventName } from '/ezlibrary/EzElementEventName.js';

import '/secure/javascript/common/ez-clockin-clockout-helper.js';

import { EzEmployeeDisplayController } from '/secure/employer/employerDashboard-DisplayEmployeeInfo.js';

/**
    @public
    Represents the selected employee's view in the employer dashboard.
 */
class EzSelectedEmployeeView {
    static ezApiName = 'ezSelectedEmployeeView';
    static ezEventNames = {
        onSelectedEmployeeViewClockInSubmit: ezApi.ezIdTemplate`on${EzSelectedEmployeeView.ezApiName}_ClockIn_Submit`,
        onSelectedEmployeeViewClockOutSubmit: ezApi.ezIdTemplate`on${EzSelectedEmployeeView.ezApiName}_ClockOut_Submit`,
        onSelectedEmployeeViewQuickFilterSubmit: ezApi.ezIdTemplate`on${EzSelectedEmployeeView.ezApiName}_QuickFilter_Submit`,
        onSelectedEmployeeViewAddTimeEntrySubmit: ezApi.ezIdTemplate`on${EzSelectedEmployeeView.ezApiName}_AddTimeEntry_Submit`,
        onSelectedEmployeeReInviteSubmit: ezApi.ezIdTemplate`on${EzSelectedEmployeeView.ezApiName}_Reinvite_Submit`,
        onSelectedEmployeeDeleteSubmit: ezApi.ezIdTemplate`on${EzSelectedEmployeeView.ezApiName}_Delete_Submit`,
    };
    
    static {
        document.addEventListener('onEzApiReady',
            () => ezApi.ezRegisterNewApi(EzSelectedEmployeeView, EzSelectedEmployeeView.ezApiName));
    }

    constructor() {
        this.ready = false;
        this.ezTypeName = 'EzSelectedEmployeeView';

        this.ezViewId = 'EzSelectedEmployeeView';
        this.ezParentId = 'body';

        this.ezActiveClockInIntervalTickerInfo = null;

        this.ezEventNames = EzSelectedEmployeeView.ezEventNames;
    }

    /**
        @protected
        Initializes EzSelectedEmployeeView
        @returns {EzSelectedEmployeeView}
     */
    ezInit() {
        let self = ezApi.ezclocker[EzSelectedEmployeeView.ezApiName];

        ezApi.ezclocker.ezEventEngine.ezRegisterEvent(
            EzSelectedEmployeeView.ezApiName,
            EzSelectedEmployeeView.ezEventNames.onSelectedEmployeeViewClockInSubmit);
        ezApi.ezclocker.ezEventEngine.ezRegisterEvent(
            EzSelectedEmployeeView.ezApiName,
            EzSelectedEmployeeView.ezEventNames.onSelectedEmployeeViewClockOutSubmit);
        ezApi.ezclocker.ezEventEngine.ezRegisterEvent(
            EzSelectedEmployeeView.ezApiName,
            EzSelectedEmployeeView.ezEventNames.onSelectedEmployeeViewQuickFilterSubmit);
        ezApi.ezclocker.ezEventEngine.ezRegisterEvent(
            EzSelectedEmployeeView.ezApiName,
            EzSelectedEmployeeView.ezEventNames.onSelectedEmployeeViewAddTimeEntrySubmit);
        ezApi.ezclocker.ezEventEngine.ezRegisterEvent(
            EzSelectedEmployeeView.ezApiName,
            EzSelectedEmployeeView.ezEventNames.onSelectedEmployeeReInviteSubmit);
        ezApi.ezclocker.ezEventEngine.ezRegisterEvent(
            EzSelectedEmployeeView.ezApiName,
            EzSelectedEmployeeView.ezEventNames.onSelectedEmployeeDeleteSubmit);

        self.ready = true;
        return self;
    }

    /**
        @public
        Inserts the employee view into the element associated with the provided parentId
        @param {String} parentId
        @returns {Promise.resolve}
     */
    ezShow(parentId) {
        let self = ezApi.ezclocker[EzSelectedEmployeeView.ezApiName];

        ezApi.ezclocker.logger.info('Showing the selected employee view ...');

        if (!ezUi.ezElementExists(parentId)) {
            throw ezApi.ezBadParam('parentId', self.ezTypeName, 'ezInsertView');
        }

        self.ezParentId = parentId;
        ezUi.ezContent(self.ezParentId, self.ezBuildEmployeeViewHtml());

        ezApi.ezclocker.ezEmployeeImage.ezInsertEmployeeImage(
            ezApi.ezclocker.ezClockerContext.ezGetSelectedEmployerAccount().id,
            'EzEmployeeImageCell');

        self.ezHookEvents();

        ezApi.ezclocker.logger.info('Selected employee view visible.');
    }

    ezClose() {
        let self = ezApi.ezclocker[EzSelectedEmployeeView.ezApiName];

        ezApi.ezclocker.logger.info('Closing the selected employee view ...');

        self.ezUnhookEvents();
        ezUi.ezRemove(self.ezViewId);
        self.ezParentId = null;

        ezApi.ezclocker.logger.info('Selected employee view closed.');
    }

    /**
        @public
        Shows the clock out status box
     */
    ezShowClockOutStatusBox() {
        let self = ezApi.ezclocker[EzSelectedEmployeeView.ezApiName];

        ezUi.ezHideElement('EzEmployeeViewClockInStatusBox');
        ezUi.ezShowElement('EzEmployeeViewClockOutStatusBox');

        if (ezApi.ezIsValid(self.ezActiveClockInIntervalTickerInfo)) {
            ezApi.ezclocker.ezTickerTimer.ezStopIntervalTicker(
                self.ezActiveClockInIntervalTickerInfo.ezIntervalTickerId);
        }
    }

    /**
        @public
        Shoes the clock in status box
     */
    ezShowClockInStatusBox(clockInMoment) {
        let self = ezApi.ezclocker[EzSelectedEmployeeView.ezApiName];

        ezUi.ezHideElement('EzEmployeeViewClockOutStatusBox');

        if (ezApi.ezIsValid(clockInMoment)) {
            self.ezUpdateActiveClockInStatusBox(clockInMoment);
        }

        self.ezActiveClockInIntervalTickerInfo = ezApi.ezclocker.ezTickerTimer.ezStartIntervalTicker(() => {
            let aEmployee = ezApi.ezclocker.ezClockerContext.ezGetActiveEmployee();
            if (ezApi.ezIsValid(aEmployee) && ezApi.ezIsValid(aEmployee.activeClockIn)) {
                ezApi.ezclocker.ezAnimator.ezFlipX('EzActiveClockInDurationDisplay').then(
                    () => self.ezUpdateActiveClockInStatusBox(
                        ezApi.ezclocker.ezDateTime.ezCreateFromIso(aEmployee.activeClockIn.clockInIso8601)));
            }
        }, 60000, 'EzActiveClockInIntervalTicker');

        ezUi.ezShowElement('EzEmployeeViewClockInStatusBox');
    }

    /**
        @public
        Updates the data fields in the active clock in status box.
        @param {moment} clockInMoment
     */
    ezUpdateActiveClockInStatusBox(clockInMoment) {
        let self = ezApi.ezclocker[EzSelectedEmployeeView.ezApiName];

        if (ezApi.ezIsNotValid(clockInMoment)) {
            throw ezApi.ezBadParam('clockInMoment', self.ezTypeName, 'ezBuildActiveClockInStatusBox');
        }

        ezUi.ezContent('EzActiveClockInDateCell', ezApi.ezclocker.ezDateTime.ezDateString(clockInMoment));
        ezUi.ezContent('EzActiveClockInTimeCell', ezApi.ezclocker.ezDateTime.ezTimeString(clockInMoment));
        ezUi.ezContent('EzActiveClockInDurationDisplay',
            ezApi.ezclocker.ezDateTime.ezCalculateElapsedTimeToNow(clockInMoment));
    }

    /**
        @public
        Updates the employee's name in the view
     */
    ezUpdateEmployeeName(employeeName) {
        ezUi.ezContent('EzEmployeeName', ezApi.ezStringOrEmpty(employeeName));
        ezUi.ezContent('EzEmployeeView_ClockInButtonEmployeeName', ezApi.ezStringOrEmpty(employeeName));
        ezUi.ezContent('EzEmployeeView_ClockOutButtonEmployeeName', ezApi.ezStringOrEmpty(employeeName));
    }

    /**
        @public
        Updates the employee's email link
        @param {String} employeeEmail
     */
    ezUpdateEmployeeEmailLink(employeeEmail) {
        if (!ezApi.ezStringHasLength(employeeEmail)) {
            ezUi.ezClearContent('EzEmployeeEmailLinkContainer');
        } else {
            ezUi.ezContent('EzEmployeeEmailLinkContainer', ezApi.ezTemplate`
            <a id="_EmployeeEmailLink" class="employeeEmailLink" href="mailto:${employeeEmail}">${employeeEmail}</a>`);
        }
    }

    /**
        @public
        Updates the employee's total hours
        @param {String} totalHours
     */
    ezUpdateEmployeeTotalHours(totalHours) {
        if (ezApi.ezIsNotValid(totalHours)) {
            totalHours = 0;
        } else if (ezApi.ezIsString(totalHours)) {
            totalHours = parseint(totalHours);
        }

        ezUi.ezSetInputValue('EzEmployeeView_TotalHours', 0 != totalHours
            ? totalHours
            : '0');
    }

    /**
     * @public
     * Enables the 'other' employee actions such as add time entry
     */
    ezEnableEmployeeActions() {
        let self = ezApi.ezclocker[EzSelectedEmployeeView.ezApiName];

        ezUi.ezEnable(ezApi.ezIdTemplate`${self.ezViewId}_AddTimeEntryButton`);
        ezUi.ezEnable(ezApi.ezIdTemplate`${self.ezViewId}_ReInviteEmployeeButton`);
        ezUi.ezEnable(ezApi.ezIdTemplate`${self.ezViewId}_DeleteEmployeeButton`);
    }

    /**
     * @public
     * Disables the 'other' employee actions such as add time entry
     */
    ezDisableEmployeeActions() {
        let self = ezApi.ezclocker[EzSelectedEmployeeView.ezApiName];

        ezUi.ezDisable(ezApi.ezIdTemplate`${self.ezViewId}_AddTimeEntryButton`);
        ezUi.ezDisable(ezApi.ezIdTemplate`${self.ezViewId}_ReInviteEmployeeButton`);
        ezUi.ezDisable(ezApi.ezIdTemplate`${self.ezViewId}_DeleteEmployeeButton`);
    }

    /**
     * @public
     * Disables the ability to clock in or out
     */
    ezDisableClockInOut() {
        let self = ezApi.ezclocker[EzSelectedEmployeeView.ezApiName];

        ezUi.ezDisable(ezApi.ezIdTemplate`${self.ezViewId}_EmployeeClockOutButton`);
        ezUi.ezDisable(ezApi.ezIdTemplate`${self.ezViewId}_EmployeeClockInButton`);
    }

    /**
     * @public
     * Enables clock-out abilities in the UI
     */
    ezEnableClockOut() {
        let self = ezApi.ezclocker[EzSelectedEmployeeView.ezApiName];

        ezUi.ezEnable(ezApi.ezIdTemplate`${self.ezViewId}_EmployeeClockOutButton`);
        ezUi.ezDisable(ezApi.ezIdTemplate`${self.ezViewId}_EmployeeClockInButton`);
    }

    /**
     * @public
     * Enables clock-in abilities in the UI
     */
    ezEnableClockIn() {
        let self = ezApi.ezclocker[EzSelectedEmployeeView.ezApiName];

        ezUi.ezEnable(ezApi.ezIdTemplate`${self.ezViewId}_EmployeeClockInButton`);
        ezUi.ezDisable(ezApi.ezIdTemplate`${self.ezViewId}_EmployeeClockOutButton`);
    }

    /**
        @public
        Disables the filter time entries button
     */
    ezDisableFilterTimeEntries() {
        let self = ezApi.ezclocker[EzSelectedEmployeeView.ezApiName];

        ezUi.ezDisable(ezApi.ezIdTemplate`${self.ezViewId}_FilterTimeEntriesButton`);
    }

    /**
        @public
        Enables the filter time entreis button
     */
    ezEnableFilterTimeEntries() {
        let self = ezApi.ezclocker[EzSelectedEmployeeView.ezApiName];

        ezUi.ezDisable(ezApi.ezIdTemplate`${self.ezViewId}_FilterTimeEntriesButton`);
    }

    /**
        @protected
        Builds the employee view HTML
     */
    ezBuildEmployeeViewHtml() {
        let self = ezApi.ezclocker[EzSelectedEmployeeView.ezApiName];

        return ezApi.ezTemplate`
            <div id="${self.ezViewId}">
                ${self.ezBuildEmployeeViewHeaderHtml()}
                ${self.ezBuildEmployeeViewActionBar()}
                ${self.ezBuildEmployeeViewTimeEntriesView()}
            </div`;
    }

    /**
        @protected
        Builds the view's header bar HTML
        @returns {String}
     */
    ezBuildEmployeeViewHeaderHtml() {
        let self = ezApi.ezclocker[EzSelectedEmployeeView.ezApiName];

        return ezApi.ezTemplate`
            <style id="EzEmployeeViewStyles">
                ezEmployeeName {
                    display: contents;
                }
            </style>
            <table class="employeeInformationBox bottomShadow" id="_EmployeeInformationContainer">
                <tr>
                    <td>
                        <table class="employeeInformation" id="_EmployeeInformation">
                            <tr>
                                <td id="EzEmployeeImageCell" class="employeeImageCell"></td>
                                <td>
                                    <table>
                                        <tr>
                                            <td id="_EmployeeNameCell" class="employeeNameCell">
                                                <div id="EzEmployeeName" id="ezEmployeeName"></div>
                                                <img id="EzEditEmployeeInfo" class="editButtonImage"
                                                    onclick="ezApi.ezclocker.ezEmployeeDisplayController.ezUpdateActiveEmployeeInfo()"
                                                    title="Edit Employee Information"
                                                    src="${ezApi.ezclocker.nav.ezGetPublicImagesUrl('edit-16x16-white.png')}"/>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td id="EzEmployeeEmailCell" class="employeeEmailCell">
                                                <div id="EzEmployeeEmailLinkContainer">
                                                </div>
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                        </table>
                    </td>
                    <td id="EzEmployeeViewActiveClockInCell" class="EzEmployerDashboard_ActiveClockInCell">
                        <div id="_ActiveClockInContainer" class="activeClockInContainer">
                            ${self.ezBuildClockOutStatusBox()}
                            ${self.ezBuildActiveClockInStatusBox()}
                        </div>
                    </td>
                </tr>
            </table>`;
    }

    /**
        @protected
        Builds the view's action bar HTML
        @returns {String}
     */
    ezBuildEmployeeViewActionBar() {
        let self = ezApi.ezclocker[EzSelectedEmployeeView.ezApiName];

        return ezApi.ezTemplate`
            <div id="${self.ezViewId}_EmployeeMenuContainerDiv" class="employeeMenuContainer insetTopShadow">
                <table class="fullWidthTable">
                    <tr>
                        <td>
                            <button id="${self.ezViewId}_EmployeeClockInButton" class="majorButton" disabled>
                                <div>Clock In</div>
                                <div id="EzEmployeeView_ClockInButtonEmployeeName" class="majorButtonSubLabel"></div>
                            </button>
                            <button id="${self.ezViewId}_EmployeeClockOutButton" class="majorButton" disabled>
                                <div>Clock Out</div>
                                <div id="EzEmployeeView_ClockOutButtonEmployeeName" class="majorButtonSubLabel"></div>
                            </button>
                        </td>
                        <td>
                            <div class="floatRightDiv">
                                <table>
                                    <tr>
                                        <td>
                                            <button id="${self.ezViewId}_AddTimeEntryButton" class="majorButton"
                                                disabled>
                                                Add Time Entry
                                            </button>
                                        </td>
                                        <td>
                                            <button id="${self.ezViewId}_ReInviteEmployeeButton" class="majorButton"
                                                disabled>
                                                Resend Invite
                                            </button>
                                        </td>
                                        <td>
                                            <button id="${self.ezViewId}_DeleteEmployeeButton" class="deleteMajorButton"
                                                disabled>
                                                Delete Employee
                                            </button>
                                        </td>
                                    </tr>
                                </table>
                            </div>
                        </td>
                    </tr>
                </table>
            </div>`;
    }

    /**
        @protected
        Builds the view's time entries grid HTML
     */
    ezBuildEmployeeViewTimeEntriesView() {
        let self = ezApi.ezclocker[EzSelectedEmployeeView.ezApiName];

        return ezApi.ezTemplate`
            <div id="_filterMenuContainer" class="filterMenu">
                <table class="noBorderPaddingSpacing fullWidthTable">
                    <tr>
                        <td>
                            <table class="noBorderPaddingSpacing">
                                <tr>
                                    <td>
                                        <input id="_quickFilterStartDate" type="text" />
                                    </td>
                                    <td>
                                        to
                                    </td>
                                    <td>
                                        <input id="_quickFilterEndDate" type="text" />
                                    </td>
                                    <td>
                                        <button id="${self.ezViewId}_FilterTimeEntriesButton" class="majorButton"
                                            title="Show time entries for period">
                                            View Pay Period
                                        </button>
                                    </td>
                                </tr>
                            </table>
                        </td>
                        <td>
                            <!-- empty cell -->
                        </td>
                        <td class="rightMiddleCell">
                            <div>
                                <label id="EzEmployeeViewTotalHoursLabel" for="EzEmployeeView_TotalHours">
                                    Total Time:
                                </label>
                                <input id="EzEmployeeView_TotalHours" type="text" class="totalHours" readonly />
                            </div>
                        </td>
                    </tr>
                </table>
            </div>`;
    }

    /**
        Builds a clock-out status box HTML
        @returns {String}
     */
    ezBuildClockOutStatusBox() {
        return ezApi.ezTemplate`
            <table id="EzEmployeeViewClockOutStatusBox" class="activeClockInTable" style="display:none">
                <tr>
                    <th class="activeClockInHeader">
                        Status
                    </th>
                </tr>
                <tr>
                    <td class="activeClockInCell">
                        Clocked Out
                    </td>
                </tr>
            </table>`;
    }

    /**
        Builds the active clock in status box
        @returns {String}
     */
    ezBuildActiveClockInStatusBox() {
        return ezApi.ezTemplate`
            <table id="EzEmployeeViewClockInStatusBox"class="activeClockInTable" style="display:none">
                <tr>
                    <th class="activeClockInHeader">Status</th>
                    <th class="activeClockInHeader">Date</th>
                    <th class="activeClockInHeader">Time</th>
                    <th class="activeClockInHeader">Total</th>
                </tr><tr>
                    <td class="activeClockInCell">Clocked In</td>
                    <td id="EzActiveClockInDateCell" class="activeClockInCell" ></td>
                    <td cid="EzActiveClockInTimeCell class="activeClockInCell></td>
                    <td class="activeClockInCell" id="EzActiveClockInDurationCell">
                        <div id="EzActiveClockInDurationDisplay" class="ezActiveClockInDurationDisplay"></div>
                    </td>
                </tr>
            </table>`;
    }

    /**
        Builds the grid container used when the active employee does not have any time entries
        for the selected period.
        @returns {String}
     */
    ezBuildNoTimeEntriesForPeriodGrisContainer() {
        return ezApi.ezTemplate`
            <div class="ezGridContainer" id="timeEntryContainerDiv">
                <h1>The employee does not have time entry data for the selected pay period.</h1>
            </div>`;
    }

    /**
        @protected
        Wires up UX events to ezEventEngine events after the UX is injected
     */
    ezHookEvents() {
        let self = ezApi.ezclocker[EzSelectedEmployeeView.ezApiName];

        ezApi.ezclocker.ezEventEngine.ezWantElementEvent(
            'EzEmployeeView_TotalHours',
            EzElementEventName.CLICK,
            EzSelectedEmployeeView.ezApiName,
            () => ezUi.ezSelectAll('EzEmployeeView_TotalHours'));

        ezApi.ezclocker.ezEventEngine.ezWantElementEvent(
            ezApi.ezIdTemplate`${self.ezViewId}_EmployeeClockInButton`,
            EzElementEventName.CLICK,
            EzSelectedEmployeeView.ezApiName,
            (event) => ezApi.ezclocker.ezEventEngine.ezTriggerEvent(
                EzSelectedEmployeeView.ezEventNames.onSelectedEmployeeViewClockInSubmit, event));

        ezApi.ezclocker.ezEventEngine.ezWantElementEvent(
            ezApi.ezIdTemplate`${self.ezViewId}_EmployeeClockOutButton`,
            EzElementEventName.CLICK,
            EzSelectedEmployeeView.ezApiName,
            (event) => ezApi.ezclocker.ezEventEngine.ezTriggerEvent(
                EzSelectedEmployeeView.ezEventNames.onSelectedEmployeeViewClockOutSubmit, event));

        ezApi.ezclocker.ezEventEngine.ezWantElementEvent(
            ezApi.ezIdTemplate`${self.ezViewId}_FilterTimeEntriesButton`,
            EzElementEventName.CLICK,
            EzSelectedEmployeeView.ezApiName,
            (event) => ezApi.ezclocker.ezEventEngine.ezTriggerEvent(
                EzSelectedEmployeeView.ezEventNames.onSelectedEmployeeViewQuickFilterSubmit, event));

        ezApi.ezclocker.ezEventEngine.ezWantElementEvent(
            ezApi.ezIdTemplate`${self.ezViewId}_AddTimeEntryButton`,
            EzElementEventName.CLICK,
            EzSelectedEmployeeView.ezApiName,
            (event) => ezApi.ezclocker.ezEventEngine.ezTriggerEvent(
                EzSelectedEmployeeView.ezEventNames.onSelectedEmployeeViewAddTimeEntrySubmit,
                event));

        ezApi.ezclocker.ezEventEngine.ezWantElementEvent(
            ezApi.ezIdTemplate`${self.ezViewId}_ReInviteEmployeeButton`,
            EzElementEventName.CLICK,
            EzSelectedEmployeeView.ezApiName,
            (event) => ezApi.ezclocker.ezEventEngine.ezTriggerEvent(
                EzSelectedEmployeeView.ezEventNames.onSelectedEmployeeReInviteSubmit, event));

        ezApi.ezclocker.ezEventEngine.ezWantElementEvent(
            ezApi.ezIdTemplate`${self.ezViewId}_DeleteEmployeeButton`,
            EzElementEventName.CLICK,
            EzSelectedEmployeeView.ezApiName,
            (event) => ezApi.ezclocker.ezEventEngine.ezTriggerEvent(
                EzSelectedEmployeeView.ezEventNames.onSelectedEmployeeDeleteSubmit, event));
    }

    /**
     * @protected
     * Disconnects hooked events (if any)
     */
    ezUnhookEvents() {
        let self = ezApi.ezclocker[EzSelectedEmployeeView.ezApiName];

        if (!ezUi.ezElementExists(self.ezViewId)) {
            // Element not in document yet
            return;
        }

        ezApi.ezclocker.ezEventEngine.ezUnwantElementEvent(
            ezApi.ezIdTemplate`${self.ezViewId}_EmployeeClockInButton`,
            EzElementEventName.CLICK,
            EzSelectedEmployeeView.ezApiName);

        ezApi.ezclocker.ezEventEngine.ezUnwantElementEvent(
            ezApi.ezIdTemplate`${self.ezViewId}_EmployeeClockOutButton`,
            EzElementEventName.CLICK,
            EzSelectedEmployeeView.ezApiName);

        ezApi.ezclocker.ezEventEngine.ezUnwantElementEvent(
            ezApi.ezIdTemplate`${self.ezViewId}_FilterTimeEntriesButton`,
            EzElementEventName.CLICK,
            EzSelectedEmployeeView.ezApiName);

        ezApi.ezclocker.ezEventEngine.ezUnwantElementEvent(
            ezApi.ezIdTemplate`${self.ezViewId}_AddTimeEntryButton`,
            EzElementEventName.CLICK,
            EzSelectedEmployeeView.ezApiName);

        ezApi.ezclocker.ezEventEngine.ezUnwantElementEvent(
            ezApi.ezIdTemplate`${self.ezViewId}_ReInviteEmployeeButton`,
            EzElementEventName.CLICK,
            EzSelectedEmployeeView.ezApiName);

        ezApi.ezclocker.ezEventEngine.ezUnwantElementEvent(
            ezApi.ezIdTemplate`${self.ezViewId}_DeleteEmployeeButton`,
            EzElementEventName.CLICK,
            EzEmployeeDisplayController.ezApiName);
    }
}



export {
    EzSelectedEmployeeView
};

