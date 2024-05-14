import { EzElementEventName } from '/ezlibrary/EzElementEventName.js';

/**
    Represents a week within a schedule.
 */
class EzScheduleWeek {
    constructor(startDayOfWeek, momentInWeek) {
        this.ezTypeName = 'EzScheduleWeek';
        this.ezStartDayOfWeek = ezApi.ezIsNumber(startDayOfWeek)
            ? startDayOfWeek
            : 0;

        this.ezMomentInWeek = ezApi.ezIsValid(momentInWeek)
            ? momentInWeek
            : ezApi.ezclocker.ezDateTime.ezNow();

        this.ezDays = this.ezCalculateDays();
    }

    /**
        @protected
        Calculates the days for the week from the provided startDayOfWeek and momentInWeek
     */
    ezCalculateDays() {
        let cDay = this.ezStartDayOfWeek;
        let cMoment = ezApi.ezclocker.ezDateTime.ezSetMomentStartOfDay(this.ezMomentInWeek).day(cDay);

        let days = [];
        for (let dCount = 1; dCount < 8; dCount++) {
            days.push({
                day: cMoment.day(),
                dayName: ezApi.ezclocker.ezDateTime.ezToDayNameDisplay(cMoment),
                dayMoment: ezApi.ezclocker.ezDateTime.ezMomentWithPTZ(cMoment),
                schedules: {},
                timeOffs: {},
                employeeSchedule: {}
            });

            cMoment = cMoment.add(1, 'days');
        }

        return days;
    }

