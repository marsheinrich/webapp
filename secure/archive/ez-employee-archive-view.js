import {
    EzException,
    EzBadParamException
} from '/ezlibrary/exceptions/EzExceptions.js';

import {
    EzObject,
    EzBoolean,
    EzNumber,
    EzString,
    EzHtml,
    EzPromise,
    EzJson
} from '/ezlibrary/helpers/EzHelpers.js';

import {
    EzRegistrationState,
    EzElementEventName,
    EzClockerContextEventName,
    EzAccountNavButtonActiveOption
} from '/ezlibrary/enums/EzEnumerations.js';

import { EzClass } from '/ezlibrary/EzClass.js';
import { EzEventEngine } from '/ezlibrary/ez-event-engine.js';

import { EzClockerContext } from '/ezlibrary/EzClockerContext/ez-context.js';

import { EzTickerTimer } from '/public/javascript/common/ez-ticker-timer.js';

import { EzUI } from '/public/javascript/common/ezui.js';

import { EzEmployerService } from '/secure/javascript/common/ezclocker-employer-services.js';

import { EzEmployeeArchiveHelper } from '/secure/archive/ez-employee-archive-helper.js';

import { EzHelp } from '/secure/widgets/EzHelp/EzHelp.js';

import { EzAccountNavButton } from '/secure/widgets/EzAccountNavButton/EzAccountNavButton.js';

/**
 * @class
 * @extends {EzClass}
 * @description
 * View support for the employee archive
 * ---------------------------------------------------------------------------
 * Import with:
 *     import { EzEmployeeArchiveView } from '/secure/archive/ez-employee-archive-view.js';
 * ---------------------------------------------------------------------------
 * Singleton instance ready for use when the below evaluates to true:
 *     globalThis.ezApi.ezclocker[EzEmployeeArchiveView.ezApiName] &&
 *     globalThis.ezApi.ezclocker[EzEmployeeArchiveView.ezApiName] .ready
 * ---------------------------------------------------------------------------
 * Listen to onReady event:
 *     document.addEventListener(
 *         EzEmployeeArchiveView.ezEventNames.onReady,
 *         this.#ezRegistrator);
 * ---------------------------------------------------------------------------
 * Singleton Instance Reference:
 *     ezApi.ezclocker.ezEmployeeArchiveView
 * ---------------------------------------------------------------------------
 */
export class EzEmployeeArchiveView extends EzClass {
    /**
     * @public @readonly @propert @getter
     * Returns on object with the most common html element Ids used in in the archive view.
     * @returns {object}
     */
    get ezIds() {
        return {
            containers: {
                archiveListsContainerId: 'EzClockerArchivePage_ContentArchiveLists'
            }
        };
    }

