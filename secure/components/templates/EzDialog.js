/*
 * Location of this file from server root:
 * <script src="secure/components/templates/EzDialog/EzDialog.js" id="_EZScript_EzDialog"></script>
 */

/**
 * Global reference to the EzDialog controller.
 * Set after the jQuery document.ready event is triggered.
 */
var ezDialog = null;

/**
 * Constructor function for the EzDialog
 * Generic jQuery UI based dialog where content is provided externally through events.
 *
 * Available Events:
 * onBeforeInit
 * onInitializing
 * onInitSuccess
 * onInitFailure
 * onGenerateDialogConfig
 * onBeforeShow
 * onVislble
 * onLoadData
 * onFocus
 * onCanceled
 * onClosed
 * onCanSubmit
 * onBuildSubmitData
 * onBuildSubmitDataFailure
 * onSubmitSuccess
 * onSubmitError
 * onSubmitting
 * onBeforeSetupEzApi
 * onEzApiSetupComplete
 * onBuildDialogHeader
 * onBuildDialogContent
 * onCanInjectView
 * onInjectViewFailure
 * onViewInjected
 */
var EzDialog = function (title, buttons, size, modal, dialogConfigOverride) {
    this.ready = false;

    this.ezSetupApi();

    // Dialog Configuration Properties
    var me = this;

    this.buttons = buttons || [{
        text: 'Submit',
        id: '_EZC_EzDialogSubmit',
        'style': 'font-weight: bold',
        click: me.ezSubmit.bind(me)
    },
    {
        text: 'Cancel',
        id: '_EZC_EzDialogCancel',
        click: me.ezClose.bind(me),
    }
    ];

    this.title = title || '';

    this.size = size || {
        height: 400,
        width: 400
    };

    this.modal = modal || true;

    this.dialogConfigOverride = dialogConfigOverride;

    return true;
};

/**
 * Helps trigger custom events for the dialog
 */
EzDialog.prototype.ezOnEvent = function (eventHandler, data) {
    if (typeof eventHandler == 'undefined' || !eventHandler) {
        // Return the data passed in or null
        return data ? data : null;
    }

    var result;
    if (data) {
        result = eventHandler({
            sender: this,
            data: data
        });
        // Return a usable result from the handler or the data passed in
        return result ? result : data;
    }

    result = eventHandler({
        sender: this
    });
    // Return a usable result from the handler or null
    return result ? result : null;
};

/**
 * Initializes the dialog controller and view
 */
EzDialog.prototype.ezInit = function () {
    this.ezOnEvent(this.onBeforeInit);

    return this.ezApi.promise(function (resolve, reject) {
        this.getDialogConfiguration();
        this.ezDialog.dialog(this.ezGenerateDialogConfig());
        this.ezInjectView().then(
            function (sm) {
                this.ready = true;
                this.ezOnEvent(this.onInitSuccess, sm);
                return resolve(sm);
            },
            function (em) {
                this.ready = false;
                this.ezOnEvent(this.onInitFailure, em);
                return reject(em);
            }
        );
        return this.ezOnEvent(this.onInitializing);
    }.bind(this));
};

/**
 * Generates the dialog configuration to use
 */
EzDialog.prototype.ezGenerateDialogConfig = function () {
    var me = this;
    var result = this.dialogConfigOverride || {
        title: me.title,
        autoOpen: false,
        closeOnEscape: true,
        height: me.size.height,
        width: me.size.width,
        modal: me.modal,
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
        buttons: me.buttons
    };

    return this.ezOnEvent(this.onGenerateDialogConfig, result);
};

/**
 * Shows the dialog UI
 */
EzDialog.prototype.ezShow = function (dialogData) {
    dialogData = this.ezOnEvent(this.onBeforeShow, dialogData);
    return new this.ezApi.promise(function (resolve) {
        dialogData = this.onEzLoadDialogData(dialogData).then(function () {
            this.ezDialog.dialog('open');
            this.ezOnEvent(this.onVislble, dialogData);
            return resolve();
        }.bind(this));
    }.bind(this));
};

/**
 * Loads data into the dialog
 */
EzDialog.prototype.ezLoadDialogData = function (dialogData) {
    return this.ezOnEvent(this.onLoadData, dialogData);
};

/**
 * Sets the focus on the dialog
 */
EzDialog.prototype.ezFocus = function () {
    return this.ezOnEvent(this.onFocus);
};

/**
 * Closes the dialog and cancels the action
 */
EzDialog.prototype.ezClose = function () {
    if (this.onEzEvent(this.onCanceled, true)) {
        this.ezDialog.dialog('close');
        return this.onEzEvent(this.onClosed, true);
    }
    return false;
};

/**
 * Submits the action for the dialog
 */
