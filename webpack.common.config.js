const path = require('path');
const globby = require('globby');
const babelConfig = require("./babel.config");

const packages = globby.sync(['../../packages/**'], {
    onlyDirectories: true, deep: 0
});

const entries = {};

packages.map((pkg)=>{
    pkg = pkg.split('/').slice(2);
    const entry = pkg[1];
    entries[entry] = path.resolve(__dirname, `./${pkg.join('/')}/src/index.ts`);
});

const buildPath = path.resolve(__dirname, './packages/');

module.exports = {
    devtool: 'source-map',
    entry: entries,
    stats: 'verbose',
    // mode: 'production',
    output: {
        filename: `[name]/dist/index.js`,
        path: buildPath,
        library: ["i18nComponent", "[name]"],
		libraryTarget: "umd"
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                options: babelConfig
            }
        ]
    },
    plugins: [],
    resolve: {
        extensions: [ '.tsx', '.ts', '.js' ],
        alias: {
            '@i18n-components': path.resolve(__dirname, './packages/')
        }
    }
};