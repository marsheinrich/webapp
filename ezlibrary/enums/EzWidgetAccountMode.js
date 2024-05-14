import { EzEnum } from '/ezlibrary/enums/EzEnum.js';

import { EzUserRole } from '/ezlibrary/EzUserRole.js';

/**
    Represents the account mode of a widget to help in toggling account specific features
    Import with:
        import { EzWidgetAccountMode } from '/ezlibrary/enums/EzWidgetAccountMode.js';
 */
class EzWidgetAccountMode extends EzEnum {
    static get UNKNOWN() {
        return 'UNKNOWN';
    }
    static get _UNKNOWN() {
        return {
            ezUserRoles: []
        };
    }
    static get ADMIN() {
        return 'ADMIN';
    }
    static get _ADMIN() {
        return {
            ezUserRoles: [
                EzUserRole.ROLE_ADMIN
            ]
        };
    }
    static get EMPLOYER() {
        return 'EMPLOYER';
    }
    static get _EMPLOYER() {
        return {
            ezUserRoles: [
                EzUserRole.ROLE_EMPLOYER
            ]
        };
    }
    static get PERSONAL() {
        return 'PERSONAL';
    }
    static get _PERSONAL() {
        return {
            ezUserRoles: [
                EzUserRole.ROLE_PERSONAL,
                EzUserRole.ROLE_EMPLOYEE
            ]
        };
    }
    static get MANAGER() {
        return 'MANAGER';
    }
    static get _MANAGER() {
        return {
            ezUserRoles: [
                EzUserRole.ROLE_MANAGER,
                EzUserRole.ROLE_EMPLOYEE
            ]
        };
    }
    static get EMPLOYEE() {
        return 'EMPLOYEE';
    }
    static get _EMPLOYEE() {
        return {
            ezUserRoles: [
                EzUserRole.ROLE_EMPLOYEE
            ]
        };
    }
    static get SUPPORT() {
        return 'SUPPORT';
    }
    static get _SUPPORT() {
        return {
            ezUserRoles: [
                EzUserRole.ROLE_EZCLOCKER_SUPPORT
            ]
        };
    }

    static ezToEzUserRoles(enumValue) {
        return EzWidgetAccountMode[`_${enumValue.toUpperCase()}`]['ezUserRoles'];
    }

    static ezApiName = 'EzWidgetAccountMode';
    static ezInstance = null;
    static ezApiRegistrationState = null;
    static ezCanRegister() {
        return 'PENDING' === EzWidgetAccountMode.ezApiRegistrationState &&
            Object.prototype.hasOwnProperty.call(globalThis, 'ezApi') &&
            globalThis['ezApi'] && globalThis['ezApi'].ready;
    }
    static ezRegistrator() {
        if (EzWidgetAccountMode.ezCanRegister()) {
            EzWidgetAccountMode.ezInstance = ezApi.ezRegisterEnumeration(EzWidgetAccountMode);

            EzWidgetAccountMode.ezApiRegistrationState = 'REGISTERED';
        }
    }
    // Static Constructor
    static {
        if (null == EzWidgetAccountMode.ezApiRegistrationState) {
            EzWidgetAccountMode.ezApiRegistrationState = 'PENDING';

            document.addEventListener(
                'onEzApiReady',
                EzWidgetAccountMode.ezRegistrator);
        }
    }

    constructor() {
        super();
    }
}

export {
    EzWidgetAccountMode
};