    ezRenderWeekHeader(parentId) {
        if (!ezApi.ezStringHasLength(parentId)) {
            throw ezApi.ezBadParam('', this.ezTypeName, 'ezRender');
        }

        let daysHtml = '';
        for (let dayIndex = 0; dayIndex < this.ezDays.length; dayIndex++) {
            daysHtml = ezApi.ezTemplate`${daysHtml}
                <div id="EzScheduleWeek_${dayIndex}}" class="ezScheduleWeekDayHeader">
                    <div id="EzScheduleWeek_DayName" class="ezScheduleWeekDayName">
                        ${this.ezDays[dayIndex].dayName}
                    </div>
                    <div id="EzScheduleWeek_DayDate" class="ezScheduleWeekDayDate">
                        ${ezApi.ezclocker.ezDateTime.ezToDisplayDate(this.ezDays[dayIndex].dayMoment)}
                    </div>
                </div>`;
        }

        ezUi.ezContent(parentId, ezApi.ezTemplate`
            <style>
                .ezWeekScheduleContainer {
                    display: grid;
                    grid-row-gap: 0;
                    grid-column-gap: 0;
                    grid-template-columns: auto 11% 11% 11% 11% 11% 11% 11% 8%;
                    margin: 2px;
                    background-color: var(--ezClockerNavy);
                    color: var(--ezClockerWhite);
                    font-size: 12pt;
                    border-bottom-color: var(--ezClockerGray);
                    border-bottom-style: solid;
                    border-bottom-width: 2px;
                }

                .ezScheduleWeekEmployeeNameHeader {
                    display: grid;
                    justify-content: left;
                    align-content: center;
                    grid-template-columns: auto;
                    grid-row-gap: 4px;
                    row-gap: 4px;
                    grid-column-gap: 4px;
                    column-gap: 4px;
                    padding: 4px;
                    border-color: var(--ezClockerGray);
                    border-style: solid;
                    border-width: 1px;
                }

                .ezScheduleWeekDayHeader {
                    display: grid;
                    justify-content: center;
                    align-content: center;
                    grid-row-gap: 4px;
                    row-gap: 4px;
                    grid-column-gap: 4px;
                    column-gap: 4px;
                    padding: 4px;
                    border-color: var(--ezClockerGray);
                    border-style: solid;
                    border-width: 1px;
                    border-left-style: none;
                }

                .ezScheduleWeekDayName {
                    text-align: center;
                }

                .ezScheduleWeekDayDate {
                    text-align: center;
                    font-size: 10pt;
                }

                .ezScheduleWeekTotalHoursHeader {
                    display: grid;
                    justify-content: center;
                    align-content: center;
                    grid-template-columns: auto;
                    grid-row-gap: 4px;
                    row-gap: 4px;
                    grid-column-gap: 4px;
                    column-gap: 4px;
                    padding: 4px;
                    border-color: var(--ezClockerGray);
                    border-style: solid;
                    border-width: 1px;
                    border-left-style: none;
                }
                
                .ezScheduleBox {
                    display: inline-block;
                    background-color: var(--ezClockerWhite);
                    color: var(--ezClockerBlack);
                    font-size: 12pt;
                    border-color: var(--ezClockerGray);
                    border-style: solid;
                    border-width: 2px;
                    box-shadow: 0 0 4px 2px rgba(109, 110, 112, 0.5);
                    cursor: pointer;
                }                
                .ezScheduleBoxHeader {
                    display: grid;
                    grid-row-gap: 4px;
                    row-gap: 4px;
                    grid-column-gap: 4px;
                    grid-template-columns: auto 28px;
                    grid-template-rows: auto;
                    justify-content: center;
                    align-content: center;
                    column-gap: 4px;
                    padding: 4px;
                    background-color: var(--ezClockerNavy);
                    color: var(--ezClockerWhite);
                }                
                .ezScheduleLocationName {
                    display: grid;
                    justify-content: left;
                    align-content: center;
                    font-size: 10pt;
                }                
                .ezScheduleBoxContents {
                    padding: 4px;
                    background-color: var(--ezClockerWhite);
                    color: var(--ezClockerBlack);
                    text-align: center;
                }
                
                .ezTimeOffBox {
                    display: inline-block;
                    background-color: var(--ezClockerWhite);
                    color: var(--ezClockerBlack);
                    font-size: 12pt;
                    border-color: var(--ezClockerGray);
                    border-style: solid;
                    border-width: 2px;
                    cursor: pointer;
                }                
                .ezTimeOffBoxHeader {
                    display: grid;
                    grid-row-gap: 4px;
                    row-gap: 4px;
                    grid-column-gap: 4px;
                    grid-template-columns: auto;
                    grid-template-rows: auto;
                    justify-content: center;
                    align-content: center;
                    column-gap: 4px;
                    padding: 4px;
                    background-color: var(--ezClockerNavy);
                    color: var(--ezClockerWhite);
                }                
                .ezTimeOffRequestTypeName {
                    display: grid;
                    justify-content: center;
                    align-content: center;
                    font-size: 12pt;
                }                
                .ezTimeOffBoxContents {
                    padding: 4px;
                    background-color: var(--ezClockerWhite);
                    color: var(--ezClockerBlack);
                    text-align: center;
                }
                .ezTimeOffActionButtons {
                    margin-top: 4px;
                }

                .ezPendingTimeOffHeader {
                    background-color: var(--ezClockerSilver);
                    color: var(--ezClockerBlack);
                }
                .ezApprovedTimeOffHeader {
                    background-color: var(--ezClockerGreen);
                    color: var(--ezClockerWhite);
                }
                .ezDeniedTimeOffHeader {
                    background-color: var(--ezClockerErrorRed);
                    color: var(--ezClockerBlack);
                }
                .ezIgnoreTimeOffHeader {
                    background-color: var(--ezClockerOffWhite);
                    color: var(--ezClockerStone);
                }
                
                .ezTimeOffContent {
                    color: var(--ezClockerBlack); 
                }
                .ezTimeOffIgnoredContent {
                    color: var(--ezClockerStone);
                }
            </style>
            <div id="EzScheduleWeek_${ezApi.ezclocker.ezDateTime.ezToIso(this.ezMomentInWeek)}" 
                class="ezWeekScheduleContainer">
                <div id="EzScheduleWeek_NameColHeader" class="ezScheduleWeekEmployeeNameHeader">
                    <div>Employee</div>
                </div>
                ${daysHtml}
                <div id="EzScheduleWeek_HoursColHeader" class="ezScheduleWeekTotalHoursHeader">
                    <div>Hours</div>
                </div>
            </div>`);
    }

