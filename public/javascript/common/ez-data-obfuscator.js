/**
 * @public
 * Creates a new instance of EzDataObfuscator
 *
 * @returns {EzDataObfuscator}
 */
function EzDataObfuscator() {
    this.ready = false;

    return this;
}

/**
 * @public
 * Initializes the EzDataObfuscator
 *
 * @returns {EzDataObfuscator}
 */
EzDataObfuscator.prototype.ezInit = function() {
    var self = ezApi.ezclocker.ezDataObfuscator;

    this.obscureChar = '*';

    self.ready = true;
    return self;
};

/**
 * @public
 * Obscures a credit card number for display in UX
 *
 * Input: 123456789012
 * Result: ********9012
 *
 * @param {String|null} creditCardNumber
 *
 * @returns {String}
 */
EzDataObfuscator.prototype.ezObscureCreditCardNumber = function(creditCardNumber) {
    var self = ezApi.ezclocker.ezDataObfuscator;

    if (ezApi.ezIsEmptyString(creditCardNumber)) {
        return '';
    }

    var lastFour = creditCardNumber.substring(creditCardNumber.length - 4, creditCardNumber.length);
    var remainder = creditCardNumber.substring(0, creditCardNumber.length - 4);

    return self.ezObscureValue(remainder) + lastFour;
};

/**
 * @public
 * Obscures a credit card's special number
 *
 * @param {String|null} creditCardSpecialNumber
 *
 * @returns {String}
 */
EzDataObfuscator.prototype.ezObscureCreditCardSpecialNumber = function(creditCardSpecialNumber) {
    var self = ezApi.ezclocker.ezDataObfuscator;

    if (ezApi.ezIsEmptyString(creditCardSpecialNumber)) {
        return '';
    }

    return self.ezObscureValue(creditCardSpecialNumber);
};

/**
 * @public
 * Obscures an email using the ezObscureName formatter
 *
 * @param {String} aEmail
 *
 * @returns {String}
 */
EzDataObfuscator.prototype.ezObscureEmail = function(aEmail) {
    return ezApi.ezclocker.ezDataObfuscator.ezObscureName(aName);
};

/**
 * @public
 * Obscures a name by making visible only a few of the letters.
 *
 * Input > 3, both parts > 3:
 * ----------------------------------------
 * Input: 'Peggy Sue' (length = 9)
 * First: 'Pegg' (length = 4)
 * Second: 'y Sue' (length = 5)
 *
 * Output: 'Peg*y S**'
 *
 * Input > 3, first part > 3, last part < 3
 * ----------------------------------------
 * Input: 'Joe Ham'
 * First: 'Joe '
 * Second: 'Ham'
 * Output: 'Joe****'
 *
 * Input > 3, first part < 3, last part < 3
 * ----------------------------------------
 * Input: 'Bill'
 * First: 'Bi'
 * Second 'll'
 * Output: 'B*l*'
 *
 * @param {String} aName
 *
 * @returns {String}
 */
EzDataObfuscator.prototype.ezObscureName = function(aName) {
    var self = ezApi.ezclocker.ezDataObfuscator;

    if (ezApi.ezIsEmptyString(aName)) {
        return '';
    }

    if (3 <= aName.length) {
        return self.ezObscureValue(aName);
    }

    var splitIndex = aName.length / 2;

    var firstPart = aName.substring(0, splitIndex);
    var secondPart = aName.substring(splitIndex, aName.length);

    var firstVisible;
    var firstObscured;
    if (1 < firstPart.length) {
        firstVisible = 3 > firstPart.length
            ? firstPart.substring(0, 3)
            : firstPart.substring(0, 1);
        firstObscured = 3 > firstPart.length
            ? firstPart.substring(3, firstPart.length)
            : firstPart.substring(1, firstPart.length);
    } else {
        firstVisible = '';
        firstObscured = firstPart;
    }

    var secondVisible;
    var secondObscured;
    if (1 < secondPart.length) {
        secondVisible = 3 > secondPart.length
            ? firstPart.substring(0, 3)
            : firstPart.substring(0, 1);
        secondObscured = 3 > firstPart.length
            ? firstPart.substring(3, secondPart.length)
            : firstPart.substring(1, secondPart.length);
    } else {
        secondVisible = '';
        secondObscured = secondPart;
    }

    return firstVisible + self.ezObscureValue(firstObscured) + secondVisible + self.ezObscureValue(secondObscured);
};

/**
 * @public
 * Replaces all characters in the provided value with the EzDataObfuscator.obscureChar value.
 *
 * If value is empty or null then empty string is return
 *
 * Input: 'My String'
 * Output: '*********'
 *
 * @param {String} value
 *
 * @returns {String}
 */
EzDataObfuscator.prototype.ezObscureValue = function(value) {
    var self = ezApi.ezclocker.ezDataObfuscator;

    var oChar = ezApi.ezIsNotEmptyString(self.obscureChar)
        ? self.obscureChar
        : '*';

    if (ezApi.ezIsEmptyString(value)) {
        return oChar;
    }

    return value.replace(/(.?)/g, oChar);
};

/**
 * ezApi Registration
 */
document.addEventListener('onEzApiReady', function() {
    ezApi.ezRegisterNewApi(EzDataObfuscator, 'ezDataObfuscator');
});