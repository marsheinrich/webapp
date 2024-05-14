/**
 * @public
 * Creates a new instance of EzGrid
 *
 * @param {String} parentContainerId
 * @param {String} gridName
 * @param {Object} employer
 * @param {Object} employee
 * @param {Array} timeEntries
 * @param {Array} timeEntryLocations
 * @param {Boolean} showAuditButton
 *
 * @returns {EzGrid}
 */
function EzGrid(parentContainerId, gridName, employer, employee, timeEntries, timeEntryLocations,
    showAuditButton) {
    this.ready = false;
    this.employer = employer;
    this.employee = employee;

    this.showAuditButton = ezApi.ezIsBoolean(showAuditButton)
        ? showAuditButton
        : true;
    this.parentContainerId = parentContainerId;
    this.gridContainer = null;
    this.grid = null;

    this.gridName = ezApi.isNotEmptyString(gridName) + '-Grid' || 'ezTimeEntry-Grid';
    this.ezGridId = this.gridName;
    this.ezGridContainerId = this.ezGridId + '-Container';
    this.ezGridHeaderId = this.ezGridId + '-Header';
    this.ezGridHeaderRowId = this.ezGridId + '-HeaderRow';
    this.ezGridBodyId = this.ezGridId + '-Body';

    this.headers = [
        'Edit',
        'Clocked In Date',
        'Clocked In Time',
        'Clocked Out Date',
        'Clocked Out Time',
        'Total (hh:mm)',
        'Note',
        'GPS'
    ];
    this.columnCount = this.headers.length;

    this.timeEntries = ezApi.isArray(timeEntries) || [];
    this.timeEntryLocations = ezApi.isArray(timeEntryLocations) || [];
    this.rowCount = timeEntries.length;

    if (ezApi.isEmptyArray(this.timeEntries)) {
        this.ezRenderNoData();
        return this;
    }

    this.ezRender();
    return this;
}

/**
 * Initializes a grid that will have headers and data
 */
EzGrid.prototype.ezRender = function() {
    this.ezRemoveExistingGrid(this.gridName);
    ezApi.ez(this.parentContainerId).append(this.ezCreateGridContainer());
    this.gridContainer.append(this.ezCreateTimeEntryGrid());
};

/**
 * Initializes the grid that has no headers, no data, or both
 */
EzGrid.prototype.ezRenderNoData = function() {
    this.ezRemoveExistingGrid(this.gridName);
    ezApi.ez(this.parentContainerId).append(this.ezCreateGridContainer());
    this.gridContainer.append(this.ezCreateNoDataMessage(this.ezGridContainerId));
};

/**
 * Creates the time entry HTML grid and headers (column count)
 */
EzGrid.prototype.ezCreateTimeEntryGrid = function() {
    this.grid = ezApi.newHtml('<table class="ezGrid" id="' + this.ezGridId + '"></table>');
    this.grid.append('<thead id="' + this.ezGridHeaderId + '">' +
        '<tr class="ezGridHeaderRow" id="' + this.ezGridHeaderRowId + '"></tr></thead>');
    this.grid.append('<tbody id="' + this.ezGridBodyId + '"></tbody>');

    // Add the columns defined by the headers array
    var hindex;
    for (hindex in this.headers) {
        this.ezAppendHeaderColumn(hindex, this.headers[hindex]);
    }

    var rIndex;
    for (rIndex in this.timeEntries) {
        var timeEntry = this.timeEntries[rIndex];
        if (ezApi.isValid(timeEntry)) {
            var clockInOutLocation = this.ezGetClockInOutLocationForTimeEntry(timeEntry);
            this.ezAddTimeEntryRow(rIndex, timeEntry, clockInOutLocation.clockInLocation,
                clockInOutLocation.clockOutLocation);
        }
    }

    return this.grid;
};

/**
 * Creates the container for the grid
 */
EzGrid.prototype.ezCreateGridContainer = function() {
    this.gridContainer = ezApi.newHtml('<div class="ezGridContainer insetAllSideShadow" id="' +
        this.ezGridContainerId + '"></div>');
    return this.gridContainer;
};

/**
 * Appends a header column to the time entry grid
 * @param {integer} columnId
 * @param {string} headerName
 */
