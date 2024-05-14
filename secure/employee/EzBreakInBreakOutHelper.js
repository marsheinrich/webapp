import {
    EzException,
    EzBadParamException
} from '/ezlibrary/exceptions/EzExceptions.js';

import {
    EzObject,
    EzBoolean,
    EzNumber,
    EzString
} from '/ezlibrary/helpers/EzHelpers.js';

import {
    EzRegistrationState,
    EzClockerContextEventName,
    EzEmployeeBreakMode
} from '/ezlibrary/enums/EzEnumerations.js';

import { EzClass } from '/ezlibrary/EzClass.js';

import { EzEventEngine } from '/ezlibrary/ez-event-engine.js';
import { EzClockerContext } from '/ezlibrary/EzClockerContext/ez-context.js';

import { EzEmployerOption } from '/ezlibrary/EzEmployerOption.js';
import { EzOptionsService } from '/public/javascript/services/ezclocker-options.js';
import { EzClockInClockOutHelper } from '/secure/javascript/common/ez-clockin-clockout-helper.js';

/**
 * @class
 * @extends {EzClass}
 * @description
 * Handles break feature configuration and break in and break out operations.
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 * Import with:
 *     import { EzBreakInBreakOutHelper } from '/secure/javascript/employeeDashboard/EzBreakInBreakOutHelper.js';
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 * Check if singleton instance is ready:
 *     globalThis.ezApi.ezclocker?.[EzBreakInBreakOutHelper.ezApiName]?.ready
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 * Listen to onReady event:
 *     document.addEventListener(
 *         EzBreakInBreakOutHelper.ezEventNames.onReady,
 *         {listening_class}.#ezRegistrator);
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 * Static references:
 *      From outside this class: ezApi.ezclocker.ezBreakInBreakOutHelper
 *      From within this class: EzBreakInBreakOutHelper.ezInstance
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 */
export class EzBreakInBreakOutHelper extends EzClass {
    /**
     * @private @field
     * Stores if the employer has enabled the recording of unpaid breaks.
     * The default value is determined with from one of following two options:
     *      1) Value of option EzEmployerOption.EZOPTION_ALLOW_RECORDING_OF_UNPAID_BREAKS.
     *      2) If option EzEmployerOption.EZOPTION_ALLOW_RECORDING_OF_UNPAID_BREAKS is undefined or null, then assign false.
     * @type {boolean}
     * @deprecated
     * To allow options for unpaid and paid breaks in a future release, please migrate from using this property to:
     *      ezApi.ezclocker.ezBreakInBreakOutHelper.ezAllowUnpaidBreaks
     */
    #ezAllowRecordingBreaks = false;
    /**
     * @public @property @getter
     * Gets if the employer has enabled the recording of unpaid breaks.
     * If the internal storage for this property is null then the value from one of following two
     * options is assigned before returning:
     *      1) Value of option EzEmployerOption.EZOPTION_ALLOW_RECORDING_OF_UNPAID_BREAKS.
     *      2) If option EzEmployerOption.EZOPTION_ALLOW_RECORDING_OF_UNPAID_BREAKS is undefined or null, then assign false.
     * @returns {boolean}
     * @deprecated
     * To allow options for unpaid and paid breaks in a future release, please migrate from using this property to:
     *      ezApi.ezclocker.ezBreakInBreakOutHelper.ezAllowUnpaidBreaks
     */
    get ezAllowRecordingBreaks() {
        return this.#ezAllowRecordingBreaks;
    }
    /**
     * @public @property @setter
     * Sets if the employer has enabled the recording of unpaid breaks.
     * @param {boolean} ezAllowRecordingBreaks
     * @deprecated
     * To allow options for unpaid and paid breaks in a future release, please migrate from using this property to:
     *      ezApi.ezclocker.ezBreakInBreakOutHelper.ezAllowUnpaidBreaks
     */
    set ezAllowRecordingBreaks(ezAllowRecordingBreaks = false) {
        this.#ezAllowRecordingBreaks = ezAllowRecordingBreaks;
    }

    /**
     * @private @field
     * Stores if employee is allowed to record unpaid breaks.
     * Default is determined by one of the following two options:
     *      1) Equal to the value of option EzEmployerOption.EZOPTION_ALLOW_RECORDING_OF_UNPAID_BREAKS.
     *      2) If option EzEmployerOption.EZOPTION_ALLOW_RECORDING_OF_UNPAID_BREAKS is undefined/null, then the default is false.
     * @type {boolean}
     */
    #ezAllowUnpaidBreaks = false;
    /**
     * @public @property @getter
     * Gets if employee is allowed to recored unpaid breaks.
     * If the internal storage for this property is null then the value from one of following two
     * options is assigned before returning:
     *      1) Set value from option EzEmployerOption.EZOPTION_ALLOW_RECORDING_OF_UNPAID_BREAKS
     *      2) If option EzEmployerOption.EZOPTION_ALLOW_RECORDING_OF_UNPAID_BREAKS is undefined or null, set value to false.
     * @returns {boolean}
     */
    get ezAllowUnpaidBreaks() {
        /*
        if (null == this.#ezAllowUnpaidBreaks) {
            this.#ezAllowUnpaidBreaks = EzBoolean.booleanOrFalse(
                ezApi.ezclocker.ezOptionsService.ezOptionValueToBoolean(
                    ezApi.ezclocker.ezClockerContext.ezReadActiveEmployerOption(
                        EzEmployerOption.EZOPTION_ALLOW_RECORDING_OF_UNPAID_BREAKS,
                        EzEmployerOption.EZOPTION_VALUE_FALSE),
                    false));
        }
        */

        return this.#ezAllowUnpaidBreaks;
    }
    /**
     * @public @property @setter
     * Sets if employee is allowed to recored unpaid breaks
     * @param {boolean} allowUnpaidBreaks
     * Default: false
     */
    set ezAllowRecordingUnpaidBreaks(allowUnpaidBreaks = false) {
        this.#ezAllowUnpaidBreaks = EzBoolean.booleanOrFalse(allowUnpaidBreaks);
    }

