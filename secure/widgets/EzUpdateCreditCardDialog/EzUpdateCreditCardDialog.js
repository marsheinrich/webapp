import {
    EzObject,
    EzBoolean,
    EzString,
    EzFunction,
    EzHtml
} from '/ezlibrary/helpers/EzHelpers.js';

import {
    EzRegistrationState
} from '/ezlibrary/enums/EzEnumerations.js';

import { EzClass } from '/ezlibrary/EzClass.js';

import { EzUI } from '/public/javascript/common/ezui.js';

import { EzDialogConfig } from '/ezlibrary/ux/dialogs/EzDialogConfig.js';

import { EzDialog } from '/public/javascript/common/ezclocker-dialog-helper.js';

/**
 * @class
 * @extends {EzClass}
 * @description
 * Subscription dialog UX
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 * Import with:
 *     import { EzUpdateCreditCardDialog} from '/secure/widgets/EzUpdateCreditCardDialog/EzUpdateCreditCardDialog.js;
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 * Singleton instance ready check:
 *  globalThis.ezApi.ezclocker?/[EzUpdateCreditCardDialog.ezApiName].ready
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 * Listen to Singleton Instance onReady event:
 *  document.addEventListener(
 *     EzUpdateCreditCardDialog.ezEventNames.onReady,
 *     this.#ezRegistrator);
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 * Singleton Instance Reference:
 *  Outside this class: ezApi.ezclocker.ezUpdateCreditCardDialog
 *  Within this class: EzUpdateCreditCardDialog.ezInstance
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 */
export class EzUpdateCreditCardDialog extends EzClass {
    /**
     * @public @readonly @property
     * @returns {object}
     * @deprecated
     * Migrate to static reference: EzUpdateCreditCardDialog.ezEventNames
     */
    get ezEventNames() {
        return EzUpdateCreditCardDialog.ezEventNames;
    }

    /**
     * @public @readonly @property
     * Gets the card security code dialog's id
     * @returns {string}
     */
    get ezCardSecurityCodeHelpDialogId() {
        return 'CardSecurityCodeHelpDialog';
    }

    /**
     * @public @method
     * Initializes EzUpdateCreditCardDialog
     * @returns {EzUpdateCreditCardDialog}
     */
    ezInit() {
        ezApi.ezclocker.ezEventEngine.ezRegisterEvent(
            EzUpdateCreditCardDialog.ezApiName,
            EzUpdateCreditCardDialog.ezEventNames.onUpdateCreditCardDialogSubmit);

        ezApi.ezclocker.ezEventEngine.ezRegisterEvent(
            EzUpdateCreditCardDialog.ezApiName,
            EzUpdateCreditCardDialog.ezEventNames.onUpdateCreditCardDialogCanceled);

        ezApi.ezclocker.ezEventEngine.ezRegisterEvent(
            EzUpdateCreditCardDialog.ezApiName,
            EzUpdateCreditCardDialog.ezEventNames.onUpdateCreditCardDialogError);

        EzUpdateCreditCardDialog.ezInstance.ezInitUX();

        return EzUpdateCreditCardDialog.ezInstance;
    }

    /**
     * @public @method
     * Initializes EzUpdateCreditCardDialog UX
     */
    ezInitUX() {
        ezApi.ezclocker.ezUi.ezAppendContent(
            '_HideDialogsDiv',
            EzUpdateCreditCardDialog.ezInstance.ezBuildDialogHTML());

        let dialogConfig = new EzDialogConfig(EzUpdateCreditCardDialog.ezApiName);

        dialogConfig.buttons = {
            'Update': EzUpdateCreditCardDialog.ezInstance.ezSubmit,
            Cancel: EzUpdateCreditCardDialog.ezInstance.ezCancel
        };

        ezApi.ezclocker.ezDialog.ezInitDialogWithConfig(EzUpdateCreditCardDialog.ezApiName, dialogConfig);
    }

