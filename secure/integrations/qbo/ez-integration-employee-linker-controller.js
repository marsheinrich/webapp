/* exported EzIntegrationEmployeeLinkerViewControllerId */
/**
 * @public
 * Controller for the ezClocker Integrations Employee Linker wizard page.
 *
 * @param {parentId}
 * The element id for the container
 *
 * @returns {EzIntegrationEmployeeLinkerViewController}
 */
function EzIntegrationEmployeeLinkerViewController() {
    this.ready = false;

    this.ezIntegrationEmployeeLinkerViewControllerId = 'ezIntegrationEmployeeLinkerViewController';

    this.ezIntegrationProviderId = 'EZ_INTEGRATION_QUICKBOOKS_ONLINE_PROVIDER';

    this.ezQBOContextId = 'ezQboIntegrationWizardId';
    this.ezGetEzIntegrationProviderId = function() {
        return ezApi.ezclocker.ezIntegrationEmployeeLinkerViewController.ezIntegrationProviderId;
    };

    this.ezEmployeeLinkerValues = [];
    this.ezGetEzEmployeeLinkerValues = function() {
        return ezApi.ezclocker.ezIntegrationEmployeeLinkerViewController.ezEmployeeLinkerValues;
    };

    this.extEmployeeLinkerValues = {};
    this.ezGetExtEmployeeLinkerValues = function() {
        return ezApi.ezclocker.ezIntegrationEmployeeLinkerViewController.extEmployeeLinkerValues;
    };

    return this;
}


/**
 * @protected
 * Initializes the EzIntegrationEmployeeLinkerViewControllerId
 *
 * @returns {EzIntegrationEmployeeLinkerViewController}
 */
EzIntegrationEmployeeLinkerViewController.prototype.ezInit = function() {
    var self = ezApi.ezclocker.ezIntegrationEmployeeLinkerViewController;

    self.ezInitUX();

    self.ready = true;
    return self;
};

/**
 * @protected
 * Initialzies the UX for EzIntegrationEmployeeLinkerViewControllerId
 */
EzIntegrationEmployeeLinkerViewController.prototype.ezInitUX = function() {
    var self = ezApi.ezclocker.ezIntegrationEmployeeLinkerViewController;

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
};

/**
 * @public
 * Saves the employee maps
 */
EzIntegrationEmployeeLinkerViewController.prototype.ezSaveEmployeeMaps = function() {
    var self = ezApi.ezclocker.ezIntegrationEmployeeLinkerViewController;

    return ezApi.ezPromise(function(resolve) {
        function __EzHandlePostEmployeeIntegrationMapSuccess(response) {
            ezApi.ezclocker.logger.debug(ezApi.ezToJson(response));
            resolve(response);
        }

        function __EzHandlePostEmployeeIntegrationMapFailure(eResponse) {
            ezApi.ezclocker.logger.debug(ezApi.ezToJson(eResponse));
            resolve(eResponse);
        }
        if (self.ezEmployeeLinkerValues.length === 0) {
            return resolve();
        }
        var employeeIntegrationMapRequestList = [];
        for (var lIndex in self.ezEmployeeLinkerValues) {
            var ezLink = self.ezEmployeeLinkerValues[lIndex];
            var extEmployee = ezApi.ezclocker.ezClockerContext.integrationEmployees[lIndex];
            var shouldRemove = false;

            employeeIntegrationMapRequestList.push({
                integrationProviderId: extEmployee.integrationProviderId,
                ezEmployerId: ezApi.ezclocker.ezClockerContext.ezGetActiveEmployer().id,
                ezEmployeeId: ezLink.employeeId,
                providerConnectionId: extEmployee.providerConnectionId,
                providerEmployeeId: extEmployee.providerEmployeeId,
                providerEmployeeName: extEmployee.employeeName,
                id: ezLink.id,
            });
        }

        self.ezPostEmployeeIntegrationMap(employeeIntegrationMapRequestList).then(
            __EzHandlePostEmployeeIntegrationMapSuccess,
            __EzHandlePostEmployeeIntegrationMapFailure);
    });
};

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
EzIntegrationEmployeeLinkerViewController.prototype.ezPostEmployeeIntegrationMap = function(employeeIntegrationMapRequestList) {
    var self = ezApi.ezclocker.ezIntegrationEmployeeLinkerViewController;
    var url = '/_api/v1/integrations/' + self.ezIntegrationProviderId + '/employee-map';

    return ezApi.ezclocker.http.ezPost(url, ezApi.ezToJson(employeeIntegrationMapRequestList));
};
/**
 * @public
 * Handles the select change for ezClocker employees
 *
 * @param {number} rowIndex
 * @param {string} selectId
 */
