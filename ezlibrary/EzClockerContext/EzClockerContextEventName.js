import { EzEnum } from '/ezlibrary/enums/EzEnum.js';

/**
 * @class
 * @extends {EzEnum}
 * @description
 * Enumeration that defines EzClockerContext event names
 * ---------------------------------------------------------------------------
 * Import with:
 *     import {
 *         < ... other enumerations ... >,
 *         EzClockerContextEventName
 *     } from '/ezlibrary/enums/EzEnumerations.js';
 * ---------------------------------------------------------------------------
 * Singleton instance ready for use when the below evaluates to true:
 *     globalThis.ezApi.ezclocker?.[EzClockerContextEventName.ezApiName]?.ready
 * ---------------------------------------------------------------------------
 * Listen to onReady event:
 *    document.addEventListener(
 *         EzClockerContextEventName.ezEventNames.onReady,
 *         this.#ezRegistrator);
 * ---------------------------------------------------------------------------
 */
export class EzClockerContextEventName extends EzEnum {
    /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    | EzClockerContext
    | /ezlibrary/EzClockerContext/ez-context.js
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

    /**
     * @public @static @readonly @property
     * @returns {string}
     */
    static get onContextLoading() {
        return 'EzContextLoading';
    }

    /**
     * @public @static @readonly @property
     * @returns {string}
     */
    static get onContextReady() {
        return 'EzContextLoaded';
    }


    /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    | User Context
    | /ezlibrary/EzClockerContext/ez-context-module-user-context.js
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

    /**
     * @public @static @readonly @property
     * @returns {string}
     */
    static get onUserContextReady() {
        return 'ezOn_EzUserContext_Ready';
    }

    /**
     * @public @static @readonly @property
     * @returns {string}
     */
    static get onUserContextUpdated() {
        return 'EzClockerContext_EzUserContext_Updated';
    }

    /**
     * @public @static @readonly @property
     * @returns {string}
     */
    static get onUserContextModuleReady() {
        return 'ezOn_EzUserContext_ModuleReady';
    }

    /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    | Active Account
    | /ezlibrary/EzClockerContext/ez-context-module-active-account.js
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

    /**
     * @public @static @readonly @property
     * @returns {string}
     */
    static get onActiveAccountSelectedPeriodChanged() {
        return 'EzClockerContext_ActiveAccount_SelectedPeriod_Changed';
    }

    /**
     * @public @static @readonly @property
     * @returns {string}
     */
    static get onActiveAccountReady() {
        return 'EzClockerContext_ActiveAccount_Ready';
    }

    /**
     * @static
     * @public @readonly @property
     * @returns {string}
     */
    static get onActiveAccountSelectedPeriodRefreshed() {
        return 'EzClockerContext_SELECTED_PERIOD_REFRESHED';
    }


    /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    | Employer Context
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

    /**
     * @public @static @readonly @property
     * @returns {string}
     */
    static get onEmployerContextReady() {
        return 'EzClockerContext_EmployerContext_Ready';
    }

    /**
     * @public @static @readonly @property
     * @returns {string}
     */
    static get onEmployerContextClosed() {
        return 'EzClockerContext_EmployerContext_Closed';
    }


    /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    | Selected Employer Account
    | /ezlibrary/EzClockerContext/ez-context-module-selected-employer.js
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

    /**
     * @public @static @readonly @property
     * @returns {string}
     */
    static get onSelectedEmployerAccountReady() {
        return 'EzClockerContext_SelectedEmployer_Ready';
    }

    /**
     * @public @static @readonly @property
     * @returns {string}
     */
    static get onSelectedEmployerAccountChanged() {
        return 'EzClockerContext_SelectedEmployer_Changed';
    }

    /**
     * @public @static @readonly @property
     * @returns {string}
     */
    static get onSelectedEmployerAccountClosed() {
        return 'EzClockerContext_SelectedEmployer_Closed';
    }

    /**
     * @public @static @readonly @property
     * @returns {string}
     */
    static get onSelectedEmployerEmployeesChanged() {
        return 'EzClockerContext_SelectedEmployer_Employees_Changed';
    }

    /**
     * @public @static @readonly @property
     * @returns {string}
     */
    static get onSelectedEmployerEmployeeAccountsUpdated() {
        return 'EzClockerContext_SelectedEmployer_Employees_Updated';
    }

    /**
     * @public @static @readonly @property
     * @returns {string}
     */
    static get onSelectedEmployerLicenseReady() {
        return 'EzClockerContext_SelectedEmployer_License_Ready';
    }

    /**
     * @public @static @readonly @property
     * @returns {string}
     */
    static get onSelectedEmployerLicenseUpdated() {
        return 'EzClockerContext_SelectedEmployer_License_Updated';
    }

