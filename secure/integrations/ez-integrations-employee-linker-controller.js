/* exported EzEmployeeLinkerWizardPage */
/**
 * @public
 * Controller for the ezClocker Integrations Employee Linker wizard page.
 * NOTE: This page is not auto-create or register with ezApi. Use ezApi.ezNew(EzEmployeeLinkerWizardPage) to create an instance of this object.
 */
class EzEmployeeLinkerWizardPage {
    constructor(parentId, integrationProviderId, ezEmployeeLinkerWizardPageApiId) {
        this.ready = false;

        this.ezWizardPageParentId = parentId;
        this.ezIntegrationProviderId = ezApi.ezIsValid(integrationProviderId)
            ? integrationProviderId
            : ezApi.EzIntegrationProviderId.UNKNOWN;

        // Set the global ID for this page
        EzEmployeeLinkerWizardPage.ezApiName = ezApi.ezIsNotEmptyString(ezEmployeeLinkerWizardPageApiId)
            ? ezEmployeeLinkerWizardPageApiId
            : EzEmployeeLinkerWizardPage.ezApiName;

        // Register with ezApi
        ezApi.ezRegisterApi(EzEmployeeLinkerWizardPage.ezApiName, this);

        this.ezWizardPageTemplate = '';


        this.ezEmployeeLinkerValues = {};
        this.extEmployeeLinkerValues = {};
    }

    /**
     * @protected
     * Initializes the EzEmployeeLinkerWizardPage
     * @returns {EzEmployeeLinkerWizardPage}
     */
    ezInit() {
        const self = ezApi.ezclocker[EzEmployeeLinkerWizardPage.ezApiName];

        self.ezInitUX();

        self.ready = true;

        return self;
    }

    /**
     * @protected
     * Initialzies the UX for EzEmployeeLinkerWizardPage
     */
    ezInitUX() {
        const self = ezApi.ezclocker[EzEmployeeLinkerWizardPage.ezApiName];

        //NOTE: ezClocker employees are obtained from the ezApi.ezclocker.ezClockerContext class
        ezUi.ezStartPageWait('Loading integration employees...', function(waitDone) {
            self.ezLoadWizardPageTemplate()
                .then(self.ezInjectWizardPage)
                .then(self.ezLoadIntegrationEmployees)
                .then(self.ezRenderUx)
                .then(self.ezHookWizardEvents)
                .then(waitDone);
        });
    }

    /**
     * @protected
     * Hooks EzWizard events that this page reactos too.
     */
    ezHookWizardEvents() {
        const self = ezApi.ezclocker[EzEmployeeLinkerWizardPage.ezApiName];
        ezApi.ezclocker[window.EZ_WIZARD_API_ID].ezOnWizardSave = self.ezSaveEmployeeMaps;

        return ezApi.ezResolve();
    }

    /**
     * @public
     * Saves the employee maps
     */
    ezSaveEmployeeMaps() {
        const self = ezApi.ezclocker[EzEmployeeLinkerWizardPage.ezApiName];

        return ezApi.ezPromise(function(resolve) {
            function ezHandlePostEmployeeIntegrationMapSuccess(response) {
                ezApi.ezclocker.logger.info('Mapped employeeId=' + ezEmployee.id + ' to integrationId=' + extEmployee.employeeId);
                ezApi.ezclocker.logger.debug(ezApi.ezToJson(response));

            }

            function ezHandlePostEmployeeIntegrationMapFailure(eResponse) {
                ezApi.ezclocker.logger.error('Failed to map employeeId=' + ezEmployee.id + ' to integrationId=' + extEmployee
                    .employeeId +
                    '. Error: ' + ezApi.ezToJson(eResponse));
            }

            for (let lIndex = 0; lIndex < self.employeeLinkerCount; lIndex++) {
                let ezLink = self.ezEmployeeLinkerValues['ez-' + lIndex];
                let extLink = self.extEmployeeLinkerValues['ext-' + lIndex];
                if ('LINK' === ezLink.action && 'LINK' === extLink.action) {
                    let ezEmployee = ezApi.ezclocker.ezClockerContext.ezGetActiveEmployer().employees[extLink.employeeIndex];
                    let extEmployee = ezApi.ezclocker.ezClockerContext.integrationEmployees[extLink.employeeIndex];

                    ezApi.ezclocker.ezIntegrationServiceClient.ezPostEmployeeIntegrationMap(
                        extEmployee.integrationProviderId,
                        ezEmployee.employerId,
                        ezEmployee.id,
                        extEmployee.providerEmployeeId,
                        extEmployee.employeeName,
                        extEmployee.providerConnectionId,
                        true).then(
                        ezHandlePostEmployeeIntegrationMapSuccess,
                        ezHandlePostEmployeeIntegrationMapFailure);
                }
            }
            return resolve(ezApi.ezclocker[window.EZ_WIZARD_API_ID]);
        });
    }

