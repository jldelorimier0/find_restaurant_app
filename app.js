import {createElementWithHtml} from './helpers/createElementWithHtml.js';
import {data} from './data/data.js';
import {initializePlaces} from './data/placeData.js';
import {place} from './components/place.js';
import {placeList} from './components/placeList.js';
import {searchBar} from './components/searchBar.js';

const rootEl = document.getElementById('app');

// Initial app render.
refreshApp();
// Re-render the app when the url changes.
window.addEventListener('popstate', refreshApp);

// Load the place list data.
initializePlaces();

/** Renders a fresh copy of the app and inserts it into the DOM. */
function refreshApp() {
  rootEl.innerHTML = '';
  rootEl.appendChild(app());
}

/**
 * Renders the entire app.
 * @return {!HTMLElement}
 */
function app() {
  const placeId = (new URL(location.href)).searchParams.get('place');
  const el = createElementWithHtml('<div class="app"></div>');
  if (placeId) {
    el.appendChild(place(placeId));
  } else {
    el.appendChild(header());
    el.appendChild(searchBar(data.get('placeFilter')));
    el.appendChild(placeList()); 
  }
  return el;
}

/**
 * Renders the header.
 * @return {!HTMLElement}
 */
function header() {
  return createElementWithHtml('<div class="header">New to the Neighborhood</div>');
}
