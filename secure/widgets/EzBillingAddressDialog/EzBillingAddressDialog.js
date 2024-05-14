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

import { EzBillingAddress } from '/ezlibrary/entities/EzBillingAddress.js';

import { EzSubscriptionService } from '/public/javascript/services/ezclocker-subscriptions.js';

import { EzUI } from '/public/javascript/common/ezui.js';

import { EzDialogConfig } from '/ezlibrary/ux/dialogs/EzDialogConfig.js';

import { EzDialog } from '/public/javascript/common/ezclocker-dialog-helper.js';

/**
    @class
    @extends {EzClass}
    @description
    Controller for the account the billing address dialog
    -----------------------------------------------------------------
    Import with:
        import { EzBillingAddressDialog } from '/secure/widgets/EzBillingAddressDialog/EzBillingAddressDialog.js';
   ---------------------------------------------------------------------------
    Singleton instance ready for use when the below evaluates to true:
        globalThis.ezApi.ezclocker[EzBillingAddressDialog.ezApiName] &&
        globalThis.ezApi.ezclocker[EzBillingAddressDialog.ezApiName].ready;
    ---------------------------------------------------------------------------
    Listen to onReady event:
        document.addEventListener(
            EzBillingAddressDialog.ezEventNames.onReady,
            this.#ezRegistrator);
    ---------------------------------------------------------------------------
    Singleton Instance Reference:
        ezApi.ezclocker.ezBillingAddressDialog
    ---------------------------------------------------------------------------
 */
export class EzBillingAddressDialog extends EzClass {
    /**
        @static
        @public @readonly @property
        Returns the name of this class's singleton instance when registered with ezApi.
        @returns {string}
     */
    static get ezApiName() {
        return 'ezBillingAddressDialog';
    }

    /**
        @static
        @public @readonly @property
        Returns an object of event names that this class may trigger.
        @returns {object}
     */
    static get ezEventNames() {
        return {
            onReady: 'ezOn_EzBillingAddressDialog_ApiReady',
            onBillingAddressDialogSubmitted: 'ezOn_EzBillingAddressDialog_Submitted',
            onBillingAddressDialogError: 'ezOn_EzBillingAddressDialog_Error',
            onBillingAddressDialogCancled: 'ezOn_EzBillingAddressDialog_Canceled'
        };
    }

    /**
            @static
            @private @field
            Stores the singleton instance of this class that was created by and registerd with EzApi.
            @type {EzBillingAddressDialog}
         */
    static #ezInstance = EzObject.hasProperty(globalThis, 'ezApi') &&
        EzObject.isValid(globalThis.ezApi) && EzBoolean.isTrue(globalThis.ezApi.ready) &&
        EzObject.isValid(globalThis.ezApi.ezclocker[EzBillingAddressDialog.ezApiName])
        ? globalThis.ezApi.ezclocker[EzBillingAddressDialog.ezApiName]
        : null;

    /**
        @static
        @public @property @getter
        Returns the singleton instance of this class that is registered with EzApi (if available yet)
        @returns {EzBillingAddressDialog}
     */
    static get ezInstance() {
        return EzBillingAddressDialog.#ezInstance;
    }

    /**
        @static
        @public @property @setter
        Sets the singleton instance of of this class that is registered with EzApi.
        @param {EzBillingAddressDialog} instance
     */
    static set ezInstance(instance) {
        if (null != EzBillingAddressDialog.#ezInstance) {
            throw new Error('EzBillingAddressDialog\'s singleton instance is already reigstered with EzApi.');
        }

        EzBillingAddressDialog.#ezInstance = instance;
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
    static #ezApiRegistrationState = EzObject.hasProperty(globalThis, 'ezApi') &&
        EzObject.isValid(globalThis.ezApi) && EzBoolean.isTrue(globalThis.ezApi.ready) &&
        EzObject.isValid(globalThis.ezApi.ezclocker[EzBillingAddressDialog.ezApiName])
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
        return EzBillingAddressDialog.#ezApiRegistrationState;
    }

