import {EzClass} from "../../ezlibrary/EzClass";
import {EzObject} from "../../ezlibrary/helpers/EzObject";
import {EzBoolean} from "../../ezlibrary/helpers/EzBoolean";
import {EzRegistrationState} from "../../ezlibrary/enums/EzRegistrationState";
import {EzDateTime} from "../../public/javascript/common/ez-date-time";
import {EzUI} from "../../public/javascript/common/ezui";
import {EzHtml} from "../../ezlibrary/helpers/EzHtml";


export class EzSupportViewRenderer extends EzClass {
    /**
     @static
     @public @readonly @property
     Returns the name of this class's singleton instance when registered with ezApi.
     @returns {string}
     */
    static get ezApiName() {
        return 'ezSupportViewRenderer';
    }

    /**
     @static
     @public @readonly @property
     Returns an object of event names that this class may trigger.
     @returns {object}
     */
    static get ezEventNames() {
        return {
            onReady: 'ezOn_EzSupportViewRenderer_Ready'
        };
    }

    /**
     @static
     @private @field
     Stores the singleton instance of this class that was created by and registerd with EzApi.
     @type {EzSupportViewRenderer}
     */
    static #ezInstance = EzObject.hasProperty(globalThis, 'ezApi') &&
    EzObject.isValid(globalThis.ezApi) && EzBoolean.isTrue(globalThis.ezApi.ready) &&
    EzObject.isValid(globalThis.ezApi.ezclocker[EzSupportViewRenderer.ezApiName])
        ? globalThis.ezApi.ezclocker[EzSupportViewRenderer.ezApiName]
        : null;

    /**
     @static
     @public @property @getter
     Returns the singleton instance of this class that is registered with EzApi (if available yet)
     @returns {EzSupportViewRenderer}
     */
    static get ezInstance() {
        return EzSupportViewRenderer.#ezInstance;
    }

    /**
     @static
     @public @property @setter
     Sets the singleton instance of this class that is registered with EzApi.
     @param {EzSupportViewRenderer} instance
     */
    static set ezInstance(instance) {
        if (null != EzSupportViewRenderer.#ezInstance) {
            throw new Error('EzSupportViewRenderer\'s singleton instance is already registered with EzApi.');
        }

        EzSupportViewRenderer.#ezInstance = instance;
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
    EzObject.isValid(globalThis.ezApi.ezclocker[EzSupportViewRenderer.ezApiName])
        ? EzRegistrationState.REGISTERED
        : null;

    /**
     @static
     @public @property @getter
     Returns the ezApi registration state of this classes' singleton instance.
     @returns {string}
     A valid enum property value from EzRegistrationState
     */
    static get ezApiRegistrationState() {
        return EzSupportViewRenderer.#ezApiRegistrationState;
    }

    /**
     @static
     @public @property @setter
     Sets the ezApi registration state of this classes' singleton instance.
     @param {string} ezApiRegistrationState
     A valid enum property value from EzRegistrationState
     */
    static set ezApiRegistrationState(ezApiRegistrationState) {
        EzSupportViewRenderer.#ezApiRegistrationState = EzRegistrationState.ezValueOf(ezApiRegistrationState);
    }

    /**
     @static
     @private @readonly @property
     Returns true when all required dependencies for this class report ready.
     In otherwords, the required dependency's singleton instance is created
     and is registered with and accessable from EzApi with ezApi.ezclocker.{dependency_name}.
     @returns {boolean}
     */
    static get #ezCanRegister() {
        return EzRegistrationState.PENDING === EzSupportViewRenderer.ezApiRegistrationState &&
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
        return null != EzSupportViewRenderer.ezInstance &&
            EzRegistrationState.REGISTERED === EzSupportViewRenderer.ezApiRegistrationState;
    }

    /**
     @static
     @private @method
     Attempts to register the singleton instance for this class with ezApi. Returns true
     if successful, false otherwise.
     @returns {boolean}
     */
    static #ezRegistrator() {
        if (EzSupportViewRenderer.#ezCanRegister && !EzSupportViewRenderer.#ezIsRegistered) {
            globalThis.ezApi.ezRegisterNewApi(EzSupportViewRenderer, EzSupportViewRenderer.ezApiName);
        }

