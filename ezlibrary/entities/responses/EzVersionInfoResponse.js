/**
    @class
    @description
    Javascript equivlant to Java's /src/main/java/com/ezclocker/services/responses/EzVersionInfoResponse.java class
    Please keep changes to this class and the equivlant java class in sync.
    ---------------------------------------------------------------------------
    Import with:
        import { EzVersionInfoResponse } from '/ezlibrary/entities/responses/EzVersionInfoResponse.js';
    ---------------------------------------------------------------------------
 */
export class EzVersionInfoResponse {
    /**
        @public @field
        Stores the ezclocker.build-environment value from version.properties file.
        @type {string}
     */
    environment;

    /**
        @public @field
        Stores the ezclocker.target-env value from version.properties file.
        @type {string}
     */
    targetEnvironment;

    /**
        @public @field
        Stores the ezclocker.build.version value from version.properties file.
        @type {string}
     */
    version;

    /**
        @public @field
        Stores the ezclocker.build.rc value from version.properties file.
        @type {string}
     */
    build;

    /**
        @public @field
        Stores the ezclocker.build.datetime value from version.properties file.
        @type {string}
     */
    buildDate;

    /**
        @public @field
        Stores the ezclocker.build.branch value from version.properties file.
        NOPTE: Branch data is only available for ROLE_ADMIN or ROLE_EZCLOCKER_SUPPORT
        @type {string}
     */
    branch;
}
