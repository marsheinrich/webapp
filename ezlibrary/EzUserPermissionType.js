import { EzEnum } from '/ezlibrary/enums/EzEnum.js';

import { EzUserRole } from '/ezlibrary/EzUserRole.js';

/**
    TODO: Move to /ezlibrary/enums/EzUserPermissionType.js
    TODO: Migrate from EzEnum to extending from EzEnumeration2
    Defines the available UserPermission permission ids.
    Java file: UserPermissionId.java
    Import with:
    import { EzUserPermissionType } from '/ezlibrary/EzUserPermissionType.js';
 */
export class EzUserPermissionType extends EzEnum {
    static get UNKNOWN() {
        return 'UNKNOWN';
    }
    static get _UNKNOWN() {
        return {
            displayName: 'Unknown or unsupported permission. Has no impact to employee. Equivlant to null.',
            childRestrictions: [],
            defaultValue: '0',
            defaultEnabled: [],
            appliesToRoles: [
                EzUserRole.ROLE_ADMIN,
                EzUserRole.ROLE_EZCLOCKER_SUPPORT,
                EzUserRole.ROLE_DEVELOPER,
                EzUserRole.ROLE_EMPLOYER,
                EzUserRole.ROLE_EMPLOYEE,
                EzUserRole.ROLE_MANAGER,
                EzUserRole.ROLE_PAYROLL_MANAGER,
                EzUserRole.ROLE_PERSONAL,
            ]
        };
    }

    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    // ezClocker Mobile Application Specific Permissions
    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    static get DISALLOW_MOBILE_CLOCK_IN() {
        return 'DISALLOW_MOBILE_CLOCK_IN';
    }
    static get _DISALLOW_MOBILE_CLOCK_IN() {
        return {
            displayName: 'Do not allow employee to clock in or out using the ezClocker mobile apps.',
            childRestrictions: [],
            defaultValue: '20',
            defaultEnabled: [],
            appliesToRoles: [
                EzUserRole.ROLE_EMPLOYEE,
                EzUserRole.ROLE_MANAGER,
                EzUserRole.ROLE_PAYROLL_MANAGER
            ]
        };
    }

    static get DISALLOW_MOBILE_CLOCK_OUT() {
        return 'DISALLOW_MOBILE_CLOCK_OUT';
    }
    static get _DISALLOW_MOBILE_CLOCK_OUT() {
        return {
            displayName: 'Do not allow employee to clock in or out using the ezClocker mobile apps.',
            childRestrictions: [],
            defaultValue: '21',
            defaultEnabled: [],
            appliesToRoles: [
                EzUserRole.ROLE_EMPLOYEE,
                EzUserRole.ROLE_MANAGER,
                EzUserRole.ROLE_PAYROLL_MANAGER
            ]
        };
    }

    static get DISALLOW_MOBILE_EDIT_TIMEENTRY() {
        return 'DISALLOW_MOBILE_EDIT_TIMEENTRY';
    }
    static get _DISALLOW_MOBILE_EDIT_TIMEENTRY() {
        return {
            displayName: 'Prevents the user from editing time entrie with the ezClocker mobile apps.',
            childRestrictions: [],
            defaultValue: '22',
            defaultEnabled: [],
            appliesToRoles: [
                EzUserRole.ROLE_EMPLOYEE,
                EzUserRole.ROLE_MANAGER,
                EzUserRole.ROLE_PAYROLL_MANAGER
            ]
        };
    }

    static get DISALLOW_MOBILE_ADD_TIMEENTRY() {
        return 'DISALLOW_MOBILE_ADD_TIMEENTRY';
    }
    static get _DISALLOW_MOBILE_ADD_TIMEENTRY() {
        return {
            displayName: 'Prevents the user from editing adding time entrie with the ezClocker mobile apps.',
            childRestrictions: [],
            defaultValue: '23',
            defaultEnabled: [],
            appliesToRoles: [
                EzUserRole.ROLE_EMPLOYEE,
                EzUserRole.ROLE_MANAGER,
                EzUserRole.ROLE_PAYROLL_MANAGER
            ]
        };
    }

    static get DISALLOW_EMPLOYEE_MOBILE_TIMEENTRY() {
        return 'DISALLOW_EMPLOYEE_MOBILE_TIMEENTRY';
    }
    static get _DISALLOW_EMPLOYEE_MOBILE_TIMEENTRY() {
        return {
            displayName: 'Do not allow employee to clock in or out using the ezClocker mobile apps.',
            childRestrictions: [
                EzUserPermissionType.DISALLOW_MOBILE_CLOCK_IN,
                EzUserPermissionType.DISALLOW_MOBILE_CLOCK_OUT,
                EzUserPermissionType.DISALLW_MOBILE_ADD_TIMEENTRY,
                EzUserPermissionType.DISALLOW_MOBILE_EDIT_TIMEENTRY,
                EzUserPermissionType.DISALLOW_EMPLOYEE_TIMEENTRY
            ],
            defaultValue: '20.21.22.23',
            defaultEnabled: [],
            appliesToRoles: [
                EzUserRole.ROLE_EMPLOYEE,
                EzUserRole.ROLE_MANAGER,
                EzUserRole.ROLE_PAYROLL_MANAGER
            ]
        };
    }

