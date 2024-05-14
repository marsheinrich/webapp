import {
    EzBadParamException,
    EzBadStateException
} from '/ezlibrary/exceptions/EzExceptions.js';

import {
    EzObject,
    EzBoolean,
    EzString,
    EzNumber,
    EzArray,
    EzAsync,
    EzHtml,
    EzPromise
} from '/ezlibrary/helpers/EzHelpers.js';

import {
    EzRegistrationState,
    EzEntityType,
    EzElementEventName
} from '/ezlibrary/enums/EzEnumerations.js';

import { EzClass } from '/ezlibrary/EzClass.js';
import { EzDataTagMap } from '/ezlibrary/entities/EzDataTagMap.js';

import { EzEventEngine } from '/ezlibrary/ez-event-engine.js';

import { EzClockerContext } from '/ezlibrary/EzClockerContext/ez-context.js';

import { EzUI } from '/public/javascript/common/ezui.js';

import { EzDialogConfig } from '/ezlibrary/ux/dialogs/EzDialogConfig.js';

import { EzDialog } from '/public/javascript/common/ezclocker-dialog-helper.js';

/**
 * @class
 * @description
 * Enumeration class that provides the possible modes for the EzJobCodeAssignEmployeeDialog.
 * ---------------------------------------------------------------------------
 * Import with:
 *     import { EzJobCodeAssignEmployeeDialogMode } from '/secure/widgets/EzJobCodeDialog/ez-jobcode-dialog.js';
 * ---------------------------------------------------------------------------
 */
export class EzJobCodeAssignEmployeeDialogMode {
    /**
     * @static
     * @public @readonly @property
     * Gets the array of enum property names
     * @returns {array}
     */
    static get ezNames() {
        return [
            'UNKNOWN',
            'NEW_EMPLOYEE_ASSIGNMENT',
            'EDITING_EMPLOYEE_ASSIGNMENT'
        ];
    }

    /**
     * @static
     * @public @readonly @property
     * Gets the array of enum property values
     * @returns {array}
     */
    static get ezValues() {
        return [
            // Names and values equal the same value for this enumeration
            EzJobCodeAssignEmployeeDialogMode.ezNames[0],
            EzJobCodeAssignEmployeeDialogMode.ezNames[1],
            EzJobCodeAssignEmployeeDialogMode.ezNames[2]
        ];
    }

    /**
     * @public @readonly @property
     * Enum property that indicates that the EzJobCodeAssignEmployeeDialogMode is unknown or not set.
     * @returns {string}
     */
    static get UNKNOWN() {
        return EzJobCodeAssignEmployeeDialogMode.ezValues[0];
    }

    /**
     * @public @readonly @property
     * Enum property that indicates that the dialog mode is for creating a new employee assignment
     * to DataTag (Job Code).
     * @returns {string}
     */
    static get NEW_EMPLOYEE_ASSIGNMENT() {
        return EzJobCodeAssignEmployeeDialogMode.ezValues[1];
    }

    /**
     * @public @readonly @property
     * Enum property that indicates that the dialog mode is for editing an existing employee assignment
     * to a DataTag (Job Code).
     * @returns {string}
     */
    static get EDITING_EMPLOYEE_ASSIGNMENT() {
        return EzJobCodeAssignEmployeeDialogMode.ezValues[2];
    }

    /**
     * @public @static @method
     * Returns the enum property name associated with the provided enumPropertyValue.
     * If the provided enumPropertyValue does not match an existing enumeration
     * property value then the then enum property name at index 0 in the
     * ezNames[] array is returned.
     * @param {String} enumPropertyValue
     * A valid enumeration property value from this enumeration class.
     * @returns {String}
     * A valid enumeration property name from this enumeration class.
     */
    static ezNameOf(enumPropertyValue) {
        if (!enumPropertyValue || 'string' !== typeof enumPropertyValue || 0 === enumPropertyValue.length) {
            return this.ezNames[0];
        }

        const index = this.ezValues.indexOf(enumPropertyValue);

        return 0 >= index
            ? this.ezNames[index]
            : this.ezNames[0];
    }

    /**
     * @public @static @method
     * Returns the enum property value for the provided enumPropertyName
     * If the provided enumPropertyName does not match an existing enumeration
     * property then the value of the enum property name at index 0 in the ezNames[]
     * array is returned.
     * @param {String} enumPropertyName
     * A valid enumeration property name from this enumeration class.
     * @returns {String}
     * A valid enumeration property value from this enumeration class.
     */
    static ezValueOf(enumPropertyName) {
        if (!enumPropertyName || 'string' !== typeof enumPropertyName || 0 === enumPropertyName.length) {
            return this.ezNames[0];
        }

        const index = this.ezNames.indexOf(enumPropertyName.toUpperCase());

        return 0 >= index
            ? this[this.ezNames[index]]
            : this[this.ezNames[0]];
    }

    /**
     * @public @static @method
     * Returns the enum property value for the provided enumPropertyNameOrValue which can be either
     * a enumeration property name OR a enumeration property value.
     * If the provided enumPropertyNameOrValue does not match an existing enumeration property value
     * then an attempt is made to match a enum property name.
     * If the enumPropertyNameOrValue does not match an enum property name OR enum property value then
     * the value of the enum property name at index 0 in the ezNames[] array is returned.
     * @param {String} enumPropertyNameOrValue
     * A valid enumeration property name OR enum property value from this enumeration class.
     * @returns {String}
     * A valid enumeration property value from this enumeration class.
     */
    static ezAsEnum(enumPropertyNameOrValue) {
        if (!enumPropertyNameOrValue || 'string' !== typeof enumPropertyNameOrValue || 0 === enumPropertyNameOrValue.length) {
            return this.ezNames[0];
        }

        const valueIndex = this.ezValues.indexOf(enumPropertyNameOrValue);

        if (0 <= valueIndex && this.ezValues.length > valueIndex) {
            return this.ezValues[valueIndex];
        }

        const nameIndex = this.ezNames.indexOf(enumPropertyNameOrValue.toUpperCase());

        if (0 <= nameIndex && this.ezNames.length > nameIndex) {
            return this[this.ezNames[nameIndex]];
        }

        return this[this.ezNames[0]];
    }
}

/**
 * @public @class {EzJobCodeAssignEmployeeDialog} @extends {EzClass}
 * @description
 * Controller and view for a dialog that allows the user to select an employee
 * to assign to a job code and optionall indicate that the job code is the
 * employee's primary job code.
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 * Import with:
 *     import { EzJobCodeAssignEmployeeDialog } from '/secure/widgets/EzJobCodeDialog/ez-jobcode-assign-employee-dialog.js';
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 */
export class EzJobCodeAssignEmployeeDialog extends EzClass {
    /**
     * @static
     * @public @readonly @property
     * Returns the name of this class's singleton instance when registered with ezApi.
     * @returns {String}
     */
    static get ezApiName() {
        return 'ezJobCodeAssignEmployeeDialog';
    }

    /**
     * @static
     * @public @readonly @property
     * Returns an object of event names that this class may trigger.
     * @returns {Object}
     */
    static get ezEventNames() {
        return {
            onReady: 'ezOn_EzJobCodeAssignEmployeeDialog_Ready',
            onEzJobCodeAssignEmployeeDialogClose: 'ezOn_EzJobCodeAssignEmployeeDialog_Close',
            onEzJobCodeAssignEmployeeDialogUpdatedEmployeeAssignment: 'ezOn_EzJobCodeAssignEmployeeDialog_UpdatedEmployeeAssignment'
        };
    }

    /**
     * @static
     * @private @field
     * Stores the singleton instance of this class that was created by and registerd with EzApi.
     * @type {EzJobCodeAssignEmployeeDialog}
     */
    static #ezInstance = globalThis?.ezApi?.ezclocker?.[EzJobCodeAssignEmployeeDialog.ezApiName]
        ? globalThis.ezApi.ezclocker[EzJobCodeAssignEmployeeDialog.ezApiName]
        : null;

    /**
     * @static
     * @public @property @getter
     * Returns the singleton instance of this class that is registered with EzApi (if available yet)
     * @returns {EzJobCodeAssignEmployeeDialog}
     */
    static get ezInstance() {
        return EzJobCodeAssignEmployeeDialog.#ezInstance;
    }

    /**
     * @static
     * @public @property @getter
     * Sets the singleton instance of of this class that is registered with EzApi.
     * @param {EzJobCodeAssignEmployeeDialog} ezJobCodeAssignEmployeeDialog
     */
    static set ezInstance(ezJobCodeAssignEmployeeDialog) {
        if (null != EzJobCodeAssignEmployeeDialog.#ezInstance) {
            throw new Error('EzJobCodeAssignEmployeeDialog\'s singleton instance is already reigstered with EzApi.');
        }

        EzJobCodeAssignEmployeeDialog.#ezInstance = ezJobCodeAssignEmployeeDialog;
    }

