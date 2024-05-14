const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CircularDependencyPlugin = require('circular-dependency-plugin')
const TerserPlugin = require('terser-webpack-plugin');
const path = require('path');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const MomentLocalesPlugin = require('moment-locales-webpack-plugin');
const MomentTimezoneDataPlugin = require('moment-timezone-data-webpack-plugin');

const ROOT_PATH = `${process.cwd()}`;
const WEBAPP_SRC_ROOT_PATH = path.resolve(`${ROOT_PATH}`);

/**
 * Base class for the other EzWebpack* classes
 */
class EzWebpackBase {
    /**
     * Creates a new instance of EzWebpackBase
     */
    constructor(debugMode) {
        this.debug = undefined != debugMode && null != debugMode
            ? debugMode
            : false;
    }

    /**
     * @public
     * Writes the provided msg to the console log
     * @param {string} msg
     */
    debugLog(msg) {
        if (this.debug && msg) {
            console.Log(msg);
        }
    }
}

/**
 * Defines an ezClocker webpack build configuration
 */
class EzWebpackBuildConfiguration extends EzWebpackBase {
    /**
     * Creates a new instance of EzWebpackBuildConfiguration
     * @param {boolean} debugMode
     */
    constructor(debugMode) {
        super(debugMode);

        this.rootPath = ROOT_PATH;
        this.webappSrcRootPath = WEBAPP_SRC_ROOT_PATH;
        this.ezTerserConfigFileName = path.resolve(`${this.webappSrcRootPath}/webpack/terser-config.json`);
        this.bundleFileOutputPath = path.resolve(`${this.webappSrcRootPath}/ezwp/js`);
        /*
            Can be one of the following:
            'none'
            Opts out of any default optimization options

            'development'
            Sets process.env.NODE_ENV on DefinePlugin to value development.
            Enables useful names for modules and chunks.

            'production'
            Sets process.env.NODE_ENV on DefinePlugin to value production.
            Enables deterministic mangled names for modules and chunks, FlagDependencyUsagePlugin,
            FlagIncludedChunksPlugin, ModuleConcatenationPlugin, NoEmitOnErrorsPlugin and TerserPlugin.
         */
        this.webpackMode = 'none';
        this.webpackDevTool = "source-map";
        this.useSwcLoader = true;
        this.minimize = true;
        this.bundleOutputFileNameMask = "ez-[name].bundle";
        this.sourceMapOutputFileNameMask = "ez-[name].bundle";
        this.enableMomentJsSupport = true;
        // this.ignoreMomentLocales = true;
        this.cleanOutputBeforeRun = true;
        this.showProgress = false;
        this.enableCircularDependencyChecking = true;
        this.enableBundleAnalyzer = false;
        this.bundleMomentJs = true;

        if (this.debug) {
            this.debugLog(' ');
            this.debugLog('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~');
            this.debugLog('  ezClocker Webpack Configuration');
            this.debugLog('  ---------------------------------------------');
            this.debugLog(`   ==>  rootPath=${this.rootPath}`);
            this.debugLog(`   ==>  webappSrcRootPath=${this.webappSrcRootPath}`);
            this.debugLog(`   ==>  ezTerserConfigFileName=${this.ezTerserConfigFileName}`);
            this.debugLog(`   ==>  bundleFileOutputPath=${this.bundleFileOutputPath}`);
            this.debugLog(`   ==>  webpackMode=${this.webpackMode}`);
            this.debugLog(`   ==>  webpackDevTool=${this.webpackDevTool}`);
            this.debugLog(`   ==>  useSwcLoader=${this.useSwcLoader}`);
            this.debugLog(`   ==>  minimize=${this.minimize}`);
            this.debugLog(`   ==>  bundleOutputFileNameMask=${this.bundleOutputFileNameMask}`);
            this.debugLog(`   ==>  sourceMapOutputFileNameMask=${this.sourceMapOutputFileNameMask}`);
            this.debugLog(`   ==>  enableMomentJsSupport=${this.enableMomentJsSupport}`);
            // this.debugLog(`   ==>  ignoreMomentLocales=${this.ignoreMomentLocales}`);
            this.debugLog(`   ==>  cleanOutputBeforeRun=${this.cleanOutputBeforeRun}`);
            this.debugLog(`   ==>  showProgress=${this.showProgress}`);
            this.debugLog('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~');
            this.debugLog(' ');
        }
    }
}

