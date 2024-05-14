import { EzBadParamException } from '/ezlibrary/exceptions/EzBadParamException.js';

import {
    EzObject,
    EzBoolean,
    EzNumber,
    EzString,
    EzFunction,
    EzJson,
    EzHtml,
    EzUrl,
    EzPromise
} from '/ezlibrary/helpers/EzHelpers.js';

import {
    EzRegistrationState,
    EzClockerContextEventName,
} from '/ezlibrary/enums/EzEnumerations.js';


import { EzClass } from '/ezlibrary/EzClass.js';
import { EzEventEngine } from '/ezlibrary/ez-event-engine.js';

import { EzClockerContext } from '/ezlibrary/EzClockerContext/ez-context.js';

import { EzNavigation } from '/public/javascript/common/ezclocker-navigation-helper.js';
import { EzDialog } from '/public/javascript/common/ezclocker-dialog-helper.js';

/**
 * @class
 * @extends {EzClass}
 * @description
 * Web-site License Helper
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 * Import with:
 *  import { EzLicenseHelper } from '/secure/javascript/common/ezclocker-license-helper.js';
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 *  Check ready state with (returns true when ready):
 *      globalThis.ezApi?.ezclocker?.[EzTimeOffViewController.ezApiName]?.ready
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 *  document.addEventListener(
 *      EzLicenseHelper.ezEventNames.onReady,
 *      {listening_class}.#ezRegistrator);
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 */
export class EzLicenseHelper extends EzClass {
    /**
     * @public @property @getter
     * Gets currently loaded license object
     * @returns {object}
     */
    get currentLicense() {
        return EzClockerContext.ezInstance.ezGetSelectedEmployerAccountLicense();
    }

    /**
     * @public @readonly @property
     * Gets if the account needs to pay to continue using ezClocker.
     * @returns {boolean}
     */
    get needToPay() {
        return ezApi.ezclocker.ezClockerContext.ezLicenseNeedToPay;
    }

    /**
     * @public @readonly @property
     * The interval in milliseconds between license update checks.
     * @returns {number}
     */
    get ezAutomaticUpdateLicenseInterval() {
        return 30 * 60000;
    }

    /**
     * @public @readonly @property
     * Returns the default license object
     * @returns {object}
     */
    get defaultEmployerLicense() {
        return EzClockerContext.ezCreateDefaultEmployerLicense();
    }

    /**
     * @public @readonly @property
     * Returns a single-day license object.
     * @returns {object}
     */
    get singleDayLicense() {
        return {
            employerId: undefined,
            valid: true,
            freePlanActive: true,
            canceled: false,
            freeTrialDaysLeft: 1,
            hasPaidPlan: false,
            paidPlanActive: false,
            planProvider: 'ezClocker',
            validMessage: 'Single Day Free Plan',
            numberOfEmployees: 0,
            availableEmployeeSlots: 0,
            planExpireDate: '-',
            planStartDate: '-',
            subscriptionPlan: null,
            nextBillingDate: '-',
            lastBillingDate: '-',
            billingAmount: '0.00',
            braintreeDiscounts: [],
            expired: false
        };
    }

    /**
     * @public @method
     * Initializes EzLicenseHelper
     * @returns {EzLicenseHelper}
     */
    ezInit() {
        EzLicenseHelper.ezInstance.ezRegisterEvents();

        return EzLicenseHelper.ezInstance;
    }

    /**
     * @public @method
     * Registers ezLicenseHelper events.
     */
    ezRegisterEvents() {
        ezApi.ezclocker.ezEventEngine.ezRegisterEvent(
            EzLicenseHelper.ezApiName,
            EzLicenseHelper.ezEventNames.onLicenseValidationSuccess);

        ezApi.ezclocker.ezEventEngine.ezRegisterEvent(
            EzLicenseHelper.ezApiName,
            EzLicenseHelper.ezEventNames.onLicenseValidationError);

        ezApi.ezclocker.ezEventEngine.ezRegisterEvent(
            EzLicenseHelper.ezApiName,
            EzLicenseHelper.ezEventNames.onLicenseExpired);

        ezApi.ezclocker.ezEventEngine.ezRegisterEvent(
            EzLicenseHelper.ezApiName,
            EzLicenseHelper.ezEventNames.onFreeTrialExpired);

        ezApi.ezclocker.ezEventEngine.ezRegisterEvent(
            EzLicenseHelper.ezApiName,
            EzLicenseHelper.ezEventNames.onLicenseViolationError);
    }