EzGrid.prototype.ezAppendHeaderColumn = function(columnId, headerName) {
    var ezGridHeaderCellId = '_' + this.gridName + 'HeaderCell_' + columnId;
    var newHeaderCell = ezApi.newHtml('<td class="ezGridHeaderCell" id="' + ezGridHeaderCellId + '">' + headerName +
        '</td>');
    ezApi.ez(this.ezGridHeaderRowId).append(newHeaderCell);
};

/**
 * Appends a time entry row to the grid
 */
EzGrid.prototype.ezAddTimeEntryRow = function(timeEntry, clockInLocation, clockOutLocation) {
    var timeEntryRowId = this.ezGridBodyId + '-Row-' + timeEntry.id;
    var timeEntryRow = ezApi.newHtml('<tr class="ezGridDataRow" id="' + timeEntryRowId + '">');

    // Render edit cell
    timeEntryRow.append('<td class="ezTimeEntryGridButtonCell">' +
        this.ezCreateTimeEntryEditButtons(timeEntryRowId, timeEntry.id) + his.ezGetHintImage(timeEntry) + '</td>');
    this.ezUpdateHintImage();

    // Obtain the highlight
    var rowClass = 'ezGridDataCell ' + this.ezGetRowCSSClass(timeEntry);

    // Calculate the actual time entry values
    var clockInTimeEntry = ezApi.ezclocker.ezDateTime.ezCreateFromIso(timeEntry.clockInIso8601);
    var clockOutTimeEntry = ezApi.ezclocker.ezDateTime.ezCreateFromIso(timeEntry.clockOutIso8601);

    // Clock in date
    var timeEntryColumnId = this.ezGridBodyId + '-Col';
    timeEntryRow.append('<td id="' + timeEntryColumnId + +'-clockInDate-' + timeEntry.id + '" class="' + rowClass +
        '">' +
        clockInTimeEntry.format('dddd MM/DD/YYYY') + '</td>');

    // Clock in time
    timeEntryRow.append('<td id="' + timeEntryColumnId + '-clockInTime=' + timeEntry.id + '" class="' + rowClass +
        '">' +
        clockInTimeEntry.format('hh:mm a') + '</td>');

    var clockOutDate = timeEntry.isActiveClockIn ? ' -- ' : clockOutTimeEntry.format('dddd MM/DD/YYYY');
    var clockOutTime = timeEntry.isActiveClockIn ? ' -- ' : clockOutTimeEntry.format('hh:mm a');
    // Clock out date
    timeEntryRow.append('<td id="' + timeEntryColumnId + '-clockOutDate-' + timeEntry.id + '" class="' + rowClass +
        '">' + clockOutDate + ' </td>');
    // Clock out time
    timeEntryRow.append('<td id="' + timeEntryColumnId + '-clockOutTime-' + timeEntry.id + '" class="' + rowClass +
        '">' + clockOutTime + '</td>');

    // Time entry total
    timeEntryRow.append('<td id="' + timeEntryColumnId + '-totalTime-' + timeEntry.id + '" class="' +
        rowClass + ' ezGridTotalTimeCell rightAlignValue">' + timeEntry.totalForShift + '</td>');

    // Notes Field
    var noteValue = ezApi.isNotEmptyString(timeEntry.notes) ? timeEntry.notes : '';
    timeEntryRow.append('<td id="notes_' + timeEntry.id + '" class="' + rowClass + '">' + noteValue + '</td>');

    // Location Information
    timeEntryRow.append(this.ezCreateGPSInfoCell(timeEntryColumnId, timeEntry, rowClass, clockInLocation,
        clockOutLocation));
};

/**
 * Renders the edit buttons for a time entry based on configuration
 * @param {Long} timeEntryId
 */
EzGrid.prototype.ezCreateTimeEntryEditButtons = function(timeEntryRowId, timeEntryId) {
    if (ezApi.isValid(this.employer) && ezApi.isValid(this.employee) && this.employer.allowEditTimeSheet) {
        return this.ezCreateEditNoteButton(timeEntryRowId, timeEntryId);
    }

    if (!this.showAuditButton) {
        return this.ezCreateDeleteButton(timeEntryRowId, timeEntryId) + this.ezCreateEditButton(timeEntryRowId,
            timeEntryId);
    }

    // Full edit button list
    return this.ezCreateDeleteButton(timeEntryRowId, timeEntryId) + this.ezCreateEditButton(timeEntryRowId,
        timeEntryId) +
        this.ezCreateAuditButton(timeEntryRowId, timeEntryId);
};