    /**
     * @private @field
     * Stores the known activily archiving employees.
     * @type {object}
     */
    #ezArchivingEmployeeIds = {};
    /**
     * @public @property @getter
     * Gets the known activily archiving employees.
     * @returns {object}
     */
    get ezArchivingEmployeeIds() {
        return this.#ezArchivingEmployeeIds;
    }
    /**
     * @public @property @setter
     * Sets the known activily archiving employees.
     * @param {object} ezArchivingEmployeeIds
     */
    set ezArchivingEmployeeIds(ezArchivingEmployeeIds) {
        this.#ezArchivingEmployeeIds = EzObject.assignOrDefault(
            ezArchivingEmployeeIds,
            {});
    }

    /**
     * @private @field
     * Stores the known activily unarchving employees.
     * @type {object}
     */
    #ezUnarchivingEmployeeIds = {};
    /**
     * @public @property @getter
     * Gets the known activily unarchving employees.
     * @returns {object}
     */
    get ezUnarchivingEmployeeIds() {
        return this.#ezUnarchivingEmployeeIds;
    }
    /**
     * @public @property @setter
     * Sets the known activily unarchving employees.
     * @param {object} ezUnarchivingEmployeeIds
     */
    set ezUnarchivingEmployeeIds(ezUnarchivingEmployeeIds) {
        this.#ezUnarchivingEmployeeIds = EzObject.assignOrDefault(
            ezUnarchivingEmployeeIds,
            {});
    }

    /**
     * @private @field
     * Stores if an archive is in progress
     * @type {boolean}
     */
    #ezArchiveInProgress = false;
    /**
     * @public @property @getter
     * Gets if an archive is in progress
     * @returns {boolean}
     */
    get ezArchiveInProgress() {
        return this.#ezArchiveInProgress;
    }
    /**
     * @public @property @setter
     * Sets if an archive is in progress
     * @param {object} ezArchiveInProgress
     */
    set ezArchiveInProgress(ezArchiveInProgress) {
        this.#ezArchiveInProgress = EzBoolean.isTrue(ezArchiveInProgress);
    }

    /**
     * @private @field
     * Stores if an unarchive is in progress
     * @type {boolean}
     */
    #ezUnarchiveInProgress = false;
    /**
     * @public @property @getter
     * Gets if an unarchive is in progress
     * @returns {boolean}
     */
    get ezUnarchiveInProgress() {
        return this.#ezUnarchiveInProgress;
    }
    /**
     * @public @property @setter
     * Sets if an unarchive is in progress
     * @param {object} ezUnarchiveInProgress
     */
    set ezUnarchiveInProgress(ezUnarchiveInProgress) {
        this.#ezUnarchiveInProgress = EzBoolean.isTrue(ezUnarchiveInProgress);
    }

    /**
     * @public @property @getter
     * Gets if an archive or unarchive is in progress
     * @returns {boolean}
     */
    get ezArchiveUnarchiveInProgress() {
        return this.ezArchiveInProgress || this.ezUnarchiveInProgress;
    }

    /**
     * @protected @readonly @property
     * Gets the Archive page's header html.
     * @returns {string}
     */
    get ezBuildArchivePageHeaderHtml() {
        return EzHtml.build`
            <div
                id="EzEmployeeSchedulePageViewHeader"
                class="ezHeader">
                <div
                    id="EzPageViewHeader_EmployerLogoContainer"
                    class="ezHeader-employer-logo-container">
                    <div
                        id="EmployerLogoImgContainer"
                        class="ezHeader-logo-image-container">
                        <img
                            id="EzEmployerLogoImg"
                            class="ezHeader-employer-logo"
                            alt="employer"
                            src="/public/images/spinners/orange-spinner.gif" />
                    </div>
                    <div
                        id="_EmployerNameCell"
                        class="ezHeader-employer-name">
                    </div>
                </div>
                <div
                    id="EzPageViewHeader_NavigationButtons"
                    class="ezHeader-navigation-button-container">
                    <!-- TODO: Fix team chat defects, then re-enable
                    <span
                        id="EzTeamChatButtonFeatureToggle"
                        data-feature-id="ezfTeamChat"
                        style="display:none">
                        <button
                            id="EzNavigationTeamChatButton"
                            class="ezHeaderButton"
                            style="display:none",
                            disabled>
                                Team Chat
                        </button>
                    </span>
                    -->
                    <button
                        id="_NavDashboard"
                        class="headerButton" disabled>
                        Dashboard
                    </button>
                    <button
                        id="_NavSchedules"
                        class="headerButton" disabled>
                        Schedules
                    </button>
                    <button
                        id="_NavEmployeeArchive"
                        class="headerButton"
                        disabled>
                        Employee Archive
                    </button>
                    <button
                        id="EzShowHelpButton"
                        class="ezHeaderButton"
                        style="display:none">
                        Help
                    </button>
                    <button
                        id="_NaviSignout"
                        class="headerButton"  disabled>
                        Sign Out
                    </button>
                </div>
            </div>`;
    }

    /**
     * @public @method
     * Initializes EzArchiveEmployeeView
     * @returns {EzEmployeeArchiveView}
     */
    ezInit() {
        ezApi.ezclocker.ezEventEngine.ezWantEvent(
            EzClockerContextEventName.onSelectedEmployerAccountReady,
            EzEmployeeArchiveView.ezApiName,
            EzEmployeeArchiveView.ezInstance.ezHandleOnSelectedEmployerLicenseUpdated);

        ezApi.ezclocker.ezEventEngine.ezWantEvent(
            EzClockerContextEventName.onUserContextReady,
            EzEmployeeArchiveView.ezApiName,
            EzEmployeeArchiveView.ezInstance.ezInitUx);

        return EzEmployeeArchiveView.ezInstance;
    }

    /**
     * @public @method
     * Initializes the view's UX
     */
    ezInitUx() {
        ezApi.ezclocker.ezUi.ezContent(
            'EzClockerArchivePage_Header',
            EzEmployeeArchiveView.ezInstance.ezBuildArchivePageHeaderHtml);

        ezApi.ezclocker.ezHelp.ezEnableHelp('EzShowHelpButton')
            .then(
                () => {
                    ezApi.ezclocker.ezAccountNavButton.ezActiveOptionValue = EzAccountNavButtonActiveOption.ACCOUNT_OPTION;

                    ezApi.ezclocker.ezAccountNavButton.ezInitUX();
                },
                EzPromise.ignoreReject);
    }

    /**
     * @public @method
     * Loads the company logo into the UX
     */
    ezLoadCompanyLogoURL() {
        return ezApi.ezclocker.ezEmployerService.ezLoadEmployerImage(
            ezApi.ezclocker.ezClockerContext.ezGetSelectedEmployerAccount().id)
            .then(
                (imageUrl) => ezApi.ezclocker.ezUi.setImgElementSrc(
                    'EzEmployerLogoImg',
                    imageUrl));
    }

    /**
     * @public @method
     * Disables all the unarchive buttons
     */
    ezDisableEmployeeUnarchiveFunctionality() {
        let unarchiveButtons = ezApi.ezclocker.ezUi.ezId$('button[id*=_UnarchiveButton]');

        let unarchiveButtonImgs = ezApi.ezclocker.ezUi.ezId$('img[id*=_UnarchiveImage]');

        if (EzObject.isValid(unarchiveButtons)) {
            for (let button of unarchiveButtons) {
                if (EzString.hasLength(button.id)) {
                    ezApi.ezclocker.ezUi.ezDisableElement(button.id);
                }
            }
        }

        if (EzObject.isValid(unarchiveButtonImgs)) {
            for (let unarchiveButtonImg of unarchiveButtonImgs) {
                if (EzString.hasLength(unarchiveButtonImg.id)) {
                    ezApi.ezclocker.ezUi.ezAddElementClass(
                        unarchiveButtonImg.id,
                        'ezButtonImage-disable_16x16');
                }
            }
        }
    }

    /**
     * @public @method
     * Enables all the unarchive buttons
     */
    ezEnableEmployeeUnarchiveFunctionality() {
        let unarchiveButtons = ezApi.ezclocker.ezUi.ezId$('button[id*=_UnarchiveButton]');

        let unarchiveButtonImgs = ezApi.ezclocker.ezUi.ezId$('img[id*=_UnarchiveImage]');

        if (EzObject.isValid(unarchiveButtons)) {
            for (let button of unarchiveButtons) {
                if (EzString.hasLength(button.id)) {
                    ezApi.ezclocker.ezUi.ezEnableElement(button.id);
                }
            }
        }

        if (EzObject.isValid(unarchiveButtonImgs)) {
            for (let unarchiveButtonImg of unarchiveButtonImgs) {
                if (EzString.hasLength(unarchiveButtonImg.id)) {
                    ezApi.ezclocker.ezUi.ezRemoveElementClass(unarchiveButtonImg.id, 'ezButtonImage-disable_16x16');
                }
            }
        }
    }

    /**
     * @public @method
     * Disables all the unarchive buttons
     */
    ezDisableEmployeeArchiveFunctionality() {
        let archiveButtons = ezApi.ezclocker.ezUi.ezId$('button[id*=_ArchiveButton]');

        let archiveButtonImgs = ezApi.ezclocker.ezUi.ezId$('img[id*=_ArchiveImage]');

        if (EzObject.isValid(archiveButtons)) {
            for (let button of archiveButtons) {
                if (EzString.hasLength(button.id)) {
                    ezApi.ezclocker.ezUi.ezDisableElement(button.id);
                }
            }
        }

        if (EzObject.isValid(archiveButtonImgs)) {
            for (let archiveButtonImg of archiveButtonImgs) {
                if (EzString.hasLength(archiveButtonImg.id)) {
                    ezApi.ezclocker.ezUi.ezAddElementClass(archiveButtonImg.id, 'ezButtonImage-disable_16x16');
                }
            }
        }
    }

    /**
     * @public @method
     * Enables all the unarchive buttons
     */
    ezEnableEmployeeArchiveFunctionality() {
        let archiveButtons = ezApi.ezclocker.ezUi.ezId$('button[id*=EzArchiveEmployeeBtn_]');

        let archiveButtonImgs = ezApi.ezclocker.ezUi.ezId$('img[id*=_ArchiveImage]');

        if (EzObject.isValid(archiveButtons)) {
            for (let button of archiveButtons) {
                if (EzString.hasLength(button.id)) {
                    ezApi.ezclocker.ezUi.ezEnableElement(button.id);
                }
            }
        }

        if (EzObject.isValid(archiveButtonImgs)) {
            for (let archiveButtonImg of archiveButtonImgs) {
                if (EzString.hasLength(archiveButtonImg.id)) {
                    ezApi.ezclocker.ezUi.ezRemoveElementClass(archiveButtonImg.id, 'ezButtonImage-disable_16x16');
                }
            }
        }
    }

    /**
     * @public @method
     * Handles the OnActiveEmployerLicenseChanged event
     * @param {object} eventData
     */
    ezHandleOnSelectedEmployerLicenseUpdated(eventData) {
        if (!EzObject.isValid(eventData)) {
            throw new EzBadParamException(
                'eventData',
                EzEmployeeArchiveView.ezInstance,
                EzEmployeeArchiveView.ezInstance.ezHandleOnSelectedEmployerLicenseUpdated);
        }

        EzEmployeeArchiveView.ezInstance.ezLoadCompanyLogoURL();

        if (ezApi.ezclocker.ezUi.ezElementExists('EzAvailableEmployeeSlots')) {
            ezApi.ezclocker.ezUi.ezContent(
                'EzAvailableEmployeeSlots',
                `Available Employee License Slots: ${EzNumber.numberOrDefault(eventData.data.availableEmployeeSlots, 0).toString()}`);

            // Disable unarchive functionality if no available employee slots
            if (0 >= eventData.data.availableEmployeeSlots.availableEmployeeSlots) {
                EzEmployeeArchiveView.ezInstance.ezDisableEmployeeUnarchiveFunctionality();
            } else {
                EzEmployeeArchiveView.ezInstance.ezEnableEmployeeUnarchiveFunctionality();
            }
        }
    }

    /**
     * @public @method
        Determines if an archived employee id is currently unarchiving.
     * @param {number} oldEmployeeId
     * @returns {boolean}
     */
    ezIsArchivedEmployeeRestoring(oldEmployeeId) {
        let ezArchivedEmployeeStatusId = EzEmployeeArchiveView.ezInstance.ezBuildArchivedEmployeeStatusId(oldEmployeeId);

        return EzObject.hasProperty(EzEmployeeArchiveView.ezInstance.ezUnarchivingEmployeeIds, ezArchivedEmployeeStatusId) &&
            EzBoolean.isTrue(EzEmployeeArchiveView.ezInstance.ezUnarchivingEmployeeIds[ezArchivedEmployeeStatusId]);
    }

    /**
     * @public @method
        Determines if a active employee id is currently archiving.
     * @param {number} employeeId
     * @returns {boolean}
     */
    ezIsActiveEmployeeArchiving(activeEmployeeId) {
        let ezEmployeeStatusId = EzEmployeeArchiveView.ezInstance.ezBuildActiveEmployeeStatusId(activeEmployeeId);

        return EzObject.hasProperty(EzEmployeeArchiveView.ezInstance.ezArchivingEmployeeIds, ezEmployeeStatusId) &&
            EzBoolean.isTrue(EzEmployeeArchiveView.ezInstance.ezArchivingEmployeeIds[ezEmployeeStatusId]);
    }

    /**
     * @public @method
     * Unarchives the employee associated with the provided archivedEmployeeId
     * @param {number} archivedEmployee
     * @returns {Promise.resolve}
     */
    ezUnarchiveEmployee(archivedEmployee) {
        if (!EzObject.isValid(archivedEmployee)) {
            throw new EzBadParamException(
                'archivedEmployee',
                EzEmployeeArchiveView.ezInstance,
                EzEmployeeArchiveView.ezInstance.ezUnarchiveEmployee);
        }

        if (EzEmployeeArchiveView.ezInstance.ezIsArchivedEmployeeRestoring(archivedEmployee.oldEmployeeId)) {
            let eName = EzString.hasLength(archivedEmployee.employeeName)
                ? `EzClocker is currently restoring archived employee ${archivedEmployee.employeeName}.`
                : 'EzClocker is currently restoring the archived employee.';

            return ezApi.ezclocker.ezDialog.ezShowOk(
                'Unarchived Employee',
                EzString.msg`
                    <p>
                        ${eName}
                        Please note that the restore process can take a while to complete.
                    </p>`)
                .then(EzEmployeeArchiveView.ezInstance.ezRefreshArchivedEmployeeLists);
        }

        if (EzObject.isValid(archivedEmployee.oldEmployeeId)) {
            archivedEmployee.unarchiving = true;

            archivedEmployee.archiving = false;

            EzEmployeeArchiveView.ezInstance.ezUpdateArchiveButtonUX(archivedEmployee);

            EzEmployeeArchiveView.ezInstance.ezUpdateUnarchiveButtonUX(archivedEmployee);

            //EzEmployeeArchiveView.ezInstance.ezBuildCoolDataLists(EzEmployeeArchiveView.ezInstance.ezIds.containers.archiveListsContainerId);
        }

        EzEmployeeArchiveView.ezInstance.ezDisableArchiveUnarchiveFunctionality();

        EzEmployeeArchiveView.ezInstance.ezUnarchiveInProgress = true;

        return EzPromise.asyncAction(
            (finished) => ezApi.ezclocker.ezEmployeeArchiveHelper.ezActivateEmployee(archivedEmployee.id)
                .then(
                    (response) => {
                        if (EzObject.isValid(response.jqXHR) &&
                            (408 == response.jqXHR.status || 504 == response.jqXHR.status)) {
                            // In progress but timed out.
                            // TODO: Ping occasionally a status API
                            return EzEmployeeArchiveView.ezInstance.ezRefreshArchivedEmployeeLists()
                                .then(
                                    () => finished(response));
                        }

                        if (780409 == response.errorCode) {
                            // Active employee is currently archiving
                            return ezApi.ezclocker.ezDialog.ezShowErrorDialog(
                                'Restore Archived Employee Error',
                                response.message)
                                .then(
                                    () => EzEmployeeArchiveView.ezInstance.ezRefreshArchivedEmployeeLists()
                                        .then(
                                            () => finished(response)));
                        }

                        if (!EzObject.isValid(response.employee)) {
                            return EzEmployeeArchiveView.ezInstance.ezShowUnarchiveEmployeeError(response, archivedEmployeeName)
                                .then(
                                    () => EzEmployeeArchiveView.ezInstance.ezRefreshArchivedEmployeeLists()
                                        .then(
                                            () => finished(response)));
                        }

                        // TODO: Re-add unarchived employee to team chat
                        EzEmployeeArchiveView.ezInstance.ezUnarchiveInProgress = false;

                        return ezApi.ezclocker.ezClockerContext.ezRefreshSubscriptionContextActiveSubscription()
                            .then(
                                () => {
                                    ezApi.ezclocker.ezUi.ezFadeOut(`EzArchivedEmployee${archivedEmployee.id}`);

                                    ezApi.ezclocker.ezEventEngine.ezUnwantElementEvent(
                                        `EzArchivedEmployee${archivedEmployee.id}`,
                                        EzEmployeeArchiveView.ezApiName,
                                        EzElementEventName.CLICK);

                                    ezApi.ezclocker.ezUi.ezRemoveElement(`EzArchivedEmployee${archivedEmployee.id}`);

                                    return EzEmployeeArchiveView.ezInstance.ezRefreshArchivedEmployeeLists()
                                        .then(
                                            () => finished(response));
                                },
                                (eResponse) => ezApi.ezclocker.ezDialog.ezShowServiceResponseErrorDialog(
                                    'Update Account License Info Error',
                                    EzString.em`
                                        Unable to update your active employee information at this time.
                                        Refreshing this page might correct this issue.`,
                                    eResponse)
                                    .then(
                                        () => EzEmployeeArchiveView.ezInstance.ezRefreshArchivedEmployeeLists()
                                            .then(
                                                () => finished(response))));
                    })
                .catch(
                    (err) => {
                        throw err;
                    }));
    }

    /**
     * @public @method
     * Starts the ticker that refreshes the archive view every 2 minutes
     */
    ezStartRefreshStatusTicker() {
        if (!EzObject.isValid(EzEmployeeArchiveView.ezInstance.ezStatusRefreshTickerId)) {
            EzEmployeeArchiveView.ezInstance.ezStatusRefreshTickerId = ezApi.ezclocker.ezTickerTimer.ezStartIntervalTicker(
                ezApi.ezclocker.ezClockerContext.ezHandleUpdateArchiveUnarchvieStatus,
                1000 * 60 * 2, // five minutes in milliseconds
                EzEmployeeArchiveView.ezApiName);
        }
    }

    /**
     * @public @method
     * Stops the ticker that refreshes the archive view every 2 minutes
     */
    ezStopRefreshStatusTicker() {
        if (EzObject.isValid(EzEmployeeArchiveView.ezInstance.ezStatusRefreshTickerId)) {
            ezApi.ezclocker.ezTickerTimer.ezStopIntervalTicker(EzEmployeeArchiveView.ezInstance.ezStatusRefreshTickerId);

            EzEmployeeArchiveView.ezInstance.ezStatusRefreshTickerId = null;
        }
    }

    /**
     * @public @method
     * Handles the status refresh event from the ticker
     */
    ezHandleUpdateArchiveUnarchvieStatus() {
        EzEmployeeArchiveView.ezInstance.ezStopRefreshStatusTicker();

        // TODO: Finish and use the archive employee status service and update as needed
        EzEmployeeArchiveView.ezInstance.ezRefreshArchivedEmployeeLists
            .then(
                () => {
                    if (EzEmployeeArchiveView.ezInstance.ezArchiveUnarchiveInProgress) {
                        EzEmployeeArchiveView.ezInstance.ezStartRefreshStatusTicker();
                    }
                });
    }

    /**
     * @public @method
     */
    ezSizeScrollSectionToFitWindow() {
        let maxHeight = window.innerHeight -
            ezApi.ezclocker.ezUi.ezGetElementHeight('EzClockerArchivePage_Header') -
            ezApi.ezclocker.ezUi.ezGetElementHeight('EzClockerArchivePage_ContentHeader') -
            ezApi.ezclocker.ezUi.ezGetElementHeight('EzEmployeeArchive_EmployeeListHeaders_SectionB') -
            20;

        ezApi.ezclocker.ezUi.ezSetElementCss(
            'EzEmployeeArchive_EmployeeLists_ScrollSection',
            'max-height',
            `${maxHeight.toString()}px`);

        let activeEmployeeHeaderWidth = ezApi.ezclocker.ezUi.ezGetElementOuterWidth('EzActiveEmployee_ListContainer') + 4;

        //let archivedEmployeeHeaderWidth = ezApi.ezclocker.ezUi.ezGetElementOuterWidth('EzArchivedEmployee_ListContainer') + 4;

        ezApi.ezclocker.ezUi.ezSetElementCss(
            'EzEmployeeArchive_EmployeeListHeaders_SectionB',
            'grid-template-columns',
            `${activeEmployeeHeaderWidth}px auto`);

        ezApi.ezclocker.ezUi.ezSetElementCss(
            'EzEmployeeArchive_EmployeeListHeaders_SectionB',
            'grid-column-gap',
            `5px`);
    }

    /**
     * @public @method
     * Disables all archive and unarchive functionality
     */
    ezDisableArchiveUnarchiveFunctionality() {
        EzEmployeeArchiveView.ezInstance.ezDisableEmployeeUnarchiveFunctionality();

        EzEmployeeArchiveView.ezInstance.ezDisableEmployeeArchiveFunctionality();
    }

    /**
     * @public @method
     * Enables all archive and unarchive functionality
     */
    ezEnableArchiveUnarchiveFunctionality() {
        EzEmployeeArchiveView.ezInstance.ezEnableEmployeeUnarchiveFunctionality();

        EzEmployeeArchiveView.ezInstance.ezEnableEmployeeArchiveFunctionality();
    }

    /**
     * @public @method
     * Performs the action of archiving an employee
     * @param {object} activeEmployee
     * @returns {Promise.resolve}
     */
    ezArchiveEmployee(activeEmployee) {
        if (!EzObject.isValid(activeEmployee)) {
            throw new EzBadParamException(
                'activeEmployee',
                EzEmployeeArchiveView.ezInstance,
                EzEmployeeArchiveView.ezInstance.ezArchiveEmployee);
        }

        if (EzEmployeeArchiveView.ezInstance.ezIsActiveEmployeeArchiving(activeEmployee.id)) {
            let archiveInProgressMessage = EzString.hasLength(activeEmployee.employeeName)
                ? `EzClocker is currently archiving employee ${activeEmployee.employeeName}.`
                : 'EzClocker is currently archiving a employee.';

            return ezApi.ezclocker.ezDialog.ezShowOk(
                'Archived Employee',
                EzHtml.build`
                    <p>
                        ${archiveInProgressMessage}
                        Please note that the employee archive process can take a while to complete.
                    </p>`);
        }

        if (EzObject.isValid(activeEmployee)) {
            activeEmployee.archiving = true;

            activeEmployee.unarchiving = false;

            EzEmployeeArchiveView.ezInstance.ezUpdateArchiveButtonUX(activeEmployee);

            EzEmployeeArchiveView.ezInstance.ezUpdateUnarchiveButtonUX(activeEmployee);

            // EzEmployeeArchiveView.ezInstance.ezBuildCoolDataLists(EzEmployeeArchiveView.ezInstance.ezIds.containers.archiveListsContainerId);

            // TODO: Fix teamchat defects then re-enable
            //ezApi.ezclocker.ezLogger.debug("going to delete employee from aws.....");
            //EzTeamChatDialog.ezInstance.ezHandleDeleteEmployee(employeeId);
            //ezApi.ezclocker.ezLogger.debug("employee deleted from aws");
        }

        EzEmployeeArchiveView.ezInstance.ezDisableArchiveUnarchiveFunctionality();

        EzEmployeeArchiveView.ezInstance.ezArchiveInProgress = true;

        return EzPromise.asyncAction(
            (finished) => ezApi.ezclocker.ezEmployeeArchiveHelper.ezArchiveEmployee(activeEmployee.id)
                .then(
                    (response, jqXHR) => {
                        if (EzObject.isValid(jqXHR) &&
                            (408 == EzNumber.numberOrDefault(jqXHR.status, 200) || 504 == EzNumber.numberOrDefault(jqXHR.status, 200))) {
                            // In progress but timed out.

                            // Refresh in 2 minutes
                            EzEmployeeArchiveView.ezInstance.ezStartRefreshStatusTicker();

                            return finished(response);
                        }

                        EzEmployeeArchiveView.ezInstance.ezArchiveInProgress = false;

                        if (6901 == EzNumber.numberOrDefault(response.errorCode, 0)) {
                            // User has a free subscription and has reached the maximum updates per day
                            return ezApi.ezclocker.ezDialog.ezShowOK(
                                'Archive Employee Limit Reached',
                                response.message)
                                .then(
                                    () => EzEmployeeArchiveView.ezInstance.ezRefreshArchivedEmployeeLists()
                                        .then(
                                            () => finished(response)));
                        }

                        if (770409 == EzNumber.numberOrDefault(response.errorCode, 0)) {
                            // Employee is currently restoring from the employee archive
                            return ezApi.ezclocker.ezDialog.ezShowErrorDialog(
                                'Employee Archive Error',
                                response.message)
                                .then(
                                    () => EzEmployeeArchiveView.ezInstance.ezRefreshArchivedEmployeeLists()
                                        .then(
                                            () => finished(response)));
                        }

                        if (!EzObject.isValid(response.archivedEmployee)) {
                            return EzEmployeeArchiveView.ezInstance.ezShowArchiveEmployeeError(response, activeEmployee.employeeName)
                                .then(
                                    () => EzEmployeeArchiveView.ezInstance.ezRefreshArchivedEmployeeLists()
                                        .then(
                                            () => finished(response)));
                        }

                        return ezApi.ezclocker.ezClockerContext.ezRefreshSubscriptionContextActiveSubscription()
                            .then(
                                () => {
                                    return EzEmployeeArchiveView.ezInstance.ezRefreshArchivedEmployeeLists()
                                        .then(
                                            () => finished(response));
                                },
                                (eResponse) => ezApi.ezclocker.ezDialog.ezShowServiceResponseErrorDialog(
                                    'Update Account License Info Error',
                                    EzString.em`
                                        Unable to update your active employee information at this time.
                                        Refreshing this page might correct this issue.`,
                                    eResponse)
                                    .then(
                                        () => EzEmployeeArchiveView.ezInstance.ezRefreshArchivedEmployeeLists()
                                            .then(
                                                () => finished(response))));
                    })
                .catch(
                    (err) => {
                        throw err;
                    }));
    }

    /**
     * @public @method
     * Handles archive employee error responses
     * @param {object} eResponse
     * @param {string} employeeName
     * @returns {Promise.resolve}
     */
    ezShowArchiveEmployeeError(eResponse, employeeName) {
        if (null == eResponse) {
            throw new EzBadParamException(
                'eResponse',
                EzEmployeeArchiveView.ezInstance,
                EzEmployeeArchiveView.ezInstance.ezShowArchiveEmployeeError);
        }

        let employeeNameDisplay = EzString.hasLength(employeeName)
            ? `employee ${employeeName} `
            : 'the employee ';

        let errorMessage = EzString.hasLength(eResponse.message)
            ? EzHtml.build`
                <span>
                    Error reported: ${eResponse.message}
                </span>`
            : EzString.EMPTY;

        if (EzObject.isValid(eResponse.errorCode)) {
            errorMessage = EzHtml.build`
                ${errorMessage}
                <span>
                    Error Code: ${eResponse.errorCode}
                </span>`;
        }

        if (EzString.hasLength(errorMessage)) {
            errorMessage = EzHtml.build`
                <p>
                    ${errorMessage}
                </p>`;
        }

        let archiveLogDisplay = EzString.hasLength(eResponse.archiveLog)
            ? EzHtml.build`
                <div
                    class="ez-faded-error-details">
                    <p>
                        Additional Details
                    </p>
                    <textarea
                        rows="4"
                        cols="60"
                        class="ez-faded-error-details ezFullWidthEditor">
                        ${eResponse.archiveLog}
                    </textarea>
                </div>`
            : EzString.EMPTY;

        return ezApi.ezclocker.ezDialog.ezShowErrorDialog(
            'Archive Employee Error',
            EzString.em`
                <p>
                    Unable to archive ${employeeNameDisplay} at this time.
                </p>
                ${errorMessage}
                ${archiveLogDisplay}`,
            eResponse,
            '50%',
            'auto');
    }

    /**
     * @public @method
     * Displays unarchive employee errors
     * @param {object} eResponse
     * @param {string} employeeName
     * @returns {Promise.resolve}
     */
    ezShowUnarchiveEmployeeError(eResponse, employeeName) {
        if (null == eResponse) {
            throw new EzBadParamException(
                'eResponse',
                EzEmployeeArchiveView.ezInstance,
                EzEmployeeArchiveView.ezInstance.ezShowArchiveEmployeeError);
        }

        let employeeNameDisplay = EzString.hasLength(employeeName)
            ? `archived employee ${employeeName} `
            : 'the archived employee ';

        let errorMessage = EzString.hasLength(eResponse.message)
            ? EzHtml.build`
                <span>
                    Error reported: ${eResponse.message}
                </span>`
            : EzString.EMPTY;

        if (EzObject.isValid(eResponse.errorCode)) {
            errorMessage = EzHtml.build`
                ${errorMessage}
                <span>
                    Error Code: ${eResponse.errorCode}
                </span>`;
        }

        if (EzString.hasLength(errorMessage)) {
            errorMessage = EzHtml.build`
                <p>
                    ${errorMessage}
                </p>`;
        }

        let archiveLogDisplay = EzString.hasLength(eResponse.archiveLog)
            ? EzHtml.build`
                <div
                    id="EzArchiveAdditionalDetails"
                    class="ez-faded-error-details">
                    <p>
                        Additional Details
                    </p>
                    <textarea
                        rows="4"
                        cols="60"
                        class="ez-faded-error-details ezFullWidthEditor">
                        ${eResponse.archiveLog}
                    </textarea>
                </div>`
            : EzString.EMPTY;

        return ezApi.ezclocker.ezDialog.ezShowErrorDialog(
            'Restore Archived Employee Error',
            EzString.em`
                <p>
                    Unable to restore ${employeeNameDisplay} at this time.
                </p>
                ${errorMessage}
                ${archiveLogDisplay}`,
            eResponse,
            '50%',
            'auto');
    }

    /**
     * @public @method
     * Renders the entire archive data page
     */
    ezRender() {
        ezApi.ezclocker.ezEmployerService.ezLoadEmployerImage(
            ezApi.ezclocker.ezClockerContext.ezGetActiveEmployee().employerId)
            .then(
                (imageUrl) => ezApi.ezclocker.ezUi.setImgElementSrc('_EmployerLogoImage', imageUrl));

        ezApi.ezclocker.ezUi.ezContent(
            '_EmployerNameCell',
            ezApi.ezclocker.ezClockerContext.ezGetSelectedEmployerAccount().employerName);

        EzEmployeeArchiveView.ezInstance.ezRenderArchiveHeader();

        EzEmployeeArchiveView.ezInstance.ezBuildCoolDataLists(EzEmployeeArchiveView.ezInstance.ezIds.containers.archiveListsContainerId);

        ezApi.ezclocker.ezEventEngine.ezWantElementEvent(
            'window',
            EzElementEventName.RESIZE,
            EzEmployeeArchiveView.ezApiName,
            EzEmployeeArchiveView.ezInstance.ezSizeScrollSectionToFitWindow);
    }

    /**
     * @public @method
     * Loads the archive page header
     */
    ezRenderArchiveHeader() {
        let availableSlots = ezApi.ezclocker.ezClockerContext.ezGetSelectedEmployerAccountLicense().availableEmployeeSlots;

        if (!EzNumber.isNumber(availableSlots)) {
            availableSlots = 0;
        }

        let unarchiveDisabledMessage = 0 >= availableSlots
            ? EzHtml.build`
                <div
                    id="EzUnarchiveDisabledMessage"
                    class="ezWhiteBox8 ezText-small-navy">
                    Activating archived employees is disabled because you currently have the maximum number
                    of active employees for your subscription.
                </div>`
            : '';

        ezApi.ezclocker.ezUi.ezContent(
            'EzClockerArchivePage_ContentHeader',
            EzHtml.build`
                <div
                    id="EzArchiveEmployeeInfoContainer"
                    class="ezContainer-white-border-pad8-bottom-margin10">
                    <h2
                        id="EzArchiveEmployeeTitle"
                        class="availableSlots">
                        Employee Archive
                    </h2>
                    <h3
                        id="EzAvailableEmployeeSlots">
                        Available Employee License Slots: ${availableSlots}
                    </h3>
                    <p>
                        The employee archive is where you store employees who are no longer active in your company but
                        you did not want to permanently delete their data. While your license limits the number of
                        employees you can have active at the same time you do not currently have a limit on how many
                        employees you can place in the archive.
                    </p>
                    <p>
                        <ul>
                            <li>
                                Archive active employees by clicking the Archive button next to their name.
                            </li>
                            <li>
                                Restore archived employees by clicking the Restore button next to their name.
                            </li>
                        </ul>
                    </p>
                    ${unarchiveDisabledMessage}
                </div>`);

        if (0 >= availableSlots) {
            EzEmployeeArchiveView.ezInstance.ezDisableEmployeeUnarchiveFunctionality();
        } else {
            EzEmployeeArchiveView.ezInstance.ezEnableEmployeeUnarchiveFunctionality();
        }
    }

    /**
     * @public @method
     * Updates the selected employer's employees and then re-builds the cool data lists.
     * @returns {Promise.resolve}
     */
    ezRefreshArchivedEmployeeLists() {
        return ezApi.ezclocker.ezUi.ezPageWaitAsync(
            'Refreshing active and archive employee data ...',
            (finished) => {
                EzEmployeeArchiveView.ezInstance.ezArchivedEmployeeIds = {};

                EzEmployeeArchiveView.ezInstance.ezUnarchivedEmployeeIds = {};

                return ezApi.ezclocker.ezClockerContext.ezRefreshSelectedEmployerEmployees()
                    .then(
                        () => ezApi.ezclocker.ezClockerContext.ezLoadSelectedEmployerAccountArchivedEmployees()
                            .then(
                                () => {
                                    EzEmployeeArchiveView.ezInstance.ezBuildCoolDataLists(
                                        EzEmployeeArchiveView.ezInstance.ezIds.containers.archiveListsContainerId);

                                    return finished();
                                }));
            });
    }

    /**
     * @public @method
     * Renders the archive/active employee lists
     * @param {String} containerId
     */
    ezBuildCoolDataLists(containerId) {
        if (!ezApi.ezclocker.ezUi.ezElementExists(containerId)) {
            throw new EzBadParamException(
                'containerId',
                EzEmployeeArchiveView.ezInstance,
                EzEmployeeArchiveView.ezInstance.ezBuildCoolDataLists);
        }

        let activeEmployeesHtml = '';

        let activeEmployeeCount = ezApi.ezclocker.ezClockerContext.ezGetSelectedEmployerAccountEmployeeAccounts().length;

        let archiveEmployeeCount = ezApi.ezclocker.ezClockerContext.ezGetSelectedEmployerAccountArchivedEmployees().length;

        ezApi.ezclocker.ezUi.ezContent(
            containerId,
            EzHtml.build`
                <div
                    id="EzEmployeeArchive_EmployeeListHeaders_SectionA"
                    class="ezContentSection">
                    <div
                        id="EzEmployeeArchive_EmployeeListHeaders_SectionB"
                        class="ezContent-grid-col-section-50x50">
                        <div
                            id="EzActiveEmployeeListTitle"
                            class="ezContainer-title-navy-8">
                            Active Employees (${activeEmployeeCount})
                        </div>
                        <div
                            id="EzActiveEmployeeListTitle"
                            class="ezContainer-title-navy-8">
                            Archived Employees (${archiveEmployeeCount})
                        </div>
                    </div>
                </div>
                <div
                    id="EzEmployeeArchive_EmployeeLists_ScrollSection"
                    class="ezContentSection-inset-border-2-radius-bottom-pad4-vscroll">
                    <div
                        id="EzEmployeeArchive_EmployeeListsContainer"
                        class="ezContent-grid-col-section-50x50">
                        <div
                            id="EzActiveEmployee_ListContainer"
                            class="activeEmployeeList">
                        </div>
                        <div
                            id="EzArchivedEmployee_ListContainer"
                            class="archivedEmployeeList">
                        </div>
                    </div>
                </div>`);

        for (let employee of ezApi.ezclocker.ezClockerContext.ezGetSelectedEmployerAccountEmployeeAccounts()) {
            if (EzObject.isValid(employee)) {
                EzEmployeeArchiveView.ezInstance.ezArchiveInProgress =
                    EzEmployeeArchiveView.ezInstance.ezArchiveInProgress || EzBoolean.isTrue(employee.archiving);

                EzEmployeeArchiveView.ezInstance.ezUnarchiveInProgress =
                    EzEmployeeArchiveView.ezInstance.ezUnarchiveInProgress || EzBoolean.isTrue(employee.unarchiving)

                EzEmployeeArchiveView.ezInstance.ezArchivingEmployeeIds[EzEmployeeArchiveView.ezInstance
                    .ezBuildActiveEmployeeStatusId(employee.id)] = EzBoolean.isTrue(employee.archiving);

                EzEmployeeArchiveView.ezInstance.ezUnarchivingEmployeeIds[EzEmployeeArchiveView.ezInstance
                    .ezBuildArchivedEmployeeStatusId(employee.id)] = EzBoolean.isTrue(employee.unarchiving);

                let idPrefix = `EzActiveEmployee${employee.id}`;

                ezApi.ezclocker.ezUi.ezAppendContent(
                    'EzActiveEmployee_ListContainer',
                    EzHtml.build`
                        ${activeEmployeesHtml}
                        ${EzEmployeeArchiveView.ezInstance.ezBuildCoolActiveItem(employee, idPrefix)}`);

                EzEmployeeArchiveView.ezInstance.ezUpdateArchiveButtonUX(employee, idPrefix);
            }
        }

        for (let archivedEmployee of ezApi.ezclocker.ezClockerContext.ezGetSelectedEmployerAccountArchivedEmployees()) {
            EzEmployeeArchiveView.ezInstance.ezArchiveInProgress =
                EzEmployeeArchiveView.ezInstance.ezArchiveInProgress || EzBoolean.isTrue(archivedEmployee.archiving);

            EzEmployeeArchiveView.ezInstance.ezUnarchiveInProgress =
                EzEmployeeArchiveView.ezInstance.ezUnarchiveInProgress || EzBoolean.isTrue(archivedEmployee.unarchiving)

            EzEmployeeArchiveView.ezInstance.ezUnarchivingEmployeeIds[EzEmployeeArchiveView.ezInstance
                .ezBuildArchivedEmployeeStatusId(archivedEmployee.oldEmployeeId)] = EzBoolean.isTrue(archivedEmployee.unarchiving);

            EzEmployeeArchiveView.ezInstance.ezArchivingEmployeeIds[EzEmployeeArchiveView.ezInstance
                .ezBuildActiveEmployeeStatusId(archivedEmployee.oldEmployeeId)] = EzBoolean.isTrue(archivedEmployee.archiving);

            if (EzObject.isValid(archivedEmployee)) {
                let idPrefix = `EzArchivedEmployee${archivedEmployee.id}`;

                ezApi.ezclocker.ezUi.ezAppendContent(
                    'EzArchivedEmployee_ListContainer',
                    EzHtml.build`
                        ${EzEmployeeArchiveView.ezInstance.ezBuildCoolArchiveItem(archivedEmployee, idPrefix)}`);

                EzEmployeeArchiveView.ezInstance.ezUpdateUnarchiveButtonUX(archivedEmployee);
            }
        }

        if (EzBoolean.isTrue(EzEmployeeArchiveView.ezInstance.ezArchiveUnarchiveInProgress)) {
            EzEmployeeArchiveView.ezInstance.ezDisableArchiveUnarchiveFunctionality();
        } else {
            EzEmployeeArchiveView.ezInstance.ezEnableArchiveUnarchiveFunctionality();
        }

        EzEmployeeArchiveView.ezInstance.ezSizeScrollSectionToFitWindow();
    }

    /**
     * @public @method
     * Checks if any archive or unarchive is in progress and disables all functionality until complete.
     */
    ezRefreshArchiveUnarchiveState() {
        for (let key in EzEmployeeArchiveView.ezInstance.ezArchivingEmployeeIds) {
            if (EzObject.hasProperty(EzEmployeeArchiveView.ezInstance.ezArchivingEmployeeIds, key) &&
                EzBoolean.isTrue(EzEmployeeArchiveView.ezInstance.ezArchivingEmployeeIds[key])) {
                EzEmployeeArchiveView.ezInstance.ezDisableArchiveUnarchiveFunctionality();

                return;
            }
        }

        for (let key in EzEmployeeArchiveView.ezInstance.ezUnarchivingEmployeeIds) {
            if (EzObject.hasProperty(EzEmployeeArchiveView.ezInstance.ezUnarchivingEmployeeIds, key) &&
                EzBoolean.isTrue(EzEmployeeArchiveView.ezInstance.ezUnarchivingEmployeeIds[key])) {
                EzEmployeeArchiveView.ezInstance.ezDisableArchiveUnarchiveFunctionality();

                return;
            }
        }

        EzEmployeeArchiveView.ezInstance.ezEnableArchiveUnarchiveFunctionality();
    }

    /**
     * @protected @mewthod
     * Renders an active employee item within a list
     * @param {object} employee
     * @param {string} idPrefix
     * Default: `EzActiveEmployee${employee.id}`
     */
    ezBuildCoolActiveItem(employee, idPrefix) {
        if (!EzObject.isValid(employee)) {
            throw new EzBadParamException(
                'employee',
                EzEmployeeArchiveView.ezInstance,
                EzEmployeeArchiveView.ezInstance.ezBuildCoolActiveItem);
        }
        if (!EzString.hasLength(idPrefix)) {
            idPrefix = `EzActiveEmployee${employee.id}`;
        }

        let disabledActiveEmployee = ezApi.ezIsFalse(ezApi.ezclocker.ezClockerContext.ezGetUserContext().isEmployer) &&
            ezApi.ezclocker.ezClockerContext.ezGetActiveAccount().id === employee.id
            ? 'ezRowItem-container-disabled_2Col'
            : EzString.EMPTY;

        return EzHtml.build`
            <div
                id="${idPrefix}"
                class="ezRowItem-container_2Col ${disabledActiveEmployee}">
                <div
                    id="${idPrefix}_EmployeeName"
                    class="ezRowItem-text_col-1of2">
                    ${EzString.encodeHtml(employee.employeeName)}
                </div>
                <div
                    id="${idPrefix}_ArchiveButton_Container"
                    class="ezRowItem-button-container_col-2of2">
                    ${EzEmployeeArchiveView.ezInstance.ezBuildArchiveButton(employee, idPrefix)}
                </div>
            </div>`;
    }

    /**
     * @public @method
     * Appends an active item to the list
     * @param {Object} employee
     * @param {string} idPrefix
     * Default: `EzActiveEmployee${employee.id}`;
     */
    ezBuildCoolActiveItemAndAppend(employee, idPrefix) {
        if (!EzObject.isValid(employee)) {
            throw new EzBadParamException(
                'employee',
                EzEmployeeArchiveView.ezInstance,
                EzEmployeeArchiveView.ezInstance.appendCoolActiveItem);
        }
        if (!EzString.hasLength(idPrefix)) {
            idPrefix = `EzActiveEmployee${employee.id}`;
        }

        ezApi.ezclocker.ezUi.ezAppendContent(
            'EzEmployeeArchive_ActiveEmployeeList',
            EzEmployeeArchiveView.ezInstance.ezBuildCoolActiveItem(employee, idPrefix));
    }

    /**
     * @public @method
     * Builds the Archive button html
     * @param {object} activeEmployee
     */
    ezBuildArchiveButton(activeEmployee) {
        if (!EzObject.isValid(activeEmployee)) {
            throw new EzBadParamException(
                'activeEmployee',
                EzEmployeeArchiveView.ezInstance,
                EzEmployeeArchiveView.ezInstance.ezBuildArchiveButton);
        }

        let idPrefix = `EzActiveEmployee${activeEmployee.id}`;

        return EzHtml.build`
            <div
                id="${idPrefix}_ArchivingStatus_LayoutContainer"
                class="ezContainer-archive-status"
                style="display:none">
                <div
                    id="${idPrefix}_ArchivingStatus_ImageContainer">
                    <img
                        id="${idPrefix}_ArchivingStatus_Image"
                        src="/public/images/spinners/gear-spinner-black.svg"
                        class="ezEditButtonImage_18x18"/>
                </div>
                <span
                    id="${idPrefix}_ArchivingStatus_TextContainer"
                    class="ezGrid-vertical-align-middle">
                    Archiving... (can take a while)
                </span>
            </div>
            <button
                id="${idPrefix}_ArchiveButton"
                class="ezEditButton"
                data-employee-id="${activeEmployee.id}"
                onclick="ezApi.ezclocker.ezEmployeeArchiveView.ezHandleArchiveEmployeeButtonClick(${activeEmployee.id})"
                disabled>
                <img
                    id="${idPrefix}_ArchiveImage"
                    src="/public/images/icons/archive-black.svg"
                    class="ezButtonImage_16x16"/>
                Archive
            </button>`;
    }

    /**
     * @public @method
     * Updates the archive button's ux
     * @param {object} activeEmployee
     * @param {number} idPrefix
     */
    ezUpdateArchiveButtonUX(activeEmployee) {
        if (!EzObject.isValid(activeEmployee)) {
            throw new EzBadParamException(
                'archivedEmployee',
                EzEmployeeArchiveView.ezInstance,
                EzEmployeeArchiveView.ezInstance.ezUpdateArchiveButtonUX);
        }

        let idPrefix = `EzActiveEmployee${activeEmployee.id}`;

        if (EzBoolean.isTrue(activeEmployee.archiving) || EzEmployeeArchiveView.ezInstance.ezIsActiveEmployeeArchiving(activeEmployee.id)) {
            ezApi.ezclocker.ezUi.ezHideElement(`${idPrefix}_ArchiveButton`);

            ezApi.ezclocker.ezUi.ezSetContent(
                `${idPrefix}_ArchivingStatus_TextContainer`,
                'Archiving... (can take a while)');

            ezApi.ezclocker.ezUi.ezShowElement(`${idPrefix}_ArchivingStatus_LayoutContainer`);
        } else if (EzBoolean.isTrue(activeEmployee.unarchiving) || EzEmployeeArchiveView.ezInstance.ezIsArchivedEmployeeRestoring(activeEmployee.id)) {
            ezApi.ezclocker.ezUi.ezHideElement(`${idPrefix}_ArchiveButton`);

            ezApi.ezclocker.ezUi.ezSetContent(
                `${idPrefix}_ArchivingStatus_TextContainer`,
                '(Restoring...)');

            ezApi.ezclocker.ezUi.ezShowElement(`${idPrefix}_ArchivingStatus_LayoutContainer`);
        } else {
            ezApi.ezclocker.ezUi.ezHideElement(`${idPrefix}_ArchivingStatus_LayoutContainer`);

            ezApi.ezclocker.ezUi.ezSetContent(
                `${idPrefix}_ArchivingStatus_TextContainer`,
                EzString.EMPTY);

            ezApi.ezclocker.ezUi.ezShowElement(`${idPrefix}_ArchiveButton`);
        }

        if (EzBoolean.isFalse(ezApi.ezclocker.ezClockerContext.ezGetUserContext().isEmployer) &&
            ezApi.ezclocker.ezClockerContext.ezGetActiveAccount().id === activeEmployee.id) {
            ezApi.ezclocker.ezUi.ezDisableElement(`${idPrefix}_ArchiveButton`);

            ezApi.ezclocker.ezUi.ezSetElementAttribute(
                `${idPrefix}_ArchiveButton`,
                'title',
                'Cannot archive the curently logged in account.');
        } else {
            ezApi.ezclocker.ezUi.ezEnableElement(`${idPrefix}_ArchiveButton`);

            ezApi.ezclocker.ezUi.ezSetElementAttribute(
                `${idPrefix}_ArchiveButton`,
                'title',
                EzString.EMPTY);
        }
    }

    /**
     * @public @method
     * Renders a archived employee item
     * @param {object} archivedEmployee
     */
    ezBuildCoolArchiveItem(archivedEmployee) {
        if (!EzObject.isValid(archivedEmployee)) {
            throw new EzBadParamException(
                'archivedEmployee',
                EzEmployeeArchiveView.ezInstance,
                EzEmployeeArchiveView.ezInstance.ezBuildCoolArchiveItem);
        }

        let idPrefix = `EzArchivedEmployee${archivedEmployee.id}`;

        return EzHtml.build`
            <div
                id="${idPrefix}"
                class="ezRowItem-container-archived_2Col">
                <div
                    id="${idPrefix}_LayoutContainer"
                    class="ezRowItem-text_col-1of2">
                    ${EzHtml.encodeHtml(archivedEmployee.employeeName)}
                </div>
                <div
                    id="${idPrefix}_ArchiveButton_Container"
                    class="ezRowItem-button-container_col-2of2">
                    ${EzEmployeeArchiveView.ezInstance.ezBuildUnarchiveButton(archivedEmployee)}
                </div>
            </div>`;
    }

    /**
     * @public @method
     * Appends an archived item to the list
     * @param {object} archivedEmployee
     * @param {string} idPrefix
     * Default: `EzArchivedEmployee${archivedEmployee.id}`
     */
    ezBuildCoolArchiveItemAndAppend(archivedEmployee, idPrefix) {
        if (!EzObject.isValid(archivedEmployee)) {
            throw new EzBadParamException(
                'archivedEmployee',
                EzEmployeeArchiveView.ezInstance,
                EzEmployeeArchiveView.ezInstance.appendCoolArchiveItem);
        }
        if (!EzString.hasLength(idPrefix)) {
            idPrefix = `EzArchivedEmployee${archivedEmployee.id}`;
        }

        ezApi.ezclocker.ezUi.ezAppendContent(
            'EzEmployeeArchive_ArchivedEmployeeList',
            EzEmployeeArchiveView.ezInstance.ezBuildCoolArchiveItem(archivedEmployee, idPrefix));
    }

    /**
     * @public @method
     * Builds the unarchive button html
     * @param {object} archivedEmployee
     * @returns {string}
     */
    ezBuildUnarchiveButton(archivedEmployee) {
        if (!EzObject.isValid(archivedEmployee)) {
            throw new EzBadParamException(
                'archivedEmployee',
                EzEmployeeArchiveView.ezInstance,
                EzEmployeeArchiveView.ezInstance.ezBuildUnarchiveButton);
        }

        let idPrefix = `EzArchivedEmployee${archivedEmployee.id}`;

        return EzHtml.build`
            <div
                id="${idPrefix}_UnarchivingStatus_LayoutContainer"
                class="ezContainer-unarchive-status"
                style="display:none">
                <div
                    id="${idPrefix}_UnarchivingStatus_ImageContainer">
                    <img
                        id="${idPrefix}_UnarchivingStatus_Image"
                        src="/public/images/spinners/infinity-snake-spinner-white.svg"
                        class="ezEditButtonImage_18x18"/>
                </div>
                <span
                    id="${idPrefix}_UnarchivingStatus_TextContainer"
                    class="ezGrid-vertical-align-middle">
                    Restoring ... (can take a while)
                </span>
            </div>
            <button
                id="${idPrefix}_UnarchiveButton"
                class="ezEditButton"
                data-employee-id="${archivedEmployee.id}"
                onclick="ezApi.ezclocker.ezEmployeeArchiveView.ezHandleRestoreEmployeeButtonClick(${archivedEmployee.id})">
                <img
                    id="${idPrefix}_UnarchiveImage"
                    src="/public/images/icons/unarchive-black.svg"
                    class="ezButtonImage_16x16"/>
                Restore
            </button>`;
    }

    /**
     * @pubilc @method
     * Updates the unarchive button ux based upon current state
     * @param {object} archivedEmployee
     */
    ezUpdateUnarchiveButtonUX(archivedEmployee) {
        if (!EzObject.isValid(archivedEmployee)) {
            throw new EzBadParamException(
                'archivedEmployee',
                EzEmployeeArchiveView.ezInstance,
                EzEmployeeArchiveView.ezInstance.ezUpdateUnarchiveButtonUX);
        }

        let idPrefix = `EzArchivedEmployee${archivedEmployee.id}`;

        if (EzBoolean.isTrue(archivedEmployee.archiving) || EzEmployeeArchiveView.ezInstance.ezIsActiveEmployeeArchiving(archivedEmployee.oldEmployeeId)) {
            ezApi.ezclocker.ezUi.ezHideElement(`${idPrefix}_UnarchiveButton`);

            ezApi.ezclocker.ezUi.ezSetContent(
                `${idPrefix}_UnarchivingStatus_TextContainer`,
                'Archive Pending');

            ezApi.ezclocker.ezUi.ezShowElement(`${idPrefix}_UnarchivingStatus_LayoutContainer`);
        } else if (EzBoolean.isTrue(archivedEmployee.unarchiving) || EzEmployeeArchiveView.ezInstance.ezIsArchivedEmployeeRestoring(archivedEmployee.oldEmployeeId)) {
            ezApi.ezclocker.ezUi.ezHideElement(`${idPrefix}_UnarchiveButton`);

            ezApi.ezclocker.ezUi.ezSetContent(
                `${idPrefix}_UnarchivingStatus_TextContainer`,
                'Restoring ... (can take a while)');

            ezApi.ezclocker.ezUi.ezShowElement(`${idPrefix}_UnarchivingStatus_LayoutContainer`);
        } else {
            ezApi.ezclocker.ezUi.ezHideElement(`${idPrefix}_UnarchivingStatus_LayoutContainer`);

            ezApi.ezclocker.ezUi.ezSetContent(
                `${idPrefix}_UnarchivingStatus_TextContainer`,
                EzString.EMPTY);

            ezApi.ezclocker.ezUi.ezShowElement(`${idPrefix}_UnarchiveButton`);
        }
    }

    /**
     * @public @method
     * Handles Archive button clicks.
     * @param {number} activeEmployeeId
     */
    ezHandleArchiveEmployeeButtonClick(activeEmployeeId) {
        if (!EzNumber.isNumber(activeEmployeeId)) {
            throw new EzBadParamException(
                'activeEmployeeId',
                EzEmployeeArchiveView.ezInstance,
                EzEmployeeArchiveView.ezInstance.ezHandleArchiveEmployeeButtonClick);
        }

        let activeEmployee = ezApi.ezclocker.ezClockerContext.ezGetSelectedEmployerAccountEmployeeAccountForEmployeeId(activeEmployeeId);

        if (!EzObject.isValid(activeEmployee)) {
            throw new EzException(
                EzString.em`
                    Unable to handle archive employee button click:
                    Could not obtain a reference to the employee entity assocaited with employeeId=${activeEmployeeId}.`);
        }

        EzEmployeeArchiveView.ezInstance.ezArchiveEmployee(activeEmployee)
            .then(EzPromise.ignoreResolve);
    }

    /**
     * @public @method
     * Handles Archive button clicks.
     * @param {number} archivedEmployeeId
     */
    ezHandleRestoreEmployeeButtonClick(archivedEmployeeId) {
        if (!EzObject.isValid(archivedEmployeeId)) {
            throw new EzBadParamException(
                'archivedEmployeeId',
                EzEmployeeArchiveView.ezInstance,
                EzEmployeeArchiveView.ezInstance.ezHandleRestoreEmployeeButtonClick);
        }

        let archivedEmployee = ezApi.ezclocker.ezClockerContext.ezGetSelectedEmployerArchivedEmployeeById(archivedEmployeeId);

        if (!EzObject.isValid(archivedEmployee)) {
            throw new EzException(
                EzString.em`
                    Unable to handle the restore employee button click:
                    Could not obtain a reference to the employee entity assocaited with employeeId=${archivedEmployeeId}.`);
        }

        EzEmployeeArchiveView.ezInstance.ezUnarchiveEmployee(archivedEmployee)
            .then(EzPromise.ignoreResolve);
    }

    /**
     * @protected @protected
     * Builds the status id for the archived employee with the provided oldEmployeeId value.
     * @param {number} oldEmployeeId
     */
    ezBuildArchivedEmployeeStatusId(oldEmployeeId) {
        if (!EzNumber.isNumber(oldEmployeeId)) {
            throw new EzBadParamException(
                'oldEmployeeId',
                EzEmployeeArchiveView.ezInstance,
                EzEmployeeArchiveView.ezInstance.ezBuildArchivedEmployeeStatusId);
        }

        return `ezArchivedEmployeeId${oldEmployeeId}`;
    }

    /**
     * @protected @protected
     * Builds the status id for the active employee with the provided activeEmployeeId value.
     * @param {number} activeEmployeeId
     */
    ezBuildActiveEmployeeStatusId(activeEmployeeId) {
        if (!EzNumber.isNumber(activeEmployeeId)) {
            throw new EzBadParamException(
                'activeEmployeeId',
                EzEmployeeArchiveView.ezInstance,
                EzEmployeeArchiveView.ezInstance.ezBuildActiveEmployeeStatusId);
        }

        return `ezActiveEmployeeId${activeEmployeeId}`;
    }

    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    // Class Initialization and EzApi Registration Section
    // !! DO NOT PLACE ANY non-initialization fields, getter/setter methods, static methods, or class methods beyond this section !!
    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

    /**
         * @static
         * @public @readonly @property
         * Returns the name of this class's singleton instance when registered with ezApi.
         * @returns {string}
         */
    static get ezApiName() {
        return 'ezEmployeeArchiveView';
    }

    /**
     * @static
     * @public @readonly @property
     * Returns an object of event names that this class may trigger.
     * @returns {object}
     */
    static get ezEventNames() {
        return {
            onReady: 'ezOn_EzEmployeeArchiveView_Ready',
        };
    }

    /**
     * @static
     * @private @field
     * Stores the singleton instance of this class that was created by and registerd with EzApi.
     * @type {EzEmployeeArchiveView}
     */
    static #ezInstance = EzObject.hasProperty(globalThis, 'ezApi') &&
        EzObject.isValid(globalThis.ezApi) && EzBoolean.isTrue(globalThis.ezApi.ready) &&
        EzObject.isValid(globalThis.ezApi.ezclocker[EzEmployeeArchiveView.ezApiName])
        ? globalThis.ezApi.ezclocker[EzEmployeeArchiveView.ezApiName]
        : null;

    /**
     * @static
     * @public @property @getter
     * Returns the singleton instance of this class that is registered with EzApi (if available yet)
     * @returns {EzEmployeeArchiveView}
     */
    static get ezInstance() {
        return EzEmployeeArchiveView.#ezInstance;
    }

    /**
     * @static
     * @public @property @setter
     * Sets the singleton instance of of this class that is registered with EzApi.
     * @param {EzEmployeeArchiveView} instance
     */
    static set ezInstance(instance) {
        if (null != EzEmployeeArchiveView.#ezInstance) {
            throw new Error('EzEmployeeArchiveView\'s singleton instance is already reigstered with EzApi.');
        }

        EzEmployeeArchiveView.#ezInstance = instance;
    }

    /**
     * @static
     * @private @field
     * Stores the EzApi registration state for this class.
     * Default value is NULL
     * Class is registerd with EzApi when value is EzRegistrationState.REGISTERED
     * @type {string}
     * A valid enum property value from EzRegistrationState
     */
    static #ezApiRegistrationState = EzObject.hasProperty(globalThis, 'ezApi') &&
        EzObject.isValid(globalThis.ezApi) && EzBoolean.isTrue(globalThis.ezApi.ready) &&
        EzObject.isValid(globalThis.ezApi.ezclocker[EzEmployeeArchiveView.ezApiName])
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
        return EzEmployeeArchiveView.#ezApiRegistrationState;
    }

    /**
     * @static
     * @public @property @setter
     * Sets the ezApi registration state of this classes's singleton instance.
     * @param {string} ezApiRegistrationState
     * A valid enum property value from EzRegistrationState
     */
    static set ezApiRegistrationState(ezApiRegistrationState) {
        EzEmployeeArchiveView.#ezApiRegistrationState = EzRegistrationState.ezValueOf(ezApiRegistrationState);
    }

    /**
     * @static
     * @private @readonly @property
     * Returns true when all required dependencies for this class report ready.
     * In otherwords, the require dependency's singleton instance is created
     * and is registered with and accessable from EzApi with ezApi.ezclocker.{dependency_name}.
     * @returns {boolean}
     */
    static get #ezCanRegister() {
        return EzRegistrationState.PENDING === EzEmployeeArchiveView.ezApiRegistrationState &&

            globalThis?.ezApi?.ready && globalThis.ezApi?.ezclocker &&

            globalThis.ezApi.ezclocker?.[EzEventEngine.ezApiName]?.ready &&

            globalThis.ezApi.ezclocker?.[EzClockerContextEventName.ezApiName]?.ready &&

            globalThis.ezApi.ezclocker?.[EzClockerContext.ezApiName]?.ready &&

            globalThis.ezApi.ezclocker?.[EzTickerTimer.ezApiName]?.ready &&

            globalThis.ezApi.ezclocker?.[EzUI.ezApiName]?.ready &&

            globalThis.ezApi.ezclocker?.[EzEmployerService.ezApiName]?.ready &&

            globalThis.ezApi.ezclocker?.[EzEmployeeArchiveHelper.ezApiName]?.ready &&

            globalThis.ezApi.ezclocker?.[EzHelp.ezApiName]?.ready &&

            globalThis.ezApi.ezclocker?.[EzAccountNavButton.ezApiName]?.ready;
    }

    /**
     * @static
     * @private @readonly @property
     * Returns if this class's singleton instance is registered with ezApi yet.
     * @returns {boolean}
     */
    static get #ezIsRegistered() {
        return null != EzEmployeeArchiveView.ezInstance &&
            EzRegistrationState.REGISTERED === EzEmployeeArchiveView.ezApiRegistrationState;
    }

    /**
     * @static
     * @private @method
     * Attempts to register the singleton instance for this class with ezApi. Returns true
     * if successful, false otherwise.
     * @returns {boolean}
     */
    static #ezRegistrator() {
        if (EzEmployeeArchiveView.#ezCanRegister && !EzEmployeeArchiveView.#ezIsRegistered) {
            globalThis.ezApi.ezRegisterNewApi(EzEmployeeArchiveView, EzEmployeeArchiveView.ezApiName);
        }

        return EzEmployeeArchiveView.#ezIsRegistered;
    }

    /**
     * @static
     * Static Initialization
     * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
     * >> IMPORTANT <<
     * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
     * Make sure the following properties and methods get defined BEFORE this static initialization section:
     *     1) Property getter EzEmployeeArchiveView.ezApiName
     *     2) Property getter EzEmployeeArchiveView.ezEventNames
     *     3) Property getter EzEmployeeArchiveView.ezInstance
     *     4) Property setter EzEmployeeArchiveView.ezInstance
     *     5) Property getter EzEmployeeArchiveView.ezApiRegistrationState
     *     6) Property setter EzEmployeeArchiveView.ezApiRegistrationState
     *     7) Property getter EzEmployeeArchiveView.#ezCanRegister
     *     8) Property getter EzEmployeeArchiveView.#ezIsRegistered
     *     9) Method EzEmployeeArchiveView.#ezRegistrator()
     */
    static {
        if (!EzEmployeeArchiveView.#ezIsRegistered) {
            EzEmployeeArchiveView.ezApiRegistrationState = EzRegistrationState.PENDING;

            if (!EzEmployeeArchiveView.#ezRegistrator()) {
                document.addEventListener(
                    EzEmployeeArchiveView.ezOnEzApiReadyEventName,
                    EzEmployeeArchiveView.#ezRegistrator);

                document.addEventListener(
                    EzEventEngine.ezEventNames.onReady,
                    EzEmployeeArchiveView.#ezRegistrator);

                document.addEventListener(
                    EzClockerContextEventName.ezEventNames.onReady,
                    EzEmployeeArchiveView.#ezRegistrator);

                document.addEventListener(
                    EzClockerContext.ezEventNames.onReady,
                    EzEmployeeArchiveView.#ezRegistrator);

                document.addEventListener(
                    EzTickerTimer.ezEventNames.onReady,
                    EzEmployeeArchiveView.#ezRegistrator);

                document.addEventListener(
                    EzUI.ezEventNames.onReady,
                    EzEmployeeArchiveView.#ezRegistrator);

                document.addEventListener(
                    EzEmployerService.ezEventNames.onReady,
                    EzEmployeeArchiveView.#ezRegistrator);

                document.addEventListener(
                    EzEmployeeArchiveHelper.ezEventNames.onReady,
                    EzEmployeeArchiveView.#ezRegistrator);

                document.addEventListener(
                    EzHelp.ezEventNames.onReady,
                    EzEmployeeArchiveView.#ezRegistrator);

                document.addEventListener(
                    EzAccountNavButton.ezEventNames.onReady,
                    EzEmployeeArchiveView.#ezRegistrator);
            }
        }
    }

    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    // !! DO NOT PLACE ANY non-initialization fields, getter/setter methods, static methods, or class methods beyond above section !!
    // NO CODE AFTER THIS SECTION
    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
}