    /**
     * @static
     * @private @field
     * Stores the EzApi registration state for this class.
     * Default value is NULL
     * Class is registerd with EzApi when value is EzRegistrationState.REGISTERED
     * @type {String}
     * A valid enum property value from EzRegistrationState
     */
    static #ezApiRegistrationState = globalThis?.ezApi?.ezclocker?.[EzJobCodeAssignEmployeeDialog.ezApiName]
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
        return EzJobCodeAssignEmployeeDialog.#ezApiRegistrationState;
    }

    /**
     * @static
     * @public @property @setter
     * Sets the ezApi registration state of this classes's singleton instance.
     * @param {string} ezApiRegistrationState
     * A valid enum property value from EzRegistrationState
     */
    static set ezApiRegistrationState(ezApiRegistrationState) {
        EzJobCodeAssignEmployeeDialog.#ezApiRegistrationState = EzRegistrationState.ezValueOf(ezApiRegistrationState);
    }

    /**
     * @static
     * @private @readonly @property @getter
     * Returns true when all required dependencies for this class report ready.
     * In otherwords, the require dependency's singleton instance is created
     * and is registered with and accessable from EzApi with ezApi.ezclocker.{dependency_name}.
     * @returns {Boolean}
     */
    static get #ezCanRegister() {
        return EzRegistrationState.PENDING === EzJobCodeAssignEmployeeDialog.ezApiRegistrationState &&
            globalThis?.ezApi?.ready && globalThis?.ezApi?.ezclocker &&
            globalThis.ezApi.ezclocker?.[EzEventEngine.ezApiName]?.ready &&
            globalThis.ezApi.ezclocker?.[EzClockerContext.ezApiName]?.ready &&
            globalThis.ezApi.ezclocker?.[EzUI.ezApiName]?.ready &&
            globalThis.ezApi.ezclocker?.[EzDialog.ezApiName]?.ready;
    }

    /**
     * @static
     * @private @readonly @property @getter
     * Returns if this class's singleton instance is registered with ezApi yet.
     * @returns {Boolean}
     */
    static get #ezIsRegistered() {
        return null != EzJobCodeAssignEmployeeDialog.ezInstance &&
            EzJobCodeAssignEmployeeDialog.REGISTERED === EzJobCodeAssignEmployeeDialog.ezApiRegistrationState;
    }

    /**
     * @static
     * @private @method
     * Attempts to register the singleton instance for this class with ezApi. Returns true
     * if successful, false otherwise.
     * @returns {Boolean}
     */
    static #ezRegistrator() {
        if (EzJobCodeAssignEmployeeDialog.#ezCanRegister && !EzJobCodeAssignEmployeeDialog.#ezIsRegistered) {
            globalThis['ezApi'].ezRegisterNewApi(EzJobCodeAssignEmployeeDialog, EzJobCodeAssignEmployeeDialog.ezApiName);
        }

        return EzJobCodeAssignEmployeeDialog.#ezIsRegistered;
    }

    /**
     * @static
     * Static Initialization
     * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
     * >> IMPORTANT <<
     * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
     * Make sure the following properties and methods get defined BEFORE this static initialization section:
     *     1) Property getter EzJobCodeAssignEmployeeDialog.ezApiName
     *     2) Property getter EzJobCodeAssignEmployeeDialog.ezEventNames
     *     3) Property getter EzJobCodeAssignEmployeeDialog.ezInstance
     *     4) Property setter EzJobCodeAssignEmployeeDialog.ezInstance
     *     5) Property getter EzJobCodeAssignEmployeeDialog.ezApiRegistrationState
     *     6) Property setter EzJobCodeAssignEmployeeDialog.ezApiRegistrationState
     *     7) Property getter EzJobCodeAssignEmployeeDialog.#ezCanRegister
     *     8) Property getter EzJobCodeAssignEmployeeDialog.#ezIsRegistered
     *     9) Method EzJobCodeAssignEmployeeDialog.#ezRegistrator()
     */
    static {
        if (null == EzJobCodeAssignEmployeeDialog.ezApiRegistrationState) {
            EzJobCodeAssignEmployeeDialog.ezApiRegistrationState = EzRegistrationState.PENDING;

            document.addEventListener(
                EzJobCodeAssignEmployeeDialog.ezOnEzApiReadyEventName,
                () => {
                    if (!EzJobCodeAssignEmployeeDialog.#ezRegistrator()) {
                        document.addEventListener(
                            EzEventEngine.ezEventNames.onReady,
                            EzJobCodeAssignEmployeeDialog.#ezRegistrator);

                        document.addEventListener(
                            EzClockerContext.ezEventNames.onReady,
                            EzJobCodeAssignEmployeeDialog.#ezRegistrator);

                        document.addEventListener(
                            EzUI.ezEventNames.onReady,
                            EzJobCodeAssignEmployeeDialog.#ezRegistrator);

                        document.addEventListener(
                            EzDialog.ezEventNames.onReady,
                            EzJobCodeAssignEmployeeDialog.#ezRegistrator);
                    }
                });
        }
    }

    /**
     * @public @readonly @property
     * @returns {string}
     */
    get ezDialogId() {
        return 'EzJobCodeEmployeeAssignmentDialog';
    }

    /**
     * @public @readonly @property
     * Returns an object with UX categories and key = value entries where key = 'an html element name' and value = 'actual HTML element id' for commonly
     * referenced HTML element ids for this dialog.
     * @returns {object}
     */
    get ezIds() {
        return {
            dialogId: this.ezDialogId,
            labels: {
                availableEmployeeSelectInputLabelId: `${this.ezDialogId}_AvailableEmployeesSelectInputId_Label`,
                availableEmployeeSelectInputEditingLabelId: `${this.ezDialogId}_availableEmployeesSelectInputId_EditingLabel`
            },
            containers: {
                editActionsNoteContainerId: `${this.ezDialogId}_EditActionsNoteContainer`,
                primaryJobAlreadyAssignedMessageContainerId: `${this.ezDialogId}_PrimaryJobAlreadyAssignedMessageContainerId`,
                primaryJobCheckboxInputContainer: `${this.ezDialogId}_PrimaryJobCheckboxInputContainer`
            },
            inputs: {
                availableEmployeesSelectInputId: `${this.ezDialogId}_AvailableEmployeesSelectInput`,
                primaryJobCheckboxId: `${this.ezDialogId}_PrimaryJobCheckbox`
            },
            buttons: {
                assignButtonId: `${this.ezDialogId}_AssignButton`,
                updateAssignmentButton: `${this.ezDialogId}_UpdateAssignmentButton`,
                cancelButtonId: `${this.ezDialogId}_CancelButton`
            }
        };
    }

    /**
     * @private @field
     * Stores this dialog's EzDialogConfig object
     * @type {EzDialogConfig}
     */
    #ezDialogConfig = null;

    /**
     * @public @readonly @property
     * Gets this dialog's EzDialogConfig object.
     * @returns {EzDialogConfig}
     */
    get ezDialogConfig() {
        if (null == this.#ezDialogConfig) {
            this.#ezDialogConfig = new EzDialogConfig(this.ezDialogId);
            this.#ezDialogConfig.title = 'Assign Job to Employee';
            this.#ezDialogConfig.width = 600;
            this.#ezDialogConfig.dialogClass = 'ezDialog-no-close-button';
            this.#ezDialogConfig.buttons = [
                {
                    id: EzJobCodeAssignEmployeeDialog.ezInstance.ezIds.buttons.assignButtonId,
                    text: 'Assign',
                    click: EzJobCodeAssignEmployeeDialog.ezInstance.ezSubmit
                },
                {
                    id: EzJobCodeAssignEmployeeDialog.ezInstance.ezIds.buttons.updateAssignmentButton,
                    text: 'Update',
                    click: EzJobCodeAssignEmployeeDialog.ezInstance.ezSubmit
                },
                {
                    id: EzJobCodeAssignEmployeeDialog.ezInstance.ezIds.buttons.cancelButtonId,
                    text: 'Cancel',
                    click: EzJobCodeAssignEmployeeDialog.ezInstance.ezClose
                }
            ];
        }

        return this.#ezDialogConfig;
    }

    /**
     * @private @field
     * Stores the DataTag/JobCode the employee is or will get assigned to.
     * @returns {object}
     */
    #ezDataTag = null;

    /**
     * @public @property @getter
     * Returns the DataTag/JobCode the employee is or will get assigned to.
     * @returns {object}
     */
    get ezDataTag() {
        return this.#ezDataTag;
    }

    /**
     * @public @property @setter
     * Sets the DataTag/JobCode the employee is or will get assigned to.
     * @param {object} dataTag
     */
    set ezDataTag(dataTag) {
        this.#ezDataTag = EzObject.assignOrNull(dataTag);
    }

    /**
     * @private @field
     * Stores the editing DataTagMap index on the ezDataTag.ezDataTagMaps array.
     * Default is: null
     * @returns {number}
     */
    #ezEditingDataTagMapIndex = null;

    /**
     * @public @property @getter
     * Gets the editing DataTagMap index on the ezDataTag.ezDataTagMaps array.
     * @returns {null|number}
     */
    get ezEditingDataTagMapIndex() {
        return this.#ezEditingDataTagMapIndex;
    }

    /**
     * @public @property @setter
     * Sets the editing DataTagMap index on the ezDataTag.ezDataTagMaps array.
     * @param {undefined|null|number} editingDataTagMapIndex
     */
    set ezEditingDataTagMapIndex(editingDataTagMapIndex) {
        this.#ezEditingDataTagMapIndex = EzNumber.numberOrNull(editingDataTagMapIndex);
    }

    /**
     * @public @readonly @property
     * Returns the Editing DataTagMap instance for the ezEditingDataTagMapIndex
     * @returns {object}
     */
    get ezEditingDataTagMap() {
        return EzJobCodeAssignEmployeeDialog.ezInstance.ezGetDataTagDataTagMapForIndex(
            this.ezDataTag,
            this.ezEditingDataTagMapIndex);
    }

    /**
     * @private @field
     * Stores the id of the editing employee.
     * Default is:  null
     * @type {number}
     */
    #ezEditingEmployeeId = null;

    /**
     * @public @property @getter
     * Gets the id of the editing employee.
     * @returns {null|object}
     */
    get ezEditingEmployeeId() {
        return this.#ezEditingEmployeeId;
    }

    /**
     * @public @property @setter
     * Sets the id of the editing employee.
     * @param {null|object} employeesAvailableToAssign
     */
    set ezEditingEmployeeId(editingEmployeeId) {
        this.#ezEditingEmployeeId = EzNumber.numberOrNull(editingEmployeeId);
    }

    /**
     * @public @property @getter
     * Gets the reference to the editing employee
     * @returns {null|object}
     */
    get ezEditingEmployee() {
        return EzNumber.isNumber(this.ezEditingEmployeeId) && !isNaN(this.ezEditingEmployeeId) || 0 >= this.ezEditingEmployeeId
            ? ezApi.ezAssignOrNull(ezApi.ezclocker.ezClockerContext.ezGetSelectedEmployerAccountEmployeeAccountForEmployeeId(this.ezEditingEmployeeId))
            : null;
    }

    /**
     * @private @field
     * Stores the array of employee who are available to assign the data tag to.
     * Default is: []
     * @type {array}
     */
    #ezEmployeesAvailableToAssign = [];

    /**
     * @public @property @getter
     * Gets the array of employee who are available to assign the data tag to.
     * @returns {array}
     */
    get ezEmployeesAvailableToAssign() {
        return this.#ezEmployeesAvailableToAssign;
    }

    /**
     * @public @property @setter
     * Sets the array of employee who are available to assign the data tag to.
     * @param {array} employeesAvailableToAssign
     */
    set ezEmployeesAvailableToAssign(employeesAvailableToAssign) {
        this.#ezEmployeesAvailableToAssign = EzArray.isArray(employeesAvailableToAssign)
            ? employeesAvailableToAssign
            : [];
    }

    /**
     * @public @readonly @property
     * Returns the selected employeeId.
     * If the select list is not yet available, or does not have values or a selection then NAN is returned.
     * @returns {number}
     */
    get ezSelectedEmployeeId() {
        if (!ezApi.ezclocker.ezUi.ezElementExists(EzJobCodeAssignEmployeeDialog.ezInstance.ezIds.inputs.availableEmployeesSelectInputId)) {
            return NaN;
        }

        return ezApi.ezToNumber(
            ezApi.ezclocker.ezUi.ezGetInputValue(EzJobCodeAssignEmployeeDialog.ezInstance.ezIds.inputs.availableEmployeesSelectInputId));
    }

    /**
     * @public @readonly @property
     * Gets the selected employee's instance for the ezSelectedEmployeeId if that employeeId exists in the ezClockerContext.
     * If the ezSelectedEmployeeId is not a number, NAN, or less than zero then null is returned.
     * @returns {null|object}
     */
    get ezSelectedEmployee() {
        return EzNumber.isNumber(this.ezSelectedEmployeeId) && !isNaN(this.ezSelectedEmployeeId) || 0 >= this.ezSelectedEmployeeId
            ? ezApi.ezAssignOrNull(ezApi.ezclocker.ezClockerContext.ezGetSelectedEmployerAccountEmployeeAccountForEmployeeId(this.ezSelectedEmployeeId))
            : null;
    }

    /**
     * @private @field
     * Stores the current EzJobCodeAssignEmployeeDialogMode for the dialog.
     * Default is: EzJobCodeAssignEmployeeDialogMode.NEW_EMPLOYEE_ASSIGNMENT
     * @type {string}
     * A valid enum property value from EzJobCodeAssignEmployeeDialogMode
     */
    #ezJobCodeAssignEmployeeDialogMode = EzJobCodeAssignEmployeeDialogMode.NEW_EMPLOYEE_ASSIGNMENT;

    /**
     * @public @property @getter
     * Gets the current EzJobCodeAssignEmployeeDialogMode for the dialog.
     * @returns {string}
     * A valid enum property value from EzJobCodeAssignEmployeeDialogMode
     */
    get ezJobCodeAssignEmployeeDialogMode() {
        return this.#ezJobCodeAssignEmployeeDialogMode;
    }

    /**
     * @public @property @setter
     * Sets the current EzJobCodeAssignEmployeeDialogMode for the dialog.
     * @param {string} ezJobCodeAssignEmployeeDialogMode
     * A valid enum property value from EzJobCodeAssignEmployeeDialogMode
     */
    set ezJobCodeAssignEmployeeDialogMode(ezJobCodeAssignEmployeeDialogMode) {
        this.#ezJobCodeAssignEmployeeDialogMode = EzJobCodeAssignEmployeeDialogMode.ezAsEnum(ezJobCodeAssignEmployeeDialogMode);
    }

    /**
     * @protected @method
     * Initializes EzJobCodeAssignEmployeeDialog
     * @returns {EzJobCodeAssignEmployeeDialog}
     */
    ezInit() {
        ezApi.ezclocker.ezEventEngine.ezRegisterEvent(
            EzJobCodeAssignEmployeeDialog.ezApiName,
            EzJobCodeAssignEmployeeDialog.ezEventNames.onEzJobCodeAssignEmployeeDialogClose);

        ezApi.ezclocker.ezEventEngine.ezRegisterEvent(
            EzJobCodeAssignEmployeeDialog.ezApiName,
            EzJobCodeAssignEmployeeDialog.ezEventNames.onEzJobCodeAssignEmployeeDialogUpdatedEmployeeAssignment);

        EzJobCodeAssignEmployeeDialog.ezInstance.ezInitUx();

        return EzJobCodeAssignEmployeeDialog.ezInstance;
    }

    /**
     * @protected @method
     * Initializes the UX for EzJobCodeAssignEmployeeDialog
     */
    ezInitUx() {
        ezApi.ezclocker.ezUi.ezContent(
            '_HideDialogsDiv',
            EzJobCodeAssignEmployeeDialog.ezInstance.ezBuildDialogHTML());

        ezApi.ezclocker.ezDialog.ezInitDialogWithConfig(
            EzJobCodeAssignEmployeeDialog.ezInstance.ezDialogId,
            EzJobCodeAssignEmployeeDialog.ezInstance.ezDialogConfig);

        ezApi.ezclocker.ezEventEngine.ezWantElementEvent(
            EzJobCodeAssignEmployeeDialog.ezInstance.ezIds.inputs.availableEmployeesSelectInputId,
            EzElementEventName.CHANGE,
            EzJobCodeAssignEmployeeDialog.ezApiName,
            EzJobCodeAssignEmployeeDialog.ezInstance.ezHandleEmployeeSelectOnChangeEvent);
    }


    /**
     * @public @method
     * Shows the dialog UX
     * @param {object} ezDataTag
     * @param {undefiend|null|number} ezEditingDataTagMapIndex
     */
    ezShow(ezDataTag, ezEditingDataTagMapIndex) {
        if (!EzObject.isValid(ezDataTag)) {
            throw new EzBadParamException(
                'ezDataTag',
                EzJobCodeAssignEmployeeDialog.ezInstance,
                EzJobCodeAssignEmployeeDialog.ezInstance.ezShow);
        }

        EzJobCodeAssignEmployeeDialog.ezInstance.ezResetDialogUx();

        return EzNumber.isNumber(ezEditingDataTagMapIndex) && 0 <= ezEditingDataTagMapIndex
            // Editing mode
            ? EzJobCodeAssignEmployeeDialog.ezInstance.ezConfigureEditingEmployeeAssignmentMode(ezDataTag, ezEditingDataTagMapIndex)
                .then(
                    () => ezApi.ezclocker.ezUi.ezShowDialog(EzJobCodeAssignEmployeeDialog.ezInstance.ezDialogId))
            // New assignment mode
            : EzJobCodeAssignEmployeeDialog.ezInstance.ezConfigureNewEmployeeAssignmentMode(ezDataTag)
                .then(
                    () => ezApi.ezclocker.ezUi.ezShowDialog(EzJobCodeAssignEmployeeDialog.ezInstance.ezDialogId));
    }

    /**
     * @public @method
     * Closes the dialog, performing no submit actions
     */
    ezClose() {
        ezApi.ezclocker.ezUi.ezCloseDialog(EzJobCodeAssignEmployeeDialog.ezInstance.ezDialogId);
        EzJobCodeAssignEmployeeDialog.ezInstance.ezTriggerEzJobCodeAssignEmployeeDialogCloseEvent();
    }

    /**
     * @public @method
     * Submits the dialog (assigning the employee)
     */
    ezSubmit() {
        const selectedEmployeeId = ezApi.ezToNumber(
            ezApi.ezclocker.ezUi.ezGetInputValue(EzJobCodeAssignEmployeeDialog.ezInstance.ezIds.inputs.availableEmployeesSelectInputId));

        if (!EzNumber.isNumber(selectedEmployeeId) || 0 > selectedEmployeeId) {
            // Nothing selected
            return;
        }

        const isEmployeePrimaryDataTag = ezApi.ezclocker.ezUi.ezIsCheckboxChecked(
            EzJobCodeAssignEmployeeDialog.ezInstance.ezIds.inputs.primaryJobCheckboxId);

        const employee = ezApi.ezclocker.ezClockerContext.ezGetSelectedEmployerAccountEmployeeAccountForEmployeeId(selectedEmployeeId);

        if (!EzObject.isValid(employee)) {
            throw new EzBadStateException(
                ezApi.ezEM`
                    Expected a valid employee instance from call to
                    ezApi.ezclocker.ezClockerContext.ezGetSelectedEmployerAccountEmployeeAccountForEmployeeId(${selectedEmployeeId}).`,
                ezApi.ezEM`
                    Result from call to call to
                    ezApi.ezclocker.ezClockerContext.ezGetSelectedEmployerAccountEmployeeAccountForEmployeeId(${selectedEmployeeId}) was undefined or null.`,
                EzJobCodeAssignEmployeeDialog.ezInstance,
                EzJobCodeAssignEmployeeDialog.ezInstance.ezSubmit);
        }

        if (EzNumber.isNumber(EzJobCodeAssignEmployeeDialog.ezInstance.ezEditingDataTagMapIndex)) {
            EzJobCodeAssignEmployeeDialog.ezInstance.ezUpdateEmployeeDataTagMapForDataTagIndex(
                employee,
                EzJobCodeAssignEmployeeDialog.ezInstance.ezEditingDataTagMapIndex,
                isEmployeePrimaryDataTag);
        } else {
            // Create new DataTagMap assignment
            EzJobCodeAssignEmployeeDialog.ezInstance.ezCreateAssignEmployeeDataTagMap(
                employee,
                isEmployeePrimaryDataTag);
        }
    }

    /**
     * @protected @method
     * Resets the dialog UX to default values before data is loaded.
     */
    ezResetDialogUx() {
        // Reset dialog data to default values
        EzJobCodeAssignEmployeeDialog.ezInstance.ezDataTag = null;

        EzJobCodeAssignEmployeeDialog.ezInstance.ezEditingDataTagMapIndex = null;

        // Clean and enable the employee selection box
        ezApi.ezclocker.ezUi.ezEnableElement(
            EzJobCodeAssignEmployeeDialog.ezInstance.ezIds.inputs.availableEmployeesSelectInputId);

        ezApi.ezclocker.ezUi.ezSetContent(
            EzJobCodeAssignEmployeeDialog.ezInstance.ezIds.inputs.availableEmployeesSelectInputId,
            EzString.EMPTY);

        // Hide note about primary already assigned
        ezApi.ezclocker.ezUi.ezHideElement(
            EzJobCodeAssignEmployeeDialog.ezInstance.ezIds.containers.primaryJobAlreadyAssignedMessageContainerId);

        ezApi.ezclocker.ezUi.ezHideElement(
            EzJobCodeAssignEmployeeDialog.ezInstance.ezIds.containers.editActionsNoteContainerId);

        // Set primary checkbox as unchecked
        ezApi.ezclocker.ezUi.ezEnableElement(EzJobCodeAssignEmployeeDialog.ezInstance.ezIds.inputs.availableEmployeesSelectInputId);

        ezApi.ezclocker.ezUi.ezSetCheckboxValue(
            EzJobCodeAssignEmployeeDialog.ezInstance.ezIds.inputs.primaryJobCheckboxId,
            false);

        // Hide the update button
        ezApi.ezclocker.ezUi.ezHideElement(EzJobCodeAssignEmployeeDialog.ezInstance.ezIds.buttons.updateAssignmentButton);

        // Show the assign button
        ezApi.ezclocker.ezUi.ezShowElement(EzJobCodeAssignEmployeeDialog.ezInstance.ezIds.buttons.assignButtonId);
    }

    /**
     * @protected @method
     * Configured the dialog in editing existing employee assignment mode.
     * Requires: DataTag, DataTagMapIndex for DataTagMap that is being edited, employee assigned to DataTagMap that is being edited.
     */
    ezConfigureEditingEmployeeAssignmentMode(dataTag, dataTagMapIndex) {
        if (!EzObject.isValid(dataTag)) {
            throw new EzBadParamException(
                'ezDataTag',
                EzJobCodeAssignEmployeeDialog.ezInstance,
                EzJobCodeAssignEmployeeDialog.ezInstance.ezShow);
        }
        if (!EzNumber.isNumber(dataTagMapIndex)) {
            throw new EzBadParamException(
                'dataTagMapIndex',
                EzJobCodeAssignEmployeeDialog.ezInstance,
                EzJobCodeAssignEmployeeDialog.ezInstance.ezShow);
        }

        return ezApi.ezAsyncAction(
            (finished) => {
                EzJobCodeAssignEmployeeDialog.ezInstance.ezJobCodeAssignEmployeeDialogMode = EzJobCodeAssignEmployeeDialogMode.EDITING_EMPLOYEE_ASSIGNMENT;

                EzJobCodeAssignEmployeeDialog.ezInstance.ezDataTag = dataTag;

                EzJobCodeAssignEmployeeDialog.ezInstance.ezEditingDataTagMapIndex = dataTagMapIndex;

                if (!EzObject.isValid(EzJobCodeAssignEmployeeDialog.ezInstance.ezEditingDataTagMap)) {
                    throw new EzBadStateException(
                        `Expected a valid DataTagMap instance for index ${dataTagMapIndex} on the provided DataTag's ezDataTagMaps array property.`,
                        ezApi.ezEM`
                            Loopup of DataTagMap for index ${dataTagMapIndex} on the provided DataTag's ezDataTagMaps array property returned
                            an undefined or null instance.`,
                        EzJobCodeAssignEmployeeDialog.ezInstance,
                        EzJobCodeAssignEmployeeDialog.ezInstance.ezConfigureEditingEmployeeAssignmentMode);
                }

                if (!EzNumber.isNumber(EzJobCodeAssignEmployeeDialog.ezInstance.ezEditingDataTagMap.assignedEzEntityId)) {
                    throw new EzBadStateException(
                        `Expected a valid employeeId returned from property EzJobCodeAssignEmployeeDialog.ezInstance.ezEditingDataTagMap.assignedEzEntityId.`,
                        ezApi.ezEM`
                            EzJobCodeAssignEmployeeDialog.ezInstance.ezEditingDataTagMap.assignedEzEntityId returned value
                            ${EzJobCodeAssignEmployeeDialog.ezInstance.ezEditingDataTagMap.assignedEzEntityId} which is not conisdered a valid employee id.`,
                        EzJobCodeAssignEmployeeDialog.ezInstance,
                        EzJobCodeAssignEmployeeDialog.ezInstance.ezConfigureEditingEmployeeAssignmentMode);
                }

                EzJobCodeAssignEmployeeDialog.ezInstance.ezEditingEmployeeId = EzJobCodeAssignEmployeeDialog.ezInstance.ezEditingDataTagMap.assignedEzEntityId;

                if (!EzObject.isValid(EzJobCodeAssignEmployeeDialog.ezInstance.ezEditingEmployee)) {
                    throw new EzBadStateException(
                        ezApi.ezEM`
                            Expected a valid employee instance returned from call to
                            ezApi.ezclocker.ezClockerContext.ezGetSelectedEmployerAccountEmployeeAccountForEmployeeId(
                                ${EzJobCodeAssignEmployeeDialog.ezInstance.ezEditingEmployeeId}}.`,
                        ezApi.ezEM`
                            Call to ezApi.ezclocker.ezClockerContext.ezGetSelectedEmployerAccountEmployeeAccountForEmployeeId(
                            ${EzJobCodeAssignEmployeeDialog.ezInstance.ezEditingEmployeeId}} returned an undefined or null response.`,
                        EzJobCodeAssignEmployeeDialog.ezInstance,
                        EzJobCodeAssignEmployeeDialog.ezInstance.ezConfigureEditingEmployeeAssignmentMode);
                }

                if (!EzObject.isValid(EzJobCodeAssignEmployeeDialog.ezInstance.ezEditingEmployee.primaryJobCode)) {
                    return EzJobCodeAssignEmployeeDialog.ezInstance.ezLoadEmployeePrimaryJobCode(EzJobCodeAssignEmployeeDialog.ezInstance.ezEditingEmployee)
                        .then(
                            () => {
                                EzJobCodeAssignEmployeeDialog.ezInstance.ezLoadEditingEmployee();

                                return EzJobCodeAssignEmployeeDialog.ezInstance.ezUpdateUxState()
                                    .then(finished);
                            });
                }

                EzJobCodeAssignEmployeeDialog.ezInstance.ezLoadEditingEmployee();

                return EzJobCodeAssignEmployeeDialog.ezInstance.ezUpdateUxState()
                    .then(finished);
            });
    }

    /**
     * @protected @method
     * Configures the dialog in "new employee assignment" mode.
     * @param {object} dataTag
     */
    ezConfigureNewEmployeeAssignmentMode(dataTag) {
        if (!EzObject.isValid(dataTag)) {
            throw new EzBadParamException(
                'dataTag',
                EzJobCodeAssignEmployeeDialog.ezInstance,
                EzJobCodeAssignEmployeeDialog.ezInstance.ezShow);
        }

        return ezApi.ezAsyncAction(
            (finished) => {
                EzJobCodeAssignEmployeeDialog.ezInstance.ezJobCodeAssignEmployeeDialogMode = EzJobCodeAssignEmployeeDialogMode.NEW_EMPLOYEE_ASSIGNMENT;

                EzJobCodeAssignEmployeeDialog.ezInstance.ezDataTag = dataTag;

                EzJobCodeAssignEmployeeDialog.ezInstance.ezEditingEmployeeId = null;

                ezApi.ezclocker.ezUi.ezShowElement(EzJobCodeAssignEmployeeDialog.ezInstance.ezIds.buttons.assignButtonId);

                ezApi.ezclocker.ezUi.ezHideElement(EzJobCodeAssignEmployeeDialog.ezInstance.ezIds.buttons.updateAssignmentButton);

                return EzJobCodeAssignEmployeeDialog.ezInstance.ezLoadAvailableEmployees()
                    .then(finished);
            });
    }

    /**
     * @protected @method
     * Loads the provided employee as a editing employee.
     * Requires dialog mode EzJobCodeAssignEmployeeDialogMode.EDITING_EMPLOYEE_ASSIGNMENT
     */
    ezLoadEditingEmployee() {
        if (!EzJobCodeAssignEmployeeDialogMode.EDITING_EMPLOYEE_ASSIGNMENT === EzJobCodeAssignEmployeeDialog.ezInstance.ezJobCodeAssignEmployeeDialogMode) {
            throw new EzBadStateException(
                ezApi.ezEM`
                    Expecting the EzJobCodeAssignEmployeeDialog.ezInstance.ezJobCodeAssignEmployeeDialogMode
                    to equal ${EzJobCodeAssignEmployeeDialogMode.EDITING_EMPLOYEE_ASSIGNMENT}`,
                ezApi.ezEM`
                The EzJobCodeAssignEmployeeDialog.ezInstance.ezJobCodeAssignEmployeeDialogMode instead equals
                    ${EzJobCodeAssignEmployeeDialog.ezInstance.ezJobCodeAssignEmployeeDialogMode}`,
                EzJobCodeAssignEmployeeDialog.ezInstance,
                EzJobCodeAssignEmployeeDialog.ezInstance.ezLoadEditingEmployee);
        }
        if (!EzObject.isValid(EzJobCodeAssignEmployeeDialog.ezInstance.ezEditingEmployee)) {
            throw new EzBadStateException(
                'Expected a valid employee instance returned for call to EzJobCodeAssignEmployeeDialog.ezInstance.ezEditingEmployee',
                'Call to EzJobCodeAssignEmployeeDialog.ezInstance.ezEditingEmployee returned an undefined or null response.',
                EzJobCodeAssignEmployeeDialog.ezInstance,
                EzJobCodeAssignEmployeeDialog.ezInstance.ezLoadEditingEmployee);
        }

        EzJobCodeAssignEmployeeDialog.ezInstance.ezBuildEmployeeSelectOption(EzJobCodeAssignEmployeeDialog.ezInstance.ezEditingEmployee);

        ezApi.ezclocker.ezUi.ezDisableElement(
            EzJobCodeAssignEmployeeDialog.ezInstance.ezIds.inputs.availableEmployeesSelectInputId);
    }

    /**
     * @protected @method
     * Renders the dialog's available employees select box
     * @returns {Promise.resolve}
     */
    ezLoadAvailableEmployees() {
        // Clear existing content
        ezApi.ezclocker.ezUi.ezSetContent(
            EzJobCodeAssignEmployeeDialog.ezInstance.ezIds.inputs.availableEmployeesSelectInputId,
            EzString.EMPTY);

        const employees = ezApi.ezclocker.ezClockerContext.ezGetSelectedEmployerAccountEmployeeAccounts();

        if (!EzArray.arrayHasLength(employees)) {
            ezApi.ezclocker.ezUi.ezContent(
                EzJobCodeAssignEmployeeDialog.ezInstance.ezIds.inputs.availableEmployeesSelectInputId,
                '<option value="-1">No Employees Available</option>');

            return globalThis.ezApi.ezResolve();
        }

        return EzJobCodeAssignEmployeeDialog.ezInstance.ezBuildAvailableEmployeesSelectHtml(employees);
    }

    /**
     * @protected @method
     * Builds the available employees select input's html options.
     * @param {array} employees
     * @returns {Promise.resolve}
     */
    ezBuildAvailableEmployeesSelectHtml(employees) {
        if (!EzArray.isArray(employees)) {
            throw new EzBadParamException(
                'employees',
                EzJobCodeAssignEmployeeDialog.ezInstance,
                EzJobCodeAssignEmployeeDialog.ezInstance.ezBuildAvailableEmployeesSelectHtml);
        }

        if (!EzArray.arrayHasLength(employees)) {
            EzJobCodeAssignEmployeeDialog.ezInstance.ezBuildEmptyEmployeeSelect();
            return EzAsync.finished();
        }

        employees = ezApi.ezclocker.ezClockerContext.ezSortEmployeeArrayByName(employees);

        EzJobCodeAssignEmployeeDialog.ezInstance.ezEmployeesAvailableToAssign = [];

        return ezApi.ezclocker.ezUi.ezStartPageWaitResolve(
            'Loading employee job assignment data ...',
            (waitDone, finished) => {
                let employeeAddedCount = 0;

                /**
                 * @method
                 * Handles actions that need performed after an employee select option is build.
                 * @param {boolean} employeeAvailable
                 * @param {undefiend|null|object} employee
                 * @returns {*}
                 * Calls waitDone().then(finished) if all the employees have been processed.
                 * Otherwise, simply returns.
                 */
                const postBuildEmployeeSelectOption = (emplyeeAvailable, employee) => {
                    if (EzBoolean.isTrue(emplyeeAvailable)) {
                        EzJobCodeAssignEmployeeDialog.ezInstance.ezEmployeesAvailableToAssign.push(employee);
                    }

                    employeeAddedCount++;

                    if (employeeAddedCount < employees.length) {
                        return;
                    }

                    if (0 === EzJobCodeAssignEmployeeDialog.ezInstance.ezEmployeesAvailableToAssign.length) {
                        EzJobCodeAssignEmployeeDialog.ezInstance.ezBuildEmptyEmployeeSelect();
                    }

                    waitDone().then(finished);
                };

                for (let index = 0; index < employees.length; index++) {
                    const employee = employees[index];

                    if (!EzObject.isValid(employee)) {
                        postBuildEmployeeSelectOption(false, null);
                    } else if (!EzJobCodeAssignEmployeeDialog.ezInstance.ezIsEmployeeAlreadyAssigned(employee.id)) {
                        employee.ezEmployeeIndex = index;

                        EzJobCodeAssignEmployeeDialog.ezInstance.ezBuildEmployeeSelectOption(employee);

                        if (EzObject.isValid(employee.primaryJobCode)) {
                            postBuildEmployeeSelectOption(true, employee);
                        } else {
                            EzJobCodeAssignEmployeeDialog.ezInstance.ezLoadEmployeePrimaryJobCode(employee)
                                .then(
                                    () => postBuildEmployeeSelectOption(true, employee));
                        }
                    } else {
                        postBuildEmployeeSelectOption(false, null);
                    }
                }
            });
    }

    /**
     * @protected @method
     * Determines if the employeeId is already assigned to the data tag.
     * @param {number} employeeId
     * @returns {boolean}
     */
    ezIsEmployeeAlreadyAssigned(employeeId) {
        if (!EzArray.arrayHasLength(EzJobCodeAssignEmployeeDialog.ezInstance.ezDataTag.ezDataTagMaps)) {
            return false;
        }

        for (const dataTagMap of EzJobCodeAssignEmployeeDialog.ezInstance.ezDataTag.ezDataTagMaps) {
            if (employeeId === dataTagMap.assignedEzEntityId) {
                return true;
            }
        }

        return false;
    }

    /**
     * @protected @method
     * Updates the UX state based upon the data available for the dialog.
     * @returns {Promise.resolve}
     */
    ezUpdateUxState() {
        const employees = ezApi.ezclocker.ezClockerContext.ezGetSelectedEmployerAccountEmployeeAccounts();

        return ezApi.ezAsyncAction(
            (finished) => EzJobCodeAssignEmployeeDialog.ezInstance.ezUpdateStateDialogButtons(employees)
                .then(() => EzJobCodeAssignEmployeeDialog.ezInstance.ezUpdateStateSelectedEmployee(employees))
                .then(() => EzJobCodeAssignEmployeeDialog.ezInstance.ezUpdateStatePrimaryCheckbox(employees))
                .then(finished));
    }

    /**
     * @protected @method
     * Updates the dialog button states
     * @param {array} employees
     * @returns {Promise.resolve}
     */
    ezUpdateStateDialogButtons(employees) {
        return ezApi.ezAsyncAction(
            (finished) => {
                switch (EzJobCodeAssignEmployeeDialog.ezInstance.ezJobCodeAssignEmployeeDialogMode) {
                    case EzJobCodeAssignEmployeeDialogMode.EDITING_EMPLOYEE_ASSIGNMENT:
                        // Editing an existing employee assignment

                        // Hide the assign button
                        ezApi.ezclocker.ezUi.ezHideElement(EzJobCodeAssignEmployeeDialog.ezInstance.ezIds.buttons.assignButtonId);

                        // Show the update button
                        ezApi.ezclocker.ezUi.ezShowElement(EzJobCodeAssignEmployeeDialog.ezInstance.ezIds.buttons.updateAssignmentButton);

                        // Enable the update button
                        ezApi.ezclocker.ezUi.ezEnableElement(EzJobCodeAssignEmployeeDialog.ezInstance.ezIds.buttons.updateAssignmentButton);

                        return finished();
                    case EzJobCodeAssignEmployeeDialogMode.NEW_EMPLOYEE_ASSIGNMENT:
                        // Creating a new employee assignment

                        // Hide the update assignment button
                        ezApi.ezclocker.ezUi.ezHideElement(EzJobCodeAssignEmployeeDialog.ezInstance.ezIds.buttons.updateAssignmentButton);

                        if (!EzArray.arrayHasLength(employees)) {
                            // No employer employees available
                            ezApi.ezclocker.ezUi.ezHideElement(
                                EzJobCodeAssignEmployeeDialog.ezInstance.ezIds.buttons.assignButtonId);

                            return finished();
                        }

                        // Employer employees available

                        // Show the assign button
                        ezApi.ezclocker.ezUi.ezShowElement(EzJobCodeAssignEmployeeDialog.ezInstance.ezIds.buttons.assignButtonId);

                        if (!EzObject.isValid(EzJobCodeAssignEmployeeDialog.ezInstance.ezSelectedEmployee)) {
                            // No employee selected

                            // Disable the assign button
                            ezApi.ezclocker.ezUi.ezDisableElement(EzJobCodeAssignEmployeeDialog.ezInstance.ezIds.buttons.assignButtonId);

                            return finished();
                        }

                        // A employee is selected

                        // Enable the assign button
                        ezApi.ezclocker.ezUi.ezEnableElement(EzJobCodeAssignEmployeeDialog.ezInstance.ezIds.buttons.assignButtonId);

                        return finished();

                    default:
                        throw new EzBadStateException(
                            ezApi.ezEM`
                                Expected value of EzJobCodeAssignEmployeeDialog.ezInstance.ezJobCodeAssignEmployeeDialogMode to equal
                                ${EzJobCodeAssignEmployeeDialogMode.EDITING_EMPLOYEE_ASSIGNMENT} or
                                ${EzJobCodeAssignEmployeeDialogMode.NEW_EMPLOYEE_ASSIGNMENT}.`,
                            ezApi.ezEM`
                                Value of EzJobCodeAssignEmployeeDialog.ezInstance.ezJobCodeAssignEmployeeDialogMode is
                                ${EzJobCodeAssignEmployeeDialog.ezInstance.ezJobCodeAssignEmployeeDialogMode}`,
                            EzJobCodeAssignEmployeeDialog.ezInstance,
                            EzJobCodeAssignEmployeeDialog.ezInstance.ezUpdateStateDialogButtons);

                }
            });
    }

    /**
     * @protected @method
     * Updates the UX state for the selected employee
     * @param {array} employees
     * @returns {Promise.resolve}
     */
    ezUpdateStateSelectedEmployee(employees) {
        return ezApi.ezAsyncAction(
            (finished) => {
                let selectedEmployee;

                switch (EzJobCodeAssignEmployeeDialog.ezInstance.ezJobCodeAssignEmployeeDialogMode) {
                    case EzJobCodeAssignEmployeeDialogMode.EDITING_EMPLOYEE_ASSIGNMENT:
                        ezApi.ezclocker.ezUi.ezHideElement(
                            EzJobCodeAssignEmployeeDialog.ezInstance.ezIds.labels.availableEmployeeSelectInputLabelId);
                        ezApi.ezclocker.ezUi.ezShowElement(
                            EzJobCodeAssignEmployeeDialog.ezInstance.ezIds.labels.availableEmployeeSelectInputEditingLabelId);
                        // Nothing additional needs done
                        return finished();
                    case EzJobCodeAssignEmployeeDialogMode.NEW_EMPLOYEE_ASSIGNMENT:
                        ezApi.ezclocker.ezUi.ezShowElement(
                            EzJobCodeAssignEmployeeDialog.ezInstance.ezIds.labels.availableEmployeeSelectInputLabelId);
                        ezApi.ezclocker.ezUi.ezHideElement(
                            EzJobCodeAssignEmployeeDialog.ezInstance.ezIds.labels.availableEmployeeSelectInputEditingLabelId);

                        if (!EzArray.arrayHasLength(employees)) {
                            // No employees available to select
                            ezApi.ezclocker.ezUi.ezDisableElement(
                                EzJobCodeAssignEmployeeDialog.ezInstance.ezIds.inputs.availableEmployeesSelectInputId);

                            return finished();
                        }

                        selectedEmployee = EzJobCodeAssignEmployeeDialog.ezInstance.ezSelectedEmployee;

                        return EzObject.isValid(selectedEmployee) && !EzObject.isValid(selectedEmployee.primaryJobCode) &&
                            (!ezApi.ezIsBoolean(ezApi.ezPrimaryJobCodeLoaded) || ezApi.ezIsFalse(ezApi.ezPrimaryJobCodeLoaded))
                            ? EzJobCodeAssignEmployeeDialog.ezInstance.ezLoadEmployeePrimaryJobCode(selectedEmployee)
                                .then(finished)
                            : finished();
                    default:
                        throw new EzBadStateException(
                            EzString.em`
                                Expected value of EzJobCodeAssignEmployeeDialog.ezInstance.ezJobCodeAssignEmployeeDialogMode to equal
                                ${EzJobCodeAssignEmployeeDialogMode.EDITING_EMPLOYEE_ASSIGNMENT} or
                                ${EzJobCodeAssignEmployeeDialogMode.NEW_EMPLOYEE_ASSIGNMENT}.`,
                            EzString.em`
                                Value of EzJobCodeAssignEmployeeDialog.ezInstance.ezJobCodeAssignEmployeeDialogMode is
                                ${EzJobCodeAssignEmployeeDialog.ezInstance.ezJobCodeAssignEmployeeDialogMode}`,
                            EzJobCodeAssignEmployeeDialog.ezInstance,
                            EzJobCodeAssignEmployeeDialog.ezInstance.ezUpdateStateSelectedEmployee);
                }
            });
    }

    /**
     * @protected @method
     * Updates the Primary checkbox state based upon the data available for the dialog.
     * @returns {Promise.resolve}
     */
    ezUpdateStatePrimaryCheckbox() {
        return EzPromise.asyncAction(
            (finished) => {
                switch (EzJobCodeAssignEmployeeDialog.ezInstance.ezJobCodeAssignEmployeeDialogMode) {
                    case EzJobCodeAssignEmployeeDialogMode.EDITING_EMPLOYEE_ASSIGNMENT:
                        if (!EzObject.isValid(EzJobCodeAssignEmployeeDialog.ezInstance.ezEditingEmployee.primaryJobCode)) {
                            const dataTagMap = EzJobCodeAssignEmployeeDialog.ezInstance.ezDataTag.ezDataTagMaps[
                                EzJobCodeAssignEmployeeDialog.ezInstance.ezEditingDataTagMapIndex];

                            if (1 === dataTagMap.level) {
                                EzJobCodeAssignEmployeeDialog.ezInstance.ezEditingEmployee.primaryJobCode = dataTagMap;
                            } else {
                                EzJobCodeAssignEmployeeDialog.ezInstance.ezEditingEmployee.primaryJobCode = null;
                            }
                        }

                        if (EzObject.isValid(EzJobCodeAssignEmployeeDialog.ezInstance.ezEditingEmployee.primaryJobCode)) {
                            if (EzJobCodeAssignEmployeeDialog.ezInstance.ezDataTag.id ===
                                EzJobCodeAssignEmployeeDialog.ezInstance.ezEditingEmployee.primaryJobCode.dataTagId) {
                                // The EzJobCodeAssignEmployeeDialog.ezInstance.ezDataTag IS the primary job code for the editing employee.

                                // Hide info about primary assigned to different DataTag
                                ezApi.ezclocker.ezUi.ezHideElement(
                                    EzJobCodeAssignEmployeeDialog.ezInstance.ezIds.containers.primaryJobAlreadyAssignedMessageContainerId);

                                ezApi.ezclocker.ezUi.ezShowElement(
                                    EzJobCodeAssignEmployeeDialog.ezInstance.ezIds.containers.editActionsNoteContainerId);

                                // Enable the checkbox
                                ezApi.ezclocker.ezUi.ezEnableElement(EzJobCodeAssignEmployeeDialog.ezInstance.ezIds.inputs.primaryJobCheckboxId);

                                // Check the checkbox (is primary data tag)
                                ezApi.ezclocker.ezUi.ezSetCheckboxValue(
                                    EzJobCodeAssignEmployeeDialog.ezInstance.ezIds.inputs.primaryJobCheckboxId,
                                    true);

                                return finished();
                            }

                            // The EzJobCodeAssignEmployeeDialog.ezInstance.ezDataTag is NOT the primary job code for the editing employee.

                            ezApi.ezclocker.ezUi.ezHideElement(
                                EzJobCodeAssignEmployeeDialog.ezInstance.ezIds.containers.editActionsNoteContainerId);

                            // Show info about primary is a different DataTag
                            ezApi.ezclocker.ezUi.ezShowElement(
                                EzJobCodeAssignEmployeeDialog.ezInstance.ezIds.containers.primaryJobAlreadyAssignedMessageContainerId);

                            // Set the checkbox value to false (not primary)
                            ezApi.ezclocker.ezUi.ezSetCheckboxValue(
                                EzJobCodeAssignEmployeeDialog.ezInstance.ezIds.inputs.primaryJobCheckboxId,
                                false);

                            // Disable the checkbox to prevent setting it as the primary job code.
                            ezApi.ezclocker.ezUi.ezDisableElement(EzJobCodeAssignEmployeeDialog.ezInstance.ezIds.inputs.primaryJobCheckboxId);

                            return finished();
                        }

                        // No primary job code assigned

                        // Hide info about primary assigned to different DataTag
                        ezApi.ezclocker.ezUi.ezHideElement(EzJobCodeAssignEmployeeDialog.ezInstance.ezIds.containers.primaryJobAlreadyAssignedMessageContainerId);

                        ezApi.ezclocker.ezUi.ezShowElement(
                            EzJobCodeAssignEmployeeDialog.ezInstance.ezIds.containers.editActionsNoteContainerId);

                        // Enable the checkbox
                        ezApi.ezclocker.ezUi.ezEnableElement(EzJobCodeAssignEmployeeDialog.ezInstance.ezIds.inputs.primaryJobCheckboxId);

                        // Set the checkbox value to false (not primary)
                        ezApi.ezclocker.ezUi.ezSetCheckboxValue(
                            EzJobCodeAssignEmployeeDialog.ezInstance.ezIds.inputs.primaryJobCheckboxId,
                            false);

                        return finished();
                    case EzJobCodeAssignEmployeeDialogMode.NEW_EMPLOYEE_ASSIGNMENT:
                        if (!EzObject.isValid(EzJobCodeAssignEmployeeDialog.ezInstance.ezSelectedEmployee)) {
                            // No employee is selected

                            // Set the primary checkbox as false (not primary)
                            ezApi.ezclocker.ezUi.ezSetCheckboxValue(
                                EzJobCodeAssignEmployeeDialog.ezInstance.ezIds.inputs.primaryJobCheckboxId,
                                false);

                            // Disable the checkbox since no employee is selected
                            ezApi.ezclocker.ezUi.ezDisableElement(EzJobCodeAssignEmployeeDialog.ezInstance.ezIds.inputs.primaryJobCheckboxId);

                            return finished();
                        }

                        // Employee is selected

                        // Enable the primary job check box
                        ezApi.ezclocker.ezUi.ezEnableElement(EzJobCodeAssignEmployeeDialog.ezInstance.ezIds.inputs.primaryJobCheckboxId);

                        if (EzObject.isValid(EzJobCodeAssignEmployeeDialog.ezInstance.ezSelectedEmployee.primaryJobCode)) {
                            // Set the checbox value depending upon if the primary job code's id is equal to the
                            // EzJobCodeAssignEmployeeDialog.ezInstance.ezDataTag.id
                            ezApi.ezclocker.ezUi.ezSetCheckboxValue(
                                EzJobCodeAssignEmployeeDialog.ezInstance.ezIds.inputs.primaryJobCheckboxId,
                                EzJobCodeAssignEmployeeDialog.ezInstance.ezDataTag.id ===
                                EzJobCodeAssignEmployeeDialog.ezInstance.ezSelectedEmployee.primaryJobCode.id);

                            return finished();
                        }

                        // No primary job code for employee

                        // Set primary checkbox value to false (not primary)
                        ezApi.ezclocker.ezUi.ezSetCheckboxValue(
                            EzJobCodeAssignEmployeeDialog.ezInstance.ezIds.inputs.primaryJobCheckboxId,
                            false);

                        return finished();
                    default:
                        throw new EzBadStateException(
                            ezApi.ezEM`
                                Expected value of EzJobCodeAssignEmployeeDialog.ezInstance.ezJobCodeAssignEmployeeDialogMode to equal
                                ${EzJobCodeAssignEmployeeDialogMode.EDITING_EMPLOYEE_ASSIGNMENT} or
                                ${EzJobCodeAssignEmployeeDialogMode.NEW_EMPLOYEE_ASSIGNMENT}.`,
                            ezApi.ezEM`
                                Value of EzJobCodeAssignEmployeeDialog.ezInstance.ezJobCodeAssignEmployeeDialogMode is
                                ${EzJobCodeAssignEmployeeDialog.ezInstance.ezJobCodeAssignEmployeeDialogMode}`,
                            EzJobCodeAssignEmployeeDialog.ezInstance,
                            EzJobCodeAssignEmployeeDialog.ezInstance.ezUpdateStateSelectedEmployee);
                }
            });
    }

    /**
     * @protected @method
     * Handles the employee select input's onChange event.
     */
    ezHandleEmployeeSelectOnChangeEvent() {
        const selectedEmployeeId = EzJobCodeAssignEmployeeDialog.ezInstance.ezSelectedEmployeeId;

        if (isNaN(selectedEmployeeId) || !EzNumber.isNumber(selectedEmployeeId) || -1 === selectedEmployeeId) {
            return;
        }

        EzJobCodeAssignEmployeeDialog.ezInstance.ezUpdateUxState();
    }

    /**
     * @protected @method
     * Loads the selected employee into the UX
     * @param {object} employee
     * @returns {Promise.resolve}
     * A resolve only promise
     */
    ezLoadEmployeePrimaryJobCode(employee) {
        if (!EzObject.isValid(employee)) {
            throw new EzBadParamException(
                'employee',
                EzJobCodeAssignEmployeeDialog.ezInstance,
                EzJobCodeAssignEmployeeDialog.ezInstance.ezLoadEmployeePrimaryJobCode);
        }

        if (EzObject.isValid(employee.ezPrimaryJobCode)) {
            return ezApi.ezResolve(employee.ezPrimaryJobCode);
        }

        return ezApi.ezclocker.ezUi.ezPageWaitAsync(
            'Loading employee assignment ...',
            (waitDone, finished) => EzJobCodeAssignEmployeeDialog.ezInstance.ezGetPrimaryDataTag(employee)
                .then(
                    (dataTag) => {
                        employee.primaryJobCode = EzObject.assignOrNull(dataTag);
                        return waitDone().then(() => finished(employee));
                    }));
    }

    /**
     * @protected @method
     * Builds an empty employee select input and disables the ability to submit.
     */
    ezBuildEmptyEmployeeSelect() {
        ezApi.ezclocker.ezUi.ezContent(
            EzJobCodeAssignEmployeeDialog.ezInstance.ezIds.inputs.availableEmployeesSelectInputId,
            '<option value="-1">No Employees Available to Assign</option>');

        ezApi.ezclocker.ezUi.ezDisableElement(
            EzJobCodeAssignEmployeeDialog.ezInstance.ezIds.inputs.availableEmployeesSelectInputId);

        ezApi.ezclocker.ezUi.ezHideElement(
            EzJobCodeAssignEmployeeDialog.ezInstance.ezIds.containers.primaryJobCheckboxInputContainer);

        ezApi.ezclocker.ezUi.ezHideElement(
            EzJobCodeAssignEmployeeDialog.ezInstance.ezIds.buttons.assignButtonId);
    }

    /**
     * @protected @method
     * Builds an employee option for the available employees select box
     * @param {object} employee
     * @returns {Promise}
     * A resolve only promise
     */
    ezBuildEmployeeSelectOption(employee) {
        if (!EzObject.isValid(employee)) {
            return EzAsync.resolve(false);
        }

        let selected = EzString.EMPTY;

        if ((EzNumber.isNumber(EzJobCodeAssignEmployeeDialog.ezInstance.ezEditingEmployeeId) &&
            employee.id === EzJobCodeAssignEmployeeDialog.ezInstance.ezEditingEmployeeId) ||
            (EzNumber.isNumber(EzJobCodeAssignEmployeeDialog.ezInstance.ezSelectedEmployeeId) &&
                employee.id === EzJobCodeAssignEmployeeDialog.ezInstance.ezSelectedEmployeeId)) {
            selected = 'selected';
        }

        ezApi.ezclocker.ezUi.ezAppendContent(
            EzJobCodeAssignEmployeeDialog.ezInstance.ezIds.inputs.availableEmployeesSelectInputId,
            ezApi.ezTemplate`
                <option
                    id="EzEmployeePicker_Employee_${employee.id}"
                    value="${employee.id}"
                    ${selected}>
                    ${employee.employeeName}
                </option>`);

        return EzAsync.resolve(true);
    }

    /**
     * @protected @method
     * Returns the employee instance for the provided dataTagMap's assignedEzEntityId.
     * If dataTagMap.assignedEzEntityId is null or undefed then null is returned.
     * @param {object} dataTagMap
     * @return {null|object}
     */
    ezGetDataTagMapAssignedEmployee(dataTagMap) {
        if (!EzObject.isValid(dataTagMap)) {
            throw new EzBadParamException(
                'dataTagMap',
                EzJobCodeAssignEmployeeDialog.ezInstance,
                EzJobCodeAssignEmployeeDialog.ezInstance.ezGetDataTagMapAssignedEmployee);
        }

        if (!EzNumber.isNumber(dataTagMap.assignedEzEntityId)) {
            // Data tag does not have an assignedEzEntityId
            return null;
        }

        const assignedEmployee = ezApi.ezclocker.ezClockerContext.ezGetSelectedEmployerAccountEmployeeAccountForEmployeeId(dataTagMap.assignedEzEntityId);

        if (!EzObject.isValid(assignedEmployee)) {
            throw new EzBadStateException(
                `Expected a valid employee instance for employeeId=${dataTagMap.assignedEzEntityId}.`,
                `Employee look up resulted in an undefined or null employee instance.`,
                EzJobCodeAssignEmployeeDialog.ezInstance,
                EzJobCodeAssignEmployeeDialog.ezInstance.ezGetPrimaryDataTag);
        }

        return assignedEmployee;
    }

    /**
     * @protected @method
     * Obtains a selected employee's primary job code.
     * @param {object} employee
     * @returns {Promise.resolve}
     * Promise.resolve returns the assignedEmployee for the provided assignedEmployeeId with the primary data tag instance
     * assigned to the employee's ezPrimaryJobCode property.
     */
    ezGetPrimaryDataTag(employee) {
        if (!EzObject.isValid(employee)) {
            throw new EzBadParamException(
                'employee',
                EzJobCodeAssignEmployeeDialog.ezInstance,
                EzJobCodeAssignEmployeeDialog.ezInstance.ezGetPrimaryDataTag);
        }

        if (EzObject.isValid(employee.primaryJobCode)) {
            // Already has the primary job code attached
            return ezApi.ezResolve(employee.primaryJobCode);
        }

        return ezApi.ezPromise(
            (resolve) => ezApi.ezclocker.ezInternalDataTagMapApiClient.ezGetPrimaryDataTagForAssignedEntityTypeNameAssignedEntityId(
                EzEntityType.EMPLOYEE,
                employee.id)
                .then(
                    (ezEntityResponse) => {
                        employee.primaryJobCode = EzObject.isValid(ezEntityResponse.entity)
                            ? ezEntityResponse.entity
                            : null;
                        return resolve(employee.primaryJobCode);
                    },
                    (ezEntityErrorResponse) => {
                        employee.primaryJobCode = null;

                        return EzJobCodeAssignEmployeeDialog.ezInstance.ezShowGetPrimaryDataTagForEzEntityIdError(
                            ezEntityErrorResponse,
                            employee.id)
                            .then(
                                () => resolve(null));
                    }));
    }

    /**
     * @protected @method
     * Creates a new assign employee DataTagMap for the provided employee reference.
     * @param {object} employee
     * @param {undefined|null|boolean} isEmployeePrimaryDataTag
     * @returns {Promise.resolve}
     */
    ezCreateAssignEmployeeDataTagMap(employee, isEmployeePrimaryDataTag) {
        if (!EzObject.isValid(employee)) {
            throw new EzBadParamException(
                'employee',
                EzJobCodeAssignEmployeeDialog.ezInstance,
                EzJobCodeAssignEmployeeDialog.ezInstance.ezUpdateEmployeeDataTagMapForIndex);
        }

        const newEzDataTagMap = new EzDataTagMap(
            null,
            employee.employerId,
            EzJobCodeAssignEmployeeDialog.ezInstance.ezDataTag.id,
            EzEntityType.EMPLOYEE,
            employee.id,
            false,
            // level
            EzBoolean.isTrue(isEmployeePrimaryDataTag)
                ? 1
                : 0);

        return ezApi.ezclocker.ezUi.ezPageWaitAsync(
            'Adding employee assignment ...',
            (waitDone, finished) => ezApi.ezclocker.ezInternalDataTagMapApiClient.ezCreateAndAssignDataTagMapToEmployee(
                employee.id,
                newEzDataTagMap)
                .then(
                    (ezEntityResponse) => {
                        const dataTagMap = ezEntityResponse.entity;

                        EzJobCodeAssignEmployeeDialog.ezInstance.ezLastAddedEmployeeMapping = dataTagMap;

                        employee.primaryJobCode = EzBoolean.isTrue(isEmployeePrimaryDataTag)
                            ? dataTagMap
                            : null;

                        EzJobCodeAssignEmployeeDialog.ezInstance.ezClose();

                        EzJobCodeAssignEmployeeDialog.ezInstance.ezTriggerEzJobCodeAssignEmployeeDialogUpdatedEmployeeAssignmentEvent(dataTagMap);

                        return waitDone().then(finished);
                    },
                    (ezEntityErrorResponse) => EzJobCodeAssignEmployeeDialog.ezInstance.ezShowAssignEmployeeSubmitError(
                        ezEntityErrorResponse,
                        employee.id)
                        .then(waitDone)
                        .then(finished)));
    }

    /**
     * @protected @method
     * Updates an existing Assigned employee DataTagMap at dataTagMapIndex in EzJobCodeAssignEmployeeDialog.ezInstance.ezDataTag.ezDataTagMaps.
     * @param {object} employee
     * @param {number} dataTagmapIndex
     * @param {boolean} isEmployeePrimaryDataTag
     */
    ezUpdateEmployeeDataTagMapForDataTagIndex(employee, dataTagMapIndex, isEmployeePrimaryDataTag) {
        if (!EzObject.isValid(employee)) {
            throw new EzBadParamException(
                'employee',
                EzJobCodeAssignEmployeeDialog.ezInstance,
                EzJobCodeAssignEmployeeDialog.ezInstance.ezUpdateEmployeeDataTagMapForIndex);
        }
        if (!EzNumber.isNumber(dataTagMapIndex)) {
            throw new EzBadParamException(
                'dataTagMapIndex',
                EzJobCodeAssignEmployeeDialog.ezInstance,
                EzJobCodeAssignEmployeeDialog.ezInstance.ezUpdateEmployeeDataTagMapForIndex);
        }

        // Handle editing an existing DataTagMap assignment
        if (!EzNumber.isNumberWithinRange(dataTagMapIndex, 0, EzJobCodeAssignEmployeeDialog.ezInstance.ezDataTag.ezDataTagMaps.length - 1)) {
            throw new EzBadStateException(
                ezApi.ezEM`
                    Expecting the provided data tag map index of ${dataTagMapIndex} is greater than zero
                    and less than or equal to the number of DataTagMaps assigned to the active DataTag (job code)
                    (which is ${EzJobCodeAssignEmployeeDialog.ezInstance.ezDataTag.ezDataTagMaps.length - 1}).`,
                ezApi.ezEM`
                    The value of the provided data tag map index of ${dataTagMapIndex} is out of range
                    (minimum index = 0, maximum index = ${EzJobCodeAssignEmployeeDialog.ezInstance.ezDataTag.ezDataTagMaps.length - 1})
                    for the array of DataTagMaps assigned to the active DataTag (Job code).`,
                EzJobCodeAssignEmployeeDialog.ezInstance,
                EzJobCodeAssignEmployeeDialog.ezInstance.ezUpdateEmployeeDataTagMapForIndex);
        }

        const existingDataTagMap = EzJobCodeAssignEmployeeDialog.ezInstance.ezDataTag.ezDataTagMaps[dataTagMapIndex];

        if (!EzObject.isValid(existingDataTagMap)) {
            throw new EzBadStateException(
                `Expected a valid DataTagMap reference at index ${dataTagMapIndex} in the array of DataTagMaps assigned to the active DataTag (job code).`,
                `The value at index ${dataTagMapIndex} in the the array of DataTagMaps assigned to the active DataTag (job code) is undefined or null.`,
                EzJobCodeAssignEmployeeDialog.ezInstance,
                EzJobCodeAssignEmployeeDialog.ezInstance.ezSubmit);
        }

        existingDataTagMap.level = EzBoolean.isTrue(isEmployeePrimaryDataTag)
            ? 1
            : 0;

        return ezApi.ezclocker.ezUi.ezPageWaitAsync(
            'Updating the employee assignment ...',
            (waitDone, finished) => ezApi.ezclocker.ezInternalDataTagMapApiClient.ezUpdateDataTagMap(existingDataTagMap.id, existingDataTagMap)
                .then(
                    (ezEntityResponse) => {
                        const dataTagMap = ezEntityResponse.entity;

                        EzJobCodeAssignEmployeeDialog.ezInstance.ezDataTag.ezDataTagMaps[dataTagMapIndex] = dataTagMap;

                        employee.primaryJobCode = isEmployeePrimaryDataTag
                            ? dataTagMap
                            : null;

                        EzJobCodeAssignEmployeeDialog.ezInstance.ezClose();

                        EzJobCodeAssignEmployeeDialog.ezInstance.ezTriggerEzJobCodeAssignEmployeeDialogUpdatedEmployeeAssignmentEvent(dataTagMap);

                        return waitDone().then(finished);
                    },
                    (ezEntityErrorResponse) => EzJobCodeAssignEmployeeDialog.ezInstance.ezShowUpdateEmployeeAssignmentError(
                        ezEntityErrorResponse,
                        employee))
                .then(waitDone)
                .then(finished));
    }

    /**
     * @protected @method
     * Displays message for API errors
     * @param {object} eResponse
     * @param {string} errorTitle
     * @param {string} errorLogMessage
     * @param {string} userMessage
     * @param {*} optionalData
     */
    ezShowApiError(eResponse, errorTitle, errorLogMessage, userMessage, optionalData) {
        const et = EzString.stringHasLength(errorTitle)
            ? errorTitle
            : 'Job Code Error';

        const elm = EzObject.isValid(eResponse)
            ? `${errorLogMessage} ${ezApi.ezToJson(eResponse)}`
            : errorLogMessage;

        const uem = EzObject.isValid(eResponse)
            ? `${userMessage} ${eResponse.message}`
            : userMessage;

        const data = EzObject.isValid(optionalData)
            ? optionalData
            : eResponse;

        ezApi.ezclocker.ezLogger.error(elm);

        return ezApi.ezclocker.ezDialog.ezShowErrorDialog(et, uem, data);
    }

    /**
     * @protected @method
     * Shows error message when assign employee submision fails
     * @param {object} eResponse
     * @param {number} employeeId
     * @returns {Promise.resolve}
     */
    ezShowAssignEmployeeSubmitError(eResponse, employeeId) {
        return EzJobCodeAssignEmployeeDialog.ezInstance.ezShowApiError(
            eResponse,
            'Assign Employee to Job Error',
            ezApi.ezEM`
                Failed to assign the employee with employeeId=${employeeId} to
                the job with jobCodeId=${EzJobCodeAssignEmployeeDialog.ezInstance.ezDataTag.id}`,
            'Unable to assign employee to a job at this time.');
    }

    /**
     * @protected @method
     * Shows an error message when the update employee assignment api calls fail
     * @param {object} eResponse
     * @param {object} employee
     * @returns {Promise.resolve}
     */
    ezShowUpdateEmployeeAssignmentError(eResponse, employee) {
        return EzJobCodeAssignEmployeeDialog.ezInstance.ezShowApiError(
            eResponse,
            'Update Employee Job Assignment Error',
            ezApi.ezEM`
                Failed to update the employee with employeeId=${employee.id.toString()} assignment
                to the job with jobCodeId=${EzJobCodeAssignEmployeeDialog.ezInstance.ezDataTag.id.toString()}`,
            ezApi.ezEM`Unable to updated ${employee.employeeName}'s job assignment at this time.`);
    }

    /**
     * @protected @method
     * Shows an error message when calls to get the primary data tag fail
     * @param {object} eResponse,
     * @param {number} employeeId
     * @returns {Promise.resolve}
     */
    ezShowGetPrimaryDataTagForEzEntityIdError(eResponse, employeeId) {
        return EzJobCodeAssignEmployeeDialog.ezInstance.ezShowApiError(
            eResponse,
            'Employee Job Assignment Error',
            ezApi.ezEM`
                Failed to obtain the primary job code of the selected employee with
                employeeId=${EzNumber.isNumber(employeeId) ? employeeId.toString() : 'UNKNOWN'}.`,
            'Unable to determine if the selected employee has a primary job code assignment at this time.');
    }

    /**
     * @protected @method
     * Gets the DataTagMap at the provided dataTagMapIndex in the provided dataTag's ezDataTagMaps array property.
     * @param {object} dataTag
     * @param {number} dataTagMapIndex
     * @returns {object}
     */
    ezGetDataTagDataTagMapForIndex(dataTag, dataTagMapIndex) {
        if (!EzObject.isValid(dataTag)) {
            throw new EzBadParamException(
                'dataTag',
                EzJobCodeAssignEmployeeDialog.ezInstance,
                EzJobCodeAssignEmployeeDialog.ezInstance.ezGetDataTagDataTagMapForIndex);
        }
        if (!EzArray.isArray(dataTag.ezDataTagMaps)) {
            dataTag.ezDataTagMaps = [];
        }
        if (!EzNumber.isNumber(dataTagMapIndex)) {
            throw new EzBadParamException(
                'dataTagMapIndex',
                EzJobCodeAssignEmployeeDialog.ezInstance,
                EzJobCodeAssignEmployeeDialog.ezInstance.ezGetDataTagDataTagMapForIndex);
        }
        if (0 > dataTagMapIndex || dataTagMapIndex >= dataTag.ezDataTagMaps.length) {
            throw new EzBadParamException(
                'dataTagMapIndex',
                EzJobCodeAssignEmployeeDialog.ezInstance,
                EzJobCodeAssignEmployeeDialog.ezInstance.ezGetDataTagDataTagMapForIndex);
        }

        return dataTag.ezDataTagMaps[dataTagMapIndex];
    }

    /**
     * @protected @method
     * Triggers the EzJobCodeAssignEmployeeDialog.ezEventNames.onEzJobCodeAssignEmployeeDialogClose event.
     */
    ezTriggerEzJobCodeAssignEmployeeDialogCloseEvent() {
        ezApi.ezclocker.ezEventEngine.ezTriggerEvent(
            EzJobCodeAssignEmployeeDialog.ezEventNames.onEzJobCodeAssignEmployeeDialogClose,
            ezApi.ezclocker.ezEventEngine.ezBuildEventData(
                EzJobCodeAssignEmployeeDialog.ezApiName,
                'Assign Job Code to Employe dialog closed.'));
    }

    /**
     * @protected @method
     * Triggers the EzJobCodeAssignEmployeeDialog.ezEventNames.onEzJobCodeAssignEmployeeDialogUpdatedEmployeeAssignment event.
     * @param {object} updatedDataTagMap
     */
    ezTriggerEzJobCodeAssignEmployeeDialogUpdatedEmployeeAssignmentEvent(updatedDataTagMap) {
        if (!EzObject.isValid(updatedDataTagMap)) {
            throw new EzBadParamException(
                'updatedDataTagMap',
                EzJobCodeAssignEmployeeDialog.ezInstance,
                EzJobCodeAssignEmployeeDialog.ezInstance.ezTriggerEzJobCodeAssignEmployeeDialogUpdatedEmployeeAssignmentEvent);
        }

        ezApi.ezclocker.ezEventEngine.ezTriggerEvent(
            EzJobCodeAssignEmployeeDialog.ezEventNames.onEzJobCodeAssignEmployeeDialogUpdatedEmployeeAssignment,
            ezApi.ezclocker.ezEventEngine.ezBuildEventData(
                EzJobCodeAssignEmployeeDialog.ezApiName,
                `Updated job assignment for employeeId=${EzJobCodeAssignEmployeeDialog.ezInstance.ezEditingEmployeeId}.`,
                {
                    updatedDataTagMap,
                    mode: EzJobCodeAssignEmployeeDialog.ezInstance.ezJobCodeAssignEmployeeDialogMode,
                    employeeId: EzJobCodeAssignEmployeeDialog.ezInstance.ezEditingEmployeeId,
                    dataTag: EzJobCodeAssignEmployeeDialog.ezInstance.ezDataTag,
                    dataTagMapIndex: EzJobCodeAssignEmployeeDialog.ezInstance.ezEditingDataTagMapIndex
                }));
    }

    /**
     * @protected @method
     * Builds the UX HTML for the dialog.
     * @returns {string}
     */
    ezBuildDialogHTML() {
        const primaryJobQuickHelpButton = EzHtml.button(
            // id
            `${EzJobCodeAssignEmployeeDialog.ezInstance.ezDialogId}_PrimaryJobHelp_Button`,
            // classes
            'ezButtons-quick-help',
            // title
            'Click to learn about Primary Jobs.',
            // onclick
            'ezApi.ezclocker.ezJobCodeDialog.ezShowPrimaryJobHelpPopUp()',
            // optionalAttributes
            null,
            // content
            'What is a Primary Job?');

        return EzHtml.build`
            <div
                id="${EzJobCodeAssignEmployeeDialog.ezInstance.ezDialogId}"
                title="Assign an Employee to this Job Code">
                <div
                    id="${EzJobCodeAssignEmployeeDialog.ezInstance.ezDialogId}_Content"
                    class="ezJobCodeAssignEmployeeDialog-content-container">
                    <div
                        id="${EzJobCodeAssignEmployeeDialog.ezInstance.ezDialogId}_EmployeeSelectContainer">
                        <label
                            id="${EzJobCodeAssignEmployeeDialog.ezInstance.ezIds.labels.availableEmployeeSelectInputLabelId}"
                            for="${EzJobCodeAssignEmployeeDialog.ezInstance.ezIds.inputs.availableEmployeesSelectInputId}"
                            class="ezJobCodeInputLabel">
                            Select the employee to assign to the job:
                        </label>
                        <label
                            id="${EzJobCodeAssignEmployeeDialog.ezInstance.ezIds.labels.availableEmployeeSelectInputEditingLabelId}"
                            for="${EzJobCodeAssignEmployeeDialog.ezInstance.ezIds.inputs.availableEmployeesSelectInputId}"
                            class="ezJobCodeInputLabel"
                            style="display:none">
                            Assigned Employee:
                        </label>
                        <select
                            id="${EzJobCodeAssignEmployeeDialog.ezInstance.ezIds.inputs.availableEmployeesSelectInputId}"
                            class="ezFullWidthEditor">
                        </select>
                    </div>
                    <div
                        id="${EzJobCodeAssignEmployeeDialog.ezInstance.ezIds.containers.primaryJobCheckboxInputContainer}"
                        class="ezCheckboxContainer">
                        <label
                            id="${EzJobCodeAssignEmployeeDialog.ezInstance.ezIds.inputs.primaryJobCheckboxId}_Label"
                            for="${EzJobCodeAssignEmployeeDialog.ezInstance.ezIds.inputs.primaryJobCheckboxId}">
                            <input
                                id="${EzJobCodeAssignEmployeeDialog.ezInstance.ezIds.inputs.primaryJobCheckboxId}"
                                type="checkbox"/>
                            Set as Employee's Primary Job.
                        </label>
                        <div
                            id="${EzJobCodeAssignEmployeeDialog.ezInstance.ezDialogId}_PrimaryJobQuickHelpContainer">
                            ${primaryJobQuickHelpButton}
                        </div>
                    </div>
                    <div
                        id="${EzJobCodeAssignEmployeeDialog.ezInstance.ezDialogId}_HelpTipsContainer">
                        <div
                            id="${EzJobCodeAssignEmployeeDialog.ezInstance.ezIds.containers.editActionsNoteContainerId}"
                            class="ezText-small-navy"
                            style="display:none">
                            Note: Only the Primary Job assignment is editable. If you wish to use a different employee please delete this employee's assignment and
                            then add the new employee within Manage Jobs.
                        </div>
                        <div
                            id="${EzJobCodeAssignEmployeeDialog.ezInstance.ezIds.containers.primaryJobAlreadyAssignedMessageContainerId}"
                            class="primaryJobAssignedElsewhereMessage">
                            Employee's Primary Job is assigned to a different Job. If you wish to change the Primary Job of the employee you will need to first remove
                            the current Primary Job assignment.
                        </div>
                    </div>
                </div>
            </div>`;
    }
}