    /**
     * @public @static @readonly @property
     * @returns {string}
     */
    static get onSelectedEmployerIntegerationEmployeesReady() {
        return 'EzClockerContext_SelectedEmployer_Integration_Employees_Ready';
    }

    /**
     * @public @static @readonly @property
     * @returns {string}
     */
    static get onSelectedEmployerIntegerationEmployeesUpdated() {
        return 'EzClockerContext_SelectedEmployer_Integration_Employees_Updated';
    }

    /**
     * @public @static @readonly @property
     * @returns {string}
     */
    static get onSelectedEmployerAccountJobsReady() {
        return 'EzClockerContext_SelectedEmployer_Jobs_Ready';
    }

    /**
     * @public @static @readonly @property
     * @returns {string}
     */
    static get onSelectedEmployerAccountActiveIntegrationsReady() {
        return 'EzClockerContext_SelectedEmployer_ActiveIntegrations_Ready';
    }

    /**
     * @public @static @readonly @property
     * @returns {string}
     */
    static get onSelectedEmployerAccountActiveIntegrationsUpdated() {
        return 'EzClockerContext_SelectedEmployer_ActiveIntegrations_Updated';
    }

    /**
     * @public @static @readonly @property
     * @returns {string}
     */
    static get onSelectedEmployerAccountActiveIntegrationsError() {
        return 'EzClockerContext_SelectedEmployer_ActiveIntegrations_Error';
    }


    /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    | Active Employer
    | /ezlibrary/EzClockerContext/ez-context-module-active-employer.js
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

    /**
     * @static
     * @public @readonly @property
     * @returns {string}
     */
    static get onActiveEmployerReady() {
        return 'EzClockerContext_ActiveEmployer_Ready';
    }

    /**
     * @static
     * @public @readonly @property
     * Event name for when the EzClockerContext's active employer reference has changed.
     * @returns {string}
     */
    static get onActiveEmployerChanged() {
        return 'EzClockerContext_ActiveEmployer_Changed';
    }

    /**
     * @static
     * @public @readonly @property
     * @returns {string}
     */
    static get onActiveEmployerClosed() {
        return 'EzClockerContext_ActiveEmployer_Closed';
    }


    /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    | Manager Context
    | /ezlibrary/EzClockerContext/ez-context-module-manager-context.js
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

    /**
     * @public @static @readonly @property
     * @returns {string}
     */
    static get onManagerContextReady() {
        return 'EzClockerContext_ManagerContext_Ready';
    }

    /**
     * @public @static @readonly @property
     * @returns {string}
     */
    static get onManagerContextChanged() {
        return 'EzClockerContext_ManagerContext_Changed';
    }


    /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    | Payroll Manager Context
    | /ezlibrary/EzClockerContext/ez-context-module-payroll-manager-context.js
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
    /**
     * @public @static @readonly @property
     * @returns {string}
     */
    static get onPayrollManagerContextReady() {
        return 'EzClockerContext_PayrollManagerContext_Ready';
    }

    /**
     * @public @static @readonly @property
     * @returns {string}
     */
    static get onPayrollManagerContextChanged() {
        return 'EzClockerContext_PayrollManagerContext_Changed';
    }


    /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    | Employee Context
    | /ezlibrary/EzClockerContext/ez-context-module-employee-context.js
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

    /**
     * @public @static @readonly @property
     * @returns {string}
     */
    static get onEmployeeContextReady() {
        return 'EzClockerContext_EmployeeContext_Ready';
    }

    /**
     * @public @static @readonly @property
     * @returns {string}
     */
    static get onEmployeeContextClosed() {
        return 'EzClockerContext_EmployeeContext_Closed';
    }


    /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    | Personal Context
    | /ezlibrary/EzClockerContext/ez-context-module-personal-context.js
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
    /**
     * @public @static @readonly @property
     * @returns {string}
     */
    static get onPersonalContextReady() {
        return 'EzClockerContext_UserContext_Ready';
    }

    /**
     * @public @static @readonly @property
     * @returns {string}
     */
    static get onPersonalEmployerIdReady() {
        return 'EzClockerContext_OnPersonalEmployerId_Ready';
    }

    /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    | Active Employee
    | /ezlibrary/EzClockerContext/ez-context-module-active-employee.js
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

    /**
     * @public @static @readonly @property
     * @returns {string}
     */
    static get onActiveEmployeeReady() {
        return 'EzClockerContext_ActiveEmployee_Ready';
    }

    /**
     * @public @static @readonly @property
     * @returns {string}
     */
    static get onActiveEmployeeClosed() {
        return 'EzClockerContext_ActiveEmployee_Closed';
    }

    /**
     * @public @static @readonly @property
     * @returns {string}
     */
    static get onActiveEmployeeUpdated() {
        return 'EzClockerContext_ActiveEmployee_Updated';
    }

