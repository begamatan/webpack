const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserJSPlugin = require('terser-webpack-plugin');

module.exports = merge(common, {
    mode: 'production',
    devtool: 'source-map',
    plugins: [
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: '[name].[contenthash].css',
            chunkFilename: '[name].[contenthash].css',
        }),
    ],
    output: {
        filename: '[name].[contenthash].js',
    },
    optimization: {
        minimizer: [
            new TerserJSPlugin({
                sourceMap: true,
            }),
            new OptimizeCSSAssetsPlugin({
                cssProcessorOptions: {
                    map: {
                        inline: false
                    }
                }
            })
        ],
    },
})