/**
 * Provides configurations for webpack loaders
 */
class EzWebpackLoaders extends EzWebpackBase {
    /**
     * @public
     * Gets the SwcLoader webpack configuration object
     * Note: Must configure the SwcLoader by including .swcrc configuration file in the root folder
     * that webpack will run under.
     * More information about the .swcrc configuration file: https://swc.rs/docs/configuration/swcrc
     * @returns {object}
     * {
     *     test: /\.js$/,
     *     exclude: /(node_modules)/,
     *     use: {
     *         loader: 'swc-loader'
     *     }
     * }
     */
    ezGetSwcLoaderConfig() {
        return {
            test: /\.m?js$/,
            exclude: [
                /(node_modules)/,
                /(ezwp)/,
                /(webpack)/,
                /(WEB-INF)/,
                /(META-INF)/,
                /(.swc)/,
                /(.vscode)/
            ],
            use: {
                // `.swcrc` can be used to configure swc
                loader: "swc-loader"
            }
        };
    }

    /**
     * @public
     * Gets the BabelLoader webpack configuration object
     * @returns {object}
     * {
     *     test: /\.(js|jsx)$/,
     *     loader: 'babel-loader',
     * }
     */
    ezGetBabelLoaderConfig() {
        // For options see:
        // https://babeljs.io/docs/en/config-files#project-wide-configuration
        return {
            test: /\.(js|jsx)$/,
            loader: 'babel-loader'
        };
    }
}

class EzWebpackPlugins extends EzWebpackBase {
    /**
     * Creates a new instance of EzWebpackPlugins
     * @param {EzWebpackBuildConfiguration} ezWebpackBuildConfiguration
     */
    constructor(ezWebpackBuildConfiguration) {
        super(ezWebpackBuildConfiguration.debug);

        this.ezWebpackBuildConfiguration = null != ezWebpackBuildConfiguration
            ? ezWebpackBuildConfiguration
            : new EzWebpackBuildConfiguration();
    }

    /**
     * @public
     * Returns the CleanWebpackPlugin configuration to use
     * @returns {string}
     */
    ezGetCleanWebpackPluginConfig() {
        return {
            cleanOnceBeforeBuildPatterns: [
                `${this.ezWebpackBuildConfiguration.outputFileNameMask}.*`
            ]
        }
    }

