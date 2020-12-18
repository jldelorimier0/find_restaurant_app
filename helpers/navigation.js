/**
 * Updates the url for the given place id.
 * @param {string} placeId
 */
export function navigateToPlace(placeId) {
  const href = `${location.href.split('?')[0]}?place=${placeId}`;
  history.pushState({}, '', href);
  window.dispatchEvent(new Event('popstate'));
}

/** Navigates back. */
export function navigateBack() {
  history.back();
}

/** 
 * Notifies the parent container of a url change.
 * @private
 */
function message() {
  const {href} = window.location;
  window.top.postMessage(JSON.stringify({type: 'popstate', href}), '*');
}
window.addEventListener('popstate', message);
