/* globals
    isBadReference, httpHelper
*/

/* exported init */
function init() {
    loadFAQs();
}

/* exported FAQs */
var FAQs = null;

/* exported loadFAQs */
function loadFAQs() {
    var url = '../api/v1/FAQ';
    httpHelper.httpGETJSON(url,
        function(response) { // success
            if (httpHelper.isErrorResponse(response)) {
                FAQs = null;
                renderFAQs();
                return;
            }
            FAQs = response;
            renderFAQs();
        },
        function() { // failure
            renderFAQs();
        });
}

/* exported renderFAQs */
function renderFAQs() {
    if (isBadReference(FAQs) || FAQs.length == 0) {
        $('#_FAQcontainer').html('<h1>No FAQ\'s available at this time.</h1>');
        return;
    }

    var htmlForFAQs = '';
    for (var i = 0; i < FAQs.length; i++) {
        htmlForFAQs += '<div id="showQuestionSlide' + FAQs[i].id + '" onclick="showMyQuestion(' + FAQs[i].id +
            ')"><p>Q: ' + FAQs[i].question + '</p></div>';
        htmlForFAQs += '<div id="questionSlide' + FAQs[i].id + '" class="questionSlide"><p>' + FAQs[i].answer +
            '</p></div>';
    }
    $('#_FAQcontainer').html(htmlForFAQs);
}

/* exported showMyQuestion */
function showMyQuestion(id) {
    var myId = '#questionSlide' + id;
    if (!$(myId).is(':hidden')) {
        $(myId).hide();
        return;
    }
    $(myId).slideDown('slow');
}