    /**
     * @private @field
     * Stores if the employer has enabled automatic breaks.
     * @type {boolean}
     */
    #ezAllowAutomaticBreaks = false;
    /**
     * @public @property @getter
     * @returns {boolean}
     */
    get ezAllowAutomaticBreaks() {
        return this.#ezAllowAutomaticBreaks;
    }
    /**
     * @public @property @setter
     * @param {boolean} ezAllowAutomaticBreaks
     */
    set ezAllowAutomaticBreaks(ezAllowAutomaticBreaks = false) {
        this.#ezAllowAutomaticBreaks = EzBoolean.booleanOrFalse(ezAllowAutomaticBreaks);
    }

    /**
     * @private @field
     * Stores the current break mode
     * @type {string}
     * A valid enum property value from EzEmployeeBreakMode
     */
    #ezCurrentBreakMode = EzEmployeeBreakMode.UNKNOWN;
    /**
     * @public @property @getter
     * Returns the current break mode.
     * @returns {string}
     * A valid enum property value from EzEmployeeBreakMode
     */
    get ezCurrentBreakMode() {
        return this.#ezCurrentBreakMode;
    }
    /**
     * @public @property @setter
     * Sets the current break mode and triggers the onBreakModeaChanged event.
     * @param {string} ezCurrentBreakMode
     * A valid enum property value from EzEmployeeBreakMode
     */
    set ezCurrentBreakMode(ezCurrentBreakMode) {
        ezCurrentBreakMode = EzEmployeeBreakMode.ezValueOf(ezCurrentBreakMode);

        if (this.#ezCurrentBreakMode !== ezCurrentBreakMode) {
            this.#ezCurrentBreakMode = ezCurrentBreakMode;

            ezApi.ezclocker.ezEventEngine.ezTriggerEvent(
                EzBreakInBreakOutHelper.ezEventNames.onBreakModeChanged,
                ezApi.ezclocker.ezEventEngine.ezBuildEventData(
                    EzBreakInBreakOutHelper.ezApiName,
                    'EzEmployeeBreakMode has changed',
                    {
                        ezAllowRecordingBreaks: EzBreakInBreakOutHelper.ezInstance.ezAllowRecordingBreaks,
                        ezAllowAutomaticBreaks: EzBreakInBreakOutHelper.ezInstance.ezAllowAutomaticBreaks,
                        ezEmployeeBreakMode: EzBreakInBreakOutHelper.ezInstance.ezCurrentBreakMode
                    }));
        }
    }

    /**
     * @public @readonly @property
     * Gets the break out service API endpoint
     * @returns {string}
     */
    get ezBreakOutServiceUrl() {
        return ezApi.ezclocker.ezNavigation.ezGetInternalApiUrl('timeentry/break-out', 'v2');;
    }

    /**
     * @public @readonly @property
     * Gets the break in service API endpoint
     * @returns {string}
     */
    get ezBreakInServiceUrl() {
        return ezApi.ezclocker.ezNavigation.ezGetInternalApiUrl('timeentry/break-in', 'v2');
    }

    /**
     * @public @method
     * Initializes EzBreakInBreakOutHelper
     * @returns {EzBreakInBreakOutHelper}
     */
    ezInit() {
        ezApi.ezclocker.ezEventEngine.ezWantEvent(
            EzClockerContextEventName.onActiveEmployerReady,
            EzBreakInBreakOutHelper.ezApiName,
            EzBreakInBreakOutHelper.ezInstance.ezHandleActiveEmployerReadyEvent);

        ezApi.ezclocker.ezEventEngine.ezWantEvent(
            EzClockerContextEventName.onActiveEmployeeActiveClockInChanged,
            EzBreakInBreakOutHelper.ezApiName,
            EzBreakInBreakOutHelper.ezInstance.ezHandleOnActiveEmployeeActiveClockInChanged);

        ezApi.ezclocker.ezEventEngine.ezWantEvent(
            EzClockerContextEventName.onActiveEmployeeActiveBreakInChanged,
            EzBreakInBreakOutHelper.ezApiName,
            EzBreakInBreakOutHelper.ezInstance.ezHandleOnActiveEmployeeActiveBreakInChanged);

        ezApi.ezclocker.ezEventEngine.ezRegisterEvent(
            EzBreakInBreakOutHelper.ezApiName,
            EzBreakInBreakOutHelper.ezEventNames.onBreakModeChanged);

        ezApi.ezclocker.ezEventEngine.ezRegisterEvent(
            EzBreakInBreakOutHelper.ezApiName,
            EzBreakInBreakOutHelper.ezEventNames.onBreakIn);

        ezApi.ezclocker.ezEventEngine.ezRegisterEvent(
            EzBreakInBreakOutHelper.ezApiName,
            EzBreakInBreakOutHelper.ezEventNames.onBreakOut);

        return EzBreakInBreakOutHelper.ezInstance;
    }

    /**
     * @public @method
     * Refreshes the employee's active break status
     * @returns {Promise.resolve}
     * Returns the response in the resolve
     */
    ezRefreshEmployeeActiveBreak() {
        return ezApi.ezAsyncAction(
            (finished) => ezApi.ezclocker.ezClockerContext.ezRefreshActiveEmployeeActiveBreak()
                .then(
                    (response) => finished(response),
                    (eResponse, jqXHR) => {
                        ezApi.ezclocker.ezLogger.error(
                            EzString.em`
                                Failed to refresh the active employee's active break in.
                                Error: ${ezApi.ezToJson(eResponse)}`);

                        let em = EzObject.isValid(eResponse) && EzString.hasLength(eResponse.message)
                            ? `Unable to refresh your break in/out status at this time. ${eResponse.message}.`
                            : 'Unable to refresh your break in/out status at this time.';

                        return ezApi.ezclocker.ezDialog.ezShowPossibleDefectError(
                            'Break Status Error',
                            em,
                            jqXHR,
                            eResponse)
                            .then(
                                () => finished(eResponse));
                    }));
    }

