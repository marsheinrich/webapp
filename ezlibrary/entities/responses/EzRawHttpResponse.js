import {
    EzObject
} from '/ezlibrary/helpers/EzHelpers.js';

/**
    @class
    @description
    Provides specific properties from jqXHR (if available) to represent the most import information from
    the RAW jqXHR response.
    ---------------------------------------------------------------------
    Import with:
        import { EzRawHttpResponse } from '/ezlibrary/entities/responses/EzRawHttpResponse.js';
    ---------------------------------------------------------------------
    Import with other entities:
        import {
            < ... other entities ...>,
            EzRawHttpResponse
        } from '/ezlibrary/entities/EzEntities.js';
    ---------------------------------------------------------------------
 */
export class EzRawHttpResponse {
    /**
        @public @constructor
        Creates a new instance of EzRawHttpResponse
        @param {undefined|null|object} jqXHR
     */
    constructor(jqXHR) {
        if (EzObject.isValid(jqXHR))  {
            this.responseStatus = jqXHR.status;
            this.responseStatusText = jqXHR.statusText;
            this.responseJson = jqXHR.responseJson;
            this.responseText = jqXHR.responseText;
            this.jqXHR = jqXHR;
        }
    }

    responseStatus = 500;
    responseStatusText = 'error';
    responseJson = {};
    responseText = '(not available)';
}
