/*
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    ENGINEERING NOTES
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    Classes listed below import EzClockerContext ('/ezlibrary/EzClockerContext/ez-context.js'),
    therefore, adding them as an import in this module will cause a circular reference.
    Please add any additional classes you enounter that would have the same issue to the list below
    and help prevent future errors.

    Do not import the following known classes into this file:
       * EzLicenseHelper from '/secure/javascript/common/ezclocker-license-helper.js';
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
*/

import {
    EzException,
    EzBadParamException,
    EzBadStateException
} from '/ezlibrary/exceptions/EzExceptions.js';

import {
    EzObject,
    EzBoolean,
    EzNumber,
    EzString,
    EzArray,
    EzPromise,
    EzUrl,
    EzJson,
    EzHtml
} from '/ezlibrary/helpers/EzHelpers.js';

import {
    EzEntityType,
    EzPrimaryAccountType,
    EzRegistrationState,
    EzInstanceState,
    EzClockerContextEventName,
    EzBillingFrequency
} from '/ezlibrary/enums/EzEnumerations.js';

import { EzDateTime } from '/public/javascript/common/ez-date-time.js';

import { EzClass } from '/ezlibrary/EzClass.js';

import { EzEventEngine } from '/ezlibrary/ez-event-engine.js';

import { EzHttpHelper } from '/public/javascript/common/ezclocker-http-helper.js';
import { EzNavigation } from '/public/javascript/common/ezclocker-navigation-helper.js';

import { EzEmployerOption } from '/ezlibrary/EzEmployerOption.js';
import { EzClockerAccountType } from '/ezlibrary/EzClockerAccountType.js';
import { EzUserPermission } from '/ezlibrary/EzUserPermission.js';

import { EzAccountServices } from '/public/javascript/services/ezclocker-account-services.js';
import { EzOptionsService } from '/public/javascript/services/ezclocker-options.js';

import { EzEmployeeService } from '/secure/javascript/services/ezclocker-employee-service.js';
import { EzTimeEntryService } from '/secure/javascript/services/ezclocker-time-entry-service.js';
import { EzDataTagService } from '/secure/javascript/services/ezclocker-datatag-service.js';
import { EzInternalDataTagMapApiClient } from '/secure/javascript/services/ezclocker-datatagmap-service.js';

import { EzSubscriptionApiClient } from '/ezlibrary/api_clients/EzSubscriptionApiClient.js';

import { EzAvailableSubscriptionPlans } from '/ezlibrary/EzClockerContext/EzAvailableSubscriptionPlans.js';
import { EzAvailableSubscriptionPlansInfo } from '/ezlibrary/EzClockerContext/EzAvailableSubscriptionPlansInfo.js';
import { EzUserContext } from '/ezlibrary/EzClockerContext/EzUserContext.js';

/**
 * @class
 * @extends {EzClass}
 * @description
 * Provides contexes for site pages
 * ---------------------------------------------------------------------------
 * Import with:
 *     import { EzClockerContext } from '/ezlibrary/EzClockerContext/ez-context.js';
 * ---------------------------------------------------------------------------
 * Singleton instance ready for use when the below evaluates to true:
 *     globalThis.ezApi.ezclocker[EzClockerContext.ezApiName] &&
 *     globalThis.ezApi.ezclocker[EzClockerContext.ezApiName].ready
 * ---------------------------------------------------------------------------
 * Listen to onReady event:
 *     document.addEventListener(
 *         EzClockerContext.ezEventNames.onReady,
 *         this.#ezRegistrator);
 * ---------------------------------------------------------------------------
 * Singleton Instance Reference:
 *     ezApi.ezclocker.ezClockerContext
 * ---------------------------------------------------------------------------
 */
export class EzClockerContext extends EzClass {
    // TODO: All the module available static fields will get removed in future release
    static ezUserContextModuleAvailable = true;
    static ezEmployerContextModuleAvailable = true;
    static ezEmployeeContextModuleAvailable = true;
    static ezManagerContextModuleAvailable = true;
    static ezPayrollManagerContextModuleAvailable = true;
    static ezPersonalContextModuleAvailable = true;
    static ezSubscriptionContextModuleAvailable = true;

    static ezActiveAccountModuleAvailable = true;
    static ezActiveEmployerModuleAvailable = true;
    static ezActiveEmployeeModuleAvailable = true;

    static ezSelectedEmployerModuleAvailable = true;

    static DEFAULT_EMPLOYER_NAME = 'Company Name';

    /**
     * Error message template used in ez-context-module-active-account:ezGetActiveAccount method.
     */
    EZ_SELECTED_ACCOUNT_INDEX_NOT_SET_ERROR_TEMPLATE = 'The active account is a {account_type} account. ' +
        'However, the selected {account_type} account index is not yet valid. ' +
        'The selected {account_type} account index is required to obtain the active account for the logged in user.';

    /**
     * Error message template used in ez-context-module-active-account:ezGetActiveAccount method.
     */
    EZ_SELECTED_ACCOUNT_INDEX_OUT_OF_RANGE_ERROR_TEMPLATE = 'The active account is a {account_type} account ' +
        'and the selected {account_type} index is set to a useable value. ' +
        'However, the {account_type} context does contain a account for the ' +
        '{account_type} account selected index of "{selected_account_index}". ' +
        'The {account_type} context must have a {account_type} account for the {account_type} account index value.';

    /**
     * @static
     * @public @readonly @property
     * Returns the default "selected period total" value of 00:00
     * @returns {string}
     */
    static get DEFAULT_SELECTED_PERIOD_TOTAL() {
        return '00:00';
    }

    /**
     * @private @field
     * An object that contains references to following context entities:
     * - User Context
     * - Employer Context
     * - Payroll Manager Context
     * - Manager Context
     * - Employee Context
     * - Personal Context
     * - Subscription Context.
     * @type {object}
     */
    #ezContexts = {
        ezUserContext: null,
        ezEmployerContext: null,
        ezPayrollManagerContext: null,
        ezManagerContext: null,
        ezEmployeeContext: null,
        ezPersonalContext: null,
        ezSubscriptionContext: null,
    };
    /**
     * @public @readonly @property
     * Gets the object that contains references to following context entities:
     * - User Context
     * - Employer Context
     * - Payroll Manager Context
     * - Manager Context
     * - Employee Context
     * - Personal Context
     * - Subscription Context.
     * @returns {object}
     */
    get ezContexts() {
        return this.#ezContexts;
    }

    /**
     * @private @field
     * An object that contains references to the following active entities:
     *      - Active Account
     *      - Active Employer
     *      - Active Employee
     * @type {object}
     */
    #ezActive = {
        ezAccount: null,
        ezEmployer: null,
        ezEmployee: null
    };
    /**
     * @public @readonly @property
     * Gets the object that contains references to the following active entities:
     * - Active Account
     * - Active Employer
     * - Active Employee
     */
    get ezActive() {
        return this.#ezActive;
    }

    /**
     * @private @field
     * An object that contains references to the following selected entities:
     *  - Selected Employer
     * @type {object}
     */
    #ezSelected = {
        ezEmployer: null
    };
    /**
     * @public @readonly @property
     * Gets the object that contains references to the following selected entities:
     * - Selected Employer
     * @returns {object}
     */
    get ezSelected() {
        return this.#ezSelected;
    }

    /**
     * @private @field
     * Determines if service errors encountered by the EzClockerContext should report the errors using a UX dialog or not.
     * @type {boolean}
     */
    #ezUxShowServiceErrorDialogs = false;
    /**
     * @public @property @getter
     * @returns {boolean}
     */
    get ezUxShowServiceErrorDialogs() {
        return this.#ezUxShowServiceErrorDialogs;
    }
    /**
     * @public @property @setter
     * @returns {boolean}
     */
    set ezUxShowServiceErrorDialogs(showServiceErrorDialogs) {
        this.#ezUxShowServiceErrorDialogs = showServiceErrorDialogs;
    }

    /**
     * @private @field
     * Stores the active employer's start of day option value
     * @type {number]
     */
    #startOfDay = 0;
    /**
     * @public @property @getter
     * Returns the first day of the week for the active employer or the default of zero if the active employer has not choosen.
     * @returns {number}
     */
    get startOfDay() {
        return this.#startOfDay;
    }
    /**
     * @public @property @setter
     * Sets the first day of the week for the active employer.
     * null = 0 = Sunday
     * 0: Sunday
     * 1: Monday
     * 2: Tuesday
     * 3: Wednesday
     * 4: Thursday
     * 5: Saturday
     * 6: Sunday
     * @param {null|number}
     */
    set startOfDay(aStartOfDay) {
        if (!EzNumber.isNumber(aStartOfDay)) {
            aStartOfDay = 0;
        }

        if (0 > aStartOfDay || 6 < aStartOfDay) {
            throw new EzBadParamException(
                'startOfDay',
                EzClockerContext.ezInstance,
                'startOfDay',
                'A valid number from 0 to 6 is expected.');
        }

        this.#startOfDay = aStartOfDay;
    }

    /**
     * @private @field
     * Indicates if the ezContext's data is ready to use
     * @type {boolean}
     */
    #ezContextDataReady = false;
    /**
     * @public @property @getter
     * Returns if the EzClockerContext's data is ready to use.
     * @returns {boolean}
     */
    get ezContextDataReady() {
        return this.#ezContextDataReady;
    }
    /**
     * @public @property @setter
     * Sets if the EzClockerContext's data is ready to use.
     * @param {boolean}
     */
    set ezContextDataReady(contextDataReady) {
        this.#ezContextDataReady = EzBoolean.isTrue(contextDataReady);
    }

    /**
     * @public @readonly @property
     * Returns an object with user identification properties (if any)
     * @returns {object}
     */
    get ezActiveUserIdentificationInfo() {
        let userContext = ezApi.ezclocker.ezClockerContext.ezGetUserContext();

        if (!EzObject.isValid(userContext)) {
            userContext = {
                userAccount: {
                    username: 'n/a'
                }
            };
        }

        let activeEmployer = !EzObject.isValid(EzClockerContext.ezInstance.activeEmployer)
            ? {
                id: 'n/a'
            }
            : EzClockerContext.ezInstance.activeEmployer;

        let activeAccount = ezApi.ezclocker.ezClockerContext.ezGetActiveAccount();

        let activeUserIdentificationInfo = {
            user: EzString.EMPTY,
            userName: EzString.stringOrDefault(
                userContext.userAccount.username,
                'n/a'),
            accountType: EzString.EMPTY,
            acountId: EzString.empty,
            employerId: activeEmployer.id
        };

        if (!EzObject.isValid(activeAccount)) {
            activeUserIdentificationInfo.user = 'n/a';

            activeUserIdentificationInfo.accountType = 'n/a';

            activeUserIdentificationInfo.acountId = 'n/a';
        } else if (EzBoolean.isTrue(userContext.isEmployer)) {
            activeUserIdentificationInfo.user = activeAccount.employerName;

            activeUserIdentificationInfo.accountType = 'Employer';

            activeUserIdentificationInfo.acountId = activeAccount.id;
        } else if (EzBoolean.isTrue(userContext.isPersonal)) {
            activeUserIdentificationInfo.user = activeAccount.employeeName;

            activeUserIdentificationInfo.accountType = 'Personal';

            activeUserIdentificationInfo.acountId = activeAccount.id;
        } else if (EzBoolean.isTrue(userContext.isPayrollManager)) {
            activeUserIdentificationInfo.user = activeAccount.employeeName;

            activeUserIdentificationInfo.accountType = 'Employee (Payroll Manager)';

            activeUserIdentificationInfo.acountId = activeAccount.id;
        } else if (EzBoolean.isTrue(userContext.isManager)) {
            activeUserIdentificationInfo.user = activeAccount.employeeName;

            activeUserIdentificationInfo.accountType = 'Employee (manager)';

            activeUserIdentificationInfo.acountId = activeAccount.id;
        } else if (EzBoolean.isTrue(userContext.isEmployee)) {
            activeUserIdentificationInfo.user = activeAccount.employeeName;

            activeUserIdentificationInfo.accountType = 'Employee';

            activeUserIdentificationInfo.acountId = activeAccount.id;
        } else if (EzBoolean.isTrue(userContext.isAdmin)) {
            activeUserIdentificationInfo.accountType = 'EzClocker Administrator';

            activeUserIdentificationInfo.acountId = activeAccount.id;

            activeUserIdentificationInfo.user = activeUserIdentificationInfo.accountType;
        } else if (EzBoolean.isTrue(userContext.isSupport)) {
            activeUserIdentificationInfo.accountType = 'EzClocker Support';

            activeUserIdentificationInfo.acountId = activeAccount.id;

            activeUserIdentificationInfo.user = activeUserIdentificationInfo.accountType;
        } else if (EzBoolean.isTrue(userContext.isDeveloper)) {
            activeUserIdentificationInfo.accountType = 'EzClocker Developer';

            activeUserIdentificationInfo.acountId = activeAccount.id;

            activeUserIdentificationInfo.user = activeAccount.developerName;
        }

        return activeUserIdentificationInfo;
    }

    /**
     * @public @readonly @property
     * Returns the available subscription plans information object
     * @returns {EzAvailableSubscriptionPlansInfo}
     */
    get ezAvailableSubscriptionPlansInfo() {
        return !EzObject.isValid(EzClockerContext.ezInstance.ezSubscriptionContext)
            ? new EzAvailableSubscriptionPlansInfo(
                EzClockerContext.ezDefaultAvailableSubscriptionPlans,
                null,
                "MONTHLY")
            : new EzAvailableSubscriptionPlansInfo(
                EzObject.assignOrDefault(
                    EzClockerContext.ezInstance.ezSubscriptionContext.availableSubscriptionPlans,
                    EzClockerContext.ezDefaultAvailableSubscriptionPlans),
                EzObject.assignOrNull(EzClockerContext.ezInstance.ezSubscriptionContext.activeSubscription),
                EzString.stringOrDefault(
                    EzClockerContext.ezInstance.ezSubscriptionContext.subscriptionPlanMode,
                    "MONTHLY"));
    }

    /**
     * @public @method
     * Perform the initial initialization of the EzClockerContext.
     * Additional initialization happens once the ez-context_initializer is available.
     * @returns {EzClockerContext}
     */
    ezInit() {
        document.addEventListener(
            EzUserContext.ezEventNames.onReady,
            EzClockerContext.ezInstance.ezInitialize);

        document.addEventListener(
            EzClockerContext.ezEventNames.onReady,
            EzClockerContext.ezInstance.ezInitialize);

        ezApi.ezclocker.ezEventEngine.ezRegisterEvent(
            EzClockerContext.ezApiName,
            EzClockerContextEventName.onContextLoading);

        ezApi.ezclocker.ezEventEngine.ezRegisterEvent(
            EzClockerContext.ezApiName,
            EzClockerContextEventName.onContextReady);

        return EzClockerContext.ezInstance;
    }


    /*===============================================================================================================
    | Section: Helper Methods
    ===============================================================================================================*/

    /**
     * @public @method
     * Reads an option stored in the provided options object.
     * @param {object} aAccountOptions
     * @param {string} aDefaultValue
     * @returns {string}
     */
    ezReadOptionFromProvidedOptions(aAccountOptions, aOptionName, aDefaultValue) {
        if (!EzObject.isValid(aAccountOptions)) {
            throw new EzBadParamException(
                'aAccountOptions',
                EzClockerContext.ezInstance,
                EzClockerContext.ezInstance.ezReadOptionFromProvidedOptions);
        }
        if (!EzString.hasLength(aDefaultValue)) {
            throw new EzBadParamException(
                'aDefaultValue',
                EzClockerContext.ezInstance,
                EzClockerContext.ezInstance.ezReadOptionFromProvidedOptions);
        }
        if (!EzString.hasLength(aOptionName)) {
            throw new EzBadParamException(
                'aOptionName',
                EzClockerContext.ezInstance,
                EzClockerContext.ezInstance.ezReadOptionFromProvidedOptions);
        }

        if (!EzObject.hasProperty(aAccountOptions, aOptionName)) {
            aAccountOptions[aOptionName] = aDefaultValue;
        }

        let aOptionValue = aAccountOptions[aOptionName];

        if (!EzString.hasLength(aOptionValue)) {
            aAccountOptions[aOptionName] = aDefaultValue;
            aOptionValue = aDefaultValue;
        }

        return aOptionValue;
    }

    /**
     * @public @method
     * Searches the provided selectedAccountOptions for selected period option
     * ezApi.ezclocker.ezOptionsService.EZOPTION_EMPLOYEE_SELECTED_PERIOD and stores selected period values on
     * the active accoun tcontext.
     * @param {object|null} accountOptions
     * @returns {object}
     * Selected period object as defined below:
     * {
     *      ezPeriodStartMoment: {a moments object}
     *      ezPeriodEndMoment: {a moments object}
     * }
     */
    ezReadSelectedPeriodFromProvidedOptions(ezClockerAccountType, aAccountId, aAccountOptions) {
        if (!EzObject.isValid(ezClockerAccountType)) {
            throw new EzBadParamException(
                'ezClockerAccountType',
                EzClockerContext.ezInstance,
                EzClockerContext.ezInstance.ezReadOptionFromProvidedOptions);
        }
        if (!EzObject.isValid(aAccountOptions)) {
            throw new EzBadParamException(
                'aAccountOptions',
                EzClockerContext.ezInstance,
                EzClockerContext.ezInstance.ezReadOptionFromProvidedOptions);
        }

        let optionKey = ezApi.ezclocker.ezOptionsService.ezGetActiveAccountOptionKeyNameForAccountType(
            ezClockerAccountType,
            EzEmployerOption.EZOPTION_SELECTED_PERIOD);

        optionKey = ezApi.ezclocker.ezOptionsService.ezPrependAccountIdToOptionKey(
            ezClockerAccountType,
            aAccountId,
            optionKey);

        let selectedPeriod = EzJson.fromJson(
            EzClockerContext.ezInstance.ezReadOptionFromProvidedOptions(
                aAccountOptions,
                optionKey,
                ezApi.ezclocker.ezDateTime.ezCreateDefaultSelectedPeriodJson()));

        // Find the correct key name and set ezPeriodStartMoment
        if (EzString.hasLength(selectedPeriod.ezPeriodStartIso)) {
            selectedPeriod.ezPeriodStartMoment = ezApi.ezclocker.ezDateTime.ezFromIsoOrDefault(
                selectedPeriod.ezPeriodStartIso, ezApi.ezclocker.ezDateTime.ezNowWithStartOfDay());
        } else if (EzString.hasLength(selectedPeriod.startDateIso8601)) {
            selectedPeriod.ezPeriodStartMoment = ezApi.ezclocker.ezDateTime.ezFromIsoOrDefault(
                selectedPeriod.startDateIso8601, ezApi.ezclocker.ezDateTime.ezNowWithStartOfDay());
        } else if (EzString.hasLength(selectedPeriod.startPeriod)) {
            selectedPeriod.ezPeriodStartMoment = ezApi.ezclocker.ezDateTime.ezFromIsoOrDefault(
                selectedPeriod.startPeriod, ezApi.ezclocker.ezDateTime.ezNowWithStartOfDay());
        } else if (EzString.hasLength(selectedPeriod.periodStart)) {
            selectedPeriod.ezPeriodStartMoment = ezApi.ezclocker.ezDateTime.ezFromIsoOrDefault(
                selectedPeriod.periodStart, ezApi.ezclocker.ezDateTime.ezNowWithStartOfDay());
        } else {
            selectedPeriod.ezPeriodStartMoment = ezApi.ezclocker.ezDateTime.ezNowWithStartOfDay();
        }

        if (EzString.hasLength(selectedPeriod.ezPeriodEndIso)) {
            selectedPeriod.ezPeriodEndMoment = ezApi.ezclocker.ezDateTime.ezFromIsoOrDefault(
                selectedPeriod.ezPeriodEndIso, ezApi.ezclocker.ezDateTime.ezNowWithStartOfDay());
        } else if (EzString.hasLength(selectedPeriod.endDateIso8601)) {
            selectedPeriod.ezPeriodEndMoment = ezApi.ezclocker.ezDateTime.ezFromIsoOrDefault(
                selectedPeriod.endDateIso8601, ezApi.ezclocker.ezDateTime.ezNowWithStartOfDay());
        } else if (EzString.hasLength(selectedPeriod.endPeriod)) {
            selectedPeriod.ezPeriodEndMoment = ezApi.ezclocker.ezDateTime.ezFromIsoOrDefault(
                selectedPeriod.endPeriod, ezApi.ezclocker.ezDateTime.ezNowWithStartOfDay());
        } else if (EzString.hasLength(selectedPeriod.periodEnd)) {
            selectedPeriod.ezPeriodEndMoment = ezApi.ezclocker.ezDateTime.ezFromIsoOrDefault(
                selectedPeriod.periodEnd, ezApi.ezclocker.ezDateTime.ezNowWithStartOfDay());
        } else {
            selectedPeriod.ezPeriodEndMoment = ezApi.ezclocker.ezDateTime.ezSetMomentEndOfDay(
                ezApi.ezclocker.ezDateTime.ezAddDays(selectedPeriod.ezPeriodStartMoment, 13));
        }

        return selectedPeriod;
    }

    /**
     * @public @method
     * Sorts the provided employeeAccounts by name.
     * @param {array} employeeAccounts
     * @returns {array}
     */
    ezSortEmployeeArrayByName(employeeAccounts) {
        if (!EzArray.isArray(employeeAccounts)) {
            return [];
        }

        return employeeAccounts.sort(
            (employeeA, employeeB) => {
                if (employeeA.employeeName.toLowerCase() === employeeB.employeeName.toLowerCase()) {
                    return 0;
                }

                if (employeeA.employeeName.toLowerCase() < employeeB.employeeName.toLowerCase()) {
                    return -1;
                }

                return 1;
            });
    }

    /**
     * @public @method
     * Indexes employee accounts by id and returns the new object.
     * @param {array} employeeAccounts
     * @returns {object}
     */
    ezIndexEmployeeAccountsById(employeeAccounts) {
        if (!EzArray.arrayHasLength(employeeAccounts)) {
            return {};
        }

        let byId = {};
        for (let eIndex = 0; eIndex < employeeAccounts.length; eIndex++) {
            let aEmployee = employeeAccounts[eIndex];

            aEmployee.employerEmployeeIndex = eIndex;

            byId[aEmployee.id] = aEmployee;
        }

        return byId;
    }

    /**
     * @public @method
     * Creates an object with all timeEntries index by the timeEntry id
        Provided Time Entries:
        [{id: 100, ...}, {id: 101, ...}]
     * Result:
        {
             100: {id: 100, ...},
             101: {id: 101, ...}
        }
     * @param {array} timeEntries
     * @returns {object}
     */
    ezIndexTimeEntriesById(timeEntries) {
        // Sort and re-index the active employee time entries.
        if (!EzArray.arrayHasLength(timeEntries)) {
            return {};
        }

        let timeEntriesById = {};
        for (let x = 0; x < timeEntries.length; x++) {
            let timeEntry = timeEntries[x];
            timeEntry.employeeTimeEntryIndex = x;
            timeEntriesById[timeEntry.id] = timeEntry;
        }

        return timeEntriesById;
    }

    /**
     * @public @method
     * Sorts the array of time entries by clock in, clock out, and then if needed by id.
     * @param {array} timeEntries
     * @returns {array}
     */
    ezSortTimeEntryArray(timeEntries) {
        if (!EzArray.isArray(timeEntries)) {
            return [];
        }

        timeEntries.sort(
            (timeEntryA, timeEntryB) => {
                let aCIn = EzString.hasLength(timeEntryA.clockInIso)
                    ? ezApi.ezclocker.ezDateTime.ezFromIso(timeEntryA.clockInIso)
                    : null;
                let bCIn = EzString.hasLength(timeEntryB.clockInIso)
                    ? ezApi.ezclocker.ezDateTime.ezFromIso(timeEntryB.clockInIso)
                    : null;

                if (null == aCIn) {
                    return null != bCIn
                        ? timeEntryB
                        : timeEntryA;
                }

                if (aCIn.isSame(bCIn)) {
                    let aCOut = EzString.hasLength(timeEntryA.clockOutIso)
                        ? ezApi.ezclocker.ezDateTime.ezFromIso(timeEntryA.clockOutIso)
                        : null;
                    let bCOut = EzString.hasLength(timeEntryB.clockOutIso)
                        ? ezApi.ezclocker.ezDateTime.ezFromIso(timeEntryB.clockOutIso)
                        : null;

                    if (null == aCOut) {
                        return null != bCOut
                            ? timeEntryB
                            : timeEntryA;
                    }

                    if (aCOut.isSame(bCOut)) {
                        if (timeEntryA.id < timeEntryB.id) {
                            return timeEntryA;
                        }
                        return timeEntryB;
                    }

                    if (aCOut.isBefore(aCOut)) {
                        return timeEntryA;
                    }
                    return timeEntryB;
                }

                if (aCIn.isBefore(bCIn)) {
                    return timeEntryA;
                }

                return timeEntryB;
            });

        return timeEntries;
    }

    /**
     * @protected  @method
        Triggers an EzEventEngine registered event
     * @param {string} eventName
     * @param {String|null} message
     * @param {*} data
     */
    ezTriggerEzClockerContextEvent(eventName, message, data) {
        if (!EzString.hasLength(eventName)) {
            throw new EzBadParamException(
                'eventName',
                EzClockerContext.ezInstance,
                EzClockerContext.ezInstance.ezTriggerEzClockerContextEvent);
        }

        ezApi.ezclocker.ezEventEngine.ezTriggerEvent(
            eventName,
            ezApi.ezclocker.ezEventEngine.ezBuildEventData(
                EzClockerContext.ezApiName,
                message,
                data));
    }


    /*===============================================================================================================
    | Section: Initialization
    ===============================================================================================================*/

    /**
     * @protected @method
     * Initializes the EzClockerContext and it's supporting modules.
     */
    ezInitialize() {
        if (!ezApi.ezclocker?.ezUserContext?.ready) {
            // Must wait for the EzUserContext to completly initialize
            return;
        }

        if (EzClockerContext.ezInstance.ezStates.includes(EzInstanceState.CONTEXT_INITIALIZED)) {
            // Already initialized
            return;
        }

        EzClockerContext.ezInstance.ezTriggerEzClockerContextEvent(
            EzClockerContextEventName.onContextLoading,
            'EzClockerContext is loading');

        EzClockerContext.ezInstance.payrollManagerContext = EzClockerContext.ezCreateDefaultPayrollManagerContext();

        EzClockerContext.ezInstance.ezPayrollManagerContextReady = false;

        EzClockerContext.ezInstance.managerContext = EzClockerContext.ezCreateDefaultManagerContext();

        EzClockerContext.ezInstance.ezManagerContextReady = false;

        EzClockerContext.ezInstance.employeeContext = EzClockerContext.ezCreateDefaultEmployeeContext();

        EzClockerContext.ezInstance.ezEmployeeContextReady = false;

        EzClockerContext.ezInstance.personalContext = EzClockerContext.ezCreateDefaultPersonalContext();

        EzClockerContext.ezInstance.ezPersonalContextReady = false;

        EzClockerContext.ezInstance.activeEmployee = EzClockerContext.ezCreateDefaultEmployee();

        EzClockerContext.ezInstance.ezActiveEmployeeReady = false;

        EzClockerContext.ezInstance.ezInitSubscriptionContextModules();

        EzClockerContext.ezInstance.ezInitEmployerContextModules();

        EzClockerContext.ezInstance.ezInitEmployeeContextModules();

        EzClockerContext.ezInstance.ezInitActiveModules();

        EzClockerContext.ezInstance.ezInitUserContextModules();
    }

    /**
     * @public @method
     * Initializes the User Context module of EzClockerContext.
     */
    ezInitUserContextModules() {
        if (!ezApi.ezclocker?.ezUserContext?.ready) {
            throw new EzBadStateException(
                'Expecting a valid and ready ezApi.ezclocker.ezUserContext instance.',
                'However, the ezApi.ezclocker.ezUserContext is currently undefined or null.',
                EzClockerContext.ezInstance,
                EzClockerContext.ezInstance.ezInitUserContextModules);
        }

        ezApi.ezclocker.ezUserContext.ezLoadUserContext(EzClockerContext.ezInstance)
            .then(
                () => {
                    EzInstanceState.ezAddState(
                        EzClockerContext.ezInstance.ezStates,
                        EzInstanceState.DATA_INITIALIZED);

                    EzInstanceState.ezAddState(
                        EzClockerContext.ezInstance.ezStates,
                        EzInstanceState.CONTEXT_INITIALIZED);

                    EzClockerContext.ezInstance.ezContextDataReady = true;

                    EzClockerContext.ezInstance.ezTriggerEzClockerContextEvent(
                        EzClockerContextEventName.onContextReady,
                        'EzClockerContext is Ready',
                        EzClockerContext.ezInstance);
                });
    }

    /**
     * @public @method
     * Initializes the Subscription Context module of EzClockerContext.
     */
    ezInitSubscriptionContextModules() {
        if (EzClockerContext.ezSubscriptionContextModuleAvailable) {
            EzClockerContext.ezInstance.ezInitSubscriptionContextModule();

            if (!EzClockerContext.ezInstance.ezSubscriptionContextModuleReady) {
                throw new EzException(
                    EzString.em`
                        Failed to initialize the Subscription Context in
                        ${EzClockerContext.ezInstance.ezInitSubscriptionContextModules}`);
            }
        }
    }

    /**
     * @public @method
        Initialiszes the Selected Employer and Employer Context modules of EzClockerContext.
     */
    ezInitEmployerContextModules() {
        if (EzClockerContext.ezInstance.ezStates.includes(EzInstanceState.CONTEXT_INITIALIZED)) {
            // Already initialized
            return;
        }

        if (EzClockerContext.ezSelectedEmployerModuleAvailable) {
            EzClockerContext.ezInstance.ezInitSelectedEmployerModule();

            if (!EzClockerContext.ezInstance.ezSelectedEmployerModuleReady) {
                throw new EzException(
                    EzString.em`
                        Failed to initialize the Selected Employer
                        in ${EzClockerContext.ezInstance.ezInitEmployerContextModules}`);
            }
        }

        if (EzClockerContext.ezEmployerContextModuleAvailable) {
            EzClockerContext.ezInstance.ezInitEmployerContextModule();

            if (!EzClockerContext.ezInstance.ezEmployerContextModuleReady) {
                throw new EzException(
                    EzString.em`
                        Failed to initialize the Employer Context
                        in ${EzClockerContext.ezInstance.ezInitEmployerContextModules}`);
            }
        }
    }

    /**
     * @public @method
     * Initializes the Paryoll Manager, Manager, and Employee context modules of EzClockerContext.
     */
    ezInitEmployeeContextModules() {
        if (EzClockerContext.ezInstance.ezStates.includes(EzInstanceState.CONTEXT_INITIALIZED)) {
            // Already initialized
            return;
        }

        if (EzClockerContext.ezPayrollManagerContextModuleAvailable) {
            EzClockerContext.ezInstance.ezInitPayrollManagerContextModule();
            if (!EzClockerContext.ezInstance.ezPayrollManagerContextModuleReady) {
                throw new EzException(
                    EzString.em`
                        Failed to initialize the Payroll Manager Context
                        in ${EzClockerContext.ezInstance.ezInitEmployeeContextModules}`);
            }
        }

        if (EzClockerContext.ezManagerContextModuleAvailable) {
            EzClockerContext.ezInstance.ezInitManagerContextModule();
            if (!EzClockerContext.ezInstance.ezManagerContextModuleReady) {
                throw new EzException(
                    EzString.em`
                        Failed to initialize the Manager Context
                        in ${EzClockerContext.ezInstance.ezInitEmployeeContextModules}`);
            }
        }

        if (EzClockerContext.ezEmployeeContextModuleAvailable) {
            EzClockerContext.ezInstance.ezInitEmployeeContextModule();
            if (!EzClockerContext.ezInstance.ezEmployeeContextModuleReady) {
                throw new EzException(
                    EzString.em`
                        Failed to initialize the Employee Context
                        in ${EzClockerContext.ezInstance.ezInitEmployeeContextModules}`);
            }
        }

        if (EzClockerContext.ezPersonalContextModuleAvailable) {
            EzClockerContext.ezInstance.ezInitPersonalContextModule();
            if (!EzClockerContext.ezInstance.ezPersonalContextModuleReady) {
                throw new EzException(
                    EzString.em`
                        Failed to initialize the Personal Context
                        in ${EzClockerContext.ezInstance.ezInitEmployeeContextModules}`);
            }
        }
    }

    /**
     * @public @method
     * Initializes the Active Employer, Active Employee, and Active Account modules of EzClockerContext.
     */
    ezInitActiveModules() {
        if (EzClockerContext.ezActiveEmployerModuleAvailable) {
            EzClockerContext.ezInstance.ezInitActiveEmployerModule();
            if (!EzClockerContext.ezInstance.ezActiveEmployerModuleReady) {
                throw new EzException(
                    EzString.em`
                        Failed to initialize the Active Employer
                        in ${EzClockerContext.ezInstance.ezInitActiveModules}`);
            }
        }

        if (EzClockerContext.ezActiveEmployeeModuleAvailable) {
            EzClockerContext.ezInstance.ezInitActiveEmployeeModule();
            if (!EzClockerContext.ezInstance.ezActiveEmployeeModuleReady) {
                throw new EzException(
                    EzString.em`
                        Failed to initialize the Active Employee
                        in ${EzClockerContext.ezInstance.ezInitActiveModules}`);
            }
        }

        if (EzClockerContext.ezActiveAccountModuleAvailable) {
            EzClockerContext.ezInstance.ezInitActiveAccountModule();
            if (!EzClockerContext.ezInstance.ezActiveAccountModuleReady) {
                throw new EzException(
                    EzString.em`
                        Failed to initialize the Active Account
                        in ${EzClockerContext.ezInstance.ezInitActiveModules}`);
            }
        }
    }


    /*===============================================================================================================
    | Section: User Context
    ===============================================================================================================*/

    /**
     * @public @readonly @property
     * Gets if the EzUserContext is ready or not
     * @returns {boolean}
     */
    get ezUserContextReady() {
        return EzBoolean.booleanOrFalse(this?.userContext?.ready);
    }

    /**
     * @private @field
     * Stores the EzUserContext entity
     * @type {EzUserContext}
     */
    #ezUserContext;
    /**
     * @public @property @getter
     * Gets the EzUserContext entity
     * @returns {EzUserContext}
     */
    get ezUserContext() {
        if (!this.#ezUserContext) {
            this.#ezUserContext = ezApi.ezclocker?.ezUserContext;
        }

        return this.#ezUserContext;
    }
    /**
     * @public @property @setter
     * Sets the EzUserContext entity
     * @param {EzUserContext} ezUserContext
     */
    set ezUserContext(ezUserContext) {
        this.#ezUserContext = EzObject.assignOrDefault(
            ezUserContext,
            ezApi.ezclocker?.ezUserContext);
    }
    /**
     * @public @property @getter
     * Gets the EzUserContext entity
     * @returns {EzUserContext}
     * @deprecated
     * Migrate to:
     *      ezApi.ezclocker.ezClockerContext.ezUserContext property
     */
    get userContext() {
        if (!this.#ezUserContext) {
            this.#ezUserContext = ezApi.ezclocker?.ezUserContext;
        }

        return this.#ezUserContext;
    }
    /**
     * @public @property @setter
     * Sets the EzUserContext entity
     * @param {EzUserContext} ezUserContext
     * @deprecated
     * Migrate to:
     *      ezApi.ezclocker.ezClockerContext.ezUserContext property
     */
    set userContext(ezUserContext) {
        this.#ezUserContext = EzObject.assignOrDefault(
            ezUserContext,
            ezApi.ezclocker?.ezUserContext);
    }

    /**
     * @public @method
     * Initializes the EzClockerContext User Context module.
     * @deprecated
     * Will remove in a future version. Stop all use as registration of EzUserContext with ezApi will perform
     */
    ezInitUserContextModule() {
        if (!EzObject.isValid(ezApi.ezclocker.ezUserContext)) {
            throw ezApi.ezException(
                EzString.em`
                    EzUserContext.ezInstance is not yet available.
                    Most likely EzUserContext has not registered with ezApi yet.`);
        }
    }

    /**
     * @protected @method
     * Loads the user context for use
     * @returns {Promise.resolve}
     * @deprecated
     * Will remove in the future.
     * Migrate to: EzUserContext.ezInstance.ezLoadUserContext(EzClockerContext.ezInstance);
     */
    ezLoadUserContext() {
        return EzUserContext.ezInstance.ezLoadUserContext(EzClockerContext.ezInstance);
    }

    /**
     * @protected @method
     * Sets the user context
     * @deprecated
     * Will remove this method in the future.
     * Migrate to: EzUserContext.ezInstance.ezSetUserContext(newUserContext, EzClockerContext.ezInstance);
     */
    ezSetUserContext(newUserContext) {
        EzUserContext.ezInstance.ezSetUserContext(newUserContext, EzClockerContext.ezInstance);
    }

    /**
     * @public @method
     * Extends the EzClockerContext class with a method that returns the EzUserContext instance.
     * @returns {EzUserContext}
     */
    ezGetUserContext() {
        return EzUserContext.ezInstance;
    }

    /**
     * @public @method
     * Returns the user context's PRIMARY account type.
     * @returns {string}
     * A valid enum property value from EzPrimaryAccountType
     */
    ezGetUserContextPrimaryAccountType() {
        let userContext = EzClockerContext.ezInstance.ezGetUserContext();

        if (!EzObject.isValid(userContext)) {
            throw new EzException(
                EzString.em`
                    The EzContext.ezInstance.ezGetUserContextAccountType(...) method requires
                    an existing and valid ezApi.ezclocker.ezClockerContext instance and
                    an existing, valid, and ready UserContext instance response from ezApi.ezClocker.ezGetUserContext().
                    However, the EzClockerContext's UserContext instance was null or undefined at the time
                    of the call.`);
        }

        let employerDashboardModeEnabled = EzClockerContext.ezInstance.ezSelectedEmployerAccountExists();

        if (userContext.isEmployer) {
            return EzPrimaryAccountType.EMPLOYER;
        }

        if (userContext.isPersonal) {
            return EzPrimaryAccountType.PERSONAL;
        }

        if (userContext.isManager && employerDashboardModeEnabled) {
            return EzPrimaryAccountType.EMPLOYER;
        }

        if (userContext.isPayrollManager && employerDashboardModeEnabled) {
            return EzPrimaryAccountType.EMPLOYER;
        }

        if (userContext.isEmployee) {
            return EzPrimaryAccountType.EMPLOYEE;
        }
    }

    /**
     * @public @method
     * Determines if the logged in user has the provided role
     * @returns {boolean}
     */
    ezUserHasRole(userRole) {
        if (!EzString.hasLength(userRole)) {
            return false;
        }

        if (!EzObject.isValid(EzClockerContext.ezInstance.ezGetUserContext())) {
            throw new EzException('A user context is required in EzClockerContext.ezUserHasRole()');
        }

        return EzArray.arrayHasLength(EzClockerContext.ezInstance.ezUserContext.userAccountRoles) &&
            -1 !== EzClockerContext.ezInstance.ezUserContext.userAccountRoles.indexOf(userRole);
    }


    /*===============================================================================================================
    | Section: Employer Context
    ===============================================================================================================*/

    /**
     * @static
     * @public @method
     * Creates the default employer options object.
     * @returns {object}
     */
    static ezCreateDefaultEmployerOptions() {
        return {
            EMPLOYER_SELECTED_EMPLOYEE_ID: null,
            PeriodStartDate: ezApi.ezclocker.ezDateTime.ezNow(),
            PeriodEndDate: ezApi.ezclocker.ezDateTime.ezNow().add(13, 'day'),
            EMPLOYER_SELECTED_PERIOD: {
                startDate: ezApi.ezclocker.ezDateTime.ezNow(),
                endDate: ezApi.ezclocker.ezDateTime.ezNow().add(13, 'day')
            },
            EZOPTION_EMPLOYER_SCHEDULE_START_DAY: '0',
            PUSH_NOTIFICATIONS_ENABLED: true,
            USE_24HOURTIME_IN_EXPORT_REPORTS: false,
            USE_DECIMAL_TOTALS_IN_EXPORT_REPORTS: false,
            REQUIRE_LOCATION_FOR_CLOCKINOUT: false,
            EMPLOYER_DASHBOARD_PREFERRED_TIMEZONE: ezApi.ezclocker.ezDateTime.activeTimeZone,
            EMPLOYER_DISABLE_TIME_ENTRY_EDITING: true,
            CALCULATE_OVERTIME_IN_TIME_SHEET_EXPORTS: false,
            CALCULATE_WEEKLY_OVERTIME_AFTER_HOURS: '40',
            CALCULATE_DAILY_OVERTIME: false,
            CALCULATE_DAILY_OVERTIME_AFTER_HOURS: '8',
            CALCULATE_DAILY_DOUBLE_TIME: false,
            CALCULATE_DAILY_DOUBLE_TIME_AFTER_HOURS: '12',
            WORK_DAY_START_TIME: '00:00:00.000',
            WORK_WEEK_START_TIME: '00:00:00.000',
            TOTAL_HOURS_IN_WORK_WEEK: '40',
            TOTAL_HOURS_IN_WORK_DAY: '8',
            MIDNIGHT: '23:59:59',
            RESTRICT_CLOCK_IN_TO_SCHEDULE: false,
            ALLOW_EARLY_CLOCK_AT_MINS_BEFORE_SCHEDULE: false
        };
    }

    /**
     * @static
     * @public @method
     * Returns a not-ready Employer instance.
     * @returns {object}
     */
    static ezCreateDefaultEmployer() {
        let selectedPeriod = ezApi.ezclocker.ezDateTime.ezCreateDefaultSelectedPeriod();

        return {
            ready: false,
            employerIndex: -1,

            employees: [],
            employeesById: {},

            selectedPeriod: selectedPeriod,
            ezPeriodStartMoment: selectedPeriod.ezPeriodStartMoment,
            ezPeriodEndMoment: selectedPeriod.ezPeriodEndMoment,
            options: EzClockerContext.ezCreateDefaultEmployerOptions(),
            ezAvailableJobs: null,
            license: EzClockerContext.ezCreateDefaultEmployerLicense(),

            id: null,
            userId: null,
            subscriptionInfoId: null,

            employerName: null,
            streetAddress: null,
            additionalAddress: null,
            city: null,
            addressState: null,
            address_state: null,
            addressPostalcode: null,
            address_postalcode: null,
            mainContactNumber: null,

            businessType: null,
            note: null,
        };
    }

    /**
     * @static
     * @public @method
     * Returns a not-ready Employer License instance.
     * @returns {object}
     */
    static ezCreateDefaultEmployerLicense() {
        return {
            ready: false,
            employerId: null,
            employeeId: null,
            billingAmount: '0.00',
            currentBillingAmount: '0.00',
            brainTreeResponse: null,
            creditCardExpired: true,
            creditCardImageUrl: null,
            subscriptionProvider: 'NONE',
            planProvider: 'NONE',
            subscriptionPlan: EzClockerContext.ezCreateDefaultSubscriptionPlan(),
            availableEmployeeSlots: 0,
            isFreeAccount: false,
            freePlanActive: false,
            freeTrialDaysLeft: 0,
            freeTrialExpireDateIso8601: ezApi.ezclocker.ezDateTime.ezNowAsIso(),
            planStartDate: ezApi.ezclocker.ezDateTime.ezNowAsIso(),
            planExpireDate: ezApi.ezclocker.ezDateTime.ezNowAsIso(),
            lastBillingDate: ezApi.ezclocker.ezDateTime.ezNowAsIso(),
            nextBillingDate: ezApi.ezclocker.ezDateTime.ezNowAsIso(),
            nextBillingAmount: '0.00',
            mustPayOrDowngrade: false,
            paidPlanActive: false,
            gracePeriod: 0,
            hasPaidPlan: false,
            hasPaymentInformation: false,
            isInViolation: true,
            valid: false,
            validMessage: 'License is not valid.',
            canceled: true,
            featurePackages: [],
            activeDiscounts: []
        };
    }

    /**
     * @protected @method
     * Creates the default employer context
     * @returns {object}
     */
    static ezCreateDefaultEmployerContext() {
        let selectedPeriod = ezApi.ezclocker.ezDateTime.ezCreateDefaultSelectedPeriod();

        return {
            ready: false,
            employerAccounts: [],

            selectedEmployerAccountIndex: -1,

            selectedEmployerAccountEmployeeAccounts: [],
            selectedEmployerAccountIntegrationEmployees: {},

            selectedEmployerAccountOptions: {},

            selectedEmployerAccountLicense: EzClockerContext.ezCreateDefaultEmployerLicense(),

            selectedEmployerAccountAvailableJobs: [],
            selectedEmployerAccountArchivedJobs: [],
            selectedEmployerAccountAvailableJobsById: [],
            selectedEmployerAccountArchivedJobsById: [],

            selectedEmployerAccountArchivedEmployees: [],
            selectedEmployerAccountArchivedEmployeesById: {},
            selectedEmployerAccountArchivedEmployeesByOldEmployeeId: {},

            selectedPeriod: selectedPeriod,
            ezPeriodStartMoment: selectedPeriod.ezPeriodStartMoment,
            ezPeriodEndMoment: selectedPeriod.ezPeriodEndMoment
        };
    }

    /**
     * @public @field
     * Stores if the employer context is ready or not
     * @type {boolean}
     */
    #ezIsEmployerContextReady = false;
    /**
     * @public @property @getter
     * Gets if the employer context is ready to use.
     * @returns {boolean}
     */
    get ezIsEmployerContextReady() {
        return this.#ezIsEmployerContextReady &&
            EzObject.isValid(EzClockerContext.ezInstance.employerContext) &&
            EzBoolean.isTrue(EzClockerContext.ezInstance.employerContext.ready);
    }
    /**
     * @public @property @getter
     * Sets if the employer context is ready to use.
     * @param {boolean} ezIsEmployerContextReady
     */
    set ezIsEmployerContextReady(ezIsEmployerContextReady) {
        this.#ezIsEmployerContextReady = EzBoolean.isTrue(
            EzObject.isValid(EzClockerContext.ezInstance.employerContext) &&
            EzBoolean.isTrue(EzClockerContext.ezInstance.employerContext.ready) &&
            ezIsEmployerContextReady);
    }

    /**
     * @private @field
     * Stores the employer context entity
     * @type {object}
     */
    #employerContext = EzClockerContext.ezCreateDefaultEmployerContext();
    /**
     * @public @property @getter
     * Gets the employer context entity
     * @returns {object}
     */
    get employerContext() {
        return this.#employerContext;
    }
    /**
     * @public @property @setter
     * Sets the employer context entity. If the provided employerContext entity is undefined or null, then the default employer context is created and
        assigned.
     * @param {object} employerContext
     */
    set employerContext(employerContext) {
        this.#employerContext = EzObject.isValid(employerContext)
            ? employerContext
            : EzClockerContext.ezCreateDefaultEmployerContext();
    }

    /**
     * @public @method
     * Returns the employer context instance. Initializing with the default context if not yet available.
     * @returns {Object|null}
     * @deprecated
     * Migrate to using the property EzClockerContext.ezInstance.ezEmployerContext instead.
     */
    ezGetEmployerContext() {
        return EzClockerContext.ezInstance.employerContext;
    }

    /**
     * @protected @method
     * Initializes the employer context module
     */
    ezInitEmployerContextModule() {
        ezApi.ezclocker.ezEventEngine.ezRegisterEvent(
            EzClockerContext.ezApiName,
            EzClockerContextEventName.onEmployerContextReady);

        ezApi.ezclocker.ezEventEngine.ezRegisterEvent(
            EzClockerContext.ezApiName,
            EzClockerContextEventName.onEmployeeContextClosed);

        EzClockerContext.ezInstance.employerContext = EzClockerContext.ezCreateDefaultEmployerContext();

        EzClockerContext.ezInstance.ezIsEmployerContextReady = false;

        EzClockerContext.ezInstance.ezEmployerContextModuleReady = true;
    }

    /**
     * @protected @method
     * Loads the employer context from the current user context.
        The current user context must belong to a Employer account.
     */
    ezLoadEmployerContextFromUserContext(userContext) {
        if (!EzObject.isValid(userContext) || EzBoolean.isFalse(userContext.isEmployer)) {
            EzClockerContext.ezInstance.ezSetEmployerContext(null);

            EzClockerContext.ezInstance.ezSetSelectedEmployer(-1);

            /*
            EzClockerContext.ezInstance.ezSetActiveEmployer triggers one of the following events:
                EzClockerContextEventName.onActiveEmployerReady
                EzClockerContextEventName.onActiveEmployerChanged
            */
            EzClockerContext.ezInstance.ezSetActiveEmployer(null);

            throw new EzException(
                EzString.em`
                    Unable to load the manager employee context from the current user context.
                    Reason: The user context is not a Employer account.`);
        }

        EzClockerContext.ezInstance.ezSetEmployerContext({
            employerAccounts: userContext.userAccountEmployerAccounts,
        });

        if (EzNumber.isNumber(userContext.selectedEmployerAccountIndex) && 0 <= userContext.selectedEmployerAccountIndex) {
            EzClockerContext.ezInstance.ezSetSelectedEmployer(
                userContext.selectedEmployerAccountIndex,
                userContext.selectedEmployerAccountEmployeeAccounts,
                userContext.selectedEmployerAccountOptions,
                userContext.selectedEmployerAccountLicense);
        } else {
            EzClockerContext.ezInstance.ezSetSelectedEmployer(-1);
        }

        /*
            EzClockerContext.ezInstance.ezSetActiveEmployerFromSelectedEmployer() can trigger
            one of the following events (via EzClockerContext.ezInstance.ezSetActiveEmployer):
                1) EzClockerContextEventName.onActiveEmployerReady
                2) EzClockerContextEventName.onActiveEmployerChanged
        */
        EzClockerContext.ezInstance.ezSetActiveEmployerFromSelectedEmployer();
    }

    /**
     * @protected @method
     * Loads the employer context from a the current user context.
        The current user context must belong to a Employee account.
     */
    ezLoadEmployerContextFromManagerUserContext(userContext) {
        if (!EzObject.isValid(userContext) || EzBoolean.isFalse(userContext.isManager)) {
            EzClockerContext.ezInstance.ezSetEmployerContext(null);

            EzClockerContext.ezInstance.ezSetSelectedEmployer(-1);

            /*
            EzClockerContext.ezInstance.ezSetActiveEmployer triggers one of the following events:
                EzClockerContextEventName.onActiveEmployerReady
                EzClockerContextEventName.onActiveEmployerChanged
            */
            EzClockerContext.ezInstance.ezSetActiveEmployer(null);

            throw ezApi.ezException('Unable to load the employer context from an expected manager user context.' +
                'Reason: The user context is not a Manager account.');
        }

        EzClockerContext.ezInstance.ezSetEmployerContext({
            employerAccounts: userContext.userAccountEmployerAccounts
        });

        if (EzNumber.isNumber(userContext.selectedEmployerAccountIndex) && 0 <= userContext.selectedEmployerAccountIndex) {
            EzClockerContext.ezInstance.ezSetSelectedEmployer(
                userContext.selectedEmployerAccountIndex,
                userContext.selectedEmployerAccountEmployeeAccounts,
                userContext.selectedEmployerAccountOptions,
                userContext.selectedEmployerAccountLicense);
        } else {
            EzClockerContext.ezInstance.ezSetSelectedEmployer(-1);
        }

        /*
            EzClockerContext.ezInstance.ezSetActiveEmployerFromSelectedEmployer() can trigger
            one of the following events (via EzClockerContext.ezInstance.ezSetActiveEmployer):
                1) EzClockerContextEventName.onActiveEmployerReady
                2) EzClockerContextEventName.onActiveEmployerChanged
        */
        EzClockerContext.ezInstance.ezSetActiveEmployerFromSelectedEmployer();
    }

    /**
     * @protected @method
     * Loads the employer context from a the current user context.
        The current user context must belong to a Employee account.
     */
    ezLoadEmployerContextFromPayrollManagerUserContext(userContext) {
        if (!EzObject.isValid(userContext) || EzBoolean.isFalse(userContext.isPayrollManager)) {
            EzClockerContext.ezInstance.ezSetEmployerContext(null);

            EzClockerContext.ezInstance.ezSetSelectedEmployer(-1);

            /*
            EzClockerContext.ezInstance.ezSetActiveEmployer triggers one of the following events:
                EzClockerContextEventName.onActiveEmployerReady
                EzClockerContextEventName.onActiveEmployerChanged
            */
            EzClockerContext.ezInstance.ezSetActiveEmployer(null);

            throw ezApi.ezException(
                EzString.em`
                    Unable to load the employer context from an expected manager user context.
                    'Reason: The user context is not a Manager account.`);
        }

        EzClockerContext.ezInstance.ezSetEmployerContext({
            employerAccounts: userContext.userAccountEmployerAccounts
        });

        if (EzNumber.isNumber(userContext.selectedEmployerAccountIndex) && 0 <= userContext.selectedEmployerAccountIndex) {
            EzClockerContext.ezInstance.ezSetSelectedEmployer(
                userContext.selectedEmployerAccountIndex,
                userContext.selectedEmployerAccountEmployeeAccounts,
                userContext.selectedEmployerAccountOptions,
                userContext.selectedEmployerAccountLicense);
        } else {
            EzClockerContext.ezInstance.ezSetSelectedEmployer(-1);
        }

        /*
            EzClockerContext.ezInstance.ezSetActiveEmployerFromSelectedEmployer() can trigger
            one of the following events (via EzClockerContext.ezInstance.ezSetActiveEmployer):
                1) EzClockerContextEventName.onActiveEmployerReady
                2) EzClockerContextEventName.onActiveEmployerChanged
        */
        EzClockerContext.ezInstance.ezSetActiveEmployerFromSelectedEmployer();
    }

    /**
     * @protected @method
     * Loads the employer context from the current user context.
        The current user context must belong to a Employee account.
     */
    ezLoadEmployerContextFromEmployerEmployeeUserContext(userContext) {
        if (!EzObject.isValid(userContext) || EzBoolean.isFalse(userContext.isEmployee)) {
            EzClockerContext.ezInstance.ezSetEmployerContext(null);

            EzClockerContext.ezInstance.ezSetSelectedEmployer(-1);

            /*
            EzClockerContext.ezInstance.ezSetActiveEmployer triggers one of the following events:
                EzClockerContextEventName.onActiveEmployerReady
                EzClockerContextEventName.onActiveEmployerChanged
            */
            EzClockerContext.ezInstance.ezSetActiveEmployer(null);

            throw ezApi.ezException('Unable to load the employer context from an expected employee user context.' +
                'Reason: The user context is not a Employee account.');
        }

        EzClockerContext.ezInstance.employerContext = EzClockerContext.ezCreateDefaultEmployerContext();

        EzClockerContext.ezInstance.ezSetSelectedEmployer(-1);

        /*
            EzClockerContext.ezInstance.ezSetActiveEmployer triggers one of the following events:
                EzClockerContextEventName.onActiveEmployerReady
                EzClockerContextEventName.onActiveEmployerChanged
        */
        EzClockerContext.ezInstance.ezSetActiveEmployer(
            userContext.activeEmployerAccount,
            userContext.activeEmployerAccountOptions,
            userContext.activeEmployerAccountLicense);
    }

    /**
     * @public @method
     * Sets the employer context.
     * @param {Object|null} newEmployerContext
     */
    ezSetEmployerContext(newEmployerContext) {
        if (!EzObject.isValid(newEmployerContext)) {
            if (EzBoolean.isTrue(EzClockerContext.ezInstance.employerContext.ready)) {
                EzClockerContext.ezInstance.employerContext = EzClockerContext.ezCreateDefaultEmployerContext();

                EzClockerContext.ezInstance.ezTriggerEzClockerContextEvent(
                    EzClockerContextEventName.onEmployerContextClosed,
                    'Employer context isclosed.',
                    EzClockerContext.ezInstance.employerContext);
            }

            return;
        }

        EzClockerContext.ezInstance.employerContext = EzClockerContext.ezCreateDefaultEmployerContext();

        EzClockerContext.ezInstance.employerContext.employerAccounts = EzArray.arrayOrEmpty(newEmployerContext.employerAccounts);

        EzClockerContext.ezInstance.employerContext.isEmployer = true;

        EzClockerContext.ezInstance.employerContext.ready = true;

        EzClockerContext.ezInstance.ezTriggerEzClockerContextEvent(
            EzClockerContextEventName.onEmployerContextReady,
            'Employer context is ready.',
            EzClockerContext.ezInstance.employerContext);
    }


    /*===============================================================================================================
    | Section: Payroll Manager Context
    ===============================================================================================================*/
    /**
     * @public @method
     * Returns the default Payroll Manager Context instance.
     * @returns {object}
     */
    static ezCreateDefaultPayrollManagerContext() {
        let selectedPeriod = ezApi.ezclocker.ezDateTime.ezCreateDefaultSelectedPeriod();
        return {
            ready: false,
            payrollManagerAccounts: [],

            selectedPayrollManagerAccountIndex: -1,
            selectedPayrollManagerAccount: null,
            selectedPayrollManagerAccountOptions: EzClockerContext.ezCreateDefaultEmployeeOptions(),

            selectedPeriod: selectedPeriod,
            ezPeriodStartMoment: selectedPeriod.ezPeriodStartMoment,
            ezPeriodEndMoment: selectedPeriod.ezPeriodEndMoment
        };
    }

    /**
     * @public @field
     * @type {boolean}
     */
    ezPayrollManagerContextReady = false;

    /**
     * @public @field
     * @type {object}
     */
    payrollManagerContext = {
        ready: false
    };

    /**
     * @public @method
     * Initializes the EzClockerContext Payroll Manager Context module.
     */
    ezInitPayrollManagerContextModule() {
        ezApi.ezclocker.ezEventEngine.ezRegisterEvent(
            EzClockerContext.ezApiName,
            EzClockerContextEventName.onPayrollManagerContextReady);

        ezApi.ezclocker.ezEventEngine.ezRegisterEvent(
            EzClockerContext.ezApiName,
            EzClockerContextEventName.onPayrollManagerContextChanged);

        EzClockerContext.ezInstance.payrollManagerContext = null;
        EzClockerContext.ezInstance.ezPayollManagerContextReady = false;
        EzClockerContext.ezInstance.ezPayrollManagerContextModuleReady = true;
    }

    /**
     * @public @method
     * Obtains the Payroll Manager account context (if available). Otherwise, returns null.
     * @returns {object|null}
     */
    ezGetPayrollManagerAccountContext() {
        return EzClockerContext.ezInstance.payrollManagerAccountContext;
    }

    /**
     * @public @method
     * Loads the payroll manager (aka employee) context from the current user context.
        The current user context must belong to a Payroll Manager account.
     */
    ezLoadPayrollManagerContextFromUserContext(userContext) {
        if (!EzObject.isValid(userContext) || EzBoolean.isFalse(userContext.isPayrollManager)) {
            EzClockerContext.ezInstance.ezSetEmployeeContext(null);
            EzClockerContext.ezInstance.ezSetSelectedEmployer(-1);
            EzClockerContext.ezInstance.ezSetActiveEmployeeFromSelectedEmployerEmployees(null, null);

            throw ezApi.ezException(
                EzString.em`
                    Unable to load the payroll manager employee context from the current user context
                    due to the following error: The user context is not a Payroll Manager account.`);
        }

        // First must set the employer context (to make sure the selected employer is established if needed)
        EzClockerContext.ezInstance.ezLoadEmployerContextFromPayrollManagerUserContext(userContext);

        EzClockerContext.ezInstance.ezSetPayrollManagerContext({
            payrollManagerAccounts: userContext.userAccountPayrollManagerAccounts,
            selectedPayrollManagerAccountIndex: userContext.selectedPayrollManagerAccountIndex,
            selectedPayrollManagerAccountOptions: userContext.selectedPayrollManagerAccountOptions,
        });

        EzClockerContext.ezInstance.ezTriggerEzClockerContextEvent(
            EzClockerContextEventName.onPayrollManagerContextReady,
            'Payroll Manager context is ready.',
            EzClockerContext.ezInstance.ezGetPayrollManagerAccountContext());
    }

    /**
     * @public @method
     * Sets the payroll manager context from the provided.
     * @param {object} newPayrollManagerContext
     */
    ezSetPayrollManagerContext(newPayrollManagerContext) {
        if (!EzObject.isValid(newPayrollManagerContext)) {
            throw new EzBadParamException(
                'newPayrollManagerContext',
                EzClockerContext.ezInstance.ezTypeName,
                EzClockerContext.ezInstance.ezSetPayrollManagerContext);
        }

        let changed = EzObject.isValid(EzClockerContext.ezInstance.payrollManagerContext) && EzBoolean.isTrue(EzClockerContext.ezInstance.payrollManagerContext.ready);

        EzClockerContext.ezInstance.payrollManagerContext = EzClockerContext.ezCreateDefaultPayrollManagerContext();

        EzClockerContext.ezInstance.isPayrollManager = true;
        EzClockerContext.ezInstance.payrollManagerContext.payrollManagerAccounts = newPayrollManagerContext.payrollManagerAccounts;
        EzClockerContext.ezInstance.payrollManagerContext.selectedPayrollManagerAccountIndex =
            EzNumber.isNumber(newPayrollManagerContext.selectedPayrollManagerAccountIndex)
                ? newPayrollManagerContext.selectedPayrollManagerAccountIndex
                : -1;
        EzClockerContext.ezInstance.payrollManagerContext.selectedPayrollManagerAccountOptions =
            EzObject.isValid(newPayrollManagerContext.selectedPayrollManagerAccountOptions)
                ? newPayrollManagerContext.selectedPayrollManagerAccountOptions
                : {};

        if (0 >= EzClockerContext.ezInstance.payrollManagerContext.selectedPayrollManagerAccountIndex) {
            let optionAccountType = EzObject.isValid(EzClockerContext.ezInstance.ezGetSelectedEmployerAccount())
                ? EzClockerAccountType.PAYROLL_MANAGER_AS_EMPLOYER
                : EzClockerAccountType.PAYROLL_MANAGER;

            let payrollManagerAccount = EzClockerContext.ezInstance.payrollManagerContext.payrollManagerAccounts[
                EzClockerContext.ezInstance.payrollManagerContext.selectedPayrollManagerAccountIndex];

            EzClockerContext.ezInstance.payrollManagerContext.selectedPeriod = EzClockerContext.ezInstance.ezReadSelectedPeriodFromProvidedOptions(
                optionAccountType,
                payrollManagerAccount.id,
                EzClockerContext.ezInstance.payrollManagerContext.selectedPayrollManagerAccountOptions);
            EzClockerContext.ezInstance.payrollManagerContext.ezPeriodStartMoment = EzClockerContext.ezInstance.payrollManagerContext.selectedPeriod.ezPeriodStartMoment;
            EzClockerContext.ezInstance.payrollManagerContext.ezPeriodEndMoment = EzClockerContext.ezInstance.payrollManagerContext.selectedPeriod.ezPeriodEndMoment;
            EzClockerContext.ezInstance.payrollManagerContext.ezSelectedScheduleWeek = ezApi.ezclocker.ezOptionsService.ezOptionValueToMoment(
                EzClockerContext.ezInstance.ezReadActiveAccountOption(
                    ezApi.ezclocker.ezOptionsService.EZOPTION_SELECTED_SCHEDULE_WEEK,
                    ezApi.ezclocker.ezDateTime.ezToIso(ezApi.ezclocker.ezDateTime.ezNowWithStartOfDay())),
                ezApi.ezclocker.ezDateTime.ezNowWithStartOfDay());
        }

        EzClockerContext.ezInstance.ready = true;

        if (changed) {
            EzClockerContext.ezInstance.ezTriggerEzClockerContextEvent(
                EzClockerContextEventName.onPayrollManagerContextChanged,
                'Payroll Manager account context has changed.',
                EzClockerContext.ezInstance.payrollManagerContext);
        } else {
            EzClockerContext.ezInstance.ezTriggerEzClockerContextEvent(
                EzClockerContextEventName.onPayrollManagerContextReady,
                'Payroll Manager account context is ready.',
                EzClockerContext.ezInstance.payrollManagerContext);
        }
    }


    /*===============================================================================================================
    | Section: Manager Context Section
    ===============================================================================================================*/

    /**
     * @public @method
     * Returns the default Manager Context instance.
     * @returns {object}
     */
    static ezCreateDefaultManagerContext() {
        let selectedPeriod = ezApi.ezclocker.ezDateTime.ezCreateDefaultSelectedPeriod();
        return {
            ready: false,
            managerAccounts: [],

            selectedManagerAccountIndex: -1,
            selectedManagerAccount: null,
            selectedManagerAccountOptions: EzClockerContext.ezCreateDefaultEmployeeOptions(),

            selectedPeriod: selectedPeriod,
            ezPeriodStartMoment: selectedPeriod.ezPeriodStartMoment,
            ezPeriodEndMoment: selectedPeriod.ezPeriodEndMoment
        };
    }

    /**
     * @public @field
     * @type {boolean}
     */
    ezManagerContextReady = false;

    /**
     * @public @field
     * @type {object}
     */
    managerContext = {
        ready: false
    };

    /**
     * @public @method
     * Initializes the EzClockerContext Manager Context module.
     */
    ezInitManagerContextModule() {
        ezApi.ezclocker.ezEventEngine.ezRegisterEvent(
            EzClockerContext.ezApiName,
            EzClockerContextEventName.onManagerContextReady);

        ezApi.ezclocker.ezEventEngine.ezRegisterEvent(
            EzClockerContext.ezApiName,
            EzClockerContextEventName.onManagerContextChanged);

        EzClockerContext.ezInstance.managerContext = null;
        EzClockerContext.ezInstance.ezManagerContextReady = false;
        EzClockerContext.ezInstance.ezManagerContextModuleReady = true;
    }

    /**
     * @public @method
     * Obtains the Manager account context (if available). Otherwise, returns null.
     * @returns {Object|null}
     */
    ezGetManagerAccountContext() {
        return EzClockerContext.ezInstance.managerAccountContext;
    }

    /**
     * @public @method
     * Loads the manager (aka employee) context from the current user context.
        The current user context must belong to a Manager account.
     */
    ezLoadManagerContextFromUserContext(userContext) {
        if (!EzObject.isValid(userContext) || EzBoolean.isFalse(userContext.isManager)) {
            EzClockerContext.ezInstance.ezSetEmployeeContext();
            EzClockerContext.ezInstance.ezSetSelectedEmployer(-1);
            EzClockerContext.ezInstance.ezSetActiveEmployeeFromSelectedEmployerEmployees(null, null);
            throw ezApi.ezException('Unable to load the manager employee context from the current user context.' +
                'Reason: The user context is not a Manager account.');
        }

        // First must set the employer context (to make sure the selected employer is established if needed)
        EzClockerContext.ezInstance.ezLoadEmployerContextFromManagerUserContext(userContext);

        EzClockerContext.ezInstance.ezSetManagerContext({
            managerAccounts: userContext.userAccountManagerAccounts,

            selectedManagerAccountIndex: userContext.selectedManagerAccountIndex,
            selectedManagerAccountOptions: userContext.selectedManagerAccountOptions,
        });
        EzClockerContext.ezInstance.ezTriggerEzClockerContextEvent(
            EzClockerContextEventName.onManagerContextReady,
            'Manager context is ready.',
            EzClockerContext.ezInstance.ezGetManagerAccountContext());
    }

    /**
     * @protected @method
     * Sets the user context.
     * @param {object} newEmployeeContext
     */
    ezSetManagerContext(newManagerContext) {
        if (!EzObject.isValid(newManagerContext)) {
            throw ezApi.ezBadParam('newEmployeeContext', 'EzClockerContext', 'ezSetEmployeeContext');
        }

        let changed = EzObject.isValid(EzClockerContext.ezInstance.managerContext) && EzBoolean.isTrue(EzClockerContext.ezInstance.managerContext.ready);

        EzClockerContext.ezInstance.managerContext = EzClockerContext.ezCreateDefaultManagerContext();

        EzClockerContext.ezInstance.isManager = true;
        EzClockerContext.ezInstance.managerContext.managerAccounts = newManagerContext.managerAccounts;
        EzClockerContext.ezInstance.managerContext.selectedManagerAccountIndex = EzNumber.isNumber(newManagerContext.selectedManagerAccountIndex)
            ? newManagerContext.selectedManagerAccountIndex
            : -1;
        EzClockerContext.ezInstance.managerContext.selectedManagerAccountOptions = EzObject.isValid(newManagerContext.selectedManagerAccountOptions)
            ? newManagerContext.selectedManagerAccountOptions
            : {};

        if (0 >= EzClockerContext.ezInstance.managerContext.selectedManagerAccountIndex) {
            let optionAccountType = EzObject.isValid(EzClockerContext.ezInstance.ezGetSelectedEmployerAccount())
                ? EzClockerAccountType.MANAGER_AS_EMPLOYER
                : EzClockerAccountType.MANAGER;
            let managerAccount = EzClockerContext.ezInstance.managerContext.managerAccounts[EzClockerContext.ezInstance.managerContext.selectedManagerAccountIndex];
            EzClockerContext.ezInstance.managerContext.selectedPeriod = EzClockerContext.ezInstance.ezReadSelectedPeriodFromProvidedOptions(
                optionAccountType,
                managerAccount.id,
                EzClockerContext.ezInstance.managerContext.selectedManagerAccountOptions);
            EzClockerContext.ezInstance.managerContext.ezPeriodStartMoment = EzClockerContext.ezInstance.managerContext.selectedPeriod.ezPeriodStartMoment;
            EzClockerContext.ezInstance.managerContext.ezPeriodEndMoment = EzClockerContext.ezInstance.managerContext.selectedPeriod.ezPeriodEndMoment;

            EzClockerContext.ezInstance.managerContext.ezSelectedScheduleWeek = ezApi.ezclocker.ezOptionsService.ezOptionValueToMoment(
                EzClockerContext.ezInstance.ezReadActiveAccountOption(
                    ezApi.ezclocker.ezOptionsService.EZOPTION_SELECTED_SCHEDULE_WEEK,
                    ezApi.ezclocker.ezDateTime.ezToIso(ezApi.ezclocker.ezDateTime.ezNowWithStartOfDay())),
                ezApi.ezclocker.ezDateTime.ezNowWithStartOfDay());
        }
        EzClockerContext.ezInstance.ready = true;

        if (changed) {
            EzClockerContext.ezInstance.ezTriggerEzClockerContextEvent(
                EzClockerContextEventName.onManagerContextChanged,
                'Manager account context has changed.',
                EzClockerContext.ezInstance.managerContext);
        } else {
            EzClockerContext.ezInstance.ezTriggerEzClockerContextEvent(
                EzClockerContextEventName.onManagerContextReady,
                'Manager account context is ready.',
                EzClockerContext.ezInstance.managerContext);
        }
    }


    /*===============================================================================================================
    | Section: Employee Context Section
    ===============================================================================================================*/

    /**
     * @public @method
     * Returns the default Employee Context instance.
     * @returns {object}
     */
    static ezCreateDefaultEmployeeContext() {
        let selectedPeriod = ezApi.ezclocker.ezDateTime.ezCreateDefaultSelectedPeriod();
        return {
            ready: false,
            employeeAccounts: [],

            selectedEmployeeAccountIndex: -1,
            selectedEmployeeAccount: null,
            selectedEmployeeAccountOptions: EzClockerContext.ezCreateDefaultEmployeeOptions(),

            selectedPeriod: selectedPeriod,
            ezPeriodStartMoment: selectedPeriod.ezPeriodStartMoment,
            ezPeriodEndMoment: selectedPeriod.ezPeriodEndMoment
        };
    }

    /**
     * @public @field
     * @type {boolean}
     */
    ezEmployeeContextReady = false;

    /**
     * @public @field
     * @type {object}
     */
    employeeContext = {
        ready: false
    };

    /**
     * @public @method
     * Initializes the EzClockerContext Employee Context module.
     */
    ezInitEmployeeContextModule() {
        // Employee Context
        ezApi.ezclocker.ezEventEngine.ezRegisterEvent(
            EzClockerContext.ezApiName,
            EzClockerContextEventName.onEmployeeContextReady);

        ezApi.ezclocker.ezEventEngine.ezRegisterEvent(
            EzClockerContext.ezApiName,
            EzClockerContextEventName.onEmployeeContextClosed);

        EzClockerContext.ezInstance.employeeContext = EzClockerContext.ezCreateDefaultEmployeeContext();
        EzClockerContext.ezInstance.ezEmployeeContextReady = false;
        EzClockerContext.ezInstance.ezEmployeeContextModuleReady = EzClockerContext.ezEmployeeContextModuleAvailable;
    }

    /**
     * @protected @method
     * Loads the employee context from the current user context.
        The current user context must belong to a Employee account.
     */
    ezLoadEmployeeContextFromUserContext(userContext) {
        if (!EzObject.isValid(userContext) || EzBoolean.isFalse(userContext.isEmployee)) {
            EzClockerContext.ezInstance.ezSetEmployeeContext();
            EzClockerContext.ezInstance.ezSetActiveEmployeeFromSelectedEmployerEmployees(null, null);

            throw new EzException(
                EzString.em`
                    Unable to load the employee context from the current user context.
                * Reason: The current user context is not a Employee account.`);
        }

        EzClockerContext.ezInstance.ezLoadEmployerContextFromEmployerEmployeeUserContext(userContext);

        let selectedEmployeeAccount = EzArray.arrayHasLength(userContext.userAccountEmployerEmployeeAccounts) &&
            0 <= userContext.selectedEmployerEmployeeAccountIndex &&
            userContext.selectedEmployerEmployeeAccountIndex < userContext.userAccountEmployerEmployeeAccounts.length
            ? userContext.userAccountEmployerEmployeeAccounts[userContext.selectedEmployerEmployeeAccountIndex]
            : null;

        EzClockerContext.ezInstance.ezSetEmployeeContext({
            employeeAccounts: userContext.userAccountEmployerEmployeeAccounts,
            selectedEmployeeAccount: selectedEmployeeAccount,
            selectedEmployeeAccountIndex: userContext.selectedEmployerEmployeeAccountIndex,
            selectedEmployeeEmployerAccountOptions: userContext.selectedEmployerEmployeeAccountOptions,
            selectedEmployeeEmployeeAccountOptions: userContext.selectedEmployeeAccountOptions,
            selectedEmployeePermissions: userContext.employeePermissions
        });

        if (EzObject.isValid(selectedEmployeeAccount) && 0 <= selectedEmployeeAccount.id) {
            EzClockerContext.ezInstance.ezAssignActiveEmployee(selectedEmployeeAccount);

            EzClockerContext.ezInstance.ezSetActiveEmployeeFromSelectedEmployerEmployees(
                EzClockerContext.ezInstance.employeeContext.employeeAccounts[EzClockerContext.ezInstance.employeeContext.selectedEmployeeAccountIndex],
                EzClockerContext.ezInstance.employeeContext.selectedEmployeeAccountOptions);
        }
    }

    /**
     * @protected @method
     * Sets the user context.
     * @param {object} newEmployeeContext
     */
    ezSetEmployeeContext(newEmployeeContext) {
        EzClockerContext.ezInstance.ezCloseEmployeeContext();

        if (!EzObject.isValid(newEmployeeContext)) {
            throw new EzBadParamException(
                'newEmployeeContext',
                EzClockerContext.ezInstance,
                EzClockerContext.ezInstance.ezSetEmployeeContext);
        }

        EzClockerContext.ezInstance.employeeContext.employeeAccounts = EzArray.arrayOrEmpty(newEmployeeContext.employeeAccounts);

        EzClockerContext.ezInstance.employeeContext.selectedEmployeeAccountIndex = EzNumber.isNumber(newEmployeeContext.selectedEmployeeAccountIndex)
            ? newEmployeeContext.selectedEmployeeAccountIndex
            : -1;

        EzClockerContext.ezInstance.employeeContext.selectedEmployeeAccountOptions =
            EzObject.isValid(newEmployeeContext.selectedEmployeeAccountOptions)
                ? newEmployeeContext.selectedEmployeeEmployeeAccountOptions
                : {};

        EzClockerContext.ezInstance.employeeContext.selectedEmployeeEmployerAccountOptions =
            EzObject.isValid(newEmployeeContext.selectedEmployeeEmployerAccountOptions)
                ? newEmployeeContext.selectedEmployeeEmployerAccountOptions
                : {};

        EzClockerContext.ezInstance.employeeContext.selectedEmployeePermissions = EzObject.isValid(newEmployeeContext.selectedEmployeePermissions)
            ? newEmployeeContext.selectedEmployeePermissions
            : {};

        if (0 >= EzClockerContext.ezInstance.employeeContext.selectedEmployeeAccountIndex) {
            EzClockerContext.ezInstance.employeeContext.selectedPeriod = EzClockerContext.ezInstance.ezReadSelectedPeriodFromProvidedOptions(
                EzClockerAccountType.EMPLOYEE,
                EzClockerContext.ezInstance.employeeContext.employeeAccounts[EzClockerContext.ezInstance.employeeContext.selectedEmployeeAccountIndex].id,
                EzClockerContext.ezInstance.employeeContext.selectedEmployeeEmployerAccountOptions);

            EzClockerContext.ezInstance.employeeContext.ezPeriodStartMoment = EzClockerContext.ezInstance.employeeContext.selectedPeriod.ezPeriodStartMoment;

            EzClockerContext.ezInstance.employeeContext.ezPeriodEndMoment = EzClockerContext.ezInstance.employeeContext.selectedPeriod.ezPeriodEndMoment;

            EzClockerContext.ezInstance.employeeContext.ezSelectedScheduleWeek = ezApi.ezclocker.ezDateTime.ezFromIsoOrDefault(
                EzClockerContext.ezInstance.ezReadActiveAccountOption(
                    ezApi.ezclocker.ezOptionsService.EZOPTION_EMPLOYEE_LAST_SELECTED_SCHEDULE_WEEK,
                    ezApi.ezclocker.ezDateTime.ezToIso(ezApi.ezclocker.ezDateTime.ezNowWithStartOfDay())),
                ezApi.ezclocker.ezDateTime.ezNowWithStartOfDay());
        }

        EzClockerContext.ezInstance.isEmployee = true;
        EzClockerContext.ezInstance.employeeContext.ready = true;
        EzClockerContext.ezInstance.ezEmployeeContextReady = true;

        EzClockerContext.ezInstance.ezTriggerEzClockerContextEvent(
            EzClockerContextEventName.onEmployeeContextReady,
            'Employee account context is ready.',
            EzClockerContext.ezInstance.employeeContext);
    }

    /**
     * @public @method
     * Returns the UserPermission for the provided permissionId value (if available)
     * @returns {UserPermission|null}
     */
    ezGetSelectedEmployeePermission(permissionId) {
        let ezUserPermission = null;

        if (!EzObject.isValid(EzClockerContext.ezInstance.employeeContext)) {
            throw new EzException(
                'A valid employee context is required to get the selected employee\'s permission.');
        }

        if (!EzObject.isValid(EzClockerContext.ezInstance.employeeContext.selectedEmployeePermissions)) {
            return ezUserPermission;
        }

        if (!EzObject.hasProperty(
            EzClockerContext.ezInstance.employeeContext.selectedEmployeePermissions,
            permissionId)) {
            return ezUserPermission;
        }

        let userPermission = EzClockerContext.ezInstance.employeeContext.selectedEmployeePermissions[permissionId];
        if (EzObject.isValid(userPermission)) {
            ezUserPermission = new EzUserPermission(
                userPermission.employerId,
                userPermission.employeeId,
                userPermission.permissionId,
                userPermission.permissionValue,
                userPermission.enabled,
                userPermission.childRestrictions,
                userPermission.appliesToRoles);
        }

        return ezUserPermission;
    }

    /**
     * @public @method
     * Obtains the Employee account context (if available). Otherwise, returns null.
     * @returns {Object|null}
     */
    ezGetEmployeeAccountContext() {
        return ezApi.ezclocker[EzClockerContext.ezApiName].employeeAccountContext;
    }

    /**
     * @public @method
        Closes the employee context.
     */
    ezCloseEmployeeContext() {
        EzClockerContext.ezInstance.employeeContext = EzClockerContext.ezCreateDefaultEmployeeContext();
        EzClockerContext.ezInstance.ezEmployeeContextReady = false;

        EzClockerContext.ezInstance.ezTriggerEzClockerContextEvent(
            EzClockerContextEventName.onEmployeeContextClosed,
            'Employee account context closed.',
            EzClockerContext.ezInstance.employeeContext);
    }


    /*===============================================================================================================
    | Section: Personal Context Section
    ===============================================================================================================*/

    /**
     * @public @method
     * Returns the default Personal Employee License instance.
     * @returns {object}
     */
    static ezCreateDefaultPersonalEmployeeLicense() {
        return {
            ready: false,
            personalId: null,

            billingAmount: '0.00',
            currentBillingAmount: '0.00',
            brainTreeResponse: null,
            creditCardExpired: true,
            creditCardImageUrl: null,
            subscriptionProvider: 'NONE',
            planProvider: 'NONE',
            subscriptionPlan: null,
            availableEmployeeSlots: 0,
            isFreeAccount: false,
            freePlanActive: false,
            freeTrialDaysLeft: 0,
            freeTrialExpireDateIso8601: ezApi.ezclocker.ezDateTime.ezNowAsIso(),
            planStartDate: ezApi.ezclocker.ezDateTime.ezNowAsIso(),
            planExpireDate: ezApi.ezclocker.ezDateTime.ezNowAsIso(),
            lastBillingDate: ezApi.ezclocker.ezDateTime.ezNowAsIso(),
            nextBillingDate: ezApi.ezclocker.ezDateTime.ezNowAsIso(),
            nextBillingAmount: '0.00',
            mustPayOrDowngrade: false,
            paidPlanActive: false,
            gracePeriod: 0,
            hasPaidPlan: false,
            hasPaymentInformation: false,
            isInViolation: true,
            valid: false,
            validMessage: 'License is not valid.',
            canceled: true,
        };
    }

    /**
     * @public @method
     * Returns the default Personal Context instance.
     * @returns {object}
     */
    static ezCreateDefaultPersonalContext() {
        let selectedPeriod = ezApi.ezclocker.ezDateTime.ezCreateDefaultSelectedPeriod();

        return {
            ready: false,
            personalAccounts: [],

            selectedPersonalAccountIndex: -1,
            selectedPersonalAccount: null,
            selectedPersonalAccountOptions: EzClockerContext.ezCreateDefaultEmployeeOptions(),
            selectedPersonalAccountLicense: EzClockerContext.ezCreateDefaultPersonalEmployeeLicense(),

            selectedPeriod: selectedPeriod,
            ezPeriodStartMoment: selectedPeriod.ezPeriodStartMoment,
            ezPeriodEndMoment: selectedPeriod.ezPeriodEndMoment
        };
    }

    /**
     * @public @field
     * @type {boolean}
     */
    ezPersonalContextReady = false;

    /**
     * @public @field
     * @type {number}
     */
    personalEmployerId = null;

    /**
     * @public @field
     * @type {object}
     */
    personalContext = {
        ready: false
    };

    /**
     * @public @method
     * Initializes the EzClockerContext Personal Context module.
     */
    ezInitPersonalContextModule() {
        ezApi.ezclocker.ezEventEngine.ezRegisterEvent(
            EzClockerContext.ezApiName,
            EzClockerContextEventName.onPersonalContextReady);

        ezApi.ezclocker.ezEventEngine.ezRegisterEvent(
            EzClockerContext.ezApiName,
            EzClockerContextEventName.onPersonalEmployerIdReady);

        EzClockerContext.ezInstance.personalContext = null;

        EzClockerContext.ezInstance.ezPersonalContextReady = false;

        EzClockerContext.ezInstance.ezPersonalContextModuleReady = true;

        EzClockerContext.ezInstance.ezPersonalEmployerIdReady = false;

        EzClockerContext.ezInstance.ezPersonalEmployerId = null;

        EzClockerContext.ezInstance.ezGetPersonalEmployerId().then(ezApi.ezIgnoreResolve);
    }

    /**
     * @public @method
     * Obtains the Personal account context (if available). Otherwise, returns null.
     * @returns {Object|null}
     */
    ezGetPersonalAccountContext() {
        return EzClockerContext.ezInstance.personalAccountContext;
    }

    /**
     * @protected @method
     * Loads the personal (aka employee) context from the current user context.
        The current user context must belong to a Personal account.
     */
    ezLoadPersonalContextFromUserContext(userContext) {
        if (!EzObject.isValid(userContext) || EzBoolean.isFalse(userContext.isPersonal)) {
            EzClockerContext.ezInstance.ezSetEmployeeContext();

            EzClockerContext.ezInstance.ezSetActiveEmployeeFromSelectedEmployerEmployees(null, null);

            throw ezApi.ezException(
                EzString.em`
                    Unable to load the personal employee context from the current user context.
                * Reason: The current user context is not a Personal account.`);
        }

        // No employer context for personal accounts
        EzClockerContext.ezInstance.ezSetEmployerContext(null);

        EzClockerContext.ezInstance.ezSetPersonalContext({
            personalAccounts: userContext.userAccountManagerAccounts,
            selectedPersonalAccountIndex: userContext.selectedManagerAccountIndex,
            selectedPersonalOptions: userContext.selectedPersonalAccountOptions,
            selectedPersonalAccountLicense: userContext.selectedPersonalAccountLicense,
        });

        EzClockerContext.ezInstance.ezSetActiveEmployeeFromSelectedEmployerEmployees(
            userContext.activeEmployeeAccount,
            userContext.activeEmployeeAccountOptions);
    }

    /**
     * @protected @method
     * Sets the Personal account context
     * @param {object} newPersonalContext
     */
    ezSetPersonalContext(newPersonalContext) {
        if (!EzObject.isValid(newPersonalContext)) {
            throw new EzBadParamException(
                'newEmployeeContext',
                EzClockerContext.ezInstance,
                EzClockerContext.ezInstance.ezSetEmployeeContext);
        }

        EzClockerContext.ezInstance.personalContext = EzClockerContext.ezCreateDefaultPersonalContext();

        EzClockerContext.ezInstance.personalContext.personalAccounts = newPersonalContext.personalAccounts;

        EzClockerContext.ezInstance.personalContext.selectedEmployeeAccountIndex =
            EzNumber.isNumber(newPersonalContext.selectedPersonalAccountIndex)
                ? newPersonalContext.selectedPersonalAccountIndex
                : -1;
        EzClockerContext.ezInstance.personalContext.selectedEmployeeAccountOptions =
            EzObject.isValid(newPersonalContext.selectedPersonalAccountOptions)
                ? newPersonalContext.selectedPersonalAccountOptions
                : {};

        if (0 <= EzClockerContext.ezInstance.personalContext.selectedEmployeeAccountIndex) {
            let personalAccount = EzClockerContext
                .ezInstance
                .personalContext
                .personalAccounts[EzClockerContext.ezInstance.personalContext.selectedEmployeeAccountIndex];

            if (EzObject.isValid(personalAccount)) {
                EzClockerContext
                    .ezInstance
                    .personalContext
                    .selectedPeriod = EzClockerContext.ezInstance.ezReadSelectedPeriodFromProvidedOptions(
                        EzClockerAccountType.PERSONAL,
                        personalAccount.id,
                        EzClockerContext.ezInstance.personalContext.selectedEmployeeAccountOptions);

                EzClockerContext.ezInstance.personalContext.ezPeriodStartMoment =
                    EzClockerContext.ezInstance.personalContext.selectedPeriod.ezPeriodStartMoment;

                EzClockerContext.ezInstance.personalContext.ezPeriodEndMoment =
                    EzClockerContext.ezInstance.personalContext.selectedPeriod.ezPeriodEndMoment;
            }

            EzClockerContext.ezInstance.personalContext.ezSelectedScheduleWeek = ezApi.ezclocker.ezDateTime.ezFromIso(
                EzClockerContext.ezInstance.ezReadActiveAccountOption(
                    ezApi.ezclocker.ezOptionsService.EZOPTION_EMPLOYEE_LAST_SELECTED_SCHEDULE_WEEK,
                    ezApi.ezclocker.ezDateTime.ezNowAsIso()));
        }

        EzClockerContext.ezInstance.isPersonal = true;
        EzClockerContext.ezInstance.ready = true;

        EzClockerContext.ezInstance.ezTriggerEzClockerContextEvent(
            EzClockerContextEventName.onPersonalContextReady,
            'Personal account context is ready.',
            EzClockerContext.ezInstance.personalContext);
    }

    /**
     * @public @method
     * Obtains (and stores) the personal employer id.
     * @returns {Promise.resolve}
     */
    ezGetPersonalEmployerId() {
        if (EzNumber.isNumber(EzClockerContext.ezInstance.personalEmployerId)) {
            return ezApi.ezResolve(EzClockerContext.ezInstance.personalEmployerId);
        }

        return EzPromise.asyncAction(
            (finished) => {
                ezApi.ezclocker.ezHttpHelper.ezGet(
                    ezApi.ezclocker.ezNavigation.ezGetPublicApiUrl('account/peid', 'v1'))
                    .then(
                        ezApi.ezclocker.ezHttpHelper.ezProcessApiResolve,
                        ezApi.ezclocker.ezHttpHelper.ezProcessApiReject)
                    .then(
                        (response) => {
                            EzClockerContext.ezInstance.personalEmployerId = response.personalEmployerId;
                            EzClockerContext.ezInstance.ezPersonalEmployerIdReady = true;

                            EzClockerContext.ezInstance.ezTriggerEzClockerContextEvent(
                                EzClockerContextEventName.onPersonalEmployerIdReady,
                                'Personal employer id is ready.',
                                EzClockerContext.ezInstance.personalEmployerId);

                            return finished(EzClockerContext.ezInstance.personalEmployerId);
                        },
                        () => {
                            EzClockerContext.ezInstance.personalEmployerId = null;
                            EzClockerContext.ezInstance.ezPersonalEmployerIdReady = true;

                            EzClockerContext.ezInstance.ezTriggerEzClockerContextEvent(
                                EzClockerContextEventName.onPersonalEmployerIdReady,
                                'Personal employer id is null.',
                                EzClockerContext.ezInstance.personalEmployerId);

                            return finished(EzClockerContext.ezInstance.personalEmployerId);
                        });
            });
    }


    /*===============================================================================================================
    | Section: Subscription Context Section
    ===============================================================================================================*/

    /**
     * @static
     * @public @method
     * Returns a temporary 'free' subscription plan instance.
     * @returns {object}
     */
    static ezCreateDefaultSubscriptionPlan() {
        return {
            id: -1,
            name: 'Temporary Free PLan',
            planId: 'free',
            brainTreePlanName: 'free',
            applePlanName: 'com.eznovatech.ezclocker.ezClocker.free',
            andriodPlanName: 'free',
            enabled: false,
            apiAccess: false,
            isFreePlan: true,
            planLevel: 0,
            planIteration: 2,
            maximumEmployees: 1,
            dailyFee: 0,
            monthlyFee: 0,
            yearlyFee: 0,
            appleStoreFee: 0,
            googlePlayStoreFee: 0,
            cashDiscount: 0,
            percentDiscount: 0,
            description: 'Temporary Free Plan',
            bulletPointsJson: EzString.EMPTY,
            detail: EzString.EMPTY,
            features: [],
            internalNotes: EzString.EMPTY,
            adjustedDailyFee: 0,
            adjustedMonthlyFee: 0,
            adjustedYearlyFee: 0
        };
    }

    /**
     * @static
     * @public @method
     * Creates the default billing information context
     * @returns {object}
     */
    static ezCreateDefaultBillingInformation() {
        return {
            ready: false,
            companyName: EzString.EMPTY,
            billingFirstName: EzString.EMPTY,
            billingLastName: EzString.EMPTY,
            billingEmail: EzString.EMPTY,
            billingStreetAddress: EzString.EMPTY,
            additionalAddress: EzString.EMPTY,
            city: EzString.EMPTY,
            billingState: EzString.EMPTY,
            postalCode: EzString.EMPTY,
            country: EzString.EMPTY,
            billingContactNumber: null,
            billingAmount: '0,00',
            lastBillingDate: null,
            nextBillingDate: null,
            startDate: null,
            endDate: null,
            pastDue: false,
            canceled: false,
            braintreeDiscounts: [],
            discountId: null
        };
    }

    /**
     * @static
     * @public @method
     * Creates the default billing address information
     * @returns {object}
     */
    static ezCreateDefaultBillingAddress() {
        return {
            ready: false,
            providerId: EzString.EMPTY,
            companyName: EzString.EMPTY,
            billingContactName: EzString.EMPTY,
            billingFirstName: EzString.EMPTY,
            billingLastName: EzString.EMPTY,
            billingContactPhone: EzString.EMPTY,
            billingContactEmail: EzString.EMPTY,
            billingStreetAddress: EzString.EMPTY,
            billingAdditionalAddress: EzString.EMPTY,
            billingCity: EzString.EMPTY,
            billingState: EzString.EMPTY,
            billingPostalCode: EzString.EMPTY,
            billingCountry: EzString.EMPTY,
            billingEmail: EzString.EMPTY
        };
    }

    /**
     * @static
     * @public @method
     * Creates the default credit card information
     * @returns {object}
     */
    static ezCreateDefaultCreditCardInfo() {
        return {
            ready: false,
            providerToken: EzString.EMPTY,
            cardType: 'NONE',
            cardHolderName: EzString.EMPTY,
            cardNumber: EzString.EMPTY,
            cardExpireDate: EzString.EMPTY,
            cardSpecialNumber: EzString.EMPTY,
            creditCardZipCode: EzString.EMPTY,
            creditCardImageUrl: EzString.EMPTY,
            cardLastFour: EzString.EMPTY
        };
    }

    /**
     * @static
     * @public @method
     * Creates the default customer info object
     * @returns {object}
     */
    static ezCreateDefaultCustomerInfo() {
        return {
            ready: false,
            providerId: EzString.EMPTY,
            companyName: EzString.EMPTY,
            contactFirstName: EzString.EMPTY,
            contactLastName: EzString.EMPTY,
            contactEmail: EzString.EMPTY,
            contactNumber: EzString.EMPTY,
            contactAddress: EzString.EMPTY,
            contactCity: EzString.EMPTY,
            contactState: EzString.EMPTY,
            contactCountry: EzString.EMPTY,
            contactPostalCode: EzString.EMPTY,
        };
    }

    /**
     * @static
     * @public @method
     * Creates the default active subscription (using the free plan values)
     * @returns {object}
     */
    static ezCreateDefaultActiveSubscription() {
        // Returning the default free plan
        return {
            id: 19,
            name: 'free',
            planId: 'ez2018.monthly.ezclocker.free',
            andriodPlanName: 'ez2018.monthly.ezclocker.free',
            applePlanName: 'com.eznovatech.ezclocker.ezClocker.free',
            brainTreePlanName: 'ez2018-monthly-ezclocker-free',
            description: 'Free Plan',
            detail: EzString.EMPTY,
            bulletPointsJson: {
                items: [
                    'Always Free',
                    'One Employee',
                    'Website and mobile access'
                ]
            },
            maximumEmployees: 1,
            features: [],
            enabled: true,
            isFreePlan: true,
            apiAccess: false,
            dailyFee: 0,
            monthlyFee: 0,
            yearlyFee: 0,
            appleStoreFee: 0,
            googlePlayStoreFee: 0,
            cashDiscount: 0,
            percentDiscount: 0,
            planLevel: 6,
            planIteration: 2,
            internalNotes: EzString.EMPTY,
            ready: false
        };
    }

    /**
     * @static
     * @public @method
     * Creates the default available sucription plans
     * @returns {object}
     */
    static get ezDefaultAvailableSubscriptionPlans() {
        return new EzAvailableSubscriptionPlans();
    }

    /**
     * @static
     * @public @method
     * Creates the default Subscription Context
     * @returns {object}
     */
    static ezCreateDefaultSubscriptionContext() {
        return {
            ready: false,
            subscriptionPlanMode: 'MONTHLY',
            availableSubscriptionPlans: EzClockerContext.ezDefaultAvailableSubscriptionPlans,
            activeSubscription: EzClockerContext.ezCreateDefaultActiveSubscription(),
            activeCustomer: EzClockerContext.ezCreateDefaultCustomerInfo(),
            activeCreditCard: EzClockerContext.ezCreateDefaultCreditCardInfo(),
            activeBillingInformation: EzClockerContext.ezCreateDefaultBillingInformation(),
            activeBillingAddress: EzClockerContext.ezCreateDefaultBillingAddress()
        };
    }

    /**
     * @public @field
     * @type {boolean}
     */
    ezSubscriptionContextReady = false;

    /**
     * @public @field
     * Stores the subscription context instance
     * @type {object}
     */
    #ezSubscriptionContext = {
        ready: false
    };
    /**
     * @public @property @getter
     * Gets the subscription context instance
     * @returns {object}
     */
    get ezSubscriptionContext() {
        return this.#ezSubscriptionContext;
    }
    /**
     * @public @property @setter
     * Sets the subscription context instance
     * @param {object} ezSubscriptionContext
     */
    set ezSubscriptionContext(ezSubscriptionContext) {
        this.#ezSubscriptionContext = EzObject.assignOrNull(ezSubscriptionContext);
    }
    /**
     * @public @method
        Legacy getter to obtain the subscription context instance
     * @returns {object}
     * @deprecated
     * Migrate to: EzClockerContext.ezInstance.ezSubscriptionContext (getter/setter property)
     */
    ezGetSubscriptionContext() {
        return EzClockerContext.ezInstance.ezSubscriptionContext;
    }

    /**
     * @public @method
     * Initializes the EzClockerContext's Subscription Context module.
     */
    ezInitSubscriptionContextModule() {
        EzClockerContext.ezInstance.ezSubscriptionContext = EzClockerContext.ezCreateDefaultSubscriptionContext();

        EzClockerContext.ezInstance.ezSubscriptionContextReady = false;

        ezApi.ezclocker.ezEventEngine.ezRegisterEvent(
            EzClockerContext.ezApiName,
            EzClockerContextEventName.onSubscriptionContextLoading);

        ezApi.ezclocker.ezEventEngine.ezRegisterEvent(
            EzClockerContext.ezApiName,
            EzClockerContextEventName.onSubscriptionContextReady);

        // Available Plans
        ezApi.ezclocker.ezEventEngine.ezRegisterEvent(
            EzClockerContext.ezApiName,
            EzClockerContextEventName.onSubscriptionContextAvailablePlansReady);

        ezApi.ezclocker.ezEventEngine.ezRegisterEvent(
            EzClockerContext.ezApiName,
            EzClockerContextEventName.onSubscriptionContextAvailablePlansChanged);

        ezApi.ezclocker.ezEventEngine.ezRegisterEvent(
            EzClockerContext.ezApiName,
            EzClockerContextEventName.onSubscriptionContextAvailablePlansModeChanged);

        // Active Subscription
        ezApi.ezclocker.ezEventEngine.ezRegisterEvent(
            EzClockerContext.ezApiName,
            EzClockerContextEventName.onSubscriptionContextActiveSubscriptionReady);

        ezApi.ezclocker.ezEventEngine.ezRegisterEvent(
            EzClockerContext.ezApiName,
            EzClockerContextEventName.onSubscriptionContextActiveSubscriptionChanged);

        // Billing Information
        ezApi.ezclocker.ezEventEngine.ezRegisterEvent(
            EzClockerContext.ezApiName,
            EzClockerContextEventName.onSubscriptionContextBillingInformationReady);

        ezApi.ezclocker.ezEventEngine.ezRegisterEvent(
            EzClockerContext.ezApiName,
            EzClockerContextEventName.onSubscriptionContextBillingInformationChanged);

        // Billing Address
        ezApi.ezclocker.ezEventEngine.ezRegisterEvent(
            EzClockerContext.ezApiName,
            EzClockerContextEventName.onSubscriptionContextBillingAddressReady);

        ezApi.ezclocker.ezEventEngine.ezRegisterEvent(
            EzClockerContext.ezApiName,
            EzClockerContextEventName.onSubscriptionContextBillingAddressChanged);

        // Active Credit Card
        ezApi.ezclocker.ezEventEngine.ezRegisterEvent(
            EzClockerContext.ezApiName,
            EzClockerContextEventName.onSubscriptionContextActiveCreditCardReady);

        ezApi.ezclocker.ezEventEngine.ezRegisterEvent(
            EzClockerContext.ezApiName,
            EzClockerContextEventName.onSubscriptionContextActiveCreditCardChanged);

        // Customer Info
        ezApi.ezclocker.ezEventEngine.ezRegisterEvent(
            EzClockerContext.ezApiName,
            EzClockerContextEventName.onSubscriptionContextActiveCustomerChanged)

        ezApi.ezclocker.ezEventEngine.ezRegisterEvent(
            EzClockerContext.ezApiName,
            EzClockerContextEventName.onSubscriptionContextActiveCustomerReady);

        EzClockerContext.ezInstance.ezSubscriptionContextModuleReady = true;
    }

    /**
     * @public @method
     * Load the Active Employer's Subscription Context.
     * Can trigger the following events:
     *      1) EzClockerContextEventName.onSubscriptionContextReady
     *
     *      Via EzClockerContext.ezInstance.ezLoadSubscriptionContextAvailableSubscriptionPlans():
     *          -> Via EzClockerContext.ezInstance.ezSetSubscriptionContextAvailableSubscriptionPlans(..):
     *              1) EzClockerContextEventName.onSubscriptionContextAvailablePlansChanged
     *              2) EzClockerContextEventName.onSubscriptionContextAvailablePlansReady
     *
     *          -> Via EzClockerContext.ezInstance.ezSubscriptionContextActiveSubscriptionPlan:
     *              1) EzClockerContextEventName.onSubscriptionContextActiveSubscriptionReady
     *              2) EzClockerContextEventName.onSubscriptionContextActiveSubscriptionChanged
     *
     *          -> Via EzClockerContext.ezInstance.ezSubscriptionContextSubscriptionPlanMode:
     *              1) EzClockerContextEventName.onSubscriptionContextAvailablePlansModeChanged
     * @returns {Promise.resolve}
     */
    ezLoadSubscriptionContext() {
        EzClockerContext.ezInstance.ezTriggerEzClockerContextEvent(
            EzClockerContextEventName.onSubscriptionContextLoading,
            'Subscription context is loading.',
            EzClockerContext.ezInstance.ezSubscriptionContext);

        EzClockerContext.ezInstance.ezSubscriptionContext = EzClockerContext.ezCreateDefaultSubscriptionContext();

        /*
            EzClockerContext.ezInstance.ezLoadSubscriptionContextAvailableSubscriptionPlans() can trogger
            the following events via:
                EzClockerContext.ezInstance.ezSetSubscriptionContextAvailableSubscriptionPlans(..):
                   1) EzClockerContextEventName.onSubscriptionContextAvailablePlansChanged
                   2) EzClockerContextEventName.onSubscriptionContextAvailablePlansReady

               EzClockerContext.ezInstance.ezSubscriptionContextActiveSubscriptionPlan:
                   1) EzClockerContextEventName.onSubscriptionContextActiveSubscriptionReady
                   2) EzClockerContextEventName.onSubscriptionContextActiveSubscriptionChanged

               EzClockerContext.ezInstance.ezSubscriptionContextSubscriptionPlanMode:
                   1) EzClockerContextEventName.onSubscriptionContextAvailablePlansModeChanged
        */
        EzClockerContext.ezInstance.ezLoadSubscriptionContextAvailableSubscriptionPlans()
            /*
                EzClockerContext.ezInstance.ezLoadSubscriptionContextBillingInformation can trigger
                the following events:
                   Via EzClockerContext.ezInstance.ezSetSubscriptionContextBillingInformation(...):
                       1) EzClockerContextEventName.onSubscriptionContextBillingInformationChanged
                       2) EzClockerContextEventName.onSubscriptionContextBillingInformationReady

                   Via EzClockerContext.ezInstance.ezSetSubscriptionContextBillingAddress(...):
                       1) EzClockerContextEventName.onSubscriptionContextBillingAddressChanged
                       2) EzClockerContextEventName.onSubscriptionContextBillingAddressReady

                   Via EzClockerContext.ezInstance.ezSetSubscriptionContextCreditCardInfo(...):
                       1) EzClockerContextEventName.onSubscriptionContextActiveCreditCardChanged
                       2) EzClockerContextEventName.onSubscriptionContextActiveCreditCardReady
            */
            .then(EzClockerContext.ezInstance.ezLoadSubscriptionContextBillingInformation)
            .then(
                () => {
                    EzClockerContext.ezInstance.ezSubscriptionContext.ready = true;

                    EzClockerContext.ezInstance.ezTriggerEzClockerContextEvent(
                        EzClockerContextEventName.onSubscriptionContextReady,
                        'Subscription context is ready.',
                        EzClockerContext.ezInstance.ezSubscriptionContext);
                });
    }

    /**
     * @public @method
     * Retrives the available subscription plans
     * Can trigger the following events:
     *      Via EzClockerContext.ezInstance.ezSetSubscriptionContextAvailableSubscriptionPlans(..):
     *          1) EzClockerContextEventName.onSubscriptionContextAvailablePlansChanged
     *          2) EzClockerContextEventName.onSubscriptionContextAvailablePlansReady
     *
     *      Via EzClockerContext.ezInstance.ezSubscriptionContextActiveSubscriptionPlan:
     *          1) EzClockerContextEventName.onSubscriptionContextActiveSubscriptionReady
     *          2) EzClockerContextEventName.onSubscriptionContextActiveSubscriptionChanged
     *
     *      Via EzClockerContext.ezInstance.ezSubscriptionContextSubscriptionPlanMode:
     *          1) EzClockerContextEventName.onSubscriptionContextAvailablePlansModeChanged
     * @returns {Promise.resolve}
     */
    ezLoadSubscriptionContextAvailableSubscriptionPlans() {
        return EzPromise.asyncAction(
            (finished) => {
                ezApi.ezclocker.ezHttpHelper.ezGet(
                    ezApi.ezclocker.ezNavigation.ezGetInternalApiUrl('subscriptions/employer/plans/available', 'v1'))
                    .then(
                        ezApi.ezclocker.ezHttpHelper.ezProcessApiResolve,
                        ezApi.ezclocker.ezHttpHelper.ezProcessApiReject)
                    .then(
                        (response) => {
                            /*
                                EzClockerContext.ezInstance.ezSetSubscriptionContextAvailableSubscriptionPlans(..) can trigger
                                the following events:
                                    1) EzClockerContextEventName.onSubscriptionContextAvailablePlansChanged
                                    2) EzClockerContextEventName.onSubscriptionContextAvailablePlansReady
                             */
                            EzClockerContext.ezInstance.ezSetSubscriptionContextAvailableSubscriptionPlans(
                                EzArray.arrayOrEmpty(response.monthlyPlans),
                                EzArray.arrayOrEmpty(response.yearlyPlans));

                            /*
                                EzClockerContext.ezInstance.ezSetSubscriptionContextActiveSubscription(...) can trigger
                                the following events:
                                    1) EzClockerContextEventName.onSubscriptionContextActiveSubscriptionReady
                                    2) EzClockerContextEventName.onSubscriptionContextActiveSubscriptionChanged
                            */
                            EzClockerContext.ezInstance.ezSubscriptionContextActiveSubscriptionPlan = response.currentPlan;

                            /*
                                EzClockerContext.ezInstance.ezSubscriptionContextSubscriptionPlanMode can trigger
                                the following events:
                                    1) EzClockerContextEventName.onSubscriptionContextAvailablePlansModeChanged
                             */
                            EzClockerContext.ezInstance.ezSubscriptionContextSubscriptionPlanMode = response.currentPlan.billingFrequency;

                            return finished(response);
                        },
                        (eResponse) => {
                            ezApi.ezclocker.ezLogger.error(
                                EzString.em`
                                    Failed to load the available subscription plans.
                                    Error: ${EzJson.toJson(eResponse)}`);

                            return finished(eResponse);
                        });
            });
    }

    /**
     * @public @method
     * Sets the subscription context's available subscription plans
     * Can trigger the following events:
     *      1) EzClockerContextEventName.onSubscriptionContextAvailablePlansChanged
     *      2) EzClockerContextEventName.onSubscriptionContextAvailablePlansReady
     * @param {array} monthlyPlans
     * @param {array} yearlyPlans
     */
    ezSetSubscriptionContextAvailableSubscriptionPlans(monthlyPlans, yearlyPlans) {
        if (!EzArray.isArray(monthlyPlans)) {
            throw new EzBadParamException(
                'monthlyPlans',
                EzClockerContext.ezInstance,
                EzClockerContext.ezInstance.ezSetSubscriptionContextAvailableSubscriptionPlans);
        }

        if (!EzArray.isArray(yearlyPlans)) {
            throw new EzBadParamException(
                'yearlyPlans',
                EzClockerContext.ezInstance,
                EzClockerContext.ezInstance.ezSetSubscriptionContextAvailableSubscriptionPlans);
        }

        if (!EzObject.isValid(EzClockerContext.ezInstance.ezSubscriptionContext.availableSubscriptionPlans)) {
            EzClockerContext.ezInstance.ezSubscriptionContext.availableSubscriptionPlans = EzClockerContext.ezDefaultAvailableSubscriptionPlans;
        }

        let changed = EzBoolean.isTrue(EzClockerContext.ezInstance.ezSubscriptionContext.availableSubscriptionPlans.ready);

        EzClockerContext.ezInstance.ezSubscriptionContext.availableSubscriptionPlans.monthlyPlans = monthlyPlans;

        EzClockerContext.ezInstance.ezSubscriptionContext.availableSubscriptionPlans.yearlyPlans = yearlyPlans;

        EzClockerContext.ezInstance.ezSubscriptionContext.availableSubscriptionPlans.ready = true;

        if (changed) {
            EzClockerContext.ezInstance.ezTriggerEzClockerContextEvent(
                EzClockerContextEventName.onSubscriptionContextAvailablePlansChanged,
                'Subscription context\'s available subscription plans changed.',
                EzClockerContext.ezInstance.ezAvailableSubscriptionPlansInfo);
        }

        EzClockerContext.ezInstance.ezTriggerEzClockerContextEvent(
            EzClockerContextEventName.onSubscriptionContextAvailablePlansReady,
            'Subscription context\'s available subscription plans ready.',
            EzClockerContext.ezInstance.ezAvailableSubscriptionPlansInfo);
    }

    /**
     * @public @method
     * Returns the available subscription plans.
     * @returns {array}
     */
    ezGetSubscriptionContextAvailableSubscriptionPlans() {
        return EzClockerContext.ezInstance.ezSubscriptionContext.availableSubscriptionPlans;
    }

    /**
     * @public @property @getter
     * Gets the subscription context's subscription plan mode (aka billingFrequency)
     * @returns {string}
     * A valid EzBillingFrequency enum property value
     */
    get ezSubscriptionContextSubscriptionPlanMode() {
        return EzObject.isValid(EzClockerContext.ezInstance.ezSubscriptionContext)
            ? EzString.stringOrDefault(
                EzClockerContext.ezInstance.ezSubscriptionContext.subscriptionPlanMode,
                EzBillingFrequency.MONTHLY)
            : EzBillingFrequency.MONTHLY;
    }
    /**
     * @public @property @getter
     * Sets the subscription context's subscription plan mode (aka billingFrequency)
     * Can trigger the following events:
     *      EzClockerContextEventName.onSubscriptionContextAvailablePlansModeChanged
     * @param {string} ezBillingFrequency
     * A valid EzBillingFrequency enum property value
     */
    set ezSubscriptionContextSubscriptionPlanMode(ezBillingFrequency) {
        if (!EzString.hasLength(ezBillingFrequency)) {
            throw new EzBadParamException(
                'ezBillingFrequency',
                EzClockerContext.ezInstance,
                EzClockerContext.ezInstance.ezSubscriptionContextSubscriptionPlanMode);
        }

        ezBillingFrequency = EzBillingFrequency.ezAsEnum(ezBillingFrequency);

        if (EzBillingFrequency.UNKNOWN === ezBillingFrequency) {
            ezBillingFrequency = EzBillingFrequency.MONTHLY;
        }

        if (ezBillingFrequency !== EzClockerContext.ezInstance.ezSubscriptionContext.billingFrequency) {
            EzClockerContext.ezInstance.ezSubscriptionContext.subscriptionPlanMode = ezBillingFrequency;

            EzClockerContext.ezInstance.ezTriggerEzClockerContextEvent(
                EzClockerContextEventName.onSubscriptionContextAvailablePlansModeChanged,
                'Subscription plan mode changed.',
                {
                    availableSubscriptionPlans: EzClockerContext
                        .ezInstance
                        .ezSubscriptionContext
                        .availableSubscriptionPlans,
                    activeSubscription: EzClockerContext.ezInstance.ezSubscriptionContext.activeSubscription,
                    subscriptionPlanMode: EzClockerContext.ezInstance.ezSubscriptionContextSubscriptionPlanMode
                });
        }
    }
    /**
     * @public @method
     * Sets the subscription context's subscription plan mode (aka billingFrequency)
     * Can trigger the following events:
     *      EzClockerContextEventName.onSubscriptionContextAvailablePlansModeChanged
     * @param {string} subscriptionPlanMode
     * A valid EzBillingFrequency enum property value
     * @deprecated
     * Migrate to using getter setter property:
     *  ezApi.ezclocker.ezClockerContext.ezSubscriptionContextSubscriptionPlanMode
     */
    ezSetSubscriptionContextSubscriptionPlanMode(ezBillingFrequency) {
        if (!EzString.hasLength(ezBillingFrequency)) {
            throw new EzBadParamException(
                'ezBillingFrequency',
                EzClockerContext.ezInstance,
                EzClockerContext.ezInstance.ezSetSubscriptionContextSubscriptionPlanMode);
        }

        EzClockerContext.ezInstance.ezSubscriptionContextSubscriptionPlanMode = ezBillingFrequency;
    }

    /**
     * @private @field
     * Stores the cached reference to the default free subscription plan for employer accounts.
     * @type {object}
     */
    #ezCachedDefaultFreeSubscriptionPlanForEmployerAccounts = null;
    /**
     * @public @property @getter
     * Gets the cached reference to the default free subscription plan for employer accounts.
     * @returns {object}
     */
    get ezCachedDefaultFreeSubscriptionPlanForEmployerAccounts() {
        return this.#ezCachedDefaultFreeSubscriptionPlanForEmployerAccounts;
    }
    /**
     * @public @property @setter
     * Sets the cached reference to the default free subscription plan for employer accounts.
     * @param {object} defaultFreeSubscriptionPlanForEmployerAccounts
     */
    set ezCachedDefaultFreeSubscriptionPlanForEmployerAccounts(defaultFreeSubscriptionPlanForEmployerAccounts) {
        this.#ezCachedDefaultFreeSubscriptionPlanForEmployerAccounts = EzObject.assignOrNull(defaultFreeSubscriptionPlanForEmployerAccounts);
    }

    /**
     * @public @method
     * Returns the default free subscription plan for employer accounts.
     *
     * If ezApi.ezclocker.ezContext.ezCachedDefaultFreeSubscriptionPlanForEmployerAccounts is null then:
     * 1) Obtains the default free subscription plan for employer accounts from the EzClocker api
     * 2) Stores the returned subscription plan in the ezApi.ezclocker.ezContext.ezCachedDefaultFreeSubscriptionPlanForEmployerAccounts
     *
     * @returns {Promise.resolve}
     * Promise.resolve will contain the free subscription plan (if it was available). Otherwise,
     * the resolve will return null.
     */
    ezGetEmployerDefaultFreeSubscriptionPlan() {
        EzPromise.asyncAction(
            (finished) => {
                if (null == this.#ezCachedDefaultFreeSubscriptionPlanForEmployerAccounts) {
                    return finished(this.#ezCachedDefaultFreeSubscriptionPlanForEmployerAccounts);
                }

                return ezApi.ezclocker.ezSubscriptionApiClient.ezGetEmployerDefaultFreeSubscriptionPlan()
                    .then(
                        (response) => {
                            this.#ezCachedDefaultFreeSubscriptionPlanForEmployerAccounts = response.subscriptionPlan;

                            return finished(this.#ezCachedDefaultFreeSubscriptionPlanForEmployerAccounts);
                        },
                        (eResponse) => {
                            ezApi.ezclocker.ezLogger.error(
                                EzString.em`
                                    Failed to obtain the default free subscription plan for employer accounts
                                    due to the following error: ${eResponse.message}.
                                    [Error response: ${EzJson.toJson(eResponse)}]`);

                            return finished(this.#ezCachedDefaultFreeSubscriptionPlanForEmployerAccounts);
                        });
            });
    }

    /**
     * @public @method
     * Loads the billing information for the Active Employer
     * Can trigger the following events:
     *      Via EzClockerContext.ezInstance.ezSetSubscriptionContextBillingInformation(...):
     *          1) EzClockerContextEventName.onSubscriptionContextBillingInformationChanged
     *          2) EzClockerContextEventName.onSubscriptionContextBillingInformationReady
     *
     *      Via EzClockerContext.ezInstance.ezSetSubscriptionContextBillingAddress(...):
     *          1) EzClockerContextEventName.onSubscriptionContextBillingAddressChanged
     *          2) EzClockerContextEventName.onSubscriptionContextBillingAddressReady
     *
     *      Via EzClockerContext.ezInstance.ezSetSubscriptionContextCreditCardInfo(...):
     *          1) EzClockerContextEventName.onSubscriptionContextActiveCreditCardChanged
     *          2) EzClockerContextEventName.onSubscriptionContextActiveCreditCardReady
     * @returns {Promise.resolve}
     */
    ezLoadSubscriptionContextBillingInformation() {
        if (!EzObject.isValid(EzClockerContext.ezInstance.ezGetUserContext())) {
            throw new EzException(
                'A user context is required for EzClockerContext.ezLoadSelectedEmployerBillingInformation');
        }

        if (EzClockerContext.ezInstance.ezGetUserContext().isPersonal) {
            // Loadoing of personal account subscription not supported at this time
            throw new EzException(
                'Loading of the Personal Account\'s billing information is not supported at this time.');
        }

        if (EzClockerContext.ezInstance.ezGetUserContext().isPayrollManager ||
            EzClockerContext.ezInstance.ezGetUserContext().isManager) {
            throw new EzException(
                'Payroll Manager and Manager accounts can not obtain employer billing information.');
        }

        return EzPromise.asyncAction(
            (finished) => {
                return ezApi.ezclocker.ezHttpHelper.ezGet(
                    ezApi.ezclocker.ezNavigation.ezGetInternalApiUrl(
                        EzUrl.build`
                            subscriptions/employer/billing-information
                            ?target-time-zone-id=${ezApi.ezclocker.ezDateTime.activeTimeZone}`,
                        'v1'))
                    .then(
                        ezApi.ezclocker.ezHttpHelper.ezProcessApiResolve,
                        ezApi.ezclocker.ezHttpHelper.ezProcessApiReject)
                    .then(
                        (response) => {
                            /*
                                EzClockerContext.ezInstance.ezSetSubscriptionContextBillingInformation(...) can trigger
                                one of the following events:
                                    1) EzClockerContextEventName.onSubscriptionContextBillingInformationChanged
                                    2) EzClockerContextEventName.onSubscriptionContextBillingInformationReady
                             */
                            EzClockerContext.ezInstance.ezSetSubscriptionContextBillingInformation(
                                response.billingInformation);

                            /*
                                EzClockerContext.ezInstance.ezSetSubscriptionContextBillingAddress(...) can trigger
                                one of the following events:
                                    1) EzClockerContextEventName.onSubscriptionContextBillingAddressChanged
                                    2) EzClockerContextEventName.onSubscriptionContextBillingAddressReady
                            */
                            EzClockerContext.ezInstance.ezSetSubscriptionContextBillingAddress(
                                response.billingInformation);

                            /*
                                EzClockerContext.ezInstance.ezSetSubscriptionContextCreditCardInfo(...) can trigger
                                one of the following events:
                                    1) EzClockerContextEventName.onSubscriptionContextActiveCreditCardChanged
                                    2) EzClockerContextEventName.onSubscriptionContextActiveCreditCardReady
                            */
                            EzClockerContext.ezInstance.ezSetSubscriptionContextCreditCardInfo(
                                response.billingInformation);

                            /*
                                EzClockerContext.ezInstance.ezSetSubscriptionContextCustomerInfo(...) can trigger
                                one of the following events:
                                    1) EzClockerContextEventName.onSubscriptionContextActiveCustomerChanged
                                    2) EzClockerContextEventName.onSubscriptionContextActiveCustomerReady,
                            */
                            EzClockerContext.ezInstance.ezSetSubscriptionContextCustomerInfo(
                                response.billingInformation);

                            return finished(response);
                        },
                        (eResponse) => {
                            let defaultBillingInformation = EzClockerContext.ezCreateDefaultBillingInformation();

                            /*
                                EzClockerContext.ezInstance.ezSetSubscriptionContextBillingInformation(...) can trigger
                                one of the following events:
                                    1) EzClockerContextEventName.onSubscriptionContextBillingInformationChanged
                                    2) EzClockerContextEventName.onSubscriptionContextBillingInformationReady
                             */
                            EzClockerContext.ezInstance.ezSetSubscriptionContextBillingInformation(defaultBillingInformation);

                            /*
                                EzClockerContext.ezInstance.ezSetSubscriptionContextBillingAddress(...) can trigger
                                one of the following events:
                                    1) EzClockerContextEventName.onSubscriptionContextBillingAddressChanged
                                    2) EzClockerContextEventName.onSubscriptionContextBillingAddressReady
                            */
                            EzClockerContext.ezInstance.ezSetSubscriptionContextBillingAddress(defaultBillingInformation);

                            /*
                                EzClockerContext.ezInstance.ezSetSubscriptionContextCreditCardInfo(...) can trigger
                                one of the following events:
                                    1) EzClockerContextEventName.onSubscriptionContextActiveCreditCardChanged
                                    2) EzClockerContextEventName.onSubscriptionContextActiveCreditCardReady
                            */
                            EzClockerContext.ezInstance.ezSetSubscriptionContextCreditCardInfo(defaultBillingInformation);

                            return finished(eResponse);
                        });
            });
    }

    /**
     * @public @method
     * Triggers one of the following events:
     *      1) EzClockerContextEventName.onSubscriptionContextBillingInformationChanged
     *      2) EzClockerContextEventName.onSubscriptionContextBillingInformationReady
     * @param {object|null} billingInformation
     */
    ezSetSubscriptionContextBillingInformation(billingInformation) {
        if (!EzObject.isValid(billingInformation)) {
            throw new EzBadParamException(
                'billingInformation',
                EzClockerContext.ezInstance,
                EzClockerContext.ezInstance.ezSubscriptionContextBillingInformation);
        }

        let changed = EzBoolean.isTrue(EzClockerContext.ezInstance.ezSubscriptionContext.activeBillingInformation.ready);

        EzClockerContext.ezInstance.ezSubscriptionContext.activeBillingInformation = EzClockerContext.ezCreateDefaultBillingInformation();

        EzClockerContext.ezInstance.ezSubscriptionContext.activeBillingInformation.providerId = EzString.stringOrEmpty(
            billingInformation.providerBillingAddressId);

        EzClockerContext.ezInstance.ezSubscriptionContext.activeBillingInformation.companyName = EzString.stringOrEmpty(
            billingInformation.companyName);

        EzClockerContext.ezInstance.ezSubscriptionContext.activeBillingInformation.billingFirstName = EzString.stringOrEmpty(
            billingInformation.billingFirstName);

        EzClockerContext.ezInstance.ezSubscriptionContext.activeBillingInformation.billingLastName = EzString.stringOrEmpty(
            billingInformation.billingLastName);

        EzClockerContext.ezInstance.ezSubscriptionContext.activeBillingInformation.billingContactName = EzString.msg`
            ${EzString.stringOrEmpty(billingInformation.billingFirstName)}&nbsp;
            ${EzString.stringOrEmpty(billingInformation.billingLastName)}`;

        EzClockerContext.ezInstance.ezSubscriptionContext.activeBillingInformation.billingEmail = EzString.stringOrEmpty(
            billingInformation.billingEmail);

        EzClockerContext.ezInstance.ezSubscriptionContext.activeBillingInformation.billingStreetAddress = EzString.stringOrEmpty(
            billingInformation.billingStreetAddress);

        EzClockerContext.ezInstance.ezSubscriptionContext.activeBillingInformation.billingAdditionalAddress = EzString.stringOrEmpty(
            billingInformation.additionalAddress);

        EzClockerContext.ezInstance.ezSubscriptionContext.activeBillingInformation.billingCity = EzString.stringOrEmpty(
            billingInformation.billingCity);

        EzClockerContext.ezInstance.ezSubscriptionContext.activeBillingInformation.billingState = EzString.stringOrEmpty(
            billingInformation.billingState);

        EzClockerContext.ezInstance.ezSubscriptionContext.activeBillingInformation.billingPostalCode = EzString.stringOrEmpty(
            billingInformation.billingPostalCode);

        EzClockerContext.ezInstance.ezSubscriptionContext.activeBillingInformation.billingCountry = EzString.stringOrEmpty(
            billingInformation.country);

        EzClockerContext.ezInstance.ezSubscriptionContext.activeBillingInformation.billingContactNumber = EzString.stringOrEmpty(
            billingInformation.billingContactNumber);

        EzClockerContext.ezInstance.ezSubscriptionContext.activeBillingInformation.lastBillingDate = EzObject.assignOrDefault(
            billingInformation.lastBillingDate, null);

        EzClockerContext.ezInstance.ezSubscriptionContext.activeBillingInformation.nextBillingDate = EzObject.assignOrDefault(
            billingInformation.nextBillingDate, null);

        EzClockerContext.ezInstance.ezSubscriptionContext.activeBillingInformation.startDate = EzObject.assignOrDefault(
            billingInformation.startDate, null);

        EzClockerContext.ezInstance.ezSubscriptionContext.activeBillingInformation.endDate = EzObject.assignOrDefault(
            billingInformation.endDate, null);

        EzClockerContext.ezInstance.ezSubscriptionContext.activeBillingInformation.billingAmount = EzObject.assignOrDefault(
            billingInformation.billingAmount, null);

        EzClockerContext.ezInstance.ezSubscriptionContext.activeBillingInformation.pastDue = EzObject.assignOrDefault(
            billingInformation.pastDue, false);

        EzClockerContext.ezInstance.ezSubscriptionContext.activeBillingInformation.canceled = EzObject.assignOrDefault(
            billingInformation.canceled, false);

        EzClockerContext.ezInstance.ezSubscriptionContext.activeBillingInformation.braintreeDiscounts = EzArray.arrayOrEmpty(
            billingInformation.braintreeDiscounts);

        EzClockerContext.ezInstance.ezSubscriptionContext.activeBillingInformation.discountId = EzString.stringOrEmpty(
            billingInformation.discountId);

        EzClockerContext.ezInstance.ezSubscriptionContext.activeBillingInformation.ready = true;

        if (changed) {
            // Fire updated event instead
            EzClockerContext.ezInstance.ezTriggerEzClockerContextEvent(
                EzClockerContextEventName.onSubscriptionContextBillingInformationChanged,
                'Subscription context\'s billing information changed.',
                EzClockerContext.ezInstance.ezSubscriptionContext.activeBillingInformation);

            return;
        }

        EzClockerContext.ezInstance.ezTriggerEzClockerContextEvent(
            EzClockerContextEventName.onSubscriptionContextBillingInformationReady,
            'Subscription context\'s billing information is ready.',
            EzClockerContext.ezInstance.ezSubscriptionContext.activeBillingInformation);
    }

    /**
     * @public @method
     * Can trigger one of the following events:
     *      1) EzClockerContextEventName.onSubscriptionContextBillingAddressChanged
     *      2) EzClockerContextEventName.onSubscriptionContextBillingAddressReady
     * @param {object|null} billingInformation
     */
    ezSetSubscriptionContextBillingAddress(billingAddress) {
        if (!EzObject.isValid(EzClockerContext.ezInstance.ezSubscriptionContext)) {
            throw new EzException(
                'A subscription context is required for EzClockerContext.ezGetSubscriptionContextCreditCard');
        }

        if (!EzObject.isValid(billingAddress)) {
            throw new EzBadParamException(
                'billingAddress',
                EzClockerContext.ezInstance,
                EzClockerContext.ezInstance.ezSubscriptionContextBillingInformation);
        }

        let changed = EzBoolean.isTrue(EzClockerContext.ezInstance.ezSubscriptionContext.activeBillingAddress.ready);

        EzClockerContext.ezInstance.ezSubscriptionContext.activeBillingAddress = EzClockerContext.ezCreateDefaultBillingAddress();

        EzClockerContext.ezInstance.ezSubscriptionContext.activeBillingAddress.companyName =
            EzObject.assignOrDefault(billingAddress.companyName);

        let billingFirstName = EzObject.assignOrDefault(billingAddress.billingFirstName);

        let billingLastName = EzObject.assignOrDefault(billingAddress.billingLastName);

        EzClockerContext.ezInstance.ezSubscriptionContext.activeBillingAddress.providerId = EzString.stringOrEmpty(billingAddress.providerBillingAddressId);

        EzClockerContext.ezInstance.ezSubscriptionContext.activeBillingAddress.billingContactName =
            `${billingFirstName} ${billingLastName}`;

        EzClockerContext.ezInstance.ezSubscriptionContext.activeBillingAddress.billingFirstName =
            EzString.stringOrEmpty(billingAddress.billingFirstName);

        EzClockerContext.ezInstance.ezSubscriptionContext.activeBillingAddress.billingLastName =
            EzString.stringOrEmpty(billingAddress.billingLastName);

        EzClockerContext.ezInstance.ezSubscriptionContext.activeBillingAddress.billingContactPhone =
            EzString.stringOrEmpty(billingAddress.billingContactNumber);

        EzClockerContext.ezInstance.ezSubscriptionContext.activeBillingAddress.billingContactEmail =
            EzString.stringOrEmpty(billingAddress.billingEmail);

        EzClockerContext.ezInstance.ezSubscriptionContext.activeBillingAddress.billingStreetAddress =
            EzString.stringOrEmpty(billingAddress.billingStreetAddress);

        EzClockerContext.ezInstance.ezSubscriptionContext.activeBillingAddress.billingAdditionalAddress =
            EzString.stringOrEmpty(billingAddress.billingAdditionalAddress);

        EzClockerContext.ezInstance.ezSubscriptionContext.activeBillingAddress.billingCity =
            EzString.stringOrEmpty(billingAddress.billingCity);

        EzClockerContext.ezInstance.ezSubscriptionContext.activeBillingAddress.billingState =
            EzString.stringOrEmpty(billingAddress.billingState);

        EzClockerContext.ezInstance.ezSubscriptionContext.activeBillingAddress.billingPostalCode =
            EzString.stringOrEmpty(billingAddress.billingPostalCode);

        EzClockerContext.ezInstance.ezSubscriptionContext.activeBillingAddress.billingCountry =
            EzString.stringOrEmpty(billingAddress.billingCountry);

        EzClockerContext.ezInstance.ezSubscriptionContext.activeBillingAddress.ready = true;

        if (changed) {
            // Fire updated event instead
            EzClockerContext.ezInstance.ezTriggerEzClockerContextEvent(
                EzClockerContextEventName.onSubscriptionContextBillingAddressChanged,
                'Subscription context\'s billing address changed.',
                EzClockerContext.ezInstance.ezSubscriptionContext.activeBillingAddress);

            return;
        }

        EzClockerContext.ezInstance.ezTriggerEzClockerContextEvent(
            EzClockerContextEventName.onSubscriptionContextBillingAddressReady,
            'Subscription context\'s billing address is ready.',
            EzClockerContext.ezInstance.ezSubscriptionContext.activeBillingAddress);
    }

    /**
     * @public @method
     * Returns the ezSubscriptionContext's activeBillingAddress reference.
     * @returns {object}
     */
    ezGetSubscriptionContextBillingAddress() {
        if (!EzObject.isValid(EzClockerContext.ezInstance.ezSubscriptionContext)) {
            throw new EzException(
                'A subscription context is required for EzClockerContext.ezGetSubscriptionContextBillingAddress');
        }

        return EzClockerContext.ezInstance.ezSubscriptionContext.activeBillingAddress;
    }

    /**
     * @public @method
     * Loads the Active Employer's credit card information
     * @returns {Promise.resolve}
     */
    ezLoadSubscriptionContextCreditCardInfo() {
        if (!EzObject.isValid(EzClockerContext.ezInstance.ezGetUserContext())) {
            throw new EzException(
                EzString.em`
                    A valid user context is required in
                    EzClockerContext.ezInstance.ezLoadSelectedEmployerBillingInformation`);
        }
        if (!EzObject.isValid(EzClockerContext.ezInstance.employerContext())) {
            throw new EzException(
                EzString.em`
                    A valid employer context is required in
                    EzClockerContext.ezInstance.ezLoadSelectedEmployerBillingInformation`);
        }

        if (EzClockerContext.ezInstance.ezGetUserContext().isPersonal) {
            // Loadoing of personal account subscription not supported at this time
            throw new EzException(
                'Loading of the Personal Account\'s billing information is not supported at this time.');

        }
        if (!EzClockerContext.ezInstance.ezGetUserContext().isEmployer) {
            throw new EzException('Only Employer accounts can load credit card information.');
        }

        return EzPromise.asyncAction(
            (finished) => {
                return ezApi.ezclocker.ezHttpHelper.ezGet(
                    ezApi.ezclocker.ezNavigation.ezGetInternalApiUrl('subscriptions/credit-card'))
                    .then(
                        ezApi.ezclocker.ezHttpHelper.ezProcessApiResolve,
                        ezApi.ezclocker.ezHttpHelper.ezProcessApiReject)
                    .then(
                        (response) => {
                            /*
                                EzClockerContext.ezInstance.ezSetSubscriptionContextCreditCardInfo(...) can trigger
                                one of the following events:
                                    1) EzClockerContextEventName.onSubscriptionContextActiveCreditCardChanged
                                    2) EzClockerContextEventName.onSubscriptionContextActiveCreditCardReady
                            */
                            EzClockerContext.ezInstance.ezSetSubscriptionContextCreditCardInfo(
                                response.billingInformation);

                            EzClockerContext.ezInstance.ezSetActiveEmployerBillingInformation(
                                response.billingInformation);

                            return finished(EzClockerContext.ezInstance.ezSubscriptionContext.activeCreditCard);
                        },
                        (eResponse) => {
                            ezApi.ezclocker.ezLogger.error(
                                EzString.em`
                                    Unable to load the subscription context credit card info.
                                    Error: ${EzJson.toJson(eResponse)}`);

                            return finished(eResponse);
                        });
            });
    }

    /**
     * @public @method
     * Sets the subscription context's customer information
     * @param {object} customerInfo
     */
    ezSetSubscriptionContextCustomerInfo(customerInfo) {
        if (!EzObject.isValid(customerInfo)) {
            throw new EzBadParamException(
                'customerInfo',
                EzClockerContext.ezInstance,
                EzClockerContext.ezInstance.ezSetSubscriptionContextCustomerInfo);
        }

        let changed = EzBoolean.isTrue(EzClockerContext.ezInstance.ezSubscriptionContext.activeCustomer.ready);

        EzClockerContext.ezInstance.ezSubscriptionContext.activeCustomer = EzClockerContext.ezCreateDefaultCustomerInfo();

        EzClockerContext.ezInstance.ezSubscriptionContext.activeCustomer.providerId = EzString.stringOrEmpty(customerInfo.providerCustomerId);

        EzClockerContext.ezInstance.ezSubscriptionContext.activeCustomer.companyName = EzString.stringOrEmpty(customerInfo.companyName);

        EzClockerContext.ezInstance.ezSubscriptionContext.activeCustomer.contactFirstName = EzString.stringOrEmpty(customerInfo.billingFirstName);

        EzClockerContext.ezInstance.ezSubscriptionContext.activeCustomer.contactLastName = EzString.stringOrEmpty(customerInfo.billingLastName);

        EzClockerContext.ezInstance.ezSubscriptionContext.activeCustomer.contactEmail = EzString.stringOrEmpty(customerInfo.billingEmail);

        EzClockerContext.ezInstance.ezSubscriptionContext.activeCustomer.contactNumber = EzString.stringOrEmpty(customerInfo.billingContactNumber);

        EzClockerContext.ezInstance.ezSubscriptionContext.activeCustomer.contactAddress = EzString.stringOrEmpty(customerInfo.billingStreetAddress);

        EzClockerContext.ezInstance.ezSubscriptionContext.activeCustomer.contactCity = EzString.stringOrEmpty(customerInfo.billingCity);

        EzClockerContext.ezInstance.ezSubscriptionContext.activeCustomer.contactState = EzString.stringOrEmpty(customerInfo.billingState);

        EzClockerContext.ezInstance.ezSubscriptionContext.activeCustomer.contactCountry = EzString.stringOrEmpty(customerInfo.billingCountry);

        EzClockerContext.ezInstance.ezSubscriptionContext.activeCustomer.contactPostalCode = EzString.stringOrEmpty(customerInfo.billingPostalCode);

        EzClockerContext.ezInstance.ezSubscriptionContext.activeCustomer.ready = true;

        // Fire updated event instead
        EzClockerContext.ezInstance.ezTriggerEzClockerContextEvent(
            changed
                ? EzClockerContextEventName.onSubscriptionContextActiveCustomerChanged
                : EzClockerContextEventName.onSubscriptionContextActiveCustomerReady,
            changed
                ? 'Subscription context\'s customer info changed.'
                : 'Subscription context\'s customer info is ready.',
            EzClockerContext.ezInstance.ezSubscriptionContext.activeCustomer);
    }

    /**
     * @public @method
     * Sets credit card information of the activ eemployer
     * Can trigger one of the following events:
     *      1) EzClockerContextEventName.onSubscriptionContextActiveCreditCardChanged
     *      2) EzClockerContextEventName.onSubscriptionContextActiveCreditCardReady
     * @param {object} creditCardInfo
     */
    ezSetSubscriptionContextCreditCardInfo(creditCardInfo) {
        if (!EzObject.isValid(creditCardInfo)) {
            throw new EzBadParamException(
                'creditCardInfo',
                EzClockerContext.ezInstance,
                EzClockerContext.ezInstance.ezSetSubscriptionContextCreditCardInfo);
        }
        if (!EzClockerContext.ezInstance.ezSubscriptionContext) {
            throw new EzException(
                'A valid suscription context instance is required to set the credit card information.');
        }

        let changed = EzClockerContext.ezInstance.ezSubscriptionContext?.activeCreditCard?.ready;

        EzClockerContext.ezInstance.ezSubscriptionContext.activeCreditCard = EzClockerContext.ezCreateDefaultCreditCardInfo();

        EzClockerContext.ezInstance.ezSubscriptionContext.activeCreditCard.providerToken = EzString.hasLength(creditCardInfo.providerCreditCardId)
            ? creditCardInfo.providerCreditCardId
            : creditCardInfo.providerPaymentMethodId;

        EzClockerContext.ezInstance.ezSubscriptionContext.activeCreditCard.cardType = EzString.stringOrEmpty(creditCardInfo.cardType);

        EzClockerContext.ezInstance.ezSubscriptionContext.activeCreditCard.cardHolderName = EzString.stringOrEmpty(creditCardInfo.cardHolderName);

        EzClockerContext.ezInstance.ezSubscriptionContext.activeCreditCard.cardNumber = EzString.EMPTY;

        EzClockerContext.ezInstance.ezSubscriptionContext.activeCreditCard.cardSpecialNumber = EzString.EMPTY;

        EzClockerContext.ezInstance.ezSubscriptionContext.activeCreditCard.cardExpireDate = EzString.stringOrEmpty(creditCardInfo.cardExpireIsoDate);

        EzClockerContext.ezInstance.ezSubscriptionContext.activeCreditCard.cardExpireIsoDate = EzString.stringOrEmpty(creditCardInfo.cardExpireIsoDate);

        EzClockerContext.ezInstance.ezSubscriptionContext.activeCreditCard.creditCardZipCode = EzString.stringOrEmpty(creditCardInfo.cardZipCode);

        EzClockerContext.ezInstance.ezSubscriptionContext.activeCreditCard.creditCardImageUrl = EzString.stringOrEmpty(creditCardInfo.creditCardImageUrl);

        if (EzString.hasLength(creditCardInfo.cardLastFour)) {
            EzClockerContext.ezInstance.ezSubscriptionContext.activeCreditCard.cardLastFour = creditCardInfo.cardLastFour;
        } else if (4 <= EzClockerContext.ezInstance.ezSubscriptionContext.activeCreditCard.cardNumber.length) {
            EzClockerContext.ezInstance.ezSubscriptionContext.activeCreditCard.cardLastFour = EzClockerContext.ezInstance.ezSubscriptionContext
                .activeCreditCard
                .cardNumber
                .substring(
                    EzClockerContext.ezInstance.ezSubscriptionContext.activeCreditCard.cardNumber.length - 4);
        } else {
            EzClockerContext.ezInstance.ezSubscriptionContext.activeCreditCard.cardLastFour = EzString.EMPTY;
        }

        EzClockerContext.ezInstance.ezSubscriptionContext.activeCreditCard.ready = true;

        if (changed) {
            // Fire updated event instead
            EzClockerContext.ezInstance.ezTriggerEzClockerContextEvent(
                EzClockerContextEventName.onSubscriptionContextActiveCreditCardChanged,
                'Subscription context\'s credit card info changed.',
                EzClockerContext.ezInstance.ezSubscriptionContext.activeCreditCard);

            return;
        }

        EzClockerContext.ezInstance.ezTriggerEzClockerContextEvent(
            EzClockerContextEventName.onSubscriptionContextActiveCreditCardReady,
            'Subscription context\'s credit card info is ready.',
            EzClockerContext.ezInstance.ezSubscriptionContext.activeCreditCard);
    };

    /**
     * @public @method
     * Returns the ezSubscriptionContext's activeCreditCard reference.
     * @returns {object}
     */
    ezGetSubscriptionContextCreditCard() {
        if (!EzObject.isValid(EzClockerContext.ezInstance.ezSubscriptionContext)) {
            throw new EzException(
                'A subscription context is required for EzClockerContext.ezGetSubscriptionContextCreditCard');
        }

        return EzClockerContext.ezInstance.ezSubscriptionContext.activeCreditCard;
    }

    /**
     * @protected @method
     * @returns {object}
     */
    ezGetSubscriptionContextActiveSubscription() {
        if (!EzObject.isValid(EzClockerContext.ezInstance.ezSubscriptionContext)) {
            throw new EzException(
                EzString.em`
                    A valid subscription context is required for
                    EzClockerContext.ezInstance.ezGetSubscriptionContextActiveSubscription()`);
        }

        return EzClockerContext.ezInstance.ezSubscriptionContext.activeSubscription;
    }

    /**
     * @public @method
     * Determines if the Subscription Context has a useable billing address
     * @returns {boolean}
     */
    ezSubscriptionContextHasBillingAddress() {
        return EzObject.isValid(EzClockerContext.ezInstance.ezGetSubscriptionContextBillingAddress()) &&
            EzObject.isValid(EzClockerContext.ezInstance.ezSubscriptionContext.activeBillingAddress) &&
            EzString.hasLength(
                ezApi.trimEmptyStringToNull(
                    EzClockerContext.ezInstance.ezSubscriptionContext.activeBillingAddress.companyName)) ||
            EzString.hasLength(
                ezApi.trimEmptyStringToNull(
                    EzClockerContext.ezInstance.ezSubscriptionContext.activeBillingAddress.billingFirstName)) ||
            EzString.hasLength(
                ezApi.trimEmptyStringToNull(
                    EzClockerContext.ezInstance.ezSubscriptionContext.activeBillingAddress.billingLastName)) ||
            EzString.hasLength(
                ezApi.trimEmptyStringToNull(
                    EzClockerContext.ezInstance.ezSubscriptionContext.activeBillingAddress.billingStreetAddress)) ||
            EzString.hasLength(
                ezApi.trimEmptyStringToNull(
                    EzClockerContext.ezInstance.ezSubscriptionContext.activeBillingAddress.billingAdditionalAddress)) ||
            EzString.hasLength(
                ezApi.trimEmptyStringToNull(
                    EzClockerContext.ezInstance.ezSubscriptionContext.activeBillingAddress.billingCity)) ||
            EzString.hasLength(
                ezApi.trimEmptyStringToNull(
                    EzClockerContext.ezInstance.ezSubscriptionContext.activeBillingAddress.billingState)) ||
            EzString.hasLength(
                ezApi.trimEmptyStringToNull(
                    EzClockerContext.ezInstance.ezSubscriptionContext.activeBillingAddress.billingPostalCode)) ||
            EzString.hasLength(
                ezApi.trimEmptyStringToNull(
                    EzClockerContext.ezInstance.ezSubscriptionContext.activeBillingAddress.billingCountry)) ||
            EzString.hasLength(
                ezApi.trimEmptyStringToNull(
                    EzClockerContext.ezInstance.ezSubscriptionContext.activeBillingAddress.billingContactNumber)) ||
            EzString.hasLength(
                ezApi.trimEmptyStringToNull(
                    EzClockerContext.ezInstance.ezSubscriptionContext.activeBillingAddress.billingEmail));
    }

    /**
     * @public @method
     * Determines if the Subscription Context has any useable credit card info.
     * @returns {boolean}
     */
    ezSubscriptionContextHasCreditCardInfo() {
        return EzObject.isValid(EzClockerContext.ezInstance.ezGetSubscriptionContextCreditCard()) &&
            EzObject.isValid(EzClockerContext.ezInstance.ezSubscriptionContext.activeCreditCard) &&
            EzString.hasLength(EzClockerContext.ezInstance.ezSubscriptionContext.activeCreditCard.cardType) &&
            EzString.hasLength(EzClockerContext.ezInstance.ezSubscriptionContext.activeCreditCard.cardNumber) &&
            EzString.hasLength(
                EzClockerContext.ezInstance.ezSubscriptionContext.activeCreditCard.cardHolderName) &&
            EzString.hasLength(EzClockerContext.ezInstance.ezSubscriptionContext.activeCreditCard.cardExpireDate);
    }

    /**
     * @public @method
     * Refreshes the Active Employer's license information
     * @returns {Promise.resolve}
     * @deprecated
     * Method is a duplicate of ezApi.ezclocker.ezClockerContext.ezRefreshSubscriptionContextActiveSubscription()
     * Migrate to only calling:
     *  ezApi.ezclocker.ezClockerContext.ezRefreshSubscriptionContextActiveSubscription(skipProviderCheck = false)
     */
    ezRefreshSelectedEmployerAccountLicense() {
        return EzClockerContext.ezInstance.ezRefreshSubscriptionContextActiveSubscription();
    }

    /**
     * @public @method
     * Refreshes the Active Employer's license information
     * Could trigger the following events one or more of the following events:
     *      1) ==> EzClockerContext.ezInstance.ezSetActiveEmployerFromSelectedEmployer():
     *          EzClockerContextEventName.onActiveEmployerReady
     *          EzClockerContextEventName.onActiveEmployerChanged
     *
     *      2) ==> EzClockerContext.ezInstance.ezSetSelectedEmployerAccountLicense(response):
     *          1) EzClockerContextEventName.onSelectedEmployerLicenseReady
     *          2) EzClockerContextEventName.onSelectedEmployerLicenseUpdated
     *          3) ==> EzClockerContext.ezInstance.ezSubscriptionContextActiveSubscriptionPlan:
     *              1) EzClockerContextEventName.onSubscriptionContextActiveSubscriptionReady
     *              2) EzClockerContextEventName.onSubscriptionContextActiveSubscriptionChanged
     *
     *      3) ==> EzClockerContext.ezInstance.ezSetSelectedEmployerAccountLicense(...):
     *          EzClockerContextEventName.onSelectedEmployerLicenseReady
     *          EzClockerContextEventName.onSelectedEmployerLicenseUpdated
     * @returns {Promise.resolve}
     * Resolve returns the selected employer's license (if any)
     */
    ezRefreshSubscriptionContextActiveSubscription() {
        if (!EzObject.isValid(EzClockerContext.ezInstance.ezGetUserContext())) {
            throw new EzException(
                EzString.em`
                    A valid user context is required in
                    EzClockerContext.ezInstance.ezRefreshSubscriptionContextActiveSubscription()`);
        }
        if (!EzObject.isValid(EzClockerContext.ezInstance.ezGetSelectedEmployerAccount())) {
            throw new EzException(
                EzString.em`
                    A valid selected employer account is required in
                    EzClockerContext.ezInstance.ezRefreshSubscriptionContextActiveSubscription()`);
        }
        if (EzBoolean.isFalse(EzClockerContext.ezInstance.ezUserContext.isEmployer) &&
            EzBoolean.isFalse(EzClockerContext.ezInstance.ezUserContext.isManager) &&
            EzBoolean.isFalse(EzClockerContext.ezInstance.ezUserContext.isPayrollManager)) {
            throw new EzException(
                EzString.em`
                    Only Employer, Payroll Manager, or Manager accounts can obtain the
                    Employer account's license information.`);
        }

        return EzPromise.asyncAction(
            (finished) => ezApi.ezclocker.ezSubscriptionApiClient.ezGetActiveEmployerLicense()
                .then(
                    (response) => {
                        /*
                            EzClockerContext.ezInstance.ezSetSubscriptionContextBillingInformation(...) can trigger
                            one of the following events:
                                1) EzClockerContextEventName.onSubscriptionContextBillingInformationChanged
                                2) EzClockerContextEventName.onSubscriptionContextBillingInformationReady
                         */
                        EzClockerContext.ezInstance.ezSetSubscriptionContextBillingInformation(
                            response.ezNovaBillingInformation);

                        /*
                            EzClockerContext.ezInstance.ezSetSubscriptionContextBillingAddress(...) can trigger
                            one of the following events:
                                1) EzClockerContextEventName.onSubscriptionContextBillingAddressChanged
                                2) EzClockerContextEventName.onSubscriptionContextBillingAddressReady
                        */
                        EzClockerContext.ezInstance.ezSetSubscriptionContextBillingAddress(
                            response.ezNovaBillingInformation);

                        /*
                            EzClockerContext.ezInstance.ezSetSubscriptionContextCreditCardInfo(...) can trigger
                            one of the following events:
                                1) EzClockerContextEventName.onSubscriptionContextActiveCreditCardChanged
                                2) EzClockerContextEventName.onSubscriptionContextActiveCreditCardReady
                        */
                        EzClockerContext.ezInstance.ezSetSubscriptionContextCreditCardInfo(
                            response.ezNovaBillingInformation);

                        /*
                            EzClockerContext.ezInstance.ezSetSubscriptionContextCustomerInfo(...) can trigger
                            one of the following events:
                                1) EzClockerContextEventName.onSubscriptionContextActiveCustomerChanged
                                2) EzClockerContextEventName.onSubscriptionContextActiveCustomerReady,
                        */
                        EzClockerContext.ezInstance.ezSetSubscriptionContextCustomerInfo(
                            response.ezNovaBillingInformation);

                        /*
                            EzClockerContext.ezInstance.ezSetSelectedEmployerAccountLicense(response) can trigger
                            one of the following events:
                                1) EzClockerContextEventName.onSelectedEmployerLicenseReady
                                2) EzClockerContextEventName.onSelectedEmployerLicenseUpdated
                                3) ==> EzClockerContext.ezInstance.ezSubscriptionContextActiveSubscriptionPlan:
                                    1) EzClockerContextEventName.onSubscriptionContextActiveSubscriptionReady
                                    2) EzClockerContextEventName.onSubscriptionContextActiveSubscriptionChanged
                        */
                        EzClockerContext.ezInstance.ezSetSelectedEmployerAccountLicense(response);

                        return finished(
                            EzClockerContext.ezInstance.ezGetSelectedEmployerAccountLicense());
                    },
                    (eResponse) => {
                        ezApi.ezclocker.ezLogger.error(
                            EzString.em`
                                Failed to refresh the subscription context's active subscription
                                due to the following error: ${eResponse.message}.
                                [Error response: ${EzJson.toJson(eResponse)}]`);

                        return finished(
                            EzClockerContext.ezInstance.ezGetSelectedEmployerAccountLicense());
                    }));
    }

    /*===============================================================================================================
    | Section: Active Account Section
    ===============================================================================================================*/

    /**
     * @public @method
     * Creates the default active account info object.
     * @retuns {object}
     */
    static ezCreateDefaultActiveAccountTypeInfo() {
        return {
            ready: false,
            displayName: 'UNKNOWN',
            contextName: 'UNKNOWN',
            primaryRole: EzString.EMPTY,
            accountType: 'UNKNOWN',
            propName: 'unknown',
            accountArrayName: 'unknown',
            selectedAccountIndexName: 'unknown',
            selectedAccountOptionsName: 'unknown',
            selectedAccountLicenseName: 'unknown',
            isEmployer: false,
            isManager: false,
            isEmployee: false,
            isPersonal: false
        };
    }

    /**
     * @public @method
     * Initializes the EzClockerContext User Context module.
     */
    ezInitActiveAccountModule() {
        ezApi.ezclocker.ezEventEngine.ezRegisterEvent(
            EzClockerContext.ezApiName,
            EzClockerContextEventName.onActiveAccountSelectedPeriodChanged);

        ezApi.ezclocker.ezEventEngine.ezRegisterEvent(
            EzClockerContext.ezApiName,
            EzClockerContextEventName.onActiveAccountReady);

        EzClockerContext.ezInstance.ezActiveAccountTypeInfo = EzClockerContext.ezCreateDefaultActiveAccountTypeInfo();

        EzClockerContext.ezInstance.ezActiveAccountModuleReady = true;
    }

    /**
     * @public @method
     * Returns the active account's context.
     * @returns {object}
     */
    ezGetActiveAccountContext() {
        return EzClockerContext.ezInstance[EzClockerContext.ezInstance.ezGetActiveAccountTypeInfo().contextName];
    }

    /**
     * @public @method
     * Returns the active user account's Employer, Manager, Employee, Employee, or Personal account context.
     * @returns {Object|null}
     */
    ezGetActiveAccount() {
        let aaTypeInfo = EzClockerContext.ezInstance.ezGetActiveAccountTypeInfo();

        let selectedIndex = EzClockerContext.ezInstance[aaTypeInfo.contextName][aaTypeInfo.selectedAccountIndexName];

        if (!EzNumber.isNumber(selectedIndex) || 0 > selectedIndex) {
            ezApi.ezclocker.ezLogger.warn(
                EzClockerContext.EZ_SELECTED_ACCOUNT_INDEX_NOT_SET_ERROR_TEMPLATE
                    .replace(/{account_type}/gi, aaTypeInfo.displayName));

            return null;
        }

        let accounts = EzClockerContext.ezInstance[aaTypeInfo.contextName][aaTypeInfo.accountArrayName];

        if (!EzArray.isArray(accounts) || selectedIndex >= accounts.length) {
            throw new EzException(
                EzClockerContext.EZ_SELECTED_ACCOUNT_INDEX_OUT_OF_RANGE_ERROR_TEMPLATE
                    .replace(/{account_type}/gi, aaTypeInfo.displayName)
                    .repalce(
                        /{selected_account_index}/gi,
                        EzClockerContext.ezInstance[aaTypeInfo.contextName][aaTypeInfo.selectedAccountIndexName]));
        }

        accounts[selectedIndex].ready = true;

        return accounts[selectedIndex];
    }

    /**
     * @public @method
     * Sets the active account's selected period.
     * @param {object} selectedPeriod
     * @returns {Promise.resolve}
     */
    ezSetActiveAccountSelectedPeriod(selectedPeriod) {
        if (!EzObject.isValid(EzClockerContext.ezInstance.ezGetActiveAccountContext())) {
            throw new EzException(
                'An active account is required for call EzClockerContext.ezSetActiveAccountSelectedPeriod');
        }

        if (!EzObject.isValid(selectedPeriod) || !EzObject.isValid(selectedPeriod.ezPeriodStartMoment) ||
            !EzObject.isValid(selectedPeriod.ezPeriodEndMoment)) {
            throw new EzBadParamException(
                'selectedPeriod (ez-context-module-active-account.js)',
                EzClockerContext.ezInstance,
                EzClockerContext.ezInstance.ezSetActiveAccountSelectedPeriod);
        }

        return EzPromise.asyncAction(
            (finished) => {
                let currentSelectedPeriod = EzClockerContext.ezInstance.ezGetActiveAccountSelectedPeriod();

                // Translate to locate time zone
                selectedPeriod.ezPeriodStartIso =
                    ezApi.ezclocker.ezDateTime.ezToIso(selectedPeriod.ezPeriodStartMoment);

                selectedPeriod.startDateIso8601 =
                    ezApi.ezclocker.ezDateTime.ezToIso(selectedPeriod.ezPeriodStartMoment);

                selectedPeriod.startPeriod = ezApi.ezclocker.ezDateTime.ezToIso(selectedPeriod.ezPeriodStartMoment);

                selectedPeriod.periodStart = ezApi.ezclocker.ezDateTime.ezToIso(selectedPeriod.ezPeriodStartMoment);

                selectedPeriod.endDateIso8601 = ezApi.ezclocker.ezDateTime.ezToIso(selectedPeriod.ezPeriodEndMoment);

                selectedPeriod.endPeriod = ezApi.ezclocker.ezDateTime.ezToIso(selectedPeriod.ezPeriodEndMoment);

                selectedPeriod.ezPeriodEndIso = ezApi.ezclocker.ezDateTime.ezToIso(selectedPeriod.ezPeriodEndMoment);

                selectedPeriod.periodEnd = ezApi.ezclocker.ezDateTime.ezToIso(selectedPeriod.ezPeriodEndMoment);

                if (selectedPeriod.ezPeriodStartMoment.isSame(currentSelectedPeriod.ezPeriodStartMoment) &&
                    selectedPeriod.ezPeriodEndMoment.isSame(currentSelectedPeriod.ezPeriodEndMoment)) {
                    // Value is already the same
                    return finished(selectedPeriod);
                }

                let activeAccountContext = EzClockerContext.ezInstance.ezGetActiveAccountContext();

                activeAccountContext.selectedPeriod = selectedPeriod;

                activeAccountContext.ezPeriodStartMoment = selectedPeriod.ezPeriodStartMoment;

                activeAccountContext.ezPeriodEndMoment = selectedPeriod.ezPeriodEndMoment;

                return EzClockerContext.ezInstance.ezSaveActiveAccountSelectedPeriodOptions()
                    .then(
                        (selectedPeriodResponse) => {
                            let response = {
                                selectedPeriod: {
                                    ezPeriodStartMoment: selectedPeriodResponse.ezPeriodStartMoment,
                                    ezPeriodEndMoment: selectedPeriodResponse.ezPeriodEndMoment
                                },
                                ezPeriodStartMoment: selectedPeriodResponse.ezPeriodStartMoment,
                                ezPeriodEndMoment: selectedPeriodResponse.ezPeriodEndMoment
                            };

                            EzClockerContext.ezInstance.ezTriggerEzClockerContextEvent(
                                EzClockerContextEventName.onActiveAccountSelectedPeriodChanged,
                                'Active account\'s selected period changed.',
                                response);

                            return finished(response);
                        });
            });
    }

    /**
     * @public @method
     * Returns the active account's selectedPeriod object.
     * @returns {object}
     */
    ezGetActiveAccountSelectedPeriod() {
        return EzObject.isValid(EzClockerContext.ezInstance.ezGetActiveAccountTypeInfo())
            ? EzClockerContext
                .ezInstance[EzClockerContext.ezInstance.ezGetActiveAccountTypeInfo().contextName]
                .selectedPeriod
            : null;
    }

    /**
     * @public @method
     * Saves the current se lected period moments to the options records
     * @returns {Promise.resolve}
     */
    ezSaveActiveAccountSelectedPeriodOptions() {
        if (!EzObject.isValid(EzClockerContext.ezInstance.ezGetUserContext())) {
            throw new EzException(
                'An valid user context is required for call EzClockerContext.ezSaveActiveAccountSelectedPeriodOptions');
        }
        if (!EzObject.isValid(EzClockerContext.ezInstance.ezGetActiveAccountContext())) {
            throw new EzException(
                'An active account is required for call EzClockerContext.ezSaveActiveAccountSelectedPeriodOptions');
        }

        return ezApi.ezResolver(
            (resolve) => {
                let selectedPeriod = EzClockerContext.ezInstance.ezGetActiveAccountContextSelectedPeriod();

                let selectedPeriodOptionKey = EzClockerContext.ezInstance.ezGetActiveAccountOptionKeyNameForOptionName(
                    ezApi.ezclocker.ezOptionsService.EZOPTION_SELECTED_PERIOD);

                let startIso = ezApi.ezclocker.ezDateTime.ezToIso(selectedPeriod.ezPeriodStartMoment);

                let endIso = ezApi.ezclocker.ezDateTime.ezToIso(selectedPeriod.ezPeriodEndMoment);

                let selectedPeriodJson = EzJson.toJson({
                    ezPeriodStartIso: startIso,
                    ezPeriodEndIso: endIso,
                    // Deprecated Values
                    startDateIso8601: startIso,
                    endDateIso8601: endIso,
                    // Deprecated values
                    startPeriod: startIso,
                    endPeriod: startIso,
                    // Deprecated values
                    periodStart: startIso,
                    periodEnd: endIso
                });

                let selectedPeriodResponse = {
                    selectedPeriod: selectedPeriod,
                    ezPeriodStartMoment: selectedPeriod.ezPeriodStartMoment,
                    ezPeriodEndMoment: selectedPeriod.ezPeriodEndMoment
                };

                return Promise.all([
                    EzClockerContext.ezInstance.ezSaveActiveAccountOption(selectedPeriodOptionKey, selectedPeriodJson),
                    EzClockerContext.ezInstance.ezSaveActiveAccountOption(
                        EzClockerContext.ezInstance.ezGetActiveAccountOptionKeyNameForOptionName(
                            ezApi.ezclocker.ezOptionsService.EZOPTION_SELECTED_PERIOD_START_ISO),
                        startIso),
                    EzClockerContext.ezInstance.ezSaveActiveAccountOption(
                        EzClockerContext.ezInstance.ezGetActiveAccountOptionKeyNameForOptionName(
                            ezApi.ezclocker.ezOptionsService.EZOPTION_SELECTED_PERIOD_END_ISO),
                        endIso)])
                    .then(
                        () => resolve(selectedPeriodResponse),
                        (eResponse) => {
                            ezApi.ezclocker.ezLogger.error(
                                EzString.em`
                                Failed to save the active account's selected period optoins.
                                Error: ${EzJson.toJson(eResponse)}`);

                            return resolve(selectedPeriodResponse);
                        });

            });
    }

    /**
     * @public @method
     * Returns the active account's options
     * @returns {array}
     */
    ezGetActiveAccountOptions() {
        let aaTypeInfo = EzClockerContext.ezInstance.ezGetActiveAccountTypeInfo();

        if (!EzObject.isValid(
            EzClockerContext.ezInstance[aaTypeInfo.contextName][aaTypeInfo.selectedAccountOptionsName])) {
            EzClockerContext.ezInstance[aaTypeInfo.contextName][aaTypeInfo.selectedAccountOptionsName] = {};
        }

        return EzClockerContext.ezInstance[aaTypeInfo.contextName][aaTypeInfo.selectedAccountOptionsName];
    }

    /**
     * @public @method
     * Saves all the options for the active account
     * @returns {Promise.resolve}
     */
    ezSaveActiveAccountOptions() {
        let aaOptions = EzClockerContext.ezInstance.ezGetActiveAccountOptionsObject();

        let saveOptionCalls = [];

        if (EzObject.isValid(aaOptions)) {
            for (let aOptionKey in aaOptions) {
                saveOptionCalls.push(
                    EzClockerContext.ezInstance.ezSaveActiveAccountOption(
                        aOptionKey,
                        aaOptions[aOptionKey]));
            }
        }

        return Promise.promiseAll(saveOptionCalls);
    }

    /**
     * @public @method
     * Returns the value for the Active Employee permission associated with the provided id.
     * @param {string} aOptionName
     * @param {string} aDefaultValue
     * @returns {string}
     */
    ezReadActiveAccountOption(aOptionName, aDefaultValue) {
        if (!EzString.hasLength(aOptionName)) {
            throw new EzBadParamException(
                'aOptionName',
                EzClockerContext.ezInstance,
                EzClockerContext.ezInstance.ezReadActiveAccountOption);
        }

        if (!EzObject.isValid(aDefaultValue)) {
            throw new EzBadParamException(
                'aDefaultValue',
                EzClockerContext.ezInstance,
                EzClockerContext.ezInstance.ezReadActiveAccountOption);
        }

        let activeAccountOptions = EzClockerContext.ezInstance.ezGetActiveAccountOptionsObject();

        let aOptionKey = EzClockerContext.ezInstance.ezGetActiveAccountOptionKeyNameForOptionName(aOptionName);

        let adjustedOptionKey = EzClockerContext.ezInstance.ezPrependAccountIdToOptionKey(aOptionKey);

        if (!EzObject.hasProperty(activeAccountOptions, adjustedOptionKey)) {
            activeAccountOptions[adjustedOptionKey] = aDefaultValue;

            EzClockerContext.ezInstance.ezSaveActiveAccountOption(aOptionKey, aDefaultValue)
                .then(ezApi.ezIgnoreRes);

            return aDefaultValue;
        }

        let aValue = activeAccountOptions[adjustedOptionKey];

        if (!EzString.hasLength(aValue)) {
            activeAccountOptions[adjustedOptionKey] = aDefaultValue;

            EzClockerContext.ezInstance.ezSaveActiveAccountOption(aOptionKey, aDefaultValue)
                .then(ezApi.ezIgnoreRes);

            return aDefaultValue;
        }

        return aValue;
    }

    /**
     * @public @method
     * Determines if the current user is a payroll manager, manager, employee, or personal account
     * and if so prepends the account id
     * to the provided aOptionKey. Otherwise, the aOptionKey is returned as provided.
     * @param {string} aOptionKey
     * @returns {string}
     */
    ezPrependAccountIdToOptionKey(aOptionKey) {
        if (!EzObject.isValid(EzClockerContext.ezInstance.ezGetUserContext())) {
            throw new EzException(
                'A valid user context is required for EzClockerContext.ezRefreshActiveAccountSelectedPeriod');
        }

        if (!EzString.hasLength(aOptionKey)) {
            throw new EzBadParamException(
                'aOptionKey',
                EzClockerContext.ezInstance,
                EzClockerContext.ezInstance.ezPrependAccountIdToOptionKey);
        }

        if (EzClockerContext.ezInstance.ezUserContext.isPayrollManager ||
            EzClockerContext.ezInstance.ezUserContext.isManager ||
            EzClockerContext.ezInstance.ezUserContext.isEmployee ||
            EzClockerContext.ezInstance.ezUserContext.isPersonal) {

            let activeAccount = EzClockerContext.ezInstance.ezGetActiveAccount();

            if (!EzObject.isValid(activeAccount)) {
                throw new EzException('An active account is required in EzClockerContext.ezPrependAccountIdToOptionKey');
            }

            return `${activeAccount.id}_${aOptionKey}`;
        }

        return aOptionKey;
    }

    /**
     * @public @method
     * Saves the Active Employee option
     * @param {string} aOptionName
     * @param {string} aOptionValue
     * @returns {Promise.resolve}
     */
    ezSaveActiveAccountOption(aOptionName, aOptionValue) {
        if (!EzString.hasLength(aOptionName)) {
            throw new EzBadParamException(
                'aOptionName',
                EzClockerContext.ezInstance,
                EzClockerContext.ezInstance.ezSaveActiveAccountOption);
        }

        if (!EzObject.isValid(aOptionValue)) {
            throw new EzBadParamException(
                'aOptionValue',
                EzClockerContext.ezInstance,
                EzClockerContext.ezInstance.ezSaveActiveAccountOption);
        }

        return EzPromise.asyncAction(
            (finished) => {
                let aOptionKey = EzClockerContext.ezInstance.ezGetActiveAccountOptionKeyNameForOptionName(aOptionName);
                let activeAccountOptions = EzClockerContext.ezInstance.ezGetActiveAccountOptionsObject();

                if (activeAccountOptions.isEmployer) {
                    return EzClockerContext.ezInstance.ezSaveEmployerOption(
                        activeAccountOptions,
                        aOptionKey,
                        aOptionValue)
                        .then(finished, finished);
                }

                if (activeAccountOptions.isPayrollManager || activeAccountOptions.isManager &&
                    EzNumber.isNumber(EzClockerContext.ezInstance.employerContext.selectedEmployerAccountIndex) &&
                    0 >= EzClockerContext.ezInstance.employerContext.selectedEmployerAccountIndex) {
                    return EzClockerContext.ezInstance.ezSaveSelectedEmployerPayrollManagerManagerOption(
                        activeAccountOptions,
                        aOptionKey,
                        aOptionValue)
                        .then(finished, finished);
                }

                return EzClockerContext.ezInstance.ezSaveActiveEmployerEmployeeOption(
                    activeAccountOptions,
                    aOptionKey,
                    aOptionValue)
                    .then(finished, finished);
            });
    }

    /**
     * @public @method
     * Saves a employer account option.
     * @param {array} activeAccountOptions
     * @param {string} aOptionKey
     * @param {string} aOptionValue
     * @returns {Promise}
     */
    ezSaveEmployerOption(activeAccountOptions, aOptionKey, aOptionValue) {
        if (!EzObject.isValid(activeAccountOptions)) {
            throw new EzBadParamException(
                'activeAccountOptions',
                EzClockerContext.ezInstance,
                EzClockerContext.ezInstance.ezSaveEmployerOption);
        }

        if (!EzString.hasLength(aOptionKey)) {
            throw new EzBadParamException(
                'aOptionKey',
                EzClockerContext.ezInstance,
                EzClockerContext.ezInstance.ezSaveEmployerOption);
        }

        let selectedEmployer = EzClockerContext.ezInstance.ezGetSelectedEmployerAccount();

        if (!EzObject.isValid(selectedEmployer)) {
            throw new EzException('A selected employer is required in EzClockerContext.ezSaveActiveAccountOption');
        }

        let adjustedOptionKey = EzClockerContext.ezInstance.ezPrependAccountIdToOptionKey(aOptionKey);

        return EzPromise.promise(
            (resolve, reject) => ezApi.ezclocker.ezOptionsService.ezPersistEmployerOption(
                selectedEmployer.id,
                aOptionKey,
                aOptionValue)
                .then(
                    (response) => {
                        activeAccountOptions[adjustedOptionKey] = response.employerOption.optionValue;

                        return resolve(response);
                    },
                    (eResponse) => {
                        ezApi.ezclocker.ezLogger.error(
                            EzString.em`
                                Unable to save employer account option ${aOptionKey}=${aOptionValue}.
                                Error: ${EzJson.toJson(eResponse)}`);

                        return reject(eResponse);
                    }));
    }

    /**
     * @public @method
     * Saves a selected employer's Payroll Manager or Manager account option
     * @param {array} activeAccountOptions
     * @param {string} aOptionKey
     * @param {string} aOptionValue
     * @returns {Promise}
     */
    ezSaveSelectedEmployerPayrollManagerManagerOption(activeAccountOptions, aOptionKey, aOptionValue) {
        if (!EzObject.isValid(activeAccountOptions)) {
            throw new EzBadParamException(
                'activeAccountOptions',
                EzClockerContext.ezInstance,
                EzClockerContext.ezInstance.ezSaveSelectedEmployerPayrollManagerManagerActiveAccountOption);
        }

        if (!EzString.hasLength(aOptionKey)) {
            throw new EzBadParamException(
                'aOptionKey',
                EzClockerContext.ezInstance,
                EzClockerContext.ezInstance.ezSaveSelectedEmployerPayrollManagerManagerActiveAccountOption);
        }

        let selectedEmployer = EzClockerContext.ezInstance.ezGetSelectedEmployerAccount();

        if (!EzObject.isValid(selectedEmployer)) {
            throw new EzException('A selected employer is required in EzClockerContext.ezSaveActiveAccountOption');
        }

        let activeAccount = EzClockerContext.ezInstance.ezGetActiveAccount();

        if (!EzObject.isValid(activeAccount)) {
            throw new EzException('An active account is required in EzClockerContext.ezSaveActiveAccountOption');
        }

        let adjustedOptionKey = EzClockerContext.ezInstance.ezPrependAccountIdToOptionKey(aOptionKey);

        return EzPromise.promise(
            (resolve, reject) => {
                // Save manager's own periods as an employee
                return ezApi.ezclocker.ezOptionsService.ezSaveEmployeeOption(
                    selectedEmployer.id,
                    activeAccount.id,
                    aOptionKey,
                    aOptionValue)
                    .then(
                        (response) => {
                            activeAccountOptions[adjustedOptionKey] = response.employerOption.optionValue;

                            return resolve(response);
                        },
                        (eResponse) => {
                            ezApi.ezclocker.ezLogger.error(
                                EzString.em`
                                    Unable to save the selected Employer account's
                                    Payroll Manager/Manager Ooption option:
                                    "${aOptionKey}=${aOptionValue}".
                                    Error: ${EzJson.toJson(eResponse)}`);
                            return reject(eResponse);
                        });
            });
    }

    /**
     * @public @method
     * Saves the active employer's employee account option
     * @param {array} activeAccountOptions
     * @param {string} aOptionKey
     * @param {string} aOptionValue
     * @returns {Promise}
     */
    ezSaveActiveEmployerEmployeeOption(activeAccountOptions, aOptionKey, aOptionValue) {
        if (!EzObject.isValid(activeAccountOptions)) {
            throw new EzBadParamException(
                'activeAccountOptions',
                EzClockerContext.ezInstance,
                EzClockerContext.ezInstance.ezSaveActiveEmployerPayrollManagerManagerActiveAccountOption);
        }

        if (!EzString.hasLength(aOptionKey)) {
            throw new EzBadParamException(
                'aOptionKey',
                EzClockerContext.ezInstance,
                EzClockerContext.ezInstance.ezSaveActiveEmployerPayrollManagerManagerActiveAccountOption);
        }

        let activeEmployer = EzClockerContext.ezInstance.activeEmployer;

        if (!EzObject.isValid(activeEmployer)) {
            throw new EzException('An active employer is required in EzClockerContext.ezSaveActiveAccountOption');
        }

        let activeAccount = EzClockerContext.ezInstance.ezGetActiveAccount();

        if (!EzObject.isValid(activeAccount)) {
            throw new EzException('An active account is required in EzClockerContext.ezSaveActiveAccountOption');
        }

        let adjustedOptionKey = EzClockerContext.ezInstance.ezPrependAccountIdToOptionKey(aOptionKey);

        return EzPromise.promise(
            (resolve, reject) => {
                // Save manager's own periods as an employee
                return ezApi.ezclocker.ezOptionsService.ezSaveEmployeeOption(
                    activeEmployer.id,
                    activeAccount.id,
                    aOptionKey,
                    aOptionValue)
                    .then(
                        (response) => {
                            activeAccountOptions[adjustedOptionKey] = response.employerOption.optionValue;

                            return resolve(response);
                        },
                        (eResponse) => {
                            ezApi.ezclocker.ezLogger.error(
                                EzString.em`
                                    Unable to save the active Employer's employee account option
                                    "${aOptionKey}=${aOptionValue}".
                                    Error: ${EzJson.toJson(eResponse)}`);

                            return reject(eResponse);
                        });
            });
    }

    /**
     * @public @method
     * Returns the active account's option object (if supported).
     * Adds isEmployer, isPayrollManager, isManager, isEmployee, and isPersonal booleans to the object for
     * convience in determining which options were returned.
     * @returns {object}
     */
    ezGetActiveAccountOptionsObject() {
        let aaTypeInfo = EzClockerContext.ezInstance.ezGetActiveAccountTypeInfo();

        let accountContext = EzClockerContext.ezInstance[aaTypeInfo.contextName];

        let accountOptions = accountContext[aaTypeInfo.selectedAccountOptionsName];

        if (!EzObject.isValid(accountOptions)) {
            accountContext[aaTypeInfo.selectedAccountOptionsName] = {};
            accountOptions = accountContext[aaTypeInfo.selectedAccountOptionsName];
        }

        accountOptions.isEmployer = aaTypeInfo.isEmployer;

        accountOptions.isPayrollManager = aaTypeInfo.isPayrollManager;

        accountOptions.isManager = aaTypeInfo.isManager;

        accountOptions.isEmployee = aaTypeInfo.isEmployee;

        accountOptions.isPersonal = aaTypeInfo.isPersonal;

        return accountOptions;
    }

    /**
     * @public @method
     * Re - loads the active account's selected period from the db
     * @returns { Promise.resolve }
     * A resolve only promise
    */
    ezRefreshActiveAccountSelectedPeriodMoments() {
        if (!EzObject.isValid(EzClockerContext.ezInstance.ezUserContext)) {
            throw new EzException(
                'A valid user context is required for EzClockerContext.ezRefreshActiveAccountSelectedPeriod');
        }

        if (!EzObject.isValid(EzClockerContext.ezInstance.activeEmployer)) {
            throw new EzException(
                'A valid active employer is required for EzClockerContext.ezRefreshActiveAccountSelectedPeriod');
        }

        if (!EzObject.isValid(EzClockerContext.ezInstance.ezGetActiveAccount())) {
            throw new EzException(
                'A valid active employer is required for EzClockerContext.ezRefreshActiveAccountSelectedPeriod');
        }

        return ezApi.ezResolver(
            (resolve) => {
                let options = EzClockerContext.ezInstance.ezGetActiveAccountOptionsObject();

                if (EzClockerContext.ezInstance.ezUserContext.isEmployer) {
                    // Read employer Option
                    return ezApi.ezclocker.ezOptionsService.readEmployerOption(
                        EzClockerContext.ezInstance.ezGetActiveAccountContext().employerId,
                        ezApi.ezclocker.ezOptionsService.EZOPTION_EMPLOYER_SELECTED_PERIOD,
                        ezApi.ezclocker.ezDateTime.ezCreateDefaultSelectedPeriodJson())
                        .then(
                            (response) => {
                                options[response.employerOption.optionKey] =
                                    EzJson.fromJson(response.employerOption.optionValue);

                                let selectedPeriod = EzClockerContext.ezInstance.ezReadSelectedPeriodFromProvidedOptions(
                                    // Account type
                                    EzClockerAccountType.EMPLOYER,
                                    // Account ID
                                    EzClockerContext.ezInstance.ezUserContext.userAccount.id,
                                    options);

                                EzClockerContext.ezInstance.ezSetActiveAccountSelectedPeriod(selectedPeriod);

                                return resolve(selectedPeriod);
                            },
                            () => {
                                return resolve(
                                    EzClockerContext.ezInstance.ezReadSelectedPeriodFromProvidedOptions(
                                        // Account type
                                        EzClockerAccountType.EMPLOYER,
                                        // Account ID
                                        EzClockerContext.ezInstance.ezUserContext.userAccount.id,
                                        options));
                            });
                }

                if (EzClockerContext.ezInstance.ezUserContext.isPayrollManager ||
                    EzClockerContext.ezInstance.ezUserContext.isManager ||
                    EzClockerContext.ezInstance.ezUserContext.isEmployee ||
                    EzClockerContext.ezInstance.ezUserContext.isPersonal) {
                    let optionKey = EzClockerContext.ezInstance.ezGetActiveAccountOptionKeyNameForOptionName(
                        ezApi.ezclocker.ezOptionsService.EZOPTION_EMPLOYEE_SELECTED_PERIOD);

                    let accountType = EzClockerAccountType.EMPLOYEE;

                    if (EzClockerContext.ezInstance.ezGetUserContext().isPayrollManager) {
                        accountType = EzClockerAccountType.PAYROLL_MANAGER;
                    } else if (EzClockerContext.ezInstance.ezGetUserContext().isManager) {
                        accountType = EzClockerAccountType.MANAGER;
                    } else if (EzClockerContext.ezInstance.ezGetUserContext().isPersonal) {
                        accountType = EzClockerAccountType.PERSONAL;
                    }

                    let selectedEmployeeAccount =
                        EzClockerContext.ezInstance.ezGetActiveAccountContext().selectedEmployeeAccount;

                    if (!EzObject.isValid(selectedEmployeeAccount)) {
                        return resolve(
                            EzClockerContext.ezInstance.ezReadSelectedPeriodFromProvidedOptions(
                                // Account type
                                accountType,
                                // Account ID
                                EzClockerContext.ezInstance.ezUserContext.userAccount.id,
                                options));
                    }

                    // Read employee option
                    return ezApi.ezclocker.ezOptionsService.ezReadEmployeeOption(
                        EzClockerContext.ezInstance.activeEmployer.id,
                        EzClockerContext.ezInstance.ezGetActiveAccountContext().selectedEmployeeAccount.id,
                        optionKey,
                        ezApi.ezclocker.ezDateTime.ezCreateDefaultSelectedPeriodJson())
                        .then(
                            (response) => {
                                options[optionKey] = EzJson.fromJson(response.employerOption.optionValue);

                                let selectedPeriod = EzClockerContext.ezInstance.ezReadSelectedPeriodFromProvidedOptions(
                                    // Account type
                                    accountType,
                                    // Account ID
                                    EzClockerContext.ezInstance.ezUserContext.userAccount.id,
                                    options);

                                EzClockerContext.ezInstance.ezSetActiveAccountSelectedPeriod(selectedPeriod);

                                return resolve(selectedPeriod);
                            },
                            () => {
                                return resolve(
                                    EzClockerContext.ezInstance.ezReadSelectedPeriodFromProvidedOptions(
                                        // Account type
                                        accountType,
                                        // Account ID
                                        EzClockerContext.ezInstance.ezUserContext.userAccount.id,
                                        options));
                            });
                }
            });
    }

    /**
     * @public @method
     * Obtains the period start and end values for the user logged into t he dashboard
     * @returns {object}
     */
    ezGetActiveAccountContextSelectedPeriod() {
        return EzClockerContext
            .ezInstance[EzClockerContext.ezInstance.ezGetActiveAccountTypeInfo().contextName]
            .selectedPeriod;
    }

    /**
     * @public @method
     * Returns the option key name to use for a given option name. Some accounts support two different sets
        of options (manager account as the prime example) and need to swtich sets in on the employer dashboard vs
        an employee dashboard.
     * @param {string} aOptionName
     * @returns {string}
    */
    ezGetActiveAccountOptionKeyNameForOptionName(aOptionName) {
        if (!EzObject.isValid(EzClockerContext.ezInstance.ezGetUserContext())) {
            throw new EzException(
                'A valid user context is required for EzClockerContext.ezGetActiveAccountOptionKeyNameForOptionName');
        }

        if (!EzString.hasLength(aOptionName)) {
            throw new EzBadParamException(
                'aOptionName',
                EzClockerContext.ezInstance,
                EzClockerContext.ezInstance.ezGetActiveAccountOptionKeyNameForOptionName);
        }

        if (EzClockerContext.ezInstance.ezUserContext.isEmployer) {
            return ezApi.ezclocker.ezOptionsService.ezGetActiveAccountOptionKeyNameForAccountType(
                EzClockerAccountType.EMPLOYER, aOptionName);
        }

        if (EzClockerContext.ezInstance.ezUserContext.isPayrollManager &&
            EzObject.isValid(EzClockerContext.ezInstance.ezGetSelectedEmployerAccount()) &&
            EzBoolean.isTrue(EzClockerContext.ezInstance.ezGetSelectedEmployerAccount().ready)) {
            return ezApi.ezclocker.ezOptionsService.ezGetActiveAccountOptionKeyNameForAccountType(
                EzClockerAccountType.PAYROLL_MANAGER_AS_EMPLOYER,
                aOptionName);
        }

        if (EzClockerContext.ezInstance.ezUserContext.isPayrollManager) {
            return ezApi.ezclocker.ezOptionsService.ezGetActiveAccountOptionKeyNameForAccountType(
                EzClockerAccountType.PAYROLL_MANAGER,
                aOptionName);
        }

        if (EzClockerContext.ezInstance.ezUserContext.isManager &&
            EzObject.isValid(EzClockerContext.ezInstance.ezGetSelectedEmployerAccount()) &&
            EzBoolean.isTrue(EzClockerContext.ezInstance.ezGetSelectedEmployerAccount().ready)) {
            return ezApi.ezclocker.ezOptionsService.ezGetActiveAccountOptionKeyNameForAccountType(
                EzClockerAccountType.MANAGER_AS_EMPLOYER,
                aOptionName);
        }

        if (EzClockerContext.ezInstance.ezUserContext.isManager) {
            return ezApi.ezclocker.ezOptionsService.ezGetActiveAccountOptionKeyNameForAccountType(
                EzClockerAccountType.MANAGER,
                aOptionName);
        }

        if (EzClockerContext.ezInstance.ezUserContext.isEmployee) {
            return ezApi.ezclocker.ezOptionsService.ezGetActiveAccountOptionKeyNameForAccountType(
                EzClockerAccountType.EMPLOYEE,
                aOptionName);
        }

        if (EzClockerContext.ezInstance.ezUserContext.isPersoanl) {
            return ezApi.ezclocker.ezOptionsService.ezGetActiveAccountOptionKeyNameForAccountType(
                EzClockerAccountType.PERSONAL,
                aOptionName);
        }

        return aOptionName;
    }

    /**
     * @public @method
     * Returns an object containing string values representing the account type. If the forceNew param is true,
        then the cached account type info is refreshed before returning. Otherwise, the cached account type info is returned
        if it has been previously set.
     * Returned Object:
         {
             displayName: 'Employer|Manager|Employee|Personal|UNKNOWN',
             primaryRole: 'ROLE_EMPLOYER|ROLE_MANAGER|ROLE_EMPLOYEE|ROLE_EMPLOYEE|blank',
             accountType: 'EMPLOYER|MANAGER|EMPLOYEE|PERSONAL|UNKNOWN',
             propName: 'employer|manager|employee|personal|unknown'
             contextName: 'employerContext|managerContext|employeeContext|personalContext|UNKNOWN',
             accountArrayName: 'employerAccounts|managerAccounts|employeeAccounts|personalAccounts|unknown',
             selectedAccountIndexName: 'employerSelectedAccountIndex|managerSelectedAccountIndex|employeeSelectedAccountIndex|personalSelectedAccountIndex|unknown',
             selectedAccountOptionsName: 'employerSelectdAccountOptions|managerSelectdAccountOptions|employeeSelectdAccountOptions|personalSelectdAccountOptions|unknown',
             selectedAccountLicenseName: 'employerSelectedAccountLicense|NONE|NONE|personalSelectedAccountLicense|unknown',
         };
     * @param {Boolean|null} clearCache
     * @returns {object}
     */
    ezGetActiveAccountTypeInfo(clearCache) {
        if (!EzObject.isValid(EzClockerContext.ezInstance.ezGetUserContext())) {
            throw new EzException('A user context is required in EzClockerContext.ezGetActiveAccount');
        }

        if (EzBoolean.isTrue(clearCache)) {
            EzClockerContext.ezInstance.ezActiveAccountTypeInfo = EzClockerContext.ezCreateDefaultActiveAccountTypeInfo();
        }

        if (!EzBoolean.isTrue(clearCache) &&
            EzObject.isValid(EzClockerContext.ezInstance.ezActiveAccountTypeInfo) &&
            EzBoolean.isTrue(EzClockerContext.ezInstance.ezActiveAccountTypeInfo.ready)) {
            // Already created reference, return that instead of re-creating it.
            return EzClockerContext.ezInstance.ezActiveAccountTypeInfo;
        }

        EzClockerContext.ezInstance.ezActiveAccountTypeInfo = EzClockerContext.ezCreateDefaultActiveAccountTypeInfo();

        if (EzClockerContext.ezInstance.ezUserContext.isEmployer) {
            EzClockerContext.ezInstance.ezActiveAccountTypeInfo.displayName = 'Employer';

            EzClockerContext.ezInstance.ezActiveAccountTypeInfo.contextName =
                `${EzClockerContext.ezInstance.ezActiveAccountTypeInfo.displayName.toLowerCase()}Context`;

            EzClockerContext.ezInstance.ezActiveAccountTypeInfo.primaryRole =
                `ROLE_${EzClockerContext.ezInstance.ezActiveAccountTypeInfo.displayName.toUpperCase()}`;

            EzClockerContext.ezInstance.ezActiveAccountTypeInfo[
                `is${EzClockerContext.ezInstance.ezActiveAccountTypeInfo.displayName}`] = true;

            EzClockerContext.ezInstance.ezActiveAccountTypeInfo.accountType =
                EzClockerContext.ezInstance.ezActiveAccountTypeInfo.displayName.toUpperCase();

            EzClockerContext.ezInstance.ezActiveAccountTypeInfo.propName =
                EzClockerContext.ezInstance.ezActiveAccountTypeInfo.displayName.toLowerCase();

            EzClockerContext.ezInstance.ezActiveAccountTypeInfo.accountArrayName =
                `${EzClockerContext.ezInstance.ezActiveAccountTypeInfo.displayName.toLowerCase()}Accounts`;

            EzClockerContext.ezInstance.ezActiveAccountTypeInfo.selectedAccountIndexName =
                `selected${EzClockerContext.ezInstance.ezActiveAccountTypeInfo.displayName}AccountIndex`;

            EzClockerContext.ezInstance.ezActiveAccountTypeInfo.selectedAccountOptionsName =
                `selected${EzClockerContext.ezInstance.ezActiveAccountTypeInfo.displayName}AccountOptions`;

            EzClockerContext.ezInstance.ezActiveAccountTypeInfo.selectedAccountLicenseName =
                `selected${EzClockerContext.ezInstance.ezActiveAccountTypeInfo.displayName}AccountLicense`;

        } else if (EzClockerContext.ezInstance.ezUserContext.isPayrollManager) {
            EzClockerContext.ezInstance.ezActiveAccountTypeInfo.displayName = 'Payroll Manager';

            EzClockerContext.ezInstance.ezActiveAccountTypeInfo.contextName = 'payrollManagerContext';

            EzClockerContext.ezInstance.ezActiveAccountTypeInfo.primaryRole = 'ROLE_PAYROLL_MANAGER';

            EzClockerContext.ezInstance.ezActiveAccountTypeInfo.accountType = 'PAYROLL_MANAGER';

            EzClockerContext.ezInstance.ezActiveAccountTypeInfo['isPayrollManager'] = true;

            EzClockerContext.ezInstance.ezActiveAccountTypeInfo.propName = 'payrollManager';

            EzClockerContext.ezInstance.ezActiveAccountTypeInfo.accountArrayName = 'payrollManagerAccounts';

            EzClockerContext.ezInstance.ezActiveAccountTypeInfo.selectedAccountIndexName =
                'selectedPayrollManagerAccountIndex';

            EzClockerContext.ezInstance.ezActiveAccountTypeInfo.selectedAccountOptionsName =
                'selectedPayrollManagerAccountOptions';

            EzClockerContext.ezInstance.ezActiveAccountTypeInfo.selectedAccountLicenseName =
                'selectedPayrollManagerAccountLicense';

        } else if (EzClockerContext.ezInstance.ezUserContext.isManager) {
            EzClockerContext.ezInstance.ezActiveAccountTypeInfo.displayName = 'Manager';

            EzClockerContext.ezInstance.ezActiveAccountTypeInfo.contextName =
                `${EzClockerContext.ezInstance.ezActiveAccountTypeInfo.displayName.toLowerCase()}Context`;

            EzClockerContext.ezInstance.ezActiveAccountTypeInfo.primaryRole =
                `ROLE_${EzClockerContext.ezInstance.ezActiveAccountTypeInfo.displayName.toUpperCase()}`;

            EzClockerContext.ezInstance.ezActiveAccountTypeInfo.accountType =
                EzClockerContext.ezInstance.ezActiveAccountTypeInfo.displayName.toUpperCase();

            EzClockerContext
                .ezInstance
                .ezActiveAccountTypeInfo[`is${EzClockerContext.ezInstance.ezActiveAccountTypeInfo.displayName}`] = true;

            EzClockerContext.ezInstance.ezActiveAccountTypeInfo.propName =
                EzClockerContext.ezInstance.ezActiveAccountTypeInfo.displayName.toLowerCase();

            EzClockerContext.ezInstance.ezActiveAccountTypeInfo.accountArrayName =
                `${EzClockerContext.ezInstance.ezActiveAccountTypeInfo.displayName.toLowerCase()}Accounts`;

            EzClockerContext.ezInstance.ezActiveAccountTypeInfo.selectedAccountIndexName =
                `selected${EzClockerContext.ezInstance.ezActiveAccountTypeInfo.displayName}AccountIndex`;

            EzClockerContext.ezInstance.ezActiveAccountTypeInfo.selectedAccountOptionsName =
                `selected${EzClockerContext.ezInstance.ezActiveAccountTypeInfo.displayName}AccountOptions`;

            EzClockerContext.ezInstance.ezActiveAccountTypeInfo.selectedAccountLicenseName =
                `selected${EzClockerContext.ezInstance.ezActiveAccountTypeInfo.displayName}AccountLicense`;

        } else if (EzClockerContext.ezInstance.ezUserContext.isEmployee) {
            EzClockerContext.ezInstance.ezActiveAccountTypeInfo.displayName = 'Employee';

            EzClockerContext.ezInstance.ezActiveAccountTypeInfo.contextName =
                `${EzClockerContext.ezInstance.ezActiveAccountTypeInfo.displayName.toLowerCase()}Context`;

            EzClockerContext.ezInstance.ezActiveAccountTypeInfo.primaryRole =
                `ROLE_${EzClockerContext.ezInstance.ezActiveAccountTypeInfo.displayName.toUpperCase()}`;

            EzClockerContext.ezInstance.ezActiveAccountTypeInfo.accountType =
                EzClockerContext.ezInstance.ezActiveAccountTypeInfo.displayName.toUpperCase();

            EzClockerContext
                .ezInstance
                .ezActiveAccountTypeInfo[`is${EzClockerContext.ezInstance.ezActiveAccountTypeInfo.displayName}`] = true;

            EzClockerContext.ezInstance.ezActiveAccountTypeInfo.propName =
                EzClockerContext.ezInstance.ezActiveAccountTypeInfo.displayName.toLowerCase();

            EzClockerContext.ezInstance.ezActiveAccountTypeInfo.accountArrayName =
                `${EzClockerContext.ezInstance.ezActiveAccountTypeInfo.displayName.toLowerCase()}Accounts`;

            EzClockerContext.ezInstance.ezActiveAccountTypeInfo.selectedAccountIndexName =
                `selected${EzClockerContext.ezInstance.ezActiveAccountTypeInfo.displayName}AccountIndex`;

            EzClockerContext.ezInstance.ezActiveAccountTypeInfo.selectedAccountOptionsName =
                `selected${EzClockerContext.ezInstance.ezActiveAccountTypeInfo.displayName}AccountOptions`;

            EzClockerContext.ezInstance.ezActiveAccountTypeInfo.selectedAccountLicenseName =
                `selected${EzClockerContext.ezInstance.ezActiveAccountTypeInfo.displayName}AccountLicense`;

        } else if (EzClockerContext.ezInstance.ezUserContext.isPersonal) {
            EzClockerContext.ezInstance.ezActiveAccountTypeInfo.displayName = 'Personal';

            EzClockerContext.ezInstance.ezActiveAccountTypeInfo.contextName =
                `${EzClockerContext.ezInstance.ezActiveAccountTypeInfo.displayName.toLowerCase()}Context`;

            EzClockerContext.ezInstance.ezActiveAccountTypeInfo.primaryRole =
                `ROLE_${EzClockerContext.ezInstance.ezActiveAccountTypeInfo.displayName.toUpperCase()}`;

            EzClockerContext.ezInstance.ezActiveAccountTypeInfo.accountType =
                EzClockerContext.ezInstance.ezActiveAccountTypeInfo.displayName.toUpperCase();

            EzClockerContext
                .ezInstance
                .ezActiveAccountTypeInfo[`is${EzClockerContext.ezInstance.ezActiveAccountTypeInfo.displayName}`] = true;

            EzClockerContext.ezInstance.ezActiveAccountTypeInfo.propName =
                EzClockerContext.ezInstance.ezActiveAccountTypeInfo.displayName.toLowerCase();

            EzClockerContext.ezInstance.ezActiveAccountTypeInfo.accountArrayName =
                `${EzClockerContext.ezInstance.ezActiveAccountTypeInfo.displayName.toLowerCase()}Accounts`;

            EzClockerContext.ezInstance.ezActiveAccountTypeInfo.selectedAccountIndexName =
                `selected${EzClockerContext.ezInstance.ezActiveAccountTypeInfo.displayName}AccountIndex`;

            EzClockerContext.ezInstance.ezActiveAccountTypeInfo.selectedAccountOptionsName =
                `selected${EzClockerContext.ezInstance.ezActiveAccountTypeInfo.displayName}AccountOptions`;

            EzClockerContext.ezInstance.ezActiveAccountTypeInfo.selectedAccountLicenseName =
                `selected${EzClockerContext.ezInstance.ezActiveAccountTypeInfo.displayName}AccountLicense`;
        } else {
            let em = EzString.em`
                Current user context type is unknown, undefined, or not supported.
                [EzUserContext: ${EzJson.toJson(EzClockerContext.ezInstance.ezUserContext)}]`;

            ezApi.ezclocker.ezLogger.error(em);

            throw new EzException(em);
        }

        if (!EzObject.isValid(EzClockerContext.ezInstance?.[EzClockerContext.ezInstance.ezActiveAccountTypeInfo.contextName])) {
            let em = EzString.em`
                The context ${activeAccountDisplayNameLower}Context for the active account is not currently available
                from the EzClockerContext.`;

            ezApi.ezclocker.ezLogger.error(em);

            throw new EzException(em);
        }

        return EzClockerContext.ezInstance.ezActiveAccountTypeInfo;
    }

    /**
     * @public @method
     * Triggers the EzClockerContextEventName.onActiveAccountReady event
     * @param {activeAccount}
     */
    ezTriggerActiveAccountReady(activeAccount) {
        EzClockerContext.ezInstance.ezTriggerEzClockerContextEvent(
            EzClockerContextEventName.onActiveAccountReady,
            'Active account is ready.',
            {
                account: activeAccount,
            });
    }

    /*===============================================================================================================
    | Section: Active Employer Section
    ===============================================================================================================*/

    /**
     * @public @field
     * @type {boolean}
     */
    #ezActiveEmployerReady = false;
    /**
     * @public @property @getter
     * Gets if the active employer is ready or not
     * @returns {boolean}
     */
    get ezActiveEmployerReady() {
        return EzObject.isValid(EzClockerContext.ezInstance.activeEmployer) &&
            EzBoolean.isTrue(EzClockerContext.ezInstance.activeEmployer.ready) &&
            this.#ezActiveEmployerReady;
    }
    /**
     * @public @property @setter
     * Sets if the active employer is ready or not.
     * @param {boolean}
     */
    set ezActiveEmployerReady(ezActiveEmployerReady) {
        this.#ezActiveEmployerReady = EzObject.isValid(EzClockerContext.ezInstance.activeEmployer) &&
            EzBoolean.isTrue(EzClockerContext.ezInstance.activeEmployer.ready) &&
            EzBoolean.isTrue(ezActiveEmployerReady);
    }

    /**
     * @public @field
     * @type {object}
     */
    #activeEmployer = EzClockerContext.ezCreateDefaultEmployer();
    /**
     * @public @property @getter
     * Gets the active employer entity
     * @returns {object}
     */
    get activeEmployer() {
        return this.#activeEmployer;
    }
    /**
     * @public @property @setter
     * Sets the active employer entity.
        If the provided activeEmployer param is undefined or null, then a default employer entity is created.
     * @param {activeEmployer}
     */
    set activeEmployer(activeEmployer) {
        this.#activeEmployer = EzObject.isValid(activeEmployer)
            ? activeEmployer
            : EzClockerContext.ezCreateDefaultEmployer();
    }

    /**
     * @public @method
     * Returns the currently Active Employer information
     * @returns {boolean}
     * @deprecated
     * Migrate to using the property EzClockerContext.ezInstance.activeEmployer instead.
     */
    ezGetActiveEmployer() {
        return EzClockerContext.ezInstance.activeEmployer;
    }

    /**
     * @public @method
     * Initializes the EzClockerContext active employer module.
     */
    ezInitActiveEmployerModule() {
        // Active Employer
        ezApi.ezclocker.ezEventEngine.ezRegisterEvent(
            EzClockerContext.ezApiName,
            EzClockerContextEventName.onActiveEmployerReady);

        ezApi.ezclocker.ezEventEngine.ezRegisterEvent(
            EzClockerContext.ezApiName,
            EzClockerContextEventName.onActiveEmployerClosed);

        EzClockerContext.ezInstance.ezActiveEmployerModuleReady = true;
    }

    /**
     * @public @method
     * Sets the activeEmployer to provided aActiveEmployer. Used to set a employee's active employer.
     * Important: This method does not trigger any events!
     * @param {object} aActiveEmployer
     * @param {object} aActiveEmployerOptions
     * @param {object} aActiveEmployerLicense
     */
    ezSetActiveEmployer(aActiveEmployer, aActiveEmployerOptions, aActiveEmployerLicense) {
        EzClockerContext.ezInstance.activeEmployer = EzClockerContext.ezCreateDefaultEmployer();

        EzClockerContext.ezInstance.ezActiveEmployerReady = false;

        let changed = EzObject.isValid(EzClockerContext.ezInstance.activeEmployer) &&
            EzBoolean.booleanOrFalse(EzClockerContext.ezInstance.activeEmployer.ready) &&
            (!EzObject.isValid(aActiveEmployer) || EzClockerContext.ezInstance.activeEmployer.id != aActiveEmployer.id);

        if (EzObject.isValid(aActiveEmployer)) {
            EzClockerContext.ezInstance.activeEmployer = aActiveEmployer;

            EzClockerContext.ezInstance.activeEmployer.options = EzObject.isValid(aActiveEmployerOptions)
                ? aActiveEmployerOptions
                : {};

            if (EzObject.isValid(aActiveEmployerLicense)) {
                EzClockerContext.ezInstance.activeEmployer.license = aActiveEmployerLicense;

                if (EzArray.hasLength(aActiveEmployerLicense?.subscriptionPlan?.features) &&
                    !EzArray.hasLength(EzClockerContext.ezInstance.activeEmployer?.license?.features)) {
                    EzClockerContext.ezInstance.activeEmployer.license.features = aActiveEmployerLicense.subscriptionPlan.features;
                }
            } else {
                EzClockerContext.ezInstance.activeEmployer.license = null;
            }

            EzClockerContext.ezInstance.activeEmployer.ready = true;

            EzClockerContext.ezInstance.ezActiveEmployerReady = true;
        } else {
            // Active employer is closed or not available
            EzClockerContext.ezInstance.ezCloseActiveEmployer();
        }

        if (EzBoolean.isTrue(changed)) {
            EzClockerContext.ezInstance.ezTriggerEzClockerContextEvent(
                EzClockerContextEventName.onActiveEmployerChanged,
                'Active Employer was changed.',
                EzClockerContext.ezInstance.activeEmployer);
        } else {
            EzClockerContext.ezInstance.ezTriggerEzClockerContextEvent(
                EzClockerContextEventName.onActiveEmployerReady,
                'Active Employer is ready.',
                EzClockerContext.ezInstance.activeEmployer);
        }
    }

    /**
     * @public @method
        Closes the active employer.
     */
    ezCloseActiveEmployer() {
        EzClockerContext.ezInstance.activeEmployer = EzClockerContext.ezCreateDefaultEmployer();

        EzClockerContext.ezInstance.ezActiveEmployerReady = false;

        EzClockerContext.ezInstance.ezTriggerEzClockerContextEvent(
            EzClockerContextEventName.onActiveEmployerClosed,
            'Active employer is closed.',
            EzClockerContext.ezInstance.activeEmployer);
    }

    /**
     * @protected @method
     * Sets the activeEmployer to the employer context employer account associated with the provided index.
     */
    ezSetActiveEmployerFromSelectedEmployer() {
        if (!EzObject.isValid(EzClockerContext.ezInstance.ezGetUserContext())) {
            throw new EzException(
                EzString.em`
                    A valid user context is required in call to
                    (ez-context-module-active-employer) EzClockerContext.ezSetActiveEmployer`);
        }
        if (!EzObject.isValid(EzClockerContext.ezInstance.employerContext)) {
            throw new EzException(
                EzString.em`
                    A valid user context is required in call to
                    (ez-context-module-active-employer) EzClockerContext.ezSetActiveEmployer`);
        }

        /*
            EzClockerContext.ezInstance.ezSetActiveEmployer triggers one of the following events:
                EzClockerContextEventName.onActiveEmployerReady
                EzClockerContextEventName.onActiveEmployerChanged
        */
        EzClockerContext.ezInstance.ezSetActiveEmployer(
            EzClockerContext.ezInstance.employerContext.employerAccounts[
            EzClockerContext.ezInstance.employerContext.selectedEmployerAccountIndex],
            EzClockerContext.ezInstance.employerContext.selectedEmployerAccountOptions,
            EzClockerContext.ezInstance.employerContext.selectedEmployerAccountLicense);
    }

    /**
     * @public @method
     * Saves the active employer option
     * @param {string} optionName
     * @param {string} optionValue
     * @returns {Promise.resolve}
     */
    ezSaveActiveEmployerOption(optionName, optionValue) {
        if (!EzString.hasLength(optionName)) {
            throw new EzBadParamException(
                'optionName',
                EzClockerContext.ezInstance,
                EzClockerContext.ezInstance.ezSaveActiveEmployerOption);
        }
        if (!EzString.hasLength(optionName)) {
            throw new EzBadParamException(
                'optionValue',
                EzClockerContext.ezInstance,
                EzClockerContext.ezInstance.ezSaveActiveEmployerOption);
        }

        if (!EzObject.isValid(EzClockerContext.ezInstance.ezGetUserContext())) {
            throw new EzException(
                EzString.em`
                    A valid user context is required for
                    (ez-context-module-active-employer) EzClockerContext.ezSaveActiveEmployerOption`);
        }
        if (!EzObject.isValid(EzClockerContext.ezInstance.employerContext)) {
            throw new EzException(
                EzString.em`
                    A valid employer context is required for
                    (ez-context-module-active-employer) EzClockerContext.ezSaveActiveEmployerOption`);
        }

        // Update the option in the local cache
        if (!EzObject.isValid(EzClockerContext.ezInstance.activeEmployer.options)) {
            EzClockerContext.ezInstance.activeEmployer.options = {};
        }

        // Update the cache with the value
        EzClockerContext.ezInstance.activeEmployer.options[optionName] = optionValue;

        // Update selected employer options if the active employer is also the selected employer
        if (EzObject.isValid(EzClockerContext.ezInstance.ezGetSelectedEmployerAccount()) &&
            EzClockerContext.ezInstance.ezGetSelectedEmployerAccount().id == EzClockerContext.ezInstance.activeEmployer.id) {

            EzClockerContext.ezInstance.employerContext.selectedEmployerAccountOptions = EzClockerContext.ezInstance.activeEmployer.options;
        }

        // Save the new option to db
        return EzPromise.asyncAction(
            (finished) => ezApi.ezclocker.ezOptionsService.ezPersistEmployerOption(
                EzClockerContext.ezInstance.activeEmployer.id,
                optionName,
                optionValue)
                .then(
                    ezApi.ezclocker.ezHttpHelper.ezProcessApiResolve,
                    ezApi.ezclocker.ezHttpHelper.ezProcessApiReject)
                .then(
                    finished,
                    (eResponse) => {
                        ezApi.ezclocker.ezLogger.error(
                            EzString.em`
                                Unable to save the active employer's option ${optionName}=${optionValue}.
                                Error: ${EzJson.toJson(eResponse)}`);

                        return finished(eResponse);
                    }));
    }

    /**
     * @public @method
     * Determines if a featureId is enabled on the Active Employer's license
     * @param {string} featureId
     * @returns {Boolean}
     */
    ezActiveEmployerFeatureEnabled(featureId) {
        if (!EzObject.isValid(EzClockerContext.ezInstance.activeEmployer)) {
            throw new EzException(
                EzString.em`
                    A valid active employer is required for
                    (ez-context-module-active-employer) EzClockerContext.ezActiveEmployerFeatureEnabled`);
        }

        if (!EzString.hasLength(featureId)) {
            return true;
        }

        if (!EzArray.isArray(EzClockerContext.ezInstance.activeEmployer.license.subscriptionPlan.enabledFeatures)) {
            EzClockerContext.ezInstance.activeEmployer.license.subscriptionPlan.enabledFeatures = [];
            return false;
        }

        return -1 !== EzClockerContext.ezInstance.activeEmployer.license.subscriptionPlan.enabledFeatures.indexOf(featureId);
    }

    /**
     * @public @method
     * Returns the Active Employer's license
     * @returns {object}
     */
    ezGetActiveEmployerLicense() {
        if (!EzClockerContext.ezInstance?.activeEmployer) {
            throw new EzBadStateException(
                'Expecting a valid active employer reference at EzClockerContext.ezInstance.activeEmployer.',
                'However, the active employer reference is undefined or null (not available yet).',
                EzClockerContext.ezInstance,
                EzClockerContext.ezInstance.ezGetActiveEmployerLicense,
                'Unable to get the active employer license due to an undefined or null active employer.');
        }

        return EzClockerContext.ezInstance?.activeEmployer?.license
            ? EzClockerContext.ezInstance.activeEmployer.license
            : null;
    }

    /**
     * @public @method
     * Returns true if the active employer license as the provided feature id. False otherwise.
     * @returns {boolean}
     */
    ezActiveEmployerLicenseHasFeature(featureId) {
        if (!EzObject.isValid(EzClockerContext.ezInstance.activeEmployer)) {
            ezApi.ezclocker.ezLogger.warn(
                EzString.em`
                    Call to ezApi.ezclocker.ezClockerContext.ezActiveEmployerLicenseHasFeature(featureId)
                    requires a valid active employer reference at EzClockerContext.ezInstance.activeEmployer.
                    However, the active employer reference is undefined or null (not available yet).
                    Will return false (active employer license does not have feature ${featureId}.`);

            return false;
        }

        let activeEmployerLicenseFeatures = EzClockerContext.ezInstance?.activeEmployer?.license?.subscriptionPlan?.enabledFeatures
            ? EzClockerContext.ezInstance.activeEmployer.license.subscriptionPlan.enabledFeatures
            : [];

        return EzArray.hasLength(activeEmployerLicenseFeatures) && -1 != activeEmployerLicenseFeatures.indexOf(featureId);
    }

    /**
     * @public @method
     * Returns the value for the Active Employee permission associated with the provided id.
     * @param {string} aOptionName
     * @param {string} aDefaultValue
     * @returns {String|aDefaultValue}
     */
    ezReadActiveEmployerOption(aOptionName, aDefaultValue) {
        if (!EzObject.isValid(EzClockerContext.ezInstance.activeEmployer)) {
            throw new EzException(
                EzString.em`
                    An active employer is required for call
                    (ez-context-module-active-employer) EzClockerContext.ezReadActiveEmployerOption`);
        }

        if (!EzString.hasLength(aOptionName)) {
            throw new EzBadParamException(
                'aOptionName',
                EzClockerContext.ezInstance,
                EzClockerContext.ezInstance.ezReadActiveEmployerOption);
        }

        if (!EzString.hasLength(aDefaultValue)) {
            throw new EzBadParamException(
                'aDefaultValue',
                EzClockerContext.ezInstance,
                EzClockerContext.ezInstance.ezReadActiveEmployerOption);
        }

        let aOptionKey = EzClockerContext.ezInstance.ezGetActiveAccountOptionKeyNameForOptionName(aOptionName);

        if (!EzObject.isValid(EzClockerContext.ezInstance.activeEmployer.options)) {
            EzClockerContext.ezInstance.activeEmployer.options = {};
        }

        if (!EzObject.hasProperty(EzClockerContext.ezInstance.activeEmployer.options, aOptionKey)) {
            EzClockerContext.ezInstance.activeEmployer.options[aOptionKey] = aDefaultValue;
            return EzClockerContext.ezInstance.activeEmployer.options[aOptionKey];
        }

        let optionValue = EzClockerContext.ezInstance.activeEmployer.options[aOptionKey];

        if (!EzString.hasLength(optionValue)) {
            EzClockerContext.ezInstance.activeEmployer.options[aOptionKey] = aDefaultValue;
        }

        return EzClockerContext.ezInstance.activeEmployer.options[aOptionKey];
    }


    /*===============================================================================================================
    | Section: Active Employee Section
    ===============================================================================================================*/
    /**
     * @public @method
     * Returns the default Employee Options instance.
     * @returns {object}
     */
    static ezCreateDefaultEmployeeOptions() {
        return {
            EMPLOYEE_SELECTED_PERIOD: {
                startDate: ezApi.ezclocker.ezDateTime.ezNow(),
                endDate: ezApi.ezclocker.ezDateTime.ezNow().add(13, 'day')
            },
            EZOPTION_EMPLOYEE_LAST_SELECTED_SCHEDULE_WEEK: ezApi.ezclocker.ezDateTime.ezNow(),
            EMPLOYEE_USE_24HOURTIME_IN_EXPORT_REPORTS: false,
            EMPLOYEE_USE_DECIMAL_TOTALS_IN_EXPORT_REPORTS: false
        };
    }

    /**
     * @public @method
     * Returns the default Active Employer instance.
     * @returns {object}
     */
    static ezCreateDefaultEmployee() {
        let selectedPeriod = ezApi.ezclocker.ezDateTime.ezCreateDefaultSelectedPeriod();

        return {
            ready: false,
            employerEmployeeIndex: -1,

            id: -1,
            userId: -1,
            employerId: -1,

            userInfo: null,

            employeeName: EzString.EMPTY,
            employeeContactEmail: EzString.EMPTY,
            homePhone: EzString.EMPTY,
            mobilePhone: EzString.EMPTY,

            note: EzString.EMPTY,

            primaryRole: EzString.EMPTY,

            isActiveClockIn: false,
            activeClockIn: null,

            invited: false,
            acceptedInvite: false,
            individualAccount: false,
            teamPin: EzString.EMPTY,
            hourlyRate: EzString.EMPTY,

            options: EzClockerContext.ezCreateDefaultEmployeeOptions(),
            selectedPeriod: selectedPeriod,
            ezPeriodStartMoment: selectedPeriod.ezPeriodStartMoment,
            ezPeriodEndMoment: selectedPeriod.ezPeriodEndMoment,

            timeEntries: [],
            timeEntriesById: {},
            timeEntriesTotal: EzClockerContext.DEFAULT_SELECTED_PERIOD_TOTAL,
            timeEntryLocations: [],
            assignedJobs: [],
            permissions: {}
        };
    }

    /**
     * @public @field
     * @type {boolean}
     */
    ezActiveEmployeeReady = false;

    /**
     * @public @field
     * @type {object}
     */
    activeEmployee = {
        ready: false
    };

    /**
     * @protected @method
     * Initializes the EzClockerContext Active Employee module.
     */
    ezInitActiveEmployeeModule() {
        // Active Employee
        ezApi.ezclocker.ezEventEngine.ezRegisterEvent(
            EzClockerContext.ezApiName,
            EzClockerContextEventName.onActiveEmployeeReady);

        ezApi.ezclocker.ezEventEngine.ezRegisterEvent(
            EzClockerContext.ezApiName,
            EzClockerContextEventName.onActiveEmployeeActiveBreakInChanged);

        ezApi.ezclocker.ezEventEngine.ezRegisterEvent(
            EzClockerContext.ezApiName,
            EzClockerContextEventName.onActiveEmployeeClosed);

        ezApi.ezclocker.ezEventEngine.ezRegisterEvent(
            EzClockerContext.ezApiName,
            EzClockerContextEventName.onActiveEmployeeUpdated);

        ezApi.ezclocker.ezEventEngine.ezRegisterEvent(
            EzClockerContext.ezApiName,
            EzClockerContextEventName.onActiveEmployeeChanged);

        ezApi.ezclocker.ezEventEngine.ezRegisterEvent(
            EzClockerContext.ezApiName,
            EzClockerContextEventName.onActiveEmployeeTimeEntriesChanged);

        ezApi.ezclocker.ezEventEngine.ezRegisterEvent(
            EzClockerContext.ezApiName,
            EzClockerContextEventName.onActiveEmployeeSelectedPeriodChanged);

        ezApi.ezclocker.ezEventEngine.ezRegisterEvent(
            EzClockerContext.ezApiName,
            EzClockerContextEventName.onActiveEmployeeActiveClockInChanged);

        ezApi.ezclocker.ezEventEngine.ezRegisterEvent(
            EzClockerContext.ezApiName,
            EzClockerContextEventName.onActiveEmployeeUserInfoUpdated);

        ezApi.ezclocker.ezEventEngine.ezRegisterEvent(
            EzClockerContext.ezApiName,
            EzClockerContextEventName.onActiveEmployeeInviteSuccess);

        ezApi.ezclocker.ezEventEngine.ezRegisterEvent(
            EzClockerContext.ezApiName,
            EzClockerContextEventName.onActiveEmployeeInviteFailure);

        ezApi.ezclocker.ezEventEngine.ezRegisterEvent(
            EzClockerContext.ezApiName,
            EzClockerContextEventName.onActiveEmployeeSelectedPeriodTotalsReady);

        ezApi.ezclocker.ezEventEngine.ezRegisterEvent(
            EzClockerContext.ezApiName,
            EzClockerContextEventName.onActiveEmployeeSelectedPeriodTotalsUpdated);

        EzClockerContext.ezInstance.activeEmployee = EzClockerContext.ezCreateDefaultEmployee();

        EzClockerContext.ezInstance.activeEmployee.ready = false;

        EzClockerContext.ezInstance.ezActiveEmployeeReady = false;

        EzClockerContext.ezInstance.ezActiveEmployeeModuleReady = true;

        EzClockerContext.ezInstance.activeEmployee.selectedPeriodTotals = {
            ready: false,
            totalDecimalHours: '0',
            totalHours: '00:00',
            totalMilliseconds: 0
        };
    }

    /**
     * @public @method
     * Determines if an active employee is ready to use
     * @returns {Boolean}
     */
    ezIsActiveEmployeeReady() {
        return EzObject.isValid(EzClockerContext.ezInstance.activeEmployee) &&
            EzBoolean.isTrue(EzClockerContext.ezInstance.activeEmployee.ready);
    }

    /**
     * @public @method
     * Sets the active employee from the selected employer's employees
     * @param {object} activeEmployee
     * @deprecated
     * Migrate to:
        <code>
            EzClockerContext.ezInstance.ezSetActiveEmployeeFromSelectedEmployerEmployees(
                aSelectedEmployee,
                aSelectedEmployeeOptions);
        </code>
     */
    ezSetActiveEmployee(aSelectedEmployee, aSelectedEmployeeOptions) {
        return ezApi.ezclocker[EzClockerContext.ezApiName].ezSetActiveEmployeeFromSelectedEmployerEmployees(
            aSelectedEmployee,
            aSelectedEmployeeOptions);
    }

    /**
     * @public @method
     * Sets the active employee from the selected employer's employees
     * @param {object} activeEmployee
     */
    ezSetActiveEmployeeFromSelectedEmployerEmployees(aSelectedEmployee, aSelectedEmployeeOptions) {
        EzClockerContext.ezInstance.ezAssignActiveEmployee(EzObject.isValid(aSelectedEmployee)
            ? aSelectedEmployee
            : null);

        EzClockerContext.ezInstance.activeEmployee.options =
            EzBoolean.isTrue(EzClockerContext.ezInstance.activeEmployee.ready) && EzObject.isValid(aSelectedEmployeeOptions)
                ? aSelectedEmployeeOptions
                : {};
    }

    /**
     * @deprecated
     * Migrate to:
        <code>
            EzClockerContext.ezInstance.ezSetActiveEmployeeFromSelectedEmployerEmployees(selectedEmployerEmployeeIndex)
        </code>
     * @public @method
     * Sets the active employee from the selected employer's employees
     * @param {object} activeEmployee
     */
    ezSetActiveEmployeeFromSelectedEmployerAccountEmployeeAccountsByIndex(selectedEmployerEmployeeIndex) {
        return ezApi.ezclocker[EzClockerContext.ezApiName].ezSetActiveEmployeeFromSelectedEmployerEmployeeIndex(
            selectedEmployerEmployeeIndex);
    }

    /**
     * @public @method
     * Sets the active employee from the selected employer's employees
     * @param {object} activeEmployee
     */
    ezSetActiveEmployeeFromSelectedEmployerEmployeeIndex(selectedEmployerEmployeeIndex) {
        if (!EzNumber.isNumber(selectedEmployerEmployeeIndex)) {
            throw new EzBadParamException(
                'selectedEmployerEmployeeIndex',
                EzClockerContext.ezInstance,
                EzClockerContext.ezInstance.ezSetActiveEmployeeFromSelectedEmployerEmployeeIndex);
        }

        if (!EzObject.isValid(EzClockerContext.ezInstance.ezGetSelectedEmployerAccount())) {
            throw new EzException(
                EzString.em`
                A valid selected employer is required in
                EzClockerContext.ezInstance.ezSetActiveEmployeeFromSelectedEmployerEmployeeIndex(...)`);
        }

        EzClockerContext.ezInstance.ezAssignActiveEmployee(
            0 <= selectedEmployerEmployeeIndex &&
                EzArray.arrayHasLength(EzClockerContext.ezInstance.ezGetSelectedEmployerAccountEmployeeAccounts()) &&
                selectedEmployerEmployeeIndex < EzClockerContext.ezInstance.ezGetSelectedEmployerAccountEmployeeAccounts().length
                ? EzClockerContext.ezInstance.ezGetSelectedEmployerAccountEmployeeAccounts()[selectedEmployerEmployeeIndex]
                : null);
    }

    /**
     * @public @method
     * Builds the activeEmployee reference
     * @param {number} employeeId
     */
    ezAssignActiveEmployee(aEmployee) {
        aEmployee = EzObject.isValid(aEmployee)
            ? aEmployee
            : null;

        let activeEmployeeClosed = !EzObject.isValid(aEmployee) || !EzNumber.isNumber(aEmployee.id) || 0 > aEmployee.id;

        let activatingEmployee = EzBoolean.isFalse(activeEmployeeClosed) && !EzClockerContext.ezInstance.ezIsActiveEmployeeReady();

        let activeEmployeeUpdated = EzBoolean.isFalse(activeEmployeeClosed) && EzBoolean.isFalse(activatingEmployee) &&
            aEmployee.id === EzClockerContext.ezInstance.activeEmployee.id;

        let activeEmployeeChanged = EzBoolean.isFalse(activeEmployeeClosed) && EzBoolean.isFalse(activatingEmployee) &&
            aEmployee.id !== EzClockerContext.ezInstance.activeEmployee.id;

        EzClockerContext.ezInstance.ezActiveEmployeeReady = false;

        if (EzBoolean.isTrue(activeEmployeeClosed) || EzBoolean.isTrue(activatingEmployee) || EzBoolean.isTrue(activeEmployeeChanged)) {
            EzClockerContext.ezInstance.activeEmployee = EzClockerContext.ezCreateDefaultEmployee();

            EzClockerContext.ezInstance.ezResetActiveEmployeeDataProperties();
        }

        if (EzBoolean.isFalse(activeEmployeeClosed)) {
            EzClockerContext.ezInstance.ezAssignActiveEmployeeProperties(aEmployee);

            EzClockerContext.ezInstance.ezActiveEmployeeReady = true;
        }

        EzClockerContext.ezInstance.ezTriggerActiveEmployeeSetterEvents(
            activatingEmployee,
            activeEmployeeChanged,
            activeEmployeeUpdated,
            activeEmployeeClosed);
    }

    /**
     * @protected @method
     * Updates the active employee's properties to equal the provided aEmployee's properties.
     * @param {object} aEmployee
     */
    ezAssignActiveEmployeeProperties(aEmployee) {
        if (!EzObject.isValid(aEmployee)) {
            throw new EzBadParamException(
                'aEmployee',
                EzClockerContext.ezInstance,
                EzClockerContext.ezInstance.ezUpdateActiveEmployeeProperties);
        }

        EzClockerContext.ezInstance.activeEmployee.id = EzNumber.numberOrNull(aEmployee.id);

        EzClockerContext.ezInstance.activeEmployee.userId = EzNumber.numberOrNull(aEmployee.userId);

        EzClockerContext.ezInstance.activeEmployee.employerId = EzNumber.numberOrNull(aEmployee.employerId);

        EzClockerContext.ezInstance.activeEmployee.roleId = EzNumber.numberOrNull(aEmployee.roleId);

        EzClockerContext.ezInstance.activeEmployee.primaryRole = EzString.textOrDefault(aEmployee.primaryRole, 'ROLE_EMPLOYEE');

        EzClockerContext.ezInstance.activeEmployee.employeeNumber = EzString.stringOrEmpty(aEmployee.employeeNumber);

        EzClockerContext.ezInstance.activeEmployee.teamPin = EzString.stringOrEmpty(aEmployee.teamPin);

        EzClockerContext.ezInstance.activeEmployee.primaryJobCodeId = EzNumber.numberOrDefault(aEmployee.primaryJobCodeIdm, -1);

        EzClockerContext.ezInstance.activeEmployee.subscriptionId = EzNumber.numberOrNull(aEmployee.subscriptionId);

        EzClockerContext.ezInstance.activeEmployee.subscriptionInfoId = EzNumber.numberOrNull(aEmployee.subscriptionInfoId);

        EzClockerContext.ezInstance.activeEmployee.note = EzString.stringOrEmpty(aEmployee.note);

        EzClockerContext.ezInstance.activeEmployee.employeeName = EzString.stringOrEmpty(aEmployee.employeeName);

        EzClockerContext.ezInstance.activeEmployee.employeeContactEmail = EzString.stringOrEmpty(aEmployee.employeeContactEmail);

        EzClockerContext.ezInstance.activeEmployee.hourlyRate = EzNumber.numberOrNull(aEmployee.hourlyRate);

        EzClockerContext.ezInstance.activeEmployee.homeStreetAddress = EzString.stringOrEmpty(aEmployee.homeStreetAddress);

        EzClockerContext.ezInstance.activeEmployee.homeAddressAdditional = EzString.stringOrEmpty(aEmployee.homeAddressAdditional);

        EzClockerContext.ezInstance.activeEmployee.homeAddressCity = EzString.stringOrEmpty(aEmployee.homeAddressCity);

        EzClockerContext.ezInstance.activeEmployee.homeAddressState = EzString.stringOrEmpty(aEmployee.homeAddressState);

        EzClockerContext.ezInstance.activeEmployee.homeAddressPostalCode = EzString.stringOrEmpty(aEmployee.homeAddressPostalCode);

        EzClockerContext.ezInstance.activeEmployee.homePhone = EzString.stringOrEmpty(aEmployee.homePhone);

        EzClockerContext.ezInstance.activeEmployee.mobilePhone = EzString.stringOrEmpty(aEmployee.mobilePhone);

        EzClockerContext.ezInstance.activeEmployee.billingAddressSameAsHomeAddress = EzBoolean.isTrue(aEmployee.billingAddressSameAsHomeAddress);

        EzClockerContext.ezInstance.activeEmployee.billingStreetAddress = EzString.stringOrEmpty(aEmployee.billingStreetAddress);

        EzClockerContext.ezInstance.activeEmployee.billingAddressAdditional = EzString.stringOrEmpty(aEmployee.billingAddressAdditional);

        EzClockerContext.ezInstance.activeEmployee.billingAddressCity = EzString.stringOrEmpty(aEmployee.billingAddressCity);

        EzClockerContext.ezInstance.activeEmployee.billingAddressState = EzString.stringOrEmpty(aEmployee.billingAddressState);

        EzClockerContext.ezInstance.activeEmployee.billingAddressPostalCode = EzString.stringOrEmpty(aEmployee.billingAddressPostalCode);

        EzClockerContext.ezInstance.activeEmployee.billingPhone = EzString.stringOrEmpty(aEmployee.billingPhone);

        EzClockerContext.ezInstance.activeEmployee.freeTrialStartDateTimeIso = EzString.stringOrEmpty(aEmployee.freeTrialStartDateTimeIso);

        EzClockerContext.ezInstance.activeEmployee.invited = EzBoolean.isTrue(aEmployee.invited);

        EzClockerContext.ezInstance.activeEmployee.invitedIso = EzString.stringOrEmpty(aEmployee.invitedIso);

        EzClockerContext.ezInstance.activeEmployee.acceptedInvite = EzBoolean.isTrue(aEmployee.acceptedInvite);

        EzClockerContext.ezInstance.activeEmployee.acceptedInviteMethod = EzString.stringOrEmpty(aEmployee.acceptedMethod);

        EzClockerContext.ezInstance.activeEmployee.active = EzBoolean.isTrue(aEmployee.active);

        EzClockerContext.ezInstance.activeEmployee.deleted = EzBoolean.isTrue(aEmployee.deleted);

        EzClockerContext.ezInstance.activeEmployee.individualAccount = EzBoolean.isTrue(aEmployee.individualAccount);

        EzClockerContext.ezInstance.activeEmployee.createdDateTimeIso = EzString.stringOrEmpty(aEmployee.createdDateTimeIso);

        EzClockerContext.ezInstance.activeEmployee.updatedDateTimeIso = EzString.stringOrEmpty(aEmployee.updatedDateTimeIso);

        EzClockerContext.ezInstance.activeEmployee.updatedByUserId = EzString.stringOrEmpty(aEmployee.updatedByUserId);

        EzClockerContext.ezInstance.activeEmployee.receivedConsumerPrivacyActRequest = EzBoolean.isTrue(aEmployee.receivedConsumerPrivacyActRequest);

        EzClockerContext.ezInstance.activeEmployee.acceptedInviteIso = EzString.stringOrEmpty(aEmployee.acceptedInviteIso);

        EzClockerContext.ezInstance.activeEmployee.primaryJobCodeMap = EzObject.assignOrNull(aEmployee.primaryJobCodeMap);

        EzClockerContext.ezInstance.activeEmployee.clockInLocation = null;

        EzClockerContext.ezInstance.activeEmployee.clockInGPSLocation = EzObject.assignOrNull(aEmployee.clockInGPSLocation)

        EzClockerContext.ezInstance.activeEmployee.clockOutLocation = null;

        EzClockerContext.ezInstance.activeEmployee.clockOutGPSLocation = EzObject.assignOrNull(aEmployee.clockOutGPSLocation)

        EzClockerContext.ezInstance.activeEmployee.ready = true;
    }

    /**
     * @protected @method
     * Resets the active employee's data properties that are not part of the employee account.
     */
    ezResetActiveEmployeeDataProperties() {
        EzClockerContext.ezInstance.activeEmployee.timeEntries = [];

        EzClockerContext.ezInstance.activeEmployee.timeEntriesById = {};

        EzClockerContext.ezInstance.activeEmployee.timeEntriesTotal = EzClockerContext.DEFAULT_SELECTED_PERIOD_TOTAL;

        EzClockerContext.ezInstance.activeEmployee.timeEntryLocations = [];

        EzClockerContext.ezInstance.activeEmployee.assignedJobs = [];

        EzClockerContext.ezInstance.activeEmployee.timeEntriesById = {};

        EzClockerContext.ezInstance.activeEmployee.options = {};

        EzClockerContext.ezInstance.activeEmployee.permissions = {};
    }

    /**
     * @protected @method
        Triggers the events for EzClockerContext.ezInstance.ezSetSelectedEmployerActiveEmployeeById()
     * @param {Boolean} activatingEmployee
     * @param {Boolean} activeEmployeeChanged
     * @param {Boolean} activeEmployeeUpdated
     * @param {Boolean} activeEmployeeClosed
     */
    ezTriggerActiveEmployeeSetterEvents(activatingEmployee, activeEmployeeChanged, activeEmployeeUpdated, activeEmployeeClosed) {
        if (!ezApi.ezIsBoolean(activatingEmployee)) {
            throw new EzBadParamException(
                'activatingEmployee (ez-context-module-active-employee.js)',
                EzClockerContext.ezInstance,
                EzClockerContext.ezInstance.ezTriggerActiveEmployeeSetterEvents);
        }

        if (!ezApi.ezIsBoolean(activeEmployeeChanged)) {
            throw new EzBadParamException(
                'activeEmployeeChanged (ez-context-module-active-employee.js)',
                EzClockerContext.ezInstance,
                EzClockerContext.ezInstance.ezTriggerActiveEmployeeSetterEvents);
        }

        if (!ezApi.ezIsBoolean(activeEmployeeUpdated)) {
            throw new EzBadParamException(
                'activeEmployeeUpdated (ez-context-module-active-employee.js)',
                EzClockerContext.ezInstance,
                EzClockerContext.ezInstance.ezTriggerActiveEmployeeSetterEvents);
        }

        if (!ezApi.ezIsBoolean(activeEmployeeClosed)) {
            throw new EzBadParamException(
                'activeEmployeeClosed (ez-context-module-active-employee.js)',
                EzClockerContext.ezInstance,
                EzClockerContext.ezInstance.ezTriggerActiveEmployeeSetterEvents);
        }

        if (EzBoolean.isTrue(activeEmployeeClosed)) {
            // Trigger the onActiveEmployeeClosed if the active employee was ready and is now not ready.
            EzClockerContext.ezInstance.ezTriggerEzClockerContextEvent(
                EzClockerContextEventName.onActiveEmployeeClosed,
                'Active emplyee closed.');
        }

        if (EzBoolean.isTrue(activatingEmployee)) {
            // Trigger the onActiveEmployeeReady if the previous activeEmployee was not ready and now is.
            EzClockerContext.ezInstance.ezTriggerEzClockerContextEvent(
                EzClockerContextEventName.onActiveEmployeeReady,
                'Active employee is ready.',
                {
                    employee: EzClockerContext.ezInstance.activeEmployee,
                    activeClockIn: EzClockerContext.ezInstance.ezGetActiveEmployeeActiveClockIn()
                });

            return;
        }

        if (EzBoolean.isTrue(activeEmployeeChanged)) {
            // Trigger the onActiveEmployeeChanged event only if the previous activeEmployee was ready and
            // the activeEmployee id has changed
            EzClockerContext.ezInstance.ezTriggerEzClockerContextEvent(
                EzClockerContextEventName.onActiveEmployeeChanged,
                'Active employee changed.',
                {
                    employee: EzClockerContext.ezInstance.activeEmployee,
                    activeClockIn: EzClockerContext.ezInstance.ezGetActiveEmployeeActiveClockIn()
                });

            return;
        }

        if (EzBoolean.isTrue(activeEmployeeUpdated)) {
            // Trigger onActiveEmployeeUpdated event only if the activeEmployee was ready and the
            // activeEmployee id has not changed
            EzClockerContext.ezInstance.ezTriggerEzClockerContextEvent(
                EzClockerContextEventName.onActiveEmployeeUpdated,
                'Active employee updated.',
                {
                    employee: EzClockerContext.ezInstance.activeEmployee,
                    activeClockIn: EzClockerContext.ezInstance.ezGetActiveEmployeeActiveClockIn()
                });
        }
    }

    /**
     * @public @method
     * Gets the employee's user information (if not already cached on the active employee)
     * @returns {Promise}
     */
    ezGetActiveEmployeeUserInfo() {
        if (!EzObject.isValid(EzClockerContext.ezInstance.activeEmployer)) {
            throw new EzException(
                EzString.em`
                    A valid employer is required in call to
                    (ez-context-module-active-employee) EzClockerContext.ezGetActiveEmployeeUserInfo()`);
        }

        let aEmployee = EzClockerContext.ezInstance.ezGetActiveEmployee();

        if (!EzObject.isValid(aEmployee)) {
            throw new EzException(
                EzString.em`
                    A valid active employee is required in call to
                    (ez-context-module-active-employee) EzClockerContext.ezGetActiveEmployeeUserInfo()`);
        }

        return EzObject.isValid(aEmployee.userInfo)
            ? EzPromise.resolve({
                errorCode: 0,
                entity: aEmployee.userInfo
            })
            : EzClockerContext.ezInstance.ezRefreshActiveEmployeeUserInfo();
    }

    /**
     * @public @method
     * Gets the employee's user information (if not already cached on the active employee)
     * @returns {Promise}
     */
    ezRefreshActiveEmployeeUserInfo() {
        let aEmployer = EzClockerContext.ezInstance.activeEmployer;

        if (!EzObject.isValid(aEmployer)) {
            throw new EzException(
                EzString.em`
                    A valid active employer is required in call to
                    (ez-context-module-active-employee) EzClockerContext.ezRefreshActiveEmployeeUserInfo()`);
        }

        let activeEmployee = EzClockerContext.ezInstance.ezGetActiveEmployee();

        if (!EzObject.isValid(activeEmployee)) {
            throw new EzException(
                EzString.em`
                    A valid active employee is required in call to
                    (ez-context-module-active-employee) EzClockerContext.ezRefreshActiveEmployeeUserInfo()`);
        }

        return EzPromise.promise(
            (resolve, reject) => ezApi.ezclocker.ezAccountServices.ezGetEmployeeUserInfo(activeEmployee.id)
                .then(
                    (response) => {
                        activeEmployee.userInfo = response.entity;

                        ezApi.ezclocker.ezEventEngine.ezTriggerEvent(
                            EzClockerContextEventName.onActiveEmployeeUserInfoUpdated,
                            ezApi.ezclocker.ezEventEngine.ezBuildEventData(
                                EzClockerContext.ezApiName,
                                'Active employee user information updated.',
                                {
                                    activeEmployee: activeEmployee
                                }));

                        return resolve(response);
                    },
                    (eResponse) => {
                        activeEmployee.userInfo = null;

                        ezApi.ezclocker.ezLogger.error(
                            EzString.em`
                                Failed to get active employee with employeeId=${activeEmployee.id} user information.
                                Error: ${EzJson.toJson(eResponse)}`);

                        return reject(eResponse);
                    }));
    }

    /**
     * @public @method
        Invite or reinvite the employee to use ezClocker
        Triggers the EzClockerContextEventName.onActiveEmployeeInviteSuccess upon success
        Triggers the EzClockerContextEventName.onActiveEmployeeInviteFailure upon failure
     * @returns {Promise}
     */
    ezInviteActiveEmployee() {
        if (EzClockerAccountType.EMPLOYEE === EzClockerContext.ezInstance.ezGetActiveAccount().accountType ||
            EzClockerAccountType.PERSONAL === EzClockerContext.ezInstance.ezGetActiveAccount().accountType) {
            throw new EzException('Only Employer, Payroll Manager, and Managers accounts may invite employees');
        }

        let aEmployee = EzClockerContext.ezInstance.ezGetActiveEmployee();

        if (!EzObject.isValid(aEmployee)) {
            return;
        }

        let url = ezApi.ezclocker.nav.ezGetInternalApiUrl(
            ezApi.ezUrlTemplate`employer/reinvite-employee/
                ${aEmployee.id}
                ?timeZoneId=${ezApi.ezclocker.ezDateTime.activeTimeZone}`,
            'v1');

        return EzPromise.promise(
            (resolve, reject) => ezApi.ezclocker.ezHttpHelper.ezPost(url)
                .then(
                    ezApi.ezclocker.ezHttpHelper.ezProcessApiResolve,
                    ezApi.ezclocker.ezHttpHelper.ezProcessApiReject)
                .then(
                    (response) => {
                        ezApi.ezclocker.ezEventEngine.ezTriggerEvent(
                            EzClockerContextEventName.onActiveEmployeeInviteSuccess,
                            ezApi.ezclocker.ezEventEngine.ezBuildEventData(
                                EzClockerContext.ezApiName,
                                'Active employee invite sent with success.',
                                {
                                    response: response,
                                    employerId: aEmployee.employer_id,
                                    employeeId: aEmployee.id,
                                    employeeName: aEmployee.employeeName
                                }));

                        return resolve(response);
                    },
                    (eResponse) => {
                        ezApi.ezclocker.ezLogger.error(
                            `Employee re-invite failed. Error: ${EzJson.toJson(eResponse)}`);

                        ezApi.ezclocker.ezEventEngine.ezTriggerEvent(
                            EzClockerContextEventName.onActiveEmployeeInviteFailure,
                            ezApi.ezclocker.ezEventEngine.ezBuildEventData(
                                EzClockerContext.ezApiName,
                                'Active employee invite failed.',
                                {
                                    errorResponse: eResponse,
                                    employerId: aEmployee.employer_id,
                                    employeeId: aEmployee.id,
                                    employeeName: aEmployee.employeeName
                                }));

                        return reject(eResponse);
                    }));
    }

    /**
     * @public @method
     * Returns the Active Employee.
     * @returns {object}
     */
    ezGetActiveEmployee() {
        return EzClockerContext.ezInstance.activeEmployee;
    }

    /**
     * @public @method
     * Returns the active employee's primary job code id
     * @returns {Promise}
        Promise.resolve returns the primary data tag map object.
        Promise.reject returns null
     */
    ezGetActiveEmployeePrimaryJobCodeId() {
        if (!EzObject.isValid(EzClockerContext.ezInstance.ezGetActiveEmployee())) {
            throw new EzException('A active employee is required in EzClockerContext.ezInstance.ezGetActiveEmployeePrimaryJobCodeId');
        }

        return EzPromise.promise(
            (resolve, reject) => ezApi.ezclocker.ezInternalDataTagMapApiClient.ezGetPrimaryDataTagForAssignedEntityTypeNameAssignedEntityId(
                EzEntityType.EMPLOYEE,
                EzClockerContext.ezInstance.ezGetActiveEmployee().id)
                .then(
                    (ezEntityResponse) => {
                        EzClockerContext.ezInstance.ezGetActiveEmployee().primaryJobCodeId = ezEntityResponse.entity;

                        return resolve(ezEntityResponse.entity)
                    },
                    (ezEntityErrorResponse) => {
                        ezApi.ezclocker.ezLogger.error(
                            EzString.em`
                                Failed to obtain the primary job code id for the currently active employee
                                with employeeId=${EzClockerContext.ezInstance.ezGetActiveEmployee().id}.
                                Error response: ${EzJson.toJson(ezEntityErrorResponse)}`);

                        return reject(null);
                    }));
    }

    /**
     * @public @method
        Appends a time entry to the active employee's list of time entries.
     * @param {object} appendingTimeEntry
     */
    ezActiveEmployeeAppendTimeEntry(appendingTimeEntry) {
        if (!EzObject.isValid(EzClockerContext.ezInstance.activeEmployer)) {
            throw new EzException('A active employer is required in EzClockerContext.ezActiveEmployeeAppendTimeEntry');
        }

        if (EzBoolean.isFalse(EzClockerContext.ezInstance.ezIsActiveEmployeeReady())) {
            throw new EzException('A Active Employee is required in EzClockerContext.ezActiveEmployeeAppendTimeEntry');
        }

        if (!EzObject.isValid(appendingTimeEntry)) {
            throw new EzBadParamException(
                'appendingTimeEntry',
                EzClockerContext.ezInstance,
                EzClockerContext.ezInstance.ezActiveEmployeeAppendTimeEntry);
        }

        if (!EzArray.isArray(EzClockerContext.ezInstance.ezGetActiveEmployee().timeEntries)) {
            EzClockerContext.ezInstance.ezGetActiveEmployee().timeEntries = [];
        }

        EzClockerContext.ezInstance.activeEmployee.timeEntries.push(appendingTimeEntry);

        EzClockerContext.ezInstance.activeEmployee.timeEntries =
            EzClockerContext.ezInstance.ezSortTimeEntryArray(EzClockerContext.ezInstance.activeEmployee.timeEntries);

        // Sort and re-index the active employee time entries.
        EzClockerContext.ezInstance.activeEmployee.timeEntriesById =
            EzClockerContext.ezInstance.ezIndexTimeEntriesById(EzClockerContext.ezInstance.activeEmployee.timeEntries);

        EzClockerContext.ezInstance.ezTriggerEzClockerContextEvent(
            EzClockerContextEventName.onActiveEmployeeTimeEntriesChanged,
            'Active employee time entries updated.',
            {
                employee: EzClockerContext.ezInstance.activeEmployee,
                timeEntries: EzClockerContext.ezInstance.activeEmployee.timeEntries,
                timeEntriesById: EzClockerContext.ezInstance.activeEmployee.timeEntriesById,
                timeEntryLocations: EzClockerContext.ezInstance.activeEmployee.timeEntryLocations,
                timeEntriesTotal: EzClockerContext.ezInstance.activeEmployee.timeEntriesTotal
            });
    }

    /**
     * @public @method
        Queries the active employee's time entrys for the provided selected period.
     * @param {object} selectedPeriod
     * @returns {Promise.resolve}
        A resolve only promise
     */
    ezRefreshActiveEmployeeTimeEntriesForPeriod(selectedPeriod) {
        if (!EzObject.isValid(selectedPeriod) || !EzObject.isValid(selectedPeriod.ezPeriodStartMoment) ||
            !EzObject.isValid(selectedPeriod.ezPeriodEndMoment)) {
            throw new EzBadParamException(
                'selectedPeriod',
                EzClockerContext.ezInstance,
                EzClockerContext.ezInstance.ezRefreshActiveEmployeeTimeEntriesForPeriod);
        }

        if (!EzObject.isValid(EzClockerContext.ezInstance.activeEmployer)) {
            throw new EzException(
                EzString.em`
                    A active employer is required in
                    EzClockerContext.ezInstance.ezRefreshActiveEmployeeTimeEntriesForPeriod(...)`);
        }

        if (EzBoolean.isFalse(EzClockerContext.ezInstance.ezIsActiveEmployeeReady())) {
            throw new EzException(
                EzString.em`
                    A Active Employee is required in
                    EzClockerContext.ezInstance.ezRefreshActiveEmployeeTimeEntriesForPeriod(...)`);
        }

        return EzPromise.asyncAction(
            (resolve) => ezApi.ezclocker.ezTimeEntryService.ezQuery(
                EzClockerContext.ezInstance.activeEmployer.id,
                EzClockerContext.ezInstance.activeEmployee.id,
                selectedPeriod.ezPeriodStartMoment,
                selectedPeriod.ezPeriodEndMoment)
                .then(
                    (response) => EzClockerContext.ezInstance.ezRefreshActiveEmployeeActiveClockIn()
                        .then(EzClockerContext.ezInstance.ezRefreshActiveEmployeeActiveBreak)
                        .then(
                            () => {
                                EzClockerContext.ezInstance.ezSetActiveEmployeeTimeEntryLocations(response.timeEntryLocations);

                                EzClockerContext.ezInstance.ezSetTimeEntrySelectedPeriodTotals(response);

                                // WARNING: ezSetActiveEmployeeTimeEntries needs to be the last call to fire the event properly
                                EzClockerContext.ezInstance.ezSetActiveEmployeeTimeEntries(response.timeEntries);

                                return resolve(response);
                            }),
                    (eResponse) => {
                        ezApi.ezclocker.ezLogger.error(
                            EzString.em`
                                Failed to obtain the Active Employee's time entries.
                                Error: ${EzJson.toJson(eResponse)}`);

                        EzClockerContext.ezInstance.ezSetActiveEmployeeTimeEntryLocations([]);

                        EzClockerContext.ezInstance.ezSetTimeEntrySelectedPeriodTotals(eResponse);

                        // ezSetActiveEmployeeTimeEntries needs to be the last call to fire the event properly
                        EzClockerContext.ezInstance.ezSetActiveEmployeeTimeEntries([]);

                        return resolve(eResponse);
                    }));
    }

    /**
     * @public @method
     * Returns the active employee's time entries (if any)
     * @returns {array}
     */
    ezGetActiveEmployeeTimeEntries() {
        if (EzBoolean.isFalse(EzClockerContext.ezInstance.ezIsActiveEmployeeReady())) {
            throw new EzException(
                EzString.em`
                    A active employee is required in
                    EzClockerContext.ezInstance.ezGetActiveEmployeeTimeEntries()`);
        }

        if (!EzArray.isArray(EzClockerContext.ezInstance.ezGetActiveEmployee().timeEntries)) {
            EzClockerContext.ezInstance.ezGetActiveEmployee().timeEntries = [];
        }

        return EzClockerContext.ezInstance.ezGetActiveEmployee().timeEntries;
    }

    /**
     * @public @method
     * Returns the active employee's time entry located at the provided employeeTimeEntryIndex
     * @param {number} employeeTimeEntryIndex
     * @returns {Object|null}
     */
    ezGetActiveEmployeeTimeEntryByIndex(employeeTimeEntryIndex) {
        if (EzBoolean.isFalse(EzClockerContext.ezInstance.ezIsActiveEmployeeReady())) {
            throw new EzException(
                EzString.em`
                    An active account is required for call
                    EzClockerContext.ezInstance.ezGetActiveEmployeeTimeEntryByIndex(...)`);
        }

        if (!EzNumber.isNumber(employeeTimeEntryIndex)) {
            throw new EzBadParamException(
                'employeeTimeEntryIndex',
                EzClockerContext.ezInstance,
                EzClockerContext.ezInstance.ezGetActiveEmployeeTimeEntryByIndex);
        }

        if (!EzArray.isArray(EzClockerContext.ezInstance.activeEmployee.timeEntries)) {
            EzClockerContext.ezInstance.activeEmployee.timeEntries = [];
        }

        if (employeeTimeEntryIndex >= EzClockerContext.ezInstance.activeEmployee.timeEntries.length ||
            0 > employeeTimeEntryIndex) {
            return null;
        }

        return EzClockerContext.ezInstance.activeEmployee.timeEntries[employeeTimeEntryIndex.toString()];
    }

    /**
     * @public @method
     * @param {array|null} activeEmployeeTimeEntryLocationsToUse
     */
    ezSetActiveEmployeeTimeEntryLocations(timeEntryLocationsToUse) {
        if (EzBoolean.isFalse(EzClockerContext.ezInstance.ezIsActiveEmployeeReady())) {
            throw new EzException(
                EzString.em`
                    An active account is required for call
                    EzClockerContext.ezInstance.ezSetActiveEmployeeTimeEntryLocations(...)`);
        }

        EzClockerContext.ezInstance.activeEmployee.timeEntryLocations = EzArray.isArray(timeEntryLocationsToUse)
            ? timeEntryLocationsToUse
            : [];
    }

    /**
     * @public @method
     * @param {number} employeeTimeEntryIndex
     * @returns {Object|null}
     */
    ezGetActiveEmployeeTimeEntryLocationsByIndex(employeeTimeEntryIndex) {
        if (EzBoolean.isFalse(EzClockerContext.ezInstance.ezIsActiveEmployeeReady())) {
            throw new EzException(EzString.em`
                An active account is required for call
                EzClockerContext.ezInstance.ezGetActiveEmployeeTimeEntryLocationsByIndex(...)`);
        }

        if (!EzNumber.isNumber(employeeTimeEntryIndex)) {
            throw new EzBadParamException(
                'employeeTimeEntryIndex',
                EzClockerContext.ezInstance,
                EzClockerContext.ezInstance.ezGetActiveEmployeeTimeEntryLocationsByIndex);
        }

        if (!EzArray.isArray(EzClockerContext.ezInstance.activeEmployee.timeEntryLocations)) {
            EzClockerContext.ezInstance.activeEmployee.timeEntryLocations = [];
        }

        if (employeeTimeEntryIndex >= EzClockerContext.ezInstance.activeEmployee.timeEntryLocations.length ||
            0 > employeeTimeEntryIndex) {
            return null;
        }

        let timeEntryIndex = employeeTimeEntryIndex.toString();

        return {
            clockInLocation: EzClockerContext.ezInstance.activeEmployee.timeEntries[timeEntryIndex].clockInLocation,
            clockOutLocation: EzClockerContext.ezInstance.activeEmployee.timeEntries[timeEntryIndex].clockOutLocation
        };
    }

    /**
     * @puiblic @method
     * Returns the active employee's period total
     * @returns {string}
     */
    ezGetActiveEmployeePeriodTotal() {
        if (EzBoolean.isFalse(EzClockerContext.ezInstance.ezIsActiveEmployeeReady())) {
            throw new EzException(
                EzString.em`
                    A Active Employee is required in
                    EzClockerContext.ezInstance.ezGetActiveEmployeePeriodTotal()`);
        }

        return ezApi.ezIsNotEmptyString(EzClockerContext.ezInstance.ezGetActiveEmployee().selectedPeriodTotal)
            ? EzClockerContext.ezInstance.ezGetActiveEmployee().selectedPeriodTotal
            : EzClockerContext.DEFAULT_SELECTED_PERIOD_TOTAL;
    }

    /**
     * @public @method
     * @param {array|null} activeTimeEntriesToUse
     * @returns {object}
        {
             employee: EzClockerContext.ezInstance.activeEmployee,
             timeEntries: EzClockerContext.ezInstance.activeEmployee.timeEntries,
             timeEntriesById: EzClockerContext.ezInstance.activeEmployee.timeEntriesById,
             timeEntryLocations: EzClockerContext.ezInstance.activeEmployee.timeEntryLocations
             timeEntriesTotal: EzClockerContext.ezInstance.activeEmployee.timeEntriesTotal
        }
     */
    ezSetActiveEmployeeTimeEntries(activeTimeEntriesToUse) {
        if (EzBoolean.isFalse(EzClockerContext.ezInstance.ezIsActiveEmployeeReady())) {
            throw new EzException(
                EzString.em`
                    A Active Employee is required in
                    EzClockerContext.ezInstance.ezSetActiveEmployeeTimeEntries(...)`);
        }

        EzClockerContext.ezInstance.activeEmployee.timeEntries = EzArray.arrayHasLength(activeTimeEntriesToUse)
            ? EzClockerContext.ezInstance.ezSortTimeEntryArray(activeTimeEntriesToUse)
            : [];

        // Index by id
        EzClockerContext.ezInstance.ezIndexActiveEmployeeTimeEntriesById();

        EzClockerContext.ezInstance.ezTriggerEzClockerContextEvent(
            EzClockerContextEventName.onActiveEmployeeTimeEntriesChanged,
            'Active employee time entries updated.',
            {
                employee: EzClockerContext.ezInstance.activeEmployee,
                timeEntries: EzClockerContext.ezInstance.activeEmployee.timeEntries,
                timeEntriesById: EzClockerContext.ezInstance.activeEmployee.timeEntriesById,
                timeEntryLocations: EzClockerContext.ezInstance.activeEmployee.timeEntryLocations,
                timeEntriesTotal: EzClockerContext.ezInstance.activeEmployee.timeEntriesTotal
            });
    }

    /**
     * @public @method
     * Sets the active employee selected period time entries total values.
        Pass in the response JSON from the /_api/v2/timeentries/period api (see
        the ezRefreshActiveEmployeeTimeEntriesForPeriod function in this JS file)
     * @param {object} ezQueryTimeEntriesResponse
     * @returns {object}
     * Returns the EzClockerContext.ezInstance.activeEmployee.selectedPeriodTotals
     */
    ezSetTimeEntrySelectedPeriodTotals(ezQueryTimeEntriesResponse) {
        if (EzBoolean.isFalse(EzClockerContext.ezInstance.ezIsActiveEmployeeReady())) {
            throw new EzException(
                EzString.em`
                    A Active Employee is required in
                    EzClockerContext.ezInstance.ezSetTimeEntrySelectedPeriodTotals(...)`);
        }
        if (!EzObject.isValid(ezQueryTimeEntriesResponse)) {
            throw new EzBadParamException(
                'ezQueryTimeEntriesResponse',
                EzClockerContext.ezInstance,
                EzClockerContext.ezInstance.ezSetTimeEntrySelectedPeriodTotals);
        }

        let firstTime = !EzObject.isValid(EzClockerContext.ezInstance.activeEmployee.selectedPeriodTotals) ||
            EzBoolean.isFalse(EzClockerContext.ezInstance.activeEmployee.selectedPeriodTotals.ready);

        let currentSelectedPeriodTotals =
            EzObject.isValid(EzClockerContext.ezInstance.activeEmployee.selectedPeriodTotals)
                ? {
                    ready: true,
                    totalDecimalHours:
                        EzString.hasLength(
                            EzClockerContext.ezInstance.activeEmployee.selectedPeriodTotals.totalDecimalHours)
                            ? EzClockerContext.ezInstance.activeEmployee.selectedPeriodTotals.totalDecimalHours
                            : '0',
                    totalHours:
                        EzString.hasLength(
                            EzClockerContext.ezInstance.activeEmployee.selectedPeriodTotals.totalHours)
                            ? EzClockerContext.ezInstance.activeEmployee.selectedPeriodTotals.totalHours
                            : EzClockerContext.DEFAULT_SELECTED_PERIOD_TOTAL,
                    totalMilliseconds:
                        EzNumber.isNumber(
                            EzClockerContext.ezInstance.activeEmployee.selectedPeriodTotals.totalMilliseconds)
                            ? EzClockerContext.ezInstance.activeEmployee.selectedPeriodTotals.totalMilliseconds
                            : 0
                }
                : {
                    ready: true,
                    totalDecimalHours: '0',
                    totalHours: EzClockerContext.DEFAULT_SELECTED_PERIOD_TOTAL,
                    totalMilliseconds: 0
                };

        EzClockerContext.ezInstance.activeEmployee.selectedPeriodTotals = {
            ready: true,
            totalDecimalHours: EzString.hasLength(ezQueryTimeEntriesResponse.totalAsDecimalHours)
                ? ezQueryTimeEntriesResponse.totalAsDecimalHours
                : '0',
            totalHours: EzString.hasLength(ezQueryTimeEntriesResponse.total)
                ? ezQueryTimeEntriesResponse.total
                : EzClockerContext.DEFAULT_SELECTED_PERIOD_TOTAL,
            totalMilliseconds: EzNumber.isNumber(ezQueryTimeEntriesResponse.totalMilliseconds)
                ? ezQueryTimeEntriesResponse.totalMilliseconds
                : 0
        };

        // Legacy selected period total assignment
        EzClockerContext.ezInstance.activeEmployee.timeEntriesTotal =
            EzClockerContext.ezInstance.activeEmployee.selectedPeriodTotals.totalHours;

        let updated =
            currentSelectedPeriodTotals.totalDecimalHours !==
            EzClockerContext.ezInstance.activeEmployee.selectedPeriodTotals.totalDecimalHours ||
            currentSelectedPeriodTotals.totalHours !==
            EzClockerContext.ezInstance.activeEmployee.selectedPeriodTotals.totalHours ||
            currentSelectedPeriodTotals.totalMilliseconds !==
            EzClockerContext.ezInstance.activeEmployee.selectedPeriodTotals.totalMilliseconds;

        if (firstTime) {
            EzClockerContext.ezInstance.ezTriggerEzClockerContextEvent(
                EzClockerContextEventName.onActiveEmployeeSelectedPeriodTotalsReady,
                'Active employee time entry selected period totals ready',
                {
                    activeEmployee: EzClockerContext.ezInstance.activeEmployee,
                    selectedPeriodTotals: EzClockerContext.ezInstance.activeEmployee.selectedPeriodTotals
                });
        }

        if (!firstTime && updated) {
            EzClockerContext.ezInstance.ezTriggerEzClockerContextEvent(
                EzClockerContextEventName.onActiveEmployeeSelectedPeriodTotalsUpdated,
                'Active employee time entry selected period totals updated',
                {
                    activeEmployee: EzClockerContext.ezInstance.activeEmployee,
                    selectedPeriodTotals: EzClockerContext.ezInstance.activeEmployee.selectedPeriodTotals
                });
        }

        return EzClockerContext.ezInstance.activeEmployee.selectedPeriodTotals;
    }

    /**
     * @protected @method
     * Indexes the active employee time entries by id
     */
    ezIndexActiveEmployeeTimeEntriesById() {
        if (EzBoolean.isFalse(EzClockerContext.ezInstance.ezIsActiveEmployeeReady())) {
            throw new EzException(
                EzString.em`
                    A Active Employee is required in
                    EzClockerContext.ezInstance.ezIndexActiveEmployeeTimeEntriesById()`);
        }

        EzClockerContext.ezInstance.activeEmployee.timeEntriesById = {};

        for (let x = 0; x < EzClockerContext.ezInstance.activeEmployee.timeEntries.length; x++) {
            let timeEntry = EzClockerContext.ezInstance.activeEmployee.timeEntries[x];

            timeEntry.employeeTimeEntryIndex = x;

            EzClockerContext.ezInstance.activeEmployee.timeEntriesById[timeEntry.id.toString()] = timeEntry;
        }
    }

    /**
     * @public @method
     * Recalculates the active employee's time entries total
     */
    ezRecalculateActiveEmployeeTimeEntriesTotal() {
        if (EzBoolean.isFalse(EzClockerContext.ezInstance.ezIsActiveEmployeeReady())) {
            throw new EzException(
                EzString.em`
                    A Active Employee is required in
                    EzClockerContext.ezInstance.ezRecalculateActiveEmployeeTimeEntriesTotal()`);
        }

        let totalMS = 0;

        EzClockerContext.ezInstance.activeEmployee.timeEntries.forEach(
            (timeEntry) => {
                totalMS += EzClockerContext.ezInstance.ezRecalculateTimeEntryTotal(timeEntry).durationMilliseconds;
            });

        let totalDuration = moment.duration(totalMS);

        let timeEntriesTotal = ezApi.ezclocker.ezDateTime.ezBuildShiftTotalString(
            // includeDays
            false,
            // days
            0,
            // includeHours
            true,
            // hours
            totalDuration.hours() + totalDuration.days(),
            // includeMinutes
            true,
            // minutes
            totalDuration.minutes(),
            // includeSeconds
            false,
            // seconds
            0,
            // includeMilliseconds
            false,
            // milliseconds
            0);

        EzClockerContext.ezInstance.activeEmployee.timeEntriesTotal = timeEntriesTotal;
    }

    /**
     * @public @method
     * Recalculates the totals of the provided timeEntry
     * @param {object} timeEntry
     * @returns {object}
     * Returns the time entry provided
     */
    ezRecalculateTimeEntryTotal(timeEntry) {
        if (!EzObject.isValid(timeEntry)) {
            throw new EzBadParamException(
                'timeEntry',
                EzClockerContext.ezInstance,
                EzClockerContext.ezInstance.ezRecalculateTimeEntryTotal);
        }

        let clockInMoment = EzString.hasLength(timeEntry.clockInIso)
            ? ezApi.ezclocker.ezDateTime.ezFromIso(timeEntry.clockInIso)
            : null;

        let clockOutMoment = EzString.hasLength(timeEntry.clockOutIso)
            ? ezApi.ezclocker.ezDateTime.ezFromIso(timeEntry.clockOutIso)
            : null;

        if (null == clockInMoment || null == clockOutMoment) {
            timeEntry.durationInHours = 0;
            timeEntry.durationInMinutes = 0;
            timeEntry.durationInSeconds = 0;
            timeEntry.durationMilliseconds = 0;
            timeEntry.millisecondsDuration = 0;

            timeEntry.totalDays = 0;
            timeEntry.totalHours = 0;
            timeEntry.totalSeconds = 0;
            timeEntry.totalMinutes = 0;
            timeEntry.totalMilliseconds = 0;

            timeEntry.durationDecimalHours = 0;

            timeEntry.totalForShift = '00:00';
            timeEntry.totalTime = '00:00';
            return timeEntry;
        }

        let duration = ezApi.ezclocker.ezDateTime.ezCalculateDuration(clockInMoment, clockOutMoment);

        timeEntry.durationInHours = duration.asMilliseconds() / 1000 / 60 / 60;

        timeEntry.durationInMinutes = duration.asMilliseconds() / 1000 / 60;

        timeEntry.durationInSeconds = duration.asMilliseconds() / 1000;

        timeEntry.durationMilliseconds = duration.asMilliseconds();

        timeEntry.millisecondsDuration = duration.asMilliseconds();

        timeEntry.totalDays = duration.days();

        timeEntry.totalHours = duration.hours();

        timeEntry.totalSeconds = duration.seconds();

        timeEntry.totalMinutes = duration.minutes();

        timeEntry.totalMilliseconds = duration.milliseconds();

        timeEntry.durationDecimalHours =
            duration.hours() +
            (duration.minutes() / 60) +
            (duration.seconds() / 3600) +
            (duration.milliseconds / 3600000);

        timeEntry.totalForShift = ezApi.ezclocker.ezDateTime.ezDurationToShiftTotal(duration);

        timeEntry.totalTime = ezApi.ezclocker.ezDateTime.ezDurationToShiftTotal(duration);

        return timeEntry;
    }

    /**
     * @public @method
     * Updates the provided time entry in the cached active employee's time entries. If it does not exist,
        it is added. Finishes by re-calculating the total time.
     */
    ezUpdateActiveEmployeeTimeEntry(timeEntry) {
        if (EzBoolean.isFalse(EzClockerContext.ezInstance.ezIsActiveEmployeeReady())) {
            throw new EzException(
                EzString.em`
                    A Active Employee is required in
                    EzClockerContext.ezInstance.ezUpdateActiveEmployeeTimeEntry(...)`);
        }
        if (!EzObject.isValid(timeEntry) || !EzNumber.isNumber(timeEntry.id)) {
            throw new EzBadParamException(
                'timeEntry',
                EzClockerContext.ezInstance,
                EzClockerContext.ezInstance.ezUpdateActiveEmployeeTimeEntry);
        }

        if (!EzObject.isValid(EzClockerContext.ezInstance.activeEmployee.timeEntriesById)) {
            EzClockerContext.ezInstance.activeEmployee.timeEntriesById = {};
        }

        if (!EzArray.isArray(EzClockerContext.ezInstance.activeEmployee.timeEntries)) {
            EzClockerContext.ezInstance.activeEmployee.timeEntries = [];
        }

        let timeEntryIdStr = timeEntry.id.toString();

        if (!EzObject.hasProperty(EzClockerContext.ezInstance.activeEmployee.timeEntriesById, timeEntryIdStr)) {
            EzClockerContext.ezInstance.activeEmployee.timeEntries.push(timeEntry);

            EzClockerContext.ezInstance.activeEmployee.timeEntries =
                EzClockerContext.ezInstance.ezSortTimeEntryArray(
                    EzClockerContext.ezInstance.activeEmployee.timeEntries);

            EzClockerContext.ezInstance.activeEmployee.timeEntriesById =
                EzClockerContext.ezInstance.ezIndexTimeEntriesById(
                    EzClockerContext.ezInstance.activeEmployee.timeEntries);

            EzClockerContext.ezInstance.ezRecalculateActiveEmployeeTimeEntriesTotal();

            return EzClockerContext.ezInstance.activeEmployee.timeEntriesById[timeEntryIdStr];
        }

        if (!EzNumber.isNumber(EzClockerContext.ezInstance.activeEmployee.timeEntriesById[timeEntryIdStr].employeeTimeEntryIndex)) {
            EzClockerContext.ezInstance.activeEmployee.timeEntriesById =
                EzClockerContext.ezInstance.ezIndexTimeEntriesById(
                    EzClockerContext.ezInstance.activeEmployee.timeEntries);
        }

        let timeEntryIndexStr = EzClockerContext
            .ezInstance
            .activeEmployee
            .timeEntriesById[timeEntryIdStr]
            .employeeTimeEntryIndex
            .toString();

        EzClockerContext.ezInstance.activeEmployee.timeEntries[timeEntryIndexStr] = timeEntry;

        EzClockerContext.ezInstance.ezRecalculateActiveEmployeeTimeEntriesTotal();

        return EzClockerContext.ezInstance.activeEmployee.timeEntriesById[timeEntryIdStr];
    }

    /**
     * @public @method
     * Obtains the logged in employee's active clock reference and status.
     * @returns {Proimise.resolve}
        {
             employee: EzClockerContext.ezInstance.ezGetActiveEmployee(),
             activeClockIn: EzClockerContext.ezInstance.ezGetActiveEmployeeActiveClockIn()
        }
     */
    ezRefreshActiveEmployeeActiveClockIn() {
        if (!EzObject.isValid(EzClockerContext.ezInstance.activeEmployer)) {
            throw new EzException(
                EzString.em`
                    An active employer is required for
                    EzClockerContext.ezInstance.ezRefreshActiveEmployeeActiveClockIn()`);
        }
        if (EzBoolean.isFalse(EzClockerContext.ezInstance.ezIsActiveEmployeeReady())) {
            throw new EzException(
                EzString.em`
                    An Active Employee is required for
                    EzClockerContext.ezInstance.ezRefreshActiveEmployeeActiveClockIn()`);
        }

        return EzPromise.asyncAction(
            (finished) => ezApi.ezclocker.ezTimeEntryService.ezGetActiveClockIn(EzClockerContext.ezInstance.ezGetActiveEmployee().id)
                .then(
                    (response) => {
                        if ('false' === response.message) {
                            EzClockerContext.ezInstance.ezSetActiveEmployeeActiveClockIn(null);
                        } else {
                            EzClockerContext.ezInstance.ezSetActiveEmployeeActiveClockIn(response.timeEntry);
                        }

                        return finished({
                            employee: EzClockerContext.ezInstance.ezGetActiveEmployee(),
                            activeClockIn: EzClockerContext.ezInstance.ezGetActiveEmployeeActiveClockIn()
                        });
                    },
                    (eResponse) => {
                        ezApi.ezclocker.ezLogger.error(
                            EzString.em`
                                Failed to obtain the Active Employee\'s active clock in.
                                Error: ${EzJson.toJson(eResponse)}`);

                        return finished({
                            employee: EzClockerContext.ezInstance.ezGetActiveEmployee(),
                            activeClockIn: EzClockerContext.ezInstance.ezGetActiveEmployeeActiveClockIn()
                        });
                    }));
    }

    /**
     * @public @method
     * Returns the active employee's active clock in value.
     * @returns {object}
     */
    ezGetActiveEmployeeActiveClockIn() {
        if (EzBoolean.isFalse(EzClockerContext.ezInstance.ezIsActiveEmployeeReady())) {
            throw new EzException(
                EzString.em`
                    An Active Employee is required for
                    EzClockerContext.ezInstance.ezGetActiveEmployeeActiveClockIn`);
        }

        return EzClockerContext.ezInstance.activeEmployee.activeClockIn;
    }

    /**
     * @public @method
     * Sets the activ employee's active  clock in.
     */
    ezSetActiveEmployeeActiveClockIn(activeClockIn) {
        if (EzBoolean.isFalse(EzClockerContext.ezInstance.ezIsActiveEmployeeReady())) {
            throw new EzException(
                EzString.em`
                    A valid active employee is required for
                    EzClockerContext.ezInstance.ezSetActiveEmployeeActiveClockIn`);
        }

        if (!EzObject.isValid(activeClockIn)) {
            EzClockerContext.ezInstance.activeEmployee.activeClockIn = null;

            EzClockerContext.ezInstance.activeEmployee.isActiveClockIn = false;
            EzClockerContext.ezInstance.activeEmployee.isActiveBreak = false;
            EzClockerContext.ezInstance.activeEmployee.activeClockIn = null;

            EzClockerContext.ezInstance.ezTriggerEzClockerContextEvent(
                EzClockerContextEventName.onActiveEmployeeActiveClockInChanged,
                'Active clock-in has changed',
                {
                    employee: EzClockerContext.ezInstance.activeEmployee,
                    activeClockIn: null
                });

            return;
        }

        if (!EzObject.isValid(EzClockerContext.ezInstance.activeEmployee.activeClockIn) ||
            activeClockIn.id !== EzClockerContext.ezInstance.activeEmployee.activeClockIn.id ||
            activeClockIn.clockInIso != EzClockerContext.ezInstance.activeEmployee.activeClockIn.clockInIso ||
            activeClockIn.clockOutIso != EzClockerContext.ezInstance.activeEmployee.activeClockIn.clockOutIso ||
            activeClockIn.isActiveClockIn != EzClockerContext.ezInstance.activeEmployee.activeClockIn.isActiveClockIn ||
            activeClockIn.isActiveBreak != EzClockerContext.ezInstance.activeEmployee.activeClockIn.isActiveBreak) {

            EzClockerContext.ezInstance.activeEmployee.activeClockIn = activeClockIn;

            EzClockerContext.ezInstance.activeEmployee.isActiveClockIn = activeClockIn.isActiveBreak;
            EzClockerContext.ezInstance.activeEmployee.isActiveBreak = activeClockIn.isActiveBreak;

            EzClockerContext.ezInstance.ezTriggerEzClockerContextEvent(
                EzClockerContextEventName.onActiveEmployeeActiveClockInChanged,
                'Active clock-in has changed',
                {
                    employee: EzClockerContext.ezInstance.activeEmployee,
                    activeClockIn: EzClockerContext.ezInstance.activeEmployee.activeClockIn
                });
        }
    }

    /**
     * @public @method
        Pulls the Active Employee data from the ezClocker services again to update to the latest DB record.
     * @returns {Promise.resolve}
     */
    ezRefreshActiveEmployee() {
        if (!EzObject.isValid(EzClockerContext.ezInstance.activeEmployer)) {
            throw new EzException(
                EzString.em`
                    An active employer is required for
                    EzClockerContext.ezInstance.ezRefreshActiveEmployee`);
        }
        return EzPromise.asyncAction(
            (resolve) => {
                if (EzBoolean.isFalse(EzClockerContext.ezInstance.ezIsActiveEmployeeReady())) {
                    // No active employe, nothing to refresh
                    return resolve(EzClockerContext.ezInstance.ezGetActiveEmployee());
                }

                let currentlyActiveEmployee = EzClockerContext.ezInstance.ezGetActiveEmployee();

                if (!EzObject.isValid(currentlyActiveEmployee)) {
                    ezApi.ezclocker.ezLogger.error(
                        EzString.em`
                            Unable to refresh the active employee due to the following error:
                            The active employee is undefined, null.`);

                    // No active employe, nothing to refresh
                    return resolve(EzClockerContext.ezInstance.ezGetActiveEmployee());
                }

                if (!EzNumber.isNumber(currentlyActiveEmployee.employerEmployeeIndex) || 0 > currentlyActiveEmployee.employerEmployeeIndex) {
                    if (EzArray.hasLength(EzClockerContext.ezInstance.employerContext.selectedEmployerAccountEmployeeAccounts)) {
                        EzClockerContext.ezInstance.ezIndexEmployeeAccountsById(
                            EzClockerContext.ezInstance.employerContext.selectedEmployerAccountEmployeeAccounts);
                    }
                }

                return ezApi.ezclocker.ezEmployeeService.ezGetEmployee(currentlyActiveEmployee.id)
                    .then(
                        (updatedActiveEmployeeResponse) => {
                            let updatedActiveEmployee = updatedActiveEmployeeResponse.entity;

                            if (!EzObject.isValid(updatedActiveEmployee)) {
                                ezApi.ezclocker.ezLogger.error(
                                    EzString.em`
                                        Failed to refresh the active employee due to the following error:
                                        Get employee for activeEmployeeId={currentlyActiveEmployee.id} return undefined or null.
                                        [Active employee: ${EzJson.toJson(currentlyActiveEmployee)}`);

                                return resolve(EzClockerContext.ezInstance.ezGetActiveEmployee());
                            }

                            updatedActiveEmployee.employerEmployeeIndex = currentlyActiveEmployee.employerEmployeeIndex;

                            EzClockerContext.ezInstance.ezUpdateSelectedEmployerEmployeeCacheById(updatedActiveEmployee);

                            EzClockerContext.ezInstance.ezAssignActiveEmployee(updatedActiveEmployee);

                            return EzClockerContext.ezInstance.ezRefreshActiveEmployeeUserInfo()
                                .then(
                                    () => resolve(EzClockerContext.ezInstance.ezGetActiveEmployee()));
                        },
                        (eResponse) => {
                            let em = EzObject.isValid(eResponse) && EzString.hasLength(eResponse.message)
                                ? eResponse.message
                                : 'Unexpected exception (no message provided)';

                            ezApi.ezclocker.ezLogger.error(
                                `Failed to refresh the active employee due to the following error: ${em}.
                                [Error response: ${EzJson.toJson(eResponse)}]`);

                            return resolve(EzClockerContext.ezInstance.ezGetActiveEmployee());
                        })
            });
    }

    /**
     * @public @method
     * Obtains the logged in employee's active clock reference and status.
     * @returns {Proimise.resolve}
     */
    ezRefreshActiveEmployeeActiveBreak() {
        let aEmployee = EzClockerContext.ezInstance.ezGetActiveEmployee();

        if (!EzObject.isValid(aEmployee)) {
            throw new EzException(
                'An Active Employee is required for EzClockerContext.ezInstance.ezRefreshActiveEmployee');
        }

        return EzPromise.promise(
            (resolve) => ezApi.ezclocker.ezTimeEntryService.ezGetActiveBreakIn(aEmployee.id)
                .then(
                    (response) => {
                        if ('false' === response.message) {
                            EzClockerContext.ezInstance.ezSetActiveEmployeeActiveBreak();
                        } else {
                            EzClockerContext.ezInstance.ezSetActiveEmployeeActiveBreak(response.timeEntry);
                        }

                        return resolve(EzClockerContext.ezInstance.ezGetActiveEmployeeActiveBreak());
                    },
                    (eResponse) => {
                        EzClockerContext.ezInstance.ezSetActiveEmployeeActiveBreak();

                        ezApi.ezclocker.ezLogger.error(
                            `Failed to obtain active clock in: ${EzJson.toJson(eResponse, 3)}`);

                        return resolve(EzClockerContext.ezInstance.ezGetActiveEmployeeActiveBreak());
                    }));
    }

    /**
     * @public @method
     * Sets the activ employee's active  clock in.
     * @param {Object|null} activeBreak
     */
    ezSetActiveEmployeeActiveBreak(activeBreak) {
        let aEmployee = EzClockerContext.ezInstance.ezGetActiveEmployee();

        if (!EzObject.isValid(aEmployee)) {
            throw new EzException(
                EzString.em`
                    An Active Employee is required for
                    EzClockerContext.ezInstance.ezRefreshActiveEmployee`);
        }

        let isChanged = (EzObject.isValid(activeBreak) && !EzObject.isValid(aEmployee.activeBreak)) ||
            (EzObject.isValid(activeBreak) && activeBreak === aEmployee.activeBreak) ||
            (!EzObject.isValid(activeBreak) && EzObject.isValid(aEmployee.activeBreak));

        aEmployee.activeBreak = EzObject.assignOrDefault(activeBreak, null);

        aEmployee.isActiveBreak = EzObject.isValid(activeBreak);

        if (isChanged) {
            ezApi.ezclocker.ezEventEngine.ezTriggerEvent(
                EzClockerContextEventName.onActiveEmployeeActiveBreakInChanged,
                ezApi.ezclocker.ezEventEngine.ezBuildEventData(
                    EzClockerContext.ezApiName,
                    'Active break-in changed',
                    {
                        employee: aEmployee,
                        activeBreak: aEmployee.activeBreak
                    }));
        }
    }

    /**
     * @public @method
     * Obtains the active break-in for the active employee
     */
    ezGetActiveEmployeeActiveBreak() {
        let aEmployee = EzClockerContext.ezInstance.ezGetActiveEmployee();

        if (!EzObject.isValid(aEmployee)) {
            throw new EzException(
                EzString.em`
                    An Active Employee is required for
                    EzClockerContext.ezInstance.ezRefreshActiveEmployee`);
        }

        return aEmployee.activeBreak;
    }

    /*===============================================================================================================
    | Section: Selected Employer Section
    ===============================================================================================================*/

    static ezCreateDefaultSelectedEmployerIntegrations() {
        return {
            errorCode: 0,
            message: 'Success',
            primaryIntegrations: {},
            activeIntegrations: [],
            providerIntegrations: {}
        };
    }

    ezLicenseNeedToPay = false;

    /**
     * @public @field
     * @type {boolean}
     */
    ezSelectedEmployerReady = false;

    /**
     * @protected  @method
     * Initializes the EzClockerContext Selected Employer Module
     */
    ezInitSelectedEmployerModule() {
        ezApi.ezclocker.ezEventEngine.ezRegisterEvent(
            EzClockerContext.ezApiName,
            EzClockerContextEventName.onSelectedEmployerAccountReady);

        ezApi.ezclocker.ezEventEngine.ezRegisterEvent(
            EzClockerContext.ezApiName,
            EzClockerContextEventName.onSelectedEmployerAccountClosed);

        ezApi.ezclocker.ezEventEngine.ezRegisterEvent(
            EzClockerContext.ezApiName,
            EzClockerContextEventName.onSelectedEmployerAccountChanged);

        ezApi.ezclocker.ezEventEngine.ezRegisterEvent(
            EzClockerContext.ezApiName,
            EzClockerContextEventName.onSelectedEmployerAccountJobsReady);

        ezApi.ezclocker.ezEventEngine.ezRegisterEvent(
            EzClockerContext.ezApiName,
            EzClockerContextEventName.onSelectedEmployerEmployeeAccountsUpdated);

        ezApi.ezclocker.ezEventEngine.ezRegisterEvent(
            EzClockerContext.ezApiName,
            EzClockerContextEventName.onSelectedEmployerLicenseReady);

        ezApi.ezclocker.ezEventEngine.ezRegisterEvent(
            EzClockerContext.ezApiName,
            EzClockerContextEventName.onSelectedEmployerLicenseUpdated);

        // Register validate license events
        ezApi.ezclocker.ezEventEngine.ezRegisterEvent(
            EzClockerContext.ezApiName,
            EzClockerContextEventName.ezOnValidateLicenseValid);

        ezApi.ezclocker.ezEventEngine.ezRegisterEvent(
            EzClockerContext.ezApiName,
            EzClockerContextEventName.ezOnValidateLicenseExpired);

        ezApi.ezclocker.ezEventEngine.ezRegisterEvent(
            EzClockerContext.ezApiName,
            EzClockerContextEventName.ezOnValidateLicenseFreeTrialExpired);

        ezApi.ezclocker.ezEventEngine.ezRegisterEvent(
            EzClockerContext.ezApiName,
            EzClockerContextEventName.ezOnValidateLicenseViolationError);

        ezApi.ezclocker.ezEventEngine.ezRegisterEvent(
            EzClockerContext.ezApiName,
            EzClockerContextEventName.ezOnValidateLicenseError);


        // Integration Events
        ezApi.ezclocker.ezEventEngine.ezRegisterEvent(
            EzClockerContext.ezApiName,
            EzClockerContextEventName.onSelectedEmployerAccountActiveIntegrationsReady);

        ezApi.ezclocker.ezEventEngine.ezRegisterEvent(
            EzClockerContext.ezApiName,
            EzClockerContextEventName.onSelectedEmployerAccountActiveIntegrationsUpdated);

        ezApi.ezclocker.ezEventEngine.ezRegisterEvent(
            EzClockerContext.ezApiName,
            EzClockerContextEventName.onSelectedEmployerAccountActiveIntegrationsError);

        EzClockerContext.ezInstance.ezSelectedEmployerReady = false;
        EzClockerContext.ezInstance.ezSelectedEmployerModuleReady = true;
    }

    /**
     * @public @method
     * Validates the Active Employer's license. Will fire the license helper events.
     * Copied from ezclocker-license-helper.js, since that class imports EzClockerContext
     * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
     * Can trigger the following events:
     *  EzClockerContextEventName.ezOnValidateLicenseError
     *  EzClockerContextEventName.ezOnValidateLicenseFreeTrialExpired
     *  EzClockerContextEventName.ezOnValidateLicenseExpired
     * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
     * @returns {Promise}
     */
    ezValidateSelectedEmployerAccountLicense() {
        let response = ezApi.ezResponse();

        response.license = EzClockerContext.ezInstance.ezGetSelectedEmployerAccountLicense();

        if (!EzObject.isValid(response.license)) {
            ezApi.ezclocker.ezEventEngine.ezTriggerEvent(
                EzClockerContextEventName.ezOnValidateLicenseError,
                ezApi.ezclocker.ezEventEngine.ezBuildEventData(
                    EzClockerContext.ezApiName,
                    'License data is not valid.',
                    {
                        errorCode: 500,
                        message: 'License data is not valid.',
                        needToPay: false,
                        needToArchive: false,
                        needToSignIn: true,
                        license: response.license
                    }));

            return;
        }

        if (EzBoolean.isTrue(response.license.isInViolation) && EzNumber.isNumber(response.license.availableEmployeeSlots) &&
            0 > response.license.availableEmployeeSlots) {
            response.errorCode = 500;

            response.message = EzHtml.build`
                <p>
                    You currently have ${response.license.numberOfEmployees}.
                    Your license only allows a maximum of ${response.license.subscriptionPlan.maximumEmployees}
                    ${1 == response.license.subscriptionPlan.maximumEmployee ? 'employee.' : 'employees.'}
                </p>
                <p>
                    You need to upgrade to a license that supports the number
                    of active employees you have or archive employees until your
                    employee count is equal to or below the your license's limit.
                </p>`;

            ezApi.ezclocker.ezEventEngine.ezTriggerEvent(
                EzClockerContextEventName.ezOnValidateLicenseViolationError,
                ezApi.ezclocker.ezEventEngine.ezBuildEventData(
                    EzClockerContext.ezApiName,
                    response.message,
                    {
                        errorCode: response.errorCode,
                        message: response.message,
                        needToPay: false,
                        needToArchive: false,
                        needToSignIn: true,
                        license: response.license
                    }));

            return;
        }

        // Check if license is valid
        if (EzBoolean.isFalse(response.license.valid)) {
            if ('EZCLOCKER_FREE_TRIAL' === response.license.subscriptionProvider &&
                0 == response.license.freeTrialDaysLeft) {

                EzClockerContext.ezInstance.ezLicenseNeedToPay = true;

                ezApi.ezclocker.ezEventEngine.ezTriggerEvent(
                    EzClockerContextEventName.ezOnValidateLicenseFreeTrialExpired,
                    ezApi.ezclocker.ezEventEngine.ezBuildEventData(
                        EzClockerContext.ezApiName,
                        'License free trial is expired.',
                        {
                            errorCode: 500,
                            message: 'Your ezClocker free trial has expired.',
                            needToPay: true,
                            needToArchive: false,
                            needToSignIn: false,
                            license: response.license
                        }));

                return;
            }

            EzClockerContext.ezInstance.ezLicenseNeedToPay = true;

            ezApi.ezclocker.ezEventEngine.ezTriggerEvent(
                EzClockerContextEventName.ezOnValidateLicenseExpired,
                ezApi.ezclocker.ezEventEngine.ezBuildEventData(
                    EzClockerContext.ezApiName,
                    'License is expired.',
                    {
                        errorCode: 500,
                        message: 'Your ezClocker subscription is expired.',
                        needToPay: true,
                        needToArchive: false,
                        needToSignIn: false,
                        license: response.license
                    }));

            return;
        }

        // GOOD TO GO!
        response.license.licenseExpired = false;

        EzClockerContext.ezInstance.ezLicenseNeedToPay = false;

        ezApi.ezclocker.ezEventEngine.ezTriggerEvent(
            EzClockerContextEventName.ezOnValidateLicenseValid,
            ezApi.ezclocker.ezEventEngine.ezBuildEventData(
                EzClockerContext.ezApiName,
                'License validated with success.',
                {
                    errorCode: 0,
                    message: 'Your ezClocker subscription is valid and active.',
                    needToPay: false,
                    needToArchive: false,
                    needToSignIn: false,
                    license: response.license
                }));
    }

    /**
     * @public @method
     * Loads the Active Employer's archived employees. Archived data is not auto-loaded during initialization.
     * @returns {Promise}
     */
    ezLoadSelectedEmployerAccountArchivedEmployees() {
        if (!EzObject.isValid(EzClockerContext.ezInstance.ezGetSelectedEmployerAccount())) {
            throw new EzException(
                EzString.em`
                    A valid selected employer account is required in
                    EzClockerContext.ezInstance.ezLoadSelectedEmployerAccountArchivedEmployees()`);
        }

        let url = ezApi.ezclocker.ezNavigation.ezGetInternalApiUrl('employees/archive');

        return EzPromise.promise(
            (resolve, reject) => ezApi.ezclocker.ezHttpHelper.ezGet(url)
                .then(
                    ezApi.ezclocker.ezHttpHelper.ezProcessApiResolve,
                    ezApi.ezclocker.ezHttpHelper.ezProcessApiReject)
                .then(
                    (response) => {
                        EzClockerContext.ezInstance.employerContext.selectedEmployerAccountArchivedEmployees = EzArray.arrayOrEmpty(response.archivedEmployees);

                        EzClockerContext.ezInstance.employerContext.selectedEmployerAccountArchivedEmployeesById = {};

                        EzClockerContext.ezInstance.employerContext.selectedEmployerAccountArchivedEmployeesByOldEmployeeId = {};

                        // Sort archived employees
                        EzClockerContext.ezInstance.employerContext.selectedEmployerAccountArchivedEmployees.sort(
                            (archivedEmployee1, archivedEmployee2) => {
                                if (archivedEmployee1.employeeName === archivedEmployee2.employeeName) {
                                    return 0;
                                }

                                if (archivedEmployee1.employeeName > archivedEmployee2.employeeName) {
                                    return 1;
                                }

                                return -1;
                            });

                        // Index and map the arrays
                        for (let index = 0;
                            index < EzClockerContext.ezInstance.employerContext.selectedEmployerAccountArchivedEmployees.length;
                            index++) {
                            let archivedEmployee = EzClockerContext.ezInstance.employerContext.selectedEmployerAccountArchivedEmployees[index];

                            archivedEmployee.ezIndex = index;

                            EzClockerContext.ezInstance.employerContext
                                .selectedEmployerAccountArchivedEmployeesById[archivedEmployee.id.toString()] = archivedEmployee;

                            EzClockerContext.ezInstance.employerContext
                                .selectedEmployerAccountArchivedEmployeesByOldEmployeeId[archivedEmployee.oldEmployeeId.toString()] = archivedEmployee;
                        }

                        return resolve(EzClockerContext.ezInstance.employerContext.selectedEmployerAccountArchivedEmployees);
                    },
                    (eResponse) => {
                        EzClockerContex.ezInstance.employerContext.selectedEmployerAccountArchivedEmployeesById = {};

                        EzClockerContext.ezInstance.employerContext.selectedEmployerAccountArchivedEmployeesByOldEmployeeId = {};

                        EzClockerContext.ezInstance.employerContext.selectedEmployerAccountArchivedEmployees = [];

                        ezApi.ezclocker.ezLogger.error(
                            EzString.em`
                                Failed to obtain archived employee data for employer.
                                Error: ${EzJson.toJson(eResponse)}`);

                        return reject(EzClockerContext.ezInstance.employerContext.selectedEmployerAccountArchivedEmployees);
                    }));
    }

    /**
     * @public @method
     * Rerturns the selected employer's archived employee stored in the selectedEmployerAccountArchivedEmployees at the
        provided index.
     * @param {number} index
        Index must be greater than zero and less than the current selectedEmployerAccountArchivedEmployees.length.
     * @returns {object}
     */
    ezGetSelectedEmployerArchivedEmployeeByIndex(index) {
        if (!EzObject.isValid(EzClockerContext.ezInstance.ezGetSelectedEmployerAccount())) {
            throw new EzException(
                EzString.em`
                    A valid Active Employer is required
                    in ${EzClockerContext.ezInstance.ezLoadSelectedEmployerAvailableJobs}`);
        }

        if (!EzNumber.isNumber(index)) {
            throw new EzBadParamException(
                'index',
                EzClockerContext.ezInstance,
                EzClockerContext.ezInstance.ezGetSelectedEmployerArchivedEmployeeByIndex);
        }

        if (0 > index) {
            throw new EzBadParamException(
                'index',
                EzClockerContext.ezInstance,
                EzClockerContext.ezInstance.ezGetSelectedEmployerArchivedEmployeeByIndex,
                'The index value cannot be less than zero');
        }

        if (EzClockerContext.ezInstance.employerContext.selectedEmployerAccountArchivedEmployees.length < index) {
            throw new EzBadParamException(
                'index',
                EzClockerContext.ezInstance,
                EzClockerContext.ezInstance.ezGetSelectedEmployerArchivedEmployeeByIndex,
                EzString.em`
                    The index value cannot be less than the maximum number of archived employees.
                    The current maximum is
                    ${EzClockerContext.ezInstance.employerContext.selectedEmployerAccountArchivedEmployees.length})`);
        }

        return EzClockerContext.ezInstance.employerContext.selectedEmployerAccountArchivedEmployees[index];
    }

    /**
     * @public @method
     * Rerturns the selected employer's archived employee associatd with the provided archivedEmployeeId. If none exist,
        returns null.
     * @param {number} archivedEmployeeId
     * @returns {object|null}
     */
    ezGetSelectedEmployerArchivedEmployeeById(archivedEmployeeId) {
        if (!EzObject.isValid(EzClockerContext.ezInstance.ezGetSelectedEmployerAccount())) {
            throw new EzException(
                EzString.em`
                    A valid selected employer account is required
                    in ${EzClockerContext.ezInstance.ezGetSelectedEmployerArchivedEmployeeById}`);
        }

        if (!EzNumber.isNumber(archivedEmployeeId)) {
            throw new EzBadParamException(
                'archivedEmployeeId',
                EzClockerContext.ezInstance,
                EzClockerContext.ezInstance.ezGetSelectedEmployerArchivedEmployeeById);
        }

        let archivedEmployeeIdString = archivedEmployeeId.toString();

        return EzObject.hasProperty(
            EzClockerContext.ezInstance.employerContext.selectedEmployerAccountArchivedEmployeesById,
            archivedEmployeeIdString)
            ? EzClockerContext.ezInstance
                .employerContext.selectedEmployerAccountArchivedEmployeesById[archivedEmployeeIdString]
            : null;
    }

    /**
     * @public @method
     * Rerturns the selected employer's archived employee associatd with the provided oldEmployeeId.
     * @param {number} archivedEmployeeId
     * @returns {object|null}
     */
    ezGetSelectedEmployerArchivedEmployeeByOldEmployeeId(oldEmployeeId) {
        if (!EzObject.isValid(EzClockerContext.ezInstance.ezGetSelectedEmployerAccount())) {
            throw new EzException(
                EzString.em`
                    A valid selected employer account is required
                    in ${EzClockerContext.ezInstance.ezGetSelectedEmployerArchivedEmployeeByOldEmployeeId}`);
        }

        if (!EzNumber.isNumber(oldEmployeeId)) {
            throw new EzBadParamException(
                'oldEmployeeId',
                EzClockerContext.ezInstance,
                EzClockerContext.ezInstance.ezGetSelectedEmployerArchivedEmployeeByOldEmployeeId);
        }

        let oldEmployeeIdStr = oldEmployeeId.toString();

        return EzObject.hasProperty(
            EzClockerContext
                .ezInstance
                .employerContext
                .selectedEmployerAccountArchivedEmployeesByOldEmployeeId,
            oldEmployeeIdStr)
            ? EzClockerContext
                .ezInstance
                .employerContext
                .selectedEmployerAccountArchivedEmployeesByOldEmployeeId[oldEmployeeIdStr]
            : null;
    }

    /**
     * @public @method
     * Determines if the selected employer has loaded their jobs or not.
     * @returns {Boolean}
     */
    ezSelectedEmployerJobsLoaded() {
        if (!EzObject.isValid(EzClockerContext.ezInstance.ezGetSelectedEmployerAccount())) {
            throw new EzException(
                EzString.em`
                    A valid selected employer account is required
                    in ${EzClockerContext.ezInstance.ezSelectedEmployerJobsLoaded}`);
        }

        return EzArray.arrayHasLength(EzClockerContext.ezInstance.employerContext.selectedEmployerAccountAvailableJobs);
    }

    /**
     * @public @method
     * Loads the selected employer's available jobs (DataTags) if not already loaded. Used for first time loads.
     * @returns {Promise}
     */
    ezLoadSelectedEmployerAvailableJobs() {
        if (!EzObject.isValid(EzClockerContext.ezInstance.ezGetSelectedEmployerAccount())) {
            throw new EzException(
                EzString.em`
                    A valid selected employer account is required
                    in ${EzClockerContext.ezInstance.ezLoadSelectedEmployerAvailableJobs}`);
        }

        return EzBoolean.isFalse(EzClockerContext.ezInstance.ezSelectedEmployerJobsLoaded())
            ? EzClockerContext.ezInstance.ezRefreshSelectedEmployerAvailableJobs()
            : Promise.resolve({
                availableJobs:
                    EzClockerContext.ezInstance.employerContext.selectedEmployerAccountAvailableJobs,
                archivedJobs:
                    EzClockerContext.ezInstance.employerContext.selectedEmployerAccountArchivedJobs,
                availableJobsById:
                    EzClockerContext.ezInstance.employerContext.selectedEmployerAccountAvailableJobsById,
                availableArchivedJobsById:
                    EzClockerContext.ezInstance.employerContext.selectedEmployerAccountArchivedJobsById
            });
    }

    /**
     * @public @method
     * Refreshes the selected employer's available jobs (DataTags).
     * @returns {Promise}
     */
    ezRefreshSelectedEmployerAvailableJobs() {
        if (!EzObject.isValid(EzClockerContext.ezInstance.ezIsEmployerContextReady)) {
            throw new EzException(
                EzString.em`
                    A valid selected employer account is required in
                    ${EzBadParamException.functionToMethodNameAndParams(EzClockerContext.ezInstance.ezRefreshSelectedEmployerAvailableJobs)}`);
        }

        return EzPromise.promise(
            (resolve, reject) => {
                EzClockerContext.ezInstance.employerContext.selectedEmployerAccountAvailableJobs = [];

                EzClockerContext.ezInstance.employerContext.selectedEmployerAccountArchivedJobs = [];

                EzClockerContext.ezInstance.employerContext.selectedEmployerAccountAvailableJobsById = {};

                EzClockerContext.ezInstance.employerContext.selectedEmployerAccountArchivedJobsById = {};

                let resolveData = {
                    availableJobs: EzClockerContext.ezInstance.employerContext.selectedEmployerAccountAvailableJobs,
                    archivedJobs: EzClockerContext.ezInstance.employerContext.selectedEmployerAccountArchivedJobs,
                    availableJobsById: EzClockerContext.ezInstance.employerContext.selectedEmployerAccountAvailableJobsById,
                    availableArchivedJobsById: EzClockerContext.ezInstance.employerContext.selectedEmployerAccountArchivedJobsById
                };

                ezApi.ezclocker.ezDataTagService.ezGetAllDataTagsForEmployer()
                    .then(
                        (response) => {
                            if (EzArray.arrayHasLength(response.entities)) {
                                response.entities.forEach(
                                    (jobCode) => {
                                        if (EzBoolean.isTrue(jobCode.archived)) {
                                            EzClockerContext
                                                .ezInstance
                                                .employerContext
                                                .selectedEmployerAccountArchivedJobs
                                                .push(jobCode);

                                            EzClockerContext.ezInstance.employerContext.selectedEmployerAccountArchivedJobsById[jobCode.id] = jobCode;
                                        } else {
                                            EzClockerContext.ezInstance.employerContext.selectedEmployerAccountAvailableJobs.push(jobCode);

                                            jobCode.index = EzClockerContext.ezInstance.employerContext.selectedEmployerAccountAvailableJobs.length - 1;
                                            jobCode.index = EzClockerContext.ezInstance.employerContext.selectedEmployerAccountAvailableJobs.length - 1;

                                            EzClockerContext.ezInstance.employerContext.selectedEmployerAccountAvailableJobsById[jobCode.id] = jobCode;
                                        }
                                    });

                                EzClockerContext.ezInstance.employerContext.selectedEmployerAccountArchivedJobs =
                                    EzClockerContext.ezInstance.ezSortJobCodesArray(
                                        EzClockerContext.ezInstance.employerContext.selectedEmployerAccountArchivedJobs);

                                EzClockerContext.ezInstance.employerContext.selectedEmployerAccountAvailableJobs =
                                    EzClockerContext.ezInstance.ezSortJobCodesArray(
                                        EzClockerContext.ezInstance.employerContext.selectedEmployerAccountAvailableJobs);
                            }

                            resolveData = {
                                availableJobs: EzClockerContext.ezInstance.employerContext.selectedEmployerAccountAvailableJobs,
                                archivedJobs: EzClockerContext.ezInstance.employerContext.selectedEmployerAccountArchivedJobs,
                                availableJobsById: EzClockerContext.ezInstance.employerContext.selectedEmployerAccountAvailableJobsById,
                                availableArchivedJobsById: EzClockerContext.ezInstance.employerContext.selectedEmployerAccountArchivedJobsById
                            };

                            EzClockerContext.ezInstance.ezTriggerEzClockerContextEvent(
                                EzClockerContextEventName.onSelectedEmployerAccountJobsReady,
                                'Selected employer\'s available jobs ready.',
                                resolveData);

                            return resolve(resolveData);
                        },
                        (eResponse) => {
                            ezApi.ezclocker.ezLogger.error(
                                `Failed to get the selected employer's job codes. Error: ${EzJson.toJson(eResponse)}`);

                            EzClockerContext.ezInstance.ezTriggerEzClockerContextEvent(
                                EzClockerContextEventName.onSelectedEmployerAccountJobsReady,
                                'Selected employer\'s available jobs ready.',
                                resolveData);

                            return reject(resolveData);
                        });
            });
    }

    /**
     * @public @method
     * Sorts an array of JobCode objects
     * @param {array} jobCodesArray
     * @returns {array}
     */
    ezSortJobCodesArray(jobCodesArray) {
        if (!EzArray.arrayHasLength(jobCodesArray)) {
            return [];
        }

        return jobCodesArray.sort(
            (jobA, jobB) => {
                if (!EzString.hasLength(jobA.tagName)) {
                    return !EzString.hasLength(jobB.tagName)
                        ? 0
                        : -1;
                }

                if (!EzString.hasLength(jobB.tagName)) {
                    return 1;
                }

                return jobA.tagName.localeCompare(jobB.tagName, 'en', { sensitivity: 'base' });
            });
    }

    /**
     * @public @method
         Closes the selected employer
     * @param {number} aEmployerIndex
     * @param {array} aEemployeeAccounts
     * @param {object} aEmployerOptions
     * @param {object} aEmployerLicense
     */
    ezCloseSelectedEmployerAccount() {
        EzClockerContext.ezInstance.employerContext.selectedEmployerAccountIndex = -1;

        EzClockerContext.ezInstance.employerContext.selectedEmployerAccountEmployeeAccounts = [];

        EzClockerContext.ezInstance.employerContext.selectedEmployerAccountIntegrationEmployees = {};

        EzClockerContext.ezInstance.employerContext.selectedEmployerAccountEmployeeAccountsById = {};

        EzClockerContext.ezInstance.employerContext.selectedEmployerAccountOptions = {};

        EzClockerContext.ezInstance.employerContext.selectedEmployerAccountLicense =
            EzClockerContext.ezCreateDefaultEmployerLicense();

        EzClockerContext.ezInstance.employerContext.selectedEmployerAccountAvailableJobs = null;

        EzClockerContext.ezInstance.employerContext.selectedEmployerAccountArchivedJobs = null;

        EzClockerContext.ezInstance.employerContext.selectedEmployerAccountAvailableJobsById = null;

        EzClockerContext.ezInstance.employerContext.selectedEmployerAccountArchivedJobsById = null;

        EzClockerContext.ezInstance.ezSelectedEmployerReady = false;

        if (EzBoolean.isTrue(EzClockerContext.ezInstance.employerContext.ready) &&
            0 >= EzClockerContext.ezInstance.employerContext.selectedEmployerAccountIndex) {
            EzClockerContext.ezInstance.ezTriggerEzClockerContextEvent(
                EzClockerContextEventName.onSelectedEmployerAccountClosed,
                'Selected employer account is closed.',
                null);
        }
    }

    /**
     * @public @method
     * Sets the selected employer from the provided index and also sets the selected employer options, employee accounts, and license if provided.
     * @param {number} aEmployerIndex
     * @param {array} aEemployeeAccounts
     * @param {object} aEmployerOptions
     * @param {object} aEmployerLicense
     */
    ezSetSelectedEmployer(aEmployerIndex, aEmployeeAccounts = [], aEmployerOptions = [], aEmployerLicense = {}) {
        if (!EzObject.isValid(EzClockerContext.ezInstance.employerContext)) {
            throw new EzException(
                EzString.em`
                    A valid employer context is required
                    in ${EzClockerContext.ezInstance.ezSetSelectedEmployer}`);
        }

        if (!EzArray.isArray(EzClockerContext.ezInstance.employerContext.employerAccounts)) {
            EzClockerContext.ezInstance.employerContext.employerAccounts = [];
        }

        if (!EzNumber.isNumber(aEmployerIndex) || 0 < aEmployerIndex) {
            EzClockerContext.ezInstance.ezCloseSelectedEmployerAccount();

            return;
        }

        if (aEmployerIndex >= EzClockerContext.ezInstance.employerContext.employerAccounts.length) {
            throw new EzBadParamException(
                'aEmployerIndex',
                EzClockerContext.ezInstance,
                EzClockerContext.ezInstance.ezSetSelectedEmployer,
                'The aEmployerIndex value must be less than the employer context\'s number of employer accounts.');
        }

        let changed = -1 !== EzClockerContext.ezInstance.employerContext.selectedEmployerAccountIndex &&
            EzClockerContext.ezInstance.employerContext.selectedEmployerAccountIndex !== aEmployerIndex;

        EzClockerContext.ezInstance.employerContext.selectedEmployerAccountIndex = aEmployerIndex;

        EzClockerContext.ezInstance.employerContext.selectedEmployerAccountEmployeeAccounts = EzClockerContext.ezInstance.ezSortEmployeeArrayByName(
            aEmployeeAccounts);

        EzClockerContext.ezInstance.employerContext.selectedEmployerAccountEmployeeAccountsById = EzClockerContext.ezInstance.ezIndexEmployeeAccountsById(
            EzClockerContext.ezInstance.employerContext.selectedEmployerAccountEmployeeAccounts);

        EzClockerContext.ezInstance.employerContext.selectedEmployerAccountOptions = EzObject.isValid(aEmployerOptions)
            ? aEmployerOptions
            : {};

        EzClockerContext.ezInstance.employerContext.selectedEmployerAccountAvailableJobs = [];

        EzClockerContext.ezInstance.employerContext.selectedEmployerAccountArchivedJobs = [];

        EzClockerContext.ezInstance.employerContext.selectedEmployerAccountAvailableJobsById = {};

        EzClockerContext.ezInstance.employerContext.selectedEmployerAccountArchivedJobsById = {};

        EzClockerContext.ezInstance.employerContext.ready = true;

        let selectedEmployer = EzClockerContext.ezInstance.ezGetSelectedEmployerAccount();

        if (EzObject.isValid(selectedEmployer)) {
            EzClockerContext.ezInstance.employerContext.selectedPeriod =
                EzClockerContext.ezInstance.ezReadSelectedPeriodFromProvidedOptions(
                    EzClockerAccountType.EMPLOYER,
                    EzClockerContext
                        .ezInstance
                        .employerContext
                        .employerAccounts[EzClockerContext.ezInstance.employerContext.selectedEmployerAccountIndex],
                    EzClockerContext
                        .ezInstance
                        .employerContext
                        .selectedEmployerAccountOptions);

            EzClockerContext.ezInstance.employerContext.ezPeriodStartMoment = EzClockerContext
                .ezInstance
                .employerContext
                .selectedPeriod.ezPeriodStartMoment;

            EzClockerContext.ezInstance.employerContext.ezPeriodEndMoment = EzClockerContext
                .ezInstance
                .employerContext
                .selectedPeriod.ezPeriodEndMoment;

            selectedEmployer.ready = true;

            EzClockerContext.ezInstance.ezSelectedEmployerReady = true;

            EzClockerContext.ezInstance.ezSetSelectedEmployerAccountLicense(aEmployerLicense);

            if (changed) {
                EzClockerContext.ezInstance.ezTriggerEzClockerContextEvent(
                    EzClockerContextEventName.onSelectedEmployerAccountChanged,
                    'Selected employer account is changed.',
                    EzClockerContext.ezInstance.ezGetSelectedEmployerAccountData());

                return;
            }

            EzClockerContext.ezInstance.ezTriggerEzClockerContextEvent(
                EzClockerContextEventName.onSelectedEmployerAccountReady,
                'Selected employer account is ready.',
                EzClockerContext.ezInstance.ezGetSelectedEmployerAccountData());
        }
    }

    /**
     * @public @method
     * Returns the selected employer account's data
     * @returns {object}
     */
    ezGetSelectedEmployerAccountData() {
        if (!EzObject.isValid(EzClockerContext.ezInstance.employerContext)) {
            throw new EzException(
                EzString.em`
                    A valid employer context is required
                    in ${EzClockerContext.ezInstance.ezGetSelectedEmployerAccountData}`);
        }

        let selectedEmployer = EzClockerContext.ezInstance.ezGetSelectedEmployerAccount();

        if (!EzObject.isValid(selectedEmployer)) {
            throw new EzException(
                EzString.em`
                    A valid selected employer account is required
                    in ${EzClockerContext.ezInstance.ezSetSelectedEmployer}`);
        }

        return {
            account: EzClockerContext.ezInstance.ezGetSelectedEmployerAccount(),
            employees: EzClockerContext.ezInstance.employerContext.selectedEmployerAccountEmployeeAccounts,
            options: EzClockerContext.ezInstance.employerContext.selectedEmployerAccountOptions,
            license: EzClockerContext.ezInstance.ezGetSelectedEmployerAccountLicense()
        };
    }

    /**
     * @protected @method
     * Updates a single employee in the Active Employer's employees array (located by the employee id)
     * @param {object} updatedEmployee
     */
    ezUpdateSelectedEmployerEmployeeCacheById(updatedEmployee) {
        if (!EzObject.isValid(updatedEmployee) || !EzNumber.isNumber(updatedEmployee.id)) {
            throw ezApi.ezException(
                EzString.em`
                    A valid updatedEmployee param is required
                    in ${EzClockerContext.ezInstance.ezUpdateSelectedEmployerEmployeeCacheById}`);
        }

        if (!EzObject.isValid(EzClockerContext.ezInstance.employerContext)) {
            throw new EzException(
                EzString.em`
                    A valid employer context is required
                    in ${EzClockerContext.ezInstance.ezUpdateSelectedEmployerEmployeeCacheById}`);
        }

        if (!EzArray.arrayHasLength(EzClockerContext.ezInstance.employerContext.selectedEmployerAccountEmployeeAccounts)) {
            EzClockerContext.ezInstance.activeEmployer.selectedEmployerAccountEmployeeAccounts = [];
        }

        if (!EzObject.isValid(EzClockerContext.ezInstance.employerContext.selectedEmployerAccountEmployeeAccountsById)) {
            EzClockerContext.ezInstance.activeEmployer.selectedEmployerAccountEmployeeAccountsById = {};
        }

        if (!EzObject.isValid(EzClockerContext.ezInstance.employerContext.selectedEmployerAccountEmployeeAccountsById[updatedEmployee.id])) {
            EzClockerContext.ezInstance.employerContext.selectedEmployerAccountEmployeeAccounts.push(updatedEmployee);

            updatedEmployee.employerEmployeeIndex = EzClockerContext.ezInstance.employerContext.selectedEmployerAccountEmployees.length - 1;
        } else {
            updatedEmployee.employerEmployeeIndex = EzClockerContext.ezInstance.employerContext
                .selectedEmployerAccountEmployeeAccountsById[updatedEmployee.id]
                .employerEmployeeIndex;

            EzClockerContext.ezInstance.employerContext.selectedEmployerAccountEmployeeAccounts[updatedEmployee.employerEmployeeIndex] = updatedEmployee;
        }

        EzClockerContext.ezInstance.employerContext.selectedEmployerAccountEmployeeAccountsById[updatedEmployee.id] = updatedEmployee;

        return EzClockerContext.ezInstance.employerContext.selectedEmployerAccountEmployeeAccountsById[updatedEmployee.id];
    }

    /**
     * @public @method
     * Sets the Active Employer's address
     * @param {object} activeEmployerAddress
     */
    ezSetSelectedEmployerAddress(activeEmployerAddress) {
        if (!EzObject.isValid(EzClockerContext.ezInstance.ezGetSelectedEmployerAccount())) {
            throw new EzException(
                EzString.em`
                    A valid selected employer account is required
                    in ${EzClockerContext.ezInstance.ezSetSelectedEmployerAddress}`);
        }

        if (!EzObject.isValid(activeEmployerAddress)) {
            throw new EzBadParamException(
                'activeEmployerAddress',
                EzClockerContext.ezInstance,
                EzClockerContext.ezInstance.ezSetSelectedEmployerAddress);
        }

        if (!EzClockerContext.ezInstance.ezGetUserContext().isEmployer &&
            !EzClockerContext.ezInstance.ezGetUserContext().isManager &&
            !EzClockerContext.ezInstance.ezGetUserContext().isPayrollManager) {
            throw new EzException(
                'Only Employer, Payroll Manager, and Manager accounts can set the selected employer\'s address.');
        }

        let selectedEmployerAccount = EzClockerContext.ezInstance.ezGetSelectedEmployerAccount();

        selectedEmployerAccount.companyName = EzString.stringOrEmpty(activeEmployerAddress.companyName);

        selectedEmployerAccount.employerName = EzString.stringOrEmpty(activeEmployerAddress.employerName);

        selectedEmployerAccount.mainContactNumber = EzString.stringOrEmpty(activeEmployerAddress.mainContactNumber);

        selectedEmployerAccount.streetAddress = EzString.stringOrEmpty(activeEmployerAddress.streetAddress);

        selectedEmployerAccount.additionalAddress = EzString.stringOrEmpty(activeEmployerAddress.additionalAddress);

        selectedEmployerAccount.city = EzString.stringOrEmpty(activeEmployerAddress.city);

        if (EzString.hasLength(activeEmployerAddress.addressState)) {
            selectedEmployerAccount.addressState = EzString.stringOrEmpty(activeEmployerAddress.addressState);

            selectedEmployerAccount.address_state = EzString.stringOrEmpty(activeEmployerAddress.addressState);
        } else {
            selectedEmployerAccount.addressState = EzString.stringOrEmpty(activeEmployerAddress.address_state);

            selectedEmployerAccount.address_state = EzString.stringOrEmpty(activeEmployerAddress.address_state);
        }

        if (EzString.hasLength(activeEmployerAddress.addressPostalcode)) {
            selectedEmployerAccount.addressPostalcode = EzString.stringOrEmpty(activeEmployerAddress.addressPostalcode);

            selectedEmployerAccount.address_postalcode = EzString.stringOrEmpty(activeEmployerAddress.addressPostalcode);
        } else {
            selectedEmployerAccount.addressPostalcode = EzString.stringOrEmpty(activeEmployerAddress.address_postalcode);

            selectedEmployerAccount.address_postalcode = EzString.stringOrEmpty(activeEmployerAddress.address_postalcode);
        }

        selectedEmployerAccount.addressCountry = EzString.stringOrEmpty(activeEmployerAddress.addressCountry);
    }

    /**
     * @public @method
     * Can trigger the following events:
     *      1) EzClockerContextEventName.onSelectedEmployerLicenseUpdated
     *      2) EzClockerContextEventName.onSelectedEmployerLicenseReady
     *      3) ==> EzClockerContext.ezInstance.ezSubscriptionContextActiveSubscriptionPlan:
     *          1) EzClockerContextEventName.onSubscriptionContextActiveSubscriptionReady
     *          2) EzClockerContextEventName.onSubscriptionContextActiveSubscriptionChanged
     * Sets the activ employer's license and splits out the features into the array: aEmployer.license.activeFeatures
     */
    ezSetSelectedEmployerAccountLicense(activeEmployerLicense) {
        if (!EzObject.isValid(EzClockerContext.ezInstance.ezGetUserContext())) {
            throw new EzException(
                EzString.em`
                    A valid user context is required
                    in ${EzClockerContext.ezInstance.ezSetSelectedEmployerAccountLicense}`);
        }
        if (!EzObject.isValid(EzClockerContext.ezInstance.ezGetUserContext())) {
            throw new EzException(
                EzString.em`
                    A valid selected employer account is required
                    in ${EzClockerContext.ezInstance.ezSetSelectedEmployerAccountLicense}`);
        }
        if (!EzObject.isValid(activeEmployerLicense)) {
            throw new EzBadParamException(
                'activatingEmployer',
                EzClockerContext.ezInstance,
                EzClockerContext.ezInstance.ezSetSelectedEmployerAccountLicense);
        }
        if (!EzClockerContext.ezInstance.ezGetUserContext().isEmployer &&
            !EzClockerContext.ezInstance.ezGetUserContext().isManager &&
            !EzClockerContext.ezInstance.ezGetUserContext().isPayrollManager) {
            throw new EzException(
                'Only Employer, Payroll Manager, and Manager accounts can set the selected employer\'s license.');
        }

        let changed = EzObject.isValid(EzClockerContext.ezInstance.ezGetSelectedEmployerAccountLicense()) &&
            EzBoolean.isTrue(EzClockerContext.ezInstance.ezGetSelectedEmployerAccountLicense().ready);

        EzClockerContext.ezInstance.employerContext.selectedEmployerAccountLicense = EzClockerContext.ezCreateDefaultEmployerLicense();

        EzClockerContext.ezInstance.employerContext.selectedEmployerAccountLicense = activeEmployerLicense;

        EzClockerContext.ezInstance.employerContext.selectedEmployerAccountLicense.available = true;

        EzClockerContext.ezInstance.employerContext.selectedEmployerAccountLicense.ready = true;

        let features = EzClockerContext.ezInstance.ezGetSelectedEmployerAccountSubscriptionPlan().enabledFeatures;

        EzClockerContext.ezInstance.employerContext.selectedEmployerAccountLicense.enabledFeatures = EzArray.isArray(features)
            ? features
            : [];

        EzClockerContext.ezInstance.ezTriggerEzClockerContextEvent(
            EzBoolean.isTrue(changed)
                ? EzClockerContextEventName.onSelectedEmployerLicenseUpdated
                : EzClockerContextEventName.onSelectedEmployerLicenseReady,
            EzBoolean.isTrue(changed)
                ? 'Selected Employer license updated'
                : 'Selected Employer license is ready',
            EzClockerContext.ezInstance.ezGetSelectedEmployerAccountLicense());

        EzClockerContext.ezInstance.activeEmployer.license = activeEmployerLicense;

        /*
            EzClockerContext.ezInstance.ezSubscriptionContextActiveSubscriptionPlan can trigger
            one of the following events:
                1) EzClockerContextEventName.onSubscriptionContextActiveSubscriptionReady
                2) EzClockerContextEventName.onSubscriptionContextActiveSubscriptionChanged
        */
        EzClockerContext.ezInstance.ezSubscriptionContextActiveSubscriptionPlan = activeEmployerLicense.subscriptionPlan;

        EzClockerContext.ezInstance.ezValidateSelectedEmployerAccountLicense();
    }

    /**
     * @public @property @getter
     * Gets the subscription context's active subscription plan reference.
     * @returns {object}
     */
    get ezSubscriptionContextActiveSubscriptionPlan() {
        return this.ezSubscriptionContext.activeSubscription;
    }
    /**
     * @public @property @setter
     * Sets the subscription context's active subscription plan reference.
     * Can triggers one of the following events:
     *  1) EzClockerContextEventName.onSubscriptionContextActiveSubscriptionChanged
     *  2) EzClockerContextEventName.onSubscriptionContextActiveSubscriptionReady,
     * @param {object} activeSubscriptionPlan
     */
    set ezSubscriptionContextActiveSubscriptionPlan(activeSubscriptionPlan) {
        if (!EzObject.isValid(activeSubscriptionPlan) || !EzNumber.isNumber(activeSubscriptionPlan.id)) {
            this.ezSubscriptionContext.activeSubscription = EzClockerContext.ezCreateDefaultActiveSubscription();
        } else {
            let changed = EzBoolean.isTrue(this.ezSubscriptionContext.activeSubscription.ready);

            this.ezSubscriptionContext.activeSubscription = EzClockerContext.ezCreateDefaultActiveSubscription();

            this.ezSubscriptionContext.activeSubscription.id = EzNumber.numberOrNull(activeSubscriptionPlan.id);

            this.ezSubscriptionContext.activeSubscription.name = EzString.stringOrEmpty(activeSubscriptionPlan.name);

            this.ezSubscriptionContext.activeSubscription.planId = EzObject.assignOrDefault(
                activeSubscriptionPlan.planId,
                'ez2021.noplan');

            this.ezSubscriptionContext.activeSubscription.andriodPlanName = EzString.stringOrEmpty(activeSubscriptionPlan.andriodPlanName);

            this.ezSubscriptionContext.activeSubscription.applePlanName = EzObject.assignOrDefault(
                activeSubscriptionPlan.applePlanName,
                'com.eznovatech.ez2021.noplan');

            this.ezSubscriptionContext.activeSubscription.brainTreePlanName = EzObject.assignOrDefault(
                activeSubscriptionPlan.brainTreePlanName,
                'ez2021-noplan');

            this.ezSubscriptionContext.activeSubscription.description = EzObject.assignOrDefault(
                activeSubscriptionPlan.description,
                'NO PLAN');

            this.ezSubscriptionContext.activeSubscription.detail = EzObject.assignOrDefault(
                activeSubscriptionPlan.detail,
                'Not subscribed.');

            this.ezSubscriptionContext.activeSubscription.bulletPointsJson = EzString.hasLength(activeSubscriptionPlan.bulletPointsJson)
                ? EzJson.fromJson(activeSubscriptionPlan.bulletPointsJson)
                : {
                    items: []
                };

            this.ezSubscriptionContext.activeSubscription.maximumEmployees = EzNumber.numberOrDefault(
                activeSubscriptionPlan.maximumEmployees,
                1);

            this.ezSubscriptionContext.activeSubscription.features = EzArray.arrayOrEmpty(activeSubscriptionPlan.features);

            this.ezSubscriptionContext.activeSubscription.dailyFee = EzNumber.numberOrZero(activeSubscriptionPlan.dailyFee);

            this.ezSubscriptionContext.activeSubscription.monthlyFee = EzNumber.numberOrZero(activeSubscriptionPlan.montlyFee);

            this.ezSubscriptionContext.activeSubscription.yearlyFee = EzNumber.numberOrZero(activeSubscriptionPlan.yearlyFee);

            this.ezSubscriptionContext.activeSubscription.appleStoreFee = EzNumber.numberOrZero(activeSubscriptionPlan.appleStoreFee);

            this.ezSubscriptionContext.activeSubscription.googlePlayStoreFee = EzNumber.numberOrZero(
                activeSubscriptionPlan.googlePlayStoreFee);

            this.ezSubscriptionContext.activeSubscription.cashDiscount = EzNumber.numberOrZero(activeSubscriptionPlan.cashDiscount);

            this.ezSubscriptionContext.activeSubscription.percentDiscount = EzNumber.numberOrZero(activeSubscriptionPlan.percentDiscount);

            this.ezSubscriptionContext.activeSubscription.enabled = EzBoolean.booleanOrFalse(activeSubscriptionPlan.enabled);

            this.ezSubscriptionContext.activeSubscription.isFreePlan = EzBoolean.booleanOrFalse(activeSubscriptionPlan.isFreePlan);

            this.ezSubscriptionContext.activeSubscription.apiAccess = EzBoolean.booleanOrFalse(activeSubscriptionPlan.apiAccess);

            this.ezSubscriptionContext.activeSubscription.planLevel = EzNumber.numberOrZero(activeSubscriptionPlan.planLevel);

            this.ezSubscriptionContext.activeSubscription.planIteration = EzNumber.numberOrDefault(
                activeSubscriptionPlan.planIteration,
                2);

            this.ezSubscriptionContext.activeSubscription.internalNotes = EzString.stringOrEmpty(activeSubscriptionPlan.internalNotes);

            this.ezSubscriptionContext.activeSubscription.ready = true;

            // Trigger event
            this.ezTriggerEzClockerContextEvent(
                EzBoolean.isTrue(changed)
                    ? EzClockerContextEventName.onSubscriptionContextActiveSubscriptionChanged
                    : EzClockerContextEventName.onSubscriptionContextActiveSubscriptionReady,
                EzBoolean.isTrue(changed)
                    ? 'Subscription context\'s active subscription is ready.'
                    : 'Subscription context\'s active subscription changed.',
                this.ezSubscriptionContext.activeSubscription);
        }
    }
    /**
     * @public @method
     * Sets the Active Employer's activeSubscription
     * Can triggers one of the following events:
     *  1) EzClockerContextEventName.onSubscriptionContextActiveSubscriptionChanged
     *  2) EzClockerContextEventName.onSubscriptionContextActiveSubscriptionReady,
     * @param {object} activeSubscriptionPlan
     * @deprecated
     * Migrate to calling the getter/setter property:
     *  EzClockerContext.ezInstance.ezSubscriptionContextActiveSubscriptionPlan
     */
    ezSetSubscriptionContextActiveSubscription(activeSubscriptionPlan) {
        if (!EzObject.isValid(activeSubscriptionPlan) || !EzNumber.isNumber(activeSubscriptionPlan.id)) {
            throw new EzBadParamException(
                'activeSubscriptionPlan',
                this,
                this.ezSetSubscriptionContextActiveSubscription);
        }

        EzClockerContext.ezInstance.ezSubscriptionContextActiveSubscriptionPlan = activeSubscriptionPlan;
    }

    /**
     * @public @method
     * Returns the selected employer account's employees
     * @returns {array}
     */
    ezGetSelectedEmployerAccountEmployees() {
        if (!EzObject.isValid(EzClockerContext.ezInstance.employerContext)) {
            throw new EzException(
                EzString.em`
                    A valid employer context is required
                    in ${EzClockerContext.ezInstance.ezSetSelectedEmployerAccountEmployees}`);
        }

        if (!EzObject.isValid(EzClockerContext.ezInstance.ezGetSelectedEmployerAccount())) {
            throw new EzException(
                EzString.em`
                    A valid selected employer account is required
                    in ${EzClockerContext.ezInstance.ezSetSelectedEmployerAccountEmployees}`);
        }

        return EzClockerContext.ezInstance.employerContext.selectedEmployerAccountEmployeeAccounts;
    }

    /**
     * @public @method
     * Sets the Active Employer's employes to the ones provided.
     * @param {array} employerEmployees
     */
    ezSetSelectedEmployerAccountEmployees(employerEmployees) {
        if (!EzObject.isValid(EzClockerContext.ezInstance.employerContext)) {
            throw new EzException(
                EzString.em`
                    A valid employer context is required
                    in ${EzClockerContext.ezInstance.ezSetSelectedEmployerAccountEmployees}`);
        }

        if (!EzObject.isValid(EzClockerContext.ezInstance.ezGetSelectedEmployerAccount())) {
            throw new EzException(
                EzString.em`
                    A valid selected employer account is required
                    in ${EzClockerContext.ezInstance.ezSetSelectedEmployerAccountEmployees}`);
        }

        if (!EzArray.arrayHasLength(employerEmployees)) {
            EzClockerContext.ezInstance.employerContext.selectedEmployerAccountEmployeeAccounts = [];
            EzClockerContext.ezInstance.employerContext.selectedEmployerAccountEmployeeAccountsById = {};
            EzClockerContext.ezInstance.ezTriggerEzClockerContextEvent(
                EzClockerContextEventName.onSelectedEmployerEmployeeAccountsUpdated,
                'Selected employer\'s employee accounts updated.',
                EzClockerContext.ezInstance.ezGetSelectedEmployerAccountData());

            return;
        }

        EzClockerContext.ezInstance.employerContext.selectedEmployerAccountEmployeeAccounts = EzClockerContext.ezInstance.ezSortEmployeeArrayByName(
            employerEmployees);

        // Index by id
        EzClockerContext.ezInstance.employerContext.selectedEmployerAccountEmployeeAccountsById = EzClockerContext.ezInstance.ezIndexEmployeeAccountsById(
            EzClockerContext.ezInstance.employerContext.selectedEmployerAccountEmployeeAccounts);

        EzClockerContext.ezInstance.ezTriggerEzClockerContextEvent(
            EzClockerContextEventName.onSelectedEmployerEmployeeAccountsUpdated,
            'Selected employer\'s employee accounts updated.',
            EzClockerContext.ezInstance.ezGetSelectedEmployerAccountData());
    }

    /**
     * @public @method
     * Reads an option for the Active Employer. Will return the default value if the option does not exist
         (including when the Active Employer is not available)
     * @param {string} aOptionName
     * @param {string} defaultValue
     * @returns {*}
     */
    ezReadSelectedEmployerAccountOption(aOptionName, defaultValue) {
        if (!EzString.hasLength(aOptionName)) {
            throw new EzBadParamException(
                'aOptionName',
                EzClockerContext.ezInstance,
                EzClockerContext.ezInstance.ezReadSelectedEmployerAccountOption);
        }
        if (!EzObject.isValid(EzClockerContext.ezInstance.employerContext)) {
            throw new EzException(
                EzString.em`
                    A valid employer context is required
                    in ${EzClockerContext.ezInstance.ezReadSelectedEmployerAccountOption}`);
        }
        if (!EzObject.isValid(EzClockerContext.ezInstance.ezGetSelectedEmployerAccount())) {
            throw new EzException(
                EzString.em`
                    A valid selected employer account is required
                    in ${EzClockerContext.ezInstance.ezReadSelectedEmployerAccountOption}`);
        }

        if (!EzObject.isValid(EzClockerContext.ezInstance.employerContext.selectedEmployerAccountOptions)) {
            EzClockerContext.ezInstance.employerContext.selectedEmployerAccountOptions = {};
        }

        if (!EzObject.hasProperty(EzClockerContext.ezInstance.employerContext.selectedEmployerAccountOptions, aOptionName)) {
            EzClockerContext.ezInstance.employerContext.selectedEmployerAccountOptions[aOptionName] = defaultValue;
        }

        let value = EzClockerContext.ezInstance.employerContext.selectedEmployerAccountOptions[aOptionName];

        return EzObject.isValid(value)
            ? value
            : defaultValue;
    }

    /**
     * @public @method
     * Saves an employer option
     * @param {string} optionName
     * @param {*} optionValue
     * @returns {Promise.resolve}
     */
    ezSaveSelectedEmployerOption(optionName, optionValue) {
        if (!EzString.hasLength(optionName)) {
            throw new EzBadParamException(
                'optionName',
                EzClockerContext.ezInstance,
                EzClockerContext.ezInstance.ezSaveSelectedEmployerOption);
        }
        if (!EzString.hasLength(optionValue)) {
            throw new EzBadParamException(
                'optionValue',
                EzClockerContext.ezInstance,
                EzClockerContext.ezInstance.ezSaveSelectedEmployerOption);
        }
        if (!EzObject.isValid(EzClockerContext.ezInstance.ezGetUserContext())) {
            throw new EzException(
                EzString.em`
                    A valid user context is required
                    in ${EzClockerContext.ezInstance.ezSaveSelectedEmployerOption}`);
        }
        if (!EzObject.isValid(EzClockerContext.ezInstance.employerContext)) {
            throw new EzException(
                EzString.em`
                    A valid employer context is required
                    in ${EzClockerContext.ezInstance.ezSaveSelectedEmployerOption}`);
        }

        if (!EzClockerContext.ezInstance.ezGetUserContext().isEmployer &&
            !EzClockerContext.ezInstance.ezGetUserContext().isManager &&
            !EzClockerContext.ezInstance.ezGetUserContext().isPayrollManager) {
            throw new EzException('Only Employer, Payroll Manager, Manager accounts can save Employer account options.');
        }

        return EzPromise.asyncAction(
            (finished) => {
                // Save the new option to db
                return ezApi.ezclocker.ezOptionsService.ezPersistEmployerOption(
                    EzClockerContext.ezInstance.ezGetSelectedEmployerAccount().id,
                    optionName,
                    optionValue)
                    .then(
                        ezApi.ezclocker.ezHttpHelper.ezProcessApiResolve,
                        ezApi.ezclocker.ezHttpHelper.ezProcessApiReject)
                    .then(
                        (response) => {
                            // Update the option in the local cache
                            if (!EzObject.isValid(EzClockerContext.ezInstance.employerContext.selectedEmployerAccountOptions)) {
                                EzClockerContext.ezInstance.employerContext.selectedEmployerAccountOptions = {};
                            }

                            EzClockerContext.ezInstance.employerContext.selectedEmployerAccountOptions[optionName] = optionValue;

                            // Update active employer options
                            if (EzObject.isValid(EzClockerContext.ezInstance.activeEmployer)) {
                                EzClockerContext.ezInstance.activeEmployer.options = EzClockerContext.ezInstance.employerContext.selectedEmployerAccountOptions;
                            }

                            return finished(response);
                        },
                        (eResponse) => {
                            ezApi.ezclocker.ezLogger.error(
                                EzString.em`
                                    Unable to save the active employer's option ${optionName}=${optionValue}.
                                    Error: ${EzJson.toJson(eResponse)}`);

                            return finished(eResponse);
                        });
            });
    }

    /**
     * @public @method
     * Refreshes the Active Employer's employee listing.
     * @returns {Promise.resolve}
     */
    ezRefreshSelectedEmployerEmployees() {
        if (!EzObject.isValid(EzClockerContext.ezInstance.employerContext)) {
            throw new EzException(
                EzString.em`
                    A valid employer context is required
                    in ${EzClockerContext.ezInstance.ezSaveSelectedEmployerOption}`);
        }
        if (!EzObject.isValid(EzClockerContext.ezInstance.ezGetSelectedEmployerAccount())) {
            throw new EzException(
                EzString.em`
                    A valid selected employer account is required
                    in ${EzClockerContext.ezInstance.ezSaveSelectedEmployerOption}`);
        }

        return ezApi.ezResolver(
            (resolve) => {
                ezApi.ezclocker.ezHttpHelper.ezGet(
                    ezApi.ezclocker.ezNavigation.ezGetInternalApiUrl('employer/employees', 'v2'))
                    .then(
                        ezApi.ezclocker.ezHttpHelper.ezProcessApiResolve,
                        ezApi.ezclocker.ezHttpHelper.ezProcessApiReject)
                    .then(
                        (response) => {
                            EzClockerContext.ezInstance.ezSetSelectedEmployerAccountEmployees(response.entities);

                            return resolve(response);
                        },
                        (eResponse) => {
                            ezApi.ezclocker.ezLogger.error(
                                EzString.em`
                                    Failed to load the selected Employer's employees.
                                    Error: ${EzJson.toJson(eResponse)}`);

                            return resolve(eResponse);
                        });
            });
    }

    /**
     * @public @method
     * Returns the selected employer account's employees organized by id
     * @returns {array}
     */
    ezGetSelectedEmployerAccountEmployeeAccountsById() {
        if (!EzObject.isValid(EzClockerContext.ezInstance.employerContext)) {
            throw new EzException(
                EzString.em`
                    A valid employer context is required
                    in ${EzClockerContext.ezInstance.ezGetSelectedEmployerAccountEmployeeAccountsById}`);
        }
        if (!EzObject.isValid(EzClockerContext.ezInstance.ezGetSelectedEmployerAccount())) {
            throw new EzException(
                EzString.em`
                    A valid selected employer account is required
                    in ${EzClockerContext.ezInstance.ezGetSelectedEmployerAccountEmployeeAccountsById}`);
        }

        if (!EzObject.isValid(EzClockerContext.ezInstance.employerContext.selectedEmployerAccountEmployeeAccountsById)) {
            EzClockerContext.ezInstance.employerContext.selectedEmployerAccountEmployeeAccountsById = {};
        }

        return EzClockerContext.ezInstance.employerContext.selectedEmployerAccountEmployeeAccountsById;
    }

    /**
     * @public @method
     * Obtains the select employer's employee reference associated with the provided employeeId (if any)
     * @param {number} employeeId
     * @returns {null|object}
     */
    ezGetSelectedEmployerAccountEmployeeAccountForEmployeeId(employeeId) {
        if (!EzNumber.isNumber(employeeId)) {
            throw new EzBadParamException(
                'employeeId',
                EzClockerContext.ezInstance,
                EzClockerContext.ezInstance.ezGetSelectedEmployerAccountEmployeeAccountForEmployeeId);
        }

        if (!EzObject.isValid(EzClockerContext.ezInstance.employerContext)) {
            throw new EzException(
                EzString.em`
                    A valid employer context is required
                    in ${EzClockerContext.ezInstance.ezGetSelectedEmployerAccountEmployeeAccountForEmployeeId}`);
        }

        if (!EzObject.isValid(EzClockerContext.ezInstance.ezGetSelectedEmployerAccount())) {
            throw new EzException(
                EzString.em`
                    A valid selected employer account is required
                    in ${EzClockerContext.ezInstance.ezGetSelectedEmployerAccountEmployeeAccountForEmployeeId}`);
        }

        let employeeAccountsById = EzClockerContext.ezInstance.ezGetSelectedEmployerAccountEmployeeAccountsById();

        if (!EzObject.hasProperty(employeeAccountsById, employeeId.toString())) {
            ezApi.ezclocker.ezLogger.error(
                EzString.em`
                    Selected employer's employee with employeeId=${employeeId} is not currently within the
                    selected employer account's employee accounts cache.`);

            return null;
        }

        return employeeAccountsById[employeeId.toString()];
    }

    /**
     * @public @method
     * Returns if the selected employer account exists (meaning employer dashboard mode)
     * @returns {boolean}
     */
    ezSelectedEmployerAccountExists() {
        if (!EzObject.isValid(EzClockerContext.ezInstance.employerContext)) {
            throw new EzException(
                EzString.em`
                    A valid employer context is required
                    in ${EzClockerContext.ezInstance.ezSelectedEmployerAccountExists}`);
        }

        if (!EzArray.isArray(EzClockerContext.ezInstance.employerContext.employerAccounts)) {
            EzClockerContext.ezInstance.employerContext.employerAccounts = [];
        }

        if (!EzNumber.isNumber(EzClockerContext.ezInstance.employerContext.selectedEmployerAccountIndex)) {
            EzClockerContext.ezInstance.employerContext.selectedEmployerAccountIndex = -1;
        }

        return 0 <= EzClockerContext.ezInstance.employerContext.selectedEmployerAccountIndex &&
            EzClockerContext.ezInstance.employerContext.selectedEmployerAccountIndex <
            EzClockerContext.ezInstance.employerContext.employerAccounts.length;
    }

    /**
     * @public @method
     * Returns the selected employer on the employer context (if any)
     * @returns {object}
     * Returns the selected employer account reference or null if not available.
     */
    ezGetSelectedEmployerAccount() {
        if (!EzObject.isValid(EzClockerContext.ezInstance.employerContext)) {
            throw new EzException(
                EzString.em`
                    A valid employer context is required
                    in ${EzClockerContext.ezInstance.ezGetSelectedEmployerAccount}`);
        }

        if (!EzArray.isArray(EzClockerContext.ezInstance.employerContext.employerAccounts)) {
            EzClockerContext.ezInstance.employerContext.employerAccounts = [];
        }

        if (!EzNumber.isNumber(EzClockerContext.ezInstance.employerContext.selectedEmployerAccountIndex)) {
            EzClockerContext.ezInstance.employerContext.selectedEmployerAccountIndex = -1;
        }

        if (0 > EzClockerContext.ezInstance.employerContext.selectedEmployerAccountIndex ||
            EzClockerContext.ezInstance.employerContext.selectedEmployerAccountIndex >=
            EzClockerContext.ezInstance.employerContext.employerAccounts.length) {
            ezApi.ezclocker.ezLogger.warn(
                EzString.em`
                    Unable to return the selected employer. The employer contex's
                    selected employer account index of
                    ${EzClockerContext.ezInstance.employerContext.selectedEmployerAccountIndex} is out of range.`);

            return null;
        }

        return 0 <= EzClockerContext.ezInstance.employerContext.selectedEmployerAccountIndex
            ? EzClockerContext
                .ezInstance
                .employerContext
                .employerAccounts[EzClockerContext.ezInstance.employerContext.selectedEmployerAccountIndex]
            : null; // no selected epmloyer account
    }

    /**
     * @public @method
     * Gets the selected employer account's archived employees.
     * NOTE: ezLoadSelectedEmployerAccountArchviedEmployees must be called first.
     * @returns {array}
     */
    ezGetSelectedEmployerAccountArchivedEmployees() {
        if (!EzObject.isValid(EzClockerContext.ezInstance.ezGetSelectedEmployerAccount())) {
            throw new EzException(
                EzString.em`
                    A valid select employer account is required
                    in ${EzClockerContext.ezInstance.ezGetSelectedEmployerAccountArchivedEmployees}`);
        }

        if (!EzArray.isArray(EzClockerContext.ezInstance.employerContext.selectedEmployerAccountArchivedEmployees)) {
            EzClockerContext.ezInstance.employerContext.selectedEmployerAccountArchivedEmployees = [];
        }

        return EzClockerContext.ezInstance.employerContext.selectedEmployerAccountArchivedEmployees;
    }

    /**
     * @public @method
     * Sets the Active Employer's employer information.
     * @param {object} selectedEmployerInfo
     */
    ezSetSelectedEmployerEmployerInfo(selectedEmployerInfo) {
        if (!EzObject.isValid(EzClockerContext.ezInstance.ezGetUserContext())) {
            throw new EzException(
                EzString.em`
                    A valid user context is required
                    in ${EzClockerContext.ezInstance.ezGetSelectedEmployerAccountArchivedEmployees}`);
        }
        if (!EzObject.isValid(EzClockerContext.ezInstance.employerContext)) {
            throw new EzException(
                EzString.em`
                    A valid employer context is required
                    in ${EzClockerContext.ezInstance.ezGetSelectedEmployerAccountArchivedEmployees}`);
        }
        if (!EzObject.isValid(selectedEmployerInfo)) {
            throw new EzBadParamException(
                'activeEmployerInfo',
                EzClockerContext.ezInstance,
                EzClockerContext.ezInstance.ezSetSelectedEmployerEmployerInfo);
        }

        if (!EzClockerContext.ezInstance.ezGetUserContext().isEmployer &&
            !EzClockerContext.ezInstance.ezGetUserContext().isManager &&
            !EzClockerContext.ezInstance.ezGetUserContext().isPayrollManager) {
            throw new EzException(
                'Only Employer, Payroll Manager, and Manager accounts can set the selected employer\'s employer info.');
        }

        if (EzClockerContext.ezInstance.employerContext.id !== selectedEmployerInfo.id) {
            throw new EzException(
                'The provided employer information\'s id does not match the selected employer\'s id.');
        }

        EzClockerContext
            .ezInstance
            .employerContext
            .selectedEmployerAccount
            .businessType = EzString.stringOrEmpty(selectedEmployerInfo.businessType);

        EzClockerContext
            .ezInstance
            .employerContext
            .selectedEmployerAccount.note = EzString.stringOrEmpty(selectedEmployerInfo.city);

        EzClockerContext
            .ezInstance
            .employerContext
            .selectedEmployerAccount.freeTrialStartIso = EzString.stringOrEmpty(selectedEmployerInfo.freeTrialStartDateString);

        /*
            EzClockerContext.ezInstance.ezSetActiveEmployer triggers:
                EzClockerContextEventName.onActiveEmployerChanged
        */
        EzClockerContext.ezInstance.ezSetActiveEmployerEmployerAddress(selectedEmployerInfo);
    }

    /**
     * @public @method
     * Returns the selected employer account's employees
     * @returns {array}
     */
    ezGetSelectedEmployerAccountEmployeeAccounts() {
        if (!EzObject.isValid(EzClockerContext.ezInstance.employerContext)) {
            throw new EzException(
                EzString.em`
                    A valid employer context is required
                    in ${EzClockerContext.ezInstance.ezGetSelectedEmployerAccountEmployeeAccounts}`);
        }
        if (!EzObject.isValid(EzClockerContext.ezInstance.ezGetSelectedEmployerAccount())) {
            throw new EzException(
                EzString.em`
                    A valid selected employer account is required
                    in ${EzClockerContext.ezInstance.ezGetSelectedEmployerAccountEmployeeAccounts}`);
        }

        if (!EzArray.isArray(EzClockerContext.ezInstance.employerContext.selectedEmployerAccountEmployeeAccounts)) {
            EzClockerContext.ezInstance.employerContext.selectedEmployerAccountEmployeeAccounts = [];
        }

        return EzClockerContext.ezInstance.employerContext.selectedEmployerAccountEmployeeAccounts;
    }

    /**
     * @public @method
     * Returns the integration employees for the provided EzIntegrationProviderId (if any)
     * @returns {array}
     */
    ezGetSelectedEmployerIntegrationEmployees(ezIntegrationProviderId) {
        if (!EzObject.isValid(EzClockerContext.ezInstance.employerContext)) {
            throw new EzException(
                EzString.em`
                    A valid employer context is required
                    in ${EzClockerContext.ezInstance.ezGetSelectedEmployerAccountEmployeeAccounts}`);
        }

        return EzArray.arrayOrEmpty(
            EzClockerContext.ezInstance.employerContext.selectedEmployerAccountIntegrationEmployees[ezIntegrationProviderId]);
    }

    /**
     * @public @method
     * Refreshes/loads the selected employer's employees used for a specific integration.
     * @param {string} ezIntegrationProviderId
     * @returns {Promise}
     */
    ezRefreshSelectedEmployerIntegrationEmployees(ezIntegrationProviderId) {
        if (!EzObject.isValid(EzClockerContext.ezInstance.employerContext)) {
            throw new EzException(
                EzString.em`
                    A valid employer context is required
                    in ${EzClockerContext.ezInstance.ezGetSelectedEmployerAccountEmployeeAccounts}`);
        }
        if (!EzString.hasLength(ezIntegrationProviderId)) {
            throw new EzBadParamException(
                'ezIntegrationProviderId',
                EzClockerContext.ezInstance,
                EzClockerContext.ezInstance.ezRefreshSelectedEmployerIntegrationEmployees);
        }

        // Clear existing
        EzClockerContext.ezInstance.employerContext.selectedEmployerAccountIntegrationEmployees[ezIntegrationProviderId] = [];

        return EzPromise.promise(
            (resolve, reject) => {
                return ezApi.ezclocker.ezHttpHelper.ezGet(
                    `/_api/v1/integrations/${ezIntegrationProviderId}/query/employees`)
                    .then(
                        ezApi.ezclocker.ezHttpHelper.ezProcessApiResolve,
                        ezApi.ezclocker.ezHttpHelper.ezProcessApiReject)
                    .then(
                        (response) => {
                            EzClockerContext.ezInstance.ezSetSelectedEmployerIntegrationEmployees(
                                ezIntegrationProviderId,
                                response.entities);

                            return resolve(response);
                        },
                        (eResponse) => {
                            ezApi.ezclocker.ezLogger.error(
                                EzString.em`
                                    Failed to refresh the selected employer's integration employees.
                                    Error: ${EzJson.toJson(eResponse)}`);

                            return reject(eResponse);
                        });
            });
    }

    /**
     * @public @method
     * Sets the selected employer's integration employees.
     * @param {string} ezIntegrationProviderId
     * @param {array} integrationEmployees
     */
    ezSetSelectedEmployerIntegrationEmployees(ezIntegrationProviderId, integrationEmployees) {
        if (!EzObject.isValid(EzClockerContext.ezInstance.employerContext)) {
            throw new EzException(
                EzString.em`
                    A valid employer context is required
                    in ${EzClockerContext.ezInstance.ezGetSelectedEmployerAccountEmployeeAccounts}`);
        }
        if (!EzString.hasLength(ezIntegrationProviderId)) {
            throw new EzBadParamException(
                'ezIntegrationProviderId',
                EzClockerContext.ezInstance,
                EzClockerContext.ezInstance.ezSetSelectedEmployerIntegrationEmployees);
        }

        let updating = EzObject.hasProperty(
            EzClockerContext.ezInstance.employerContext.selectedEmployerAccountIntegrationEmployees,
            ezIntegrationProviderId);

        EzClockerContext.ezInstance.employerContext.selectedEmployerAccountIntegrationEmployees[ezIntegrationProviderId] =
            EzArray.arrayOrEmpty(integrationEmployees);

        ezApi.ezclocker.ezEventEngine.ezTriggerEvent(
            EzBoolean.isTrue(updating)
                ? EzClockerContextEventName.onSelectedEmployerIntegerationEmployeesUpdating
                : EzClockerContextEventName.onSelectedEmployerIntegerationEmployeesReady,
            ezApi.ezclocker.ezEventEngine.ezBuildEventData(
                EzClockerContext.ezApiName,
                EzBoolean.isTrue(updating)
                    ? `Selected employer's integration employees for integration ${ezIntegrationProviderId} updated.`
                    : `Selected employer's integration employees for integration ${ezIntegrationProviderId} ready.`,
                {
                    ezIntegrationProviderId: ezIntegrationProviderId,
                    integrationEmployees: EzClockerContext
                        .ezInstance
                        .employerContext
                        .selectedEmployerAccountIntegrationEmployees[ezIntegrationProviderId]
                }));
    }

    /**
     * @public @method
     * Returns the selected employer account license.
     * @returns {object}
     */
    ezGetSelectedEmployerAccountLicense() {
        if (!EzObject.isValid(EzClockerContext.ezInstance.employerContext)) {
            throw new EzException(
                EzString.em`
                    A valid employer context is required
                    in ${EzClockerContext.ezInstance.ezGetSelectedEmployerAccountLicense}`);
        }

        if (!EzObject.isValid(EzClockerContext.ezInstance.ezGetSelectedEmployerAccount())) {
            throw new EzException(
                EzString.em`
                    A valid active employer account is required
                    in ${EzClockerContext.ezInstance.ezGetSelectedEmployerAccountLicense}`);
        }

        if (!EzObject.isValid(EzClockerContext.ezInstance.employerContext.selectedEmployerAccountLicense)) {
            EzClockerContext.ezInstance.employerContext.selectedEmployerAccountLicense =
                EzClockerContext.ezCreateDefaultEmployerLicense();
        }

        return EzClockerContext.ezInstance.employerContext.selectedEmployerAccountLicense;
    }

    /**
     * @public @method
     * Determines if a featureId is enabled on the Active Employer's license
     * @param {string} featureId
     * @returns {Boolean}
     */
    ezSelectedEmployerAccountFeatureEnabled(featureId) {
        if (!EzObject.isValid(EzClockerContext.ezInstance.ezGetSelectedEmployerAccount())) {
            throw new EzException(
                EzString.em`
                    A valid active employer account is required
                    in ${EzClockerContext.ezInstance.ezSelectedEmployerAccountFeatureEnabled}`);
        }

        if (!EzString.hasLength(featureId)) {
            return false;
        }

        return -1 !== EzClockerContext
            .ezInstance
            .ezGetSelectedEmployerAccountSubscriptionPlan()
            .enabledFeatures
            .indexOf(featureId);
    }

    /**
     * @public @method
     * Gets the selected employer account's license subscription plan
     * @returns {object}
     */
    ezGetSelectedEmployerAccountSubscriptionPlan() {
        if (!EzObject.isValid(EzClockerContext.ezInstance.ezGetSelectedEmployerAccount())) {
            throw new EzException(
                EzString.em`
                    A valid active employer account is required
                    in ${EzClockerContext.ezInstance.ezGetSelectedEmployerAccountSubscriptionPlan}`);
        }

        if (!EzObject.isValid(EzClockerContext.ezInstance.ezGetSelectedEmployerAccountLicense().subscriptionPlan)) {
            EzClockerContext.ezInstance.employerContext.selectedEmployerAccount.license.subscriptionPlan =
                EzClockerContext.ezCreateDefaultSubscriptionPlan();
        }

        return EzClockerContext.ezInstance.ezGetSelectedEmployerAccountLicense().subscriptionPlan;
    }

    /**
     * @public @method
     * Gets all the active integrations for the selected employer account.
     * @returns {object}
     * {
     *     errorCode: {0|404},
     *     message: {'success'|'Active integrations not yet loaded'},
     *     primaryIntegrations: {Map<EzIntegrationType, EmployerIntegrationMap>|{}}
     *     activeIntegrations: {Collection<EmployerIntegrationMap>|[]}
     *     providerIntegrations: {Map<EzIntegrationProviderId, List<EmployerIntegrationMap>>|{}}
     * }
     */
    ezGetSelectedEmployerAccountActiveIntegrations() {
        let selectedEmployer = EzClockerContext.ezInstance.ezGetSelectedEmployerAccount();

        if (!EzObject.isValid(selectedEmployer)) {
            throw new EzException(
                EzString.em`
                    A valid active employer account is required
                    in ${EzClockerContext.ezInstance.ezGetSelectedEmployerAccountActiveIntegrations}`);
        }

        let index = EzClockerContext.ezInstance.ezGetSelectedEmployerAccountSubscriptionPlanFeatures().indexOf('INTEGRATIONS');

        if (0 > index) {
            selectedEmployer.ezIntegrations = {
                errorCode: 426,
                message: 'Subscription plan does not support the integrations feature.',
                primaryIntegrations: {},
                activeIntegrations: [],
                providerIntegrations: {}
            };
        } else if (!EzObject.isValid(EzClockerContext.ezInstance.ezGetSelectedEmployerAccount().ezIntegrations)) {
            selectedEmployer.ezIntegrations = {
                errorCode: 404,
                message: 'Active integrations not yet loaded',
                primaryIntegrations: {},
                activeIntegrations: [],
                providerIntegrations: {}
            };
        }

        return selectedEmployer.ezIntegrations;
    }

    /**
     * @public @method
     * Sets the active employer's active integrations in the cache
     * @param {object} integrations
     * {
     *     errorCode: {0|404},
     *     message: {'success'|'Active integrations not yet loaded'},
     *     primaryIntegrations: {Map<EzIntegrationType, EmployerIntegrationMap>|{}}
     *     activeIntegrations: {Collection<EmployerIntegrationMap>|[]}
     *     providerIntegrations: {Map<EzIntegrationProviderId, List<EmployerIntegrationMap>>|{}}
     * }
     */
    ezSetSelectedEmployerAccountActiveIntegrations(integrations) {
        let selectedEmployer = EzClockerContext.ezInstance.ezGetSelectedEmployerAccount();

        if (!EzObject.isValid(selectedEmployer)) {
            throw new EzException(
                EzString.em`
                    A valid active employer account is required
                    in ${EzClockerContext.ezInstance.ezSetSelectedEmployerAccountActiveIntegrations}`);
        }

        if (!EzObject.isValid(integrations)) {
            integrations = EzClockerContext.ezCreateDefaultSelectedEmployerIntegrations();
            integrations.errorCode = 404;
            integrations.message = 'No integrations available';
        }

        let index = EzClockerContext.ezInstance.ezGetSelectedEmployerAccountSubscriptionPlanFeatures().indexOf('INTEGRATIONS');

        if (0 > index) {
            integrations = EzClockerContext.ezCreateDefaultSelectedEmployerIntegrations();
            integrations.errorCode = 426;
            integrations.message = 'Subscription plan does not support the integrations feature.';
        } else {
            if (!EzObject.isValid(integrations.primaryIntegrations)) {
                integrations.primaryIntegrations = {};
            }
            if (!EzArray.arrayHasLength(integrations.activeIntegrations)) {
                integrations.activeIntegrations = [];
            }
            if (!EzObject.isValid(integrations.providerIntegrations)) {
                integrations.providerIntegrations = {};
            }
        }

        selectedEmployer.ezIntegrations = integrations;

        let updated = EzObject.isValid(selectedEmployer.ezIntegrations) &&
            0 === selectedEmployer.ezIntegrations.errorCode;

        ezApi.ezclocker.ezEventEngine.ezTriggerEvent(
            EzBoolean.isTrue(updated)
                ? EzClockerContextEventName.onSelectedEmployerAccountActiveIntegrationsUpdated
                : EzClockerContextEventName.onSelectedEmployerAccountActiveIntegrationsReady,
            ezApi.ezclocker.ezEventEngine.ezBuildEventData(
                EzClockerContext.ezApiName,
                EzBoolean.isTrue(updated)
                    ? 'Selected employer account active integrations updated.'
                    : 'Selected employer account active integrations ready.',
                {
                    selectedEmployer: EzClockerContext.ezInstance.ezGetSelectedEmployerAccount(),
                    activeIntegrations: EzClockerContext.ezInstance.ezGetSelectedEmployerAccount().ezIntegrations
                }));

        return selectedEmployer.ezIntegrations;
    }

    /**
     * @public @method
     * Returns the selected employer account's subscription plan features array
     * @returns {array}
     */
    ezGetSelectedEmployerAccountSubscriptionPlanFeatures() {
        if (!EzObject.isValid(EzClockerContext.ezInstance.ezGetSelectedEmployerAccount())) {
            throw new EzException(
                EzString.em`
                    A valid active employer account is required
                    in ${EzClockerContext.ezInstance.ezGetSelectedEmployerAccountSubscriptionPlanFeatures}`);
        }

        if (!EzArray.isArray(EzClockerContext.ezInstance.ezGetSelectedEmployerAccountSubscriptionPlan().enabledFeatures)) {
            if (!EzObject.isValid(EzClockerContext.ezInstance.employerContext.selectedEmployerAccount.license)) {
                EzClockerContext.ezInstance.employerContext.selectedEmployerAccount.license = EzClockerContext.ezCreateDefaultEmployerLicense();
            }

            EzClockerContext.ezInstance.employerContext.selectedEmployerAccount.license.subscriptionPlan = !EzObject.isValid(
                EzClockerContext.ezInstance.employerContext.selectedEmployerAccount.license.subscriptionPlan)
                ? {
                    enabledFeatures: []
                }
                : [];
        }

        return EzClockerContext.ezInstance.ezGetSelectedEmployerAccountSubscriptionPlan().enabledFeatures;
    }

    /**
     * @public @method
     * Loads the selected employer account's active integrations.
     * Success response object = {
     *     errorCode: 0,
     *     message: 'success',
     *     primaryIntegrations: {Map<EzIntegrationType, EmployerIntegrationMap>}
     *     activeIntegrations: {Collection<EmployerIntegrationMap>}
     *     providerIntegrations: {Map<EzIntegrationProviderId, List<EmployerIntegrationMap>>}
     * }
     * @returns {Promise}
     */
    ezLoadSelectedEmployerAccountActiveIntegrations() {
        if (!EzObject.isValid(EzClockerContext.ezInstance.ezGetSelectedEmployerAccount())) {
            throw new EzException(
                EzString.em`
                    A valid active employer account is required
                    in ${EzClockerContext.ezInstance.ezLoadSelectedEmployerAccountActiveIntegrations}`);
        }

        return EzPromise.promise(
            (resolve, reject) => {
                let index = EzClockerContext.ezInstance.ezGetSelectedEmployerAccountSubscriptionPlanFeatures().indexOf('INTEGRATIONS');

                if (0 > index) {
                    return resolve({
                        errorCode: 0,
                        message: 'Subscription plan does not allow for integrations',
                        primaryIntegrations: {},
                        activeIntegrations: [],
                        providerIntegrations: {}
                    });
                }

                return ezApi.ezclocker.ezHttpHelper.ezGet('/_api/v1/integrations/active')
                    .then(
                        (response) => {
                            EzClockerContext.ezInstance.ezSetSelectedEmployerAccountActiveIntegrations(response);

                            return resolve(response);
                        },
                        (eResponse) => {
                            EzClockerContext.ezInstance.ezSetSelectedEmployerAccountActiveIntegrations({
                                errorCode: eResponse.errorCode,
                                message: eResponse.message,
                                primaryIntegrations: {},
                                activeIntegrations: [],
                                providerIntegrations: {}
                            });

                            ezApi.ezclocker.ezLogger.error(
                                EzString.em`
                                    Failed to obtain the active integrations for the selected employer.
                                    Error: ${EzJson.toJson(eResponse)}`);

                            return reject(eResponse);
                        });
            });
    }

    /**
     * @public @method
     * Returns if the selected employer account's employee's includes an employee with the provided employeeId.
     * @param {EmployeeId}
     * @returns {Boolean}
     */
    ezSelectedEmployerAccountHasEmployeeId(employeeId) {
        return EzNumber.isNumber(employeeId) &&
            EzObject.hasProperty(
                EzClockerContext.ezInstance.employerContext.selectedEmployerAccountEmployeeAccountsById,
                employeeId.toString());
    }

    /**
     * @public @method
     * Builds the activeEmployee reference
     * @param {number} employeeId
     * @deprecated
     * Migrate to:
     * {@link EzClockerContext.ezInstance.ezSetSelectedEmployerActiveEmployeeById(employeeId) /src/main/webapp/ezlibrary/EzClockerContext/ez-context-module-selected-employer.js}
     * <code>
     *     // Located in: /src/main/webapp/ezlibrary/EzClockerContext/ez-context-module-selected-employer.js
     *     EzClockerContext.ezInstance.ezSetSelectedEmployerActiveEmployeeById(employeeId);
     * </code>
     */
    ezSetActiveEmployeeFromSelectedEmployerAccountActiveEmployeeAccountsIdId(employeeId) {
        return ezApi.ezclocker[EzClockerContext.ezApiName].ezSetSelectedEmployerActiveEmployeeById(employeeId);
    }

    /**
     * @public @method
     * Builds the activeEmployee reference
     * @param {number} employeeId
     */
    ezSetSelectedEmployerActiveEmployeeById(employeeId) {
        if (!EzNumber.isNumber(employeeId)) {
            throw new EzBadParamException(
                'employeeId',
                EzClockerContext.ezInstance,
                EzClockerContext.ezInstance.ezSetSelectedEmployerActiveEmployeeById);
        }
        if (!EzObject.isValid(EzClockerContext.ezInstance.ezGetSelectedEmployerAccount())) {
            throw new EzException(
                EzString.em`
                    A valid active employer account is required
                    in ${EzClockerContext.ezInstance.ezSetSelectedEmployerActiveEmployeeById}`);
        }

        // EzClockerContext.ezInstance.ezAssignActiveEmployee(...) is located in ez-context-module-active-employee.js
        EzClockerContext.ezInstance.ezAssignActiveEmployee(
            0 <= employeeId
                ? EzClockerContext.ezInstance.ezGetSelectedEmployerAccountEmployeeAccountForEmployeeId(employeeId)
                : null);
    }

    /*
        =============================================================================================================
        !!! Only Place EzAPI Initialization code for this clase from this point forward !!!
        ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        Class Static Properties, Method, and Initialization
        =============================================================================================================
    */

    /**
     * @static
     * @public @readonly @property
     * Returns the name of this class's singleton instance when registered with ezApi.
     * @returns {string}
     */
    static get ezApiName() {
        return 'ezClockerContext';
    }

    /**
     * @static
     * @public @readonly @property
     * Returns an object of event names that this class may trigger.
     * @returns {object}
     */
    static get ezEventNames() {
        return {
            onReady: 'ezOn_EzClockerContext_Ready',
            onContextLoading: 'ezOn_EzClockerContext_Context_Loading',
            onContextReady: 'ezOn_EzClockerContext_Context_Ready'
        };
    }

    /**
     * @static
     * @private @field
     * Stores the singleton instance of this class that was created by and registerd with EzApi.
     * @type {EzClockerContext}
     */
    static #ezInstance = EzBoolean.isTrue(globalThis?.ezApi?.ready) &&
        EzObject.isValid(globalThis?.ezApi?.ezclocker[EzClockerContext.ezApiName])
        ? globalThis.ezApi.ezclocker[EzClockerContext.ezApiName]
        : null;

    /**
     * @static
     * @public @property @getter
     * Returns the singleton instance of this class that is registered with EzApi (if available yet)
     * @returns {EzClockerContext}
     */
    static get ezInstance() {
        return EzClockerContext.#ezInstance;
    }

    /**
     * @static
     * @public @property @getter
     * Sets the singleton instance of of this class that is registered with EzApi.
     * @param {EzClockerContext} ezClockerContext
     */
    static set ezInstance(ezClockerContext) {
        if (null != EzClockerContext.#ezInstance) {
            throw new Error('EzClockerContext\'s singleton instance is already reigstered with EzApi.');
        }

        EzClockerContext.#ezInstance = ezClockerContext;
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
    static #ezApiRegistrationState = EzBoolean.isTrue(globalThis?.ezApi?.ready) &&
        EzObject.isValid(globalThis?.ezApi?.ezclocker[EzClockerContext.ezApiName])
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
        return EzClockerContext.#ezApiRegistrationState;
    }

    /**
     * @static
     * @public @property @setter
     * Sets the ezApi registration state of this classes's singleton instance.
     * @param {string} ezApiRegistrationState
     * A valid enum property value from EzRegistrationState
     */
    static set ezApiRegistrationState(ezApiRegistrationState) {
        EzClockerContext.#ezApiRegistrationState = EzRegistrationState.ezValueOf(ezApiRegistrationState);
    }

    /**
     * @public @static @readonly @property
     * Returns if all the depdendencies needed for EzClockerContext are ready to go and it is safe to register EzClockerContext with ezApi.
     * @returns {boolean}
     */
    static get #ezCanRegister() {
        return EzRegistrationState.PENDING === EzClockerContext.ezApiRegistrationState &&
            globalThis?.ezApi?.ready && globalThis.ezApi?.ezclocker &&

            globalThis.ezApi.ezclocker?.[EzDateTime.ezApiName]?.ready &&

            globalThis.ezApi.ezclocker?.[EzEventEngine.ezApiName]?.ready &&

            globalThis.ezApi.ezclocker?.[EzHttpHelper.ezApiName]?.ready &&

            globalThis.ezApi.ezclocker?.[EzNavigation.ezApiName]?.ready &&

            globalThis.ezApi.ezclocker?.[EzClockerContextEventName.ezApiName]?.ready &&

            globalThis.ezApi.ezclocker?.[EzAccountServices.ezApiName]?.ready &&

            globalThis.ezApi.ezclocker?.[EzOptionsService.ezApiName]?.ready &&

            globalThis.ezApi.ezclocker?.[EzEmployeeService.ezApiName]?.ready &&

            globalThis.ezApi.ezclocker?.[EzTimeEntryService.ezApiName]?.ready &&

            globalThis.ezApi.ezclocker?.[EzDataTagService.ezApiName]?.ready &&

            globalThis.ezApi.ezclocker?.[EzInternalDataTagMapApiClient.ezApiName]?.ready &&

            globalThis.ezApi.ezclocker?.[EzSubscriptionApiClient.ezApiName]?.ready;
    }

    /**
     * @static
     * @private @readonly @property
     * Returns if this class's singleton instance is registered with ezApi yet.
     * @returns {boolean}
     */
    static get #ezIsRegistered() {
        return null != EzClockerContext.ezInstance &&
            EzRegistrationState.REGISTERED === EzClockerContext.ezApiRegistrationState;
    }

    /**
     * @static
     * @private @method
     * Attempts to register the singleton instance for this class with ezApi. Returns true if successful, false otherwise.
     * @returns {boolean}
     */
    static #ezRegistrator() {
        if (EzClockerContext.#ezCanRegister && !EzClockerContext.#ezIsRegistered) {
            globalThis.ezApi.ezRegisterNewApi(EzClockerContext, EzClockerContext.ezApiName);
            EzClockerContext.ezApiRegistrationState = EzRegistrationState.REGISTERED;
        }

        return EzClockerContext.#ezIsRegistered;
    }

    /**
     * @static
     * Static Initialization
     * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
     * >> IMPORTANT <<
     * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
     * Make sure the following properties and methods get defined BEFORE this static initialization section:
     *     1) Property getter EzClockerContext.ezApiName
     *     2) Property getter EzClockerContext.ezEventNames
     *     3) Property getter EzClockerContext.ezInstance
     *     4) Property setter EzClockerContext.ezInstance
     *     5) Property getter EzClockerContext.ezApiRegistrationState
     *     6) Property setter EzClockerContext.ezApiRegistrationState
     *     7) Property getter EzClockerContext.#ezCanRegister
     *     8) Property getter EzClockerContext.#ezIsRegistered
     *     9) Method EzClockerContext.#ezRegistrator()
     */
    static {
        if (!EzClockerContext.#ezIsRegistered) {
            EzClockerContext.ezApiRegistrationState = EzRegistrationState.PENDING;

            if (!EzClockerContext.#ezRegistrator()) {

                document.addEventListener(
                    EzClockerContext.ezOnEzApiReadyEventName,
                    EzClockerContext.#ezRegistrator);

                document.addEventListener(
                    EzDateTime.ezEventNames.onReady,
                    EzClockerContext.#ezRegistrator);

                document.addEventListener(
                    EzEventEngine.ezEventNames.onReady,
                    EzClockerContext.#ezRegistrator);

                document.addEventListener(
                    EzHttpHelper.ezEventNames.onReady,
                    EzClockerContext.#ezRegistrator);

                document.addEventListener(
                    EzNavigation.ezEventNames.onReady,
                    EzClockerContext.#ezRegistrator);

                document.addEventListener(
                    EzClockerContextEventName.ezEventNames.onReady,
                    EzClockerContext.#ezRegistrator);

                document.addEventListener(
                    EzAccountServices.ezEventNames.onReady,
                    EzClockerContext.#ezRegistrator);

                document.addEventListener(
                    EzOptionsService.ezEventNames.onReady,
                    EzClockerContext.#ezRegistrator);

                document.addEventListener(
                    EzEmployeeService.ezEventNames.onReady,
                    EzClockerContext.#ezRegistrator);

                document.addEventListener(
                    EzTimeEntryService.ezEventNames.onReady,
                    EzClockerContext.#ezRegistrator);

                document.addEventListener(
                    EzDataTagService.ezEventNames.onReady,
                    EzClockerContext.#ezRegistrator);

                document.addEventListener(
                    EzInternalDataTagMapApiClient.ezEventNames.onReady,
                    EzClockerContext.#ezRegistrator);

                document.addEventListener(
                    EzSubscriptionApiClient.ezEventNames.onReady,
                    EzClockerContext.#ezRegistrator);
            }
        }
    }
}
