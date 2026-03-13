import path from 'path';
import { fileURLToPath } from 'url';
import type { Configuration as WebpackConfiguration } from 'webpack';
import type { Configuration as DevServerConfiguration } from 'webpack-dev-server';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

type Configuration = WebpackConfiguration & {
    devServer?: DevServerConfiguration;
};

const devConfig: Configuration = {
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
        static: {
            directory: path.resolve(__dirname, './dist'),
        },
    },
};

export default devConfig;