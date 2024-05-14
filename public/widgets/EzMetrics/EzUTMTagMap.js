/**
 * @public
 * Provides access to the UtmTagMap services
 */
class EzUtmTagMapService {
    constructor() {
        this.ready = false;

        this.UTM_TAG_NAMES = {
            UTM_MEDIUM: 'utm_medium',
            UTM_SOURCE: 'utm_source',
            UTM_CAMPAIGN: 'utm_campaign'
        };

        this.serviceUri = ezApi.ezclocker.nav.getPublicApiUrl('utm-tag-map', 'v1');
    }

    /**
     * @protected
     * Initializes EzUtmTagMapService
     * @returns {EzUtmTagMapService}
     */
    ezInit() {
        let self = ezApi.ezclocker.ezUtmTagMapService;

        self.ready = true;
        return self;
    }

    /**
     * @public
     * Creates a new UtmTagMap object
     * @param {number|null} aEmployerId
     * @param {number|null} aEmployeeId
     * @param {number|null} aUserId
     * @param {string|null} aUserName
     * @param {string|null} aUtmMedium
     * @param {string|null} aUtmSource
     * @param {string|null} aUtmCampaign
     * @returns {object}
     */
    ezCreateUtmTagMap(aEmployerId, aEmployeeId, aUserId, aUserName, aUtmMedium, aUtmSource, aUtmCampaign) {
        if (ezApi.ezIsEmptyString(aUtmMedium) && ezApi.ezIsEmptyString(aUtmSource) && ezApi.ezIsEmptyString(aUtmCampaign)) {
            return null;
        }

        return {
            employerId: ezApi.ezIsNumber(aEmployerId) ? aEmployerId : null,
            employeeId: ezApi.ezIsNumber(aEmployeeId) ? aEmployeeId : null,
            userId: ezApi.ezIsNumber(aUserId) ? aUserId : null,
            username: ezApi.ezIsNotEmptyString(aUserName) ? aUserName : null,
            utmMedium: ezApi.ezIsNotEmptyString(aUtmMedium) ? aUtmMedium : null,
            utmSource: ezApi.ezIsNotEmptyString(aUtmSource) ? aUtmSource : null,
            utmCampaign: ezApi.ezIsNotEmptyString(aUtmCampaign) ? aUtmCampaign : null,
            createdDateTimeIso8601: ezApi.ezclocker.ezDateTime.ezToIso(ezApi.ezclocker.ezDateTime.ezNow())
        };
    }

    /**
     * @public
     * Records a set of UTM tags
     * @param {Number} aEmployerId
     * @param {Number} aEmployeeId
     * @param {Number} aUserId
     * @param {String} aUserName
     * @returns {Promise}
     */
    ezSaveUtmTagMap(aEmployerId, aEmployeeId, aUserId, aUserName) {
        let self = ezApi.ezclocker.ezUtmTagMapService;

        let entity = self.ezCreateUtmTagMap(aEmployerId, aEmployeeId, aUserId, aUserName,
            ezApi.ezclocker.ezUrlHelper.getUrlParam(ezApi.ezclocker.ezUtmTagMapService.UTM_TAG_NAMES.UTM_MEDIUM),
            ezApi.ezclocker.ezUrlHelper.getUrlParam(ezApi.ezclocker.ezUtmTagMapService.UTM_TAG_NAMES.UTM_SOURCE),
            ezApi.ezclocker.ezUrlHelper.getUrlParam(ezApi.ezclocker.ezUtmTagMapService.UTM_TAG_NAMES.UTM_CAMPAIGN));

        if (ezApi.ezIsNotValid(entity)) {
            // No need to call, no UTM params were present
            return ezApi.ezResolve();
        }

        return ezApi.ezclocker.http.ezPost(
            self.serviceUri,
            ezApi.ezclocker.ezServices.ezCreateEntityRequestJson(entity),
            'WEBSITE')
            .then(ezApi.ezclocker.ezServices.ezProcessApiResolve, ezApi.ezclocker.ezServices.ezProcessApiReject);
    }
}
EzUtmTagMapService.ezApiName = 'ezUtmTagMapService';

document.addEventListener('onEzApiReady',
    () => ezApi.ezRegisterNewApi(EzUtmTagMapService, EzUtmTagMapService.ezApiName));