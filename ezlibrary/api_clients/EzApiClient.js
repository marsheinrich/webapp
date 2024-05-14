import {
    EzBadParamException
} from '/ezlibrary/exceptions/EzExceptions.js';

import {
    EzObject,
    EzString,
    EzUrl
} from '/ezlibrary/helpers/EzHelpers.js';

import { EzClass } from '/ezlibrary/EzClass.js';

import { EzHttpHelper } from '/public/javascript/common/ezclocker-http-helper.js';

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// Code template to use in extended classes:
//      1) Copy and paste the below code in the extending classs
//      2) Perform a find & replace:
//          Find: EzMyApiClient
//          Replace: Name of the extending class
//
//  /**
//      @static
//      @public @readonly @property
//      Returns the name of this class's singleton instance when registered with ezApi.
//      @returns {string}
//   */
//  static ezApiName = 'ezMyApiClient';
//
//  /**
//      @static
//      @public @readonly @property
//      Returns an object of event names that this class may trigger.
//      @returns {object}
//   */
//  static ezEventNames = {
//      onReady: 'ezOn_EzMyApiClient_Ready'
//  };
//
//  /**
//      @static
//      @private @field
//      Stores the singleton instance of this class that was created by and registerd with EzApi.
//      @type {EzMyApiClient}
//   */
//  static #ezInstance = EzObject.hasProperty(globalThis, 'ezApi') &&
//      EzObject.isValid(globalThis.ezApi) && EzBoolean.isTrue(globalThis.ezApi.ready) &&
//      EzObject.isValid(globalThis.ezApi.ezclocker[EzMyApiClient.ezApiName])
//      ? globalThis.ezApi.ezclocker[EzMyApiClient.ezApiName]
//      : null;
//
//  /**
//      @static
//      @public @property @getter
//      Returns the singleton instance of this class that is registered with EzApi (if available yet)
//      @returns {EzMyApiClient}
//      */
//  static get ezInstance() {
//      return EzMyApiClient.#ezInstance;
//  }
//
//  /**
//      @static
//      @public @property @setter
//      Sets the singleton instance of of this class that is registered with EzApi.
//      @param {EzMyApiClient} instance
//  */
//  static set ezInstance(EzMyApiClient) {
//      if (null != EzMyApiClient.#ezInstance) {
//          throw new Error('EzMyApiClient\'s singleton instance is already reigstered with EzApi.');
//      }
//
//      EzMyApiClient.#ezInstance = instance;
//  }
//
//  /**
//      @static
//      @private @field
//      Stores the EzApi registration state for this class.
//      Default value is NULL
//      Class is registerd with EzApi when value is EzRegistrationState.REGISTERED
//      @type {string}
//      A valid enum property value from EzRegistrationState
//   */
//  static #ezApiRegistrationState = EzObject.hasProperty(globalThis, 'ezApi') &&
//      EzObject.isValid(globalThis.ezApi) && EzBoolean.isTrue(globalThis.ezApi.ready) &&
//      EzObject.isValid(globalThis.ezApi.ezclocker[EzMyApiClient.ezApiName])
//      ? EzRegistrationState.REGISTERED
//      : null;
//
//  /**
//      @static
//      @public @property @getter
//      Returns the ezApi registration state of this classes's singleton instance.
//      @returns {string}
//      A valid enum property value from EzRegistrationState
//   */
//  static get ezApiRegistrationState() {
//      return EzMyApiClient.#ezApiRegistrationState;
//  }
//
//  /**
//      @static
//      @public @property @setter
//      Sets the ezApi registration state of this classes's singleton instance.
//      @param {string} ezApiRegistrationState
//      A valid enum property value from EzRegistrationState
//   */
//  static set ezApiRegistrationState(ezApiRegistrationState) {
//      EzMyApiClient.#ezApiRegistrationState = EzRegistrationState.ezValueOf(ezApiRegistrationState);
//  }
//
//  /**
//      @static
//      @private @readonly @property
//      Returns true when all required dependencies for this class report ready.
//      In otherwords, the require dependency's singleton instance is created
//      and is registered with and accessable from EzApi with ezApi.ezclocker.{dependency_name}.
//      @returns {boolean}
//   */
//  static get #ezCanRegister() {
//      return EzRegistrationState.PENDING === EzMyApiClient.ezApiRegistrationState &&
//          EzObject.hasProperty(globalThis, 'ezApi') &&
//          EzObject.isValid(globalThis.ezApi) && EzBoolean.isTrue(globalThis.ezApi.ready);
//  }
//
//  /**
//      @static
//      @private @readonly @property
//      Returns if this class's singleton instance is registered with ezApi yet.
//      @returns {boolean}
//   */
//  static get #ezIsRegistered() {
//      return null != EzMyApiClient.ezInstance &&
//          EzRegistrationState.REGISTERED === EzMyApiClient.ezApiRegistrationState;
//  }
//
//  /**
//      @static
//      @private @method
//      Attempts to register the singleton instance for this class with ezApi. Returns true
//      if successful, false otherwise.
//      @returns {boolean}
//   */
//  static #ezRegistrator() {
//      if (EzMyApiClient.#ezCanRegister && !EzMyApiClient.#ezIsRegistered) {
//          globalThis.ezApi.ezRegisterNewApi(EzMyApiClient, EzMyApiClient.ezApiName);
//      }
//
//      return EzMyApiClient.#ezIsRegistered;
// }
//
//  /**
//      @static
//      Static Initialization
//      ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//      >> IMPORTANT <<
//      ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//      Make sure the following properties and methods get defined BEFORE this static initialization section:
//          1) Property getter EzMyApiClient.ezApiName
//          2) Property getter EzMyApiClient.ezEventNames
//          3) Property getter EzMyApiClient.ezInstance
//          4) Property setter EzMyApiClient.ezInstance
//          5) Property getter EzMyApiClient.ezApiRegistrationState
//          6) Property setter EzMyApiClient.ezApiRegistrationState
//          7) Property getter EzMyApiClient.#ezCanRegister
//          8) Property getter EzMyApiClient.#ezIsRegistered
//          9) Method EzMyApiClient.#ezRegistrator()
//   */
//  static {
//      if (!EzMyApiClient.#ezIsRegistered) {
//          EzMyApiClient.ezApiRegistrationState = EzRegistrationState.PENDING;
//
//          if (!EzMyApiClient.#ezRegistrator()) {
//              document.addEventListener(
//                  EzMyApiClient.ezOnEzApiReadyEventName,
//                  () => {
//                      if (!EzMyApiClient.#ezRegistrator()) {
//                          // Place onReady event listeners for dependencies here
//                      }
//                  });
//         }
//     }
//  }
//
//  /**
//      @public @constructor
//      >> DO NOT CREATE NEW INSTANCES OUTSIDE OF THE STATIC INITIALIZATION FLOW <<
//      Use the static singleton instance available from ezApi: ezApi.ezclocker.EzEmployerFeaturePackagesApiClient.
//   */
//  constructor() {
//      super('/_api/v1/feature-packages');
//  }
//
//  /**
//      @override
//      @protected @method
//      Initializes EzEmployerFeaturePackagesApiClient
//      @returns {EzEmployerFeaturePackagesApiClient}
//   */
//  ezInit() {
//      return EzEmployerFeaturePackagesApiClient.ezInstance;
//  }
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

