import { EzBadParamException } from '/ezlibrary/exceptions/EzExceptions.js';

import { EzClass } from '/ezlibrary/EzClass.js';

import { EzDateTime } from '/public/javascript/common/ez-date-time.js';

import {
    EzObject,
    EzBoolean,
    EzArray,
    EzHtml
} from '/ezlibrary/helpers/EzHelpers.js';

import {
    EzRegistrationState,
    EzWidgetAccountMode,
    EzTimeOffType,
    EzTimeOffStatus
} from '/ezlibrary/enums/EzEnumerations.js';

import { EzUI } from '/public/javascript/common/ezui.js';

export class EzViewTimeOffRenderer extends EzClass {
    /**
        @static
        @public @readonly @property
        Returns the name of this class's singleton instance when registered with ezApi.
        @returns {string}
     */
    static get ezApiName() {
        return 'ezViewTimeOffRenderer';
    }

    /**
        @static
        @public @readonly @property
        Returns an object of event names that this class may trigger.
        @returns {object}
     */
    static get ezEventNames() {
        return {
            onReady: 'ezOn_EzViewTimeOffRenderer_Ready'
        };
    }

    /**
        @static
        @private @field
        Stores the singleton instance of this class that was created by and registerd with EzApi.
        @type {EzViewTimeOffRenderer}
     */
    static #ezInstance = EzObject.hasProperty(globalThis, 'ezApi') &&
        EzObject.isValid(globalThis.ezApi) && EzBoolean.isTrue(globalThis.ezApi.ready) &&
        EzObject.isValid(globalThis.ezApi.ezclocker[EzViewTimeOffRenderer.ezApiName])
        ? globalThis.ezApi.ezclocker[EzViewTimeOffRenderer.ezApiName]
        : null;

    /**
        @static
        @public @property @getter
        Returns the singleton instance of this class that is registered with EzApi (if available yet)
        @returns {EzViewTimeOffRenderer}
     */
    static get ezInstance() {
        return EzViewTimeOffRenderer.#ezInstance;
    }

    /**
        @static
        @public @property @setter
        Sets the singleton instance of of this class that is registered with EzApi.
        @param {EzViewTimeOffRenderer} instance
     */
    static set ezInstance(instance) {
        if (null != EzViewTimeOffRenderer.#ezInstance) {
            throw new Error('EzViewTimeOffRenderer\'s singleton instance is already reigstered with EzApi.');
        }

        EzViewTimeOffRenderer.#ezInstance = instance;
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
        EzObject.isValid(globalThis.ezApi.ezclocker[EzViewTimeOffRenderer.ezApiName])
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
        return EzViewTimeOffRenderer.#ezApiRegistrationState;
    }

    /**
        @static
        @public @property @setter
        Sets the ezApi registration state of this classes's singleton instance.
        @param {string} ezApiRegistrationState
        A valid enum property value from EzRegistrationState
     */
    static set ezApiRegistrationState(ezApiRegistrationState) {
        EzViewTimeOffRenderer.#ezApiRegistrationState = EzRegistrationState.ezValueOf(ezApiRegistrationState);
    }

    /**
        @static
        @private @readonly @property
        Returns true when all required dependencies for this class report ready.
        In otherwords, the require dependency's singleton instance is created
        and is registered with and accessable from EzApi with ezApi.ezclocker.{dependency_name}.
        @returns {boolean}
     */
    static get #ezCanRegister() {
        return EzRegistrationState.PENDING === EzViewTimeOffRenderer.ezApiRegistrationState &&
            EzObject.hasProperty(globalThis, 'ezApi') &&
            EzObject.isValid(globalThis.ezApi) && EzBoolean.isTrue(globalThis.ezApi.ready) &&

            globalThis.ezApi.ezclocker[EzDateTime.ezApiName] &&
            globalThis.ezApi.ezclocker[EzDateTime.ezApiName].ready &&

