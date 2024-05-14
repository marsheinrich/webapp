/**
    Javascript entity for the Location.java
 */
class EzLocationEntity {
    constructor(idOrSourceEntity, employerId, gpsLocationId, timeEntryId, name, building, streetNumber,
        streetNumberOrHouseNumber, streetName, streetOrRoadName, apartmentNumber, villageOrNeighborhood, city,
        stateDistrict, _state, stateOrProvinceOrStateCode, postalCode, county, region, island, country, countryCode,
        continent, phoneNumber, primaryPhoneNumber, altPhoneNumber1, altPhoneNumber2, clockInLocation, clockOutLocation,
        isPrimaryLocation, acceptable, overridden) {
        this.ezTypeName = 'EzLocationEntity';

        this.id = null;
        this.employerId = null;
        this.gpsLocationId = null;
        this.timeEntryId = null;

        this.name = '';
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

        this.clockInLocation = false;
        this.clockOutLocation = false;
        this.isPrimaryLocation = false;
        this.acceptable = true;
        this.overridden = false;

        if (ezApi.ezIsValid(idOrSourceEntity)) {
            if (!ezApi.ezIsNumber(idOrSourceEntity)) {
                this.ezCopyFromEntity(idOrSourceEntity);
            } else {
                ezUpdateFields(
                    idOrSourceEntity,
                    employerId,
                    gpsLocationId,
                    timeEntryId,
                    name,
                    building,
                    streetNumber,
                    streetNumberOrHouseNumber,
                    streetName,
                    streetOrRoadName,
                    apartmentNumber,
                    villageOrNeighborhood,
                    city,
                    stateDistrict,
                    _state,
                    stateOrProvinceOrStateCode,
                    postalCode,
                    county,
                    region,
                    island,
                    country,
                    countryCode,
                    continent,
                    phoneNumber,
                    primaryPhoneNumber,
                    altPhoneNumber1,
                    altPhoneNumber2,
                    clockInLocation,
                    clockOutLocation,
                    isPrimaryLocation,
                    acceptable,
                    overridden);
            }
        }
    }

    /**
        @public
        Copies all matching properties from sourceEntity to this instance.
        @param {Object} sourceEntity
     */
    ezCopyFromEntity(sourceEntity) {
        if (ezApi.ezIsNotValid(sourceEntity)) {
            throw ezApi.ezBadParam('sourceEntity', this.ezTypeName, 'ezCopyFromEntity');
        }
        for (let prop in idOrSourceEntity) {
            if (ezApi.ezHasOwnProperty(this, prop)) {
                this[prop] = idOrSourceEntity[prop];
            }
        }
    }

    /**
        @public
        Reflects the param names and assigns the param's value to the associated property in this instance 
        with the same name as the param.
        @param {Number} id, 
        @param {Number} employerId, 
        @param {Number} gpsLocationId, 
        @param {Number} timeEntryId, 
        @param {String} name, 
        @param {String} building, 
        @param {String} streetNumber, 
        @param {String} streetNumberOrHouseNumber,
        @param {String} streetName, 
        @param {String} streetOrRoadName, 
        @param {String} apartmentNumber, 
        @param {String} villageOrNeighborhood, 
        @param {String} city, 
        @param {String} stateDistrict, 
        @param {String} _state,
        @param {String} stateOrProvinceOrStateCode, 
        @param {String} postalCode, 
        @param {String} county, 
        @param {String} region, 
        @param {String} island, 
        @param {String} country, 
        @param {String} countryCode, 
        @param {String} continent, 
        @param {String} phoneNumber,
        @param {String} primaryPhoneNumber, 
        @param {String} altPhoneNumber1, 
        @param {String} altPhoneNumber2, 
        @param {Boolean} clockInLocation, 
        @param {Boolean} clockOutLocation, 
        @param {Boolean} isPrimaryLocation,
        @param {Boolean} acceptable, 
        @param {Boolean} overridden
     */
    ezUpdateFields(id, employerId, gpsLocationId, timeEntryId, name, building, streetNumber, streetNumberOrHouseNumber,
        streetName, streetOrRoadName, apartmentNumber, villageOrNeighborhood, city, stateDistrict, _state,
        stateOrProvinceOrStateCode, postalCode, county, region, island, country, countryCode, continent, phoneNumber,
        primaryPhoneNumber, altPhoneNumber1, altPhoneNumber2, clockInLocation, clockOutLocation, isPrimaryLocation,
        acceptable, overridden) {

        // Obtain the names of all the params for this function
        let paramNames = ezApi.ezGetFunctionParamNames(this.ezUpdateFields);

        // Using argValues instead of arguments to make sure nothing is optimized out and to keep the two arrays of
        // equal size.
        let argValues = [
            id, employerId, gpsLocationId, timeEntryId, name, building, streetNumber, streetNumberOrHouseNumber,
            streetName, streetOrRoadName, apartmentNumber, villageOrNeighborhood, city, stateDistrict, _state,
            stateOrProvinceOrStateCode, postalCode, county, region, island, country, countryCode, continent, phoneNumber,
            primaryPhoneNumber, altPhoneNumber1, altPhoneNumber2, clockInLocation, clockOutLocation, isPrimaryLocation,
            acceptable, overridden
        ];

        // Sets for the argument types so that specific logic can be used for each type. Note that anything not in
        // the below sets is assumed typed string.
        let numberTypeArgs = new Set(
            ['id', 'employerId', 'gpsLocationId', 'timeEntryId']);
        let booleanTypeArgs = new Set(
            ['clockInLocation', 'clockOutLocation', 'isPrimaryLocation', 'acceptable', 'overridden']);

        // Assign the param values to the matching properties on this instance!
        for (let index = 0; index < argValues.length; index++) {
            let paramName = paramNames[index];
            if (ezApi.ezHasOwnProperty(this, paramNames[index])) {
                if (paramName in numberTypeArgs) {
                    // Number types
                    this[paramNames[index]] = ezApi.ezNumberOrDefault(arguments[index], null);
                } else if (paramName in booleanTypeArgs) {
                    // Boolean types
                    this[paramNames[index]] = ezApi.ezIsTrue(arguments[index]);
                } else {
                    // String types
                    this[paramNames[index]] = ezApi.ezAssignOrDefault(arguments[index], '');
                }
            }
        }
    }
}

export {
    EzLocationEntity
};