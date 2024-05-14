// Works only with signup.html

function configureDialogs() {
    configureDevSignUpDialog();
    $('div#devSignUpError').hide();
    $('form#devSignUpForm').submit(handleDevSignUp);
}

function handleDevSignUp(event) {
    postForm(event, this, devSignUpSuccess, devSignUpError);
}

function devSignUpSuccess(result, statusCode, jqXHR) {
    var response = jQuery.parseJSON(result);
    if (response.errorCode != 0) {
        showSignUpError();
        return;
    }
    // Otherwise, redirect to the sign up
    window.location.assign('./signin.html?email=' + encodeURIComponent(response.developerAccount.emailAddress));
}

function devSignUpError(jqXHR, status, error) {
    alert('Unable to sign up due to the following error: \n\n' + error);
}

function showDevSignUpError() {
    showSignUpDialog();
    $('div#signUpError').show();
}

// Configure the sign-up dialog
function configureDevSignUpDialog() {
    $('div#devSignUpDialog').dialog({
        dialogClass: 'dialog-shadow',
        autoOpen: false,
        closeOnEscape: true,
        height: 375,
        width: 450,
        modal: false,
        show: {
            effect: 'fade',
            duration: 500
        },
        buttons: {
            'Sign Up': devSignUpSubmit,
            Cancel: function() {
                handleDevSignUpClose();
            }
        },
        close: function() {
            handleDevSignUpClose();
        }
    });
}

function handleDevSignUpClose() {
    returnToIndex();
}

// show the dev sign in dialog
function showDevSignUpDialog() {
    $('div#devSignUpDialog').dialog('open');
    $('div#devSignUpDialog').keypress(handleEnterKey);
}

function handleEnterKey(e) {
    if (e.keyCode == 13) {
        signUpSubmit();
    }
}

// Submit the dev sign-up
function devSignUpSubmit() {
    $('form#devSignUpForm').submit();
}

// close the dev sign up dialog
function closeDevSignUpDialog() {
    $('div#devSignUpDialog').dialog('close');
}