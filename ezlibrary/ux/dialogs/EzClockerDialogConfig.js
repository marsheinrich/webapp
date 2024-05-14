import { EzObject } from '/ezlibrary/helpers/EzObject.js';
import { EzBoolean } from '/ezlibrary/helpers/EzBoolean.js';
import { EzNumber } from '/ezlibrary/helpers/EzNumber.js';
import { EzString } from '/ezlibrary/helpers/EzString.js';
import { EzArray } from '/ezlibrary/helpers/EzArray.js';
import { EzFunction } from '/ezlibrary/helpers/EzFunction.js';

import { EzDateTime } from '/public/javascript/common/ez-date-time.js'

import { EzEventEngine } from '/ezlibrary/ez-event-engine.js';

import { EzJSONSerializable } from '/ezlibrary/entities/EzJSONSerializable.js';

import { EzUI } from '/public/javascript/common/ezui.js';

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// DO NOT IMPORT THE FOLLOWING INTO THIS FILE:
//  * EzDialog: import { EzDialog } from '/public/javascript/common/ezclocker-dialog-helper.js';
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

/**
    @class
    @extends {EzJSONSerializable}
    @description
    Represents the configuration of a jQueryUI dialog.
    See JQuery UI Dialog documentation for more information:
    https://api.jqueryui.com/dialog/
    ---------------------------------------------------------------------------
    Requires: JQuery UI Dialog imports
    ---------------------------------------------------------------------------
    Import with:
        import { EzDialogConfig } from '/ezlibrary/ux/dialogs/EzDialogConfig.js';
    ---------------------------------------------------------------------------
    @deprecated
    NOT READY
    DO NOT USE THIS CLASS, USE EzDialogConfig.js instead
 */
export class EzClockerDialogConfig extends EzJSONSerializable {
    /**
        @static
        @public @readonly @property
        Returns ezClocker's default for the JQuery UI dialog's hide property
        @return {object}
     */
    static DEFAULT_DIALOG_HIDE_PROPERTY() {
        return JSON.parse('{"effect":"drop","direction":"up","duration":200}');
    }

    /**
        @static
        @public @readonly @property
        Returns ezClocker's default for the JQuery UI dialog's show property
        @return {object}
     */
    static DEFAULT_DIALOG_SHOW_PROPERTY() {
        return JSON.parse('{"effect":"drop","direction":"up","duration":200}');
    }

    /**
        @static
        @public @readonly @property
        Returns ezClocker's default for the JQuery UI dialog's position property
        @return {object}
     */
    static get DEFAULT_DIALOG_POSITION_PROPERTY() {
        return JSON.parse('{"my":"center","at":"center","of":"window","collision":"fit"}');
    }

    /**
        @static
        @public @readonly @property
        Returns ezClocker's default for the JQuery UI dialog's classes property
        @return {object}
     */
    static get DEFAULT_DIALOG_CLASSES_PROPERTY() {
        return JSON.parse('{"ui-dialog":"ui-corner-all","ui-dialog-titlebar":"ui-corner-all"}');
    }

    /**
        @static
        @public @readonly @property
         Returns ezClocker's default for the JQuery UI dialog's width property
        @return {object}
     */
    static get DEFAULT_DIALOG_WIDTH_PROPERTY() {
        return 500;
    }

    /**
        @static
        @public @readonly @property
         Returns ezClocker's default for the JQuery UI dialog's height property
        @return {object}
     */
    static get DEFAULT_DIALOG_HEIGHT_PROPERTY() {
        return 'auto';
    }

    /**
        @public @construtor
        Creates a new instance of EzDialogConfig
        @param {undefined|null|string} dialogId
        @param {string} title
        Default: 'EzClocker Message'
        @param {string} contentHtml
        Default: '',
        @param {string} iconUrl
        Default: ''
     */
    constructor(dialogId, title, contentHtml, iconUrl) {
        super();

        if (!EzObject.hasOwnProperty(globalThis, 'ezApi') || !EzObject.isValid(globalThis.ezApi.ezclocker)) {
            ezApi.ezclocker.ezLogger.error('Contruction of EzDialogConfig requires ezApi.');
        }
        if (!EzObject.isValid(globalThis.ezApi.ezclocker[EzDateTime.ezApiName])) {
            ezApi.ezclocker.ezLogger.error('Contruction of EzDialogConfig requires EzDateTime import.');
        }
        if (!EzObject.isValid(globalThis.ezApi.ezclocker[EzUI.ezApiName])) {
            ezApi.ezclocker.ezLogger.error('Contruction of EzDialogConfig requires EzUI import.');
        }
        if (!EzObject.isValid(globalThis.ezApi.ezclocker[EzEventEngine.ezApiName])) {
            ezApi.ezclocker.ezLogger.error('Contruction of EzDialogConfig requires EzEventEngine import.');
        }

        this.#ezDialogId = EzString.stringOrDefault(
            dialogId,
            `EzDialog_${ezApi.ezclocker.ezDateTime.ezGetNowUTCUnixMSTimeStamp()}`);

        this.#title = EzString.stringOrDefault(title, 'EzClocker Message');

        this.#ezDialogContentHtml = EzString.stringOrEmpty(contentHtml);

        this.#ezDialogIconUrl = EzString.stringOrEmpty(iconUrl);

