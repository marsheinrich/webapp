import { EzClass } from '/ezlibrary/EzClass.js';
import { EzEventEngine } from '/ezlibrary/ez-event-engine.js';

import { EzClockerContext } from '/ezlibrary/EzClockerContext/ez-context.js';

import { EzEmployerService } from '/secure/javascript/common/ezclocker-employer-services.js';

import { EzDialogConfig } from '/ezlibrary/ux/dialogs/EzDialogConfig.js';

import { EzDialog } from '/public/javascript/common/ezclocker-dialog-helper.js';

/**
    Handles loading of the employer logos
    Import with:
        import { EzEmployerLogoController } from '/secure/account/account-CompanyLogo.js';

        // Can register
        globalThis.ezApi.ezclocker[EzEmployerLogoController.ezApiName] &&
        globalThis.ezApi.ezclocker[EzEmployerLogoController.ezApiName].ready &&

        // Ready event
        document.addEventListener(
            EzEmployerLogoController.ezEventNames.onReady,
            this.#ezRegistrator);
 */
class EzEmployerLogoController extends EzClass {
    /**
        @public @static @field
        @type {EzEmployerLogoController}
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
        return 'ezEmployerLogoController';
    }

    /**
        @public @static @readonly @property
        @returns {object}
     */
    static get ezEventNames() {
        return {
            onReady: 'ezOn_EzEmployerLogoControllerr_Ready',
            onUpdateEmployerLogoDialogSubmited: 'ezOn_EzEmployerLogoControllerr_Submitted',
            onUpdateEmployerLogoDialogError: 'ezOn_EzEmployerLogoControllerr_Error',
            onUpdateEmployerLogoDialogCanceled: 'ezOn_EzEmployerLogoControllerr_Canceled'
        };
    }

    /**
        @public @static @readonly @property
        @returns {boolean}
     */
    static get ezCanRegister() {
        return 'PENDING' === EzEmployerLogoController.ezApiRegistrationState &&
            Object.prototype.hasOwnProperty.call(globalThis, 'ezApi') &&
            globalThis.ezApi && globalThis.ezApi.ready &&

            globalThis.ezApi.ezclocker[EzEventEngine.ezApiName] &&
            globalThis.ezApi.ezclocker[EzEventEngine.ezApiName].ready &&

            globalThis.ezApi.ezclocker[EzClockerContext.ezApiName] &&
            globalThis.ezApi.ezclocker[EzClockerContext.ezApiName].ready &&

            globalThis.ezApi.ezclocker[EzEmployerService.ezApiName] &&
            globalThis.ezApi.ezclocker[EzEmployerService.ezApiName].ready &&

            globalThis.ezApi.ezclocker[EzDialog.ezApiName] &&
            globalThis.ezApi.ezclocker[EzDialog.ezApiName].ready;
    }

    /**
        @private @static @method
        @returns {boolean}
     */
    static #ezRegistrator() {
        if (!EzEmployerLogoController.ezCanRegister) {
            return false;
        }

