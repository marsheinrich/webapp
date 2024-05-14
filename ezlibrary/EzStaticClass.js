import { EzStaticClassException } from '/ezlibrary/exceptions/EzExceptions.js';

/**
 * @public
 * @class {EzStaticClass}
 * @description
 * A bas class that prevents creation of new instances for classes that extend EzStatClass.
 * ---------------------------------------------------------------------------
 * Import with:
 *     import { EzStaticClass } from '/ezlibrary/EzStaticClass.js';
 * ---------------------------------------------------------------------
 * Import with other ezClocker JS classes:
 *      import {
 *         EzClass,
 *         ... other supported classes ...
 *     } from ''/ezlibrary/ezclocker-classes/EzClasses.js';
 * ---------------------------------------------------------------------
 */
export class EzStaticClass {
    /**
     * @protected
     * @constructor
     * >> DO NOT CREATE NEW INSTANCES <<
     * Never create a new instance of a class that extends EzStaticClass
     * Creating a new instance will throw EzStaticClassException
     * Only use static properties, fields, and methods available from the class.
     */
    constructor() {
        throw new EzStaticClassException(this);
    }

    /**
     * @public @readonly @property
     * Returns true to indicate the class is a EzStaticClass
     * @returns {boolean}
     */
    get isEzStaticClass() {
        return true;
    }
}
