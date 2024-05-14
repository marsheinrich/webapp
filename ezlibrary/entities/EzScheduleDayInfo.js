import {
    EzObject,
    EzNumber
} from '/ezlibrary/helpers/EzHelpers.js';

import { EzJSONSerializable } from '/ezlibrary/entities/EzJSONSerializable.js';

import { EzDateTime } from '/public/javascript/common/ez-date-time.js';

/**
    @class
    @description
    Stores information for a schedule's day
    ---------------------------------------------------------------------------
    Import with:
        import { EzScheduleDayInfo } from '/ezlibrary/entities/EzScheduleDayInfo.js';
    ---------------------------------------------------------------------------
 */
export class EzScheduleDayInfo extends EzJSONSerializable {
    /**
        @public @constructor
        Creates a new instance of EzScheduleDayInfo
        @param {moment} moment
        The moment date (time at begin of day)a q
        @param {number} dayInfoIndex
     */
    constructor(moment, dayInfoIndex) {
        super();

        this.moment = ezApi.ezclocker.ezDateTime.ezCreateFromMomentWithTimeStartOfDay(moment);

        this.ezDayInfoIndex = dayInfoIndex;
    }

    /**
        @private @field
        Stores the index of this day in the EzScheduleRenderer's dayInfo array.
        @type {number}
     */
    #ezDayInfoIndex = 0;
    /**
        @public @property @getter
        Sets the index of this day in the EzScheduleRenderer's dayInfo array.
        @returns {number}
     */
    get ezDayInfoIndex() {
        return this.#ezDayInfoIndex;
    }
    /**
        @public @property @setter
        Gets the index of this day in the EzScheduleRenderer's dayInfo array.
        @param {number} ezDayInfoIndex
     */
    set ezDayInfoIndex(ezDayInfoIndex) {
        this.#ezDayInfoIndex = EzNumber.numberOrDefault(ezDayInfoIndex, 0);
    }

    /**
        @private @field
        Stores the moment for the day
        @type {moment}
     */
    #moment = null;
    /**
        @public @property @getter
        Gets the moment for the day
        @returns {moment}
     */
    get moment() {
        return this.#moment;
    }
    /**
        @public @property @setter
        Sets the moment for the day
        @param {moment} moment
     */
    set moment(moment) {
        this.#moment = EzObject.isValid(moment)
            ? moment
            : null;
    }

    /**
        @public @property @getter
        Returns the day date string in format: 'dddd MM/DD/YYYY'
        @returns {string}
     */
    get dayDateStr() {
        return EzObject.isValid(this.moment)
            ? this.moment.format(EzDateTime.DEFAULT_MOMENT_DAY_NAME_DATE_FORMAT)
            : 'n/a';
    }

    /**
        @public @property @setter
        Returns the day's date string in format: 'MM/DD/YYYY'
        @returns {string}
     */
    get dateStr() {
        return EzObject.isValid(this.moment)
            ? this.moment.format(EzDateTime.DEFAULT_MOMENT_DATE_FORMAT)
            : 'n/a';
    }

    /**
        @private @field
        Stores the map of employee id to total minutes for this day
        @returns {object}
     */
    #employeeIdTotalMinutesMap = {};
    /**
        @public @property @getter
        Gets the map of employee id to total minutes for this day
        @returns {object}
     */
    get employeeIdTotalMinutesMap() {
        return this.#employeeIdTotalMinutesMap;
    }
    /**
        @public @property @setter
        Sets the map of employee id to total minutes for this day
        @param {object} employeeIdTotalMinutesMap
     */
    set employeeIdTotalMinutesMap(employeeIdTotalMinutesMap) {
        this.employeeIdTotalMinutesMap = EzObject.assignOrDefault(employeeIdTotalMinutesMap, {});
    }

    /**
        @public @method
        Gets the total minutes entity for the employee for this day.
        @param {number} employeeId
        @returns {object}
        {
            totalScheduledMinutes: {number},
            totalTimeOffMinutes: {number}
        };
     */
    ezGetTotalMinutesForDayByEmployeeId(employeeId) {
        if (!EzNumber.isNumber(employeeId)) {
            throw new EzBadParamException(
                'employeeId',
                this,
                this.ezGetTotalMinutesForEmployeeId);
        }

        let employeeTotalMinutesForDay = this.employeeIdTotalMinutesMap[employeeId.toString()];

        if (!EzObject.isValid(employeeTotalMinutesForDay)) {
            employeeTotalMinutesForDay = {
                totalScheduledMinutes: 0,
                totalTimeOffMinutes: 0
            };

            this.employeeIdTotalMinutesMap[employeeId.toString()] = employeeTotalMinutesForDay
        }

        return employeeTotalMinutesForDay;
    }

