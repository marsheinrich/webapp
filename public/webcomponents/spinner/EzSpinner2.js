import {
    EzBadParamException
} from '/ezlibrary/exceptions/EzExceptions.js';

import {
    EzObject,
    EzBoolean,
    EzNumber,
    EzString,
    EzFunction,
    EzPromise,
    EzHtml,
} from '/ezlibrary/helpers/EzHelpers.js';

import { EzSpinnerType2 } from '/public/webcomponents/spinner/EzSpinnerType2.js';

import {
    EzRegistrationState,
    // EzElementEventName
} from '/ezlibrary/enums/EzEnumerations.js';

import { EzEventEngine } from '/ezlibrary/ez-event-engine.js';

import { EzClass } from '/ezlibrary/EzClass.js';

/**
    @class
    @extends {EzClass}
    @description
    Provides spinners to the UX
    -----------------------------------------------------------------
    Import with:
        import { EzSpinner2 } from '/public/webcomponents/spinner/EzSpinner2.js';
    -----------------------------------------------------------------
    Singleton instance ready for use when the below evaluates to true:
        globalThis.ezApi.ezclocker[EzSpinner2.ezApiName] &&
        globalThis.ezApi.ezclocker[EzSpinner2.ezApiName].ready
    -----------------------------------------------------------------
    Listen to onReady event:
        document.addEventListener(
            EzSpinner2.ezEventNames.onReady,
            this.#ezRegistrator);
    -----------------------------------------------------------------
    Singleton Instance Reference:
        ezApi.ezclocker.ezSpinner2
    -----------------------------------------------------------------
 */
export class EzSpinner2 extends EzClass {
    /**
        @static
        @public @readonly @property
        Returns the name of this class's singleton instance when registered with ezApi.
        @returns {string}
     */
    static get ezApiName() {
        return 'ezSpinner2';
    }

    /**
        @static
        @public @readonly @property
        Returns an object of event names that this class may trigger.
        @returns {object}
     */
    static get ezEventNames() {
        return {
            onReady: 'ezOn_EzSpinner2_Ready'
        };
    }

    /**
        @static
        @private @field
        Stores the singleton instance of this class that was created by and registerd with EzApi.
        @type {EzSpinner2}
     */
    static #ezInstance = EzObject.hasProperty(globalThis, 'ezApi') &&
        EzObject.isValid(globalThis.ezApi) && EzBoolean.isTrue(globalThis.ezApi.ready) &&
        EzObject.isValid(globalThis.ezApi.ezclocker[EzSpinner2.ezApiName])
        ? globalThis.ezApi.ezclocker[EzSpinner2.ezApiName]
        : null;

    /**
        @static
        @public @property @getter
        Returns the singleton instance of this class that is registered with EzApi (if available yet)
        @returns {EzSpinner2}
     */
    static get ezInstance() {
        return EzSpinner2.#ezInstance;
    }

    /**
        @static
        @public @property @setter
        Sets the singleton instance of of this class that is registered with EzApi.
        @param {EzSpinner2} ezSpinner
     */
    static set ezInstance(ezSpinner) {
        if (null != EzSpinner2.#ezInstance) {
            throw new Error('EzSpinner2\'s singleton instance is already reigstered with EzApi.');
        }

        EzSpinner2.#ezInstance = ezSpinner;
    }

    /**
        @static
        @private @field
        Stores the EzApi registration state for this class.
        Default value is NULL
        Class is registerd with EzApi when value is EzRegistrationState.REGISTERED
        @type {string}
        A valid enum property value from EzRegistrationState
     */
    static #ezApiRegistrationState = EzObject.hasProperty(globalThis, 'ezApi') &&
        EzObject.isValid(globalThis.ezApi) && EzBoolean.isTrue(globalThis.ezApi.ready) &&
        EzObject.isValid(globalThis.ezApi.ezclocker[EzSpinner2.ezApiName])
        ? EzRegistrationState.REGISTERED
        : null;

    /**
        @static
        @public @property @getter
        Returns the ezApi registration state of this classes's singleton instance.
        @returns {string}
        A valid enum property value from EzRegistrationState
     */
    static get ezApiRegistrationState() {
        return EzSpinner2.#ezApiRegistrationState;
    }

