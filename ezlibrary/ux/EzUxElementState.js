import {
    EzBadParamException
} from '/ezlibrary/exceptions/EzExceptions.js';

import {
    EzBoolean,
    EzString,
    EzFunction
} from '/ezlibrary/helpers/EzHelpers.js';

import { EzJSONSerializable } from '/ezlibrary/entities/EzJSONSerializable.js';

/**
 * @class
 * @extends {EzJSONSerializable}
 * @description
 * Defines the preferred state of an HTML element to apply
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 * Import with:
 *     import { EzUxElementState } from '/ezlibrary/ux/EzUxElementState.js';
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 */
export class EzUxElementState extends EzJSONSerializable {
    /**
     * @public @constructor
     * Creates a new instance of EzUxElementState
     * @param {string} elementId
     * Required value
     * @param {undefined|null|boolean} visible
     * Default: true
     * @param {undefined|null|boolean} enable
     * Default: true
     * @param {undefined|null|boolean} remove
     * Default: false
     * @param {undefined|null|function} stateModifiedCallback
     * Default: null
     */
    constructor(
        elementId,
        visible = true,
        enable = true,
        remove = false,
        stateModifiedCallback = null,
        enabledHint = null,
        disabledHint = null) {
        super();

        if (!EzString.stringHasLength(elementId)) {
            throw new EzBadParamException(
                'elementId',
                this,
                this.constructor);
        }

        this.ezElementId = elementId;
        this.ezVisible = visible;
        this.ezEnabled = enable;
        this.ezRemove = remove;
        this.ezStateModifiedCallback = stateModifiedCallback;
        this.ezEnabledHint = enabledHint;
        this.ezDisabledHint = disabledHint;
    }

    /**
     * @private @field
     * Stores the html element id of the element the state will apply to
     * Default: 'EzUnknownElementId'
     * @type {string}
     */
    #ezElementId = 'EzUnknownElementId';
    /**
     * @public @property @getter
     * Gets the html element id of the element the state will apply to
     * @returns {string}
     */
    get ezElementId() {
        return this.#ezElementId;
    }
    /**
     * @public @property @setter
     * Sets the html element id of the element the state will apply to
     * @param {string} ezElementId
     */
    set ezElementId(ezElementId) {
        if (!EzString.hasLength(ezElementId)) {
            throw new EzBadParamException(
                'ezElementId',
                this,
                'set ezElementId(ezElementId)');
        }

        this.#ezElementId = EzString.stringOrEmpty(ezElementId);
    }

    /**
     * @private @field
     * Stores if the state of the UX element should have a visible state.
     * @type {boolean}
     */
    #ezVisible = true;
    /**
     * @public @property @getter
     * Gets if the state of the UX element should have a visible state.
     * @returns {boolean}
     */
    get ezVisible() {
        return this.#ezVisible;
    }
    /**
     * @public @property @setter
     * Sets if the state of the UX element should have a visible state.
     * @param {boolean} ezVisible
     * Default: true
     */
    set ezVisible(ezVisible = true) {
        this.#ezVisible = EzBoolean.booleanOrTrue(ezVisible);
    }

    /**
        @private @field
        Stores if the state of the UX element should have an enabled state.
        @type {boolean}
     */
    #ezEnable = true;
    /**
     * @public @property @getter
     * Gets if the state of the UX element should have an enabled state.
     * @returns {boolean}
     */
    get ezEnable() {
        return this.#ezEnable;
    }
    /**
     * @public @property @setter
     * Sets if the state of the UX element should have an enabled state.
     * @param {boolean} ezEnable
     * Default: true
     */
    set ezEnable(ezEnable = true) {
        this.#ezEnable = EzBoolean.booleanOrTrue(ezEnable);
    }

    /**
        @private @field
        Stores if the state of the UX element should get removed from the document.
        @type {boolean}
     */
    #ezRemove = false;
    /**
     * @public @property @getter
     * Gets if the state of the UX element should get removed from the document.
     * @returns {boolean}
     */
    get ezRemove() {
        return this.#ezRemove;
    }
    /**
     * @public @property @setter
     * Sets if the state of the UX element should get removed from the document.
     * @param {boolean} ezRemove
     * Default: false
     */
    set ezRemove(ezRemove = false) {
        this.#ezRemove = EzBoolean.booleanOrFalse(ezRemove);
    }

