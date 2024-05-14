/**
 * Javascript support for customer_satisfaction.html page
 */
class EzCustomerSatisfactionPage {
    constructor() {
        this.ready = false;
        this.ezTypeName = 'EzCustomerSatisfactionPage';
    }

    ezInit() {
        let self = ezApi.ezclocker[EzCustomerSatisfactionPage.ezApiName];

        ezUi.ezHookElementEvent('EzLeaveFeedbackButton', 'click', self.sendTextWithInformation);
        ezUi.ezHookElementEvent('EzCancelFeedbackProcessButton', 'click', self.navigateToThanks);

        self.ready = true;
        return self;
    }

    sendTextWithInformation() {
        var userName = $('#ez_userName').val();
        var userPhone = $('#ez_userPhone').val() || '';
        var userEmail = $('#ez_email').val() || '';
        var userMessage = $('#ez_message').val();
        var isContactable = $('#ez_contact_us').is(':checked') ? 'yes' : 'no';

        if (!userName || !userMessage) {
            ezApi.ezId('customerSatisfactionRateUsError').html('User name and a message are mandatory fields. Please enter both.');
            ezApi.ezId('customerSatisfactionRateUsError').show();
            return;
        }
        if (isContactable === 'yes' && !userEmail && !userPhone) {
            ezApi.ezId('customerSatisfactionRateUsError').html('You must enter either phone or email if you have checked contact us.');
            ezApi.ezId('customerSatisfactionRateUsError').show();
            return;
        } else {
            ezApi.ezId('customerSatisfactionRateUsError').hide();
            var url = '/api/v1/feedback';
            ezApi.ezclocker.http.ezPost(url,
                ezApi.ezToJson({
                    'details': `userName: ${userName}, userPhone: ${userPhone}, userEmail: ${userEmail}, userMessage: ${userMessage}, isContactable: ${isContactable}`,
                    'event': 'feedback form',
                    'source': 'Website',
                }), true, null, false).then(
                function(response) {
                    window.location.href = '/public/rateUs.html?openThanksOnRateUs=true';
                    return true;
                },
                function(eResponse) {
                    window.location.href = '/public/rateUs.html?openThanksOnRateUs=true';
                }
            );
        }
    }

    navigateToThanks() {
        window.location.href = '/public/rateUs.html?openThanksOnRateUs';
    }

}
EzCustomerSatisfactionPage.ezApiName = 'ezCustomerSatisfactionPage';

document.addEventListener('onEzApiReady',
    () => ezApi.ezRegisterNewApi(EzCustomerSatisfactionPage, EzCustomerSatisfactionPage.ezApiName));

export {
    EzCustomerSatisfactionPage
};
