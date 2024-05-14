import { EzClass } from '/ezlibrary/EzClass.js';

class EzLandingPage extends EzClass {
    /**
        @public @static @field
        @type {EzLandingPage}
     */
    static ezInstance = null;

    /**
        @public @static @field
        @type {string}
     */
    static ezApiRegistrationState = null;

    /**
        @public @static @readonly @property
        @returns {string}
     */
    static get ezApiName() {
        return 'ezLandingPage';
    }

    /**
        @public @static @readonly @property
        @returns {object}
     */
    static get ezEventNames() {
        return {
            onReady: 'ezOn_EzSignUp_Ready',
        };
    }

    /**
        @public @static @readonly @property
        @returns {boolean}
     */
    static get ezCanRegister() {
        return 'PENDING' === EzLandingPage.ezApiRegistrationState &&
            Object.prototype.hasOwnProperty.call(globalThis, 'ezApi') &&
            globalThis.ezApi && globalThis.ezApi.ready;
    }

    /**
        @private @static @method
     */
    static #ezRegistrator() {
        if (!EzLandingPage.ezCanRegister) {
            return false;
        }
        ezApi.ezRegisterNewApi(EzLandingPage, EzLandingPage.ezApiName);
        EzLandingPage.ezApiRegistrationState = 'REGISTERED';
        return true;
    }

    // Static constructor
    static {
        if (null == EzLandingPage.ezApiRegistrationState) {
            EzLandingPage.ezApiRegistrationState = 'PENDING';

            if (!EzLandingPage.#ezRegistrator()) {
                document.addEventListener(
                    'onEzApiReady',
                    EzLandingPage.#ezRegistrator);
            }
        }
    }

    constructor() {
        super();
    }

    ezInit() {
        return EzLandingPage.ezInstance;
    }
}

export {
    EzLandingPage
};