        this.#buttons = [
            {
                id: `${dialogId}_OkButton`,
                text: 'OK',
                click: () => this.ezDefaultDialogButtonClickHandler.apply(this)
            }
        ];

        this.ezRegisterEzDialogConfigEvents();
    }

    /**
        @public @readonly @property
        Returns this configuration as a simple JSON object for use as a JQuery UI dialog
        configuration.
        @returns {string}
     */
    get asJQueryUIDialogConfig() {
        return JSON.parse(this.asJSON);
    }

    /**
        @private @field
        Stores the ezDialogId assigned to this EzDialogConfig instance.
        @type {string}
     */
    #ezDialogId = null;

    /**
        @public @getter @property
        Gets the ezDialogId assigned to this EzDialogConfig instance.
        Default is: `EzDialog_${ezApi.ezclocker.ezDateTime.ezGetNowUTCUnixMSTimeStamp()}`
        @returns {string}
     */
    get ezDialogId() {
        return this.#ezDialogId;
    }

    /**
        @public @setter @property
        Sets the ezDialogId assigned to this EzDialogConfig instance.
        If the aDialogId is undefined or null then a default dialog id is assigned using template:
        `EzDialog_${ezApi.ezclocker.ezDateTime.ezGetNowUTCUnixMSTimeStamp()}`
        @param {string|null|undefined} dialogId
     */
    set ezDialogId(dialogId) {
        let original = this.#ezDialogId;

        this.#ezDialogId = ezApi.ezStringHasLength(dialogId)
            ? dialogId
            : `EzDialog_${ezApi.ezclocker.ezDateTime.ezGetNowUTCUnixMSTimeStamp()}`;

        if (this.#ezDialogId !== original) {
            this.ezTriggerEzDialgoConfigUpdatedEvent({
                ezDialogId: this.#ezDialogId,
                ezEventNames: this.ezEventNames
            });

            // Update to new event
            this.ezUnregisterEzDialogConfigEvents();
            this.ezRegisterConfigurationUpdatedEvent();
        }
    }

    /**
        @public @readonly @property
        Gets the object of even names of fired by EzDialogConfig.
        @returns {object}
     */
    get ezEventNames() {
        return {
            onEzDialogConfigUpdated: `EzOn_${this.ezDialogId}_EzDialogConfig_Updated`
        }
    }

    /**
        @private @field
        Stores which element the dialog (and overlay, if modal) should be appended to.
        NOTE: The appendTo option should not be changed while the dialog is open.
        Default: 'body'
        @type {string}
     */
    #appendTo = 'body';

    /**
        @public @property @getter
        Gets which element the dialog (and overlay, if modal) should be appended to.
        NOTE: The appendTo option should not be changed while the dialog is open.
        @returns {string}
     */
    get appendTo() {
        return this.#appendTo;
    }

    /**
        @public @property @getter
        Sets which element the dialog (and overlay, if modal) should be appended to.
        NOTE: The appendTo option should not be changed while the dialog is open.
        If appendTo is undefined or null, then 'body' is assigned.
        @param {string} appendTo
     */
    set appendTo(appendTo) {
        if (EzBoolean.isTrue(ezApi.ezclocker.ezUi.ezId(this.ezDialogId).dialog('isOpen'))) {
            // Cannot set this value when the dialog is open
            return;
        }

        let original = this.#appendTo;

        this.#appendTo = EzString.stringOrDefault(
            appendTo,
            'body');

        if (this.#appendTo !== original) {
            this.ezTriggerEzDialgoConfigUpdatedEvent({
                appendTo: this.#appendTo
            });
        }
    }

    /**
        @private @field
        Stores the dialog's classes option.
        Specify additional classes to add to the widget's elements.
        Any of classes specified in the Theming section can be used as keys to override their value.
        Default: EzDialogConfig.DEFAULT_DIALOG_CLASSES_PROPERTY
        @type {string}
     */
    #classes = EzDialogConfig.DEFAULT_DIALOG_CLASSES_PROPERTY;

    /**
        @public @property @getter
        Gets the dialogs classes option
        Specify additional classes to add to the widget's elements.
        Any of classes specified in the Theming section can be used as keys to override their value.
        @returns {string}
     */
    get classes() {
        return this.#classes;
    }

    /**
        @public @property @getter
        Sets the dialogs classes option
        Specify additional classes to add to the widget's elements.
        Any of classes specified in the Theming section can be used as keys to override their value.
        If classes is undefined or null, then the EzDialogConfig.DEFAULT_DIALOG_CLASSES_PROPERTY is assigned.
        @param {undefined|null|string} classes
     */
    set classes(classes) {
        let original = this.#classes;

        this.#classes = EzString.stringOrDefault(
            classes,
            EzDialogConfig.DEFAULT_DIALOG_CLASSES_PROPERTY);

        if (this.#classes !== original) {
            this.ezTriggerEzDialgoConfigUpdatedEvent({
                classes: this.#classes
            });
        }
    }

    /**
        @private @field
        Stores the dialog's closeText option.
        Specifies the text for the close button. Note that the close text is visibly hidden when using a standard theme.
        Default: 'close'
        @type {string}
     */
    #closeText = 'close';

    /**
        @public @property @getter
        Gets the dialogs closeText option
        Specifies the text for the close button. Note that the close text is visibly hidden when using a standard theme.
        @returns {string}
     */
    get closeText() {
        return this.#closeText;
    }

    /**
        @public @property @getter
        Sets the dialogs closeText option
        Specifies the text for the close button. Note that the close text is visibly hidden when using a standard theme.
        If closeTExt is undefined or null the 'close' is assigned.
        @param {undefined|null|string} closeText
     */
    set appendTo(closeText) {
        let original = this.#closeText;

        this.#closeText = EzString.stringOrDefault(
            closeText,
            'close');

        if (this.#closeText !== original) {
            this.ezTriggerEzDialgoConfigUpdatedEvent({
                appendTo: this.#closeText
            });
        }
    }

    /**
        @private @field
        Stores the dialog's draggable option.
        If true, the dialog will be draggable by the title bar.
        NOTE: Requires the jQuery UI Draggable widget to be included.
        Default: true
        @type {boolean}
     */
    #draggable = true;

    /**
        @public @property @getter
        Gets the dialogs draggable option
        If true, the dialog will be draggable by the title bar.
        NOTE: Requires the jQuery UI Draggable widget to be included.
        @returns {boolean}
     */
    get draggable() {
        return this.#draggable;
    }

    /**
        @public @property @getter
        Sets the dialogs draggable option
        If true, the dialog will be draggable by the title bar.
        NOTE: Requires the jQuery UI Draggable widget to be included.
        If the draggable param is undefined or null then true is assigned.
        @param {boolean} draggable
     */
    set draggable(draggable) {
        let original = this.#draggable;

        this.#draggable = draggable;

        if (this.#draggable !== original) {
            this.ezTriggerEzDialgoConfigUpdatedEvent({
                draggable: this.#draggable
            });
        }
    }

    /**
        @private @field
        Stores the dialog's maxHeight option.
        Default: false (no max height)
        @type {boolean|string}
     */
    #maxHeight = false;

    /**
        @public @property @getter
        Gets the dialogs maxHeight option
        @returns {boolean|string}
     */
    get appendTo() {
        return this.#maxHeight;
    }

    /**
        @public @property @getter
        Sets the dialogs maxHeight option
        If maxHeight is null or undefined, then the default value of false (no max height) is assigned.
        Note: True cannot be assigned
        @param {boolean|string} maxHeight
     */
    set maxHeight(maxHeight) {
        let original = this.#maxHeight;

        this.#maxHeight = maxHeight;

        if (this.#maxHeight !== original) {
            this.ezTriggerEzDialgoConfigUpdatedEvent({
                maxHeight: this.#maxHeight
            });
        }
    }

    /**
        @private @field
        Stores the dialog's maxWidth option.
        Default: false
        @type {boolean|number}
     */
    #maxWidth = false;

    /**
        @public @property @getter
        Gets the dialogs maxWidth option
        @returns {boolean|number}
     */
    get maxWidth() {
        return this.#maxWidth;
    }

    /**
        @public @property @getter
        Sets the dialogs maxWidth option
        If the maxWidth is undefined or null, the false (no max width) is assigned.
        NOTE: True cannot be assigned.
        @param {boolean|number} maxWidth
     */
    set maxWidth(maxWidth) {
        let original = this.#maxWidth;

        this.#maxWidth = EzNumber.numberOrDefault(maxWidth, false);

        if (this.#maxWidth !== original) {
            this.ezTriggerEzDialgoConfigUpdatedEvent({
                maxWidth: this.#maxWidth
            });
        }
    }

    /**
        @private @field
        Stores the dialog's maxWidth option.
        Default: 150
        @type {string}
     */
    #minHeight = null;

    /**
        @public @property @getter
        Gets the dialogs minHeight option
        @returns {number}
     */
    get minHeight() {
        return this.#minHeight;
    }

    /**
        @public @property @getter
        Sets the dialogs minHeight option
        If the maxWidth param is undefined or null, then 150 is assigned.
        @param {undefined|null|number} maxWidth
     */
    set minHeight(minHeight) {
        let original = this.#minHeight;

        this.#minHeight = EzEnumber.numberOrDefault(minHeight, 150);

        if (this.#minHeight !== original) {
            this.ezTriggerEzDialgoConfigUpdatedEvent({
                minHeight: this.#minHeight
            });
        }
    }

    /**
        @private @field
        Stores the dialog's minWidth option.
        Default: 150
        @type {number}
     */
    #minWidth = null;

    /**
        @public @property @getter
        Gets the dialogs minWidth option
        @returns {number}
     */
    get minWidth() {
        return this.#minWidth;
    }

    /**
        @public @property @getter
        Sets the dialogs minWidth option
        If the minWidth is undefined or null, then 150 is assigned.
        @param {undefined|null|number} minWidth
     */
    set minWidth(minWidth) {
        let original = this.#minWidth;

        this.#minWidth = EzNumber.numberOrDefault(minWidth, 150);

        if (this.#minWidth !== original) {
            this.ezTriggerEzDialgoConfigUpdatedEvent({
                minWidth: this.#minWidth
            });
        }
    }

    /**
        @private @field
        Stores if the dialog will destroy upon close as well.
        Default: false
        @type {boolean}
     */
    #ezDestroyOnClose = false;

    /**
        @public @property @getter
        @returns {boolean}
     */
    get ezDestroyOnClose() {
        return this.#ezDestroyOnClose;
    }

    /**
        @public @property @setter
        @param {boolean} destroyOnClose
     */
    set ezDestroyOnClose(destroyOnClose) {
        let original = this.#ezDestroyOnClose;

        this.#ezDestroyOnClose = EzBoolean.booleanOrFalse(destroyOnClose);

        if (this.#ezDestroyOnClose !== original) {
            this.ezTriggerEzDialgoConfigUpdatedEvent({
                ezDestroyOnClose: this.#ezDestroyOnClose
            });
        }
    }

    /**
        @public @field
        Stores the title for the dialog
        Defualt: 'EzClocker Message'
        @type {string}
     */
    #title = 'EzClocker Message';

    /**
        @public @property @getter
        Gets the title for the dialog
        @returns {string}
     */
    get title() {
        return this.#title;
    }

    /**
        @public @property @setter
        Sets the title for the dialog
        @param {string} title
     */
    set title(title) {
        let original = this.#title;

        this.#title = EzString.stringOrDefault(
            title,
            'EzClocker Message');

        if (this.#title !== original) {
            this.ezTriggerEzDialgoConfigUpdatedEvent({
                title: this.#title
            });
        }
    }

    /**
        @public @field
        Stores the dialog's CSS class
        Class ez-dialog-shadow located in ez-shadows.css
        Default: 'ez-dialog-shadow'
        @type {string}
     */
    #dialogClass = 'ez-dialog-shadow';

    /**
        @public @property @getter
        Gets the dialog's CSS class
        @returns {string}
     */
    get dialogClass() {
        return this.#dialogClass;
    }

    /**
        @public @property @setter
        Sets the dialog's CSS class
        If the provided dialogClass is undefined or null then 'ez-dialog-shadow' is assigned.
        @param {string} dialogClass
     */
    set dialogClass(dialogClass) {
        let original = this.#dialogClass;

        this.#dialogClass = EzString.stringOrDefault(
            dialogClass,
            'ez-dialog-shadow');

        if (this.#dialogClass !== original) {
            this.ezTriggerEzDialgoConfigUpdatedEvent({
                dialogClass: this.#dialogClass
            });
        }
    }

    /**
        @public @field
        Stores if the dialog should close when the user presses the escape key.
        Default: true
        @type {boolean}
     */
    #closeOnEscape = true;

    /**
        @public @property @getter
        Gets if the dialog should close when the user presses the escape key.
        @returns {boolean}
     */
    get closeOnEscape() {
        return this.#closeOnEscape;
    }

    /**
        @public @property @setter
        Sets if the dialog should close when the user presses the escape key.
        If the provided closeOnEscape is undefined or null then True is assigned.
        @param {boolean} closeOnEscape
     */
    set closeOnEscape(closeOnEscape) {
        let original = this.#closeOnEscape;

        this.#closeOnEscape = EzBoolean.booleanOrTrue(closeOnEscape);

        if (this.#closeOnEscape !== original) {
            this.ezTriggerEzDialgoConfigUpdatedEvent({
                closeOnEscape: this.#closeOnEscape
            });
        }
    }

    /**
        @public @field
        Stores if the dialog's autoOpen option
        If true, the dialog will automatically open upon initialization.
        If false, the dialog will stay hidden until the open() method is called
        Default: false
        @type {boolean}
     */
    #autoOpen = false;

    /**
        @public @property @getter
        Gets if the dialog should auto-open or not.
        If true, the dialog will automatically open upon initialization.
        If false, the dialog will stay hidden until the open() method is called
        @returns {boolean}
     */
    get autoOpen() {
        return this.#autoOpen;
    }

    /**
        @public @property @setter
        Sets if the dialog should auto-open or not.
        If set to true, the dialog will automatically open upon initialization.
        If false, the dialog will stay hidden until the open() method is called
        If the provdied autoOpen param is undefined or null then false is assigned.
        @param {boolean} autoOpen
     */
    set autoOpen(autoOpen) {
        let original = this.#autoOpen;

        this.#autoOpen = EzBoolean.booleanOrFalse(autoOpen);

        if (this.#autoOpen !== original) {
            this.ezTriggerEzDialgoConfigUpdatedEvent({
                autoOpen: this.#autoOpen
            });
        }
    }

    /**
        @public @field
        Stores if the dialog is modal or not.
        Defualt: true
        @type {boolean}
     */
    #modal = true;

    /**
        @public @property @getter
        Gets if the dialog is modal or not.
        @returns {boolean}
     */
    get modal() {
        return this.#modal;
    }

    /**
        @public @property @setter
        Sets if the dialog is modal or not.
        If the provided model param is undefined or null then true is assigned.
        @param {boolean} modal
     */
    set modal(modal) {
        let original = this.#modal;

        this.#modal = EzBoolean.booleanOrTrue(modal);

        if (this.#modal !== original) {
            this.ezTriggerEzDialgoConfigUpdatedEvent({
                modal: this.#modal
            });
        }
    }

    /**
        @public @field
        Stores the dialog's show setting.
        Default: EzDialogConfig.DEFAULT_DIALOG_SHOW_PROPERTY
        @type {object}
     */
    #show = EzDialogConfig.DEFAULT_DIALOG_SHOW_PROPERTY;

    /**
        @public @property @getter
        Gets the dialog's show setting.
        @returns {boolean|number|string|object}
     */
    get show() {
        return this.#show;
    }

    /**
        @public @property @setter
        Sets the dialog's show setting.
        If the show param type is:
            * Boolean
                When set to false, no animation will be used and the dialog will be shown immediately.
                When set to true, the dialog will fade in with the default duration and the default easing.
            * Number
                The dialog will fade in with the specified duration and the default easing.
            * String
                The dialog will be shown using the specified effect.
                The value can either be the name of a built-in jQuery animation method,
                such as "slideDown", or the name of a jQuery UI effect, such as "fold".
                In either case the effect will be used with the default duration and the default easing.
            * Object:
                The expected object template: {
                    effect: {string},
                    delay: {number},
                    duration: {number},
                    easing: {string}
                }
                Then effect, delay, duration, and easing properties may be provided.
                If the effect property contains the name of a jQuery method, then that method will be used;
                otherwise it is assumed to be the name of a jQuery UI effect. When using a jQuery UI effect that
                supports additional settings, you may include those settings in the object and they will be
                passed to the effect. If duration or easing is omitted, then the default values will be used.
                If effect is omitted, then "fadeIn" will be used. If delay is omitted, then no delay is used.
            If the show param is undefined or null then EzDialogConfig.DEFAULT_DIALOG_SHOW_PROPERTY (object) is assigned.
        @param {boolean|number|string|object} show
     */
    set show(show) {
        let original = this.#show;

        this.#show = EzBoolean.isBoolean(show) || EzNumber.isNumber(show)
            ? show
            : EzObject.assignOrDefault(
                show,
                EzDialogConfig.DEFAULT_DIALOG_SHOW_PROPERTY);

        if ((EzBoolean.isBoolean(this.#show) && !EzBoolean.isBoolean(original)) ||
            (!EzBoolean.isBoolean(this.#show) && EzBoolean.isBoolean(original)) ||
            (EzBoolean.isBoolean(this.#show) && EzBoolean.isBoolean(original) && original != this.#show) ||
            (EzBoolean.isNumber(this.#show) && !EzBoolean.isNumber(original)) ||
            (!EzBoolean.isNumber(this.#show) && EzBoolean.isNumber(original)) ||
            (EzBoolean.isNumber(this.#show) && EzBoolean.isNumber(original) && this.#show != original) ||
            ezApi.ezToJson(original) !== ezApi.ezToJson(this.#show)) {
            this.ezTriggerEzDialgoConfigUpdatedEvent({
                show: this.#show
            });
        }
    }

    /**
        @public @field
        Stores the dialog's hide setting.
        Default: EzDialgoConfig.DEFAULT_DIALOG_HIDE_PROPERTY
        @type {boolean|number|string|object}
     */
    #hide = EzDialogConfig.DEFAULT_DIALOG_HIDE_PROPERTY;

    /**
        @public @property @getter
        Gets the dialog's hide setting.
        @returns {boolean|number|string|object}
     */
    get hide() {
        return this.#hide;
    }

    /**
        @public @property @setter
        Sets the dialog's hide setting.
        If the provided hide param is undefined or null then EzDialogConfig.DEFAULT_DIALOG_HIDE_PROPERTY is assigned.
        @param {undefined|null|boolean|number|string|object} hide
     */
    set hide(hide) {
        let original = this.#hide;

        this.#hide = EzBoolean.isBoolean(hide) || EzNumber.isNumber(hide)
            ? hide
            : EzObject.assignOrDefault(
                hide,
                EzDialogConfig.DEFAULT_DIALOG_HIDE_PROPERTY);

        if ((EzBoolean.isBoolean(this.#hide) && !EzBoolean.isBoolean(original)) ||
            (!EzBoolean.isBoolean(this.#hide) && EzBoolean.isBoolean(original)) ||
            (EzBoolean.isBoolean(this.#hide) && EzBoolean.isBoolean(original) && this.#hide != original) ||
            (EzBoolean.isNumber(this.#hide) && !EzBoolean.isNumber(original)) ||
            (!EzBoolean.isNumber(this.#hide) && EzBoolean.isNumber(original)) ||
            (EzBoolean.isNumber(this.#hide) && EzBoolean.isNumber(original) && this.#hide != original) ||
            ezApi.ezToJson(original) !== ezApi.ezToJson(this.#hide)) {
            this.ezTriggerEzDialgoConfigUpdatedEvent({
                hide: this.#hide
            });
        }
    }

    /**
        @public @field
        Stores the dialog's show position setting.
        Default: EzDialogConfig.DEFAULT_DIALOG_POSITION_PROPERTY
        @type {object}
     */
    #position = EzDialogConfig.DEFAULT_DIALOG_POSITION_PROPERTY;

    /**
        @public @property @getter
        Gets the dialog's show position setting.
        @returns {object}
     */
    get position() {
        return this.#position;
    }

    /**
        @public @property @setter
        Sets the dialog's show position setting.
        If the provided position param is undefined or null then EzDialogConfig.DEFAULT_DIALOG_POSITION_PROPERTY is assigned.
        @param {object} position
     */
    set position(position) {
        let original = this.#position;

        this.#position = EzObject.assignOrDefault(
            position,
            EzDialogConfig.DEFAULT_DIALOG_POSITION_PROPERTY);

        if (this.#position !== original) {
            this.ezTriggerEzDialgoConfigUpdatedEvent({
                position: this.#position
            });
        }
    }

    /**
        @public @field
        Stores if the dialog is resizeable or not.
        Default: false
        @type {boolean}
     */
    #resizable = false;

    /**
        @public @property @getter
        Gets if the dialog is resizeable or not.
        @returns {boolean}
     */
    get resizable() {
        return this.#resizable;
    }

    /**
        @public @property @setter
        Sets if the dialog is resizeable or not.
        If the resizeable param is null or undefined then false is assigned.
        @param {boolean} resizable
     */
    set resizable(resizable) {
        let original = this.#resizable;

        this.#resizable = EzBoolean.booleanOrFalse(resizable);

        if (this.#resizable !== original) {
            this.ezTriggerEzDialgoConfigUpdatedEvent({
                resizable: this.#resizable
            });
        }
    }

    /**
        @public @field
        Stores the dialogs initial width value.
        Default: EzDialogConfig.DEFAULT_DIALOG_WIDTH_PROPERTY
        @type {string|number}
     */
    #width = EzDialogConfig.DEFAULT_DIALOG_WIDTH_PROPERTY;

    /**
        @public @property @getter
        Gets the dialogs initial width value.
        @returns {string|number}
     */
    get width() {
        return this.#width;
    }

    /**
        @public @property @setter
        Sets the dialogs initial width value.
        If the provided width param is null or undefined then the EzDialogConfig.DEFAULT_DIALOG_WIDTH_PROPERTY is assigned.
        @param {undefiend|null|string|number} width
     */
    set width(width) {
        let original = this.#width;

        if (EzString.stringHasLength(width) || EzNumber.isNumber(width)) {
            this.#width = width;
        } else {
            this.#width = EzDialogConfig.DEFAULT_DIALOG_WIDTH_PROPERTY;
        }

        if (this.#width !== original) {
            this.ezTriggerEzDialgoConfigUpdatedEvent({
                width: this.#width
            });
        }
    }

    /**
        @public @field
        Stores the dialogs initial height value.
        Default: EzDialogConfig.DEFAULT_DIALOG_HEIGHT_PROPERTY
        @type {string|number}
     */
    #height = EzDialogConfig.DEFAULT_DIALOG_HEIGHT_PROPERTY;

    /**
        @public @property @getter
        Gets the dialogs initial height value.
        @returns {string|number}
     */
    get height() {
        return this.#height;
    }

    /**
        @public @property @setter
        Sets the dialogs initial height value.
        If the provided height param is null or undefined then the EzDialogConfig.DEFAULT_DIALOG_HEIGHT_PROPERTY is assigned.
        @param {undefiend|null|string|number} height
     */
    set height(height) {
        let original = this.#height;

        if (EzString.stringHasLength(height) || EzNumber.isNumber(height)) {
            this.#height = height;
        } else {
            this.#height = EzDialogConfig.DEFAULT_DIALOG_HEIGHT_PROPERTY;
        }

        if (this.height !== original) {
            this.ezTriggerEzDialgoConfigUpdatedEvent({
                height: this.height
            });
        }
    }

    /**
        @private @field
        Stores the dialog buttons configuration setting
        Default (before constructor): []
        Default (after constructor): [
            {
                id:`${dialogId}_OkButton`,
                text: 'OK',
                click: () => this.ezDefaultDialogButtonClickHandler.apply(this)
            }
        ];
        @type {object|array}
     */
    #buttons = [];

    /**
        @public @property @getter
        Sets the dialog buttons configuration setting
        @returns {object|array}
     */
    get buttons() {
        return this.#buttons;
    }

    /**
        @public @property @setter
        Gets the dialog buttons configuration setting
        If the provied buttons param is undefined or null then a default OK button is assigned:
        [
            {
                id:`${dialogId}_OkButton`,
                text: 'OK',
                click: () => this.ezDefaultDialogButtonClickHandler.apply(this)
            }
        ];
        @param {undefined|null|object|array} destroyOnClose
     */
    set buttons(buttons) {
        let original = this.#buttons;

        if (EzArray.isArray(buttons) || EzObject.isValid(buttons)) {
            this.#buttons = buttons;
        } else {
            this.#buttons = [{
                id: `${this.dialogId}_OkButton`,
                text: 'OK',
                click: () => this.ezDefaultDialogButtonClickHandler.apply(this)
            }];
        }

        if (this.#buttons !== original) {
            this.ezTriggerEzDialgoConfigUpdatedEvent({
                buttons: this.#buttons
            });
        }
    }

    /**
        @private @field
        Stores the custom title bar close button handler
        Default: null
        @type {function}
     */
    #ezCloseButtonHandler = null;

    /**
        @public @property @getter
        Gets the custom title bar close button handler
        Default: null
        @returns {null|function}
     */
    get ezCloseButtonHandler() {
        return this.#ezCloseButtonHandler;
    }

    /**
        @public @property @setter
        Sets the custom title bar close button handler
        If the provided closeButtonHandler is undefined or null then null is assigned.
        @param {undefined|null|function} closeButtonHandler
     */
    set ezCloseButtonHandler(closeButtonHandler) {
        let original = this.#ezCloseButtonHandler;

        this.#ezCloseButtonHandler = EzFunction.functionOrNull(closeButtonHandler);

        if ((!EzFunction.isFunction(this.#ezCloseButtonHandler) && Function.isFunction(original)) ||
            (EzFunction.isFunction(this.#ezCloseButtonHandler) && !Function.isFunction(original)) ||
            (EzFunction.isFunction(this.#ezCloseButtonHandler) && EzFunction.isFunction(closeButtonHandler) &&
                this.#ezCloseButtonHandler !== original)) {
            this.ezTriggerEzDialgoConfigUpdatedEvent({
                buttoezCloseButtonHandlerns: this.#ezCloseButtonHandler
            });
        }
    }

    /**
        @private @field
        Stores the dialog's optional icon url.
        Note: Icon will only render 'auto-magicly' if using EzDialog to build the dialog. Otherwise
        if the dialog's implementation does not support the icon, it is ignored.
        @type {undefined|null|string}
     */
    #ezDialogIconUrl = null;

    /**
        @public @property @getter
        Gets the dialog's optional icon url.
        @returns {undefined|null|string}
     */
    get ezDialogIconUrl() {
        return this.#ezDialogIconUrl;
    }

    /**
        @public @property @setter
        Sets the dialog's optional icon url.
        @param {undefined|null|string} iconUrl
     */
    set ezDialogIconUrl(iconUrl) {
        let original = this.#ezDialogIconUrl;

        this.#ezDialogIconUrl = EzString.stringOrNull(iconUrl);

        if (this.#ezDialogIconUrl !== original) {
            this.ezTriggerEzDialgoConfigUpdatedEvent({
                ezDialogIconUrl: this.#ezDialogIconUrl
            });
        }
    }

    /**
        @private @field
        Stores the dialogs content HTML
        NOTE: If not using EzDialog as the dialog class and the implementation of the dialog
        does not support the ezDialgoContentHtml then it is ignored.
        Default is: ''
        @type {string}
     */
    #ezDialogContentHtml = '';

    /**
        @public @property @getter
        Gets the dialogs content HTML
        Default is: ''
        @returns {undefined|null|string}
     */
    get ezDialogContentHtml() {
        return this.#ezDialogContentHtml;
    }

    /**
        @public @property @setter
        Sets the dialogs content HTML
        If the provided dialogContentHtml is undefined or null then an empty string is assigned.
        @param {undefined|null|string} dialogContentHtml
     */
    set ezDialogContentHtml(dialogContentHtml) {
        let original = ezDialogContentHtml;

        this.#ezDialogContentHtml = EzString.stringOrEmpty(dialogContentHtml);

        if (this.#ezDialogContentHtml !== original) {
            this.ezTriggerEzDialgoConfigUpdatedEvent({
                ezDialogContentHtml: this.#ezDialogContentHtml
            });
        }
    }

    /**
        @private @field
        Stores the beforeClose event handler function for the dialog. Called when the top right X button is clicked.
        Default is: null
        @type {function}
     */
    #beforeClose = null;

    /**
        @public @property @getter
        Gets the beforeClose event handler function for the dialog. Called when the top right X button is clicked.
        @returns {function}
     */
    get beforeClose() {
        return this.#beforeClose;
    }

    /**
        @public @property @setter
        Sets the beforeClose event handler function for the dialog. Called when the top right X button is clicked.
        If the provided handler is undeinfed or null then a simple close dialog handler is
        assigned.
        @param {undefined|null|function} handler
     */
    set beforeClose(handler) {
        let original = this.#beforeClose;

        this.#beforeClose = EzFunction.functionNull(handler);

        if ((EzFunction.isFunction(this.#beforeClose) && !EzFunction.isFunction(original)) ||
            (!EzFunction.isFunction(this.#beforeClose) && EzFunction.isFunction(original)) ||
            (EzFunction.isFunction(this.#beforeClose) && EzFunction.isFunction(original) &&
                this.#beforeClose != original)) {
            this.ezTriggerEzDialgoConfigUpdatedEvent({
                beforeClose: this.#beforeClose
            });
        }
    }

    /**
        @private @field
        Stores the close handler function for the dialog. Called when the top right X button is clicked.
        Default is: () => ezApi.ezclocker.ezUi.ezId(this.ezDialogId).dialog('close'));
        @type {function}
     */
    #close = null;

    /**
        @public @property @getter
        Gets the close handler function for the dialog. Called when the top right X button is clicked.
        @returns {function}
     */
    get close() {
        return EzFunction.functionOrDefault(
            this.#close,
            () => ezApi.ezclocker.ezUi.ezId(this.ezDialogId).dialog('close'));
    }

    /**
        @public @property @setter
        Sets the close handler function for the dialog. Called when the top right X button is clicked.
        If the provided handler is undeinfed or null then a simple close dialog handler is
        assigned.
        @param {undefined|null|function} closeHandler
     */
    set close(handler) {
        let original = this.#close;

        this.#close = EzFunction.functionOrDefault(
            handler,
            () => ezApi.ezclocker.ezUi.ezId(this.ezDialogId).dialog('close'));

        if ((EzFunction.isFunction(this.#close) && !EzFunction.isFunction(original)) ||
            (!EzFunction.isFunction(this.#close) && EzFunction.isFunction(original)) ||
            (EzFunction.isFunction(this.#close) && EzFunction.isFunction(original) &&
                this.#close != original)) {
            this.ezTriggerEzDialgoConfigUpdatedEvent({
                close: this.#close
            });
        }
    }

    /**
        @private @field
        Stores the beforeClose event handler function for the dialog. Called when the top right X button is clicked.
        Default is: null
        @type {function}
     */
    #create = null;

    /**
        @public @property @getter
        Gets the create event handler function for the dialog. Called when the top right X button is clicked.
        @returns {function}
     */
    get create() {
        return this.#resizeStop;
    }

    /**
        @public @property @setter
        Sets the create event handler function for the dialog. Called when the top right X button is clicked.
        If the provided handler is undeinfed or null then a simple close dialog handler is
        assigned.
        @param {undefined|null|function} handler
     */
    set resizeStop(handler) {
        let original = this.#create;

        this.#create = EzFunction.functionNull(handler);

        if ((EzFunction.isFunction(this.#create) && !EzFunction.isFunction(original)) ||
            (!EzFunction.isFunction(this.#create) && EzFunction.isFunction(original)) ||
            (EzFunction.isFunction(this.#create) && EzFunction.isFunction(original) &&
                this.#create != original)) {
            this.ezTriggerEzDialgoConfigUpdatedEvent({
                resizeStop: this.#resizeStop
            });
        }
    }

    /**
        @private @field
        Stores the beforeClose event handler function for the dialog. Called when the top right X button is clicked.
        Default is: null
        @type {function}
     */
    #drag = null;

    /**
        @public @property @getter
        Gets the resizeStop event handler function for the dialog. Called when the top right X button is clicked.
        @returns {function}
     */
    get drag() {
        return this.#drag;
    }

    /**
        @public @property @setter
        Sets the drag event handler function for the dialog. Called when the top right X button is clicked.
        If the provided handler is undeinfed or null then a simple close dialog handler is
        assigned.
        @param {undefined|null|function} handler
     */
    set drag(handler) {
        let original = this.#drag;

        this.#drag = EzFunction.functionNull(handler);

        if ((EzFunction.isFunction(this.#drag) && !EzFunction.isFunction(original)) ||
            (!EzFunction.isFunction(this.#drag) && EzFunction.isFunction(original)) ||
            (EzFunction.isFunction(this.#drag) && EzFunction.isFunction(original) &&
                this.#drag != original)) {
            this.ezTriggerEzDialgoConfigUpdatedEvent({
                drag: this.#drag
            });
        }
    }

    /**
        @private @field
        Stores the beforeClose event handler function for the dialog. Called when the top right X button is clicked.
        Default is: null
        @type {function}
     */
    #dragStart = null;

    /**
        @public @property @getter
        Gets the dragStart event handler function for the dialog. Called when the top right X button is clicked.
        @returns {function}
     */
    get dragStart() {
        return this.#dragStart;
    }

    /**
        @public @property @setter
        Sets the dragStart event handler function for the dialog. Called when the top right X button is clicked.
        If the provided handler is undeinfed or null then a simple close dialog handler is
        assigned.
        @param {undefined|null|function} handler
     */
    set dragStart(handler) {
        let original = this.#dragStart;

        this.#dragStart = EzFunction.functionNull(handler);

        if ((EzFunction.isFunction(this.#dragStart) && !EzFunction.isFunction(original)) ||
            (!EzFunction.isFunction(this.#dragStart) && EzFunction.isFunction(original)) ||
            (EzFunction.isFunction(this.#dragStart) && EzFunction.isFunction(original) &&
                this.#dragStart != original)) {
            this.ezTriggerEzDialgoConfigUpdatedEvent({
                dragStart: this.#dragStart
            });
        }
    }

    /**
        @private @field
        Stores the beforeClose event handler function for the dialog. Called when the top right X button is clicked.
        Default is: null
        @type {function}
     */
    #dragStop = null;

    /**
        @public @property @getter
        Gets the resizeStop event handler function for the dialog. Called when the top right X button is clicked.
        @returns {function}
     */
    get dragStop() {
        return this.#dragStop;
    }

    /**
        @public @property @setter
        Sets the dragStop event handler function for the dialog. Called when the top right X button is clicked.
        If the provided handler is undeinfed or null then a simple close dialog handler is
        assigned.
        @param {undefined|null|function} handler
     */
    set dragStop(handler) {
        let original = this.#dragStop;

        this.#dragStop = EzFunction.functionNull(handler);

        if ((EzFunction.isFunction(this.#dragStop) && !EzFunction.isFunction(original)) ||
            (!EzFunction.isFunction(this.#dragStop) && EzFunction.isFunction(original)) ||
            (EzFunction.isFunction(this.#dragStop) && EzFunction.isFunction(original) &&
                this.#dragStop != original)) {
            this.ezTriggerEzDialgoConfigUpdatedEvent({
                dragStop: this.#dragStop
            });
        }
    }

    /**
        @public @field
        Stores the optional event handler for when the dialog gains focus.
        Default: null
        @type {function}
     */
    #focus = null;

    /**
        @public @property @getter
        Gets the optional event handler for when the dialog gains focus.
        @returns {null|function}
     */
    get focus() {
        return this.#focus;
    }

    /**
        @public @property @setter
        Sets the handler event handler for when the dialog gains focus.
        If the provided handler param is undefined or null then null is assigned.
        @param {undefiend|null|function} handler
     */
    set focus(handler) {
        let original = this.#focus;

        this.#focus = EzString.stringOrNull(handler);

        if ((EzFunction.isFunction(this.#focus) && !EzFunction.isFunction(original)) ||
            (!EzFunction.isFunction(this.#focus) && EzFunction.isFunction(original)) ||
            (EzFunction.isFunction(this.#focus) && EzFunction.isFunction(original) &&
                this.#focus != original)) {
            this.ezTriggerEzDialgoConfigUpdatedEvent({
                dragStop: this.#focus
            });
        }
    }

    /**
        @private @field
        Stores the beforeClose event handler function for the dialog. Called when the top right X button is clicked.
        Default is: null
        @type {function}
     */
    #open = null;

    /**
        @public @property @getter
        Gets the open event handler function for the dialog. Called when the top right X button is clicked.
        @returns {function}
     */
    get open() {
        return this.#open;
    }

    /**
        @public @property @setter
        Sets the open event handler function for the dialog. Called when the top right X button is clicked.
        If the provided handler is undeinfed or null then a simple close dialog handler is
        assigned.
        @param {undefined|null|function} handler
     */
    set open(handler) {
        let original = this.#open;

        this.#open = EzFunction.functionNull(handler);

        if ((EzFunction.isFunction(this.#open) && !EzFunction.isFunction(original)) ||
            (!EzFunction.isFunction(this.#open) && EzFunction.isFunction(original)) ||
            (EzFunction.isFunction(this.#open) && EzFunction.isFunction(original) &&
                this.#open != original)) {
            this.ezTriggerEzDialgoConfigUpdatedEvent({
                resizeStop: this.#open
            });
        }
    }

    /**
        @private @field
        Stores the beforeClose event handler function for the dialog. Called when the top right X button is clicked.
        Default is: null
        @type {function}
     */
    #resize = null;

    /**
        @public @property @getter
        Gets the resize event handler function for the dialog. Called when the top right X button is clicked.
        @returns {function}
     */
    get resize() {
        return this.#resize;
    }

    /**
        @public @property @setter
        Sets the beforeClose event handler function for the dialog. Called when the top right X button is clicked.
        If the provided handler is undeinfed or null then a simple close dialog handler is
        assigned.
        @param {undefined|null|function} handler
     */
    set resize(handler) {
        let original = this.#resize;

        this.#resize = EzFunction.functionNull(handler);

        if ((EzFunction.isFunction(this.#resize) && !EzFunction.isFunction(original)) ||
            (!EzFunction.isFunction(this.#resize) && EzFunction.isFunction(original)) ||
            (EzFunction.isFunction(this.#resize) && EzFunction.isFunction(original) &&
                this.#resize != original)) {
            this.ezTriggerEzDialgoConfigUpdatedEvent({
                resizeStop: this.#resize
            });
        }
    }

    /**
        @private @field
        Stores the beforeClose event handler function for the dialog. Called when the top right X button is clicked.
        Default is: null
        @type {function}
     */
    #resizeStart = null;

    /**
        @public @property @getter
        Gets the resizeStop event handler function for the dialog. Called when the top right X button is clicked.
        @returns {function}
     */
    get resizeStart() {
        return this.#resizeStart;
    }

    /**
        @public @property @setter
        Sets the resizeStart event handler function for the dialog. Called when the top right X button is clicked.
        If the provided handler is undeinfed or null then a simple close dialog handler is
        assigned.
        @param {undefined|null|function} handler
     */
    set resizeStart(handler) {
        let original = this.#resizeStart;

        this.#resizeStart = EzFunction.functionNull(handler);

        if ((EzFunction.isFunction(this.#resizeStart) && !EzFunction.isFunction(original)) ||
            (!EzFunction.isFunction(this.#resizeStart) && EzFunction.isFunction(original)) ||
            (EzFunction.isFunction(this.#resizeStart) && EzFunction.isFunction(original) &&
                this.#resizeStart != original)) {
            this.ezTriggerEzDialgoConfigUpdatedEvent({
                resizeStart: this.#resizeStart
            });
        }
    }
    /**
        @private @field
        Stores the beforeClose event handler function for the dialog. Called when the top right X button is clicked.
        Default is: null
        @type {function}
     */
    #resizeStop = null;

    /**
        @public @property @getter
        Gets the resizeStop event handler function for the dialog. Called when the top right X button is clicked.
        @returns {function}
     */
    get resizeStop() {
        return this.#resizeStop;
    }

    /**
        @public @property @setter
        Sets the beforeClose event handler function for the dialog. Called when the top right X button is clicked.
        If the provided handler is undeinfed or null then a simple close dialog handler is
        assigned.
        @param {undefined|null|function} handler
     */
    set resizeStop(handler) {
        let original = this.#resizeStop;

        this.#resizeStop = EzFunction.functionNull(handler);

        if ((EzFunction.isFunction(this.#resizeStop) && !EzFunction.isFunction(original)) ||
            (!EzFunction.isFunction(this.#resizeStop) && EzFunction.isFunction(original)) ||
            (EzFunction.isFunction(this.#resizeStop) && EzFunction.isFunction(original) &&
                this.#resizeStop != original)) {
            this.ezTriggerEzDialgoConfigUpdatedEvent({
                resizeStop: this.#resizeStop
            });
        }
    }

    /**
        @protected @method
        Creates the names of all EzDialogConfig's events and registers the the events
        with the ezEventEngine.
     */
    ezRegisterEzDialogConfigEvents() {
        ezApi.ezclocker.ezEventEngine.ezRegisterEvent(
            this.ezDialogId,
            this.ezEventNames.onEzDialogConfigUpdated);
    }

    /**
        @protected @method
        Unregisters any current events for the EzDialogConfig (specific to the provided ezDialogId)
     */
    ezUnregisterEzDialogConfigEvents() {
        ezApi.ezclocker.ezEventEngine.ezUnregisterEvent(
            this.ezDialogId,
            this.ezEventNames.onEzDialogConfigUpdated);
    }

    /**
        @protected @method
        Triggers the OnEz_{dialogId}_EzDialgoConfig_Updated event.
        @param {object} changedProperties
        An object of key = property name and value = new property value
     */
    ezTriggerEzDialgoConfigUpdatedEvent(changedProperties) {
        ezApi.ezclocker.ezEventEngine.ezTriggerEvent(
            this.ezEventNames.onEzDialogConfigUpdated,
            ezApi.ezclocker.ezEventEngine.ezBuildEventData(
                this.ezDialogId,
                `EzDialgoConfig updated for dialog with dialogId=${this.ezDialogId}`,
                {
                    dialogId: this.ezDialogId,
                    updatedProperties: changedProperties,
                    ezDialogConfig: this
                }));
    }

    /**
        @protected @method
        A default click handler that will close the dialog.
        -------------------------------------------------------------
        >> IMPORTANT <<
        When assigning this method to a click handler it will need
        the associated EzDialgoConfig applied during the call:
            click: (event) => ezDialogConfig.ezDefaultDialogButtonClickHandler
                .apply(ezDialogConfig, [event])
        -------------------------------------------------------------
     */
    ezDefaultDialogButtonClickHandler() {
        if (EzBoolean.isTrue(this.ezDestroyOnClose)) {
            ezApi.ezclocker.ezUi.ezId(this.ezDialogId).dialog('close');
            ezApi.ezclocker.ezUi.ezId(this.ezDialogId).dialog('destroy');
        } else {
            ezApi.ezclocker.ezUi.ezId(this.ezDialogId).dialog('close');
        }
    }

    /**
        @public @method
        If the dialog exists then returns then calls the JQuery UI Dialog's close method and returns
        the result (if any)
        Otherwise, null is returned.
        -------------------------------------------------------------
        >>> IMPORTANT <<<
        Call this method in the following way to maintain the property this context:
            aEzDialogConfig.ezClose.apply(aEzDialogConfig);
        -------------------------------------------------------------
        @returns {null|*}
     */
    ezClose() {
        if (!ezApi.ezclocker.ezUi.ezElementExists(this.ezDialogId)) {
            return null;
        }

        return ezApi.ezclocker.ezUi.ezId(this.ezDialogId).dialog('close');
    }

    /**
        @public @method
        If the element associated with the dialog's id exists in the document:
            Returns the result of calling the JQuery UI Dialog's destroy() method that:
                Removes the dialog functionality completely, returning the element back to its pre-init state.
        Otherwise, null is returned.
        -------------------------------------------------------------
        >>> IMPORTANT <<<
        Call this method in the following way to maintain the property this context:
            aEzDialogConfig.ezDestroy.apply(aEzDialogConfig);
        -------------------------------------------------------------
        @returns {null|*}
     */
    ezDestroy() {
        if (!ezApi.ezclocker.ezUi.ezElementExists(this.ezDialogId)) {
            return null;
        }

        return ezApi.ezclocker.ezUi.ezId(this.ezDialogId).dialog('destroy');
    }

    /**
        @public @method
        If the element associated with the dialog's id exists in the document:
            Returns the result of calling the JQuery UI Dialog's instance method that:
                1) Retrieves the dialog's instance object.
                2) If the element does not have an associated instance, undefined is returned.
        Otherwise, null is returned.
        -------------------------------------------------------------
        >>> IMPORTANT <<<
        Call this method in the following way to maintain the property this context:
            aEzDialogConfig.ezInstance.apply(aEzDialogConfig);
        -------------------------------------------------------------
        @returns {null|*}
     */
    ezInstance() {
        if (!ezApi.ezclocker.ezUi.ezElementExists(this.ezDialogId)) {
            return null;
        }

        return ezApi.ezclocker.ezUi.ezId(this.ezDialogId).dialog('instance');
    }

    /**
        @public @method
        If the element associated with the dialog's id exists in the document:
            Returns the result of calling the JQuery UI Dialog's isOpen method that
            returns true if the dialog is open, false otherwise.
        Otherwise, returns null
        -------------------------------------------------------------
        >>> IMPORTANT <<<
        Call this method in the following way to maintain the property this context:
            aEzDialogConfig.ezIsOpen.apply(aEzDialogConfig);
        -------------------------------------------------------------
        @returns {null|*}
     */
    ezIsOpen() {
        if (!ezApi.ezclocker.ezUi.ezElementExists(this.ezDialogId)) {
            return null;
        }

        ezApi.ezclocker.ezUi.ezId(this.ezDialogId).dialog('isOpen');
    }

    /**
        @public @method
        If the element associated with the dialog's id exists in the document:
            Returns the result of calling the JQuery UI Dialog's isOpen method that
            moves the dialog to the top of the dialog stack.
        Otherwise, returns null
        -------------------------------------------------------------
        >>> IMPORTANT <<<
        Call this method in the following way to maintain the property this context:
            aEzDialogConfig.ezMoveToTop.apply(aEzDialogConfig);
        -------------------------------------------------------------
        @returns {null|*}
     */
    ezMoveToTop() {
        if (!ezApi.ezclocker.ezUi.ezElementExists(this.ezDialogId)) {
            return null;
        }

        ezApi.ezclocker.ezUi.ezId(this.ezDialogId).dialog('moveToTop');
    }

    /**
        @public @method
        If the element associated with the dialog's id exists in the document:
             Returns the result of calling the JQuery UI Dialog's isOpen method that opens the dialog.
        Otherwise, returns null
        -------------------------------------------------------------
        >>> IMPORTANT <<<
        Call this method in the following way to maintain the property this context:
            aEzDialogConfig.ezOpen.apply(aEzDialogConfig);
        -------------------------------------------------------------
        @returns {null|*}
     */
    ezOpen() {
        if (!ezApi.ezclocker.ezUi.ezElementExists(this.ezDialogId)) {
            return null;
        }

        ezApi.ezclocker.ezUi.ezId(this.ezDialogId).dialog('open');
    }

    /**
        @public @method
        If the element associated with the dialog's id exists in the document:
            Returns the result of calling the JQuery UI Dialog's optionValue(optionName, optionValue) method that:
                1) If the optionName param is a valid string, then gets the value currently associated with the specified optionName.
                2) If the optionName is null or undefined, the  gets an object containing key/value pairs representing the current dialog options hash.
                3) If the optionName is a valid string and optionValue is not undefined or null,
                   then sets the value of the dialog option associated with the specified optionName.
        Otherwise, returns null
        -------------------------------------------------------------
        >>> IMPORTANT <<<
        Call this method in the following way to maintain the property this context:
            aEzDialogConfig.ezClose.ezOptionValue(
                aEzDialogConfig,
                [
                    optionName,
                    optionValue
                ]);
        -------------------------------------------------------------
        @param {undefined|null|string} optionName
        @param {undefined|null|object} optionValue
        @returns {null|object}
     */
    ezOptionValue(optionName, optionValue) {
        if (!ezApi.ezclocker.ezUi.ezElementExists(this.ezDialogId)) {
            return null;
        }

        if (EzString.stringHasLength(optionName)) {
            if (EzObject.isValid(optionValue)) {
                return ezApi.ezclocker.ezUi.ezId(this.ezDialogId).dialog(
                    'option',
                    optionName,
                    optionValue);
            }
            return ezApi.ezclocker.ezUi.ezId(this.ezDialogId).dialog(
                'option',
                optionName);
        }

        return ezApi.ezclocker.ezUi.ezId(this.ezDialogId).dialog('option');
    }

    /**
        @public @method
        If the element associated with the dialog's id exists in the document:
            Returns the result of calling the JQuery UI Dialog's widget method that
            returns a jQuery object containing the generated wrapper.
        Otherwise, returns null
        -------------------------------------------------------------
        >>> IMPORTANT <<<
        Call this method in the following way to maintain the property this context:
            aEzDialogConfig.ezClose.ezWidget(aEzDialogConfig);
        -------------------------------------------------------------
        @returns {null|*}
     */
    ezWidget() {
        if (!ezApi.ezclocker.ezUi.ezElementExists(this.ezDialogId)) {
            return null;
        }

        ezApi.ezclocker.ezUi.ezId(this.ezDialogId).dialog('widget');
    }

    /**
        @override
        @public @readonly @property
        Returns this instance as a JSON Object (will no longer have the getter/setter methods).
        Useful for serailization to JSON.
        @returns {object}
     */
    get asJSONObject() {
        return {
            appendTo: this.appendTo,
            autoOpen: this.autoOpen,
            buttons: this.buttons,
            classes: this.classes,
            closeOnEscape: this.closeOnEscape,
            closeText: this.closeText,
            dialogClass: this.dialogClass,
            draggable: this.draggable,
            height: this.height,
            hide: this.hide,
            show: this.show,
            maxHeight: this.maxHeight,
            maxWidth: this.maxWidth,
            minHeight: this.minHeight,
            minWidth: this.minWidth,
            modal: this.modal,
            position: this.position,
            resizable: this.resizable
        };
    }

    /**
        @override
        @public @readonly @property
        Returns this instance as JSON string (no formatting)
        @returns {String}
    */
    get asJSON() {
        return super.asJSON;
    }

    /**
        @override
        @public @method
        Converts this instance into a JSON string with optional formatting.
        @param {undefined|null|Number} indentValue
        @param {undefined|null|Boolean} htmlDisplay
        @returns {String}
    */
    ezToJSON(indentValue, htmlDisplay) {
        return super.ezToJSON(indentValue, htmlDisplay);
    }

    /**
        @override
        @public @method
        Copies properties from the provided jsonObject to this instance (even if this instance does not define the property)
        @param {Object} jsonObject
        @returns {Object}
        Returns this instance with the key & values from the provided jsonObject.
    */
    ezFromJSONObject(jsonObject) {
        return super.ezFromJSONObject(jsonObject);
    }

    /**
        @override
        @public @method
        Converts the provided jsonString to a JSON object and then
        passes that object to ezFromJSONObject() to copies properties to this instance
        (even if this instance does not define the property)
        @param {String} jsonString
        @returns {Object}
        Returns this instance with the key & values from the provided json string.
    */
    ezLoadFromJson(jsonString) {
        return super.ezLoadFromJson(jsonString);
    }
}
