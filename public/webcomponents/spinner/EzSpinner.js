import {
    EzBadParamException
} from '/ezlibrary/exceptions/EzExceptions.js';

import {
    EzObject,
    EzNumber,
    EzString,
    EzArray,
    EzFunction,
    EzPromise,
    EzHtml,
    EzJson
} from '/ezlibrary/helpers/EzHelpers.js';

import {
    EzRegistrationState,
    EzElementEventName
} from '/ezlibrary/enums/EzEnumerations.js';

import { EzSpinnerType } from '/public/webcomponents/spinner/EzSpinnerType.js';

import { EzEventEngine } from '/ezlibrary/ez-event-engine.js';

import { EzClass } from '/ezlibrary/EzClass.js';

/**
 * @class
 * @extends {EzClass}
 * @description
 * Provides spinners to the UX
 * ---------------------------------------------------------------------
 *     import { EzSpinner } from '/public/webcomponents/spinner/ez-spinner.js';
 * ---------------------------------------------------------------------
 *     globalThis.ezApi.ezclocker[EzSpinner.ezApiName] &&
 *         globalThis.ezApi.ezclocker[EzSpinner.ezApiName].ready
 * ---------------------------------------------------------------------
 *     document.addEventListener(
 *         EzSpinner.ezEventNames.onReady,
 *         this.#ezRegistrator);
 * ---------------------------------------------------------------------
 */
export class EzSpinner extends EzClass {
    /**
     * @static
     * @public @method
     * Builds the bar loader image HTML
     * Bar is orange/white moving left to right
     * Size: 16px x 16px
     * @returns {string}
     */
    static ezBuildBarLoader() {
        return EzHtml.build`
            <img
                id="EzSnakeSpinner"
                src="/public/images/spinners/orange-bar-loader.gif"
                style="height:16px;width:16px"/>`;
    }

    /**
     * @static
     * @public @method
     * Builds the line loader image HTML
     * Bar is orange moving left to right
     * Size: 24px x 4px
     * @returns {string}
     */
    static ezBuildLineLoader() {
        return EzHtml.build`
            <img
                id="EzSnakeSpinner"
                src="/public/images/spinners/orange-bar-loader.gif"
                style="width:24px;height:4px"/>`;
    }

    /**
     * @static
     * @public @method
     * Builds the small infinity spinner image HTML
     * Description: Infinity is orange with tansparent background
     * Size: 34px x 34px
     * Type: GIF
     * @returns {string}
     */
    static ezBuildSmallInfinitySpinner() {
        return EzHtml.build`
            <img
                id="EzSnakeSpinner"
                src="/public/images/spinners/infinity-small.gif"
                style="width:34px;height:34px"/>`;
    }

    /**
     * @static
     * @public @method
     * Builds the line spinner html
     * Description: Spinner is orange with transparent background
     * Size: variable (default 52px)
     * Type: SVG
     * @param {number} height
     * Default is: 52px
     * @returns {string}
     */
    static ezBuildLineSpinner(height) {
        return EzHtml.build`
            <img
                id="EzSnakeSpinner"
                src="/public/images/spinners/line-spinner-orange.svg"
                style="height:${EzNumber.numberOrDefault(height, 52)}px"/>`;
    }

    /**
     * @static
     * @public @method
     * Builds the 'loading snake' spinner html
     * Description: Snake spinner with transparent background
     * Size: variable, default is 52px
     * Type: SVG
     * @param {number} height
     * Default is: 52px
     * @param {string} color
     * Acceptable values: orange, white, black
     * Default: orange
     * @returns {string}
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
     * @static
     * @public @method
     * Builds the infinity spinner html
     * Description: Orange infinity with transparent background
     * Size: Variable (default is 52px)
     * Type: SVG
     * @param {number} height
     * Default is: 52px
     * @returns {string}
     */
    static ezBuildInfinitySpinner(height) {
        return EzHtml.build`
            <img
                id="EzSnakeSpinner"
                src="/public/images/spinners/Infinity-200px.svg"
                style="height:${EzNumber.numberOrDefault(height, 52)}px"/>`;
    }

    /**
     * @static
     * @public @method
     * Builds the gear spinner html
     * Description:
     * The black or white gear spinner has short gears, narrow open center, transparent background
     * The orange gear spinner has long gears, wide open center, transparent background
     * Size: Variable (default is 52px)
     * Type: SVG
     * @param {number} height
     * Default is: 52px
     * @param {string} color
     * Accepted values: black, white, orange
     * @returns {string}
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
     * @public @field
     * Represents the default spinner options
     * @type {object}
     */
    get DEFAULT_OPTIONS() {
        return {
            id: EzSpinnerType.ezSpinnerConfig(EzSpinnerType.LINE_SPINNER_SVG).id,
            spinner: EzSpinnerType.ezSpinnerConfig(EzSpinnerType.LINE_SPINNER_SVG),
            message: 'Please wait ...',
            containerSelector: 'body'
        };
    }

    /**
     * @private @field
     * Stores an array of references to the active spinners.
     * Default: []
     * @type {array}
     */
    #activeSpinners = [];
    /**
     * @public @property @getter
     * Gets an array of references to the active spinners.
     * @returns {array}
     */
    get activeSpinners() {
        return this.#activeSpinners;
    }
    /**
     * @public @property @setter
     * Sets an array of references to the active spinners.
     * @param {undefined|null|array} activeSpinners
     * Default: []
     */
    set activeSpinners(activeSpinners = []) {
        if (!EzArray.isArray(activeSpinners)) {
            throw new EzBadParamException(
                'activeSpinners',
                this,
                'set activeSpinners(activeSpinners = [])');
        }

        this.#activeSpinners = EzArray.arrayOrEmpty(activeSpinners);
    }

    /**
     * @private @field
     * Stores the map of each spinner's unique options.id to number of start calls (without corresponding stop calls)
     * @type {object}
     * Default: {}
     */
    #startWaitCount = {};
    /**
     * @public @property @getter
     * Gets the map of each spinner's unique options.id to number of start calls (without corresponding stop calls)
     * @returns {object}
     */
    get startWaitCount() {
        return this.#startWaitCount;
    }
    /**
     * @public @property @setter
     * Sets the map of each spinner's unique options.id to number of start calls (without corresponding stop calls)
     * @param {undefined|null|object} startWaitCountMap
     * Default: {}
     */
    set startWaitCount(startWaitCountMap = {}) {
        if (!EzObject.isValid(startWaitCountMap)) {
            throw new EzBadParamException(
                'startWaitCountMap',
                this,
                'set startWaitCount(startWaitCountMap)');
        }

        for (let optionId of startWaitCountMap) {
            if (EzString.hasLength(optionId)) {
                this.#startWaitCount[optionId] = startWaitCountMap[optionId];
            }
        }
    }

