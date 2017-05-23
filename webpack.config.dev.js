const path = require('path');
const webpack = require('webpack');

module.exports = {
    target: 'node',
    entry: [
        './sdk/MoneyFitRecommendationsServiceSDK.js'
    ],
    output: {
        path: path.join(__dirname, 'build'),
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
    }
};
