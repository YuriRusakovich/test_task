const { resolve } = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { HotModuleReplacementPlugin } = require("webpack");
const TerserWebpackPlugin = require("terser-webpack-plugin");
const EsLintPlugin = require("eslint-webpack-plugin");
const { InjectManifest } = require( 'workbox-webpack-plugin' );
const CopyPlugin = require( 'copy-webpack-plugin' );
const Dotenv = require( 'dotenv-webpack' );
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
    .BundleAnalyzerPlugin;


const isProd = process.env.NODE_ENV === "production";

const webpackPlugins = [
    new CopyPlugin( {
        patterns: [
            { from: './src/manifest.json', to: '' },
            { from: './src/assets/images', to: 'assets/images/' }
        ],
    } ),
    new Dotenv( {
        path: './.env',
        systemvars: true,
    } ),
    new HtmlWebpackPlugin({
        favicon: false,
        template: "./src/index.html",
        filename: "index.html",
        inject: "body",
    }),
    new HotModuleReplacementPlugin(),
    new EsLintPlugin({
        extensions: [".js", ".jsx", ".ts", ".tsx"],
    }),
    new BundleAnalyzerPlugin(),
];

if (isProd) {
    webpackPlugins.push( new InjectManifest( {
        swSrc: './src/serviceWorker.js',
        swDest: 'sw.js',
    } ) );
}

const config = {
    mode: isProd ? "production" : "development",
    entry: {
        index: "./src/index.tsx"
    },
    output: {
        path: resolve(__dirname, "dist"),
        filename: "bundle.js",
    },
    resolve: {
        alias: {
            "@components": resolve(__dirname, './src/components'),
            "@services": resolve(__dirname, './src/services')
        },
        extensions: [".js", ".jsx", ".ts", ".tsx"]
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: "babel-loader",
                exclude: /node_modules/,
            },
        ],
    },
    plugins: webpackPlugins,
};

if (isProd) {
    config.optimization = {
        minimizer: [new TerserWebpackPlugin()],
    };
} else {
    config.devServer = {
        port: 9001,
        open: true,
        hot: true,
        compress: true,
        stats: "errors-only",
        overlay: true,
    };
}

module.exports = config;