    /**
     * @public @field
     * Stores the number of page wait calls (without corresponding page wait stop calls)
     * @type {number}
     * Default: 0
     */
    #pageWaitCount = 0;
    /**
     * @public @property @getter
     * Gets the number of page wait calls (without corresponding page wait stop calls)
     * @returns {number}
     */
    get pageWaitCount() {
        return this.#pageWaitCount;
    }
    /**
     * @public @property @setter
     * Sets the number of page wait calls (without corresponding page wait stop calls)
     * @param {undefined|null|number} pageWaitCount
     * Default: 0
     */
    set pageWaitCount(pageWaitCount = 0) {
        if (!EzNumber.isNumber(pageWaitCount)) {
            throw new EzBadParamException(
                'pageWaitCount',
                this,
                'set pageWaitCount(pageWaitCount)');
        }

        this.#pageWaitCount = 0 <= pageWaitCount
            ? pageWaitCount
            : 0;
    }

    /**
     * @public @method
     * Initializes EzSpinner
     * @returns {EzSpinner}
     */
    ezInit() {
        return EzSpinner.ezInstance;
    }

    /**
     * @public @method
     * Sanitizes the options to make sure all required properties are available or set to default.
     * @param {undefined|null|object} options
     * Default: EzSpinner.ezInstance.DEFAULT_OPTIONS
     */
    ezSanitizeOptions(spinnerOptions = EzSpinner.ezInstance.DEFAULT_OPTIONS) {
        if (!EzObject.isValid(spinnerOptions)) {
            return EzSpinner.ezInstance.DEFAULT_OPTIONS;
        }

        return {
            id: EzObject.isValid(spinnerOptions.id)
                ? spinnerOptions.id
                : EzSpinner.ezInstance.DEFAULT_OPTIONS.id,
            spinner: EzObject.isValid(spinnerOptions.spinner)
                ? spinnerOptions.spinner
                : EzSpinner.ezInstance.DEFAULT_OPTIONS.spinner,
            message: EzObject.isValid(spinnerOptions.message)
                ? spinnerOptions.message
                : EzSpinner.ezInstance.DEFAULT_OPTIONS.message,
            containerSelector: EzObject.isValid(spinnerOptions.containerSelector)
                ? spinnerOptions.containerSelector
                : EzSpinner.ezInstance.DEFAULT_OPTIONS.containerSelector
        };
    }

    /**
     * @protected @method
     * Builds the spinner box HTML ux using the provided options and ids.
     * @param {string} spinnerId
     * @param {string} spinnerWindowId
     * @param {string} spinnerMessageId
     * @param {object} options
     * @returns {string}
     */
    ezBuildSpinnerBox(fullSpinnerId, spinnerWindowId, spinnerMessageId, spinnerOptions) {
        if (!EzString.hasLength(fullSpinnerId)) {
            throw new EzBadParamException(
                'fullSpinnerId',
                EzSpinner.ezInstance,
                EzSpinner.ezInstance.ezBuildSpinnerBox);
        }
        if (!EzString.hasLength(spinnerWindowId)) {
            throw new EzBadParamException(
                'spinnerWindowId',
                EzSpinner.ezInstance,
                EzSpinner.ezInstance.ezBuildSpinnerBox);
        }
        if (!EzString.hasLength(spinnerMessageId)) {
            throw new EzBadParamException(
                'spinnerMessageId',
                EzSpinner.ezInstance,
                EzSpinner.ezInstance.ezBuildSpinnerBox);
        }
        if (!EzObject.isValid(spinnerOptions)) {
            throw new EzBadParamException(
                'spinnerOptions',
                EzSpinner.ezInstance,
                EzSpinner.ezInstance.ezBuildSpinnerBox);
        }

        let spinnerAssetWidth = EzNumber.isNumber(spinnerOptions?.spinner?.width) || EzString.hasLength(spinnerOptions?.spinner?.width)
            ? spinnerOptions.spinner.width
            : '172px';

        let spinnerAssetHeight = EzNumber.isNumber(spinnerOptions?.spinner?.height) || EzString.hasLength(spinnerOptions?.spinner?.height)
            ? spinnerOptions.spinner.height
            : '172px'

        let spinnerAssetMaxWidth = EzNumber.isNumber(spinnerOptions?.spinner?.maxWidth) || EzString.hasLength(spinnerOptions?.spinner?.maxWidth)
            ? spinnerOptions.spinner.maxWidth
            : spinnerAssetWidth;

        let spinnerAssetMinWidth = EzNumber.isNumber(spinnerOptions?.spinner?.minWidth) || EzString.hasLength(spinnerOptions?.spinner?.minWidth)
            ? spinnerOptions.spinner.minWidth
            : spinnerAssetWidth;

        let spinnerWindowImageUrl = EzString.hasLength(spinnerOptions?.spinner?.assetUrl)
            ? spinnerOptions.spinner.assetUrl
            : EzSpinner.ezInstance.DEFAULT_OPTIONS.spinner.assetUrl;

        let spinnerWindowMessage = EzString.hasLength(spinnerOptions.message)
            ? spinnerOptions.message
            : 'Please wait ...';

        return EzHtml.build`
            <div
                id="${fullSpinnerId}"
                style="background-color:rgba(0,0,0,0.3);position:fixed;height:100%;z-index:999999;">
                <style
                    id="${fullSpinnerId}_Styles">
                    .spinnerWindow {
                        display: none;
                        padding: 8px;
                        background-color: var(--ezAlphaBackgroundWhite4);
                        color: var(--ezClockerBlack);
                        font-size: 24pt;
                        text-align: center;
                        box-shadow: var(--ezBlackThickBottomShadow);
                    }
                   .spinnerAsset {
                        margin: 0px;
                        padding: 0px;
                        max-width: ${spinnerAssetMaxWidth}px;
                        min-width: ${spinnerAssetMinWidth}px;
                        width: ${spinnerAssetWidth}px;
                        height: ${spinnerAssetHeight}px;
                        text-align: center;
                        vertical-align: middle;
                    }
                   .spinnerMessage {
                        margin: 0px;
                        padding: 0px;
                        color: var(--ezClockerBlack);
                        font-size: 24pt;
                        text-align: center;
                    }
                </style>
                <div
                    id="${spinnerWindowId}"
                    class="spinnerWindow">
                    <img
                        id="${spinnerWindowId}_Image"
                        class="spinnerAsset"
                        align="center"
                        src="${spinnerWindowImageUrl}"/>
                    <span
                        id="${spinnerMessageId}">
                        ${spinnerWindowMessage}
                    </span>
                </div>
            </div>`;
    }