    /**
     * @public
     * Handles the select change for ezClocker employees
     *
     * @param {number} rowIndex
     * @param {string} selectId
     */
    ezHandleEzSelectChange(rowIndex, selectId) {
        const self = ezApi.ezclocker[EzEmployeeLinkerWizardPage.ezApiName];

        let employeeId = ezUi.ezGetInputValue(selectId);
        let employeeName = ezUi.ezGetSelectText(selectId);
        let linkAction = 'LINK';
        if ('NONE' === employeeId) {
            linkAction = 'NONE';
        } else if ('IGNORE' === employeeId) {
            linkAction = 'IGNORE';
        } else if ('CREATE' === employeeId) {
            linkAction = 'CREATE';
        }

        self.ezEmployeeLinkerValues['ez-' + rowIndex] = {
            employeeIndex: employeeId,
            employeeName: employeeName,
            action: linkAction
        };
    }

    /**
     * @public
     * Handles the select change for external employees
     *
     * @param {number} rowIndex
     * @param {string} selectId
     */
    ezHandleExtSelectChange(rowIndex, selectId) {
        const self = ezApi.ezclocker[EzEmployeeLinkerWizardPage.ezApiName];

        let employeeId = ezUi.ezGetInputValue(selectId);
        let employeeName = ezUi.ezGetSelectText(selectId);
        let linkAction = 'LINK';
        if ('NONE' === employeeId) {
            linkAction = 'NONE';
        } else if ('IGNORE' === employeeId) {
            linkAction = 'IGNORE';
        } else if ('CREATE' === employeeId) {
            linkAction = 'CREATE';
        }

        self.extEmployeeLinkerValues['ext-' + rowIndex] = {
            employeeIndex: employeeId,
            employeeName: employeeName,
            action: linkAction
        };
    }

    /**
     * @public
     * Refreshes the integration employee data
     */
    ezRefreshIntegrationEmployees() {
        const self = ezApi.ezclocker[EzEmployeeLinkerWizardPage.ezApiName];

        ezUi.ezStartPageWait('Refreshing integration employee list...', function(waitDone) {
            self.ezLoadIntegrationEmployees()
                .then(self.ezRenderUx)
                .then(waitDone);
        });
    }

    /**
     * @public
     * Refreshes the ezClocker employees
     */
    ezRefreshEzClockerEmployees() {
        const self = ezApi.ezclocker[EzEmployeeLinkerWizardPage.ezApiName];

        ezUi.ezStartPageWait('Refreshing integration employee list...', function(waitDone) {
            ezApi.ezclocker.ezClockerContext.ezRefreshActiveEmployerEmployees()
                .then(self.ezRenderUx)
                .then(waitDone);
        });
    }

    /**
     * Loads this wizards HTML template
     * @returns {Promise}
     */
    ezBWizardPageTemplate() {
        const self = ezApi.ezclocker[EzEmployeeLinkerWizardPage.ezApiName];

        return ezApi.ezPromise(function(resolve) {
            ezApi.ezclocker.http.ezGet('/secure/integrations/wizards/common/ez-wizard-page-employee-linker-template.html')
                .then(
                    function(response) {
                        self.ezWizardPageTemplate = response;
                        return resolve();
                    },
                    function(eResponse) {
                        ezApi.ezclocker.logger.error('Failed to obtain the wizard page template for EzEmployeeLinkerWizardPage.',
                            ezApi.ezToJson(eResponse));
                        return resolve();
                    });
        });
    }

    /**
 * Injects the wizard page into the parent. If the parentid was not provided during construction, body is used as the parent.
 * @returns {Promise}
 */
    ezInjectWizardPage() {
        const self = ezApi.ezclocker[EzEmployeeLinkerWizardPage.ezApiName];

        ezApi.ezPromise(function(resolve) {
            if (ezApi.ezIsEmptyString(self.ezWizardPageParentId)) {
                ezUi.ezAppendHtml$('body', self.ezWizardPageTemplate);
                return resolve();
            }

            ezUi.ezAppendContent(self.ezWizardPageParentId, self.ezWizardPageTemplate);
            return resolve();
        });
    }

    /**
 * @public
 * Obtains the integration employees
 * @returns {Promise}
 */
    ezLoadIntegrationEmployees() {
        const self = ezApi.ezclocker[EzEmployeeLinkerWizardPage.ezApiName];

        return ezApi.ezclocker.ezClockerContext.ezRefreshSelectedEmployerIntegrationEmployees(self.ezIntegrationProviderId);
    }

    /**
 * @deprecated Only used with Bootstrap select
 * Sets the link values for the ezclocker combo box on the row
 */
    ezSetIntegrationLinkIndexValue(linkIndexValue, extEmployeeLink) {
        const self = ezApi.ezclocker[EzEmployeeLinkerWizardPage.ezApiName];
        self.extEmployeeLinkerValues[linkIndexValue] = extEmployeeLink;
    }

    /**
 * @deprecated Only used with Bootstrap select
 * Sets the link values for the integration combo box on the row
 */
    ezSetEzClockerLinkIndexValue(linkIndexValue, ezEmployeeLink) {
        const self = ezApi.ezclocker[EzEmployeeLinkerWizardPage.ezApiName];
        self.ezEmployeeLinkerValues[linkIndexValue] = ezEmployeeLink;
    }

