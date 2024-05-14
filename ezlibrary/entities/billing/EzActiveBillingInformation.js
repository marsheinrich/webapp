/**
    Import with:
        import { EzActiveBillingInformation } from '/ezlibrary/entities/billing/EzActiveBillingInformation.js';
 */
export class EzActiveBillingInformation {
    ready =  false;
    companyName =  '';
    billingFirstName =  '';
    billingLastName =  '';
    billingEmail =  '';
    billingStreetAddress =  '';
    additionalAddress =  '';
    city =  '';
    billingState =  '';
    postalCode =  '';
    country =  '';
    billingContactNumber =  null;
    billingAmount =  '0;00';
    lastBillingDate =  null;
    nextBillingDate =  null;
    startDate =  null;
    endDate =  null;
    pastDue =  false;
    canceled =  false;
    braintreeDiscounts =  [];
    discountId =  null;
}