import { EzBadParamException } from '/ezlibrary/exceptions/EzExceptions.js';
import { EzClass } from '/ezlibrary/ezclocker-classes/EzClasses.js';

import { EzEventEngine } from '/ezlibrary/ez-event-engine.js';

import {
    EzObject,
    EzString,
    EzHtml,
    EzArray
} from '/ezlibrary/helpers/EzHelpers.js';

import {
    EzClockerContextEventName,
    EzIntegrationProviderId,
    EzIntegrationSetupDialogDisplayMode
} from '/ezlibrary/enums/EzEnumerations.js';

import { EzClockerContext } from '/ezlibrary/EzClockerContext/ez-context.js';

import { EzHttpHelper } from '/public/javascript/common/ezclocker-http-helper.js';
import { EzNavigation } from '/public/javascript/common/ezclocker-navigation-helper.js';
import { EzUI } from '/public/javascript/common/ezui.js';
import { EzDialog } from '/public/javascript/common/ezclocker-dialog-helper.js';

/**
    Import with:
    import { EzAvailableIntegrations } from '/secure/integrations/widgets/EzAvailableIntegrations/EzAvailableIntegrations.js';
 */
export class EzAvailableIntegrations extends EzClass {
    static ezInstance = null;
    static ezApiRegistrationState = null;

    static get ezApiName() {
        return 'ezAvailableIntegrations';
    }

    static get ezEventNames() {
        return {
            onReady: 'ezOn_EzAvailableIntegrations_Ready',
        };
    }

    static get ezCanRegister() {
        return 'PENDING' === EzAvailableIntegrations.ezApiRegistrationState &&
            Object.prototype.hasOwnProperty.call(globalThis, 'ezApi') &&
            globalThis.ezApi && globalThis.ezApi.ready &&

            globalThis.ezApi.ezclocker[EzEventEngine.ezApiName] &&
            globalThis.ezApi.ezclocker[EzEventEngine.ezApiName].ready &&

            globalThis.ezApi.ezclocker[EzClockerContext.ezApiName] &&
            globalThis.ezApi.ezclocker[EzClockerContext.ezApiName].ready &&

            globalThis.ezApi.ezclocker[EzHttpHelper.ezApiName] &&
            globalThis.ezApi.ezclocker[EzHttpHelper.ezApiName].ready &&

            globalThis.ezApi.ezclocker[EzNavigation.ezApiName] &&
            globalThis.ezApi.ezclocker[EzNavigation.ezApiName].ready &&

            globalThis.ezApi.ezclocker[EzUI.ezApiName] &&
            globalThis.ezApi.ezclocker[EzUI.ezApiName].ready &&

            globalThis.ezApi.ezclocker[EzDialog.ezApiName] &&
            globalThis.ezApi.ezclocker[EzDialog.ezApiName].ready;
    }

    static #ezRegistrator() {
        if (!EzAvailableIntegrations.ezCanRegister) {
            return false;
        }

