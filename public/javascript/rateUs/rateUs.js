/**
 * Javascript support for rateUs.html page
 */
class EzRateUsPage {
    constructor() {
        this.ready = false;
        this.ezTypeName = 'EzRateUsPage';
        this.forwardingPage = 'g2Crowd';
        this.upperIndex;
        $('#rateUsInputStarRatingText').html('');
        $('#rateUsDoneButton').prop('disabled', true);
        $('#rateUsDoneButton').prop('hidden', true);
    }

    ezInit() {
        let self = ezApi.ezclocker[EzRateUsPage.ezApiName];

        ezUi.ezHookElementEvent('_ClickOnRating', 'click', self.submitRating);

        const urlParams = new URLSearchParams(window.location.search);
        const openThanksOnRateUsParm = urlParams.get('openThanksOnRateUs');

        if (openThanksOnRateUsParm !== null) {
            document.body.style.backgroundColor = 'gray';
            $('#rateUsMainBoxDiv').css('background-color', 'gray');
            $('#_ThanksForInput').css('background-color', 'white');
            $('#_ThanksForInput').css('padding','20px');
            $('#rateUsInputs').css('margin-top', '0px');

            ezUi.ezContent( '_ThanksForInput', ezApi.ezTemplate`
            <div id="_Thanks_For_Feedback_Container">
                <style>
                    .rate-us-thanks-main-div {
                        margin: 10px 200px 0;
                    }
                    .rate-us-thanks-feedback {
                        margin:30px;
                        font-size: 24px;
                        text-align: center;
                    }
                    @media screen and (max-width: 480px) {
                        .rate-us-thanks-main-div {
                            margin: 0;
                        }

                        .rate-us-thanks-feedback {
                            margin: 0;
                        }
                    }
                </style>
                <div class="rate-us-thanks-main-div">
                    <div class="rate-us-thanks-feedback">Thank you! for your feedback!</div>
                </div>
            </div>`);
        } else {
            $('#rateUsDoneButton').prop('disabled',false);
            $('#rateUsDoneButton').prop('hidden', false);
            ezUi.ezHookElementEvent('rating_1', 'click', self.executeRating);
            ezUi.ezHookElementEvent('rating_2', 'click', self.executeRating);
            ezUi.ezHookElementEvent('rating_3', 'click', self.executeRating);
            ezUi.ezHookElementEvent('rating_4', 'click', self.executeRating);
            ezUi.ezHookElementEvent('rating_5', 'click', self.executeRating);
            ezUi.ezHookElementEvent('rateUsDoneButton', 'click', self.submitRating);
        }

        self.ready = true;
        return self;
    }

    executeRating(star) {
        let self = ezApi.ezclocker[EzRateUsPage.ezApiName];
        const upperIndex = parseInt(star.currentTarget.firstChild.value);
        self.upperIndex = upperIndex;


        for (let i = 1;i <= upperIndex; i++) {
            document.getElementById('rating_'+ i).classList.replace('empty', 'orange');
        }
        for (let i = upperIndex + 1; i <= 5; i++) {
            document.getElementById('rating_'+ i).classList.replace('orange', 'empty');
        }

        if (upperIndex == 1) {
            $('#rateUsInputStarRatingText').html('Bad');
        } else if (upperIndex == 2) {
            $('#rateUsInputStarRatingText').html('Poor');
        } else if (upperIndex == 3) {
            $('#rateUsInputStarRatingText').html('OK');
        } else if (upperIndex == 4) {
            $('#rateUsInputStarRatingText').html('Very Good');
        } else if (upperIndex == 5) {
            $('#rateUsInputStarRatingText').html('Excellent');
        }
    }

    submitRating() {
        let self = ezApi.ezclocker[EzRateUsPage.ezApiName];

        if(!self.upperIndex) {
            $('#rateUsInputStarRatingText').html('Please choose a rating!');
        } else if (self.upperIndex > 3) {
            window.location.href = `/public/${self.forwardingPage}.html`;
        } else {
            window.location.href = '/public/customer_satisfaction_rate_us.html';
        }
    }

}
EzRateUsPage.ezApiName = 'ezRateUsPage';

document.addEventListener('onEzApiReady',
    () => ezApi.ezRegisterNewApi(EzRateUsPage, EzRateUsPage.ezApiName));

export {
    EzRateUsPage
};
