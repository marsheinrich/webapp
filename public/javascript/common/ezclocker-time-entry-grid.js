// DO NOT USE WITH EMPLOYER DASHBOARD ANYMORE
// TODO: Continue refactoring to merge ezGrid & ezEmployeeDisplayController functionality

/* globals
    timeEntryHtml, employer, selectedEmployer, singleTimeEntryHtml, employeeTimeData, employerLocation,
    ezGoogleMaps, displayMap, updateHintImage
*/

/* exported ezGrid */
/**
 * Implementation of the time entry grid used in dashboards
 * @deprecated Never finished, most likely just needs re-done from scratch. See ezEmployeeDisplayController.
 * @public
 */
var ezGrid = {
    _GridParentId: undefined,
    _GridContainer: undefined,
    _Grid: undefined,
    _GridName: 'ezGrid',
    _Headers: [],
    _Items: [],
    initGrid: function(parentId, gridName, headers, items) {
        if (!items || items.length === 0) {
            ezGrid.renderNoData();
            return;
        }

        ezGrid._GridParentId = parentId;
        ezGrid._GridName = gridName;
        ezGrid._GridContainer = ezApi.ezId(
            '<div class="ezGridContainer insetAllSideShadow" id="_EzGridContainer_' + ezGrid._GridName +
            '"></div>');

        ezGrid._Grid = $('<table class="ezGrid" id="_EzGrid_' + ezGrid._GridName + '"></table>');
        ezGrid._Grid.append('<thead id="_EzGridHeader_' + ezGrid._GridName + '"><tr class="ezGridHeaderRow" id="_EzGridHeaderRow_' +
            ezGrid._GridName +
            '"></tr></thead>');
        ezGrid._Grid.append('<tbody id="_EzGridBody_' + ezGrid._GridName + '"></tbody>');
        ezGrid._GridContainer.append(ezGrid._Grid);

        for (var hindex = 0; hindex < headers.length; hindex++) {
            this.appendHeader(headers[hindex]);
        }

        for (var rindex = 0; rindex < items.length; rindex++) {
            this.addRow(items[rindex]);
        }

        ezGrid._GridParentId.append(ezGrid._GridContainer);
    },
    addRow: function() {
        //TODO: implement this!
    },
    renderNoData: function(parentId, gridName) {
        ezGrid.clearData(gridName);
        ezGrid._GridParentId = parentId;
        ezGrid._GridName = gridName;
        ezGrid._GridContainer = $('<div class="ezGridContainer insetAllSideShadow" id="_EzGridContainer_' + ezGrid._GridName +
            '"></div>');
        var noDataMessage = '<h1>No data is available for the selected pay period.</h1>';
        ezGrid._Grid = null;
        ezGrid._GridContainer.append(noDataMessage);
    },
    appendHeader: function(headerName) {
        var headerRow = $('#_EzGridHeaderRow_' + ezGrid._GridName);
        var newHeaderCell = $('<td class="ezGridHeaderCell" id="_EzGridHeaderCell_' + (ezGrid._Headers.length + 1) + '">' +
            headerName + '</td>');
        headerRow.append(newHeaderCell);
    },
    removeHeader: function() {
        //TODO: Implement this
    },
    insertHeader: function() {
        //TODO: Implement this
    },
    appendItem: function(item, data) {
        var gridBody = $('#_EzGridBody_' + ezGrid._GridName);
        for (var index = 0; index < ezGrid._Headers.length; index++) {
            if (index >= item.length) {
                return;
            }
            var newDataCell = $('<td class="ezGridDataCell" id="_EzGridItem_' + ezGrid._GridName + '_Col' + index + '_Item' +
                (ezGrid._Items.length + 1) + '">' + data + '</td>');
            gridBody.append(newDataCell);
        }
    },
    removeItem: function() {
        //TODO: Implement this
    },
    insertItem: function() {
        //TODO: Implement this
    },
    clearData: function(gridName) {
        if (ezApi.isNotValid(gridName)) {
            gridName = ezGrid._GridName;
        }
        $('#_EzGrid_' + gridName).remove();
    }
};