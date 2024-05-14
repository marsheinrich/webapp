import {
    EzBadParamException
} from '/ezlibrary/exceptions/EzExceptions.js';

import {
    EzObject,
    EzBoolean,
    EzNumber,
    EzString,
    EzArray,
    EzHtml,
    EzPromise,
    EzJson
} from '/ezlibrary/helpers/EzHelpers.js';

import {
    EzRegistrationState
} from '/ezlibrary/enums/EzEnumerations.js';

import { EzClass } from '/ezlibrary/EzClass.js';

import { EzHttpHelper } from '/public/javascript/common/ezclocker-http-helper.js';
import { EzNavigation } from '/public/javascript/common/ezclocker-navigation-helper.js';

import { EzClockerContext } from '/ezlibrary/EzClockerContext/ez-context.js';

import { EzLocationService } from '/secure/javascript/services/ezclocker-location-service.js';

import { EzUI } from '/public/javascript/common/ezui.js';

/**
    @class
    @extends {EzClass}
    @description
    Renders schedules
    ---------------------------------------------------------------------------
    Import with:
        import { EzScheduleDetailsDialog } from '/secure/widgets/EzScheduleDetailsDialog/EzScheduleDetailsDialog.js';
    ---------------------------------------------------------------------------
    Singleton instance ready for use when the below evaluates to true:
        globalThis.ezApi.ezclocker[EzScheduleDetailsDialog.ezApiName] &&
        globalThis.ezApi.ezclocker[EzScheduleDetailsDialog.ezApiName].ready
    ---------------------------------------------------------------------------
    Listen to onReady event:
        document.addEventListener(
            EzScheduleDetailsDialog.ezEventNames.onReady,
            this.#ezRegistrator);
    ---------------------------------------------------------------------------
    Singleton Instance Reference:
        ezApi.ezclocker.ezScheduleDetailsDialog
    ---------------------------------------------------------------------------
 */
export class EzScheduleDetailsDialog extends EzClass {
    /**
        @static
        @public @readonly @property
        Returns the name of this class's singleton instance when registered with ezApi.
        @returns {string}
     */
    static get ezApiName() {
        return 'ezScheduleDetailsDialog';
    }

    /**
        @static
        @public @readonly @property
        Returns an object of event names that this class may trigger.
        @returns {object}
     */
    static get ezEventNames() {
        return {
            onReady: 'ezOn_EzScheduleDetailsDialog_Ready'
        };
    }

    /**
        @static
        @private @field
        Stores the singleton instance of this class that was created by and registerd with EzApi.
        @type {EzScheduleDetailsDialog}
     */
    static #ezInstance = EzObject.hasProperty(globalThis, 'ezApi') &&
        EzObject.isValid(globalThis.ezApi) && EzBoolean.isTrue(globalThis.ezApi.ready) &&
        EzObject.isValid(globalThis.ezApi.ezclocker[EzScheduleDetailsDialog.ezApiName])
        ? globalThis.ezApi.ezclocker[EzScheduleDetailsDialog.ezApiName]
        : null;

    /**
        @static
        @public @property @getter
        Returns the singleton instance of this class that is registered with EzApi (if available yet)
        @returns {EzScheduleDetailsDialog}
     */
    static get ezInstance() {
        return EzScheduleDetailsDialog.#ezInstance;
    }

    /**
        @static
        @public @property @setter
        Sets the singleton instance of of this class that is registered with EzApi.
        @param {EzScheduleDetailsDialog} instance
     */
    static set ezInstance(instance) {
        if (null != EzScheduleDetailsDialog.#ezInstance) {
            throw new Error('EzScheduleDetailsDialog\'s singleton instance is already reigstered with EzApi.');
        }

        EzScheduleDetailsDialog.#ezInstance = instance;
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
        EzObject.isValid(globalThis.ezApi.ezclocker[EzScheduleDetailsDialog.ezApiName])
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
        return EzScheduleDetailsDialog.#ezApiRegistrationState;
    }

