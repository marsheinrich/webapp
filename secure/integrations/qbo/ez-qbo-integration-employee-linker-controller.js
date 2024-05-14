import {
    EzIntegrationProviderId
} from '../ez-integration-enums.js';

var EZ_WIZARD_PAGE_EMPLOYEE_LINKER_API_ID = 'EzQboIntegrationEmployeeLinkerViewController';

/**
 * @public
 * Controller for the ezClocker Integrations Employee Linker wizard page.
 */
class EzQboIntegrationEmployeeLinkerViewController {
    /**
     * @param {parentId}
     * The element id for the container
     */
    constructor(ezViewParentId) {
        this.ready = false;

        this.ezQboIntegrationEmployeeLinkerViewControllerId = 'ezQboIntegrationEmployeeLinkerViewController';

        this.ezViewParentId = ezViewParentId;
        this.ezGetEzViewParentId = function() {
            return ezApi.ezclocker.ezQboIntegrationEmployeeLinkerViewController.ezViewParentId;
        };

        this.ezIntegrationProviderId = 'EZ_INTEGRATION_QUICKBOOKS_ONLINE_PROVIDER';

        this.ezQBOContextId = ezApi.ezclocker.ezUrlHelper.getUrlParam('ezQboIntegrationWizardId');

        this.ezGetEzIntegrationProviderId = function() {
            return ezApi.ezclocker.ezQboIntegrationEmployeeLinkerViewController.ezIntegrationProviderId;
        };

        this.ezWizardPageTemplate = '';
        this.ezGetEzWizardPageTemplate = function() {
            return ezApi.ezclocker.ezQboIntegrationEmployeeLinkerViewController.ezWizardPageTemplate;
        };

        this.ezEmployeeLinkerValues = [];
        this.ezGetEzEmployeeLinkerValues = function() {
            return ezApi.ezclocker.ezQboIntegrationEmployeeLinkerViewController.ezEmployeeLinkerValues;
        };

        this.extEmployeeLinkerValues = {};
        this.ezGetExtEmployeeLinkerValues = function() {
            return ezApi.ezclocker.ezQboIntegrationEmployeeLinkerViewController.extEmployeeLinkerValues;
        };

        return this;
    }
    /**
     * @protected
     * Initializes the EzQboIntegrationEmployeeLinkerViewControllerId
     *
     * @returns {EzQboIntegrationEmployeeLinkerViewController}
     */
    ezInit() {
        var self = ezApi.ezclocker.ezQboIntegrationEmployeeLinkerViewController;

        self.ezInitUX();

        self.ready = true;
        return self;
    }
    /**
     * @protected
     * Initialzies the UX for EzQboIntegrationEmployeeLinkerViewControllerId
     */
    ezInitUX() {
        var self = ezApi.ezclocker.ezQboIntegrationEmployeeLinkerViewController;

        //NOTE: ezClocker employees are obtained from the ezApi.ezclocker.ezClockerContext class
        ezUi.ezStartPageWait('Loading integration employees...', function(waitDone) {
            self._EzGetIntegrationEmployees()
                .then(self.ezRenderUx)
                .then(waitDone);
        });
        ezUi.ezStartPageWait('Loading employees...', function(waitDone) {
            self._EzGetEmployees()
                .then(self.ezRenderUx)
                .then(waitDone);
        });
        ezUi.ezStartPageWait('Loading employees integration map...', function(waitDone) {
            self._EzGetEmployeeIntegrationMap()
                .then(self.ezRenderUx)
                .then(waitDone);
        });
    }
    /**
     * @public
     * Saves the employee maps
     */
    ezSaveEmployeeMaps() {
        var self = ezApi.ezclocker.ezQboIntegrationEmployeeLinkerViewController;

        return ezApi.ezPromise(function(resolve) {
            function __EzHandlePostEmployeeIntegrationMapSuccess(response) {
                ezApi.ezclocker.logger.info('Mapped employeeId=' + ezEmployee.id + ' to integrationId=' +
                    extEmployee.employeeId);
                ezApi.ezclocker.logger.debug(ezApi.ezToJson(response));
                resolve(response);
            }

            function __EzHandlePostEmployeeIntegrationMapFailure(eResponse) {
                ezApi.ezclocker.logger.error('Failed to map employeeId=' + ezEmployee.id + ' to integrationId=' +
                    extEmployee.employeeId + '. Error: ' + ezApi.ezToJson(eResponse));
                resolve(eResponse);
            }
            if (self.ezEmployeeLinkerValues.length === 0) {
                return resolve();
            }
            for (var lIndex = 0; lIndex < self.ezEmployeeLinkerValues.length; lIndex++) {
                var ezLink = self.ezEmployeeLinkerValues[lIndex];
                if ('LINK' === ezLink.action) {
                    var ezEmployee = ezApi.ezclocker.ezClockerContext.employees[ezLink.employeeIndex];
                    var extEmployee = ezApi.ezclocker.ezClockerContext.integrationEmployees[ezLink.rowIndex];

                    self.ezPostEmployeeIntegrationMap(
                        extEmployee.integrationProviderId,
                        ezEmployee.employerId,
                        ezEmployee.id,
                        extEmployee.providerEmployeeId,
                        extEmployee.employeeName,
                        extEmployee.providerConnectionId,
                        true).then(
                        __EzHandlePostEmployeeIntegrationMapSuccess,
                        __EzHandlePostEmployeeIntegrationMapFailure);
                } else if ('IGNORE1' === ezLink.action) {
                    var extEmployee = ezApi.ezclocker.ezClockerContext.integrationEmployees[ezLink.rowIndex];

                    self.ezPostEmployeeIntegrationMap(
                        extEmployee.integrationProviderId,
                        ezEmployee.employerId,
                        ezEmployee.id,
                        extEmployee.providerEmployeeId,
                        extEmployee.employeeName,
                        extEmployee.providerConnectionId,
                        true).then(
                        __EzHandlePostEmployeeIntegrationMapSuccess,
                        __EzHandlePostEmployeeIntegrationMapFailure);
                }
            }
        });
    }
    /**
     * @public
     * Posts a single employee integration mapping
     * @param {long} ezClockerEmployerId
     * @param {string} ezIntegrationProviderId
     * @param {long} ezClockerEmployeeId
     * @param {string} integrationEmployeeId
     * @param {string} integrationProviderId
     * @param {string} providerEmployeeName
     * @param {boolean} eiActive
     * @returns {Promise}
     */
    ezPostEmployeeIntegrationMap(integrationProviderId, ezClockerEmployerId,
        ezClockerEmployeeId, providerEmployeeId, providerEmployeeName, providerConnectionId, isActive) {
        var url = '/_api/v1/integrations/' + integrationProviderId + '/employee-map';

        return ezApi.ezclocker.http.ezPost(url, ezApi.ezToJson({
            integrationProviderId: integrationProviderId,
            ezEmployerId: ezClockerEmployerId,
            ezEmployeeId: ezClockerEmployeeId,
            providerConnectionId: providerConnectionId,
            providerEmployeeId: providerEmployeeId,
            providerEmployeeName: providerEmployeeName,
            active: ezApi.ezIsTrue(isActive),
            source: 'WEBSITE'
        }));
    }
    /**
     * @public
     * Handles the select change for ezClocker employees
     *
     * @param {number} rowIndex
     * @param {string} selectId
     */
    ezHandleEzSelectChange(rowIndex, selectId) {
        var self = ezApi.ezclocker.ezQboIntegrationEmployeeLinkerViewController;

        var employeeId = ezUi.ezGetInputValue(selectId);
        var employeeName = ezUi.ezGetSelectText(selectId);
        var linkAction = 'LINK';
        if ('NONE' === employeeId) {
            linkAction = 'NONE';
        } else if ('IGNORE' === employeeId) {
            linkAction = 'IGNORE';
        } else if ('CREATE' === employeeId) {
            linkAction = 'CREATE';
        }

        self.ezEmployeeLinkerValues.push({
            rowIndex: rowIndex,
            employeeIndex: employeeId,
            employeeName: employeeName,
            action: linkAction
        });
    }
    /**
     * @public
     * Refreshes the integration employee data
     */
    ezRefreshIntegrationEmployees() {
        var self = ezApi.ezclocker.ezQboIntegrationEmployeeLinkerViewController;

        ezUi.ezStartPageWait('Refreshing integration employee list...', function(waitDone) {
            self._EzGetIntegrationEmployees()
                .then(self.ezRenderUx)
                .then(waitDone);
        });
    }
    /**
     * @public
     * Refreshes the ezClocker employees
     */
    ezRefreshEzClockerEmployees() {
        var self = ezApi.ezclocker.ezQboIntegrationEmployeeLinkerViewController;

        ezUi.ezStartPageWait('Refreshing integration employee list...', function(waitDone) {
            ezApi.ezclocker.ezClockerContext.ezRefreshActiveEmployerEmployees()
                .then(self.ezRenderUx)
                .then(waitDone);
        });
    }
    /**
     * @public * Obtains the integration employees
     * @returns {Promise}
     */
    _EzGetIntegrationEmployees() {
        var self = ezApi.ezclocker.ezQboIntegrationEmployeeLinkerViewController;

        if (!ezApi.ezIsEmptyArray(ezApi.ezclocker.ezClockerContext.integrationEmployees) ||
            EzIntegrationProviderId.UNKNOWN === self.ezIntegrationProviderId ||
            EzIntegrationProviderId.UNKNOWN === self.ezQBOContextId) {
            return ezApi.ezResolve();
        }

        return ezApi.ezPromise(function(resolve) {
            ezApi.ezclocker.http.ezGet('/_api/v1/integrations/' + self.ezIntegrationProviderId + '/' + self.ezQBOContextId + '/query/employees').then(
                function(response) {
                    if (ezApi.isNotValid(response) || 0 != response.errorCode) {
                        ezApi.ezclocker.ezClockerContext.integrationEmployees = [];
                    }
                    ezApi.ezclocker.ezClockerContext.integrationEmployees = ezApi.ezIsEmptyArray(response.entities) ? [] :
                        response.entities;
                    return resolve();
                },
                function(eResponse) {
                    ezApi.ezclocker.logger.error('Failed to obtain the integration\'s employee listing: {}', eResponse);
                    ezApi.ezclocker.ezClockerContext.integrationEmployees = [];
                    return resolve();
                });
        });
    }
    /**
     * @public * Obtains the integration employees
     * @returns {Promise}
     */
    _EzGetEmployees() {
        var self = ezApi.ezclocker.ezQboIntegrationEmployeeLinkerViewController;

        if (!ezApi.ezIsEmptyArray(ezApi.ezclocker.ezClockerContext.employees)) {
            return ezApi.ezResolve();
        }

        return ezApi.ezPromise(function(resolve) {
            ezApi.ezclocker.http.ezGet('/_api/v1/employees').then(
                function(response) {
                    if (ezApi.isNotValid(response) || 0 != response.errorCode) {
                        ezApi.ezclocker.ezClockerContext.employees = [];
                    }
                    ezApi.ezclocker.ezClockerContext.employees = ezApi.ezIsEmptyArray(response.entities) ? [] :
                        response.entities;
                    return resolve();
                },
                function(eResponse) {
                    ezApi.ezclocker.logger.error('Failed to obtain the integration\'s employee listing: {}', eResponse);
                    ezApi.ezclocker.ezClockerContext.employees = [];
                    return resolve();
                });
        });
    }
    /**
     * @public * Obtains the integration employees map
     * @returns {Promise}
     */
    _EzGetEmployeeIntegrationMap() {
        var self = ezApi.ezclocker.ezQboIntegrationEmployeeLinkerViewController;

        if (!ezApi.ezIsEmptyArray(ezApi.ezclocker.ezClockerContext.employeeIntegrationMap)) {
            return ezApi.ezResolve();
        }

        return ezApi.ezPromise(function(resolve) {
            ezApi.ezclocker.http.ezGet('/_api/v1/integrations/' + self.ezIntegrationProviderId + '/query/employee-map')
                .then(ezApi.ezclocker.ezServices.ezProcessApiResponse, ezApi.ezclocker.ezServices.ezProcessApiReject)
                .then(
                    function(response) {
                        ezApi.ezclocker.ezClockerContext.employeeIntegrationMap = ezApi.ezArrayOrEmpty(response.entities)
                            .reduce(function(map, obj) {
                                map[obj.providerEmployeeId] = obj;
                                return map;
                            }, {});
                        return resolve();
                    },
                    function(eResponse) {
                        ezApi.ezclocker.logger.error('Failed to obtain the integration\'s employee listing: {}', eResponse);
                        ezApi.ezclocker.ezClockerContext.employeeIntegrationMap = [];
                        return resolve();
                    });
        });
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
    ezUpdateEmployeeLinkerValues(dropDownButtonId,
        linkerId, linkEmployeeId, linkEmployeeName, linkEmployeeType, linkAction) {
        var self = ezApi.ezclocker.ezQboIntegrationEmployeeLinkerViewController;

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
        var self = ezApi.ezclocker.ezQboIntegrationEmployeeLinkerViewController;

        var ezEmployees = ezApi.ezclocker.ezClockerContext.employees;
        var extEmployees = ezApi.ezclocker.ezClockerContext.integrationEmployees;

        // Clear out instructions and content
        ezUi.ezHtml('EzWizard_Instructions', '');
        ezUi.ezHtml('EzWizard_Content', '');

        // Render the instructions and content
        ezUi.ezHtml('EzWizard_Instructions', self._EzBuildWizardInstructions(ezEmployees, extEmployees));
        ezUi.ezHtml('EzWizard_Content', self._EzBuildEmployeeLinkerGrid(ezEmployees, extEmployees));
    }
    /**
     * Builds the wizard instructions
     * @returns {string}
     */
    _EzBuildWizardInstructions(ezEmployees, extEmployees) {
        if (ezApi.ezIsEmptyArray(ezEmployees) && ezApi.ezIsEmptyArray(extEmployees)) {
            return 'Both ezClocker and the integration have zero employees. ' +
                'Please add employees to ezClocker and your Integration before attempting to export time entries. ' +
                'Press Cancel to exit the wizard.';
        }

        if (ezApi.ezIsEmptyArray(ezEmployees)) {
            return 'ezClocker does not have any employees to export time entries for. ' +
                'Please add employees and time entries for the employees to ezClocker and try again. ' +
                'Press Cancel to exit the wizard.';
        }

        if (ezApi.ezIsEmptyArray(extEmployees)) {
            return 'Your QuickBooks company does not have any employees. Please add employees to your QuickBooks company ' +
                'and then return to this screen and click refresh. Press Cancel to exit wizard.';
        }

        return 'In order for ezClocker to export time data to the correct employee in QuickBooks please match the QuickBooks employee on the left with the ezClocker ' +
            'employee on the right. If ezClocker does not have a matching employee, select Ignore.';
    }
    /**
     * @private
     * Grid Building Step 1: Build the linker grid
     * @returns {string}
     */
    _EzBuildEmployeeLinkerGrid(ezEmployees, extEmployees) {
        var self = ezApi.ezclocker.ezQboIntegrationEmployeeLinkerViewController;

        return '<table id="EzIntegration_EmployeeLinkGrid" class="ezIntegrationEmployeeLinkGrid">' +
            self._EzBuildLinkerGridHeader() +
            self._EzBuildLinkerGridEmployeeLinkRows(ezEmployees, extEmployees) +
            '</table>';
    }
    /**
     * Grid Building Step 2: Build the linker grid's header rows
     * @returns {string}
     */
    _EzBuildLinkerGridHeader() {
        var self = ezApi.ezclocker.ezQboIntegrationEmployeeLinkerViewController;

        return ezHtml.$thead('', '',
            ezHtml.$tr(
                'EzIntegration_EmployeeLinkGrid_HeaderRow',
                'ezIntegrationEmployeeLinkGridHeaderRow',
                // Left side
                ezHtml.$td(
                    self._EzBuildELGElementId('EzIntegration_EmployeeLinkGrid_HeaderCell', false, true),
                    'ezIntegrationEmployeeLinkGridHeaderCell',
                    ezHtml.$table(
                        self._EzBuildELGElementId('EzIntegration_EmployeeLinkGrid_HeaderLayoutGrid', false, true),
                        'ezIntegrationEmployeeLinkGridHeaderTextLayoutGrid',
                        ezHtml.$tr(
                            self._EzBuildELGElementId('EzIntegration_EmployeeLinkGrid_HeaderLayoutGrid_HeaderRow', false, true),
                            null,
                            ezHtml.$td(
                                self._EzBuildELGElementId('EzIntegration_EmployeeLinkGrid__HeaderLayoutGrid_NameCell', false, true),
                                null,
                                ezHtml.$div(
                                    self._EzBuildELGElementId('EzIntegration_EmployeeLinkGrid_HeaderName', false, true),
                                    'ezIntegrationEmployeeLinkGridHeaderText', 'QuickBooks Employees')
                            ) +
                            ezHtml.$td(
                                self._EzBuildELGElementId('EzIntegration_EmployeeLinkGrid_HeaderLayoutGrid_EmptyCell', false, true),
                                null,
                                null) + // content
                            ezHtml.$td(
                                self._EzBuildELGElementId('EzIntegration_EmployeeLinkGrid__HeaderLayoutGrid_RefreshButtonCell', false,
                                    true), '',
                                ezHtml.$div(
                                    self._EzBuildELGElementId('EzIntegration_EmployeeLinkGrid_HeaderRefreshButton_Container', false,
                                        true),
                                    'ezIntegrationEmployeeRefreshButtonBox',
                                    ezHtml.$button(
                                        self._EzBuildELGElementId('EzIntegration_EmployeeLinkGrid_HeaderRefreshButton', false, true),
                                        'ezIntegrationEmployeeRefreshButton',
                                        'button',
                                        'ezApi.ezclocker.ezQboIntegrationEmployeeLinkerViewController.ezRefreshIntegrationEmployees()',
                                        null,
                                        'Refresh')
                                )
                            )
                        )
                    )
                ) +
                // Right side
                ezHtml.$td(
                    self._EzBuildELGElementId('EzIntegration_EmployeeLinkGrid_HeaderCell', true),
                    'ezIntegrationEmployeeLinkGridHeaderCell',
                    ezHtml.$table(
                        self._EzBuildELGElementId('EzIntegration_EmployeeLinkGrid_HeaderLayoutGrid', true),
                        'ezIntegrationEmployeeLinkGridHeaderTextLayoutGrid',
                        ezHtml.$tr(
                            self._EzBuildELGElementId('EzIntegration_EmployeeLinkGrid_HeaderLayoutGrid_HeaderRow', true), null,
                            ezHtml.$td(
                                self._EzBuildELGElementId('EzIntegration_EmployeeLinkGrid__HeaderLayoutGrid_NameCell', true), null,
                                ezHtml.$div(
                                    self._EzBuildELGElementId('EzIntegration_EmployeeLinkGrid_HeaderName', true),
                                    'ezIntegrationEmployeeLinkGridHeaderText', 'ezClocker Employees')
                            ) +
                            ezHtml.$td(self._EzBuildELGElementId('EzIntegration_EmployeeLinkGrid_HeaderLayoutGrid_EmptyCell', true),
                                null, null)
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
    _EzBuildLinkerGridEmployeeLinkRows(ezEmployees,
        extEmployees) {
        var self = ezApi.ezclocker.ezQboIntegrationEmployeeLinkerViewController;

        var ezLength = ezApi.ezIsNotEmptyArray(ezEmployees) ? ezEmployees.length : 0;
        ezApi.ezclocker.logger.debug('[Linker Grid] Total ezClocker employee Count: ' + ezLength);

        var extLength = ezApi.ezIsNotEmptyArray(extEmployees) ? extEmployees.length : 0;
        ezApi.ezclocker.logger.debug('[Linker Grid] Total integration employee Count: ' + ezLength);

        self.employeeLinkerCount = extLength;
        /*if (0 !== ezLength && 0 !== extLength) {
            self.employeeLinkerCount = ezLength < extLength ? ezLength : extLength;
            ezApi.ezclocker.logger.debug("[Linker Grid] Using the lowest employee count: " + self.employeeLinkerCount);
        }
        else if (0 === extLength) {
            self.employeeLinkerCount = extLength;
            ezApi.ezclocker.logger.debug(
                "[Linker Grid] Using the integrations employee count: " + self.employeeLinkerCount);
        }
        else {
            ezApi.ezclocker.logger.debug("[Linker Grid] Using the ezClocker employee count: " + self.employeeLinkerCount);
        }*/
        return ezHtml.$tbody('EzIntegration_EmployeeLinkGrid_Body', null,
            self._EzBuildRowsFromEmployeeLinkerCount(self.employeeLinkerCount, ezEmployees, extEmployees));
    }
    /**
     * Uses the employeeLinkerCount to determine the number of employee linker rows to build.
     * @param {Array} ezEmployees
     * ezClocker employee list
     * @param {Array} extEmployees
     * Integration employee list
     * @returns {string}
     */
    _EzBuildRowsFromEmployeeLinkerCount(linkRowCount,
        ezEmployees, extEmployees) {
        var self = ezApi.ezclocker.ezQboIntegrationEmployeeLinkerViewController;

        var employeeLinkerRows = '';
        if (linkRowCount == 0) {
            employeeLinkerRows += '<tr><td colspan="2">No employees in QuickBook found. Please add employees and click on refresh</td></tr>';
        }
        for (var rowIndex = 0; rowIndex < linkRowCount; rowIndex++) {
            employeeLinkerRows += self._EzBuildEmployeeLinkRow(rowIndex, ezEmployees, extEmployees);
        }
        return employeeLinkerRows;
    }
    /**
     * @private
     * Grid Building Step 4: Build the employee link grid "linker" rows
     * @returns {string}
     */
    _EzBuildEmployeeLinkRow(rowIndex, ezEmployees,
        extEmployees) {
        var self = ezApi.ezclocker.ezQboIntegrationEmployeeLinkerViewController;

        var linkRowIdIndex = 'r' + ezApi.ezNumberToString(rowIndex);
        ezApi.ezclocker.logger.debug('[Linker Grid] Building employee link row ' + linkRowIdIndex);

        return '<!-- employee link #' + rowIndex + '-->' +
            '<tr id="_ezIntegration_EmployeeLinkGrid_EmployeeRow_' + linkRowIdIndex +
            '" class="ezIntegrationEmployeeLinkGridEmployeeRow">' +
            '<td id="_ezIntegration_EmployeeLinkGrid_EmployeeCell_ezleft.' + linkRowIdIndex +
            '" class="ezIntegrationEmployeeLinkGridEmployeeCell">' +
            //self._EzBuildEzClockerEmployeeComboBox(rowIndex, ezEmployees) +
            self._EzBuildIntegrationEmployeeSimpleComboBox(rowIndex, extEmployees) +
            '</td><td id="_ezIntegration_EmployeeLinkGrid_EmployeeCell_ezright.' + linkRowIdIndex +
            '" class="ezIntegrationEmployeeLinkGridEmployeeCell">' +
            //self._EzBuildIntegrationEmployeeComboBox(rowIndex, extEmployees) +
            self._EzBuildEzClockerEmployeeSimpleComboBox(rowIndex, ezEmployees) +
            '</td></tr>';
    }
    /**
     * @private
     * Builds a simple combo box for link selection of ezClocker employees.
     * @param {number} rowIndex
     * @param {Array} ezEmployees
     * @returns {string}
     */
    _EzBuildEzClockerEmployeeSimpleComboBox(rowIndex,
        ezEmployees) {
        var self = ezApi.ezclocker.ezQboIntegrationEmployeeLinkerViewController;

        // Simple combo boxes
        var selectId = self._EzBuildELGElementId('EzIntegration_EmployeeLinkGrid_EmployeeComboBox', true, false, rowIndex);
        return ezHtml.$select(
            selectId,
            'ezEmployeeComboBox',
            'onchange="' +
            'ezApi.ezclocker.ezQboIntegrationEmployeeLinkerViewController.ezHandleEzSelectChange(' +
            rowIndex + ',\'' + selectId + '\')"',
            self._EzBuildEzClockerOtherItems(rowIndex) +
            self._EzBuildEmployeeSimpleComboBoxItems(rowIndex, true, false, ezEmployees));
    }
    /**
     * Gets the selected employee if already mapped
     */
    ezGetSelectedEmployee(rowIndex, employeeId) {
        var providerEmployeeId = ezApi.ezclocker.ezClockerContext.integrationEmployees[rowIndex].providerEmployeeId;
        var intMap = ezApi.ezclocker.ezClockerContext.employeeIntegrationMap;
        if (ezApi.isValid(intMap[providerEmployeeId]) && ezApi.isValid(employeeId)
            && intMap[providerEmployeeId].employeeId === employeeId) {
            return 'selected ';
        }
        return ' ';
    }
    /**
     * @private
     * Builds the integration's OTHER selection items
     * @param {number} rowIndex
     * @returns {string}
     */
    _EzBuildEzClockerOtherItems(rowIndex) {
        var self = ezApi.ezclocker.ezQboIntegrationEmployeeLinkerViewController;

        return ezHtml.$option(
            self._EzBuildELGElementId('EzIntegration_EmployeeLinkGrid_EmployeeComboBoxItem_IGNORE', false, true, rowIndex),
            null,
            'IGNORE',
            null,
            'Ignore');
    }
    /**
     * @private
     * Builds a simple combo box for link selection of external employees.
     * @param {number} rowIndex
     * @param {Array} extEmployees
     * @returns {string}
     */
    _EzBuildIntegrationEmployeeSimpleComboBox(rowIndex,
        extEmployees) {
        var self = ezApi.ezclocker.ezQboIntegrationEmployeeLinkerViewController;

        var selectId = self._EzBuildELGElementId('EzIntegration_EmployeeLinkGrid_EmployeeComboBox', false, true, rowIndex);

        return ezHtml.$div(selectId,
            'ezIntegrationEmployeeLinkGridHeaderText', extEmployees[rowIndex].employeeName);
    }
    /**
     * @private
     * Builds the integration's OTHER selection items
     * @param {number} rowIndex
     * @returns {string}
     */
    _EzBuildIntegrationOtherItems(rowIndex) {
        var self = ezApi.ezclocker.ezQboIntegrationEmployeeLinkerViewController;

        return ezHtml.$option(
            self._EzBuildELGElementId('EzIntegration_EmployeeLinkGrid_EmployeeComboBoxItem_IGNORE', false, true, rowIndex),
            null,
            'IGNORE',
            null,
            'Ignore');
    }
    /**
     * @private
     * Builds the option tag for the select combo box for each employee.
     * @param {number} rowIndex
     * @param {boolean|null} isLeft
     * @param {null|boolean} isRight
     * @param {Array} employees
     * @returns {string}
     */
    _EzBuildEmployeeSimpleComboBoxItems(rowIndex,
        isLeft, isRight, employees) {
        var self = ezApi.ezclocker.ezQboIntegrationEmployeeLinkerViewController;

        var linkerEmployeeType = ezApi.ezIsTrue(isLeft) ? 'ez' : 'ext';

        var employeeComboItems = '';
        for (var eIndex = 0; eIndex < employees.length; eIndex++) {
            if (0 === eIndex) {
                // Simple combo boxes
                self.extEmployeeLinkerValues[linkerEmployeeType + '-' + rowIndex] = {
                    employeeIndex: eIndex,
                    employeeName: employees[eIndex].employeeName,
                    action: 'LINK'
                };
            }
            employeeComboItems += ezHtml.$option(
                self._EzBuildELGElementId('EzIntegration_EmployeeLinkGrid_EmployeeComboBoxItem', isLeft, isRight, rowIndex),
                null,
                ezApi.ezNumberToString(eIndex),
                self.ezGetSelectedEmployee(rowIndex, employees[eIndex].id),
                employees[eIndex].employeeName);
        }
        return employeeComboItems;
    }
    /**
     * @deprecated Bootstrap combo box
     * @private
     * Grid Building Step 5: Builds the an employee combo box for ezClocker employees.
     * @param {Array} ezEmployees
     * @returns {string}
     */
    _EzBuildEzClockerEmployeeComboBox(rowIndex, ezEmployees) {
        var self = ezApi.ezclocker.ezQboIntegrationEmployeeLinkerViewController;

        var dropDownButtonId = self._EzBuildELGElementId('EzIntegration_EmployeeLinkGrid_EmployeeComboBox', true, false, rowIndex);

        return ezHtml.$div(
            self._EzBuildELGElementId('EzIntegration_EmployeeLinkGrid_EmployeeList', true, false, rowIndex),
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
                self._EzBuildELGElementId('EzIntegration_EmployeeLinkGrid_EmployeeMenu', true, false, rowIndex), 'dropdown-menu',
                self._EzBuildEmployeeComboBoxMenu('ezClocker Employees', true, rowIndex, ezEmployees, dropDownButtonId) +

                ezHtml.$h(6,
                    self._EzBuildELGElementId('EzIntegration_EmployeeLinkGrid_EmployeeMenu_OtherHeader', true, false, rowIndex),
                    'dropdown-header ezIntegrationEmployeeMenuHeader',
                    'Other Options') +

                ezHtml.$comment('take no action') +
                ezHtml.$button(
                    self._EzBuildELGElementId('EzIntegration_EmployeeLinkGrid_EmployeeMenu_NonItemButton', true, false, rowIndex, '',
                        'none'),
                    'ezNoButtonMargin dropdown-item',
                    'button',
                    self._EzBuildEmployeeComboBoxOnClickHandler({
                        employeeId: -1,
                        employeeName: 'None'
                    }, 'ez', dropDownButtonId),
                    null,
                    ezHtml.$div(
                        self._EzBuildELGElementId('EzIntegration_EmployeeLinkGrid_EmployeeMenu_ItemName', true, false, rowIndex, '',
                            'none'),
                        'ezIntegrationOtherLinkActionBox',
                        'None')
                ) +

                ezHtml.$comment('create new employee') +
                ezHtml.$button(
                    self._EzBuildELGElementId('EzIntegration_EmployeeLinkGrid_EmployeeMenu_CreateNewItemButton', rowIndex, '',
                        'create'),
                    'ezNoButtonMargin dropdown-item',
                    'button',
                    self._EzBuildEmployeeComboBoxOnClickHandler({
                        employeeId: -1,
                        employeeName: 'Create a New ezClocker Employee'
                    }, 'ez', dropDownButtonId),
                    null,
                    ezHtml.$div(
                        self._EzBuildELGElementId('EzIntegration_EmployeeLinkGrid_EmployeeMenu_ItemName', rowIndex, '', 'create'),
                        'ezIntegrationOtherLinkActionBox',
                        'Create a New ezClocker Employee')
                )
            )
        );

    }
    /**
     * @deprecated Bootstrap combo box
     * @private
     * Grid Building Step 6: Build the integration employee combo box
     * Stores the initial build run and reuses the html to avoid multiple builds of the same content.
     * @param {Array} extEmployees
     * @returns {string}
     */
    _EzBuildIntegrationEmployeeComboBox(rowIndex, extEmployees) {
        var self = ezApi.ezclocker.ezQboIntegrationEmployeeLinkerViewController;

        var dropDownButtonId = self._EzBuildELGElementId('EzIntegration_EmployeeLinkGrid_EmployeeComboBox_', false, true, rowIndex);

        return ezHtml.$div(
            self._EzBuildELGElementId('EzIntegration_EmployeeLinkGrid_EmployeeList', false, true, rowIndex),
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
                self._EzBuildELGElementId('EzIntegration_EmployeeLinkGrid_EmployeeMenu', false, true, rowIndex),
                'dropdown-menu',
                self._EzBuildEmployeeComboBoxMenu('Integration Employees', false, rowIndex, extEmployees, dropDownButtonId) +
                ezHtml.$h(6,
                    self._EzBuildELGElementId('EzIntegration_EmployeeLinkGrid_EmployeeMenu_OtherHeader', false, true, rowIndex),
                    'dropdown-header ezIntegrationEmployeeMenuHeader', 'Other Options') +
                ezHtml.$comment('Ignore Action') +
                ezHtml.$button(
                    self._EzBuildELGElementId('EzIntegration_EmployeeLinkGrid_EmployeeMenu_NonItemButton', false, true, rowIndex, '',
                        'ignore'),
                    'ezNoButtonMargin dropdown-item',
                    'button',
                    self._EzBuildEmployeeComboBoxOnClickHandler({
                        employeeId: -1,
                        employeeName: 'none'
                    }, 'ext', dropDownButtonId),
                    null,
                    ezHtml.$div(
                        self._EzBuildELGElementId('EzIntegration_EmployeeLinkGrid_EmployeeMenu_ItemName', false, true, rowIndex, '',
                            'ignore'),
                        'ezIntegrationOtherLinkActionBox', 'Ignore')
                )
            )
        );
    }
    /**
     * @deprecated Bootstrap combo box
     * @private
     * Grid Building Step 5a and 6a: Build an employee combox menu for the provided employees
     * @param {string} employeeGroupName
     * @param {boolean} isEzEmployee
     * @param {Array} employeesToUse
     * @param {dropDownButtonId} dropDownButtonId
     * @returns {string}
     */
    _EzBuildEmployeeComboBoxMenu(employeeGroupName,
        isEzEmployee, rowIndex, employeesToUse, dropDownButtonId) {
        var self = ezApi.ezclocker.ezQboIntegrationEmployeeLinkerViewController;

        var linkerEmployeeType = ezApi.ezIsTrue(isEzEmployee) ? 'ez' : 'ext';
        self.ezEmployeeLinkerValues[linkerEmployeeType] = {
            employeeId: -1,
            employeeName: 'ez' === linkerEmployeeType ? 'Select ezClocker employee...' : 'Select integration employee...',
            employeeType: linkerEmployeeType,
            action: 'ez' === linkerEmployeeType ? 'none' : 'ignore'
        };

        return ezHtml.$h(6,
            self._EzBuildELGElementId('EzIntegration_EmployeeLinkGrid_EmployeeMenu_EmployeesHeader', isEzEmployee, !isEzEmployee,
                rowIndex),
            'dropdown-header ezIntegrationEmployeeMenuHeader',
            employeeGroupName) +
            self._EzBuildEmployeeComboBoxMenuEmployeeComboBox(linkerEmployeeType, isEzEmployee, rowIndex, employeesToUse, dropDownButtonId);
    }
    /**
     * @deprecated Bootstrap combo box
     * @private
     * Builds the employee combobox
     * @param {string} linkerEmployeeType
     * Either ez or ext
     * @param {boolean} isEzEmployee
     * @param {number} rowIndex
     * @param {Array} employeesToUse,
     * @param {string} dropDownButtonId
     * So the name can be updated when selected
     */
    _EzBuildEmployeeComboBoxMenuEmployeeComboBox(linkerEmployeeType, isEzEmployee, rowIndex, employeesToUse, dropDownButtonId) {
        var self = ezApi.ezclocker.ezQboIntegrationEmployeeLinkerViewController;

        var employeeComboBox = '';
        for (var eIndex = 0; eIndex < employeesToUse.length; eIndex++) {
            var employee = employeesToUse[eIndex];
            employeeComboBox += ezHtml.$button(
                self._EzBuildELGElementId('EzIntegration_EmployeeLinkGrid_EmployeeMenu_EmployeeItemButton-' + linkerEmployeeType,
                    isEzEmployee, !isEzEmployee, rowIndex, eIndex),
                'ezNoButtonMargin dropdown-item active',
                'button',
                self._EzBuildEmployeeComboBoxOnClickHandler(employee, linkerEmployeeType, dropDownButtonId),
                null,
                ezHtml.$div(self._EzBuildELGElementId('EzIntegration_EmployeeLinkGrid_EmployeeMenu_ItemBox-' + linkerEmployeeType,
                    isEzEmployee, !isEzEmployee, rowIndex, eIndex),
                'ezIntegrationEmployeeBox',
                ezHtml.$div(self._EzBuildELGElementId('EzIntegration_EmployeeLinkGrid_EmployeeMenu_ItemName-' + linkerEmployeeType,
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
     * @private
     * Creates the JS that assigned to the onclick handler of the employee combo box employee item button.
     *
     * @param {object} employee
     * @param {string} linkerEmployeeType
     * Either ez or ext
     * @param {string} dropDownButtonId
     * Id of button whos name will get updated when the combo item is clicked.
     * @returns {string}
     */
    _EzBuildEmployeeComboBoxOnClickHandler(employee,
        linkerEmployeeType, dropDownButtonId) {

        return 'ezApi.ezclocker.ezQboIntegrationEmployeeLinkerViewController.ezUpdateEmployeeLinkerValues(' +
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
     * {elementId}-{ezleft|ezright}{null|-r{rowIndex}}{null|-e{employeeIndex}}{null|-{suffix}}
     * @returns {string}
     */
    _EzBuildELGElementId(elementId, isLeft, isRight,
        rowIndex, employeeIndex, suffix) {

        var elgEId = ezApi.ezIsEmptyString(elementId) ? '_EZ-' : elementId + '-';
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
EzQboIntegrationEmployeeLinkerViewController.ezApiName = 'ezQboIntegrationEmployeeLinkerViewController';
document.addEventListener('onEzApiReady', function() {
    ezApi.ezRegisterApi(EzQboIntegrationEmployeeLinkerViewController.ezApiName,
        new EzQboIntegrationEmployeeLinkerViewController(
            'ezQboIntegrationEmployeeLinkerContainer',
            'EZ_INTEGRATION_QUICKBOOKS_ONLINE_PROVIDER')).ezInit();
});

export {
    EzQboIntegrationEmployeeLinkerViewController
};