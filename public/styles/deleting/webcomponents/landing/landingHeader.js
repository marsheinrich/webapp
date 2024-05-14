/**
 * Javascript support for landingHeader.html component
 */
var EzLandingHeaderFold = function() {
    this.ready = false;

    return this;
};

EzLandingHeaderFold.prototype.ezInit = function() {
    var self = ezApi.p.ezLandingHeaderFold;
    self.ezInitUx();
    self.ready = true;
    return self;
};

EzLandingHeaderFold.prototype.ezInitUx = function() {
    return ezApi.p.ezWebComp.insert('_SignUpComp', '_SignUpCompContents',
        ezApi.p.nav.getPublicPageUrl('webcomponents/landing/signUpNow.html'));
};

/**
 * EzApi Registration
 */
document.addEventListener('onEzApiReady', function() {
    if (typeof ezApi === 'undefined' || !ezApi) {
        window.console.error('EzApi is required for password-reset.js module.');
    }
    ezApi.ezRegisterPublic('ezLandingHeaderFold', new EzLandingHeaderFold());
    ezApi.p.ezLandingHeaderFold.ezInit();
});
