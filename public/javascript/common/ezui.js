import { EzBadParamException } from '/ezlibrary/exceptions/EzBadParamException.js';

import {
    EzObject,
    EzBoolean,
    EzNumber,
    EzString,
    EzArray,
    EzJson,
    EzPromise
} from '/ezlibrary/helpers/EzHelpers.js';

import {
    EzRegistrationState,
    EzElementEventName
} from '/ezlibrary/enums/EzEnumerations.js';

import { EzClass } from '/ezlibrary/EzClass.js';
import { EzEventEngine } from '/ezlibrary/ez-event-engine.js';

import { EzElementRect } from '/public/widgets/common/EzElementRect.js';
import { EzDomRect } from '/ezlibrary/ux/EzDomRect.js';

import { EzSpinner } from '/public/webcomponents/spinner/EzSpinner.js';

import { EzUx } from '/ezlibrary/ux/EzUx.js';

/**
 * @global
 * Singleton instance of EzUI
 * Also available from:
 *     globalThis.ezUi
 *     ezApi.ezclocker.ezUi (preferred)
 */
let ezUi = EzObject.hasProperty(globalThis, 'ezApi') && EzObject.isValid(globalThis.ezApi) && EzBoolean.isTrue(globalThis.ezApi.ready)
    ? ezApi.ezclocker.ezUi
    : null;

/**
 * @class
 * @extends {EzClass}
 * @description
 * Provides UX manipulation utility functions~
 * ---------------------------------------------------------------------------
 * Import with:
 *     import { EzUI } from '/public/javascript/common/ezui.js';
 * ---------------------------------------------------------------------------
 * Singleton instance ready for use when the below evaluates to true:
 *     globalThis.ezApi.ezclocker[EzUI.ezApiName] &&
 *     globalThis.ezApi.ezclocker[EzUI.ezApiName].ready;
 * ---------------------------------------------------------------------------
 * Listen to onReady event:
 *     document.addEventListener(
 *         EzUI.ezEventNames.onReady,
 *         <class_name>.#ezRegistrator);
 * ---------------------------------------------------------------------------
 * Instance Reference:
 *     ezApi.ezclocker.ezUi
 * ---------------------------------------------------------------------------
 */
class EzUI extends EzClass {
    /**
     * @static
     * @public @method @readonly @property
     * Returns the name of this class's singleton instance when registered with ezApi.
     * @returns {string}
     */
    static get ezApiName() {
        return 'ezUi';
    }

    /**
     * @static
     * @public @method @readonly @property
     * Returns an object of event names that this class may trigger.
     * @returns {object}
     */
    static get ezEventNames() {
        return {
            onReady: 'ezOn_EzUI_Ready',
        };
    }

    /**
      * @static
      * @private @field
      * Stores the singleton instance of this class that was created by and registerd with EzApi.
      * @type {EzUI}
      */
    static #ezInstance = EzObject.hasProperty(globalThis, 'ezApi') &&
        EzObject.isValid(globalThis.ezApi) && EzBoolean.isTrue(globalThis.ezApi.ready) &&
        EzObject.isValid(globalThis.ezApi.ezclocker[EzUI.ezApiName])
        ? globalThis.ezApi.ezclocker[EzUI.ezApiName]
        : null;

    /**
     * @static
     * @public @method @property @getter
     * Returns the singleton instance of this class that is registered with EzApi (if available yet)
     * @returns {EzUI}
     */
    static get ezInstance() {
        return EzUI.#ezInstance;
    }

    /**
     * @static
     * @public @method @property @getter
     * Sets the singleton instance of of this class that is registered with EzApi.
     * @param {EzUI} ezUI
     */
    static set ezInstance(ezUI) {
        if (null != EzUI.#ezInstance) {
            throw new Error('EzUI\'s singleton instance is already reigstered with EzApi.');
        }

        EzUI.#ezInstance = ezUI;
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
        EzObject.isValid(globalThis.ezApi.ezclocker[EzUI.ezApiName])
        ? EzRegistrationState.REGISTERED
        : null;

    /**
     * @static
     * @public @method @property @getter
     * Returns the ezApi registration state of this classes's singleton instance.
     * @returns {string}
     * A valid enum property value from EzRegistrationState
     */
    static get ezApiRegistrationState() {
        return EzUI.#ezApiRegistrationState;
    }

    /**
     * @static
     * @public @method @property @setter
     * Sets the ezApi registration state of this classes's singleton instance.
     * @param {string} ezApiRegistrationState
     * A valid enum property value from EzRegistrationState
     */
    static set ezApiRegistrationState(ezApiRegistrationState) {
        EzUI.#ezApiRegistrationState = EzRegistrationState.ezValueOf(ezApiRegistrationState);
    }

    /**
     * @public @method @static @readonly @property
     * Returns the globalThis name of the reference.
     * @returns {string}
     */
    static get ezGlobalThisName() {
        return 'ezUi';
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
        return EzRegistrationState.PENDING === EzUI.ezApiRegistrationState &&
            EzObject.hasProperty(globalThis, 'ezApi') &&
            EzObject.isValid(globalThis.ezApi) && EzBoolean.isTrue(globalThis.ezApi.ready) &&

            globalThis.ezApi.ezclocker[EzEventEngine.ezApiName] &&
            globalThis.ezApi.ezclocker[EzEventEngine.ezApiName].ready &&

            globalThis.ezApi.ezclocker[EzSpinner.ezApiName] &&
            globalThis.ezApi.ezclocker[EzSpinner.ezApiName].ready;
    }

    /**
     * @static
     * @private @readonly @property
     * Returns if this class's singleton instance is registered with ezApi yet.
     * @returns {boolean}
     */
    static get #ezIsRegistered() {
        return null != EzUI.ezInstance &&
            EzRegistrationState.REGISTERED === EzUI.ezApiRegistrationState;
    }

    /**
     * @static
     * @private @method
     * Attempts to register the singleton instance for this class with ezApi. Returns true
     * if successful, false otherwise.
     * @returns {boolean}
     */
    static #ezRegistrator() {
        // TODO: Update to create the instance once the global EzUI reference is removed.
        if (EzUI.#ezCanRegister && !EzUI.#ezIsRegistered) {
            ezApi.ezRegisterInstance(EzUI.ezApiName, EzUI.ezInstance);
        }

