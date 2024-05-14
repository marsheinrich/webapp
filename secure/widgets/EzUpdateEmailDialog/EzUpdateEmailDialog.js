class EzUpdateEmail {
    static ezApiName = 'ezUpdateEmail';
    static ezEventNames = {
        onReady: 'ezOn_EzUpdateEmail_Ready'
    };
    static ezInstance = null;
    static ezApiRegistrationState = null;
    static ezCanRegister() {
        return 'PENDING' === EzUpdateEmail.ezApiRegistrationState &&
            Object.prototype.hasOwnProperty.call(globalThis, 'ezApi') &&
            globalThis['ezApi'] && globalThis['ezApi'].ready;
    }
    static #ezRegistrator() {
        if (EzUpdateEmail.ezCanRegister()) {
            EzUpdateEmail.ezInstance = ezApi.ezRegisterEnumeration(EzUpdateEmail);

            EzUpdateEmail.ezApiRegistrationState = 'REGISTERED';
        }
    }
    // Static Constructor
    static {
        if (null == EzUpdateEmail.ezApiRegistrationState) {
            EzUpdateEmail.ezApiRegistrationState = 'PENDING';

            document.addEventListener(
                'onEzApiReady',
                EzUpdateEmail.#ezRegistrator);
        }
    }

    constructor() {
        this.ready = false;
    }

    ezInit() {
        const self = EzUpdateEmail.ezInstance;

        self.ezInject().then(() => {
            self.ezDialog.dialog({
                autoOpen: false,
                closeOnEscape: true,
                height: 375,
                width: 650,
                modal: true,
                show: 'blind',
                dialogClass: 'no-close',
                showOpt: {
                    direction: 'down'
                },
                position: {
                    my: 'center',
                    at: 'center',
                    of: window
                },
                buttons: [{
                    text: 'Update',
                    id: '_EZ_UpdateEmailButton',
                    click: ezApi.ezclocker[EzUpdateEmail.ezApiName].ezSubmit,
                    'style': 'font-weight: bold'
                },
                {
                    text: 'Cancel',
                    id: '_EZ_CancelUpdateEmailButton',
                    click: ezApi.ezclocker[EzUpdateEmail.ezApiName].ezClose
                }
                ],
            });
        });

        self.ready = true;
    }

    /**
     * Shows EzUpdateEMail dialog
     * @param {object} user
     */
    ezShow(user) {
        const self = EzUpdateEmail.ezInstance;

        if (typeof user == 'undefined' || !user || !user.id || !user.username) {
            ezApi.ezclocker.logger.error('A User reference is required to update an email .');
            self.ezClose();
            return;
        }

        $('#_EZC_UpdateEmailCurrent').html(user.username);
        $('#_EZC_UpdateEmailUserId').val(user.id);
        $('#_EZC_UpdateEmailCurrent').val(user.username);
        $('#_EZC_UpdateEmailInput').val(user.username);

        self.ezDialog.dialog('open');
        self.ezFocus();
    }

    ezFocus() {
        document.getElementById('_EZC_UpdateEmailInput').focus();
    }

    ezClose() {
        ezApi.ezclocker[EzUpdateEmail.ezApiName].ezDialog.dialog('close');
    }

    ezSubmit() {
        let payload = {
            userId: $('#_EZC_UpdateEmailUserId').val(),
            original: $('#_EZC_UpdateEmailCurrent').val(),
            update: $('#_EZC_UpdateEmailNew').val()
        };
        ezApi.ezclocker.http.post(
            ezApi.ezclocker.nav.getInternalApiServiceUrl('account/email/update', 'v1'),
            ezApi.ezToJson(payload))
            .then(
                () => ezApi.ezclocker.ezUpdateEmail.ezClose(),
                (errorResponse) => ezApi.ezclocker.logger.error('Failed to update user email : ' + errorResponse));
    }

    getViewLocation() {
        const self = EzUpdateEmail.ezInstance;

        if (typeof self.viewLocation == 'undefined' || !self.viewLocation) {
            self.viewLocation = ezApi.ezclocker.nav.getSecurePageUrl(
                'components/EzUpdateEmailDialog/EzUpdateEmailDialogView.html');
        }
        return self.viewLocation;
    }

    ezInject() {
        const self = EzUpdateEmail.ezInstance;

        return ezApi.ezPromise((resolve) => {
            $('body').append('<div id="_EZC_UpdateEmailDialog_Inject" style="display: none"></div>');
            $('#_EZC_UpdateEmailDialog_Inject').load(self.getViewLocation(), () => {
                self.ezDialog = $('#_EZC_UpdateEmailDialog');
                return resolve(self);
            });
        });
    }

    ezDebug() {
        const self = EzUpdateEmail.ezInstance;

        let debugUser = {
            username: 'debug@mailinator.com'
        };

        if (!self.ready) {
            self.ezInject()
                .then(
                    (injectedComp) => {
                        injectedComp.ezShow(debugUser);
                        return true;
                    });
        }

        self.ezShow(debugUser);
        return true;
    }
}

export {
    EzUpdateEmail
};
