import { EzBadParamException } from '/ezlibrary/exceptions/EzBadParamException.js';

import { EzObject } from '/ezlibrary/helpers/EzObject.js';
import { EzBoolean } from '/ezlibrary/helpers/EzBoolean.js';
import { EzString } from '/ezlibrary/helpers/EzString.js';
import { EzFunction } from '/ezlibrary/helpers/EzFunction.js';

import { EzUI } from '/public/javascript/common/ezui.js';

import { EzDialogConfig } from '/ezlibrary/ux/dialogs/EzDialogConfig.js';


/**
    @class
    @description
    A basic UX dialog that allows for an optional custom icon on the top left
    and custom HTML content.
    ---------------------------------------------------------------------------
    Required css files:
        /public/styles/ez-dialog.css
        /public/styles/ez-layout-grid.css
    ---------------------------------------------------------------------------
    Import with:
        import { EzClockerDialog } from '/ezlibrary/ux/dialogs/EzClockerDialog.js';
    ---------------------------------------------------------------------------
 */
export class EzClockerDialog {
    /**
        @public @method
        Creates the initial EzDialogConfig instance with the provided
        dialogId.
        @param {string} dialogId
        @returns {EzDialogConfig}
     */
    static ezCreateDialogConfig(dialogId) {
        if (!EzString.stringHasLength(dialogId)) {
            throw new EzBadParamException(
                'ezDialogConfig',
                EzClockerDialog,
                EzClockerDialog.ezCreateDialogConfig);
        }

        return new EzDialogConfig(dialogId);
    }

    /**
        @public @constructor
        Creates a new instance of EzClockerDialog.
        @param {EzDialogConfig} ezDialogConfig
     */
    constructor(ezDialogConfig) {
        if (!EzObject.isValid(ezDialogConfig)) {
            throw new EzBadParamException(
                'ezDialogConfig',
                this,
                this.constructor);
        }
        if ('EzDialogConfig' !== ezDialogConfig.constructor.name) {
            throw new EzBadParamException(
                'ezDialogConfig (class EzDialogConfig)',
                this,
                this.constructor);
        }

        if (!EzObject.hasOwnProperty(ezApi.ezclocker, EzUI.ezApiName)) {
            ezApi.ezclocker.ezLogger.error('EzClockerDialog requires EzUI imported.')
        }

        this.#ezDialogConfig = ezDialogConfig;
    }

    /**
        @public @readonly @property
        Gets if the dialog is showing or not
        @type {boolean}
     */
    get ezVisible() {
        return EzBoolean.isTrue(
            ezApi.ezclocker.ezUi.ezElementExists(this.ezDialogConfig.ezDialogId) &&
            ezApi.ezclocker.ezUi.ezId(this.ezDialogConfig.ezDialogId).dialog('isOpen'));
    }

    /**
        @public @readonly @property
        Gets if the dialog's html is injected into the document body.
        @type {boolean}
     */
    get ezInjected() {
        return EzBoolean.isTrue(ezApi.ezclocker.ezUi.ezElementExists(this.ezDialogConfig.ezDialogId));
    }

    /**
        @private @field
        Stores the EzDialogConfig instance for the dialog.
        @type {EzDialogConfig}
     */
    #ezDialogConfig = null;

    /**
        @public @readonly @property
        Gets the EzDialogConfig instance for the dialog.
        @returns {EzDialogConfig}
     */
    get ezDialogConfig() {
        return this.#ezDialogConfig;
    }

    /**
        @public @proeprty @setter
        Sets the EzDialogConfig instance for the dialog.
        If the dialog is already injected or showing then it is closed, and removed from the document
        before the configuration is updated.
        @returns {EzDialogConfig}
     */
    set ezDialogConfig(ezDialogConfig) {
        ezApi.ezclocker.ezEventEngine.ezUnwantEvent(
            this.#ezDialogConfig.ezEventNames.onEzDialogConfigUpdated,
            this.ezDialogId);

        this.#ezDialogConfig = ezDialogConfig;

        ezApi.ezclocker.ezEventEngine.ezWantEvent(
            this.#ezDialogConfig.ezEventNames.onEzDialogConfigUpdated,
            this.ezDialogId,
            (ezEvent) => this.ezHandleEzDialogConfigUpdatedEvent(ezEvent).apply(this));
    }

