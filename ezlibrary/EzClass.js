import { EzBadParamException } from '/ezlibrary/exceptions/EzBadParamException.js';

import { EzInstanceState } from '/ezlibrary/EzInstanceState.js';

import { EzJSONSerializable } from '/ezlibrary/entities/EzJSONSerializable.js';

// ============================================================================================================================================================
// ENGINEERING NOTES:
// ============================================================================================================================================================
// Extending from EzClass Example/Template:
//  1) Copy the code below
//  2) Paste in your new class file
//  3) Remove the leading // with block selection
//  4) Search + Replace matching case 'EzMyClass' with your class name
//  5) Search + release matching case 'ezMyClass' with your class's ezApi name.
// ============================================================================================================================================================
// /* START TEMPLATE */
//
//  /**
//   * EzClocker Exceptions Imports
//   */
//  import {
//      /*
//          ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//          ENGINEERING NOTES
//          ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//          Remove all imported exceptions you do not use in the class.
//          ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//      */
//      EzBadParamException
//  } from '/ezlibrary/exceptions/EzExceptions.js';
//
//  /**
//   * EzClocker Helper Classes
//   */
//  import {
//      /*
//          ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//          ENGINEERING NOTES
//          ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//              Remove all imports you do not use
//          ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//      */
//      EzObject,
//      EzNumber,
//      EzFloat,
//      EzBoolean,
//      EzString,
//      EzArray,
//      EzFunction,
//      EzPromise,
//      EzJson,
//      EzHtml,
//      EzUrl
//  } from '/ezlibrary/helpers/EzHelpers.js';
//
//  import {
//      EzRegistrationState,
//      EzElementEventName
//  } from '/ezlibrary/enums/EzEnumerations.js';
//
//  /**
//   * Base class for all EzApi registered classes
//   */
//  import { EzClass } from '/ezlibrary/EzClass.js';
//
//  import { EzClockerContext } from '/ezlibrary/EzClockerContext/ez-context.js';
//
//  /*
//      ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//      ENGINEERING NOTES
//      ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//      EzUI is used to manipulate the HTML document
//      (Access from ezApi with: ezApi.ezclocker.ezUi)
//      -------------------------------------------------------------
//      If this class will NOT manipulate the HTML document then
//      you can safely remove the EzUI import and related
//      ready check and ready event hook
//      ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//  */
//  import { EzUI } from '/public/javascript/common/ezui.js';
//  import { EzDialog } from '/public/javascript/common/ezclocker-dialog-helper.js';
//
// /**
//  * @class
//  * @extends {EzClass}
//  * @description
//  * Description of what class is for here :)
//  * ---------------------------------------------------------------------
//  * Import with:
//  *     import { EzMyClass } from '/ezlibrary/EzMyClass.js';
//  * ---------------------------------------------------------------------
//  * Ready Check:
//  *     globalThis.ezApi.ezclocker[EzMyClass.ezApiName] &&
//  *     globalThis.ezApi.ezclocker[EzMyClass.ezApiName].ready
//  * ---------------------------------------------------------------------
//  * Listen for Ready Event:
//  *     document.addEventListener(
//  *         EzMyClass.ezEventNames.onReady,
//  *         this.#ezRegistrator);
//  * ---------------------------------------------------------------------
//  * Static references:
//  *     Inside this class...: EzSubscribeToPlanDialog.ezInstance
//  *     Outside this class..: ezApi.ezclocker.ezSubscribeToPlanDialog
//  * ---------------------------------------------------------------------
//  */
//  export class EzMyClass extends EzClass {
//  /**
//   * @static
//   * @public @readonly @property
//   * Returns the name of this class's singleton instance when registered with ezApi.
//   * @returns {string}
//   */
//  static get ezApiName() {
//      /*
//          ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//          ENGINEERING NOTES
//          ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//          Use the name of the class with the first letter as
//          lower case for the ezApiName value.
//          ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//      */
//
//      return 'ezMyClass';
//  }
//
//  /**
//   *  @static
//   *  @public @readonly @property
//   *  Returns an object of event names that this class may trigger.
//   *  @returns {object}
//   */
//  static get ezEventNames() {
//      /*
//          ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//          ENGINEERING NOTES
//          ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//          Always include the onReady event with value based upon
//          the following template: onReady: 'ezOn_EzMyClass_Ready'
//          ---------------------------------------------------------
//          You can add any additional events you want available to
//          other classes by adding the event-name in ezEventNames.
//          Example:
//              onEzMyClassDataLoaded: 'ezOn_EzMyClass_DataLoaded'
//          ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//      */
//
//      return {
//         onReady: 'ezOn_EzMyClass_Ready'
//
//      };
//  }
//
//  /**
//   * @static
//   * @private @field
//   * Stores the singleton instance of this class that was created by and registerd with EzApi.
//   * @type {EzMyClass}
//   */
//  static #ezInstance = EzObject.hasProperty(globalThis, 'ezApi') &&
//      EzObject.isValid(globalThis.ezApi) && EzBoolean.isTrue(globalThis.ezApi.ready) &&
//      EzObject.isValid(globalThis.ezApi.ezclocker[EzMyClass.ezApiName])
//          ? globalThis.ezApi.ezclocker[EzMyClass.ezApiName]
//          : null;
//
//  /**
//   * @static
//   * @public @property @getter
//   * Returns the singleton instance of this class that is registered with EzApi (if available yet)
//   * @returns {EzMyClass}
//   */
//  static get ezInstance() {
//     return EzMyClass.#ezInstance;
//  }
//
//  /**
//   * @static
//   * @public @property @setter
//   * Sets the singleton instance of of this class that is registered with EzApi.
//   * @param {EzMyClass} instance
//   */
//  static set ezInstance(instance) {
//      if (null != EzMyClass.#ezInstance) {
//          throw new EzException('EzMyClass\'s singleton instance is already reigstered with EzApi.');
//      }
//
//      EzMyClass.#ezInstance = instance;
//  }
//
//  /**
//   * @static
//   * @private @field
//   * Stores the EzApi registration state for this class.
//   * Default value is NULL
//   * Class is registerd with EzApi when value is EzRegistrationState.REGISTERED
//   * @type {string}
//   * A valid enum property value from EzRegistrationState
//   */
//  static #ezApiRegistrationState = EzObject.hasProperty(globalThis, 'ezApi') &&
//      EzObject.isValid(globalThis.ezApi) && EzBoolean.isTrue(globalThis.ezApi.ready) &&
//      EzObject.isValid(globalThis.ezApi.ezclocker[EzMyClass.ezApiName])
//          ? EzRegistrationState.REGISTERED
//          : null;
//
//  /**
//   * @static
//   * @public @property @getter
//   * Returns the ezApi registration state of this classes's singleton instance.
//   * @returns {string}
//   * A valid enum property value from EzRegistrationState
//   */
//  static get ezApiRegistrationState() {
//     return EzMyClass.#ezApiRegistrationState;
//  }
//
//  /**
//   * @static
//   * @public @property @setter
//   * Sets the ezApi registration state of this classes's singleton instance.
//   * @param {string} ezApiRegistrationState
//   * A valid enum property value from EzRegistrationState
//   */
//  static set ezApiRegistrationState(ezApiRegistrationState) {
//      EzMyClass.#ezApiRegistrationState = EzRegistrationState.ezValueOf(ezApiRegistrationState);
//  }
//
//  /**
//   * @static
//   * @private @readonly @property
//   * Returns true when all required dependencies for this class report ready.
//   * In otherwords, the require dependency's singleton instance is created
//   * and is registered with and accessable from EzApi with ezApi.ezclocker.{dependency_name}.
//   * @returns {boolean}
//   */
//  static get #ezCanRegister() {
//      return EzRegistrationState.PENDING === EzMyClass.ezApiRegistrationState &&
//          EzObject.hasProperty(globalThis, 'ezApi') &&
//          EzObject.isValid(globalThis.ezApi) && EzBoolean.isTrue(globalThis.ezApi.ready) &&
//
//      /*
//          ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//          ENGINEERING NOTES
//          ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//          If a ready check is added here then you must also add the onReady event
//          listener in the static initialization section.
//      */
//
//      /* Add ready checks below for all dependencies used in this class that also register with EzApi */
//      globalThis.ezApi.ezclocker[EzClockerContext.ezApiName] &&
//      globalThis.ezApi.ezclocker[EzClockerContext.ezApiName].ready &&
//
//      globalThis.ezApi.ezclocker[EzUI.ezApiName] &&
//      globalThis.ezApi.ezclocker[EzUI.ezApiName].ready &&
//
//      globalThis.ezApi.ezclocker[EzDialog.ezApiName] &&
//      globalThis.ezApi.ezclocker[EzDialog.ezApiName].ready;
//  }
//
//  /**
//   * @static
//   * @private @readonly @property
//   * Returns if this class's singleton instance is registered with ezApi yet.
//   * @returns {boolean}
//   */
//  static get #ezIsRegistered() {
//      return null != EzMyClass.ezInstance &&
//          EzRegistrationState.REGISTERED === EzMyClass.ezApiRegistrationState;
//  }
//
//  /**
//   * @static
//   * @private @method
//   * Attempts to register the singleton instance for this class with ezApi. Returns true
//   * if successful, false otherwise.
//   * @returns {boolean}
//   */
//  static #ezRegistrator() {
//     if (EzMyClass.#ezCanRegister && !EzMyClass.#ezIsRegistered) {
//         globalThis.ezApi.ezRegisterNewApi(EzMyClass, EzMyClass.ezApiName);
//     }
//
//     return EzMyClass.#ezIsRegistered;
//  }
//
//  /**
//   * @static
//   * Static Initialization
//   * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//   * >> IMPORTANT <<
//   * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//   * Make sure the following properties and methods get defined BEFORE this static initialization section:
//   *    1) Property getter EzMyClass.ezApiName
//   *    2) Property getter EzMyClass.ezEventNames
//   *    3) Property getter EzMyClass.ezInstance
//   *    4) Property setter EzMyClass.ezInstance
//   *    5) Property getter EzMyClass.ezApiRegistrationState
//   *    6) Property setter EzMyClass.ezApiRegistrationState
//   *    7) Property getter EzMyClass.#ezCanRegister
//   *    8) Property getter EzMyClass.#ezIsRegistered
//   *    9) Method EzMyClass.#ezRegistrator()
//   */
//  static {
//      if (!EzMyClass.#ezIsRegistered) {
//             EzMyClass.ezApiRegistrationState = EzRegistrationState.PENDING;
//
//             if (!EzMyClass.#ezRegistrator()) {
//                 document.addEventListener(
//                     EzMyClass.ezOnEzApiReadyEventName,
//                     EzMyClass.#ezRegistrator);
//
//                 document.addEventListener(
//                     EzUI.ezEventNames.onReady,
//                     EzMyClass.#ezRegistrator);
//
//                 document.addEventListener(
//                     EzDialog.ezEventNames.onReady,
//                     EzMyClass.#ezRegistrator);
//             }
//         }
//  }
//
//  /**
//   * @static
//   * @public @readonly @property
//   * Returns an object with categories that include 'elementNameId'='{element id value}'
//   * for commonly manipulated HTML elements.
//   * @returns {object}
//   */
//  get static ezIds() {
//      return {
//          ezMyClassMainUx: {
//              contentContainerId: "EzMyClass_MainUx_ContentContainerId"
//          },
//          ezMyClassContentUx: {
//              layoutContainerId: 'EzMyClass_Content_ContainerId'
//          }
//      };
//  }
//
//  /**
//   * @public @method
//   * Initializes EzMyClass
//   * @returns {EzMyClass}
//   */
//  ezInit() {
//      /*
//          ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//          ENGINEERING NOTES
//          ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//          The ezInit method called during ezApi registration.
//          Place any initialization that is needed before the class
//          is ready to use. You can safely assume ezApi is available
//          to this method.
//          ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//          [IMPORTANT]
//              1) Always return the classes ezInstance as the last line
//                 in the ezInit() method (even if a Promise or other
//                 async operation occurs before that).
//              2) NEVER return a Promise or any other value other than
//                 EzMyClass.ezInstance from the ezInit() method.
//          ---------------------------------------------------------
//          [Optional A]
//              Implement and call the below method from ezInit if:
//              1) If you added any additional event names in ezEventNames
//                 (other than the onReady)
//
//                  // Call the ezRegisterEvents() method to register events triggered by this class
//                  EzMyClass.ezInstance.ezRegisterEvents();
//          ---------------------------------------------------------
//          [Optional B1]
//              Implement the ezInitData() method in this class and
//              call from ezInit if the following is true:
//                  1) The ezInitUX() call does not need any data from API's before
//                     executing OR you do not use ezInitUx().
//                  2) This class needs data from API's before it is ready to use.
//
//                  // Call the ezInitData() method to load any data from API's during initialization.
//                  EzMyClass.ezInstance.ezInitData()
//                      .then(EzPromise.ezIgnoreResolve);
//          ---------------------------------------------------------
//          [Optional B2]
//              Implement the ezInitData() method in this class and
//              call from ezInit if the following is true:
//                  1) You did not implement Optional B1
//                  2a) The ezInitUX() call needs data from API's before
//                     executing.
//                  2b) This class needs data from API's before it is ready to use.
//
//                  // Call the ezInitData() method to load any data from API's
//                  // before call ezInitUX().
//                  EzMyClass.ezInstance.ezInitData()
//                      .then(EzMyClass.ezInstance.ezInitUX);
//          ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//          */
//
//      return EzMyClass.ezInstance;
//  }
//
//  /**
//   * @protected @method
//   * Registers the events this class triggers using EzEventEngine.
//   */
//  ezRegisterEvents() {
//      /*
//          ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//          ENGINEERING NOTES
//          ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//          Do not include this method if your class does not
//          trigger any events.
//          ---------------------------------------------------------
//          Use the ezApi.ezclocker.ezEventEngine.ezRegisterEvent(...)
//          method from the EzEventEngine class to register events
//          this class will trigger.
//          ---------------------------------------------------------
//          Example registration code:
//              ezApi.ezclocker.ezEventEngine.ezRegisterEvent(
//                  EzMyClass.ezEventNames.onEzMyClassDataLoaded,
//                  EzMyClass.ezApiName);
//          ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//      */
//  }
//
//  /**
//   * @protected @method
//   * Initializes EzMyClass data
//   * @returns {Promise.resolve}
//   */
//  ezInitData() {
//      /*
//          ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//          ENGINEERING NOTES
//          ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//          Do not include this method if your class does not load
//          data (from api's or else where) during initialization.
//          ---------------------------------------------------------
//          Always return a Promise resolve from this method.
//          ---------------------------------------------------------
//          Initialize any data needed before this class is read
//          to use. Normally called from ezInit().
//          ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//      */
//      return EzPromise.asyncAction(
//          (finished) => {
//              /* Initialize any data needed before the UX is rendered ... */
//
//              return finished();
//          });
//  }
//
//  /**
//   * @protected @method
//   * Initializes EzMyClass UX
//   * @returns {Promise.resolve}
//   */
//  ezInitUX() {
//      /*
//          ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//          ENGINEERING NOTES
//          ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//          Do not include this method if your class does not render
//          UX during intitialization.
//          ---------------------------------------------------------
//          Initializes and builds any UX needed before this class is
//          ready to use. Normally called from ezInit().
//          ---------------------------------------------------------
//          Always return a Promise resolve from this method.
//          ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//      */
//      return EzPromise.asyncAction(
//          (finished) => {
//              /* Initialize and build ux ... */
//
//              ezApi.ezclocker.ezUi.ezSetContent(
//                  // Id of container to inject the HTML into
//                  EzMyClass.ezIds.ezMyClassMaxUx.contentContainerId,
//                  EzMyClass.ezInstance.ezBuildContentHtml());
//
//              return finished();
//          });
//  }
//
//  /**
//   * @protected @method
//   * Builds the main HTML content for the EzMyClass UX
//   * @returns {string}
//   * Returns HTML for the main content UX.
//   */
//  ezBuildContentHtml() {
//      /*
//          ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//          ENGINEERING NOTES
//          ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//          Do not include this method if your class will not inject
//          UX into the HTML document.
//          ---------------------------------------------------------
//          Initializes and builds any UX needed before this class is
//          ready to use. Normally called from ezInit().
//          ---------------------------------------------------------
//          Always return a Promise resolve from this method.
//          ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//      */
//
//      return EzHtml.build`
//          <div
//              id="${EzMyClass.ezIds.ezMyClassContentUx.layoutContainerId}">
//          </div>`;
//  }
// }
//
// /* END TEMPLATE */
// ============================================================================================================================================================

