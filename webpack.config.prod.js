const path = require('path');
const webpack = require('webpack');

module.exports = {
    target: 'node',
    entry: [
        './sdk/MoneyFitRecommendationsServiceSDK.js'
    ],
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'MoneyFitRecommendationsServiceSDK.js',
        libraryTarget: 'umd',
        library: 'MoneyFitRecommendationsServiceSDK'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: [/(node_modules)/],
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env']
                    }
                }
            }
        ]
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
                drop_console: false,
            }
        })
    ]
};
