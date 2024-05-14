import {
    EzBadParamException
} from '/ezlibrary/exceptions/EzExceptions.js';

import {
    EzString
} from '/ezlibrary/helpers/EzHelpers.js';

/**
    @class
    @description
    Represents the configuration of a jQueryUI dialog
    ---------------------------------------------------------------------------
    Import with:
        import { EzDialogConfig } from '/ezlibrary/ux/dialogs/EzDialogConfig.js';
    ---------------------------------------------------------------------------
 */
export class EzDialogConfig {
    static get DEFAULT_DIALOG_SHOW_CONFIG() {
        return {
            effect: 'drop',
            direction: 'up',
            duration: 200
        };
    }

    static get DEFAULT_DIALOG_HIDE_CONFIG() {
        return EzDialogConfig.DEFAULT_DIALOG_SHOW_CONFIG;
    }

    static get DEFAULT_DIALOG_POSITION_CONFIG() {
        return {
            my: 'center',
            at: 'center',
            of: window,
            collision: 'fit'
        };
    }

    /**
        @public @construtor
        Creates a new instance of EzDialogConfig
        @param {string} dialogId
     */
    constructor(dialogId) {
        if (!EzString.stringHasLength(dialogId)) {
            throw new EzBadParamException(
                'dialogId',
                this,
                this.constructor);
        }

        this.ezDialogId = dialogId;
    }

    /**
        @public @field
        @type {string}
     */
    ezDialogId = null;

    /**
        @public @field
        @type {string}
     */
    title = 'EzClocker Message';

    /**
        @public @field
        Class ez-dialog-shadow located in ez-shadows.css
        @type {string}
     */
    dialogClass = 'ez-dialog-shadow';

    /**
        @public @field
        @type {boolean}
     */
    closeOnEscape = true;

    /**
        @public @field
        @type {boolean}
     */
    autoOpen = false;

    /**
        @public @field
        @type {boolean}
     */
    modal = true;

    /**
        @public @field
        @type {object}
     */
    show = EzDialogConfig.DEFAULT_DIALOG_SHOW_CONFIG;

    /**
        @public @field
        @type {object}
     */
    hide = EzDialogConfig.DEFAULT_DIALOG_HIDE_CONFIG;

    /**
        @public @field
        @type {object}
     */
    position = EzDialogConfig.DEFAULT_DIALOG_POSITION_CONFIG;

    /**
        @public @field
        @type {boolean}
     */
    resizable = false;

    /**
        @public @field
        @type {'auto'|number}
     */
    width = 500;

    /**
        @public @field
        @type {'auto'|number|null|undefined}
     */
    height = 'auto';

    /**
        @public @field
        @type {string}
     */
    focus = null;

    /**
        @public @field
        @type {array}
     */
    buttons = [];

    /**
        @public @field
        Stores the dialog's optional icon url.
        Note: Icon will only render 'auto-magicly' if using EzDialog to build the dialog. Otherwise
        if the dialog's implementation does not support the icon, it is ignored.
        @type {undefined|null|string}
     */
    ezDialogIconUrl = '';

    /**
        @public @field
        Stores the dialogs content HTML
        If not using EzDialog as the dialog class and the implementation of the dialog
        does not support the ezDialgoContentHtml then it is ignored.
        Default is: ''
        @type {string}
     */
    ezDialogContentHtml = '';
}
