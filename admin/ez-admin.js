import {
    EzObject,
    EzBoolean,
    EzNumber,
    EzString,
    EzArray,
    EzHtml,
    EzJson,
    EzUrl,
    EzPromise
} from '/ezlibrary/helpers/EzHelpers.js';

import { EzClass } from '/ezlibrary/EzClass.js';

import {
    EzRegistrationState,
    EzElementEventName
} from '/ezlibrary/enums/EzEnumerations.js';

import { EzEventEngine } from '/ezlibrary/ez-event-engine.js';

import { EzUx } from '/ezlibrary/ux/EzUx.js';
import { EzUI } from '/public/javascript/common/ezui.js';

import { EzServices } from '/public/javascript/common/ez-services.js';

import { EzHttpHelper } from '/public/javascript/common/ezclocker-http-helper.js';

import { EzRecycledEmployeeAdminActions } from '/admin/EzRecycledEmployeeAdminActions.js';

/**
    @class
    @extends {EzClass}
    @description
    Provides Administration actions
    ---------------------------------------------------------------------
    Import with:
        import { EzAdminViewController } from '/admin/ez-admin.js';
    ---------------------------------------------------------------------
    Ready Check:
        globalThis.ezApi.ezclocker[EzAdminViewController.ezApiName] &&
        globalThis.ezApi.ezclocker[EzAdminViewController.ezApiName].ready
    ---------------------------------------------------------------------
    Listen for Ready Event:
        document.addEventListener(
            EzAdminViewController.ezEventNames.onReady,
            this.#ezRegistrator);
    ---------------------------------------------------------------------
 */
export class EzAdminViewController extends EzClass {
    /**
     * @static
     * @public @readonly @property
     * Returns the name of this class's singleton instance when registered with ezApi.
     * @returns {string}
     */
    static get ezApiName() {
        return 'ezAdminViewController';
    }

    /**
     * @static
     * @public @readonly @property
     * Returns an object of event names that this class may trigger.
     * @returns {object}
     */
    static get ezEventNames() {
        return {
            onReady: 'ezOn_EzAdminViewController_Ready',
        };
    }

    /**
     * @static
     * @private @field
     * Stores the singleton instance of this class that was created by and registerd with EzApi.
     * @type {EzAdminViewController}
     */
    static #ezInstance = EzObject.hasProperty(globalThis, 'ezApi') &&
        EzObject.isValid(globalThis.ezApi) && EzBoolean.isTrue(globalThis.ezApi.ready) &&
        EzObject.isValid(globalThis.ezApi.ezclocker[EzAdminViewController.ezApiName])
        ? globalThis.ezApi.ezclocker[EzAdminViewController.ezApiName]
        : null;
    /**
     * @static
     * @public @property @getter
     * Returns the singleton instance of this class that is registered with EzApi (if available yet)
     * @returns {EzAdminViewController}
     */
    static get ezInstance() {
        return EzAdminViewController.#ezInstance;
    }
    /**
     * @static
     * @public @property @setter
     * Sets the singleton instance of of this class that is registered with EzApi.
     * @param {EzAdminViewController} instance
     */
    static set ezInstance(instance) {
        if (null != EzAdminViewController.#ezInstance) {
            throw new Error('EzAdminViewController\'s singleton instance is already reigstered with EzApi.');
        }

        EzAdminViewController.#ezInstance = instance;
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
        EzObject.isValid(globalThis.ezApi.ezclocker[EzAdminViewController.ezApiName])
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
        return EzAdminViewController.#ezApiRegistrationState;
    }
    /**
     * @static
     * @public @property @setter
     * Sets the ezApi registration state of this classes's singleton instance.
     * @param {string} ezApiRegistrationState
     * A valid enum property value from EzRegistrationState
     */
    static set ezApiRegistrationState(ezApiRegistrationState) {
        EzAdminViewController.#ezApiRegistrationState = EzRegistrationState.ezValueOf(ezApiRegistrationState);
    }

    /**
     * @public @static @readonly @property
     * @returns {boolean}
     */
    static get #ezCanRegister() {
        return EzRegistrationState.PENDING === EzAdminViewController.ezApiRegistrationState &&
            Object.hasOwn(globalThis, 'ezApi') &&
            globalThis['ezApi'] && globalThis['ezApi'].ready &&

            globalThis.ezApi.ezclocker[EzEventEngine.ezApiName] &&
            globalThis.ezApi.ezclocker[EzEventEngine.ezApiName].ready &&

            globalThis.ezApi.ezclocker[EzServices.ezApiName] &&
            globalThis.ezApi.ezclocker[EzServices.ezApiName].ready &&

            globalThis.ezApi.ezclocker[EzUI.ezApiName] &&
            globalThis.ezApi.ezclocker[EzUI.ezApiName].ready &&

            globalThis.ezApi.ezclocker[EzHttpHelper.ezApiName] &&
            globalThis.ezApi.ezclocker[EzHttpHelper.ezApiName].ready &&

