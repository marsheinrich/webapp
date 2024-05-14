import {
    EzBadParamException
} from '/ezlibrary/exceptions/EzExceptions.js';

import {
    EzObject,
    EzBoolean,
    EzString,
    EzHtml,
    EzPromise
} from '/ezlibrary/helpers/EzHelpers.js';

import { EzStateTracker } from '/ezlibrary/EzStateTracker.js';

import {
    EzRegistrationState,
    EzElementEventName,
    EzClockerViewId,
    EzClockerContextEventName,
    EzSubscriptionPlanProvider
} from '/ezlibrary/enums/EzEnumerations.js';

import { EzClass } from '/ezlibrary/EzClass.js';

import { EzEventEngine } from '/ezlibrary/ez-event-engine.js';

import { EzDateTime } from '/public/javascript/common/ez-date-time.js';

import { EzNavigation } from '/public/javascript/common/ezclocker-navigation-helper.js';

import { EzClockerContext } from '/ezlibrary/EzClockerContext/ez-context.js';

import { EzUI } from '/public/javascript/common/ezui.js';

/**
 * @class
 * @extends {EzServiceWorkerManager}
 * @description
 * Provides web push notification support for the ezClocker website
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 * Import with:
 *      import { EzServiceWorkerManager } from '/ezlibrary/EzServiceWorkerManager/EzServiceWorkerManager.js';
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 * Singleton instance ready check:
 *      globalThis.ezApi?.ezclocker?.[EzServiceWorkerManager.ezApiName]?.ready
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 * Listen to onReady event:
 *      document.addEventListener(
 *          EzServiceWorkerManager.ezEventNames.onReady,
 *          {listening_class_name}.#ezRegistrator);
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 * Single instance access access from within EzServiceWorkerManager class:
 *      EzServiceWorkerManager.ezInstance
 * Single instance access access from outside EzServiceWorkerManager:
 *      ezApi.ezclocker.ezServiceWorkerManager
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 */
export class EzServiceWorkerManager {
    /**
     * @private @field
     * Stores the map of service worker names to servicer worker registration instances
     * @type {object}
     */
    #ezServiceWorkerRegistrationsMap = {};
    /**
     * @public @property @getter
     * Gets the map of service worker names to servicer worker registration instances
     * @returns {object}
     */
    get ezServiceWorkerRegistrationsMap() {
        return this.#ezServiceWorkerRegistrationsMap;
    }
    /**
     * @public @property @setter
     * Sets the map of service worker names to servicer worker registration instances
     * @param {object} serviceWorkerRegistrationsMap
     * Undefined or null objects get ignored and do not modify the stored service worker registrations map.
     */
    set ezServiceWorkerRegistrationsMap(serviceWorkerRegistrationsMap) {
        // Only set service worker registrations if the paramter is a valid object
        if (EzObject.isValid(serviceWorkerRegistrationsMap)) {
            for (let serviceWorkerName of serviceWorkerRegistrationsMap) {
                if (EzObject.isValid(serviceWorkerName) && serviceWorkerRegistrationsMap?.[serviceWorkerName]) {
                    this.#ezServiceWorkerRegistrationsMap[serviceWorkerName] = serviceWorkerRegistrationsMap[serviceWorkerName];
                }
            }
        }
    }

    /**
     * @public @readonly @property
     * Gets if the browser supports globalThis.navigator.serviceWorker and globalThis.window.PushManager
     * @returns {boolean}
     */
    get ezServiceWorkersSupported() {
        return globalThis?.navigator?.serviceWorker && globalThis?.window?.PushManager;
    }

    /**
     * @public @method
     * Registers a service worker with the provided serviceWorkerName
     * @param {string} serviceWorkerName
     * @returns {Promise}
     */
    ezRegisterServiceWorker(serviceWorkerName) {
        if (!EzString.hasLength(serviceWorkerName)) {
            throw new EzBadParamException(
                'serviceWorkerName',
                EzServiceWorkerManager.ezInstance,
                EzServiceWorkerManager.ezInstance.ezRegisterServiceWorker);
        }

        EzPromise.promise(
            (resolve, reject) => {
                if (!EzServiceWorkerManager.ezInstance.ezServiceWorkersSupported) {
                    return reject({
                        errorCode: 501,
                        message: EzString.em`
                            Ignored the request to register service worker ${serviceWorkerName}:
                            The browser does not suport navigator.serviceWorker or window.PushManager.`
                    });
                }

                // Register the service worker
                globalThis.navigator.serviceWorker.register(serviceWorkerName)
                    .then(
                        (serviceWorkerRegistrationResponse) => {
                            if (serviceWorkerRegistrationResponse) {
                                EzServiceWorkerManager.ezInstance.ezServiceWorkerRegistrationsMap[serviceWorkerName] = serviceWorkerRegistrationResponse;

                                ezApi.ezclocker.ezLogger.info(`Registered service worker ${serviceWorkerName}.`);

                                ezApi.ezclocker.ezLogger.debug(
                                    `[EzServiceWorkerManager][${serviceWorkerName}]:Registration info: ${EzJson.toJson(serviceWorkerRegistration)}`);

                                return resolve({
                                    errorCode: 0,
                                    message: 'Success',
                                    serviceWorkerName: serviceWorkerName,
                                    serviceWorkerRegistration: serviceWorkerRegistrationResponse
                                });
                            }
                        })
                    .catch(
                        (err) => {
                            let em = EzString.em`
                                Failed to register service worker ${serviceWorkerName}
                                due to the following error: ${err.message}.`;

                            ezApi.ezclocker.ezLogger.error(em);

                            return reject({
                                errorCode: 500,
                                message: em
                            });
                        });
            });
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
        return 'ezServiceWorkerManager';
    }