    /**
        @public @method
        Shows the dialog to the user
     */
    ezShow(ezDialogConfig) {
        if (EzObject.isValid(ezDialogConfig)) {
            this.ezDialogConfig = ezDialogConfig;
        }

        if (EzBoolean.isFalse(this.ezInjected)) {
            ezApi.ezclocker.ezUi.ezAppendContent(
                'body',
                this.ezBuildDialogHtml());

            ezApi.ezclocker.ezUi
                .ezId(this.ezDialogConfig.ezDialogId)
                .dialog(this.ezDialogConfig.asJQueryUIDialogConfig);

            if (EzFunction.isFunction(this.ezDialogConfig.ezCloseButtonHandler)) {
                this.ezSetDialogTitleCloseButtonClickHandler(this.ezDialogConfig.ezCloseButtonHandler);
            }
        }

        ezApi.ezclocker.ezUi.ezId(this.ezDialogConfig.ezDialogId).dialog('open');
    }

    /**
        @public @method
        Sets a Jquery dialog's title bar close button click event.
        The button is located by the aria-describedby attribute and is assumed to
        equal the dialogId it applies to.
        @param {function} onClickHandler
     */
    ezSetDialogTitleCloseButtonClickHandler(onClickHandler) {
        if (!EzFunction.isFunction(onClickHandler)) {
            throw new EzBadParamException(
                'onClickHandler',
                this,
                this.ezSetDialogTitleCloseButtonClickHandler);
        }
        if (!ezApi.ezclocker.ezUi.ezElementExists(this.ezDialogConfig.ezDialogId)) {
            throw new EzException(`Unable to locate the dialog HTML element with id=${this.ezDialogConfig.ezDialogId}.`);
        }

        // Hook the dialog's small close button click event (in the title)
        let elements = ezApi.ezclocker.ezUi.ezFindByAriaAttribute('describedby', this.ezDialogConfig.ezDialogId);

        if (EzArray.arrayHasLength(elements)) {
            for (let element of elements) {
                element.click = onClickHandler;
            }
        }
    }

    /**
        @public @method
        Closes the dialog when visible to the user
     */
    ezClose(remove) {
        if (Boolean.isTrue(remove)) {
            ezApi.ezclocker.ezUi.ezId(this.ezDialogConfig.ezDialogId).dialog('close');
            ezApi.ezclocker.ezUi.ezId(this.ezDialogConfig.ezDialogId).dialog('destroy')
            ezApi.ezclocker.ezUi.ezId(this.ezDialogConfig.ezDialogId).remove();

            if (ezApi.ezclocker.ezUi.ezElementExists(this.ezDialogConfig.ezDialogId)) {
                ezApi.ezclocker.ezUi.ezRemoveElement(this.ezDialogConfig.ezDialogId);
            }
        } else if (this.ezVisible) {
            ezApi.ezclocker.ezUi.ezId(this.ezDialogConfig.ezDialogId).dialog('close');
        }
    }

    /**
        @public @method
        Closes the dialog then destroys and removes the dialog from the document.
     */
    ezDestroy() {
        if (ezApi.ezclocker.ezUi.ezElementExists(this.ezDialogConfig.ezDialogId)) {
            ezApi.ezclocker.ezUi.ezId(this.ezDialogConfig.ezDialogId).dialog('close');
            ezApi.ezclocker.ezUi.ezId(this.ezDialogConfig.ezDialogId).dialog('destroy')
            ezApi.ezclocker.ezUi.ezId(this.ezDialogConfig.ezDialogId).remove();

            ezApi.ezclocker.ezUi.ezRemoveElement(this.ezDialogConfig.ezDialogId);
        }

        if (ezApi.ezclocker.ezUi.ezElementExists(`${this.ezDialogConfig.ezDialogId}_HiddenDialogContainer`) &&
            !EzString.stringHasLength(ezApi.ezclocker.ezUi.ezGetElementContent)) {
            // Remove the injected hidden container if empty
            ezApi.ezclocker.ezUi.ezRemoveElement(`${this.ezDialogConfig.ezDialogId}_HiddenDialogContainer`);
        }
    }