    /**
     * @public
     * Returns the TerserWebpackPlugin configuration to use
     * @returns {string}
     */
    ezGetTerserPluginConfig() {
        return {
            // Reference: https://webpack.js.org/plugins/terser-webpack-plugin
            test: /\.m?js(\?.*)?$/i, // default, ezclocker
            include: undefined, // default, ezclocker
            exclude: undefined, // default, ezclocker
            parallel: true, // default, exclocker
            minify: TerserPlugin.terserMinify, // default, ezclocker
            extractComments: false, // default, ezclocker
            terserOptions: {
                // Reference: https://terser.org/docs/api-reference.html
                ecma: 5, // default, ezclocker
                parse: { // default, ezclocker
                    bare_returns: false, // default
                    html5_comments: true, // default
                    shebang: true, // default
                },
                keep_classnames: true, // exclocker
                keep_fnames: true, // ezclocker
                ie8: false, // default, ezclocker
                module: true, // default, ezclocker
                nameCache: null, // default, ezclocker
                safari10: false, // default, ezclocker
                toplevel: true, // ezclocker
                compress: { // ezclocker
                    ecma: 5, // default, ezclocker
                    defaults: true, // default, ezclocker
                    arrows: true, // default, ezclocker
                    arguments: false, // default, ezclocker
                    booleans: true, // default, ezclocker
                    collapse_vars: true, // default, ezclocker
                    comparisons: true, // default, ezclocker
                    computed_props: true, // default, ezclocker
                    conditionals: true, // default, ezclocker
                    dead_code: true, // default, ezclocker
                    directives: true, // default, ezclocker
                    drop_console: false, // default, ezclocker
                    drop_debugger: true, // default, ezclocker
                    evaluate: true, // default, ezclocker
                    expression: true, // default, ezclocker
                    global_defs: {}, // default, ezclocker
                    hoist_props: true, // default, ezclocker
                    hoist_vars: false, // default, ezclocker
                    if_return: true, // default, ezclocker
                    inline: true, // default, ezclocker
                    join_vars: true, // default, ezclocker
                    keep_classnames: true, // ezClocker
                    keep_fargs: true, // ezClocker
                    keep_fnames: true, // ezClocker
                    keep_infinity: false, // ezClocker
                    loops: true, // default, ezclockeer
                    module: true, // default, ezclocker
                    negate_iife: true, // default, ezclockeer
                    passes: 1, // default, ezclockeer
                    properties: true, // default, ezclockeer
                    pure_funcs: null, // default, ezclockeer
                    pure_getters: 'strict', // default, ezclockeer
                    reduce_vars: true, // default, ezclockeer
                    sequences: true, // default, ezclockeer
                    side_effects: true, // default, ezclockeer
                    switches: true, // default, ezclockeer
                    toplevel: true, // default, ezclockeer
                    top_retain: [
                        'ezApi',
                        'ezUi'
                    ], // default, ezclockeer
                    typeofs: true, // default, ezclockeer
                    unsafe: false, // default, ezclockeer
                    unsafe_comps: false, // default, ezclockeer
                    unsafe_Function: false, // default, ezclockeer
                    unsafe_math: false, // default, ezclockeer
                    unsafe_symbols: false, // default, ezclockeer
                    unsafe_methods: false, // default, ezclockeer
                    unsafe_proto: false, // default, ezclockeer
                    unsafe_regexp: false, // default, ezclockeer
                    unsafe_undefined: false, // default, ezclockeer
                    unused: true // default, ezclockeer
                },
                /*
                mangle: { // default
                     eval: false, // default
                     keep_classnames: false, // default
                     keep_fnames: false, // default
                     module: false, // default
                     reserved: [], // default
                     toplevel: false, // deafult
                     safari10: false, // default
                     properties: {}
                },
                */
                mangle: false, // ezclocker
                /*
                format: { // default
                    ecma: 5, // default
                    ascii_only: false, // default
                    beautify: false, // default
                    braces: false, // default
                    comments: 'some', // default
                    indent_level: 4, // default
                    indent_start: 0, // default
                    inline_script: true, // default
                    keep_numbers: false, // default
                    keep_quoted_props: false, // default
                    max_line_len: false, // default
                    preamble: null, // default
                    quote_keys: false, // default
                    quote_style: 0, // default
                    preserve_annotations: false, // default
                    safari10: false, // default
                    semicolons: true, // default
                    shebang: true, // default
                    webkit: false, // default
                    wrap_iife: false, // default
                    wrap_func_args: true, // default
                },
                */
                format: null, // ezclocker
                sourceMap: false, // default, ezclocker
            }
        };
    }

    /**
     * @public @method
     * Returns the configuration for the CircularDependencyPlugin
     */
    ezGetCircualDependencyPluginConfig() {
        return {
            // `onStart` is called before the cycle detection starts
            onStart({ compilation }) {
                console.log('start detecting webpack modules cycles');
            },
            // `onDetected` is called for each module that is cyclical
            onDetected({
                module: webpackModuleRecord,
                paths,
                compilation
            }) {
                // `paths` will be an Array of the relative module paths that make up the cycle
                // `module` will be the module record generated by webpack that caused the cycle
                compilation.errors.push(
                    new Error(
                        paths.join(' -> ')));
            },
            // `onEnd` is called before the cycle detection ends
            onEnd({ compilation }) {
                console.log('end detecting webpack modules cycles');
            },
            // exclude detection of files based on a RegExp
            exclude: /node_modules/,
            // include specific files based on a RegExp
            include: /\.(js|jsx)$/,
            // add errors to webpack instead of warnings
            failOnError: true,
            // allow import cycles that include an asyncronous import
            allowAsyncCycles: false,
            // set the current working directory for displaying module paths
            cwd: process.cwd(),
        };
    }

    /**
     * @public @method
     * Initializes the CircularDependencyPlugin
     */
    ezInitCircularDependencyPlugin() {
        return new CircularDependencyPlugin(this.ezGetCircualDependencyPluginConfig());
    }

    /**
     * @public
     * Initialize the TerserWebpackPlugin
     */
    ezInitTerserPlugin() {
        return new TerserPlugin(this.ezGetTerserPluginConfig());
    }