    /**
     * @protected @method
     * Callback for the license ping
     */
    ezAutoCheckEmployerLicense() {
        EzLicenseHelper.ezInstance.ezStopLicensePing();

        EzLicenseHelper.ezInstance.ezGetEmployerLicense(
            ezApi.ezclocker.ezClockerContext.ezGetActiveEmployer().id)
            .then(
                () => EzLicenseHelper.ezInstance.ezStartLicensePing(),
                (eResponse) => {
                    ezApi.ezclocker.ezLogger.error(
                        EzString.em`
                            Did not re-start license ping due to error: ${eResponse.message}
                            [Error response: ${EzJson.toJson(eResponse)}]`);
                });
    }

    /**
     * @protected @method
     * Starts the repeating license auto-checks (updating the license information every 30mins)
     */
    ezStartLicensePing() {
        if (!EzObject.isValid(EzLicenseHelper.ezInstance.currentLicense) ||
            !EzNumber.isNumber(EzLicenseHelper.ezInstance.currentLicense.employerId)) {
            ezApi.ezclocker.ezLogger.error('The current license must have a valid employer id to being the license ping.');

            return;
        }

        setInterval(
            EzLicenseHelper.ezInstance.ezAutoCheckEmployerLicense,
            EzLicenseHelper.ezInstance.ezAutomaticUpdateLicenseInterval);
    }

    /**
     * @protected @method
     * Stops the repeating license auto-checks
     */
    ezStopLicensePing() {
        clearInterval(EzLicenseHelper.ezInstance.ezAutoCheckEmployerLicense);
    }

