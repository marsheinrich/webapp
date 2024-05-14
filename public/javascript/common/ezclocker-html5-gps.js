import {
    EzObject,
    EzString,
    EzPromise
} from '/ezlibrary/helpers/EzHelpers.js';

// Items below need to come from ezApi instead

/**
 * Handles HTML5 GPS location lookup
 */
function EzHtml5GPS() {
    this.ready = false;

    this.POSITION_ERROR = {
        PERMISSION_DENIED: {
            code: 1,
            name: 'PERMISSION_DENIED',
            ezMessage: 'User denied the request for Geolocation.',
            errorMessage: '',
        },
        POSITION_UNAVAILABLE: {
            code: 2,
            name: 'POSITION_UNAVAILABLE',
            ezMessage: 'Location information is unavailable.',
            errorMessage: '',
        },
        TIMEOUT: {
            code: 3,
            name: 'TIMEOUT',
            ezMessage: 'The request to get user location timed out.',
            errorMessage: '',
        },
        UNKNOWN_ERROR: {
            code: 0,
            name: 'UNKNOWN_ERROR',
            ezMessage: 'An unknown error occurred.',
            errorMessage: 'An unknown error occurred.',
        },
        fromGPSPositionError: function(gpsLocationPositionError) {
            let self = ezApi.ezclocker.ezHtml5GPS;

            if (!EzObject.isValid(gpsLocationPositionError)) {
                return self.POSITION_ERROR.UNKNOWN_ERROR;
            }

            if (self.POSITION_ERROR.PERMISSION_DENIED.code === gpsLocationPositionError.code) {
                self.POSITION_ERROR.PERMISSION_DENIED.errorMessage = gpsLocationPositionError.message;

                return self.POSITION_ERROR.PERMISSION_DENIED;
            }

            if (self.POSITION_ERROR.POSITION_UNAVAILABLE.code === gpsLocationPositionError.code) {
                self.POSITION_ERROR.POSITION_UNAVAILABLE.errorMessage = gpsLocationPositionError.message;

                return self.POSITION_ERROR.POSITION_UNAVAILABLE;
            }

            if (self.POSITION_ERROR.TIMEOUT.code === gpsLocationPositionError.code) {
                self.POSITION_ERROR.TIMEOUT.errorMessage = gpsLocationPositionError.message;

                return self.POSITION_ERROR.TIMEOUT;
            }

            return self.POSITION_ERROR.UNKNOWN_ERROR;
        }
    };

    return this;
}

EzHtml5GPS.prototype.ezInit = function() {
    let self = ezApi.ezclocker.ezHtml5GPS;

    self.ready = true;

    return self;
};

EzHtml5GPS.prototype.getLocation = function(options) {
    if (!navigator.geolocation.getCurrentPosition) {
        return 'Your browser cannot return your geographical location.';
    }

    return EzPromise.promise(
        (resolve, reject) => {
            if (!navigator || !navigator.geolocation) {
                // no GPS abilities
                return reject(false);
            }

            try {
                return EzObject.isValid(options)
                    ? navigator.geolocation.getCurrentPosition(
                        (position) => resolve(position),
                        (errorCode) => reject(errorCode),
                        options)
                    : navigator.geolocation.getCurrentPosition(
                        (position) => resolve(position),
                        (errorCode) => reject(errorCode));
            } catch (err) {
                ezApi.ezclocker.ezLogger.error(`Could not obtain location due to the following error: ${err.message}.`);

                return reject(false);
            }
        });
};

/**
 *
 * @param {} gpsPositionError
 */
EzHtml5GPS.prototype.getMessageForErrorCode = function(gpsPositionError) {
    let self = ezApi.ezclocker.ezHtml5GPS;

    let ezPositionError = self.POSITION_ERROR.fromGPSPositionError(gpsPositionError);

    return EzString.hasLength(ezPositionError.errorMessage)
        ? ezPositionError.errorMessage
        : ezPositionError.ezMessage;
};

/**
 * @deprecated Use ezHtml5GPS object instead
 * @public
 * Basic handler for geolocation success
 * @param position
 */
function internalSuccessCallBack(position) {
    window.console.warn('DEPRECATED: Use ezHtml5GPS object instead');
    window.alert('Latitude: ' + position.coords.latitude + 'Longitude:' + position.coords.longitude);
}

/**
 * @deprecated Use ezHtml5GPS object instead
 * @public
 * @param successCallBack
 * @param errorCallBack
 * @param options
 * @returns {Boolean}
 */
function getLocation(successCallBack, errorCallBack, options) {
    window.console.warn('DEPRECATED: Use ezHtml5GPS object instead');
    if (!navigator.geolocation) {
        return false; // no GPS position information is available
    }

    navigator.geolocation.getCurrentPosition(ezApi.isValid(successCallBack) ? successCallBack : internalSuccessCallBack,
        ezApi.isValid(errorCallBack) ? errorCallBack : internalErrorHandler, options);
}

/**
 * @deprecated Use ezHtml5GPS object instead
 * @public
 * Basic handler for geolocation errors
 * @param positionError
 */
function internalErrorHandler(positionError) {
    ezApi.ezclocker.ezLogger.warn('DEPRECATED: Use ezHtml5GPS object instead');

    if (null === positionError.message) {
        let errorMessage = getErrorMessage(positionError.code);

        window.alert('Unable to obtain geographic location: ' + errorMessage);

        return;
    }

    window.alert('Unable to obtain geographic location: ' + positionError.message);
}
/**
 * @deprecated Use ezHtml5GPS object instead
 * @public
 * Translates the error code into a string
 * @param gpsPositionError
 */
function getErrorMessage(gpsPositionError) {
    return ezApi.ezclocker.ezHtml5GPS.getMessageForErrorCode(gpsPositionError);
}

/**
 * ezApi Registration
 */
document.addEventListener('onEzApiReady', function() {
    ezApi.ezRegisterNewApi(EzHtml5GPS, 'ezHtml5GPS');
});