        return EzUI.#ezIsRegistered;
    }

    /**
     * @static
     * Static Initialization
     * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
     * >> IMPORTANT <<
     * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
     * Make sure the following properties and methods get defined BEFORE this static initialization section:
     *     1) Property getter EzUI.ezApiName
     *     2) Property getter EzUI.ezEventNames
     *     3) Property getter EzUI.ezInstance
     *     4) Property setter EzUI.ezInstance
     *     5) Property getter EzUI.ezApiRegistrationState
     *     6) Property setter EzUI.ezApiRegistrationState
     *     7) Property getter EzUI.#ezCanRegister
     *     8) Property getter EzUI.#ezIsRegistered
     *     9) Method EzUI.#ezRegistrator()
     */
    static {
        if (!EzUI.#ezIsRegistered) {
            EzUI.ezApiRegistrationState = EzRegistrationState.PENDING;

            // Creating ezUi before ezApi might be ready as it is also available
            // from globalThis.ezUi
            EzUI.ezInstance = new EzUI();
            EzUI.ezInstance.ezInit();

            // TODO: Remove the global EzUI reference once all use is migrated
            globalThis[EzUI.ezGlobalThisName] = EzUI.ezInstance;

            document.addEventListener(
                EzUI.ezEventNames.onReady,
                EzUI.ezInstance.ezHandleOnEzApiReady);

            if (!EzUI.#ezRegistrator()) {
                document.addEventListener(
                    EzUI.ezOnEzApiReadyEventName,
                    EzUI.#ezRegistrator);

                document.addEventListener(
                    EzEventEngine.ezEventNames.onReady,
                    EzUI.#ezRegistrator);

                document.addEventListener(
                    EzSpinner.ezEventNames.onReady,
                    EzUI.#ezRegistrator);
            }
        }
    }

    /**
     * @private @field
     * Stores the window dimensions object
     * @type {object}
     */
    #ezWindowDimensions = {
        innerHeight: 0,
        outerHeight: 0,
        innerWidth: 0,
        outerWidth: 0,
        innerHorizontalCenter: 0,
        outerHorizontalCenter: 0,
        innerVerticleCenter: 0,
        outerVerticleCenter: 0,
    };

    /**
     * @public @method @field
     * @type {boolean}
     */
    enableQuickStatus = false;

    /**
     * @public @method @field
     * @type {boolean}
     */
    closeQuickStatus = true;

    /**
     * @public @method @field
     * @type {object}
     */
    ezCacheIds = {
        ezDisplayCacheId: 'ezDisplayCache',
    };

    /**
     * @public @method @field
     * @type {array}
     */
    ezHookedElementEvents = {};

    /**
     * @public @method @readonly @property
     * Returns the current browser window's inner and outer height information.
     * The return object updates when the window is resized.
     * @returns {object}
     */
    get ezWindowDimensions() {
        return this.#ezWindowDimensions;
    }

    /**
     * @public @method @property @setter
     * Sets the windowDimensions.
     * It is recommended NOT to call the setter out side of the EzUI handler for window.onresize event.
     * @param {object} windowDimensions
     */
    set ezWindowDimensions(windowDimensions) {
        if (null == windowDimensions || undefined == windowDimensions) {
            this.#ezWindowDimensions = {
                innerHeight: 0,
                outerHeight: 0,
                innerWidth: 0,
                outerWidth: 0,
                innerHorizontalCenter: 0,
                outerHorizontalCenter: 0,
                innerVerticleCenter: 0,
                outerVerticleCenter: 0,
            };
        }

        this.#ezWindowDimensions.innerHeight = null != window['innerHeight'] && undefined != window['innerHeight']
            ? window['innerHeight']
            : 0;
        this.#ezWindowDimensions.outerHeight = null != window['outerHeight'] && undefined != window['outerHeight']
            ? window['outerHeight']
            : 0;
        this.#ezWindowDimensions.innerWidth = null != window['innerWidth'] && undefined != window['innerWidth']
            ? window['innerWidth']
            : 0;
        this.#ezWindowDimensions.outerWidth = null != window['outerWidth'] && undefined != window['outerWidth']
            ? window['outerWidth']
            : 0;
        this.#ezWindowDimensions.innerHorizontalCenter = null != window['innerHeight'] && undefined != window['innerHeight']
            ? window['innerHeight'] / 2
            : 0;
        this.#ezWindowDimensions.outerHorizontalCenter = null != window['outerHeight'] && undefined != window['outerHeight']
            ? window['outerHeight'] / 2
            : 0;
        this.#ezWindowDimensions.innerVerticleCenter = null != window['innerWidth'] && undefined != window['innerWidth']
            ? window['innerWidth'] / 2
            : 0;
        this.#ezWindowDimensions.outerVerticleCenter = null != window['outerWidth'] && undefined != window['outerWidth']
            ? window['outerWidth'] / 2
            : 0;
    }

    /**
     * @public @method @readonly @property
     * @returns {string}
     */
    get EZUI_DEFAULT_DISPLAY_STYLE_VALUE() {
        return '';
    }

    /**
     * @public @method @readonly @property
     * @returns {string}
     */
    get EZCLOCKER_ELEMENT_CACHE_PROPERTY_NAME() {
        return 'ezClockerUICache';
    }

    /**
     * @deprecated
     * Stop all use
     * Will remove DEFAULT_ICHECK_CONFIG in a future release
     * @public @method @readonly @property
     * Default configuration for JQuery iCheck component
     * @returns { object }
     */
    get DEFAULT_ICHECK_CONFIG() {
        return {
            disabledCheckboxClass: 'icheckbox_flat-grey',
            checkboxClass: 'icheckbox_flat-orange',
            radioClass: 'iradio_flat-orange',
            increaseArea: '20%',
        };
    }

    /**
     * @protected
     * Initializes EzUI
     * @returns {EzUI}
     */
    ezInit() {
        return EzUI.ezInstance;
    }

    /**
     * @protected @method
     * Handles the window.onresize event so that the ezWindowDimension object can update
     */
    ezHandleOnEzApiReady() {
        globalThis.ezApi.ezclocker.ezEventEngine.ezWantElementEvent(
            window,
            EzElementEventName.RESIZE,
            EzUI.ezApiName,
            () => {
                EzUI.ezInstance.ezWindowDimensions.innerHeight = window.innerHeight,
                    EzUI.ezInstance.ezWindowDimensions.outerHeight = window.outerHeight,
                    EzUI.ezInstance.ezWindowDimensions.innerWidth = window.innerWidth,
                    EzUI.ezInstance.ezWindowDimensions.outerWidth = window.outerWidth,
                    EzUI.ezInstance.ezWindowDimensions.innerHorizontalCenter = window.innerHeight / 2,
                    EzUI.ezInstance.ezWindowDimensions.outerHorizontalCenter = window.outerHeight / 2,
                    EzUI.ezInstance.ezWindowDimensions.innerVerticleCenter = window.innerHeight / 2,
                    EzUI.ezInstance.ezWindowDimensions.outerVerticleCenter = window.outerHeight / 2
            });
    }

    /**
     * @protected @method
     * Returns an object with the inner and outer width and height values for the window.
     */
    ezGetWindowDimensions() {
        let windowDimensions = {
            innerHeight: window.innerHeight,
            outerHeight: window.outerHeight,
            innerWidth: window.innerWidth,
            outerWidth: window.outerWidth,
            innerHorizontalCenter: window.innerHeight / 2,
            outerHorizontalCenter: window.outerHeight / 2,
            innerVerticleCenter: window.innerHeight / 2,
            outerVerticleCenter: window.outerHeight / 2
        };

        let windowResizeHandler = function() {
            windowDimensions
        }
    }

    /**
     * @public @method
     * Returns the parent id of the provided element or element with provided id. Returns null
     * if the element does not have a parent element. Some parent elements CAN have empty Ids!
     * @param {Object|String} elementOrId
     * @returns {String|null}
     */
    ezGetElementParentId(elementOrId) {
        let element = EzUI.ezInstance.ezFindByElementOrId(elementOrId);
        if (!EzObject.isValid(element)) {
            throw new EzBadParamException(
                'elementOrId',
                EzUI.ezInstance,
                EzUI.ezInstance.ezGetElementParentId);
        }

        return EzObject.isValid(element.parentElement)
            ? element.parentElement.id
            : null;
    }

    /**
     * @public @method
     * Returns the parent element of the provided element or element with provided id. Returns null
     * if the element does not have a parent element.
     * @param {Object|String} elementOrId
     * @returns {String|null}
     */
    ezGetElementParent(elementOrId) {
        let element = EzUI.ezInstance.ezFindByElementOrId(elementOrId);

        if (!EzObject.isValid(element)) {
            throw new EzBadParamException(
                'elementOrId',
                EzUI.ezInstance,
                EzUI.ezInstance.ezGetElementParentId);
        }

        return EzObject.isValid(element.parentElement)
            ? element.parentElement
            : null;
    }

    /**
     * @public @method
     * Adds the error highlight to an input editor
     * @param {Object|String} elementOrId
     * @returns {Object|null}
     */
    ezShowInputError(elementOrId) {
        let element = EzUI.ezInstance.ezFindByElementOrId(elementOrId);

        if (null == element) {
            return null;
        }

        if (!element.classList.contains('ezInputErrorHighlight')) {
            element.classList.add('ezInputErrorHighlight');
        }

        return element;
    }

    /**
     * @public @method
     * Removes the error highlight to an input editor
     * @param {Object|String} elementOrId
     * @returns {Object|null}
     */
    ezHideInputError(elementOrId) {
        let element = EzUI.ezInstance.ezFindByElementOrId(elementOrId);
        if (null == element) {
            return null;
        }

        if (element.classList.contains('ezInputErrorHighlight')) {
            element.classList.remove('ezInputErrorHighlight');
        }

        return element;
    }

    /**
     * @public @method
     * Adds the error highlight to an input editor
     * @param {Object|String} elementOrId
     * @returns {Object|null}
     */
    ezShowInputWarning(elementOrId) {
        let element = EzUI.ezInstance.ezFindByElementOrId(elementOrId);

        if (null == element) {
            return null;
        }

        if (!element.classList.contains('ezInputWarningHighlight')) {
            element.classList.add('ezInputWarningHighlight');
        }

        return element;
    }

    /**
     * @public @method
     * Removes the error highlight to an input editor
     * @param {Object|String} elementOrId
     * @returns {Object|null}
     */
    ezHideInputWarning(elementOrId) {
        let element = EzUI.ezInstance.ezFindByElementOrId(elementOrId);

        if (null == element) {
            return null;
        }

        if (element.classList.contains('ezInputWarningHighlight')) {
            element.classList.remove('ezInputWarningHighlight');
        }

        return element;
    }

    /**
     * @public @method
     * Displays an unautorized access message and then signs out the user.
     * Mesage template:
     * '{em} {operation}'
     * If em is not provided:
     * 'You do not have authorization to {operation}'
     * If em is provided but operation is not provided:
     * '{em} perform the requested operation.'
     * If em and operation is not provided:
     * 'You do not have authorization to perform the requested operation. Please sign in to continue.'
     * @param {String|null} em
     * @param {String|null} operation
     * @param {Boolean|null} skipSignOut
     * @returns {Promise.resolve}
     */
    ezShowUnauthorizedDialogAndSignout(em, operation, skipSignOut) {
        skipSignOut = EzBoolean.isTrue(skipSignOut);

        return ezApi.ezRejector(
            (reject) => {
                let em2Use = EzString.stringOrDefault(
                    em,
                    'You do not have authorization to ');

                let op2Use = EzString.stringOrDefault(
                    operation,
                    ' perform the requested operation.');

                let logEm = EzString.hasLength(em)
                    ? `The logged in user does not have authorizatione to perform ${op2Use}. Error: ${em}`
                    : `The logged in user does not have authorizatione to perform ${op2Use}.`;

                let actionMsg = EzBoolean.isTrue(skipSignOut)
                    ? ''
                    : 'Please sign in to continue.<p>Click OK to navigate to the ezClocker sign in page.</p>';

                ezApi.ezclocker.ezLogger.error(logEm);

                ezApi.ezclocker.ezDialog.ezShowError(
                    'Unauthorized Access',
                    `${em2Use}${op2Use}${actionMsg}`,
                    () => {
                        if (ezApi.ezIsFalse(skipSignOut)) {
                            let infoLog = 'The logged in user will be signed out due to an authorization error.';
                            ezApi.ezclocker.ezLogger.info(infoLog);
                            ezApi.ezclocker.nav.ezSignOut();
                            return reject(ezApi.ezBuildErrorResponse(500, infoLog));
                        }
                        return reject(ezApi.ezBuildErrorResponse(500));
                    });
            });
    }

    /**
     * @public @method
     * Obtains a data attribute from the element or element associated with the provided id.
     * No need to include the 'data-' portion of the attribute. If included, it is removed before accessing the
     * elements dataset.
     * @param {Object|String} elementOrId
     * @param {string} dataAttributeName
     * @returns {String|null}
     */
    ezGetElementDataAttributeValue(elementOrId, dataAttributeName) {
        if (!EzString.hasLength(dataAttributeName)) {
            throw new EzBadParamException(
                'dataAttributeName',
                EzUI.ezInstance,
                EzUI.ezInstance.ezGetElementDataAttributeValue);
        }

        let element = EzUI.ezInstance.ezFindByElementOrId(elementOrId);
        if (!EzObject.isValid(element)) {
            return null;
        }

        if (0 === dataAttributeName.indexOf('data-')) {
            dataAttributeName = dataAttributeName.substring(5);
        }

        dataAttributeName = dataAttributeName.replace('-', '');

        if (!ezApi.ezHasOwnProperty(element.dataset, dataAttributeName)) {
            return '';
        }

        let value = element.dataset[dataAttributeName];
        return EzString.hasLength(value) ? value : '';
    }

    /**
     * @public @method
     * Sets an HTML element's title property
     * @param {object|string} elementOrId
     * @param {string} title
     * @returns {object}
     * Returns a reference to the modified element (if it exists)
     */
    ezSetElementTitle(elementOrId, title) {
        let element = EzUI.ezInstance.ezFindByElementOrId(elementOrId);
        if (!EzObject.isValid(element)) {
            return null;
        }

        element.title = EzString.stringOrEmpty(title);

        return element;
    }

    /**
     * @public @method
     * Sets a data attribute on the element or element associated with the provided id.
     * No need to include the 'data-' portion of the attribute. If included, it is removed before accessing the
     * elements dataset.
     * @param {Object|String} elementOrId
     * @param {string} dataAttributeName
     * @param {String|null} dataAttributeValue
     * @returns {Object|null}
     * Returns the element or null if the element doesn't exist.
     */
    ezSetElementDataAttributeValue(elementOrId, dataAttributeName, dataAttributeValue) {
        if (!EzString.hasLength(dataAttributeName)) {
            throw new EzBadParamException(
                'dataAttributeName',
                EzUI.ezInstance,
                EzUI.ezInstance.ezSetElementDataAttributeValue);
        }

        let element = EzUI.ezInstance.ezFindByElementOrId(elementOrId);
        if (!EzObject.isValid(element)) {
            return null;
        }

        if (0 === dataAttributeName.indexOf('data-')) {
            dataAttributeName = dataAttributeName.substring(5);
        }

        let nameParts = dataAttributeName.split('-');
        let realDatAttributeName = '';

        // Converting to camal case
        for (let index = 0; index < nameParts.length; index++) {
            if (0 == index) {
                realDatAttributeName += index;
            } else {
                realDatAttributeName += nameParts[index].charAt(0).toUpperCase() + nameParts[index].substring(1);
            }
        }

        element.dataset[realDatAttributeName] = EzString.hasLength(dataAttributeValue) ? dataAttributeValue : '';

        return element;
    }

    /**
     * @public @method
     * @param {string} id
     * @param {function} onSelect
     * @param {function} onChange
     * @param {function} onClose
     * @param {function} onFocus
     * @param {function} onOpen
     * @returns {Object}
     */
    ezInitSelectMenu(id, onChange, onSelect, onClose, onFocus, onOpen) {
        if (!EzUI.ezInstance.ezElementExists(id)) {
            throw new EzBadParamException(
                `id (value=${id})`,
                EzUI.ezInstance,
                EzUI.ezInstance.ezInitSelectMenu);
        }

        let selectMenu = EzUI.ezInstance.ezId(id).selectmenu({
            change: onChange,
            close: onClose,
            focus: onFocus,
            open: onOpen,
            select: onSelect,
        });

        EzUI.ezInstance.ezAddClass(id + '-button', 'ezSelectMenu');

        return selectMenu;
    }

    /**
     * Returns if the jQuery selectmenu associated with the provided id is enabled or not
     * @param {string} id
     */
    ezIsSelectInputEnabled(id) {
        if (!EzUI.ezInstance.ezElementExists(id)) {
            throw new EzBadParamException(
                `id (value=${id})`,
                EzUI.ezInstance,
                EzUI.ezInstance.ezIsSelectInputEnabled);
        }
        let isDisabled = EzUI.ezInstance.ezId(id).prop('disabled');
        return EzBoolean.isTrue(isDisabled);
    }

    /**
     * Returns if the jQuery selectmenu associated with the provided id is enabled or not
     * @param {string} id
     */
    ezIsElementEnabled(elementOrId) {
        let element = EzUI.ezInstance.ezFindByElementOrId(elementOrId);
        if (null === element) {
            return false;
        }

        return !ezApi.ezHasOwnProperty(element, 'disabled') || !element.disabled;
    }

    /**
     * @deprecated Migrate to EzUI.ezInstance.ezEnableElement(elementOrId) instead.
     * @public @method
     * Enables a select input
     * @param {string} id
     */
    ezEnableSelectInput(id) {
        if (!EzUI.ezInstance.ezElementExists(id)) {
            throw new EzBadParamException(
                `id (value=${id})`,
                EzUI.ezInstance,
                EzUI.ezInstance.ezEnableSelectInput);
        }

        EzUI.ezInstance.ezId(id).prop('disabled', false);
    }

    /**
     * @deprecated Migrate to EzUI.ezInstance.ezDisableElement(elementOrId) instead.
     * @public @method
     * Disables a select input
     * @param {string} id
     */
    ezDisableSelectInput(id) {
        if (!EzUI.ezInstance.ezElementExists(id)) {
            throw new EzBadParamException(
                `id (value=${id})`,
                EzUI.ezInstance,
                EzUI.ezInstance.ezDisableSelectInput);
        }

        EzUI.ezInstance.ezId(id).prop('disabled', true);
    }

    /**
     * Returns if the jQuery selectmenu associated with the provided id is enabled or not
     * @param {string} id
     */
    ezIsSelectMenuEnabled(id) {
        if (!EzUI.ezInstance.ezElementExists(id)) {
            throw new EzBadParamException(
                `id (value=${id})`,
                EzUI.ezInstance,
                EzUI.ezInstance.ezIsSelectMenuEnabled);
        }

        let isDisabled = EzUI.ezInstance.ezId(id).selectmenu('option', 'disabled');
        return EzBoolean.isTrue(isDisabled);
    }

    /**
     * Sets the jQuery selectmenu associated with the provided id as enabled
     * @param {string} id
     */
    ezEnableSelectMenu(id) {
        if (!EzUI.ezInstance.ezElementExists(id)) {
            throw new EzBadParamException(
                `id (value=${id})`,
                EzUI.ezInstance,
                EzUI.ezInstance.ezEnableSelectMenu);
        }

        EzUI.ezInstance.ezId(id).selectmenu('option', 'disabled', false);
    }

    /**
     * Sets the jQuery selectmenu associated with the provided id as disabled.
     * @param {string} id
     */
    ezDisableSelectMenu(id) {
        if (!EzUI.ezInstance.ezElementExists(id)) {
            throw new EzBadParamException(
                `id (value=${id})`,
                EzUI.ezInstance,
                EzUI.ezInstance.ezDisableSelectMenu);
        }

        EzUI.ezInstance.ezId(id).selectmenu('option', 'disabled', true);
    }

    /**
     * @public @method
     * Determines if an HTML element associated with the provided id is visible or not.
     * @param {string} id
     * @returns {boolean}
     */
    ezElementVisible(id) {
        return EzUI.ezInstance.ezElementVisible$(EzUI.ezInstance.ezNormalizedId(id));
    }

    /**
     * @public @method
     * Determines if an HTML element associated with the provided selector is visible or not.
     * @param {string} selector
     * @returns {boolean}
     */
    ezElementVisible$(selector) {
        if (ezApi.ezIsFalse(EzUI.ezInstance.ezElementExists$(selector))) {
            return false;
        }

        return EzBoolean.isTrue(EzUI.ezInstance.ezId$(selector).is(':visible'));
    }

    /**
     * @public @method
     * Determines if the element with provided ID exists (using $() call)
     * @param {Object|String} elementOrId
     * @returns {boolean}
     */
    ezDoesElementExist(elementOrId) {
        return EzObject.isValid(EzUI.ezInstance.ezFindByElementOrId(elementOrId));
    }

    /**
     * @public @method
     * Determines if the element with provided ID exists (using $() call)
     * @param {string} id
     * @returns {boolean}
     */
    ezElementExists(id) {
        if (!EzString.hasLength(id)) {
            return false;
        }

        return EzObject.isValid(document.getElementById(id));
    }

    /**
     * @public @method
     * Determines if the element with provided ID exists (using $() call)
     * @param {string} jquerySelector
     * @returns {boolean}
     */
    ezElementExists$(jquerySelector) {
        if (!EzString.hasLength(jquerySelector)) {
            return false;
        }

        let element = EzUI.ezInstance.ezId$(jquerySelector);
        return EzObject.isValid(element) && element.length !== 0;
    }

    /**
     * @public @method
     * Sets the input focus to the element or element with the provided id (if possible).
     * @param {Object|String} elementOrId
     * @returns {Object|null}
     * Returns the element reference (if any)
     */
    ezFocusElement(elementOrId) {
        let element = EzUI.ezInstance.ezFindByElementOrId(elementOrId);
        if (!EzObject.isValid(element)) {
            return null;
        }

        if (ezApi.ezIsFunction(element.focus)) {
            element.focus();
        }

        return element;
    }

    /**
     * @public @method
     * Sets focus to the element referenced by the provided ID.
     * @returns {Object}
     */
    ezFocus(elementId) {
        return EzUI.ezInstance.ezFocus$('#' + elementId);
    }

    /**
     * @public @method
     * Sets focus to the element referenced by the provided selector
     * @returns {Object}
     */
    ezFocus$(selector) {
        if (ezApi.ezIsFalse(EzUI.ezInstance.ezElementVisible$(selector))) {
            return;
        }

        return EzUI.ezInstance.ezId$(selector).focus();
    }

    /**
     * @public @method
     * Removes focus on the element referenced by the provided ID.
     * @returns {Object}
     */
    ezFocusOut(elementId) {
        return EzUI.ezInstance.ezFocusOut$('#' + elementId);
    }

    /**
     * @public @method
     * Removes focus on the element referenced by the provided selector
     * @returns {Object}
     */
    ezFocusOut$(selector) {
        if (ezApi.ezIsFalse(EzUI.ezInstance.ezElementVisible$(selector))) {
            return;
        }

        return EzUI.ezInstance.ezId$(selector).focusout();
    }

    /**
     * Simulates pressing the provided keyToPress as if it was done via the keyboard.
     * @param {string} keyToPress
     * @returns {boolean}
     * Returns response of body.dispatchEvent()
     */
    ezPressKey(keyToPress) {
        let keyboardEvent = document.createEvent('KeyboardEvent');
        keyboardEvent.initKeyEvent('keypress', true, true, window, 0, 0, 0, 0, 0, keyToPress.charCodeAt(0));

        return document.body.dispatchEvent(keyboardEvent);
    }

    /**
     * @public @method
     * Returns the jQuery refernce to window object
     */
    ezWindow() {
        return EzObject.isValid($)
            ? $(window)
            : window;
    }

    /**
     * @public @method
     * Returns the HTML element reference (not JQuery wrapped!) for the provided elementId.
     * If the element does not exist, null is returned.
     * @param {string} elementId
     * @returns {null|object}
     * Returns the HTML element node reference or null if it does not exist.
     */
    ezElement(elementId) {
        if (!EzString.hasLength(elementId)) {
            throw new EzBadParamException(
                'elementId',
                EzUI.ezInstance,
                EzUI.ezInstance.ezElement);
        }

        return document.getElementById(elementId);
    }

    /**
     * @public @method
     * Returns a jQuery reference to the element with the provided id
     * @param {string} id
     */
    ezId(id) {
        if (!EzString.hasLength(id)) {
            return null;
        }

        return $(EzUI.ezInstance.ezNormalizeId(id));
    }

    /**
     * @public @method
     * Returns a list of elements that match the provided aria attribute's value.
     * @param {string} ariaAttributeSuffix
     * String should not include the 'aria' prefix.
     * @param {string} value
     * @returns {array}
     */
    ezFindByAriaAttribute(ariaAttributeSuffix, value) {
        if (!EzString.hasLength(ariaAttributeSuffix)) {
            throw new EzBadParamException(
                'ariaAttributeSuffix',
                EzUI.ezInstance,
                EzUI.ezInstance.ezAria);
        }
        if (!EzString.isString(value)) {
            value = '';
        }

        let fullAriaAttributeName = `aria-${ariaAttributeSuffix}`;

        return document.querySelectorAll(`[${fullAriaAttributeName}="${value}"]`);
    }

    /**
     * @public @method
     * Returns a jQuery reference to the element identified by the provided selector
     * @param {string} jQuerySelector
     */
    ezId$(jQuerySelector) {
        if (!EzObject.isValid(jQuerySelector)) {
            return null;
        }

        return $(jQuerySelector);
    }

    /**
     * @public @method
     * Returns a jquery wrapper of the provided element reference.
     * @param {Object} elementRef
     * @returns {Object}
     * Returns $(elementRef)
     */
    ezRef(elementRef) {
        return EzObject.isValid(elementRef)
            ? $(elementRef)
            : null;
    }

    /**
     * @public @method
     * @param {string} message
     */
    ezShowQuickStatus(message) {
        if (!EzUI.ezInstance.enableQuickStatus) {
            ezApi.ezclocker.ezLogger.debug(message);
            return;
        }

        EzUI.ezInstance.closeQuickStatus = false;
        if (EzUI.ezInstance.ezElementExists('_EzQuickStatusBox')) {
            EzUI.ezInstance.ezAppendContent(
                '_EzQuickStatusBox',
                ezApi.ezTemplate`
                    <br/>
                    ${message}`);
        }

        ezApi.ezBody().prepend(
            ezApi.ezTemplate`
                <div class="ezQuickStatusBox" id="_EzQuickStatusBox">
                    ${message}
                </div>`);

        EzUI.ezInstance.ezShowElement('_EzQuickStatusBox');
        EzUI.ezInstance.ezQuickStatusTimer = setTimeout(EzUI.ezInstance.ezAutoHideQuickStatus, 2000);
    }

    /**
     * @public @method
     */
    ezAutoHideQuickStatus() {
        if (!EzUI.ezInstance.closeQuickStatus) {
            EzUI.ezInstance.closeQuickStatus = true;
            return;
        }

        clearTimeout(EzUI.ezInstance.ezQuickStatusTimer);
        EzUI.ezInstance.ezQuickStatusTimer = null;
    }

    /**
     * @public @method
     * Adds the class ezFade25 (opacity .25) to the element
     * @param {string} id
     */
    ezAddDisabledFade(id) {
        EzUI.ezInstance.ezAddDisabledFade$(EzUI.ezInstance.ezNormalizeId(id));
    }

    /**
     * @public @method
     * Adds the class ezFade25 (opacity .25) to the element
     * @param {string} selector
     */
    ezAddDisabledFade$(selector) {
        $(selector).addClass('ezFade25');
    }

    /**
     * @public @method
     * Removes the class ezFade25 (opacity .25) from the image.
     * @param {string} id
     */
    ezRemoveDisabledFade(id) {
        EzUI.ezInstance.ezRemoveDisabledFade$(EzUI.ezInstance.ezNormalizeId(id));
    }

    /**
     * @public @method
     * Removes calss ezFade25 (opacity .25) from the image.
     * Requires ezclocker-base2015.css
     * @param {string} imageId
     */
    ezRemoveDisabledFade$(selector) {
        $(selector).removeClass('ezFade25');
    }

    /**
     * @protected
     * Disables an image element by setting it's opacity to 0.3
     * @param {object|string} elementOrId
     * @returns {Object|null}
     */
    ezDisableImage(elementOrId) {
        let element = EzUI.ezInstance.ezFindByElementOrId(elementOrId);
        if (null == element) {
            return null;
        }

        element.style.opacity = 0.3;

        return element;
    }

    /**
     * @protected
     * Enables an image element by setting it's opacity to 1
     * @param {object|string} elementOrId
     * @returns {Object|null}
     */
    ezEnableImage(elementOrId) {
        let element = EzUI.ezInstance.ezFindByElementOrId(elementOrId);
        if (null == element) {
            return null;
        }

        element.style.opacity = 1;

        return element;
    }

    /**
     * @deprecated Migrate to: EzUI.ezInstance.ezAddElementClass()
     * @public @method
     * Adds a CSS class to an element
     * @param {string} selector
     * @param {string} className
     */
    ezAddClass(id, className) {
        if (EzUI.ezInstance.ezElementExists(id)) {
            let element = document.getElementById(id);
            if (EzObject.isValid(element) && EzObject.isValid(element.classList)) {
                element.classList.add(className);
                return true;
            }
        }

        return EzUI.ezInstance.ezAddClass$(EzUI.ezInstance.ezNormalizeId(id), className);
    }

    /**
     * @deprecated Migrate to: EzUI.ezInstance.ezAddElementClass()
     * @public @method
     * Adds a CSS class to to an element identified by the selector
     * @param {string} selector
     * @param {string} className
     */
    ezAddClass$(selector, className) {
        if (!EzString.hasLength(selector)) {
            throw new EzBadParamException(
                `selector (value=${selector})`,
                EzUI.ezInstance,
                EzUI.ezInstance.ezAddClass$);
        }
        if (!EzString.hasLength(className)) {
            throw new EzBadParamException(
                'className',
                EzUI.ezInstance,
                EzUI.ezInstance.ezAddClass$);
        }

        return $(selector).addClass(className);
    }

    /**
     * @public @method
     * Adds a new class to the element or element with provided id
     * @param {Object|String} elementOrId
     * @param {string} className
     * @returns {Object|null}
     * Returns the element or null if it does not exist.
     */
    ezAddElementClass(elementOrId, className) {
        let element = EzUI.ezInstance.ezFindByElementOrId(elementOrId);
        if (!EzObject.isValid(element)) {
            return null;
        }

        if (!EzString.hasLength(className)) {
            return element;
        }

        if (!element.classList.contains(className)) {
            element.classList.add(className);
        }

        return element;
    }

    /**
     * @public @method
     * Removes a class to the element or element with provided id
     * @param {Object|String} elementOrId
     * @param {string} className
     * @returns {Object|null}
     * Returns the element or null if it does not exist.
     */
    ezRemoveElementClass(elementOrId, className) {
        let element = EzUI.ezInstance.ezFindByElementOrId(elementOrId);
        if (!EzObject.isValid(element)) {
            return null;
        }

        if (!EzString.hasLength(className)) {
            return element;
        }

        if (element.classList.contains(className)) {
            element.classList.remove(className);
        }

        return element;
    }

    /**
     * @public @method
     * Adds a CSS style to an element identified by the provided id
     * @param {string} id
     * @param {string} cssNameValueProperties
     * @param {string} cssValue
     */
    ezAddCss(id, cssNameValueProperties, cssValue) {
        EzUI.ezInstance.ezAddCss$(EzUI.ezInstance.ezNormalizeId(id), cssNameValueProperties, cssValue);
    }

    /**
     * @public @method
     * Adds a CSS style to an element identified by the provided selector
     * @param {string} id
     * @param {string} cssName
     * @param {string} cssValue
     */
    ezAddCss$(selector, cssNameValueProperties, cssValue) {
        if (!EzString.hasLength(selector)) {
            throw new EzBadParamException(
                `selector (value=${selector})`,
                EzUI.ezInstance,
                EzUI.ezInstance.ezAnimateElement);
        }

        if (EzString.isString(cssNameValueProperties)) {
            if (!EzString.hasLength(cssNameValueProperties)) {
                ezApi.ezclocker.ezLogger.error(EzString.em`
                A valid css style name is required to add a css style with value ${cssValue} to the element selected
                by ${selector}`);
                return; // no css name provided
            }
            $(selector).css(cssNameValueProperties, cssValue);
            return;
        } else if (EzObject.isValid(cssNameValueProperties)) {
            $(selector).css(cssNameValueProperties);
            return;
        }

        ezApi.ezclocker.ezLogger.error(EzString.em`
        Unable to set CSS for selected=${selector} due to an unreconized cssNameValueProperties value of
        ${cssNameValueProperties}. Expected a key value json object.`);
    }

    /**
     * @public @method
     * Sets a css style on an element
     * @param {object|string} elementOrid
     * @param {string} cssName
     * @param {*} cssValue
     * @returns {Object|null}
     * Returns the element or null if it doesn't exist.
     */
    ezSetElementCss(elementOrId, cssName, cssValue) {
        let element = EzUI.ezInstance.ezFindByElementOrId(elementOrId);

        if (!EzObject.isValid(element)) {
            return null;
        }

        let nextUpper = false;

        let newCssName = '';

        for (let char of cssName) {
            if (nextUpper) {
                newCssName = newCssName + char.toUpperCase();
                nextUpper = false;
            } else if ('-' === char) {
                nextUpper = true;
            } else {
                newCssName = newCssName + char;
            }
        }

        element.style[cssName] = cssValue;

        return element;
    }

    /**
     * @public @method
     * Finds a element by selector with querySelector
     * @param {string} selector
     * @returns {Object}
     * Returns the element found (if any)
     */
    ezFindElementBySelector(selector) {
        if (!EzString.hasLength(selector)) {
            throw new EzBadParamException(
                'selector',
                EzUI.ezInstance,
                EzUI.ezInstance.ezFindElementBySelector);
        }

        return document.querySelector(selector);
    }

    /**
     * @public @method
     * Reparents the elementOrId to the provided newParentElementOrId. The element's original parent's id is stored
     * in ezOriginalParentId.
     * @param {object|string} elementOrId
     * @param {object|string} newParentElementOrId
     * @returns {Object}
     * Returns the element that was re-parented.
     */
    ezReparentElement(elementOrId, newParentElementOrId) {
        let element = EzUI.ezInstance.ezFindByElementOrId(elementOrId);
        if (!EzObject.isValid(element)) {
            throw new EzBadParamException(
                'elementOrId',
                EzUI.ezInstance,
                EzUI.ezInstanceezReparentElement);
        }
        let parentElement = EzUI.ezInstance.ezFindByElementOrId(newParentElementOrId);
        if (!EzObject.isValid(parentElement)) {
            throw new EzBadParamException(
                'newParentElementOrId',
                EzUI.ezInstance,
                EzUI.ezInstance.ezReparentElement);
        }

        if (EzObject.isValid(element.parentElement)) {
            element.ezOriginalParentId = EzString.stringOrEmpty(element.parentElement.id);
        }
        parentElement.appendChild(element);

        return element;
    }

    /**
     * @public @method
        Injects a script tag into the document
     * @param {String|null} src
     * @param {String|null} innerHTML
     */
    ezInjectScript(src, innerHTML) {
        let script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = ezApi.isNotEmptyString(src) ? src : '';
        script.innerHTML = ezApi.isNotEmptyString(innerHTML) ? innerHTML : '';
        document.head.appendChild(script);
    }

    /**
     * @public @method
     * Prepends the html to the element identified by the id
     * @param {string} id
     * @param {string} html
     */
    ezPrependHtml(id, html) {
        EzUI.ezInstance.ezPrependHtml$(EzUI.ezInstance.ezNormalizeId(id), html);
    }

    /**
     * @public @method
     * Prepends the html to the element identified by the selector
     * @param {string} selector
     * @param {string} html
     */
    ezPrependHtml$(selector, html) {
        if (EzUI.ezInstance.ezElementExists$(selector)) {
            ezApi.ez$(selector).prepend(html);
        }
    }

    /**
     * @public @method
     * Enables jQuery tool tips for the document
     */
    ezEnableTooltips() {
        ezApi.ezDocument().tooltip();
    }

    /**
     * @public @method
     * Fades the body of the page in
     * @returns {Promise.resolve}
     */
    ezFadeInBody() {
        return EzUI.ezInstance.ezShow$('body');
    }

    /**
     * @public @method
     * Returns the JQ reference to the document body tag
     */
    ezBody() {
        return $('body');
    }

    /**
     * @public @method
     * Sets an image elements src attribute.
     * @param {string} id
     * @param {string} imageSrc
     */
    setImgElementSrc(id, imageSrc) {
        if (!EzString.hasLength(id)) {
            return; // no id, cannot set
        }
        EzUI.ezInstance.ezId(id).attr('src', imageSrc);
    }

    /**
     * @public @method
     * Sets an img element's src attribute to the provided imageSrc value.
     * @param {object|string} elementOrId
     * @param {string} imageSrc
     * @returns {Object|null}
     * Returns a reference to the element found (if any)
     */
    ezSetImgElementSrc(elementOrId, imageSrc) {
        let element = EzUI.ezInstance.findByElementOrId(elementOrId);
        if (!EzObject.isValid(element)) {
            return null;
        }

        element.src = imageSrc;

        return element;
    }

    /**
     * @public @method
     * Displays the element associated with the id.
     * @param {object|string} elementOrId
     * @returns {Object|null}
     * Returns the element (if any)
     */
    ezShow(elementOrId) {
        const self = EzUI.ezInstance;

        // Most likely dealing with the element reference
        let element = self.ezFindByElementOrId(elementOrId);
        if (!EzObject.isValid(element)) {
            return null;
        }

        $(ezApi.ezTemplate`#${element.id}`).show('fade', {}, 500);
    }

    /**
     * @public @method
     * Displays the element associated with the selector.
     * @param {string} selector
     * @param {function|null} cb
     * @deprecated Migrate to just using EzUI.ezInstance.ezShow() with the element or id param.
     */
    ezShow$(selector) {
        if (!EzUI.ezInstance.ezElementExists(selector)) {
            return;
        }

        EzUI.ezInstance.ezId$(selector).show('fade', {}, 500);
    }

    /**
     * @public @method
     * Clears all special animation classes from the element
     * @param {object|string} elementOrId
     * @returns {Object|null}
     * Returns the element (if found)
     */
    ezClearAllAnimations(elementOrId) {
        let element = EzUI.ezInstance.ezFindByElementOrId(elementOrId);
        if (!EzObject.isValid(element)) {
            return null;
        }

        element.classList.remove(
            'animate__fadeIn',
            'animate__fadeOut',
            'animate__slideOutUp',
            'animate__slideInDown',
            'animate__zoomIn',
            'animate__zoomOut',
            'animate__flipInX',
            'animate__flipOutX',
            'animate__slow',
            'animate__delay-2s',
            'animate__animated'
        );

        return element;
    }

    /**
     * @public @method
     * Applies animation effects to the provided element or element associated with the provided id.
     * @param {Object|String} elementOrId
     * @param {string} animationClass
     * @returns {Object}
     * Return the element if it exists.
     */
    ezAnimateElement(elementOrId, animationClass) {
        if (ezApi.ez(animationClass)) {
            throw new EzBadParamException(
                'animationClass',
                EzUI.ezInstance,
                EzUI.ezInstance.ezAnimateElement);
        }

        let element = EzUI.ezInstance.ezClearAllAnimations(elementOrId);
        if (!EzObject.isValid(element)) {
            return null;
        }

        element.classList.add('animate__animated', animationClass, 'animate__delay-2s', 'animate__slow');

        return element;
    }

    /**
     * @public @method
     * Shows an element with a zoom animation.
     * @param {object|string} elementOrId
     * @returns {Object|null}
     * Returns the element (if found)
     */
    ezAniZoomIn(elementOrId) {
        let element = EzUI.ezInstance.ezAnimateElement(elementOrId, 'animate__zoomIn');
        if (!EzObject.isValid(element)) {
            return null;
        }

        return EzUI.ezInstance.ezRestoreStoredDisplayStyle(element);
    }

    /**
     * @public @method
     * Shows an element with a zoom animation.
     * @param {object|string} elementOrId
     * @returns {Object|null}
     * Returns the element (if found)
     */
    ezAniZoomOut(elementOrId) {
        return EzUI.ezInstance.ezAnimateElement(
            EzUI.ezInstance.ezStoreDisplayStyleAndHide(elementOrId),
            'animate__zoomOut'
        );
    }

    /**
     * @public @method
     * Shows an element with a flip animation.
     * @param {object|string} elementOrId
     * @returns {Object|null}
     * Returns the element (if found)
     */
    ezAniFlipIn(elementOrId) {
        let element = EzUI.ezInstance.ezAnimateElement(elementOrId, 'animate__flipInX');
        if (!EzObject.isValid(element)) {
            return null;
        }
        return EzUI.ezInstance.ezRestoreStoredDisplayStyle(element);
    }

    /**
     * @public @method
     * Hides the HTML element with a flip animation
     * @param {object|string} elementOrId
     * @returns {Object|null}
     * Returns the element (if found)
     */
    ezAniFlipOut(elementOrId) {
        return EzUI.ezInstance.ezAnimateElement(
            EzUI.ezInstance.ezStoreDisplayStyleAndHide(elementOrId),
            'animate__flipOutX'
        );
    }

    /**
     * @public @method
     * Shows an element by sliding down.
     * @param {object|string} elementOrId
     * @returns {Object|null}
     * Returns the element (if found)
     */
    ezAniSlideDown(elementOrId) {
        let element = EzUI.ezInstance.ezAnimateElement(elementOrId, 'animate__slideInDown');
        if (!EzObject.isValid(element)) {
            return null;
        }

        element.classList.remove('ezHiddenDefault');
        return EzUI.ezInstance.ezRestoreStoredDisplayStyle(element);
    }

    /**
     * @public @method
     * Hides an element by sliding up.
     * @param {object|string} elementOrId
     * @returns {Object|null}
     * Returns the element (if found)
     */
    ezAniSlideUp(elementOrId) {
        return EzUI.ezInstance.ezAnimateElement(
            EzUI.ezInstance.ezStoreDisplayStyleAndHide(elementOrId),
            'animate__slideOutUp'
        );
    }

    /**
     * @public @method
     * Shows an element by sliding down.
     * @param {object|string} elementOrId
     * @returns {Object|null}
     * Returns the element (if found)
     */
    ezAniFadeIn(elementOrId) {
        let element = EzUI.ezInstance.ezAnimateElement(elementOrId, 'animate__fadeIn');
        if (!EzObject.isValid(element)) {
            return null;
        }

        element.classList.remove('ezHiddenDefault', 'ezHiddenByDefault');
        return EzUI.ezInstance.ezRestoreStoredDisplayStyle(element);
    }

    /**
     * @public @method
     * Hides an element by sliding up.
     * @param {object|string} elementOrId
     * @returns {Object|null}
     * Returns the element (if found)
     */
    ezAniFadeOut(elementOrId) {
        return EzUI.ezInstance.ezAnimateElement(
            EzUI.ezInstance.ezStoreDisplayStyleAndHide(elementOrId),
            'animate__fadeOut'
        );
    }

    /**
     * @public @method
     * Safely executes the provided EzUIAnimationFunctionName or performs the default clear animations call instead.
     * @param {object|string} elementOrId
     * @param {String|null} ezUIAnimationFunctionName
     */
    ezSafeExecuteAniFunction(elementOrId, ezUIAnimationFunctionName) {
        if (!EzObject.isValid(elementOrId)) {
            throw new EzBadParamException(
                'elementOrId',
                EzUI.ezInstance,
                EzUI.ezInstance.ezSafeExecuteAniFunction);
        }

        if (
            !EzObject.isValid(ezUIAnimationFunctionName) ||
            !EzString.hasLength(ezUIAnimationFunctionName) ||
            !ezApi.ezHasOwnProperty(EzUI.ezInstance, ezUIAnimationFunctionName)
        ) {
            ezApi.ezclocker.ezLogger.error(
                'The provided EzUIAnimationFunctionName is not a valid animation function for EzUI.'
            );
            return EzUI.ezInstance.ezClearAllAnimations(elementOrId);
        }

        return EzUI.ezInstance[ezUIAnimationFunctionName](elementOrId);
    }

    /**
     * @public @method
     * Applies the provided animation associated with the provided ezAnimationId and then
     * shows the element associated with the provided id. Applies the provided
     * EzUIAnimationFunction (if any) before showing.
     * @param {object|string} elementOrId
     * @param {Function|null} EzUIAnimationFunctionName
     *@returns {String|null}
     * Returns the element (if found)
     */
    ezAniShow(elementOrId, EzUIAnimationFunctionName) {
        if (!EzObject.isValid(EzUIAnimationFunctionName)) {
            // Use the default 'ezFadeIn' animation
            EzUIAnimationFunctionName = 'ezAniFadeIn';
        }

        return EzUI.ezInstance.ezSafeExecuteAniFunction(
            EzUI.ezInstance.ezRestoreStoredDisplayStyle(elementOrId),
            EzUIAnimationFunctionName
        );
    }

    /**
     * @public @method
     * Applies the provided animation associated with the provided ezAnimationId and then
     * shows the element associated with the provided id. Applies the provided
     * EzUIAnimationFunction (if any) before showing.
     * @param {String|null} elementOrId
     * @param {string} innerHTML
     * @param {String|null} EzUIAnimationFunctionName
     * @returns {Object|null}
     * Returns the element (if found)
     */
    ezAniShowContent(elementOrId, innerHTML, EzUIAnimationFunctionName) {
        if (!EzString.isString(EzUIAnimationFunctionName)) {
            // Use the default 'ezFadeIn' animation
            EzUIAnimationFunctionName = 'ezAniFadeIn';
        }

        return EzUI.ezInstance.ezAniShow(
            EzUI.ezInstance.ezSetContent(elementOrId, EzString.stringOrEmpty(innerHTML)),
            EzUIAnimationFunctionName
        );
    }

    /**
     * @public @method
     * Applies the provided animation associated with the provided ezAnimationId and then
     * shows the element associated with the provided id. Applies the provided
     * EzUIAnimationFunction (if any) before showing.
     * @param {String|null} elementOrId
     * @param {String|null} innerHTML
     * @returns {Object|null}
     * Returns the element (if found)
     */
    ezShowContent(elementOrId, innerHTML) {
        EzUI.ezInstance.ezShow(EzUI.ezInstance.ezSetContent(elementOrId, innerHTML));
    }

    /**
     * @public @method
     * Applies the provided animation associated with the provided ezAnimationId and then
     * shows the element associated with the provided id. Applies the provided
     * EzUIAnimationFunction (if any) before showing.
     * @param {String|null} elementOrId
     * @param {String|null} innerHTML
     * @returns {Object|null}
     * Returns the element (if found)
     */
    ezShowElementContent(elementOrId, innerHTML) {
        const self = EzUI.ezInstance;
        self.ezShowElement(self.ezSetContent(elementOrId, innerHTML));
    }

    /**
     * @public @method
     * Hides the HTML element associated by the provided id. Applies the provided
     * EzUIAnimationFunction (if any) before hiding.
     * @param {object|string} elementOrId
     * @param {Function|null} EzUIAnimationFunctionName
     * @returns {Object|null}
     * Returns the element (if found)
     */
    ezAniHide(elementOrId, EzUIAnimationFunctionName) {
        if (!EzString.isString(EzUIAnimationFunctionName)) {
            // Use the default 'ezFadeIn' animation
            EzUIAnimationFunctionName = 'ezAniFadeOut';
        }

        return EzUI.ezInstance.ezSafeExecuteAniFunction(
            EzUI.ezInstance.ezStoreDisplayStyleAndHide(elementOrId),
            EzUIAnimationFunctionName
        );
    }

    /**
     * @public @method
     * Hides the HTML element associated by the provided id and clears the innerHTML value. Applies the provided
     * EzUIAnimationFunction (if any) before hiding.
     * @param {object|string} elementOrId
     * @param {String|null} EzUIAnimationFunctionName
     * @returns {Object|null}
     * Returns the element (if found)
     */
    ezAniHideClear(elementOrId, EzUIAnimationFunctionName) {
        return EzUI.ezInstance.ezAniHide(
            EzUI.ezInstance.ezSetContent(elementOrId, ''),
            EzUIAnimationFunctionName);
    }

    /**
     * @public @method
     * Hides the HTML element associated by the provided id and clears the innerHTML value.
     * @param {object|string} elementOrId
     * @returns {Object|null}
     * Returns the element (if found)
     */
    ezHideClear(elementOrId) {
        let element = EzUI.ezInstance.ezFindByElementOrId(elementOrId);
        if (!EzObject.isValid(element)) {
            return null;
        }

        EzUI.ezInstance.ezHide(EzUI.ezInstance.ezSetContent(elementOrId, ''));
    }

    /**
     * @public @method
     * Sets the innerHTML of the provided element or element for the provided element id.
     * @param {object|string} elementOrId
     * @param {string} innerHTML
     * @returns {Object|null}
     * Returns the element (if available)
     */
    ezSetContent(elementOrId, innerHTML) {
        if (!EzString.isString(innerHTML)) {
            throw new EzBadParamException(
                'innerHTML',
                EzUI.ezInstance,
                EzUI.ezInstance.ezStoreDisplayStyleAndHide);
        }

        let element = EzUI.ezInstance.ezFindByElementOrId(elementOrId);
        if (!EzObject.isValid(element)) {
            return null;
        }

        element.innerHTML = innerHTML;
        return element;
    }

    /**
     * @public @method
     * Returns the innerHTML value of the element
     * @param {Object|String} elementOrId
     * @returns {String|null}
     * Returns the innerHTML value for the element, or null if the element does not exist.
     */
    ezGetInnerHtml(elementOrId) {
        let element = EzUI.ezInstance.ezFindByElementOrId(elementOrId);
        if (!EzObject.isValid(element)) {
            return null;
        }

        return EzString.stringOrEmpty(element.innerHTML);
    }

    /**
     * @public @method
     * Stores the elements styles.display (normall done before hiding the element so the styles.display
     * value can be restored to the original state when it is shown).
     * @param {Object|String} elementOrId
     * @returns {Object|null}
     * Returns the element (if any)
     */
    ezStoreDisplayStyleAndHide(elementOrId) {
        let element = EzUI.ezInstance.ezFindByElementOrId(elementOrId);
        if (!EzObject.isValid(element)) {
            throw new EzBadParamException(
                'elementOrId',
                EzUI.ezInstance,
                EzUI.ezInstance.ezStoreDisplayStyleAndHide);
        }

        if (ezApi.ezHasOwnProperty(element.style, 'display')) {
            element.dataset[EzUI.ezInstance.EZUI_HIDDEN_STORED_DISPLAY_STYLE_DATASET_NAME] = element.style.display;
        }

        element.style.display = 'none';
        return element;
    }

    /**
     * @public @method
     * Obtains the style.display value stored in the element's dataset (if any)
     * Removes the dataste property
     * Returns the value or the default 'inherited' value if no value was available.
     * @param {Object|String} elementOrId
     * @returns {string}
     */
    ezRestoreStoredDisplayStyle(elementOrId) {
        let element = EzUI.ezInstance.ezFindByElementOrId(elementOrId);
        if (!EzObject.isValid(element)) {
            throw new EzBadParamException(
                'elementOrId',
                EzUI.ezInstance,
                EzUI.ezInstance.ezRestoreStoredDisplayStyle);
        }

        if (EzString.hasLength(element.style.display) && 'none' !== element.style.display) {
            return element; // keep what is there
        }

        if (!ezApi.ezHasOwnProperty(element.dataset, EzUI.ezInstance.EZUI_HIDDEN_STORED_DISPLAY_STYLE_DATASET_NAME)) {
            return EzUI.ezInstance.EZUI_DEFAULT_DISPLAY_STYLE_VALUE;
        }

        let displayStyleValue = EzString.stringOrEmpty(
            element.dataset[EzUI.ezInstance.EZUI_HIDDEN_STORED_DISPLAY_STYLE_DATASET_NAME]
        );

        delete element.dataset[EzUI.ezInstance.EZUI_HIDDEN_STORED_DISPLAY_STYLE_DATASET_NAME];

        return EzString.hasLength(displayStyleValue)
            ? displayStyleValue
            : EzUI.ezInstance.EZUI_DEFAULT_DISPLAY_STYLE_VALUE;
    }

    /**
     * @public @method
     * Returns either the element reference or the element assocaited with the id by evaluating the
     * passed in elementOrId as a string or not.
     * @param {object|string} elementOrId
     * @returns {Object|null}
     */
    ezFindByElementOrId(elementOrId) {
        if (!EzString.isString(elementOrId) && !EzObject.isObject(elementOrId)) {
            throw new EzBadParamException(
                'elementOrId',
                EzUI.ezInstance,
                EzUI.ezInstance.ezFindByElementOrId);
        }

        if (globalThis.window === elementOrId || 'window' === elementOrId) {
            return globalThis.window;
        }

        if (globalThis.window.document.html === elementOrId || 'html' === elementOrId) {
            return globalThis.window.document.html;
        }

        if (globalThis.window.document === elementOrId || 'document' === elementOrId) {
            return globalThis.window.document;
        }

        if (globalThis.window.document.body === elementOrId || 'body' === elementOrId) {
            return globalThis.window.document.body;
        }

        if (globalThis.window.document.head === elementOrId || 'head' === elementOrId) {
            return globalThis.window.document.head;
        }

        if (globalThis.window.document.title === elementOrId || 'title' === elementOrId) {
            return globalThis.window.document.title;
        }

        // If the elementOrId is an object, assume it is an HTML element and return it.
        // Otherwise, look up the HTML element by id and return it.
        return EzString.hasLength(elementOrId)
            ? document.getElementById(elementOrId)
            : elementOrId;
    }

    /**
     * @public @method
     * Submits the form represented by the elementOrId param.
     * @param {object|string} elementOrId
     * @returns {Object|null}
     * Returns the element (if any)
     */
    ezSubmitForm(elementOrId) {
        let element = EzUI.ezInstance.ezFindByElementOrId(elementOrId);
        if (!EzObject.isValid(element)) {
            throw new EzBadParamException(
                'elementOrId',
                EzUI.ezInstance,
                EzUI.ezInstance.ezSubmitForm);
        }

        element.submit();

        return element;
    }

    /**
     * @public @method
     * Hides the HTML element associated by the provided id
     * @param {Object|String} elementOrId
     * @returns {Object|null}
     * Returns the element (if exists)
     */
    ezHide(elementOrId) {
        const self = EzUI.ezInstance;

        if (EzString.isString(elementOrId)) {
            let id = EzUI.ezInstance.ezNormalizeId(elementOrId);
            if (EzUI.ezInstance.ezElementExists(id)) {
                EzUI.ezInstance.ezId(id).hide('fade', {}, 500);
            } else {
                EzUI.ezInstance.ezHide$(elementOrId);
            }
            return self.ezFindByElementOrId(elementOrId);
        }

        // Most likely working with the element reference
        let element = self.ezFindByElementOrId(elementOrId);
        if (!EzObject.isValid(element)) {
            return null;
        }

        EzUI.ezInstance.ezId(element.id).hide('fade', {}, 500);
        return element;
    }

    /**
     * @public @method
     * Hides the element or associated by the provided id
     * @param {Object|String} elementOrId
     * @returns {Object|null}
     * Returns the element (if exists)
     */
    ezHideElement(elementOrId) {
        let element = EzUI.ezInstance.ezFindByElementOrId(elementOrId);
        if (!EzObject.isValid(element)) {
            ezApi.ezclocker.ezLogger.warn('Cannot hide an element that does not exist.');
            return null;
        }

        let displayStyle = getComputedStyle(element, null).display;
        if ('none' === displayStyle) {
            // Already hidden
            return;
        }

        element.ezDisplay = displayStyle;

        element.style.display = 'none';
        return element;
    }

    /**
     * @public @method
     * Clear the innerHTML of the element
     * @param {Object|String} elementOrId
     * @returns {Object|null}
     * Returns the element (if exists)
     */
    ezClearElement(elementOrId) {
        let element = EzUI.ezInstance.ezFindByElementOrId(elementOrId);
        if (!EzObject.isValid(element)) {
            return null;
        }

        element.innerHTML = '';
        return element;
    }

    /**
     * @public @method
     * Sets the visibility of the element
     * @param {object|string} elementOrId
     * @param {boolean} visible
     */
    ezSetElementVisible(elementOrId, visible) {
        if (EzBoolean.isTrue(visible)) {
            EzUI.ezInstance.ezShowElement(elementOrId);
        }

        EzUI.ezInstance.ezHideElement(elementOrId);
    }

    /**
     * @public @method
     * Shows the element or element associated by the provided id
     * @param {Object|String} elementOrId
     * @param {String|null} optionalDisplayStyle
     * @returns {Object|null}
     * Returns the element (if exists)
     */
    ezShowElement(elementOrId, optionalDisplayStyle) {
        let element = EzUI.ezInstance.ezFindByElementOrId(elementOrId);
        if (!EzObject.isValid(element)) {
            return null;
        }

        if ('none' !== element.style.display) {
            return; // already visible
        }

        if (element.classList.contains('ezHiddenByDefault')) {
            element.style.display = 'none';
            element.classList.remove('ezHiddenByDefault');
        }
        if (element.classList.contains('ezHidden')) {
            element.style.display = 'none';
            element.classList.remove('ezHidden');
        }
        if (element.classList.contains('ezHiddenDefault')) {
            element.style.display = 'none';
            element.classList.remove('ezHiddenDefault');
        }

        if (EzString.hasLength(optionalDisplayStyle)) {
            element.style.display = optionalDisplayStyle;
        } else if (ezApi.ezHasOwnProperty(element, 'ezDisplay') && EzString.hasLength(element.ezDisplay)) {
            element.style.display = element.ezDisplay;
        } else if ('DIV' === element.tagName.toUpperCase()) {
            element.style.display = 'block';
        } else if ('TABLE' === element.tagName.toUpperCase()) {
            element.style.display = 'table';
        } else {
            element.style.display = 'initial';
        }

        return element;
    }

    /**
     * @public @method
     * Adds the animate.css class to the element, then shows the element or element associated by the provided id.
     * NOTE: If the element is already visible, the animation will immediatly run
     * See the following for available animations: https://animate.style/
     * NOTE: This method will resolve the promise AFTER the animation is complete.
     * @param {Object|String} elementOrId
     * @param {string} animationKeyFrame
     * @param {STring|null} optionalDisplayStyle
     * @returns {Promise.resolve}
     * Returns the element (if exists) in the resolve
     */
    ezShowElementAnimated(elementOrId, animationKeyFrame, optionalDisplayStyle) {
        return ezApi.ezAsyncAction((finished) => {
            let element = EzUI.ezInstance.ezFindByElementOrId(elementOrId);
            if (!EzObject.isValid(element)) {
                return EzPromise.resolve(null);
            }

            if (EzString.hasLength(animationKeyFrame)) {
                if (!element.classList.contains('animate__animated')) {
                    element.classList.add('animate__animated');
                }

                let animateClassName = ezApi.ezIdTemplate`animate__${animationKeyFrame}`;
                if (!element.classList.contains(animateClassName)) {
                    element.classList.add(animateClassName);
                }

                element.style.animation = EzString.stringOrEmpty(animationKeyFrame);
                element.style.animationDuration = '0.5s';

                let eventListenerOptions = {
                    once: true,
                };

                element.addEventListener(
                    'animationend',
                    (event) => {
                        EzUI.ezInstance.ezHandleAnimationEnd(event);
                        return finished(element);
                    },
                    eventListenerOptions
                );

                return EzUI.ezInstance.ezShowElement(element, optionalDisplayStyle);
            }

            return finished(EzUI.ezInstance.ezShowElement(element, optionalDisplayStyle));
        });
    }

    /**
     * @public @method
     * Adds the animate.css class to the element, then shows the element or element associated by the provided id.
     * NOTE: If the element is already visible, the animation will immediatly run
     * See the following for available animations: https://animate.style/
     * NOTE: This method will return BEFORE the animation is complete.
     * @param {Object|String} elementOrId
     * @param {string} animationKeyFrame
     * @param {String|null} optionalDisplayStyle
     * @returns {Object|null}
     * Returns the element
     */
    ezShowElementAsyncAnimated(elementOrId, animationKeyFrame, optionalDisplayStyle) {
        let element = EzUI.ezInstance.ezFindByElementOrId(elementOrId);
        if (!EzObject.isValid(element)) {
            return null;
        }

        if (EzString.hasLength(animationKeyFrame)) {
            if (!element.classList.contains('animate__animated')) {
                element.classList.add('animate__animated');
            }

            let animateClassName = ezApi.ezIdTemplate`animate__${animationKeyFrame}`;
            if (!element.classList.contains(animateClassName)) {
                element.classList.add(animateClassName);
            }

            element.style.animation = EzString.stringOrEmpty(animationKeyFrame);
            element.style.animationDuration = '0.5s';

            let eventListenerOptions = {
                once: true,
            };

            element.addEventListener(
                'animationend',
                (event) => {
                    EzUI.ezInstance.ezHandleAnimationEnd(event);
                },
                eventListenerOptions
            );
        }

        return EzUI.ezInstance.ezShowElement(element, optionalDisplayStyle);
    }

    /**
     * @protected @method
     * Handles the end of an animate.css animation and removes the style and event handler.
     * @param {Object} event
     */
    ezHandleAnimationEnd(event) {
        if (!EzObject.isValid(event)) {
            throw new EzBadParamException(
                'event',
                EzUI.ezInstance,
                EzUI.ezInstance.ezHandleAnimationEnd);
        }

        event.stopPropagation();
        event.target.classList.remove('animate__animated', event.animationName);
        event.target.removeEventListener('animationend', EzUI.ezInstance.ezHandleAnimationEnd);
    }

    /**
     * @public @method
     * Adds the animate.css class to the element, then shows the element or element associated by the provided id.
     * NOTE: If the element is already visible, the animation will immediatly run
     * See the following for available animations:
     *     https://animate.style/
     * @param {Object|String} elementOrId
     * @param {string} animationKeyFrame
     * @returns {Object|null}
     * Returns the element (if exists)
     */
    ezHideElementAnimated(elementOrId, animationKeyFrame) {
        let element = EzUI.ezInstance.ezFindByElementOrId(elementOrId);
        if (!EzObject.isValid(element)) {
            return EzPromise.resolve(null);
        }

        return ezApi.ezAsyncAction((finished) => {
            if (EzString.hasLength(animationKeyFrame)) {
                if (!element.classList.contains('animate__animated')) {
                    EzUI.ezInstance.ezAddElementClass(element, 'animate__animated');
                }

                let animateClassName = ezApi.ezIdTemplate`animate__${animationKeyFrame}`;
                if (!element.classList.contains(animateClassName)) {
                    EzUI.ezInstance.ezAddElementClass(element, animateClassName);
                }

                element.style.animation = EzString.stringOrEmpty(animationKeyFrame);
                element.style.animationDuration = '0.3s';

                element.addEventListener(
                    'animationend',
                    (event) => {
                        EzUI.ezInstance.ezHandleAnimationEnd(event);
                        EzUI.ezInstance.ezHideElement(event.target);
                        return finished(event.target);
                    },
                    {
                        once: true,
                    }
                );
            }
        });
    }

    /**
     * @public @method
     * Hides the HTML element associated by the provided id
     * @param {string} selector
     * @deprecated Migrate to EzUI.ezInstance.ezHide() with the element or id param.
     */
    ezHide$(selector) {
        EzUI.ezInstance.ezId$(selector).hide('fade', {}, 500);
    }

    /**
     * @public @method
     * @param {object|string} elementOrId
     * @param {string} ezCacheId
     * @param {*} cacheValue
     */
    ezCacheValue(elementOrId, ezCacheId, cacheValue) {
        const self = EzUI.ezInstance;

        let element = self.ezFindByElementOrId(elementOrId);
        if (!EzObject.isValid(element)) {
            return null;
        }

        if (!ezApi.ezHasOwnProperty(element, EzUI.ezInstance.EZCLOCKER_ELEMENT_CACHE_PROPERTY_NAME)) {
            element[EzUI.ezInstance.EZCLOCKER_ELEMENT_CACHE_PROPERTY_NAME] = {};
        }

        element[EzUI.ezInstance.EZCLOCKER_ELEMENT_CACHE_PROPERTY_NAME][ezCacheId] = cacheValue;
    }

    /**
     * @public @method
     * @param {object|string} elementOrId
     * @param {string} ezCacheId
     * @param {*} aDefaultValue
     */
    ezReadCacheValue(elementOrId, ezCacheId, aDefaultValue) {
        const self = EzUI.ezInstance;

        let element = self.ezFindByElementOrId(elementOrId);
        if (!EzObject.isValid(element)) {
            return null;
        }

        if (!ezApi.ezHasOwnProperty(element, EzUI.ezInstance.EZCLOCKER_ELEMENT_CACHE_PROPERTY_NAME)) {
            element[EzUI.ezInstance.EZCLOCKER_ELEMENT_CACHE_PROPERTY_NAME] = {};
        }
        if (!ezApi.ezHasOwnProperty(element[EzUI.ezInstance.EZCLOCKER_ELEMENT_CACHE_PROPERTY_NAME], ezCacheId)) {
            element[EzUI.ezInstance.EZCLOCKER_ELEMENT_CACHE_PROPERTY_NAME][ezCacheId] = aDefaultValue;
        }

        return element[EzUI.ezInstance.EZCLOCKER_ELEMENT_CACHE_PROPERTY_NAME][ezCacheId];
    }

    /**
     * @public @method
        Uses the jquery.html() function to set the HTML contents of the item associated with the provided element id
     * @param {string} elementOrId
     * @param {string} html
     * @deprecated
        To avoid confusion with the ezHtml class AND to move away from jQuery
        migrate to the move to EzUI.ezInstance.ezSetContent() with the element or id param.
     */
    ezHtml(elementOrId, html) {
        return EzUI.ezInstance.ezSetContent(elementOrId, html);
    }

    /**
     * @public @method
        Uses the jquery.html() function to set the HTML contents of the item associated with the provided jquery selectolr
     * @param {string} id
     * @param {string} html
     * @deprecated Migrate to the move to EzUI.ezInstance.ezSetContent() with the element or id param.
     */
    ezHtml$(selector, html) {
        if (!EzUI.ezInstance.ezElementExists$(selector)) {
            return;
        }
        EzUI.ezInstance.ezId$(selector).html(html);
    }

    /**
     * @public @method
     * Sets the innerHTML of the element associated by the provided id.
     * @param {string} elementOrId
     * @param {string} html
     * @returns {Object|null}
     * Returns the element (if exists)
     * @deprecated Migrate to the EzUI.ezInstance.ezSetContent() with the element or id param.
     */
    ezContent(elementOrId, html) {
        return EzUI.ezInstance.ezSetContent(elementOrId, html);
    }

    /**
     * @public @method
        Obtains the innter html content of the element with elementOrId
     * @param {object|string} elementOrId
     * @returns {string}
     */
    ezGetElementContent(elementOrId) {
        let element = EzUI.ezInstance.ezFindByElementOrId(elementOrId);
        if (!EzObject.isValid(element)) {
            return null;
        }

        return element.innerHTML;
    }

    /**
     * @public @method
        Clears the innerHTML of the provided element or element associated with the provided id.
     * @returns {Object}
     * Returns the element reference (if exists)
     */
    ezClearContent(elementOrId) {
        return EzUI.ezInstance.ezSetContent(elementOrId, '');
    }

    /**
     * @deprecated
     * Migrate to EzUI.ezInstance.ezAppendContent(elementOrId, html);
     * @public @method
        Appends the provided HTML to the element with id
     * @param {string} id
     * @param {string} html
     */
    ezAppend(id, html) {
        EzUI.ezInstance.ezAppendContent(id, html);
    }

    /**
     * @public @method
        Appends the provided appendHtml to the innerHTML property of the provided element or element associated with the
     * provided id.
     * @param {Object|String} elementOrId
     * @param {string} appendHtml
     * @returns {Object|null}
     * Returns the element (if exists)
     */
    ezPrependContent(elementOrId, appendHtml) {
        let element = EzUI.ezInstance.ezFindByElementOrId(elementOrId);

        if (!element) {
            throw new EzBadParamException(
                `elementOrId (value=${elementOrId})`,
                EzUI.ezInstance,
                EzUI.ezInstance.ezPrependContent);
        }

        element.insertAdjacentHTML('afterbegin', appendHtml);

        return element;
    }

    /**
     * @public @method
        Appends the HTML to the inner html of the element associated with the
     * provided id
     * @param {string} id
     * @param {string} html
     * @deprecated Migrate to the EzUI.ezInstance.ezAppendContent() with the element or id param.
     */
    ezAppendHtml(elementOrId, appendHtml) {
        return EzUI.ezInstance.ezAppendContent(elementOrId, appendHtml);
    }

    /**
     * @deprecated
     * Migrate to the EzUI.ezInstance.ezAppendContent() with the element or id param.
     * @public @method
        Uses the jquery.append() function to set the HTML contents of the item associated with the provided id
     * @param {string} selector
     * @param {string} html
     */
    ezAppend$(selector, appendHtml) {
        $(selector).append(appendHtml);
    }

    /**
     * @deprecated
     * Migrate to the EzUI.ezInstance.ezAppendContent() with the element or id param.
     * @public @method
        Uses the jquery.append() function to set the HTML contents of the item associated with the provided id
     * @param {string} selector
     * @param {string} html

     */
    ezAppendHtml$(selector, appendHtml) {
        EzUI.ezInstance.ezAppend$(selector, appendHtml);
    }

    /**
     * @public @method
        Appends the provided appendHtml to the innerHTML property of the provided element or element associated with the
     * provided id.
     * @param {Object|String} elementOrId
     * @param {string} appendHtml
     * @returns {Object|null}
     * Returns the element (if exists)
     */
    ezAppendContent(elementOrId, appendHtml) {
        let element = EzUI.ezInstance.ezFindByElementOrId(elementOrId);
        if (element) {
            element.insertAdjacentHTML('beforeend', appendHtml);
            return element;
        }

        return null;
    }

    /**
     * @public @method
        Appends a script tag as the last child of the head tag in the HTML.
     * @param {string} id
     * @param {string} src
     * @param {boolean} async
     * @returns {Promise.resolve}
     */
    ezAppendScriptTag(id, src, async) {
        return ezApi.ezAsyncAction(
            (finished) => {
                let scriptTag = document.createElement('script');
                scriptTag.id = id;
                scriptTag.src = src;
                scriptTag.async = EzBoolean.isTrue(async);

                scriptTag.onload = () => {
                    return finished();
                };

                document.head.append(scriptTag);
            });
    }

    /**
     * @public @method
        Prepends the script tag as the first child of the head tag in the HTML.
     * @param {string} id
     * @param {string} src
     * @param {boolean} async
     * @returns {Promise.resolve}
     */
    ezPrependScriptTag(id, src, async) {
        return ezApi.ezAsyncAction(
            (finished) => {
                let scriptTag = document.createElement('script');
                scriptTag.id = id;
                scriptTag.src = src;
                scriptTag.async = EzBoolean.isTrue(async);

                scriptTag.onload = () => {
                    return finished();
                };

                document.head.prepend(scriptTag);
            });
    }
    ezAppendContent$(selector, html) {
        if (!EzUI.ezInstance.ezElementExists$(selector)) {
            return; // no element to insert html into
        }

        EzUI.ezInstance.ezId$(selector).append(html);
    }

    /**
     * @public @method
     * Hooks a element event with the provided function
     * @param {string} id
     * @param {string} eventName
     * @param {function} functionHandler
     * @returns {*}
     * Returns response from jquery.on()
     * @deprecated
     * Do not use Jquery events
     * Migrate to:
     *  import { EzEventEngine } from '/ezlibrary/ez-event-engine.js';
     *  ezApi.ezclocker.ezEventEngine.ezWantElementEvent(...)
     */
    ezHookElementEvent(id, eventName, functionHandler) {
        return EzUI.ezInstance.ezHookElementEvent$(EzUI.ezInstance.ezNormalizeId(id), eventName, functionHandler);
    }

    /**
     * @public @method
     * Hooks a element event with the provided function
     * @param {string} id
     * @param {string} eventName
     * @param {function} functionHandler
     * @returns {*}
     * Returns response from jquery.on()
     * @deprecated
     * Do not use Jquery events
     * Migrate to:
     *  import { EzEventEngine } from '/ezlibrary/ez-event-engine.js';
     *  ezApi.ezclocker.ezEventEngine.ezWantElementEvent(...)
     */
    ezHookElementEvent$(selector, eventName, functionHandler) {
        if (!EzString.hasLength(selector)) {
            throw new EzBadParamException(
                `selector (value=${selector})`,
                EzUI.ezInstance,
                EzUI.ezInstance.ezHookElementEvent$);
        }
        if (!EzString.hasLength(eventName)) {
            throw new EzBadParamException(
                `eventName (value=${eventName})`,
                EzUI.ezInstance,
                EzUI.ezInstance.ezHookElementEvent$);
        }
        if (!ezApi.ezIsFunction(functionHandler)) {
            throw new EzBadParamException(
                'functionHandler',
                EzUI.ezInstance,
                EzUI.ezInstance.ezHookElementEvent$);
        }

        return EzUI.ezInstance.ezId$(selector).on(eventName, functionHandler);
    }

    /**
     * @public @method
        Unhooks the event on the element referenced by id
     * @param {string} id
     * @param {string} eventName
     * @returns {*}
     * Returns response from jquery.off()
     * @deprecated
        Do not use Jquery events
     * Migrate to:
        import { EzEventEngine } from '/ezlibrary/ez-event-engine.js';
        ezApi.ezclocker.ezEventEngine.ezUnwantElementEvent(...)
     */
    ezUnHookElementEvent(id, eventName, handler) {
        return EzUI.ezInstance.ezUnHookElementEvent$(EzUI.ezInstance.ezNormalizeId(id), eventName, handler);
    }

    /**
     * @public @method
        Unhooks the event on the element referenced by id
     * @param {string} id
     * @param {string} eventName
     * @returns {*}
     * Returns response from jquery.off()
     * @deprecated
        Do not use Jquery events
     * Migrate to:
        import { EzEventEngine } from '/ezlibrary/ez-event-engine.js';
        ezApi.ezclocker.ezEventEngine.ezWantEvent(...)
     */
    ezUnHookElementEvent$(selector, eventName, handler) {
        if (!EzString.hasLength(selector)) {
            throw new EzBadParamException(
                `selector (value=${selector})`,
                EzUI.ezInstance,
                EzUI.ezInstance.ezUnHookElementEvent$);
        }
        if (!EzString.hasLength(eventName)) {
            throw new EzBadParamException(
                `eventName (value=${eventName})`,
                EzUI.ezInstance,
                EzUI.ezInstance.ezUnHookElementEvent$);
        }

        return EzUI.ezInstance.ezId$(selector).off(eventName, handler);
    }

    /**
     * @public @method
     * Creates the ezEventEngine event name of a specific element + element event.
     * @param {string} elementId
     * @param {string} eventName
     * @returns {string}
     */
    ezBuildInternalEzEventEngineEventName(elementId, eventName) {
        if (!EzString.hasLength(elementId)) {
            throw new EzBadParamException(
                'elementId',
                EzUI.ezInstance,
                EzUI.ezInstance.ezBuildInternalEzEventEngineEventName);
        }
        if (!EzString.hasLength(eventName)) {
            throw new EzBadParamException(
                'eventName',
                EzUI.ezInstance,
                EzUI.ezInstance.ezBuildInternalEzEventEngineEventName);
        }

        return '{elementId}_EzUXOn{eventName}'
            .replace(/{elementId}/gi, elementId)
            .replace(/{eventName}/gi, eventName);
    }

    /**
     * @public @method
     * @deprecated
     * Migrate to EzEventEngine functionality
     * Will get removed in a future release.
     * @public @method
     */
    ezHookUXEvent(elementOrId, elementEventName, handlerName, handlerFunction) {
        const self = EzUI.ezInstance;

        let element = EzUI.ezInstance.ezFindByElementOrId(elementOrId);
        if (!EzObject.isValid(element)) {
            throw new EzBadParamException(
                'elementOrId',
                EzUI.ezInstance,
                EzUI.ezInstance.ezHookUXEvent);
        }

        if (!EzString.hasLength(elementEventName)) {
            throw new EzBadParamException(
                'elementEventName',
                EzUI.ezInstance,
                EzUI.ezInstance.ezHookUXEvent);
        }
        elementEventName = elementEventName.toLowerCase();

        if (!EzString.hasLength(handlerName)) {
            throw new EzBadParamException(
                'handlerName',
                EzUI.ezInstance,
                EzUI.ezInstance.ezHookUXEvent);
        }
        if (!ezApi.ezIsFunction(handlerFunction)) {
            throw new EzBadParamException(
                'handlerFunction',
                EzUI.ezInstance,
                EzUI.ezInstance.ezHookUXEvent);
        }

        let ezEventEngineEventName = self.ezBuildInternalEzEventEngineEventName(element.id, elementEventName);
        let actualEventName = elementEventName;
        if (!ezApi.ezHasOwnProperty(self.ezHookedElementEvents, ezEventEngineEventName)) {
            // Element click event has never been registered. Register it now.
            ezApi.ezclocker.ezEventEngine.ezRegisterEvent(EzUI.ezApiName, ezEventEngineEventName);
            element[actualEventName] = (event) => {
                ezApi.ezclocker.ezEventEngine.ezTriggerEvent(
                    ezEventEngineEventName,
                    ezApi.ezclocker.ezEventEngine.ezBuildEventData(EzUI.ezApiName, 'UX event', event));
            };
            self.ezHookedElementEvents[ezEventEngineEventName] = element[actualEventName];
        }

        // Hook up the handlers event
        ezApi.ezclocker.ezEventEngine.ezWantEvent(ezEventEngineEventName, handlerName, handlerFunction);
    }

    /**
     * @deprecated
     * Migrate to EzEventEngine functionality
     * Will get removed in a future release.
     * @public @method
        Removes ALL want events for the provided element or id (including the internally hooked one in EzUI)
     * @param {object|string} elementOrId
     * @param {string} elementEventName
     * @returns {Object}
     */
    ezUnhookAll(elementOrId, elementEventName) {
        const self = EzUI.ezInstance;

        if (!EzObject.isValid(elementOrId)) {
            throw new EzBadParamException(
                'elementOrId',
                EzUI.ezInstance,
                EzUI.ezInstance.ezUnhookAll);
        }
        if ((EzString.isString(elementOrId) && !EzString.hasLength(elementOrId)) ||
            !EzString.hasLength(elementOrId.id)) {
            // If it is not a string, then the id cannot be empty
            throw new EzBadParamException(
                'elementOrId',
                EzUI.ezInstance,
                EzUI.ezInstance.ezUnhookAll);
        }
        if (!EzString.hasLength(eventName)) {
            throw new EzBadParamException(
                'eventName',
                EzUI.ezInstance,
                EzUI.ezInstance.ezUnhookAll);
        }

        // NOTE: Element is NOT required to exist
        let element = EzUI.ezInstance.ezFindByElementOrId(elementOrId);
        let eventName = EzObject.isValid(element)
            ? self.ezBuildInternalEzEventEngineEventName(element.id, elementEventName)
            : self.ezBuildInternalEzEventEngineEventName(elementOrId, elementEventName);

        ezApi.ezclocker.ezEventEngine.ezClearAllWantEvents(eventName);

        return element;
    }

    /**
     * @deprecated
     * Migrate to EzEventEngine functionality
     * Will get removed in a future release.
     * @public @method
        Assigns the provided resizeHandlerFunction to the resize event of the element identified by id.
     * @param {string} id
     * @param {function} resizeHandlerFunctionRef
     */
    ezHookElementResizeEvent(id, resizeHandlerFunctionRef) {
        return EzUI.ezInstance.ezHookElementResizeEvent$(EzUI.ezInstance.ezNormalizeId(id), resizeHandlerFunctionRef);
    }

    /**
     * @public @method
     * Inserts the provided html by:
     * 1) Creating a <span> node with the provided wrapperId
     * 2) Assigning the provided html to the <span> node's innerHTML
     * 3) Inserting the <span> node before the element with the provided elementOrId.
     * @param {object|string} elementOrId
     * @param {undefined|null|string} html
     * Default is: empty string
     * @param {undefined|null|string} wrapperId
     * Default is: 'EzInsertedElementWrapperSpan'
     * @deprecated
     * Migrate to: EzUx.insertBeforeElement(elementRef, html, wrapperId)
     */
    ezInsertBeforeElement(elementOrId, html, wrapperId) {
        let element = EzUI.ezInstance.ezFindByElementOrId(elementOrId);

        if (!EzObject.isValid(element)) {
            return;
        }

        if (!EzString.hasLength(wrapperId)) {
            wrapperId = 'EzInsertedElementWrapperSpan';
        }

        let spanNode = document.createElement('div');

        spanNode.style.display = 'contents';

        spanNode.id = wrapperId;

        spanNode.innerHTML = EzString.stringOrEmpty(html);

        element.parentNode.insertBefore(spanNode, element);
    }

    /**
     * @deprecated
     * Migrate to EzEventEngine functionality
     * Will get removed in a future release.
     * @public @method
        Assigns the provided resizeHandlerFunction to the resize event of the element identified by selector.
     * @param {string} selector
     * @param {function} resizeHandlerFunction
     */
    ezHookElementResizeEvent$(selector, resizeHandlerFunctionRef) {
        if (!EzUI.ezInstance.ezElementExists$(selector)) {
            throw new EzBadParamException(
                `selector (value=${selector})`,
                EzUI.ezInstance,
                EzUI.ezInstance.ezHookElementResizeEvent$);
        }
        if (!ezApi.ezIsFunction(resizeHandlerFunctionRef)) {
            throw new EzBadParamException(
                'resizeHandlerFunctionRef',
                EzUI.ezInstance,
                EzUI.ezInstance.ezHookElementResizeEvent$);
        }
        return EzUI.ezInstance.ezHookElementEvent$(selector, 'resize', resizeHandlerFunctionRef);
    }

    /**
     * @deprecated
     * Migrate to EzEventEngine functionality
     * Will get removed in a future release.
     * @public @method
        Removes resizeHandlerFunction from the resize event of the element identified by id.
     * @param {string} id
     * @param {function} resizeHandlerFunctionRef
     */
    ezUnHookElementResizeEvent(id, resizeHandlerFunctionRef) {
        EzUI.ezInstance.ezUnHookElementResizeEvent$(EzUI.ezInstance.ezNormalizeId(id), resizeHandlerFunctionRef);
    }

    /**
     * @deprecated
     * Migrate to EzEventEngine functionality
     * Will get removed in a future release.
     * @public @method
        Assigns the provided resizeHandlerFunction to the resize event of the element identified by selector.
     * @param {string} selector
     * @param {function} resizeHandlerFunction
     */
    ezUnHookElementResizeEvent$(selector, resizeHandlerFunctionRef) {
        if (!EzUI.ezInstance.ezElementExists$(selector)) {
            throw new EzBadParamException(
                `selector (value=${selector})`,
                EzUI.ezInstance,
                EzUI.ezInstance.ezUnHookElementResizeEvent);
        }
        if (!ezApi.ezIsFunction(resizeHandlerFunctionRef)) {
            throw new EzBadParamException(
                'resizeHandlerFunctionRef',
                EzUI.ezInstance,
                EzUI.ezInstance.ezUnHookElementResizeEvent);
        }
        EzUI.ezInstance.ezUnHookElementEvent$(
            selector,
            'resize',
            resizeHandlerFunctionRef);
    }

    /**
     * @deprecated
     * Migrate to EzEventEngine functionality
     * Will get removed in a future release.
     * @public @method
        Reads the value of an attribute for the element identified by the provided id
     * @param {string} id
     * @param {string} attributeName
     */
    ezReadElementAttribute(id, attributeName) {
        return EzUI.ezInstance.ezReadElementAttribute$(EzUI.ezInstance.ezNormalizeId(id), attributeName);
    }

    /**
     * @public @method
        Reads the value of an attribute for the element identified by the provided selector
     * @param {string} selector
     * @param {string} attributeName
     */
    ezReadElementAttribute$(selector, attributeName) {
        if (!EzUI.ezInstance.ezElementExists$(selector)) {
            throw new EzBadParamException(
                `selector (value=${selector})`,
                EzUI.ezInstance,
                EzUI.ezInstance.ezReadElementAttribute);
        }

        if (!EzString.hasLength(attributeName)) {
            throw new EzBadParamException(
                `attributeName (value=${attributeName})`,
                EzUI.ezInstance,
                EzUI.ezInstance.ezReadElementAttribute);
        }

        return $(selector).attr(attributeName);
    }

    /**
     * @public @method
        Reads the innerHTML value of an element associated with the provided id.
     * @param {string} id
     * @param {string} attributeName
     * @returns {string}
     * Returns the innerHTML value o
     */
    ezReadContent(id) {
        if (!EzString.hasLength(id)) {
            throw new EzBadParamException(
                'id',
                EzUI.ezInstance,
                EzUI.ezInstance.ezReadContent);
        }

        let element = document.getElementById(id);
        if (element) {
            return element.innerHTML;
        }
    }

    /**
     * @public @method
        Injects the HTML and shows the element
     * @param {string} id
     * @param {string} html
     * @returns {Promise}
     * @deprecated Migrate to EzUI.ezInstance.ezAniShowContent()
     */
    ezHtmlAndShow(elementOrId, html) {
        return ezApi.ezPromise(
            (resolve) => {
                if (!EzUI.ezInstance.ezElementExists(elementOrId)) {
                    throw new EzBadParamException(
                        `elementOrId (value=${elementOrId})`,
                        EzUI.ezInstance,
                        EzUI.ezInstance.ezHtmlAndShow);
                }
                EzUI.ezInstance.ezContent(elementOrId, html);
                EzUI.ezInstance.ezShowElement(elementOrId);
                return resolve(elementOrId);
            });
    }

    /**
     * @public @method
     * Removes the element or element with id from the document.
     * @param {object|string} elementOrId
     */
    ezRemoveElement(elementOrId) {
        let element = EzUI.ezInstance.ezFindByElementOrId(elementOrId);
        if (!EzObject.isValid(element)) {
            return;
        }

        element.remove();
    }

    /**
     * @deprecated Migrate to EzUI.ezInstance.ezRemoveElement()
     * @public @method
        Removes the element referenced by the id
     * @param {string} id
     * @returns {*}
     * Returns the result from jquery .remove() function
     */
    ezRemove(id) {
        return EzUI.ezInstance.ezRemove$(EzUI.ezInstance.ezNormalizeId(id));
    }

    /**
     * @public @method
        Removes the element referenced by the selector
     * @param {string} selector
     * @returns {*}
     * Returns the result from jquery .remove() function
     */
    ezRemove$(selector) {
        let element = EzUI.ezInstance.ezId$(selector);
        if (!EzObject.isValid(element) || 0 == element.length) {
            return; // nothing to remove
        }

        return element.remove();
    }

    /**
     * @public @method
     * @param {string} id
     * @param {function|null} cb
     * @returns {Promise.resolve}
     * @deprecated Migrate to the EzUI.ezInstance.ezFadeIn()
     */
    ezSlowFadeIn(id, cb) {
        return EzUI.ezInstance.ezSlowFadeIn$(EzUI.ezInstance.ezNormalizeId(id), cb);
    }

    /**
     * @public @method
     * @param {string} selector
     * @param {function|null} cb
     * @returns {Promise.resolve}
     * @deprecated Migrate to the EzUI.ezFadeIn()
     */
    ezSlowFadeIn$(selector, cb) {
        return ezApi.ezAsyncAction(
            (finished) => {
                if (!EzUI.ezInstance.ezElementExists$(selector)) {
                    throw new EzBadParamException(
                        `selector (value=${selector})`,
                        EzUI.ezInstance,
                        EzUI.ezInstance.ezSlowFadeIn$);
                }
                EzUI.ezInstance
                    .ezId$(selector)
                    .show(
                        'fade',
                        {},
                        'slow',
                        EzUI.ezInstance.ezCallbackResolver(selector, finished, cb));
            });
    }

    /**
     * @public @method
        Fades out the element referenced by the id
     * @param {string} id
     * @param {function|null} cb
     * @returns {Promise.resolve}
     */
    ezFadeOut(id, cb) {
        return EzUI.ezInstance.ezFadeOut$(EzUI.ezInstance.ezNormalizeId(id), cb);
    }

    /**
     * @public @method
        Fades out the element referenced by the selector
     * @param {string} selector
     * @param {function|null} cb
     * @returns {Promise.resolve}
     * @deprecated Migrate to using the EzUI.ezFadeOut() with the element/id param.
     */
    ezFadeOut$(selector, cb) {
        return EzPromise.resolve(
            (resolve) => {
                if (!EzUI.ezInstance.ezElementExists$(selector)) {
                    throw new EzBadParamException(
                        `selector (value=${selector})`,
                        EzUI.ezInstance,
                        EzUI.ezInstance.ezFadeOut$);
                }
                EzUI.ezInstance
                    .ezId$(selector)
                    .hide(
                        'fade',
                        {},
                        500,
                        EzUI.ezInstance.ezCallbackResolver(selector, resolve, cb));
            });
    }

    /**
     * @public @method
        Fades in the element referenced by the id
     * @param {string} id
     * @param {function|null} cb
     * @returns {Promise.resolve}
     */
    ezFadeIn(id, cb) {
        return EzUI.ezInstance.ezFadeIn$(EzUI.ezInstance.ezNormalizeId(id), cb);
    }

    /**
     * @public @method
        Fades in the element referenced by the selector
     * @param {string} selector
     * @param {function|null} cb
     * @returns {Promise.resolve}
     * @deprecated Use the new EzUI.ezInstance.ezFadeIn() method with id.
     */
    ezFadeIn$(selector, cb) {
        return EzPromise.resolve(
            (resolve) => {
                if (!EzUI.ezInstance.ezElementExists$(selector)) {
                    throw new EzBadParamException(
                        `selector (value=${selector})`,
                        EzUI.ezInstance,
                        EzUI.ezInstance.ezFadeIn$);
                }
                EzUI.ezInstance
                    .ezId$(selector)
                    .show(
                        'fade',
                        {},
                        500,
                        EzUI.ezInstance.ezCallbackResolver(selector, resolve, cb));
            });
    }

    /**
     * @public @method
     * @param {string} id
     * @param {function|null} cb
     * @returns {Promise}
     * @deprecated Migrate to the EzUI.ezFadeOut()
     */
    ezSlowFadeOut(id, cb) {
        return EzUI.ezInstance.ezSlowFadeOut$(EzUI.ezInstance.ezNormalizeId(id), cb);
    }

    /**
     * @public @method
     * @param {string} selector
     * @param {function|null} cb
     * @returns {Promise}
     * @deprecated Migrate to the EzUI.ezFadeOut()
     */
    ezSlowFadeOut$(selector, cb) {
        return EzPromise.resolve(
            (resolve) => {
                if (!EzUI.ezInstance.ezElementExists$(selector)) {
                    throw new EzBadParamException(
                        `selector (value=${selector})`,
                        EzUI.ezInstance,
                        EzUI.ezInstance.ezSlowFadeOut$);
                }
                EzUI.ezInstance
                    .ezId$(selector)
                    .hide('fase', {}, 'slow', EzUI.ezInstance.ezCallbackResolver(selector, resolve, cb));
            });
    }

    /**
     * @public @method
     * @param {string} id
     * @param {function|null} cb
     * @returns {Promise}
     * @deprecated Migrate to the EzUI.ezInstance.ezFadeOut()
     */
    ezLongFadeOut(id, cb) {
        return EzUI.ezInstance.ezLongFadeOut$(EzUI.ezInstance.ezNormalizeId(id), cb);
    }

    /**
     * @public @method
     * @param {string} selector
     * @param {function|null} cb
     * @returns {Promise}
     * @deprecated Migrate to the EzUI.ezInstance.ezFadeOut()
     */
    ezLongFadeOut$(selector, cb) {
        return EzPromise.resolve(
            (resolve) => {
                if (!EzUI.ezInstance.ezElementExists$(selector)) {
                    throw new EzBadParamException(
                        `selector (value=${selector})`,
                        EzUI.ezInstance,
                        EzUI.ezInstance.ezLongFadeOut$);
                }
                EzUI.ezInstance
                    .ezId$(selector)
                    .hide(
                        'fade',
                        {},
                        2000,
                        EzUI.ezInstance.ezCallbackResolver(selector, resolve, cb));
            });
    }

    /**
     * @public @method
     * @param {string} id
     * @param {function|null} cb
     * @returns {Promise.resolve}
     */
    ezHideSlideRight(id, cb) {
        return EzUI.ezInstance.ezHideSlideRight$(EzUI.ezInstance.ezNormalizeId(id), cb);
    }

    /**
     * @public @method
     * @param {string} selector
     * @param {function|null} cb
     * @returns {Promise.resolve}
     */
    ezHideSlideRight$(selector, cb) {
        return ezApi.ezPromise(
            (resolve) => {
                EzUI.ezInstance.ezId$(selector).hide(
                    'slide',
                    {
                        direction: 'right',
                    },
                    EzUI.ezInstance.ezCallbackResolver(selector, resolve, cb)
                );
            });
    }

    /**
     * @public @method
     * @param {string} id
     * @param {function|null} cb
     * @returns {Promise.resolve}
     */
    ezShowSlideRight(id, cb) {
        return EzUI.ezInstance.ezShowSlideRight$(EzUI.ezInstance.ezNormalizeId(id), cb);
    }

    /**
     * @public @method
     * @param {string} selector
     * @param {function|null} cb
     * @returns {Promise.resolve}
     */
    ezShowSlideRight$(selector, cb) {
        return ezApi.ezPromise(
            (resolve) => {
                EzUI.ezInstance.ezId$(selector).show(
                    'slide',
                    {
                        direction: 'right',
                    },
                    EzUI.ezInstance.ezCallbackResolver(selector, resolve, cb)
                );
            });
    }

    /**
     * @public @method
        Shows the element by sliding from the left
     * @param {string} id
     * @param {function|null} cb
     * @returns {Promise.resolve}
     */
    ezShowSlideLeft(id, cb) {
        return EzUI.ezInstance.ezShowSlideLeft$(EzUI.ezInstance.ezNormalizeId(id), cb);
    }

    /**
     * @public @method
        Shows the element by sliding it up
     * @param {Object|String} elementOrId
     * @returns {Promise.resolve}
     */
    ezSlideLeft(elementOrId) {
        return EzPromise.resolve(
            (resolve) => {
                let element = EzUI.ezInstance.ezFindByElementOrId(elementOrId);
                if (!EzObject.isValid(element)) {
                    return resolve(null);
                }

                $(`#${element.idselector}`).show(
                    'slide',
                    {
                        direction: 'left',
                    },
                    () => {
                        return resolve(element);
                    }
                );
            });
    }

    /**
     * @public @method
        Shows the element by sliding from the left
     * @param {string} selector
     * @param {function|null} cb
     * @returns {Promise.resolve}
     */
    ezShowSlideLeft$(selector, cb) {
        return ezApi.ezPromise(
            (resolve) => {
                EzUI.ezInstance.ezId$(selector).show(
                    'slide',
                    {
                        direction: 'left',
                    },
                    EzUI.ezInstance.ezCallbackResolver(selector, resolve, cb)
                );
            });
    }

    /**
     * @public @method
        Shows the element by sliding it up
     * @param {string} id
     * @param {function|null} cb
     * @returns {Promise.resolve}
     * @deprecated Migrate to the EzUI.ezInstance.ezSlideUp()
     */
    ezShowSlideUp(id, cb) {
        return EzUI.ezInstance.ezShowSlideUp$(EzUI.ezInstance.ezNormalizeId(id), cb);
    }

    /**
     * @public @method
        Shows the element by sliding it up
     * @param {string} id
     * @param {function|null} cb
     * @returns {Promise.resolve}
     * @deprecated Migrate to the EzUI.ezInstance.ezSlideUp()
     */
    ezSlideUp(elementOrId) {
        return EzPromise.resolve((resolve) => {
            let element = EzUI.ezInstance.ezFindByElementOrId(elementOrId);
            if (!EzObject.isValid(element)) {
                return resolve(null);
            }

            $(`#${element.idselector}`).show(
                'slide',
                {
                    direction: 'up',
                },
                () => {
                    return resolve(element);
                }
            );
        });
    }

    /**
     * @public @method
        Shows the element by sliding it up
     * @param {String|null} selector
     * @param {function|null} cb
     * @returns {Promise.resolve}
     * @deprecated Migrate to the EzUI.ezInstance.ezSlideUp()
     */
    ezShowSlideUp$(selector, cb) {
        return ezApi.ezPromise(
            (resolve) => {
                EzUI.ezInstance.ezId$(selector).show(
                    'slide',
                    {
                        direction: 'up',
                    },
                    EzUI.ezInstance.ezCallbackResolver(selector, resolve, cb)
                );
            });
    }

    /**
     * @public @method
        Bounces the item from the left side
     * @param {string} id
     * @param {function|null} cb
     * @returns {Promise.resolve}
     */
    ezBounceLeft(id, cb) {
        return EzUI.ezInstance.ezBounceLeft$(EzUI.ezInstance.ezNormalizeId(id), cb);
    }

    /**
     * @public @method
        Bounces the item from the left side
     * @param {string} selector
     * @param {function|null} cb
     * @returns {Promise}
     */
    ezBounceLeft$(selector, cb) {
        return EzPromise.resolve(
            (resolve) => {
                let options = {
                    distance: 20,
                    times: 5,
                    direction: 'left',
                };

                EzUI.ezInstance
                    .ezId$(selector)
                    .effect(
                        'bounce',
                        options,
                        EzUI.ezInstance.ezCallbackResolver(selector, resolve, cb));
            });
    }

    /**
     * @public @method
     * @param {string} id
     * @returns {*}
     * Returns response from jquery.prop() call.
     */
    ezEnable(id) {
        return EzUI.ezInstance.ezId(id).prop('disabled', false);
    }

    /**
     * @public @method
     * Enables the element
     * @param {Object|String} elementOrId
     * @returns {Object|null}
     */
    ezEnableElement(elementOrId) {
        let element = EzUI.ezInstance.ezFindByElementOrId(elementOrId);

        if (!EzObject.isValid(element)) {
            return null;
        }

        element.disabled = false;

        return element;
    }

    /**
     * @public @method
     * Disables the element
     * @param {Object|String} elementOrId
     * @returns {Object|null}
     */
    ezDisableElement(elementOrId) {
        let element = EzUI.ezInstance.ezFindByElementOrId(elementOrId);

        if (!EzObject.isValid(element)) {
            return null;
        }

        element.disabled = true;

        return element;
    }

    /**
     * @public @method
     * @param {string} id
     * @returns {*}
     * Returns response from jquery.prop() call.
     */
    ezEnable$(selector) {
        return EzUI.ezInstance.ezId$(selector).prop('disabled', false);
    }

    /**
     * @public @method
        Disables the label element associated with the provided id.
     * @param {string} id
     */
    ezDisableLabel(id) {
        if (!EzString.hasLength(id)) {
            return;
        }

        if (EzUI.ezInstance.ezElementExists(id)) {
            EzUI.ezInstance.ezDisable(id);
            EzUI.ezInstance.ezAddClass(id, 'ezDisabledLabel');
        }
    }

    /**
     * @public @method
        Enables the label element associated with the provided id.
     * @param {string} id
     */
    ezEnableLabel(id) {
        if (!EzString.hasLength(id)) {
            return;
        }

        if (EzUI.ezInstance.ezElementExists(id)) {
            EzUI.ezInstance.ezEnable(id);
            EzUI.ezInstance.ezRemoveClass(id, 'ezDisabledLabel');
        }
    }

    /**
     * @public @method
        Disable a checkbox associated by the provided id that is also enhanced by the jQuery iCheck
     * @param {Object|String} elementOrId
     * @returns {Object|null}
     */
    ezDisableICheck(elementOrId) {
        let element = EzUI.ezInstance.ezFindByElementOrId(elementOrId);
        if (!EzObject.isValid(element)) {
            return null;
        }

        let parentElement = EzUI.ezInstance.ezGetElementParent(element);
        if (EzUI.ezInstance.ezElementExists(parentElement)) {
            parentElement.style.opacity = 0.5;
        }
        EzUI.ezInstance.ezDisableElement(element);
        EzUI.ezInstance.ezAddElementClass(element, 'ezInputs-disabled-icheck');

        return element;
    }

    /**
     * @public @method
        Enable a checkbox associated by the provided id that is also enhanced by the jQuery iCheck
     * @param {Object|String} elementOrId
     * @returns {Object|null}
     */
    ezEnableICheck(elementOrId) {
        let element = EzUI.ezInstance.ezFindByElementOrId(elementOrId);
        if (!EzObject.isValid(element)) {
            return null;
        }

        let parentElement = EzUI.ezInstance.ezGetElementParent(element);
        if (EzUI.ezInstance.ezElementExists(parentElement)) {
            parentElement.style.opacity = 1;
        }
        EzUI.ezInstance.ezEnableElement(element);
        EzUI.ezInstance.ezRemoveElementClass(element, 'ezInputs-disabled-icheck');

        return element;
    }

    /**
     * @public @method
     */
    ezDisableElementOpacity(elementOrId) {
        let element = EzUI.ezInstance.ezFindByElementOrId(elementOrId);
        if (!EzObject.isValid(element)) {
            return null;
        }

        EzUI.ezInstance.ezDisableElement(element);
        element.style.opacity = 0.5;

        return element;
    }

    /**
     * @public @method
     */
    ezEnableElementOpacity(elementOrId) {
        let element = EzUI.ezInstance.ezFindByElementOrId(elementOrId);
        if (!EzObject.isValid(element)) {
            return null;
        }

        EzUI.ezInstance.ezDisableElement(element);
        element.style.opacity = 1;

        return element;
    }

    /**
     * @public @method
     * Applies the disabled attribute to the item referenced by the id
     * @param {string} id
     * @returns {*}
     * Returns response from jquery.prop() call.
     */
    ezDisable(id) {
        // Try native first
        let element = EzUI.ezInstance.ezFindByElementOrId(id);
        if (EzObject.isValid(element)) {
            element.disabled = true;
            return element;
        }

        return EzUI.ezInstance.ezDisable$(EzUI.ezInstance.ezNormalizeId(id));
    }

    /**
     * @public @method
     * Applies the disabled attribute to the item referenced by the id
     * @param {string} selector
     * @returns {*}
     * Returns response from jquery.prop() call.
     */
    ezDisable$(selector) {
        if (!EzUI.ezInstance.ezElementExists$(selector)) {
            throw new EzBadParamException(
                `selector (value=${selector})`,
                EzUI.ezInstance,
                EzUI.ezInstance.ezDisable$);
        }

        let jqElement = EzUI.ezInstance.ezId$(selector);
        jqElement.prop('disabled', true);

        return jqElement[0].id;
    }

    /**
     * @deprecated Migrate to: EzUI.ezInstance.ezRemoveElementClass();
     * @public @method
        Removes the provided class name from the item
     * @param {string} id
     * @param {string} className
     * @returns {*}
     * Returns response from jquery.removeClass() call
     */
    ezRemoveClass(id, className) {
        if (EzUI.ezInstance.ezElementExists(id)) {
            let element = document.getElementById(id);
            if (EzObject.isValid(element) && EzObject.isValid(element.classList)) {
                element.classList.remove(className);
                return true;
            }
        }
        return EzUI.ezInstance.ezRemoveClass$(EzUI.ezInstance.ezNormalizeId(id), className);
    }

    /**
     * @deprecated Migrate to: EzUI.ezInstance.ezRemoveElementClass();
     * @public @method
        Removes the provided class name from the item
     * @param {string} selector
     * @param {string} className
     * @returns {*}
     * Returns response from jquery.removeClass() call
     */
    ezRemoveClass$(selector, className) {
        if (ezApi.anyNotValid(selector, className)) {
            return;
        }
        return EzUI.ezInstance.ezId$(selector).removeClass(className);
    }

    /**
     * @deprecated Move to EzUI.ezInstance.ezStartPageWait()
     * @public @method
     * Shows a full page wait spinner with the optionally provided message
     * @param {string} message
     */
    ezPageWaitStart(message) {
        ezApi.ezclocker.ezSpinner.ezStartPageWait(message);
    }

    /**
     * @deprecated Move to EzUI.ezInstance.ezStopPageWait()
     * @public @method
     * Hides the full page wait spinner
     * @param {boolean} forceStopAll
     */
    ezPageWaitStop() {
        ezApi.ezclocker.ezSpinner.ezStopPageWait();
    }

    /**
     * @public @method
        Starts a page wait spinner and returns the promise of the operation.
        See documentation in /public/webcomponents/spinner/EzSpinner.js for function ezStartPageWaitPromise()
        for more information.
     * Example:
        return EzUI.ezInstance.ezStartPageWaitPromise('message', function (waitDone, resolve, reject) {
         ...
        });
     * @param {String|null} message
     * @param {Function|null} functionToExecute
     */
    ezStartPageWaitPromise(message, functionToExecute) {
        return ezApi.ezclocker.ezSpinner.ezStartPageWaitPromise(message, functionToExecute);
    }

    /**
     * @public @method
        Starts a page wait spinner and returns the promise of the operation.
        See documentation in /public/webcomponents/spinner/EzSpinner.js for function ezStartPageWaitPromise()
        for more information.
     * Example:
            return EzUI.ezInstance.ezWaitResolveReject(
                'Wait message',
                (resolve, reject) => {
                    // .. do the work here ..

                    return isSuccess
                        ? resolve(resolveResponse)
                        : reject(rejectResponse);
                });
     * @param {undefined|null|string} message
        Default: 'Please wait ...'
     * @param {function} functionToExecute
     */
    ezWaitResolveReject(message, functionToExecute) {
        if (null == functionToExecute) {
            throw new EzBadParamException(
                'functionToExecute',
                EzUI.ezInstance,
                EzUI.ezInstance.ezWaitResolveReject);
        }

        return ezApi.ezclocker.ezSpinner.ezWaitResolveReject(
            EzString.stringOrDefault(
                message,
                'Please wait ...'),
            functionToExecute);
    }

    /**
     * @public @method
     * Starts a page wait spinner and returns the promise of the operation.
     * Example Code:
     *
     *  return ezApi.ezclocker.ezUi.ezStartPageWaitResolve(
     *      'Please wait ...',
     *      (waitDone, finished) => ezApi.ezclocker.http.ezGet('https://ezclocker.com/api/v1/employees/100)
     *          .then(
     *              (response) => waitDone()
     *                  .then(
     *                      () => resolve(response)),
     *              (eResponse) => {
     *                  ezApi.ezclocker.logger.error(`Failed to do something. Error: ${ezApi.ezToJson(eResponse)}`);
     *
     *                  return waitDone()
     *                      .then(
     *                          () => resolve(eResponse));
     *              }));
     *
     * @param {String|null} message
     * @param {Function|null} functionToExecute
     */
    ezStartPageWaitResolve(message, functionToExecute) {
        return ezApi.ezclocker.ezSpinner.ezStartPageWaitResolve(message, functionToExecute);
    }

    /**
     * @public @method
        Updated page wait resolve method that removes the need to call the waitDone() function.
     * If the functionToExecute param is not a valid function, then the simple Promise.resolve() is returned. Otherwise:
        1) Creates a new promise calling functionToExecute
        2) The resolve function is passed as the first param to the functionToExecute.
        3) When functionToExecute execution then calls the resolve():
             1) The full page spinner is stopped.
             2) Returns the result of the TRUE promise resolve() callback passing the params of the
                 functionToExecute execution's call to it's resolve() function.
     * Example Use:
        <code>
        return ezApi.ezclocker.ezUi.ezPageWaitResolve('Please wait ...', function(resolve) {
             return ezApi.ezclocker.http.ezGet('https://ezclocker.com/api/v1/employees/100).then(
                 function (response) {
                     return resolve(response);
                 },
                 function (eResponse) {
                   ezApi.ezclocker.ezLogger.error('Failed to do something. Error: ' + ezApi.ezToJson(eResponse, 3));
                   return resolve();
                 });
        });
        </code>
     * @returns {Promise}
     */
    ezPageWaitResolve(message, functionToExecute) {
        return ezApi.ezclocker.ezSpinner.ezPageWaitResolve(message, functionToExecute);
    }

    /**
     * @public @method
        Replaces the ezApi.ezSpinner.ezStartPageWaitExecute() method. The functionality is the same.
     * If the functionToExecute param is not a valid function, returns undefined.
            1) Starts the full page wait spinner.
            2) Call to the provided functionToExecute passing the waitDone param
            3) Returns the result of the functionToExecute call.
     * Example Use:
        <code>
            return ezApi.ezclocker.ezSpinner.ezPageWaitExecute('Please wait ...', function(waitDone) {
                // do some work here ...
                // Finally, call the provided waitDone() callback to close the spinner.
                waitDone();
            });
        </code>
     * @param {string} message
     * @param {Function} functionToExecute
     * @returns {*}
     */
    ezPageWaitExecute(message, functionToExecute) {
        return ezApi.ezclocker.ezSpinner.ezPageWaitExecute(message, functionToExecute);
    }

    /**
     * @public @method
     * Starts the full page wait spinner. After the spinner starts,
     * a new Promise is created using the provided functionToExecute
     * reference. The functionToExecute call passes the only the
     * resolve param for the promise and a param known as the waitDone
     * function callback. The waitDone param is a reference to a
     * function that is called to hide the spinner after all work
     * is complete.
     * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
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
     * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
     * See also:
     *  File: /public/webcomponents/spinner/EzSpinner.js
     *  Class: EzSpinner
     *  Class Method: ezStartPageWaitResolve(message, functionToExecute)
     * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
     * @param {string} message
     * @param {function} functionToExecute
     * @returns {Promise.resolve}
     * @deprecated
     * Migrate to ezApi.ezclocker.ezUi.ezPageWaitAsync2 that does not require
     * calling waitDone() before calling resolve() or finished().
     */
    ezPageWaitAsync(message, functionToExecute) {
        return ezApi.ezclocker.ezSpinner.ezStartPageWaitResolve(message, functionToExecute);
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
     * See also:
     *  File: /public/webcomponents/spinner/EzSpinner.js
     *  Class: EzSpinner
     *  Class Method: ezPageWaitResolve(message, functionToExecute)
     * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
     * @param {string} message
     * @param {function} functionToExecute
     * @returns {Promise.resolve}
     */
    ezPageWaitAsync2(message, functionToExecute) {
        return ezApi.ezclocker.ezSpinner.ezStartPageWaitResolve(message, functionToExecute);
    }

    /**
     * @deprecated Migrate to EzUI.ezInstance.ezPageaWaitExceute()
     * @public @method
        Starts a page wait spinner and returns the resolve only promise of the operation.
        return ezApi.ezclocker.ezSpinner.ezPageWaitExecute(
            'Please wait ...',
            (waitDone) => {
                // do some work here ...
                waitDone();
            });
     * @param (String|null) message
     * @param (function|null) functionToExecute
     */
    ezStartPageWaitExecute(message, functionToExecute) {
        return ezApi.ezclocker.ezSpinner.ezPageWaitExecute(message, functionToExecute);
    }

    /**
     * @public @method
        Shows a full page wait spinner with the optionally provided message.
        See documentation in /public/webcomponents/spinner/EzSpinner.js for function ezStartPageWait()
        for more information.
     * @param {string} message
     * @param {Function} functionToExecute
     */
    ezStartPageWait(message, functionToExecute) {
        ezApi.ezclocker.ezSpinner.ezStartPageWait(message, functionToExecute);
    }

    /**
     * @public @method
     * Hides the full page wait spinner
     */
    ezStopPageWait() {
        ezApi.ezclocker.ezSpinner.ezStopPageWait();
    }

    /**
     * @public @method
     * Hides the full page wait spinner even it additional operations are pending.
     */
    ezForceStopPageWait() {
        ezApi.ezclocker.ezSpinner.ezForceStopPageWaitSpinner();
    }

    /**
     * @public @method
     * Returns the HTML for a <input/> text tag:
     * <input id="{id}" type="{inputType}" value="{value}" class="{cssClass}" oninput="{oninput}"/>
     * @param {String|null} id
     * @param {String|null} inputType
     * Defaults to text if none provided
     * @param {String|null} value
     * @param {String|null} cssClass
     * @param {String|null} name
     * @param {String|null} onInput
     * @returns {string}
     */
    ezBuildInputElement(id, inputType, value, cssClass, name, onInput) {
        inputType = EzString.hasLength(inputType)
            ? inputType
            : 'text';

        return ezApi.ezTemplate`
            <input
                ${EzUI.ezInstance.ezBuildAttribute('id', id)}
                ${EzUI.ezInstance.ezBuildAttribute('type', inputType)}
                ${EzUI.ezInstance.ezBuildAttribute('value', value)}
                ${EzUI.ezInstance.ezBuildAttribute('class', cssClass)}
                ${EzUI.ezInstance.ezBuildAttribute('name', name)}
                ${EzUI.ezInstance.ezBuildAttribute('oninput', onInput)}/>`;
    }

    /**
     * @deprecated Move to ezHtml.$button()
     * @public @method
     * Returns the HTML for a <button/> tag
     * @param {String|null} id
     * @param {String|null} caption
     * @param {String|null} cssClass
     * @param {String|null} onClick
     * @param {String|null} hint
     * @returns {string}
     */
    ezBuildButtonElement(id, caption, cssClass, onClick, hint) {
        return (
            ezApi.ezTemplate`
                <button
                    ${EzUI.ezInstance.ezBuildAttribute('id', id)}
                    ${EzUI.ezInstance.ezBuildAttribute('class', cssClass)}
                    ${EzUI.ezInstance.ezBuildAttribute('onclick', onClick)}
                    ${EzUI.ezInstance.ezBuildAttribute('title', hint)}>
                    ${caption}
                </button>`);
    }

    /**
     * @deprecated Move to ezHtml.ezProp()
     * @public @method
     * Returns an HTML attribute for an element
     * @param {string} attributeName
     * @param {String|null} attributeValue
     */
    ezBuildAttribute(attributeName, attributeValue) {
        if (!EzString.hasLength(attributeName)) {
            return '';
        }

        let attribute = ' attributeName';
        attribute += EzString.hasLength(attributeValue)
            ? `="${attributeValue}"`
            : '';

        return attribute;
    }

    /**
     * @public @method
     * Sets an attribute on the element identified by id
     * @param {string} id
     * @param {string} attributeName
     * @param {string} attributeValue
     * @returns {*}
     * Returns response from jquery.setAttribute()
     */
    ezSetElementAttribute(id, attributeName, attributeValue) {
        return EzUI.ezInstance.ezSetElementAttribute$(EzUI.ezInstance.ezNormalizeId(id), attributeName, attributeValue);
    }

    /**
     * @public @method
     * Sets an attribute on the element identified by id
     * @param {string} selector
     * @param {string} attributeName
     * @param {string} attributeValue
     * @returns {*}
     * Returns response from jquery.setAttribute()
     */
    ezSetElementAttribute$(selector, attributeName, attributeValue) {
        if (!EzString.hasLength(selector) || !EzString.hasLength(attributeName)) {
            return;
        }
        if (!EzUI.ezInstance.ezElementExists(selector)) {
            return;
        }

        EzUI.ezInstance.ezId$(selector).attr(attributeName, attributeValue);
    }

    ezSetFormAction(elementOrId, actionUrl) {
        let element = EzUI.ezInstance.ezFindByElementOrId(elementOrId);
        if (!EzObject.isValid(element)) {
            throw new EzBadParamException(
                'elementOrId',
                EzUI.ezInstance,
                EzUI.ezInstance.ezSetFormAction);
        }

        element.action = EzString.stringOrEmpty(actionUrl);

        return element;
    }

    ezSetFormMethod(elementOrId, method) {
        let element = EzUI.ezInstance.ezFindByElementOrId(elementOrId);
        if (!EzObject.isValid(element)) {
            throw new EzBadParamException(
                'elementOrId',
                EzUI.ezInstance,
                EzUI.ezInstance.ezSetFormAction);
        }

        element.method = method.toUpperCase();

        return element;
    }

    /**
     * @public @method
     * Sets an element's attribute value.
     * @param {object|string} elementOrId
     * @param {string} propName
     * @param {string} propValue
     * @returns {Object|null}
     * Returns the element or null if it doesn't exist.
     */
    ezSetElementAttr(elementOrId, propName, propValue) {
        if (!EzString.hasLength(propName)) {
            throw new EzBadParamException(
                'propName',
                EzUI.ezInstance,
                EzUI.ezInstance.ezSetElementAttr);
        }

        let element = EzUI.ezInstance.ezFindByElementOrId(elementOrId);
        if (!EzObject.isValid(element)) {
            throw new EzBadParamException(
                'elementOrId',
                EzUI.ezInstance,
                EzUI.ezInstance.ezSetElementAttr);
        }

        element[propName] = propValue;
        return element;
    }

    /**
     * @public @method
     * Sets an element's property
     * @param {object|string} elementOrId
     * @param {string} propertyName
     * @param {string} propertyValue
     * @returns {Object|null}
     */
    ezSetElementProperty(elementOrId, propertyName, propertyValue) {
        let element = EzUI.ezInstance.ezFindByElementOrId(elementOrId);

        if (!EzObject.isValid(element)) {
            return null;
        }

        if (EzString.hasLength(propertyName)) {
            element[propertyName] = EzObject.assignOrNull(
                propertyValue,
                null);
        }

        return element;
    }

    /**
     * @public @method
     * Sets an html elements "hint" propery (aka title property) with the provided value.
     * @param {object|string} elementOrId
     * @param {string|null|undefined} hintValue
     * @returns {object|null}
     * Returns the element reference or null if not found.
     */
    ezSetElementHint(elementOrId, hintValue) {
        let element = EzUI.ezInstance.ezFindByElementOrId(elementOrId);
        if (!EzObject.isValid(element)) {
            return null;
        }

        if (EzString.hasLength(hintValue)) {
            element.hint = EzString.stringOrNull(hintValue, null);
        }

        return element;
    }

    /**
     * @public @method
     * Sets a property of the element associated with the provided id.
     * @param {string} id
     * @param {string} propName
     * @param {*} propValue
     * @returns {*}
     * Returns response from jquery.prop
     */
    ezSetElementProp(id, propName, propValue) {
        return EzUI.ezInstance.ezSetElementProp$(EzUI.ezInstance.ezNormalizeId(id), propName, propValue);
    }

    /**
     * @public @method
     * Sets a property of the element associated with the provided jquery selector
     * @param {string} selector
     * @param {string} propName
     * @param {*} propValue
     * @returns {*}
     * Returns response from jquery.prop
     */
    ezSetElementProp$(selector, propName, propValue) {
        if (!EzString.hasLength(selector) || !EzString.hasLength(propName)) {
            return '';
        }

        return EzUI.ezInstance.ezId$(selector).prop(propName, propValue);
    }

    /**
     * @public @method
     * Sets a property of the element associated with the provided id.
     * @param {string} id
     * @param {string} propName
     * @param {*} propValue
     * @returns {*}
     * Returns response from jquery.prop
     */
    ezGetElementProp(id, propName) {
        return EzUI.ezInstance.ezGetElementProp$(EzUI.ezInstance.ezNormalizeId(id), propName);
    }

    /**
     * @public @method
     * Sets a property of the element associated with the provided jquery selector
     * @param {string} selector
     * @param {string} propName
     * @param {*} propValue
     * @returns {*}
     * Returns response from jquery.prop
     */
    ezGetElementProp$(selector, propName) {
        return EzString.hasLength(selector) && EzString.hasLength(propName)
            ? EzUI.ezInstance.ezId$(selector).prop(propName)
            : '';
    }

    /**
     * @public @method
     * Sets attributes of WebComponents
     * @param {string} id
     * @param {string} attributeName
     * @param {string} attributeValue
     * @returns {*}
     * Returns response from jquery.setAttribute()
     */
    ezSetWebComponentAttribute(id, attributeName, attributeValue) {
        if (!EzString.hasLength(id) || !EzString.hasLength(attributeName)) {
            return; // nothing to do
        }

        let element = document.getElementById(id);
        if (!EzObject.isValid(element)) {
            return; // nothing to do
        }

        element.setAttribute(attributeName, attributeValue);
    }

    /**
     * @public @method
     * Fires an event by name
     * @param {string} eventName
     * @param {array|null} eventParamsArray
     * @returns {*}
     * Returns response from document.trigger()
     */
    ezFireEvent(eventName, eventParamsArray) {
        if (!EzString.hasLength(eventName)) {
            return; // must have an event name to trigger
        }

        return ezApi.ezDocument().trigger(eventName, eventParamsArray);
    }

    /**
     * @public @method
     * Attaches an event handler to a global event
     * @param {string} eventName
     * @param {function} eventHandler
     * @returns {*}
     * Returns response from document.on()
     * @deprecated
     * ** Will remove in a future release **
     * Migrate to:
     *      import { EzEventEngine } from '/ezlibrary/ez-event-engine.js';
     *      ezApi.ezclocker.ezEventEngine.ezWantElementEvent(...);
     */
    ezAddEventHandler(eventName, eventHandler) {
        return ezApi.ezDocument().on(eventName, eventHandler);
    }

    /**
     * @public @method
     * Disconnects an event listener handler
     * @param {string} eventName
     * @param {function} eventHandler
     * @returns {*}
     * Returns response from document.off()
     */
    ezRemoveEventHandler(eventName, eventHandler) {
        return ezApi.ezDocument().off(eventName, eventHandler);
    }

    /**
     * @public @method
     * Calls $().focus() on the element referenced by the provided id
     * @param {string} id
     * @returns {*}
     * Returns response from jquery.focus()
     */
    ezFocusInput(id) {
        return EzUI.ezInstance.ezFocusInput$(EzUI.ezInstance.ezNormalizeId(id));
    }

    /**
     * @public @method
     * Sets focus on the element referenced by the jquery selector
     * @param {selector} selector
     * @returns {*}
     * Returns response from jquery.focus()
     */
    ezFocusInput$(selector) {
        return EzString.hasLength(selector) && !EzUI.ezInstance.ezElementExists$(selector)
            ? EzUI.ezInstance.ezId$(selector).focus()
            : null;
    }

    /**
     * @public @method
     * Selects all text within the input associated with the
     * provided id
     * @param {string} id
     * @returns {*}
     * Returns response from jquery.select()
     */
    ezInputSelectAll(id) {
        return EzUI.ezInstance.ezInputSelectAll$(EzUI.ezInstance.ezNormalizeId(id));
    }

    /**
     * @public @method
     * Selects all text within the input found with the
     * provided selector.
     * @param {string} selector
     * @returns {*}
     * Returns response from jquery.select()
     */
    ezInputSelectAll$(selector) {
        return EzString.hasLength(selector) && EzUI.ezInstance.ezElementExists$(selector)
            ? EzUI.ezInstance.ezId$(selector).select()
            : null;
    }

    /**
     * @public @method
     * Gets the value of an input box referenced by the provided element id
     * @param {string} elementOrId
     * @returns {*}
     * Returns response from element.value
     * @deprecated
     * Migrate to: EzUx.getInputValue(elementRef)
     */
    ezGetInputValue(elementOrId) {
        return EzUx.getInputValue(elementOrId);
    }

    /**
     * @public @method
     * Returns the character position of the cursor (or selection start char position)
     * of an input.
     * If the element or element with id doesn't exist, -1 is returned.
     * If the element or element with id is not an input, -1 is returned.
     * @param {object|string} elementOrId
     * @returns {Number}
     */
    ezGetInputSelectStart(elementOrId) {
        let element = EzUI.ezInstance.ezFindByElementOrId(elementOrId);

        if (null == element) {
            return -1;
        }

        return ezApi.ezHasOwnProperty(element, 'selectionstart') ? element.selectionstart : -1;
    }

    /**
     * @public @method
     * Sets the selection range of an input element from selectStart to end of input value.
     * If select start is not provided, it is assumed as zero.
     * @param {object|string} elementOrId
     * @param {Number|null} selectStart
     * @returns {Object|null}
     */
    ezSetInputSelectFrom(elementOrId, selectStart) {
        let element = EzUI.ezInstance.ezFindByElementOrId(elementOrId);
        if (null == element) {
            return null;
        }

        if (!ezApi.ezHasOwnProperty(element, 'selectionstart')) {
            return element;
        }

        if (!EzString.hasLength(element.value)) {
            element.setSelectionRange(0, 0);
        } else {
            element.setSelectionRange(EzNumber.isNumber(selectStart) ? selectStart : 0, element.value.length);
        }

        return element;
    }

    /**
     * @public @method
     * Gets the value of an input box referenced by the provided selector
     * @param {string} selector
     * @returns {*}
     * Returns response from jquery.val()
     */
    ezGetInputValue$(selector) {
        if (!EzString.hasLength(selector) || !EzUI.ezInstance.ezElementExists$(selector)) {
            return null;
        }

        return ezApi.ezAssignOrDefault(EzUI.ezInstance.ezId$(selector).val(), '');
    }

    /**
     * @public @method
     * Gets the value of an input box referenced by the provided element id and returns the value, calling .trim() on the string
        result.
     * Returns the intput's value (if a string) as {Stringvalue}.trim().
     * If the input value is an empty string or not a string at all, then the value is returned unchanged.
     * @param {string} id
     * @returns {string}
     * Returns response from jquery.val()
     */
    ezGetTrimInputValue(id) {
        return EzUI.ezInstance.ezGetTrimInputValue$(EzUI.ezInstance.ezNormalizeId(id));
    }

    /**
     * @public @method
     * Gets the value of an input box referenced by the provided selector and returns the value, calling .trim() on the string
        result.
     * Returns the intput's value (if a string) as {Stringvalue}.trim().
     * If the input value is an empty string or not a string at all, then the value is returned unchanged.
     * @param {string} selector
     * @returns {string}
     * Returns response from jquery.val()
     */
    ezGetTrimInputValue$(selector) {
        if (!EzString.hasLength(selector) || !EzUI.ezInstance.ezElementExists$(selector)) {
            return '';
        }

        let inputValue = EzUI.ezInstance.ezId$(selector).val();
        return EzString.hasLength(inputValue)
            ? inputValue.trim()
            : inputValue;
    }

    /**
     * @public @method
     * Gets the value of the select box text for the provided element id
     * @param {string} id
     * @returns {string}
     * Returns response from jquery.val()
     */
    ezGetSelectText(id) {
        return EzUI.ezInstance.ezGetSelectText$(EzUI.ezInstance.ezNormalizeId(id));
    }

    /**
     * @public @method
     * Gets the value of the select box text for the provided jquery selector
     * @param {string} selector
     * @returns {string}
     * Returns response from jquery.val()
     */
    ezGetSelectText$(selector) {
        return EzString.hasLength(selector) && EzUI.ezInstance.ezElementExists$(selector)
            ? EzUI.ezInstance.ezId$(selector + ' option:selected').text()
            : null;
    }

    /**
     * @public @method
     * Sets a Select input box's Option value as selected.
     * @param {Object|String} elementOrId
     * @param {Object|null}
     */
    ezSelectSelectInputOption(elementOrId) {
        let element = EzUI.ezInstance.ezFindByElementOrId(elementOrId);
        if (!EzObject.isValid(element)) {
            return null;
        }

        element.selected = true;
        return element;
    }

    /**
     * @public @method
        Unselects a Select input box's Option value.
     * @param {Object|String} elementOrId
     * @param {Object|null}
     */
    ezUnselectSelectInputOption(elementOrId) {
        let element = EzUI.ezInstance.ezFindByElementOrId(elementOrId);
        if (!EzObject.isValid(element)) {
            return null;
        }

        element.selected = false;
        return element;
    }

    /**
     * @public @method
     * Sets the input value
     * @param {string} id
     * @param {Object|null} value
     * @deprecated
     * Migrate to: EzUx.setInputValue(elementOrId, value)
     */
    ezSetInputValue(elementOrId, value) {
        EzUx.setInputValue(
            elementOrId,
            value);
    }

    /**
     * @public @method
     * Sets the input value for the item identified by the selector
     * @param {string} jquerySelector
     * @param {Object|null} value
     * @deprecated
     * Migrate to: EzUx.setInputValue(elementOrId, value)
     */
    ezSetInputValue$(jquerySelector, value) {
        EzUx.setInputValue(
            jquerySelector,
            value);
    }

    /**
     * @public @method
     * Sets the checked value for an iCheck or normal input check/radio to the provided value.
     * @param {string} elementOrId
     * @param {boolean} checkedValue
     * @returns {Object|null}
     * Returns the HTML element reference (if exist)
     */
    ezSetICheckBoxValue(elementOrId, checkedValue) {
        let element = EzUI.ezInstance.ezFindByElementOrId(elementOrId);
        if (!EzObject.isValid(element)) {
            return null;
        }

        element.checked = EzBoolean.isTrue(checkedValue);

        let jqElement = EzUI.ezInstance.ezId(element.id);
        if (!EzObject.isValid(jqElement) || 0 === jqElement.length) {
            return element;
        }

        jqElement.prop('checked', EzBoolean.isTrue(checkedValue));
        if (ezApi.ezIsBoolean(jqElement.indeterminate)) {
            if (EzBoolean.isTrue(checkedValue)) {
                jqElement.iCheck('check');
            } else {
                jqElement.iCheck('uncheck');
            }
        }

        return element;
    }

    /**
     * @public @method
     * Sets the EzToogle's value as on (checked) or off (unchecked)
     * @param {object|string} elementOrId
     * @param {boolean} checkedValue
     */
    ezSetEzToggleValue(elementOrId, checkedValue) {
        let element = EzUI.ezInstance.ezFindByElementOrId(elementOrId);
        if (!EzObject.isValid(element)) {
            return null;
        }

        element.checked = EzBoolean.isTrue(checkedValue);

        return element;
    }

    /**
     * @public @method
     * Sets an HTML radio input's checked value
     * @param {Object|String} elementOrId
     * @param {boolean} checked
     * @returns {Object|null}
     * Returns the element if found, null otherwise.
     */
    ezSetRadioBoxValue(elementOrId, checked) {
        let element = EzUI.ezInstance.ezFindByElementOrId(elementOrId);
        if (!EzObject.isValid(element)) {
            return null;
        }

        element.checked = EzBoolean.isTrue(checked);

        let jqElement = EzUI.ezInstance.ezId(element.id);
        if (EzObject.isValid(jqElement) && 0 != jqElement.length) {
            jqElement.prop('checked', EzBoolean.isTrue(checked));
        }

        return element;
    }

    /**
     * @public @method
     * Returns if the radio box is checked
     * @param {Object|String} elementOrId
     * @param {boolean} checked
     * @returns {boolean}
     */
    ezIsRadioBoxChecked(elementOrId) {
        let element = EzUI.ezInstance.ezFindByElementOrId(elementOrId);
        if (!EzObject.isValid(element)) {
            return null;
        }

        return element.checked;
    }

    /**
     * @public @method
     * Sets an HTML checkbox input's checked value
     * @param {Object|String} elementOrId
     * @param {boolean} checked
     * @returns {Object|null}
     * Returns the element if found, null otherwise.
     */
    ezSetCheckboxValue(elementOrId, checked) {
        let element = EzUI.ezInstance.ezFindByElementOrId(elementOrId);
        if (!EzObject.isValid(element)) {
            return null;
        }

        element.checked = EzBoolean.isTrue(checked);

        let jqElement = EzUI.ezInstance.ezId(element.id);
        if (EzObject.isValid(jqElement) && 0 != jqElement.length) {
            jqElement.prop('checked', EzBoolean.isTrue(checked));
        }

        return element;
    }

    /**
     * @public @method
     * Sets the checkbox checked value for the item identified by the selector
     * @param {string} selector
     * @param {null|boolean} checkedValue
     * @returns {*}
     * Returns response from jquery.prop
     */
    ezSetCheckboxValue$(selector, checkedValue) {
        if (!EzString.hasLength(selector) || !EzUI.ezInstance.ezElementExists$(selector)) {
            return null;
        }

        let iCheck = $(selector);
        if (0 < iCheck.length) {
            iCheck = iCheck[0];
        }

        if (ezApi.ezIsBoolean(iCheck.indeterminate) && ezApi.ezIsFunction($(selector).iCheck)) {
            if (EzBoolean.isTrue(checkedValue)) {
                $(selector).iCheck('check');
            } else {
                $(selector).iCheck('uncheck');
            }
        } else {
            $(selector).prop('checked', checkedValue);
        }
    }

    /**
     * @public @method
     * Sets an input's readonly property to true
     * @param {Object|String} elementOrId
     * @returns {Object|null}
     */
    ezSetInputReadOnly(elementOrId) {
        let element = EzUI.ezInstance.ezFindByElementOrId(elementOrId);
        if (!EzObject.isValid(element)) {
            return null;
        }

        element.readOnly = true;

        return element;
    }

    /**
     * @public @method
     * Sets an input's readonly property to false
     * @param {Object|String} elementOrId
     * @returns {Object|null}
     */
    ezSetInputReadWrite(elementOrId) {
        let element = EzUI.ezInstance.ezFindByElementOrId(elementOrId);
        if (!EzObject.isValid(element)) {
            return null;
        }

        element.readOnly = false;

        return element;
    }

    /**
     * @deprecated
     * Migrate to: EzUI.ezInstance.ezIsCheckboxChecked() (with lowercased box)
     * @public @method
     * Determines if the element or element with the provided id is checked or not.
     * @param (Object|String) elementOrId
     * @returns {boolean}
     */
    ezIsCheckBoxChecked(elementOrId) {
        return EzUI.ezInstance.ezIsCheckboxChecked(elementOrId);
    }

    /**
     * @public @method
     * Determines if the element or element with the provided id is checked or not.
     * @param (Object|String) elementOrId
     * @returns {boolean}
     */
    ezIsCheckboxChecked(elementOrId) {
        let element = EzUI.ezInstance.ezFindByElementOrId(elementOrId);

        if (!EzObject.isValid(element)) {
            return false;
        }

        return EzBoolean.isTrue(element.checked);
    }

    /**
     * @public @method
     * Determines if the checkbox identified with the provided select is checked or not.
     * @param {string} selector
     * @returns {boolean}
     */
    ezIsCheckBoxChecked$(selector) {
        if (!EzString.hasLength(selector) || !EzUI.ezInstance.ezElementExists$(selector)) {
            return false;
        }

        let iCheck = $(selector);
        if (0 < iCheck.length) {
            iCheck = iCheck[0];
        }

        if (ezApi.ezIsBoolean(iCheck.indeterminate)) {
            return iCheck.checked;
        }

        let isChecked = $(selector).checked;
        return EzObject.isValid(isChecked) ? isChecked : $(selector).prop('checked');
    }

    /**
     * @public @method
     * Returns the width of an element identified by the provided id
     * Will return NaN if the element doesn't exist
     * @param {string} id
     * @returns {number}
     * Returns response from jquery.css('width')
     */
    ezElementWidth(id) {
        return EzUI.ezInstance.ezElementWidth$(EzUI.ezInstance.ezNormalizeId(id));
    }

    /**
     * @public @method
     * Returns the width of an element identified by the provided selector
     * Will return NaN if the element doesn't exist
     * @param {string} selector
     * @returns {number}
     * Returns response from jquery.css('width')
     */
    ezElementWidth$(selector) {
        if (!EzString.hasLength(selector)) {
            ezApi.ezclocker.ezLogger.error('A valid selector is required to obtain an element\'s width');
            return NaN;
        }
        if (!EzUI.ezInstance.ezElementExists$(selector)) {
            ezApi.ezclocker.ezLogger.error(
                'Unable to obtain the width element selected by ' + selector + '. The element does not exist.'
            );
            return NaN;
        }
        return ezApi.ezToNumber($(selector).css('width'));
    }

    /**
     * @public @method
     * Returns the height of an element identified by the provided id
     * Will return NaN if the element doesn't exist
     * @param {string} id
     * @returns {number}
     * Returns response from jquery.css('height')
     */
    ezElementHeight(id) {
        return EzUI.ezInstance.ezElementHeight$(EzUI.ezInstance.ezNormalizeId(id));
    }

    /**
     * @public @method
     * Returns the height of an element identified by the provided selector
     * Will return NaN if the element doesn't exist
     * @param {string} selector
     * @returns {number}
     * Returns response from jquery.css('height')
     */
    ezElementHeight$(selector) {
        if (!EzString.hasLength(selector)) {
            ezApi.ezclocker.ezLogger.error('A valid selector is required to obtain an element\'s width');
            return NaN;
        }
        if (!EzUI.ezInstance.ezElementExists$(selector)) {
            ezApi.ezclocker.ezLogger.error(
                'Unable to obtain the width element selected by ' + selector + '. The element does not exist.'
            );
            return NaN;
        }
        return ezApi.ezToNumber($(selector).css('height'));
    }

    /**
     * TODO: Remove this method once all use is migrated
     * @public @method
     * @param {string} id
     * @returns {Object}
     * @deprecated
     * Migrate to ezApi.ezclocker.ezUI.ezElementClientRect(elementOrId)
     */
    ezGetElementRect(id) {
        return EzUI.ezInstance.ezGetElementRect$(EzUI.ezInstance.ezNormalizeId(id));
    }

    /**
     * @public @method
     * Sets the height of the elemenet.
     * @param {object|string} elementOrId
     * @returns {number}
     * Returns the element if found, or null.
     * @deprecated
     * Migrate to one of the following:
     *  1) ezApi.ezclocker.ezUi.ezGetElementOuterHeight(elementOrId)
     *  2) ezApi.ezclocker.ezUi.ezGetElementInnerHeight(elementOrId)
     */
    ezGetElementHeight(elementOrId) {
        if ('window' === elementOrId) {
            return window.innerHeight;
        }

        let element = EzUI.ezInstance.ezFindByElementOrId(elementOrId);
        if (!EzObject.isValid(element)) {
            return null;
        }

        return element.clientHeight;
    }

    /**
     * @public @method
     * Sets the height of the elemenet.
     * @param {object|string} elementOrId
     * @returns {number}
     * Returns the element if found, or null.
     * @deprecated
     * Migrate to one of the following:
     *  1) ezApi.ezclocker.ezUi.ezGetElementOuterHeight(elementOrId)
     *  2) ezApi.ezclocker.ezUi.ezGetElementInnerHeight(elementOrId)
     */
    ezGetElementWidth(elementOrId) {
        if ('window' === elementOrId) {
            return window.innerHeight;
        }

        let element = EzUI.ezInstance.ezFindByElementOrId(elementOrId);
        if (!EzObject.isValid(element)) {
            return null;
        }

        return element.clientWidth;
    }

    /**
     * @public @method
     * Gets the offsetTop of the elemenet.
     * @param {object|string} elementOrId
     * @returns {number}
     */
    ezGetElementOffsetTop(elementOrId) {
        if ('window' === elementOrId) {
            return window.innerHeight;
        }

        let element = EzUI.ezInstance.ezFindByElementOrId(elementOrId);
        if (!EzObject.isValid(element)) {
            return null;
        }

        return element.offsetTop;
    }

    /**
     * @public @method
     * Returns the offsetHeight value (aka outer height) of the element associated with the provided elementOrId.
     * If the element does not exist, zero is returned.
     * For the window reference the value of window.outerHeight is returned. For all other html elements the value of
     * element.offsetHeight is returned.
     * @param {object|string} elementOrId
     * @returns {number}
     */
    ezGetElementOuterHeight(elementOrId) {
        let element = EzUI.ezInstance.ezFindByElementOrId(elementOrId);

        if (!EzObject.isValid(element)) {
            return 0;
        }

        let outerHeight = window === element
            ? window.outerHeight
            : element.offsetHeight;

        return EzNumber.isNumber(outerHeight)
            ? outerHeight
            : 0;
    }

    /**
     * @public @method
     * Returns the offsetWidth value (aka outer height) of the element associated with the provided elementOrId.
     * If the element does not exist, zero is returned.
     * For the window reference the value of window.outerWidth is returned. For all other html elements the value of
     * element.offsetHeight is returned.
     * @param {object|string} elementOrId
     * @returns {number}
     */
    ezGetElementOuterWidth(elementOrId) {
        let element = EzUI.ezInstance.ezFindByElementOrId(elementOrId);

        if (!EzObject.isValid(element)) {
            return 0;
        }

        let outerWidth = window === element
            ? window.outerWidth
            : element.offsetWidth;

        return EzNumber.isNumber(outerWidth)
            ? outerWidth
            : 0;
    }

    /**
     * @public @method
     * Returns the client height value (aka inner height) of the element associated with the provided elementOrId.
     * For the window reference the value of window.innerHeight is returned. For all other html elements the value of
     * element.clientHeight is returned.
     * If the element does not exist, zero is returned.
     * @param {object|string} elementOrId
     * @returns {number}
     */
    ezGetElementInnerHeight(elementOrId) {
        let element = EzUI.ezInstance.ezFindByElementOrId(elementOrId);

        if (!EzObject.isValid(element)) {
            return 0;
        }

        let outerHeight = window === element
            ? window.innerHeight
            : element.clientHeight;

        return EzNumber.isNumber(outerHeight)
            ? outerHeight
            : 0;
    }

    /**
     * @public @method
     * Sets the height of the elemenet.
     * @param {object|string} elementOrId
     * @param {number|string} height
     * @returns {object|null}
     * Returns the element if found, or null.
     */
    ezSetElementHeight(elementOrId, height) {
        let element = EzUI.ezInstance.ezFindByElementOrId(elementOrId);
        if (!EzObject.isValid(element)) {
            return null;
        }

        element.style.height = height;

        return element;
    }

    /**
     * @public @method
     * Sets the height of the elemenet.
     * @param {object|string} elementOrId
     * @param {number|string} height
     * @returns {object|null}
     * Returns the element if found, or null.
     */
    ezSetElementMaxHeight(elementOrId, maxHeight) {
        let element = EzUI.ezInstance.ezFindByElementOrId(elementOrId);
        if (!EzObject.isValid(element)) {
            return null;
        }

        element.style.maxHeight = maxHeight;

        return element;
    }

    /**
     * TODO: Remvoe this method once all use is migrated
     * @public @method
     * @param {string} selector
     * @returns {object}
     * @deprecated
     * Will remove in a future release
     * Migrate to: ezApi.ezclocker.ezUi.ezElementClientRect(elementOrId)
     */
    ezGetElementRect$(selector) {
        if (!EzString.hasLength(selector)) {
            ezApi.ezclocker.ezLogger.error('A valid selector is required to obtain an element\'s bounding client rect.');
            return new EzElementRect();
        }
        if (!EzUI.ezInstance.ezElementExists$(selector)) {
            ezApi.ezclocker.ezLogger.error(
                'Unable to obtain the  bounding client rect for the element selected by ' +
                selector +
                '. The element does not exist.'
            );
            return new EzElementRect();
        }

        let domRect = EzUI.ezInstance.ezId$(selector)[0].getBoundingClientRect();
        let result = new EzElementRect();
        if (EzObject.isValid(domRect)) {
            result.ezCopyFromDOMRect(domRect);
        }

        return result;
    }



    /**
     * Sets the value of the select input identified by
     * @param {*} id
     * @param {*} value
     */
    ezSetSelectValue(id, value) {
        if (EzUI.ezInstance.ezElementExists(id)) {
            document.getElementById(id).value = value;
        } else {
            // Assume it is a JQuery UI selector instead, and use the older jquery
            EzUI.ezInstance.ezSetSelectValue$(id, value);
        }
    }

    /**
     * Sets the value of the select input identified by the provided jquery selector
     * @param {string} selector
     * @param {*} value
     */
    ezSetSelectValue$(selector, value) {
        $(selector).val(value);
        $(selector).selectmenu('refresh');
    }

    /**
     * @public @method
     * Selects all the text in an input.
     * NOTE: Non-jquery function!
     */
    ezSelectAll(id) {
        if (!EzString.hasLength(id)) {
            return; // need a valid id
        }
        if (!EzUI.ezInstance.ezElementExists(id)) {
            return;
        }

        let element = document.getElementById(id);
        element.focus();
        element.select();
    }

    /**
     * @public @method
     * Calls 'open' on a jquery-ui dialog with the associated id.
     * @param {string} dialogId
     */
    ezShowDialog(dialogId) {
        if (!EzString.hasLength(dialogId)) {
            return;
        }

        if (!EzUI.ezInstance.ezElementExists(dialogId)) {
            ezApi.ezclocker.ezLogger.error(
                EzString.em`
                    Unable to display dialog with dialogId=${dialogId}.
                    HTML element does not exist in the current page.`);

            return;
        }

        try {
            EzUI.ezInstance.ezId(dialogId).dialog('open');
        } catch (err) {
            ezApi.ezclocker.ezLogger.error(
                EzString.em`
                    Unable to display dialog with dialogId=${dialogId}.
                    Error reported: ${EzString.stringOrDefault(err.message, 'No reason given')}
                    Error: ${EzJson.toJson(err)}`);
        }
    }

    /**
     * @public @method
     * Calls 'close' on a jquery-ui dialog with the associated id.
     * @param {string} dialogId
     */
    ezCloseDialog(dialogId) {
        if (!EzString.hasLength(dialogId)) {
            return;
        }

        EzUI.ezInstance.ezId(dialogId).dialog('close');
    }

    /**
     * @public @method
     * Displays an error dialog for failed API calls.
     * @param {Object} eResponse
     * @param {string} errorTitle
     * @param {string} errorLogMessage
     * @param {string} userMessage
     * @param {string} optionalData
     * @returns {Promise}
     * A resolve only promise
     */
    ezShowApiErrorDialog(eResponse, errorTitle, errorLogMessage, userMessage, optionalData) {
        let et = EzString.hasLength(errorTitle) ? errorTitle : 'Job Code Error';

        let elm = EzObject.isValid(eResponse)
            ? `${errorLogMessage} ${ezApi.ezToJson(eResponse)}`
            : errorLogMessage;

        let uem = EzObject.isValid(eResponse)
            ? `${userMessage} ${eResponse.message}`
            : userMessage;

        let data = EzObject.isValid(optionalData)
            ? optionalData
            : eResponse;

        ezApi.ezclocker.ezLogger.error(elm);

        return ezApi.ezclocker.ezDialog.ezShowErrorDialog(et, uem, data);
    }

    /**
     * @public @method
     * Builds a element id from the provided elementIdPrefix and the provided entityId in the format:
     * {elementIdPrefix}_{entityId}
     * If elementIdPrefix is null or empty string then the value 'EzElement' is used.
     * if entityId is not valid then the value 'UNKNOWN_ID' is used instead.
     * @returns {string}
     * Returns an element id in the following format: {elementIdPrefix|EzElement}_{entityId|UNKNOWN_ID}
     */
    ezBuildEntityLinkedElementId(elementIdPrefix, entityId) {
        elementIdPrefix = EzString.hasLength(elementIdPrefix)
            ? elementIdPrefix
            : 'EzElement';

        entityId = EzNumber.isNumber(entityId)
            ? entityId.toString()
            : entityId;

        entityId = EzString.hasLength(entityId)
            ? entityId
            : 'UNKNOWN_ID';

        return `${elementIdPrefix}_${entityId}`;
    }

    /**
     * @public @method
     * Builds a child element's Id based of the parent element id provided.
     * If parentElementId is empty or null, then 'EzClocker' is used as the parent id.
     * If childElementName is empty or null, then 'ChildElement' is used as the child element name.
     * @param {String|null} parentElementId
     * @param {String|null} childElementName
     * @returns {string}
     * Child element id in the format of: {parentElementId}_{childElementName}
     */
    ezBuildChildElementId(parentElementId, childElementName) {
        if (!EzString.hasLength(parentElementId)) {
            parentElementId = 'EzClocker';
        }
        if (!EzString.hasLength(childElementName)) {
            childElementName = 'ChildElement' + ezApi.ezclocker.ezDateTime.ezGetNowUTCUnixMSTimeStamp();
        }

        return `${parentElementId}_${childElementName}`;
    }

    /**
     * @public @method
     * Sizes the element associated with the provided childElementId to a percentage of the parent element
     * associated with the provided parentElementId IF percentWidthOfParent and/or percentHeightOfParent is provided.
     * The width or height of the child element is maintained if the respective percent parm is not provided or not
     * a number.
     * If the percent param value is greater than 1, it is divided by 100 before being used to calculate the]
     * child size. Otherwise, the less than 1 value is used to calculate the child size.
     * Child size calculation: parentInner(Width/Height) * precent(Width/Height)OfParent
     */
    ezSizeToParent(parentElementId, childElementId, percentWidthOfParent, percentHeightOfParent) {
        return EzUI.ezInstance.ezSizeToParent$(
            `#${parentElementId}`,
            `#${childElementId}`,
            percentWidthOfParent,
            percentHeightOfParent);
    }

    /**
     * @public @method
     * Sizes the element associated with the provided childSelector to a percentage of the parent element
     * associated with the provided parentSelector IF percentWidthOfParent and/or percentHeightOfParent is provided.
     * The width or height of the child element is maintained if the respective percent parm is not provided or not
     * a number.
     * If the percent param value is greater than 1, it is divided by 100 before being used to calculate the]
     * child size. Otherwise, the less than 1 value is used to calculate the child size.
     * Child size calculation: parentInner(Width/Height) * precent(Width/Height)OfParent
     */
    ezSizeToParent$(parentSelector, childSelector, percentWidthOfParent, percentHeightOfParent) {
        if (!EzUI.ezInstance.ezElementExists$(parentSelector)) {
            ezApi.ezclocker.ezLogger.error('A valid parent element id is required in call to EzUI.ezSizeToParent.');

            return;
        }
        if (!EzUI.ezInstance.ezElementExists$(childSelector)) {
            ezApi.ezclocker.ezLogger.error('A valid child element id is required in call to EzUI.ezSizeToParent.');

            return;
        }
        if (!EzNumber.isNumber(percentWidthOfParent) && !EzNumber.isNumber(percentHeightOfParent)) {
            ezApi.ezclocker.ezLogger.error(
                'A valid percent width or height of parent value is required in call to EzUI.ezSizeToParent.');

            return;
        }

        if (EzNumber.isNumber(percentWidthOfParent)) {
            let pWidth = $(parentSelector).innerWidth();

            percentWidthOfParent = percentWidthOfParent > 1 ? percentWidthOfParent / 100 : percentWidthOfParent;

            let cWidth = Math.floor(pWidth * percentWidthOfParent);

            $(childSelector).width(cWidth);
        }

        if (EzNumber.isNumber(percentHeightOfParent)) {
            let pHeight = $(parentSelector).innerHeight();

            percentHeightOfParent = percentHeightOfParent > 1 ? percentHeightOfParent / 100 : percentHeightOfParent;

            let cHeight = Math.floor(pHeight * percentHeightOfParent);

            $(childSelector).height(cHeight);
        }
    }

    /**
     * @public @method
     * Creates a jquery effect option equal to the provided effect. If the effect param is empty or null the 'Bounce'
     * effect is used instead.
     * Example Result:
     * <code>
     * {
     *      effect: {effect}
     * }
     * </code>
     * @param {*} effect
     */
    ezCreateEffectOptions(effect) {
        return {
            effect: EzString.stringOrDefault(effect, 'Bounce'),
        };
    }

    /**
     * @public @method
     * Performs the jQuery UI PUFF effect on the element identified by the provided id.
     * jQuery UI Help: https://api.jqueryui.com/puff-effect/
     * @param {string} id
     * @param {Number} percent
     * @returns {Promise.resolve}
     */
    ezPuffEffect(id, percent) {
        if (!EzString.hasLength(id)) {
            ezApi.ezclocker.ezLogger.error('A valid element id is required in call to EzUI.ezPuff().');

            return EzPromise.resolve();
        }

        return EzUI.ezInstance.ezPuffEffect$(EzUI.ezInstance.ezNormalizeId(id), percent);
    }

    /**
     * @public @method
     * Performs the jQuery UI PUFF effect on the element identified by the provided selector.
     * @param {string} selector
     * @param {Number} percent
     * @returns {Promise.resolve}
     */
    ezPuffEffect$(selector, percent) {
        if (!EzString.hasLength(selector)) {
            ezApi.ezclocker.ezLogger.error('A valid element selector is required in call to EzUI.ezPuff$().');
            return EzPromise.resolve();
        }

        return EzUI.ezInstance.ezToggleEffect$(selector, {
            effect: 'puff',
            percent: EzNumber.isNumber(percent) ? percent : 150,
        });
    }

    /**
     * @public @method
     * Performs the jQuery UI PUFF effect on the element identified by the provided id.
     * jQuery UI Help: https://api.jqueryui.com/scale-effect/
     * @param {string} id
     * @param {Number} direction
     * One of: both, vertical, or horizontal
     * @param {Array} origin
     * Array of positions: ['middle', 'center]
     * @param {Number} percent
     * Percentage to scale
     * @param {string} scale
     * One of: 'both', 'box', 'content'
     * @returns {Promise.resolve}
     */
    ezScaleEffect(id, direction, origin, percent, scale) {
        if (!EzString.hasLength(id)) {
            ezApi.ezclocker.ezLogger.error('A valid element id is required in call to EzUI.ezPuff().');
            return EzPromise.resolve();
        }

        return EzUI.ezInstance.ezToggleEffect$(
            EzUI.ezInstance.ezNormalizeId(id),
            {
                effect: 'scale',
                direction: EzString.hasLength(direction)
                    ? direction
                    : 'both',
                origin: EzArray.arrayHasLength(origin)
                    ? origin
                    : ['middle', 'center'],
                percent: EzNumber.isNumber(percent)
                    ? percent
                    : 200,
                scale: EzString.hasLength(scale)
                    ? scale
                    : 'both'
            });
    }

    /**
     * @public @method
     * Applies a sliding effect to the element associated with the provided id.
     * @param {string} id
     * @param {string} direction
     * One of: 'left', 'right', 'up', 'down'
     * @returns {Promise.resolve}
     */
    ezSlideEffect(id, direction) {
        if (!EzString.hasLength(id)) {
            ezApi.ezclocker.ezLogger.error('A valid element id is required in call to EzUI.ezPuff().');
            return EzPromise.resolve();
        }

        return EzUI.ezInstance.ezToggleEffect$(EzUI.ezInstance.ezNormalizeId(id), {
            effect: 'slide',
            direction: EzString.hasLength(direction)
                ? direction
                : 'left',
        });
    }

    /**
     * @public @method
     * Evaluates the provided id to determine if the # symbole need prepended or not.
     * @param {string} id
     * @return {string}
     */
    ezNormalizeId(id) {
        if (EzObject.isValid(id) && !EzString.isString(id)) {
            return '#' + id.id;
        }
        if (!EzString.hasLength(id)) {
            ezApi.ezclocker.ezLogger.error(
                'A valid, non-null, non-empy id param is required in call to EzUI.ezNormalizeId().'
            );
            return id;
        }

        if ('#' === id[0]) {
            return id;
        }
        return '#' + id;
    }

    /**
     * @public @method
     * Performs the jQuery UI PUFF effect on the element identified by the provided id.
     * jQuery UI Help: https://api.jqueryui.com/scale-effect/
     * @param {string} id
     * @param {Number} direction
     * One of: 'up', 'down', 'left', 'right'
     * @returns {Promise.resolve}
     */
    ezDropEffect(id, direction) {
        if (!EzString.hasLength(id)) {
            ezApi.ezclocker.ezLogger.error('A valid element id is required in call to EzUI.ezPuff().');
            return EzPromise.resolve();
        }

        return EzUI.ezInstance.ezToggleEffect$(EzUI.ezInstance.ezNormalizeId(id), {
            effect: 'drop',
            direction: EzString.hasLength(direction)
                ? direction
                : 'left',
        });
    }

    /**
     * @public @method
     * Executes a jquery effect upon the element identified by the provided selector.
     * @param {Object} options
     * @return {Promise.resolve}
     */
    ezToggleEffect$(selector, options) {
        if (!EzString.hasLength(selector)) {
            ezApi.ezclocker.ezLogger.error('A valid element selector is required in call to EzUI.ezEffect$.');
            return EzPromise.resolve();
        }
        if (!EzObject.isValid(options)) {
            ezApi.ezclocker.ezLogger.error('A valid options object is required in call to EzUI.ezEffect$().');
            return;
        }

        return EzPromise.resolve(
            (resolve) => {
                options.duration = 2500;
                options.complete = resolve;
                // Execute the effect
                EzUI.ezInstance.ezId$(selector).toggle(options);
            });
    }

    /**
     * @public @method
     * Returns the callback resolver to use based on if a call back function is provided.
     * @returns {Function}
     */
    ezCallbackResolver(selector, resolve, cb) {
        return ezApi.ezIsFunction(cb)
            ? () => {
                return resolve(ezApi.ezCallback(cb));
            }
            : () => {
                resolve(selector);
            };
    }

    /**
     * @public @method
     * Returns the current position of the scroll bars for the provied elementOrId
     * @param {object|string} elementOrId
     * @returns {object}
     * {
     *     top: <vertical scroll bar position>,
     *     left: <horizontal scroll bar position>
     * }
     */
    ezElementScrollPosition(elementOrId) {
        let element = EzUI.ezInstance.ezFindByElementOrId(elementOrId);
        if (!EzObject.isValid(element)) {
            return {
                top: 0,
                left: 0
            };
        }

        return {
            top: element.scrollTop,
            left: element.scrollLeft
        };
    }

    /**
     * @public @method
     * Sets the position of the scroll bar element associated with the provided id
     * @param {Object|String} elementOrId
     * @param {Number} x
     * @param {Number} y
     * @returns {Object|null}
     * Returns the element (if any)
     */
    ezScrollTo(elementOrId, x, y) {
        let element = EzUI.ezInstance.ezFindByElementOrId(elementOrId);
        if (!EzObject.isValid(element)) {
            return null;
        }

        if (EzNumber.isNumber(x)) {
            element.scrollTop = x;
        }

        if (EzNumber.isNumber(y)) {
            element.scrollLeft = y;
        }

        return element;
    }

    /**
     * @public @method
     * Sets the position of the scroll bars associated with the provided id to top left
     * @param {Object|String} elementOrId
     * @returns {Object|null}
     * Returns the element (if any)
     */
    ezScrollToTop(elementOrId) {
        let element = EzUI.ezInstance.ezFindByElementOrId(elementOrId);

        if (!EzObject.isValid(element)) {
            return null;
        }

        element.scrollTop = 0;
        element.scrollLeft = 0;

        return element;
    }

    /**
     * @public @method
     * Determines if an HTML element has a display style that is not 'NONE'
     * @param {undefined|null|string|object} elementOrId
     * @returns {boolean}
     */
    ezIsElementDisplayed(elementOrId) {
        let element = EzUI.ezInstance.ezFindByElementOrId(elementOrId);

        if (!EzObject.isValid(element)) {
            return false;
        }

        let displayValue = element.style.display;

        return displayValue.toUpperCase() !== 'NONE';
    }

    /**
     * @public @method
     * Sets the position of the scroll bar element associated with the provided id
     * @param {string} id
     * @param {Number} x
     * @param {Number} y
     */
    ezScrollToBottom(id) {
        if (!EzString.hasLength(id)) {
            ezApi.ezclocker.ezLogger.error('A valid element id is required in call to EzUI.ezScrollTo.');
            return;
        }

        let element = document.getElementById(id);
        if (!EzObject.isValid(element)) {
            ezApi.ezclocker.ezLogger.error('Element with id=' + id + ' does not exist.');
            return;
        }

        let x = element.clientHeight;
        if (EzNumber.isNumber(x)) {
            element.scrollTop = x;
            element.scrollLeft = 0;
        }
    }

    /**
     * @public @method
     * Executes a key-press event
     * @param {string} unicodeCharacter
     * @param {string} virtualKeyCode
     */
    ezKeyPress(unicodeCharacter, virtualKeyCode) {
        let keyboardEvent = document.createEvent('KeyboardEvent');

        if (EzNumber.isNumber(virtualKeyCode) && 0 != virtualKeyCode) {
            unicodeCharacter = 0;
        }

        keyboardEvent.initKeyEvent(
            // event type: keydown, keyup, keypress
            'keydown',
            // bubbles
            true,
            // cancelable
            true,
            // view: should be window
            window,
            // ctrlKey
            false,
            // altKey
            false,
            // shiftKey
            false,
            // metaKey
            false,
            // keyCode: unsigned long - the virtual key code, else 0
            virtualKeyCode,
            // charCode: unsigned long - the Unicode character associated with the depressed key, else 0
            unicodeCharacter
        );

        document.dispatchEvent(keyboardEvent);
    }

    /**
     * @public @method
     * Initializes the special iCheck jQuery check boxes
     * @param {object|string} iCheckBoxElementOrId
     * @param {Boolean|null} checked
     * @returns {Object|null}
     * Returns the reference to the element (if found)
     */
    ezInitICheckbox(iCheckBoxElementOrId, checked, onCheckedHandler, onUncheckedHandler) {
        let element = EzUI.ezInstance.ezFindByElementOrId(iCheckBoxElementOrId);

        if (!EzObject.isValid(element)) {
            ezApi.ezclocker.ezLogger.error(`iCheckbox with id=${iCheckBoxElementOrId} does not exist.`);

            return null;
        }

        EzUI.ezInstance.ezId(element.id).iCheck({
            //increaseArea: '20%'
            // disabledCheckboxClass: 'icheckbox_flat-grey',
            // disabledRadioClass: 'icheckbox_flat-grey',
            checkboxClass: 'icheckbox_square-orange',
            radioClass: 'iradio_square-orange',
        });

        EzUI.ezInstance.ezSetICheckBoxValue(element, EzBoolean.isTrue(checked));

        if (ezApi.ezIsFunction(onCheckedHandler)) {
            EzUI.ezInstance.ezId(element.id).on('ifChecked', onCheckedHandler);
        }

        if (ezApi.ezIsFunction(onUncheckedHandler)) {
            EzUI.ezInstance.ezId(element.id).on('ifUnChecked', onUncheckedHandler);
        }

        return element;
    }

    /**
     * @public @method
     * Sets the scroll position of the parent element to the top of the child element
     * @param {string} parentElementOrId
     * @param {string} childElementOrId
     */
    ezScrollToElement(parentElementOrId, childElementOrId) {
        let parentElement = EzUI.ezInstance.ezFindByElementOrId(parentElementOrId);
        if (!EzObject.isValid(parentElement)) {
            return null;
        }

        let childElement = EzUI.ezInstance.ezFindByElementOrId(childElementOrId);

        if (!EzObject.isValid(parentElement)) {
            return parentElement;
        }

        if (EzNumber.isNumber(childElement.scrollTop)) {
            EzUI.ezInstance.ezScrollTo(parentElement, childElement.scrollTop, 0);
        }

        return parentElement;
    }

    /**
     * @public @method
     * Returns an EzDomRect with the DOMRect in  formation for the provided element or id.
     * @param {object|string} elementOrId
     * @returns {EzDomRect}
     */
    ezElementClientRect(elementOrId) {
        let element = EzUI.ezInstance.ezFindByElementOrId(elementOrId);

        if (!EzObject.isValid(element)) {
            throw new EzBadParamException(
                'elementOrId',
                EzUI.ezInstance,
                EzUI.ezInstance.ezElementClientRect);
        }

        let domRect = element.getBoundingClientRect();

        return EzObject.isValid(domRect)
            ? new EzDomRect(domRect)
            : new EzDomRect(null, 0, 0, 0, 0, 0, 0, 0, 0);
    }

    /**
     * @public @method
     * Determines if the element associated with the elementOrId is visible within a scrolling container.
     * @param {undefined|null|object|string} elementOrId
     * Reference to an HTML element or the ID to an html element.
     * @returns {boolean}
     * Returns true if the element exists and is scrolled into view.
     * False otherwise.
     */
    ezElementInView(elementOrId) {
        let element = EzUI.ezInstance.ezFindByElementOrId(elementOrId);

        if (!EzObject.isValid(element)) {
            return false;
        }

        let parentElement = element.parent;

        if (!EzObject.isValid(parent)) {
            return true;
        }

        const elementEzDomRect = EzUI.ezInstance.ezElementClientRect(element);
        const parentEzDomRect = EzUI.ezInstance.ezElementClientRect(parentElement);

        return elementEzDomRect.top <= parentEzDomRect.top
            ? parentEzDomRect.top - elementEzDomRect.top <= elementEzDomRect.height
            : elementEzDomRect.bottom - parentEzDomRect.bottom <= elementEzDomRect.height
    }

    /**
     * @public @method
     * Attempts to scroll the provided element or element with provided id into view.
     * @param {object|string} elementOrId
     * HTML element reference or Id of HTML element.
     * @returns {null|object}
     * Returns the element if it exists, null otherwise.
     */
    ezElementScrollIntoViewIfNeeded(elementOrId) {
        let element = EzUI.ezInstance.ezFindByElementOrId(elementOrId);
        if (!EzObject.isValid(element)) {
            return null;
        }

        element.scrollIntoView({ behavior: "smooth", block: "center", inline: "center" });

        return element;
    }

    /**
     * TODO: Remove this method once all use is migrated
     * @public @method
     * Attempts to scroll the provided element or element with provided id into view.
     * @param {Object|String} elementOrId
     * @returns {Object|null}
     * Returns the element or null.
     * @deprecated
     * Migrate to ezApi.ezclocker.ezUi.ezElementScrollIntoViewIfNeeded(elementOrId)
     */
    ezScrollIntoView(elementOrId) {
        let element = EzUI.ezInstance.ezFindByElementOrId(elementOrId);
        if (!EzObject.isValid(element)) {
            return null;
        }

        element.scrollIntoViewIfNeeded();

        return element;
    }

    /**
     * @public @method
     * Returns the ID of the document's element that has the current focus (if any). Returns null if none has focus
     * @returns {string}
     */
    ezGetElementIdWithFocus() {
        return EzObject.isValid(document.activeElement) ? document.activeElement.id : null;
    }

    /**
     * @public @method
     * Determines if the element is visible to the user
     * @param {object|string} elementOrId
     * @returns {boolean}
     */
    ezIsElementVisible(elementOrId) {
        let element = EzUI.ezInstance.ezFindByElementOrId(elementOrId);
        if (null == element) {
            return false;
        }

        let rect = element.getBoundingClientRect();

        // DOMRect { x: 8, y: 8, width: 100, height: 100, top: 8, right: 108, bottom: 108, left: 8 }
        let windowHeight = innerHeight || document.documentElement.clientHeight;
        let windowWidth = innerWidth || document.documentElement.clientWidth;

        // http://stackoverflow.com/questions/325933/determine-whether-two-date-ranges-overlap
        let vertInView = rect.top <= windowHeight && rect.top + rect.height >= 0;
        let horInView = rect.left <= windowWidth && rect.left + rect.width >= 0;

        return vertInView && horInView;
    }

    ezIsElementFullyVisible(elementOrId) {
        let element = EzUI.ezInstance.ezFindByElementOrId(elementOrId);
        if (null == element) {
            return false;
        }

        let rect = element.getBoundingClientRect();
        let vWidth = innerWidth || document.documentElement.clientWidth;
        let vHeight = innerHeight || document.documentElement.clientHeight;
        let efp = (x, y) => {
            return document.elementFromPoint(x, y);
        };

        // Return false if it's not in the viewport
        if (rect.right < 0 || rect.bottom < 0 || rect.left > vWidth || rect.top > vHeight) {
            return false;
        }

        // Return true if any of its four corners are visible
        return (
            element.contains(efp(rect.left, rect.top)) ||
            element.contains(efp(rect.right, rect.top)) ||
            element.contains(efp(rect.right, rect.bottom)) ||
            element.contains(efp(rect.left, rect.bottom))
        );
    }
}

export {
    EzUI,
    ezUi
};
