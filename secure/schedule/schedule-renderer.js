import {
    EzException,
    EzBadParamException
} from '/ezlibrary/exceptions/EzExceptions.js';

import {
    EzObject,
    EzBoolean,
    EzNumber,
    EzString,
    EzArray,
    EzHtml,
    EzPromise,
    EzJson
} from '/ezlibrary/helpers/EzHelpers.js';

import {
    EzRegistrationState,
    EzTimeOffType,
    EzTimeOffStatus
} from '/ezlibrary/enums/EzEnumerations.js';

import { EzClass } from '/ezlibrary/EzClass.js';

import { EzUrlHelper } from '/public/javascript/common/ezclocker-url-helper2.js';
import { EzHttpHelper } from '/public/javascript/common/ezclocker-http-helper.js';
import { EzNavigation } from '/public/javascript/common/ezclocker-navigation-helper.js';

import { EzClockerContext } from '/ezlibrary/EzClockerContext/ez-context.js';

import { EzLocationService } from '/secure/javascript/services/ezclocker-location-service.js';

import { EzScheduleRenderContext } from '/ezlibrary/entities/EzScheduleRenderContext.js';
import { EzScheduleDayInfo } from '/ezlibrary/entities/EzScheduleDayInfo.js';

import { EzUI } from '/public/javascript/common/ezui.js';

import { EzShiftEditorDialog } from '/secure/schedule/EzShiftEditorDialog.js';

/**
 * @class
 * @extends {EzClass}
 * @description
 * Renders schedules
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 * Import with:
 *     import { EzScheduleRenderer } from '/secure/schedule/schedule-renderer.js';
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 * Singleton instance ready for use when the below evaluates to true:
 *     globalThis.ezApi.ezclocker[EzScheduleRenderer.ezApiName] &&
 *     globalThis.ezApi.ezclocker[EzScheduleRenderer.ezApiName].ready
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 * Listen to onReady event:
 *     document.addEventListener(
 *         EzScheduleRenderer.ezEventNames.onReady,
 *         this.#ezRegistrator);
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 * Singleton Instance Reference:
 *     ezApi.ezclocker.ezScheduleRenderer
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 */
export class EzScheduleRenderer extends EzClass {
    /**
     * @private @field
     * Stores if the schedule is in employee mode
     * @type {boolean}
     */
    #employeeMode = false;
    /**
     * @public @property @getter
     * Gets if the schedule is in employee mode
     * @returns {boolean}
     */
    get employeeMode() {
        return this.#employeeMode;
    }
    /**
     * @public @property @setter
     * Sets if the schedule is in employee mode
     * @param {boolean} employeeMode
     */
    set employeeMode(employeeMode) {
        this.#employeeMode = EzBoolean.isTrue(employeeMode);
    }

    /**
     * @public @property @getter
     * Gets the available employees
     * Returns the array of all employees if rendering an employer schedule
     * Returns an array of one, the active employee, if in employee mode
     * @returns {array}
     */
    get ezEmployees() {
        return EzBoolean.isFalse(this.employeeMode)
            ? EzArray.arrayOrEmpty(globalThis.ezApi.ezclocker.ezClockerContext.ezGetSelectedEmployerAccountEmployees())
            : [ezApi.ezclocker.ezClockerContext.ezGetActiveEmployee()];
    }

    /**
     * @private @field
     * Stores the configured first day of the week
     * @type {number}
     */
    #firstDayOfWeek = 1;
    /**
     * @public @property @getter
     * Gets the configured first day of the week
     * @returns {number}
     */
    get firstDayOfWeek() {
        return this.#firstDayOfWeek;
    }
    /**
     * @public @property @setter
     * Sets the configured first day of the week
     * @param {number} employeeMode
     */
    set firstDayOfWeek(firstDayOfWeek) {
        this.#firstDayOfWeek = EzNumber.numberOrDefault(firstDayOfWeek, 1);
    }

    /**
     * @private @field
     * Stores day information array
     * @type {array}
     */
    #dayInfo = [];
    /**
     * @public @property @getter
     * Gets day information array
     * @returns {array}
     */
    get dayInfo() {
        return this.#dayInfo;
    }
    /**
     * @public @property @setter
     * Sets day information array
     * @param {array} dayInfo
     */
    set dayInfo(dayInfo) {
        this.#dayInfo = EzArray.arrayOrEmpty(dayInfo);
    }

    /**
     * @private @field
     * Stores schedules by employee id array
     * @type {array}
     */
    #schedulesByEmployeeId = [];
    /**
     * @public @property @getter
     * Gets schedules by employee id array
     * @returns {array}
     */
    get schedulesByEmployeeId() {
        return this.#schedulesByEmployeeId;
    }
    /**
     * @public @property @setter
     * Sets schedules by employee id array
     * @param {array} schedulesByEmployeeId
     */
    set schedulesByEmployeeId(schedulesByEmployeeId) {
        this.#schedulesByEmployeeId = EzArray.arrayOrEmpty(schedulesByEmployeeId);

        EzScheduleRenderer.ezInstance.ezIndexSchedulesByEmployeeId();
    }

    /**
     * @private @field
     * Stores schedules by date array
     * @type {array}
     */
    #schedulesByDate = [];
    /**
     * @public @property @getter
     * Gets schedules by date array
     * @returns {array}
     */
    get schedulesByDate() {
        return this.#schedulesByDate;
    }
    /**
     * @public @property @setter
     * Sets schedules by date array
     * @param {array} schedulesByDate
     */
    set schedulesByDate(schedulesByDate) {
        this.#schedulesByDate = EzArray.arrayOrEmpty(schedulesByDate);
    }

    /**
     * @private @field
     * Stores time offs by employee id array
     * @type {array}
     */
    #timeOffsByEmployeeId = [];
    /**
     * @public @property @getter
     * Gets time offs by employee id array
     * @returns {array}
     */
    get timeOffsByEmployeeId() {
        return this.#timeOffsByEmployeeId;
    }
    /**
     * @public @property @setter
     * Sets time offs by employee id array
     * @param {array} timeOffsByEmployeeId
     */
    set timeOffsByEmployeeId(timeOffsByEmployeeId) {
        this.#timeOffsByEmployeeId = EzArray.arrayOrEmpty(timeOffsByEmployeeId);
    }

    /**
     * @private @field
     * Stores time offs by date array
     * @type {array}
     */
    #timeOffsByDate = [];
    /**
     * @public @property @getter
     * Gets time offs by date array
     * @returns {array}
     */
    get timeOffsByDate() {
        return this.#timeOffsByDate;
    }
    /**
     * @public @property @setter
     * Sets time offs by date array
     * @param {array} timeOffsByDate
     */
    set timeOffsByDate(timeOffsByDate) {
        this.#timeOffsByDate = EzArray.arrayOrEmpty(timeOffsByDate);
    }

    /**
     * @private @field
     * Stores the selected week moment
     * @type {moment}
     */
    #ezSelectedWeekMoment = null;
    /**
     * @public @property @getter
     * Gets the selected week moment
     * @returns {moment}
     */
    get ezSelectedWeekMoment() {
        return this.#ezSelectedWeekMoment;
    }
    /**
     * @public @property @setter
     * Sets the selected week moment
     * @param {moment} ezSelectedWeekMoment
     */
    set ezSelectedWeekMoment(ezSelectedWeekMoment) {
        this.#ezSelectedWeekMoment = EzObject.assignOrNull(ezSelectedWeekMoment);
    }

    /**
     * @private @field
     * Stores employee schedules object
     * @type {object}
     */
    #ezEmployeeSchedules = {};
    /**
     * @public @property @getter
     * Gets employee schedules object
     * @returns {object}
     */
    get ezEmployeeSchedules() {
        return this.#ezEmployeeSchedules;
    }
    /**
     * @public @property @setter
     * Sets employee schedules object
     * @param {object} ezEmployeeSchedules
     */
    set ezEmployeeSchedules(ezEmployeeSchedules) {
        this.#ezEmployeeSchedules = EzObject.assignOrNull(ezEmployeeSchedules);
    }

    /**
     * @public @method
     * Initializes EzScheduleRenderer
     * @returns {EzScheduleRenderer}
     */
    ezInit() {
        return EzScheduleRenderer.ezInstance;
    }

    /**
     * @protected @method
     * Indexes the schedules by employee id for easy lookup.
     */
    ezIndexSchedulesByEmployeeId() {
        EzScheduleRenderer.ezInstance.ezEmployeeSchedules = {};

        EzScheduleRenderer.ezInstance.schedulesByEmployeeId.forEach(
            (schedule) => {
                const employeeId = schedule.employeeId.toString();

                if (!EzObject.hasProperty(EzScheduleRenderer.ezInstance.ezEmployeeSchedules, 'employeeId')) {
                    EzScheduleRenderer.ezInstance.ezEmployeeSchedules[employeeId] = [];
                }

                EzScheduleRenderer.ezInstance.ezEmployeeSchedules[employeeId].push(schedule);
            });
    }

    /**
     * @protected @method
     * For employer selected weekmoment: ezApi.ezclocker.ezEmployerScheduleController.ezGetSelectedWeekMoment()
     * Draws the schedules on the UX
     * @param {Array} employees
     * @param {Number} firstDayOfWeek
     * @param {Number} schedulesByEmployeeId
     * @param {Object} schedulesByDate
     * @param {Boolean} isEmployeeDashboard
     * @param {Object} timeOffsByEmployeeId
     * @param {Object} timeOffsByDate
     */
    ezRenderSchedules(scheduleWeekMoment, firstDayOfWeek, schedulesByEmployeeId, schedulesByDate, isEmployeeDashboard, timeOffsByEmployeeId, timeOffsByDate) {
        EzScheduleRenderer.ezInstance.firstDayOfWeek = firstDayOfWeek;

        EzScheduleRenderer.ezInstance.ezEmployeeMode = EzBoolean.isTrue(isEmployeeDashboard);

        EzScheduleRenderer.ezInstance.schedulesByEmployeeId = schedulesByEmployeeId;

        EzScheduleRenderer.ezInstance.schedulesByDate = schedulesByDate;

        EzScheduleRenderer.ezInstance.timeOffsByEmployeeId = timeOffsByEmployeeId;

        EzScheduleRenderer.ezInstance.timeOffsByDate = timeOffsByDate;

        const selectedDate = ezApi.ezclocker.ezDateTime.ezMomentFromDatePickerStartOfDay('scheduleWeek');

        if (!EzObject.isValid(scheduleWeekMoment)) {
            scheduleWeekMoment = EzBoolean.isFalse(EzScheduleRenderer.ezInstance.ezEmployeeMode)
                ? ezApi.ezclocker.ezOptionsService.ezOptionValueToMoment(
                    ezApi.ezclocker.ezClockerContext.ezReadActiveEmployeOption(
                        ezApi.ezclocker.ezOptionsService.EZOPTION_SELECTED_SCHEDULE_WEEK,
                        ezApi.ezclocker.ezDateTime.ezToIso(selectedDate),
                        ezApi.ezclocker.ezDateTime.ezToIso(selectedDate)))
                : ezApi.ezclocker.ezOptionsService.ezOptionValueToMoment(
                    ezApi.ezclocker.ezClockerContext.ezGetEmployeeOption(
                        ezApi.ezclocker.ezOptionsService.EZOPTION_SELECTED_SCHEDULE_WEEK,
                        ezApi.ezclocker.ezDateTime.ezToIso(selectedDate),
                        ezApi.ezclocker.ezDateTime.ezToIso(selectedDate)));
        }

        EzScheduleRenderer.ezInstance.ezSelectedWeekMoment = scheduleWeekMoment;

        ezApi.ezclocker.ezUi.ezContent(
            '_CalendarContainer',
            EzHtml.build`
                <table
                    id="create_table"
                    class="calendarTable">
                    <tbody
                        id="_CreateTableBody">
                    </tbody>
                </table>`);

        EzScheduleRenderer.ezInstance.ezRenderCalendarTitle();

        EzScheduleRenderer.ezInstance.ezRenderEmployeeRows();
    }