EzIntegrationEmployeeLinkerViewController.prototype.ezHandleEzSelectChange = function(rowIndex, selectId) {
    var self = ezApi.ezclocker.ezIntegrationEmployeeLinkerViewController;

    var employeeId = ezUi.ezGetInputValue(selectId);
    var employeeName = ezUi.ezGetSelectText(selectId);
    var linkAction = 'LINK';
    if ('IGNORE' === employeeId) {
        linkAction = 'IGNORE';
        self.ezEmployeeLinkerValues[rowIndex].employeeId = -1;
    } else {
        self.ezEmployeeLinkerValues[rowIndex].employeeId = employeeId;
    }
    self.ezEmployeeLinkerValues[rowIndex].action = linkAction;
};

/**
 * @public
 * Refreshes the integration employee data
 */
EzIntegrationEmployeeLinkerViewController.prototype.ezRefreshIntegrationEmployees = function() {
    var self = ezApi.ezclocker.ezIntegrationEmployeeLinkerViewController;

    ezUi.ezStartPageWait('Refreshing integration employee list...', function(waitDone) {
        self._EzGetIntegrationEmployees()
            .then(self.ezRenderUx)
            .then(waitDone);
    });
};

/**
 * @public
 * Refreshes the ezClocker employees
 */
EzIntegrationEmployeeLinkerViewController.prototype.ezRefreshEzClockerEmployees = function() {
    var self = ezApi.ezclocker.ezIntegrationEmployeeLinkerViewController;

    ezUi.ezStartPageWait('Refreshing integration employee list...', function(waitDone) {
        ezApi.ezclocker.ezClockerContext.ezRefreshActiveEmployerEmployees()
            .then(self.ezRenderUx)
            .then(waitDone);
    });
};

/**
 * @public * Obtains the integration employees
 * @returns {Promise}
 */
EzIntegrationEmployeeLinkerViewController.prototype._EzGetIntegrationEmployees = function() {
    var self = ezApi.ezclocker.ezIntegrationEmployeeLinkerViewController;

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
};

/**
 * @public * Obtains the integration employees
 * @returns {Promise}
 */
EzIntegrationEmployeeLinkerViewController.prototype._EzGetEmployees = function() {
    var self = ezApi.ezclocker.ezIntegrationEmployeeLinkerViewController;

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
};


/**
 * @public * Obtains the integration employees map
 * @returns {Promise}
 */
