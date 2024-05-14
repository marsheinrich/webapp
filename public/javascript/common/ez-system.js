/* exported EzSystem */

var EzSystem = function() {
    this.ready = false;
    this.environment = 'UNKNOWN';
    this.version = 'UNKNOWN';
    this.build = 'UNKNOWN';
    this.buildDate = 'UNKNOWN';
    this.ezInit();
};

EzSystem.prototype.ezInit = function() {
    var _this = this;
    ezApi.p.http.get(ezApi.p.nav.getPublicApiServiceUrl('ezsystem/info')).then(
        function(response) {
            _this.environment = response.environment;
            _this.version = response.version;
            _this.build = response.build;
            _this.buildDate = response.buildDate;
            _this.ready = true;
        },
        function(eResponse) {
            ezApi.p.logger.error('Failed to obtain the ezClocker system information: ' + ezApi.ezToJson(
                eResponse));
        });
};

document.addEventListener('onEzApiReady', function() {
    if (typeof ezApi !== 'undefined' && ezApi) {
        ezApi.p['ezSystem'] = new EzSystem();
    }
});