import { EzScheduleWeek } from '/public/widgets/EzSchedule/EzScheduleWeek.js';

class EzScheduleTest {
    constructor() {
        this.ready = false;
        this.ezTypeName = 'EzScheduleTest';

        this.ezScheduleWeekContainerId = 'EzScheduleWeekTest';
    }

    ezInit() {
        let self = ezApi.ezclocker[EzScheduleTest.ezApiName];

        let ezScheduleWeek = new EzScheduleWeek(0, ezApi.ezclocker.ezDateTime.ezNow());

        ezScheduleWeek.ezRenderWeekHeader(self.ezScheduleWeekContainerId);

        self.ezScheduleBoxTest(ezScheduleWeek);

        self.ezPendingTimeOffBoxTest(ezScheduleWeek);
        self.ezApprovedTimeOffBoxTest(ezScheduleWeek);
        self.ezExpiredTimeOffBoxTest(ezScheduleWeek);
        self.ezDeniedTimeOffBoxTest(ezScheduleWeek);
        self.ezCanceledTimeOffBoxTest(ezScheduleWeek);

        this.ready = true;
        return this;
    }

    ezBuildTestLocation() {
        return {
            id: 1,
            employerId: 1,
            gpsLocationId: 1,
            timeEntryId: 1,
            name: 'ezClocker Campus',
            building: 'Building 1',
            streetNumber: '12736',
            streetNumberOrHouseNumber: '',
            streetName: 'Bruschetta Drive',
            streetOrRoadName: '',
            apartmentNumber: '',
            villageOrNeighborhood: '',
            city: 'Frisco',
            stateDistrict: '',
            _state: 'TX',
            stateOrProvinceOrStateCode: '',
            postalCode: '75033',
            county: '',
            region: '',
            island: '',
            country: '',
            countryCode: '',
            continent: '',
            phoneNumber: '972-377-2088',
            primaryPhoneNumber: '',
            altPhoneNumber1: '',
            altPhoneNumber2: '',
            clockInLocation: false,
            clockOutLocation: false,
            isPrimaryLocation: false,
            acceptable: true,
            overridden: false
        };
    }

    ezScheduleBoxTest(ezScheduleWeek) {
        let self = ezApi.ezclocker[EzScheduleTest.ezApiName];

        let schedule = {
            id: 1,
            employeeId: 1,
            employerId: 1,
            locationId: 1,
            pendingLocationId: 1,
            startDateTimeIso8601: '2021-02-02T09:00:00-05:00',
            pendingStartDateTimeIso8601: '2021-02-01T09:00:00-05:00',
            endDateTimeIso8601: '2021-02-01T17:00:00-05:00',
            pendingEndDateTimeIso8601: '2021-02-01T17:00:00-05:00',
            notes: 'Schedule notes',
            pendingNotes: 'Pending schedule notes',
            published: true,
            deleted: false,
            modified: true,
            targetTimeZone: 'America\Chicago',
            firstPublishedDateTimeIso: '2021-01-15T12:00:00-05:00',
            lastUpdatePublishedDateTimeIso: '2021-01-16T12:00:00-05:00',
            employeeNotifiedBeforeShift: false
        };

        ezUi.ezContent('EzScheduleBoxTest', ezScheduleWeek.ezBuildScheduleBox(schedule, self.ezBuildTestLocation()));
    }

