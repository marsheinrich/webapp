/**
    EzClocker Exceptions Imports
    NOTE: Remove all imported exceptions you do not use in the class.
 */
import {
    EzBadParamException
} from '/ezlibrary/exceptions/EzExceptions.js';

/**
    EzClocker Helper Classes
    NOTE: Remove all imports you do not use
 */
import {
    EzObject,
    EzNumber,
    // EzFloat,
    // EzBoolean,
    EzString,
    // EzArray,
    // EzFunction,
    // EzPromise,
    // EzJson,
    EzHtml,
    // EzUrl
} from '/ezlibrary/helpers/EzHelpers.js';

/**
  Access via: ezApi.ezclocker.ezUi
  Used for HTML document manipulation
  NOTE: Remove the EzUI import and the related ready checks and ready event hook
  if not using in the class.
 */
import '/public/javascript/common/ezclocker-dialog-helper.js';

/**
     @class
     @description
     Dialog that displays a single embeded video in an iFrame
     ---------------------------------------------------------------------
     Import with:
         import { EzVideoDialog } from '/secure/widgets/EzVideoDialog/EzVideoDialog.js';
     ---------------------------------------------------------------------
  */
export class EzVideoDialog {
    /**
        @static
        @public @method
        Creates a new video dialog and shows the dialog.
        @param {string} dialogId
        @param {string} dialogTitle
        @param {string} videoUrl
        @returns {EzVideoDialog} ezVideoDialog
        Instance of the ezVideoDialog created
     */
    static ezShowVideoDialog(dialogId, dialogTitle, videoUrl) {
        let ezVideoDialog = new EzVideoDialog(dialogId, dialogTitle, videoUrl);

        ezVideoDialog.ezShow();

        return ezVideoDialog;
    }

    /**
        @public @constructor
        Creates a new instance of EzVideoDialog
        @param {string} dialogId
        @param {string} dialogTitle
        @param {string} videoUrl
     */
    constructor(dialogId, dialogTitle, videoUrl) {
        this.#ezDialogConfig = new EzDialogConfig(
            EzString.stringOrDefault(
                dialogId,
                'EzVideoDialog'));

