import { EzClass } from '/ezlibrary/EzClass.js';

import { EzLocale } from '/ezlibrary/locales/EzLocale.js';

export class EzLocaleManager extends EzClass {
    /**
        @public @static @field
        @type {EzLocaleManager}
     */
    static ezInstance = null;

    /**
        @public @static @field
        @type {string}
     */
    static ezApiRegistrationState = null;

    static get ezApiName() {
        return 'ezDateTime';
    }

    /**
        @static @readonly @property
        @returns {object}
     */
    static get ezEventNames() {
        return {
            onReady: 'ezOn_EzLocaleManager_Ready',
            onActiveLocaleChanged: 'ezOn_EzLocaleManager_ActiveLocale_Changed'
        };
    }

    /**
        @static @readonly @property
        @returns {boolean}
     */
    static get ezCanRegister() {
        return 'PENDING' === EzLocaleManager.ezApiRegistrationState &&
            Object.prototype.hasOwnProperty.call(globalThis, 'ezApi') &&
            globalThis['ezApi'] && globalThis['ezApi'].ready;
    }

    /**
        @private @static @method
        @returns {boolean}
     */
    static #ezRegistrator() {
        if (!EzLocaleManager.ezCanRegister) {
            return false;
        }

        EzLocaleManager.ezApiRegistrationState = 'REGISTERED';

        ezApi.ezRegisterNewApi(EzLocaleManager, EzLocaleManager.ezApiName);

        return true;
    }

    // Static initilization block
    static {
        if (null == EzLocaleManager.ezApiRegistrationState) {
            EzLocaleManager.ezApiRegistrationState = 'PENDING';

            document.addEventListener(
                'onEzApiReady',
                EzLocaleManager.#ezRegistrator);
        }
    }

    /**
        @public @constructor
     */
    constructor() {
        super();
    }

    /**
        @protected @method
        Initializes EzLocale after registration with ezApi
        @returns {EzLocale}
     */
    ezInit() {
        ezApi.ezclocker.ezEventEngine.ezRegisterEvent(
            EzLocale.ezApiName,
            EzLocale.ezEventNames.onActiveLocaleChanged);

        return EzLocale.ezInstance;
    }

    /**
        @private @field
        @type {string}
     */
    #activeLocale = EzLocale.US;

    /**
        @public @getter @property
        @returns {string} (EzLocal constant)
     */
    get activeLocale() {
        return this.#activeLocale;
    }

    /**
        @public @setter @property
        @param {string} (EzLocal constant)
     */
    set activeLocale(ezLocale) {
        this.#activeLocale = EzLocale.ezLocaleForValue(ezLocale);

        ezApi.ezclocker.ezEventEngine.ezTriggerEvent(
            EzLocaleManager.ezEventNames.onActiveLocaleChanged,
            ezApi.ezclocker.ezEventEngine.ezBuildEventData(
                EzLocaleManager.ezApiName,
                `Active locale changed to ${this.#activeLocale}`,
                this));
    }
}
