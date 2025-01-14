$(document).ready(function () {
    $('#monthly').show();
    $('#yearly').hide();

    $('.qheader').click(
        function () {
            var current = this.id;
            $('.faq-icon').each(function () {
                if (this.id == 'i' + current) {
                    $('#' + this.id).toggleClass('fa-angle-up fa-angle-down');
                } else {
                    $('#' + this.id).removeClass('fa-angle-up');
                    $('#' + this.id).addClass('fa-angle-down');
                }
            });
        });
    $('#switch').change(
        function () {
            $('#monthly').toggle();
            $('#yearly').toggle();
        });
});

/* exported staticFaqs */
var staticFaqs = [
    {
        id: '1',
        question: 'How does the 30 day free trial work?',
        answer: 'You can try out ezClocker for 30 days completely free. No credit card required if you are subscribing via the website and you can add as many employees as you like. Support will also be included in the free trial in case you have questions or need help getting setup.'
    },
    {
        id: '2',
        question: 'Do I have to install anything?',
        answer: 'Our software is cloud-based so there is nothing to install. Simply create an account, add employees and let them clock in/out. You have access to your data using any device: computer, iPad, iPhone, or Android.'
    },
    {
        id: '3',
        question: 'How does the GPS feature work?',
        answer: 'When employees clock in or out using ezClocker the app captures the GPS location of the employees. You as the employer can view the GPS information on your phone or computer on an easy to view map screen.  Please note that ezClocker does not track the location of your employees while they are working, only when they press the clock in or clock out buttons.'
    },
    {
        id: '4',
        question: 'How do I get started?',
        answer: 'Great question! simply visit our ezClocker homepage, enter your business name, email, password and sign up. To read a step by step guide on how to register and add employees please read this.'
    }
];

/* exported staticPlans */
var staticPlans = {
    monthly: [
        {
            name: 'Basic',
            price: '$10',
            mainFeature: 'Up to 15 employees',
            otherFeatures: [
                'Web and mobile access',
                'Employee scheduling',
                'GPS verification',
                'Export Pay Periods to CSV file'
            ]
        },
        {
            name: 'Basic Plus',
            price: '$25',
            popular: true,
            mainFeature: 'Up to 50 employees',
            otherFeatures: [
                'Web and mobile access',
                'Employee scheduling',
                'GPS verification',
                'Export Pay Periods to CSV file',
                'Payroll Integration'
            ]
        },
        {
            name: 'Premium',
            price: '$50',
            mainFeature: 'Up to 100 employees',
            otherFeatures: [
                'Web and mobile access',
                'Employee scheduling',
                'GPS verification',
                'Export Pay Periods to CSV file',
                'Payroll Integration'
            ]
        }
    ],
    yearly: [
        {
            name: 'Basic',
            yprice: '$120',
            discount: '20%',
            dyprice: '$96',
            mprice: '$8',
            price: '$8',
            mainFeature: 'Up to 15 employees',
            otherFeatures: [
                'Web and mobile access',
                'Employee scheduling',
                'GPS verification',
                'Export Pay Periods to CSV file'
            ]
        },
        {
            name: 'Basic Plus',
            popular: true,
            yprice: '$300',
            discount: '20%',
            dyprice: '$240',
            mprice: '$20',
            price: '$20',
            mainFeature: 'Up to 50 employees',
            otherFeatures: [
                'Web and mobile access',
                'Employee scheduling',
                'GPS verification',
                'Export Pay Periods to CSV file',
                'Payroll Integration'
            ]
        },
        {
            name: 'Premium',
            yprice: '$600',
            discount: '20%',
            dyprice: '$480',
            mprice: '$40',
            price: '$40',
            mainFeature: 'Up to 100 employees',
            otherFeatures: [
                'Web and mobile access',
                'Employee scheduling',
                'GPS verification',
                'Export Pay Periods to CSV file',
                'Payroll Integration'
            ]
        }
    ]
};

/* exported lastFaqClicked */
var lastFaqClicked;
