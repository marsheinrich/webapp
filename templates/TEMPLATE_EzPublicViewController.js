/*
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    ENGINEERING NOTES
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    This is an example view controller class for a public view
    (aka a public website page) for ezClocker's website.

    1) Copy the template to the folder for the new view controller.
    2) Rename the template file following the file name template
       below:
        Ez<VIEW_NAME>ViewController.js

        NOTE
            Replace <VIEW_NAME> with the name of your view.

        Example:
            If the view is for a privacy statement then a possible
            name for the view is PrivacyStatementView. Therefore, you
            will rename the template file:
                From..: TEMPLATE_EzPublicViewController.js
                To....: EzPrivacyStatementViewController.js
    3) Perform a find and replace for the following:
        Find: EzPublicViewController
        Replace: EZ<VIEW_NAME>ViewController

        Replace the <VIEW_NAME> text with the actual name of
        your view.

        Example:
        If the file name is EzPrivacyStatementViewController.js then
        the view name is PrivacyStatementView and you would use the
        following find and replace values:
            Find: EzPublicViewController
            Replace: EzPrivacyStatementViewController
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
*/

/**
    Import common exception classes exported from EzExceptions.js
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    ENGINEERING NOTES
        Remove or comment out any exceptions imported from
        EzExceptions.js that you do not use in this class.
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 */
import {
    // EzException,
    // EzExceptionInClassMethod,
    EzBadParamException,
    // EzBadStateException,
    // EzStaticClassException,
    // EzNotSupportedException
} from '/ezlibrary/exceptions/EzExceptions.js';

/**
    Import common helper classes exported from EzHelpers.js
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    ENGINEERING NOTES
        Comment out or remove all imports from EzHelpers that
        you do not use in this class.
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 */
import {
    EzObject,
    EzBoolean,
    // EzNumber,
    // EzFloat,
    // EzString,
    // EzArray,
    // EzUrl,
    EzHtml,
    // EzFunction,
    // EzJson,
    // EzConsole,
    // EzAsync,
    // EzUTF8CharHelper,
    EzPromise
} from '/ezlibrary/helpers/EzHelpers.js';

/**
    Import common enumeration classes exported from EzEnumerations.js
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    ENGINEERING NOTES
        For nearly all enumeration classes (especially the enumeration
        classes that extend EzEnumeration2) you only use the available
        static methods and properties from the enumeration class.

        However, some of the older enumeration classes registered with
        ezApi and require you to access them through ezApi.ezclocker.
        Review the class source file to understand which access method
        you should use.

        Comment out or remove all imports from EzEnumerations that
        you do not use in this class.
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 */
import {
    // EzElementEventName,
    // EzEnvironment,
    // EzRequestMethod,
    // EzMediaType,
    // EzFeatureToggleViewName,
    // EzFeatureToggleId,
    // EzFeaturePackageId
    // EzUserRoleFeature
    // EzCharacterEncoding
    // EzClockerContextEventName,
    // EzValidationResponseStatus,
    // EzUserPermissionType,
    // EzClockerFeature,
    // EzDialogResponseStatus,
    // EzLocale
    EzRegistrationState
} from '/ezlibrary/enums/EzEnumerations.js';

/**
   Import the base class for all EzApi registered classes such as
   widgets and view controllers.
 */
import { EzClass } from '/ezlibrary/EzClass.js';

/**
    Import the EzEventEngine so you can register, trigger,
    and listen to events.
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    ENGINEERING NOTES
        Not all classes need to register or listen to events. Remove
        this import if you do not listen to or register any events
        other than the default onReady event.
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 */
import { EzEventEngine } from '/ezlibrary/ez-event-engine.js';

/**
    Import ezClocker's UX manipulation utilities class
    Access via: ezApi.ezclocker.ezUi
 */
import { EzUI } from '/public/javascript/common/ezui.js';

