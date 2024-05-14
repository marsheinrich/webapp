/* globals
    sizeDivs
 */

/**
 * @public
 * Controls the pricing view
 * @returns {EzPricingViewController}
 */
var EzPricingViewController = function() {
    this.ready = false;

    return this;
};

/**
 * @protected
 * Initializes EzPricingViewController
 * @returns {EzPricingViewController}
 */
EzPricingViewController.prototype.ezInit = function() {
    var self = ezApi.p.ezPricingViewController;
    ezApi.p.ezSubscriptionService.getAvailablePlans(
        function(response) {
            if (response.errorCode != undefined && response.errorCode != 0) {
                ezApi.p.logger.console.error(response.message);
                return;
            }
            self.subscriptionPlans = response;
            self.ezInitUx();
        },
        function(errorResponse) {
            ezApi.p.logger.error(errorResponse);
        }
    );
    self.ready = true;
    return self;
};

/**
 * @public
 * Initializes the view's UX
 */
EzPricingViewController.prototype.ezInitUx = function() {
    var self = ezApi.p.ezPricingViewController;
    sizeDivs(ezApi.ezId('_EzClockerHeader'), ezApi.ezId('_EzClockerMainContent'));
    // Window resizing handler
    $(window).resize(function() {
        sizeDivs(ezApi.ezId('_EzClockerHeader'), ezApi.ezId('_EzClockerMainContent'));
    });
    self.ezRenderSubscriptionPlans('_SubscriptionPlanContainer');
};

EzPricingViewController.prototype.ezRenderSubscriptionPlans = function(parentContainerId) {
    var self = ezApi.p.ezPricingViewController;
    var subscriptionPlansHtml = '<table class="planContainer"><tr>';
    for (var i = 0; i < self.subscriptionPlans.length; i++) {
        var subscriptionPlan = self.subscriptionPlans[i].subscriptionPlan;
        subscriptionPlansHtml += self.ezBuildPricingContainer(subscriptionPlan);
    }
    subscriptionPlansHtml += '</tr></table>';
    ezUi.ezHtml(parentContainerId, subscriptionPlansHtml);
};

EzPricingViewController.prototype.ezBuildPricingContainer = function(subscriptionPlan) {
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
        window.console.error('EzApi is require for account-delete.js module');
    }
    if (typeof ezUi === 'undefined' || !ezUi) {
        window.console.error('EzUi is require for account-delete.js module');
        return;
    }
    ezApi.ezRegisterPublic('ezPricingViewController', new EzPricingViewController());
    ezApi.p.ezPricingViewController.ezInit();
});