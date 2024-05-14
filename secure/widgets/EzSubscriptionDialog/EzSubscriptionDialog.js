import {
    EzBadParamException
} from '/ezlibrary/exceptions/EzExceptions.js';

import {
    EzObject,
    EzBoolean,
    EzString,
    EzHtml,
    EzJson,
    EzPromise
} from '/ezlibrary/helpers/EzHelpers.js';

import {
    EzRegistrationState,
    EzElementEventName,
    EzBillingFrequency
} from '/ezlibrary/enums/EzEnumerations.js';

import { EzClass } from '/ezlibrary/EzClass.js';

import { EzEventEngine } from '/ezlibrary/ez-event-engine.js';
import { EzHttpHelper } from '/public/javascript/common/ezclocker-http-helper.js';
import { EzNavigation } from '/public/javascript/common/ezclocker-navigation-helper.js';

import { EzUx } from '/ezlibrary/ux/EzUx.js';
import { EzUI } from '/public/javascript/common/ezui.js';

import { EzDialogConfig } from '/ezlibrary/ux/dialogs/EzDialogConfig.js';
import { EzDialog } from '/public/javascript/common/ezclocker-dialog-helper.js';

import { EzDebug } from '/public/javascript/common/ezclocker-debug.js';
import { EzBillingAddress } from '/ezlibrary/entities/EzBillingAddress.js';
import { EzCreditCard } from '/ezlibrary/entities/EzCreditCard.js';
import { EzPaymentInfoRequest } from '/ezlibrary/entities/requests/EzPaymentInfoRequest.js';
import { EzBillingAddressDialog } from '/secure/widgets/EzBillingAddressDialog/EzBillingAddressDialog.js';

/**
 * @class
 * @extends {EzClass}
 * @description
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 * Import with:
 *     import { EzSubscriptionDialog } from '/secure/widgets/EzSubscriptionDialog/EzSubscriptionDialog.js';
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 * Singleton instance ready for use when the below evaluates to true:
 *     globalThis.ezApi.ezclocker[EzSubscriptionDialog.ezApiName] &&
 *     globalThis.ezApi.ezclocker[EzSubscriptionDialog.ezApiName].ready &&
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 * Listen to onReady event:
 *     document.addEventListener(
 *         EzSubscriptionDialog.ezEventNames.onReady,
 *         this.#ezRegistrator);
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 * Singleton Instance Reference:
 *     Inside this class: EzSubscriptionDialog.ezInstance
 *     Outside this class: ezApi.ezclocker.ezSubscriptionDialog
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 */
export class EzSubscriptionDialog extends EzClass {
    /**
     * @public @field
     * @type {boolean}
     */
    _DialogClosing = false;

    /**
     * @public @field
     * @type {boolean}
     */
    _DialogCanceling = false;

    /**
     * @public @field
     * @type {function}
     */
    onSubscribeSuccess = null;

    /**
     * @public @field
     * @type {function}
     */
    onSubscribeFailure = null;

    /**
     * @public @field
     * @type {function}
     */
    onCancelSubscribe = null;

    /**
     * @public @readonly @property
     * Returns the dialog's id
     * @returns {string}
     */
    get ezDialogId() {
        return '_SubscribeToPlanDialog';
    }

    /**
     * @private @field
     * Stores the subscription plan info instance to subscribe to
     * @type {number}
     */
    #ezSubscriptionPlanInfo = null;
    /**
     * @public @property @getter
     * Gets the subscription plan info instance to subscribe to
     * @returns {number}
     */
    get ezSubscriptionPlanInfo() {
        return this.#ezSubscriptionPlanInfo;
    }
    /**
     * @public @property @setter
     * Sets the subscription plan info instance to subscribe to
     * @param {number} ezSubscriptionPlanId
     */
    set ezSubscriptionPlanInfo(ezSubscriptionPlanInfo) {
        if (!EzObject.isValid(ezSubscriptionPlanInfo)){
            throw new EzBadParamException(
                'ezSubscriptionPlanInfo',
                this,
                'set ezSubscriptionPlanInfo(ezSubscriptionPlanInfo)');
        }

        this.#ezSubscriptionPlanInfo = ezSubscriptionPlanInfo;
    }

    #ezDiscountCode;
    /**
     * @public @property @getter
     * Gets the discount code to use when subscribing
     * @returns {string}
     */
    get ezDiscountCode() {
        return this.#ezDiscountCode;
    }
    /**
     * @public @property @setter
     * Sets the discount code to use when subscribing
     * @param {string} ezDiscountCode
     */
    set ezDiscountCode(ezDiscountCode) {
        this.#ezDiscountCode = EzString.stringOrEmpty(ezDiscountCode);
    }

    /**
     * @private @field
     * Stores the employer information to use when subscribing
     * @type {object}
     */
    #ezEmployerInfo = null;
    /**
     * @public @property @getter
     * Gets the employer information to use when subscribing
     * @returns {object}
     */
    get ezEmployerInfo() {
        return this.#ezEmployerInfo;
    }
    /**
     * @public @property @setter
     * Sets the employer information to use when subscribing
     * @param {object} ezEmployerInfo
     */
    set ezEmployerInfo(ezEmployerInfo) {
        if (!EzObject.isValid(ezEmployerInfo)) {
            throw new EzBadParamException(
                'ezEmployerInfo',
                this,
                'ezEmployerInfo(ezEmployerInfo) (setter)');
        }

        this.#ezEmployerInfo = ezEmployerInfo;
    }

    /**
     * @private @field
     * Stores the known employer billing information to use when subscribing
     * @type {string}
     */
    #ezBillingInfo = null;
    /**
     * @public @property @getter
     * Gets the known employer billing information to use when subscribing
     * @returns {string}
     */
    get ezBillingInfo() {
        return this.#ezBillingInfo;
    }
    /**
     * @public @property @setter
     * Sets the known employer billing information to use when subscribing
     * @param {string} ezBillingInfo
     */
    set ezBillingInfo(ezBillingInfo) {
        if (!EzObject.isValid(ezBillingInfo)) {
            throw new EzBadParamException(
                'ezBillingInfo',
                this,
                'ezBillingInfo(ezBillingInfo) (setter)');
        }

        this.#ezBillingInfo = ezBillingInfo;
    }

    /**
     * @private @field
     * Stores if the more details section is visible or not
     * Default: false
     * @type {boolean}
     */
    #ezMoreDetailsVisible = false;
    /**
     * @public @property @getter
     * Gets if the more details section is visible or not
     * @returns {boolean}
     */
    get ezMoreDetailsVisible() {
        return this.#ezMoreDetailsVisible;
    }
    /**
     * @public @property @getter
     * Sets if the more details section is visible or not
     * @param {boolean} moreDetailsVisible
     * Default: false
     */
    set ezMoreDetailsVisible(moreDetailsVisible = false) {
        this.#ezMoreDetailsVisible = EzBoolean.booleanOrFalse(moreDetailsVisible);

        if (this.#ezMoreDetailsVisible) {
            EzUx.show(`${EzSubscriptionDialog.ezInstance.ezDialogId}_MoreDetailsContainer`);
        } else {
            EzUx.hide(`${EzSubscriptionDialog.ezInstance.ezDialogId}_MoreDetailsContainer`);
        }
    }

