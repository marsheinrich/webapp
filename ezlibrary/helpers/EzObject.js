import {
    EzBadParamException
} from '/ezlibrary/exceptions/EzExceptions.js';

import { EzStaticClass } from '/ezlibrary/EzStaticClass.js';

/*
    ---------------------------------------------------------------------------
    !! DO NOT IMPORT THE FOLLOWING INTO THIS CLASS !!
    ---------------------------------------------------------------------------
    import { EzApi } from '/public/common/javascript/ezapi.js';
    import { EzUI } from '/public/common/javascript/ezui.js';
    import { ezUI } from '/public/common/javascript/ezui.js';
    import { EzBoolean } from '/ezlibrary/helpers/EzBoolean.js';
    import { EzNumber } from '/ezlibrary/helpers/EzNumber.js';
    import { EzFloat } from '/ezlibrary/helpers/EzFloat.js';
    import { EzString } from '/ezlibrary/helpers/EzString.js';
    import { EzArray } from '/ezlibrary/helpers/EzArray.js';
    import { EzHtml } from '/ezlibrary/helpers/EzHtml.js';
    import { EzFunction } from '/ezlibrary/helpers/EzFunction.js';
    import { EzJson } from '/ezlibrary/helpers/EzJson.js';
    import { EzConsole } from '/ezlibrary/helpers/EzConsole.js';
    import { EzAsync } from '/ezlibrary/helpers/EzAsync.js';
    import { EzPromise } from '/ezlibrary/helpers/EzPromise.js';
    import { EzUrl } from '/ezlibrary/helpers/EzUrl.js';
    ---------------------------------------------------------------------------
*/

/**
 * @class
 * @extends {EzStaticClass}
 * @description
 * Static class that provides utility methods and properties for Objects
 * >>> WOOT: Does not require EzApi <<<
 * ---------------------------------------------------------------------------
 * Import with:
 *     import { EzObject } from '/ezlibrary/helpers/EzObject.js';
 * ---------------------------------------------------------------------------
 */
export class EzObject extends EzStaticClass {
    /**
     * @static
     * @public @readonly @property
     * Returns an empty object
     * @returns {object}
     */
    static get EMPTY() {
        return new Object();
    }

    /**
     * @static
     * @public @method
     * Determines if the instance associated with the provided ezApiName class is registered with
     * ezApi and available for use.
     * @param {undefined|null|object|string} classRefOrEzApiName
     * A class reference with a static ezApiName property OR the string ezApiName value of a class.
     * @returns {boolean}
     */
    static isAvailableFromEzApi(classRefOrEzApiName) {
        if (!globalThis?.ezApi?.ezclocker) {
            throw new EzBadStateException(
                'Expecting a valid, not undefined, not null globalThis.ezApi.ezclocker reference.',
                'However, either globalThis.ezApi or globalThis.ezApi.ezclocker is not yet available.',
                EzObject,
                EzObject.isAvailableFromEzApi);
        }

        if (undefined === classRefOrEzApiName || null === classRefOrEzApiName) {
            return false;
        }

        let ezApiName = 'string' === typeof classRefOrEzApiName
            ? classRefOrEzApiName
            : classRefOrEzApiName?.ezApiName;

        return undefined !== ezApiName && null !== ezApiName && 0 !== ezApiName.length
            ? globalThis.ezApi.ezclocker?.[ezApiName]?.ready
            : false;
    }

    /**
     * @static
     * @public @method
     * Returns type information from Object.prototype.toString.call(aObject);
     * Result format
     * [object {type}]
     * @param {*} aObject
     * @returns {string}
     */
    static getObjectType(clazzNameOrClazz) {
        if (!EzObject.isValid(clazzNameOrClazz)) {
            throw new EzBadParamException(
                'clazzNameOrClazz',
                EzObject,
                EzObject.getObjectType);
        }

        if ('string' === typeof clazzNameOrClazz) {
            return clazzNameOrClazz;
        }

        return Object.prototype.toString.call(clazzNameOrClazz);
    }

    /**
     * @static
     * @public @method
     * Returns the name of the class that the provided value was constructed from.
     * If the value is undefined then undefined is returned.
     * If the value is null then null is returned.
     * If the value has a constructor then the constructor name is returned.
     * Otherwise, the Object.prototype.toString() is returned.
     * @param {object} value
     * @returns {string}
     */
    static getClassName(clazz) {
        if (!clazz) {
            throw new EzBadParamException(
                'clazz',
                EzObject,
                EzObject.getClassName);
        }

        if (clazz?.constructor) {
            return 'Function' === clazz.constructor.name && clazz?.name
                ? clazz?.name
                : clazz.constructor.name;
        }

        return EzObject.getObjectType(clazz);
    }

