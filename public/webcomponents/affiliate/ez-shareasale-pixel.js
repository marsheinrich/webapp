var ezShareASalePixel = {
    PIXEL_URL: 'https://shareasale.com/sale.cfm',
    PIXEL_MERCHANT_ID: '72259',
    PIXEL_PARAM_AMOUNT: '?amount=',
    PIXEL_PARAM_TRACKING: '&tracking=',
    PIXEL_PARAM_TRANSTYPE: '&transtype=',
    PIXEL_PARAM_MERCHANTID: '&merchantID=',
    injectLeadPixel: function(trackingId) {
        var pixel = '<img src="' + ezShareASalePixel.generatePixelUrl('0.00', trackingId ? trackingId :
            'signup', 'lead') + '" width="1" height="1">';
        $('body').append(pixel);
    },
    generatePixelUrl: function(amount, trackingId, transType) {
        return ezShareASalePixel.PIXEL_URL +
            ezShareASalePixel.PIXEL_PARAM_AMOUNT + amount +
            ezShareASalePixel.PIXEL_PARAM_TRACKING + trackingId +
            ezShareASalePixel.PIXEL_PARAM_TRANSTYPE + transType +
            ezShareASalePixel.PIXEL_PARAM_MERCHANTID + ezShareASalePixel.PIXEL_MERCHANT_ID;
    }
};