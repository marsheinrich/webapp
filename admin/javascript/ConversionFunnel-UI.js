/**
 * Refreshes the funnel data
 */
function refreshFunnel() {
    loadConversionFunnelData();
}

/**
 * Renders the graphical funnel bars
 * @param conversionFunnelData
 */
function renderConversionFunnelBars(conversionFunnelData) {
    var conversionFunnelBars = '';
    if (conversionFunnelData == null) {
        return;
    }	
    var width = 100;
    var decrease = 100 / conversionFunnelData.length;
    for(var index in conversionFunnelData) {
        var conversionFunnelItem = conversionFunnelData[index];
        conversionFunnelBars += '<div id="' + conversionFunnelItem.id + '" class="conversionFunnelBar" style="width: ' + width + '%">' + 
		conversionFunnelItem.metricKey + '</div>';
        width = width - decrease;
        loadMetricsForFunnelItem(conversionFunnelItem);
    }
    $('div#_ConversionFunnelContainer').html(conversionFunnelBars);
}

/**
 * Renders the conversion metric data into the bars.
 * @param conversionMetricData
 */
function renderConversionMetricData(conversionMetricData) {	
    var conversionFunnelItemDiv = $('div#' + conversionMetricData.funnelItem.id);
    var conversionMetricUIData = conversionMetricData.funnelItem.metricKey + ': Total Unique Events: ' + conversionMetricData.total + ' (' + conversionMetricData.percentOfTopMetric + '%)';
    $(conversionFunnelItemDiv).html(conversionMetricUIData);
}