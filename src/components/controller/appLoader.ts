import Loader from './loader';
import type { LoaderOptions } from '../../types/news';

class AppLoader extends Loader {
    constructor() {
        const apiUrl = process.env.API_URL;
        const apiKey = process.env.API_KEY;

        if (!apiUrl) {
            throw new Error('API_URL is not defined');
        }

        if (!apiKey) {
            throw new Error('API_KEY is not defined');
        }

        const options: LoaderOptions = {
            apiKey,
        };

        super(apiUrl, options);
    }
}

export default AppLoader;