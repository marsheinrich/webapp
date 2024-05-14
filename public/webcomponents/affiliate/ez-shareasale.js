/* exported ezShareASale */

/**
 * @public
 * Provides ShareASale functionality to the UI
 */
var ezShareASale = {
    ready: false,
    PIXEL_URL: 'https://shareasale.com/sale.cfm',
    PIXEL_MERCHANT_ID: '72259',
    PIXEL_PARAM_AMOUNT: '?amount=',
    PIXEL_PARAM_TRACKING: '&tracking=',
    PIXEL_PARAM_TRANSTYPE: '&transtype=',
    PIXEL_PARAM_MERCHANTID: '&merchantID=',
    LEAD2SALE_ADMIN_API_PATH: '_admin/shareasale/lead2paid',
    SALE_API_PATH: 'integrations/shareasale/lead2paid',
    ezInit: function() {
        var self = ezApi.p.ezShareASale;
        self.ready = true;
        return self;
    },

    injectLeadPixel: function(trackingId) {
        var self = ezApi.p.ezShareASale;
        ezApi.ezBody().append('<img src="' + self.generatePixelUrl('0.05', trackingId, 'lead') +
            '" width="1" height="1">');
    },
    generatePixelUrl: function(amount, trackingId, transType) {
        return ezShareASale.PIXEL_URL +
            ezShareASale.PIXEL_PARAM_AMOUNT + amount +
            ezShareASale.PIXEL_PARAM_TRACKING + trackingId +
            ezShareASale.PIXEL_PARAM_TRANSTYPE + transType +
            ezShareASale.PIXEL_PARAM_MERCHANTID +
            ezShareASale.PIXEL_MERCHANT_ID;
    },
    recordLead2Sale: function(employerId, subscriptionMapId, amount) {
        return ezShareASale.lead2Sale(ezApi.p.nav.getPublicApiServiceUrl(ezShareASale.SALE_API_PATH),
            employerId,
            subscriptionMapId, amount);
    },
    recordLead2SaleAdmin: function(empId, subMapId, amount) {
        return ezShareASale.ezLead2Sale(ezApi.p.nav.getServiceUrl(ezShareASale.LEAD2SALE_ADMIN_API_PATH), empId,
            subMapId, amount);
    },
    ezLead2Sale: function(apiPath, employerId, subscriptionMapId, amount) {
        return ezApi.p.http.post(apiPath, ezApi.ezToJson({
            employerId: employerId,
            employerSubscriptionMapId: subscriptionMapId,
            amount: amount
        })).then(
            function(response) {
                ezApi.p.logger.info('Lead2Sale Success: ' + ezApi.ezToJson(response));
            },
            function(error, jqXHR) {
                ezApi.p.logger.error('Lead2Sale Failure: ' + ezApi.ezToJson(error) + ', JQXHR: ' +
                    ezApi.ezToJsony(jqXHR));
            }
        );
    }
};

/**
 * EzApi Registration
 */
document.addEventListener('onEzApiReady', function() {
    if (typeof ezApi === 'undefined' || !ezApi) {
        window.console.error('EzApi is required for ez-shareasale.js');
        return;
    }
    ezApi.ezRegisterPublic('ezShareASale', ezShareASale);
    ezApi.p.ezShareASale.ezInit();
});