    ezPendingTimeOffBoxTest(ezScheduleWeek) {
        let pendingPTOTimeOff = {
            id: 1,
            employerId: 1,
            employeeId: 1,
            requestedByUserId: 1,
            reviewedByUserId: null,
            requestStartDateIso: '2021-02-02T09:00:00-05:00',
            requestEndDateIso: '2021-02-01T17:00:00-05:00',
            requestType: 'PTO',
            requestStatus: 'PENDING',
            hoursPerDay: 8,
            totalHours: 8,
            submittedYear: 2021,
            submittedDateTimeIso: '2021-01-15T09:00:00-05:00',
            reviewedDateTimeIso: null,
            allDay: false
        };
        ezUi.ezContent('EzPendingPTOTimeOffBoxTest', ezScheduleWeek.ezBuildTimeOffBox(pendingPTOTimeOff));

        let pendingPTOTimeOffAllDay = {
            id: 1,
            employerId: 1,
            employeeId: 1,
            requestedByUserId: 1,
            reviewedByUserId: null,
            requestStartDateIso: '2021-02-02T09:00:00-05:00',
            requestEndDateIso: '2021-02-01T17:00:00-05:00',
            requestType: 'PTO',
            requestStatus: 'PENDING',
            hoursPerDay: 8,
            totalHours: 8,
            submittedYear: 2021,
            submittedDateTimeIso: '2021-01-15T09:00:00-05:00',
            reviewedDateTimeIso: null,
            allDay: true
        };
        ezUi.ezContent('EzPendingPTOTimeOffAllDayBoxTest', ezScheduleWeek.ezBuildTimeOffBox(pendingPTOTimeOffAllDay));

        let pendingUNPAIDTimeOff = {
            id: 1,
            employerId: 1,
            employeeId: 1,
            requestedByUserId: 1,
            reviewedByUserId: null,
            requestStartDateIso: '2021-02-02T09:00:00-05:00',
            requestEndDateIso: '2021-02-01T17:00:00-05:00',
            requestType: 'UNPAID',
            requestStatus: 'PENDING',
            hoursPerDay: 8,
            totalHours: 8,
            submittedYear: 2021,
            submittedDateTimeIso: '2021-01-15T09:00:00-05:00',
            reviewedDateTimeIso: null,
            allDay: false
        };
        ezUi.ezContent('EzPendingUNPAIDTimeOffBoxTest', ezScheduleWeek.ezBuildTimeOffBox(pendingUNPAIDTimeOff));

        let pendingSICKTimeOff = {
            id: 1,
            employerId: 1,
            employeeId: 1,
            requestedByUserId: 1,
            reviewedByUserId: null,
            requestStartDateIso: '2021-02-02T09:00:00-05:00',
            requestEndDateIso: '2021-02-01T17:00:00-05:00',
            requestType: 'SICK',
            requestStatus: 'PENDING',
            hoursPerDay: 8,
            totalHours: 8,
            submittedYear: 2021,
            submittedDateTimeIso: '2021-01-15T09:00:00-05:00',
            reviewedDateTimeIso: null,
            allDay: false
        };
        ezUi.ezContent('EzPendingSICKTimeOffBoxTest', ezScheduleWeek.ezBuildTimeOffBox(pendingSICKTimeOff));

        let pendingHOLIDAYTimeOff = {
            id: 1,
            employerId: 1,
            employeeId: 1,
            requestedByUserId: 1,
            reviewedByUserId: null,
            requestStartDateIso: '2021-02-02T09:00:00-05:00',
            requestEndDateIso: '2021-02-01T17:00:00-05:00',
            requestType: 'HOLIDAY',
            requestStatus: 'PENDING',
            hoursPerDay: 8,
            totalHours: 8,
            submittedYear: 2021,
            submittedDateTimeIso: '2021-01-15T09:00:00-05:00',
            reviewedDateTimeIso: null,
            allDay: false
        };
        ezUi.ezContent('EzPendingHOLIDAYTimeOffBoxTest', ezScheduleWeek.ezBuildTimeOffBox(pendingHOLIDAYTimeOff));
    }