    /**
     * @public @method
     * Resets the dialog to default values.
     */
    ezResetDialog() {
        EzUpdateCreditCardDialog.ezInstance.ezHideErrorBox();

        ezApi.ezclocker.ezUi.ezSetInputValue(
            '_UpdateCreditCardDialog_CardHolderName',
            EzString.EMPTY);

        ezApi.ezclocker.ezUi.ezSetInputValue(
            '_UpdateCreditCardDialog_CardNumber',
            EzString.EMPTY);

        ezApi.ezclocker.ezUi.ezSetInputValue(
            '_UpdateCreditCardDialog_CardExpireDate',
            EzString.EMPTY);

        ezApi.ezclocker.ezUi.ezSetInputValue(
            '_UpdateCreditCardDialog_CardSpecialNumber',
            EzString.EMPTY);
    }

    /**
     * @public @method
     * Initializes the dialog with the available data for editing.
     */
    ezInitData() {
        /*if (EzObject.isValid(ezApi.ezclocker.ezDebug) && ezApi.ezclocker.ezDebug.isDebug() &&
            EzBoolean.isFalse(ezApi.ezclocker.ezClockerContext.ezSubscriptionContextHasCreditCardInfo())) {
            ezApi.ezclocker.ezUi.ezSetInputValue(
                '_UpdateCreditCardDialog_CardHolderName',
                'Peggy Sue');

            ezApi.ezclocker.ezUi.ezSetInputValue(
                '_UpdateCreditCardDialog_CardNumber',
                '4005519200000004');

            let nowMoment = ezApi.ezclocker.ezDateTime.ezNow();

            ezApi.ezclocker.ezUi.ezSetInputValue(
                '_UpdateCreditCardDialog_CardExpireDate',
                ezApi.ezclocker.ezDateTime.ezToDisplayMonthYear(
                    ezApi.ezclocker.ezDateTime.ezPlusYears(
                        nowMoment,
                        2)));

            ezApi.ezclocker.ezUi.ezSetInputValue(
                '_UpdateCreditCardDialog_CardSpecialNumber',
                `${ezApi.ezclocker.ezDateTime.ezGetDay(nowMoment)}1`);
        } else {*/
            let activeCreditCard = ezApi.ezclocker.ezClockerContext.ezGetSubscriptionContextCreditCard();

            ezApi.ezclocker.ezUi.ezSetInputValue(
                '_UpdateCreditCardDialog_CardHolderName',
                EzString.stringOrEmpty(
                    activeCreditCard.cardHolderName,
                    EzString.EMPTY));

            ezApi.ezclocker.ezUi.ezSetInputValue(
                '_UpdateCreditCardDialog_CardNumber',
                EzString.EMPTY);

            ezApi.ezclocker.ezUi.ezSetInputValue(
                '_UpdateCreditCardDialog_CardExpireDate',
                EzString.EMPTY);

            ezApi.ezclocker.ezUi.ezSetInputValue(
                '_UpdateCreditCardDialog_CardSpecialNumber',
                EzString.EMPTY);
        //}
    }

    /**
     * @public @method
     * Shows the Update Credit Card Dialog.
     * Passing in callbacks is deprected, Migrate to using the event engine.
     * @param {undefined|null|function} onSubmittedHandler
     * @param {undefined|null|function} onErrorHandler
     * @param {undefined|null|function}} onCancelHandler
     */
    ezShow(onSubmittedHandler, onErrorHandler, onCancelHandler) {
        EzUpdateCreditCardDialog.ezInstance.ezResetDialog();

        EzUpdateCreditCardDialog.ezInstance.onSubmitted = onSubmittedHandler;

        EzUpdateCreditCardDialog.ezInstance.onCancel = onErrorHandler;

        EzUpdateCreditCardDialog.ezInstance.onError = onCancelHandler;

        if (EzFunction.isFunction(EzUpdateCreditCardDialog.ezInstance.onSubmitted)) {
            ezApi.ezclocker.ezEventEngine.ezWantEvent(
                EzUpdateCreditCardDialog.ezEventNames.onUpdateCreditCardDialogSubmit,
                EzUpdateCreditCardDialog.ezApiName,
                EzUpdateCreditCardDialog.ezInstance.onSubmitted);
        }

        if (EzFunction.isFunction(EzUpdateCreditCardDialog.ezInstance.onError)) {
            ezApi.ezclocker.ezEventEngine.ezWantEvent(
                EzUpdateCreditCardDialog.ezEventNames.onUpdateCreditCardDialogError,
                EzUpdateCreditCardDialog.ezApiName,
                EzUpdateCreditCardDialog.ezInstance.onError);
        }

        if (EzFunction.isFunction(EzUpdateCreditCardDialog.ezInstance.onCancel)) {
            ezApi.ezclocker.ezEventEngine.ezWantEvent(
                EzUpdateCreditCardDialog.ezEventNames.onUpdateCreditCardDialogCanceled,
                EzUpdateCreditCardDialog.ezApiName,
                EzUpdateCreditCardDialog.ezInstance.onCancel);
        }

        EzUpdateCreditCardDialog.ezInstance.ezInitData();

        ezApi.ezclocker.ezDialog.ezShowDialog(EzUpdateCreditCardDialog.ezApiName)
            .then(
                () => {
                    if (EzBoolean.isTrue(ezApi.ezclocker.ezClockerContext.ezSubscriptionContextHasCreditCardInfo())) {
                        ezApi.ezclocker.ezUi.ezFocus('_UpdateCreditCardDialog_CardNumber');

                        ezApi.ezclocker.ezUi.ezSelectAll('_UpdateCreditCardDialog_CardNumber');
                    } else {
                        ezApi.ezclocker.ezUi.ezFocus('_UpdateCreditCardDialog_CardHolderName');

                        ezApi.ezclocker.ezUi.ezSelectAll('_UpdateCreditCardDialog_CardNumber');
                    }
                });
    }