    /**
     * @protected @method
     * Renders the available employees as rows
     */
    ezRenderEmployeeRows() {
        if (!EzArray.hasLength(EzScheduleRenderer.ezInstance.ezEmployees)) {
            // nothing to render
            return;
        }

        let employeeTotalMinutes = 0;

        for (let employeeIndex = 0; employeeIndex < EzScheduleRenderer.ezInstance.ezEmployees.length; employeeIndex++) {
            const employee = EzScheduleRenderer.ezInstance.ezEmployees[employeeIndex];

            const employeeRowId = `_employeeRow_${employeeIndex}`;

            EzScheduleRenderer.ezInstance.ezRenderScheduleNameCell(
                employee,
                employeeRowId);

            // Render the row cells
            EzScheduleRenderer.ezInstance.ezRenderDayCells(
                employee,
                employeeIndex,
                employeeRowId);

            employeeTotalMinutes += EzNumber.numberOrZero(EzScheduleRenderer.ezInstance.ezEmployees[employeeIndex].ezSelectedScheduleWeekTotalMinutes);

            EzScheduleRenderer.ezInstance.ezRenderDayTotalHoursCell(
                employeeRowId,
                EzScheduleRenderer.ezInstance.ezEmployees[employeeIndex].ezSelectedScheduleWeekTotalMinutes);
        }

        EzScheduleRenderer.ezInstance.ezRenderScheduleTotalHours(
            EzScheduleRenderer.ezInstance.ezBuildTimeTotal(employeeTotalMinutes));
    }

    /**
     * @protected @method
     * Draws the day cells
     * @param {object} employee
     * @param {number} employeeIndex,
     * @param {string} employeeRowId
     */
    ezRenderDayCells(employee, employeeIndex, employeeRowId) {
        if (!EzObject.isValid(employee)) {
            throw new EzBadParamException(
                'employee',
                EzScheduleRenderer.ezInstance,
                EzScheduleRenderer.ezInstance.ezRenderDayCells);
        }
        if (!EzNumber.isNumber(employeeIndex)) {
            throw new EzBadParamException(
                'employeeIndex',
                EzScheduleRenderer.ezInstance,
                EzScheduleRenderer.ezInstance.ezRenderDayCells);
        }
        if (!EzString.hasLength(employeeRowId)) {
            throw new EzBadParamException(
                'employeeRowId',
                EzScheduleRenderer.ezInstance,
                EzScheduleRenderer.ezInstance.ezRenderDayCells);
        }

        // less than start day due to the increment that happens in for loop
        let currentDay = EzScheduleRenderer.ezInstance.firstDayOfWeek;

        // reset
        EzScheduleRenderer.ezInstance.ezEmployees[employeeIndex].ezSelectedScheduleWeekTotalMinutes = 0;

        const todayDateIso = ezApi.ezclocker.ezDateTime.ezToIsoDate(
            ezApi.ezclocker.ezDateTime.ezNow());

        for (const ezScheduleDayInfo of EzScheduleRenderer.ezInstance.dayInfo) {
            const employeeDayCellId = `${employeeRowId}_day_${currentDay}`;

            const cellStyle = ezApi.ezclocker.ezDateTime.ezToIsoDate(ezScheduleDayInfo.moment) === todayDateIso
                ? 'calendarTableScheduleCellToday'
                : 'calendarTableScheduleCell';

            ezApi.ezclocker.ezUi.ezAppendContent(
                employeeRowId,
                EzHtml.build`
                    <td
                        id="${employeeDayCellId}"
                        data-day-info-index="${ezScheduleDayInfo.ezDayInfoIndex}"
                        class="${cellStyle}">
                    </td>`);

            EzScheduleRenderer.ezInstance.ezRenderSchedulesForDay(
                new EzScheduleRenderContext(
                    employee.id,
                    employeeIndex,
                    employeeDayCellId,
                    currentDay,
                    ezScheduleDayInfo.ezDayInfoIndex
                ));

            currentDay = EzScheduleRenderer.ezInstance.ezGetNextDay(currentDay);
        }
    }

    /**
     * @protected @method
     * Renders the schedules cards for a day
     * @param {EzScheduleRenderContext} ezScheduleRenderContext
     * Total minutes for the day
     */
    ezRenderSchedulesForDay(ezScheduleRenderContext) {
        if (!EzObject.isValid(ezScheduleRenderContext)) {
            throw new EzBadParamException(
                'ezScheduleRenderContext',
                EzScheduleRenderer.ezInstance,
                EzScheduleRenderer.ezInstance.ezRenderSchedulesForDay);
        }
        if (!EzNumber.isNumber(ezScheduleRenderContext.employeeId)) {
            throw new EzBadParamException(
                'ezScheduleRenderContext.employeeId',
                EzScheduleRenderer.ezInstance,
                EzScheduleRenderer.ezInstance.ezRenderSchedulesForDay);
        }
        if (!EzNumber.isNumber(ezScheduleRenderContext.employeeIndex)) {
            throw new EzBadParamException(
                'ezScheduleRenderContext.employeeIndex',
                EzScheduleRenderer.ezInstance,
                EzScheduleRenderer.ezInstance.ezRenderSchedulesForDay);
        }
        if (!EzString.hasLength(ezScheduleRenderContext.employeeDayCellId)) {
            throw new EzBadParamException(
                'ezScheduleRenderContext.employeeDayCellId',
                EzScheduleRenderer.ezInstance,
                EzScheduleRenderer.ezInstance.ezRenderSchedulesForDay);
        }
        if (!EzNumber.isNumber(ezScheduleRenderContext.currentDay)) {
            throw new EzBadParamException(
                'ezScheduleRenderContext.currentDay',
                EzScheduleRenderer.ezInstance,
                EzScheduleRenderer.ezInstance.ezRenderSchedulesForDay);
        }
        if (!EzNumber.isNumber(ezScheduleRenderContext.ezDayInfoIndex)) {
            throw new EzBadParamException(
                'ezScheduleRenderContext.ezDayInfoIndex',
                EzScheduleRenderer.ezInstance,
                EzScheduleRenderer.ezInstance.ezRenderSchedulesForDay);
        }

        ezScheduleRenderContext = EzScheduleRenderer.ezInstance.ezRenderShiftSchedules(ezScheduleRenderContext);

        ezScheduleRenderContext = EzScheduleRenderer.ezInstance.ezRenderTimeOffSchedules(ezScheduleRenderContext);

        if (EzBoolean.isFalse(ezScheduleRenderContext.dayHasTimeOff) && EzBoolean.isFalse(ezScheduleRenderContext.dayHasSchedule)) {
            EzScheduleRenderer.ezInstance.ezRenderDayOffCell(ezScheduleRenderContext);
        } else if ((EzBoolean.isTrue(ezScheduleRenderContext.dayHasSchedule) || EzBoolean.isTrue(ezScheduleRenderContext.dayHasTimeOff)) &&
            (!EzBoolean.isTrue(ezScheduleRenderContext.hasAllDayTimeOff) && !EzBoolean.isTrue(EzScheduleRenderer.ezInstance.employeeMode))) {
                // Render the add shift button
                EzScheduleRenderer.ezInstance.ezRenderAddShiftButton(ezScheduleRenderContext);
            }
        }

    /**
     * @protected @method
     * Renders the time off schedule cards
     * @param {EzScheduleRenderContext} ezScheduleRenderContext
     * @returns {Object}
     * Returns the renderContext object
     */
    ezRenderTimeOffSchedules(ezScheduleRenderContext) {
        if (!EzObject.isValid(ezScheduleRenderContext)) {
            throw new EzBadParamException(
                'ezScheduleRenderContext',
                EzScheduleRenderer.ezInstance,
                EzScheduleRenderer.ezInstance.ezRenderTimeOffSchedules);
        }

        ezScheduleRenderContext.dayHasTimeOff = false;

        ezScheduleRenderContext.hasAllDayTimeOff = false;

        ezScheduleRenderContext.timeOff = null;

        ezScheduleRenderContext.sortedTimeOffIndex = -1;

        let totalTimeOffMinutesEmployeeForDay = 0;

        if (EzScheduleRenderer.ezInstance.timeOffsByEmployeeId.some(timeOff => timeOff.employeeId === ezScheduleRenderContext.employeeId)) {
            const timeOffsForEmployee = EzScheduleRenderer.ezInstance.ezGetEmployeeTimeOffsForDay(ezScheduleRenderContext);

            if (EzArray.hasLength(timeOffsForEmployee)) {
                for (const timeOff of timeOffsForEmployee) {
                    ezScheduleRenderContext.dayHasTimeOff = true;

                    ezScheduleRenderContext.timeOff = timeOff;

                    ezScheduleRenderContext.sortedTimeOffIndex = timeOff.sortedTimeOffIndex;

                    ezScheduleRenderContext.startMoment = timeOff.startMoment;

                    ezScheduleRenderContext.endMoment = timeOff.endMoment;

                    ezScheduleRenderContext.minutes = timeOff.totalMinutes;

                    totalTimeOffMinutesEmployeeForDay += timeOff.totalMinutes;

                    EzScheduleRenderer.ezInstance.ezRenderTimeOffBox(ezScheduleRenderContext);

                    ezScheduleRenderContext.hasAllDayTimeOff = ezScheduleRenderContext.hasAllDayTimeOff || EzBoolean.isTrue(timeOff.allDay);
                }
            }
        }

        EzScheduleRenderer.ezInstance.ezEmployees[ezScheduleRenderContext.employeeIndex]
            .ezSelectedScheduleWeekTotalTimeOffMinutes += totalTimeOffMinutesEmployeeForDay;

        EzScheduleRenderer.ezInstance.ezEmployees[ezScheduleRenderContext.employeeIndex]
            .ezSelectedScheduleWeekTotalMinutes += totalTimeOffMinutesEmployeeForDay;

        EzScheduleRenderer.ezInstance.dayInfo[ezScheduleRenderContext.ezDayInfoIndex].ezStoreTotalTimeOffMinutesForEmployeeId(
            ezScheduleRenderContext.employeeId,
            totalTimeOffMinutesEmployeeForDay);

        return ezScheduleRenderContext;
    }