    ezApprovedTimeOffBoxTest(ezScheduleWeek) {
        let approvedPTOTimeOff = {
            id: 1,
            employerId: 1,
            employeeId: 1,
            requestedByUserId: 1,
            reviewedByUserId: null,
            requestStartDateIso: '2021-02-02T09:00:00-05:00',
            requestEndDateIso: '2021-02-01T17:00:00-05:00',
            requestType: 'PTO',
            requestStatus: 'APPROVED',
            hoursPerDay: 8,
            totalHours: 8,
            submittedYear: 2021,
            submittedDateTimeIso: '2021-01-15T09:00:00-05:00',
            reviewedDateTimeIso: null,
            allDay: false
        };
        ezUi.ezContent('EzApprovedPTOTimeOffBoxTest', ezScheduleWeek.ezBuildTimeOffBox(approvedPTOTimeOff));

        let approvedUNPAIDTimeOff = {
            id: 1,
            employerId: 1,
            employeeId: 1,
            requestedByUserId: 1,
            reviewedByUserId: null,
            requestStartDateIso: '2021-02-02T09:00:00-05:00',
            requestEndDateIso: '2021-02-01T17:00:00-05:00',
            requestType: 'UNPAID',
            requestStatus: 'APPROVED',
            hoursPerDay: 8,
            totalHours: 8,
            submittedYear: 2021,
            submittedDateTimeIso: '2021-01-15T09:00:00-05:00',
            reviewedDateTimeIso: null,
            allDay: false
        };
        ezUi.ezContent('EzApprovedUNPAIDTimeOffBoxTest', ezScheduleWeek.ezBuildTimeOffBox(approvedUNPAIDTimeOff));

        let approvedSICKTimeOff = {
            id: 1,
            employerId: 1,
            employeeId: 1,
            requestedByUserId: 1,
            reviewedByUserId: null,
            requestStartDateIso: '2021-02-02T09:00:00-05:00',
            requestEndDateIso: '2021-02-01T17:00:00-05:00',
            requestType: 'SICK',
            requestStatus: 'APPROVED',
            hoursPerDay: 8,
            totalHours: 8,
            submittedYear: 2021,
            submittedDateTimeIso: '2021-01-15T09:00:00-05:00',
            reviewedDateTimeIso: null,
            allDay: false
        };
        ezUi.ezContent('EzApprovedSICKTimeOffBoxTest', ezScheduleWeek.ezBuildTimeOffBox(approvedSICKTimeOff));

        let approvedHOLIDAYTimeOff = {
            id: 1,
            employerId: 1,
            employeeId: 1,
            requestedByUserId: 1,
            reviewedByUserId: null,
            requestStartDateIso: '2021-02-02T09:00:00-05:00',
            requestEndDateIso: '2021-02-01T17:00:00-05:00',
            requestType: 'HOLIDAY',
            requestStatus: 'APPROVED',
            hoursPerDay: 8,
            totalHours: 8,
            submittedYear: 2021,
            submittedDateTimeIso: '2021-01-15T09:00:00-05:00',
            reviewedDateTimeIso: null,
            allDay: false
        };
        ezUi.ezContent('EzApprovedHOLIDAYTimeOffBoxTest', ezScheduleWeek.ezBuildTimeOffBox(approvedHOLIDAYTimeOff));
    }

    ezExpiredTimeOffBoxTest(ezScheduleWeek) {
        let expiredPTOTimeOff = {
            id: 1,
            employerId: 1,
            employeeId: 1,
            requestedByUserId: 1,
            reviewedByUserId: null,
            requestStartDateIso: '2021-02-02T09:00:00-05:00',
            requestEndDateIso: '2021-02-01T17:00:00-05:00',
            requestType: 'PTO',
            requestStatus: 'EXPIRED',
            hoursPerDay: 8,
            totalHours: 8,
            submittedYear: 2021,
            submittedDateTimeIso: '2021-01-15T09:00:00-05:00',
            reviewedDateTimeIso: null,
            allDay: false
        };
        ezUi.ezContent('EzEXPIREDPTOTimeOffBoxTest', ezScheduleWeek.ezBuildTimeOffBox(expiredPTOTimeOff));

        let expiredUNPAIDTimeOff = {
            id: 1,
            employerId: 1,
            employeeId: 1,
            requestedByUserId: 1,
            reviewedByUserId: null,
            requestStartDateIso: '2021-02-02T09:00:00-05:00',
            requestEndDateIso: '2021-02-01T17:00:00-05:00',
            requestType: 'UNPAID',
            requestStatus: 'EXPIRED',
            hoursPerDay: 8,
            totalHours: 8,
            submittedYear: 2021,
            submittedDateTimeIso: '2021-01-15T09:00:00-05:00',
            reviewedDateTimeIso: null,
            allDay: false
        };
        ezUi.ezContent('EzEXPIREDUNPAIDTimeOffBoxTest', ezScheduleWeek.ezBuildTimeOffBox(expiredUNPAIDTimeOff));

        let expiredSICKTimeOff = {
            id: 1,
            employerId: 1,
            employeeId: 1,
            requestedByUserId: 1,
            reviewedByUserId: null,
            requestStartDateIso: '2021-02-02T09:00:00-05:00',
            requestEndDateIso: '2021-02-01T17:00:00-05:00',
            requestType: 'SICK',
            requestStatus: 'EXPIRED',
            hoursPerDay: 8,
            totalHours: 8,
            submittedYear: 2021,
            submittedDateTimeIso: '2021-01-15T09:00:00-05:00',
            reviewedDateTimeIso: null,
            allDay: false
        };
        ezUi.ezContent('EzEXPIREDSICKTimeOffBoxTest', ezScheduleWeek.ezBuildTimeOffBox(expiredSICKTimeOff));

        let expiredHOLIDAYTimeOff = {
            id: 1,
            employerId: 1,
            employeeId: 1,
            requestedByUserId: 1,
            reviewedByUserId: null,
            requestStartDateIso: '2021-02-02T09:00:00-05:00',
            requestEndDateIso: '2021-02-01T17:00:00-05:00',
            requestType: 'HOLIDAY',
            requestStatus: 'EXPIRED',
            hoursPerDay: 8,
            totalHours: 8,
            submittedYear: 2021,
            submittedDateTimeIso: '2021-01-15T09:00:00-05:00',
            reviewedDateTimeIso: null,
            allDay: false
        };
        ezUi.ezContent('EzEXPIREDHOLIDAYTimeOffBoxTest', ezScheduleWeek.ezBuildTimeOffBox(expiredHOLIDAYTimeOff));
    }

