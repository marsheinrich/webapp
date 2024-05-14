/**
 * Provides various string formatting utility methods
 */
class EzStringFormatter {
    constructor() {
        this.ready = false;
        this.ezTypeName = 'EzStringFormatter';
    }

    /**
        @protected
        Initializes EzStringFormatter
     */
    ezInit() {
        this.ready = true;
    }

    /**
        @public
        Formats the provided string as a dollar amount. Will use $ if no dollarIcon is provided.
        @param {string} stringAmount
        @param {string|null} dollarIcon
     */
    ezFormatAsDollar(stringAmount, dollarIcon, centsIcon) {
        let dIcon = ezApi.ezIsEmptyString(dollarIcon) 
            ? '$' 
            : dollarIcon;
        let cIcon = ezApi.ezIsEmptyString(centsIcon) 
            ? '.' 
            : centsIcon;

        if (ezApi.p.ezIsEmptyString(stringAmount)) {
            return ezApi.ezMsg`${dIcon}0${cIcon}00`;
        }

        let dollarCents = stringAmount.split('.');
        let result = dIcon;

        if (2 === dollarCents.length) {
            result += 0 === dollarCents[0].length
                ? ezApi.ezMsg`0${cIcon}`
                : ezApi.ezMsg`${dollarCents[0]}${cIcon}`;

            if (3 <= dollarCents[1].length) {
                let val = parseInt(dollarCents[1][0] + dollarCents[1][2]);
                let rUp = parseInt(dollarCents[1][3]);
                dollarCents[1] = rUp > 5 
                    ? (val + 1).toString() 
                    : val.toString();
            }

            if (0 === dollarCents[1].length) {
                result += '00';
            } else if (1 === dollarCents[1].length) {
                result += ezApi.ezMsg`0${dollarCents[1]}`;
            } else if (2 === dollarCents[1].length) {
                result += dollarCents[1];
            }

            return result;
        }

        result += ezApi.ezMsg`${dollarCents[0]}${cIcon}00`;
        return result;
    }
}

EzStringFormatter.ezApiName = 'ezStringFormatter';

export {
    EzStringFormatter
};

document.addEventListener('onEzApiReady',
    () => ezApi.ezRegisterNewApi(EzStringFormatter, EzStringFormatter.ezApiName));