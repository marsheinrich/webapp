exports.parse = function(str, opts) {
    return {
        ast: require('@swc/core').parseSync(str.toString(), {})
    };
};
