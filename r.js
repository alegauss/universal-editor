  export function r(e, t) {
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