class EzWizard {
    injectWizardIntoContainer = () => {
        ezApi.ezclocker.ezHttpHelper.httpGet('ez-wizard.html');
    }
}

export {
    EzWizard
}
