import {
    EzException,
    EzBadParamException
} from '/ezlibrary/exceptions/EzExceptions.js';

import {
    EzObject,
    EzBoolean,
    EzNumber,
    EzString,
    EzArray
} from '/ezlibrary/helpers/EzHelpers.js';

import {
    EzRegistrationState,
    EzEmployeeTimeEntryMode,
    EzGpsDataStatus,
    EzEntityType,
    EzSelectJobCodeDialogMode
} from '/ezlibrary/enums/EzEnumerations.js';

import { EzClass } from '/ezlibrary/EzClass.js';

import { EzEventEngine } from '/ezlibrary/ez-event-engine.js';

import { EzDateTime } from '/public/javascript/common/ez-date-time.js';
import { EzServices } from '/public/javascript/common/ez-services.js';

import { EzHttpHelper } from '/public/javascript/common/ezclocker-http-helper.js';
import { EzNavigation } from '/public/javascript/common/ezclocker-navigation-helper.js';

import { EzClockerContext } from '/ezlibrary/EzClockerContext/ez-context.js';

import { EzUI } from '/public/javascript/common/ezui.js';

import { EzClockInRequest } from '/ezlibrary/entities/requests/EzClockInRequest.js';

import { EzSelectJobCodeDialog } from '/secure/widgets/EzSelectJobCodeDialog/EzSelectJobCodeDialog.js';
import { EzEmployerOption } from "../../../ezlibrary/EzEmployerOption";

/**
    Javascript support for dashboard clock in/out functionality
    Import with:
        import { EzClockInClockOutHelper } from '/secure/javascript/common/ez-clockin-clockout-helper.js';

        globalThis.ezApi.ezclocker[EzClockInClockOutHelper.ezApiName] &&
        globalThis.ezApi.ezclocker[EzClockInClockOutHelper.ezApiName].ready

        document.addEventListener(
            EzClockInClockOutHelper.ezEventNames.onContextReady,
            this.#ezRegistrator);
 */
export class EzClockInClockOutHelper extends EzClass {
    static #ezInstance = Object.prototype.hasOwnProperty.call(globalThis, 'ezApi') &&
        globalThis.ezApi &&
        Object.prototype.hasOwnProperty.call(globalThis.ezApi, 'ezclocker') &&
        globalThis.ezApi.ezclocker &&
        Object.prototype.hasOwnProperty.call(globalThis.ezApi.ezclocker, EzClockInClockOutHelper.ezApiName) &&
        globalThis.ezApi.ezclocker[EzClockInClockOutHelper.ezApiName]
        ? globalThis.ezApi.ezclocker[EzClockInClockOutHelper.ezApiName]
        : null;

    static get ezInstance() {
        return this.#ezInstance;
    }

    static set ezInstance(ezClockInClockOutHelper) {
        if (null != EzClockInClockOutHelper.ezInstance) {
            throw new EzException('EzClockInClockOutHelper\'s singleton instance is already assigned.');
        }

        this.#ezInstance = ezClockInClockOutHelper;
    }

    static #ezApiRegistrationState = Object.prototype.hasOwnProperty.call(globalThis, 'ezApi') &&
        globalThis.ezApi &&
        Object.prototype.hasOwnProperty.call(globalThis.ezApi, 'ezclocker') &&
        globalThis.ezApi.ezclocker &&
        Object.prototype.hasOwnProperty.call(globalThis.ezApi.ezclocker, EzClockInClockOutHelper.ezApiName) &&
        globalThis.ezApi.ezclocker[EzClockInClockOutHelper.ezApiName]
        ? EzRegistrationState.REGISTERED
        : null;

    /**
        @public @getter @property
        Returns the state of EzClockInClockOutHelper singleton instance registration with ezApi.
        @returns {string}
        Returns a enumeration property value from EzRegistrationState or null.
     */
    static get ezApiRegistrationState() {
        return EzClockInClockOutHelper.#ezApiRegistrationState;
    }

    /**
        @public @setter @property
        Sets the state of EzClockInClockOutHelper singleton instance registration with ezApi.
        @param {string}
        A valid enumeration property value from EzRegistrationState or null.
     */
    static set ezApiRegistrationState(ezRegistrationState) {
        EzClockInClockOutHelper.#ezApiRegistrationState = EzRegistrationState.ezValueOf(ezRegistrationState);

        if (EzRegistrationState.UNKNOWN === EzClockInClockOutHelper.#ezApiRegistrationState) {
            EzClockInClockOutHelper.#ezApiRegistrationState = null;
        }
    }

    /**
        @public @static @readonly @property
        @returns {string}
     */
    static get ezApiName() {
        return 'ezClockInClockOutHelper';
    }

    /**
        @public @static @readonly @property
        @returns {object}
     */
    static get ezEventNames() {
        return {
            onReady: 'ezOn_EzClockInClockOutHelper_Ready',
            onEmployeeClockedIn: 'ezOn_EzClockInClockOutHelper_ClockedIn',
            onEmployeeClockedOut: 'ezOn_EzClockInClockOutHelper_ClockedOut'
        };
    }

    /**
        @public @static @readonly @property
        @returns {boolean}
     */
    static get ezCanRegister() {
        return EzRegistrationState.PENDING === EzClockInClockOutHelper.ezApiRegistrationState &&
            Object.prototype.hasOwnProperty.call(globalThis, 'ezApi') &&
            globalThis.ezApi && globalThis.ezApi.ready &&

            globalThis.ezApi.ezclocker[EzDateTime.ezApiName] &&
            globalThis.ezApi.ezclocker[EzDateTime.ezApiName].ready &&

            globalThis.ezApi.ezclocker[EzEventEngine.ezApiName] &&
            globalThis.ezApi.ezclocker[EzEventEngine.ezApiName].ready &&

            globalThis.ezApi.ezclocker[EzServices.ezApiName] &&
            globalThis.ezApi.ezclocker[EzServices.ezApiName].ready &&

            globalThis.ezApi.ezclocker[EzClockerContext.ezApiName] &&
            globalThis.ezApi.ezclocker[EzClockerContext.ezApiName].ready &&

            globalThis.ezApi.ezclocker[EzHttpHelper.ezApiName] &&
            globalThis.ezApi.ezclocker[EzHttpHelper.ezApiName].ready &&

            globalThis.ezApi.ezclocker[EzNavigation.ezApiName] &&
            globalThis.ezApi.ezclocker[EzNavigation.ezApiName].ready &&

            globalThis.ezApi.ezclocker[EzUI.ezApiName] &&
            globalThis.ezApi.ezclocker[EzUI.ezApiName].ready &&

            globalThis.ezApi.ezclocker[EzSelectJobCodeDialog.ezApiName] &&
            globalThis.ezApi.ezclocker[EzSelectJobCodeDialog.ezApiName].ready;
    }

