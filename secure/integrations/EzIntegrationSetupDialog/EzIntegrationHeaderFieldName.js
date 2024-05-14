import { EzEnum } from '/ezlibrary/enums/EzEnum.js';

/**
    Defines the common integration setup dialog header field names.
    Import with:
        import { EzIntegrationHeaderFieldName } from '/secure/integrations/EzIntegrationSetupDialog/EzIntegrationHeaderFieldName.js';
 */
class EzIntegrationHeaderFieldName extends EzEnum {
    static get INTEGRATION_ENABLED() {
        return 'INTEGRATION_ENABLED';
    }

    static get _INTEGRATION_ENABLED() {
        return {
            ezPayloadId: 'ezEnableIntegration',
            ezInputId: 'ezIntegrationEnabledInput',
            display: 'Enable Integration'
        };
    }

    static ezToInputId(enumValue) {
        return EzIntegrationHeaderFieldName[`_${enumValue.toUpperCase()}`]['ezInputId'];
    }

    static ezToPayloadId(enumValue) {
        return EzIntegrationHeaderFieldName[`_${enumValue.toUpperCase()}`]['ezPayloadId'];
    }

    static ezToDisplayValue(enumValue) {
        return EzIntegrationHeaderFieldName[`_${enumValue.toUpperCase()}`]['display'];
    }

    /**
        @public @constructor
     */
    constructor() {
        super();
    }
}

export {
    EzIntegrationHeaderFieldName
};