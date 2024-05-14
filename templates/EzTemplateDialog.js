/*
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    Example Template for UX Dialogs in EzClocker
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    Developer notes:: Remove any unused imports and methods.
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
*/

import {
    EzBadParamException
} from '/ezlibrary/exceptions/EzExceptions.js';

import {
    EzObject,
    EzNumber,
    EzFloat,
    EzBoolean,
    EzString,
    EzArray,
    EzFunction,
    EzPromise,
    EzJson,
    EzHtml,
    EzUrl
} from '/ezlibrary/helpers/EzHelpers.js';

import {
    EzRegistrationState,
    EzElementEventName
} from '/ezlibrary/enums/EzEnumerations.js';

/**
   Base class for all EzApi registered classes
 */
import { EzClass } from '/ezlibrary/EzClass.js';

import { EzClockerContext } from '/ezlibrary/EzClockerContext/ez-context.js';

import { EzUI } from '/public/javascript/common/ezui.js';
import { EzDialog } from '/public/javascript/common/ezclocker-dialog-helper.js';

/**
     @class
     @extends {EzClass}
     @description
     Description of dialog
     ---------------------------------------------------------------------
     Import with:
         import { EzTemplateDialog } from '/templates/EzTemplateDialog.js';
     ---------------------------------------------------------------------
     Ready Check:
         globalThis.ezApi.ezclocker[EzTemplateDialog.ezApiName] &&
         globalThis.ezApi.ezclocker[EzTemplateDialog.ezApiName].ready
     ---------------------------------------------------------------------
     Listen for Ready Event:
         document.addEventListener(
             EzTemplateDialog.ezEventNames.onReady,
             this.#ezRegistrator);
     ---------------------------------------------------------------------
     Static references:
         Inside this class...: EzTemplateDialog.ezInstance
         Outside this class..: ezApi.ezclocker.ezTemplateDialog
     ---------------------------------------------------------------------
  */
export class EzTemplateDialog extends EzClass {
    /**
      @static
      @public @readonly @property
      Returns the name of this class's singleton instance when registered with ezApi.
      NOTE: Use the name of the class with the first letter as lower case for the
      ezApiName value.
      @returns {string}
   */
    static get ezApiName() {
        return 'ezTemplateDialog';
    }

    /**
        @static
        @public @readonly @property
        Returns an object of event names that this class may trigger.
        NOTE:
        Always include the onReady event with value based upon the following template:
            onReady: 'ezOn_EzTemplateDialog_Ready'
        @returns {object}
     */
    static get ezEventNames() {
        return {
            onReady: 'ezOn_EzTemplateDialog_Ready'
        };
    }

    /**
        @static
        @private @field
        Stores the singleton instance of this class that was created by and registerd with EzApi.
        @type {EzTemplateDialog}
     */
    static #ezInstance = EzObject.hasProperty(globalThis, 'ezApi') &&
        EzObject.isValid(globalThis.ezApi) && EzBoolean.isTrue(globalThis.ezApi.ready) &&
        EzObject.isValid(globalThis.ezApi.ezclocker[EzTemplateDialog.ezApiName])
        ? globalThis.ezApi.ezclocker[EzTemplateDialog.ezApiName]
        : null;

    /**
        @static
        @public @property @getter
        Returns the singleton instance of this class that is registered with EzApi (if available yet)
        @returns {EzTemplateDialog}
     */
    static get ezInstance() {
        return EzTemplateDialog.#ezInstance;
    }

    /**
        @static
        @public @property @setter
        Sets the singleton instance of of this class that is registered with EzApi.
        @param {EzTemplateDialog} instance
     */
    static set ezInstance(instance) {
        if (null != EzTemplateDialog.#ezInstance) {
            throw new EzException('EzTemplateDialog\'s singleton instance is already reigstered with EzApi.');
        }

        EzTemplateDialog.#ezInstance = instance;
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
        EzObject.isValid(globalThis.ezApi.ezclocker[EzTemplateDialog.ezApiName])
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
        return EzTemplateDialog.#ezApiRegistrationState;
    }

