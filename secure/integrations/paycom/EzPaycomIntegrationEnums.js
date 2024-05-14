import { EzEnum } from '/ezlibrary/enums/EzEnum.js';

/**
    @public
    Enumeration for EzPaycomIntegrationPayRateType
 */
class EzPaycomIntegrationPayRateType extends EzEnum {
    static get REGULAR() {
        return 'Regular';
    }
    static get OVERTIME() {
        return 'Overtime';
    }
    static get DOUBLEOVERTIME() {
        return 'Double Overtime';
    }

    static get ezPayRateTypeList() {
        return [
            {
                key: 'REGULAR',
                value: 'Regular'
            },
            {
                key: 'OVERTIME',
                value: 'Overtime'
            },
            {
                key: 'DOUBLEOVERTIME',
                value: 'Overtime'
            }
        ];
    }

    static ezApiName = 'EzPaycomIntegrationPayRateType';
    static ezInstance = null;
    static ezApiRegistrationState = null;
    static ezCanRegister() {
        return 'PENDING' === EzPaycomIntegrationPayRateType.ezApiRegistrationState &&
            Object.prototype.hasOwnProperty.call(globalThis, 'ezApi') &&
            globalThis['ezApi'] && globalThis['ezApi'].ready;
    }
    static ezRegistrator() {
        if (EzPaycomIntegrationPayRateType.ezCanRegister()) {
            EzPaycomIntegrationPayRateType.ezInstance = ezApi.ezRegisterEnumeration(EzPaycomIntegrationPayRateType);

            EzPaycomIntegrationPayRateType.ezApiRegistrationState = 'REGISTERED';
        }
    }
    static {
        if (null == this.ezApiRegistrationState) {
            this.ezApiRegistrationState = 'PENDING';

            document.addEventListener(
                'onEzApiReady',
                this.ezRegistrator);
        }
    }

    /**
        @public
        Creates a new instance of EzPaycomIntegrationPayRateType
     */
    constructor() {
        super();
    }
}

export {
    EzPaycomIntegrationPayRateType
};
