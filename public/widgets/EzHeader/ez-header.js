import { EzSetterType } from '/ezlibrary/ez-getter-setter.js';

// TODO: Remove ez-getter-setter use from this class.

class EzHeader {
    static ezApiName = 'ezHeader';
    static ezEventNames = {
        onReady: 'ezOn_EzHeader_Ready'
    };
    static ezInstance = null;
    static ezApiRegistrationState = null;
    static ezCanRegister() {
        return 'PENDING' === EzHeader.ezApiRegistrationState &&
            Object.prototype.hasOwnProperty.call(globalThis, 'ezApi') &&
            globalThis['ezApi'] && globalThis['ezApi'].ready;
    }
    static ezRegistrator() {
        if (EzHeader.ezCanRegister()) {
            EzHeader.ezInstance = ezApi.ezRegisterEnumeration(EzHeader);

            EzHeader.ezApiRegistrationState = 'REGISTERED';
        }
    }
    // Static Constructor
    static {
        if (null == this.ezApiRegistrationState) {
            this.ezApiRegistrationState = 'PENDING';

            document.addEventListener(
                'onEzApiReady',
                this.ezRegistrator);
        }
    }

    /**
        @public @constructor
        Creates a new instance of EzHeader.
        @returns {EzHeader}
     */
    constructor() {
        this.DEFAULT_NAV_BUTTON_PROPERTIES = {
            dashboard: {
                id: 'EzDashboardNavigationButton',
                enabled: true,
                visible: true,
                click: ezApi.ezIsValid(ezApi.ezclocker.nav.ezNavigateToEmployerDashboard)
                    ? ezApi.ezclocker.nav.ezNavigateToEmployerDashboard
                    : null
            },
            schedules: {
                id: 'EzSchedulesNavigationButton',
                enabled: true,
                visible: true,
                click: ezApi.ezIsValid(ezApi.ezclocker.nav.ezNavigateToEmployerSchedules)
                    ? ezApi.ezclocker.nav.ezNavigateToEmployerSchedule
                    : null
            },
            employeeArchive: {
                id: 'EzEmployeeArchiveNavigationButton',
                enabled: true,
                visible: true,
                click: ezApi.ezIsValid(ezApi.ezclocker.nav.ezNavigateToEmployeeArchive)
                    ? ezApi.ezclocker.nav.ezNavigateToEmployeeArchive
                    : null
            },
            account: {
                id: 'EzEmployeeArchiveNavigationButton',
                enabled: true,
                visible: true,
                click: ezApi.ezIsValid(ezApi.ezclocker.nav.ezNavigateToEmployerAccountPage)
                    ? ezApi.ezclocker.nav.ezNavigateToEmployerAccountPage
                    : null
            },
            signOut: {
                id: 'EzSignOutButton',
                enabled: true,
                visible: true,
                click: ezApi.ezIsValid(ezApi.ezclocker.nav.ezSignOut)
                    ? ezApi.ezclocker.nav.ezSignOut
                    : null
            }
        };

        this._ready = false;
        this.ezReady = ezApi.ezGetSet(this,
            '_ready',
            EzSetterType.boolean,
            this._ready,
            this._ready);

        this.ezHeaderElement = ezApi.ezGetter(this, '_headerElement', function() {
            return document.getElementById('EzClockerBanner');
        });

        this.ezHeaderLogo = ezApi.ezGetSet(this,
            '_headerLogo',
            EzSetterType.string,
            '/public/images/spinners/orange-spinner.gif',
            '/public/images/spinners/orange-spinner.gif');

        this.ezHeaderCompanyName = ezApi.ezGetSet(this,
            '_headerCompanyName',
            EzSetterType.string,
            '', '');

        /**
            @public
            Gets properties for all the navigation buttons.
         */
        this.ezNavButtonProperties = ezApi.ezGetSet(this,
            '_navButtonProperties',
            EzSetterType.object,
            this.DEFAULT_NAV_BUTTON_PROPERTIES,
            this.DEFAULT_NAV_BUTTON_PROPERTIES);

        /**
            @private
            Handles all navigation button's enabled property onChange event
            @param {*} e
         */
        this.ezButtonEnabledPropChanged = function(e) {
            var navButtonId = null;

            switch (e.detail.propName) {
                case '_navDashboardEnabled':
                    navButtonId = e.detail.propOwner.ezNavButtonProperties.dashboard.id;
                    break;
                case '_navSchedulesEnabled':
                    navButtonId = e.detail.propOwner.ezNavButtonProperties.schedules.id;
                    break;
                case '_navEmployeeArchiveEnabled':
                    navButtonId = e.detail.propOwner.ezNavButtonProperties.employeeArchive.id;
                    break;
                case '_navAccountEnabled':
                    navButtonId = e.detail.propOwner.ezNavButtonProperties.account.id;
                    break;
                case '_navSignOutEnabled':
                    navButtonId = e.detail.propOwner.ezNavButtonProperties.signOut.id;
                    break;
            }

            if (e.detail.propValue) {
                ezUi.ezDisable(navButtonId);
            } else {
                ezUi.ezEnable(navButtonId);
            }
        };
        return this;
    }