    /**
        @private @static @method
        Registers EzClockInClockOutHelper with ezApi (if possible)
        Returns true if registered, false otherwise.
        @returns {boolean}
     */
    static #ezRegistrator() {
        if (!EzClockInClockOutHelper.ezCanRegister) {
            return false;
        }

        globalThis.ezApi.ezRegisterNewApi(EzClockInClockOutHelper, EzClockInClockOutHelper.ezApiName);
        EzClockInClockOutHelper.ezApiRegistrationState = EzRegistrationState.REGISTERED;
        return true;
    }

    /**
        Static Initializer
     */
    static {
        if (null == EzClockInClockOutHelper.ezApiRegistrationState) {
            EzClockInClockOutHelper.ezApiRegistrationState = EzRegistrationState.PENDING;

            document.addEventListener(
                'onEzApiReady',
                () => {
                    if (!EzClockInClockOutHelper.#ezRegistrator()) {
                        document.addEventListener(
                            EzDateTime.ezEventNames.onReady,
                            EzClockInClockOutHelper.#ezRegistrator);

                        document.addEventListener(
                            EzEventEngine.ezEventNames.onReady,
                            EzClockInClockOutHelper.#ezRegistrator);

                        document.addEventListener(
                            EzServices.ezEventNames.onReady,
                            EzClockInClockOutHelper.#ezRegistrator);

                        document.addEventListener(
                            EzClockerContext.ezEventNames.onReady,
                            EzClockInClockOutHelper.#ezRegistrator);

                        document.addEventListener(
                            EzHttpHelper.ezEventNames.onReady,
                            EzClockInClockOutHelper.#ezRegistrator);

                        document.addEventListener(
                            EzNavigation.ezEventNames.onReady,
                            EzClockInClockOutHelper.#ezRegistrator);

                        document.addEventListener(
                            EzUI.ezEventNames.onReady,
                            EzClockInClockOutHelper.#ezRegistrator);

                        document.addEventListener(
                            EzSelectJobCodeDialog.ezEventNames.onReady,
                            EzClockInClockOutHelper.#ezRegistrator);
                    }
                });
        }
    }

    /**
        @public @constructor
     */
    constructor() {
        super();
    }

    /**
        @private @field
        @type {string|EzEmployeeTimeEntryMode}
     */
    #ezTimeEntryMode = EzEmployeeTimeEntryMode.UNKNOWN;

    /**
        @public @property @getter
        @returns {string|EzEmployeeTimeEntryMode}
     */
    get ezTimeEntryMode() {
        return this.#ezTimeEntryMode;
    }

    /**
        @public @property @setter
        @param {string}
        A valid enum property value from EzEmployeeTimeEntryMode
     */
    set ezTimeEntryMode(ezEmployeeTimeEntryMode) {
        this.#ezTimeEntryMode = EzEmployeeTimeEntryMode.ezValueOf(ezEmployeeTimeEntryMode);
    }

    /**
        @public @readonly @property
        Returns the static EzClockInClockOutHelper.ezEventNames
        @deprecated
        Migrate to using the static reference: EzClockInClockOutHelper.ezEventNames
     */
    get ezEventNames() {
        return EzClockInClockOutHelper.ezEventNames;
    }

    /**
        @public @readonly @property
        Returns the currently logged in user's name to use in modifiedBy type fields.
        If the system is unable to determine who is currently logged in from the ezClockerContext
        then the value of 'UNKNOWN' is returned.
        @returns {String}
     */
    get ezCurrentUserName() {
        let userAccount = EzObject.isValid(ezApi.ezclocker.ezClockerContext)
            ? ezApi.ezclocker.ezClockerContext.ezGetUserContext().userAccount
            : null;

        if (!EzObject.isValid(userAccount)) {
            return 'UNKNOWN';
        }

        if (EzString.stringHasLength(userAccount.username)) {
            return userAccount.username;
        }

        if (EzString.stringHasLength(userAccount.fullName)) {
            return userAccount.fullName;
        }

        if (EzString.stringHasLength(userAccount.contactEmail)) {
            return userAccount.contactEmail;
        }

        if (EzString.stringHasLength(userAccount.fullContactNumber)) {
            return userAccount.fullContactNumber;
        }

        return `User id ${userAccount.id}`;
    }

    /**
        @protected
        Initializes EzClockerInOutHandler
        @returns {EzClockInClockOutHelper}
     */
    ezInit() {
        ezApi.ezclocker.ezEventEngine.ezRegisterEvent(
            EzClockInClockOutHelper.ezApiName,
            EzClockInClockOutHelper.ezEventNames.onEmployeeClockedIn);

        ezApi.ezclocker.ezEventEngine.ezRegisterEvent(
            EzClockInClockOutHelper.ezApiName,
            EzClockInClockOutHelper.ezEventNames.onEmployeeClockedOut);

        return EzClockInClockOutHelper.ezInstance;
    }

    /**
        @public
        Gets the current EzEmployeeTimeEntryMode
        @returns {EzClockInClockOutHelper}
        @deprecated
        Use the property getter/setter now:
        let aMode = EzClockInClockOutHelper.ezInstance.ezTimeEntryMode;
        EzClockInClockOutHelper.ezInstance.ezTimeEntryMode = aMode;
     */
    ezGetTimeEntryMode() {
        return EzClockInClockOutHelper.ezInstance.ezTimeEntryMode;
    }

    /**
        @protected
        DO NOT CALL THIS OUTSIDE OF THIS CLASS
        @param {EzClockInClockOutHelper} ezClockInClockOutHelper
     */
    ezSetTimeEntryMode(ezEmployeeTimeEntryMode) {
        EzClockInClockOutHelper.ezInstance.ezTimeEntryMode = ezEmployeeTimeEntryMode;

        if (EzEmployeeTimeEntryMode.CLOCKED_IN === EzClockInClockOutHelper.ezInstance.ezTimeEntryMode) {
            ezApi.ezclocker.ezEventEngine.ezTriggerEvent(
                EzClockInClockOutHelper.ezEventNames.onEmployeeClockedIn,
                ezApi.ezclocker.ezEventEngine.ezBuildEventData(
                    EzClockInClockOutHelper.ezApiName,
                    'Active employee is clocked in.',
                    {
                        isActiveTimeEntry: ezApi.ezclocker.ezClockerContext.ezGetActiveEmployee().isActiveTimeEntry,
                        activeTimeEntry: ezApi.ezclocker.ezClockerContext.ezGetActiveEmployee().activeTimeEntry,
                        isActiveBreak: ezApi.ezclocker.ezClockerContext.ezGetActiveEmployee().isActiveBreak,
                        activeBreak: ezApi.ezclocker.ezClockerContext.ezGetActiveEmployee().activeBreak,
                    }));
        } else if (EzEmployeeTimeEntryMode.CLOCKED_OUT === EzClockInClockOutHelper.ezInstance.ezTimeEntryMode) {
            ezApi.ezclocker.ezEventEngine.ezTriggerEvent(
                EzClockInClockOutHelper.ezEventNames.onEmployeeClockedOut,
                ezApi.ezclocker.ezEventEngine.ezBuildEventData(
                    EzClockInClockOutHelper.ezApiName,
                    'Active employee is clocked out.',
                    {
                        isActiveTimeEntry: ezApi.ezclocker.ezClockerContext.ezGetActiveEmployee().isActiveTimeEntry,
                        activeTimeEntry: ezApi.ezclocker.ezClockerContext.ezGetActiveEmployee().activeTimeEntry,
                        isActiveBreak: ezApi.ezclocker.ezClockerContext.ezGetActiveEmployee().isActiveBreak,
                        activeBreak: ezApi.ezclocker.ezClockerContext.ezGetActiveEmployee().activeBreak,
                    }));
        }
    }

    /**
        @public
        Refreshes the active clock in data.
        @returns {Promise.resolve}
     */
    ezRefreshActiveClockIn(quiet) {
        function _handleEzRefreshActiveEmployeeActiveClockInResolve(employeeInfo, resolver) {
            EzClockInClockOutHelper.ezInstance.ezSetTimeEntryMode(
                EzBoolean.isTrue(employeeInfo.activeClockIn)
                    ? EzEmployeeTimeEntryMode.CLOCKED_IN
                    : EzEmployeeTimeEntryMode.CLOCKED_OUT);

            return resolver(employeeInfo);
        }

        return EzBoolean.isTrue(quiet)
            ? ezApi.ezclocker.ezClockerContext.ezRefreshActiveEmployeeActiveClockIn()
                .then(
                    (employeeInfo) => _handleEzRefreshActiveEmployeeActiveClockInResolve(
                        employeeInfo,
                        ezApi.ezResolve))
            : ezApi.ezclocker.ezUi.ezStartPageWaitResolve(
                'Checking clock in/out status ...',
                (waitDone, resolve) => {
                    ezApi.ezclocker.ezClockerContext.ezRefreshActiveEmployeeActiveClockIn()
                        .then(
                            (employeeInfo) => {
                                waitDone();
                                return _handleEzRefreshActiveEmployeeActiveClockInResolve(
                                    employeeInfo,
                                    resolve);
                            });
                });
    }

    /**
        @public
        Creates the TimeEntry payload
        @param {number} employerId
        @param {number} employeeId
        @param {Number|null} customerId
        @param {Number|null} scheduleId
        @param {Number|null} associatedScheduleId
        @param {String|null} clockInIso
        @param {String|null} clockOutIso
        @param {String|null} notes
        @param {String|null} modifiedBy
        @param {String|null} geoDataStatus
        @param {Object|null} geoPosition
        @param {String|null} geoSource
        @param {Boolean|null} overrideLocationCheck
        @param {Boolean|null} doNotAudit
        @param {String|null} source
        @returns {object}
        TimeEntry payload
     */
    ezCreateTimeEntryPayload(employerId, employeeId, customerId, scheduleId, associatedScheduleId, clockInIso,
        clockInGPSDataStatus, clockInGPSFailureMessage, clockOutIso, clockOutGPSDataStatus, clockOutGPSFailureMessage,
        notes, modifiedBy, geoPosition, geoSource, dataTagMaps, assignedJobs, jobMappings, overrideLocationCheck,
        doNotAudit, source) {
        if (!EzNumber.isNumber(employerId)) {
            throw new EzBadParamException(
                'employerId',
                EzClockInClockOutHelper.ezInstance,
                EzClockInClockOutHelper.ezInstance.ezCreateTimeEntryPayload);
        }
        if (!EzNumber.isNumber(employeeId)) {
            throw new EzBadParamException(
                'employeeId',
                EzClockInClockOutHelper.ezInstance,
                EzClockInClockOutHelper.ezInstance.ezCreateTimeEntryPayload);
        }

        return {
            employerId: employerId,

            employeeId: employeeId,

            customerId: customerId,

            scheduleId: scheduleId,

            associatedScheduleId: associatedScheduleId,

            clockInIso: EzString.stringOrNull(clockInIso),

            clockInTimeZoneId: EzString.stringOrNull(clockInIso),

            clockInGpsStatus: EzString.stringOrDefault(clockInGPSDataStatus, 'UNKNOWN'),

            clockInGPSFailureMessage: EzString.stringOrEmpty(clockInGPSFailureMessage),

            gpsDataStatus: EzString.stringHasLength(clockInGPSDataStatus) && 'NONE' !== clockInGPSDataStatus &&
                'UNKNOWN' !== clockInGPSDataStatus
                ? EzString.stringOrDefault(clockInGPSDataStatus, 'UNKNOWN')
                : EzString.stringOrDefault(clockOutGPSDataStatus, 'UNKNOWN'),

            clockOutIso: EzString.stringOrNull(clockOutIso),

            clockOutTimeZoneId: ezApi.ezclocker.ezDateTime.activeTimeZone,

            clockOutGpsStatus: EzString.stringOrDefault(clockOutGPSDataStatus, 'UNKNOWN'),

            clockOutGPSFailureMessage: EzString.stringOrEmpty(clockOutGPSFailureMessage),

            isActiveClockIn: EzObject.isValid(clockOutIso),

            modifiedBy: EzString.stringOrNull(modifiedBy),

            description: EzString.stringOrEmpty(notes),

            notes: EzString.stringOrEmpty(notes),

            dataTagMaps: EzArray.arrayOrNull(dataTagMaps),

            assignedJobs: EzArray.arrayOrNull(assignedJobs),

            jobMappings: EzArray.arrayOrNull(jobMappings),

            targetDateTimeZone: ezApi.ezclocker.ezDateTime.activeTimeZone,

            longitude: EzObject.isValid(geoPosition) &&
                EzObject.isValid(geoPosition.coords) &&
                EzObject.isValid(geoPosition.coords.longitude)
                ? geoPosition.coords.longitude
                : null,

            latitude: EzObject.isValid(geoPosition) &&
                EzObject.isValid(geoPosition.coords) &&
                EzObject.isValid(geoPosition.coords.latitude)
                ? geoPosition.coords.latitude
                : null,

            accuracy: EzObject.isValid(geoPosition) &&
                EzObject.isValid(geoPosition.coords) &&
                EzObject.isValid(geoPosition.coords.accuracy)
                ? geoPosition.coords.accuracy
                : null,

            altitudeAccuracy: EzObject.isValid(geoPosition) &&
                EzObject.isValid(geoPosition.coords) &&
                EzObject.isValid(geoPosition.coords.altitude)
                ? geoPosition.coords.altitude
                : null,

            altitude: EzObject.isValid(geoPosition) &&
                EzObject.isValid(geoPosition.coords) &&
                EzObject.isValid(geoPosition.coords.altitudeAccuracy)
                ? geoPosition.coords.altitudeAccuracy
                : null,

            speed: EzObject.isValid(geoPosition) &&
                EzObject.isValid(geoPosition.coords) &&
                EzObject.isValid(geoPosition.coords.speed)
                ? geoPosition.coords.speed
                : null,

            geoTimestamp: EzObject.isValid(geoPosition) &&
                EzObject.isValid(geoPosition.timestamp)
                ? geoPosition.timestamp
                : null,

            radius: null,

            gpsSource: EzString.stringOrDefault(geoSource, 'BROWSER'),

            overrideLocationCheck: EzBoolean.isTrue(overrideLocationCheck),

            doNotAudit: EzBoolean.isTrue(doNotAudit),

            source: EzString.stringOrDefault(source, 'website'),

            locTime: ezApi.ezclocker.ezDateTime.ezNowAsIso()
        };
    }

    /**
        @public
        Performs a clock-in
        @param {number} employer
        @param {number} employee
        @param {object} selectedPeriod
        @param {undefined|null|array} jobDataTagIds
        @returns {Promise}
     */
    ezClockIn(employerId, employeeId, selectedPeriod, jobDataTagIds) {
        if (!EzNumber.isNumber(employerId)) {
            throw new EzBadParamException(
                'employerId',
                EzClockInClockOutHelper.ezInstance,
                EzClockInClockOutHelper.ezInstance.ezClockIn);
        }
        if (!EzNumber.isNumber(employeeId)) {
            throw new EzBadParamException(
                'employeeId',
                EzClockInClockOutHelper.ezInstance,
                EzClockInClockOutHelper.ezInstance.ezClockIn);
        }

        let clockInMoment = ezApi.ezclocker.ezDateTime.ezNow();

        return ezApi.ezPromise(
            (resolve, reject) => EzClockInClockOutHelper.ezInstance.ezRefreshActiveClockIn(true)
                .then(
                    (employeeInfo) => {
                        if (EzObject.isValid(employeeInfo.activeClockIn)) {
                            return resolve(
                                ezApi.ezCreateErrorResponse(1, 'Employee is already clocked in.'));
                        }

                        let locationRequest = {
                            enableHighAccuracy: true,
                            timeout: 30000,
                            maximumAge: 0
                        };

                        return ezApi.ezclocker.ezHtml5GPS.getLocation(locationRequest)
                            .then(
                                (gpsPosition) => {
                                    let gpsStatus = 'UNKNOWN';

                                    let gpsFailureMessage = '';

                                    if (EzObject.isValid(gpsPosition)) {
                                        if (EzNumber.isNumber(gpsPosition.code)) {
                                            switch (gpsPosition.code) {
                                                case 1:
                                                    gpsStatus = 'DISABLED';
                                                    gpsFailureMessage = ezApi.ezStringOrDefault(
                                                        gpsPosition.message,
                                                        'User denied Geolocation.');
                                                    break;
                                                case 0:
                                                default:
                                                    gpsStatus = 'ACTIVE';
                                            }
                                        } else {
                                            gpsStatus = 'ACTIVE';
                                        }
                                    }

                                    // geo clock in
                                    if ('ACTIVE' === gpsStatus) {
                                        return EzClockInClockOutHelper.ezInstance.ezClockInWithGeo(
                                            employerId,
                                            employeeId,
                                            clockInMoment,
                                            selectedPeriod,
                                            gpsPosition,
                                            EzArray.arrayHasLength(jobDataTagIds)
                                                ? jobDataTagIds
                                                : null)
                                            .then(
                                                (response) => {
                                                    EzClockInClockOutHelper.ezInstance.ezSetTimeEntryMode(EzEmployeeTimeEntryMode.CLOCKED_IN);
                                                    return resolve(response);
                                                },
                                                reject);
                                    }
                                    return EzClockInClockOutHelper.ezInstance.ezClockInWithoutGeo(
                                        employerId,
                                        employeeId,
                                        clockInMoment,
                                        selectedPeriod,
                                        gpsStatus,
                                        gpsFailureMessage,
                                        EzArray.arrayHasLength(jobDataTagIds)
                                            ? jobDataTagIds
                                            : null)
                                        .then(
                                            (response) => {
                                                EzClockInClockOutHelper.ezInstance.ezSetTimeEntryMode(EzEmployeeTimeEntryMode.CLOCKED_IN);
                                                return resolve(response);
                                            },
                                            reject);
                                },
                                (gpsErrorCode) => {
                                    // non-geo clock in
                                    let em = ezApi.ezclocker.ezHtml5GPS.getMessageForErrorCode(gpsErrorCode);

                                    ezApi.ezclocker.ezLogger.error(`GPS error: ${gpsErrorCode}, ${em}.`);

                                    // Perform clock out without geo
                                    return EzClockInClockOutHelper.ezInstance.ezClockInWithoutGeo(
                                        employerId,
                                        employeeId,
                                        clockInMoment,
                                        selectedPeriod,
                                        'NOT_AVAILABLE',
                                        'Not Available',
                                        EzArray.arrayHasLength(jobDataTagIds)
                                            ? jobDataTagIds
                                            : null)
                                        .then(
                                            (response) => {
                                                EzClockInClockOutHelper.ezInstance.ezSetTimeEntryMode(EzEmployeeTimeEntryMode.CLOCKED_IN);
                                                return resolve(response);
                                            }, reject);
                                });
                    }));
    }

    /**
        @public @method
        Performs a clock in with GEO location data
        @param {Number} employer
        @param {Number} employee
        @param {moment} clockInMoment
        @param {Object} selectedPeriod
        @param {Pbject} gpsPosition
        @param {undefined|null|array} jobDataTagIds
        @param {Boolean} overrideLocationCheck
        @returns {Promise}
     */
    ezClockInWithGeo(employerId, employeeId, clockInMoment, selectedPeriod, geoPosition, dataTagMaps, overrideLocationCheck) {
        if (!EzNumber.isNumber(employerId)) {
            throw new EzBadParamException(
                'employerId',
                EzClockInClockOutHelper.ezInstance,
                EzClockInClockOutHelper.ezInstance.ezClockInWithGeo);
        }
        if (!EzNumber.isNumber(employeeId)) {
            throw new EzBadParamException(
                'employeeId',
                EzClockInClockOutHelper.ezInstance,
                EzClockInClockOutHelper.ezInstance.ezClockInWithGeo);
        }
        if (!EzObject.isValid(clockInMoment)) {
            throw new EzBadParamException(
                'clockInMoment',
                EzClockInClockOutHelper.ezInstance,
                EzClockInClockOutHelper.ezInstance.ezClockInWithGeo);
        }
        if (!EzObject.isValid(selectedPeriod)) {
            throw new EzBadParamException(
                'currentStartPeriodDate',
                EzClockInClockOutHelper.ezInstance,
                EzClockInClockOutHelper.ezInstance.ezClockInWithGeo);
        }

        if (!EzObject.isValid(geoPosition)) {
            return EzClockInClockOutHelper.ezInstance.ezClockInWithoutGeo(
                employerId,
                employeeId,
                clockInMoment,
                selectedPeriod);
        }

        let clockInRequest = new EzClockInRequest(
            employerId,
            employeeId,
            clockInMoment);

        clockInRequest.gpsDataStatus = EzGpsDataStatus.ACTIVE;
        clockInRequest.clockInGpsStatus = EzGpsDataStatus.ACTIVE;

        clockInRequest.createdBy = this.ezCurrentUserName;

        if (EzArray.arrayHasLength(dataTagMaps)) {
            for (let dataTagMap of dataTagMaps) {
                clockInRequest.dataTagMaps.push(dataTagMap);
            }
        }

        clockInRequest.overrideLocationCheck = EzBoolean.isTrue(overrideLocationCheck);

        clockInRequest.source = 'WEBSITE';

        clockInRequest.geoSource = 'BROWSER';

        if (EzObject.isValid(geoPosition) && EzObject.isValid(geoPosition.coords)) {
            if (EzObject.isValid(geoPosition.coords.longitude)) {
                clockInRequest.longitude = geoPosition.coords.longitude.toString();
            }

            if (EzObject.isValid(geoPosition.coords.latitude)) {
                clockInRequest.latitude = geoPosition.coords.latitude.toString();
            }

            if (EzObject.isValid(geoPosition.coords.accuracy)) {
                clockInRequest.accuracy = geoPosition.coords.accuracy.toString();
            }

            if (EzObject.isValid(geoPosition.coords.altitude)) {
                clockInRequest.altitudeAccuracy = geoPosition.coords.altitude.toString()
            }

            if (EzObject.isValid(geoPosition.coords.altitudeAccuracy)) {
                clockInRequest.altitude = geoPosition.coords.altitudeAccuracy.toString();
            }

            if (EzObject.isValid(geoPosition.coords.heading)) {
                clockInRequest.heading = geoPosition.heading;
            }

            if (EzObject.isValid(geoPosition.coords.speed)) {
                clockInRequest.speed = geoPosition.coords.speed.toString();
            }

            if (EzObject.isValid(geoPosition.coords.timestamp)) {
                clockInRequest.geoTimestamp = geoPosition.timestamp;
            }
        }

        return EzClockInClockOutHelper.ezInstance.ezSubmitClockIn(
            clockInRequest,
            selectedPeriod);
    }

    /**
        @public
        Performs a clock in without GEO location data
        @param {number} employer
        @param {number} employee
        @param {string} clockInIsoSnapshot
        @param {object} selectedPeriod
        @param {string} gpsStatus
        @param {string} gpsFailureMessage
        @param {undefined|null|Array} dataTagMaps
        @returns {Promise}
     */
    ezClockInWithoutGeo(employerId, employeeId, clockInMoment, selectedPeriod, gpsStatus, gpsFailureMessage, dataTagMaps) {
        let value = ezApi.ezclocker.ezClockerContext.ezReadActiveEmployerOption(
                EzEmployerOption.EZOPTION_REQUIRE_LOCATION_FOR_CLOCKINOUT,
            '0');

        let valueBoolean = ezApi.ezclocker.ezOptionsService.ezOptionValueToBoolean(value);

        if (valueBoolean && ezApi.ezclocker.ezClockerContext.isEmployee) {
            return ezApi.ezclocker.ezDialog.ezShowErrorDialog('Geo location must be turned on to clock in/out',
            'Your employer has mandated that your location services (GPS) must be turned on when clocking in/out. If you do not ' +
                'know how to turn it on then please do a Google search for how to turn on location service in Chrome browser or' +
                ' whatever browser you are using.'
                );
        } else {
            if (!EzNumber.isNumber(employerId)) {
                throw new EzBadParamException(
                    'employerId',
                    EzClockInClockOutHelper.ezInstance,
                    EzClockInClockOutHelper.ezInstance.ezClockInWithoutGeo);
            }
            if (!EzNumber.isNumber(employeeId)) {
                throw new EzBadParamException(
                    'employeeId',
                    EzClockInClockOutHelper.ezInstance,
                    EzClockInClockOutHelper.ezInstance.ezClockInWithoutGeo);
            }
            if (!EzObject.isValid(clockInMoment)) {
                throw new EzBadParamException(
                    'clockInMoment',
                    EzClockInClockOutHelper.ezInstance,
                    EzClockInClockOutHelper.ezInstance.ezClockInWithoutGeo);
            }
            if (!EzObject.isValid(selectedPeriod)) {
                throw new EzBadParamException(
                    'selectedPeriod',
                    EzClockInClockOutHelper.ezInstance,
                    EzClockInClockOutHelper.ezInstance.ezClockInWithoutGeo);
            }

            let clockInRequest = new EzClockInRequest(
                employerId,
                employeeId,
                clockInMoment);

            clockInRequest.gpsDataStatus = EzGpsDataStatus.ezAsEnum(gpsStatus);
            clockInRequest.clockInGpsStatus = EzGpsDataStatus.ezAsEnum(gpsStatus);

            clockInRequest.clockInGpsFailureMessage = gpsFailureMessage;

            clockInRequest.modifiedBy = this.ezCurrentUserName;

            if (EzArray.arrayHasLength(dataTagMaps)) {
                for (let dataTagMap of dataTagMaps) {
                    clockInRequest.dataTagMaps.push(dataTagMap);
                }
            }

            clockInRequest.source = 'WEBSITE';

            clockInRequest.geoSource = 'BROWSER';

            return EzClockInClockOutHelper.ezInstance.ezSubmitClockIn(
                clockInRequest,
                selectedPeriod);
        }
    }

    /**
        @public
        Submits a clock in time entry request.
        @param {object} clockInRequest
        @param {object} selectedPeriod
        @returns {Promise}
     */
    ezSubmitClockIn(clockInRequest, selectedPeriod) {
        if (!EzObject.isValid(clockInRequest)) {
            throw new EzBadParamException(
                'clockInRequest',
                EzClockInClockOutHelper.ezInstance,
                EzClockInClockOutHelper.ezInstance.ezSubmitClockIn);
        }
        if (!EzObject.isValid(selectedPeriod)) {
            throw new EzBadParamException(
                'selectedPeriod',
                EzClockInClockOutHelper.ezInstance,
                EzClockInClockOutHelper.ezInstance.ezSubmitClockIn);
        }

        return ezApi.ezPromise(
            (resolve, reject) => ezApi.ezclocker.ezHttpHelper.ezPost(
                ezApi.ezclocker.ezNavigation.ezGetInternalApiUrl('timeentry/clock-in/', 'v2'),
                ezApi.ezToJson(clockInRequest),
                true,
                null,
                false)
                .then(
                    ezApi.ezclocker.ezServices.ezProcessApiResolve,
                    ezApi.ezclocker.ezServices.ezProcessApiReject)
                .then(
                    (response) => {
                        ezApi.ezclocker.ezClockerContext.ezSetActiveEmployeeActiveClockIn(response.timeEntry);
                        ezApi.ezclocker.ezClockerContext.ezRefreshActiveEmployeeTimeEntriesForPeriod(selectedPeriod);
                        return resolve(response);
                    },
                    (eResponse) => {
                        if (EzObject.isValid(eResponse) &&
                            EzNumber.isNumber(eResponse.errorCode) &&
                            eResponse.errorCode >= 6000 && eResponse.errorCode < 7000) {
                            return reject(eResponse);
                        }

                        let em = EzObject.isValid(eResponse) && EzString.stringHasLength(eResponse.message)
                            ? ezApi.ezTemplate`
                                Unable to clock in due to the following error:
                                <p>
                                    ${eResponse.message}
                                </p>`
                            : 'The ezClocker clock in service is currently not available. Please try again later.';

                        ezApi.ezclocker.ezLogger.error(
                            ezApi.ezEM`
                                Failed to clock in due to the following error: ${eResponse.message}.
                                [Error Response=${ezApi.ezToJson(eResponse)}]`);

                        return reject({
                            errorCode: eResponse.errorCode,
                            message: em,
                            timeEntry: null
                        });
                    }));
    }

    /**
        @public
        Performs a clock in
        @param {number} employer
        @param {number} employee
        @param {moment} currentStartPeriodDate
        @param {moment} currentEndPeriodDate
        @returns {Promise}
     */
    ezClockOut(employerId, employeeId, selectedPeriod) {
        if (!EzNumber.isNumber(employerId)) {
            throw new EzBadParamException(
                'employerId',
                EzClockInClockOutHelper.ezInstance,
                EzClockInClockOutHelper.ezInstance.clockOut);
        }
        if (!EzNumber.isNumber(employeeId)) {
            throw new EzBadParamException(
                'employeeId',
                EzClockInClockOutHelper.ezInstance,
                EzClockInClockOutHelper.ezInstance.clockOut);
        }
        if (!EzObject.isValid(selectedPeriod)) {
            throw new EzBadParamException(
                'selectedPeriod',
                EzClockInClockOutHelper.ezInstance,
                EzClockInClockOutHelper.ezInstance.clockOut);
        }

        let clockOutIsoSnapshot = ezApi.ezclocker.ezDateTime.ezNowAsIso();

        return ezApi.ezPromise(
            (resolve, reject) => {
                EzClockInClockOutHelper.ezInstance.ezRefreshActiveClockIn(true)
                    .then(
                        (employeeInfo) => {
                            if (!EzObject.isValid(employeeInfo.activeClockIn)) {
                                return resolve(
                                    ezApi.ezCreateErrorResponse(1, 'Employee is already clocked out.'));
                            }

                            return ezApi.ezclocker.ezHtml5GPS.getLocation({
                                enableHighAccuracy: true,
                                timeout: 30000,
                                maximumAge: 0
                            })
                                .then(
                                    (gpsPosition) => {
                                        let gpsStatus = 'UNKNOWN';

                                        let gpsFailureMessage = '';

                                        if (EzObject.isValid(gpsPosition)) {
                                            if (EzNumber.isNumber(gpsPosition.code)) {
                                                switch (gpsPosition.code) {
                                                    case 1:
                                                        gpsStatus = 'DISABLED';
                                                        gpsFailureMessage = EzString.stringHasLength(gpsPosition.message)
                                                            ? gpsPosition.message
                                                            : 'User denied Geolocation.';
                                                        break;
                                                    case 0:
                                                    default:
                                                        gpsStatus = 'ACTIVE';
                                                }
                                            } else {
                                                gpsStatus = 'ACTIVE';
                                            }
                                        }

                                        if ('ACTIVE' === gpsStatus) {
                                            return EzClockInClockOutHelper.ezInstance.ezClockOutWithGeo(
                                                employerId,
                                                employeeId,
                                                clockOutIsoSnapshot,
                                                selectedPeriod,
                                                gpsPosition)
                                                .then(
                                                    (response) => {
                                                        EzClockInClockOutHelper.ezInstance.ezSetTimeEntryMode(EzEmployeeTimeEntryMode.CLOCKED_OUT);
                                                        return resolve(response);
                                                    },
                                                    reject);
                                        }

                                        return EzClockInClockOutHelper.ezInstance.ezClockOutWithoutGeo(
                                            employerId,
                                            employeeId,
                                            clockOutIsoSnapshot,
                                            selectedPeriod,
                                            gpsStatus,
                                            gpsFailureMessage)
                                            .then(
                                                (response) => {
                                                    EzClockInClockOutHelper.ezInstance.ezSetTimeEntryMode(EzEmployeeTimeEntryMode.CLOCKED_OUT);
                                                    return resolve(response);
                                                },
                                                reject);
                                    },
                                    (eResponse) => {
                                        let em = ezApi.ezclocker.ezHtml5GPS.getMessageForErrorCode(eResponse);

                                        ezApi.ezclocker.ezLogger.debug(
                                            `GPS error: ${ezApi.ezToJson(eResponse)}, ${em}`);

                                        return EzClockInClockOutHelper.ezInstance.ezClockOutWithoutGeo(
                                            employerId,
                                            employeeId,
                                            clockOutIsoSnapshot,
                                            selectedPeriod,
                                            'NOT_AVAILABLE',
                                            '')
                                            .then(
                                                (response) => {
                                                    EzClockInClockOutHelper.ezInstance.ezSetTimeEntryMode(EzEmployeeTimeEntryMode.CLOCKED_OUT);
                                                    return resolve(response);
                                                },
                                                reject);
                                    });
                        });
            });
    }

    /**
        @public
        Performs a clock out with GEO location data
        @param {number} employerId
        @param {number} employeeId
        @param {object} clockOutIsoSnapshot
        @param {object} selectedPeriod
        @param {object} gpsPosition
        @param {boolean} overrideLocationCheck
        @returns {Promise}
     */
    ezClockOutWithGeo(employerId, employeeId, clockOutIsoSnapshot, selectedPeriod, geoPosition, overrideLocationCheck) {
        if (!EzNumber.isNumber(employerId)) {
            throw new EzBadParamException(
                'employerId',
                EzClockInClockOutHelper.ezInstance,
                EzClockInClockOutHelper.ezInstance.ezClockOutWithGeo);
        }
        if (!EzNumber.isNumber(employeeId)) {
            throw new EzBadParamException(
                'employeeId',
                EzClockInClockOutHelper.ezInstance,
                EzClockInClockOutHelper.ezInstance.ezClockOutWithGeo);
        }
        if (!EzObject.isValid(clockOutIsoSnapshot)) {
            throw new EzBadParamException(
                'clockOutIsoSnapshot',
                EzClockInClockOutHelper.ezInstance,
                EzClockInClockOutHelper.ezInstance.ezClockOutWithGeo);
        }
        if (!EzObject.isValid(selectedPeriod)) {
            throw new EzBadParamException(
                'selectedPeriod',
                EzClockInClockOutHelper.ezInstance,
                EzClockInClockOutHelper.ezInstance.ezClockOutWithGeo);
        }
        if (!EzObject.isValid(geoPosition)) {
            return EzClockInClockOutHelper.ezInstance.ezClockOutWithoutGeo(
                employerId,
                employeeId,
                clockOutIsoSnapshot,
                selectedPeriod);
        }

        overrideLocationCheck = EzBoolean.isTrue(overrideLocationCheck);

        let timeEntryRequest = EzClockInClockOutHelper.ezInstance.ezCreateTimeEntryPayload(
            // employerId
            employerId,
            // employeeId
            employeeId,
            // customerId
            null,
            // scheduleId
            null,
            // associatedScheduleId
            null,
            // clockInIso
            null,
            // clockInGpsStatus
            null,
            // clockInGpsFailureMessage
            null,
            // clockOutIso
            clockOutIsoSnapshot,
            // clockOutGpsStatus
            'ACTIVE',
            // clockOutGpsFailureMessage
            null,
            // notes
            '',
            // modifiedBy
            null,
            // geoDataStatus,
            geoPosition,
            // geoSource
            'BROWSER',
            // dataTagMaps
            null,
            // assignedJobs
            null,
            // jobMappings
            null,
            // overrideLocationCheck
            overrideLocationCheck,
            // doNotAudit
            false,
            // source
            'website');

        return EzClockInClockOutHelper.ezInstance.ezSubmitClockOut(timeEntryRequest, selectedPeriod);


    }

    /**
        @public
        Performs a clock out without GEO location data
        @param {number} employer
        @param {number} employee
        @param {moment} currentStartPeriodDate
        @param {moment} currentEndPeriodDate
        @returns {Promise}
     */
    ezClockOutWithoutGeo(employerId, employeeId, clockOutIsoSnapshot, selectedPeriod, gpsStatus, gpsFailureMessage, overrideLocationCheck) {
        let value = ezApi.ezclocker.ezClockerContext.ezReadActiveEmployerOption(
            EzEmployerOption.EZOPTION_REQUIRE_LOCATION_FOR_CLOCKINOUT,
            '0');

        let valueBoolean = ezApi.ezclocker.ezOptionsService.ezOptionValueToBoolean(value);

        if (valueBoolean && ezApi.ezclocker.ezClockerContext.isEmployee) {
            ezApi.ezclocker.ezEmployeeDashboardView.enableClockInOut();
            return ezApi.ezclocker.ezDialog.ezShowErrorDialog('Geo location must be turned on to clock in/out',
                'Your employer has mandated that your location services (GPS) must be turned on when clocking in/out. If you do not ' +
                'know how to turn it on then please do a Google search for how to turn on location service in Chrome browser or' +
                ' whatever browser you are using.'
            );
        } else {
            if (!EzNumber.isNumber(employerId)) {
                throw new EzBadParamException(
                    'employerId',
                    EzClockInClockOutHelper.ezInstance,
                    EzClockInClockOutHelper.ezInstance.ezClockOutWithoutGeo);
            }
            if (!EzNumber.isNumber(employeeId)) {
                throw new EzBadParamException(
                    'employeeId',
                    EzClockInClockOutHelper.ezInstance,
                    EzClockInClockOutHelper.ezInstance.ezClockOutWithoutGeo);
            }
            if (!EzObject.isValid(clockOutIsoSnapshot)) {
                throw new EzBadParamException(
                    'clockOutIsoSnapshot',
                    EzClockInClockOutHelper.ezInstance,
                    EzClockInClockOutHelper.ezInstance.ezClockOutWithoutGeo);
            }
            if (!EzObject.isValid(selectedPeriod)) {
                throw new EzBadParamException(
                    'selectedPeriod',
                    EzClockInClockOutHelper.ezInstance,
                    EzClockInClockOutHelper.ezInstance.ezClockOutWithoutGeo);
            }

            overrideLocationCheck = EzBoolean.isTrue(overrideLocationCheck);

            let timeEntryRequest = EzClockInClockOutHelper.ezInstance.ezCreateTimeEntryPayload(
                // employerId
                employerId,
                // employeeId
                employeeId,
                // customerId
                null,
                // scheduleId
                null,
                // associatedScheduleId
                null,
                // clockInIso
                null,
                // clockInGpsStatus
                null,
                // clockInGpsFailureMessage
                null,
                // clockOutIso
                clockOutIsoSnapshot,
                // clockOutGpsStatus
                gpsStatus,
                // clockOutGpsFailureMessage
                gpsFailureMessage,
                // notes
                '',
                // modifiedBy
                null,
                // geoPosition
                null,
                // geoSource
                null,
                // dataTagMaps
                null,
                // assignedJobs
                null,
                // jobMappings
                null,
                // overrideLocationCheck
                overrideLocationCheck,
                // doNotAudit
                false,
                // source
                'website');

            return EzClockInClockOutHelper.ezInstance.ezSubmitClockOut(timeEntryRequest, selectedPeriod);
        }
    }

    /**
        @public
        Submits a clock out time entry request
        @param {object} timeEntryRequest
        @param {object} selectedPeriod
        @returns {Promise}
     */
    ezSubmitClockOut(timeEntryRequest, selectedPeriod) {
        if (!EzObject.isValid(timeEntryRequest)) {
            throw new EzBadParamException(
                'timeEntryRequest',
                EzClockInClockOutHelper.ezInstance,
                EzClockInClockOutHelper.ezInstance.ezSubmitClockOut);
        }
        if (!EzObject.isValid(selectedPeriod)) {
            throw new EzBadParamException(
                'selectedPeriod',
                EzClockInClockOutHelper.ezInstance,
                EzClockInClockOutHelper.ezInstance.ezSubmitClockOut);
        }

        return ezApi.ezPromise(
            (resolve, reject) => ezApi.ezclocker.ezHttpHelper.ezPost(
                ezApi.ezclocker.ezNavigation.ezGetInternalApiUrl('timeentry/clock-out', 'v2'),
                ezApi.ezToJson(timeEntryRequest))
                .then(
                    ezApi.ezclocker.ezServices.ezProcessApiResolve,
                    ezApi.ezclocker.ezServices.ezProcessApiReject)
                .then(
                    (response) => {
                        ezApi.ezclocker.ezClockerContext.ezSetActiveEmployeeActiveClockIn(null);
                        ezApi.ezclocker.ezClockerContext.ezRefreshActiveEmployeeTimeEntriesForPeriod(selectedPeriod);
                        return resolve(response);
                    },
                    (eResponse) => {
                        let em = EzObject.isValid(eResponse) && EzString.stringHasLength(eResponse.message)
                            ? `Unable to clock employee out due to the following error: ${eResponse.message}.`
                            : 'The ezClocker clock out service is currently not available. Please try again later.';

                        ezApi.ezclocker.ezLogger.error(
                            `Failed to submit a clock out. ${em} Error: ${ezApi.ezToJson(eResponse)}`);

                        return reject({
                            errorCode: eResponse.errorCode,
                            message: em,
                            timeEntry: null
                        });
                    }));
    }

    /**
        @public @method
        Determines if the user should get a prompt to select a job code (if necessary) for a clock in.
        If the clockInButtonId is provided, the dialog will appear directly below the button.
        @param {undefined|null|string} showDialogElementId
        @returns {Promise.resolve}
        Resolve contains the selected job or null if none selected
     */
    ezPromptForClockInJobCode(showDialogElementId) {
        return ezApi.ezAsyncAction(
            (finished) => ezApi.ezclocker.ezClockerContext.ezGetActiveEmployeePrimaryJobCodeId()
                .then(
                    (primaryDataTagMap) => {
                        if (EzObject.isValid(primaryDataTagMap)) {
                            ezApi.ezclocker.ezClockerContext.ezGetActiveEmployee().primaryJobCodeId = primaryDataTagMap.dataTagId;
                            return finished(primaryDataTagMap);
                        }

                        return EzClockInClockOutHelper.ezInstance.ezGetJobToAssignFromJobSelectionDialog(showDialogElementId)
                            .then(finished);
                    },
                    () => EzClockInClockOutHelper.ezInstance.ezGetJobToAssignFromJobSelectionDialog(showDialogElementId)
                        .then(finished)));
    }

    /**
        @public @method
        Prompts the user (if necessary) to select the job for a clock in.
        If the clockInButtonId is provided, the dialog will appear directly below the button.
        @param {undefined|null|string} showDialogElementId
        @returns {Promise.resolve}
        Resolve contains the selected job or null if none selected
     */
    ezGetJobToAssignFromJobSelectionDialog(showDialogElementId) {
        return ezApi.ezAsyncAction(
            (finished) => {
                ezApi.ezclocker.ezEventEngine.ezWantEvent(
                    EzSelectJobCodeDialog.ezEventNames.onJobSelected,
                    EzClockInClockOutHelper.ezApiName,
                    (ezEvent) => {
                        ezApi.ezclocker.ezEventEngine.ezUnwantEvent(
                            EzSelectJobCodeDialog.ezEventNames.onJobSelected,
                            EzClockInClockOutHelper.ezApiName);

                        ezApi.ezclocker.ezEventEngine.ezUnwantEvent(
                            EzSelectJobCodeDialog.ezEventNames.onNoJobSelected,
                            EzClockInClockOutHelper.ezApiName);

                        let dataTagMapRequest = {
                            employerId: ezEvent.data.selectedJob.employerId,
                            employeeId: null,
                            personalId: null,
                            dataTagId: ezEvent.data.selectedJob.id,
                            remove: false,
                            assignedEzEntityTypeName: EzEntityType.TIME_ENTRY,
                            assignedToAllEntities: false,
                            assignedEzEntityId: null,
                            level: 0,
                            archived: false
                        };

                        return finished(dataTagMapRequest);
                    });

                ezApi.ezclocker.ezEventEngine.ezWantEvent(
                    EzSelectJobCodeDialog.ezEventNames.onNoJobSelected,
                    EzClockInClockOutHelper.ezApiName,
                    () => {
                        ezApi.ezclocker.ezEventEngine.ezUnwantEvent(
                            EzSelectJobCodeDialog.ezEventNames.onJobSelected,
                            EzClockInClockOutHelper.ezApiName);

                        ezApi.ezclocker.ezEventEngine.ezUnwantEvent(
                            EzSelectJobCodeDialog.ezEventNames.onNoJobSelected,
                            EzClockInClockOutHelper.ezApiName);

                        return finished(null);
                    });

                ezApi.ezclocker.ezSelectJobCodeDialog.ezShow(
                    EzSelectJobCodeDialogMode.EMPLOYEE_ASSIGNEDJOBS,
                    showDialogElementId);
            });
    }
}