    /**
 * @deprecated Only used with boostrap select
 * @public
 * Updates the linker value when a selection is made in the drop down combo box.
 * @param {string} dropDownButtonId
 * @param {string} linkerId
 * @param {number} linkEmployeeId
 * @param {string} linkEmployeeType
 * One of: ez, ext
 * @param {string} linkAction
 * One of: none, ignore, create, link
 */
    ezUpdateEmployeeLinkerValues(dropDownButtonId, linkerId, linkEmployeeId, linkEmployeeName,
        linkEmployeeType,
        linkAction) {
        const self = ezApi.ezclocker[EzEmployeeLinkerWizardPage.ezApiName];

        if ('ez' === linkEmployeeType) {
            self.ezEmployeeLinkerValues[linkerId] = {
                employeeId: linkEmployeeId,
                employeeName: linkEmployeeName,
                employeeType: linkEmployeeType,
                action: linkAction
            };
        } else if ('ext' === linkEmployeeType) {
            self.extEmployeeLinkerValues[linkerId] = {
                employeeId: linkEmployeeId,
                employeeName: linkEmployeeName,
                employeeType: linkEmployeeType,
                action: linkAction
            };
        }
        ezUi.ezHtml(dropDownButtonId, linkEmployeeName);
    }

    /**
 * @public
 * Fades in the wizard page
 */
    ezShow() {
        ezUi.ezFadeIn('ezWizardView');
    }

    /**
 * @protected
 * Builds the employee linker grid with the data available.
 */
    ezRenderUx() {
        const self = ezApi.ezclocker[EzEmployeeLinkerWizardPage.ezApiName];

        let ezEmployees = ezApi.ezclocker.ezClockerContext.ezGetEmployerContext().activeEmployer.employees;
        let extEmployees = ezApi.ezclocker.ezClockerContext.integrationEmployees;

        // Clear out instructions and content
        ezUi.ezHtml('EzWizard_Instructions', '');
        ezUi.ezHtml('EzWizard_Content', '');

        // Render the instructions and content
        ezUi.ezHtml('EzWizard_Instructions', self.ezBuildWizardInstructions(ezEmployees, extEmployees));
        ezUi.ezHtml('EzWizard_Content', self.ezBuildEmployeeLinkerGrid(ezEmployees, extEmployees));
    }

    /**
 * Builds the wizard instructions
 * @returns {string}
 */
    ezBuildWizardInstructions(ezEmployees, extEmployees) {
        if (ezApi.ezIsEmptyArray(ezEmployees) && ezApi.ezIsEmptyArray(extEmployees)) {
            return 'Both ezClocker and the integration have zero employees. ' +
            'Please add employees to ezClocker and your Integration before attempting to export time entries. Press Cancel to exit the wizard.';
        }

        if (ezApi.ezIsEmptyArray(ezEmployees)) {
            return 'ezClocker does not have any employees to export time entries for. ' +
            'Please add employees and time entries for the employees to ezClocker and try again. Press Cancel to exit the wizard.';
        }

        if (ezApi.ezIsEmptyArray(extEmployees)) {
            return 'The integration does not have any employees to export time entries to. ' +
            'Please add employees to your integration and try again. Press Cancel to exit the wizard.';
        }

        return 'You will need to indicate which ezClocker employee matches the employee of your integration. On the left, you will find a listing of '
        +
        'your existing ezClocker employees. On the right is a listing of all the employees ezClocker found in your integration. Please match the '
        +
        'ezClocker employee on the left with their matching employee from your integration on the right. Click Next when you have mapped as many '
        +
        'employees as you can or need to.';
    }

    /**
 * Grid Building Step 1: Build the linker grid
 * @returns {string}
 */
    ezBuildEmployeeLinkerGrid(ezEmployees, extEmployees) {
        const self = ezApi.ezclocker[EzEmployeeLinkerWizardPage.ezApiName];

        return '<table id="EzIntegration_EmployeeLinkGrid" class="ezIntegrationEmployeeLinkGrid">' +
        self.ezBuildLinkerGridHeader() +
        self.ezBuildLinkerGridEmployeeLinkRows(ezEmployees, extEmployees) +
        '</table>';
    }