    /**
        @static
        @public @property @setter
        Sets the ezApi registration state of this classes's singleton instance.
        @param {string} ezApiRegistrationState
        A valid enum property value from EzRegistrationState
     */
    static set ezApiRegistrationState(ezApiRegistrationState) {
        EzBillingAddressDialog.#ezApiRegistrationState = EzRegistrationState.ezValueOf(ezApiRegistrationState);
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
        return EzRegistrationState.PENDING === EzBillingAddressDialog.ezApiRegistrationState &&
            EzObject.hasProperty(globalThis, 'ezApi') &&
            EzObject.isValid(globalThis.ezApi) && EzBoolean.isTrue(globalThis.ezApi.ready) &&

            globalThis.ezApi.ezclocker[EzSubscriptionService.ezApiName] &&
            globalThis.ezApi.ezclocker[EzSubscriptionService.ezApiName].ready &&

            globalThis.ezApi.ezclocker[EzUI.ezApiName] &&
            globalThis.ezApi.ezclocker[EzUI.ezApiName].ready &&

            globalThis.ezApi.ezclocker[EzDialog.ezApiName] &&
            globalThis.ezApi.ezclocker[EzDialog.ezApiName].ready;
    }

    /**
        @static
        @private @readonly @property
        Returns if this class's singleton instance is registered with ezApi yet.
        @returns {boolean}
     */
    static get #ezIsRegistered() {
        return null != EzBillingAddressDialog.ezInstance &&
            EzRegistrationState.REGISTERED === EzBillingAddressDialog.ezApiRegistrationState;
    }

    /**
        @static
        @private @method
        Attempts to register the singleton instance for this class with ezApi. Returns true
        if successful, false otherwise.
        @returns {boolean}
     */
    static #ezRegistrator() {
        if (EzBillingAddressDialog.#ezCanRegister && !EzBillingAddressDialog.#ezIsRegistered) {
            globalThis.ezApi.ezRegisterNewApi(EzBillingAddressDialog, EzBillingAddressDialog.ezApiName);
        }

        return EzBillingAddressDialog.#ezIsRegistered;
    }

    /**
        @static
        Static Initialization
        ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        >> IMPORTANT <<
        ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        Make sure the following properties and methods get defined BEFORE this static initialization section:
            1) Property getter EzBillingAddressDialog.ezApiName
            2) Property getter EzBillingAddressDialog.ezEventNames
            3) Property getter EzBillingAddressDialog.ezInstance
            4) Property setter EzBillingAddressDialog.ezInstance
            5) Property getter EzBillingAddressDialog.ezApiRegistrationState
            6) Property setter EzBillingAddressDialog.ezApiRegistrationState
            7) Property getter EzBillingAddressDialog.#ezCanRegister
            8) Property getter EzBillingAddressDialog.#ezIsRegistered
            9) Method EzBillingAddressDialog.#ezRegistrator()
     */
    static {
        if (!EzBillingAddressDialog.#ezIsRegistered) {
            EzBillingAddressDialog.ezApiRegistrationState = EzRegistrationState.PENDING;

            if (!EzBillingAddressDialog.#ezRegistrator()) {
                document.addEventListener(
                    EzBillingAddressDialog.ezOnEzApiReadyEventName,
                    EzBillingAddressDialog.#ezRegistrator);

                document.addEventListener(
                    EzSubscriptionService.ezEventNames.onReady,
                    EzBillingAddressDialog.#ezRegistrator);

                document.addEventListener(
                    EzUI.ezEventNames.onReady,
                    EzBillingAddressDialog.#ezRegistrator);

                document.addEventListener(
                    EzDialog.ezEventNames.onReady,
                    EzBillingAddressDialog.#ezRegistrator);
            }
        }
    }

    /**
        @public @constructor
        >> DO NOT CREATE NEW INSTANCES OUTSIDE OF THE STATIC INITIALIZATION FLOW <<
        Use the static singleton instance available from ezApi: ezApi.ezclocker.ezBillingAddressDialog.
     */
    constructor() {
        super();
    }

    /**
        @private @field
        Stores the onSubmitted function reference
        @type {function}
     */
    #onSubmitted = null;
    /**
        @public @property @getter
        Gets the onSubmitted function reference
        @returns {null|function}
     */
    get onSubmitted() {
        return this.#onSubmitted;
    }
    /**
        @public @property @setter
        Sets the onSubmitted function reference
        @param {undefined|null|function} onSubmitted
     */
    set onSubmitted(onSubmitted) {
        this.onSubmitted = EzFunction.functionOrNull(onSubmitted);
    }

    /**
        @public @field
        Stores the onCancel function reference
        @type {function}
     */
    #onCancel = null;
    /**
        @public @property @getter
        Gets the onCancel function reference
        @returns {null|function}
     */
    get onCancel() {
        return this.#onCancel;
    }
    /**
        @public @property @setter
        Sets the onCancel function reference
        @param {undefined|null|function} onCancel
     */
    set onSubmitted(onCancel) {
        this.onCancel = EzFunction.functionOrNull(onCancel);
    }

    /**
        @public @field
        Stores the onError function reference
        @type {function}
     */
    #onError = null;
    /**
        @public @property @getter
        Gets the onError function reference
        @returns {null|function}
     */
    get onError() {
        return this.#onError;
    }
    /**
        @public @property @setter
        Sets the onError function reference
        @param {undefined|null|function} onError
     */
    set onSubmitted(onError) {
        this.onError = EzFunction.functionOrNull(onError);
    }

    /**
        @public @readonly @property
        Gets this dialog's element id
        @returns {string}
     */
    get ezDialogId() {
        return 'EzUpdateBillingInformationDialog';
    }

    /**
        @public @readonly @property
        Gets an object of key/values for commonly used element ids
        @returns {object}
     */
    get ezIds() {
        return {
            dialogId: this.ezDialogId,
            inputs: {
                firstNameInputId: `${this.ezDialogId}_FirstName`,
                lastNameInputId: `${this.ezDialogId}_LastName`,
                streetAddressInputId: `${this.ezDialogId}_StreetAddress`,
                cityInputId: `${this.ezDialogId}_City`,
                stateInputId: `${this.ezDialogId}_State`,
                postalCodeInputId: `${this.ezDialogId}_PostalCode`
            }
        };
    }

    /**
        @public @readonly @property
        Gets the static html for this dialog's ux
        @returns {string}
     */
    get ezDialogHtml() {
        return EzHtml.build`
            <div
                id="${EzBillingAddressDialog.ezInstance.ezDialogId}"
                title="Update Billing Information">
                <form
                    id="_UpdateBillingInformationForm"
                    action="/_subscriptionPlan/updateBillingAddress/"
                    enctype="application/json"
                    method="post">
                    <table
                        id="EzAccountUpdateBillingInformationDialogNameTable"
                        class="subscriptionTable">
                        <tr>
                            <td
                                class="subscriptionCell">
                                <label
                                    class="subscriptionLabel"
                                    for="${EzBillingAddressDialog.ezInstance.ezIds.inputs.firstNameInputId}">
                                    First Name
                                </label>
                            </td>
                            <td
                                class="subscriptionCell">
                                <label
                                    for="${EzBillingAddressDialog.ezInstance.ezIds.inputs.lastNameInputId}">
                                    Last Name
                                </label>
                            </td>
                        </tr>
                        <tr>
                            <td
                                class="subscriptionCell">
                                <input
                                    id="${EzBillingAddressDialog.ezInstance.ezIds.inputs.firstNameInputId}"
                                    type="text"
                                    class="dialogInput"
                                    name="BILLING_ADDRESS_FIRST_NAME" />
                            </td>
                            <td
                                class="subscriptionCell">
                                <input
                                    id="${EzBillingAddressDialog.ezInstance.ezIds.inputs.lastNameInputId}"
                                    type="text"
                                    class="dialogInput"
                                    name="BILLING_ADDRESS_LAST_NAME" />
                                <br />
                            </td>
                        </tr>
                    </table>
                    <table
                        id="EzAccountUpdateBillingInformationDialogAddressTable"
                        class="subscriptionTable">
                        <tr>
                            <td
                                class="subscriptionCell">
                                <label
                                    class="subscriptionLabel"
                                    for="${EzBillingAddressDialog.ezInstance.ezIds.inputs.streetAddressInputId}">
                                    Street Address
                                </label>
                            </td>
                        </tr>
                        <tr>
                            <td
                                class="subscriptionCell">
                                <input
                                    id="${EzBillingAddressDialog.ezInstance.ezIds.inputs.streetAddressInputId}"
                                    type="text"
                                    class="dialogInput"
                                    name="BILLING_ADDRESS_STREET_ADDRESS" />
                                <br />
                            </td>
                        </tr>
                    </table>
                    <table
                        id="EzAccountUpdateBillingInformationDialogCityTable"
                        class="subscriptionTable">
                        <tr>
                            <td
                                class="subscriptionCell">
                                <label
                                    class="subscriptionLabel"
                                    for="${EzBillingAddressDialog.ezInstance.ezIds.inputs.cityInputId}">
                                    City
                                </label>
                            </td>
                        </tr>
                        <tr>
                            <td
                                class="subscriptionCell">
                                <input
                                    id="${EzBillingAddressDialog.ezInstance.ezIds.inputs.cityInputId}"
                                    class="dialogInput"
                                    type="text"
                                    name="BILLING_ADDRESS_CITY" />
                            </td>
                        </tr>
                    </table>
                    <table
                        id="EzAccountUpdateBillingInformationDialogStateZipTableHeader"
                        class="subscriptionTable">
                        <tr>
                            <td
                                class="subscriptionCell">
                                <label
                                    class="subscriptionLabel"
                                    for="${EzBillingAddressDialog.ezInstance.ezIds.inputs.stateInputId}">
                                    State/Providence
                                </label>
                            </td>
                            <td
                                class="subscriptionCell">
                                <label
                                    for="${EzBillingAddressDialog.ezInstance.ezIds.inputs.postalCodeInputId}"
                                    class="subscriptionLabel">
                                    Zipcode
                                </label>
                            </td>
                        </tr>
                        <tr>
                            <td
                                class="subscriptionCell">
                                <input
                                    id="${EzBillingAddressDialog.ezInstance.ezIds.inputs.stateInputId}"
                                    class="dialogInput"
                                    type="text"
                                    name="BILLING_ADDRESS_STATE" />
                            </td>
                            <td
                                class="subscriptionCell">
                                <input
                                    id="${EzBillingAddressDialog.ezInstance.ezIds.inputs.postalCodeInputId}"
                                    class="dialogInput"
                                    type="text"
                                    name="BILLING_ADDRESS_ZIP_CODE" />
                            </td>
                        </tr>
                    </table>
                </form>
            </div>`;
    }

    /**
        @protected @method
        Initializes EzBillingAddressDialog
        @returns {EzBillingAddressDialog}
     */
    ezInit() {
        ezApi.ezclocker.ezEventEngine.ezRegisterEvent(
            EzBillingAddressDialog.ezApiName,
            EzBillingAddressDialog.ezEventNames.onBillingAddressDialogSubmitted);

        ezApi.ezclocker.ezEventEngine.ezRegisterEvent(
            EzBillingAddressDialog.ezApiName,
            EzBillingAddressDialog.ezEventNames.onBillingAddressDialogError);

        ezApi.ezclocker.ezEventEngine.ezRegisterEvent(
            EzBillingAddressDialog.ezApiName,
            EzBillingAddressDialog.ezEventNames.onBillingAddressDialogCancled);

        EzBillingAddressDialog.ezInstance.ezInitUX();

        return EzBillingAddressDialog.ezInstance;
    }

    /**
        @protected @method
        Initializes the EzBillingAddressDialog UX
     */
    ezInitUX() {
        let dialogConfig = new EzDialogConfig(EzBillingAddressDialog.ezInstance.ezDialogId);
        dialogConfig.title = 'Update Billing Information';
        dialogConfig.width = 600;
        dialogConfig.ezDialogContentHtml = EzBillingAddressDialog.ezInstance.ezDialogHtml;
        dialogConfig.buttons = {
            'Update': EzBillingAddressDialog.ezInstance.ezSubmit,
            Cancel: EzBillingAddressDialog.ezInstance.ezCancel
        };

        ezApi.ezclocker.ezDialog.ezInitAndInjectDialog(dialogConfig);
    }

    /**
        @public @method
        esets the dialog inputs to the default values.
     */
    ezResetDialogData() {
        ezApi.ezclocker.ezUi.ezSetInputValue(
            EzBillingAddressDialog.ezInstance.ezIds.inputs.firstNameInputId,
            EzString.EMPTY);

        ezApi.ezclocker.ezUi.ezSetInputValue(
            EzBillingAddressDialog.ezInstance.ezIds.inputs.lastNameInputId,
            EzString.EMPTY);

        ezApi.ezclocker.ezUi.ezSetInputValue(
            EzBillingAddressDialog.ezInstance.ezIds.inputs.streetAddressInputId,
            EzString.EMPTY);

        ezApi.ezclocker.ezUi.ezSetInputValue(
            EzBillingAddressDialog.ezInstance.ezIds.inputs.cityInputId,
            EzString.EMPTY);

        ezApi.ezclocker.ezUi.ezSetInputValue(
            EzBillingAddressDialog.ezInstance.ezIds.inputs.stateInputId,
            EzString.EMPTY);

        ezApi.ezclocker.ezUi.ezSetInputValue(
            EzBillingAddressDialog.ezInstance.ezIds.inputs.postalCodeInputId,
            EzString.EMPTY);
    }

    /**
        @protected @method
        Initializes the dialog's data
     */
    ezInitData() {
        if (EzBoolean.isFalse(ezApi.ezclocker.ezClockerContext.ezSubscriptionContextHasBillingAddress())) {
            EzBillingAddressDialog.ezInstance.ezResetDialogData();

            return;
        }

        let activeBillingAddress = ezApi.ezclocker.ezClockerContext.ezGetSubscriptionContextBillingAddress();

        ezApi.ezclocker.ezUi.ezSetInputValue(
            EzBillingAddressDialog.ezInstance.ezIds.inputs.firstNameInputId,
            EzString.stringOrEmpty(activeBillingAddress.billingFirstName));

        ezApi.ezclocker.ezUi.ezSetInputValue(
            EzBillingAddressDialog.ezInstance.ezIds.inputs.lastNameInputId,
            EzString.stringOrEmpty(activeBillingAddress.billingLastName));

        ezApi.ezclocker.ezUi.ezSetInputValue(
            EzBillingAddressDialog.ezInstance.ezIds.inputs.streetAddressInputId,
            EzString.stringOrEmpty(activeBillingAddress.billingStreetAddress));

        ezApi.ezclocker.ezUi.ezSetInputValue(
            EzBillingAddressDialog.ezInstance.ezIds.inputs.cityInputId,
            EzString.stringOrEmpty(activeBillingAddress.billingCity));

        ezApi.ezclocker.ezUi.ezSetInputValue(
            EzBillingAddressDialog.ezInstance.ezIds.inputs.stateInputId,
            EzString.stringOrEmpty(activeBillingAddress.billingState));

        ezApi.ezclocker.ezUi.ezSetInputValue(
            EzBillingAddressDialog.ezInstance.ezIds.inputs.postalCodeInputId,
            EzString.stringOrEmpty(activeBillingAddress.billingPostalCode));
    }

    /**
        @public @method
        Shows the dialog
        @param {function|null} onSubmitedHandler
        @param {function|null} onErrorHandler
        @param {function|null} onCancelHandler
     */
    ezShow() {
        EzBillingAddressDialog.ezInstance.ezInitData();

        ezApi.ezclocker.ezDialog.ezShowDialog(EzBillingAddressDialog.ezInstance.ezDialogId);
    }

    /**
        @public @method
        Cancels/Closes the dialog without submitting. Fires onCancel call back
     */
    ezCancel() {
        EzBillingAddressDialog.ezInstance.ezClose();

        ezApi.ezclocker.ezEventEngine.ezTriggerEvent(
            EzBillingAddressDialog.ezEventNames.onBillingAddressDialogCancled);
    }

    /**
        @public @method
        Cancels/Closes the dialog without submitting. Does not call onCancel callback
     */
    ezClose() {
        ezApi.ezclocker.ezDialog.ezCloseDialog(EzBillingAddressDialog.ezInstance.ezDialogId);
    }

    /**
        @protected @method
        Submits the dialog data
     */
    ezSubmit() {
        ezApi.ezclocker.ezUi.ezStartPageWaitExecute(
            'Updating billing address ...',
            (waitDone) => {
                let name = EzString.msg`
                    ${ezApi.ezclocker.ezUi.ezGetInputValue(EzBillingAddressDialog.ezInstance.ezIds.inputs.firstNameInputId)}
                    ${ezApi.ezclocker.ezUi.ezGetInputValue(EzBillingAddressDialog.ezInstance.ezIds.inputs.lastNameInputId)}`;

                let activeBillingAddress = ezApi.ezclocker.ezClockerContext.ezGetSubscriptionContextBillingAddress();

                let ezBillingAddress = new EzBillingAddress(
                    // employerId
                    ezApi.ezclocker.ezClockerContext.ezGetActiveEmployer().id,
                    // employeeId
                    null,
                    // personalId
                    null,
                    // companyName
                    activeBillingAddress.companyName,
                    // firstName
                    ezApi.ezclocker.ezUi.ezGetInputValue(EzBillingAddressDialog.ezInstance.ezIds.inputs.firstNameInputId),
                    // lastName,
                    ezApi.ezclocker.ezUi.ezGetInputValue(EzBillingAddressDialog.ezInstance.ezIds.inputs.lastNameInputId),
                    // streetAddress
                    ezApi.ezclocker.ezUi.ezGetInputValue(EzBillingAddressDialog.ezInstance.ezIds.inputs.streetAddressInputId),
                    //extendedAddress
                    EzString.EMPTY,
                    // locality
                    ezApi.ezclocker.ezUi.ezGetInputValue(EzBillingAddressDialog.ezInstance.ezIds.inputs.cityInputId),
                    // region
                    ezApi.ezclocker.ezUi.ezGetInputValue(EzBillingAddressDialog.ezInstance.ezIds.inputs.stateInputId),
                    // postalCode
                    ezApi.ezclocker.ezUi.ezGetInputValue(EzBillingAddressDialog.ezInstance.ezIds.inputs.postalCodeInputId),
                    // countryName
                    EzString.EMPTY,
                    // contactEmail
                    EzString.EMPTY,
                    // contactPhone
                    EzString.EMPTY,
                    // providerCreditCardId
                    EzString.EMPTY,
                    // providerBillingAddressId
                    EzString.EMPTY,
                    // countryCodeAlpha2
                    EzString.EMPTY,
                    // countryCodeAlpha3
                    EzString.EMPTY,
                    // countryCodeNumeric
                    EzString.EMPTY);

                ezApi.ezclocker.ezSubscriptionService.ezUpdateActiveEmployerBillingAddress(ezBillingAddress)
                    .then(
                        (response) => waitDone()
                            .then(
                                () => {
                                    EzBillingAddressDialog.ezInstance.ezClose();

                                    ezApi.ezclocker.ezEventEngine.ezTriggerEvent(
                                        EzBillingAddressDialog.ezEventNames.onBillingAddressDialogSubmitted,
                                        ezApi.ezclocker.ezEventEngine.ezBuildEventData(
                                            EzBillingAddressDialog.ezApiName,
                                            'Billing address updated.',
                                            response));
                                }),
                        (eResponse) => waitDone()
                            .then(
                                () => ezApi.ezclocker.ezEventEngine.ezTriggerEvent(
                                    EzBillingAddressDialog.ezEventNames.onBillingAddressDialogError,
                                    ezApi.ezclocker.ezEventEngine.ezBuildEventData(
                                        EzBillingAddressDialog.ezApiName,
                                        'Billing address update failed.',
                                        eResponse))));
            });
    }
}
