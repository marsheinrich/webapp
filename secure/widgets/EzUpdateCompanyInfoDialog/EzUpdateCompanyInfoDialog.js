import {
    EzObject,
    EzBoolean,
    EzString,
    EzHtml,
    EzPromise,
    EzJson
} from '/ezlibrary/helpers/EzHelpers.js';

import {
    EzRegistrationState
} from '/ezlibrary/enums/EzEnumerations.js';

import { EzClass } from '/ezlibrary/EzClass.js';
import { EzEventEngine } from '/ezlibrary/ez-event-engine.js';

import { EzHttpHelper } from '/public/javascript/common/ezclocker-http-helper.js';
import { EzNavigation } from '/public/javascript/common/ezclocker-navigation-helper.js';
import { EzUI } from '/public/javascript/common/ezui.js';

import { EzDialogConfig } from '/ezlibrary/ux/dialogs/EzDialogConfig.js';

import { EzDialog } from '/public/javascript/common/ezclocker-dialog-helper.js';

/**
    @class
    @extends {EzClass}
    @description
    Handles operations for the update company information dialog
    ---------------------------------------------------------------------------
    Import with:
        import { EzUpdateCompanyInfoDialog } from '/secure/widgets/EzUpdateCompanyInfoDialog/EzUpdateCompanyInfoDialog.js';
     ---------------------------------------------------------------------------
    Singleton instance ready for use when the below evaluates to true:
        globalThis.ezApi.ezclocker[EzUpdateCompanyInfoDialog.ezApiName] &&
        globalThis.ezApi.ezclocker[EzUpdateCompanyInfoDialog.ezApiName].ready &&
    ---------------------------------------------------------------------------
    Listen to onReady event:
        document.addEventListener(
            EzUpdateCompanyInfoDialog.ezEventNames.onReady,
            this.#ezRegistrator);
    ---------------------------------------------------------------------------
    Singleton Instance Reference:
        ezApi.ezclocker.ezUpdateCompanyInfoDialog
    ---------------------------------------------------------------------------
 */
export class EzUpdateCompanyInfoDialog extends EzClass {
    /**
        @static
        @public @readonly @property
        Returns the name of this class's singleton instance when registered with ezApi.
        @returns {string}
     */
    static get ezApiName() {
        return 'ezUpdateCompanyInfoDialog';
    }

   /**
        @static
        @public @readonly @property
        Returns an object of event names that this class may trigger.
        @returns {object}
     */
    static get ezEventNames() {
        return {
            onReady: 'ezOn_EzUpdateCompanyInfoDialog_Ready',
            onUpdateComputInfoDialogSubmited: 'ezOn_UpdateComputInfoDialog_Submitted'
        };
    }

    /**
        @static
        @private @field
        Stores the singleton instance of this class that was created by and registerd with EzApi.
        @type {EzUpdateCompanyInfoDialog}
     */
    static #ezInstance = EzObject.hasProperty(globalThis, 'ezApi') &&
        EzObject.isValid(globalThis.ezApi) && EzBoolean.isTrue(globalThis.ezApi.ready) &&
        EzObject.isValid(globalThis.ezApi.ezclocker[EzUpdateCompanyInfoDialog.ezApiName])
        ? globalThis.ezApi.ezclocker[EzUpdateCompanyInfoDialog.ezApiName]
        : null;

    /**
        @static
        @public @property @getter
        Returns the singleton instance of this class that is registered with EzApi (if available yet)
        @returns {EzUpdateCompanyInfoDialog}
     */
    static get ezInstance() {
        return EzUpdateCompanyInfoDialog.#ezInstance;
    }

    /**
        @static
        @public @property @setter
        Sets the singleton instance of of this class that is registered with EzApi.
        @param {EzUpdateCompanyInfoDialog} instance
     */
    static set ezInstance(instance) {
        if (null != EzUpdateCompanyInfoDialog.#ezInstance) {
            throw new Error('EzUpdateCompanyInfoDialog\'s singleton instance is already reigstered with EzApi.');
        }

        EzUpdateCompanyInfoDialog.#ezInstance = instance;
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
        EzObject.isValid(globalThis.ezApi.ezclocker[EzUpdateCompanyInfoDialog.ezApiName])
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
        return EzUpdateCompanyInfoDialog.#ezApiRegistrationState;
    }