    /**
 * Grid Building Step 2: Build the linker grid's header rows
 * @returns {string}
 */
    ezBuildLinkerGridHeader() {
        const self = ezApi.ezclocker[EzEmployeeLinkerWizardPage.ezApiName];

        return ezHtml.$thead('', '',
            ezHtml.$tr(
                'EzIntegration_EmployeeLinkGrid_HeaderRow',
                'ezIntegrationEmployeeLinkGridHeaderRow',
                // Left side
                ezHtml.$td(
                    self.ezBuildELGElementId('EzIntegration_EmployeeLinkGrid_HeaderCell', true),
                    'ezIntegrationEmployeeLinkGridHeaderCell',
                    ezHtml.$table(
                        self.ezBuildELGElementId('EzIntegration_EmployeeLinkGrid_HeaderLayoutGrid', true),
                        'ezIntegrationEmployeeLinkGridHeaderTextLayoutGrid',
                        ezHtml.$tr(
                            self.ezBuildELGElementId('EzIntegration_EmployeeLinkGrid_HeaderLayoutGrid_HeaderRow', true), null,
                            ezHtml.$td(
                                self.ezBuildELGElementId('EzIntegration_EmployeeLinkGrid__HeaderLayoutGrid_NameCell', true), null,
                                ezHtml.$div(
                                    self.ezBuildELGElementId('EzIntegration_EmployeeLinkGrid_HeaderName', true),
                                    'ezIntegrationEmployeeLinkGridHeaderText', 'ezClocker Employees')
                            ) +
                        ezHtml.$td(self.ezBuildELGElementId('EzIntegration_EmployeeLinkGrid_HeaderLayoutGrid_EmptyCell', true),
                            null, null) +
                        ezHtml.$td(
                            self.ezBuildELGElementId('EzIntegration_EmployeeLinkGrid_HeaderLayoutGrid_RefreshButtonCell', true),
                            null,
                            ezHtml.$div(
                                self.ezBuildELGElementId('EzIntegration_EmployeeLinkGrid_HeaderRefreshButton_Container', true),
                                'ezIntegrationEmployeeRefreshButtonBox',
                                ezHtml.$button(
                                    self.ezBuildELGElementId('EzIntegration_EmployeeLinkGrid_HeaderRefreshButton', true),
                                    'ezIntegrationEmployeeRefreshButton',
                                    'button',
                                    'ezApi.ezclocker[EzEmployeeLinkerWizardPage.ezApiName].ezRefreshEzClockerEmployees()',
                                    null,
                                    'Refresh')
                            )
                        )
                        )
                    )
                ) +
            // right side
            ezHtml.$td(
                self.ezBuildELGElementId('EzIntegration_EmployeeLinkGrid_HeaderCell', false, true),
                'ezIntegrationEmployeeLinkGridHeaderCell',
                ezHtml.$table(
                    self.ezBuildELGElementId('EzIntegration_EmployeeLinkGrid_HeaderLayoutGrid', false, true),
                    'ezIntegrationEmployeeLinkGridHeaderTextLayoutGrid',
                    ezHtml.$tr(
                        self.ezBuildELGElementId('EzIntegration_EmployeeLinkGrid_HeaderLayoutGrid_HeaderRow', false, true),
                        null,
                        ezHtml.$td(
                            self.ezBuildELGElementId('EzIntegration_EmployeeLinkGrid__HeaderLayoutGrid_NameCell', false, true),
                            null,
                            ezHtml.$div(
                                self.ezBuildELGElementId('EzIntegration_EmployeeLinkGrid_HeaderName', false, true),
                                'ezIntegrationEmployeeLinkGridHeaderText', 'Integration Employees')
                        ) +
                        ezHtml.$td(
                            self.ezBuildELGElementId('EzIntegration_EmployeeLinkGrid_HeaderLayoutGrid_EmptyCell', false, true),
                            null,
                            null) + // content
                        ezHtml.$td(
                            self.ezBuildELGElementId('EzIntegration_EmployeeLinkGrid__HeaderLayoutGrid_RefreshButtonCell', false,
                                true), '',
                            ezHtml.$div(
                                self.ezBuildELGElementId('EzIntegration_EmployeeLinkGrid_HeaderRefreshButton_Container', false,
                                    true),
                                'ezIntegrationEmployeeRefreshButtonBox',
                                ezHtml.$button(
                                    self.ezBuildELGElementId('EzIntegration_EmployeeLinkGrid_HeaderRefreshButton', false, true),
                                    'ezIntegrationEmployeeRefreshButton',
                                    'button',
                                    'ezApi.ezclocker[EzEmployeeLinkerWizardPage.ezApiName].ezRefreshIntegrationEmployees()',
                                    null,
                                    'Refresh')
                            )
                        )
                    )
                )
            )
            )
        );
    }

    /**
 * Grid Building Step 3: Build the employee linker rows for the grid
 * @param {Array} ezEmployees
 * @param {Array} extEmployees
 * @returns {string}
 */
    ezBuildLinkerGridEmployeeLinkRows(ezEmployees, extEmployees) {
        const self = ezApi.ezclocker[EzEmployeeLinkerWizardPage.ezApiName];

        let ezLength = ezApi.ezIsNotEmptyArray(ezEmployees) ? ezEmployees.length : 0;
        ezApi.ezclocker.logger.debug('[Linker Grid] Total ezClocker employee Count: ' + ezLength);

        let extLength = ezApi.ezIsNotEmptyArray(extEmployees) ? extEmployees.length : 0;
        ezApi.ezclocker.logger.debug('[Linker Grid] Total integration employee Count: ' + ezLength);

        self.employeeLinkerCount = ezLength;
        if (0 !== ezLength && 0 !== extLength) {
            self.employeeLinkerCount = ezLength < extLength ? ezLength : extLength;
            ezApi.ezclocker.logger.debug('[Linker Grid] Using the lowest employee count: ' + self.employeeLinkerCount);
        } else if (0 === extLength) {
            self.employeeLinkerCount = extLength;
            ezApi.ezclocker.logger.debug('[Linker Grid] Using the integrations employee count: ' + self.employeeLinkerCount);
        } else {
            ezApi.ezclocker.logger.debug('[Linker Grid] Using the ezClocker employee count: ' + self.employeeLinkerCount);
        }

        return ezHtml.$tbody('EzIntegration_EmployeeLinkGrid_Body', null,
            self.ezBuildRowsFromEmployeeLinkerCount(self.employeeLinkerCount, ezEmployees, extEmployees));
    }