    /**
     * @protected @method
     * Registers an active spinner
     * @param {undefined|null|object} options
     * @returns {Promise.resolve}
     * Resolve contains the spinnerId
     */
    ezRegisterActiveSpinner(options) {
        if (!EzObject.isValid(options)) {
            options = EzSpinner.ezInstance.DEFAULT_OPTIONS;
        }

        if (!EzString.hasLength(options.id)) {
            throw new EzBadParamException(
                'options.id',
                EzSpinner.ezInstance,
                EzSpinner.ezInstance.ezRegisterActiveSpinner);
        }

        return EzPromise.asyncAction(
            (finished) => {
                let ezSpinnerMessageId = EzSpinner.ezInstance.ezGenerateSpinnerMessageId(options.id);

                if (!EzObject.isValid(EzSpinner.ezInstance.activeSpinners[options.id])) {
                    EzSpinner.ezInstance.activeSpinners[options.id] = options;

                    let fullSpinnerId = EzSpinner.ezInstance.ezGenerateFullSpinnerId(options.id);

                    let ezSpinnerWindowId = EzSpinner.ezInstance.ezGenerateSpinnerWindowId(options.id);

                    ezApi.ezclocker.ezUi.ezPrependContent(
                        options.containerSelector,
                        EzSpinner.ezInstance.ezBuildSpinnerBox(
                            fullSpinnerId,
                            ezSpinnerWindowId,
                            ezSpinnerMessageId,
                            options));

                    EzSpinner.ezInstance.ezResizeSpinnerToWindow(options.id);

                    // Hook window resize event to make sure the spinner size stays the same
                    ezApi.ezclocker.ezEventEngine.ezWantElementEvent(
                        'window',
                        EzElementEventName.RESIZE,
                        fullSpinnerId,
                        () => EzSpinner.ezInstance.ezResizeSpinnerToWindow(options.id));

                    ezApi.ezclocker.ezUi.ezShow(ezSpinnerWindowId);

                    return finished(fullSpinnerId);
                }

                // Update the existing spinner UX message instead
                ezApi.ezclocker.ezUi.ezSetContent(
                    ezSpinnerMessageId,
                    EzString.stringOrEmpty(options.message));

                return finished(options.id);
            });
    }

    /**
     * @protected @method
     * Returns the spinner window container's id
     * Template: '{EzSpinner.ezInstance.ezGenerateFullSpinnerId(spinnerId)}_Window'
     * @returns {string}
     */
    ezGenerateSpinnerWindowId(spinnerId) {
        if (!EzString.hasLength(spinnerId)) {
            throw new EzBadParamException(
                'spinnerId',
                EzSpinner.ezInstance,
                EzSpinner.ezInstance.ezGenerateSpinnerWindowId);
        }

        return `${EzSpinner.ezInstance.ezGenerateFullSpinnerId(spinnerId)}_Window`;
    }

    /**
     * @protected @method
     * Returns the spinner message container's id
     * Template: '{EzSpinner.ezInstance.ezGenerateFullSpinnerId(spinnerId)}_Message'
     * @returns {string}
     */
    ezGenerateSpinnerMessageId(spinnerId) {
        if (!EzString.hasLength(spinnerId)) {
            throw new EzBadParamException(
                'spinnerId',
                EzSpinner.ezInstance,
                EzSpinner.ezInstance.ezGenerateSpinnerMessageId);
        }

        return `${EzSpinner.ezInstance.ezGenerateFullSpinnerId(spinnerId)}_Message`;
    }

    /**
     * @protected @method
     * Generates the spinner's HTML container id
     * Template: '_EzSpinner_{spinnerId}'
     * @returns {string}
     */
    ezGenerateFullSpinnerId(spinnerId) {
        if (!EzString.hasLength(spinnerId)) {
            throw new EzBadParamException(
                'spinnerId',
                EzSpinner.ezInstance,
                EzSpinner.ezInstance.ezGenerateFullSpinnerId);
        }

        return `_EzSpinner_${spinnerId}`;
    }

    /**
     * @protected @method
     * Resizes the spinner when the container resizes
     * @param {string} spinnerId
     */
    ezResizeSpinnerToWindow(spinnerId) {
        if (!EzString.hasLength(spinnerId)) {
            throw new EzBadParamException(
                'spinnerId',
                EzSpinner.ezInstance,
                EzSpinner.ezInstance.ezResizeSpinnerToWindow);
        }

        let options = EzSpinner.ezInstance.activeSpinners[spinnerId];

        if (!EzObject.isValid(options)) {
            return; // nothing to resize
        }

        let fullSpinnerId = EzSpinner.ezInstance.ezGenerateFullSpinnerId(options.id);

        let spinnerWindowId = EzSpinner.ezInstance.ezGenerateSpinnerWindowId(options.id);

        // Adjust the sizing
        let cHeight = window.innerHeight;

        if (0 == cHeight) {
            return; // nothing to resize into
        }

        let sHeight = options.spinner.height;

        let position = {
            top: `${parseInt((cHeight / 2) - (sHeight / 2))}px`,
        };

        ezApi.ezclocker.ezUi.ezId(fullSpinnerId)
            .width(window.innerWidth);

        ezApi.ezclocker.ezUi.ezId(spinnerWindowId)
            .css({
                'margin-top': position.top
            });
    }

    /**
     * @protected @method
     * Injects a spinner into the UX
     * @param {Object|null} options
     * @returns {Promise.resolve)
     * Resolve contains the spinner's id
     */
    ezStart(options) {
        return EzSpinner.ezInstance.ezRegisterActiveSpinner(
            EzSpinner.ezInstance.ezSanitizeOptions(options));
    }

    /**
     * @protected @method
     * Removes an existing spinner from the UX
     * @param {string} spinnerId
     * @returns {Promise.resolve}
     * Resolve returns the spinnerId provided
     */
    ezStop(spinnerId) {
        if (!EzString.hasLength(spinnerId)) {
            throw new EzBadParamException(
                'spinnerId',
                EzSpinner.ezInstance,
                EzSpinner.ezInstance.ezStop);
        }

        return EzPromise.asyncAction(
            (finished) => {
                let aSpinner = EzSpinner.ezInstance.activeSpinners[spinnerId];

                if (!EzObject.isValid(aSpinner)) {
                    // No active spinner with the id, must already be closed.
                    return finished(spinnerId);
                }

                let fullSpinnerId = EzSpinner.ezInstance.ezGenerateFullSpinnerId(spinnerId);

                ezApi.ezclocker.ezUi.ezUnHookElementEvent(
                    EzSpinner.ezInstance.activeSpinners[spinnerId].containerSelector,
                    'resize');

                ezApi.ezclocker.ezEventEngine.ezUnwantElementEvent(
                    'window',
                    EzElementEventName.RESIZE,
                    fullSpinnerId);

                // Remove the spinner html
                ezApi.ezclocker.ezUi.ezRemoveElement(fullSpinnerId);

                delete EzSpinner.ezInstance.activeSpinners[aSpinner.id];

                return finished(aSpinner.id);
            });
    }

