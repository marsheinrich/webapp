/**
    EzClocker Public Api Client for Javascript
    Defines ezClocker entities and provides
    access to ezClocker's public api
 */
export class EzClockerApiClient {
    /**
        @public @constructor
        Creates a new instance of EzClockerApiClient
        @param {String} apiKey
        @param {String} developerToken
     */
    constructor(apiKey, developerToken) {
        if (undefined == apiKey ||
            null == apiKey ||
            'string' !== typeof apiKey ||
            0 == apiKey.length()) {
            throw new Error('A valid apiKey param is required in call to new EzClockerApiClient()');
        }
        if (undefined == developerToken ||
            null == developerToken ||
            'string' !== typeof developerToken ||
            0 == developerToken.length()) {
            throw new Error('A valid apiKey param is required in call to new EzClockerApiClient()');
        }

        this.#ezDeveloperToken = developerToken;
        this.#ezApiKey = apiKey;
    }

    #ezDeveloperToken = null;
    get ezDeveloperToken() {
        return this.#ezDeveloperToken;
    }

    #ezApiKey = null;
    get ezApiKey() {
        return this.#ezApiKey;
    }

}