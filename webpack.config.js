const path = require('path');

module.exports = {
    entry: './theme/qtemp/index.ts',
    output: {
        filename: 'qtemp-theme.js',
        path: path.resolve(__dirname, 'dist'),
        library: {
            name: 'QTempTheme',
            type: 'umd',
        },
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
            },
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
        alias: {
            '@': path.resolve(__dirname, 'theme'),
        },
    },
    optimization: {
        minimize: true,
        splitChunks: {
            chunks: 'all',
            minSize: 20000,
            maxSize: 70000,
            cacheGroups: {
                defaultVendors: {
                    test: /[\\/]node_modules[\\/]/,
                    priority: -10,
                    reuseExistingChunk: true,
                },
                default: {
                    minChunks: 2,
                    priority: -20,
                    reuseExistingChunk: true,
                },
            },
        },
    },
    performance: {
        maxEntrypointSize: 512000,
        maxAssetSize: 512000,
    },
    devServer: {
        static: {
            directory: path.join(__dirname, 'dist'),
        },
        compress: true,
        port: 9000,
        hot: true,
    },
}; 