import {
    EzObject,
    EzBoolean,
    EzNumber,
    EzString
} from '/ezlibrary/helpers/EzHelpers.js';


/**
    @class
    @description
    Provides a context when rendering the employee schedule UX
    ---------------------------------------------------------------------------
    Import with:
        import { EzScheduleRenderContext } from '/ezlibrary/entities/EzScheduleRenderContext.js';
    ---------------------------------------------------------------------------
 */
export class EzScheduleRenderContext {
    /**
        @pubclic @constructor
        Creates a new instance of EzScheduleRenderContext
        @param {number} employeeId
        @param {number} employeeIndex
        @param {string} employeeDayCellId
        @param {number} currentDay
        @param {string} displayDay
     */
    constructor(employeeId, employeeIndex, employeeDayCellId, currentDay, dayInfoIndex) {
        this.employeeId = employeeId;

        this.employeeIndex = employeeIndex;

        this.employeeDayCellId = employeeDayCellId;

        this.currentDay = currentDay;

        this.ezDayInfoIndex = dayInfoIndex;
    }

    /**
        @private @field
        Stores the employeId who's schedule is rendering
        @type {number}
     */
    #employeeId = null;
    /**
        @public @property @getter
        Gets the employeId who's schedule is rendering
        @returns {number}
     */
    get employeeId() {
        return this.#employeeId;
    }
    /**
        @public @property @setter
        Sets the employeId who's schedule is rendering
        @param {number} aEmployeeId
     */
    set employeeId(aEmployeeId) {
        this.#employeeId = EzNumber.numberOrNull(aEmployeeId);
    }

    /**
        @private @field
        Stores the employee's index in the employees array
        @type {number}
     */
    #employeeIndex = null;
    /**
        @public @property @getter
        Gets the employee's index in the employees array
        @returns {number}
     */
    get employeeIndex() {
        return this.#employeeIndex;
    }
    /**
        @public @property @setter
        Sets the employee's index in the employees array
        @param {number} employeeIndex
     */
    set employeeIndex(employeeIndex) {
        this.#employeeIndex = EzNumber.numberOrNull(employeeIndex);
    }

    /**
        @private @field
        Stores the employeeDayCellId
        @type {string}
     */
    #employeeDayCellId = '';
    /**
        @public @property @getter
        Gets the employeeDayCellId
        @returns {string}
     */
    get employeeDayCellId() {
        return this.#employeeDayCellId;
    }
    /**
        @public @property @setter
        Sets the employeeDayCellId
        @param {string} employeeDayCellId
     */
    set employeeDayCellId(employeeDayCellId) {
        this.#employeeDayCellId = EzString.stringOrEmpty(employeeDayCellId);
    }

    /**
        @private @field
        Stores the schedule instance to render
        @type {object}
     */
    #schedule = null;
    /**
        @public @property @getter
        Gets the schedule instance to render
        @returns {object}
     */
    get schedule() {
        return this.#schedule;
    }
    /**
        @public @property @setter
        Sets the schedule instance to render
        @param {object} schedule
     */
    set schedule(schedule) {
        this.#schedule = EzObject.assignOrNull(schedule);
    }

    /**
        @private @field
        Stores the sorted schedule index
        @type {number}
     */
    #sortedScheduleIndex = 0;
    /**
        @public @property @getter
        Gets the sorted schedule index
        @returns {number}
     */
    get sortedScheduleIndex() {
        return this.#sortedScheduleIndex;
    }
    /**
        @public @property @setter
        Sets the sorted schedule index
        @param {number} sortedScheduleIndex
     */
    set sortedScheduleIndex(sortedScheduleIndex) {
        this.#sortedScheduleIndex = EzNumber.numberOrNull(sortedScheduleIndex);
    }

    /**
        @private @field
        Stores if the day has a schedule rendered
        @type {boolean}
     */
    #dayHasSchedule = false;
    /**
        @public @property @getter
        Gets if the day has a schedule rendered
        @returns {boolean}
     */
    get dayHasSchedule() {
        return this.#dayHasSchedule;
    }
    /**
        @public @property @setter
        Sets if the day has a schedule rendered
        @param {boolean} dayHasSchedule
     */
    set dayHasSchedule(dayHasSchedule) {
        this.#dayHasSchedule = EzBoolean.booleanOrFalse(dayHasSchedule);
    }

    /**
        @private @field
        Stores the time off instance to render
        @type {object}
     */
    #timeOff = null;
    /**
        @public @property @getter
        Gets the schedule instance to render
        @returns {object}
     */
    get timeOff() {
        return this.#timeOff;
    }
    /**
        @public @property @setter
        Sets the time off instance to render
        @param {object} timeOff
     */
    set timeOff(timeOff) {
        this.#timeOff = EzObject.assignOrNull(timeOff);
    }

    /**
        @private @field
        Stores if the day has a time off rendered
        @type {boolean}
     */
    #dayHasTimeOff = false;
    /**
        @public @property @getter
        Gets if the day has a time off rendered
        @returns {boolean}
     */
    get dayHasTimeOff() {
        return this.#dayHasTimeOff;
    }
    /**
        @public @property @setter
        Sets if the day has a time off rendered
        @param {boolean} dayHasTimeOff
     */
    set dayHasTimeOff(dayHasTimeOff) {
        this.#dayHasTimeOff = EzBoolean.booleanOrFalse(dayHasTimeOff);
    }