    /**
     * @public @method
     * Creates the TimeEntry payload
     * @param {Number} employerId
     * @param {Number} employeeId
     * @param {Number|null} customerId
     * @param {Number|null} scheduleId
     * @param {Number|null} associatedScheduleId
     * @param {Boolean|null} isActiveBreak
     * @param {String|null} clockInIso
     * @param {String|null} clockOutIso
     * @param {String|null} notes
     * @param {String|null} modifiedBy
     * @param {String|null} geoDataStatus
     * @param {Object|null} geoPosition
     * @param {String|null} geoSource
     * @param {Boolean|null} overrideLocationCheck
     * @param {Boolean|null} doNotAudit
     * @param {String|null} source
     * @returns {Object}
     * TimeEntry payload
     */
    ezCreateBreakTimeEntryPayload(employerId, employeeId, customerId, scheduleId,
        associatedScheduleId, isActiveBreak, clockInIso, clockInGPSDataStatus, clockInGPSFailureMessage, clockOutIso,
        clockOutGPSDataStatus, clockOutGPSFailureMessage, notes, modifiedBy, geoPosition, geoSource,
        dataTagMaps, assignedJobs, jobMappings, overrideLocationCheck, doNotAudit, source) {

        if (!EzNumber.isNumber(employerId)) {
            throw new EzBadParamException(
                'employerId',
                EzBreakInBreakOutHelper.ezInstance,
                EzBreakInBreakOutHelper.ezInstance.ezCreateBreakTimeEntryPayload);
        }
        if (!EzNumber.isNumber(employeeId)) {
            throw new EzBadParamException(
                'employeeId',
                EzBreakInBreakOutHelper.ezInstance,
                EzBreakInBreakOutHelper.ezInstance.ezCreateBreakTimeEntryPayload);
        }

        return {
            employerId: employerId,
            employeeId: employeeId,
            customerId: customerId,
            scheduleId: scheduleId,
            associatedScheduleId: associatedScheduleId,

            timeEntryType: 'BREAK',
            isActiveBreak: EzBoolean.isTrue(isActiveBreak),

            clockInIso: ezApi.ezAssignOrDefault(clockInIso, null),
            clockInTimeZoneId: ezApi.ezIsNotEmptyString(clockInIso)
                ? ezApi.ezclocker.ezDateTime.activeTimeZone
                : null,
            clockInGpsStatus: ezApi.ezAssignOrDefault(clockInGPSDataStatus, 'UNKNOWN'),
            clockInGPSFailureMessage: ezApi.ezAssignOrDefault(clockInGPSFailureMessage, ''),

            clockOutIso: ezApi.ezAssignOrDefault(clockOutIso, null),
            clockOutTimeZoneId: ezApi.ezIsNotEmptyString(clockOutIso)
                ? ezApi.ezclocker.ezDateTime.activeTimeZone
                : null,
            clockOutGpsStatus: ezApi.ezAssignOrDefault(clockOutGPSDataStatus, 'UNKNOWN'),
            clockOutGPSFailureMessage: ezApi.ezAssignOrDefault(clockOutGPSFailureMessage, ''),

            gpsDataStatus: ezApi.ezIsNotEmptyString(clockInGPSDataStatus)
                ? ezApi.ezAssignOrDefault(clockInGPSDataStatus, 'UNKNOWN')
                : ezApi.ezAssignOrDefault(clockOutGPSDataStatus, 'UNKNOWN'),

            isActiveClockIn: ezApi.ezIsNotValid(clockOutIso),

            modifiedBy: ezApi.ezAssignOrDefault(modifiedBy, null),
            description: ezApi.ezAssignOrDefault(notes, ''),
            notes: ezApi.ezAssignOrDefault(notes, ''),

            dataTagMaps: ezApi.ezIsArray(dataTagMaps)
                ? dataTagMaps
                : null,
            assignedJobs: ezApi.ezIsArray(assignedJobs)
                ? dataTagMaps
                : null,
            jobMappings: ezApi.ezIsArray(jobMappings)
                ? jobMappings
                : null,
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
            gpsSource: ezApi.ezAssignOrDefault(geoSource, 'BROWSER'),
            overrideLocationCheck: EzBoolean.isTrue(overrideLocationCheck),
            doNotAudit: EzBoolean.isTrue(doNotAudit),
            source: ezApi.ezAssignOrDefault(source, 'website'),
            locTime: ezApi.ezclocker.ezDateTime.ezNowAsIso()
        };
    }

    /**
     * @public @method
     * Performs a break-in
     * @param {Number} employerId
     * @param {Number} employeeId
     * @param {Object} selectedPeriod
     * @returns {Promise}
     */
    ezBreakIn(employerId, employeeId, selectedPeriod) {
        if (!EzNumber.isNumber(employerId)) {
            throw new EzBadParamException(
                'employerId',
                EzBreakInBreakOutHelper.ezInstance,
                EzBreakInBreakOutHelper.ezInstance.ezBreakIn);
        }
        if (!EzNumber.isNumber(employeeId)) {
            throw new EzBadParamException(
                'employeeId',
                EzBreakInBreakOutHelper.ezInstance,
                EzBreakInBreakOutHelper.ezInstance.ezBreakIn);
        }

        let breakInIsoSnapshot = ezApi.ezclocker.ezDateTime.ezNowAsIso();

        return ezApi.ezPromise(
            (resolve, reject) => EzBreakInBreakOutHelper.ezInstance.ezRefreshEmployeeActiveBreak()
                .then(
                    (activeBreakin) => {
                        if (EzObject.isValid(activeBreakin)) {
                            ezApi.ezclocker.ezClockerContext.ezGetActiveEmployee().activeBreak = activeBreakin;

                            ezApi.ezclocker.ezClockerContext.ezGetActiveEmployee().isActiveBreak =
                                activeBreakin.isActiveBreak;

                            EzBreakInBreakOutHelper.ezInstance.ezCurrentBreakMode = EzEmployeeBreakMode.END_BREAK;

                            return resolve(ezApi.ezCreateErrorResponse(1, 'Employee is already on break.'));
                        }

                        return ezApi.ezclocker.ezHtml5GPS.getLocation(
                            {
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
                                                    gpsFailureMessage = ezApi.ezIsNotEmptyString(gpsPosition.message)
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

                                    // geo break in
                                    if ('ACTIVE' === gpsStatus) {
                                        return EzBreakInBreakOutHelper.ezInstance.ezBreakInWithGeo(
                                            employerId,
                                            employeeId,
                                            breakInIsoSnapshot,
                                            selectedPeriod,
                                            gpsPosition)
                                            .then(
                                                (response) => {
                                                    ezApi.ezclocker.ezClockerContext.ezSetActiveEmployeeActiveBreak(
                                                        response);

                                                    EzBreakInBreakOutHelper.ezInstance.ezCurrentBreakMode = EzEmployeeBreakMode.END_BREAK;

                                                    return resolve(response);
                                                },
                                                reject);
                                    }

                                    return EzBreakInBreakOutHelper.ezInstance.ezBreakInWithoutGeo(
                                        employerId,
                                        employeeId,
                                        breakInIsoSnapshot,
                                        selectedPeriod,
                                        gpsStatus,
                                        gpsFailureMessage)
                                        .then(
                                            (response) => {
                                                ezApi.ezclocker.ezClockerContext.ezSetActiveEmployeeActiveBreak(
                                                    response);

                                                EzBreakInBreakOutHelper.ezInstance.ezCurrentBreakMode = EzEmployeeBreakMode.END_BREAK;

                                                return resolve(response);
                                            },
                                            reject);
                                },
                                (gpsErrorCode) => {
                                    // non-geo clock in
                                    ezApi.ezclocker.logger.error(`GPS error: ${gpsErrorCode.code}. ${gpsErrorCode.message}`);

                                    // Perform clock out without geo
                                    return EzBreakInBreakOutHelper.ezInstance.ezBreakInWithoutGeo(
                                        employerId,
                                        employeeId,
                                        breakInIsoSnapshot,
                                        selectedPeriod,
                                        'NOT_AVAILABLE',
                                        'Not Available')
                                        .then(
                                            (response) => {
                                                ezApi.ezclocker.ezClockerContext.ezSetActiveEmployeeActiveBreak(
                                                    response);

                                                EzBreakInBreakOutHelper.ezInstance.ezCurrentBreakMode = EzEmployeeBreakMode.END_BREAK;

                                                return resolve(response);
                                            },
                                            reject);
                                });
                    },
                    reject));
    }