    /**
     * @public @method
     * Hooks license events and attributes the hooks to the provided handlerName.
     * @param {string} handlerName
     * @param {function|null} licenseValidHandler
     * @param {function|null} licenseExpiredHandler
     * @param {function|null} licenseErrorHandler
     * @param {function|null} freeTrialExpiredHandler
     */
    ezHookLicenseEvents(handlerName, licenseValidHandler, licenseExpiredHandler, licenseErrorHandler, freeTrialExpiredHandler, licenseViolationError) {
        if (!EzString.hasLength(handlerName)) {
            throw new EzBadParamException(
                'handlerName',
                EzLicenseHelper.ezInstance,
                EzLicenseHelper.ezInstance.ezHookLicenseEvents);
        }

        // License Valid
        EzLicenseHelper.ezInstance.assignedLicenseValidHandler = EzFunction.isFunction(licenseValidHandler)
            ? (ezEvent) => {
                EzLicenseHelper.ezInstance.ezDefaultLicenseValidHandler(ezEvent);

                licenseValidHandler(ezEvent);
            }
            : EzLicenseHelper.ezInstance.ezDefaultLicenseValidHandler;

        ezApi.ezclocker.ezEventEngine.ezWantEvent(
            EzLicenseHelper.ezEventNames.onLicenseValidationSuccess,
            handlerName,
            EzLicenseHelper.ezInstance.assignedLicenseValidHandler);

        ezApi.ezclocker.ezEventEngine.ezWantEvent(
            EzClockerContextEventName.ezOnValidateLicenseValid,
            handlerName,
            (ezEvent) => ezApi.ezclocker.ezEventEngine.ezTriggerEvent(
                EzLicenseHelper.ezEventNames.onLicenseValidationSuccess,
                ezEvent?.data || ezEvent));

        // License Expired
        EzLicenseHelper.ezInstance.assignedLicenseExpiredHandler = EzFunction.isFunction(licenseExpiredHandler)
            ? licenseExpiredHandler
            : EzLicenseHelper.ezInstance.ezDefaultLicenseExpiredHandler;

        ezApi.ezclocker.ezEventEngine.ezWantEvent(
            EzLicenseHelper.ezEventNames.onLicenseExpired,
            handlerName,
            EzLicenseHelper.ezInstance.assignedLicenseExpiredHandler);

        ezApi.ezclocker.ezEventEngine.ezWantEvent(
            EzClockerContextEventName.ezOnValidateLicenseExpired,
            handlerName,
            (ezEvent) => {
                ezApi.ezclocker.ezEventEngine.ezTriggerEvent(
                    EzLicenseHelper.ezEventNames.onLicenseExpired,
                    ezEvent?.data || ezEvent);
            });

        // License Free Trial Expired
        EzLicenseHelper.ezInstance.assignedFreeTrialExpiredHandler = EzFunction.isFunction(freeTrialExpiredHandler)
            ? (ezEvent) => freeTrialExpiredHandler(ezEvent)
            : EzLicenseHelper.ezInstance.ezDefaultFreeTrialExpiredHandler;

        ezApi.ezclocker.ezEventEngine.ezWantEvent(
            EzLicenseHelper.ezEventNames.onFreeTrialExpired,
            handlerName,
            EzLicenseHelper.ezInstance.assignedFreeTrialExpiredHandler);

        ezApi.ezclocker.ezEventEngine.ezWantEvent(
            EzClockerContextEventName.ezOnValidateLicenseFreeTrialExpired,
            handlerName,
            (ezEvent) => ezApi.ezclocker.ezEventEngine.ezTriggerEvent(
                EzLicenseHelper.ezEventNames.onFreeTrialExpired,
                ezEvent?.data || ezEvent));

        // License Violation
        EzLicenseHelper.ezInstance.assignedLicenseViolationErrorHandler = EzFunction.isFunction(licenseViolationError)
            ? (ezEvent) => licenseViolationError(ezEvent)
            : EzLicenseHelper.ezInstance.ezDefaultLicenseViolationErrorHandler;

        // License Violation Errors
        ezApi.ezclocker.ezEventEngine.ezWantEvent(
            EzLicenseHelper.ezEventNames.onLicenseViolationError,
            handlerName,
            EzLicenseHelper.ezInstance.assignedLicenseViolationErrorHandler);

        ezApi.ezclocker.ezEventEngine.ezWantEvent(
            EzClockerContextEventName.ezOnValidateLicenseViolationError,
            handlerName,
            (ezEvent) => ezApi.ezclocker.ezEventEngine.ezTriggerEvent(
                EzLicenseHelper.ezEventNames.onLicenseViolationError,
                ezEvent?.data || ezEvent));

        EzLicenseHelper.ezInstance.assignedLicenseErrorHandler = EzFunction.isFunction(licenseErrorHandler)
            ? (ezEvent) => {
                EzLicenseHelper.ezInstance.ezDefaultLicenseErrorHandler(ezEvent);

                licenseErrorHandler(ezEvent);
            }
            : EzLicenseHelper.ezInstance.ezDefaultLicenseErrorHandler;

        // License Error
        ezApi.ezclocker.ezEventEngine.ezWantEvent(
            EzLicenseHelper.ezEventNames.onLicenseValidationError,
            handlerName,
            EzLicenseHelper.ezInstance.assignedLicenseErrorHandler);

        ezApi.ezclocker.ezEventEngine.ezWantEvent(
            EzClockerContextEventName.ezOnValidateLicenseError,
            handlerName,
            () => ezApi.ezclocker.ezEventEngine.ezTriggerEvent(
                EzLicenseHelper.ezEventNames.onLicenseValidationError,
                ezEvent?.data || ezEvent));
    }

