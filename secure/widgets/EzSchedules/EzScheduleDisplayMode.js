import { EzEnum } from '/ezlibrary/enums/EzEnum.js';

/**
    Defines the available display modes for schedules
 */
class EzScheduleDisplayMode extends EzEnum {
    static get UNKNOWN() {
        return 'UNKNOWN';
    }
    static get EMPLOYER() {
        return 'EMPLOYER';
    }
    static get EMPLOYEE() {
        return 'EMPLOYEE';
    }
    static get MANAGER() {
        return 'MANAGER';
    }

    static ezApiName = 'EzScheduleDisplayMode';
    static ezInstance = null;
    static ezApiRegistrationState = null;
    static ezCanRegister() {
        return 'PENDING' === EzScheduleDisplayMode.ezApiRegistrationState &&
            Object.prototype.hasOwnProperty.call(globalThis, 'ezApi') &&
            globalThis['ezApi'] && globalThis['ezApi'].ready;
    }
    static ezRegistrator() {
        if (EzScheduleDisplayMode.ezCanRegister()) {
            EzScheduleDisplayMode.ezInstance = ezApi.ezRegisterEnumeration(EzScheduleDisplayMode);

            EzScheduleDisplayMode.ezApiRegistrationState = 'REGISTERED';
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
    EzScheduleDisplayMode
};