    /**
     * @public @readonly @property
     * Gets the EzSubscriptionDialog's left column HTML
     * @returns {string}
     */
    get ezSubscriptionDialogLeftColumnHTML() {
        return EzHtml.build`
            <div
                id="${EzSubscriptionDialog.ezInstance.ezDialogId}_LeftColumn_Container"
                class="ezAutoRow_MinxMax ezGrid-row-gap_8">
                <div
                    id="${EzSubscriptionDialog.ezInstance.ezDialogId}_LeftColumn_Title"
                    class="ezText-h2-22pt-ezClockerBlack">
                    Billing Address
                </div>
                <div
                    id="${EzSubscriptionDialog.ezInstance.ezDialogId}_LeftColumnLayoutContainer"
                    class="ezAutoCol_A ezAutoRow_AxAxAxA ezGrid-align-full ezGrid-vertical-align-top ezGrid-row-gap_8">
                    <div
                        id="${EzSubscriptionDialog.ezInstance.ezDialogId}_LeftColumn_CompanyName_InputContainer">
                        <label
                            id="${EzSubscriptionDialog.ezInstance.ezDialogId}_sdCompanyName_Label"
                            class="ezInput-label-black-12pt-bold"
                            for="companyName">
                            Company Name
                        </label>
                        <input
                            id="_sdCompanyName"
                            class="dialogInput"
                            type="text"
                            name="companyName"/>
                    </div>
                    <div
                        id="${EzSubscriptionDialog.ezInstance.ezDialogId}_LeftColumn_FirstNameLastName_LayoutContainer"
                        class="ezAutoCol_AxA ezGrid-align-full ezGrid-vertical-align-top ezGrid-row-gap_8 ezGrid-col-gap_8">
                        <div
                            id="${EzSubscriptionDialog.ezInstance.ezDialogId}_LeftColumn_FirstName_InputContainer">
                            <label
                                id="${EzSubscriptionDialog.ezInstance.ezDialogId}_sdFirstName_Label"
                                class="ezInput-label-black-12pt-bold"
                                for="firstName">
                                First Name
                            </label>
                            <input
                                id="_sdFirstName"
                                class="dialogInput"
                                type="text"
                                name="firstName" />
                        </div>
                        <div
                            id="${EzSubscriptionDialog.ezInstance.ezDialogId}_LeftColumn_LastName_InputContainer">
                            <label
                                id="${EzSubscriptionDialog.ezInstance.ezDialogId}_sdLastName_Label"
                                class="ezInput-label-black-12pt-bold"
                                for="lastName">
                                Last Name
                            </label>
                            <input
                                id="_sdLastName"
                                class="dialogInput"
                                type="text"
                                name="lastName" />
                        </div>
                    </div>
                    <div
                        id="${EzSubscriptionDialog.ezInstance.ezDialogId}_LeftColumn_Street_InputContainer">
                            <label
                                id="${EzSubscriptionDialog.ezInstance.ezDialogId}_sdStreetAddress_Label"
                                class="ezInput-label-black-12pt-bold"
                                for="_sdStreetAddress">
                                Street Address
                            </label>
                            <input
                                id="_sdStreetAddress"
                                class="dialogInput"
                                type="text"
                                name="streetAddress"/>
                            <div
                                id="${EzSubscriptionDialog.ezInstance.ezDialogId}_LeftColumn_Street_HelpContainer"
                                class="formatHint">
                                &nbsp;
                            </div>
                    </div>
                    <div
                        id="${EzSubscriptionDialog.ezInstance.ezDialogId}_LeftColumn_CityStateZip_LayoutContainer"
                        class="ezAutoCol_AxAxA ezGrid-align-full ezGrid-vertical-align-top ezGrid-row-gap_8 ezGrid-col-gap_8">
                        <div
                            id="${EzSubscriptionDialog.ezInstance.ezDialogId}_LeftColumn_CityInputContainer">
                            <label
                                id="${EzSubscriptionDialog.ezInstance.ezDialogId}_sdCity_Label"
                                class="ezInput-label-black-12pt-bold"
                                for="_sdCity">
                                City
                            </label>
                            <input
                                id="_sdCity"
                                class="dialogInput"
                                type="text"
                                name="city"/>
                        </div>
                       <div
                            id="${EzSubscriptionDialog.ezInstance.ezDialogId}_LeftColumn_State_InputContainer">
                            <label
                                id="${EzSubscriptionDialog.ezInstance.ezDialogId}_sdState_Label"
                                class="ezInput-label-black-12pt-bold"
                                for="_sdState">
                                State
                            </label>
                            <input
                                id="_sdState"
                                class="dialogInput"
                                type="text"
                                name="state">
                        </div>
                        <div
                            id="${EzSubscriptionDialog.ezInstance.ezDialogId}_LeftColumn_ZipCode_InputContainer">
                            <label
                                id="${EzSubscriptionDialog.ezInstance.ezDialogId}_sdPostalCode_Label"
                                class="ezInput-label-black-12pt-bold"
                                for="_sdPostalCode">
                                ZIP code
                            </label>
                            <input
                                id="_sdPostalCode"
                                class="dialogInput"
                                type="text"
                                name="postalCode"/>
                        </div>
                    </div>
                </div>
            </div>`;
    }