    /**
        @static
        @public @property @setter
        Sets the ezApi registration state of this classes's singleton instance.
        @param {string} ezApiRegistrationState
        A valid enum property value from EzRegistrationState
     */
    static set ezApiRegistrationState(ezApiRegistrationState) {
        EzScheduleDetailsDialog.#ezApiRegistrationState = EzRegistrationState.ezValueOf(ezApiRegistrationState);
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
        return EzRegistrationState.PENDING === EzScheduleDetailsDialog.ezApiRegistrationState &&
            EzObject.hasProperty(globalThis, 'ezApi') &&
            EzObject.isValid(globalThis.ezApi) && EzBoolean.isTrue(globalThis.ezApi.ready) &&

            globalThis.ezApi.ezclocker[EzHttpHelper.ezApiName] &&
            globalThis.ezApi.ezclocker[EzHttpHelper.ezApiName].ready &&

            globalThis.ezApi.ezclocker[EzNavigation.ezApiName] &&
            globalThis.ezApi.ezclocker[EzNavigation.ezApiName].ready &&

            globalThis.ezApi.ezclocker[EzClockerContext.ezApiName] &&
            globalThis.ezApi.ezclocker[EzClockerContext.ezApiName].ready &&

            globalThis.ezApi.ezclocker[EzLocationService.ezApiName] &&
            globalThis.ezApi.ezclocker[EzLocationService.ezApiName].ready &&

            globalThis.ezApi.ezclocker[EzUI.ezApiName] &&
            globalThis.ezApi.ezclocker[EzUI.ezApiName].ready &&

            globalThis.ezApi.ezclocker[EzShiftEditorDialog.ezApiName] &&
            globalThis.ezApi.ezclocker[EzShiftEditorDialog.ezApiName].ready;
    }

