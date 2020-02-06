const path = require('path');
const glob = require('glob');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const PurgecssPlugin = require('purgecss-webpack-plugin');

const devMode = process.env.NODE_ENV !== 'production'
const PATHS = {
    src: path.join(__dirname, 'src')
}

module.exports = {
    mode: 'development',
    entry: {
        app: './src/index.js',
    },
    devtool: 'inline-source-map',
    devServer: {
        contentBase: './dist',
        hot: true
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            hmr: devMode,
                        },
                    },
                    { loader: 'css-loader', options: { importLoaders: 1 } },
                    'postcss-loader'
                ]
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin({
            cleanOnceBeforeBuildPatterns: ['**/*', '!.gitkeep'],
        }),
        new HtmlWebpackPlugin({
            title: 'Test',
            meta: {
                viewport: 'width=device-width, initial-scale=1, shrink-to-fit=no'
            }
        }),
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: devMode ? '[name].css' : '[name].[contenthash].css',
            chunkFilename: devMode ? '[name].css' : '[name].[contenthash].css',
        }),
        new PurgecssPlugin({
            paths: glob.sync(`${PATHS.src}/**/*`, { nodir: true }),
        }),
    ],
    output: {
        filename: devMode ? '[name].js' : '[name].[contenthash].js',
        path: path.resolve(__dirname, 'dist'),
    },
    optimization: {
        moduleIds: 'hashed',
        runtimeChunk: 'single',
        splitChunks: {
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    chunks: 'all'
                }
            }
        }
    },
};