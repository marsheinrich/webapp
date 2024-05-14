import {
    EzObject,
    EzNumber,
    EzBoolean,
    EzString,
    EzArray,
    EzHtml,
    EzPromise
} from '/ezlibrary/helpers/EzHelpers.js';

import { EzElementEventName } from '/ezlibrary/EzElementEventName.js';

/**
    EzClocker's employee selection combo box component
 */
export class EzSelectEmployeeComboBox {
    /**
        @public @constructor
        Creates a new instance of EzSelectEmployeeComboBox
        @param {string} nameId
        Element id for the employee select combo box
     */
    constructor(nameId) {
        this.ezTypeName = 'EzSelectEmployeeComboBox';

        this.ezParentId = null;

        this.ezNameId = EzString.stringHasLength(nameId)
            ? nameId
            : 'EzSelectEmployeeComboBox';

        this.ezContainerId = `${this.ezNameId}_Container`;
        this.ezSelectInputId = `${this.ezNameId}_SelectInput`;
        this.ezAddEmployeeButtonId = `${this.ezNameId}_AddEmployeeButton`;
        this.ezStyleId = `${this.ezNameId}_Style`;

        this.ezEventNames = {
            onSelectedEmployeeChanged: `on${this.ezNameId}_SelectedEmployee_Changed`,
            onAddEmployeeButtonClicked: `on${this.ezNameId}_AddEmployee_Clicked`,
        };

        // Register events for control
        ezApi.ezclocker.ezEventEngine.ezRegisterEvent(
            this.ezNameId,
            this.ezEventNames.onSelectedEmployeeChanged);

        ezApi.ezclocker.ezEventEngine.ezRegisterEvent(
            this.ezNameId,
            this.ezEventNames.onAddEmployeeButtonClicked);
    }

    /**
        @public
        Inserts the combo box into the provided parent id.
        @param {String} parentId
        @param {String|null} nameId
        @param {Array|null} employees,
        @param {Number|String|null} selectedEmployeeId
     */
    ezInsert(parentId, employees, selectedEmployeeId) {
        let self = ezApi.ezSelfFromThis('EzSelectEmployeeComboBox', this);

        if (!EzString.stringHasLength(parentId)) {
            throw ezApi.ezBadParam('parentId', self.ezTypeName, 'ezInsert');
        }

        if (!EzNumber.isNumber(selectedEmployeeId)) {
            selectedEmployeeId = EzString.stringHasLength(selectedEmployeeId)
                ? parseint(selectedEmployeeId)
                : -1;
        }

        if (!EzArray.arrayHasLength(employees)) {
            employees = [];
        }

        // Remove any existing with the same name/setup
        self.ezRemove();

        self.ezParentId = parentId;

        ezApi.ezclocker.ezUi.ezContent(self.ezParentId,
            self.ezBuildSelectEmployeeComboBoxHtml(
                self.ezNameId,
                self.ezBuildSelectOptions(employees, selectedEmployeeId)));

        ezApi.ezclocker.ezEventEngine.ezWantElementEvent(
            self.ezSelectInputId,
            EzElementEventName.CHANGE,
            self.ezNameId,
            (event) => ezApi.ezclocker.ezEventEngine.ezTriggerEvent(
                self.ezEventNames.onSelectedEmployeeChanged,
                ezApi.ezclocker.ezEventEngine.ezBuildEventData(
                    self.ezNameId,
                    'Selected employee changed',
                    {
                        instanceName: self.ezNameId,
                        event: event,
                        selectedEmployeeId: parseInt(ezApi.ezclocker.ezUi.ezGetInputValue(self.ezSelectInputId))
                    })));

        ezApi.ezclocker.ezEventEngine.ezWantElementEvent(
            self.ezAddEmployeeButtonId,
            EzElementEventName.CLICK,
            self.ezNameId,
            (event) => ezApi.ezclocker.ezEventEngine.ezTriggerEvent(
                self.ezEventNames.onAddEmployeeButtonClicked,
                ezApi.ezclocker.ezEventEngine.ezBuildEventData(
                    self.ezNameId,
                    'Add employee button clicked',
                    {
                        instanceName: self.ezNameId,
                        event: event
                    })));
    }

