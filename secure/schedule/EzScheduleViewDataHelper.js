import {
    EzBadParamException
} from '/ezlibrary/exceptions/EzExceptions.js';

import {
    EzObject,
    EzBoolean,
    EzNumber,
    EzString,
    EzArray,
    EzJson,
    EzPromise,
    EzHtml
} from '/ezlibrary/helpers/EzHelpers.js';

import {
    EzRegistrationState,
    EzClockerContextEventName
} from '/ezlibrary/enums/EzEnumerations.js';
import { EzEmployerOption } from '/ezlibrary/EzEmployerOption.js';

import { EzClockerContext } from '/ezlibrary/EzClockerContext/ez-context.js';

import { EzClass } from '/ezlibrary/EzClass.js';
import { EzEventEngine } from '/ezlibrary/ez-event-engine.js';
import { EzDateTime } from '/public/javascript/common/ez-date-time.js';
import { EzEmployerService } from '/secure/javascript/common/ezclocker-employer-services.js';
import { EzScheduleService } from '/secure/javascript/services/ezclocker-schedule-service.js';

import { EzUI } from '/public/javascript/common/ezui.js';
import { EzDialog } from '/public/javascript/common/ezclocker-dialog-helper.js';

import { EzAmplitudeIntegrationEventId } from '/ezlibrary/analytics_metrics/amplitude/EzAmplitudeIntegrationEventId.js';
import { EzAnalyticsAndMetrics } from '/ezlibrary/analytics_metrics/EzAnalyticsAndMetrics.js';

import { EzScheduleViewDataHelperReadyState } from '/secure/schedule/EzScheduleViewDataHelperReadyState.js';

/**
 * @class
 * @extends {EzClass}
 * @description
 * Controls the employer schedule UX
 * ---------------------------------------------------------------------------
 * Import with:
 *     import { EzScheduleViewDataHelper } from '/secure/schedule/EzScheduleViewDataHelper.js';
 * ---------------------------------------------------------------------------
 * Singleton instance ready for use when the below evaluates to true:
 *     globalThis.ezApi.ezclocker?.[EzScheduleViewDataHelper.ezApiName]?.ready
 * ---------------------------------------------------------------------------
 * Listen to onReady event:
 *     document.addEventListener(
 *         EzScheduleViewDataHelper.ezEventNames.onReady,
 *         this.#ezRegistrator);
 * ---------------------------------------------------------------------------
 * Singleton Instance Reference:
 *     globalThis.ezApi.ezclocker.ezScheduleViewDataHelper
 * ---------------------------------------------------------------------------
 */
export class EzScheduleViewDataHelper extends EzClass {
    /**
     * @public @readonly @property
     * Gets if the schedule data is for employer, payroll manager, or manager accounts schedule view
     * @returns {boolean}
     */
    get ezIsEmployerScheduleData() {
        return EzBoolean.isTrue(globalThis.ezApi.ezclocker.ezClockerContext.ezGetUserContext().isEmployer) ||
            EzBoolean.isTrue(globalThis.ezApi.ezclocker.ezClockerContext.ezGetUserContext().isPayrollManager) ||
            EzBoolean.isTrue(globalThis.ezApi.ezclocker.ezClockerContext.ezGetUserContext().isManager);
    }

    /**
     * @public @readonly @property
     * Gets if the schedule data is for a employer's employee schedule view (and not a personal account)
     * @returns {boolean}
     */
    get ezIsEmployeeScheduleView() {
        return EzBoolean.isTrue(globalThis.ezApi.ezclocker.ezClockerContext.ezGetUserContext().isEmployee) &&
            EzBoolean.isFalse(globalThis.ezApi.ezclocker.ezClockerContext.ezGetUserContext().isPersonal);
    }