    /**
     * @protected @method
     * Performs a break in with GEO location data
     * @param {Number} employerId
     * @param {Number} employeeId
     * @param {moment} breakInIsoSnapshot
     * @param {Object} selectedPeriod
     * @param {Object} gpsPosition
     * @param {Boolean} overrideLocationCheck
     * @returns {Promise}
     */
    ezBreakInWithGeo(employerId, employeeId, breakInIsoSnapshot, selectedPeriod, geoPosition, overrideLocationCheck) {
        if (!EzNumber.isNumber(employerId)) {
            throw new EzBadParamException(
                'employerId',
                EzBreakInBreakOutHelper.ezInstance,
                EzBreakInBreakOutHelper.ezInstance.ezBreakInWithGeo);
        }
        if (!EzNumber.isNumber(employeeId)) {
            throw new EzBadParamException(
                'employeeId',
                EzBreakInBreakOutHelper.ezInstance,
                EzBreakInBreakOutHelper.ezInstance.ezBreakInWithGeo);
        }
        if (!EzObject.isValid(breakInIsoSnapshot)) {
            throw new EzBadParamException(
                'breakInIsoSnapshot',
                EzBreakInBreakOutHelper.ezInstance,
                EzBreakInBreakOutHelper.ezInstance.ezBreakInWithGeo);
        }
        if (!EzObject.isValid(selectedPeriod)) {
            throw new EzBadParamException(
                'selectedPeriod',
                EzBreakInBreakOutHelper.ezInstance,
                EzBreakInBreakOutHelper.ezInstance.ezBreakInWithGeo);
        }
        if (!EzObject.isValid(geoPosition)) {
            throw new EzBadParamException(
                geoPosition,
                EzBreakInBreakOutHelper.ezInstance,
                EzBreakInBreakOutHelper.ezInstance.ezBreakInWithGeo);
        }

        return EzBreakInBreakOutHelper.ezInstance.ezSubmitBreakIn(
            EzBreakInBreakOutHelper.ezInstance.ezCreateBreakTimeEntryPayload(
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
                // isActiveBreak
                true,
                // clockInIso
                breakInIsoSnapshot,
                // clockInGpsStatus
                'ACTIVE',
                // clockInGpsFailureMessage
                null,
                // clockOutIso
                null,
                // clockOutGpsStatus
                null,
                // clockOutGpsFailureMessage
                null,
                // notes
                '',
                // modifiedBy
                null,
                // geoPosition
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
                EzBoolean.isTrue(overrideLocationCheck),
                // doNotAudit
                false,
                // source
                'website'),
            selectedPeriod);
    }

    /**
     * @protected @method
     * Performs a break in without GEO location data
     * @param {Number} employerId
     * @param {Number} employeeId
     * @param {String} breakInIsoSnapshot
     * @param {Object} selectedPeriod
     * @param {String} gpsStatus
     * @param {String} gpsFailureMessage
     * @returns {Promise}
     */
    ezBreakInWithoutGeo(employerId, employeeId, breakInIsoSnapshot, selectedPeriod, gpsStatus, gpsFailureMessage) {
        if (!EzNumber.isNumber(employerId)) {
            throw new EzBadParamException(
                'employerId',
                EzBreakInBreakOutHelper.ezInstance,
                EzBreakInBreakOutHelper.ezInstance.ezBreakInWithoutGeo);
        }
        if (!EzNumber.isNumber(employeeId)) {
            throw new EzBadParamException(
                'employerId',
                EzBreakInBreakOutHelper.ezInstance,
                EzBreakInBreakOutHelper.ezInstance.ezBreakInWithoutGeo);
        }
        if (!EzObject.isValid(breakInIsoSnapshot)) {
            throw new EzBadParamException(
                'employerId',
                EzBreakInBreakOutHelper.ezInstance,
                EzBreakInBreakOutHelper.ezInstance.ezBreakInWithoutGeo);
        }
        if (!EzObject.isValid(selectedPeriod)) {
            throw new EzBadParamException(
                'employerId',
                EzBreakInBreakOutHelper.ezInstance,
                EzBreakInBreakOutHelper.ezInstance.ezBreakInWithoutGeo);
        }

        return EzBreakInBreakOutHelper.ezInstance.ezSubmitBreakIn(
            EzBreakInBreakOutHelper.ezInstance.ezCreateBreakTimeEntryPayload(
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
                // isActiveBreak
                true,
                // clockInIso
                breakInIsoSnapshot,
                // clockInGpsStatus
                gpsStatus,
                // clockInGpsFailureMessage
                gpsFailureMessage,
                // clockOutIso
                null,
                // clockOutGpsStatus
                null,
                // clockOutGpsFailureMessage
                null,
                // notes
                'Break',
                // modifiedBy
                null,
                // geoDataStatus,
                'DISABLED',
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
                false,
                // doNotAudit
                false,
                // source
                'website'),
            selectedPeriod);
    }

