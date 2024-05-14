import { EzClass } from '/ezlibrary/EzClass.js';

import { EzElementEventName } from '/ezlibrary/EzElementEventName.js';

import { EzDialogConfig } from '/ezlibrary/ux/dialogs/EzDialogConfig.js';

import { EzLocation } from '/secure/widgets/EzScheduleLocationsDialog/EzLocation.js';
import { EzLocations } from '/secure/widgets/EzScheduleLocationsDialog/EzLocations.js';

import { EzUI } from '/public/javascript/common/ezui.js';

/**
    Controles the schedule's locations' view
    Import with:
        import { EzScheduleLocationsDialog } from '/secure/widgets/EzScheduleLocationsDialog/EzScheduleLocationsDialog.js';

        // Ready Checks
        globalThis.EzScheduleLocationsDialog.ezInstance &&
        globalThis.EzScheduleLocationsDialog.ezInstance.ready

        // Ready event
        document.addEventListener(
            EzScheduleLocationsDialog.ezEventNames.onReady,
            this.#ezRegistrator);
 */
class EzScheduleLocationsDialog extends EzClass {
    /**
        @public @static @field
        @type {EzDialog}
     */
    static ezInstance = null;

    /**
        @public @static @field
        @type {string}
     */
    static ezApiRegistrationState = null;

    /**
        @public @static @readonly @property
        @returns {string}
     */
    static get ezApiName() {
        return 'ezScheduleLocationsDialog';
    }

    /**
        @public @static @readonly @property
        @returns {object}
     */
    static get ezEventNames() {
        return {
            onReady: 'ezOn_EzScheduleLocationsDialog_Ready',
        };
    }

    /**
        @public @static @readonly @property
        @returns {boolean}
     */
    static get ezCanRegister() {
        return 'PENDING' === EzScheduleLocationsDialog.ezApiRegistrationState &&
            Object.prototype.hasOwnProperty.call(globalThis, 'ezApi') &&
            globalThis['ezApi'] && globalThis['ezApi'].ready &&

            globalThis.ezApi.ezclocker[EzUI.ezApiName] &&
            globalThis.ezApi.ezclocker[EzUI.ezApiName].ready &&

            globalThis.ezApi.ezclocker[EzLocations.ezApiName] &&
            globalThis.ezApi.ezclocker[EzLocations.ezApiName].ready;
    }

    /**
        @private @static @method
        @returns {boolean}
     */
    static #ezRegistrator() {
        if (!EzScheduleLocationsDialog.ezCanRegister) {
            return false;
        }