    /**
     * @public @method
     * Starts the full page wait spinner. After the spinner starts, a new Promise is created using the provided
     * functionToExecute reference. The functionToExecute call passes the two normal Promise params of resolve and reject.
     * However, a third param is also passed known as the waitDone function callback. The waitDone param is a reference to a
     * function that is called to hide the spinner after all work is complete. See example code below.
     *
     * Example Uses:
     *      return ezApi.ezclocker.ezSpinner.ezStartPageWaitPromise(
     *          'Please wait ...',
     *          (resolve, reject, waitDone) => ezApi.ezclocker.ezHttp.ezGet('https://ezclocker.com/api/v1/employees/100')
     *              .then(
     *                  (response) => waitDone()
     *                      .then(
     *                          () => resolve(response))),
     *                  (eResponse) => waitDone()
     *                      .then(
     *                          () => reject(eResponse)));
     *
     *      return ezApi.ezclocker.ezSpinner.ezStartPageWaitPromise(
     *          'Please wait ...',
     *          (resolve, reject, waitDone) => ezApi.ezclocker.ezHttp.ezGet('https://ezclocker.com/api/v1/employees/100')
     *              .then(
     *                  () => EzPromise.waitDoneThenIgnore(waitDone),
     *                  () => EzPromise.waitDoneThenIgnore(waitDone)));
     *
     * @param {string} message
     * Wait message to display
     * @param {function} functionToExecute
     * Function to execute while waiting using format:
     * function (waitDone, resolve, reject) {
     *     waitDone
     *     return {resolve|reject}();
     * }
     * @returns {Promise}
     */
    ezPageWaitPromise(message, functionToExecute) {
        if (!EzFunction.isFunction(functionToExecute)) {
            throw new EzBadParamException(
                'functionToExecute',
                EzSpinner.ezInstance,
                EzSpinner.ezInstance.ezPageWaitPromise);
        }

        try {
            EzSpinner.ezInstance.pageWaitCount++;

            let options = EzSpinner.ezInstance.DEFAULT_OPTIONS;

            options.message = EzString.stringWithLengthOrDefault(
                message,
                EzSpinner.ezInstance.DEFAULT_OPTIONS.message);

            return EzSpinner.ezInstance.ezStart(options)
                .then(
                    () => EzPromise.promise(
                        (resolve, reject) => functionToExecute(
                            () => ezApi.ezclocker.ezSpinner.ezStopPageWait()
                                .then(
                                    () => resolve(...arguments)),
                            () => ezApi.ezclocker.ezSpinner.ezStopPageWait()
                                .then(
                                    () => reject(...arguments)))));
        } catch (err) {
            let error = {
                errorCode: 500,
                message: EzObject.isValid(err) && EzString.hasLength(err.message)
                    ? err.message
                    : 'No additional details provided.',
                err: EzObject.isValid(err)
                    ? err
                    : null
            };

            ezApi.ezclocker.ezLogger.error(
                EzString.em`
                    Unable to succesfully execute EzSpinner.ezStartPageWaitPromise.
                    Error reported: ${ezApi.ezToJson(error)}`);

            EzSpinner.ezInstance.ezStopPageWait()
                .then(
                    () => {
                        throw error;
                    });
        }
    }

    /**
     * @public @method
     * Updated page wait resolve method that removes the need to call the waitDone() function.
     * If the functionToExecute param is not a valid function, then the simple Promise.resolve() is returned. Otherwise:
     * 1) Creates a new promise calling functionToExecute
     * 2) The resolve function is passed as the first param to the functionToExecute.
     * 3) When functionToExecute execution then calls the resolve():
     *      1) The full page spinner is stopped.
     *      2) Returns the result of the TRUE promise resolve() callback passing the params of the
     *          functionToExecute execution's call to it's resolve() function.
     * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
     * Example Use:
     *  return ezApi.ezclocker.ezSpinner.ezPageWaitResolve(
     *      'Please wait ...',
     *      (resolve) => {
     *          // Perform some actions ...
     *
     *          // When spinner needs to stop, simply return the call to resolve
     *          return resolve();
     *      });
     * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
     * @param {string} message
     * @param {function} functionToExecute
     * @returns {Promise}
     */
    ezPageWaitResolve(message, functionToExecute) {
        if (!EzFunction.isFunction(functionToExecute)) {
            return EzPromise.resolve();
        }

        try {
            EzSpinner.ezInstance.pageWaitCount++;

            let options = EzSpinner.ezInstance.ezSanitizeOptions();

            options.message = EzString.stringOrEmpty(message);

            return EzSpinner.ezInstance.ezStart(options)
                .then(
                    () => EzPromise.asyncAction(
                        (finished) => functionToExecute(
                            (...args) => {
                                return EzSpinner.ezInstance.ezWaitDoneResolver(finished, args);
                            })));
        } catch (err) {
            let error = {
                errorCode: 500,
                message: EzObject.isValid(err) && EzString.hasLength(err.message)
                    ? err.message
                    : 'No additional details provided.',
                err: EzObject.isValid(err)
                    ? err
                    : null
            };

            ezApi.ezclocker.ezLogger.error(
                EzString.em`
                    Unable to successfully execute EzSpinner.ezStartPageWaitResolve.
                    Error reported: ${ezApi.ezToJson(error)}`);

            EzSpinner.ezInstance.ezStopPageWait()
                .then(
                    () => {
                        throw error;
                    });
        }
    }

