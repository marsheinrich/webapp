/**
 * @class
 * @description
 * EzDateTime is a class that abstracts access to date time library methods and date time instance objects allowing for easy swapping of date time
 * implementations.
 */
export class EzDateTime {
    #ezInternalMoment = moment();
}