    /**
        @static
        @public @property @setter
        Sets the ezApi registration state of this classes's singleton instance.
        @param {string} ezApiRegistrationState
        A valid enum property value from EzRegistrationState
     */
    static set ezApiRegistrationState(ezApiRegistrationState) {
        EzTemplateDialog.#ezApiRegistrationState = EzRegistrationState.ezValueOf(ezApiRegistrationState);
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
        return EzRegistrationState.PENDING === EzTemplateDialog.ezApiRegistrationState &&
            EzObject.hasProperty(globalThis, 'ezApi') &&
            EzObject.isValid(globalThis.ezApi) && EzBoolean.isTrue(globalThis.ezApi.ready) &&

            /*
                IMPORTANT NOTE:
                If a ready check is added here then you must also add the onReady event
                listener in the static initialization section.
            */

            /* Add ready checks below for all dependencies used in this class that also register with EzApi */
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
        return null != EzTemplateDialog.ezInstance &&
            EzRegistrationState.REGISTERED === EzTemplateDialog.ezApiRegistrationState;
    }

    /**
       @static
       @private @method
       Attempts to register the singleton instance for this class with ezApi. Returns true
       if successful, false otherwise.
       @returns {boolean}
     */
    static #ezRegistrator() {
        if (EzTemplateDialog.#ezCanRegister && !EzTemplateDialog.#ezIsRegistered) {
            globalThis.ezApi.ezRegisterNewApi(EzTemplateDialog, EzTemplateDialog.ezApiName);
        }