    /**
     * @public @static @readonly @property
     * @returns {string}
     */
    static get onActiveEmployeeChanged() {
        return 'EzClockerContext_ActiveEmployee_Changed';
    }

    /**
     * @public @static @readonly @property
     * @returns {string}
     */
    static get onActiveEmployeeTimeEntriesChanged() {
        return 'EzClockerContext_ActiveEmployee_TimeEntries_Changed';
    }

    /**
     * @public @static @readonly @property
     * @returns {string}
     */
    static get onActiveEmployeeSelectedPeriodChanged() {
        return 'EzClockerContext_ActiveEmployee_SelectedPeriod_Changed';
    }

    /**
     * @public @static @readonly @property
     * @returns {string}
     */
    static get onActiveEmployeeActiveClockInChanged() {
        return 'EzClockerContext_ActiveEmployee_ActiveClockIn_Changed';
    }

    /**
     * @public @static @readonly @property
     * @returns {string}
     */
    static get onActiveEmployeeActiveBreakInChanged() {
        return 'EzClockerContext_ActiveEmployee_ActiveBreakIn_Changed';
    }

    /**
     * @public @static @readonly @property
     * @returns {string}
     */
    static get onActiveEmployeeUserInfoUpdated() {
        return 'EzClockerContext_ActiveEmployee_UserInfo_Updated';
    }

    /**
     * @public @static @readonly @property
     * @returns {string}
     */
    static get onActiveEmployeeInviteSuccess() {
        return 'EzClockerContext_ActiveEmployee_Invite_Success';
    }

    /**
     * @public @static @readonly @property
     * @returns {string}
     */
    static get onActiveEmployeeInviteFailure() {
        return 'EzClockerContext_ActiveEmployee_Invite_Failure';
    }

    /**
     * @public @static @readonly @property
     * @returns {string}
     */
    static get onActiveEmployeeSelectedPeriodTotalsReady() {
        return 'EzClockerContext_ActiveEmployee_SelectedPeriod_Totals_Ready';
    }

    /**
     * @public @static @readonly @property
     * @returns {string}
     */
    static get onActiveEmployeeSelectedPeriodTotalsUpdated() {
        return 'EzClockerContext_ActiveEmployee_SelectedPeriod_Totals_Update';
    }


    /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    | Subscription Context
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

    /**
     * @public @static @readonly @property
     * @returns {string}
     */
    static get onSubscriptionContextLoading() {
        return 'EzClockerContext_SubscriptionContext_Loading';
    }

    /**
     * @public @static @readonly @property
     * @returns {string}
     */
    static get onSubscriptionContextReady() {
        return 'EzClockerContext_SubscriptionContext_Ready';
    }

    /**
     * @public @static @readonly @property
     * @returns {string}
     */
    static get onSubscriptionContextActiveCreditCardReady() {
        return 'EzClockerContext_SubscriptionContext_ActiveCreditCard_Ready';
    }

    /**
     * @public @static @readonly @property
     * @returns {string}
     */
    static get onSubscriptionContextActiveCreditCardChanged() {
        return 'EzClockerContext_SubscriptionContext_ActiveCreditCard_Changed';
    }

    /**
     * @public @static @readonly @property
     * @returns {string}
     */
    static get onSubscriptionContextBillingAddressReady() {
        return 'EzClockerContext_SubscriptionContext_BillingAddress_Ready';
    }

    /**
     * @public @static @readonly @property
     * @returns {string}
     */
    static get onSubscriptionContextBillingAddressChanged() {
        return 'EzClockerContext_SubscriptionContext_BillingAddress_Changed';
    }
    /**
     * @public @static @readonly @property
     * @returns {string}
     */
    static get onSubscriptionContextBillingInformationReady() {
        return 'EzClockerContext_SubscriptionContext_BillingInformation_Ready';
    }

    /**
     * @public @static @readonly @property
     * @returns {string}
     */
    static get onSubscriptionContextBillingInformationChanged() {
        return 'EzClockerContext_SubscriptionContext_BillingInformation_Changed';
    }

    /**
     * @public @static @readonly @property
     * @returns {string}
     */
    static get onSubscriptionContextActiveSubscriptionReady() {
        return 'EzClockerContext_SubscriptionContext_ActiveSubscription_Ready';
    }

    /**
     * @public @static @readonly @property
     * @returns {string}
     */
    static get onSubscriptionContextActiveSubscriptionChanged() {
        return 'EzClockerContext_SubscriptionContext_ActiveSubscription_Changed';
    }

    /**
     * @public @static @readonly @property
     * @returns {string}
     */
    static get onSubscriptionContextAvailablePlansReady() {
        return 'EzClockerContext_SubscriptionContext_AvailablePlans_Ready';
    }

