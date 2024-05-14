import { EzEnum } from '/ezlibrary/enums/EzEnum.js';

/**
    Defines the type of schedule viewing modes avaialble
 */
class EzScheduleViewMode extends EzEnum {
    static get DAY() {
        return 'DAY';
    }
    static get WEEK() {
        return 'WEEK';
    }
    static get MONTH() {
        return 'MONTH';
    }

    static ezApiName = 'EzScheduleViewMode';
    static ezInstance = null;
    static ezApiRegistrationState = null;
    static ezCanRegister() {
        return 'PENDING' === EzScheduleViewMode.ezApiRegistrationState &&
            Object.prototype.hasOwnProperty.call(globalThis, 'ezApi') &&
            globalThis['ezApi'] && globalThis['ezApi'].ready;
    }
    static ezRegistrator() {
        if (EzScheduleViewMode.ezCanRegister()) {
            EzScheduleViewMode.ezInstance = ezApi.ezRegisterEnumeration(EzScheduleViewMode);

            EzScheduleViewMode.ezApiRegistrationState = 'REGISTERED';
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
    EzScheduleViewMode
};