/**
    @class
    @description
    Base class for ezClocker Website Javascript Classes
    ---------------------------------------------------------------------------
    WARNING:
        1) Do not import /ezlibrary/exceptions/EzExceptions.js into this class
    ---------------------------------------------------------------------
    Import with:
        import { EzClass } from '/ezlibrary/EzClass.js';
    ---------------------------------------------------------------------
    Import with other ezClocker JS classes:
         import {
            EzClass,
            ... other supported classes ...
        } from ''/ezlibrary/ezclocker-classes/EzClasses.js';
    ---------------------------------------------------------------------
 */
export class EzClass extends EzJSONSerializable {
    /**
        @public @static @readonly @property
        Returns the EzApi 'ready' event name.
        @returns {string}
     */
    static get ezOnEzApiReadyEventName() {
        return 'onEzApiReady';
    }

    /**
        @public @static @readonly @property
        Returns the global reference of ezApi if it is available yet. Otherwise,
        null is returned.
        @returns {EzApi|null}
     */
    static get ezApiInstance() {
        return Object.hasOwn(globalThis, 'ezApi') && globalThis.ezApi && globalThis.ezApi.ready && Object.hasOwn(globalThis.ezApi, 'ezclocker')
            ? globalThis.ezApi
            : null;
    }

    /**
        @public @static @method
        Adds a document event listener for the provided readyEventName that calls the provided
        ezRegistrator function.
     */
    static ezWaitReady(readyEventName, ezRegistrator) {
        if (!readyEventName || 'string' !== typeof readyEventName || 0 == readyEventName.length) {
            throw new EzBadParamException(
                'readyEventName',
                'EzClass',
                EzClass.ezWaitReady);
        }
        if (!ezRegistrator || 'function' !== typeof ezRegistrator) {
            throw new EzBadParamException(
                'ezRegistrator',
                'EzClass',
                EzClass.ezWaitReady);
        }

        document.addEventListener(
            readyEventName,
            ezRegistrator);
    }

