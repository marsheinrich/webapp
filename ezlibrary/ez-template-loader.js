import { EzBadParamException } from '/ezlibrary/exceptions/EzBadParamException.js';
import { EzInstanceState } from '/ezlibrary/EzInstanceState.js';

import {
    EzRequestMethod,
    EzMediaType
} from '/ezlibrary/enums/EzEnumerations.js';

/**
    @class
    @deprecated
    Class will get removed in a future release.
    Migrate any use to alternate solutions.
 */
export class EzTemplateLoader {
    static ezApiName = 'ezTemplateLoader';
    static ezShortApiName = 'http';
    static ezEventNames = {
        onReady: 'ezOn_EzTemplateLoader_Ready'
    };
    static ezInstance = null;
    static ezApiRegistrationState = null;

    static ezCanRegister() {
        return 'PENDING' === EzTemplateLoader.ezApiRegistrationState &&
            Object.prototype.hasOwnProperty.call(globalThis, 'ezApi') &&
            globalThis['ezApi'] && globalThis['ezApi'].ready;
    }

    static ezRegistrator() {
        if (EzTemplateLoader.ezCanRegister()) {
            EzTemplateLoader.ezInstance = ezApi.ezRegisterNewApi(
                EzTemplateLoader,
                EzTemplateLoader.ezApiName);

            EzTemplateLoader.ezApiRegistrationState = 'REGISTERED';
        }
    }
    // Stati constructor
    static {
        if (null == this.ezApiRegistrationState) {
            this.ezApiRegistrationState = 'PENDING';

            // Must wait to initialize until after the EzEmployerService is ready

            document.addEventListener(
                'onEzApiReady',
                this.ezRegistrator);
        }
    }

    /**
        @public
        Createsa  new instance of EzTemplateLoader
        @returns {EzTemplateLoader};
     */
    constructor() {
        this.ezStates.push(EzInstanceState.CONSTRUCTED);
    }

    /** @public @field */
    ready = false;

    /** @private @field */
    #ezInstanceStates = [];

    /**
        @public @getter @property
        @returns {array}
     */
    get ezStates() {
        return this.#ezInstanceStates;
    }

    /**
        @public @getter @property
        @param {array} ezInstanceStates
    */
    set ezStates(ezInstanceStates) {
        this.#ezInstanceStates = ezInstanceStates;
    }

    /**
        @protected @method
     */
    ezInit() {
        return EzTemplateLoader.ezInstance;
    }

    /**
        @public
        Downloads and returns the template file.
        @param {String} templateUrl
        @returns {Promise.resolve}
     */
    ezReadHtmlTemplate(templateUrl) {
        if (ezApi.ezIsEmptyString(templateUrl)) {
            throw new EzBadParamException(
                'templateUrl',
                EzTemplateLoader.ezInstance,
                EzTemplateLoader.ezInstance.ezReadHtmlTemplate(templateUrl));
        }

        return ezApi.ezAsyncAction(
            (finished) => {
                return ezApi.ezclocker.http.ezSendRequest(
                    EzRequestMethod.GET,
                    templateUrl,
                    null,
                    true,
                    (jqXHR) => {
                        ezApi.ezclocker.http.addAcceptType(
                            jqXHR,
                            [
                                EzMediaType.TEXT_HTML,
                                EzMediaType.TEXT_PLAIN,
                                EzMediaType.TEXT_CSS,
                                EzMediaType.TEXT_XML,
                                EzMediaType.APPLICATION_XML,
                                EzMediaType.APPLICATION_JSON,
                                EzMediaType.APPLICATION_JAVASCRIPT
                            ].join(','));
                    },
                    false)
                    .then(
                        (response) => {
                            return finished({
                                url: templateUrl,
                                template: response,
                                errorCode: 0
                            });
                        },
                        (eResponse) => {
                            return finished({
                                url: templateUrl,
                                template: null,
                                message: ezApi.ezToJson(eResponse),
                                errorCode: 500
                            });
                        });
            });
    }
}
