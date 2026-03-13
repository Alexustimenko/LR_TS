import './sources.css';
import type { Source } from '../../../types/news';

class Sources {
    draw(data: Source[]): void {
        const fragment: DocumentFragment = document.createDocumentFragment();
        const sourceItemTemp = document.querySelector('#sourceItemTemp');

        if (!(sourceItemTemp instanceof HTMLTemplateElement)) {
            throw new Error('Template #sourceItemTemp not found');
        }

        data.forEach((item: Source) => {
            const sourceClone = sourceItemTemp.content.cloneNode(true) as DocumentFragment;

            const sourceName = sourceClone.querySelector('.source__item-name');
            const sourceItem = sourceClone.querySelector('.source__item');

            if (!(sourceName instanceof HTMLElement) || !(sourceItem instanceof HTMLElement)) {
                return;
            }

            sourceName.textContent = item.name;
            sourceItem.setAttribute('data-source-id', item.id);

            fragment.append(sourceClone);
        });

        const sourcesContainer = document.querySelector('.sources');

        if (!(sourcesContainer instanceof HTMLElement)) {
            throw new Error('Element .sources not found');
        }

        sourcesContainer.append(fragment);
    }
}

export default Sources;