var google_conversion_id = undefined;
var google_custom_params = undefined;
var google_remarketing_only = undefined;

var ezPixels = {
    GOOGLE_CONVERSION_ID: 969305970,
    GOOGLE_CUSTOM_PARAMS: window.google_tag_params,
    GOOGLE_REMARKETING_ONLY: true,
    initGooglePixel: function() {
        google_conversion_id = ezPixels.GOOGLE_CONVERSION_ID;
        google_custom_params = GOOGLE_CUSTOM_PARAMS;
        google_remarketing_only = GOOGLE_REMARKETING_ONLY;
    }
};

document.addEventListener('onEzApiReady', function() {
    ezPixels.initGooglePixel();
    ezPixels.ready = true;
});