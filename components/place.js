import {createElementWithHtml} from '../helpers/createElementWithHtml.js';
import {data} from '../data/data.js';
import {escapeString} from '../helpers/escapeString.js';
import {navigateBack} from '../helpers/navigation.js';
import {stars} from './stars.js';

/** {?HTMLElement} The root element for this component. */
let rootEl;

window.addEventListener('click', handleClick);
data.onChange(handleDataChange);

/**
 * @param {!MouseEvent} event
 */
function handleClick(event) {
  const backButton = event.target.closest('[data-back]');
  if (!backButton) return;
  navigateBack(backButton.dataset.placeId);
}

/**
 * @param {string} key
 */
function handleDataChange(key) {
  const prevRootEl = rootEl;
  if (!prevRootEl) return;
  const newPlace = place(prevRootEl.dataset.placeId);
  prevRootEl.replaceWith(newPlace);
}

/**
 * Renders a place element.
 * @param {string} placeId
 * @return {!HTMLElement}
 */
export function place(placeId) {
  const placeData = data.get('places').find(p => p.id === placeId);
  if (!placeData) {
    rootEl = createElementWithHtml(`
      <div class="place-loading" data-place-id="${escapeString(placeId)}">
        Loading
      </div>
    `);
  } else {
    rootEl = createElementWithHtml(`
      <div class="place" data-place-id="${escapeString(placeData.id)}">
        <button class="place-back" data-back></button>
        <div class="place-name">${escapeString(placeData.name)}</div>
        <div class="place-address">${escapeString(placeData.address)}</div>
        <div class="place-stars">
          ${stars(placeData.stars).outerHTML}
          &nbsp;(${escapeString(placeData.reviews + '')})
          &nbsp;${escapeString(placeData.price)}
        </div>
        <div class="place-description">${escapeString(placeData.description)}</div>
      </div>
    `);
  }
  return rootEl;
}