    /**
     * @public @method
     * Replaces the ezApi.ezSpinner.ezStartPageWaitExecute() method. The functionality is the same.
     * If the functionToExecute param is not a valid function, returns undefined.
     * 1) Starts the full page wait spinner.
     * 2) Call to the provided functionToExecute passing the waitDone param
     * 3) Returns the result of the functionToExecute call.
     *
     * Example Usages:
     *
     * return ezApi.ezclocker.ezSpinner.ezPageWaitExecute(
     *  'Please wait ...',
     *      (waitDone) => {
     *          // ... do some work here ...
     *
     *          // Call the provided waitDone() callback to close the spinner.
     *          return waitDone()
     *              .then(
     *                  () => {
     *                  // Nothing to do
     *               });
     *      });
     *
     * return ezApi.ezclocker.ezSpinner.ezPageWaitExecute(
     *      'Please wait ...',
     *      (waitDone) => {
     *          // ... do some work here ...
     *
     *          // Call the provided waitDone() callback to close the spinner.
     *          return EzPromise.waitDoneThenIgnore(waitDone);
     *      });
     *
     * @param {string} message
     * @param {function} functionToExecute
     * @returns {Promise.resolve}
     */
    ezPageWaitExecute(message, functionToExecute) {
        if (!EzFunction.isFunction(functionToExecute)) {
            throw new EzBadParamException(
                'functionToExecute',
                EzSpinner.ezInstance,
                EzSpinner.ezInstance.ezPageWaitExecute);
        }

        EzSpinner.ezInstance.pageWaitCount++;

        let spinnerOptions = EzSpinner.ezInstance.DEFAULT_OPTIONS;

        spinnerOptions.message = EzString.stringWithLengthOrDefault(
            message,
            EzSpinner.ezInstance.DEFAULT_OPTIONS.message);

        return EzSpinner.ezInstance.ezStart(spinnerOptions)
            .then(
                () => functionToExecute(EzSpinner.ezInstance.ezStopPageWait));
    }

    /**
     * @public @method
     * Starts the page wait spinner until a specific event is triggered. Then the spinner is hidden
     * @param {string} message
     * @param {string} eventName
     * @param {undefined|null|function} optionalThenExecuteFunction
     */
    ezStartPageWaitUntilEvent(message, eventName, optionalThenExecuteFunction = null) {
        if (!EzString.hasLength(eventName)) {
            throw new EzBadParamException(
                'eventName',
                this,
                this.ezStartPageWaitUntilEvent);
        }

        return EzSpinner.ezInstance.ezStartPageWait(
            message,
            (waitDone) => {
                ezApi.ezclocker.ezEventEngine.ezWantEvent(
                    eventName,
                    EzSpinner.ezApiName,
                    () => {
                        ezApi.ezclocker.ezEventEngine.ezUnwantEvent(
                            eventName,
                            EzSpinner.ezApiName);

                        return waitDone()
                            .then(
                                () => {
                                    if (EzFunction.isFunction(optionalThenExecuteFunction)) {
                                        return thenExecuteFunction(...arguments);
                                    }
                                });
                    });
            });
    }

    /**
     * @public @method
     * Starts the full page wait spinner. After the spinner starts, the functionToExecute function is called (if provided).
     * The first param passed to that function (known as waitDone function callback) is a reference to a callback function
     * that you will call (after all work is complete) to stop and hide the spinner. See example code below:
     *
     * Example:
     *  <code>
     *      ezApi.ezclocker.ezSpinner.ezStartPageWait(
     *          'Please wait ...',
     *          (waitDone) => ezApi.ezclocker.ezHttpHelper.ezGet('https://ezclocker.com/api/v1/employees/100)
     *              .then(
     *                  (response) => {
     *                      // do something with employees
     *
     *                      return waitDone();
     *                  },
     *              (eResponse) {
     *                  ezApi.ezclocker.logger.error(
     *                      EzString.em`
     *                          Failed to do something.
     *                          Error: ${EzJson.toJson(eResponse)}`);
     *
     *                  return waitDone();
     *              }));
     * </code>
     * @param {undefined|null|string} message
     * @param {undefined|null|function} functionToExecute
     * @returns {Promise.resolve}
     * Promise.resolve contains the result from the call to the provided functionToExecute (if available)
     */
    ezStartPageWait(message, functionToExecute = null, thisRef = this) {
        return EzPromise.asyncAction(
            (finished) => {
                let spinnerOptions = EzSpinner.ezInstance.DEFAULT_OPTIONS;

                spinnerOptions.message = EzString.stringWithLengthOrDefault(
                    message,
                    EzSpinner.ezInstance.DEFAULT_OPTIONS.message);

                EzSpinner.ezInstance.pageWaitCount++;

                return EzSpinner.ezInstance.ezStart(spinnerOptions)
                    .then(
                        () => EzFunction.isFunction(functionToExecute)
                            // Perform call back if provided
                            ? finished(
                                functionToExecute.apply(
                                    EzObject.assignOrDefault(
                                        thisRef,
                                        this),
                                    [
                                        EzSpinner.ezInstance.ezStopPageWait
                                    ]))
                            : finished());
            });
    }

    /**
     * @public @method
     * Starts the full page wait spinner. After the spinner starts, a new Promise is created using the provided
     * functionToExecute reference. The functionToExecute call passes the two normal Promise params of resolve and reject.
     * However, a third param is also passed known as the waitDone function callback. The waitDone param is a reference to a
     * function that is called to hide the spinner after all work is complete. See example code below.
     *
     * Example usage:
     *
     * return ezApi.ezclocker.ezSpinner.ezStartPageWaitPromise(
     *      'Please wait ...',
     *      (resolve, reject, waitDone) => ezApi.ezclocker.ezHttp.ezGet('https://ezclocker.com/api/v1/employees/100')
     *          .then(
     *              (response) => {
     *                  // ... do something with the response ...
     *
     *                  return waitDone()
     *                      .then(
     *                          () => resolve());
     *              }),
     *      (eResponse) => waitDone()
     *          .then(
     *              () => {
     *                  // ... do something with the reject ...
     *
     *                  return waitDone()
     *                      .then(
     *                          () -> reject());
     *              });
     * @param {string} message
     * Wait message to display
     * @param {function} functionToExecute
     * Function to execute while waiting
     * Example function:
     *      function(waitDone, resolve, reject) {
     *          waitDone();
     *
     *          return {resolve|reject}();
     *      }
     * @returns {Promise}
     */
    ezStartPageWaitPromise(message, functionToExecute) {
        return EzPromise.promise(
            (resolve, reject) => {
                try {
                    if (!EzFunction.isFunction(functionToExecute)) {
                        return reject(
                            ezApi.ezCreateErrorResponse(
                                500,
                                'Unable to start a promise page wait without a function to execute during the wait!',
                                {
                                    pageWaitMessage: message
                                }));
                    }

                    EzSpinner.ezInstance.pageWaitCount++;

                    let spinnerOptions = EzSpinner.ezInstance.DEFAULT_OPTIONS;

                    spinnerOptions.message = EzString.stringWithLengthOrDefault(
                        message,
                        EzSpinner.ezInstance.DEFAULT_OPTIONS.message);

                    return EzSpinner.ezInstance.ezStart(spinnerOptions)
                        .then(
                            () => functionToExecute(
                                EzSpinner.ezInstance.ezStopPageWait,
                                resolve,
                                reject));
                } catch (err) {
                    let error = {
                        errorCode: 500,
                        message: EzString.stringWithLengthOrDefault(
                            err?.message,
                            'No error message provided.'),
                        err: err
                    };

                    ezApi.ezclocker.ezLogger.error(
                        EzString.em`
                            An unexpected exception occurred while executing EzSpinner.ezStartPageWaitPromise.
                            Error: ${EzJson.toJson(error)}`);

                    return EzSpinner.ezInstance.ezStopPageWait()
                        .then(
                            () => {
                                throw error;
                            });
                }
            });
    }