    /**
        @public @constructor
     */
    constructor() {
        super();

        this.ezStates.push(EzInstanceState.CONSTRUCTED);
    }

    /**
        @public @field
        @type {boolean}
     */
    #ready = false;
    /**
        @public @getter @property
        @returns {boolean}
     */
    get ready() {
        if (globalThis.console) {
            if (this.#ready) {
                globalThis.console.debug(
                    `[Class ${this.constructor.name}: READY]`);
            } else {
                globalThis.console.debug(
                    `[Class ${this.constructor.name}: NOT READY YET]`);
            }
        }

        return this.#ready;
    }
    /**
        @public @setter @property
        @param {boolean} isReady
     */
    set ready(isReady) {
        if ('boolean' !== typeof isReady) {
            return;
        }

        this.#ready = isReady;
    }

    /**
        @public @field
        @type {array}
     */
    #ezStates = [];
    /**
        @public @setter @property
        @returns {array}
     */
    get ezStates() {
        return this.#ezStates;
    }
    /**
        @public @setter @property
        @param {array} isReady
     */
    set ezStates(states) {
        if (!states || 'object' !== typeof states || 'Array' !== states.constructor.name) {
            return;
        }

        if (globalThis.console) {
            globalThis.console.debug(
                `[Enumeration ${this.constructor.name}: ezStates Updated (${JSON.stringify(this.#ezStates)})]`);
        }

        this.#ezStates = states;
    }