    /**
     * @protected @method
     * Gets the array of time offs for a employee in a specific day
     * @param {EzScheduleRenderContext} ezScheduleRenderContext
     * @returns {array}
     */
    ezGetEmployeeTimeOffsForDay(ezScheduleRenderContext) {
        if (!EzObject.isValid(ezScheduleRenderContext)) {
            throw new EzBadParamException(
                'ezScheduleRenderContext',
                EzScheduleRenderer.ezInstance,
                EzScheduleRenderer.ezInstance.ezGetEmployeeTimeOffsForDay);
        }
        if (!EzNumber.isNumber(ezScheduleRenderContext.employeeId)) {
            throw new EzBadParamException(
                'ezScheduleRenderContext.employeeId',
                EzScheduleRenderer.ezInstance,
                EzScheduleRenderer.ezInstance.ezGetEmployeeTimeOffsForDay);
        }
        if (!EzNumber.isNumber(ezScheduleRenderContext.currentDay)) {
            throw new EzBadParamException(
                'ezScheduleRenderContext.currentDay',
                EzScheduleRenderer.ezInstance,
                EzScheduleRenderer.ezInstance.ezGetEmployeeTimeOffsForDay);
        }

        const employeeTimeOffsForDay = [];

        if (!EzArray.hasLength(EzScheduleRenderer.ezInstance.timeOffsByEmployeeId)) {
            return employeeTimeOffsForDay;
        }

        for (let sortedTimeOffIndex = 0; sortedTimeOffIndex < EzScheduleRenderer.ezInstance.timeOffsByEmployeeId.length; sortedTimeOffIndex++) {
            const employeeTimeOff = EzScheduleRenderer.ezInstance.timeOffsByEmployeeId[sortedTimeOffIndex];

            if (employeeTimeOff?.employeeId === ezScheduleRenderContext.employeeId) {
                const extendedEmployeeTimeOff = EzScheduleRenderer.ezInstance.ezApplyTimeOffExtendedProperties(
                    employeeTimeOff,
                    sortedTimeOffIndex,
                    ezScheduleRenderContext);

                /*if ((!extendedEmployeeTimeOff.allDay && extendedEmployeeTimeOff.startDay === ezScheduleRenderContext.currentDay) ||
                    (extendedEmployeeTimeOff.allDay && extendedEmployeeTimeOff.startDay === extendedEmployeeTimeOff.endDay && extendedEmployeeTimeOff.startDay === ezScheduleRenderContext.currentDay) ||
                    (0 < extendedEmployeeTimeOff.dayOffList.length && extendedEmployeeTimeOff.dayOffList.includes(ezScheduleRenderContext.currentDay))) {
                    employeeTimeOffsForDay.push(extendedEmployeeTimeOff);
                }*/

                if (EzScheduleRenderer.ezInstance.ezCanRenderEmployeeTimeOff(ezScheduleRenderContext, extendedEmployeeTimeOff)) {
                    employeeTimeOffsForDay.push(extendedEmployeeTimeOff);
                }
            }
        }

        return employeeTimeOffsForDay;
    }

    /**
     * @public @method
     * Determines if the provided extendedEmployeeTimeOff can render given the provided ezScheduleRenderContext.
     * @param {object} ezScheduleRenderContext
     * @param {undefined|null|object} extendedEmployeeTimeOff
     * @returns {boolean}
     */
    ezCanRenderEmployeeTimeOff(ezScheduleRenderContext, extendedEmployeeTimeOff) {
        if (!EzObject.isValid(ezScheduleRenderContext)) {
            throw new EzBadParamException(
                'ezScheduleRenderContext',
                EzScheduleRenderer.ezInstance,
                EzScheduleRenderer.ezInstance.ezCanRenderEmployeeTimeOff);
        }

        if (!EzObject.isValid(extendedEmployeeTimeOff) || extendedEmployeeTimeOff?.employeeId !== ezScheduleRenderContext.employeeId) {
            return false;
        }

        const isAllDay = EzBoolean.booleanOrFalse(extendedEmployeeTimeOff.allDay);

        const startDayIsEndDay = extendedEmployeeTimeOff.startDay === extendedEmployeeTimeOff.endDay;

        const startDayIsCurrentDay = extendedEmployeeTimeOff.startDay === ezScheduleRenderContext.currentDay;

        return (isAllDay && startDayIsEndDay && startDayIsCurrentDay) ||
            (!isAllDay && startDayIsCurrentDay) ||
            (EzArray.hasLength(extendedEmployeeTimeOff.dayOffList) && extendedEmployeeTimeOff.dayOffList.includes(ezScheduleRenderContext.currentDay));
    }

    /**
     * @protected @method
     * Sets additional properties on the timeOff entity relating to schedules
     * @param {undefined|null|object} timeOff
     * @param {number} sortedTimeOffIndex
     * @returns {null|object}
     * Returns the timeOff entity with extended properties or null if the provided timeOff entity was undefined or null.
     */
    ezApplyTimeOffExtendedProperties(timeOff, sortedTimeOffIndex, ezScheduleRenderContext) {
        if (!EzNumber.isNumber(sortedTimeOffIndex)) {
            throw new EzBadParamException(
                'sortedTimeOffIndex',
                EzScheduleRenderer.ezInstance,
                EzScheduleRenderer.ezInstance.ezApplyTimeOffExtendedProperties);
        }

        if (!EzObject.isValid(timeOff)) {
            return null;
        }

        timeOff.sortedTimeOffIndex = sortedTimeOffIndex;

        const preferredTimeZone = (!timeOff.allDay && timeOff.requestTimeZoneId !== timeOff.targetTimeZoneId)
            ? timeOff.targetTimeZoneId
            : (timeOff.requestTimeZoneId || ezApi.ezclocker.ezDateTime.activeTimeZone);

        if (EzString.hasLength(timeOff.requestStartDateIso)) {
            timeOff.startMoment = ezApi.ezclocker.ezDateTime.ezFromIsoAndTimeZone(
                timeOff.requestStartDateIso,
                preferredTimeZone);

            timeOff.startDay = timeOff.startMoment.day();
        }

        if (EzString.hasLength(timeOff.requestEndDateIso)) {
            timeOff.endMoment = ezApi.ezclocker.ezDateTime.ezFromIsoAndTimeZone(
                timeOff.requestEndDateIso,
                preferredTimeZone);

            timeOff.endDay = timeOff.endMoment.day();
        }

        if (EzBoolean.isFalse(timeOff.allDay)) {
            timeOff.totalMinutes = EzObject.isValid(timeOff.startMoment) && EzObject.isValid(timeOff.endMoment)
                ? timeOff.endMoment.diff(timeOff.startMoment, 'minutes')
                : 0;
        } else {
            // TODO: Set this value from the global options when it is necessary
            timeOff.totalMinutes = timeOff.hoursPerDay * 60;
        }

        const filterDateString = EzScheduleRenderer.ezInstance.dayInfo[ezScheduleRenderContext.ezDayInfoIndex].dateStr;

        timeOff.dayOffList = [];

        return timeOff?.employeeId === ezScheduleRenderContext?.employeeId &&
            timeOff?.startMoment.format("MM/DD/YYYY") <= filterDateString &&
            timeOff?.endMoment.format("MM/DD/YYYY") >= filterDateString
            ? EzScheduleRenderer.ezInstance.ezBuildTimeOffDayOffList(timeOff)
            : timeOff;
    }

    /**
     * @public @method
     * Stores an array of days numbers in timeOff.dayOffList property for the time off if it is an all day time off.
     * @param {object} timeOff
     * @returns {object}
     * Returns the provided timeOff with the dataOffList array property set.
     */
    ezBuildTimeOffDayOffList(timeOff) {
        if (!EzObject.isValid(timeOff)) {
            throw new EzBadParamException(
                'timeOff',
                EzScheduleRenderer.ezInstance,
                EzScheduleRenderer.ezInstance.ezBuildTimeOffDayOffList);
        }

        timeOff.dayOffList = [];

        if (!timeOff?.allDay || timeOff?.startDay === timeOff?.endDay) {
            return timeOff;
        }

        // Store the first day off
        timeOff.dayOffList.push(timeOff.startDay);

        let currentDayOff = timeOff.startDay + 1;

        while (currentDayOff <= timeOff.endDay) {
            // Store next day off
            timeOff.dayOffList.push(currentDayOff);

            if (currentDayOff === timeOff.endDay) {
                return timeOff;
            }

            currentDayOff = 6 === currentDayOff
                ? 0
                : currentDayOff + 1;
        }

        return timeOff;
    }

    /**
     * @protected @method
     * Renders the shift schedule cards
     * @param {EzScheduleRenderContext} ezScheduleRenderContext
     * @returns {EzScheduleRenderContext}
     * Returns the renderContext object
     */
    ezRenderShiftSchedules(ezScheduleRenderContext) {
        if (!EzObject.isValid(ezScheduleRenderContext)) {
            throw new EzBadParamException(
                'ezScheduleRenderContext',
                EzScheduleRenderer.ezInstance,
                EzScheduleRenderer.ezInstance.ezRenderShiftSchedules);
        }

        const employeeSchedulesForDay = EzScheduleRenderer.ezInstance.ezGetEmployeeSchedulesForDay(
            ezScheduleRenderContext.employeeId,
            ezScheduleRenderContext.currentDay);

        let totalMinutesEmployeeForDay = 0;

        if (EzArray.hasLength(employeeSchedulesForDay)) {
            for (const schedule of employeeSchedulesForDay) {
                ezScheduleRenderContext.dayHasSchedule = true;

                ezScheduleRenderContext.schedule = schedule;

                ezScheduleRenderContext.sortedScheduleIndex = schedule.sortedScheduleIndex;

                ezScheduleRenderContext.startMoment = schedule.startMoment;

                ezScheduleRenderContext.endMoment = schedule.endMoment;

                ezScheduleRenderContext.minutes = schedule.totalMinutes;

                ezScheduleRenderContext.locationId = EzBoolean.isFalse(EzScheduleRenderer.ezInstance.employeeMode)
                    ? schedule.pendingLocationId
                    : schedule.locationId;

                totalMinutesEmployeeForDay += schedule.totalMinutes;

                ezScheduleRenderContext = EzScheduleRenderer.ezInstance.ezRenderScheduleBox(ezScheduleRenderContext);
            }
        }

        EzScheduleRenderer.ezInstance.ezEmployees[ezScheduleRenderContext.employeeIndex]
            .ezSelectedScheduleWeekTotalScheduledMinutes += totalMinutesEmployeeForDay;

        EzScheduleRenderer.ezInstance.ezEmployees[ezScheduleRenderContext.employeeIndex]
            .ezSelectedScheduleWeekTotalMinutes += totalMinutesEmployeeForDay;

        EzScheduleRenderer.ezInstance.dayInfo[ezScheduleRenderContext.ezDayInfoIndex].ezStoreTotalScheduledMinutesForEmployeeId(
            ezScheduleRenderContext.employeeId,
            totalMinutesEmployeeForDay);

        return ezScheduleRenderContext;
    }

    /**
     * @protected @method
     * Gets the array of schedules for a employee in a specific day
     * @param {number} employeeId
     * @param {number} currentDay
     * @returns {array}
     */
    ezGetEmployeeSchedulesForDay(employeeId, currentDay) {
        if (!EzNumber.isNumber(employeeId)) {
            throw new EzBadParamException(
                'employeeId',
                EzScheduleRenderer.ezInstance,
                EzScheduleRenderer.ezInstance.ezGetEmployeeSchedulesForDay);
        }
        if (!EzNumber.isNumber(currentDay)) {
            throw new EzBadParamException(
                'currentDay',
                EzScheduleRenderer.ezInstance,
                EzScheduleRenderer.ezInstance.ezGetEmployeeSchedulesForDay);
        }

        const employeeSchedulesForDay = [];

        for (let sortedScheduleIndex = 0; sortedScheduleIndex < EzScheduleRenderer.ezInstance.schedulesByEmployeeId.length; sortedScheduleIndex++) {
            const schedule = EzScheduleRenderer.ezInstance.ezApplyScheduleExtendedProperties(
                EzScheduleRenderer.ezInstance.schedulesByEmployeeId[sortedScheduleIndex],
                sortedScheduleIndex);

            if (EzObject.isValid(schedule) && employeeId === schedule.employeeId && !EzBoolean.isTrue(schedule.deleted) && currentDay === schedule.startDay) {
                employeeSchedulesForDay.push(schedule);
            }
        }

        return employeeSchedulesForDay;
    }