    /**
        @protected
        Initializes the EzHeader widget.
        @returns {EzHeader}
     */
    ezInit() {
        var self = ezApi.ezclocker.ezHeader;

        self.ezInitUx();

        self.ezReady().set(true);
        return self;
    }

    /**
        @protected
        Initializes this widgets UX
     */
    ezInitUx() {
        var self = ezApi.ezclocker.ezHeader;

        ezUi.ezHtml('EzPageHeader', self.ezBuildWidget());
    }

    /**
        @protected
        Generates this widgets HTML
        @returns {String}
     */
    ezBuildWidget() {
        return ezApi.ezclocker.ezHtml()
            .ezComment('EzHeader Widget')
            .ezDiv('EzClockerBanner', {
                class: 'ezGridX ezHeaderBanner ez-bottom-shadow',
                content: ezApi.ezclocker.ezHtml()

                    .ezDiv('EzClockerBannerRows', {
                        class: 'ezAutoRow',
                        content: ezApi.ezclocker.ezHtml()

                            .ezDiv('EzClockerBannerColumns', {
                                class: 'ezAutoCol_50xA ezBannerHeaderContainer',
                                content: ezApi.ezclocker.ezHtml()

                                    .ezDiv('EzClockerBannerHeaderCols', {
                                        class: 'ezAutoCol_AxA ezGrid-align-start ezGrid-align-start',
                                        content: ezApi.ezclocker.ezHtml()
                                            //.ezImg('_EmployerLogoImage', {
                                            //    class: 'ezBannerLogo',
                                            //    src: '/public/images/spinners/orange-spinner.gif',
                                            //    alt: '.'
                                            //})
                                            .ezDiv('_EmployerNameCell', {
                                                class: 'ezBannerHeaderText',
                                                content: 'loading ...'
                                            })
                                            .ezBuild()
                                    })

                                    .ezDiv('EzClockerBannerButtonsCol', {
                                        class: 'ezAutoCol_AxAxAxAxA ezGrid-align-end ezGrid-vertical-align-center',
                                        content: ezApi.ezclocker.ezHtml()
                                            .ezButton('_NavDashboard', {
                                                disabled: null,
                                                class: 'headerButton',
                                                content: 'Dashboard'
                                            })
                                            .ezButton('_NavSchedules', {
                                                class: 'headerButton',
                                                content: 'Schedules'
                                            })
                                            .ezButton('_NavEmployeeArchive', {
                                                class: 'headerButton',
                                                content: 'Employee Archive'
                                            })
                                            .ezButton('_NavAccount', {
                                                class: 'headerButton',
                                                content: 'Account'
                                            })
                                            .ezButton('_NavSignout', {
                                                class: 'headerButton',
                                                content: 'Sign Out'
                                            })
                                            .ezBuild()
                                    })
                                    .ezBuild()
                            })
                            .ezBuild()
                    })
                    .ezBuild()
            })
            .ezBuild();
    }
}

export {
    EzHeader
};