EzDialog.prototype.ezSubmit = function () {
    if (!this.ezOnEvent(this.onCanSubmit, true)) {
        return this.ezApi.promise.reject({
            error: 'Submit action was canceled.'
        });
    }

    return new this.ezApi.promise(function (resolve, reject) {
        var submitData = this.ezOnEvent(this.onBuildSubmitData, {
            'url': '',
            'payload': ''
        });
        if (!submitData || !submitData.url || !submitData.payload) {
            var em = {
                error: 'Failed to build submit data.',
                'submitData': submitData
            };
            this.onEzEvent(this.onBuildSubmitDataFailure, em);
            return reject(em);
        }

        this.ezApi.Public.http.post(submitData.url, submitData.payload).then(
            function (response) {
                this.ezApi.ezUpdateEmail.ezClose();
                this.ezOnEvent(this.onSubmitSuccess, response);
                return resolve(response);
            }.bind(this),
            function (errorResponse, jqXHR) {
                var em = {
                    error: errorResponse,
                    'submitData': submitData,
                    status: jqXHR.status,
                    statusText: jqXHR.statusText,
                    xhr: jqXHR
                };
                this.ezApi.Public.logger.error(em);
                this.ezOnEvent(this.onSubmitError, em);
                return reject(em);
            }.bind(this)
        );

        return this.ezOnEvent(this.onSubmitting, submitData);
    }.bind(this));
};


/**
 * Set up the internal ezApi reference
 */
EzDialog.prototype.ezSetupApi = function () {
    this.ezApi = this.ezOnEvent(this.onBeforeSetupEzApi, this.ezApi);
    if (typeof this.ezApi !== 'undefined' && this.ezApi) {
        return this.ezApi;
    }

    if (typeof ezApi == 'undefined') {
        this.ezApi.p.logger = ezApi.p.logger || typeof ezLogger !== 'undefined' ? ezLogger : null;
        this.ezApi.p.http = ezApi.p.http || typeof ezHttpHelper !== 'undefined' ? ezHttpHelper : null;
        this.ezApi.p.nav = ezApi.p.nav || typeof ezNavigation !== 'undefined' ? ezNavigation : null;
        this.ezApi.promise = ezApi.promise || typeof Promise !== 'undefined' ? Promise : null;
        return this.ezApi;
    }

    this.ezApi = ezApi;
    return this.ezOnEvent(this.onEzApiSetupComplete, this.ezApi);
};

/**
 * Returns the location of the dialogs View HTML file
 */
EzDialog.prototype.getViewLocation = function () {
    if (typeof this.viewLocation == 'undefined' || !this.viewLocation) {
        this.viewLocation = this.ezApi.p.nav.getSecurePageUrl('components/templates/EzDialog.html');
    }
    return this.viewLocation;
};

/**
 * Injects the dialog header html into the view
 */
EzDialog.prototype.ezInjectDialogHeader = function (headerHtml) {
    return headerHtml ?
        $('#_EZC_EzDialogHeader').html(headerHtml) :
        $('#_EZC_EzDialogHeader').html('<!-- no header provided -->');
};

/**
 * Injects the dialog content html into the view
 */
EzDialog.prototype.ezInjectDialogContent = function (contentHtml) {
    return contentHtml ?
        $('#_EZC_EzDialogContent').html(contentHtml) :
        $('#_EZC_EzDialogContent').html('<!-- no content provided -->');
};

/**
 * Loads the dialog content
 */
EzDialog.prototype.ezInitDialogContent = function () {
    return new this.ezApi.promise(function (resolve) {
        var headerHtml = this.ezOnEvent(this.onBuildDialogHeader, $('#_EZC_EzDialogHeader').html());
        this.ezInjectDialogHeader(headerHtml);

        var contentHtml = this.ezOnEvent(this.onBuildDialogContent, $('#_EZC_EzDialogContent').html());
        this.ezInjectDialogContent(contentHtml);
        return resolve();
    });
};

/**
 * Injects the dialog's HTML into the HTML body
 */
EzDialog.prototype.ezInjectView = function () {
    if (!this.ezOnEvent(this.onCanInjectView, true)) {
        return this.ezApi.promise.reject({
            error: 'Handler of onSumitting event stopped the submit action'
        });
    }

    return new this.ezApi.External.promise(function (resolve, reject) {
        $('body').append('<div id="_EZC_EzDialogComponent" style="display: none"></div>');

        var viewUrl = this.ezGenerateViewUrl();
        $('#_EZC_EzDialogComponent').load(viewUrl, function (response, status, jqXHR) {
            if (status == 'error') {
                var em = {
                    error: 'Failed to load controller view from ' + viewUrl,
                    status: jqXHR.status,
                    statusText: jqXHR.statusText,
                    response: response,
                    xhr: jqXHR
                };
                this.ezOnEvent(this.onInjectViewFailure, em);
                return reject(em);
            }
            return this.ezInitDialogContent().then(function () {
                this.ezDialog = $('#_EZC_EzDialog');
                this.ezOnEvent(this.onViewInjected, this.ezDialog);
                return resolve(this.ezDialog);
            });
        }.bind(this));
    }.bind(this));
};

/**
 * Launches a debug version of the dialog
 */
EzDialog.prototype.ezDebug = function () {
    var debugUser = {
        username: 'debug@mailinator.com'
    };

    if (!this.ready) {
        this.ezInjectView().then(
            function () {
                return this.ezShow(debugUser);
            }.bind(this),
            function (em) {
                this.ezApi.p.logger.error('ezDebug Failure: ' + JSON.stringify(em));
                return false;
            }.bind(this));
    }

    this.ezApi.p.logger.info('Launching EzDialog debug mode');
    return this.ezShow(debugUser);
};

/**
 * Jquery Initialization
 */
document.addEventListener('onEzApiReady', function() {
    ezDialog = new EzDialog();
    if (typeof ezApi !== 'undefined' && ezApi) {
        // Injecting into ezApi
        ezApi.addPublicApi('ezDialog', ezDialog);
    }
    return ezDialog.ezInit();
});