    /**
     * @protected @method
     * Applies additional properties relating to schedules on the schedule entity.
     * @param {undefined|null|object} schedule
     * @param {number} sortedScheduleIndex
     * @returns {null|object}
     * Returns the schedule entity with additional properties or null if the provided schedule entity is undefined or null
     */
    ezApplyScheduleExtendedProperties(schedule, sortedScheduleIndex) {
        if (!EzNumber.isNumber(sortedScheduleIndex)) {
            throw new EzBadParamException(
                'sortedScheduleIndex',
                EzScheduleRenderer.ezInstance,
                EzScheduleRenderer.ezInstance.ezApplyScheduleExtendedProperties);
        }
        if (!EzObject.isValid(schedule)) {
            return null;
        }

        // Add the additional properties to the schedule
        schedule.sortedScheduleIndex = sortedScheduleIndex;

        if (!EzString.hasLength(schedule.pendingStartDateTimeIso)) {
            schedule.pendingStartDateTimeIso = schedule.pendingStartDateTimeIso8601;
        }

        if (!EzString.hasLength(schedule.pendingStartDateTimeIso)) {
            schedule.pendingEndDateTimeIso = schedule.pendingEndDateTimeIso8601;
        }

        if (EzString.hasLength(schedule.pendingStartDateTimeIso)) {
            schedule.startMoment = ezApi.ezclocker.ezDateTime.ezCreateFromIso(schedule.pendingStartDateTimeIso);

            schedule.startDay = schedule.startMoment.day();
        }

        if (EzString.hasLength(schedule.pendingEndDateTimeIso)) {
            schedule.endMoment = ezApi.ezclocker.ezDateTime.ezCreateFromIso(schedule.pendingEndDateTimeIso);
            schedule.endDay = schedule.endMoment.day();
        }

        schedule.totalMinutes = EzObject.isValid(schedule.startMoment) && EzObject.isValid(schedule.endMoment)
            ? schedule.endMoment.diff(schedule.startMoment, 'minutes')
            : 0;

        return schedule;
    }


    /**
     * @protected @method
     * Draws the schedule's name cells
     * @param {object} employee
     * @param {string} employeeRowId
     */
    ezRenderScheduleNameCell(employee, employeeRowId) {
        if (!EzObject.isValid(employee)) {
            throw new EzBadParamException(
                'employee',
                EzScheduleRenderer.ezInstance,
                EzScheduleRenderer.ezInstance.ezRenderScheduleNameCell);
        }
        if (!EzString.hasLength(employeeRowId)) {
            throw new EzBadParamException(
                'employeeRowId',
                EzScheduleRenderer.ezInstance,
                EzScheduleRenderer.ezInstance.ezRenderScheduleNameCell);
        }

        const disableCopyFoward = EzObject.hasOwnProperty(EzScheduleRenderer.ezInstance.ezEmployeeSchedules, employee.id.toString()) &&
            EzArray.hasLength(EzScheduleRenderer.ezInstance.ezEmployeeSchedules[employee.id.toString()])
            ? EzString.EMPTY
            : 'disabled';

        const employeeButtons = EzBoolean.isTrue(EzScheduleRenderer.ezInstance.employeeMode)
            ? EzString.EMPTY
            : EzHtml.build`
                <div
                    id="${employeeRowId}_Buttons"
                    class="copyScheduleButtonContainer">
                    <button
                        id="EzCopyScheduleForward"
                        style="width:117px"
                        class="miniActionButton"
                        title="Copy ${employee.employeeName}'s schedule for this week to future weeks"
                        onclick="ezApi.ezclocker.ezScheduleViewDataHelper.ezCopyScheduleForward(${employee.id})"
                        ${disableCopyFoward}>
                        <img
                            id="EzCopyScheduleForwardImg"
                            src="/public/images/icons/copy-forward.png"
                            class="miniButtonIcon"/>
                        Copy Forward
                    </button>
                </div>`;

        ezApi.ezclocker.ezUi.ezAppendContent(
            '_CreateTableBody',
            EzHtml.build`
                <tr
                    id="${employeeRowId}">
                    <td
                        id="emp${employee.id}"
                        class="calendarTableEmployeeNameCell">
                        ${employee.employeeName}
                        ${employeeButtons}
                    </td>
                </tr>`);

    }

    /**
     * @protected @method
     * Draws the calendar title
     */
    ezRenderCalendarTitle() {
        if (!EzObject.isValid(EzScheduleRenderer.ezInstance.ezSelectedWeekMoment)) {
            EzScheduleRenderer.ezInstance.ezSelectedWeekMoment = ezApi.ezclocker.ezDateTime.ezDateFromDatePicker('scheduleWeek');
        }

        EzScheduleRenderer.ezInstance.ezSaveDayDates();

        ezApi.ezclocker.ezUi.ezSetContent(
            '_CreateTableBody',
            EzHtml.build`
                <tr
                    class="calendarTableTitleRow">
                    <td
                        id="EzSchedule_EmployeeName"
                        class="calendarTableTitleCell">
                        Name
                    </td>
                    <td
                        id="day0"
                        class="calendarTableTitleCell"
                        data-date="${EzScheduleRenderer.ezInstance.dayInfo[0].dayDateStr}">
                        ${EzScheduleRenderer.ezInstance.dayInfo[0].dayDateStr}
                    </td>
                    <td
                        id="day1"
                        class="calendarTableTitleCell"
                        data-date="${EzScheduleRenderer.ezInstance.dayInfo[1].dayDateStr}">
                        ${EzScheduleRenderer.ezInstance.dayInfo[1].dayDateStr}
                    </td>
                    <td
                        id="day2"
                        class="calendarTableTitleCell"
                        data-date="${EzScheduleRenderer.ezInstance.dayInfo[2].dayDateStr}">
                        ${EzScheduleRenderer.ezInstance.dayInfo[2].dayDateStr}
                    </td>
                    <td
                        id="day3"
                        class="calendarTableTitleCell"
                        data-date="${EzScheduleRenderer.ezInstance.dayInfo[3].dayDateStr}">
                        ${EzScheduleRenderer.ezInstance.dayInfo[3].dayDateStr}
                    </td>
                    <td
                        id="day4"
                        class="calendarTableTitleCell"
                        data-date="${EzScheduleRenderer.ezInstance.dayInfo[4].dayDateStr}">
                        ${EzScheduleRenderer.ezInstance.dayInfo[4].dayDateStr}
                    </td>
                    <td
                        id="day5"
                        class="calendarTableTitleCell"
                        data-date="${EzScheduleRenderer.ezInstance.dayInfo[5].dayDateStr}">
                        ${EzScheduleRenderer.ezInstance.dayInfo[5].dayDateStr}
                    </td>
                    <td
                        id="day6"
                        class="calendarTableTitleCell"
                        data-date="${EzScheduleRenderer.ezInstance.dayInfo[6].dayDateStr}">
                        ${EzScheduleRenderer.ezInstance.dayInfo[6].dayDateStr}
                    </td>
                    <td
                        id="EzSchedule_TotalHoursForWeek"
                        class="calendarTableTitleCell">
                        Hours
                    </td>
            </tr>`);
    }

    /**
     * @protected @method
     * Saves each day's date
     */
    ezSaveDayDates() {
        const firstMomentOfWeek = ezApi.ezclocker.ezScheduleService.ezGetFirstMomentOfWeek(
            EzScheduleRenderer.ezInstance.ezSelectedWeekMoment,
            EzScheduleRenderer.ezInstance.firstDayOfWeek);

        EzScheduleRenderer.ezInstance.dayInfo = [];

        let currentMoment = ezApi.ezclocker.ezDateTime.ezCreateFromMomentWithTimeStartOfDay(firstMomentOfWeek);

        for (let dayInfoIndex = 0; dayInfoIndex < 7; dayInfoIndex++) {
            EzScheduleRenderer.ezInstance.dayInfo.push(
                new EzScheduleDayInfo(
                    currentMoment,
                    dayInfoIndex));

            // Move to the nect day
            currentMoment = currentMoment.add(1, 'days');
        }
    }

    /**
     * @protected @method
     * Draws the day off cell
     */
    ezRenderDayOffCell(ezScheduleRenderContext) {
        if (!EzObject.isValid(ezScheduleRenderContext)) {
            throw new EzBadParamException(
                'ezScheduleRenderContext',
                EzScheduleRenderer.ezInstance,
                EzScheduleRenderer.ezInstance.ezRenderDayOffCell);
        }
        if (!EzString.hasLength(ezScheduleRenderContext.employeeDayCellId)) {
            throw new EzBadParamException(
                'ezScheduleRenderContext.employeeDayCellId',
                EzScheduleRenderer.ezInstance,
                EzScheduleRenderer.ezInstance.ezRenderDayOffCell);
        }
        if (!EzNumber.isNumber(ezScheduleRenderContext.employeeIndex)) {
            throw new EzBadParamException(
                'ezScheduleRenderContext.employeeIndex',
                EzScheduleRenderer.ezInstance,
                EzScheduleRenderer.ezInstance.ezRenderDayOffCell);
        }
        if (!EzNumber.isNumber(ezScheduleRenderContext.currentDay)) {
            throw new EzBadParamException(
                'ezScheduleRenderContext.currentDay',
                EzScheduleRenderer.ezInstance,
                EzScheduleRenderer.ezInstance.ezRenderDayOffCell);
        }

        const addShiftDateIso = ezApi.ezclocker.ezDateTime.ezToIso(
            EzScheduleRenderer.ezInstance.dayInfo[ezScheduleRenderContext.ezDayInfoIndex].moment);

        const onClickHandler = EzBoolean.isFalse(EzScheduleRenderer.ezInstance.employeeMode)
            ? `ezApi.ezclocker.ezScheduleRenderer.ezShowAddShiftDialog(${ezScheduleRenderContext.employeeIndex}, '${addShiftDateIso}')`
            : EzString.EMPTY;

        const clickToAddScheduleHint = EzBoolean.isFalse(EzScheduleRenderer.ezInstance.employeeMode)
            ? EzHtml.build`
                <div
                    id="${ezScheduleRenderContext.employeeDayCellId}_ClickToAddHint"
                    class="employeeDayOffCell ezText-micro-gray"
                    onclick="${onClickHandler}">
                    click to add a schedule
                </div>`
            : EzString.EMPTY;

        ezApi.ezclocker.ezUi.ezContent(
            ezScheduleRenderContext.employeeDayCellId,
            EzHtml.build`
                <div
                    id="${ezScheduleRenderContext.employeeDayCellId}_Off"
                    class="employeeDayOffCell"
                    onclick="${onClickHandler}">
                    OFF
                    ${clickToAddScheduleHint}
                </div>`);
    }

    /**
     * @public @method
     * Shows the add shift dialog
     * @param {number} employeeIndex
     * @param {string} addShiftDateIso
     */
    ezShowAddShiftDialog(employeeIndex, addShiftDateIso) {
        if (!EzNumber.isNumber(employeeIndex)) {
            throw new EzBadParamException(
                'employeeIndex',
                EzScheduleRenderer.ezInstance,
                EzScheduleRenderer.ezInstance.ezShowAddShiftDialog);
        }
        if (!EzString.hasLength(addShiftDateIso)) {
            throw new EzBadParamException(
                'sortedScheduleIndex',
                EzScheduleRenderer.ezInstance,
                EzScheduleRenderer.ezInstance.ezShowAddShiftDialog);
        }

        const employee = ezApi.ezclocker.ezClockerContext.ezGetSelectedEmployerAccountEmployeeAccounts()[employeeIndex];

        if (!EzObject.isValid(employee)) {
            throw new EzException(`Unable to locate the employee entity associated with employeeIndex=${employeeIndex}.`);
        }

        const shiftDateTime = ezApi.ezclocker.ezDateTime.ezFromIso(addShiftDateIso);

        if (!ezApi.ezclocker.ezDateTime.ezIsValidMoment(shiftDateTime)) {
            throw new EzException(`Unable to create a valid date time instance for addShiftDateIso=${addShiftDateIso}.`);
        }

        ezApi.ezclocker.ezShiftEditorDialog.ezShow(
            ezApi.ezclocker.ezClockerContext.ezGetSelectedEmployerAccountEmployeeAccounts()[employeeIndex],
            shiftDateTime,
            null);
    }

