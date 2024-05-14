import { EzEnum } from '/ezlibrary/enums/EzEnum.js';

/**
    Javascript Enumeration for EzClockerPayRateType.java
    Import with
        import { EzClockerPayRateType } from '/secure/integrations/EzClockerPayRateType.js';
 */
class EzClockerPayRateType extends EzEnum {
    static get UNKNOWN() {
        return 'UNKNOWN';
    }
    static get _UNKNOWN() {
        return {
            display: 'UNKNOWN'
        };
    }
    static get REGULAR() {
        return 'REGULAR';
    }
    static get _REGULAR() {
        return {
            display: 'Regular'
        };
    }
    static get OVERTIME() {
        return 'OVERTIME';
    }
    static get _OVERTIME() {
        return {
            display: 'Overtime'
        };
    }
    static get DOUBLE_OVERTIME() {
        return 'DOUBLE_OVERTIME';
    }
    static get _DOUBLE_OVERTIME() {
        return {
            display: 'Double Overtime'
        };
    }
    static get PTO() {
        return 'PTO';
    }
    static get _PTO() {
        return {
            display: 'Paid Time Off (PTO)'
        };
    }
    static get PAID_PTO() {
        return 'PAID_PTO';
    }
    static get _PAID_PTO() {
        return {
            display: 'Paid Time Off (PTO)'
        };
    }
    static get HOLIDAY() {
        return 'HOLIDAY';
    }
    static get _HOLIDAY() {
        return {
            display: 'Holiday Time'
        };
    }
    static get PAID_HOLIDAY() {
        return 'PAID_HOLIDAY';
    }
    static get _PAID_HOLIDAY() {
        return {
            display: 'Holiday Time'
        };
    }
    static get SICK() {
        return 'SICK';
    }
    static get _SICK() {
        return {
            display: 'Sick Time'
        };
    }
    static get PAID_SICK() {
        return 'PAID_SICK';
    }
    static get _PAID_SICK() {
        return {
            display: 'Sick Time'
        };
    }
    static get UNPAID() {
        return 'UNPAID';
    }
    static get _UNPAID() {
        return {
            display: 'Unpaid'
        };
    }

    static get ezKeys() {
        return [
            EzClockerPayRateType.REGULAR,
            EzClockerPayRateType.OVERTIME,
            EzClockerPayRateType.DOUBLE_OVERTIME,
            EzClockerPayRateType.PTO,
            EzClockerPayRateType.PAID_PTO,
            EzClockerPayRateType.PAID_SICK,
            EzClockerPayRateType.HOLIDAY,
            EzClockerPayRateType.PAID_HOLIDAY,
            EzClockerPayRateType.SICK,
            EzClockerPayRateType.UNPAID
        ];
    }

    static ezToDisplayName(enumValue) {
        return EzClockerPayRateType[`_${enumValue.toUpperCase()}`]['display'];
    }
    static ezToDisplayValue(enumValue) {
        return EzClockerPayRateType[`_${enumValue.toUpperCase()}`]['display'];
    }

    static ezApiName = 'EzClockerPayRateType';
    static ezEventNames = {
        onReady: 'ezOn_EzClockerPayRateType_Ready'
    };
    static ezInstance = null;
    static ezApiRegistrationState = null;
    static ezCanRegister() {
        return 'PENDING' === EzClockerPayRateType.ezApiRegistrationState &&
            Object.prototype.hasOwnProperty.call(globalThis, 'ezApi') &&
            globalThis['ezApi'] && globalThis['ezApi'].ready;
    }
    static ezRegistrator() {
        if (EzClockerPayRateType.ezCanRegister()) {
            EzClockerPayRateType.ezInstance = ezApi.ezRegisterEnumeration(EzClockerPayRateType);

            EzClockerPayRateType.ezApiRegistrationState = 'REGISTERED';
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
    EzClockerPayRateType
};