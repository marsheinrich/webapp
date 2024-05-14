/**
    @public
    Represents an ezClocker user's role. Used in the EzUserRole enumeration.
 */
class EzClockerRole {
    /**
        @param {string} authorityName
        @param {string} roleName
        @param {array} accessInfo
        @param {boolean} internalOnly
        @param {string} legacyAccountType
        @param {array} enabledPermissions
        @param {array} disabledPermissions
     */
    constructor(authorityName, roleName, accessInfo, internalOnly, legacyAccountType, enabledPermissions,
        disabledPermissions) {

        this.authorityName = ezApi.ezIsString(authorityName)
            ? authorityName
            : '';

        if ('UNKNOWN' !== authorityName) {
            this.roleName = ezApi.ezIsString(roleName)
                ? roleName
                : this.authorityName;
            this.accessInfo = ezApi.ezArrayHasLength(accessInfo)
                ? accessInfo
                : ['No Access'];
            this.internalOnly = ezApi.ezIsTrue(internalOnly);
        } else {
            this.roleName = 'Unknown';
            this.accessInfo = ['No Access'];
            this.internalOnly = false;
        }

        this.legacyAccountType = ezApi.ezIsNotEmptyString(legacyAccountType)
            ? legacyAccountType
            : this.roleName.toLowerCase();

        this.ezDefaultEnabledPermissions = ezApi.ezArrayHasLength(enabledPermissions)
            ? enabledPermissions
            : [];

        this.ezDefaultDisabledPermissions = ezApi.ezArrayHasLength(disabledPermissions)
            ? disabledPermissions
            : [];
    }

    /**
        @public
        Returns the authority name
        @returns {string}
     */
    ezGetAuthorityName() {
        return this.authorityName;
    }

    /**
        @public
        Returns the role name
        @returns {string}
     */
    ezGetRoleName() {
        return this.roleName;
    }

    /**
        @public
        Returns the user role description
        @returns {array}
     */
    ezGetAccessInfo() {
        return this.accessInfo;
    }

    /**
        @public
        Returns if the role is internal use only
        @returns {boolean}
     */
    ezGetInternalOnly() {
        return this.internalOnly;
    }

    /**
        @public
        Returns the legacy account type
        @returns {string}
     */
    ezGetLegacyAccountType() {
        return this.legacyAccountType;
    }

    /**
        @public
        Returns the list of default enabled permissions for the role
        @returns {array}
     */
    ezGetDefaultEnabledPermissions() {
        return this.ezDefaultEnabledPermissions;
    }

    /**
        @public
        Returns the the list of default disabled permissions for the role
        @returns {array}
     */
    ezGetDefaultDisabledPermissions() {
        return this.ezDefaultDisabledPermissions;
    }
}

export {
    EzClockerRole
};