    /**
     * @public @method
     * Shows the edit shift dialog
     * @param {number} employeeIndex
     * @param {number} sortedScheduleIndex
     */
    ezShowEditShiftDialog(employeeIndex, sortedScheduleIndex) {
        if (!EzNumber.isNumber(employeeIndex)) {
            throw new EzBadParamException(
                'employeeIndex',
                EzScheduleRenderer.ezInstance,
                EzScheduleRenderer.ezInstance.ezShowEditShiftDialog);
        }
        if (!EzNumber.isNumber(sortedScheduleIndex)) {
            throw new EzBadParamException(
                'sortedScheduleIndex',
                EzScheduleRenderer.ezInstance,
                EzScheduleRenderer.ezInstance.ezShowEditShiftDialog);
        }

        const employee = ezApi.ezclocker.ezClockerContext.ezGetSelectedEmployerAccountEmployeeAccounts()[employeeIndex];

        if (!EzObject.isValid(employee)) {
            throw new EzException(`Unable to locate the employee entity associated with employeeIndex=${employeeIndex}.`);
        }

        const schedule = ezApi.ezclocker.ezScheduleViewDataHelper.ezScheduleEntitiesOrderedByEmployeeId[sortedScheduleIndex];

        if (!EzObject.isValid(schedule)) {
            throw new EzException(`Unable to locate the schedule entity associated with sortedScheduleIndex=${sortedScheduleIndex}.`);
        }

        ezApi.ezclocker.ezShiftEditorDialog.ezShow(
            employee,
            null,
            schedule);
    }

    /**
     * @protected @method
     * Draws the schedule's total hours cell
     * @param {number} totalHours
     */
    ezRenderScheduleTotalHours(totalHours) {
        if (!EzString.hasLength(totalHours)) {
            throw new EzBadParamException(
                'totalHours',
                EzScheduleRenderer.ezInstance,
                EzScheduleRenderer.ezInstance.ezRenderScheduleTotalHours);
        }

        globalThis.ezApi.ezclocker.ezUi.ezSetContent(
            '_TotalScheduledHours',
            totalHours);
    }

    /**
     * @protected
     * Draws the day's total hours cell
     * @param {string} employeeRowId
     * @param {number} totalMins
     */
    ezRenderDayTotalHoursCell(employeeRowId, totalMins) {
        if (!EzString.hasLength(employeeRowId)) {
            throw new EzBadParamException(
                'employeeRowId',
                EzScheduleRenderer.ezInstance,
                EzScheduleRenderer.ezInstance.ezRenderDayTotalHoursCell);
        }
        if (!EzNumber.isNumber(totalMins)) {
            throw new EzBadParamException(
                'totalMins',
                EzScheduleRenderer.ezInstance,
                EzScheduleRenderer.ezInstance.ezRenderDayTotalHoursCell);
        }

        const hoursString = EzScheduleRenderer.ezInstance.ezBuildTimeTotal(totalMins);

        ezApi.ezclocker.ezUi.ezAppendContent(
            employeeRowId,
            EzHtml.build`
                <td
                    id="${employeeRowId}_hours_"
                    class="calendarTableHoursCell">
                    ${hoursString}
                </td>`);
    }

    /**
     * @protected @method
     * Draws the add shift button
     * @param {EzScheduleRenderContext} ezScheduleRenderContext
     */
    ezRenderAddShiftButton(ezScheduleRenderContext) {
        if (!EzObject.isValid(ezScheduleRenderContext)) {
            throw new EzBadParamException(
                'ezScheduleRenderContext',
                EzScheduleRenderer.ezInstance,
                EzScheduleRenderer.ezInstance.ezRenderAddShiftButton);
        }
        if (!EzString.hasLength(ezScheduleRenderContext.employeeDayCellId)) {
            throw new EzBadParamException(
                'ezScheduleRenderContext.employeeDayCellId',
                EzScheduleRenderer.ezInstance,
                EzScheduleRenderer.ezInstance.ezRenderAddShiftButton);
        }
        if (!EzNumber.isNumber(ezScheduleRenderContext.employeeIndex)) {
            throw new EzBadParamException(
                'ezScheduleRenderContext.employeeIndex',
                EzScheduleRenderer.ezInstance,
                EzScheduleRenderer.ezInstance.ezRenderAddShiftButton);
        }
        if (!EzNumber.isNumber(ezScheduleRenderContext.currentDay)) {
            throw new EzBadParamException(
                'ezScheduleRenderContext.currentDay',
                EzScheduleRenderer.ezInstance,
                EzScheduleRenderer.ezInstance.ezRenderAddShiftButton);
        }

        const addShiftButtonId = `${ezScheduleRenderContext.employeeDayCellId}_AddShiftContainer`;

        const addShiftDateIso = ezApi.ezclocker.ezDateTime.ezToIso(
            EzScheduleRenderer.ezInstance.dayInfo[ezScheduleRenderContext.ezDayInfoIndex].moment);

        if (!ezApi.ezclocker.ezUi.ezElementExists(addShiftButtonId)) {
            ezApi.ezclocker.ezUi.ezAppendContent(
                ezScheduleRenderContext.employeeDayCellId,
                EzHtml.build`
                    <div
                        id="${addShiftButtonId}"
                        class="addShiftContainer">
                        <button
                            id="${addShiftButtonId}_AddShift"
                            class="editButton fullWidth"
                            title="Add another shift"
                            onclick="ezApi.ezclocker.ezScheduleRenderer.ezShowAddShiftDialog(${ezScheduleRenderContext.employeeIndex}, '${addShiftDateIso}')">
                            <img
                                id="EzAddShiftImage"
                                src="/public/images/add-timeentry.svg"
                                class="ezEditButtonImage"
                                alt="Add a new shift"/>
                            <label
                                id="EzAddShiftLabel"
                                class="ezEditButtonLabel">
                                Add Shift ...
                            </label>
                        </button>
                    </div>`);
        }
    }

    /**
     * @protected @method
     * Draws a schedule box
     * @param {EzScheduleRenderContext} ezScheduleRenderContext
     * @returns {EzScheduleRenderContext}
     */
    ezRenderScheduleBox(ezScheduleRenderContext) {
        if (!EzObject.isValid(ezScheduleRenderContext)) {
            throw new EzBadParamException(
                'ezScheduleRenderContext',
                EzScheduleRenderer.ezInstance,
                EzScheduleRenderer.ezInstance.ezRenderScheduleBox);
        }
        if (!EzObject.isValid(ezScheduleRenderContext.startMoment)) {
            throw new EzBadParamException(
                'ezScheduleRenderContext.startMoment',
                EzScheduleRenderer.ezInstance,
                EzScheduleRenderer.ezInstance.ezRenderScheduleBox);
        }
        if (!EzObject.isValid(ezScheduleRenderContext.endMoment)) {
            throw new EzBadParamException(
                'ezScheduleRenderContext.endMoment',
                EzScheduleRenderer.ezInstance,
                EzScheduleRenderer.ezInstance.ezRenderScheduleBox);
        }
        if (!EzString.hasLength(ezScheduleRenderContext.employeeDayCellId)) {
            throw new EzBadParamException(
                'ezScheduleRenderContext.employeeDayCellId',
                EzScheduleRenderer.ezInstance,
                EzScheduleRenderer.ezInstance.ezRenderScheduleBox);
        }
        if (!EzNumber.isNumber(ezScheduleRenderContext.sortedScheduleIndex)) {
            throw new EzBadParamException(
                'ezScheduleRenderContext.sortedScheduleIndex',
                EzScheduleRenderer.ezInstance,
                EzScheduleRenderer.ezInstance.ezRenderScheduleBox);
        }
        if (!EzNumber.isNumber(ezScheduleRenderContext.employeeIndex)) {
            throw new EzBadParamException(
                'ezScheduleRenderContext.employeeIndex',
                EzScheduleRenderer.ezInstance,
                EzScheduleRenderer.ezInstance.ezRenderScheduleBox);
        }

        const scheduleBlockId = `${ezScheduleRenderContext.employeeDayCellId}_schedule_${ezScheduleRenderContext.sortedScheduleIndex}`;

        const scheduleButtons = EzBoolean.isFalse(EzScheduleRenderer.ezInstance.employeeMode)
            ? EzScheduleRenderer.ezInstance.ezBuildScheduleDeleteBtn(ezScheduleRenderContext.sortedScheduleIndex)
            : EzString.EMPTY;

        let scheduleBlockTitle = EzBoolean.isFalse(EzScheduleRenderer.ezInstance.employeeMode)
            ? 'Click to edit'
            : EzString.EMPTY;

        if (EzBoolean.isTrue(EzScheduleRenderer.ezInstance.employeeMode)) {
            if (EzObject.isValid(ezScheduleRenderContext.schedule)) {
                scheduleBlockTitle = ezScheduleRenderContext.schedule.notes;
            } else if (EzObject.isValid(ezScheduleRenderContext.timeOff)) {
                scheduleBlockTitle = ezScheduleRenderContext.timeOff.notes;
            }
        }

        const scheduleClickHandler = EzBoolean.isFalse(EzScheduleRenderer.ezInstance.employeeMode)
            ? `onclick="ezApi.ezclocker.ezScheduleRenderer.ezShowEditShiftDialog(${ezScheduleRenderContext.employeeIndex},${ezScheduleRenderContext.sortedScheduleIndex})"`
            : EzString.empty;

        const scheduleBlockClass = EzBoolean.isFalse(EzScheduleRenderer.ezInstance.employeeMode)
            ? 'scheduleBlock'
            : 'scheduleBlock-read-only';

        const needsPublished = EzBoolean.isFalse(ezScheduleRenderContext.schedule.published) ||
            (EzBoolean.isTrue(ezScheduleRenderContext.schedule.published) &&
                (EzBoolean.isTrue(ezScheduleRenderContext.schedule.modified) || EzBoolean.isTrue(ezScheduleRenderContext.schedule.deleted)))
            ? EzHtml.build`
                <div
                    id="EzScheduleNotPublishedContainer_${ezScheduleRenderContext.schedule.id}"
                    class="ezSchedule-not-published-container">
                    not published
                </div>`
            : EzString.EMPTY;

        const debugScheduleId = EzBoolean.isTrue(ezApi.ezclocker.ezUrlHelper.ezDebugMode)
            ? `id=${ezScheduleRenderContext.schedule.id}`
            : EzString.EMPTY;

        ezApi.ezclocker.ezUi.ezAppendContent(
            ezScheduleRenderContext.employeeDayCellId,
            EzHtml.build`
                <div
                    id="${scheduleBlockId}"
                    class="${scheduleBlockClass}"
                    title="${scheduleBlockTitle}"
                    ${scheduleClickHandler}>
                    <table
                        id="${scheduleBlockId}_Table"
                        class="scheduleBlockTitle">
                        <tr
                            id="${scheduleBlockId}_Row"
                            class="schedule-title-container">
                            <td
                                id="${scheduleBlockId}_title"
                                class="scheduleBlockTitleCell ezLeftAlign">
                            </td>
                            <td
                                id="${scheduleBlockId}_Buttons"
                                class="scheduleBlockTitleCell ezRightAlign">
                                ${scheduleButtons}
                            </td>
                        </tr>
                    </table>
                    <div
                        id="${scheduleBlockId}_StartTime">
                        ${ezScheduleRenderContext.startMoment.format('hh:mm a')}
                    </div>
                    to
                    <div
                        id="${scheduleBlockId}_EndTime">
                        ${ezScheduleRenderContext.endMoment.format('hh:mm a')}
                    </div>
                    <div
                        id="${scheduleBlockId}_TotalScheduledTime"
                        class="ezText-micro-navy ezPad10">
                        Hours: ${EzScheduleRenderer.ezInstance.ezBuildTimeTotal(ezScheduleRenderContext.schedule.totalMinutes)}
                        <div
                            id="${scheduleBlockId}_DebugScheduleId">
                            ${debugScheduleId}
                        </div>
                    </div>
                    ${needsPublished}
                </div>`);

        // Render Scheduled Cell Data
        if (EzObject.isValid(ezScheduleRenderContext.schedule) && EzNumber.isNumber(ezScheduleRenderContext.locationId) &&
            -1 !== ezScheduleRenderContext.locationId) {
            EzScheduleRenderer.ezInstance.ezRenderAssignedLocoationTitleForSchedule(
                `${scheduleBlockId}_title`,
                ezScheduleRenderContext.locationId);
        }

        return ezScheduleRenderContext;
    }

