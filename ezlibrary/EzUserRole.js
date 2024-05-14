import { EzEnum } from '/ezlibrary/enums/EzEnum.js';
import { EzClockerRole } from '/ezlibrary/EzClockerRole.js';

// TODO: Switch EzUserRole class to extend EzEnumeration2 after all ezApi.ezclocker.ezUserRole or ezAp.ezclocker.enums.ezUserRole references migraded to EzUserRole

/**
    @class
    @extends {EzEnum}
    @description
    Creates a new instance of the EzUserRole enumeration.
    ---------------------------------------------------------------------
    Import into other non-enumeration classes with:
        import {
            // ... other enumerations ...
            EzUserRole
        } from '/ezlibrary/enums/EzEnumerations.js';
    ---------------------------------------------------------------------
    Import into other enumeration classes with:
        import { EzUserRole } from '/ezlibrary/EzUserRole.js';
    ---------------------------------------------------------------------
 */
export class EzUserRole extends EzEnum {
    /**
        Authority unknown, null, not set, not specified
     */
    static get UNKNOWN() {
        return 'UNKNOWN';
    }
    static get _UNKNOWN() {
        return {
            ezClockerRole: new EzClockerRole(
                '',
                'Unknown',
                'Role is unknown.',
                false,
                'unknown')
        };
    }
    /**
        No authorities
     */
    static get NONE() {
        return 'NONE';
    }
    static get _NONE() {
        return {
            ezClockerRole: new EzClockerRole(
                '',
                'None',
                [
                    'Read access to ezClocker unsecured public website pages.',
                    'Read acess to the ezClocker Blog Website',
                    'No access to Employer Dashboard website page.',
                    'No access to Employer Schedules website page.',
                    'No access to Employer Archive website page.',
                    'No access to Employer Account website page.',
                    'No access to the Employee Dashboard website page.',
                    'No access to the Employee Schedule website page.',
                    'No access to the Personal Dashboard website page',
                    'No access to the Developer Account website page.',
                    'No access to the Administration Portal website page.',
                    'No access to the Employer mobile app.',
                    'No access to the Employee mobile app.',
                    'No access to the Personal mobile app.'
                ],
                false,
                'none')
        };
    }
    /**
        Administrator authority Internal Only
     */
    static get ROLE_ADMIN() {
        return 'ROLE_ADMIN';
    }
    static get _ROLE_ADMIN() {
        return {
            ezClockerRole: new EzClockerRole(
                EzUserRole.ROLE_ADMIN,
                'Administrator',
                [
                    'Read access to ezClocker unsecured public website pages.',
                    'Read acess to the ezClocker Blog Website',
                    'Full access to Employer Dashboard website page.',
                    'Full access to Employer Schedules website page.',
                    'Full access to Employer Archive website page.',
                    'Full access to Employer Account website page.',
                    'Full access to the Employee Dashboard website page.',
                    'Full access to the Employee Schedule website page.',
                    'Full access to the Personal Dashboard website page',
                    'Full access to the Developer Account website page.',
                    'Full access to the Administration Portal website page.',
                    'Full access to the Employer mobile app.',
                    'Full access to the Employee mobile app.',
                    'Full access to the Personal mobile app.'
                ],
                true,
                'administrator')
        };
    }
    /**
        ezClocker Support Authority Internal Only
     */
    static get ROLE_EZCLOCKER_SUPPORT() {
        return 'ROLE_EZCLOCKER_SUPPORT';
    }
    static get _ROLE_EZCLOCKER_SUPPORT() {
        return {
            ezClockerRole: new EzClockerRole(
                EzUserRole.ROLE_EZCLOCKER_SUPPORT,
                'ezClocker Support',
                [
                    'Read access to ezClocker unsecured public website pages.',
                    'Read acess to the ezClocker Blog Website',
                    'Full access to Employer Dashboard website page.',
                    'Full access to Employer Schedules website page.',
                    'Full access to Employer Archive website page.',
                    'Restricted access to Employer Account website page.',
                    '   Cannot view account payment information.',
                    '   Cannot edit or modify account information.',
                    '   Cannot subscribe.',
                    '   Cannot change subscription plans.',
                    '   Cannot cancel subscription plans.',
                    'Full access to the Employee Dashboard website page.',
                    'Full access to the Employee Schedule website page.',
                    'Full access to the Personal Dashboard website page',
                    'Full access to the Developer Account website page.',
                    'Restricted access to the Administration Portal website page.',
                    'Full access to the Employer mobile app.',
                    'Full access to the Employee mobile app.',
                    'Full access to the Personal mobile app.'
                ],
                true,
                'support')
        };
    }
    /**
        Developer authority
     */
    static get ROLE_DEVELOPER() {
        return 'ROLE_DEVELOPER';
    }
    static get _ROLE_DEVELOPER() {
        return {
            ezClockerRole: new EzClockerRole(
                EzUserRole.ROLE_DEVELOPER,
                'ezClocker Developer',
                [
                    'Read access to ezClocker unsecured public website pages.',
                    'Read acess to the ezClocker Blog Website',
                    'Full access to ezClocker\'s Developer Account website page.',
                    'Restricted access to ezClocker\'s Developer Account API.',
                    '   Access requires approval from ezClocker Developer Team.',
                    '   Access requires a valid developer authentication token.',
                    'Restricted access to ezClocker\'s Employer API.',
                    '   Access requires employer approval of developer account.',
                    '   Access requires a valid ezClocker approved developer account.',
                    '   Access requires authentication of an existing employer.',
                    '   Access requires a valid employer authentication token.',
                    'Restricted access to ezClocker\'s Employee API.',
                    '   Access requires employer approval of developer account.',
                    '   Access requires a valid ezClocker approved developer account.',
                    '   Access requires authentication of an exiting employee.',
                    '   Access requires a valid employee authentication token.',
                    'No access to the ezClocker Administration Portal website'
                ],
                false,
                'developer')
        };
    }
    /**
        Employer authority
     */
    static get ROLE_EMPLOYER() {
        return 'ROLE_EMPLOYER';
    }
    static get _ROLE_EMPLOYER() {
        return {
            ezClockerRole: new EzClockerRole(
                EzUserRole.ROLE_EMPLOYER,
                'Employee',
                [
                    'Read access to ezClocker unsecured public website pages.',
                    'Read acess to the ezClocker Blog Website',
                    'Full access to the Employer Dashboard website page.',
                    'Full access to the Employer Schedules website page.',
                    'Full access to the Employee Archive website page.',
                    'Full access to the Employer Account website page.',
                    'Full access to the ezClocker Employer mobile app',
                    'No access to the ezClocker Employee mobile app.',
                    'No access to the ezClocker Developer Account website page.',
                    'No access to the ezClocker Administration Portal website',
                ],
                false,
                'employer')
        };
    }
    /**
        Payroll manager authority
     */
    static get ROLE_PAYROLL_MANAGER() {
        return 'ROLE_PAYROLL_MANAGER';
    }
    static get _ROLE_PAYROLL_MANAGER() {
        return {
            ezClockerRole: new EzClockerRole(
                EzUserRole.ROLE_PAYROLL_MANAGER,
                'Payroll Manager',
                [
                    'Read access to ezClocker unsecured public website pages.',
                    'Read acess to the ezClocker Blog Website',
                    'Full access to the Employer Dashboard website page.',
                    'Full access to the Employer\'s Schedules website page.',
                    'Full access to the Employer\'s Employee Archive website page.',
                    'No access to the Employer\'s Account website page.',
                    'Full access to the ezClocker Employer mobile app',
                    'Full access to the ezClocker Employee mobile app',
                    'No access to the ezClocker Developer Account website page.',
                    'No access to the ezClocker Administration Portal website',
                ],
                false,
                'payroll_manager')
        };
    }
    /**
        Manager authority
     */
    static get ROLE_MANAGER() {
        return 'ROLE_MANAGER';
    }
    static get _ROLE_MANAGER() {
        return {
            ezClockerRole: new EzClockerRole(
                EzUserRole.ROLE_MANAGER,
                'Manager',
                [
                    'Read access to ezClocker unsecured public website pages.',
                    'Read acess to the ezClocker Blog Website',
                    'Restricted access to the Employer Dashboard website page.',
                    '   Cannot see another employe\'s pay rate.',
                    '   Cannot export time sheets.',
                    'Full access to the Employer\'s Schedules website page.',
                    'Full access to the Employer\'s Employee Archive website page.',
                    'No access to the Employer\'s Account website page.',
                    'Full access to the ezClocker Employer mobile app',
                    'Full access to the ezClocker Employee mobile app (for themselves)',
                    'No access to the ezClocker Developer Account website page.',
                    'No access to the ezClocker Administration Portal website',
                ],
                false,
                'manager')
        };
    }
    /**
        Employee authority
     */
    static get ROLE_EMPLOYEE() {
        return 'ROLE_EMPLOYEE';
    }
    static get _ROLE_EMPLOYEE() {
        return {
            ezClockerRole: new EzClockerRole(
                EzUserRole.ROLE_EMPLOYEE,
                'Employee',
                [
                    'Read access to ezClocker unsecured public website pages.',
                    'Read acess to the ezClocker Blog Website',
                    'Full access to the ezClocker Employee Dashboard website page.',
                    'Full access to the ezClocker Employee Schedule website page.',
                    'Full access to the ezClocker Employee mobile app.',
                    'No access to the Employer\'s Dashboard website page',
                    'No access to the Employer\'s Schedules website page',
                    'No access to the Employer\'s Archive Employee website page',
                    'No access to the Employer\'s Account website page.',
                    'No access to the ezClocker Developer Account website page.',
                    'No access to the ezClocker Administration Portal website'
                ],
                false,
                'employee')
        };
    }
    /**
        Personal authority.
     */
    static get ROLE_PERSONAL() {
        return 'ROLE_PERSONAL';
    }
    static get _ROLE_PERSONAL() {
        return {
            ezClockerRole: new EzClockerRole(
                EzUserRole.ROLE_PERSONAL,
                'Personal',
                [
                    'Read access to ezClocker unsecured public website pages.',
                    'Read acess to the ezClocker Blog Website',
                    'Full access to the ezClocker Personal Dashboard website page.',
                    'Full access to the ezClocker Personal mobile app.',
                    'No access to the ezClocker Employer Dashboard website page',
                    'No access to the ezClocker Employer Schedules website page',
                    'No access to the ezClocker Employee Archive website page',
                    'No access to the ezClocker Employer Account website page.',
                    'No access to the ezClocker Developer Account website page.',
                    'No access to the ezClocker Administration Portal website',
                    'No access to the ezClocker Employer mobile app.'
                ],
                false,
                'personal')
        };
    }