    /**
        @public @method
        Replaces the dialog's content with the provided dialogContent value.
        @param {string} dialogContent
     */
    ezSetDialogContent(dialogContent) {
        if (EzString.isString(dialogContent)) {
            throw new EzBadParamException(
                'dialogContent',
                this,
                this.ezSetDialogContent);
        }

        this.ezDialogConfig.ezDialogContentHtml = dialogContent;

        ezApi.ezclocker.ezUi.ezSetContent(
            `${this.ezDialogConfig.ezDialogId}_DialogContentContainer`,
            this.ezDialogConfig.ezDialogContentHtml);
    }

    /**
        @public
        Builds the dialogs HTML
        @returns {string}
     */
    ezBuildDialogHtml() {
        return ezApi.ezTemplate`
            <div
                id="${this.ezDialogConfig.ezDialogId}"
                title="${this.ezDialogConfig.title}">
                ${this.ezBuildDialogContentContainer()}
            </div>`;
    }

    /**
        @protected @method
        Builds the dialogs content container an inserts the optional icon html and
        ezDialogCOnfig.ezDialogContentHtml.
        @returns {string}
     */
    ezBuildDialogContentContainer() {
        if (!EzString.stringHasLength(this.ezDialogConfig.ezDialogContentHtml)) {
            // Creating default dialog content
            this.ezDialogConfig.ezDialogContentHtml = '<h1>Dialog Test</h1><p>This dialog does not yet have usable content.</p>';
        }

        let dialogContentClass = EzString.stringHasLength(this.ezDialogConfig.ezDialogIconUrl)
            ? 'ezAutoCol_MinxA'
            : 'ezAutoCol_A';

        return ezApi.ezTemplate`
            <div
                id="${this.ezDialogConfig.ezDialogId}_DialogContainer"
                class="${dialogContentClass}">
                ${this.ezBuildDialogIcon()}
                <div
                    id="${this.ezDialogConfig.ezDialogId}_DialogContentContainer"
                    class="ezGrid-align-full">
                    ${this.ezDialogConfig.ezDialogContentHtml}
                </div>`
    }

    /**
        @protected @method
        Builds the dialog's Icon display HTML if the ezDialogConfig.ezDialogIconUrl is provided.
        @returns {string}
     */
    ezBuildDialogIcon() {
        return EzString.stringHasLength(this.ezDialogConfig.ezDialogIconUrl)
            ? ezApi.ezTemplate`
                <div
                    id="${this.ezDialogConfig.ezDialogId}_ImageContainer"
                    class="ezGrid-vertical-align-top ezGrid-align-left ezPadding-left-10 ezPadding-right-10">
                    <img
                        id="${this.ezDialogConfig.ezDialogId}_Image"
                        src="${this.ezDialogConfig.ezDialogIconUrl}"
                        style="ezClockerDialogImage"/>
                </div>`
            : '';
    }

    /**
        @protected @method
        Handles the ezDialogConfig.ezEventNames.onEzDialogConfigUpdated event
        @param {ezEvent}
        ezEvent.data = {
            dialogId: this.ezDialogId,
            updatedProperties: {
                {propName1}: {propValue1},
                {propName2}: {propValue2},
                    ...
                {propNameN}: {propValueN},
            ]
            ezDialogConfig: this
        }
     */
    ezHandleEzDialogConfigUpdatedEvent(ezEvent) {
        if (EzObject.isValid(ezEvent) && EzObject.isValid(ezEvent.data)) {
            // Update the dialog's configuration
            ezApi.ezclocker.ezUi(ezEvent.data.dialogId)
                .dialog(ezEvent.data.ezDialogConfig.asJQueryUIDialogConfig);
        }
    }
}
