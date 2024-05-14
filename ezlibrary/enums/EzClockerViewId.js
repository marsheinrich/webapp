import { EzEnumeration2 } from '/ezlibrary/enums/EzEnumeration2.js';

import { EzUserRole } from '/ezlibrary/EzUserRole.js';

/**
    @class
    @extends {EzEnumeration2}
    @description
    Defines the known feature toggle ids
    ---------------------------------------------------------------------------
    Import into non-enumeration classes with:
        import {
            // < other enumeration classes ... >
            EzClockerViewId
        } from '/ezlibrary/enums/EzEnumerations.js';
    ---------------------------------------------------------------------------
    Import into non-enumeration classes with:
        import { EzClockerViewId } from '/ezlibrary/enums/EzClockerViewId.js';
    ---------------------------------------------------------------------------
    Access static method/properties only:
        EzClockerViewId.{property or method name}
    ---------------------------------------------------------------------------
 */
export class EzClockerViewId extends EzEnumeration2 {
    /**
        @private @field
        Stores the singleton instance of this enumeration class.
        @type {EzClockerViewId}
     */
    static #ezEnumerationSingleton = null;

    /**
        @static
        Static Initialization
     */
    static {
        if (null == EzClockerViewId.#ezEnumerationSingleton) {
            EzClockerViewId.#ezEnumerationSingleton = new EzClockerViewId(
                // Enum property names
                [
                    'UNKNOWN',
                    'TEAM_CHAT_VIEW',
                    'EMPLOYER_DASHBOARD_VIEW',
                    'EMPLOYER_SCHEDULE_VIEW',
                    'EMPLOYER_ARCHIVE_VIEW',
                    'EMPLOYER_ACCOUNT_VIEW',
                    'EMPLOYER_INTEGRATIONS_VIEW',
                    'EMPLOYER_TIME_OFF_VIEW',
                    'EMPLOYEE_DASHBOARD_VIEW',
                    'EMPLOYEE_SCHEDULES_VIEW',
                    'EMPLOYEE_TIME_OFF_VIEW',
                    'PERSONAL_DASHBOARD_VIEW'
                ],
                // Enum property values for each enum property name as an array
                // Enter null if the values are equal to the names
                [
                    'UNKNOWN',
                    // 'TEAM_CHAT_VIEW',
                    'ezTeamChatDialog',
                    // 'EMPLOYER_DASHBOARD_VIEW',
                    'employerDashboard',
                    // 'EMPLOYER_SCHEDULE_VIEW',
                    'employerSchedule',
                    // 'EMPLOYER_ARCHIVE_VIEW',
                    'EMPLOYER_ARCHIVE_VIEW',
                    // 'EMPLOYER_ACCOUNT_VIEW',
                    'account',
                    // 'EMPLOYER_INTEGRATIONS_VIEW',
                    'EMPLOYER_INTEGRATIONS_VIEW',
                    // 'EMPLOYER_TIME_OFF_VIEW',
                    'ezEmployerTimeOffView',
                    // 'EMPLOYEE_DASHBOARD_VIEW',
                    'employeeDashboard',
                    // 'EMPLOYEE_SCHEDULES_VIEW',
                    'employeeSchedule',
                    // 'EMPLOYEE_TIME_OFF_VIEW',
                    'ezEmployeeTimeOffView',
                    // 'PERSONAL_DASHBOARD_VIEW'
                    'PERSONAL_DASHBOARD_VIEW'
                ],
                // Optional array of additional data for eac enumeration property.
                // Enter null if not needed.
                [
                    {
                        name: 'UNKNOWN VIEW',
                        REQUIRED_ROLES: [],
                        publicView: false,
                        personalView: false,
                        employeeView: false,
                        managerView: false,
                        payrollManagerView: false,
                        employerView: false,
                        supportView: false,
                        adminView: false
                    },
                    {
                        name: 'Team Chat',
                        SUPPORTED_ROLES: [
                            EzUserRole.ROLE_EMPLOYER,
                            EzUserRole.ROLE_PAYROLL_MANAGER,
                            EzUserRole.ROLE_MANAGER,
                            EzUserRole.ROLE_EMPLOYEE,
                            EzUserRole.ROLE_EZCLOCKER_SUPPORT
                        ],
                        publicView: false,
                        personalView: false,
                        employeeView: true,
                        managerView: true,
                        payrollManagerView: true,
                        employerView: true,
                        supportView: true,
                        adminView: true
                    },
                    {
                        name: 'Employer Dashboard',
                        SUPPORTED_ROLES: [
                            EzUserRole.ROLE_EMPLOYER,
                            EzUserRole.ROLE_PAYROLL_MANAGER,
                            EzUserRole.ROLE_MANAGER,
                            EzUserRole.ROLE_EZCLOCKER_SUPPORT,
                            EzUserRole.ROLE_ADMIN
                        ],
                        publicView: false,
                        personalView: false,
                        employeeView: false,
                        managerView: true,
                        payrollManagerView: true,
                        employerView: true,
                        supportView: true,
                        adminView: true
                    },
                    {
                        name: 'Employer Schedule',
                        SUPPORTED_ROLES: [
                            EzUserRole.ROLE_EMPLOYER,
                            EzUserRole.ROLE_PAYROLL_MANAGER,
                            EzUserRole.ROLE_MANAGER,
                            EzUserRole.ROLE_EZCLOCKER_SUPPORT,
                            EzUserRole.ROLE_ADMIN
                        ],
                        publicView: false,
                        personalView: false,
                        employeeView: false,
                        managerView: true,
                        payrollManagerView: true,
                        employerView: true,
                        supportView: true,
                        adminView: true
                    },
                    {
                        name: 'Employer Archive',
                        SUPPORTED_ROLES: [
                            EzUserRole.ROLE_EMPLOYER,
                            EzUserRole.ROLE_PAYROLL_MANAGER,
                            EzUserRole.ROLE_MANAGER,
                            EzUserRole.ROLE_EZCLOCKER_SUPPORT,
                            EzUserRole.ROLE_ADMIN
                        ],
                        publicView: false,
                        personalView: false,
                        employeeView: false,
                        managerView: true,
                        payrollManagerView: true,
                        employerView: true,
                        supportView: true,
                        adminView: true
                    },
                    {
                        name: 'Account Details',
                        SUPPORTED_ROLES: [
                            EzUserRole.ROLE_EMPLOYER,
                            EzUserRole.ROLE_EZCLOCKER_SUPPORT,
                            EzUserRole.ROLE_ADMIN
                        ],
                        publicView: false,
                        personalView: false,
                        employeeView: false,
                        managerView: false,
                        payrollManagerView: false,
                        employerView: true,
                        supportView: true,
                        adminView: true
                    },
                    {
                        name: 'Integrations',
                        SUPPORTED_ROLES: [
                            EzUserRole.ROLE_EMPLOYER,
                            EzUserRole.ROLE_PAYROLL_MANAGER,
                            EzUserRole.ROLE_MANAGER,
                            EzUserRole.ROLE_EZCLOCKER_SUPPORT,
                            EzUserRole.ROLE_ADMIN
                        ],
                        publicView: false,
                        personalView: false,
                        employeeView: false,
                        managerView: true,
                        payrollManagerView: true,
                        employerView: true,
                        supportView: true,
                        adminView: true
                    },
                    {
                        name: 'Employer Time Off',
                        SUPPORTED_ROLES: [
                            EzUserRole.ROLE_EMPLOYER,
                            EzUserRole.ROLE_PAYROLL_MANAGER,
                            EzUserRole.ROLE_MANAGER,
                            EzUserRole.ROLE_EZCLOCKER_SUPPORT,
                            EzUserRole.ROLE_ADMIN
                        ],
                        publicView: false,
                        personalView: false,
                        employeeView: false,
                        managerView: true,
                        payrollManagerView: true,
                        employerView: true,
                        supportView: true,
                        adminView: true
                    },
                    {
                        name: 'Employee Dashboard',
                        SUPPORTED_ROLES: [
                            EzUserRole.ROLE_EMPLOYEE,
                            EzUserRole.ROLE_EZCLOCKER_SUPPORT,
                            EzUserRole.ROLE_ADMIN
                        ],
                        publicView: false,
                        personalView: true,
                        employeeView: true,
                        managerView: false,
                        payrollManagerView: false,
                        employerView: false,
                        supportView: true,
                        adminView: true
                    },
                    {
                        name: 'Employee Schedule',
                        SUPPORTED_ROLES: [
                            EzUserRole.ROLE_EMPLOYEE,
                            EzUserRole.ROLE_EZCLOCKER_SUPPORT,
                            EzUserRole.ROLE_ADMIN
                        ],
                        publicView: false,
                        personalView: false,
                        employeeView: true,
                        managerView: false,
                        payrollManagerView: false,
                        employerView: false,
                        supportView: true,
                        adminView: true
                    },
                    {
                        name: 'Employee Time Off',
                        SUPPORTED_ROLES: [
                            EzUserRole.ROLE_EMPLOYEE,
                            EzUserRole.ROLE_EZCLOCKER_SUPPORT,
                            EzUserRole.ROLE_ADMIN
                        ],
                        publicView: false,
                        personalView: false,
                        employeeView: true,
                        managerView: false,
                        payrollManagerView: false,
                        employerView: false,
                        supportView: true,
                        adminView: true
                    },
                    {
                        name: 'Personal Dashboard',
                        SUPPORTED_ROLES: [
                            EzUserRole.ROLE_PERSONAL,
                            EzUserRole.ROLE_EZCLOCKER_SUPPORT,
                            EzUserRole.ROLE_ADMIN
                        ],
                        publicView: false,
                        personalView: true,
                        employeeView: false,
                        managerView: false,
                        payrollManagerView: false,
                        employerView: false,
                        supportView: true,
                        adminView: true
                    }
                ]);
        }
    }

    /**
        @public @constructor
        >> DO NOT CREATE NEW INSTANCES <<
        The static initializer will create a singleton instance that injects the static properties and methods
        that you then use to access enumeration values.
     */
    constructor(name, value, optionalData) {
        super(name, value, optionalData);
    }
}