    /**
     * @public @readonly @property
     * Gets the EzSubscriptionDialog's right column HTML
     * @returns {string}
     */
    get ezSubscriptionDialogRightColumnHTML() {
        return EzHtml.build`
            <div
                id="${EzSubscriptionDialog.ezInstance.ezDialogId}_RightColumn_Container"
                class="ezAutoRow_MinxMax ezGrid-row-gap_8">
                <div
                    id="${EzSubscriptionDialog.ezInstance.ezDialogId}_RightColumn_Title"
                    class="ezText-h2-22pt-ezClockerBlack">
                    Card Information
                </div>
                <div
                    id="${EzSubscriptionDialog.ezInstance.ezDialogId}_RightColumnLayoutContainer"
                    class="ezAutoCol_A ezAutoRow_AxAxAxA ezGrid-align-full ezGrid-vertical-align-top ezGrid-row-gap_8">
                    <div
                        id="${EzSubscriptionDialog.ezInstance.ezDialogId}_RightColumn_NameOnCard_InputContainer">
                        <label
                            id="${EzSubscriptionDialog.ezInstance.ezDialogId}_sdCardHolderName_Label"
                            class="ezInput-label-black-12pt-bold"
                            for="_sdCardHolderName">
                            Name on Card
                        </label>
                        <input
                            id="_sdCardHolderName"
                            class="dialogInput"
                            type="text"
                            name="cardHolderName"/>
                    </div>
                    <div
                        id="${EzSubscriptionDialog.ezInstance.ezDialogId}_RightColumn_CardNumber_InputContainer">
                        <label
                            id="${EzSubscriptionDialog.ezInstance.ezDialogId}_sdCardNumber_Label"
                            class="ezInput-label-black-12pt-bold"
                            for="_sdCardNumber">
                            Card Number
                        </label>
                        <input
                            id="_sdCardNumber"
                            class="dialogInput"
                            type="text"
                            name="cardNumber"/>
                    </div>
                    <div
                        id="${EzSubscriptionDialog.ezInstance.ezDialogId}_RightColumn_DateAndCvv_LayoutContainer"
                        class="ezAutoCol_AxA ezGrid-align-full ezGrid-vertical-align-top ezGrid-row-gap_8 ezGrid-col-gap_8">
                        <div
                            id="${EzSubscriptionDialog.ezInstance.ezDialogId}_RightColumn_ExpireDate_InputContainer">
                            <label
                                id="${EzSubscriptionDialog.ezInstance.ezDialogId}_sdCardExpireDate_Label"
                                class="ezInput-label-black-12pt-bold"
                                for="_sdCardExpireDate">
                                Expire Date
                            </label>
                            <input
                                id="_sdCardExpireDate"
                                class="dialogInput"
                                type="text"
                                name="cardExpireDate"
                                data-inputmask="'mask':'99/9999',
                                'placeholder':'mm/yyyy'"/>
                            <div
                                id="${EzSubscriptionDialog.ezInstance.ezDialogId}_RightColumn_ExpireDate_HelpContainer"
                                class="formatHint">
                                Format: MM/YYYY
                            </div>
                        </div>
                        <div
                            id="${EzSubscriptionDialog.ezInstance.ezDialogId}_RightColumn_CVV_InputContainer">
                            <label
                                id="${EzSubscriptionDialog.ezInstance.ezDialogId}_sdCardSpecialNumber_Label"
                                class="ezInput-label-black-12pt-bold"
                                for="_sdCardSpecialNumber">
                                CVV or Security Code
                            </label>
                            <input
                                id="_sdCardSpecialNumber"
                                class="dialogInput"
                                type="text"
                                name="cardSpecialNumber"/>
                            <div
                                id="${EzSubscriptionDialog.ezInstance.ezDialogId}_RightColumn_CVV_HelpContainer"
                                class="formatHint">
                                &nbsp;
                            </div>
                        </div>
                    </div>
                    <div
                        id="${EzSubscriptionDialog.ezInstance.ezDialogId}_RightColumn_CVV_InputContainer">
                        <label
                            id="${EzSubscriptionDialog.ezInstance.ezDialogId}_DiscountCode_Label"
                            class="ezInput-label-black-12pt-bold"
                            style="margin-bottom:4px"
                            for="EzSubscriptionDialogDiscountCode">
                            Discount Code
                        </label>
                        <input
                            id="EzSubscriptionDialogDiscountCode"
                            class="dialogInput"
                            type="text"
                            name="discountCode"/>
                    </div>
                </div>
            </div>`;
    }

    /**
     * @public @readonly @property
     * Returns the EzSubscriptionDialog's more information HTML
     * @returns {string}
     */
    get ezSubscriptionDialogMoreInformationHTML() {
        return EzHtml.build`
            <div
                id="${EzSubscriptionDialog.ezInstance.ezDialogId}_MoreDetails_LayoutContainer"
                class="ezPad8 ezTopMargin_8 ezContainer-info-box-yellow ezText-small-black">
                <div
                    id="${EzSubscriptionDialog.ezInstance.ezDialogId}_MoreDetails_UpDown_Title"
                    class="ezTopMargin_8 ezBold">
                    Upgrading and Downgrading Your Subscription
                </div>
                <p
                    id="${EzSubscriptionDialog.ezInstance.ezDialogId}_MoreDetails_UpDown_Paragraph">
                    You can upgrade or downgrade your subscription by simply selecting the subscription plan.
                    <ul
                        id="${EzSubscriptionDialog.ezInstance.ezDialogId}_MoreDetails_UpDown_Bullets">
                        <li
                            id="${EzSubscriptionDialog.ezInstance.ezDialogId}_MoreDetails_Upgrade_Bullet">
                            When upgrading, ezClocker will charge your account a prorated amount for the remaining days in the current billing cycle and then
                            begin charging the full amount in future billing cycles.
                        </li>
                        <li
                            id="${EzSubscriptionDialog.ezInstance.ezDialogId}_MoreDetails_Downgrade_Bullet">
                            When downgrading, ezClocker will credit your account the difference in price for the remaining days in the current billing cycle.
                            The credit will apply on future billing cycles until fully used.
                        </li>
                    </ul>
                </p>
                <div
                    id="${EzSubscriptionDialog.ezInstance.ezDialogId}_MoreDetails_Cancel_Title"
                    class="ezBold">
                    Canceling Your Subscription
                </div>
                <p
                    id="${EzSubscriptionDialog.ezInstance.ezDialogId}_MoreDetails_Cancel_Paragraph">
                    You can cancel your subscription at any time. Once you have canceled, your subscription will expire at the
                    end of the current billing cycle. Please note that ezClocker cannot provide partial refunds.
                </p>
                <div
                    id="${EzSubscriptionDialog.ezInstance.ezDialogId}_MoreDetails_Support_Title"
                    class="ezTopMargin_8 ezBold">
                    Technical and Billing Support
                </div>
                <p
                    id="${EzSubscriptionDialog.ezInstance.ezDialogId}_MoreDetails_Support_Paragraph">
                    <ul
                        id="${EzSubscriptionDialog.ezInstance.ezDialogId}_MoreDetails_Support_Bullets">
                        <li
                            id="${EzSubscriptionDialog.ezInstance.ezDialogId}_MoreDetails_Support_Email_Bullet">
                            Email: <a href="mailto:support@ezclocker.com">support@ezclocker.com</a>
                        </li>
                        <li
                            id="${EzSubscriptionDialog.ezInstance.ezDialogId}_MoreDetails_Support_Phone_Bullet">
                            Phone: 1-800-769-8174
                        </li>
                    </ul>
                </p>
            </div>`;
    }