    /**
     * @public @method
     * Un-wants license events attributed by the provied handlerName.
     * @param {string} handlerName
     */
    ezUnhookLicenseEvents(handlerName) {
        if (!EzString.hasLength(handlerName)) {
            throw new EzBadParamException(
                'handlerName',
                EzLicenseHelper.ezInstance,
                EzLicenseHelper.ezInstance.ezUnhookLicenseEvents);
        }

        ezApi.ezclocker.ezEventEngine.ezUnwantEvent(
            EzLicenseHelper.ezEventNames.onLicenseValidationSuccess,
            handlerName);

        ezApi.ezclocker.ezEventEngine.ezUnwantEvent(
            EzClockerContextEventName.ezOnValidateLicenseValid,
            handlerName);

        ezApi.ezclocker.ezEventEngine.ezUnwantEvent(
            EzLicenseHelper.ezEventNames.onLicenseExpired,
            handlerName);

        ezApi.ezclocker.ezEventEngine.ezUnwantEvent(
            EzClockerContextEventName.ezOnValidateLicenseExpired,
            handlerName);

        ezApi.ezclocker.ezEventEngine.ezUnwantEvent(
            EzLicenseHelper.ezEventNames.onFreeTrialExpired,
            handlerName);

        ezApi.ezclocker.ezEventEngine.ezUnwantEvent(
            EzClockerContextEventName.ezOnValidateLicenseFreeTrialExpired,
            handlerName);

        ezApi.ezclocker.ezEventEngine.ezUnwantEvent(
            EzLicenseHelper.ezEventNames.onLicenseViolationError,
            handlerName);

        ezApi.ezclocker.ezEventEngine.ezUnwantEvent(
            EzClockerContextEventName.ezOnValidateLicenseViolationError,
            handlerName);

        ezApi.ezclocker.ezEventEngine.ezUnwantEvent(
            EzLicenseHelper.ezEventNames.onLicenseValidationError,
            handlerName);

        ezApi.ezclocker.ezEventEngine.ezUnwantEvent(
            EzClockerContextEventName.ezOnValidateLicenseError,
            handlerName);
    }

    /**
     * @public @method
     * Obtains the current employer's license
     * @param {number} employerId
     * @returns {Promise}
     */
    ezGetEmployerLicense(employerId) {
        EzLicenseHelper.ezInstance.ezStopLicensePing();

        if (!EzNumber.isNumber(employerId)) {
            throw new EzBadParamException(
                'employerId',
                EzLicenseHelper.ezInstance,
                EzLicenseHelper.ezInstance.ezGetEmployerLicense);
        }

        return EzPromise.promise(
            (resolve, reject) => {
                return ezApi.ezclocker.ezHttpHelper.ezGet(
                    EzUrl.build`
                        ${ezApi.ezclocker.ezNavigation.ezGetInternalClassicApiUrl('/subscriptions/employer/license')}
                        ?target-time-zone-id=${ezApi.ezclocker.ezDateTime.activeTimeZone}
                        ?skip-provider-check=false`)
                    .then(
                        ezApi.ezclocker.ezHttpHelper.ezProcessApiResolve,
                        ezApi.ezclocker.ezHttpHelper.ezProcessApiReject)
                    .then(
                        (response) => {
                            ezApi.ezclocker.ezClockerContext.ezSetSelectedEmployerAccountLicense(response);

                            EzLicenseHelper.ezInstance.ezStartLicensePing();

                            return resolve(response);
                        },
                        (eResponse) => {
                            ezApi.ezclocker.ezLogger.error(`Failed to get employer license. Error: ${ezApi.ezToJson(eResponse)}`);

                            EzLicenseHelper.ezInstance.ezLoadSingleDayLicense(employerId);

                            ezApi.ezclocker.ezLicenseHelper.onEzLicenseError(
                                EzLicenseHelper.ezInstance.currentLicense,
                                eResponse.message,
                                eResponse.errorCode);

                            return reject(eResponse);
                        });
            });
    }

    /**
     * @public @method
     * Loads the single day license as the current license for the provied employerId
     * @param {number} employerId
     * @returns {object}
     * Returns the current license reference.
     */
    ezLoadSingleDayLicense(employerId) {
        EzLicenseHelper.ezInstance.ezStopLicensePing();

        if (!EzObject.isValid(employerId)) {
            ezApi.ezclocker.ezLogger.error('Attempted to load a single day license without an employer id.');

            return;
        }

        // Used to allow users in even though their license is expired
        EzLicenseHelper.ezInstance.currentLicense = EzLicenseHelper.ezInstance.singleDayLicense;

        EzLicenseHelper.ezInstance.currentLicense.employerId = employerId;

        ezApi.ezclocker.ezClockerContext.ezSetSelectedEmployerAccountLicense(EzLicenseHelper.ezInstance.currentLicense);

        return EzLicenseHelper.ezInstance.currentLicense;
    }