    /**
        @public @static @method
        Returns the RoleName for the provided enumValue
        @param {String} enumValue
        @returns {String}
     */
    static ezToRoleName(enumValue) {
        if (!ezApi.ezStringHasLength(enumValue)) {
            return EzUserRole._UNKNOWN.ezClockerRole.roleName;
        }

        let extPropName = `_${enumValue}`;
        return ezApi.ezHasOwnProperty(EzUserRole, extPropName)
            ? EzUserRole[extPropName].ezClockerRole.roleName
            : EzUserRole._UNKNOWN.ezClockerRole.roleName;
    }
    /**
        @public @static @method
        Returns the role name for the provided authority role.
        @param {String} enumValue
        @returns {String}
        @deprecated
        Migrate to: EzUserRole.ezToRoleName();
     */
    static ezAuthorityNameToRoleName(enumValue) {
        return EzUserRole.ezToRoleName(enumValue);
    }
    /**
        @public @static @method
        Returns the legacy AccountType value for the provided enumValue
        @param {String} enumValue
        @returns {String}
     */
    static ezToLegacyAccountType(enumValue) {
        if (!ezApi.ezIsString(enumValue)) {
            return EzUserRole._UNKNOWN.ezClockerRole.legacyAccountType;
        }

        let extPropName = `_${enumValue}`;
        return ezApi.ezHasOwnProperty(EzUserRole, extPropName)
            ? EzUserRole[extPropName].ezClockerRole.legacyAccountType
            : EzUserRole._UNKNOWN.ezClockerRole.legacyAccountType;
    }
    /**
        @public @static @method
        @deprecated
        Migrate to EzUserRole.ezToRoleName()
     */
    static ezAuthorityNameToAccountType(enumValue) {
        return EzUserRole.ezToLegacyAccountType(enumValue);
    }

    static ezApiName = 'EzUserRole';
    static ezEventNames = {
        onReady: 'ezOn_EzUserRole_Ready'
    };
    static ezInstance = null;
    static ezApiRegistrationState = null;
    static ezCanRegister() {
        return 'PENDING' === EzUserRole.ezApiRegistrationState &&
            Object.prototype.hasOwnProperty.call(globalThis, 'ezApi') &&
            globalThis['ezApi'] && globalThis['ezApi'].ready;
    }
    static ezRegistrator() {
        if (EzUserRole.ezCanRegister()) {
            EzUserRole.ezInstance = ezApi.ezRegisterEnumeration(EzUserRole);

            EzUserRole.ezApiRegistrationState = 'REGISTERED';
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
