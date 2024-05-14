import { EzBadParamException } from '/ezlibrary/exceptions/EzBadParamException.js';

import { EzEnum } from '/ezlibrary/enums/EzEnum.js';

/**
    TODO: Re-factor so enumeration class extends from EzEnumeration2.js
    EzClockerFeature enumeration
    Import with:
        import { EzClockerFeature } from '/ezlibrary/EzClockerFeature.js';
 */
export class EzClockerFeature extends EzEnum {
    static get ezValues() {
        return [
            'JOBS',
            'OVERTIME',
            'INTEGRATIONS',
            'TEAM_CHAT'
        ];
    }

    static get EZ_JOBS() {
        return 'JOBS';
    }

    static get EZ_OVERTIME() {
        return 'OVERTIME';
    }

    static get EZ_INTEGRATIONS() {
        return 'INTEGRATIONS';
    }

    static get EZ_TEAM_CHAT() {
        return 'TEAM_CHAT';
    }

    static ezInstance = null;

    static ezApiRegistrationState = null;

    static get ezApiName() {
        return 'EzClockerContextEventName';
    }

    static get ezEventNames(){
        return {
            onReady: 'ezOn_EzClockerFeature_Ready'
        };
    }

    static get ezCanRegister() {
        return 'PENDING' === EzClockerFeature.ezApiRegistrationState &&
            Object.prototype.hasOwnProperty.call(globalThis, 'ezApi') &&
            globalThis['ezApi'] && globalThis['ezApi'].ready;
    }

    static #ezRegistrator() {
        if (!EzClockerFeature.ezCanRegister) {
            return false;
        }

        EzClockerFeature.ezInstance = ezApi.ezRegisterEnumeration(EzClockerFeature);
        EzClockerFeature.ezApiRegistrationState = 'REGISTERED';
        return true;
    }

    // Static Constructor
    static {
        if (null == this.ezApiRegistrationState) {
            this.ezApiRegistrationState = 'PENDING';

            document.addEventListener(
                'onEzApiReady',
                this.#ezRegistrator);
        }
    }

    /**
        @public @constructor
     */
    constructor() {
        super();
    }

    /**
        @public
        Iterates each property in the enumeration and calls the
        provided callbackFunction passing the enumeration value.
        @param {Function} callbackFunction
     */
    forEachEnumValue(callbackFunction) {
        if (!ezApi.ezIsFunction(callbackFunction)) {
            throw new EzBadParamException(
                'callbackFunction',
                EzClockerFeature.ezInstance,
                EzClockerFeature.forEachFeature);
        }

        for (let feature in EzClockerFeature) {
            if (ezApi.ezHasOwnProperty(EzClockerFeature, feature)) {
                callbackFunction(EzClockerFeature[feature]);
            }
        }
    }
}