        EzAvailableIntegrations.ezInstance = ezApi.ezRegisterNewApi(EzAvailableIntegrations);
        EzAvailableIntegrations.ezApiRegistrationState = 'REGISTERED';
        return true;
    }

    // Static constructor
    static {
        if (null == EzAvailableIntegrations.ezApiRegistrationState) {
            EzAvailableIntegrations.ezApiRegistrationState = 'PENDING';

            if (!EzAvailableIntegrations.#ezRegistrator()) {
                document.addEventListener(
                    'onEzApiReady',
                    () => {

                        if (!this.#ezRegistrator()) {
                            document.addEventListener(
                                EzEventEngine.ezEventNames.onReady,
                                EzAvailableIntegrations.#ezRegistrator);

                            document.addEventListener(
                                EzClockerContext.ezEventNames.onReady,
                                EzAvailableIntegrations.#ezRegistrator);

                            document.addEventListener(
                                EzHttpHelper.ezEventNames.onReady,
                                EzAvailableIntegrations.#ezRegistrator);

                            document.addEventListener(
                                EzNavigation.ezEventNames.onReady,
                                EzAvailableIntegrations.#ezRegistrator);

                            document.addEventListener(
                                EzUI.ezEventNames.onReady,
                                EzAvailableIntegrations.#ezRegistrator);

                            document.addEventListener(
                                EzDialog.ezEventNames.onReady,
                                EzAvailableIntegrations.#ezRegistrator);
                        }
                    });
            }
        }
    }

    /**
        @public @constructor
        Creates a new instance of EzAvailableIntegrations
     */
    constructor() {
        super();
    }

    /**
        @public @field
        @type {array}
     */
    ezEnabledIntegrations = [];

    /**
        @protected @method
        Initializes the widget
     */
    ezInit() {
        ezApi.ezclocker.ezEventEngine.ezWantEvent(
            EzClockerContextEventName.onSelectedEmployerLicenseReady,
            EzAvailableIntegrations.ezApiName,
            () => {
                if (0 > ezApi.ezclocker.ezClockerContext.ezGetSelectedEmployerAccountSubscriptionPlanFeatures().indexOf('INTEGRATIONS')) {
                    // License doesn't supporrt integrations
                    return;
                }

                ezApi.ezclocker.ezUi.ezPageWaitAsync(
                    'Loading integrations ...',
                    (finished) => {

                        EzAvailableIntegrations.ezInstance.ezLoadEnabledIntegrations()
                            .then(EzAvailableIntegrations.ezInstance.ezLoadActiveIntegrations)
                            .then(
                                () => {
                                    EzAvailableIntegrations.ezInstance.ezInitUx();
                                    return finished();
                                });
                    });
            }, true);

        return EzAvailableIntegrations.ezInstance;
    }

    /**
        @protected @method
        Initializes this widgets UX
     */
    ezInitUx() {
        ezApi.ezclocker.ezUi.ezContent(
            'EzAvailableIntegrationsContainer',
            EzAvailableIntegrations.ezInstance.ezBuildAvailableIntegrationsHtml());

        EzAvailableIntegrations.ezInstance.ezCheckActiveIntegrations();

        ezApi.ezclocker.ezEventEngine.ezWantEvent(
            EzClockerContextEventName.onSelectedEmployerAccountActiveIntegrationsReady,
            EzAvailableIntegrations.ezApiName,
            EzAvailableIntegrations.ezInstance.ezCheckActiveIntegrations);

        ezApi.ezclocker.ezEventEngine.ezWantEvent(
            EzClockerContextEventName.onSelectedEmployerAccountActiveIntegrationsUpdated,
            EzAvailableIntegrations.ezApiName,
            EzAvailableIntegrations.ezInstance.ezCheckActiveIntegrations);
    }

    /**
        @protected @method
        Loads the enabled integrations available to setup
        @returns {Promise.resolve}
     */
    ezLoadEnabledIntegrations() {
        return ezApi.ezAsyncAction(
            (finished) => {
                ezApi.ezclocker.ezHttpHelper.ezGet(
                    ezApi.ezclocker.ezNavigation.ezGetInternalApiUrl('integrations/enabled'))
                    .then(
                        (response) => {
                            EzAvailableIntegrations.ezInstance.ezEnabledIntegrations = EzArray.arrayHasLength(response.entities)
                                ? response.entities
                                : [];
                            return finished();
                        },
                        (eResponse) => {
                            EzAvailableIntegrations.ezInstance.ezEnabledIntegrations = [];

                            ezApi.ezclocker.ezLogger.error(
                                ezApi.ezEM`
                                    Failed to obtain the enabled integrations.
                                    Error: ${ezApi.ezToJson(eResponse)}`);

                            ezApi.ezclocker.ezDialog.ezShowErrorDialog(
                                'Integrations Error',
                                'Integrations not available at this time. Please check back later.');

                            return finished();
                        });
            });
    }

    /**
        @protected @method
        Gets and/or loads the available integrations for the active employer.
        @returns {Promise.resolve}
     */
    ezLoadActiveIntegrations() {
        return ezApi.ezAsyncAction(
            (finished) => {
                let employerIntegrations = ezApi.ezclocker.ezClockerContext.ezGetSelectedEmployerAccountActiveIntegrations();

                return 404 === employerIntegrations.errorCode
                    ? ezApi.ezclocker.ezClockerContext.ezLoadSelectedEmployerAccountActiveIntegrations()
                        .then(finished, finished)
                    : finished();
            });
    }

    /**
        @protected @method
        Builds the Available Integrations HTML
     */
    ezBuildAvailableIntegrationsHtml() {
        return EzHtml.template`
            <style>
                .ezActiveIntegrationImg {
                    float: right;
                    margin: 10px;
                    width: 24px;
                    border-radius: 50%;
                    box-shadow: rgb(0 0 0 / 35%) 0px 5px 15px
                }
                .ezEnabledIntegrationContainer {
                    display: grid;
                    grid-template-columns: max-content max-content max-content;
                    grid-template-rows: auto;
                    align-content: center;
                    grid-row-gap: 10px;
                    grid-column-gap: 15px;
                    padding: 10px;
                }

                @media only screen and (max-width: 900px) {
                  .ezEnabledIntegrationContainer {
                    grid-template-columns: max-content max-content max-content;
                  }
                }
                @media only screen and (max-width: 1300px) {
                  .ezEnabledIntegrationContainer {
                    grid-template-columns: max-content max-content max-content max-content;
                  }
                }
                @media only screen and (min-width: 1301px) and (max-width: 1920px) {
                  .ezEnabledIntegrationContainer {
                    grid-template-columns: max-content max-content max-content max-content max-content;
                  }
                }
                @media only screen and (min-width: 1921px) and (max-width: 2048px) {
                  .ezEnabledIntegrationContainer {
                    grid-template-columns: max-content max-content max-content max-content max-content max-content;
                  }
                }


                .ezIntegrationCardContainer {
                    background-color: var(--ezClockerWhite);
                    border-color: var(--ezClockerGray);
                    border-style: solid;
                    border-width: 2px;
                    border-radius: 3px;
                    cursor: pointer;
                }
                .ezIntegrationCardContainer:hover,
                .ezIntegrationCardContainer:focus {
                    box-shadow: 0 0 4px 2px rgba(109, 110, 112, 0.5);
                }
                .ezIntegrationCardContainer:active {
                    box-shadow: inset 0 0 8px 4px rgba(109, 110, 112, 0.5);
                }
                .ezActiveIntegrationCardContainer {
                    border-color: var(--ezClockerGreen);
                    border-style: solid;
                    border-width: 2px;
                    border-radius: 3px;
                }
                .ezIntegrationCardContent {
                    grid-template-columns: auto;
                    grid-template-rows: auto;
                    align-content: center;
                    justify-content: stretch;
                    border-radius: 0px;
                    padding: 0px;
                }
                .ezAvailableIntegrationsContent {
                    padding: 10px;
                    background-color: var(--ezClockerWhite);
                    border-color: var(--ezClockerNavy);
                    border-style: solid;
                    border-width: 1px;
                }
                .ezIntegrationCardSetupBar {
                    padding: 8px;
                    margin-top: 25px;
                    min-width: 230px;
                    text-align: center;
                    background-color: var(--ezClockerOrange);
                    color: var(--ezClockerBlack);
                    font-size: 12pt;
                    font-weight: bold;
                    border-color: var(--ezClockerBlack);
                    border-style: solid;
                    border-width: 1px;
                    border-left-style:none;
                    border-right-style:none;
                    border-radius: 0px;
                }
                .ezIntegrationCardSetupBarContent{
                    display: grid;
                    grid-template-columns: auto 32px;
                    column-gap: 10px;
                    justify-content: center;
                    align-content: center;
                }
                .ezIntegrationCardSetBarText {
                    display: grid;
                    align-content: center;
                    justify-content: center;"
                }
                .ezIntegrationCardSetupImage {
                    width: 48px;
                }
                .ezIntegrationCardManageBar {
                    padding: 8px;
                    margin-top: 25px;
                    min-width: 230px;
                    text-align: center;
                    background-color: var(--ezClockerNavy);
                    color: var(--ezClockerWhite);
                    font-size: 12pt;
                    font-weight: bold;
                    border-color: var(--ezClockerGray);
                    border-style: solid;
                    border-width: 1px;
                    border-left-style:none;
                    border-right-style:none;
                    border-radius: 0px;
                }
                .ezIntegrationCardManageBarContent{
                    display: grid;
                    grid-template-columns: auto 32px;
                    column-gap: 10px;
                    justify-content: center;
                    align-content: center;
                }
                .ezIntegrationCardManageBarText {
                    display: grid;
                    align-content: center;
                    justify-content: center;"
                }
                .ezIntegrationCardManageImage {
                    width: 48px;
                }
                .ezIntegrationSubTitle{
                    font-size: 10pt;
                    font-weight: normal;
                }
                .ezContainer-integration-logo {
                    padding: 6px;
                }
                .EzIntegrationProviderName {
                    min-height: 35px;
                }

            </style>
            <div
                id="EzAvailableIntegrations">
                <div
                    class="accountDataTitle">
                    <h2>Payroll Integration</h2>
                </div>
                <div
                    id="EzAvailableIntegrations_Content"
                    class="ezAvailableIntegrationsContent">
                    <h3>
                        Setup a payroll integration and save time processing your payroll.
                    </h3>
                    <div
                        id="EzAvailableIntegrations_ActiveContainer"
                        class="ezEnabledIntegrationContainer" >
                        ${EzAvailableIntegrations.ezInstance.ezBuildEnabledIntegrationCards()}
                    </div>
                </div>
            </div>`;
    }

    /**
        @protected @method
        Displays the check boxes next to active integrations.
     */
    ezCheckActiveIntegrations() {
        if (!EzArray.arrayHasLength(EzAvailableIntegrations.ezInstance.ezEnabledIntegrations)) {
            // Nothing to highlight
            return;
        }

        // Remove any existing activation styling
        EzAvailableIntegrations.ezInstance.ezEnabledIntegrations.forEach(
            (enabledIntegration) => {
                ezApi.ezclocker.ezUi.ezHideElement(`${enabledIntegration.integrationProviderId}_Activated`);

                ezApi.ezclocker.ezUi.ezRemoveElementClass(
                    `${enabledIntegration.integrationProviderId}_CardContainer`,
                    'ezActiveIntegrationCardContainer');

                ezApi.ezclocker.ezUi.ezShowElement(`${enabledIntegration.integrationProviderId}_SetupBar`);

                ezApi.ezclocker.ezUi.ezHideElement(`${enabledIntegration.integrationProviderId}_ManageBar`);
            });

        let employerIntegrations = ezApi.ezclocker.ezClockerContext.ezGetSelectedEmployerAccountActiveIntegrations();

        if (!EzObject.isValid(employerIntegrations) || !EzArray.arrayHasLength(employerIntegrations.activeIntegrations)) {
            // None activated
            return;
        }

        employerIntegrations.activeIntegrations.forEach(
            (employerIntegrationMap) => {
                if (EzObject.isValid(employerIntegrationMap.enabled)) {
                    let ezIntegrationProviderId = employerIntegrationMap.ezIntegrationProviderId;

                    ezApi.ezclocker.ezUi.ezShowElement(`${ezIntegrationProviderId}_Activated`);

                    ezApi.ezclocker.ezUi.ezAddElementClass(
                        `${ezIntegrationProviderId}_CardContainer`,
                        'ezActiveIntegrationCardContainer');

                    ezApi.ezclocker.ezUi.ezHideElement(`${ezIntegrationProviderId}_SetupBar`);

                    ezApi.ezclocker.ezUi.ezShowElement(`${ezIntegrationProviderId}_ManageBar`);
                }
            });
    }

    /**
        @protected @method
        Creates an HTML card for each enabled integration.
     */
    ezBuildEnabledIntegrationCards() {
        if (!EzArray.arrayHasLength(EzAvailableIntegrations.ezInstance.ezEnabledIntegrations)) {
            return EzHtml.template`
                <h2>
                    Integrations not available at this time.
                </h2>`;
        }

        let enabledIntegrations = '';

        EzAvailableIntegrations.ezInstance.ezEnabledIntegrations.forEach(
            (enabledIntegration) => {
                enabledIntegrations += EzAvailableIntegrations.ezInstance.ezBuildEnabledIntegrationCardHtml(enabledIntegration);
            });

        return enabledIntegrations;
    }

    /**
        @protected @method
        Builds an enabled integration's HTML card
     */
    ezBuildEnabledIntegrationCardHtml(enabledIntegration) {
        if (!EzObject.isValid(enabledIntegration)) {
            throw new EzBadParamException(
                'enabledIntegration',
                EzAvailableIntegrations.ezInstance,
                EzAvailableIntegrations.ezInstance.ezBuildActiveIntegrationCard);
        }

        let logoUrl = EzIntegrationProviderId.ezToIntegrationLogoUrl(enabledIntegration.integrationProviderId);

        let logoText = EzIntegrationProviderId.ezToIntegrationLogoText(enabledIntegration.integrationProviderId);
        let subTitleText = EzIntegrationProviderId.ezToIntegrationSubTitleText(enabledIntegration.integrationProviderId);

        let logoHtml = EzString.stringHasLength(logoUrl)
            ? EzHtml.template`
                <img
                    src="${logoUrl}"
                    class="ezContainer-integration-logo-img"/>
                <div
                    id="EzIntegrationProviderName" class="EzIntegrationProviderName">
                        ${logoText}
                </div>
                <div class="ezIntegrationSubTitle">
                        ${subTitleText}
                </div>`
            : EzHtml.template`
                <div style="height:28px"></div>
                <div
                    id="EzIntegrationProviderName" class="EzIntegrationProviderName">
                    ${logoText}
                </div>
                <div class="ezIntegrationSubTitle">
                        ${subTitleText}
                </div>`;
        let activatedUrl = ezApi.ezclocker.ezNavigation.ezGetPublicImagesUrl('/integrations/green-check.svg');

        let onClick = `ezApi.ezclocker.ezAvailableIntegrations.ezNavigateToIntegrationSetup('${enabledIntegration.integrationProviderId}')`;

        return EzHtml.template`
            <div
                id="${enabledIntegration.integrationProviderId}_CardContainer"
                class="ezIntegrationCardContainer"
                onclick="${onClick}">
                <img
                    id="${enabledIntegration.integrationProviderId}_Activated"
                    src="${activatedUrl}"
                    class="ezActiveIntegrationImg"
                    style="display:none"/>
                <div
                    id="${enabledIntegration.integrationProviderId}_Card"
                    class="ezIntegrationCardContent">
                    <div
                        class="ezContainer-integration-logo">
                        ${logoHtml}
                    </div>
                    <div
                        id="${enabledIntegration.integrationProviderId}_SetupBar"
                        class="ezIntegrationCardSetupBar">
                        <div
                            id=""
                            class="ezIntegrationCardSetupBarContent">
                            <div
                                class="ezIntegrationCardSetBarText">
                                Setup
                            </div>
                            <img
                                src="/public/images/icons/right-arrow-black.svg"
                                class="ezIntegrationCardSetupImage"/>
                        </div>
                    </div>
                    <div
                        id="${enabledIntegration.integrationProviderId}_ManageBar"
                        class="ezIntegrationCardManageBar"
                        style="display:none">
                        <div
                            id="${enabledIntegration.integrationProviderId}_ManageBarContentLayout"
                            class="ezIntegrationCardManageBarContent">
                            <div
                                class="ezIntegrationCardManageBarText">
                                Manage
                            </div>
                            <img
                                src="/public/images/icons/right-arrow-white.svg"
                                class="ezIntegrationCardManageImage"/>
                        </div>
                    </div>
                </div>
            </div>`;
    }

    /**
        @protected @method
        Shows the integration setup UX
        @param {EzIntegrationProviderId} integrationProviderId
     */
    ezShowIntegrationSetup(integrationProviderId) {
        let integrationSetupDialogId = EzIntegrationProviderId.ezToIntegrationSetupDialogApiName(integrationProviderId);
        if (EzString.stringHasLength(integrationSetupDialogId)) {
            ezApi.ezclocker[integrationSetupDialogId].ezShow(
                EzIntegrationSetupDialogDisplayMode.FULL_SCREEN,
                ezApi.ezclocker[EzAvailableIntegrations.ezApiName].ezHandleIntegrationSetupClosed);
        }
    }

    /**
        @protected @method
        Reload the integration setup UX using edit= cgiParam
        @param {EzIntegrationProviderId} integrationProviderId
     */
    ezNavigateToIntegrationSetup(integrationProviderId) {
        let integrationSetupDialogId = EzIntegrationProviderId.ezToIntegrationSetupDialogApiName(integrationProviderId);
        let cgiParams = "edit=" + integrationProviderId;
        ezApi.ezclocker.nav.ezNavigateToEmployerIntegrationsPage(cgiParams);
    }

    /**
        @protected @method
        Call back after an integration setup UX is closed
     */
    ezHandleIntegrationSetupClosed() {
        ezApi.ezclocker.ezClockerContext.ezLoadSelectedEmployerAccountActiveIntegrations()
            .then(
                EzAvailableIntegrations.ezInstance.ezCheckActiveIntegrations,
                EzAvailableIntegrations.ezInstance.ezCheckActiveIntegrations);
    }
}