    /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    | ezClocker Website Specific Permissions
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
    static get DISALLOW_WEB_CLOCK_IN() {
        return 'DISALLOW_WEB_CLOCK_IN';
    }
    static get _DISALLOW_WEB_CLOCK_IN() {
        return {
            displayName: 'Do not allow employee to clock in using the ezClocker website.',
            childRestrictions: [],
            defaultValue: '30',
            defaultEnabled: [],
            appliesToRoles: [
                EzUserRole.ROLE_EMPLOYEE,
                EzUserRole.ROLE_MANAGER,
                EzUserRole.ROLE_PAYROLL_MANAGER
            ]
        };
    }

    static get DISALLOW_WEB_CLOCK_OUT() {
        return 'DISALLOW_WEB_CLOCK_OUT';
    }
    static get _DISALLOW_WEB_CLOCK_OUT() {
        return {
            displayName: 'Do not allow employee to clock out using the ezClocker website.',
            childRestrictions: [],
            defaultValue: '31',
            defaultEnabled: [],
            appliesToRoles: [
                EzUserRole.ROLE_EMPLOYEE,
                EzUserRole.ROLE_MANAGER,
                EzUserRole.ROLE_PAYROLL_MANAGER
            ]
        };
    }

    static get DISALLOW_WEB_EDIT_TIMEENTRY() {
        return 'DISALLOW_WEB_EDIT_TIMEENTRY';
    }
    static get _DISALLOW_WEB_EDIT_TIMEENTRY() {
        return {
            displayName: 'Do not allow user to edit time entries using the ezClocker website.',
            childRestrictions: [],
            defaultValue: '32',
            defaultEnabled: [],
            appliesToRoles: [
                EzUserRole.ROLE_EMPLOYEE,
                EzUserRole.ROLE_MANAGER,
                EzUserRole.ROLE_PAYROLL_MANAGER
            ]
        };
    }

    static get DISALLOW_WEB_ADD_TIMEENTRY() {
        return 'DISALLOW_WEB_ADD_TIMEENTRY';
    }
    static get _DISALLOW_WEB_ADD_TIMEENTRY() {
        return {
            displayName: 'Do not allow user to add time entries using the ezClocker website.',
            childRestrictions: [],
            defaultValue: '33',
            defaultEnabled: [],
            appliesToRoles: [
                EzUserRole.ROLE_EMPLOYEE,
                EzUserRole.ROLE_MANAGER,
                EzUserRole.ROLE_PAYROLL_MANAGER
            ]
        };
    }

    static get DISALLOW_EMPLOYEE_WEB_TIMEENTRY() {
        return 'DISALLOW_EMPLOYEE_WEB_TIMEENTRY';
    }
    static get _DISALLOW_EMPLOYEE_WEB_TIMEENTRY() {
        return {
            displayName: 'Do not allow employee to clock in or out using the ezClocker website.',
            childRestrictions: [
                EzUserPermissionType.DISALLOW_WEB_CLOCK_IN,
                EzUserPermissionType.DISALLOW_WEB_CLOCK_OUT,
                EzUserPermissionType.DISALLOW_WEB_ADD_TIMEENTRY,
                EzUserPermissionType.DISALLOW_WEB_EDIT_TIMEENTRY
            ],
            defaultValue: '30.31.32.33',
            defaultEnabled: [],
            appliesToRoles: [
                EzUserRole.ROLE_EMPLOYEE,
                EzUserRole.ROLE_MANAGER,
                EzUserRole.ROLE_PAYROLL_MANAGER
            ]
        };
    }