    /**
 * Uses the employeeLinkerCount to determine the number of employee linker rows to build.
 * @param {Array} ezEmployees
 * ezClocker employee list
 * @param {Array} extEmployees
 * Integration employee list
 * @returns {string}
 */
    ezBuildRowsFromEmployeeLinkerCount(linkRowCount, ezEmployees, extEmployees) {
        const self = ezApi.ezclocker[EzEmployeeLinkerWizardPage.ezApiName];

        let employeeLinkerRows = '';
        for (let rowIndex = 0; rowIndex < linkRowCount; rowIndex++) {
            employeeLinkerRows += self.ezBuildEmployeeLinkRow(rowIndex, ezEmployees, extEmployees);
        }
        return employeeLinkerRows;
    }

    /**
 * Grid Building Step 4: Build the employee link grid "linker" rows
 * @returns {string}
 */
    ezBuildEmployeeLinkRow(rowIndex, ezEmployees, extEmployees) {
        const self = ezApi.ezclocker[EzEmployeeLinkerWizardPage.ezApiName];

        let linkRowIdIndex = 'r' + ezApi.ezNumberToString(rowIndex);
        ezApi.ezclocker.logger.debug('[Linker Grid] Building employee link row ' + linkRowIdIndex);

        return '<!-- employee link #' + rowIndex + '-->' +
        '<tr id="_ezIntegration_EmployeeLinkGrid_EmployeeRow_' + linkRowIdIndex + '" class="ezIntegrationEmployeeLinkGridEmployeeRow">'
        +
        '<td id="_ezIntegration_EmployeeLinkGrid_EmployeeCell_ezleft.' + linkRowIdIndex +
        '" class="ezIntegrationEmployeeLinkGridEmployeeCell">' +
        //self.ezBuildEzClockerEmployeeComboBox(rowIndex, ezEmployees) +
        self.ezBuildEzClockerEmployeeSimpleComboBox(rowIndex, ezEmployees) +
        '</td><td id="_ezIntegration_EmployeeLinkGrid_EmployeeCell_ezright.' + linkRowIdIndex +
        '" class="ezIntegrationEmployeeLinkGridEmployeeCell">' +
        //self.ezBuildIntegrationEmployeeComboBox(rowIndex, extEmployees) +
        self.ezBuildIntegrationEmployeeSimpleComboBox(rowIndex, extEmployees) +
        '</td></tr>';
    }

    /**
 * Builds a simple combo box for link selection of ezClocker employees.
 * @param {number} rowIndex
 * @param {Array} ezEmployees
 * @returns {string}
 */
    ezBuildEzClockerEmployeeSimpleComboBox(rowIndex, ezEmployees) {
        const self = ezApi.ezclocker[EzEmployeeLinkerWizardPage.ezApiName];

        // Simple combo boxes
        let selectId = self.ezBuildELGElementId('EzIntegration_EmployeeLinkGrid_EmployeeComboBox', true, false, rowIndex);
        return ezHtml.$select(
            selectId,
            'ezEmployeeComboBox',
            'onchange="' +
        'ezApi.ezclocker[EzEmployeeLinkerWizardPage.ezApiName].ezHandleEzSelectChange(' + rowIndex + ',\'' + selectId +
        '\')' +
        '"',
            self.ezBuildEzClockerOtherItems(rowIndex) +
        self.ezBuildEmployeeSimpleComboBoxItems(rowIndex, true, false, ezEmployees));
    }

    /**
 * Builds the integration's OTHER selection items
 * @param {number} rowIndex
 * @returns {string}
 */
    ezBuildEzClockerOtherItems(rowIndex) {
        const self = ezApi.ezclocker[EzEmployeeLinkerWizardPage.ezApiName];

        // Initial value is none for all ezClocker employees
        self.ezEmployeeLinkerValues['ez-' + rowIndex] = {
            employeeIndex: 'NONE',
            employeeName: 'None',
            action: 'NONE'
        };

        return ezHtml.$option(
            self.ezBuildELGElementId('EzIntegration_EmployeeLinkGrid_EmployeeComboBoxItem_IGNORE', false, true, rowIndex),
            null,
            'NONE',
            null,
            'None') +
        ezHtml.$option(
            self.ezBuildELGElementId('EzIntegration_EmployeeLinkGrid_EmployeeComboBoxItem_IGNORE', false, true, rowIndex),
            null,
            'CREATE',
            null,
            'Create new ezClocker employee');
    }