        return EzTemplateDialog.#ezIsRegistered;
    }

    /**
        @static
        Static Initialization
        ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        >> IMPORTANT <<
        ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        Make sure the following properties and methods get defined BEFORE this static initialization section:
           1) Property getter EzTemplateDialog.ezApiName
           2) Property getter EzTemplateDialog.ezEventNames
           3) Property getter EzTemplateDialog.ezInstance
           4) Property setter EzTemplateDialog.ezInstance
           5) Property getter EzTemplateDialog.ezApiRegistrationState
           6) Property setter EzTemplateDialog.ezApiRegistrationState
           7) Property getter EzTemplateDialog.#ezCanRegister
           8) Property getter EzTemplateDialog.#ezIsRegistered
           9) Method EzTemplateDialog.#ezRegistrator()
     */
    static {
        if (!EzTemplateDialog.#ezIsRegistered) {
            EzTemplateDialog.ezApiRegistrationState = EzRegistrationState.PENDING;

            if (!EzTemplateDialog.#ezRegistrator()) {
                document.addEventListener(
                    EzTemplateDialog.ezOnEzApiReadyEventName,
                    EzTemplateDialog.#ezRegistrator);

                document.addEventListener(
                    EzSubscribeToPlanDialog.ezOnEzApiReadyEventName,
                    EzTemplateDialog.#ezRegistrator);

                document.addEventListener(
                    EzUI.ezEventNames.onReady,
                    EzTemplateDialog.#ezRegistrator);

                document.addEventListener(
                    EzDialog.ezEventNames.onReady,
                    EzTemplateDialog.#ezRegistrator);
            }
        }
    }

    /**
        @public @constructor
        >> DO NOT CREATE NEW INSTANCES OUTSIDE OF THE STATIC INITIALIZATION FLOW <<
        Use the static singleton instance available from ezApi: ezApi.ezclocker.EzTemplateDialog.
     */
    constructor() {
        super();
    }

    /**
        @public @readonly @property
        Returns the id of this dialog
        @returns {string}
     */
    get ezDialogId() {
        return 'EzTemplateDialog';
    }

    /**
        @public @readonly @property
        Returns the static HTML for this dialog
        @returns {string}
     */
    get ezDialogHtml() {
        return EzHtml.build`
            <div
                id="${EzTemplateDialog.ezInstance.ezDialogId}">
                <!-- dialog ux here -->
            </div>`
    }

    /**
        @private @field
        Stores this dialog's JQuery UI dialog configuration object
        @type {object}
     */
    #ezDialogConfig = null;
    /**
        @public @readonly @property
        Gets this dialog's JQuery UI dialog configuration object
        @returns {object}
     */
    get ezDialogConfig() {
        if (null == this.#ezDialogConfig) {
            this.#ezDialogConfig = new EzDialogConfig(this.ezDialogId);

            this.#ezDialogConfig.title = 'Template Dialog Title';

            this.#ezDialogConfig.dialogClass = 'ez-dialog-shadow';

            this.#ezDialogConfig.closeOnEscape = true;

            this.#ezDialogConfig.autoOpen = false;

            this.#ezDialogConfig.modal = true;

            this.#ezDialogConfig.show = EzDialogConfig.DEFAULT_DIALOG_SHOW_CONFIG;

            this.#ezDialogConfig.hide = EzDialogConfig.DEFAULT_DIALOG_HIDE_CONFIG;

            this.#ezDialogConfig.position = EzDialogConfig.DEFAULT_DIALOG_POSITION_CONFIG;

            this.#ezDialogConfig.resizable = false;

            this.#ezDialogConfig.width = 500;

            this.#ezDialogConfig.height = 'auto';

            this.#ezDialogConfig.focus = null;

            this.#ezDialogConfig.ezDialogIconUrl = '';

            this.#ezDialogConfig.ezDialogContentHtml = this.ezDialogHtml;

            this.#ezDialogConfig.buttons = [
                {
                    id: `${this.ezDialogId}_OK_Button`,
                    text: 'OK',
                    click: this.ezSubmit
                },
                {
                    id: `${this.ezDialogId}_Cancel_Button`,
                    text: 'Cancel',
                    click: this.cancel
                }
            ];
        }

        return this.#ezDialogConfig;
    }

    /**
        @public @property @getter
        Gets this dialog's payload object with the current dialog input values.
        @returns {object}
     */
    get ezDialogPayload() {
        return {
            dataField1: ezApi.ezclocker.ezUi.ezGetInputValue('EzTemplateDialog_DataField1')
        };
    }
    /**
        @public @property @setter
        Sets the input fields in the dialog from the provdied ezDialogPayload.
        @param {object} ezDialogPayload
     */
    set ezDialogPayload(ezDialogPayload) {
        if (!EzObject.isValid(ezDialogPayload)) {
            throw new EzBadParamException(
                'ezDialogPayload',
                this,
                'ezDialogPayload(ezDialogPayload) (setter)');
        }

        ezApi.ezclocker.ezUi.ezSetInputValue(EzString.stringOrEmpty(ezDialogPayload.dataField1));
    }

    /**
        @public @method
        Initializes EzTemplateDialog
        @returns {EzTemplateDialog}
    */
    ezInit() {
        /* Register any events triggered by this dialog class */
        EzTemplateDialog.ezInstance.ezRegisterEvents();

        /* Initialize the dialog's UX */
        EzTemplateDialog.ezInstance.ezInitUX();

        // Always return this classes singleton reference from ezInit
        return EzTemplateDialog.ezInstance;
    }

    /**
        @public @method
        Registers the events this class triggers using EzEventEngine.
    */
    ezRegisterEvents() {
        /* NOTE: Remove this method if not used */
        /*
            Register events below that get triggered by this class using ezApi.ezclocker.ezEventEngine.ezTriggerEvent.

            Example registration:
                ezApi.ezclocker.ezEventEngine.ezRegisterEvent(
                    EzTemplateDialog.ezEventNames.onEzTemplateDialogDataLoaded,
                    EzTemplateDialog.ezApiName);
        */
    }

    /**
        @public @method
        Initializes EzTemplateDialog UX
    */
    ezInitUX() {
        return EzPromise.asyncAction(
            (finished) => {
                // Initialize and inject the dialog into the document
                ezApi.ezclocker.ezDialog.ezInitAndInjectDialog(EzTemplateDialog.ezInstance.ezDialogConfig);

                return finished();
            });
    }

    /**
        @protected @method
        Initializes EzTemplateDialog data
    */
    ezInitData() {
        /* Remove this method if not used */
        return EzPromise.asyncAction(
            (finished) => {
                /* Initialize any data needed before the UX is rendered */

                return finished();
            });
    }

    /**
        @public @method
        Show the dialog
        @param {undefined|null|object} ezDialogPayload
        Optional payload object with properties who's values will get set to the dailog's inputs.
     */
    ezShow(ezDialogPayload) {
        return EzTemplateDialog.ezInstance.ezInitData()
            .then(
                () => {
                    if (EzObject.isValid(ezDialogPayload)) {
                        EzTemplateDialog.ezInstance.ezDialogPayload = ezDialogPayload;
                    }

                    ezApi.ezclocker.ezDialog.ezShowDialog(EzTemplateDialog.ezInstance.ezDialogId);
                });
    }

    /**
        @public @method
        Cancel and close the dialog, making no changes
     */
    ezCancel() {
        EzTemplateDialog.ezInstance.ezClose();
    }

    /**
        @public @method
        Closes the dialog
     */
    ezClose() {
        ezApi.ezclocker.ezDialog.ezCloseDialog(EzTemplateDialog.ezInstance.ezDialogId)
    }

    /**
        @public @method
        Submits the dialog's data, performs needed actions, and then closes the dialog.
     */
    ezSubmit() {
        return ezApi.ezclocker.ezUi.ezPageWaitAsync(
            'Submitting dialog data ...',
            (waitDone) => {
                /* perform submit actions here */

                EzTemplateDialog.ezInstance.ezClose();

                return waitDone().then(EzPromise.ignoreResolve);
            });
    }

}