    /**
        @public @method
        Stores the total minutes for a employee for this day
        @param {number} employeeId
        @param {undefined|null|number} totalMinutes
        Default is zero
     */
    ezStoreTotalScheduledMinutesForEmployeeId(employeeId, totalScheduledMinutes) {
        if (!EzNumber.isNumber(employeeId)) {
            throw new EzBadParamException(
                'employeeId',
                this,
                this.ezAddEmployeeTotalMinutes);
        }

        this.ezGetTotalMinutesForDayByEmployeeId(employeeId).totalScheduledMinutes = EzNumber.numberOrZero(totalScheduledMinutes);
    }

    /**
        @public @method
        Stores the total minutes for a employee for this day
        @param {number} employeeId
        @param {undefined|null|number} totalMinutes
        Default is zero
     */
    ezStoreTotalTimeOffMinutesForEmployeeId(employeeId, totalTimeOffMinutes) {
        if (!EzNumber.isNumber(employeeId)) {
            throw new EzBadParamException(
                'employeeId',
                this,
                this.ezAddEmployeeTotalMinutes);
        }

        this.ezGetTotalMinutesForDayByEmployeeId(employeeId).totalTimeOffMinutes = EzNumber.numberOrZero(totalTimeOffMinutes);
    }

    /**
        @public @method
        Gets the stored total minutes for the employee id for this day
        @param {number} employeeId
        @returns {number}
     */
    ezGetTotalScheduledMinutesForEmployeeId(employeeId) {
        if (!EzNumber.isNumber(employeeId)) {
            throw new EzBadParamException(
                'employeeId',
                this,
                this.ezGetTotalMinutesForEmployeeId);
        }

        return this.ezGetTotalMinutesForDayByEmployeeId(employeeId).totalScheduledMinutes;
    }

    /**
        @public @method
        Gets the stored total minutes for the employee id for this day
        @param {number} employeeId
        @returns {number}
     */
    ezGetTotalTimeOffMinutesForEmployeeId(employeeId) {
        if (!EzNumber.isNumber(employeeId)) {
            throw new EzBadParamException(
                'employeeId',
                this,
                this.ezGetTotalMinutesForEmployeeId);
        }

        return this.ezGetTotalMinutesForDayByEmployeeId(employeeId).totalTimeOffMinutes;
    }

    /**
        @override
        @public @readonly @property
        Returns this instance as a JSON Object (will no longer have the getter/setter methods).
        Useful for serailization to JSON.
        @returns {object}
     */
    get asJSONObject() {
        return {
            moment: this.moment,
            ezDayInfoIndex: this.ezDayInfoIndex,
            dayDateStr: this.dayDateStr,
            dateStr: this.dateStr
        }
    }

    /**
        @override
        @public @readonly @property
        Returns this instance as JSON string (no formatting)
        @returns {String}
    */
    get asJSON() {
        return super.asJSON;
    }

    /**
        @override
        @public @method
        Converts this instance into a JSON string with optional formatting.
        @param {undefined|null|Number} indentValue
        @param {undefined|null|Boolean} htmlDisplay
        @returns {String}
    */
    ezToJSON(indentValue, htmlDisplay) {
        return super.ezToJSON(indentValue, htmlDisplay);
    }

    /**
        @override
        @public @method
        Copies properties from the provided jsonObject to this instance (even if this instance does not define the property)
        @param {Object} jsonObject
        @returns {Object}
        Returns this instance with the key & values from the provided jsonObject.
    */
    ezFromJSONObject(jsonObject) {
        return super.ezFromJSONObject(jsonObject);
    }

    /**
        @override
        @public @method
        Converts the provided jsonString to a JSON object and then
        passes that object to ezFromJSONObject() to copies properties to this instance
        (even if this instance does not define the property)
        @param {String} jsonString
        @returns {Object}
        Returns this instance with the key & values from the provided json string.
    */
    ezLoadFromJson(jsonString) {
        return super.ezLoadFromJson(jsonString);
    }
}