    /**
     * @protected
     * Builds the delete schedule button
     * @param {Number} sortedScheduleIndex
     * @returns {String}
     * HTML of schedule delete button
     */
    ezBuildScheduleDeleteBtn(sortedScheduleIndex) {
        if (!EzNumber.isNumber(sortedScheduleIndex)) {
            throw new EzBadParamException(
                'sortedScheduleIndex',
                EzScheduleRenderer.ezInstance,
                EzScheduleRenderer.ezInstance.ezBuildScheduleDeleteBtn);
        }

        return EzHtml.build`
            <button
                id="deleteButton_${sortedScheduleIndex}"
                class="ezDeleteEditButton"
                title="Delete Shift"
                onclick="ezApi.ezclocker.ezScheduleRenderer.ezHandleDeleteShiftButtonClick(event, ${sortedScheduleIndex})">
                <img
                    id="deleteImage_${sortedScheduleIndex}"
                    class="ezEditButtonImage"
                    src="/public/images/freepik/delete/del1-white.svg"
                    alt="Delete Shift"
                    title="Delete the shift">
            </button>`;
    }

    /**
     * @protected @method
     * Handles the delete shift button click
     */
    ezHandleDeleteShiftButtonClick(event, sortedScheduleIndex) {
        event.stopPropagation();

        if (!EzNumber.isNumber(sortedScheduleIndex)) {
            throw new EzBadParamException(
                'sortedScheduleIndex',
                EzScheduleRenderer.ezInstance,
                EzScheduleRenderer.ezInstance.ezDeleteShift);
        }

        ezApi.ezclocker.ezScheduleViewDataHelper.ezDeleteShift(
            ezApi.ezclocker.ezScheduleViewDataHelper.ezScheduleEntitiesOrderedByEmployeeId[sortedScheduleIndex]);
    }

    /**
     * @protected @method
     * Builds the delete time off button UX.
     * @param {number} sortedTimeOffId
     * @returns {string}
     */
    ezBuildTimeoffDeleteBtn(timeOffId) {
        if (!EzNumber.isNumber(timeOffId)) {
            throw new EzBadParamException(
                'timeOffId',
                EzScheduleRenderer.ezInstance,
                EzScheduleRenderer.ezInstance.ezBuildTimeoffDeleteBtn);
        }

        return EzBoolean.isFalse(EzScheduleRenderer.ezInstance.employeeMode)
            ? EzHtml.build`
                <button
                    id="deleteButton_${timeOffId}"
                    class="ezDeleteEditButton"
                    style="float: right;"
                    title="Delete Time Off"
                    onclick="ezApi.ezclocker.ezScheduleRenderer.ezSubmitTimeOffToCancel(${timeOffId})">
                    <img
                        id="deleteImage_${timeOffId}"
                        class="ezEditButtonImage"
                        src="/public/images/freepik/delete/del1-white.svg"
                        alt="Delete Time Off"
                        title="Delete Time Off">
                </button>`
            : EzString.EMPTY;
    }

    /**
     * @protectted
     * Renders a approved time off for all day schedule card
     * @param {number} timeOffId
     * @param {String} timeOffBlockId
     * @param {String} timeOffTitleId
     * @param {String} displayRequestType
     * @param {moment} startMoment
     * @param {moment} endMoment
     * @returns {String}
     * HTML for the approved for time off schedule card
     */
    ezRenderApprovedTimeOffScheduleCard(timeOffId, timeoffBlockId, timeoffTitleId, displayRequestType, startMoment, endMoment) {
        if (!EzNumber.isNumber(timeOffId)) {
            throw new EzBadParamException(
                'timeOffId',
                EzScheduleRenderer.ezInstance,
                EzScheduleRenderer.ezInstance.ezRenderApprovedTimeOffScheduleCard);
        }
        if (!EzString.hasLength(timeoffBlockId)) {
            throw new EzBadParamException(
                'timeoffBlockId',
                EzScheduleRenderer.ezInstance,
                EzScheduleRenderer.ezInstance.ezRenderApprovedTimeOffScheduleCard);
        }
        if (!EzString.hasLength(timeoffTitleId)) {
            throw new EzBadParamException(
                'timeoffTitleId',
                EzScheduleRenderer.ezInstance,
                EzScheduleRenderer.ezInstance.ezRenderApprovedTimeOffScheduleCard);
        }
        if (!EzString.hasLength(displayRequestType)) {
            throw new EzBadParamException(
                'displayRequestType',
                EzScheduleRenderer.ezInstance,
                EzScheduleRenderer.ezInstance.ezRenderApprovedTimeOffScheduleCard);
        }
        if (!EzObject.isValid(startMoment)) {
            throw new EzBadParamException(
                'startMoment',
                EzScheduleRenderer.ezInstance,
                EzScheduleRenderer.ezInstance.ezRenderApprovedTimeOffScheduleCard);
        }
        if (!EzObject.isValid(endMoment)) {
            throw new EzBadParamException(
                'endMoment',
                EzScheduleRenderer.ezInstance,
                EzScheduleRenderer.ezInstance.ezRenderApprovedTimeOffScheduleCard);
        }

        const debugTimeOffId = EzBoolean.isTrue(ezApi.ezclocker.ezUrlHelper.ezDebugMode)
            ? `id=${timeOffId}`
            : EzString.EMPTY;

        return EzHtml.build`
            <div
                id="${timeoffBlockId}"
                class="scheduleBlock-read-only">
                <table
                    id="${timeoffBlockId}_Table"
                    class="scheduleBlockTitle">
                    <tr
                        id="${timeoffBlockId}_ROW"
                        class="requestTimeOffTableRow">
                        <td
                            id="${timeoffTitleId}"
                            class="scheduleBlockTitleCell ezLeftAlign approvedRequestTimeOffTableCell">
                            ${displayRequestType}
                        </td>
                        <td
                            id="${timeoffTitleId}_Buttons"
                            class="scheduleBlockTitleCell ezRightAlign approvedRequestTimeOffTableCell">
                            ${EzScheduleRenderer.ezInstance.ezBuildTimeoffDeleteBtn(timeOffId)}
                        </td>
                    </tr>
                </table>
                <div
                    id="${timeoffBlockId}_Content">
                    <div id="${timeoffBlockId}_Start">
                        ${startMoment.format('hh:mm a')}
                    </div>
                    to
                    <div
                        id="${timeoffBlockId}_End">
                        ${endMoment.format('hh:mm a')}
                    </div>
                    <div
                        id="${timeoffBlockId}_Pending"
                        class="ezPad8 ezText-micro-navy">
                        Approved
                        <div
                            id="EzDebugTimeOffId">
                            ${debugTimeOffId}
                        </div>
                    </div>
                </div>
            </div>`;
    }

    /**
     * @protectted @method
     * Renders a pending for all day time off schedule card
     * @param {number} timeOffId
     * @param {String} timeOffBlockId
     * @param {String} timeOffTitleId
     * @param {String} displayRequestType
     * @param {moment} startMoment
     * @param {moment} endMoment
     * @returns {String}
     * HTML for the pending for time off schedule card
     */
    ezRenderPendingTimeOffScheduleCard(timeOffId, timeoffBlockId, timeoffTitleId, displayRequestType, startMoment, endMoment) {
        if (!EzNumber.isNumber(timeOffId)) {
            throw new EzBadParamException(
                'timeOffId',
                EzScheduleRenderer.ezInstance,
                EzScheduleRenderer.ezInstance.ezRenderPendingTimeOffScheduleCard);
        }
        if (!EzString.hasLength(timeoffBlockId)) {
            throw new EzBadParamException(
                'timeoffBlockId',
                EzScheduleRenderer.ezInstance,
                EzScheduleRenderer.ezInstance.ezRenderPendingTimeOffScheduleCard);
        }
        if (!EzString.hasLength(timeoffTitleId)) {
            throw new EzBadParamException(
                'timeoffTitleId',
                EzScheduleRenderer.ezInstance,
                EzScheduleRenderer.ezInstance.ezRenderPendingTimeOffScheduleCard);
        }
        if (!EzString.hasLength(displayRequestType)) {
            throw new EzBadParamException(
                'displayRequestType',
                EzScheduleRenderer.ezInstance,
                EzScheduleRenderer.ezInstance.ezRenderPendingTimeOffScheduleCard);
        }
        if (!EzObject.isValid(startMoment)) {
            throw new EzBadParamException(
                'startMoment',
                EzScheduleRenderer.ezInstance,
                EzScheduleRenderer.ezInstance.ezRenderPendingTimeOffScheduleCard);
        }
        if (!EzObject.isValid(endMoment)) {
            throw new EzBadParamException(
                'endMoment',
                EzScheduleRenderer.ezInstance,
                EzScheduleRenderer.ezInstance.ezRenderPendingTimeOffScheduleCard);
        }

        const debugTimeOffId = EzBoolean.isTrue(ezApi.ezclocker.ezUrlHelper.ezDebugMode)
            ? `id=${timeOffId}`
            : EzString.EMPTY;

        return EzHtml.build`
            <div id="${timeoffBlockId}"
                class="scheduleBlock-read-only pendingRequestTimeOff">
                <table
                    id="${timeoffBlockId}_Table"
                    class="scheduleBlockTitle">
                    <tr
                        id="${timeoffBlockId}_Row"
                        class="requestTimeOffTableRow">
                        <td
                            id="${timeoffTitleId}"
                            class="scheduleBlockTitleCell ezLeftAlign pendingRequestTimeOffTableCell">
                            ${displayRequestType}
                        </td>
                        <td
                            id="${timeoffTitleId}_Buttons"
                            class="scheduleBlockTitleCell ezRightAlign pendingRequestTimeOffTableCell">
                            ${EzScheduleRenderer.ezInstance.ezBuildTimeoffDeleteBtn(timeOffId)}
                        </td>
                    </tr>
                </table>
                <div
                    id="${timeoffBlockId}_Content">
                    <div
                        id="${timeoffBlockId}_Start">
                        ${startMoment.format('hh:mm a')}
                    </div>
                    to
                    <div
                        id="${timeoffBlockId}_End">
                        ${endMoment.format('hh:mm a')}
                    </div>
                    <div
                        id="${timeoffBlockId}_Pending"
                        class="ezPad8 ezText-micro-gray">
                        (Pending Approval)
                        <div
                            id="EzDebugTimeOffId">
                            ${debugTimeOffId}
                        </div>
                    </div>
                </div>
            </div>`;
    }

