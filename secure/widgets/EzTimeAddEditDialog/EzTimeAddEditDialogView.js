import {
    EzBadParamException,
    EzException
} from '/ezlibrary/exceptions/EzExceptions.js';

import {
    EzObject,
    EzBoolean,
    EzString,
    EzArray,
} from '/ezlibrary/helpers/EzHelpers.js';

import {
    EzRegistrationState,
    EzElementEventName,
    EzClockerFeature,
    EzPrimaryAccountType,
    EzTimeEntryType,
    EzValidationResponseStatus,
    EzTimeAddEditDialogMode
} from '/ezlibrary/enums/EzEnumerations.js';

import { EzClass } from '/ezlibrary/EzClass.js';
import { EzDateTime } from '/public/javascript/common/ez-date-time.js';
import { EzEventEngine } from '/ezlibrary/ez-event-engine.js';
import { EzClockerContext } from '/ezlibrary/EzClockerContext/ez-context.js';

import { EzTimeEntry } from '/ezlibrary/entities/EzTimeEntry.js';

import { EzUI } from '/public/javascript/common/ezui.js';
import { EzDialogConfig } from '/ezlibrary/ux/dialogs/EzDialogConfig.js';
import { EzDialog } from '/public/javascript/common/ezclocker-dialog-helper.js';

import { EzTimeAddEditDialogViewConfiguration } from '/secure/widgets/EzTimeAddEditDialog/EzTimeAddEditDialogViewConfiguration.js';

/**
    @class
    @extends {EzClass}
    @description
    ---------------------------------------------------------------------
    Import with:
        import { EzTimeAddEditDialogView } from '/secure/widgets/EzTimeAddEditDialog/EzTimeAddEditDialogView.js'
    ---------------------------------------------------------------------
    Ready check:
        globalThis.ezApi.ezclocker[EzTimeAddEditDialogView.ezApiName] &&
        globalThis.ezApi.ezclocker[EzTimeAddEditDialogView.ezApiName].ready
    ---------------------------------------------------------------------
    Ready event listener:
        document.addEventListener(
            EzTimeAddEditDialogView.ezEventNames.onReady,
            this.#ezRegistrator);
    ---------------------------------------------------------------------
 */
class EzTimeAddEditDialogView extends EzClass {
    /**
        @static
        @public @readonly @property
        Returns the name of this class's singleton instance when registered with ezApi.
        @returns {string}
     */
    static get ezApiName() {
        return 'ezTimeAddEditDialogView';
    }

    /**
        @static
        @public @readonly @property
        Returns an object of event names that this class may trigger.
        @returns {object}
     */
    static get ezEventNames() {
        return {
            onReady: 'ezOn_EzTimeAddEditDialogView_Ready',
            onSubmitAdd: 'ezOn_EzTimeAddEditDialogView_SubmitAdd',
            onSubmitUpdate: 'ezOn_EzTimeAddEditDialogView_SubmitUpdate',
            onClose: 'ezOn_EzTimeAddEditDialogView_Close',
            onCancel: 'ezOn_EzTimeAddEditDialogView_Cancel',
            onShow: 'ezOn_EzTimeAddEditDialogView_Show'
        };
    }

    /**
        @static
        @private @field
        Stores the singleton instance of this class that was created by and registerd with EzApi.
        @type {EzTimeAddEditDialogView}
     */
    static #ezInstance = EzObject.hasProperty(globalThis, 'ezApi') &&
        EzObject.isValid(globalThis.ezApi) && EzBoolean.isTrue(globalThis.ezApi.ready) &&
        EzObject.isValid(globalThis.ezApi.ezclocker[EzTimeAddEditDialogView.ezApiName])
        ? globalThis.ezApi.ezclocker[EzTimeAddEditDialogView.ezApiName]
        : null;

    /**
        @static
        @public @property @getter
        Returns the singleton instance of this class that is registered with EzApi (if available yet)
        @returns {EzTimeAddEditDialogView}
     */
    static get ezInstance() {
        return EzTimeAddEditDialogView.#ezInstance;
    }

    /**
        @static
        @public @property @setter
        Sets the singleton instance of of this class that is registered with EzApi.
        @param {EzTimeAddEditDialogView} ezTimeAddEditDialogView
     */
    static set ezInstance(ezTimeAddEditDialogView) {
        if (null != EzTimeAddEditDialogView.#ezInstance) {
            throw new Error('EzTimeAddEditDialogView\'s singleton instance is already reigstered with EzApi.');
        }

        EzTimeAddEditDialogView.#ezInstance = ezTimeAddEditDialogView;
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
        EzObject.isValid(globalThis.ezApi.ezclocker[EzTimeAddEditDialogView.ezApiName])
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
        return EzTimeAddEditDialogView.#ezApiRegistrationState;
    }

    /**
        @static
        @public @property @setter
        Sets the ezApi registration state of this classes's singleton instance.
        @param {string} ezApiRegistrationState
        A valid enum property value from EzRegistrationState
     */
    static set ezApiRegistrationState(ezApiRegistrationState) {
        EzTimeAddEditDialogView.#ezApiRegistrationState = EzRegistrationState.ezValueOf(ezApiRegistrationState);
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
        return EzRegistrationState.PENDING === EzTimeAddEditDialogView.ezApiRegistrationState &&
            EzObject.hasProperty(globalThis, 'ezApi') &&
            EzObject.isValid(globalThis.ezApi) && EzBoolean.isTrue(globalThis.ezApi.ready) &&

            globalThis.ezApi.ezclocker[EzDateTime.ezApiName] &&
            globalThis.ezApi.ezclocker[EzDateTime.ezApiName].ready &&

            globalThis.ezApi.ezclocker[EzEventEngine.ezApiName] &&
            globalThis.ezApi.ezclocker[EzEventEngine.ezApiName].ready &&

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
        return null != EzTimeAddEditDialogView.ezInstance &&
            EzRegistrationState.REGISTERED === EzTimeAddEditDialogView.ezApiRegistrationState;
    }

    /**
        @static
        @private @method
        Attempts to register the singleton instance for this class with ezApi. Returns true
        if successful, false otherwise.
        @returns {boolean}
     */
    static #ezRegistrator() {
        if (EzTimeAddEditDialogView.#ezCanRegister && !EzTimeAddEditDialogView.#ezIsRegistered) {
            globalThis.ezApi.ezRegisterNewApi(EzTimeAddEditDialogView, EzTimeAddEditDialogView.ezApiName);
        }

