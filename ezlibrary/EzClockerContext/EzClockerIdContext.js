import { EzUserRole } from '/ezlibrary/EzUserRole.js';

class EzClockerIdContext {
    /**
        @public
        Creates a new instance of EzClockerIdContext
        @param {number} authenticatedUserId
        @param {number} activeEmployerId
        @param {number} activeManagerId
        @param {number} activeEmployeeId
        @param {number} activePersonalId
        @param {number} activePayrollManagerId
     */
    constructor(authenticatedUserId, activeEmployerId, activeManagerId, activeEmployeeId, activePersonalId,
        activePayrollManagerId) {

        if (!authenticatedUserId) {
            this.ezLoadIdsFromEzClockerContext();
            return;
        }

        // Set from the provided params.
        this.authenticatedUserId = ezApi.ezIsNumber(authenticatedUserId)
            ? authenticatedUserId
            : null;

        this.activeEmployerId = ezApi.ezIsNumber(activeEmployerId)
            ? activeEmployerId
            : null;

        this.activePayrollManagerId = ezApi.ezIsNumber(activePayrollManagerId)
            ? activePayrollManagerId
            : null;

        this.activeManagerId = ezApi.ezIsNumber(activeManagerId)
            ? activeManagerId
            : null;

        this.activeEmployeeId = ezApi.ezIsNumber(activeEmployeeId)
            ? activeEmployeeId
            : null;

        this.activePersonalId = ezApi.ezIsNumber(activePersonalId)
            ? activePersonalId
            : null;
    }

    /** @public */
    activeEmployerId = null;

    /** @public */
    activePayrollManagerId = null;

    /** @public */
    activeManagerId = null;

    /** @public */
    activeEmployeeId = null;

    /** @public */
    activePersonalId = null;

    /**
        @public
        Sets ids based on what is loaded in the EzClockerContext
        @param {object|undefined|null} selectedEmployee
     */
    ezLoadIdsFromEzClockerContext(selectedEmployee) {
        // Load from ezClocker Context
        if (ezApi.ezIsValid(ezApi.ezclocker.ezClockerContext.ezGetUserContext())) {
            this.authenticatedUserId = ezApi.ezclocker.ezClockerContext.ezGetUserContext().userAccount.id;
        }

        if (null != this.authenticatedUserId) {
            if (ezApi.ezIsValid(ezApi.ezclocker.ezClockerContext.ezGetActiveEmployer())) {
                this.activeEmployerId = ezApi.ezclocker.ezClockerContext.ezGetActiveEmployer().id;
            }

            let aEmployee = ezApi.ezIsValid(selectedEmployee)
                ? selectedEmployee
                : ezApi.ezIsValid(ezApi.ezclocker.ezClockerContext.ezGetActiveEmployee());
            if (ezApi.ezIsValid(aEmployee)) {
                if (aEmployee.isPersonalAccount) {
                    this.activePersonalId = aEmployee.id;
                } else if (EzUserRole.ROLE_MANAGER === aEmployee.primaryRole) {
                    this.activeManagerId = aEmployee.id;
                } else if (EzUserRole.ROLE_PAYROLL_MANAGER === aEmployee.primaryRole) {
                    this.activePayrollManagerId = aEmployee.id;
                }

                this.activeEmployeeId = aEmployee.id;
            }
        }
    }

    /**
        @public
        Returns the authenticated user id
        @returns {number}
     */
    ezGetAuthenticatedUserId() {
        return this.authenticatedUserId;
    }

    /**
        @public
        Returns the active employer account id
        @returns {number}
     */
    ezGetActiveEmployerId() {
        return this.activeEmployerId;
    }

    /**
        @public
        Returns the active payroll manager account id
        @returns {number}
     */
    ezGetActivePayrollManagerId() {
        return this.activePayrollManagerId;
    }

    /**
        @public
        Returns the active menager account id
        @returns {number}
     */
    ezGetActiveManagerId() {
        return this.activeManagerId;
    }

    /**
        @public
        Returns the employee account id
        @returns {number}
     */
    ezGetActiveEmployeeId() {
        return this.activeEmployeeId;
    }

    /**
        @public
        Returns the active personal account id
        @returns {number}
     */
    ezGetActivePersonalId() {
        return this.activePersonalId;
    }
}

export {
    EzClockerIdContext
};