        EzEmployerLogoController.ezInstance = ezApi.ezRegisterNewApi(
            EzEmployerLogoController,
            EzEmployerLogoController.ezApiName);
        EzEmployerLogoController.ezApiRegistrationState = 'REGISTERED';
        return true;
    }

    static {
        if (null == EzEmployerLogoController.ezApiRegistrationState) {
            EzEmployerLogoController.ezApiRegistrationState = 'PENDING';

            if (!EzEmployerLogoController.#ezRegistrator()) {
                document.addEventListener(
                    'onEzApiReady',
                    () => {
                        if (!EzEmployerLogoController.#ezRegistrator()) {
                            document.addEventListener(
                                EzEventEngine.ezEventNames.onReady,
                                EzEmployerLogoController.#ezRegistrator);

                            document.addEventListener(
                                EzClockerContext.ezEventNames.onReady,
                                EzEmployerLogoController.#ezRegistrator);

                            document.addEventListener(
                                EzEmployerService.ezEventNames.onReady,
                                EzEmployerLogoController.#ezRegistrator);

                            document.addEventListener(
                                EzDialog.ezEventNames.onReady,
                                EzEmployerLogoController.#ezRegistrator);
                        }
                    });
            }
        }
    }

    /**
        @public @constructor
     */
    constructor() {
        super();
    }

    /**
        @deprecated
        Migrate to using the static EzEmployerLogoController.ezEventNames reference instead
        @public @readonly @property
        @returns {object}
     */
    get ezEventNames() {
        return EzEmployerLogoController.ezEventNames;
    }

    /**
        @protected
        Initializes EzEmployerLogoController
        @returns {EzEmployerLogoController}
     */
    ezInit() {
        ezApi.ezclocker.ezEventEngine.ezRegisterEvent(
            EzEmployerLogoController.ezApiName,
            EzEmployerLogoController.ezEventNames.onUpdateEmployerLogoDialogSubmited);

        ezApi.ezclocker.ezEventEngine.ezRegisterEvent(
            EzEmployerLogoController.ezApiName,
            EzEmployerLogoController.ezEventNames.onUpdateEmployerLogoDialogError);

        ezApi.ezclocker.ezEventEngine.ezRegisterEvent(
            EzEmployerLogoController.ezApiName,
            EzEmployerLogoController.ezEventNames.onUpdateEmployerLogoDialogCanceled);

        EzEmployerLogoController.ezInstance.ezInitUX();
        return EzEmployerLogoController.ezInstance;
    }

    /**
        @public
        Original: configureUpdateCompanyLogo
     */
    ezInitUX() {
        const self = EzEmployerLogoController.ezInstance;

        ezApi.ezclocker.ezUi.ezAppendContent('_HideDialogsDiv', self.ezBuildDialogHtml());

        let dialogConfig = new EzDialogConfig('EzUpdateCompanyLogoDialog');
        dialogConfig.width = 450;
        dialogConfig.buttons = {
            'Update': self.ezSubmit,
            Cancel: self.ezCancel
        };
        ezApi.ezclocker.ezDialog.ezInitDialogWithConfig('EzUpdateCompanyLogoDialog', dialogConfig);
    }

    /**
        @protected @method
        Displays the selected employer logo in the UX
     */
    ezDisplaySelectedEmployerLogo(input) {
        if (input.files && input.files[0]) {
            let reader = new FileReader();

            reader.onload = (event) => {
                ezApi.ezclocker.ezUi.ezId('EzSelectedEmployerLogoPreviewImg')
                    .attr('src', event.target.result);

                ezApi.ezclocker.ezUi.ezId('EzSelectedEmployerLogo')
                    .attr('src', event.target.result)
                    .width(110)
                    .height(40);
            };

            reader.readAsDataURL(input.files[0]);
        }
    }

    /**
        @public
        Shows the dialog
        NOTE: Event handler params are deprecated. Wire up directly with ezEventEngine instead.
        @param {function|null} onSubmittedHandler
        @param {function|null} onErrorHandler
        @param {function|null} onCancelHandler
     */
    ezShow(onSubmittedHandler, onErrorHandler, onCancelHandler) {
        const self = EzEmployerLogoController.ezInstance;

        self.onSubmitted = onSubmittedHandler;
        self.onError = onErrorHandler;
        self.onCancel = onCancelHandler;

        if (ezApi.ezIsFunction(self.onSubmitted)) {
            ezApi.ezclocker.ezEventEngine.ezWantEvent(
                EzEmployerLogoController.ezEventNames.onUpdateEmployerLogoDialogSubmited,
                EzEmployerLogoController.ezApiName,
                self.onSubmitted);
        }
        if (ezApi.ezIsFunction(self.onError)) {
            ezApi.ezclocker.ezEventEngine.ezWantEvent(
                EzEmployerLogoController.ezEventNames.onUpdateEmployerLogoDialogError,
                EzEmployerLogoController.ezApiName,
                self.onError);
        }
        if (ezApi.ezIsFunction(self.onCancel)) {
            ezApi.ezclocker.ezEventEngine.ezWantEvent(
                EzEmployerLogoController.ezEventNames.onUpdateEmployerLogoDialogCanceled,
                EzEmployerLogoController.ezApiName,
                self.onCancel);
        }

        ezApi.ezclocker.ezDialog.ezShowDialog('EzUpdateCompanyLogoDialog').then(ezApi.ezIgnoreResolve());
    }

    /**
        @public
        Closes the dialog and then calls the onCancel even handler (if any)
        Original: closeUpdateCompanyLogoDialog
     */
    ezCancel() {
        const self = EzEmployerLogoController.ezInstance;

        self.ezClose();

        ezApi.ezclocker.ezEventEngine.ezTriggerEvent(
            EzEmployerLogoController.ezEventNames.onUpdateEmployerLogoDialogCanceled,
            ezApi.ezclocker.ezEventEngine.ezBuildEventData(
                EzEmployerLogoController.ezApiName,
                'Company logo update canceled.', {
                    dialogController: self
                }));
    }

    /**
        @public
        Closes without calling the onCancel event handler (if any)
     */
    ezClose() {
        ezApi.ezclocker.ezDialog.ezCloseDialog('EzUpdateCompanyLogoDialog');
    }

    /**
        @public
        Submits the employer's logo
     */
    ezSubmit() {
        const self = EzEmployerLogoController.ezInstance;

        let formData = ezApi.ezclocker.ezEmployerService.buildFormData('EzUpdateCompanyLogoForm');

        ezApi.ezclocker.ezEmployerService.ezUploadEmployerLogo(formData)
            .then(
                () => {
                    self.ezClose();
                    ezApi.ezclocker.ezEventEngine.ezTriggerEvent(
                        EzEmployerLogoController.ezEventNames.onUpdateEmployerLogoDialogSubmited,
                        ezApi.ezclocker.ezEventEngine.ezBuildEventData(
                            EzEmployerLogoController.ezApiName,
                            'Company logo updated.', {
                                dialogController: self
                            }));
                },
                (eResponse) => {
                    ezApi.ezclocker.ezLogger.error(
                        ezApi.ezEM`Failed to update the employer logo. Error: ${ezApi.ezToJson(eResponse)}`);

                    self.ezClose();
                    ezApi.ezclocker.ezEventEngine.ezTriggerEvent(
                        EzEmployerLogoController.ezEventNames.onUpdateEmployerLogoDialogError,
                        ezApi.ezclocker.ezEventEngine.ezBuildEventData(
                            EzEmployerLogoController.ezApiName,
                            'Company logo update error.', {
                                dialogController: self,
                                errorResponse: eResponse
                            }));
                });
    }

    /**
        @protected
        Builds the dialog's html
        @returns {String}
     */
    ezBuildDialogHtml() {
        return ezApi.ezTemplate`
            <div id="EzUpdateCompanyLogoDialog" title="Update Company Logo">
                <form id="EzUpdateCompanyLogoForm"
                    action="${ezApi.ezclocker.ezNavigation.ezGetInternalApiUrl('employer/logo', 'v2')}
                    enctype="multipart/form-data" method="post">
                    <label for="EzFileUploadInput">
                        Click the Choose File button below to browse your local files and select your company logo.
                        Preferred image size is: 110px x 40px (classic).
                    </label>
                    <input id="EzFileUploadInput" type="file" accept=".jpg, .png, .jpeg, .gif" name="employerLogo" />
                    <div class="ezText-micro-navy">Accept file types: .jpg, .png, .jpeg, and .gif</div>
                </form>
            </div>`;
    }
}

export {
    EzEmployerLogoController
};