    /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    | ezClocker Webiste and Mobile Application Permissions
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
    /**
        @deprecated
        Switch to using DISALLOW_EMPLOYEE_MOBILE_TIMEENTRY instead.
        @static @readonly @property
        Legacy permission, only used on mobile devices that had enabled pin numbers. Moved to using
        DISALLOW_EMPLOYEE_MOBILE_TIMEENTRY and  DISALLOW_EMPLOYEE_WEB_TIMEENTRY to have specific options
        for mobile and web.
        @returns {string}
     */
    static get DISALLOW_EMPLOYEE_TIMEENTRY() {
        return 'DISALLOW_EMPLOYEE_TIMEENTRY';
    }
    static get _DISALLOW_EMPLOYEE_TIMEENTRY() {
        return {
            displayName: 'Do not allow employee to clock in or out using the ezClocker mobile apps.',
            childRestrictions: [
                EzUserPermissionType.DISALLOW_MOBILE_CLOCK_IN,
                EzUserPermissionType.DISALLOW_MOBILE_CLOCK_OUT,
                EzUserPermissionType.DISALLOW_MOBILE_EDIT_TIMEENTRY,
                EzUserPermissionType.DISALLW_MOBILE_ADD_TIMEENTRY
            ],
            defaultValue: '20.21.22.23',
            defaultEnabled: [],
            appliesToRoles: [
                EzUserRole.ROLE_EMPLOYEE,
                EzUserRole.ROLE_MANAGER,
                EzUserRole.ROLE_PAYROLL_MANAGER
            ]
        };
    }

    static get DISALLOW_VIEW_OTHER_EMPLOYEE_PAYRATE() {
        return 'DISALLOW_VIEW_OTHER_EMPLOYEE_PAYRATE';
    }
    static get _DISALLOW_VIEW_EMPLOYEE_PAYRATE() {
        return {
            displayName: 'Do not allow the employee to view other employee\'s pay rates.',
            childRestrictions: [],
            defaultValue: '50',
            defaultEnabled: [
                EzUserRole.ROLE_EMPLOYEE,
                EzUserRole.ROLE_MANAGER
            ],
            appliesToRoles: [
                EzUserRole.ROLE_EMPLOYEE,
                EzUserRole.ROLE_MANAGER,
                EzUserRole.ROLE_PAYROLL_MANAGER
            ]
        };
    }

    static get DISALLOW_EXPORT_EMPLOYER_TIME_SHEETS() {
        return 'DISALLOW_EXPORT_EMPLOYER_TIME_SHEETS';
    }
    static get _DISALLOW_EXPORT_TIME_SHEETS() {
        return {
            displayName: 'Do not allow the employee to use the employer\'s Export Time Sheets feature.',
            childRestrictions: [],
            defaultValue: '60',
            defaultEnabled: [
                EzUserRole.ROLE_EMPLOYEE,
                EzUserRole.ROLE_MANAGER
            ],
            appliesToRoles: [
                EzUserRole.ROLE_EMPLOYEE,
                EzUserRole.ROLE_MANAGER,
                EzUserRole.ROLE_PAYROLL_MANAGER
            ]
        };
    }

    static get DISALLOW_VIEW_OTHER_EMPLOYEE_PAY_INFO() {
        return 'DISALLOW_VIEW_OTHER_EMPLOYEE_PAY_INFO';
    }
    static get _DISALLOW_VIEW_OTHER_EMPLOYEE_PAY_INFO() {
        return {
            displayName: 'Do not allow employee to view another employee\'s pay rate or time entry reports.',
            childRestrictions: [
                EzUserPermissionType.DISALLOW_VIEW_OTHER_EMPLOYEE_PAYRATE,
                EzUserPermissionType.DISALLOW_EXPORT_EMPLOYER_TIME_SHEETS
            ],
            defaultValue: '50.60',
            defaultEnabled: [
                EzUserRole.ROLE_EMPLOYEE,
                EzUserRole.ROLE_MANAGER
            ],
            appliesToRoles: [
                EzUserRole.ROLE_EMPLOYEE,
                EzUserRole.ROLE_MANAGER,
                EzUserRole.ROLE_PAYROLL_MANAGER
            ]
        };
    }

    /**
        @static @public
        Returns the description for the user permission associated with the provided
        EzUserPermissionId enum value.
        @param {string} enumValue
        @returns {string}
     */
    static ezGetPermissionIdDisplayName(enumValue) {
        return EzUserPermissionType[`_${enumValue}`]['displayName'];
    }

    /**
        @static @public
        Returns the child permissions that support the user permission associated with the
        the provided EzUserPermissionId enumeration value.
        @param {string} ezUserPermissionIdEnumValue
        EzUserPermissionType enum value for the user permission id
        @returns {array}
        An array of EzUserPermissionType enumeration values for permission id (if any)
     */
    static ezGetPermissionIdChildRestrictions(enumValue) {
        return EzUserPermissionType[`_${enumValue}`]['childRestrictions'];
    }

    /**
        @static @public
        Returns the default permission value of the user permission
        for the provided ezUserPermissionId enumeration value.
        @param {string} ezUserPermissionIdEnumValue
        EzUserPermissionType enum value for the user permission id
        @returns {string}
     */
    static ezGetPermissionIdDefaultValue(enumValue) {
        return EzUserPermissionType[`_${enumValue}`]['defaultValue'];
    }