/**
 * Creates the edit note button (used when edit time entry is disabled for the user)
 * @param {Long} timeEntryId
 */
EzGrid.prototype.ezCreateEditNoteButton = function(timeEntryRowId, timeEntryId) {
    return '<button id="' + timeEntryRowId + '-editNoteButton" class="editButton" onclick="editTimeEntry(' +
        timeEntryId +
        ')"><img src="' + ezApi.ezclocker.nav.getPublicPageUrl('images/icons/edit-note-white.svg') +
        '" class="ezEditButtonImage" alt="edit note" title="Edit Time Entry Note"/></button>';
};

/**
 * Creates the edit time entry button
 * @param {string} timeEntryRowId
 * @param {long} timeEntryId
 */
EzGrid.prototype.ezCreateEditTimeEntryButton = function(timeEntryRowId, timeEntryId) {
    return '<button id="' + timeEntryRowId + '"-editTimeEntryButton" class="editButton" onclick="editTimeEntry(' +
        timeEntryId + ')"><img src="' + ezApi.ezclocker.nav.getPublicPageUrl('images/icons/edit-white.svg') +
        '" class="ezEditButtonImage" alt="edit" title="Edit Time Entry"/></button>';
};

/**
 * Creates the delete time entry button
 * @param {string} timeEntryRowId
 * @param {long} timeEntryId
 */
EzGrid.prototype.ezCreateDeleteButton = function(timeEntryRowId, timeEntryId) {
    return '<button id="' + timeEntryRowId + '-deleteButton" class="ezDeleteEditButton" ' +
        'onclick="deleteTimeEntry(' + timeEntryId + ')">' +
        '<img src="' + ezApi.ezclocker.nav.getPublicPageUrl('images/icons/delete-white.svg') +
        '" class="ezEditButtonImage" alt="delete" title="Delete Time Entry"/></button>';
};

/**
 * Creates the view time entry audit button
 * @param {string} timeEntryRowId
 * @param {Long} timeEntryId
 */
EzGrid.prototype.ezCreateAuditButton = function(timeEntryRowId, timeEntryId) {
    return '<button id="' + timeEntryRowId + '-auditButton" class="editButton" ' +
        'onclick="showTimeEntryAudit(' + timeEntryId + ')">' +
        '<img src="' + ezApi.ezclocker.nav.getPublicPageUrl('images/audit-white.svg') +
        '" class="ezEditButtonImage" alt="audit" title="Time Entry Audit History"/></button>';
};

/**
 * Creates the GPS information cell for a time entry row
 * @param {object} timeEntry
 * @param {string} rowClass
 * @param {object} clockInLocation
 * @param {object} clockOutLocation
 */
