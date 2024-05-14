import { EzEnum } from '/ezlibrary/enums/EzEnum.js';

/**
    Enumeration of Report Provider Types
    Import with:
        import { EzReportProviderType } from '/secure/widgets/EzExportReportDialog/EzReportProviderType.js';
 */
class EzReportProviderType extends EzEnum {
    /**
        All employees time-period report
     */
    static get ALL_EMPLOYEES_TIMEPERIOD_REPORT() {
        return 'AllEmployeesTimePeriod';
    }
    /**
        All employees time period report grouped by day
     */
    static get ALL_EMPLOYEES_TIME_PERIOD_GROUPED_BY_DAY() {
        return 'AllEmployeesTimePeriodReportyByDay';
    }
    /**
        Generic CSV Summary report
     */
    static get EZ_GENERIC_CSV_SUMMARY_REPORT() {
        return 'EzGenericCsvReportProvider';
    }
    /**
        All employees time period report grouped by employee
     */
    static get ALL_EMPLOYEES_TIME_PERIOD_REPORT_BY_EMPLOYEE() {
        return 'AllEmployeesTimePeriodReportyByEmployee';
    }
    /**
        All employees time period report grouped by employee and then by job
     */
    static get ALL_EMPLOYEES_TIME_PERIOD_REPORT_BY_EMPLOYEE_THEN_JOB() {
        return 'AllEmployeesTimePeriodReportyByEmployeeThenJob';
    }
    /**
        Employer's Job Report for period
     */
    static get EMPLOYER_JOB_REPORT() {
        return 'EmployerJobReport';
    }
    /**
        Export for PayChex Integration
     */
    static get EMPLOYER_PAY_CHEX_REPORT() {
        return 'EmployerPayChexReport';
    }
    /**
        Single Employee Time Period Report
     */
    static get SINGLE_EMPLOYEE_TIME_PERIOD_REPORT() {
        return 'EmployeeTimePeriodReport';
    }
    /**
        Single employee time period report
        @deprecated
        Migrate to using:
        EzReportProviderType.SINGLE_EMPLOYEE_TIME_PERIOD_REPORT
     */
    static get EMPLOYEE_TIME_PERIOD_REPORT() {
        return 'EmployeeTimePeriodReport';
    }
    /**
        Single employee report organized by Job
     */
    static get EMPLOYEE_TIME_PERIOD_REPORT_BY_JOB() {
        return 'EmployeeTimePeriodByJobReport';
    }
    /**
        Export the schedule as a downloaded report
     */
    static get EMPLOYER_SCHEDULE_EXPORT() {
        return 'EmployerExportSchedule';
    }

    static ezApiName = 'EzReportProviderType';
    static ezInstance = null;
    static ezApiRegistrationState = null;
    static ezCanRegister() {
        return 'PENDING' === EzReportProviderType.ezApiRegistrationState &&
            Object.prototype.hasOwnProperty.call(globalThis, 'ezApi') &&
            globalThis['ezApi'] && globalThis['ezApi'].ready;
    }
    static ezRegistrator() {
        if (EzReportProviderType.ezCanRegister()) {
            EzReportProviderType.ezInstance = ezApi.ezRegisterEnumeration(EzReportProviderType);

            EzReportProviderType.ezApiRegistrationState = 'REGISTERED';
        }
    }
    // Static Constructor
    static {
        if (null == this.ezApiRegistrationState) {
            this.ezApiRegistrationState = 'PENDING';

            document.addEventListener(
                'onEzApiReady',
                this.ezRegistrator);
        }
    }

    constructor() {
        super();
    }
}

export {
    EzReportProviderType
};