    /**
     * @public @readonly @property
     * Returns the EzSubscriptionDialog's subscription details HTML
     * @returns {string}
     */
    get ezSubscriptionDetailsHTML() {
        return EzHtml.build`
            <div
                id="${EzSubscriptionDialog.ezInstance.ezDialogId}_SubscriptionDetails_Container"
                class="ezTopMargin_10 ezContainer-ezClockerWhite-pad-10">
                <h3
                    id="${EzSubscriptionDialog.ezInstance.ezDialogId}_SubscriptionDetails_SubscriptionPlanName">
                    Subscription Plan Name
                </h3>
                <div
                    id="${EzSubscriptionDialog.ezInstance.ezDialogId}_SubscriptionDetails)_SubscriptionPrice_Container">
                    <ul
                        id="${EzSubscriptionDialog.ezInstance.ezDialogId}_SubscriptionDetails_SubscriptionPrice_Bullets">
                        <li
                            id="${EzSubscriptionDialog.ezInstance.ezDialogId}_SubscriptionDetails_SubscriptionPrice_ChargingBullet">
                            EzClocker's billing provider will charge your card
                            <span
                                id="">
                                $12 each month
                            </span>
                            while your subscription is active.
                        </li>
                        <li
                            id="${EzSubscriptionDialog.ezInstance.ezDialogId}_SubscriptionDetails_SubscriptionPrice_UpDownCancel_Bullet">
                            You may upgrade, downgrade, or cancel your subscription at any time.
                        </li>
                    </ul>
                </div>
                <div
                    id="${EzSubscriptionDialog.ezInstance.ezDialogId}_MoreDetailsButton_Container">
                    <a
                        id="${EzSubscriptionDialog.ezInstance.ezDialogId}_MoreDetailsButton"
                        class="ezButton-show-more-details-link"
                        href="#">
                        More details
                    </a>
                    <div
                        id="${EzSubscriptionDialog.ezInstance.ezDialogId}_MoreDetailsContainer"
                        class="animate__slideInDown animate__slideOutDown"
                        style="display:none;">
                        ${EzSubscriptionDialog.ezInstance.ezSubscriptionDialogMoreInformationHTML}
                    </div>
                </div>
            </div>`;
    }

    /**
     * @public @readonly @property
     * Gets the EzSubscriptionDialog's HTML to inject into the document.
     * @returns {string}
     */
    get ezSubscriptionDialogHTML() {
        return EzHtml.build`
            <div
                id="${EzSubscriptionDialog.ezInstance.ezDialogId}"
                title="Subscribe">
                <div
                    id="${EzSubscriptionDialog.ezInstance.ezDialogId}_FormContainer">
                    <form
                        id="${EzSubscriptionDialog.ezInstance.ezDialogId}_SubscribeToPlanForm"
                        action="${ezApi.ezclocker.ezNavigation.ezGetInternalClassicApiUrl('_subscriptionPlan/subscribe')}"
                        enctype="application/json"
                        method="post">
                        <div
                            id="${EzSubscriptionDialog.ezInstance.ezDialogId}_LayoutContainer"
                            class="ezAutoCol_50x50 ezGrid-col-gap_8">
                            ${EzSubscriptionDialog.ezInstance.ezSubscriptionDialogLeftColumnHTML}
                            ${EzSubscriptionDialog.ezInstance.ezSubscriptionDialogRightColumnHTML}
                        </div>
                    </form>
                </div>
                <div
                    id="${EzSubscriptionDialog.ezInstance.ezDialogId}_ValidationErrorMessageContainer"
                    class="ezContainer-validation-error-box"
                    style="display:none">
                </div>
                ${EzSubscriptionDialog.ezInstance.ezSubscriptionDetailsHTML}
            </div>`;
    }

    /**
     * @public @method
     * Initializes the EzSubscriptionDialog
     * @returns {EzSubscriptionDialog}
     */
    ezInit() {
        ezApi.ezclocker.ezEventEngine.ezRegisterEvent(
            EzSubscriptionDialog.ezApiName,
            EzSubscriptionDialog.ezEventNames.ezOnSubscriptionDialogSubscribeSuccess);

        ezApi.ezclocker.ezEventEngine.ezRegisterEvent(
            EzSubscriptionDialog.ezApiName,
            EzSubscriptionDialog.ezEventNames.ezOnSubscriptionDialogSubscribeError);

        ezApi.ezclocker.ezEventEngine.ezRegisterEvent(
            EzSubscriptionDialog.ezApiName,
            EzSubscriptionDialog.ezEventNames.ezOnSubscriptionDialogCancel);

        ezApi.ezclocker.ezEventEngine.ezRegisterEvent(
            EzSubscriptionDialog.ezApiName,
            EzSubscriptionDialog.ezEventNames.ezOnSubscriptionDialogClosed);

        EzSubscriptionDialog.ezInstance.ezInitUX();

        return EzSubscriptionDialog.ezInstance;
    }

    /**
     * @public @method
     * Initializes the EzSubscriptionDialog's UX
     */
    ezInitUX() {
        EzUx.appendContent(
            '_HideDialogsDiv',
            EzSubscriptionDialog.ezInstance.ezSubscriptionDialogHTML);

        ezApi.ezclocker.ezEventEngine.ezWantElementEvent(
            `${EzSubscriptionDialog.ezInstance.ezDialogId}_MoreDetailsButton`,
            EzElementEventName.CLICK,
            EzSubscriptionDialog.ezApiName,
            EzSubscriptionDialog.ezInstance.ezHandleMoreDetailsClickEvent);

        let dialogConfig = new EzDialogConfig(EzSubscriptionDialog.ezInstance.ezDialogId);

        dialogConfig.title = 'Payment Information';

        dialogConfig.width = 750;

        dialogConfig.modal = !ezApi.ezclocker?.ezDebug?.isDebug();

        dialogConfig.buttons = [
            {
                id: '_SubscriptionDialog_SubscribeButton',
                text: 'Start Subscription',
                click: EzSubscriptionDialog.ezInstance.ezSubmit
            },
            {
                id: '_SubscriptionDialog_CancelButton',
                text: 'Cancel',
                click: EzSubscriptionDialog.ezInstance.ezCancel
            }];

        ezApi.ezclocker.ezDialog.ezInitDialogWithConfig(
            EzSubscriptionDialog.ezInstance.ezDialogId,
            dialogConfig);
    }

    /**
     * @public @method
     * Shows the dialog
     * @param {object} subscriptionPlanInfo,
     * @param {string} discountCode,
     * @param {object} employerInfo,
     * @param {object} billingInfo
     */
    ezShow(subscriptionPlanInfo, discountCode = EzString.EMPTY, employerInfo = {}, billingInfo = {}) {
        if (!EzObject.isValid(subscriptionPlanInfo)) {
            throw new EzBadParamException(
                "subscriptionPlanInfo",
                EzSubscriptionDialog.ezInstance,
                EzSubscriptionDialog.ezInstance.ezShow);
        }

        EzSubscriptionDialog.ezInstance.ezSubscriptionPlanInfo = subscriptionPlanInfo;

        EzSubscriptionDialog.ezInstance.ezDiscountCode = EzString.stringOrEmpty(discountCode);

        EzSubscriptionDialog.ezInstance.ezEmployerInfo = EzObject.assignOrEmpty(employerInfo);

        EzSubscriptionDialog.ezInstance.ezBillingInfo = EzObject.assignOrEmpty(billingInfo);

        EzSubscriptionDialog.ezInstance.ezInitData(
            discountCode,
            employerInfo,
            billingInfo);

        ezApi.ezclocker.ezDialog.ezShowDialog(EzSubscriptionDialog.ezInstance.ezDialogId)
            .then(
                () => EzUx.focus('_sdCompanyName'));
    }

