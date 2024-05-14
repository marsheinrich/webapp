

/**
 * @public
 * Provides access to employee images
 */
class EzEmployeeImage {
    static get DEFAULT_EMPLOYEE_IMAGE_NAME() {
        return 'avatars/default-white.svg';
    }

    static ezApiName = 'ezEmployeeImage';
    static ezEventNames = {
        onReady: 'ezOn_ezEmployeeImage_Ready'
    };
    static ezInstance = null;
    static ezApiRegistrationState = null;
    static ezCanRegister() {
        return 'PENDING' === EzEmployeeImage.ezApiRegistrationState &&
            Object.prototype.hasOwnProperty.call(globalThis, 'ezApi') &&
            globalThis['ezApi'] && globalThis['ezApi'].ready;
    }
    static ezRegistrator() {
        if (EzEmployeeImage.ezCanRegister()) {
            EzEmployeeImage.ezInstance = ezApi.ezRegisterNewApi(
                EzEmployeeImage,
                EzEmployeeImage.ezApiName);

            EzEmployeeImage.ezApiRegistrationState = 'REGISTERED';

            return true;
        }

        return false;
    }
    static {
        if (null == this.ezApiRegistrationState) {
            this.ezApiRegistrationState = 'PENDING';

            if (!this.ezRegistrator()) {
                document.addEventListener(
                    'onEzApiReady',
                    this.ezRegistrator);
            }
        }
    }

    constructor() {
        this.ready = false;
        this.ezApiName = 'EzEmployeeImage';

        this.ezEmployeeImageUrls = [];
    }

    /**
        @protected
        Initializes EzEmployeeImage
        @returns {EzEmployeeImage}
     */
    ezInit() {
        let self = ezApi.ezclocker[EzEmployeeImage.ezApiName];

        self.defaultEmployeeImageUrl = ezApi.ezclocker.ezNavigation.ezGetPublicImagesUrl(EzEmployeeImage.DEFAULT_EMPLOYEE_IMAGE_NAME);
        self.employeeImageExistsRootUrl = ezApi.ezclocker.ezNavigation.ezGetInternalClassicApiUrl('employee/picture/exists/');
        self.ready = true;
        return self;
    }

    /**
        @public
        Injects the employee's image into a parent element
        @param {Number} employeeId
        @param {String} parentId
     */
    ezInsertEmployeeImage(employeeId, parentId) {
        let self = ezApi.ezclocker[EzEmployeeImage.ezApiName];

        if (!ezApi.ezIsNumber(employeeId)) {
            throw ezApi.ezBadParam('employeeId', self.ezTypeName, 'ezInsertEmployeeImage');
        }
        if (!ezApi.ezStringHasLength(parentId)) {
            parentId = 'body';
        }

        return ezApi.ezResolver((resolve) => {
            if (ezUi.ezElementExists(parentId)) {

                if (!ezApi.ezHasOwnProperty(self.ezEmployeeImageUrls, employeeId.toString())) {
                    self.ezGetPrimaryEmployeeImageUrl(employeeId).then(() => {
                        ezUi.ezContent(parentId, self.ezBuildImageUx(employeeId));
                        return resolve();
                    });
                } else {
                    ezUi.ezContent(parentId, self.ezBuildImageUx(employeeId));
                    return resolve();
                }
            }
        });
    }

    /**
        @public
        Returns the url to the employee's primary image (or the default employee image url if none exists)
        @param {long} employeeId
        @returns {Promise.resolve}
        A resolve only promise
     */
    ezGetPrimaryEmployeeImageUrl(employeeId) {
        let self = ezApi.ezclocker[EzEmployeeImage.ezApiName];

        if (ezApi.isNotValid(employeeId)) {
            return ezApi.ezResolve(self.defaultEmployeeImageUrl);
        }

        self.ezEmployeeImageUrls[employeeId.toString] = self.defaultEmployeeImageUrl;
        return ezApi.ezResolve(self.defaultEmployeeImageUrl);

        /*return ezApi.ezResolver(
            (resolve) => ezApi.ezclocker.http.ezGet(self.employeeImageExistsUrl + employeeId)
                .then(
                    ezApi.ezclocker.ezServices.ezProcessApiResolve,
                    ezApi.ezclocker.ezServices.ezProcessApiReject)
                .then(
                    (response) => {
                        if ('FALSE' === response.message.toUpperCase()) {
                            self.ezEmployeeImageUrls[employeeId.toString] = self.defaultEmployeeImageUrl;
                        } else {
                            self.ezEmployeeImageUrls[employeeId.toString] = ezApi.ezclocker.nav.getInternalClassicApiUrl(
                                ezApi.ezUrlTemplate`employee/${employeeId}/picture`);
                            return resolve(self.ezEmployeeImageUrls[employeeId.toString]);
                        }
                    },
                    () => {
                        self.ezEmployeeImageUrls[employeeId.toString] = self.defaultEmployeeImageUrl;
                        return resolve(self.ezEmployeeImageUrls[employeeId.toString]);
                    }));
        */
    }

    /**
        @protected
        Builds the HTML for the employee's image
        @param {Number} employeeId
    */
    ezBuildImageUx(employeeId) {
        let self = ezApi.ezclocker[EzEmployeeImage.ezApiName];

        return ezApi.ezTemplate`
            <style id="EzEmployeeImageStyles">
            img.ezEmployeeImage {
                margin-right: 8px;
                height: 60px;
                border-top-right-radius: 4px;
                border-top-left-radius: 4px;
            }
            </style>
            <div id="EzEmployeeImageContainer_${employeeId}" class="ezEmployeeImageContainer">
                <img id="EzEmployeeImage_${employeeId}" src="${self.ezEmployeeImageUrls[employeeId.toString]}"
                    alt="Employee Profile Picture" class="ezEmployeeImage"/>
            </div>
        `;
    }
}

export {
    EzEmployeeImage
};