    /**
     * @public @method
     * Returns if the provided EzClockerFeature id is enabled by the current license.
     * @param {string|EzClockerFeature} ezClockerFeature
     * @returns {boolean}
     */
    ezHasFeature(ezClockerFeature) {
        if (!EzObject.isValid(EzLicenseHelper.ezInstance.currentLicense) ||
            !EzString.hasLength(ezClockerFeature) ||
            !EzObject.isValid(EzLicenseHelper.ezInstance.currentLicense.subscriptionPlan) ||
            !ezApi.ezArrayHasLength(EzLicenseHelper.ezInstance.currentLicense.subscriptionPlan.enabledFeatures)) {
            return false;
        }

        return -1 != EzLicenseHelper.ezInstance.currentLicense.subscriptionPlan.enabledFeatures.indexOf(
            ezClockerFeature);
    }

    /**
     * @protected @method
     * Default handler for the onLicenseValidationSuccess event.
     */
    ezDefaultLicenseValidHandler(ezEvent) {
        if (!EzObject.isValid(ezEvent)) {
            throw new EzBadParamException(
                'ezEvent',
                EzLicenseHelper.ezInstance,
                EzLicenseHelper.ezInstance.ezDefaultLicenseValidHandler);
        }
        if (!ezEvent?.data) {
            ezEvent.data = {
                errorCode: ezEvent?.errorCode,
                message: ezEvent?.message,
                needToPay: ezEvent?.needToPay,
                needToArchive: ezEvent?.needToArchive,
                needToSignIn: ezEvent?.needToSignIn,
                license: ezEvent?.license,
            };
        }
    }

    /**
     * @protected @method
     * Default handler for the onFreeTrialExpired event.
     */
    ezDefaultFreeTrialExpiredHandler(ezEvent) {
        if (!EzObject.isValid(ezEvent)) {
            throw new EzBadParamException(
                'ezEvent',
                EzLicenseHelper.ezInstance,
                EzLicenseHelper.ezInstance.ezDefaultFreeTrialExpiredHandler);
        }
        if (!ezEvent?.data) {
            ezEvent.data = {
                errorCode: ezEvent?.errorCode,
                message: ezEvent?.message,
                needToPay: ezEvent?.needToPay,
                needToArchive: ezEvent?.needToArchive,
                needToSignIn: ezEvent?.needToSignIn,
                license: ezEvent?.license,
            };
        }

        let em = '';

        if (ezApi.ezclocker.ezClockerContext.ezGetUserContext().isEmployee ||
            ezApi.ezclocker.ezClockerContext.ezGetUserContext().isManager ||
            ezApi.ezclocker.ezClockerContext.ezGetUserContext().isPayrollManager) {

            em = 'The ezClocker subscription free trial period for the employer is over.';

            ezApi.ezclocker.ezLogger.error(em);

            // ezApi.ezclocker.ezLogger.debug(`${em} License data: ${EzJson.toJson(ezEvent)}`);

            return ezApi.ezclocker.ezDialog.ezShowOK(
                'Subsciption Free Trial Expired',
                EzHtml.build`
                    <p>
                        The subscription free trial period has ended.
                    </p>
                    <p>
                        Please contact your employer and have them re-subscribe or update their billing information to
                        allow you to continue using subscription level features.
                    </p>`,
                null,
                500,
                'auto')
                .then(ezApi.ezclocker.ezNavigation.ezSignOut);
        }

        if (ezApi.ezclocker.ezClockerContext.ezGetUserContext().isPersonal) {
            em = 'The Personal Pro subscription free trial period is over.';

            ezApi.ezclocker.ezLogger.error(em);

            // ezApi.ezclocker.ezLogger.debug(`${em} License data: ${EzJson.toJson(ezEvent)}`);

            return ezApi.ezclocker.ezDialog.ezShowOK(
                'Subsciption Free Trial Expired',
                EzHtml.build`
                    <p>
                        Your ezClocker Personal Subscription free trial period has ended.
                    </p>
                    <p>
                        Please enter your billing information to continue using Personal Pro features.
                    </p>`,
                null,
                500,
                'auto')
                .then(ezApi.ezclocker.ezNavigation.ezSignOut);
        }

        em = 'The ezClocker subscription free trial period is over.';

        ezApi.ezclocker.ezLogger.error(em);

        // ezApi.ezclocker.ezLogger.debug(`${em} License data: ${EzJson.toJson(ezEvent)}`);

        ezApi.ezclocker.ezNavigation.ezNavigateToEmployerAccountPage();
    }