    /**
     * @public @method
     * Submits the dialog data and attempts subscription
     */
    ezSubmit() {
        EzSubscriptionDialog.ezInstance.ezDisableButtons();

        if (!EzSubscriptionDialog.ezInstance.ezValidateSubmitData()) {
            EzSubscriptionDialog.ezInstance.ezEnableButtons();

            return;
        }

        return EzSubscriptionDialog.ezInstance.ezProcessSubscriptionPayment(
            new EzPaymentInfoRequest(
                // ezBillingAddress
                new EzBillingAddress(
                    // employerId = null
                    ezApi.ezclocker.ezClockerContext.ezGetActiveEmployer().id,
                    // employeeId = null
                    null,
                    // personalId = null
                    null,
                    // companyName = EzString.EMPTY
                    EzUx.getInputValue('_sdCompanyName'),
                    // firstName = EzString.EMPTY
                    EzUx.getInputValue('_sdFirstName'),
                    // lastName = EzString.EMPTY
                    EzUx.getInputValue('_sdLastName'),
                    // streetAddress = EzString.EMPTY
                    EzUx.getInputValue('_sdStreetAddress'),
                    // extendedAddress = EzString.EMPTY
                    EzString.EMPTY,
                    // locality = EzString.EMPTY
                    EzUx.getInputValue('_sdCity'),
                    // region = EzString.EMPTY
                    EzUx.getInputValue('_sdState'),
                    // postalCode = EzString.EMPTY
                    EzUx.getInputValue('_sdPostalCode'),
                    // countryName = EzString.EMPTY
                    EzString.EMPTY,
                    // contactEmail = EzString.EMPTY
                    EzString.stringOrEmpty(
                        ezApi.ezclocker.ezClockerContext.ezGetUserContext().userAccount.userContactEmail),
                    // contactPhone = EzString.EMPTY
                    EzString.stringOrEmpty(
                        ezApi.ezclocker.ezClockerContext.ezGetSelectedEmployerAccount().mainContactNumber),
                    // providerCreditCardId = EzString.EMPTY
                    EzString.EMPTY,
                    // providerBillingAddressId = EzString.EMPTY
                    EzString.EMPTY,
                    // countryCodeAlpha2 = EzString.EMPTY
                    EzString.EMPTY,
                    // countryCodeAlpha3 = EzString.EMPTY
                    EzString.EMPTY,
                    // countryCodeNumeric = EzString.EMPTY
                    EzString.EMPTY,
                    ezApi.ezclocker.ezDateTime.activeTimeZone),
                // ezCreditCard
                new EzCreditCard(
                    // cardHolderName = EzString.empty
                    EzUx.getInputValue('_sdCardHolderName'),
                    // cardNumber = EzString.empty
                    EzUx.getInputValue('_sdCardNumber'),
                    // cardExpireDate = EzString.empty
                    EzUx.getInputValue('_sdCardExpireDate'),
                    // cardSpecialNumber = EzString.empty
                    EzUx.getInputValue('_sdCardSpecialNumber'),
                    // cardZipCode = EzString.empty
                    EzUx.getInputValue('_sdPostalCode'),
                    // discountId = EzString.empty
                    EzUx.getInputValue('EzSubscriptionDialogDiscountCode'),
                    // ezCreditCardType = EzString.empty
                    null,
                    // cardImageUrl = EzString.empty
                    null)));
    }

    /**
     * @public @method
     * Closes the dialog
     */
    ezClose() {
        ezApi.ezclocker.ezDialog.ezCloseDialog(EzSubscriptionDialog.ezInstance.ezDialogId);

        ezApi.ezclocker.ezEventEngine.ezTriggerEvent(
            EzSubscriptionDialog.ezEventNames.ezOnSubscriptionDialogClosed,
            ezApi.ezclocker.ezEventEngine.ezBuildEventData(
                EzSubscriptionDialog.ezApiName,
                'Subscription dialog closed.'));
    }

    /**
     * @public @method
     * Cancels the dialog (similar to close)
     */
    ezCancel() {
        EzSubscriptionDialog.ezInstance.ezClose();

        ezApi.ezclocker.ezEventEngine.ezTriggerEvent(
            EzSubscriptionDialog.ezEventNames.ezOnSubscriptionDialogCancel,
            ezApi.ezclocker.ezEventEngine.ezBuildEventData(
                EzSubscriptionDialog.ezApiName,
                'Subscription dialog canceled'));
    }

    /**
     * @public @method
     * Resets the dialog data to default values
     */
    ezResetDialog() {
        EzSubscriptionDialog.ezInstance.ezEnableButtons();

        EzUx.hide(`${EzSubscriptionDialog.ezInstance.ezDialogId}_ValidationErrorMessageContainer`);

        EzUx.clearAllInputValues([
            '_sdCompanyName',
            '_sdFirstName',
            '_sdLastName',
            '_sdStreetAddress',
            '_sdCity',
            '_sdState',
            '_sdPostalCode',
            '_sdCardHolderName',
            '_sdCardNumber',
            '_sdCardExpireDate',
            '_sdCardSpecialNumber',
            'EzSubscriptionDialogDiscountCode'
        ]);

        EzSubscriptionDialog.ezInstance.ezEnableButtons();
    }

    /**
     * @public @method
     * Loads the dialog with the known data
     */
    ezInitData() {
        EzSubscriptionDialog.ezInstance.ezResetDialog();

        EzUx.setInputValue(
            'EzSubscriptionDialogDiscountCode',
            EzString.stringOrEmpty(EzSubscriptionDialog.ezInstance.ezDiscountCode));


        EzSubscriptionDialog.ezInstance.ezLoadEmployerBillingData();

        EzSubscriptionDialog.ezInstance.ezLoadSubscriptionDetails();
    }

