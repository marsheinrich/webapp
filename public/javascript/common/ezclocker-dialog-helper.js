/*
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    ENGINEERING NOTES
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    Do not import EzEnumerations.js into this class to avoid circular references.

    The classes EzDialogConfig, EzDialogResponseStatus, and EzDialogResponse
    have moved from within this module to their own files. Below you can find the
    new locations for the classes:

    * EzDialogConfig: import { EzDialogConfig } from '/ezlibrary/ux/dialogs/EzDialogConfig.js';
    * EzDialogResponseStatus: import { EzDialogResponseStatus } from '/ezlibrary/ux/dialogs/EzDialogResponseStatus.js';
    * EzDialogResponse: import { EzDialogResponse } from '/ezlibrary/ux/dialogs/EzDialogResponse.js';

    For backwards compatibility, this module still exports the classes. However,
    the exports will get removed in a future release. Please migrate to using
    the new locations as soon as possible.
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
*/

import {
    EzException,
    EzBadParamException
} from '/ezlibrary/exceptions/EzExceptions.js';

import {
    EzObject,
    EzBoolean,
    EzNumber,
    EzString,
    EzArray,
    EzFunction,
    EzHtml,
    EzUrl,
    EzPromise
} from '/ezlibrary/helpers/EzHelpers.js';

import { EzRegistrationState } from '/ezlibrary/enums/EzRegistrationState.js';
import { EzDialogResponseStatus } from '/ezlibrary/ux/dialogs/EzDialogResponseStatus.js';

import { EzClass } from '/ezlibrary/EzClass.js';

import { EzDateTime } from '/public/javascript/common/ez-date-time.js';

import { EzUI } from '/public/javascript/common/ezui.js';

import { EzDialogConfig } from '/ezlibrary/ux/dialogs/EzDialogConfig.js';
import { EzDialogResponse } from '/ezlibrary/ux/dialogs/EzDialogResponse.js';
import { EzClockerDialog } from '/ezlibrary/ux/dialogs/EzClockerDialog.js';


/**
    @class
    @extends {EzClass}
    @description
    Controller and View management for ezClocker dialogs.
    ---------------------------------------------------------------------------
    Import with:
        import { EzDialog } from '/public/javascript/common/ezclocker-dialog-helper.js';
    ---------------------------------------------------------------------------
    Class ready for check:
        ezApi?.ezclocker?.ezDialog?.ready
    ---------------------------------------------------------------------------
    Listen for class onReady event:
        document.addEventListener(
            EzDialog.ezEventNames.onReady,
            this.#ezRegistrator);
    ---------------------------------------------------------------------------
 */
class EzDialog extends EzClass {
    /**
        @static
        @public @readonly @property
        Returns the name of this class's singleton instance when registered with ezApi.
        @returns {string}
     */
    static get ezApiName() {
        return 'ezDialog';
    }

    /**
        @static
        @public @readonly @property
        Returns an object of event names that this class may trigger.
        @returns {object}
     */
    static get ezEventNames() {
        return {
            onReady: 'ezOn_EzDialog_Ready',
        };
    }

    /**
        @static
        @private @field
        Stores the singleton instance of this class that was created by and registerd with EzApi.
        @type {EzDialog}
     */
    static #ezInstance = EzObject.hasOwnProperty(globalThis, 'ezApi') &&
        EzObject.isValid(globalThis.ezApi) && EzBoolean.isTrue(globalThis.ezApi.ready) &&
        EzObject.isValid(globalThis.ezApi.ezclocker[EzDialog.ezApiName])
        ? globalThis.ezApi.ezclocker[EzDialog.ezApiName]
        : null;

    /**
        @static
        @public @property @getter
        Returns the singleton instance of this class that is registered with EzApi (if available yet)
        @returns {EzDialog}
     */
    static get ezInstance() {
        return EzDialog.#ezInstance;
    }

    /**
        @static
        @public @property @getter
        Sets the singleton instance of of this class that is registered with EzApi.
        @param {EzDialog} ezDialog
     */
    static set ezInstance(ezDialog) {
        if (null != EzDialog.#ezInstance) {
            throw new Error('EzDialog\'s singleton instance is already reigstered with EzApi.');
        }

        EzDialog.#ezInstance = ezDialog;
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
    static #ezApiRegistrationState = EzObject.hasOwnProperty(globalThis, 'ezApi') &&
        EzObject.isValid(globalThis.ezApi) && EzBoolean.isTrue(globalThis.ezApi.ready) &&
        EzObject.isValid(globalThis.ezApi.ezclocker[EzDialog.ezApiName])
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
        return EzDialog.#ezApiRegistrationState;
    }

    /**
        @static
        @public @property @setter
        Sets the ezApi registration state of this classes's singleton instance.
        @param {string} ezApiRegistrationState
        A valid enum property value from EzRegistrationState
     */
    static set ezApiRegistrationState(ezApiRegistrationState) {
        EzDialog.#ezApiRegistrationState = EzRegistrationState.ezValueOf(ezApiRegistrationState);
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
        return EzRegistrationState.PENDING === EzDialog.ezApiRegistrationState &&
            Object.prototype.hasOwnProperty.call(globalThis, 'ezApi') &&
            globalThis.ezApi && globalThis.ezApi.ready &&

            globalThis.ezApi.ezclocker[EzUI.ezApiName] &&
            globalThis.ezApi.ezclocker[EzUI.ezApiName].ready &&

            globalThis.ezApi.ezclocker[EzDateTime.ezApiName] &&
            globalThis.ezApi.ezclocker[EzDateTime.ezApiName].ready;
    }