    /**
        @public
        Removes the combo box from the parentId and disconnects the events
     */
    ezRemove() {
        let self = ezApi.ezSelfFromThis('EzSelectEmployeeComboBox', this);

        if (!ezApi.ezclocker.ezUi.ezElementExists(self.ezContainerId)) {
            return;
        }

        ezApi.ezclocker.ezEventEngine.ezUnwantElementEvent(
            self.ezSelectInputId,
            EzElementEventName.CHANGE,
            self.ezNameId);

        ezApi.ezclocker.ezUi.ezRemove(self.ezContainerId);
        ezApi.ezclocker.ezUi.ezRemove(self.ezStyleId);

        self.ezParentId = null;
    }

    /**
        @public
        Shows the combo box if it exists and is hidden
        @param {Boolean|null} triggerInitialSelection
     */
    ezShow(triggerInitialSelection) {
        let self = ezApi.ezSelfFromThis('EzSelectEmployeeComboBox', this);

        if (ezApi.ezclocker.ezUi.ezElementExists(self.ezContainerId)) {
            ezApi.ezclocker.ezUi.ezShowElement(self.ezContainerId);
        }

        if (EzBoolean.isTrue(triggerInitialSelection)) {
            ezApi.ezclocker.ezEventEngine.ezTriggerEvent(
                self.ezEventNames.onSelectedEmployeeChanged,
                ezApi.ezclocker.ezEventEngine.ezBuildEventData(
                    self.ezNameId,
                    'Selected employee changed',
                    {
                        instanceName: self.ezNameId,
                        event: null,
                        selectedEmployeeId: parseInt(ezApi.ezclocker.ezUi.ezGetInputValue(self.ezSelectInputId))
                    }));
        }
    }

    /**
        @public
        Hides the combo box if it exists and is visible
     */
    ezHide() {
        let self = ezApi.ezSelfFromThis('EzSelectEmployeeComboBox', this);

        if (ezApi.ezclocker.ezUi.ezElementExists(self.ezContainerId)) {
            ezApi.ezclocker.ezUi.ezHideElement(self.ezContainerId);
        }
    }

    /**
        @public
        Enables the add employee button
     */
    ezEnableAddEmployeeButton() {
        let self = ezApi.ezSelfFromThis('EzSelectEmployeeComboBox', this);

        ezApi.ezclocker.ezUi.ezEnable(self.ezAddEmployeeButtonId);
    }

    /**
        @public
        Disables the add employee button
     */
    ezDisableAddEmployeeButton() {
        let self = ezApi.ezSelfFromThis('EzSelectEmployeeComboBox', this);

        ezApi.ezclocker.ezUi.ezDisable(self.ezAddEmployeeButtonId);
    }