    /**
     * @public @static @readonly @property
     * @returns {string}
     */
    static get onSubscriptionContextAvailablePlansChanged() {
        return 'EzClockerContext_SubscriptionContext_AvailablePlans_Changed';
    }

    /**
     * @public @static @readonly @property
     * @returns {string}
     */
    static get onSubscriptionContextAvailablePlansModeChanged() {
        return 'EzClockerContext_SubscriptionContext_AvailablePlans_Mode_Changed';
    }

    /**
     * @public @static @readonly @property
     * @returns {string}
     */
    static get onSubscriptionContextActiveCustomerReady() {
        return 'EzClockerContext_SubscriptionContext_ActiveCustomer_Ready';
    }

    /**
     * @public @static @readonly @property
     * @returns {string}
     */
    static get onSubscriptionContextActiveCustomerChanged() {
        return 'EzClockerContext_SubscriptionContext_ActiveCustomer_Changed';
    }

    /**
     * @static
     * @public @readonly @property
     * Gets the name of the validate license expired event triggered from EzClockerContext.ezValidateSelectedEmployerAccountLicense()
     * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
     * Triggered by
     *  EzClockerContext.ezValidateSelectedEmployerAccountLicense()
     * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
     * @returns {string}
     */
    static get ezOnValidateLicenseValid() {
        return 'ezOnValidateLicenseValid';
    }
    /**
     * @static
     * @public @readonly @property
     * Gets the name of the validate license expired event triggered from EzClockerContext.ezValidateSelectedEmployerAccountLicense()
     * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
     * Triggered by
     *  EzClockerContext.ezValidateSelectedEmployerAccountLicense()
     * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
     * @returns {string}
     */
    static get ezOnValidateLicenseExpired() {
        return 'ezOnValidateLicenseExpired';
    }
    /**
     * @static
     * @public @readonly @property
     * Gets the name of the validate license error event triggered from EzClockerContext.ezValidateSelectedEmployerAccountLicense()
     * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
     * Triggered by
     *  EzClockerContext.ezValidateSelectedEmployerAccountLicense()
     * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
     * @returns {string}
     */
    static get ezOnValidateLicenseError() {
        return 'ezOnValidateLicenseError';
    }
    /**
     * @static
     * @public @readonly @property
     * Gets the name of the validate free trial expired event triggered from EzClockerContext.ezValidateSelectedEmployerAccountLicense()
     * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
     * Triggered by
     *  EzClockerContext.ezValidateSelectedEmployerAccountLicense()
     * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
     * @returns {string}
     */
    static get ezOnValidateLicenseFreeTrialExpired() {
        return 'ezOnValidateLicenseFreeTrialExpired';
    }

    /**
     * @static
     * @public @readonly @property
     * Gets the name of the validate free trial expired event triggered from EzClockerContext.ezValidateSelectedEmployerAccountLicense()
     * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
     * Triggered by
     *  EzClockerContext.ezValidateSelectedEmployerAccountLicense()
     * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
     * @returns {string}
     */
    static get ezOnValidateLicenseViolationError() {
        return 'ezOnValidateLicenseViolationError';
    }

    /**
     * @public @static @field
     * @type {object}
     */
    static ezInstance = null;

    /**
     * @public @static @field
     * @returns {string}
     */
    static ezApiRegistrationState = null;

    /**
     * @public @static @field
     * @returns {string}
     */
    static get ezApiName() {
        return 'EzClockerContextEventName';
    }

    /**
     * @public @static @field
     * @type {object}
     */
    static get ezEventNames() {
        return {
            onReady: 'ezOn_EzClockerContextEventName_Ready'
        };
    }

    /**
     * @public @static @readonly @property
     */
    static get ezCanRegister() {
        return 'PENDING' === EzClockerContextEventName.ezApiRegistrationState &&
            Object.prototype.hasOwnProperty.call(globalThis, 'ezApi') &&
            globalThis['ezApi'] && globalThis['ezApi'].ready;
    }

    /**
     * @private @static @method
     */
    static #ezRegistrator() {
        if (!EzClockerContextEventName.ezCanRegister) {
            return false;
        }

        EzClockerContextEventName.ezInstance = ezApi.ezRegisterEnumeration(EzClockerContextEventName);
        EzClockerContextEventName.ezApiRegistrationState = 'REGISTERED';
        return true;
    }

    // Static Constructor
    static {
        if (null == EzClockerContextEventName.ezApiRegistrationState) {
            EzClockerContextEventName.ezApiRegistrationState = 'PENDING';

            if (!EzClockerContextEventName.#ezRegistrator()) {
                document.addEventListener(
                    'onEzApiReady',
                    EzClockerContextEventName.#ezRegistrator);
            }
        }
    }
}