    /**
     * @private @field
     * Stores if the UX element is selected or not.
     * Default: false
     * @type {boolean}
     */
    #ezSelected = false;
    /**
     * @public @property @getter
     * Gets if the UX element is selected or not.
     * @returns {boolean}
     */
    get ezSelected() {
        return this.#ezSelected;
    }
    /**
     * @public @property @setter
     * Sets if the UX element is selected or not.
     * @param {boolean} selected
     * Default: false
     */
    set ezSelected(selected = false) {
        this.#ezSelected = EzBoolean.booleanOrFalse(selected);
    }

    /**
     * @private @field
     * Stores the state modified callback function reference
     * @type {function}
     */
    #ezStateModifiedCallback = null;
    /**
     * @public @property @getter
     * Gets the state modified callback function reference
     * @returns {function}
     */
    get ezStateModifiedCallback() {
        return this.#ezStateModifiedCallback;
    }
    /**
     * @public @property @setter
     * Sets the state modified callback function reference
     * @param {function} ezRemove
     * Default: false
     */
    set ezStateModifiedCallback(ezStateModifiedCallback) {
        this.#ezStateModifiedCallback = EzFunction.functionOrNull(ezStateModifiedCallback);
    }

    /**
     * @private @field
     * Stores the hint to apply to the element if is enabled.
     * If the hint is null, no change is made to the current hint.
     * @type {string}
     */
    #ezEnabledHint = null;
    /**
     * @public @property @getter
     * Gets
     * @returns {null|string}
     */
    get ezEnabledHint() {
        return this.#ezEnabledHint;
    }
    /**
     * @public @property @setter
     * Sets
     * @param {undefined|nul|string} ezEnabledHint
     * Default: false
     */
    set ezEnabledHint(ezEnabledHint) {
        this.#ezEnabledHint = EzString.stringOrNull(ezEnabledHint);
    }

    /**
     * @private @field
     * Stores the hint to apply to the element if is disabled.
     * If the hint is null, no change is made to the current hint.
     * @type {string}
     */
    #ezDisabledHint = null;
    /**
     * @public @property @getter
     * Gets
     * @returns {null|string}
     */
    get ezDisabledHint() {
        return this.#ezDisabledHint;
    }
    /**
     * @public @property @setter
     * Sets
     * @param {undefined|nul|string} ezDisabledHint
     * Default: false
     */
    set ezDisabledHint(ezDisabledHint) {
        this.#ezDisabledHint = EzString.stringOrNull(ezDisabledHint);
    }

    /**
        @public @method
     * If the ezStateModifiedCallback is assigned a valid function, this method
     * will call that function passing the provided parameters.
     * @param {string} stateName
     * @param {*} oldValue
     * @param {*} newValue
     * @returns {object}
     * Returns an object with the following properties:
     * {
     *     elementId: this.ezElementId,
     *     stateName: stateName,
     *     oldValue: oldValue,
     *     newValue: newValue
     * }
     */
    triggerStateModified(stateName, newState) {
        if (!EzString.stringHasLength(stateName)) {
            throw new EzBadParamException(
                'stateName',
                this,
                this.triggerStateModified);
        }

        if (EzFunction.isFunction(this.ezStateModifiedCallback)) {
            this.ezStateModifiedCallback({
                elementId: this.ezElementId,
                stateName: stateName,
                newState: newState
            });
        }
    }

    /**
     * @override
     * @public @readonly @property
     * Returns this instance as a JSON Object (will no longer have the getter/setter methods).
     * Useful for serailization to JSON.
     * @returns {object}
     */
    get asJSONObject() {
        return {
            ezVisible: this.ezVisible,
            ezEnable: this.ezEnable,
            ezRemove: this.ezRemove
        };
    }
}