    /**
     * @public @method
     * Closes the credit card dialog without submitting any changes.
     */
    ezClose() {
        EzUpdateCreditCardDialog.ezInstance.ezHideErrorBox();

        ezApi.ezclocker.ezDialog.ezCloseDialog(EzUpdateCreditCardDialog.ezApiName);
    }

    /**
     * @public @method
     * Closes the credit card dialog without submitting any changes.
     */
    ezCancel() {
        EzUpdateCreditCardDialog.ezInstance.ezClose();

        ezApi.ezclocker.ezEventEngine.ezTriggerEvent(
            EzUpdateCreditCardDialog.ezEventNames.onUpdateCreditCardDialogCanceled,
            ezApi.ezclocker.ezEventEngine.ezBuildEventData(
                EzUpdateCreditCardDialog.ezApiName,
                'Update credit card dialog canceled', {
                dialogController: EzUpdateCreditCardDialog.ezInstance
            }));
    }

    /**
     * @protected @method
     * Validates the necessary data is available in the editors.
     */
    ezValidateInputs() {
        EzUpdateCreditCardDialog.ezInstance.ezHideErrorBox();

        let validationResult = {
            hasError: false,
            message: EzString.EMPTY
        };

        if (!EzString.stringHasLength(
            ezApi.ezclocker.ezUi.ezGetInputValue('_UpdateCreditCardDialog_CardHolderName'))) {

            validationResult.hasError = true;

            validationResult.errorMessage = EzHtml.build`
                <div>
                    The credit card holder's name is required.
                </div>`;
        }

        if (!EzString.stringHasLength(
            ezApi.ezclocker.ezUi.ezGetInputValue('_UpdateCreditCardDialog_CardNumber'))) {
            validationResult.hasError = true;

            validationResult.errorMessage = EzHtml.build`
                ${validationResult.errorMessage}
                <dvi>
                    The credit card card number is required.
                </div>`;

            return validationResult;
        }

        if (!EzString.stringHasLength(
            ezApi.ezclocker.ezUi.ezGetInputValue('_UpdateCreditCardDialog_CardExpireDate'))) {

            validationResult.hasError = true;

            validationResult.errorMessage = EzHtml.build`
                ${validationResult.errorMessage}
                <div>
                    The credit card's expiration date is required.
                </div>`;

            return validationResult;
        }

        if (!EzString.stringHasLength(
            ezApi.ezclocker.ezUi.ezGetInputValue('_UpdateCreditCardDialog_CardSpecialNumber'))) {
            validationResult.hasError = true;

            validationResult.errorMessage = EzHtml.build`
                ${validationResult.errorMessage}
                <div>
                    The credit card's CVV number is required.
                </div>`;

            return validationResult;
        }

        return validationResult;
    }

