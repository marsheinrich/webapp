/* globals
    subscriptionPlans, subscriptionPlansHtml
 */

/* exported subscriptionPlansSuccess */
function subscriptionPlansSuccess(result) {
    subscriptionPlans = jQuery.parseJSON(result);
    if (subscriptionPlans.errorCode != undefined && subscriptionPlans.errorCode != 0) {
        return;
    }
    loadActiveSubscriptionPlans(subscriptionPlans);
}

/* exported subscriptionPlansErrorHandler */
function subscriptionPlansErrorHandler(jqXHR, status, error) {
    alert('Unable to load subscription plans due to the following error: ' + error);
}

/* exported loadActiveSubscriptionPlans */
function loadActiveSubscriptionPlans(subscriptionPlans) {
    subscriptionPlansHtml = '<table id="_PaymentPlanTable" class="pricingTable"><tr>';
    var i;
    var subscriptionPlan;
    for (i = 0; i < subscriptionPlans.length; i++) {
        subscriptionPlan = subscriptionPlans[i].subscriptionPlan;
        subscriptionPlansHtml += '<th><h1>' + subscriptionPlan.name + '</h1></th>';
    }
    subscriptionPlansHtml += '</tr><tr>';
    for (i = 0; i < subscriptionPlans.length; i++) {
        subscriptionPlan = subscriptionPlans[i].subscriptionPlan;
        subscriptionPlansHtml += '<td>';
        subscriptionPlansHtml += '<div id="_PaymentPlanInfo">';
        subscriptionPlansHtml += subscriptionPlan.description; // Plan Name
        if (subscriptionPlan.bulletPointsJson != null) {
            var bulletPoints = jQuery.parseJSON(subscriptionPlan.bulletPointsJson);
            if (bulletPoints.items.length != 0) {
                subscriptionPlansHtml += '<ul>';
                for (var x = 0; x < bulletPoints.items.length; x++) {
                    var bulletPoint = bulletPoints.items[x];
                    subscriptionPlansHtml += '<li>' + bulletPoint + '</li>';
                }
                subscriptionPlansHtml += '</ul>';
            }
        }
        subscriptionPlansHtml += '<div id="_SelectedLabel"></div></div></td>';
    }
    subscriptionPlansHtml += '</tr></table>';
    $('#_SubscriptionPlanContainer').html(subscriptionPlansHtml);
}