    /**
        @static
        @private @readonly @property
        Returns if this class's singleton instance is registered with ezApi yet.
        @returns {boolean}
     */
    static get #ezIsRegistered() {
        return null != EzDialog.ezInstance &&
            EzRegistrationState.REGISTERED === EzDialog.ezApiRegistrationState;
    }

    /**
        @static
        @private @method
        Attempts to register the singleton instance for this class with ezApi. Returns true
        if successful, false otherwise.
        @returns {boolean}
     */
    static #ezRegistrator() {
        if (EzDialog.#ezCanRegister && !EzDialog.#ezIsRegistered) {
            globalThis['ezApi'].ezRegisterNewApi(EzDialog, EzDialog.ezApiName);
        }

        return EzDialog.#ezIsRegistered;
    }

    /**
     * @static
     * Static Initialization
     * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
     * >> IMPORTANT <<
     * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
     * Make sure the following properties and methods get defined BEFORE this static initialization section:
     *     1) Property getter EzDialog.ezApiName
     *     2) Property getter EzDialog.ezEventNames
     *     3) Property getter EzDialog.ezInstance
     *     4) Property setter EzDialog.ezInstance
     *     5) Property getter EzDialog.ezApiRegistrationState
     *     6) Property setter EzDialog.ezApiRegistrationState
     *     7) Property getter EzDialog.#ezCanRegister
     *     8) Property getter EzDialog.#ezIsRegistered
     *     9) Method EzDialog.#ezRegistrator()
     */
    static {
        if (!EzDialog.#ezIsRegistered) {
            EzDialog.ezApiRegistrationState = EzRegistrationState.PENDING;

            if (!EzDialog.#ezRegistrator()) {
                document.addEventListener(
                    'onEzApiReady',
                    () => {
                        if (!EzDialog.#ezRegistrator()) {
                            document.addEventListener(
                                EzUI.ezEventNames.onReady,
                                EzDialog.#ezRegistrator);

                            document.addEventListener(
                                EzDateTime.ezEventNames.onReady,
                                EzDialog.#ezRegistrator);
                        }
                    });
            }
        }
    }

    /**
        @static
        @public @method
        Returns the HTML mailto link for ezClocker support.
     */
    static ezGenerateMailToSupportLinkHtml(optionalSubject, optionalBody) {
        let mailtoUri = 'mailto:support@ezclocker.com';

        let paramChar = '?'

        if (EzString.hasLength(optionalSubject)) {
            mailtoUri = EzUrl.build`
                ${mailtoUri}
                ${paramChar}subject=${optionalSubject}`;

            paramChar = '&';
        }

        if (EzString.hasLength(optionalBody)) {
            mailtoUri = EzUrl.build`
                ${mailtoUri}
                ${paramChar}body=${optionalBody}`;
        }

        return EzHtml.build`
            <a
                href="${mailtoUri}"
                class="ezLink-ezClockerNavy">
                support@ezclocker.com
            </a>`;
    }

    /**
        @static
        @public @readonly @property
        Returns a message instructing the user to try refreshing the page after
        a few miniutes and then contact support.
        @returns {string}
     */
    static get REFRESH_PAGE_THEN_REPORT() {
        return EzString.msg`
            Please try refreshing the page in a few minutes.
            If the error continues please report the error to
            ${EzDialog.ezGenerateMailToSupportLinkHtml()} for additional assistance.`;
    }

    /**
        @public @constructor
        >> AVOID CREATING NEW INSTANCES OUTSIDE OF THE STATIC INITIALIZATION FLOW <<
        Use the static singleton instance available from ezApi: ezApi.ezclocker.ezDialog.
     */
    constructor() {
        super();
    }

    /**
        @public @readonly @property
        Returns the Id of the hidden dialogs container
        (for the DIV container inject by ezApi.ezclocker.ezDialog.ezInjectHiddenDialogContainer())
        @returns {string}
     */
    get ezHiddenDialogContainerId() {
        return 'EzHiddenDialogsContainer';
    }

    /**
        @public @readonly @property
        Returns the html for the hidden dialogs container div.
        (injected via call to ezApi.ezclocker.ezDialog.ezInjectHiddenDialogContainer())
        @returns {string}
     */
    get ezHiddenDialogContainerHtml() {
        return EzHtml.build`
            <style
                id="${this.ezHiddenDialogContainerId}_styles">
                .ezContainers-hidden-dialog-html {
                    display: none;
                }
            </style>
            <div
                id="${this.ezHiddenDialogContainerId}"
                class="ezContainers-hidden-dialog-html">
            </div>`
    }

    /**
        @public @field
        @type {boolean}
     */
    yesNoDialog_ignoreClose = false;

    /**
        @public @readonly @property
        @returns {string}
     */
    get EZ_INJECTED_DIALOG_CONTAINER_ID() {
        return 'EzInjectedDialogsContainer';
    }

    /**
        @public @readonly @property
        @returns {string}
     */
    get TRY_AGAIN_THEN_REPORT() {
        return EzString.msg`
            Please try again in a few minutes.
            If this error persists after multiple attempts, please report the error to ezClocker support.`;
    }

    #ezDialogImageUrls = null;

    /**
        @public @readonly @property
        Returns an object with the image id = img url key values.
        @returns {object}
     */
    get ezDialogImageUrls() {
        if (null == this.#ezDialogImageUrls) {
            this.#ezDialogImageUrls = {
                infoImageUrl: ezApi.ezclocker.ezNavigation.ezGetPublicImagesUrl('icons/info.svg'),
                questionImageUrl: ezApi.ezclocker.ezNavigation.ezGetPublicImagesUrl('icons/question-ezclocker-green.svg'),
                warnImageUrl: ezApi.ezclocker.ezNavigation.ezGetPublicImagesUrl('icons/warn-triangle-orange.svg'),
                errorImageUrl: ezApi.ezclocker.ezNavigation.ezGetPublicImagesUrl('icons/alert-dark-red.svg')
            };
        }

        return this.#ezDialogImageUrls;
    }

    /**
        @public @readonly @property
        @returns {string}
     */
    get EMPLOYEE_INVITE_TIP() {
        return 'EMPLOYEE_INVITE_TIP';
    }

    /**
        @public @readonly @property
        @returns {string}
     */
    get EMPLOYEE_PIN_TIP() {
        return 'EMPLOYEE_PIN_TIP';
    }

    /**
        @public @readonly @property
        @returns {string}
     */
    get EZ_ERROR_DIALOG_ID() {
        return 'EzErrorDialog';
    }

    /**
        @public @readonly @property
        @returns {string}
     */
    get EZ_INJECTED_DIALOGS_CONTAINER_ID() {
        return 'EzInjectedDialogsContainer';
    }

    /**
        @public @readonly @property
        @returns {object}
     */
    get bootStrapDialogs() {
        return {
            BS_CONTAINER_ID: 'EzBSDialogContainer',
            ezShowInfo: (message, title, passThroughData, dialogId) => {
                dialogId = EzString.hasLength(dialogId)
                    ? dialogId
                    : 'bsShowInfoToast';

                if (!EzString.hasLength(message)) {
                    return ezApi.ezResolve(
                        EzDialogResponse.build(
                            dialogId,
                            EzDialogResponseStatus.OK,
                            passThroughData));
                }

                title = EzString.hasLength(title)
                    ? title
                    : 'Error';

                return EzPromise.asyncAction(
                    (finished) => {
                        title = EzString.hasLength(title)
                            ? title
                            : 'Info';

                        dialogId = EzString.hasLength(dialogId)
                            ? dialogId
                            : 'bsShowInfoToast';

                        let ezDialogContainerId = `${dialogId}Container`;

                        ezApi.ezclocker.ezUi.ezPrependContent(
                            'body',
                            EzHtml.build`
                                <div
                                    id="${ezDialogContainerId}"
                                    aria-live="polite"
                                    aria-atomic="true"
                                    class="d-flex justify-content-center align-items-center ez-bring-to-front ez-hidden">
                                    <div
                                        id="${dialogId}"
                                        role="alert"
                                        aria-live="assertive"
                                        aria-atomic="true"
                                        class="toast ez-bring-to-front">
                                        <div
                                            class="toast-header">
                                            <img
                                                src="${ezApi.ezclocker.ezNavigation.ezGetPublicImagesUrl('info_32x32.ico')}"
                                                class="rounded mr-2">
                                            <strong
                                                class="mr-auto">
                                                ${title}
                                            </strong>
                                            <button
                                                type="button"
                                                data-dismiss="toast"
                                                aria-label="Close"
                                                class="ml-2 mb-1 close">
                                                <span
                                                    aria-hidden="true">
                                                    &times;
                                                </span>
                                            </button>
                                        </div>
                                        <div
                                            class="toast-body">
                                            ${message}
                                        </div>
                                    </div>
                                </div>`);

                        ezApi.ezclocker.ezUi.ezHookElementEvent(
                            dialogId,
                            'show.bs.toast',
                            () => ezApi.ezclocker.ezUi.ezRemoveClass(ezDialogContainerId, 'ez-hidden'));

                        ezApi.ezclocker.ezUi.ezHookElementEvent(
                            dialogId,
                            'hidden.bs.toast',
                            () => {
                                ezApi.ezclocker.ezUi.ezAddClass(ezDialogContainerId, 'ez-hidden');
                                return finished(
                                    EzDialogResponse.build(
                                        dialogId,
                                        EzDialogResponseStatus.OK,
                                        passThroughData));
                            });

                        ezApi.ezclocker.ezUi.ezId(dialogId).toast({
                            adnimation: true,
                            autohide: false
                        });

                        ezApi.ezclocker.ezUi.ezAddElementCss(
                            dialogId,
                            {
                                'z-order': 99999999
                            });

                        ezApi.ezclocker.ezUi.ezId(dialogId).toast('show');
                    });
            }
        };
    }

    /**
        @public @readonly @property
        Returns dialogStatus = 'OK'
        @returns {object}
        @deprecated
        Migrate to using the static method EzDialogResponse.DECLINED
     */
    get OK_DIALOG_RESPONSE() {
        return new EzDialogResponse(EzDialogResponseStatus.OK);
    }

    /**
        @public @readonly @property
        Returns dialogStatus = 'NO'
        @returns {object}
        @deprecated
        Migrate to using the static method EzDialogResponse.DECLINED
     */
    get NO_DIALOG_RESPONSE() {
        return new EzDialogResponse(EzDialogResponseStatus.NO);
    }

    /**
        @public @readonly @property
        Returns dialogStatus = 'YES'
        @returns {object}
        @deprecated
        Migrate to using the static method EzDialogResponse.DECLINED
     */
    get YES_DIALOG_RESPONSE() {
        return new EzDialogResponse(EzDialogResponseStatus.YES);
    }

    /**
        @public @readonly @property
        Returns dialogStatus = 'CANCEL'
        @returns {object}
        @deprecated
        Migrate to using the static method EzDialogResponse.DECLINED
     */
    get CANCEL_DIALOG_RESPONSE() {
        return new EzDialogResponse(EzDialogResponseStatus.CANCEL);
    }

    /**
        @public @readonly @property
        Returns dialogStatus = 'ACCEPT'
        @returns {object}
        @deprecated
        Migrate to using the static method EzDialogResponse.DECLINED
     */
    get ACCEPT_DIALOG_RESPONSE() {
        return new EzDialogResponse(EzDialogResponseStatus.ACCEPT);
    }

    /**
        @public @readonly @property
        Returns dialogStatus = 'ACCEPT'
        @returns {object}
        @deprecated
        Migrate to using the static method EzDialogResponse.DECLINED
     */
    get AGREE_DIALOG_RESPONSE() {
        return new EzDialogResponse(EzDialogResponseStatus.AGREE);
    }

    /**
     * @public @readonly @property
     * Returns dialogStatus = 'CONFIRM'
     * @returns {object}
     * @deprecated
     * Migrate to using the static method EzDialogResponse.CONFIRM
     */
    get CONFIRM_DIALOG_RESPONSE() {
        return new EzDialogResponse(EzDialogResponseStatus.CONFIRM);
    }

    /**
        // TODO: Remove this method once all use is migrated.
        @public @readonly @property
        Returns dialogStatus = 'DECLINE'
        @returns {object}
        @deprecated
        Migrate to using the static method EzDialogResponse.DECLINE
     */
    get DECLINE_DIALOG_RESPONSE() {
        return new EzDialogResponse(EzDialogResponseStatus.DECLINE);
    }

    /**
        @public @method
        Initializes EzDialog
        @returns {EzDialog}
     */
    ezInit() {
        return EzDialog.ezInstance;
    }

    /**
        @public @method
        Appends the hidden dialogs container with id EzDialog.ezInstance.ezHiddenDialogContainerId to the
        <body> element of the document if it does not already exist.
     */
    ezInjectHiddenDialogContainer() {
        if (!ezApi.ezclocker.ezUi.ezElementExists(EzDialog.ezInstance.ezHiddenDialogContainerId)) {
            ezApi.ezclocker.ezUi.ezAppendContent(
                'body',
                EzDialog.ezInstance.ezHiddenDialogContainerHtml);
        }
    }

    /**
        @public @method
        Appends the provied dialog's html into the hidden dialog container of the document.
        @param {string} dialogHtml
        HTML for the dialog to inject
     */
    ezInitAndInjectDialog(ezDialogConfig) {
        if (!EzObject.isValid(ezDialogConfig)) {
            throw new EzBadParamException(
                'ezDialogConfig',
                EzDialog.ezInstance,
                EzDialog.ezInstance.ezInjectHiddenDialog);
        }

        EzDialog.ezInstance.ezInjectHiddenDialogContainer();

        ezApi.ezclocker.ezUi.ezAppendContent(
            EzDialog.ezInstance.ezHiddenDialogContainerId,
            ezDialogConfig.ezDialogContentHtml);

        return ezApi.ezclocker.ezUi.ezId(ezDialogConfig.ezDialogId).dialog(ezDialogConfig);
    }

    /**
        // TODO: Remove this method once all use is migrated.
        @public @method
        Creates a new instance of EzDialogResponse.
        @param {string} ezDialogResponseStatus
        A valid enum property value from EzDialogResponseStatus
        @param {undefined|null|*} optionalPassThroughData
        @returns {EzDialogResponse}
        @deprecated
        Will get removed in a future release.
        Migrate to creating the EzDialogResponse in one of the following ways (note the param differences):
            1) new EzDialogResponse(
                {EzDialogResponseStatus},
                {*: pass-through data (optional)},
                {string:dialog id (optional)})
            2) EzDialogResponse.build(
                {string:dialog id (required)},
                {EzDialogResponseStatus (required)},
                {*: pass-through data (optional)})
     */
    ezBuildDialogResponse(ezDialogResponseStatus, optionalPassThroughData) {
        return new EzDialogResponse(
            // EzDialogResponseStatus
            ezDialogResponseStatus,
            // Optional pass through data
            optionalPassThroughData);
    }

    /**
        TODO: Remove this method once all use is migrated
        @public @method
        Creates a new instance of EzDialogConfig
        @returns {EzDialogConfig}
        @deprecated
        Migrate to just using new EzDialogConfig() vs this method
     */
    ezCreateDefaultDialogOptions(dialogId) {
        if (!EzString.hasLength(dialogId)) {
            throw new EzBadParamException(
                'dialogId',
                EzDialog.ezInstance,
                EzDialog.ezInstance.ezCreateDefaultDialogOptions);
        }

        return new EzDialogConfig(dialogId);
    }

    /**
        @public @method
        Builds a jQuery ui dialog from the information provided in ezDialogConfig.
        Requires a value in ezDialogContentHtml.
        @param {EzDialogConfig} ezDialogConfig
        @returns {object}
        Returns the jQuery ui dialog reference.
    */
    ezInitDialogTemplateFromDialogConfig(ezDialogConfig) {
        if (!EzObject.isValid(ezDialogConfig)) {
            throw new EzBadParamException(
                'ezDialogConfig',
                EzDialog.ezInstance,
                EzDialog.ezInstance.ezInitDialogTemplateFromDialogConfig);
        }
        if ('EzDialogConfig' !== ezDialogConfig.constructor.name) {
            throw new EzBadParamException(
                'ezDialogConfig (class EzDialogConfig)',
                EzDialog.ezInstance,
                EzDialog.ezInstance.ezInitDialogTemplateFromDialogConfig);
        }
        if (!EzString.hasLength(ezDialogConfig.ezDialogContentHtml)) {
            throw new EzBadParamException(
                'ezDialogConfig.ezDialgoContentHtml',
                EzDialog.ezInstance,
                EzDialog.ezInstance.ezInitDialogTemplateFromDialogConfig);
        }

        if (!EzString.hasLength(ezDialogConfig.ezDialogId)) {
            ezDialogConfig.ezDialogId = `EzClockerDialogTemplate_${ezApi.ezclocker.ezDateTime.ezNowAsTimestamp()}`
        }

        let dialogHtml = EzHtml.build`
            <div
                id="${ezDialogConfig.ezDialogId}"
                style="display:none"`;

        dialogHtml = EzString.hasLength(ezDialogConfig.ezDialogIconUrl)
            ? EzHtml.build`
                ${dialogHtml}
                    class="ezDialog-with-icon">
                    <div
                        id="${ezDialogConfig.ezDialogId}_IconContainer"
                        class="ezDialog-icon-container">
                        <img
                            id="${ezDialogConfig.ezDialogId}_Image"
                            class="ezDialog-icon"
                            src="${ezDialogConfig.ezDialogIconUrl}"/>
                    </div>`
            : EzHtml.build`
                ${dialogHtml}
                    class="ezDialog-without-icon">`;

        dialogHtml = EzHtml.build`
            ${dialogHtml}
                <div
                    id="${ezDialogConfig.ezDialogId}_ContentContainer"
                    class="ezDialog-content-container">
                    ${ezDialogConfig.ezDialogContentHtml}
                </div>
            </div>`;

        ezApi.ezclocker.ezUi.ezAppendContent(
            'body',
            dialogHtml)

        return EzDialog.ezInstance.ezInitDialogWithConfig(
            ezDialogConfig.ezDialogId,
            ezDialogConfig);
    }

    /**
        @public @method
        Builds the basic ezClocker dialog's HTML
        @returns {string}
    */
    ezBuildDialogFromTemplate(dialogId, imgUrl, dialogContent) {
        if (!EzString.hasLength(dialogId)) {
            dialogId = `EzClockerDialog_${ezApi.ezclocker.ezDateTime.ezNowAsTimestamp()}`;
        }

        let dialogImage = EzString.hasLength(imgUrl)
            ? EzHtml.build`
                <td
                    id="${dialogId}_IconImageContainer"
                    class="ezClockerDialogImageCell">
                    <img
                        id="${dialogId}_IconImage"
                        class="ezClockerDialogImage"
                        src="${imgUrl}"/>
                </td>`
            : EzString.EMPTY;

        return EzHtml.build`
            <div
                id="${dialogId}"
                class="ezClockerDialog">
                <table
                    id="${dialogId}_LayoutTable"
                    class="ezClockerDialogMessageCell">
                    <tr>
                        ${dialogImage}
                        <td
                            class="ezClockerDialogMessageCell"
                            id="${dialogId}_DialogMessageContainer">
                            <div
                                id="${dialogId}_DialogMessage">
                                ${EzString.stringOrEmpty(dialogContent)}
                            </div>
                        </td>
                    </tr>
                </table>
            </div>`;
    }

    /**
        @public @method
        Resolves the result for the dialog associated with the provided dialogId
        @param {string} dialogId
        @param {function} resolveCallback
        @param {undefined|null|*} dialogResult
        @returns {*}
        Returns the result of calling the resolveCallback function.
     */
    ezResolveDialogResult(dialogId, resolveCallback, dialogResult) {
        if (!EzString.hasLength(dialogId)) {
            throw new EzBadParamException(
                'dialogId',
                EzDialog.ezInstance,
                EzDialog.ezInstance.ezResolveDialogResult);
        }
        if (!ezApi.ezclocker.ezUi.ezElementExists(dialogId)) {
            throw new EzException(
                `Unable to locate the dialog's root HTML element for dialogId=${dialogId} in the current document.`);
        }
        if (!EzFunction.isFunction(resolveCallback)) {
            throw new EzBadParamException(
                'resolveCallback',
                EzDialog.ezInstance,
                EzDialog.ezInstance.ezResolveDialogResult);
        }

        EzDialog.ezInstance.ezCloseDestroyAndRemoveDialog(dialogId);

        return resolveCallback(dialogResult);
    }

    /**
        TODO: Remove this method once all use is migrated
        @public @method
        Initializes a default dialog with an OK button.
        @param {string} dialogId
        @returns {object}
        Returns a reference to the element with the provided dialogId
        @deprecated
        Will get removed in a future release.
        Migrate to: ezApi.ezclocker.ezDialog.ezInitDialogWithConfig(dialogId, ezDialogConfig)
     */
    ezInitDefaultDialog(dialogId) {
        if (!EzString.hasLength(dialogId)) {
            throw new EzBadParamException(
                'dialogId',
                EzDialog.ezInstance,
                EzDialog.ezInstance.ezInitDefaultDialog);
        }
        if (!ezApi.ezclocker.ezUi.ezElementExists(dialogId)) {
            throw new EzException(
                `Unable to locate the dialog's root HTML element for dialogId=${dialogId} in the current document.`);
        }

        let ezDialogConfig = new EzDialogConfig(dialogId);

        ezDialogConfig.buttons = [
            {
                autoOpen: false,
                text: 'OK',
                id: `${dialogId}_OK`,
                click: () => EzDialog.ezInstance.ezResolveDialogResult(
                    dialogId,
                    null,
                    {
                        id: dialogId,
                        dialogStatus: EzDialog.ezInstance.OK_DIALOG_RESPONSE.dialogStatus
                    })
            }
        ];

        return ezApi.ezclocker.ezUi.ezId(dialogId).dialog(ezDialogConfig);
    }

    /**
        TODO: Remove this method once all use is migrated
        @public @method
        Initializes a jQuery dialog
        @param {string} dialogId
        @param {undefined|null|array} dialogButtons
        @param {undefined|null|object} additionalOptions
        @returns {Object}
        Returns the reference to the jQuery dialog.
        @deprecated
        Will remove in a future release.
        Migrate to: ezApi.ezclocker.ezDialog.ezInitDialogWithConfig(dialogId, ezDialogConfig)
     */
    ezInitDialog(dialogId, dialogButtons, additionalOptions) {
        if (!EzString.hasLength(dialogId)) {
            throw new EzBadParamException(
                'dialogId',
                EzDialog.ezInstance,
                EzDialog.ezInstance.ezInitDialog);
        }
        if (!ezApi.ezclocker.ezUi.ezElementExists(dialogId)) {
            throw new EzException(
                `Unable to locate the dialog's root HTML element for dialogId=${dialogId} in the current document.`);
        }

        let dialogRef = null;

        if (!EzArray.arrayHasLength(dialogButtons)) {
            dialogRef = EzDialog.ezInstance.ezInitDefaultDialog(dialogId);
        } else {
            let ezDialogConfig = new EzDialogConfig(dialogId);

            ezDialogConfig.buttons = dialogButtons;

            dialogRef = ezApi.ezclocker.ezUi.ezId(dialogId).dialog(ezDialogConfig);
        }

        return EzObject.isValid(additionalOptions)
            ? ezApi.ezclocker.ezUi.ezId(dialogId).dialog(additionalOptions)
            : dialogRef;
    }

    /**
        @public @method
        Initializes a jQuery UI Dialog using the div associated with the provided dialogId and the configuration JSON object
        provided as ezDialogConfig.
        If the dialogId is null or empty then a id is generated in the format of: EzDialog_{Now_UTC_UNIX_MS_TIME_STAMP}
        If the ezDialogConfig is undefined or null then a new instance of EzDialogConfig() is used.
        @param {undefined|null|string} dialogId
        Default is: `EzDialog_${ezApi.ezclocker.ezDateTime.ezGetNowUTCUnixMSTimeStamp()}`
        @param {undefiend|null|EzDialogConfig} ezDialogConfig
        Default is: new EzDialogConfig(dialogId);
        @returns {object}
        Returns the reference to the jQuery UI dialog initialized.
     */
    ezInitDialogWithConfig(dialogId, ezDialogConfig) {
        if (!EzString.hasLength(dialogId)) {
            throw new EzBadParamException(
                'dialogId',
                EzDialog.ezInstance,
                EzDialog.ezInstance.ezInitDialogWithConfig);
        }
        if ('EzDialogConfig' !== ezDialogConfig.constructor.name) {
            throw new EzBadParamException(
                'dialogId (class EzDialogConfig)',
                EzDialog.ezInstance,
                EzDialog.ezInstance.ezInitDialogWithConfig);
        }
        if (!ezApi.ezclocker.ezUi.ezElementExists(dialogId)) {
            throw new EzException(
                `Unable to locate the dialog's root HTML element for dialogId=${dialogId} in the current document.`);
        }

        return ezApi.ezclocker.ezUi.ezId(dialogId).dialog(ezDialogConfig);
    }

    /**
        // TODO: Remove this method once all use is migrated
        @public @method
        Initializes a jQuery UI Dialog using the div associated with the provided dialogId and the configuration JSON object
        provided as ezDialogConfig.
        If the dialogId is null or empty an Id is generated in the format of:
        EzDialog_{Now_UTC_UNIX_MS_TIME_STAMP}
        if the jQueryDialogConfig is not provided then EzDialog.ezInstance.ezCreateDefaultDialogOptions() is used as the configuration.
        @param {string} dialogId
        @param {object} ezDialogConfig
        @returns {object}
        Returns the reference to the jQuery UI dialog initialized.
        @deprecated
        Will remove in a future release.
        Migrate to: ezApi.ezclocker.ezDialog.ezInitDialogWithConfig(dialogId, ezDialogConfig)
     */
    ezInitJQueryDialog(dialogId, ezDialogConfig) {
        return EzDialog.ezInstance.ezInitDialogWithConfig(dialogId, ezDialogConfig);
    }

    /**
        // TODO: Remove this method once all use is migrated
        @public @method
        Shows the dialog associated with the provided id. Dialog needs to have been configured already!
        @param {string} dialogId
        @param {undefined|null|string} onShowEventName
        @deprecated
        Will remove in a future release.
        Migrate to: ezApi.ezclocker.ezShowDialog()
     */
    ezShowDialogById(dialogId, onShowEventName, forceStopPageWait) {
        EzString.hasLength(onShowEventName)
            ? EzDialog.ezInstance.ezShowDialogWithShowEvent(
                dialogId,
                onShowEventName,
                EzBoolean.isTrue(forceStopPageWait))
            : EzDialog.ezInstance.ezShowDialog(
                dialogId,
                EzBoolean.isTrue(forceStopPageWait))
                .then(ezApi.ezIgnoreResolve);
    }

    /**
        @public @method
        Shows the dialog associated with the provided id. Dialog needs to have been configured already!
        @param {string} dialogId
        @param {undefined|null|boolean} forceStopWaitSpinner
        Default: false
        @returns {Promise.resolve}
     */
    ezShowDialog(dialogId, forceStopWaitSpinner) {
        if (!EzString.hasLength(dialogId)) {
            throw new EzBadParamException(
                'dialogId',
                EzDialog.ezInstance,
                EzDialog.ezInstance.ezShowDialog);
        }
        if (!ezApi.ezclocker.ezUi.ezElementExists(dialogId)) {
            throw new EzException(
                `Unable to locate the dialog's root HTML element for dialogId=${dialogId} in the current document.`);
        }

        if (EzBoolean.isTrue(forceStopWaitSpinner)) {
            ezApi.ezclocker.ezUi.ezForceStopPageWait();
        }

        return EzPromise.asyncAction(
            (finished) => {
                ezApi.ezclocker.ezUi.ezId(dialogId).dialog('open');

                return finished();
            });
    }

    /**
        @public @method
        Shows the dialog associated with the provided id. Dialog needs to have been configured already!
        @param {string} dialogId
        @param {String|null} onShowEventName
        @param {Boolean|null} forceStopPageWait
        @returns {Promise.resolve}
     */
    ezShowDialogWithShowEvent(dialogId, onShowEventName, forceStopPageWait) {
        if (!EzString.hasLength(dialogId)) {
            throw new EzBadParamException(
                'dialogId',
                EzDialog.ezInstance,
                EzDialog.ezInstance.ezShowDialogWithShowEvent);
        }

        if (!ezApi.ezclocker.ezUi.ezElementExists(dialogId)) {
            throw new EzException(
                `Unable to locate the dialog's root HTML element for dialogId=${dialogId} in the current document.`);
        }

        return EzPromise.asyncAction(
            (finished) => {
                let response = EzDialog.ezInstance.ezBuildBasicSuccessResponse();

                if (EzBoolean.isTrue(forceStopPageWait)) {
                    ezApi.ezclocker.ezUi.ezForceStopPageWait();
                }

                ezApi.ezclocker.ezUi.ezId(dialogId).dialog('open');

                if (EzString.hasLength(onShowEventName)) {
                    if (ezApi.ezclocker.ezEventEngine.ezIsEventRegistered(onShowEventName)) {
                        ezApi.ezclocker.ezEventEngine.ezTriggerEvent(
                            onShowEventName,
                            ezApi.ezclocker.ezEventEngine.ezBuildEventData(
                                EzDialog.ezApiName,
                                `Dialog with dialogId=${dialogId} is open and visible.`,
                                {
                                    dialogId: dialogId
                                }
                            ));
                    }
                }

                return finished(response);
            });
    }

    /**
        // TODO: Remove this method once all use is migrated
        @public @method
        Closes a visible jquery dialog.
        @param {string} dialogId
        @param {string|null} closeEventName
        @deprecated
        Will remove in a future release
        Migrate to: EzDialog.ezInstance.ezCloseDialog()
     */
    ezCloseDialogById(dialogId, closeEventName) {
        if (!EzString.hasLength(dialogId)) {
            throw new EzBadParamException(
                'dialogId',
                EzDialog.ezInstance,
                EzDialog.ezInstance.ezShowDialogWithShowEvent);
        }
        if (!ezApi.ezclocker.ezUi.ezElementExists(dialogId)) {
            throw new EzException(
                `Unable to locate the dialog's root HTML element for dialogId=${dialogId} in the current document.`);
        }

        return EzDialog.ezInstance.ezCloseDialog(dialogId, closeEventName);
    }

    /**
        @public @method
        Closes the visible jquery dialog associatd with the provided id. Optionally triggers the provided event name
        after the dialog is closed.
        @param {string} dialogId
        @param {string|null} onCloseEventName
     */
    ezCloseDialog(dialogId, onCloseEventName) {
        if (!EzString.hasLength(dialogId)) {
            throw new EzBadParamException(
                'dialogId',
                EzDialog.ezInstance,
                EzDialog.ezInstance.ezShowDialogWithShowEvent);
        }
        if (!ezApi.ezclocker.ezUi.ezElementExists(dialogId)) {
            throw new EzException(
                `Unable to locate the dialog's root HTML element for dialogId=${dialogId} in the current document.`);
        }

        try {
            ezApi.ezclocker.ezUi.ezId(dialogId).dialog('close');

            if (EzString.hasLength(onCloseEventName)) {
                if (ezApi.ezclocker.ezEventEngine.ezIsEventRegistered(onCloseEventName)) {
                    ezApi.ezclocker.ezEventEngine.ezTriggerEvent(
                        onCloseEventName,
                        ezApi.ezclocker.ezEventEngine.ezBuildEventData(
                            dialogId,
                            `Dialog with dialogId=${dialogId} closed.`,
                            {
                                dialogId: dialogId
                            }
                        ));
                }
            }
        } catch (err) {
            ezApi.ezclocker.ezLogger.error(`Failed to close dialog with dialogId=${dialogId} due to error: ${err.message}`);
        }
    }

    /**
        @public @method
        Sets options for a jquery dialog associated with the provided dialogId
        @param {string} dialogId
        @param {undefined|null|string} title
        Default: 'Confirm'
        @param {undefined|null|string} message
        Default: 'Everyone at ezClocker hopes you have an AWESOME day!'
        @param {undefined|null|number} optionalWidth
        @param {undefined|null|number} optionalHeight
     */
    ezSetDialogOptions(dialogId, title, message, optionalWidth, optionalHeight) {
        if (!EzString.hasLength(dialogId)) {
            throw new EzBadParamException(
                'dialogId',
                EzDialog.ezInstance,
                EzDialog.ezInstance.ezShowDialogWithShowEvent);
        }
        if (!ezApi.ezclocker.ezUi.ezElementExists(dialogId)) {
            throw new EzException(
                `Unable to locate the dialog's root HTML element for dialogId=${dialogId} in the current document.`);
        }

        let ezDialogConfig = new EzDialogConfig(dialogId);

        if (EzNumber.isNumber(optionalWidth)) {
            ezDialogConfig.width = optionalWidth;
        }

        if (EzNumber.isNumber(optionalHeight)) {
            ezDialogConfig.height = optionalHeight;
        }

        ezDialogConfig.title = EzString.stringOrDefault(
            title,
            'Confirm');

        ezApi.ezclocker.ezUi.ezId(dialogId).dialog({
            title: ezDialogConfig.title,
            height: ezDialogConfig.height,
            width: ezDialogConfig.width
        });

        let dialogMessageId = `${dialogId}_DialogMessage`;
        if (ezApi.ezclocker.ezUi.ezElementExists(dialogMessageId)) {
            ezApi.ezclocker.ezUi.ezSetContent(
                dialogMessageId,
                EzString.stringOrDefault(
                    message,
                    'Everyone at ezClocker hopes you have an AWESOME day!'));
        }
    }

    /**
        @public @method
        Builds an ezClocker API error response object.
        @param {undefined|null|number} errorCode
        Default: 500
        @param {undefined|null|string} errorMessage
        Default is: `An unexpected error occured. ${EzDialog.ezInstance.TRY_AGAIN_THEN_REPORT}`
        @returns {object}
     */
    ezBuildErrorResponse(errorCode, errorMessage) {
        return {
            errorCode: EzNumber.isNumber(errorCode)
                ? errorCode
                : 500,
            message: EzString.hasLength(errorMessage)
                ? errorMessage
                : `An unexpected error occured. ${EzDialog.ezInstance.TRY_AGAIN_THEN_REPORT}`
        };
    }

    /**
        @public @method
        Builds a basic success response
        @param {undefined|null|string} message
        Default: 'Success'
        @returns {object}
        Basic success API response object in the format:
        {
            errorCode: 0,
            message: {message|'Success'}
        }
     */
    ezBuildBasicSuccessResponse(message) {
        return {
            errorCode: 0,
            message: EzString.hasLength(message)
                ? message
                : 'Success'
        };
    }

    /**
        @public @method
        Shows the authentication session expired or no longer valid message.
        @returns {Promise.resolve}
     */
    ezShowSessionExpiredDialog() {
        ezApi.ezclocker.ezUi.ezForceStopPageWait();

        return EzDialog.ezInstance.ezShowErrorDialog(
            // eTitle
            'Authentication Session Expired',
            // eMessage
            'Your authentication session is expired or no longer valid. Please sign in.',
            // details
            null,
            // optionalData
            null,
            // optionalWidth
            null,
            // optionalHeight
            null);
    }

    /**
        TODO: Remove this method once all use is migrated
        @public @method
        Dialog to inform the user that their session has expired.
        @returns {Promise.resolve}
        @deprecated
        Migrate to: ezApi.ezclocker.ezDialog.ezShowSessionExpiredDialog()
     */
    ezSessionExpiredDialog() {
        return EzDialog.ezInstance.ezShowSessionExpiredDialog();
    }

    /**
        @public @method
        Generates an error message from the provided responseMessage and errorCode
        @param {undefined|null|string} responseMessage
        Default: EzString.EMPTY
        @param {undefined|null|number} errorCode
        Default: null
        @returns {string}
     */
    ezGenerateErrorMessage(responseMessage, errorCode) {
        let em = EzString.hasLength(responseMessage)
            ? `Error reported: ${responseMessage}<br/>${EzDialog.ezInstance.TRY_AGAIN_THEN_REPORT}`
            : EzDialog.ezInstance.TRY_AGAIN_THEN_REPORT;

        return EzNumber.isNumber(errorCode)
            ? EzHtml.build`
                <div>
                    ${em}
                <div>
                <i>
                    Error Code: ${errorCode}
                </i>`
            : em;
    }

    /**
        @public @method
        Evaluates an ezClocker service response. If the response is not valid, or has an errorCode
        value that is not zero, the response is considered an error response.
        Returns a promise, resolving if the response is an error response. Rejecting if the service
        is not an error response.
        @param {object} response
        @param {string|null} errorTitle
        @param {string|null} errorMessage
        @param {boolean|null} showUi
        @returns {Promise.resolve}
     */
    ezIsServiceResponseError(response, errorTitle, errorMessage, showUi) {
        return ezApi.ezPromise(
            (resolve, reject) => !EzObject.isValid(response) || EzObject.isValid(response) && EzObject.isNumber(response.errorCode) && 0 != response.errorCode
                ? EzDialog.ezInstance.ezHandleSpecialErrorCodes(
                    response.errorCode,
                    EzString.stringOrDefault(errorTitle, 'EzClocker Error'),
                    `${EzString.stringOrEmpty(errorMessage)} ${EzDialog.ezInstance.ezGenerateErrorMessage(response.message)}`,
                    EzBoolean.isTrue(showUi))
                    .then(
                        () => resolve(response))
                : reject(response));
    }
    /**
        @public
        Handles special error codes that have defined actions. If none match, then the error is just logged.
        Optionally, an error message UI can pop-up if showUi = true
        @param {string|null} errorTitle
        @param {string|null} errorMessage
        @param {boolean|null} showUi
        @returns {Promise}
     */
    ezHandleSpecialErrorCodes(errorCode, errorTitle, errorMessage, showUi) {
        if (!EzNumber.isNumber(errorCode)) {
            errorCode = 0;
        }

        if (EzBoolean.ezIsTrue(showUi)) {
            ezApi.ezclocker.ezUi.ezForceStopPageWait();
        }

        return EzPromise.asyncAction(
            (finished) => {
                switch (errorCode) {
                    case 401:
                        ezApi.ezclocker.ezLogger.error('User is not authenticated (redirected to sign out).');

                        ezApi.ezclocker.ezNavigation.ezSignOut();

                        return finished();
                    case 403:
                        ezApi.ezclocker.ezLogger.error('License needs attention (redirected to account page).');

                        ezApi.ezclocker.ezNavigation.ezNavigateToEmployerAccountPage(
                            `employer=${ezApi.ezclocker.ezEmployerDashboardController.activeEmployerId}&expired=1`);

                        return finished();
                    case 409:
                        // Normally user exists error, let UX handle it
                        return finished();
                    default:
                        if (EzString.hasLength(errorMessage)) {
                            ezApi.ezclocker.ezLogger.error(errorMessage);

                            return EzBoolean.ezIsFalse(showUi)
                                ? finished()
                                : EzDialog.ezInstance.ezShowError(
                                    errorTitle,
                                    errorMessage,
                                    finished);
                        }
                }
            });
    }

    /**
        @public @method
        Generates a basic error message for service call failures.
        @param {undefined|null|string} errorTitle
        Default: 'EzClocker Error'
        @param {undefined|null|object} eResponse
        Default: null
        @param {undefined|null|string} defaultErrorMessage
        Default: 'EzClocker encountered an error while performing a task. No additional details were provided.'
        @param {undefined|null|boolean} showUi
        Default: true
        @returns {Promise.resolve}
     */
    ezShowNon200ServiceError(errorTitle, eResponse, defaultErrorMessage, showUi) {
        if (!EzBoolean.isBoolean(showUi)) {
            showUi = true;
        }

        if (EzBoolean.isTrue(showUi)) {
            ezApi.ezclocker.ezUi.ezForceStopPageWait();
        }

        return EzPromise.asyncAction(
            (finished) => {
                if (!EzString.hasLength(errorTitle)) {
                    errorTitle = 'EzClocker Error';
                }

                if (!EzString.hasLength(defaultErrorMessage)) {
                    defaultErrorMessage = 'EzClocker encountered an error while performing a task. No additional details were provided.';
                }

                let errorCode = EzObject.isValid(eResponse) && EzNumber.isNumber(eResponse.errorCode)
                    ? eResponse.errorCode
                    : 500;

                let em = EzDialog.ezInstance.ezGenerateErrorMessage(
                    EzString.stringOrDefault(eResponse.message, defaultErrorMessage),
                    errorCode)

                ezApi.ezclocker.ezLogger.error(`${em} Error response: ${ezApi.ezToJson(eResponse)}`);

                return EzBoolean.isTrue(showUi)
                    ? EzDialog.ezInstance.ezShowError(eTitle, eMessage, finished)
                    : finished(eResponse, eTitle, eMessage);
            });
    }

    /**
        @public @method
        Returns the message in the response, or blank string if none.
        @param {undefined|null|object} eResponse
        @returns {string}
     */
    ezExtractErrorMessageFromResponse(eResponse) {
        return EzObject.isValid(eResponse) && EzString.hasLength(eResponse.message)
            ? eResponse.message
            : EzString.EMPTY;
    }

    /**
        @public @method
        Returns the message in the response, or blank string if none.
        @param {undefined|null|number} errorCode
        @param {undefined|null|string} errorMessage
        @param {undefined|null|string} additionalDetails
        @param {undefined|null|string} serviceDetails
        @returns {string}
     */
    ezCreateDefectDetails(errorCode, errorMessage, additionalDetails, serviceDetails) {
        return EzHtml.build`
            <div>
                <textarea
                    style="width:100%;height:200px;">
                    ******************************\n
                    : Error Details              :\n
                    ******************************\n
                    Error Code: ${EzNumber.numberOrDefault(errorCode, 500)}\n\n
                    ------------------------------\n
                    : Error                      :\n
                    ------------------------------\n
                    ${EzString.stringOrDefault(errorMessage, 'N/A')}\n\n
                    ------------------------------\n
                    : Additional Details         :\n
                    ------------------------------\n
                    ${EzString.stringOrDefault(additionalDetails, 'N/A')}\n\n
                    ------------------------------\n
                    : Service Details            :\n
                    ------------------------------\n
                    ${EzString.stringOrDefault(serviceDetails, 'N/A')}
                </textarea>
            </div>`;
    }

    /**
        // TODO: Remove method once all use is migrated
        @public @method
        Dialog for reporting internally detected errors
        @param {object} jqXHR
        @param {string} error
        @param {string} errorMessage
        @param {string} additionalDetails
        @param {string} action
        @param {boolean}
        @deprecated
        Migrate to EzDialog.ezInstance.ezShowPossibleDefectError()
     */
    ezReportInternalBugDialog(jqXHR, error, errorMessage, additionalDetails, action, refreshPage) {
        let emDetails = EzString.hasLength(additionalDetails)
            ? ' ' + additionalDetails
            : EzString.EMPTY;

        let serviceDetails = 'N/A';
        let ec = '500';

        if (EzObject.isValid(jqXHR)) {
            serviceDetails = ezApi.ezToJson(jqXHR);
            ec = EzObject.isValid(jqXHR.statusCode) ? jqXHR.statusCode : '500';
        }

        let closeAction = ezApi.isFunction(action) ? action : function() {
            if (EzBoolean.isTrue(refreshPage)) {
                window.location.reload(); // refresh the browser to reset the page;
            }
        };

        ezApi.ezclocker.ezLogger.error(`[Error #${ec}] ${errorMessage} [Error details: ${emDetails}]`);

        EzDialog.ezInstance.ezSendErrorReport(
            EzDialog.ezInstance.ezCreateDefectDetails(
                ec,
                errorMessage,
                emDetails,
                serviceDetails));

        // title, message, onCloseCallback, passThroughData, width, height
        return EzDialog.ezInstance.ezShowOK(
            error,
            EzHtml.build`
                EzClocker encounted an unexpected error during the last operation.
                You my retry the operation again, however, if you continue to receive this error
                please contact our support team at
                <a href="mailto:support@ezclocker.com?subject=\'Receiving error: ${errorMessage}\'">
                    support@ezclocker.com
                </a> for assistance.
                <p>We appologize for the disruption to your day.</p>
                <div
                    id="EzTechnicalErrorDetailsContainer">
                    <label
                        id="EzTechnicalDetailsTextAreaLabel"
                        for="EzTechnicalDetailsTextArea"
                        class="ez-faded-error-details">Technical Details</label>
                    <textarea id="EzTechnicalDetailsTextArea"class="ez-error-message-details">
                        ${emDetails.trim()}
                    </textarea>
                </div>`,
            null,
            700)
            .then(closeAction);
    }

    /**
     *  @public @method
     *  Dialog for reporting internally detected errors
     *  @param {string} error
     *  @param {string} errorMessage
     *  @param {Object|null} jqXHR
     *  @param {String|null} additionalDetails
     *  @returns {Promise.resolve}
     */
    ezShowPossibleDefectError(error, errorMessage, jqXHR, additionalDetails, serviceDetails) {
        const self = EzDialog.ezInstance;

        ezApi.ezclocker.ezUi.ezForceStopPageWait();

        let errorDetails = EzObject.isValid(serviceDetails)
            ? EzHtml.build`
                <div>Additional Details:
                    <p>
                        ${errorMessage || ''}
                    </p>
                </div>
                <div>API Info:
                    </p>
                        ${ezApi.ezToJson(ezApi.ezAssignOrDefault(serviceDetails, EzString.EMPTY))}
                    </p>
                </div>`
            : EzHtml.build`
                <div>Additional Details:
                    <p>
                        ${errorMessage || ''}
                    </p>
                    <p>
                        ${ezApi.ezToJson(ezApi.ezAssignOrDefault(additionalDetails, EzString.EMPTY))}
                    </p>
                </div>`;

        EzDialog.ezInstance.ezSendErrorReport(
            EzDialog.ezInstance.ezCreateDefectDetails(
                error,
                errorMessage,
                ezApi.ezAssignOrDefault(additionalDetails, EzString.EMPTY),
                ezApi.ezAssignOrDefault(serviceDetails, EzString.EMPTY)));

        let emailBody = EzString.msg`
            I am receiving the error ${error} with the message: ${errorMessage}.
            Can you please help me resolve this problem?`;

        ezApi.ezclocker.logger.error(ezApi.ezEM`${error}. ${errorMessage}. Details: ${errorDetails}`);

        let mailUrl = `mailto:support@ezclocker.com?subject='Help with ${error}'&body='${emailBody}'`;

        let message = EzHtml.build`
            <p>
                EzClocker was unable to communicate to our cloud servers. If it is a temporary connection problem
                you can retry the operation (please wait a few mins between retries).
            </p>
            <p>
                If you continue to experience problems or need immediate help please contact our support team at
                <a href="${mailUrl}">
                    support@ezclocker.com
                </a>.
            </p>
            Thank you for your patience!
            <div class="ez-error-details-container">
                ${errorDetails}
            </div>`;

        return EzDialog.ezInstance.ezShowOK(
            // title
            error,
            // message
            message,
            // passThroughData
            null,
            // width
            800,
            // height
            600);
    }

    /**
        Sends an unhandled exception to exceptions@ezclocker.com
        @param {string} errorReportDetails
     */
    ezSendErrorReport(errorReportDetails) {
        return ezApi.ezclocker.http.ezPost(ezApi.ezclocker.ezNavigation.getPublicApiUrl('email/send-error-report'),
            ezApi.ezToJson({
                userId: null,
                errorDetails: errorReportDetails
            })).then(ezApi.ezIgnoreResolve, ezApi.ezIgnoreReject);
    }

    /**
        @public @method
        Creates support contact information HTML message
        @returns {string}
     */
    ezCreateSupportContactInfo(
        emailTitle = 'Receiving Error Messages from ezClocker Website',
        emailBody = EzString.EMPTY) {

        if (!EzString.isString(emailBody)) {
            let errorMessage = EzObject.isValid(emailBody)
                ? EzJson.toJson(emailBody)
                : '[please enter the error you recenved here]';

            emailBody = EzString.msg`
                I received the following error when using the ezClocker website:

                ${EzString.stringOrDefault(errorMessage, '[please enter the error you recenved here]')}

                Can you please help me resolve this?`;
        }

        return EzHtml.build`
            <p>
                Please try refreshing the page and trying the operation again. If the problem continues then please contact
                ezClocker at
                <a
                    href="mailto:support@ezclocker.com?subject=${emailTitle}&body=${emailBody}">
                    support@ezclocker.com
                </a>
                for assistence.
            </p>
            <p>
                When contacting support please include your username for the account, any error messages you saw,
                and what you were attempting to do where the problem occurred. The more details our support has the faster they can get
                the problem resolved for you.
            </p>
            <p>
                If you would prefer support call you back as soon as possible please include your name, the call back phone number,
                an the best time to contact you.
            </p>
            <h4>
                All of us at ezClocker do appologize for the disruption of your day!
            </h4>`;
    }

    /**
        Dialog to inform the user that their session has expired.
     */
    ezServiceDownDialog(statusCode) {
        ezApi.ezclocker.ezUi.ezForceStopPageWait();

        return EzDialog.ezInstance.ezShowOK(
            'EzClocker Connectivity Error',
            ezApi.ezEM`
                Error Code: ${EzObject.assignOrDefault(statusCode, '500')}
                <p>
                    EzClocker is having problems connecting to our cloud services at this time.
                    Occasionally the connection problem is due to unexpected maintence work. Please wait a few minuets and then refresh this page.
                </p>
                <p>
                    If you continue to receive this error:
                </p>
                ${EzDialog.ezInstance.ezCreateSupportContactInfo('EzClocker Connectivity Error')}`)
            .then(ezApi.ezclocker.ezNavigation.signOut);
    }

    /**
        @public
        A common dialog to display unexpected service call failure results
        @param {undefined|null|string} title
        Default: 'EzClocker Error'
        @param {undefined|null|string} errorMessage
        @param {undefined|null|number|string} statusCode
        Default: 500
        @param {undefined|null|object} jqXHR
        Default: {
            status: statusCode,
            response: errorMessage
        }
        @param {undefined|null|object} eResponse
        Default: {
            errorCode: statusaCode,
            message: errorMessage
        }
        @returns {Promise.resolve}
        @deprecated Migrate to EzDialog.ezInstance.ezServiceCallFailed()
     */
    ezSomethingIsWrong(title, errorMessage, statusCode, jqXHR, eResponse) {
        if (!EzString.hasLength(errorMessage)) {
            throw new EzBadParamException(
                'errorMessage',
                EzDialog.ezInstance,
                EzDialog.ezInstance.ezServiceCallFailed);
        }

        if (!EzNumber.isNumber(statusCode) && !EzString.hasLength(statusCode)) {
            statusCode = 500;
        }

        if (!EzObject.isValid(eResponse)) {
            eResponse = {
                errorCode: statusaCode,
                message: errorMessage
            }
        }

        if (!EzObject.isValid(jqXHR)) {
            jqXHR = {
                status: statusCode,
                response: errorMessage
            };
        }

        ezApi.ezclocker.ezUi.ezForceStopPageWait();

        return EzDialog.ezInstance.ezShowOK(
            EzString.stringOrDefault(title, 'EzClocker Error'),
            EzHtml.build`
                <h4>Error</h4>
                <p>
                    ${errorMessage}
                </p>
                <p>
                    Please contact <a href="mailto:support@ezclocker.com">support@ezclocker.com</a> and include the
                    contents of this error message if you have questions or need immediate assistence.
                </p>
                <div
                    id="EzTechnicalDetailsContainer">
                    <label
                        id="EzTechnicalDetailsTextAreaLabel"
                        for="EzTechnicalDetailsTextArea"
                        class="ez-faded-error-details">
                        Error Technical Details
                    </label>
                    <textarea
                        id="EzTechnicalDetailsTextArea"
                        class="ez-faded-error-details">
                        Error Code: ${EzObject.assignOrDefault(statusCode, '500')}
                        Service Response: ${EzString.stringOrDefault(ezApi.ezToJson(eResponse, 3, true), 'None Available')}
                        Details: ${EzString.stringOrDefault(ezApi.ezToJson(jqXHR, 3, true), 'No additional details')}
                    </textarea>
                </div>`,
            null,
            600);
    }

    /**
        @public @method
        A common dialog to display unexpected service call failure results
        @param {undefined|null|string} title
        Default: 'EzClocker Error'
        @param {undefined|null|string} errorMessage
        @param {undefined|null|string|number} statusCode
        Default: 500
        @param {undefined|null|object} jqXHR
        Default: {
            status: statusCode,
            response: errorMessage
        }
        @param {undefined|null|object} eResponse
        Default: {
            errorCode: statusaCode,
            message: errorMessage
        }
        @returns {Promise.resolve}
     */
    ezServiceCallFailed(title, errorMessage, statusCode, jqXHR, eResponse) {
        if (!EzString.hasLength(errorMessage)) {
            throw new EzBadParamException(
                'errorMessage',
                EzDialog.ezInstance,
                EzDialog.ezInstance.ezServiceCallFailed);
        }

        if (!EzNumber.isNumber(statusCode) && !EzString.hasLength(statusCode)) {
            statusCode = 500;
        }

        if (!EzObject.isValid(eResponse)) {
            eResponse = {
                errorCode: statusaCode,
                message: errorMessage
            }
        }

        if (!EzObject.isValid(jqXHR)) {
            jqXHR = {
                status: statusCode,
                response: errorMessage
            };
        }

        ezApi.ezclocker.ezUi.ezForceStopPageWait();

        return EzDialog.ezInstance.ezShowOK(
            EzString.stringOrDefault(title, 'EzClocker Error'),
            EzHtml.build`
                <h4>Error</h4>
                <p>
                    ${errorMessage}
                </p>
                <p>
                    Please contact <a href="mailto:support@ezclocker.com">support@ezclocker.com</a> and include the
                    contents of this error message if you have questions or need immediate assistence.
                </p>
                <h4>Technical Details</h4>
                <ul>
                    <li>Error Code: ${EzObject.assignOrDefault(statusCode, '500')}</li>
                    <li>Service Response:${EzString.stringOrDefault(ezApi.ezToJson(eResponse, 3, true), 'None Available')}</li>
                    <li>Details:${EzString.stringOrDefault(ezApi.ezToJson(jqXHR, 3, true), 'No additional details')}</li>
                </ul>`);

    }

    /**
        Present dialog for legal blocks, censorship, government mandates
     */
    ezServiceLegalBlockDialog() {
        ezApi.ezclocker.ezUi.ezForceStopPageWait();

        return EzDialog.ezInstance.ezShowOKMessage(
            'Unavailable for Legal Reasons',
            EzHtml.build`
                Law enforcement, a government authority, or another entity in which ezClocker is bound to has
                requested that we deny access at this time. We cannot provide any additional information at this time.
                <p>
                    Additional information about the error is availalbe online from Wikipedia:
                    <a
                        id="EzWikipediaResearchLink"
                        target="_research_error"
                        href="https://en.wikipedia.org/wiki/HTTP_451">
                        Read about the Unavaialble for Legal Reasons Error on Wikipedia
                    </a>
                </p>`)
            .then(ezApi.ezclocker.ezNavigation.signOut);
    }

    /**
        @public @method
        Shows a yes/no question dialog.
        @param {undefined|null|string} title
        Default: 'EzClocker Confirmation'
        @param {undefined|null|string} message
        Default: EzString.EMPTY
        @param {undefined|null|function} onCloseCallback
        Default: null
        @param {undefined|null|*} passThroughData
        Default: null
        @param {undefined|null|number} optionalWidth
        Default is: Default value for property width on EzDialogConfig
        @param {undefined|null|number} optionalHeight
        Default is: Default value for property height on EzDialogConfig
        @param {undefined|null|string} optionalDialogId
        Default is: `EzYesNoDialog_${moment.now().format('x')}`
        @param {undefined|null|string} optionalIconImageUrl
        Default: ezApi.ezclocker.ezNavigation.ezGetPublicImagesUrl('info_32x32.ico')
        @returns {Promise.resolve}
     */
    ezYesNoDialog(title, message, onCloseCallback, optionalWidth, optionalHeight, useOldResponse) {
        return EzPromise.asyncAction(
            (finished) => {
                const dialogId = 'EzYesNoDialog';

                EzBoolean.isTrue(useOldResponse);

                let handleEzYesNoDialogResponse = (response) => {
                    EzDialog.ezInstance.ezCloseDialog(dialogId);
                    ezApi.ezOnCallback(onCloseCallback, response);
                    return finished(response);
                };

                // Inject the dialog with the specified id
                ezApi.ezclocker.ezUi.ezAppendContent(
                    'body',
                    EzDialog.ezInstance.ezBuildDialogFromTemplate(
                        dialogId,
                        ezApi.ezclocker.ezNavigation.ezGetPublicImagesUrl('icons/question-navy.svg'),
                        message));

                let ezDialogConfig = new EzDialogConfig(dialogId);

                ezDialogConfig.title = EzString.stringOrDefault(title, 'EzClocker Confirmation');

                ezDialogConfig.ezRemoveOnClose = true;

                ezDialogConfig.buttons = [
                    {
                        id: `${dialogId}_YesButton`,
                        text: 'Yes',
                        click: () => handleEzYesNoDialogResponse(
                            EzBoolean.isTrue(useOldResponse)
                                ? 'YES'
                                : EzDialog.ezInstance.YES_DIALOG_RESPONSE)
                    },
                    {
                        id: `${dialogId}_NoButton`,
                        text: 'No',
                        click: () => handleEzYesNoDialogResponse(
                            EzBoolean.isTrue(useOldResponse)
                                ? 'NO'
                                : EzDialog.ezInstance.NO_DIALOG_RESPONSE)
                    }
                ];

                document.querySelector('[aria-label="Message Body"]')

                ezDialogConfig.close = () => EzDialog.ezInstance.ezCloseDestroyAndRemoveDialog(dialogId);

                if (EzNumber.isNumber(optionalWidth)) {
                    ezDialogConfig.width = optionalWidth;
                }

                if (EzNumber.isNumber(optionalHeight)) {
                    ezDialogConfig.height = optionalHeight;
                }

                ezDialogConfig.ezCloseButtonHandler = () => handleEzYesNoDialogResponse(
                    EzBoolean.isTrue(useOldResponse)
                        ? 'NO'
                        : EzDialog.ezInstance.NO_DIALOG_RESPONSE);

                //let ezYesNoDialog = new EzClockerDialog(ezDialogConfig);
                EzDialog.ezInstance.ezInitDialogWithConfig(dialogId, ezDialogConfig);

                ezApi.ezclocker.ezUi.ezForceStopPageWait();

                //ezYesNoDialog.ezShow();
                EzDialog.ezInstance.ezShowDialog(dialogId);
            });
    }

    /**
        @public @method
        Sets a Jquery dialog's title bar close button click event.
        The button is located by the aria-describedby attribute and is assumed to
        equal the dialogId it applies to.
        @param {string} dialogId
        @param {function} onClickHandler
     */
    ezSetDialogTitleCloseButtonClickHandler(dialogId, onClickHandler) {
        if (!EzString.hasLength(dialogId)) {
            throw new EzBadParamException(
                'dialogId',
                EzDialog.ezInstance,
                EzDialog.ezInstance.ezSetDialogTitleCloseButtonClickHandler);
        }
        if (!EzFunction.isFunction(onClickHandler)) {
            throw new EzBadParamException(
                'onClickHandler',
                EzDialog.ezInstance,
                EzDialog.ezInstance.ezSetDialogTitleCloseButtonClickHandler);
        }
        if (!ezApi.ezclocker.ezUi.ezElementExists(dialogId)) {
            throw new EzException(`Unable to locate the dialog HTML element with id=${dialogId}.`);
        }

        // Hook the dialog's small close button click event (in the title)
        let elements = ezApi.ezclocker.ezUi.ezFindByAriaAttribute('describedby', dialogId);

        if (EzArray.arrayHasLength(elements)) {
            for (let element of elements) {
                element.click = onClickHandler;
            }
        }
    }

    /**
        @public @method
        Shows a yes/no question dialog.
        @param {undefined|null|string} title
        Default: 'EzClocker Confirmation'
        @param {undefined|null|string} message
        Default: EzString.EMPTY
        @param {undefined|null|function} onCloseCallback
        Default: null
        @param {undefined|null|*} passThroughData
        Default: null
        @param {undefined|null|number} optionalWidth
        Default is: Default value for property width on EzDialogConfig
        @param {undefined|null|number} optionalHeight
        Default is: Default value for property height on EzDialogConfig
        @param {undefined|null|string} optionalDialogId
        Default is: `EzYesNoDialog_${moment.now().format('x')}`
        @param {undefined|null|string} optionalIconImageUrl
        Default: ezApi.ezclocker.ezNavigation.ezGetPublicImagesUrl('icons/info.svg')
        @returns {Promise.resolve}
     */
    ezShowYesNo(title, message, passThroughData, optionalWidth, optionalHeight, optionalDialogId, onBeforeClose, optionalIconImageUrl) {
        return EzPromise.asyncAction(
            (finished) => {
                const dialogId = EzString.stringOrDefault(
                    optionalDialogId,
                    `EzYesNoDialog_${ezApi.ezclocker.ezDateTime.ezNowAsTimestamp()}`);

                const iconImageUrl = EzString.stringOrDefault(
                    optionalIconImageUrl,
                    ezApi.ezclocker.ezNavigation.ezGetPublicImagesUrl('icons/info.svg'));

                // Inject the dialog with the specified id
                ezApi.ezclocker.ezUi.ezAppendContent(
                    'body',
                    EzDialog.ezInstance.ezBuildDialogFromTemplate(
                        dialogId,
                        iconImageUrl));

                ezApi.ezclocker.ezUi.ezSetContent(
                    `${dialogId}_DialogMessage`,
                    EzString.stringOrEmpty(message));

                let ezDialogConfig = new EzDialogConfig(dialogId);

                ezDialogConfig.title = EzString.stringOrDefault(title, 'EzClocker Confirmation');

                if (EzNumber.isNumber(optionalWidth)) {
                    ezDialogConfig.width = optionalWidth;
                }

                if (EzNumber.isNumber(optionalHeight)) {
                    ezDialogConfig.height = optionalHeight;
                }

                ezDialogConfig.buttons = [
                    {
                        id: `${dialogId}_YesButton`,
                        text: 'Yes',
                        click: () => {
                            if (EzFunction.isFunction(onBeforeClose)) {
                                onBeforeClose();
                            }

                            return EzDialog.ezInstance.ezResolveDialogResult(
                                dialogId,
                                finished,
                                {
                                    id: dialogId,
                                    dialogStatus: EzDialog.ezInstance.YES_DIALOG_RESPONSE.dialogStatus,
                                    passThroughData: passThroughData
                                });
                        }
                    },
                    {
                        id: `${dialogId}_NoButton`,
                        text: 'No',
                        click: () => {
                            if (EzFunction.isFunction(onBeforeClose)) {
                                onBeforeClose();
                            }

                            return EzDialog.ezInstance.ezResolveDialogResult(
                                dialogId,
                                finished,
                                {
                                    id: dialogId,
                                    dialogStatus: EzDialog.ezInstance.NO_DIALOG_RESPONSE.dialogStatus,
                                    passThroughData: passThroughData
                                });
                        }
                    }
                ];

                ezDialogConfig.close = () => EzDialog.ezInstance.ezCloseDestroyAndRemoveDialog(dialogId);

                ezApi.ezclocker.ezUi.ezId(dialogId).dialog(ezDialogConfig);

                ezApi.ezclocker.ezUi.ezForceStopPageWait();

                EzDialog.ezInstance.ezShowDialog(dialogId);
            });
    }

    /**
        @public @method
        @param {undefined|null|string} title
        Default: 'EzClocker Error'
        @param {undefined|null|string} message
        Default: EzString.EMPTY
        @param {undefined|null|function} onCloseCallback
        Default: null
        @param {undefined|null|*} passThroughData
        Default: null
        @param {undefined|null|number} optionalWidth
        Default is: Default value for property width on EzDialogConfig
        @param {undefined|null|number} optionalHeight
        Default is: Default value for property height on EzDialogConfig
        @returns {Promise.resolve}
     */
    ezShowError(title, message, onCloseCallback, passThroughData, optionalWidth, optionalHeight) {
        return EzPromise.asyncAction(
            (finished) => {
                const dialogId = 'EzErrorDialog';

                if (ezApi.ezclocker.ezUi.ezElementExists(dialogId)) {
                    EzDialog.ezInstance.ezCloseDestroyAndRemoveDialog(dialogId);
                }

                ezApi.ezclocker.ezUi.ezAppendContent(
                    'body',
                    EzHtml.build`
                        <div
                            id="${dialogId}"
                            class="ezDialog-container"
                            title="${EzString.stringOrDefault(title, 'EzClocker Error')}">
                            <div
                                id="${dialogId}_LayoutTable"
                                class="ezDialog-layout-container">
                                <p
                                    id="${dialogId}_IconParagraph">
                                    <img
                                        id="${dialogId}_IconImage"
                                        class="ezDialog-icon"
                                        src="${ezApi.ezclocker.ezNavigation.ezGetPublicImagesUrl('dialog_error_32x32.png')}"/>
                                </p>
                                <div
                                    id="${dialogId}_MessageContainer"
                                    class="ezDialog-message-container">
                                    ${EzString.stringOrEmpty(message)}
                                </div>
                            </div>
                        </div>`
                    /* LEGACY
                    EzHtml.build`
                        <div
                            id="${dialogId}"
                            class="ezClockerDialog"
                            title="${EzString.stringOrDefault(title, 'EzClocker Error')}">
                            <table
                                id="${dialogId}_LayoutTable"
                                class="ezClockerDialogContent">
                                <tr
                                    id="${dialogId}_Row">
                                    <td
                                        id="${dialogId}_IconImageContainer"
                                        class="ezClockerDialogImageCell">
                                            <img
                                                id="${dialogId}_IconImage"
                                                class="ezClockerDialogImage"
                                                src="${ezApi.ezclocker.ezNavigation.ezGetPublicImagesUrl('dialog_error_32x32.png')}"/>
                                    </td>
                                    <td
                                        id="${dialogId}_MessageContainer"
                                        class="ezClockerDialogMessageCell">
                                        ${EzString.stringOrEmpty(message)}
                                    </td>
                                </tr>
                            </table>
                        </div>`
                    */);

                let ezDialogConfig = new EzDialogConfig(dialogId);

                ezDialogConfig.title = `${EzString.stringOrDefault(title, 'EzClocker Error')}`;

                if (EzObject.isValid(optionalWidth)) {
                    ezDialogConfig.width = optionalWidth;
                }

                if (EzObject.isValid(optionalHeight)) {
                    ezDialogConfig.height = optionalHeight;
                }

                ezDialogConfig.buttons = [
                    {
                        id: `${dialogId}_OkButton`,
                        text: 'OK',
                        click: () => EzDialog.ezInstance.ezCloseDialog(dialogId)
                    }
                ];

                ezDialogConfig.close = () => {
                    EzDialog.ezInstance.ezCloseDestroyAndRemoveDialog(dialogId);

                    ezApi.ezCallback(
                        onCloseCallback,
                        EzDialog.ezInstance.OK_DIALOG_RESPONSE,
                        passThroughData,
                        arguments);

                    return finished(EzDialog.ezInstance.OK_DIALOG_RESPONSE, passThroughData);
                };

                EzDialog.ezInstance.ezInitDialogWithConfig(dialogId, ezDialogConfig);

                ezApi.ezclocker.ezUi.ezForceStopPageWait();

                EzDialog.ezInstance.ezShowDialog(dialogId);
            });
    }

    /**
        @public @method
        Builds a funny generic error message to help users report the problem. Can optionally include
        stack trace details if includeStackTraceDetails param is true.
        @param {boolean} includeStackTraceDetails
        @returns {string}
     */
    ezBuildUnhandledErrorMessage(includeStackTraceDetails) {
        let em = EzHtml.build`
            EzClocker has encountered an error that the development team did not handle properly (shame on them!).
            If you wish, you can report this error via email to
            <a
                href="mailto://support@ezclocker.com">
                support@ezclocker.com
            </a>
            with the subject line "Attention: ezClocker Leadership" and a leadership team member will
            personally make sure our development team addresses the problem (even if it means they will need to
            work through the night)!
            <p>
                All joking aside, we love when customers report errors they encounter as it greatly helps us quickly
                correct errors, bugs and mistakes. Just send a quick email to
                <a
                    href="mailto://support@ezclocker.com>
                    support@ezclocker.com
                </a>
                and mention what you were attempting to do. Include the error message and any additional details
                reported in the error message. You can also attach any screen shot images or other data you feel might
                help the poor development team identify, reproduce, and fix the problem.
            </p>
            <p>
                Every single team member at ezClocker appologizes for the interruption of your work due to
                the error. We know you have many choices in software for your busness and we feel honored that you
                choose to use ezClocker for your business.
            <p>
                All of the ezClocker teams have a #1 goal of providing a positive and rewarding experience to our
                customers and work hard to to make sure any negative or bad experience is corrected as fast as possible.
            </p>`;

        if (EzBoolean.isTrue(includeStackTraceDetails)) {
            em = EzHtml.build`${em}
                <div class="ez-faded-error-details">
                    <p>Error Details</p>
                    If you email ezClocker support for assistance please provide any
                    information in the box below with your message.
                    <textarea
                        rows="4"
                        class="ez-faded-error-details ezFullWidthEditor ezTopMargin_2">
                        -----------------------------------------
                        | Error Stack Trace (for the ezClocker team)
                        -----------------------------------------
                        ${EzDialog.ezInstance.ezGenerateErrorStackTraceDetails()}
                    </textarea>
                </div>`;
        }

        return em;
    }

    /**
        @public @method
        Attempts to generate a stack trace from an empty JSONObject target.
        @returns {string}
     */
    ezGenerateErrorStackTraceDetails() {
        const targetObject = new EzException('Stack trace exception');

        return EzObject.hasOwnProperty(targetObject, 'stack')
            ? targetObject['stack']
            : new Error().stack;
    }

    /**
        @public @method
        Generates a url for the provided imgFileName to use in dialog UX
        @returns {string}
     */
    ezGetDialogImgUrl(imgFileName) {
        return EzString.hasLength(imgFileName)
            ? ezApi.ezclocker.ezNavigation.ezGetPublicImagesUrl(imgFileName)
            : EzDialog.ezInstance.ezDialogImageUrls.infoImageUrl;
    }

    /**
        @public @method
        Display a generic dialog for a service error response.
        @param {undefined|null|string} eTitle
        Default: 'EzClocker Error'
        @param {undefined|null|string} userErrorMessage
        Default: EzDialog.ezInstance.ezBuildUnhandledErrorMessage(false);
        @param {undefined|null|string} eResponse
        Default: null
        @param {undefined|null|string} eAdditionalDetails
        @param {undefined|null|boolean} includeStackTrace
        Default is true
        @param {undefined|null|number} optionalWidth
        Default is: 1024
        @param {undefined|null|number} optionalHeight
        Default is: 500
        @returns {Promise.resolve}
     */
    ezShowServiceResponseErrorDialog(
        eTitle = 'EzClocker Service Error',
        userErrorMessage = EzDialog.ezInstance.ezBuildUnhandledErrorMessage(false),
        eResponse = null,
        eAdditionalDetails = 'No additional details provided.',
        includeStackTrace = true,
        optionalWidth = 1024,
        optionalHeight = 500) {

        if (!EzString.hasLength(userErrorMessage)) {
            userErrorMessage = EzDialog.ezInstance.ezBuildUnhandledErrorMessage(false);
        }

        let errorResponse = EzString.EMPTY;

        let eResponseJson = EzString.EMPTY;

        if (EzObject.isValid(eResponse)) {
            let eResponseMessage = EzString.hasLength(eResponse.message)
                ? `Error reported: ${eResponse.message}`
                : EzString.EMPTY;

            let errorCodeMsg = EzObject.isValid(eResponse.errorCode)
                ? `Error code: ${eResponse.errorCode}`
                : EzString.EMPTY;

            errorResponse = EzString.hasLength(eResponseMessage) || EzString.hasLength(errorCodeMsg)
                ? EzHtml.build`
                    -----------------------------------------
                    | Error Response
                    -----------------------------------------
                    ${eResponseMessage}
                    ${errorCodeMsg}`
                : EzString.EMPTY;

            eResponseJson = EzHtml.build`
                -----------------------------------------
                | Error Response Data
                -----------------------------------------
                ${ezApi.ezToJson(eResponse, true)}`;
        }

        eAdditionalDetails = EzString.hasLength(eAdditionalDetails)
            ? EzHtml.build`
                -----------------------------------------
                | Additional Details
                -----------------------------------------
                ${eAdditionalDetails}`
            : EzString.EMPTY;

        let eStackTrace = EzBoolean.isTrue(includeStackTrace)
            ? EzHtml.build`
                -----------------------------------------
                | Error Stack Trace (for the ezClocker team)
                -----------------------------------------
                ${EzDialog.ezInstance.ezGenerateErrorStackTraceDetails()}`
            : EzString.EMPTY;

        let eDetails = EzHtml.build`
            <div
                class="ez-faded-error-details">
                <p>Error Details</p>
                If you email ezClocker support for assistance please provide any information
                in the box below with your message.
                <textarea
                    rows="22"
                    cols="60"
                    class="ez-error-message-details ezFullWidthEditor ezTopMargin_2">
                    ${errorResponse.trim()}
                    ${eAdditionalDetails.trim()}
                    ${eResponseJson.trim()}
                    ${eStackTrace.trim()}
                </textarea>
            </div>`;

        ezApi.ezclocker.ezUi.ezForceStopPageWait();

        let dialogId = 'EzServiceResponseErrorDialog';

        // Remove any existing dialog
        if (ezApi.ezElementExists(dialogId)) {
            EzDialog.ezInstance.ezCloseDestroyAndRemoveDialog(dialogId);
        }

        return EzPromise.asyncAction(
            (finished) => {
                let ezDialogConfig = new EzDialogConfig(dialogId);

                ezDialogConfig.title = eTitle;

                ezApi.ezclocker.ezUi.ezAppendContent(
                    'body',
                    EzHtml.build`
                        <div
                            id="${dialogId}"
                            class="ezClockerDialog">
                            ${userErrorMessage}
                            ${eDetails}
                        </div>`);

                ezDialogConfig.ezDialogIconUrl = EzDialog.ezInstance.ezGetDialogImgUrl(EzDialog.ezInstance.ezDialogImageUrls.errorImageUrl);

                ezDialogConfig.width = EzNumber.numberOrDefault(optionalWidth, 1024);

                ezDialogConfig.height = EzNumber.numberOrDefault(optionalHeight, 500);

                ezDialogConfig.buttons = [
                    {
                        id: `${dialogId}_OKButton`,
                        text: 'OK',
                        click: () => EzDialog.ezInstance.ezCloseDialog(dialogId)
                    }
                ];

                ezDialogConfig.close = () => {
                    EzDialog.ezInstance.ezCloseDestroyAndRemoveDialog(dialogId);
                    return finished();
                }

                EzDialog.ezInstance.ezInitDialogWithConfig(dialogId, ezDialogConfig);

                EzDialog.ezInstance.ezShowDialog(dialogId);
            });
    }

    /**
        @public @method
        Closes, destroys and removes the JQuery dialog associated with the provided dialogId
        @param {string} dialogId
     */
    ezCloseDestroyAndRemoveDialog(dialogId) {
        if (!EzString.hasLength(dialogId)) {
            throw new EzBadParamException(
                'dialogId',
                EzDialog.ezInstance,
                EzDialog.ezInstance.ezDistroyAndRemoveDialog);
        }

        if (ezApi.ezclocker.ezUi.ezElementExists(dialogId)) {
            if (ezApi.ezclocker.ezUi.ezId(dialogId).dialog('isOpen')) {
                EzDialog.ezInstance.ezCloseDialog(dialogId);
            }

            ezApi.ezclocker.ezUi.ezId(dialogId)
                .dialog('destroy')
                .remove();

            if (ezApi.ezclocker.ezUi.ezElementExists(dialogId)) {
                ezApi.ezclocker.ezUi.ezRemoveElement(dialogId);
            }
        }
    }

    /**
        @public @method
        Displays an error message dialog with an ok button.
        @param {undefiend|null|string} title
        Default: 'EzClocker Error Message'
        @param {string} message
        @param {undefined|null|string} eDetails
        Default: EzString.EMPTY
        @param {undefined|null|*} passThroughData
        Default: null
        @param {undefined|null|number} optionalWidth
        Default is: Default value for property width on EzDialogConfig
        @param {undefined|null|number} optionalHeight
        Default is: Default value for property height on EzDialogConfig
        @returns {Promise.resolve}
        A resolve only promise.
     */
    ezShowErrorDialog(eTitle, eMessage, eDetails, optionalData, optionalWidth, optionalHeight) {
        if (!EzString.hasLength(eMessage)) {
            throw new EzBadParamException(
                'eMessage',
                EzDialog.ezInstance,
                EzDialog.ezInstance.ezShowErrorDialog);
        }

        return EzPromise.asyncAction(
            (finished) => {
                if (!EzString.hasLength(eMessage)) {
                    // No message to display, simply return the optionalData
                    return finished(optionalData);
                }

                // Remove any existing dialog
                if (ezApi.ezclocker.ezUi.ezElementExists(EzDialog.ezInstance.EZ_ERROR_DIALOG_ID)) {
                    EzDialog.ezInstance.ezCloseDestroyAndRemoveDialog(EzDialog.ezInstance.EZ_ERROR_DIALOG_ID);
                }

                let ezDialogConfig = EzClockerDialog.ezCreateDialogConfig(EzDialog.ezInstance.EZ_ERROR_DIALOG_ID);

                ezDialogConfig.title = EzString.hasLength(eTitle)
                    ? eTitle
                    : 'EzClocker Error';

                if (EzNumber.isNumber(optionalWidth)) {
                    ezDialogConfig.width = optionalWidth;
                }

                if (EzNumber.isNumber(optionalWidth)) {
                    ezDialogConfig.height = optionalHeight;
                }

                ezDialogConfig.buttons = [
                    {
                        id: `${EzDialog.ezInstance.EZ_ERROR_DIALOG_ID}_OKButton`,
                        text: 'OK',
                        click: () => EzDialog.ezInstance.ezCloseDialog(EzDialog.ezInstance.EZ_ERROR_DIALOG_ID)
                    }
                ];

                ezDialogConfig.close = () => {
                    EzDialog.ezInstance.ezCloseDestroyAndRemoveDialog(EzDialog.ezInstance.EZ_ERROR_DIALOG_ID);
                    return finished();
                };

                ezDialogConfig.ezDialogIconUrl = '/public/images/icons/alert-dark-red.svg';

                ezApi.ezclocker.ezUi.ezAppendContent(
                    'body',
                    EzHtml.build`
                        <div
                            id="${EzDialog.ezInstance.EZ_ERROR_DIALOG_ID}"
                            class="ezClockerDialog">
                            <div
                                id="${EzDialog.ezInstance.EZ_ERROR_DIALOG_ID}_MessageContainer">
                                ${eMessage}
                            </div>
                            <div
                                id="${EzDialog.ezInstance.EZ_ERROR_DIALOG_ID}_DetailsContainer"
                                class="ez-error-details-container"
                                ${EzString.hasLength(eDetails) ? EzString.EMPTY : 'style="display:none"'}>
                                <textarea
                                    id="id="${EzDialog.ezInstance.EZ_ERROR_DIALOG_ID}_Details"
                                    class="ez-error-message-details">
                                    ${EzString.stringOrEmpty(eDetails)}
                                </textarea>
                            </div>
                        </div>`);

                EzDialog.ezInstance.ezInitDialogWithConfig(EzDialog.ezInstance.EZ_ERROR_DIALOG_ID, ezDialogConfig);

                ezApi.ezclocker.ezUi.ezForceStopPageWait();

                EzDialog.ezInstance.ezShowDialog(EzDialog.ezInstance.EZ_ERROR_DIALOG_ID);
            });
    }

    /**
        @protected @method
        Inject's a dynamic dialog's HTML into the EzInjectedDialogContainer's div.
        @param {string} dialogHtml
     */
    ezInjectDialogUx(dialogHtml) {
        if (!EzString.hasLength(dialogHtml)) {
            throw new EzBadParamException(
                'dialogHtml',
                EzDialog.ezInstance,
                EzDialog.ezInstance.ezInjectDialogUx);
        }

        if (!ezApi.ezclocker.ezUi.ezElementExists(EzDialog.ezInstance.EZ_INJECTED_DIALOG_CONTAINER_ID)) {
            ezApi.ezclocker.ezUi.ezAppendContent(
                'body',
                EzHtml.build`
                    <div
                        id="${EzDialog.ezInstance.EZ_INJECTED_DIALOG_CONTAINER_ID}"
                        style="display:none">
                    </div>`);
        }

        ezApi.ezclocker.ezUi.ezAppendContent(
            EzDialog.ezInstance.EZ_INJECTED_DIALOG_CONTAINER_ID,
            dialogHtml);
    }

    /**
        // TODO: Remove this method once all use is migrated
        @public @method
        Inserts a OK message dialog into the page and displays it. Reuses the existing dialog if already inserted.
        @param message
        @param resultFunction
        Returns value selected in result
        @deprecated
        Migrate to EzDialog.ezInstance.ezShowOk()
     */
    ezShowMessage(title, message, onCloseCallback, passThroughData) {
        ezApi.ezclocker.ezUi.ezForceStopPageWait();

        return EzDialog.ezInstance.ezShowOKMessage(
            title,
            message,
            passThroughData,
            null,
            null,
            onCloseCallback);
    }

    /**
        // TODO: Remove this method once all use is migrated
        @public @method
        Inserts a OK message dialog into the page and displays it. Reuses the existing dialog if already inserted.
        @param {undefined|null|string} title
        Default is: 'EzClocker Message'
        @param {string} message
        @param {undefined|null|*} passThroughData
        Default is: null
        @param {undefined|null|number} width
        Default is: Default value for property width on EzDialogConfig
        @param {undefined|null|number} height
        Default is: Default value for property height on EzDialogConfig
        @param {undefined|null|function} onCloseCallback
        Default is: null
        @param {undefined|null|boolean} forceStopWait
        Default is: false
        @param resultFunction
        Returns value selected in result
        @returns {Promise.resolve}
        @deprecated
        Migrate to EzDialog.ezInstance.ezShowOk()
     */
    ezShowOKMessage(title, message, passThroughData, width, height, onCloseCallback, forceStopWait) {
        if (!EzString.hasLength(message)) {
            throw new EzBadParamException(
                'message',
                EzDialog.ezInstance,
                EzDialog.ezInstance.ezShowOKMessage);
        }

        return EzPromise.asyncAction(
            (finished) => {
                const showOkMessageDialogId = 'EzOkMessageDialog';

                if (ezApi.ezclocker.ezUi.ezElementExists(showOkMessageDialogId)) {
                    EzDialog.ezInstance.ezCloseDestroyAndRemoveDialog(showOkMessageDialogId);
                }

                let ezDialogConfig = new EzDialogConfig(showOkMessageDialogId);

                /* TODO: Finish conversion of the dialog to using grid layout
                ezApi.ezclocker.ezUi.ezAppendContent(
                    'body',
                    EzHtml.build`
                        <div
                            id="${showOkMessageDialogId}"
                            class="ezDialogs-content-container"
                            title="${EzString.stringOrDefault(title, 'EzClocker Message')}">
                            <div
                                id="${showOkMessageDialogId}_InfoImageContainer"
                                class="ezDialogs-left-info-image-container"
                            </div>
                            <div
                                id="${showOkMessageDialogId}_MessageContentContainer"
                                class="ezDialogs-right-message-container">
                            </div>
                        </div>`);
                */

                ezApi.ezclocker.ezUi.ezAppendContent(
                    'body',
                    EzHtml.build`
                        <div
                            id="${showOkMessageDialogId}"
                            class="ezClockerDialog"
                            title="${EzString.stringOrDefault(title, 'EzClocker Message')}">
                            <table
                                id="${showOkMessageDialogId}_LayoutTable"
                                class="ezClockerDialogContent">
                                <tr
                                    class="ezDialog-table-row-no-border">
                                    <td
                                        id="${showOkMessageDialogId}_IconImageContainer"
                                        class="ezClockerDialogImageCell">
                                        <img
                                            id="${showOkMessageDialogId}_IconImage"
                                            class="ezClockerDialogImage"
                                            src="${EzDialog.ezInstance.ezDialogImageUrls.infoImageUrl}"/>
                                    </td>
                                    <td
                                        id="${showOkMessageDialogId}_MessageContentContainer" class="ezClockerDialogMessageCell">
                                        ${EzString.stringOrEmpty(message)}
                                    </td>
                                </tr>
                            </table>
                        </div>`);

                ezDialogConfig.title = EzString.stringOrDefault(title, 'EzClocker Message');

                if (EzNumber.isNumber(width)) {
                    ezDialogConfig.width = width;
                }

                if (EzNumber.isNumber(height)) {
                    ezDialogConfig.height = height;
                }

                ezDialogConfig.buttons = [
                    {
                        id: `${showOkMessageDialogId}_OkButton`,
                        text: 'OK',
                        click: () => EzDialog.ezInstance.ezCloseDialog(showOkMessageDialogId)
                    }
                ];

                ezDialogConfig.close = () => {
                    EzDialog.ezInstance.ezCloseDestroyAndRemoveDialog(showOkMessageDialogId);

                    if (EzFunction.isFunction(onCloseCallback)) {
                        onCloseCallback(passThroughData);
                    }

                    return finished(passThroughData);
                }

                EzDialog.ezInstance.ezInitDialogWithConfig(showOkMessageDialogId, ezDialogConfig);

                if (forceStopWait) {
                    ezApi.ezclocker.ezUi.ezForceStopPageWait();
                }

                EzDialog.ezInstance.ezShowDialog(showOkMessageDialogId);
            });
    }

    /**
        Inserts a OK message dialog into the page and displays it. Reuses the existing dialog if already inserted.
        @param {undefined|null|string} title
        Default: 'EzClocker Message'
        @param {string} message
        @param {undefined|null|*} passThroughData
        Default: null
        @param {undefined|null|number} optionalWidth
        Default: Default width for EzDialogConfig
        @param {undefined|null|number} optionalHeight
        Default: Default height for EzDialogConfig
        @param {undefined|null|boolean} optionalForceStopSpinner
        Default: false
        @param resultFunction
        Returns value selected in result
        @returns {Promise.resolve}
     */
    ezShowNonModalOKMessage(title, message, passThroughData, optionalWidth, optionalHeight, optionalForceStopSpinner) {
        if (!EzString.hasLength(message)) {
            throw new EzBadParamException(
                'message',
                EzDialog.ezInstance,
                EzDialog.ezInstance.ezShowNonModalOKMessage);
        }

        return ezApi.ezPromise(
            (resolve) => {
                const ezNonModalOKMessageDialogId = 'EzNonModalOKMessageDialogId';

                if (ezApi.ezclocker.ezUi.ezElementExists(ezNonModalOKMessageDialogId)) {
                    EzDialog.ezInstance.ezCloseDestroyAndRemoveDialog(ezNonModalOKMessageDialogId);
                }

                let ezDialogConfig = new EzDialogConfig(ezNonModalOKMessageDialogId);

                ezDialogConfig.title = title;

                if (EzNumber.isNumber(optionalWidth)) {
                    ezDialogConfig.width = optionalWidth;
                }

                if (EzNumber.isNumber(optionalHeight)) {
                    ezDialogConfig.height = optionalHeight;
                }

                ezDialogConfig.buttons = [
                    {
                        id: `${ezNonModalOKMessageDialogId}_OkButton`,
                        text: 'OK',
                        click: () => EzDialog.ezInstance.ezCloseDialog(ezNonModalOKMessageDialogId)
                    }
                ];

                ezDialogConfig.close = () => {
                    EzDialog.ezInstance.ezCloseDestroyAndRemoveDialog(ezNonModalOKMessageDialogId)
                    return resolve(passThroughData);
                }

                ezApi.ezclocker.ezUi.ezAppendContent(
                    'body',
                    EzHtml.build`
                        <div
                            id="${ezNonModalOKMessageDialogId}"
                            class="ezClockerDialog">
                            <table
                                id="${ezNonModalOKMessageDialogId}_LayoutTable"
                                class="ezClockerDialogContent">
                                <tr>
                                    <td
                                        id="${ezNonModalOKMessageDialogId}_IconImageContainer"
                                        class="ezClockerDialogImageCell">
                                        <img
                                            id="${ezNonModalOKMessageDialogId}_IconImage"
                                            class="ezClockerDialogImage"
                                            src="${EzDialog.ezInstance.ezDialogImageUrls.infoImageUrl}"/>
                                    </td>
                                    <td
                                        id="${ezNonModalOKMessageDialogId}_ContentContainer"
                                        class="ezClockerDialogMessageCell">
                                        ${message}
                                    </td>
                                </tr>
                            </table>
                        </div>`);

                EzDialog.ezInstance.ezInitDialogWithConfig(ezNonModalOKMessageDialogId, ezDialogConfig);

                if (EzBoolean.isTrue(optionalForceStopSpinner)) {
                    ezApi.ezclocker.ezUi.ezForceStopPageWait();
                }

                EzDialog.ezInstance.ezShowDialog(ezNonModalOKMessageDialogId)
            });
    }

    /**
        @public @method
        Inserts a OK message dialog into the page and displays it. Reuses the existing dialog if already inserted.
        @param {undefined|null|string} title
        Default: 'EzClocker Message'
        @param {undefined|null|string} message
        Default: EzString.EMPTY
        @param {undefined|null|*} passThroughData
        Default: null
        @param {undefined|null|number} optionalWidth
        Default: Default value for EzDialogConfig width property
        @param {undefined|null|number} optionalHeight
        Default: Default value for EzDialogConfig height property
        @returns {Promise.resolve}
     */
    ezShowOK(title, message, passThroughData, optionalWidth, optionalHeight) {
        return EzPromise.asyncAction(
            (finished) => {
                let dialogId = 'EzOkDialog';

                if (ezApi.ezclocker.ezUi.ezElementExists(dialogId)) {
                    EzDialog.ezInstance.ezCloseDestroyAndRemoveDialog(dialogId);
                }

                ezApi.ezclocker.ezUi.ezAppendContent(
                    'body',
                    EzHtml.build`
                        <div
                            id="${dialogId}">
                            <table
                                id="${dialogId}LayoutTable"
                                class="ezClockerDialogContent">
                                <tr>
                                    <td
                                        id="${dialogId}ImageContainer"
                                        class="ezClockerDialogImageCell">
                                        <img
                                            id="${dialogId}Image"
                                            class="ezClockerDialogImage"
                                            src="${EzDialog.ezInstance.ezDialogImageUrls.infoImageUrl}"/>
                                    </td>
                                    <td
                                        id="${dialogId}MessageContainer" class="ezClockerDialogMessageCell">
                                        ${EzString.stringOrEmpty(message)}
                                    </td>
                                </tr>
                            </table>
                        </div>`);

                let ezDialogConfig = new EzDialogConfig(dialogId);

                ezDialogConfig.title = EzString.stringOrDefault(title, 'EzClocker Message');

                if (EzNumber.isNumber(optionalWidth)) {
                    ezDialogConfig.width = optionalWidth;
                }

                if (EzNumber.isNumber(optionalHeight)) {
                    ezDialogConfig.height = optionalHeight;
                }

                ezDialogConfig.buttons = [
                    {
                        id: `${dialogId}_OKButton`,
                        text: 'OK',
                        click: () => EzDialog.ezInstance.ezCloseDialog(dialogId)
                    }
                ];

                ezDialogConfig.close = () => {
                    EzDialog.ezInstance.ezCloseDestroyAndRemoveDialog(dialogId);

                    return finished(passThroughData);
                }

                ezApi.ezclocker.ezUi.ezId(dialogId).dialog(ezDialogConfig);

                ezApi.ezclocker.ezUi.ezForceStopPageWait();

                EzDialog.ezInstance.ezShowDialog(dialogId);
            });
    }

    /**
        @public @method
        Inserts a OK message dialog with the warning icon into the page and displays it.
        Reuses the existing dialog if already inserted.
        @param {undefined|null|string} title
        Default: 'EzClocker Message'
        @param {undefined|null|string} message
        Default: EzString.EMPTY
        @param {undefined|null|*} passThroughData
        Default: null
        @param {undefined|null|number} optionalWidth
        Default: Default value for EzDialogConfig width property
        @param {undefined|null|number} optionalHeight
        Default: Default value for EzDialogConfig height property
        @returns {Promise.resolve}
     */
    ezShowWarning(title, message, passThroughData, optionalWidth, optionalHeight) {
        return EzPromise.asyncAction(
            (finished) => {
                let dialogId = 'EzWarningDialog';

                if (ezApi.ezclocker.ezUi.ezElementExists(dialogId)) {
                    EzDialog.ezInstance.ezCloseDestroyAndRemoveDialog(dialogId);
                }

                ezApi.ezclocker.ezUi.ezAppendContent(
                    'body',
                    EzHtml.build`
                        <div
                            id="${dialogId}">
                            <table
                                id="${dialogId}LayoutTable"
                                class="ezClockerDialogContent">
                                <tr>
                                    <td
                                        id="${dialogId}ImageContainer"
                                        class="ezClockerDialogImageCell">
                                        <img
                                            id="${dialogId}Image"
                                            class="ezClockerDialogImage"
                                            src="${EzDialog.ezInstance.ezDialogImageUrls.warnImageUrl}"/>
                                    </td>
                                    <td
                                        id="${dialogId}MessageContainer" class="ezClockerDialogMessageCell">
                                        ${EzString.stringOrEmpty(message)}
                                    </td>
                                </tr>
                            </table>
                        </div>`);

                let ezDialogConfig = new EzDialogConfig(dialogId);

                ezDialogConfig.title = EzString.stringOrDefault(title, 'EzClocker Warning');

                if (EzNumber.isNumber(optionalWidth)) {
                    ezDialogConfig.width = optionalWidth;
                }

                if (EzNumber.isNumber(optionalHeight)) {
                    ezDialogConfig.height = optionalHeight;
                }

                ezDialogConfig.buttons = [
                    {
                        id: `${dialogId}_OKButton`,
                        text: 'OK',
                        click: () => EzDialog.ezInstance.ezCloseDialog(dialogId)
                    }
                ];

                ezDialogConfig.close = () => {
                    EzDialog.ezInstance.ezCloseDestroyAndRemoveDialog(dialogId);

                    return finished(passThroughData);
                }

                ezApi.ezclocker.ezUi.ezId(dialogId).dialog(ezDialogConfig);

                ezApi.ezclocker.ezUi.ezForceStopPageWait();

                EzDialog.ezInstance.ezShowDialog(dialogId);
            });
    }

    /**
        @public @method
        Inserts a OK message dialog into the page and displays it. Reuses the existing dialog if already inserted.
        @param {undefined|null|string} title
        Default: 'Accept or Decline'
        @param {undefined|null|string} message
        Default: EzString.EMPTY
        @param {undefined|null|*} passThroughData
        Default: null
        @param {undefined|null|number} optionalWidth
        Default: Default value for EzDialogConfig width property
        @param {undefined|null|number} optionalHeight
        Default: Default value for EzDialogConfig height property
        @returns {Promise.resolve}
     */
    ezShowAgreeDeclineMessageDialog(title, message, passThroughData, optionalWidth, optionalHeight) {
        return EzPromise.asyncAction(
            (finished) => {
                let dialogId = 'EzAgreeDeclineMessageDialog';

                if (ezApi.ezclocker.ezUi.ezElementExists(dialogId)) {
                    EzDialog.ezInstance.ezCloseDestroyAndRemoveDialog(dialogId);
                }

                ezApi.ezclocker.ezUi.ezAppendContent(
                    'body',
                    EzHtml.build`
                        <style id="${dialogId}_Styles">
                            .hideTopRightCloseButton .ui-dialog-titlebar-close {
                                display: none;
                            }
                        </style>
                        <div
                            id="${dialogId}"
                            title="${EzString.stringOrDefault(title, 'Accept or Decline')}">
                            <table
                                id="${dialogId}_LayoutTable"
                                class="ezClockerDialogContent">
                                <tr>
                                    <td
                                        id="${dialogId}_ImageContainer"
                                        class="ezClockerDialogImageCell">
                                        <img
                                            id="${dialogId}_Image"
                                            class="ezClockerDialogImage"
                                            src="${EzDialog.ezInstance.ezDialogImageUrls.infoImageUrl}"/>
                                    </td>
                                    <td
                                        id="${dialogId}_MessageContainer"
                                        class="ezClockerDialogMessageCell">
                                        ${EzString.stringOrEmpty(message)}
                                    </td>
                                </tr>
                            </table>
                        </div>`);

                let ezDialogConfig = new EzDialogConfig(dialogId);

                ezDialogConfig.title = EzString.stringOrDefault(title, 'Accept or Decline');

                ezDialogConfig.dialogClass = `${ezDialogConfig.dialogClass} hideTopRightCloseButton`;

                ezDialogConfig.closeOnEscape = false;

                if (EzNumber.isNumber(optionalWidth)) {
                    ezDialogConfig.width = optionalWidth;
                }

                if (EzNumber.isNumber(optionalHeight)) {
                    ezDialogConfig.height = optionalHeight;
                }

                ezDialogConfig.buttons = [
                    {
                        id: `${dialogId}_AcceptButton`,
                        text: 'Agree',
                        click: () => {
                            EzDialog.ezInstance.ezCloseDialog(dialogId);

                            return finished(
                                EzDialogResponse.build(
                                    dialogId,
                                    EzDialogResponseStatus.AGREE,
                                    passThroughData));
                        }
                    },
                    {
                        id: `${dialogId}_DeclineButton`,
                        text: 'Decline',
                        click: () => {
                            EzDialog.ezInstance.ezCloseDialog(dialogId);

                            return finished(
                                EzDialogResponse.build(
                                    dialogId,
                                    EzDialogResponseStatus.DECLINE,
                                    passThroughData));
                        }
                    }
                ];

                ezDialogConfig.open = (event, ui) => {
                    // Remove the actual button
                    $('.hideTopRightCloseButton', ui).remove();
                };

                ezDialogConfig.close = () => EzDialog.ezInstance.ezCloseDestroyAndRemoveDialog(dialogId);

                ezApi.ezclocker.ezUi.ezId(dialogId).dialog(ezDialogConfig);

                ezApi.ezclocker.ezUi.ezForceStopPageWait();

                EzDialog.ezInstance.ezShowDialog(dialogId);
            });
    }

    /**
     * @public @method
     * Inserts a OK message dialog into the page and displays it. Reuses the existing dialog if already inserted.
     * @param {undefined|null|string} title
     * Default: 'EzClocker Message'
     * @param {undefined|null|string} message
     * Default: EzString.EMPTY
     * @param {undefined|null|function} onCloseCallback
     * Default: null
     * @param {undefined|null|*} passThroughData
     * Default: null
     * @param {undefined|null|number} optionalWidth
     * Default: Default value for EzDialogConfig width property
     * @param {undefined|null|number} optionalHeight
     * Default: Default value for EzDialogConfig height property
     * @param {undefined|null|boolean} useOldResponse
     * Default: false
     * @param resultFunction
     * Returns value selected in result
     * @returns {Promise.resolve}
     */
    ezOkCancelMessage(title, message, onCloseCallback, passThroughData, optionalWidth, optionalHeight, useOldResponse) {
        return EzPromise.asyncAction(
            (finished) => {
                let dialogId = 'EzOkCancelDialog';

                if (ezApi.ezclocker.ezUi.ezElementExists(dialogId)) {
                    EzDialog.ezInstance.ezCloseDestroyAndRemoveDialog(dialogId);
                }

                ezApi.ezclocker.ezUi.ezAppendContent(
                    'body',
                    EzHtml.build`
                        <div
                            id="${dialogId}"
                            title="${EzString.stringOrDefault(title, 'EzClocker Message')}">
                            <table
                                id="${dialogId}_LayoutTable"
                                class="ezClockerDialogContent">
                                <tr>
                                    <td
                                        id="${dialogId}_IconImageContainer"
                                        class="ezClockerDialogImageCell">
                                        <img
                                            id="${dialogId}_IconImage"
                                            class="ezClockerDialogImage"
                                            src="${EzDialog.ezInstance.ezDialogImageUrls.questionImageUrl}"/>
                                    </td>
                                    <td
                                        id="${dialogId}_MessageContainer"
                                        class="ezClockerDialogMessageCell">
                                        ${EzString.stringOrEmpty(message)}
                                    </td>
                                </tr>
                            </table>
                        </div>`);

                let ezDialogConfig = new EzDialogConfig(dialogId);

                if (EzObject.isValid(optionalWidth)) {
                    ezDialogConfig.width = optionalWidth
                }

                if (EzObject.isValid(optionalHeight)) {
                    ezDialogConfig.height = optionalHeight
                }

                ezDialogConfig.buttons = [
                    {
                        id: `${dialogId}_OkButton`,
                        text: 'OK',
                        click: () => {
                            EzDialog.ezInstance.ezCloseDialog(dialogId);

                            if (ezApi.isFunction(onCloseCallback)) {
                                if (EzBoolean.isTrue(useOldResponse)) {
                                    onCloseCallback('OK');
                                } else {
                                    onCloseCallback(EzDialog.ezInstance.OK_DIALOG_RESPONSE, passThroughData);
                                }
                            }

                            return finished(EzDialog.ezInstance.OK_DIALOG_RESPONSE, passThroughData);
                        }
                    },
                    {
                        id: `${dialogId}_CancelButton`,
                        text: 'Cancel',
                        click: () => {
                            EzDialog.ezInstance.ezCloseDialog(dialogId);

                            if (ezApi.isFunction(onCloseCallback)) {
                                if (ezApi.isTrue(useOldResponse)) {
                                    onCloseCallback('CANCEL');
                                } else {
                                    onCloseCallback(EzDialog.ezInstance.CANCEL_DIALOG_RESPONSE, passThroughData);
                                }
                            }

                            return finished(EzDialog.ezInstance.CANCEL_DIALOG_RESPONSE, passThroughData);
                        }
                    }
                ];

                ezDialogConfig.close = () => EzDialog.ezInstance.ezCloseDestroyAndRemoveDialog(dialogId);

                ezApi.ezclocker.ezUi.ezId(dialogId).dialog(ezDialogConfig);

                EzDialog.ezInstance.ezShowDialog(dialogId, true);
            });
    }

    /**
     * @public @method
     * Inserts a OK message dialog into the page and displays it. Reuses the existing dialog if already inserted.
     * @param {undefined|null|string} title
     * Default: 'EzClocker Message'
     * @param {undefined|null|string} message
     * Default: EzString.EMPTY
     * @param {undefined|null|function} onCloseCallback
     * Default: null
     * @param {undefined|null|*} passThroughData
     * Default: null
     * @param {undefined|null|number} optionalWidth
     * Default: Default value for EzDialogConfig width property
     * @param {undefined|null|number} optionalHeight
     * Default: Default value for EzDialogConfig height property
     * @returns {Promise.resolve}
     */
    ezConfirmationDialog(title, message, passThroughData, optionalWidth, optionalHeight) {
        return EzPromise.asyncAction(
            (finished) => {
                let dialogId = 'EzConfirmationDialog';

                if (ezApi.ezclocker.ezUi.ezElementExists(dialogId)) {
                    EzDialog.ezInstance.ezCloseDestroyAndRemoveDialog(dialogId);
                }

                ezApi.ezclocker.ezUi.ezAppendContent(
                    'body',
                    EzHtml.build`
                        <div
                            id="${dialogId}"
                            title="${EzString.stringOrDefault(title, 'Confirm')}">
                            <table
                                id="${dialogId}_LayoutTable"
                                class="ezClockerDialogContent">
                                <tr>
                                    <td
                                        id="${dialogId}_IconImageContainer"
                                        class="ezClockerDialogImageCell">
                                        <img
                                            id="${dialogId}_IconImage"
                                            class="ezClockerDialogImage"
                                            src="${EzDialog.ezInstance.ezDialogImageUrls.questionImageUrl}"/>
                                    </td>
                                    <td
                                        id="${dialogId}_MessageContainer"
                                        class="ezClockerDialogMessageCell">
                                        ${EzString.stringOrEmpty(message)}
                                    </td>
                                </tr>
                            </table>
                        </div>`);

                let ezDialogConfig = new EzDialogConfig(dialogId);

                if (EzObject.isValid(optionalWidth)) {
                    ezDialogConfig.width = optionalWidth
                }

                if (EzObject.isValid(optionalHeight)) {
                    ezDialogConfig.height = optionalHeight
                }

                ezDialogConfig.buttons = [
                    {
                        id: `${dialogId}_ConfirmationButton`,
                        text: 'OK',
                        click: () => {
                            EzDialog.ezInstance.ezCloseDialog(dialogId);

                            return finished(EzDialog.ezInstance.CONFIRM_DIALOG_RESPONSE, passThroughData);
                        }
                    },
                    {
                        id: `${dialogId}_CancelButton`,
                        text: 'Cancel',
                        click: () => {
                            EzDialog.ezInstance.ezCloseDialog(dialogId);

                            return finished(EzDialog.ezInstance.CANCEL_DIALOG_RESPONSE, passThroughData);
                        }
                    }
                ];

                ezDialogConfig.close = () => EzDialog.ezInstance.ezCloseDestroyAndRemoveDialog(dialogId);

                ezApi.ezclocker.ezUi.ezId(dialogId).dialog(ezDialogConfig);

                EzDialog.ezInstance.ezShowDialog(dialogId, true);
            });
    }

    /**
        @public @method
        Displays an OK and Cancel dialog
        @param {undefined|null|string} title
        Default: 'EzClocker Message'
        @param {undefined|null|string} message
        Default: EzString.EMPTY
        @param {undefined|null|*} passThroughData
        Default: null
        @param {undefined|null|number} optionalWidth
        Default: Default value for EzDialogConfig width property
        @param {undefined|null|number} optionalHeight
        Default: Default value for EzDialogConfig height property
        @returns {Promise.resolve}
     */
    ezOkCancel(title, message, passThroughData, optionalWidth, optionalHeight) {
        return EzPromise.asyncAction(
            (finished) => {
                ezApi.ezclocker.ezUi.ezForceStopPageWait();

                let ezOkCancelDialogId = 'EzOkCancelDialog';

                if (ezApi.ezclocker.ezUi.ezElementExists(ezOkCancelDialogId)) {
                    EzDialog.ezInstance.ezCloseDestroyAndRemoveDialog(ezOkCancelDialogId);
                }

                ezApi.ezclocker.ezUi.ezAppendContent(
                    EzHtml.build`
                        <div
                            id="${ezOkCancelDialogId}"
                            title="${EzString.stringOrDefault(title, 'EzClocker Message')}">
                            <table
                                id="${ezOkCancelDialogId}_LayoutTable"
                                class="ezClockerDialogContent">
                                <tr>
                                    <td
                                        id="${ezOkCancelDialogId}_ImageCell"
                                        class="ezClockerDialogImageCell">
                                        <img
                                            id="${ezOkCancelDialogId}_Image"
                                            class="ezClockerDialogImage"
                                            src="${EzDialog.ezInstance.ezDialogImageUrls.infoImageUrl}"/>
                                    </td>
                                    <td
                                        id="${ezOkCancelDialogId}_DialogMessage"
                                        class="ezClockerDialogMessageCell">
                                        ${EzString.stringOrEmpty(message)}
                                    </td>
                                </tr>
                            </table>
                        </div>`);

                let ezDialogConfig = new EzDialogConfig(ezOkCancelDialogId);

                if (EzNumber.isNumber(optionalHeight)) {
                    ezDialogConfig.height = optionalHeight;
                }
                if (EzNumber.isNumber(optionalWidth)) {
                    ezDialogConfig.width = optionalWidth;
                }

                ezDialogConfig.buttons = [
                    {
                        id: `${ezOkCancelDialogId}_OkButton`,
                        text: 'OK',
                        click: () => {
                            EzDialog.ezInstance.ezCloseDialog(ezOkCancelDialogId);

                            return finished(
                                {
                                    ezDialogResponse: EzDialog.ezInstance.OK_DIALOG_RESPONSE,
                                    ezPassThroughData: passThroughData
                                });
                        }
                    },
                    {
                        id: `${ezOkCancelDialogId}_CancelButton`,
                        text: 'Cancel',
                        click: () => {
                            EzDialog.ezInstance.ezCloseDialog(ezOkCancelDialogId);

                            return finished(
                                {
                                    ezDialogResponse: EzDialog.ezInstance.CANCEL_DIALOG_RESPONSE,
                                    ezPassThroughData: passThroughData
                                });
                        }
                    }
                ];

                ezDialogConfig.close = () => EzDialog.ezInstance.ezCloseDestroyAndRemoveDialog(ezOkCancelDialogId);

                ezApi.ezclocker.ezUi.ezId(ezOkCancelDialogId).dialog(ezDialogConfig);

                EzDialog.ezInstance.ezShowDialog(ezOkCancelDialogId);
            });
    }

    /**
        @public @method
        Performs the dialog button's click action (if available) and then closes the dialog.
        @param {string} aDialogId
        @param {Function|null} originalClick
     */
    ezHandleCustomButtonClick(aDialogId, originalClick) {
        if (!EzString.hasLength(aDialogId)) {
            throw new EzBadParamException(
                'aDialogId',
                EzDialog.ezInstance,
                EzDialog.ezInstance.ezHandleCustomButtonClick);
        }

        return () => {
            if (EzFunction.isFunction(originalClick)) {
                originalClick();
            }

            if (ezApi.ezclocker.ezUi.ezElementExists(aDialogId)) {
                ezApi.ezclocker.ezCloseDialog(aDialogId);
            }
        };
    }

    /**
        @public @method
        Injects a pop-up information dialog that allows the caller to specify the action buttons.
        @param {string} title
        @param {string} content
        @param {Array} customButtons
        Example of customButtons object: customButtons = [{
            id: "MyDialogButtonId",
            text: "Button Text",
            click: function() { // Handler for the click of the button }
        }]
        @param {string} parentContainerId
        @param {Number|null} width
        @param {Number|null} height
     */
    ezActionDialog(title, content, customButtons, parentContainerId, width, height, dialogId) {
        dialogId = EzString.hasLength(dialogId)
            ? dialogId
            : `EzActionDialog`;

        parentContainerId = EzString.hasLength(parentContainerId)
            ? parentContainerId
            : '_HideDialogsDiv';

        customButtons = EzArray.isArray(customButtons)
            ? customButtons
            : [
                {
                    id: `${dialogId}_OKButton`,
                    text: 'OK',
                    click: EzDialog.ezInstance.ezCloseDialog(dialogId)
                }
            ];

        ezApi.ezclocker.ezUi.ezAppendContent(
            parentContainerId,
            EzHtml.build`
                <div
                    id="${dialogId}"
                    class="ezClockerDialog">
                    <table
                        id="${dialogId}_LayoutTable"
                        class="ezClockerDialogContent">
                        <tr>
                            <td
                                id="${dialogId}_IconCell"
                                class="ezClockerDialogImageCell">
                                <img
                                    id="${dialogId}_Icon"
                                    class="ezClockerDialogImage"
                                    src="${EzDialog.ezInstance.ezDialogImageUrls.infoImageUrl}"/>
                            </td>
                            <td
                                id="${dialogId}_ContentCell"
                                class="ezClockerDialogMessageCell">
                                ${EzString.stringOrEmpty(content)}
                            </td>
                        </tr>
                    </table>
                </div>`);

        let ezDialogConfig = new EzDialogConfig(dialogId);

        ezDialogConfig.title = title;

        ezDialogConfig.buttons = customButtons;

        if ('auto' === width || EzNumber.isNumber(width)) {
            ezDialogConfig.width = width;
        }

        if ('auto' === height ||EzNumber.isNumber(height)) {
            ezDialogConfig.height = height;
        }

        ezDialogConfig.close = () => EzDialog.ezInstance.ezCloseDestroyAndRemoveDialog(dialogId);

        EzDialog.ezInstance.ezInitDialogWithConfig(dialogId, ezDialogConfig);

        EzDialog.ezInstance.ezShowDialog(dialogId);
    }

    /**
        @public @method
        Shows a non-modal ok dialog with the tip text.
        @param {undefined|null|string} title
        Default is: 'EzClocker Message'
        @param {undefined|null|string} tipType
        Accepted values: EzDialog.ezInstance.EMPLOYEE_INVITE_TIP,  EzDialog.ezInstance.EMPLOYEE_PIN_TIP
        @returns {Promise.resolve}
     */
    ezShowTip(title, tipType) {
        if (tipType === EzDialog.ezInstance.EMPLOYEE_INVITE_TIP) {
            return EzDialog.ezInstance.ezShowNonModalOKMessage(
                title,
                EzDialog.ezInstance.getEmployeeInviteTip());
        }
        if (tipType === EzDialog.ezInstance.EMPLOYEE_PIN_TIP) {
            return EzDialog.ezInstance.ezShowNonModalOKMessage(
                title,
                EzDialog.ezInstance.getEmployeePINNumberTip());
        }

        throw new EzBadParamException(
            'tipType',
            EzDialog.ezInstance,
            EzDialog.ezInstance.showTip);
    }

    /**
        TODO: Remove this method once all use is migrated
        @public @method
        Shows a non-modal ok dialog with the tip text.
        @param {undefined|null|string} title
        Default is: 'EzClocker Message'
        @param {undefined|null|string} tipType
        Accepted values: EzDialog.ezInstance.EMPLOYEE_INVITE_TIP,  EzDialog.ezInstance.EMPLOYEE_PIN_TIP
        @returns {Promise.resolve}
        @deprecated
        Will get removed in a future release.
        Migrate to: ezApi.ezclocker.ezDialog.ezShowTip(title, tipType)
     */
    showTip(title, tipType) {
        return EzDialog.ezInstance.ezShowTip(title, tipType);
    }

    /**
        @public @method
        Generates employee invitation tip HTML
        @returns {string}
     */
    getEmployeeInviteTip() {
        return EzHtml.build`
            <p
                class="font-size:12pt;">
                When you invite employees to ezClocker they receive an email or text message stating that your
                business is inviting them to use ezClocker to track their time. The message will contain a web link
                that will take the employee to the ezClocker sign-up screen where they will create a password for their
                new account. After accepting the invite and entering their password ezClocker will allow them to login
                and start tracking their time with either the mobile app or the website.
            </p>
            <p
                class="font-size:12pt;">
                Invites can expire if the employee takes more than a day to accept the invite.
                If this happens, you can re-invite the employee from your employer dashboard.
            </p>
            <p
                class="font-size:12pt;">
                Finally, ezClocker restricts invites to new users (as determined by email address or phone number).
                If the employee you invite already has an ezClocker account or you attempt to invite yourself
                (as the employer) you will receive a message stating that the account already exists. To continue,
                either enter a different email address or phone number. You can also contact ezClocker support at
                <a href="mailto:support@ezclocker.com">support@ezclocker.com</a> to get help resetting or converting
                an existing account.
            </p>`;
    }

    /**
        @public @method
        Generates employee PIN number tip html.
        @returns {string}
     */
    getEmployeePINNumberTip() {
        return EzHtml.build`
            <p
                class="font-size:12pt;">
                If you want to use one device for your employees at a job site then you can use our
                ezClocker Kiosk App built for the tablets. Employees can sign in using a 4 digit PIN number.
                The employer can also use the app to view employees’ timesheets, adjust time entries and email
                time clocks.
            </p>`;
    }

    /**
        // TODO: Remove method after all use is migrated to a different solution
        @public @method
        @deprecated
        DO NOT USE
        Will remove in future release
     */
    ezClockerMessageDialog(message, resultFunction, title, dialogWidth, dialogHeight) {
        ezApi.ezclocker.ezUi.ezForceStopPageWait();

        EzDialog.ezInstance.ezShowMessage(
            title,
            message,
            resultFunction,
            null,
            dialogWidth,
            dialogHeight,
            true);
    }

    /**
        // TODO: Remove method after all use is migrated to a different solution
        @public @method
        @deprecated
        DO NOT USE
        Will remove in future release
     */
    ezClockerYesNoDialog(imagePrefix, message, resultFunction, title, dialogWidth, dialogHeight) {
        ezApi.ezclocker.ezUi.ezForceStopPageWait();

        ezApi.ezclocker.logger.dep(
            'EzDialog.ezInstance.ezClockerYesNoDialog',
            'EzDialog.ezInstance.ezClockerYesNo()',
            'ezclocker-dialog-helper.js');

        return EzDialog.ezInstance.ezYesNoDialog(
            title,
            message,
            resultFunction,
            dialogWidth,
            dialogHeight,
            true);
    }

    /**
        @public @method
        Returns the id the element that is used to hold injected dialog HTML
        @returns {string}
     */
    ezGetInjectedDialogParentId() {
        if (ezApi.ezclocker.ezUi.ezElementExists(EzDialog.ezInstance.EZ_INJECTED_DIALOG_CONTAINER_ID)) {
            return EzDialog.ezInstance.EZ_INJECTED_DIALOG_CONTAINER_ID;
        }

        // Legacy parent ids
        if (ezApi.ezclocker.ezUi.ezElementExists('EzHiddenDialogs')) {
            return 'EzHiddenDialogs';
        }

        if (ezApi.ezclocker.ezUi.ezElementExists('EzHiddenDialogs')) {
            return 'EzHiddenDialogs';
        }

        if (ezApi.ezclocker.ezUi.elementExist('_HideDialogsDiv')) {
            return '_HideDialogsDiv';
        }
    }

    /**
        // TODO: Remove this method once all use has migrated
        @public @method
        Displays an error dialog, relating to error results from API calls.
        @param {undefined|null|object} eResponse
        @param {undefined|null|string} eTitle
        @param {undefined|null|string} eMessage
        @param {undefined|null|string} userMessage
        @param {undefined|null|*} optionalData
        @returns {Promise.resolve}
        @deprecated
        Migrate to one of the following:
            ezApi.ezclocker.ezDialog.ezShowServiceResponseErrorDialog(
                eTitle,
                userErrorMessage,
                eResponse,
                eAdditionalDetails,
                includeStackTrace,
                eDialogOptionalWidth,
                eDialogOptionalHeight)

            ezApi.ezclocker.ezDialog.ezShowErrorWithDetails(
                eTitle,
                eMessage,
                eDetails);
     */
    ezShowApiResponseError(eResponse, eTitle, eMessage, userMessage, optionalData) {
        if (!EzString.hasLength(eTitle)) {
            eTitle = 'EzClocker Unexpected Error';
        }

        let eDetails = EzObject.isValid(eResponse)
            ? `[Error details: ${ezApi.ezToJson(eResponse)}]`
            : EzString.EMPTY;

        if (!EzString.hasLength(eMessage)) {
            eMessage = EzObject.isValid(eResponse)
                ? `[Error: ${eResponse.message}]`
                : EzString.EMPTY;
        }

        let fullErrorMessage = EzString.hasLength(userMessage)
            ? `${userMessage} ${eMessage}`
            : eMessage;

        ezApi.ezclocker.ezLogger.error(`${fullErrorMessage} [Details: ${eDetails}]`);

        return EzDialog.ezInstance.ezShowErrorDialog(
            eTitle,
            fullErrorMessage,
            eDetails,
            optionalData);
    }

    /**
     * @public @method
     * Builds the UX html to display additional details for a message/error message that
     * users can copy + paste when contacting support.
     * @param {string} additionalDetails
     * @returns {string}
     */
    ezBuildAdditionalDetailsContainerHTML(additionalDetails) {
        return EzHtml.build`
            <div
                id="EzAdditionalDetailsContainer"
                class="ez-faded-error-details">
                <label
                    for="EzAdditionalDetailsTextArea">
                    Additional Details
                </label>
                <div
                    id="EzAdditionalDetailsTextAreaContainer">
                    <textarea
                        id="EzAdditionalDetailsTextArea"
                        class="ez-error-message-details"
                        rows="8">
                        ${EzString.stringOrDefault(additionalDetails, 'No additional details available.')}
                    </textarea>
                </div>
                Please provide the dialog's message and the additional details above if you contact ezClocker support about this message.
            </div>`;
    }

    /**
        @public @method
        Displays an error dialog with optional details box.
        @param {undefined|null|string} eTitle
        @param {undefined|null|string} eMessage
        @param {undefined|null|string} eDetails
        @returns {Promise.resolve}
     */
    ezShowErrorWithDetails(eTitle, eMessage, eDetails) {
        if (!EzString.hasLength(eTitle)) {
            eTitle = 'EzClocker Unexpected Error';
        }

        if (!EzString.hasLength(eMessage)) {
            eMessage = 'EzClocker encounted an unexpected error while performing the requested action.'
        }

        if (!EzString.hasLength(eDetails)) {
            eDetails = 'No additional details provided.';
        }

        return EzDialog.ezInstance.ezShowErrorDialog(eTitle, eMessage, eDetails);
    }
}

export {
    /**
        // TODO: Remove export of EzDialogConfig once all use migrated to new import
        @deprecated
        Will remove in a future release
        Migrate to using new import location:
            import { EzDialogConfig } from '/ezlibrary/ux/dialogs/EzDialogConfig.js';
     */
    EzDialogConfig,
    /**
        // TODO: Remove export of EzDialogResponseStatus once all use migrated to new import
        @deprecated
        Will remove in a future release
        Migrate to using new import location:
            import { EzDialogResponse } from '/ezlibrary/ux/dialogs/EzDialogResponse.js';
     */
    EzDialogResponseStatus,
    /**
        // TODO: Remove export of EzDialogResponse once all use migrated to new import
        @deprecated
        Will remove in a future release
        Migrate to using new import location:
            import { EzDialogResponse } from '/ezlibrary/ux/dialogs/EzDialogResponse.js';
     */
    EzDialogResponse,
    EzDialog
};