    /**
     * @static
     * @public @method
     * Attempts to determine if the provided instance was created from a class named clazzName.
     * In the case of instances that return as 'Function' or '[object Function'] a warning
     * is displayed indicating that the expectedClassNameOrInstance might not match.
     * @param {object} instance
     * @param {object|string} expectedClassNameOrInstance
     * The name of the expected class or an instance of the expected class object.
     * @param {undefined|null|boolean} ignoreCase
     * Defualt: false
     */
    static isInstanceOfClassName(instance, expectedClassNameOrInstance, ignoreCase = false) {
        if (!EzObject.isValid(expectedClassNameOrInstance)) {
            throw new EzBadParamException(
                'expectedClassNameOrInstance',
                EzObject,
                EzObject.isInstanceOfClassName);
        }

        let clazzName = 'string' === typeof expectedClassNameOrInstance
            ? expectedClassNameOrInstance
            : EzObject.getClassName(expectedClassNameOrInstance);

        if (0 == clazzName.length) {
            throw new EzBadParamException(
                'expectedClassNameOrInstance',
                EzObject,
                EzObject.isInstanceOfClassName);
        }

        if (!EzObject.isValid(instance)) {
            console.error(
                'Call to EzObject.isInstanceOfClassName(...) returning false due to a failure to ' +
                'properly determine the class name of the provided instance. ' +
                `[Provided class name: ${clazzName}]` +
                `[Provided Instance toString: ${instance.toString()}] ` +
                `[Provided Instance JSON.stringify: JSON.stringify(instance))]` +
                `[Compare would ignore class name character case: ${ignoreCase}]`);

            return false;
        }

        let objectTypeName = EzObject.getObjectType(instance);

        let instanceClassName = 0 != instance.length
            ? EzObject.getClassName(instance)
            : '';

        if (0 == instanceClassName.length) {
            console.error(
                'Call to EzObject.isInstanceOfClassName(...) returning false due to a failure to ' +
                'properly determine the class name of the provided instance. ' +
                `[Provided class name: ${clazzName}]` +
                `[Provided Instance toString: ${instance.toString()}] ` +
                `[Provided Instance JSON.stringify: JSON.stringify(instance))]` +
                `[Compare would ignore class name character case: ${ignoreCase}]`);

            return false;
        }

        if ('function' === objectTypeName.toLowerCase() || '[object function]' === objectTypeName.toLowerCase()) {
            console.warn(
                'Call to EzObject.isInstanceOfClassName(...) could possibly return an incorrect result due to detecting ' +
                `the provided instance only as ${instanceClassName}. ` +
                `[Provided class name: ${clazzName}]` +
                `[Instance toString: ${instance.toString()}] ` +
                `[Instance JSON.stringify: JSON.stringify(instance))]` +
                `[Compare would ignore class name character case: ${ignoreCase}]`);
        }

        return ignoreCase
            ? clazzName.toUpperCase() === instanceClassName.toUpperCase()
            : clazzName === instanceClassName;
    }

    /**
     * @static
     * @public @method
     * Returns the provided object if the object is NOT undefined or null.
     * Returns the provdied defaultObject otherwise.
     * @param {*} aObject
     * @param {*} defaultObject
     */
    static assignOrDefault(aObject, defaultObject) {
        return EzObject.isValid(aObject)
            ? aObject
            : defaultObject;
    }

    /**
     * @static
     * @public @method
     * Returns the object if it is not undefined or null. Otherwise, returns undefined.
     * @param {undefined|null|object} aObject
     * @returns {undefined|object}
     */
    static assignOrUndefined(aObject) {
        return EzObject.assignOrDefault(aObject, undefined);
    }

    /**
     * @static
     * @public @method
     * Returns the provided object if the object is not undefined or null.
     * Returns null otherwise.
     * @param {*} aObject
     * @returns {null|*}
     */
    static assignOrNull(aObject) {
        return EzObject.isValid(aObject)
            ? aObject
            : null;
    }

    /**
     * @static
     * @public @method
     * Returns the provided object if the object is not undefined or null, otherwise,
     * returns an empty object.
     * @param {*} item
     * @returns {object}
     */
    static assignOrEmpty(aObject) {
        return EzObject.isValid(aObject)
            ? aObject
            : EzObject.EMPTY;
    }

