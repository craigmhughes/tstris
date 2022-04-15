const path = require('path');

module.exports = {
    mode: 'development',
    watch: true,
    entry: './src/index.ts',
    devtool: 'inline-source-map',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: '/node-modules/',
            },
        ],
    },
    resolve: {
        extensions: ['.ts', 'js'],
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
};