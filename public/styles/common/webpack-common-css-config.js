//const webp    ack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const {
    CleanWebpackPlugin
} = require('clean-webpack-plugin');
const path = require('path');


const ezWebpackConfig = {
    webpackTargetMode: 'none'
};


const baseOutPath = '../../';
const outPathJS = baseOutPath + 'ezwp/js/';

// Source Paths
const baseSourcePath = './';

const publicPath = baseSourcePath + 'public/';

const ezCommonCss = {
    mode: ezWebpackConfig.webpackTargetMode,
    devtool: 'source-map',
    entry: {
        'ez-legacy-2015-styles': [
            publicPath + 'styles/common/ezclocker-base2015.css',
            publicPath + 'styles/common/ezclocker-page-layout.css',
            publicPath + 'styles/common/ezclocker-buttons.css',
            publicPath + 'styles/common/ezclocker-common.css',
            publicPath + 'styles/common/ezclocker-dialogs.css',
            publicPath + 'styles/common/ezclocker-editors.css',
            publicPath + 'styles/common/ezclocker-header.css',
            publicPath + 'styles/common/ezclocker-loader.css',
            publicPath + 'styles/common/ezclocker-maincontent.css',
            publicPath + 'styles/common/ezclocker-menu.css'
        ],
        'ez-common-styles': [
            publicPath + 'styles/common/ez-body.css',
            publicPath + 'styles/common/ezclocker-spinner.css',
            publicPath + 'styles/common/ez-layout-grid.css',
            publicPath + 'styles/common/ez-shadows.css',
            publicPath + 'styles/common/ez-borders.css',
            publicPath + 'styles/common/ez-text.css',
            publicPath + 'styles/common/ez-containers.css',
            publicPath + 'styles/common/ez-buttons.css',
            publicPath + 'styles/common/ez-inputs.css',
            publicPath + 'styles/common/ez-header.css',
            publicPath + 'styles/common/ez-dialogs.css'
        ],
        'ez-employee-signup-styles': [
            publicPath + 'styles/employeeSignup/employeeSignup.css'
        ],
        'ez-password-reset-styles': [
            publicPath + 'styles/passwordReset/passwordReset.css'
        ],
        'ez-sign-in-styles': [
            publicPath + 'styles/signin/signin.css'
        ],
        'ezm-accept-invite-styles': [
             publicPath + 'styles/signup/sighnup.css'
        ],
        'ez-accept-invite-styles': [
            publicPath + 'styles/signup/sighnup.css'
        ],
        'ez-sign-up-styles': [
            publicPath + 'styles/signup/sighnup.css'
        ],
        'ez-wizard-styles': [
            publicPath + 'webcomponents/ez-wizard/ez-wizard.css',
            publicPath + 'webcomponents/ez-wizard/ez-wizard-common.css',
        ],
        'ez-toggle-switch-styles': [
            publicPath + 'webcomponents/toggle-switch/EzToggleSwitch.css',
            publicPath + 'webcomponents/toggle-switch/ez-toggle-switch.css'
        ],
        'ez-header-styles': [
            publicPath + 'widgets/EzHeader/ez-header.css',
        ]
    },
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            url: false,
                        }
                    }
                ]
            }
        ],
    },
    //optimization: {
    //    minimize: true,
    //    minimizer: [
    //        new CssMinimizerPlugin({
    //            test: /\.css$/i,
    //            cache: false
    //        }),
    //    ],
    //},
    plugins: [
        // new webpack.ProgressPlugin(),
        // output extracted CSS to a file
        new MiniCssExtractPlugin({
            filename: '[name].bundle.css'
        })
    ]
};

module.exports = [
    // CSS Bundle Experiment
    ezCommonCss
];