    /**
     * @public @method
     * Loads the employer's known billing data. If debug mode is on, will substitute any missing data
     * with the debug test billing data.
     */
    ezLoadEmployerBillingData() {
        EzUx.setInputValue(
            '_sdCompanyName',
            EzSubscriptionDialog.ezInstance.ezGetPreferredValue(
                'companyName',
                'companyName',
                EzSubscriptionDialog.ezInstance.ezBillingInfo,
                EzSubscriptionDialog.ezInstance.ezEmployerInfo,
                'Dolly & Moo\'s Veterinary Hospital'));

        EzUx.setInputValue(
            '_sdFirstName',
            EzBoolean.booleanOrFalse(ezApi.ezclocker.ezUrlHelper.ezDebugMode)
                ? EzString.stringWithLengthOrDefault(
                    EzSubscriptionDialog.ezInstance.ezBillingInfo.billingFirstName,
                    'Peggy')
                : EzString.stringOrEmpty(
                    EzSubscriptionDialog.ezInstance.ezBillingInfo.billingFirstName));

        EzUx.setInputValue(
            '_sdLastName',
            EzBoolean.booleanOrFalse(ezApi.ezclocker.ezUrlHelper.ezDebugMode)
                ? EzString.stringWithLengthOrDefault(
                    EzSubscriptionDialog.ezInstance.ezBillingInfo.billingFirstName,
                    'Sue')
                : EzString.stringOrEmpty(
                    EzSubscriptionDialog.ezInstance.ezBillingInfo.billingLastName));

        EzUx.setInputValue(
            '_sdStreetAddress',
            EzSubscriptionDialog.ezInstance.ezGetPreferredValue(
                'billingAddress',
                'streetAddress',
                EzSubscriptionDialog.ezInstance.ezBillingInfo,
                EzSubscriptionDialog.ezInstance.ezEmployerInfo,
                '6010 W. Spring Creek Pkwy, Suite G'));

        EzUx.setInputValue(
            '_sdCity',
            EzSubscriptionDialog.ezInstance.ezGetPreferredValue(
                'billingCity',
                'city',
                EzSubscriptionDialog.ezInstance.ezBillingInfo,
                EzSubscriptionDialog.ezInstance.ezEmployerInfo,
                'Plano'));

        EzUx.setInputValue(
            '_sdState',
            EzSubscriptionDialog.ezInstance.ezGetPreferredValue(
                'billingState',
                'addressState',
                EzSubscriptionDialog.ezInstance.ezBillingInfo,
                EzSubscriptionDialog.ezInstance.ezEmployerInfo,
                'TX'));

        EzUx.setInputValue(
            '_sdPostalCode',
            EzSubscriptionDialog.ezInstance.ezGetPreferredValue(
                'billingPostalCode',
                'addressPostalCode',
                EzSubscriptionDialog.ezInstance.ezBillingInfo,
                EzSubscriptionDialog.ezInstance.ezEmployerInfo,
                '75024'));

        if (EzBoolean.booleanOrFalse(ezApi.ezclocker.ezUrlHelper?.ezDebugMode)) {
            EzUx.setInputValue(
                '_sdCardHolderName',
                'Peggy Sue');

            EzUx.setInputValue(
                '_sdCardNumber',
                '4111111111111111');

            EzUx.setInputValue(
                '_sdCardExpireDate',
                ezApi.ezclocker.ezDateTime.ezNow()
                    .add(1, 'y')
                    .format('MM/YYYY'));

            EzUx.setInputValue(
                '_sdCardSpecialNumber',
                '111');
        }
    }

    /**
     * @public @method
     * Loads the subscription plan details
     */
    ezLoadSubscriptionDetails() {
        EzUx.setContent(
            `${EzSubscriptionDialog.ezInstance.ezDialogId}_SubscriptionDetails_SubscriptionPlanName`,
            `Subscribing to: ${EzSubscriptionDialog.ezInstance.ezSubscriptionPlanInfo.description}`);

        if (EzBillingFrequency.MONTHLY === EzSubscriptionDialog.ezInstance.ezSubscriptionPlanInfo.billingFrequency) {
            EzUx.setContent(
                `${EzSubscriptionDialog.ezInstance.ezDialogId}_SubscriptionDetails_SubscriptionPrice_ChargingBullet`,
                EzHtml.build`
                    EzClocker will charge your card $${EzSubscriptionDialog.ezInstance.ezSubscriptionPlanInfo.monthlyFee} (US) each month
                    while your subscription is active.`);
        } else {
            EzUx.setContent(
                `${EzSubscriptionDialog.ezInstance.ezDialogId}_SubscriptionDetails_SubscriptionPrice_ChargingBullet`,
                EzHtml.build`
                    EzClocker will charge your card $${EzSubscriptionDialog.ezInstance.ezSubscriptionPlanInfo.yearlyFee} (US) every 12 months
                    while your subscription is active.`);
        }
    }

    /**
     * @public @method
     * Validates the input data for submission.
     * @returns {boolean}
     */
    ezValidateSubmitData() {
        // companyName = EzString.EMPTY
        if (!EzString.hasLength(EzUx.getInputValue('_sdCompanyName')) &&
            !EzString.hasLength(EzUx.getInputValue('_sdFirstName')) &&
            !EzString.hasLength(EzUx.getInputValue('_sdLastName'))) {
            EzSubscriptionDialog.ezInstance.ezShowErrorMessage(
                'Please enter the company name and/or the billing contact\'s first name and last name.');

            EzUx.focus('_sdCompanyName')

            return false;
        }

        if (!EzString.hasLength(EzUx.getInputValue('_sdStreetAddress'))) {
            EzSubscriptionDialog.ezInstance.ezShowErrorMessage('Please enter the card holder\'s billing address street number and name.')

            EzUx.focus('_sdStreetAddress')

            return false;
        }

        if (!EzString.hasLength(EzUx.getInputValue('_sdCity'))) {
            EzSubscriptionDialog.ezInstance.ezShowErrorMessage('Please enter the card holder\'s billing address city.')

            EzUx.focus('_sdCity')

            return false;
        }

        if (!EzString.hasLength(EzUx.getInputValue('_sdState'))) {
            EzSubscriptionDialog.ezInstance.ezShowErrorMessage('Please enter the card holder\'s billing address state or provence.')

            EzUx.focus('_sdState')

            return false;
        }

        if (!EzString.hasLength(EzUx.getInputValue('_sdPostalCode'))) {
            EzSubscriptionDialog.ezInstance.ezShowErrorMessage('Please enter the card holder\'s billing address postal code.')

            EzUx.focus('_sdPostalCode')

            return false;
        }

        if (!EzString.hasLength(EzUx.getInputValue('_sdCardHolderName'))) {
            EzSubscriptionDialog.ezInstance.ezShowErrorMessage('Please enter the card holder\'s name (as it is on the card).')

            EzUx.focus('_sdCardHolderName')

            return false;
        }

        if (!EzString.hasLength(EzUx.getInputValue('_sdCardNumber'))) {
            EzSubscriptionDialog.ezInstance.ezShowErrorMessage('Please enter the card number.')

            EzUx.focus('_sdCardNumber')

            return false;
        }

        if (!EzString.hasLength(EzUx.getInputValue('_sdCardExpireDate'))) {
            EzSubscriptionDialog.ezInstance.ezShowErrorMessage('Please enter the card\'s expire date.')

            EzUx.focus('_sdCardExpireDate')

            return false;
        }

        if (!EzString.hasLength(EzUx.getInputValue('_sdCardSpecialNumber'))) {
            EzSubscriptionDialog.ezInstance.ezShowErrorMessage('Please enter the card\'s CVV or Security Code.')

            EzUx.focus('_sdCardSpecialNumber')

            return false;
        }

        return true;
    }

