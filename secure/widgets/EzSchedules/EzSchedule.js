class EzSchedule {
    constructor() {
        this.ready = false;
        this.ezTypeName = 'EzSchedule';

        this.ezScheduleData = {
            employer: {
                errorCode: 404,
                message: 'Employer schedule data no loaded yet.',
                // Iso
                startDate: null,
                // Iso
                endDate: null,
                // String
                totalTimeForPeriod: null,
                // IEzSchedule
                nextShift: null,
                // Array of IEzSchedule
                schedules: [],
                // Array of IEzTimeOff
                timeOffs: []
            },
            employee: {
                errorCode: 404,
                message: 'Employee schedule data no loaded yet.',
                // Iso
                startDate: null,
                // Iso
                endDate: null,
                // String
                totalTimeForPeriod: null,
                // IEzSchedule
                nextShift: null,
                // Array of IEzSchedule
                schedules: [],
                // Array of IEzTimeOff
                timeOffs: []
            }
        };
    }

    /**
        @protected
        Initializes EzSchedule
     */
    ezInit() {
        let self = ezApi.ezclocker[EzSchedule.ezApiName];

        ezApi.ezclocker.ezEventEngine.ezRegisterEvent(
            EzSchedule.ezApiName,
            EzSchedule.ezEventNames.onEmployerScheduleDataUpdated);
        ezApi.ezclocker.ezEventEngine.ezRegisterEvent(
            EzSchedule.ezApiName,
            EzSchedule.ezEventNames.onEmployerScheduleDataError);

        ezApi.ezclocker.ezEventEngine.ezRegisterEvent(
            EzSchedule.ezApiName,
            EzSchedule.ezEventNames.onEmployeeScheduleDataUpdated);
        ezApi.ezclocker.ezEventEngine.ezRegisterEvent(
            EzSchedule.ezApiName,
            EzSchedule.ezEventNames.onEmployeeScheduleDataError);

        self.ready = true;
        return self;
    }

    /**
        @public
        Get employer schedule data
        @returns {Object}
     */
    ezGetEmployerScheduleData() {
        let self = ezApi.ezclocker[EzSchedule.ezApiName];

        return self.ezScheduleData.employer;
    }

    /**
        @public
        Set employer schedule data
        @param {Object} employerScheduleData
     */
    ezSetEmployerScheduleData(employerScheduleData) {
        let self = ezApi.ezclocker[EzSchedule.ezApiName];

        self.ezScheduleData.employer = employerScheduleData;

        if (0 === self.ezScheduleData.employer.errorCode) {
            ezApi.ezclocker.ezEventEngine.ezTriggerEvent(
                EzSchedule.ezEventNames.onEmployerScheduleDataUpdated,
                self.ezScheduleData.employer);
        } else {
            ezApi.ezclocker.ezEventEngine.ezTriggerEvent(
                EzSchedule.ezEventNames.onEmployerScheduleDataError,
                self.ezScheduleData.employer);
        }
    }

    /**
        @protected
        Loads the employer schedules for the provided dateInWeekIso
     */
    ezRefreshEmployerScheduleData() {
        let self = ezApi.ezclocker[EzSchedule.ezApiName];

        let url = ezApi.ezUrlTemplate`schedules
            ?dateInWeek=${ezApi.ezclocker.ezDateTime.ezToIso(self.ezDateInWeekMoment)}
            &timeZoneId=${ezApi.ezclocker.ezDateTime.activeTimeZone}`;

        return ezUi.ezPageWaitAsync('Loading employee schedules ...', (finished) => {
            return ezApi.ezclocker.http.ezGet(ezApi.ezclocker.nav.ezGetInternalApiUrl(url, 'v2'))
                .then(ezApi.ezclocker.ezServices.ezProcessApiResolve, ezApi.ezclocker.ezServices.ezProcessApiReject)
                .then(
                    (response) => {
                        self.ezSetEmployerScheduleData(response);
                        return finished(response);
                    },
                    (eResponse) => {
                        self.ezSetEmployerScheduleData(eResponse);
                        ezApi.ezclocker.logger.error(ezApi.ezEM`
                            Failed to obtain the employer schedules for dateInWeekIso=${self.dateInWeekIso}.
                            Error: ${ezApi.ezToJson(eResponse)}`);

                        return finished();
                    });
        });
    }


    /**
        @public
        Get employee schedule data
        @returns {Object}
     */
    ezGetEmployeeScheduleData() {
        let self = ezApi.ezclocker[EzSchedule.ezApiName];

        return self.ezScheduleData.employee;
    }

    /**
        @public
        Set employee schedule data
        @param {Object}
     */
    ezSetEmployeeScheduleData(employeeScheduleData) {
        let self = ezApi.ezclocker[EzSchedule.ezApiName];

        self.ezScheduleData.employee = employeeScheduleData;

        if (0 === self.ezScheduleData.employer.errorCode) {
            ezApi.ezclocker.ezEventEngine.ezTriggerEvent(
                EzSchedule.ezEventNames.onEmployeeScheduleDataUpdated,
                self.ezScheduleData.employee);
        } else {
            ezApi.ezclocker.ezEventEngine.ezTriggerEvent(
                EzSchedule.ezEventNames.onEmployeeScheduleDataError,
                self.ezScheduleData.employee);
        }
    }

    /**
        @public
        Loads/refreshes the active employee's schedule data
     */
    ezRefreshActiveEmployeeScheduleData() {
        let url = ezApi.ezUrlTemplate`schedules/${ezApi.ezclocker.ezClockerContext.ezGetActiveEmployee().id}
            ?dateInWeek=${dateInWeekIso}
            &timeZoneId=${ezApi.ezclocker.ezDateTime.activeTimeZone}`;

        return ezUi.ezPageWaitAsync('Loading your schedules ...', (finished) => {
            return ezApi.ezclocker.http.ezGet(ezApi.ezclocker.nav.ezGetInternalApiUrl(url, 'v2'))
                .then(ezApi.ezclocker.ezServices.ezProcessApiResolve, ezApi.ezclocker.ezServices.ezProcessApiReject)
                .then(
                    (response) => {
                        self.ezSchedules = response;
                        ezApi.ezclocker.ezEventEngine.ezTriggerEvent(
                            EzWeekSchedule.ezEventNames.onScheduleDataLoaded);
                        return finished();
                    },
                    (eResponse) => {
                        self.ezSchedules = null;
                        ezApi.ezclocker.logger.error(ezApi.ezEM`
                        Failed to obtain the employer schedules for dateInWeekIso=${self.dateInWeekIso}.
                        Error: ${ezApi.ezToJson(eResponse)}`);
                        ezApi.ezclocker.ezEventEngine.ezTriggerEvent(EzWeekSchedule.ezEventNames.onScheduleDataError);
                        return finished();
                    });
        });
    }

    ezGetDayName(dayInt) {
        let aMoment = moment();
        aMoment.day(dayInt);
        return aMoment.format('dddd');
    }

    ezGetNextDayName(currentDayInt) {
        switch (currentDayInt) {
            case 0:
                return self.ezGetDayName(1);
            case 1:
                return self.ezGetDayName(2);
            case 2:
                return self.ezGetDayName(3);
            case 3:
                return self.ezGetDayName(4);
            case 4:
                return self.ezGetDayName(5);
            case 5:
                return self.ezGetDayName(6);
            case 6:
            default:
                return self.ezGetDayName(0);
        }
    }

    ezGetPreviousDayName(currentDayInt) {
        switch (currentDayInt) {
            case 1:
                return self.ezGetDayName(0);
            case 2:
                return self.ezGetDayName(1);
            case 3:
                return self.ezGetDayName(2);
            case 4:
                return self.ezGetDayName(3);
            case 5:
                return self.ezGetDayName(4);
            case 0:
            default:
                return self.ezGetDayName(6);
        }
    }

    ezGetFirstMomentInWeek(firstDayOfWeek, momentInWeek) {
        let currentDay = momentInWeek.day();
        // 1 = monday
        // 3 = momentInWeekDay, wednesday

        if (firstDayOfWeek === currentDay) {
            return momentInWeek;
        }

        if (firstDayOfWeek < currentDay) {
            return momentInWeek.subtract(currentDay - firstDayOfWeek, 'days');
        }

        return momentInWeek.add(firstDayOfWeek - currentDay, 'days');
    }
}

EzSchedule.ezApiName = 'ezSchedule';
EzSchedule.ezEventNames = {
    // Employer schedule data
    onEmployerScheduleDataUpdated:
        ezApi.ezIdTemplate`ezOn${EzSchedule.ezApiName}_EmployerScheduleData_Updated`,
    onEmployerScheduleDataError:
        ezApi.ezIdTemplate`ezOn${EzSchedule.ezApiName}_EmployerScheduleData_Error`,
    // Employee schedule Data
    onEmployeeScheduleDataUpdated:
        ezApi.ezIdTemplate`ezOn${EzSchedule.ezApiName}_EmployeeScheduleData_Updated`,
    onEmployeeScheduleDataError:
        ezApi.ezIdTemplate`ezOn${EzSchedule.ezApiName}_EmployeeScheduleData_Error`
};

document.addEventListener('onEzApiReady',
    () => ezApi.ezRegisterNewApi(EzSchedule, EzSchedule.ezApiName));

export {
    EzSchedule
};