    /**
     * @protected @method
     * Submits the entered credit data to update at the billing provider.
     */
    ezSubmit() {
        let validationError = EzUpdateCreditCardDialog.ezInstance.ezValidateInputs();

        if (EzBoolean.isTrue(validationError.hasError)) {
            EzUpdateCreditCardDialog.ezInstance.ezShowErrorBox(validationError.errorMessage);

            ezApi.ezclocker.ezEventEngine.ezTriggerEvent(
                EzUpdateCreditCardDialog.ezEventNames.onUpdateCreditCardDialogError,
                ezApi.ezclocker.ezEventEngine.ezBuildEventData(
                    EzUpdateCreditCardDialog.ezApiName,
                    'Update credit card dialog validation error', {
                    dialogController: EzUpdateCreditCardDialog.ezInstance,
                    errorResponse: {
                        errorCode: 400,
                        message: validationError.errorMessage
                    }
                }));

            return;
        }

        return ezApi.ezclocker.ezUi.ezStartPageWaitExecute(
            'Updating credit card ...',
            (waitDone) => {
                ezApi.ezclocker.ezSubscriptionService.ezUpdateActiveEmployerCreditCard(
                    ezApi.ezclocker.ezSubscriptionService.ezBuildUpdateCreditCardRequest(
                        ezApi.ezclocker.ezUi.ezGetInputValue('_UpdateCreditCardDialog_CardHolderName'),
                        ezApi.ezclocker.ezUi.ezGetInputValue('_UpdateCreditCardDialog_CardNumber'),
                        ezApi.ezclocker.ezUi.ezGetInputValue('_UpdateCreditCardDialog_CardExpireDate'),
                        ezApi.ezclocker.ezUi.ezGetInputValue('_UpdateCreditCardDialog_CardSpecialNumber')))
                    .then(
                        (response) => {
                            EzUpdateCreditCardDialog.ezInstance.ezClose();

                            waitDone()
                                .then(() => {
                                    ezApi.ezclocker.ezEventEngine.ezTriggerEvent(
                                        EzUpdateCreditCardDialog.ezEventNames.onUpdateCreditCardDialogSubmit,
                                        ezApi.ezclocker.ezEventEngine.ezBuildEventData(
                                            EzUpdateCreditCardDialog.ezApiName,
                                            'Update credit card dialog submitted with success',
                                            {
                                                dialogController: EzUpdateCreditCardDialog.ezInstance,
                                                response: response
                                            }))
                                });
                        },
                        (eResponse) => {
                            waitDone()
                                .then(
                                    () => {
                                        ezApi.ezclocker.ezEventEngine.ezTriggerEvent(
                                            EzUpdateCreditCardDialog.ezEventNames.onUpdateCreditCardDialogError,
                                            ezApi.ezclocker.ezEventEngine.ezBuildEventData(
                                                EzUpdateCreditCardDialog.ezApiName,
                                                eResponse.message,
                                                {
                                                    dialogController: EzUpdateCreditCardDialog.ezInstance,
                                                    errorResponse: eResponse
                                                }));

                                        if (424 == eResponse.errorCode) {
                                            // Handle Failed Dependency Error
                                            EzUpdateCreditCardDialog.ezInstance.ezShowErrorBox(eResponse.message);
                                        } else {
                                            EzUpdateCreditCardDialog.ezInstance.ezClose();
                                        }
                                    })
                        });
            });
    }

    /**
     * @public @method
     * Shows the dialog's error message box with the provided message.
     * @param {String} em
     */
    ezShowErrorBox(em) {
        if (!EzString.hasLength(em)) {
            return;
        }

        ezApi.ezclocker.ezUi.ezContent(
            'EzUpdateCreditCardDialogError',
            em);

        ezApi.ezclocker.ezUi.ezShowElement('EzUpdateCreditCardDialogError');
    }

    /**
     * @public @method
     * Hides the dialog's error message box
     */
    ezHideErrorBox() {
        ezApi.ezclocker.ezUi.ezContent(
            'EzUpdateCreditCardDialogError',
            EzString.EMPTY);

        ezApi.ezclocker.ezUi.ezHideElement('EzUpdateCreditCardDialogError');
    }

