/**
 * Copies properties from one object to another, defining getters for them.
 * This is used to re-export modules.
 * @param {object} e The target object.
 * @param {object} t The source object.
 * @returns {object} The target object.
 */
export function copyExports(e, t) {
  return (
    Object.keys(t).forEach(function (n) {
      "default" === n ||
        "__esModule" === n ||
        Object.prototype.hasOwnProperty.call(e, n) ||
        Object.defineProperty(e, n, {
          enumerable: !0,
          get: function () {
            return t[n];
          },
        });
    }),
    e
  );
}