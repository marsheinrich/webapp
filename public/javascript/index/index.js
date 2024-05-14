/**
 * Validates data before allowing an attempted submission
 * @param event
 */
function validateSignup(event) {
    var companyName = $('#_CompanyName').val().trim();
    var emailAddress = $('#_EmailAddress').val().trim();
    var password = $('#_Password').val().trim();
    if (companyName.length != 0 && emailAddress.length != 0 && password.length != 0) {
        removeStyle($('#_EmailAddress'), 'quickSignUpInputError');
        removeStyle($('#_Password'), 'quickSignUpInputError');
        return;
    }
}

/**
 * Validates data before allowing a submission
 * @param event
 */
function validateSignupSubmit(event) {
    var good = true;
    var emailAddress = $('#_EmailAddress').val().trim();
    var password = $('#_Password').val().trim();
    hideErrorLabel($('#_CompanyNameError'));
    hideErrorLabel($('#_EmailAddressError'));
    hideErrorLabel($('#_PasswordError'));

    if (emailAddress.length > 256) {
        addStyle($('#_EmailAddress'), 'quickSignUpInputError');
        showErrorLabel($('#_EmailAddressError'), 'Email address cannot have more than 256 characters.');
        good = false;
    } else if (emailAddress.indexOf('@') == -1) {
        addStyle($('#_EmailAddress'), 'quickSignUpInputError');
        showErrorLabel($('#_EmailAddressError'), 'Not a valid email address.');
        good = false;
    }
    if (password.length <= 3) {
        addStyle($('#_Password'), 'quickSignUpInputError');
        showErrorLabel($('#_PasswordError'), 'Passwords must have at least 4 characters');
        good = false;
    } else if (password.length > 256) {
        addStyle($('#_Password'), 'quickSignUpInputError');
        showErrorLabel($('#_PasswordError'), 'Passwords must have no more than 256 characters');
        good = false;
    }
    return good;
}

/**
 * Redirects to development account sign-up
 */
function handleDevAccountClick() {
    window.location.assign('./public/devsignup.html');
}

/**
 * Handles the sign-in submit
 */
function handleSignIn() {
    $('form#quickSignInForm').submit();
}

/**
 * Performs the action of signing up for the website
 * @param event
 */
function quickSignUpFormSubmit(event) {
    if (!validateSignupSubmit()) {
        return;
    }
    disablePageWait();
    var url = './account/signup';
    var data = 'accountType=' + $('#_AccountType').val() + '&emailAddress=' + $('#_EmailAddress').val() + '&password=' +
        $('#_Password').val() + '&name=' + $('#_CompanyName').val();
    postJSON(url, data, signUpSuccess, signUpError);
}

function signUpSuccess(result, statusCode, jqXHR) {
    var response = jQuery.parseJSON(result);
    if (response.errorCode != 0) {
        enablePageWait();
        alert(response.message);
        //window.location = "./public/signup.html";
        return;
    }
    // Sign in...
    enablePageWait();
    var userName = $('#_EmailAddress').val();
    var password = $('#_Password').val();
    $('input#j_username').val(userName);
    $('input#j_password').val(password);
    handleSignIn();
}

/**
 * Handles sign-up errors
 * @param jqXHR
 * @param status
 * @param error
 */
function signUpError(jqXHR, status, error) {
    alert('Unable to sign up due to the following error: \n\n' + error);
}

function showRecoverPasswordDialog() {
    loginVisible = false;
    closeSignInDialog();
    $('div#passwordResetDialog').dialog('open');
}

function closeSignInDialog() {
    loginVisible = false;
    $('div#signInDialog').dialog('close');
}

function configurePasswordResetDialog() {
    $('div#passwordResetDialog').dialog({
        dialogClass: 'dialog-shadow',
        autoOpen: false,
        closeOnEscape: true,
        height: 220,
        width: 400,
        modal: false,
        show: {
            effect: 'fade',
            duration: 500
        },
        //position: {my: 'top', at: 'top', of: $("div#contentDiv")},
        buttons: {
            'Reset My Password': recoverPasswordSubmit,
            Cancel: function() {
                closeRecoverPasswordDialog();
            }
        },
        close: function() {
            closeRecoverPasswordDialog();
        }
    });
}

function recoverPasswordSubmit() {
    $('form#passwordResetForm').submit();
}

function closeRecoverPasswordDialog() {
    $('div#passwordResetDialog').dialog('close');
}

function passwordResetSubmit(event) {
    $('div#createDeveloperAccountResults').html('Processing results...');
    disablePageWait();
    postForm(event, this, passwordResetSuccess, passwordResetError);
    closeRecoverPasswordDialog();
}

function passwordResetSuccess(result, statusCode, jqXHR) {
    enablePageWait();
    var baseResponse = jQuery.parseJSON(result);
    if (baseResponse.errorCode != 0) {
        alert('ezClocker is unable to reset your password at this time due to the following error: ' + baseResponse.message);
        return;
    }
    alert('ezClocker has sent you an email with instructions on how to reset your password.');

}

function passwordResetError(jqXHR, status, error) {
    enablePageWait();
    alert('Error resetting password: ' + error.toString());
}