    /**
     * @static
     * @public @readonly @property
     * Gets an object of event names that this class may trigger.
     * @returns {object}
     */
    static get ezEventNames() {
        return {
            onReady: 'ezOn_EzServiceWorkerManager_Ready',
            onStateReady: 'ezOn_EzServiceWorkerManager_StateReady',
            onEzServiceWorkerManagerLicenseProcessingCompleted: 'ezOn_EzServiceWorkerManager_LicenseProcessing_Completed'
        };
    }

    /**
     * @static
     * @private @field
     * Stores the singleton instance of this class that was created by and registerd with EzApi.
     * @type {EzServiceWorkerManager}
     */
    static #ezInstance = globalThis?.ezApi?.ready && globalThis.ezApi?.ezclocker?.[EzServiceWorkerManager.ezApiName]
        ? globalThis.ezApi.ezclocker[EzServiceWorkerManager.ezApiName]
        : null;
    /**
     * @static
     * @public @property @getter
     * Gets the singleton instance of this class that is registered with EzApi (if available yet)
     * @returns {EzServiceWorkerManager}
     */
    static get ezInstance() {
        return EzServiceWorkerManager.#ezInstance;
    }
    /**
     * @static
     * @public @property @setter
     * Sets the singleton instance of of this class that is registered with EzApi.
     * @param {EzServiceWorkerManager} instance
     */
    static set ezInstance(instance) {
        if (null != EzServiceWorkerManager.#ezInstance) {
            throw new Error('EzServiceWorkerManager\'s singleton instance is already reigstered with EzApi.');
        }

        EzServiceWorkerManager.#ezInstance = instance;
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
    static #ezApiRegistrationState = globalThis?.ezApi?.ready && globalThis.ezApi?.ezclocker?.[EzServiceWorkerManager.ezApiName]
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
        return EzServiceWorkerManager.#ezApiRegistrationState;
    }
    /**
     * @static
     * @public @property @setter
     * Sets the ezApi registration state of this classes's singleton instance.
     * @param {string} ezApiRegistrationState
     * A valid enum property value from EzRegistrationState
     */
    static set ezApiRegistrationState(ezApiRegistrationState) {
        EzServiceWorkerManager.#ezApiRegistrationState = EzRegistrationState.ezValueOf(ezApiRegistrationState);
    }