    /**
        @override
        @public @readonly @property
        Returns this instance as a JSON Object (will no longer have the getter/setter methods).
        Useful for serailization to JSON.
        @returns {object}
    */
    get asJSONObject() {
        return {
            ready: this.ready,
            ezStates: this.ezStates
        };
    }

    /**
        @override
        @public @readonly @property
        Returns this instance as JSON string (no formatting)
        @returns {String}
    */
    get asJSON() {
        return super.asJSON;
    }

    /**
        @override
        @public @method
        Converts this instance into a JSON string with optional formatting.
        @param {undefined|null|Number} indentValue
        @param {undefined|null|Boolean} htmlDisplay
        @returns {String}
    */
    ezToJSON(indentValue, htmlDisplay) {
        return super.ezToJSON(indentValue, htmlDisplay);
    }

    /**
        @override
        @public @method
        Copies properties from the provided jsonObject to this instance (even if this instance does not define the property)
        @param {Object} jsonObject
        @returns {Object}
        Returns this instance with the key & values from the provided jsonObject.
    */
    ezFromJSONObject(jsonObject) {
        return super.ezFromJSONObject(jsonObject);
    }

    /**
        @override
        @public @method
        Converts the provided jsonString to a JSON object and then
        passes that object to ezFromJSONObject() to copies properties to this instance
        (even if this instance does not define the property)
        @param {String} jsonString
        @returns {Object}
        Returns this instance with the key & values from the provided json string.
    */
    ezLoadFromJson(jsonString) {
        return super.ezLoadFromJson(jsonString);
    }
}