    /**
        @static @public
        Returns an array of the roles that the user permission for the provied ezUserPermissionIdEnumValue
        is enabled by default on.
        @param {string} ezUserPermissionIdEnumValue
        @returns {array}
        An array of EzUserRole enumeration values (as strings).
     */
    static ezGetPermissionIdDefaultEnabled(enumValue) {
        return EzUserPermissionType[`_${enumValue}`]['defaultEnabled'];
    }

    /**
        @static @public
        Returns an array of the roles that the user permission for the provied ezUserPermissionIdEnumValue
        applies to.
        @param {string} ezUserPermissionIdEnumValue
        @returns {array}
        An array of EzUserRole enumeration values (as strings).
     */
    static ezGetPermissionIdAppliesToRoles(enumValue) {
        return EzUserPermissionType[`_${enumValue}`]['appliesToRoles'];
    }

    /**
        @static @public
        Determines if the provided enumeration value of a permissionId applies to the
        provided EzUserRole enume value.
        @param {string} ezUserPermissionIdEnumValue
        EzUserPermissionType enumeration value
        @param {string} ezUserRoleEnumValue
        EzUserRole enumeration value
        @returns {boolean}
     */
    static isUserPermissionIdEnabledByDefaultForUserRole(ezUserPermissionIdEnumValue, ezUserRoleEnumValue) {
        let appliesToRoles = EzUserPermissionType.ezGetPermissionIdDefaultEnabled(ezUserPermissionIdEnumValue);

        return ezApi.ezArrayHasLength(appliesToRoles) &&
            0 >= appliesToRoles.indexOf(ezUserRoleEnumValue);
    }

    /**
        @static @public
        Determines if the provided EzUserPermissionType permission id value applies to any of the
        provided EzUserRole enume values.
        @param {string} ezUserPermissionIdEnumValue
        EzUserPermissionType enumeration value
        @param {array} ezUserRoleEnumValues
        EzUserRole enumeration value
        @returns {boolean}
     */
    static isUserPermissionIdEnabledByDefaultForAtLeastOneUserRole(ezUserPermissionIdEnumValue, ezUserRoleEnumValues) {
        if (!ezApi.ezArrayHasLength(ezUserRoleEnumValues)) {
            return false;
        }

        for (let ezUserRole of ezUserRoleEnumValues) {
            if (EzUserPermissionType.isUserPermissionIdEnabledByDefaultForUserRole(
                ezUserPermissionIdEnumValue,
                ezUserRole)) {
                return true;
            }
        }

        return false;
    }

    /**
        @static @public
        Determines if the provided EzUserPermissionType permission id value applies to the
        provided EzUserRole enume value.
        @param {string} ezUserPermissionIdEnumValue
        EzUserPermissionType enumeration value
        @param {string} ezUserRoleEnumValue
        EzUserRole enumeration value
        @returns {boolean}
     */
    static doesUserPermissionIdApplyToUserRole(ezUserPermissionIdEnumValue, ezUserRoleEnumValue) {
        let appliesToRoles = EzUserPermissionType.ezInstance.ezGetAppliesToRole(ezUserPermissionIdEnumValue);

        return ezApi.ezArrayHasLength(appliesToRoles) &&
            0 >= appliesToRoles.indexOf(ezUserRoleEnumValue);
    }

    static ezInstance = null;

    static ezApiRegistrationState = null;

    static ezApiName = 'EzUserPermissionType';

    static ezEventNames = {
        onReady: 'ezOn_EzUserPermissionType_Ready'
    };

    static ezCanRegister() {
        return 'PENDING' === EzUserPermissionType.ezApiRegistrationState &&
            Object.prototype.hasOwnProperty.call(globalThis, 'ezApi') &&
            globalThis.ezApi && globalThis.ezApi.ready &&

            globalThis.ezApi.ezclocker[EzUserRole.ezApiName] &&
            globalThis.ezApi.ezclocker[EzUserRole.ezApiName].ready;
    }

    static ezRegistrator() {
        if (!EzUserPermissionType.ezCanRegister()) {
            return false;
        }
        EzUserPermissionType.ezInstance = ezApi.ezRegisterEnumeration(EzUserPermissionType);
        EzUserPermissionType.ezApiRegistrationState = 'REGISTERED';
        return true;
    }

    static {
        if (null == this.ezApiRegistrationState) {
            this.ezApiRegistrationState = 'PENDING';

            if (!this.ezRegistrator()) {
                document.addEventListener(
                    'onEzApiReady',
                    this.ezRegistrator);

                document.addEventListener(
                    EzUserRole.ezEventNames.onReady,
                    this.ezRegistrator);
            }
        }
    }
}
