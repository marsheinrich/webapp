import { EzEnum } from '/ezlibrary/enums/EzEnum.js';

/**
    Represents the names of the roles accounts may have.
 */
class EzAccountRole extends EzEnum {
    /** @public @static @property */
    static get UNKNOWN() {
        return 'UNKNOWN';
    }
    /** @public @static @property */
    static get ROLE_EMPLOYER() {
        return 'ROLE_EMPLOYER';
    }
    /** @public @static @property */
    static get ROLE_MANAGER() {
        return 'ROLE_MANAGER';
    }
    /** @public @static @property */
    static get ROLE_EMPLOYEE() {
        return 'ROLE_EMPLOYEE';
    }
    /** @public @static @property */
    static get ROLE_PERSONAL() {
        return 'ROLE_PERSONAL';
    }

    /** @public @static */
    static ezApiName = 'EzClockerContextEventName';
    /** @public @static */
    static ezInstance = null;
    /** @public @static */
    static ezApiRegistrationState = null;
    /** @public @static @method */
    static ezCanRegister() {
        return 'PENDING' === EzAccountRole.ezApiRegistrationState &&
            Object.prototype.hasOwnProperty.call(globalThis, 'ezApi') &&
            globalThis['ezApi'] && globalThis['ezApi'].ready;
    }
    /** @public @static @method */
    static ezRegistrator() {
        if (EzAccountRole.ezCanRegister()) {
            EzAccountRole.ezInstance = ezApi.ezRegisterEzEnum(
                EzAccountRole,
                EzAccountRole.ezApiName);

            EzAccountRole.ezApiRegistrationState = 'REGISTERED';
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

    /** @public @constructor */
    constructor() {
        super();
    }

    get _UNKNOWN() {
        return {
            display: 'UNKNOWN',
        };
    }
    get _ERROR_UNSUPPORTED() {
        return {
            display: 'Employer',
        };
    }
    get _WARNING() {
        return {
            display: 'Manager',
        };
    }
    get _ROLE_EMPLOYEE() {
        return {
            display: 'Employee',
        };
    }
    get _ROLE_PERSONAL() {
        return {
            display: 'Personal',
        };
    }
}

export {
    EzAccountRole
};