EzGrid.prototype.ezCreateGPSInfoCell = function(timeEntryColumnId, timeEntry, rowClass, clockInLocation,
    clockOutLocation) {
    var gpsValue;
    var gpsCellClass;
    if ((timeEntry.clockInGpsDataStatus === 'DISABLED' && timeEntry.clockOutGpsDataStatus === 'DISABLED') || (
        (ezApi.ezIsNotValid(clockInLocation) && ezApi.ezIsNotValid(clockOutLocation)) || (
            (ezApi.ezIsNotValid(clockInLocation.latitude) || clockInLocation.latitude === 0) &&
            (ezApi.ezIsNotValid(clockInLocation.longitude) || clockInLocation.longitude === 0) &&
            (ezApi.ezIsNotValid(clockOutLocation.latitude) || clockOutLocation.latitude === 0) &&
            (ezApi.ezIsNotValid(clockOutLocation.longitude) || clockOutLocation.longitude === 0)))) {
        gpsValue = this.ezGetGPSStatusText(timeEntry.clockInGpsDataStatus);
        gpsCellClass = rowClass + ' centerCell';
    } else if (('DISABLED' !== timeEntry.clockInGpsDataStatus || 'DISABLED' !== timeEntry.clockOutGpsDataStatus) &&
        (ezApi.ezIsValid(clockOutLocation.latitude) && ezApi.ezIsValid(clockInLocation.latitude))) {
        gpsCellClass = 'ezGridMapCell ' + rowClass + ' centerCell';
        gpsValue = '<button class="editButton" onclick="viewLocation(' + timeEntryIndex + ')">' +
            '<img src="' + ezApi.ezclocker.nav.getPublicPageUrl('/images/maps/viewmap.svg') +
            '" class="ezEditButtonImage" alt="View GPS Location" title="View GPS Location"/></button>';
    } else if ('DISABLED' !== timeEntry.clockInGpsDataStatus && ezApi.ezIsValid(clockInLocation.latitude)) {
        // Data only available for clock in
        gpsCellClass = 'ezGridMapCell ' + rowClass + ' centerCell';
        gpsValue = '<button class="editButton" onclick="viewLocation(' + timeEntryIndex + ')">' +
            '<img src="' + ezApi.ezclocker.nav.getPublicPageUrl('/images/maps/viewmap.svg') +
            '" class="ezEditButtonImage" alt="View GPS Location" title="View Clock In GPS Location"/></button>';
    } else if ('DISABLED' !== timeEntry.clockOutGpsDataStatus && ezApi.ezIsValid(clockOutLocation.latitude)) {
        // Data only available for clock out
        gpsCellClass = 'ezGridMapCell ' + rowClass + ' centerCell';
        gpsValue = '<button class="editButton" onclick="viewLocation(' + timeEntryIndex + ')">' +
            '<img src="' + ezApi.ezclocker.nav.getPublicPageUrl('/images/maps/viewmap.svg') +
            '" class="ezEditButtonImage" alt="View GPS Location" title="View Clock Out GPS Location/></button>';
    } else {
        // otherwise, show clock in gps data status only
        gpsCellClass = rowClass + ' centerCell';
        gpsValue = this.ezGetGPSStatusText(timeEntry.clockInGpsDataStatus);
    }

    return '<td id="' + timeEntryColumnId + '-location-' + timeEntry.id + '" class="' + gpsCellClass + '">' +
        gpsValue + '</td>';
};

/**
 * Translates the stored GPS status value into the readable value
 * @param {string} gpsStatus
 */
EzGrid.prototype.ezGetGPSStatusText = function(gpsStatus) {
    return gpsStatus === 'DISABLED' ? 'Disabled' : 'Not Available';
};

/**
 * Removes the existing grid from it's parent
 */
EzGrid.prototype.ezRemoveExistingGrid = function() {
    if (ezApi.isValid(this.gridContainer)) {
        this.gridContainer.remove();
    }
    this.gridContainer = null;
    this.grid = null;
};

/**
 * Creates the no-data place holder when no data is available for the selected date range.
 * @param {string} containerId
 */
EzGrid.prototype.ezCreateNoDataMessage = function(containerId) {
    return '<div class="ezGridContainer" id="' + containerId + '-noDataMessage">' +
        '<h1>No time entry data is available for the selected pay period.</h1>';
};

/**
 * Appends a time entry to the UI
 *
 * @param timeEntry
 */
EzGrid.prototype.ezAppendTimeEntry = function(timeEntry) {
    if (ezApi.isNotValid(timeEntry)) {
        return; // nothing to append
    }
    var clockInOutLocation = this.ezGetClockInOutLocationForTimeEntry(timeEntry);
    this.ezAddTimeEntryRow(timeEntry, clockInOutLocation.clockInLocation, clockInOutLocation.clockOutLocation);
};

/**
 * Returns the clockInLocation and clockOutLocation for the provided timeentry
 * @param {object} timeEntry
 */