    /**
     * @public @method
     * Builds and returns this dialogs HTML
     * @return {string}
     */
    ezBuildDialogHTML() {
        return EzHtml.build`
            <div
                id="${EzUpdateCreditCardDialog.ezApiName}"
                title="Update Credit Card Information">
                <div
                    id="EzUpdateCreditCardDialogError"
                    class="ezErrorBox" style="display:none">
                </div>
                <table
                    id="UpdateCreditCardDialogCardName_Table"
                    class="subscriptionTable">
                    <tr
                        id="UpdateCreditCardDialogCardName_LabelRow">
                        <td
                            id="UpdateCreditCardDialogCardName_LabelCOL"
                            class="subscriptionCell">
                            <label
                                id="_UpdateCreditCardDialog_CardHolderName_Label"
                                for="cardHolderName">
                                Card Holder Name
                            </label>
                        </td>
                    </tr>
                    <tr
                        id="UpdateCreditCardDialogCardName_InputRow">
                        <td
                            id="UpdateCreditCardDialogCardName_InputCol"
                            class="subscriptionCell">
                            <input
                                id="_UpdateCreditCardDialog_CardHolderName"
                                class="dialogInput"
                                type="text"
                                name="cardHolderName" />
                        </td>
                    </tr>
                </table>
                <table
                    id="UpdateCreditCardDialogCardNumber_InputTable"
                    class="subscriptionTable">
                    <tr
                        id="UpdateCreditCardDialogCardNumber_InputLabelRow">
                        <td
                            id="UpdateCreditCardDialogCardNumber_InputLabelCol"
                            class="subscriptionCell">
                            <label
                                id="UpdateCreditCardDialog_CardNumber_InputLabel"
                                for="_UpdateCreditCardDialog_CardNumber">
                                Card Number
                            </label>
                        </td>
                    </tr>
                    <tr
                        id="UpdateCreditCardDialogCardNumber_InputRow">
                        <td
                            id="UpdateCreditCardDialogCardNumber_InputCol"
                            class="subscriptionCell">
                            <input
                                id="_UpdateCreditCardDialog_CardNumber"
                                class="dialogInput"
                                type="text"
                                name="cardNumber"/>
                        </td>
                    </tr>
                </table>
                <table
                    id="UpdateCreditCardDialogCard_ExpireDate_SecurityCode_InputTable"
                    class="subscriptionTable">
                    <tr
                        id="UpdateCreditCardDialogCard_ExpireDate_SecurityCode_InputLabelRow">
                        <td
                            id="UpdateCreditCardDialogCard_ExpireDate_InputLabelCol"
                            class="subscriptionCell">
                            <label
                                id="UpdateCreditCardDialogCard_ExpireDate_InputLabel"
                                for="_UpdateCreditCardDialog_CardExpireDate">
                                Card Expiration Date
                            </label>
                        </td>
                        <td
                            id="UpdateCreditCardDialogCard_SecurityCode_InputLabelCol"
                            class="subscriptionCell">
                            <label
                                id="UpdateCreditCardDialogCard_SecurityCode_InputLabel"
                                for="_UpdateCreditCardDialog_CardSpecialNumber">
                                Card Security Code
                            </label>
                        </td>
                    </tr>
                    <tr
                        id="UpdateCreditCardDialogCard_ExpireDate_SpecialNumber_InputRow">
                        <td
                            id="UpdateCreditCardDialogCard_ExpireDate_Input"
                            class="subscriptionCell">
                            <input
                                id="_UpdateCreditCardDialog_CardExpireDate"
                                class="dialogInput"
                                type="text"
                                name="cardExpireDate"
                                data-inputmask="'mask':'99/9999', 'placeholder':'mm/yyyy'" />
                            <label
                                id="UpdateCreditCardDialogCard_ExpireDate_InputFormatLabel"
                                class="formatHint">
                                Format: MM/YYYY
                            </label>
                        </td>
                        <td
                            id="UpdateCreditCardDialogCard_SSecurityCode_Input"
                            class="subscriptionCell">
                            <input
                                id="_UpdateCreditCardDialog_CardSpecialNumber"
                                class="dialogInput"
                                type="text"
                                name="cardSpecialNumber" />
                            <!--
                            <div
                                id="UpdateCreditCardDialogCard_SecurityCode_InputHelpContainer">
                                <a
                                    id="UpdateCreditCardDialogCard_SecurityCode_WhatIsThisLink"
                                    class="ezButton-what-is-this-link"
                                    href="#"
                                    onclick="ezApi.ezclocker.ezUpdateCreditCardDialog.ezShowCardSecurityCodeHelp()">
                                    What is a Card Security Code?
                                </a>
                            </div>
                            -->
                        </td>
                    </tr>
                </table>
            </div>`;
    }