    /**
        @static
        @public @property @setter
        Sets the ezApi registration state of this classes's singleton instance.
        @param {string} ezApiRegistrationState
        A valid enum property value from EzRegistrationState
     */
    static set ezApiRegistrationState(ezApiRegistrationState) {
        EzSpinner2.#ezApiRegistrationState = EzRegistrationState.ezValueOf(ezApiRegistrationState);
    }

    /**
        @static
        @private @readonly @property
        Returns true when all required dependencies for this class report ready.
        In otherwords, the require dependency's singleton instance is created
        and is registered with and accessable from EzApi with ezApi.ezclocker.{dependency_name}.
        @returns {boolean}
     */
    static get #ezCanRegister() {
        return EzRegistrationState.PENDING === EzSpinner2.ezApiRegistrationState &&
            EzObject.hasProperty(globalThis, 'ezApi') &&
            EzObject.isValid(globalThis.ezApi) && EzBoolean.isTrue(globalThis.ezApi.ready) &&

            globalThis.ezApi.ezclocker[EzEventEngine.ezApiName] &&
            globalThis.ezApi.ezclocker[EzEventEngine.ezApiName].ready;
    }

    /**
        @static
        @private @readonly @property
        Returns if this class's singleton instance is registered with ezApi yet.
        @returns {boolean}
     */
    static get #ezIsRegistered() {
        return null != EzSpinner2.ezInstance &&
            EzRegistrationState.REGISTERED === EzSpinner2.ezApiRegistrationState;
    }

    /**
        @static
        @private @method
        Attempts to register the singleton instance for this class with ezApi. Returns true
        if successful, false otherwise.
        @returns {boolean}
     */
    static #ezRegistrator() {
        if (EzSpinner2.#ezCanRegister && !EzSpinner2.#ezIsRegistered) {
            globalThis.ezApi.ezRegisterNewApi(EzSpinner2, EzSpinner2.ezApiName);
        }

        return EzSpinner2.#ezIsRegistered;
    }

    /**
        @static
        Static Initialization
        ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        >> IMPORTANT <<
        ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        Make sure the following properties and methods get defined BEFORE this static initialization section:
            1) Property getter EzSpinner2.ezApiName
            2) Property getter EzSpinner2.ezEventNames
            3) Property getter EzSpinner2.ezInstance
            4) Property setter EzSpinner2.ezInstance
            5) Property getter EzSpinner2.ezApiRegistrationState
            6) Property setter EzSpinner2.ezApiRegistrationState
            7) Property getter EzSpinner2.#ezCanRegister
            8) Property getter EzSpinner2.#ezIsRegistered
            9) Method EzSpinner2.#ezRegistrator()
     */
    static {
        if (!EzSpinner2.#ezIsRegistered) {
            EzSpinner2.ezApiRegistrationState = EzRegistrationState.PENDING;

            if (!EzSpinner2.#ezRegistrator()) {
                document.addEventListener(
                    EzSpinner2.ezOnEzApiReadyEventName,
                    () => {
                        if (!EzSpinner2.#ezRegistrator()) {
                            document.addEventListener(
                                EzEventEngine.ezEventNames.onReady,
                                EzSpinner2.#ezRegistrator);
                        }
                    });
            }
        }
    }

    /**
        @static
        @public @method
        Builds the bar loader image HTML
        Bar is orange/white moving left to right
        Size: 16px x 16px
        @returns {string}
     */
    static ezBuildBarLoader() {
        return EzHtml.build`
            <img
                id="EzSnakeSpinner"
                src="/public/images/spinners/orange-bar-loader.gif"
                style="height:16px;width:16px"/>`;
    }

    /**
        @static
        @public @method
        Builds the line loader image HTML
        Bar is orange moving left to right
        Size: 24px x 4px
        @returns {string}
     */
    static ezBuildLineLoader() {
        return EzHtml.build`
            <img
                id="EzSnakeSpinner"
                src="/public/images/spinners/orange-bar-loader.gif"
                style="width:24px;height:4px"/>`;
    }

    /**
        @static
        @public @method
        Builds the small infinity spinner image HTML
        Description: Infinity is orange with tansparent background
        Size: 34px x 34px
        Type: GIF
        @returns {string}
     */
    static ezBuildSmallInfinitySpinner() {
        return EzHtml.build`
            <img
                id="EzSnakeSpinner"
                src="/public/images/spinners/infinity-small.gif"
                style="width:34px;height:34px"/>`;
    }


    /**
        @static
        @public @method
        Builds the line spinner html
        Description: Spinner is orange with transparent background
        Size: variable (default 52px)
        Type: SVG
        @param {number} height
        Default is: 52px
        @returns {string}
     */
    static ezBuildLineSpinner(height) {
        return EzHtml.build`
            <img
                id="EzSnakeSpinner"
                src="/public/images/spinners/line-spinner-orange.svg"
                style="height:${EzNumber.numberOrDefault(height, 52)}px"/>`;
    }

    /**
        @static
        @public @method
        Builds the 'loading snake' spinner html
        Description: Snake spinner with transparent background
        Size: variable, default is 52px
        Type: SVG
        @param {number} height
        Default is: 52px
        @param {string} color
        Acceptable values: orange, white, black
        Default: orange
        @returns {string}
     */
    static ezBuildSnakeSpinner(height, color) {
        let snakeSpinnerUrl = '/public/images/spinners/infinity-snake-spinner-orange.svg';

        color = EzString.stringOrEmpty(color).toLowerCase();
        if ('black' === color) {
            snakeSpinnerUrl = '/public/images/spinners/infinity-snake-spinner-black.svg';
        } else if ('white' === color) {
            snakeSpinnerUrl = '/public/images/spinners/infinity-snake-spinner-white.svg';
        }

        return EzHtml.build`
            <img
                id="EzSnakeSpinner"
                src="${snakeSpinnerUrl}"
                style="height:${EzNumber.numberOrDefault(height, 52)}px"/>`;
    }

    /**
        @static
        @public @method
        Builds the infinity spinner html
        Description: Orange infinity with transparent background
        Size: Variable (default is 52px)
        Type: SVG
        @param {number} height
        Default is: 52px
        @returns {string}
     */
    static ezBuildInfinitySpinner(height) {
        return EzHtml.build`
            <img
                id="EzSnakeSpinner"
                src="/public/images/spinners/Infinity-200px.svg"
                style="height:${EzNumber.numberOrDefault(height, 52)}px"/>`;
    }

    /**
        @static
        @public @method
        Builds the gear spinner html
        Description: Orange gear spinner with long gears, wide open center, transparent background
        Size: Variable (default is 52px)
        Type: SVG
        @param {number} height
        Default is: 52px
        @returns {string}
     */
    static ezBuildGearSpiner(height) {
        return EzHtml.build`
            <img
                id="EzGearSpinner"
                src="/public/images/spinners/gear.svg"
                style="height:${EzNumber.numberOrDefault(height, 52)}px"/>`;
    }

    /**
        @static
        @public @method
        Builds the gear spinner html
        Description:
        The black or white gear spinner has short gears, narrow open center, transparent background
        The orange gear spinner has long gears, wide open center, transparent background
        Size: Variable (default is 52px)
        Type: SVG
        @param {number} height
        Default is: 52px
        @param {string} color
        Accepted values: black, white, orange
        @returns {string}
     */
    static ezBuildGearSpiner(height, color) {
        let shortGearSpinnerUrl = '/public/images/spinners/gear.svg';

        color = EzString.stringOrEmpty(color).toLowerCase();

        if ('black' === color) {
            shortGearSpinnerUrl = '/public/images/spinners/gear-spinner-black.svg';
        } else if ('white' === color)
            shortGearSpinnerUrl = '/public/images/spinners/gear-spinner-white.svg';

        return EzHtml.build`
            <img
                id="EzGearSpinner"
                src="${shortGearSpinnerUrl}"
                style="height:${EzNumber.numberOrDefault(height, 52)}px"/>`;
    }

    /**
        @public @constructor
     */
    constructor() {
        super();
    }

    /**
        @private @field
        Stores the EzSpinner2Configuration for the full screen spinner.
     */
    #ezFullPageSpinnerConfiguration = EzSpinnerType2.ezSpinnerConfig(EzSpinnerType2.LINE_SPINNER_SVG);
    /**
        @public @property @getter
        Gets the fillscreen wait spinner configuration
        @returns {EzSpinner2Configuration}
     */
    get ezFullPageSpinnerConfiguration() {
        return this.#ezFullPageSpinnerConfiguration;
    }
    /**
        @public @property @setter
        Sets the fillscreen wait spinner configuration
        @returns {EzSpinner2Configuration}
     */
    set ezFullPageSpinnerConfiguration(ezFullPageSpinnerConfiguration) {
        this.#ezFullPageSpinnerConfiguration = ezFullPageSpinnerConfiguration;
    }

    /**
        @private @field
        Stores the currently active full-page spinner's EzSpinner2Configuration
        @type {EzSpinner2Configuration}
     */
    #ezActiveFullPageSpinner = null;
    /**
        @public @property @getter
        Gets the currently active full-page spinner's EzSpinner2Configuration
        @returns {EzSpinner2Configuration}
     */
    get ezActiveFullPageSpinner() {
        return this.#ezActiveFullPageSpinner;
    }
    /**
        @public @property @setter
        Sets the currently active full-page spinner's EzSpinner2Configuration
        @returns {EzSpinner2Configuration}
     */
    set ezActiveFullPageSpinner(ezActiveFullPageSpinner) {
        this.#ezActiveFullPageSpinner = ezActiveFullPageSpinner;
    }

    /**
        @protected
        Initializes EzSpinner2
        @returns {EzSpinner2}
     */
    ezInit() {
        return EzSpinner2.ezInstance;
    }

    /**
        @public @method
        Injects a spinner into the UX
        @param {EzSpinner2Configuration} ezSpinnerConfiguration
        @returns {Promise.resolve)
        The resolve contains the spinner's id
     */
    ezStart(ezSpinnerConfiguration) {
        if (!EzObject.isValid(ezSpinnerConfiguration)) {
            throw new EzBadParamException(
                'ezSpinnerConfiguration',
                EzSpinner2.ezInstance,
                EzSpinner2.ezInstance.ezStart);
        }

        EzSpinner2.ezInstance.ezActiveFullPageSpinner = ezSpinnerConfiguration;

        EzSpinner2.ezInstance.ezActiveFullPageSpinner.ezShow();
    }

    /**
        @public @method
        Starts a new full-page spinner with the provided message.
        Example Code:
            return ezApi.ezclocker.ezSpinner.ezStartPageWaitPromise(
                'Please wait ...',
                (resolve, reject, waitDone) => {
                    // ... perform actions ...

                    return successful
                        ? waitDone().then(resolve)
                        : waitDone().then(reject);
             });
        @param {string} message
        Wait message to display
        @param {function} waitActionFunction
        Reference to the function called to execute actions after the spinner is visible.
        EzSpinner2 will call the provided function and pass along the following parameters:
            waitActionFunction(
                resolve, // Promise resolve callback method
                reject, // Promise reject callback method
                waitDone // A function called to close the spinner
            );
        @returns {Promise}
     */
    ezPageWaitPromise(waitMessage, waitActionFunction) {
        if (!EzFunction.isFunction(waitActionFunction)) {
            throw new EzBadParamException(
                'waitActionFunction',
                EzSpinner2.ezInstance,
                EzSpinner2.ezInstance.ezPageWaitPromise);
        }

        EzSpinner2.ezInstance.ezFullPageSpinnerConfiguration.ezWaitMessage = waitMessage;

        EzSpinner2.ezInstance.ezStart(EzSpinner2.ezInstance.ezFullPageSpinnerConfiguration);

        return EzPromise.promise(
            (resolve, reject) => waitActionFunction(
                // Resolve
                () => {
                    EzSpinner2.ezInstance.ezStop(EzSpinner2.ezInstance.ezFullPageSpinnerConfiguration.ezId);

                    return resolve.apply(null, arguments);
                },
                // Reject
                () => {
                    EzSpinner2.ezInstance.ezStop(EzSpinner2.ezInstance.ezFullPageSpinnerConfiguration.ezId);

                    return reject.apply(null, arguments);
                }));
    }

    /**
        @public @method
        @param {string} waitMessage
        @param {function} waitActionFunction
        @returns {Promise}
        @deprecated
        Migrate to ezApi.ezclocker.ezSpinner.ezPageWaitPromise(waitMessage, waitActionFunction);
     */
    ezWaitResolveReject(waitMessage, waitActionFunction) {
        return EzSpinner2.ezInstance.ezPageWaitPromise(waitMessage, waitActionFunction);
    }

    /**
        @public @method
        @param {string} waitMessage
        @param {function} waitActionFunction
        @returns {Promise}
        @deprecated
        Migrate to ezApi.ezclocker.ezSpinner.ezPageWaitPromise(waitMessage, waitActionFunction);
     */
    ezStartPageWaitPromise(waitMessage, waitActionFunction) {
        return EzSpinner2.ezInstance.ezPageWaitPromise(waitMessage, waitActionFunction);
    }

    /**
        @public @method
        @param {string} waitMessage
        @param {function} waitActionFunction
        @returns {Promise.resolve}
        @deprecated
        Migrate to ezApi.ezclocker.ezSpinner.ezPageWaitAsync(waitMessage, waitActionFunction);
     */
    ezStartPageWait(waitMessage, waitActionFunction) {
        return EzSpinner2.ezInstance.ezPaigWaitAsync(waitMessage, waitActionFunction);
    }

    /**
        @public @method
        Updated page wait resolve method that removes the need to call the waitDone() function.
        @param {string} message
        @param {function} functionToExecute
        @returns {Promise.resolve}
        @deprecated
        Migrate to ezApi.ezclocker.ezSpinner.ezPageWaitAsync(waitMessage, waitActionFunction);
     */
    ezPageWaitResolve(waitMessage, waitActionFunction) {
        return EzSpinner2.ezInstance.ezPaigWaitAsync(waitMessage, waitActionFunction);
    }

    /**
        @public @method
        @param {string} waitMessage
        @param {function} waitActionFunction
        @returns {*}
        Returns the result from the waitActionFunction
     */
    ezPageWaitExecute(waitMessage, waitActionFunction) {
        if (!EzFunction.isFunction(waitActionFunction)) {
            throw new EzBadParamException(
                'waitActionFunction',
                EzSpinner2.ezInstance,
                EzSpinner2.ezInstance.ezPageWaitExecute);
        }

        EzSpinner2.ezInstance.ezFullPageSpinnerConfiguration.ezWaitMessage = waitMessage;

        EzSpinner2.ezInstance.ezStart(EzSpinner2.ezInstance.ezFullPageSpinnerConfiguration);

        return waitActionFunction.apply(
            this,
            () => EzSpinner2.ezInstance.ezStop(EzSpinner2.ezInstance.ezFullPageSpinnerConfiguration.ezId));
    }

    /**
        @public @method
        @param {string} waitMessage
        @param {function} waitActionFunction
        @deprecated
        Migrate to ezApi.ezclocker.ezSpinner.ezPageWaitExecute(waitMessage, waitActionFunction);
     */
    ezStartPageWaitExecute(waitMessage, waitActionFunction) {
        return EzSpinner2.ezInstance.ezPageWaitExecute(waitMessage, waitActionFunction);
    }

    /**
        @public @method
        Starts the page wait spinner until a specific event is triggered
        @param {string} message
        @param {string} eventName
        @param {undefined|null|function} afterWaitFunction
     */
    ezStartPageWaitUntilEvent(waitMessage, eventName, afterWaitFunction = null) {
        if (!EzString.stringHasLength(eventName)) {
            throw new EzBadParamException(
                'eventName',
                EzSpinner2.ezInstance,
                EzSpinner2.ezInstance.ezStartPageWaitUntilEvent);
        }

        EzSpinner2.ezInstance.ezFullPageSpinnerConfiguration.ezWaitMessage = waitMessage;

        EzSpinner2.ezInstance.ezStart(EzSpinner2.ezInstance.ezFullPageSpinnerConfiguration);

        ezApi.ezclocker.ezEventEngine.ezWantEvent(
            eventName,
            EzSpinner2.ezApiName,
            () => {
                ezApi.ezclocker.ezEventEngine.ezUnwantEvent(
                    eventName,
                    EzSpinner2.ezApiName);

                EzSpinner2.ezInstance.ezStop(EzSpinner2.ezInstance.ezFullPageSpinnerConfiguration.ezId);

                if (EzFunction.isFunction(afterWaitFunction)) {
                    return afterWaitFunction.apply();
                }
            });
    }

    /**
        @public @method
        @param {string} waitMessage
        @param {function} waitActionFunction
        @returns {Promise.resolve}
     */
    ezPageWaitAsync(waitMessage, waitActionFunction) {
        if (!EzFunction.isFunction(waitActionFunction)) {
            throw new EzBadParamException(
                'waitActionFunction',
                EzSpinner2.ezInstance,
                EzSpinner2.ezInstance.ezStartPageWaitResolve);
        }

        EzSpinner2.ezInstance.ezFullPageSpinnerConfiguration.ezWaitMessage = waitMessage;

        EzSpinner2.ezInstance.ezStart(EzSpinner2.ezInstance.ezFullPageSpinnerConfiguration);

        return EzPromise.asyncAction(
            (finished) => waitActionFunction(
                () => {
                    EzSpinner2.ezInstance.ezStop(EzSpinner2.ezInstance.ezFullPageSpinnerConfiguration.ezId);

                    return finished(arguments);
                }));
    }

    /**
        @public @method
        @param {string} waitMessage
        @param {function} waitActionFunction
        @returns {Promise.resolve}
        @deprecated
        Migrate to ezApi.ezSpinner.ezPageWaitAsync(waitMessage, waitActionFunction)
     */
    ezStartPageWaitResolve(waitMessage, waitActionFunction) {
        return EzSpinner2.ezInstance.ezPageWaitAsync(waitMessage, waitActionFunction);
    }

    /**
        @public @method
        Starts a visible spinner
        @param {string} waitMessage
        @param {function} waitActionFunction
        @returns {Promise.resolve}
        @deprecated
        Migrate to ezApi.ezSpinner.ezPageWaitAsync(waitMessage, waitActionFunction)
     */
    ezStartWait(waitMessage, waitActionFunction) {
        return EzSpinner2.ezInstance.ezPageWaitAsync(waitMessage, waitActionFunction);
    }

    /**
        @public @method
        Hides and removes the spinner UX associated with the provided spinnerId (if it is injected and visible)
        @param {string} spinnerId
        @returns {Promise.resolve}
     */
    ezStop(spinnerId) {
        if (!EzString.stringHasLength(spinnerId)) {
            throw new EzBadParamException(
                'spinnerId',
                EzSpinner2.ezInstance,
                EzSpinner2.ezInstance.ezStop);
        }

        if (!EzObject.isValid(EzSpinner2.ezInstance.ezActiveFullPageSpinner)) {
            return;
        }

        EzSpinner2.ezInstance.ezActiveFullPageSpinner.ezClose();
    }

    /**
        @public @method
        Stops and removes the spinner assocaited with the provided id.
        @param {string} spinnerId
        @deprecated
        Migrate to ezApi.ezclocker.ezSpinner.ezStop(spinnerId);
     */
    ezStopPageWait(spinnerId) {
        EzSpinner2.ezInstance.ezStop(spinnerId);
    }

    /**
        @public @method
        Stops the page wait spinner no matter how many times the ezStartPageWait() method was called.
        @deprecated
        Migrate to ezApi.ezclocker.ezSpinner.ezStop(spinnerId);
     */
    ezForceStopPageWaitSpinner() {
        EzSpinner2.ezInstance.ezStop(spinnerId);
    }

    /**
        @public
        Stops a visible spinner
        @param {string} spinnerI
        @returns {Promise.resolve}
        @deprecated
        Migrate to ezApi.ezclocker.ezSpinner.ezStop(spinnerId);
     */
    ezStopWait(spinnerId) {
        EzSpinner2.ezInstance.ezStop(spinnerId);
    }
}