EzIntegrationEmployeeLinkerViewController.prototype._EzGetEmployeeIntegrationMap = function() {
    var self = ezApi.ezclocker.ezIntegrationEmployeeLinkerViewController;

    return ezApi.ezPromise(function(resolve) {
        ezApi.ezclocker.http.ezGet('/_api/v1/integrations/' + self.ezIntegrationProviderId + '/query/employee-map').then(
            function(response) {
                if (ezApi.isNotValid(response) || 0 != response.errorCode) {
                    ezApi.ezclocker.ezClockerContext.employeeIntegrationMap = [];
                }
                ezApi.ezclocker.ezClockerContext.employeeIntegrationMap = response.entities.reduce(function(map, obj) {
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
};

/**
 * @public
 * Fades in the wizard page
 */
EzIntegrationEmployeeLinkerViewController.prototype.ezShow = function() {
    ezUi.ezFadeIn('ezWizardView');
};

/**
 * @protected
 * Builds the employee linker grid with the data available.
 */
EzIntegrationEmployeeLinkerViewController.prototype.ezRenderUx = function() {
    var self = ezApi.ezclocker.ezIntegrationEmployeeLinkerViewController;

    var ezEmployees = ezApi.ezclocker.ezClockerContext.employees;
    var extEmployees = ezApi.ezclocker.ezClockerContext.integrationEmployees;

    // Clear out instructions and content
    ezUi.ezHtml('EzWizard_Instructions', '');
    ezUi.ezHtml('EzWizard_Content', '');

    // Render the instructions and content
    ezUi.ezHtml('EzWizard_Instructions', self._EzBuildWizardInstructions(ezEmployees, extEmployees));
    ezUi.ezHtml('EzWizard_Content', self._EzBuildEmployeeLinkerGrid(ezEmployees, extEmployees));
};

/**
 * @private
 * Builds the wizard instructions
 * @returns {string}
 */
EzIntegrationEmployeeLinkerViewController.prototype._EzBuildWizardInstructions = function(ezEmployees, extEmployees) {
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
};

/**
 * @private
 * Grid Building Step 1: Build the linker grid
 * @returns {string}
 */
EzIntegrationEmployeeLinkerViewController.prototype._EzBuildEmployeeLinkerGrid = function(ezEmployees, extEmployees) {
    var self = ezApi.ezclocker.ezIntegrationEmployeeLinkerViewController;

    return '<table id="EzIntegration_EmployeeLinkGrid" class="ezIntegrationEmployeeLinkGrid">' +
        self._EzBuildLinkerGridHeader() +
        self._EzBuildLinkerGridEmployeeLinkRows(ezEmployees, extEmployees) +
        '</table>';
};

/**
 * @private
 * Grid Building Step 2: Build the linker grid's header rows
 * @returns {string}
 */
EzIntegrationEmployeeLinkerViewController.prototype._EzBuildLinkerGridHeader = function() {
    var self = ezApi.ezclocker.ezIntegrationEmployeeLinkerViewController;

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
                        null, // class
                        ezHtml.$td(
                            self._EzBuildELGElementId('EzIntegration_EmployeeLinkGrid__HeaderLayoutGrid_NameCell', false, true),
                            null, // class
                            ezHtml.$div(
                                self._EzBuildELGElementId('EzIntegration_EmployeeLinkGrid_HeaderName', false, true),
                                'ezIntegrationEmployeeLinkGridHeaderText', 'QuickBooks Employees')
                        ) +
                        ezHtml.$td(
                            self._EzBuildELGElementId('EzIntegration_EmployeeLinkGrid_HeaderLayoutGrid_EmptyCell', false, true),
                            null, // class
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
                                    'ezApi.ezclocker.ezIntegrationEmployeeLinkerViewController.ezRefreshIntegrationEmployees()', // click
                                    null, // additional
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
};

/**
 * @private
 * Grid Building Step 3: Build the employee linker rows for the grid
 * @param {Array} ezEmployees
 * @param {Array} extEmployees
 * @returns {string}
 */
EzIntegrationEmployeeLinkerViewController.prototype._EzBuildLinkerGridEmployeeLinkRows = function(ezEmployees,
    extEmployees) {
    var self = ezApi.ezclocker.ezIntegrationEmployeeLinkerViewController;

    var ezLength = ezApi.ezIsNotEmptyArray(ezEmployees) ? ezEmployees.length : 0;
    ezApi.ezclocker.logger.debug('[Linker Grid] Total ezClocker employee Count: ' + ezLength);

    var extLength = ezApi.ezIsNotEmptyArray(extEmployees) ? extEmployees.length : 0;
    ezApi.ezclocker.logger.debug('[Linker Grid] Total integration employee Count: ' + ezLength);

    self.employeeLinkerCount = extLength;

    return ezHtml.$tbody('EzIntegration_EmployeeLinkGrid_Body', null,
        self._EzBuildRowsFromEmployeeLinkerCount(self.employeeLinkerCount, ezEmployees, extEmployees));
};

/**
 * @private
 * Uses the employeeLinkerCount to determine the number of employee linker rows to build.
 *
 * @param {Number} linkRowCount
 * @param {Array} ezEmployees
 * ezClocker employee list
 * @param {Array} extEmployees
 * Integration employee list
 * @returns {string}
 */
EzIntegrationEmployeeLinkerViewController.prototype._EzBuildRowsFromEmployeeLinkerCount = function(linkRowCount,
    ezEmployees, extEmployees) {
    var self = ezApi.ezclocker.ezIntegrationEmployeeLinkerViewController;

    var employeeLinkerRows = '';
    if (0 === linkRowCount) {
        employeeLinkerRows += '<tr><td colspan="2">No employees in QuickBook found. Please add employees and click on refresh</td></tr>';
    }
    var intMap = ezApi.ezclocker.ezClockerContext.employeeIntegrationMap;


    for (var rowIndex = 0; rowIndex < linkRowCount; rowIndex++) {

        employeeLinkerRows += self._EzBuildEmployeeLinkRow(rowIndex, ezEmployees, extEmployees);

        var providerEmployeeId = extEmployees[rowIndex].providerEmployeeId;
        var employeeId = -1;
        var id = -1;
        if (ezApi.isValid(intMap[providerEmployeeId])) {
            employeeId = intMap[providerEmployeeId].employeeId;
            id = intMap[providerEmployeeId].id;
        }
        self.ezEmployeeLinkerValues[rowIndex] = {
            employeeId: employeeId,
            id: id,
            action: 'INITIAL'
        };
    }
    return employeeLinkerRows;
};

/**
 * @private
 * Grid Building Step 4: Build the employee link grid "linker" rows
 * @returns {string}
 */
EzIntegrationEmployeeLinkerViewController.prototype._EzBuildEmployeeLinkRow = function(rowIndex, ezEmployees,
    extEmployees) {
    var self = ezApi.ezclocker.ezIntegrationEmployeeLinkerViewController;

    var linkRowIdIndex = 'r' + ezApi.ezNumberToString(rowIndex);
    ezApi.ezclocker.logger.debug('[Linker Grid] Building employee link row ' + linkRowIdIndex);

    return '<!-- employee link #' + rowIndex + '-->' +
        '<tr id="_ezIntegration_EmployeeLinkGrid_EmployeeRow_' + linkRowIdIndex +
        '" class="ezIntegrationEmployeeLinkGridEmployeeRow">' +
        '<td id="_ezIntegration_EmployeeLinkGrid_EmployeeCell_ezleft.' + linkRowIdIndex +
        '" class="ezIntegrationEmployeeLinkGridEmployeeCell">' +
        self._EzBuildIntegrationEmployeeSimpleComboBox(rowIndex, extEmployees) +
        '</td><td id="_ezIntegration_EmployeeLinkGrid_EmployeeCell_ezright.' + linkRowIdIndex +
        '" class="ezIntegrationEmployeeLinkGridEmployeeCell">' +
        self._EzBuildEzClockerEmployeeSimpleComboBox(rowIndex, ezEmployees) +
        '</td></tr>';
};

/**
 * @private
 * Builds a simple combo box for link selection of ezClocker employees.
 * @param {number} rowIndex
 * @param {Array} ezEmployees
 * @returns {string}
 */
EzIntegrationEmployeeLinkerViewController.prototype._EzBuildEzClockerEmployeeSimpleComboBox = function(rowIndex,
    ezEmployees) {
    var self = ezApi.ezclocker.ezIntegrationEmployeeLinkerViewController;

    // Simple combo boxes
    var selectId = self._EzBuildELGElementId('EzIntegration_EmployeeLinkGrid_EmployeeComboBox', true, false, rowIndex);
    return ezHtml.$select(
        selectId,
        'ezEmployeeComboBox',
        'onchange="' +
        'ezApi.ezclocker.ezIntegrationEmployeeLinkerViewController.ezHandleEzSelectChange(' +
        rowIndex + ',\'' + selectId + '\')"',
        self._EzBuildEzClockerOtherItems(rowIndex) +
        self._EzBuildEmployeeSimpleComboBoxItems(rowIndex, true, false, ezEmployees));
};

/**
 * Gets the selected employee if already mapped
 */
EzIntegrationEmployeeLinkerViewController.prototype.ezGetSelectedEmployee = function(rowIndex, selEmployeeId) {
    var self = ezApi.ezclocker.ezIntegrationEmployeeLinkerViewController;
    var providerEmployeeId = ezApi.ezclocker.ezClockerContext.integrationEmployees[rowIndex].providerEmployeeId;
    var intMap = ezApi.ezclocker.ezClockerContext.employeeIntegrationMap;
    var selctedStr = ' ';
    if (ezApi.isValid(intMap[providerEmployeeId]) && ezApi.isValid(selEmployeeId)
        && intMap[providerEmployeeId].employeeId === selEmployeeId) {
        selctedStr = 'selected ';
    }
    return selctedStr;
};

/**
 * @private
 * Builds the integration's OTHER selection items
 * @param {number} rowIndex
 * @returns {string}
 */
EzIntegrationEmployeeLinkerViewController.prototype._EzBuildEzClockerOtherItems = function(rowIndex) {
    var self = ezApi.ezclocker.ezIntegrationEmployeeLinkerViewController;

    return ezHtml.$option(
        self._EzBuildELGElementId('EzIntegration_EmployeeLinkGrid_EmployeeComboBoxItem_IGNORE', false, true, rowIndex),
        null,
        'IGNORE',
        null,
        'Ignore');
};

/**
 * @private
 * Builds a simple combo box for link selection of external employees.
 * @param {number} rowIndex
 * @param {Array} extEmployees
 * @returns {string}
 */
EzIntegrationEmployeeLinkerViewController.prototype._EzBuildIntegrationEmployeeSimpleComboBox = function(rowIndex,
    extEmployees) {
    var self = ezApi.ezclocker.ezIntegrationEmployeeLinkerViewController;

    var selectId = self._EzBuildELGElementId('EzIntegration_EmployeeLinkGrid_EmployeeComboBox', false, true, rowIndex);

    return ezHtml.$div(selectId,
        'ezIntegrationEmployeeLinkGridHeaderText', extEmployees[rowIndex].employeeName);
};


/**
 * @private
 * Builds the option tag for the select combo box for each employee.
 * @param {number} rowIndex
 * @param {boolean|null} isLeft
 * @param {null|boolean} isRight
 * @param {Array} employees
 * @returns {string}
 */
EzIntegrationEmployeeLinkerViewController.prototype._EzBuildEmployeeSimpleComboBoxItems = function(rowIndex,
    isLeft, isRight, employees) {
    var self = ezApi.ezclocker.ezIntegrationEmployeeLinkerViewController;


    var employeeComboItems = '';
    for (var eIndex = 0; eIndex < employees.length; eIndex++) {
        employeeComboItems += ezHtml.$option(
            self._EzBuildELGElementId('EzIntegration_EmployeeLinkGrid_EmployeeComboBoxItem', isLeft, isRight, rowIndex),
            null,
            ezApi.ezNumberToString(employees[eIndex].id),
            self.ezGetSelectedEmployee(rowIndex, employees[eIndex].id),
            employees[eIndex].employeeName);
    }
    return employeeComboItems;
};



/**
 * @private
 * Builds a properly formatted id for linker grid elements. Template is:
 *
 * {elementId}-{ezleft|ezright}{null|-r{rowIndex}}{null|-e{employeeIndex}}{null|-{suffix}}
 *
 * @returns {string}
 */
EzIntegrationEmployeeLinkerViewController.prototype._EzBuildELGElementId = function(elementId, isLeft, isRight,
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
};

document.addEventListener('onEzApiReady', () => {
    ezApi.ezRegisterApi('ezIntegrationEmployeeLinkerViewController', new EzIntegrationEmployeeLinkerViewController());
});