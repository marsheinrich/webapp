import {
    EzString,
    EzJson
} from '/ezlibrary/helpers/EzHelpers.js';

/**
    @public @class {EzString} extends {EzStaticClass}
    @description
    Javascript equivalent to the Java EzClockerVersionInfo.java
    Please keep changes in sync between this class and the Java equivalent:
    /src/main/java/com/ezclocker/utility/EzClockerVersionInfo.java
    >>> WOOT: Does not require EzApi <<<
    ---------------------------------------------------------------------------
    Import with:
        import { EzClockerVersionInfo } from '/ezlibrary/entities/EzClockerVersionInfo.js';
    ---------------------------------------------------------------------------
 */
export class EzClockerVersionInfo {
    /**
        @public @constructor
        Creates a new instance of EzClockerVersionInfo
        @param {string} ezClockerVersionInfoJson
     */
    constructor(ezClockerVersionInfoJson) {
        if (EzString.stringHasLength(ezClockerVersionInfoJson)) {
            let versionInfo = EzJson.fromJson(ezClockerVersionInfoJson);

            this.websiteVersion = EzString.stringOrDefault(versionInfo.websiteVersion, 'r72-3');

            this.servicesVersion = EzString.stringOrEmpty(versionInfo.servicesVersion);

            this.version = EzString.stringOrEmpty(versionInfo.version);

            this.build = EzString.stringOrEmpty(versionInfo.build);

            this.ezClockerEnvironment = EzString.stringOrEmpty(versionInfo.ezClockerEnvironment);

            this.ezClockerEnv = EzString.stringOrEmpty(versionInfo.ezClockerEnv);

            this.buildDate = EzString.stringOrEmpty(versionInfo.buildDate);

            this.branch = EzString.stringOrEmpty(versionInfo.branch);
        }
    }

    /**
        @public @field
        Stores the ezclocker.website.version value from version.properties file
        @type {string}
     */
    websiteVersion = 'r72-3';

    /**
        @public @field
        Stores the ezclocker.services.version value from version.properties file
        @type {string}
     */
    servicesVersion = EzString.EMPTY;

    /**
        @public @field
        Stores the ezclocker.build.version value from version.properties file
        @type {string}
     */
    version = EzString.EMPTY;

    /**
        @public @field
        Stores the ezclocker.build.rc value from version.properties file
        @type {string}
     */
    build = EzString.EMPTY;

    /**
        @public @field
        Stores the ezclocker.build-environment value from version.properties file
        @type {string}
     */
    ezClockerEnvironment = EzString.EMPTY;

    /**
        @public @field
        Stores the ezclocker.target-env value from version.properties file
        @type {string}
     */
    ezClockerEnv = EzString.EMPTY;

    /**
        @public @field
        Stores the ezclocker.build.datetime value from version.properties file
        @type {string}
     */
    buildDate = EzString.EMPTY;

    /**
        @public @field
        Stores the ezclocker.build.branch value from version.properties file
        NOTE: Branch is only available for ROLE_ADMIN or ROLE_EZCLOCKER_SUPPORT
        @type {string}
     */
    branch = EzString.EMPTY;
}