    /**
     * @public @method
     * Starts the full page wait spinner. After the spinner starts, a new Promise is created using the provided
     * functionToExecute reference. The functionToExecute call passes the only the resolve param for the promise
     * and a param known as the waitDone function callback. The waitDone param is a reference to a
     * function that is called to hide the spinner after all work is complete. See example code below.
     * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
     * Example Code:
     *  return ezApi.ezclocker.ezSpinner.ezPageWaitAsync(
     *      'Please wait ...',
     *      (waitDone, finished) => {
     *          // .. perform some actions here..
     *          // .. more actions ...
     *
     *          // When done and spinner should stop:
     *          return waitDone().then(finished);
     *      });
     * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
     * @param {string} message
     * @param {undefined|null|function} functionToExecute
     * @returns {Promise.resolve}
     * @deprecated
     * Migrate to the new ezApi.ezSpinner.ezPageWaitResolve(message, functionToExecute) method and no longer
     * have the requirement to call waitDone() to stop the spinner!
     */
    ezStartPageWaitResolve(message, functionToExecute = null) {
        return EzPromise.asyncAction(
            (finished) => {
                if (!EzFunction.isFunction(functionToExecute)) {
                    return finished();
                }

                try {
                    EzSpinner.ezInstance.pageWaitCount++;

                    let spinnerOptions = EzSpinner.ezInstance.DEFAULT_OPTIONS;

                    spinnerOptions.message = EzString.stringWithLengthOrDefault(
                        message,
                        EzSpinner.ezInstance.DEFAULT_OPTIONS.message);

                    // ezStart returns a resolve only promise
                    return EzSpinner.ezInstance.ezStart(spinnerOptions)
                        .then(
                            () => functionToExecute(EzSpinner.ezInstance.ezStopPageWait, finished));
                } catch (err) {
                    let error = {
                        errorCode: 500,
                        message: EzString.stringWithLengthOrDefault(
                            err?.message,
                            'No error message provided.'),
                        err: err
                    };

                    ezApi.ezclocker.ezLogger.error(
                        EzString.em`
                            An unexpected exception occurred while executing EzSpinner.ezStartPageWaitResolve.
                            Error: ${EzJson.toJson(error)}`);

                    EzSpinner.ezInstance.ezStopPageWait()
                        .then(
                            () => {
                                throw error;
                            });
                }
            });
    }

    /**
     * @public @method
     * Warning: not yet tested
     * @param {string} message
     * @param {function} functionToExecute
     * @returns {Promise.resolve}
     */
    ezPageWaitAsync(message, functionToExecute) {
        return EzPromise.asyncAction(
            (finished) => {
                try {
                    if (!EzFunction.isFunction(functionToExecute)) {
                        return finished();
                    }

                    EzSpinner.ezInstance.pageWaitCount++;

                    let spinnerOptions = EzSpinner.ezInstance.DEFAULT_OPTIONS;

                    spinnerOptions.message = EzString.stringWithLengthOrDefault(
                        message,
                        EzSpinner.ezInstance.DEFAULT_OPTIONS.message);

                    return EzSpinner.ezInstance.ezStart(spinnerOptions)
                        .then(
                            () => EzPromise.asyncAction(
                                (finishedAction) => functionToExecute(finishedAction))
                                .then(
                                    () => EzSpinner.ezInstance.ezStopPageWait()
                                        .then(
                                            () => finished(...arguments))));
                } catch (err) {
                    let error = {
                        errorCode: 500,
                        message: EzString.stringWithLengthOrDefault(
                            err?.message,
                            'No error message provided.'),
                        err: err
                    };

                    ezApi.ezclocker.ezLogger.error(
                        EzString.em`
                            An unexpected exception occurred while executing EzSpinner.ezStartPageWaitResolve.
                            Error: ${EzJson.toJson(error)}`);

                    return EzSpinner.ezInstance.ezStopPageWait()
                        .then(
                            () => {
                                throw error;
                            });
                }
            });
    }

    /**
     * @public @method
     * Starts the full page wait spinner. After the spinner starts, the provided functionToExecute reference is called
     * with one param known as the waitDone function callback. The waitDone param is a reference to a
     * function that is called to hide the spinner after all work is complete. See example code below.
     * <code>
     * return ezApi.ezclocker.ezSpinner.ezStartPageWaitExecute('Please wait ...', function(waitDone) {
     *      // do some work here ...
     *      // Finally, call the provided waitDone() callback to close the spinner.
     *      waitDone();
     * });
     * </code>
     * @param {string} message
     * @param {function} functionToExecute
     * @returns {*}
     * @deprecated
     * Migrate to the replacement method that passes the waitDone call back:
     *      ezApi.ezclocker.ezSpinner.ezPageWaitExecute(message, functionToExecute);
     * Or migrate to the new method that passes a promise's resolve callback (no need to call waitDone())
     *      ezApi.ezclcoker.ezSpinner.ezPageWaitResolve(message, functionToExecute);
     */
    ezStartPageWaitExecute(message, functionToExecute) {
        return EzSpinner.ezInstance.ezPageWaitExecute(message, functionToExecute);
    }

    /**
     * @public @method
     * Called to stop each running spinner. The spinner stops when ezStopPageWait() is called an equal number of times
     * as the ezStartPageWait() method is called. Avoid calling the ezStopPageWait() function in code by leveraging the
     * following spinner start alternatives (if at all possible).
     * Alterntives to call equal ezStartPageWait and ezStopPageWait:
     * - ezApi.ezclocker.ezSpinner.ezStartPageWaitExecute
     * - ezApi.ezclocker.ezSpinner.ezStartPageWaitResolve
     * - ezApi.ezclocker.ezSpinner.ezStartPageWaitPromise
     * <code>
     * function doSomething1(resolve) { *
     *      ezApi.ezclocker.ezSpinner.startPageWait('First page wait call ...');
     *      // perform some work
     *      return resolve();
     * }
     * function doSomething2(resolve) { *
     *      ezApi.ezclocker.ezSpinner.startPageWait('Second page wait call ...');
     *      // perform some work
     *      return resolve();
     * }
     * EzPromise.promise(doSomething1).then(ezApi.ezclocker.ezSpinner.stopPageWait);
     * EzPromise.promise(doSomething2).then(ezApi.ezclocker.ezSpinner.stopPageWait);
     * </code>
     * @param {undefined|null|*} ...returnArguments
     * @returns {Promise.resolve}
     * Returns true if the spinner was actually stopped. False otherwise.
     */
    ezStopPageWait(...returnArguments) {
        return EzPromise.asyncAction(
            (finished) => {
                EzSpinner.ezInstance.pageWaitCount = EzNumber.isNumber(EzSpinner.ezInstance.pageWaitCount)
                    ? EzSpinner.ezInstance.pageWaitCount - 1
                    : 0;

                if (0 >= EzSpinner.ezInstance.pageWaitCount) {
                    EzSpinner.ezInstance.pageWaitCount = 0;

                    return EzSpinner.ezInstance.ezStop(EzSpinner.ezInstance.DEFAULT_OPTIONS.id)
                        .then(() => finished(returnArguments));
                }

                return finished(returnArguments);
            });
    }

