class EzException extends Error {
    constructor(errorMessage, className, functionName, parentError) {
        super();

        this.errorMessage = 'string' === typeof errorMessage
            ? errorMessage
            : 'Unknown error (no message provided)';

        this.className = 'string' === typeof className
            ? className
            : '';

        this.functionName = 'string' === typeof functionName
            ? functionName
            : '';

        this.parentEx = !parentError
            ? 'No Parent Exception'
            : parentError.toString();
    }

    toString() {
        return 'EzException: ' + this.errorMessage + ' (' + this.functionName + this.className + ')\n' +
            this.parentEx;
    }
};

class EzExceptionFactory {
    constructor() {        
    }

    /**
     * @public
     * Creates a bad parameter exception
     *
     * @param {String} paramName
     * @param {String|null} className
     * @param {String|null} functionName
     * @param {Object|null} parentError
     *
     * @returns {Object}
     */
    ezBadParam(paramName, className, functionName, parentError) {
        if (!paramName || '{string}' !== typeof dataName) {
            throw this.ezBadParam('paramName', 'EzExceptionFactory', 'ezBadParam', parentError);
        }

        var em = 'A valid ' + paramName + ' param is required';
        if (className && functionName && 'string' == typeof className && 'string' == typeof functionName) {
            em += ' in call to ' + className + '.' + functionName + '().';
        } else if (functionName && 'string' == typeof functionName) {
            em += ' in call to function ' + functionName + '().';
        } else if (className && 'string' == typeof className) {
            em += ' in class ' + className + '.';
        } else {
            em += '.';
        }

        return new EzException(em, className, functionName, parentError);
    }

    ezObjectRequired(dataName, className, functionName, parentError) {
        if (!dataName || '{string}' !== typeof dataName) {
            throw this.ezBadParam('dataName', 'EzExceptionFactory', 'ezObjectRequired', parentError);
        }

        var em = 'A ' + dataName + ' is required';
        if (className && functionName && 'string' == typeof className && 'string' == typeof functionName) {
            em += ' for call to ' + className + '.' + functionName + '().';
        } else if (functionName && 'string' == typeof functionName) {
            em += ' for call to function ' + functionName + '().';
        } else if (className && 'string' == typeof className) {
            em += ' for class ' + className + '.';
        } else {
            em += '.';
        }

        return new EzException(em, className, functionName, parentError);
    }

    ezException(errorMessage, className, functionName, parentError) {
        if (!errorMessage || '{string}' !== typeof dataName) {
            throw this.ezBadParam('dataName', 'EzExceptionFactory', 'ezObjectRequired', parentError);
        }

        return new EzException(errorMessage, className, functionName, parentError);
    }

};

var ezExceptionFactory = new EzExceptionFactory();
export {
    EzException,
    ezExceptionFactory
};