    ezBuildEmployeeWeekSchedule(employees, schedules, timeOffs) {
        this.ezProcessEmployeeSchedules(schedules);
        this.ezProcessEmployeeTimeOffs(timeOffs);

        let employeeScheduleHtml = '';
        for (let dayIndex = 0; dayIndex < this.ezDays.length; dayIndex++) {
            let daySchedules = this.ezDays[dayIndex].schedules;
            let dayTimeOffs = this.ezDays[dayIndex].timeOffs;

            let schedulesHtml = {};
            let timeOffsHtml = {};
            if (ezApi.ezArrayHasLength(daySchedules) || ezApi.ezArrayHasLength(dayTimeOffs)) {
                employees.forEach((employee) => {
                    daySchedules.forEach((schedule) => {
                        schedulesHtml[employee.id.toString()] += self.ezBuildScheduleBox(schedule);
                    });
                    dayTimeOffs.forEach((timeOff) => {
                        timeOffsHtml[employee.id.toString()] += self.ezBuildTimeOffBox(timeOff);
                    });

                    this.ezDays[dayIndex].employeeSchedule[employee.id.toString()] = ezApi.ezTemplate`
                        ${employeeScheduleHtml}
                        <div id="EzScheduleWeek_Employee_${employee.id}_Day_${dayIndex}}" 
                            class="ezScheduleWeekDayHeader">
                            ${schedulesHtml[employee.id.toString()]}
                            ${timeOffsHtml[employee.id.toString()]}
                        </div>`;

                    schedulesHtml[employee.id.toString()] = {};
                    timeOffsHtml[employee.id.toString()] = {};
                });
            } else {
                this.ezDays[dayIndex].employeeSchedule[employee.id.toString()] = ezApi.ezTemplate`
                    ${employeeScheduleHtml}
                    <div id="EzScheduleWeek_Employee_${employee.id}_Day_${dayIndex}}" class="ezScheduleWeekDayHeader">
                        OFF
                    </div>`;
            }
        }

        return ezApi.ezTemplate`
            <div id="EzScheduleWeek_EmployeeRow_${employeeId}">
                <div id="EzScheduleWeek_EmployeeName_${employee.id}">
                    ${employee.name}
                </div>
                ${employeeScheduleHtml}
            </div>`;
    }

    /**
        @public
        Builds the HTML for a schedule box.
        @param {Object} schedule
        @param {Object} location
        @returns {String}
     */
    ezBuildScheduleBox(schedule, location) {
        let scheduleBoxId = ezApi.ezIdTemplate`EzScheduleWeek_ScheduleBox_ScheduleId${schedule.id}`;

        let startTime = ezApi.ezclocker.ezDateTime.ezTimeString(
            ezApi.ezclocker.ezDateTime.ezFromIso(schedule.pendingStartDateTimeIso8601));
        let endTime = ezApi.ezclocker.ezDateTime.ezTimeString(
            ezApi.ezclocker.ezDateTime.ezFromIso(schedule.pendingEndDateTimeIso8601));

        return ezApi.ezTemplate`
            <div id="${scheduleBoxId}" title="Click to edit" class="ezScheduleBox" 
                onclick="ezApi.ezclocker.ezScheduleEventHandler.ezHandleEditTimeOff('${scheduleBoxId}', '${schedule.id}')">
                <div id="${scheduleBoxId}_Header" class="ezScheduleBoxHeader">
                    <div class="ezScheduleLocationName" title="${location.name}">${location.name}</div>
                    <button id="${scheduleBoxId}_DeleteSchedule" class="ezDeleteEditButton" title="Delete Shift"
                        onclick="ezApi.ezclocker.ezScheduleEventHandler.ezHandleDeleteSchedule('${scheduleBoxId}', '${schedule.id}')">
                        <img id="${scheduleBoxId}_DelImg" class="ezEditButtonImage" alt="Delete Shift" 
                            title="Delete Shift" src="/public/images/freepik/delete/del1-white.svg">
                    </button>
                </div>
                <div id="${scheduleBoxId}_Dates" class="ezScheduleBoxContents">
                    <div>
                        ${startTime}
                    </div>
                    <div>to</div>
                    <div>
                        ${endTime}
                    </div>
                </div>
            </div>`;
    }