    /**
     * @public @method
     * Obtains a property value from either billingInfo or employerInfo (preferring billingInfo) and returns that value.
     * @param {string} billingInfoProp
     * @param {string} employerInfoProp
     * @param {undefined|null|object} billingInfo
     * Default: EzObject.EMPTY
     * @param {undefined|null|object} employerInfo
     * Default: EzObject.EMPTY
     * @param {undefined|null|string} defaultTestData
     * Default: EzString.EMPTY
     * When assigned and ezApi.ezclocker.ezUrlHelper.ezDebugMode is true and no other data is available, then the
     * defaultTestData is returned.
     * @returns {string}
     */
    ezGetPreferredValue(billingInfoProp, employerInfoProp, billingInfo = EzObject.EMPTY, employerInfo = EzObject.EMPTY, defaultTestData = EzString.EMPTY) {
        if (!EzString.hasLength(billingInfoProp)) {
            throw new EzBadParamException(
                'billingInfoProp',
                EzSubscriptionDialog.ezInstance,
                EzSubscriptionDialog.ezInstance.ezGetPreferredValue);
        }
        if (!EzString.hasLength(employerInfoProp)) {
            throw new EzBadParamException(
                'employerInfoProp',
                EzSubscriptionDialog.ezInstance,
                EzSubscriptionDialog.ezInstance.ezGetPreferredValue);
        }

        let value = EzString.hasLength(billingInfo?.[billingInfoProp])
            ? billingInfo[billingInfoProp]
            : EzString.stringOrEmpty(employerInfo?.[employerInfoProp]);

        if (!EzString.hasLength(value)) {
            value = EzBoolean.booleanOrFalse(ezApi.ezclocker.ezUrlHelper?.ezDebugMode)
                ? defaultTestData
                : EzString.EMPTY;
        }

        return value;
    }

    /**
     * @public @method
     * Displays the provided error message in the dialog
     * @param {string} errorMessage
     */
    ezShowErrorMessage(errorMessage) {
        EzUx.setContent(
            `${EzSubscriptionDialog.ezInstance.ezDialogId}_ValidationErrorMessageContainer`,
            errorMessage);

        EzUx.show(`${EzSubscriptionDialog.ezInstance.ezDialogId}_ValidationErrorMessageContainer`);
    }

    /**
     * @public @method
     * Disables the dialogs submission buttons
     */
    ezDisableButtons() {
        EzUx.disableAll([
            '_SubscriptionDialog_SubscribeButton',
            '_SubscriptionDialog_CancelButton']);
    }

    /**
     * @public @method
     * Enables the dialogs submission buttons
     */
    ezEnableButtons() {
        EzUx.enableAll([
            '_SubscriptionDialog_SubscribeButton',
            '_SubscriptionDialog_CancelButton']);
    }

    /**
     * @public @method
     * Processes the subscription payment using the data entered in the dialog.
     * @param {EzPaymentInfoRequest} ezPaymentInfoRequest
     */
    ezProcessSubscriptionPayment(ezPaymentInfoRequest) {
        return ezApi.ezclocker.ezUi.ezStartPageWaitExecute(
            'Contacting payment processor (can take a few minutes to complete) ...',
            (waitDone) => {
                ezApi.ezclocker.ezSubscriptionService.ezSubcribeEmployerToPlan(
                    EzSubscriptionDialog.ezInstance.ezSubscriptionPlanInfo.id,
                    ezPaymentInfoRequest)
                    .then(
                        (response) => {
                            ezApi.ezclocker.ezEventEngine.ezTriggerEvent(
                                EzBillingAddressDialog.ezEventNames.onBillingAddressDialogSubmitted,
                                ezApi.ezclocker.ezEventEngine.ezBuildEventData(
                                    EzBillingAddressDialog.ezApiName,
                                    'Billing address updated.',
                                    response));

                            ezApi.ezclocker.ezEventEngine.ezTriggerEvent(
                                EzSubscriptionDialog.ezEventNames.ezOnSubscriptionDialogSubscribeSuccess,
                                ezApi.ezclocker.ezEventEngine.ezBuildEventData(
                                    EzSubscriptionDialog.ezApiName,
                                    'Subscribe to plan success.',
                                    response));

                            EzSubscriptionDialog.ezInstance.ezClose();

                            return waitDone()
                                .then(
                                    () => EzSubscriptionDialog.ezInstance.ezResetDialog());
                        },
                        (eResponse) => waitDone()
                            .then(
                                () => {
                                    if (401 == eResponse.errorCode) {
                                        return ezApi.ezclocker.ezDialog.ezShowErrorDialog(
                                            'Billing and Card Information Error',
                                            eResponse.message)
                                            .then(EzPromise.ignoreResolve);
                                    }

                                    return ezApi.ezclocker.ezDialog.ezShowServiceResponseErrorDialog(
                                        'Subscription Error',
                                        EzHtml.build`
                                            <p>
                                                EzClocker is unable to process your subscription payment due to the following error:
                                                ${EzString.stringOrDefault(eResponse.message, 'No reason provided.')}.
                                            </p>
                                            <p>
                                                Please contact <a href="mailto:support@ezclocker.com">support@ezclocker.com</a> and include the
                                                additional details below in the email.
                                            </p>`,
                                        EzHtml.build`
                                            {
                                                "errorMessage": "Subscription update/renewal failed for subsscriptionPlanId=${EzSubscriptionDialog.ezInstance.ezSubscriptionPlanInfo.id}",
                                                "errorResponse:" ${EzJson.toJson(eResponse)}
                                            }`,
                                        true)
                                        .then(
                                            () => {
                                                EzSubscriptionDialog.ezInstance.ezEnableButtons();

                                                ezApi.ezclocker.ezEventEngine.ezTriggerEvent(
                                                    EzSubscriptionDialog.ezEventNames.ezOnSubscriptionDialogSubscribeError,
                                                    ezApi.ezclocker.ezEventEngine.ezBuildEventData(
                                                        EzSubscriptionDialog.ezApiName,
                                                        'Subscribe to plan failed.',
                                                        eResponse));
                                            });
                                }));
            });
    }