    /**
     * @static
     * @private @readonly @property
     * Gets true when all required dependencies for this class report ready.
     * In otherwords, the require dependency's singleton instance is created
     * and is registered with and accessable from EzApi with ezApi.ezclocker.{dependency_name}.
     * @returns {boolean}
     */
    static get #ezCanRegister() {
        return EzRegistrationState.PENDING === EzServiceWorkerManager.ezApiRegistrationState &&
            globalThis?.ezApi?.ready &&
            globalThis.ezApi?.ezclocker?.[EzEventEngine.ezApiName]?.ready &&
            globalThis.ezApi?.ezclocker?.[EzDateTime.ezApiName]?.ready &&
            globalThis.ezApi?.ezclocker?.[EzNavigation.ezApiName]?.ready &&
            globalThis.ezApi?.ezclocker?.[EzClockerContextEventName.ezApiName]?.ready &&
            globalThis.ezApi?.ezclocker?.[EzClockerContext.ezApiName]?.ready &&
            globalThis.ezApi?.ezclocker?.[EzUI.ezApiName]?.ready &&
            globalThis.ezApi?.ezclocker?.[EzDialog.ezApiName]?.ready;
    }

    /**
     * @static
     * @private @readonly @property
     * Gets if this class's singleton instance is registered with ezApi yet.
     * @returns {boolean}
     */
    static get #ezIsRegistered() {
        return null != EzServiceWorkerManager.ezInstance &&
            EzRegistrationState.REGISTERED === EzServiceWorkerManager.ezApiRegistrationState;
    }

    /**
     * @static
     * @private @method
     * Attempts to register the singleton instance for this class with ezApi. Returns true
     * if successful, false otherwise.
     * @returns {boolean}
     */
    static #ezRegistrator() {
        if (EzServiceWorkerManager.#ezCanRegister && !EzServiceWorkerManager.#ezIsRegistered) {
            globalThis.ezApi.ezRegisterNewApi(EzServiceWorkerManager, EzServiceWorkerManager.ezApiName);
        }

        return EzServiceWorkerManager.#ezIsRegistered;
    }

    /**
     * @static
     * Static Initialization
     * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
     * >> IMPORTANT <<
     * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
     * Make sure the following properties and methods get defined BEFORE this static initialization section:
     *     1) Property getter EzServiceWorkerManager.ezApiName
     *     2) Property getter EzServiceWorkerManager.ezEventNames
     *     3) Property getter EzServiceWorkerManager.ezInstance
     *     4) Property setter EzServiceWorkerManager.ezInstance
     *     5) Property getter EzServiceWorkerManager.ezApiRegistrationState
     *     6) Property setter EzServiceWorkerManager.ezApiRegistrationState
     *     7) Property getter EzServiceWorkerManager.#ezCanRegister
     *     8) Property getter EzServiceWorkerManager.#ezIsRegistered
     *     9) Method EzServiceWorkerManager.#ezRegistrator()
     */
    static {
        if (!EzServiceWorkerManager.#ezIsRegistered) {
            EzServiceWorkerManager.ezApiRegistrationState = EzRegistrationState.PENDING;

            if (!EzServiceWorkerManager.#ezRegistrator()) {
                document.addEventListener(
                    EzServiceWorkerManager.ezOnEzApiReadyEventName,
                    EzServiceWorkerManager.#ezRegistrator);

                document.addEventListener(
                    EzEventEngine.ezEventNames.onReady,
                    EzServiceWorkerManager.#ezRegistrator);

                document.addEventListener(
                    EzDateTime.ezEventNames.onReady,
                    EzServiceWorkerManager.#ezRegistrator);

                document.addEventListener(
                    EzNavigation.ezEventNames.onReady,
                    EzServiceWorkerManager.#ezRegistrator);

                document.addEventListener(
                    EzClockerContext.ezEventNames.onReady,
                    EzServiceWorkerManager.#ezRegistrator);

                document.addEventListener(
                    EzEmployerService.ezEventNames.onReady,
                    EzServiceWorkerManager.#ezRegistrator);

                document.addEventListener(
                    EzEmployeeService.ezEventNames.onReady,
                    EzServiceWorkerManager.#ezRegistrator);

                document.addEventListener(
                    EzLicenseHelper.ezEventNames.onReady,
                    EzServiceWorkerManager.#ezRegistrator);

                document.addEventListener(
                    EzUI.ezEventNames.onReady,
                    EzServiceWorkerManager.#ezRegistrator);

                document.addEventListener(
                    EzSpinner.ezEventNames.onReady,
                    EzServiceWorkerManager.#ezRegistrator);

                document.addEventListener(
                    EzDialog.ezEventNames.onReady,
                    EzServiceWorkerManager.#ezRegistrator);

                document.addEventListener(
                    EzClockerContextEventName.ezEventNames.onReady,
                    EzServiceWorkerManager.#ezRegistrator);

                document.addEventListener(
                    EzEmployerService.ezEventNames.onReady,
                    EzServiceWorkerManager.#ezRegistrator);

                document.addEventListener(
                    EzEmployerLogoController.ezEventNames.onReady,
                    EzServiceWorkerManager.#ezRegistrator);

                document.addEventListener(
                    EzUpdateCompanyInfoDialog.ezEventNames.onReady,
                    EzServiceWorkerManager.#ezRegistrator);

                document.addEventListener(
                    EzSubscriptionPlansView.ezEventNames.onReady,
                    EzServiceWorkerManager.#ezRegistrator);

                document.addEventListener(
                    EzSendFeedbackDialog.ezEventNames.onReady,
                    EzServiceWorkerManager.#ezRegistrator);

                document.addEventListener(
                    EzSubscriptionInfoViewController.ezEventNames.onReady,
                    EzServiceWorkerManager.#ezRegistrator);

                document.addEventListener(
                    EzAccountSubscriptionActions.ezEventNames.onReady,
                    EzServiceWorkerManager.#ezRegistrator);

                document.addEventListener(
                    EzSubscriptionDialog.ezEventNames.onReady,
                    EzServiceWorkerManager.#ezRegistrator);

                document.addEventListener(
                    EzChangeUsernamePasswordDialog.ezEventNames.onReady,
                    EzServiceWorkerManager.#ezRegistrator);

                document.addEventListener(
                    EzDeleteAccountWizard.ezEventNames.onReady,
                    EzServiceWorkerManager.#ezRegistrator);

                document.addEventListener(
                    EzAccountPreferences.ezEventNames.onReady,
                    EzServiceWorkerManager.#ezRegistrator);

                document.addEventListener(
                    EzChangeAccountPasswordDialog.ezEventNames.onReady,
                    EzServiceWorkerManager.#ezRegistrator);

                document.addEventListener(
                    EzUpdateCreditCardDialog.ezEventNames.onReady,
                    EzServiceWorkerManager.#ezRegistrator);

                document.addEventListener(
                    EzAccountDebugTools.ezEventNames.onReady,
                    EzServiceWorkerManager.#ezRegistrator);

                document.addEventListener(
                    EzHelp.ezEventNames.onReady,
                    EzServiceWorkerManager.ezRegistrator);

                document.addEventListener(
                    EzAccountNavButton.ezEventNames.onReady,
                    EzServiceWorkerManager.#ezRegistrator);
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

/*
// Example Code From: https://github.com/GoogleChromeLabs/web-push-codelab/blob/master/completed/08-push-subscription-change/scripts/main.js

'use strict';

const applicationServerPublicKey = 'BHdd2PwLOsYaDQQOmqw_8KIIYOQYECWN' +
  'lat0K8GScnytjV88e6Xifn0GMz7MbScAkxf_kVJhnp-0NrB_P4u6WHw';

const pushButton = document.querySelector('.js-push-btn');

let isSubscribed = false;
let swRegistration = null;

function urlB64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, '+')
    .replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

function updateBtn() {
  if (Notification.permission === 'denied') {
    pushButton.textContent = 'Push Messaging Blocked.';
    pushButton.disabled = true;
    updateSubscriptionOnServer(null);
    return;
  }

  if (isSubscribed) {
    pushButton.textContent = 'Disable Push Messaging';
  } else {
    pushButton.textContent = 'Enable Push Messaging';
  }

  pushButton.disabled = false;
}

function updateSubscriptionOnServer(subscription) {
  // TODO: Send subscription to application server

  const subscriptionJson = document.querySelector('.js-subscription-json');
  const subscriptionDetails =
    document.querySelector('.js-subscription-details');

  if (subscription) {
    subscriptionJson.textContent = JSON.stringify(subscription);
    subscriptionDetails.classList.remove('is-invisible');
  } else {
    subscriptionDetails.classList.add('is-invisible');
  }
}

function subscribeUser() {
  const applicationServerKey = urlB64ToUint8Array(applicationServerPublicKey);
  swRegistration.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: applicationServerKey
  })
  .then(function(subscription) {
    console.log('User is subscribed.');

    updateSubscriptionOnServer(subscription);

    isSubscribed = true;

    updateBtn();
  })
  .catch(function(err) {
    console.log('Failed to subscribe the user: ', err);
    updateBtn();
  });
}

function unsubscribeUser() {
  swRegistration.pushManager.getSubscription()
  .then(function(subscription) {
    if (subscription) {
      return subscription.unsubscribe();
    }
  })
  .catch(function(error) {
    console.log('Error unsubscribing', error);
  })
  .then(function() {
    updateSubscriptionOnServer(null);

    console.log('User is unsubscribed.');
    isSubscribed = false;

    updateBtn();
  });
}

function initializeUI() {
  pushButton.addEventListener('click', function() {
    pushButton.disabled = true;
    if (isSubscribed) {
      unsubscribeUser();
    } else {
      subscribeUser();
    }
  });

  // Set the initial subscription value
  swRegistration.pushManager.getSubscription()
  .then(function(subscription) {
    isSubscribed = !(subscription === null);

    updateSubscriptionOnServer(subscription);

    if (isSubscribed) {
      console.log('User IS subscribed.');
    } else {
      console.log('User is NOT subscribed.');
    }

    updateBtn();
  });
}

if ('serviceWorker' in navigator && 'PushManager' in window) {
  console.log('Service Worker and Push is supported');

  navigator.serviceWorker.register('sw.js')
  .then(function(swReg) {
    console.log('Service Worker is registered', swReg);

    swRegistration = swReg;
    initializeUI();
  })
  .catch(function(error) {
    console.error('Service Worker Error', error);
  });
} else {
  console.warn('Push messaging is not supported');
  pushButton.textContent = 'Push Not Supported';
}
*/