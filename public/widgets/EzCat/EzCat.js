import 'animate.css';

import {
    EzObject,
    EzBoolean,
    EzString,
    EzHtml
} from '/ezlibrary/helpers/EzHelpers.js';

import {
    EzRegistrationState,
    EzElementEventName
} from '/ezlibrary/enums/EzEnumerations.js';

import { EzClass } from '/ezlibrary/EzClass.js';

import { EzEventEngine } from '/ezlibrary/ez-event-engine.js';

import { EzUI } from '/public/javascript/common/ezui.js';

import { EzTickerTimer } from '/public/javascript/common/ez-ticker-timer.js';

/**
 * @class
 * @extends {EzClass}
 * @description
 * Controller/view for ezClocker Sign-in page
 * ---------------------------------------------------------------------------
 * Import with:
 *     import { EzCat } from '/public/widgets/EzCat/EzCat.js';
 * ---------------------------------------------------------------------------
 * Singleton instance ready for use when the below evaluates to true:
 *     globalThis.ezApi.ezclocker[EzCat.ezApiName] &&
 *     globalThis.ezApi.ezclocker[EzCat.ezApiName].ready
 * ---------------------------------------------------------------------------
 * Listen to onReady event:
 *     document.addEventListener(
 *         EzCat.ezEventNames.onReady,
 *         this.#ezRegistrator);
 * ---------------------------------------------------------------------------
 * Singleton Instance Reference:
 *     Inside this class: EzCat.ezInstance
 *     Outside this class: ezApi.ezclocker.ezCat
 * ---------------------------------------------------------------------------
 */
export class EzCat extends EzClass {
    /**
     * @public @readonly @property
     * Returns the EzCat UX html
     * @returns {string}
     */
    get ezCatHtml() {
        return EzHtml.build`
            <div
                id="EzCat"
                class="cat"
                style="display:none">
                <div
                    id="EzCatLeftEar"
                    class="ear ear--left">
                </div>
                <div
                    id="EzCatRightEar"
                    class="ear ear--right">
                </div>
                <div
                    id="EzCatFace"
                    class="face">
                    <div
                        id="EzCatLeftEye"
                        class="eye eye--left">
                        <div
                            id="EzCatLeftPupil"
                            class="eye-pupil">
                        </div>
                    </div>
                    <div
                        id="EzCatRightEye"
                        class="eye eye--right">
                        <div
                            id="EzCatRightPupil"
                            class="eye-pupil">
                        </div>
                    </div>
                    <div
                        id="EzCatMuzzle"
                        class="muzzle">
                    </div>
                </div>
            </div>`;
    }

    /**
     * @public @method
     * Initialises the EzCat
     * @returns {EzCat}
     */
    ezInit() {
        return EzCat.ezInstance;
    }

    /**
     * @public @method
     * Injects the EzCat UX into the provided parentContainerId
     * @param {string} parentContainerId
     */
    ezInject(parentContainerId) {
        if (!EzString.hasLength(parentContainerId)) {
            ezApi.ezclocker.ezLogger.error(
                EzString.em`
                    Unable to inject the EzCat due to the following error:
                    The provided parent container id of "${parentContainerId} doesn't appear to exist.`);
        } else {
            ezApi.ezclocker.ezUi.ezAppendContent(
                parentContainerId,
                EzCat.ezInstance.ezCatHtml);

            ezApi.ezclocker.ezEventEngine.ezWantElementEvent(
                'EzCatMuzzle',
                EzElementEventName.CLICK,
                EzCat.ezApiName,
                EzCat.ezInstance.ezCatWiggles);
        }
    }

    /**
     * @protected @method
     * Removes all existing animations
     */
    ezRemoveAllExistingEzCatAnimations() {
        ezApi.ezclocker.ezUi.ezRemoveElementClass(
            'EzCat',
            'animate__animated');

        ezApi.ezclocker.ezUi.ezRemoveElementClass(
            'EzCat',
            'animate__hinge');

        ezApi.ezclocker.ezUi.ezRemoveElementClass(
            'EzCat',
            'animate__animated');

        ezApi.ezclocker.ezUi.ezRemoveElementClass(
            'EzCat',
            'animate__fadeInUp');
    }

    /**
     * @public @method
     * Starts the 'auto play' with EzCat :)
     */
    ezAutoPlayWithCat() {
        EzCat.ezInstance.ezHereKittyKittyKitty();
    }

    /**
     * @public @method
     * Starts the EzCat animations
     */
    ezHereKittyKittyKitty() {
        ezApi.ezclocker.ezTickerTimer.ezStartIntervalTicker(
            EzCat.ezInstance.ezCatAppears,
            10000,
            'EzFadeInEzCatTickerTimer');
    }

