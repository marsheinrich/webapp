import {
    EzBadParamException
} from '/ezlibrary/exceptions/EzExceptions.js';

import {
    EzObject,
    EzBoolean,
    EzString,
    EzHtml
} from '/ezlibrary/helpers/EzHelpers.js';

import {
    EzRegistrationState,
    EzElementEventName,
    EzClockerContextEventName,
    EzLicenseFeatureId,
    EzFeatureToggleId,
    EzFeaturePackageId,
    EzAccountNavButtonActiveOption
} from '/ezlibrary/enums/EzEnumerations.js';

import { EzClass } from '/ezlibrary/EzClass.js';

import { EzStateTracker } from '/ezlibrary/EzStateTracker.js';

import { EzEventEngine } from '/ezlibrary/ez-event-engine.js';

import { EzClockerContext } from '/ezlibrary/EzClockerContext/ez-context.js';

import { EzNavigation } from '/public/javascript/common/ezclocker-navigation-helper.js';

import { EzFeaturePackageManager } from '/ezlibrary/EzFeaturePackageManager.js';

import { EzUx } from '/ezlibrary/ux/EzUx.js';
import { EzUI } from '/public/javascript/common/ezui.js';

import { EzUxState } from '/ezlibrary/ux/EzUxState.js';
import { EzUxElementState } from '/ezlibrary/ux/EzUxElementState.js';

import { EzDialog } from '/public/javascript/common/ezclocker-dialog-helper.js';

import { EzHelp } from '/secure/widgets/EzHelp/EzHelp.js';

/**
 * @class
 * @description
 * Stores the ready check flags for the EzAccountNavButton
 */
class EzAccountNavButtonReadyFlags {
    /**
     * @private @field
     * Stores
     * @type {boolean}
     */
    #userContextReady = false;
    /**
     * @public @property @getter
     * Gets
     * @returns {boolean}
     */
    get userContextReady() {
        return this.#userContextReady;
    }
    /**
     * @public @property @setter
     * Sets
     * @param {boolean} userContextReady
     */
    set userContextReady(userContextReady) {
        this.#userContextReady = EzBoolean.booleanOrFalse(userContextReady);
    }

    /**
     * @private @field
     * Stores
     * @type {boolean}
     */
    #selectedEmployerAccountReady = false;
    /**
     * @public @property @getter
     * Gets
     * @returns {boolean}
     */
    get selectedEmployerAccountReady() {
        return this.#selectedEmployerAccountReady;
    }
    /**
     * @public @property @setter
     * Sets
     * @param {boolean} selectedEmployerAccountReady
     */
    set selectedEmployerAccountReady(selectedEmployerAccountReady) {
        this.#selectedEmployerAccountReady = EzBoolean.booleanOrFalse(selectedEmployerAccountReady);
    }

    /**
     * @private @field
     * Stores
     * @type {boolean}
     */
    #activeEmployerReady = false;
    /**
     * @public @property @getter
     * Gets
     * @returns {boolean}
     */
    get activeEmployerReady() {
        return this.#activeEmployerReady;
    }
    /**
     * @public @property @setter
     * Sets
     * @param {boolean} activeEmployerReady
     */
    set activeEmployerReady(activeEmployerReady) {
        this.#activeEmployerReady = EzBoolean.booleanOrFalse(activeEmployerReady);
    }

    /**
     * @private @field
     * Stores
     * @type {boolean}
     */
    #employerLicenseReady = false;
    /**
     * @public @property @getter
     * Gets
     * @returns {boolean}
     */
    get employerLicenseReady() {
        return this.#employerLicenseReady;
    }
    /**
     * @public @property @setter
     * Sets
     * @param {boolean} employerLicenseReady
     */
    set employerLicenseReady(employerLicenseReady) {
        this.#employerLicenseReady = EzBoolean.booleanOrFalse(employerLicenseReady);
    }

    /**
     * @private @field
     * Stores
     * @type {boolean}
     */
    #featurePackageManagerReady = false;
    /**
     * @public @property @getter
     * Gets
     * @returns {boolean}
     */
    get featurePackageManagerReady() {
        return this.#featurePackageManagerReady;
    }
    /**
     * @public @property @setter
     * Sets
     * @param {boolean} featurePackageManagerReady
     */
    set featurePackageManagerReady(featurePackageManagerReady) {
        this.#featurePackageManagerReady = EzBoolean.booleanOrFalse(featurePackageManagerReady);
    }

    /**
     * @public @readonly @property
     * Gets if all ready checks properties equal true
     * NOTE: Does not require EzAccountNavButtonReadyFlags.selectedEmployerAccountReady to equal true.
     * @returns {boolean}
     */
    get isReady() {
        return EzBoolean.booleanOrFalse(
            this.userContextReady &&
            this.activeEmployerReady &&
            this.employerLicenseReady &&
            this.featurePackageManagerReady);
    }
}

/**
 * @class
 * @implements {EzClass}
 * @description
 * Navigation drop down button for account features
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 * Import with:
 *     import { EzAccountNavButton } from '/secure/widgets/EzAccountNavButton/EzAccountNavButton.js';
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 * Singleton instance ready for use when the below evaluates to true:
 *     globalThis.ezApi.ezclocker[EzAccountNavButton.ezApiName] &&
 *     globalThis.ezApi.ezclocker[EzAccountNavButton.ezApiName].ready
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 * Listen to onReady event:
 *     document.addEventListener(
 *         EzAccountNavButton.ezEventNames.onReady,
 *         this.#ezRegistrator);
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 * Singleton Instance Reference:
 *     ezApi.ezclocker.ezAccountNavButton
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 */
export class EzAccountNavButton extends EzClass {
    /**
     * @public @readonly @property
     * Gets the element id of the EzAccountNavButton
     * @returns {string}
     */
    get ezAccountNavButtonId() {
        return 'EzAccountNavButton';
    }

    /**
     * @private @field
     * Stores the map of EzAccountNavButtonActiveOption to EzUxElementState for each navigation item.
     * @type {object}
     */
    #ezAccountNavItems = {};
    /**
     * @public @property @getter
     * Gets the map of EzAccountNavButtonActiveOption to EzUxElementState for each navigation item.
     * @returns {boolean}
     */
    get ezAccountNavItems() {
        return this.#ezAccountNavItems;
    }
    /**
     * @public @property @setter
     * Sets the map of EzAccountNavButtonActiveOption to EzUxElementState for each navigation item.
     * @param {boolean} userContextReady
     */
    set ezAccountNavItems(accountNavItems) {
        if (EzObject.isValid(accountNavItems)) {
            for (let ezAccountNavButtonActiveOption of accountNavItems) {
                if (EzString.hasLength(ezAccountNavButtonActiveOption) && accountNavItems?.[ezAccountNavButtonActiveOption]) {
                    this.#ezAccountNavItems[ezAccountNavButtonActiveOption] = accountNavItems[ezAccountNavButtonActiveOption];
                }
            }
        }
    }

