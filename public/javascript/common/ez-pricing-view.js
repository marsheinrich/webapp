var EzPricingView = function() {
    this.ready = false;
    this.subscriptionPlans = [];
    return this;
};

EzPricingView.prototype.ezInit = function() {
    var self = ezApi.p.ezPricingView;
    self.ready = true;
    return self;
};

EzPricingView.prototype.ezRenderSubscriptionPlans = function(parentContainerId) {
    var self = ezApi.p.ezPricingView;
    ezApi.p.ezSubscriptionService.getAvailablePlans(
        function(response) {
            if (response.errorCode != undefined && response.errorCode != 0) {
                ezApi.p.logger.console.error(response.message);
                return;
            }
            ezApi.p.ezPricingView.subscriptionPlans = response;
            var subscriptionPlansHtml = '<table class="planContainer"><tr>';
            for (var i = 0; i < ezApi.p.ezPricingView.subscriptionPlans.length; i++) {
                var subscriptionPlan = ezApi.p.ezPricingView.subscriptionPlans[i].subscriptionPlan;
                subscriptionPlansHtml += self.ezBuildPricingContainer(subscriptionPlan);
            }
            subscriptionPlansHtml += '</tr></table>';
            ezUi.ezHtml(parentContainerId, subscriptionPlansHtml);
        },
        function(errorResponse) {
            ezApi.p.logger.error(errorResponse);
        });

};

EzPricingView.prototype.ezBuildPricingContainer = function(subscriptionPlan) {
    var subscriptionPlanCard = '<td class="planCardCell">' +
        '<div class="planHeaderCell">' + subscriptionPlan.description + '</div>' +
        '<div class="planPriceLabelCell">' + subscriptionPlan.name + '</div>' +
        '<div class="planButtonCell">' +
        '<button class="superActionButton" onclick="ezApi.p.nav.navigateToPublicPage(\'signup.html\')">' +
        'Sign up</button></div>' +
        '<div class="planFeatureCell">';
    if (subscriptionPlan.bulletPointsJson != null) {
        var bulletPoints = ezApi.ezFromJson(subscriptionPlan.bulletPointsJson);
        if (bulletPoints.items.length != 0) {
            subscriptionPlanCard += '<ul>';
            for (var x = 0; x < bulletPoints.items.length; x++) {
                var bulletPoint = bulletPoints.items[x];
                subscriptionPlanCard += '<li>' + bulletPoint + '</li>';
            }
            subscriptionPlanCard += '</ul>';
        }
    }
    subscriptionPlanCard += '</div></td>';
    return subscriptionPlanCard;
};

/**
 *
 * ezApi Registration
 */
document.addEventListener('onEzApiReady', function() {
    if (typeof ezApi === 'undefined' || !ezApi) {
        window.console.error('EzApi is require for ez-pricing-view.js module');
    }
    if (typeof ezUi === 'undefined' || !ezUi) {
        window.console.error('EzUi is require for ez-pricing-view.js module');
        return;
    }
    ezApi.ezRegisterPublic('ezPricingView', new EzPricingView());
    ezApi.p.ezPricingView.ezInit();
});