    /**
     * @protectted @method
     * Renders a approved all day time off schedule card
     * @param {number} timeOffId
     * @param {String} timeOffBlockId
     * @param {String} timeOffTitleId
     * @param {String} displayRequestType
     * @param {moment} startTime
     * @param {moment} endTime
     * @returns {String}
     * HTML for the approved all day time off schedule card
     */
    ezRenderApprovedAllDayTimeOffScheduleCard(timeOffId, timeoffBlockId, timeoffTitleId, displayRequestType) {
        if (!EzNumber.isNumber(timeOffId)) {
            throw new EzBadParamException(
                'timeOffId',
                EzScheduleRenderer.ezInstance,
                EzScheduleRenderer.ezInstance.ezRenderApprovedAllDayTimeOffScheduleCard);
        }
        if (!EzString.hasLength(timeoffBlockId)) {
            throw new EzBadParamException(
                'timeoffBlockId',
                EzScheduleRenderer.ezInstance,
                EzScheduleRenderer.ezInstance.ezRenderApprovedAllDayTimeOffScheduleCard);
        }
        if (!EzString.hasLength(timeoffTitleId)) {
            throw new EzBadParamException(
                'timeoffTitleId',
                EzScheduleRenderer.ezInstance,
                EzScheduleRenderer.ezInstance.ezRenderApprovedAllDayTimeOffScheduleCard);
        }
        if (!EzString.hasLength(displayRequestType)) {
            throw new EzBadParamException(
                'displayRequestType',
                EzScheduleRenderer.ezInstance,
                EzScheduleRenderer.ezInstance.ezRenderApprovedAllDayTimeOffScheduleCard);
        }

        const debugTimeOffId = EzBoolean.isTrue(ezApi.ezclocker.ezUrlHelper.ezDebugMode)
            ? `id=${timeOffId}`
            : EzString.EMPTY;

        return EzHtml.build`
            <div
                id="${timeoffBlockId}"
                class="scheduleBlock-read-only">
                <table
                    id="${timeoffBlockId}_Table"
                    class="scheduleBlockTitle">
                    <tr
                        id="${timeoffBlockId}_Row"
                        class="requestTimeOffTableRow">
                        <td
                            id="${timeoffTitleId}"
                            class="scheduleBlockTitleCell ezLeftAlign approvedRequestTimeOffTableCell">
                            ${displayRequestType}
                        </td>
                        <td
                            id="${timeoffTitleId}_Buttons"
                            class="scheduleBlockTitleCell ezRightAlign approvedRequestTimeOffTableCell">
                            ${EzScheduleRenderer.ezInstance.ezBuildTimeoffDeleteBtn(timeOffId)}
                        </td>
                    </tr>
                </table>
                <div
                    id="${timeoffBlockId}_Content"
                    class="allDayRequestTimeOff">
                    All Day
                    <div
                        id="${timeoffBlockId}_Pending"
                        class="ezPad8 ezText-micro-navy">
                        Approved
                        <div
                            id="EzDebugTimeOffId">
                            ${debugTimeOffId}
                        </div>
                    </div>
                </div>
            </div>`;
    }

    /**
     * @protectted
     * Renders a pending all day time off schedule card
     * @param {number} timeOffId
     * @param {String} timeOffBlockId
     * @param {String} timeOffTitleId
     * @param {String} displayRequestType
     * @param {moment} startTime
     * @param {moment} endTime
     * @returns {String}
     * HTML for the pending all day time off schedule card
     */
    ezRenderPendingAllDayTimeOffScheduleCard(timeOffId, timeoffBlockId, timeoffTitleId, displayRequestType) {
        if (!EzNumber.isNumber(timeOffId)) {
            throw new EzBadParamException(
                'timeOffId',
                EzScheduleRenderer.ezInstance,
                EzScheduleRenderer.ezInstance.ezRenderPendingAllDayTimeOffScheduleCard);
        }
        if (!EzString.hasLength(timeoffBlockId)) {
            throw new EzBadParamException(
                'timeoffBlockId',
                EzScheduleRenderer.ezInstance,
                EzScheduleRenderer.ezInstance.ezRenderPendingAllDayTimeOffScheduleCard);
        }
        if (!EzString.hasLength(timeoffTitleId)) {
            throw new EzBadParamException(
                'timeoffTitleId',
                EzScheduleRenderer.ezInstance,
                EzScheduleRenderer.ezInstance.ezRenderPendingAllDayTimeOffScheduleCard);
        }
        if (!EzString.hasLength(displayRequestType)) {
            throw new EzBadParamException(
                'displayRequestType',
                EzScheduleRenderer.ezInstance,
                EzScheduleRenderer.ezInstance.ezRenderPendingAllDayTimeOffScheduleCard);
        }

        const debugTimeOffId = EzBoolean.isTrue(ezApi.ezclocker.ezUrlHelper.ezDebugMode)
            ? `id=${timeOffId}`
            : EzString.EMPTY;

        return EzHtml.build`
            <div
                id="${timeoffBlockId}"
                class="scheduleBlock-read-only pendingRequestTimeOff">
                <table
                    id="${timeoffBlockId}_Table"
                    class="scheduleBlockTitle">
                    <tr
                        id="${timeoffBlockId}_Row"
                        class="requestTimeOffTableRow">
                        <td
                            id="${timeoffTitleId}"
                            class="scheduleBlockTitleCell ezLeftAlign pendingRequestTimeOffTableCell">
                            ${displayRequestType}
                        </td>
                        <td
                            id="${timeoffTitleId}_Buttons"
                            class="scheduleBlockTitleCell ezRightAlign pendingRequestTimeOffTableCell">
                            ${EzScheduleRenderer.ezInstance.ezBuildTimeoffDeleteBtn(timeOffId)}
                        </td>
                    </tr>
                </table>
                <div
                    id="${timeoffBlockId}_Content"
                    class="allDayRequestTimeOff">
                    All Day
                    <div
                        id="${timeoffBlockId}_Pending"
                        class="ezPad8 ezText-micro-gray">
                        (Pending Approval)
                        <div
                            id="EzDebugTimeOffId">
                            ${debugTimeOffId}
                        </div>
                    </div>
                </div>
            </div>`;
    }

    /**
     * @protected @method
     * Draws a time off box
     * @param {EzScheduleRenderContext} ezScheduleRenderContext
     */
    ezRenderTimeOffBox(ezScheduleRenderContext) {
        if (!EzObject.isValid(ezScheduleRenderContext)) {
            throw new EzBadParamException(
                'ezScheduleRenderContext',
                EzScheduleRenderer.ezInstance,
                EzScheduleRenderer.ezInstance.ezRenderTimeOffBox);
        }
        if (!EzObject.isValid(ezScheduleRenderContext.timeOff)) {
            throw new EzBadParamException(
                'ezScheduleRenderContext.timeOff',
                EzScheduleRenderer.ezInstance,
                EzScheduleRenderer.ezInstance.ezRenderTimeOffBox);
        }
        if (!EzObject.isValid(ezScheduleRenderContext.startMoment)) {
            throw new EzBadParamException(
                'ezScheduleRenderContext.startMoment',
                EzScheduleRenderer.ezInstance,
                EzScheduleRenderer.ezInstance.ezRenderTimeOffBox);
        }
        if (!EzObject.isValid(ezScheduleRenderContext.endMoment)) {
            throw new EzBadParamException(
                'ezScheduleRenderContext.endMoment',
                EzScheduleRenderer.ezInstance,
                EzScheduleRenderer.ezInstance.ezRenderTimeOffBox);
        }
        if (!EzString.hasLength(ezScheduleRenderContext.employeeDayCellId)) {
            throw new EzBadParamException(
                'ezScheduleRenderContext.employeeDayCellId',
                EzScheduleRenderer.ezInstance,
                EzScheduleRenderer.ezInstance.ezRenderTimeOffBox);
        }
        if (!EzObject.isValid(ezScheduleRenderContext.timeOff)) {
            throw new EzBadParamException(
                'ezScheduleRenderContext.timeOff',
                EzScheduleRenderer.ezInstance,
                EzScheduleRenderer.ezInstance.ezRenderTimeOffBox);
        }
        if (!EzNumber.isNumber(ezScheduleRenderContext.sortedTimeOffIndex)) {
            throw new EzBadParamException(
                'ezScheduleRenderContext.sortedTimeOffIndex',
                EzScheduleRenderer.ezInstance,
                EzScheduleRenderer.ezInstance.ezRenderTimeOffBox);
        }

        const timeoffBlockId = `${ezScheduleRenderContext.employeeDayCellId}_timeoff_${ezScheduleRenderContext.sortedTimeOffIndex}`;

        const timeoffTitleId = `${timeoffBlockId}_title`;

        if (EzBoolean.isTrue(ezScheduleRenderContext.timeOff.allDay)) {
            ezApi.ezclocker.ezUi.ezAppendContent(
                ezScheduleRenderContext.employeeDayCellId,
                'APPROVED' === ezScheduleRenderContext.timeOff.requestStatus
                    ? EzScheduleRenderer.ezInstance.ezRenderApprovedAllDayTimeOffScheduleCard(
                        ezScheduleRenderContext.timeOff.id,
                        timeoffBlockId,
                        timeoffTitleId,
                        EzTimeOffType.ezEnumData(ezScheduleRenderContext.timeOff.requestType).displayName)
                    : EzScheduleRenderer.ezInstance.ezRenderPendingAllDayTimeOffScheduleCard(
                        ezScheduleRenderContext.timeOff.id,
                        timeoffBlockId,
                        timeoffTitleId,
                        EzTimeOffType.ezEnumData(ezScheduleRenderContext.timeOff.requestType).displayName)
            );
        } else {
            ezApi.ezclocker.ezUi.ezAppendContent(
                ezScheduleRenderContext.employeeDayCellId,
                'APPROVED' === ezScheduleRenderContext.timeOff.requestStatus
                    ? EzScheduleRenderer.ezInstance.ezRenderApprovedTimeOffScheduleCard(
                        ezScheduleRenderContext.timeOff.id,
                        timeoffBlockId,
                        timeoffTitleId,
                        EzTimeOffType.ezEnumData(ezScheduleRenderContext.timeOff.requestType).displayName,
                        ezScheduleRenderContext.timeOff.startMoment,
                        ezScheduleRenderContext.timeOff.endMoment)
                    : EzScheduleRenderer.ezInstance.ezRenderPendingTimeOffScheduleCard(
                        ezScheduleRenderContext.timeOff.id,
                        timeoffBlockId,
                        timeoffTitleId,
                        EzTimeOffType.ezEnumData(ezScheduleRenderContext.timeOff.requestType).displayName,
                        ezScheduleRenderContext.timeOff.startMoment,
                        ezScheduleRenderContext.timeOff.endMoment));
        }
    }

    /**
     * @protected @method
     * Draws the assigned location title for the schedule
     * @param {string} scheduleTitleId
     * @param {string} locationId
     * @returns {Promise.resolve}
     */
    ezRenderAssignedLocoationTitleForSchedule(scheduleTitleId, locationId) {
        if (!EzString.hasLength(scheduleTitleId)) {
            throw new EzBadParamException(
                'scheduleTitleId',
                EzScheduleRenderer.ezInstance,
                EzScheduleRenderer.ezInstance.ezRenderAssignedLocoationTitleForSchedule);
        }
        if (!EzNumber.isNumber(locationId) || -1 === locationId) {
            throw new EzBadParamException(
                'locationId',
                EzScheduleRenderer.ezInstance,
                EzScheduleRenderer.ezInstance.ezRenderAssignedLocoationTitleForSchedule);
        }

        return EzPromise.asyncAction(
            (finished) => {
                return ezApi.ezclocker.ezLocationService.ezGetLocation(locationId)
                    .then(
                        (response) => {
                            const locationName = EzString.stringWithTextOrDefault(
                                response?.location?.name,
                                'No assigned location');

                            ezApi.ezclocker.ezUi.ezSetContent(
                                scheduleTitleId,
                                EzHtml.build`
                                    <div
                                        id="EzScheduleLocationName"
                                        title="${locationName}">
                                        ${locationName}
                                    </div>`);

                            return finished();
                        },
                        () => {
                            ezApi.ezclocker.ezUi.ezSetContent(
                                scheduleTitleId,
                                EzHtml.build`
                                    <div
                                        id="EzScheduleLocationName"
                                        title="No assigned location"
                                        class="animate__fadeIn">
                                    </div>`);

                            return finished();
                        });
            });
    }