    /**
     * @public @method
     * Stops the page wait spinner no matter how many times the ezStartPageWait() method was called.
     * @returns {Promise.resolve}
     */
    ezForceStopPageWaitSpinner() {
        EzSpinner.ezInstance.pageWaitCount = 0;

        return EzSpinner.ezInstance.ezStop(EzSpinner.ezInstance.DEFAULT_OPTIONS.id);
    }

    /**
     * @public @method
     * Starts a visible spinner
     * @param {object} options
     * @param {undefined|null|function} functionToExecute
     * Default: null
     * @returns {Promise.resolve}
     * Resolve contains the result from calling the provied functionToExecute (if available)
     */
    ezStartWait(spinnerOptions, functionToExecute = null) {
        if (!EzObject.isValid(spinnerOptions)) {
            throw new EzBadParamException(
                'spinnerOptions',
                EzSpinner.ezInstance,
                EzSpinner.ezInstance.ezStartWait);
        }

        return EzPromise.asyncAction(
            (finished) => {
                EzSpinner.ezInstance.startWaitCount[spinnerOptions.id]++;

                return EzSpinner.ezInstance.ezStart(spinnerOptions)
                    .then(
                        (spinnerId) => {
                            if (EzFunction.isFunction(functionToExecute)) {
                                let result = functionToExecute();

                                return EzSpinner.ezInstance.ezStopWait(spinnerId)
                                    .then(
                                        () => finished(result));
                            }
                        });
            });
    }

    /**
     * @public @method
     * Stops a visible spinner
     * @param {string} spinnerI
     * @returns {Promise.resolve}
     */
    ezStopWait(spinnerId) {
        if (!EzString.hasLength(spinnerId)) {
            return new EzBadParamException(
                'spinnerId',
                EzSpinner.ezInstance,
                EzSpinner.ezInstance.ezStopWait);
        }

        return EzPromise.asyncAction(
            (finished) => {
                EzSpinner.ezInstance.stopWaitCount[spinnerId] =
                    EzObject.isValid(EzSpinner.ezInstance.stopWaitCount[spinnerId])
                        ? EzSpinner.ezInstance.stopWaitCount[spinnerId] - 1
                        : 0;

                if (EzSpinner.ezInstance.stopWaitCount[spinnerId] <= 0) {
                    EzSpinner.ezInstance.stopWaitCount[spinnerId] = 0;
                    return EzSpinner.ezInstance.ezStop(spinnerId);
                }

                return finished();
            });
    }

    /**
     * @public @method
     * Executes the provided waitDone function
     * Then calls the resolveReject function passing the remaining arguments.
     * @param {function} resolveFunction
     * @param {undefined|null|array} argumentsArray
     * @param {undefined|null|object} optionalThis
     * @returns {Promise.resolve|Promise.reject}
     */
    ezWaitDoneResolver(resolveFunction, argumentsArray, optionalThis) {
        if (!EzFunction.isFunction(resolveFunction)) {
            throw new EzBadParamException(
                'resolveFunction',
                EzSpinner.ezInstance,
                EzSpinner.ezInstance.ezWaitDoneResolver);
        }
        if (!EzObject.isValid(optionalThis)) {
            optionalThis = this;
        }

        return EzSpinner.ezInstance.ezStopPageWait()
            .then(
                () => resolveFunction.apply(optionalThis, argumentsArray));
    }

    /**
     * @public @method
     * Executes the provided waitDone function
     * Then calls the resolveReject function passing the remaining arguments.
     * @param {function} waitDoneFunction
     * @param {undefined|null|function} rejectFunction
     * @param {undefined|null|array} rejectArgumentsArray
     * @param {undefined|null|object} optionalThis
     * @returns {Promise.reject}
     */
    ezWaitDoneReject(waitDoneFunction, rejectFunction, rejectArgumentsArray, optionalThis) {
        if (!EzFunction.isFunction(waitDoneFunction)) {
            throw new EzBadParamException(
                'watiDoneFunction',
                EzSpinner.ezInstance,
                EzSpinner.ezInstance.ezWaitDoneReject);
        }
        if (!EzArray.isArray(rejectArgumentsArray)) {
            rejectArgumentsArray = [];
        }
        if (!EzObject.isValid(optionalThis)) {
            optionalThis = this;
        }

        return !EzFunction.isFunction(rejectFunction)
            ? waitDoneFunction.apply(optionalThis, rejectArgumentsArray)
            : waitDoneFunction.apply(optionalThis, rejectArgumentsArray)
                .then(
                    () => rejectFunction.apply(optionalThis, rejectArgumentsArray));
    }

    /**
     * @public @method
     * Executes the provided waitDone function
     * Then returns the call to resolveFunction passing the remaining arguments.
     * @param {function} waitDoneFunction
     * @param {undefined|null|function} resolveFunction
     * @param {undefined|null|array} resolveArgumentsArray
     * @param {undefined|null|object} optionalThis
     * @returns {Promise.resolve}
     */
    ezWaitDoneResolve(waitDoneFunction, resolveFunction, resolveArgumentsArray, optionalThis) {
        if (!EzFunction.isFunction(waitDoneFunction)) {
            throw new EzBadParamException(
                'waitDoneFunction',
                EzSpinner.ezInstance,
                EzSpinner.ezInstance.ezWaitDoneResolve);
        }
        if (!EzArray.isArray(resolveArgumentsArray)) {
            resolveArgumentsArray = [];
        }
        if (!EzObject.isValid(optionalThis)) {
            optionalThis = this;
        }

        return !EzFunction.isFunction(resolveFunction)
            ? waitDoneFunction.apply(optionalThis, resolveArgumentsArray)
            : waitDoneFunction.apply(optionalThis, resolveArgumentsArray)
                .then(
                    () => resolveFunction.apply(optionalThis, resolveArgumentsArray));
    }