    /**
     * @private @field
     * Stores the element the account navigation button was inserted before
     */
    #ezInsertBeforeElementId = null;
    /**
     * @public @property @getter
     * Gets the element the account navigation button was inserted before
     * @returns {string}
     */
    get ezInsertBeforeElementId() {
        if (null == this.#ezInsertBeforeElementId) {
            this.#ezInsertBeforeElementId = EzString.stringOrNull(ezApi.ezclocker?.ezHelp?.ezHelpButtonId);

            EzAccountNavButton.ezInstance.ezSaveState();
        }

        return this.#ezInsertBeforeElementId;
    }
    /**
     * @public @property @getter
     * Sets the element the account navigation button was inserted before
     * @param {string} ezInsertBeforeElementId
     */
    set ezInsertBeforeElementId(ezInsertBeforeElementId) {
        this.#ezInsertBeforeElementId = EzString.stringOrDefault(
            ezInsertBeforeElementId,
            EzString.stringOrNull(ezApi.ezclocker?.ezHelp?.ezHelpButtonId));

        EzAccountNavButton.ezInstance.ezSaveState();
    }

    /**
     * Stores the ready check flags
     * @type {string}
     */
    #ezAccountNavButtonReadyFlags = new EzAccountNavButtonReadyFlags();
    /**
     * @public @property @getter
     * Gets the ready check flags
     * @returns {object}
     */
    get ezAccountNavButtonReadyFlags() {
        return this.#ezAccountNavButtonReadyFlags;
    }
    /**
     * @public @property @getter
     * Sets the ready check flags
     * @param {object} ezAccountNavButtonReadyFlags
     */
    set ezAccountNavButtonReadyFlags(ezAccountNavButtonReadyFlags) {
        if (!EzObject.isValid(ezAccountNavButtonReadyFlags)) {
            throw new EzBadParamException(
                'ezAccountNavButtonReadyFlags',
                this,
                this.ezAccountNavButtonReadyFlags);
        }

        this.#ezAccountNavButtonReadyFlags.userContextReady = EzBoolean.booleanOrFalse(ezAccountNavButtonReadyFlags.userContextReady);

        this.#ezAccountNavButtonReadyFlags.selectedEmployerAccountReady = EzBoolean.booleanOrFalse(ezAccountNavButtonReadyFlags.selectedEmployerAccountReady);

        this.#ezAccountNavButtonReadyFlags.activeEmployerReady = EzBoolean.booleanOrFalse(ezAccountNavButtonReadyFlags.activeEmployerReady);

        this.#ezAccountNavButtonReadyFlags.employerLicenseReady = EzBoolean.booleanOrFalse(ezAccountNavButtonReadyFlags.employerLicenseReady);

        this.#ezAccountNavButtonReadyFlags.featurePackageManagerReady = EzBoolean.booleanOrFalse(ezAccountNavButtonReadyFlags.featurePackageManagerReady);

        EzAccountNavButton.ezInstance.ezSaveState();
    }

    /**
     * @private @field
     * Stores the navigation features ready flags
     * @type {object}
     */
    #ezNavigationFeaturesReady = {
        accountDetailsReady: false,
        integrationsReady: false,
        timeOffReady: false,
    }
    /**
     * @public @property @getter
     * Gets the navigation features ready flags
     * @returns {object}
     */
    get ezNavigationFeaturesReady() {
        return this.#ezNavigationFeaturesReady;
    }
    /**
     * @public @property @getter
     * Sets the navigation features ready flags
     * @param {object} navigationFeaturesReady
     */
    set ezNavigationFeaturesReady(navigationFeaturesReady) {
        if (EzObject.isValid(navigationFeaturesReady)) {
            this.#ezNavigationFeaturesReady.accountDetailsReady = EzBoolean.booleanOrFalse(navigationFeaturesReady.accountDetailsReady);

            this.#ezNavigationFeaturesReady.integrationsReady = EzBoolean.booleanOrFalse(navigationFeaturesReady.integrationsReady);

            this.#ezNavigationFeaturesReady.timeOffReady = EzBoolean.booleanOrFalse(navigationFeaturesReady.timeOffReady);
        }

        EzAccountNavButton.ezInstance.ezSaveState();
    }

    /**
     * @public @property @getter
     * Gets if the EzAccountNavButton is enabled or not.
     * @returns {boolean}
     */
    get ezEnabled() {
        return EzUx.isEnabled(this.ezAccountNavButtonId);
    }
    /**
     * @public @property @getter
     * Sets the EzAccountNavButton enabled if the provided enabled param is true AND
     * EzAccountNavButton.ezInstance.ezNavigationFeaturesReady.ezCanEnableNavigation is true.
     * Otherwise, the EzAccountNavButton is set to disabled.
     * @returns {boolean}
     */
    set ezEnabled(enabled) {
        if (EzAccountNavButton.ezInstance.ezNavigationFeaturesReady.ezCanEnableNavigation && EzBoolean.booleanOrFalse(enabled)) {
            EzUx.enable(EzAccountNavButton.ezInstance.ezAccountNavButtonId);
        } else {
            EzUx.disable(EzAccountNavButton.ezInstance.ezAccountNavButtonId);
        }
    }

    /**
     * @public @readonly @property
     * Gets if the EzAccountNavButton's HTML is injected into the document or not.
     * @returns {boolean}
     */
    get ezIsInjected() {
        return EzObject.isValid(
            EzUx.findElement(this.ezAccountNavButtonId));
    }

    /**
     * @public @readonly @property
     * Gets if the navigation button has any navigation features/items available
     * @returns {boolean}
     */
    get ezHasNavigationItems() {
        return ezApi.ezclocker.ezUi.ezIsElementDisplayed(
            `${EzAccountNavButton.ezInstance.ezAccountNavButtonId}_${EzAccountNavButtonActiveOption.ACCOUNT_INTEGRATIONS_OPTION}`) ||
            ezApi.ezclocker.ezUi.ezIsElementDisplayed(
                `${EzAccountNavButton.ezInstance.ezAccountNavButtonId}_${EzAccountNavButtonActiveOption.ACCOUNT_TIME_OFF_OPTION}`) ||
            ezApi.ezclocker.ezUi.ezIsElementDisplayed(
                `${EzAccountNavButton.ezInstance.ezAccountNavButtonId}_${EzAccountNavButtonActiveOption.ACCOUNT_DETAILS_OPTION}`);
    }

    /**
     * @public @readonly @property
     * Gets if the navigation button can enable or not
     * @returns {boolean}
     */
    get ezCanEnableNavigation() {
        return EzAccountNavButton.ezInstance.ezAccountNavButtonReadyFlags.isReady &&
            EzAccountNavButton.ezInstance.ezHasNavigationItems &&
            ezApi.ezclocker.ezClockerContext.ezGetUserContext().isEmployerOrActingAsEmployer;
    }

    /**
     * @private @field
     * Stores the currently active option value
     * @type {string}
     */
    #ezActiveOptionValue = EzAccountNavButtonActiveOption.ACCOUNT_OPTION;
    /**
     * @public @property @getter
     * Gets the currently active option value
     * @returns {string}
     */
    get ezActiveOptionValue() {
        return EzAccountNavButtonActiveOption.UNKNOWN == EzAccountNavButtonActiveOption.ezAsEnum(this.#ezActiveOptionValue)
            ? EzAccountNavButtonActiveOption.ACCOUNT_OPTION
            : this.#ezActiveOptionValue;
    }
    /**
     * @public @property @setter
     * Sets the currently active option value
     * @param {string} ezActiveOptionValue
     */
    set ezActiveOptionValue(ezActiveOptionValue) {
        ezActiveOptionValue = EzString.hasLength(ezActiveOptionValue)
            ? EzAccountNavButtonActiveOption.ezAsEnum(ezActiveOptionValue)
            : EzAccountNavButtonActiveOption.ACCOUNT_OPTION;

        if (EzAccountNavButtonActiveOption.UNKNOWN === ezActiveOptionValue) {
            ezActiveOptionValue = EzAccountNavButtonActiveOption.ACCOUNT_OPTION;
        }

        if (this.#ezActiveOptionValue !== ezActiveOptionValue) {
            let currentAccountOptionId = `${this.ezAccountNavButtonId}_${this.#ezActiveOptionValue}`;

            let newAccountOptionId = `${this.ezAccountNavButtonId}_${ezActiveOptionValue}`;

            this.#ezActiveOptionValue = ezActiveOptionValue;

            if (EzAccountNavButtonActiveOption.ACCOUNT_OPTION !== currentAccountOptionId) {
                ezApi.ezclocker.ezUi.ezEnableElement(currentAccountOptionId);
            }

            if (EzAccountNavButtonActiveOption.ACCOUNT_OPTION !== newAccountOptionId) {
                ezApi.ezclocker.ezUi.ezDisableElement(newAccountOptionId);
            }

            EzAccountNavButton.ezInstance.ezProcessReadyChecks();
        }

        EzAccountNavButton.ezInstance.ezSaveState();
    }

    /**
     * @public @readonly @property
     * Gets the HTML for the EzAccountNavButton
     * @returns {string}
     */
    get ezAccountNavButtonHtml() {
        return EzHtml.build`
            <select
                id="${EzAccountNavButton.ezInstance.ezAccountNavButtonId}"
                class="ezSelectButton-major-ezClockerOrange">
                <option
                    id="${EzAccountNavButton.ezInstance.ezAccountNavButtonId}_${EzAccountNavButtonActiveOption.ACCOUNT_OPTION}"
                    class="ezSelectButton-option-title"
                    value="ACCOUNT_OPTION"
                    selected>
                    Account
                </option>
                <option
                    id="${EzAccountNavButton.ezInstance.ezAccountNavButtonId}_${EzAccountNavButtonActiveOption.ACCOUNT_DETAILS_OPTION}"
                    value="ACCOUNT_DETAILS_OPTION"
                    class="ezSelectButton-option">
                    Account Details
                </option>
                <option
                    id="${EzAccountNavButton.ezInstance.ezAccountNavButtonId}_${EzAccountNavButtonActiveOption.ACCOUNT_INTEGRATIONS_OPTION}"
                    value="ACCOUNT_INTEGRATIONS_OPTION"
                    class="ezSelectButton-option">
                    Integrations
                </option>
                <option
                    id="${EzAccountNavButton.ezInstance.ezAccountNavButtonId}_${EzAccountNavButtonActiveOption.ACCOUNT_TIME_OFF_OPTION}"
                    value="ACCOUNT_TIME_OFF_OPTION"
                    class="ezSelectButton-option">
                    Time Off
                </option>
            </select>`;
    }

    /**
     * @private @method
     * Saves the state for EzAccountNavButton
     */
    ezSaveState() {
        EzStateTracker.saveState(
            EzAccountNavButton.ezApiName,
            {
                ezAccountNavItems: this.ezAccountNavItems,
                ezHelpButtonId: this.ezHelpButtonId,
                ezAccountNavButtonId: this.ezAccountNavButtonId,
                ezInsertBeforeElementId: this.ezInsertBeforeElementId,
                ezAccountNavButtonReadyFlags: this.ezAccountNavButtonReadyFlags,
                ezActiveOptionValue: this.#ezActiveOptionValue,
                ezNavigationFeaturesReady: this.#ezNavigationFeaturesReady
            });
    }

    /**
     * @public @method
     * Initializes EzAccountNavButton
     * @returns {EzAccountNavButton}
     */
    ezInit() {
        EzAccountNavButton.ezInstance.ezInitAccountNavItems();

        ezApi.ezclocker.ezEventEngine.ezWantEventEx(
            {
                eventName: EzHelp.ezEventNames.onInjected,
                handlerName: EzAccountNavButton.ezApiName,
                handlerFunction: EzAccountNavButton.ezInstance.ezInitUX
            },
            true);

        // User context ready event
        ezApi.ezclocker.ezEventEngine.ezWantEventEx(
            {
                eventName: EzClockerContextEventName.onUserContextReady,
                handlerName: EzAccountNavButton.ezApiName,
                handlerFunction: () => {
                    EzAccountNavButton.ezInstance.ezAccountNavButtonReadyFlags.userContextReady = true;

                    EzAccountNavButton.ezInstance.ezProcessReadyChecks();
                }
            },
            true);

        ezApi.ezclocker.ezEventEngine.ezWantEventEx(
            {
                eventName: EzClockerContextEventName.onUserContextUpdated,
                handlerName: EzAccountNavButton.ezApiName,
                handlerFunction: () => {
                    EzAccountNavButton.ezInstance.ezAccountNavButtonReadyFlags.userContextReady = true;

                    EzAccountNavButton.ezInstance.ezProcessReadyChecks();
                }
            },
            true);

        ezApi.ezclocker.ezEventEngine.ezWantEventEx(
            {
                eventName: EzClockerContextEventName.onSelectedEmployerAccountChanged,
                handlerName: EzAccountNavButton.ezApiName,
                handlerFunction: () => {
                    EzAccountNavButton.ezInstance.ezAccountNavButtonReadyFlags.selectedEmployerAccountReady = true;

                    EzAccountNavButton.ezInstance.ezProcessReadyChecks();
                }
            },
            true);

        ezApi.ezclocker.ezEventEngine.ezWantEventEx(
            {
                eventName: EzClockerContextEventName.onSelectedEmployerAccountClosed,
                handlerName: EzAccountNavButton.ezApiName,
                handlerFunction: () => {
                    EzAccountNavButton.ezInstance.ezAccountNavButtonReadyFlags.selectedEmployerAccountReady = false;

                    EzAccountNavButton.ezInstance.ezProcessReadyChecks();
                }
            },
            true);

        // Active Employer Events
        ezApi.ezclocker.ezEventEngine.ezWantEventEx(
            {
                eventName: EzClockerContextEventName.onActiveEmployerReady,
                handlerName: EzAccountNavButton.ezApiName,
                handlerFunction: () => {
                    EzAccountNavButton.ezInstance.ezAccountNavButtonReadyFlags.activeEmployerReady = true;

                    EzAccountNavButton.ezInstance.ezProcessReadyChecks();
                }
            },
            true);

        ezApi.ezclocker.ezEventEngine.ezWantEventEx(
            {
                eventName: EzClockerContextEventName.onActiveEmployerChanged,
                handlerName: EzAccountNavButton.ezApiName,
                handlerFunction: () => {
                    EzAccountNavButton.ezInstance.ezAccountNavButtonReadyFlags.activeEmployerReady = true;

                    EzAccountNavButton.ezInstance.ezProcessReadyChecks();
                }
            },
            true);

        ezApi.ezclocker.ezEventEngine.ezWantEventEx(
            {
                eventName: EzClockerContextEventName.onActiveEmployerClosed,
                handlerName: EzAccountNavButton.ezApiName,
                handlerFunction: () => {
                    EzAccountNavButton.ezInstance.ezAccountNavButtonReadyFlags.activeEmployerReady = false;

                    EzAccountNavButton.ezInstance.ezProcessReadyChecks();
                }
            },
            true);

        // Selected Employer License Events
        ezApi.ezclocker.ezEventEngine.ezWantEventEx(
            {
                eventName: EzClockerContextEventName.onSelectedEmployerLicenseReady,
                handlerName: EzAccountNavButton.ezApiName,
                handlerFunction: () => {
                    EzAccountNavButton.ezInstance.ezAccountNavButtonReadyFlags.employerLicenseReady = true;

                    EzAccountNavButton.ezInstance.ezProcessReadyChecks();
                }
            },
            true);

        ezApi.ezclocker.ezEventEngine.ezWantEventEx(
            {
                eventName: EzClockerContextEventName.onSelectedEmployerLicenseUpdated,
                handlerName: EzAccountNavButton.ezApiName,
                handlerFunction: () => {
                    EzAccountNavButton.ezInstance.ezAccountNavButtonReadyFlags.employerLicenseReady = true;

                    EzAccountNavButton.ezInstance.ezProcessReadyChecks();
                }
            },
            true);

        // Feature Package Events
        ezApi.ezclocker.ezEventEngine.ezWantEventEx(
            {
                eventName: EzFeaturePackageManager.ezEventNames.onFeaturePackagesLoaded,
                handlerName: EzAccountNavButton.ezApiName,
                handlerFunction: () => {
                    EzAccountNavButton.ezInstance.ezAccountNavButtonReadyFlags.featurePackageManagerReady = true;

                    EzAccountNavButton.ezInstance.ezProcessReadyChecks();
                }
            },
            true);

        // Validate License Events
        ezApi.ezclocker.ezEventEngine.ezWantEventEx(
            {
                eventName: EzClockerContextEventName.ezOnValidateLicenseValid,
                handlerName: EzAccountNavButton.ezApiName,
                handlerFunction: () => {
                    EzAccountNavButton.ezInstance.ezAccountNavButtonReadyFlags.employerLicenseReady = true;

                    EzAccountNavButton.ezInstance.ezProcessReadyChecks();
                }
            },
            true);

        ezApi.ezclocker.ezEventEngine.ezWantEventEx(
            {
                eventName: EzClockerContextEventName.ezOnValidateLicenseExpired,
                handlerName: EzAccountNavButton.ezApiName,
                handlerFunction: () => {
                    EzAccountNavButton.ezInstance.ezAccountNavButtonReadyFlags.employerLicenseReady = false;

                    EzAccountNavButton.ezInstance.ezProcessReadyChecks();
                }
            },
            true);

        ezApi.ezclocker.ezEventEngine.ezWantEventEx(
            {
                eventName: EzClockerContextEventName.ezOnValidateLicenseError,
                handlerName: EzAccountNavButton.ezApiName,
                handlerFunction: () => {
                    EzAccountNavButton.ezInstance.ezAccountNavButtonReadyFlags.employerLicenseReady = false;

                    EzAccountNavButton.ezInstance.ezProcessReadyChecks();
                }
            },
            true);

        ezApi.ezclocker.ezEventEngine.ezWantEventEx(
            {
                eventName: EzClockerContextEventName.ezOnValidateLicenseFreeTrialExpired,
                handlerName: EzAccountNavButton.ezApiName,
                handlerFunction: () => {
                    EzAccountNavButton.ezInstance.ezAccountNavButtonReadyFlags.employerLicenseReady = false;

                    EzAccountNavButton.ezInstance.ezProcessReadyChecks();
                }
            },
            true);

        ezApi.ezclocker.ezEventEngine.ezWantEventEx(
            {
                eventName: EzClockerContextEventName.ezOnValidateLicenseViolationError,
                handlerName: EzAccountNavButton.ezApiName,
                handlerFunction: () => {
                    EzAccountNavButton.ezInstance.ezAccountNavButtonReadyFlags.employerLicenseReady = false;

                    EzAccountNavButton.ezInstance.ezProcessReadyChecks();
                }
            },
            true);

        EzAccountNavButton.ezInstance.ezSaveState();

        return EzAccountNavButton.ezInstance;
    }

    /**
     * Initializes the EzAccountNavButton's navigation items (EzUxElementState for each clickable item)
     */
    ezInitAccountNavItems() {
        EzAccountNavButton.ezInstance.ezAccountNavItems[EzAccountNavButtonActiveOption.ACCOUNT_OPTION] = new EzUxElementState(
            `${EzAccountNavButton.ezInstance.ezAccountNavButtonId}_${EzAccountNavButtonActiveOption.ACCOUNT_OPTION}`,
            // visible
            true,
            // enabled
            true,
            // remove
            false,
            null,
            'Navigate to additional features for your account.');
        EzAccountNavButton.ezInstance.ezAccountNavItems[EzAccountNavButtonActiveOption.ACCOUNT_OPTION].selected = true;

        EzAccountNavButton.ezInstance.ezAccountNavItems[EzAccountNavButtonActiveOption.ACCOUNT_DETAILS_OPTION] = new EzUxElementState(
            `${EzAccountNavButton.ezInstance.ezAccountNavButtonId}_${EzAccountNavButtonActiveOption.ACCOUNT_DETAILS_OPTION}`,
            // visible
            true,
            // enabled
            false,
            // remove
            false,
            null,
            'Navigate to the Account Details View',
            'Sign into the primary Employer account to access the Account Details view.');

        EzAccountNavButton.ezInstance.ezAccountNavItems[EzAccountNavButtonActiveOption.ACCOUNT_INTEGRATIONS_OPTION] = new EzUxElementState(
            `${EzAccountNavButton.ezInstance.ezAccountNavButtonId}_${EzAccountNavButtonActiveOption.ACCOUNT_INTEGRATIONS_OPTION}`,
            // visible
            true,
            // enabled
            false,
            // remove
            false,
            null,
            'Navigate to the Integrations View',
            'Upgrade to a Standard or Premium account to access the Integration features.');

        EzAccountNavButton.ezInstance.ezAccountNavItems[EzAccountNavButtonActiveOption.ACCOUNT_TIME_OFF_OPTION] = new EzUxElementState(
            `${EzAccountNavButton.ezInstance.ezAccountNavButtonId}_${EzAccountNavButtonActiveOption.ACCOUNT_TIME_OFF_OPTION}`,
            // visible
            true,
            // enabled
            false,
            // remove
            false,
            null,
            'Navigate to the Time Off View',
            'Upgrade to a Standard or Premium account to access the Time Off features.');
    }

    /**
     * @public @method
     * Initializes the HTML UX for the EzAccountNavButton
     */
    ezInitUX() {
        EzAccountNavButton.ezInstance.ezInjectAccountNavButton(
            EzAccountNavButton.ezInstance.ezInsertBeforeElementId,
            EzAccountNavButton.ezInstance.ezActiveOptionValue);
    }

    /**
     * @public @method
     * Processes the ready check flags and when all evaluate as true, calls ezInitUX
     */
    ezProcessReadyChecks() {
        if (EzAccountNavButton.ezInstance.ezAccountNavButtonReadyFlags.isReady) {
            EzAccountNavButton.ezInstance.ezProcessTimeOffReadyChecks();

            EzAccountNavButton.ezInstance.ezProcessIntegrationReadyChecks();

            EzAccountNavButton.ezInstance.ezProcessAccountDetailsReadyChecks();
        }

        if (EzAccountNavButton.ezInstance.ezNavigationFeaturesReady.ezCanEnableNavigation) {
            EzAccountNavButton.ezInstance.ezEnabled = true;
        }
    }

    /**
     * @public @method
     * Processes ready checks for time off menu
     */
    ezProcessTimeOffReadyChecks() {
        if (EzAccountNavButton.ezInstance.ezAccountNavButtonReadyFlags.isReady) {
            EzAccountNavButton.ezInstance.ezNavigationFeaturesReady.timeOffReady = ezApi.ezclocker.ezFeatureToggles.ezIsViewFeatureOn(
                'account',
                EzFeatureToggleId.ezfTimeOff) &&
                (ezApi.ezclocker.ezClockerContext.ezActiveEmployerLicenseHasFeature(EzLicenseFeatureId.TIME_OFF) ||
                    ezApi.ezclocker.ezClockerContext.ezActiveEmployerLicenseHasFeature(EzLicenseFeatureId.TIME_OFF_YEARLY) ||
                    ezApi.ezclocker.ezFeaturePackageManager.ezFeaturePackageEnabled(EzFeaturePackageId.TIME_OFF) ||
                    ezApi.ezclocker.ezFeaturePackageManager.ezFeaturePackageEnabled(EzFeaturePackageId.TIME_OFF_YEARLY))

            if (EzAccountNavButton.ezInstance.ezNavigationFeaturesReady.timeOffReady) {
                // User has access to time off feature
                EzAccountNavButton.ezInstance.ezAccountNavItems[EzAccountNavButtonActiveOption.ACCOUNT_TIME_OFF_OPTION].ezVisible = true;

                EzAccountNavButton.ezInstance.ezAccountNavItems[EzAccountNavButtonActiveOption.ACCOUNT_TIME_OFF_OPTION].ezEnabled =
                    EzAccountNavButton.ezInstance.ezActiveOptionValue !== EzAccountNavButtonActiveOption.ACCOUNT_TIME_OFF_OPTION;

                EzAccountNavButton.ezInstance.ezAccountNavItems[EzAccountNavButtonActiveOption.ACCOUNT_TIME_OFF_OPTION].ezRemove = false;
            } else {
                // User does not have access to time off feature
                EzAccountNavButton.ezInstance.ezAccountNavItems[EzAccountNavButtonActiveOption.ACCOUNT_TIME_OFF_OPTION].ezVisible = true;

                EzAccountNavButton.ezInstance.ezAccountNavItems[EzAccountNavButtonActiveOption.ACCOUNT_TIME_OFF_OPTION].ezEnabled = false;

                EzAccountNavButton.ezInstance.ezAccountNavItems[EzAccountNavButtonActiveOption.ACCOUNT_TIME_OFF_OPTION].ezRemove = false;
            }

            ezApi.ezclocker.ezUxState.ezApplyElementState(
                EzAccountNavButton.ezInstance.ezAccountNavItems[EzAccountNavButtonActiveOption.ACCOUNT_TIME_OFF_OPTION]);

            EzAccountNavButton.ezInstance.ezSaveState();
        }
    }

    /**
     * @public @method
     * Processes ready checks for integration menu
     */
    ezProcessIntegrationReadyChecks() {
        if (EzAccountNavButton.ezInstance.ezAccountNavButtonReadyFlags.isReady) {
            EzAccountNavButton.ezInstance.ezNavigationFeaturesReady.integrationsReady = ezApi.ezclocker.ezClockerContext.ezActiveEmployerLicenseHasFeature(
                EzLicenseFeatureId.INTEGRATIONS);

            if (EzAccountNavButton.ezInstance.ezNavigationFeaturesReady.integrationsReady) {
                // User has access to integration features
                EzAccountNavButton.ezInstance.ezAccountNavItems[EzAccountNavButtonActiveOption.ACCOUNT_INTEGRATIONS_OPTION].ezVisible = true;

                EzAccountNavButton.ezInstance.ezAccountNavItems[EzAccountNavButtonActiveOption.ACCOUNT_INTEGRATIONS_OPTION].ezEnabled =
                    EzAccountNavButton.ezInstance.ezActiveOptionValue !== EzAccountNavButtonActiveOption.ACCOUNT_INTEGRATIONS_OPTION;

                EzAccountNavButton.ezInstance.ezAccountNavItems[EzAccountNavButtonActiveOption.ACCOUNT_INTEGRATIONS_OPTION].ezRemove = false;
            } else {
                // User does not have access to integration features
                EzAccountNavButton.ezInstance.ezAccountNavItems[EzAccountNavButtonActiveOption.ACCOUNT_INTEGRATIONS_OPTION].ezVisible = true;

                EzAccountNavButton.ezInstance.ezAccountNavItems[EzAccountNavButtonActiveOption.ACCOUNT_INTEGRATIONS_OPTION].ezEnabled = false;

                EzAccountNavButton.ezInstance.ezAccountNavItems[EzAccountNavButtonActiveOption.ACCOUNT_INTEGRATIONS_OPTION].ezRemove = false;
            }

            ezApi.ezclocker.ezUxState.ezApplyElementState(
                EzAccountNavButton.ezInstance.ezAccountNavItems[EzAccountNavButtonActiveOption.ACCOUNT_INTEGRATIONS_OPTION]);

            EzAccountNavButton.ezInstance.ezSaveState();
        }
    }

    /**
     * @public @method
     * Processes ready checks for the account menu
     */
    ezProcessAccountDetailsReadyChecks() {
        if (EzAccountNavButton.ezInstance.ezAccountNavButtonReadyFlags.isReady) {
            EzAccountNavButton.ezInstance.ezNavigationFeaturesReady.accountDetailsReady = ezApi.ezclocker.ezClockerContext.ezGetUserContext().isEmployer;

            if (EzAccountNavButton.ezInstance.ezNavigationFeaturesReady.accountDetailsReady) {
                // User has access to integration features
                EzAccountNavButton.ezInstance.ezAccountNavItems[EzAccountNavButtonActiveOption.ACCOUNT_DETAILS_OPTION].ezVisible = true;

                EzAccountNavButton.ezInstance.ezAccountNavItems[EzAccountNavButtonActiveOption.ACCOUNT_DETAILS_OPTION].ezEnabled =
                    EzAccountNavButton.ezInstance.ezActiveOptionValue !== EzAccountNavButtonActiveOption.ACCOUNT_DETAILS_OPTION;

                EzAccountNavButton.ezInstance.ezAccountNavItems[EzAccountNavButtonActiveOption.ACCOUNT_DETAILS_OPTION].ezRemove = false;
            } else {
                // User has access to integration features
                EzAccountNavButton.ezInstance.ezAccountNavItems[EzAccountNavButtonActiveOption.ACCOUNT_DETAILS_OPTION].ezVisible = true;

                EzAccountNavButton.ezInstance.ezAccountNavItems[EzAccountNavButtonActiveOption.ACCOUNT_DETAILS_OPTION].ezEnabled = false;

                EzAccountNavButton.ezInstance.ezAccountNavItems[EzAccountNavButtonActiveOption.ACCOUNT_DETAILS_OPTION].ezRemove = false;
            }

            ezApi.ezclocker.ezUxState.ezApplyElementState(
                EzAccountNavButton.ezInstance.ezAccountNavItems[EzAccountNavButtonActiveOption.ACCOUNT_DETAILS_OPTION]);

            EzAccountNavButton.ezInstance.ezSaveState();
        }
    }

    /**
     * @public @method
     * Removes the EzAccountNavButton from the document (if it exists)
     */
    ezRemoveAccountNavButton() {
        if (EzBoolean.isTrue(ezApi.ezclocker.ezUi.ezElementExists(EzAccountNavButton.ezInstance.ezAccountNavButtonId))) {
            ezApi.ezclocker.ezEventEngine.ezUnwantElementEvent(
                EzAccountNavButton.ezInstance.ezAccountNavButtonId,
                EzElementEventName.CHANGE,
                EzAccountNavButton.ezApiName);

            ezApi.ezclocker.ezEventEngine.ezUnwantEvent(
                EzClockerContextEventName.onSubscriptionContextActiveSubscriptionReady,
                EzAccountViewController.ezApiName);

            ezApi.ezclocker.ezEventEngine.ezUnwantEvent(
                EzClockerContextEventName.onSubscriptionContextActiveSubscriptionChanged,
                EzAccountNavButton.ezApiName);

            ezApi.ezclocker.ezEventEngine.ezUnwantEvent(
                EzClockerContextEventName.onSelectedEmployerAccountReady,
                EzAccountNavButton.ezApiName);

            ezApi.ezclocker.ezEventEngine.ezUnwantEvent(
                EzClockerContextEventName.onSelectedEmployerAccountChanged,
                EzAccountNavButton.ezApiName);

            ezApi.ezclocker.ezUi.ezRemoveElement(EzAccountNavButton.ezInstance.ezAccountNavButtonId);

            EzAccountNavButton.ezInstance.ezProcessReadyChecks();
        }
    }

    /**
     * @public @method
     * Injects the account button (for when it doesn't inject into the UX during ezInitUX)
     * @param {undefined|null|string} insertBeforeElementId
     * Default is: EzAccountNavButton.ezInstance.ezHelpButtonId
     * @param {undefined|null|string} activeOptionValue
     * Default is: EzAccountNavButton.ezInstance.ezActiveOptionValue
     * @returns {boolean}
     * Returns true if injected (or already injected), false otherwise.
     */
    ezInjectAccountNavButton(
        insertBeforeElementId = EzHelp.DEFAULT_HELP_BUTTON_ID,
        activeOptionValue = EzAccountNavButtonActiveOption.ACCOUNT_OPTION) {

        if (!EzString.hasLength(insertBeforeElementId)) {
            insertBeforeElementId = EzAccountNavButton.ezInstance?.ezHelpButtonId;
        }

        if (!ezApi.ezclocker.ezUi.ezElementExists(insertBeforeElementId) ||
            !ezApi.ezclocker.ezClockerContext.ezGetUserContext().isEmployerOrActingAsEmployer) {
            // Injection requirements not met
            return;
        }

        if (EzAccountNavButtonActiveOption.UNKNOWN == EzAccountNavButtonActiveOption.ezAsEnum(activeOptionValue)) {
            activeOptionValue = EzAccountNavButtonActiveOption.ACCOUNT_OPTION;
        }

        EzAccountNavButton.ezInstance.ezActiveOptionValue = activeOptionValue;

        if (EzAccountNavButton.ezInstance.ezIsInjected) {
            return true;
        }

        if (!EzObject.isValid(EzUx.findById(insertBeforeElementId))) {
            return false;
        }

        EzAccountNavButton.ezInstance.ezInsertBeforeElementId = insertBeforeElementId;

        EzUx.insertBeforeElement(
            EzAccountNavButton.ezInstance.ezInsertBeforeElementId,
            EzAccountNavButton.ezInstance.ezAccountNavButtonHtml,
            `${EzAccountNavButton.ezInstance.ezAccountNavButtonId}_Container`);

        ezApi.ezclocker.ezEventEngine.ezWantElementEvent(
            EzAccountNavButton.ezInstance.ezAccountNavButtonId,
            EzElementEventName.CHANGE,
            EzAccountNavButton.ezApiName,
            EzAccountNavButton.ezInstance.ezHandleAccountNavButtonChangeEvent);

        ezApi.ezclocker.ezEventEngine.ezWantEvent(
            EzClockerContextEventName.onSubscriptionContextActiveSubscriptionReady,
            EzAccountNavButton.ezApiName,
            EzAccountNavButton.ezInstance.ezProcessReadyChecks);

        ezApi.ezclocker.ezEventEngine.ezWantEvent(
            EzClockerContextEventName.onSubscriptionContextActiveSubscriptionChanged,
            EzAccountNavButton.ezApiName,
            EzAccountNavButton.ezInstance.ezProcessReadyChecks);

        ezApi.ezclocker.ezEventEngine.ezWantEvent(
            EzClockerContextEventName.onSelectedEmployerAccountReady,
            EzAccountNavButton.ezApiName,
            EzAccountNavButton.ezInstance.ezProcessReadyChecks);

        ezApi.ezclocker.ezEventEngine.ezWantEvent(
            EzClockerContextEventName.onSelectedEmployerAccountChanged,
            EzAccountNavButton.ezApiName,
            EzAccountNavButton.ezInstance.ezProcessReadyChecks);

        EzAccountNavButton.ezInstance.ezProcessReadyChecks();

        return true;
    }

    /**
     * @protected @method
     * Handles the onchange event of the EzAccountNavButton
     * @param {object} ezEvent
     */
    ezHandleAccountNavButtonChangeEvent(ezEvent) {
        if (!EzObject.isValid(ezEvent)) {
            throw new EzBadParamException(
                'ezEvent',
                EzAccountNavButton.ezInstance,
                EzAccountNavButton.ezInstance.ezHandleAccountNavButtonChangeEvent);
        }
        if (!ezEvent?.data) {
            throw new EzBadParamException(
                'ezEvent',
                EzAccountNavButton.ezInstance,
                EzAccountNavButton.ezInstance.ezHandleAccountNavButtonChangeEvent,
                'Parameter ezEvent missing required data: ezEvent.data is undefed or null');
        }
        if (!ezEvent.data?.elementEvent) {
            throw new EzBadParamException(
                'ezEvent',
                EzAccountNavButton.ezInstance,
                EzAccountNavButton.ezInstance.ezHandleAccountNavButtonChangeEvent,
                'Parameter ezEvent missing required data: ezEvent.data.elementEvent is undefed or null');
        }
        if (!ezEvent.data.elementEvent?.target) {
            throw new EzBadParamException(
                'ezEvent.elementEvent',
                EzAccountNavButton.ezInstance,
                EzAccountNavButton.ezInstance.ezHandleAccountNavButtonChangeEvent,
                'Parameter ezEvent missing required data: ezEvent.data.elementEvent.target is undefed or null');
        }
        if (!EzString.hasLength(ezEvent.data?.elementId)) {
            throw new EzBadParamException(
                'ezEvent',
                EzAccountNavButton.ezInstance,
                EzAccountNavButton.ezInstance.ezHandleAccountNavButtonChangeEvent,
                'Parameter ezEvent missing required properties: ezEvent.data.elementId is undefed or null');
        }

        if (EzAccountNavButton.ezInstance.ezAccountNavButtonReadyFlags.isReady) {
            EzAccountNavButton.ezInstance.ezActiveOptionValue = ezApi.ezclocker.ezUi.ezGetInputValue(ezEvent.data.elementId);

            switch (EzAccountNavButton.ezInstance.ezActiveOptionValue) {
                case EzAccountNavButtonActiveOption.ACCOUNT_DETAILS_OPTION:
                    EzAccountNavButton.ezInstance.ezNavigateToAccountDetailsView();

                    return;
                case EzAccountNavButtonActiveOption.ACCOUNT_INTEGRATIONS_OPTION:
                    EzAccountNavButton.ezInstance.ezNavigateToIntegrationsView();

                    return;
                case EzAccountNavButtonActiveOption.ACCOUNT_TIME_OFF_OPTION:
                    EzAccountNavButton.ezInstance.ezNavigateToTimeOffView();

                    return;
                case EzAccountNavButtonActiveOption.ACCOUNT_OPTION:
                default:
                    // No navigation performed with this option
                    return;
            }
        }
    }

    /**
     * @public @method
     * Navigates to the Time Off view
     */
    ezNavigateToAccountDetailsView() {
        if (ezApi.ezclocker.ezClockerContext.ezGetUserContext().isEmployer) {
            ezApi.ezclocker.ezNavigation.ezNavigateToEmployerAccountPage();
        }
    }

    /**
     * @public @method
     * Navigates to the Time Off view
     */
    ezNavigateToIntegrationsView() {
        if (ezApi.ezclocker.ezClockerContext.ezActiveEmployerLicenseHasFeature(EzLicenseFeatureId.INTEGRATIONS)) {
            ezApi.ezclocker.ezNavigation.ezNavigateToEmployerIntegrationsPage();
        }
    }

    /**
     * @public @method
     * Navigates to the Time Off view
     */
    ezNavigateToTimeOffView() {
        if (ezApi.ezclocker.ezClockerContext.ezActiveEmployerLicenseHasFeature(EzLicenseFeatureId.TIME_OFF) ||
            ezApi.ezclocker.ezClockerContext.ezActiveEmployerLicenseHasFeature(EzLicenseFeatureId.TIME_OFF_YEARLY) ||
            ezApi.ezclocker.ezFeaturePackageManager.ezFeaturePackageEnabled(EzFeaturePackageId.TIME_OFF) ||
            ezApi.ezclocker.ezFeaturePackageManager.ezFeaturePackageEnabled(EzFeaturePackageId.TIME_OFF_YEARLY)) {
            ezApi.ezclocker.ezNavigation.ezNavigateToTimeOff();
        }
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
        return 'ezAccountNavButton';
    }

    /**
     * @static
     * @public @readonly @property
     * Returns an object of event names that this class may trigger.
     * @returns {object}
     */
    static get ezEventNames() {
        return {
            onReady: 'ezOn_EzAccountNavButton_Ready'
        };
    }

    /**
     * @static
     * @private @field
     * Stores the singleton instance of this class that was created by and registerd with EzApi.
     * @type {EzAccountNavButton}
     */
    static #ezInstance = globalThis?.ezApi?.ready && globalThis.ezApi?.ezclocker?.[EzAccountNavButton.ezApiName]
        ? globalThis.ezApi.ezclocker[EzAccountNavButton.ezApiName]
        : null;

    /**
     * @static
     * @public @property @getter
     * Returns the singleton instance of this class that is registered with EzApi (if available yet)
     * @returns {EzAccountNavButton}
     */
    static get ezInstance() {
        return EzAccountNavButton.#ezInstance;
    }

    /**
     * @static
     * @public @property @setter
     * Sets the singleton instance of of this class that is registered with EzApi.
     * @param {EzAccountNavButton} instance
     */
    static set ezInstance(instance) {
        if (null != EzAccountNavButton.#ezInstance) {
            throw new Error('EzAccountNavButton\'s singleton instance is already reigstered with EzApi.');
        }

        EzAccountNavButton.#ezInstance = instance;
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
    static #ezApiRegistrationState = globalThis?.ezApi?.ready && globalThis.ezApi?.ezclocker?.[EzAccountNavButton.ezApiName]
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
        return EzAccountNavButton.#ezApiRegistrationState;
    }

    /**
     * @static
     * @public @property @setter
     * Sets the ezApi registration state of this classes's singleton instance.
     * @param {string} ezApiRegistrationState
     * A valid enum property value from EzRegistrationState
     */
    static set ezApiRegistrationState(ezApiRegistrationState) {
        EzAccountNavButton.#ezApiRegistrationState = EzRegistrationState.ezValueOf(ezApiRegistrationState);
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
        return EzRegistrationState.PENDING === EzAccountNavButton.ezApiRegistrationState &&
            globalThis?.ezApi?.ready &&
            globalThis.ezApi?.ezclocker?.[EzEventEngine.ezApiName]?.ready &&
            globalThis.ezApi?.ezclocker?.[EzClockerContextEventName.ezApiName]?.ready &&
            globalThis.ezApi?.ezclocker?.[EzClockerContext.ezApiName]?.ready &&
            globalThis.ezApi?.ezclocker?.[EzNavigation.ezApiName]?.ready &&
            globalThis.ezApi?.ezclocker?.[EzFeaturePackageManager.ezApiName]?.ready &&
            globalThis.ezApi?.ezclocker?.[EzUI.ezApiName]?.ready &&
            globalThis.ezApi?.ezclocker?.[EzUxState.ezApiName]?.ready &&
            globalThis.ezApi?.ezclocker?.[EzDialog.ezApiName]?.ready &&
            globalThis.ezApi?.ezclocker?.[EzHelp.ezApiName]?.ready
    }

    /**
     * @static
     * @private @readonly @property
     * Returns if this class's singleton instance is registered with ezApi yet.
     * @returns {boolean}
     */
    static get #ezIsRegistered() {
        return null != EzAccountNavButton.ezInstance && EzRegistrationState.REGISTERED === EzAccountNavButton.ezApiRegistrationState;
    }

    /**
     * @static
     * @private @method
     * Attempts to register the singleton instance for this class with ezApi. Returns true
     * if successful, false otherwise.
     * @returns {boolean}
     */
    static #ezRegistrator() {
        if (EzAccountNavButton.#ezCanRegister && !EzAccountNavButton.#ezIsRegistered) {
            globalThis.ezApi.ezRegisterNewApi(EzAccountNavButton, EzAccountNavButton.ezApiName);

            EzAccountNavButton.ezIsRegistered = EzRegistrationState.REGISTERED;
        }

        return EzAccountNavButton.#ezIsRegistered;
    }

    /**
     * @static
     * Static Initialization
     * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
     * >> IMPORTANT <<
     * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
     * Make sure the following properties and methods get defined BEFORE this static initialization section:
     *     1) Property getter EzAccountNavButton.ezApiName
     *     2) Property getter EzAccountNavButton.ezEventNames
     *     3) Property getter EzAccountNavButton.ezInstance
     *     4) Property setter EzAccountNavButton.ezInstance
     *     5) Property getter EzAccountNavButton.ezApiRegistrationState
     *     6) Property setter EzAccountNavButton.ezApiRegistrationState
     *     7) Property getter EzAccountNavButton.#ezCanRegister
     *     8) Property getter EzAccountNavButton.#ezIsRegistered
     *     9) Method EzAccountNavButton.#ezRegistrator()
     */
    static {
        if (!EzAccountNavButton.#ezIsRegistered) {
            EzAccountNavButton.ezApiRegistrationState = EzRegistrationState.PENDING;

            if (!EzAccountNavButton.#ezRegistrator()) {
                document.addEventListener(
                    EzAccountNavButton.ezOnEzApiReadyEventName,
                    EzAccountNavButton.#ezRegistrator);

                document.addEventListener(
                    EzEventEngine.ezEventNames.onReady,
                    EzAccountNavButton.#ezRegistrator);

                document.addEventListener(
                    EzClockerContextEventName.ezEventNames.onReady,
                    EzAccountNavButton.#ezRegistrator);

                document.addEventListener(
                    EzClockerContext.ezEventNames.onReady,
                    EzAccountNavButton.#ezRegistrator);

                document.addEventListener(
                    EzNavigation.ezEventNames.onReady,
                    EzAccountNavButton.#ezRegistrator);

                document.addEventListener(
                    EzFeaturePackageManager.ezEventNames.onReady,
                    EzAccountNavButton.#ezRegistrator);

                document.addEventListener(
                    EzUI.ezEventNames.onReady,
                    EzAccountNavButton.#ezRegistrator);

                document.addEventListener(
                    EzUxState.ezEventNames.onReady,
                    EzAccountNavButton.#ezRegistrator);

                document.addEventListener(
                    EzDialog.ezEventNames.onReady,
                    EzAccountNavButton.#ezRegistrator);

                document.addEventListener(
                    EzHelp.ezEventNames.onReady,
                    EzAccountNavButton.#ezRegistrator);
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
