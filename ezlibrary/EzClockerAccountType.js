import { EzEnum } from '/ezlibrary/enums/EzEnum.js';

/**
    Defines the display value, account type name, and account level for ezClocker's account types.
    Import with:
        import { EzClockerAccountType } from '/ezlibrary/EzClockerAccountType.js';
 */
export class EzClockerAccountType extends EzEnum {
    static get ADMIN() {
        return 'ADMIN';
    }
    static get _ADMIN() {
        return {
            value: EzClockerAccountType.ADMIN,
            display: 'Admin',
            accountTypeName: 'admin',
            accountLevel: 1
        };
    }

    static get SUPPORT() {
        return 'SUPPORT';
    }
    static get _SUPPORT() {
        return {
            value: EzClockerAccountType.SUPPORT,
            display: 'Support',
            accountTypeName: 'support',
            accountLevel: 2
        };
    }

    static get DEVELOPER() {
        return 'DEVELOPER';
    }
    static get _DEVELOPER() {
        return {
            value: EzClockerAccountType.DEVELOPER,
            display: 'Developer',
            accountTypeName: 'developer',
            accountLevel: 3
        };
    }

    static get EMPLOYER() {
        return 'EMPLOYER';
    }
    static get _EMPLOYER() {
        return {
            value: EzClockerAccountType.EMPLOYER,
            display: 'Employer',
            accountTypeName: 'employer',
            accountLevel: 4
        };
    }

    static get MANAGER() {
        return 'MANAGER';
    }
    static get _MANAGER() {
        return {
            value: EzClockerAccountType.MANAGER,
            display: 'Manager',
            accountTypeName: 'manager',
            accountLevel: 5
        };
    }

    static get MANAGER_AS_EMPLOYER() {
        return 'MANAGER_AS_EMPLOYER';
    }
    static get _MANAGER_AS_EMPLOYER() {
        return EzClockerAccountType._MANAGER;
    }

    static get PAYROLL_MANAGER() {
        return 'PAYROLL_MANAGER';
    }
    static get _PAYROLL_MANAGER() {
        return {
            value: EzClockerAccountType.PAYROLL_MANAGER,
            display: 'Payroll Manager',
            accountTypeName: 'payroll_manager',
            accountLevel: 5
        };
    }

    static get PAYROLL_MANAGER_AS_EMPLOYER() {
        return 'PAYROLL_MANAGER_AS_EMPLOYER';
    }
    static get _PAYROLL_MANAGER_AS_EMPLOYER() {
        return EzClockerAccountType._PAYROLL_MANAGER;
    }

    static get EMPLOYEE() {
        return 'EMPLOYEE';
    }
    static get _EMPLOYEE() {
        return {
            value: EzClockerAccountType.EMPLOYEE,
            display: 'Employee',
            accountTypeName: 'employee',
            accountLevel: 6
        };
    }

    static get PERSONAL() {
        return 'PERSONAL';
    }
    static get _PERSONAL() {
        return {
            value: EzClockerAccountType.PERSONAL,
            display: 'Personal',
            accountTypeName: 'personal',
            accountLevel: 7
        };
    }

    /** @static @public */
    static ezToDisplayName(enumValue) {
        return EzClockerAccountType[`_${enumValue.toUpperCase()}`]()['display'];
    }

    /** @static @public */
    static ezToAccountTypeName(enumValue) {
        return EzClockerAccountType[`_${enumValue.toUpperCase()}`]()['accountTypeName'];
    }

    /** @static @public */
    static ezToAccountLevel(enumValue) {
        return EzClockerAccountType[`_${enumValue.toUpperCase()}`]()['accountTypeName'];
    }

    /** @static @public */
    static ezApiName = 'EzClockerAccountType';

    /** @static @public */
    static ezInstance = null;

    /** @static @public */
    static ezApiRegistrationState = null;

    /** @static @private */
    static ezCanRegister() {
        return 'PENDING' === EzClockerAccountType.ezApiRegistrationState &&
            Object.prototype.hasOwnProperty.call(globalThis, 'ezApi') &&
            globalThis['ezApi'] && globalThis['ezApi'].ready;
    }

    /** @static @public */
    static ezRegistrator() {
        if (!EzClockerAccountType.ezCanRegister()) {
            return false;
        }

        ezApi.ezRegisterEnumeration(EzClockerAccountType);
        EzClockerAccountType.ezApiRegistrationState = 'REGISTERED';
        return true;
    }

    static {
        if (null == EzClockerAccountType.ezApiRegistrationState) {
            EzClockerAccountType.ezApiRegistrationState = 'PENDING';

            document.addEventListener(
                'onEzApiReady',
                EzClockerAccountType.ezRegistrator);
        }
    }

    constructor() {
        super();
    }
}