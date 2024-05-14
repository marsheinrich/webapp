import { EzEnum } from '/ezlibrary/enums/EzEnum.js';

/**
    @public
    Enumeration for EzPayChexIntegrationPayRateType
 */
class EzPayChexIntegrationPayRateType extends EzEnum {
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

    static ezApiName = 'EzPayChexIntegrationPayRateType';
    static ezInstance = null;
    static ezApiRegistrationState = null;
    static ezCanRegister() {
        return 'PENDING' === EzPayChexIntegrationPayRateType.ezApiRegistrationState &&
            Object.prototype.hasOwnProperty.call(globalThis, 'ezApi') &&
            globalThis['ezApi'] && globalThis['ezApi'].ready;
    }
    static ezRegistrator() {
        if (EzPayChexIntegrationPayRateType.ezCanRegister()) {
            EzPayChexIntegrationPayRateType.ezInstance = ezApi.ezRegisterEnumeration(EzPayChexIntegrationPayRateType);

            EzPayChexIntegrationPayRateType.ezApiRegistrationState = 'REGISTERED';
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
        Creates a new instance of EzPayChexIntegrationPayRateType
     */
    constructor() {
        super();
    }
}

export {
    EzPayChexIntegrationPayRateType
};
