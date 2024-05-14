/**
 * Loads the conversion funnel into the UI
 */
function init() {
    loadConversionFunnelData();	
    $('form#addConversionFunnelItem').submit(submitAddConversionFunnelItem);
}

function submitAddConversionFunnelItem() {
    $('div#addConversionFunnelItemResults').html('Processing results...');
    event.preventDefault();
    postForm(event, this, handleAddConversionFunnelItemSuccess, handleAddConversionFunnelItemError);
}
function handleAddConversionFunnelItemSuccess(result, statusCode, jqXHR) {
    $('div#addConversionFunnelItemResults').html(result.toString());
}
function handleAddConversionFunnelItemError(jqXHR, status, error) {
	
}