/**
    Import ezClocker EzDialog class for configuring and
    showing dialogs such as the confirmation dialog, or
    error message dialog.
    Access via: ezApi.ezclocker.ezDialog
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    ENGINEERING NOTES
        Remove this import if you do not display any dialogs and do
        not need any of the dialog utility methods.
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 */
import { EzDialog } from '/public/javascript/common/ezclocker-dialog-helper.js';

/**
    @class
    @extends {EzClass}
    @description
    Description of what class is for here :)
    -----------------------------------------------------------------
    Import with:
        import { EzPublicViewController } from '/templates/EzPublicViewController.js';
    -----------------------------------------------------------------
    Ready Check:
        globalThis.ezApi.ezclocker[EzPublicViewController.ezApiName] &&
        globalThis.ezApi.ezclocker[EzPublicViewController.ezApiName].ready
    -----------------------------------------------------------------
    Listen for Ready Event:

        document.addEventListener(
            EzPublicViewController.ezEventNames.onReady,
            <destination_class_name>.#ezRegistrator);

        ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        ENGINEERING NOTES
            Replace <class_name> with the name of the class the
            above code is placed into.
        ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    -----------------------------------------------------------------
    Static references:
        Inside this class...: EzPublicViewController.ezInstance
        Outside this class..: ezApi.ezclocker.ezPublicViewController
    -----------------------------------------------------------------
 */
export class EzPublicViewController extends EzClass {
    /**
          @static
          @public @readonly @property
          Returns the name of this class's singleton instance when registered with ezApi.
          NOTE: Use the name of the class with the first letter as lower case for the
          ezApiName value.
          @returns {string}
       */
    static get ezApiName() {
        return 'EzPublicViewController';
    }

    /**
        @static
        @public @readonly @property
        Returns an object of event names that this class may trigger.
        ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        ENGINEERING NOTES
            You must always define the onReady event name for classes that
            register singleton instances with EzApi.

            The registration with EzApi flow will trigger this classes
            onReady event once it has completed all registration steps.

            You can add additional event name 'constants' for events this
            class triggers that other external classes might also want
            to listen to.

            Adding event names below provides external
            classes with a constant for the event name so they can avoid
            typos when listenting for events.
        ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        @returns {object}
     */
    static get ezEventNames() {
        return {
            onReady: 'ezOn_EzPublicViewController_Ready'
        };
    }

    /**
        @static
        @private @field
        Stores the singleton instance of this class that was created by and registerd with EzApi.
        @type {EzPublicViewController}
     */
    static #ezInstance = EzObject.hasProperty(globalThis, 'ezApi') &&
        EzObject.isValid(globalThis.ezApi) && EzBoolean.isTrue(globalThis.ezApi.ready) &&
        EzObject.isValid(globalThis.ezApi.ezclocker[EzPublicViewController.ezApiName])
        ? globalThis.ezApi.ezclocker[EzPublicViewController.ezApiName]
        : null;

    /**
        @static
        @public @property @getter
        Returns the singleton instance of this class that is registered with EzApi (if available yet)
        @returns {EzPublicViewController}
     */
    static get ezInstance() {
        return EzPublicViewController.#ezInstance;
    }

    /**
        @static
        @public @property @setter
        Sets the singleton instance of of this class that is registered with EzApi.
        @param {EzPublicViewController} instance
     */
    static set ezInstance(instance) {
        if (null != EzPublicViewController.#ezInstance) {
            throw new EzException('EzPublicViewController\'s singleton instance is already reigstered with EzApi.');
        }

        EzPublicViewController.#ezInstance = instance;
    }