    /**
     * @protected @method
     * Default handler for the onLicenseExpired event.
     */
    ezDefaultLicenseExpiredHandler(ezEvent) {
        if (!EzObject.isValid(ezEvent)) {
            throw new EzBadParamException(
                'ezEvent',
                EzLicenseHelper.ezInstance,
                EzLicenseHelper.ezInstance.ezDefaultLicenseExpiredHandler);
        }
        if (!ezEvent?.data) {
            ezEvent.data = {
                errorCode: ezEvent?.errorCode,
                message: ezEvent?.message,
                needToPay: ezEvent?.needToPay,
                needToArchive: ezEvent?.needToArchive,
                needToSignIn: ezEvent?.needToSignIn,
                license: ezEvent?.license,
            };
        }

        let em = '';

        if (ezApi.ezclocker.ezClockerContext.ezGetUserContext().isEmployee ||
            ezApi.ezclocker.ezClockerContext.ezGetUserContext().isManager ||
            ezApi.ezclocker.ezClockerContext.ezGetUserContext().isPayrollManager) {

            em = 'The ezClocker subscription for the Employer account is expired.';

            ezApi.ezclocker.ezLogger.error(em);

            // ezApi.ezclocker.ezLogger.debug(`${em} License data: ${EzJson.toJson(ezEvent)}`);

            return ezApi.ezclocker.ezDialog.ezShowOK(
                'Subscription Expired',
                EzHtml.build`
                    <div
                        id="EzSubscriptionExpiredDialog_LaytoutConterin"
                        class="ezAutoRow_Max_A ezGrid-align-left ezGrid-vertical-space-between">
                        <div
                            id="EzSubscriptionExpiredDialog_Content">
                            <p>
                                The ezClocker subscription for your employer is expired.
                            </p>
                            <p>
                                Please contact your employer (the main ezClocker account holder) and ask them to re-subscribe or update the billing information
                                so that you can continue using ezClocker.
                            </p>
                            <p>
                                Click OK to return to ezClocker's sign-in page.
                            </p>
                        </div>
                        <div
                            id="EzSubscriptionExpiredDialog_SupportInfoContainer"
                            class="ezText-small-navy">
                            Have questions or need additional assistence?
                            <a
                                id="EzSubscriptionExpiredDialog_SupportEmailLink"
                                href="mailto:support@ezclocker.com?subject='My Employer or I Need Help with a ezClocker Subscription'">
                                support@ezclocker.com
                            </a>
                        </div>
                    </div>`,
                null,
                500,
                'auto')
                .then(ezApi.ezclocker.ezNavigation.ezSignOut);
        }

        if (ezApi.ezclocker.ezClockerContext.ezGetUserContext().isPersonal) {

            em = 'The Personal Pro subscription is expired.';

            ezApi.ezclocker.ezLogger.error(em);

            // ezApi.ezclocker.ezLogger.debug(`${em} License data: ${EzJson.toJson(ezEvent)}`);

            return ezApi.ezclocker.ezDialog.ezShowOK(
                'Subscription Expired',
                EzHtml.build`
                    <p>
                        Your ezClocker Personal Subscription is expired.
                    </p>
                    <p>
                        Please update your billing information to continue using Personal Pro features.
                    </p>`,
                null,
                500,
                'auto')
                .then(EzPromise.ignoreResolve);
        }

        em = 'The ezClocker subscription is expired.';

        ezApi.ezclocker.ezLogger.error(em);

        // ezApi.ezclocker.ezLogger.debug(`${em} License data: ${EzJson.toJson(ezEvent)}`);

        ezApi.ezclocker.ezNavigation.ezNavigateToEmployerAccountPage();
    }

