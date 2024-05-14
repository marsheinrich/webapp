/**
 * @public
 * Creates a new instance of EzEnvironment.
 *
 * @returns {EzEnvironment}
 */
function EzEnvironment() {
    this.ready = false;

    this.lastKnownEnvironment = 'PRD';
    return this;
}

/**
 * @protected
 * Initializes EzEnvironment
 *
 * @returns {EzEnvironment}
 */
EzEnvironment.prototype.ezInit = function() {
    var self = ezApi.ezclocker.ezEnvironment;

    self.ready = true;
    return self;
};

/**
 * Obtains the ezClocker Enviornment Information
 */
EzEnvironment.prototype.ezGetEnvironment = function() {
    return ezApi.ezResolver(function(resolve) {
        return ezApi.ezclocker.http.ezGet(ezApi.ezclocker.nav.ezGetApiUrl('ezsystem/environment', 'v1'))
            .then(ezApi.ezclocker.ezServices.ezProcessApiResolve, ezApi.ezclocker.ezServices.ezProcessApiReject)
            .then(
                function(response) {
                    if (ezApi.ezIsNotEmptyString(response.message)) {
                        self.lastKnownEnvironment = response.message;
                        return resolve(self.lastKnownEnvironment);
                    }
                    self.lastKnownEnvironment = 'PRD';
                    ezApi.ezclocker.logger.error('Failed to obtain the ezClocker environment information. Error: ' +
                        ezApi.ezToJson(response, 2));
                    return resolve('PRD');
                },
                function(eResponse) {
                    ezApi.ezclocker.logger.error('Failed to obtain the ezClocker environment information. Error: ' +
                        ezApi.ezToJson(eResponse, 2));
                    return resolve('PRD');
                });
    });
};

document.addEventListener('onEzApiReady', function() {
    // Note: creates a new ezApi named the same as the constructor and auto-calls ezInit()
    ezApi.ezRegisterNewApi(EzEnvironment, 'ezEnvironment');
});