    ezStopCallingEzCat() {
        EzCat.ezInstance.ezRemoveAllExistingEzCatAnimations();

        ezApi.ezclocker.ezTickerTimer.ezStopIntervalTicker('EzFadeInEzCatTickerTimer');
    }

    ezTellEzCatToHide() {
        ezApi.ezclocker.ezTickerTimer.ezStartIntervalTicker(
            EzCat.ezInstance.ezCatHides,
            10000,
            'EzHingOutEzCatTickerTimer');
    }

    ezStopTellingEzCatToHide() {
        EzCat.ezInstance.ezRemoveAllExistingEzCatAnimations();

        ezApi.ezclocker.ezTickerTimer.ezStopIntervalTicker('EzHingOutEzCatTickerTimer');
    }

    /**
     * @public @method
     * Stops the EzCat animations and hides EzCat
     */
    ezTellEzCatToGoToBed() {
        EzCat.ezInstance.ezStopCallingEzCat();

        EzCat.ezInstance.ezStopTellingEzCatToHide();

        ezApi.ezclocker.ezUi.ezHideElement('EzCat');
    }

    /**
     * @public @method
     * Animated show of EzCat
     */
    ezCatAppears() {
        EzCat.ezInstance.ezStopCallingEzCat();

        ezApi.ezclocker.ezUi.ezAddElementClass(
            'EzCat',
            'animate__animated');

        ezApi.ezclocker.ezUi.ezAddElementClass(
            'EzCat',
            'animate__fadeInUp');

        ezApi.ezclocker.ezUi.ezShowElement('EzCat');

        EzCat.ezInstance.ezTellEzCatToHide();
    }

    /**
     * @public @method
     * Animated hide of EzCat
     */
    ezCatHides() {
        EzCat.ezInstance.ezStopTellingEzCatToHide();

        ezApi.ezclocker.ezUi.ezAddElementClass(
            'EzCat',
            'animate__animated');

        ezApi.ezclocker.ezUi.ezAddElementClass(
            'EzCat',
            'animate__hinge');

        ezApi.ezclocker.ezUi.ezHideElement('EzCat');

        EzCat.ezInstance.ezHereKittyKittyKitty();
    }

    /**
     * @public @method
     * EzCat wiggles back and forth :)
     */
    ezCatWiggles() {
        ezApi.ezclocker.ezUi.ezAddElementClass(
            'EzCat',
            'animate__animated');

        ezApi.ezclocker.ezUi.ezAddElementClass(
            'EzCat',
            'animate__tada');
    }

    /*
    =========================================================================================================================
    Start of EzClocker Class Initialization and EzApi Registration Section
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    !! FROM THIS POINT FORWARD: ONLY PLACE INITIALIZATION CODE !!
    || All other class code MUST go above this section. ||
    =========================================================================================================================
    */

    /**
     * @static
     * @public @readonly @property
     * Returns the name of this class's singleton instance when registered with ezApi.
     * @returns {string}
     */
    static get ezApiName() {
        return 'ezCat';
    }

    /**
     * @static
     * @public @readonly @property
     * Returns an object of event names that this class may trigger.
     * @returns {object}
     */
    static get ezEventNames() {
        return {
            onReady: 'ezOn_EzCat_Ready'
        };
    }

    /**
     * @static
     * @private @field
     * Stores the singleton instance of this class that was created by and registerd with EzApi.
     * @type {EzCat}
     */
    static #ezInstance = EzObject.hasProperty(globalThis, 'ezApi') &&
        EzObject.isValid(globalThis.ezApi) && EzBoolean.isTrue(globalThis.ezApi.ready) &&
        EzObject.isValid(globalThis.ezApi.ezclocker[EzCat.ezApiName])
        ? globalThis.ezApi.ezclocker[EzCat.ezApiName]
        : null;

    /**
     * @static
     * @public @property @getter
     * Returns the singleton instance of this class that is registered with EzApi (if available yet)
     * @returns {EzCat}
     */
    static get ezInstance() {
        return EzCat.#ezInstance;
    }

    /**
     * @static
     * @public @property @setter
     * Sets the singleton instance of of this class that is registered with EzApi.
     * @param {EzCat} ezInstance
     */
    static set ezInstance(ezInstance) {
        if (null != EzCat.#ezInstance) {
            throw new Error('EzCat\'s singleton instance is already reigstered with EzApi.');
        }

        EzCat.#ezInstance = ezInstance;
    }