EzGrid.prototype.ezGetClockInOutLocationForTimeEntry = function(timeEntry) {
    if (ezApi.isNotValid(timeEntry)) {
        return {
            clockInLocation: null,
            clockOutLocation: null
        };
    }

    var telIndex = this.ezLocateTimeEntryLocationData(timeEntry);
    if (telIndex === -1) {
        return {
            clockInLocation: null,
            clockOutLocation: null
        };
    }
    var timeEntryLocation = telIndex < this.timeEntryLocations.length ? this.timeEntryLocations[telIndex] : null;

    return {
        clockInLocation: ezApi.isValid(timeEntryLocation) ? timeEntryLocation.clockInLocation : null,
        clockOutLocation: ezApi.isValid(timeEntryLocation) ? timeEntryLocation.clockOutLocation : null
    };
};

/**
 * Gets the correct index for the time entry
 *
 * @param timeEntry
 * @returns {Number}
 */
EzGrid.prototype.ezLocateTimeEntryLocationData = function(timeEntry) {
    for (var timeEntryIndex = 0; timeEntryIndex < employeeTimeData.timeEntries.length; timeEntryIndex++) {
        var checkTimeEntry = employeeTimeData.timeEntries[timeEntryIndex];
        if (checkTimeEntry.id === timeEntry.id) {
            return timeEntryIndex;
        }
    }
    return -1;
};

EzGrid.prototype.ezViewTimeEntryLocationInfo = function(tIndex, employerLocation) {
    var timeEntry = this.timeEntries[tIndex];
    var timeEntryLocation = tIndex < this.timeEntryLocations.length ? this.timeEntryLocations[tIndex] : null;

    var clockInLocation = ezApi.isValid(timeEntryLocation) ?
        ezApi.assignOrDefault(timeEntryEventLocation.clockInLocation, null) :
        null;
    var clockOutLocation = ezApi.isValid(timeEntryLocation) ?
        ezApi.assignOrDefault(timeEntryEventLocation.clockOutLocation, null) :
        null;

    if (employerLocation) {
        if (clockInLocation && clockOutLocation &&
            clockInLocation.latitude && clockInLocation.longitude &&
            clockOutLocation.latitude && clockOutLocation.longitude &&
            timeEntry.clockInGpsDataStatus !== 'DISABLED' && timeEntry.clockOutGpsDataStatus !== 'DISABLED') {
            ezGoogleMaps.displayDualEventMap(employerLocation.latitude, employerLocation.longitude, employer.name,
                clockInLocation.latitude,
                clockInLocation.longitude, 'Clock In', clockOutLocation.latitude, clockOutLocation.longitude,
                'Clock Out',
                timeEntry);
            return;
        }

        if (clockInLocation && clockInLocation.latitude && clockInLocation.longitude && timeEntry.clockInGpsDataStatus !==
            'DISABLED') {
            ezGoogleMaps.displaySingleEventMap(employerLocation.latitude, employerLocation.longitude, employer.name,
                clockInLocation.latitude,
                clockInLocation.longitude, 'Clock In', timeEntry);
            return;
        }

        if (clockOutLocation && clockOutLocation.latitude && clockOutLocation.longitude && timeEntry.clockOutGpsDataStatus !==
            'DISABLED') {
            ezGoogleMaps.displaySingleEventMap(employerLocation.latitude, employerLocation.longitude, employer.name,
                clockOutLocation.latitude,
                clockOutLocation.longitude, 'Clock Out', timeEntry);
            return;
        }
    }

    if (clockInLocation && clockOutLocation && clockInLocation.latitude && clockInLocation.longitude &&
        clockOutLocation.latitude &&
        clockOutLocation.longitude && timeEntry.clockInGpsDataStatus !== 'DISABLED' && timeEntry.clockOutGpsDataStatus !==
        'DISABLED') {
        ezGoogleMaps.displayDualEventMap_NoEmployerLocation(clockInLocation.latitude, clockInLocation.longitude,
            'Clock In', clockOutLocation.latitude,
            clockOutLocation.longitude, 'Clock Out', timeEntry);
        return;
    }

    if (clockInLocation && clockInLocation.latitude && clockInLocation.longitude && timeEntry.clockInGpsDataStatus !==
        'DISABLED') {
        ezGoogleMaps.displaySingleEventMap_NoEmployerInformation(clockInLocation.latitude, clockInLocation.longitude,
            'Clock In', true, false, timeEntry);
        return;
    }

    if (clockOutLocation && clockOutLocation.latitude && clockOutLocation.longitude && timeEntry.clockOutGpsDataStatus !==
        'DISABLED') {
        ezGoogleMaps.displaySingleEventMap_NoEmployerInformation(clockOutLocation.latitude, clockOutLocation.longitude,
            'Clock Out', false, true, timeEntry);
        return;
    }

    // Otherwise, just show the map :)
    ezGoogleMaps.displayMap();
};

