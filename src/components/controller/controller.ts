import AppLoader from './appLoader';
import type { NewsResponse, SourcesResponse, ResponseCallback } from '../../types/news';

class AppController extends AppLoader {
    getSources(callback: ResponseCallback<SourcesResponse>): void {
        super.getResp<SourcesResponse>(
            {
                endpoint: 'sources',
            },
            callback
        );
    }

    getNews(e: MouseEvent, callback: ResponseCallback<NewsResponse>): void {
        const newsContainer = e.currentTarget;

        if (!(newsContainer instanceof HTMLElement)) {
            return;
        }

        let target: HTMLElement | null = e.target instanceof HTMLElement ? e.target : null;

        while (target && target !== newsContainer) {
            if (target.classList.contains('source__item')) {
                const sourceId = target.getAttribute('data-source-id');

                if (!sourceId) {
                    return;
                }

                if (newsContainer.getAttribute('data-source') !== sourceId) {
                    newsContainer.setAttribute('data-source', sourceId);

                    super.getResp<NewsResponse>(
                        {
                            endpoint: 'everything',
                            options: {
                                sources: sourceId,
                            },
                        },
                        callback
                    );
                }

                return;
            }

            target = target.parentElement;
        }
    }
}

export default AppController;