    /**
        @public
        Builds the HTML for a schedule time off box.
        @param {Object} timeOff
        @returns {String}
     */
    ezBuildTimeOffBox(timeOff) {
        let timeOffBoxId = ezApi.ezIdTemplate`EzScheduleWeek_TimeOffBox_TimeOffId${timeOff.id}`;

        let startTime = ezApi.ezclocker.ezDateTime.ezTimeString(
            ezApi.ezclocker.ezDateTime.ezFromIso(timeOff.requestStartDateIso));
        let endTime = ezApi.ezclocker.ezDateTime.ezTimeString(
            ezApi.ezclocker.ezDateTime.ezFromIso(timeOff.requestEndDateIso));

        let requestTimeOffContent;
        if ('PENDING' === timeOff.requestStatus) {
            requestTimeOffContent = ezApi.ezIsTrue(timeOff.allDay)
                ? ezApi.ezTemplate`<div>All Day</div>`
                : ezApi.ezTemplate`
                    <div>${startTime}</div>
                    <div>to</div>
                    <div>${endTime}</div>`;
        } else if ('APPROVED' === timeOff.requestStatus) {
            requestTimeOffContent = ezApi.ezIsTrue(timeOff.allDay)
                ? ezApi.ezTemplate`
                    <div>All Day</div>
                    <div style="margin-top:4px;color:var(--ezClockerGreen);">Approved</div>`
                : ezApi.ezTemplate`
                    <div>${startTime}</div>
                    <div>to</div>
                    <div>${endTime}</div>
                    <div style="margin-top:4px;color:var(--ezClockerGreen);">Approved</div>`;
        } else if ('EXPIRED' === timeOff.requestStatus) {
            requestTimeOffContent = '<div class="ezText-underline">EXPIRED</div>';
        } else if ('DENIED' === timeOff.requestStatus) {
            requestTimeOffContent = ezApi.ezIsTrue(timeOff.allDay)
                ? ezApi.ezTemplate`
                    <div>All Day</div>
                    <div style="margin-top:4px;color:var(--ezClockerAlertRed);">Denied</div>`
                : ezApi.ezTemplate`
                    <div class="ezText-strike-out">${startTime}</div>
                    <div class="ezText-strike-out">to</div>
                    <div class="ezText-strike-out">${endTime}</div>
                    <div style="margin-top:4px;color:var(--ezClockerAlertRed);">Denied</div>`;
        } else if ('CANCELED' === timeOff.requestStatus) {
            requestTimeOffContent = '<div class="ezText-underline">CANCELED<div>';
        }

        let timeOffStatusStyle = this.ezDetermineTimeOffHeaderColor(timeOff.requestStatus);
        let timeOffContentStyle = this.ezDetermineTimeOffContentStyle(timeOff.requestStatus);
        
        let disableApprove = 'APPROVED' === timeOff.requestStatus
            ? 'disabled'
            : '';
        let disableApproveImg = 'APPROVED' === timeOff.requestStatus
            ? 'style="opacity:0.5;cursor:default;"'
            : '';
        let disableDeny = 'DENIED' === timeOff.requestStatus
            ? 'disabled'
            : '';
        let disableDenyImg = 'DENIED' === timeOff.requestStatus
            ? 'style="opacity:0.5;cursor:default;"'
            : '';
        let actionButtons = 'EXPIRED' === timeOff.requestStatus || 'CANCELED' === timeOff.requestStatus
            ? ''
            : ezApi.ezTemplate`
                <div class="ezTimeOffActionButtons">
                    <button id="${timeOffBoxId}_ApproveTimeOff" class="ezNavyActionButton" title="Approve time off"
                        onclick="ezApi.ezclocker.ezScheduleEventHandler.ezApproveTimeOff('${timeOffBoxId}', '${timeOff.id}')"
                        ${disableApprove}>
                        <img id="${timeOffBoxId}_ApproveImg" class="ezEditButtonImage" alt="Approve time off"
                            title="Approved time off" src="/public/images/icons/white-green-check.svg"
                            ${disableApproveImg}>
                    </button>
                    <button id="${timeOffBoxId}_DenyTimeOff" class="ezNavyActionButton" title="Deny time off"
                        onclick="ezApi.ezclocker.ezScheduleEventHandler.ezHandleDeleteSchedule('${timeOffBoxId}', '${timeOff.id}')"
                        ${disableDeny}>
                        <img id="${timeOffBoxId}_DenyImg" class="ezEditButtonImage" alt="Deny time off"
                            title="Deny time off" src="/public/images/icons/teal-deny.svg"
                            ${disableDenyImg}>
                    </button>
                </div>`;

        return ezApi.ezTemplate`
            <div id="${timeOffBoxId}" title="Click to edit" class="ezTimeOffBox" 
                onclick="ezApi.ezclocker.ezScheduleEventHandler.ezHandleEditTimeOff('${timeOffBoxId}', '${timeOff.id}')">
                <div id="${timeOffBoxId}_Header" class="ezTimeOffBoxHeader ${timeOffStatusStyle}">
                    <div class="ezTimeOffRequestTypeName">
                        ${this.ezGetTimeOffRequestDisplayName(timeOff.requestType)}
                    </div>
                </div>
                <div id="${timeOffBoxId}_Dates" class="ezTimeOffBoxContents ${timeOffContentStyle}">
                    ${requestTimeOffContent}
                    ${actionButtons}
                </div>
            </div>`;
    }
    
    /**
        @protected
        Returns the style to use based on the provided requestStatus
        @param {String} requestStatus
        @returns {String}
     */
    ezDetermineTimeOffContentStyle(requestStatus) {
        switch (requestStatus) {
            case 'PENDING':
                return 'ezTimeOffContent';
            case 'APPROVED':
                return 'ezTimeOffContent';
            case 'EXPIRED':
            case 'DENIED':
            case 'CANCELED':
            default:
                return 'ezTimeOffIgnoredContent';
        }
    }