/**
    @class
    @extends {EzClass}
    @description
    Base class for API clients
    ---------------------------------------------------------------------
    Import with:
        import { EzApiClient } from '/ezlibrary/api_clients/EzApiClient.js';
    ---------------------------------------------------------------------
 */
export class EzApiClient extends EzClass {
    /**
        @public @constructor
        DO NOT CREATE NEW INSTNACES OF EzApiClient
        Use as a base class ONLY
        @param {string} apiEndpoint
        The base endpoint for the API. Do not include the ending '/' character
     */
    constructor(apiEndpoint) {
        super();

        if (!EzString.stringHasLength(apiEndpoint)){
            throw new EzBadParamException(
                'apiEndpoint',
                this,
                this.constructor);
        }

        if ('/' === apiEndpoint[apiEndpoint.length - 1]) {
            // Remove any ending slash
            apiEndpoint = apiEndpoint.substring(0, apiEndpoint.length - 1);
        }

        this.#ezApiEndpoint = EzString.stringOrDefault(
            apiEndpoint,
            '/_api/v1');
    }

    /**
        @private @field
        Stores the API endpoint for this client
        @type {string}
     */
    #ezApiEndpoint;
    /**
        @public @readonly @property
        Returns the API's base endpoint without an ending slash.
        @returns {string}
     */
    get ezApiEndpoint() {
        return this.#ezApiEndpoint;
    }

    /**
        @protected @method
        Classes extended EzApiClient must implement this ezInit method, returning the ezInstance at a minimum in order to
        to initialize themselves during registration with EzApi.
        @returns {object}
     */
    ezInit() {
        throw new EzBadStateException(
            'Classes extended EzApiClient must implement the ezInit() method.',
            `EzInit method is not implemented by ${this.toString()}.`,
            this,
            this.ezInit);
    }

    /**
        @public @method
        Executes an HTTP get using the ezApiEndpoint.
        Builds the API endpoint using the following template:
            1) If path is undefined or null AND params is undefined or null:
                GET: `${this.ezApiEndpoint}`
            2) If path is provided and path starts with '/' AND params is undefined or null:
                GET: `${this.ezApiEndpoint}${path}`
            3) If path is provided and path does NOT start with '/' AND params is undefined or null:
                GET: `${this.ezApiEndpoint}/${path}`
            4) If path is provided and path starts with '/' AND params is provided:
                GET: `${this.ezApiEndpoint}${path}?${paramPropName1}=${params[paramPropName1]}&${paramPropNameN}=${params[paramPropNameN]}`
            5) If path is provided and path does NOT start with '/' AND params is provided:
                GET: `${this.ezApiEndpoint}/${path}?${paramPropName1}=${params[paramPropName1]}&${paramPropNameN}=${params[paramPropNameN]}`
            6) If path is undefined or null AND params is provided:
                GET: `${this.ezApiEndpoint}?${paramPropName1}=${params[paramPropName1]}&${paramPropNameN}=${params[paramPropNameN]}`
        @param {undefined|null|string} path
        Optional path to append to the ezApiEndpoint. A '/' is prepended to the path if it does not already start with the '/' character.
        @param {undefined|null|object} params
        Optional key/value object of parameters to append to the url.
        Example params object: {
            'filter': 'FILTER_ID',
            'target-time-zone-id': 'UTC''
        }
        @returns {Promise}
        Promise.resolve contains the success response
        Promose.reject contains the failure response
     */
    ezGet(path, params) {
        if (!EzString.stringHasLength(path)) {
            path = '';
        } else if ('/' !== path[0]) {
            path = EzUrl.build`/${path}`;
        }

        let paramString = '';

        if (EzObject.isValid(params)) {
            for (let paramName of params) {
                paramString = 0 == paramString.length
                    ? EzUrl.build`?${paramName}=${params[paramName]}`
                    : EzUrl.build`${paramString}&${paramName}=${params[paramName]}`
            }
        }

        return ezApi.ezclocker.ezHttpHelper.ezGet(
            EzUrl.build`
                ${this.ezApiEndpoint}
                ${path}
                ${paramString}`)
            .then(
                this.ezProcessApiGetPostResolve,
                this.ezProcessApiReject);
    }

    ezPost(path, payload) {
        if (!EzString.stringHasLength(path)) {
            path = '';
        } else if ('/' !== path[0]) {
            path = EzUrl.build`/${path}`;
        }


        if (payload) {
            return ezApi.ezclocker.ezHttpHelper.ezPost(
                path,
                JSON.stringify(payload))
                .then(
                    this.ezProcessApiGetPostResolve,
                    this.ezProcessApiReject);
        }
    }

    /**
     @public @method
      Evaluates the response:
      1) If the response is undefined or null, then calls ezApi.ezclocker.ezHttpHelper.ezProccessApiReject passing the provided
      response, jqXHR, and optionalEndpoint to report an error.
      2) If the response.errorCode is not zero, then calls ezApi.ezclocker.ezHttpHelper.ezProccessApiReject passing the provided
      response, jqXHR, and optionalEndpoint to report an error.
      3) Otherwise, Promise.resolve is called passing the provided response and jqXHR.
     @param {undefined|null|object} eResponse
     @param {undefined|null|object} jqXHR
     @param {undefined|null|string} optionalEndpoint
     If provided, the adds the endpoint property to the response equal to the provided optionalEndpoint.
     @returns {Promise.resolve}
     */
    ezProcessApiGetPostResolve(response, jqXHR, optionalEndpoint) {
        if (!EzObject.isValid(response) || (response.jqXHR && 200 != response.jqXHR.status)) {
            return EzHttpHelper.ezInstance.ezProcessApiReject(
                response,
                jqXHR,
                optionalEndpoint);
        }

        if (EzString.stringHasLength(optionalEndpoint)) {
            response.endpoint = optionalEndpoint;
        }

        return ezApi.ezResolve(response, jqXHR);
    }

    /**
        @public @method
        Evaluates the response:
            1) If the response is undefined or null, then calls ezApi.ezclocker.ezHttpHelper.ezProccessApiReject passing the provided
               response, jqXHR, and optionalEndpoint to report an error.
            2) If the response.errorCode is not zero, then calls ezApi.ezclocker.ezHttpHelper.ezProccessApiReject passing the provided
               response, jqXHR, and optionalEndpoint to report an error.
            3) Otherwise, Promise.resolve is called passing the provided response and jqXHR.
        @param {undefined|null|object} eResponse
        @param {undefined|null|object} jqXHR
        @param {undefined|null|string} optionalEndpoint
        If provided, the adds the endpoint property to the response equal to the provided optionalEndpoint.
        @returns {Promise.resolve}
     */
    ezProcessApiResolve(response, jqXHR, optionalEndpoint) {
        if (!EzObject.isValid(response) || 0 != response.errorCode) {
            return EzHttpHelper.ezInstance.ezProcessApiReject(
                response,
                jqXHR,
                optionalEndpoint);
        }

        if (EzString.stringHasLength(optionalEndpoint)) {
            response.endpoint = optionalEndpoint;
        }

        return ezApi.ezResolve(response, jqXHR);
    }

    /**
        @public @method
        Assumes the response is an error response. Then processes as follows:
            1) If eResponse is undefined or null then an eResponse object is created.
            2) If jqXHR is not undefined or null then a rawResponse object is created with template:
                {
                    responseStatus: jqXHR.status,
                    responseStatus: qXHR.statusText,
                    responseJson: jqXHR.responseJson,
                    responseText: jqXHR.responseText,
                    jqXHR: jqXHR
                }
            3) If jqXHR is undefined or null, then a rawResponse object is created with template:
                {
                    responseStatus: ${errorCode.toString()}
                    responseStatusText: ${errorCode.toString()}
                    responseJson: {}
                    responseText: '(not available)'
                    jqXHR: null
                }
        Processes an API service call reject and forwards it to the reject promise response.
        @param {undefined|null|object} eResponse
        @param {undefined|null|object} jqXHR
        @param {undefined|null|string} optionalEndpoint
        @returns {Promise.reject}
     */
    ezProcessApiReject(eResponse, jqXHR, optionalEndpoint) {
        if (!EzObject.isValid(eResponse)) {
            eResponse = {
                errorCode: EzHttpHelper.ezDetermineResponseErrorCode(eResponse, (jqXHR || eResponse.jqXHR)),
                message: EzHttpHelper.ezInstance.ezDetermineResponseErrorMessage(eResponse, (jqXHR || eResponse.jqXHR))
            };
        }

        eResponse.rawResponse = ezApi.ezclocker.ezHttpHelper.ezDetermineRawResponse(jqXHR || eResponse.jqXHR);

        if (optionalEndpoint) {
            eResponse.endpoint = optionalEndpoint;
        }

        return ezApi.ezReject(eResponse, (jqXHR || eResponse.jqXHR));
    }
}