    /**
     * @protected @method
     * Submits a break in time entry request
     * @param {Object} timeEntryRequest
     * @param {Object} selectedPeriod
     * @returns {Promise}
     */
    ezSubmitBreakIn(timeEntryRequest, selectedPeriod) {
        if (!EzObject.isValid(timeEntryRequest)) {
            throw new EzBadParamException(
                'timeEntryRequest',
                EzBreakInBreakOutHelper.ezInstance,
                EzBreakInBreakOutHelper.ezInstance.ezSubmitBreakIn);
        }
        if (!EzObject.isValid(selectedPeriod)) {
            throw new EzBadParamException(
                'selectedPeriod',
                EzBreakInBreakOutHelper.ezInstance,
                EzBreakInBreakOutHelper.ezInstance.ezSubmitBreakIn);
        }

        return ezApi.ezPromise(
            (resolve, reject) => ezApi.ezclocker.ezHttpHelper.ezPost(
                EzBreakInBreakOutHelper.ezInstance.ezBreakInServiceUrl,
                ezApi.ezToJson(timeEntryRequest))
                .then(
                    ezApi.ezclocker.ezServices.ezProcessApiResolve,
                    ezApi.ezclocker.ezServices.ezProcessApiReject)
                .then(
                    (response) => {
                        ezApi.ezclocker.ezClockerContext.ezRefreshActiveEmployeeTimeEntriesForPeriod(selectedPeriod)
                            .then(
                                () => {

                                    ezApi.ezclocker.ezEventEngine.ezTriggerEvent(
                                        EzBreakInBreakOutHelper.ezEventNames.onBreakIn,
                                        ezApi.ezclocker.ezEventEngine.ezBuildEventData(
                                            EzBreakInBreakOutHelper.ezApiName,
                                            'Employee has started a break',
                                            response));

                                    return resolve(response);
                                });
                    },
                    (eResponse) => {
                        if (EzObject.isValid(eResponse) &&
                            EzNumber.isNumber(eResponse.errorCode) &&
                            eResponse.errorCode >= 6000 && eResponse.errorCode < 7000) {
                            return reject(eResponse);
                        }

                        let em = EzObject.isValid(eResponse) && EzString.hasLength(eResponse.message)
                            ? `Unable to start the break due to the following error: ${eResponse.message}`
                            : 'The ezClocker break service is currently not available. Please try again later.';

                        ezApi.ezclocker.logger.error(
                            `Failed to submit a clock in. ${em}. Error: ${ezApi.ezToJson(eResponse)}`);

                        return reject(
                            {
                                errorCode: eResponse.errorCode,
                                message: em,
                                timeEntry: null
                            });
                    }));
    }

