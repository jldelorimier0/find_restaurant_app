/** Array<!Function> */
const changeCallbackFns = [];
/** Object<string, *> */
const _data = {};

/**
 * Get an element from the data store.
 * @param {?string} key
 * @return {*}
 */
function get(key) {
  return key ? _data[key] : _data;
}

/**
 * Sets an element in the data store.
 * @param {string} key
 * @param {*} value
 */
function set(key, value) {
  _data[key] = value;
  notify(key);
}

/**
 * Adds a callback function to be called when the data store changes.
 * @param {!Function} callbackFn
 * @return {!Function}
 */
function onChange(callbackFn) {
  changeCallbackFns.push(callbackFn);
  return () => {
    changeCallbackFns.splice(changeCallbackFns.indexOf(callbackFn), 1);
  };
}

/**
 * Notify all of the registered callback functions of a data store change.
 * @param {string} key
 * @private
 */
function notify(key) {
  changeCallbackFns.forEach(callbackFn => {
    callbackFn(key);
  });
}

export const data = {
  get,
  set,
  onChange,
};