    /**
 * Builds a simple combo box for link selection of external employees.
 * @param {number} rowIndex
 * @param {Array} extEmployees
 * @returns {string}
 */
    ezBuildIntegrationEmployeeSimpleComboBox(rowIndex, extEmployees) {
        const self = ezApi.ezclocker[EzEmployeeLinkerWizardPage.ezApiName];

        let selectId = self.ezBuildELGElementId('EzIntegration_EmployeeLinkGrid_EmployeeComboBox', false, true, rowIndex);
        return ezHtml.$select(
            selectId,
            'ezEmployeeComboBox',
            'onchange="' +
        'ezApi.ezclocker[EzEmployeeLinkerWizardPage.ezApiName].ezHandleExtSelectChange(' + rowIndex + ',\'' + selectId +
        '\')' +
        '"',
            self.ezBuildEmployeeSimpleComboBoxItems(rowIndex, false, true, extEmployees) +
        self.ezBuildIntegrationOtherItems(rowIndex));
    }

    /**
 * Builds the integration's OTHER selection items
 * @param {number} rowIndex
 * @returns {string}
 */
    ezBuildIntegrationOtherItems(rowIndex) {
        const self = ezApi.ezclocker[EzEmployeeLinkerWizardPage.ezApiName];

        return ezHtml.$option(
            self.ezBuildELGElementId('EzIntegration_EmployeeLinkGrid_EmployeeComboBoxItem_IGNORE', false, true, rowIndex),
            null,
            'IGNORE',
            null,
            'Ignore');
    }

    /**
 * Builds the option tag for the select combo box for each employee.
 * @param {number} rowIndex
 * @param {boolean|null} isLeft
 * @param {null|boolean} isRight
 * @param {Array} employees
 * @returns {string}
 */
    ezBuildEmployeeSimpleComboBoxItems(rowIndex, isLeft, isRight, employees) {
        const self = ezApi.ezclocker[EzEmployeeLinkerWizardPage.ezApiName];

        let linkerEmployeeType = ezApi.ezIsTrue(isLeft) ? 'ez' : 'ext';

        let employeeComboItems = '';
        for (let eIndex = 0; eIndex < employees.length; eIndex++) {
            if (0 === eIndex) {
            // Simple combo boxes
                self.extEmployeeLinkerValues[linkerEmployeeType + '-' + rowIndex] = {
                    employeeIndex: eIndex,
                    employeeName: employees[eIndex].employeeName,
                    action: 'LINK'
                };
            }
            employeeComboItems += ezHtml.$option(
                self.ezBuildELGElementId('EzIntegration_EmployeeLinkGrid_EmployeeComboBoxItem', isLeft, isRight, rowIndex),
                null,
                ezApi.ezNumberToString(eIndex),
                null,
                employees[eIndex].employeeName);
        }
        return employeeComboItems;
    }

    /**
 * @deprecated Bootstrap combo box
 * Grid Building Step 5: Builds the an employee combo box for ezClocker employees.
 * @param {Array} ezEmployees
 * @returns {string}
 */
    ezBuildEzClockerEmployeeComboBox(rowIndex, ezEmployees) {
        const self = ezApi.ezclocker[EzEmployeeLinkerWizardPage.ezApiName];

        let dropDownButtonId = self.ezBuildELGElementId('EzIntegration_EmployeeLinkGrid_EmployeeComboBox', true, false, rowIndex);

        return ezHtml.$div(
            self.ezBuildELGElementId('EzIntegration_EmployeeLinkGrid_EmployeeList', true, false, rowIndex),
            'dropdown',
            ezHtml.$button(
                dropDownButtonId,
                'btn dropdown-toggle ezComboBoxButton',
                'button',
                null,
                ezHtml.ezProp('aria-haspopup', 'true') +
            ezHtml.ezProp('aria-expanded', 'false') +
            ezHtml.ezProp('data-toggle', 'dropdown'),
                'Select ezClocker employee...') +

        ezHtml.$div(
            self.ezBuildELGElementId('EzIntegration_EmployeeLinkGrid_EmployeeMenu', true, false, rowIndex), 'dropdown-menu',
            self.ezBuildEmployeeComboBoxMenu('ezClocker Employees', true, rowIndex, ezEmployees, dropDownButtonId) +

            ezHtml.$h(6,
                self.ezBuildELGElementId('EzIntegration_EmployeeLinkGrid_EmployeeMenu_OtherHeader', true, false, rowIndex),
                'dropdown-header ezIntegrationEmployeeMenuHeader',
                'Other Options') +

            ezHtml.$comment('take no action') +
            ezHtml.$button(
                self.ezBuildELGElementId('EzIntegration_EmployeeLinkGrid_EmployeeMenu_NonItemButton', true, false, rowIndex, '',
                    'none'),
                'ezNoButtonMargin dropdown-item',
                'button',
                self.ezBuildEmployeeComboBoxOnClickHandler({
                    employeeId: -1,
                    employeeName: 'None'
                }, 'ez', dropDownButtonId),
                null,
                ezHtml.$div(
                    self.ezBuildELGElementId('EzIntegration_EmployeeLinkGrid_EmployeeMenu_ItemName', true, false, rowIndex, '',
                        'none'),
                    'ezIntegrationOtherLinkActionBox',
                    'None')
            ) +

            ezHtml.$comment('create new employee') +
            ezHtml.$button(
                self.ezBuildELGElementId('EzIntegration_EmployeeLinkGrid_EmployeeMenu_CreateNewItemButton', rowIndex, '',
                    'create'),
                'ezNoButtonMargin dropdown-item',
                'button',
                self.ezBuildEmployeeComboBoxOnClickHandler({
                    employeeId: -1,
                    employeeName: 'Create a New ezClocker Employee'
                }, 'ez', dropDownButtonId),
                null,
                ezHtml.$div(
                    self.ezBuildELGElementId('EzIntegration_EmployeeLinkGrid_EmployeeMenu_ItemName', rowIndex, '', 'create'),
                    'ezIntegrationOtherLinkActionBox',
                    'Create a New ezClocker Employee')
            )
        )
        );

    }