    /**
        @private @field
        Stores the sorted time off index
        @type {number}
     */
    #sortedTimeOffIndex = 0;
    /**
        @public @property @getter
        Gets the sorted time off index
        @returns {number}
     */
    get sortedTimeOffIndex() {
        return this.#sortedTimeOffIndex;
    }
    /**
        @public @property @setter
        Sets the sorted time off index
        @param {number} sortedTimeOffIndex
     */
    set sortedTimeOffIndex(sortedTimeOffIndex) {
        this.#sortedTimeOffIndex = EzNumber.numberOrNull(sortedTimeOffIndex);
    }

    /**
        @private @field
        Stores the schedule start moment
        @type {moment}
     */
    #startMoment = null;
    /**
        @public @property @getter
        Gets the schedule start moment
        @returns {moment}
     */
    get startMoment() {
        return this.#startMoment;
    }
    /**
        @public @property @setter
        Sets the schedule start moment
        @param {moment} startMoment
     */
    set startMoment(startMoment) {
        this.#startMoment = EzObject.assignOrNull(startMoment);
    }

    /**
        @private @field
        Stores the scehdule end moment
        @type {moment}
     */
    #endMoment = null;
    /**
        @public @property @getter
        Gets the scehdule end moment
        @returns {moment}
     */
    get endMoment() {
        return this.#endMoment;
    }
    /**
        @public @property @setter
        Sets the scehdule end moment
        @param {moment} endMoment
     */
    set endMoment(endMoment) {
        this.#endMoment = EzObject.assignOrNull(endMoment);
    }

    /**
        @private @field
        Stores the scehdule end moment
        @type {number}
     */
    #locationId = null;
    /**
        @public @property @getter
        Gets the scehdule end moment
        @returns {null|number}
     */
    get locationId() {
        return this.#locationId;
    }
    /**
        @public @property @setter
        Sets the scehdule end moment
        @param {null|number} locationId
     */
    set locationId(locationId) {
        this.#locationId = EzNumber.numberOrNull(locationId);
    }


    /**
        @private @field
        Stores the index of the day information within the EzScheduleRenderer.dayInfo array.
        @type {number}
     */
    #ezDayInfoIndex = 0;
    /**
        @public @property @getter
        Gets the index of the day information within the EzScheduleRenderer.dayInfo array.
        @returns {number}
     */
    get ezDayInfoIndex() {
        return this.#ezDayInfoIndex;
    }
    /**
        @public @property @setter
        Sets the index of the day information within the EzScheduleRenderer.dayInfo array.
        @param {number} displayDay
     */
    set ezDayInfoIndex(ezDayInfoIndex) {
        this.#ezDayInfoIndex = EzNumber.numberOrDefault(ezDayInfoIndex, 0);
    }
    /**
        @public @property @getter
        Gets the index of the day information within the EzScheduleRenderer.dayInfo array.
        @returns {number}
        @deprecated
        Will remove in a future release
        Migrate to the EzScheduleRenderContext.ezDayInfoIndex property
     */
    get dayInfoIndex() {
        return this.ezDayInfoIndex;
    }
    /**
        @public @property @setter
        Sets the index of the day information within the EzScheduleRenderer.dayInfo array.
        @param {number} displayDay
        @deprecated
        Will remove in a future release
        Migrate to the EzScheduleRenderContext.ezDayInfoIndex property
     */
    set dayInfoIndex(dayInfoIndex) {
        this.ezDayInfoIndex = dayInfoIndex;
    }

    /**
        @private @field
        Stores the current day
     */
    #currentDay = 1;
    /**
        @public @property @getter
        Gets the current day
        @returns {number}
     */
    get currentDay() {
        return this.#currentDay;
    }
    /**
        @public @property @setter
        Sets the current day
        @param {number} currentDay
     */
    set currentDay(currentDay) {
        this.#currentDay = EzNumber.numberOrDefault(currentDay, 1);
    }

    /**
        @private @field
        Stores if the day has an all-day time off
        @type {boolean}
     */
    #hasAllDayTimeOff = false;
    /**
        @public @property @getter
        Gets if the day has an all-day time off
        @returns {boolean}
     */
    get hasAllDayTimeOff() {
        return this.#hasAllDayTimeOff;
    }
    /**
        @public @property @setter
        Sets if the day has an all-day time off
        @param {boolean} hasAllDayTimeOff
     */
    set hasAllDayTimeOff(hasAllDayTimeOff) {
        this.#hasAllDayTimeOff = EzBoolean.booleanOrFalse(hasAllDayTimeOff);
    }

    /**
        @private @field
        Stores the total number minutes for the schedule that will render
        @type {minutes}
     */
    #minutes = 0;
    /**
        @public @property @getter
        Gets the total number minutes for the schedule that will render
        @returns {number}
     */
    get minutes() {
        return this.#minutes;
    }
    /**
        @public @property @setter
        Sets the total number minutes for the schedule that will render
        @param {number} minutes
     */
    set minutes(minutes) {
        this.#minutes = EzNumber.numberOrDefault(minutes, 0);
    }
}