    /**
     * @public @method
     * Shows the credit card signature panel number help dialog
     */
    ezShowCardSecurityCodeHelp() {
        let cvvNumberHelpDialogConfig = new EzDialogConfig(EzUpdateCreditCardDialog.ezInstance.ezCardSecurityCodeHelpDialogId);

        cvvNumberHelpDialogConfig.title = 'Signature Panel Code Info';

        cvvNumberHelpDialogConfig.modal = false;

        cvvNumberHelpDialogConfig.ezRemoveOnClose = true;

        cvvNumberHelpDialogConfig.buttons = [
            {
                id: `${EzUpdateCreditCardDialog.ezInstance.ezCardSecurityCodeHelpDialogId}_OK`,
                text: 'OK',
                click: () => ezApi.ezclocker.ezDialog.ezCloseDialog(
                    ezApi.ezclocker.ezUpdateCreditCardDialog.ezCardSecurityCodeHelpDialogId)
            }
        ];

        cvvNumberHelpDialogConfig.ezDialogContentHtml = EzHtml.build`
            <div
                id="${EzUpdateCreditCardDialog.ezInstance.ezCardSecurityCodeHelpDialogId}">
                <h3>
                    Payment Card CVV/CVC/CVD/CSC Codes
                </h3>
                <p
                    id="${EzUpdateCreditCardDialog.ezInstance.ezCardSecurityCodeHelpDialogId}_HelpInfo">
                    Your card's security code (or CVV/CVC/CVD/CSC) is a 3 or 4 digit
                    number or numbers & characters value located on the front or back of most cards.
                </p>
                <h4
                    id="${EzUpdateCreditCardDialog.ezInstance.ezCardSecurityCodeHelpDialogId}_LocationBack_Section"
                    class="ezText-h4-12pt-ezClockerBlack">
                    Example Locaion on Card Back
                </h4>
                <div
                    id="${EzUpdateCreditCardDialog.ezInstance.ezCardSecurityCodeHelpDialogId}_LocationBack_ImageContainer">
                    <img
                        id="${EzUpdateCreditCardDialog.ezInstance.ezCardSecurityCodeHelpDialogId}_LocationFront_Image"
                        src="/public/images/creditcards/example-visa-back-205x130.png"/>
                </div>
                <h4
                    id="${EzUpdateCreditCardDialog.ezInstance.ezCardSecurityCodeHelpDialogId}_LocationFront_Section"
                    class="ezText-h4-12pt-ezClockerBlack">
                    Example Location on Card Front
                </h4>
                <div
                    id="${EzUpdateCreditCardDialog.ezInstance.ezCardSecurityCodeHelpDialogId}_LocationFront_ImageContainer">
                    <img
                        id="${EzUpdateCreditCardDialog.ezInstance.ezCardSecurityCodeHelpDialogId}_LocationFront_Image">
                        src="/public/images/creditcards/american-express-platinum-card.png"/>
                </div>
                <h4
                    id="${EzUpdateCreditCardDialog.ezInstance.ezCardSecurityCodeHelpDialogId}_MoreDetails_Section"
                    class="ezText-h4-12pt-ezClockerBlack">
                    Additional Information
                </h4>
                <p
                    id="${EzUpdateCreditCardDialog.ezInstance.ezCardSecurityCodeHelpDialogId}_MoreDetails_Links">
                    <a
                        href="https://en.wikipedia.org/wiki/Card_security_code"
                        target="wikipedia.org">
                        Click Here to read more about card security codes on Wikipedia.
                    </a>
                </p>
                <p
                    id="${EzUpdateCreditCardDialog.ezInstance.ezCardSecurityCodeHelpDialogId}_MoreDetails">
                    Common names for payment card security codes:
                        <ul>
                            <li>
                                CVV Code (Card Verification Value, used with Visa cards.)
                            </li>
                            <li>
                                CVV2 Code (Card Verification Value 2, used with Visa cards.)
                            </li>
                            <li>
                                CVC Code (Card Validation Code, used with Mastercard.)
                            </li>
                            <li>
                                CVC2 Code (Card Validation Code 2, used with Mastercard.)
                            </li>
                            <li>
                                CID Code (Card Identification Code, used with some American Express and Discover cards.)
                            </li>
                            <li>
                                CVD Code (Card Verification Data, used with some Discover cards.)
                            </li>
                            <li>
                                CSC Code (Card Security Code, used with American Express cards.)
                            </li>
                        </ul>
                </p>
            </div>`;

        ezApi.ezclocker.ezDialog.ezInitDialogTemplateFromDialogConfig(cvvNumberHelpDialogConfig);

        /*ezApi.ezclocker.ezDialog.ezInitDialogWithConfig(
            EzUpdateCreditCardDialog.ezInstance.ezCardSecurityCodeHelpDialogId,
            cvvNumberHelpDialogConfig);*/

        ezApi.ezclocker.ezDialog.ezShowDialog(EzUpdateCreditCardDialog.ezInstance.ezCardSecurityCodeHelpDialogId)
            .then(
                () => ezApi.ezclocker.ezDialog.ezCloseDestroyAndRemoveDialog(EzUpdateCreditCardDialog.ezInstance.ezCardSecurityCodeHelpDialogId));

    }

    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    // Class Initialization and EzApi Registration Section
    // !! DO NOT PLACE ANY non-initialization fields, getter/setter methods, static methods, or class methods beyond this section !!
    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