        return EzSupportViewRenderer.#ezIsRegistered;
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
        if (!EzSupportViewRenderer.#ezIsRegistered) {
            EzSupportViewRenderer.ezApiRegistrationState = EzRegistrationState.PENDING;

            if (!EzSupportViewRenderer.#ezRegistrator()) {
                document.addEventListener(
                    EzSupportViewRenderer.ezOnEzApiReadyEventName,
                    () => {
                        if (!EzSupportViewRenderer.#ezRegistrator()) {

                            document.addEventListener(
                                EzDateTime.ezEventNames.onReady,
                                EzSupportViewRenderer.#ezRegistrator);

                            document.addEventListener(
                                EzUI.ezEventNames.onReady,
                                EzSupportViewRenderer.#ezRegistrator);
                        }
                    });
            }
        }
    }

    /**
     @public @constructor
     >> DO NOT CREATE NEW INSTANCES OUTSIDE THE STATIC INITIALIZATION FLOW <<
     Use the static singleton instance available from ezApi: ezApi.ezclocker.EzSupportViewRenderer.
     */
    constructor() {
        super();
    }

    /**
     * @protected
     * Initializes EzScheduleRenderer
     */
    ezInit() {
        EzSupportViewRenderer.ezInstance.clearErrorValidationElements();
        EzSupportViewRenderer.ezInstance.hideErrorValidationElements();
        EzSupportViewRenderer.ezInstance.hideWarningValidationElements();
        EzSupportViewRenderer.ezInstance.clearWarningValidationElements();
        return EzSupportViewRenderer.ezInstance;
    }

    hideErrorValidationElements() {
        let element = ezApi.ezclocker.ezUi.ezFindByElementOrId('basicUserLookBasicInformation_ValidationError_Submit_div');
        element.style.display = 'block';
        element = ezApi.ezclocker.ezUi.ezFindByElementOrId('lookupEmployeeByMobilePhoneButton_ValidationError_Submit_div');
        element.style.display = 'block';
        element = ezApi.ezclocker.ezUi.ezFindByElementOrId('lookupUserSubscriptionButton_ValidationError_Submit_div');
        element.style.display = 'block';
        element = ezApi.ezclocker.ezUi.ezFindByElementOrId('lookUpArchiveEmployeeButton_ValidationError_Submit_div');
        element.style.display = 'block';
        element = ezApi.ezclocker.ezUi.ezFindByElementOrId('deleteUserAccountButton_ValidationError_Submit_Div');
        element.style.display = 'block';
        element = ezApi.ezclocker.ezUi.ezFindByElementOrId('changeBillingProviderButton_ValidationError_Submit_div');
        element.style.display = 'block';
        element = ezApi.ezclocker.ezUi.ezFindByElementOrId('timeEntriesButton_ValidationError_Submit_Div');
        element.style.display = 'block';
        element = ezApi.ezclocker.ezUi.ezFindByElementOrId('createEmployeeLinkBasicInformationButton_ValidationError_Submit_Div');
        element.style.display = 'block';
        element = ezApi.ezclocker.ezUi.ezFindByElementOrId('reactivateEmployerIdButton_ValidationError_Submit_div');
        element.style.display = 'block';
        ezApi.ezclocker.ezUi.ezHideElement('basicUserLookBasicInformation_ValidationError');

        ezApi.ezclocker.ezUi.ezHideElement('lookupEmployeeByMobilePhoneButton_ValidationError');

        ezApi.ezclocker.ezUi.ezHideElement('lookupUserSubscriptionButton_ValidationError');

        ezApi.ezclocker.ezUi.ezHideElement('lookUpArchiveEmployeeButton_ValidationError');

        ezApi.ezclocker.ezUi.ezHideElement('deleteUserAccountButton_ValidationError');

        ezApi.ezclocker.ezUi.ezHideElement('createEmployeeLinkBasicInformationButton_ValidationError');

        ezApi.ezclocker.ezUi.ezHideElement('timeEntriesInformationButton_ValidationError');

        ezApi.ezclocker.ezUi.ezHideElement('changeBillingProviderButton_ValidationError');

        ezApi.ezclocker.ezUi.ezHideElement('reactivateEmployerIdButton_ValidationError');

    }

    clearErrorValidationElements() {
        ezApi.ezclocker.ezUi.ezClearContent('basicUserLookBasicInformation_ValidationError');

        ezApi.ezclocker.ezUi.ezClearContent('lookupEmployeeByMobilePhoneButton_ValidationError');

        ezApi.ezclocker.ezUi.ezClearContent('lookUpArchiveEmployeeButton_ValidationError');

        ezApi.ezclocker.ezUi.ezClearContent('lookupUserSubscriptionButton_ValidationError');

        ezApi.ezclocker.ezUi.ezClearContent('deleteUserAccountButton_ValidationError');

        ezApi.ezclocker.ezUi.ezClearContent('createEmployeeLinkBasicInformationButton_ValidationError');

        ezApi.ezclocker.ezUi.ezClearContent('timeEntriesInformationButton_ValidationError');

        ezApi.ezclocker.ezUi.ezClearContent('changeBillingProviderButton_ValidationError');

        ezApi.ezclocker.ezUi.ezClearContent('reactivateEmployerIdButton_ValidationError');
    }

    hideWarningValidationElements() {
        let element = ezApi.ezclocker.ezUi.ezFindByElementOrId('basicUserLookBasicInformation_ResponseWarning');
        element.style.display = 'block';
        element = ezApi.ezclocker.ezUi.ezFindByElementOrId('lookupEmployeeByMobilePhoneButton_ResponseWarning');
        element.style.display = 'block';
        element = ezApi.ezclocker.ezUi.ezFindByElementOrId('lookupUserSubscriptionButton_ResponseWarning');
        element.style.display = 'block';
        element = ezApi.ezclocker.ezUi.ezFindByElementOrId('lookUpArchiveEmployeeButton_ResponseWarning');
        element.style.display = 'block';
        element = ezApi.ezclocker.ezUi.ezFindByElementOrId('deleteUserAccountButton_ValidationError_Submit_Div');
        element.style.display = 'block';
        element = ezApi.ezclocker.ezUi.ezFindByElementOrId('createEmployeeLinkBasicInformationButton_ValidationError_Submit_Div');
        element.style.display = 'block';
        element = ezApi.ezclocker.ezUi.ezFindByElementOrId('changeBillingProviderButton_ValidationError_Submit_div');
        element.style.display = 'block';
        element = ezApi.ezclocker.ezUi.ezFindByElementOrId('timeEntriesButton_ValidationError_Submit_Div');
        element.style.display = 'block';
        element = ezApi.ezclocker.ezUi.ezFindByElementOrId('reactivateEmployerIdButton_ValidationError_Submit_div');
        element.style.display = 'block';
        ezApi.ezclocker.ezUi.ezHideElement('basicUserLookBasicInformation_ResponseWarning');

        ezApi.ezclocker.ezUi.ezHideElement('lookupEmployeeByMobilePhoneButton_ResponseWarning');

        ezApi.ezclocker.ezUi.ezHideElement('lookupUserSubscriptionButton_ResponseWarning');

        ezApi.ezclocker.ezUi.ezHideElement('lookUpArchiveEmployeeButton_ResponseWarning');

    }

    clearWarningValidationElements() {
        ezApi.ezclocker.ezUi.ezClearContent('basicUserLookBasicInformation_ValidationWarning');

        ezApi.ezclocker.ezUi.ezClearContent('lookupEmployeeByMobilePhoneButton_ValidationWarning');

        ezApi.ezclocker.ezUi.ezClearContent('lookUpArchiveEmployeeButton_ValidationWarning');

        ezApi.ezclocker.ezUi.ezClearContent('lookupUserSubscriptionButton_ValidationWarning');

    }

    /**
     * @public @method
     * Display the provided error message
     * @param {string} message
     */
    ezDisplayErrorComponent(elementIdOrClass, message) {
        let element = ezApi.ezclocker.ezUi.ezFindByElementOrId(elementIdOrClass);
        ezApi.ezclocker.ezUi.ezSetContent(elementIdOrClass, message);
        ezApi.ezclocker.ezUi.ezShowElement(elementIdOrClass, 'flex');
    }

    /**
     * @public @method
     * Display the provided error message
     * @param {string} message
     */
    ezDisplayWarningComponent(elementIdOrClass, message) {
        let element = ezApi.ezclocker.ezUi.ezFindByElementOrId(elementIdOrClass);
        ezApi.ezclocker.ezUi.ezSetContent(elementIdOrClass, message);
        ezApi.ezclocker.ezUi.ezShowElement(elementIdOrClass, 'flex');
    }

    clearResultsTable() {
        EzSupportViewRenderer.ezInstance.clearErrorValidationElements();
        EzSupportViewRenderer.ezInstance.hideErrorValidationElements();
        EzSupportViewRenderer.ezInstance.hideWarningValidationElements();
        EzSupportViewRenderer.ezInstance.clearWarningValidationElements();
        ezApi.ezclocker.ezUi.ezClearContent('userInformationResultsTableBodyId');

        ezApi.ezclocker.ezUi.ezClearContent('lookupEmployeeByMobilePhoneResultsTableBodyId');

        ezApi.ezclocker.ezUi.ezClearContent('lookupUserSubscriptionResultsTableBodyId');

        ezApi.ezclocker.ezUi.ezClearContent('lookUpArchiveEmployeeResultsTableBodyId');

        ezApi.ezclocker.ezUi.ezClearContent('deleteUserAccountResultsTableBodyId');

        ezApi.ezclocker.ezUi.ezClearContent('createEmployeeLinkResultsTableBodyId');

        ezApi.ezclocker.ezUi.ezClearContent('createEmployeeLinkResultsTableBodyId');

        ezApi.ezclocker.ezUi.ezClearContent('timeEntriesResultsTableBodyId');

        ezApi.ezclocker.ezUi.ezClearContent('changeBillingProviderResultsId');

        ezApi.ezclocker.ezUi.ezClearContent('reactivateEmployerIdResultsId');

    }

    renderLookupBasicInformationTable(
        response,
        tableBodyId = 'userInformationResultsTableBodyId',
        responseWarningElementId = 'basicUserLookBasicInformation_ResponseWarning',
        requestType = 'LOOKUP_USER'
    ) {
        EzSupportViewRenderer.ezInstance.clearResultsTable();
        let userInformationResultsTableHTML = '';
        if (response && response.length > 0) {
            response.forEach(
                (res, index) => {
                    if (index <= 19) {
                        if (requestType === 'LOOKUP_USER') {
                            userInformationResultsTableHTML = userInformationResultsTableHTML + EzSupportViewRenderer.ezInstance.ezBuildLookupTableHtml(res, index);
                        } else if (requestType === 'LOOKUP_EMPLOYEE') {
                            userInformationResultsTableHTML = userInformationResultsTableHTML + EzSupportViewRenderer.ezInstance.ezBuildEmployeeLookUpByPhoneTableHtml(res, index);
                        } else if (requestType === 'LOOKUP_USER_SUBSCRIPTION') {
                            userInformationResultsTableHTML = userInformationResultsTableHTML + EzSupportViewRenderer.ezInstance.ezBuildUserSubscriptionLookupTableHtml(res, index);
                        } else if (requestType === 'LOOKUP_ARCHIVE_EMPLOYEE') {
                            userInformationResultsTableHTML = userInformationResultsTableHTML + EzSupportViewRenderer.ezInstance.ezBuildArchiveLookupTableHtml(res, index);
                        } else if (requestType === 'LOOKUP_TIME_ENTRIES') {
                            userInformationResultsTableHTML = userInformationResultsTableHTML + EzSupportViewRenderer.ezInstance.ezBuildTimeEntriesLookupTableHtml(res, index);
                        }
                    }
                }
            );

            ezApi.ezclocker.ezUi.ezAppendContent(tableBodyId, userInformationResultsTableHTML);

            if (response.length > 20) {
                EzSupportViewRenderer.ezInstance.ezDisplayWarningComponent(responseWarningElementId, 'Found more than 20 records! Please refine your search criteria.');
            }


        } else {
            if (requestType === 'LOOKUP_USER') {
                userInformationResultsTableHTML = userInformationResultsTableHTML + EzSupportViewRenderer.ezInstance.ezBuildEmptyTableHtml(4);
            } else if (requestType === 'LOOKUP_EMPLOYEE') {
                userInformationResultsTableHTML = userInformationResultsTableHTML + EzSupportViewRenderer.ezInstance.ezBuildEmptyTableHtml(3);
            } else if (requestType === 'LOOKUP_USER_SUBSCRIPTION') {
                userInformationResultsTableHTML = userInformationResultsTableHTML + EzSupportViewRenderer.ezInstance.ezBuildEmptyTableHtml(6);
            } else if (requestType === 'LOOKUP_ARCHIVE_EMPLOYEE') {
                userInformationResultsTableHTML = userInformationResultsTableHTML + EzSupportViewRenderer.ezInstance.ezBuildEmptyTableHtml(5);
            } else if (requestType === 'LOOKUP_TIME_ENTRIES') {
                userInformationResultsTableHTML = userInformationResultsTableHTML + EzSupportViewRenderer.ezInstance.ezBuildEmptyTableHtml(8);
            }

            ezApi.ezclocker.ezUi.ezAppendContent(tableBodyId, userInformationResultsTableHTML);
        }
    }

    ezBuildEmptyTableHtml(colspan = 4) {
        return EzHtml.build`
            <tr
                id="SUPPORT_VIEW_EMPTY_ROW" style="background-color: #ffffff;text-align: center">
                <td
                    id="empty_COL_UserName"
                    colspan="${colspan}"
                    class="calendarTableEmployeeNameCell"
                    style="width: 330px; color: #000000;">
                    No record found.
                </td>
            </tr>`;
    }

    ezBuildLookupTableHtml(lookUpData, index) {

        const bgColor = (index % 2) !== 0 ? '#d3d3d3' : '#ffffff';

        return EzHtml.build`
            <tr
                id="${lookUpData.id}_ROW" style="background-color: ${bgColor};text-align: center">
                <td
                    id="${lookUpData.id}_COL_UserName"
                    class="calendarTableEmployeeNameCell"
                    style="width: 330px; color: #000000;">
                    ${lookUpData.userName}
                </td>
                <td
                    id="${lookUpData.id}_COL_Type"
                    class="calendarTableEmployeeNameCell"
                    style="color: #000000;">
                    ${lookUpData.authorityRole}
                </td>
                <td
                    id="${lookUpData.id}_COL_StartDate"
                    class="calendarTableEmployeeNameCell"
                    style="color: #000000;">
                    ${lookUpData.employerId}
                </td>
                <td
                    id="${lookUpData.id}_COL_EndDate"
                    class="calendarTableEmployeeNameCell"
                    style="color: #000000;">
                    ${lookUpData.employeeId}
                </td>
            </tr>`;

    }

    ezBuildUserSubscriptionLookupTableHtml(lookUpData, index) {

        const bgColor = (index % 2) !== 0 ? '#d3d3d3' : '#ffffff';

        return EzHtml.build`
            <tr
                id="${lookUpData.id}_ROW" style="background-color: ${bgColor};text-align: center">
                <td
                    id="${lookUpData.id}_COL_UserName"
                    class="calendarTableEmployeeNameCell"
                    style="width: 330px; color: #000000;">
                    ${lookUpData.userName}
                </td>
                <td
                    id="${lookUpData.id}_COL_Type"
                    class="calendarTableEmployeeNameCell"
                    style="color: #000000;">
                    ${lookUpData.employerId}
                </td>
                <td
                    id="${lookUpData.id}_COL_StartDate"
                    class="calendarTableEmployeeNameCell"
                    style="color: #000000;">
                    ${lookUpData.subscriptionPlan}
                </td>
                <td
                    id="${lookUpData.id}_COL_EndDate"
                    class="calendarTableEmployeeNameCell"
                    style="color: #000000;">
                    ${lookUpData.subscriptionBillingProvider}
                </td>
                <td
                    id="${lookUpData.id}_COL_StartDate"
                    class="calendarTableEmployeeNameCell"
                    style="color: #000000;">
                    ${lookUpData.subscriptionExpiryDateString}
                </td>
                <td
                    id="${lookUpData.id}_COL_EndDate"
                    class="calendarTableEmployeeNameCell"
                    style="color: #000000;">
                    ${lookUpData.isSubscriptionCanceled}
                </td>
            </tr>`;

    }

    ezBuildEmployeeLookUpByPhoneTableHtml(lookUpData, index) {

        const bgColor = (index % 2) !== 0 ? '#d3d3d3' : '#ffffff';

        return EzHtml.build`
            <tr
                id="${lookUpData.id}_ROW" background-color: ${bgColor}>
                <td
                    id="${lookUpData.id}_COL_UserName"
                    class="calendarTableEmployeeNameCell"
                    style="width: 330px; color: #000000;">
                    ${lookUpData.userName}
                </td>
                <td
                    id="${lookUpData.id}_COL_Type"
                    class="calendarTableEmployeeNameCell"
                    style="color: #000000;">
                    ${lookUpData.employeeName}
                </td>
                <td
                    id="${lookUpData.id}_COL_EndDate"
                    class="calendarTableEmployeeNameCell"
                    style="color: #000000;">
                    ${lookUpData.employeeId}
                </td>
            </tr>`;

    }

    ezBuildArchiveLookupTableHtml(lookUpData, index) {
        const bgColor = (index % 2) !== 0 ? '#d3d3d3' : '#ffffff';

        return EzHtml.build`
            <tr
                id="${lookUpData.id}_ROW" background-color: ${bgColor}>
                <td
                    id="${lookUpData.id}_COL_UserName"
                    class="calendarTableEmployeeNameCell"
                    style="width: 330px; color: #000000;">
                    ${lookUpData.userName}
                </td>
                <td
                    id="${lookUpData.id}_COL_Type"
                    class="calendarTableEmployeeNameCell"
                    style="color: #000000;">
                    ${lookUpData.employeeName}
                </td>
                <td
                    id="${lookUpData.id}_COL_EndDate"
                    class="calendarTableEmployeeNameCell"
                    style="color: #000000;">
                    ${lookUpData.internalArchivedEmployeeId}
                </td>
                <td
                    id="${lookUpData.id}_COL_UserName"
                    class="calendarTableEmployeeNameCell"
                    style="width: 330px; color: #000000;">
                    ${lookUpData.internalArchivedEmployeeUserId}
                </td>
                <td
                    id="${lookUpData.id}_COL_Type"
                    class="calendarTableEmployeeNameCell"
                    style="color: #000000;">
                    ${lookUpData.internalArchivedOldEmployeeId}
                </td>
            </tr>`;
    }

    ezBuildTimeEntriesLookupTableHtml(lookUpData, index) {
        const bgColor = (index % 2) !== 0 ? '#d3d3d3' : '#ffffff';

        return EzHtml.build`
            <tr
                id="${lookUpData.id}_ROW" background-color: ${bgColor}>
                <td
                    id="${lookUpData.id}_COL_EmployerId"
                    class="calendarTableEmployeeNameCell"
                    style="width: 330px; color: #000000;">
                    ${lookUpData.employerId}
                </td>
                <td
                    id="${lookUpData.id}_COL_EmployeeId"
                    class="calendarTableEmployeeNameCell"
                    style="color: #000000;">
                    ${lookUpData.employeeId}
                </td>
                <td
                    id="${lookUpData.id}_COL_TimeEntityType"
                    class="calendarTableEmployeeNameCell"
                    style="color: #000000;">
                    ${lookUpData.timeEntryType}
                </td>
                <td
                    id="${lookUpData.id}_COL_IsActiveClockIn"
                    class="calendarTableEmployeeNameCell"
                    style="width: 330px; color: #000000;">
                    ${lookUpData.isActiveClockIn}
                </td>
                <td
                    id="${lookUpData.id}_COL_IsActiveBreak"
                    class="calendarTableEmployeeNameCell"
                    style="color: #000000;">
                    ${lookUpData.isActiveBreak}
                </td>
                <td
                    id="${lookUpData.id}_COL_ClockInIso"
                    class="calendarTableEmployeeNameCell"
                    style="color: #000000;">
                    ${lookUpData.clockInIso}
                </td>
                <td
                    id="${lookUpData.id}_COL_ClockOutIso"
                    class="calendarTableEmployeeNameCell"
                    style="color: #000000;">
                    ${lookUpData.clockOutIso}
                </td>
                <td
                    id="${lookUpData.id}_COL_clockInDateTimeZone"
                    class="calendarTableEmployeeNameCell"
                    style="color: #000000;">
                    ${lookUpData.clockInDateTimeZone}
                </td>
            </tr>`;
    }
}