            globalThis.ezApi.ezclocker[EzUI.ezApiName] &&
            globalThis.ezApi.ezclocker[EzUI.ezApiName].ready;
    }

    /**
        @static
        @private @readonly @property
        Returns if this class's singleton instance is registered with ezApi yet.
        @returns {boolean}
     */
    static get #ezIsRegistered() {
        return null != EzViewTimeOffRenderer.ezInstance &&
            EzRegistrationState.REGISTERED === EzViewTimeOffRenderer.ezApiRegistrationState;
    }

    /**
        @static
        @private @method
        Attempts to register the singleton instance for this class with ezApi. Returns true
        if successful, false otherwise.
        @returns {boolean}
     */
    static #ezRegistrator() {
        if (EzViewTimeOffRenderer.#ezCanRegister && !EzViewTimeOffRenderer.#ezIsRegistered) {
            globalThis.ezApi.ezRegisterNewApi(EzViewTimeOffRenderer, EzViewTimeOffRenderer.ezApiName);
        }

        return EzViewTimeOffRenderer.#ezIsRegistered;
    }

    /**
        @static
        Static Initialization
        ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        >> IMPORTANT <<
        ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        Make sure the following properties and methods get defined BEFORE this static initialization section:
            1) Property getter EzViewTimeOffRenderer.ezApiName
            2) Property getter EzViewTimeOffRenderer.ezEventNames
            3) Property getter EzViewTimeOffRenderer.ezInstance
            4) Property setter EzViewTimeOffRenderer.ezInstance
            5) Property getter EzViewTimeOffRenderer.ezApiRegistrationState
            6) Property setter EzViewTimeOffRenderer.ezApiRegistrationState
            7) Property getter EzViewTimeOffRenderer.#ezCanRegister
            8) Property getter EzViewTimeOffRenderer.#ezIsRegistered
            9) Method EzViewTimeOffRenderer.#ezRegistrator()
     */
    static {
        if (!EzViewTimeOffRenderer.#ezIsRegistered) {
            EzViewTimeOffRenderer.ezApiRegistrationState = EzRegistrationState.PENDING;

            if (!EzViewTimeOffRenderer.#ezRegistrator()) {
                document.addEventListener(
                    EzViewTimeOffRenderer.ezOnEzApiReadyEventName,
                    () => {
                        if (!EzViewTimeOffRenderer.#ezRegistrator()) {

                            document.addEventListener(
                                EzDateTime.ezEventNames.onReady,
                                EzViewTimeOffRenderer.#ezRegistrator);

                            document.addEventListener(
                                EzUI.ezEventNames.onReady,
                                EzViewTimeOffRenderer.#ezRegistrator);
                        }
                    });
            }
        }
    }

    /**
        @public @constructor
        >> DO NOT CREATE NEW INSTANCES OUTSIDE OF THE STATIC INITIALIZATION FLOW <<
        Use the static singleton instance available from ezApi: ezApi.ezclocker.ezViewTimeOffRenderer.
     */
    constructor() {
        super();
    }

    ezWidgetAccountMode = EzWidgetAccountMode.UNKNOWN;

    /**
     * @protected
     * Initializes EzScheduleRenderer
     */
    ezInit() {
        EzViewTimeOffRenderer.ezInstance.ezSizeTimeOffContentToWindow();

        window.onresize = EzViewTimeOffRenderer.ezInstance.ezSizeTimeOffContentToWindow;

        return EzViewTimeOffRenderer.ezInstance;
    }

    /**
     * @protected
     * Draws the schedules on the UX
     */
    renderViewTimeOffModal(timeOffsByRequestStatus, totalsByEmployee, year, ezWidgetAccountMode) {
        EzViewTimeOffRenderer.ezInstance.ezWidgetAccountMode = ezWidgetAccountMode;

        ezApi.ezclocker.ezUi.ezClearContent('pendingTimeOffRequestsBody');

        ezApi.ezclocker.ezUi.ezClearContent('approvedTimeOffRequestsBody');

        ezApi.ezclocker.ezUi.ezClearContent('deniedTimeOffRequestsBody');

        ezApi.ezclocker.ezUi.ezClearContent('summaryTimeOffRequestsofEmployeesBody');

        ezApi.ezclocker.ezUi.ezClearContent('EzRequestTimeOffSummaryHeader');

        ezApi.ezclocker.ezUi.ezClearContent('EzRequestTimeOffSummaryHeader');

        ezApi.ezclocker.ezUi.ezClearContent('noTimeOffDetailRequests');

        ezApi.ezclocker.ezUi.ezClearContent('noTimeOffDetailRequests');

        EzViewTimeOffRenderer.ezInstance.renderTimeOffRequests(timeOffsByRequestStatus);

        EzViewTimeOffRenderer.ezInstance.renderTimeOffTotals(totalsByEmployee, year);
    }

    /**
        @protected @method
        Handles the window resize event
     */
    ezHandleWindowResize() {
        EzViewTimeOffRenderer.ezInstance.ezSizeTimeOffContentToWindow();
    }

    /**
        @protected @method
        Resizes the content to fit the screen
     */
    ezSizeTimeOffContentToWindow() {
        let contentHeight = window.innerHeight - (ezApi.ezclocker.ezUi.ezGetElementOuterHeight('EzPageViewHeader') + 100);

        ezApi.ezclocker.ezUi.ezSetElementHeight('EzTimeOffSelectedTimeOffRequestsView', `${contentHeight}px`);
        ezApi.ezclocker.ezUi.ezSetElementHeight('EzTimeOffSummary', `${contentHeight}px`);
    }

    ezBuildEmployerPendingTimeOffRequestHTML(aTimeOffRequest) {
        if (null == aTimeOffRequest) {
            throw new EzBadParamException(
                'aTimeOffRequest',
                EzViewTimeOffRenderer.ezInstanc,
                EzViewTimeOffRenderer.ezInstanc.ezBuildEmployerPendingTimeOffRequestHTML);
        }

        let timeOffRequestId = `ApprovedTimeOffRequest_${aTimeOffRequest.id}`;

        return EzHtml.build`
            <tr
                id="${timeOffRequestId}_ROW">
                <td
                    id="${timeOffRequestId}_COL_Icons"
                    class="calendarTableEmployeeNameCell"
                    style="padding:5px;text-align:center; background-color:lightgray">
                    <span>
                        <button
                            title="Deny/Cancel Time Off" id="deny_button_${aTimeOffRequest.id}"
                            style="padding:2px 5px; margin:2px; background-color:#d1001c"
                            onclick="ezApi.ezclocker.ezTimeOffViewController.ezSubmit(
                                '${aTimeOffRequest.id}',
                                '${EzTimeOffStatus.DENIED}',
                                '${aTimeOffRequest.employeeName}')">
                            <img
                                class="ezEditButtonImage_20x20"
                                src="/public/images/icons/delete-white.svg"/>
                        </button>
                        <button
                            id="lookup_button_${aTimeOffRequest.id}"
                            title="View Time Off"
                            style="padding:2px 5px;margin:2px;background-color:#0f4777"
                            onclick="ezApi.ezclocker.ezTimeOffViewController.ezOpenActionModal(
                                '${aTimeOffRequest.id}',
                                '${aTimeOffRequest.requestStatus}')">
                            <img
                                class="ezEditButtonImage_20x20"
                                src="/public/images/icons/view-white.svg"/>
                        </button>
                        <button
                            title="Approve Time Off" id="approve_button_${aTimeOffRequest.id}"
                            style="padding:2px 5px; margin:2px; background-color:#008F35"
                            onclick="ezApi.ezclocker.ezTimeOffViewController.ezSubmit(
                                '${aTimeOffRequest.id}',
                                '${EzTimeOffStatus.APPROVED}',
                                '${aTimeOffRequest.employeeName}')">
                            <img
                                class="ezEditButtonImage_20x20"
                                src="/public/images/icons/white-green-check.svg"/>
                        </button>
                    </span>
                </td>
                <td
                    id="${timeOffRequestId}_COL_EmployeeName"
                    class="calendarTableEmployeeNameCell"
                    style="width: 330px; color: #000000; background-color: #ffffff">
                    ${aTimeOffRequest.employeeName}
                </td>
                <td
                    id="${timeOffRequestId}_COL_Type"
                    class="calendarTableEmployeeNameCell"
                    style="color: #000000; background-color: #ffffff">
                    ${EzTimeOffType.ezEnumData(aTimeOffRequest.requestType).displayName}
                </td>
                <td
                    id="${timeOffRequestId}_COL_StartDate"
                    class="calendarTableEmployeeNameCell"
                    style="color: #000000; background-color: #ffffff">
                    ${aTimeOffRequest.requestStartDate}
                </td>
                <td
                    id="${timeOffRequestId}_COL_EndDate"
                    class="calendarTableEmployeeNameCell"
                    style="color: #000000; background-color: #ffffff">
                    ${aTimeOffRequest.requestEndDate}
                </td>
                <td
                    id="${timeOffRequestId}_COL_Status"
                    class="calendarTableEmployeeNameCell"
                    style="color: #000000; background-color: #ffffff">
                    ${EzTimeOffStatus.ezEnumData(aTimeOffRequest.requestStatus).displayName}
                </td>
                <td
                    id="${timeOffRequestId}_COL_SubmittedDate"
                    class="calendarTableEmployeeNameCell"
                    style="color: #000000; background-color: #ffffff">
                    ${aTimeOffRequest.submittedDate}
                </td>
                <td
                    id="${timeOffRequestId}_COL_TotalHours"
                    class="calendarTableEmployeeNameCell"
                    style="color: #000000; background-color: #ffffff">
                    ${aTimeOffRequest.totalHours}
                </td>
            </tr>`;
    }

    ezBuildEmployeePendingTimeOffRequestHTML(aTimeOffRequest) {
        if (null == aTimeOffRequest) {
            throw new EzBadParamException(
                'aTimeOffRequest',
                EzViewTimeOffRenderer.ezInstanc,
                EzViewTimeOffRenderer.ezInstanc.ezBuildEmployeePendingTimeOffRequestHTML);
        }

        let timeOffRequestId = `ApprovedTimeOffRequest_${aTimeOffRequest.id}`;

        return EzHtml.build`
            <tr id="${timeOffRequestId}_ROW">
                <td id="${timeOffRequestId}_COL_Icons" class="calendarTableEmployeeNameCell"
                    style="padding:5px; text-align:center; background-color:lightgray">
                    <span>
                        <button title="View Time Off" id="lookup_button_${aTimeOffRequest.id}"
                            style="padding:2px 5px; margin:2px; background-color:#0f4777"
                            onclick="ezApi.ezclocker.ezTimeOffViewController.ezOpenActionModal(
                                '${aTimeOffRequest.id}',
                                '${aTimeOffRequest.requestStatus}')">
                                <img
                                    class="ezEditButtonImage_20x20"
                                    src="/public/images/icons/view-white.svg"/>
                        </button>
                    </span>
                </td>
                <td id="${timeOffRequestId}_COL_Employeename" class="calendarTableEmployeeNameCell"
                    style="width:330px; color:#000000; background-color:#ffffff">
                    ${aTimeOffRequest.employeeName}
                </td>
                <td id="${timeOffRequestId}_COL_Type" class="calendarTableEmployeeNameCell"
                    style="color:#000000; background-color:#ffffff">
                    ${EzTimeOffType.ezEnumData(aTimeOffRequest.requestType).displayName}
                </td>
                <td id="${timeOffRequestId}_COL_StartDate" class="calendarTableEmployeeNameCell"
                    style="color:#000000; background-color:#ffffff">
                    ${aTimeOffRequest.requestStartDate}
                </td>
                <td id="${timeOffRequestId}_COL_EndDate" class="calendarTableEmployeeNameCell"
                    style="color:#000000; background-color:#ffffff">
                    ${aTimeOffRequest.requestEndDate}
                </td>
                <td id="${timeOffRequestId}_COL_Status" class="calendarTableEmployeeNameCell"
                    style="color:#000000; background-color:#ffffff">
                    ${EzTimeOffStatus.ezEnumData(aTimeOffRequest.requestStatus).displayName}
                </td>
                <td id="${timeOffRequestId}_COL_SubmittedDate" class="calendarTableEmployeeNameCell"
                    style="color:#000000; background-color:#ffffff">
                    ${aTimeOffRequest.submittedDate}
                </td>
                <td id="${timeOffRequestId}_COL_TotalHours" class="calendarTableEmployeeNameCell"
                    style="color:#000000; background-color:#ffffff">
                    ${aTimeOffRequest.totalHours}
                </td>
            </tr>` ;
    }

    ezBuildPendingTimeOffRequestHTML(timeOffRequest) {
        if (null == timeOffRequest) {
            throw new EzBadParamException(
                'timeOffRequest',
                EzViewTimeOffRenderer.ezInstanc,
                EzViewTimeOffRenderer.ezInstanc.ezBuildPendingTimeOffRequestHTML);
        }

        timeOffRequest.data
            .sort(
                (timeOffRequestA, timeOffRequestB) => moment(timeOffRequestB.requestStartDate).isAfter(moment(timeOffRequestA.requestStartDate))
                    ? 1
                    : -1)
            .forEach(
                (aTimeOffRequest) => {
                    let pendingTimeOffRequestsHTML = EzWidgetAccountMode.EMPLOYER === EzViewTimeOffRenderer.ezInstance.ezWidgetAccountMode
                        ? EzViewTimeOffRenderer.ezInstance.ezBuildEmployerPendingTimeOffRequestHTML(aTimeOffRequest)
                        : EzViewTimeOffRenderer.ezInstance.ezBuildEmployeePendingTimeOffRequestHTML(aTimeOffRequest);

                    ezApi.ezclocker.ezUi.ezAppendContent('pendingTimeOffRequestsBody', pendingTimeOffRequestsHTML);
                });
    }

    ezBuildEmployerApprovedTimeOffRequestHTML(aTimeOffRequest) {
        if (null == aTimeOffRequest) {
            throw new EzBadParamException(
                'aTimeOffRequest',
                EzViewTimeOffRenderer.ezInstanc,
                EzViewTimeOffRenderer.ezInstanc.ezBuildEmployerApprovedTimeOffRequestHTML);
        }

        let timeOffRequestId = `ApprovedTimeOffRequest_${aTimeOffRequest.id}`;

        return EzHtml.build`
            <tr id="${timeOffRequestId}_ROW">
                <td id="${timeOffRequestId}_COL_Icons" class="calendarTableEmployeeNameCell"
                    style="padding:5px; text-align:center; background-color:lightgray">
                    <span>
                        <button id="${timeOffRequestId}_DenyButton" title="Deny/Cancel Time Off"
                            style="padding:2px 5px; margin: 2px; background-color: #d1001c"
                            onclick="ezApi.ezclocker.ezTimeOffViewController.ezSubmit(
                                '${aTimeOffRequest.id}',
                                '${EzTimeOffStatus.DENIED}',
                                '${aTimeOffRequest.employeeName}')">
                            <img
                                class="ezEditButtonImage_20x20"
                                src="/public/images/icons/delete-white.svg"/>
                        </button>
                        <button id="${timeOffRequestId}_ViewButton" title="View Time Off"
                            style="padding:2px 5px; margin:2px; background-color:#0f4777"
                            onclick="ezApi.ezclocker.ezTimeOffViewController.ezOpenActionModal(
                                '${aTimeOffRequest.id}',
                                '${aTimeOffRequest.requestStatus}')">
                            <img
                                class="ezEditButtonImage_20x20"
                                src="/public/images/icons/view-white.svg"/>
                        </button>
                        <button id="${timeOffRequestId}_ApproveButton" title="Approve Time Off"
                            style="padding:2px 5px; margin:2px; background-color:#008F35; opacity:0.5" disabled>
                            <img
                                class="ezEditButtonImage_20x20"
                                src="/public/images/icons/white-green-check.svg"/>
                        </button>
                    </span>
                </td>
                <td id="${timeOffRequestId}_COL_EmployeeName" class="calendarTableEmployeeNameCell"
                    style="width:330px; color:#000000; background-color:#ffffff">
                    ${aTimeOffRequest.employeeName}
                </td>
                <td id="${timeOffRequestId}_COL_Type" class="calendarTableEmployeeNameCell"
                    style="color:#000000; background-color:#ffffff" >
                    ${EzTimeOffType.ezEnumData(aTimeOffRequest.requestType).displayName}
                </td>
                <td id="${timeOffRequestId}_COL_StartDate" class="calendarTableEmployeeNameCell"
                    style="color:#000000; background-color:#ffffff">
                    ${aTimeOffRequest.requestStartDate}
                </td>
                <td id="${timeOffRequestId}_COL_EndDate" class="calendarTableEmployeeNameCell"
                    style="color:#000000; background-color:#ffffff">
                    ${aTimeOffRequest.requestEndDate}
                </td>
                <td id="${timeOffRequestId}_COL_Status" class="calendarTableEmployeeNameCell"
                    style="color:#008F35; background-color:#ffffff">
                    ${EzTimeOffStatus.ezEnumData(aTimeOffRequest.requestStatus).displayName}
                </td>
                <td id="${timeOffRequestId}_COL_SubmittedDate" class="calendarTableEmployeeNameCell"
                    style="color:#000000; background-color:#ffffff">
                    ${aTimeOffRequest.submittedDate}
                </td>
                <td id="${timeOffRequestId}_COL_TotalHours" class="calendarTableEmployeeNameCell"
                    style="color:#000000; background-color:#ffffff">
                    ${aTimeOffRequest.totalHours}
                </td>
            </tr>`;
    }

    ezBuildEmployeeApprovedTimeOffRequestHTML(aTimeOffRequest) {
        if (null == aTimeOffRequest) {
            throw new EzBadParamException(
                'aTimeOffRequest',
                EzViewTimeOffRenderer.ezInstanc,
                EzViewTimeOffRenderer.ezInstanc.ezBuildEmployeeApprovedTimeOffRequestHTML);
        }

        let timeOffRequestId = `ApprovedTimeOffRequest_${aTimeOffRequest.id}`;

        return EzHtml.build`
            <tr id="${timeOffRequestId}_ROW">
                <td  id="${timeOffRequestId}_COL_Icons" class="calendarTableEmployeeNameCell"
                    style="padding:5px; text-align:center; background-color:lightgray">
                    <span>
                        <button id="${timeOffRequestId}_ViewButton" title="View Time Off"
                            style="padding:2px 5px; margin: 2px; background-color: #0f4777"
                            onclick="ezApi.ezclocker.ezTimeOffViewController.ezOpenActionModal(
                                '${aTimeOffRequest.id}',
                                '${aTimeOffRequest.requestStatus}')">
                            <img
                                class="ezEditButtonImage_20x20"
                                src="/public/images/icons/view-white.svg"/>
                        </button>
                    </span>
                </td>
                <td id="${timeOffRequestId}_COL_EmployeeName" class="calendarTableEmployeeNameCell"
                    style="width:330px; color:#000000; background-color:#ffffff">
                    ${aTimeOffRequest.employeeName}
                </td>
                <td id="${timeOffRequestId}_COL_Type" class="calendarTableEmployeeNameCell"
                    style="color:#000000; background-color:#ffffff">
                    ${EzTimeOffType.ezEnumData(aTimeOffRequest.requestType).displayName}
                </td>
                <td id="${timeOffRequestId}_COL_StartDate" class="calendarTableEmployeeNameCell"
                    style="color:#000000; background-color:#ffffff">
                    ${aTimeOffRequest.requestStartDate}
                </td>
                <td id="${timeOffRequestId}_COL_EndDate" class="calendarTableEmployeeNameCell"
                    style="color:#000000; background-color:#ffffff">
                    ${aTimeOffRequest.requestEndDate}
                </td>
                <td id="${timeOffRequestId}_COL_Status" class="calendarTableEmployeeNameCell"
                    style="color:#008F35; background-color:#ffffff">
                    ${EzTimeOffStatus.ezEnumData(aTimeOffRequest.requestStatus).displayName}
                </td>
                <td id="${timeOffRequestId}_COL_SubmittedDate" class="calendarTableEmployeeNameCell"
                    style="color:#000000; background-color:#ffffff">
                    ${aTimeOffRequest.submittedDate}
                </td>
                <td id="${timeOffRequestId}_COL_TotalHours" class="calendarTableEmployeeNameCell"
                    style="color:#000000; background-color:#ffffff" >
                    ${aTimeOffRequest.totalHours}
                </td>
            </tr>`;
    }

    ezBuildApprovedTimeOffRequestHTML(timeOffRequest) {
        if (null == timeOffRequest) {
            throw new EzBadParamException(
                'timeOffRequest',
                EzViewTimeOffRenderer.ezInstanc,
                EzViewTimeOffRenderer.ezInstanc.ezBuildApprovedTimeOffRequestHTML);
        }

        timeOffRequest.data
            .sort(
                (timeOffRequestA, timeOffRequestB) => moment(timeOffRequestB.requestStartDate)
                    .isAfter(
                        moment(timeOffRequestA.requestStartDate)) ? 1 : -1)
            .forEach(
                (aTimeOffRequest) => {
                    let approvedTimeOffRequestHTML = EzWidgetAccountMode.EMPLOYER === EzViewTimeOffRenderer.ezInstance.ezWidgetAccountMode
                        ? EzViewTimeOffRenderer.ezInstance.ezBuildEmployerApprovedTimeOffRequestHTML(aTimeOffRequest)
                        : EzViewTimeOffRenderer.ezInstance.ezBuildEmployeeApprovedTimeOffRequestHTML(aTimeOffRequest);

                    ezApi.ezclocker.ezUi.ezAppendContent('approvedTimeOffRequestsBody', approvedTimeOffRequestHTML);
                });
    }

    ezBuildEmployerDeniedTimeOffRequestHTML(aTimeOffRequest) {
        if (null == aTimeOffRequest) {
            throw new EzBadParamException(
                'aTimeOffRequeste',
                EzViewTimeOffRenderer.ezInstanc,
                EzViewTimeOffRenderer.ezInstanc.ezBuildEmployerDeniedTimeOffRequestHTML);
        }

        let timeOffRequestId = `ApprovedTimeOffRequest_${aTimeOffRequest.id}`;

        return EzHtml.build`
            <tr id="${timeOffRequestId}_ROW">
                <td id="${timeOffRequestId}_COL_Icons" class="calendarTableEmployeeNameCell"
                    style="padding:5px; text-align:center; background-color:lightgray">
                    <span>
                        <button id="deny_button" title="Deny/Cancel Time Off"
                            style="padding:2px 5px; margin:2px; background-color:#d1001c; opacity:0.5" disabled>
                            <img
                                class="ezEditButtonImage_20x20"
                                src="/public/images/icons/delete-white.svg"/>
                        </button>
                        <button id="lookup_button" title="View Time Off"
                            style="padding:2px 5px; margin:2px; background-color:#0f4777"
                            onclick="ezApi.ezclocker.ezTimeOffViewController.ezOpenActionModal(
                                '${aTimeOffRequest.id}',
                                '${aTimeOffRequest.requestStatus}')">
                            <img
                                class="ezEditButtonImage_20x20"
                                src="/public/images/icons/view-white.svg"/>
                        </button>
                        <button id="approve_button" title="Approve Time Off"
                            style="padding:2px 5px; margin:2px; background-color:#008F35"
                            onclick="ezApi.ezclocker.ezTimeOffViewController.ezSubmit(
                                '${aTimeOffRequest.id}',
                                '${EzTimeOffStatus.APPROVED}',
                                '${aTimeOffRequest.employeeName}')">
                            <img
                                class="ezEditButtonImage_20x20"
                                src="/public/images/icons/white-green-check.svg"/>
                        </button>
                    </span>
                </td>
                <td id="${timeOffRequestId}_COL_EmployeeName" class="calendarTableEmployeeNameCell"
                    style="width:330px; color:#000000; background-color:#ffffff">
                    ${aTimeOffRequest.employeeName}
                </td>
                <td id="${timeOffRequestId}_COL_Type" class="calendarTableEmployeeNameCell"
                    style="color:#000000; background-color:#ffffff">
                    ${EzTimeOffType.ezEnumData(aTimeOffRequest.requestType).displayName}
                </td>
                <td id="${timeOffRequestId}_COL_StartDate" class="calendarTableEmployeeNameCell"
                    style="color:#000000; background-color:#ffffff">
                    ${aTimeOffRequest.requestStartDate}
                </td>
                <td id="${timeOffRequestId}_COL_EndDate" class="calendarTableEmployeeNameCell"
                    style="color:#000000; background-color:#ffffff">
                    ${aTimeOffRequest.requestEndDate}
                </td>
                <td id="${timeOffRequestId}_COL_Status" class="calendarTableEmployeeNameCell" style="color:#db9393; background-color:#ffffff">
                    ${EzTimeOffStatus.ezEnumData(aTimeOffRequest.requestStatus).displayName}
                </td>
                <td id="${timeOffRequestId}_COL_SubmittedDate" class="calendarTableEmployeeNameCell"
                    style="color:#000000; background-color:#ffffff">
                    ${aTimeOffRequest.submittedDate}
                </td>
                <td id="${timeOffRequestId}_COL_TotalHours"class="calendarTableEmployeeNameCell" style="color:#000000; background-color:#ffffff">
                    ${aTimeOffRequest.totalHours}
                </td>
            </tr>`;
    }

    ezBuildEmployeeDeniedTimeOffRequestHTML(aTimeOffRequest) {
        if (null == aTimeOffRequest) {
            throw new EzBadParamException(
                'aTimeOffRequeste',
                EzViewTimeOffRenderer.ezInstanc,
                EzViewTimeOffRenderer.ezInstanc.ezBuildEmployeeDeniedTimeOffRequestHTML);
        }

        let timeOffRequestId = `ApprovedTimeOffRequest_${aTimeOffRequest.id}`;

        return EzHtml.build`
            <tr id="${timeOffRequestId}_ROW">
                <td id="icons_' + aTimeOffRequest.id + '" class="calendarTableEmployeeNameCell"  style="padding: 5px;text-align: center; background-color: lightgray"  >
                <span>
                <button id="lookup_button_' + aTimeOffRequest.id + '" title="View Time Off"
                    style="padding:2px 5px; margin: 2px; background-color: #0f4777"
                    onclick="ezApi.ezclocker.ezTimeOffViewController.ezOpenActionModal('${aTimeOffRequest.id}','${aTimeOffRequest.requestStatus}')">
                    <img
                        class="ezEditButtonImage_20x20"
                        src="/public/images/icons/view-white.svg"/>
                </span>
                </td>
                <td id="employee_name_${aTimeOffRequest.id}" class="calendarTableEmployeeNameCell" style="width:330px; color: #000000; background-color: #ffffff">
                    ${aTimeOffRequest.employeeName}
                </td>
                <td id="requestType_${aTimeOffRequest.id}" class="calendarTableEmployeeNameCell" style="color: #000000; background-color: #ffffff">
                    ${EzTimeOffType.ezEnumData(aTimeOffRequest.requestType).displayName}
                </td>
                <td id="requestStartDate_${aTimeOffRequest.id}" class="calendarTableEmployeeNameCell" style="color: #000000; background-color: #ffffff">
                    ${aTimeOffRequest.requestStartDate}
                </td>
                <td id="requestEndDate_${aTimeOffRequest.id}" class="calendarTableEmployeeNameCell" style="color: #000000; background-color: #ffffff">
                    ${aTimeOffRequest.requestEndDate}
                </td>
                <td id="requestStatus_${aTimeOffRequest.id}" class="calendarTableEmployeeNameCell" style="color: #db9393; background-color: #ffffff">
                    ${EzTimeOffStatus.ezEnumData(aTimeOffRequest.requestStatus).displayName}
                </td>
                <td id="submittedDate_${aTimeOffRequest.id}" class="calendarTableEmployeeNameCell" style="color: #000000; background-color: #ffffff">
                    ${aTimeOffRequest.submittedDate}
                </td>
                <td id="totalHours_${aTimeOffRequest.id}" class="calendarTableEmployeeNameCell" style="color: #000000; background-color: #ffffff">
                    ${aTimeOffRequest.totalHours}
                </td>
            </tr>`;
    }

    ezBuildDeniedTimeOffRequestHTML(timeOffRequest) {
        if (null == timeOffRequest) {
            throw new EzBadParamException(
                'timeOffRequest',
                EzViewTimeOffRenderer.ezInstance,
                EzViewTimeOffRenderer.ezInstance.ezBuildDeniedTimeOffRequestHTML);
        }

        timeOffRequest.data
            .sort(
                (timeOffRequestA, timeOffRequestB) => moment(timeOffRequestB.requestStartDate)
                    .isAfter(
                        moment(timeOffRequestA.requestStartDate)) ? 1 : -1)
            .forEach(
                (aTimeOffRequest) => {
                    let deniedTimeOffRequestHTML = EzWidgetAccountMode.EMPLOYER === EzViewTimeOffRenderer.ezInstance.ezWidgetAccountMode
                        ? EzViewTimeOffRenderer.ezInstance.ezBuildEmployerDeniedTimeOffRequestHTML(aTimeOffRequest)
                        : EzViewTimeOffRenderer.ezInstance.ezBuildEmployeeDeniedTimeOffRequestHTML(aTimeOffRequest);

                    ezApi.ezclocker.ezUi.ezAppendContent(
                        'deniedTimeOffRequestsBody',
                        deniedTimeOffRequestHTML);
                });
    }

    renderTimeOffRequests(timeOffsByRequestStatus) {
        if (!EzArray.arrayHasLength(timeOffsByRequestStatus)) {
            return;
        }

        if (0 === timeOffsByRequestStatus.filter(
            (timeOffRequest) => EzTimeOffStatus.PENDING === timeOffRequest.requestStatus).length) {
            ezApi.ezclocker.ezUi.ezHideElement('pendingRequestsHeader');

            ezApi.ezclocker.ezUi.ezHideElement('pendingTimeOffRequests');
        } else {
            ezApi.ezclocker.ezUi.ezShowElement('pendingRequestsHeader');

            ezApi.ezclocker.ezUi.ezShowElement('pendingTimeOffRequests');
        }

        if (0 === timeOffsByRequestStatus.filter(
            (timeOffRequest) => EzTimeOffStatus.APPROVED === timeOffRequest.requestStatus).length) {
            ezApi.ezclocker.ezUi.ezHideElement('approvedRequestsHeader');

            ezApi.ezclocker.ezUi.ezHideElement('approvedTimeOffRequests');
        } else {
            ezApi.ezclocker.ezUi.ezShowElement('approvedRequestsHeader');

            ezApi.ezclocker.ezUi.ezShowElement('approvedTimeOffRequests');
        }

        if (0 === timeOffsByRequestStatus.filter(
            (timeOffRequest) => EzTimeOffStatus.DENIED === timeOffRequest.requestStatus).length) {
            ezApi.ezclocker.ezUi.ezHideElement('deniedRequestsHeader');

            ezApi.ezclocker.ezUi.ezHideElement('deniedTimeOffRequests');
        } else {
            ezApi.ezclocker.ezUi.ezShowElement('deniedRequestsHeader');

            ezApi.ezclocker.ezUi.ezShowElement('deniedTimeOffRequests');
        }

        timeOffsByRequestStatus.forEach(
            (timeOffRequest) => {
                if (EzTimeOffStatus.PENDING === timeOffRequest.requestStatus) {
                    EzViewTimeOffRenderer.ezInstance.ezBuildPendingTimeOffRequestHTML(timeOffRequest);
                } else if (EzTimeOffStatus.APPROVED === timeOffRequest.requestStatus) {
                    EzViewTimeOffRenderer.ezInstance.ezBuildApprovedTimeOffRequestHTML(timeOffRequest);
                } else if (EzTimeOffStatus.DENIED === timeOffRequest.requestStatus) {
                    EzViewTimeOffRenderer.ezInstance.ezBuildDeniedTimeOffRequestHTML(timeOffRequest);
                }
            });
    }

    renderTimeOffTotals(totalsByEmployee, year) {
        if (!EzObject.isValid(year)) {
            throw new EzBadParamException(
                'year',
                EzViewTimeOffRenderer.ezInstance,
                EzViewTimeOffRenderer.ezInstance.renderTimeOffTotals);
        }

        ezApi.ezclocker.ezUi.ezAppendContent(
            'EzRequestTimeOffSummaryHeader',
            EzHtml.build`
                Total Time offs Approved for ${year}`);

        if (!EzArray.arrayHasLength(totalsByEmployee)) {
            return;
        }

        totalsByEmployee.forEach(
            (grandTotal) => {
                let requesteTimeTotals = '';
                grandTotal.totals.forEach(
                    (total) => {
                        requesteTimeTotals = EzHtml.build`${requesteTimeTotals}
                            <td id="mainrenderViewTimeOffTableData${grandTotal.id}" class="calendarTableScheduleCell" style="background-color: #ffffff;width: 300px">
                                <div id="mainrenderViewTimeOffTableDataDiv${grandTotal.id}" class="scheduleBlock requestTimeOffCell" style="margin: 0;background-color: #ffffff;border: none">
                                    <table class="scheduleBlockTitle" style="border-spacing: 5px;">
                                        <tr class="requestTimeOffTableRow">
                                            <td id="mainrenderViewTimeOffTableDataTd${grandTotal.id}" class="ezLeftAlign"
                                                style="color:black;">
                                                <div style="font-weight: 700;font-size: 16px;">${EzTimeOffType.ezEnumData(total.requestType).displayName}</div>
                                            </td>
                                        </tr>
                                        <tr class="requestTimeOffTableRow" style="height:20px;background-color: #ffc500">
                                            <td id="mainrenderViewTimeOffTableDataTotalTimeOffBank${grandTotal.id}" class="scheduleBlockTitleCell ezLeftAlign"
                                                style="background-color:#ffc500; color:black; text-align:center;border: 1px solid black;">
                                                <div style="font-size: 16px;margin: 1px;">Used: ${total.total} hrs</div>
                                            </td>
                                        </tr>
                                    ${total.timeOffBankBalance >= 0 &&
                            ('<tr class="requestTimeOffTableRow" style="height:20px;background-color: #ffc500">' +
                                ' <td id="mainrenderViewTimeOffTableDataTotalTimeOffBankBalance{grandTotal.id}" class="scheduleBlockTitleCell ezLeftAlign"' +
                                'style="background-color:#ffc500; color:black; text-align:center;border: 1px solid black;"> ' +
                                '<div style="font-size: 16px;margin: 1px;">Balance: ' + total.timeOffBankBalance + ' hrs</div>' +
                                '</td></tr>') || '<tr class="requestTimeOffTableRow" style="height:20px;background-color: #ffc500"></tr>'}
                                    </table>

                                </div>
                            </td>`;
                    });

                ezApi.ezclocker.ezUi.ezAppendContent(
                    'summaryTimeOffRequestsofEmployeesBody',
                    EzHtml.build`
                        <tr id="summaryTimeOffRequestsofEmployeesTableRow${grandTotal.id}" style="background-color: #ffc500;width: 300px">
                            <td id="employee_name_${grandTotal.id}" class="calendarTableEmployeeNameCell" style="text-align:center;">
                                ${grandTotal.employeeName}
                            </td>
                            ${requesteTimeTotals}
                        </tr>`);
            });
    }
}