    /**
        @protected
        Returns the style to use based on the provided requestStatus
        @param {String} requestStatus
        @returns {String}
     */
    ezDetermineTimeOffHeaderColor(requestStatus) {
        switch (requestStatus) {
            case 'PENDING':
                return 'ezPendingTimeOffHeader';
            case 'APPROVED':
                return 'ezApprovedTimeOffHeader';
            case 'DENIED':
                return 'ezDeniedTimeOffHeader';
            case 'EXPIRED':
            case 'CANCELED':
            default:
                return 'ezIgnoreTimeOffHeader';
        }
    }

    /**
        @protected
        Returns the display name for the time off request type
        @param {String} requestType
        @returns {String}
     */
    ezGetTimeOffRequestDisplayName(requestType) {
        if ('PTO' === requestType) {
            return 'PTO';
        } else if ('SICK' === requestType) {
            return 'Sick';
        } else if ('HOLIDAY' === requestType) {
            return 'Holiday';
        }

        return 'Unpaid';
    }

    /**
        @protected
        Processes the schedules for employees for the week grouping them by employee and day.
        @param {Array} schedules
     */
    ezProcessEmployeeSchedules(schedules) {
        schedules.forEach((schedule) => {
            let startMoment = ezApi.ezclocker.ezDateTime.ezSetMomentStartOfDay(
                ezApi.ezclocker.ezDateTime.ezFromIso(schedule.startDateTimeIso8601));

            if (this.ezDays[0].dayMoment.isSame(startMoment)) {
                this.ezDays[0].schedules[schedule.employeeId.toString()].push(schedule);
            } else if (this.ezDays[1].dayMoment.isSame(startMoment)) {
                this.ezDays[1].schedules[schedule.employeeId.toString()].push(schedule);
            } else if (this.ezDays[2].dayMoment.isSame(startMoment)) {
                this.ezDays[2].schedules[schedule.employeeId.toString()].push(schedule);
            } else if (this.ezDays[3].dayMoment.isSame(startMoment)) {
                this.ezDays[3].schedules[schedule.employeeId.toString()].push(schedule);
            } else if (this.ezDays[4].dayMoment.isSame(startMoment)) {
                this.ezDays[4].schedules[schedule.employeeId.toString()].push(schedule);
            } else if (this.ezDays[5].dayMoment.isSame(startMoment)) {
                this.ezDays[5].schedules[schedule.employeeId.toString()].push(schedule);
            } else if (this.ezDays[6].dayMoment.isSame(startMoment)) {
                this.ezDays[6].schedules[schedule.employeeId.toString()].push(schedule);
            }
        });
    }

    /**
        @protected
        Processes the time offs for employees for the week grouping by employee and day.
        @param {Array} timeOffs
     */
    ezProcessEmployeeTimeOffs(timeOffs) {
        timeOffs.forEach((timeOff) => {
            let startMoment = ezApi.ezclocker.ezDateTime.ezSetMomentStartOfDay(
                ezApi.ezclocker.ezDateTime.ezFromIso(timeOff.startDateTimeIso8601));

            if (this.ezDays[0].dayMoment.isSame(startMoment)) {
                this.ezDays[0].timeOffs.push(timeOff);
            } else if (this.ezDays[1].dayMoment.isSame(startMoment)) {
                this.ezDays[1].timeOffs[timeOff.employeeId.toString()].push(timeOff);
            } else if (this.ezDays[2].dayMoment.isSame(startMoment)) {
                this.ezDays[2].timeOffs[timeOff.employeeId.toString()].push(timeOff);
            } else if (this.ezDays[3].dayMoment.isSame(startMoment)) {
                this.ezDays[3].timeOffs[timeOff.employeeId.toString()].push(timeOff);
            } else if (this.ezDays[4].dayMoment.isSame(startMoment)) {
                this.ezDays[4].timeOffs[timeOff.employeeId.toString()].push(timeOff);
            } else if (this.ezDays[5].dayMoment.isSame(startMoment)) {
                this.ezDays[5].timeOffs[timeOff.employeeId.toString()].push(timeOff);
            } else if (this.ezDays[6].dayMoment.isSame(startMoment)) {
                this.ezDays[6].timeOffs[timeOff.employeeId.toString()].push(timeOff);
            }
        });
    }
}
EzScheduleWeek.ezEventNames = {
    onAddSchedule: 'onEzScheduleWeekAddSchedule',
    onEditSchedule: 'onEzScheduleWeekEditSchedule',
    onDeleteSchedule: 'onEzScheduleWeekDeleteSchedule',
    onEditTimeOff: 'onEzScheduleWeekEditTimeOff',
    onAddTimeOff: 'onEzScheduleWeekAddTimeOff'
};

export {
    EzScheduleWeek
};