    /**
        @static
        @private @readonly @property
        Returns if this class's singleton instance is registered with ezApi yet.
        @returns {boolean}
     */
    static get #ezIsRegistered() {
        return null != EzScheduleDetailsDialog.ezInstance &&
            EzRegistrationState.REGISTERED === EzScheduleDetailsDialog.ezApiRegistrationState;
    }

    /**
        @static
        @private @method
        Attempts to register the singleton instance for this class with ezApi. Returns true
        if successful, false otherwise.
        @returns {boolean}
     */
    static #ezRegistrator() {
        if (EzScheduleDetailsDialog.#ezCanRegister && !EzScheduleDetailsDialog.#ezIsRegistered) {
            globalThis.ezApi.ezRegisterNewApi(EzScheduleDetailsDialog, EzScheduleDetailsDialog.ezApiName);
        }

        return EzScheduleDetailsDialog.#ezIsRegistered;
    }

    /**
        @static
        Static Initialization
        ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        >> IMPORTANT <<
        ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        Make sure the following properties and methods get defined BEFORE this static initialization section:
            1) Property getter EzScheduleDetailsDialog.ezApiName
            2) Property getter EzScheduleDetailsDialog.ezEventNames
            3) Property getter EzScheduleDetailsDialog.ezInstance
            4) Property setter EzScheduleDetailsDialog.ezInstance
            5) Property getter EzScheduleDetailsDialog.ezApiRegistrationState
            6) Property setter EzScheduleDetailsDialog.ezApiRegistrationState
            7) Property getter EzScheduleDetailsDialog.#ezCanRegister
            8) Property getter EzScheduleDetailsDialog.#ezIsRegistered
            9) Method EzScheduleDetailsDialog.#ezRegistrator()
     */
    static {
        if (!EzScheduleDetailsDialog.#ezIsRegistered) {
            EzScheduleDetailsDialog.ezApiRegistrationState = EzRegistrationState.PENDING;

            if (!EzScheduleDetailsDialog.#ezRegistrator()) {
                document.addEventListener(
                    EzScheduleDetailsDialog.ezOnEzApiReadyEventName,
                    () => {
                        if (!EzScheduleDetailsDialog.#ezRegistrator()) {
                            document.addEventListener(
                                EzHttpHelper.ezEventNames.onReady,
                                EzScheduleDetailsDialog.#ezRegistrator);

                            document.addEventListener(
                                EzNavigation.ezEventNames.onReady,
                                EzScheduleDetailsDialog.#ezRegistrator);

                            EzScheduleDetailsDialog.ezWaitReady(
                                EzClockerContext.ezEventNames.onReady,
                                EzScheduleDetailsDialog.#ezRegistrator);

                            document.addEventListener(
                                EzLocationService.ezEventNames.onReady,
                                EzScheduleDetailsDialog.#ezRegistrator);

                            EzScheduleDetailsDialog.ezWaitReady(
                                EzUI.ezEventNames.onReady,
                                EzScheduleDetailsDialog.#ezRegistrator);

                            document.addEventListener(
                                EzShiftEditorDialog.ezEventNames.onReady,
                                EzScheduleDetailsDialog.#ezRegistrator);
                        }
                    });
            }
        }
    }

    /**
        @public @constructor
        >> DO NOT CREATE NEW INSTANCES OUTSIDE OF THE STATIC INITIALIZATION FLOW <<
        Use the static singleton instance available from ezApi: ezApi.ezclocker.EzScheduleDetailsDialog.
     */
    constructor() {
        super();
    }

    get ezDialogId() {
        return 'EzScheduleDetailsDialog';
    }

    get ezIds() {
        return {
            id: this.ezDialogId,
            containers: {
                dialogContainerId: `${EzScheduleDetailsDialog.ezInstance.ezDialogId}_Container`,
                shiftTimeContainerId: `${EzScheduleDetailsDialog.ezInstance.ezDialogId}_ShiftTimeContainer`,
                locationContainerId: `${EzScheduleDetailsDialog.ezInstance.ezDialogId}_LocationContainer`,
                locationNameContainerId: `${EzScheduleDetailsDialog.ezInstance.ezDialogId}_LocationNameContainer`,
                locationDetailsContainerId: `${EzScheduleDetailsDialog.ezInstance.ezDialogId}_LocationDetailsContainer`,
                locationAddressContainerId: `${EzScheduleDetailsDialog.ezInstance.ezDialogId}_LocationAddressContainer`,
                locationPhoneContainerId: `${EzScheduleDetailsDialog.ezInstance.ezDialogId}_LocationPhoneContainer`,
                locationMapContainerId: `${EzScheduleDetailsDialog.ezInstance.ezDialogId}_LocationMapContainer`,
                notesContainerId: `${EzScheduleDetailsDialog.ezInstance.ezDialogId}_NotesContainer`
            }
        }
    }

    get ezDialogHtml() {
        return EzHtml.build`
            <div
                id="${EzScheduleDetailsDialog.ezInstance.ezIds.containers.dialogContainerId}"
                style="display:none">
                <div
                    id="${EzScheduleDetailsDialog.ezInstance.ezDialogId}">
                    <div
                        id="${EzScheduleDetailsDialog.ezInstance.ezIds.containers.shiftTimeContainerId}"
                        class="">
                    </div>
                    <div
                        id="${EzScheduleDetailsDialog.ezInstance.ezIds.containers.locationContainerId}"
                        class="">
                    </div>
                    <div
                        id="${EzScheduleDetailsDialog.ezInstance.ezIds.containers.notesContainerId}"
                        class="">
                    </div>
                </div>
            </div>`
    }

    /**
        @protected
        Initializes EzScheduleDetailsDialog
        @returns {EzScheduleDetailsDialog}
     */
    ezInit() {
        return EzScheduleDetailsDialog.ezInstance;
    }

    ezInitUx() {
        ezApi.ezclocker.ezUi.ezAppendContent(
            'body',
            EzScheduleDetailsDialog.ezInstance.ezDialogHtml);
    }

    ezInitData() {
        return ezApi.ezclocker.ezLocationService.ezGetLocation(locationId)
            .then(
                (response) => {
                    EzScheduleDetailsDialog.ezInstance.ezScheduleLocation = response.location;

                    return finished();
                },
                (eResponse) => {
                    ezApi.ezclocker.ezLogger.error(
                        EzString.em`
                            Failed to obtain the schedule location with locationId= ${EzScheduleDetailsDialog.ezInstance.ezSchedule.locationId}
                            for schedule with scheduleId= ${EzScheduleDetailsDialog.ezInstance.ezSchedule.id} due to the following error:
                            ${eResponse.message}. Error response: ${EzJson.toJson(eResponse)}`);

                        return finished();
                });
    }

    ezShow(schedule) {
        if (!EzObject.isValid(schedule)) {
            throw new EzBadParamException(
                'schedule',
                EzScheduleDetailsDialog.ezInstance,
                EzScheduleDetailsDialog.ezInstance.ezShow);
        }

        EzScheduleDetailsDialog.ezInstance.ezSchedule = schedule;

        EzScheduleDetailsDialog.ezInstance.ezInitData()
            .then(EzScheduleDetailsDialog.ezInstance.ezRender);
    }

    ezClose() {
        ezApi.ezclocker.ezDialog.ezCloseDialog(EzScheduleDetailsDialog.ezInstance.ezDialogId);
    }

    ezRender() {
        ezApi.ezclocker.ezUi.ezSetContent(
            EzScheduleDetailsDialog.ezInstance.ezIds.containers.locationContainerId,
            EzScheduleDetailsDialog.ezInstance.ezRenderScheduleShiftTime);

        ezApi.ezclocker.ezUi.ezSetContent(
            EzScheduleDetailsDialog.ezInstance.ezIds.containers.locationContainerId,
            EzScheduleDetailsDialog.ezInstance.ezRenderScheduleLocation);

        ezApi.ezclocker.ezUi.ezSetContent(
            EzScheduleDetailsDialog.ezInstance.ezIds.containers.locationContainerId,
            EzScheduleDetailsDialog.ezInstance.ezRenderScheduleNotes);

    }

    get ezRenderScheduleShiftTime() {
        if (!EzObject.isValid(schedule)) {
            throw new EzBadParamException(
                'schedule',
                EzScheduleDetailsDialog.ezInstance,
                EzScheduleDetailsDialog.ezInstance.ezRenderScheduleShiftTime);
        }

        // EzScheduleDetailsDialog.ezInstance.ezIds.containers.shiftTimeContainerId
        return EzPromise.asyncAction(
            (finished) => {
                return finished();
            });
    }

    get ezRenderScheduleLocation() {
        if (!EzObject.isValid(schedule)) {
            throw new EzBadParamException(
                'schedule',
                EzScheduleDetailsDialog.ezInstance,
                EzScheduleDetailsDialog.ezInstance.ezRenderScheduleLocation);
        }

        let locationName = EzObject.isValid(EzScheduleDetailsDialog.ezInstance.ezScheduleLocation)
            ? EzScheduleDetailsDialog.ezInstance.ezScheduleLocation.name
            : 'No assigned location';

        return EzHtml.build`
            <div
                id="${EzScheduleDetailsDialog.ezInstance.ezIds.containers.locationNameContainerId}"
                class="">
                ${locationName}
            </div>
            <div
                id="${EzScheduleDetailsDialog.ezInstance.ezIds.containers.locationDetailsContainerId}"
                class="">
                <div
                    id="${EzScheduleDetailsDialog.ezInstance.ezIds.containers.locationAddressContainerId}"
                    class="">
                </div>
                <div
                    id="${EzScheduleDetailsDialog.ezInstance.ezIds.containers.locationPhoneContainerId}"
                    class="">
                </div>
            </div>
            <div
                id="${EzScheduleDetailsDialog.ezInstance.ezIds.containers.locationMapContainerId}"
                class="">
            </div>`;
    }

    get ezRenderScheduleNotes() {
        if (!EzObject.isValid(schedule)) {
            throw new EzBadParamException(
                'schedule',
                EzScheduleDetailsDialog.ezInstance,
                EzScheduleDetailsDialog.ezInstance.ezRenderScheduleNotes);
        }

    }
}