    /**
        @public
        Updates the availabl employees in the combo box.
        @param {Array|null} employees
        @param {Number|String|null} selectedEmployeeId
     */
    ezUpdateAvailableEmployees(employees, selectedEmployeeId) {
        let self = ezApi.ezSelfFromThis('EzSelectEmployeeComboBox', this);

        if (!ezApi.ezclocker.ezUi.ezElementExists(self.ezContainerId)) {
            throw ezApi.ezException(
                `EzSelectEmployeeComboBox for id ${self.ezContainerId} is not within the current document.`);
        }

        let selectionChanged = selectedEmployeeId.toString() === ezApi.ezclocker.ezUi.ezGetInputValue(self.ezSelectInputId);

        if (!EzNumber.isNumber(selectedEmployeeId)) {
            selectedEmployeeId = EzString.stringHasLength(selectedEmployeeId)
                ? parseint(selectedEmployeeId)
                : -1;
        }

        if (!EzArray.arrayHasLength(employees)) {
            employees = [];
        }

        // Disconnect change event while updating the available employees
        ezApi.ezclocker.ezEventEngine.ezUnwantElementEvent(
            self.ezSelectInputId,
            EzElementEventName.CHANGE,
            self.ezNameId);

        ezApi.ezclocker.ezUi.ezContent(
            self.ezSelectInputId,
            self.ezBuildSelectOptions(employees, selectedEmployeeId));

        // Reconnect the change event
        ezApi.ezclocker.ezEventEngine.ezWantElementEvent(
            self.ezSelectInputId,
            EzElementEventName.CHANGE,
            self.ezNameId,
            (event) => ezApi.ezclocker.ezEventEngine.ezTriggerEvent(
                self.ezEventNames.onSelectedEmployeeChanged,
                ezApi.ezclocker.ezEventEngine.ezBuildEventData(
                    self.ezNameId,
                    'Selected employee changed', {
                        instanceName: self.ezNameId,
                        event: event,
                        selectedEmployeeId: parseInt(ezApi.ezclocker.ezUi.ezGetInputValue(self.ezSelectInputId))
                    })));

        // Trigger the change event if the selected employee id is different than current
        if (EzBoolean.isTrue(selectionChanged)) {
            ezApi.ezclocker.ezEventEngine.ezTriggerEvent(
                self.ezEventNames.onSelectedEmployeeChanged,
                ezApi.ezclocker.ezEventEngine.ezBuildEventData(
                    self.ezNameId,
                    'Selected employee changed', {
                        instanceName: self.ezNameId,
                        event: null,
                        selectedEmployeeId: parseInt(ezApi.ezclocker.ezUi.ezGetInputValue(self.ezSelectInputId))
                    }));
        }
    }

    /**
        @protected
        Builds the combo box's options HTML
        @param {Array} employees,
        @param {Number} selectedEmployeeId
     */
    ezBuildSelectOptions(employees, selectedEmployeeId) {
        let self = ezApi.ezSelfFromThis('EzSelectEmployeeComboBox', this);

        if (!EzArray.arrayHasLength(employees)) {
            return EzHtml.build`
                <option
                    value="-1"
                    selected>
                    No Employees
                </option>`;
        }

        let noEmployeeSelected = -1 === parseInt(selectedEmployeeId)
            ? 'selected'
            : '';

        let selectOptions = EzHtml.build`
            <option
                id="${self.ezNameId}_SelectAEmployee"
                value="-1"
                ${noEmployeeSelected}>
                [ Select an Employee ]
            </option>`;

        employees.forEach((employee) => {
            let isSelected = employee.id === parseInt(selectedEmployeeId)
                ? 'selected'
                : '';

            selectOptions += EzHtml.build`
                <option
                    id="${self.ezNameId}_Employee_${employee.id}"
                    value="${employee.id}" ${isSelected}>
                    ${employee.employeeName}
                </option>`;
        });

        return selectOptions;
    }

    /**
        @protected
        Builds the combo box HTML
        @param {String} nameId
        @param {String} selectOptions
     */
    ezBuildSelectEmployeeComboBoxHtml(selectOptions) {
        let self = ezApi.ezSelfFromThis('EzSelectEmployeeComboBox', this);

        return EzHtml.build`
            <style
                id="${self.ezStyleId}">
                .ezSelectEmployeeComboBoxContainer {
                    display: contents;
                }
                .ezEmployeeSelect {
                    min-width: 200px;
                }
            </style>
            <div
                id="${self.ezContainerId}"
                class="ezSelectEmployeeComboBoxContainer"
                style="display:none">
                <label
                    for="${self.ezSelectInputId}">
                    Viewing Employee:
                </label>
                <select
                    id="${self.ezSelectInputId}"
                    class="ezSelectEmployeeComboBoxInput ezEmployeeSelect">
                    ${selectOptions}
                </select>
                <button
                    id="${self.ezAddEmployeeButtonId}"
                    class="ezMajorButton">
                    Add Employee
                </button>
            </div>`;
    }
}
