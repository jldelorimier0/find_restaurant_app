import {createElementWithHtml} from '../helpers/createElementWithHtml.js';
import {data} from '../data/data.js';

window.addEventListener('keyup', handleKeyUp);

/**
 * @param {!KeyEvent} event
 */
function handleKeyUp(event) {
  const {target} = event;
  if (!target.dataset.hasOwnProperty('searchBar')) return;
  data.set('placeFilter', event.target.value);
}

/**
 * Renders a search bar element.
 * @return {!HTMLElement}
 */
export function searchBar(value) {
  return createElementWithHtml(`
    <div class="search-bar">
      <input type="text"
        class="search-bar-input"
        value="${value}"
        data-search-bar
        placeholder="Filter places">
    </div>
  `);
}
