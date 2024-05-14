/* exported subscriptionPlansSuccess, subscriptionPlansErrorHandler */

window.console.warn('DEPRECATED: pricing-subscription-plans.js replaced with just the pricing.js scripts.');

function subscriptionPlansSuccess(result) {
    ezApi.s.ezAccountController.pageContext.subscriptionPlans = JSON.parse(result);
    if (ezApi.s.ezAccountController.pageContext.subscriptionPlans.errorCode != undefined &&
        ezApi.s.ezAccountController.pageContext.subscriptionPlans.errorCode != 0) {
        window.alert('Unable to load subscription plans due to the following error: ' +
            ezApi.s.ezAccountController.pageContext.subscriptionPlans.message);
        return;
    }
    loadActiveSubscriptionPlans(ezApi.s.ezAccountController.pageContext.subscriptionPlans);
}

function subscriptionPlansErrorHandler(jqXHR, status, error) {
    window.alert('Unable to load subscription plans due to the following error: ' + error);
}

function loadActiveSubscriptionPlans(subscriptionPlans) {
    var subscriptionPlansHtml = '<label class="subscriptionPlanIntroTitle">Available Plans</label>';
    subscriptionPlansHtml += '<table id="_PaymentPlanTable" class="paymentPlanTable"><tr class="paymentPlanRow">';
    for (var i = 0; i < subscriptionPlans.length; i++) {
        var subscriptionPlan = subscriptionPlans[i].subscriptionPlan;
        subscriptionPlansHtml += '<td class="paymentPlanColumn"><div id="_SubscriptionPlan_' + subscriptionPlan.id +
            '" class="paymentPlanContainer">';
        subscriptionPlansHtml += '<div class="paymentPlanTitle">' + subscriptionPlan.name + '</div>';
        subscriptionPlansHtml += '<div class="paymentPlanInfo" id="_PaymentPlanInfo">';
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
        subscriptionPlansHtml += '<div id="_SelectedLabel"> </div></div></td>';
    }
    subscriptionPlansHtml += '</tr></table>';
    $('div#_SubscriptionPlanContainer').html(subscriptionPlansHtml);
}