    ezDeniedTimeOffBoxTest(ezScheduleWeek) {
        let deniedPTOTimeOff = {
            id: 1,
            employerId: 1,
            employeeId: 1,
            requestedByUserId: 1,
            reviewedByUserId: null,
            requestStartDateIso: '2021-02-02T09:00:00-05:00',
            requestEndDateIso: '2021-02-01T17:00:00-05:00',
            requestType: 'PTO',
            requestStatus: 'DENIED',
            hoursPerDay: 8,
            totalHours: 8,
            submittedYear: 2021,
            submittedDateTimeIso: '2021-01-15T09:00:00-05:00',
            reviewedDateTimeIso: null,
            allDay: false
        };
        ezUi.ezContent('EzDENIEDPTOTimeOffBoxTest', ezScheduleWeek.ezBuildTimeOffBox(deniedPTOTimeOff));

        let deniedUNPAIDTimeOff = {
            id: 1,
            employerId: 1,
            employeeId: 1,
            requestedByUserId: 1,
            reviewedByUserId: null,
            requestStartDateIso: '2021-02-02T09:00:00-05:00',
            requestEndDateIso: '2021-02-01T17:00:00-05:00',
            requestType: 'UNPAID',
            requestStatus: 'DENIED',
            hoursPerDay: 8,
            totalHours: 8,
            submittedYear: 2021,
            submittedDateTimeIso: '2021-01-15T09:00:00-05:00',
            reviewedDateTimeIso: null,
            allDay: false
        };
        ezUi.ezContent('EzDENIEDUNPAIDTimeOffBoxTest', ezScheduleWeek.ezBuildTimeOffBox(deniedUNPAIDTimeOff));

        let deniedSICKTimeOff = {
            id: 1,
            employerId: 1,
            employeeId: 1,
            requestedByUserId: 1,
            reviewedByUserId: null,
            requestStartDateIso: '2021-02-02T09:00:00-05:00',
            requestEndDateIso: '2021-02-01T17:00:00-05:00',
            requestType: 'SICK',
            requestStatus: 'DENIED',
            hoursPerDay: 8,
            totalHours: 8,
            submittedYear: 2021,
            submittedDateTimeIso: '2021-01-15T09:00:00-05:00',
            reviewedDateTimeIso: null,
            allDay: false
        };
        ezUi.ezContent('EzDENIEDSICKTimeOffBoxTest', ezScheduleWeek.ezBuildTimeOffBox(deniedSICKTimeOff));

        let deniedHOLIDAYTimeOff = {
            id: 1,
            employerId: 1,
            employeeId: 1,
            requestedByUserId: 1,
            reviewedByUserId: null,
            requestStartDateIso: '2021-02-02T09:00:00-05:00',
            requestEndDateIso: '2021-02-01T17:00:00-05:00',
            requestType: 'HOLIDAY',
            requestStatus: 'DENIED',
            hoursPerDay: 8,
            totalHours: 8,
            submittedYear: 2021,
            submittedDateTimeIso: '2021-01-15T09:00:00-05:00',
            reviewedDateTimeIso: null,
            allDay: false
        };
        ezUi.ezContent('EzDENIEDHOLIDAYTimeOffBoxTest', ezScheduleWeek.ezBuildTimeOffBox(deniedHOLIDAYTimeOff));
    }

