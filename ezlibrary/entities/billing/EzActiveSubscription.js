/**
    Import with:
        import { EzActiveSubscription } from '/ezlibrary/entities/billing/EzActiveSubscription.js';
 */
class EzActiveSubscription {
    ready = false;

    id = 19;
    name= 'free';
    planId= 'ez2018.monthly.ezclocker.free';
    andriodPlanName= 'ez2018.monthly.ezclocker.free';
    applePlanName= 'com.eznovatech.ezclocker.ezClocker.free';
    brainTreePlanName= 'ez2018-monthly-ezclocker-free';
    description= 'Free Plan';
    detail= '';
    bulletPointsJson= {
        items: [
            'Always Free',
            'One Employee',
            'Website and mobile access'
        ]
    };
    maximumEmployees= 1;
    features= [];
    enabled= true;
    isFreePlan= true;
    apiAccess= false;
    dailyFee= 0;
    monthlyFee= 0;
    yearlyFee= 0;
    appleStoreFee= 0;
    googlePlayStoreFee= 0;
    cashDiscount= 0;
    percentDiscount= 0;
    planLevel= 6;
    planIteration= 2;
    internalNotes= '';
}

export {
    EzActiveSubscription
};