    /**
     * @public @method
     * Initialize the MomentLocalesPlugin
     */
    ezInitMomentLocalesPlugin() {
        return new MomentLocalesPlugin(
            {
                localesToKeep: [
                    'en',
                    'en-ca'],
            }
        );
    }

    /**
     * @public @method
     * Initializes the MomentTimezoneDataPlugin
     */
    ezInitMomentTimezoneDataPlugin() {
        const currentYear = new Date().getFullYear();

        // Or: To strip all locales except “en”, “es-us” and “ru”
        // (“en” is built into Moment and can’t be removed)
        return new MomentTimezoneDataPlugin({
            /**
             * Earliest year to support timezone data for
             */
            startYear: 2013,
            /**
             * Latest year to support time zone data for
             */
            endYear: currentYear + 10,
            /**
             * Only include data for time zones associated with specific countries, as determined by Moment Timezone’s zonesForCountry() API.
             * matchCountries works with ISO 3166 2-letter country codes, and can be any of these types: string, regexp, array
             * Matching all for now
             */
            // matchCountries: [ ... ]
        });
    }

    /*
    ezInitIgnoreMomentLocalsConfig() {
        return new webpack.IgnorePlugin({
            resourceRegExp: /^\.\/locale$/,
            contextRegExp: /moment$/
        });
    }
    */

    /**
     * @public
     * Initialize the webpack progress plugin
     */
    ezInitProgressPlugin() {
        return new webpack.ProgressPlugin();
    }

    /**
     * @public
     * Initialize the ClearnWebpackPlugin
     */
    ezInitCleanOutputPlugin() {
        return new CleanWebpackPlugin(this.ezGetCleanWebpackPluginConfig());
    }

    /**
     * @public @method
     * Initializes the BundleAnalyzer plugin
     * https://github.com/webpack-contrib/webpack-bundle-analyzer
     */
    ezInitBundleAnalyzerPlugin() {
        return new BundleAnalyzerPlugin();
    }
}

/**
 * ezClocker's Webpack Configuration Object
 */
class EzWebpackConfiguration extends EzWebpackBase {
    /**
     * @public
     * Creates a new instance of EzWebpackConfiguration
     * @param {boolean|null|undefined} debugMode
    */
    constructor(debugMode) {
        super(debugMode);

        this.ezWebpackBuildConfiguration = new EzWebpackBuildConfiguration(this.debug);
        this.ezWebpackLoaders = new EzWebpackLoaders(this.debug);
        this.ezWebpackPlugins = new EzWebpackPlugins(this.ezWebpackBuildConfiguration);

        this.ezCurrentConfiguration = {
            entry: {},
            mode: this.ezWebpackBuildConfiguration.webpackMode,
            devtool: this.ezWebpackBuildConfiguration.webpackDevTool,
            output: this.getWebpackConfigOutput(),
            optimization: this.getWebpackConfigOptimization(),
            module: {
                rules: this.getWebpackConfigRules(),
            },
            plugins: this.getWebpackConfigPlugins()
        }
    }

    /**
     * Gets the webpack configuration with the provided entries applied to it.
     * @param {object} entries
     * @return {object}
     * {
     *     entry: { <entriesObject> },
     *     mode: EzWebpackBuildConfiguration.webpackMode,
     *     devtool: EzWebpackBuildConfiguration.webpackDevTool,
     *     output: { <output_configuration_object> }
     *     optimization: { <optimization_configuration_object> }
     *     module: {
     *         rules: [<rules_definitions>]
     *     },
     *     plugins: [<plugin_definitions]
     * }
     */
    ezGetWebpackConfigurationWithEntries(entriesObject) {
        if (null == entriesObject) {
            return this.ezCurrentConfiguration;
        }

        let webpackConfigWithEntries = this.ezCurrentConfiguration;
        webpackConfigWithEntries.entry = entriesObject;

        this.debugLog(`webpackConfigWithEntries=${JSON.stringify(webpackConfigWithEntries, null, 3)}`);
        return webpackConfigWithEntries;
    }

    /**
     * Gets the webpack configuration output object
     * @return {object}
     * {
     *     path: {string}
     *     filename: {string}
     *     sourceMapFilename: {string}
     * }
     */
    getWebpackConfigOutput() {
        return {
            path: this.ezWebpackBuildConfiguration.bundleFileOutputPath,
            filename: `${this.ezWebpackBuildConfiguration.bundleOutputFileNameMask}.js`,
            sourceMapFilename: `${this.ezWebpackBuildConfiguration.sourceMapOutputFileNameMask}.js.map`
        };
    }

