/* exported ezIndexViewController */
/**
 * @public
 * Main index view controller
 */
var ezIndexViewController = {
    ready: false,
    MOBILE_INDEX_PAGE: 'm.index.html',
    affiliateId: null,
    /**
     * @protected
     * Initializes ezIndexViewController
     * @returns {ezIndexViewController}
     */
    ezInit: function() {
        var self = ezApi.p.ezIndexViewController;
        if (typeof ezApi === 'undefined' || !ezApi) {
            ezApi.p.logger.error('ezIndexViewController requires ezApi to function.');
        }
        self.affiliateId = ezApi.p.ezUrlHelper.getUrlParam('affiliateId');
        self.ezInitUX();
        self.ready = true;
        return self;
    },
    /**
     * @protected
     * Original: loadFolds
     */
    ezInitUX: function() {
        var self = ezApi.p.ezIndexViewController;
        if (self.ezRedirectMobileIfNecessary()) {
            return ezApi.ezResolve();
        }
        return ezApi.ezPromise(function(resolve) {
            Promise.all([
                ezApi.p.ezWebComp.insert('_LandingHeader', '_LandingHeaderContents',
                    ezApi.p.nav.getPublicPageUrl('webcomponents/landing/landingHeader.html')),
                ezApi.p.ezWebComp.insert('_ClockInOutFold', '_CloockInOutFoldContents',
                    ezApi.p.nav.getPublicPageUrl('webcomponents/landing/clockInOutFold.html')),
                ezApi.p.ezWebComp.insert('_GpsFold', '_GpsFoldContents',
                    ezApi.p.nav.getPublicPageUrl('webcomponents/landing/gpsFold.html')),
                ezApi.p.ezWebComp.insert('_MultiDeviceFold', '_MultiDeviceFoldContents',
                    ezApi.p.nav.getPublicPageUrl('webcomponents/landing/multiDeviceFold.html')),
                ezApi.p.ezWebComp.insert('_ScheduleFold', '_ScheduleFoldContents',
                    ezApi.p.nav.getPublicPageUrl('webcomponents/landing/scheduleFold.html')),
                ezApi.p.ezWebComp.insert('_PaymentPlansFold', '_PaymentPlansFoldContents',
                    ezApi.p.nav.getPublicPageUrl('webcomponents/landing/paymentPlansFold.html')
                ),
                ezApi.p.ezWebComp.insert('_MobileDownloadFold', '_MobileDownloadFoldContents',
                    ezApi.p.nav.getPublicPageUrl(
                        'webcomponents/landing/mobileDownloadFold.html')),
                ezApi.p.ezWebComp.insert('_LandingFooter', '_LandingFooterContents',
                    'https://s3.amazonaws.com/com.ezclocker.static/footerFold.html')
            ]).then(function() {
                ezApi.ezId('_PageContainer').fadeIn();
                resolve();
            });
        });
    },
    /**
     * @private
     * Redirects to the mobile site if a mobile browser was detected.
     */
    ezRedirectMobileIfNecessary: function() {
        var self = ezApi.p.ezIndexViewController;
        if (self.affiliateId) {
            return ezApi.p.ezMobile.redirectIfMobilePublic(self.MOBILE_INDEX_PAGE + ezApi.p.ezAffiliate._SHARASALE_PARAM_NAME +
                '=' + self.affiliateId);
        }
        return ezApi.p.ezMobile.redirectIfMobilePublic(this.MOBILE_INDEX_PAGE);
    }
};

/**
 * ezApi Registration
 */
document.addEventListener('onEzApiReady', function() {
    if (typeof ezApi === 'undefined' || !ezApi) {
        window.console.error('EzApi is required for ezclocker-index-controller.js module.');
        return;
    }
    if (typeof ezUi === 'undefined' || !ezUi) {
        window.console.error('EzUi is required for ezclocker-index-controller.js module.');
        return;
    }
    ezApi.ezRegisterPublic('ezIndexViewController', ezIndexViewController);
    ezApi.p.ezIndexViewController.ezInit();
});