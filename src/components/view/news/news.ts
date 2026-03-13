import './news.css';
import type { Article } from '../../../types/news';

class News {
    draw(data: Article[]): void {
        const news: Article[] = data.length >= 10 ? data.filter((_, idx) => idx < 10) : data;

        const fragment: DocumentFragment = document.createDocumentFragment();
        const newsItemTemp = document.querySelector('#newsItemTemp');

        if (!(newsItemTemp instanceof HTMLTemplateElement)) {
            throw new Error('Template #newsItemTemp not found');
        }

        news.forEach((item: Article, idx: number) => {
            const newsClone = newsItemTemp.content.cloneNode(true) as DocumentFragment;

            const newsItem = newsClone.querySelector('.news__item');
            const newsPhoto = newsClone.querySelector('.news__meta-photo');
            const newsAuthor = newsClone.querySelector('.news__meta-author');
            const newsDate = newsClone.querySelector('.news__meta-date');
            const newsTitle = newsClone.querySelector('.news__description-title');
            const newsSource = newsClone.querySelector('.news__description-source');
            const newsContent = newsClone.querySelector('.news__description-content');
            const newsLink = newsClone.querySelector('.news__read-more a');

            if (
                !(newsItem instanceof HTMLElement) ||
                !(newsPhoto instanceof HTMLElement) ||
                !(newsAuthor instanceof HTMLElement) ||
                !(newsDate instanceof HTMLElement) ||
                !(newsTitle instanceof HTMLElement) ||
                !(newsSource instanceof HTMLElement) ||
                !(newsContent instanceof HTMLElement) ||
                !(newsLink instanceof HTMLAnchorElement)
            ) {
                return;
            }

            if (idx % 2) {
                newsItem.classList.add('alt');
            }

            newsPhoto.style.backgroundImage = `url(${item.urlToImage || 'img/news_placeholder.jpg'})`;
            newsAuthor.textContent = item.author || item.source.name;
            newsDate.textContent = item.publishedAt.slice(0, 10).split('-').reverse().join('-');
            newsTitle.textContent = item.title;
            newsSource.textContent = item.source.name;
            newsContent.textContent = item.description ?? '';
            newsLink.setAttribute('href', item.url);

            fragment.append(newsClone);
        });

        const newsContainer = document.querySelector('.news');

        if (!(newsContainer instanceof HTMLElement)) {
            throw new Error('Element .news not found');
        }

        newsContainer.innerHTML = '';
        newsContainer.appendChild(fragment);
    }
}

export default News;