    /**
        @static
        @public @property @setter
        Sets the ezApi registration state of this classes's singleton instance.
        @param {string} ezApiRegistrationState
        A valid enum property value from EzRegistrationState
     */
    static set ezApiRegistrationState(ezApiRegistrationState) {
        EzUpdateCompanyInfoDialog.#ezApiRegistrationState = EzRegistrationState.ezValueOf(ezApiRegistrationState);
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
        return EzRegistrationState.PENDING === EzUpdateCompanyInfoDialog.ezApiRegistrationState &&
            EzObject.hasProperty(globalThis, 'ezApi') &&
            EzObject.isValid(globalThis.ezApi) && EzBoolean.isTrue(globalThis.ezApi.ready) &&

            globalThis.ezApi.ezclocker[EzEventEngine.ezApiName] &&
            globalThis.ezApi.ezclocker[EzEventEngine.ezApiName].ready &&

            globalThis.ezApi.ezclocker[EzHttpHelper.ezApiName] &&
            globalThis.ezApi.ezclocker[EzHttpHelper.ezApiName].ready &&

            globalThis.ezApi.ezclocker[EzNavigation.ezApiName] &&
            globalThis.ezApi.ezclocker[EzNavigation.ezApiName].ready &&

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
        return null != EzUpdateCompanyInfoDialog.ezInstance &&
            EzRegistrationState.REGISTERED === EzUpdateCompanyInfoDialog.ezApiRegistrationState;
    }

    /**
        @static
        @private @method
        Attempts to register the singleton instance for this class with ezApi. Returns true
        if successful, false otherwise.
        @returns {boolean}
     */
    static #ezRegistrator() {
        if (EzUpdateCompanyInfoDialog.#ezCanRegister && !EzUpdateCompanyInfoDialog.#ezIsRegistered) {
            globalThis.ezApi.ezRegisterNewApi(EzUpdateCompanyInfoDialog, EzUpdateCompanyInfoDialog.ezApiName);
        }