    /**
     * @protected @method
     * Default handler for the onLicenseViolationError event.
     */
    ezDefaultLicenseViolationErrorHandler(ezEvent) {
        if (!EzObject.isValid(ezEvent)) {
            throw new EzBadParamException(
                'ezEvent',
                EzLicenseHelper.ezInstance,
                EzLicenseHelper.ezInstance.ezDefaultLicenseViolationErrorHandler);
        }
        if (!ezEvent?.data) {
            ezEvent.data = {
                errorCode: ezEvent?.errorCode,
                message: ezEvent?.message,
                needToPay: ezEvent?.needToPay,
                needToArchive: ezEvent?.needToArchive,
                needToSignIn: ezEvent?.needToSignIn,
                license: ezEvent?.license,
            };
        }

        let em = EzString.hasLength(ezEvent?.data?.message)
            ? `License Violation: ${ezEvent.data.message}`
            : 'Current license is in violation. Please contact ezClocker support.';

        ezApi.ezclocker.ezLogger.error(em);

        // ezApi.ezclocker.ezLogger.debug(`${em} License data: ${EzJson.toJson(ezEvent)}`);

        return ezApi.ezclocker.ezDialog.ezShowOK(
            'Subscription Message',
            em,
            null,
            500,
            'auto')
            .then(ezApi.ezclocker.ezNavigation.ezNavigateToEmployerAccountPage);
    }

    /**
     * @protected @method
     * Default handler for the xx event.
     */
    ezDefaultLicenseErrorHandler(ezEvent) {
        if (!EzObject.isValid(ezEvent)) {
            throw new EzBadParamException(
                'ezEvent',
                EzLicenseHelper.ezInstance,
                EzLicenseHelper.ezInstance.ezDefaultLicenseErrorHandler);
        }
        if (!ezEvent?.data) {
            ezEvent.data = {
                errorCode: ezEvent?.errorCode,
                message: ezEvent?.message,
                needToPay: ezEvent?.needToPay,
                needToArchive: ezEvent?.needToArchive,
                needToSignIn: ezEvent?.needToSignIn,
                license: ezEvent?.license,
            };
        }

        let em = EzString.hasLength(ezEvent?.data?.message)
            ? `Failed to load the license for the current user due to error: ${ezEvent.data.message}`
            : 'Failed to load the license for the current user. Please contact ezClocker support.';

        ezApi.ezclocker.ezLogger.error(em);

        // ezApi.ezclocker.ezLogger.debug(`${em} License data: ${EzJson.toJson(ezEvent)}`);
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
        return 'ezLicenseHelper';
    }

    /**
     * @static
     * @public @readonly @property
     * Returns an object of event names that this class may trigger.
     * @returns {object}
     */
    static get ezEventNames() {
        return {
            onReady: 'ezOn_EzLicenseHelper_Ready',
            onLicenseValidationSuccess: 'ezOn_EzLicenseHelper_LicenseValidationSuccess',
            onLicenseViolationError: 'ezOn_EzLicenseHelper_LicenseViolationError',
            onLicenseValidationError: 'ezOn_EzLicenseHelper_LicenseError',
            onLicenseExpired: 'ezOn_EzLicenseHelper_LicenseExpired',
            onFreeTrialExpired: 'ezOn_EzLicenseHelper_FreeTrialExpired'
        };
    }