    /**
     * @public @method
     * Performs a end break (break out)
     * @param {Number} employerId
     * @param {Number} employeeId
     * @param {Object} selectedPeriod
     * @returns {Promise}
     */
    ezBreakOut(employerId, employeeId, selectedPeriod) {
        if (!EzNumber.isNumber(employerId)) {
            throw new EzBadParamException(
                'employerId',
                EzBreakInBreakOutHelper.ezInstance,
                EzBreakInBreakOutHelper.ezInstance.ezBreakOut);
        }
        if (!EzNumber.isNumber(employeeId)) {
            throw new EzBadParamException(
                'employeeId',
                EzBreakInBreakOutHelper.ezInstance,
                EzBreakInBreakOutHelper.ezInstance.ezBreakOut);
        }
        if (!EzObject.isValid(selectedPeriod)) {
            throw new EzBadParamException(
                'selectedPeriod',
                EzBreakInBreakOutHelper.ezInstance,
                EzBreakInBreakOutHelper.ezInstance.ezBreakOut);
        }

        let breakOutIsoSnapshot = ezApi.ezclocker.ezDateTime.ezNowAsIso();

        return ezApi.ezPromise(
            (resolve, reject) => ezApi.ezclocker.ezClockerContext.ezRefreshActiveEmployeeActiveBreak()
                .then(
                    (activeBreakin) => {
                        if (!EzObject.isValid(activeBreakin)) {
                            // Employee is not on break
                            return resolve();
                        }

                        return ezApi.ezclocker.ezHtml5GPS.getLocation(
                            {
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

                                                    gpsFailureMessage = EzString.hasLength(gpsPosition.message)
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
                                        return EzBreakInBreakOutHelper.ezInstance.ezBreakOutWithGeo(
                                            employerId,
                                            employeeId,
                                            breakOutIsoSnapshot,
                                            selectedPeriod,
                                            gpsPosition)
                                            .then(
                                                (response) => EzBreakInBreakOutHelper.ezInstance.ezAfterBreakOut(
                                                    response)
                                                    .then(resolve),
                                                reject);
                                    }

                                    return EzBreakInBreakOutHelper.ezInstance.ezBreakOutWithoutGeo(
                                        employerId,
                                        employeeId,
                                        breakOutIsoSnapshot,
                                        selectedPeriod,
                                        gpsPosition,
                                        gpsFailureMessage)
                                        .then(
                                            (response) => EzBreakInBreakOutHelper.ezInstance.ezAfterBreakOut(response)
                                                .then(resolve),
                                            reject);
                                },
                                (eResponse) => {
                                    let em = ezApi.ezclocker.ezHtml5GPS.getMessageForErrorCode(eResponse);

                                    ezApi.ezclocker.ezLogger.warn(
                                        `GPS error: ${ezApi.ezToJson(eResponse)}, ${em}`);

                                    return EzBreakInBreakOutHelper.ezInstance.ezBreakOutWithoutGeo(
                                        employerId,
                                        employeeId,
                                        breakOutIsoSnapshot,
                                        selectedPeriod,
                                        'NOT_AVAILABLE',
                                        '')
                                        .then(
                                            (response) => EzBreakInBreakOutHelper.ezInstance.ezAfterBreakOut(response)
                                                .then(resolve),
                                            reject);
                                }, reject);
                    }, reject));
    }

    /**
     * @protected @method
     * Performs any actions after break-out is complete.
     */
    ezAfterBreakOut(response) {
        return ezApi.ezAsyncAction(
            (finished) => {
                ezApi.ezclocker.ezClockerContext.ezSetActiveEmployeeActiveBreak(response);

                EzBreakInBreakOutHelper.ezInstance.ezCurrentBreakMode = EzEmployeeBreakMode.START_BREAK;

                return finished(response);
            });
    }

    /**
     * @protected @method
     * Performs a clock out with GEO location data
     * @param {Number} employerId
     * @param {Number} employeeId
     * @param {String} breakOutIsoSnapshot
     * @param {Object} selectedPeriod
     * @param {Object} geoPosition
     * @param {Boolean} overrideLocationCheck
     * @returns {Promise}
     */
    ezBreakOutWithGeo(employerId, employeeId, breakOutIsoSnapshot, selectedPeriod, geoPosition, overrideLocationCheck) {
        if (!EzNumber.isNumber(employerId)) {
            throw new EzBadParamException(
                'employerId',
                EzBreakInBreakOutHelper.ezInstance,
                EzBreakInBreakOutHelper.ezInstance.ezBreakOutWithGeo);
        }
        if (!EzNumber.isNumber(employeeId)) {
            throw new EzBadParamException(
                'employeeId',
                EzBreakInBreakOutHelper.ezInstance,
                EzBreakInBreakOutHelper.ezInstance.ezBreakOutWithGeo);
        }
        if (!EzObject.isValid(breakOutIsoSnapshot)) {
            throw new EzBadParamException(
                'breakOutIsoSnapshot',
                EzBreakInBreakOutHelper.ezInstance,
                EzBreakInBreakOutHelper.ezInstance.ezBreakOutWithGeo);
        }
        if (!EzObject.isValid(selectedPeriod)) {
            throw new EzBadParamException(
                'selectedPeriod',
                EzBreakInBreakOutHelper.ezInstance,
                EzBreakInBreakOutHelper.ezInstance.ezBreakOutWithGeo);
        }

        if (!EzObject.isValid(geoPosition)) {
            return EzBreakInBreakOutHelper.ezInstance.ezBreakOutWithoutGeo(
                employerId,
                employeeId,
                breakOutIsoSnapshot,
                selectedPeriod);
        }

        return EzBreakInBreakOutHelper.ezInstance.ezSubmitBreakOut(
            EzBreakInBreakOutHelper.ezInstance.ezCreateBreakTimeEntryPayload(
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
                // isActiveBreak,
                false,
                // clockInIso
                null,
                // clockInGpsStatus
                null,
                // clockInGpsFailureMessage
                null,
                // clockOutIso
                breakOutIsoSnapshot,
                // clockOutGpsStatus
                'ACTIVE',
                // clockOutGpsFailureMessage
                null,
                // notes
                'Break',
                // modifiedBy
                null,
                // geoPosition
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
                EzBoolean.isTrue(overrideLocationCheck),
                // doNotAudit
                false,
                // source
                'website'),
            selectedPeriod);
    }

    /**
     * @protected @method
     * Performs a clock out without GEO location data
     * @param {Number} employerId
     * @param {Number} employeeId
     * @param {String} breakOutIsoSnapshot
     * @param {Object} selectedPeriod
     * @param {String} gpsStatus
     * @param {String} gpsFailureMessage
     * @param {Boolean} overrideLocationCheck
     * @returns {Promise}
     */
    ezBreakOutWithoutGeo(employerId, employeeId, breakOutIsoSnapshot, selectedPeriod, gpsStatus, gpsFailureMessage,
        overrideLocationCheck) {
        if (!EzNumber.isNumber(employerId)) {
            throw new EzBadParamException(
                'employerId',
                EzBreakInBreakOutHelper.ezInstance,
                EzBreakInBreakOutHelper.ezInstance.ezBreakOutWithoutGeo);
        }
        if (!EzNumber.isNumber(employeeId)) {
            throw new EzBadParamException(
                'employeeId',
                EzBreakInBreakOutHelper.ezInstance,
                EzBreakInBreakOutHelper.ezInstance.ezBreakOutWithoutGeo);
        }
        if (!EzObject.isValid(breakOutIsoSnapshot)) {
            throw new EzBadParamException(
                'breakOutIsoSnapshot',
                EzBreakInBreakOutHelper.ezInstance,
                EzBreakInBreakOutHelper.ezInstance.ezBreakOutWithoutGeo);
        }
        if (!EzObject.isValid(selectedPeriod)) {
            throw new EzBadParamException(
                'selectedPeriod',
                EzBreakInBreakOutHelper.ezInstance,
                EzBreakInBreakOutHelper.ezInstance.ezBreakOutWithoutGeo);
        }

        return EzBreakInBreakOutHelper.ezInstance.ezSubmitBreakOut(
            EzBreakInBreakOutHelper.ezInstance.ezCreateBreakTimeEntryPayload(
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
                // isActiveBreak
                false,
                // clockInIso
                null,
                // clockInGpsStatus
                null,
                // clockInGpsFailureMessage
                null,
                // clockOutIso
                breakOutIsoSnapshot,
                // clockOutGpsStatus
                gpsStatus,
                // clockOutGpsFailureMessage
                gpsFailureMessage,
                // notes
                'Break',
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
                EzBoolean.isTrue(overrideLocationCheck),
                // doNotAudit
                false,
                // source
                'website'),
            selectedPeriod);
    }

    /**
     * @protected @method
     * Submits a break out time entry request
     * @param {Object} timeEntryRequest
     * @param {Object} selectedPeriod
     * @returns {Promise}
     */
    ezSubmitBreakOut(timeEntryRequest, selectedPeriod) {
        if (!EzObject.isValid(timeEntryRequest)) {
            throw new EzBadParamException(
                'timeEntryRequest',
                EzBreakInBreakOutHelper.ezInstance,
                EzBreakInBreakOutHelper.ezInstance.ezBreakOutWithoutGeo);
        }
        if (!EzObject.isValid(selectedPeriod)) {
            throw new EzBadParamException(
                'selectedPeriod',
                EzBreakInBreakOutHelper.ezInstance,
                EzBreakInBreakOutHelper.ezInstance.ezBreakOutWithoutGeo);
        }

        return ezApi.ezPromise(
            (resolve, reject) => ezApi.ezclocker.ezHttpHelper.ezPost(
                EzBreakInBreakOutHelper.ezInstance.ezBreakOutServiceUrl,
                ezApi.ezToJson(timeEntryRequest))
                .then(
                    ezApi.ezclocker.ezServices.ezProcessApiResolve,
                    ezApi.ezclocker.ezServices.ezProcessApiReject)
                .then(
                    (response) => {
                        ezApi.ezclocker.ezEventEngine.ezTriggerEvent(
                            EzBreakInBreakOutHelper.ezEventNames.onBreakOut,
                            ezApi.ezclocker.ezEventEngine.ezBuildEventData(
                                EzBreakInBreakOutHelper.ezApiName,
                                'Employee has started a break',
                                response));

                        ezApi.ezclocker.ezClockerContext.ezRefreshActiveEmployeeTimeEntriesForPeriod(selectedPeriod)
                            .then(
                                () => resolve(response));
                    },
                    (eResponse) => {
                        let em = EzObject.isValid(eResponse) && EzString.hasLength(eResponse.message)
                            ? `Unable to clock employee out due to the following error: \n\n${eResponse.message}`
                            : 'The ezClocker clock out service is currently not available. Please try again later.';

                        ezApi.ezclocker.ezLogger.error(
                            `Failed to submit a clock out. ${em}. Error: ${ezApi.ezToJson(eResponse)}`);

                        return reject({
                            errorCode: eResponse.errorCode,
                            message: em,
                            timeEntry: null
                        });
                    }));
    }

    /**
     * @protected @method
     * Handles the EzClockerContextEventName.onActiveEmployerReady event
     * @param {event}
     * event.data = ActiveEmployer
     */
    ezHandleActiveEmployerReadyEvent(/* ezEvent */) {
        EzBreakInBreakOutHelper.ezInstance.ezReadEmployeeOptions();
    }

    /**
     * @param {object} ezEvent
     * ezEvent.data = {
     *     employee: EzClockerContext.ezInstance.activeEmployee,
     *     activeClockIn: EzClockerContext.ezInstance.activeEmployee.activeClockIn
     * }
     */
    ezHandleOnActiveEmployeeActiveClockInChanged(ezEvent) {
        if (!EzObject.isValid(ezEvent) || !EzObject.isValid(ezEvent.data)) {
            throw new EzBadParamException(
                'ezEvent',
                EzBreakInBreakOutHelper.ezInstance,
                EzBreakInBreakOutHelper.ezInstance.ezHandleOnActiveEmployeeActiveClockInChanged);
        }

        EzBreakInBreakOutHelper.ezInstance.ezUpdateCurrentBreakMode(
            ezEvent.data.activeClockIn,
            ezApi.ezclocker.ezClockerContext.activeEmployee.activeBreak);
    }

    /**
     * @param {object} ezEvent
     * ezEvent.data = {
     *     employee: EzClockerContext.ezInstance.activeEmployee,
     *     activeBreak: EzClockerContext.ezInstance.activeEmployee.activeClockIn
     * }
     */
    ezHandleOnActiveEmployeeActiveBreakInChanged(ezEvent) {
        if (!EzObject.isValid(ezEvent) || !EzObject.isValid(ezEvent.data)) {
            throw new EzBadParamException(
                'ezEvent',
                EzBreakInBreakOutHelper.ezInstance,
                EzBreakInBreakOutHelper.ezInstance.ezHandleOnActiveEmployeeActiveBreakInChanged);
        }

        EzBreakInBreakOutHelper.ezInstance.ezUpdateCurrentBreakMode(
            ezApi.ezclocker.ezClockerContext.activeEmployee.activeClockIn,
            ezEvent.data.activeBreak);
    }

    /**
     * @protected @method
     * Updates the current break mode based on current state of clock-in and options
     */
    ezUpdateCurrentBreakMode(activeClockIn, activeBreak) {
        if (EzBoolean.isTrue(EzBreakInBreakOutHelper.ezInstance.ezAllowRecordingBreaks) &&
            EzObject.isValid(activeClockIn) && !EzObject.isValid(activeBreak)) {
            EzBreakInBreakOutHelper.ezInstance.ezCurrentBreakMode = EzEmployeeBreakMode.START_BREAK;

            return;
        }

        if (EzObject.isValid(activeClockIn) && EzObject.isValid(activeBreak)) {
            EzBreakInBreakOutHelper.ezInstance.ezCurrentBreakMode = EzEmployeeBreakMode.END_BREAK;

            return;
        }

        // Default to clock in mode
        EzBreakInBreakOutHelper.ezInstance.ezCurrentBreakMode = EzEmployeeBreakMode.CLOCK_IN;
    }

    /**
     * @protected @method
     * Reads employee options related to break-in break-out flows.
     */
    ezReadEmployeeOptions() {
        EzBreakInBreakOutHelper.ezInstance.ezAllowRecordingBreaks = ezApi.ezclocker.ezOptionsService.ezOptionValueToBoolean(
            ezApi.ezclocker.ezClockerContext.ezReadActiveEmployerOption(
                EzEmployerOption.EZOPTION_ALLOW_RECORDING_OF_UNPAID_BREAKS,
                EzEmployerOption.EZOPTION_VALUE_FALSE),
            false);

        EzBreakInBreakOutHelper.ezInstance.ezAllowAutomaticBreaks = ezApi.ezclocker.ezOptionsService.ezOptionValueToBoolean(
            ezApi.ezclocker.ezClockerContext.ezReadActiveEmployerOption(
                EzEmployerOption.EZOPTION_ALLOW_AUTOMATIC_BREAKS,
                EzEmployerOption.EZOPTION_VALUE_FALSE),
            false);
    }

    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    // Class Initialization and EzApi Registration Section
    // !! DO NOT PLACE ANY non-initialization fields, getter/setter methods, static methods, or class methods beyond this section !!
    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

    /**
     * @static
     * @public @readonly @property
     * Gets the name of this class's singleton instance when registered with ezApi.
     * @returns {string}
     */
    static get ezApiName() {
        return 'ezBreakInBreakOutHelper';
    }

    /**
     * @static
     * @public @readonly @property
     * Gets an object of event names that this class may trigger.
     * @returns {object}
     */
    static get ezEventNames() {
        return {
            onReady: 'ezOn_EzBreakInBreakOutHelper_Ready',
            onBreakModeChanged: 'on_EzBreakInBreakOutHelper_BreakMode_Changed',
            onBreakIn: 'ezOn_EzBreakInBreakOutHelper_Break_In',
            onBreakOut: 'ezOn_EzBreakInBreakOutHelper_Break_Out'
        };
    }

    /**
     * @static
     * @private @field
     * Stores the singleton instance of this class that was created by and registerd with EzApi.
     * @type {EzBreakInBreakOutHelper}
     */
    static #ezInstance = globalThis?.ezApi?.ready && globalThis.ezApi?.ezclocker?.[EzBreakInBreakOutHelper.ezApiName]
        ? globalThis.ezApi.ezclocker[EzBreakInBreakOutHelper.ezApiName]
        : null;
    /**
     * @static
     * @public @property @getter
     * Gets the singleton instance of this class that is registered with EzApi (if available yet)
     * @returns {EzBreakInBreakOutHelper}
     */
    static get ezInstance() {
        return EzBreakInBreakOutHelper.#ezInstance;
    }
    /**
     * @static
     * @public @property @setter
     * Sets the singleton instance of of this class that is registered with EzApi.
     * @param {EzBreakInBreakOutHelper} instance
     */
    static set ezInstance(instance) {
        if (null != EzBreakInBreakOutHelper.#ezInstance) {
            throw new EzException(
                'EzBreakInBreakOutHelper\'s singleton instance is already assigned.');
        }

        EzBreakInBreakOutHelper.#ezInstance = instance;
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
    static #ezApiRegistrationState = globalThis?.ezApi?.ready && globalThis.ezApi?.ezclocker?.[EzBreakInBreakOutHelper.ezApiName]
        ? EzRegistrationState.REGISTERED
        : null;
    /**
     * @static
     * @public @property @getter
     * Gets the ezApi registration state of this classes's singleton instance.
     * @returns {string}
     * A valid enum property value from EzRegistrationState
     */
    static get ezApiRegistrationState() {
        return EzBreakInBreakOutHelper.#ezApiRegistrationState;
    }
    /**
     * @static
     * @public @property @setter
     * Sets the ezApi registration state of this classes's singleton instance.
     * @param {string} ezApiRegistrationState
     * A valid enum property value from EzRegistrationState
     */
    static set ezApiRegistrationState(ezRegistrationState) {
        EzBreakInBreakOutHelper.#ezApiRegistrationState = EzRegistrationState.ezValueOf(ezRegistrationState);

        if (EzRegistrationState.UNKNOWN === EzBreakInBreakOutHelper.#ezApiRegistrationState) {
            EzBreakInBreakOutHelper.#ezApiRegistrationState = null;
        }
    }

    /**
     * @static
     * @private @readonly @property
     * Gets true when all required dependencies for this class report ready.
     * In otherwords, the require dependency's singleton instance is created
     * and is registered with and accessable from EzApi with ezApi.ezclocker.{dependency_name}.
     * @returns {boolean}
     */
    static get #ezCanRegister() {
        return EzRegistrationState.PENDING === EzBreakInBreakOutHelper.ezApiRegistrationState &&
            globalThis?.ezApi?.ready && globalThis.ezApi?.ezclocker &&
            globalThis.ezApi.ezclocker?.[EzClockerContext.ezApiName]?.ready &&
            globalThis.ezApi.ezclocker?.[EzOptionsService.ezApiName]?.ready &&
            globalThis.ezApi.ezclocker?.[EzClockInClockOutHelper.ezApiName]?.ready;
    }

    /**
     * @static
     * @private @readonly @property
     * Gets if this class's singleton instance is registered with ezApi yet.
     * @returns {boolean}
     */
    static get #ezIsRegistered() {
        return null != EzBreakInBreakOutHelper.ezInstance &&
            EzRegistrationState.REGISTERED === EzBreakInBreakOutHelper.ezApiRegistrationState;
    }

    /**
     * @static
     * @private @method
     * Attempts to register the singleton instance for this class with ezApi. Returns true
     * if successful, false otherwise.
     * @returns {boolean}
     */
    static #ezRegistrator() {
        if (EzBreakInBreakOutHelper.#ezCanRegister && !EzBreakInBreakOutHelper.#ezIsRegistered) {
            globalThis.ezApi.ezRegisterNewApi(EzBreakInBreakOutHelper, EzBreakInBreakOutHelper.ezApiName);
        }

        return EzBreakInBreakOutHelper.#ezIsRegistered;
    }

    /**
     * @static
     * Static Initialization
     * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
     * >> IMPORTANT <<
     * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
     * Make sure the following properties and methods get defined BEFORE this static initialization section:
     *     1) Property getter EzBreakInBreakOutHelper.ezApiName
     *     2) Property getter EzBreakInBreakOutHelper.ezEventNames
     *     3) Property getter EzBreakInBreakOutHelper.ezInstance
     *     4) Property setter EzBreakInBreakOutHelper.ezInstance
     *     5) Property getter EzBreakInBreakOutHelper.ezApiRegistrationState
     *     6) Property setter EzBreakInBreakOutHelper.ezApiRegistrationState
     *     7) Property getter EzBreakInBreakOutHelper.#ezCanRegister
     *     8) Property getter EzBreakInBreakOutHelper.#ezIsRegistered
     *     9) Method EzBreakInBreakOutHelper.#ezRegistrator()
     */
    static {
        if (!EzBreakInBreakOutHelper.#ezIsRegistered) {
            EzBreakInBreakOutHelper.ezApiRegistrationState = EzRegistrationState.PENDING;

            if (!EzBreakInBreakOutHelper.#ezRegistrator()) {
                // Waiting for EzApi and EzNavigation to become ready before initializing this class
                document.addEventListener(
                    EzBreakInBreakOutHelper.ezOnEzApiReadyEventName,
                    EzBreakInBreakOutHelper.#ezRegistrator);

                document.addEventListener(
                    EzEventEngine.ezEventNames.onReady,
                    EzBreakInBreakOutHelper.#ezRegistrator);

                document.addEventListener(
                    EzOptionsService.ezEventNames.onContextReady,
                    EzBreakInBreakOutHelper.#ezRegistrator);

                document.addEventListener(
                    EzClockerContext.ezEventNames.onContextReady,
                    EzBreakInBreakOutHelper.#ezRegistrator);

                document.addEventListener(
                    EzClockInClockOutHelper.ezEventNames.onContextReady,
                    EzBreakInBreakOutHelper.#ezRegistrator);
            }
        }
    }

    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    // !! DO NOT PLACE ANY non-initialization fields, getter/setter methods, static methods, or class methods beyond above section !!
    // NO CODE AFTER THIS SECTION
    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
}
