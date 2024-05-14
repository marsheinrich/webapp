export const EzString = {
    hasLength: jest.fn(
        str => str && str.length > 0),
    trimOrEmpty: jest.fn(
        aString => EzString.isString(aString)
            ? aString.trim()
            : ''),
    isString: jest.fn(
        aValue => undefined !== aValue &&
            null !== aValue &&
            ('string' === typeof aValue || '[object String]' === Object.prototype.toString.call(aValue)))
};