    /**
     * @static
     * @public @method
     * Determines if the provided item is an object type.
     * @param {*} aObject
     * @returns {boolean}
     */
    static isObject(aObject) {
        return undefined !== aObject && null !== aObject && 'object' === typeof aObject;
    }

    /**
     * @static
     * @public @method
     * Determiens if the provided item is not null AND not 'undefined'.
     * @param {*} aObject
     * @returns {boolean}
     */
    static isValid(aObject) {
        return 'undefined' !== typeof aObject &&
            undefined !== aObject &&
            null !== aObject;
    }

    /**
     * @static
     * @public @method
     * Evaluates all the provided arguments (if any) to be valid
     * @returns {boolean}
     */
    static allValid() {
        for (let aIndex in arguments) {
            if (!EzObject.isValid(arguments[aIndex])) {
                return false;
            }
        }
        return true;
    }

    /**
     * @static
     * @public @method
     * Determines if any of the passed arguments are not valid
     * @returns {boolean}
     */
    static anyNotValid() {
        for (let aIndex in arguments) {
            if (!EzObject.isValid(arguments[aIndex])) {
                return true;
            }
        }
        return false;
    }

    /**
     * @static
     * @public @method
     * Determines if the provided value is a type of the provided type string.
     * @param {undefined|null|object} value
     * @param {string} typeName
     */
    static isTypeOf(value, typeName) {
        if (!EzObject.isValid(typeName) || 'string' !== typeof typeName) {
            throw new EzBadParamException(
                'typeName',
                EzObject,
                EzObject.isTypeOf);
        }

        return typeName === typeof value;
    }

    /**
     * @static
     * @public @method
     * Determines if the provided object has a direct property propertyName.
     * Returns false if the object is undefined or null.
     * Returns false if the property is inherited.
     * To check direct AND inherited properties, use EzObject.hasProperty()
     * @param {object} aObject
     * @param {string} propertyName
     * @returns {boolean}
     */
    static hasOwnProperty(aObject, propertyName) {
        if (!EzObject.isValid(aObject)) {
            throw new EzBadParamException(
                'aObject',
                EzObject,
                EzObject.hasOwnProperty);
        }
        if (!EzObject.isValid(propertyName) || !EzObject.isTypeOf(propertyName, 'string') || 0 == propertyName.length) {
            throw new EzBadParamException(
                'propertyName',
                EzObject.ezTypeName,
                'ezHasOwnProperty(objectRef, propertyName)');
        }

        return Object.hasOwn(aObject, propertyName);
    }

    /**
     * @static
     * @public @method
     * Determines if the object has a property propertyName. Returns null if the objectRef is false, the
     * @param {object} aObject
     * @param {string} propertyName
     * @returns {boolean}
     */
    static hasProperty(aObject, propertyName) {
        if (!EzObject.isValid(aObject)) {
            throw new EzBadParamException(
                'aObject',
                EzObject,
                EzObject.hasOwnProperty);
        }
        if (!EzObject.isValid(propertyName) || !EzObject.isTypeOf(propertyName, 'string') || 0 == propertyName.length) {
            throw new EzBadParamException(
                'propertyName',
                EzObject,
                'ezHasOwnProperty(objectRef, propertyName)');
        }

        return propertyName in aObject;
    }

    /**
     * @static
     * @public @method
     * Clones the properties from aObjectToClone into a new object by stringifying the object to json
     * and then parsing the JSON string back into an object.
     * In some cases, stringifying the object might fail. If this happens, then the normal 'clone' is
     * called which will use Javascript's structuredClone(...) method.
     * @param {undefined|null|aObjectToClone}
     * @returns {object}
     */
    static cloneProperties(aObjectToClone) {
        if (!EzObject.isValid(aObjectToClone)) {
            return null;
        }

        try {
            return JSON.parse(
                JSON.stringify(aObjectToClone));
        } catch (err) {
            console.warn(
                'Failed to clone the properties of an object using JSON.stringify and JSON.parse ' +
                `due to the following error: ${err.message}` +
                ' Retrying with EzObject.clone(...) which will leverage Javascript\'s structedClode(..) to perform the clone.');

            return EzObject.cone(aObjectToClone);
        }
    }

    /**
     * @static
     * @public @method
     * Executes a deep clone of an object
     * @param {object} objectToClone
     * @returns {object}
     */
    static clone(aObjectToClone) {
        if (!EzObject.isValid(aObjectToClone)) {
            return null;
        }

        try {
            return structuredClone(aObjectToClone);
        } catch (err) {
            console.warn(
                `Failed to clone object with Javascript's structuredClone(...) method due to the following error: ${err.message}`);
        }
    }
}