    /**
        @static
        @private @field
        Stores the EzApi registration state for this class.
        This class is considered register with EzApi when the
        ezApiRegistrationState value equals EzRegistrationState.REGISTERED
        @type {string}
        A valid enum property value from EzRegistrationState
     */
    static #ezApiRegistrationState = EzObject.hasProperty(globalThis, 'ezApi') &&
        EzObject.isValid(globalThis.ezApi) && EzBoolean.isTrue(globalThis.ezApi.ready) &&
        EzObject.isValid(globalThis.ezApi.ezclocker[EzPublicViewController.ezApiName])
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
        return EzPublicViewController.#ezApiRegistrationState;
    }

    /**
        @static
        @public @property @setter
        Sets the ezApi registration state of this classes's singleton instance.
        @param {string} ezApiRegistrationState
        A valid enum property value from EzRegistrationState
     */
    static set ezApiRegistrationState(ezApiRegistrationState) {
        EzPublicViewController.#ezApiRegistrationState = EzRegistrationState.ezValueOf(ezApiRegistrationState);
    }

    /**
        @static
        @private @readonly @property
        Returns true when all required dependencies for this class report that their
        singleton instance is created and registered with ezApi. Dependency classes
        report they are ready by triggering their onRead event.
        ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        ENGINEERING NOTES
            It is important to remember that if a ready check for an
            EzApi registered class is added here then you MUST also
            listen for the class's onReady even in the static
            initialization section below.

            You should include ready checks for any class accessed via
            ezApi.ezclocker in this class.
        ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        @returns {boolean}
     */
    static get #ezCanRegister() {
        return EzRegistrationState.PENDING === EzPublicViewController.ezApiRegistrationState &&
            EzObject.hasProperty(globalThis, 'ezApi') &&
            EzObject.isValid(globalThis.ezApi) && EzBoolean.isTrue(globalThis.ezApi.ready) &&

            globalThis.ezApi.ezclocker[EzClockerContext.ezApiName] &&
            globalThis.ezApi.ezclocker[EzClockerContext.ezApiName].ready &&

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
        return null != EzPublicViewController.ezInstance &&
            EzRegistrationState.REGISTERED === EzPublicViewController.ezApiRegistrationState;
    }

    /**
       @static
       @private @method
       Attempts to register the singleton instance for this class with ezApi. Returns true
       if successful, false otherwise.
       @returns {boolean}
     */
    static #ezRegistrator() {
        if (EzPublicViewController.#ezCanRegister && !EzPublicViewController.#ezIsRegistered) {
            globalThis.ezApi.ezRegisterNewApi(EzPublicViewController, EzPublicViewController.ezApiName);
        }

        return EzPublicViewController.#ezIsRegistered;
    }

    /**
        @static
        Static Initialization
        ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        >> IMPORTANT <<
        ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        Make sure the following static properties and methods always appear
        BEFORE this static initialization section:
           1) Property getter EzPublicViewController.ezApiName
           2) Property getter EzPublicViewController.ezEventNames
           3) Property getter EzPublicViewController.ezInstance
           4) Property setter EzPublicViewController.ezInstance
           5) Property getter EzPublicViewController.ezApiRegistrationState
           6) Property setter EzPublicViewController.ezApiRegistrationState
           7) Property getter EzPublicViewController.#ezCanRegister
           8) Property getter EzPublicViewController.#ezIsRegistered
           9) Method EzPublicViewController.#ezRegistrator()
        ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        ENGINEERING NOTES
            You will always, at a minimum, listen for the EzApi event
            named 'onEzApiReady' and call this classes #ezRegistrator
            static method when triggered.

            Any event listeners added here for onReady events from
            a depenency class that, when triggered, call this classes
            static #ezRegistrator() method require that you ALSO
            include the ready check for the dependency class in this
            classes static #ezCanRegister method above.
        ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
     */
    static {
        if (!EzPublicViewController.#ezIsRegistered) {
            EzPublicViewController.ezApiRegistrationState = EzRegistrationState.PENDING;

            if (!EzPublicViewController.#ezRegistrator()) {
                document.addEventListener(
                    EzPublicViewController.ezOnEzApiReadyEventName,
                    EzPublicViewController.#ezRegistrator);

                document.addEventListener(
                    EzSubscribeToPlanDialog.ezOnEzApiReadyEventName,
                    EzPublicViewController.#ezRegistrator);

                document.addEventListener(
                    EzUI.ezEventNames.onReady,
                    EzPublicViewController.#ezRegistrator);

                document.addEventListener(
                    EzDialog.ezEventNames.onReady,
                    EzPublicViewController.#ezRegistrator);
            }
        }
    }

    /**
        @public @constructor
        >> DO NOT CREATE NEW INSTANCES OUTSIDE OF THE STATIC INITIALIZATION FLOW <<
        ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        ENGINEERING NOTES
            Externally access this class's singleton instace via:
                ezApi.ezclocker.EzPublicViewController

            Internally access this class's singleton instance the static property:
                EzPublicViewController.ezInstance
        ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
     */
    constructor() {
        super();
    }

    /**
        @public @method
        Initializes EzPublicViewController
        ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        ENGINEERING NOTES
            ALWAYS return the singleton instance from this class by either
            returning this or EzPublicViewController.ezInstance.

            This method is called during registration of this class's
            singleton instance with EzApi. The singleton instance of this
            class is created by EzApi and assigned to this classes static
            property EzPublicViewController.ezInstance, after which this
            classes ezInit method is then called.

            When ezInit is called during registration with EzApi, then you
            you can safely assume that you have safe access to all
            registered depenency classes.

            This template contains a common initialization flow. Please
            adjust the flow to the specific needs as necessary.
        ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        @returns {EzPublicViewController}
     */
    ezInit() {
        EzPublicViewController.ezInstance.ezRegisterEvents();

        EzPublicViewController.ezInstance.ezInitData()
            .then(EzPublicViewController.ezInstance.ezInitUx);

        return EzPublicViewController.ezInstance;
    }

    /**
        @protected @method
        Registers the events this class triggers using EzEventEngine.
        ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        ENGINEERING NOTES
            Do not include this method if your class does not trigger any
            events (outside of the default onReady event).

            Example code that registers an event that this class will trigger:
                ezApi.ezclocker.ezEventEngine.ezRegisterEvent(
                    EzPublicViewController.ezEventNames.onEzPublicViewControllerExampleEvent,
                    EzPublicViewController.ezApiName);

            Example code to listen to the event registered above:
                ezApi.ezclocker.ezEventEngine.ezWantEvent(
                    EzPublicViewController.ezEventNames.onEzPublicViewControllerExampleEvent,
                    EzPublicViewController.ezApiName,
                    (ezEvent) => {
                        // function to handle the event when triggered
                    });

            Example code to trigger a registered event:
                ezApi.ezclocker.ezEventEngine.ezTriggerevent(
                    EzPublicViewController.ezEventNames.onEzPublicViewControllerExampleEvent,
                    {
                        name: 'Data available from the data property of the ezEvent param sent as the first param to all event handler functions.'
                    });
        ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
     */
    ezRegisterEvents() {
        /* Register events below that get triggered by this class using ezApi.ezclocker.ezEventEngine.ezTriggerEvent */

    }

    /**
        @protected @method
        Initializes EzPublicViewController data
        ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        ENGINEERING NOTES
            Create or obtain data needed for this class.

            Normally called at some point from the ezInit() or ezInitUX()
            calls.
        ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
     */
    ezInitData() {
        return EzPromise.asyncAction(
            (finished) => {
                // Initialize any data needed before the UX is rendered
                return finished();
            });
    }

    /**
        @protected @method
        Initializes EzPublicViewController UX
        ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        ENGINEERING NOTES
            Called to initialize and/or build the initial UX for this
            view.

            Normally, the ezInitUX() method is called only once after the
            ezInit() call is made.
        ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
     */
    ezInitUX() {
        return EzPromise.asyncAction(
            (finished) => {
                // Initialize the UX and render
                ezApi.ezclocker.ezUi.ezSetContent(
                    // Use the ID of the conainer you will inject the content html into
                    'EzSomeContainerId',
                    EzPublicViewController.ezInstance.ezBuildContentHtml());

                return finished();
            });
    }

    /**
        @protected @method
        Builds the main HTML content for the EzPublicViewController UX
     */
    ezBuildContentHtml() {
        // Return the UX content html
        return EzHtml.build`
          <!-- UX Content Here -->`;
    }
}
