import { EzBadParamException } from '/ezlibrary/exceptions/EzBadParamException.js';

import { EzClass } from'/ezlibrary/EzClass.js';

import { EzNavigation } from '/public/javascript/common/ezclocker-navigation-helper.js';

/**
    Time entry payload entity
    Import with:
        import { EzTimeEntryPayload } from '/secure/javascript/services/ezclocker-time-entry-service.js';
 */
class EzTimeEntryPayload {
    /**
     * Constructor
     * @param {long|null} employerId
     * @param {long|null} employeeId
     */
    constructor(employerId, employeeId, clockInIso, clockOutIso, notes) {
        this.employerId = ezApi.ezAssignOrNull(employerId);
        this.employeeId = ezApi.ezAssignOrNull(employeeId);
        this.scheduleId = null;
        this.associatedScheduleId = null;
        this.customerId = null;

        this.clockInIso = ezApi.ezIsNotEmptyString(clockInIso)
            ? clockInIso
            : null;
        this.serverClockInIso = null;
        this.clockInTimeZoneId = ezApi.ezIsNotEmptyString(clockInIso)
            ? ezApi.ezclocker.ezDateTime.activeTimeZone
            : null;
        this.clockInGpsStatus = 'UNKNOWN';

        this.clockOutIso = ezApi.ezIsNotEmptyString(clockOutIso)
            ? clockOutIso
            : null;
        this.serverClockOutIso = null;
        this.clockOutTimeZoneId = ezApi.ezIsNotEmptyString(clockOutIso)
            ? ezApi.ezclocker.ezDateTime.activeTimeZone
            : null;
        this.clockOutGpsStatus = 'UNKNOWN';

        this.isActiveClockIn = -false;
        this.offLineSync = false;
        this.earlyClockInOverride = false;
        this.paid = false;

        this.notes = ezApi.ezIsNotEmptyString(notes)
            ? notes
            : '';

        this.description = '';
        this.modifiedBy = null;

        this.assignedJobs = null;
        this.jobMappings = null;

        this.targetDateTimeZone = ezApi.ezclocker.ezDateTime.activeTimeZone;

        this.doNotAudit = false;
        this.overrideLocationCheck = undefined;
        this.dataTagMaps = null;

        this.locTime = ezApi.ezclocker.ezDateTime.ezToIso(ezApi.ezclocker.ezDateTime.ezNow());

        this.accuracy = '0';
        this.latitude = '0';
        this.longitude = '0';
        this.radius = null;
        this.altitude = '0';
        this.speed = '0';

        this.gpsSource = '';
        this.gpsDataStatus = 'UNKNOWN';

        this.source = 'website';
    }
}

/**
    Provides operations on time entries
    Import with:
        import { EzTimeEntryService } from '/secure/javascript/services/ezclocker-time-entry-service.js';

        globalThis.ezApi.ezclocker[EzTimeEntryService.ezApiName] &&
        globalThis.ezApi.ezclocker[EzTimeEntryService.ezApiName].ready

        document.addEventListener(
            EzTimeEntryService.ezEventNames.onReady,
            EzClockerContext.#ezRegistrator);
 */
class EzTimeEntryService extends EzClass {
    static ezInstance = null;
    static ezApiRegistrationState = null;

    static get ezApiName() {
        return 'ezTimeEntryService';
    }

    static get ezEventNames() {
        return {
            onReady: 'ezOn_EzTimeEntryService_Ready'
        };
    }

    static get ezCanRegister() {
        return 'PENDING' === EzTimeEntryService.ezApiRegistrationState &&
            Object.prototype.hasOwnProperty.call(globalThis, 'ezApi') && globalThis['ezApi'].ready &&
            ezApi.ezclocker[EzNavigation.ezApiName] && ezApi.ezclocker[EzNavigation.ezApiName].ready;
    }

    static #ezRegistrator() {
        if (!EzTimeEntryService.ezCanRegister) {
            return false;
        }

