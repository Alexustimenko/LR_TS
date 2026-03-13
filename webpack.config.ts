import path from 'path';
import { fileURLToPath } from 'url';
import { createRequire } from 'module';
import { merge } from 'webpack-merge';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import Dotenv from 'dotenv-webpack';
import type { Configuration } from 'webpack';

type Mode = 'prod' | 'dev' | 'development';

interface EnvArgs {
    mode?: Mode;
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const require = createRequire(import.meta.url);

const baseConfig: Configuration = {
    entry: path.resolve(__dirname, './src/index.ts'),
    mode: 'development',
    module: {
        rules: [
            {
                test: /\.ts$/i,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            },
        ],
    },
    resolve: {
        extensions: ['.ts', '.js'],
    },
    output: {
        filename: 'index.js',
        path: path.resolve(__dirname, './dist'),
    },
    plugins: [
        new Dotenv(),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, './src/index.html'),
            filename: 'index.html',
        }),
        new CleanWebpackPlugin(),
    ],
};

export default (env: EnvArgs = {}): Configuration => {
    const isProductionMode = env.mode === 'prod';

    const envConfig: Configuration = isProductionMode
        ? require('./webpack.prod.config.ts').default
        : require('./webpack.dev.config.ts').default;

    return merge(baseConfig, envConfig);
};