    /**
     * @private @field
     * Stores the first day of week option value
     * Defualt: 0 (Sunday)
     * @type {number}
     */
    #ezFirstDayOfWeek = 0;
    /**
     * @public @property @getter
     * Gets the first day of week option value
     * @returns {number}
     */
    get ezFirstDayOfWeek() {
        return this.#ezFirstDayOfWeek;
    }
    /**
     * @public @property @setter
     * Sets the first day of week option value
     * @param {number} firstDayOfWeek
     * Defualt: 0 (Sunday)
     */
    set ezFirstDayOfWeek(firstDayOfWeek) {
        this.#ezFirstDayOfWeek = EzNumber.numberOrDefault(
            firstDayOfWeek,
            0);
    }

    /**
     * @private @field
     * Stores the schedule's selected moment in week date and time.
     * @type {moment}
     * Default: Now with the time set at the start of day
     */
    #ezScheduleSelectedMomentInWeek = globalThis.ezApi.ezclocker.ezDateTime.ezNowWithStartOfDay();
    /**
     * @public @property @getter
     * Gets the schedule's selected moment in week date and time.
     * @returns {moment}
     */
    get ezScheduleSelectedMomentInWeek() {
        return this.#ezScheduleSelectedMomentInWeek;
    }
    /**
     * @public @property @setter
     * Sets the schedule's selected moment in week date and time.
     * @param {moment} scheduleSelectedMomentInWeek
     * Default: Now with the time set at the start of day
     */
    set ezScheduleSelectedMomentInWeek(scheduleSelectedMomentInWeek) {
        const newScheduleSelectedMomentInWeek = globalThis.ezApi.ezclocker.ezDateTime.ezIsValidMoment(scheduleSelectedMomentInWeek)
            ? globalThis.ezApi.ezclocker.ezDateTime.ezDateTimeWithTimeAtStartOfDay(
                globalThis.ezApi.ezclocker.ezDateTime.ezDateTimeOrNow(scheduleSelectedMomentInWeek))
            : globalThis.ezApi.ezclocker.ezDateTime.ezNowWithStartOfDay();

        // Only update if it is not equal to the current value
        if (!globalThis.ezApi.ezclocker.ezDateTime.ezEquals(this.#ezScheduleSelectedMomentInWeek, newScheduleSelectedMomentInWeek)) {
            this.#ezScheduleSelectedMomentInWeek = newScheduleSelectedMomentInWeek;

            globalThis.ezApi.ezclocker.ezEventEngine.ezTriggerEvent(
                EzScheduleViewDataHelper.ezEventNames.onScheduleSelectedMomentInWeekChanged,
                EzScheduleViewDataHelper.ezInstance);

            globalThis.ezApi.ezclocker.ezClockerContext.ezSaveActiveAccountOption(
                EzEmployerOption.EZOPTION_SELECTED_SCHEDULE_WEEK,
                EzScheduleViewDataHelper.ezInstance.ezScheduleSelectedIsoInWeek);
        }
    }

    /**
     * @public @readonly @property
     * Returns the globalThis.ezApi.ezclocker.ezScheduleViewDataHelper.ezScheduleSelectedMomentInWeek as an ISO date and time.
     * @returns {string}
     */
    get ezScheduleSelectedIsoInWeek() {
        return globalThis.ezApi.ezclocker.ezDateTime.ezToIso(
            EzScheduleViewDataHelper.ezInstance.ezScheduleSelectedMomentInWeek);
    }

    /**
     * @private @field
     * Stores an array of schedule entities for the week that contains the ezSelectedMomentInWeek date.
     * Default: []
     * @type {array}
     */
    #ezScheduleEntities = null;
    /**
     * @public @property @getter
     * Gets an array of schedule entities for the week that contains the ezSelectedMomentInWeek date.
     * @returns {array}
     */
    get ezScheduleEntities() {
        return this.#ezScheduleEntities;
    }
    /**
     * @public @property @setter
     * Sets an array of schedule entities for the week that contains the ezSelectedMomentInWeek date.
     * @param {array} ezScheduleEntities
     * Default: []
     */
    set ezScheduleEntities(scheduleEntities) {
        this.#ezScheduleEntities = EzArray.arrayOrEmpty(scheduleEntities);

        this.#ezScheduleEntitiesOrderedByEmployeeId = [];

        this.#ezScheduleEntitiesOrderedBystartDateTimeIso = [];

        if (EzArray.hasLength(this.#ezScheduleEntities)) {
            this.#ezScheduleEntities.forEach(
                (scheduleEntity) => {
                    this.#ezScheduleEntitiesOrderedByEmployeeId.push(scheduleEntity);

                    this.#ezScheduleEntitiesOrderedBystartDateTimeIso.push(scheduleEntity);
                });

            // Duplicate the EzScheduleViewDataHelper.ezInstance.schedules array and then sort by employeeId
            this.#ezScheduleEntitiesOrderedByEmployeeId = EzArray.sort(
                this.#ezScheduleEntitiesOrderedByEmployeeId,
                (scheduleA, scheduleB) => scheduleA.employeeId - scheduleB.employeeId);

            // Duplicate the EzScheduleViewDataHelper.ezInstance.schedules array and then sort by pendingStartDateTimeIso
            this.#ezScheduleEntitiesOrderedBystartDateTimeIso = EzArray.sort(
                this.#ezScheduleEntitiesOrderedBystartDateTimeIso,
                (scheduleA, scheduleB) => {
                    if (scheduleA.pendingStartDateTimeIso < scheduleB.pendingStartDateTimeIso) {
                        return -1;
                    }

                    return scheduleA.pendingStartDateTimeIso > scheduleB.pendingStartDateTimeIso
                        ? 1
                        : 0;
                });
        }

        globalThis.ezApi.ezclocker.ezEventEngine.ezTriggerEvent(
            EzScheduleViewDataHelper.ezEventNames.onScheduleEntitiesChanged,
            EzScheduleViewDataHelper.ezInstance);
    }

    /**
     * @private @field
     * Stores an array of schedule entities for the week that contains the ezSelectedMomentInWeek date ordered by employee id.
     * Default: []
     * @type {array}
     */
    #ezScheduleEntitiesOrderedByEmployeeId = [];
    /**
     * @public @property @getter
     * Gets an array of schedule entities for the week that contains the ezSelectedMomentInWeek date ordered by employee id.
     * @returns {array}
     */
    get ezScheduleEntitiesOrderedByEmployeeId() {
        return this.#ezScheduleEntitiesOrderedByEmployeeId;
    }

    /**
     * @private @field
     * Stores an array of schedule entities for the week that contains the ezSelectedMomentInWeek date ordered by employee id.
     * @type {array}
     */
    #ezScheduleEntitiesOrderedBystartDateTimeIso = [];
    /**
     * @public @property @getter
     * Gets the array of schedules ordered by start date.
     * @returns {array}
     */
    get ezScheduleEntitiesOrderedBystartDateTimeIso() {
        return this.#ezScheduleEntitiesOrderedBystartDateTimeIso;
    }

    /**
     * @private @field
     * Stores an array of time off entities for the week that contains the
     * globalThis.ezApi.ezclocker.ezScheduleViewDataHelper.ezSelectedMomentInWeek date.
     * Default: []
     * @type {array}
     */
    #ezTimeOffEntities = [];
    /**
     * @public @property @getter
     * Gets an array of time off entities for the week that contains the
     * globalThis.ezApi.ezclocker.ezScheduleViewDataHelper.ezSelectedMomentInWeek date.
     * @returns {array}
     */
    get ezTimeOffEntities() {
        return this.#ezTimeOffEntities;
    }
    /**
     * @public @property @setter
     * Sets an array of time off entities for the week that contains the
     * globalThis.ezApi.ezclocker.ezScheduleViewDataHelper.ezSelectedMomentInWeek date.
     * @param {array} timeOffEntities
     * Default: []
     */
    set ezTimeOffEntities(timeOffEntities) {
        this.#ezTimeOffEntities = EzArray.arrayOrEmpty(timeOffEntities);

        this.#ezTimeOffEntitiesOrderedEmployeeId = [];

        this.#ezTimeOffEntitiesOrderedByRequestStartDateTimeIso = [];

        if (EzArray.hasLength(this.#ezTimeOffEntities)) {
            for (const timeOffEntity of this.#ezTimeOffEntities) {
                this.#ezTimeOffEntitiesOrderedEmployeeId.push(timeOffEntity);

                this.#ezTimeOffEntitiesOrderedByRequestStartDateTimeIso.push(timeOffEntity);
            }

            // Copy the timeOffEntities array and then sort by employeeId
            this.#ezTimeOffEntitiesOrderedEmployeeId = EzArray.sort(
                this.#ezTimeOffEntitiesOrderedEmployeeId,
                (timeOffA, timeOffB) => {
                    if (timeOffA.employeeId < timeOffB.employeeId) {
                        return -1;
                    }

                    return timeOffA.employeeId > timeOffB.employeeId
                        ? 1
                        : 0;
                });

            // Copy the timeOffEntities array and then sort by requestStartDateIso
            this.#ezTimeOffEntitiesOrderedByRequestStartDateTimeIso = EzArray.sort(
                this.#ezTimeOffEntitiesOrderedByRequestStartDateTimeIso,
                (timeOffA, timeOffB) => {
                    if (timeOffA.requestStartDateIso < timeOffB.requestStartDateIso) {
                        return -1;
                    }

                    return timeOffA.requestStartDateIso > timeOffB.requestStartDateIso
                        ? 1
                        : 0;
                });
        }

        globalThis.ezApi.ezclocker.ezEventEngine.ezTriggerEvent(
            EzScheduleViewDataHelper.ezEventNames.onTimeOffEntitiesChanged,
            EzScheduleViewDataHelper.ezInstance);
    }

    /**
     * @private @field
     * Stores an array of time off entities for the week that contains the
     * globalThis.ezApi.ezclocker.ezScheduleViewDataHelper.ezSelectedMomentInWeek date sorted by employeeId.
     * @type {array}
     */
    #ezTimeOffEntitiesOrderedEmployeeId = [];
    /**
     * @public @property @getter
     * Gets an array of time off entities for the week that contains the
     * globalThis.ezApi.ezclocker.ezScheduleViewDataHelper.ezSelectedMomentInWeek date sorted by employeeId.
     * @returns {array}
     */
    get ezTimeOffEntitiesOrderedEmployeeId() {
        return this.#ezTimeOffEntitiesOrderedEmployeeId;
    }

    /**
     * @private @field
     * Stores an array of time off entities for the week that contains the
     * globalThis.ezApi.ezclocker.ezScheduleViewDataHelper.ezSelectedMomentInWeek date sorted by requestDateTimeIso
     * @type {array}
     */
    #ezTimeOffEntitiesOrderedByRequestStartDateTimeIso = [];
    /**
     * @public @property @getter
     * Gets an array of time off entities for the week that contains the
     * globalThis.ezApi.ezclocker.ezScheduleViewDataHelper.ezSelectedMomentInWeek date sorted by requestDateTimeIso
     * @returns {array}
     */
    get ezTimeOffEntitiesOrderedByRequestStartDateTimeIso() {
        return this.#ezTimeOffEntitiesOrderedByRequestStartDateTimeIso;
    }

    /**
     * @private @field
     * Stores the array of employer location entities
     * @type {array}
     */
    #ezEmployerLocationEntities = [];
    /**
     * @public @property @getter
     * Gets the array of employer location entities
     * @returns {array}
     */
    get ezEmployerLocationEntities() {
        return this.#ezEmployerLocationEntities;
    }
    /**
     * @public @property @getter
     * Sets the array of employer location entities
     * @param {array} employerLocationEntities
     */
    set ezEmployerLocationEntities(employerLocationEntities) {
        this.#ezEmployerLocationEntities = EzArray.arrayOrEmpty(employerLocationEntities);
    }

    /**
     * @private @field
     * Stores the ready state flags for the EzScheduleViewDataHelper
     * @type {EzScheduleViewDataHelperReadyState}
     */
    #ezReadyStateFlags = null;
    /**
     * @public @property @getter
     * Gets the ready state flags for the EzScheduleViewDataHelper
     * @returns {EzScheduleViewDataHelperReadyState}
     */
    get ezReadyStateFlags() {
        if (null == this.#ezReadyStateFlags) {
            this.#ezReadyStateFlags = new EzScheduleViewDataHelperReadyState();
        }

        return this.#ezReadyStateFlags;
    }
    /**
     * @public @property @setter
     * Sets the ready state flags for the EzScheduleViewDataHelper
     * @param {EzScheduleViewDataHelperReadyState} ezScheduleViewDataHelperReadyState
     */
    set ezReadyStateFlags(ezScheduleViewDataHelperReadyState) {
        if (null == this.#ezReadyStateFlags) {
            this.#ezReadyStateFlags = new EzScheduleViewDataHelperReadyState();
        }

        this.#ezReadyStateFlags.ezLoadFrom(ezScheduleViewDataHelperReadyState);
    }

    /**
     * @public @method
     * Initializes the EzScheduleViewDataHelper
     * @returns {EzScheduleViewDataHelper}
     */
    ezInit() {
        globalThis.ezApi.ezclocker.ezEventEngine.ezRegisterEvent(
            EzScheduleViewDataHelper.ezApiName,
            EzScheduleViewDataHelper.ezEventNames.onScheduleEntitiesChanged);

        globalThis.ezApi.ezclocker.ezEventEngine.ezRegisterEvent(
            EzScheduleViewDataHelper.ezApiName,
            EzScheduleViewDataHelper.ezEventNames.onTimeOffEntitiesChanged);

        globalThis.ezApi.ezclocker.ezEventEngine.ezRegisterEvent(
            EzScheduleViewDataHelper.ezApiName,
            EzScheduleViewDataHelper.ezEventNames.onScheduleSelectedMomentInWeekChanged);

        globalThis.ezApi.ezclocker.ezEventEngine.ezRegisterEvent(
            EzScheduleViewDataHelper.ezApiName,
            EzScheduleViewDataHelper.ezEventNames.onShiftDeleted);

        globalThis.ezApi.ezclocker.ezEventEngine.ezRegisterEvent(
            EzScheduleViewDataHelper.ezApiName,
            EzScheduleViewDataHelper.ezEventNames.onShiftDeleteError);

        this.#ezReadyStateFlags = new EzScheduleViewDataHelperReadyState();

        globalThis.ezApi.ezclocker.ezEventEngine.ezWantEvent(
            EzScheduleViewDataHelperReadyState.ezEventNames.onReadyStateReady,
            EzScheduleViewDataHelper.ezApiName,
            () => EzPromise.executeIgnoreResolve(
                this,
                EzScheduleViewDataHelper.ezInstance.ezInitData),
            true);

        return EzScheduleViewDataHelper.ezInstance;
    }

    /**
     * @protected @method
     * Hooks events associated with the EzScheduleViewDataHelper's ready state flags.
     */
    /*
    ezHookeReadyStateEvents() {
        // All events below must trigger before the EzScheduleViewDataHelper can load any data.
        globalThis.ezApi.ezclocker.ezEventEngine.ezWantEvent(
            EzClockerContextEventName.onUserContextReady,
            EzScheduleViewDataHelper.ezApiName,
            () => EzScheduleViewDataHelper.ezInstance.ezReadyStateFlags.ezUserContextReady = true,
            true);
    }
    */

    /**
     * @public @method
     * Initializes the data for EzScheduleViewDatHelper
     * @returns {Promise.resolve}
     */
    ezInitData() {
        return EzPromise.asyncAction(
            (finished) => EzScheduleViewDataHelper.ezInstance.ezIsEmployerScheduleData
                ? EzScheduleViewDataHelper.ezInstance.ezLoadEmployerScheduleData()
                    .then(
                        () => {
                            globalThis.ezApi.ezclocker.ezEventEngine.ezWantEvent(
                                EzScheduleViewDataHelper.ezEventNames.onScheduleSelectedMomentInWeekChanged,
                                EzScheduleViewDataHelper.ezApiName,
                                EzScheduleViewDataHelper.ezInstance.ezHandleOnScheduleSelectedMomentInWeekChangedEvent);

                            return finished();
                        })
                : EzScheduleViewDataHelper.ezInstance.ezLoadEmployeeScheduleData()
                    .then(
                        () => {
                            globalThis.ezApi.ezclocker.ezEventEngine.ezWantEvent(
                                EzScheduleViewDataHelper.ezEventNames.onScheduleSelectedMomentInWeekChanged,
                                EzScheduleViewDataHelper.ezApiName,
                                EzScheduleViewDataHelper.ezInstance.ezHandleOnScheduleSelectedMomentInWeekChangedEvent);

                            return finished();
                        }));
    }

    /**
     * @public @method
     * Refreshes the schedule data
     * @returns {Promise.resolve}
     */
    ezRefreshScheduleData() {
        return globalThis.ezApi.ezclocker.ezUi.ezPageWaitResolve(
            'Refreshing schedule data ...',
            (waitDone, resolve) => EzScheduleViewDataHelper.ezInstance.ezIsEmployerScheduleData
                ? EzScheduleViewDataHelper.ezInstance.ezLoadEmployerScheduleData()
                    .then(
                        () => waitDone().then(resolve))
                : EzScheduleViewDataHelper.ezInstance.ezLoadEmployeeScheduleData()
                    .then(
                        () => waitDone().then(resolve)));
    }

    /**
     * @public @method
     * Loads Employer employee's schedule data
     * @returns {Promise.resolve}
     */
    ezLoadEmployerScheduleData() {
        return EzPromise.asyncAction(
            (finished) => {
                if (!EzScheduleViewDataHelper.ezInstance.ezIsEmployerScheduleData) {
                    globalThis.ezApi.ezclocker.ezLogger.error('Logged in user does not have permission to load employer schedule data.');

                    return finished();
                }

                EzScheduleViewDataHelper.ezInstance.ezLoadEmployerScheduleOptions();

                return globalThis.ezApi.ezclocker.ezScheduleViewDataHelper.ezLoadEmployerSchedules(
                    EzScheduleViewDataHelper.ezInstance.ezScheduleSelectedMomentInWeek)
                    .then(finished);
            });
    }

    /**
     * @public @method
     * Loads Employee schedule data
     * @returns {Promise.resolve}
     */
    ezLoadEmployeeScheduleData() {
        return EzPromise.asyncAction(
            (finished) => {
                if (!EzScheduleViewDataHelper.ezInstance.ezIsEmployeeScheduleData) {
                    globalThis.ezApi.ezclocker.ezLogger.error('Logged in user does not have permission to load employee schedule data.');

                    return finished();
                }

                EzScheduleViewDataHelper.ezInstance.ezLoadEmployeeScheduleOptions();

                return globalThis.ezApi.ezclocker.ezScheduleViewDataHelper.ezLoadEmployeeSchedules(
                    EzScheduleViewDataHelper.ezInstance.ezScheduleSelectedMomentInWeek)
                    .then(finished);
            });
    }

    /**
     * @public @method
     * Loads the employer's employee's schedules
     * @returns {Promise.resolve}
     */
    ezLoadEmployerSchedules() {
        return globalThis.ezApi.ezclocker.ezUi.ezStartPageWaitResolve(
            EzString.msg`
                Loading employee schedules for the week of
                ${globalThis.ezApi.ezclocker.ezDateTime.ezToDisplayDate(EzScheduleViewDataHelper.ezInstance.ezScheduleSelectedMomentInWeek)} ...`,
            (waitDone, resolve) => {
                if (!EzScheduleViewDataHelper.ezInstance.ezIsEmployerScheduleData) {
                    globalThis.ezApi.ezclocker.ezLogger.error('Logged in user does not have permission to load employer schedules.');

                    return EzPromise.waitDoneResolve(this, waitDone, resolve);
                }

                return globalThis.ezApi.ezclocker.ezScheduleService.ezGetEmployerSchedules(
                    EzScheduleViewDataHelper.ezInstance.ezScheduleSelectedIsoInWeek)
                    .then(
                        (response) => {
                            EzScheduleViewDataHelper.ezInstance.ezScheduleEntities = response.schedules;

                            EzScheduleViewDataHelper.ezInstance.ezTimeOffEntities = response.timeOffs;

                            EzPromise.executeIgnoreResolve(
                                this,
                                EzScheduleViewDataHelper.ezInstance.ezTrackEmployerViewScheduloesWithAmplitude);

                            return EzPromise.waitDoneResolve(
                                this,
                                waitDone,
                                resolve,
                                response);
                        },
                        (eResponse, jqXHR) => {
                            EzScheduleViewDataHelper.ezInstance.ezScheduleEntities = [];

                            EzScheduleViewDataHelper.ezInstance.ezTimeOffEntities = [];

                            return EzPromise.waitDoneThen(
                                this,
                                waitDone,
                                () => globalThis.ezApi.ezclocker.ezDialog.ezShowPossibleDefectError(
                                    'Unable to load schedule data',
                                    eResponse.message,
                                    jqXHR,
                                    EzJson.toJson(eResponse),
                                    'Get employer schedules API')
                                    .then(
                                        () => resolve(eResponse)));
                        });
            });
    }

    /**
     * @public @method
     * Loads the employee's schedules
     * @returns {Promise.resolve}
     */
    ezLoadEmployeeSchedules() {
        return globalThis.ezApi.ezclocker.ezUi.ezStartPageWaitResolve(
            EzString.msg`
                Loading your schedule for the week of
                ${globalThis.ezApi.ezclocker.ezDateTime.ezToDisplayDate(EzScheduleViewDataHelper.ezInstance.ezScheduleSelectedMomentInWeek)} ...`,
            (waitDone, resolve) => {
                if (!EzScheduleViewDataHelper.ezInstance.ezIsEmployeeScheduleData) {
                    globalThis.ezApi.ezclocker.ezLogger.error('Logged in user does not have permission to load employee schedule data.');

                    return EzPromise.waitDoneResolve(this, waitDone, resolve);
                }

                return globalThis.ezApi.ezclocker.ezScheduleService.ezGetEmployeeSchedules(
                    EzScheduleViewDataHelper.ezInstance.ezScheduleSelectedIsoInWeek)
                    .then(
                        (response) => {
                            EzScheduleViewDataHelper.ezInstance.ezScheduleEntities = response.schedules;

                            EzScheduleViewDataHelper.ezInstance.ezTimeOffEntities = response.timeOffs;

                            return EzPromise.waitDoneResolve(
                                this,
                                waitDone,
                                resolve,
                                response);
                        },
                        (eResponse, jqXHR) => {
                            EzScheduleViewDataHelper.ezInstance.ezScheduleEntities = [];

                            EzScheduleViewDataHelper.ezInstance.ezTimeOffEntities = [];

                            return EzPromise.waitDoneThen(
                                this,
                                waitDone,
                                () => globalThis.ezApi.ezclocker.ezDialog.ezShowPossibleDefectError(
                                    'Unable to load schedule data',
                                    eResponse.message,
                                    jqXHR,
                                    EzJson.toJson(eResponse),
                                    'Get employer schedules API')
                                    .then(
                                        () => resolve(eResponse)));
                        });
            });
    }

    /**
     * @public @method
     * Loads options related to the schedules
     */
    ezLoadEmployerScheduleOptions() {
        if (!EzScheduleViewDataHelper.ezInstance.ezIsEmployerScheduleData) {
            globalThis.ezApi.ezclocker.ezLogger.error('Logged in user does not have permission to load employer schedule options.');

            return;
        }

        EzScheduleViewDataHelper.ezInstance.ezFirstDayOfWeek = globalThis.ezApi.ezclocker.ezOptionsService.ezOptionValueToNumber(
            globalThis.ezApi.ezclocker.ezClockerContext.ezReadSelectedEmployerAccountOption(
                EzEmployerOption.EZOPTION_EMPLOYER_SCHEDULE_START_DAY,
                '0'),
            0);

        const nowStartOfDayIso = globalThis.ezApi.ezclocker.ezDateTime.ezToIso(
            globalThis.ezApi.ezclocker.ezDateTime.ezNowWithStartOfDay());

        // Will return a moment instance, NOT an iso value
        const scheduleSelectedDateInWeekOptionValue = globalThis.ezApi.ezclocker.ezOptionsService.ezOptionValueToIsoDateTime(
            globalThis.ezApi.ezclocker.ezClockerContext.ezReadActiveAccountOption(
                EzEmployerOption.EZOPTION_SELECTED_SCHEDULE_WEEK,
                nowStartOfDayIso),
            nowStartOfDayIso);

        EzScheduleViewDataHelper.ezInstance.ezScheduleSelectedMomentInWeek = globalThis.ezApi.ezclocker.ezDateTime.ezDateTimeOrNowWithTimeAtStartOfDay(
            scheduleSelectedDateInWeekOptionValue,
            globalThis.ezApi.ezclocker.ezDateTime.ezNowWithStartOfDay());
    }

    /**
     * @public @method
     * Loads options related to the schedules
     */
    ezLoadEmployeeScheduleOptions() {
        if (!EzScheduleViewDataHelper.ezInstance.ezIsEmployeeScheduleData) {
            globalThis.ezApi.ezclocker.ezLogger.error('Logged in user does not have permission to load employee schedule options.');

            return;
        }

        EzScheduleViewDataHelper.ezInstance.ezFirstDayOfWeek = globalThis.ezApi.ezclocker.ezOptionsService.ezOptionValueToNumber(
            globalThis.ezApi.ezclocker.ezClockerContext.ezReadSelectedEmployerAccountOption(
                EzEmployerOption.EZOPTION_EMPLOYER_SCHEDULE_START_DAY,
                '0'),
            0);

        const nowStartOfDayIso = globalThis.ezApi.ezclocker.ezDateTime.ezToIso(globalThis.ezApi.ezclocker.ezDateTime.ezNowWithStartOfDay());

        // Will return a moment instance, NOT an iso value
        const scheduleSelectedDateInWeekOptionValue = globalThis.ezApi.ezclocker.ezOptionsService.ezOptionValueToIsoDateTime(
            globalThis.ezApi.ezclocker.ezClockerContext.ezReadActiveAccountOption(
                EzEmployerOption.EZOPTION_SELECTED_SCHEDULE_WEEK,
                nowStartOfDayIso),
            nowStartOfDayIso);

        EzScheduleViewDataHelper.ezInstance.ezScheduleSelectedMomentInWeek = globalThis.ezApi.ezclocker.ezDateTime.ezDateTimeOrNowWithTimeAtStartOfDay(
            scheduleSelectedDateInWeekOptionValue,
            globalThis.ezApi.ezclocker.ezDateTime.ezNowWithStartOfDay());
    }

    /**
     * @public @method
     * Deletes the provided deleteShiftSchedule if the user accepts the confirm prompt
     * @param {object} deleteShiftSchedule
     */
    ezDeleteShift(deleteShiftSchedule) {
        if (null == deleteShiftSchedule) {
            throw new EzBadParamException(
                'deleteShiftSchedule',
                EzScheduleViewDataHelper.ezInstance,
                EzScheduleViewDataHelper.ezInstance.ezDeleteShift);
        }

        return globalThis.ezApi.ezclocker.ezDialog.ezShowYesNo(
            'Confirm Delete Schedule',
            'Are you sure you want to delete the shift?')
            .then(
                (yesNoPromptResult) => {
                    if ('NO' === yesNoPromptResult.dialogStatus) {
                        return;
                    }

                    globalThis.ezApi.ezclocker.ezUi.ezStartPageWaitExecute(
                        'Deleting shift ...',
                        (waitDone) => {
                            deleteShiftSchedule.deleted = true;

                            return globalThis.ezApi.ezclocker.ezHttpHelper.ezPut(
                                globalThis.ezApi.ezclocker.ezNavigation.ezGetInternalClassicApiUrl(`schedules/${deleteShiftSchedule.id}`),
                                EzJson.toJson(deleteShiftSchedule))
                                .then(
                                    globalThis.ezApi.ezclocker.ezHttpHelper.ezProcessApiResolve,
                                    globalThis.ezApi.ezclocker.ezHttpHelper.ezProcessApiReject)
                                .then(
                                    (response) => {
                                        response.deletedSchedule = deleteShiftSchedule;

                                        globalThis.ezApi.ezclocker.ezEventEngine.ezTriggerEvent(
                                            EzScheduleViewDataHelper.ezEventNames.onShiftDeleted,
                                            response);

                                        return EzPromise.waitDoneIgnoreResolve(waitDone);
                                    },
                                    (eResponse, jqXHR) => {
                                        eResponse.deletedSchedule = deleteShiftSchedule;

                                        globalThis.ezApi.ezclocker.ezLogger.error(
                                            EzString.em`
                                                Failed to delete the schedule for scheduleId=${deleteShiftSchedule.id}.
                                                Error: ${EzJson.toJson(eResponse)}`);

                                        globalThis.ezApi.ezclocker.ezEventEngine.ezTriggerEvent(
                                            EzScheduleViewDataHelper.ezEventNames.onShiftDeleteError,
                                            eResponse);

                                        EzPromise.waitDoneIgnoreResolve(waitDone);

                                        globalThis.ezApi.ezclocker.ezDialog.ezReportInternalBugDialog(
                                            jqXHR,
                                            'Schedule Delete Failed',
                                            EzString.em`
                                                ezClocker received an error response from the cloud server and was unable to
                                                determine if your schedule update was succesfful. Please try refreshing your
                                                browser to reload the schedule screen and validate if your schedule was deleted
                                                or not.`,
                                            eResponse,
                                            null,
                                            false);
                                    });
                        });
                });
    }

    /**
     * @public @method
     * Determines if the provided scheduleArray contains any unpublished schedules.
     * @param {Array} scheduleArray
     * @returns {Boolean}
     */
    ezDetermineIfSchedulesNeedPublished() {
        if (!EzArray.hasLength(EzScheduleViewDataHelper.ezInstance.ezScheduleEntities)) {
            return false;
        }

        // Scan the scheduleArray for unpublished schedules
        return EzArray.hasLength(EzScheduleViewDataHelper.ezInstance.ezScheduleEntities) &&
            EzArray.hasLength(
                EzScheduleViewDataHelper.ezInstance.ezScheduleEntities.filter(
                    (schedule) => {
                        return EzBoolean.isFalse(schedule.published) || (EzBoolean.isTrue(schedule.published) &&
                            (EzBoolean.isTrue(schedule.modified) || EzBoolean.isTrue(schedule.deleted)));
                    }));
    }

    /**
     * @public @method
     * Publishes all pending schedules for the currently selected week
     * @param {undefined|null|boolean} skipRefresh
     * Default: false
     * @returns {Promise.resolve}
     * Resolve returns the success OR error response
     */
    ezPublishSchedulesForWeek(skipRefresh = false) {
        const weekOfDisplayDate = globalThis.ezApi.ezclocker.ezDateTime.ezToDisplayDate(
            EzScheduleViewDataHelper.ezInstance.ezScheduleSelectedMomentInWeek);

        skipRefresh = EzBoolean.booleanOrFalse(skipRefresh);

        globalThis.ezApi.ezclocker.ezUi.ezPageWaitStart(
            EzString.msg`
                Publishing schedules for the week of
                ${weekOfDisplayDate} ...`);

        const payload = {
            entities: globalThis.ezApi.ezclocker.ezScheduleViewDataHelper.ezScheduleEntitiesOrderedByEmployeeId
                .filter(
                    (schedule) => !schedule.published || schedule.modified || schedule.deleted)
                .map(
                    (schedule) => schedule.id)
        };

        return EzPromise.asyncAction(
            (finished) => globalThis.ezApi.ezclocker.ezHttpHelper.ezPut(
                globalThis.ezApi.ezclocker.ezNavigation.ezGetInternalApiUrl(
                    'schedules/publish',
                    'v2'),
                EzJson.toJson(payload))
                .then(
                    globalThis.ezApi.ezclocker.ezHttpHelper.ezProcessApiResolve,
                    globalThis.ezApi.ezclocker.ezHttpHelper.ezProcessApiReject)
                .then(
                    (response) => {
                        if (EzBoolean.isFalse(skipRefresh)) {
                            return globalThis.ezApi.ezclocker.ezScheduleViewDataHelper.ezRefreshScheduleData()
                                .then(
                                    () => {
                                        globalThis.ezApi.ezclocker.ezUi.ezPageWaitStop();

                                        return finished(response);
                                    });
                        } else {
                            globalThis.ezApi.ezclocker.ezUi.ezPageWaitStop();

                            return finished(response);
                        }
                    },
                    (eResponse) => {
                        globalThis.ezApi.ezclocker.ezLogger.error(
                            EzString.em`
                                Failed to publish schedules for the selected week due to error:
                                ${EzJson.toJson(eResponse)}`);

                        return globalThis.ezApi.ezclocker.ezDialog.ezShowErrorWithDetails(
                            // Title
                            `Publish Schedules for Week Error`,
                            // Message
                            EzHtml.build`
                                EzClocker encountered an unexpected error while publishing schedules
                                for the week of ${weekOfDisplayDate}.
                                <p
                                    id="EzPublishAllSchedulesError">
                                    ${eResponse.message}
                                </p>`,
                            // Details
                            eResponse)
                            .then(
                                () => {
                                    if (EzBoolean.isFalse(skipRefresh)) {
                                        return globalThis.ezApi.ezclocker.ezScheduleViewDataHelper.ezRefreshScheduleData()
                                            .then(
                                                () => {
                                                    globalThis.ezApi.ezclocker.ezUi.ezPageWaitStop();

                                                    return finished(eResponse);
                                                });
                                    } else {
                                        globalThis.ezApi.ezclocker.ezUi.ezPageWaitStop();

                                        return finished(eResponse);
                                    }
                                });
                    }));
    }

    /**
     * @public @method
     * Calls the schedules publish-all schedules
     * @returns {Promise.resolve}
     * Resolve returns the success OR error response
     */
    ezPublishAllSchedules() {
        globalThis.ezApi.ezclocker.ezUi.ezPageWaitStart('Publishing all schedules ...');

        return EzPromise.asyncAction(
            (finished) => globalThis.ezApi.ezclocker.ezHttpHelper.ezPut(
                globalThis.ezApi.ezclocker.ezNavigation.ezGetInternalApiUrl('schedules/publish-all', 'v2'))
                .then(
                    globalThis.ezApi.ezclocker.ezHttpHelper.ezProcessApiResolve,
                    globalThis.ezApi.ezclocker.ezHttpHelper.ezProcessApiReject)
                .then(
                    (response) => globalThis.ezApi.ezclocker.ezScheduleViewDataHelper.ezRefreshScheduleData()
                        .then(
                            () => {
                                globalThis.ezApi.ezclocker.ezUi.ezPageWaitStop();

                                return finished(response);
                            }),
                    (eResponse) => {
                        globalThis.ezApi.ezclocker.ezLogger.error(
                            EzString.em`
                                Failed to publish all schedules due to error:
                                ${EzJson.toJson(eResponse)}`);

                        return globalThis.ezApi.ezclocker.ezDialog.ezShowErrorWithDetails(
                            // Title
                            'Publish All Schedules Error',
                            // Message
                            EzHtml.build`
                                EzClocker encountered an undexpected error while publishing all schedules.
                                <p
                                    id="EzPublishAllSchedulesError">
                                    ${eResponse.message}
                                </p>`,
                            // Details
                            eResponse)
                            .then(
                                () => globalThis.ezApi.ezclocker.ezScheduleViewDataHelper.ezRefreshScheduleData()
                                    .then(
                                        () => {
                                            globalThis.ezApi.ezclocker.ezUi.ezPageWaitStop();

                                            return finished(eResponse);
                                        }));
                    }));
    }

    /**
     * @public @method
     * Clears the employee's schedules for the week. Deletes ALL schdules for that employee in the selected week.
     * @param {number} employeeId
     * @returns {Promise.resolve}
     * Resolve could contain the success response or an error response
     */
    ezClearScheduleWeek(employeeId) {
        if (!EzNumber.isNumber(employeeId)) {
            throw new EzBadParamException(
                'employeeId',
                EzScheduleViewDataHelper.ezInstance,
                EzScheduleViewDataHelper.ezInstance.ezClearScheduleWeek);
        }

        const weekOfDisplayDate = globalThis.ezApi.ezclocker.ezDateTime.ezToDisplayDate(EzScheduleViewDataHelper.ezInstance.ezScheduleSelectedMomentInWeek);

        return globalThis.ezApi.ezclocker.ezDialog.ezShowYesNo(
            'Clear Employee Schedules for Week',
            EzString.msg`
                Please confirm that you wish to clear (delete) ALL the employee's schedules for the week of ${weekOfDisplayDate}.
                <p
                    id="EzClearEmployeeSchedulesForWeekWarning">
                    This action is not reversable!
                </p>`)
            .then(
                (dialogResult) => {
                    if (dialogResult.dialogStatus !== globalThis.ezApi.ezclocker.ezDialog.NO_DIALOG_RESPONSE.dialogStatus) {
                        return globalThis.ezApi.ezclocker.ezUi.ezPageWaitAsyn2(
                            'Clearing employee schedule for the week',
                            (finished) => {
                                const schedulesToDelete = [];

                                EzScheduleViewDataHelper.ezInstance.ezScheduleEntitiesOrderedByEmployeeId.forEach(
                                    (employeeSchedule) => {
                                        if (employeeSchedule.employeeId === employeeId) {
                                            schedulesToDelete.push(employeeSchedule);
                                        }
                                    });

                                let removedScheduleCount = 0;

                                schedulesToDelete.forEach(
                                    (schedule) => EzScheduleViewDataHelper.ezInstance.ezDeleteSchedule(schedule)
                                        .then(
                                            () => {
                                                removedScheduleCount++;

                                                if (removedScheduleCount >= schedulesToDelete.length) {
                                                    return EzScheduleViewDataHelper.ezInstance.ezRefreshScheduleData()
                                                        .then(
                                                            () => finished({
                                                                errorCode: 0,
                                                                message: `Successfully removed ${removedScheduleCount} schedules`
                                                            }));
                                                }
                                            },
                                            (eResponse) => {
                                                const startDisplayDateTime = globalThis.ezApi.ezclocker.ezDateTime.ezToDisplayDateTime(
                                                    globalThis.ezApi.ezclocker.ezDateTime.ezFromIso(schedule.pendingStartDateTimeIso));

                                                const endDisplayDateTime = globalThis.ezApi.ezclocker.ezDateTime.ezToDisplayDateTime(
                                                    globalThis.ezApi.ezclocker.ezDateTime.ezFromIso(schedule.pendingEndDateTimeIso));

                                                return globalThis.ezApi.ezclocker.ezDialog.ezShowErrorWithDetails(
                                                    // Title
                                                    'Remove Employee Schedule Error',
                                                    // Message
                                                    EzHtml.build`
                                                    EzClocker encountered an undexpected error removing the schedule from
                                                    ${startDisplayDateTime} to ${endDisplayDateTime}.
                                                    <p
                                                        id="EzPublishAllSchedulesError">
                                                        ${eResponse.message}
                                                    </p>`,
                                                    // Details
                                                    eResponse)
                                                    .then(
                                                        () => EzScheduleViewDataHelper.ezInstance.ezRefreshScheduleData()
                                                            .then(
                                                                () => finished(eResponse)));
                                            }));
                            });
                    }
                });
    }

    /**
     * @public @method
     * Deletes a schedule by id
     * @param {number} scheduleId
     * @returns {Promise}
     */
    ezDeleteScheduleById(removingSchedule) {
        if (!EzNumber.isNumber(removingSchedule)) {
            throw new EzBadParamException(
                'removingSchedule',
                EzScheduleViewDataHelper.ezInstance,
                EzScheduleViewDataHelper.ezInstance.ezDeleteScheduleById);
        }

        return EzPromise.promise(
            (resolve, reject) => globalThis.ezApi.ezclocker.ezHttpHelper.ezDelete(
                globalThis.ezApi.ezclocker.ezNavigation.ezGetInternalClassicApiUrl(`schedules/${removingSchedule.id}`))
                .then(
                    globalThis.ezApi.ezclocker.ezHttpHelper.ezProcessApiResolve,
                    globalThis.ezApi.ezclocker.ezHttpHelper.ezProcessApiReject)
                .then(
                    (response) => resolve(response),
                    (eResponse) => {
                        eResponse.removingSchedule = removingSchedule;

                        globalThis.ezApi.ezclocker.ezLogger.error(
                            EzString.em`
                                Failed to delete a schedule with scheduleId=${removingSchedule.id}.
                                Error response: ${EzJson.toJson(eResponse)}`);

                        return reject(eResponse);
                    }));
    }

    /**
     * @public @method
     * Displays the copy schedule forward dialog.
     * @param {number} employeeId
     */
    ezCopyScheduleForward(employeeId) {
        const employeeScheduleIds = [];

        for (const schedule of globalThis.ezApi.ezclocker.ezScheduleViewDataHelper.ezScheduleEntitiesOrderedByEmployeeId) {
            //let schedule = globalThis.ezApi.ezclocker.ezScheduleViewDataHelper.ezScheduleEntitiesOrderedByEmployeeId[index];

            if (EzObject.isValid(schedule) && schedule?.employeeId === employeeId) {
                employeeScheduleIds.push(schedule?.id);
            }
        }

        globalThis.ezApi.ezclocker.ezCopyScheduleForwardView.ezShow(
            globalThis.ezApi.ezclocker.ezClockerContext.ezGetActiveEmployer().id,
            employeeId,
            employeeScheduleIds);
    }

    /**
     * @protected @method
     * Records that the employer has viewed the schedules
     */
    ezTrackEmployerViewScheduloesWithAmplitude() {
        return EzPromise.asyncAction(
            (finished) => {
                if (EzObject.isValid(globalThis.ezApi.ezclocker.ezAnalyticsAndMetrics.ezAmplitudeIntegration) &&
                    EzBoolean.isTrue(globalThis.ezApi.ezclocker.ezAnalyticsAndMetrics.ezAmplitudeIntegration.ezEnabled)) {
                    const amplitudeEventProperties = EzAmplitudeIntegrationEventId.ezGetAmplitudePropertiesForEventId(
                        EzAmplitudeIntegrationEventId.EMPLOYER_VIEW_SCHEDULES);

                    amplitudeEventProperties.userId = `${globalThis.ezApi.ezclocker.ezClockerContext.ezGetUserContext().id}`;

                    amplitudeEventProperties.username = globalThis.ezApi.ezclocker.ezClockerContext.ezGetUserContext().username;

                    amplitudeEventProperties.primaryRole = globalThis.ezApi.ezclocker.ezClockerContext.ezGetUserContextPrimaryAccountType();

                    amplitudeEventProperties.employerId = `${globalThis.ezApi.ezclocker.ezClockerContext.ezGetActiveEmployer().id}`;

                    amplitudeEventProperties.employerName = EzString.stringOrDefault(
                        globalThis.ezApi.ezclocker.ezClockerContext.ezGetActiveEmployer().employerName,
                        EzString.NA);

                    amplitudeEventProperties.firstDayOfWeek = EzScheduleViewDataHelper.ezScheduleOptions.firstDayOfWeek;

                    amplitudeEventProperties.selectedDateInWeekIso = EzScheduleViewDataHelper.ezScheduleOptions.scheduleWeekIso;

                    globalThis.ezApi.ezclocker.ezAnalyticsAndMetrics.ezAmplitudeIntegration.ezTrack(
                        EzAmplitudeIntegrationEventId.EMPLOYER_VIEW_SCHEDULES,
                        amplitudeEventProperties);
                }

                return finished();
            });

    }

    /**
     * @protected @method
     * Handles the EzClockerContextEventName.onActiveEmployerReady and EzClockerContextEventName.onActiveEmployerChanged
     * events from globalThis.ezApi.ezclocker.ezClockerContext.
     */
    ezHandleActiveEmployerReadyUpdateEvents() {
        EzPromise.executeIgnoreResolve(
            this,
            EzScheduleViewDataHelper.ezInstance.ezLoadEmployerSchedules);
    }

    /**
     * @protected @method
     * Handles the EzScheduleViewDataHelper.ezEventNames.onScheduleSelectedMomentInWeekChanged event
     */
    ezHandleOnScheduleSelectedMomentInWeekChangedEvent() {
        return EzScheduleViewDataHelper.ezInstance.ezIsEmployerScheduleData
            ? EzPromise.executeIgnoreResolve(
                this,
                globalThis.ezApi.ezclocker.ezScheduleViewDataHelper.ezLoadEmployerSchedules,
                EzScheduleViewDataHelper.ezInstance.ezScheduleSelectedMomentInWeek)
            : EzPromise.executeIgnoreResolve(
                this,
                globalThis.ezApi.ezclocker.ezScheduleViewDataHelper.ezLoadEmployeeSchedules,
                EzScheduleViewDataHelper.ezInstance.ezScheduleSelectedMomentInWeek);
    }

    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    // ONLY Initialization and EzApi Registration Code Beyond this Section
    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

    /**
     * @static
     * @public @readonly @property
     * Returns the name of this class's singleton instance when registered with globalThis.ezApi.
     * @returns {string}
     */
    static get ezApiName() {
        return 'ezScheduleViewDataHelper';
    }

    /**
     * @static
     * @public @readonly @property
     * Returns an object of event names that this class may trigger.
     * @returns {object}
     */
    static get ezEventNames() {
        return {
            onReady: 'ezOn_EzScheduleViewDataHelper_Ready',
            onScheduleEntitiesChanged: 'ezOn_EzScheduleViewDataHelper_ScheduleEntitiesChanged',
            onTimeOffEntitiesChanged: 'ezOn_EzScheduleViewDataHelper_TimeOffEntitiesChanged',
            onScheduleSelectedMomentInWeekChanged: 'ezOn_EzScheduleViewDataHelper_ScheduleSelectedMomentInWeekChanged',
            onShiftDeleted: 'ezOn_EzScheduleViewDataHelper_ShiftDeleted',
            onShiftDeleteError: 'ezOn_EzScheduleViewDataHelper_ShiftDeleteError',
            onReadyStateReady: 'ezOn_EzScheduleViewDataHelper_ReadyStateReady'
        };
    }

    /**
     * @static
     * @private @field
     * Stores the singleton instance of this class that was created by and registerd with EzApi.
     * @type {EzScheduleViewDataHelper}
     */
    static #ezInstance = EzObject.hasProperty(globalThis, 'ezApi') &&
        EzObject.isValid(globalThis.ezApi) && EzBoolean.isTrue(globalThis.ezApi.ready) &&
        EzObject.isValid(globalThis.ezApi.ezclocker[EzScheduleViewDataHelper.ezApiName])
        ? globalThis.ezApi.ezclocker[EzScheduleViewDataHelper.ezApiName]
        : null;
    /**
     * @static
     * @public @property @getter
     * Returns the singleton instance of this class that is registered with EzApi (if available yet)
     * @returns {EzScheduleViewDataHelper}
     */
    static get ezInstance() {
        return EzScheduleViewDataHelper.#ezInstance;
    }
    /**
     * @static
     * @public @property @setter
     * Sets the singleton instance of of this class that is registered with EzApi.
     * @param {EzScheduleViewDataHelper} instance
     */
    static set ezInstance(instance) {
        if (null != EzScheduleViewDataHelper.#ezInstance) {
            throw new Error('EzScheduleViewDataHelper\'s singleton instance is already reigstered with EzApi.');
        }

        EzScheduleViewDataHelper.#ezInstance = instance;
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
    static #ezApiRegistrationState = EzObject.hasProperty(globalThis, 'ezApi') &&
        EzObject.isValid(globalThis.ezApi) && EzBoolean.isTrue(globalThis.ezApi.ready) &&
        EzObject.isValid(globalThis.ezApi.ezclocker[EzScheduleViewDataHelper.ezApiName])
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
        return EzScheduleViewDataHelper.#ezApiRegistrationState;
    }
    /**
     * @static
     * @public @property @setter
     * Sets the ezApi registration state of this classes's singleton instance.
     * @param {string} ezApiRegistrationState
     * A valid enum property value from EzRegistrationState
     */
    static set ezApiRegistrationState(ezApiRegistrationState) {
        EzScheduleViewDataHelper.#ezApiRegistrationState = EzRegistrationState.ezValueOf(ezApiRegistrationState);
    }

    /**
     * @static
     * @private @readonly @property
     * Returns true when all required dependencies for this class report ready.
     * In otherwords, the require dependency's singleton instance is created
     * and is registered with and accessable from EzApi with globalThis.ezApi.ezclocker.{dependency_name}.
     * @returns {boolean}
     */
    static get #ezCanRegister() {
        return EzRegistrationState.PENDING === EzScheduleViewDataHelper.ezApiRegistrationState &&
            globalThis?.ezApi?.ready && globalThis.ezApi?.ezclocker &&

            globalThis.ezApi.ezclocker?.[EzDateTime.ezApiName]?.ready &&

            globalThis.ezApi.ezclocker?.[EzClockerContextEventName.ezApiName]?.ready &&

            globalThis.ezApi.ezclocker?.[EzEventEngine.ezApiName]?.ready &&

            globalThis.ezApi.ezclocker?.[EzClockerContext.ezApiName]?.ready &&

            globalThis.ezApi.ezclocker?.[EzEmployerService.ezApiName]?.ready &&

            globalThis.ezApi.ezclocker?.[EzScheduleService.ezApiName]?.ready &&

            globalThis.ezApi.ezclocker?.[EzUI.ezApiName]?.ready &&

            globalThis.ezApi.ezclocker?.[EzDialog.ezApiName]?.ready &&

            globalThis.ezApi.ezclocker?.[EzAnalyticsAndMetrics.ezApiName]?.ready;
    }

    /**
     * @static
     * @private @readonly @property
     * Returns if this class's singleton instance is registered with ezApi yet.
     * @returns {boolean}
     */
    static get #ezIsRegistered() {
        return null != EzScheduleViewDataHelper.ezInstance &&
            EzRegistrationState.REGISTERED === EzScheduleViewDataHelper.ezApiRegistrationState;
    }

    /**
     * @static
     * @private @method
     * Attempts to register the singleton instance for this class with globalThis.ezApi. Returns true
     * if successful, false otherwise.
     * @returns {boolean}
     */
    static #ezRegistrator() {
        if (EzScheduleViewDataHelper.#ezCanRegister && !EzScheduleViewDataHelper.#ezIsRegistered) {
            globalThis.ezApi.ezRegisterNewApi(EzScheduleViewDataHelper, EzScheduleViewDataHelper.ezApiName);
        }

        return EzScheduleViewDataHelper.#ezIsRegistered;
    }

    /**
     * @static
     * Static Initialization
     * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
     * >> IMPORTANT <<
     * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
     * Make sure the following properties and methods get defined BEFORE this static initialization section:
     *     1) Property getter EzScheduleViewDataHelper.ezApiName
     *     2) Property getter EzScheduleViewDataHelper.ezEventNames
     *     3) Property getter EzScheduleViewDataHelper.ezInstance
     *     4) Property setter EzScheduleViewDataHelper.ezInstance
     *     5) Property getter EzScheduleViewDataHelper.ezApiRegistrationState
     *     6) Property setter EzScheduleViewDataHelper.ezApiRegistrationState
     *     7) Property getter EzScheduleViewDataHelper.#ezCanRegister
     *     8) Property getter EzScheduleViewDataHelper.#ezIsRegistered
     *     9) Method EzScheduleViewDataHelper.#ezRegistrator()
     */
    static {
        if (!EzScheduleViewDataHelper.#ezIsRegistered) {
            EzScheduleViewDataHelper.ezApiRegistrationState = EzRegistrationState.PENDING;

            if (!EzScheduleViewDataHelper.#ezRegistrator()) {
                document.addEventListener(
                    EzScheduleViewDataHelper.ezOnEzApiReadyEventName,
                    EzScheduleViewDataHelper.#ezRegistrator);

                document.addEventListener(
                    EzClockerContextEventName.ezEventNames.onReady,
                    EzScheduleViewDataHelper.#ezRegistrator);

                document.addEventListener(
                    EzDateTime.ezEventNames.onReady,
                    EzScheduleViewDataHelper.#ezRegistrator);

                document.addEventListener(
                    EzEventEngine.ezEventNames.onReady,
                    EzScheduleViewDataHelper.#ezRegistrator);

                document.addEventListener(
                    EzEmployerService.ezEventNames.onReady,
                    EzScheduleViewDataHelper.#ezRegistrator);

                document.addEventListener(
                    EzScheduleService.ezEventNames.onReady,
                    EzScheduleViewDataHelper.#ezRegistrator);

                document.addEventListener(
                    EzUI.ezEventNames.onReady,
                    EzScheduleViewDataHelper.#ezRegistrator);

                document.addEventListener(
                    EzDialog.ezEventNames.onReady,
                    EzScheduleViewDataHelper.#ezRegistrator);

                document.addEventListener(
                    EzAnalyticsAndMetrics.ezEventNames.onReady,
                    EzScheduleViewDataHelper.#ezRegistrator);
            }
        }
    }

    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    // NO CODE AFTER THIS SECTION
    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
}