    /**
     * Gets the webpack configuration optimization object
     * @return {Object}
     * {
     *     minimize: {boolean},
     *     minimizer: [
     *         {terser_webpack_plugin_configuration}
     *     ]
     * };
     */
    getWebpackConfigOptimization() {
        return {
            minimize: this.ezWebpackBuildConfiguration.minimize,
            minimizer: [
                this.ezWebpackPlugins.ezInitTerserPlugin()
            ]
        };
    }

    /**
     * @public
     * Gets the webpack configuration rules array
     * @returns {array}
     * [
     *     {webpack_configuration_rules}
     * ]
     */
    getWebpackConfigRules() {
        let result = [];
        if (this.ezWebpackBuildConfiguration.useSwcLoader) {
            result.push(this.ezWebpackLoaders.ezGetSwcLoaderConfig());
        } else {
            // Default is babel-loader
            result.push(this.ezWebpackLoaders.ezGetBabelLoaderConfig());
        }

        // SCSS Converter
        result.push(this.ezGetWebpackCssConfig());
        // Url loader for images
        //result.push(this.ezGetWebpacksUrlLoaderConfig());
        return result;
    }

    /**
     * @public
     * Gets the webpack css configuration object
     * @returns {object}
     * {
     *     test: /^.+\.[sc][acs][s]+/i,
     *     use: [
     *         {
     *             loader: "style-loader"
     *         },
     *         {
     *             loader: "css-loader",
     *             options: {
     *                 url: false
     *             }
     *         },
     *         {
     *             loader: "sass-loader",
     *         }
     *     ],
     * }
     */
    ezGetWebpackCssConfig() {
        return {
            test: /^.+\.(css)$|^.+\.(sass)|^.+\.(scss)$/i,
            use: [
                {
                    // Creates `style` nodes from JS strings
                    loader: "style-loader"
                },
                {
                    // Translates CSS into CommonJS
                    loader: "css-loader",
                    options: {
                        url: false
                    }
                },
                // Compiles Sass to CSS
                {
                    loader: "sass-loader",
                }
            ],
        };
    }

    /**
     * @public
     * Gets the webpack url loader configuration object
     * @returns {object}
     * {
     *     test: /\.(png|jpg)$/,
     *     use: [
     *         {
     *             loader: 'url-loader',
     *             options: {
     *                 encoding: true
     *             }
     *         }
     *     ]
     * }
     */
    ezGetWebpacksUrlLoaderConfig() {
        return {
            test: /\.(png|jpg)$/,
            use: [
                {
                    loader: 'url-loader',
                    options: {
                        encoding: true
                    }
                }
            ]
        };
    }

    /**
     * @public
     * Gets the webpack configuration plugins array
     * @returns {array}
     */
    getWebpackConfigPlugins() {
        let result = [];

        if (this.ezWebpackBuildConfiguration.enableCircularDependencyChecking) {
            result.push(
                this.ezWebpackPlugins.ezInitCircularDependencyPlugin());
        }

        /*if (this.ezWebpackBuildConfiguration.ignoreMomentLocales) {
            result.push(
                this.ezWebpackPlugins.ezInitIgnoreMomentLocalsConfig());
        }*/

        if (this.ezWebpackBuildConfiguration.showProgress) {
            result.push(
                this.ezWebpackPlugins.ezInitProgressPlugin());
        }

        if (this.ezWebpackBuildConfiguration.cleanOutputBeforeRun) {
            result.push(
                this.ezWebpackPlugins.ezInitCleanOutputPlugin());
        }

        if (this.ezWebpackBuildConfiguration.enableBundleAnalyzer) {
            result.push(
                this.ezWebpackPlugins.ezInitBundleAnalyzerPlugin());
        }

        if (this.ezWebpackBuildConfiguration.enableMomentJsSupport) {
            result.push(
                this.ezWebpackPlugins.ezInitMomentLocalesPlugin());

            result.push(
                this.ezWebpackPlugins.ezInitMomentTimezoneDataPlugin());
        }

        return result;
    }
}

const ezWebpackConfiguration = new EzWebpackConfiguration(false);

module.exports = ezWebpackConfiguration;
