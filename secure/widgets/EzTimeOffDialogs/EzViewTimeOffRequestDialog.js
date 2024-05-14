import {
    // Comment out or remove the exception classes not used in this module
    // EzException,
    // EzExceptionInClassMethod,
    EzBadParamException,
    // EzBadStateException,
    // EzStaticClassException,
    // EzNotSupportedException
} from '/ezlibrary/exceptions/EzExceptions.js';

import {
    EzObject,
    EzBoolean,
    //EzNumber,
    // EzFloat,
    EzString,
    // EzArray,
    // EzUrl,
    EzHtml,
    // EzFunction,
    EzJson,
    // EzConsole,
    // EzAsync,
    EzPromise,
    // EzDocument
} from '/ezlibrary/helpers/EzHelpers.js';

import { EzClass } from '/ezlibrary/EzClass.js';

import {
    EzRegistrationState,
    EzTimeOffStatus,
    EzTimeOffType,
    EzWidgetAccountMode
} from '/ezlibrary/enums/EzEnumerations.js';

import { EzDialogConfig } from '/ezlibrary/ux/dialogs/EzDialogConfig.js';

import { EzDialog } from '/public/javascript/common/ezclocker-dialog-helper.js';

/*
    Dialog for request time off
 */
export class EzViewTimeOffRequestDialog extends EzClass {
    /**
        @static
        @public @readonly @property
        Returns the name of this class's singleton instance when registered with ezApi.
        @returns {string}
     */
    static get ezApiName() {
        return 'ezViewTimeOffRequestDialog';
    }

    /**
        @static
        @public @readonly @property
        Returns an object of event names that this class may trigger.
        @returns {object}
     */
    static get ezEventNames() {
        return {
            onReady: 'ezOn_EzViewTimeOffRequestDialog_Ready',
            onShow: 'ezOn_EzViewTimeOffRequestDialog_Show',
            onClosed: 'ezOn_EzViewTimeOffRequestDialog_Closed',
            onApproved: 'ezOn_EzViewTimeOffRequestDialog_Approved',
            onDenied: 'ezOn_EzViewTimeOffRequestDialog_Denied',
            onCanceled: 'ezOn_EzViewTimeOffRequestDialog_Canceled'
        };
    }

    /**
         @static
         @private @field
         Stores the singleton instance of this class that was created by and registerd with EzApi.
         @type {EzViewTimeOffRequestDialog}
      */
    static #ezInstance = EzObject.hasProperty(globalThis, 'ezApi') &&
        EzObject.isValid(globalThis.ezApi) && EzBoolean.isTrue(globalThis.ezApi.ready) &&
        EzObject.isValid(globalThis.ezApi.ezclocker[EzViewTimeOffRequestDialog.ezApiName])
        ? globalThis.ezApi.ezclocker[EzViewTimeOffRequestDialog.ezApiName]
        : null;

    /**
        @static
        @public @property @getter
        Returns the singleton instance of this class that is registered with EzApi (if available yet)
        @returns {EzViewTimeOffRequestDialog}
     */
    static get ezInstance() {
        return EzViewTimeOffRequestDialog.#ezInstance;
    }

    /**
        @static
        @public @property @getter
        Sets the singleton instance of of this class that is registered with EzApi.
        @param {EzViewTimeOffRequestDialog} instance
     */
    static set ezInstance(instance) {
        if (null != EzViewTimeOffRequestDialog.#ezInstance) {
            throw new Error('EzViewTimeOffRequestDialog\'s singleton instance is already reigstered with EzApi.');
        }

        EzViewTimeOffRequestDialog.#ezInstance = instance;
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
        EzObject.isValid(globalThis.ezApi.ezclocker[EzViewTimeOffRequestDialog.ezApiName])
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
        return EzViewTimeOffRequestDialog.#ezApiRegistrationState;
    }

