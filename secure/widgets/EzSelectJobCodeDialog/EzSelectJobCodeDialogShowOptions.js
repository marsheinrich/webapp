import { EzBadParamException } from '/ezlibrary/exceptions/EzBadParamException.js';

/**
    Import with:
        import { EzSelectJobCodeShowDialogOptions } from '/secure/widgets/EzSelectJobCodeDialog/EzSelectJobCodeDialogShowOptions.js';
 */
export class EzSelectJobCodeShowDialogOptions {
    /**
        @public @constructor
        Creates a new instance of EzShowDialogOptions
        @param {string} ezSelectJobCodeDialogMode
        Required: A valid enum property value from EzSelectJobCodeDialogMode
        @param {undefined|null|string} dialogTitle
        Optional: The title of the dialog
        @param {string} dialogSelectInputLabel
        Optional: The select input's label
        @param {string} dialogHelpHtml
        Optional: The dialog's help HTML
        @param {undefined|null|string} showDialogButtonId
        Optional: The element id of the button that shows the dialog
     */
    constructor(ezSelectJobCodeDialogMode, dialogTitle, dialogSelectInputLabel, dialogHelpHtml, ezShowDialogElementId) {
        if (!ezApi.ezStringHasLength(ezSelectJobCodeDialogMode)) {
            throw new EzBadParamException(
                'ezSelectJobCodeDialogMode',
                this,
                'constructor(ezSelectJobCodeDialogMode, dialogTitle, dialogSelectInputLabel, dialogHelpHtml, showDialogButtonId)');
        }

        this.ezSelectJobCodeDialogMode = ezSelectJobCodeDialogMode;

        this.ezDialogTitle = dialogTitle;
        this.ezDialogSelectInputLabel = dialogSelectInputLabel;
        this.ezDialogHelpHtml = dialogHelpHtml;

        this.ezShowDialogElementId = ezShowDialogElementId;
    }

    #ezAllowShowDialog = true;

    #ezSelectJobCodeDialogMode = null;

    #ezDialogTitle = null;
    #ezDialogSelectInputLabel = null;
    #ezDialogHelpHtml = null;

    #ezShowDialogElementId = null;

    get ezAllowShowDialog() {
        return this.#ezAllowShowDialog;
    }

    set ezAllowShowDialog(ezAllowShowDialog) {
        this.#ezAllowShowDialog = ezApi.ezIsTrue(ezAllowShowDialog);
    }

    get ezSelectJobCodeDialogMode() {
        return this.#ezSelectJobCodeDialogMode;
    }

    set ezSelectJobCodeDialogMode(ezSelectJobCodeDialogMode) {
        if (!ezApi.ezStringHasLength(ezSelectJobCodeDialogMode)) {
            throw new EzBadParamException(
                'ezSelectJobCodeDialogMode',
                this,
                this.ezSelectJobCodeDialogMode);
        }

        this.#ezSelectJobCodeDialogMode = ezSelectJobCodeDialogMode;
    }

    get ezDialogTitle() {
        return this.#ezDialogTitle;
    }

    set ezDialogTitle(ezDialogTitle) {
        this.#ezDialogTitle = ezApi.ezIsString(ezDialogTitle)
            ? ezDialogTitle
            : null;
    }

    get ezDialogSelectInputLabel() {
        return this.#ezDialogSelectInputLabel;
    }

    set ezDialogSelectInputLabel(ezDialogSelectInputLabel) {
        this.#ezDialogSelectInputLabel = ezApi.ezIsString(ezDialogSelectInputLabel)
            ? ezDialogSelectInputLabel
            : null;
    }

    get ezDialogHelpHtml() {
        return this.#ezDialogHelpHtml;
    }

    set ezDialogHelpHtml(ezDialogHelpHtml) {
        this.#ezDialogHelpHtml = ezApi.ezIsString(ezDialogHelpHtml)
            ? ezDialogHelpHtml
            : null;
    }

    get ezShowDialogElementId() {
        return this.#ezShowDialogElementId;
    }

    set ezShowDialogElementId(ezShowDialogElementId) {
        this.#ezShowDialogElementId = ezApi.ezIsString(ezShowDialogElementId)
            ? ezShowDialogElementId
            : null;
    }
}