    /**
     * @static
     * @private @field
     * Stores the singleton instance of this class that was created by and registerd with EzApi.
     * @type {EzAccountViewController}
     */
    static #ezInstance = globalThis?.ezApi?.ready && globalThis.ezApi?.ezclocker?.[EzLicenseHelper.ezApiName]
        ? globalThis.ezApi.ezclocker[EzLicenseHelper.ezApiName]
        : null;
    /**
     * @static
     * @public @property @getter
     * Returns the singleton instance of this class that is registered with EzApi (if available yet)
     * @returns {EzLicenseHelper}
     */
    static get ezInstance() {
        return EzLicenseHelper.#ezInstance;
    }
    /**
     * @static
     * @public @property @setter
     * Sets the singleton instance of of this class that is registered with EzApi.
     * @param {EzLicenseHelper} instance
     */
    static set ezInstance(instance) {
        if (null != EzLicenseHelper.#ezInstance) {
            throw new Error('EzLicenseHelper\'s singleton instance is already reigstered with EzApi.');
        }

        EzLicenseHelper.#ezInstance = instance;
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
    static #ezApiRegistrationState = globalThis?.ezApi?.ready && globalThis.ezApi?.ezclocker?.[EzLicenseHelper.ezApiName]
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
        return EzLicenseHelper.#ezApiRegistrationState;
    }
    /**
     * @static
     * @public @property @setter
     * Sets the ezApi registration state of this classes's singleton instance.
     * @param {string} ezApiRegistrationState
     * A valid enum property value from EzRegistrationState
     */
    static set ezApiRegistrationState(ezApiRegistrationState) {
        EzLicenseHelper.#ezApiRegistrationState = EzRegistrationState.ezValueOf(ezApiRegistrationState);
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
        return 'PENDING' === EzLicenseHelper.ezApiRegistrationState &&

            globalThis?.ezApi?.ready && globalThis.ezApi?.ezclocker &&

            globalThis.ezApi.ezclocker?.[EzEventEngine.ezApiName]?.ready &&

            globalThis.ezApi.ezclocker?.[EzClockerContextEventName.ezApiName]?.ready &&

            globalThis.ezApi.ezclocker?.[EzClockerContext.ezApiName]?.ready &&

            globalThis.ezApi.ezclocker?.[EzNavigation.ezApiName]?.ready &&

            globalThis.ezApi.ezclocker?.[EzDialog.ezApiName]?.ready;
    }

    /**
     * @static
     * @private @readonly @property
     * Returns if this class's singleton instance is registered with ezApi yet.
     * @returns {boolean}
     */
    static get #ezIsRegistered() {
        return null != EzLicenseHelper.ezInstance &&
            EzRegistrationState.REGISTERED === EzLicenseHelper.ezApiRegistrationState;
    }

    /**
     * @static
     * @private @method
     * Attempts to register the singleton instance for this class with ezApi. Returns true
     * if successful, false otherwise.
     * @returns {boolean}
     */
    static #ezRegistrator() {
        if (EzLicenseHelper.#ezCanRegister && !EzLicenseHelper.#ezIsRegistered) {
            globalThis.ezApi.ezRegisterNewApi(EzLicenseHelper, EzLicenseHelper.ezApiName);
        }

        return EzLicenseHelper.#ezIsRegistered;
    }

    /**
     * @static
     * Static Initialization
     * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
     * >> IMPORTANT <<
     * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
     * Make sure the following properties and methods get defined BEFORE this static initialization section:
     *     1) Property getter EzLicenseHelper.ezApiName
     *     2) Property getter EzLicenseHelper.ezEventNames
     *     3) Property getter EzLicenseHelper.ezInstance
     *     4) Property setter EzLicenseHelper.ezInstance
     *     5) Property getter EzLicenseHelper.ezApiRegistrationState
     *     6) Property setter EzLicenseHelper.ezApiRegistrationState
     *     7) Property getter EzLicenseHelper.#ezCanRegister
     *     8) Property getter EzLicenseHelper.#ezIsRegistered
     *     9) Method EzLicenseHelper.#ezRegistrator()
     */
    static {
        if (!EzLicenseHelper.#ezIsRegistered) {
            EzLicenseHelper.ezApiRegistrationState = EzRegistrationState.PENDING;

            if (!EzLicenseHelper.#ezRegistrator()) {
                document.addEventListener(
                    EzLicenseHelper.ezOnEzApiReadyEventName,
                    EzLicenseHelper.#ezRegistrator);

                document.addEventListener(
                    EzEventEngine.ezEventNames.onReady,
                    EzLicenseHelper.#ezRegistrator);

                document.addEventListener(
                    EzClockerContextEventName.ezEventNames.onReady,
                    EzLicenseHelper.#ezRegistrator);

                document.addEventListener(
                    EzClockerContext.ezEventNames.onReady,
                    EzLicenseHelper.#ezRegistrator);

                document.addEventListener(
                    EzNavigation.ezEventNames.onReady,
                    EzLicenseHelper.#ezRegistrator);

                document.addEventListener(
                    EzDialog.ezEventNames.onReady,
                    EzLicenseHelper.#ezRegistrator);
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