    /**
        @static
        @public @property @setter
        Sets the ezApi registration state of this classes's singleton instance.
        @param {string} ezApiRegistrationState
        A valid enum property value from EzRegistrationState
     */
    static set ezApiRegistrationState(ezApiRegistrationState) {
        EzViewTimeOffRequestDialog.#ezApiRegistrationState = EzRegistrationState.ezValueOf(ezApiRegistrationState);
    }

    /**
        @static
        @private @readonly @property
        Returns true when all required dependencies for this class report ready.
        In otherwords, the require dependency's singleton instance is created
        and is registered with and accessable from EzApi with ezApi.ezclocker.{dependency_name}.
        @returns {boolean}
     */
    static #ezCanRegister() {
        return 'PENDING' === EzViewTimeOffRequestDialog.ezApiRegistrationState &&
            Object.prototype.hasOwnProperty.call(globalThis, 'ezApi') && globalThis['ezApi'].ready &&
            ezApi.ezclocker[EzDialog.ezApiName] && ezApi.ezclocker[EzDialog.ezApiName].ready;
    }

    /**
        @static
        @private @readonly @property
        Returns if this class's singleton instance is registered with ezApi yet.
        @returns {boolean}
     */
    static get #ezIsRegistered() {
        return null != EzViewTimeOffRequestDialog.ezInstance &&
            EzRegistrationState.REGISTERED === EzViewTimeOffRequestDialog.ezApiRegistrationState;
    }

    /**
        @static
        @private @method
        Attempts to register the singleton instance for this class with ezApi. Returns true
        if successful, false otherwise.
        @returns {boolean}
     */
    static #ezRegistrator() {
        if (EzViewTimeOffRequestDialog.#ezCanRegister && !EzViewTimeOffRequestDialog.#ezIsRegistered) {
            globalThis.ezApi.ezRegisterNewApi(EzViewTimeOffRequestDialog, EzViewTimeOffRequestDialog.ezApiName);
        }

        return EzViewTimeOffRequestDialog.#ezIsRegistered;
    }

    /**
        @static
        Static Initialization
        ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        >> IMPORTANT <<
        ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        Make sure the following properties and methods get defined BEFORE this static initialization section:
            1) Property getter EzViewTimeOffRequestDialog.ezApiName
            2) Property getter EzViewTimeOffRequestDialog.ezEventNames
            3) Property getter EzViewTimeOffRequestDialog.ezInstance
            4) Property setter EzViewTimeOffRequestDialog.ezInstance
            5) Property getter EzViewTimeOffRequestDialog.ezApiRegistrationState
            6) Property setter EzViewTimeOffRequestDialog.ezApiRegistrationState
            7) Property getter EzViewTimeOffRequestDialog.#ezCanRegister
            8) Property getter EzViewTimeOffRequestDialog.#ezIsRegistered
            9) Method EzViewTimeOffRequestDialog.#ezRegistrator()
     */
    static {
        if (!EzViewTimeOffRequestDialog.#ezIsRegistered) {
            EzViewTimeOffRequestDialog.ezApiRegistrationState = EzRegistrationState.PENDING;

            // Waiting for EzApi and EzNavigation to become ready before initializing this class
            document.addEventListener(
                EzViewTimeOffRequestDialog.ezHandleOnEzApiReady,
                EzViewTimeOffRequestDialog.#ezRegistrator);

            document.addEventListener(
                EzDialog.ezEventNames.onReady,
                EzViewTimeOffRequestDialog.#ezRegistrator);
        }
    }

    /**
        @public @constructor
     */
    constructor() {
        super();
    }

    /**
        @public @readonly @property
        @returns {string}
     */
    get ezDialogId() {
        return 'EzViewTimeOffRequestDialog';
    }

    /**
        @public @readonly @property
        @returns {string}
     */
    get ezParentContainerId() {
        return 'ezHiddenByDefault';
    }

    /**
        @public @readonly @property
        @returns {object}
     */
    get ezButtonIds() {
        return {
            exit: `${EzViewTimeOffRequestDialog.ezInstance.ezDialogId}CancelButton`,
            approved: `${EzViewTimeOffRequestDialog.ezInstance.ezDialogId}ApproveButton`,
            denied: `${EzViewTimeOffRequestDialog.ezInstance.ezDialogId}DenyButton`,
            canceled: `${EzViewTimeOffRequestDialog.ezInstance.ezDialogId}CancelRequestButton`
        };
    }

    /**
        @deprecated
        Migrate to using the static EzViewTimeOffRequestDialog.ezEventNames instead.
        @public @readonly @property
        @returns {object}
     */
    get ezEventNames() {
        return EzViewTimeOffRequestDialog.ezEventNames;
    }

    /**
        @public @readonly @property
        @returns {string}
     */
    get TIMEOFF_API_URL() {
        return ezApi.ezclocker.ezNavigation.ezGetInternalApiUrl('timeoff', 'v1');
    }

    /**
     * @protected
     * Initializes ezwViewRequestTimeOffRecordDialog
     *
     * @returns {EzViewTimeOffRequestDialog}
     */
    ezInit() {
        ezApi.ezclocker.ezEventEngine.ezRegisterEvent(
            EzViewTimeOffRequestDialog.ezApiName,
            EzViewTimeOffRequestDialog.ezEventNames.onShow);

        ezApi.ezclocker.ezEventEngine.ezRegisterEvent(
            EzViewTimeOffRequestDialog.ezApiName,
            EzViewTimeOffRequestDialog.ezEventNames.onApproved);

        ezApi.ezclocker.ezEventEngine.ezRegisterEvent(
            EzViewTimeOffRequestDialog.ezApiName,
            EzViewTimeOffRequestDialog.ezEventNames.onDenied);

        ezApi.ezclocker.ezEventEngine.ezRegisterEvent(
            EzViewTimeOffRequestDialog.ezApiName,
            EzViewTimeOffRequestDialog.ezEventNames.onCanceled);

        ezApi.ezclocker.ezEventEngine.ezRegisterEvent(
            EzViewTimeOffRequestDialog.ezApiName,
            EzViewTimeOffRequestDialog.ezEventNames.onClosed);

        EzViewTimeOffRequestDialog.ezInstance.ezInitUX();

        EzViewTimeOffRequestDialog.ezInstance.ready = true;

        return EzViewTimeOffRequestDialog.ezInstance;
    }

    /**
     * @protected
     * Initializes the dialog's UX
     *
     * @param {moment} startMoment
     * @param {moment} endMoment
     */
    ezInitUX() {
        EzViewTimeOffRequestDialog.ezInstance.ezInjectDialog();

        let dialogConfig = new EzDialogConfig(EzViewTimeOffRequestDialog.ezInstance.ezDialogId);
        dialogConfig.width = 770;
        dialogConfig.icons = {
            primary: 'ui-icon-check',
            secondary: 'ui-icon-blank'
        };
        dialogConfig.buttons = [
            {
                id: EzViewTimeOffRequestDialog.ezInstance.ezButtonIds.exit,
                text: 'Exit',
                click: EzViewTimeOffRequestDialog.ezInstance.ezClose
            },
            {
                id: EzViewTimeOffRequestDialog.ezInstance.ezButtonIds.denied,
                text: 'Deny',
                click: () => EzViewTimeOffRequestDialog.ezInstance.ezSubmit(EzTimeOffStatus.DENIED)
            },
            {
                id: EzViewTimeOffRequestDialog.ezInstance.ezButtonIds.canceled,
                text: 'Cancel Request',
                click: () => EzViewTimeOffRequestDialog.ezInstance.ezSubmit(EzTimeOffStatus.CANCELED)
            },
            {
                id: EzViewTimeOffRequestDialog.ezInstance.ezButtonIds.approved,
                text: 'Approve',
                click: () => EzViewTimeOffRequestDialog.ezInstance.ezSubmit(EzTimeOffStatus.APPROVED)
            }
        ];

        ezApi.ezclocker.ezDialog.ezInitDialogWithConfig(EzViewTimeOffRequestDialog.ezInstance.ezDialogId, dialogConfig);

        ezApi.ezclocker.ezUi.ezSetElementCss(
            EzViewTimeOffRequestDialog.ezInstance.ezButtonIds.denied,
            'background-color',
            'red');

        ezApi.ezclocker.ezUi.ezSetElementCss(
            EzViewTimeOffRequestDialog.ezInstance.ezButtonIds.canceled,
            'background-color',
            'red');

        ezApi.ezclocker.ezUi.ezSetElementCss(
            EzViewTimeOffRequestDialog.ezInstance.ezButtonIds.approved,
            'background-color',
            'green');
    }

    ezInjectDialog() {
        if (!ezApi.ezclocker.ezUi.ezElementExists(EzViewTimeOffRequestDialog.ezInstance.ezParentContainerId)) {
            ezApi.ezclocker.ezUi.ezAppendHtml$(
                'body',
                EzHtml.build`
                    <div
                        id="${EzViewTimeOffRequestDialog.ezInstance.ezParentContainerId}"
                        style="display:none">
                    </div>`);
        }

        ezApi.ezclocker.ezUi.ezAppendContent(
            EzViewTimeOffRequestDialog.ezInstance.ezParentContainerId,
            EzHtml.build`
                <!DOCTYPE html>
                <div
                    id="${EzViewTimeOffRequestDialog.ezInstance.ezDialogId}"
                    class="ezHiddentByDefault"
                    title="View Time Off Request">
                    <div
                        id="${EzViewTimeOffRequestDialog.ezInstance.ezDialogId}_time-off-main-fragment"
                        class="ezHiddentByDefault">
                        <div
                            id="EzViewTimeOffRequestDialog"
                            title="View Time Off Request Dialog">
                            <div
                                id="EzAllRequestTimeOffRequestDialogMainDiv"
                                class="ezSilverBox marginTop10 ezRequestTimeOffDialogMainDiv">
                                <table
                                    id="EzAllRequestTimeOffRequestDialogMainTable"
                                    class="ezFullWidth ezRequestTimeOffDialogMainTable">
                                    <tr
                                        style="display: flex; margin-bottom: 10px">
                                        <td
                                            class="leftAlignCell"
                                            style="float: left">
                                            <div>
                                                Request Type
                                            </div>
                                            <input
                                                id="EzAllRequestTimeOffRequestDialog_RequestType"
                                                class="ezRequestTimeOffDialog_RequestType"
                                                disabled />
                                        </td>
                                        <td
                                            class="leftAlignCell"
                                            style="float: right; margin-left: 15px;">
                                            <div>
                                                Status
                                            </div>
                                            <input
                                                id="EzAllRequestTimeOffRequestDialog_RequestedStatus"
                                                disabled />
                                        </td>
                                    </tr>
                                    <tr
                                        style="display: flex; margin-bottom: 10px">
                                        <td
                                            class="leftAlignCell"
                                            style="margin-top: 15px;">
                                            <div
                                                for="EzAllRequestTimeOffRequestDialog_RequestedBy">
                                                Employee
                                            </div>
                                            <input
                                                id="EzAllRequestTimeOffRequestDialog_RequestedBy"
                                                disabled />
                                        </td>
                                    </tr>
                                    <tr
                                        style="display: flex; margin-bottom: 10px">
                                        <td
                                            class="leftAlignCell">
                                            <label>
                                                Start
                                            </label>
                                            <div>
                                                <input
                                                    id="EzAllRequestTimeOffDialog_StartDateTime"
                                                    class="ezRequestTimeOffDialog_StartDate viewTimeOffDateTime"
                                                    readonly="true"
                                                    disabled />
                                            </div>
                                        </td>
                                        <td
                                            class="leftAlignCell"
                                            style="margin-left: 15px">
                                            <label>
                                                End
                                            </label>
                                            <div>
                                                <input
                                                    id="EzAllRequestTimeOffDialog_EndDateTime"
                                                    class="ezRequestTimeOffDialog_EndDate viewTimeOffDateTime"
                                                    type="text"
                                                    readonly="true"
                                                    disabled />
                                            </div>
                                        </td>
                                    </tr>
                                    <!-- Preferred Time Zone Option -->
                                    <tr
                                        style="display: flex; margin-bottom: 15px">
                                        <td
                                            class="leftAlignCell">
                                            <label
                                                class="ezLabel"
                                                for="EZOPTION_VIEW_TIMEOFF_PREFERRED_TIMEZONE">
                                                Employee Time Zone
                                            </label>
                                            <div>
                                                <input
                                                    id="EZOPTION_VIEW_TIMEOFF_PREFERRED_TIMEZONE"
                                                    class="ezRequestTimeOffDialog_PreferredTimeZone viewTimeOffPreferredTimeZone"
                                                    readonly="true"
                                                    disabled />
                                            </div>
                                        </td>
                                    </tr>
                                    <tr
                                        style="display: flex; margin-bottom: 10px">
                                        <td
                                            class="leftAlignCell">
                                            <div
                                                style="vertical-align: top;"
                                                for="EzAllRequestTimeOffRequestDialog_Notes">
                                                Notes
                                            </div>
                                            <textarea
                                                id="EzAllRequestTimeOffRequestDialog_Notes"
                                                class="ezRequestTimeOffDialog_Notes"
                                                readonly="true"
                                                type="text"
                                                maxlength="500"
                                                disabled>
                                            </textarea>
                                        </td>
                                    </tr>
                                    <tr
                                        style="display: flex; margin-bottom: 5px; width: 100%; margin-top: 30px;">
                                        <td
                                            class="leftAlignCell"
                                            style="display: inline-block;">
                                            <label
                                                id="EzAllRequestTimeOffRequestDialog_TotalTimeOffLabel"
                                                class="ezRequestTimeOffDialog_TotalTimeOffLabel">
                                                Total Time Off Hours
                                            </label>
                                            <label
                                                id="EzAllRequestTimeOffRequestDialog_TotalTimeOff"
                                                class="ezRequestTimeOffDialog_TotalTimeOff"/>
                                        </td>
                                    </tr>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>`);
    }

    /**
     * @public
     * Shows the dialog for the employer dashboards
     *
     * @param {object} timeOffRecord
     * @param {false} isEmployer
     */
    ezShow(timeOffRecord, isEmployer, modalToOpen, timeOffBackendRequestsResponse) {
        EzViewTimeOffRequestDialog.ezInstance.timeOffBackendRequestsResponse = timeOffBackendRequestsResponse;

        EzViewTimeOffRequestDialog.ezInstance.modalToOpen = modalToOpen;

        EzViewTimeOffRequestDialog.ezInstance.timeOffRecord = timeOffRecord;

        EzViewTimeOffRequestDialog.ezInstance.isEmployer = isEmployer;

        ezApi.ezclocker.ezUi.ezSetElementCss(
            EzViewTimeOffRequestDialog.ezInstance.ezButtonIds.denied,
            'background-color',
            'red');

        if (EzBoolean.isTrue(isEmployer)) {
            ezApi.ezclocker.ezUi.ezSetElementCss(
                EzViewTimeOffRequestDialog.ezInstance.ezButtonIds.approved,
                'background-color',
                'green');

            if ('APPROVED' === timeOffRecord.requestStatus.toUpperCase()) {
                ezApi.ezclocker.ezUi.ezDisableElement(EzViewTimeOffRequestDialog.ezInstance.ezButtonIds.approved);

                ezApi.ezclocker.ezUi.ezEnableElement(EzViewTimeOffRequestDialog.ezInstance.ezButtonIds.denied);

                ezApi.ezclocker.ezUi.ezSetElementCss(EzViewTimeOffRequestDialog.ezInstance.ezButtonIds.approved, 'opacity', '0.5');

                ezApi.ezclocker.ezUi.ezSetElementCss(EzViewTimeOffRequestDialog.ezInstance.ezButtonIds.denied, 'opacity', '1');
            }

            if ('DENIED' === timeOffRecord.requestStatus.toUpperCase()) {
                ezApi.ezclocker.ezUi.ezDisableElement(EzViewTimeOffRequestDialog.ezInstance.ezButtonIds.denied);

                ezApi.ezclocker.ezUi.ezEnableElement(EzViewTimeOffRequestDialog.ezInstance.ezButtonIds.approved);

                ezApi.ezclocker.ezUi.ezSetElementCss(EzViewTimeOffRequestDialog.ezInstance.ezButtonIds.denied, 'opacity', '0.5');

                ezApi.ezclocker.ezUi.ezSetElementCss(EzViewTimeOffRequestDialog.ezInstance.ezButtonIds.approved, 'opacity', '1');
            }

            if ('PENDING' === timeOffRecord.requestStatus.toUpperCase()) {
                ezApi.ezclocker.ezUi.ezEnableElement(EzViewTimeOffRequestDialog.ezInstance.ezButtonIds.approved);
                ezApi.ezclocker.ezUi.ezEnableElement(EzViewTimeOffRequestDialog.ezInstance.ezButtonIds.denied);
                ezApi.ezclocker.ezUi.ezSetElementCss(EzViewTimeOffRequestDialog.ezInstance.ezButtonIds.approved, 'opacity', '1');
                ezApi.ezclocker.ezUi.ezSetElementCss(EzViewTimeOffRequestDialog.ezInstance.ezButtonIds.denied, 'opacity', '1');
            }
        }

        // Show deny or cancel request button
        if (EzBoolean.isTrue(isEmployer)) {
            ezApi.ezclocker.ezUi.ezHideElement(EzViewTimeOffRequestDialog.ezInstance.ezButtonIds.canceled);

            ezApi.ezclocker.ezUi.ezShowElement(EzViewTimeOffRequestDialog.ezInstance.ezButtonIds.denied);

            ezApi.ezclocker.ezUi.ezShowElement(EzViewTimeOffRequestDialog.ezInstance.ezButtonIds.approved);
        } else {
            ezApi.ezclocker.ezUi.ezHideElement(EzViewTimeOffRequestDialog.ezInstance.ezButtonIds.approved);

            ezApi.ezclocker.ezUi.ezHideElement(EzViewTimeOffRequestDialog.ezInstance.ezButtonIds.denied);

            ezApi.ezclocker.ezUi.ezShowElement(EzViewTimeOffRequestDialog.ezInstance.ezButtonIds.canceled);
        }

        ezApi.ezclocker.ezUi.ezSetInputValue('EzAllRequestTimeOffRequestDialog_Notes', timeOffRecord.notesString);

        ezApi.ezclocker.ezUi.ezSetInputValue('EzAllRequestTimeOffRequestDialog_RequestedBy', timeOffRecord.requestedUser);

        ezApi.ezclocker.ezUi.ezSetInputValue('EzAllRequestTimeOffRequestDialog_RequestedStatus', timeOffRecord.requestStatus);

        ezApi.ezclocker.ezUi.ezSetInputValue(
            'EzAllRequestTimeOffRequestDialog_RequestType',
            EzTimeOffType.ezEnumData(
                EzTimeOffType.ezAsEnum(timeOffRecord.requestType))
                .displayName);

        if (timeOffRecord.allDay) {
            ezApi.ezclocker.ezUi.ezSetInputValue('EzAllRequestTimeOffDialog_StartDateTime', timeOffRecord.requestStartDate);

            ezApi.ezclocker.ezUi.ezSetInputValue('EzAllRequestTimeOffDialog_EndDateTime', timeOffRecord.requestEndDate);
        } else {
            ezApi.ezclocker.ezUi.ezSetInputValue('EzAllRequestTimeOffDialog_StartDateTime', timeOffRecord.requestStartDateTime);

            ezApi.ezclocker.ezUi.ezSetInputValue('EzAllRequestTimeOffDialog_EndDateTime', timeOffRecord.requestEndDateTime);
        }

        ezApi.ezclocker.ezUi.ezSetInputValue(
            'EzAllRequestTimeOffRequestDialog_TotalTimeOff',
            `${timeOffRecord.totalHours} hrs`);

        ezApi.ezclocker.ezUi.ezSetContent(
            'EzAllRequestTimeOffRequestDialog_TotalTimeOff',
            `${timeOffRecord.totalHours} hrs`);

        ezApi.ezclocker.ezUi.ezSetInputValue(
            'EZOPTION_VIEW_TIMEOFF_PREFERRED_TIMEZONE',
            EzString.EMPTY);

        ezApi.ezclocker.ezDateTime.ezSupportedTimeZones.forEach(
            (timeZone) => {
                if (timeZone.utc[0] === timeOffBackendRequestsResponse.requestTimeZoneId) {
                    ezApi.ezclocker.ezUi.ezSetInputValue(
                        'EZOPTION_VIEW_TIMEOFF_PREFERRED_TIMEZONE',
                        timeZone.value);
                }
            });

        if (ezApi.ezclocker.ezUi.ezGetInputValue('EZOPTION_VIEW_TIMEOFF_PREFERRED_TIMEZONE') === EzString.EMPTY) {
            ezApi.ezclocker.ezUi.ezSetInputValue(
                'EZOPTION_VIEW_TIMEOFF_PREFERRED_TIMEZONE',
                ezApi.ezclocker.ezDateTime.activeTimeZone);
        }

        ezApi.ezclocker.ezUi.ezId(EzViewTimeOffRequestDialog.ezInstance.ezDialogId).dialog(
            'option',
            'title',
            EzString.stringOrDefault(
                'View Request',
                'View/Action Request'));

        ezApi.ezclocker.ezDialog.ezShowDialog(EzViewTimeOffRequestDialog.ezInstance.ezDialogId)
            .then(EzPromise.ezIgnoreResolve);

    }

    /**
     * @public
     * Closes the timeoff dialog
     */
    ezClose() {
        ezApi.ezclocker.ezDialog.ezCloseDialog(EzViewTimeOffRequestDialog.ezInstance.ezDialogId);

        if (EzViewTimeOffRequestDialog.ezInstance.modalToOpen !== undefined) {
            ezApi.ezId(EzViewTimeOffRequestDialog.ezInstance.modalToOpen).parent().css('visibility', 'visible');
        }

        EzViewTimeOffRequestDialog.ezInstance.modalToOpen = undefined;

        EzViewTimeOffRequestDialog.ezInstance.visible = false;
    }

    ezSubmit(ezTimeOffRequestStatus) {
        if (!EzString.stringHasLength(ezTimeOffRequestStatus)) {
            throw new EzBadParamException(
                'ezTimeOffRequestStatus',
                EzViewTimeOffRequestDialog.ezInstance,
                EzViewTimeOffRequestDialog.ezInstance.ezSubmit);
        }

        const nowInUtc = moment.utc().valueOf();

        const requestStartDateMoment = moment(EzViewTimeOffRequestDialog.ezInstance.timeOffBackendRequestsResponse.requestStartDateIso).valueOf();

        if (requestStartDateMoment < nowInUtc && ezTimeOffRequestStatus.toUpperCase() === 'CANCELED') {
            ezApi.ezclocker.ezDialog.ezShowOKMessage(
                'Time off cancel request!',
                EzHtml.build`
                    <p>
                        You can not cancel old requests.
                    </p>`,
                null,
                600)

        } else {
            ezApi.ezclocker.ezUi.ezStartPageWaitExecute(
                'Updating time off record ...',
                (waitDone) => {
                    EzViewTimeOffRequestDialog.ezInstance.timeOffBackendRequestsResponse.requestStatus = ezTimeOffRequestStatus;

                    let url = ezApi.ezUrlTemplate`${ezApi.ezclocker.nav.getInternalApiUrl('timeoff', 'v1')}/${EzViewTimeOffRequestDialog.ezInstance.timeOffRecord.id}`;

                    ezApi.ezclocker.http.ezPut(url, EzJson.toJson(EzViewTimeOffRequestDialog.ezInstance.timeOffBackendRequestsResponse))
                        .then(
                            () => {
                                let entity = (
                                    ezApi.ezclocker.ezTimeOffViewController.viewTimeOffRequestsResponse.entity ||
                                    ezApi.ezclocker.ezTimeOffViewController.viewTimeOffRequestsResponse.entities)
                                    .map(
                                        (t) => {
                                            if (t.id.toString() == EzViewTimeOffRequestDialog.ezInstance.timeOffBackendRequestsResponse.id.toString()) {
                                                t.requestStatus = EzViewTimeOffRequestDialog.ezInstance.timeOffBackendRequestsResponse.requestStatus.toUpperCase();
                                            }
                                            return t;
                                        });

                                EzViewTimeOffRequestDialog.ezInstance.viewTimeOffRequestsResponse = {
                                    entity: entity
                                };

                                ezApi.ezclocker.ezTimeOffViewController.ezMapResponseToView(EzViewTimeOffRequestDialog.ezInstance.viewTimeOffRequestsResponse);

                                ezApi.ezclocker.ezViewTimeOffRenderer.renderViewTimeOffModal(
                                    ezApi.ezclocker.ezTimeOffViewController.timeOffsByRequestStatus,
                                    ezApi.ezclocker.ezTimeOffViewController.totalsByEmployee,
                                    ezApi.ezclocker.ezTimeOffViewController.scheduleDate._isAMomentObject
                                        ? ezApi.ezclocker.ezTimeOffViewController.scheduleDate.year()
                                        : ezApi.ezclocker.ezTimeOffViewController.scheduleDate.substring(0, 4),
                                    EzViewTimeOffRequestDialog.ezInstance.isEmployer
                                        ? EzWidgetAccountMode.EMPLOYER
                                        : EzWidgetAccountMode.EMPLOYEE);

                                return waitDone()
                                    .then(
                                        () => {
                                            ezApi.ezclocker.ezDialog.ezShowOK(
                                                'Request Time off Updated',
                                                ezTimeOffRequestStatus.toUpperCase() === EzTimeOffStatus.CANCELED ?
                                                    'Your time off request has been canceled.' :
                                                    'Time off request is updated.');

                                            EzViewTimeOffRequestDialog.ezInstance.ezClose();
                                        });
                            },
                            (eResponse, jqXHR) => waitDone()
                                .then(
                                    () => {
                                        ezApi.ezclocker.ezLogger.error(
                                            EzString.em`Unable to update timeoff request. Error: ${EzJson.toJson(eResponse)}`);

                                        ezApi.ezclocker.ezDialog.ezShowPossibleDefectError(
                                            'Unable to update timeoff request',
                                            eResponse.message,
                                            jqXHR,
                                            eResponse,
                                            EzString.em`
                                                URL: ${url},
                                                Request: ${EzJson.toJson(EzViewTimeOffRequestDialog.ezInstance.timeOffBackendRequestsResponse)}`)
                                            .then(EzViewTimeOffRequestDialog.ezInstance.ezClose);
                                    }));
                });
        }
    }
}
