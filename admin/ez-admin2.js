import { EzClass } from '/ezlibrary/EzClass.js';

/**
    Import with:
    import { EzAdminViewController } '/admin/ez-admin.js';
 */
class EzAdminViewController extends EzClass {
    /**
        @public @static @field
        @type {EzNavigation}
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
        return 'ezAdminViewController';
    }

    /**
        @public @static @readonly @property
        @returns {object}
     */
    static get ezEventNames() {
        return {
            onReady: 'ezOn_EzAdminViewController_Ready'
        };
    }

    /**
        @public @static @readonly @property
        @returns {boolean}
     */
    static get ezCanRegister() {
        return 'PENDING' === EzAdminViewController.ezApiRegistrationState &&
                Object.prototype.hasOwnProperty.call(globalThis, 'ezApi') &&
                globalThis.ezApi && globalThis.ezApi.ready;
    }

    /**
        @private @static @method
        @returns {boolean}
     */
    static #ezRegistrator() {
        if (!EzAdminViewController.ezCanRegister) {
            return false;
        }
        EzAdminViewController.ezInstance = ezApi.ezRegisterNewApi(
            EzAdminViewController,
            EzAdminViewController.ezApiName);
        EzAdminViewController.ezApiRegistrationState = 'REGISTERED';
        return true;
    }

    // Static constructor
    static {
        if (null == this.ezApiRegistrationState) {
            this.ezApiRegistrationState = 'PENDING';

            if (!this.#ezRegistrator()) {
                document.addEventListener(
                    'onEzApiReady',
                    this.#ezRegistrator);
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
        @public @field
        @type {string}
     */
    testEmailPayLoad = '';

    /**
        @public @field
        @type {string}
     */
    lastUrl = '';

    ezInit() {
        $('form#removeEmployeeForm').submit(EzAdminViewController.ezInstance.removeEmployeeSubmit);
        $('form#removeEmployerForm').submit(EzAdminViewController.ezInstance.removeEmployerSubmit);
        $('form#listDeveloperEmployersForm').submit(EzAdminViewController.ezInstance.listDeveloperEmployersSubmit);
        $('form#addEmailTemplateForm').submit(EzAdminViewController.ezInstance.addEmailTemplateSubmit);
        $('form#updateEmailTemplateForm').submit(EzAdminViewController.ezInstance.updateEmailTemplateSubmit);
        $('form#removeEmailTemplateForm').submit(EzAdminViewController.ezInstance.removeEmailTemplateSubmit);
        $('form#getEmailTemplateForm').submit(EzAdminViewController.ezInstance.getEmailTemplateSubmit);
        $('form#_ForceEmailQueue').submit(EzAdminViewController.ezInstance.forceEmailQueueSubmit);
        return EzAdminViewController.ezInstance;
    }

    sendTestEmail() {
        EzAdminViewController.ezInstance.lastUrl =
            ezApi.ezclocker.ezNavigation.ezGetInternalApiUrl('_email/template/test');
        let data = $('#_EmailTestDataFields').val();

        EzAdminViewController.ezInstance.testEmailPayLoad = {
            templateName: `"${$('#_EmailTestName').val()}"`,
            recipient: `"${$('#_EmailTestRecipient').val()}"`,
            dataFields: `${data.trim()}`
        };

        ezApi.ezclocker.ezUi.ezContent(
            '_TestEmailResults',
            ezApi.ezTemplate`
                <div>URL: ${EzAdminViewController.ezInstance.lastUrl}</div>
                <h3>Request Payload:</h3>
                <code>
                    ${EzAdminViewController.ezInstance.testEmailPayLoad}
                </code>`);

        EzAdminViewController.ezInstance.ezPost(
            EzAdminViewController.ezInstance.lastUrl,
            EzAdminViewController.ezInstance.testEmailPayLoad)
            .then(
                EzAdminViewController.ezInstance.sendTestEmailSuccess,
                EzAdminViewController.ezInstance.handelError);
    }

    sendTestEmailSuccess(result) {
        ezApi.ezclocker.ezUi.ezContent(
            '#_TestEmailResults',
            ezApi.ezTemplate`
            <div>URL: ' + EzAdminViewController.ezInstance.lastUrl</div>
            <h3>Request Payload</h3>
            <code>
                ${EzAdminViewController.ezInstance.testEmailPayLoad}
            </code>
            <h3>Response</h3>
                <code>
                    ${ezApi.ezToJson(result, 3, true)}
                </code>`);
    }

    // Force Email Queue
    forceEmailQueueSubmit(event) {
        EzAdminViewController.ezInstance.postForm(
            event,
            this,
            () => alert('Queue is now processing.'),
            EzAdminViewController.ezInstance.handelError);
    }

    // Get email template
    getEmailTemplateSubmit(event) {
        ezApi.ezclocker.ezUi.ezContent(
            'getEmailTemplateResults',
            'Processing ...');

        EzAdminViewController.ezInstance.postForm(
            event,
            this,
            (response) => {
                ezApi.ezclocker.ezUi.ezContent(
                    'getEmailTemplateResults',
                    ezApi.ezToJson(response, 3, true));
            },
            EzAdminViewController.ezInstance.handelError);
    }

    // Remove email template
    removeEmailTemplateSubmit(event) {
        ezApi.ezclocker.ezUi.ezContent(
            'removeEmailTemplateResults',
            'Processing ...');

        EzAdminViewController.ezInstance.postForm(
            event,
            this,
            (response) => {
                ezApi.ezclocker.ezUi.ezContent(
                    'removeEmailTemplateResults',
                    ezApi.ezToJson(response, 3, true));
            },
            EzAdminViewController.ezInstance.handelError);
    }

    // Update email template
    updateEmailTemplateSubmit(event) {
        ezApi.ezclocker.ezUi.ezContent(
            'updateEmailTemplateResults',
            'Processing ...');

        EzAdminViewController.ezInstance.postForm(
            event,
            this,
            (response) => {
                ezApi.ezclocker.ezUi.ezContent(
                    'updateEmailTemplateResults',
                    ezApi.ezToJson(response, 3, true));
            },
            EzAdminViewController.ezInstance.handelError);
    }

    addEmailTemplateSubmit(event) {
        ezApi.ezclocker.ezUi.ezContent(
            'addEmailTemplateResults',
            'Processing ...');

        EzAdminViewController.ezInstance.postForm(
            event,
            this,
            (response) => {
                ezApi.ezclocker.ezUi.ezContent(
                    'addEmailTemplateResults',
                    ezApi.ezToJson(response, 3, true));
            },
            EzAdminViewController.ezInstance.handelError);
    }

    listDeveloperEmployersSubmit(event) {
        ezApi.ezclocker.ezUi.ezContent(
            'listDeveloperEmployersResults',
            'Processing results...');

        EzAdminViewController.ezInstance.postForm(
            event,
            this,
            (response) => {
                ezApi.ezclocker.ezUi.ezContent(
                    'listDeveloperEmployersResults',
                    ezApi.ezToJson(response, 3, true));
            },
            EzAdminViewController.ezInstance.handelError);
    }

    removeEmployerSubmit(event) {
        event.preventDefault();

        ezApi.ezclocker.ezUi.ezContent(
            'removeEmployerResults',
            'Processing results...');

        // Get Form Values
        let employerId = ezApi.ezclocker.ezUi.ezGetInputValue('employerId');

        // Build URL
        let url = `${this.action}/${employerId}`;

        EzAdminViewController.ezInstance.postUrlForm(
            event,
            this,
            url,
            (response) => {
                ezApi.ezclocker.ezUi.ezContent(
                    'removeEmployerResults',
                    ezApi.ezToJson(response, 3, true));
            },
            EzAdminViewController.ezInstance.handelError);
    }

    // remove employee
    removeEmployeeSubmit(event) {
        event.preventDefault();

        ezApi.ezclocker.ezUi.ezContent(
            'removeEmployeeResults',
            'Processing ...');

        // Get Form Values
        let employerId = ezApi.ezclocker.ezUi.ezGetInputValue('employerId');

        let employeeId = ezApi.ezclocker.ezUi.ezGetInputValue('employeeId');

        EzAdminViewController.ezInstance.postUrlForm(
            event,
            this,
            `${this.action}/${employerId}/${employeeId}`,
            (response) => {
                ezApi.ezclocker.ezUi.ezContent(
                    'removeEmployeeResults',
                    ezApi.ezToJson(response, 3, true));
            },
            EzAdminViewController.ezInstance.handelError);
    }

    getPromoCodeUrl() {
        ezApi.ezclocker.ezHttpHelper.ezGet('/special/server/domain')
            .then(
                (response) => {
                    let code = ezApi.ezclocker.ezUi.ezGetInputValue('_PromoCode');
                    let data = ezApi.ezclocker.ezUi.ezGetInputValue('_PromoData');
                    let target = ezApi.ezclocker.ezUi.ezGetInputValue('_PromoTarget');

                    let domain = response.message;

                    let promoUrl = `${domain}/promo?code=${encodeURIComponent(code)}`;

                    if (0 != data.length) {
                        promoUrl = `${promoUrl}&data=${encodeURIComponent(data)}`;
                    }

                    if (0 != target.length) {
                        promoUrl = `${promoUrl}&url=${encodeURIComponent(target)}`;
                    }

                    ezApi.ezclocker.ezUi.ezContent(
                        '_PromoUrlResults',
                        ezApi.ezTemplate`
                            <a href="${promoUrl}" target="_EzClocker_Promo_${encodeURIComponent(code)}">
                                ${promoUrl}
                            </a>`);
                },
                EzAdminViewController.ezInstance.handelError);
    }

    deleteAccount() {
        let userName = ezApi.ezclocker.ezUi.ezGetInputValue('ezAdminDeleteAccountUserName');

        if (ezApi.ezStringHasLength(userName)) {
            let url = ezApi.ezclocker.nav.ezGetInternalApiUrl(`account?username=${userName}`);
            ezApi.ezclocker.ezHttpHelper.ezDelete(url)
                .then(
                    (response) => {
                        if (0 != response.errorCode) {
                            ezUi.ezContent(
                                'ezAdminDeleteUserAccountResults',
                                ezApi.ezToJson(response, 3));
                            return;
                        }

                        ezApi.ezclocker.ezUi.ezContent(
                            'ezAdminDeleteUserAccountResults',
                            'Account Deleted');
                    },
                    (eResponse) => {
                        ezApi.ezclocker.ezUi.ezContent(
                            'ezAdminDeleteUserAccountResults',
                            ezApi.ezToJson(eResponse, 3));
                    });
        }
    }

    createEmployeeInvite() {
        let userFullName = ezApi.ezclocker.ezUi.ezGetInputValue('ezAdminCreateInviteFullUserName');
        let userEmail = ezApi.ezclocker.ezUi.ezGetInputValue('ezAdminCreateInviteEmailId');

        if (ezApi.ezStringHasLength(userFullName) && ezApi.ezStringHasLength(userEmail)) {
            let url = ezApi.ezclocker.ezNavigation.ezGetInternalApiUrl(
                ezApi.ezUrlTemplate`_admin/create-employee-invite
                    ?userName=${userFullName}
                    &userEmail=${userEmail}`);

            ezApi.ezclocker.ezHttpHelper.ezGet(url)
                .then(
                    (response) => {
                        ezApi.ezclocker.ezUi.ezSetInputValue('ezAdminCreateInviteFullUserName', '');
                        ezApi.ezclocker.ezUi.ezSetInputValue('ezAdminCreateInviteEmailId', '');

                        if (200 !== response.errorCode) {
                            ezApi.ezclocker.ezUi.ezContent(
                                'ezAdminCreateEnInviteResults',
                                ezApi.ezToJson(response.message, 3));
                            return;
                        }
                        ezApi.ezclocker.ezUi.ezContent(
                            'ezAdminCreateEnInviteResults',
                            ezApi.ezMsg`
                                Invite created for ${userFullName}:
                                ${window.location.protocol}//${window.location.host}/employee-signup
                                ${ezApi.ezToJson(response.message, 3)}`);
                    },
                    (eResponse) => {
                        ezApi.ezclocker.ezUi.ezSetInputValue('ezAdminCreateInviteFullUserName', '');
                        ezApi.ezclocker.ezUi.ezSetInputValue('ezAdminCreateInviteEmailId', '');
                        ezApi.ezclocker.ezUi.ezContent(
                            'ezAdminCreateEnInviteResults',
                            ezApi.ezToJson(eResponse, 3));
                    });
        } else {
            ezApi.ezclocker.ezUi.ezContent(
                'ezAdminCreateEnInviteResults',
                'Username and email id are both required. Please enter both');
        }
    }

    moveEmployeeToEmployer() {
        document.getElementById('moveEmployeeToEmployerSubmitButton').disabled = true;
        document.getElementById('moveEmployeeToEmployerSubmitButton').hidden = true;

        let employeeEmail = ezApi.ezclocker.ezUi.ezGetInputValue('ezAdminBulkMoveEmployeesFromEmployer');
        let toEmployerEmailId = ezApi.ezclocker.ezUi.ezGetInputValue('ezAdminBulkMoveEmployeesToEmployer');

        if (ezApi.ezStringHasLength(employeeEmail) && ezApi.ezStringHasLength(toEmployerEmailId)) {
            ezApi.ezclocker.ezUi.ezContent(
                'ezAdminBulkMoveEmployeesResults',
                `Employee ${employeeEmail} being moved to ${toEmployerEmailId} ...`);

            let url = ezApi.ezclocker.ezNavigation.ezGetInternalApiUrl(
                ezApi.ezUrlTemplate`_admin/data/migration/move/employee
                    ?employeeEmail=${employeeEmail}
                    &destination-employerEmail=${toEmployerEmailId}`);

            ezApi.p.http.ezGet(url)
                .then(
                    (response) => {
                        ezApi.ezclocker.ezUi.ezSetInputValue('ezAdminBulkMoveEmployeesFromEmployer', '');
                        ezApi.ezclocker.ezUi.ezSetInputValue('ezAdminBulkMoveEmployeesToEmployer', '');
                        ezApi.ezclocker.ezUi.ezEnableElement('moveEmployeeToEmployerSubmitButton');
                        ezApi.ezclocker.ezUi.ezShowElement('moveEmployeeToEmployerSubmitButton');

                        if (0 != response.errorCode) {
                            ezApi.ezclocker.ezUi.ezContent(
                                'ezAdminBulkMoveEmployeesResults',
                                ezApi.ezToJson(response, 3, true));
                            return;
                        }

                        ezApi.ezclocker.ezUi.ezContent(
                            'ezAdminBulkMoveEmployeesResults',
                            `Employee ${employeeEmail} moved to ${toEmployerEmailId}`);
                    },
                    (eResponse) => {
                        ezApi.ezclocker.ezUi.ezSetInputValue('ezAdminBulkMoveEmployeesFromEmployer', '');
                        ezApi.ezclocker.ezUi.ezSetInputValue('ezAdminBulkMoveEmployeesToEmployer', '');
                        ezApi.ezclocker.ezUi.ezEnableElement('moveEmployeeToEmployerSubmitButton');
                        ezApi.ezclocker.ezUi.ezShowElement('moveEmployeeToEmployerSubmitButton');

                        ezApi.ezclocker.ezUi.ezContent(
                            'ezAdminBulkMoveEmployeesResults',
                            ezApi.ezToJson(eResponse, 3, true));
                    });
        } else {
            ezApi.ezclocker.ezUi.ezContent(
                'ezAdminBulkMoveEmployeesResults',
                'Employee email id and employer email id are both required. Please enter both');
        }
    }

    handelError(jqXHR, status, error) {
        alert(error);
    }

    hijackEmployer() {
        let self = EzAdminViewController.ezInstance;

        $('#_HijackResults').html('');
        $('#_HijackResults2').html('');
        $('#_HijackEmployeeResults').html('');

        let employerId = $('#_HijackEmployerId').val();

        if (!employerId || employerId.length == 0) {
            alert('Employer id is required to hijack!');
            $('#_HijackEmployerId').focus();
            self.viewHijacks();
            return;
        }

        let url = ezApi.ezclocker.ezNavigation.ezGetPublicApiUrl(
            `admin/hijack/employer/${$('#_HijackEmployerId').val()}`);

        ezApi.ezclocker.http.ezGet(url)
            .then(
                (response) => {
                    if (response.errorCode !== 0) {
                        $('#_HijackResults').html('Error: ' + response.message + '<div><pre><code class="json">' +
                                        ezApi.ezToJson(response, 3, true) + '</code></pre></div>');
                        self.viewHijacks();
                        return;
                    }

                    $('#_HijackResults').html('Employer ' + response.employer.employerName +
                                    ' account with id=' + response.employer.id +
                                    ' now hijacked by user with id=' +
                                    response.employer.userId +
                                    '<div><pre><code class="json">' +
                                    ezApi.ezToJson(response, 3, true) + '</code></pre></div>');
                    self.viewHijacks();
                },
                (errorResult) => {
                    let htmlView = '<div><pre><code class="json">' +
                                    ezApi.ezToJson(errorResult, 3, true) + '</code></pre></div>';
                    $('#_HijackResults').html(htmlView);
                    self.viewHijacks();
                });
    }

    viewHijacks() {
        let self = EzAdminViewController.ezInstance;

        $('#viewJumpEmployee').hide();
        $('#viewJumpEmployer').hide();
        $('#jumpEmployee').hide();
        $('#jumpEmployer').hide();

        let url = ezApi.ezclocker.ezNavigation.ezGetPublicApiUrl('admin/hijack');

        ezApi.ezclocker.ezHttpHelper.ezGet(url)
            .then(
                (response) => {
                    if (0 != response.errorCode) {
                        $('#_WhoIsHijacked').html('Error (' + response.errorCode + '): ' + response.message);
                        return;
                    }

                    if (null == response.responses || 0 == response.responses.length) {
                        $('#_WhoIsHijacked').html('No accounts currently hijacked.');
                        return;
                    }

                    let hijackedAccounts = '';
                    response.responses.forEach(
                        (entity) => {
                            let employerId = ezApi.ezIsNumber(entity.hijackedEmployerId)
                                ? entity.hijackedEmployerId
                                : '-';
                            let employeeId = ezApi.ezIsNumber(entity.hijackedEmployeeId)
                                ? entity.hijackedEmployeeId
                                : '-';

                            hijackedAccounts += '<div><h2>Currently Hijacked Accounts</h2>';
                            self.hjEmployers = '<div class="ezLightGrayBox"><h3>Employer Accounts</h3><hr/>';
                            self.hjEmployees = '<div class="ezLightGrayBox"><h3>Employee Accounts</h3><hr/>';

                            if (!entity.isEmployeeAccount) {
                                self.hjEmployers += '<p>Employer: ' + employerId +
                                                '<ul style="font-family:\'Roboto Mono\',monospace;">' +
                                                '<li> Hijacked By,,,,,..: ' + entity.hijackerUserId + '</li>' +
                                                '<li> Hijacked On.......: ' + entity.hijackedDate + '</li>' +
                                                '<li> Hijacked User Id..: ' + entity.hijackedUserId + '</li></ul></p>';
                            } else {
                                self.hjEmployees += '<p>Employee: ' + employeeId +
                                                '<ul style="font-family:\'Roboto Mono\',monospace;">' +
                                                '<li> Hijacked By.......: ' + entity.hijackerUserId + '</li>' +
                                                '<li> Hijacked On.......: ' + entity.hijackedDate + '</li>' +
                                                '<li> Hijacked User Id..: ' + entity.hijackedUserId + '</li></ul></p>';
                            }

                            if (entity.isEmployeeAccount) {
                                $('#viewJumpEmployee').show();
                                $('#jumpEmployee').show();
                            } else {
                                $('#viewJumpEmployer').show();
                                $('#jumpEmployer').show();
                            }
                        });

                    hijackedAccounts += self.hjEmployers + '</div>' + self.hjEmployees + '</div></div>';
                    $('#_WhoIsHijacked').html(hijackedAccounts);
                },
                (eResponse) => {
                    $('#_WhoIsHijacked').html('Error (' + eResponse.errorCode + '): ' + eResponse.message);
                });
    }

    hijackEmployee() {
        let self = EzAdminViewController.ezInstance;

        $('#_HijackEmployeeResults').html('');
        $('#_HijackResults').html('');
        $('#_HijackResults2').html('');

        let employerId = $('#_HijackEmployeeId').val();

        if (!employerId || employerId.length == 0) {
            alert('Employee id is required to hijack!');
            $('#_HijackEmployeeId').focus();
            return;
        }

        let url =
            ezApi.ezclocker.ezNavigation.ezGetPublicApiUrl(`admin/hijack/employee/${$('#_HijackEmployeeId').val()}`);

        ezApi.ezclocker.ezHttpHelper.ezGet(url)
            .then(
                (response) => {
                    if (0 != response.errorCode) {
                        $('#_HijackEmployeeResults').html(response.response);
                    } else if (null == response.employee) {
                        $('#_HijackEmployeeResults').html(response.message,
                            '<div><pre><code class="json">' + ezApi.ezToJson(response, 3, true) +
                                            '</code></pre></div>');
                    } else {
                        $('#_HijackEmployeeResults').html(
                            'Employee ' + response.employee.employeeName +
                                            ' account with id=' + response.employee.id +
                                            ' now hijacked by user with id=' + response.employee.userId +
                                            '<div><pre><code class="json">' +
                                            ezApi.ezToJson(response, 3) +
                                            '</code></pre></div>');
                    }
                    self.viewHijacks();
                },
                (eResult) => {
                    $('#_HijackEmployeeResults').html(
                        'Error: ' +
                                        '<div><pre><code class="json">' + ezApi.ezToJson(eResult, 3, true) +
                                        '</code></pre></div>');
                    self.viewHijacks();
                });
    }

    hijackManager() {
        $('#_HijackEmployeeResults').html('');
        $('#_HijackResults').html('');
        $('#_HijackResults2').html('');

        let employerId = $('#_HijackEmployeeId').val();

        if (!employerId || employerId.length == 0) {
            alert('Employee id is required to hijack!');
            $('#_HijackEmployeeId').focus();
            return;
        }

        let url = ezApi.ezGetPublicApiUrl(`admin/hijack/manager/${$('#_HijackEmployeeId').val()}`);

        ezApi.ezclocker.ezHttpHelper.ezGet(url)
            .then(
                (response) => {
                    if (0 != response.errorCode) {
                        $('#EzHijackPayrollManagerResults').html(response.response);
                    } else if (null == response.employee) {
                        $('#EzHijackPayrollManagerResults').html(
                            response.message,
                            '<div><pre><code class="json">' +
                                        ezApi.ezToJson(response, 3, true) +
                                        '</code></pre></div>');
                    } else {
                        $('#EzHijackPayrollManagerResults').html(
                            'Employee ' + response.employee.employeeName +
                                        ' account with id=' + response.employee.id +
                                        ' now hijacked by user with id=' +
                                        response.employee.userId +
                                        '<div><pre><code class="json">' +
                                        ezApi.ezToJson(response, 3) +
                                        '</code></pre></div>');
                    }
                    self.viewHijacks();
                },
                (eResult) => {
                    $('#EzHijackPayrollManagerResults').html(
                        'Error: ' +
                                    '<div><pre><code class="json">' +
                                    ezApi.ezToJson(eResult, 3, true) +
                                    '</code></pre></div>');
                    self.viewHijacks();
                });
    }

    hijackPayrollManager() {
        $('#_HijackEmployeeResults').html('');
        $('#_HijackResults').html('');
        $('#_HijackResults2').html('');

        let employerId = $('#_HijackEmployeeId').val();
        if (!employerId || employerId.length == 0) {
            alert('Employee id is required to hijack!');
            $('#_HijackEmployeeId').focus();
            return;
        }

        let url = ezApi.ezGetPublicApiUrl(`admin/hijack/employee/${$('#_HijackEmployeeId').val()}`);

        ezApi.ezclocker.ezHttpHelper.ezGet(url)
            .then(
                (response) => {
                    if (0 != response.errorCode) {
                        $('#EzHijackManagerResults').html(response.response);
                    } else if (null == response.employee) {
                        $('#EzHijackManagerResults').html(response.message,
                            '<div><pre><code class="json">' + ezApi.ezToJson(response, 3, true) +
                                        '</code></pre></div>');
                    } else {
                        $('#EzHijackManagerResults').html(
                            'Employee ' + response.employee.employeeName +
                                        ' account with id=' + response.employee.id +
                                        ' now hijacked by user with id=' + response.employee.userId +
                                        '<div><pre><code class="json">' +
                                        ezApi.ezToJson(response, 3) +
                                        '</code></pre></div>');
                    }
                    self.viewHijacks();
                },
                (eResult) => {
                    $('#EzHijackManagerResults').html(
                        'Error: ' +
                                    '<div><pre><code class="json">' + ezApi.ezToJson(eResult, 3, true) +
                                    '</code></pre></div>');
                    self.viewHijacks();
                });
    }

    releaseHijack() {
        $('#_HijackEmployeeResults').html('');
        $('#_HijackResults').html('');
        $('#_HijackResults2').html('');

        let url = ezApi.ezGetPublicApiUrl('admin/hijack/restore');

        ezApi.ezclocker.ezHttpHelper.ezGet(url)
            .then(
                (response) => {
                    let viewHtml = '';
                    if (response.message) {
                        viewHtml += response.message;
                    }

                    let restoredEmployee = ezApi.ezIsNotEmptyArray(response.restoredEmployees)
                        ? response.restoredEmployees[0]
                        : null;

                    let restoredEmployer = ezApi.ezIsNotEmptyArray(response.restoredEmployers)
                        ? response.restoredEmployers[0]
                        : null;

                    if (ezApi.ezIsValid(restoredEmployer)) {
                        viewHtml += '<h2>Employer Hijack Released</h2><hr/><ul>' +
                                        '<li>Employer Name..: ' + restoredEmployer.employerName + '</li>' +
                                        '<li>Employer Id....: ' + restoredEmployer.id + '</li>' +
                                        '</ul><div><pre><code class="json">' +
                                        ezApi.ezToJson(response, 3, true) +
                                        '</code></pre></div>';
                    }

                    if (ezApi.ezIsValid(restoredEmployee)) {
                        viewHtml += '<h2>Employee HiJack Released</h2><hr/><ul>' +
                                        '<li>Employee Id...:' + restoredEmployee.id + '</li>' +
                                        '<ul><div><pre><code class="json">' +
                                        ezApi.ezToJson(response, 3, true) +
                                        '</code></pre></div>';
                    }
                    $('#_HijackResults2').html(viewHtml);
                    self.viewHijacks();
                },
                (eResponse) => {
                    $('#_HijackResults2').html('Error: <div><pre><code class="json">' + ezApi.ezToJson(eResponse, 3, true) +
                                    '</code></pre></div>');
                    self.viewHijacks();
                });
    }
}

export {
    EzAdminViewController
};