        return EzUpdateCompanyInfoDialog.#ezIsRegistered;
    }

    /**
        @static
        Static Initialization
        ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        >> IMPORTANT <<
        ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        Make sure the following properties and methods get defined BEFORE this static initialization section:
            1) Property getter EzUpdateCompanyInfoDialog.ezApiName
            2) Property getter EzUpdateCompanyInfoDialog.ezEventNames
            3) Property getter EzUpdateCompanyInfoDialog.ezInstance
            4) Property setter EzUpdateCompanyInfoDialog.ezInstance
            5) Property getter EzUpdateCompanyInfoDialog.ezApiRegistrationState
            6) Property setter EzUpdateCompanyInfoDialog.ezApiRegistrationState
            7) Property getter EzUpdateCompanyInfoDialog.#ezCanRegister
            8) Property getter EzUpdateCompanyInfoDialog.#ezIsRegistered
            9) Method EzUpdateCompanyInfoDialog.#ezRegistrator()
     */
    static {
        if (!EzUpdateCompanyInfoDialog.#ezIsRegistered) {
            EzUpdateCompanyInfoDialog.ezApiRegistrationState = EzRegistrationState.PENDING;

            if (!EzUpdateCompanyInfoDialog.#ezRegistrator()) {
                document.addEventListener(
                    EzUpdateCompanyInfoDialog.ezOnEzApiReadyEventName,
                    EzUpdateCompanyInfoDialog.#ezRegistrator);
                            document.addEventListener(
                                EzEventEngine.ezEventNames.onReady,
                                this.#ezRegistrator);

                            document.addEventListener(
                                EzHttpHelper.ezEventNames.onReady,
                                this.#ezRegistrator);

                            document.addEventListener(
                                EzNavigation.ezEventNames.onReady,
                                this.#ezRegistrator);

                            document.addEventListener(
                                EzUI.ezEventNames.onReady,
                                this.#ezRegistrator);

                            document.addEventListener(
                                EzDialog.ezEventNames.onReady,
                                this.#ezRegistrator);
            }
        }
    }

    /**
        @public @constructor
        >> DO NOT CREATE NEW INSTANCES OUTSIDE OF THE STATIC INITIALIZATION FLOW <<
        Use the static singleton instance available from ezApi: ezApi.ezclocker.ezUpdateCompanyInfoDialog.
     */
    constructor() {
        super();
    }

    /**
        @public @readonly @property
        @returns {string}
     */
    get ezDialogId() {
        return this.constructor.name;
    }

    /**
        @public @method
        Initializes EzUpdateCompanyInfoDialog
        @returns {EzUpdateCompanyInfoDialog}
     */
    ezInit() {
        EzUpdateCompanyInfoDialog.ezInstance.ezRegisterEvents();

        EzUpdateCompanyInfoDialog.ezInstance.ezInitUX();

        return EzUpdateCompanyInfoDialog.ezInstance;
    }

    /**
        @protected @method
        Registers the events triggered by this dialog
     */
    ezRegisterEvents() {
        ezApi.ezclocker.ezEventEngine.ezRegisterEvent(
            EzUpdateCompanyInfoDialog.ezApiName,
            EzUpdateCompanyInfoDialog.ezEventNames.onUpdateComputInfoDialogSubmited);
    }

    /**
        @protected @method
        Initializes the dialog's UX
     */
    ezInitUX() {
        ezApi.ezclocker.ezUi.ezAppendContent(
            '_HideDialogsDiv',
            EzUpdateCompanyInfoDialog.ezInstance.ezBuildDialogHtml());

        let jQueryUIDialogConfig = new EzDialogConfig(EzUpdateCompanyInfoDialog.ezInstance.ezDialogId);
        jQueryUIDialogConfig.width = 700;
        jQueryUIDialogConfig.buttons = {
            'Update': EzUpdateCompanyInfoDialog.ezInstance.ezSubmit,
            Cancel: EzUpdateCompanyInfoDialog.ezInstance.ezCancel
        };

        ezApi.ezclocker.ezDialog.ezInitDialogWithConfig(
            EzUpdateCompanyInfoDialog.ezInstance.ezDialogId,
            jQueryUIDialogConfig);
    }

    /**
        @protected @method
        Initializes the dialog data
     */
    ezInitData() {
        let aEmployer = ezApi.ezclocker.ezClockerContext.ezGetSelectedEmployerAccount();

        if (!EzObject.isValid(aEmployer) || EzBoolean.isFalse(aEmployer.ready)) {
            ezApi.ezclocker.ezUi.ezSetInputValue(
                '_companyInfoDialog_employerName',
                EzString.EMPTY);

            ezApi.ezclocker.ezUi.ezSetInputValue(
                '_companyInfoDialog_mainContactNumber',
                EzString.EMPTY);

            ezApi.ezclocker.ezUi.ezSetInputValue(
                '_companyInfoDialog_streetAddress',
                EzString.EMPTY);

            ezApi.ezclocker.ezUi.ezSetInputValue(
                '_companyInfoDialog_additionalAddress',
                EzString.EMPTY);

            ezApi.ezclocker.ezUi.ezSetInputValue(
                '_companyInfoDialog_city',
                EzString.EMPTY);

            ezApi.ezclocker.ezUi.ezSetInputValue(
                '_companyInfoDialog_state',
                EzString.EMPTY);

            ezApi.ezclocker.ezUi.ezSetInputValue(
                '_companyInfoDialog_postalCode',
                EzString.EMPTY);
            return;
        }

        ezApi.ezclocker.ezUi.ezSetInputValue(
            '_companyInfoDialog_employerName',
            aEmployer.employerName);

        ezApi.ezclocker.ezUi.ezSetInputValue(
            '_companyInfoDialog_mainContactNumber',
            aEmployer.mainContactNumber);

        ezApi.ezclocker.ezUi.ezSetInputValue(
            '_companyInfoDialog_streetAddress',
            aEmployer.streetAddress);

        ezApi.ezclocker.ezUi.ezSetInputValue(
            '_companyInfoDialog_additionalAddress',
            aEmployer.additionalAddress);

        ezApi.ezclocker.ezUi.ezSetInputValue(
            '_companyInfoDialog_city',
            aEmployer.city);

        ezApi.ezclocker.ezUi.ezSetInputValue(
            '_companyInfoDialog_state',
            aEmployer.address_state);

        ezApi.ezclocker.ezUi.ezSetInputValue(
            '_companyInfoDialog_postalCode',
            aEmployer.address_postalcode);
    }

    /**
        @public @method
        Shows the update company info dialog.
     */
    ezShow() {
        EzUpdateCompanyInfoDialog.ezInstance.ezInitData();

        ezApi.ezclocker.ezDialog.ezShowDialog(EzUpdateCompanyInfoDialog.ezInstance.ezDialogId)
            .then(EzPromise.ignoreResolve);
    }

    /**
        @public @method
        Closes the Update Company Info dialog
     */
    ezCancel() {
        EzUpdateCompanyInfoDialog.ezInstance.ezHideCompanyNameError();

        EzUpdateCompanyInfoDialog.ezInstance.ezClose();
    }

    /**
        @public @method
        Closes the Update Company Info dialog
        Original: closeUpdateCompanyInfoDialog
     */
    ezClose() {
        ezApi.ezclocker.ezDialog.ezCloseDialog(EzUpdateCompanyInfoDialog.ezInstance.ezDialogId);
    }

    /**
        @public @method
        Updates the company information from the edit dialog
     */
    ezSubmit() {
        //don't allow empty Company Name
        EzUpdateCompanyInfoDialog.ezInstance.ezHideCompanyNameError();

        let companyName = ezApi.ezclocker.ezUi.ezGetInputValue('_companyInfoDialog_employerName').trim();

        if (!EzString.stringHasLength(companyName)) {
            EzUpdateCompanyInfoDialog.ezInstance.ezShowCompanyNameError('An empty company name is not allowed.');
            return null;
        }

        return ezApi.ezclocker.ezUi.ezStartPageWaitExecute(
            'Updating company information ...',
            (waitDone) => {
                let payload = EzJson.toJson({
                    id: ezApi.ezclocker.ezClockerContext.ezGetActiveEmployer().id,
                    employerName: ezApi.ezclocker.ezUi.ezGetInputValue('_companyInfoDialog_employerName'),
                    mainContactNumber: ezApi.ezclocker.ezUi.ezGetInputValue('_companyInfoDialog_mainContactNumber'),
                    streetAddress: ezApi.ezclocker.ezUi.ezGetInputValue('_companyInfoDialog_streetAddress'),
                    additionalAddress: ezApi.ezclocker.ezUi.ezGetInputValue('_companyInfoDialog_additionalAddress'),
                    city: ezApi.ezclocker.ezUi.ezGetInputValue('_companyInfoDialog_city'),
                    addressState: ezApi.ezclocker.ezUi.ezGetInputValue('_companyInfoDialog_state'),
                    addressPostalcode: ezApi.ezclocker.ezUi.ezGetInputValue('_companyInfoDialog_postalCode')
                });

                return ezApi.ezclocker.ezHttpHelper.ezPut(
                    ezApi.ezclocker.ezNavigation.ezGetInternalApiUrl(
                        `employer/${ezApi.ezclocker.ezClockerContext.ezGetActiveEmployer().id}`,
                        'v1'),
                    payload)
                    .then(
                        ezApi.ezclocker.ezServices.ezProcessApiResolve,
                        ezApi.ezclocker.ezServices.ezProcessApiReject)
                    .then(
                        (response) => {
                            response.employer.ready = true;

                            ezApi.ezclocker.ezClockerContext.ezSetSelectedEmployerAddress(response.employer);

                            ezApi.ezclocker.ezEventEngine.ezTriggerEvent(
                                EzUpdateCompanyInfoDialog.ezEventNames.onUpdateComputInfoDialogSubmited,
                                ezApi.ezclocker.ezEventEngine.ezBuildEventData(
                                    EzUpdateCompanyInfoDialog.ezApiName,
                                    'Update company info dialog submitted',
                                    ezApi.ezclocker.ezClockerContext.ezGetSelectedEmployerAccountData()));

                            return waitDone()
                                .then(EzUpdateCompanyInfoDialog.ezInstance.ezClose);
                        },
                        (errorResponse) => waitDone()
                            .then(
                                () => {
                                    ezApi.ezclocker.ezDialog.ezShowError(
                                        'Update Company Info',
                                        errorResponse,
                                        EzUpdateCompanyInfoDialog.ezInstance.showUpdateCompanyInfoDialog);
                                }));
            });
    }

    /**
        @protected
        Shows the company name error message
        @param {String} em
     */
    ezShowCompanyNameError(em) {
        if (!EzString.stringHasLength(em)) {
            EzUpdateCompanyInfoDialog.ezInstance.ezHideSignInError();
            return;
        }

        ezApi.ezclocker.ezUi.ezContent('EzCompanyNameErrorBox', em);

        ezApi.ezclocker.ezUi.ezShowElement('EzCompanyNameErrorBox');
    }

    /**
        @protected
        Hides the company name email error message
     */
    ezHideCompanyNameError() {
        ezApi.ezclocker.ezUi.ezContent('EzCompanyNameErrorBox', EzString.EMPTY);

        ezApi.ezclocker.ezUi.ezHideElement('EzCompanyNameErrorBox');
    }

    ezBuildDialogHtml() {
        return EzHtml.build`
            <div
                id="${EzUpdateCompanyInfoDialog.ezInstance.ezDialogId}"
                title="Update Company Information">
                <form
                    id="_UpdateCompanyInformationForm"
                    action="/_employer/updateCompanyName/"
                    enctype="application/json"
                    method="post">
                    <div
                        id="${EzUpdateCompanyInfoDialog.ezInstance.ezDialogId}_CompanyNameContainer"
                        class="ezAutoCol_A ezAutoRow_A_A">
                        <label
                            id="${EzUpdateCompanyInfoDialog.ezInstance.ezDialogId}_CompanyNameLabel"
                            for="_companyInfoDialog_employerName">
                            Company Name
                        </label>
                        <input
                            id="_companyInfoDialog_employerName"
                            class="dialogInput"
                            type="text"
                            name="employerName" />
                        <div
                            id="EzCompanyNameErrorBox"
                            class="ezErrorBox"
                            style="display:none">
                        </div>
                    </div>

                    <table
                        id="UpdateCompanyInformationDialogCompanyContactTable"
                        class="subscriptionTable">
                        <colgroup>
                            <col />
                            <col />
                        </colgroup>
                        <tr>
                            <td
                                class="subscriptionCell">
                                <label
                                    class="subscriptionLabel"
                                    for="_companyInfoDialog_mainContactNumber">
                                    Contact Phone
                                </label>
                            </td>
                        </tr>
                        <tr>
                            <td
                                class="subscriptionCell">
                                <div
                                    class="inputSpacer">
                                    <input
                                        id="_companyInfoDialog_mainContactNumber"
                                        class="dialogInput"
                                        type="text"
                                        name="mainContactNumber"/>
                                </div>
                            </td>
                        </tr>
                    </table>
                    <table
                        id="UpdateCompanyInformationDialogAddressTableHeader"
                        class="subscriptionTable">
                        <colgroup>
                            <col />
                        </colgroup>
                        <tr>
                            <td
                                class="subscriptionCell">
                                <label
                                    class="subscriptionLabel"
                                    for="_companyInfoDialog_streetAddress">
                                    Street Address
                                </label>
                            </td>
                        </tr>
                        <tr>
                            <td
                                class="subscriptionCell">
                                <div
                                    class="inputSpacer">
                                    <input
                                        id="_companyInfoDialog_streetAddress"
                                        class="dialogInput"
                                        type="text"
                                        name="streetAddress" />
                                </div>
                            </td>
                        </tr>
                    </table>
                    <table
                        id="UpdateCompanyInformationDialogAddress2TableHeader"
                        class="subscriptionTable">
                        <colgroup>
                            <col />
                        </colgroup>
                        <tr>
                            <td
                                class="subscriptionCell">
                                <label
                                    class="subscriptionLabel"
                                    for="_companyInfoDialog_additionalAddress">
                                    Additional Address
                                </label>
                            </td>
                        </tr>
                        <tr>
                            <td
                                class="subscriptionCell">
                                <div
                                    class="inputSpacer">
                                    <input
                                        id="_companyInfoDialog_additionalAddress"
                                        class="dialogInput"
                                        type="text"
                                        name="additionalAddress" />
                                </div>
                            </td>
                        </tr>
                    </table>
                    <table
                        id="UpdateCompanyInformationDialogCityStateZipTableHeader"
                        class="subscriptionTable">
                        <colgroup>
                            <col />
                            <col />
                        </colgroup>
                        <tr>
                            <td
                                class="subscriptionCell">
                                <label
                                    class="subscriptionLabel"
                                    for="_companyInfoDialog_city">
                                    City
                                </label>
                            </td>
                            <td
                                class="subscriptionCell">
                                <label
                                    class="subscriptionLabel"
                                    for="_companyInfoDialog_state">
                                    State
                                </label>
                            </td>
                            <td
                                class="subscriptionCell">
                                <label
                                    class="subscriptionLabel"
                                    for="_companyInfoDialog_postalCode">
                                    Postal Code
                                </label>
                            </td>
                        </tr>
                        <tr>
                            <td
                                class="subscriptionCell">
                                <div
                                    class="inputSpacer">
                                    <input
                                        id="_companyInfoDialog_city"
                                        class="dialogInput"
                                        type="text"
                                        name="city" />
                                </div>
                            </td>
                            <td
                                class="subscriptionCell">
                                <div
                                    class="inputSpacer">
                                    <input
                                        id="_companyInfoDialog_state"
                                        class="dialogInput"
                                        type="text"
                                        name="address_state" />
                                </div>
                            </td>
                            <td
                                class="subscriptionCell">
                                <div
                                    class="inputSpacer">
                                    <input
                                        id="_companyInfoDialog_postalCode"
                                        class="dialogInput"
                                        type="text"
                                        name="address_postalcode" />
                                </div>
                            </td>
                        </tr>
                    </table>
                </form>
            </div>`;
    }
}
