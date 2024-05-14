/**
 * @public
 * Affiliate Helper
 */
function EzAffiliate() {
    this.ready = false;

    this.defaultAffiliateId = 'SHARE_SALE';
    this.defaultMerchantId = '72259';
    this.defaultTransactionType = 'lead';
    this.defaultTrackingNumber = 'BADTRACKINGNUMBER';
    this.defaultAmount = '0.00';

    return this;
}

/**
 * Initializes EzAffiliate
 * @param {string|null} merchantId
 * @param {string|null} affiliateId
 * @param {string|null} amount
 * @param {string|null} trackingNumber
 * @param {string|null} transactionType
 */
EzAffiliate.prototype.ezInit = function(merchantId, affiliateId, amount, trackingNumber, transactionType) {
    var self = ezApi.p.ezAffiliate;

    self.amount = ezApi.isEmptyString(amount) ? self.defaultAmount : amount;
    self.trackingNumber = ezApi.isEmptyString(trackingNumber) ? self.defaultTrackingNumber : trackingNumber;
    self.transactionType = ezApi.isEmptyString(transactionType) ? self.defaultTransactionType : transactionType;
    self.trackingNumber = ezApi.isEmptyString(trackingNumber) ? self.defaultTrackingNumber : trackingNumber;
    self.merchantId = ezApi.isEmptyString(merchantId) ? self.defaultMerchantId : merchantId;
    self.affiliateId = ezApi.isEmptyString(affiliateId) ? self.defaultAffiliateId : affiliateId;

    self.ready = true;
    return self;
};

/**
 * Injects the affiliate pixel into the body.
 * @param {string|null} affiliateId
 * @param {string|null} amount
 * @param {string|null} trackingNumber
 * @param {string|null} transactionType
 */
EzAffiliate.prototype.injectAffiliatePixel = function(affiliateId, amount, trackingNumber, transactionType) {
    var self = ezApi.p.ezAffiliate;

    self.amount = ezApi.isEmptyString(amount) ? self.defaultAmount : amount;
    self.trackingNumber = ezApi.isEmptyString(trackingNumber) ? self.defaultTrackingNumber : trackingNumber;
    self.transactionType = ezApi.isEmptyString(transactionType) ? self.defaultTransactionType : transactionType;
    self.trackingNumber = ezApi.isEmptyString(trackingNumber) ? self.defaultTrackingNumber : trackingNumber;
    self.affiliateId = ezApi.isEmptyString(affiliateId) ? self.defaultAffiliateId : affiliateId;

    ezUi.ezAppend$('body', '<img src="https://shareasale.com/sale.cfm' +
        '?amount=' + self.amount +
        '&tracking=' + self.trackingNumber +
        '&transtype=' + self.transactionType +
        '&merchantID=' + self.merchantId +
        '" width="1" height="1">');
};

/**
 *
 * @param {string} affiliateId
 */
EzAffiliate.prototype.getTrackingPixelUrl = function(affiliateId) {
    switch (affiliateId) {
        case 'SHARE_SALE':
        default:
            return 'https://shareasale.com/sale.cfm';
    }
};

/**
 * ezApi Registration
 */
document.addEventListener('onEzApiReady', function() {
    if (typeof ezApi === 'undefined' || !ezApi) {
        window.console.error('EzApi is required in ezclocker-events.js module.');
        return;
    }
    ezApi.ezRegisterPublic('ezAffiliate', new EzAffiliate());
    ezApi.p.ezAffiliate.ezInit();
});