    /**
     * @static
     * @public @readonly @property
     * Gets the name of this class's singleton instance when registered with ezApi.
     * @returns {string}
     */
    static get ezApiName() {
        return 'ezUpdateCreditCardDialog';
    }

    /**
     * @static
     * @public @readonly @property
     * Gets an object of event names that this class may trigger.
     * @returns {object}
     */
    static get ezEventNames() {
        return {
            onReady: 'ezOn_EzUpdateCreditCardDialog_Ready',
            onUpdateCreditCardDialogSubmit: 'ezOn_EzUpdateCreditCardDialog_Submit',
            onUpdateCreditCardDialogCanceled: 'ezOn_EzUpdateCreditCardDialog_Canceled',
            onUpdateCreditCardDialogError: 'ezOn_EzUpdateCreditCardDialog_Error'
        };
    }

    /**
     * @static
     * @private @field
     * Stores the singleton instance of this class that was created by and registerd with EzApi.
     * @type {EzUpdateCreditCardDialog}
     */
    static #ezInstance = EzObject.hasProperty(globalThis, 'ezApi') &&
        EzObject.isValid(globalThis.ezApi) && EzBoolean.isTrue(globalThis.ezApi.ready) &&
        EzObject.isValid(globalThis.ezApi.ezclocker[EzUpdateCreditCardDialog.ezApiName])
        ? globalThis.ezApi.ezclocker[EzUpdateCreditCardDialog.ezApiName]
        : null;
    /**
     * @static
     * @public @property @getter
     * Returns the singleton instance of this class that is registered with EzApi (if available yet)
     * @returns {EzUpdateCreditCardDialog}
     */
    static get ezInstance() {
        return EzUpdateCreditCardDialog.#ezInstance;
    }
    /**
     * @static
     * @public @property @setter
     * Sets the singleton instance of of this class that is registered with EzApi.
     * @param {EzUpdateCreditCardDialog} instance
     */
    static set ezInstance(instance) {
        if (null != EzUpdateCreditCardDialog.#ezInstance) {
            throw new Error('EzUpdateCreditCardDialog\'s singleton instance is already reigstered with EzApi.');
        }

        EzUpdateCreditCardDialog.#ezInstance = instance;
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
        EzObject.isValid(globalThis.ezApi.ezclocker[EzUpdateCreditCardDialog.ezApiName])
        ? EzRegistrationState.REGISTERED
        : null;
    /**
     * @static
     * @public @property @getter
     * Gets the ezApi registration state of this classes's singleton instance.
     * @returns {string}
     * A valid enum property value from EzRegistrationState
     */
    static get ezApiRegistrationState() {
        return EzUpdateCreditCardDialog.#ezApiRegistrationState;
    }
    /**
     * @static
     * @public @property @setter
     * Sets the ezApi registration state of this classes's singleton instance.
     * @param {string} ezApiRegistrationState
     * A valid enum property value from EzRegistrationState
     */
    static set ezApiRegistrationState(ezApiRegistrationState) {
        EzUpdateCreditCardDialog.#ezApiRegistrationState = EzRegistrationState.ezValueOf(ezApiRegistrationState);
    }

    /**
     * @static
     * @private @readonly @property
     * Returns true when all required dependencies for this class report ready.
        In otherwords, the require dependency's singleton instance is created
        and is registered with and accessable from EzApi with ezApi.ezclocker.{dependency_name}.
     * @returns {boolean}
     */
    static get #ezCanRegister() {
        return EzRegistrationState.PENDING === EzUpdateCreditCardDialog.ezApiRegistrationState &&
            EzObject.hasProperty(globalThis, 'ezApi') &&
            EzObject.isValid(globalThis.ezApi) && EzBoolean.isTrue(globalThis.ezApi.ready) &&

            globalThis.ezApi.ezclocker[EzUI.ezApiName] &&
            globalThis.ezApi.ezclocker[EzUI.ezApiName].ready &&

            globalThis.ezApi.ezclocker[EzDialog.ezApiName] &&
            globalThis.ezApi.ezclocker[EzDialog.ezApiName].ready;
    }

