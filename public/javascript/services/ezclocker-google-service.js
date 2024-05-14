// DEPRECATED: Migreate to ezwp/js/ez-google-service.bundle.js bundle


/**
 * @public
 * Loads Google API keys from the service
 */
function EzGoogleApi() {
    this.ready = false;
    this.mapsLabelApiInjected = false;
    this.mapsApiInjected = false;
    this.apiKey = null;

    this.GOOGLE_API_BASE_URL = 'https://maps.googleapis.com';
    this.GOOGLE_API_MAPS_API_PATH_TEMPLATE = this.GOOGLE_API_BASE_URL +
        '/maps/api/js?v=3.40&callback=ezApi.p.ezGoogleApi.ezGoogleMapsReady&key=';

    this.mapsLabelApiUrl = '/public/javascript/google/maplabel-compiled.js';
    this.googleApiKeyService = '/_api/v1/google/credential';
    return this;
}

/**
 * @protected
 * Initializes EzGoogleApi
 */
EzGoogleApi.prototype.ezInit = function() {
    var self = ezApi.p.ezGoogleApi;

    self.ezGetGoogleMapsUrl().then(self.ezInjectGoogleMapsApi);

    self.ready = true;
    return self;
};

/**
 * @public
 * Obtains the google Api key from the services
 * @returns {Promise}
 */
EzGoogleApi.prototype.ezGetGoogleApiKey = function() {
    var self = ezApi.ezclocker.ezGoogleApi;
    if (ezApi.isNotEmptyString(self.apiKey)) {
        return ezApi.ezResolve(self.apiKey);
    }
    return self.ezGetApiKey();
};

/**
 * @public
 * Call back from google maps api that indicates the API is now ready for consumption.
 */
EzGoogleApi.prototype.ezGoogleMapsReady = function() {
    ezApi.ezclocker.ezGoogleApi.mapsApiInjected = true;
    ezApi.ezclocker.ezGoogleApi.ezInjectGoogleMapsLabelApi();
};

/**
 * @public
 * Obtains the google maps url (with API embedded)
 * @returns {Promise}
 */
EzGoogleApi.prototype.ezGetGoogleMapsUrl = function() {
    var self = ezApi.ezclocker.ezGoogleApi;
    return ezApi.ezPromise(function(resolve) {
        self.ezGetGoogleApiKey().then(function(apiKey) {
            if (ezApi.ezIsEmptyString(apiKey) || '\'\'' === apiKey) {
                ezApi.ezclocker.logger.error('Google maps API key is not available for the environment.');
                return resolve('');
            }
            return resolve(self.GOOGLE_API_MAPS_API_PATH_TEMPLATE + apiKey);
        }, function() {
            return resolve(self.GOOGLE_API_MAPS_API_PATH_TEMPLATE + apiKey);
        });
    });
};

/**
 * @public
 * Injects the google maps API into the document
 * @param {string} mapsUrl
 */
EzGoogleApi.prototype.ezInjectGoogleMapsApi = function(mapsUrl) {
    var self = ezApi.ezclocker.ezGoogleApi;
    if (ezApi.ezIsEmptyString(mapsUrl)) {
        ezApi.ezclocker.logger.error('Skipped injection of Google Maps API script. Map functionality will not function.');
        return;
    }

    if (ezApi.ezIsTrue(self.mapsApiInjected)) {
        ezApi.ezclocker.logger.warn('Google Maps API already injected.');
        return;
    }

    return ezApi.ezPromise(function(resolve) {
        ezApi.ezclocker.ezInjector.ezInjectScriptTag(mapsUrl, '_GoogleMapsApi').then(
            function() {
                ezApi.ezclocker.ezInjector.ezWaitWindowObject('google', 5).then(
                    function() {
                        self.mapsApiInjected = true;
                        self.ezInjectGoogleMapsLabelApi();
                        return resolve(self.mapsApiInjected);
                    },
                    function() {
                        var em = 'Failed to inject google maps.';
                        ezApi.ezclocker.logger.error(em);
                        self.mapsApiInjected = false;
                        return resolve(self.mapsApiInjected, em);
                    });
            },
            function() {
                var em = 'Failed to inject google maps.';
                ezApi.ezclocker.logger.error(em);
                self.mapsApiInjected = false;
                return resolve(self.mapsApiInjected, em);
            });
    });
};

/**
 * @public
 * Inject the maplabel-compiled.js. Must be after google maps api, as it depends upon the google maps script
 */
EzGoogleApi.prototype.ezInjectGoogleMapsLabelApi = function() {
    var self = ezApi.ezclocker.ezGoogleApi;
    if (ezApi.ezIsFalse(self.mapsApiInjected)) {
        ezApi.ezclocker.logger.error('Google Maps Label Api requires Google Maps Api.');
        self.mapsLabelApiInjected = false;
        return ezApi.ezResolve();
    }

    if (ezApi.ezIsTrue(self.mapsLabelApiInjected)) {
        ezApi.ezclocker.logger.warn('Google Maps Label API already injected.');
        return ezApi.ezResolve();
    }

    ezApi.ezclocker.ezInjector.ezInjectScriptTag(self.mapsLabelApiUrl, '_GoogleMapsLabelApi').then(
        function() {
            self.mapsLabelApiInjected = true;
            return ezApi.ezResolve(self.mapsLabelApiInjected);
        },
        function() {
            self.mapsLabelApiInjected = false;
            var em = 'Google Maps Label Api failed to inject.';
            ezApi.ezclocker.logger.error(em);
            return ezApi.ezResolve(self.mapsLabelApiInjected, em);
        });
};

/**
 * @public
 * Obtains the Google API key from the services
 */
EzGoogleApi.prototype.ezGetApiKey = function() {
    var self = ezApi.ezclocker.ezGoogleApi;

    if (ezApi.isNotEmptyString(self.apiKey)) {
        return ezApi.ezResolve(self.apiKey);
    }

    return ezApi.ezPromise(function(resolve) {
        ezApi.ezclocker.http.get(self.googleApiKeyService).then(
            function(response) {
                if (ezApi.ezclocker.http.isErrorResponse(response)) {
                    var em = ezApi.ezclocker.http.extractErrorResponseMessage(response);
                    ezApi.ezclocker.logger.error(em);
                    return resolve(self.apiKey, em);
                }
                self.apiKey = response.message;
                return resolve(self.apiKey);
            },
            function(errorResponse) {
                var em = ezApi.ezclocker.http.extractErrorResponseMessage(errorResponse);
                ezApi.ezclocker.logger.error(em);
                return resolve(self.apiKey, em);
            });
    });
};

/**
 * ezApi Registration
 */
document.addEventListener('onEzApiReady', function() {
    if (typeof ezApi == 'undefined' || !ezApi) {
        window.console.warn('EzApi is required for ezclocker-google-services.js module.');
    }

    ezApi.ezRegisterPublic('ezGoogleApi', new EzGoogleApi());
    ezApi.ezclocker.ezGoogleApi.ezInit();
});