/**
 * Updates a time entry visible on the grid
 *
 * @param timeEntry
 */
EzGrid.prototype.ezUpdateTimeEntryInGrid = function(timeEntry) {
    if (timeEntry === null) {
        return; // nothing to update
    }
    var rowClass = 'ezGridDataCell ' + this.ezGetRowCSSClass(timeEntry);
    var clockInTimeEntry = ezApi.ezclocker.ezDateTime.ezCreateFromIso(timeEntry.clockInIso8601);
    var clockOutTimeEntry = ezApi.ezclocker.ezDateTime.ezCreateFromIso(timeEntry.clockOutIso8601);

    var timeEntryColumnId = this.ezGridBodyId + '-Col';
    ezApi.ez(timeEntryColumnId + '-clockInDate-' + timeEntry.id).html(clockInTimeEntry.format('dddd MM/DD/YYYY'));
    ezApi.ez(timeEntryColumnId + '-clockInDate-' + timeEntry.id).attr('class', rowClass);
    ezApi.ez(timeEntryColumnId + '-clockInTime-' + timeEntry.id).html(clockInTimeEntry.format('hh:mm a'));
    ezApi.ez(timeEntryColumnId + '-clockInTime-' + timeEntry.id).attr('class', rowClass);

    var clockOutTimeValue = ezApi.isTrue(timeEntry.isActiveClockIn) ? ' -- ' : clockOutTimeEntry.format('hh:mm a');
    var clockOutDateValue = ezApi.isTrue(timeEntry.isActiveClockIn) ? ' -- ' : clockOutTimeEntry.format(
        'dddd MM/DD/YYYY');
    ezApi.ez(timeEntryColumnId + '-clockOutDate-' + timeEntry.id).html(clockOutDateValue);
    ezApi.ez(timeEntryColumnId + '-clockOutDate-' + timeEntry.id).attr('class', rowClass);
    ezApi.ez(timeEntryColumnId + '-clockOutTime-' + timeEntry.id).html(clockOutTimeValue);
    ezApi.ez(timeEntryColumnId + '-clockOutTime-' + timeEntry.id).attr('class', rowClass);

    ezApi.ez(timeEntryColumnId + '-totalTime_' + timeEntry.id).html(timeEntry.totalTime);
    ezApi.ez(timeEntryColumnId + '-totalTime_' + timeEntry.id).attr('class', rowClass);

    var noteValue = ezApi.isNotEmptyString(timeEntry.notes) ? timeEntry.notes : '';
    ezApi.ez(timeEntryColumnId + '-notes-' + timeEntry.id).html(noteValue);
    ezApi.ez(timeEntryColumnId + '-notes-' + timeEntry.id).attr('class', rowClass);

    ezApi.ez(timeEntryColumnId + '-location-' + timeEntry.id).attr('class', rowClass + ' centerCell');

    ezUpdateHintImage(timeEntry);
};

/**
 * Updates the hint icon for the time entry
 * @param {object} timeEntry
 */
