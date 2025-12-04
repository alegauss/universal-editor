/**
 * A wrapper around Object.defineProperty to define a property on an object.
 * @param {object} e The object on which to define the property.
 * @param {string} t The name of the property to be defined or modified.
 * @param {function} n A function to be used as a getter for the property.
 * @param {function} r A function to be used as a setter for the property.
 */
export function defineProperty(e, t, n, r) {
  Object.defineProperty(e, t, {
    get: n,
    set: r,
    enumerable: !0,
    configurable: !0,
  });
}