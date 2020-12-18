/**
 * Escapes a string so it is safe to use in html.
 * @param {string} str
 * @return {string}
 */
export function escapeString(str) {
  str = str || '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