    /**
     * @static
     * @private @readonly @property
     * Gets if this class's singleton instance is registered with ezApi yet.
     * @returns {boolean}
     */
    static get #ezIsRegistered() {
        return null != EzUpdateCreditCardDialog.ezInstance &&
            EzRegistrationState.REGISTERED === EzUpdateCreditCardDialog.ezApiRegistrationState;
    }

    /**
     * @static
     * @private @method
     * Attempts to register the singleton instance for this class with ezApi.
     * Returns true if successful, false otherwise.
     * @returns {boolean}
     */
    static #ezRegistrator() {
        if (EzUpdateCreditCardDialog.#ezCanRegister && !EzUpdateCreditCardDialog.#ezIsRegistered) {
            globalThis.ezApi.ezRegisterNewApi(EzUpdateCreditCardDialog, EzUpdateCreditCardDialog.ezApiName);
        }

        return EzUpdateCreditCardDialog.#ezIsRegistered;
    }

    /**
     * @static
     * Static Initialization
     * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
     * >> IMPORTANT <<
     * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
     * Make sure the following properties and methods get defined BEFORE this static initialization section:
     *     1) Property getter EzUpdateCreditCardDialog.ezApiName
     *     2) Property getter EzUpdateCreditCardDialog.ezEventNames
     *     3) Property getter EzUpdateCreditCardDialog.ezInstance
     *     4) Property setter EzUpdateCreditCardDialog.ezInstance
     *     5) Property getter EzUpdateCreditCardDialog.ezApiRegistrationState
     *     6) Property setter EzUpdateCreditCardDialog.ezApiRegistrationState
     *     7) Property getter EzUpdateCreditCardDialog.#ezCanRegister
     *     8) Property getter EzUpdateCreditCardDialog.#ezIsRegistered
     *     9) Method EzUpdateCreditCardDialog.#ezRegistrator()
     */
    static {
        if (!EzUpdateCreditCardDialog.#ezIsRegistered) {
            EzUpdateCreditCardDialog.ezApiRegistrationState = EzRegistrationState.PENDING;

            if (!EzUpdateCreditCardDialog.#ezRegistrator()) {
                document.addEventListener(
                    EzUpdateCreditCardDialog.ezOnEzApiReadyEventName,
                    EzUpdateCreditCardDialog.#ezRegistrator);
                document.addEventListener(
                    EzUI.ezEventNames.onReady,
                    EzUpdateCreditCardDialog.#ezRegistrator);

                document.addEventListener(
                    EzDialog.ezEventNames.onReady,
                    EzUpdateCreditCardDialog.#ezRegistrator);

            }
        }
    }

    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    // !! DO NOT PLACE ANY non-initialization fields, getter/setter methods, static methods, or class methods beyond above section !!
    // NO CODE AFTER THIS SECTION
    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
}