    ezCanceledTimeOffBoxTest(ezScheduleWeek) {
        let canceledPTOTimeOff = {
            id: 1,
            employerId: 1,
            employeeId: 1,
            requestedByUserId: 1,
            reviewedByUserId: null,
            requestStartDateIso: '2021-02-02T09:00:00-05:00',
            requestEndDateIso: '2021-02-01T17:00:00-05:00',
            requestType: 'PTO',
            requestStatus: 'CANCELED',
            hoursPerDay: 8,
            totalHours: 8,
            submittedYear: 2021,
            submittedDateTimeIso: '2021-01-15T09:00:00-05:00',
            reviewedDateTimeIso: null,
            allDay: false
        };
        ezUi.ezContent('EzCANCELEDPTOTimeOffBoxTest', ezScheduleWeek.ezBuildTimeOffBox(canceledPTOTimeOff));

        let canceledUNPAIDTimeOff = {
            id: 1,
            employerId: 1,
            employeeId: 1,
            requestedByUserId: 1,
            reviewedByUserId: null,
            requestStartDateIso: '2021-02-02T09:00:00-05:00',
            requestEndDateIso: '2021-02-01T17:00:00-05:00',
            requestType: 'UNPAID',
            requestStatus: 'CANCELED',
            hoursPerDay: 8,
            totalHours: 8,
            submittedYear: 2021,
            submittedDateTimeIso: '2021-01-15T09:00:00-05:00',
            reviewedDateTimeIso: null,
            allDay: false
        };
        ezUi.ezContent('EzCANCELEDUNPAIDTimeOffBoxTest', ezScheduleWeek.ezBuildTimeOffBox(canceledUNPAIDTimeOff));

        let canceledSICKTimeOff = {
            id: 1,
            employerId: 1,
            employeeId: 1,
            requestedByUserId: 1,
            reviewedByUserId: null,
            requestStartDateIso: '2021-02-02T09:00:00-05:00',
            requestEndDateIso: '2021-02-01T17:00:00-05:00',
            requestType: 'SICK',
            requestStatus: 'CANCELED',
            hoursPerDay: 8,
            totalHours: 8,
            submittedYear: 2021,
            submittedDateTimeIso: '2021-01-15T09:00:00-05:00',
            reviewedDateTimeIso: null,
            allDay: false
        };
        ezUi.ezContent('EzCANCELEDSICKTimeOffBoxTest', ezScheduleWeek.ezBuildTimeOffBox(canceledSICKTimeOff));

        let canceledHOLIDAYTimeOff = {
            id: 1,
            employerId: 1,
            employeeId: 1,
            requestedByUserId: 1,
            reviewedByUserId: null,
            requestStartDateIso: '2021-02-02T09:00:00-05:00',
            requestEndDateIso: '2021-02-01T17:00:00-05:00',
            requestType: 'HOLIDAY',
            requestStatus: 'CANCELED',
            hoursPerDay: 8,
            totalHours: 8,
            submittedYear: 2021,
            submittedDateTimeIso: '2021-01-15T09:00:00-05:00',
            reviewedDateTimeIso: null,
            allDay: false
        };
        ezUi.ezContent('EzCANCELEDHOLIDAYTimeOffBoxTest', ezScheduleWeek.ezBuildTimeOffBox(canceledHOLIDAYTimeOff));
    }
}
EzScheduleTest.ezApiName = 'ezScheduleTest';

export {
    EzScheduleTest
};

document.addEventListener('onEzApiReady',
    () => ezApi.ezRegisterNewApi(EzScheduleTest, EzScheduleTest.ezApiName));