        return EzTimeAddEditDialogView.#ezIsRegistered;
    }

    /**
        @static
        Static Initialization
        ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        >> IMPORTANT <<
        ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        Make sure the following properties and methods get defined BEFORE this static initialization section:
            1) Property getter EzTimeAddEditDialogView.ezApiName
            2) Property getter EzTimeAddEditDialogView.ezEventNames
            3) Property getter EzTimeAddEditDialogView.ezInstance
            4) Property setter EzTimeAddEditDialogView.ezInstance
            5) Property getter EzTimeAddEditDialogView.ezApiRegistrationState
            6) Property setter EzTimeAddEditDialogView.ezApiRegistrationState
            7) Property getter EzTimeAddEditDialogView.#ezCanRegister
            8) Property getter EzTimeAddEditDialogView.#ezIsRegistered
            9) Method EzTimeAddEditDialogView.#ezRegistrator()
     */
    static {
        if (!EzTimeAddEditDialogView.#ezIsRegistered) {
            EzTimeAddEditDialogView.ezApiRegistrationState = EzRegistrationState.PENDING;

            if (!EzTimeAddEditDialogView.#ezRegistrator()) {
                document.addEventListener(
                    EzTimeAddEditDialogView.ezOnEzApiReadyEventName,
                    () => {
                        if (!EzTimeAddEditDialogView.#ezRegistrator()) {
                            document.addEventListener(
                                EzDateTime.ezEventNames.onReady,
                                EzTimeAddEditDialogView.#ezRegistrator);

                            document.addEventListener(
                                EzEventEngine.ezEventNames.onReady,
                                EzTimeAddEditDialogView.#ezRegistrator);

                            document.addEventListener(
                                EzClockerContext.ezEventNames.onReady,
                                EzTimeAddEditDialogView.#ezRegistrator);

                            document.addEventListener(
                                EzUI.ezEventNames.onReady,
                                EzTimeAddEditDialogView.#ezRegistrator);

                            document.addEventListener(
                                EzDialog.ezEventNames.onReady,
                                EzTimeAddEditDialogView.#ezRegistrator);
                        }
                    });
            }
        }
    }

    /**
        @public @constructor
     */
    constructor() {
        super();

        this.#ezIds.containers = {
            ezTypeSelectionContainerId: `${this.#ezIds.ezTypeSelectionIdPrefix}_Container`,

            ezTimeDataContainerId: `${this.#ezIds.ezDialogId}_StartEndDateTimeContainer`,

            ezStartDateTimeInputContainerId: `${this.#ezIds.ezStartDateTimeIdPrefix}_InputContainer`,
            ezStartDateTimeInputTableId: `${this.#ezIds.ezStartDateTimeIdPrefix}_InputTableId`,

            ezEndDateTimeInputContainerId: `${this.#ezIds.ezEndDateTimeIdPrefix}_ClockOutInputContainer`,
            ezEndDateTimeInputTableId: `${this.#ezIds.ezEndDateTimeIdPrefix}_ClockOutEditorTableId`,
            ezEndDateTimeInputDisabledContainerId: `${this.#ezIds.ezEndDateTimeIdPrefix}_DisabledContainer`,

            ezAdditionalDataContainerId: `${this.ezIds.ezDialogId}_AdditionalDataContainer}`,

            ezJobSelectionContainerId: `${this.#ezIds.ezJobSelectionIdPrefix}_JobSelectionContainer`,

            ezModificationReasonContainerId: `${this.#ezIds.ezNotesIdPrefix}_ModificationReasonContainer`,

            ezValidationErrorContainer: `${this.#ezIds.ezDialogId}_ValidationErrorContainer`,
        };

        this.#ezIds.inputs = {
            ezTimeEntryTimeTypeRadioBoxId: `${this.#ezIds.ezTypeSelectionIdPrefix}_TimeEntryTimeTypeRadioBox`,
            ezBreakTimeTypeRadioBoxId: `${this.#ezIds.ezTypeSelectionIdPrefix}_BreakTimeTypeRadioBox`,

            ezStartDatePickerId: `${this.#ezIds.ezStartDateTimeIdPrefix}_DatePicker`,
            ezStartTimePickerId: `${this.#ezIds.ezStartDateTimeIdPrefix}_TimePicker`,

            ezEndDatePickerId: `${this.#ezIds.ezEndDateTimeIdPrefix}_DateEditor`,
            ezEndTimePickerId: `${this.#ezIds.ezEndDateTimeIdPrefix}_TimeEditor`,

            ezJobSelectInputId: `${this.ezIds.ezJobSelectionIdPrefix}_SelectInput`,

            ezModificationReasonInputId: `${this.#ezIds.ezNotesIdPrefix}_Input`
        };

        this.#ezIds.buttons = {
            ezAddTimeButtonId: ezApi.ezclocker.ezUi.ezBuildChildElementId(
                this.#ezIds.ezDialogId,
                'AddTimeEntryButton'),
            ezUpdateTimeButtonId:
                ezApi.ezclocker.ezUi.ezBuildChildElementId(
                    this.#ezIds.ezDialogId,
                    'UpdateTimeEntryButton')
        };
    }

    /**
        @private @field
        @type {object}
     */
    #ezIds = {
        ezParentContainerId: 'EzInjectedDialogsContainer',
        ezDialogId: 'EzTimeAddEditDialog',
        ezStartDateTimeHeaderId: 'EzTimeAddEditDialog_StartDateTimeHeader',
        ezEndDateTimeHeaderId: 'EzTimeAddEditDialog_EndDateTimeTimeHeader',
        ezModificationRequiredInfoContainer: 'EzTimeAddEditDialog_ModificationReasonRequiredInfoContainer',
        ezTypeSelectionIdPrefix: 'EzTimeAddEditDialog_TypeSelection',
        ezStartDateTimeIdPrefix: 'EzTimeAddEditDialog_ClockIn',
        ezEndDateTimeIdPrefix: 'EzTimeAddEditDialog_ClockOut',
        ezJobSelectionIdPrefix: 'EzTimeAddEditDialog_JobSelection',
        ezNotesIdPrefix: 'EzTimeAddEditDialog_Notes'
    };

    /**
        @private @field
        @type {string}
     */
    #ezTimeAddEditDialogMode = EzTimeAddEditDialogMode.ADD_TIME_ENTRY;

    /**
        @public @field
        @type {EzTimeAddEditDialogViewConfiguration}
     */
    #ezTimeAddEditDialogViewConfiguration = new EzTimeAddEditDialogViewConfiguration();

    /**
        @public @property @getter
        Returns the dialog's current mode.
        @returns {string}
        A valid enum property value from EzTimeAddEditDialogMode
     */
    get ezTimeAddEditDialogMode() {
        return this.#ezTimeAddEditDialogMode;
    }

    /**
        @public @property @setter
        Sets the time entry dialog's mode
        @param {string} ezTimeAddEditDialogMode
        A valid enum property value from EzTimeAddEditDialogMode
     */
    set ezTimeAddEditDialogMode(ezTimeAddEditDialogMode) {
        this.#ezTimeAddEditDialogMode = EzTimeAddEditDialogMode.ezFromValue(ezTimeAddEditDialogMode);
    }

    /**
        @public @property @getter
        Returns the configuration for the dialog view
        @returns {EzTimeAddEditDialogViewConfiguration}
     */
    get ezTimeAddEditDialogViewConfiguration() {
        return this.#ezTimeAddEditDialogViewConfiguration;
    }

    /**
        @public @property @getter
        Sets the configuration for the dialog view
        @param {EzTimeAddEditDialogViewConfiguration} aEzTimeAddEditDialogViewConfiguration
     */
    set ezTimeAddEditDialogViewConfiguration(aEzTimeAddEditDialogViewConfiguration) {
        if (!EzObject.isValid(aEzTimeAddEditDialogViewConfiguration)) {
            throw new EzBadParamException(
                'aEzTimeAddEditDialogViewConfiguration',
                this,
                'ezTimeAddEditDialogViewConfiguration(aEzTimeAddEditDialogViewConfiguration)');
        }

        this.#ezTimeAddEditDialogViewConfiguration = aEzTimeAddEditDialogViewConfiguration;
    }

    /**
        @public @readonly @property
        @returns {object}
     */
    get ezIds() {
        return this.#ezIds;
    }

    /**
        @public @readonly @property
        @returns {string}
     */
    get ezDialogId() {
        return this.ezIds.ezDialogId;
    }

    /**
        @public @method
        Shows the dialog
     */
    ezShow() {
        ezApi.ezclocker.ezUi.ezShowDialog(EzTimeAddEditDialogView.ezInstance.ezDialogId);
        EzTimeAddEditDialogView.ezInstance.ezTriggerOnShowEvent();
    }

    /**
        @public @method
        Cancels the dialog, ignoring any changes
     */
    ezCancel() {
        EzTimeAddEditDialogView.ezInstance.ezTriggerOnCancelEvent();
        return EzTimeAddEditDialogView.ezInstance.ezClose();
    }

    /**
        @public @method
        Closes the dialog
     */
    ezClose() {
        return EzTimeAddEditDialogView.ezInstance.ezResetDialog()
            .then(
                () => {
                    ezApi.ezclocker.ezUi.ezCloseDialog(EzTimeAddEditDialogView.ezInstance.ezDialogId);
                    EzTimeAddEditDialogView.ezInstance.ezTriggerOnCloseEvent();
                });
    }

    /**
        @public @method
        Submits the dialog based upon its current ezTimeAddEditDialogMode value.
     */
    ezSubmit() {
        switch (EzTimeAddEditDialogView.ezInstance.ezTimeAddEditDialogMode) {
            case EzTimeAddEditDialogMode.UPDATE_TIME_ENTRY:
            case EzTimeAddEditDialogMode.UPDATE_ACTIVE_TIME_ENTRY:
            case EzTimeAddEditDialogMode.UPDATE_BREAK:
            case EzTimeAddEditDialogMode.UPDATE_ACTIVE_BREAK:
                if (EzTimeAddEditDialogView.ezInstance.ezSubmitUpdate()) {
                    EzTimeAddEditDialogView.ezInstance.ezClose();
                }
                break;
            case EzTimeAddEditDialogMode.ADD_TIME_ENTRY:
                ezApi.ezclocker.ezAnalyticsAndMetrics.ezAmplitudeIntegration.ezTrack('Add time entry');

                if (EzTimeAddEditDialogView.ezInstance.ezSubmitAdd()) {
                    EzTimeAddEditDialogView.ezInstance.ezClose();
                }
                break;
            case EzTimeAddEditDialogMode.ADD_BREAK:
            default:
                ezApi.ezclocker.ezAnalyticsAndMetrics.ezAmplitudeIntegration.ezTrack('Add break');

                if (EzTimeAddEditDialogView.ezInstance.ezSubmitAdd()) {
                    EzTimeAddEditDialogView.ezInstance.ezClose();
                }
        }
    }

    /**
        @protected @method
        Initializes the EzTimeAddEditDialogView class
        @returns {EzTimeAddEditDialogView}
     */
    ezInit() {
        ezApi.ezclocker.ezEventEngine.ezRegisterEvent(
            EzTimeAddEditDialogView.ezApiName,
            EzTimeAddEditDialogView.ezEventNames.onSubmitAdd);

        ezApi.ezclocker.ezEventEngine.ezRegisterEvent(
            EzTimeAddEditDialogView.ezApiName,
            EzTimeAddEditDialogView.ezEventNames.onSubmitUpdate);

        ezApi.ezclocker.ezEventEngine.ezRegisterEvent(
            EzTimeAddEditDialogView.ezApiName,
            EzTimeAddEditDialogView.ezEventNames.onClose);

        ezApi.ezclocker.ezEventEngine.ezRegisterEvent(
            EzTimeAddEditDialogView.ezApiName,
            EzTimeAddEditDialogView.ezEventNames.onCancel);

        ezApi.ezclocker.ezEventEngine.ezRegisterEvent(
            EzTimeAddEditDialogView.ezApiName,
            EzTimeAddEditDialogView.ezEventNames.onShow);

        EzTimeAddEditDialogView.ezInstance.ezInitUX();

        return EzTimeAddEditDialogView.ezInstance;
    }

    /**
        @protected @method
        Initializes the EzTimeAddEditDialogView's UX
     */
    ezInitUX() {
        EzTimeAddEditDialogView.ezInstance.ezInjectDialogHtml();

        let dialogConfig = new EzDialogConfig(EzTimeAddEditDialogView.ezInstance.ezDialogId);
        dialogConfig.width = 650;
        dialogConfig.buttons = [
            {
                text: 'Add',
                id: EzTimeAddEditDialogView.ezInstance.ezIds.buttons.ezAddTimeButtonId,
                click: EzTimeAddEditDialogView.ezInstance.ezSubmit
            },
            {
                text: 'Update',
                id: EzTimeAddEditDialogView.ezInstance.ezIds.buttons.ezUpdateTimeButtonId,
                click: EzTimeAddEditDialogView.ezInstance.ezSubmit
            },
            {
                text: 'Cancel',
                click: EzTimeAddEditDialogView.ezInstance.ezClose
            }
        ];
        dialogConfig.overflow = 'none';
        dialogConfig.close = EzTimeAddEditDialogView.ezInstance.ezClose;

        ezApi.ezclocker.ezDialog.ezInitDialogWithConfig(
            EzTimeAddEditDialogView.ezInstance.ezDialogId,
            dialogConfig);

        // Initialize the clock in date picker
        let initialClockInMoment = ezApi.ezclocker.ezDateTime
            .ezNowWithStartOfDay()
            .hours(9)
            .minutes(0)
            .seconds(0)
            .milliseconds(0);

        ezApi.ezclocker.ezDateTime.ezInitDatePicker(
            EzTimeAddEditDialogView.ezInstance.ezIds.inputs.ezStartDatePickerId,
            {
                onClose: EzTimeAddEditDialogView.ezInstance.ezValidateClockInDate
            },
            {
                showButtonPanel: true,
                buttonText: 'Select date...',
                constrainInput: true,
                showOn: 'button',
            },
            initialClockInMoment);

        // Initialize the clock in time picker
        ezApi.ezclocker.ezDateTime.ezInitTimePicker(
            EzTimeAddEditDialogView.ezInstance.ezIds.inputs.ezStartTimePickerId,
            initialClockInMoment,
            {
                timeFormat: 'hh:mm tt',
                showPeriod: true,
                showLeadingZero: true,
                showButtonPanel: true
            });

        // Initialize the clock out date picker
        let initialClockOutMoment = ezApi.ezclocker.ezDateTime
            .ezNowWithStartOfDay()
            .hours(17)
            .minutes(0)
            .seconds(0)
            .milliseconds(0);

        ezApi.ezclocker.ezDateTime.ezInitDatePicker(
            EzTimeAddEditDialogView.ezInstance.ezIds.inputs.ezEndDatePickerId,
            null,
            {
                showButtonPanel: true,
                buttonText: 'Select date...',
                constrainInput: true,
                showOn: 'button',
            },
            initialClockOutMoment);

        // Initialize the clock out time picker
        ezApi.ezclocker.ezDateTime.ezInitTimePicker(
            EzTimeAddEditDialogView.ezInstance.ezIds.inputs.ezEndTimePickerId,
            initialClockOutMoment,
            {
                timeFormat: 'hh:mm tt',
                showPeriod: true,
                showLeadingZero: true
            });

        ezApi.ezclocker.ezEventEngine.ezWantElementEvent(
            EzTimeAddEditDialogView.ezInstance.ezIds.inputs.ezTimeEntryTimeTypeRadioBoxId,
            EzElementEventName.CHANGE,
            EzTimeAddEditDialogView.ezApiName,
            EzTimeAddEditDialogView.ezInstance.ezHandleTimeEntryTimeTypeRadioBoxChangeEvent);

        ezApi.ezclocker.ezEventEngine.ezWantElementEvent(
            EzTimeAddEditDialogView.ezInstance.ezIds.inputs.ezBreakTimeTypeRadioBoxId,
            EzElementEventName.CHANGE,
            EzTimeAddEditDialogView.ezApiName,
            EzTimeAddEditDialogView.ezInstance.ezHandleBreakTimeTypeRadioBoxChangeEvent);
    }

    /**
        @protected @method
        Resets the dialog's inputs to their initial values.
        @returns {Promise.resolve}
     */
    ezResetDialog() {
        return ezApi.ezAsyncAction(
            (finished) => {
                EzTimeAddEditDialogView.ezInstance.ezResetValidationErrors();

                // Reset the configuration to default
                EzTimeAddEditDialogView.ezInstance.ezTimeAddEditDialogViewConfiguration = new EzTimeAddEditDialogViewConfiguration();

                // Reset the mode to ADD_TIME_ENTRY
                EzTimeAddEditDialogView.ezInstance.ezTimeAddEditDialogMode = EzTimeAddEditDialogMode.ADD_TIME_ENTRY;

                // Check the break type radio
                ezApi.ezclocker.ezUi.ezSetRadioBoxValue(
                    EzTimeAddEditDialogView.ezInstance.ezIds.inputs.ezBreakTimeTypeRadioBoxId,
                    false);

                // Check the time entry type radio
                ezApi.ezclocker.ezUi.ezSetRadioBoxValue(
                    EzTimeAddEditDialogView.ezInstance.ezIds.inputs.ezTimeEntryTimeTypeRadioBoxId,
                    true);

                // Reset job selection to "None (no job assigned)"
                EzTimeAddEditDialogView.ezInstance.ezBuildJobCodeSelectOptions();

                // Reset notes to blank
                ezApi.ezclocker.ezUi.ezSetInputValue(
                    EzTimeAddEditDialogView.ezInstance.ezIds.inputs.ezModificationReasonInputId,
                    '');

                // Initialize the clock in date picker
                let initialClockInMoment = ezApi.ezclocker.ezDateTime
                    .ezNowWithStartOfDay()
                    .hours(9)
                    .minutes(0)
                    .seconds(0)
                    .milliseconds(0);

                // Initialize the clock out date picker
                let initialClockOutMoment = ezApi.ezclocker.ezDateTime
                    .ezNowWithStartOfDay()
                    .hours(17)
                    .minutes(0)
                    .seconds(0)
                    .milliseconds(0);

                ezApi.ezclocker.ezDateTime.ezSetDatePickerValue(
                    EzTimeAddEditDialogView.ezInstance.ezIds.inputs.ezStartDatePickerId,
                    initialClockInMoment);

                ezApi.ezclocker.ezDateTime.ezSetTimePickerValue(
                    EzTimeAddEditDialogView.ezInstance.ezIds.inputs.ezStartTimePickerId,
                    initialClockInMoment);

                ezApi.ezclocker.ezDateTime.ezSetDatePickerValue(
                    EzTimeAddEditDialogView.ezInstance.ezIds.inputs.ezEndDatePickerId,
                    initialClockOutMoment);

                ezApi.ezclocker.ezDateTime.ezSetTimePickerValue(
                    EzTimeAddEditDialogView.ezInstance.ezIds.inputs.ezEndTimePickerId,
                    initialClockOutMoment);

                return finished();
            });
    }


    /**
        @protected @method
        Validates the dialog data
        If the data is valid, then the onSubmitUpdate event is triggered.
        @returns {boolean}
        Returns true if the dialog data is valid and the onSubmitUpdate event is triggered.
     */
    ezSubmitUpdate() {
        if (!EzTimeAddEditDialogView.ezInstance.ezValidate()) {
            return false;
        }

        EzTimeAddEditDialogView.ezInstance.ezTriggerOnSubmitUpdateEvent();
        return true;
    }

    /**
        @protected @method
        Validates the dialog data
        If the data is valid, then the onSubmitAdd event is triggered.
        @returns {boolean}
        Returns true if the dialog data is valid and the onSubmitAdd event is triggered.
     */
    ezSubmitAdd() {
        if (!EzTimeAddEditDialogView.ezInstance.ezValidate()) {
            return false;
        }

        EzTimeAddEditDialogView.ezInstance.ezTriggerOnSubmitAddEvent();
        return true;
    }

    /**
        @protected @method
        Handles the time entry time type radio box's onChange event.
     */
    ezHandleTimeEntryTimeTypeRadioBoxChangeEvent() {
        if (EzTimeAddEditDialogMode.ADD_TIME_ENTRY === EzTimeAddEditDialogView.ezInstance.ezTimeAddEditDialogMode ||
            !ezApi.ezclocker.ezUi.ezIsElementEnabled(
                EzTimeAddEditDialogView.ezInstance.ezIds.inputs.ezTimeEntryTimeTypeRadioBoxId) ||
            !ezApi.ezclocker.ezUi.ezIsRadioBoxChecked(
                EzTimeAddEditDialogView.ezInstance.ezIds.inputs.ezTimeEntryTimeTypeRadioBoxId)) {
            // Do not change anything
            return;
        }

        EzTimeAddEditDialogView.ezInstance.ezSwitchDialogMode(EzTimeAddEditDialogMode.ADD_TIME_ENTRY);
    }

    /**
        @protected @method
        Handles the break time type radio box's onChange event.
     */
    ezHandleBreakTimeTypeRadioBoxChangeEvent() {
        if (EzTimeAddEditDialogMode.ADD_BREAK === EzTimeAddEditDialogView.ezInstance.ezTimeAddEditDialogMode ||
            !ezApi.ezclocker.ezUi.ezIsElementEnabled(
                EzTimeAddEditDialogView.ezInstance.ezIds.inputs.ezBreakTimeTypeRadioBoxId) ||
            !ezApi.ezclocker.ezUi.ezIsRadioBoxChecked(
                EzTimeAddEditDialogView.ezInstance.ezIds.inputs.ezBreakTimeTypeRadioBoxId)) {
            // Do not change anything
            return;
        }

        EzTimeAddEditDialogView.ezInstance.ezSwitchDialogMode(EzTimeAddEditDialogMode.ADD_BREAK);
    }

    /**
        @protected @method
        Switches the dialog's mode (for supported modes)
        Can switch between mode: EzTimeAddEditDialogMode.ADD_TIME_ENTRY and EzTimeAddEditDialogMode.ADD_BREAK
        @param {string} ezTimeAddEditDialogMode
        A valid enum property value from EzTimeAddEditDialogMode.
     */
    ezSwitchDialogMode(ezTimeAddEditDialogMode) {
        ezTimeAddEditDialogMode = EzTimeAddEditDialogMode.ezFromValue(ezTimeAddEditDialogMode);

        // Save any changes before switching
        let clockInMoment = ezApi.ezclocker.ezDateTime.ezAppendTimeFromTimePicker(
            EzTimeAddEditDialogView.ezInstance.ezIds.inputs.ezStartTimePickerId,
            ezApi.ezclocker.ezDateTime.ezMomentFromDatePickerStartOfDay(
                EzTimeAddEditDialogView.ezInstance.ezIds.inputs.ezStartDatePickerId));

        let clockOutMoment = ezApi.ezclocker.ezDateTime.ezAppendTimeFromTimePicker(
            EzTimeAddEditDialogView.ezInstance.ezIds.inputs.ezEndTimePickerId,
            ezApi.ezclocker.ezDateTime.ezMomentFromDatePickerStartOfDay(
                EzTimeAddEditDialogView.ezInstance.ezIds.inputs.ezEndDatePickerId));

        let notes = ezApi.ezclocker.ezUi.ezGetInputValue(
            EzTimeAddEditDialogView.ezInstance.ezIds.inputs.ezModificationReasonInputId);

        let addingTimeEntry = EzTimeAddEditDialogView.ezInstance.ezTimeAddEditDialogViewConfiguration.ezTimeEntry;

        if (!EzObject.isValid(addingTimeEntry)) {
            addingTimeEntry = new EzTimeEntry();
            EzTimeAddEditDialogView.ezInstance.ezTimeAddEditDialogViewConfiguration.ezAddingTimeEntry = addingTimeEntry;
        }

        addingTimeEntry.employerId = ezApi.ezclocker.ezClockerContext.ezGetActiveEmployer().id;

        addingTimeEntry.employeeId = ezApi.ezclocker.ezClockerContext.ezGetActiveEmployee().id;

        addingTimeEntry.clockInIso = ezApi.ezclocker.ezDateTime.ezToIso(clockInMoment);

        addingTimeEntry.clockOutIso = ezApi.ezclocker.ezDateTime.ezToIso(clockOutMoment);

        addingTimeEntry.notes = EzString.encodeHtml(notes);

        addingTimeEntry.primaryJobCodeId = ezApi.ezclocker.ezUi.ezGetInputValue(
            EzTimeAddEditDialogView.ezInstance.ezIds.inputs.ezJobSelectInputId);

        switch (ezTimeAddEditDialogMode) {
            case EzTimeAddEditDialogMode.ADD_TIME_ENTRY:
                // Switch to EzTimeAddEditDialogMode.ADD_TIME_ENTRY mode
                EzTimeAddEditDialogView.ezInstance.ezTimeAddEditDialogMode = EzTimeAddEditDialogMode.ADD_TIME_ENTRY;

                EzTimeAddEditDialogView.ezInstance.ezShow(
                    EzTimeAddEditDialogView.ezInstance.ezTimeAddEditDialogViewConfiguration,
                    EzTimeAddEditDialogView.ezInstance.ezTimeAddEditDialogMode);

                break;
            case EzTimeAddEditDialogMode.ADD_BREAK:
                // Switch to EzTimeAddEditDialogMode.ADD_BREAK mode
                EzTimeAddEditDialogView.ezInstance.ezTimeAddEditDialogMode = EzTimeAddEditDialogMode.ADD_BREAK;

                EzTimeAddEditDialogView.ezInstance.ezConfigureDialog(
                    EzTimeAddEditDialogView.ezInstance.ezTimeAddEditDialogViewConfiguration,
                    EzTimeAddEditDialogView.ezInstance.ezTimeAddEditDialogMode);

                break;
            default:
                throw new EzException(
                    ezApi.ezEM`
                        The EzTimeEditDialog does not support switching to mode ${ezTimeAddEditDialogMode}`);
        }
    }

    /**
        @protected @method
        Injects the EzTimeAddEditDialogView's UX into the HTML body under the ezParentContainerId
     */
    ezInjectDialogHtml() {
        ezApi.ezclocker.ezUi.ezAppendContent(
            'body',
            ezApi.ezElementExists(EzTimeAddEditDialogView.ezInstance.ezIds.ezParentContainerId)
                ? EzTimeAddEditDialogView.ezInstance.ezBuildDialogHtml()
                : ezApi.ezTemplate`
                    <div
                        id="${EzTimeAddEditDialogView.ezInstance.ezIds.ezParentContainerId}"
                        class="ezHiddenByDefault">
                        ${EzTimeAddEditDialogView.ezInstance.ezBuildDialogHtml()}
                    </div>`);
    }

    /**
        @protected @method
        Triggers the onShow event
     */
    ezTriggerOnShowEvent() {
        ezApi.ezclocker.ezEventEngine.ezTriggerEvent(
            EzTimeAddEditDialogView.ezEventNames.onShow,
            EzTimeAddEditDialogView.ezInstance);
    }

    /**
        @protected @method
        Triggers the onCancel event
     */
    ezTriggerOnCancelEvent() {
        ezApi.ezclocker.ezEventEngine.ezTriggerEvent(
            EzTimeAddEditDialogView.ezEventNames.onCancel,
            EzTimeAddEditDialogView.ezInstance);
    }

    /**
        @protected @method
        Triggers the onClose event
     */
    ezTriggerOnCloseEvent() {
        ezApi.ezclocker.ezEventEngine.ezTriggerEvent(
            EzTimeAddEditDialogView.ezEventNames.onClose,
            EzTimeAddEditDialogView.ezInstance);
    }

    /**
        @protected @method
        Triggers the onSubmitAdd event
     */
    ezTriggerOnSubmitAddEvent() {
        ezApi.ezclocker.ezEventEngine.ezTriggerEvent(
            EzTimeAddEditDialogView.ezEventNames.onSubmitAdd,
            ezApi.ezclocker.ezEventEngine.ezBuildEventData(
                EzTimeAddEditDialogView.ezApiName,
                'Add Time Data',
                {
                    timeEntry: EzTimeAddEditDialogView.ezInstance.ezTimeAddEditDialogViewConfiguration.ezTimeEntry,
                    clockInMoment: ezApi.ezclocker.ezDateTime.ezAppendTimeFromTimePicker(
                        EzTimeAddEditDialogView.ezInstance.ezIds.inputs.ezStartTimePickerId,
                        ezApi.ezclocker.ezDateTime.ezMomentFromDatePickerStartOfDay(
                            EzTimeAddEditDialogView.ezInstance.ezIds.inputs.ezStartDatePickerId)),
                    clockOutMoment: ezApi.ezclocker.ezDateTime.ezAppendTimeFromTimePicker(
                        EzTimeAddEditDialogView.ezInstance.ezIds.inputs.ezEndTimePickerId,
                        ezApi.ezclocker.ezDateTime.ezMomentFromDatePickerStartOfDay(
                            EzTimeAddEditDialogView.ezInstance.ezIds.inputs.ezEndDatePickerId)),
                    notes: ezApi.ezclocker.ezUi.ezGetInputValue(
                        EzTimeAddEditDialogView.ezInstance.ezIds.inputs.ezModificationReasonInputId),
                    ezTimeAddEditDialogMode: EzTimeAddEditDialogView.ezInstance.ezTimeAddEditDialogMode
                }));
    }

    /**
        @protected @method
        Triggers the onSubmitUpdate event
     */
    ezTriggerOnSubmitUpdateEvent() {
        ezApi.ezclocker.ezEventEngine.ezTriggerEvent(
            EzTimeAddEditDialogView.ezEventNames.onSubmitUpdate,
            ezApi.ezclocker.ezEventEngine.ezBuildEventData(
                EzTimeAddEditDialogView.ezApiName,
                'Update Time Data',
                {
                    clockInMoment: ezApi.ezclocker.ezDateTime.ezAppendTimeFromTimePicker(
                        EzTimeAddEditDialogView.ezInstance.ezIds.inputs.ezStartTimePickerId,
                        ezApi.ezclocker.ezDateTime.ezMomentFromDatePickerStartOfDay(
                            EzTimeAddEditDialogView.ezInstance.ezIds.inputs.ezStartDatePickerId)),
                    clockOutMoment: ezApi.ezclocker.ezDateTime.ezAppendTimeFromTimePicker(
                        EzTimeAddEditDialogView.ezInstance.ezIds.inputs.ezEndTimePickerId,
                        ezApi.ezclocker.ezDateTime.ezMomentFromDatePickerStartOfDay(
                            EzTimeAddEditDialogView.ezInstance.ezIds.inputs.ezEndDatePickerId)),
                    notes: ezApi.ezclocker.ezUi.ezGetInputValue(
                        EzTimeAddEditDialogView.ezInstance.ezIds.inputs.ezModificationReasonInputId),
                    ezTimeAddEditDialogMode: EzTimeAddEditDialogView.ezInstance.ezTimeAddEditDialogMode
                }));
    }

    /**
        @public @method
        Sets and updates the dialog's configuration and mode
        @param {EzTimeAddEditDialogViewConfiguration} ezTimeAddEditDialogViewConfiguration
        @param {EzTimeAddEditDialogMode} ezTimeAddEditDialogMode
        @returns {Promise.resolve}
     */
    ezConfigureDialog(ezTimeAddEditDialogViewConfiguration, ezTimeAddEditDialogMode) {
        if (!EzObject.isValid(ezTimeAddEditDialogViewConfiguration)) {
            throw new EzBadParamException(
                'ezTimeAddEditDialogViewConfiguration',
                EzTimeAddEditDialogView.ezInstance,
                EzTimeAddEditDialogView.ezInstance.ezApplyDialogMode);
        }
        if (!EzString.stringHasLength(ezTimeAddEditDialogMode)) {
            throw new EzBadParamException(
                'ezTimeAddEditDialogMode',
                EzTimeAddEditDialogView.ezInstance,
                EzTimeAddEditDialogView.ezInstance.ezApplyDialogMode);
        }

        return ezApi.ezAsyncAction(
            (finished) => EzTimeAddEditDialogView.ezInstance.ezResetDialog()
                // Configure the view for the EzTimeAddEditDialogMode
                .then(
                    () => {
                        EzTimeAddEditDialogView.ezInstance.ezTimeAddEditDialogViewConfiguration = ezTimeAddEditDialogViewConfiguration;

                        return EzTimeAddEditDialogView.ezInstance.ezConfigureViewForTimeEntryDialogMode(
                            ezTimeAddEditDialogMode)
                            // Initialize the start date time section
                            .then(EzTimeAddEditDialogView.ezInstance.ezConfigureStartDateTimeSection)
                            // Initialize the end date time section
                            .then(EzTimeAddEditDialogView.ezInstance.ezConfigureEndDateTimeSection)
                            // Configure the job selection section
                            .then(EzTimeAddEditDialogView.ezInstance.ezConfigureJobSelectionSection)
                            // Configure the modification reason section
                            .then(EzTimeAddEditDialogView.ezInstance.ezConfigureModificationReasonSection)
                            // Configuration is complete
                            .then(finished);
                    }));
    }

    /**
        @protected @method
        Configure the dialog's UX based on the EzTimeAddEditDialogMode
        @param {EzTimeAddEditDialogMode} ezTimeAddEditDialogMode
     */
    ezConfigureViewForTimeEntryDialogMode(ezTimeAddEditDialogMode) {
        if (!EzString.stringHasLength(ezTimeAddEditDialogMode)) {
            throw new EzBadParamException(
                'ezTimeAddEditDialogMode',
                EzTimeAddEditDialogView.ezInstance,
                EzTimeAddEditDialogView.ezConfigureViewForTimeEntryDialogMode);
        }

        return ezApi.ezAsyncAction(
            (finished) => {
                EzTimeAddEditDialogView.ezInstance.ezTimeAddEditDialogMode = ezTimeAddEditDialogMode;

                switch (EzTimeAddEditDialogView.ezInstance.ezTimeAddEditDialogMode) {
                    case EzTimeAddEditDialogMode.ADD_TIME_ENTRY:
                        return EzTimeAddEditDialogView.ezInstance.ezConfigureAddTimeEntryMode()
                            .then(finished);
                    case EzTimeAddEditDialogMode.UPDATE_TIME_ENTRY:
                        return EzTimeAddEditDialogView.ezInstance.ezConfigureUpdateTimeEntryMode()
                            .then(finished);
                    case EzTimeAddEditDialogMode.UPDATE_ACTIVE_TIME_ENTRY:
                        return EzTimeAddEditDialogView.ezInstance.ezConfigureUpdateActiveTimeEntryMode()
                            .then(finished);
                    case EzTimeAddEditDialogMode.ADD_BREAK:
                        return EzTimeAddEditDialogView.ezInstance.ezConfigureAddBreakMode()
                            .then(finished);
                    case EzTimeAddEditDialogMode.UPDATE_BREAK:
                        return EzTimeAddEditDialogView.ezInstance.ezConfigureUpdateBreakMode()
                            .then(finished);
                    case EzTimeAddEditDialogMode.UPDATE_ACTIVE_BREAK:
                        return EzTimeAddEditDialogView.ezInstance.ezConfigureUpdateActiveBreakMode()
                            .then(finished);
                    default:
                        throw new EzException(
                            ezApi.ezEM`
                                The provided EzTimeAddEditDialogMode
                                ${EzTimeAddEditDialogView.ezInstance.ezTimeAddEditDialogMode}'
                                is either not valid or not supported.`);
                }
            });
    }

    /**
        @protected @method
        Configures the Start Date Time Section
        @returns {Promise.resolve}
     */
    ezConfigureStartDateTimeSection() {
        return ezApi.ezAsyncOperation(
            () => {
                let clockInIso = EzObject.isValid(
                    EzTimeAddEditDialogView.ezInstance.ezTimeAddEditDialogViewConfiguration.ezTimeEntry)
                    ? EzTimeAddEditDialogView.ezInstance.ezTimeAddEditDialogViewConfiguration.ezTimeEntry.clockInIso
                    : null;

                let startMoment = null;
                switch (EzTimeAddEditDialogView.ezInstance.ezTimeAddEditDialogMode) {
                    case EzTimeAddEditDialogMode.UPDATE_ACTIVE_TIME_ENTRY:
                    case EzTimeAddEditDialogMode.UPDATE_ACTIVE_BREAK:
                    case EzTimeAddEditDialogMode.UPDATE_TIME_ENTRY:
                    case EzTimeAddEditDialogMode.UPDATE_BREAK:
                        // Set to the clockInIso of the time entry
                        if (EzString.stringHasLength(clockInIso)) {
                            startMoment = ezApi.ezclocker.ezDateTime.ezFromIso(clockInIso);
                        }
                        break;
                    case EzTimeAddEditDialogMode.ADD_TIME_ENTRY:
                    case EzTimeAddEditDialogMode.ADD_BREAK:
                    default:
                        // Set to the default start date time value
                        startMoment = ezApi.ezclocker.ezDateTime.ezAddHours(
                            ezApi.ezclocker.ezDateTime.ezNowWithStartOfDay(),
                            9);
                        break;
                }

                if (!EzObject.isValid(startMoment)) {
                    throw new EzException(
                        'Unable to determine the start date and time value to add/edit time');
                }

                ezApi.ezclocker.ezDateTime.ezSetDatePickerValue(
                    EzTimeAddEditDialogView.ezInstance.ezIds.inputs.ezStartDatePickerId,
                    startMoment);

                ezApi.ezclocker.ezDateTime.ezSetTimePickerValue(
                    EzTimeAddEditDialogView.ezInstance.ezIds.inputs.ezStartTimePickerId,
                    startMoment);
            });
    }

    /**
        @protected @method
        Configures the End Date Time Section
        @returns {Promise.resolve}
     */
    ezConfigureEndDateTimeSection() {
        return ezApi.ezAsyncOperation(
            () => {
                let clockOutIso = EzObject.isValid(
                    EzTimeAddEditDialogView.ezInstance.ezTimeAddEditDialogViewConfiguration.ezTimeEntry)
                    ? EzTimeAddEditDialogView.ezInstance.ezTimeAddEditDialogViewConfiguration.ezTimeEntry.clockOutIso
                    : null;

                let clockInIso = EzObject.isValid(
                    EzTimeAddEditDialogView.ezInstance.ezTimeAddEditDialogViewConfiguration.ezTimeEntry)
                    ? EzTimeAddEditDialogView.ezInstance.ezTimeAddEditDialogViewConfiguration.ezTimeEntry.clockInIso
                    : null;

                let endMoment = null;

                switch (EzTimeAddEditDialogView.ezInstance.ezTimeAddEditDialogMode) {
                    case EzTimeAddEditDialogMode.ADD_TIME_ENTRY:
                    case EzTimeAddEditDialogMode.ADD_BREAK:
                        // Set to the default end date time value
                        endMoment = ezApi.ezclocker.ezDateTime.ezAddHours(
                            ezApi.ezclocker.ezDateTime.ezNowWithStartOfDay(),
                            17);
                        break;
                    case EzTimeAddEditDialogMode.UPDATE_TIME_ENTRY:
                    case EzTimeAddEditDialogMode.UPDATE_BREAK:
                        // Set to the clockOutIso of the time entry
                        if (EzString.stringHasLength(clockOutIso)) {
                            endMoment = ezApi.ezclocker.ezDateTime.ezFromIso(clockOutIso);
                        }
                        break;
                    case EzTimeAddEditDialogMode.UPDATE_ACTIVE_TIME_ENTRY:
                    case EzTimeAddEditDialogMode.UPDATE_ACTIVE_BREAK:
                    default:
                        // Set equal to the clockInIso
                        if (EzString.stringHasLength(clockInIso)) {
                            endMoment = ezApi.ezclocker.ezDateTime.ezFromIso(clockInIso);
                        }
                }

                if (!EzObject.isValid(endMoment)) {
                    throw new EzException(
                        'Unable to determine the correct end date time values to add/edit time.');
                }

                ezApi.ezclocker.ezDateTime.ezSetDatePickerValue(
                    EzTimeAddEditDialogView.ezInstance.ezIds.inputs.ezEndDatePickerId,
                    endMoment);

                ezApi.ezclocker.ezDateTime.ezSetTimePickerValue(
                    EzTimeAddEditDialogView.ezInstance.ezIds.inputs.ezEndTimePickerId,
                    endMoment);
            });
    }

    /**
        @protected @method
        Configures the Job Selection Section
        @returns {Promise.resolve}
     */
    ezConfigureJobSelectionSection() {
        return ezApi.ezAsyncOperation(
            () => {
                // If no available jobs, hide the section
                if (!EzArray.arrayHasLength(EzTimeAddEditDialogView.ezInstance.ezTimeAddEditDialogViewConfiguration.ezAvailableJobs) ||
                    !ezApi.ezclocker.ezClockerContext.ezActiveEmployerFeatureEnabled(EzClockerFeature.EZ_JOBS)) {
                    // Hide the Job selection if the feature is disabled
                    ezApi.ezclocker.ezUi.ezHideElement(
                        EzTimeAddEditDialogView.ezInstance.ezIds.containers.ezJobSelectionContainerId);
                    return;
                }

                // EZ_JOBS feature is enabled AND available jobs is not empty so can enable the job selection
                ezApi.ezclocker.ezUi.ezSetContent(
                    EzTimeAddEditDialogView.ezInstance.ezIds.inputs.ezJobSelectInputId,
                    EzTimeAddEditDialogView.ezInstance.ezBuildJobCodeSelectOptions());

                ezApi.ezclocker.ezUi.ezShowElement(
                    EzTimeAddEditDialogView.ezInstance.ezIds.containers.ezJobSelectionContainerId,
                    'grid');
            });
    }

    /**
        @protected @method
        Configures the Modification Reason Section
        @returns {Promise.resolve}
     */
    ezConfigureModificationReasonSection() {
        return ezApi.ezAsyncOperation(
            () => {
                ezApi.ezclocker.ezUi.ezSetInputValue(
                    EzTimeAddEditDialogView.ezInstance.ezIds.inputs.ezModificationReasonInputId,
                    EzTimeAddEditDialogView.ezInstance.ezTimeAddEditDialogViewConfiguration.ezTimeEntry.notes);

                if (EzBoolean.isTrue(ezApi.ezclocker.ezClockerContext.ezGetUserContext().isPersonal)) {
                    // Hide the modification reason required info for personal accounts
                    ezApi.ezclocker.ezUi.ezClearContent(
                        EzTimeAddEditDialogView.ezInstance.ezIds.ezModificationRequiredInfoContainer);

                    ezApi.ezclocker.ezUi.ezHideElement(
                        EzTimeAddEditDialogView.ezInstance.ezIds.ezModificationRequiredInfoContainer);
                } else {

                    let requiredNoteOnAdd = EzBoolean.isTrue(
                        EzTimeAddEditDialogView.ezInstance.ezTimeAddEditDialogViewConfiguration.ezRequireNoteOnAdd);

                    let requireNoteOnUpdate = EzBoolean.isTrue(
                        EzTimeAddEditDialogView.ezInstance.ezTimeAddEditDialogViewConfiguration.ezRequireNoteOnUpdate);

                    switch (EzTimeAddEditDialogView.ezInstance.ezTimeAddEditDialogMode) {
                        case EzTimeAddEditDialogMode.ADD_TIME_ENTRY:
                        case EzTimeAddEditDialogMode.ADD_BREAK:
                            if (requiredNoteOnAdd) {
                                // Show the modification reason required info for employer, payroll manager, manager,
                                // and employee accounts
                                ezApi.ezclocker.ezUi.ezShowElement(
                                    EzTimeAddEditDialogView.ezInstance.ezIds.ezModificationRequiredInfoContainer);

                                ezApi.ezclocker.ezUi.ezContent(
                                    EzTimeAddEditDialogView.ezInstance.ezIds.ezModificationRequiredInfoContainer,
                                    EzTimeAddEditDialogView.ezInstance.ezGetNoteRequiredMessage());
                                break;
                            }
                            // Hide the modification reason required info for personal accounts
                            ezApi.ezclocker.ezUi.ezClearContent(
                                EzTimeAddEditDialogView.ezInstance.ezIds.ezModificationRequiredInfoContainer);

                            ezApi.ezclocker.ezUi.ezHideElement(
                                EzTimeAddEditDialogView.ezInstance.ezIds.ezModificationRequiredInfoContainer);
                            break;
                        case EzTimeAddEditDialogMode.UPDATE_TIME_ENTRY:
                        case EzTimeAddEditDialogMode.UPDATE_ACTIVE_TIME_ENTRY:
                        case EzTimeAddEditDialogMode.UPDATE_BREAK:
                        case EzTimeAddEditDialogMode.UPDATE_ACTIVE_BREAK:
                            if (requireNoteOnUpdate) {
                                // Show the modification reason required info for employer, payroll manager, manager,
                                // and employee accounts
                                ezApi.ezclocker.ezUi.ezShowElement(
                                    EzTimeAddEditDialogView.ezInstance.ezIds.ezModificationRequiredInfoContainer);

                                ezApi.ezclocker.ezUi.ezContent(
                                    EzTimeAddEditDialogView.ezInstance.ezIds.ezModificationRequiredInfoContainer,
                                    EzTimeAddEditDialogView.ezInstance.ezGetNoteRequiredMessage());
                                break;
                            }
                            break;
                        default:
                            // Hide the modification reason required info for personal accounts
                            ezApi.ezclocker.ezUi.ezClearContent(
                                EzTimeAddEditDialogView.ezInstance.ezIds.ezModificationRequiredInfoContainer);

                            ezApi.ezclocker.ezUi.ezHideElement(
                                EzTimeAddEditDialogView.ezInstance.ezIds.ezModificationRequiredInfoContainer);
                    }
                }
            });
    }

    /**
        @protected @method
        Updates the dialog's title
        @param {dialogTitle}
     */
    ezUpdateDialogTitle(dialogTitle) {
        ezApi.ezclocker.ezUi.ezId(EzTimeAddEditDialogView.ezInstance.ezIds.ezDialogId).dialog(
            'option',
            'title',
            ezApi.ezStringOrDefault(dialogTitle, 'Time Editor'));
    }

    /**
        @protected @method
        Sets the start and end date time headers
     */
    ezSetStartAndEndDateTimeHeaders(startHeader, endHeader) {
        ezApi.ezclocker.ezUi.ezContent(
            EzTimeAddEditDialogView.ezInstance.ezIds.ezStartDateTimeHeaderId,
            ezApi.ezStringOrDefault(startHeader, 'Start Date and Time'));

        ezApi.ezclocker.ezUi.ezContent(
            EzTimeAddEditDialogView.ezInstance.ezIds.ezEndDateTimeHeaderId,
            ezApi.ezStringOrDefault(endHeader, 'End Date and Time'));
    }

    /**
        @protected @method
        Shows and enables the end date time input container
     */
    ezShowAndEnableEndDateTimeInputContainer() {
        ezApi.ezclocker.ezUi.ezShowElement(
            EzTimeAddEditDialogView.ezInstance.ezIds.containers.ezEndDateTimeInputContainerId,
            'grid');

        ezApi.ezclocker.ezUi.ezEnableElement(EzTimeAddEditDialogView.ezInstance.ezIds.inputs.ezEndDatePickerId);

        ezApi.ezclocker.ezUi.ezEnableElement(EzTimeAddEditDialogView.ezInstance.ezIds.inputs.ezEndTimePickerId);
    }

    /**
        @protected @method
        Hides and disables the end date time input container
     */
    ezHideAndDisableEndDateTimeInputContainer() {
        ezApi.ezclocker.ezUi.ezHideElement(
            EzTimeAddEditDialogView.ezInstance.ezIds.containers.ezEndDateTimeInputContainerId,
            'grid');

        ezApi.ezclocker.ezUi.ezDisableElement(EzTimeAddEditDialogView.ezInstance.ezIds.inputs.ezEndDatePickerId);

        ezApi.ezclocker.ezUi.ezDisableElement(EzTimeAddEditDialogView.ezInstance.ezIds.inputs.ezEndTimePickerId);

        ezApi.ezclocker.ezUi.ezSetInputValue(EzTimeAddEditDialogView.ezInstance.ezIds.inputs.ezEndDatePickerId, '');

        ezApi.ezclocker.ezUi.ezSetInputValue(EzTimeAddEditDialogView.ezInstance.ezIds.inputs.ezEndTimePickerId, '');

        EzTimeAddEditDialogView.ezInstance.ezTimeAddEditDialogViewConfiguration.ezClockOutMoment = null;
    }

    /**
        @protected @method
        Enables the time entry type radio box
     */
    ezEnableTimeEntryTimeTypeRadioBox(checked) {
        ezApi.ezclocker.ezUi.ezSetRadioBoxValue(
            EzTimeAddEditDialogView.ezInstance.ezIds.inputs.ezTimeEntryTimeTypeRadioBoxId,
            EzBoolean.isTrue(checked));

        ezApi.ezclocker.ezUi.ezEnableElement(
            EzTimeAddEditDialogView.ezInstance.ezIds.inputs.ezTimeEntryTimeTypeRadioBoxId);
    }

    /**
        @protected @method
        Disables the time entry time type radio box
     */
    ezDisableTimeEntryTimeTypeRadioBox(checked) {
        ezApi.ezclocker.ezUi.ezSetRadioBoxValue(
            EzTimeAddEditDialogView.ezInstance.ezIds.inputs.ezTimeEntryTimeTypeRadioBoxId,
            EzBoolean.isTrue(checked));

        ezApi.ezclocker.ezUi.ezDisableElement(
            EzTimeAddEditDialogView.ezInstance.ezIds.inputs.ezTimeEntryTimeTypeRadioBoxId);
    }

    /**
        @protected @method
        Enables the break time type radio box
     */
    ezEnableBreakTimeTypeRadioBox(checked) {
        ezApi.ezclocker.ezUi.ezSetRadioBoxValue(
            EzTimeAddEditDialogView.ezInstance.ezIds.inputs.ezBreakTimeTypeRadioBoxId,
            EzBoolean.isTrue(checked));

        ezApi.ezclocker.ezUi.ezEnableElement(
            EzTimeAddEditDialogView.ezInstance.ezIds.inputs.ezBreakTimeTypeRadioBoxId);
    }

    /**
        @protected @method
        Disables the break time type radio box
     */
    ezDisableBreakTimeTypeRadioBox(checked) {
        ezApi.ezclocker.ezUi.ezSetRadioBoxValue(
            EzTimeAddEditDialogView.ezInstance.ezIds.inputs.ezBreakTimeTypeRadioBoxId,
            EzBoolean.isTrue(checked));

        ezApi.ezclocker.ezUi.ezDisableElement(
            EzTimeAddEditDialogView.ezInstance.ezIds.inputs.ezBreakTimeTypeRadioBoxId);
    }

    /**
        @protected @method
        Hides the time type selection container
     */
    ezHideTimeTypeSelectionContainer() {
        ezApi.ezclocker.ezUi.ezHideElement(
            EzTimeAddEditDialogView.ezInstance.ezIds.containers.ezTypeSelectionContainerId);
    }

    /**
        @protected @method
        Shows the time type selection container
     */
    ezShowTimeTypeSelectionContainer() {
        ezApi.ezclocker.ezUi.ezShowElement(
            EzTimeAddEditDialogView.ezInstance.ezIds.containers.ezTypeSelectionContainerId);
    }

    /**
        @protected @method
        Shows the end date time disabled message
     */
    ezShowEndDateTimeDisabledMessage() {
        ezApi.ezclocker.ezUi.ezShowElement(
            EzTimeAddEditDialogView.ezInstance.ezIds.containers.ezEndDateTimeInputDisabledContainerId);

        ezApi.ezclocker.ezUi.ezSetContent(
            EzTimeAddEditDialogView.ezInstance.ezIds.containers.ezEndDateTimeInputDisabledContainerId,
            EzTimeAddEditDialogView.ezInstance.ezGenerateEndDateTimeDisabledMessageHtml());
    }

    /**
        @protected @method
        Hides the end date time disabled message
     */
    ezHideEndDateTimeDisabledMessage() {
        ezApi.ezclocker.ezUi.ezHideElement(
            EzTimeAddEditDialogView.ezInstance.ezIds.containers.ezEndDateTimeInputDisabledContainerId);

        ezApi.ezclocker.ezUi.ezClearContent(
            EzTimeAddEditDialogView.ezInstance.ezIds.containers.ezEndDateTimeInputDisabledContainerId);
    }

    /**
        @protected @method
        Configures the dialog for adding a new time entry
     */
    ezConfigureAddTimeEntryMode() {
        return ezApi.ezAsyncAction(
            (finished) => EzTimeAddEditDialogView.ezInstance.ezConfigureTimeEntryMode()
                .then(
                    () => {
                        // Update dialog title
                        EzTimeAddEditDialogView.ezInstance.ezUpdateDialogTitle('Add Time Entry');

                        switch (EzTimeAddEditDialogView.ezInstance.ezTimeAddEditDialogViewConfiguration.ezPrimaryAccountType) {
                            case EzPrimaryAccountType.PERSONAL:
                                // Enable time entry radio
                                EzTimeAddEditDialogView.ezInstance.ezEnableTimeEntryTimeTypeRadioBox(true);

                                // Disable break radio
                                EzTimeAddEditDialogView.ezInstance.ezEnableBreakTimeTypeRadioBox(false);

                                EzTimeAddEditDialogView.ezInstance.ezHideTimeTypeSelectionContainer();
                                break;
                            case EzPrimaryAccountType.EMPLOYEE:
                            case EzPrimaryAccountType.EMPLOYER:
                            default:
                                // Enable time entry radio
                                EzTimeAddEditDialogView.ezInstance.ezEnableTimeEntryTimeTypeRadioBox(true);

                                // Hide the time type selection box if the employer has not enabled allow breaks
                                if (EzBoolean.isTrue(EzTimeAddEditDialogView.ezInstance.ezTimeAddEditDialogViewConfiguration.ezAllowBreaks)) {
                                    // Break enabled, but not checked
                                    EzTimeAddEditDialogView.ezInstance.ezEnableBreakTimeTypeRadioBox(false);

                                    // Show the time type selection container
                                    EzTimeAddEditDialogView.ezInstance.ezShowTimeTypeSelectionContainer();
                                } else {
                                    // Break disabled and not checked
                                    EzTimeAddEditDialogView.ezInstance.ezDisableBreakTimeTypeRadioBox(false);

                                    // Hide the time type selection container
                                    EzTimeAddEditDialogView.ezInstance.ezHideTimeTypeSelectionContainer();
                                }
                        }

                        // Show the end date time container
                        EzTimeAddEditDialogView.ezInstance.ezShowAndEnableEndDateTimeInputContainer();

                        return EzTimeAddEditDialogView.ezInstance.ezConfigureAddMode()
                            .then(finished);
                    }));
    }

    /**
        @protected @method
        Configures the dialog for updating the active time entry
        @returns {Promise.resolve}
     */
    ezConfigureUpdateActiveTimeEntryMode() {
        return ezApi.ezAsyncAction(
            (finished) => EzTimeAddEditDialogView.ezInstance.ezConfigureTimeEntryMode()
                .then(
                    () => {
                        EzTimeAddEditDialogView.ezInstance.ezTimeAddEditDialogViewConfiguration.ezClockOutMoment = null;

                        // Update the dialog title
                        EzTimeAddEditDialogView.ezInstance.ezUpdateDialogTitle('Update Active Clock In');

                        switch (EzTimeAddEditDialogView.ezInstance.ezTimeAddEditDialogViewConfiguration.ezPrimaryAccountType) {
                            case EzPrimaryAccountType.PERSONAL:
                                // Enable time entry radio
                                EzTimeAddEditDialogView.ezInstance.ezEnableTimeEntryTimeTypeRadioBox(true);

                                // Disable break radio
                                EzTimeAddEditDialogView.ezInstance.ezEnableBreakTimeTypeRadioBox(false);

                                // Hide the time type selection container
                                EzTimeAddEditDialogView.ezInstance.ezHideTimeTypeSelectionContainer();
                                break;
                            case EzPrimaryAccountType.EMPLOYEE:
                            case EzPrimaryAccountType.EMPLOYER:
                            default:
                                // Show the time type selection container
                                EzTimeAddEditDialogView.ezInstance.ezShowTimeTypeSelectionContainer();

                                // Enable time entry radio and checked
                                EzTimeAddEditDialogView.ezInstance.ezEnableTimeEntryTimeTypeRadioBox(true);

                                // Disable break radio and not checked
                                EzTimeAddEditDialogView.ezInstance.ezDisableBreakTimeTypeRadioBox(false);
                        }

                        // Hide the end date time container
                        EzTimeAddEditDialogView.ezInstance.ezHideAndDisableEndDateTimeInputContainer();

                        // Show the end date time disabled message
                        EzTimeAddEditDialogView.ezInstance.ezShowEndDateTimeDisabledMessage();

                        return EzTimeAddEditDialogView.ezInstance.ezConfigureUpdateMode()
                            .then(finished);
                    }));
    }


    /**
        @protected @method
        Configures the dialog for updating a time entry (not active time entry)
        @returns {Promise.resolve}
     */
    ezConfigureUpdateTimeEntryMode() {
        return ezApi.ezAsyncAction(
            (finished) => EzTimeAddEditDialogView.ezInstance.ezConfigureTimeEntryMode()
                .then(
                    () => {
                        // Update the dialog title
                        EzTimeAddEditDialogView.ezInstance.ezUpdateDialogTitle('Update Time Entry');

                        switch (EzTimeAddEditDialogView.ezInstance.ezTimeAddEditDialogViewConfiguration.ezPrimaryAccountType) {
                            case EzPrimaryAccountType.PERSONAL:
                                // Enable time entry radio
                                EzTimeAddEditDialogView.ezInstance.ezEnableTimeEntryTimeTypeRadioBox(true);

                                // Disable break radio
                                EzTimeAddEditDialogView.ezInstance.ezEnableBreakTimeTypeRadioBox(false);

                                // Hide the time type selection container
                                EzTimeAddEditDialogView.ezInstance.ezHideTimeTypeSelectionContainer();
                                break;
                            case EzPrimaryAccountType.EMPLOYEE:
                            case EzPrimaryAccountType.EMPLOYER:
                            default:
                                // Show the time type selection container
                                EzTimeAddEditDialogView.ezInstance.ezShowTimeTypeSelectionContainer();

                                // Enable time entry radio
                                EzTimeAddEditDialogView.ezInstance.ezEnableTimeEntryTimeTypeRadioBox(true);

                                // Disable break radio and not checked
                                EzTimeAddEditDialogView.ezInstance.ezDisableBreakTimeTypeRadioBox(false);
                        }

                        // Hide disabled info container
                        EzTimeAddEditDialogView.ezInstance.ezHideEndDateTimeDisabledMessage();

                        // Show end date time input container
                        EzTimeAddEditDialogView.ezInstance.ezShowAndEnableEndDateTimeInputContainer();

                        return EzTimeAddEditDialogView.ezInstance.ezConfigureUpdateMode()
                            .then(finished);
                    }));
    }

    /**
        @protected @method
        Configures the dialog for editing a time entry.
        @returns {Promise.resolve}
     */
    ezConfigureTimeEntryMode() {
        return ezApi.ezAsyncOperation(
            () => EzTimeAddEditDialogView.ezInstance.ezSetStartAndEndDateTimeHeaders('Clock In', 'Clock Out'));
    }

    /**
        @protected @method
        Configures the dialog for adding a new break
        @returns {Promise.resolve}
     */
    ezConfigureAddBreakMode() {
        return ezApi.ezAsyncAction(
            (finished) => EzTimeAddEditDialogView.ezInstance.ezConfigureBreakMode()
                .then(
                    () => {
                        // Update the dialog title
                        EzTimeAddEditDialogView.ezInstance.ezUpdateDialogTitle('Add Break');

                        switch (EzTimeAddEditDialogView.ezInstance.ezTimeAddEditDialogViewConfiguration.ezPrimaryAccountType) {
                            case EzPrimaryAccountType.PERSONAL:
                                // Enable time entry radio
                                EzTimeAddEditDialogView.ezInstance.ezEnableTimeEntryTimeTypeRadioBox(false);

                                // Disable break radio
                                EzTimeAddEditDialogView.ezInstance.ezEnableBreakTimeTypeRadioBox(true);

                                // Hide the time type selection container
                                EzTimeAddEditDialogView.ezInstance.ezHideTimeTypeSelectionContainer();

                                // Mode NOT supported
                                return ezApi.ezclocker.ezDialog.ezShowOK(
                                    'Break Time Tracking',
                                    ezApi.ezEM`
                                        Tracking breaks with your ezClocker Personal account is not currently
                                        supported. Please contact ezClocker support and let us know if tracking
                                        breaks is a feature your really would like us to add to ezClocker
                                        Personal!`)
                                    .then(EzTimeAddEditDialogView.ezInstance.ezClose);
                            case EzPrimaryAccountType.EMPLOYEE:
                            case EzPrimaryAccountType.EMPLOYER:
                            default:
                                // Hide the time type selection box if the employer has not enabled allow breaks
                                if (EzBoolean.isFalse(EzTimeAddEditDialogView.ezInstance.ezTimeAddEditDialogViewConfiguration.ezAllowBreaks)) {
                                    return ezApi.ezclocker.ezDialog.ezShowOK(
                                        'Break Time Tracking',
                                        ezApi.ezEM`
                                            Tracking breaks is not currently enabled. If you wish to track
                                            breaks, please enable the Allow Breaks preference located in the
                                            Account page.`)
                                        .then(EzTimeAddEditDialogView.ezInstance.ezClose);
                                }

                                // Show the time type selection container
                                EzTimeAddEditDialogView.ezInstance.ezShowTimeTypeSelectionContainer();

                                // Enable time entry radio
                                EzTimeAddEditDialogView.ezInstance.ezEnableTimeEntryTimeTypeRadioBox(false);

                                // Disable break radio
                                EzTimeAddEditDialogView.ezInstance.ezEnableBreakTimeTypeRadioBox(true);
                        }

                        // Enable time entry radio
                        EzTimeAddEditDialogView.ezInstance.ezEnableTimeEntryTimeTypeRadioBox(false);

                        // Disable break radio
                        EzTimeAddEditDialogView.ezInstance.ezEnableBreakTimeTypeRadioBox(true);

                        // Hide disabled info container
                        EzTimeAddEditDialogView.ezInstance.ezHideEndDateTimeDisabledMessage();

                        // Show end date time input container
                        EzTimeAddEditDialogView.ezInstance.ezShowAndEnableEndDateTimeInputContainer();

                        return EzTimeAddEditDialogView.ezInstance.ezConfigureAddMode()
                            .then(finished);
                    }));
    }

    /**
        @protected @method
        Configures the dialog for updating the active break
        @returns {Promise.resolve}
     */
    ezConfigureUpdateActiveBreakMode() {
        return ezApi.ezAsyncAction(
            (finished) => EzTimeAddEditDialogView.ezInstance.ezConfigureBreakMode()
                .then(
                    () => {
                        // Update the dialog title
                        EzTimeAddEditDialogView.ezInstance.ezUpdateDialogTitle('Update Active Break');

                        switch (EzTimeAddEditDialogView.ezInstance.ezTimeAddEditDialogViewConfiguration.ezPrimaryAccountType) {
                            case EzPrimaryAccountType.PERSONAL:
                                // Enable time entry radio
                                EzTimeAddEditDialogView.ezInstance.ezEnableTimeEntryTimeTypeRadioBox(false);

                                // Disable break radio
                                EzTimeAddEditDialogView.ezInstance.ezEnableBreakTimeTypeRadioBox(true);

                                // Hide the time type selection container
                                EzTimeAddEditDialogView.ezInstance.ezHideTimeTypeSelectionContainer();

                                // Mode NOT supported
                                return ezApi.ezclocker.ezDialog.ezShowOk(
                                    'Break Time Tracking',
                                    ezApi.ezEM`
                                        Tracking breaks with your ezClocker Personal account is not currently
                                        supported. Please contact ezClocker support and let us know if tracking
                                        breaks is a feature your really would like us to add to ezClocker
                                        Personal!`)
                                    .then(EzTimeAddEditDialogView.ezInstance.ezClose);
                            case EzPrimaryAccountType.EMPLOYEE:
                            case EzPrimaryAccountType.EMPLOYER:
                            default:
                                // Show the time type selection container
                                EzTimeAddEditDialogView.ezInstance.ezShowTimeTypeSelectionContainer();

                                // Enable time entry radio
                                EzTimeAddEditDialogView.ezInstance.ezDisableTimeEntryTimeTypeRadioBox(false);

                                // Disable break radio
                                EzTimeAddEditDialogView.ezInstance.ezEnableBreakTimeTypeRadioBox(true);
                        }

                        // Enable time entry radio
                        EzTimeAddEditDialogView.ezInstance.ezDisableTimeEntryTimeTypeRadioBox(false);

                        // Disable break radio
                        EzTimeAddEditDialogView.ezInstance.ezEnableBreakTimeTypeRadioBox(true);

                        // Hide the end date time input container
                        EzTimeAddEditDialogView.ezInstance.ezHideAndDisableEndDateTimeInputContainer();

                        // Show the end date time disabled message
                        EzTimeAddEditDialogView.ezInstance.ezShowEndDateTimeDisabledMessage();

                        return EzTimeAddEditDialogView.ezInstance.ezConfigureUpdateMode()
                            .then(finished);
                    }));
    }

    /**
        @protected @method
        Configures the dialog for updating a active break (non-active break)
        @returns {Promise.resolve}
     */
    ezConfigureUpdateBreakMode() {
        return ezApi.ezAsyncAction(
            (finished) => EzTimeAddEditDialogView.ezInstance.ezConfigureBreakMode()
                .then(
                    () => {
                        // Update the dialog title
                        EzTimeAddEditDialogView.ezInstance.ezUpdateDialogTitle('Update Break');

                        switch (EzTimeAddEditDialogView.ezInstance.ezTimeAddEditDialogViewConfiguration.ezPrimaryAccountType) {
                            case EzPrimaryAccountType.PERSONAL:
                                // Enable time entry radio
                                EzTimeAddEditDialogView.ezInstance.ezEnableTimeEntryTimeTypeRadioBox(false);

                                // Disable break radio
                                EzTimeAddEditDialogView.ezInstance.ezEnableBreakTimeTypeRadioBox(true);

                                // Hide the time type selection container
                                EzTimeAddEditDialogView.ezInstance.ezHideTimeTypeSelectionContainer();

                                // Mode NOT supported
                                return ezApi.ezclocker.ezDialog.ezShowOk(
                                    'Break Time Tracking',
                                    ezApi.ezEM`
                                        Tracking breaks with your ezClocker Personal account is not currently
                                        supported. Please contact ezClocker support and let us know if tracking
                                        breaks is a feature your really would like us to add to ezClocker
                                        Personal!`)
                                    .then(EzTimeAddEditDialogView.ezInstance.ezClose);
                            case EzPrimaryAccountType.EMPLOYEE:
                            case EzPrimaryAccountType.EMPLOYER:
                            default:
                                // Show the time type selection container
                                EzTimeAddEditDialogView.ezInstance.ezShowTimeTypeSelectionContainer();

                                // Enable time entry radio
                                EzTimeAddEditDialogView.ezInstance.ezDisableTimeEntryTimeTypeRadioBox(false);

                                // Disable break radio
                                EzTimeAddEditDialogView.ezInstance.ezEnableBreakTimeTypeRadioBox(true);
                        }

                        // Hide the end date time disabled message
                        EzTimeAddEditDialogView.ezInstance.ezHideEndDateTimeDisabledMessage();

                        // Show the end date time input container
                        EzTimeAddEditDialogView.ezInstance.ezShowAndEnableEndDateTimeInputContainer();

                        return EzTimeAddEditDialogView.ezInstance.ezConfigureUpdateMode()
                            .then(finished);
                    }));
    }

    /**
        @protected @method
        Configures the dialog for editing or adding a break
        @returns {Promise.resolve}
     */
    ezConfigureBreakMode() {
        return ezApi.ezAsyncOperation(
            () => EzTimeAddEditDialogView.ezInstance.ezSetStartAndEndDateTimeHeaders('Start Break', 'End Break'));
    }

    /**
        @protected @method
        Configures the dialog for adding time data
        @returns {Promise.resolve}
     */
    ezConfigureAddMode() {
        return ezApi.ezAsyncOperation(
            () => {
                ezApi.ezclocker.ezUi.ezHideElement(
                    EzTimeAddEditDialogView.ezInstance.ezIds.buttons.ezUpdateTimeButtonId);

                ezApi.ezclocker.ezUi.ezHideElement(
                    EzTimeAddEditDialogView.ezInstance.ezIds.containers.ezEndDateTimeInputDisabledContainerId);

                if (EzPrimaryAccountType.PERSONAL !== EzTimeAddEditDialogView.ezInstance.ezTimeAddEditDialogViewConfiguration.ezPrimaryAccountType &&
                    EzBoolean.isFalse(EzTimeAddEditDialogView.ezInstance.ezTimeAddEditDialogViewConfiguration.ezAllowEditing) ||
                    EzBoolean.isTrue(EzTimeAddEditDialogView.ezInstance.ezTimeAddEditDialogViewConfiguration.ezAllowEditNoteOnly)) {
                    ezApi.ezclocker.ezUi.ezHideElement(
                        EzTimeAddEditDialogView.ezInstance.ezIds.containers.ezTimeDataContainerId);
                } else {
                    ezApi.ezclocker.ezUi.ezShowElement(
                        EzTimeAddEditDialogView.ezInstance.ezIds.containers.ezTimeDataContainerId,
                        'grid');
                }

                if (EzPrimaryAccountType.PERSONAL !== EzTimeAddEditDialogView.ezInstance.ezTimeAddEditDialogViewConfiguration.ezPrimaryAccountType &&
                    EzBoolean.isFalse(EzTimeAddEditDialogView.ezInstance.ezTimeAddEditDialogViewConfiguration.ezAllowEditClockIn)) {
                    ezApi.ezclocker.ezUi.ezHideElement(
                        EzTimeAddEditDialogView.ezInstance.ezIds.containers.ezStartDateTimeInputTableId);
                } else {
                    ezApi.ezclocker.ezUi.ezShowElement(
                        EzTimeAddEditDialogView.ezInstance.ezIds.containers.ezStartDateTimeInputTableId);
                }

                if (EzPrimaryAccountType.PERSONAL !== EzTimeAddEditDialogView.ezInstance.ezTimeAddEditDialogViewConfiguration.ezPrimaryAccountType &&
                    EzBoolean.isFalse(EzTimeAddEditDialogView.ezInstance.ezTimeAddEditDialogViewConfiguration.ezAllowEditClockOut)) {
                    ezApi.ezclocker.ezUi.ezHideElement(
                        EzTimeAddEditDialogView.ezInstance.ezIds.containers.ezEndDateTimeInputContainerId);
                }

                if (EzPrimaryAccountType.PERSONAL !== EzTimeAddEditDialogView.ezInstance.ezTimeAddEditDialogViewConfiguration.ezPrimaryAccountType &&
                    EzBoolean.isFalse(EzTimeAddEditDialogView.ezInstance.ezTimeAddEditDialogViewConfiguration.allowEditNote)) {
                    ezApi.ezclocker.ezUi.ezHideElement(
                        EzTimeAddEditDialogView.ezInstance.ezIds.containers.ezModificationReasonContainerId);
                } else {
                    ezApi.ezclocker.ezUi.ezShowElement(
                        EzTimeAddEditDialogView.ezInstance.ezIds.containers.ezModificationReasonContainerId);
                }

                ezApi.ezclocker.ezUi.ezShowElement(
                    EzTimeAddEditDialogView.ezInstance.ezIds.buttons.ezAddTimeButtonId);
            });
    }

    /**
        @protected @method
        Configures the dialog for updating time data
        @returns {Promise.resolve}
     */
    ezConfigureUpdateMode() {
        return ezApi.ezAsyncOperation(
            () => {
                if (EzPrimaryAccountType.PERSONAL !== EzTimeAddEditDialogView.ezInstance.ezTimeAddEditDialogViewConfiguration.ezPrimaryAccountType &&
                    EzBoolean.isFalse(EzTimeAddEditDialogView.ezInstance.ezTimeAddEditDialogViewConfiguration.ezAllowEditing) ||
                    EzBoolean.isTrue(EzTimeAddEditDialogView.ezInstance.ezTimeAddEditDialogViewConfiguration.ezAllowEditNoteOnly)) {
                    ezApi.ezclocker.ezUi.ezHideElement(
                        EzTimeAddEditDialogView.ezInstance.ezIds.containers.ezTimeDataContainerId);
                } else {
                    ezApi.ezclocker.ezUi.ezShowElement(
                        EzTimeAddEditDialogView.ezInstance.ezIds.containers.ezTimeDataContainerId,
                        'grid');
                }

                if (EzPrimaryAccountType.PERSONAL !== EzTimeAddEditDialogView.ezInstance.ezTimeAddEditDialogViewConfiguration.ezPrimaryAccountType &&
                    EzBoolean.isFalse(EzTimeAddEditDialogView.ezInstance.ezTimeAddEditDialogViewConfiguration.ezAllowEditClockIn)) {
                    ezApi.ezclocker.ezUi.ezHideElement(
                        EzTimeAddEditDialogView.ezInstance.ezIds.containers.ezStartDateTimeInputTableId);
                } else {
                    ezApi.ezclocker.ezUi.ezShowElement(
                        EzTimeAddEditDialogView.ezInstance.ezIds.containers.ezStartDateTimeInputTableId);
                }

                if (EzPrimaryAccountType.PERSONAL !== EzTimeAddEditDialogView.ezInstance.ezTimeAddEditDialogViewConfiguration.ezPrimaryAccountType &&
                    EzBoolean.isFalse(EzTimeAddEditDialogView.ezInstance.ezTimeAddEditDialogViewConfiguration.ezAllowEditClockOut)) {
                    ezApi.ezclocker.ezUi.ezHideElement(
                        EzTimeAddEditDialogView.ezInstance.ezIds.containers.ezEndDateTimeInputContainerId);
                }

                if (EzPrimaryAccountType.PERSONAL !== EzTimeAddEditDialogView.ezInstance.ezTimeAddEditDialogViewConfiguration.ezPrimaryAccountType &&
                    EzBoolean.isFalse(EzTimeAddEditDialogView.ezInstance.ezTimeAddEditDialogViewConfiguration.allowEditNote)) {
                    ezApi.ezclocker.ezUi.ezHideElement(
                        EzTimeAddEditDialogView.ezInstance.ezIds.containers.ezModificationReasonContainerId);
                } else {
                    ezApi.ezclocker.ezUi.ezShowElement(
                        EzTimeAddEditDialogView.ezInstance.ezIds.containers.ezModificationReasonContainerId);
                }

                ezApi.ezclocker.ezUi.ezHideElement(
                    EzTimeAddEditDialogView.ezInstance.ezIds.buttons.ezAddTimeButtonId);

                ezApi.ezclocker.ezUi.ezShowElement(
                    EzTimeAddEditDialogView.ezInstance.ezIds.buttons.ezUpdateTimeButtonId);
            });
    }

    /**
        @protected @method
        Validates the clock out date vs the recently set clock in date. Switches the clock out date to equal the
        clock in date if the current clock out date is before the clock in date.
     */
    ezValidateClockInDate() {
        let clockInMoment = ezApi.ezclocker.ezDateTime.ezDateFromDatePicker(
            EzTimeAddEditDialogView.ezInstance.ezIds.inputs.ezStartDatePickerId);

        let clockOutMoment = ezApi.ezclocker.ezDateTime.ezDateFromDatePicker(
            EzTimeAddEditDialogView.ezInstance.ezIds.inputs.ezEndDatePickerId);

        if (EzTimeAddEditDialogView.ezInstance.ezTimeAddEditDialogViewConfiguration.ezIsAddTimeEntryMode) {
            if (clockInMoment.isAfter(clockOutMoment)) {
                // set clock out date equal clock in date
                ezApi.ezclocker.ezDateTime.ezSetDatePickerValue(
                    EzTimeAddEditDialogView.ezInstance.ezIds.inputs.ezEndDatePickerId,
                    clockInMoment);
            }

            if (clockOutMoment.isBefore(clockInMoment) || clockOutMoment.isAfter(clockInMoment.add(8, 'hours'))) {
                // Update the clock out value to assist user in selecting the date and time.
                ezApi.ezclocker.ezDateTime.ezSetDatePickerValue(
                    EzTimeAddEditDialogView.ezInstance.ezIds.inputs.ezEndDatePickerId,
                    ezApi.ezclocker.ezDateTime.ezMomentFromMoment(clockInMoment));
            }
        }
    }

    ezResetValidationErrors() {
        EzTimeAddEditDialogView.ezInstance.ezHideValidationError();
        EzTimeAddEditDialogView.ezInstance.ezDisableReasonEditorError();
        EzTimeAddEditDialogView.ezInstance.ezDisableClockOutEditorContainerError();
        EzTimeAddEditDialogView.ezInstance.ezHideModificationReasonRequiredError();

        ezApi.ezclocker.ezUi.ezHideInputError(EzTimeAddEditDialogView.ezInstance.ezIds.inputs.ezModificationReasonInputId);
    }

    /**
        @protected @method
        Determines if the dialog idata is valid for submission based on the current state.
        @returns {boolean}
     */
    ezValidate() {
        EzTimeAddEditDialogView.ezInstance.ezResetValidationErrors();

        let clockInMoment = ezApi.ezclocker.ezDateTime.ezAppendTimeFromTimePicker(
            EzTimeAddEditDialogView.ezInstance.ezIds.inputs.ezStartTimePickerId,
            ezApi.ezclocker.ezDateTime.ezMomentFromDatePickerStartOfDay(
                EzTimeAddEditDialogView.ezInstance.ezIds.inputs.ezStartDatePickerId));

        let clockOutMoment = ezApi.ezclocker.ezDateTime.ezAppendTimeFromTimePicker(
            EzTimeAddEditDialogView.ezInstance.ezIds.inputs.ezEndTimePickerId,
            ezApi.ezclocker.ezDateTime.ezMomentFromDatePickerStartOfDay(
                EzTimeAddEditDialogView.ezInstance.ezIds.inputs.ezEndDatePickerId));

        let notes = EzString.trimOrEmpty(
            ezApi.ezclocker.ezUi.ezGetInputValue(
                EzTimeAddEditDialogView.ezInstance.ezIds.inputs.ezModificationReasonInputId));

        return EzTimeAddEditDialogView.ezInstance.ezValidateNotes(notes) &&
            EzTimeAddEditDialogView.ezInstance.ezValidateClockInOutMoment(clockInMoment, clockOutMoment);
    }

    /**
        @protected @method
        Returns if the provided notes value is valid given the current state.
        @param {string} notes
        @returns {boolean}
     */
    ezValidateNotes(notes) {
        if (EzBoolean.isTrue(ezApi.ezclocker.ezClockerContext.ezGetUserContext().isPersonal)) {
            // Note not avaialble for personal accounts.
            return true;
        }

        let noteRequired = EzTimeAddEditDialogMode.ADD_TIME_ENTRY === EzTimeAddEditDialogView.ezInstance.ezTimeAddEditDialogMode ||
            EzTimeAddEditDialogMode.ADD_BREAK === EzTimeAddEditDialogView.ezInstance.ezTimeAddEditDialogMode
            ? EzBoolean.isTrue(
                EzTimeAddEditDialogView.ezInstance.ezTimeAddEditDialogViewConfiguration.ezRequireNoteOnAdd)
            : EzBoolean.isTrue(
                EzTimeAddEditDialogView.ezInstance.ezTimeAddEditDialogViewConfiguration.ezRequireNoteOnUpdate);

        if (EzBoolean.isFalse(noteRequired)) {
            return true;
        }

        notes = EzString.trimOrEmpty(notes);

        let vResponse = ezApi.ezclocker.ezValidation.ezValidateStringByteSize(notes, 3, 4000);

        if (EzValidationResponseStatus.ERROR === vResponse.ezStatus) {
            if ('MAXIMUM_LENGTH_EXCEEDED' === vResponse.errorCode) {
                return EzTimeAddEditDialogView.ezInstance.ezShowMaximumNoteLengthExceededError(vResponse.message);
            }
            if ('MINIMUM_LENGTH_NOT_MET' === vResponse.errorCode) {
                return EzTimeAddEditDialogView.ezInstance.ezShowModificationReasonRequiredError(vResponse.message);
            }

            EzTimeAddEditDialogView.ezInstance.ezShowValidationError(vResponse.message);

            EzTimeAddEditDialogView.ezInstance.ezEnableReasonEditorError();

            return false;
        }

        return true;
    }

    /**
        @protected @method
        Displays the maxiumum note length exceeded error
        @param {string} errorMessage
        @returns {boolean}
        Always returns false
     */
    ezShowMaximumNoteLengthExceededError(errorMessage) {
        EzTimeAddEditDialogView.ezInstance.ezEnableReasonEditorError();

        EzTimeAddEditDialogView.ezInstance.ezShowValidationError(errorMessage);

        return false;
    }

    /**
        @protected @method
        Displays modification reason required error
        @returns {boolean}
        Always returns false
     */
    ezShowModificationReasonRequiredError(errorMessage) {
        EzTimeAddEditDialogView.ezInstance.ezEnableReasonEditorError();

        EzTimeAddEditDialogView.ezInstance.ezShowValidationError(
            ezApi.ezTemplate`
                <div class="ezPad2">
                    ${EzTimeAddEditDialogView.ezInstance.ezGetNoteRequiredMessage()}
                </div>
                <div class="ezPad2">
                    ${errorMessage}
                </div>`);

        return false;
    }

    /**
        @protected @method
        Applies the error highlighting style of the input
     */
    ezEnableReasonEditorError() {
        ezApi.ezclocker.ezUi.ezShowInputError(EzTimeAddEditDialogView.ezInstance.ezIds.inputs.ezModificationReasonInputId);

        ezApi.ezclocker.ezUi.ezFocusElement(
            EzTimeAddEditDialogView.ezInstance.ezIds.inputs.ezModificationReasonInputId);
    }

    /**
        @protected @method
        Removes the error highlighting style of the input
     */
    ezDisableReasonEditorError() {
        ezApi.ezclocker.ezUi.ezHideInputError(EzTimeAddEditDialogView.ezInstance.ezIds.inputs.ezModificationReasonInputId);
    }


    /**
        @protected @method
        Hides the highlight on the note editor
        @returns {boolean}
        Always returns false
     */
    ezHideModificationReasonRequiredError() {
        EzTimeAddEditDialogView.ezInstance.ezDisableReasonEditorError();

        return false;
    }

    /**
        @protected @method
        Returns if the clock-in and out moment is valid given the current state.
        @param {moment} clockInMoment
        @param {moment} clockOutMoment
        @returns {boolean}
     */
    ezValidateClockInOutMoment(clockInMoment, clockOutMoment) {
        if (EzBoolean.isFalse(EzTimeAddEditDialogView.ezInstance.ezTimeAddEditDialogViewConfiguration.ezAllowEditing) ||
            EzBoolean.isTrue(EzTimeAddEditDialogView.ezInstance.ezTimeAddEditDialogViewConfiguration.ezAllowEditNoteOnly)) {
            // If a note editing dialog only, ignore clock in validation
            return true;
        }

        if (!EzObject.isValid(clockInMoment)) {
            EzTimeAddEditDialogView.ezInstance.ezShowMissingClockInError();
            return false;
        }

        if (!EzTimeAddEditDialogView.ezInstance.ezTimeAddEditDialogViewConfiguration.ezTimeEntry.isActiveClockIn &&
            !EzTimeAddEditDialogView.ezInstance.ezTimeAddEditDialogViewConfiguration.ezTimeEntry.isActiveBreak) {
            if (!EzObject.isValid(clockOutMoment)) {
                EzTimeAddEditDialogView.ezInstance.ezShowMissingClockOutError();
                return false;
            }
            if (clockOutMoment.isBefore(clockInMoment) || clockOutMoment.isSame(clockInMoment)) {
                EzTimeAddEditDialogView.ezInstance.ezShowClockOutBeforeClickInError();
                return false;
            }
        }

        return true;
    }

    /**
        @protected @method
        Removes the error highlighting style of the container
     */
    ezDisableClockOutEditorContainerError() {
        ezApi.ezclocker.ezUi.ezAddElementClass(
            EzTimeAddEditDialogView.ezInstance.ezIds.containers.ezEndDateTimeInputContainerId,
            'ezTimeAddEditDialogEditorContainerTable');

        ezApi.ezclocker.ezUi.ezRemoveElementClass(
            EzTimeAddEditDialogView.ezInstance.ezIds.containers.ezEndDateTimeInputContainerId,
            'ezTimeAddEditDialogDisabledEditorContainerTable');
    }

    /**
        @protected @method
        Applies the error highlighting style of the container
     */
    ezEnableClockOutEditorContainerError() {
        ezApi.ezclocker.ezUi.ezAddElementClass(
            EzTimeAddEditDialogView.ezInstance.ezIds.containers.ezEndDateTimeInputContainerId,
            'ezTimeAddEditDialogDisabledEditorContainerTable');

        ezApi.ezclocker.ezUi.ezRemoveElementClass(
            EzTimeAddEditDialogView.ezInstance.ezIds.containers.ezEndDateTimeInputContainerId,
            'ezTimeAddEditDialogEditorContainerTable');

        ezApi.ezclocker.ezUi.ezFocusElement(EzTimeAddEditDialogView.ezInstance.ezIds.inputs.ezEndDatePickerId);
    }

    /**
        @protected @method
        Removes the error highlighting style of the container
     */
    ezDisableClockInEditorContainerError() {
        ezApi.ezclocker.ezUi.ezAddElementClass(
            EzTimeAddEditDialogView.ezInstance.ezIds.containers.ezStartDateTimeInputTableId,
            'ezTimeAddEditDialogEditorContainerTable');

        ezApi.ezclocker.ezUi.ezRemoveElementClass(
            EzTimeAddEditDialogView.ezInstance.ezIds.containers.ezStartDateTimeInputTableId,
            'ezTimeAddEditDialogDisabledEditorContainerTable');
    }

    /**
        @protected @method
        Applies the error highlighting style of the container
     */
    ezEnableClockInEditorContainerError() {
        ezApi.ezclocker.ezUi.ezAddElementClass(
            EzTimeAddEditDialogView.ezInstance.ezIds.containers.ezStartDateTimeInputTableId,
            'ezTimeAddEditDialogDisabledEditorContainerTable');

        ezApi.ezclocker.ezUi.ezRemoveElementClass(
            EzTimeAddEditDialogView.ezInstance.ezIds.containers.ezStartDateTimeInputTableId,
            'ezTimeAddEditDialogEditorContainerTable');

        ezApi.ezclocker.ezUi.ezFocusElement(EzTimeAddEditDialogView.ezInstance.ezIds.inputs.ezStartDatePickerId);
    }

    /**
        @protected @method
        Displays missing clock out data error
        @returns {boolean}
        Always returns false
     */
    ezShowMissingClockInError() {
        EzTimeAddEditDialogView.ezInstance.ezEnableClockInEditorContainerError();

        let em = EzString.stringHasLength(EzTimeAddEditDialogView.ezInstance.ezTimeAddEditDialogViewConfiguration.ezTimeEntry.timeEntryType) &&
            EzTimeEntryType.BREAK === EzTimeAddEditDialogView.ezInstance.ezTimeAddEditDialogViewConfiguration.ezTimeEntry.timeEntryType ||
            EzTimeEntryType.BREAK_IN === EzTimeAddEditDialogView.ezInstance.ezTimeAddEditDialogViewConfiguration.ezTimeEntry.timeEntryType ||
            EzTimeEntryType.BREAK_OUT === EzTimeAddEditDialogView.ezInstance.ezTimeAddEditDialogViewConfiguration.ezTimeEntry.timeEntryType
            ? 'Please enter the start date and time for the break.'
            : 'Please enter the clock in date and time for the time entry.';

        EzTimeAddEditDialogView.ezInstance.ezShowValidationError(em);

        return false;
    }

    /**
        @protected @method
        Displays missing clock out data error
        @returns {boolean}
        Always returns false
     */
    ezShowMissingClockOutError() {
        EzTimeAddEditDialogView.ezInstance.ezEnableClockOutEditorContainerError();

        let em = EzString.stringHasLength(EzTimeAddEditDialogView.ezInstance.ezTimeAddEditDialogViewConfiguration.ezTimeEntry.timeEntryType) &&
            EzTimeEntryType.BREAK === EzTimeAddEditDialogView.ezInstance.ezTimeAddEditDialogViewConfiguration.ezTimeEntry.timeEntryType ||
            EzTimeEntryType.BREAK_IN === EzTimeAddEditDialogView.ezInstance.ezTimeAddEditDialogViewConfiguration.ezTimeEntry.timeEntryType ||
            EzTimeEntryType.BREAK_OUT === EzTimeAddEditDialogView.ezInstance.ezTimeAddEditDialogViewConfiguration.ezTimeEntry.timeEntryType
            ? 'Please enter the end date and time for the break.'
            : 'Please enter the clock out date and time for the time entry.';

        EzTimeAddEditDialogView.ezInstance.ezShowValidationError(em);

        return false;
    }

    /**
        @protected @method
        Displays clock out before clock in error
        @returns {boolean}
        Always returns false
     */
    ezShowClockOutBeforeClickInError() {
        EzTimeAddEditDialogView.ezInstance.ezEnableClockOutEditorContainerError();

        let em = EzString.stringHasLength(EzTimeAddEditDialogView.ezInstance.ezTimeAddEditDialogViewConfiguration.ezTimeEntry.timeEntryType) &&
            EzTimeEntryType.BREAK === EzTimeAddEditDialogView.ezInstance.ezTimeAddEditDialogViewConfiguration.ezTimeEntry.timeEntryType ||
            EzTimeEntryType.BREAK_IN === EzTimeAddEditDialogView.ezInstance.ezTimeAddEditDialogViewConfiguration.ezTimeEntry.timeEntryType ||
            EzTimeEntryType.BREAK_OUT === EzTimeAddEditDialogView.ezInstance.ezTimeAddEditDialogViewConfiguration.ezTimeEntry.timeEntryType
            ? 'The break end date and time must be after the break start date and time.'
            : 'The clock out date and time must be after the clock in date and time.';

        EzTimeAddEditDialogView.ezInstance.ezShowValidationError(em);

        return false;
    }

    /**
        @protected @method
        Shows the validation error message
        @param {string} message
     */
    ezShowValidationError(message) {
        if (!EzString.stringHasLength(message)) {
            return; // nothing to show
        }

        ezApi.ezclocker.ezUi.ezContent(
            EzTimeAddEditDialogView.ezInstance.ezIds.containers.ezValidationErrorContainer,
            message);

        ezApi.ezclocker.ezUi.ezShowElement(
            EzTimeAddEditDialogView.ezInstance.ezIds.containers.ezValidationErrorContainer);
    }

    /**
        @protected @method
        Hides the validation error message
        Original: hideAddTimeEntryValidationError
     */
    ezHideValidationError() {
        ezApi.ezclocker.ezUi.ezHideElement(EzTimeAddEditDialogView.ezInstance.ezIds.containers.ezValidationErrorContainer);

        ezApi.ezclocker.ezUi.ezClearContent(EzTimeAddEditDialogView.ezInstance.ezIds.containers.ezValidationErrorContainer);
    }

    /**
        @protected @method
        Builds the dialog's UX html
        @returns {string}
     */
    ezBuildDialogHtml() {
        return ezApi.ezTemplate`
            <!-- Add Time Entry Dialog -->
            <div
                id="${EzTimeAddEditDialogView.ezInstance.ezIds.ezDialogId}"
                title="Time Entry Editor">

                <!-- Time Data Section -->
                ${EzTimeAddEditDialogView.ezInstance.ezBuildTimeDataSection()}

                <!-- Additional Data Section -->
                ${EzTimeAddEditDialogView.ezInstance.ezBuildAdditionalDataSection()}

                <!-- Error Message -->
                <div
                    id="${EzTimeAddEditDialogView.ezInstance.ezIds.containers.ezValidationErrorContainer}"
                    class="ezErrorBox"
                    style="display:none">
                </div>
            </div>`;
    }

    ezBuildTimeDataSection() {
        return ezApi.ezTemplate`
            <div
                id="${EzTimeAddEditDialogView.ezInstance.ezIds.containers.ezTimeDataContainerId}"
                class="ezTimeEntryDialog-time-data-container">

                <!-- Time Entry Type Section -->
                ${EzTimeAddEditDialogView.ezInstance.ezBuildTimeTypeSectionHtml()}

                <!-- Start and End Time Section -->
                ${EzTimeAddEditDialogView.ezInstance.ezBuildClockInClockOutSection()}
            </div>`;
    }

    ezBuildAdditionalDataSection() {
        return ezApi.ezTemplate`
            <div
                id="${EzTimeAddEditDialogView.ezInstance.ezIds.ezAdditionalDataContainerId}"
                class="ezTimeEntryDialog-additional-data-container">

                <!-- Job Section Section -->
                ${EzTimeAddEditDialogView.ezInstance.ezBuildSelectJobSectionHtml()}

                <!-- Notes Section -->
                ${EzTimeAddEditDialogView.ezInstance.ezBuildNotesSectionHtml()}
            </div>`;
    }

    /**
        @protected @method
        Builds the time type selection section for the dialog.
        @returns {string}
     */
    ezBuildTimeTypeSectionHtml() {
        return ezApi.ezTemplate`
            <div
                id="${EzTimeAddEditDialogView.ezInstance.ezIds.containers.ezTypeSelectionContainerId}"
                class="ezTimeEntryDialog-type-section">
                <span
                    id="${EzTimeAddEditDialogView.ezInstance.ezIds.ezTypeSelectionIdPrefix}_Header"
                    class="ezTimeEntryDialog-type-header">
                    Type
                </span>
                <div
                    id="${EzTimeAddEditDialogView.ezInstance.ezIds.ezTypeSelectionIdPrefix}_InputContainer"
                    class="ezTimeEntryDialog-type-input-container">
                    <div
                        id="${EzTimeAddEditDialogView.ezInstance.ezIds.inputs.ezTimeEntryTimeTypeRadioBoxId}_Container"
                        class="ezTimeEntryDialog-time-type-radio-button-container">
                        <input
                            id="${EzTimeAddEditDialogView.ezInstance.ezIds.inputs.ezTimeEntryTimeTypeRadioBoxId}"
                            type="radio"
                            name="EzTimeEntryTypeRadioGroup"
                            value="NORMAL"
                            checked/>
                        <label
                            id="${EzTimeAddEditDialogView.ezInstance.ezIds.inputs.ezTimeEntryTimeTypeRadioBoxId}_Label"
                            for="${EzTimeAddEditDialogView.ezInstance.ezIds.inputs.ezTimeEntryTimeTypeRadioBoxId}">
                                Time Entry
                        </label>
                    </div>
                    <div
                        id="${EzTimeAddEditDialogView.ezInstance.ezIds.inputs.ezBreakTimeTypeRadioBoxId}_Container"
                        class="ezTimeEntryDialog-time-type-radio-button-container">
                        <input
                            id="${EzTimeAddEditDialogView.ezInstance.ezIds.inputs.ezBreakTimeTypeRadioBoxId}"
                            type="radio"
                            value="BREAK"
                            name="EzTimeEntryTypeRadioGroup"/>
                        <label
                            id="${EzTimeAddEditDialogView.ezInstance.ezIds.inputs.ezBreakTimeTypeRadioBoxId}_Label"
                            for="${EzTimeAddEditDialogView.ezInstance.ezIds.inputs.ezBreakTimeTypeRadioBoxId}">
                            Break
                        </label>
                    </div>
                </div>
            </div>`;
    }

    /**
        @protected @method
        Builds the clock in and clock out data input section for the dialog
        @returns {string}
     */
    ezBuildClockInClockOutSection() {
        return ezApi.ezTemplate`
            <div
                id="${EzTimeAddEditDialogView.ezInstance.ezIds.ezDialogId}_ClockInOutContainer"
                class="ezTimeEntryDialog-datetime-section">

                <!-- Start Date Time Inputs -->
                ${EzTimeAddEditDialogView.ezInstance.ezBuildStartDateTimeInputHtml()}

                <!-- End Date Time Inputs -->
                ${EzTimeAddEditDialogView.ezInstance.ezBuildEndDateTimeInputHtml()}
            </div>`;
    }

    /**
        @protected @method
        Builds the clock in data input html
        @returns {string}
     */
    ezBuildStartDateTimeInputHtml() {
        let startDateTimeInputTableHtml = EzTimeAddEditDialogView.ezInstance.ezBuildDateTimeInputTable(
            EzTimeAddEditDialogView.ezInstance.ezIds.containers.ezStartDateTimeInputTableId,
            EzTimeAddEditDialogView.ezInstance.ezIds.ezStartDateTimeIdPrefix,
            EzTimeAddEditDialogView.ezInstance.ezIds.inputs.ezStartDatePickerId,
            EzTimeAddEditDialogView.ezInstance.ezIds.inputs.ezStartTimePickerId);

        return ezApi.ezTemplate`
            <div
                id="${EzTimeAddEditDialogView.ezInstance.ezIds.containers.ezStartDateTimeInputContainerId}"
                class="ezTimeEntryDialog-clockinout-input-container">
                <div
                    id="${EzTimeAddEditDialogView.ezInstance.ezIds.ezStartDateTimeHeaderId}"
                    class="ezTimeEntryDialog-clockinout-header">
                    Start Date and Time
                </div>

                <!-- Start Date Time Input Table -->
                ${startDateTimeInputTableHtml}
            </div>`;
    }

    /**
        @protected @method
        Builds the clock out data input html
        @returns {string}
     */
    ezBuildEndDateTimeInputHtml() {
        let endDateTimeInputTableHtml = EzTimeAddEditDialogView.ezInstance.ezBuildDateTimeInputTable(
            EzTimeAddEditDialogView.ezInstance.ezIds.containers.ezEndDateTimeInputTableId,
            EzTimeAddEditDialogView.ezInstance.ezIds.ezEndDateTimeIdPrefix,
            EzTimeAddEditDialogView.ezInstance.ezIds.inputs.ezEndDatePickerId,
            EzTimeAddEditDialogView.ezInstance.ezIds.inputs.ezEndTimePickerId);

        return ezApi.ezTemplate`
            <!-- End Date Time Input Container -->
            <div
                id="${EzTimeAddEditDialogView.ezInstance.ezIds.containers.ezEndDateTimeInputContainerId}"
                class="ezTimeEntryDialog-clockinout-input-container">
                <div
                    id="${EzTimeAddEditDialogView.ezInstance.ezIds.ezEndDateTimeHeaderId}"
                    class="ezTimeEntryDialog-clockinout-header">
                    End Date and Time
                </div>

                <!-- End Date Time Input Table -->
                ${endDateTimeInputTableHtml}
            </div>

            <!-- End Date and Time Disabled Container -->
            <div
                id="${EzTimeAddEditDialogView.ezInstance.ezIds.containers.ezEndDateTimeInputDisabledContainerId}"
                class="ezInfoBox" style="display:none">
                Editing the end date and time is disabled.
            </div>`;
    }

    /**
        @protected @method
        Builds a time input table with the provided ids.
        @param {string} dateTimeInputTableId
        @param {string} dateTimeIdPrefix
        @param {string} datePickerId
        @param {string} timePickerId
        @returns {string}
     */
    ezBuildDateTimeInputTable(dateTimeInputTableId, dateTimeIdPrefix, datePickerId, timePickerId) {
        if (!EzString.stringHasLength(dateTimeInputTableId)) {
            throw new EzBadParamException(
                'dateTimeInputTableId',
                EzTimeAddEditDialogView.ezInstance,
                EzTimeAddEditDialogView.ezInstance.ezBuildDateTimeInputTable);
        }
        if (!EzString.stringHasLength(dateTimeIdPrefix)) {
            throw new EzBadParamException(
                'dateTimeIdPrefix',
                EzTimeAddEditDialogView.ezInstance,
                EzTimeAddEditDialogView.ezInstance.ezBuildDateTimeInputTable);
        }
        if (!EzString.stringHasLength(datePickerId)) {
            throw new EzBadParamException(
                'datePickerId',
                EzTimeAddEditDialogView.ezInstance,
                EzTimeAddEditDialogView.ezInstance.ezBuildDateTimeInputTable);
        }
        if (!EzString.stringHasLength(timePickerId)) {
            throw new EzBadParamException(
                'timePickerId',
                EzTimeAddEditDialogView.ezInstance,
                EzTimeAddEditDialogView.ezInstance.ezBuildDateTimeInputTable);
        }

        return ezApi.ezTemplate`
            <table
                id="${dateTimeInputTableId}"
                class="ezTimeEntryDialog-time-input-layout-table">

                <!-- End Date Row -->
                <tr
                    id="${dateTimeIdPrefix}_DateInputInputRow">
                    <td
                        id="${dateTimeIdPrefix}_DateInputHeaderColumn">
                        Date:
                    </td>
                    <td
                        id="${dateTimeIdPrefix}_DateInputColumn"
                        class="ezLeftGroupLine">
                        <input
                            id="${datePickerId}"
                            class="ezFullWidthEditor"
                            type="text"
                            name="clockOutDate" />
                    </td>
                </tr>

                <!-- End Time Row -->
                <tr
                    id="${dateTimeIdPrefix}_TimeInputRow">
                    <td
                        id="${dateTimeIdPrefix}_TimeInputHeaderColumn">
                        Time:
                    </td>
                    <td
                        id="${dateTimeIdPrefix}_TimeInputColumn"
                        class="ezLeftGroupLine">
                        <input
                            id="${timePickerId}"
                            class="ezFullWidthEditor"
                            type="text"
                            name="clockOutTime" />
                    </td>
                </tr>
            </table>`;
    }

    /**
        @protected @method
        Builds the select job section of the dialog
        @returns {string}
     */
    ezBuildSelectJobSectionHtml() {
        return ezApi.ezTemplate`
            <div
                id="${EzTimeAddEditDialogView.ezInstance.ezIds.containers.ezJobSelectionContainerId}"
                class="ezTimeEntryDialog-job-section">

                <!-- Job Selection Input -->
                <label
                    id="${EzTimeAddEditDialogView.ezInstance.ezIds.inputs.ezJobSelectInputId}_Label"
                    for="${EzTimeAddEditDialogView.ezInstance.ezIds.inputs.ezJobSelectInputId}"
                    class="ezTimeEntryDialog-select-job-header">
                    Select Job
                </label>
                <select
                    id="${EzTimeAddEditDialogView.ezInstance.ezIds.inputs.ezJobSelectInputId}"
                    class="ezFullWidthEditor">
                </select>

                <!-- Job Selection Hint -->
                <div
                    id="${EzTimeAddEditDialogView.ezInstance.ezIds.containers.ezJobSelectionContainerId}_Info"
                    class="ezTimeEntryDialog-help-hint-container">
                    Optionally select the job associated with this entry.
                </div>
            </div>`;
    }

    /**
        @protected @method
        Builds each Job Code option html for the Job Code select HTML
        @returns {String}
     */
    ezBuildJobCodeSelectOptions() {
        let options = ezApi.ezTemplate`
            <option
                id="EzJobCodeSelect_Option_NONE"
                value="-1">
                None (no job assigned)
            </option>`;

        if (!EzArray.arrayHasLength(EzTimeAddEditDialogView.ezInstance.ezTimeAddEditDialogViewConfiguration.ezAvailableJobs)) {
            return options;
        }

        let selectedJob = -1;
        if (EzArray.arrayHasLength(
            EzTimeAddEditDialogView.ezInstance.ezTimeAddEditDialogViewConfiguration.ezTimeEntry.assignedJobs)) {
            selectedJob = EzTimeAddEditDialogView.ezInstance.ezTimeAddEditDialogViewConfiguration.ezTimeEntry.assignedJobs[0].id;
        }

        if (EzObject.isValid(
            EzTimeAddEditDialogView.ezInstance.ezTimeAddEditDialogViewConfiguration.ezTimeEntry.primaryJobCodeId) &&
            -1 != EzTimeAddEditDialogView.ezInstance.ezTimeAddEditDialogViewConfiguration.ezTimeEntry.primaryJobCodeId &&
            '-1' !== EzTimeAddEditDialogView.ezInstance.ezTimeAddEditDialogViewConfiguration.ezTimeEntry.primaryJobCodeId) {
            selectedJob =
                parseInt(EzTimeAddEditDialogView.ezInstance.ezTimeAddEditDialogViewConfiguration.ezTimeEntry.primaryJobCodeId);
        }

        if (-1 == selectedJob) {
            selectedJob = ezApi.ezclocker.ezClockerContext.ezGetActiveEmployee().primaryJobCodeId;
        }

        EzTimeAddEditDialogView.ezInstance.ezTimeAddEditDialogViewConfiguration.ezAvailableJobs.forEach(
            (job) => {
                if (!EzBoolean.isFalse(job.enabled)) {
                    let selected = job.id === selectedJob
                        ? 'selected'
                        : '';

                    options += ezApi.ezTemplate`
                        <option
                            id="EzJobCodeSelect_Option_${job.id}"
                            value="${job.id}" ${selected}>
                            ${job.tagName}
                        </option>`;
                }
            });

        return options;
    }

    /**
        @protected @method
        Builds the notes section of the dialog
        @returns {string}
     */
    ezBuildNotesSectionHtml() {
        return ezApi.ezTemplate`
            <div
                id="${EzTimeAddEditDialogView.ezInstance.ezIds.containers.ezModificationReasonContainerId}"
                class="ezTimeEditDialog-modification-section">

                <!-- Note (modification reason) Input -->
                <label
                    id="${EzTimeAddEditDialogView.ezInstance.ezIds.inputs.ezModificationReasonInputId}_Label"
                    for="${EzTimeAddEditDialogView.ezInstance.ezIds.inputs.ezModificationReasonInputId}"
                    class="ezTimeEntryDialog-note-header">
                    Notes
                </label>
                <textarea
                    id="${EzTimeAddEditDialogView.ezInstance.ezIds.inputs.ezModificationReasonInputId}"
                    class="ezMarginTop4 ezFullWidthEditor"
                    rows="4">
                </textarea/>

                <!-- Note Modification Reason Info -->
                <span
                    id="${EzTimeAddEditDialogView.ezInstance.ezIds.ezModificationRequiredInfoContainer}"
                    class="ezTimeEntryDialog-help-hint-container">
                    ${EzTimeAddEditDialogView.ezInstance.ezGetNoteRequiredMessage()}
                </span>
            </div>`;
    }

    /**
        @protected @method
        Returns the message to use when a note is required.
        @return {string}
     */
    ezGetNoteRequiredMessage() {
        if (EzTimeAddEditDialogView.ezInstance.ezTimeAddEditDialogViewConfiguration.ezIsActiveClockIn) {
            return 'You must enter a reason for modifying the active clock in the notes above.';
        }

        if (EzTimeAddEditDialogView.ezInstance.ezTimeAddEditDialogViewConfiguration.ezIsActiveBreak) {
            return 'You must enter the reason for modifying the active break in the notes above.';
        }

        if (EzTimeAddEditDialogView.ezInstance.ezTimeAddEditDialogViewConfiguration.isEditBreakMode) {
            return 'You must enter the reason for modifying the break in the notes above.';
        }

        if (EzTimeAddEditDialogView.ezInstance.ezTimeAddEditDialogViewConfiguration.ezIsEditTimeEntryMode) {
            return 'You must enter the reason for modifying the time entry in the notes above.';
        }

        return 'You must enter the reason for adding a new time entry in the notes above.';
    }

    /**
        @protected @method
        Generates HTML message for the end date time disabled container
        @returns {string}
     */
    ezGenerateEndDateTimeDisabledMessageHtml() {
        switch (EzTimeAddEditDialogView.ezInstance.ezTimeAddEditDialogMode) {
            case EzTimeAddEditDialogMode.UPDATE_ACTIVE_TIME_ENTRY:
                return ezApi.ezTemplate`
                    <h3>
                        You are editing an active clock in.
                    </h3>
                    <div class="ezTimeAddEditDialog-clock-out-edit-disabled-restrictions-container">
                        Editing is restricted to:
                        <ul>
                            <li>
                                Modifying the clock in date and time.
                            </li>
                            <li>
                                Modifying or adding notes.
                            </li>
                            <li>
                                Changing or selecting a job.
                            </li>
                        </ul>
                    </div>`;
            case EzTimeAddEditDialogMode.UPDATE_ACTIVE_BREAK:
                return ezApi.ezTemplate`
                    <h3>
                        You are editing an active break.
                    </h3>
                    <div class="ezTimeAddEditDialog-clock-out-edit-disabled-restrictions-container">
                        Editing is restricted to:
                        <ul>
                            <li>
                                Modifying the break start date and time.
                            </li>
                            <li>
                                Modifying or adding notes.
                            </li>
                            <li>
                                Changing or selecting a job.
                            </li>
                        </ul>
                    </div>`;
            case EzTimeAddEditDialogMode.ADD_TIME_ENTRY:
            case EzTimeAddEditDialogMode.UPDATE_TIME_ENTRY:
            case EzTimeAddEditDialogMode.ADD_BREAK:
            case EzTimeAddEditDialogMode.UPDATE_BREAK:
            default:
                return '';
        }
    }
}

export {
    EzTimeAddEditDialogView
};