    /**
     * @public @method
     * Executes the provided waitDone function, then calls the processingFunction.
     * Finally, the results of the processing function (if valid) get pre-prended to the resolveArgumentsArray
     * and the final resolveFunction is called with the resolveArgumentsArray as parameters.
     * @param {function} waitDoneFunction
     * @param {undefined|null|function} resolveFunction
     * @param {undefined|null|array} resolveArgumentsArray
     * @param {undefined|null|object} optionalThis
     * @returns {Promise.resolve}
     */
    ezWaitDoneProcessThenResolve(waitDoneFunction, processingFunction, resolveFunction, resolveArgumentsArray, optionalThis) {
        if (!EzFunction.isFunction(waitDoneFunction)) {
            throw new EzBadParamException(
                'waitDoneFunction',
                EzSpinner.ezInstance,
                EzSpinner.ezInstance.ezWaitDoneResolve);
        }
        if (!EzFunction.isFunction(processingFunction)) {
            throw new EzBadParamException(
                'waitDoneFunction',
                EzSpinner.ezInstance,
                EzSpinner.ezInstance.ezWaitDoneResolve);
        }
        if (!EzArray.isArray(resolveArgumentsArray)) {
            resolveArgumentsArray = [];
        }
        if (!EzObject.isValid(optionalThis)) {
            optionalThis = this;
        }

        return !EzFunction.isFunction(resolveFunction)
            ? waitDoneFunction.apply(optionalThis, resolveArgumentsArray)
                .then(
                    () => processingFunction.apply(optionalThis, resolveArgumentsArray))
            : waitDoneFunction.apply(optionalThis, resolveArgumentsArray)
                .then(
                    () => {
                        let result = processingFunction.apply(optionalThis, resolveArgumentsArray);

                        if (EzObject.isValid(result)) {
                            resolveArgumentsArray = [
                                result,
                                ...resolveArgumentsArray
                            ];
                        }

                        return resolveFunction.apply(optionalThis, resolveArgumentsArray);
                    });
    }

    /**
 * @static
 * @public @readonly @property
 * Returns the name of this class's singleton instance when registered with ezApi.
 * @returns {string}
 */
    static get ezApiName() {
        return 'ezSpinner';
    }

    /**
     * @static
     * @public @readonly @property
     * Returns an object of event names that this class may trigger.
     * @returns {object}
     */
    static get ezEventNames() {
        return {
            onReady: 'ezOn_EzSpinner_Ready'
        };
    }

    /**
     * @static
     * @private @field
     * Stores the singleton instance of this class that was created by and registerd with EzApi.
     * @type {EzSpinner}
     */
    static #ezInstance = globalThis?.ezApi?.ready && globalThis.ezApi?.ezclocker?.[EzSpinner.ezApiName]
        ? globalThis.ezApi.ezclocker[EzSpinner.ezApiName]
        : null;

    /**
     * @static
     * @public @property @getter
     * Returns the singleton instance of this class that is registered with EzApi (if available yet)
     * @returns {EzSpinner}
     */
    static get ezInstance() {
        return EzSpinner.#ezInstance;
    }

    /**
     * @static
     * @public @property @setter
     * Sets the singleton instance of of this class that is registered with EzApi.
     * @param {EzSpinner} ezSpinner
     */
    static set ezInstance(ezSpinner) {
        if (null != EzSpinner.#ezInstance) {
            throw new Error('EzSpinner\'s singleton instance is already reigstered with EzApi.');
        }

        EzSpinner.#ezInstance = ezSpinner;
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
    static #ezApiRegistrationState = globalThis?.ezApi?.ready && globalThis.ezApi?.ezclocker?.[EzSpinner.ezApiName]
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
        return EzSpinner.#ezApiRegistrationState;
    }

    /**
     * @static
     * @public @property @setter
     * Sets the ezApi registration state of this classes's singleton instance.
     * @param {string} ezApiRegistrationState
     * A valid enum property value from EzRegistrationState
     */
    static set ezApiRegistrationState(ezApiRegistrationState) {
        EzSpinner.#ezApiRegistrationState = EzRegistrationState.ezValueOf(ezApiRegistrationState);
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
        return EzRegistrationState.PENDING === EzSpinner.ezApiRegistrationState &&
            globalThis?.ezApi?.ready && globalThis.ezApi?.ezclocker &&

            globalThis.ezApi.ezclocker?.[EzEventEngine.ezApiName]?.ready;
    }

    /**
     * @static
     * @private @readonly @property
     * Returns if this class's singleton instance is registered with ezApi yet.
     * @returns {boolean}
     */
    static get #ezIsRegistered() {
        return null != EzSpinner.ezInstance &&
            EzRegistrationState.REGISTERED === EzSpinner.ezApiRegistrationState;
    }

    /**
     * @static
     * @private @method
     * Attempts to register the singleton instance for this class with ezApi. Returns true
     * if successful, false otherwise.
     * @returns {boolean}
     */
    static #ezRegistrator() {
        if (EzSpinner.#ezCanRegister && !EzSpinner.#ezIsRegistered) {
            globalThis.ezApi.ezRegisterNewApi(EzSpinner, EzSpinner.ezApiName);
        }

        return EzSpinner.#ezIsRegistered;
    }

    /**
     * @static
     * Static Initialization
     * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
     * >> IMPORTANT <<
     * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
     * Make sure the following properties and methods get defined BEFORE this static initialization section:
     *     1) Property getter EzSpinner.ezApiName
     *     2) Property getter EzSpinner.ezEventNames
     *     3) Property getter EzSpinner.ezInstance
     *     4) Property setter EzSpinner.ezInstance
     *     5) Property getter EzSpinner.ezApiRegistrationState
     *     6) Property setter EzSpinner.ezApiRegistrationState
     *     7) Property getter EzSpinner.#ezCanRegister
     *     8) Property getter EzSpinner.#ezIsRegistered
     *     9) Method EzSpinner.#ezRegistrator()
     */
    static {
        if (!EzSpinner.#ezIsRegistered) {
            EzSpinner.ezApiRegistrationState = EzRegistrationState.PENDING;

            if (!EzSpinner.#ezRegistrator()) {
                document.addEventListener(
                    EzSpinner.ezOnEzApiReadyEventName,
                    () => {
                        if (!EzSpinner.#ezRegistrator()) {
                            document.addEventListener(
                                EzEventEngine.ezEventNames.onReady,
                                EzSpinner.#ezRegistrator);
                        }
                    });
            }
        }
    }
}