        EzTimeEntryService.ezInstance = ezApi.ezRegisterNewApi(
            EzTimeEntryService,
            EzTimeEntryService.ezApiName);
        EzTimeEntryService.ezApiRegistrationState = 'REGISTERED';
        return true;
    }

    static {
        if (null == EzTimeEntryService.ezApiRegistrationState) {
            EzTimeEntryService.ezApiRegistrationState = 'PENDING';

            document.addEventListener(
                'onEzApiReady',
                EzTimeEntryService.#ezRegistrator);

            document.addEventListener(
                EzNavigation.ezEventNames.onReady,
                EzTimeEntryService.#ezRegistrator);
        }
    }

    /**
        @public
     */
    constructor() {
        super();
    }

    get INTERNAL_TIMEENTRIES_V1_REST_SERVICE_URL_BASE() {
        return ezApi.ezclocker.ezNavigation.ezGetInternalApiUrl('timeentry', 'v1');
    }

    get INTERNAL_TIMEENTRIES_V1_GET_ACTIVE_TIMEENTRY_URL() {
        return ezApi.ezUrlTemplate`${this.INTERNAL_TIMEENTRIES_V1_REST_SERVICE_URL_BASE}/active`;
    }

    get INTERNAL_TIMEENTRIES_V1_GET_ACTIVE_BREAKIN_TIMEENTRY_URL() {
        return ezApi.ezUrlTemplate`${this.INTERNAL_TIMEENTRIES_V1_REST_SERVICE_URL_BASE}/active-break`;
    }

    get INTERNAL_TIMEENTRIES_V1_CLOCKIN_URL() {
        return ezApi.ezUrlTemplate`${this.INTERNAL_TIMEENTRIES_V1_REST_SERVICE_URL_BASE}/clockin`;
    }

    get INTERNAL_TIMEENTRIES_V1_CLOCKOUT_URL() {
        return ezApi.ezUrlTemplate`${this.INTERNAL_TIMEENTRIES_V1_REST_SERVICE_URL_BASE}/clockout`;
    }

    get INTERNAL_TIMEENTRY_SERVICE_URL_BASE() {
        return ezApi.ezclocker.ezNavigation.ezGetInternalClassicApiUrl('timeEntry');
    }

    get INTERNAL_TIMEENTRY_ISCLOCKEDIN_URL() {
        return ezApi.ezUrlTemplate`${this.INTERNAL_TIMEENTRY_SERVICE_URL_BASE}/isClockedIn`;
    }

    get INTERNAL_TIMEENTRY_CLOCKIN_URL() {
        return ezApi.ezUrlTemplate`${this.INTERNAL_TIMEENTRY_SERVICE_URL_BASE}/clockIn`;
    }

    get INTERNAL_TIMEENTRY_CLOCKOUT_URL() {
        return ezApi.ezUrlTemplate`${this.INTERNAL_TIMEENTRY_SERVICE_URL_BASE}/clockOut`;
    }

    /**
     * @protected
     * Initializes EzTimeEntryService
     * @returns {EzTimeEntryService}
     */
    ezInit() {
        return EzTimeEntryService.ezInstance;
    }

    /**
     * @public
     * Obtains the time entries for an employee based on the period information provided.
     *
     * @param {Number} employeeId
     * @param {String} startDateIso
     * @param {String} endDateIso
     * @returns {Promise}
     */
    ezQueryEmployeeTimeEntriesForPeriod(employeeId, startDateIso, endDateIso) {
        const self = ezApi.ezclocker[EzTimeEntryService.ezApiName];

        if (!ezApi.ezIsNumber(employeeId)) {
            throw new EzBadParamException(
                'employeeId',
                self,
                self.ezQueryEmployeeTimeEntriesForPeriod);
        }
        if (!ezApi.ezStringHasLength(startDateIso)) {
            throw new EzBadParamException(
                'startDateIso',
                self,
                self.ezQueryEmployeeTimeEntriesForPeriod);
        }
        if (!ezApi.ezStringHasLength(endDateIso)) {
            throw new EzBadParamException(
                'endDateIso',
                self,
                self.ezQueryEmployeeTimeEntriesForPeriod);
        }

        return ezApi.ezclocker.http.ezGet(
            ezApi.ezclocker.ezNavigation.ezGetInternalApiUrl(
                ezApi.ezUrlTemplate`timeentry/employees/${employeeId}
                     ?start-date-iso=${startDateIso}
                     &end-date-iso=${endDateIso}
                     &time-zone-id=${ezApi.ezclocker.ezDateTime.activeTimeZone}`,
                'v2'))
            .then(
                ezApi.ezclocker.ezServices.ezProcessApiResolve,
                ezApi.ezclocker.ezServices.ezProcessApiReject);
    }

    /**
     * @public
     * Gets the time entries for the provided employee during the provided period
     * @param {Number} employerId
     * @param {Number} employeeId
     * @param {Moment} periodStartMoment
     * @param {Moment} periodEndMoment
     *
     * @returns {Promise}
     */
    ezGetEmployeeTimeEntriesForPeriod(employerId, employeeId, periodStartMoment, periodEndMoment) {
        const self = ezApi.ezclocker[EzTimeEntryService.ezApiName];

        if (!ezApi.ezIsNumber(employeeId)) {
            throw new EzBadParamException(
                'employeeId',
                self,
                self.ezGetEmployeeTimeEntriesForPeriod);
        }
        if (!ezApi.ezIsNumber(employeeId)) {
            throw new EzBadParamException(
                'employeeId',
                self,
                self.ezGetEmployeeTimeEntriesForPeriod);
        }
        if (!ezApi.ezIsValid(periodStartMoment)) {
            throw new EzBadParamException(
                'periodStartMoment',
                self,
                self.ezGetEmployeeTimeEntriesForPeriod);
        }
        if (!ezApi.ezIsValid(periodEndMoment)) {
            throw new EzBadParamException(
                'periodStartMoment',
                self,
                self.ezGetEmployeeTimeEntriesForPeriod);
        }

        return ezApi.ezclocker.http.ezGet(
            ezApi.ezclocker.ezNavigation.getInternalClassicApiUrl(
                ezApi.ezUrlTemplate`timeEntry/getPeriod/${employerId}/${employeeId}
                    ?startDateIso8601=${periodStartMoment.toISOString()}
                    &endDateIso8601=${periodEndMoment.toISOString()}
                    &timeZoneId=${ezApi.ezclocker.ezDateTime.activeTimeZone}`));
    }

    /**
        @public
        Quries time entries for the provided employerId and employeeId for the provided periodStartMoment and periodEndMoment
        date range.
        @param {number} employerId
        @param {number} employeeId
        @param {moment} periodStartMoment
        @param {moment} periodEndMoment
        @returns {Promise}
     */
    ezQuery(employerId, employeeId, periodStartMoment, periodEndMoment) {
        const self = ezApi.ezclocker[EzTimeEntryService.ezApiName];

        if (!ezApi.ezIsNumber(employerId)) {
            throw new EzBadParamException(
                'employerId',
                self,
                self.ezQuery);
        }
        if (!ezApi.ezIsNumber(employeeId)) {
            throw new EzBadParamException(
                'employeeId',
                self,
                self.ezQuery);
        }
        if (!ezApi.ezIsValid(periodStartMoment)) {
            throw new EzBadParamException(
                'periodStartMoment',
                self,
                self.ezQuery);
        }
        if (!ezApi.ezIsValid(periodEndMoment)) {
            throw new EzBadParamException(
                'periodEndMoment',
                self,
                self.ezQuery);
        }

        let periodStartIsoStartOfDayTarget =
            ezApi.ezclocker.ezDateTime.ezToIso(ezApi.ezclocker.ezDateTime.ezSetMomentStartOfDay(periodStartMoment));

        let periodEndIsoEndOfDayTarget =
            ezApi.ezclocker.ezDateTime.ezToIso(ezApi.ezclocker.ezDateTime.ezSetMomentEndOfDay(periodEndMoment));

        let request = {
            customerId: null,
            periodStartDateIso: periodStartIsoStartOfDayTarget,
            periodEndDateIso: periodEndIsoEndOfDayTarget,
            targetTimeZoneId: ezApi.ezclocker.ezDateTime.activeTimeZone
        };

        return ezApi.ezclocker.ezHttpHelper.ezPost(
            ezApi.ezclocker.ezNavigation.ezGetInternalApiUrl(`timeentry/period/${employeeId}`, 'v2'),
            ezApi.ezToJson(request))
            .then(
                ezApi.ezclocker.ezServices.ezProcessApiResolve,
                ezApi.ezclocker.ezServices.ezProcessApiReject);
    }

    /**
     * @public
     * Obtains the employee's active clock in (if any)
     *
     * @param {Number} employerId
     * @param {Number} employeeId
     * @param {String} timezone
     * @param {Function|null} success
     * @param {Function|null} failure
     *
     * @returns {Promise}
     */
    ezGetActiveClockIn(employeeId) {
        if (!ezApi.ezIsNumber(employeeId)) {
            throw new EzBadParamException(
                'employeeId',
                self,
                self.ezGetActiveClockIn);
        }

        return ezApi.ezclocker.http.ezGet(
            ezApi.ezclocker.ezNavigation.ezGetInternalApiUrl(
                ezApi.ezUrlTemplate`timeentry/active/${employeeId}
                    ?time-zone-id=${ezApi.ezclocker.ezDateTime.activeTimeZone}`,
                'v2'))
            .then(
                ezApi.ezclocker.ezServices.ezProcessApiResolve,
                ezApi.ezclocker.ezServices.ezProcessApiReject);
    }

    /**
     * @public
     * Obtains the employee's active clock in (if any)
     *
     * @param {Number} employerId
     * @param {Number} employeeId
     * @param {String} timezone
     * @param {Function|null} success
     * @param {Function|null} failure
     *
     * @returns {Promise}
     */
    ezGetActiveBreakIn(employeeId) {
        const self = EzTimeEntryService.ezInstance;

        if (!ezApi.ezIsNumber(employeeId)) {
            throw new EzBadParamException(
                'employeeId',
                self,
                self.ezGetActiveBreakIn);
        }

        let url = ezApi.ezUrlTemplate`${self.INTERNAL_TIMEENTRIES_V1_GET_ACTIVE_BREAKIN_TIMEENTRY_URL}
            /${employeeId}
            ?target-time-zone-id=${ezApi.ezclocker.ezDateTime.activeTimeZone}`;
        return ezApi.ezclocker.http.ezGet(url)
            .then(
                ezApi.ezclocker.ezServices.ezProcessApiResolve,
                ezApi.ezclocker.ezServices.ezProcessApiReject);
    }

    /**
     * @deprecated Migrate to EzTimeEntryService.ezGetActiveClockIn();
     *
     * @public
     * Obtains the employee's active clock in (if any)
     *
     * @param {Number} employerId
     * @param {Number} employeeId
     * @param {String} timezone
     * @param {Function|null} success
     * @param {Function|null} failure
     *
     * @returns {Promise}
     */
    getActiveClockIn(employeeId, success, failure) {
        const self = EzTimeEntryService.ezInstance;

        self.ezGetActiveClockIn(employeeId).then(
            (response, jqXHR) => ezApi.ezCallback(success, response, jqXHR),
            (eResponse, jqXHR) => ezApi.ezCallback(failure, eResponse, jqXHR));
    }

    /**
     * @public
     * @param {long} employerId
     * @param {long} employeeId
     * @param {function|null} success
     * @param {function|null} failure
     * @param {string|null} source
     * @returns {Promise}
     */
    ezClockIn(employerId, employeeId, success, failure) {
        if (!ezApi.ezIsNumber(employerId)) {
            throw new EzBadParamException(
                'employerId',
                self,
                self.ezClockIn);
        }
        if (!ezApi.ezIsNumber(employeeId)) {
            throw new EzBadParamException(
                'employeeId',
                self,
                self.ezClockIn);
        }

        let url = ezApi.ezclocker.ezNavigation.getInternalApiServiceUrl('timeentry/clock-in', 'v2');

        let payload = new EzTimeEntryPayload(employerId, employeeId);

        payload.clockInIso = ezApi.ezclocker.ezDateTime.ezNow().toISOString();
        payload.clockOutIso = payload.clockInIso;
        payload.paid = false;
        payload.notes = '';
        payload.description = '';
        payload.overrideLocationCheck = true;
        payload.targetDateTimeZone = ezApi.ezclocker.ezDateTime.activeTimeZone;

        return ezApi.ezPromise(
            (resolve, reject) => ezApi.ezclocker.http.ezPost(
                url,
                ezApi.ezToJson(payload))
                .then(
                    (response, jqXHR) => {
                        ezApi.ezCallback(success, response, jqXHR);
                        return resolve(response, jqXHR);
                    },
                    (eResponse, jqXHR) => {
                        ezApi.ezCallback(failure, eResponse, jqXHR);
                        reject(eResponse, jqXHR);
                    }));
    }

    /**
     * @public
     * @param {long} employerId
     * @param {long} employeeId
     * @param {moment} clockInDateTimeIso
     * @param {function|null} success
     * @param {function|null} failure
     * @param {string|null} source
     * @returns {Promise}
     */
    ezClockOut(employerId, employeeId, clockInDateTimeIso, success, failure, source) {
        if (!ezApi.ezIsNumber(employerId)) {
            throw new EzBadParamException(
                'employerId',
                self,
                self.ezClockIn);
        }
        if (!ezApi.ezIsNumber(employeeId)) {
            throw new EzBadParamException(
                'employeeId',
                self,
                self.ezClockIn);
        }
        if (!ezApi.ezStringHasLength(clockInDateTimeIso)) {
            throw new EzBadParamException(
                'clockInDateTimeIso',
                self,
                self.ezClockIn);
        }

        source = ezApi.isNotEmptyString(source)
            ? source
            : 'WEBSITE';

        let cin = clockInDateTimeIso || null;

        let url = ezApi.ezclocker.ezNavigation.getInternalApiServiceUrl(
            ezApi.ezUrlTemplate`timeentry/clockout/${employerId}/${employeeId}
                ?timezone=${ezApi.ezclocker.ezDateTime.activeTimeZone}
                &source=${source}`,
            'v1');

        let payload = new EzTimeEntryPayload(employerId, employeeId);
        payload.clockInIso = cin;
        payload.clockOutIso = ezApi.ezclocker.ezDateTime.ezNow().toISOString();
        payload.paid = false;
        payload.notes = '';
        payload.description = '';
        payload.overrideLocationCheck = true;
        payload.clockInGpsDataStatus = 'NOT_SUPPORTED';
        payload.clockOutGpsDataStatus = 'NOT_SUPPORTED';
        payload.gpsDataStatus = 'NOT_SUPPORTED';

        return ezApi.ezPromise(
            (resolve, reject) => ezApi.ezclocker.http.ezPost(
                url,
                ezApi.ezToJson(payload))
                .then(
                    (response, jqXHR) => {
                        ezApi.ezCallback(success, response, jqXHR);
                        return resolve(response, jqXHR);
                    },
                    (eResponse, jqXHR) => {
                        ezApi.ezCallback(failure, eResponse, jqXHR);
                        return reject(eResponse, jqXHR);
                    }));
    }

    /**
        @public
        Updates the provided timeEntry entity
        @param {Object} timeEntry
        @param {Boolean|null} overrideAuditRecording
        @returns {Promise}
    */
    ezUpdateTimeEntry(timeEntry, overrideAuditRecording) {
        if (!ezApi.ezIsValid(timeEntry) || !ezApi.ezIsNumber(timeEntry.id)) {
            throw new EzBadParamException('timeEntry', self, self.ezUpdateTimeEntry);
        }

        timeEntry.doNotAudit = ezApi.ezIsTrue(overrideAuditRecording);
        return ezApi.ezclocker.http.ezPut(
            ezApi.ezclocker.ezNavigation.getInternalApiServiceUrl(`timeentry/${timeEntry.id}`, 'v2'),
            ezApi.ezToJson(timeEntry))
            .then(
                ezApi.ezclocker.ezServices.ezProcessApiResolve,
                ezApi.ezclocker.ezServices.ezProcessApiReject);
    }

    /**
     * @public
     * @param {long} employerId
     * @param {long} employeeId
     * @param {object} position
     * @param {boolean} overrideLocationCheck
     * @param {function|null} success
     * @param {function|null} failure
     * @param {string|null} source
     * @returns {Promise}
     */
    clockInGeoNonRest(employerId, employeeId, position, overrideLocationCheck, success, failure, source) {
        const self = ezApi.s.ezTimeEntryService;

        if (!employerId || !employeeId || !position) {
            let em = ezApi.ezclocker.ezDialog.ezBuildErrorResponse(
                400,
                'Employer id, employee id, and geo position data is required to clock in with geo.');

            ezApi.ezclocker.logger.error(`Failed to clock in geo: ${ezApi.ezToJson(em)}`);

            ezApi.ezCallback(failure, em);
            return ezApi.ezReject(em);
        }

        source = ezApi.ezStringHasLength(source)
            ? source
            : 'WEBSITE';

        let url = ezApi.ezUrlTemplate`${self.INTERNAL_TIMEENTRY_CLOCKIN_URL}/${employerId}/${employeeId}
            ?clockInISO8601Utc=${ezApi.ezclocker.ezDateTime.ezNow().toISOString()}
            &timeZoneId=${ezApi.ezEncode(ezApi.ezclocker.ezDateTime.activeTimeZone)}
            &longitude=${position.coords.longitude}
            &latitude=${position.coords.latitude}
            &accuracy=${position.coords.Accuracy}
            &overrideLocationCheck=${overrideLocationCheck}
            &source=${source}`;

        return self.ezPostAndHandleResolveRejectCallback(url, '', success, failure);
    }

    /**
        @protected
        Executes a post and handles the resolve/reject/callback.
     */
    ezPostAndHandleResolveRejectCallback(url, payload, successCallback, failureCallback) {
        return ezApi.ezPromise(
            (resolve, reject) => ezApi.ezclocker.http.post(url, payload)
                .then(
                    (response, jqXHR) => {
                        ezApi.ezCallback(successCallback, response, jqXHR);
                        return resolve(response, jqXHR);
                    },
                    (eResponse, jqXHR) => {
                        ezApi.ezCallback(failureCallback, eResponse, jqXHR);
                        return reject(eResponse, jqXHR);
                    }));
    }

    /**
     * @public
     * @param {long} employerId
     * @param {long} employeeId
     * @param {object} position
     * @param {boolean} overrideLocationCheck
     * @param {function|null} success
     * @param {function|null} failure
     * @param {string|null} source
     * @returns {Promise}
     */
    clockOutGeoNonRest(employerId, employeeId, position, overrideLocationCheck,
        success, failure, source) {

        if (!employerId || !employeeId || !position) {
            let em = ezApi.ezclocker.ezDialog.ezBuildErrorResponse(
                400,
                'Employer id, employee id, and geo position data is required to clock out with geo.');

            ezApi.ezclocker.logger.error(ezApi.ezEM`Failed to clock out geo: ${ezApi.ezToJson(em)}`);

            ezApi.ezCallback(failure, em);
            return ezApi.ezReject(em);
        }
        source = ezApi.isNotEmptyString(source)
            ? source
            : 'WEBSITE';

        let url = ezApi.ezclocker.ezNavigation.getInternalClassicServiceUrl(
            ezApi.ezUrlTemplate`timeEntry/clockOut/${employerId}/${employeeId}
                ?clockOutISO8601Utc=${ezApi.ezclocker.ezDateTime.ezNow().toISOString()}
                &timeZoneId=${ezApi.ezEncode(ezApi.ezclocker.ezDateTime.activeTimeZone)}
                &longitude=${position.coords.longitude}
                &latitude=${position.coords.latitude}
                &accuracy=${position.coords.Accuracy}
                &overrideLocationCheck=${overrideLocationCheck}
                &source=${source}`,
            'v1');

        return self.ezPostAndHandleResolveRejectCallback(url, '', success, failure);
    }

    /**
        @public
        Obtains a time entry for the provided time entry id.
        @returns {Promise}
        Resolve returns an EzEntityResponse object
        Reject returns an EzEntityResponse object
     */
    ezGetTimeEntry(timeEntryId) {
        if (!ezApi.ezIsNumber(timeEntryId)) {
            return ezApi.ezReject({
                errorCode: 500,
                message: 'Time entry id is null.'
            });
        }

        return ezApi.ezclocker.http.ezGet(
            ezApi.ezclocker.ezNavigation.getInternalApiUrl(
                ezApi.ezUrlTemplate`timeentry/${timeEntryId}
                    ?timeZoneId=${ezApi.ezclocker.ezDateTime.activeTimeZone}`,
                'v2'))
            .then(
                ezApi.ezclocker.ezServices.ezProcessApiResolve,
                ezApi.ezclocker.ezServices.ezProcessApiReject);
    }
}

export {
    EzTimeEntryPayload,
    EzTimeEntryService
};