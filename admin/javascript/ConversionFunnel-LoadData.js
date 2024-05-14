/**
 * Loads the conversion funnel data
 */
function loadConversionFunnelData() {
    var getURL = '../_conversionFunnel';
    getJSON(getURL, '', handleGetConversionFunnelDataSuccess, handleGetConversionFunnelDataError);
}
function handleGetConversionFunnelDataSuccess(result, statusCode, jqXHR) {
    var resultJson = jQuery.parseJSON(result);
    if (resultJson.errorCode != 0) {
        alert('Unable to get conversion funnel data: ' + resultJson.message);
        return;
    }
    renderConversionFunnelBars(resultJson.conversionFunnelItems);
}
function handleGetConversionFunnelDataError(jqXHR, status, error) {
    alert('Unable to get conversion funnel data: ' + error);
}


/**
 * Gets the conversion metrics for the funnel item
 * @param conversionFunnelItem
 */
function loadMetricsForFunnelItem(conversionFunnelItem) {
    if (conversionFunnelItem == null) {
        return;
    }
    var getURL = '../_conversionFunnel/' + conversionFunnelItem.id;
    getJSON(getURL, '', handleGetConversionFunnelItemDataSuccess, handleGetConversionFunnelItemDataError, true);
}
function handleGetConversionFunnelItemDataSuccess(result, statusCode, jqXHR) {
    var resultJson = jQuery.parseJSON(result);
    if (resultJson.errorCode != 0) {
        alert('Unable to get conversion funnel item data: ' + resultJson.message);
        return;
    }
    renderConversionMetricData(resultJson.conversionMetric);
}
function handleGetConversionFunnelItemDataError(jqXHR, status, error) {
    //alert("Unable to get conversion funnel data: " + error);
}