        this.#ezDialogConfig.title = EzString.stringOrDefault(
            dialogTitle,
            'EzClocker Video');

        this.#ezDialogConfig.width = 900;

        this.#ezDialogConfig.minWidth = 900;

        this.#ezDialogConfig.height = 675;

        this.#ezDialogConfig.minHeight = 675;

        this.#ezDialogConfig.resizable = false;

        this.#ezVideoUrl = videoUrl;
    }

    /**
        @private @field
        Stores the EzDialogConfig used for the dialog itself
        @type {EzDialogConfig}
     */
    #ezDialogConfig;
    /**
        @public @property @getter
        Gets the EzDialogConfig used for the dialog itself
        @returns {EzDialogConfig}
     */
    get ezDialogConfig() {
        return this.#ezDialogConfig;
    }
    /**
        @public @property @setter
        Sets the EzDialogConfig used for the dialog itself
        @param {EzDialogConfig} ezDialogConfig
     */
    set ezDialogConfig(ezDialogConfig) {
        if (!EzObject.isValid(ezDialogConfig)) {
            throw new EzBadParamException(
                'ezDialogConfig',
                this,
                'set ezDialogConfig(ezDialogConfig)');
        }

        this.#ezDialogConfig = ezDialogConfig;
    }

    /**
        @private @field
        Stores the video url to display in the dialog.
        @type {String}
     */
    #ezVideoUrl = EzString.EMPTY;
    /**
        @public @property @getter
        Gets the video url to display in the dialog.
        @returns {string}
     */
    get ezVideoUrl() {
        return this.#ezVideoUrl;
    }
    /**
        @public @property @setter
        Sets the video url to display in the dialog.
        @param {string} ezVideoURL
     */
    set ezVideoUrl(ezVideoUrl) {
        this.#ezVideoUrl = EzString.stringOrEmpty(ezVideoUrl);
    }

    /**
        @private @field
        Stores the width of the video in the dialog.
        @type {String}
     */
    #ezVideoWidth = 800;
    /**
        @public @property @getter
        Gets the width of the video in the dialog.
        @returns {number}
     */
    get ezVideoWidth() {
        return this.#ezVideoWidth;
    }
    /**
        @public @property @setter
        Sets the width of the video in the dialog.
        @param {number} ezVideoWidth
     */
    set ezVideoWidth(ezVideoWidth) {
        this.#ezVideoWidth = EzNumber.numberOrDefault(
            ezVideoWidth,
            800);
    }

    /**
        @private @field
        Stores the height of the video in the dialog.
        @type {String}
     */
    #ezVideoHeight = 450;
    /**
        @public @property @getter
        Gets the height of the video in the dialog.
        @returns {number}
     */
    get ezVideoHeight() {
        return this.#ezVideoHeight;
    }
    /**
        @public @property @setter
        Sets the height of the video in the dialog.
        @param {number} ezVideoHeight
     */
    set ezVideoHeight(ezVideoHeight) {
        this.#ezVideoHeight = EzNumber.numberOrDefault(
            ezVideoHeight,
            450);
    }

    /**
        @private @field
        Stores the allow property settings for the video.
        @type {String}
     */
    #ezAllowProperty = 'accelerometer; autoplay; clipboard-write; encrypted-media; picture-in-picture';
    /**
        @public @property @getter
        Gets the allow property settings for the video.
        @returns {string}
     */
    get ezAllowProperty() {
        return this.#ezAllowProperty;
    }
    /**
        @public @property @setter
        Sets the allow property settings for the video.
        @params {string} ezAllowProperty
     */
    set ezAllowProperty(ezAllowProperty) {
        this.#ezAllowProperty = EzString.stringOrDefault(
            ezAllowProperty,
            'accelerometer; autoplay; clipboard-write; encrypted-media; picture-in-picture');
    }

    /**
        @protected @method
        Builds the main HTML content for the EzVideoDialog UX
        NOTE: Only include this method if your class renders UX during initialization
     */
    ezInitUX() {
        this.ezDialogConfig = EzHtml.build`
            <div
                id="${this.ezDialogConfig.ezDialogId}"
                class="ezClockerDialog"
                title="${this.ezDialogConfig.title}">
                <div
                    id="${this.ezDialogConfig.ezDialogId}_VideoLayoutContainer"
                    class="ezAutoCol_AxA">
                    <div
                        id="${this.ezDialogConfig.ezDialogId}_LeftCol">
                    </div>
                    <div
                        id="${this.ezDialogConfig.ezDialogId}_CenterCol">
                        <h1>
                            Thank you for choosing ezClocker!
                        </h1>
                        <p>
                            Watch the video below to learn how to get started using ezClocker.
                        </p>
                        <iframe
                            id="${this.ezDialogConfig.ezDialogId}_IFrame"
                            width="${this.ezVideoWidth}"
                            height="${this.ezVideoHeight}"
                            src="${this.ezVideoUrl}"
                            frameborder="0"
                            allow="${this.ezAllowProperty}"
                            allowfullscreen>
                        </iframe>
                    </div>
                </div>
                <div
                    id="${this.ezDialogConfig.ezDialogId}_RightCol">
                </div>
            </div>`;

        this.ezDialogConfig.close = () => ezApi.ezclocker.ezDialog.ezCloseDestroyAndRemoveDialog(this.ezDialogConfig.ezDialogId);

        this.ezDialogConfig.buttons = [
            {
                id: `${this.ezDialogConfig.ezDialogId}_CloseButton`,
                text: 'Close',
                click: () => ezApi.ezclocker.ezDialog.ezCloseDialog(this.ezDialogConfig.ezDialogId)
            }
        ];

        ezApi.ezclocker.ezDialog.ezInitAndInjectDialog(this.ezDialogConfig);
    }

    /**
        @public @method
        Shows the dialog
     */
    ezShow() {
        this.ezInitUX();

        ezApi.ezclocker.ezDialog.ezShowDialog(this.ezDialogConfig.ezDialogId);
    }
}