    /**
     * @protected @method
     * Submits the cancel time off
     * @param {number} timeOffId
     */
    ezSubmitTimeOffToCancel(timeOffId) {
        if (!EzNumber.isNumber(timeOffId)) {
            throw new EzBadParamException(
                'timeOffId',
                EzScheduleRenderer.ezInstance,
                EzScheduleRenderer.ezInstance.ezRenderAssignedLocoationTitleForSchedule);
        }

        const timeOff = EzScheduleRenderer.ezInstance.timeOffsByEmployeeId
            .filter(timeoff => timeoff.id === timeOffId)[0];

        return ezApi.ezclocker.ezDialog.ezShowYesNo(
            'Confirm: Deny Time Off Request',
            'Are you sure you want to deny the time off request?')
            .then((dialogResult) => {
                ezApi.ezclocker.ezDialog.NO_DIALOG_RESPONSE.dialogStatus !== dialogResult.dialogStatus &&
                    ezApi.ezclocker.ezUi.ezStartPageWaitExecute(
                        'Updating time off record ...',
                        (waitDone) => {
                            timeOff.requestStatus = EzTimeOffStatus.CANCELED;

                            let url = `${ezApi.ezclocker.ezNavigation.ezGetInternalApiUrl('timeoff', 'v1')}/${timeOffId}`;

                            return ezApi.ezclocker.ezHttpHelper.ezPut(
                                url,
                                EzJson.toJson(timeOff))
                                .then(
                                    () => {
                                        ezApi.ezclocker.ezEmployerScheduleController.timeOffsByEmployeeId = EzScheduleRenderer.ezInstance.timeOffsByEmployeeId
                                            .filter(timeoff => timeoff.id !== timeOffId);

                                        ezApi.ezclocker.ezEmployerScheduleController.ezRefreshScheduleUx();

                                        waitDone()
                                            .then(EzPromise.ignoreResolve);
                                    },
                                    (eResponse, jqXHR) => waitDone()
                                        .then(
                                            () => {
                                                ezApi.ezclocker.ezLogger.error(`Unable to update timeoff request. Error: ${EzJson.toJson(eResponse)}`);

                                                return ezApi.ezclocker.ezDialog.ezShowPossibleDefectError(
                                                    'Unable to update timeoff request',
                                                    eResponse.message,
                                                    jqXHR,
                                                    eResponse,
                                                    EzString.em`
                                                        URL: ${url},
                                                        Request: ${EzJson.toJson(timeOff)}`);
                                            }));
                        });

            });
    }

    /**
     * @protected @method
     * Calculates the total schedule time
     * @param {number} mins
     * @return {number}
     */
    ezBuildTimeTotal(mins) {
        if (!EzNumber.isNumber(mins)) {
            throw new EzBadParamException(
                'mins',
                EzScheduleRenderer.ezInstance,
                EzScheduleRenderer.ezInstance.ezBuildTimeTotal);
        }

        const temp = mins % 60;

        if (0 === temp) {
            return `${parseInt(mins / 60, 10)}:00`;
        }

        if (10 > temp) {
            return `${parseInt(mins / 60, 10)}:0${temp}`;
        }

        return `${parseInt(mins / 60, 10)}:${temp}`;
    }


    /**
     * @protected @method
     * Calculates the next day from the provided current day
     * @returns {number}
     */
    ezGetNextDay(currentDay) {
        if (currentDay < 0 || currentDay === 6) {
            return 0;
        }

        return currentDay + 1;
    }


    /*
    =========================================================================================================================
    Start of EzClocker Class Initialization and EzApi Registration Section
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    !! FROM THIS POINT FORWARD: ONLY PLACE INITIALIZATION CODE !!
    || All other class code MUST go above this section. ||
    =========================================================================================================================
    */

    /**
     * @static
     * @public @readonly @property
     * Returns the name of this class's singleton instance when registered with ezApi.
     * @returns {string}
     */
    static get ezApiName() {
        return 'ezScheduleRenderer';
    }

    /**
     * @static
     * @public @readonly @property
     * Returns an object of event names that this class may trigger.
     * @returns {object}
     */
    static get ezEventNames() {
        return {
            onReady: 'ezOn_EzScheduleRenderer_Ready'
        };
    }

    /**
     * @static
     * @private @field
     * Stores the singleton instance of this class that was created by and registerd with EzApi.
     * @type {EzScheduleRenderer}
     */
    static #ezInstance = globalThis?.ezApi?.ready && globalThis.ezApi.ezclocker?.[EzScheduleRenderer.ezApiName]
        ? globalThis.ezApi.ezclocker[EzScheduleRenderer.ezApiName]
        : null;

    /**
     * @static
     * @public @property @getter
     * Returns the singleton instance of this class that is registered with EzApi (if available yet)
     * @returns {EzScheduleRenderer}
     */
    static get ezInstance() {
        return EzScheduleRenderer.#ezInstance;
    }

    /**
     * @static
     * @public @property @setter
     * Sets the singleton instance of of this class that is registered with EzApi.
     * @param {EzScheduleRenderer} instance
     */
    static set ezInstance(instance) {
        if (null != EzScheduleRenderer.#ezInstance) {
            throw new Error('EzScheduleRenderer\'s singleton instance is already reigstered with EzApi.');
        }

        EzScheduleRenderer.#ezInstance = instance;
    }

    /**
     * @static
     * @private @field
     * Stores the EzApi registration state for this class.
     * Default value is NULL
     * Class is registerd with EzApi when value is EzRegistrationState.REGISTERED
     * @type {string}
     * A valid enum property value from EzRegistrationState
     */
    static #ezApiRegistrationState = globalThis?.ezApi?.ready && globalThis.ezApi.ezclocker?.[EzScheduleRenderer.ezApiName]
        ? EzRegistrationState.REGISTERED
        : null;

    /**
     * @static
     * @public @property @getter
     * Returns the ezApi registration state of this classes's singleton instance.
     * @returns {string}
     * A valid enum property value from EzRegistrationState
     */
    static get ezApiRegistrationState() {
        return EzScheduleRenderer.#ezApiRegistrationState;
    }

    /**
     * @static
     * @public @property @setter
     * Sets the ezApi registration state of this classes's singleton instance.
     * @param {string} ezApiRegistrationState
     * A valid enum property value from EzRegistrationState
     */
    static set ezApiRegistrationState(ezApiRegistrationState) {
        EzScheduleRenderer.#ezApiRegistrationState = EzRegistrationState.ezValueOf(ezApiRegistrationState);
    }

    /**
     * @static
     * @private @readonly @property
     * Returns true when all required dependencies for this class report ready.
     * In otherwords, the require dependency's singleton instance is created
     * and is registered with and accessable from EzApi with ezApi.ezclocker.{dependency_name}.
     * @returns {boolean}
     */
    static get #ezCanRegister() {
        return EzRegistrationState.PENDING === EzScheduleRenderer.ezApiRegistrationState &&
            globalThis?.ezApi?.ready && globalThis.ezApi?.ezclocker &&
            globalThis.ezApi.ezclocker?.[EzUrlHelper.ezApiName]?.ready &&
            globalThis.ezApi.ezclocker?.[EzHttpHelper.ezApiName]?.ready &&
            globalThis.ezApi.ezclocker?.[EzNavigation.ezApiName]?.ready &&
            globalThis.ezApi.ezclocker?.[EzClockerContext.ezApiName]?.ready &&
            globalThis.ezApi.ezclocker?.[EzLocationService.ezApiName]?.ready &&
            globalThis.ezApi.ezclocker?.[EzUI.ezApiName]?.ready &&
            globalThis.ezApi.ezclocker?.[EzShiftEditorDialog.ezApiName]?.ready;
    }

    /**
     * @static
     * @private @readonly @property
     * Returns if this class's singleton instance is registered with ezApi yet.
     * @returns {boolean}
     */
    static get #ezIsRegistered() {
        return null != EzScheduleRenderer.ezInstance &&
            EzRegistrationState.REGISTERED === EzScheduleRenderer.ezApiRegistrationState;
    }

    /**
     * @static
     * @private @method
     * Attempts to register the singleton instance for this class with ezApi. Returns true
     * if successful, false otherwise.
     * @returns {boolean}
     */
    static #ezRegistrator() {
        if (EzScheduleRenderer.#ezCanRegister && !EzScheduleRenderer.#ezIsRegistered) {
            globalThis.ezApi.ezRegisterNewApi(EzScheduleRenderer, EzScheduleRenderer.ezApiName);
        }

        return EzScheduleRenderer.#ezIsRegistered;
    }

    /**
     * @static
     * Static Initialization
     * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
     * >> IMPORTANT <<
     * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
     * Make sure the following properties and methods get defined BEFORE this static initialization section:
     *     1) Property getter EzScheduleRenderer.ezApiName
     *     2) Property getter EzScheduleRenderer.ezEventNames
     *     3) Property getter EzScheduleRenderer.ezInstance
     *     4) Property setter EzScheduleRenderer.ezInstance
     *     5) Property getter EzScheduleRenderer.ezApiRegistrationState
     *     6) Property setter EzScheduleRenderer.ezApiRegistrationState
     *     7) Property getter EzScheduleRenderer.#ezCanRegister
     *     8) Property getter EzScheduleRenderer.#ezIsRegistered
     *     9) Method EzScheduleRenderer.#ezRegistrator()
     */
    static {
        if (!EzScheduleRenderer.#ezIsRegistered) {
            EzScheduleRenderer.ezApiRegistrationState = EzRegistrationState.PENDING;

            if (!EzScheduleRenderer.#ezRegistrator()) {
                document.addEventListener(
                    EzScheduleRenderer.ezOnEzApiReadyEventName,
                    EzScheduleRenderer.#ezRegistrator);

                document.addEventListener(
                    EzUrlHelper.ezEventNames.onReady,
                    EzScheduleRenderer.#ezRegistrator);

                document.addEventListener(
                    EzHttpHelper.ezEventNames.onReady,
                    EzScheduleRenderer.#ezRegistrator);

                document.addEventListener(
                    EzNavigation.ezEventNames.onReady,
                    EzScheduleRenderer.#ezRegistrator);

                EzScheduleRenderer.ezWaitReady(
                    EzClockerContext.ezEventNames.onReady,
                    EzScheduleRenderer.#ezRegistrator);

                document.addEventListener(
                    EzLocationService.ezEventNames.onReady,
                    EzScheduleRenderer.#ezRegistrator);

                EzScheduleRenderer.ezWaitReady(
                    EzUI.ezEventNames.onReady,
                    EzScheduleRenderer.#ezRegistrator);

                document.addEventListener(
                    EzShiftEditorDialog.ezEventNames.onReady,
                    EzScheduleRenderer.#ezRegistrator);
            }
        }
    }

    /*
    =========================================================================================================================
    End of EzClocker Class Initialization and EzApi Registration Section
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    !! DO NOT PLACE ANY NON-INITIALIZTION CODE BETWEEN THE START AND END OF THIS INITILIZATION SECTON !!
    !! DO NOT PLACE ANY CODE OF ANY KIND BELOW THIS POINT !!
    =========================================================================================================================
    */
}