    /**
 * @deprecated Bootstrap combo box
 * Grid Building Step 6: Build the integration employee combo box
 * Stores the initial build run and reuses the html to avoid multiple builds of the same content.
 * @param {Array} extEmployees
 * @returns {string}
 */
    ezBuildIntegrationEmployeeComboBox(rowIndex, extEmployees) {
        const self = ezApi.ezclocker[EzEmployeeLinkerWizardPage.ezApiName];

        let dropDownButtonId = self.ezBuildELGElementId('EzIntegration_EmployeeLinkGrid_EmployeeComboBox_', false, true, rowIndex);

        return ezHtml.$div(
            self.ezBuildELGElementId('EzIntegration_EmployeeLinkGrid_EmployeeList', false, true, rowIndex),
            'dropdown',
            ezHtml.$button(
                dropDownButtonId,
                'dropdown-toggle ezComboBoxButton',
                'button',
                null,
                ezHtml.ezProp('aria-haspopup', 'true') +
            ezHtml.ezProp('aria-expanded', 'false') +
            ezHtml.ezProp('data-toggle', 'dropdown'),
                'Select integration employee...') +
        ezHtml.$div(
            self.ezBuildELGElementId('EzIntegration_EmployeeLinkGrid_EmployeeMenu', false, true, rowIndex),
            'dropdown-menu',
            self.ezBuildEmployeeComboBoxMenu('Integration Employees', false, rowIndex, extEmployees, dropDownButtonId) +
            ezHtml.$h(6,
                self.ezBuildELGElementId('EzIntegration_EmployeeLinkGrid_EmployeeMenu_OtherHeader', false, true, rowIndex),
                'dropdown-header ezIntegrationEmployeeMenuHeader', 'Other Options') +
            ezHtml.$comment('Ignore Action') +
            ezHtml.$button(
                self.ezBuildELGElementId('EzIntegration_EmployeeLinkGrid_EmployeeMenu_NonItemButton', false, true, rowIndex, '',
                    'ignore'),
                'ezNoButtonMargin dropdown-item',
                'button',
                self.ezBuildEmployeeComboBoxOnClickHandler({
                    employeeId: -1,
                    employeeName: 'none'
                }, 'ext', dropDownButtonId),
                null,
                ezHtml.$div(
                    self.ezBuildELGElementId('EzIntegration_EmployeeLinkGrid_EmployeeMenu_ItemName', false, true, rowIndex, '',
                        'ignore'),
                    'ezIntegrationOtherLinkActionBox', 'Ignore')
            )
        )
        );
    }

    /**
 * @deprecated Bootstrap combo box
 * Grid Building Step 5a and 6a: Build an employee combox menu for the provided employees
 * @param {string} employeeGroupName
 * @param {boolean} isEzEmployee
 * @param {Array} employeesToUse
 * @param {dropDownButtonId} dropDownButtonId
 * @returns {string}
 */
    ezBuildEmployeeComboBoxMenu(employeeGroupName, isEzEmployee, rowIndex, employeesToUse,
        dropDownButtonId) {
        const self = ezApi.ezclocker[EzEmployeeLinkerWizardPage.ezApiName];

        let linkerEmployeeType = ezApi.ezIsTrue(isEzEmployee) ? 'ez' : 'ext';
        self.ezEmployeeLinkerValues[linkerEmployeeType] = {
            employeeId: -1,
            employeeName: 'ez' === linkerEmployeeType ? 'Select ezClocker employee...' : 'Select integration employee...',
            employeeType: linkerEmployeeType,
            action: 'ez' === linkerEmployeeType ? 'none' : 'ignore'
        };

        return ezHtml.$h(6,
            self.ezBuildELGElementId('EzIntegration_EmployeeLinkGrid_EmployeeMenu_EmployeesHeader', isEzEmployee, !isEzEmployee,
                rowIndex),
            'dropdown-header ezIntegrationEmployeeMenuHeader',
            employeeGroupName) +
        self.ezBuildEmployeeComboBoxMenuEmployeeComboBox(linkerEmployeeType, isEzEmployee, rowIndex, employeesToUse, dropDownButtonId);
    }
    /**
 * @deprecated Bootstrap combo box
 * Builds the employee combobox
 * @param {string} linkerEmployeeType
 * Either ez or ext
 * @param {boolean} isEzEmployee
 * @param {number} rowIndex
 * @param {Array} employeesToUse,
 * @param {string} dropDownButtonId
 * So the name can be updated when selected
 */
    ezBuildEmployeeComboBoxMenuEmployeeComboBox(linkerEmployeeType, isEzEmployee, rowIndex,
        employeesToUse,
        dropDownButtonId) {
        const self = ezApi.ezclocker[EzEmployeeLinkerWizardPage.ezApiName];

        let employeeComboBox = '';
        for (let eIndex = 0; eIndex < employeesToUse.length; eIndex++) {
            let employee = employeesToUse[eIndex];
            employeeComboBox += ezHtml.$button(
                self.ezBuildELGElementId('EzIntegration_EmployeeLinkGrid_EmployeeMenu_EmployeeItemButton-' + linkerEmployeeType,
                    isEzEmployee, !isEzEmployee, rowIndex, eIndex),
                'ezNoButtonMargin dropdown-item active',
                'button',
                self.ezBuildEmployeeComboBoxOnClickHandler(employee, linkerEmployeeType, dropDownButtonId),
                null,
                ezHtml.$div(self.ezBuildELGElementId('EzIntegration_EmployeeLinkGrid_EmployeeMenu_ItemBox-' + linkerEmployeeType,
                    isEzEmployee, !isEzEmployee, rowIndex, eIndex),
                'ezIntegrationEmployeeBox',
                ezHtml.$div(self.ezBuildELGElementId('EzIntegration_EmployeeLinkGrid_EmployeeMenu_ItemName-' + linkerEmployeeType,
                    isEzEmployee, !isEzEmployee, rowIndex, eIndex),
                'ezIntegrationEmployeeName',
                employee.employeeName)
                )
            );
        }

        return employeeComboBox;
    }