            globalThis.ezApi.ezclocker[EzRecycledEmployeeAdminActions.ezApiName] &&
            globalThis.ezApi.ezclocker[EzRecycledEmployeeAdminActions.ezApiName].ready;
    }

    /**
     * @static
     * @private @readonly @property
     * Returns if this class's singleton instance is registered with ezApi yet.
     * @returns {boolean}
     */
    static get #ezIsRegistered() {
        return null != EzAdminViewController.ezInstance &&
            EzRegistrationState.REGISTERED === EzAdminViewController.ezApiRegistrationState;
    }

    /**
     * @static
     * @private @method
     * Attempts to register the singleton instance for this class with ezApi. Returns true
     * if successful, false otherwise.
     * @returns {boolean}
     */
    static #ezRegistrator() {
        if (EzAdminViewController.#ezCanRegister && !EzAdminViewController.#ezIsRegistered) {

            globalThis.ezApi.ezRegisterNewApi(
                EzAdminViewController,
                EzAdminViewController.ezApiName,
                null,
                [
                    EzAdminViewController.ezShortApiName
                ]);
        }

        return EzAdminViewController.#ezIsRegistered;
    }

    /**
     * @static
     * Static Initialization
     * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
     * >> IMPORTANT <<
     * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
     * Make sure the following properties and methods get defined BEFORE this static initialization section:
     *     1) Property getter EzAdminViewController.ezApiName
     *     2) Property getter EzAdminViewController.ezEventNames
     *     3) Property getter EzAdminViewController.ezInstance
     *     4) Property setter EzAdminViewController.ezInstance
     *     5) Property getter EzAdminViewController.ezApiRegistrationState
     *     6) Property setter EzAdminViewController.ezApiRegistrationState
     *     7) Property getter EzAdminViewController.#ezCanRegister
     *     8) Property getter EzAdminViewController.#ezIsRegistered
     *     9) Method EzAdminViewController.#ezRegistrator()
     */
    static {
        if (!EzAdminViewController.#ezIsRegistered) {
            EzAdminViewController.ezApiRegistrationState = EzRegistrationState.PENDING;

            document.addEventListener(
                'onEzApiReady',
                () => {
                    if (!EzAdminViewController.#ezRegistrator()) {
                        document.addEventListener(
                            EzEventEngine.ezEventNames.onReady,
                            EzAdminViewController.#ezRegistrator);

                        document.addEventListener(
                            EzServices.ezEventNames.onReady,
                            EzAdminViewController.#ezRegistrator);

                        document.addEventListener(
                            EzUI.ezEventNames.onReady,
                            EzAdminViewController.#ezRegistrator);

                        document.addEventListener(
                            EzHttpHelper.ezEventNames.onReady,
                            EzAdminViewController.#ezRegistrator);

                        document.addEventListener(
                            EzRecycledEmployeeAdminActions.ezEventNames.onReady,
                            EzAdminViewController.#ezRegistrator);
                    }
                });
        }
    }

    ezHijackedAccounts = [];

    ezActiveHijackedAccount = null;

    ezHijackedUser = null;

    get ezIds() {
        return {
            containers: {
                ezSwapPasswordResultsId: 'EzSwapPasswordResults'
            },
            buttons: {
                ezSwapPasswordButtonId: 'EzSwapPasswordButton',
                ezRestoreHijackButtonId: 'EzRestoreHijackButton',
                ezViewRecycledEmployeesButtonId: 'EzViewRecycledEmployeesButton',
                ezRestoreRecycledEmployeeButtonId: 'EzRestoreRecycledEmployeeButton',
                ezUnlockUserAccountButtonId: 'EzUnlockUserAccountButton'
            },
            inputs: {
                ezSwapPasswordUsernameInputId: 'EzSwapPasswordAccountUserName'
            }
        };
    }

    /**
     * @protected @method
     * Initializes the EzAdminViewController
     * @returns {EzAdminViewController}
     */
    ezInit() {
        ezApi.ezclocker.ezEventEngine.ezWantElementEvent(
            EzAdminViewController.ezInstance.ezIds.buttons.ezSwapPasswordButtonId,
            EzElementEventName.CLICK,
            EzAdminViewController.ezApiName,
            EzAdminViewController.ezInstance.ezSwapPasswordForUser);

        ezApi.ezclocker.ezEventEngine.ezWantElementEvent(
            EzAdminViewController.ezInstance.ezIds.buttons.ezRestoreHijackButtonId,
            EzElementEventName.CLICK,
            EzAdminViewController.ezApiName,
            EzAdminViewController.ezInstance.ezReleaseNormalHijack);

        ezApi.ezclocker.ezEventEngine.ezWantElementEvent(
            EzAdminViewController.ezInstance.ezIds.buttons.ezUnlockUserAccountButtonId,
            EzElementEventName.CLICK,
            EzAdminViewController.ezApiName,
            EzAdminViewController.ezInstance.ezUnlockUserAccount);

        EzAdminViewController.ezInstance.ezRefreshSwapHijackState();

        return EzAdminViewController.ezInstance;
    }

    /**
     * @public @method
     * Handles Collapse Group Content button click
     * @param {string} baseButtonId
     * @param {string} groupContentId
     */
    ezHandleCollapseGroupContentButtonClick(baseButtonId, groupContentId) {
        if (!EzString.hasLength(baseButtonId) || !EzString.hasLength(groupContentId)) {
            return;
        }

        ezApi.ezclocker.ezUi.ezRemoveElementClass(
            groupContentId,
            'animate__slideInDown');

        ezApi.ezclocker.ezUi.ezAddElementClass(
            groupContentId,
            'animate__slideOutUp');

        EzUx.hide(groupContentId);

        EzUx.hide(`${baseButtonId}_Collapse`);

        EzUx.show(`${baseButtonId}_Expand`);
    }

    /**
     * @public @method
     * Handles Expand Group Content button click
     * @param {string} baseButtonId
     * @param {string} groupContentId
     */
    ezHandleExpandGroupContentButtonClick(baseButtonId, groupContentId) {
        if (!EzString.hasLength(baseButtonId) || !EzString.hasLength(groupContentId)) {
            return;
        }

        ezApi.ezclocker.ezUi.ezRemoveElementClass(
            groupContentId,
            'animate__slideOutUp');

        ezApi.ezclocker.ezUi.ezAddElementClass(
            groupContentId,
            'animate__slideInDown');

        EzUx.show(groupContentId);

        EzUx.hide(`${baseButtonId}_Expand`);

        EzUx.show(`${baseButtonId}_Collapse`);
    }

    /**
     * @public @method
     * Updates the mobile version info into the add/update UX editors
     * @param {undefined|null|object} mobileVersionInfo
     */
    ezUpdateMobileVersionInfoUx(mobileVersionInfo) {
        if (!EzObject.isValid(mobileVersionInfo)) {
            EzUx.setInputValue(
                'UpdateMobileVersionInfo_Id',
                EzString.EMPTY);

            EzUx.setInputValue(
                'UpdateMobileVersionInfo_LatestAppVersion',
                EzString.EMPTY);

            EzUx.setInputValue(
                'UpdateMobileVersionInfo_MinimumAppVersion',
                EzString.EMPTY);

            EzUx.setInputValue(
                'UpdateMobileVersionInfo_SupportedAppVersions',
                EzString.EMPTY);

            EzUx.setInputValue(
                'UpdateMobileVersionInfo_MinimumOsVersion',
                EzString.EMPTY);

            EzUx.setInputValue(
                'UpdateMobileVersionInfo_MaximumOsVersion',
                EzString.EMPTY);

            EzUx.setInputValue(
                'UpdateMobileVersionInfo_SupportedOsVersions',
                EzString.EMPTY);

            EzUx.setInputValue('UpdateMobileVersionInfo_MinimumSdkVersion',
                EzString.EMPTY);

            EzUx.setInputValue('UpdateMobileVersionInfo_MaximumSdkVersion',
                EzString.EMPTY);

            EzUx.setInputValue(
                'UpdateMobileVersionInfo_SupportedSdkVersions',
                EzString.EMPTY);

            EzUx.setCheckboxValue(
                'UpdateMobileVersionInfo_Force',
                EzString.EMPTY);

            return;
        }

        EzUx.setInputValue(
            'UpdateMobileVersionInfo_Id',
            mobileVersionInfo.id);

        EzUx.setInputValue(
            'UpdateMobileVersionInfo_DeviceTypeSelect',
            mobileVersionInfo.deviceType);

        EzUx.setInputValue(
            'UpdateMobileVersionInfo_OsTypeSelect',
            mobileVersionInfo.osType);

        EzUx.setInputValue(
            'UpdateMobileVersionInfo_LatestAppVersion',
            mobileVersionInfo.latestAppVersion);

        EzUx.setInputValue(
            'UpdateMobileVersionInfo_MinimumAppVersion',
            mobileVersionInfo.minimumAppVersion);

        EzUx.setInputValue(
            'UpdateMobileVersionInfo_SupportedAppVersions',
            mobileVersionInfo.supportedAppVersions);

        EzUx.setInputValue(
            'UpdateMobileVersionInfo_MinimumOsVersion',
            mobileVersionInfo.minimumOsVersion);

        EzUx.setInputValue(
            'UpdateMobileVersionInfo_MaximumOsVersion',
            mobileVersionInfo.maximumOsVersion);

        EzUx.setInputValue(
            'UpdateMobileVersionInfo_SupportedOsVersions',
            mobileVersionInfo.supportedOsVersions);

        EzUx.setInputValue('UpdateMobileVersionInfo_MinimumSdkVersion',
            mobileVersionInfo.minimumSdkVersion);

        EzUx.setInputValue('UpdateMobileVersionInfo_MaximumSdkVersion',
            mobileVersionInfo.maximumSdkVersion);

        EzUx.setInputValue(
            'UpdateMobileVersionInfo_SupportedSdkVersions',
            mobileVersionInfo.supportedSdkVersions);

        EzUx.setCheckboxValue(
            'UpdateMobileVersionInfo_Force',
            mobileVersionInfo.forceUpdate);
    }

    /**
     * @public @method
     * Gets the Mobile Version Info for the EzDeviceType
     * @returns {Promise.resolve}
     */
    ezGetMobileVersionInfoForEzDeviceType() {
        let deviceType = EzUx.getInputValue('GetMobileVersionInfoForDeviceType_DeviceTypeSelect');

        return EzString.hasLength(deviceType)
            ? ezApi.ezclocker.ezSpinner.ezStartPageWait(
                `Getting mobile version information for device type ${deviceType} ...`,
                (waitDone) => ezApi.ezclocker.ezHttpHelper.ezGet(
                    `/_api/v1/mobile/versions/device/${deviceType}`)
                    .then(
                        ezApi.ezclocker.ezHttpHelper.ezProcessApiResolve,
                        ezApi.ezclocker.ezHttpHelper.ezProcessApiReject)
                    .then(
                        (response) => {
                            EzUx.setInputValue(
                                'GetMobileVersionInfoForDeviceType_Results',
                                EzJson.toJson(response, null, true));

                            EzAdminViewController.ezInstance.ezUpdateMobileVersionInfoUx(response.ezMobileVersionInfo);

                            return waitDone();
                        },
                        (eResponse) => {
                            EzUx.setInputValue(
                                'GetMobileVersionInfoForDeviceType_Results',
                                EzJson.toJson(eResponse, null, true));

                            EzAdminViewController.ezInstance.ezUpdateMobileVersionInfoUx(null);

                            return waitDone();
                        }))
            : () => {
                EzUx.setInputValue(
                    'GetMobileVersionInfoForDeviceType_Results',
                    'Please select a valid device type.');

                return EzPromise.resolve();
            };
    }

    /**
     * @public @method
     * Gets the Mobile Version Info for the EzOsType
     * @returns {Promise.resolve}
     */
    ezGetMobileVersionInfoForEzOsType() {
        let osType = EzUx.getInputValue('GetMobileVersionInfoForOsType_OsTypeSelect');

        return EzString.hasLength(osType)
            ? ezApi.ezclocker.ezSpinner.ezStartPageWait(
                `Getting mobile version information for OS type ${osType} ...`,
                (waitDone) => ezApi.ezclocker.ezHttpHelper.ezGet(
                    `/_api/v1/mobile/versions/os/${osType}`)
                    .then(
                        ezApi.ezclocker.ezHttpHelper.ezProcessApiResolve,
                        ezApi.ezclocker.ezHttpHelper.ezProcessApiReject)
                    .then(
                        (response) => {
                            EzUx.setContent(
                                'GetMobileVersionInfoForOsType_Results',
                                EzJson.toJson(response, 3));

                            EzAdminViewController.ezInstance.ezUpdateMobileVersionInfoUx(response.ezMobileVersionInfo);

                            return waitDone();
                        },
                        (eResponse) => {
                            EzUx.setContent(
                                'GetMobileVersionInfoForOsType_Results',
                                EzJson.toJson(eResponse, 3));

                            EzAdminViewController.ezInstance.ezUpdateMobileVersionInfoUx(null);

                            return waitDone();
                        }))
            : () => {
                EzUx.setInputValue(
                    'GetMobileVersionInfoForDeviceType_Results',
                    'Please select a valid os type.');

                return EzPromise.resolve();
            };
    }

    /**
     * @public @method
     * Gets the Mobile Version Info for the MobileVersionInfo's id
     * @returns {Promise.resolve}
     */
    ezGetMobileVersionInfoForId() {
        let mobileVersionInfoId = EzUx.getInputValue('GetMobileVersionInfoForId_MobileVersionInfoId');

        return EzString.hasLength(mobileVersionInfoId)
            ? ezApi.ezclocker.ezSpinner.ezStartPageWait(
                `Getting mobile version information for Id ${mobileVersionInfoId} ...`,
                (waitDone) =>
                    ezApi.ezclocker.ezHttpHelper.ezGet(
                        `/_api/v1/mobile/versions/${mobileVersionInfoId}`)
                        .then(
                            ezApi.ezclocker.ezHttpHelper.ezProcessApiResolve,
                            ezApi.ezclocker.ezHttpHelper.ezProcessApiReject)
                        .then(
                            (response) => {
                                EzUx.setInputValue(
                                    'GetMobileVersionInfoForId_Results',
                                    EzJson.toJson(response, 3));

                                EzAdminViewController.ezInstance.ezUpdateMobileVersionInfoUx(response.ezMobileVersionInfo);

                                return waitDone();
                            },
                            (eResponse) => {
                                EzUx.setInputValue(
                                    'GetMobileVersionInfoForId_Results',
                                    EzJson.toJson(eResponse, 3));

                                EzAdminViewController.ezInstance.ezUpdateMobileVersionInfoUx(null);

                                return waitDone();
                            }))
            : () => {
                ezApi.ezclocker.ezUi.ezSetContent(
                    'GetMobileVersionInfoForId_Results',
                    'Please enter a valid MobileVersionInfo id.');

                return EzPromise.resolve();
            };
    }

    /**
     * Update or add a Mobile Version Info
     * @returns {Promise.resolve}
     */
    ezUpdateMobileVersionInfo() {
        let mobileVersionInfoId = EzUx.getInputValue('UpdateMobileVersionInfo_Id');

        let payload = {
            id: EzString.hasLength(id)
                ? EzNumber.strToInt(mobileVersionInfoId)
                : null,
            ezDeviceType: EzUx.getInputValue('UpdateMobileVersionInfo_DeviceTypeSelect'),
            ezOsType: EzUx.getInputValue('UpdateMobileVersionInfo_OsTypeSelect'),
            latestAppVersion: EzUx.getInputValue('UpdateMobileVersionInfo_LatestAppVersion'),
            minimumAppVersion: EzUx.getInputValue('UpdateMobileVersionInfo_MinimumAppVersion'),
            supportedAppVersions: `[${EzString.removeAllSpacesReturnsLineFeeds(EzUx.getInputValue('UpdateMobileVersionInfo_SupportedAppVersions'))}]`,
            minimumOsVersion: EzUx.getInputValue('UpdateMobileVersionInfo_MinimumOsVersion'),
            maximumOsVersion: EzUx.getInputValue('UpdateMobileVersionInfo_MaximumOsVersion'),
            supportedOsVersions: `[${EzString.removeAllSpacesReturnsLineFeeds(EzUx.getInputValue('UpdateMobileVersionInfo_SupportedOsVersions'))}]`,
            minimumSdkVersion: EzUx.getInputValue('UpdateMobileVersionInfo_MinimumSdkVersion'),
            maximumSdkVersion: EzUx.getInputValue('UpdateMobileVersionInfo_MaximumSdkVersion'),
            supportedSdkVersions: `[${EzString.removeAllSpacesReturnsLineFeeds(EzUx.getInputValue('UpdateMobileVersionInfo_SupportedSdkVersions'))}]`,
            forceUpdate: EzUx.isCheckboxChecked('UpdateMobileVersionInfo_Force'),
        };

        return EzString.hasLength(mobileVersionInfoId)
            ? ezApi.ezclocker.ezSpinner.ezStartPageWait(
                `Updating mobile version information with id=${mobileVersionInfoId} ...`,
                (waitDone) => ezApi.ezclocker.ezHttpHelper.ezPut(
                    `/_api/v1/mobile/versions/${mobileVersionInfoId}`,
                    EzJson.toJson(payload))
                    .then(
                        ezApi.ezclocker.ezHttpHelper.ezProcessApiResolve,
                        ezApi.ezclocker.ezHttpHelper.ezProcessApiReject)
                    .then(
                        (response) => {
                            EzUx.setInputValue(
                                'UpdateMobileVersionInfo_Results',
                                EzJson.toJson(response, 3));

                            EzAdminViewController.ezInstance.ezUpdateMobileVersionInfoUx(response.ezMobileVersionInfo);

                            return waitDone();
                        },
                        (eResponse) => {
                            EzUx.setInputValue(
                                'UpdateMobileVersionInfo_Results',
                                EzJson.toJson(eResponse, 3));

                            return waitDone();
                        }))
            : ezApi.ezclocker.ezSpinner.ezStartPageWait(
                `Updating mobile version information with id=${mobileVersionInfoId} ...`,
                (waitDone) => ezApi.ezclocker.ezHttpHelper.ezPost(
                    `/_api/v1/mobile/versions`,
                    EzJson.toJson(payload))
                    .then(
                        ezApi.ezclocker.ezHttpHelper.ezProcessApiResolve,
                        ezApi.ezclocker.ezHttpHelper.ezProcessApiReject)
                    .then(
                        (response) => {
                            EzUx.setInputValue(
                                'UpdateMobileVersionInfo_Results',
                                EzJson.toJson(response, 3));

                            EzAdminViewController.ezInstance.ezUpdateMobileVersionInfoUx(response.ezMobileVersionInfo);

                            return waitDone();
                        },
                        (eResponse) => {
                            EzUx.setInputValue(
                                'UpdateMobileVersionInfo_Results',
                                EzJson.toJson(eResponse, 3));

                            return waitDone();
                        }));
    }

    /**
     * @public @method
     * Unlocks a user account locked due to failed authentication attempts
     */
    ezUnlockUserAccount() {
        let username = ezApi.ezclocker.ezUi.ezGetInputValue('EzAdminUnlockUserAccountUsername');

        if (!EzString.hasLength(username)) {
            ezApi.ezclocker.ezUi.ezSetContent(
                'EzAdminUnlockUserAccountResults',
                EzHtml.build`
                    <span
                        id="EzAdminUnlockUserAccountError"
                        class="ezText-error-ezDarkAlertRed">
                        A valid username is required to remove a Failed Authentication Attempt lock on a user account.
                    </span>`);

            return;
        }

        return ezApi.ezclocker.ezHttpHelper.ezGet(
            EzUrl.build`
                /api/v1/admin/unlock-user-account
                ?username=${username}`)
            .then(
                ezApi.ezclocker.ezHttpHelper.ezProcessApiResolve,
                ezApi.ezclocker.ezHttpHelper.ezProcessApiReject)
            .then(
                (response) => ezApi.ezclocker.ezUi.ezSetContent(
                    'EzAdminUnlockUserAccountResults',
                    EzHtml.build`
                        <h3>Successfully unlocked the user account with username "${username}"!</h3>
                        <p>
                            ${EzJson.toJson(response, 3, true)}
                        </p>`),
                (eResponse) => ezApi.ezclocker.ezUi.ezSetContent(
                    'EzAdminUnlockUserAccountResults',
                    EzHtml.build`
                        <h3>Failed to unlocked the user account with username "${username}"!</h3>
                        <p>
                            ${EzJson.toJson(eResponse, 3, true)}
                        </p>`));
    }

    /**
     * @public @method
     * Reload/refresh the subscription plan cache
     */
    ezReloadSubscriptionPlanCache() {
        return ezApi.ezclocker.ezUi.ezPageWaitAsync(
            'Reloading the subscription plan cache ...',
            (waitDone, finished) => ezApi.ezclocker.ezHttpHelper.ezGet(
                '/_api/v1/subscriptions/administration/subscription-cache/re-cache')
                .then(
                    (response) => waitDone()
                        .then(
                            () => {
                                alert(`Subscription cache reloaded with success: ${EzJson.toJson(response)}.`);

                                return finished();
                            }),
                    (eResponse) => waitDone()
                        .then(
                            () => {
                                alert(`Subscription cache reload failed: ${EzJson.toJson(eResponse)}`);

                                return finished();
                            })));
    }

    /**
     * @public @method
     * Obtains full employer information and displays if available
     */
    ezViewFullEmployeeInfo() {
        let employeeId = ezApi.ezclocker.ezUi.ezGetInputValue('EzViewFullEmployeeInfoEmployeeId');

        if (!EzString.hasLength(employeeId)) {
            ezApi.ezclocker.ezUi.ezSetContent(
                'EzViewFullEmployeeInfoResults',
                'Please enter a valid employee id in the input above to obtain full employee information for.');
            return;
        }

        ezApi.ezclocker.ezHttpHelper.ezGet(
            EzUrl.build`
                /_api/v1/ezadmin/info/employee
                ${ezApi.ezclocker.ezUi.ezGetInputValue('EzViewFullEmployeeInfoEmployeeId')}`)
            .then(
                (response) => {
                    ezApi.ezclocker.ezUi.ezSetContent(
                        EzJson.toJson(response, null, true));
                },
                (eResponse) => {
                    ezApi.ezclocker.ezUi.ezSetContent(
                        EzJson.toJson(eResponse, null, true));
                });
    }

    /**
     * @public @method
     * Gets the authenticated support account information
     */
    ezGetAuthenticatedSupportAccountInfo() {
        return ezApi.ezclocker.ezHttpHelper.ezGet('/api/v1/admin/support-account-info')
            .then(
                (response) => {
                    ezApi.ezclocker.ezLogger.info(`[support-account-info: ${EzJson.toJson(response)}]`);
                },
                (eResponse) => {
                    ezApi.ezclocker.ezLogger.info(`[support-account-info: ${EzJson.toJson(eResponse)}]`);
                });
    }

    /**
     * @public @method
     * Refreshes the current swap password hijack state
     */
    ezRefreshSwapHijackState() {
        EzAdminViewController.ezInstance.ezRefreshCurrentlyHijackedUserInfo()
            .then(
                (hijackedUserResponse) => {
                    EzAdminViewController.ezInstance.ezRefreshSwappedPasswordState()
                        .then(
                            (passwordSwapResponse) => {
                                EzAdminViewController.ezInstance.ezInitRestoreHijackButton(
                                    passwordSwapResponse,
                                    hijackedUserResponse);
                            });
                });
    }

    /**
     * @public @method
     * Displays the currently hijacked user information
     */
    ezRefreshCurrentlyHijackedUserInfo() {
        ezApi.ezclocker.ezUi.ezHideElement('viewJumpEmployee');
        ezApi.ezclocker.ezUi.ezHideElement('viewJumpEmployer');
        ezApi.ezclocker.ezUi.ezHideElement('jumpEmployee');
        ezApi.ezclocker.ezUi.ezHideElement('#jumpEmployer');

        return ezApi.ezAsyncAction(
            (finished) => {
                return ezApi.ezclocker.ezHttpHelper.ezGet('/api/v1/admin/hijack')
                    .then(
                        ezApi.ezclocker.ezServices.ezProcessApiResolve,
                        ezApi.ezclocker.ezServices.ezProcessApiReject)
                    .then(
                        (response) => {
                            if (!EzArray.arrayHasLength(response.responses)) {
                                EzAdminViewController.ezInstance.ezHijackedAccounts = [];
                                EzAdminViewController.ezInstance.ezActiveHijackedAccount = null;
                                EzAdminViewController.ezInstance.ezHijackedUser = null;

                                ezApi.ezclocker.ezUi.ezContent(
                                    '_WhoIsHijacked',
                                    EzHtml.build`
                                        <h2>No accounts currently hijacked.</h2>`);
                                EzAdminViewController.ezInstance.ezInitRestoreHijackButton(false, false);
                                return finished(false);
                            }
                            EzAdminViewController.ezInstance.ezInitRestoreHijackButton();
                            EzAdminViewController.ezInstance.ezHijackedAccounts = response.responses;
                            EzAdminViewController.ezInstance.ezActiveHijackedAccount = EzAdminViewController.ezInstance.ezHijackedAccounts[0];

                            let hijackedEmployersInfo = EzHtml.build`
                                <div class="ezLightGrayBox">
                                    <h3>Employer Accounts</h3>
                                    <hr/>`;
                            let hijackedEmployeesInfo = EzHtml.build`
                                <div class="ezLightGrayBox">
                                    <h3>Employee Accounts</h3>
                                    <hr/>`;
                            response.responses.forEach(
                                (entity) => {
                                    let employerId = ezApi.ezIsNumber(entity.hijackedEmployerId)
                                        ? entity.hijackedEmployerId
                                        : '-';
                                    let employeeId = ezApi.ezIsNumber(entity.hijackedEmployeeId)
                                        ? entity.hijackedEmployeeId
                                        : '-';

                                    if (!entity.isEmployeeAccount) {
                                        hijackedEmployersInfo = EzHtml.build`${hijackedEmployersInfo}
                                            <div id="EzHijackedEmployer_${entity.id}" class="ezBabyBlueBox">
                                                <h4>
                                                    Employer: ${employerId} (HJID: ${entity.id})
                                                </h4>
                                                <ul style="font-family:'Roboto Mono',monospace;">
                                                    <li>Hijack Type:...........: ${entity.hijackType}</li>
                                                    <li>Hijacker User Id:......: ${entity.hijackerUserId}</li>
                                                    <li>Hijacker Primary Role..: ${entity.hijackedAccountRole}</li>
                                                    <li>Hijacked User Id.......: ${entity.hijackedUserId}</li>
                                                    <li>Hijacked User Name.....: ${entity.hijackedUserEmailForPasswordSwap}</li>
                                                    <li>Hijacked Employer Id...: ${entity.hijackedEmployerId}</li>
                                                    <li>Hijacked On............: ${entity.hijackedDate}</li>
                                                </ul>
                                            </div>`;
                                        ezApi.ezclocker.ezUi.ezShowElement('viewJumpEmployer');
                                        ezApi.ezclocker.ezUi.ezShowElement('jumpEmployer');
                                    } else {
                                        hijackedEmployeesInfo = EzHtml.build`${hijackedEmployeesInfo}
                                            <div id="EzHijackedEmployee_${entity.id}" class="ezBabyBlueBox">
                                                <h4>
                                                    Employee: ${employeeId} (HJID: ${entity.id})
                                                </h4>
                                                <ul style="font-family:'Roboto Mono',monospace;">
                                                    <li>Hijack Type:...........: ${entity.hijackType}</li>
                                                    <li>Hijacker User Id..: ${entity.hijackerUserId}</li>
                                                    <li>Hijacker Primary Role..: ${entity.hijackedAccountRole}</li>
                                                    <li>Hijacked User Id..: ${entity.hijackedUserId}</li>
                                                    <li>Hijacked User Name.....: ${entity.hijackedUserEmailForPasswordSwap}</li>
                                                    <li>Hijacked Employee Id...: ${entity.hijackedEmployeeId}</li>
                                                    <li>Hijacked On.......: ${entity.hijackedDate}</li>
                                                </ul>
                                            <div>`;
                                        ezApi.ezclocker.ezUi.ezShowElement('viewJumpEmployee');
                                        ezApi.ezclocker.ezUi.ezShowElement('jumpEmployee');
                                    }
                                });

                            ezApi.ezclocker.ezUi.ezContent(
                                '_WhoIsHijacked',
                                EzHtml.build`
                                    <div>
                                        <h2>Currently Hijacked Accounts</h2>
                                        <div id="EzHijackedAccountsInfoContainer">
                                            ${hijackedEmployersInfo}
                                            ${hijackedEmployeesInfo}
                                        </div>
                                    </div>`);

                            return finished(true);
                        },
                        (eResponse) => {
                            EzAdminViewController.ezInstance.ezHandleResultFailure('_WhoIsHijacked', eResponse);
                            return finished(false);
                        });
            });
    }

    /**
     * @protected @method
     * Checks the state of the swapped password admin function
     */
    ezRefreshSwappedPasswordState() {
        ezApi.ezclocker.ezUi.ezDisableElement(EzAdminViewController.ezInstance.ezIds.buttons.ezSwapPasswordButtonId);

        return ezApi.ezAsyncAction(
            (finished) => {
                return ezApi.ezclocker.ezHttpHelper.ezGet(
                    '/api/v1/admin/hijack/user/swap-password')
                    .then(
                        ezApi.ezclocker.ezServices.ezProcessApiResolve,
                        ezApi.ezclocker.ezServices.ezProcessApiReject)
                    .then(
                        (response) => {
                            EzAdminViewController.ezInstance.ezHijackedAccounts = response.entities;

                            if (EzArray.arrayHasLength(EzAdminViewController.ezInstance.ezHijackedAccounts)) {
                                EzAdminViewController.ezInstance.ezActiveHijackedAccount = EzAdminViewController.ezInstance.ezHijackedAccounts[0];

                                return ezApi.ezclocker.ezHttpHelper.ezGet(
                                    `/_api/v1/users/${EzAdminViewController.ezInstance.ezActiveHijackedAccount.hijackedUserId}`)
                                    .then(
                                        ezApi.ezclocker.ezServices.ezProcessApiResolve,
                                        ezApi.ezclocker.ezServices.ezProcessApiReject)
                                    .then(
                                        (userResponse) => {
                                            ezApi.ezclocker.ezUi.ezEnableElement(EzAdminViewController.ezInstance.ezIds.buttons.ezSwapPasswordButtonId);

                                            ezApi.ezclocker.ezUi.ezSetInputValue(
                                                EzAdminViewController.ezInstance.ezIds.inputs.ezSwapPasswordUsernameInputId,
                                                userResponse.email);

                                            return finished(true);
                                        },
                                        (eUserResponse) => {
                                            ezApi.ezclocker.ezUi.ezEnableElement(EzAdminViewController.ezInstance.ezIds.buttons.ezSwapPasswordButtonId);

                                            let cleanedUserResponse = {
                                                errorCode: eUserResponse.errorCode,
                                                message: eUserResponse.message,
                                                entity: eUserResponse.entity,
                                                httpStatus: eUserResponse.jqXHR.status
                                            }

                                            EzAdminViewController.ezInstance.ezHandleResultFailure(
                                                EzAdminViewController.ezInstance.ezIds.containers.ezSwapPasswordResultsId,
                                                cleanedUserResponse.message,
                                                cleanedUserResponse);

                                            return finished(false);
                                        });
                            } else {
                                ezApi.ezclocker.ezUi.ezSetInputValue('EzSwapPasswordAccountUserName', '');

                                EzAdminViewController.ezInstance.ezInitRestoreHijackButton(false);

                                ezApi.ezclocker.ezUi.ezEnableElement(EzAdminViewController.ezInstance.ezIds.buttons.ezSwapPasswordButtonId);

                                return finished(false);
                            }
                        },
                        (eResponse) => {
                            ezApi.ezclocker.ezUi.ezEnableElement(EzAdminViewController.ezInstance.ezIds.buttons.ezSwapPasswordButtonId);

                            EzAdminViewController.ezInstance.ezHandleResultFailure(
                                EzAdminViewController.ezInstance.ezIds.containers.ezSwapPasswordResultsId,
                                eResponse,
                                `${eResponse.message} (ErrorCode: ${eResponse.errorCode})`,);

                            return finished(false);
                        });
            });
    }

    /**
     * @public @method
     */
    ezInitRestoreHijackButton(isPasswordSwapped, isHijacked) {
        ezApi.ezclocker.ezUi.ezDisableElement(EzAdminViewController.ezInstance.ezIds.buttons.ezSwapPasswordButtonId);
        ezApi.ezclocker.ezUi.ezDisableElement(EzAdminViewController.ezInstance.ezIds.buttons.ezRestoreHijackButtonId);
        ezApi.ezclocker.ezUi.ezHideElement('EzRetoreHijackContainer');
        ezApi.ezclocker.ezUi.ezDisableElement('EzHijackEmployerButton');
        ezApi.ezclocker.ezUi.ezDisableElement('EzHijackEmployeeButton');
        ezApi.ezclocker.ezUi.ezDisableElement('EzHijackPayrollManagerButton');
        ezApi.ezclocker.ezUi.ezDisableElement('EzHijackManagerButton');
        ezApi.ezclocker.ezUi.ezDisableElement('EzHijackPersonalButton');

        if (ezApi.ezIsTrue(isPasswordSwapped)) {
            ezApi.ezclocker.ezUi.ezDisableElement(EzAdminViewController.ezInstance.ezIds.buttons.ezSwapPasswordButtonId);
            ezApi.ezclocker.ezUi.ezHideElement(EzAdminViewController.ezInstance.ezIds.buttons.ezSwapPasswordButtonId);

            ezApi.ezclocker.ezUi.ezShowElement('EzRestoreSwapPasswordButton');
            ezApi.ezclocker.ezUi.ezEnableElement('EzRestoreSwapPasswordButton');

            ezApi.ezclocker.ezUi.ezDisableElement(EzAdminViewController.ezInstance.ezIds.buttons.ezRestoreHijackButtonId);
            ezApi.ezclocker.ezUi.ezHideElement(EzAdminViewController.ezInstance.ezIds.buttons.ezRestoreHijackButtonId);
        } else if (ezApi.ezIsTrue(isHijacked)) {
            ezApi.ezclocker.ezUi.ezShowElement('EzRetoreHijackContainer');

            ezApi.ezclocker.ezUi.ezDisableElement(EzAdminViewController.ezInstance.ezIds.buttons.ezSwapPasswordButtonId);
            ezApi.ezclocker.ezUi.ezShowElement(EzAdminViewController.ezInstance.ezIds.buttons.ezSwapPasswordButtonId);

            ezApi.ezclocker.ezUi.ezDisableElement('EzRestoreSwapPasswordButton');
            ezApi.ezclocker.ezUi.ezHideElement('EzRestoreSwapPasswordButton');

            ezApi.ezclocker.ezUi.ezEnableElement(EzAdminViewController.ezInstance.ezIds.buttons.ezRestoreHijackButtonId);
            ezApi.ezclocker.ezUi.ezShowElement(EzAdminViewController.ezInstance.ezIds.buttons.ezRestoreHijackButtonId);

            ezApi.ezclocker.ezUi.ezContent(
                EzAdminViewController.ezInstance.ezIds.buttons.ezSwapPasswordButtonId,
                'Swap Password ...');

            ezApi.ezclocker.ezUi.ezEnableElement(EzAdminViewController.ezInstance.ezIds.buttons.ezRestoreHijackButtonId);
            ezApi.ezclocker.ezUi.ezShowElement(EzAdminViewController.ezInstance.ezIds.buttons.ezRestoreHijackButtonId);
            ezApi.ezclocker.ezUi.ezContent(
                EzAdminViewController.ezInstance.ezIds.buttons.ezRestoreHijackButtonId,
                'Release Hijack ...');
        } else {
            ezApi.ezclocker.ezUi.ezEnableElement('EzHijackEmployerButton');
            ezApi.ezclocker.ezUi.ezEnableElement('EzHijackEmployeeButton');
            ezApi.ezclocker.ezUi.ezEnableElement('EzHijackPayrollManagerButton');
            ezApi.ezclocker.ezUi.ezEnableElement('EzHijackManagerButton');
            ezApi.ezclocker.ezUi.ezEnableElement('EzHijackPersonalButton');

            ezApi.ezclocker.ezUi.ezEnableElement(EzAdminViewController.ezInstance.ezIds.buttons.ezSwapPasswordButtonId);
            ezApi.ezclocker.ezUi.ezShowElement(EzAdminViewController.ezInstance.ezIds.buttons.ezSwapPasswordButtonId);

            ezApi.ezclocker.ezUi.ezDisableElement('EzRestoreSwapPasswordButton');
            ezApi.ezclocker.ezUi.ezHideElement('EzRestoreSwapPasswordButton');

            ezApi.ezclocker.ezUi.ezDisableElement(EzAdminViewController.ezInstance.ezIds.buttons.ezRestoreHijackButtonId);
            ezApi.ezclocker.ezUi.ezHideElement(EzAdminViewController.ezInstance.ezIds.buttons.ezRestoreHijackButtonId);
        }
    }

    /**
     * @public @method
     */
    ezReleaseNormalHijack() {
        ezApi.ezclocker.ezUi.ezContent('_HijackEmployeeResults', '');

        ezApi.ezclocker.ezHttpHelper.ezGet('/api/v1/admin/hijack/restore')
            .then(
                (response) => {
                    let viewHtml = '';

                    if (response.message) {
                        viewHtml += response.message;
                    }

                    let restoredEmployee = EzString.stringHasLength(response.restoredEmployees)
                        ? response.restoredEmployees[0]
                        : null;

                    let restoredEmployer = EzString.stringHasLength(response.restoredEmployers)
                        ? response.restoredEmployers[0]
                        : null;

                    if (EzObject.isValid(restoredEmployer)) {
                        viewHtml = EzHtml.build`${viewHtml}
                            <h2>Employer Hijack Released</h2>
                            <hr/>
                            <ul>
                                <li>Employer Name..: ${restoredEmployer.employerName}</li>
                                <li>Employer Id....: ${restoredEmployer.id}</li>
                            </ul>
                            <div>
                                <pre>
                                    <code class="json">
                                        ${EzJson.toJson(response, 3, true)}
                                    </code>
                                </pre>
                            </div>`;
                    }

                    if (EzObject.isValid(restoredEmployee)) {
                        viewHtml = EzHtml.build`
                            <h2>Employee HiJack Released</h2>
                            <hr/>
                            <ul>
                                <li>Employee Id...: ${restoredEmployee.id}</li>
                            <ul>
                            <div>
                                <pre>
                                    <code class="json">
                                        ${EzJson.toJson(response, 3, true)}
                                    </code>
                                </pre>
                            </div>`;
                    }
                    ezApi.ezclocker.ezUi.ezContent('_HijackResults2', viewHtml);

                    EzAdminViewController.ezInstance.ezRefreshCurrentlyHijackedUserInfo();
                },
                (eResponse) => {
                    ezApi.ezclocker.ezUi.ezContent(
                        '_HijackResults2',
                        EzHtml.build`
                            <div>
                                Error:
                                    <pre>
                                        <code class="json">
                                            ${EzJson.toJson(eResponse, 3, true)}
                                        </code>
                                    </pre>
                            </div>`);
                    EzAdminViewController.ezInstance.ezRefreshCurrentlyHijackedUserInfo();
                });
    }

    /**
     * @public @method
     */
    ezRestoreSwapPassword() {
        ezApi.ezclocker.ezUi.ezDisableElement('EzRestoreSwapPasswordButton');

        let swapPasswordEmail = ezApi.ezclocker.ezUi.ezGetInputValue(EzAdminViewController.ezInstance.ezIds.inputs.ezSwapPasswordUsernameInputId);

        if (!EzString.stringHasLength(swapPasswordEmail)) {
            EzAdminViewController.ezInstance.ezHandleResultFailure(
                EzAdminViewController.ezInstance.ezIds.containers.ezSwapPasswordResultsId,
                EzHtml.build`
                    <h1>Error: Account Username Required</h2>
                    Please enter a valid account username (email address, user name, or phone number).`);

            ezApi.ezclocker.ezUi.ezEnableElement(EzAdminViewController.ezInstance.ezIds.buttons.ezSwapPasswordButtonId);

            return;
        }

        swapPasswordEmail = swapPasswordEmail.trim();

        ezApi.ezclocker.ezUi.ezContent(
            EzAdminViewController.ezInstance.ezIds.containers.ezSwapPasswordResultsId,
            '<h1>Restoring the original account password ...</h1>');

        ezApi.ezclocker.ezHttpHelper.ezPost(
            `/api/v1/admin/hijack/user/restore-swapped-password?user-name=${swapPasswordEmail}`)
            .then(
                ezApi.ezclocker.ezServices.ezProcessApiResolve,
                ezApi.ezclocker.ezServices.ezProcessApiReject)
            .then(
                (response) => {
                    let cleanResponse = {
                        errorCode: response.errorCode,
                        message: response.message,
                        httpStatus: response.jqXHR.status
                    }

                    EzAdminViewController.ezInstance.ezHandleResultSuccess(
                        EzAdminViewController.ezInstance.ezIds.containers.ezSwapPasswordResultsId,
                        cleanResponse,
                        cleanResponse.message);

                    EzAdminViewController.ezInstance.ezRefreshSwapHijackState();

                    ezApi.ezclocker.ezUi.ezHideElement('EzRestoreSwapPasswordButton');

                    ezApi.ezclocker.ezUi.ezShowElement('EzSwapPasswordButton');

                    ezApi.ezclocker.ezUi.ezEnableElement('EzSwapPasswordButton');

                    EzAdminViewController.ezInstance.ezRefreshSwapHijackState();
                },
                (eResponse) => {
                    ezApi.ezclocker.ezUi.ezEnableElement(EzAdminViewController.ezInstance.ezIds.buttons.ezSwapPasswordButtonId);

                    EzAdminViewController.ezInstance.ezHandleResultFailure(
                        EzAdminViewController.ezInstance.ezIds.containers.ezSwapPasswordResultsId,
                        eResponse,
                        EzHtml.build`
                            <h2>Failure: User Password Restored</h2>
                            <div>
                                <label for="EzPasswordSwapResponseTextArea">Swap Log:</label>
                                <textarea id="EzPasswordSwapResponseTextArea"
                                    style="width:100%;height:250px">
                                    ${eResponse.message}
                                </textarea>
                            </div>`);

                    EzAdminViewController.ezInstance.ezRefreshSwapHijackState();
                });
    }

    /**
     * @public @method
     * Swapps the users's password with the temporary password
     */
    ezSwapPasswordForUser() {
        ezApi.ezclocker.ezUi.ezDisableElement(EzAdminViewController.ezInstance.ezIds.buttons.ezSwapPasswordButtonId);

        let swapPasswordEmail = EzString.trimOrEmpty(
            ezApi.ezclocker.ezUi.ezGetInputValue(
                EzAdminViewController.ezInstance.ezIds.inputs.ezSwapPasswordUsernameInputId));

        if (!EzString.stringHasLength(swapPasswordEmail)) {
            EzAdminViewController.ezInstance.ezHandleResultFailure(
                EzAdminViewController.ezInstance.ezIds.containers.ezSwapPasswordResultsId,
                EzHtml.build`
                    <h1>Error: Account Username Required</h2>
                    Please enter a valid account username (email address, user name, or phone number).`);

            ezApi.ezclocker.ezUi.ezEnableElement(EzAdminViewController.ezInstance.ezIds.buttons.ezSwapPasswordButtonId);

            return;
        }

        ezApi.ezclocker.ezUi.ezContent(
            EzAdminViewController.ezInstance.ezIds.containers.ezSwapPasswordResultsId,
            EzHtml.build`
                <h1>Swapping real password with temporary password ...</h1>
                NOTE: The account owner will not be able to login while the password is swapped.`);

        ezApi.ezclocker.ezHttpHelper.ezPost(
            `/api/v1/admin/hijack/user/generate-temp-password?user-name=${swapPasswordEmail}`)
            .then(
                ezApi.ezclocker.ezServices.ezProcessApiResolve,
                ezApi.ezclocker.ezServices.ezProcessApiReject)
            .then(
                (response) => {
                    /*
                        Expected response object:
                        {
                            "errorCode":0,
                            "message":"Success",
                            "entity":{
                                "hijackerUserId":146,
                                "hijackedUserId":2,
                                "hijackedEmployerId":2,
                                "hijackedEmployeeId":null,
                                "hijackedDate":"2022-04-14T00:56:00Z",
                                "hijackedUserEmailForPasswordSwap":"boogers.boats@mailinator.com",
                                "hijackType":"SWAP_PASSWORD",
                                "hijackedAccountRole":"ROLE_EMPLOYER",
                                "isEmployeeAccount":false,
                                "ezClockerApiSource":"UNKNOWN",
                                "id":3,
                                "createdIso":"2022-04-13T19:56:24-05:00",
                                "updatedIso":"2022-04-13T19:56:24-05:00",
                                "source":null
                            },
                            "status":"success"
                        }
                    */

                    let cleanResponse = {
                        errorCode: response.errorCode,
                        message: response.message,
                        status: response.jqXHR.status
                    };

                    EzAdminViewController.ezInstance.ezHandleResultSuccess(
                        EzAdminViewController.ezInstance.ezIds.containers.ezSwapPasswordResultsId,
                        cleanResponse,
                        cleanResponse.message);

                    EzAdminViewController.ezInstance.ezRefreshSwapHijackState();
                },
                (eResponse) => {
                    ezApi.ezclocker.ezUi.ezEnableElement(EzAdminViewController.ezInstance.ezIds.buttons.ezSwapPasswordButtonId);

                    EzAdminViewController.ezInstance.ezHandleResultFailure(
                        EzAdminViewController.ezInstance.ezIds.containers.ezSwapPasswordResultsId,
                        eResponse,
                        EzHtml.build`
                            <h2>Failure: User Password Swapped</h2>
                            <div>
                                <label for="EzPasswordSwapResponseTextArea">Swap Log:</label>
                                <textarea id="EzPasswordSwapResponseTextArea"
                                    style="width:100%;height:250px">
                                    ${eResponse.message}
                                </textarea>
                            </div>`);

                    EzAdminViewController.ezInstance.ezRefreshSwapHijackState();
                });
    }

    /**
     * @public @method
     * Generic handler for admin operation success results
     * @param {string} resultsContainerId
     * @param {object} response
     * @param {string} additionalSuccessContent
     */
    ezHandleResultSuccess(resultsContainerId, response, additionalSuccessContent) {
        let responseMessage = EzString.stringHasLength(response.message)
            ? response.message
            : 'Success';

        ezApi.ezclocker.ezUi.ezContent(
            resultsContainerId,
            EzHtml.build`
                <h2>
                    ${responseMessage}
                </h2>
                <p>
                    ${EzString.stringOrEmpty(additionalSuccessContent)}
                </p>
                <div>
                    <h2>
                        Response JSON
                    </h2>
                    <textarea
                        id="EzAdminResponseJson"
                        style="width:100%;height:200px;">
                        ${EzJson.toJson(response, 3)}
                    </textarea>
                </div>`);
    }

    /**
     * @public @method
     * Generic handler for admin operation failure results
     * @param {string} resultsContainerId
     * @param {object} eResponse
     * @param {string} additionalErrorContent
     */
    ezHandleResultFailure(resultsContainerId, eResponse, additionalErrorContent) {
        let message = EzObject.isValid(eResponse) && EzString.stringHasLength(eResponse.message)
            ? eResponse.message
            : 'Failed';

        // Show error message
        ezApi.ezclocker.ezUi.ezContent(
            resultsContainerId,
            EzHtml.build`
                <h1>${message}</h1>
                <p>Please contact the ezClocker engineering team if you need help resolving the failure.</p>
                ${ezApi.ezStringOrEmpty(additionalErrorContent)}
                <div>
                    <h2>Error Details</h2>
                    <pre>
                        <code class="json">
                            ${EzJson.toJson(eResponse, 3, true)}
                        </code>
                    </pre>
                </div>`);
    }

    /**
     * @public @method
     */
    ezViewHijacks() {
        let hjEmployers = EzHtml.build`
            <div class="ezLightGrayBox">
                <h3>Employer Accounts</h3>
                <hr/>`;

        let hjEmployees = EzHtml.build`
            <div class="ezLightGrayBox">
                <h3>Employee Accounts</h3>
                <hr/>`;

        ezApi.ezclocker.ezUi.ezHideElement('viewJumpEmployee');

        ezApi.ezclocker.ezUi.ezHideElement('viewJumpEmployer');

        ezApi.ezclocker.ezUi.ezHideElement('jumpEmployee');

        ezApi.ezclocker.ezUi.ezHideElement('jumpEmployer');

        ezApi.ezclocker.ezUi.ezHideElement('EzRetoreHijackButton');

        ezApi.ezclocker.ezHttpHelper.ezGet('/api/v1/admin/hijack')
            .then(
                (response) => {
                    if (0 != response.errorCode) {
                        ezApi.ezclocker.ezUi.ezContent(
                            '_WhoIsHijacked',
                            EzHtml.build`
                                Error (${response.errorCode}): ${response.message}`);
                        EzAdminViewController.ezInstance.ezInitRestoreHijackButton(false, false);
                        return;
                    }

                    if (!EzObject.isValid(response) || !EzObject.isValid(response.responses) ||
                        0 == response.responses.length) {
                        ezApi.ezclocker.ezUi.ezContent(
                            '_WhoIsHijacked',
                            'No accounts currently hijacked.');
                        EzAdminViewController.ezInstance.ezInitRestoreHijackButton(false, false);
                        return;
                    }

                    let hijackedAccounts = '';
                    response.responses.forEach((entity) => {
                        let employerId = ezApi.ezIsNumber(entity.hijackedEmployerId)
                            ? entity.hijackedEmployerId
                            : '-';
                        let employeeId = ezApi.ezIsNumber(entity.hijackedEmployeeId)
                            ? entity.hijackedEmployeeId
                            : '-';

                        hijackedAccounts = EzHtml.build`${hijackedAccounts}
                            <div>
                                <h2>Currently Hijacked Accounts</h2>`;

                        if (!entity.isEmployeeAccount) {
                            hjEmployers = EzHtml.build`${hjEmployers}
                                <p>Employer: ${employerId}</p>
                                    <ul style="font-family:\'Roboto Mono\',monospace;">
                                        <li> Hijacked By,,,,,..: ${entity.hijackerUserId}</li>
                                        <li> Hijacked On.......: ${entity.hijackedDate}</li>
                                        <li> Hijacked User Id..: ${entity.hijackedUserId}</li>
                                    </ul>
                                </p>`;
                        } else {
                            hjEmployees = EzHtml.build`${hjEmployers}
                                <p>Employee: ${employeeId}
                                <ul style="font-family:\'Roboto Mono\',monospace;">
                                    <li> Hijacked By.......: ${entity.hijackerUserId}</li>
                                    <li> Hijacked On.......: ${entity.hijackedDate}</li>
                                    <li> Hijacked User Id..: ${entity.hijackedUserId}</li>
                                </ul>
                            </p>`;
                        }

                        if (entity.isEmployeeAccount) {
                            ezApi.ezclocker.ezUi.ezShowElement('viewJumpEmployee');

                            ezApi.ezclocker.ezUi.ezShowElement('jumpEmployee');
                        } else {
                            ezApi.ezclocker.ezUi.ezShowElement('viewJumpEmployer');

                            ezApi.ezclocker.ezUi.ezShowElement('jumpEmployer');
                        }
                    });

                    hijackedAccounts += EzHtml.build`
                        ${hijackedAccounts}
                            <div>
                                ${hjEmployers}
                            </div>
                            <div>
                                ${hjEmployees}
                            </div>
                        </div>`;

                    ezApi.ezclocker.ezUi.ezContent('_WhoIsHijacked', hijackedAccounts);

                    EzAdminViewController.ezInstance.ezRefreshSwapHijackState();
                },
                (eResponse) => {
                    ezApi.ezclocker.ezUi.ezContent(
                        '_WhoIsHijacked',
                        EzHtml.build`
                            Error (${eResponse.errorCode}): ${eResponse.message}`);

                    EzAdminViewController.ezInstance.ezRefreshSwapHijackState();
                });
    }

    /**
     * @public @method
     */
    ezHijackEmployer() {
        ezApi.ezclocker.ezUi.ezContent('_HijackResults', '');

        ezApi.ezclocker.ezUi.ezContent('_HijackResults2', '');

        ezApi.ezclocker.ezUi.ezContent('_HijackEmployeeResults', '');

        let employerId = ezApi.ezclocker.ezUi.ezGetInputValue('EzHijackEmployerId');

        if (!EzObject.isValid(employerId) || 0 == employerId.length) {
            alert('Employer id is required to hijack!');

            ezApi.ezclocker.ezUi.ezFocusElement('EzHijackEmployerId');

            EzAdminViewController.ezInstance.ezRefreshSwapHijackState();
            return;
        }

        ezApi.ezclocker.ezHttpHelper.ezGet(
            `/api/v1/admin/hijack/employer/${employerId}`)
            .then(
                (response) => {
                    if (0 != response.errorCode) {
                        ezApi.ezclocker.ezUi.ezContent(
                            'EzHijackEmployerResults',
                            EzHtml.build`
                                Error: ${response.message}
                                <div>
                                    <pre>
                                        <code class="json">
                                            ${EzJson.toJson(response, 3, true)}
                                        </code>
                                    </pre>
                                </div>`);
                    } else {
                        EzAdminViewController.ezInstance.ezInitRestoreHijackButton(false, true);
                        ezApi.ezclocker.ezUi.ezContent(
                            'EzHijackEmployerResults',
                            EzHtml.build`
                                Employer ${response.employer.employerName} account with id=${response.employer.id}
                                now hijacked by user with id=${response.employer.userId}
                                <div>
                                    <pre>
                                        <code class="json"
                                            ${EzJson.toJson(response, 3, true)}
                                        </code>
                                    </pre>
                                </div>`);
                    }

                    EzAdminViewController.ezInstance.ezRefreshSwapHijackState();
                },
                (errorResult) => {
                    ezApi.ezclocker.ezUi.ezContent(
                        'EzHijackEmployerResults',
                        EzHtml.build`
                            <div>
                                <pre>
                                    <code class="json">
                                        ${EzJson.toJson(errorResult, 3, true)}
                                    </code>
                                </pre>
                            </div>`);

                    EzAdminViewController.ezInstance.ezRefreshSwapHijackState();
                });
    }

    /**
     * @public @method
     */
    ezHijackEmployee() {
        $('#_HijackEmployeeResults').html('');

        $('#_HijackResults').html('');

        $('#_HijackResults2').html('');

        let employerId = $('#_HijackEmployeeId').val();

        if (!employerId || employerId.length == 0) {
            alert('Employee id is required to hijack!');
            $('#_HijackEmployeeId').focus();
            return;
        }

        let url = `/api/v1/admin/hijack/employee/${$('#_HijackEmployeeId').val()}`;

        ezApi.ezclocker.ezHttpHelper.ezGet(url).then(
            function(response) {
                if (0 != response.errorCode !== 0) {
                    ezApi.ezclocker.ezUi.ezContent(
                        'EzHijackEmployeeResults',
                        response.response);
                } else if (null == response.employee) {
                    ezApi.ezclocker.ezUi.ezContent(
                        'EzHijackEmployeeResults',
                        EzHtml.build`
                            ${response.message}
                            <div>
                                <pre>
                                    <code class="json">
                                        ${EzJson.toJson(response, 3, true)}
                                    </code>
                                </pre>
                            </div>`);
                } else {
                    EzAdminViewController.ezInstance.ezInitRestoreHijackButton(false, true);

                    ezApi.ezclocker.ezUi.ezContent(
                        'EzHijackEmployeeResults',
                        EzHtml.build`
                            Employee ${response.employee.employeeName} account with id=${response.employee.id}
                            now hijacked by user with id=${response.employee.userId}
                            <div>
                                <pre>
                                    <code class="json">
                                        ${EzJson.toJson(response, 3, true)}
                                    </code>
                                </pre>
                            </div>`);
                }

                EzAdminViewController.ezInstance.ezRefreshSwapHijackState();
            },
            (eResponse) => {
                ezApi.ezclocker.ezUi.ezContent(
                    '_HijackManagerResults',
                    EzHtml.build`
                        Error:
                        <div>
                            <pre>
                                <code class="json">
                                    ${EzJson.toJson(eResponse, 3, true)}
                                </code>
                            </pre>
                        </div>`);

                EzAdminViewController.ezInstance.ezRefreshSwapHijackState();
            });
    }

    /**
     * @public @method
     */
    ezHijackManager() {
        ezApi.ezclocker.ezUi.ezContent('EzHijackManagerResults', '');

        let managerId = ezApi.ezclocker.ezGetInputValue('EzHijackManagerId');

        if (!managerId || 0 == managerId.length) {
            alert('Manager (aka employee) id is required to hijack!');

            ezApi.ezclocker.ezUi.ezFocusElement('EzHijackManagerId');

            return;
        }

        let url = `/api/v1/admin/hijack/manager/${managerId}`;

        ezApi.ezclocker.ezHttpHelper.ezGet(url)
            .then(
                (response) => {
                    if (0 != response.errorCode) {
                        ezApi.ezclocker.ezUi.ezContent(
                            'EzHijackManagerResults',
                            response.response);
                    } else if (ezApi.ezIsNotValid(response.employee)) {
                        ezApi.ezclocker.ezUi.ezContent(
                            'EzHijackManagerResults',
                            EzHtml.buld`
                                ${response.message}
                                <div>
                                    <pre>
                                        <code class="json">
                                            ${EzJson.toJson(response, 3, true)}
                                        </code>
                                    </pre>
                                </div>`);
                    } else {
                        EzAdminViewController.ezInstance.ezInitRestoreHijackButton(false, true);

                        ezApi.ezclocker.ezUi.ezContent(
                            'EzHijackManagerResults',
                            EzHtml.build`
                                Manager account ${response.employee.employeeName} account with id=${response.employee.id}
                                now hijacked by user with id=${response.employee.userId}
                                <div>
                                    <pre>
                                        <code class="json">
                                            ${EzJson.toJson(response, 3)}
                                        </code>
                                    </pre>
                                </div>`);
                    }

                    EzAdminViewController.ezInstance.ezRefreshSwapHijackState();
                },
                (eResponse) => {
                    ezApi.ezclocker.ezUi.ezContent(
                        '_HijackManagerResults',
                        EzHtml.build`
                            Error:
                            <div>
                                <pre>
                                    <code class="json">
                                        ${EzJson.toJson(eResponse, 3, true)}
                                    </code>
                                </pre>
                            </div>`);

                    EzAdminViewController.ezInstance.ezRefreshSwapHijackState();
                });
    }

    /**
     * @public @method
     */
    ezHijackPayrollManager() {
        ezApi.ezclocker.ezUi.ezContent('_HijackPayrollManagerResults', '');

        ezApi.ezclocker.ezUi.ezContent('_HijackResults', '');

        ezApi.ezclocker.ezUi.ezContent('_HijackResults2', '');

        let payrollManagerId = ezApi.ezclocker.ezGetInputValue('EzHijackPayrollManagerId');

        if (!payrollManagerId || 0 == payrollManagerId.length) {
            alert('Payroll Manager (aka employee) id is required to hijack!');

            ezApi.ezclocker.ezUi.ezFocusElement('EzHijackPayrollManagerId');

            return;
        }

        let url = `/api/v1/admin/hijack/employee/${payrollManagerId}`;

        ezApi.ezclocker.ezHttpHelper.ezGet(url)
            .then(
                (response) => {
                    if (0 != response.errorCode) {
                        ezApi.ezclocker.ezUi.ezContent(
                            'EzHijackPayrollManagerResults',
                            response.response);
                    } else if (null == response.employee) {
                        ezApi.ezclocker.ezUi.ezContent(
                            'EzHijackPayrollManagerResults',
                            EzHtml.build`
                                ${response.message}
                                <div>
                                    <pre>
                                        <code class="json">
                                            ${EzJson.toJson(response, 3, true)}
                                        </code>
                                    </pre>
                                </div>`);
                    } else {
                        EzAdminViewController.ezInstance.ezInitRestoreHijackButton(false, true);

                        ezApi.ezclocker.ezUi.ezContent(
                            'EzHijackManagerResults',
                            EzHtml.build`
                                Payroll Manager account ${response.employee.employeeName} account
                                with id=${response.employee.id} now hijacked by user
                                with id=${response.employee.userId}
                                <div>
                                    <pre>
                                        <code class="json">
                                            ${EzJson.toJson(response, 3)}
                                        </code>
                                    </pre>
                                </div>`);
                    }

                    EzAdminViewController.ezInstance.ezRefreshSwapHijackState();
                },
                (eResult) => {
                    ezApi.ezclocker.ezUi.ezContent(
                        'EzHijackPayrollManagerResults',
                        EzHtml.build`
                            Error:
                            <div>
                                <pre>
                                    <code class="json">
                                        ${EzJson.toJson(eResult, 3, true)}
                                    </code>
                                </pre>
                            </div>`);

                    EzAdminViewController.ezInstance.ezRefreshSwapHijackState();
                });
    }
}