        ezApi.ezRegisterNewApi(EzScheduleLocationsDialog, EzScheduleLocationsDialog.ezApiName);
        EzScheduleLocationsDialog.ezApiRegistrationState = 'REGISTERED';
        return true;
    }

    // Static constructor
    static {
        if (null == EzScheduleLocationsDialog.ezApiRegistrationState) {
            EzScheduleLocationsDialog.ezApiRegistrationState = 'PENDING';

            if (!this.#ezRegistrator()) {
                document.addEventListener(
                    'onEzApiReady',
                    () => {
                        if (!EzScheduleLocationsDialog.#ezRegistrator()) {
                            document.addEventListener(
                                EzUI.ezEventNames.onReady,
                                EzScheduleLocationsDialog.#ezRegistrator);

                            document.addEventListener(
                                EzLocations.ezEventNames.onReady,
                                EzScheduleLocationsDialog.#ezRegistrator);
                        }
                    });
            }
        }
    }

    /**
        @public @field
        @type {array}
     */
    primaryEmployerAvailableLocations = [];

    /**
        @public @field
        @type {boolean}
     */
    saveThenAdd = false;

    /**
        @public @field
        @type {string}
     */
    htmlForLocEmployees = '';

    /**
        @public @field
        @type {boolean}
     */
    locationDataEntryAreaVisible = false;

    /**
        @public @readonly @property
        @returns {string}
     */
    get DEFAULT_ERROR_TITLE() {
        return 'Location Error';
    }

    /**
        @public @readonly @property
        @returns {string}
     */
    get ezDialogId() {
        return '_ManageLocationDialog';
    }

    /**
        @public @readonly @property
        @returns {object}
     */
    get ezIds() {
        return {
            parentContainerId: '_HideDialogsDiv',
            removeLocationEmployeeAssignmentDialogId: 'EzRemoveLocationEmployeeAssignmentDialog',
            assignEmployeeToLocationDialog: 'EzAssignEmployeeToLocationDialog',
            buttons: {
                addLocationButtonId: `${this.ezDialogId}_AddLocationButton`,
                locationSaveButtonId: `${this.ezDialogId}_LocationSaveButton`,
                assignEmployeeButtonId: `${this.ezDialogId}_AssignEmployee`,
                removeAssignedEmployeeButtonId: `${this.ezDialogId}_RemoveEmployee`,
            },
            inputs: {
                nameInputId: `${this.ezDialogId}_LocationName`,
                streeNumberInputId: `${this.ezDialogId}_StreetNumber`,
                streetNameInputId: `${this.ezDialogId}_StreetName`,
                additionalAddressInputId: `${this.ezDialogId}_AdditionalAddress`,
                cityInputId: `${this.ezDialogId}_City`,
                stateInputId: `${this.ezDialogId}_State`,
                postalCodeInputId: `${this.ezDialogId}_PostalCode`,
                mainPhoneInputId: `${this.ezDialogId}_MainPhoneNumber`,
                mobilePhoneInputId: `${this.ezDialogId}_AltPhoneNumber1`,
                otherPhoneInputId: `${this.ezDialogId}_AltPhoneNumber2`,

                removeLocationEmployeeSelectId:
                    'EzRemoveLocationEmployeeAssignmentDialog_RemoveLocationEmployeeSelectInput',

                assignEmployeeToLocationDialog_AvailableEmployeesSelectInputId:
                    'EzAssignEmployeeToLocationDialog_AvailableEmployeesSelectInput',
                assignEmployeeToLocationDialog_PrimaryLocationSelectInputId:
                    'EzAssignEmployeeToLocationDialog_PrimaryLocationSelectInputId'
            },
            containers: {
                helpContainerId: `${this.ezDialogId}_HelpContainer`,
                editorContainerId: `${EzScheduleLocationsDialog.ezInstance.ezDialogId}_EditorContainer`,

                workLocationsListingContainerId: `${EzScheduleLocationsDialog.ezInstance.ezDialogId}_workLocationsListingContainer`,

                locationNameContainerId: `${this.ezDialogId}_LocationNameContainer`,

                streetNameNumberContainerId: `${this.ezDialogId}_StreetNameNumberContainer`,
                streetNumberContainerId: `${this.ezDialogId}_StreetNumberContainer`,
                streetNameContainerId: `${this.ezDialogId}_StreetNameContainer`,

                additionalAddressContainerId: `${this.ezDialogId}_AdditionalAddressContainer`,

                cityStateZipContainerId: `${this.ezDialogId}_CityStateZipContainer`,
                cityContainerId: `${this.ezDialogId}_CityContainer`,
                stateContainerId: `${this.ezDialogId}_StateContainer`,
                zipCodeContainerId: `${this.ezDialogId}_ZipCodeContainer`,

                mainMobileAltPhoneContainerId: `${this.ezDialogId}_MainMobileAltPhoneContainer`,
                mainPhoneContainerId: `${this.ezDialogId}_MainPhoneContainer`,
                mobilePhoneContainerId: `${this.ezDialogId}_MobilePhoneContainer`,
                otherPhoneContainerId: `${this.ezDialogId}_OtherPhoneContainer`,

                assignEmployeeContainerId: `${this.ezDialogId}_AssignEmployeeContainer`,
                assignEmployeeHeaderContainerId: `${this.ezDialogId}_AssignEmployeeHeaderContainer`,
                assignEmployeeHeaderButtonContainerId: `${this.ezDialogId}_AssignEmployeeHeaderButtonContainer`,
                assignedEmployeesContainerId: `${this.ezDialogId}_AssignedEmployeesContainer`,

                assignedEmployeeCardContainerId: `${this.ezDialog}_AssignedEmployeeCardContainer`
            },
            tables: {
                panelLayoutTableId: `${this.ezDialogId}_PanelLayoutTable`,
                leftPanelCellId: `${this.ezDialogId}_PanelLayoutTable_RightPanelCell`,
                rightPanelCellId: `${this.ezDialogId}_PanelLayoutTable_RightPanelCell`,

                leftPanelLayoutTableId: `${this.ezDialogId}_LeftPanelLayoutTable`,
                workLocationsHeaderRowId: `${this.ezDialogId}_LeftPanelLayoutTable_WorkLocationsHeaderRow`,
                workLocationsHeaderTextCellId: `${this.ezDialogId}_LeftPanelLayoutTable_WorkLocationsHeaderRow_HeaderTextCell`,
                workLocationsHeaderButtonCellId: `${this.ezDialogId}_LeftPanelLayoutTablee_WorkLocationsHeaderRow_HeaderButtonCell`,
                workLocationsListingRowId: `${this.ezDialogId}_LeftPanelLayoutTable_WorkLocationsRow`,
                workLocationsListingCellId: `${this.ezDialogId}_LeftPanelLayoutTable_WorkLocationsRow_WorkLocationsCell`,

                rightPaneLayoutTable: `${this.ezDialogId}_RightPaneLayoutTable`,
                rightPaneHeaderRowId: `${this.ezDialogId}_RightPaneLayoutTable_HeaderRow`,
                rightPanelHeaderCellId: `${this.ezDialogId}_RightPaneLayoutTable_HeaderCell`,
                rightPanelHeaderButtonCellId: `${this.ezDialogId}_RightPaneLayoutTable_HeaderButtonCell`,
                rightPanelEditorInputsRowId: `${this.ezDialogId}_RightPaneLayoutTable_EditorInputsRow`,
                rightPanelEditorInputsCellId: `${this.ezDialogId}_RightPaneLayoutTable_EditorInputsCell`,
                employeeLocationAssignmentRowid: `${this.ezDialogId}_RightPaneLayoutTable_AssignEmployeeRow`,
                employeeLocationAssignmentCellId: `${this.ezDialogId}_RightPaneLayoutTable_AssignEmployeeCell`,

                helpPaneLayoutTableId: `${this.ezDialogId}_HelpPaneLaytoutTable`,
                helpPaneImageRowId: `${this.ezDialogId}_HelpPaneLaytoutTable_ImageRow`,
                helpPaneImageCellId: `${this.ezDialogId}_HelpPaneLaytoutTable_ImageCell`,

                assignedEmployeeCardLayoutTableId: `${this.ezDialogId}_AssignedEmployeeCardLayoutTable`,
                assignedEmployeeCardImageRowId: `${this.ezDialogId}_AssignedEmployeeCardLayoutTable_ImageRow`,
                assignedEmployeeCardImageCellId: `${this.ezDialogId}_AssignedEmployeeCardLayoutTable_ImageCell`,
                assignedEmployeeCardNameRowId: `${this.ezDialogId}_AssignedEmployeeCardLayoutTable_NameRow`,
                assignedEmployeeCardNameCellId: `${this.ezDialogId}_AssignedEmployeeCardLayoutTable_NameCell`,
            },
            images: {
                helpPaneImageId: `${this.ezDialogId}_HelpPaneImage`,
                assignedEmployeeCardImageId: `${this.ezDialogId}_AssignedEmployeeCardImage`
            }
        };
    }

    /**
        @protected
        Initializes EzScheduleLocationsDialog
        @returns {EzScheduleLocationsDialog}
     */
    ezInit() {
        EzScheduleLocationsDialog.ezInstance.DEFAULT_ERROR_MESSAGE = ezApi.ezEM`
            An unexpected error occurred while processing location data.
            ${ezApi.ezclocker.ezDialog.TRY_AGAIN_THEN_REPORT}`;

        EzScheduleLocationsDialog.ezInstance.ezInitUX();

        EzScheduleLocationsDialog.ezInstance.ready = true;

        return EzScheduleLocationsDialog.ezInstance;
    }

    /**
        @protected
        Initializes EzScheduleLocationsDialog UX
        original: configureManageLocationsDialog
     */
    ezInitUX() {
        EzScheduleLocationsDialog.ezInstance.ezInitializeManageLocationDialog();

        EzScheduleLocationsDialog.ezInstance.ezInitializeAssigneEmployeeToLocationDialog();

        EzScheduleLocationsDialog.ezInstance.ezInitializeRemoveEmployeeLocationDialog();
    }

    /**
        @protected
        Initializes the schedule location data
        @returns {Promise.resolve}
     */
    ezInitData() {
        return EzScheduleLocationsDialog.ezInstance.ezRefreshEmployerLocations();
    }

    /**
        @protected
        Refreshes the employer locations data
        @returns {Promise.resolve}
     */
    ezRefreshEmployerLocations() {
        return ezApi.ezAsyncAction(
            (finished) => ezApi.ezclocker.ezLocations.ezGetEmployerLocations()
                .then(
                    (response) => {
                        EzScheduleLocationsDialog.ezInstance.primaryEmployerAvailableLocations = response.entities;

                        return finished(EzScheduleLocationsDialog.ezInstance.primaryEmployerAvailableLocations);
                    },
                    (eResponse) => {
                        EzScheduleLocationsDialog.ezInstance.primaryEmployerAvailableLocations = [];

                        ezApi.ezclocker.logger.error(
                            `Failed to refresh the employer locations. Error: ${ezApi.ezToJson(eResponse)}`);

                        ezApi.ezclocker.ezDialog.ezShowError(
                            'Locations Error',
                            'Unable to load the employer locations at this time.');

                        return finished(EzScheduleLocationsDialog.ezInstance.primaryEmployerAvailableLocations);
                    }));
    }

    /**
        @public
        Shows the locations dialog.
     */
    ezShow() {
        ezApi.ezclocker.ezUi.ezStartPageWaitExecute(
            'Loading available locations ...',
            (waitDone) => {
                EzScheduleLocationsDialog.ezInstance.ezHandleWindowResize();

                ezApi.ezclocker.ezEventEngine.ezWantElementEvent(
                    'window',
                    EzElementEventName.RESIZE,
                    EzScheduleLocationsDialog.ezApiName,
                    EzScheduleLocationsDialog.ezInstance.ezHandleWindowResize);

                EzScheduleLocationsDialog.ezInstance.ezInitData()
                    .then(
                        () => {
                            ezApi.ezclocker.ezUi.ezShowDialog(EzScheduleLocationsDialog.ezInstance.ezDialogId);

                            EzScheduleLocationsDialog.ezInstance.ezHandleDialogResize();

                            ezApi.ezclocker.ezUi.ezHookElementEvent(
                                EzScheduleLocationsDialog.ezInstance.ezDialogId,
                                'resize',
                                EzScheduleLocationsDialog.ezInstance.ezHandleDialogResize);

                            return EzScheduleLocationsDialog.ezInstance.ezShowLocationDataEntryArea()
                                .then(
                                    () => {
                                        EzScheduleLocationsDialog.ezInstance.renderEmployerLocations();

                                        if (!ezApi.ezArrayHasLength(EzScheduleLocationsDialog.ezInstance.primaryEmployerAvailableLocations)) {
                                            EzScheduleLocationsDialog.ezInstance.ezSelectLocationFromLocationIndex(-1, false);
                                        } else {
                                            EzScheduleLocationsDialog.ezInstance.ezSelectLocationFromLocationIndex(0);
                                        }

                                        return waitDone().then(ezApi.ezIgnoreResolve);
                                    });
                        },
                        () => waitDone().then(ezApi.ezIgnoreResolve));
            });
    }

    /**
        @public
        Resets the dialog to default values
     */
    ezResetDialog() {
        ezApi.ezclocker.ezUi.ezUnHookElementEvent(
            EzScheduleLocationsDialog.ezInstance.ezDialogId,
            'resize',
            EzScheduleLocationsDialog.ezInstance.ezHandleDialogResize);

        ezApi.ezclocker.ezUi.ezUnHookElementEvent$(
            'window',
            'resize',
            EzScheduleLocationsDialog.ezInstance.ezHandleWindowResize);
    }

    /**
        @protected
        Handles resize events for the dialog
     */
    ezHandleWindowResize() {
        let dialogWidthHeight = EzScheduleLocationsDialog.ezInstance.ezCalculateDialogWidthHeight();

        ezApi.ezclocker.ezUi.ezId(EzScheduleLocationsDialog.ezInstance.ezDialogId).dialog(
            {
                maxWidth: dialogWidthHeight.maxDialogWidth,
                maxHeight: dialogWidthHeight.maxDialogHeight,
                width: dialogWidthHeight.maxDialogWidth,
                height: dialogWidthHeight.maxDialogHeight,
            });
    }

    /**
        @protected
        Handles dialog resizing event
     */
    ezHandleDialogResize() {
        let maxColumnHeight = parseInt(ezApi.ezclocker.ezUi.ezElementHeight(EzScheduleLocationsDialog.ezInstance.ezDialogId));

        // Adjustment for padding
        maxColumnHeight -= 16 * 2;
        maxColumnHeight -= ezApi.ezclocker.ezUi.ezElementHeight(EzScheduleLocationsDialog.ezInstance.ezIds.tables.workLocationsHeaderRowId);

        ezApi.ezclocker.ezUi.ezAddCss(
            EzScheduleLocationsDialog.ezInstance.ezIds.tables.leftPanelCellId,
            {
                'height': `${maxColumnHeight}px`,
                'max-height': `${maxColumnHeight}px`,
                'width': '50%',
                'max-width': '50%'
            });

        ezApi.ezclocker.ezUi.ezAddCss(
            EzScheduleLocationsDialog.ezInstance.ezIds.containers.workLocationsListingContainerId,
            {
                'height': `${maxColumnHeight}px`,
                'max-height': `${maxColumnHeight}px`,
            });

        if (ezApi.ezElementExists(EzScheduleLocationsDialog.ezInstance.ezIds.tables.rightPanelHeaderRowId)) {
            let hRect = ezApi.ezclocker.ezUi.ezGetElementRect(EzScheduleLocationsDialog.ezInstance.ezIds.tables.rightPanelHeaderRowId);
            let eRect = ezApi.ezclocker.ezUi.ezGetElementRect(EzScheduleLocationsDialog.ezInstance.ezIds.tables.rightPanelEditorInputsRowId);

            ezApi.ezclocker.ezUi.ezAddCss(
                EzScheduleLocationsDialog.ezInstance.ezIds.containers.assignedEmployeesContainerId,
                {
                    'height': `${maxColumnHeight - hRect.ezHeight().get() - eRect.ezHeight().get()}px`,
                    'max-height': `${maxColumnHeight - hRect.ezHeight().get() - eRect.ezHeight().get()}px`,
                    'min-height': `${maxColumnHeight - hRect.ezHeight().get() - eRect.ezHeight().get()}px`
                });
        }
    }

    ezCalculateDialogWidthHeight() {
        let dialogWidthHeight = {
            maxDialogWidth: 900,
            maxDialogHeight: 600
        };

        dialogWidthHeight.maxDialogWidth = window.innerWidth / 2;
        dialogWidthHeight.maxDialogWidth = dialogWidthHeight.maxDialogWidth + (dialogWidthHeight.maxDialogWidth / 2);
        if (dialogWidthHeight.maxDialogWidth < 900) {
            dialogWidthHeight.maxDialogWidth = 900;
        }

        dialogWidthHeight.maxDialogHeight = window.innerHeight / 2;
        dialogWidthHeight.maxDialogHeight = dialogWidthHeight.maxDialogHeight + (dialogWidthHeight.maxDialogHeight / 2);
        if (dialogWidthHeight.maxDialogHeight < 600) {
            dialogWidthHeight.maxDialogHeight = 600;
        }

        return dialogWidthHeight;
    }

    /**
        @protected
        Initializes the Manage Location dialog
     */
    ezInitializeManageLocationDialog() {
        ezApi.ezclocker.ezUi.ezAppendContent(
            EzScheduleLocationsDialog.ezInstance.ezIds.parentContainerId,
            EzScheduleLocationsDialog.ezInstance.ezBuildManageLocationDialogHtml());

        EzScheduleLocationsDialog.ezInstance.ezHookEditorPaneEvents();

        let dialogWidthHeight = EzScheduleLocationsDialog.ezInstance.ezCalculateDialogWidthHeight();

        let ezDialogConfig = new EzDialogConfig(EzScheduleLocationsDialog.ezInstance.ezDialogId);

        ezDialogConfig.maxWidth = dialogWidthHeight.maxDialogWidth;

        ezDialogConfig.maxHeight = dialogWidthHeight.maxDialogHeight;

        ezDialogConfig.width = dialogWidthHeight.maxDialogWidth;

        ezDialogConfig.height = dialogWidthHeight.maxDialogHeight;

        ezDialogConfig.showOpt = {
            direction: 'down'
        };

        ezDialogConfig.buttons = [
            {
                id: `${EzScheduleLocationsDialog.ezInstance.ezDialogId}_CloseButton`,
                text: 'Close',
                click: EzScheduleLocationsDialog.ezInstance.ezClose
            }
        ];

        ezDialogConfig.close = () => {
            ezApi.ezclocker.ezEventEngine.ezUnwantElementEvent(
                'window',
                EzElementEventName.RESIZE,
                EzScheduleLocationsDialog.ezApiName);
        };

        ezApi.ezclocker.ezDialog.ezInitDialogWithConfig(
            EzScheduleLocationsDialog.ezInstance.ezDialogId,
            ezDialogConfig);
    }

    /**
        @protected
        Initializes the Remove Employer Location dialog
     */
    ezInitializeRemoveEmployeeLocationDialog() {
        ezApi.ezclocker.ezUi.ezAppendContent(
            EzScheduleLocationsDialog.ezInstance.ezIds.parentContainerId,
            EzScheduleLocationsDialog.ezInstance.ezBuildRemoveEmployeeFromLocationDialogHtml());

        let ezDialogConfig = new EzDialogConfig(EzScheduleLocationsDialog.ezInstance.ezIds.removeLocationEmployeeAssignmentDialogId);

        ezDialogConfig.resizeable = false;

        ezDialogConfig.width = 600;

        ezDialogConfig.buttons = [
            {
                id: `${EzScheduleLocationsDialog.ezInstance.ezIds.removeLocationEmployeeAssignmentDialogId}_RemoveButton`,
                text: 'Remove',
                click: () => {
                    if (!ezApi.ezIsValid(EzScheduleLocationsDialog.ezInstance.activeLocation)) {
                        return ezApi.ezclocker.ezDialogs.ezShowOKMessage(
                            'Select Location',
                            'Please select a location.',
                            () => ezApi.ezclocker.ezDialog.ezCloseDialog(
                                EzScheduleLocationsDialog.ezInstance.ezIds.removeLocationEmployeeAssignmentDialogId))
                            .then(ezApi.ezIgnoreResolve);
                    }

                    let rEmployeeId = ezApi.ezclocker.ezUi.ezGetInputValue(
                        EzScheduleLocationsDialog.ezInstance.ezIds.inputs.removeLocationEmployeeSelectId);

                    let url = ezApi.ezclocker.ezNavigation.ezGetInternalApiUrl(
                        ezApi.ezUrlTemplate`
                            location
                            ?employerId=${ezApi.ezclocker.ezClockerContext.ezGetActiveEmployer().id}
                            &employeeId=${rEmployeeId}
                            &locationId=${EzScheduleLocationsDialog.ezInstance.activeLocation.id}`);

                    return ezApi.ezclocker.ezHttpHelper.ezDel(url)
                        .then(
                            () => ezApi.ezclocker.ezEmployerScheduleController.loadEmployeeInfo()
                                .then(
                                    () => {
                                        EzScheduleLocationsDialog.ezInstance.ezUpdateAssociatedLocationsCacheForEmployee(rEmployeeId);

                                        ezApi.ezclocker.ezUi.ezclocker.ezDialog.ezCloseDialog(
                                            EzScheduleLocationsDialog.ezInstance.ezIds.removeLocationEmployeeAssignmentDialogId);
                                    },
                                    (eResponse) => {
                                        ezApi.ezclocker.ezLogger.error(
                                            `Encountered error while removing an employee location. Error: ${ezApi.ezToJson(eResponse, 2)}`);

                                        ezApi.ezclocker.ezUi.ezclocker.ezDialog.ezCloseDialog(
                                            EzScheduleLocationsDialog.ezInstance.ezIds.removeLocationEmployeeAssignmentDialogId);
                                    }),
                            (eResponse) => {
                                ezApi.ezclocker.ezDialogs.ezShowNon200ServiceError('Location Error', eResponse);

                                ezApi.ezclocker.ezUi.ezclocker.ezDialog.ezCloseDialog(
                                    EzScheduleLocationsDialog.ezInstance.ezIds.removeLocationEmployeeAssignmentDialogId);
                            });
                }
            },
            {
                id: `${EzScheduleLocationsDialog.ezInstance.ezIds.removeLocationEmployeeAssignmentDialogId}_CancelButton`,
                text: 'Cancel',
                click: () => ezApi.ezclocker.ezUi.ezclocker.ezDialog.ezCloseDialog(
                    EzScheduleLocationsDialog.ezInstance.ezIds.removeLocationEmployeeAssignmentDialogId)
            }
        ];

        ezApi.ezclocker.ezDialog.ezInitDialogWithConfig(
            EzScheduleLocationsDialog.ezInstance.ezIds.removeLocationEmployeeAssignmentDialogId,
            ezDialogConfig);
    }

    /**
        @protected
        Initializes the Assign Employee To Location Dialog
     */
    ezInitializeAssigneEmployeeToLocationDialog() {
        ezApi.ezclocker.ezUi.ezAppendContent(
            EzScheduleLocationsDialog.ezInstance.ezIds.parentContainerId,
            EzScheduleLocationsDialog.ezInstance.ezBuildAssignEmployeeToLocationDialogHtml());

        let ezDialogConfig = new EzDialogConfig(EzScheduleLocationsDialog.ezInstance.ezIds.assignEmployeeToLocationDialog);

        ezDialogConfig.width = 600;

        ezDialogConfig.maxHeight = '45%';

        ezDialogConfig.buttons = [
            {
                id: '',
                text: 'Assign',
                click: EzScheduleLocationsDialog.ezInstance.ezHandleAssignEmployeeClick,
            },
            {
                id: '',
                text: 'Cancel',
                click: () => ezApi.ezclocker.ezDialog.ezCloseDialog(EzScheduleLocationsDialog.ezInstance.ezIds.assignEmployeeToLocationDialog)
            }
        ];

        ezApi.ezclocker.ezDialog.ezInitDialogWithConfig(
            EzScheduleLocationsDialog.ezInstance.ezIds.assignEmployeeToLocationDialog,
            ezDialogConfig);

        ezApi.ezclocker.ezEventEngine.ezWantElementEvent(
            EzScheduleLocationsDialog.ezInstance.ezIds.buttons.addLocationButtonId,
            EzElementEventName.CLICK,
            EzScheduleLocationsDialog.ezApiName,
            EzScheduleLocationsDialog.ezInstance.ezAddNewLocationClick);
    }

    /**
        @protected
        Handles the click even for assigning the selected employee to a location.
     */
    ezHandleAssignEmployeeClick() {
        if (ezApi.ezIsNotValid(EzScheduleLocationsDialog.ezInstance.activeLocation)) {
            return ezApi.ezclocker.ezDialog.ezShowError(
                'Location Editor',
                'Please select a location before assigning employees')
                .then(() => ezApi.ezclocker.ezDialog.ezCloseDialog(EzScheduleLocationsDialog.ezInstance.ezIds.assignEmployeeToLocationDialog));
        }

        ezApi.ezclocker.ezDialog.ezCloseDialog(EzScheduleLocationsDialog.ezInstance.ezIds.assignEmployeeToLocationDialog);

        let assignEmployeeId = ezApi.ezclocker.ezUi.ezGetInputValue(
            EzScheduleLocationsDialog.ezInstance.ezIds.inputs.assignEmployeeToLocationDialog_AvailableEmployeesSelectInputId);

        let employerId = ezApi.ezclocker.ezClockerContext.ezGetActiveEmployer().id;

        return ezApi.ezclocker.ezUi.ezStartPageWaitExecute(
            'Assigning employee to location ...',
            (waitDone) => ezApi.ezclocker.ezHttpHelper.ezPost(
                ezApi.ezclocker.nav.ezGetInternalApiUrl(
                    `employer/${employerId}/employee/${assignEmployeeId}/locationMap`),
                ezApi.ezToJson({
                    employerId: employerId,
                    employeeId: assignEmployeeId,
                    locationId: EzScheduleLocationsDialog.ezInstance.activeLocation.id,
                    primaryLocation: ezApi.ezclocker.ezUi.ezGetInputValue(
                        EzScheduleLocationsDialog.ezInstance.ezIds.inputs.assignEmployeeToLocationDialog_PrimaryLocationSelectInputId)
                }))
                .then(
                    ezApi.ezclocker.ezServices.ezProcessApiResolve,
                    ezApi.ezclocker.ezServices.ezProcessApiReject)
                .then(
                    () => {
                        EzScheduleLocationsDialog.ezInstance.ezLoadSelectedEmployerLocation();
                        return waitDone().then(ezApi.ezIgnoreResolve);
                    },
                    (eResponse, jqXHR) => waitDone()
                        .then(() => {
                            ezApi.ezclocker.ezDialog.ezReportInternalBugDialog(
                                jqXHR,
                                'Could not assign employee to location.',
                                '',
                                ezApi.ezToJson(eResponse));
                        })));
    }


    /**
        @public
        Sets the active location
        @param {object|null} location
     */
    ezSetActiveLocation(location) {
        if (ezApi.ezIsValid(location)) {
            EzScheduleLocationsDialog.ezInstance.activeLocation = location;
            EzScheduleLocationsDialog.ezInstance.activeLocationDivId = `_Location_${EzScheduleLocationsDialog.ezInstance.activeLocation.id}`;
        } else {
            EzScheduleLocationsDialog.ezInstance.activeLocation = null;
            EzScheduleLocationsDialog.ezInstance.activeLocationDivId = null;
        }
    }

    /**
        @public
        Sets if the active location is modified or not
        @param {boolean} boolValue
     */
    ezSetActiveLocationModified(boolValue) {
        EzScheduleLocationsDialog.ezInstance.activeLocationModified = ezApi.ezIsTrue(boolValue);
    }

    /**
        @public
        Original: displayLocationWindow
     */
    ezManageLocationsClick() {
        EzScheduleLocationsDialog.ezInstance.ezShow();
    }

    /**
        @public
        Closes the schedule locations dialog
     */
    ezClose() {
        EzScheduleLocationsDialog.ezInstance.ezResetDialog();
        EzScheduleLocationsDialog.ezInstance.ezSaveLocationDataButtonClick();
        ezApi.ezclocker.ezUi.ezCloseDialog(EzScheduleLocationsDialog.ezInstance.ezDialogId);
    }

    /**
        @public
        Renders the employer locations in the UX
     */
    renderEmployerLocations() {
        if (!ezApi.ezIsArray(EzScheduleLocationsDialog.ezInstance.primaryEmployerAvailableLocations)) {
            ezApi.ezclocker.ezUi.ezContent(EzScheduleLocationsDialog.ezInstance.ezIds.locationCellId, '');
            return;
        }

        // Remove any existing event click listeners for locations
        ezApi.ezclocker.ezEventEngine.ezClearAllWantElementEventsForElementIdStartsWith(
            '_Location_',
            EzElementEventName.CLICK);

        ezApi.ezclocker.ezEventEngine.ezClearAllWantElementEventsForElementIdStartsWith(
            'EzLocationEditorDeleteLocationButton_',
            EzElementEventName.CLICK);

        let locationHtml = '';

        let locationIds = [];

        EzScheduleLocationsDialog.ezInstance.ezLocationIdIndexMap = {};

        for (let index = 0; index < EzScheduleLocationsDialog.ezInstance.primaryEmployerAvailableLocations.length; index++) {
            let location = EzScheduleLocationsDialog.ezInstance.primaryEmployerAvailableLocations[index];
            location.index = index;
            locationIds.push(location.id);

            EzScheduleLocationsDialog.ezInstance.ezLocationIdIndexMap[location.id] = index;

            locationHtml += ezApi.ezTemplate`
                <div id="_Location_${location.id}" class="ezLocationEditorLocationItemContainer">
                    ${EzScheduleLocationsDialog.ezInstance.ezRenderLocationDivHtml(location)}
                </div>`;
        }

        ezApi.ezclocker.ezUi.ezContent(
            EzScheduleLocationsDialog.ezInstance.ezIds.containers.workLocationsListingContainerId,
            locationHtml);

        // Hooke events for the location divs
        for (let index = 0; index < locationIds.length; index++) {
            let locationId = locationIds[index];

            ezApi.ezclocker.ezEventEngine.ezWantElementEvent(
                `_Location_${locationId}`,
                EzElementEventName.CLICK,
                EzScheduleLocationsDialog.ezApiName,
                () => EzScheduleLocationsDialog.ezInstance.ezSelectLocationFromLocationIndex(index, false));

            ezApi.ezclocker.ezEventEngine.ezWantElementEvent(
                `EzLocationEditorDeleteLocationButton_${locationId}`,
                EzElementEventName.CLICK,
                EzScheduleLocationsDialog.ezApiName,
                (event) => EzScheduleLocationsDialog.ezInstance.ezDeleteLocationClick(event, locationId));
        }
    }

    /**
        @protected @method
        Renders the assigned employees for the currently editing location
        @param {Object} location
        @returns {Promise.resolve}
     */
    ezRenderEmployeesForLocation(location) {
        if (!ezApi.ezIsValid(location)) {
            return ezApi.ezResolve();
        }

        return ezApi.ezAsyncAction(
            (finished) => ezApi.ezclocker.ezLocations.ezGetLocationAssignedEmployees(location.id)
                .then(
                    (response) => {
                        location.assignedEmployees = response.entities;
                        let assignedEmployeesHtml = '';

                        for (let x = 0; x < location.assignedEmployees.length; x++) {
                            let assignedEmployee = location.assignedEmployees[x];
                            if (ezApi.ezIsValid(assignedEmployee)) {
                                assignedEmployee.ezAssignedIndex = x;
                                assignedEmployeesHtml += EzScheduleLocationsDialog.ezInstance.ezBuildLocationEmployeesHtml(assignedEmployee);
                            }
                        }

                        ezApi.ezclocker.ezUi.ezContent(
                            EzScheduleLocationsDialog.ezInstance.ezIds.containers.assignedEmployeesContainerId,
                            assignedEmployeesHtml);

                        return finished();
                    },
                    (eResponse) => {
                        location.assignedEmployees = [];

                        ezApi.ezclocker.ezUi.ezContent(
                            EzScheduleLocationsDialog.ezInstance.ezIds.containers.assignedEmployeesContainerId,
                            '<!-- No assigned employees available -->');

                        return ezApi.ezclocker.ezDialog.ezShowNon200ServiceError(
                            EzScheduleLocationsDialog.ezInstance.DEFAULT_ERROR_TITLE,
                            eResponse,
                            EzScheduleLocationsDialog.ezInstance.DEFAULT_ERROR_MESSAGE,
                            true)
                            .then(finished);
                    }));
    }

    /**
        @protected @method
        Builds a location div's html
        Note: Delete button click is hooked by the caller of this method.
        @param {object} location
     */
    ezRenderLocationDivHtml(location) {
        if (!ezApi.ezIsValid(location)) {
            return '';
        }

        return ezApi.ezTemplate`
            <table id="EzLocationEditorLocationItem${location.id}" class="ezLocationEditorLocationItemTable">
                <tr>
                    <td id="EzLocationEditorLocationItem${location.id}_NameCell"
                        class="ezLocationEditorLocationItemNameCell">
                        ${location.name}
                    </td>
                    <td>
                        <!-- empty cell -->
                    </td>
                    <td id="EzLocationEditorLocationItemButtonCell_${location.id}"
                        class="ezLocationEditorLocationItemButtonCell">
                        <button id="EzLocationEditorDeleteLocationButton_${location.id}" class="ezDeleteEditButton"
                            data-location-name="${location.name}" title="Delete ${location.name}">
                            <img id="EzLocationDialogDeleteLocationImage_${location.id}" class="ezEditButtonImage"
                                src="/public/images/freepik/delete/del1-white.svg" alt="Delete"
                                data-location-name="${location.name}" title="Delete ${location.name}">
                        </button>
                    </td>
                </tr>
            </table>`;
    }

    /**
        @protected @method
        Selects a location for editing
        @param {Number} locationIndex
        @param {Object} newLocation
     */
    ezSelectLocationFromLocationIndex(locationIndex, newLocation) {
        if (ezApi.ezIsValid(EzScheduleLocationsDialog.ezInstance.activeLocation)) {
            EzScheduleLocationsDialog.ezInstance.ezUnhighlighLocationDiv();
        }

        if (!ezApi.ezArrayHasLength(EzScheduleLocationsDialog.ezInstance.primaryEmployerAvailableLocations) || 0 > locationIndex ||
            EzScheduleLocationsDialog.ezInstance.primaryEmployerAvailableLocations.length + 1 < locationIndex) {
            EzScheduleLocationsDialog.ezInstance.ezSetActiveLocation(null);
            return;
        }

        EzScheduleLocationsDialog.ezInstance.ezSetActiveLocation(EzScheduleLocationsDialog.ezInstance.primaryEmployerAvailableLocations[locationIndex]);

        EzScheduleLocationsDialog.ezInstance.ezLoadSelectedEmployerLocation();

        if (ezApi.ezIsValid(newLocation)) {
            EzScheduleLocationsDialog.ezInstance.ezEnableLocationSaveButton();
        } else {
            EzScheduleLocationsDialog.ezInstance.ezDisableLocationSaveButton();
        }
    }

    /**
        @protected @method
     */
    ezHighlightLocationDiv() {
        ezApi.ezclocker.ezUi.ezAddElementClass(
            EzScheduleLocationsDialog.ezInstance.activeLocationDivId,
            'ezLocationEditorSelectedLocationItemContainer');

        ezApi.ezclocker.ezUi.ezRemoveElementClass(
            EzScheduleLocationsDialog.ezInstance.activeLocationDivId,
            'ezLocationEditorLocationItemContainer');
    }

    /**
        @protected @method
     */
    ezUnhighlighLocationDiv() {
        ezApi.ezclocker.ezUi.ezAddElementClass(
            EzScheduleLocationsDialog.ezInstance.activeLocationDivId, 'ezLocationEditorLocationItemContainer');

        ezApi.ezclocker.ezUi.ezRemoveElementClass(
            EzScheduleLocationsDialog.ezInstance.activeLocationDivId,
            'ezLocationEditorSelectedLocationItemContainer');
    }

    /**
        @protected @method
     */
    ezLoadSelectedEmployerLocation() {
        EzScheduleLocationsDialog.ezInstance.ezClearLocationEditors();

        if (!ezApi.ezIsValid(EzScheduleLocationsDialog.ezInstance.activeLocation)) {
            EzScheduleLocationsDialog.ezInstance.ezShowLocationDataEntryArea()
                .then(ezApi.ezIgnoreResolve);
            return;
        }

        EzScheduleLocationsDialog.ezInstance.ezHighlightLocationDiv();

        EzScheduleLocationsDialog.ezInstance.ezShowLocationDataEntryArea()
            .then(
                () => {
                    ezApi.ezclocker.ezUi.ezSetInputValue(
                        EzScheduleLocationsDialog.ezInstance.ezIds.inputs.nameInputId,
                        EzScheduleLocationsDialog.ezInstance.activeLocation.name);
                    ezApi.ezclocker.ezUi.ezSetInputValue(
                        EzScheduleLocationsDialog.ezInstance.ezIds.inputs.streeNumberInputId,
                        EzScheduleLocationsDialog.ezInstance.activeLocation.streetNumber);
                    ezApi.ezclocker.ezUi.ezSetInputValue(
                        EzScheduleLocationsDialog.ezInstance.ezIds.inputs.streetNameInputId,
                        EzScheduleLocationsDialog.ezInstance.activeLocation.streetName);
                    ezApi.ezclocker.ezUi.ezSetInputValue(
                        EzScheduleLocationsDialog.ezInstance.ezIds.inputs.cityInputId,
                        EzScheduleLocationsDialog.ezInstance.activeLocation.city);
                    ezApi.ezclocker.ezUi.ezSetInputValue(
                        EzScheduleLocationsDialog.ezInstance.ezIds.inputs.stateInputId,
                        EzScheduleLocationsDialog.ezInstance.activeLocation._state);
                    ezApi.ezclocker.ezUi.ezSetInputValue(
                        EzScheduleLocationsDialog.ezInstance.ezIds.inputs.postalCodeInputId,
                        EzScheduleLocationsDialog.ezInstance.activeLocation.postalCode);
                    ezApi.ezclocker.ezUi.ezSetInputValue(
                        EzScheduleLocationsDialog.ezInstance.ezIds.inputs.mainPhoneInputId,
                        EzScheduleLocationsDialog.ezInstance.activeLocation.phoneNumber);
                    ezApi.ezclocker.ezUi.ezSetInputValue(
                        EzScheduleLocationsDialog.ezInstance.ezIds.inputs.mobilePhoneInputId,
                        EzScheduleLocationsDialog.ezInstance.activeLocation.altPhoneNumber1);
                    ezApi.ezclocker.ezUi.ezSetInputValue(
                        EzScheduleLocationsDialog.ezInstance.ezIds.inputs.otherPhoneInputId,
                        EzScheduleLocationsDialog.ezInstance.activeLocation.altPhoneNumber2);

                    // Update the div name too..
                    if (ezApi.ezIsValid(EzScheduleLocationsDialog.ezInstance.activeLocation)) {

                        // Make sure any existing hooked event is cleared before addind the new one
                        ezApi.ezclocker.ezEventEngine.ezUnwantElementEvent(
                            `EzLocationEditorDeleteLocationButton_${EzScheduleLocationsDialog.ezInstance.activeLocation.id}`,
                            EzElementEventName.CLICK,
                            EzScheduleLocationsDialog.ezApiName);

                        ezApi.ezclocker.ezUi.ezContent(
                            EzScheduleLocationsDialog.ezInstance.activeLocationDivId,
                            EzScheduleLocationsDialog.ezInstance.ezRenderLocationDivHtml(EzScheduleLocationsDialog.ezInstance.activeLocation));

                        ezApi.ezclocker.ezEventEngine.ezWantElementEvent(
                            `EzLocationEditorDeleteLocationButton_${EzScheduleLocationsDialog.ezInstance.activeLocation.id}`,
                            EzElementEventName.CLICK,
                            EzScheduleLocationsDialog.ezApiName,
                            (event) => EzScheduleLocationsDialog.ezInstance.ezDeleteLocationClick(
                                event,
                                EzScheduleLocationsDialog.ezInstance.activeLocation.id));
                    }

                    EzScheduleLocationsDialog.ezInstance.ezDisableLocationSaveButton();
                });
    }

    /**
        @protected
        Original: ezClearLocationEditors
     */
    ezClearLocationEditors() {
        if (ezApi.ezclocker.ezUi.ezElementExists(EzScheduleLocationsDialog.ezInstance.ezIds.inputs.nameInputId)) {
            ezApi.ezclocker.ezUi.ezSetInputValue(EzScheduleLocationsDialog.ezInstance.ezIds.inputs.nameInputId, '');
            ezApi.ezclocker.ezUi.ezSetInputValue(EzScheduleLocationsDialog.ezInstance.ezIds.inputs.streeNumberInputId, '');
            ezApi.ezclocker.ezUi.ezSetInputValue(EzScheduleLocationsDialog.ezInstance.ezIds.inputs.streetNameInputId, '');
            ezApi.ezclocker.ezUi.ezSetInputValue(EzScheduleLocationsDialog.ezInstance.ezIds.inputs.cityInputId, '');
            ezApi.ezclocker.ezUi.ezSetInputValue(EzScheduleLocationsDialog.ezInstance.ezIds.inputs.stateInputId, '');
            ezApi.ezclocker.ezUi.ezSetInputValue(EzScheduleLocationsDialog.ezInstance.ezIds.inputs.postalCodeInputId, '');
            ezApi.ezclocker.ezUi.ezSetInputValue(EzScheduleLocationsDialog.ezInstance.ezIds.inputs.mainPhoneInputId, '');
            ezApi.ezclocker.ezUi.ezSetInputValue(EzScheduleLocationsDialog.ezInstance.ezIds.inputs.mobilePhoneInputId, '');
            ezApi.ezclocker.ezUi.ezSetInputValue(EzScheduleLocationsDialog.ezInstance.ezIds.inputs.otherPhoneInputId, '');
        }
    }

    /**
        @protected
        Handles the save location button click
     */
    ezSaveLocationDataButtonClick() {
        EzScheduleLocationsDialog.ezInstance.ezUpdateActiveLocationValues();

        EzScheduleLocationsDialog.ezInstance.ezSaveActiveLocation()
            .then(
                () => {
                    EzScheduleLocationsDialog.ezInstance.ezLoadSelectedEmployerLocation();
                    if (EzScheduleLocationsDialog.ezInstance.saveThenAdd) {
                        EzScheduleLocationsDialog.ezInstance.ezAddNewLocationClick();
                    }
                },
                EzScheduleLocationsDialog.ezInstance.ezLoadSelectedEmployerLocation);
    }

    /**
        @protected
        Updates the activeLocation with the data from the input UX
     */
    ezUpdateActiveLocationValues() {
        // This is an event handler so need to assigned EzScheduleLocationsDialog directly
        if (!ezApi.ezIsValid(EzScheduleLocationsDialog.ezInstance.activeLocation)) {
            return;
        }

        EzScheduleLocationsDialog.ezInstance.activeLocation.name =
            ezApi.ezclocker.ezUi.ezGetInputValue(EzScheduleLocationsDialog.ezInstance.ezIds.inputs.nameInputId);
        EzScheduleLocationsDialog.ezInstance.activeLocation.streetNumber =
            ezApi.ezclocker.ezUi.ezGetInputValue(EzScheduleLocationsDialog.ezInstance.ezIds.inputs.streeNumberInputId);
        EzScheduleLocationsDialog.ezInstance.activeLocation.streetName =
            ezApi.ezclocker.ezUi.ezGetInputValue(EzScheduleLocationsDialog.ezInstance.ezIds.inputs.streetNameInputId);
        EzScheduleLocationsDialog.ezInstance.activeLocation.city =
            ezApi.ezclocker.ezUi.ezGetInputValue(EzScheduleLocationsDialog.ezInstance.ezIds.inputs.cityInputId);
        EzScheduleLocationsDialog.ezInstance.activeLocation._state =
            ezApi.ezclocker.ezUi.ezGetInputValue(EzScheduleLocationsDialog.ezInstance.ezIds.inputs.stateInputId);
        EzScheduleLocationsDialog.ezInstance.activeLocation.state =
            ezApi.ezclocker.ezUi.ezGetInputValue(EzScheduleLocationsDialog.ezInstance.ezIds.inputs.stateInputId);
        EzScheduleLocationsDialog.ezInstance.activeLocation.postalCode =
            ezApi.ezclocker.ezUi.ezGetInputValue(EzScheduleLocationsDialog.ezInstance.ezIds.inputs.postalCodeInputId);
        EzScheduleLocationsDialog.ezInstance.activeLocation.phoneNumber =
            ezApi.ezclocker.ezUi.ezGetInputValue(EzScheduleLocationsDialog.ezInstance.ezIds.inputs.mainPhoneInputId);
        EzScheduleLocationsDialog.ezInstance.activeLocation.altPhoneNumber1 =
            ezApi.ezclocker.ezUi.ezGetInputValue(EzScheduleLocationsDialog.ezInstance.ezIds.inputs.mobilePhoneInputId);
        EzScheduleLocationsDialog.ezInstance.activeLocation.altPhoneNumber2 =
            ezApi.ezclocker.ezUi.ezGetInputValue(EzScheduleLocationsDialog.ezInstance.ezIds.inputs.otherPhoneInputId);
    }

    /**
        @public
        Saves the active location
        @returns {Promise}
     */
    ezSaveActiveLocation() {
        if (!ezApi.ezIsValid(EzScheduleLocationsDialog.ezInstance.activeLocation)) {
            return ezApi.ezResolve(EzScheduleLocationsDialog.ezInstance.activeLocation);
        }

        EzScheduleLocationsDialog.ezInstance.ezDisableLocationSaveButton();

        return ezApi.ezclocker.ezUi.ezStartPageWaitPromise(
            'Saving location ...',
            (waitDone, resolve, reject) => ezApi.ezclocker.ezLocations.ezSaveLocation(
                EzScheduleLocationsDialog.ezInstance.activeLocation.id, EzScheduleLocationsDialog.ezInstance.activeLocation)
                .then(
                    (response) => {
                        EzScheduleLocationsDialog.ezInstance.ezSetActiveLocationModified(false);
                        return waitDone().then(() => resolve(response));
                    },
                    (eResponse) => {
                        EzScheduleLocationsDialog.ezInstance.ezSetActiveLocationModified(true);
                        EzScheduleLocationsDialog.ezInstance.ezEnableLocationSaveButton();

                        return waitDone()
                            .then(
                                () => {
                                    ezApi.ezclocker.ezDialog.ezShowError(
                                        'Save Location Error',
                                        ezApi.ezEM`
                                            Unable to save the location at this time.
                                            <p>${eResponse.message}</p>`);
                                    return reject(eResponse);
                                });
                    }));

    }

    /**
        @public
        Original: ezAddNewLocationClick
     */
    ezAddNewLocationClick() {
        ezApi.ezclocker.ezUi.ezStartPageWaitExecute(
            'Adding new location ...',
            (waitDone) => EzScheduleLocationsDialog.ezInstance.ezSaveActiveLocation()
                .then(
                    () => EzScheduleLocationsDialog.ezInstance.ezAddNewLocation()
                        .then(
                            (newLocation) =>
                                EzScheduleLocationsDialog.ezInstance.ezRefreshEmployerLocations()
                                    .then(EzScheduleLocationsDialog.ezInstance.renderEmployerLocations)
                                    .then(EzScheduleLocationsDialog.ezInstance.ezCacheEmployeeAssignedLocations)
                                    .then(
                                        () => {
                                            EzScheduleLocationsDialog.ezInstance.ezSelectLocationFromLocationIndex(
                                                EzScheduleLocationsDialog.ezInstance.ezLocationIdIndexMap[newLocation.id],
                                                true);
                                            return waitDone();
                                        }),
                            (eResponse) => {
                                waitDone();
                                ezApi.ezclocker.ezDialog.ezShowError(
                                    'Add Location Error',
                                    ezApi.ezEM`
                                        Unable to add a new location at this time.
                                        <p>${eResponse.message}</p>`);
                            }),
                    () => {
                        // Cannot save, so cannot add a new location
                        EzScheduleLocationsDialog.ezInstance.ezLoadSelectedEmployerLocation();
                        waitDone();
                    }));
    }

    /**
        @public
        Adds a new location record
        @returns {Promise}
     */
    ezAddNewLocation() {
        return ezApi.ezPromise(
            (resolve, reject) => ezApi.ezclocker.ezLocations.ezAddLocation(
                new EzLocation(ezApi.ezclocker.ezClockerContext.ezGetActiveEmployer().id, 'New Location'))
                .then(
                    (response) => resolve(response.location),
                    (eResponse) => {
                        ezApi.ezclocker.ezDialog.ezShowError(
                            'Add Location Error',
                            ezApi.ezEm`
                                Unable to add a new location at this time.
                                <p>${eResponse.message}</p>`);
                        return reject(eResponse);
                    }));
    }

    /**
        @public
        Original: deleteLocation
        @param {object} ezEvent
        @param {long} locationId
     */
    ezDeleteLocationClick(ezEvent, locationId) {
        ezEvent.data.elementEvent.stopPropagation();

        let locationName = ezApi.ezclocker.ezUi.ezGetElementDataAttributeValue(
            ezEvent.data.elementEvent.target.id,
            'locationName');

        ezApi.ezclocker.ezDialog.ezYesNoDialog(
            'Delete Location',
            `Are you sure you want to delete ${locationName}?`,
            (result) => {
                if ('NO' === result) {
                    return;
                }

                ezApi.ezclocker.ezUi.ezStartPageWaitExecute(
                    'Deleting location ...',
                    (waitDone) => ezApi.ezclocker.ezLocations.ezRemoveLocation(locationId)
                        .then(
                            () => {
                                let locationDivId = `_Location_${locationId}`;
                                if (locationDivId === EzScheduleLocationsDialog.ezInstance.activeLocationDivId) {
                                    EzScheduleLocationsDialog.ezInstance.ezClearLocationEditors();
                                    EzScheduleLocationsDialog.ezInstance.ezSetActiveLocation();
                                }
                                ezApi.ezclocker.ezUi.ezRemoveElement(locationDivId);
                                ezApi.ezclocker.ezUi.ezContent(
                                    '_EmployerNameCell',
                                    ezApi.ezAssignOrDefault(
                                        ezApi.ezclocker.ezClockerContext.ezGetActiveEmployer().employerName,
                                        'Company Name'));

                                EzScheduleLocationsDialog.ezInstance.ezCacheEmployeeAssignedLocations()
                                    .then(
                                        () => {
                                            EzScheduleLocationsDialog.ezInstance.ezLoadSelectedEmployerLocation();
                                            waitDone();
                                        });
                            },
                            (eResponse) => {
                                waitDone();
                                ezApi.ezclocker.ezDialog.ezShowError(
                                    'Delete Location Error',
                                    ezApi.ezEM`
                                        Unable to delete the location at this time.
                                        <p>${eResponse.message}</p>`);
                            }));
            },
            undefined,
            undefined,
            true);
    }

    /**
        @public
        Original: ezSelectEmployee
        @param {*} index
        @param {*} employeeId
     */
    ezSelectEmployee(index, employeeId) {
        EzScheduleLocationsDialog.ezInstance.ezUnselectCurrentTable();

        EzScheduleLocationsDialog.ezInstance.activeEmployeeTableId =
            `${EzScheduleLocationsDialog.ezInstance.ezIds.tables.assignedEmployeeCardLayoutTableId}_${index}`;

        EzScheduleLocationsDialog.ezInstance.activeEmployeeId = employeeId;

        ezApi.ezclocker.ezUi.ezAddElementClass(
            EzScheduleLocationsDialog.ezInstance.activeEmployeeTableId,
            'selectedEmployeeDataTable');

        ezApi.ezclocker.ezUi.ezRemoveElementClass(
            EzScheduleLocationsDialog.ezInstance.activeEmployeeTableId,
            'employeeDataTable');

        ezApi.ezclocker.ezUi.ezEnableElement(EzScheduleLocationsDialog.ezInstance.ezIds.buttons.removeAssignedEmployeeButtonId);
    }

    /**
        @protected
        Original: ezUnselectCurrentTable
     */
    ezUnselectCurrentTable() {
        if (!ezApi.ezIsValid(EzScheduleLocationsDialog.ezInstance.activeEmployeeTableId)) {
            return;
        }

        ezApi.ezclocker.ezUi.ezAddElementClass(
            EzScheduleLocationsDialog.ezInstance.activeEmployeeTableId,
            'employeeDataTable');

        ezApi.ezclocker.ezUi.ezRemoveElementClass(
            EzScheduleLocationsDialog.ezInstance.activeEmployeeTableId,
            'selectedEmployeeDataTable');

        EzScheduleLocationsDialog.ezInstance.activeEmployeeTableId = null;

        EzScheduleLocationsDialog.ezInstance.activeEmployeeId = null;

        ezApi.ezclocker.ezUi.ezDisableElement(EzScheduleLocationsDialog.ezInstance.ezIds.buttons.removeAssignedEmployeeButtonId);
    }

    /**
        @protected
        Loads a location editor pane based on if an active location is selected or not.
        @returns {Promise.resolve}
     */
    ezShowLocationDataEntryArea() {
        return ezApi.ezAsyncAction(
            (finished) => {
                if (!ezApi.ezIsValid(EzScheduleLocationsDialog.ezInstance.activeLocation)) {
                    ezApi.ezclocker.ezUi.ezHideElement(EzScheduleLocationsDialog.ezInstance.ezIds.containers.editorContainerId);
                    ezApi.ezclocker.ezUi.ezShowElement(EzScheduleLocationsDialog.ezInstance.ezIds.containers.helpContainerId);
                    EzScheduleLocationsDialog.ezInstance.ezActiveEditorPane = 'EzLocationEditorHelpPane';
                    return finished();
                }

                ezApi.ezclocker.ezUi.ezHideElement(EzScheduleLocationsDialog.ezInstance.ezIds.containers.helpContainerId);
                ezApi.ezclocker.ezUi.ezShowElement(EzScheduleLocationsDialog.ezInstance.ezIds.containers.editorContainerId);

                return EzScheduleLocationsDialog.ezInstance.ezRenderEmployeesForLocation(EzScheduleLocationsDialog.ezInstance.activeLocation)
                    .then(
                        () => {
                            EzScheduleLocationsDialog.ezInstance.ezActiveEditorPane = 'EzLocationEditorPane';
                            return finished();
                        });
            });
    }

    /**
        @protected
        Hooks the editor pane's button events
    */
    ezHookEditorPaneEvents() {
        // Inputs
        if (ezApi.ezclocker.ezUi.ezElementExists(EzScheduleLocationsDialog.ezInstance.ezIds.inputs.nameInputId)) {
            ezApi.ezclocker.ezEventEngine.ezWantElementEvent(
                EzScheduleLocationsDialog.ezInstance.ezIds.inputs.nameInputId,
                EzElementEventName.KEY_UP,
                EzScheduleLocationsDialog.ezApiName,
                EzScheduleLocationsDialog.ezInstance.ezHandleOnInputChangedEvent);
        }
        if (ezApi.ezclocker.ezUi.ezElementExists(EzScheduleLocationsDialog.ezInstance.ezIds.inputs.streeNumberInputId)) {
            ezApi.ezclocker.ezEventEngine.ezWantElementEvent(
                EzScheduleLocationsDialog.ezInstance.ezIds.inputs.streeNumberInputId,
                EzElementEventName.KEY_UP,
                EzScheduleLocationsDialog.ezApiName,
                EzScheduleLocationsDialog.ezInstance.ezHandleOnInputChangedEvent);
        }
        if (ezApi.ezclocker.ezUi.ezElementExists(EzScheduleLocationsDialog.ezInstance.ezIds.inputs.streetNameInputId)) {
            ezApi.ezclocker.ezEventEngine.ezWantElementEvent(
                EzScheduleLocationsDialog.ezInstance.ezIds.inputs.streeNumberInputId,
                EzElementEventName.KEY_UP,
                EzScheduleLocationsDialog.ezApiName,
                EzScheduleLocationsDialog.ezInstance.ezHandleOnInputChangedEvent);
        }
        if (ezApi.ezclocker.ezUi.ezElementExists(EzScheduleLocationsDialog.ezInstance.ezIds.inputs.additionalAddressInputId)) {
            ezApi.ezclocker.ezEventEngine.ezWantElementEvent(
                EzScheduleLocationsDialog.ezInstance.ezIds.inputs.additionalAddressInputId,
                EzElementEventName.KEY_UP,
                EzScheduleLocationsDialog.ezApiName,
                EzScheduleLocationsDialog.ezInstance.ezHandleOnInputChangedEvent);
        }
        if (ezApi.ezclocker.ezUi.ezElementExists(EzScheduleLocationsDialog.ezInstance.ezIds.inputs.cityInputId)) {
            ezApi.ezclocker.ezEventEngine.ezWantElementEvent(
                EzScheduleLocationsDialog.ezInstance.ezIds.inputs.cityInputId,
                EzElementEventName.KEY_UP,
                EzScheduleLocationsDialog.ezApiName,
                EzScheduleLocationsDialog.ezInstance.ezHandleOnInputChangedEvent);
        }
        if (ezApi.ezclocker.ezUi.ezElementExists(EzScheduleLocationsDialog.ezInstance.ezIds.inputs.stateInputId)) {
            ezApi.ezclocker.ezEventEngine.ezWantElementEvent(
                EzScheduleLocationsDialog.ezInstance.ezIds.inputs.stateInputId,
                EzElementEventName.KEY_UP,
                EzScheduleLocationsDialog.ezApiName,
                EzScheduleLocationsDialog.ezInstance.ezHandleOnInputChangedEvent);
        }
        if (ezApi.ezclocker.ezUi.ezElementExists(EzScheduleLocationsDialog.ezInstance.ezIds.inputs.postalCodeInputId)) {
            ezApi.ezclocker.ezEventEngine.ezWantElementEvent(
                EzScheduleLocationsDialog.ezInstance.ezIds.inputs.postalCodeInputId,
                EzElementEventName.KEY_UP,
                EzScheduleLocationsDialog.ezApiName,
                EzScheduleLocationsDialog.ezInstance.ezHandleOnInputChangedEvent);
        }
        if (ezApi.ezclocker.ezUi.ezElementExists(EzScheduleLocationsDialog.ezInstance.ezIds.inputs.mainPhoneInputId)) {
            ezApi.ezclocker.ezEventEngine.ezWantElementEvent(
                EzScheduleLocationsDialog.ezInstance.ezIds.inputs.mainPhoneInputId,
                EzElementEventName.KEY_UP,
                EzScheduleLocationsDialog.ezApiName,
                EzScheduleLocationsDialog.ezInstance.ezHandleOnInputChangedEvent);
        }
        if (ezApi.ezclocker.ezUi.ezElementExists(EzScheduleLocationsDialog.ezInstance.ezIds.inputs.mobilePhoneInputId)) {
            ezApi.ezclocker.ezEventEngine.ezWantElementEvent(
                EzScheduleLocationsDialog.ezInstance.ezIds.inputs.mobilePhoneInputId,
                EzElementEventName.KEY_UP,
                EzScheduleLocationsDialog.ezApiName,
                EzScheduleLocationsDialog.ezInstance.ezHandleOnInputChangedEvent);
        }
        if (ezApi.ezclocker.ezUi.ezElementExists(EzScheduleLocationsDialog.ezInstance.ezIds.inputs.otherPhoneInputId)) {
            ezApi.ezclocker.ezEventEngine.ezWantElementEvent(
                EzScheduleLocationsDialog.ezInstance.ezIds.inputs.otherPhoneInputId,
                EzElementEventName.KEY_UP,
                EzScheduleLocationsDialog.ezApiName,
                EzScheduleLocationsDialog.ezInstance.ezHandleOnInputChangedEvent);
        }

        // Buttons
        if (ezApi.ezclocker.ezUi.ezElementExists(EzScheduleLocationsDialog.ezInstance.ezIds.buttons.locationSaveButtonId)) {
            ezApi.ezclocker.ezEventEngine.ezWantElementEvent(
                EzScheduleLocationsDialog.ezInstance.ezIds.buttons.locationSaveButtonId,
                EzElementEventName.CLICK,
                EzScheduleLocationsDialog.ezApiName,
                EzScheduleLocationsDialog.ezInstance.ezSaveLocationDataButtonClick);
        }
        if (ezApi.ezclocker.ezUi.ezElementExists(EzScheduleLocationsDialog.ezInstance.ezIds.buttons.assignEmployeeButtonId)) {
            ezApi.ezclocker.ezEventEngine.ezWantElementEvent(
                EzScheduleLocationsDialog.ezInstance.ezIds.buttons.assignEmployeeButtonId,
                EzElementEventName.CLICK,
                EzScheduleLocationsDialog.ezApiName,
                EzScheduleLocationsDialog.ezInstance.ezAssignEmployeeButtonClick);
        }
        if (ezApi.ezclocker.ezUi.ezElementExists(EzScheduleLocationsDialog.ezInstance.ezIds.buttons.removeAssignedEmployeeButtonId)) {
            ezApi.ezclocker.ezEventEngine.ezWantElementEvent(
                EzScheduleLocationsDialog.ezInstance.ezIds.buttons.removeAssignedEmployeeButtonId,
                EzElementEventName.CLICK,
                EzScheduleLocationsDialog.ezApiName,
                EzScheduleLocationsDialog.ezInstance.ezRemoveAssignedEmployeeFromActiveLocation);
        }
    }

    /**
        @protected
        Enables the location save button.
    */
    ezEnableLocationSaveButton() {
        if (ezApi.ezclocker.ezUi.ezElementExists(EzScheduleLocationsDialog.ezInstance.ezIds.buttons.locationSaveButtonId)) {
            ezApi.ezclocker.ezUi.ezEnableElement(EzScheduleLocationsDialog.ezInstance.ezIds.buttons.locationSaveButtonId);
        }
    }

    /**
        @protected
        Disables the location save button.
    */
    ezDisableLocationSaveButton() {
        if (ezApi.ezclocker.ezUi.ezElementExists(EzScheduleLocationsDialog.ezInstance.ezIds.buttons.locationSaveButtonId)) {
            ezApi.ezclocker.ezUi.ezDisableElement(EzScheduleLocationsDialog.ezInstance.ezIds.buttons.locationSaveButtonId);
        }
    }

    /**
            @protected
            Handles the input editors on change events
            @param {Object} event
        */
    ezHandleOnInputChangedEvent() {
        EzScheduleLocationsDialog.ezInstance.ezEnableLocationSaveButton();
    }

    /**
        @protected
        original: assignEmployee
     */
    ezAssignEmployeeButtonClick() {
        EzScheduleLocationsDialog.ezInstance.ezUpdateActiveLocationValues();

        EzScheduleLocationsDialog.ezInstance.ezSaveActiveLocation()
            .then(
                () => {
                    let optionsHtml = '';

                    let employees = ezApi.ezclocker.ezClockerContext.ezGetSelectedEmployerAccountEmployeeAccounts();
                    if (!ezApi.ezArrayHasLength(employees)) {
                        return;
                    }

                    for (let employee of employees) {
                        optionsHtml += ezApi.ezTemplate`
                            <option value="${employee.id}">
                                ${employee.employeeName}
                            </option>`;
                    }

                    ezApi.ezclocker.ezUi.ezContent(
                        EzScheduleLocationsDialog.ezInstance.ezIds.inputs.assignEmployeeToLocationDialog_AvailableEmployeesSelectInputId,
                        optionsHtml);

                    ezApi.ezclocker.ezDialog.ezShowDialog(EzScheduleLocationsDialog.ezInstance.ezIds.assignEmployeeToLocationDialog)
                        .then(ezApi.ezIgnoreResolve());

                },
                ezApi.ezIgnoreReject);
    }

    /**
        @public
        Caches the assigned locations for all employees on each employee object
        @returns {Promise.resolve}
     */
    ezCacheEmployeeAssignedLocations() {
        let resolveCount = 0;

        return ezApi.ezAsyncAction(
            (finished) => {
                let employees = ezApi.ezclocker.ezClockerContext.ezGetSelectedEmployerAccountEmployeeAccounts();

                if (!ezApi.ezArrayHasLength(employees) || 0 == employees.length) {
                    return finished();
                }

                for (let employee of employees) {
                    ezApi.ezclocker.ezLocations.ezGetAssignedLocationsForEmployee(employee.id)
                        .then(
                            (locations) => {
                                resolveCount++;
                                employee.assignedLocations = ezApi.ezArrayHasLength(locations)
                                    ? locations
                                    : [];

                                if (resolveCount >= employees.length) {
                                    return finished();
                                }
                            },
                            () => {
                                resolveCount++;
                                employee.assignedLocations = [];

                                if (resolveCount >= employees.length) {
                                    return finished();
                                }
                            });
                }
            });
    }

    /**
        @public
        Original: ezUpdateAssociatedLocationsCacheForEmployee
        @param {Number} employeeId
        @returns {Promise}
     */
    ezUpdateAssociatedLocationsCacheForEmployee(employeeId) {
        return ezApi.ezclocker.ezLocations.ezGetAssignedLocationsForEmployee(employeeId);
    }

    /**
        @protected
        Handles the remove assigned employee button click
     */
    ezRemoveAssignedEmployeeFromActiveLocation() {
        return ezApi.ezclocker.ezUi.ezStartPageWaitResolve(
            'Removing employee from location ...',
            (resolve, waitDone) => {
                ezApi.ezclocker.ezLocations.ezRemoveAssignedEmployeeFromLocation(
                    EzScheduleLocationsDialog.ezInstance.activeEmployeeId, EzScheduleLocationsDialog.ezInstance.activeLocation.id)
                    .then(
                        (response) => {
                            ezApi.ezclocker.ezUi.ezRemoveElement(EzScheduleLocationsDialog.ezInstance.activeEmployeeTableId);
                            EzScheduleLocationsDialog.ezInstance.activeEmployeeTableId = null;
                            waitDone();
                            return resolve(response);
                        },
                        (eResponse) => {
                            waitDone();
                            ezApi.ezclocker.logger.error(ezApi.ezEM`
                                Failed to unassign an employee from a location.
                                Error: ${ezApi.ezToJson(eResponse)}`);

                            ezApi.ezclocker.ezDialog.ezShowError(
                                'Remove Assigned Employee Error',
                                ezApi.ezEM`
                                    Unable to remove the employee at this time.
                                    <p>eResponse.message</p>`);
                        });
            });
    }

    /**
        @protected
        Shows the remove employee from location dialog
     */
    ezShowRemoveEmpLoc() {
        EzScheduleLocationsDialog.ezInstance.htmlForRemoveLoc = '';

        for (let index in EzScheduleLocationsDialog.ezInstance.employees) {
            let employee = EzScheduleLocationsDialog.ezInstance.employees[index].employee;
            let employeeLocations = EzScheduleLocationsDialog.ezInstance.employees[index].assignedLocations;
            for (let num in employeeLocations) {
                if (EzScheduleLocationsDialog.ezInstance.activeLocation.id === employeeLocations[num].id) {
                    EzScheduleLocationsDialog.ezInstance.htmlForRemoveLoc += ezApi.ezTemplate`
                        <option value="${employee.id}">
                            ${employee.employeeName}
                        </option>`;
                }
            }
        }

        ezApi.ezclocker.ezUi.ezContent(
            EzScheduleLocationsDialog.ezInstance.ezIds.inputs.removeLocationEmployeeSelectId,
            EzScheduleLocationsDialog.ezInstance.htmlForRemoveLoc);
    }

    /**
        @protected
        Returns the HTML for the location's assigned employee
        @param {string} tableId
        @param {number} assignedEmployeeIndex
        @param {object} employee
        @returns {string}
     */
    ezBuildLocationEmployeesHtml(assignedEmployee) {
        if (!ezApi.ezIsValid(assignedEmployee) ||
            !ezApi.ezIsNumber(assignedEmployee.id) ||
            !ezApi.ezStringHasLength(assignedEmployee.employeeName)) {
            return '';
        }

        let employeeIndex = assignedEmployee.ezAssignedIndex;
        let employeeId = assignedEmployee.id;

        return ezApi.ezTemplate`
            <div id="${EzScheduleLocationsDialog.ezInstance.ezIds.containers.assignedEmployeeCardContainerId}_${employeeIndex}"
                class="ezAssignedEmployeeContainer"
                onclick="ezApi.ezclocker.ezScheduleLocationsDialog.ezSelectEmployee(${employeeIndex}, ${employeeId})">
                <table
                    id="${EzScheduleLocationsDialog.ezInstance.ezIds.tables.assignedEmployeeCardLayoutTableId}_${employeeIndex}"
                    class="employeeDataTable">
                    <tr id="${EzScheduleLocationsDialog.ezInstance.ezIds.tables.assignedEmployeeCardImageRowId}_${employeeIndex}">
                        <td id="${EzScheduleLocationsDialog.ezInstance.ezIds.tables.assignedEmployeeCardImageCellId}_${employeeIndex}"
                            class="employeeImageCell">
                            <img id="${EzScheduleLocationsDialog.ezInstance.ezIds.images.assignedEmployeeCardImageId}" class="employeeImage"
                                src="/public/images/noimage.png"/>
                        </td>
                    </tr>
                    <tr id="${EzScheduleLocationsDialog.ezInstance.ezIds.tables.assignedEmployeeCardNameRowId}_${employeeIndex}">
                        <td id="${EzScheduleLocationsDialog.ezInstance.ezIds.tables.assignedEmployeeCardNameCellId}_${employeeIndex}"
                            class="employeeNameCell">
                            ${assignedEmployee.employeeName}
                        </td>
                    </tr>
                </table>
            </div>`;
    }

    ezBuildManageLocationDialogHtml() {
        return ezApi.ezTemplate`
            <div id="${EzScheduleLocationsDialog.ezInstance.ezDialogId}" title="Manage Locations">
                <table id="${EzScheduleLocationsDialog.ezInstance.ezIds.tables.panelLayoutTableId}" class="ezLocationEditorPaneTable">
                    <tbody>
                        <tr>
                            <td id="${EzScheduleLocationsDialog.ezInstance.ezIds.tables.leftPanelCellId}" class="ezLocationEditorLeftPane">
                                ${EzScheduleLocationsDialog.ezInstance.ezBuildLeftPanelHtml()}
                            </td>
                            <td id="${EzScheduleLocationsDialog.ezInstance.ezIds.tables.rightPanelCellId}" class="ezLocationEditorRightPane">
                                ${EzScheduleLocationsDialog.ezInstance.ezBuildRightPanelHtml()}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>`;
    }

    /**
        @protected @method
        Builds the HTML UX content for the left panel
        @returns {string}
     */
    ezBuildLeftPanelHtml() {
        return ezApi.ezTemplate`
            <table id="${EzScheduleLocationsDialog.ezInstance.ezIds.tables.leftPanelLayoutTableId}"
                class="ezLocationEditorLeftPaneTable">
                <tbody>
                    <tr id="${EzScheduleLocationsDialog.ezInstance.ezIds.tables.workLocationsHeaderRowId}" class="ezLocationEditorHeaderRow">
                        <td id="${EzScheduleLocationsDialog.ezInstance.ezIds.tables.workLocationsHeaderTextCellId}"
                            class="ezLocationEditorHeaderTextCell">
                            Work Locations
                        </td>
                        <td id="${EzScheduleLocationsDialog.ezInstance.ezIds.tables.workLocationsHeaderButtonCellId}"
                            class="ezLocationEditorHeaderButtonCell">
                            <button id="${EzScheduleLocationsDialog.ezInstance.ezIds.buttons.addLocationButtonId}"
                                class="ezSilverActionButton" title="Add a new location">
                                add
                            </button>
                        </td>
                    </tr>
                    <tr id="${EzScheduleLocationsDialog.ezInstance.ezIds.tables.workLocationsListingRowId}"
                        class="ezLocationEditorListingsRow">
                        <td id="${EzScheduleLocationsDialog.ezInstance.ezIds.tables.workLocationsListingCellId}"
                            class="ezLocationEditorListingCell" colspan="2">
                            <div id="${EzScheduleLocationsDialog.ezInstance.ezIds.containers.workLocationsListingContainerId}"
                                class="ezLocationEditorLocationListingsContainer">
                                <-- Location Cards Go Here -->
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>`;
    }

    /**
        @protected @method
        Builds the HTML UX content for the right panel
        @returns {string}
     */
    ezBuildRightPanelHtml() {
        return ezApi.ezTemplate`
            <div id="${EzScheduleLocationsDialog.ezInstance.ezIds.containers.helpContainerId}">
                ${EzScheduleLocationsDialog.ezInstance.ezBuildLocationEditorHelpPaneHtml()}
            </div>
            <div id="${EzScheduleLocationsDialog.ezInstance.ezIds.containers.editorContainerId}"
                style="display:none">
                ${EzScheduleLocationsDialog.ezInstance.ezBuildLocationEditorPaneHtml()}
            </div>`;
    }

    /**
        @protected
        Builds the location editor's help pain for when no locations exist yet.
        @returns {String}
    */
    ezBuildLocationEditorHelpPaneHtml() {
        return ezApi.ezTemplate`
            <table id="${EzScheduleLocationsDialog.ezInstance.ezIds.tables.helpPaneLayoutTableId}" class="ezLocationEditorDataTable">
                <tr id="${EzScheduleLocationsDialog.ezInstance.ezIds.tables.helpPaneImageRowId}" class="ezLocationsEditorDataHeaderRow">
                    <td id="${EzScheduleLocationsDialog.ezInstance.ezIds.tables.helpPaneImageCellId}">
                        <img id="${EzScheduleLocationsDialog.ezInstance.ezIds.images.helpPaneImageId}" src="/public/images/addlocations.png"/>
                    </td>
                </tr>
            </table>
            <table id="${EzScheduleLocationsDialog.ezInstance.dialogId}_FAKE_EditorLayoutTable" class="ezLocationEditorRightPaneTable">
                <!-- Location Editor Location Assigned Employees Row -->
                <tr id="${EzScheduleLocationsDialog.ezInstance.dialogId}_FAKE_EmployeeAssignmentsRow" class="ezLocationEditorInputRow" colspan="2">
                    <td id="${EzScheduleLocationsDialog.ezInstance.dialogId}_FAKE_EmployeeAssignmentsCell" class="ezLocationEditorInputCell"
                        colspan="2">
                        <!-- Location Editor: Assign Employees Editor -->
                        <div id="${EzScheduleLocationsDialog.ezInstance.dialogId}_FAKE_AssignEmployeesContainer" class="ezAutoRow">
                            <div id="${EzScheduleLocationsDialog.ezInstance.dialogId}_FAKE_AssignEmployeesHeader"
                                class="ezLocationEditorAssignEmployeesHeader ezAutoCol_50xA">
                                <label id="${EzScheduleLocationsDialog.ezInstance.dialogId}_FAKE_AssignEmployeesHeaderLabel">
                                    Assigned Employees
                                </label>
                            <div id="${EzScheduleLocationsDialog.ezInstance.dialogId}_FAKE_AssignEmployeeHeaderContainer" class="ezAutoCol_50xA">
                                <button id="${EzScheduleLocationsDialog.ezInstance.dialogId}_FAKE_AssignEmployeeButton"
                                    class="ezSilverEditButton" disabled>
                                    Assign
                                </button>
                                <button id="${EzScheduleLocationsDialog.ezInstance.dialogId}_FAKE_DeleteAssignedEmployeeButton"
                                    class="ezDeleteEditButton" disabled>
                                    Remove
                                </button>
                            </div>
                        </div>
                        <div id="${EzScheduleLocationsDialog.ezInstance.dialogId}_FAKE_assignedEmployeesContainer" class="ezAssignedEmployeesList">
                            <!-- always empty -->
                        </div>
                    </td>
                </tr>
            </table>`;
    }

    /**
        @protected
        Builds the editor html pane for editing/adding locations.
        @returns {String}
    */
    ezBuildLocationEditorPaneHtml() {
        return ezApi.ezTemplate`
            <table id="${EzScheduleLocationsDialog.ezInstance.ezIds.tables.rightPanelLayoutTable}" class="ezLocationEditorRightPaneTable">
                <tr id="${EzScheduleLocationsDialog.ezInstance.ezIds.tables.rightPanelHeaderRowId}" class="ezLocationEditorHeaderRow">
                    <td ${EzScheduleLocationsDialog.ezInstance.ezIds.tables.rightPanelHeaderCellId}" class="ezLocationEditorHeaderTextCell">
                        Location Information
                    </td>
                    <td ${EzScheduleLocationsDialog.ezInstance.ezIds.tables.rightPanelHeaderButtonCellId}" class="ezLocationEditorHeaderButtonCell">
                        <button id="${EzScheduleLocationsDialog.ezInstance.ezIds.buttons.locationSaveButtonId}"
                            class="ezSilverActionButton">
                            save
                        </button>
                    </td>
                </tr>

                <!-- Location Input Editors -->
                <tr id="${EzScheduleLocationsDialog.ezInstance.ezIds.tables.rightPanelEditorInputsRowId}" class="ezLocationEditorInputRow">
                    <td id="${EzScheduleLocationsDialog.ezInstance.ezIds.tables.rightPanelEditorInputsCellId}"
                        class="ezLocationEditorInputCell" colspan="2">

                        <!-- Location Name Input -->
                        <div id="${EzScheduleLocationsDialog.ezInstance.ezIds.containers.locationNameInputContainerId}" class="ezInputBox">
                            <label for="${EzScheduleLocationsDialog.ezInstance.ezIds.inputs.nameInputId}"
                                id="EzLocationEditor_LocationNameLabel" class="ezLocationEditorInputLabel">
                                Name
                            </label>
                            <input id="${EzScheduleLocationsDialog.ezInstance.ezIds.inputs.nameInputId}" type="text"
                                class="ezText ezFullWidthEditor" placeholder="Enter location name or organization name"
                                name="organizationtitle" autocomplete="organization-title"/>
                          </div>

                        <!-- Street number and name input -->
                        <div id="${EzScheduleLocationsDialog.ezInstance.ezIds.containers.locationAddressInputsContainerId}" class="ezAutoCol_33xA">
                            <div id="${EzScheduleLocationsDialog.ezInstance.ezIds.containers.streetNumberInputContainerId}" class="ezInputBox">
                                <label for="${EzScheduleLocationsDialog.ezInstance.ezIds.inputs.streeNumberInputId}"
                                    id="EzLocationEditor_StreetNumberLabel" class="ezLocationEditorInputLabel">
                                    Street Number
                                </label>
                                <input id="${EzScheduleLocationsDialog.ezInstance.ezIds.inputs.streeNumberInputId}" type="text"
                                    class="ezText ezFullWidthEditor" placeholder="(optional)" name="addressline1"
                                    autocomplete="address-line1"/>
                            </div>
                            <div id="${EzScheduleLocationsDialog.ezInstance.ezIds.containers.streetNameInputContainerId}" class="ezInputBox">
                                <label for="${EzScheduleLocationsDialog.ezInstance.ezIds.inputs.streetNameInputId}"
                                    id="EzLocationEditor_StreetNameLabel" class="ezLocationEditorInputLabel">
                                    Street Name
                                </label>
                                <input id="${EzScheduleLocationsDialog.ezInstance.ezIds.inputs.streetNameInputId}" type="text"
                                    class="ezText ezFullWidthEditor" placeholder="(optional)" name="addressline2"
                                    autocomplete="address-line2"/>
                            </div>
                        </div>

                        <!-- Additional address input -->
                        <div id="${EzScheduleLocationsDialog.ezInstance.ezIds.containers.additionalAddressContainerId}" class="ezInputBox">
                            <label for="${EzScheduleLocationsDialog.ezInstance.ezIds.inputs.additionalAddressInputId}"
                                id="${EzScheduleLocationsDialog.ezInstance.ezIds.inputs.additionalAddressInputId}_Label"
                                    class="ezLocationEditorInputLabel">
                                Additional Address (Address Line 3)
                            </label>
                            <input id="${EzScheduleLocationsDialog.ezInstance.ezIds.inputs.additionalAddressInputId}" type="text"
                                class="ezText ezFullWidthEditor" placeholder="(optional)" name="address-line3"
                                autocomplete="address-line3"/>
                        </div>

                        <!-- City, State, Zip Inputs -->
                        <div id="${EzScheduleLocationsDialog.ezInstance.ezIds.containers.cityStateZipContainerId}" class="ezAutoCol_Ax25x25">
                            <div id="${EzScheduleLocationsDialog.ezInstance.ezIds.containers.stateContainerId}" class="ezInputBox">
                                <label for="${EzScheduleLocationsDialog.ezInstance.ezIds.inputs.cityInputId}"
                                    id="${EzScheduleLocationsDialog.ezInstance.ezIds.inputs.cityInputId}_Label" class="ezLocationEditorInputLabel">
                                    City
                                </label>
                                <input id="${EzScheduleLocationsDialog.ezInstance.ezIds.inputs.cityInputId}" type="text"
                                    class="ezText ezFullWidthEditor" placeholder="(optional)" name="addresslevel2"
                                    autocomplete="address-level2"/>
                            </div>
                            <div id="${EzScheduleLocationsDialog.ezInstance.ezIds.containers.stateContainerId}" class="ezInputBox">
                                <label for="${EzScheduleLocationsDialog.ezInstance.ezIds.inputs.stateInputId}"
                                    id="${EzScheduleLocationsDialog.ezInstance.ezIds.inputs.stateInputId}_Label" class="ezLocationEditorInputLabel">
                                    State
                                </label>
                                <input id="${EzScheduleLocationsDialog.ezInstance.ezIds.inputs.stateInputId}" type="text"
                                    class="ezText ezFullWidthEditor" placeholder="(optional)" name="addresslevel1"
                                    autocomplete="address-level1"/>
                            </div>
                            <div id="${EzScheduleLocationsDialog.ezInstance.ezIds.containers.zipCodeContainerId}" class="ezInputBox">
                                <label id="${EzScheduleLocationsDialog.ezInstance.ezIds.inputs.postalCodeInputId}_Label"
                                    for="${EzScheduleLocationsDialog.ezInstance.ezIds.inputs.postalCodeInputId}" class="ezLocationEditorInputLabel">
                                    Zip/Postal
                                </label>
                                <input id="${EzScheduleLocationsDialog.ezInstance.ezIds.inputs.postalCodeInputId}" type="text"
                                    class="ezText ezFullWidthEditor" placeholder="(optional)" name="postalcode"
                                    autocomplete="postal-code"/>
                            </div>
                        </div>

                        <!-- Main Phone, Mobile Phone, and Alt Phone Number Inputs -->
                        <div id="${EzScheduleLocationsDialog.ezInstance.ezIds.containers.mainMobileAltPhoneContainerId}" class="ezAutoCol_AxAxA">
                            <div id="${EzScheduleLocationsDialog.ezInstance.ezIds.containers.mainPhoneContainerId}" class="ezInputBox">
                                <label id="${EzScheduleLocationsDialog.ezInstance.ezIds.inputs.mainPhoneInputId}_Label"
                                    for="${EzScheduleLocationsDialog.ezInstance.ezIds.inputs.mainPhoneInputId}" class="ezLocationEditorInputLabel">
                                    Main Phone #
                                </label>
                                <input id="${EzScheduleLocationsDialog.ezInstance.ezIds.inputs.mainPhoneInputId}" type="text"
                                    class="ezText ezFullWidthEditor" placeholder="(optional)" name="mainphone"
                                    autocomplete="tel"/>
                            </div>
                            <div id="${EzScheduleLocationsDialog.ezInstance.ezIds.containers.mobilePhoneContainerId}" class="ezInputBox">
                                <label id="${EzScheduleLocationsDialog.ezInstance.ezIds.inputs.mobilePhoneInputId}_Label"
                                    for="${EzScheduleLocationsDialog.ezInstance.ezIds.inputs.mobilePhoneInputId}" class="ezLocationEditorInputLabel">
                                    Mobile Phone #
                                </label>
                                <input id="${EzScheduleLocationsDialog.ezInstance.ezIds.inputs.mobilePhoneInputId}" type="text"
                                    class="ezText ezFullWidthEditor" placeholder="(optional)" name="mobilephone"
                                    autocomplete="tel"/>
                            </div>
                            <div id="${EzScheduleLocationsDialog.ezInstance.ezIds.containers.otherPhoneContainerId}" class="ezInputBox">
                                <label id="${EzScheduleLocationsDialog.ezInstance.ezIds.inputs.otherPhoneInputId}_Label"
                                    for="${EzScheduleLocationsDialog.ezInstance.ezIds.inputs.otherPhoneInputId}" class="ezLocationEditorInputLabel">
                                    Other Phone #
                                </label>
                                <input id="${EzScheduleLocationsDialog.ezInstance.ezIds.inputs.otherPhoneInputId}" type="text"
                                    class="ezText ezFullWidthEditor" placeholder="(optional)" name="otherphone"
                                    autocomplete="tel"/>
                            </div>
                        </div>
                    </td>
                </tr>

                <!-- Location Editor Location Assigned Employees Row -->
                <tr id="${EzScheduleLocationsDialog.ezInstance.ezIds.tables.assignEmployeeRowId}"
                    class="ezLocationEditorInputRow" colspan="2">
                    <td id="${EzScheduleLocationsDialog.ezInstance.ezIds.tables.assignEmployeeCellId}"
                        class="ezLocationEditorInputCell" colspan="2">

                        <!-- Assign Employees Editor -->
                        <div id="${EzScheduleLocationsDialog.ezInstance.ezIds.containers.assignEmployeeContainerId}" class="ezAutoRow">
                            <div id="${EzScheduleLocationsDialog.ezInstance.ezIds.containers.assignEmployeeHeaderContainerId}"
                                class="ezLocationEditorAssignEmployeesHeader ezAutoCol_50xA">
                                <span>Assigned Employees</span>
                            <div id="${EzScheduleLocationsDialog.ezInstance.ezIds.containers.assignEmployeeHeaderButtonContainerId}"
                                class="ezAutoCol_50xA">
                                <button id="${EzScheduleLocationsDialog.ezInstance.ezIds.buttons.assignEmployeeButtonId}"
                                    class="ezSilverEditButton">
                                    Assign
                                </button>
                                <button id="${EzScheduleLocationsDialog.ezInstance.ezIds.buttons.removeAssignedEmployeeButtonId}"
                                    class="ezButtons-delete-button" disabled>
                                    Remove
                                </button>
                            </div>
                        </div>
                        <div id="${EzScheduleLocationsDialog.ezInstance.ezIds.containers.assignedEmployeesContainerId}" class="ezAssignedEmployeesList">
                            <!-- Dynamic Content -->
                        </div>
                    </td>
                </tr>
            </table>`;
    }

    ezBuildAssignEmployeeToLocationDialogHtml() {
        return ezApi.ezTemplate`
            <div id="${EzScheduleLocationsDialog.ezInstance.ezIds.assignEmployeeToLocationDialog}" title="Assign an Employee to this Location">
                <div>Which employee would you like to add to this location?</div>
                <select id="${EzScheduleLocationsDialog.ezInstance.ezIds.inputs.assignEmployeeToLocationDialog_AvailableEmployeesSelectInputId}"
                    class="ezFullWidthEditor">
                </select>
                <div>Is this their primary location?</div>
                <select id="${EzScheduleLocationsDialog.ezInstance.ezIds.inputs.assignEmployeeToLocationDialog_PrimaryLocationSelectInputId}"
                    style="width:100px;">
                    <option value="true">Yes</option>
                    <option value="false">No</option>
                </select>
            </div>`;
    }

    ezBuildRemoveEmployeeFromLocationDialogHtml() {
        return ezApi.ezTemplate`
            <div
                id="${EzScheduleLocationsDialog.ezInstance.ezIds.removeLocationEmployeeAssignmentDialogId}"
                title="Remove an Employee from this Location">
                Which employee would you like to remove?
                <select
                    id="${EzScheduleLocationsDialog.ezInstance.ezIds.inputs.removeLocationEmployeeSelectId}">
                </select>
            </div>`;
    }
}

export {
    EzScheduleLocationsDialog
};
