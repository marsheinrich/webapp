//TODO: Delete this javascript file once everything is converted to ez-validation.js

var _MINIMUM_EZCLOCKER_PASSWORD_LENGTH = 4;
var _PASSWORD_VALID = 'PASSWORD_VALID';

/* exported validateMinLength */
/**
 *
 * @param {*} value
 * @param {*} minLength
 * @deprecated Use ezApi.ezValidation instead
 */
function validateMinLength(value, minLength) {
    if (value === null) {
        return false;
    }
    return value.length >= minLength;
}

/* exported validateMaxLength */
/**
 *
 * @param {*} value
 * @param {*} maxLength
 * @deprecated Use ezApi.ezValidation instead
 */
function validateMaxLength(value, maxLength) {
    if (value === null) {
        return false;
    }
    return value.length <= maxLength;
}

/* exported validateEqual */
/**
 *
 * @param {*} valueA
 * @param {*} valueB
 * @deprecated Use ezApi.ezValidation instead
 */
function validateEqual(valueA, valueB) {
    return valueA == valueB;
}

/* exported validateEzClockerPasswordRequirements */
/**
 *
 * @param {*} password
 * @deprecated Use ezApi.ezValidation instead
 */
function validateEzClockerPasswordRequirements(password) {
    if (isBadReference(password)) {
        return 'Password is required and cannot be blank.';
    }
    if (password.length < _MINIMUM_EZCLOCKER_PASSWORD_LENGTH) {
        return 'EzClocker passwords must be at least four characters in length.';
    }
    return _PASSWORD_VALID;
}

/* exported validateEmailAddress */
/**
 *
 * @param {*} emailAddress
 * @deprecated Use ezApi.ezValidation instead
 */
function validateEmailAddress(emailAddress) {
    if (emailAddress === null) {
        return false;
    }
    if (emailAddress.length > 256) {
        return false;
    }
    if (emailAddress.split('@').length != 2) {
        return false;
    }
    if (emailAddress.split('.').length < 2) {
        return false;
    }
    if (emailAddress.split(' ').length != 1) {
        return false;
    }
    return true;
}

/* exported validateResetPasswords */
/**
 *
 * @param {*} password
 * @param {*} confirmPassword
 * @deprecated Use ezApi.ezValidation instead
 */
function validateResetPasswords(password, confirmPassword) {
    if (!validateMinLength(password, 4)) {
        return {
            result: false,
            message: 'Password must be at least four characters in length.'
        };
    } else if (!validateMaxLength(password, 256)) {
        return {
            result: false,
            message: 'Password must be smaller than 256 characters'
        };
    }
    if (!validateEqual(password, confirmPassword)) {
        return {
            result: false,
            message: 'New Password and Confirm Password do not match.'
        };
    }
    return {
        result: true,
        message: 'All information is valid'
    };
}

/* exported isBadReference */
/**
 *
 * @param {*} item
 * @deprecated Use ezApi.ezValidation instead
 */
function isBadReference(item) {
    return (item === undefined || item === null);
}

/* exported isEmptyString */
/**
 *
 * @param {*} data
 * @deprecated Use ezApi.ezValidation instead
 */
function isEmptyString(data) {
    return (data === undefined || data === null || data.length === 0);
}

/* exported validString */
/**
 * @param {*} value
 * @deprecated Use ezApi.ezValidation instead
 */
function validString(value) {
    if (isBadReference(value)) {
        return '';
    }
    return value;
}

/* exported validStringOrDefault */
/**
 *
 * @param {*} value
 * @param {*} defaultValue
 * @deprecated Use ezApi.ezValidation instead
 */
function validStringOrDefault(value, defaultValue) {
    if (isBadReference(defaultValue)) {
        defaultValue = '';
    }
    if (isBadReference(value)) {
        return defaultValue;
    }
    return value;
}

/* exported validateStringLength */
/**
 *
 * @param {*} stringValue
 * @param {*} min
 * @param {*} max
 * @deprecated Use ezApi.ezValidation instead
 */
function validateStringLength(stringValue, min, max) {
    if (stringValue === undefined) {
        return false;
    }
    if (stringValue.length < max && stringValue.length > min) {
        return true;
    }
    return false;
}

/* exported formatDollarString */
/**
 *
 * @param {*} amount
 * @param {*} dollarIcon
 * @deprecated Use ezApi.ezValidation instead
 */
function formatDollarString(amount, dollarIcon) {
    var dollarCents = amount.split('.');
    var result = '0.00';
    if (dollarCents.length >= 1) {
        if (dollarCents[0].length === 0) {
            result = '0.';
        } else {
            result = dollarCents[0] + '.';
        }

        if (dollarCents.length >= 2) {
            if (dollarCents[1].length === 0) {
                dollarCents[1] = '00';
            } else if (dollarCents[1].length == 1) {
                dollarCents[1] = '0' + dollarCents[1];
            } else if (dollarCents[1].length > 2) {
                dollarCents[1] = dollarCents[1].substring(0, 1);
            }
            result = result + dollarCents[1];
        }
    }
    return dollarIcon + result;
}

/* exported formatDateInput */
/**
 *
 * @param {*} event
 * @deprecated Use ezApi.ezValidation instead
 */
function formatDateInput() {
    var v = $(this).val();
    if (!validString(v)) {
        $(this).val('00/00/0000');
        $(this).select();
        return;
    }

    var data = null;

    var slash = v.split('/');
    if (slash.length - 1 == 2) {
        data = slash;
    } else {
        var dash = v.split('-');
        if (dash.length - 1 == 2) {
            data = dash;
        }
    }

    if (null !== data) {
        data[0] = (data[0].length == 1) ? '0' + data[0] : data[0];
        data[1] = (data[1].length == 1) ? '0' + data[1] : data[1];
        data[2] = (data[2].length < 4) ? ezApi.p.ezDateTime.ezNow().year() : data[2];
        $(this).val(data[0] + '/' + data[1] + '/' + data[2]);
        return;
    }

    if (v.length == 6) {
        $(this).val('0' + v[0] + '/' + '0' + v[1] + '/' + v[2] + v[3] + v[4] + v[5]);
        return;
    }
    if (v.length == 7) {
        if (v[0] == '0') {
            $(this).val(v[0] + v[1] + '/' + '0' + v[2] + '/' + v[3] + v[4] + v[5] + v[6]);
        } else {
            $(this).val('0' + v[0] + '/' + v[1] + v[2] + '/' + v[3] + v[4] + v[5] + v[6]);
        }
        return;
    }
    if (v.length == 8) {
        $(this).val(v[0] + v[1] + '/' + v[2] + v[3] + '/' + v[4] + v[5] + v[6] + v[7]);
    }
}

export {
    formatDateInput,
    formatDollarString,
    validateStringLength,
    validStringOrDefault,
    validString,
    isEmptyString,
    isBadReference,
    validateResetPasswords,
    validateEmailAddress,
    validateEzClockerPasswordRequirements,
    validateEqual,
    validateMaxLength,
    validateMinLength
};