EzGrid.prototype.ezUpdateHintImage = function(timeEntry) {

    var hintImage = ezApi.ez(this.ezGridBodyId + '-Col-hintImage-' + timeEntry.id);
    var totalHours = timeEntry.totalHours;
    //var totalHours = parseInt(timeEntry.totalTime.split(':'));

    if (ezApi.isTrue(timeEntry.isActiveClockIn)) {
        hintImage.attr('src', ezApi.ezclocker.nav.getPublicPageUrl('images/icons/active-clock-in-aqua.svg'));
        hintImage.attr('title', 'Active Clock In');
        hintImage.attr('alt', 'Active Clock In');
        return;
    }
    if ('EndDateClipped' === timeEntry.partialTimeEntry ||
        'StartDateClipped' === timeEntry.partialTimeEntry ||
        'StartAndEndDateClipped' === timeEntry.partialTimeEntry) {
        hintImage.attr('src', ezApi.ezclocker.nav.getPublicPageUrl('images/icons/partial-timeentry-aqua.svg'));
        hintImage.attr('title', 'Partial Time Entry');
        hintImage.attr('alt', 'The time entries clock in or clock out date falls outside of the selected period.');
    }

    if (8 < totalHours) {
        hintImage.attr('title', 'Exceeds Eight Hours');
        hintImage.attr('alt', 'Time Exceeds Eight Hours');
        hintImage.attr('src', ezApi.ezclocker.nav.getPublicPageUrl('images/icons/alert-dark-yellow.svg'));
        return;
    }

    // Otherwise, all appears good
    hintImage.attr('title', '');
    hintImage.attr('alt', '');
    hintImage.attr('src', ezApi.ezclocker.nav.getPublicPageUrl('images/icons/check-dark-gree.svg'));
    hintImage.attr('title', 'Good');
    hintImage.attr('alt', 'No problems detected!');
};

/**
 * Obtains the propery hint image to use for the time entry
 * @param {object} timeEntry
 */
EzGrid.prototype.ezCreateHintImage = function(timeEntry) {
    return '<img id="' + this.ezGridBodyId + '-Col-hintImage-' + timeEntry.id + '" class="hintImage"/>';
};

EzGrid.prototype.ezGetRowCSSClass = function(timeEntry) {
    if ('EndDateClipped' === timeEntry.partialTimeEntry ||
        'StartDateClipped' === timeEntry.partialTimeEntry ||
        'StartAndEndDateClipped' === timeEntry.partialTimeEntry) {
        return 'ezGridPartialCell';
    }
    if (timeEntry.isActiveClockIn) {
        return 'ezGridClockInCell';
    }
    var totalHours = parseInt(timeEntry.totalTime.split(':'));
    if (totalHours > 8) {
        return 'ezGridWarningCell';
    }
    return 'ezGridDataCell';
};

//function renderDeleteButton(timeEntryId) {
//    return ezGrid.ezCreateDeleteButton(this.ezGridBodyId + '-Row-' + timeEntry.id, timeEntryId);
//}

//function renderEditButton(timeEntryId, noteOnly) {
//    if (ezApi.isTrue(noteOnly)) {
//        return ezGrid.ezCreateEditNoteButton(this.ezGridBodyId + '-Row-' + timeEntry.id, timeEntryId);
//    }
//    return ezGrid.ezCreateEditButton(this.ezGridBodyId + '-Row-' + timeEntry.id, timeEntryId);
//}

//function renderAuditButton(timeEntryId) {
//    return ezGrid.ezCreateAuditButton(this.ezGridBodyId + '-Row-' + timeEntry.id, timeEntryId);
//}

//function renderTimeEntryEditButtons(timeEntryId) {
//    return ezGrid.ezCreateTimeEntryEditButtons(this.ezGridBodyId + '-Row-' + timeEntry.id, timeEntryId);
//}

//function renderGPSInfoCell(timeEntryIndex, timeEntry, rowClass, clockInLocation, clockOutLocation) {
//    var timeEntryColumnId = this.ezGridBodyId + '-Col';
//    return ezGrid.ezCreateGPSInfoCell(timeEntryColumnId, timeEntry, rowClass, clockInLocation, clockOutLocation);
//}

//function getGPSStatusText(gpsStatus) {
//    return ezGrid.ezGetGPSStatusText(gpsStatus);
//}

//function viewLocation(tIndex) {
//    return ezGrid.ezViewTimeEntryLocationInfo(tIndex);
//}

//function updateTimeEntryInGrid(timeEntry) {
//    return ezGrid.ezUpdateTimeEntryInGrid(timeEntry);
//}

//function findTimeEntryLocationForTimeEntry(timeEntry) {
//    return ezGrid.ezLocateTimeEntryLocationData(timeEntry);
//}

//function getHintImage(timeEntry) {
//    return ezGrid.ezGetHintImage(timeEntry);
//}

//function getRowCSSClass(timeEntry) {
//    return ezGrid.ezGetRowCSSClass(timeEntry);
//}