    /**
 * @deprecated Bootstrap combo box

 * Creates the JS that assigned to the onclick handler of the employee combo box employee item button.
 *
 * @param {object} employee
 * @param {string} linkerEmployeeType
 * Either ez or ext
 * @param {string} dropDownButtonId
 * Id of button whos name will get updated when the combo item is clicked.
 * @returns {string}
 */
    ezBuildEmployeeComboBoxOnClickHandler(employee, linkerEmployeeType, dropDownButtonId) {
        return 'ezApi.ezclocker[EzEmployeeLinkerWizardPage.ezApiName].ezUpdateEmployeeLinkerValues(' +
        ezHtml.ezQuoteDelimit(dropDownButtonId,
            ezHtml.ezQuoteDelimit(linkerEmployeeType) +
            employee.id + ',' +
            ezHtml.ezQuoteDelimit(employee.employeeName,
                ezHtml.ezQuoteDelimit(linkerEmployeeType,
                    ezHtml.ezQuoteDelimit('link', ')')
                )
            )
        );
    }

    /**
 * Builds a properly formatted id for linker grid elements. Template is:
 *
 * {elementId}-{ezleft|ezright}{null|-r{rowIndex}}{null|-e{employeeIndex}}{null|-{suffix}}
 *
 * @returns {string}
 */
    ezBuildELGElementId(elementId, isLeft, isRight, rowIndex, employeeIndex, suffix) {
        let elgEId = ezApi.ezIsEmptyString(elementId) ? '_EZ-' : elementId + '-';
        if (ezApi.ezIsTrue(isLeft)) {
            elgEId += 'ezL-';
        }
        if (ezApi.ezIsTrue(isRight)) {
            elgEId += 'ezR-';
        }
        if (ezApi.ezIsNumber(rowIndex)) {
            elgEId += 'r' + ezApi.ezNumberToString(rowIndex);
        } else if (ezApi.ezIsNotEmptyString(rowIndex)) {
            elgEId += 'r' + rowIndex;
        }
        if (ezApi.ezIsNotEmptyString(employeeIndex)) {
            elgEId += 'e' + employeeIndex;
        }
        if (ezApi.ezIsNotEmptyString(suffix)) {
            elgEId += suffix;
        }

        return elgEId;
    }
}

EzEmployeeLinkerWizardPage.ezApiName = 'ezEmployeeLinkerWizardPage';

/**
    @public
    Creates an instance of the EzEmployeeLinkerWizardPage object.
    Reference stored at: ezApi.ezclocker[EzEmployeeLinkerWizardPage.ezApiName]
    @param {string} parentId
    @param {string} integrationProviderId
    @param {string} ezEmployeeLinkerWizardPageApiId
    Will use EzEmployeeLinkerWizardPage.ezApiName value if not provided.
 */
EzEmployeeLinkerWizardPage.createInstance = function(parentId, integrationProviderId, ezEmployeeLinkerWizardPageApiId) {
    return new EzEmployeeLinkerWizardPage(parentId, integrationProviderId, ezEmployeeLinkerWizardPageApiId);
};

export {
    EzEmployeeLinkerWizardPage
};

/**
 * ezApi Registration
 */
document.addEventListener('onEzApiReady', function() {
    ezApi.ezclocker[EzEmployeeLinkerWizardPage.ezApiName] = EzEmployeeLinkerWizardPage.createInstance(
        'EzWizardPageEmployeeLinkerContainer',
        ezApi.ezclocker.ezUrlHelper.getUrlParam('iid'));
});