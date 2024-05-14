/**
    Included in: /ezwp/js/ez-schedule-locations-dialog.bundle.js
 */

/**
    Import with:
        import { EzLocation } from '/secure/widgets/EzScheduleLocationsDialog/EzLocation.js';
 */
class EzLocation {
    /**
        @public @constructor
        @param {Number} employerId
        @param {String} locationName
     */
    constructor(employerId, locationName) {
        this.employerId = ezApi.ezIsNumber(employerId)
            ? employerId
            : null;
        this.name = ezApi.ezIsNotEmptyString(locationName)
            ? locationName
            : 'New Location';

        this.building = '';

        this.streetNumber = '';
        this.streetNumberOrHouseNumber = '';
        this.streetName = '';
        this.streetOrRoadName = '';
        this.apartmentNumber = '';
        this.villageOrNeighborhood = '';
        this.city = '';
        this.stateDistrict = '';
        this._state = '';
        this.stateOrProvinceOrStateCode = '';
        this.postalCode = '';
        this.county = '';
        this.region = '';
        this.island = '';
        this.country = '';
        this.countryCode = '';
        this.continent = '';
        this.phoneNumber = '';
        this.primaryPhoneNumber = '';
        this.altPhoneNumber1 = '';
        this.altPhoneNumber2 = '';

        this.timeEntryId = null;
        this.gpsLocationId = null;
        this.clockInLocation = false;
        this.clockOutLocation = false;
        this.isPrimary = false;
        this.overridden = false;
        this.acceptable = true;
    }
}

export {
    EzLocation
};