import {createElementWithHtml} from '../helpers/createElementWithHtml.js';
import {data} from '../data/data.js';
import {escapeString} from '../helpers/escapeString.js';
import {Place} from '../data/placeData.js';
import {stars} from './stars.js';

/** {?HTMLElement} The root element for this component. */
let rootEl;

data.onChange(handleDataChange);

/**
 * @param {string} key
 */
function handleDataChange(key) {
  const prevRootEl = rootEl;
  if (!prevRootEl) return;
  const newPlaceList = placeList();
  prevRootEl.replaceWith(newPlaceList);
}

/**
 * Get all of the places that match the filter string.
 * @param {!Array<!Place>} places
 * @param {string} filter
 * @return {!Array<!Place>}
 */
function getFilteredPlaces(places, filter) { // filter function could be optimized by using a set so that duplicates are automatically excluded if found in subsequent filters for description and address.
  // TODO: Implement this function.
  const downcasedFilter = filter.toLowerCase()
  let matches = places.filter(place => {
    return place.name.toLowerCase().includes(downcasedFilter)
  })
  places.forEach(place => {
    if (matches.map(match => match.id).includes(place.id)) {
      return;
    }
    if (place.description.toLowerCase().includes(downcasedFilter) || place.address.toLowerCase().includes(downcasedFilter)){
      matches.push(place);
    }
  });
  return matches
}
function handleClick(){
  console.log(handleClick)
   // run document.querySelectorAll and pass class="place-row" > get list of place-rows on DOM. rows.forEach(row => target data place id). get id set on line 77. add event listener to id and import to navigate js. 
}

/**
 * Renders a list of places.
 * @return {!HTMLElement}
 */
export function placeList() {
  const filter = data.get('placeFilter') || '';
  const allPlaces = data.get('places');
  const places = getFilteredPlaces(allPlaces, filter);
  console.log(places.length, allPlaces.length, filter)
  rootEl = createElementWithHtml('<div class="place-list"></div>');
  if (!data.get('placesLoaded')) {
    rootEl.innerHTML = '<div class="place-list-loading">Loading</div>';
  } else {
    places.forEach(place => {
      rootEl.appendChild(placeRow(place));
    });
  }
  handleClick()
  return rootEl;
}

/**
 * Renders a place row.
 * @param {!Place}
 * @return {!HTMLElement}
 */
function placeRow(place) {
  return createElementWithHtml(`
    <div class="place-row" data-place-row data-place-id="${escapeString(place.id)}">
      <div class="place-row-details">
        <div class="place-row-name">${escapeString(place.name)}</div>
        <div class="place-row-address">${escapeString(place.address)}</div>
        <div class="place-row-stars">
          ${stars(place.stars).outerHTML}
          &nbsp;(${escapeString(place.reviews + '')})
          &nbsp;${escapeString(place.price)}
        </div>
      </div>
      <img class="place-row-img" src="${escapeString(place.img)}" />
    </div>
  `);
}
