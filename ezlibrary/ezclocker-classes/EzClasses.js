/**
    @module /ezlibrary/ezclocker-classes/EzClasses.js
    @summary
    A module that provides exports for ezClocker Javascript Classes
    Designed to simplify imports lines.
    NOTE: Only included non-deprecated classes in this file!
    @description
    ---------------------------------------------------------------------
    >>> IMPORTANT: <<<
    Only import classes that get used in the module. Do not import ALL
    by default.
    ---------------------------------------------------------------------
    Importing multiple ezClocker classes:
        import {
            EzClass,
            EzStaticClass,
            EzSingletonRequiredDependencyInfo,
            EzSingletonRequiredDependencies,
            EzSingleton
        } from '/ezlibrary/ezclocker-classes/EzClasses.js';
    ---------------------------------------------------------------------
 */


// Non-Deprecated Classes from the /ezlibrary/ezclocker-classes folder


// Non-Deprecated Classes outside of the /ezlibrary/ezclocker-classes folder
export { EzClass } from '/ezlibrary/EzClass.js';
export { EzStaticClass } from '/ezlibrary/EzStaticClass.js';
export {
    EzSingletonRequiredDependencyInfo,
    EzSingletonRequiredDependencies,
    EzSingleton
} from '/ezlibrary/EzSingleton.js';