    /**
     * @protected @method
     * Handles the `${EzSubscriptionDialog.ezInstance.ezDialogId}_MoreDetailsButton` (more details) button event click
     */
    ezHandleMoreDetailsClickEvent() {
        EzSubscriptionDialog.ezInstance.ezMoreDetailsVisible = !EzSubscriptionDialog.ezInstance.ezMoreDetailsVisible;
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
     * Returns the name of this class's singleton instance when registered with ezApi.
     * @returns {string}
     */
    static get ezApiName() {
        return 'ezSubscriptionDialog';
    }

    /**
     * @static
     * @public @readonly @property
     * Returns an object of event names that this class may trigger.
     * @returns {object}
     */
    static get ezEventNames() {
        return {
            onReady: 'ezOn_EzSubscriptionDialog_Ready',
            ezOnSubscriptionDialogSubscribeSuccess: 'ezOn_EzSubscriptionDialog_Subscribe_Success',
            ezOnSubscriptionDialogSubscribeError: 'ezOn_EzSubscriptionDialog_Subscribe_Error',
            ezOnSubscriptionDialogCancel: 'ezOn_EzSubscriptionDialog_Canceled',
            ezOnSubscriptionDialogClosed: 'ezOn_EzSubscriptionDialog_Closed'
        };
    }

    /**
     * @static
     * @private @field
     * Stores the singleton instance of this class that was created by and registerd with EzApi.
     * @type {EzAccountViewController}
     */
    static #ezInstance = globalThis?.ezApi?.ready && globalThis.ezApi?.ezclocker?.[EzSubscriptionDialog.ezApiName]
        ? globalThis.ezApi.ezclocker[EzSubscriptionDialog.ezApiName]
        : null;
    /**
     * @static
     * @public @property @getter
     * Returns the singleton instance of this class that is registered with EzApi (if available yet)
     * @returns {EzAccountViewController}
     */
    static get ezInstance() {
        return EzSubscriptionDialog.#ezInstance;
    }
    /**
     * @static
     * @public @property @setter
     * Sets the singleton instance of of this class that is registered with EzApi.
     * @param {EzAccountViewController} instance
     */
    static set ezInstance(ezSubscriptionDialog) {
        if (null != EzSubscriptionDialog.#ezInstance) {
            ezApi.ezclocker.ezLogger.error('EzSubscriptionDialog\'s singleton instance is already assigned.');
            return;
        }

        EzSubscriptionDialog.#ezInstance = ezSubscriptionDialog;
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
    static #ezApiRegistrationState = globalThis?.ezApi?.ready && globalThis.ezApi?.ezclocker?.[EzAccountViewController.ezApiName]
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
        return EzSubscriptionDialog.#ezApiRegistrationState;
    }
    /**
     * @static
     * @public @property @setter
     * Sets the ezApi registration state of this classes's singleton instance.
     * @param {string} ezApiRegistrationState
     * A valid enum property value from EzRegistrationState
     */
    static set ezApiRegistrationState(registrationState) {
        EzSubscriptionDialog.#ezApiRegistrationState = EzRegistrationState.ezValueOf(registrationState);
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
        return EzRegistrationState.PENDING === EzSubscriptionDialog.ezApiRegistrationState &&
            globalThis?.ezApi?.ready &&
            globalThis.ezApi?.ezclocker?.[EzEventEngine.ezApiName]?.ready &&
            globalThis.ezApi?.ezclocker?.[EzNavigation.ezApiName]?.ready &&
            globalThis.ezApi?.ezclocker?.[EzHttpHelper.ezApiName]?.ready &&
            globalThis.ezApi?.ezclocker?.[EzUI.ezApiName]?.ready &&
            globalThis.ezApi?.ezclocker?.[EzDialog.ezApiName]?.ready &&
            globalThis.ezApi?.ezclocker?.[EzDebug.ezApiName]?.ready;
    }

    /**
     * @static
     * @private @readonly @property
     * Returns if this class's singleton instance is registered with ezApi yet.
     * @returns {boolean}
     */
    static get #ezIsRegistered() {
        return null != EzSubscriptionDialog.ezInstance &&
            EzRegistrationState.REGISTERED === EzSubscriptionDialog.ezApiRegistrationState;
    }

    /**
     * @static
     * @private @method
     * Attempts to register the singleton instance for this class with ezApi. Returns true
     * if successful, false otherwise.
     * @returns {boolean}
     */
    static #ezRegistrator() {
        if (EzSubscriptionDialog.#ezCanRegister && !EzSubscriptionDialog.#ezIsRegistered) {
            globalThis.ezApi.ezRegisterNewApi(EzSubscriptionDialog, EzSubscriptionDialog.ezApiName);
        }

        return EzSubscriptionDialog.#ezIsRegistered;
    }

    /**
     * @static
     * Static Initialization
     * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
     * >> IMPORTANT <<
     * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
     * Make sure the following properties and methods get defined BEFORE this static initialization section:
     *     1) Property getter EzSubscriptionDialog.ezApiName
     *     2) Property getter EzSubscriptionDialog.ezEventNames
     *     3) Property getter EzSubscriptionDialog.ezInstance
     *     4) Property setter EzSubscriptionDialog.ezInstance
     *     5) Property getter EzSubscriptionDialog.ezApiRegistrationState
     *     6) Property setter EzSubscriptionDialog.ezApiRegistrationState
     *     7) Property getter EzSubscriptionDialog.#ezCanRegister
     *     8) Property getter EzSubscriptionDialog.#ezIsRegistered
     *     9) Method EzSubscriptionDialog.#ezRegistrator()
     */
    static {
        if (null == EzSubscriptionDialog.ezApiRegistrationState) {
            EzSubscriptionDialog.ezApiRegistrationState = EzRegistrationState.PENDING;

            if (!EzSubscriptionDialog.#ezRegistrator()) {
                document.addEventListener(
                    EzSubscriptionDialog.ezOnEzApiReadyEventName,
                    EzSubscriptionDialog.#ezRegistrator);

                document.addEventListener(
                    EzEventEngine.ezEventNames.onReady,
                    EzSubscriptionDialog.#ezRegistrator);

                document.addEventListener(
                    EzNavigation.ezEventNames.onReady,
                    EzSubscriptionDialog.#ezRegistrator);

                document.addEventListener(
                    EzHttpHelper.ezEventNames.onReady,
                    EzSubscriptionDialog.#ezRegistrator);

                document.addEventListener(
                    EzUI.ezEventNames.onReady,
                    EzSubscriptionDialog.#ezRegistrator);

                document.addEventListener(
                    EzDialog.ezEventNames.onReady,
                    EzSubscriptionDialog.#ezRegistrator);

                document.addEventListener(
                    EzDebug.ezEventNames.onReady,
                    EzSubscriptionDialog.#ezRegistrator);
            }
        }
    }

    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    // NO CODE AFTER THIS SECTION
    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
}
