import { EzInstanceState } from '/ezlibrary/EzInstanceState.js';

/**
    Controller for the welcome page view
 */
export class EzWelcomePage {
    static ezApiName = 'ezWelcomePage';

    static ezInstance = null;

    static ezApiRegistrationState = null;

    static ezCanRegister() {
        return 'PENDING' === EzWelcomePage.ezApiRegistrationState &&
            Object.prototype.hasOwnProperty.call(globalThis, 'ezApi') &&
            globalThis['ezApi'] && globalThis['ezApi'].ready;
    }

    static ezRegistrator() {
        if (EzWelcomePage.ezCanRegister()) {
            EzWelcomePage.ezInstance = ezApi.ezRegisterNewApi(
                EzWelcomePage,
                EzWelcomePage.ezApiName);

            EzWelcomePage.ezApiRegistrationState = 'REGISTERED';
        }
    }

    static {
        if (null == this.ezApiRegistrationState) {
            this.ezApiRegistrationState = 'PENDING';

            document.addEventListener(
                'onEzApiReady',
                this.ezRegistrator);
        }
    }

    /**
        @public
        Creates a new instance of EzWelcomePage
     */
    constructor() {
        this.ready = false;
        this.ezTypeName = 'EzWelcomePage';
        this.ezStates = [EzInstanceState.NOT_INITIALIZED];

        this.scrolled = false;
        this.ezReviews = [
            {
                'comments': 'After careful review of many similar apps, the team at ezClocker gets it right. They understand and deliver. Their customer service matches their superior products.',
                'reviewer': 'onedaywebpages.com, via iTunes reviews'
            },
            {
                'comments': 'User friendly for my staff, the GPS/location system make me aware when and where they are, the quick reports for payroll and customer support was awesome. Love it, recommend definitely!!!',
                'reviewer': 'Cathryn owner of Maids with Care'
            },
            {
                'comments': 'I have thoroughly enjoyed the simplicity of using the clock-in/clock-out feature. My employees can clock in/out from our work PC or from their phone.. Easy to use and easy to export the pay period for my payroll department.',
                'reviewer': 'johnstonmom, via iTunes reviews'
            },
            {
                'comments': 'This app rocks! I own a small remodeling company (crew of 5) and this is the perfect app for me! Easy to use, and saves me tons of time!',
                'reviewer': 'Nick flagg, via iTunes reviews'
            },
            {
                'comments': 'Very simple and easy to use application. Great for people who have employees that work from home. It helps you keep people accountable and you will know when they clock in and out',
                'reviewer': 'joaxvargas, via iTunes reviews'
            }
        ];
    }

    ezInit() {
        const self = ezApi.ezclocker.ezWelcomePage;

        $(document).scroll(ezApi.p.ezWelcomePage.ezAdjustNavBar);
        if (ezUi.ezWindow().width() >= 768) {
            ezUi.ezId$('#ezcFooter a').removeAttr('data-toggle');
        }

        ezApi.ezclocker.ezUi.ezHookElementEvent(
            '_EzContactUsButton',
            'click',
            () => ezApi.ezclocker.nav.ezNavigateTo('/welcome/contact.html?v=r72-3'));

        self.ezAdjustNavBar();

        self.ready = true;
        return self;
    }

    ezAdjustNavBar() {
        const self = ezApi.p.ezWelcomePage;

        let $nav = ezUi.ezId('mainNav');

        if (!self.scrolled && ezApi.ezDocument().scrollTop() !== 0) {
            $nav.addClass('scrolled');
            ezUi.ezSetElementAttribute('ezcLogo', 'src', '/public/images/logos/logo-white.svg');
            ezUi.ezId('ezNavPricing').addClass('nav-link-scrolled');
            ezUi.ezId('ezNavContact').addClass('nav-link-scrolled');
            ezUi.ezId('ezNavSignIn').addClass('nav-link-scrolled');
            self.scrolled = true;
        } else if (self.scrolled && ezApi.ezDocument().scrollTop() === 0) {
            ezUi.ezSetElementAttribute('ezcLogo', 'src', '/public/images/logos/logo.svg');
            $nav.removeClass('scrolled');
            ezUi.ezSetElementAttribute('ezcLogo', 'src', '/public/images/logos/logo.svg');
            ezUi.ezId('ezNavPricing').removeClass('nav-link-scrolled');
            ezUi.ezId('ezNavContact').removeClass('nav-link-scrolled');
            ezUi.ezId('ezNavSignIn').removeClass('nav-link-scrolled');
            self.scrolled = false;
        }
    }
}