    /**
     * @static
     * @private @field
     * Stores the EzApi registration state for this class.
     * Default value is NULL
     * Class is registerd with EzApi when value is EzRegistrationState.REGISTERED
     * @type {string}
     * A valid enum property value from EzRegistrationState
     */
    static #ezApiRegistrationState = EzObject.hasProperty(globalThis, 'ezApi') &&
        EzObject.isValid(globalThis.ezApi) && EzBoolean.isTrue(globalThis.ezApi.ready) &&
        EzObject.isValid(globalThis.ezApi.ezclocker[EzCat.ezApiName])
        ? EzRegistrationState.REGISTERED
        : null;

    /**
     * @static
     * @public @property @getter
     * Returns the ezApi registration state of this classes's singleton instance.
     * @returns {string}
     * A valid enum property value from EzRegistrationState
     */
    static get ezApiRegistrationState() {
        return EzCat.#ezApiRegistrationState;
    }

    /**
     * @static
     * @public @property @setter
     * Sets the ezApi registration state of this classes's singleton instance.
     * @param {string} ezApiRegistrationState
     * A valid enum property value from EzRegistrationState
     */
    static set ezApiRegistrationState(ezApiRegistrationState) {
        EzCat.#ezApiRegistrationState = EzRegistrationState.ezValueOf(ezApiRegistrationState);
    }

    /**
     * @static
     * @private @readonly @property
     * Returns true when all required dependencies for this class report ready.
     * In otherwords, the require dependency's singleton instance is created
     * and is registered with and accessable from EzApi with ezApi.ezclocker.{dependency_name}.
     * @returns {boolean}
     */
    static get #ezCanRegister() {
        return EzRegistrationState.PENDING === EzCat.ezApiRegistrationState &&
            EzObject.hasProperty(globalThis, 'ezApi') &&
            EzObject.isValid(globalThis.ezApi) && EzBoolean.isTrue(globalThis.ezApi.ready) &&

            globalThis.ezApi.ezclocker[EzEventEngine.ezApiName] &&
            globalThis.ezApi.ezclocker[EzEventEngine.ezApiName].ready &&

            globalThis.ezApi.ezclocker[EzUI.ezApiName] &&
            globalThis.ezApi.ezclocker[EzUI.ezApiName].ready &&

            globalThis.ezApi.ezclocker[EzTickerTimer.ezApiName] &&
            globalThis.ezApi.ezclocker[EzTickerTimer.ezApiName].ready;
    }

    /**
     * @static
     * @private @readonly @property
     * Returns if this class's singleton instance is registered with ezApi yet.
     * @returns {boolean}
     */
    static get #ezIsRegistered() {
        return null != EzCat.ezInstance &&
            EzRegistrationState.REGISTERED === EzCat.ezApiRegistrationState;
    }

    /**
     * @static
     * @private @method
     * Attempts to register the singleton instance for this class with ezApi. Returns true
     * if successful, false otherwise.
     * @returns {boolean}
     */
    static #ezRegistrator() {
        if (EzCat.#ezCanRegister && !EzCat.#ezIsRegistered) {
            globalThis.ezApi.ezRegisterNewApi(EzCat, EzCat.ezApiName);
        }

        return EzCat.#ezIsRegistered;
    }

    /**
     * @static
     * Static Initialization
     * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
     * >> IMPORTANT <<
     * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
     * Make sure the following properties and methods get defined BEFORE this static initialization section:
     *     1) Property getter EzCat.ezApiName
     *     2) Property getter EzCat.ezEventNames
     *     3) Property getter EzCat.ezInstance
     *     4) Property setter EzCat.ezInstance
     *     5) Property getter EzCat.ezApiRegistrationState
     *     6) Property setter EzCat.ezApiRegistrationState
     *     7) Property getter EzCat.#ezCanRegister
     *     8) Property getter EzCat.#ezIsRegistered
     *     9) Method EzCat.#ezRegistrator()
     */
    static {
        if (!EzCat.#ezIsRegistered) {
            EzCat.ezApiRegistrationState = EzRegistrationState.PENDING;

            if (!EzCat.#ezRegistrator()) {
                document.addEventListener(
                    EzCat.ezOnEzApiReadyEventName,
                    EzCat.#ezRegistrator);

                document.addEventListener(
                    EzEventEngine.ezEventNames.onReady,
                    EzCat.#ezRegistrator);

                document.addEventListener(
                    EzUI.ezEventNames.onReady,
                    EzCat.#ezRegistrator);

                document.addEventListener(
                    EzTickerTimer.ezEventNames.onReady,
                    EzCat.#ezRegistrator);
            }
        }
    }

    /*
    =========================================================================================================================
    End of EzClocker Class Initialization and EzApi Registration Section
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    !! DO NOT PLACE ANY NON-INITIALIZTION CODE BETWEEN THE START AND END OF THIS INITILIZATION SECTON !!
    !! DO NOT PLACE ANY CODE OF ANY KIND BELOW THIS POINT !!
    =========================================================================================================================
    */
}