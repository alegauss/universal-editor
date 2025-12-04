(() => {
  let e, t, n;
  function r(e, t) {
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
  function o(e, t, n, r) {
    Object.defineProperty(e, t, {
      get: n,
      set: r,
      enumerable: !0,
      configurable: !0,
    });
  }
  var i,
    s,
    a,
    l,
    c,
    d,
    u,
    h,
    p,
    f,
    m,
    g,
    v,
    y,
    b,
    w,
    k,
    x,
    S,
    E = globalThis,
    _ = {},
    C = {},
    T = E.parcelRequired0f5;
  null == T &&
    (((T = function (e) {
      if (e in _) return _[e].exports;
      if (e in C) {
        var t = C[e];
        delete C[e];
        var n = { id: e, exports: {} };
        return (_[e] = n), t.call(n.exports, n, n.exports), n.exports;
      }
      var r = Error("Cannot find module '" + e + "'");
      throw ((r.code = "MODULE_NOT_FOUND"), r);
    }).register = function (e, t) {
      C[e] = t;
    }),
    (E.parcelRequired0f5 = T));
  var O = T.register;
  O("gfK8G", function (e, t) {
    e.exports = T("hK9Md")(
      (function (e) {
        if (((e = T.i?.[e] || e), !s))
          try {
            throw Error();
          } catch (n) {
            var t = ("" + n.stack).match(
              /(https?|file|ftp|(chrome|moz|safari-web)-extension):\/\/[^)\n]+/g
            );
            if (!t) return "./" + e;
            s = t[0];
          }
        return new URL("./" + e, s).toString();
      })("e5SDK")
    ).then(() => T("3kn97"));
  }),
    O("hK9Md", function (e, t) {
      "use strict";
      e.exports = T("3AMmx")(function (e) {
        return new Promise(function (t, n) {
          if (
            []
              .concat(document.getElementsByTagName("script"))
              .some(function (t) {
                return t.src === e;
              })
          )
            t();
          else {
            var r = document.createElement("link");
            (r.href = e),
              (r.rel = "preload"),
              (r.as = "script"),
              document.head.appendChild(r);
            var o = document.createElement("script");
            (o.async = !0),
              (o.type = "text/javascript"),
              (o.src = e),
              (o.onerror = function (t) {
                var r = TypeError(
                  "Failed to fetch dynamically imported module: "
                    .concat(e, ". Error: ")
                    .concat(t.message)
                );
                (o.onerror = o.onload = null), o.remove(), n(r);
              }),
              (o.onload = function () {
                (o.onerror = o.onload = null), t();
              }),
              document.getElementsByTagName("head")[0].appendChild(o);
          }
        });
      });
    }),
    O("3AMmx", function (e, t) {
      "use strict";
      var n = {},
        r = {},
        o = {};
      e.exports = function (e, t) {
        return function (i) {
          var s = (function (e) {
            switch (e) {
              case "preload":
                return r;
              case "prefetch":
                return o;
              default:
                return n;
            }
          })(t);
          return s[i]
            ? s[i]
            : (s[i] = e.apply(null, arguments).catch(function (e) {
                throw (delete s[i], e);
              }));
        };
      };
    }),
    Object.assign((T.i ??= {}), { e5SDK: "focus-visible.848e3270.js" }),
    (function (e) {
      (e.Call = "call"),
        (e.Reply = "reply"),
        (e.Syn = "syn"),
        (e.SynAck = "synAck"),
        (e.Ack = "ack");
    })(a || (a = {})),
    (function (e) {
      (e.Fulfilled = "fulfilled"), (e.Rejected = "rejected");
    })(l || (l = {})),
    (function (e) {
      (e.ConnectionDestroyed = "ConnectionDestroyed"),
        (e.ConnectionTimeout = "ConnectionTimeout"),
        (e.NoIframeSrc = "NoIframeSrc");
    })(c || (c = {})),
    ((d || (d = {})).DataCloneError = "DataCloneError"),
    ((u || (u = {})).Message = "message");
  let N = ({ name: e, message: t, stack: n }) => ({
    name: e,
    message: t,
    stack: n,
  });
  var A = (e, t, n) => {
    let {
        localName: r,
        local: o,
        remote: i,
        originForSending: s,
        originForReceiving: c,
      } = e,
      h = !1,
      p = (e) => {
        if (e.source !== i || e.data.penpal !== a.Call) return;
        if ("*" !== c && e.origin !== c)
          return void n(
            `${r} received message from origin ${e.origin} which did not match expected origin ${c}`
          );
        let { methodName: o, args: u, id: p } = e.data;
        n(`${r}: Received ${o}() call`);
        let f = (e) => (t) => {
          if ((n(`${r}: Sending ${o}() reply`), h))
            return void n(
              `${r}: Unable to send ${o}() reply due to destroyed connection`
            );
          let c = { penpal: a.Reply, id: p, resolution: e, returnValue: t };
          e === l.Rejected &&
            t instanceof Error &&
            ((c.returnValue = N(t)), (c.returnValueIsError = !0));
          try {
            i.postMessage(c, s);
          } catch (e) {
            if (e.name === d.DataCloneError) {
              let t = {
                penpal: a.Reply,
                id: p,
                resolution: l.Rejected,
                returnValue: N(e),
                returnValueIsError: !0,
              };
              i.postMessage(t, s);
            }
            throw e;
          }
        };
        new Promise((e) => e(t[o].apply(t, u))).then(
          f(l.Fulfilled),
          f(l.Rejected)
        );
      };
    return (
      o.addEventListener(u.Message, p),
      () => {
        (h = !0), o.removeEventListener(u.Message, p);
      }
    );
  };
  let M = 0;
  let D = (e) => (e ? e.split(".") : []),
    R = (e, t, n) => {
      let r = D(t);
      return (
        r.reduce(
          (e, t, o) => (
            void 0 === e[t] && (e[t] = {}),
            o === r.length - 1 && (e[t] = n),
            e[t]
          ),
          e
        ),
        e
      );
    },
    $ = (e, t) => {
      let n = {};
      return (
        Object.keys(e).forEach((r) => {
          let o = e[r],
            i = ((e, t) => {
              let n = D(t || "");
              return n.push(e), ((e) => e.join("."))(n);
            })(r, t);
          "object" == typeof o && Object.assign(n, $(o, i)),
            "function" == typeof o && (n[i] = o);
        }),
        n
      );
    };
  var I = (e, t, n, r, o) => {
      let {
          localName: i,
          local: s,
          remote: d,
          originForSending: h,
          originForReceiving: p,
        } = t,
        f = !1;
      o(`${i}: Connecting call sender`);
      let m =
        (e) =>
        (...t) => {
          let n;
          o(`${i}: Sending ${e}() call`);
          try {
            d.closed && (n = !0);
          } catch (e) {
            n = !0;
          }
          if ((n && r(), f)) {
            let t = Error(
              `Unable to send ${e}() call due to destroyed connection`
            );
            throw ((t.code = c.ConnectionDestroyed), t);
          }
          return new Promise((n, r) => {
            let c = ++M,
              f = (t) => {
                if (
                  t.source !== d ||
                  t.data.penpal !== a.Reply ||
                  t.data.id !== c
                )
                  return;
                if ("*" !== p && t.origin !== p)
                  return void o(
                    `${i} received message from origin ${t.origin} which did not match expected origin ${p}`
                  );
                let h = t.data;
                o(`${i}: Received ${e}() reply`),
                  s.removeEventListener(u.Message, f);
                let m = h.returnValue;
                h.returnValueIsError &&
                  (m = ((e) => {
                    let t = Error();
                    return Object.keys(e).forEach((n) => (t[n] = e[n])), t;
                  })(m)),
                  (h.resolution === l.Fulfilled ? n : r)(m);
              };
            s.addEventListener(u.Message, f);
            let m = { penpal: a.Call, id: c, methodName: e, args: t };
            d.postMessage(m, h);
          });
        };
      return (
        Object.assign(
          e,
          ((e) => {
            let t = {};
            for (let n in e) R(t, n, e[n]);
            return t;
          })(n.reduce((e, t) => ((e[t] = m(t)), e), {}))
        ),
        () => {
          f = !0;
        }
      );
    },
    z = (e, t) => {
      let n;
      return (
        void 0 !== e &&
          (n = window.setTimeout(() => {
            let n = Error(`Connection timed out after ${e}ms`);
            (n.code = c.ConnectionTimeout), t(n);
          }, e)),
        () => {
          clearTimeout(n);
        }
      );
    };
  var P = (e = {}) => {
    let {
        parentOrigin: t = "*",
        methods: n = {},
        timeout: r,
        debug: o = !1,
      } = e,
      i = (
        (e) =>
        (...t) => {
          e && console.log("[Penpal]", ...t);
        }
      )(o),
      s = ((e, t) => {
        let n = [],
          r = !1;
        return {
          destroy(o) {
            r ||
              ((r = !0),
              t(`${e}: Destroying connection`),
              n.forEach((e) => {
                e(o);
              }));
          },
          onDestroy(e) {
            r ? e() : n.push(e);
          },
        };
      })("Child", i),
      { destroy: l, onDestroy: c } = s,
      d = ((e, t, n, r) => {
        let { destroy: o, onDestroy: i } = n;
        return (n) => {
          if (
            !(e instanceof RegExp
              ? e.test(n.origin)
              : "*" === e || e === n.origin)
          )
            return void r(
              `Child: Handshake - Received SYN-ACK from origin ${n.origin} which did not match expected origin ${e}`
            );
          r("Child: Handshake - Received SYN-ACK, responding with ACK");
          let s = "null" === n.origin ? "*" : n.origin,
            l = { penpal: a.Ack, methodNames: Object.keys(t) };
          window.parent.postMessage(l, s);
          let c = {
            localName: "Child",
            local: window,
            remote: window.parent,
            originForSending: s,
            originForReceiving: n.origin,
          };
          i(A(c, t, r));
          let d = {};
          return i(I(d, c, n.data.methodNames, o, r)), d;
        };
      })(t, $(n), s, i),
      h = () => {
        i("Child: Handshake - Sending SYN");
        let e = { penpal: a.Syn };
        window.parent.postMessage(e, t instanceof RegExp ? "*" : t);
      };
    return {
      promise: new Promise((e, t) => {
        let n = z(r, l),
          o = (t) => {
            if (
              (() => {
                try {
                  clearTimeout();
                } catch (e) {
                  return !1;
                }
                return !0;
              })() &&
              t.source === parent &&
              t.data &&
              t.data.penpal === a.SynAck
            ) {
              let r = d(t);
              r && (window.removeEventListener(u.Message, o), n(), e(r));
            }
          };
        window.addEventListener(u.Message, o),
          h(),
          c((e) => {
            window.removeEventListener(u.Message, o), e && t(e);
          });
      }),
      destroy() {
        l();
      },
    };
  };
  !(function (e) {
    (e.DRAFT = "draft"),
      (e.PUBLISHED = "published"),
      (e.UNPUBLISHED = "unpublished"),
      (e.MODIFIED = "modified"),
      (e.UNKNOWN = "unknown");
  })(h || (h = {})),
    (function (e) {
      (e.PAGE = "page"),
        (e.CONTENT_FRAGMENT = "content-fragment"),
        (e.EXPERIENCE_FRAGMENT = "experience-fragment"),
        (e.ASSET = "asset"),
        (e.TEMPLATE = "template"),
        (e.POLICIES = "policies"),
        (e.PRODUCT = "product"),
        (e.CATALOG = "catalog"),
        (e.TAG = "tag"),
        (e.OTHERS = "others");
    })(p || (p = {})),
    (function (e) {
      (e.PREVIEW = "preview"), (e.PUBLISH = "publish");
    })(f || (f = {}));
  let V = Object.freeze({
    UUID: "id",
    RESOURCE: "resource",
    TYPE: "type",
    PROP: "prop",
    PARENTID: "parentid",
    BEHAVIOR: "behavior",
    LABEL: "label",
    MODEL: "model",
    FILTER: "filter",
    COMPONENT: "component",
  });
  !(function (e) {
    (e.EDIT = "edit"), (e.PREVIEW = "preview");
  })(m || (m = {})),
    (function (e) {
      (e.TEXT = "text"),
        (e.MEDIA = "media"),
        (e.RICHTEXT = "richtext"),
        (e.REFERENCE = "reference"),
        (e.CONTAINER = "container"),
        (e.COMPONENT = "component");
    })(g || (g = {})),
    (function (e) {
      (e.TEXT = "text"),
        (e.MEDIA = "media"),
        (e.RICHTEXT = "richtext"),
        (e.REFERENCE = "reference"),
        (e.CONTAINER = "container"),
        (e.COMPONENT = "component");
    })(v || (v = {})),
    Object.freeze({
      BLOCKS: "blocks",
      FORMAT: "format",
      ALIGNMENT: "alignment",
      INDENTATION: "indentation",
      SR_SCRIPT: "sr_script",
      LIST: "list",
      INSERT: "insert",
      ADVANCED: "advanced",
      EXTENSIONS: "extensions",
      EDITOR: "editor",
    }),
    (function (e) {
      (e.assertEqual = (e) => e),
        (e.assertIs = function (e) {}),
        (e.assertNever = function (e) {
          throw Error();
        }),
        (e.arrayToEnum = (e) => {
          let t = {};
          for (let n of e) t[n] = n;
          return t;
        }),
        (e.getValidEnumValues = (t) => {
          let n = e.objectKeys(t).filter((e) => "number" != typeof t[t[e]]),
            r = {};
          for (let e of n) r[e] = t[e];
          return e.objectValues(r);
        }),
        (e.objectValues = (t) =>
          e.objectKeys(t).map(function (e) {
            return t[e];
          })),
        (e.objectKeys =
          "function" == typeof Object.keys
            ? (e) => Object.keys(e)
            : (e) => {
                let t = [];
                for (let n in e)
                  Object.prototype.hasOwnProperty.call(e, n) && t.push(n);
                return t;
              }),
        (e.find = (e, t) => {
          for (let n of e) if (t(n)) return n;
        }),
        (e.isInteger =
          "function" == typeof Number.isInteger
            ? (e) => Number.isInteger(e)
            : (e) =>
                "number" == typeof e && isFinite(e) && Math.floor(e) === e),
        (e.joinValues = function (e, t = " | ") {
          return e.map((e) => ("string" == typeof e ? `'${e}'` : e)).join(t);
        }),
        (e.jsonStringifyReplacer = (e, t) =>
          "bigint" == typeof t ? t.toString() : t);
    })(y || (y = {})),
    ((b || (b = {})).mergeShapes = (e, t) => ({ ...e, ...t }));
  let L = y.arrayToEnum([
      "string",
      "nan",
      "number",
      "integer",
      "float",
      "boolean",
      "date",
      "bigint",
      "symbol",
      "function",
      "undefined",
      "null",
      "array",
      "object",
      "unknown",
      "promise",
      "void",
      "never",
      "map",
      "set",
    ]),
    B = (e) => {
      switch (typeof e) {
        case "undefined":
          return L.undefined;
        case "string":
          return L.string;
        case "number":
          return isNaN(e) ? L.nan : L.number;
        case "boolean":
          return L.boolean;
        case "function":
          return L.function;
        case "bigint":
          return L.bigint;
        case "symbol":
          return L.symbol;
        case "object":
          return Array.isArray(e)
            ? L.array
            : null === e
            ? L.null
            : e.then &&
              "function" == typeof e.then &&
              e.catch &&
              "function" == typeof e.catch
            ? L.promise
            : "undefined" != typeof Map && e instanceof Map
            ? L.map
            : "undefined" != typeof Set && e instanceof Set
            ? L.set
            : "undefined" != typeof Date && e instanceof Date
            ? L.date
            : L.object;
        default:
          return L.unknown;
      }
    },
    j = y.arrayToEnum([
      "invalid_type",
      "invalid_literal",
      "custom",
      "invalid_union",
      "invalid_union_discriminator",
      "invalid_enum_value",
      "unrecognized_keys",
      "invalid_arguments",
      "invalid_return_type",
      "invalid_date",
      "invalid_string",
      "too_small",
      "too_big",
      "invalid_intersection_types",
      "not_multiple_of",
      "not_finite",
    ]);
  class F extends Error {
    constructor(e) {
      super(),
        (this.issues = []),
        (this.addIssue = (e) => {
          this.issues = [...this.issues, e];
        }),
        (this.addIssues = (e = []) => {
          this.issues = [...this.issues, ...e];
        });
      let t = new.target.prototype;
      Object.setPrototypeOf
        ? Object.setPrototypeOf(this, t)
        : (this.__proto__ = t),
        (this.name = "ZodError"),
        (this.issues = e);
    }
    get errors() {
      return this.issues;
    }
    format(e) {
      let t =
          e ||
          function (e) {
            return e.message;
          },
        n = { _errors: [] },
        r = (e) => {
          for (let o of e.issues)
            if ("invalid_union" === o.code) o.unionErrors.map(r);
            else if ("invalid_return_type" === o.code) r(o.returnTypeError);
            else if ("invalid_arguments" === o.code) r(o.argumentsError);
            else if (0 === o.path.length) n._errors.push(t(o));
            else {
              let e = n,
                r = 0;
              for (; r < o.path.length; ) {
                let n = o.path[r];
                r === o.path.length - 1
                  ? ((e[n] = e[n] || { _errors: [] }), e[n]._errors.push(t(o)))
                  : (e[n] = e[n] || { _errors: [] }),
                  (e = e[n]),
                  r++;
              }
            }
        };
      return r(this), n;
    }
    static assert(e) {
      if (!(e instanceof F)) throw Error(`Not a ZodError: ${e}`);
    }
    toString() {
      return this.message;
    }
    get message() {
      return JSON.stringify(this.issues, y.jsonStringifyReplacer, 2);
    }
    get isEmpty() {
      return 0 === this.issues.length;
    }
    flatten(e = (e) => e.message) {
      let t = {},
        n = [];
      for (let r of this.issues)
        r.path.length > 0
          ? ((t[r.path[0]] = t[r.path[0]] || []), t[r.path[0]].push(e(r)))
          : n.push(e(r));
      return { formErrors: n, fieldErrors: t };
    }
    get formErrors() {
      return this.flatten();
    }
  }
  F.create = (e) => new F(e);
  let U = (e, t) => {
      let n;
      switch (e.code) {
        case j.invalid_type:
          n =
            e.received === L.undefined
              ? "Required"
              : `Expected ${e.expected}, received ${e.received}`;
          break;
        case j.invalid_literal:
          n = `Invalid literal value, expected ${JSON.stringify(
            e.expected,
            y.jsonStringifyReplacer
          )}`;
          break;
        case j.unrecognized_keys:
          n = `Unrecognized key(s) in object: ${y.joinValues(e.keys, ", ")}`;
          break;
        case j.invalid_union:
          n = "Invalid input";
          break;
        case j.invalid_union_discriminator:
          n = `Invalid discriminator value. Expected ${y.joinValues(
            e.options
          )}`;
          break;
        case j.invalid_enum_value:
          n = `Invalid enum value. Expected ${y.joinValues(
            e.options
          )}, received '${e.received}'`;
          break;
        case j.invalid_arguments:
          n = "Invalid function arguments";
          break;
        case j.invalid_return_type:
          n = "Invalid function return type";
          break;
        case j.invalid_date:
          n = "Invalid date";
          break;
        case j.invalid_string:
          "object" == typeof e.validation
            ? "includes" in e.validation
              ? ((n = `Invalid input: must include "${e.validation.includes}"`),
                "number" == typeof e.validation.position &&
                  (n = `${n} at one or more positions greater than or equal to ${e.validation.position}`))
              : "startsWith" in e.validation
              ? (n = `Invalid input: must start with "${e.validation.startsWith}"`)
              : "endsWith" in e.validation
              ? (n = `Invalid input: must end with "${e.validation.endsWith}"`)
              : y.assertNever(e.validation)
            : (n =
                "regex" !== e.validation
                  ? `Invalid ${e.validation}`
                  : "Invalid");
          break;
        case j.too_small:
          n =
            "array" === e.type
              ? `Array must contain ${
                  e.exact ? "exactly" : e.inclusive ? "at least" : "more than"
                } ${e.minimum} element(s)`
              : "string" === e.type
              ? `String must contain ${
                  e.exact ? "exactly" : e.inclusive ? "at least" : "over"
                } ${e.minimum} character(s)`
              : "number" === e.type
              ? `Number must be ${
                  e.exact
                    ? "exactly equal to "
                    : e.inclusive
                    ? "greater than or equal to "
                    : "greater than "
                }${e.minimum}`
              : "date" === e.type
              ? `Date must be ${
                  e.exact
                    ? "exactly equal to "
                    : e.inclusive
                    ? "greater than or equal to "
                    : "greater than "
                }${new Date(Number(e.minimum))}`
              : "Invalid input";
          break;
        case j.too_big:
          n =
            "array" === e.type
              ? `Array must contain ${
                  e.exact ? "exactly" : e.inclusive ? "at most" : "less than"
                } ${e.maximum} element(s)`
              : "string" === e.type
              ? `String must contain ${
                  e.exact ? "exactly" : e.inclusive ? "at most" : "under"
                } ${e.maximum} character(s)`
              : "number" === e.type
              ? `Number must be ${
                  e.exact
                    ? "exactly"
                    : e.inclusive
                    ? "less than or equal to"
                    : "less than"
                } ${e.maximum}`
              : "bigint" === e.type
              ? `BigInt must be ${
                  e.exact
                    ? "exactly"
                    : e.inclusive
                    ? "less than or equal to"
                    : "less than"
                } ${e.maximum}`
              : "date" === e.type
              ? `Date must be ${
                  e.exact
                    ? "exactly"
                    : e.inclusive
                    ? "smaller than or equal to"
                    : "smaller than"
                } ${new Date(Number(e.maximum))}`
              : "Invalid input";
          break;
        case j.custom:
          n = "Invalid input";
          break;
        case j.invalid_intersection_types:
          n = "Intersection results could not be merged";
          break;
        case j.not_multiple_of:
          n = `Number must be a multiple of ${e.multipleOf}`;
          break;
        case j.not_finite:
          n = "Number must be finite";
          break;
        default:
          (n = t.defaultError), y.assertNever(e);
      }
      return { message: n };
    },
    Z = U;
  function q() {
    return Z;
  }
  let H = (e) => {
    let { data: t, path: n, errorMaps: r, issueData: o } = e,
      i = [...n, ...(o.path || [])],
      s = { ...o, path: i };
    if (void 0 !== o.message) return { ...o, path: i, message: o.message };
    let a = "";
    for (let e of r
      .filter((e) => !!e)
      .slice()
      .reverse())
      a = e(s, { data: t, defaultError: a }).message;
    return { ...o, path: i, message: a };
  };
  function K(e, t) {
    let n = q(),
      r = H({
        issueData: t,
        data: e.data,
        path: e.path,
        errorMaps: [
          e.common.contextualErrorMap,
          e.schemaErrorMap,
          n,
          n === U ? void 0 : U,
        ].filter((e) => !!e),
      });
    e.common.issues.push(r);
  }
  class W {
    constructor() {
      this.value = "valid";
    }
    dirty() {
      "valid" === this.value && (this.value = "dirty");
    }
    abort() {
      "aborted" !== this.value && (this.value = "aborted");
    }
    static mergeArray(e, t) {
      let n = [];
      for (let r of t) {
        if ("aborted" === r.status) return J;
        "dirty" === r.status && e.dirty(), n.push(r.value);
      }
      return { status: e.value, value: n };
    }
    static async mergeObjectAsync(e, t) {
      let n = [];
      for (let e of t) {
        let t = await e.key,
          r = await e.value;
        n.push({ key: t, value: r });
      }
      return W.mergeObjectSync(e, n);
    }
    static mergeObjectSync(e, t) {
      let n = {};
      for (let r of t) {
        let { key: t, value: o } = r;
        if ("aborted" === t.status || "aborted" === o.status) return J;
        "dirty" === t.status && e.dirty(),
          "dirty" === o.status && e.dirty(),
          "__proto__" !== t.value &&
            (void 0 !== o.value || r.alwaysSet) &&
            (n[t.value] = o.value);
      }
      return { status: e.value, value: n };
    }
  }
  let J = Object.freeze({ status: "aborted" }),
    G = (e) => ({ status: "dirty", value: e }),
    Y = (e) => ({ status: "valid", value: e }),
    X = (e) => "aborted" === e.status,
    Q = (e) => "dirty" === e.status,
    ee = (e) => "valid" === e.status,
    te = (e) => "undefined" != typeof Promise && e instanceof Promise;
  function ne(e, t, n, r) {
    if ("a" === n && !r)
      throw TypeError("Private accessor was defined without a getter");
    if ("function" == typeof t ? e !== t || !r : !t.has(e))
      throw TypeError(
        "Cannot read private member from an object whose class did not declare it"
      );
    return "m" === n ? r : "a" === n ? r.call(e) : r ? r.value : t.get(e);
  }
  function re(e, t, n, r, o) {
    if ("m" === r) throw TypeError("Private method is not writable");
    if ("a" === r && !o)
      throw TypeError("Private accessor was defined without a setter");
    if ("function" == typeof t ? e !== t || !o : !t.has(e))
      throw TypeError(
        "Cannot write private member to an object whose class did not declare it"
      );
    return "a" === r ? o.call(e, n) : o ? (o.value = n) : t.set(e, n), n;
  }
  "function" == typeof SuppressedError && SuppressedError,
    (function (e) {
      (e.errToObj = (e) => ("string" == typeof e ? { message: e } : e || {})),
        (e.toString = (e) =>
          "string" == typeof e ? e : null == e ? void 0 : e.message);
    })(w || (w = {}));
  class oe {
    constructor(e, t, n, r) {
      (this._cachedPath = []),
        (this.parent = e),
        (this.data = t),
        (this._path = n),
        (this._key = r);
    }
    get path() {
      return (
        this._cachedPath.length ||
          (this._key instanceof Array
            ? this._cachedPath.push(...this._path, ...this._key)
            : this._cachedPath.push(...this._path, this._key)),
        this._cachedPath
      );
    }
  }
  let ie = (e, t) => {
    if (ee(t)) return { success: !0, data: t.value };
    if (!e.common.issues.length)
      throw Error("Validation failed but no issues detected.");
    return {
      success: !1,
      get error() {
        if (this._error) return this._error;
        let t = new F(e.common.issues);
        return (this._error = t), this._error;
      },
    };
  };
  function se(e) {
    if (!e) return {};
    let {
      errorMap: t,
      invalid_type_error: n,
      required_error: r,
      description: o,
    } = e;
    if (t && (n || r))
      throw Error(
        'Can\'t use "invalid_type_error" or "required_error" in conjunction with custom error map.'
      );
    return t
      ? { errorMap: t, description: o }
      : {
          errorMap: (t, o) => {
            var i, s;
            let { message: a } = e;
            return "invalid_enum_value" === t.code
              ? { message: null != a ? a : o.defaultError }
              : void 0 === o.data
              ? {
                  message: null != (i = null != a ? a : r) ? i : o.defaultError,
                }
              : "invalid_type" !== t.code
              ? { message: o.defaultError }
              : {
                  message: null != (s = null != a ? a : n) ? s : o.defaultError,
                };
          },
          description: o,
        };
  }
  class ae {
    constructor(e) {
      (this.spa = this.safeParseAsync),
        (this._def = e),
        (this.parse = this.parse.bind(this)),
        (this.safeParse = this.safeParse.bind(this)),
        (this.parseAsync = this.parseAsync.bind(this)),
        (this.safeParseAsync = this.safeParseAsync.bind(this)),
        (this.spa = this.spa.bind(this)),
        (this.refine = this.refine.bind(this)),
        (this.refinement = this.refinement.bind(this)),
        (this.superRefine = this.superRefine.bind(this)),
        (this.optional = this.optional.bind(this)),
        (this.nullable = this.nullable.bind(this)),
        (this.nullish = this.nullish.bind(this)),
        (this.array = this.array.bind(this)),
        (this.promise = this.promise.bind(this)),
        (this.or = this.or.bind(this)),
        (this.and = this.and.bind(this)),
        (this.transform = this.transform.bind(this)),
        (this.brand = this.brand.bind(this)),
        (this.default = this.default.bind(this)),
        (this.catch = this.catch.bind(this)),
        (this.describe = this.describe.bind(this)),
        (this.pipe = this.pipe.bind(this)),
        (this.readonly = this.readonly.bind(this)),
        (this.isNullable = this.isNullable.bind(this)),
        (this.isOptional = this.isOptional.bind(this));
    }
    get description() {
      return this._def.description;
    }
    _getType(e) {
      return B(e.data);
    }
    _getOrReturnCtx(e, t) {
      return (
        t || {
          common: e.parent.common,
          data: e.data,
          parsedType: B(e.data),
          schemaErrorMap: this._def.errorMap,
          path: e.path,
          parent: e.parent,
        }
      );
    }
    _processInputParams(e) {
      return {
        status: new W(),
        ctx: {
          common: e.parent.common,
          data: e.data,
          parsedType: B(e.data),
          schemaErrorMap: this._def.errorMap,
          path: e.path,
          parent: e.parent,
        },
      };
    }
    _parseSync(e) {
      let t = this._parse(e);
      if (te(t)) throw Error("Synchronous parse encountered promise.");
      return t;
    }
    _parseAsync(e) {
      return Promise.resolve(this._parse(e));
    }
    parse(e, t) {
      let n = this.safeParse(e, t);
      if (n.success) return n.data;
      throw n.error;
    }
    safeParse(e, t) {
      var n;
      let r = {
          common: {
            issues: [],
            async: null != (n = null == t ? void 0 : t.async) && n,
            contextualErrorMap: null == t ? void 0 : t.errorMap,
          },
          path: (null == t ? void 0 : t.path) || [],
          schemaErrorMap: this._def.errorMap,
          parent: null,
          data: e,
          parsedType: B(e),
        },
        o = this._parseSync({ data: e, path: r.path, parent: r });
      return ie(r, o);
    }
    async parseAsync(e, t) {
      let n = await this.safeParseAsync(e, t);
      if (n.success) return n.data;
      throw n.error;
    }
    async safeParseAsync(e, t) {
      let n = {
          common: {
            issues: [],
            contextualErrorMap: null == t ? void 0 : t.errorMap,
            async: !0,
          },
          path: (null == t ? void 0 : t.path) || [],
          schemaErrorMap: this._def.errorMap,
          parent: null,
          data: e,
          parsedType: B(e),
        },
        r = this._parse({ data: e, path: n.path, parent: n });
      return ie(n, await (te(r) ? r : Promise.resolve(r)));
    }
    refine(e, t) {
      let n = (e) =>
        "string" == typeof t || void 0 === t
          ? { message: t }
          : "function" == typeof t
          ? t(e)
          : t;
      return this._refinement((t, r) => {
        let o = e(t),
          i = () => r.addIssue({ code: j.custom, ...n(t) });
        return "undefined" != typeof Promise && o instanceof Promise
          ? o.then((e) => !!e || (i(), !1))
          : !!o || (i(), !1);
      });
    }
    refinement(e, t) {
      return this._refinement(
        (n, r) =>
          !!e(n) || (r.addIssue("function" == typeof t ? t(n, r) : t), !1)
      );
    }
    _refinement(e) {
      return new Ye({
        schema: this,
        typeName: S.ZodEffects,
        effect: { type: "refinement", refinement: e },
      });
    }
    superRefine(e) {
      return this._refinement(e);
    }
    optional() {
      return Xe.create(this, this._def);
    }
    nullable() {
      return Qe.create(this, this._def);
    }
    nullish() {
      return this.nullable().optional();
    }
    array() {
      return $e.create(this, this._def);
    }
    promise() {
      return Ge.create(this, this._def);
    }
    or(e) {
      return ze.create([this, e], this._def);
    }
    and(e) {
      return Le.create(this, e, this._def);
    }
    transform(e) {
      return new Ye({
        ...se(this._def),
        schema: this,
        typeName: S.ZodEffects,
        effect: { type: "transform", transform: e },
      });
    }
    default(e) {
      return new et({
        ...se(this._def),
        innerType: this,
        defaultValue: "function" == typeof e ? e : () => e,
        typeName: S.ZodDefault,
      });
    }
    brand() {
      return new ot({ typeName: S.ZodBranded, type: this, ...se(this._def) });
    }
    catch(e) {
      return new tt({
        ...se(this._def),
        innerType: this,
        catchValue: "function" == typeof e ? e : () => e,
        typeName: S.ZodCatch,
      });
    }
    describe(e) {
      return new this.constructor({ ...this._def, description: e });
    }
    pipe(e) {
      return it.create(this, e);
    }
    readonly() {
      return st.create(this);
    }
    isOptional() {
      return this.safeParse(void 0).success;
    }
    isNullable() {
      return this.safeParse(null).success;
    }
  }
  let le = /^c[^\s-]{8,}$/i,
    ce = /^[0-9a-z]+$/,
    de = /^[0-9A-HJKMNP-TV-Z]{26}$/,
    ue =
      /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/i,
    he = /^[a-z0-9_-]{21}$/i,
    pe =
      /^[-+]?P(?!$)(?:(?:[-+]?\d+Y)|(?:[-+]?\d+[.,]\d+Y$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:(?:[-+]?\d+W)|(?:[-+]?\d+[.,]\d+W$))?(?:(?:[-+]?\d+D)|(?:[-+]?\d+[.,]\d+D$))?(?:T(?=[\d+-])(?:(?:[-+]?\d+H)|(?:[-+]?\d+[.,]\d+H$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:[-+]?\d+(?:[.,]\d+)?S)?)??$/,
    fe =
      /^(?!\.)(?!.*\.\.)([A-Z0-9_'+\-\.]*)[A-Z0-9_+-]@([A-Z0-9][A-Z0-9\-]*\.)+[A-Z]{2,}$/i,
    me =
      /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/,
    ge =
      /^(([a-f0-9]{1,4}:){7}|::([a-f0-9]{1,4}:){0,6}|([a-f0-9]{1,4}:){1}:([a-f0-9]{1,4}:){0,5}|([a-f0-9]{1,4}:){2}:([a-f0-9]{1,4}:){0,4}|([a-f0-9]{1,4}:){3}:([a-f0-9]{1,4}:){0,3}|([a-f0-9]{1,4}:){4}:([a-f0-9]{1,4}:){0,2}|([a-f0-9]{1,4}:){5}:([a-f0-9]{1,4}:){0,1})([a-f0-9]{1,4}|(((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2}))\.){3}((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2})))$/,
    ve = /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/,
    ye =
      "((\\d\\d[2468][048]|\\d\\d[13579][26]|\\d\\d0[48]|[02468][048]00|[13579][26]00)-02-29|\\d{4}-((0[13578]|1[02])-(0[1-9]|[12]\\d|3[01])|(0[469]|11)-(0[1-9]|[12]\\d|30)|(02)-(0[1-9]|1\\d|2[0-8])))",
    be = RegExp(`^${ye}$`);
  function we(e) {
    let t = "([01]\\d|2[0-3]):[0-5]\\d:[0-5]\\d";
    return (
      e.precision
        ? (t = `${t}\\.\\d{${e.precision}}`)
        : null == e.precision && (t = `${t}(\\.\\d+)?`),
      t
    );
  }
  function ke(e) {
    let t = `${ye}T${we(e)}`,
      n = [];
    return (
      n.push(e.local ? "Z?" : "Z"),
      e.offset && n.push("([+-]\\d{2}:?\\d{2})"),
      (t = `${t}(${n.join("|")})`),
      RegExp(`^${t}$`)
    );
  }
  class xe extends ae {
    _parse(t) {
      var n, r;
      let o;
      if (
        (this._def.coerce && (t.data = String(t.data)),
        this._getType(t) !== L.string)
      ) {
        let e = this._getOrReturnCtx(t);
        return (
          K(e, {
            code: j.invalid_type,
            expected: L.string,
            received: e.parsedType,
          }),
          J
        );
      }
      let i = new W();
      for (let s of this._def.checks)
        if ("min" === s.kind)
          t.data.length < s.value &&
            (K((o = this._getOrReturnCtx(t, o)), {
              code: j.too_small,
              minimum: s.value,
              type: "string",
              inclusive: !0,
              exact: !1,
              message: s.message,
            }),
            i.dirty());
        else if ("max" === s.kind)
          t.data.length > s.value &&
            (K((o = this._getOrReturnCtx(t, o)), {
              code: j.too_big,
              maximum: s.value,
              type: "string",
              inclusive: !0,
              exact: !1,
              message: s.message,
            }),
            i.dirty());
        else if ("length" === s.kind) {
          let e = t.data.length > s.value,
            n = t.data.length < s.value;
          (e || n) &&
            ((o = this._getOrReturnCtx(t, o)),
            e
              ? K(o, {
                  code: j.too_big,
                  maximum: s.value,
                  type: "string",
                  inclusive: !0,
                  exact: !0,
                  message: s.message,
                })
              : n &&
                K(o, {
                  code: j.too_small,
                  minimum: s.value,
                  type: "string",
                  inclusive: !0,
                  exact: !0,
                  message: s.message,
                }),
            i.dirty());
        } else if ("email" === s.kind)
          fe.test(t.data) ||
            (K((o = this._getOrReturnCtx(t, o)), {
              validation: "email",
              code: j.invalid_string,
              message: s.message,
            }),
            i.dirty());
        else if ("emoji" === s.kind)
          e ||
            (e = RegExp(
              "^(\\p{Extended_Pictographic}|\\p{Emoji_Component})+$",
              "u"
            )),
            e.test(t.data) ||
              (K((o = this._getOrReturnCtx(t, o)), {
                validation: "emoji",
                code: j.invalid_string,
                message: s.message,
              }),
              i.dirty());
        else if ("uuid" === s.kind)
          ue.test(t.data) ||
            (K((o = this._getOrReturnCtx(t, o)), {
              validation: "uuid",
              code: j.invalid_string,
              message: s.message,
            }),
            i.dirty());
        else if ("nanoid" === s.kind)
          he.test(t.data) ||
            (K((o = this._getOrReturnCtx(t, o)), {
              validation: "nanoid",
              code: j.invalid_string,
              message: s.message,
            }),
            i.dirty());
        else if ("cuid" === s.kind)
          le.test(t.data) ||
            (K((o = this._getOrReturnCtx(t, o)), {
              validation: "cuid",
              code: j.invalid_string,
              message: s.message,
            }),
            i.dirty());
        else if ("cuid2" === s.kind)
          ce.test(t.data) ||
            (K((o = this._getOrReturnCtx(t, o)), {
              validation: "cuid2",
              code: j.invalid_string,
              message: s.message,
            }),
            i.dirty());
        else if ("ulid" === s.kind)
          de.test(t.data) ||
            (K((o = this._getOrReturnCtx(t, o)), {
              validation: "ulid",
              code: j.invalid_string,
              message: s.message,
            }),
            i.dirty());
        else if ("url" === s.kind)
          try {
            new URL(t.data);
          } catch (e) {
            K((o = this._getOrReturnCtx(t, o)), {
              validation: "url",
              code: j.invalid_string,
              message: s.message,
            }),
              i.dirty();
          }
        else
          "regex" === s.kind
            ? ((s.regex.lastIndex = 0),
              s.regex.test(t.data) ||
                (K((o = this._getOrReturnCtx(t, o)), {
                  validation: "regex",
                  code: j.invalid_string,
                  message: s.message,
                }),
                i.dirty()))
            : "trim" === s.kind
            ? (t.data = t.data.trim())
            : "includes" === s.kind
            ? t.data.includes(s.value, s.position) ||
              (K((o = this._getOrReturnCtx(t, o)), {
                code: j.invalid_string,
                validation: { includes: s.value, position: s.position },
                message: s.message,
              }),
              i.dirty())
            : "toLowerCase" === s.kind
            ? (t.data = t.data.toLowerCase())
            : "toUpperCase" === s.kind
            ? (t.data = t.data.toUpperCase())
            : "startsWith" === s.kind
            ? t.data.startsWith(s.value) ||
              (K((o = this._getOrReturnCtx(t, o)), {
                code: j.invalid_string,
                validation: { startsWith: s.value },
                message: s.message,
              }),
              i.dirty())
            : "endsWith" === s.kind
            ? t.data.endsWith(s.value) ||
              (K((o = this._getOrReturnCtx(t, o)), {
                code: j.invalid_string,
                validation: { endsWith: s.value },
                message: s.message,
              }),
              i.dirty())
            : "datetime" === s.kind
            ? ke(s).test(t.data) ||
              (K((o = this._getOrReturnCtx(t, o)), {
                code: j.invalid_string,
                validation: "datetime",
                message: s.message,
              }),
              i.dirty())
            : "date" === s.kind
            ? be.test(t.data) ||
              (K((o = this._getOrReturnCtx(t, o)), {
                code: j.invalid_string,
                validation: "date",
                message: s.message,
              }),
              i.dirty())
            : "time" === s.kind
            ? RegExp(`^${we(s)}$`).test(t.data) ||
              (K((o = this._getOrReturnCtx(t, o)), {
                code: j.invalid_string,
                validation: "time",
                message: s.message,
              }),
              i.dirty())
            : "duration" === s.kind
            ? pe.test(t.data) ||
              (K((o = this._getOrReturnCtx(t, o)), {
                validation: "duration",
                code: j.invalid_string,
                message: s.message,
              }),
              i.dirty())
            : "ip" === s.kind
            ? ((n = t.data),
              (("v4" !== (r = s.version) && r) || !me.test(n)) &&
                (("v6" !== r && r) || !ge.test(n)) &&
                (K((o = this._getOrReturnCtx(t, o)), {
                  validation: "ip",
                  code: j.invalid_string,
                  message: s.message,
                }),
                i.dirty()))
            : "base64" === s.kind
            ? ve.test(t.data) ||
              (K((o = this._getOrReturnCtx(t, o)), {
                validation: "base64",
                code: j.invalid_string,
                message: s.message,
              }),
              i.dirty())
            : y.assertNever(s);
      return { status: i.value, value: t.data };
    }
    _regex(e, t, n) {
      return this.refinement((t) => e.test(t), {
        validation: t,
        code: j.invalid_string,
        ...w.errToObj(n),
      });
    }
    _addCheck(e) {
      return new xe({ ...this._def, checks: [...this._def.checks, e] });
    }
    email(e) {
      return this._addCheck({ kind: "email", ...w.errToObj(e) });
    }
    url(e) {
      return this._addCheck({ kind: "url", ...w.errToObj(e) });
    }
    emoji(e) {
      return this._addCheck({ kind: "emoji", ...w.errToObj(e) });
    }
    uuid(e) {
      return this._addCheck({ kind: "uuid", ...w.errToObj(e) });
    }
    nanoid(e) {
      return this._addCheck({ kind: "nanoid", ...w.errToObj(e) });
    }
    cuid(e) {
      return this._addCheck({ kind: "cuid", ...w.errToObj(e) });
    }
    cuid2(e) {
      return this._addCheck({ kind: "cuid2", ...w.errToObj(e) });
    }
    ulid(e) {
      return this._addCheck({ kind: "ulid", ...w.errToObj(e) });
    }
    base64(e) {
      return this._addCheck({ kind: "base64", ...w.errToObj(e) });
    }
    ip(e) {
      return this._addCheck({ kind: "ip", ...w.errToObj(e) });
    }
    datetime(e) {
      var t, n;
      return "string" == typeof e
        ? this._addCheck({
            kind: "datetime",
            precision: null,
            offset: !1,
            local: !1,
            message: e,
          })
        : this._addCheck({
            kind: "datetime",
            precision:
              void 0 === (null == e ? void 0 : e.precision)
                ? null
                : null == e
                ? void 0
                : e.precision,
            offset: null != (t = null == e ? void 0 : e.offset) && t,
            local: null != (n = null == e ? void 0 : e.local) && n,
            ...w.errToObj(null == e ? void 0 : e.message),
          });
    }
    date(e) {
      return this._addCheck({ kind: "date", message: e });
    }
    time(e) {
      return "string" == typeof e
        ? this._addCheck({ kind: "time", precision: null, message: e })
        : this._addCheck({
            kind: "time",
            precision:
              void 0 === (null == e ? void 0 : e.precision)
                ? null
                : null == e
                ? void 0
                : e.precision,
            ...w.errToObj(null == e ? void 0 : e.message),
          });
    }
    duration(e) {
      return this._addCheck({ kind: "duration", ...w.errToObj(e) });
    }
    regex(e, t) {
      return this._addCheck({ kind: "regex", regex: e, ...w.errToObj(t) });
    }
    includes(e, t) {
      return this._addCheck({
        kind: "includes",
        value: e,
        position: null == t ? void 0 : t.position,
        ...w.errToObj(null == t ? void 0 : t.message),
      });
    }
    startsWith(e, t) {
      return this._addCheck({ kind: "startsWith", value: e, ...w.errToObj(t) });
    }
    endsWith(e, t) {
      return this._addCheck({ kind: "endsWith", value: e, ...w.errToObj(t) });
    }
    min(e, t) {
      return this._addCheck({ kind: "min", value: e, ...w.errToObj(t) });
    }
    max(e, t) {
      return this._addCheck({ kind: "max", value: e, ...w.errToObj(t) });
    }
    length(e, t) {
      return this._addCheck({ kind: "length", value: e, ...w.errToObj(t) });
    }
    nonempty(e) {
      return this.min(1, w.errToObj(e));
    }
    trim() {
      return new xe({
        ...this._def,
        checks: [...this._def.checks, { kind: "trim" }],
      });
    }
    toLowerCase() {
      return new xe({
        ...this._def,
        checks: [...this._def.checks, { kind: "toLowerCase" }],
      });
    }
    toUpperCase() {
      return new xe({
        ...this._def,
        checks: [...this._def.checks, { kind: "toUpperCase" }],
      });
    }
    get isDatetime() {
      return !!this._def.checks.find((e) => "datetime" === e.kind);
    }
    get isDate() {
      return !!this._def.checks.find((e) => "date" === e.kind);
    }
    get isTime() {
      return !!this._def.checks.find((e) => "time" === e.kind);
    }
    get isDuration() {
      return !!this._def.checks.find((e) => "duration" === e.kind);
    }
    get isEmail() {
      return !!this._def.checks.find((e) => "email" === e.kind);
    }
    get isURL() {
      return !!this._def.checks.find((e) => "url" === e.kind);
    }
    get isEmoji() {
      return !!this._def.checks.find((e) => "emoji" === e.kind);
    }
    get isUUID() {
      return !!this._def.checks.find((e) => "uuid" === e.kind);
    }
    get isNANOID() {
      return !!this._def.checks.find((e) => "nanoid" === e.kind);
    }
    get isCUID() {
      return !!this._def.checks.find((e) => "cuid" === e.kind);
    }
    get isCUID2() {
      return !!this._def.checks.find((e) => "cuid2" === e.kind);
    }
    get isULID() {
      return !!this._def.checks.find((e) => "ulid" === e.kind);
    }
    get isIP() {
      return !!this._def.checks.find((e) => "ip" === e.kind);
    }
    get isBase64() {
      return !!this._def.checks.find((e) => "base64" === e.kind);
    }
    get minLength() {
      let e = null;
      for (let t of this._def.checks)
        "min" === t.kind && (null === e || t.value > e) && (e = t.value);
      return e;
    }
    get maxLength() {
      let e = null;
      for (let t of this._def.checks)
        "max" === t.kind && (null === e || t.value < e) && (e = t.value);
      return e;
    }
  }
  xe.create = (e) => {
    var t;
    return new xe({
      checks: [],
      typeName: S.ZodString,
      coerce: null != (t = null == e ? void 0 : e.coerce) && t,
      ...se(e),
    });
  };
  class Se extends ae {
    constructor() {
      super(...arguments),
        (this.min = this.gte),
        (this.max = this.lte),
        (this.step = this.multipleOf);
    }
    _parse(e) {
      let t;
      if (
        (this._def.coerce && (e.data = Number(e.data)),
        this._getType(e) !== L.number)
      ) {
        let t = this._getOrReturnCtx(e);
        return (
          K(t, {
            code: j.invalid_type,
            expected: L.number,
            received: t.parsedType,
          }),
          J
        );
      }
      let n = new W();
      for (let r of this._def.checks)
        "int" === r.kind
          ? y.isInteger(e.data) ||
            (K((t = this._getOrReturnCtx(e, t)), {
              code: j.invalid_type,
              expected: "integer",
              received: "float",
              message: r.message,
            }),
            n.dirty())
          : "min" === r.kind
          ? (r.inclusive ? e.data < r.value : e.data <= r.value) &&
            (K((t = this._getOrReturnCtx(e, t)), {
              code: j.too_small,
              minimum: r.value,
              type: "number",
              inclusive: r.inclusive,
              exact: !1,
              message: r.message,
            }),
            n.dirty())
          : "max" === r.kind
          ? (r.inclusive ? e.data > r.value : e.data >= r.value) &&
            (K((t = this._getOrReturnCtx(e, t)), {
              code: j.too_big,
              maximum: r.value,
              type: "number",
              inclusive: r.inclusive,
              exact: !1,
              message: r.message,
            }),
            n.dirty())
          : "multipleOf" === r.kind
          ? 0 !==
              (function (e, t) {
                let n = (e.toString().split(".")[1] || "").length,
                  r = (t.toString().split(".")[1] || "").length,
                  o = n > r ? n : r;
                return (
                  (parseInt(e.toFixed(o).replace(".", "")) %
                    parseInt(t.toFixed(o).replace(".", ""))) /
                  Math.pow(10, o)
                );
              })(e.data, r.value) &&
            (K((t = this._getOrReturnCtx(e, t)), {
              code: j.not_multiple_of,
              multipleOf: r.value,
              message: r.message,
            }),
            n.dirty())
          : "finite" === r.kind
          ? Number.isFinite(e.data) ||
            (K((t = this._getOrReturnCtx(e, t)), {
              code: j.not_finite,
              message: r.message,
            }),
            n.dirty())
          : y.assertNever(r);
      return { status: n.value, value: e.data };
    }
    gte(e, t) {
      return this.setLimit("min", e, !0, w.toString(t));
    }
    gt(e, t) {
      return this.setLimit("min", e, !1, w.toString(t));
    }
    lte(e, t) {
      return this.setLimit("max", e, !0, w.toString(t));
    }
    lt(e, t) {
      return this.setLimit("max", e, !1, w.toString(t));
    }
    setLimit(e, t, n, r) {
      return new Se({
        ...this._def,
        checks: [
          ...this._def.checks,
          { kind: e, value: t, inclusive: n, message: w.toString(r) },
        ],
      });
    }
    _addCheck(e) {
      return new Se({ ...this._def, checks: [...this._def.checks, e] });
    }
    int(e) {
      return this._addCheck({ kind: "int", message: w.toString(e) });
    }
    positive(e) {
      return this._addCheck({
        kind: "min",
        value: 0,
        inclusive: !1,
        message: w.toString(e),
      });
    }
    negative(e) {
      return this._addCheck({
        kind: "max",
        value: 0,
        inclusive: !1,
        message: w.toString(e),
      });
    }
    nonpositive(e) {
      return this._addCheck({
        kind: "max",
        value: 0,
        inclusive: !0,
        message: w.toString(e),
      });
    }
    nonnegative(e) {
      return this._addCheck({
        kind: "min",
        value: 0,
        inclusive: !0,
        message: w.toString(e),
      });
    }
    multipleOf(e, t) {
      return this._addCheck({
        kind: "multipleOf",
        value: e,
        message: w.toString(t),
      });
    }
    finite(e) {
      return this._addCheck({ kind: "finite", message: w.toString(e) });
    }
    safe(e) {
      return this._addCheck({
        kind: "min",
        inclusive: !0,
        value: Number.MIN_SAFE_INTEGER,
        message: w.toString(e),
      })._addCheck({
        kind: "max",
        inclusive: !0,
        value: Number.MAX_SAFE_INTEGER,
        message: w.toString(e),
      });
    }
    get minValue() {
      let e = null;
      for (let t of this._def.checks)
        "min" === t.kind && (null === e || t.value > e) && (e = t.value);
      return e;
    }
    get maxValue() {
      let e = null;
      for (let t of this._def.checks)
        "max" === t.kind && (null === e || t.value < e) && (e = t.value);
      return e;
    }
    get isInt() {
      return !!this._def.checks.find(
        (e) =>
          "int" === e.kind || ("multipleOf" === e.kind && y.isInteger(e.value))
      );
    }
    get isFinite() {
      let e = null,
        t = null;
      for (let n of this._def.checks) {
        if ("finite" === n.kind || "int" === n.kind || "multipleOf" === n.kind)
          return !0;
        "min" === n.kind
          ? (null === t || n.value > t) && (t = n.value)
          : "max" === n.kind && (null === e || n.value < e) && (e = n.value);
      }
      return Number.isFinite(t) && Number.isFinite(e);
    }
  }
  Se.create = (e) =>
    new Se({
      checks: [],
      typeName: S.ZodNumber,
      coerce: (null == e ? void 0 : e.coerce) || !1,
      ...se(e),
    });
  class Ee extends ae {
    constructor() {
      super(...arguments), (this.min = this.gte), (this.max = this.lte);
    }
    _parse(e) {
      let t;
      if (
        (this._def.coerce && (e.data = BigInt(e.data)),
        this._getType(e) !== L.bigint)
      ) {
        let t = this._getOrReturnCtx(e);
        return (
          K(t, {
            code: j.invalid_type,
            expected: L.bigint,
            received: t.parsedType,
          }),
          J
        );
      }
      let n = new W();
      for (let r of this._def.checks)
        "min" === r.kind
          ? (r.inclusive ? e.data < r.value : e.data <= r.value) &&
            (K((t = this._getOrReturnCtx(e, t)), {
              code: j.too_small,
              type: "bigint",
              minimum: r.value,
              inclusive: r.inclusive,
              message: r.message,
            }),
            n.dirty())
          : "max" === r.kind
          ? (r.inclusive ? e.data > r.value : e.data >= r.value) &&
            (K((t = this._getOrReturnCtx(e, t)), {
              code: j.too_big,
              type: "bigint",
              maximum: r.value,
              inclusive: r.inclusive,
              message: r.message,
            }),
            n.dirty())
          : "multipleOf" === r.kind
          ? e.data % r.value !== BigInt(0) &&
            (K((t = this._getOrReturnCtx(e, t)), {
              code: j.not_multiple_of,
              multipleOf: r.value,
              message: r.message,
            }),
            n.dirty())
          : y.assertNever(r);
      return { status: n.value, value: e.data };
    }
    gte(e, t) {
      return this.setLimit("min", e, !0, w.toString(t));
    }
    gt(e, t) {
      return this.setLimit("min", e, !1, w.toString(t));
    }
    lte(e, t) {
      return this.setLimit("max", e, !0, w.toString(t));
    }
    lt(e, t) {
      return this.setLimit("max", e, !1, w.toString(t));
    }
    setLimit(e, t, n, r) {
      return new Ee({
        ...this._def,
        checks: [
          ...this._def.checks,
          { kind: e, value: t, inclusive: n, message: w.toString(r) },
        ],
      });
    }
    _addCheck(e) {
      return new Ee({ ...this._def, checks: [...this._def.checks, e] });
    }
    positive(e) {
      return this._addCheck({
        kind: "min",
        value: BigInt(0),
        inclusive: !1,
        message: w.toString(e),
      });
    }
    negative(e) {
      return this._addCheck({
        kind: "max",
        value: BigInt(0),
        inclusive: !1,
        message: w.toString(e),
      });
    }
    nonpositive(e) {
      return this._addCheck({
        kind: "max",
        value: BigInt(0),
        inclusive: !0,
        message: w.toString(e),
      });
    }
    nonnegative(e) {
      return this._addCheck({
        kind: "min",
        value: BigInt(0),
        inclusive: !0,
        message: w.toString(e),
      });
    }
    multipleOf(e, t) {
      return this._addCheck({
        kind: "multipleOf",
        value: e,
        message: w.toString(t),
      });
    }
    get minValue() {
      let e = null;
      for (let t of this._def.checks)
        "min" === t.kind && (null === e || t.value > e) && (e = t.value);
      return e;
    }
    get maxValue() {
      let e = null;
      for (let t of this._def.checks)
        "max" === t.kind && (null === e || t.value < e) && (e = t.value);
      return e;
    }
  }
  Ee.create = (e) => {
    var t;
    return new Ee({
      checks: [],
      typeName: S.ZodBigInt,
      coerce: null != (t = null == e ? void 0 : e.coerce) && t,
      ...se(e),
    });
  };
  class _e extends ae {
    _parse(e) {
      if (
        (this._def.coerce && (e.data = !!e.data),
        this._getType(e) !== L.boolean)
      ) {
        let t = this._getOrReturnCtx(e);
        return (
          K(t, {
            code: j.invalid_type,
            expected: L.boolean,
            received: t.parsedType,
          }),
          J
        );
      }
      return Y(e.data);
    }
  }
  _e.create = (e) =>
    new _e({
      typeName: S.ZodBoolean,
      coerce: (null == e ? void 0 : e.coerce) || !1,
      ...se(e),
    });
  class Ce extends ae {
    _parse(e) {
      let t;
      if (
        (this._def.coerce && (e.data = new Date(e.data)),
        this._getType(e) !== L.date)
      ) {
        let t = this._getOrReturnCtx(e);
        return (
          K(t, {
            code: j.invalid_type,
            expected: L.date,
            received: t.parsedType,
          }),
          J
        );
      }
      if (isNaN(e.data.getTime()))
        return K(this._getOrReturnCtx(e), { code: j.invalid_date }), J;
      let n = new W();
      for (let r of this._def.checks)
        "min" === r.kind
          ? e.data.getTime() < r.value &&
            (K((t = this._getOrReturnCtx(e, t)), {
              code: j.too_small,
              message: r.message,
              inclusive: !0,
              exact: !1,
              minimum: r.value,
              type: "date",
            }),
            n.dirty())
          : "max" === r.kind
          ? e.data.getTime() > r.value &&
            (K((t = this._getOrReturnCtx(e, t)), {
              code: j.too_big,
              message: r.message,
              inclusive: !0,
              exact: !1,
              maximum: r.value,
              type: "date",
            }),
            n.dirty())
          : y.assertNever(r);
      return { status: n.value, value: new Date(e.data.getTime()) };
    }
    _addCheck(e) {
      return new Ce({ ...this._def, checks: [...this._def.checks, e] });
    }
    min(e, t) {
      return this._addCheck({
        kind: "min",
        value: e.getTime(),
        message: w.toString(t),
      });
    }
    max(e, t) {
      return this._addCheck({
        kind: "max",
        value: e.getTime(),
        message: w.toString(t),
      });
    }
    get minDate() {
      let e = null;
      for (let t of this._def.checks)
        "min" === t.kind && (null === e || t.value > e) && (e = t.value);
      return null != e ? new Date(e) : null;
    }
    get maxDate() {
      let e = null;
      for (let t of this._def.checks)
        "max" === t.kind && (null === e || t.value < e) && (e = t.value);
      return null != e ? new Date(e) : null;
    }
  }
  Ce.create = (e) =>
    new Ce({
      checks: [],
      coerce: (null == e ? void 0 : e.coerce) || !1,
      typeName: S.ZodDate,
      ...se(e),
    });
  class Te extends ae {
    _parse(e) {
      if (this._getType(e) !== L.symbol) {
        let t = this._getOrReturnCtx(e);
        return (
          K(t, {
            code: j.invalid_type,
            expected: L.symbol,
            received: t.parsedType,
          }),
          J
        );
      }
      return Y(e.data);
    }
  }
  Te.create = (e) => new Te({ typeName: S.ZodSymbol, ...se(e) });
  class Oe extends ae {
    _parse(e) {
      if (this._getType(e) !== L.undefined) {
        let t = this._getOrReturnCtx(e);
        return (
          K(t, {
            code: j.invalid_type,
            expected: L.undefined,
            received: t.parsedType,
          }),
          J
        );
      }
      return Y(e.data);
    }
  }
  Oe.create = (e) => new Oe({ typeName: S.ZodUndefined, ...se(e) });
  class Ne extends ae {
    _parse(e) {
      if (this._getType(e) !== L.null) {
        let t = this._getOrReturnCtx(e);
        return (
          K(t, {
            code: j.invalid_type,
            expected: L.null,
            received: t.parsedType,
          }),
          J
        );
      }
      return Y(e.data);
    }
  }
  Ne.create = (e) => new Ne({ typeName: S.ZodNull, ...se(e) });
  class Ae extends ae {
    constructor() {
      super(...arguments), (this._any = !0);
    }
    _parse(e) {
      return Y(e.data);
    }
  }
  Ae.create = (e) => new Ae({ typeName: S.ZodAny, ...se(e) });
  class Me extends ae {
    constructor() {
      super(...arguments), (this._unknown = !0);
    }
    _parse(e) {
      return Y(e.data);
    }
  }
  Me.create = (e) => new Me({ typeName: S.ZodUnknown, ...se(e) });
  class De extends ae {
    _parse(e) {
      let t = this._getOrReturnCtx(e);
      return (
        K(t, {
          code: j.invalid_type,
          expected: L.never,
          received: t.parsedType,
        }),
        J
      );
    }
  }
  De.create = (e) => new De({ typeName: S.ZodNever, ...se(e) });
  class Re extends ae {
    _parse(e) {
      if (this._getType(e) !== L.undefined) {
        let t = this._getOrReturnCtx(e);
        return (
          K(t, {
            code: j.invalid_type,
            expected: L.void,
            received: t.parsedType,
          }),
          J
        );
      }
      return Y(e.data);
    }
  }
  Re.create = (e) => new Re({ typeName: S.ZodVoid, ...se(e) });
  class $e extends ae {
    _parse(e) {
      let { ctx: t, status: n } = this._processInputParams(e),
        r = this._def;
      if (t.parsedType !== L.array)
        return (
          K(t, {
            code: j.invalid_type,
            expected: L.array,
            received: t.parsedType,
          }),
          J
        );
      if (null !== r.exactLength) {
        let e = t.data.length > r.exactLength.value,
          o = t.data.length < r.exactLength.value;
        (e || o) &&
          (K(t, {
            code: e ? j.too_big : j.too_small,
            minimum: o ? r.exactLength.value : void 0,
            maximum: e ? r.exactLength.value : void 0,
            type: "array",
            inclusive: !0,
            exact: !0,
            message: r.exactLength.message,
          }),
          n.dirty());
      }
      if (
        (null !== r.minLength &&
          t.data.length < r.minLength.value &&
          (K(t, {
            code: j.too_small,
            minimum: r.minLength.value,
            type: "array",
            inclusive: !0,
            exact: !1,
            message: r.minLength.message,
          }),
          n.dirty()),
        null !== r.maxLength &&
          t.data.length > r.maxLength.value &&
          (K(t, {
            code: j.too_big,
            maximum: r.maxLength.value,
            type: "array",
            inclusive: !0,
            exact: !1,
            message: r.maxLength.message,
          }),
          n.dirty()),
        t.common.async)
      )
        return Promise.all(
          [...t.data].map((e, n) => r.type._parseAsync(new oe(t, e, t.path, n)))
        ).then((e) => W.mergeArray(n, e));
      let o = [...t.data].map((e, n) =>
        r.type._parseSync(new oe(t, e, t.path, n))
      );
      return W.mergeArray(n, o);
    }
    get element() {
      return this._def.type;
    }
    min(e, t) {
      return new $e({
        ...this._def,
        minLength: { value: e, message: w.toString(t) },
      });
    }
    max(e, t) {
      return new $e({
        ...this._def,
        maxLength: { value: e, message: w.toString(t) },
      });
    }
    length(e, t) {
      return new $e({
        ...this._def,
        exactLength: { value: e, message: w.toString(t) },
      });
    }
    nonempty(e) {
      return this.min(1, e);
    }
  }
  $e.create = (e, t) =>
    new $e({
      type: e,
      minLength: null,
      maxLength: null,
      exactLength: null,
      typeName: S.ZodArray,
      ...se(t),
    });
  class Ie extends ae {
    constructor() {
      super(...arguments),
        (this._cached = null),
        (this.nonstrict = this.passthrough),
        (this.augment = this.extend);
    }
    _getCached() {
      if (null !== this._cached) return this._cached;
      let e = this._def.shape(),
        t = y.objectKeys(e);
      return (this._cached = { shape: e, keys: t });
    }
    _parse(e) {
      if (this._getType(e) !== L.object) {
        let t = this._getOrReturnCtx(e);
        return (
          K(t, {
            code: j.invalid_type,
            expected: L.object,
            received: t.parsedType,
          }),
          J
        );
      }
      let { status: t, ctx: n } = this._processInputParams(e),
        { shape: r, keys: o } = this._getCached(),
        i = [];
      if (
        !(this._def.catchall instanceof De && "strip" === this._def.unknownKeys)
      )
        for (let e in n.data) o.includes(e) || i.push(e);
      let s = [];
      for (let e of o) {
        let t = r[e],
          o = n.data[e];
        s.push({
          key: { status: "valid", value: e },
          value: t._parse(new oe(n, o, n.path, e)),
          alwaysSet: e in n.data,
        });
      }
      if (this._def.catchall instanceof De) {
        let e = this._def.unknownKeys;
        if ("passthrough" === e)
          for (let e of i)
            s.push({
              key: { status: "valid", value: e },
              value: { status: "valid", value: n.data[e] },
            });
        else if ("strict" === e)
          i.length > 0 &&
            (K(n, { code: j.unrecognized_keys, keys: i }), t.dirty());
        else if ("strip" !== e)
          throw Error("Internal ZodObject error: invalid unknownKeys value.");
      } else {
        let e = this._def.catchall;
        for (let t of i) {
          let r = n.data[t];
          s.push({
            key: { status: "valid", value: t },
            value: e._parse(new oe(n, r, n.path, t)),
            alwaysSet: t in n.data,
          });
        }
      }
      return n.common.async
        ? Promise.resolve()
            .then(async () => {
              let e = [];
              for (let t of s) {
                let n = await t.key,
                  r = await t.value;
                e.push({ key: n, value: r, alwaysSet: t.alwaysSet });
              }
              return e;
            })
            .then((e) => W.mergeObjectSync(t, e))
        : W.mergeObjectSync(t, s);
    }
    get shape() {
      return this._def.shape();
    }
    strict(e) {
      return (
        w.errToObj,
        new Ie({
          ...this._def,
          unknownKeys: "strict",
          ...(void 0 !== e
            ? {
                errorMap: (t, n) => {
                  var r, o, i, s;
                  let a =
                    null !=
                    (i =
                      null == (o = (r = this._def).errorMap)
                        ? void 0
                        : o.call(r, t, n).message)
                      ? i
                      : n.defaultError;
                  return "unrecognized_keys" === t.code
                    ? { message: null != (s = w.errToObj(e).message) ? s : a }
                    : { message: a };
                },
              }
            : {}),
        })
      );
    }
    strip() {
      return new Ie({ ...this._def, unknownKeys: "strip" });
    }
    passthrough() {
      return new Ie({ ...this._def, unknownKeys: "passthrough" });
    }
    extend(e) {
      return new Ie({
        ...this._def,
        shape: () => ({ ...this._def.shape(), ...e }),
      });
    }
    merge(e) {
      return new Ie({
        unknownKeys: e._def.unknownKeys,
        catchall: e._def.catchall,
        shape: () => ({ ...this._def.shape(), ...e._def.shape() }),
        typeName: S.ZodObject,
      });
    }
    setKey(e, t) {
      return this.augment({ [e]: t });
    }
    catchall(e) {
      return new Ie({ ...this._def, catchall: e });
    }
    pick(e) {
      let t = {};
      return (
        y.objectKeys(e).forEach((n) => {
          e[n] && this.shape[n] && (t[n] = this.shape[n]);
        }),
        new Ie({ ...this._def, shape: () => t })
      );
    }
    omit(e) {
      let t = {};
      return (
        y.objectKeys(this.shape).forEach((n) => {
          e[n] || (t[n] = this.shape[n]);
        }),
        new Ie({ ...this._def, shape: () => t })
      );
    }
    deepPartial() {
      return (function e(t) {
        if (t instanceof Ie) {
          let n = {};
          for (let r in t.shape) {
            let o = t.shape[r];
            n[r] = Xe.create(e(o));
          }
          return new Ie({ ...t._def, shape: () => n });
        }
        return t instanceof $e
          ? new $e({ ...t._def, type: e(t.element) })
          : t instanceof Xe
          ? Xe.create(e(t.unwrap()))
          : t instanceof Qe
          ? Qe.create(e(t.unwrap()))
          : t instanceof Be
          ? Be.create(t.items.map((t) => e(t)))
          : t;
      })(this);
    }
    partial(e) {
      let t = {};
      return (
        y.objectKeys(this.shape).forEach((n) => {
          let r = this.shape[n];
          e && !e[n] ? (t[n] = r) : (t[n] = r.optional());
        }),
        new Ie({ ...this._def, shape: () => t })
      );
    }
    required(e) {
      let t = {};
      return (
        y.objectKeys(this.shape).forEach((n) => {
          if (e && !e[n]) t[n] = this.shape[n];
          else {
            let e = this.shape[n];
            for (; e instanceof Xe; ) e = e._def.innerType;
            t[n] = e;
          }
        }),
        new Ie({ ...this._def, shape: () => t })
      );
    }
    keyof() {
      return Ke(y.objectKeys(this.shape));
    }
  }
  (Ie.create = (e, t) =>
    new Ie({
      shape: () => e,
      unknownKeys: "strip",
      catchall: De.create(),
      typeName: S.ZodObject,
      ...se(t),
    })),
    (Ie.strictCreate = (e, t) =>
      new Ie({
        shape: () => e,
        unknownKeys: "strict",
        catchall: De.create(),
        typeName: S.ZodObject,
        ...se(t),
      })),
    (Ie.lazycreate = (e, t) =>
      new Ie({
        shape: e,
        unknownKeys: "strip",
        catchall: De.create(),
        typeName: S.ZodObject,
        ...se(t),
      }));
  class ze extends ae {
    _parse(e) {
      let { ctx: t } = this._processInputParams(e),
        n = this._def.options;
      if (t.common.async)
        return Promise.all(
          n.map(async (e) => {
            let n = { ...t, common: { ...t.common, issues: [] }, parent: null };
            return {
              result: await e._parseAsync({
                data: t.data,
                path: t.path,
                parent: n,
              }),
              ctx: n,
            };
          })
        ).then(function (e) {
          for (let t of e) if ("valid" === t.result.status) return t.result;
          for (let n of e)
            if ("dirty" === n.result.status)
              return t.common.issues.push(...n.ctx.common.issues), n.result;
          let n = e.map((e) => new F(e.ctx.common.issues));
          return K(t, { code: j.invalid_union, unionErrors: n }), J;
        });
      {
        let e,
          r = [];
        for (let o of n) {
          let n = { ...t, common: { ...t.common, issues: [] }, parent: null },
            i = o._parseSync({ data: t.data, path: t.path, parent: n });
          if ("valid" === i.status) return i;
          "dirty" !== i.status || e || (e = { result: i, ctx: n }),
            n.common.issues.length && r.push(n.common.issues);
        }
        if (e) return t.common.issues.push(...e.ctx.common.issues), e.result;
        let o = r.map((e) => new F(e));
        return K(t, { code: j.invalid_union, unionErrors: o }), J;
      }
    }
    get options() {
      return this._def.options;
    }
  }
  ze.create = (e, t) => new ze({ options: e, typeName: S.ZodUnion, ...se(t) });
  let Pe = (e) =>
    e instanceof qe
      ? Pe(e.schema)
      : e instanceof Ye
      ? Pe(e.innerType())
      : e instanceof He
      ? [e.value]
      : e instanceof We
      ? e.options
      : e instanceof Je
      ? y.objectValues(e.enum)
      : e instanceof et
      ? Pe(e._def.innerType)
      : e instanceof Oe
      ? [void 0]
      : e instanceof Ne
      ? [null]
      : e instanceof Xe
      ? [void 0, ...Pe(e.unwrap())]
      : e instanceof Qe
      ? [null, ...Pe(e.unwrap())]
      : e instanceof ot || e instanceof st
      ? Pe(e.unwrap())
      : e instanceof tt
      ? Pe(e._def.innerType)
      : [];
  class Ve extends ae {
    _parse(e) {
      let { ctx: t } = this._processInputParams(e);
      if (t.parsedType !== L.object)
        return (
          K(t, {
            code: j.invalid_type,
            expected: L.object,
            received: t.parsedType,
          }),
          J
        );
      let n = this.discriminator,
        r = t.data[n],
        o = this.optionsMap.get(r);
      return o
        ? t.common.async
          ? o._parseAsync({ data: t.data, path: t.path, parent: t })
          : o._parseSync({ data: t.data, path: t.path, parent: t })
        : (K(t, {
            code: j.invalid_union_discriminator,
            options: Array.from(this.optionsMap.keys()),
            path: [n],
          }),
          J);
    }
    get discriminator() {
      return this._def.discriminator;
    }
    get options() {
      return this._def.options;
    }
    get optionsMap() {
      return this._def.optionsMap;
    }
    static create(e, t, n) {
      let r = new Map();
      for (let n of t) {
        let t = Pe(n.shape[e]);
        if (!t.length)
          throw Error(
            `A discriminator value for key \`${e}\` could not be extracted from all schema options`
          );
        for (let o of t) {
          if (r.has(o))
            throw Error(
              `Discriminator property ${String(e)} has duplicate value ${String(
                o
              )}`
            );
          r.set(o, n);
        }
      }
      return new Ve({
        typeName: S.ZodDiscriminatedUnion,
        discriminator: e,
        options: t,
        optionsMap: r,
        ...se(n),
      });
    }
  }
  class Le extends ae {
    _parse(e) {
      let { status: t, ctx: n } = this._processInputParams(e),
        r = (e, r) => {
          if (X(e) || X(r)) return J;
          let o = (function e(t, n) {
            let r = B(t),
              o = B(n);
            if (t === n) return { valid: !0, data: t };
            if (r === L.object && o === L.object) {
              let r = y.objectKeys(n),
                o = y.objectKeys(t).filter((e) => -1 !== r.indexOf(e)),
                i = { ...t, ...n };
              for (let r of o) {
                let o = e(t[r], n[r]);
                if (!o.valid) return { valid: !1 };
                i[r] = o.data;
              }
              return { valid: !0, data: i };
            }
            if (r === L.array && o === L.array) {
              if (t.length !== n.length) return { valid: !1 };
              let r = [];
              for (let o = 0; o < t.length; o++) {
                let i = e(t[o], n[o]);
                if (!i.valid) return { valid: !1 };
                r.push(i.data);
              }
              return { valid: !0, data: r };
            }
            return r === L.date && o === L.date && +t == +n
              ? { valid: !0, data: t }
              : { valid: !1 };
          })(e.value, r.value);
          return o.valid
            ? ((Q(e) || Q(r)) && t.dirty(), { status: t.value, value: o.data })
            : (K(n, { code: j.invalid_intersection_types }), J);
        };
      return n.common.async
        ? Promise.all([
            this._def.left._parseAsync({
              data: n.data,
              path: n.path,
              parent: n,
            }),
            this._def.right._parseAsync({
              data: n.data,
              path: n.path,
              parent: n,
            }),
          ]).then(([e, t]) => r(e, t))
        : r(
            this._def.left._parseSync({
              data: n.data,
              path: n.path,
              parent: n,
            }),
            this._def.right._parseSync({
              data: n.data,
              path: n.path,
              parent: n,
            })
          );
    }
  }
  Le.create = (e, t, n) =>
    new Le({ left: e, right: t, typeName: S.ZodIntersection, ...se(n) });
  class Be extends ae {
    _parse(e) {
      let { status: t, ctx: n } = this._processInputParams(e);
      if (n.parsedType !== L.array)
        return (
          K(n, {
            code: j.invalid_type,
            expected: L.array,
            received: n.parsedType,
          }),
          J
        );
      if (n.data.length < this._def.items.length)
        return (
          K(n, {
            code: j.too_small,
            minimum: this._def.items.length,
            inclusive: !0,
            exact: !1,
            type: "array",
          }),
          J
        );
      !this._def.rest &&
        n.data.length > this._def.items.length &&
        (K(n, {
          code: j.too_big,
          maximum: this._def.items.length,
          inclusive: !0,
          exact: !1,
          type: "array",
        }),
        t.dirty());
      let r = [...n.data]
        .map((e, t) => {
          let r = this._def.items[t] || this._def.rest;
          return r ? r._parse(new oe(n, e, n.path, t)) : null;
        })
        .filter((e) => !!e);
      return n.common.async
        ? Promise.all(r).then((e) => W.mergeArray(t, e))
        : W.mergeArray(t, r);
    }
    get items() {
      return this._def.items;
    }
    rest(e) {
      return new Be({ ...this._def, rest: e });
    }
  }
  Be.create = (e, t) => {
    if (!Array.isArray(e))
      throw Error("You must pass an array of schemas to z.tuple([ ... ])");
    return new Be({ items: e, typeName: S.ZodTuple, rest: null, ...se(t) });
  };
  class je extends ae {
    get keySchema() {
      return this._def.keyType;
    }
    get valueSchema() {
      return this._def.valueType;
    }
    _parse(e) {
      let { status: t, ctx: n } = this._processInputParams(e);
      if (n.parsedType !== L.object)
        return (
          K(n, {
            code: j.invalid_type,
            expected: L.object,
            received: n.parsedType,
          }),
          J
        );
      let r = [],
        o = this._def.keyType,
        i = this._def.valueType;
      for (let e in n.data)
        r.push({
          key: o._parse(new oe(n, e, n.path, e)),
          value: i._parse(new oe(n, n.data[e], n.path, e)),
          alwaysSet: e in n.data,
        });
      return n.common.async
        ? W.mergeObjectAsync(t, r)
        : W.mergeObjectSync(t, r);
    }
    get element() {
      return this._def.valueType;
    }
    static create(e, t, n) {
      return new je(
        t instanceof ae
          ? { keyType: e, valueType: t, typeName: S.ZodRecord, ...se(n) }
          : {
              keyType: xe.create(),
              valueType: e,
              typeName: S.ZodRecord,
              ...se(t),
            }
      );
    }
  }
  class Fe extends ae {
    get keySchema() {
      return this._def.keyType;
    }
    get valueSchema() {
      return this._def.valueType;
    }
    _parse(e) {
      let { status: t, ctx: n } = this._processInputParams(e);
      if (n.parsedType !== L.map)
        return (
          K(n, {
            code: j.invalid_type,
            expected: L.map,
            received: n.parsedType,
          }),
          J
        );
      let r = this._def.keyType,
        o = this._def.valueType,
        i = [...n.data.entries()].map(([e, t], i) => ({
          key: r._parse(new oe(n, e, n.path, [i, "key"])),
          value: o._parse(new oe(n, t, n.path, [i, "value"])),
        }));
      if (n.common.async) {
        let e = new Map();
        return Promise.resolve().then(async () => {
          for (let n of i) {
            let r = await n.key,
              o = await n.value;
            if ("aborted" === r.status || "aborted" === o.status) return J;
            ("dirty" === r.status || "dirty" === o.status) && t.dirty(),
              e.set(r.value, o.value);
          }
          return { status: t.value, value: e };
        });
      }
      {
        let e = new Map();
        for (let n of i) {
          let r = n.key,
            o = n.value;
          if ("aborted" === r.status || "aborted" === o.status) return J;
          ("dirty" === r.status || "dirty" === o.status) && t.dirty(),
            e.set(r.value, o.value);
        }
        return { status: t.value, value: e };
      }
    }
  }
  Fe.create = (e, t, n) =>
    new Fe({ valueType: t, keyType: e, typeName: S.ZodMap, ...se(n) });
  class Ue extends ae {
    _parse(e) {
      let { status: t, ctx: n } = this._processInputParams(e);
      if (n.parsedType !== L.set)
        return (
          K(n, {
            code: j.invalid_type,
            expected: L.set,
            received: n.parsedType,
          }),
          J
        );
      let r = this._def;
      null !== r.minSize &&
        n.data.size < r.minSize.value &&
        (K(n, {
          code: j.too_small,
          minimum: r.minSize.value,
          type: "set",
          inclusive: !0,
          exact: !1,
          message: r.minSize.message,
        }),
        t.dirty()),
        null !== r.maxSize &&
          n.data.size > r.maxSize.value &&
          (K(n, {
            code: j.too_big,
            maximum: r.maxSize.value,
            type: "set",
            inclusive: !0,
            exact: !1,
            message: r.maxSize.message,
          }),
          t.dirty());
      let o = this._def.valueType;
      function i(e) {
        let n = new Set();
        for (let r of e) {
          if ("aborted" === r.status) return J;
          "dirty" === r.status && t.dirty(), n.add(r.value);
        }
        return { status: t.value, value: n };
      }
      let s = [...n.data.values()].map((e, t) =>
        o._parse(new oe(n, e, n.path, t))
      );
      return n.common.async ? Promise.all(s).then((e) => i(e)) : i(s);
    }
    min(e, t) {
      return new Ue({
        ...this._def,
        minSize: { value: e, message: w.toString(t) },
      });
    }
    max(e, t) {
      return new Ue({
        ...this._def,
        maxSize: { value: e, message: w.toString(t) },
      });
    }
    size(e, t) {
      return this.min(e, t).max(e, t);
    }
    nonempty(e) {
      return this.min(1, e);
    }
  }
  Ue.create = (e, t) =>
    new Ue({
      valueType: e,
      minSize: null,
      maxSize: null,
      typeName: S.ZodSet,
      ...se(t),
    });
  class Ze extends ae {
    constructor() {
      super(...arguments), (this.validate = this.implement);
    }
    _parse(e) {
      let { ctx: t } = this._processInputParams(e);
      if (t.parsedType !== L.function)
        return (
          K(t, {
            code: j.invalid_type,
            expected: L.function,
            received: t.parsedType,
          }),
          J
        );
      function n(e, n) {
        return H({
          data: e,
          path: t.path,
          errorMaps: [
            t.common.contextualErrorMap,
            t.schemaErrorMap,
            q(),
            U,
          ].filter((e) => !!e),
          issueData: { code: j.invalid_arguments, argumentsError: n },
        });
      }
      function r(e, n) {
        return H({
          data: e,
          path: t.path,
          errorMaps: [
            t.common.contextualErrorMap,
            t.schemaErrorMap,
            q(),
            U,
          ].filter((e) => !!e),
          issueData: { code: j.invalid_return_type, returnTypeError: n },
        });
      }
      let o = { errorMap: t.common.contextualErrorMap },
        i = t.data;
      if (this._def.returns instanceof Ge) {
        let e = this;
        return Y(async function (...t) {
          let s = new F([]),
            a = await e._def.args.parseAsync(t, o).catch((e) => {
              throw (s.addIssue(n(t, e)), s);
            }),
            l = await Reflect.apply(i, this, a);
          return await e._def.returns._def.type.parseAsync(l, o).catch((e) => {
            throw (s.addIssue(r(l, e)), s);
          });
        });
      }
      {
        let e = this;
        return Y(function (...t) {
          let s = e._def.args.safeParse(t, o);
          if (!s.success) throw new F([n(t, s.error)]);
          let a = Reflect.apply(i, this, s.data),
            l = e._def.returns.safeParse(a, o);
          if (!l.success) throw new F([r(a, l.error)]);
          return l.data;
        });
      }
    }
    parameters() {
      return this._def.args;
    }
    returnType() {
      return this._def.returns;
    }
    args(...e) {
      return new Ze({ ...this._def, args: Be.create(e).rest(Me.create()) });
    }
    returns(e) {
      return new Ze({ ...this._def, returns: e });
    }
    implement(e) {
      return this.parse(e);
    }
    strictImplement(e) {
      return this.parse(e);
    }
    static create(e, t, n) {
      return new Ze({
        args: e || Be.create([]).rest(Me.create()),
        returns: t || Me.create(),
        typeName: S.ZodFunction,
        ...se(n),
      });
    }
  }
  class qe extends ae {
    get schema() {
      return this._def.getter();
    }
    _parse(e) {
      let { ctx: t } = this._processInputParams(e);
      return this._def
        .getter()
        ._parse({ data: t.data, path: t.path, parent: t });
    }
  }
  qe.create = (e, t) => new qe({ getter: e, typeName: S.ZodLazy, ...se(t) });
  class He extends ae {
    _parse(e) {
      if (e.data !== this._def.value) {
        let t = this._getOrReturnCtx(e);
        return (
          K(t, {
            received: t.data,
            code: j.invalid_literal,
            expected: this._def.value,
          }),
          J
        );
      }
      return { status: "valid", value: e.data };
    }
    get value() {
      return this._def.value;
    }
  }
  function Ke(e, t) {
    return new We({ values: e, typeName: S.ZodEnum, ...se(t) });
  }
  He.create = (e, t) => new He({ value: e, typeName: S.ZodLiteral, ...se(t) });
  class We extends ae {
    constructor() {
      super(...arguments), k.set(this, void 0);
    }
    _parse(e) {
      if ("string" != typeof e.data) {
        let t = this._getOrReturnCtx(e),
          n = this._def.values;
        return (
          K(t, {
            expected: y.joinValues(n),
            received: t.parsedType,
            code: j.invalid_type,
          }),
          J
        );
      }
      if (
        (ne(this, k, "f") || re(this, k, new Set(this._def.values), "f"),
        !ne(this, k, "f").has(e.data))
      ) {
        let t = this._getOrReturnCtx(e),
          n = this._def.values;
        return (
          K(t, { received: t.data, code: j.invalid_enum_value, options: n }), J
        );
      }
      return Y(e.data);
    }
    get options() {
      return this._def.values;
    }
    get enum() {
      let e = {};
      for (let t of this._def.values) e[t] = t;
      return e;
    }
    get Values() {
      let e = {};
      for (let t of this._def.values) e[t] = t;
      return e;
    }
    get Enum() {
      let e = {};
      for (let t of this._def.values) e[t] = t;
      return e;
    }
    extract(e, t = this._def) {
      return We.create(e, { ...this._def, ...t });
    }
    exclude(e, t = this._def) {
      return We.create(
        this.options.filter((t) => !e.includes(t)),
        { ...this._def, ...t }
      );
    }
  }
  (k = new WeakMap()), (We.create = Ke);
  class Je extends ae {
    constructor() {
      super(...arguments), x.set(this, void 0);
    }
    _parse(e) {
      let t = y.getValidEnumValues(this._def.values),
        n = this._getOrReturnCtx(e);
      if (n.parsedType !== L.string && n.parsedType !== L.number) {
        let e = y.objectValues(t);
        return (
          K(n, {
            expected: y.joinValues(e),
            received: n.parsedType,
            code: j.invalid_type,
          }),
          J
        );
      }
      if (
        (ne(this, x, "f") ||
          re(this, x, new Set(y.getValidEnumValues(this._def.values)), "f"),
        !ne(this, x, "f").has(e.data))
      ) {
        let e = y.objectValues(t);
        return (
          K(n, { received: n.data, code: j.invalid_enum_value, options: e }), J
        );
      }
      return Y(e.data);
    }
    get enum() {
      return this._def.values;
    }
  }
  (x = new WeakMap()),
    (Je.create = (e, t) =>
      new Je({ values: e, typeName: S.ZodNativeEnum, ...se(t) }));
  class Ge extends ae {
    unwrap() {
      return this._def.type;
    }
    _parse(e) {
      let { ctx: t } = this._processInputParams(e);
      return t.parsedType !== L.promise && !1 === t.common.async
        ? (K(t, {
            code: j.invalid_type,
            expected: L.promise,
            received: t.parsedType,
          }),
          J)
        : Y(
            (t.parsedType === L.promise
              ? t.data
              : Promise.resolve(t.data)
            ).then((e) =>
              this._def.type.parseAsync(e, {
                path: t.path,
                errorMap: t.common.contextualErrorMap,
              })
            )
          );
    }
  }
  Ge.create = (e, t) => new Ge({ type: e, typeName: S.ZodPromise, ...se(t) });
  class Ye extends ae {
    innerType() {
      return this._def.schema;
    }
    sourceType() {
      return this._def.schema._def.typeName === S.ZodEffects
        ? this._def.schema.sourceType()
        : this._def.schema;
    }
    _parse(e) {
      let { status: t, ctx: n } = this._processInputParams(e),
        r = this._def.effect || null,
        o = {
          addIssue: (e) => {
            K(n, e), e.fatal ? t.abort() : t.dirty();
          },
          get path() {
            return n.path;
          },
        };
      if (((o.addIssue = o.addIssue.bind(o)), "preprocess" === r.type)) {
        let e = r.transform(n.data, o);
        if (n.common.async)
          return Promise.resolve(e).then(async (e) => {
            if ("aborted" === t.value) return J;
            let r = await this._def.schema._parseAsync({
              data: e,
              path: n.path,
              parent: n,
            });
            return "aborted" === r.status
              ? J
              : "dirty" === r.status || "dirty" === t.value
              ? G(r.value)
              : r;
          });
        {
          if ("aborted" === t.value) return J;
          let r = this._def.schema._parseSync({
            data: e,
            path: n.path,
            parent: n,
          });
          return "aborted" === r.status
            ? J
            : "dirty" === r.status || "dirty" === t.value
            ? G(r.value)
            : r;
        }
      }
      if ("refinement" === r.type) {
        let e = (e) => {
          let t = r.refinement(e, o);
          if (n.common.async) return Promise.resolve(t);
          if (t instanceof Promise)
            throw Error(
              "Async refinement encountered during synchronous parse operation. Use .parseAsync instead."
            );
          return e;
        };
        if (!1 !== n.common.async)
          return this._def.schema
            ._parseAsync({ data: n.data, path: n.path, parent: n })
            .then((n) =>
              "aborted" === n.status
                ? J
                : ("dirty" === n.status && t.dirty(),
                  e(n.value).then(() => ({ status: t.value, value: n.value })))
            );
        {
          let r = this._def.schema._parseSync({
            data: n.data,
            path: n.path,
            parent: n,
          });
          return "aborted" === r.status
            ? J
            : ("dirty" === r.status && t.dirty(),
              e(r.value),
              { status: t.value, value: r.value });
        }
      }
      if ("transform" === r.type) {
        if (!1 !== n.common.async)
          return this._def.schema
            ._parseAsync({ data: n.data, path: n.path, parent: n })
            .then((e) =>
              ee(e)
                ? Promise.resolve(r.transform(e.value, o)).then((e) => ({
                    status: t.value,
                    value: e,
                  }))
                : e
            );
        {
          let e = this._def.schema._parseSync({
            data: n.data,
            path: n.path,
            parent: n,
          });
          if (!ee(e)) return e;
          let i = r.transform(e.value, o);
          if (i instanceof Promise)
            throw Error(
              "Asynchronous transform encountered during synchronous parse operation. Use .parseAsync instead."
            );
          return { status: t.value, value: i };
        }
      }
      y.assertNever(r);
    }
  }
  (Ye.create = (e, t, n) =>
    new Ye({ schema: e, typeName: S.ZodEffects, effect: t, ...se(n) })),
    (Ye.createWithPreprocess = (e, t, n) =>
      new Ye({
        schema: t,
        effect: { type: "preprocess", transform: e },
        typeName: S.ZodEffects,
        ...se(n),
      }));
  class Xe extends ae {
    _parse(e) {
      return this._getType(e) === L.undefined
        ? Y(void 0)
        : this._def.innerType._parse(e);
    }
    unwrap() {
      return this._def.innerType;
    }
  }
  Xe.create = (e, t) =>
    new Xe({ innerType: e, typeName: S.ZodOptional, ...se(t) });
  class Qe extends ae {
    _parse(e) {
      return this._getType(e) === L.null
        ? Y(null)
        : this._def.innerType._parse(e);
    }
    unwrap() {
      return this._def.innerType;
    }
  }
  Qe.create = (e, t) =>
    new Qe({ innerType: e, typeName: S.ZodNullable, ...se(t) });
  class et extends ae {
    _parse(e) {
      let { ctx: t } = this._processInputParams(e),
        n = t.data;
      return (
        t.parsedType === L.undefined && (n = this._def.defaultValue()),
        this._def.innerType._parse({ data: n, path: t.path, parent: t })
      );
    }
    removeDefault() {
      return this._def.innerType;
    }
  }
  et.create = (e, t) =>
    new et({
      innerType: e,
      typeName: S.ZodDefault,
      defaultValue:
        "function" == typeof t.default ? t.default : () => t.default,
      ...se(t),
    });
  class tt extends ae {
    _parse(e) {
      let { ctx: t } = this._processInputParams(e),
        n = { ...t, common: { ...t.common, issues: [] } },
        r = this._def.innerType._parse({
          data: n.data,
          path: n.path,
          parent: { ...n },
        });
      return te(r)
        ? r.then((e) => ({
            status: "valid",
            value:
              "valid" === e.status
                ? e.value
                : this._def.catchValue({
                    get error() {
                      return new F(n.common.issues);
                    },
                    input: n.data,
                  }),
          }))
        : {
            status: "valid",
            value:
              "valid" === r.status
                ? r.value
                : this._def.catchValue({
                    get error() {
                      return new F(n.common.issues);
                    },
                    input: n.data,
                  }),
          };
    }
    removeCatch() {
      return this._def.innerType;
    }
  }
  tt.create = (e, t) =>
    new tt({
      innerType: e,
      typeName: S.ZodCatch,
      catchValue: "function" == typeof t.catch ? t.catch : () => t.catch,
      ...se(t),
    });
  class nt extends ae {
    _parse(e) {
      if (this._getType(e) !== L.nan) {
        let t = this._getOrReturnCtx(e);
        return (
          K(t, {
            code: j.invalid_type,
            expected: L.nan,
            received: t.parsedType,
          }),
          J
        );
      }
      return { status: "valid", value: e.data };
    }
  }
  nt.create = (e) => new nt({ typeName: S.ZodNaN, ...se(e) });
  let rt = Symbol("zod_brand");
  class ot extends ae {
    _parse(e) {
      let { ctx: t } = this._processInputParams(e),
        n = t.data;
      return this._def.type._parse({ data: n, path: t.path, parent: t });
    }
    unwrap() {
      return this._def.type;
    }
  }
  class it extends ae {
    _parse(e) {
      let { status: t, ctx: n } = this._processInputParams(e);
      if (n.common.async)
        return (async () => {
          let e = await this._def.in._parseAsync({
            data: n.data,
            path: n.path,
            parent: n,
          });
          return "aborted" === e.status
            ? J
            : "dirty" === e.status
            ? (t.dirty(), G(e.value))
            : this._def.out._parseAsync({
                data: e.value,
                path: n.path,
                parent: n,
              });
        })();
      {
        let e = this._def.in._parseSync({
          data: n.data,
          path: n.path,
          parent: n,
        });
        return "aborted" === e.status
          ? J
          : "dirty" === e.status
          ? (t.dirty(), { status: "dirty", value: e.value })
          : this._def.out._parseSync({
              data: e.value,
              path: n.path,
              parent: n,
            });
      }
    }
    static create(e, t) {
      return new it({ in: e, out: t, typeName: S.ZodPipeline });
    }
  }
  class st extends ae {
    _parse(e) {
      let t = this._def.innerType._parse(e),
        n = (e) => (ee(e) && (e.value = Object.freeze(e.value)), e);
      return te(t) ? t.then((e) => n(e)) : n(t);
    }
    unwrap() {
      return this._def.innerType;
    }
  }
  function at(e, t = {}, n) {
    return e
      ? Ae.create().superRefine((r, o) => {
          var i, s;
          if (!e(r)) {
            let e =
                "function" == typeof t
                  ? t(r)
                  : "string" == typeof t
                  ? { message: t }
                  : t,
              a = null == (s = null != (i = e.fatal) ? i : n) || s,
              l = "string" == typeof e ? { message: e } : e;
            o.addIssue({ code: "custom", ...l, fatal: a });
          }
        })
      : Ae.create();
  }
  st.create = (e, t) =>
    new st({ innerType: e, typeName: S.ZodReadonly, ...se(t) });
  let lt = { object: Ie.lazycreate };
  !(function (e) {
    (e.ZodString = "ZodString"),
      (e.ZodNumber = "ZodNumber"),
      (e.ZodNaN = "ZodNaN"),
      (e.ZodBigInt = "ZodBigInt"),
      (e.ZodBoolean = "ZodBoolean"),
      (e.ZodDate = "ZodDate"),
      (e.ZodSymbol = "ZodSymbol"),
      (e.ZodUndefined = "ZodUndefined"),
      (e.ZodNull = "ZodNull"),
      (e.ZodAny = "ZodAny"),
      (e.ZodUnknown = "ZodUnknown"),
      (e.ZodNever = "ZodNever"),
      (e.ZodVoid = "ZodVoid"),
      (e.ZodArray = "ZodArray"),
      (e.ZodObject = "ZodObject"),
      (e.ZodUnion = "ZodUnion"),
      (e.ZodDiscriminatedUnion = "ZodDiscriminatedUnion"),
      (e.ZodIntersection = "ZodIntersection"),
      (e.ZodTuple = "ZodTuple"),
      (e.ZodRecord = "ZodRecord"),
      (e.ZodMap = "ZodMap"),
      (e.ZodSet = "ZodSet"),
      (e.ZodFunction = "ZodFunction"),
      (e.ZodLazy = "ZodLazy"),
      (e.ZodLiteral = "ZodLiteral"),
      (e.ZodEnum = "ZodEnum"),
      (e.ZodEffects = "ZodEffects"),
      (e.ZodNativeEnum = "ZodNativeEnum"),
      (e.ZodOptional = "ZodOptional"),
      (e.ZodNullable = "ZodNullable"),
      (e.ZodDefault = "ZodDefault"),
      (e.ZodCatch = "ZodCatch"),
      (e.ZodPromise = "ZodPromise"),
      (e.ZodBranded = "ZodBranded"),
      (e.ZodPipeline = "ZodPipeline"),
      (e.ZodReadonly = "ZodReadonly");
  })(S || (S = {}));
  let ct = xe.create,
    dt = Se.create,
    ut = nt.create,
    ht = Ee.create,
    pt = _e.create,
    ft = Ce.create,
    mt = Te.create,
    gt = Oe.create,
    vt = Ne.create,
    yt = Ae.create,
    bt = Me.create,
    wt = De.create,
    kt = Re.create,
    xt = $e.create,
    St = Ie.create,
    Et = Ie.strictCreate,
    _t = ze.create,
    Ct = Ve.create,
    Tt = Le.create,
    Ot = Be.create,
    Nt = je.create,
    At = Fe.create,
    Mt = Ue.create,
    Dt = Ze.create,
    Rt = qe.create,
    $t = He.create,
    It = We.create,
    zt = Je.create,
    Pt = Ge.create,
    Vt = Ye.create,
    Lt = Xe.create,
    Bt = Qe.create,
    jt = Ye.createWithPreprocess,
    Ft = it.create;
  var Ut = Object.freeze({
    __proto__: null,
    defaultErrorMap: U,
    setErrorMap: function (e) {
      Z = e;
    },
    getErrorMap: q,
    makeIssue: H,
    EMPTY_PATH: [],
    addIssueToContext: K,
    ParseStatus: W,
    INVALID: J,
    DIRTY: G,
    OK: Y,
    isAborted: X,
    isDirty: Q,
    isValid: ee,
    isAsync: te,
    get util() {
      return y;
    },
    get objectUtil() {
      return b;
    },
    ZodParsedType: L,
    getParsedType: B,
    ZodType: ae,
    datetimeRegex: ke,
    ZodString: xe,
    ZodNumber: Se,
    ZodBigInt: Ee,
    ZodBoolean: _e,
    ZodDate: Ce,
    ZodSymbol: Te,
    ZodUndefined: Oe,
    ZodNull: Ne,
    ZodAny: Ae,
    ZodUnknown: Me,
    ZodNever: De,
    ZodVoid: Re,
    ZodArray: $e,
    ZodObject: Ie,
    ZodUnion: ze,
    ZodDiscriminatedUnion: Ve,
    ZodIntersection: Le,
    ZodTuple: Be,
    ZodRecord: je,
    ZodMap: Fe,
    ZodSet: Ue,
    ZodFunction: Ze,
    ZodLazy: qe,
    ZodLiteral: He,
    ZodEnum: We,
    ZodNativeEnum: Je,
    ZodPromise: Ge,
    ZodEffects: Ye,
    ZodTransformer: Ye,
    ZodOptional: Xe,
    ZodNullable: Qe,
    ZodDefault: et,
    ZodCatch: tt,
    ZodNaN: nt,
    BRAND: rt,
    ZodBranded: ot,
    ZodPipeline: it,
    ZodReadonly: st,
    custom: at,
    Schema: ae,
    ZodSchema: ae,
    late: lt,
    get ZodFirstPartyTypeKind() {
      return S;
    },
    coerce: {
      string: (e) => xe.create({ ...e, coerce: !0 }),
      number: (e) => Se.create({ ...e, coerce: !0 }),
      boolean: (e) => _e.create({ ...e, coerce: !0 }),
      bigint: (e) => Ee.create({ ...e, coerce: !0 }),
      date: (e) => Ce.create({ ...e, coerce: !0 }),
    },
    any: yt,
    array: xt,
    bigint: ht,
    boolean: pt,
    date: ft,
    discriminatedUnion: Ct,
    effect: Vt,
    enum: It,
    function: Dt,
    instanceof: (e, t = { message: `Input not instance of ${e.name}` }) =>
      at((t) => t instanceof e, t),
    intersection: Tt,
    lazy: Rt,
    literal: $t,
    map: At,
    nan: ut,
    nativeEnum: zt,
    never: wt,
    null: vt,
    nullable: Bt,
    number: dt,
    object: St,
    oboolean: () => pt().optional(),
    onumber: () => dt().optional(),
    optional: Lt,
    ostring: () => ct().optional(),
    pipeline: Ft,
    preprocess: jt,
    promise: Pt,
    record: Nt,
    set: Mt,
    strictObject: Et,
    string: ct,
    symbol: mt,
    transformer: Vt,
    tuple: Ot,
    undefined: gt,
    union: _t,
    unknown: bt,
    void: kt,
    NEVER: J,
    ZodIssueCode: j,
    quotelessJson: (e) =>
      JSON.stringify(e, null, 2).replace(/"([^"]+)":/g, "$1:"),
    ZodError: F,
  });
  let Zt = Ut.enum(["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]),
    qt = Ut.enum([
      "a",
      "b",
      "c",
      "d",
      "e",
      "f",
      "g",
      "h",
      "i",
      "j",
      "k",
      "l",
      "m",
      "n",
      "o",
      "p",
      "q",
      "r",
      "s",
      "t",
      "u",
      "v",
      "w",
      "x",
      "y",
      "z",
    ]),
    Ht = Ut.enum([
      "minus",
      "equal",
      "bracketleft",
      "bracketright",
      "backslash",
      "semicolon",
      "quote",
      "comma",
      "period",
      "slash",
      "backquote",
      "enter",
      "escape",
      "backspace",
      "tab",
      "insert",
      "home",
      "end",
      "pageup",
      "pagedown",
      "delete",
      "arrowup",
      "arrowdown",
      "arrowleft",
      "arrowright",
    ]),
    Kt = Ut.enum([
      "shift+ctrl+",
      "shift+alt+",
      "shift+cmd+",
      "ctrl+alt+",
      "ctrl+cmd+",
      "alt+cmd+",
      "shift+ctrl+alt+",
      "shift+ctrl+cmd+",
      "shift+alt+cmd+",
      "ctrl+alt+cmd+",
      "shift+ctrl+alt+cmd+",
      "shift+",
      "ctrl+",
      "alt+",
      "cmd+",
      "",
    ]),
    Wt = "urn:adobe:aue:",
    Jt = `meta[name^='${Wt}']`,
    Gt = `meta[name='${Wt}config:namespace']`,
    Yt =
      (V.TYPE,
      {
        URN_PREFIX: Wt,
        META_SELECTOR: Jt,
        META_NAMESPACE: Gt,
        USER_INPUT_RELAY_MESSAGE: "REMOTE_APP_USER_INPUT",
        DEFAULT_PREFIX: "data-aue-",
        COMPONENT_ITEM_TYPE: "component",
        RTE_URL:
          "https://cdn.experience.adobe.net/solutions/CQ-aem-headless-rte/assets/tinymce-684/js/tinymce/tinymce.min.js",
        EVENT_APP_INITIALIZED: "aue:initialized",
        EVENT_UI_SELECT: "aue:ui-select",
        EVENT_UI_PREVIEW: "aue:ui-preview",
        EVENT_UI_EDIT: "aue:ui-edit",
        EVENT_CONTENT_MOVE: "aue:content-move",
        EVENT_CONTENT_ADD: "aue:content-add",
        EVENT_CONTENT_COPY: "aue:content-copy",
        EVENT_CONTENT_PATCH: "aue:content-patch",
        EVENT_CONTENT_REMOVE: "aue:content-remove",
        EVENT_CONTENT_UPDATE: "aue:content-update",
      });
  Kt.options, Zt.options, qt.options, Ht.options;
  var Xt;
  function Qt(e, t, n) {
    function r() {
      var c = Date.now() - a;
      c < t && c >= 0
        ? (o = setTimeout(r, t - c))
        : ((o = null), n || ((l = e.apply(s, i)), (s = i = null)));
    }
    null == t && (t = 100);
    var o,
      i,
      s,
      a,
      l,
      c = function () {
        (s = this), (i = arguments), (a = Date.now());
        var c = n && !o;
        return (
          o || (o = setTimeout(r, t)),
          c && ((l = e.apply(s, i)), (s = i = null)),
          l
        );
      };
    return (
      (c.clear = function () {
        o && (clearTimeout(o), (o = null));
      }),
      (c.flush = function () {
        o && ((l = e.apply(s, i)), (s = i = null), clearTimeout(o), (o = null));
      }),
      c
    );
  }
  (Qt.debounce = Qt), (Xt = Qt);
  let en = { element: window.document },
    tn = (e = Yt.DEFAULT_PREFIX) => {
      let t = {};
      for (let n in V) t[n] = `${e}${V[n]}`;
      return t;
    },
    nn = (e, t) => {
      var n;
      if (!(e && e instanceof HTMLElement && t)) return "";
      let r = "";
      return (
        t === v.TEXT
          ? (r = e.textContent || e.innerText)
          : t === v.RICHTEXT
          ? (r = e.innerHTML)
          : t === v.MEDIA && (r = null != (n = e.getAttribute("src")) ? n : ""),
        r
      );
    },
    rn = ({ element: e, callback: t, config: n }) => {
      let r = new MutationObserver(t);
      return (
        r.observe(
          e,
          null != n
            ? n
            : {
                attributes: !0,
                characterData: !0,
                childList: !0,
                subtree: !0,
                attributeOldValue: !0,
                characterDataOldValue: !0,
              }
        ),
        r.disconnect
      );
    };
  var on =
    /^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i;
  let sn = [];
  for (let e = 0; e < 256; ++e) sn.push((e + 256).toString(16).slice(1));
  function an(e, t) {
    return (e << t) | (e >>> (32 - t));
  }
  let ln = (function () {
      function e(e, t, n, r) {
        var o;
        if (
          ("string" == typeof e &&
            (e = (function (e) {
              e = unescape(encodeURIComponent(e));
              let t = [];
              for (let n = 0; n < e.length; ++n) t.push(e.charCodeAt(n));
              return t;
            })(e)),
          "string" == typeof t &&
            (t = (function (e) {
              var t;
              let n;
              if ("string" != typeof (t = e) || !on.test(t))
                throw TypeError("Invalid UUID");
              let r = new Uint8Array(16);
              return (
                (r[0] = (n = parseInt(e.slice(0, 8), 16)) >>> 24),
                (r[1] = (n >>> 16) & 255),
                (r[2] = (n >>> 8) & 255),
                (r[3] = 255 & n),
                (r[4] = (n = parseInt(e.slice(9, 13), 16)) >>> 8),
                (r[5] = 255 & n),
                (r[6] = (n = parseInt(e.slice(14, 18), 16)) >>> 8),
                (r[7] = 255 & n),
                (r[8] = (n = parseInt(e.slice(19, 23), 16)) >>> 8),
                (r[9] = 255 & n),
                (r[10] =
                  ((n = parseInt(e.slice(24, 36), 16)) / 1099511627776) & 255),
                (r[11] = (n / 4294967296) & 255),
                (r[12] = (n >>> 24) & 255),
                (r[13] = (n >>> 16) & 255),
                (r[14] = (n >>> 8) & 255),
                (r[15] = 255 & n),
                r
              );
            })(t)),
          16 !== (null == (o = t) ? void 0 : o.length))
        )
          throw TypeError(
            "Namespace must be array-like (16 iterable integer values, 0-255)"
          );
        let i = new Uint8Array(16 + e.length);
        if (
          (i.set(t),
          i.set(e, t.length),
          ((i = (function (e) {
            let t = [1518500249, 1859775393, 2400959708, 3395469782],
              n = [1732584193, 4023233417, 2562383102, 271733878, 3285377520];
            if ("string" == typeof e) {
              let t = unescape(encodeURIComponent(e));
              e = [];
              for (let n = 0; n < t.length; ++n) e.push(t.charCodeAt(n));
            } else Array.isArray(e) || (e = Array.prototype.slice.call(e));
            e.push(128);
            let r = Math.ceil((e.length / 4 + 2) / 16),
              o = Array(r);
            for (let t = 0; t < r; ++t) {
              let n = new Uint32Array(16);
              for (let r = 0; r < 16; ++r)
                n[r] =
                  (e[64 * t + 4 * r] << 24) |
                  (e[64 * t + 4 * r + 1] << 16) |
                  (e[64 * t + 4 * r + 2] << 8) |
                  e[64 * t + 4 * r + 3];
              o[t] = n;
            }
            (o[r - 1][14] = (8 * (e.length - 1)) / 4294967296),
              (o[r - 1][14] = Math.floor(o[r - 1][14])),
              (o[r - 1][15] = (8 * (e.length - 1)) | 0);
            for (let e = 0; e < r; ++e) {
              let r = new Uint32Array(80);
              for (let t = 0; t < 16; ++t) r[t] = o[e][t];
              for (let e = 16; e < 80; ++e)
                r[e] = an(r[e - 3] ^ r[e - 8] ^ r[e - 14] ^ r[e - 16], 1);
              let i = n[0],
                s = n[1],
                a = n[2],
                l = n[3],
                c = n[4];
              for (let e = 0; e < 80; ++e) {
                let n = Math.floor(e / 20),
                  o =
                    (an(i, 5) +
                      (function (e, t, n, r) {
                        switch (e) {
                          case 0:
                            return (t & n) ^ (~t & r);
                          case 1:
                          case 3:
                            return t ^ n ^ r;
                          case 2:
                            return (t & n) ^ (t & r) ^ (n & r);
                        }
                      })(n, s, a, l) +
                      c +
                      t[n] +
                      r[e]) >>>
                    0;
                (c = l), (l = a), (a = an(s, 30) >>> 0), (s = i), (i = o);
              }
              (n[0] = (n[0] + i) >>> 0),
                (n[1] = (n[1] + s) >>> 0),
                (n[2] = (n[2] + a) >>> 0),
                (n[3] = (n[3] + l) >>> 0),
                (n[4] = (n[4] + c) >>> 0);
            }
            return [
              (n[0] >> 24) & 255,
              (n[0] >> 16) & 255,
              (n[0] >> 8) & 255,
              255 & n[0],
              (n[1] >> 24) & 255,
              (n[1] >> 16) & 255,
              (n[1] >> 8) & 255,
              255 & n[1],
              (n[2] >> 24) & 255,
              (n[2] >> 16) & 255,
              (n[2] >> 8) & 255,
              255 & n[2],
              (n[3] >> 24) & 255,
              (n[3] >> 16) & 255,
              (n[3] >> 8) & 255,
              255 & n[3],
              (n[4] >> 24) & 255,
              (n[4] >> 16) & 255,
              (n[4] >> 8) & 255,
              255 & n[4],
            ];
          })(i))[6] = (15 & i[6]) | 80),
          (i[8] = (63 & i[8]) | 128),
          n)
        ) {
          r = r || 0;
          for (let e = 0; e < 16; ++e) n[r + e] = i[e];
          return n;
        }
        return (function (e, t = 0) {
          return (
            sn[e[t + 0]] +
            sn[e[t + 1]] +
            sn[e[t + 2]] +
            sn[e[t + 3]] +
            "-" +
            sn[e[t + 4]] +
            sn[e[t + 5]] +
            "-" +
            sn[e[t + 6]] +
            sn[e[t + 7]] +
            "-" +
            sn[e[t + 8]] +
            sn[e[t + 9]] +
            "-" +
            sn[e[t + 10]] +
            sn[e[t + 11]] +
            sn[e[t + 12]] +
            sn[e[t + 13]] +
            sn[e[t + 14]] +
            sn[e[t + 15]]
          );
        })(i);
      }
      try {
        e.name = "v5";
      } catch (e) {}
      return (
        (e.DNS = "6ba7b810-9dad-11d1-80b4-00c04fd430c8"),
        (e.URL = "6ba7b811-9dad-11d1-80b4-00c04fd430c8"),
        e
      );
    })(),
    cn = (e, t, { resource: n, prop: r }) => {
      var o, i;
      let s = [n, r].filter((e) => !!e).join("_"),
        a = ln(s, ln.URL),
        l = t.get(a);
      return (
        (null ==
        (i = null == (o = null == l ? void 0 : l.copyInfo) ? void 0 : o.copies)
          ? void 0
          : i.length) &&
          document.querySelectorAll(l.selector).forEach((t, n) => {
            t === e && (a = ln(`${s}_${n}`, ln.URL));
          }),
        a
      );
    },
    dn = (e) => "META" === e.nodeName && e instanceof HTMLMetaElement,
    un = (e) => {
      let t = RegExp(`^${Yt.URN_PREFIX}`);
      return !!e && null !== e.match(t);
    },
    hn = (e, t, n) => {
      let { name: r } = e;
      n.add(r), t.setUrnMapping({ name: r, value: e.content });
    },
    pn = ({ editor: e }) => {
      let t = window.document.head,
        n = new Set();
      ((e, t) => {
        document
          .querySelectorAll(Yt.META_SELECTOR)
          .forEach(({ name: n, content: r }) => {
            t.add(n), e.setUrnMapping({ name: n, value: r });
          });
      })(e, n),
        rn({
          element: t,
          callback: (0, Xt.debounce)((r) => {
            r.forEach((r) => {
              if ("attributes" === r.type && dn(r.target) && un(r.target.name))
                hn(r.target, e, n);
              else if ("childList" === r.type && r.addedNodes.length > 0) {
                let o = !1;
                r.addedNodes.forEach((t) => {
                  dn(t) && un(r.target.name) && (hn(t, e, n), (o = !0));
                }),
                  o ||
                    Array.from(t.querySelectorAll(Yt.META_SELECTOR)).forEach(
                      (t) => {
                        n.has(t.name) || hn(t, e, n);
                      }
                    );
              }
            });
          }, 150),
          config: {
            childList: !0,
            subtree: !0,
            attributes: !0,
            attributeFilter: ["name", "content"],
          },
        });
    },
    fn = tn(),
    mn = new Map(),
    gn = (e, { resource: t, type: n, prop: r }) => {
      let o,
        i = "",
        s = "";
      t
        ? ((s =
            (o = ((e, t, n) => {
              var r, o, i;
              let s =
                null == (r = e.parentElement)
                  ? void 0
                  : r.closest(
                      `[${n.TYPE}="${v.CONTAINER}"]:is([${n.RESOURCE}],[${n.PROP}]`
                    );
              if (!s) return;
              let a = s.getAttribute(n.RESOURCE),
                l = s.getAttribute(n.PROP);
              if (a)
                return {
                  parentResource: a,
                  parentid: cn(s, t, { resource: a, prop: l }),
                };
              let c =
                null !=
                (i =
                  null == (o = s.closest(`[${n.RESOURCE}]`))
                    ? void 0
                    : o.getAttribute(n.RESOURCE))
                  ? i
                  : "";
              return l
                ? {
                    parentResource: c,
                    parentid: cn(s, t, { resource: c, prop: l }),
                  }
                : void 0;
            })(e, mn, fn)) && v.CONTAINER),
          (i = `[${fn.RESOURCE}="${t}"]`))
        : ((o = ((e, t, n) => {
            let r = e.closest(`[${n.RESOURCE}]`),
              o = (null == r ? void 0 : r.getAttribute(n.RESOURCE)) || "",
              i = (null == r ? void 0 : r.getAttribute(n.PROP)) || "";
            return {
              parentResource: o,
              parentid: cn(r, t, { resource: o, prop: i }),
            };
          })(e, mn, fn)),
          (i = `[${fn.RESOURCE}="${
            o.parentResource
          }"] ${e.tagName.toLocaleLowerCase()}[${fn.TYPE}="${n}"]`)),
        r && (i += `[${fn.PROP}="${r}"]`);
      let a =
        n === Yt.COMPONENT_ITEM_TYPE ||
        e.getAttribute(fn.BEHAVIOR) === Yt.COMPONENT_ITEM_TYPE ||
        s === v.CONTAINER;
      return { ...o, selector: i, isComponent: a };
    },
    vn = (e) => {
      let t = e.filter((e) => !!e).join("_"),
        n = ln(t, ln.URL),
        r = mn.get(n);
      return r
        ? ((e, t) => {
            var n, r;
            let o =
                null != (r = null == (n = e.copyInfo) ? void 0 : n.copies)
                  ? r
                  : [],
              i = o.length + 1,
              s = ln(`${t}_${i}`, ln.URL);
            return (
              o.push(s),
              mn.set(e.id, { ...e, copyInfo: { copies: o } }),
              { id: s, copyInfo: { copyIndex: i, originalId: e.id } }
            );
          })(r, t)
        : { id: n };
    },
    yn = (e) => {
      let { scrollLeft: t, scrollTop: n } = e.documentElement,
        r = e.querySelectorAll(`[${fn.RESOURCE}],[${fn.PROP}]`) || [];
      return (
        mn.clear(),
        r.forEach((e) => {
          let t = ((e) => {
            let t = e.getAttribute(null == fn ? void 0 : fn.TYPE),
              n = e.getAttribute(fn.RESOURCE),
              r = e.getAttribute(fn.PROP);
            if (!n && !r) return;
            let {
                parentid: o = "",
                parentResource: i,
                selector: s,
                isComponent: a,
              } = gn(e, { resource: n, type: t, prop: r }),
              { id: l, copyInfo: c } = vn([n || i, r]);
            return {
              id: l,
              type: t || "",
              resource: n || "",
              prop: r || "",
              rect: e.getBoundingClientRect(),
              label: e.getAttribute(fn.LABEL) || "",
              parentid: o,
              selector: s,
              isComponent: a,
              model: e.getAttribute(fn.MODEL) || "",
              filter: e.getAttribute(fn.FILTER) || "",
              component: e.getAttribute(fn.COMPONENT) || "",
              content: nn(e, t),
              copyInfo: c,
            };
          })(e);
          if (t) {
            let e = mn.get(t.id);
            if (
              (mn.set(t.id, {
                ...t,
                children: (null == e ? void 0 : e.children) || [],
              }),
              t.parentid && t.id !== t.parentid)
            ) {
              let e = mn.get(t.parentid);
              e
                ? e.children.push(t.id)
                : mn.set(t.parentid, { children: [t.id] });
            }
          }
        }),
        { editables: mn, offset: { x: t, y: n }, selected: {} }
      );
    },
    bn = {
      viewport: { width: 0, height: 0 },
      frame: { width: 0, height: 0 },
      scroll: { x: 0, y: 0 },
    },
    wn = ({ editor: e }) => {
      null == e || e.updateFrameDetails({ details: bn });
    },
    kn = ({ target: e }) => {
      let t = e.documentElement;
      (bn.scroll.x = t.scrollLeft), (bn.scroll.y = t.scrollTop);
    },
    xn = ({ target: e }) => {
      let t = Math.max(
          e.document.documentElement.clientWidth || 0,
          e.innerWidth || 0
        ),
        n = Math.max(
          e.document.documentElement.clientHeight || 0,
          e.innerHeight || 0
        ),
        { width: r, height: o } =
          e.document.documentElement.getBoundingClientRect();
      (bn.viewport = { width: t, height: n }),
        (bn.frame = { width: Math.ceil(r), height: Math.ceil(o) });
    },
    Sn = ({ editor: e, prefix: t }) => {
      let n = en.element;
      t && t !== Yt.DEFAULT_PREFIX && Object.assign(fn, tn(t));
      let r = (0, Xt.debounce)(() => {
        let t = yn(n);
        e.repaintEditables({ editables: t });
      }, 150);
      r(),
        window.removeEventListener("resize", r),
        window.addEventListener("resize", r),
        rn({ element: n, callback: r });
    },
    En = ({ editor: e }) => {
      let t = window;
      t.document.addEventListener(
        "scroll",
        (0, Xt.debounce)(({ target: t }) => {
          kn({ target: t }), wn({ editor: e });
        }, 150)
      ),
        t.addEventListener(
          "resize",
          (0, Xt.debounce)(({ target: t }) => {
            xn({ target: t }), wn({ editor: e });
          }, 150)
        ),
        t.addEventListener(
          "orientationchange",
          (0, Xt.debounce)(({ target: n }) => {
            kn({ target: t.document }), xn({ target: n }), wn({ editor: e });
          }, 150)
        ),
        new ResizeObserver(
          (0, Xt.debounce)(() => {
            xn({ target: t }), wn({ editor: e });
          }, 150)
        ).observe(t.document.documentElement),
        requestAnimationFrame(() => {
          kn({ target: t.document }), xn({ target: t }), wn({ editor: e });
        });
    },
    _n = ({ editor: e }) => {
      pn({ editor: e });
    },
    Cn = ({ editor: e }) => {
      document.addEventListener(
        "click",
        (t) =>
          (({ event: e, editor: t }) => {
            let n = e.target.closest("A");
            n && (e.preventDefault(), t.navigateTo({ href: n.href }));
          })({ event: t, editor: e }),
        { capture: !0 }
      );
    },
    Tn = () => {
      window.addEventListener(
        "keydown",
        ({
          type: e,
          key: t,
          code: n,
          altKey: r,
          metaKey: o,
          shiftKey: i,
          ctrlKey: s,
        }) => {
          parent.postMessage(
            {
              type: Yt.USER_INPUT_RELAY_MESSAGE,
              value: {
                type: e,
                key: t,
                code: n,
                altKey: r,
                metaKey: o,
                shiftKey: i,
                ctrlKey: s,
              },
            },
            "*"
          );
        }
      );
    },
    On = { edit: "adobe-ue-edit", preview: "adobe-ue-preview" },
    Nn = "application/vnd.adobe.aue.";
  function An(e) {
    this.content = e;
  }
  (An.prototype = {
    constructor: An,
    find: function (e) {
      for (var t = 0; t < this.content.length; t += 2)
        if (this.content[t] === e) return t;
      return -1;
    },
    get: function (e) {
      var t = this.find(e);
      return -1 == t ? void 0 : this.content[t + 1];
    },
    update: function (e, t, n) {
      var r = n && n != e ? this.remove(n) : this,
        o = r.find(e),
        i = r.content.slice();
      return (
        -1 == o ? i.push(n || e, t) : ((i[o + 1] = t), n && (i[o] = n)),
        new An(i)
      );
    },
    remove: function (e) {
      var t = this.find(e);
      if (-1 == t) return this;
      var n = this.content.slice();
      return n.splice(t, 2), new An(n);
    },
    addToStart: function (e, t) {
      return new An([e, t].concat(this.remove(e).content));
    },
    addToEnd: function (e, t) {
      var n = this.remove(e).content.slice();
      return n.push(e, t), new An(n);
    },
    addBefore: function (e, t, n) {
      var r = this.remove(t),
        o = r.content.slice(),
        i = r.find(e);
      return o.splice(-1 == i ? o.length : i, 0, t, n), new An(o);
    },
    forEach: function (e) {
      for (var t = 0; t < this.content.length; t += 2)
        e(this.content[t], this.content[t + 1]);
    },
    prepend: function (e) {
      return (e = An.from(e)).size
        ? new An(e.content.concat(this.subtract(e).content))
        : this;
    },
    append: function (e) {
      return (e = An.from(e)).size
        ? new An(this.subtract(e).content.concat(e.content))
        : this;
    },
    subtract: function (e) {
      var t = this;
      e = An.from(e);
      for (var n = 0; n < e.content.length; n += 2) t = t.remove(e.content[n]);
      return t;
    },
    toObject: function () {
      var e = {};
      return (
        this.forEach(function (t, n) {
          e[t] = n;
        }),
        e
      );
    },
    get size() {
      return this.content.length >> 1;
    },
  }),
    (An.from = function (e) {
      if (e instanceof An) return e;
      var t = [];
      if (e) for (var n in e) t.push(n, e[n]);
      return new An(t);
    });
  class Mn {
    constructor(e, t) {
      if (((this.content = e), (this.size = t || 0), null == t))
        for (let t = 0; t < e.length; t++) this.size += e[t].nodeSize;
    }
    nodesBetween(e, t, n, r = 0, o) {
      for (let i = 0, s = 0; s < t; i++) {
        let a = this.content[i],
          l = s + a.nodeSize;
        if (l > e && !1 !== n(a, r + s, o || null, i) && a.content.size) {
          let o = s + 1;
          a.nodesBetween(
            Math.max(0, e - o),
            Math.min(a.content.size, t - o),
            n,
            r + o
          );
        }
        s = l;
      }
    }
    descendants(e) {
      this.nodesBetween(0, this.size, e);
    }
    textBetween(e, t, n, r) {
      let o = "",
        i = !0;
      return (
        this.nodesBetween(
          e,
          t,
          (s, a) => {
            let l = s.isText
              ? s.text.slice(Math.max(e, a) - a, t - a)
              : s.isLeaf
              ? r
                ? "function" == typeof r
                  ? r(s)
                  : r
                : s.type.spec.leafText
                ? s.type.spec.leafText(s)
                : ""
              : "";
            s.isBlock &&
              ((s.isLeaf && l) || s.isTextblock) &&
              n &&
              (i ? (i = !1) : (o += n)),
              (o += l);
          },
          0
        ),
        o
      );
    }
    append(e) {
      if (!e.size) return this;
      if (!this.size) return e;
      let t = this.lastChild,
        n = e.firstChild,
        r = this.content.slice(),
        o = 0;
      for (
        t.isText &&
        t.sameMarkup(n) &&
        ((r[r.length - 1] = t.withText(t.text + n.text)), (o = 1));
        o < e.content.length;
        o++
      )
        r.push(e.content[o]);
      return new Mn(r, this.size + e.size);
    }
    cut(e, t = this.size) {
      if (0 == e && t == this.size) return this;
      let n = [],
        r = 0;
      if (t > e)
        for (let o = 0, i = 0; i < t; o++) {
          let s = this.content[o],
            a = i + s.nodeSize;
          a > e &&
            ((i < e || a > t) &&
              (s = s.isText
                ? s.cut(Math.max(0, e - i), Math.min(s.text.length, t - i))
                : s.cut(
                    Math.max(0, e - i - 1),
                    Math.min(s.content.size, t - i - 1)
                  )),
            n.push(s),
            (r += s.nodeSize)),
            (i = a);
        }
      return new Mn(n, r);
    }
    cutByIndex(e, t) {
      return e == t
        ? Mn.empty
        : 0 == e && t == this.content.length
        ? this
        : new Mn(this.content.slice(e, t));
    }
    replaceChild(e, t) {
      let n = this.content[e];
      if (n == t) return this;
      let r = this.content.slice(),
        o = this.size + t.nodeSize - n.nodeSize;
      return (r[e] = t), new Mn(r, o);
    }
    addToStart(e) {
      return new Mn([e].concat(this.content), this.size + e.nodeSize);
    }
    addToEnd(e) {
      return new Mn(this.content.concat(e), this.size + e.nodeSize);
    }
    eq(e) {
      if (this.content.length != e.content.length) return !1;
      for (let t = 0; t < this.content.length; t++)
        if (!this.content[t].eq(e.content[t])) return !1;
      return !0;
    }
    get firstChild() {
      return this.content.length ? this.content[0] : null;
    }
    get lastChild() {
      return this.content.length ? this.content[this.content.length - 1] : null;
    }
    get childCount() {
      return this.content.length;
    }
    child(e) {
      let t = this.content[e];
      if (!t) throw RangeError("Index " + e + " out of range for " + this);
      return t;
    }
    maybeChild(e) {
      return this.content[e] || null;
    }
    forEach(e) {
      for (let t = 0, n = 0; t < this.content.length; t++) {
        let r = this.content[t];
        e(r, n, t), (n += r.nodeSize);
      }
    }
    findDiffStart(e, t = 0) {
      return (function e(t, n, r) {
        for (let o = 0; ; o++) {
          if (o == t.childCount || o == n.childCount)
            return t.childCount == n.childCount ? null : r;
          let i = t.child(o),
            s = n.child(o);
          if (i != s) {
            if (!i.sameMarkup(s)) return r;
            if (i.isText && i.text != s.text) {
              for (let e = 0; i.text[e] == s.text[e]; e++) r++;
              return r;
            }
            if (i.content.size || s.content.size) {
              let t = e(i.content, s.content, r + 1);
              if (null != t) return t;
            }
            r += i.nodeSize;
          } else r += i.nodeSize;
        }
      })(this, e, t);
    }
    findDiffEnd(e, t = this.size, n = e.size) {
      return (function e(t, n, r, o) {
        for (let i = t.childCount, s = n.childCount; ; ) {
          if (0 == i || 0 == s) return i == s ? null : { a: r, b: o };
          let a = t.child(--i),
            l = n.child(--s),
            c = a.nodeSize;
          if (a != l) {
            if (!a.sameMarkup(l)) return { a: r, b: o };
            if (a.isText && a.text != l.text) {
              let e = 0,
                t = Math.min(a.text.length, l.text.length);
              for (
                ;
                e < t &&
                a.text[a.text.length - e - 1] == l.text[l.text.length - e - 1];

              )
                e++, r--, o--;
              return { a: r, b: o };
            }
            if (a.content.size || l.content.size) {
              let t = e(a.content, l.content, r - 1, o - 1);
              if (t) return t;
            }
            (r -= c), (o -= c);
          } else (r -= c), (o -= c);
        }
      })(this, e, t, n);
    }
    findIndex(e, t = -1) {
      if (0 == e) return Rn(0, e);
      if (e == this.size) return Rn(this.content.length, e);
      if (e > this.size || e < 0)
        throw RangeError(`Position ${e} outside of fragment (${this})`);
      for (let n = 0, r = 0; ; n++) {
        let o = r + this.child(n).nodeSize;
        if (o >= e) return o == e || t > 0 ? Rn(n + 1, o) : Rn(n, r);
        r = o;
      }
    }
    toString() {
      return "<" + this.toStringInner() + ">";
    }
    toStringInner() {
      return this.content.join(", ");
    }
    toJSON() {
      return this.content.length ? this.content.map((e) => e.toJSON()) : null;
    }
    static fromJSON(e, t) {
      if (!t) return Mn.empty;
      if (!Array.isArray(t))
        throw RangeError("Invalid input for Fragment.fromJSON");
      return new Mn(t.map(e.nodeFromJSON));
    }
    static fromArray(e) {
      if (!e.length) return Mn.empty;
      let t,
        n = 0;
      for (let r = 0; r < e.length; r++) {
        let o = e[r];
        (n += o.nodeSize),
          r && o.isText && e[r - 1].sameMarkup(o)
            ? (t || (t = e.slice(0, r)),
              (t[t.length - 1] = o.withText(t[t.length - 1].text + o.text)))
            : t && t.push(o);
      }
      return new Mn(t || e, n);
    }
    static from(e) {
      if (!e) return Mn.empty;
      if (e instanceof Mn) return e;
      if (Array.isArray(e)) return this.fromArray(e);
      if (e.attrs) return new Mn([e], e.nodeSize);
      throw RangeError(
        "Can not convert " +
          e +
          " to a Fragment" +
          (e.nodesBetween
            ? " (looks like multiple versions of prosemirror-model were loaded)"
            : "")
      );
    }
  }
  Mn.empty = new Mn([], 0);
  let Dn = { index: 0, offset: 0 };
  function Rn(e, t) {
    return (Dn.index = e), (Dn.offset = t), Dn;
  }
  function $n(e, t) {
    if (e === t) return !0;
    if (!e || "object" != typeof e || !t || "object" != typeof t) return !1;
    let n = Array.isArray(e);
    if (Array.isArray(t) != n) return !1;
    if (n) {
      if (e.length != t.length) return !1;
      for (let n = 0; n < e.length; n++) if (!$n(e[n], t[n])) return !1;
    } else {
      for (let n in e) if (!(n in t) || !$n(e[n], t[n])) return !1;
      for (let n in t) if (!(n in e)) return !1;
    }
    return !0;
  }
  class In {
    constructor(e, t) {
      (this.type = e), (this.attrs = t);
    }
    addToSet(e) {
      let t,
        n = !1;
      for (let r = 0; r < e.length; r++) {
        let o = e[r];
        if (this.eq(o)) return e;
        if (this.type.excludes(o.type)) t || (t = e.slice(0, r));
        else {
          if (o.type.excludes(this.type)) return e;
          !n &&
            o.type.rank > this.type.rank &&
            (t || (t = e.slice(0, r)), t.push(this), (n = !0)),
            t && t.push(o);
        }
      }
      return t || (t = e.slice()), n || t.push(this), t;
    }
    removeFromSet(e) {
      for (let t = 0; t < e.length; t++)
        if (this.eq(e[t])) return e.slice(0, t).concat(e.slice(t + 1));
      return e;
    }
    isInSet(e) {
      for (let t = 0; t < e.length; t++) if (this.eq(e[t])) return !0;
      return !1;
    }
    eq(e) {
      return this == e || (this.type == e.type && $n(this.attrs, e.attrs));
    }
    toJSON() {
      let e = { type: this.type.name };
      for (let t in this.attrs) {
        e.attrs = this.attrs;
        break;
      }
      return e;
    }
    static fromJSON(e, t) {
      if (!t) throw RangeError("Invalid input for Mark.fromJSON");
      let n = e.marks[t.type];
      if (!n)
        throw RangeError(`There is no mark type ${t.type} in this schema`);
      let r = n.create(t.attrs);
      return n.checkAttrs(r.attrs), r;
    }
    static sameSet(e, t) {
      if (e == t) return !0;
      if (e.length != t.length) return !1;
      for (let n = 0; n < e.length; n++) if (!e[n].eq(t[n])) return !1;
      return !0;
    }
    static setFrom(e) {
      if (!e || (Array.isArray(e) && 0 == e.length)) return In.none;
      if (e instanceof In) return [e];
      let t = e.slice();
      return t.sort((e, t) => e.type.rank - t.type.rank), t;
    }
  }
  In.none = [];
  class zn extends Error {}
  class Pn {
    constructor(e, t, n) {
      (this.content = e), (this.openStart = t), (this.openEnd = n);
    }
    get size() {
      return this.content.size - this.openStart - this.openEnd;
    }
    insertAt(e, t) {
      let n = (function e(t, n, r, o) {
        let { index: i, offset: s } = t.findIndex(n),
          a = t.maybeChild(i);
        if (s == n || a.isText)
          return o && !o.canReplace(i, i, r)
            ? null
            : t.cut(0, n).append(r).append(t.cut(n));
        let l = e(a.content, n - s - 1, r);
        return l && t.replaceChild(i, a.copy(l));
      })(this.content, e + this.openStart, t);
      return n && new Pn(n, this.openStart, this.openEnd);
    }
    removeBetween(e, t) {
      return new Pn(
        (function e(t, n, r) {
          let { index: o, offset: i } = t.findIndex(n),
            s = t.maybeChild(o),
            { index: a, offset: l } = t.findIndex(r);
          if (i == n || s.isText) {
            if (l != r && !t.child(a).isText)
              throw RangeError("Removing non-flat range");
            return t.cut(0, n).append(t.cut(r));
          }
          if (o != a) throw RangeError("Removing non-flat range");
          return t.replaceChild(o, s.copy(e(s.content, n - i - 1, r - i - 1)));
        })(this.content, e + this.openStart, t + this.openStart),
        this.openStart,
        this.openEnd
      );
    }
    eq(e) {
      return (
        this.content.eq(e.content) &&
        this.openStart == e.openStart &&
        this.openEnd == e.openEnd
      );
    }
    toString() {
      return this.content + "(" + this.openStart + "," + this.openEnd + ")";
    }
    toJSON() {
      if (!this.content.size) return null;
      let e = { content: this.content.toJSON() };
      return (
        this.openStart > 0 && (e.openStart = this.openStart),
        this.openEnd > 0 && (e.openEnd = this.openEnd),
        e
      );
    }
    static fromJSON(e, t) {
      if (!t) return Pn.empty;
      let n = t.openStart || 0,
        r = t.openEnd || 0;
      if ("number" != typeof n || "number" != typeof r)
        throw RangeError("Invalid input for Slice.fromJSON");
      return new Pn(Mn.fromJSON(e, t.content), n, r);
    }
    static maxOpen(e, t = !0) {
      let n = 0,
        r = 0;
      for (
        let r = e.firstChild;
        r && !r.isLeaf && (t || !r.type.spec.isolating);
        r = r.firstChild
      )
        n++;
      for (
        let n = e.lastChild;
        n && !n.isLeaf && (t || !n.type.spec.isolating);
        n = n.lastChild
      )
        r++;
      return new Pn(e, n, r);
    }
  }
  function Vn(e, t) {
    if (!t.type.compatibleContent(e.type))
      throw new zn("Cannot join " + t.type.name + " onto " + e.type.name);
  }
  function Ln(e, t, n) {
    let r = e.node(n);
    return Vn(r, t.node(n)), r;
  }
  function Bn(e, t) {
    let n = t.length - 1;
    n >= 0 && e.isText && e.sameMarkup(t[n])
      ? (t[n] = e.withText(t[n].text + e.text))
      : t.push(e);
  }
  function jn(e, t, n, r) {
    let o = (t || e).node(n),
      i = 0,
      s = t ? t.index(n) : o.childCount;
    e &&
      ((i = e.index(n)),
      e.depth > n ? i++ : e.textOffset && (Bn(e.nodeAfter, r), i++));
    for (let e = i; e < s; e++) Bn(o.child(e), r);
    t && t.depth == n && t.textOffset && Bn(t.nodeBefore, r);
  }
  function Fn(e, t) {
    return e.type.checkContent(t), e.copy(t);
  }
  function Un(e, t, n) {
    let r = [];
    return (
      jn(null, e, n, r),
      e.depth > n && Bn(Fn(Ln(e, t, n + 1), Un(e, t, n + 1)), r),
      jn(t, null, n, r),
      new Mn(r)
    );
  }
  Pn.empty = new Pn(Mn.empty, 0, 0);
  class Zn {
    constructor(e, t, n) {
      (this.pos = e),
        (this.path = t),
        (this.parentOffset = n),
        (this.depth = t.length / 3 - 1);
    }
    resolveDepth(e) {
      return null == e ? this.depth : e < 0 ? this.depth + e : e;
    }
    get parent() {
      return this.node(this.depth);
    }
    get doc() {
      return this.node(0);
    }
    node(e) {
      return this.path[3 * this.resolveDepth(e)];
    }
    index(e) {
      return this.path[3 * this.resolveDepth(e) + 1];
    }
    indexAfter(e) {
      return (
        (e = this.resolveDepth(e)),
        this.index(e) + (e != this.depth || this.textOffset ? 1 : 0)
      );
    }
    start(e) {
      return 0 == (e = this.resolveDepth(e)) ? 0 : this.path[3 * e - 1] + 1;
    }
    end(e) {
      return (
        (e = this.resolveDepth(e)), this.start(e) + this.node(e).content.size
      );
    }
    before(e) {
      if (!(e = this.resolveDepth(e)))
        throw RangeError("There is no position before the top-level node");
      return e == this.depth + 1 ? this.pos : this.path[3 * e - 1];
    }
    after(e) {
      if (!(e = this.resolveDepth(e)))
        throw RangeError("There is no position after the top-level node");
      return e == this.depth + 1
        ? this.pos
        : this.path[3 * e - 1] + this.path[3 * e].nodeSize;
    }
    get textOffset() {
      return this.pos - this.path[this.path.length - 1];
    }
    get nodeAfter() {
      let e = this.parent,
        t = this.index(this.depth);
      if (t == e.childCount) return null;
      let n = this.pos - this.path[this.path.length - 1],
        r = e.child(t);
      return n ? e.child(t).cut(n) : r;
    }
    get nodeBefore() {
      let e = this.index(this.depth),
        t = this.pos - this.path[this.path.length - 1];
      return t
        ? this.parent.child(e).cut(0, t)
        : 0 == e
        ? null
        : this.parent.child(e - 1);
    }
    posAtIndex(e, t) {
      t = this.resolveDepth(t);
      let n = this.path[3 * t],
        r = 0 == t ? 0 : this.path[3 * t - 1] + 1;
      for (let t = 0; t < e; t++) r += n.child(t).nodeSize;
      return r;
    }
    marks() {
      let e = this.parent,
        t = this.index();
      if (0 == e.content.size) return In.none;
      if (this.textOffset) return e.child(t).marks;
      let n = e.maybeChild(t - 1),
        r = e.maybeChild(t);
      if (!n) {
        let e = n;
        (n = r), (r = e);
      }
      let o = n.marks;
      for (var i = 0; i < o.length; i++)
        !1 !== o[i].type.spec.inclusive ||
          (r && o[i].isInSet(r.marks)) ||
          (o = o[i--].removeFromSet(o));
      return o;
    }
    marksAcross(e) {
      let t = this.parent.maybeChild(this.index());
      if (!t || !t.isInline) return null;
      let n = t.marks,
        r = e.parent.maybeChild(e.index());
      for (var o = 0; o < n.length; o++)
        !1 !== n[o].type.spec.inclusive ||
          (r && n[o].isInSet(r.marks)) ||
          (n = n[o--].removeFromSet(n));
      return n;
    }
    sharedDepth(e) {
      for (let t = this.depth; t > 0; t--)
        if (this.start(t) <= e && this.end(t) >= e) return t;
      return 0;
    }
    blockRange(e = this, t) {
      if (e.pos < this.pos) return e.blockRange(this);
      for (
        let n =
          this.depth - (this.parent.inlineContent || this.pos == e.pos ? 1 : 0);
        n >= 0;
        n--
      )
        if (e.pos <= this.end(n) && (!t || t(this.node(n))))
          return new Wn(this, e, n);
      return null;
    }
    sameParent(e) {
      return this.pos - this.parentOffset == e.pos - e.parentOffset;
    }
    max(e) {
      return e.pos > this.pos ? e : this;
    }
    min(e) {
      return e.pos < this.pos ? e : this;
    }
    toString() {
      let e = "";
      for (let t = 1; t <= this.depth; t++)
        e += (e ? "/" : "") + this.node(t).type.name + "_" + this.index(t - 1);
      return e + ":" + this.parentOffset;
    }
    static resolve(e, t) {
      if (!(t >= 0 && t <= e.content.size))
        throw RangeError("Position " + t + " out of range");
      let n = [],
        r = 0,
        o = t;
      for (let t = e; ; ) {
        let { index: e, offset: i } = t.content.findIndex(o),
          s = o - i;
        if ((n.push(t, e, r + i), !s || (t = t.child(e)).isText)) break;
        (o = s - 1), (r += i + 1);
      }
      return new Zn(t, n, o);
    }
    static resolveCached(e, t) {
      let n = Kn.get(e);
      if (n)
        for (let e = 0; e < n.elts.length; e++) {
          let r = n.elts[e];
          if (r.pos == t) return r;
        }
      else Kn.set(e, (n = new qn()));
      let r = (n.elts[n.i] = Zn.resolve(e, t));
      return (n.i = (n.i + 1) % Hn), r;
    }
  }
  class qn {
    constructor() {
      (this.elts = []), (this.i = 0);
    }
  }
  let Hn = 12,
    Kn = new WeakMap();
  class Wn {
    constructor(e, t, n) {
      (this.$from = e), (this.$to = t), (this.depth = n);
    }
    get start() {
      return this.$from.before(this.depth + 1);
    }
    get end() {
      return this.$to.after(this.depth + 1);
    }
    get parent() {
      return this.$from.node(this.depth);
    }
    get startIndex() {
      return this.$from.index(this.depth);
    }
    get endIndex() {
      return this.$to.indexAfter(this.depth);
    }
  }
  let Jn = Object.create(null);
  class Gn {
    constructor(e, t, n, r = In.none) {
      (this.type = e),
        (this.attrs = t),
        (this.marks = r),
        (this.content = n || Mn.empty);
    }
    get children() {
      return this.content.content;
    }
    get nodeSize() {
      return this.isLeaf ? 1 : 2 + this.content.size;
    }
    get childCount() {
      return this.content.childCount;
    }
    child(e) {
      return this.content.child(e);
    }
    maybeChild(e) {
      return this.content.maybeChild(e);
    }
    forEach(e) {
      this.content.forEach(e);
    }
    nodesBetween(e, t, n, r = 0) {
      this.content.nodesBetween(e, t, n, r, this);
    }
    descendants(e) {
      this.nodesBetween(0, this.content.size, e);
    }
    get textContent() {
      return this.isLeaf && this.type.spec.leafText
        ? this.type.spec.leafText(this)
        : this.textBetween(0, this.content.size, "");
    }
    textBetween(e, t, n, r) {
      return this.content.textBetween(e, t, n, r);
    }
    get firstChild() {
      return this.content.firstChild;
    }
    get lastChild() {
      return this.content.lastChild;
    }
    eq(e) {
      return this == e || (this.sameMarkup(e) && this.content.eq(e.content));
    }
    sameMarkup(e) {
      return this.hasMarkup(e.type, e.attrs, e.marks);
    }
    hasMarkup(e, t, n) {
      return (
        this.type == e &&
        $n(this.attrs, t || e.defaultAttrs || Jn) &&
        In.sameSet(this.marks, n || In.none)
      );
    }
    copy(e = null) {
      return e == this.content
        ? this
        : new Gn(this.type, this.attrs, e, this.marks);
    }
    mark(e) {
      return e == this.marks
        ? this
        : new Gn(this.type, this.attrs, this.content, e);
    }
    cut(e, t = this.content.size) {
      return 0 == e && t == this.content.size
        ? this
        : this.copy(this.content.cut(e, t));
    }
    slice(e, t = this.content.size, n = !1) {
      if (e == t) return Pn.empty;
      let r = this.resolve(e),
        o = this.resolve(t),
        i = n ? 0 : r.sharedDepth(t),
        s = r.start(i);
      return new Pn(
        r.node(i).content.cut(r.pos - s, o.pos - s),
        r.depth - i,
        o.depth - i
      );
    }
    replace(e, t, n) {
      var r = this.resolve(e),
        o = this.resolve(t);
      if (n.openStart > r.depth)
        throw new zn("Inserted content deeper than insertion position");
      if (r.depth - n.openStart != o.depth - n.openEnd)
        throw new zn("Inconsistent open depths");
      return (function e(t, n, r, o) {
        let i = t.index(o),
          s = t.node(o);
        if (i == n.index(o) && o < t.depth - r.openStart) {
          let a = e(t, n, r, o + 1);
          return s.copy(s.content.replaceChild(i, a));
        }
        if (!r.content.size) return Fn(s, Un(t, n, o));
        if (r.openStart || r.openEnd || t.depth != o || n.depth != o) {
          let { start: e, end: i } = (function (e, t) {
            let n = t.depth - e.openStart,
              r = t.node(n).copy(e.content);
            for (let e = n - 1; e >= 0; e--) r = t.node(e).copy(Mn.from(r));
            return {
              start: r.resolveNoCache(e.openStart + n),
              end: r.resolveNoCache(r.content.size - e.openEnd - n),
            };
          })(r, t);
          return Fn(
            s,
            (function e(t, n, r, o, i) {
              let s = t.depth > i && Ln(t, n, i + 1),
                a = o.depth > i && Ln(r, o, i + 1),
                l = [];
              return (
                jn(null, t, i, l),
                s && a && n.index(i) == r.index(i)
                  ? (Vn(s, a), Bn(Fn(s, e(t, n, r, o, i + 1)), l))
                  : (s && Bn(Fn(s, Un(t, n, i + 1)), l),
                    jn(n, r, i, l),
                    a && Bn(Fn(a, Un(r, o, i + 1)), l)),
                jn(o, null, i, l),
                new Mn(l)
              );
            })(t, e, i, n, o)
          );
        }
        {
          let e = t.parent,
            o = e.content;
          return Fn(
            e,
            o
              .cut(0, t.parentOffset)
              .append(r.content)
              .append(o.cut(n.parentOffset))
          );
        }
      })(r, o, n, 0);
    }
    nodeAt(e) {
      for (let t = this; ; ) {
        let { index: n, offset: r } = t.content.findIndex(e);
        if (!(t = t.maybeChild(n))) return null;
        if (r == e || t.isText) return t;
        e -= r + 1;
      }
    }
    childAfter(e) {
      let { index: t, offset: n } = this.content.findIndex(e);
      return { node: this.content.maybeChild(t), index: t, offset: n };
    }
    childBefore(e) {
      if (0 == e) return { node: null, index: 0, offset: 0 };
      let { index: t, offset: n } = this.content.findIndex(e);
      if (n < e) return { node: this.content.child(t), index: t, offset: n };
      let r = this.content.child(t - 1);
      return { node: r, index: t - 1, offset: n - r.nodeSize };
    }
    resolve(e) {
      return Zn.resolveCached(this, e);
    }
    resolveNoCache(e) {
      return Zn.resolve(this, e);
    }
    rangeHasMark(e, t, n) {
      let r = !1;
      return (
        t > e &&
          this.nodesBetween(e, t, (e) => (n.isInSet(e.marks) && (r = !0), !r)),
        r
      );
    }
    get isBlock() {
      return this.type.isBlock;
    }
    get isTextblock() {
      return this.type.isTextblock;
    }
    get inlineContent() {
      return this.type.inlineContent;
    }
    get isInline() {
      return this.type.isInline;
    }
    get isText() {
      return this.type.isText;
    }
    get isLeaf() {
      return this.type.isLeaf;
    }
    get isAtom() {
      return this.type.isAtom;
    }
    toString() {
      if (this.type.spec.toDebugString)
        return this.type.spec.toDebugString(this);
      let e = this.type.name;
      return (
        this.content.size && (e += "(" + this.content.toStringInner() + ")"),
        Xn(this.marks, e)
      );
    }
    contentMatchAt(e) {
      let t = this.type.contentMatch.matchFragment(this.content, 0, e);
      if (!t)
        throw Error("Called contentMatchAt on a node with invalid content");
      return t;
    }
    canReplace(e, t, n = Mn.empty, r = 0, o = n.childCount) {
      let i = this.contentMatchAt(e).matchFragment(n, r, o),
        s = i && i.matchFragment(this.content, t);
      if (!s || !s.validEnd) return !1;
      for (let e = r; e < o; e++)
        if (!this.type.allowsMarks(n.child(e).marks)) return !1;
      return !0;
    }
    canReplaceWith(e, t, n, r) {
      if (r && !this.type.allowsMarks(r)) return !1;
      let o = this.contentMatchAt(e).matchType(n),
        i = o && o.matchFragment(this.content, t);
      return !!i && i.validEnd;
    }
    canAppend(e) {
      return e.content.size
        ? this.canReplace(this.childCount, this.childCount, e.content)
        : this.type.compatibleContent(e.type);
    }
    check() {
      this.type.checkContent(this.content), this.type.checkAttrs(this.attrs);
      let e = In.none;
      for (let t = 0; t < this.marks.length; t++) {
        let n = this.marks[t];
        n.type.checkAttrs(n.attrs), (e = n.addToSet(e));
      }
      if (!In.sameSet(e, this.marks))
        throw RangeError(
          `Invalid collection of marks for node ${
            this.type.name
          }: ${this.marks.map((e) => e.type.name)}`
        );
      this.content.forEach((e) => e.check());
    }
    toJSON() {
      let e = { type: this.type.name };
      for (let t in this.attrs) {
        e.attrs = this.attrs;
        break;
      }
      return (
        this.content.size && (e.content = this.content.toJSON()),
        this.marks.length && (e.marks = this.marks.map((e) => e.toJSON())),
        e
      );
    }
    static fromJSON(e, t) {
      let n;
      if (!t) throw RangeError("Invalid input for Node.fromJSON");
      if (t.marks) {
        if (!Array.isArray(t.marks))
          throw RangeError("Invalid mark data for Node.fromJSON");
        n = t.marks.map(e.markFromJSON);
      }
      if ("text" == t.type) {
        if ("string" != typeof t.text)
          throw RangeError("Invalid text node in JSON");
        return e.text(t.text, n);
      }
      let r = Mn.fromJSON(e, t.content),
        o = e.nodeType(t.type).create(t.attrs, r, n);
      return o.type.checkAttrs(o.attrs), o;
    }
  }
  Gn.prototype.text = void 0;
  class Yn extends Gn {
    constructor(e, t, n, r) {
      if ((super(e, t, null, r), !n))
        throw RangeError("Empty text nodes are not allowed");
      this.text = n;
    }
    toString() {
      return this.type.spec.toDebugString
        ? this.type.spec.toDebugString(this)
        : Xn(this.marks, JSON.stringify(this.text));
    }
    get textContent() {
      return this.text;
    }
    textBetween(e, t) {
      return this.text.slice(e, t);
    }
    get nodeSize() {
      return this.text.length;
    }
    mark(e) {
      return e == this.marks
        ? this
        : new Yn(this.type, this.attrs, this.text, e);
    }
    withText(e) {
      return e == this.text
        ? this
        : new Yn(this.type, this.attrs, e, this.marks);
    }
    cut(e = 0, t = this.text.length) {
      return 0 == e && t == this.text.length
        ? this
        : this.withText(this.text.slice(e, t));
    }
    eq(e) {
      return this.sameMarkup(e) && this.text == e.text;
    }
    toJSON() {
      let e = super.toJSON();
      return (e.text = this.text), e;
    }
  }
  function Xn(e, t) {
    for (let n = e.length - 1; n >= 0; n--) t = e[n].type.name + "(" + t + ")";
    return t;
  }
  class Qn {
    constructor(e) {
      (this.validEnd = e), (this.next = []), (this.wrapCache = []);
    }
    static parse(e, t) {
      var n;
      let r,
        o = new er(e, t);
      if (null == o.next) return Qn.empty;
      let i = (function e(t) {
        let n = [];
        do {
          n.push(
            (function (t) {
              let n = [];
              do {
                n.push(
                  (function (t) {
                    let n = (function (t) {
                      if (t.eat("(")) {
                        let n = e(t);
                        return t.eat(")") || t.err("Missing closing paren"), n;
                      }
                      if (!/\W/.test(t.next)) {
                        let e = (function (e, t) {
                          let n = e.nodeTypes,
                            r = n[t];
                          if (r) return [r];
                          let o = [];
                          for (let e in n) {
                            let r = n[e];
                            r.isInGroup(t) && o.push(r);
                          }
                          return (
                            0 == o.length &&
                              e.err("No node type or group '" + t + "' found"),
                            o
                          );
                        })(t, t.next).map(
                          (e) => (
                            null == t.inline
                              ? (t.inline = e.isInline)
                              : t.inline != e.isInline &&
                                t.err("Mixing inline and block content"),
                            { type: "name", value: e }
                          )
                        );
                        return (
                          t.pos++,
                          1 == e.length ? e[0] : { type: "choice", exprs: e }
                        );
                      }
                      t.err("Unexpected token '" + t.next + "'");
                    })(t);
                    for (;;)
                      if (t.eat("+")) n = { type: "plus", expr: n };
                      else if (t.eat("*")) n = { type: "star", expr: n };
                      else if (t.eat("?")) n = { type: "opt", expr: n };
                      else {
                        if (!t.eat("{")) break;
                        n = (function (e, t) {
                          let n = tr(e),
                            r = n;
                          return (
                            e.eat(",") && (r = "}" != e.next ? tr(e) : -1),
                            e.eat("}") || e.err("Unclosed braced range"),
                            { type: "range", min: n, max: r, expr: t }
                          );
                        })(t, n);
                      }
                    return n;
                  })(t)
                );
              } while (t.next && ")" != t.next && "|" != t.next);
              return 1 == n.length ? n[0] : { type: "seq", exprs: n };
            })(t)
          );
        } while (t.eat("|"));
        return 1 == n.length ? n[0] : { type: "choice", exprs: n };
      })(o);
      o.next && o.err("Unexpected trailing text");
      let s =
        ((n = (function (e) {
          let t = [[]];
          return (
            o(
              (function e(t, i) {
                if ("choice" == t.type)
                  return t.exprs.reduce((t, n) => t.concat(e(n, i)), []);
                if ("seq" != t.type) {
                  if ("star" == t.type) {
                    let s = n();
                    return r(i, s), o(e(t.expr, s), s), [r(s)];
                  }
                  if ("plus" == t.type) {
                    let s = n();
                    return o(e(t.expr, i), s), o(e(t.expr, s), s), [r(s)];
                  }
                  if ("opt" == t.type) return [r(i)].concat(e(t.expr, i));
                  if ("range" == t.type) {
                    let s = i;
                    for (let r = 0; r < t.min; r++) {
                      let r = n();
                      o(e(t.expr, s), r), (s = r);
                    }
                    if (-1 == t.max) o(e(t.expr, s), s);
                    else
                      for (let i = t.min; i < t.max; i++) {
                        let i = n();
                        r(s, i), o(e(t.expr, s), i), (s = i);
                      }
                    return [r(s)];
                  }
                  if ("name" == t.type) return [r(i, void 0, t.value)];
                  throw Error("Unknown expr type");
                }
                for (let r = 0; ; r++) {
                  let s = e(t.exprs[r], i);
                  if (r == t.exprs.length - 1) return s;
                  o(s, (i = n()));
                }
              })(e, 0),
              n()
            ),
            t
          );
          function n() {
            return t.push([]) - 1;
          }
          function r(e, n, r) {
            let o = { term: r, to: n };
            return t[e].push(o), o;
          }
          function o(e, t) {
            e.forEach((e) => (e.to = t));
          }
        })(i)),
        (r = Object.create(null)),
        (function e(t) {
          let o = [];
          t.forEach((e) => {
            n[e].forEach(({ term: e, to: t }) => {
              let r;
              if (e) {
                for (let t = 0; t < o.length; t++)
                  o[t][0] == e && (r = o[t][1]);
                rr(n, t).forEach((t) => {
                  r || o.push([e, (r = [])]), -1 == r.indexOf(t) && r.push(t);
                });
              }
            });
          });
          let i = (r[t.join(",")] = new Qn(t.indexOf(n.length - 1) > -1));
          for (let t = 0; t < o.length; t++) {
            let n = o[t][1].sort(nr);
            i.next.push({ type: o[t][0], next: r[n.join(",")] || e(n) });
          }
          return i;
        })(rr(n, 0)));
      return (
        (function (e, t) {
          for (let n = 0, r = [e]; n < r.length; n++) {
            let e = r[n],
              o = !e.validEnd,
              i = [];
            for (let t = 0; t < e.next.length; t++) {
              let { type: n, next: s } = e.next[t];
              i.push(n.name),
                o && !(n.isText || n.hasRequiredAttrs()) && (o = !1),
                -1 == r.indexOf(s) && r.push(s);
            }
            o &&
              t.err(
                "Only non-generatable nodes (" +
                  i.join(", ") +
                  ") in a required position (see https://prosemirror.net/docs/guide/#generatable)"
              );
          }
        })(s, o),
        s
      );
    }
    matchType(e) {
      for (let t = 0; t < this.next.length; t++)
        if (this.next[t].type == e) return this.next[t].next;
      return null;
    }
    matchFragment(e, t = 0, n = e.childCount) {
      let r = this;
      for (let o = t; r && o < n; o++) r = r.matchType(e.child(o).type);
      return r;
    }
    get inlineContent() {
      return 0 != this.next.length && this.next[0].type.isInline;
    }
    get defaultType() {
      for (let e = 0; e < this.next.length; e++) {
        let { type: t } = this.next[e];
        if (!t.isText && !t.hasRequiredAttrs()) return t;
      }
      return null;
    }
    compatible(e) {
      for (let t = 0; t < this.next.length; t++)
        for (let n = 0; n < e.next.length; n++)
          if (this.next[t].type == e.next[n].type) return !0;
      return !1;
    }
    fillBefore(e, t = !1, n = 0) {
      let r = [this];
      return (function o(i, s) {
        let a = i.matchFragment(e, n);
        if (a && (!t || a.validEnd))
          return Mn.from(s.map((e) => e.createAndFill()));
        for (let e = 0; e < i.next.length; e++) {
          let { type: t, next: n } = i.next[e];
          if (!t.isText && !t.hasRequiredAttrs() && -1 == r.indexOf(n)) {
            r.push(n);
            let e = o(n, s.concat(t));
            if (e) return e;
          }
        }
        return null;
      })(this, []);
    }
    findWrapping(e) {
      for (let t = 0; t < this.wrapCache.length; t += 2)
        if (this.wrapCache[t] == e) return this.wrapCache[t + 1];
      let t = this.computeWrapping(e);
      return this.wrapCache.push(e, t), t;
    }
    computeWrapping(e) {
      let t = Object.create(null),
        n = [{ match: this, type: null, via: null }];
      for (; n.length; ) {
        let r = n.shift(),
          o = r.match;
        if (o.matchType(e)) {
          let e = [];
          for (let t = r; t.type; t = t.via) e.push(t.type);
          return e.reverse();
        }
        for (let e = 0; e < o.next.length; e++) {
          let { type: i, next: s } = o.next[e];
          i.isLeaf ||
            i.hasRequiredAttrs() ||
            i.name in t ||
            (r.type && !s.validEnd) ||
            (n.push({ match: i.contentMatch, type: i, via: r }),
            (t[i.name] = !0));
        }
      }
      return null;
    }
    get edgeCount() {
      return this.next.length;
    }
    edge(e) {
      if (e >= this.next.length)
        throw RangeError(`There's no ${e}th edge in this content match`);
      return this.next[e];
    }
    toString() {
      let e = [];
      return (
        (function t(n) {
          e.push(n);
          for (let r = 0; r < n.next.length; r++)
            -1 == e.indexOf(n.next[r].next) && t(n.next[r].next);
        })(this),
        e
          .map((t, n) => {
            let r = n + (t.validEnd ? "*" : " ") + " ";
            for (let n = 0; n < t.next.length; n++)
              r +=
                (n ? ", " : "") +
                t.next[n].type.name +
                "->" +
                e.indexOf(t.next[n].next);
            return r;
          })
          .join("\n")
      );
    }
  }
  Qn.empty = new Qn(!0);
  class er {
    constructor(e, t) {
      (this.string = e),
        (this.nodeTypes = t),
        (this.inline = null),
        (this.pos = 0),
        (this.tokens = e.split(/\s*(?=\b|\W|$)/)),
        "" == this.tokens[this.tokens.length - 1] && this.tokens.pop(),
        "" == this.tokens[0] && this.tokens.shift();
    }
    get next() {
      return this.tokens[this.pos];
    }
    eat(e) {
      return this.next == e && (this.pos++ || !0);
    }
    err(e) {
      throw SyntaxError(e + " (in content expression '" + this.string + "')");
    }
  }
  function tr(e) {
    /\D/.test(e.next) && e.err("Expected number, got '" + e.next + "'");
    let t = Number(e.next);
    return e.pos++, t;
  }
  function nr(e, t) {
    return t - e;
  }
  function rr(e, t) {
    let n = [];
    return (
      (function t(r) {
        let o = e[r];
        if (1 == o.length && !o[0].term) return t(o[0].to);
        n.push(r);
        for (let e = 0; e < o.length; e++) {
          let { term: r, to: i } = o[e];
          r || -1 != n.indexOf(i) || t(i);
        }
      })(t),
      n.sort(nr)
    );
  }
  function or(e) {
    let t = Object.create(null);
    for (let n in e) {
      let r = e[n];
      if (!r.hasDefault) return null;
      t[n] = r.default;
    }
    return t;
  }
  function ir(e, t) {
    let n = Object.create(null);
    for (let r in e) {
      let o = t && t[r];
      if (void 0 === o) {
        let t = e[r];
        if (!t.hasDefault)
          throw RangeError("No value supplied for attribute " + r);
        o = t.default;
      }
      n[r] = o;
    }
    return n;
  }
  function sr(e, t, n, r) {
    for (let r in t)
      if (!(r in e))
        throw RangeError(`Unsupported attribute ${r} for ${n} of type ${r}`);
    for (let n in e) {
      let r = e[n];
      r.validate && r.validate(t[n]);
    }
  }
  function ar(e, t) {
    let n = Object.create(null);
    if (t) for (let r in t) n[r] = new cr(e, r, t[r]);
    return n;
  }
  class lr {
    constructor(e, t, n) {
      (this.name = e),
        (this.schema = t),
        (this.spec = n),
        (this.markSet = null),
        (this.groups = n.group ? n.group.split(" ") : []),
        (this.attrs = ar(e, n.attrs)),
        (this.defaultAttrs = or(this.attrs)),
        (this.contentMatch = null),
        (this.inlineContent = null),
        (this.isBlock = !(n.inline || "text" == e)),
        (this.isText = "text" == e);
    }
    get isInline() {
      return !this.isBlock;
    }
    get isTextblock() {
      return this.isBlock && this.inlineContent;
    }
    get isLeaf() {
      return this.contentMatch == Qn.empty;
    }
    get isAtom() {
      return this.isLeaf || !!this.spec.atom;
    }
    isInGroup(e) {
      return this.groups.indexOf(e) > -1;
    }
    get whitespace() {
      return this.spec.whitespace || (this.spec.code ? "pre" : "normal");
    }
    hasRequiredAttrs() {
      for (let e in this.attrs) if (this.attrs[e].isRequired) return !0;
      return !1;
    }
    compatibleContent(e) {
      return this == e || this.contentMatch.compatible(e.contentMatch);
    }
    computeAttrs(e) {
      return !e && this.defaultAttrs ? this.defaultAttrs : ir(this.attrs, e);
    }
    create(e = null, t, n) {
      if (this.isText)
        throw Error("NodeType.create can't construct text nodes");
      return new Gn(this, this.computeAttrs(e), Mn.from(t), In.setFrom(n));
    }
    createChecked(e = null, t, n) {
      return (
        (t = Mn.from(t)),
        this.checkContent(t),
        new Gn(this, this.computeAttrs(e), t, In.setFrom(n))
      );
    }
    createAndFill(e = null, t, n) {
      if (((e = this.computeAttrs(e)), (t = Mn.from(t)).size)) {
        let e = this.contentMatch.fillBefore(t);
        if (!e) return null;
        t = e.append(t);
      }
      let r = this.contentMatch.matchFragment(t),
        o = r && r.fillBefore(Mn.empty, !0);
      return o ? new Gn(this, e, t.append(o), In.setFrom(n)) : null;
    }
    validContent(e) {
      let t = this.contentMatch.matchFragment(e);
      if (!t || !t.validEnd) return !1;
      for (let t = 0; t < e.childCount; t++)
        if (!this.allowsMarks(e.child(t).marks)) return !1;
      return !0;
    }
    checkContent(e) {
      if (!this.validContent(e))
        throw RangeError(
          `Invalid content for node ${this.name}: ${e.toString().slice(0, 50)}`
        );
    }
    checkAttrs(e) {
      sr(this.attrs, e, "node", this.name);
    }
    allowsMarkType(e) {
      return null == this.markSet || this.markSet.indexOf(e) > -1;
    }
    allowsMarks(e) {
      if (null == this.markSet) return !0;
      for (let t = 0; t < e.length; t++)
        if (!this.allowsMarkType(e[t].type)) return !1;
      return !0;
    }
    allowedMarks(e) {
      let t;
      if (null == this.markSet) return e;
      for (let n = 0; n < e.length; n++)
        this.allowsMarkType(e[n].type)
          ? t && t.push(e[n])
          : t || (t = e.slice(0, n));
      return t ? (t.length ? t : In.none) : e;
    }
    static compile(e, t) {
      let n = Object.create(null);
      e.forEach((e, r) => (n[e] = new lr(e, t, r)));
      let r = t.spec.topNode || "doc";
      if (!n[r])
        throw RangeError("Schema is missing its top node type ('" + r + "')");
      if (!n.text) throw RangeError("Every schema needs a 'text' type");
      for (let e in n.text.attrs)
        throw RangeError("The text node type should not have attributes");
      return n;
    }
  }
  class cr {
    constructor(e, t, n) {
      (this.hasDefault = Object.prototype.hasOwnProperty.call(n, "default")),
        (this.default = n.default),
        (this.validate =
          "string" == typeof n.validate
            ? (function (e, t, n) {
                let r = n.split("|");
                return (n) => {
                  let o = null === n ? "null" : typeof n;
                  if (0 > r.indexOf(o))
                    throw RangeError(
                      `Expected value of type ${r} for attribute ${t} on type ${e}, got ${o}`
                    );
                };
              })(e, t, n.validate)
            : n.validate);
    }
    get isRequired() {
      return !this.hasDefault;
    }
  }
  class dr {
    constructor(e, t, n, r) {
      (this.name = e),
        (this.rank = t),
        (this.schema = n),
        (this.spec = r),
        (this.attrs = ar(e, r.attrs)),
        (this.excluded = null);
      let o = or(this.attrs);
      this.instance = o ? new In(this, o) : null;
    }
    create(e = null) {
      return !e && this.instance
        ? this.instance
        : new In(this, ir(this.attrs, e));
    }
    static compile(e, t) {
      let n = Object.create(null),
        r = 0;
      return e.forEach((e, o) => (n[e] = new dr(e, r++, t, o))), n;
    }
    removeFromSet(e) {
      for (var t = 0; t < e.length; t++)
        e[t].type == this && ((e = e.slice(0, t).concat(e.slice(t + 1))), t--);
      return e;
    }
    isInSet(e) {
      for (let t = 0; t < e.length; t++) if (e[t].type == this) return e[t];
    }
    checkAttrs(e) {
      sr(this.attrs, e, "mark", this.name);
    }
    excludes(e) {
      return this.excluded.indexOf(e) > -1;
    }
  }
  class ur {
    constructor(e) {
      (this.linebreakReplacement = null), (this.cached = Object.create(null));
      let t = (this.spec = {});
      for (let n in e) t[n] = e[n];
      (t.nodes = An.from(e.nodes)),
        (t.marks = An.from(e.marks || {})),
        (this.nodes = lr.compile(this.spec.nodes, this)),
        (this.marks = dr.compile(this.spec.marks, this));
      let n = Object.create(null);
      for (let e in this.nodes) {
        if (e in this.marks)
          throw RangeError(e + " can not be both a node and a mark");
        let t = this.nodes[e],
          r = t.spec.content || "",
          o = t.spec.marks;
        if (
          ((t.contentMatch = n[r] || (n[r] = Qn.parse(r, this.nodes))),
          (t.inlineContent = t.contentMatch.inlineContent),
          t.spec.linebreakReplacement)
        ) {
          if (this.linebreakReplacement)
            throw RangeError("Multiple linebreak nodes defined");
          if (!t.isInline || !t.isLeaf)
            throw RangeError(
              "Linebreak replacement nodes must be inline leaf nodes"
            );
          this.linebreakReplacement = t;
        }
        t.markSet =
          "_" == o
            ? null
            : o
            ? hr(this, o.split(" "))
            : "" != o && t.inlineContent
            ? null
            : [];
      }
      for (let e in this.marks) {
        let t = this.marks[e],
          n = t.spec.excludes;
        t.excluded = null == n ? [t] : "" == n ? [] : hr(this, n.split(" "));
      }
      (this.nodeFromJSON = this.nodeFromJSON.bind(this)),
        (this.markFromJSON = this.markFromJSON.bind(this)),
        (this.topNodeType = this.nodes[this.spec.topNode || "doc"]),
        (this.cached.wrappings = Object.create(null));
    }
    node(e, t = null, n, r) {
      if ("string" == typeof e) e = this.nodeType(e);
      else {
        if (!(e instanceof lr)) throw RangeError("Invalid node type: " + e);
        if (e.schema != this)
          throw RangeError(
            "Node type from different schema used (" + e.name + ")"
          );
      }
      return e.createChecked(t, n, r);
    }
    text(e, t) {
      let n = this.nodes.text;
      return new Yn(n, n.defaultAttrs, e, In.setFrom(t));
    }
    mark(e, t) {
      return "string" == typeof e && (e = this.marks[e]), e.create(t);
    }
    nodeFromJSON(e) {
      return Gn.fromJSON(this, e);
    }
    markFromJSON(e) {
      return In.fromJSON(this, e);
    }
    nodeType(e) {
      let t = this.nodes[e];
      if (!t) throw RangeError("Unknown node type: " + e);
      return t;
    }
  }
  function hr(e, t) {
    let n = [];
    for (let r = 0; r < t.length; r++) {
      let o = t[r],
        i = e.marks[o],
        s = i;
      if (i) n.push(i);
      else
        for (let t in e.marks) {
          let r = e.marks[t];
          ("_" == o ||
            (r.spec.group && r.spec.group.split(" ").indexOf(o) > -1)) &&
            n.push((s = r));
        }
      if (!s) throw SyntaxError("Unknown mark type: '" + t[r] + "'");
    }
    return n;
  }
  class pr {
    constructor(e, t) {
      (this.schema = e), (this.rules = t), (this.tags = []), (this.styles = []);
      let n = (this.matchedStyles = []);
      t.forEach((e) => {
        if (null != e.tag) this.tags.push(e);
        else if (null != e.style) {
          let t = /[^=]*/.exec(e.style)[0];
          0 > n.indexOf(t) && n.push(t), this.styles.push(e);
        }
      }),
        (this.normalizeLists = !this.tags.some((t) => {
          if (!/^(ul|ol)\b/.test(t.tag) || !t.node) return !1;
          let n = e.nodes[t.node];
          return n.contentMatch.matchType(n);
        }));
    }
    parse(e, t = {}) {
      let n = new br(this, t, !1);
      return n.addAll(e, In.none, t.from, t.to), n.finish();
    }
    parseSlice(e, t = {}) {
      let n = new br(this, t, !0);
      return n.addAll(e, In.none, t.from, t.to), Pn.maxOpen(n.finish());
    }
    matchTag(e, t, n) {
      for (
        let i = n ? this.tags.indexOf(n) + 1 : 0;
        i < this.tags.length;
        i++
      ) {
        var r, o;
        let n = this.tags[i];
        if (
          ((r = e),
          (o = n.tag),
          (
            r.matches ||
            r.msMatchesSelector ||
            r.webkitMatchesSelector ||
            r.mozMatchesSelector
          ).call(r, o) &&
            (void 0 === n.namespace || e.namespaceURI == n.namespace) &&
            (!n.context || t.matchesContext(n.context)))
        ) {
          if (n.getAttrs) {
            let t = n.getAttrs(e);
            if (!1 === t) continue;
            n.attrs = t || void 0;
          }
          return n;
        }
      }
    }
    matchStyle(e, t, n, r) {
      for (
        let o = r ? this.styles.indexOf(r) + 1 : 0;
        o < this.styles.length;
        o++
      ) {
        let r = this.styles[o],
          i = r.style;
        if (
          0 == i.indexOf(e) &&
          (!r.context || n.matchesContext(r.context)) &&
          (!(i.length > e.length) ||
            (61 == i.charCodeAt(e.length) && i.slice(e.length + 1) == t))
        ) {
          if (r.getAttrs) {
            let e = r.getAttrs(t);
            if (!1 === e) continue;
            r.attrs = e || void 0;
          }
          return r;
        }
      }
    }
    static schemaRules(e) {
      let t = [];
      function n(e) {
        let n = null == e.priority ? 50 : e.priority,
          r = 0;
        for (; r < t.length; r++) {
          let e = t[r];
          if ((null == e.priority ? 50 : e.priority) < n) break;
        }
        t.splice(r, 0, e);
      }
      for (let t in e.marks) {
        let r = e.marks[t].spec.parseDOM;
        r &&
          r.forEach((e) => {
            n((e = wr(e))), e.mark || e.ignore || e.clearMark || (e.mark = t);
          });
      }
      for (let t in e.nodes) {
        let r = e.nodes[t].spec.parseDOM;
        r &&
          r.forEach((e) => {
            n((e = wr(e))), e.node || e.ignore || e.mark || (e.node = t);
          });
      }
      return t;
    }
    static fromSchema(e) {
      return (
        e.cached.domParser ||
        (e.cached.domParser = new pr(e, pr.schemaRules(e)))
      );
    }
  }
  let fr = {
      address: !0,
      article: !0,
      aside: !0,
      blockquote: !0,
      canvas: !0,
      dd: !0,
      div: !0,
      dl: !0,
      fieldset: !0,
      figcaption: !0,
      figure: !0,
      footer: !0,
      form: !0,
      h1: !0,
      h2: !0,
      h3: !0,
      h4: !0,
      h5: !0,
      h6: !0,
      header: !0,
      hgroup: !0,
      hr: !0,
      li: !0,
      noscript: !0,
      ol: !0,
      output: !0,
      p: !0,
      pre: !0,
      section: !0,
      table: !0,
      tfoot: !0,
      ul: !0,
    },
    mr = {
      head: !0,
      noscript: !0,
      object: !0,
      script: !0,
      style: !0,
      title: !0,
    },
    gr = { ol: !0, ul: !0 };
  function vr(e, t, n) {
    return null != t
      ? !!t | (2 * ("full" === t))
      : e && "pre" == e.whitespace
      ? 3
      : -5 & n;
  }
  class yr {
    constructor(e, t, n, r, o, i) {
      (this.type = e),
        (this.attrs = t),
        (this.marks = n),
        (this.solid = r),
        (this.options = i),
        (this.content = []),
        (this.activeMarks = In.none),
        (this.match = o || (4 & i ? null : e.contentMatch));
    }
    findWrapping(e) {
      if (!this.match) {
        if (!this.type) return [];
        let t = this.type.contentMatch.fillBefore(Mn.from(e));
        if (!t) {
          let t,
            n = this.type.contentMatch;
          return (t = n.findWrapping(e.type)) ? ((this.match = n), t) : null;
        }
        this.match = this.type.contentMatch.matchFragment(t);
      }
      return this.match.findWrapping(e.type);
    }
    finish(e) {
      if (!(1 & this.options)) {
        let e,
          t = this.content[this.content.length - 1];
        t &&
          t.isText &&
          (e = /[ \t\r\n\u000c]+$/.exec(t.text)) &&
          (t.text.length == e[0].length
            ? this.content.pop()
            : (this.content[this.content.length - 1] = t.withText(
                t.text.slice(0, t.text.length - e[0].length)
              )));
      }
      let t = Mn.from(this.content);
      return (
        !e && this.match && (t = t.append(this.match.fillBefore(Mn.empty, !0))),
        this.type ? this.type.create(this.attrs, t, this.marks) : t
      );
    }
    inlineContext(e) {
      return this.type
        ? this.type.inlineContent
        : this.content.length
        ? this.content[0].isInline
        : e.parentNode &&
          !fr.hasOwnProperty(e.parentNode.nodeName.toLowerCase());
    }
  }
  class br {
    constructor(e, t, n) {
      (this.parser = e),
        (this.options = t),
        (this.isOpen = n),
        (this.open = 0),
        (this.localPreserveWS = !1);
      let r,
        o = t.topNode,
        i = vr(null, t.preserveWhitespace, 0) | (4 * !!n);
      (r = o
        ? new yr(
            o.type,
            o.attrs,
            In.none,
            !0,
            t.topMatch || o.type.contentMatch,
            i
          )
        : new yr(n ? null : e.schema.topNodeType, null, In.none, !0, null, i)),
        (this.nodes = [r]),
        (this.find = t.findPositions),
        (this.needsBlock = !1);
    }
    get top() {
      return this.nodes[this.open];
    }
    addDOM(e, t) {
      3 == e.nodeType
        ? this.addTextNode(e, t)
        : 1 == e.nodeType && this.addElement(e, t);
    }
    addTextNode(e, t) {
      let n = e.nodeValue,
        r = this.top,
        o =
          2 & r.options ? "full" : this.localPreserveWS || (1 & r.options) > 0;
      if ("full" === o || r.inlineContext(e) || /[^ \t\r\n\u000c]/.test(n)) {
        if (o)
          n =
            "full" !== o
              ? n.replace(/\r?\n|\r/g, " ")
              : n.replace(/\r\n?/g, "\n");
        else if (
          ((n = n.replace(/[ \t\r\n\u000c]+/g, " ")),
          /^[ \t\r\n\u000c]/.test(n) && this.open == this.nodes.length - 1)
        ) {
          let t = r.content[r.content.length - 1],
            o = e.previousSibling;
          (!t ||
            (o && "BR" == o.nodeName) ||
            (t.isText && /[ \t\r\n\u000c]$/.test(t.text))) &&
            (n = n.slice(1));
        }
        n && this.insertNode(this.parser.schema.text(n), t), this.findInText(e);
      } else this.findInside(e);
    }
    addElement(e, t, n) {
      let r = this.localPreserveWS,
        o = this.top;
      ("PRE" == e.tagName || /pre/.test(e.style && e.style.whiteSpace)) &&
        (this.localPreserveWS = !0);
      let i,
        s = e.nodeName.toLowerCase();
      gr.hasOwnProperty(s) &&
        this.parser.normalizeLists &&
        (function (e) {
          for (let t = e.firstChild, n = null; t; t = t.nextSibling) {
            let e = 1 == t.nodeType ? t.nodeName.toLowerCase() : null;
            e && gr.hasOwnProperty(e) && n
              ? (n.appendChild(t), (t = n))
              : "li" == e
              ? (n = t)
              : e && (n = null);
          }
        })(e);
      let a =
        (this.options.ruleFromNode && this.options.ruleFromNode(e)) ||
        (i = this.parser.matchTag(e, this, n));
      e: if (a ? a.ignore : mr.hasOwnProperty(s))
        this.findInside(e), this.ignoreFallback(e, t);
      else if (!a || a.skip || a.closeParent) {
        a && a.closeParent
          ? (this.open = Math.max(0, this.open - 1))
          : a && a.skip.nodeType && (e = a.skip);
        let n,
          r = this.needsBlock;
        if (fr.hasOwnProperty(s))
          o.content.length &&
            o.content[0].isInline &&
            this.open &&
            (this.open--, (o = this.top)),
            (n = !0),
            o.type || (this.needsBlock = !0);
        else if (!e.firstChild) {
          this.leafFallback(e, t);
          break e;
        }
        let i = a && a.skip ? t : this.readStyles(e, t);
        i && this.addAll(e, i), n && this.sync(o), (this.needsBlock = r);
      } else {
        let n = this.readStyles(e, t);
        n && this.addElementByRule(e, a, n, !1 === a.consuming ? i : void 0);
      }
      this.localPreserveWS = r;
    }
    leafFallback(e, t) {
      "BR" == e.nodeName &&
        this.top.type &&
        this.top.type.inlineContent &&
        this.addTextNode(e.ownerDocument.createTextNode("\n"), t);
    }
    ignoreFallback(e, t) {
      "BR" != e.nodeName ||
        (this.top.type && this.top.type.inlineContent) ||
        this.findPlace(this.parser.schema.text("-"), t);
    }
    readStyles(e, t) {
      let n = e.style;
      if (n && n.length)
        for (let e = 0; e < this.parser.matchedStyles.length; e++) {
          let r = this.parser.matchedStyles[e],
            o = n.getPropertyValue(r);
          if (o)
            for (let e; ; ) {
              let n = this.parser.matchStyle(r, o, this, e);
              if (!n) break;
              if (n.ignore) return null;
              if (
                ((t = n.clearMark
                  ? t.filter((e) => !n.clearMark(e))
                  : t.concat(this.parser.schema.marks[n.mark].create(n.attrs))),
                !1 !== n.consuming)
              )
                break;
              e = n;
            }
        }
      return t;
    }
    addElementByRule(e, t, n, r) {
      let o, i;
      if (t.node)
        if ((i = this.parser.schema.nodes[t.node]).isLeaf)
          this.insertNode(i.create(t.attrs), n) || this.leafFallback(e, n);
        else {
          let e = this.enter(i, t.attrs || null, n, t.preserveWhitespace);
          e && ((o = !0), (n = e));
        }
      else {
        let e = this.parser.schema.marks[t.mark];
        n = n.concat(e.create(t.attrs));
      }
      let s = this.top;
      if (i && i.isLeaf) this.findInside(e);
      else if (r) this.addElement(e, n, r);
      else if (t.getContent)
        this.findInside(e),
          t
            .getContent(e, this.parser.schema)
            .forEach((e) => this.insertNode(e, n));
      else {
        let r = e;
        "string" == typeof t.contentElement
          ? (r = e.querySelector(t.contentElement))
          : "function" == typeof t.contentElement
          ? (r = t.contentElement(e))
          : t.contentElement && (r = t.contentElement),
          this.findAround(e, r, !0),
          this.addAll(r, n),
          this.findAround(e, r, !1);
      }
      o && this.sync(s) && this.open--;
    }
    addAll(e, t, n, r) {
      let o = n || 0;
      for (
        let i = n ? e.childNodes[n] : e.firstChild,
          s = null == r ? null : e.childNodes[r];
        i != s;
        i = i.nextSibling, ++o
      )
        this.findAtPoint(e, o), this.addDOM(i, t);
      this.findAtPoint(e, o);
    }
    findPlace(e, t) {
      let n, r;
      for (let t = this.open; t >= 0; t--) {
        let o = this.nodes[t],
          i = o.findWrapping(e);
        if (
          (i && (!n || n.length > i.length) && ((n = i), (r = o), !i.length)) ||
          o.solid
        )
          break;
      }
      if (!n) return null;
      this.sync(r);
      for (let e = 0; e < n.length; e++) t = this.enterInner(n[e], null, t, !1);
      return t;
    }
    insertNode(e, t) {
      if (e.isInline && this.needsBlock && !this.top.type) {
        let e = this.textblockFromContext();
        e && (t = this.enterInner(e, null, t));
      }
      let n = this.findPlace(e, t);
      if (n) {
        this.closeExtra();
        let t = this.top;
        t.match && (t.match = t.match.matchType(e.type));
        let r = In.none;
        for (let o of n.concat(e.marks))
          (t.type ? t.type.allowsMarkType(o.type) : kr(o.type, e.type)) &&
            (r = o.addToSet(r));
        return t.content.push(e.mark(r)), !0;
      }
      return !1;
    }
    enter(e, t, n, r) {
      let o = this.findPlace(e.create(t), n);
      return o && (o = this.enterInner(e, t, n, !0, r)), o;
    }
    enterInner(e, t, n, r = !1, o) {
      this.closeExtra();
      let i = this.top;
      i.match = i.match && i.match.matchType(e);
      let s = vr(e, o, i.options);
      4 & i.options && 0 == i.content.length && (s |= 4);
      let a = In.none;
      return (
        (n = n.filter(
          (t) =>
            (i.type ? !i.type.allowsMarkType(t.type) : !kr(t.type, e)) ||
            ((a = t.addToSet(a)), !1)
        )),
        this.nodes.push(new yr(e, t, a, r, null, s)),
        this.open++,
        n
      );
    }
    closeExtra(e = !1) {
      let t = this.nodes.length - 1;
      if (t > this.open) {
        for (; t > this.open; t--)
          this.nodes[t - 1].content.push(this.nodes[t].finish(e));
        this.nodes.length = this.open + 1;
      }
    }
    finish() {
      return (
        (this.open = 0),
        this.closeExtra(this.isOpen),
        this.nodes[0].finish(!(!this.isOpen && !this.options.topOpen))
      );
    }
    sync(e) {
      for (let t = this.open; t >= 0; t--) {
        if (this.nodes[t] == e) return (this.open = t), !0;
        this.localPreserveWS && (this.nodes[t].options |= 1);
      }
      return !1;
    }
    get currentPos() {
      this.closeExtra();
      let e = 0;
      for (let t = this.open; t >= 0; t--) {
        let n = this.nodes[t].content;
        for (let t = n.length - 1; t >= 0; t--) e += n[t].nodeSize;
        t && e++;
      }
      return e;
    }
    findAtPoint(e, t) {
      if (this.find)
        for (let n = 0; n < this.find.length; n++)
          this.find[n].node == e &&
            this.find[n].offset == t &&
            (this.find[n].pos = this.currentPos);
    }
    findInside(e) {
      if (this.find)
        for (let t = 0; t < this.find.length; t++)
          null == this.find[t].pos &&
            1 == e.nodeType &&
            e.contains(this.find[t].node) &&
            (this.find[t].pos = this.currentPos);
    }
    findAround(e, t, n) {
      if (e != t && this.find)
        for (let r = 0; r < this.find.length; r++)
          null == this.find[r].pos &&
            1 == e.nodeType &&
            e.contains(this.find[r].node) &&
            t.compareDocumentPosition(this.find[r].node) & (n ? 2 : 4) &&
            (this.find[r].pos = this.currentPos);
    }
    findInText(e) {
      if (this.find)
        for (let t = 0; t < this.find.length; t++)
          this.find[t].node == e &&
            (this.find[t].pos =
              this.currentPos - (e.nodeValue.length - this.find[t].offset));
    }
    matchesContext(e) {
      if (e.indexOf("|") > -1)
        return e.split(/\s*\|\s*/).some(this.matchesContext, this);
      let t = e.split("/"),
        n = this.options.context,
        r = !(this.isOpen || (n && n.parent.type != this.nodes[0].type)),
        o = -(n ? n.depth + 1 : 0) + +!r,
        i = (e, s) => {
          for (; e >= 0; e--) {
            let a = t[e];
            if ("" == a) {
              if (e == t.length - 1 || 0 == e) continue;
              for (; s >= o; s--) if (i(e - 1, s)) return !0;
              return !1;
            }
            {
              let e =
                s > 0 || (0 == s && r)
                  ? this.nodes[s].type
                  : n && s >= o
                  ? n.node(s - o).type
                  : null;
              if (!e || (e.name != a && !e.isInGroup(a))) return !1;
              s--;
            }
          }
          return !0;
        };
      return i(t.length - 1, this.open);
    }
    textblockFromContext() {
      let e = this.options.context;
      if (e)
        for (let t = e.depth; t >= 0; t--) {
          let n = e.node(t).contentMatchAt(e.indexAfter(t)).defaultType;
          if (n && n.isTextblock && n.defaultAttrs) return n;
        }
      for (let e in this.parser.schema.nodes) {
        let t = this.parser.schema.nodes[e];
        if (t.isTextblock && t.defaultAttrs) return t;
      }
    }
  }
  function wr(e) {
    let t = {};
    for (let n in e) t[n] = e[n];
    return t;
  }
  function kr(e, t) {
    let n = t.schema.nodes;
    for (let r in n) {
      let o = n[r];
      if (!o.allowsMarkType(e)) continue;
      let i = [],
        s = (e) => {
          i.push(e);
          for (let n = 0; n < e.edgeCount; n++) {
            let { type: r, next: o } = e.edge(n);
            if (r == t || (0 > i.indexOf(o) && s(o))) return !0;
          }
        };
      if (s(o.contentMatch)) return !0;
    }
  }
  class xr {
    constructor(e, t) {
      (this.nodes = e), (this.marks = t);
    }
    serializeFragment(e, t = {}, n) {
      n || (n = Er(t).createDocumentFragment());
      let r = n,
        o = [];
      return (
        e.forEach((e) => {
          if (o.length || e.marks.length) {
            let n = 0,
              i = 0;
            for (; n < o.length && i < e.marks.length; ) {
              let t = e.marks[i];
              if (this.marks[t.type.name]) {
                if (!t.eq(o[n][0]) || !1 === t.type.spec.spanning) break;
                n++, i++;
              } else i++;
            }
            for (; n < o.length; ) r = o.pop()[1];
            for (; i < e.marks.length; ) {
              let n = e.marks[i++],
                s = this.serializeMark(n, e.isInline, t);
              s &&
                (o.push([n, r]),
                r.appendChild(s.dom),
                (r = s.contentDOM || s.dom));
            }
          }
          r.appendChild(this.serializeNodeInner(e, t));
        }),
        n
      );
    }
    serializeNodeInner(e, t) {
      let { dom: n, contentDOM: r } = Cr(
        Er(t),
        this.nodes[e.type.name](e),
        null,
        e.attrs
      );
      if (r) {
        if (e.isLeaf)
          throw RangeError("Content hole not allowed in a leaf node spec");
        this.serializeFragment(e.content, t, r);
      }
      return n;
    }
    serializeNode(e, t = {}) {
      let n = this.serializeNodeInner(e, t);
      for (let r = e.marks.length - 1; r >= 0; r--) {
        let o = this.serializeMark(e.marks[r], e.isInline, t);
        o && ((o.contentDOM || o.dom).appendChild(n), (n = o.dom));
      }
      return n;
    }
    serializeMark(e, t, n = {}) {
      let r = this.marks[e.type.name];
      return r && Cr(Er(n), r(e, t), null, e.attrs);
    }
    static renderSpec(e, t, n = null, r) {
      return Cr(e, t, n, r);
    }
    static fromSchema(e) {
      return (
        e.cached.domSerializer ||
        (e.cached.domSerializer = new xr(
          this.nodesFromSchema(e),
          this.marksFromSchema(e)
        ))
      );
    }
    static nodesFromSchema(e) {
      let t = Sr(e.nodes);
      return t.text || (t.text = (e) => e.text), t;
    }
    static marksFromSchema(e) {
      return Sr(e.marks);
    }
  }
  function Sr(e) {
    let t = {};
    for (let n in e) {
      let r = e[n].spec.toDOM;
      r && (t[n] = r);
    }
    return t;
  }
  function Er(e) {
    return e.document || window.document;
  }
  let _r = new WeakMap();
  function Cr(e, t, n, r) {
    let o, i, s;
    if ("string" == typeof t) return { dom: e.createTextNode(t) };
    if (null != t.nodeType) return { dom: t };
    if (t.dom && null != t.dom.nodeType) return t;
    let a,
      l = t[0];
    if ("string" != typeof l)
      throw RangeError("Invalid array passed to renderSpec");
    if (
      r &&
      (void 0 === (i = _r.get(r)) &&
        _r.set(
          r,
          ((s = null),
          (function e(t) {
            if (t && "object" == typeof t)
              if (Array.isArray(t))
                if ("string" == typeof t[0]) s || (s = []), s.push(t);
                else for (let n = 0; n < t.length; n++) e(t[n]);
              else for (let n in t) e(t[n]);
          })(r),
          (i = s))
        ),
      (a = i)) &&
      a.indexOf(t) > -1
    )
      throw RangeError(
        "Using an array from an attribute object as a DOM spec. This may be an attempted cross site scripting attack."
      );
    let c = l.indexOf(" ");
    c > 0 && ((n = l.slice(0, c)), (l = l.slice(c + 1)));
    let d = n ? e.createElementNS(n, l) : e.createElement(l),
      u = t[1],
      h = 1;
    if (u && "object" == typeof u && null == u.nodeType && !Array.isArray(u))
      for (let e in ((h = 2), u))
        if (null != u[e]) {
          let t = e.indexOf(" ");
          t > 0
            ? d.setAttributeNS(e.slice(0, t), e.slice(t + 1), u[e])
            : d.setAttribute(e, u[e]);
        }
    for (let i = h; i < t.length; i++) {
      let s = t[i];
      if (0 === s) {
        if (i < t.length - 1 || i > h)
          throw RangeError(
            "Content hole must be the only child of its parent node"
          );
        return { dom: d, contentDOM: d };
      }
      {
        let { dom: t, contentDOM: i } = Cr(e, s, n, r);
        if ((d.appendChild(t), i)) {
          if (o) throw RangeError("Multiple content holes");
          o = i;
        }
      }
    }
    return { dom: d, contentDOM: o };
  }
  class Tr {
    constructor(e, t, n) {
      (this.pos = e), (this.delInfo = t), (this.recover = n);
    }
    get deleted() {
      return (8 & this.delInfo) > 0;
    }
    get deletedBefore() {
      return (5 & this.delInfo) > 0;
    }
    get deletedAfter() {
      return (6 & this.delInfo) > 0;
    }
    get deletedAcross() {
      return (4 & this.delInfo) > 0;
    }
  }
  class Or {
    constructor(e, t = !1) {
      if (((this.ranges = e), (this.inverted = t), !e.length && Or.empty))
        return Or.empty;
    }
    recover(e) {
      let t = 0,
        n = 65535 & e;
      if (!this.inverted)
        for (let e = 0; e < n; e++)
          t += this.ranges[3 * e + 2] - this.ranges[3 * e + 1];
      return this.ranges[3 * n] + t + (e - (65535 & e)) / 65536;
    }
    mapResult(e, t = 1) {
      return this._map(e, t, !1);
    }
    map(e, t = 1) {
      return this._map(e, t, !0);
    }
    _map(e, t, n) {
      let r = 0,
        o = this.inverted ? 2 : 1,
        i = this.inverted ? 1 : 2;
      for (let s = 0; s < this.ranges.length; s += 3) {
        let a = this.ranges[s] - (this.inverted ? r : 0);
        if (a > e) break;
        let l = this.ranges[s + o],
          c = this.ranges[s + i],
          d = a + l;
        if (e <= d) {
          let o =
            a + r + ((l ? (e == a ? -1 : e == d ? 1 : t) : t) < 0 ? 0 : c);
          if (n) return o;
          let i = e == a ? 2 : e == d ? 1 : 4;
          return (
            (t < 0 ? e != a : e != d) && (i |= 8),
            new Tr(o, i, e == (t < 0 ? a : d) ? null : s / 3 + 65536 * (e - a))
          );
        }
        r += c - l;
      }
      return n ? e + r : new Tr(e + r, 0, null);
    }
    touches(e, t) {
      let n = 0,
        r = 65535 & t,
        o = this.inverted ? 2 : 1,
        i = this.inverted ? 1 : 2;
      for (let t = 0; t < this.ranges.length; t += 3) {
        let s = this.ranges[t] - (this.inverted ? n : 0);
        if (s > e) break;
        let a = this.ranges[t + o];
        if (e <= s + a && t == 3 * r) return !0;
        n += this.ranges[t + i] - a;
      }
      return !1;
    }
    forEach(e) {
      let t = this.inverted ? 2 : 1,
        n = this.inverted ? 1 : 2;
      for (let r = 0, o = 0; r < this.ranges.length; r += 3) {
        let i = this.ranges[r],
          s = i - (this.inverted ? o : 0),
          a = i + (this.inverted ? 0 : o),
          l = this.ranges[r + t],
          c = this.ranges[r + n];
        e(s, s + l, a, a + c), (o += c - l);
      }
    }
    invert() {
      return new Or(this.ranges, !this.inverted);
    }
    toString() {
      return (this.inverted ? "-" : "") + JSON.stringify(this.ranges);
    }
    static offset(e) {
      return 0 == e ? Or.empty : new Or(e < 0 ? [0, -e, 0] : [0, 0, e]);
    }
  }
  Or.empty = new Or([]);
  class Nr {
    constructor(e, t, n = 0, r = e ? e.length : 0) {
      (this.mirror = t),
        (this.from = n),
        (this.to = r),
        (this._maps = e || []),
        (this.ownData = !(e || t));
    }
    get maps() {
      return this._maps;
    }
    slice(e = 0, t = this.maps.length) {
      return new Nr(this._maps, this.mirror, e, t);
    }
    appendMap(e, t) {
      this.ownData ||
        ((this._maps = this._maps.slice()),
        (this.mirror = this.mirror && this.mirror.slice()),
        (this.ownData = !0)),
        (this.to = this._maps.push(e)),
        null != t && this.setMirror(this._maps.length - 1, t);
    }
    appendMapping(e) {
      for (let t = 0, n = this._maps.length; t < e._maps.length; t++) {
        let r = e.getMirror(t);
        this.appendMap(e._maps[t], null != r && r < t ? n + r : void 0);
      }
    }
    getMirror(e) {
      if (this.mirror)
        for (let t = 0; t < this.mirror.length; t++)
          if (this.mirror[t] == e) return this.mirror[t + (t % 2 ? -1 : 1)];
    }
    setMirror(e, t) {
      this.mirror || (this.mirror = []), this.mirror.push(e, t);
    }
    appendMappingInverted(e) {
      for (
        let t = e.maps.length - 1, n = this._maps.length + e._maps.length;
        t >= 0;
        t--
      ) {
        let r = e.getMirror(t);
        this.appendMap(
          e._maps[t].invert(),
          null != r && r > t ? n - r - 1 : void 0
        );
      }
    }
    invert() {
      let e = new Nr();
      return e.appendMappingInverted(this), e;
    }
    map(e, t = 1) {
      if (this.mirror) return this._map(e, t, !0);
      for (let n = this.from; n < this.to; n++) e = this._maps[n].map(e, t);
      return e;
    }
    mapResult(e, t = 1) {
      return this._map(e, t, !1);
    }
    _map(e, t, n) {
      let r = 0;
      for (let n = this.from; n < this.to; n++) {
        let o = this._maps[n].mapResult(e, t);
        if (null != o.recover) {
          let t = this.getMirror(n);
          if (null != t && t > n && t < this.to) {
            (n = t), (e = this._maps[t].recover(o.recover));
            continue;
          }
        }
        (r |= o.delInfo), (e = o.pos);
      }
      return n ? e : new Tr(e, r, null);
    }
  }
  let Ar = Object.create(null);
  class Mr {
    getMap() {
      return Or.empty;
    }
    merge(e) {
      return null;
    }
    static fromJSON(e, t) {
      if (!t || !t.stepType)
        throw RangeError("Invalid input for Step.fromJSON");
      let n = Ar[t.stepType];
      if (!n) throw RangeError(`No step type ${t.stepType} defined`);
      return n.fromJSON(e, t);
    }
    static jsonID(e, t) {
      if (e in Ar) throw RangeError("Duplicate use of step JSON ID " + e);
      return (Ar[e] = t), (t.prototype.jsonID = e), t;
    }
  }
  class Dr {
    constructor(e, t) {
      (this.doc = e), (this.failed = t);
    }
    static ok(e) {
      return new Dr(e, null);
    }
    static fail(e) {
      return new Dr(null, e);
    }
    static fromReplace(e, t, n, r) {
      try {
        return Dr.ok(e.replace(t, n, r));
      } catch (e) {
        if (e instanceof zn) return Dr.fail(e.message);
        throw e;
      }
    }
  }
  function Rr(e, t, n) {
    let r = [];
    for (let o = 0; o < e.childCount; o++) {
      let i = e.child(o);
      i.content.size && (i = i.copy(Rr(i.content, t, i))),
        i.isInline && (i = t(i, n, o)),
        r.push(i);
    }
    return Mn.fromArray(r);
  }
  class $r extends Mr {
    constructor(e, t, n) {
      super(), (this.from = e), (this.to = t), (this.mark = n);
    }
    apply(e) {
      let t = e.slice(this.from, this.to),
        n = e.resolve(this.from),
        r = n.node(n.sharedDepth(this.to)),
        o = new Pn(
          Rr(
            t.content,
            (e, t) =>
              e.isAtom && t.type.allowsMarkType(this.mark.type)
                ? e.mark(this.mark.addToSet(e.marks))
                : e,
            r
          ),
          t.openStart,
          t.openEnd
        );
      return Dr.fromReplace(e, this.from, this.to, o);
    }
    invert() {
      return new Ir(this.from, this.to, this.mark);
    }
    map(e) {
      let t = e.mapResult(this.from, 1),
        n = e.mapResult(this.to, -1);
      return (t.deleted && n.deleted) || t.pos >= n.pos
        ? null
        : new $r(t.pos, n.pos, this.mark);
    }
    merge(e) {
      return e instanceof $r &&
        e.mark.eq(this.mark) &&
        this.from <= e.to &&
        this.to >= e.from
        ? new $r(
            Math.min(this.from, e.from),
            Math.max(this.to, e.to),
            this.mark
          )
        : null;
    }
    toJSON() {
      return {
        stepType: "addMark",
        mark: this.mark.toJSON(),
        from: this.from,
        to: this.to,
      };
    }
    static fromJSON(e, t) {
      if ("number" != typeof t.from || "number" != typeof t.to)
        throw RangeError("Invalid input for AddMarkStep.fromJSON");
      return new $r(t.from, t.to, e.markFromJSON(t.mark));
    }
  }
  Mr.jsonID("addMark", $r);
  class Ir extends Mr {
    constructor(e, t, n) {
      super(), (this.from = e), (this.to = t), (this.mark = n);
    }
    apply(e) {
      let t = e.slice(this.from, this.to),
        n = new Pn(
          Rr(t.content, (e) => e.mark(this.mark.removeFromSet(e.marks)), e),
          t.openStart,
          t.openEnd
        );
      return Dr.fromReplace(e, this.from, this.to, n);
    }
    invert() {
      return new $r(this.from, this.to, this.mark);
    }
    map(e) {
      let t = e.mapResult(this.from, 1),
        n = e.mapResult(this.to, -1);
      return (t.deleted && n.deleted) || t.pos >= n.pos
        ? null
        : new Ir(t.pos, n.pos, this.mark);
    }
    merge(e) {
      return e instanceof Ir &&
        e.mark.eq(this.mark) &&
        this.from <= e.to &&
        this.to >= e.from
        ? new Ir(
            Math.min(this.from, e.from),
            Math.max(this.to, e.to),
            this.mark
          )
        : null;
    }
    toJSON() {
      return {
        stepType: "removeMark",
        mark: this.mark.toJSON(),
        from: this.from,
        to: this.to,
      };
    }
    static fromJSON(e, t) {
      if ("number" != typeof t.from || "number" != typeof t.to)
        throw RangeError("Invalid input for RemoveMarkStep.fromJSON");
      return new Ir(t.from, t.to, e.markFromJSON(t.mark));
    }
  }
  Mr.jsonID("removeMark", Ir);
  class zr extends Mr {
    constructor(e, t) {
      super(), (this.pos = e), (this.mark = t);
    }
    apply(e) {
      let t = e.nodeAt(this.pos);
      if (!t) return Dr.fail("No node at mark step's position");
      let n = t.type.create(t.attrs, null, this.mark.addToSet(t.marks));
      return Dr.fromReplace(
        e,
        this.pos,
        this.pos + 1,
        new Pn(Mn.from(n), 0, +!t.isLeaf)
      );
    }
    invert(e) {
      let t = e.nodeAt(this.pos);
      if (t) {
        let e = this.mark.addToSet(t.marks);
        if (e.length == t.marks.length) {
          for (let n = 0; n < t.marks.length; n++)
            if (!t.marks[n].isInSet(e)) return new zr(this.pos, t.marks[n]);
          return new zr(this.pos, this.mark);
        }
      }
      return new Pr(this.pos, this.mark);
    }
    map(e) {
      let t = e.mapResult(this.pos, 1);
      return t.deletedAfter ? null : new zr(t.pos, this.mark);
    }
    toJSON() {
      return {
        stepType: "addNodeMark",
        pos: this.pos,
        mark: this.mark.toJSON(),
      };
    }
    static fromJSON(e, t) {
      if ("number" != typeof t.pos)
        throw RangeError("Invalid input for AddNodeMarkStep.fromJSON");
      return new zr(t.pos, e.markFromJSON(t.mark));
    }
  }
  Mr.jsonID("addNodeMark", zr);
  class Pr extends Mr {
    constructor(e, t) {
      super(), (this.pos = e), (this.mark = t);
    }
    apply(e) {
      let t = e.nodeAt(this.pos);
      if (!t) return Dr.fail("No node at mark step's position");
      let n = t.type.create(t.attrs, null, this.mark.removeFromSet(t.marks));
      return Dr.fromReplace(
        e,
        this.pos,
        this.pos + 1,
        new Pn(Mn.from(n), 0, +!t.isLeaf)
      );
    }
    invert(e) {
      let t = e.nodeAt(this.pos);
      return t && this.mark.isInSet(t.marks)
        ? new zr(this.pos, this.mark)
        : this;
    }
    map(e) {
      let t = e.mapResult(this.pos, 1);
      return t.deletedAfter ? null : new Pr(t.pos, this.mark);
    }
    toJSON() {
      return {
        stepType: "removeNodeMark",
        pos: this.pos,
        mark: this.mark.toJSON(),
      };
    }
    static fromJSON(e, t) {
      if ("number" != typeof t.pos)
        throw RangeError("Invalid input for RemoveNodeMarkStep.fromJSON");
      return new Pr(t.pos, e.markFromJSON(t.mark));
    }
  }
  Mr.jsonID("removeNodeMark", Pr);
  class Vr extends Mr {
    constructor(e, t, n, r = !1) {
      super(),
        (this.from = e),
        (this.to = t),
        (this.slice = n),
        (this.structure = r);
    }
    apply(e) {
      return this.structure && Br(e, this.from, this.to)
        ? Dr.fail("Structure replace would overwrite content")
        : Dr.fromReplace(e, this.from, this.to, this.slice);
    }
    getMap() {
      return new Or([this.from, this.to - this.from, this.slice.size]);
    }
    invert(e) {
      return new Vr(
        this.from,
        this.from + this.slice.size,
        e.slice(this.from, this.to)
      );
    }
    map(e) {
      let t = e.mapResult(this.from, 1),
        n = e.mapResult(this.to, -1);
      return t.deletedAcross && n.deletedAcross
        ? null
        : new Vr(t.pos, Math.max(t.pos, n.pos), this.slice);
    }
    merge(e) {
      if (!(e instanceof Vr) || e.structure || this.structure) return null;
      if (
        this.from + this.slice.size != e.from ||
        this.slice.openEnd ||
        e.slice.openStart
      ) {
        if (e.to != this.from || this.slice.openStart || e.slice.openEnd)
          return null;
        {
          let t =
            this.slice.size + e.slice.size == 0
              ? Pn.empty
              : new Pn(
                  e.slice.content.append(this.slice.content),
                  e.slice.openStart,
                  this.slice.openEnd
                );
          return new Vr(e.from, this.to, t, this.structure);
        }
      }
      {
        let t =
          this.slice.size + e.slice.size == 0
            ? Pn.empty
            : new Pn(
                this.slice.content.append(e.slice.content),
                this.slice.openStart,
                e.slice.openEnd
              );
        return new Vr(this.from, this.to + (e.to - e.from), t, this.structure);
      }
    }
    toJSON() {
      let e = { stepType: "replace", from: this.from, to: this.to };
      return (
        this.slice.size && (e.slice = this.slice.toJSON()),
        this.structure && (e.structure = !0),
        e
      );
    }
    static fromJSON(e, t) {
      if ("number" != typeof t.from || "number" != typeof t.to)
        throw RangeError("Invalid input for ReplaceStep.fromJSON");
      return new Vr(t.from, t.to, Pn.fromJSON(e, t.slice), !!t.structure);
    }
  }
  Mr.jsonID("replace", Vr);
  class Lr extends Mr {
    constructor(e, t, n, r, o, i, s = !1) {
      super(),
        (this.from = e),
        (this.to = t),
        (this.gapFrom = n),
        (this.gapTo = r),
        (this.slice = o),
        (this.insert = i),
        (this.structure = s);
    }
    apply(e) {
      if (
        this.structure &&
        (Br(e, this.from, this.gapFrom) || Br(e, this.gapTo, this.to))
      )
        return Dr.fail("Structure gap-replace would overwrite content");
      let t = e.slice(this.gapFrom, this.gapTo);
      if (t.openStart || t.openEnd) return Dr.fail("Gap is not a flat range");
      let n = this.slice.insertAt(this.insert, t.content);
      return n
        ? Dr.fromReplace(e, this.from, this.to, n)
        : Dr.fail("Content does not fit in gap");
    }
    getMap() {
      return new Or([
        this.from,
        this.gapFrom - this.from,
        this.insert,
        this.gapTo,
        this.to - this.gapTo,
        this.slice.size - this.insert,
      ]);
    }
    invert(e) {
      let t = this.gapTo - this.gapFrom;
      return new Lr(
        this.from,
        this.from + this.slice.size + t,
        this.from + this.insert,
        this.from + this.insert + t,
        e
          .slice(this.from, this.to)
          .removeBetween(this.gapFrom - this.from, this.gapTo - this.from),
        this.gapFrom - this.from,
        this.structure
      );
    }
    map(e) {
      let t = e.mapResult(this.from, 1),
        n = e.mapResult(this.to, -1),
        r = this.from == this.gapFrom ? t.pos : e.map(this.gapFrom, -1),
        o = this.to == this.gapTo ? n.pos : e.map(this.gapTo, 1);
      return (t.deletedAcross && n.deletedAcross) || r < t.pos || o > n.pos
        ? null
        : new Lr(t.pos, n.pos, r, o, this.slice, this.insert, this.structure);
    }
    toJSON() {
      let e = {
        stepType: "replaceAround",
        from: this.from,
        to: this.to,
        gapFrom: this.gapFrom,
        gapTo: this.gapTo,
        insert: this.insert,
      };
      return (
        this.slice.size && (e.slice = this.slice.toJSON()),
        this.structure && (e.structure = !0),
        e
      );
    }
    static fromJSON(e, t) {
      if (
        "number" != typeof t.from ||
        "number" != typeof t.to ||
        "number" != typeof t.gapFrom ||
        "number" != typeof t.gapTo ||
        "number" != typeof t.insert
      )
        throw RangeError("Invalid input for ReplaceAroundStep.fromJSON");
      return new Lr(
        t.from,
        t.to,
        t.gapFrom,
        t.gapTo,
        Pn.fromJSON(e, t.slice),
        t.insert,
        !!t.structure
      );
    }
  }
  function Br(e, t, n) {
    let r = e.resolve(t),
      o = n - t,
      i = r.depth;
    for (; o > 0 && i > 0 && r.indexAfter(i) == r.node(i).childCount; )
      i--, o--;
    if (o > 0) {
      let e = r.node(i).maybeChild(r.indexAfter(i));
      for (; o > 0; ) {
        if (!e || e.isLeaf) return !0;
        (e = e.firstChild), o--;
      }
    }
    return !1;
  }
  function jr(e, t, n, r = n.contentMatch, o = !0) {
    let i = e.doc.nodeAt(t),
      s = [],
      a = t + 1;
    for (let t = 0; t < i.childCount; t++) {
      let l = i.child(t),
        c = a + l.nodeSize,
        d = r.matchType(l.type);
      if (d) {
        r = d;
        for (let t = 0; t < l.marks.length; t++)
          n.allowsMarkType(l.marks[t].type) || e.step(new Ir(a, c, l.marks[t]));
        if (o && l.isText && "pre" != n.whitespace) {
          let e,
            t,
            r = /\r?\n|\r/g;
          for (; (e = r.exec(l.text)); )
            t ||
              (t = new Pn(
                Mn.from(n.schema.text(" ", n.allowedMarks(l.marks))),
                0,
                0
              )),
              s.push(new Vr(a + e.index, a + e.index + e[0].length, t));
        }
      } else s.push(new Vr(a, c, Pn.empty));
      a = c;
    }
    if (!r.validEnd) {
      let t = r.fillBefore(Mn.empty, !0);
      e.replace(a, a, new Pn(t, 0, 0));
    }
    for (let t = s.length - 1; t >= 0; t--) e.step(s[t]);
  }
  function Fr(e) {
    let t = e.parent.content.cutByIndex(e.startIndex, e.endIndex);
    for (let n = e.depth; ; --n) {
      let r = e.$from.node(n),
        o = e.$from.index(n),
        i = e.$to.indexAfter(n);
      if (n < e.depth && r.canReplace(o, i, t)) return n;
      if (
        0 == n ||
        r.type.spec.isolating ||
        (0 != o && !r.canReplace(o, r.childCount)) ||
        (i != r.childCount && !r.canReplace(0, i))
      )
        break;
    }
    return null;
  }
  function Ur(e) {
    return { type: e, attrs: null };
  }
  function Zr(e, t, n, r) {
    t.forEach((o, i) => {
      if (o.isText) {
        let s,
          a = /\r?\n|\r/g;
        for (; (s = a.exec(o.text)); ) {
          let o = e.mapping.slice(r).map(n + 1 + i + s.index);
          e.replaceWith(o, o + 1, t.type.schema.linebreakReplacement.create());
        }
      }
    });
  }
  function qr(e, t, n, r) {
    t.forEach((o, i) => {
      if (o.type == o.type.schema.linebreakReplacement) {
        let o = e.mapping.slice(r).map(n + 1 + i);
        e.replaceWith(o, o + 1, t.type.schema.text("\n"));
      }
    });
  }
  function Hr(e, t, n = 1, r) {
    let o = e.resolve(t),
      i = o.depth - n,
      s = (r && r[r.length - 1]) || o.parent;
    if (
      i < 0 ||
      o.parent.type.spec.isolating ||
      !o.parent.canReplace(o.index(), o.parent.childCount) ||
      !s.type.validContent(
        o.parent.content.cutByIndex(o.index(), o.parent.childCount)
      )
    )
      return !1;
    for (let e = o.depth - 1, t = n - 2; e > i; e--, t--) {
      let n = o.node(e),
        i = o.index(e);
      if (n.type.spec.isolating) return !1;
      let s = n.content.cutByIndex(i, n.childCount),
        a = r && r[t + 1];
      a && (s = s.replaceChild(0, a.type.create(a.attrs)));
      let l = (r && r[t]) || n;
      if (!n.canReplace(i + 1, n.childCount) || !l.type.validContent(s))
        return !1;
    }
    let a = o.indexAfter(i),
      l = r && r[0];
    return o.node(i).canReplaceWith(a, a, l ? l.type : o.node(i + 1).type);
  }
  function Kr(e, t) {
    let n = e.resolve(t),
      r = n.index();
    return (
      (function (e, t) {
        return !(
          !e ||
          !t ||
          e.isLeaf ||
          !(function (e, t) {
            t.content.size || e.type.compatibleContent(t.type);
            let n = e.contentMatchAt(e.childCount),
              { linebreakReplacement: r } = e.type.schema;
            for (let o = 0; o < t.childCount; o++) {
              let i = t.child(o),
                s = i.type == r ? e.type.schema.nodes.text : i.type;
              if (!(n = n.matchType(s)) || !e.type.allowsMarks(i.marks))
                return !1;
            }
            return n.validEnd;
          })(e, t)
        );
      })(n.nodeBefore, n.nodeAfter) && n.parent.canReplace(r, r + 1)
    );
  }
  function Wr(e, t, n = t, r = Pn.empty) {
    if (t == n && !r.size) return null;
    let o = e.resolve(t),
      i = e.resolve(n);
    return Jr(o, i, r) ? new Vr(t, n, r) : new Gr(o, i, r).fit();
  }
  function Jr(e, t, n) {
    return (
      !n.openStart &&
      !n.openEnd &&
      e.start() == t.start() &&
      e.parent.canReplace(e.index(), t.index(), n.content)
    );
  }
  Mr.jsonID("replaceAround", Lr);
  class Gr {
    constructor(e, t, n) {
      (this.$from = e),
        (this.$to = t),
        (this.unplaced = n),
        (this.frontier = []),
        (this.placed = Mn.empty);
      for (let t = 0; t <= e.depth; t++) {
        let n = e.node(t);
        this.frontier.push({
          type: n.type,
          match: n.contentMatchAt(e.indexAfter(t)),
        });
      }
      for (let t = e.depth; t > 0; t--)
        this.placed = Mn.from(e.node(t).copy(this.placed));
    }
    get depth() {
      return this.frontier.length - 1;
    }
    fit() {
      for (; this.unplaced.size; ) {
        let e = this.findFittable();
        e ? this.placeNodes(e) : this.openMore() || this.dropNode();
      }
      let e = this.mustMoveInline(),
        t = this.placed.size - this.depth - this.$from.depth,
        n = this.$from,
        r = this.close(e < 0 ? this.$to : n.doc.resolve(e));
      if (!r) return null;
      let o = this.placed,
        i = n.depth,
        s = r.depth;
      for (; i && s && 1 == o.childCount; )
        (o = o.firstChild.content), i--, s--;
      let a = new Pn(o, i, s);
      return e > -1
        ? new Lr(n.pos, e, this.$to.pos, this.$to.end(), a, t)
        : a.size || n.pos != this.$to.pos
        ? new Vr(n.pos, r.pos, a)
        : null;
    }
    findFittable() {
      let e = this.unplaced.openStart;
      for (
        let t = this.unplaced.content, n = 0, r = this.unplaced.openEnd;
        n < e;
        n++
      ) {
        let o = t.firstChild;
        if ((t.childCount > 1 && (r = 0), o.type.spec.isolating && r <= n)) {
          e = n;
          break;
        }
        t = o.content;
      }
      for (let t = 1; t <= 2; t++)
        for (let n = 1 == t ? e : this.unplaced.openStart; n >= 0; n--) {
          let e = null,
            r = (
              n
                ? (e = Qr(this.unplaced.content, n - 1).firstChild).content
                : this.unplaced.content
            ).firstChild;
          for (let o = this.depth; o >= 0; o--) {
            let i,
              { type: s, match: a } = this.frontier[o],
              l = null;
            if (
              1 == t &&
              (r
                ? a.matchType(r.type) || (l = a.fillBefore(Mn.from(r), !1))
                : e && s.compatibleContent(e.type))
            )
              return { sliceDepth: n, frontierDepth: o, parent: e, inject: l };
            if (2 == t && r && (i = a.findWrapping(r.type)))
              return { sliceDepth: n, frontierDepth: o, parent: e, wrap: i };
            if (e && a.matchType(e.type)) break;
          }
        }
    }
    openMore() {
      let { content: e, openStart: t, openEnd: n } = this.unplaced,
        r = Qr(e, t);
      return (
        !!r.childCount &&
        !r.firstChild.isLeaf &&
        ((this.unplaced = new Pn(
          e,
          t + 1,
          Math.max(n, r.size + t >= e.size - n ? t + 1 : 0)
        )),
        !0)
      );
    }
    dropNode() {
      let { content: e, openStart: t, openEnd: n } = this.unplaced,
        r = Qr(e, t);
      if (r.childCount <= 1 && t > 0) {
        let o = e.size - t <= t + r.size;
        this.unplaced = new Pn(Yr(e, t - 1, 1), t - 1, o ? t - 1 : n);
      } else this.unplaced = new Pn(Yr(e, t, 1), t, n);
    }
    placeNodes({
      sliceDepth: e,
      frontierDepth: t,
      parent: n,
      inject: r,
      wrap: o,
    }) {
      for (; this.depth > t; ) this.closeFrontierNode();
      if (o) for (let e = 0; e < o.length; e++) this.openFrontierNode(o[e]);
      let i = this.unplaced,
        s = n ? n.content : i.content,
        a = i.openStart - e,
        l = 0,
        c = [],
        { match: d, type: u } = this.frontier[t];
      if (r) {
        for (let e = 0; e < r.childCount; e++) c.push(r.child(e));
        d = d.matchFragment(r);
      }
      let h = s.size + e - (i.content.size - i.openEnd);
      for (; l < s.childCount; ) {
        let e = s.child(l),
          t = d.matchType(e.type);
        if (!t) break;
        (++l > 1 || 0 == a || e.content.size) &&
          ((d = t),
          c.push(
            (function e(t, n, r) {
              if (n <= 0) return t;
              let o = t.content;
              return (
                n > 1 &&
                  (o = o.replaceChild(
                    0,
                    e(o.firstChild, n - 1, 1 == o.childCount ? r - 1 : 0)
                  )),
                n > 0 &&
                  ((o = t.type.contentMatch.fillBefore(o).append(o)),
                  r <= 0 &&
                    (o = o.append(
                      t.type.contentMatch
                        .matchFragment(o)
                        .fillBefore(Mn.empty, !0)
                    ))),
                t.copy(o)
              );
            })(
              e.mark(u.allowedMarks(e.marks)),
              1 == l ? a : 0,
              l == s.childCount ? h : -1
            )
          ));
      }
      let p = l == s.childCount;
      p || (h = -1),
        (this.placed = Xr(this.placed, t, Mn.from(c))),
        (this.frontier[t].match = d),
        p &&
          h < 0 &&
          n &&
          n.type == this.frontier[this.depth].type &&
          this.frontier.length > 1 &&
          this.closeFrontierNode();
      for (let e = 0, t = s; e < h; e++) {
        let e = t.lastChild;
        this.frontier.push({
          type: e.type,
          match: e.contentMatchAt(e.childCount),
        }),
          (t = e.content);
      }
      this.unplaced = p
        ? 0 == e
          ? Pn.empty
          : new Pn(Yr(i.content, e - 1, 1), e - 1, h < 0 ? i.openEnd : e - 1)
        : new Pn(Yr(i.content, e, l), i.openStart, i.openEnd);
    }
    mustMoveInline() {
      if (!this.$to.parent.isTextblock) return -1;
      let e,
        t = this.frontier[this.depth];
      if (
        !t.type.isTextblock ||
        !eo(this.$to, this.$to.depth, t.type, t.match, !1) ||
        (this.$to.depth == this.depth &&
          (e = this.findCloseLevel(this.$to)) &&
          e.depth == this.depth)
      )
        return -1;
      let { depth: n } = this.$to,
        r = this.$to.after(n);
      for (; n > 1 && r == this.$to.end(--n); ) ++r;
      return r;
    }
    findCloseLevel(e) {
      e: for (let t = Math.min(this.depth, e.depth); t >= 0; t--) {
        let { match: n, type: r } = this.frontier[t],
          o = t < e.depth && e.end(t + 1) == e.pos + (e.depth - (t + 1)),
          i = eo(e, t, r, n, o);
        if (i) {
          for (let n = t - 1; n >= 0; n--) {
            let { match: t, type: r } = this.frontier[n],
              o = eo(e, n, r, t, !0);
            if (!o || o.childCount) continue e;
          }
          return {
            depth: t,
            fit: i,
            move: o ? e.doc.resolve(e.after(t + 1)) : e,
          };
        }
      }
    }
    close(e) {
      let t = this.findCloseLevel(e);
      if (!t) return null;
      for (; this.depth > t.depth; ) this.closeFrontierNode();
      t.fit.childCount && (this.placed = Xr(this.placed, t.depth, t.fit)),
        (e = t.move);
      for (let n = t.depth + 1; n <= e.depth; n++) {
        let t = e.node(n),
          r = t.type.contentMatch.fillBefore(t.content, !0, e.index(n));
        this.openFrontierNode(t.type, t.attrs, r);
      }
      return e;
    }
    openFrontierNode(e, t = null, n) {
      let r = this.frontier[this.depth];
      (r.match = r.match.matchType(e)),
        (this.placed = Xr(this.placed, this.depth, Mn.from(e.create(t, n)))),
        this.frontier.push({ type: e, match: e.contentMatch });
    }
    closeFrontierNode() {
      let e = this.frontier.pop().match.fillBefore(Mn.empty, !0);
      e.childCount && (this.placed = Xr(this.placed, this.frontier.length, e));
    }
  }
  function Yr(e, t, n) {
    return 0 == t
      ? e.cutByIndex(n, e.childCount)
      : e.replaceChild(
          0,
          e.firstChild.copy(Yr(e.firstChild.content, t - 1, n))
        );
  }
  function Xr(e, t, n) {
    return 0 == t
      ? e.append(n)
      : e.replaceChild(
          e.childCount - 1,
          e.lastChild.copy(Xr(e.lastChild.content, t - 1, n))
        );
  }
  function Qr(e, t) {
    for (let n = 0; n < t; n++) e = e.firstChild.content;
    return e;
  }
  function eo(e, t, n, r, o) {
    let i = e.node(t),
      s = o ? e.indexAfter(t) : e.index(t);
    if (s == i.childCount && !n.compatibleContent(i.type)) return null;
    let a = r.fillBefore(i.content, !0, s);
    return a &&
      !(function (e, t, n) {
        for (let r = n; r < t.childCount; r++)
          if (!e.allowsMarks(t.child(r).marks)) return !0;
        return !1;
      })(n, i.content, s)
      ? a
      : null;
  }
  function to(e, t) {
    let n = [];
    for (let r = Math.min(e.depth, t.depth); r >= 0; r--) {
      let o = e.start(r);
      if (
        o < e.pos - (e.depth - r) ||
        t.end(r) > t.pos + (t.depth - r) ||
        e.node(r).type.spec.isolating ||
        t.node(r).type.spec.isolating
      )
        break;
      (o == t.start(r) ||
        (r == e.depth &&
          r == t.depth &&
          e.parent.inlineContent &&
          t.parent.inlineContent &&
          r &&
          t.start(r - 1) == o - 1)) &&
        n.push(r);
    }
    return n;
  }
  class no extends Mr {
    constructor(e, t, n) {
      super(), (this.pos = e), (this.attr = t), (this.value = n);
    }
    apply(e) {
      let t = e.nodeAt(this.pos);
      if (!t) return Dr.fail("No node at attribute step's position");
      let n = Object.create(null);
      for (let e in t.attrs) n[e] = t.attrs[e];
      n[this.attr] = this.value;
      let r = t.type.create(n, null, t.marks);
      return Dr.fromReplace(
        e,
        this.pos,
        this.pos + 1,
        new Pn(Mn.from(r), 0, +!t.isLeaf)
      );
    }
    getMap() {
      return Or.empty;
    }
    invert(e) {
      return new no(this.pos, this.attr, e.nodeAt(this.pos).attrs[this.attr]);
    }
    map(e) {
      let t = e.mapResult(this.pos, 1);
      return t.deletedAfter ? null : new no(t.pos, this.attr, this.value);
    }
    toJSON() {
      return {
        stepType: "attr",
        pos: this.pos,
        attr: this.attr,
        value: this.value,
      };
    }
    static fromJSON(e, t) {
      if ("number" != typeof t.pos || "string" != typeof t.attr)
        throw RangeError("Invalid input for AttrStep.fromJSON");
      return new no(t.pos, t.attr, t.value);
    }
  }
  Mr.jsonID("attr", no);
  class ro extends Mr {
    constructor(e, t) {
      super(), (this.attr = e), (this.value = t);
    }
    apply(e) {
      let t = Object.create(null);
      for (let n in e.attrs) t[n] = e.attrs[n];
      t[this.attr] = this.value;
      let n = e.type.create(t, e.content, e.marks);
      return Dr.ok(n);
    }
    getMap() {
      return Or.empty;
    }
    invert(e) {
      return new ro(this.attr, e.attrs[this.attr]);
    }
    map(e) {
      return this;
    }
    toJSON() {
      return { stepType: "docAttr", attr: this.attr, value: this.value };
    }
    static fromJSON(e, t) {
      if ("string" != typeof t.attr)
        throw RangeError("Invalid input for DocAttrStep.fromJSON");
      return new ro(t.attr, t.value);
    }
  }
  Mr.jsonID("docAttr", ro);
  let oo = class extends Error {};
  ((oo = function e(t) {
    let n = Error.call(this, t);
    return (n.__proto__ = e.prototype), n;
  }).prototype = Object.create(Error.prototype)),
    (oo.prototype.constructor = oo),
    (oo.prototype.name = "TransformError");
  class io {
    constructor(e) {
      (this.doc = e),
        (this.steps = []),
        (this.docs = []),
        (this.mapping = new Nr());
    }
    get before() {
      return this.docs.length ? this.docs[0] : this.doc;
    }
    step(e) {
      let t = this.maybeStep(e);
      if (t.failed) throw new oo(t.failed);
      return this;
    }
    maybeStep(e) {
      let t = e.apply(this.doc);
      return t.failed || this.addStep(e, t.doc), t;
    }
    get docChanged() {
      return this.steps.length > 0;
    }
    addStep(e, t) {
      this.docs.push(this.doc),
        this.steps.push(e),
        this.mapping.appendMap(e.getMap()),
        (this.doc = t);
    }
    replace(e, t = e, n = Pn.empty) {
      let r = Wr(this.doc, e, t, n);
      return r && this.step(r), this;
    }
    replaceWith(e, t, n) {
      return this.replace(e, t, new Pn(Mn.from(n), 0, 0));
    }
    delete(e, t) {
      return this.replace(e, t, Pn.empty);
    }
    insert(e, t) {
      return this.replaceWith(e, e, t);
    }
    replaceRange(e, t, n) {
      return (
        (function (e, t, n, r) {
          if (!r.size) return e.deleteRange(t, n);
          let o = e.doc.resolve(t),
            i = e.doc.resolve(n);
          if (Jr(o, i, r)) return e.step(new Vr(t, n, r));
          let s = to(o, e.doc.resolve(n));
          0 == s[s.length - 1] && s.pop();
          let a = -(o.depth + 1);
          s.unshift(a);
          for (let e = o.depth, t = o.pos - 1; e > 0; e--, t--) {
            let n = o.node(e).type.spec;
            if (n.defining || n.definingAsContext || n.isolating) break;
            s.indexOf(e) > -1
              ? (a = e)
              : o.before(e) == t && s.splice(1, 0, -e);
          }
          let l = s.indexOf(a),
            c = [],
            d = r.openStart;
          for (let e = r.content, t = 0; ; t++) {
            let n = e.firstChild;
            if ((c.push(n), t == r.openStart)) break;
            e = n.content;
          }
          for (let e = d - 1; e >= 0; e--) {
            var u;
            let t = c[e],
              n = (u = t.type).spec.defining || u.spec.definingForContent;
            if (n && !t.sameMarkup(o.node(Math.abs(a) - 1))) d = e;
            else if (n || !t.type.isTextblock) break;
          }
          for (let t = r.openStart; t >= 0; t--) {
            let a = (t + d + 1) % (r.openStart + 1),
              u = c[a];
            if (u)
              for (let t = 0; t < s.length; t++) {
                let c = s[(t + l) % s.length],
                  d = !0;
                c < 0 && ((d = !1), (c = -c));
                let h = o.node(c - 1),
                  p = o.index(c - 1);
                if (h.canReplaceWith(p, p, u.type, u.marks))
                  return e.replace(
                    o.before(c),
                    d ? i.after(c) : n,
                    new Pn(
                      (function e(t, n, r, o, i) {
                        if (n < r) {
                          let i = t.firstChild;
                          t = t.replaceChild(
                            0,
                            i.copy(e(i.content, n + 1, r, o, i))
                          );
                        }
                        if (n > o) {
                          let e = i.contentMatchAt(0),
                            n = e.fillBefore(t).append(t);
                          t = n.append(
                            e.matchFragment(n).fillBefore(Mn.empty, !0)
                          );
                        }
                        return t;
                      })(r.content, 0, r.openStart, a),
                      a,
                      r.openEnd
                    )
                  );
              }
          }
          let h = e.steps.length;
          for (
            let a = s.length - 1;
            a >= 0 && (e.replace(t, n, r), !(e.steps.length > h));
            a--
          ) {
            let e = s[a];
            e < 0 || ((t = o.before(e)), (n = i.after(e)));
          }
        })(this, e, t, n),
        this
      );
    }
    replaceRangeWith(e, t, n) {
      var r = e,
        o = t;
      if (!n.isInline && r == o && this.doc.resolve(r).parent.content.size) {
        let e = (function (e, t, n) {
          let r = e.resolve(t);
          if (r.parent.canReplaceWith(r.index(), r.index(), n)) return t;
          if (0 == r.parentOffset)
            for (let e = r.depth - 1; e >= 0; e--) {
              let t = r.index(e);
              if (r.node(e).canReplaceWith(t, t, n)) return r.before(e + 1);
              if (t > 0) return null;
            }
          if (r.parentOffset == r.parent.content.size)
            for (let e = r.depth - 1; e >= 0; e--) {
              let t = r.indexAfter(e);
              if (r.node(e).canReplaceWith(t, t, n)) return r.after(e + 1);
              if (t < r.node(e).childCount) break;
            }
          return null;
        })(this.doc, r, n.type);
        null != e && (r = o = e);
      }
      return this.replaceRange(r, o, new Pn(Mn.from(n), 0, 0)), this;
    }
    deleteRange(e, t) {
      return (
        (function (e, t, n) {
          let r = e.doc.resolve(t),
            o = e.doc.resolve(n),
            i = to(r, o);
          for (let t = 0; t < i.length; t++) {
            let n = i[t],
              s = t == i.length - 1;
            if ((s && 0 == n) || r.node(n).type.contentMatch.validEnd)
              return e.delete(r.start(n), o.end(n));
            if (
              n > 0 &&
              (s ||
                r.node(n - 1).canReplace(r.index(n - 1), o.indexAfter(n - 1)))
            )
              return e.delete(r.before(n), o.after(n));
          }
          for (let i = 1; i <= r.depth && i <= o.depth; i++)
            if (
              t - r.start(i) == r.depth - i &&
              n > r.end(i) &&
              o.end(i) - n != o.depth - i &&
              r.start(i - 1) == o.start(i - 1) &&
              r.node(i - 1).canReplace(r.index(i - 1), o.index(i - 1))
            )
              return e.delete(r.before(i), n);
          e.delete(t, n);
        })(this, e, t),
        this
      );
    }
    lift(e, t) {
      return (
        (function (e, t, n) {
          let { $from: r, $to: o, depth: i } = t,
            s = r.before(i + 1),
            a = o.after(i + 1),
            l = s,
            c = a,
            d = Mn.empty,
            u = 0;
          for (let e = i, t = !1; e > n; e--)
            t || r.index(e) > 0
              ? ((t = !0), (d = Mn.from(r.node(e).copy(d))), u++)
              : l--;
          let h = Mn.empty,
            p = 0;
          for (let e = i, t = !1; e > n; e--)
            t || o.after(e + 1) < o.end(e)
              ? ((t = !0), (h = Mn.from(o.node(e).copy(h))), p++)
              : c++;
          e.step(new Lr(l, c, s, a, new Pn(d.append(h), u, p), d.size - u, !0));
        })(this, e, t),
        this
      );
    }
    join(e, t = 1) {
      return (
        (function (e, t, n) {
          let r = null,
            { linebreakReplacement: o } = e.doc.type.schema,
            i = e.doc.resolve(t - n),
            s = i.node().type;
          if (o && s.inlineContent) {
            let e = "pre" == s.whitespace,
              t = !!s.contentMatch.matchType(o);
            e && !t ? (r = !1) : !e && t && (r = !0);
          }
          let a = e.steps.length;
          if (!1 === r) {
            let r = e.doc.resolve(t + n);
            qr(e, r.node(), r.before(), a);
          }
          s.inlineContent &&
            jr(e, t + n - 1, s, i.node().contentMatchAt(i.index()), null == r);
          let l = e.mapping.slice(a),
            c = l.map(t - n);
          if ((e.step(new Vr(c, l.map(t + n, -1), Pn.empty, !0)), !0 === r)) {
            let t = e.doc.resolve(c);
            Zr(e, t.node(), t.before(), e.steps.length);
          }
        })(this, e, t),
        this
      );
    }
    wrap(e, t) {
      return (
        (function (e, t, n) {
          let r = Mn.empty;
          for (let e = n.length - 1; e >= 0; e--) {
            if (r.size) {
              let t = n[e].type.contentMatch.matchFragment(r);
              if (!t || !t.validEnd)
                throw RangeError(
                  "Wrapper type given to Transform.wrap does not form valid content of its parent wrapper"
                );
            }
            r = Mn.from(n[e].type.create(n[e].attrs, r));
          }
          let o = t.start,
            i = t.end;
          e.step(new Lr(o, i, o, i, new Pn(r, 0, 0), n.length, !0));
        })(this, e, t),
        this
      );
    }
    setBlockType(e, t = e, n, r = null) {
      var o = this;
      if (!n.isTextblock)
        throw RangeError("Type given to setBlockType should be a textblock");
      let i = o.steps.length;
      return (
        o.doc.nodesBetween(e, t, (e, t) => {
          var s, a, l;
          let c,
            d,
            u = "function" == typeof r ? r(e) : r;
          if (
            e.isTextblock &&
            !e.hasMarkup(n, u) &&
            ((s = o.doc),
            (a = o.mapping.slice(i).map(t)),
            (l = n),
            (d = (c = s.resolve(a)).index()),
            c.parent.canReplaceWith(d, d + 1, l))
          ) {
            let r = null;
            if (n.schema.linebreakReplacement) {
              let e = "pre" == n.whitespace,
                t = !!n.contentMatch.matchType(n.schema.linebreakReplacement);
              e && !t ? (r = !1) : !e && t && (r = !0);
            }
            !1 === r && qr(o, e, t, i),
              jr(o, o.mapping.slice(i).map(t, 1), n, void 0, null === r);
            let s = o.mapping.slice(i),
              a = s.map(t, 1),
              l = s.map(t + e.nodeSize, 1);
            return (
              o.step(
                new Lr(
                  a,
                  l,
                  a + 1,
                  l - 1,
                  new Pn(Mn.from(n.create(u, null, e.marks)), 0, 0),
                  1,
                  !0
                )
              ),
              !0 === r && Zr(o, e, t, i),
              !1
            );
          }
        }),
        this
      );
    }
    setNodeMarkup(e, t, n = null, r) {
      return (
        (function (e, t, n, r, o) {
          let i = e.doc.nodeAt(t);
          if (!i) throw RangeError("No node at given position");
          n || (n = i.type);
          let s = n.create(r, null, o || i.marks);
          if (i.isLeaf) return e.replaceWith(t, t + i.nodeSize, s);
          if (!n.validContent(i.content))
            throw RangeError("Invalid content for node type " + n.name);
          e.step(
            new Lr(
              t,
              t + i.nodeSize,
              t + 1,
              t + i.nodeSize - 1,
              new Pn(Mn.from(s), 0, 0),
              1,
              !0
            )
          );
        })(this, e, t, n, r),
        this
      );
    }
    setNodeAttribute(e, t, n) {
      return this.step(new no(e, t, n)), this;
    }
    setDocAttribute(e, t) {
      return this.step(new ro(e, t)), this;
    }
    addNodeMark(e, t) {
      return this.step(new zr(e, t)), this;
    }
    removeNodeMark(e, t) {
      if (!(t instanceof In)) {
        let n = this.doc.nodeAt(e);
        if (!n) throw RangeError("No node at position " + e);
        if (!(t = t.isInSet(n.marks))) return this;
      }
      return this.step(new Pr(e, t)), this;
    }
    split(e, t = 1, n) {
      return (
        (function (e, t, n = 1, r) {
          let o = e.doc.resolve(t),
            i = Mn.empty,
            s = Mn.empty;
          for (let e = o.depth, t = o.depth - n, a = n - 1; e > t; e--, a--) {
            i = Mn.from(o.node(e).copy(i));
            let t = r && r[a];
            s = Mn.from(t ? t.type.create(t.attrs, s) : o.node(e).copy(s));
          }
          e.step(new Vr(t, t, new Pn(i.append(s), n, n), !0));
        })(this, e, t, n),
        this
      );
    }
    addMark(e, t, n) {
      var r;
      let o, i, s, a;
      return (
        (s = []),
        (a = []),
        (r = this).doc.nodesBetween(e, t, (r, l, c) => {
          if (!r.isInline) return;
          let d = r.marks;
          if (!n.isInSet(d) && c.type.allowsMarkType(n.type)) {
            let c = Math.max(l, e),
              u = Math.min(l + r.nodeSize, t),
              h = n.addToSet(d);
            for (let e = 0; e < d.length; e++)
              d[e].isInSet(h) ||
                (o && o.to == c && o.mark.eq(d[e])
                  ? (o.to = u)
                  : s.push((o = new Ir(c, u, d[e]))));
            i && i.to == c ? (i.to = u) : a.push((i = new $r(c, u, n)));
          }
        }),
        s.forEach((e) => r.step(e)),
        a.forEach((e) => r.step(e)),
        this
      );
    }
    removeMark(e, t, n) {
      var r;
      let o, i;
      return (
        (o = []),
        (i = 0),
        (r = this).doc.nodesBetween(e, t, (r, s) => {
          if (!r.isInline) return;
          i++;
          let a = null;
          if (n instanceof dr) {
            let e,
              t = r.marks;
            for (; (e = n.isInSet(t)); )
              (a || (a = [])).push(e), (t = e.removeFromSet(t));
          } else n ? n.isInSet(r.marks) && (a = [n]) : (a = r.marks);
          if (a && a.length) {
            let n = Math.min(s + r.nodeSize, t);
            for (let t = 0; t < a.length; t++) {
              let r,
                l = a[t];
              for (let e = 0; e < o.length; e++) {
                let t = o[e];
                t.step == i - 1 && l.eq(o[e].style) && (r = t);
              }
              r
                ? ((r.to = n), (r.step = i))
                : o.push({ style: l, from: Math.max(s, e), to: n, step: i });
            }
          }
        }),
        o.forEach((e) => r.step(new Ir(e.from, e.to, e.style))),
        this
      );
    }
    clearIncompatible(e, t, n) {
      return jr(this, e, t, n), this;
    }
  }
  let so = Object.create(null);
  class ao {
    constructor(e, t, n) {
      (this.$anchor = e),
        (this.$head = t),
        (this.ranges = n || [new lo(e.min(t), e.max(t))]);
    }
    get anchor() {
      return this.$anchor.pos;
    }
    get head() {
      return this.$head.pos;
    }
    get from() {
      return this.$from.pos;
    }
    get to() {
      return this.$to.pos;
    }
    get $from() {
      return this.ranges[0].$from;
    }
    get $to() {
      return this.ranges[0].$to;
    }
    get empty() {
      let e = this.ranges;
      for (let t = 0; t < e.length; t++)
        if (e[t].$from.pos != e[t].$to.pos) return !1;
      return !0;
    }
    content() {
      return this.$from.doc.slice(this.from, this.to, !0);
    }
    replace(e, t = Pn.empty) {
      let n = t.content.lastChild,
        r = null;
      for (let e = 0; e < t.openEnd; e++) (r = n), (n = n.lastChild);
      let o = e.steps.length,
        i = this.ranges;
      for (let s = 0; s < i.length; s++) {
        let { $from: a, $to: l } = i[s],
          c = e.mapping.slice(o);
        e.replaceRange(c.map(a.pos), c.map(l.pos), s ? Pn.empty : t),
          0 == s && bo(e, o, (n ? n.isInline : r && r.isTextblock) ? -1 : 1);
      }
    }
    replaceWith(e, t) {
      let n = e.steps.length,
        r = this.ranges;
      for (let o = 0; o < r.length; o++) {
        let { $from: i, $to: s } = r[o],
          a = e.mapping.slice(n),
          l = a.map(i.pos),
          c = a.map(s.pos);
        o
          ? e.deleteRange(l, c)
          : (e.replaceRangeWith(l, c, t), bo(e, n, t.isInline ? -1 : 1));
      }
    }
    static findFrom(e, t, n = !1) {
      let r = e.parent.inlineContent
        ? new ho(e)
        : yo(e.node(0), e.parent, e.pos, e.index(), t, n);
      if (r) return r;
      for (let r = e.depth - 1; r >= 0; r--) {
        let o =
          t < 0
            ? yo(e.node(0), e.node(r), e.before(r + 1), e.index(r), t, n)
            : yo(e.node(0), e.node(r), e.after(r + 1), e.index(r) + 1, t, n);
        if (o) return o;
      }
      return null;
    }
    static near(e, t = 1) {
      return this.findFrom(e, t) || this.findFrom(e, -t) || new go(e.node(0));
    }
    static atStart(e) {
      return yo(e, e, 0, 0, 1) || new go(e);
    }
    static atEnd(e) {
      return yo(e, e, e.content.size, e.childCount, -1) || new go(e);
    }
    static fromJSON(e, t) {
      if (!t || !t.type)
        throw RangeError("Invalid input for Selection.fromJSON");
      let n = so[t.type];
      if (!n) throw RangeError(`No selection type ${t.type} defined`);
      return n.fromJSON(e, t);
    }
    static jsonID(e, t) {
      if (e in so) throw RangeError("Duplicate use of selection JSON ID " + e);
      return (so[e] = t), (t.prototype.jsonID = e), t;
    }
    getBookmark() {
      return ho.between(this.$anchor, this.$head).getBookmark();
    }
  }
  ao.prototype.visible = !0;
  class lo {
    constructor(e, t) {
      (this.$from = e), (this.$to = t);
    }
  }
  let co = !1;
  function uo(e) {
    co ||
      e.parent.inlineContent ||
      ((co = !0),
      console.warn(
        "TextSelection endpoint not pointing into a node with inline content (" +
          e.parent.type.name +
          ")"
      ));
  }
  class ho extends ao {
    constructor(e, t = e) {
      uo(e), uo(t), super(e, t);
    }
    get $cursor() {
      return this.$anchor.pos == this.$head.pos ? this.$head : null;
    }
    map(e, t) {
      let n = e.resolve(t.map(this.head));
      if (!n.parent.inlineContent) return ao.near(n);
      let r = e.resolve(t.map(this.anchor));
      return new ho(r.parent.inlineContent ? r : n, n);
    }
    replace(e, t = Pn.empty) {
      if ((super.replace(e, t), t == Pn.empty)) {
        let t = this.$from.marksAcross(this.$to);
        t && e.ensureMarks(t);
      }
    }
    eq(e) {
      return e instanceof ho && e.anchor == this.anchor && e.head == this.head;
    }
    getBookmark() {
      return new po(this.anchor, this.head);
    }
    toJSON() {
      return { type: "text", anchor: this.anchor, head: this.head };
    }
    static fromJSON(e, t) {
      if ("number" != typeof t.anchor || "number" != typeof t.head)
        throw RangeError("Invalid input for TextSelection.fromJSON");
      return new ho(e.resolve(t.anchor), e.resolve(t.head));
    }
    static create(e, t, n = t) {
      let r = e.resolve(t);
      return new this(r, n == t ? r : e.resolve(n));
    }
    static between(e, t, n) {
      let r = e.pos - t.pos;
      if (((!n || r) && (n = r >= 0 ? 1 : -1), !t.parent.inlineContent)) {
        let e = ao.findFrom(t, n, !0) || ao.findFrom(t, -n, !0);
        if (!e) return ao.near(t, n);
        t = e.$head;
      }
      return (
        e.parent.inlineContent ||
          ((0 == r ||
            (e = (ao.findFrom(e, -n, !0) || ao.findFrom(e, n, !0)).$anchor)
              .pos <
              t.pos !=
              r < 0) &&
            (e = t)),
        new ho(e, t)
      );
    }
  }
  ao.jsonID("text", ho);
  class po {
    constructor(e, t) {
      (this.anchor = e), (this.head = t);
    }
    map(e) {
      return new po(e.map(this.anchor), e.map(this.head));
    }
    resolve(e) {
      return ho.between(e.resolve(this.anchor), e.resolve(this.head));
    }
  }
  class fo extends ao {
    constructor(e) {
      let t = e.nodeAfter;
      super(e, e.node(0).resolve(e.pos + t.nodeSize)), (this.node = t);
    }
    map(e, t) {
      let { deleted: n, pos: r } = t.mapResult(this.anchor),
        o = e.resolve(r);
      return n ? ao.near(o) : new fo(o);
    }
    content() {
      return new Pn(Mn.from(this.node), 0, 0);
    }
    eq(e) {
      return e instanceof fo && e.anchor == this.anchor;
    }
    toJSON() {
      return { type: "node", anchor: this.anchor };
    }
    getBookmark() {
      return new mo(this.anchor);
    }
    static fromJSON(e, t) {
      if ("number" != typeof t.anchor)
        throw RangeError("Invalid input for NodeSelection.fromJSON");
      return new fo(e.resolve(t.anchor));
    }
    static create(e, t) {
      return new fo(e.resolve(t));
    }
    static isSelectable(e) {
      return !e.isText && !1 !== e.type.spec.selectable;
    }
  }
  (fo.prototype.visible = !1), ao.jsonID("node", fo);
  class mo {
    constructor(e) {
      this.anchor = e;
    }
    map(e) {
      let { deleted: t, pos: n } = e.mapResult(this.anchor);
      return t ? new po(n, n) : new mo(n);
    }
    resolve(e) {
      let t = e.resolve(this.anchor),
        n = t.nodeAfter;
      return n && fo.isSelectable(n) ? new fo(t) : ao.near(t);
    }
  }
  class go extends ao {
    constructor(e) {
      super(e.resolve(0), e.resolve(e.content.size));
    }
    replace(e, t = Pn.empty) {
      if (t == Pn.empty) {
        e.delete(0, e.doc.content.size);
        let t = ao.atStart(e.doc);
        t.eq(e.selection) || e.setSelection(t);
      } else super.replace(e, t);
    }
    toJSON() {
      return { type: "all" };
    }
    static fromJSON(e) {
      return new go(e);
    }
    map(e) {
      return new go(e);
    }
    eq(e) {
      return e instanceof go;
    }
    getBookmark() {
      return vo;
    }
  }
  ao.jsonID("all", go);
  let vo = {
    map() {
      return this;
    },
    resolve: (e) => new go(e),
  };
  function yo(e, t, n, r, o, i = !1) {
    if (t.inlineContent) return ho.create(e, n);
    for (
      let s = r - (o > 0 ? 0 : 1);
      o > 0 ? s < t.childCount : s >= 0;
      s += o
    ) {
      let r = t.child(s);
      if (r.isAtom) {
        if (!i && fo.isSelectable(r))
          return fo.create(e, n - (o < 0 ? r.nodeSize : 0));
      } else {
        let t = yo(e, r, n + o, o < 0 ? r.childCount : 0, o, i);
        if (t) return t;
      }
      n += r.nodeSize * o;
    }
    return null;
  }
  function bo(e, t, n) {
    let r,
      o = e.steps.length - 1;
    if (o < t) return;
    let i = e.steps[o];
    (i instanceof Vr || i instanceof Lr) &&
      (e.mapping.maps[o].forEach((e, t, n, o) => {
        null == r && (r = o);
      }),
      e.setSelection(ao.near(e.doc.resolve(r), n)));
  }
  class wo extends io {
    constructor(e) {
      super(e.doc),
        (this.curSelectionFor = 0),
        (this.updated = 0),
        (this.meta = Object.create(null)),
        (this.time = Date.now()),
        (this.curSelection = e.selection),
        (this.storedMarks = e.storedMarks);
    }
    get selection() {
      return (
        this.curSelectionFor < this.steps.length &&
          ((this.curSelection = this.curSelection.map(
            this.doc,
            this.mapping.slice(this.curSelectionFor)
          )),
          (this.curSelectionFor = this.steps.length)),
        this.curSelection
      );
    }
    setSelection(e) {
      if (e.$from.doc != this.doc)
        throw RangeError(
          "Selection passed to setSelection must point at the current document"
        );
      return (
        (this.curSelection = e),
        (this.curSelectionFor = this.steps.length),
        (this.updated = (-3 & this.updated) | 1),
        (this.storedMarks = null),
        this
      );
    }
    get selectionSet() {
      return (1 & this.updated) > 0;
    }
    setStoredMarks(e) {
      return (this.storedMarks = e), (this.updated |= 2), this;
    }
    ensureMarks(e) {
      return (
        In.sameSet(this.storedMarks || this.selection.$from.marks(), e) ||
          this.setStoredMarks(e),
        this
      );
    }
    addStoredMark(e) {
      return this.ensureMarks(
        e.addToSet(this.storedMarks || this.selection.$head.marks())
      );
    }
    removeStoredMark(e) {
      return this.ensureMarks(
        e.removeFromSet(this.storedMarks || this.selection.$head.marks())
      );
    }
    get storedMarksSet() {
      return (2 & this.updated) > 0;
    }
    addStep(e, t) {
      super.addStep(e, t),
        (this.updated = -3 & this.updated),
        (this.storedMarks = null);
    }
    setTime(e) {
      return (this.time = e), this;
    }
    replaceSelection(e) {
      return this.selection.replace(this, e), this;
    }
    replaceSelectionWith(e, t = !0) {
      let n = this.selection;
      return (
        t &&
          (e = e.mark(
            this.storedMarks ||
              (n.empty
                ? n.$from.marks()
                : n.$from.marksAcross(n.$to) || In.none)
          )),
        n.replaceWith(this, e),
        this
      );
    }
    deleteSelection() {
      return this.selection.replace(this), this;
    }
    insertText(e, t, n) {
      let r = this.doc.type.schema;
      if (null == t)
        return e
          ? this.replaceSelectionWith(r.text(e), !0)
          : this.deleteSelection();
      {
        if ((null == n && (n = t), (n = null == n ? t : n), !e))
          return this.deleteRange(t, n);
        let o = this.storedMarks;
        if (!o) {
          let e = this.doc.resolve(t);
          o = n == t ? e.marks() : e.marksAcross(this.doc.resolve(n));
        }
        return (
          this.replaceRangeWith(t, n, r.text(e, o)),
          this.selection.empty ||
            this.setSelection(ao.near(this.selection.$to)),
          this
        );
      }
    }
    setMeta(e, t) {
      return (this.meta["string" == typeof e ? e : e.key] = t), this;
    }
    getMeta(e) {
      return this.meta["string" == typeof e ? e : e.key];
    }
    get isGeneric() {
      for (let e in this.meta) return !1;
      return !0;
    }
    scrollIntoView() {
      return (this.updated |= 4), this;
    }
    get scrolledIntoView() {
      return (4 & this.updated) > 0;
    }
  }
  function ko(e, t) {
    return t && e ? e.bind(t) : e;
  }
  class xo {
    constructor(e, t, n) {
      (this.name = e),
        (this.init = ko(t.init, n)),
        (this.apply = ko(t.apply, n));
    }
  }
  let So = [
    new xo("doc", {
      init: (e) => e.doc || e.schema.topNodeType.createAndFill(),
      apply: (e) => e.doc,
    }),
    new xo("selection", {
      init: (e, t) => e.selection || ao.atStart(t.doc),
      apply: (e) => e.selection,
    }),
    new xo("storedMarks", {
      init: (e) => e.storedMarks || null,
      apply: (e, t, n, r) => (r.selection.$cursor ? e.storedMarks : null),
    }),
    new xo("scrollToSelection", {
      init: () => 0,
      apply: (e, t) => (e.scrolledIntoView ? t + 1 : t),
    }),
  ];
  class Eo {
    constructor(e, t) {
      (this.schema = e),
        (this.plugins = []),
        (this.pluginsByKey = Object.create(null)),
        (this.fields = So.slice()),
        t &&
          t.forEach((e) => {
            if (this.pluginsByKey[e.key])
              throw RangeError(
                "Adding different instances of a keyed plugin (" + e.key + ")"
              );
            this.plugins.push(e),
              (this.pluginsByKey[e.key] = e),
              e.spec.state && this.fields.push(new xo(e.key, e.spec.state, e));
          });
    }
  }
  class _o {
    constructor(e) {
      this.config = e;
    }
    get schema() {
      return this.config.schema;
    }
    get plugins() {
      return this.config.plugins;
    }
    apply(e) {
      return this.applyTransaction(e).state;
    }
    filterTransaction(e, t = -1) {
      for (let n = 0; n < this.config.plugins.length; n++)
        if (n != t) {
          let t = this.config.plugins[n];
          if (
            t.spec.filterTransaction &&
            !t.spec.filterTransaction.call(t, e, this)
          )
            return !1;
        }
      return !0;
    }
    applyTransaction(e) {
      if (!this.filterTransaction(e)) return { state: this, transactions: [] };
      let t = [e],
        n = this.applyInner(e),
        r = null;
      for (;;) {
        let o = !1;
        for (let i = 0; i < this.config.plugins.length; i++) {
          let s = this.config.plugins[i];
          if (s.spec.appendTransaction) {
            let a = r ? r[i].n : 0,
              l = r ? r[i].state : this,
              c =
                a < t.length &&
                s.spec.appendTransaction.call(s, a ? t.slice(a) : t, l, n);
            if (c && n.filterTransaction(c, i)) {
              if ((c.setMeta("appendedTransaction", e), !r)) {
                r = [];
                for (let e = 0; e < this.config.plugins.length; e++)
                  r.push(
                    e < i ? { state: n, n: t.length } : { state: this, n: 0 }
                  );
              }
              t.push(c), (n = n.applyInner(c)), (o = !0);
            }
            r && (r[i] = { state: n, n: t.length });
          }
        }
        if (!o) return { state: n, transactions: t };
      }
    }
    applyInner(e) {
      if (!e.before.eq(this.doc))
        throw RangeError("Applying a mismatched transaction");
      let t = new _o(this.config),
        n = this.config.fields;
      for (let r = 0; r < n.length; r++) {
        let o = n[r];
        t[o.name] = o.apply(e, this[o.name], this, t);
      }
      return t;
    }
    get tr() {
      return new wo(this);
    }
    static create(e) {
      let t = new Eo(e.doc ? e.doc.type.schema : e.schema, e.plugins),
        n = new _o(t);
      for (let r = 0; r < t.fields.length; r++)
        n[t.fields[r].name] = t.fields[r].init(e, n);
      return n;
    }
    reconfigure(e) {
      let t = new Eo(this.schema, e.plugins),
        n = t.fields,
        r = new _o(t);
      for (let t = 0; t < n.length; t++) {
        let o = n[t].name;
        r[o] = this.hasOwnProperty(o) ? this[o] : n[t].init(e, r);
      }
      return r;
    }
    toJSON(e) {
      let t = { doc: this.doc.toJSON(), selection: this.selection.toJSON() };
      if (
        (this.storedMarks &&
          (t.storedMarks = this.storedMarks.map((e) => e.toJSON())),
        e && "object" == typeof e)
      )
        for (let n in e) {
          if ("doc" == n || "selection" == n)
            throw RangeError(
              "The JSON fields `doc` and `selection` are reserved"
            );
          let r = e[n],
            o = r.spec.state;
          o && o.toJSON && (t[n] = o.toJSON.call(r, this[r.key]));
        }
      return t;
    }
    static fromJSON(e, t, n) {
      if (!t) throw RangeError("Invalid input for EditorState.fromJSON");
      if (!e.schema) throw RangeError("Required config field 'schema' missing");
      let r = new Eo(e.schema, e.plugins),
        o = new _o(r);
      return (
        r.fields.forEach((r) => {
          if ("doc" == r.name) o.doc = Gn.fromJSON(e.schema, t.doc);
          else if ("selection" == r.name)
            o.selection = ao.fromJSON(o.doc, t.selection);
          else if ("storedMarks" == r.name)
            t.storedMarks &&
              (o.storedMarks = t.storedMarks.map(e.schema.markFromJSON));
          else {
            if (n)
              for (let i in n) {
                let s = n[i],
                  a = s.spec.state;
                if (
                  s.key == r.name &&
                  a &&
                  a.fromJSON &&
                  Object.prototype.hasOwnProperty.call(t, i)
                )
                  return void (o[r.name] = a.fromJSON.call(s, e, t[i], o));
              }
            o[r.name] = r.init(e, o);
          }
        }),
        o
      );
    }
  }
  class Co {
    constructor(e) {
      (this.spec = e),
        (this.props = {}),
        e.props &&
          (function e(t, n, r) {
            for (let o in t) {
              let i = t[o];
              i instanceof Function
                ? (i = i.bind(n))
                : "handleDOMEvents" == o && (i = e(i, n, {})),
                (r[o] = i);
            }
            return r;
          })(e.props, this, this.props),
        (this.key = e.key ? e.key.key : Oo("plugin"));
    }
    getState(e) {
      return e[this.key];
    }
  }
  let To = Object.create(null);
  function Oo(e) {
    return e in To ? e + "$" + ++To[e] : ((To[e] = 0), e + "$");
  }
  class No {
    constructor(e = "key") {
      this.key = Oo(e);
    }
    get(e) {
      return e.config.pluginsByKey[this.key];
    }
    getState(e) {
      return e[this.key];
    }
  }
  let Ao = (e, t) =>
    !e.selection.empty && (t && t(e.tr.deleteSelection().scrollIntoView()), !0);
  function Mo(e, t, n = !1) {
    for (let r = e; r; r = "start" == t ? r.firstChild : r.lastChild) {
      if (r.isTextblock) return !0;
      if (n && 1 != r.childCount) break;
    }
    return !1;
  }
  function Do(e) {
    if (!e.parent.type.spec.isolating)
      for (let t = e.depth - 1; t >= 0; t--) {
        if (e.index(t) > 0) return e.doc.resolve(e.before(t + 1));
        if (e.node(t).type.spec.isolating) break;
      }
    return null;
  }
  function Ro(e) {
    if (!e.parent.type.spec.isolating)
      for (let t = e.depth - 1; t >= 0; t--) {
        let n = e.node(t);
        if (e.index(t) + 1 < n.childCount) return e.doc.resolve(e.after(t + 1));
        if (n.type.spec.isolating) break;
      }
    return null;
  }
  function $o(e) {
    for (let t = 0; t < e.edgeCount; t++) {
      let { type: n } = e.edge(t);
      if (n.isTextblock && !n.hasRequiredAttrs()) return n;
    }
    return null;
  }
  function Io(e, t, n, r) {
    let o,
      i,
      s,
      a,
      l,
      c = t.nodeBefore,
      d = t.nodeAfter,
      u = c.type.spec.isolating || d.type.spec.isolating;
    if (
      !u &&
      ((o = t.nodeBefore),
      (i = t.nodeAfter),
      (s = t.index()),
      o &&
        i &&
        o.type.compatibleContent(i.type) &&
        (!o.content.size && t.parent.canReplace(s - 1, s)
          ? (n && n(e.tr.delete(t.pos - o.nodeSize, t.pos).scrollIntoView()), 1)
          : t.parent.canReplace(s, s + 1) &&
            (i.isTextblock || Kr(e.doc, t.pos)) &&
            (n && n(e.tr.join(t.pos).scrollIntoView()), 1)))
    )
      return !0;
    let h = !u && t.parent.canReplace(t.index(), t.index() + 1);
    if (
      h &&
      (a = (l = c.contentMatchAt(c.childCount)).findWrapping(d.type)) &&
      l.matchType(a[0] || d.type).validEnd
    ) {
      if (n) {
        let r = t.pos + d.nodeSize,
          o = Mn.empty;
        for (let e = a.length - 1; e >= 0; e--)
          o = Mn.from(a[e].create(null, o));
        o = Mn.from(c.copy(o));
        let i = e.tr.step(
            new Lr(t.pos - 1, r, t.pos, r, new Pn(o, 1, 0), a.length, !0)
          ),
          s = i.doc.resolve(r + 2 * a.length);
        s.nodeAfter &&
          s.nodeAfter.type == c.type &&
          Kr(i.doc, s.pos) &&
          i.join(s.pos),
          n(i.scrollIntoView());
      }
      return !0;
    }
    let p = d.type.spec.isolating || (r > 0 && u) ? null : ao.findFrom(t, 1),
      f = p && p.$from.blockRange(p.$to),
      m = f && Fr(f);
    if (null != m && m >= t.depth)
      return n && n(e.tr.lift(f, m).scrollIntoView()), !0;
    if (h && Mo(d, "start", !0) && Mo(c, "end")) {
      let r = c,
        o = [];
      for (; o.push(r), !r.isTextblock; ) r = r.lastChild;
      let i = d,
        s = 1;
      for (; !i.isTextblock; i = i.firstChild) s++;
      if (r.canReplace(r.childCount, r.childCount, i.content)) {
        if (n) {
          let r = Mn.empty;
          for (let e = o.length - 1; e >= 0; e--) r = Mn.from(o[e].copy(r));
          n(
            e.tr
              .step(
                new Lr(
                  t.pos - o.length,
                  t.pos + d.nodeSize,
                  t.pos + s,
                  t.pos + d.nodeSize - s,
                  new Pn(r, o.length, 0),
                  0,
                  !0
                )
              )
              .scrollIntoView()
          );
        }
        return !0;
      }
    }
    return !1;
  }
  function zo(e) {
    return function (t, n) {
      let r = t.selection,
        o = e < 0 ? r.$from : r.$to,
        i = o.depth;
      for (; o.node(i).isInline; ) {
        if (!i) return !1;
        i--;
      }
      return (
        !!o.node(i).isTextblock &&
        (n &&
          n(t.tr.setSelection(ho.create(t.doc, e < 0 ? o.start(i) : o.end(i)))),
        !0)
      );
    };
  }
  let Po = zo(-1),
    Vo = zo(1);
  function Lo(e, t = null) {
    return function (n, r) {
      let o = !1;
      for (let r = 0; r < n.selection.ranges.length && !o; r++) {
        let {
          $from: { pos: i },
          $to: { pos: s },
        } = n.selection.ranges[r];
        n.doc.nodesBetween(i, s, (r, i) => {
          if (o) return !1;
          if (r.isTextblock && !r.hasMarkup(e, t))
            if (r.type == e) o = !0;
            else {
              let t = n.doc.resolve(i),
                r = t.index();
              o = t.parent.canReplaceWith(r, r + 1, e);
            }
        });
      }
      if (!o) return !1;
      if (r) {
        let o = n.tr;
        for (let r = 0; r < n.selection.ranges.length; r++) {
          let {
            $from: { pos: i },
            $to: { pos: s },
          } = n.selection.ranges[r];
          o.setBlockType(i, s, e, t);
        }
        r(o.scrollIntoView());
      }
      return !0;
    };
  }
  function Bo(...e) {
    return function (t, n, r) {
      for (let o = 0; o < e.length; o++) if (e[o](t, n, r)) return !0;
      return !1;
    };
  }
  let jo = Bo(
      Ao,
      (e, t, n) => {
        let r = (function (e, t) {
          let { $cursor: n } = e.selection;
          return !n ||
            (t ? !t.endOfTextblock("backward", e) : n.parentOffset > 0)
            ? null
            : n;
        })(e, n);
        if (!r) return !1;
        let o = Do(r);
        if (!o) {
          let n = r.blockRange(),
            o = n && Fr(n);
          return null != o && (t && t(e.tr.lift(n, o).scrollIntoView()), !0);
        }
        let i = o.nodeBefore;
        if (Io(e, o, t, -1)) return !0;
        if (0 == r.parent.content.size && (Mo(i, "end") || fo.isSelectable(i)))
          for (let n = r.depth; ; n--) {
            let s = Wr(e.doc, r.before(n), r.after(n), Pn.empty);
            if (s && s.slice.size < s.to - s.from) {
              if (t) {
                let n = e.tr.step(s);
                n.setSelection(
                  Mo(i, "end")
                    ? ao.findFrom(n.doc.resolve(n.mapping.map(o.pos, -1)), -1)
                    : fo.create(n.doc, o.pos - i.nodeSize)
                ),
                  t(n.scrollIntoView());
              }
              return !0;
            }
            if (1 == n || r.node(n - 1).childCount > 1) break;
          }
        return (
          !!i.isAtom &&
          o.depth == r.depth - 1 &&
          (t && t(e.tr.delete(o.pos - i.nodeSize, o.pos).scrollIntoView()), !0)
        );
      },
      (e, t, n) => {
        let { $head: r, empty: o } = e.selection,
          i = r;
        if (!o) return !1;
        if (r.parent.isTextblock) {
          if (n ? !n.endOfTextblock("backward", e) : r.parentOffset > 0)
            return !1;
          i = Do(r);
        }
        let s = i && i.nodeBefore;
        return (
          !!s &&
          !!fo.isSelectable(s) &&
          (t &&
            t(
              e.tr
                .setSelection(fo.create(e.doc, i.pos - s.nodeSize))
                .scrollIntoView()
            ),
          !0)
        );
      }
    ),
    Fo = Bo(
      Ao,
      (e, t, n) => {
        let r = (function (e, t) {
          let { $cursor: n } = e.selection;
          return !n ||
            (t
              ? !t.endOfTextblock("forward", e)
              : n.parentOffset < n.parent.content.size)
            ? null
            : n;
        })(e, n);
        if (!r) return !1;
        let o = Ro(r);
        if (!o) return !1;
        let i = o.nodeAfter;
        if (Io(e, o, t, 1)) return !0;
        if (
          0 == r.parent.content.size &&
          (Mo(i, "start") || fo.isSelectable(i))
        ) {
          let n = Wr(e.doc, r.before(), r.after(), Pn.empty);
          if (n && n.slice.size < n.to - n.from) {
            if (t) {
              let r = e.tr.step(n);
              r.setSelection(
                Mo(i, "start")
                  ? ao.findFrom(r.doc.resolve(r.mapping.map(o.pos)), 1)
                  : fo.create(r.doc, r.mapping.map(o.pos))
              ),
                t(r.scrollIntoView());
            }
            return !0;
          }
        }
        return (
          !!i.isAtom &&
          o.depth == r.depth - 1 &&
          (t && t(e.tr.delete(o.pos, o.pos + i.nodeSize).scrollIntoView()), !0)
        );
      },
      (e, t, n) => {
        let { $head: r, empty: o } = e.selection,
          i = r;
        if (!o) return !1;
        if (r.parent.isTextblock) {
          if (
            n
              ? !n.endOfTextblock("forward", e)
              : r.parentOffset < r.parent.content.size
          )
            return !1;
          i = Ro(r);
        }
        let s = i && i.nodeAfter;
        return (
          !!s &&
          !!fo.isSelectable(s) &&
          (t && t(e.tr.setSelection(fo.create(e.doc, i.pos)).scrollIntoView()),
          !0)
        );
      }
    ),
    Uo = {
      Enter: Bo(
        (e, t) => {
          let { $head: n, $anchor: r } = e.selection;
          return (
            !!n.parent.type.spec.code &&
            !!n.sameParent(r) &&
            (t && t(e.tr.insertText("\n").scrollIntoView()), !0)
          );
        },
        (e, t) => {
          let n = e.selection,
            { $from: r, $to: o } = n;
          if (
            n instanceof go ||
            r.parent.inlineContent ||
            o.parent.inlineContent
          )
            return !1;
          let i = $o(o.parent.contentMatchAt(o.indexAfter()));
          if (!i || !i.isTextblock) return !1;
          if (t) {
            let n = (!r.parentOffset && o.index() < o.parent.childCount ? r : o)
                .pos,
              s = e.tr.insert(n, i.createAndFill());
            s.setSelection(ho.create(s.doc, n + 1)), t(s.scrollIntoView());
          }
          return !0;
        },
        (e, t) => {
          let { $cursor: n } = e.selection;
          if (!n || n.parent.content.size) return !1;
          if (n.depth > 1 && n.after() != n.end(-1)) {
            let r = n.before();
            if (Hr(e.doc, r)) return t && t(e.tr.split(r).scrollIntoView()), !0;
          }
          let r = n.blockRange(),
            o = r && Fr(r);
          return null != o && (t && t(e.tr.lift(r, o).scrollIntoView()), !0);
        },
        (e, t) => {
          let { $from: n, $to: r } = e.selection;
          if (e.selection instanceof fo && e.selection.node.isBlock)
            return (
              !!n.parentOffset &&
              !!Hr(e.doc, n.pos) &&
              (t && t(e.tr.split(n.pos).scrollIntoView()), !0)
            );
          if (!n.depth) return !1;
          let o,
            i,
            s = [],
            a = !1,
            l = !1;
          for (let e = n.depth; ; e--) {
            if (n.node(e).isBlock) {
              let t;
              (a = n.end(e) == n.pos + (n.depth - e)),
                (l = n.start(e) == n.pos - (n.depth - e)),
                (i = $o(n.node(e - 1).contentMatchAt(n.indexAfter(e - 1)))),
                s.unshift(t || (a && i ? { type: i } : null)),
                (o = e);
              break;
            }
            if (1 == e) return !1;
            s.unshift(null);
          }
          let c = e.tr;
          (e.selection instanceof ho || e.selection instanceof go) &&
            c.deleteSelection();
          let d = c.mapping.map(n.pos),
            u = Hr(c.doc, d, s.length, s);
          if (
            (u ||
              ((s[0] = i ? { type: i } : null),
              (u = Hr(c.doc, d, s.length, s))),
            !u)
          )
            return !1;
          if ((c.split(d, s.length, s), !a && l && n.node(o).type != i)) {
            let e = c.mapping.map(n.before(o)),
              t = c.doc.resolve(e);
            i &&
              n.node(o - 1).canReplaceWith(t.index(), t.index() + 1, i) &&
              c.setNodeMarkup(c.mapping.map(n.before(o)), i);
          }
          return t && t(c.scrollIntoView()), !0;
        }
      ),
      "Mod-Enter": (e, t) => {
        let { $head: n, $anchor: r } = e.selection;
        if (!n.parent.type.spec.code || !n.sameParent(r)) return !1;
        let o = n.node(-1),
          i = n.indexAfter(-1),
          s = $o(o.contentMatchAt(i));
        if (!s || !o.canReplaceWith(i, i, s)) return !1;
        if (t) {
          let r = n.after(),
            o = e.tr.replaceWith(r, r, s.createAndFill());
          o.setSelection(ao.near(o.doc.resolve(r), 1)), t(o.scrollIntoView());
        }
        return !0;
      },
      Backspace: jo,
      "Mod-Backspace": jo,
      "Shift-Backspace": jo,
      Delete: Fo,
      "Mod-Delete": Fo,
      "Mod-a": (e, t) => (t && t(e.tr.setSelection(new go(e.doc))), !0),
    },
    Zo = {
      "Ctrl-h": Uo.Backspace,
      "Alt-Backspace": Uo["Mod-Backspace"],
      "Ctrl-d": Uo.Delete,
      "Ctrl-Alt-Backspace": Uo["Mod-Delete"],
      "Alt-Delete": Uo["Mod-Delete"],
      "Alt-d": Uo["Mod-Delete"],
      "Ctrl-a": Po,
      "Ctrl-e": Vo,
    };
  for (let e in Uo) Zo[e] = Uo[e];
  let qo = (
    "undefined" != typeof navigator
      ? /Mac|iP(hone|[oa]d)/.test(navigator.platform)
      : "undefined" != typeof os && os.platform && "darwin" == os.platform()
  )
    ? Zo
    : Uo;
  var Ho = function () {};
  (Ho.prototype.append = function (e) {
    return e.length
      ? ((e = Ho.from(e)),
        (!this.length && e) ||
          (e.length < 200 && this.leafAppend(e)) ||
          (this.length < 200 && e.leafPrepend(this)) ||
          this.appendInner(e))
      : this;
  }),
    (Ho.prototype.prepend = function (e) {
      return e.length ? Ho.from(e).append(this) : this;
    }),
    (Ho.prototype.appendInner = function (e) {
      return new Wo(this, e);
    }),
    (Ho.prototype.slice = function (e, t) {
      return (
        void 0 === e && (e = 0),
        void 0 === t && (t = this.length),
        e >= t
          ? Ho.empty
          : this.sliceInner(Math.max(0, e), Math.min(this.length, t))
      );
    }),
    (Ho.prototype.get = function (e) {
      if (!(e < 0 || e >= this.length)) return this.getInner(e);
    }),
    (Ho.prototype.forEach = function (e, t, n) {
      void 0 === t && (t = 0),
        void 0 === n && (n = this.length),
        t <= n
          ? this.forEachInner(e, t, n, 0)
          : this.forEachInvertedInner(e, t, n, 0);
    }),
    (Ho.prototype.map = function (e, t, n) {
      void 0 === t && (t = 0), void 0 === n && (n = this.length);
      var r = [];
      return (
        this.forEach(
          function (t, n) {
            return r.push(e(t, n));
          },
          t,
          n
        ),
        r
      );
    }),
    (Ho.from = function (e) {
      return e instanceof Ho ? e : e && e.length ? new Ko(e) : Ho.empty;
    });
  var Ko = (function (e) {
    function t(t) {
      e.call(this), (this.values = t);
    }
    e && (t.__proto__ = e),
      (t.prototype = Object.create(e && e.prototype)),
      (t.prototype.constructor = t);
    var n = { length: { configurable: !0 }, depth: { configurable: !0 } };
    return (
      (t.prototype.flatten = function () {
        return this.values;
      }),
      (t.prototype.sliceInner = function (e, n) {
        return 0 == e && n == this.length
          ? this
          : new t(this.values.slice(e, n));
      }),
      (t.prototype.getInner = function (e) {
        return this.values[e];
      }),
      (t.prototype.forEachInner = function (e, t, n, r) {
        for (var o = t; o < n; o++)
          if (!1 === e(this.values[o], r + o)) return !1;
      }),
      (t.prototype.forEachInvertedInner = function (e, t, n, r) {
        for (var o = t - 1; o >= n; o--)
          if (!1 === e(this.values[o], r + o)) return !1;
      }),
      (t.prototype.leafAppend = function (e) {
        if (this.length + e.length <= 200)
          return new t(this.values.concat(e.flatten()));
      }),
      (t.prototype.leafPrepend = function (e) {
        if (this.length + e.length <= 200)
          return new t(e.flatten().concat(this.values));
      }),
      (n.length.get = function () {
        return this.values.length;
      }),
      (n.depth.get = function () {
        return 0;
      }),
      Object.defineProperties(t.prototype, n),
      t
    );
  })(Ho);
  Ho.empty = new Ko([]);
  var Wo = (function (e) {
    function t(t, n) {
      e.call(this),
        (this.left = t),
        (this.right = n),
        (this.length = t.length + n.length),
        (this.depth = Math.max(t.depth, n.depth) + 1);
    }
    return (
      e && (t.__proto__ = e),
      (t.prototype = Object.create(e && e.prototype)),
      (t.prototype.constructor = t),
      (t.prototype.flatten = function () {
        return this.left.flatten().concat(this.right.flatten());
      }),
      (t.prototype.getInner = function (e) {
        return e < this.left.length
          ? this.left.get(e)
          : this.right.get(e - this.left.length);
      }),
      (t.prototype.forEachInner = function (e, t, n, r) {
        var o = this.left.length;
        if (
          (t < o && !1 === this.left.forEachInner(e, t, Math.min(n, o), r)) ||
          (n > o &&
            !1 ===
              this.right.forEachInner(
                e,
                Math.max(t - o, 0),
                Math.min(this.length, n) - o,
                r + o
              ))
        )
          return !1;
      }),
      (t.prototype.forEachInvertedInner = function (e, t, n, r) {
        var o = this.left.length;
        if (
          (t > o &&
            !1 ===
              this.right.forEachInvertedInner(
                e,
                t - o,
                Math.max(n, o) - o,
                r + o
              )) ||
          (n < o &&
            !1 === this.left.forEachInvertedInner(e, Math.min(t, o), n, r))
        )
          return !1;
      }),
      (t.prototype.sliceInner = function (e, t) {
        if (0 == e && t == this.length) return this;
        var n = this.left.length;
        return t <= n
          ? this.left.slice(e, t)
          : e >= n
          ? this.right.slice(e - n, t - n)
          : this.left.slice(e, n).append(this.right.slice(0, t - n));
      }),
      (t.prototype.leafAppend = function (e) {
        var n = this.right.leafAppend(e);
        if (n) return new t(this.left, n);
      }),
      (t.prototype.leafPrepend = function (e) {
        var n = this.left.leafPrepend(e);
        if (n) return new t(n, this.right);
      }),
      (t.prototype.appendInner = function (e) {
        return this.left.depth >= Math.max(this.right.depth, e.depth) + 1
          ? new t(this.left, new t(this.right, e))
          : new t(this, e);
      }),
      t
    );
  })(Ho);
  class Jo {
    constructor(e, t) {
      (this.items = e), (this.eventCount = t);
    }
    popEvent(e, t) {
      let n, r, o, i;
      if (0 == this.eventCount) return null;
      let s = this.items.length;
      for (; ; s--)
        if (this.items.get(s - 1).selection) {
          --s;
          break;
        }
      t && (r = (n = this.remapping(s, this.items.length)).maps.length);
      let a = e.tr,
        l = [],
        c = [];
      return (
        this.items.forEach(
          (e, t) => {
            if (!e.step)
              return (
                n || (r = (n = this.remapping(s, t + 1)).maps.length),
                r--,
                void c.push(e)
              );
            if (n) {
              c.push(new Go(e.map));
              let t,
                o = e.step.map(n.slice(r));
              o &&
                a.maybeStep(o).doc &&
                ((t = a.mapping.maps[a.mapping.maps.length - 1]),
                l.push(new Go(t, void 0, void 0, l.length + c.length))),
                r--,
                t && n.appendMap(t, r);
            } else a.maybeStep(e.step);
            return e.selection
              ? ((o = n ? e.selection.map(n.slice(r)) : e.selection),
                (i = new Jo(
                  this.items.slice(0, s).append(c.reverse().concat(l)),
                  this.eventCount - 1
                )),
                !1)
              : void 0;
          },
          this.items.length,
          0
        ),
        { remaining: i, transform: a, selection: o }
      );
    }
    addTransform(e, t, n, r) {
      var o, i;
      let s,
        a = [],
        l = this.eventCount,
        c = this.items,
        d = !r && c.length ? c.get(c.length - 1) : null;
      for (let n = 0; n < e.steps.length; n++) {
        let o,
          i = e.steps[n].invert(e.docs[n]),
          s = new Go(e.mapping.maps[n], i, t);
        (o = d && d.merge(s)) &&
          ((s = o), n ? a.pop() : (c = c.slice(0, c.length - 1))),
          a.push(s),
          t && (l++, (t = void 0)),
          r || (d = s);
      }
      let u = l - n.depth;
      return (
        u > Xo &&
          ((i = u),
          (o = c).forEach((e, t) => {
            if (e.selection && 0 == i--) return (s = t), !1;
          }),
          (c = o.slice(s)),
          (l -= u)),
        new Jo(c.append(a), l)
      );
    }
    remapping(e, t) {
      let n = new Nr();
      return (
        this.items.forEach(
          (t, r) => {
            let o =
              null != t.mirrorOffset && r - t.mirrorOffset >= e
                ? n.maps.length - t.mirrorOffset
                : void 0;
            n.appendMap(t.map, o);
          },
          e,
          t
        ),
        n
      );
    }
    addMaps(e) {
      return 0 == this.eventCount
        ? this
        : new Jo(this.items.append(e.map((e) => new Go(e))), this.eventCount);
    }
    rebased(e, t) {
      if (!this.eventCount) return this;
      let n = [],
        r = Math.max(0, this.items.length - t),
        o = e.mapping,
        i = e.steps.length,
        s = this.eventCount;
      this.items.forEach((e) => {
        e.selection && s--;
      }, r);
      let a = t;
      this.items.forEach((t) => {
        let r = o.getMirror(--a);
        if (null == r) return;
        i = Math.min(i, r);
        let l = o.maps[r];
        if (t.step) {
          let i = e.steps[r].invert(e.docs[r]),
            c = t.selection && t.selection.map(o.slice(a + 1, r));
          c && s++, n.push(new Go(l, i, c));
        } else n.push(new Go(l));
      }, r);
      let l = [];
      for (let e = t; e < i; e++) l.push(new Go(o.maps[e]));
      let c = new Jo(this.items.slice(0, r).append(l).append(n), s);
      return (
        c.emptyItemCount() > 500 &&
          (c = c.compress(this.items.length - n.length)),
        c
      );
    }
    emptyItemCount() {
      let e = 0;
      return (
        this.items.forEach((t) => {
          !t.step && e++;
        }),
        e
      );
    }
    compress(e = this.items.length) {
      let t = this.remapping(0, e),
        n = t.maps.length,
        r = [],
        o = 0;
      return (
        this.items.forEach(
          (i, s) => {
            if (s >= e) r.push(i), i.selection && o++;
            else if (i.step) {
              let e = i.step.map(t.slice(n)),
                s = e && e.getMap();
              if ((n--, s && t.appendMap(s, n), e)) {
                let a = i.selection && i.selection.map(t.slice(n));
                a && o++;
                let l,
                  c = new Go(s.invert(), e, a),
                  d = r.length - 1;
                (l = r.length && r[d].merge(c)) ? (r[d] = l) : r.push(c);
              }
            } else i.map && n--;
          },
          this.items.length,
          0
        ),
        new Jo(Ho.from(r.reverse()), o)
      );
    }
  }
  Jo.empty = new Jo(Ho.empty, 0);
  class Go {
    constructor(e, t, n, r) {
      (this.map = e),
        (this.step = t),
        (this.selection = n),
        (this.mirrorOffset = r);
    }
    merge(e) {
      if (this.step && e.step && !e.selection) {
        let t = e.step.merge(this.step);
        if (t) return new Go(t.getMap().invert(), t, this.selection);
      }
    }
  }
  class Yo {
    constructor(e, t, n, r, o) {
      (this.done = e),
        (this.undone = t),
        (this.prevRanges = n),
        (this.prevTime = r),
        (this.prevComposition = o);
    }
  }
  let Xo = 20;
  function Qo(e) {
    let t = [];
    for (let n = e.length - 1; n >= 0 && 0 == t.length; n--)
      e[n].forEach((e, n, r, o) => t.push(r, o));
    return t;
  }
  function ei(e, t) {
    if (!e) return null;
    let n = [];
    for (let r = 0; r < e.length; r += 2) {
      let o = t.map(e[r], 1),
        i = t.map(e[r + 1], -1);
      o <= i && n.push(o, i);
    }
    return n;
  }
  let ti = !1,
    ni = null;
  function ri(e) {
    let t = e.plugins;
    if (ni != t) {
      (ti = !1), (ni = t);
      for (let e = 0; e < t.length; e++)
        if (t[e].spec.historyPreserveItems) {
          ti = !0;
          break;
        }
    }
    return ti;
  }
  let oi = new No("history"),
    ii = new No("closeHistory");
  function si(e, t) {
    return (n, r) => {
      let o = oi.getState(n);
      if (!o || 0 == (e ? o.undone : o.done).eventCount) return !1;
      if (r) {
        let i = (function (e, t, n) {
          let r = ri(t),
            o = oi.get(t).spec.config,
            i = (n ? e.undone : e.done).popEvent(t, r);
          if (!i) return null;
          let s = i.selection.resolve(i.transform.doc),
            a = (n ? e.done : e.undone).addTransform(
              i.transform,
              t.selection.getBookmark(),
              o,
              r
            ),
            l = new Yo(n ? a : i.remaining, n ? i.remaining : a, null, 0, -1);
          return i.transform
            .setSelection(s)
            .setMeta(oi, { redo: n, historyState: l });
        })(o, n, e);
        i && r(t ? i.scrollIntoView() : i);
      }
      return !0;
    };
  }
  let ai = si(!1, !0),
    li = si(!0, !0);
  si(!1, !1), si(!0, !1);
  for (
    var ci = {
        8: "Backspace",
        9: "Tab",
        10: "Enter",
        12: "NumLock",
        13: "Enter",
        16: "Shift",
        17: "Control",
        18: "Alt",
        20: "CapsLock",
        27: "Escape",
        32: " ",
        33: "PageUp",
        34: "PageDown",
        35: "End",
        36: "Home",
        37: "ArrowLeft",
        38: "ArrowUp",
        39: "ArrowRight",
        40: "ArrowDown",
        44: "PrintScreen",
        45: "Insert",
        46: "Delete",
        59: ";",
        61: "=",
        91: "Meta",
        92: "Meta",
        106: "*",
        107: "+",
        108: ",",
        109: "-",
        110: ".",
        111: "/",
        144: "NumLock",
        145: "ScrollLock",
        160: "Shift",
        161: "Shift",
        162: "Control",
        163: "Control",
        164: "Alt",
        165: "Alt",
        173: "-",
        186: ";",
        187: "=",
        188: ",",
        189: "-",
        190: ".",
        191: "/",
        192: "`",
        219: "[",
        220: "\\",
        221: "]",
        222: "'",
      },
      di = {
        48: ")",
        49: "!",
        50: "@",
        51: "#",
        52: "$",
        53: "%",
        54: "^",
        55: "&",
        56: "*",
        57: "(",
        59: ":",
        61: "+",
        173: "_",
        186: ":",
        187: "+",
        188: "<",
        189: "_",
        190: ">",
        191: "?",
        192: "~",
        219: "{",
        220: "|",
        221: "}",
        222: '"',
      },
      ui = "undefined" != typeof navigator && /Mac/.test(navigator.platform),
      hi =
        "undefined" != typeof navigator &&
        /MSIE \d|Trident\/(?:[7-9]|\d{2,})\..*rv:(\d+)/.exec(
          navigator.userAgent
        ),
      pi = 0;
    pi < 10;
    pi++
  )
    ci[48 + pi] = ci[96 + pi] = String(pi);
  for (pi = 1; pi <= 24; pi++) ci[pi + 111] = "F" + pi;
  for (pi = 65; pi <= 90; pi++)
    (ci[pi] = String.fromCharCode(pi + 32)), (di[pi] = String.fromCharCode(pi));
  for (var fi in ci) di.hasOwnProperty(fi) || (di[fi] = ci[fi]);
  let mi =
    "undefined" != typeof navigator &&
    /Mac|iP(hone|[oa]d)/.test(navigator.platform);
  function gi(e, t, n = !0) {
    return (
      t.altKey && (e = "Alt-" + e),
      t.ctrlKey && (e = "Ctrl-" + e),
      t.metaKey && (e = "Meta-" + e),
      n && t.shiftKey && (e = "Shift-" + e),
      e
    );
  }
  function vi(e) {
    let t;
    return new Co({
      props: {
        handleKeyDown:
          ((t = (function (e) {
            let t = Object.create(null);
            for (let n in e)
              t[
                (function (e) {
                  let t,
                    n,
                    r,
                    o,
                    i = e.split(/-(?!$)/),
                    s = i[i.length - 1];
                  "Space" == s && (s = " ");
                  for (let e = 0; e < i.length - 1; e++) {
                    let s = i[e];
                    if (/^(cmd|meta|m)$/i.test(s)) o = !0;
                    else if (/^a(lt)?$/i.test(s)) t = !0;
                    else if (/^(c|ctrl|control)$/i.test(s)) n = !0;
                    else if (/^s(hift)?$/i.test(s)) r = !0;
                    else {
                      if (!/^mod$/i.test(s))
                        throw Error("Unrecognized modifier name: " + s);
                      mi ? (o = !0) : (n = !0);
                    }
                  }
                  return (
                    t && (s = "Alt-" + s),
                    n && (s = "Ctrl-" + s),
                    o && (s = "Meta-" + s),
                    r && (s = "Shift-" + s),
                    s
                  );
                })(n)
              ] = e[n];
            return t;
          })(e)),
          function (e, n) {
            var r;
            let o,
              i =
                ("Esc" ==
                  (r =
                    (!(
                      (ui &&
                        n.metaKey &&
                        n.shiftKey &&
                        !n.ctrlKey &&
                        !n.altKey) ||
                      (hi && n.shiftKey && n.key && 1 == n.key.length) ||
                      "Unidentified" == n.key
                    ) &&
                      n.key) ||
                    (n.shiftKey ? di : ci)[n.keyCode] ||
                    n.key ||
                    "Unidentified") && (r = "Escape"),
                "Del" == r && (r = "Delete"),
                "Left" == r && (r = "ArrowLeft"),
                "Up" == r && (r = "ArrowUp"),
                "Right" == r && (r = "ArrowRight"),
                "Down" == r && (r = "ArrowDown"),
                r),
              s = t[gi(i, n)];
            if (s && s(e.state, e.dispatch, e)) return !0;
            if (1 == i.length && " " != i) {
              if (n.shiftKey) {
                let r = t[gi(i, n, !1)];
                if (r && r(e.state, e.dispatch, e)) return !0;
              }
              if (
                (n.shiftKey ||
                  n.altKey ||
                  n.metaKey ||
                  i.charCodeAt(0) > 127) &&
                (o = ci[n.keyCode]) &&
                o != i
              ) {
                let r = t[gi(o, n)];
                if (r && r(e.state, e.dispatch, e)) return !0;
              }
            }
            return !1;
          }),
      },
    });
  }
  let yi = globalThis,
    bi =
      yi.ShadowRoot &&
      (void 0 === yi.ShadyCSS || yi.ShadyCSS.nativeShadow) &&
      "adoptedStyleSheets" in Document.prototype &&
      "replace" in CSSStyleSheet.prototype,
    wi = Symbol(),
    ki = new WeakMap();
  class xi {
    constructor(e, t, n) {
      if (((this._$cssResult$ = !0), n !== wi))
        throw Error(
          "CSSResult is not constructable. Use `unsafeCSS` or `css` instead."
        );
      (this.cssText = e), (this.t = t);
    }
    get styleSheet() {
      let e = this.o,
        t = this.t;
      if (bi && void 0 === e) {
        let n = void 0 !== t && 1 === t.length;
        n && (e = ki.get(t)),
          void 0 === e &&
            ((this.o = e = new CSSStyleSheet()).replaceSync(this.cssText),
            n && ki.set(t, e));
      }
      return e;
    }
    toString() {
      return this.cssText;
    }
  }
  let Si = (e, ...t) =>
      new xi(
        1 === e.length
          ? e[0]
          : t.reduce(
              (t, n, r) =>
                t +
                ((e) => {
                  if (!0 === e._$cssResult$) return e.cssText;
                  if ("number" == typeof e) return e;
                  throw Error(
                    "Value passed to 'css' function must be a 'css' function result: " +
                      e +
                      ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security."
                  );
                })(n) +
                e[r + 1],
              e[0]
            ),
        e,
        wi
      ),
    Ei = bi
      ? (e) => e
      : (e) =>
          e instanceof CSSStyleSheet
            ? ((e) => {
                let t = "";
                for (let n of e.cssRules) t += n.cssText;
                return ((e) =>
                  new xi("string" == typeof e ? e : e + "", void 0, wi))(t);
              })(e)
            : e,
    {
      is: _i,
      defineProperty: Ci,
      getOwnPropertyDescriptor: Ti,
      getOwnPropertyNames: Oi,
      getOwnPropertySymbols: Ni,
      getPrototypeOf: Ai,
    } = Object,
    Mi = globalThis,
    Di = Mi.trustedTypes,
    Ri = Di ? Di.emptyScript : "",
    $i = Mi.reactiveElementPolyfillSupport,
    Ii = (e, t) => e,
    zi = {
      toAttribute(e, t) {
        switch (t) {
          case Boolean:
            e = e ? Ri : null;
            break;
          case Object:
          case Array:
            e = null == e ? e : JSON.stringify(e);
        }
        return e;
      },
      fromAttribute(e, t) {
        let n = e;
        switch (t) {
          case Boolean:
            n = null !== e;
            break;
          case Number:
            n = null === e ? null : Number(e);
            break;
          case Object:
          case Array:
            try {
              n = JSON.parse(e);
            } catch (e) {
              n = null;
            }
        }
        return n;
      },
    },
    Pi = (e, t) => !_i(e, t),
    Vi = {
      attribute: !0,
      type: String,
      converter: zi,
      reflect: !1,
      hasChanged: Pi,
    };
  (Symbol.metadata ??= Symbol("metadata")),
    (Mi.litPropertyMetadata ??= new WeakMap());
  class Li extends HTMLElement {
    static addInitializer(e) {
      this._$Ei(), (this.l ??= []).push(e);
    }
    static get observedAttributes() {
      return this.finalize(), this._$Eh && [...this._$Eh.keys()];
    }
    static createProperty(e, t = Vi) {
      if (
        (t.state && (t.attribute = !1),
        this._$Ei(),
        this.elementProperties.set(e, t),
        !t.noAccessor)
      ) {
        let n = Symbol(),
          r = this.getPropertyDescriptor(e, n, t);
        void 0 !== r && Ci(this.prototype, e, r);
      }
    }
    static getPropertyDescriptor(e, t, n) {
      let { get: r, set: o } = Ti(this.prototype, e) ?? {
        get() {
          return this[t];
        },
        set(e) {
          this[t] = e;
        },
      };
      return {
        get() {
          return r?.call(this);
        },
        set(t) {
          let i = r?.call(this);
          o.call(this, t), this.requestUpdate(e, i, n);
        },
        configurable: !0,
        enumerable: !0,
      };
    }
    static getPropertyOptions(e) {
      return this.elementProperties.get(e) ?? Vi;
    }
    static _$Ei() {
      if (this.hasOwnProperty(Ii("elementProperties"))) return;
      let e = Ai(this);
      e.finalize(),
        void 0 !== e.l && (this.l = [...e.l]),
        (this.elementProperties = new Map(e.elementProperties));
    }
    static finalize() {
      if (this.hasOwnProperty(Ii("finalized"))) return;
      if (
        ((this.finalized = !0),
        this._$Ei(),
        this.hasOwnProperty(Ii("properties")))
      ) {
        let e = this.properties;
        for (let t of [...Oi(e), ...Ni(e)]) this.createProperty(t, e[t]);
      }
      let e = this[Symbol.metadata];
      if (null !== e) {
        let t = litPropertyMetadata.get(e);
        if (void 0 !== t)
          for (let [e, n] of t) this.elementProperties.set(e, n);
      }
      for (let [e, t] of ((this._$Eh = new Map()), this.elementProperties)) {
        let n = this._$Eu(e, t);
        void 0 !== n && this._$Eh.set(n, e);
      }
      this.elementStyles = this.finalizeStyles(this.styles);
    }
    static finalizeStyles(e) {
      let t = [];
      if (Array.isArray(e))
        for (let n of new Set(e.flat(1 / 0).reverse())) t.unshift(Ei(n));
      else void 0 !== e && t.push(Ei(e));
      return t;
    }
    static _$Eu(e, t) {
      let n = t.attribute;
      return !1 === n
        ? void 0
        : "string" == typeof n
        ? n
        : "string" == typeof e
        ? e.toLowerCase()
        : void 0;
    }
    constructor() {
      super(),
        (this._$Ep = void 0),
        (this.isUpdatePending = !1),
        (this.hasUpdated = !1),
        (this._$Em = null),
        this._$Ev();
    }
    _$Ev() {
      (this._$ES = new Promise((e) => (this.enableUpdating = e))),
        (this._$AL = new Map()),
        this._$E_(),
        this.requestUpdate(),
        this.constructor.l?.forEach((e) => e(this));
    }
    addController(e) {
      (this._$EO ??= new Set()).add(e),
        void 0 !== this.renderRoot && this.isConnected && e.hostConnected?.();
    }
    removeController(e) {
      this._$EO?.delete(e);
    }
    _$E_() {
      let e = new Map();
      for (let t of this.constructor.elementProperties.keys())
        this.hasOwnProperty(t) && (e.set(t, this[t]), delete this[t]);
      e.size > 0 && (this._$Ep = e);
    }
    createRenderRoot() {
      let e =
        this.shadowRoot ??
        this.attachShadow(this.constructor.shadowRootOptions);
      return (
        ((e, t) => {
          if (bi)
            e.adoptedStyleSheets = t.map((e) =>
              e instanceof CSSStyleSheet ? e : e.styleSheet
            );
          else
            for (let n of t) {
              let t = document.createElement("style"),
                r = yi.litNonce;
              void 0 !== r && t.setAttribute("nonce", r),
                (t.textContent = n.cssText),
                e.appendChild(t);
            }
        })(e, this.constructor.elementStyles),
        e
      );
    }
    connectedCallback() {
      (this.renderRoot ??= this.createRenderRoot()),
        this.enableUpdating(!0),
        this._$EO?.forEach((e) => e.hostConnected?.());
    }
    enableUpdating(e) {}
    disconnectedCallback() {
      this._$EO?.forEach((e) => e.hostDisconnected?.());
    }
    attributeChangedCallback(e, t, n) {
      this._$AK(e, n);
    }
    _$EC(e, t) {
      let n = this.constructor.elementProperties.get(e),
        r = this.constructor._$Eu(e, n);
      if (void 0 !== r && !0 === n.reflect) {
        let o = (
          void 0 !== n.converter?.toAttribute ? n.converter : zi
        ).toAttribute(t, n.type);
        (this._$Em = e),
          null == o ? this.removeAttribute(r) : this.setAttribute(r, o),
          (this._$Em = null);
      }
    }
    _$AK(e, t) {
      let n = this.constructor,
        r = n._$Eh.get(e);
      if (void 0 !== r && this._$Em !== r) {
        let e = n.getPropertyOptions(r),
          o =
            "function" == typeof e.converter
              ? { fromAttribute: e.converter }
              : void 0 !== e.converter?.fromAttribute
              ? e.converter
              : zi;
        (this._$Em = r),
          (this[r] = o.fromAttribute(t, e.type)),
          (this._$Em = null);
      }
    }
    requestUpdate(e, t, n) {
      if (void 0 !== e) {
        if (
          !((n ??= this.constructor.getPropertyOptions(e)).hasChanged ?? Pi)(
            this[e],
            t
          )
        )
          return;
        this.P(e, t, n);
      }
      !1 === this.isUpdatePending && (this._$ES = this._$ET());
    }
    P(e, t, n) {
      this._$AL.has(e) || this._$AL.set(e, t),
        !0 === n.reflect && this._$Em !== e && (this._$Ej ??= new Set()).add(e);
    }
    async _$ET() {
      this.isUpdatePending = !0;
      try {
        await this._$ES;
      } catch (e) {
        Promise.reject(e);
      }
      let e = this.scheduleUpdate();
      return null != e && (await e), !this.isUpdatePending;
    }
    scheduleUpdate() {
      return this.performUpdate();
    }
    performUpdate() {
      if (!this.isUpdatePending) return;
      if (!this.hasUpdated) {
        if (((this.renderRoot ??= this.createRenderRoot()), this._$Ep)) {
          for (let [e, t] of this._$Ep) this[e] = t;
          this._$Ep = void 0;
        }
        let e = this.constructor.elementProperties;
        if (e.size > 0)
          for (let [t, n] of e)
            !0 !== n.wrapped ||
              this._$AL.has(t) ||
              void 0 === this[t] ||
              this.P(t, this[t], n);
      }
      let e = !1,
        t = this._$AL;
      try {
        (e = this.shouldUpdate(t))
          ? (this.willUpdate(t),
            this._$EO?.forEach((e) => e.hostUpdate?.()),
            this.update(t))
          : this._$EU();
      } catch (t) {
        throw ((e = !1), this._$EU(), t);
      }
      e && this._$AE(t);
    }
    willUpdate(e) {}
    _$AE(e) {
      this._$EO?.forEach((e) => e.hostUpdated?.()),
        this.hasUpdated || ((this.hasUpdated = !0), this.firstUpdated(e)),
        this.updated(e);
    }
    _$EU() {
      (this._$AL = new Map()), (this.isUpdatePending = !1);
    }
    get updateComplete() {
      return this.getUpdateComplete();
    }
    getUpdateComplete() {
      return this._$ES;
    }
    shouldUpdate(e) {
      return !0;
    }
    update(e) {
      (this._$Ej &&= this._$Ej.forEach((e) => this._$EC(e, this[e]))),
        this._$EU();
    }
    updated(e) {}
    firstUpdated(e) {}
  }
  (Li.elementStyles = []),
    (Li.shadowRootOptions = { mode: "open" }),
    (Li[Ii("elementProperties")] = new Map()),
    (Li[Ii("finalized")] = new Map()),
    $i?.({ ReactiveElement: Li }),
    (Mi.reactiveElementVersions ??= []).push("2.0.4");
  let Bi = globalThis,
    ji = Bi.trustedTypes,
    Fi = ji ? ji.createPolicy("lit-html", { createHTML: (e) => e }) : void 0,
    Ui = "$lit$",
    Zi = `lit$${Math.random().toFixed(9).slice(2)}$`,
    qi = "?" + Zi,
    Hi = `<${qi}>`,
    Ki = document,
    Wi = () => Ki.createComment(""),
    Ji = (e) => null === e || ("object" != typeof e && "function" != typeof e),
    Gi = Array.isArray,
    Yi = "[ \t\n\f\r]",
    Xi = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,
    Qi = /-->/g,
    es = />/g,
    ts = RegExp(
      `>|${Yi}(?:([^\\s"'>=/]+)(${Yi}*=${Yi}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,
      "g"
    ),
    ns = /'/g,
    rs = /"/g,
    is = /^(?:script|style|textarea|title)$/i,
    ss =
      (e) =>
      (t, ...n) => ({ _$litType$: e, strings: t, values: n }),
    as = ss(1),
    ls = (ss(2), ss(3), Symbol.for("lit-noChange")),
    cs = Symbol.for("lit-nothing"),
    ds = new WeakMap(),
    us = Ki.createTreeWalker(Ki, 129);
  function hs(e, t) {
    if (!Gi(e) || !e.hasOwnProperty("raw"))
      throw Error("invalid template strings array");
    return void 0 !== Fi ? Fi.createHTML(t) : t;
  }
  class ps {
    constructor({ strings: e, _$litType$: t }, n) {
      let r;
      this.parts = [];
      let o = 0,
        i = 0,
        s = e.length - 1,
        a = this.parts,
        [l, c] = ((e, t) => {
          let n,
            r = e.length - 1,
            o = [],
            i = 2 === t ? "<svg>" : 3 === t ? "<math>" : "",
            s = Xi;
          for (let t = 0; t < r; t++) {
            let r,
              a,
              l = e[t],
              c = -1,
              d = 0;
            for (
              ;
              d < l.length && ((s.lastIndex = d), null !== (a = s.exec(l)));

            )
              (d = s.lastIndex),
                s === Xi
                  ? "!--" === a[1]
                    ? (s = Qi)
                    : void 0 !== a[1]
                    ? (s = es)
                    : void 0 !== a[2]
                    ? (is.test(a[2]) && (n = RegExp("</" + a[2], "g")),
                      (s = ts))
                    : void 0 !== a[3] && (s = ts)
                  : s === ts
                  ? ">" === a[0]
                    ? ((s = n ?? Xi), (c = -1))
                    : void 0 === a[1]
                    ? (c = -2)
                    : ((c = s.lastIndex - a[2].length),
                      (r = a[1]),
                      (s = void 0 === a[3] ? ts : '"' === a[3] ? rs : ns))
                  : s === rs || s === ns
                  ? (s = ts)
                  : s === Qi || s === es
                  ? (s = Xi)
                  : ((s = ts), (n = void 0));
            let u = s === ts && e[t + 1].startsWith("/>") ? " " : "";
            i +=
              s === Xi
                ? l + Hi
                : c >= 0
                ? (o.push(r), l.slice(0, c) + Ui + l.slice(c) + Zi + u)
                : l + Zi + (-2 === c ? t : u);
          }
          return [
            hs(
              e,
              i +
                (e[r] || "<?>") +
                (2 === t ? "</svg>" : 3 === t ? "</math>" : "")
            ),
            o,
          ];
        })(e, t);
      if (
        ((this.el = ps.createElement(l, n)),
        (us.currentNode = this.el.content),
        2 === t || 3 === t)
      ) {
        let e = this.el.content.firstChild;
        e.replaceWith(...e.childNodes);
      }
      for (; null !== (r = us.nextNode()) && a.length < s; ) {
        if (1 === r.nodeType) {
          if (r.hasAttributes())
            for (let e of r.getAttributeNames())
              if (e.endsWith(Ui)) {
                let t = c[i++],
                  n = r.getAttribute(e).split(Zi),
                  s = /([.?@])?(.*)/.exec(t);
                a.push({
                  type: 1,
                  index: o,
                  name: s[2],
                  strings: n,
                  ctor:
                    "." === s[1]
                      ? ys
                      : "?" === s[1]
                      ? bs
                      : "@" === s[1]
                      ? ws
                      : vs,
                }),
                  r.removeAttribute(e);
              } else
                e.startsWith(Zi) &&
                  (a.push({ type: 6, index: o }), r.removeAttribute(e));
          if (is.test(r.tagName)) {
            let e = r.textContent.split(Zi),
              t = e.length - 1;
            if (t > 0) {
              r.textContent = ji ? ji.emptyScript : "";
              for (let n = 0; n < t; n++)
                r.append(e[n], Wi()),
                  us.nextNode(),
                  a.push({ type: 2, index: ++o });
              r.append(e[t], Wi());
            }
          }
        } else if (8 === r.nodeType)
          if (r.data === qi) a.push({ type: 2, index: o });
          else {
            let e = -1;
            for (; -1 !== (e = r.data.indexOf(Zi, e + 1)); )
              a.push({ type: 7, index: o }), (e += Zi.length - 1);
          }
        o++;
      }
    }
    static createElement(e, t) {
      let n = Ki.createElement("template");
      return (n.innerHTML = e), n;
    }
  }
  function fs(e, t, n = e, r) {
    if (t === ls) return t;
    let o = void 0 !== r ? n._$Co?.[r] : n._$Cl,
      i = Ji(t) ? void 0 : t._$litDirective$;
    return (
      o?.constructor !== i &&
        (o?._$AO?.(!1),
        void 0 === i ? (o = void 0) : (o = new i(e))._$AT(e, n, r),
        void 0 !== r ? ((n._$Co ??= [])[r] = o) : (n._$Cl = o)),
      void 0 !== o && (t = fs(e, o._$AS(e, t.values), o, r)),
      t
    );
  }
  class ms {
    constructor(e, t) {
      (this._$AV = []), (this._$AN = void 0), (this._$AD = e), (this._$AM = t);
    }
    get parentNode() {
      return this._$AM.parentNode;
    }
    get _$AU() {
      return this._$AM._$AU;
    }
    u(e) {
      let {
          el: { content: t },
          parts: n,
        } = this._$AD,
        r = (e?.creationScope ?? Ki).importNode(t, !0);
      us.currentNode = r;
      let o = us.nextNode(),
        i = 0,
        s = 0,
        a = n[0];
      for (; void 0 !== a; ) {
        if (i === a.index) {
          let t;
          2 === a.type
            ? (t = new gs(o, o.nextSibling, this, e))
            : 1 === a.type
            ? (t = new a.ctor(o, a.name, a.strings, this, e))
            : 6 === a.type && (t = new ks(o, this, e)),
            this._$AV.push(t),
            (a = n[++s]);
        }
        i !== a?.index && ((o = us.nextNode()), i++);
      }
      return (us.currentNode = Ki), r;
    }
    p(e) {
      let t = 0;
      for (let n of this._$AV)
        void 0 !== n &&
          (void 0 !== n.strings
            ? (n._$AI(e, n, t), (t += n.strings.length - 2))
            : n._$AI(e[t])),
          t++;
    }
  }
  class gs {
    get _$AU() {
      return this._$AM?._$AU ?? this._$Cv;
    }
    constructor(e, t, n, r) {
      (this.type = 2),
        (this._$AH = cs),
        (this._$AN = void 0),
        (this._$AA = e),
        (this._$AB = t),
        (this._$AM = n),
        (this.options = r),
        (this._$Cv = r?.isConnected ?? !0);
    }
    get parentNode() {
      let e = this._$AA.parentNode,
        t = this._$AM;
      return void 0 !== t && 11 === e?.nodeType && (e = t.parentNode), e;
    }
    get startNode() {
      return this._$AA;
    }
    get endNode() {
      return this._$AB;
    }
    _$AI(e, t = this) {
      Ji((e = fs(this, e, t)))
        ? e === cs || null == e || "" === e
          ? (this._$AH !== cs && this._$AR(), (this._$AH = cs))
          : e !== this._$AH && e !== ls && this._(e)
        : void 0 !== e._$litType$
        ? this.$(e)
        : void 0 !== e.nodeType
        ? this.T(e)
        : ((e) => Gi(e) || "function" == typeof e?.[Symbol.iterator])(e)
        ? this.k(e)
        : this._(e);
    }
    O(e) {
      return this._$AA.parentNode.insertBefore(e, this._$AB);
    }
    T(e) {
      this._$AH !== e && (this._$AR(), (this._$AH = this.O(e)));
    }
    _(e) {
      this._$AH !== cs && Ji(this._$AH)
        ? (this._$AA.nextSibling.data = e)
        : this.T(Ki.createTextNode(e)),
        (this._$AH = e);
    }
    $(e) {
      let { values: t, _$litType$: n } = e,
        r =
          "number" == typeof n
            ? this._$AC(e)
            : (void 0 === n.el &&
                (n.el = ps.createElement(hs(n.h, n.h[0]), this.options)),
              n);
      if (this._$AH?._$AD === r) this._$AH.p(t);
      else {
        let e = new ms(r, this),
          n = e.u(this.options);
        e.p(t), this.T(n), (this._$AH = e);
      }
    }
    _$AC(e) {
      let t = ds.get(e.strings);
      return void 0 === t && ds.set(e.strings, (t = new ps(e))), t;
    }
    k(e) {
      Gi(this._$AH) || ((this._$AH = []), this._$AR());
      let t,
        n = this._$AH,
        r = 0;
      for (let o of e)
        r === n.length
          ? n.push((t = new gs(this.O(Wi()), this.O(Wi()), this, this.options)))
          : (t = n[r]),
          t._$AI(o),
          r++;
      r < n.length && (this._$AR(t && t._$AB.nextSibling, r), (n.length = r));
    }
    _$AR(e = this._$AA.nextSibling, t) {
      for (this._$AP?.(!1, !0, t); e && e !== this._$AB; ) {
        let t = e.nextSibling;
        e.remove(), (e = t);
      }
    }
    setConnected(e) {
      void 0 === this._$AM && ((this._$Cv = e), this._$AP?.(e));
    }
  }
  class vs {
    get tagName() {
      return this.element.tagName;
    }
    get _$AU() {
      return this._$AM._$AU;
    }
    constructor(e, t, n, r, o) {
      (this.type = 1),
        (this._$AH = cs),
        (this._$AN = void 0),
        (this.element = e),
        (this.name = t),
        (this._$AM = r),
        (this.options = o),
        n.length > 2 || "" !== n[0] || "" !== n[1]
          ? ((this._$AH = Array(n.length - 1).fill(new String())),
            (this.strings = n))
          : (this._$AH = cs);
    }
    _$AI(e, t = this, n, r) {
      let o = this.strings,
        i = !1;
      if (void 0 === o)
        (i = !Ji((e = fs(this, e, t, 0))) || (e !== this._$AH && e !== ls)) &&
          (this._$AH = e);
      else {
        let r,
          s,
          a = e;
        for (e = o[0], r = 0; r < o.length - 1; r++)
          (s = fs(this, a[n + r], t, r)) === ls && (s = this._$AH[r]),
            (i ||= !Ji(s) || s !== this._$AH[r]),
            s === cs ? (e = cs) : e !== cs && (e += (s ?? "") + o[r + 1]),
            (this._$AH[r] = s);
      }
      i && !r && this.j(e);
    }
    j(e) {
      e === cs
        ? this.element.removeAttribute(this.name)
        : this.element.setAttribute(this.name, e ?? "");
    }
  }
  class ys extends vs {
    constructor() {
      super(...arguments), (this.type = 3);
    }
    j(e) {
      this.element[this.name] = e === cs ? void 0 : e;
    }
  }
  class bs extends vs {
    constructor() {
      super(...arguments), (this.type = 4);
    }
    j(e) {
      this.element.toggleAttribute(this.name, !!e && e !== cs);
    }
  }
  class ws extends vs {
    constructor(e, t, n, r, o) {
      super(e, t, n, r, o), (this.type = 5);
    }
    _$AI(e, t = this) {
      if ((e = fs(this, e, t, 0) ?? cs) === ls) return;
      let n = this._$AH,
        r =
          (e === cs && n !== cs) ||
          e.capture !== n.capture ||
          e.once !== n.once ||
          e.passive !== n.passive,
        o = e !== cs && (n === cs || r);
      r && this.element.removeEventListener(this.name, this, n),
        o && this.element.addEventListener(this.name, this, e),
        (this._$AH = e);
    }
    handleEvent(e) {
      "function" == typeof this._$AH
        ? this._$AH.call(this.options?.host ?? this.element, e)
        : this._$AH.handleEvent(e);
    }
  }
  class ks {
    constructor(e, t, n) {
      (this.element = e),
        (this.type = 6),
        (this._$AN = void 0),
        (this._$AM = t),
        (this.options = n);
    }
    get _$AU() {
      return this._$AM._$AU;
    }
    _$AI(e) {
      fs(this, e);
    }
  }
  let xs = Bi.litHtmlPolyfillSupport;
  xs?.(ps, gs), (Bi.litHtmlVersions ??= []).push("3.2.1");
  class Ss extends Li {
    constructor() {
      super(...arguments),
        (this.renderOptions = { host: this }),
        (this._$Do = void 0);
    }
    createRenderRoot() {
      let e = super.createRenderRoot();
      return (this.renderOptions.renderBefore ??= e.firstChild), e;
    }
    update(e) {
      let t = this.render();
      this.hasUpdated || (this.renderOptions.isConnected = this.isConnected),
        super.update(e),
        (this._$Do = ((e, t, n) => {
          let r = n?.renderBefore ?? t,
            o = r._$litPart$;
          if (void 0 === o) {
            let e = n?.renderBefore ?? null;
            r._$litPart$ = o = new gs(
              t.insertBefore(Wi(), e),
              e,
              void 0,
              n ?? {}
            );
          }
          return o._$AI(e), o;
        })(t, this.renderRoot, this.renderOptions));
    }
    connectedCallback() {
      super.connectedCallback(), this._$Do?.setConnected(!0);
    }
    disconnectedCallback() {
      super.disconnectedCallback(), this._$Do?.setConnected(!1);
    }
    render() {
      return ls;
    }
  }
  (Ss._$litElement$ = !0),
    (Ss.finalized = !0),
    globalThis.litElementHydrateSupport?.({ LitElement: Ss });
  let Es = globalThis.litElementPolyfillSupport;
  Es?.({ LitElement: Ss }),
    (globalThis.litElementVersions ??= []).push("4.1.1");
  let _s = {
      attribute: !0,
      type: String,
      converter: zi,
      reflect: !1,
      hasChanged: Pi,
    },
    Cs = (e = _s, t, n) => {
      let { kind: r, metadata: o } = n,
        i = globalThis.litPropertyMetadata.get(o);
      if (
        (void 0 === i && globalThis.litPropertyMetadata.set(o, (i = new Map())),
        i.set(n.name, e),
        "accessor" === r)
      ) {
        let { name: r } = n;
        return {
          set(n) {
            let o = t.get.call(this);
            t.set.call(this, n), this.requestUpdate(r, o, e);
          },
          init(t) {
            return void 0 !== t && this.P(r, void 0, e), t;
          },
        };
      }
      if ("setter" === r) {
        let { name: r } = n;
        return function (n) {
          let o = this[r];
          t.call(this, n), this.requestUpdate(r, o, e);
        };
      }
      throw Error("Unsupported decorator location: " + r);
    };
  function Ts(e) {
    return (t, n) =>
      "object" == typeof n
        ? Cs(e, t, n)
        : ((e, t, n) => {
            let r = t.hasOwnProperty(n);
            return (
              t.constructor.createProperty(n, r ? { ...e, wrapped: !0 } : e),
              r ? Object.getOwnPropertyDescriptor(t, n) : void 0
            );
          })(e, t, n);
  }
  let Os = (e, t, n) => (
    (n.configurable = !0),
    (n.enumerable = !0),
    Reflect.decorate && "object" != typeof t && Object.defineProperty(e, t, n),
    n
  );
  function Ns(e, t) {
    return (n, r, o) => {
      let i = (t) => t.renderRoot?.querySelector(e) ?? null;
      if (t) {
        let { get: e, set: t } =
          "object" == typeof r
            ? n
            : o ??
              (() => {
                let e = Symbol();
                return {
                  get() {
                    return this[e];
                  },
                  set(t) {
                    this[e] = t;
                  },
                };
              })();
        return Os(n, r, {
          get() {
            let n = e.call(this);
            return (
              void 0 === n &&
                (null !== (n = i(this)) || this.hasUpdated) &&
                t.call(this, n),
              n
            );
          },
        });
      }
      return Os(n, r, {
        get() {
          return i(this);
        },
      });
    };
  }
  var As = Object.defineProperty,
    Ms = Object.getOwnPropertyDescriptor;
  function Ds(
    e,
    {
      validSizes: t = ["s", "m", "l", "xl"],
      noDefaultSize: n,
      defaultSize: r = "m",
    } = {}
  ) {
    class o extends e {
      constructor() {
        super(...arguments), (this._size = r);
      }
      get size() {
        return this._size || r;
      }
      set size(e) {
        let o = e && e.toLocaleLowerCase(),
          i = t.includes(o) ? o : n ? null : r;
        if ((i && this.setAttribute("size", i), this._size === i)) return;
        let s = this._size;
        (this._size = i), this.requestUpdate("size", s);
      }
      update(e) {
        this.hasAttribute("size") || n || this.setAttribute("size", this.size),
          super.update(e);
      }
    }
    return (
      ((e, t, n, r) => {
        for (
          var o, i = r > 1 ? void 0 : r ? Ms(t, n) : t, s = e.length - 1;
          s >= 0;
          s--
        )
          (o = e[s]) && (i = (r ? o(t, n, i) : o(i)) || i);
        r && i && As(t, n, i);
      })([Ts({ type: String })], o.prototype, "size", 1),
      o
    );
  }
  let Rs = (e) => e ?? cs;
  var $s = Object.defineProperty,
    Is = Object.getOwnPropertyDescriptor,
    zs = (e, t, n, r) => {
      for (
        var o, i = r > 1 ? void 0 : r ? Is(t, n) : t, s = e.length - 1;
        s >= 0;
        s--
      )
        (o = e[s]) && (i = (r ? o(t, n, i) : o(i)) || i);
      return r && i && $s(t, n, i), i;
    };
  let Ps = new Set();
  new MutationObserver(() => {
    let e =
      "rtl" === document.documentElement.dir
        ? document.documentElement.dir
        : "ltr";
    Ps.forEach((t) => {
      t.setAttribute("dir", e);
    });
  }).observe(document.documentElement, {
    attributes: !0,
    attributeFilter: ["dir"],
  });
  let Vs = (e) =>
    void 0 !== e.startManagingContentDirection || "SP-THEME" === e.tagName;
  class Ls extends (function (e) {
    return class extends e {
      get isLTR() {
        return "ltr" === this.dir;
      }
      hasVisibleFocusInTree() {
        let e = ((e = document) => {
          var t;
          let n = e.activeElement;
          for (; null != n && n.shadowRoot && n.shadowRoot.activeElement; )
            n = n.shadowRoot.activeElement;
          let r = n ? [n] : [];
          for (; n; ) {
            let e =
              n.assignedSlot ||
              n.parentElement ||
              (null == (t = n.getRootNode()) ? void 0 : t.host);
            e && r.push(e), (n = e);
          }
          return r;
        })(this.getRootNode())[0];
        if (!e) return !1;
        try {
          return e.matches(":focus-visible") || e.matches(".focus-visible");
        } catch (t) {
          return e.matches(".focus-visible");
        }
      }
      connectedCallback() {
        if (!this.hasAttribute("dir")) {
          let e = this.assignedSlot || this.parentNode;
          for (; e !== document.documentElement && !Vs(e); )
            e = e.assignedSlot || e.parentNode || e.host;
          if (
            ((this.dir = "rtl" === e.dir ? e.dir : this.dir || "ltr"),
            e === document.documentElement)
          )
            Ps.add(this);
          else {
            let { localName: t } = e;
            t.search("-") > -1 && !customElements.get(t)
              ? customElements.whenDefined(t).then(() => {
                  e.startManagingContentDirection(this);
                })
              : e.startManagingContentDirection(this);
          }
          this._dirParent = e;
        }
        super.connectedCallback();
      }
      disconnectedCallback() {
        super.disconnectedCallback(),
          this._dirParent &&
            (this._dirParent === document.documentElement
              ? Ps.delete(this)
              : this._dirParent.stopManagingContentDirection(this),
            this.removeAttribute("dir"));
      }
    };
  })(Ss) {}
  Ls.VERSION = "1.3.0";
  let Bs = !0;
  try {
    document.body.querySelector(":focus-visible");
  } catch (e) {
    (Bs = !1), T("gfK8G");
  }
  let js = (e) => {
    var t, n;
    let r = Symbol("endPolyfillCoordination");
    class o extends ((n = e), (t = r), n) {
      constructor() {
        super(...arguments), (this[t] = null);
      }
      connectedCallback() {
        super.connectedCallback && super.connectedCallback(),
          Bs ||
            requestAnimationFrame(() => {
              null == this[r] &&
                (this[r] = ((e) => {
                  if (
                    null == e.shadowRoot ||
                    e.hasAttribute("data-js-focus-visible")
                  )
                    return () => {};
                  if (!self.applyFocusVisiblePolyfill) {
                    let t = () => {
                      self.applyFocusVisiblePolyfill &&
                        e.shadowRoot &&
                        self.applyFocusVisiblePolyfill(e.shadowRoot),
                        e.manageAutoFocus && e.manageAutoFocus();
                    };
                    return (
                      self.addEventListener("focus-visible-polyfill-ready", t, {
                        once: !0,
                      }),
                      () => {
                        self.removeEventListener(
                          "focus-visible-polyfill-ready",
                          t
                        );
                      }
                    );
                  }
                  return (
                    self.applyFocusVisiblePolyfill(e.shadowRoot),
                    e.manageAutoFocus && e.manageAutoFocus(),
                    () => {}
                  );
                })(this));
            });
      }
      disconnectedCallback() {
        super.disconnectedCallback && super.disconnectedCallback(),
          Bs ||
            requestAnimationFrame(() => {
              null != this[r] && (this[r](), (this[r] = null));
            });
      }
    }
    return o;
  };
  var Fs = Object.defineProperty,
    Us = Object.getOwnPropertyDescriptor,
    Zs = (e, t, n, r) => {
      for (
        var o, i = r > 1 ? void 0 : r ? Us(t, n) : t, s = e.length - 1;
        s >= 0;
        s--
      )
        (o = e[s]) && (i = (r ? o(t, n, i) : o(i)) || i);
      return r && i && Fs(t, n, i), i;
    };
  function qs() {
    return new Promise((e) => requestAnimationFrame(() => e()));
  }
  class Hs extends js(Ls) {
    constructor() {
      super(...arguments),
        (this.disabled = !1),
        (this.autofocus = !1),
        (this._tabIndex = 0),
        (this.manipulatingTabindex = !1),
        (this.autofocusReady = Promise.resolve());
    }
    get tabIndex() {
      if (this.focusElement === this) {
        let e = this.hasAttribute("tabindex")
          ? Number(this.getAttribute("tabindex"))
          : NaN;
        return isNaN(e) ? -1 : e;
      }
      let e = parseFloat(
        (this.hasAttribute("tabindex") && this.getAttribute("tabindex")) || "0"
      );
      return this.disabled || e < 0
        ? -1
        : this.focusElement
        ? this._tabIndex
        : e;
    }
    set tabIndex(e) {
      var t;
      if (this.manipulatingTabindex) this.manipulatingTabindex = !1;
      else if (this.focusElement !== this)
        if (
          (-1 === e
            ? this.addEventListener(
                "pointerdown",
                this.onPointerdownManagementOfTabIndex
              )
            : ((this.manipulatingTabindex = !0),
              this.removeEventListener(
                "pointerdown",
                this.onPointerdownManagementOfTabIndex
              )),
          -1 === e || this.disabled)
        ) {
          if (
            ((this.manipulatingTabindex = !0),
            this.setAttribute("tabindex", "-1"),
            this.removeAttribute("focusable"),
            this.selfManageFocusElement)
          )
            return;
          -1 !== e
            ? ((this._tabIndex = e), this.manageFocusElementTabindex(e))
            : null == (t = this.focusElement) || t.removeAttribute("tabindex");
        } else
          this.setAttribute("focusable", ""),
            this.hasAttribute("tabindex")
              ? this.removeAttribute("tabindex")
              : (this.manipulatingTabindex = !1),
            (this._tabIndex = e),
            this.manageFocusElementTabindex(e);
      else if (this.disabled) this._tabIndex = e;
      else if (e !== this._tabIndex) {
        this._tabIndex = e;
        let t = "" + e;
        (this.manipulatingTabindex = !0), this.setAttribute("tabindex", t);
      }
    }
    onPointerdownManagementOfTabIndex() {
      -1 === this.tabIndex &&
        setTimeout(() => {
          (this.tabIndex = 0),
            this.focus({ preventScroll: !0 }),
            (this.tabIndex = -1);
        });
    }
    async manageFocusElementTabindex(e) {
      this.focusElement || (await this.updateComplete),
        null === e
          ? this.focusElement.removeAttribute("tabindex")
          : this.focusElement !== this && (this.focusElement.tabIndex = e);
    }
    get focusElement() {
      throw Error("Must implement focusElement getter!");
    }
    get selfManageFocusElement() {
      return !1;
    }
    focus(e) {
      this.disabled ||
        !this.focusElement ||
        (this.focusElement !== this
          ? this.focusElement.focus(e)
          : HTMLElement.prototype.focus.apply(this, [e]));
    }
    blur() {
      let e = this.focusElement || this;
      e !== this ? e.blur() : HTMLElement.prototype.blur.apply(this);
    }
    click() {
      if (this.disabled) return;
      let e = this.focusElement || this;
      e !== this ? e.click() : HTMLElement.prototype.click.apply(this);
    }
    manageAutoFocus() {
      this.autofocus &&
        (this.dispatchEvent(new KeyboardEvent("keydown", { code: "Tab" })),
        this.focusElement.focus());
    }
    firstUpdated(e) {
      super.firstUpdated(e),
        (this.hasAttribute("tabindex") &&
          "-1" === this.getAttribute("tabindex")) ||
          this.setAttribute("focusable", "");
    }
    update(e) {
      e.has("disabled") &&
        this.handleDisabledChanged(this.disabled, e.get("disabled")),
        super.update(e);
    }
    updated(e) {
      super.updated(e), e.has("disabled") && this.disabled && this.blur();
    }
    async handleDisabledChanged(e, t) {
      let n = () =>
        this.focusElement !== this && void 0 !== this.focusElement.disabled;
      e
        ? ((this.manipulatingTabindex = !0),
          this.setAttribute("tabindex", "-1"),
          await this.updateComplete,
          n()
            ? (this.focusElement.disabled = !0)
            : this.setAttribute("aria-disabled", "true"))
        : t &&
          ((this.manipulatingTabindex = !0),
          this.focusElement === this
            ? this.setAttribute("tabindex", "" + this._tabIndex)
            : this.removeAttribute("tabindex"),
          await this.updateComplete,
          n()
            ? (this.focusElement.disabled = !1)
            : this.removeAttribute("aria-disabled"));
    }
    async getUpdateComplete() {
      let e = await super.getUpdateComplete();
      return await this.autofocusReady, e;
    }
    connectedCallback() {
      super.connectedCallback(),
        this.autofocus &&
          ((this.autofocusReady = new Promise(async (e) => {
            await qs(), await qs(), e();
          })),
          this.updateComplete.then(() => {
            this.manageAutoFocus();
          }));
    }
  }
  Zs([Ts({ type: Boolean, reflect: !0 })], Hs.prototype, "disabled", 2),
    Zs([Ts({ type: Boolean })], Hs.prototype, "autofocus", 2),
    Zs([Ts({ type: Number })], Hs.prototype, "tabIndex", 1);
  class Ks {
    constructor(e, { target: t, config: n, callback: r, skipInitial: o }) {
      (this.t = new Set()),
        (this.o = !1),
        (this.i = !1),
        (this.h = e),
        null !== t && this.t.add(t ?? e),
        (this.l = n),
        (this.o = o ?? this.o),
        (this.callback = r),
        window.MutationObserver
          ? ((this.u = new MutationObserver((e) => {
              this.handleChanges(e), this.h.requestUpdate();
            })),
            e.addController(this))
          : console.warn(
              "MutationController error: browser does not support MutationObserver."
            );
    }
    handleChanges(e) {
      this.value = this.callback?.(e, this.u);
    }
    hostConnected() {
      for (let e of this.t) this.observe(e);
    }
    hostDisconnected() {
      this.disconnect();
    }
    async hostUpdated() {
      let e = this.u.takeRecords();
      (e.length || (!this.o && this.i)) && this.handleChanges(e), (this.i = !1);
    }
    observe(e) {
      this.t.add(e),
        this.u.observe(e, this.l),
        (this.i = !0),
        this.h.requestUpdate();
    }
    disconnect() {
      this.u.disconnect();
    }
  }
  var Ws = Object.defineProperty,
    Js = Object.getOwnPropertyDescriptor,
    Gs = (e, t, n, r) => {
      for (
        var o, i = r > 1 ? void 0 : r ? Js(t, n) : t, s = e.length - 1;
        s >= 0;
        s--
      )
        (o = e[s]) && (i = (r ? o(t, n, i) : o(i)) || i);
      return r && i && Ws(t, n, i), i;
    };
  let Ys = Symbol("assignedNodes");
  let Xs = Si`
    :host{vertical-align:top;--spectrum-progress-circle-size:var(--spectrum-workflow-icon-size-100);--spectrum-icon-size:var(--spectrum-workflow-icon-size-100);display:inline-flex}:host([dir]){-webkit-appearance:none}:host([disabled]){pointer-events:none;cursor:auto}#button{position:absolute;inset:0}::slotted(sp-overlay),::slotted(sp-tooltip){position:absolute}:host:after{pointer-events:none}::slotted(*){pointer-events:none}slot[name=icon]::slotted(svg),slot[name=icon]::slotted(img){fill:currentColor;stroke:currentColor;block-size:var(--spectrum-icon-size,var(--spectrum-workflow-icon-size-100));inline-size:var(--spectrum-icon-size,var(--spectrum-workflow-icon-size-100))}[icon-only]+#label{display:contents}:host([size=xs]){--spectrum-progress-circle-size:var(--spectrum-workflow-icon-size-50);--spectrum-icon-size:var(--spectrum-workflow-icon-size-50)}:host([size=s]){--spectrum-progress-circle-size:var(--spectrum-workflow-icon-size-75);--spectrum-icon-size:var(--spectrum-workflow-icon-size-75)}:host([size=l]){--spectrum-progress-circle-size:var(--spectrum-workflow-icon-size-200);--spectrum-icon-size:var(--spectrum-workflow-icon-size-200)}:host([size=xl]){--spectrum-progress-circle-size:var(--spectrum-workflow-icon-size-300);--spectrum-icon-size:var(--spectrum-workflow-icon-size-300)}:host([size=xxl]){--spectrum-progress-circle-size:var(--spectrum-workflow-icon-size-400);--spectrum-icon-size:var(--spectrum-workflow-icon-size-400)}
`;
  var Qs = Object.defineProperty,
    ea = Object.getOwnPropertyDescriptor,
    ta = (e, t, n, r) => {
      for (
        var o, i = r > 1 ? void 0 : r ? ea(t, n) : t, s = e.length - 1;
        s >= 0;
        s--
      )
        (o = e[s]) && (i = (r ? o(t, n, i) : o(i)) || i);
      return r && i && Qs(t, n, i), i;
    };
  class na extends (function (e, t, n = []) {
    var r, o, i;
    let s = (e) => (t) => e.matches(t);
    class a extends ((o = e), (r = Ys), o) {
      constructor(...e) {
        super(e),
          (this.slotHasContent = !1),
          new Ks(this, {
            config: { characterData: !0, subtree: !0 },
            callback: (e) => {
              for (let t of e)
                if ("characterData" === t.type)
                  return void this.manageTextObservedSlot();
            },
          });
      }
      manageTextObservedSlot() {
        if (!this[Ys]) return;
        let e = [...this[Ys]].filter((e) =>
          e.tagName ? !n.some(s(e)) : !!e.textContent && e.textContent.trim()
        );
        this.slotHasContent = e.length > 0;
      }
      update(e) {
        if (!this.hasUpdated) {
          let { childNodes: e } = this,
            r = [...e].filter((e) =>
              e.tagName
                ? !n.some(s(e)) &&
                  (t ? e.getAttribute("slot") === t : !e.hasAttribute("slot"))
                : !!e.textContent && e.textContent.trim()
            );
          this.slotHasContent = r.length > 0;
        }
        super.update(e);
      }
      firstUpdated(e) {
        super.firstUpdated(e),
          this.updateComplete.then(() => {
            this.manageTextObservedSlot();
          });
      }
    }
    return (
      Gs(
        [Ts({ type: Boolean, attribute: !1 })],
        a.prototype,
        "slotHasContent",
        2
      ),
      Gs(
        [
          ((i = { slot: t, flatten: !0 }),
          (e, t) => {
            let { slot: n } = i ?? {},
              r = "slot" + (n ? `[name=${n}]` : ":not([name])");
            return Os(e, t, {
              get() {
                let e = this.renderRoot?.querySelector(r);
                return e?.assignedNodes(i) ?? [];
              },
            });
          }),
        ],
        a.prototype,
        r,
        2
      ),
      a
    );
  })(
    (function (e) {
      class t extends e {
        renderAnchor({
          id: e,
          className: t,
          ariaHidden: n,
          labelledby: r,
          tabindex: o,
          anchorContent: i = as`<slot></slot>`,
        }) {
          return as`<a
                    id=${e}
                    class=${Rs(t)}
                    href=${Rs(this.href)}
                    download=${Rs(this.download)}
                    target=${Rs(this.target)}
                    aria-label=${Rs(this.label)}
                    aria-labelledby=${Rs(r)}
                    aria-hidden=${Rs(n ? "true" : void 0)}
                    tabindex=${Rs(o)}
                    referrerpolicy=${Rs(this.referrerpolicy)}
                    rel=${Rs(this.rel)}
                >${i}</a>`;
        }
      }
      return (
        zs([Ts()], t.prototype, "download", 2),
        zs([Ts()], t.prototype, "label", 2),
        zs([Ts()], t.prototype, "href", 2),
        zs([Ts()], t.prototype, "target", 2),
        zs([Ts()], t.prototype, "referrerpolicy", 2),
        zs([Ts()], t.prototype, "rel", 2),
        t
      );
    })(Hs),
    "",
    ["sp-overlay,sp-tooltip"]
  ) {
    constructor() {
      super(),
        (this.active = !1),
        (this.type = "button"),
        (this.proxyFocus = this.proxyFocus.bind(this)),
        this.addEventListener("click", this.handleClickCapture, {
          capture: !0,
        });
    }
    static get styles() {
      return [Xs];
    }
    get focusElement() {
      return this;
    }
    get hasLabel() {
      return this.slotHasContent;
    }
    get buttonContent() {
      return [
        as`
                <slot name="icon" ?icon-only=${!this.hasLabel}></slot>
            `,
        as`
                <span id="label">
                    <slot @slotchange=${this.manageTextObservedSlot}></slot>
                </span>
            `,
      ];
    }
    handleClickCapture(e) {
      if (this.disabled)
        return (
          e.preventDefault(),
          e.stopImmediatePropagation(),
          e.stopPropagation(),
          !1
        );
      this.shouldProxyClick();
    }
    proxyFocus() {
      this.focus();
    }
    shouldProxyClick() {
      let e = !1;
      if (this.anchorElement) this.anchorElement.click(), (e = !0);
      else if ("button" !== this.type) {
        let t = document.createElement("button");
        (t.type = this.type),
          this.insertAdjacentElement("afterend", t),
          t.click(),
          t.remove(),
          (e = !0);
      }
      return e;
    }
    renderAnchor() {
      return as`
            ${this.buttonContent}
            ${super.renderAnchor({
              id: "button",
              ariaHidden: !0,
              className: "button anchor hidden",
            })}
        `;
    }
    renderButton() {
      return as`
            ${this.buttonContent}
        `;
    }
    render() {
      return this.href && this.href.length > 0
        ? this.renderAnchor()
        : this.renderButton();
    }
    handleKeydown(e) {
      let { code: t } = e;
      "Space" === t &&
        (e.preventDefault(),
        void 0 === this.href &&
          (this.addEventListener("keyup", this.handleKeyup),
          (this.active = !0)));
    }
    handleKeypress(e) {
      let { code: t } = e;
      switch (t) {
        case "Enter":
        case "NumpadEnter":
          this.click();
      }
    }
    handleKeyup(e) {
      let { code: t } = e;
      "Space" === t &&
        (this.removeEventListener("keyup", this.handleKeyup),
        (this.active = !1),
        this.click());
    }
    manageAnchor() {
      this.href && this.href.length > 0
        ? (this.hasAttribute("role") &&
            "button" !== this.getAttribute("role")) ||
          this.setAttribute("role", "link")
        : (this.hasAttribute("role") && "link" !== this.getAttribute("role")) ||
          this.setAttribute("role", "button");
    }
    firstUpdated(e) {
      super.firstUpdated(e),
        this.hasAttribute("tabindex") || this.setAttribute("tabindex", "0"),
        e.has("label") &&
          (this.label
            ? this.setAttribute("aria-label", this.label)
            : this.removeAttribute("aria-label")),
        this.manageAnchor(),
        this.addEventListener("keydown", this.handleKeydown),
        this.addEventListener("keypress", this.handleKeypress);
    }
    updated(e) {
      super.updated(e),
        e.has("href") && this.manageAnchor(),
        this.anchorElement &&
          (this.anchorElement.addEventListener("focus", this.proxyFocus),
          (this.anchorElement.tabIndex = -1));
    }
    update(e) {
      super.update(e),
        e.has("label") &&
          (this.label
            ? this.setAttribute("aria-label", this.label)
            : this.removeAttribute("aria-label"));
    }
  }
  ta([Ts({ type: Boolean, reflect: !0 })], na.prototype, "active", 2),
    ta([Ts({ type: String })], na.prototype, "type", 2),
    ta([Ns(".anchor")], na.prototype, "anchorElement", 2);
  let ra = Si`
    :host{cursor:pointer;-webkit-user-select:none;user-select:none;box-sizing:border-box;font-family:var(--mod-button-font-family,var(--mod-sans-font-family-stack,var(--spectrum-sans-font-family-stack)));-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;line-height:var(--mod-button-line-height,var(--mod-line-height-100,var(--spectrum-line-height-100)));text-transform:none;vertical-align:top;-webkit-appearance:button;transition:background var(--mod-button-animation-duration,var(--mod-animation-duration-100,var(--spectrum-animation-duration-100)))ease-out,border-color var(--mod-button-animation-duration,var(--mod-animation-duration-100,var(--spectrum-animation-duration-100)))ease-out,color var(--mod-button-animation-duration,var(--mod-animation-duration-100,var(--spectrum-animation-duration-100)))ease-out,box-shadow var(--mod-button-animation-duration,var(--mod-animation-duration-100,var(--spectrum-animation-duration-100)))ease-out;border-style:solid;justify-content:center;align-items:center;margin:0;-webkit-text-decoration:none;text-decoration:none;display:inline-flex;overflow:visible}:host(:focus){outline:none}:host([disabled]),:host([disabled]){cursor:default}::slotted([slot=icon]){max-block-size:100%;flex-shrink:0}#label{text-align:center;place-self:center}#label:empty{display:none}@media (forced-colors:active){:host{--highcontrast-actionbutton-focus-indicator-color:ButtonText;--highcontrast-actionbutton-content-color:ButtonText}:host:after{forced-color-adjust:none}:host([selected]){--highcontrast-actionbutton-background-color:Highlight;--highcontrast-actionbutton-border-color:HighlightText;--highcontrast-actionbutton-content-color:HighlightText}:host([selected]) .hold-affordance,:host([selected]) ::slotted([slot=icon]),:host([selected]) #label{forced-color-adjust:none}:host([disabled]),:host([disabled]){--highcontrast-actionbutton-content-color:GrayText;--highcontrast-actionbutton-border-color:GrayText;--highcontrast-actionbutton-background-color:ButtonFace}}:host{--spectrum-actionbutton-background-color:var(--highcontrast-actionbutton-background-color,var(--mod-actionbutton-background-color-default,var(--spectrum-actionbutton-background-color-default)));--spectrum-actionbutton-border-color:var(--highcontrast-actionbutton-border-color,var(--mod-actionbutton-border-color-default,var(--spectrum-actionbutton-border-color-default)));--spectrum-actionbutton-content-color:var(--highcontrast-actionbutton-content-color,var(--mod-actionbutton-content-color-default,var(--spectrum-neutral-content-color-default)));--spectrum-actionbutton-border-radius:var(--mod-actionbutton-border-radius,var(--spectrum-actionbutton-border-radius));--spectrum-actionbutton-border-width:var(--mod-actionbutton-border-width,var(--spectrum-border-width-100));--spectrum-actionbutton-focus-indicator-gap:var(--mod-actionbutton-focus-indicator-gap,var(--spectrum-focus-indicator-gap));--spectrum-actionbutton-focus-indicator-thickness:var(--mod-actionbutton-focus-indicator-thickness,var(--spectrum-focus-indicator-thickness));--spectrum-actionbutton-focus-indicator-color:var(--highcontrast-actionbutton-focus-indicator-color,var(--mod-actionbutton-focus-indicator-color,var(--spectrum-focus-indicator-color)))}:host:dir(rtl),:host([dir=rtl]){--spectrum-logical-rotation:matrix(-1,0,0,1,0,0)}:host([quiet]){--spectrum-actionbutton-border-color:transparent}:host([emphasized]:not([static-color=black],[static-color=white])){--mod-actionbutton-background-color-default-selected:var(--mod-actionbutton-background-color-default-selected-emphasized,var(--spectrum-accent-background-color-default));--mod-actionbutton-background-color-hover-selected:var(--mod-actionbutton-background-color-hover-selected-emphasized,var(--spectrum-accent-background-color-hover));--mod-actionbutton-background-color-down-selected:var(--mod-actionbutton-background-color-down-selected-emphasized,var(--spectrum-accent-background-color-down));--mod-actionbutton-background-color-focus-selected:var(--mod-actionbutton-background-color-focus-selected-emphasized,var(--spectrum-accent-background-color-key-focus));--mod-actionbutton-content-color-default-selected:var(--mod-actionbutton-content-color-default-selected-emphasized,var(--spectrum-white));--mod-actionbutton-content-color-hover-selected:var(--mod-actionbutton-content-color-hover-selected-emphasized,var(--spectrum-white));--mod-actionbutton-content-color-down-selected:var(--mod-actionbutton-content-color-down-selected-emphasized,var(--spectrum-white));--mod-actionbutton-content-color-focus-selected:var(--mod-actionbutton-content-color-focus-selected-emphasized,var(--spectrum-white))}:host([static-color=black]){--mod-actionbutton-background-color-default-selected:var(--spectrum-transparent-black-800);--mod-actionbutton-background-color-hover-selected:var(--spectrum-transparent-black-900);--mod-actionbutton-background-color-down-selected:var(--spectrum-transparent-black-900);--mod-actionbutton-background-color-focus-selected:var(--spectrum-transparent-black-900);--mod-actionbutton-content-color-default:var(--spectrum-black);--mod-actionbutton-content-color-hover:var(--spectrum-black);--mod-actionbutton-content-color-down:var(--spectrum-black);--mod-actionbutton-content-color-focus:var(--spectrum-black);--mod-actionbutton-content-color-disabled:var(--spectrum-disabled-static-black-content-color);--mod-actionbutton-content-color-default-selected:var(--mod-actionbutton-static-content-color,var(--spectrum-white));--mod-actionbutton-content-color-hover-selected:var(--mod-actionbutton-static-content-color,var(--spectrum-white));--mod-actionbutton-content-color-down-selected:var(--mod-actionbutton-static-content-color,var(--spectrum-white));--mod-actionbutton-content-color-focus-selected:var(--mod-actionbutton-static-content-color,var(--spectrum-white));--mod-actionbutton-focus-indicator-color:var(--spectrum-static-black-focus-indicator-color)}:host([static-color=white]){--mod-actionbutton-background-color-default-selected:var(--spectrum-transparent-white-800);--mod-actionbutton-background-color-hover-selected:var(--spectrum-transparent-white-900);--mod-actionbutton-background-color-down-selected:var(--spectrum-transparent-white-900);--mod-actionbutton-background-color-focus-selected:var(--spectrum-transparent-white-900);--mod-actionbutton-content-color-default:var(--spectrum-white);--mod-actionbutton-content-color-hover:var(--spectrum-white);--mod-actionbutton-content-color-down:var(--spectrum-white);--mod-actionbutton-content-color-focus:var(--spectrum-white);--mod-actionbutton-content-color-disabled:var(--spectrum-disabled-static-white-content-color);--mod-actionbutton-content-color-default-selected:var(--mod-actionbutton-static-content-color,var(--spectrum-black));--mod-actionbutton-content-color-hover-selected:var(--mod-actionbutton-static-content-color,var(--spectrum-black));--mod-actionbutton-content-color-down-selected:var(--mod-actionbutton-static-content-color,var(--spectrum-black));--mod-actionbutton-content-color-focus-selected:var(--mod-actionbutton-static-content-color,var(--spectrum-black));--mod-actionbutton-focus-indicator-color:var(--spectrum-static-white-focus-indicator-color)}:host([selected]){--mod-actionbutton-background-color-default:var(--mod-actionbutton-background-color-default-selected,var(--spectrum-actionbutton-background-color-selected));--mod-actionbutton-background-color-hover:var(--mod-actionbutton-background-color-hover-selected,var(--spectrum-actionbutton-background-color-selected-hover));--mod-actionbutton-background-color-down:var(--mod-actionbutton-background-color-down-selected,var(--spectrum-actionbutton-background-color-selected-down));--mod-actionbutton-background-color-focus:var(--mod-actionbutton-background-color-focus-selected,var(--spectrum-actionbutton-background-color-selected-focus));--mod-actionbutton-background-color-disabled:var(--spectrum-actionbutton-background-color-selected-disabled);--mod-actionbutton-border-color-default:transparent;--mod-actionbutton-border-color-hover:transparent;--mod-actionbutton-border-color-down:transparent;--mod-actionbutton-border-color-focus:transparent;--mod-actionbutton-border-color-disabled:transparent;--mod-actionbutton-content-color-default:var(--mod-actionbutton-content-color-default-selected,var(--spectrum-actionbutton-content-color-selected));--mod-actionbutton-content-color-hover:var(--mod-actionbutton-content-color-hover-selected,var(--spectrum-actionbutton-content-color-selected));--mod-actionbutton-content-color-down:var(--mod-actionbutton-content-color-down-selected,var(--spectrum-actionbutton-content-color-selected));--mod-actionbutton-content-color-focus:var(--mod-actionbutton-content-color-focus-selected,var(--spectrum-actionbutton-content-color-selected))}@media (hover:hover){:host(:hover){--mod-actionbutton-background-color-default:var(--mod-actionbutton-background-color-hover,var(--spectrum-actionbutton-background-color-hover));--mod-actionbutton-border-color-default:var(--mod-actionbutton-border-color-hover,var(--spectrum-actionbutton-border-color-hover));--mod-actionbutton-content-color-default:var(--mod-actionbutton-content-color-hover,var(--spectrum-neutral-content-color-hover))}}:host(:focus-visible){--mod-actionbutton-background-color-default:var(--mod-actionbutton-background-color-focus,var(--spectrum-actionbutton-background-color-focus));--mod-actionbutton-border-color-default:var(--mod-actionbutton-border-color-focus,var(--spectrum-actionbutton-border-color-focus));--mod-actionbutton-content-color-default:var(--mod-actionbutton-content-color-focus,var(--spectrum-neutral-content-color-key-focus))}:host(:is(:active,[active])){--mod-actionbutton-background-color-default:var(--mod-actionbutton-background-color-down,var(--spectrum-actionbutton-background-color-down));--mod-actionbutton-border-color-default:var(--mod-actionbutton-border-color-down,var(--spectrum-actionbutton-border-color-down));--mod-actionbutton-content-color-default:var(--mod-actionbutton-content-color-down,var(--spectrum-neutral-content-color-down))}:host([disabled]),:host([disabled]){--mod-actionbutton-background-color-default:var(--mod-actionbutton-background-color-disabled,var(--spectrum-actionbutton-background-color-disabled));--mod-actionbutton-border-color-default:var(--mod-actionbutton-border-color-disabled,var(--spectrum-actionbutton-border-color-disabled));--mod-actionbutton-content-color-default:var(--mod-actionbutton-content-color-disabled,var(--spectrum-disabled-content-color))}:host,:host{--spectrum-actionbutton-sized-height:var(--spectrum-component-height-100);--spectrum-actionbutton-sized-icon-size:var(--spectrum-workflow-icon-size-100);--spectrum-actionbutton-sized-font-size:var(--spectrum-font-size-100);--spectrum-actionbutton-sized-text-to-visual:var(--spectrum-text-to-visual-100);--spectrum-actionbutton-sized-edge-to-hold-icon:var(--spectrum-action-button-edge-to-hold-icon-medium);--spectrum-actionbutton-sized-edge-to-visual:var(--spectrum-component-edge-to-visual-100);--spectrum-actionbutton-sized-edge-to-text:var(--spectrum-component-edge-to-text-100);--spectrum-actionbutton-sized-edge-to-visual-only:var(--spectrum-component-edge-to-visual-only-100)}:host([size=xs]){--spectrum-actionbutton-sized-height:var(--spectrum-component-height-50);--spectrum-actionbutton-sized-icon-size:var(--spectrum-workflow-icon-size-50);--spectrum-actionbutton-sized-font-size:var(--spectrum-font-size-50);--spectrum-actionbutton-sized-text-to-visual:var(--spectrum-text-to-visual-50);--spectrum-actionbutton-sized-edge-to-hold-icon:var(--spectrum-action-button-edge-to-hold-icon-extra-small);--spectrum-actionbutton-sized-edge-to-visual:var(--spectrum-component-edge-to-visual-50);--spectrum-actionbutton-sized-edge-to-text:var(--spectrum-component-edge-to-text-50);--spectrum-actionbutton-sized-edge-to-visual-only:var(--spectrum-component-edge-to-visual-only-50)}:host([size=s]){--spectrum-actionbutton-sized-height:var(--spectrum-component-height-75);--spectrum-actionbutton-sized-icon-size:var(--spectrum-workflow-icon-size-75);--spectrum-actionbutton-sized-font-size:var(--spectrum-font-size-75);--spectrum-actionbutton-sized-text-to-visual:var(--spectrum-text-to-visual-75);--spectrum-actionbutton-sized-edge-to-hold-icon:var(--spectrum-action-button-edge-to-hold-icon-small);--spectrum-actionbutton-sized-edge-to-visual:var(--spectrum-component-edge-to-visual-75);--spectrum-actionbutton-sized-edge-to-text:var(--spectrum-component-edge-to-text-75);--spectrum-actionbutton-sized-edge-to-visual-only:var(--spectrum-component-edge-to-visual-only-75)}:host([size=l]){--spectrum-actionbutton-sized-height:var(--spectrum-component-height-200);--spectrum-actionbutton-sized-icon-size:var(--spectrum-workflow-icon-size-200);--spectrum-actionbutton-sized-font-size:var(--spectrum-font-size-200);--spectrum-actionbutton-sized-text-to-visual:var(--spectrum-text-to-visual-200);--spectrum-actionbutton-sized-edge-to-hold-icon:var(--spectrum-action-button-edge-to-hold-icon-large);--spectrum-actionbutton-sized-edge-to-visual:var(--spectrum-component-edge-to-visual-200);--spectrum-actionbutton-sized-edge-to-text:var(--spectrum-component-edge-to-text-200);--spectrum-actionbutton-sized-edge-to-visual-only:var(--spectrum-component-edge-to-visual-only-200)}:host([size=xl]){--spectrum-actionbutton-sized-height:var(--spectrum-component-height-300);--spectrum-actionbutton-sized-icon-size:var(--spectrum-workflow-icon-size-300);--spectrum-actionbutton-sized-font-size:var(--spectrum-font-size-300);--spectrum-actionbutton-sized-text-to-visual:var(--spectrum-text-to-visual-300);--spectrum-actionbutton-sized-edge-to-hold-icon:var(--spectrum-action-button-edge-to-hold-icon-extra-large);--spectrum-actionbutton-sized-edge-to-visual:var(--spectrum-component-edge-to-visual-300);--spectrum-actionbutton-sized-edge-to-text:var(--spectrum-component-edge-to-text-300);--spectrum-actionbutton-sized-edge-to-visual-only:var(--spectrum-component-edge-to-visual-only-300)}:host{--spectrum-actionbutton-height:var(--mod-actionbutton-height,var(--spectrum-actionbutton-sized-height));--spectrum-actionbutton-icon-size:var(--mod-actionbutton-icon-size,var(--spectrum-actionbutton-sized-icon-size));--spectrum-actionbutton-font-size:var(--mod-actionbutton-font-size,var(--spectrum-actionbutton-sized-font-size));--spectrum-actionbutton-text-to-visual:var(--mod-actionbutton-text-to-visual,var(--spectrum-actionbutton-sized-text-to-visual));--spectrum-actionbutton-edge-to-hold-icon:var(--mod-actionbutton-edge-to-hold-icon,var(--spectrum-actionbutton-sized-edge-to-hold-icon));--spectrum-actionbutton-edge-to-visual:var(--mod-actionbutton-edge-to-visual,calc(var(--spectrum-actionbutton-sized-edge-to-visual) - var(--spectrum-actionbutton-border-width)));--spectrum-actionbutton-edge-to-text:var(--mod-actionbutton-edge-to-text,calc(var(--spectrum-actionbutton-sized-edge-to-text) - var(--spectrum-actionbutton-border-width)));--spectrum-actionbutton-edge-to-visual-only:var(--mod-actionbutton-edge-to-visual-only,calc(var(--spectrum-actionbutton-sized-edge-to-visual-only) - var(--spectrum-actionbutton-border-width)));min-inline-size:var(--mod-actionbutton-min-width,calc(var(--mod-actionbutton-edge-to-visual-only,var(--spectrum-actionbutton-sized-edge-to-visual-only))*2 + var(--spectrum-actionbutton-icon-size)));block-size:var(--spectrum-actionbutton-height);border-radius:var(--spectrum-actionbutton-border-radius);border-width:var(--spectrum-actionbutton-border-width);gap:calc(var(--spectrum-actionbutton-text-to-visual) + var(--spectrum-actionbutton-edge-to-text) - var(--spectrum-actionbutton-edge-to-visual-only));padding-inline:var(--spectrum-actionbutton-edge-to-text);background-color:var(--spectrum-actionbutton-background-color);border-color:var(--spectrum-actionbutton-border-color);color:var(--spectrum-actionbutton-content-color);transition:border-color var(--mod-actionbutton-animation-duration,var(--spectrum-animation-duration-100))ease-in-out;position:relative}:host:after{margin:calc(( var(--spectrum-actionbutton-focus-indicator-gap) + var(--spectrum-actionbutton-border-width))*-1);border-radius:var(--mod-actionbutton-focus-indicator-border-radius,calc(var(--spectrum-actionbutton-border-radius) + var(--spectrum-actionbutton-focus-indicator-gap)));transition:box-shadow var(--mod-actionbutton-animation-duration,var(--spectrum-animation-duration-100))ease-in-out;pointer-events:none;content:"";position:absolute;inset:0}:host(:focus-visible){box-shadow:none;outline:none}:host(:focus-visible):after{box-shadow:0 0 0 var(--spectrum-actionbutton-focus-indicator-thickness)var(--spectrum-actionbutton-focus-indicator-color)}::slotted([slot=icon]){inline-size:var(--spectrum-actionbutton-icon-size);block-size:var(--spectrum-actionbutton-icon-size);color:inherit;margin-inline-start:calc(var(--spectrum-actionbutton-edge-to-visual) - var(--spectrum-actionbutton-edge-to-text));margin-inline-end:calc(var(--spectrum-actionbutton-edge-to-visual-only) - var(--spectrum-actionbutton-edge-to-text))}.hold-affordance+::slotted([slot=icon]),[icon-only]::slotted([slot=icon]){margin-inline-start:calc(var(--spectrum-actionbutton-edge-to-visual-only) - var(--spectrum-actionbutton-edge-to-text))}#label{pointer-events:none;line-height:var(--spectrum-actionbutton-height);font-size:var(--spectrum-actionbutton-font-size);white-space:nowrap;color:inherit;color:var(--mod-actionbutton-label-color,inherit);text-overflow:ellipsis;overflow:hidden}.hold-affordance{color:inherit;transform:var(--spectrum-logical-rotation,);position:absolute;inset-block-end:calc(var(--spectrum-actionbutton-edge-to-hold-icon) - var(--spectrum-actionbutton-border-width));inset-inline-end:calc(var(--spectrum-actionbutton-edge-to-hold-icon) - var(--spectrum-actionbutton-border-width))}:host{--spectrum-actionbutton-background-color-default:var(--system-action-button-background-color-default);--spectrum-actionbutton-background-color-hover:var(--system-action-button-background-color-hover);--spectrum-actionbutton-background-color-down:var(--system-action-button-background-color-down);--spectrum-actionbutton-background-color-focus:var(--system-action-button-background-color-focus);--spectrum-actionbutton-background-color-disabled:var(--system-action-button-background-color-disabled);--spectrum-actionbutton-background-color-selected:var(--system-action-button-background-color-selected);--spectrum-actionbutton-background-color-selected-hover:var(--system-action-button-background-color-selected-hover);--spectrum-actionbutton-background-color-selected-down:var(--system-action-button-background-color-selected-down);--spectrum-actionbutton-background-color-selected-focus:var(--system-action-button-background-color-selected-focus);--spectrum-actionbutton-border-color-default:var(--system-action-button-border-color-default);--spectrum-actionbutton-border-color-hover:var(--system-action-button-border-color-hover);--spectrum-actionbutton-border-color-down:var(--system-action-button-border-color-down);--spectrum-actionbutton-border-color-focus:var(--system-action-button-border-color-focus);--spectrum-actionbutton-border-color-disabled:var(--system-action-button-border-color-disabled);--spectrum-actionbutton-content-color-selected:var(--system-action-button-content-color-selected);--spectrum-actionbutton-background-color-selected-disabled:var(--system-action-button-background-color-selected-disabled)}:host{--spectrum-actionbutton-border-radius:var(--system-action-button-size-m-border-radius)}:host([size=xs]){--spectrum-actionbutton-border-radius:var(--system-action-button-size-xs-border-radius)}:host([size=s]){--spectrum-actionbutton-border-radius:var(--system-action-button-size-s-border-radius)}:host([size=l]){--spectrum-actionbutton-border-radius:var(--system-action-button-size-l-border-radius)}:host([size=xl]){--spectrum-actionbutton-border-radius:var(--system-action-button-size-xl-border-radius)}:host([quiet]){--spectrum-actionbutton-background-color-default:var(--system-action-button-quiet-background-color-default);--spectrum-actionbutton-background-color-hover:var(--system-action-button-quiet-background-color-hover);--spectrum-actionbutton-background-color-down:var(--system-action-button-quiet-background-color-down);--spectrum-actionbutton-background-color-focus:var(--system-action-button-quiet-background-color-focus);--spectrum-actionbutton-background-color-disabled:var(--system-action-button-quiet-background-color-disabled);--spectrum-actionbutton-background-color-selected-disabled:var(--system-action-button-quiet-background-color-selected-disabled)}:host([static-color=black]){--spectrum-actionbutton-border-color-default:var(--system-action-button-static-black-border-color-default);--spectrum-actionbutton-border-color-hover:var(--system-action-button-static-black-border-color-hover);--spectrum-actionbutton-border-color-down:var(--system-action-button-static-black-border-color-down);--spectrum-actionbutton-border-color-focus:var(--system-action-button-static-black-border-color-focus);--spectrum-actionbutton-border-color-disabled:var(--system-action-button-static-black-border-color-disabled);--spectrum-actionbutton-background-color-disabled:var(--system-action-button-static-black-background-color-disabled);--spectrum-actionbutton-background-color-selected-disabled:var(--system-action-button-static-black-background-color-selected-disabled);--spectrum-actionbutton-background-color-default:var(--system-action-button-static-black-background-color-default);--spectrum-actionbutton-background-color-hover:var(--system-action-button-static-black-background-color-hover);--spectrum-actionbutton-background-color-down:var(--system-action-button-static-black-background-color-down);--spectrum-actionbutton-background-color-focus:var(--system-action-button-static-black-background-color-focus)}:host([static-color=black][quiet]){--spectrum-actionbutton-background-color-default:var(--system-action-button-static-black-quiet-background-color-default);--spectrum-actionbutton-background-color-hover:var(--system-action-button-static-black-quiet-background-color-hover);--spectrum-actionbutton-background-color-down:var(--system-action-button-static-black-quiet-background-color-down);--spectrum-actionbutton-background-color-focus:var(--system-action-button-static-black-quiet-background-color-focus);--spectrum-actionbutton-background-color-disabled:var(--system-action-button-static-black-quiet-background-color-disabled)}:host([static-color=white]){--spectrum-actionbutton-border-color-default:var(--system-action-button-static-white-border-color-default);--spectrum-actionbutton-border-color-hover:var(--system-action-button-static-white-border-color-hover);--spectrum-actionbutton-border-color-down:var(--system-action-button-static-white-border-color-down);--spectrum-actionbutton-border-color-focus:var(--system-action-button-static-white-border-color-focus);--spectrum-actionbutton-border-color-disabled:var(--system-action-button-static-white-border-color-disabled);--spectrum-actionbutton-background-color-disabled:var(--system-action-button-static-white-background-color-disabled);--spectrum-actionbutton-background-color-selected-disabled:var(--system-action-button-static-white-background-color-selected-disabled);--spectrum-actionbutton-background-color-default:var(--system-action-button-static-white-background-color-default);--spectrum-actionbutton-background-color-hover:var(--system-action-button-static-white-background-color-hover);--spectrum-actionbutton-background-color-down:var(--system-action-button-static-white-background-color-down);--spectrum-actionbutton-background-color-focus:var(--system-action-button-static-white-background-color-focus)}:host([static-color=white][quiet]){--spectrum-actionbutton-background-color-default:var(--system-action-button-static-white-quiet-background-color-default);--spectrum-actionbutton-background-color-hover:var(--system-action-button-static-white-quiet-background-color-hover);--spectrum-actionbutton-background-color-down:var(--system-action-button-static-white-quiet-background-color-down);--spectrum-actionbutton-background-color-focus:var(--system-action-button-static-white-quiet-background-color-focus);--spectrum-actionbutton-background-color-disabled:var(--system-action-button-static-white-quiet-background-color-disabled)}::slotted([slot=icon]){flex-shrink:0}#label{flex-grow:var(--spectrum-actionbutton-label-flex-grow);text-align:var(--spectrum-actionbutton-label-text-align);pointer-events:none!important}:host([size=xs]){min-width:var(--spectrum-actionbutton-height,0);--spectrum-actionbutton-edge-to-visual-only:calc(var(--spectrum-component-edge-to-visual-only-50) - var(--spectrum-actionbutton-border-width))}:host([size=s]){--spectrum-actionbutton-edge-to-visual-only:calc(var(--spectrum-component-edge-to-visual-only-75) - var(--spectrum-actionbutton-border-width))}:host([size=m]){--spectrum-actionbutton-edge-to-visual-only:calc(var(--spectrum-component-edge-to-visual-only-100) - var(--spectrum-actionbutton-border-width))}:host([size=l]){--spectrum-actionbutton-edge-to-visual-only:calc(var(--spectrum-component-edge-to-visual-only-200) - var(--spectrum-actionbutton-border-width))}:host([size=xl]){--spectrum-actionbutton-edge-to-visual-only:calc(var(--spectrum-component-edge-to-visual-only-300) - var(--spectrum-actionbutton-border-width))}@media (forced-colors:active){:host{--highcontrast-actionbutton-border-color-disabled:GrayText;--highcontrast-actionbutton-content-color-disabled:GrayText}}
`,
    oa = Si`
    .spectrum-UIIcon-CornerTriangle75{--spectrum-icon-size:var(--spectrum-corner-triangle-icon-size-75)}.spectrum-UIIcon-CornerTriangle100{--spectrum-icon-size:var(--spectrum-corner-triangle-icon-size-100)}.spectrum-UIIcon-CornerTriangle200{--spectrum-icon-size:var(--spectrum-corner-triangle-icon-size-200)}.spectrum-UIIcon-CornerTriangle300{--spectrum-icon-size:var(--spectrum-corner-triangle-icon-size-300)}
`,
    ia = Symbol("system resolver updated");
  class sa {
    constructor(e) {
      (this.system = "spectrum"),
        (this.host = e),
        this.host.addController(this);
    }
    hostConnected() {
      this.resolveSystem();
    }
    hostDisconnected() {
      var e;
      null == (e = this.unsubscribe) || e.call(this);
    }
    resolveSystem() {
      let e = new CustomEvent("sp-system-context", {
        bubbles: !0,
        composed: !0,
        detail: {
          callback: (e, t) => {
            let n = this.system;
            (this.system = e),
              (this.unsubscribe = t),
              this.host.requestUpdate(ia, n);
          },
        },
        cancelable: !0,
      });
      this.host.dispatchEvent(e);
    }
  }
  let aa = Si`
    :host{--spectrum-icon-inline-size:var(--mod-icon-inline-size,var(--mod-icon-size,var(--spectrum-icon-size)));--spectrum-icon-block-size:var(--mod-icon-block-size,var(--mod-icon-size,var(--spectrum-icon-size)));inline-size:var(--spectrum-icon-inline-size);block-size:var(--spectrum-icon-block-size);color:inherit;color:var(--mod-icon-color,inherit);fill:currentColor;pointer-events:none;display:inline-block}@media (forced-colors:active){:host{forced-color-adjust:auto}}:host{--spectrum-icon-size:var(--spectrum-workflow-icon-size-100)}:host([size=xxs]){--spectrum-icon-size:var(--spectrum-workflow-icon-size-xxs)}:host([size=xs]){--spectrum-icon-size:var(--spectrum-workflow-icon-size-50)}:host([size=s]){--spectrum-icon-size:var(--spectrum-workflow-icon-size-75)}:host([size=l]){--spectrum-icon-size:var(--spectrum-workflow-icon-size-200)}:host([size=xl]){--spectrum-icon-size:var(--spectrum-workflow-icon-size-300)}:host([size=xxl]){--spectrum-icon-size:var(--spectrum-workflow-icon-size-xxl)}#container{height:100%}img,svg,::slotted(*){height:100%;width:100%;vertical-align:top;color:inherit}@media (forced-colors:active){img,svg,::slotted(*){forced-color-adjust:auto}}:host(:not(:root)){overflow:hidden}
`;
  var la = Object.defineProperty,
    ca = Object.getOwnPropertyDescriptor,
    da = (e, t, n, r) => {
      for (
        var o, i = r > 1 ? void 0 : r ? ca(t, n) : t, s = e.length - 1;
        s >= 0;
        s--
      )
        (o = e[s]) && (i = (r ? o(t, n, i) : o(i)) || i);
      return r && i && la(t, n, i), i;
    };
  class ua extends Ls {
    constructor() {
      super(...arguments),
        (this.unsubscribeSystemContext = null),
        (this.spectrumVersion = 1),
        (this.label = ""),
        (this.systemResolver = new sa(this));
    }
    static get styles() {
      return [aa];
    }
    connectedCallback() {
      super.connectedCallback();
    }
    disconnectedCallback() {
      super.disconnectedCallback(),
        this.unsubscribeSystemContext &&
          (this.unsubscribeSystemContext(),
          (this.unsubscribeSystemContext = null));
    }
    update(e) {
      e.has("label") &&
        (this.label
          ? this.removeAttribute("aria-hidden")
          : this.setAttribute("aria-hidden", "true")),
        e.has(ia) &&
          (this.spectrumVersion =
            "spectrum-two" === this.systemResolver.system ? 2 : 1),
        super.update(e);
    }
    render() {
      return as`
            <slot></slot>
        `;
    }
  }
  da([Ts({ state: !0, attribute: !1 })], ua.prototype, "spectrumVersion", 2),
    da([Ts({ reflect: !0 })], ua.prototype, "label", 2),
    da([Ts({ reflect: !0 })], ua.prototype, "size", 2);
  let ha = function (e, ...n) {
    return t ? t(e, ...n) : n.reduce((t, n, r) => t + n + e[r + 1], e[0]);
  };
  function pa(e, t) {
    window.__swc, customElements.define(e, t);
  }
  pa(
    "sp-icon-corner-triangle300",
    class extends ua {
      render() {
        return (
          ((e) => {
            t = e;
          })(as),
          this.spectrumVersion,
          (({
            width: e = 24,
            height: t = 24,
            hidden: n = !1,
            title: r = "Corner Triangle300",
          } = {}) => ha`<svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 7 7"
    aria-hidden=${n ? "true" : "false"}
    role="img"
    fill="currentColor"
    aria-label="${r}"
    width="${e}"
    height="${t}"
  >
    <path
      d="M6.683.67a.32.32 0 0 0-.223.093l-5.7 5.7a.316.316 0 0 0 .224.54h5.7A.316.316 0 0 0 7 6.687V.986A.316.316 0 0 0 6.684.67z"
    />
  </svg>`)({ hidden: !this.label, title: this.label })
        );
      }
    }
  );
  var fa = Object.defineProperty,
    ma = Object.getOwnPropertyDescriptor,
    ga = (e, t, n, r) => {
      for (
        var o, i = r > 1 ? void 0 : r ? ma(t, n) : t, s = e.length - 1;
        s >= 0;
        s--
      )
        (o = e[s]) && (i = (r ? o(t, n, i) : o(i)) || i);
      return r && i && fa(t, n, i), i;
    };
  let va = {
    xs: "spectrum-UIIcon-CornerTriangle75",
    s: "spectrum-UIIcon-CornerTriangle75",
    m: "spectrum-UIIcon-CornerTriangle100",
    l: "spectrum-UIIcon-CornerTriangle200",
    xl: "spectrum-UIIcon-CornerTriangle300",
  };
  class ya extends Ds(na, {
    validSizes: ["xs", "s", "m", "l", "xl"],
    noDefaultSize: !0,
  }) {
    constructor() {
      super(),
        (this.emphasized = !1),
        (this.holdAffordance = !1),
        (this.quiet = !1),
        (this.role = "button"),
        (this.selected = !1),
        (this.toggles = !1),
        (this._value = ""),
        (this.onClick = () => {
          this.toggles &&
            ((this.selected = !this.selected),
            this.dispatchEvent(
              new Event("change", { cancelable: !0, bubbles: !0, composed: !0 })
            ) || (this.selected = !this.selected));
        }),
        this.addEventListener("click", this.onClick);
    }
    static get styles() {
      return [...super.styles, ra, oa];
    }
    get value() {
      return this._value || this.itemText;
    }
    set value(e) {
      e !== this._value &&
        ((this._value = e || ""),
        this._value
          ? this.setAttribute("value", this._value)
          : this.removeAttribute("value"));
    }
    get itemText() {
      return (this.textContent || "").trim();
    }
    handlePointerdownHoldAffordance(e) {
      0 === e.button &&
        (this.addEventListener("pointerup", this.handlePointerupHoldAffordance),
        this.addEventListener(
          "pointercancel",
          this.handlePointerupHoldAffordance
        ),
        (n = setTimeout(() => {
          this.dispatchEvent(
            new CustomEvent("longpress", {
              bubbles: !0,
              composed: !0,
              detail: { source: "pointer" },
            })
          );
        }, 300)));
    }
    handlePointerupHoldAffordance() {
      clearTimeout(n),
        this.removeEventListener(
          "pointerup",
          this.handlePointerupHoldAffordance
        ),
        this.removeEventListener(
          "pointercancel",
          this.handlePointerupHoldAffordance
        );
    }
    handleKeydown(e) {
      if (!this.holdAffordance) return super.handleKeydown(e);
      let { code: t, altKey: n } = e;
      ("Space" === t || (n && "ArrowDown" === t)) &&
        (e.preventDefault(),
        "ArrowDown" === t &&
          (e.stopPropagation(), e.stopImmediatePropagation()),
        this.addEventListener("keyup", this.handleKeyup),
        (this.active = !0));
    }
    handleKeyup(e) {
      if (!this.holdAffordance) return super.handleKeyup(e);
      let { code: t, altKey: n } = e;
      ("Space" === t || (n && "ArrowDown" === t)) &&
        (e.stopPropagation(),
        this.dispatchEvent(
          new CustomEvent("longpress", {
            bubbles: !0,
            composed: !0,
            detail: { source: "keyboard" },
          })
        ),
        (this.active = !1));
    }
    get buttonContent() {
      let e = super.buttonContent;
      return (
        this.holdAffordance &&
          e.unshift(as`
                <sp-icon-corner-triangle300
                    class="hold-affordance ${va[this.size]}"
                ></sp-icon-corner-triangle300>
            `),
        e
      );
    }
    updated(e) {
      super.updated(e);
      let t = "button" === this.role,
        n =
          t &&
          (this.selected || this.toggles) &&
          !(
            this.hasAttribute("aria-haspopup") &&
            this.hasAttribute("aria-expanded")
          );
      (e.has("selected") || e.has("role")) &&
        (n
          ? this.setAttribute("aria-pressed", this.selected ? "true" : "false")
          : (this.removeAttribute("aria-pressed"),
            t &&
              this.toggles &&
              this.hasAttribute("aria-expanded") &&
              this.setAttribute(
                "aria-expanded",
                this.selected ? "true" : "false"
              ))),
        e.has("holdAffordance") &&
          (this.holdAffordance
            ? this.addEventListener(
                "pointerdown",
                this.handlePointerdownHoldAffordance
              )
            : (this.removeEventListener(
                "pointerdown",
                this.handlePointerdownHoldAffordance
              ),
              this.handlePointerupHoldAffordance()));
    }
  }
  ga([Ts({ type: Boolean, reflect: !0 })], ya.prototype, "emphasized", 2),
    ga(
      [Ts({ type: Boolean, reflect: !0, attribute: "hold-affordance" })],
      ya.prototype,
      "holdAffordance",
      2
    ),
    ga([Ts({ type: Boolean, reflect: !0 })], ya.prototype, "quiet", 2),
    ga([Ts({ reflect: !0 })], ya.prototype, "role", 2),
    ga([Ts({ type: Boolean, reflect: !0 })], ya.prototype, "selected", 2),
    ga([Ts({ type: Boolean, reflect: !0 })], ya.prototype, "toggles", 2),
    ga(
      [Ts({ reflect: !0, attribute: "static-color" })],
      ya.prototype,
      "staticColor",
      2
    ),
    ga([Ts({ type: String })], ya.prototype, "value", 1),
    pa("sp-action-button", ya);
  let ba = Si`
    :host{gap:var(--mod-buttongroup-spacing-horizontal,var(--spectrum-buttongroup-spacing-horizontal));justify-content:normal;justify-content:var(--mod-buttongroup-justify-content,normal);flex-wrap:wrap;display:flex}::slotted(*){flex-shrink:0}:host([vertical]){gap:var(--mod-buttongroup-spacing-vertical,var(--spectrum-buttongroup-spacing-vertical));flex-direction:column;display:inline-flex}:host{--spectrum-buttongroup-spacing-horizontal:var(--system-button-group-spacing-horizontal);--spectrum-buttongroup-spacing-vertical:var(--system-button-group-spacing-vertical)}:host([size=s]){--spectrum-buttongroup-spacing-horizontal:var(--system-button-group-size-s-spacing-horizontal);--spectrum-buttongroup-spacing-vertical:var(--system-button-group-size-s-spacing-vertical)}:host{--spectrum-buttongroup-spacing-horizontal:var(--system-button-group-size-m-spacing-horizontal);--spectrum-buttongroup-spacing-vertical:var(--system-button-group-size-m-spacing-vertical)}:host([size=l]){--spectrum-buttongroup-spacing-horizontal:var(--system-button-group-size-l-spacing-horizontal);--spectrum-buttongroup-spacing-vertical:var(--system-button-group-size-l-spacing-vertical)}:host([size=xl]){--spectrum-buttongroup-spacing-horizontal:var(--system-button-group-size-xl-spacing-horizontal);--spectrum-buttongroup-spacing-vertical:var(--system-button-group-size-xl-spacing-vertical)}:host([vertical]) ::slotted(sp-action-button){--spectrum-actionbutton-label-flex-grow:1}:host([dir=ltr][vertical]) ::slotted(sp-action-button){--spectrum-actionbutton-label-text-align:left}:host([dir=rtl][vertical]) ::slotted(sp-action-button){--spectrum-actionbutton-label-text-align:right}
`;
  var wa = Object.defineProperty,
    ka = Object.getOwnPropertyDescriptor,
    xa = (e, t, n, r) => {
      for (
        var o, i = r > 1 ? void 0 : r ? ka(t, n) : t, s = e.length - 1;
        s >= 0;
        s--
      )
        (o = e[s]) && (i = (r ? o(t, n, i) : o(i)) || i);
      return r && i && wa(t, n, i), i;
    };
  class Sa extends Ds(Ls, { noDefaultSize: !0 }) {
    constructor() {
      super(...arguments), (this.vertical = !1);
    }
    static get styles() {
      return [ba];
    }
    updated(e) {
      super.updated(e),
        e.has("size") && this.manageChildrenSize(this.slotElement);
    }
    handleSlotchange({ target: e }) {
      this.manageChildrenSize(e);
    }
    manageChildrenSize(e) {
      e.assignedElements().forEach((e) => {
        e.size = this.size;
      });
    }
    render() {
      return as`
            <slot @slotchange=${this.handleSlotchange}></slot>
        `;
    }
  }
  xa([Ts({ type: Boolean, reflect: !0 })], Sa.prototype, "vertical", 2),
    xa([Ns("slot")], Sa.prototype, "slotElement", 2),
    pa("sp-button-group", Sa);
  let Ea = "ProseMirror-toolbar",
    _a = "ProseMirror-editor";
  class Ca {
    constructor(e, { toolbar: t }, { menu: n }) {
      (this.editorView = e),
        (this.height = 50),
        (this.menu = n),
        (this.dom = this.createToolbar(t)),
        document.body.appendChild(this.dom);
    }
    createButton(e) {
      if (!e.icon)
        return void console.error("Icon unavailable for menu item ", e.name);
      let t = document.createElement("sp-action-button");
      return (
        t.setAttribute("quiet", ""),
        t.setAttribute("label", e.label),
        (t.onclick = (t) => {
          t.preventDefault(),
            this.editorView.focus(),
            e.command(
              this.editorView.state,
              this.editorView.dispatch,
              this.editorView
            );
        }),
        (t.innerHTML = e.icon),
        (e.dom = t),
        e.isActive(this.editorView.state, e.name) &&
          t.setAttribute("selected", ""),
        t
      );
    }
    createGroups(e) {
      let t;
      return (
        null == e ||
          e.forEach((e) => {
            var n;
            let r = null == (n = this.menu) ? void 0 : n[e];
            if (r) {
              t || (t = document.createElement("sp-button-group"));
              let e = this.createButton(r);
              e && t.appendChild(e);
            }
          }),
        t
      );
    }
    createOption(e) {
      let t = document.createElement("option");
      return (t.value = e.name), (t.textContent = e.label), (e.dom = t), t;
    }
    createDropdown(e) {
      let t;
      return (
        e.forEach((e) => {
          var n;
          let r = null == (n = this.menu) ? void 0 : n[e];
          if (r) {
            t || (t = document.createElement("select"));
            let n = this.createOption(r);
            n &&
              (r.isActive(this.editorView.state, e) &&
                n.setAttribute("selected", ""),
              t.appendChild(n));
          }
        }),
        t &&
          (t.onchange = (e) => {
            var t;
            e.preventDefault();
            let n = e.target,
              r = null == (t = this.menu) ? void 0 : t[n.value];
            r &&
              (r.command(
                this.editorView.state,
                this.editorView.dispatch,
                this.editorView
              ),
              requestAnimationFrame(() => {
                n.blur(), this.editorView.focus();
              }));
          }),
        t
      );
    }
    createToolbar(e) {
      let t = document.createElement("div"),
        { sections: n, dropdowns: r, ...o } = e;
      (t.role = "toolbar"), (t.id = Ea);
      let i = this.editorView.dom.getBoundingClientRect();
      return (
        (t.style.top = i.top - this.height + "px"),
        (t.style.left = `${i.left}px`),
        null == n ||
          n.forEach((e) => {
            let n,
              i = o[e];
            i &&
              (n = (null == r ? void 0 : r.includes(e))
                ? this.createDropdown(i)
                : this.createGroups(i)) &&
              t.appendChild(n);
          }),
        t
      );
    }
    update() {
      this.menu &&
        (Object.values(this.menu).forEach(({ dom: e, name: t }) => {
          e &&
            t &&
            (this.menu[t].isActive(this.editorView.state, t)
              ? e.setAttribute("selected", "")
              : e.removeAttribute("selected"));
        }),
        this.editorView.editable || this.destroy());
    }
    destroy() {
      this.dom.remove();
    }
  }
  let Ta = (e, t) => new Co({ view: (n) => new Ca(n, e, t) });
  var Oa = {},
    Na = {};
  o(Na, "bold", () => Va);
  let Aa = {
    bold: '<svg height="18" slot="icon" viewBox="0 0 36 36" width="18"><path d="M1 4a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1V8h8v20H9a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1h-3V8h8v3a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1Z"/></svg>',
    italic:
      '<svg height="18" slot="icon" viewBox="0 0 36 36" width="18"><path d="M8 4a1.6 1.6 0 0 0-1.4 1l-2.1 6a.7.7 0 0 0 .6 1h2a1.6 1.6 0 0 0 1.4-1l1-3h8l-7 20h-3A1.6 1.6 0 0 0 6 29l-.7 2a.7.7 0 0 0 .7 1h10a1.6 1.6 0 0 0 1.3-1l.7-2a.7.7 0 0 0-.6-1h-3l7-20h8l-1 3a.7.7 0 0 0 .6 1h2a1.6 1.6 0 0 0 1.4-1l2-6a.7.7 0 0 0-.6-1Z"/></svg>',
    underline:
      '<svg height="18" slot="icon" viewBox="0 0 36 36" width="18"><rect height="2" rx=".5" ry=".5" width="28" x="4" y="32"/><path d="M5 4a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1V8h8v18h-3a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1h-3V8h8v3a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1Z"/></svg>',
    strikethrough:
      '<svg height="18" slot="icon" viewBox="0 0 36 36" width="18"><path d="M23 28h-3v-6h-4v6h-3a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1Zm8-24H5a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1V8h8v8h4V8h8v3a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1Z"/><rect height="2" rx=".5" ry=".5" width="28" x="4" y="18"/></svg>',
    subscript:
      '<svg height="18" slot="icon" viewBox="0 0 48 48" width="18"><path d="M38 6H8a2 2 0 0 0-2 2v7a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-5h10v28h-3a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1h-3V10h10v5a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1V8a2 2 0 0 0-2-2Zm2.3 38.8c-.2 0-.2 0-.2-.2v-10a6.1 6.1 0 0 1-2.6 1c-.2 0-.3 0-.3-.2V33c0-.2 0-.2.2-.2a8.5 8.5 0 0 0 3.7-1.8 1 1 0 0 1 .5-.1h2.2l.2.1v13.6c0 .2 0 .2-.2.2Z"/></svg>',
    superscript:
      '<svg height="18" slot="icon" viewBox="0 0 48 48" width="18"><path d="M34 6H4a2 2 0 0 0-2 2v7a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-5h10v28h-3a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1h-3V10h10v5a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1V8a2 2 0 0 0-2-2Zm8.3 10c-.2 0-.2 0-.2-.2v-10a6.1 6.1 0 0 1-2.6 1c-.2 0-.3 0-.3-.2V4.1l.2-.1A8.5 8.5 0 0 0 43.1 2a1 1 0 0 1 .5 0h2.2l.2.1v13.6c0 .2 0 .2-.2.2Z"/></svg>',
    bullet_list:
      '<svg height="18" slot="icon" viewBox="0 0 48 48" width="18"><rect height="4" rx="1" ry="1" width="28" x="16" y="8"/><rect height="4" rx="1" ry="1" width="28" x="16" y="24"/><rect height="4" rx="1" ry="1" width="28" x="16" y="40"/><circle cx="8" cy="8" r="4"/><circle cx="8" cy="24" r="4"/><circle cx="8" cy="40" r="4"/></svg>',
    ordered_list:
      '<svg height="18" slot="icon" viewBox="0 0 48 48" width="18"><path d="M6.2 38.9c-.1 0-.2 0-.2-.2V37c0-.1 0-.2.2-.2H7c1.3 0 2-.4 2-1.2 0-.8-.7-1.4-2-1.4a5.7 5.7 0 0 0-2.8.7c0 .1-.1 0-.1 0v-2a6.8 6.8 0 0 1 3.3-.8c2.4 0 4 1.2 4 3.2a2.6 2.6 0 0 1-1.7 2.4 3 3 0 0 1 2.2 2.8c0 2.4-2.2 3.6-4.7 3.6a6.6 6.6 0 0 1-3.2-.6v-2.2s0-.1.1 0a6.3 6.3 0 0 0 3 .7c1.6 0 2.3-.7 2.3-1.5 0-1-.7-1.6-2.2-1.6Zm.6-36.5a15.5 15.5 0 0 1-2 .5l-.1-.1V1a11.6 11.6 0 0 0 2.4-1 .7.7 0 0 1 .3 0H9l.1.1v9.7h1.6c.2 0 .2 0 .2.2v1.8l-.1.2H5c-.2 0-.2 0-.2-.2V10a.2.2 0 0 1 .2-.2h1.7ZM3.8 28l-.1-.2v-1.3a.3.3 0 0 1 0-.2 44 44 0 0 0 3.4-3c1.5-1.4 2-2.3 2-3.3 0-1.1-.8-1.8-2.2-1.8A6.5 6.5 0 0 0 4 19l-.2-.1V17A.2.2 0 0 1 4 17a6.8 6.8 0 0 1 3.6-.9c2.6 0 3.9 1.6 4 3.6a5.3 5.3 0 0 1-1.9 4A27.9 27.9 0 0 1 7.3 26h4.9l.1.1-.5 1.9a.2.2 0 0 1-.2.1Z"/><rect height="4" rx="1" ry="1" width="26" x="18" y="8"/><rect height="4" rx="1" ry="1" width="26" x="18" y="24"/><rect height="4" rx="1" ry="1" width="26" x="18" y="40"/></svg>',
    code: '<svg height="18" slot="icon" viewBox="0 0 48 48" width="18"><path d="M6.2 38.9c-.1 0-.2 0-.2-.2V37c0-.1 0-.2.2-.2H7c1.3 0 2-.4 2-1.2 0-.8-.7-1.4-2-1.4a5.7 5.7 0 0 0-2.8.7c0 .1-.1 0-.1 0v-2a6.8 6.8 0 0 1 3.3-.8c2.4 0 4 1.2 4 3.2a2.6 2.6 0 0 1-1.7 2.4 3 3 0 0 1 2.2 2.8c0 2.4-2.2 3.6-4.7 3.6a6.6 6.6 0 0 1-3.2-.6v-2.2s0-.1.1 0a6.3 6.3 0 0 0 3 .7c1.6 0 2.3-.7 2.3-1.5 0-1-.7-1.6-2.2-1.6Zm.6-36.5a15.5 15.5 0 0 1-2 .5l-.1-.1V1a11.6 11.6 0 0 0 2.4-1 .7.7 0 0 1 .3 0H9l.1.1v9.7h1.6c.2 0 .2 0 .2.2v1.8l-.1.2H5c-.2 0-.2 0-.2-.2V10a.2.2 0 0 1 .2-.2h1.7ZM3.8 28l-.1-.2v-1.3a.3.3 0 0 1 0-.2 44 44 0 0 0 3.4-3c1.5-1.4 2-2.3 2-3.3 0-1.1-.8-1.8-2.2-1.8A6.5 6.5 0 0 0 4 19l-.2-.1V17A.2.2 0 0 1 4 17a6.8 6.8 0 0 1 3.6-.9c2.6 0 3.9 1.6 4 3.6a5.3 5.3 0 0 1-1.9 4A27.9 27.9 0 0 1 7.3 26h4.9l.1.1-.5 1.9a.2.2 0 0 1-.2.1Z"/><rect height="4" rx="1" ry="1" width="26" x="18" y="8"/><rect height="4" rx="1" ry="1" width="26" x="18" y="24"/><rect height="4" rx="1" ry="1" width="26" x="18" y="40"/></svg>',
    removeformat:
      '<svg height="18" slot="icon" viewBox="0 0 48 48" width="18"><path d="M20 38V10h10v5a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1V8a2 2 0 0 0-2-2H2a2 2 0 0 0-2 2v7a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-5h10v28h-3a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h10a8.3 8.3 0 0 1-1-4Z"/><path d="M36 24.1A11.9 11.9 0 1 0 47.9 36 11.9 11.9 0 0 0 36 24.1ZM45 36a8.9 8.9 0 0 1-1.7 5.2L30.8 28.7A8.9 8.9 0 0 1 45 36Zm-18 0a8.9 8.9 0 0 1 1.7-5.2l12.5 12.5A8.9 8.9 0 0 1 27 36Z"/></svg>',
  };
  function Ma(e, t = {}) {
    let { exclude: n = [], custom: r = {} } = t,
      o = {};
    return (
      Array.from(e.attributes).forEach((e) => {
        n.includes(e.name) || (o[e.name] = e.value);
      }),
      { ...o, ...r }
    );
  }
  let Da = {
      id: { default: null },
      class: { default: null },
      style: { default: null },
    },
    Ra = {
      paragraph: {
        group: "block",
        content: "inline*",
        attrs: Da,
        toDOM: (e) => ["p", { ...e.attrs }, 0],
        parseDOM: [{ tag: "p", getAttrs: Ma }],
      },
      heading: {
        attrs: { ...Da, level: { default: 1 } },
        content: "inline*",
        group: "block",
        defining: !0,
        parseDOM: [
          { tag: "h1", getAttrs: (e) => Ma(e, { custom: { level: 1 } }) },
          { tag: "h2", getAttrs: (e) => Ma(e, { custom: { level: 2 } }) },
          { tag: "h3", getAttrs: (e) => Ma(e, { custom: { level: 3 } }) },
          { tag: "h4", getAttrs: (e) => Ma(e, { custom: { level: 4 } }) },
          { tag: "h5", getAttrs: (e) => Ma(e, { custom: { level: 5 } }) },
          { tag: "h6", getAttrs: (e) => Ma(e, { custom: { level: 6 } }) },
        ],
        toDOM: (e) => [`h${e.attrs.level}`, { ...e.attrs }, 0],
      },
      code: {
        attrs: Da,
        content: "text*",
        group: "block",
        code: !0,
        defining: !0,
        parseDOM: [{ tag: "pre", preserveWhitespace: "full", getAttrs: Ma }],
        toDOM: (e) => ["pre", { ...e.attrs }, ["code", 0]],
      },
      ordered_list: {
        group: "block",
        content: "list_item+",
        attrs: { ...Da, order: { default: 1, validate: "number" } },
        parseDOM: [
          {
            tag: "ol",
            getAttrs: (e) =>
              Ma(e, { custom: { order: e.getAttribute("start") || 1 } }),
          },
        ],
        toDOM: (e) => ["ol", { ...e.attrs, start: e.attrs.order }, 0],
      },
      bullet_list: {
        group: "block",
        content: "list_item+",
        attrs: Da,
        toDOM: (e) => ["ul", { ...e.attrs }, 0],
        parseDOM: [{ tag: "ul", getAttrs: Ma }],
      },
      list_item: {
        content: "block+",
        attrs: Da,
        defining: !0,
        toDOM: (e) => ["li", { ...e.attrs }, 0],
        parseDOM: [{ tag: "li", getAttrs: Ma }],
      },
      text: { group: "inline", inline: !0 },
      doc: { content: "block+" },
    },
    $a = (e, t) => {
      let { from: n, $from: r, to: o, empty: i } = e.selection,
        s = e.schema.marks[t];
      return (
        !!s &&
        (i
          ? !!s.isInSet(e.storedMarks || r.marks())
          : e.doc.rangeHasMark(n, o, s))
      );
    },
    Ia = (e, t) => {
      let { $from: n, to: r } = e.selection,
        o = e.selection.$anchor.node();
      return o
        ? o.hasMarkup(e.schema.nodes[t])
        : r <= n.end() && n.parent.hasMarkup(e.schema.nodes[t]);
    },
    za = (e, t) => {
      let { $from: n } = e.selection;
      return n.parent.type.name === t;
    };
  class Pa {
    constructor(e) {
      (this.shortcuts = {}),
        (this.name = e),
        (this.mark = {}),
        (this.menu = {
          name: e,
          label: e,
          icon: Aa[e],
          isActive: za,
          command: () => !1,
        });
    }
    addMenuConfig(e) {
      this.menu = { ...this.menu, ...e };
    }
    addShortcut(e, t) {
      Object.assign(this.shortcuts, { [e]: null != t ? t : this.menu.command });
    }
    setMark(e, t, n) {
      (this.mark = {
        [this.name]: { parseDOM: e, toDOM: (e) => [t, { ...e.attrs }, 0] },
      }),
        (this.menu = {
          ...this.menu,
          isActive: $a,
          command: (e, ...t) =>
            (function (e, t = null, n) {
              let r = !(n && n.includeWhitespace);
              return function (n, o) {
                let { empty: i, $cursor: s, ranges: a } = n.selection;
                if (
                  (i && !s) ||
                  !(function (e, t, n) {
                    for (let r = 0; r < t.length; r++) {
                      let { $from: o, $to: i } = t[r],
                        s =
                          0 == o.depth &&
                          e.inlineContent &&
                          e.type.allowsMarkType(n);
                      if (
                        (e.nodesBetween(o.pos, i.pos, (e, t) => {
                          if (s) return !1;
                          s = e.inlineContent && e.type.allowsMarkType(n);
                        }),
                        s)
                      )
                        return !0;
                    }
                    return !1;
                  })(n.doc, a, e)
                )
                  return !1;
                if (o)
                  if (s)
                    o(
                      e.isInSet(n.storedMarks || s.marks())
                        ? n.tr.removeStoredMark(e)
                        : n.tr.addStoredMark(e.create(t))
                    );
                  else {
                    let i,
                      s = n.tr;
                    i = !a.some((t) =>
                      n.doc.rangeHasMark(t.$from.pos, t.$to.pos, e)
                    );
                    for (let n = 0; n < a.length; n++) {
                      let { $from: o, $to: l } = a[n];
                      if (i) {
                        let n = o.pos,
                          i = l.pos,
                          a = o.nodeAfter,
                          c = l.nodeBefore,
                          d =
                            r && a && a.isText
                              ? /^\s*/.exec(a.text)[0].length
                              : 0,
                          u =
                            r && c && c.isText
                              ? /\s*$/.exec(c.text)[0].length
                              : 0;
                        n + d < i && ((n += d), (i -= u)),
                          s.addMark(n, i, e.create(t));
                      } else s.removeMark(o.pos, l.pos, e);
                    }
                    o(s.scrollIntoView());
                  }
                return !0;
              };
            })(e.schema.marks[this.name])(e, ...t),
        }),
        n && this.addShortcut(n, this.menu.command);
    }
    getDetails() {
      return { mark: this.mark, shortcuts: this.shortcuts, menu: this.menu };
    }
  }
  let Va = (e, t = "bold") => {
    var n, r;
    let o =
        (null ==
        (r = null == (n = null == e ? void 0 : e.actions) ? void 0 : n[t])
          ? void 0
          : r.tag) || "strong",
      i = new Pa(t),
      s = [
        { tag: "strong" },
        { tag: "b", getAttrs: (e) => "normal" !== e.style.fontWeight && null },
        { style: "font-weight=400", clearMark: (e) => e.type.name === o },
        {
          style: "font-weight",
          getAttrs: (e) => /^(bold(er)?|[5-9]\d{2,})$/.test(e) && null,
        },
      ];
    return i.setMark(s, o, "Mod-b"), i.getDetails();
  };
  var La = {};
  o(La, "italic", () => Ba);
  let Ba = (e, t = "italic") => {
    var n;
    let { tag: r } = (null == (n = null == e ? void 0 : e.actions)
        ? void 0
        : n[t]) || { tag: "em" },
      o = new Pa(t),
      i = [
        { tag: "i" },
        { tag: "em" },
        { style: "font-style=italic" },
        { style: "font-style=normal", clearMark: (e) => e.type.name == r },
      ];
    return o.setMark(i, r, "Mod-i"), o.getDetails();
  };
  var ja = {};
  o(ja, "underline", () => Fa);
  let Fa = (e, t = "underline") => {
    var n, r;
    let o =
        null !=
        (r =
          null == (n = null == e ? void 0 : e.actions)
            ? void 0
            : n.underline.tag)
          ? r
          : "u",
      i = new Pa(t),
      s = [
        { tag: "u" },
        {
          style: "text-decoration",
          consuming: !1,
          getAttrs: (e) => !!e.includes(t) && {},
        },
      ];
    return i.setMark(s, o, "Mod-u"), i.getDetails();
  };
  var Ua = {};
  o(Ua, "strikethrough", () => Za);
  let Za = (e, t = "strikethrough") => {
    var n, r;
    let o =
        (null ==
        (r = null == (n = null == e ? void 0 : e.actions) ? void 0 : n[t])
          ? void 0
          : r.tag) || "del",
      i = new Pa(t);
    return (
      i.setMark(
        [
          { tag: "s" },
          { tag: "del" },
          { tag: "strike" },
          {
            style: "text-decoration",
            consuming: !1,
            getAttrs: (e) => !!e.includes("line-through") && {},
          },
        ],
        o,
        "Mod-Shift-s"
      ),
      i.getDetails()
    );
  };
  var qa = {};
  o(qa, "subscript", () => Ha);
  let Ha = (e, t = "subscript") => {
    var n, r;
    let o =
        (null ==
        (r = null == (n = null == e ? void 0 : e.actions) ? void 0 : n[t])
          ? void 0
          : r.tag) || "sub",
      i = new Pa(t);
    return (
      i.setMark(
        [
          { tag: "sub" },
          { style: "vertical-align", getAttrs: (e) => "sub" === e && null },
        ],
        o
      ),
      i.getDetails()
    );
  };
  var Ka = {};
  o(Ka, "superscript", () => Wa);
  let Wa = (e, t = "superscript") => {
    var n, r;
    let o =
        (null ==
        (r = null == (n = null == e ? void 0 : e.actions) ? void 0 : n[t])
          ? void 0
          : r.tag) || "sup",
      i = new Pa(t);
    return (
      i.setMark(
        [
          { tag: "sup" },
          { style: "vertical-align", getAttrs: (e) => "super" === e && null },
        ],
        o
      ),
      i.getDetails()
    );
  };
  var Ja = {};
  o(Ja, "bullet_list", () => el), o(Ja, "ordered_list", () => tl);
  function Ga(e, t = null) {
    return function (n, r) {
      let { $from: o, $to: i } = n.selection,
        s = o.blockRange(i);
      if (!s) return !1;
      let a = r ? n.tr : null;
      return (
        !!(function (e, t, n, r = null) {
          let o = !1,
            i = t,
            s = t.$from.doc;
          if (
            t.depth >= 2 &&
            t.$from.node(t.depth - 1).type.compatibleContent(n) &&
            0 == t.startIndex
          ) {
            if (0 == t.$from.index(t.depth - 1)) return !1;
            let e = s.resolve(t.start - 2);
            (i = new Wn(e, e, t.depth)),
              t.endIndex < t.parent.childCount &&
                (t = new Wn(t.$from, s.resolve(t.$to.end(t.depth)), t.depth)),
              (o = !0);
          }
          let a = (function (e, t, n = null, r = e) {
            let o = (function (e, t) {
                let { parent: n, startIndex: r, endIndex: o } = e,
                  i = n.contentMatchAt(r).findWrapping(t);
                if (!i) return null;
                let s = i.length ? i[0] : t;
                return n.canReplaceWith(r, o, s) ? i : null;
              })(e, t),
              i =
                o &&
                (function (e, t) {
                  let { parent: n, startIndex: r, endIndex: o } = e,
                    i = n.child(r),
                    s = t.contentMatch.findWrapping(i.type);
                  if (!s) return null;
                  let a = (s.length ? s[s.length - 1] : t).contentMatch;
                  for (let e = r; a && e < o; e++)
                    a = a.matchType(n.child(e).type);
                  return a && a.validEnd ? s : null;
                })(r, t);
            return i
              ? o.map(Ur).concat({ type: t, attrs: n }).concat(i.map(Ur))
              : null;
          })(i, n, r, t);
          return (
            !!a &&
            (e &&
              (function (e, t, n, r, o) {
                let i = Mn.empty;
                for (let e = n.length - 1; e >= 0; e--)
                  i = Mn.from(n[e].type.create(n[e].attrs, i));
                e.step(
                  new Lr(
                    t.start - 2 * !!r,
                    t.end,
                    t.start,
                    t.end,
                    new Pn(i, 0, 0),
                    n.length,
                    !0
                  )
                );
                let s = 0;
                for (let e = 0; e < n.length; e++)
                  n[e].type == o && (s = e + 1);
                let a = n.length - s,
                  l = t.start + n.length - 2 * !!r,
                  c = t.parent;
                for (
                  let n = t.startIndex, r = t.endIndex, o = !0;
                  n < r;
                  n++, o = !1
                )
                  !o && Hr(e.doc, l, a) && (e.split(l, a), (l += 2 * a)),
                    (l += c.child(n).nodeSize);
              })(e, t, a, o, n),
            !0)
          );
        })(a, s, e, t) && (r && r(a.scrollIntoView()), !0)
      );
    };
  }
  function Ya(e) {
    return function (t, n) {
      let { $from: r, $to: o } = t.selection,
        i = r.blockRange(o, (t) => t.childCount > 0 && t.firstChild.type == e);
      return (
        !!i &&
        (!n ||
          (r.node(i.depth - 1).type == e
            ? (function (e, t, n, r) {
                let o = e.tr,
                  i = r.end,
                  s = r.$to.end(r.depth);
                i < s &&
                  (o.step(
                    new Lr(
                      i - 1,
                      s,
                      i,
                      s,
                      new Pn(Mn.from(n.create(null, r.parent.copy())), 1, 0),
                      1,
                      !0
                    )
                  ),
                  (r = new Wn(
                    o.doc.resolve(r.$from.pos),
                    o.doc.resolve(s),
                    r.depth
                  )));
                let a = Fr(r);
                if (null == a) return !1;
                o.lift(r, a);
                let l = o.doc.resolve(o.mapping.map(i, -1) - 1);
                return (
                  Kr(o.doc, l.pos) &&
                    l.nodeBefore.type == l.nodeAfter.type &&
                    o.join(l.pos),
                  t(o.scrollIntoView()),
                  !0
                );
              })(t, n, e, i)
            : (function (e, t, n) {
                let r = e.tr,
                  o = n.parent;
                for (
                  let e = n.end, t = n.endIndex - 1, i = n.startIndex;
                  t > i;
                  t--
                )
                  (e -= o.child(t).nodeSize), r.delete(e - 1, e + 1);
                let i = r.doc.resolve(n.start),
                  s = i.nodeAfter;
                if (r.mapping.map(n.end) != n.start + i.nodeAfter.nodeSize)
                  return !1;
                let a = 0 == n.startIndex,
                  l = n.endIndex == o.childCount,
                  c = i.node(-1),
                  d = i.index(-1);
                if (
                  !c.canReplace(
                    d + +!a,
                    d + 1,
                    s.content.append(l ? Mn.empty : Mn.from(o))
                  )
                )
                  return !1;
                let u = i.pos,
                  h = u + s.nodeSize;
                return (
                  r.step(
                    new Lr(
                      u - !!a,
                      h + +!!l,
                      u + 1,
                      h - 1,
                      new Pn(
                        (a ? Mn.empty : Mn.from(o.copy(Mn.empty))).append(
                          l ? Mn.empty : Mn.from(o.copy(Mn.empty))
                        ),
                        +!a,
                        +!l
                      ),
                      +!a
                    )
                  ),
                  t(r.scrollIntoView()),
                  !0
                );
              })(t, n, i)))
      );
    };
  }
  let Xa = (e, t) => {
      let { $from: n } = e.selection;
      for (let r = n.depth; r > 0; r--)
        if (n.node(r).type === e.schema.nodes[t]) return !0;
      return !1;
    },
    Qa = (e, t, n, r, o) => {
      let i = n.schema.nodes;
      return Xa(n, e)
        ? Ya(i.list_item)(n, r)
        : Xa(n, t)
        ? !!Ya(i.list_item)(n, r) && (Ga(i[e])(o.state, r), !0)
        : Ga(i[e])(n, r);
    },
    el = (e, t) => {
      let n = new Pa(t);
      return (
        n.addMenuConfig({
          label: "Bullet List",
          command: (...e) => Qa(t, "ordered_list", ...e),
          isActive: (e) => Xa(e, t),
          shortcut: "Mod-Shift-7",
        }),
        n.getDetails()
      );
    },
    tl = (e, t) => {
      let n = new Pa(t);
      return (
        n.addMenuConfig({
          label: "Ordered List",
          command: (...e) => Qa(t, "bullet_list", ...e),
          isActive: (e) => Xa(e, t),
          shortcut: "Mod-Shift-8",
        }),
        n.getDetails()
      );
    };
  var nl = {};
  o(nl, "removeformat", () => ol);
  let rl = (e, t) => {
      let { selection: n, schema: r } = e,
        { $from: o, $to: i } = n,
        s = e.tr;
      return (
        s.removeMark(o.pos, i.pos),
        e.doc.nodesBetween(o.pos, i.pos, (e, t) => {
          e.isBlock &&
            e.type !== r.nodes.paragraph &&
            s.setNodeMarkup(t, r.nodes.paragraph);
        }),
        !!t && (t(s), !0)
      );
    },
    ol = (e, t = "removeformat") => {
      let n = new Pa(t);
      return (
        n.addMenuConfig({
          label: "Remove All Formatting",
          command: rl,
          isActive: () => !1,
        }),
        n.getDetails()
      );
    };
  var il = {};
  o(il, "code", () => al);
  let sl = (e, ...t) =>
      Ia(e, "code")
        ? Lo(e.schema.nodes.paragraph)(e, ...t)
        : Lo(e.schema.nodes.code)(e, ...t),
    al = (e, t = "code") => {
      let n = new Pa(t);
      return (
        n.addMenuConfig({
          label: "Preformatted",
          command: sl,
          isActive: (e) => Ia(e, t),
        }),
        n.getDetails()
      );
    };
  var ll = {};
  o(ll, "paragraph", () => ul);
  let cl = (e, ...t) => Lo(e.schema.nodes.paragraph)(e, ...t);
  function dl(e) {
    let { $from: t } = e.selection;
    return t.parent.type === e.schema.nodes.paragraph;
  }
  let ul = (e, t = "paragraph") => {
    let n = new Pa(t);
    return (
      n.addMenuConfig({ label: "Paragraph", command: cl, isActive: dl }),
      n.getDetails()
    );
  };
  var hl = {};
  o(hl, "h1", () => ml),
    o(hl, "h2", () => gl),
    o(hl, "h3", () => vl),
    o(hl, "h4", () => yl),
    o(hl, "h5", () => bl),
    o(hl, "h6", () => wl);
  let pl = (e, t) => {
      let { $from: n } = e.selection,
        r = n.node(n.depth);
      return (
        (null == r ? void 0 : r.type) === e.schema.nodes.heading &&
        r.attrs.level === t
      );
    },
    fl = (e, t, n) => {
      let r = new Pa(t);
      return (
        r.addMenuConfig({
          label: `Heading ${n}`,
          command: (e, ...t) =>
            ((e, t, ...n) =>
              pl(t, e)
                ? Lo(t.schema.nodes.paragraph)(t, ...n)
                : Lo(t.schema.nodes.heading, { level: e })(t, ...n))(
              n,
              e,
              ...t
            ),
          isActive: (e) => pl(e, n),
        }),
        r.getDetails()
      );
    },
    ml = (e, t) => fl(0, t, 1),
    gl = (e, t) => fl(0, t, 2),
    vl = (e, t) => fl(0, t, 3),
    yl = (e, t) => fl(0, t, 4),
    bl = (e, t) => fl(0, t, 5),
    wl = (e, t) => fl(0, t, 6);
  r(Oa, Na),
    r(Oa, La),
    r(Oa, ja),
    r(Oa, Ua),
    r(Oa, qa),
    r(Oa, Ka),
    r(Oa, Ja),
    r(Oa, nl),
    r(Oa, il),
    r(Oa, ll),
    r(Oa, hl);
  let kl = { doc: { content: "text*" }, text: { inline: !0 } },
    xl = (e, t) => {
      let { config: n } = t,
        r = !n.toolbar,
        o = ((e) => {
          var t, n;
          let r =
              null !=
              (n = null == (t = Object.values(e.toolbar)) ? void 0 : t.flat())
                ? n
                : [],
            o = {},
            i = {},
            s = {};
          return (
            r.forEach((t) => {
              if (Oa[t]) {
                let { shortcuts: n, mark: r, menu: a } = Oa[t](e, t);
                Object.assign(i, n), r && Object.assign(o, r), (s[t] = a);
              }
            }),
            { marks: o, shortcuts: i, menu: s }
          );
        })(n),
        i = ((e, t) =>
          new ur({ nodes: e ? kl : Ra, marks: null != t ? t : {} }))(
          r,
          o.marks
        ),
        s = r
          ? []
          : ((e, t) => [
              Ta(e, t),
              (function (e = {}) {
                return new Co({
                  key: oi,
                  state: {
                    init: () => new Yo(Jo.empty, Jo.empty, null, 0, -1),
                    apply: (t, n, r) =>
                      (function (e, t, n, r) {
                        let o,
                          i = n.getMeta(oi);
                        if (i) return i.historyState;
                        n.getMeta(ii) &&
                          (e = new Yo(e.done, e.undone, null, 0, -1));
                        let s = n.getMeta("appendedTransaction");
                        if (0 == n.steps.length) return e;
                        if (s && s.getMeta(oi))
                          return s.getMeta(oi).redo
                            ? new Yo(
                                e.done.addTransform(n, void 0, r, ri(t)),
                                e.undone,
                                Qo(n.mapping.maps),
                                e.prevTime,
                                e.prevComposition
                              )
                            : new Yo(
                                e.done,
                                e.undone.addTransform(n, void 0, r, ri(t)),
                                null,
                                e.prevTime,
                                e.prevComposition
                              );
                        if (
                          !1 === n.getMeta("addToHistory") ||
                          (s && !1 === s.getMeta("addToHistory"))
                        )
                          return (o = n.getMeta("rebased"))
                            ? new Yo(
                                e.done.rebased(n, o),
                                e.undone.rebased(n, o),
                                ei(e.prevRanges, n.mapping),
                                e.prevTime,
                                e.prevComposition
                              )
                            : new Yo(
                                e.done.addMaps(n.mapping.maps),
                                e.undone.addMaps(n.mapping.maps),
                                ei(e.prevRanges, n.mapping),
                                e.prevTime,
                                e.prevComposition
                              );
                        {
                          let o = n.getMeta("composition"),
                            i =
                              0 == e.prevTime ||
                              (!s &&
                                e.prevComposition != o &&
                                (e.prevTime < (n.time || 0) - r.newGroupDelay ||
                                  !(function (e, t) {
                                    if (!t) return !1;
                                    if (!e.docChanged) return !0;
                                    let n = !1;
                                    return (
                                      e.mapping.maps[0].forEach((e, r) => {
                                        for (let o = 0; o < t.length; o += 2)
                                          e <= t[o + 1] &&
                                            r >= t[o] &&
                                            (n = !0);
                                      }),
                                      n
                                    );
                                  })(n, e.prevRanges))),
                            a = s
                              ? ei(e.prevRanges, n.mapping)
                              : Qo(n.mapping.maps);
                          return new Yo(
                            e.done.addTransform(
                              n,
                              i ? t.selection.getBookmark() : void 0,
                              r,
                              ri(t)
                            ),
                            Jo.empty,
                            a,
                            n.time,
                            null == o ? e.prevComposition : o
                          );
                        }
                      })(n, r, t, e),
                  },
                  config: (e = {
                    depth: e.depth || 100,
                    newGroupDelay: e.newGroupDelay || 500,
                  }),
                  props: {
                    handleDOMEvents: {
                      beforeinput(e, t) {
                        let n = t.inputType,
                          r =
                            "historyUndo" == n
                              ? ai
                              : "historyRedo" == n
                              ? li
                              : null;
                        return (
                          !!r && (t.preventDefault(), r(e.state, e.dispatch))
                        );
                      },
                    },
                  },
                });
              })(),
              vi(t.shortcuts),
              vi({ "Mod-z": ai, "Mod-y": li, "Mod-Shift-z": li }),
              vi(qo),
            ])(n, o),
        a = pr.fromSchema(i).parse(e);
      return _o.create({
        doc: a,
        plugins: null != s ? s : [],
        selection: ho.atEnd(a),
      });
    },
    Sl = function (e) {
      for (var t = 0; ; t++) if (!(e = e.previousSibling)) return t;
    },
    El = function (e) {
      let t = e.assignedSlot || e.parentNode;
      return t && 11 == t.nodeType ? t.host : t;
    },
    _l = null,
    Cl = function (e, t, n) {
      let r = _l || (_l = document.createRange());
      return (
        r.setEnd(e, null == n ? e.nodeValue.length : n),
        r.setStart(e, t || 0),
        r
      );
    },
    Tl = function (e, t, n, r) {
      return n && (Nl(e, t, n, r, -1) || Nl(e, t, n, r, 1));
    },
    Ol = /^(img|br|input|textarea|hr)$/i;
  function Nl(e, t, n, r, o) {
    for (;;) {
      if (e == n && t == r) return !0;
      if (t == (o < 0 ? 0 : Al(e))) {
        let n = e.parentNode;
        if (
          !n ||
          1 != n.nodeType ||
          Ml(e) ||
          Ol.test(e.nodeName) ||
          "false" == e.contentEditable
        )
          return !1;
        (t = Sl(e) + (o < 0 ? 0 : 1)), (e = n);
      } else {
        if (
          1 != e.nodeType ||
          "false" == (e = e.childNodes[t + (o < 0 ? -1 : 0)]).contentEditable
        )
          return !1;
        t = o < 0 ? Al(e) : 0;
      }
    }
  }
  function Al(e) {
    return 3 == e.nodeType ? e.nodeValue.length : e.childNodes.length;
  }
  function Ml(e) {
    let t;
    for (let n = e; n && !(t = n.pmViewDesc); n = n.parentNode);
    return t && t.node && t.node.isBlock && (t.dom == e || t.contentDOM == e);
  }
  let Dl = function (e) {
    return (
      e.focusNode &&
      Tl(e.focusNode, e.focusOffset, e.anchorNode, e.anchorOffset)
    );
  };
  function Rl(e, t) {
    let n = document.createEvent("Event");
    return (
      n.initEvent("keydown", !0, !0), (n.keyCode = e), (n.key = n.code = t), n
    );
  }
  let $l = "undefined" != typeof navigator ? navigator : null,
    Il = "undefined" != typeof document ? document : null,
    zl = ($l && $l.userAgent) || "",
    Pl = /Edge\/(\d+)/.exec(zl),
    Vl = /MSIE \d/.exec(zl),
    Ll = /Trident\/(?:[7-9]|\d{2,})\..*rv:(\d+)/.exec(zl),
    Bl = !!(Vl || Ll || Pl),
    jl = Vl ? document.documentMode : Ll ? +Ll[1] : Pl ? +Pl[1] : 0,
    Fl = !Bl && /gecko\/(\d+)/i.test(zl);
  Fl && (/Firefox\/(\d+)/.exec(zl) || [0, 0])[1];
  let Ul = !Bl && /Chrome\/(\d+)/.exec(zl),
    Zl = !!Ul,
    ql = Ul ? +Ul[1] : 0,
    Hl = !Bl && !!$l && /Apple Computer/.test($l.vendor),
    Kl = Hl && (/Mobile\/\w+/.test(zl) || (!!$l && $l.maxTouchPoints > 2)),
    Wl = Kl || (!!$l && /Mac/.test($l.platform)),
    Jl = !!$l && /Win/.test($l.platform),
    Gl = /Android \d/.test(zl),
    Yl = !!Il && "webkitFontSmoothing" in Il.documentElement.style,
    Xl = Yl
      ? +(/\bAppleWebKit\/(\d+)/.exec(navigator.userAgent) || [0, 0])[1]
      : 0;
  function Ql(e, t) {
    return "number" == typeof e ? e : e[t];
  }
  function ec(e, t, n) {
    let r = e.someProp("scrollThreshold") || 0,
      o = e.someProp("scrollMargin") || 5,
      i = e.dom.ownerDocument;
    for (let s = n || e.dom; s; ) {
      if (1 != s.nodeType) {
        s = El(s);
        continue;
      }
      let e = s,
        n = e == i.body,
        a = n
          ? (function (e) {
              let t = e.defaultView && e.defaultView.visualViewport;
              return t
                ? { left: 0, right: t.width, top: 0, bottom: t.height }
                : {
                    left: 0,
                    right: e.documentElement.clientWidth,
                    top: 0,
                    bottom: e.documentElement.clientHeight,
                  };
            })(i)
          : (function (e) {
              let t = e.getBoundingClientRect(),
                n = t.width / e.offsetWidth || 1,
                r = t.height / e.offsetHeight || 1;
              return {
                left: t.left,
                right: t.left + e.clientWidth * n,
                top: t.top,
                bottom: t.top + e.clientHeight * r,
              };
            })(e),
        l = 0,
        c = 0;
      if (
        (t.top < a.top + Ql(r, "top")
          ? (c = -(a.top - t.top + Ql(o, "top")))
          : t.bottom > a.bottom - Ql(r, "bottom") &&
            (c =
              t.bottom - t.top > a.bottom - a.top
                ? t.top + Ql(o, "top") - a.top
                : t.bottom - a.bottom + Ql(o, "bottom")),
        t.left < a.left + Ql(r, "left")
          ? (l = -(a.left - t.left + Ql(o, "left")))
          : t.right > a.right - Ql(r, "right") &&
            (l = t.right - a.right + Ql(o, "right")),
        l || c)
      )
        if (n) i.defaultView.scrollBy(l, c);
        else {
          let n = e.scrollLeft,
            r = e.scrollTop;
          c && (e.scrollTop += c), l && (e.scrollLeft += l);
          let o = e.scrollLeft - n,
            i = e.scrollTop - r;
          t = {
            left: t.left - o,
            top: t.top - i,
            right: t.right - o,
            bottom: t.bottom - i,
          };
        }
      let d = n ? "fixed" : getComputedStyle(s).position;
      if (/^(fixed|sticky)$/.test(d)) break;
      s = "absolute" == d ? s.offsetParent : El(s);
    }
  }
  function tc(e) {
    let t = [],
      n = e.ownerDocument;
    for (
      let r = e;
      r && (t.push({ dom: r, top: r.scrollTop, left: r.scrollLeft }), e != n);
      r = El(r)
    );
    return t;
  }
  function nc(e, t) {
    for (let n = 0; n < e.length; n++) {
      let { dom: r, top: o, left: i } = e[n];
      r.scrollTop != o + t && (r.scrollTop = o + t),
        r.scrollLeft != i && (r.scrollLeft = i);
    }
  }
  let rc = null;
  function oc(e, t) {
    return (
      e.left >= t.left - 1 &&
      e.left <= t.right + 1 &&
      e.top >= t.top - 1 &&
      e.top <= t.bottom + 1
    );
  }
  function ic(e) {
    return e.top < e.bottom || e.left < e.right;
  }
  function sc(e, t) {
    let n = e.getClientRects();
    if (n.length) {
      let e = n[t < 0 ? 0 : n.length - 1];
      if (ic(e)) return e;
    }
    return Array.prototype.find.call(n, ic) || e.getBoundingClientRect();
  }
  let ac = /[\u0590-\u05f4\u0600-\u06ff\u0700-\u08ac]/;
  function lc(e, t, n) {
    let {
        node: r,
        offset: o,
        atom: i,
      } = e.docView.domFromPos(t, n < 0 ? -1 : 1),
      s = Yl || Fl;
    if (3 == r.nodeType) {
      if (
        !s ||
        (!ac.test(r.nodeValue) && (n < 0 ? o : o != r.nodeValue.length))
      ) {
        let e = o,
          t = o,
          i = n < 0 ? 1 : -1;
        return (
          n < 0 && !o
            ? (t++, (i = -1))
            : n >= 0 && o == r.nodeValue.length
            ? (e--, (i = 1))
            : n < 0
            ? e--
            : t++,
          cc(sc(Cl(r, e, t), i), i < 0)
        );
      }
      {
        let e = sc(Cl(r, o, o), n);
        if (
          Fl &&
          o &&
          /\s/.test(r.nodeValue[o - 1]) &&
          o < r.nodeValue.length
        ) {
          let t = sc(Cl(r, o - 1, o - 1), -1);
          if (t.top == e.top) {
            let n = sc(Cl(r, o, o + 1), -1);
            if (n.top != e.top) return cc(n, n.left < t.left);
          }
        }
        return e;
      }
    }
    if (!e.state.doc.resolve(t - (i || 0)).parent.inlineContent) {
      if (null == i && o && (n < 0 || o == Al(r))) {
        let e = r.childNodes[o - 1];
        if (1 == e.nodeType) return dc(e.getBoundingClientRect(), !1);
      }
      if (null == i && o < Al(r)) {
        let e = r.childNodes[o];
        if (1 == e.nodeType) return dc(e.getBoundingClientRect(), !0);
      }
      return dc(r.getBoundingClientRect(), n >= 0);
    }
    if (null == i && o && (n < 0 || o == Al(r))) {
      let e = r.childNodes[o - 1],
        t =
          3 == e.nodeType
            ? Cl(e, Al(e) - !s)
            : 1 != e.nodeType || ("BR" == e.nodeName && e.nextSibling)
            ? null
            : e;
      if (t) return cc(sc(t, 1), !1);
    }
    if (null == i && o < Al(r)) {
      let e = r.childNodes[o];
      for (; e.pmViewDesc && e.pmViewDesc.ignoreForCoords; ) e = e.nextSibling;
      let t = e
        ? 3 == e.nodeType
          ? Cl(e, 0, +!s)
          : 1 == e.nodeType
          ? e
          : null
        : null;
      if (t) return cc(sc(t, -1), !0);
    }
    return cc(sc(3 == r.nodeType ? Cl(r) : r, -n), n >= 0);
  }
  function cc(e, t) {
    if (0 == e.width) return e;
    let n = t ? e.left : e.right;
    return { top: e.top, bottom: e.bottom, left: n, right: n };
  }
  function dc(e, t) {
    if (0 == e.height) return e;
    let n = t ? e.top : e.bottom;
    return { top: n, bottom: n, left: e.left, right: e.right };
  }
  function uc(e, t, n) {
    let r = e.state,
      o = e.root.activeElement;
    r != t && e.updateState(t), o != e.dom && e.focus();
    try {
      return n();
    } finally {
      r != t && e.updateState(r), o != e.dom && o && o.focus();
    }
  }
  let hc = /[\u0590-\u08ac]/,
    pc = null,
    fc = null,
    mc = !1;
  class gc {
    constructor(e, t, n, r) {
      (this.parent = e),
        (this.children = t),
        (this.dom = n),
        (this.contentDOM = r),
        (this.dirty = 0),
        (n.pmViewDesc = this);
    }
    matchesWidget(e) {
      return !1;
    }
    matchesMark(e) {
      return !1;
    }
    matchesNode(e, t, n) {
      return !1;
    }
    matchesHack(e) {
      return !1;
    }
    parseRule() {
      return null;
    }
    stopEvent(e) {
      return !1;
    }
    get size() {
      let e = 0;
      for (let t = 0; t < this.children.length; t++) e += this.children[t].size;
      return e;
    }
    get border() {
      return 0;
    }
    destroy() {
      (this.parent = void 0),
        this.dom.pmViewDesc == this && (this.dom.pmViewDesc = void 0);
      for (let e = 0; e < this.children.length; e++) this.children[e].destroy();
    }
    posBeforeChild(e) {
      for (let t = 0, n = this.posAtStart; ; t++) {
        let r = this.children[t];
        if (r == e) return n;
        n += r.size;
      }
    }
    get posBefore() {
      return this.parent.posBeforeChild(this);
    }
    get posAtStart() {
      return this.parent ? this.parent.posBeforeChild(this) + this.border : 0;
    }
    get posAfter() {
      return this.posBefore + this.size;
    }
    get posAtEnd() {
      return this.posAtStart + this.size - 2 * this.border;
    }
    localPosFromDOM(e, t, n) {
      let r;
      if (
        this.contentDOM &&
        this.contentDOM.contains(1 == e.nodeType ? e : e.parentNode)
      ) {
        if (n < 0) {
          let n, r;
          if (e == this.contentDOM) n = e.childNodes[t - 1];
          else {
            for (; e.parentNode != this.contentDOM; ) e = e.parentNode;
            n = e.previousSibling;
          }
          for (; n && (!(r = n.pmViewDesc) || r.parent != this); )
            n = n.previousSibling;
          return n ? this.posBeforeChild(r) + r.size : this.posAtStart;
        }
        {
          let n, r;
          if (e == this.contentDOM) n = e.childNodes[t];
          else {
            for (; e.parentNode != this.contentDOM; ) e = e.parentNode;
            n = e.nextSibling;
          }
          for (; n && (!(r = n.pmViewDesc) || r.parent != this); )
            n = n.nextSibling;
          return n ? this.posBeforeChild(r) : this.posAtEnd;
        }
      }
      if (e == this.dom && this.contentDOM) r = t > Sl(this.contentDOM);
      else if (
        this.contentDOM &&
        this.contentDOM != this.dom &&
        this.dom.contains(this.contentDOM)
      )
        r = 2 & e.compareDocumentPosition(this.contentDOM);
      else if (this.dom.firstChild) {
        if (0 == t)
          for (let t = e; ; t = t.parentNode) {
            if (t == this.dom) {
              r = !1;
              break;
            }
            if (t.previousSibling) break;
          }
        if (null == r && t == e.childNodes.length)
          for (let t = e; ; t = t.parentNode) {
            if (t == this.dom) {
              r = !0;
              break;
            }
            if (t.nextSibling) break;
          }
      }
      return (null == r ? n > 0 : r) ? this.posAtEnd : this.posAtStart;
    }
    nearestDesc(e, t = !1) {
      for (let n = !0, r = e; r; r = r.parentNode) {
        let o,
          i = this.getDesc(r);
        if (i && (!t || i.node)) {
          if (
            !n ||
            !(o = i.nodeDOM) ||
            (1 == o.nodeType
              ? o.contains(1 == e.nodeType ? e : e.parentNode)
              : o == e)
          )
            return i;
          n = !1;
        }
      }
    }
    getDesc(e) {
      let t = e.pmViewDesc;
      for (let e = t; e; e = e.parent) if (e == this) return t;
    }
    posFromDOM(e, t, n) {
      for (let r = e; r; r = r.parentNode) {
        let o = this.getDesc(r);
        if (o) return o.localPosFromDOM(e, t, n);
      }
      return -1;
    }
    descAt(e) {
      for (let t = 0, n = 0; t < this.children.length; t++) {
        let r = this.children[t],
          o = n + r.size;
        if (n == e && o != n) {
          for (; !r.border && r.children.length; )
            for (let e = 0; e < r.children.length; e++) {
              let t = r.children[e];
              if (t.size) {
                r = t;
                break;
              }
            }
          return r;
        }
        if (e < o) return r.descAt(e - n - r.border);
        n = o;
      }
    }
    domFromPos(e, t) {
      if (!this.contentDOM) return { node: this.dom, offset: 0, atom: e + 1 };
      let n = 0,
        r = 0;
      for (let t = 0; n < this.children.length; n++) {
        let o = this.children[n],
          i = t + o.size;
        if (i > e || o instanceof Sc) {
          r = e - t;
          break;
        }
        t = i;
      }
      if (r) return this.children[n].domFromPos(r - this.children[n].border, t);
      for (
        let e;
        n && !(e = this.children[n - 1]).size && e instanceof vc && e.side >= 0;
        n--
      );
      if (t <= 0) {
        let e,
          r = !0;
        for (
          ;
          (e = n ? this.children[n - 1] : null) &&
          e.dom.parentNode != this.contentDOM;
          n--, r = !1
        );
        return e && t && r && !e.border && !e.domAtom
          ? e.domFromPos(e.size, t)
          : { node: this.contentDOM, offset: e ? Sl(e.dom) + 1 : 0 };
      }
      {
        let e,
          r = !0;
        for (
          ;
          (e = n < this.children.length ? this.children[n] : null) &&
          e.dom.parentNode != this.contentDOM;
          n++, r = !1
        );
        return e && r && !e.border && !e.domAtom
          ? e.domFromPos(0, t)
          : {
              node: this.contentDOM,
              offset: e ? Sl(e.dom) : this.contentDOM.childNodes.length,
            };
      }
    }
    parseRange(e, t, n = 0) {
      if (0 == this.children.length)
        return {
          node: this.contentDOM,
          from: e,
          to: t,
          fromOffset: 0,
          toOffset: this.contentDOM.childNodes.length,
        };
      let r = -1,
        o = -1;
      for (let i = n, s = 0; ; s++) {
        let n = this.children[s],
          a = i + n.size;
        if (-1 == r && e <= a) {
          let o = i + n.border;
          if (
            e >= o &&
            t <= a - n.border &&
            n.node &&
            n.contentDOM &&
            this.contentDOM.contains(n.contentDOM)
          )
            return n.parseRange(e, t, o);
          e = i;
          for (let t = s; t > 0; t--) {
            let n = this.children[t - 1];
            if (
              n.size &&
              n.dom.parentNode == this.contentDOM &&
              !n.emptyChildAt(1)
            ) {
              r = Sl(n.dom) + 1;
              break;
            }
            e -= n.size;
          }
          -1 == r && (r = 0);
        }
        if (r > -1 && (a > t || s == this.children.length - 1)) {
          t = a;
          for (let e = s + 1; e < this.children.length; e++) {
            let n = this.children[e];
            if (
              n.size &&
              n.dom.parentNode == this.contentDOM &&
              !n.emptyChildAt(-1)
            ) {
              o = Sl(n.dom);
              break;
            }
            t += n.size;
          }
          -1 == o && (o = this.contentDOM.childNodes.length);
          break;
        }
        i = a;
      }
      return {
        node: this.contentDOM,
        from: e,
        to: t,
        fromOffset: r,
        toOffset: o,
      };
    }
    emptyChildAt(e) {
      if (this.border || !this.contentDOM || !this.children.length) return !1;
      let t = this.children[e < 0 ? 0 : this.children.length - 1];
      return 0 == t.size || t.emptyChildAt(e);
    }
    domAfterPos(e) {
      let { node: t, offset: n } = this.domFromPos(e, 0);
      if (1 != t.nodeType || n == t.childNodes.length)
        throw RangeError("No node after pos " + e);
      return t.childNodes[n];
    }
    setSelection(e, t, n, r = !1) {
      let o = Math.min(e, t),
        i = Math.max(e, t);
      for (let s = 0, a = 0; s < this.children.length; s++) {
        let l = this.children[s],
          c = a + l.size;
        if (o > a && i < c)
          return l.setSelection(e - a - l.border, t - a - l.border, n, r);
        a = c;
      }
      let s = this.domFromPos(e, e ? -1 : 1),
        a = t == e ? s : this.domFromPos(t, t ? -1 : 1),
        l = n.root.getSelection(),
        c = n.domSelectionRange(),
        d = !1;
      if ((Fl || Hl) && e == t) {
        let { node: e, offset: t } = s;
        if (3 == e.nodeType) {
          if (
            (d = !(!t || "\n" != e.nodeValue[t - 1])) &&
            t == e.nodeValue.length
          )
            for (let t, n = e; n; n = n.parentNode) {
              if ((t = n.nextSibling)) {
                "BR" == t.nodeName &&
                  (s = a = { node: t.parentNode, offset: Sl(t) + 1 });
                break;
              }
              let e = n.pmViewDesc;
              if (e && e.node && e.node.isBlock) break;
            }
        } else {
          let n = e.childNodes[t - 1];
          d = n && ("BR" == n.nodeName || "false" == n.contentEditable);
        }
      }
      if (
        Fl &&
        c.focusNode &&
        c.focusNode != a.node &&
        1 == c.focusNode.nodeType
      ) {
        let e = c.focusNode.childNodes[c.focusOffset];
        e && "false" == e.contentEditable && (r = !0);
      }
      if (
        !(r || (d && Hl)) &&
        Tl(s.node, s.offset, c.anchorNode, c.anchorOffset) &&
        Tl(a.node, a.offset, c.focusNode, c.focusOffset)
      )
        return;
      let u = !1;
      if ((l.extend || e == t) && !d) {
        l.collapse(s.node, s.offset);
        try {
          e != t && l.extend(a.node, a.offset), (u = !0);
        } catch (e) {}
      }
      if (!u) {
        if (e > t) {
          let e = s;
          (s = a), (a = e);
        }
        let n = document.createRange();
        n.setEnd(a.node, a.offset),
          n.setStart(s.node, s.offset),
          l.removeAllRanges(),
          l.addRange(n);
      }
    }
    ignoreMutation(e) {
      return !this.contentDOM && "selection" != e.type;
    }
    get contentLost() {
      return (
        this.contentDOM &&
        this.contentDOM != this.dom &&
        !this.dom.contains(this.contentDOM)
      );
    }
    markDirty(e, t) {
      for (let n = 0, r = 0; r < this.children.length; r++) {
        let o = this.children[r],
          i = n + o.size;
        if (n == i ? e <= i && t >= n : e < i && t > n) {
          let r = n + o.border,
            s = i - o.border;
          if (e >= r && t <= s)
            return (
              (this.dirty = e == n || t == i ? 2 : 1),
              void (e != r ||
              t != s ||
              (!o.contentLost && o.dom.parentNode == this.contentDOM)
                ? o.markDirty(e - r, t - r)
                : (o.dirty = 3))
            );
          o.dirty =
            o.dom != o.contentDOM ||
            o.dom.parentNode != this.contentDOM ||
            o.children.length
              ? 3
              : 2;
        }
        n = i;
      }
      this.dirty = 2;
    }
    markParentsDirty() {
      let e = 1;
      for (let t = this.parent; t; t = t.parent, e++) {
        let n = 1 == e ? 2 : 1;
        t.dirty < n && (t.dirty = n);
      }
    }
    get domAtom() {
      return !1;
    }
    get ignoreForCoords() {
      return !1;
    }
    isText(e) {
      return !1;
    }
  }
  class vc extends gc {
    constructor(e, t, n, r) {
      let o,
        i = t.type.toDOM;
      if (
        ("function" == typeof i &&
          (i = i(n, () =>
            o ? (o.parent ? o.parent.posBeforeChild(o) : void 0) : r
          )),
        !t.type.spec.raw)
      ) {
        if (1 != i.nodeType) {
          let e = document.createElement("span");
          e.appendChild(i), (i = e);
        }
        (i.contentEditable = "false"), i.classList.add("ProseMirror-widget");
      }
      super(e, [], i, null), (this.widget = t), (this.widget = t), (o = this);
    }
    matchesWidget(e) {
      return 0 == this.dirty && e.type.eq(this.widget.type);
    }
    parseRule() {
      return { ignore: !0 };
    }
    stopEvent(e) {
      let t = this.widget.spec.stopEvent;
      return !!t && t(e);
    }
    ignoreMutation(e) {
      return "selection" != e.type || this.widget.spec.ignoreSelection;
    }
    destroy() {
      this.widget.type.destroy(this.dom), super.destroy();
    }
    get domAtom() {
      return !0;
    }
    get side() {
      return this.widget.type.side;
    }
  }
  class yc extends gc {
    constructor(e, t, n, r) {
      super(e, [], t, null), (this.textDOM = n), (this.text = r);
    }
    get size() {
      return this.text.length;
    }
    localPosFromDOM(e, t) {
      return e != this.textDOM
        ? this.posAtStart + (t ? this.size : 0)
        : this.posAtStart + t;
    }
    domFromPos(e) {
      return { node: this.textDOM, offset: e };
    }
    ignoreMutation(e) {
      return "characterData" === e.type && e.target.nodeValue == e.oldValue;
    }
  }
  class bc extends gc {
    constructor(e, t, n, r, o) {
      super(e, [], n, r), (this.mark = t), (this.spec = o);
    }
    static create(e, t, n, r) {
      let o = r.nodeViews[t.type.name],
        i = o && o(t, r, n);
      return (
        (i && i.dom) ||
          (i = xr.renderSpec(document, t.type.spec.toDOM(t, n), null, t.attrs)),
        new bc(e, t, i.dom, i.contentDOM || i.dom, i)
      );
    }
    parseRule() {
      return 3 & this.dirty || this.mark.type.spec.reparseInView
        ? null
        : {
            mark: this.mark.type.name,
            attrs: this.mark.attrs,
            contentElement: this.contentDOM,
          };
    }
    matchesMark(e) {
      return 3 != this.dirty && this.mark.eq(e);
    }
    markDirty(e, t) {
      if ((super.markDirty(e, t), 0 != this.dirty)) {
        let e = this.parent;
        for (; !e.node; ) e = e.parent;
        e.dirty < this.dirty && (e.dirty = this.dirty), (this.dirty = 0);
      }
    }
    slice(e, t, n) {
      let r = bc.create(this.parent, this.mark, !0, n),
        o = this.children,
        i = this.size;
      t < i && (o = $c(o, t, i, n)), e > 0 && (o = $c(o, 0, e, n));
      for (let e = 0; e < o.length; e++) o[e].parent = r;
      return (r.children = o), r;
    }
    ignoreMutation(e) {
      return this.spec.ignoreMutation
        ? this.spec.ignoreMutation(e)
        : super.ignoreMutation(e);
    }
    destroy() {
      this.spec.destroy && this.spec.destroy(), super.destroy();
    }
  }
  class wc extends gc {
    constructor(e, t, n, r, o, i, s, a, l) {
      super(e, [], o, i),
        (this.node = t),
        (this.outerDeco = n),
        (this.innerDeco = r),
        (this.nodeDOM = s);
    }
    static create(e, t, n, r, o, i) {
      let s,
        a = o.nodeViews[t.type.name],
        l =
          a &&
          a(
            t,
            o,
            () => (s ? (s.parent ? s.parent.posBeforeChild(s) : void 0) : i),
            n,
            r
          ),
        c = l && l.dom,
        d = l && l.contentDOM;
      if (t.isText)
        if (c) {
          if (3 != c.nodeType)
            throw RangeError("Text must be rendered as a DOM text node");
        } else c = document.createTextNode(t.text);
      else if (!c) {
        let e = xr.renderSpec(document, t.type.spec.toDOM(t), null, t.attrs);
        ({ dom: c, contentDOM: d } = e);
      }
      d ||
        t.isText ||
        "BR" == c.nodeName ||
        (c.hasAttribute("contenteditable") || (c.contentEditable = "false"),
        t.type.spec.draggable && (c.draggable = !0));
      let u = c;
      return (
        (c = Nc(c, n, t)),
        l
          ? (s = new Ec(e, t, n, r, c, d || null, u, l, o, i + 1))
          : t.isText
          ? new xc(e, t, n, r, c, u, o)
          : new wc(e, t, n, r, c, d || null, u, o, i + 1)
      );
    }
    parseRule() {
      if (this.node.type.spec.reparseInView) return null;
      let e = { node: this.node.type.name, attrs: this.node.attrs };
      if (
        ("pre" == this.node.type.whitespace && (e.preserveWhitespace = "full"),
        this.contentDOM)
      )
        if (this.contentLost) {
          for (let t = this.children.length - 1; t >= 0; t--) {
            let n = this.children[t];
            if (this.dom.contains(n.dom.parentNode)) {
              e.contentElement = n.dom.parentNode;
              break;
            }
          }
          e.contentElement || (e.getContent = () => Mn.empty);
        } else e.contentElement = this.contentDOM;
      else e.getContent = () => this.node.content;
      return e;
    }
    matchesNode(e, t, n) {
      return (
        0 == this.dirty &&
        e.eq(this.node) &&
        Ac(t, this.outerDeco) &&
        n.eq(this.innerDeco)
      );
    }
    get size() {
      return this.node.nodeSize;
    }
    get border() {
      return +!this.node.isLeaf;
    }
    updateChildren(e, t) {
      let n = this.node.inlineContent,
        r = t,
        o = e.composing ? this.localCompositionInfo(e, t) : null,
        i = o && o.pos > -1 ? o : null,
        s = o && o.pos < 0,
        a = new Dc(this, i && i.node, e);
      (function (e, t, n, r) {
        let o = t.locals(e),
          i = 0;
        if (0 == o.length) {
          for (let n = 0; n < e.childCount; n++) {
            let s = e.child(n);
            r(s, o, t.forChild(i, s), n), (i += s.nodeSize);
          }
          return;
        }
        let s = 0,
          a = [],
          l = null;
        for (let c = 0; ; ) {
          let d, u, h, p;
          for (; s < o.length && o[s].to == i; ) {
            let e = o[s++];
            e.widget && (d ? (u || (u = [d])).push(e) : (d = e));
          }
          if (d)
            if (u) {
              u.sort(Rc);
              for (let e = 0; e < u.length; e++) n(u[e], c, !!l);
            } else n(d, c, !!l);
          if (l) (p = -1), (h = l), (l = null);
          else {
            if (!(c < e.childCount)) break;
            (p = c), (h = e.child(c++));
          }
          for (let e = 0; e < a.length; e++) a[e].to <= i && a.splice(e--, 1);
          for (; s < o.length && o[s].from <= i && o[s].to > i; )
            a.push(o[s++]);
          let f = i + h.nodeSize;
          if (h.isText) {
            let e = f;
            s < o.length && o[s].from < e && (e = o[s].from);
            for (let t = 0; t < a.length; t++) a[t].to < e && (e = a[t].to);
            e < f &&
              ((l = h.cut(e - i)), (h = h.cut(0, e - i)), (f = e), (p = -1));
          } else for (; s < o.length && o[s].to < f; ) s++;
          let m =
            h.isInline && !h.isLeaf ? a.filter((e) => !e.inline) : a.slice();
          r(h, m, t.forChild(i, h), p), (i = f);
        }
      })(
        this.node,
        this.innerDeco,
        (t, o, i) => {
          t.spec.marks
            ? a.syncToMarks(t.spec.marks, n, e)
            : t.type.side >= 0 &&
              !i &&
              a.syncToMarks(
                o == this.node.childCount ? In.none : this.node.child(o).marks,
                n,
                e
              ),
            a.placeWidget(t, e, r);
        },
        (t, i, l, c) => {
          let d;
          a.syncToMarks(t.marks, n, e),
            a.findNodeMatch(t, i, l, c) ||
              (s &&
                e.state.selection.from > r &&
                e.state.selection.to < r + t.nodeSize &&
                (d = a.findIndexWithChild(o.node)) > -1 &&
                a.updateNodeAt(t, i, l, d, e)) ||
              a.updateNextNode(t, i, l, e, c, r) ||
              a.addNode(t, i, l, e, r),
            (r += t.nodeSize);
        }
      ),
        a.syncToMarks([], n, e),
        this.node.isTextblock && a.addTextblockHacks(),
        a.destroyRest(),
        (a.changed || 2 == this.dirty) &&
          (i && this.protectLocalComposition(e, i),
          (function e(t, n, r) {
            let o = t.firstChild,
              i = !1;
            for (let s = 0; s < n.length; s++) {
              let a = n[s],
                l = a.dom;
              if (l.parentNode == t) {
                for (; l != o; ) (o = Mc(o)), (i = !0);
                o = o.nextSibling;
              } else (i = !0), t.insertBefore(l, o);
              if (a instanceof bc) {
                let n = o ? o.previousSibling : t.lastChild;
                e(a.contentDOM, a.children, r),
                  (o = n ? n.nextSibling : t.firstChild);
              }
            }
            for (; o; ) (o = Mc(o)), (i = !0);
            i && r.trackWrites == t && (r.trackWrites = null);
          })(this.contentDOM, this.children, e),
          Kl &&
            (function (e) {
              if ("UL" == e.nodeName || "OL" == e.nodeName) {
                let t = e.style.cssText;
                (e.style.cssText = t + "; list-style: square !important"),
                  window.getComputedStyle(e).listStyle,
                  (e.style.cssText = t);
              }
            })(this.dom));
    }
    localCompositionInfo(e, t) {
      let { from: n, to: r } = e.state.selection;
      if (
        !(e.state.selection instanceof ho) ||
        n < t ||
        r > t + this.node.content.size
      )
        return null;
      let o = e.input.compositionNode;
      if (!o || !this.dom.contains(o.parentNode)) return null;
      if (!this.node.inlineContent) return { node: o, pos: -1, text: "" };
      {
        let e = o.nodeValue,
          i = (function (e, t, n, r) {
            for (let o = 0, i = 0; o < e.childCount && i <= r; ) {
              let s = e.child(o++),
                a = i;
              if (((i += s.nodeSize), !s.isText)) continue;
              let l = s.text;
              for (; o < e.childCount; ) {
                let t = e.child(o++);
                if (((i += t.nodeSize), !t.isText)) break;
                l += t.text;
              }
              if (i >= n) {
                if (i >= r && l.slice(r - t.length - a, r - a) == t)
                  return r - t.length;
                let e = a < r ? l.lastIndexOf(t, r - a - 1) : -1;
                if (e >= 0 && e + t.length + a >= n) return a + e;
                if (
                  n == r &&
                  l.length >= r + t.length - a &&
                  l.slice(r - a, r - a + t.length) == t
                )
                  return r;
              }
            }
            return -1;
          })(this.node.content, e, n - t, r - t);
        return i < 0 ? null : { node: o, pos: i, text: e };
      }
    }
    protectLocalComposition(e, { node: t, pos: n, text: r }) {
      if (this.getDesc(t)) return;
      let o = t;
      for (; o.parentNode != this.contentDOM; o = o.parentNode) {
        for (; o.previousSibling; ) o.parentNode.removeChild(o.previousSibling);
        for (; o.nextSibling; ) o.parentNode.removeChild(o.nextSibling);
        o.pmViewDesc && (o.pmViewDesc = void 0);
      }
      let i = new yc(this, o, t, r);
      e.input.compositionNodes.push(i),
        (this.children = $c(this.children, n, n + r.length, e, i));
    }
    update(e, t, n, r) {
      return (
        3 != this.dirty &&
        !!e.sameMarkup(this.node) &&
        (this.updateInner(e, t, n, r), !0)
      );
    }
    updateInner(e, t, n, r) {
      this.updateOuterDeco(t),
        (this.node = e),
        (this.innerDeco = n),
        this.contentDOM && this.updateChildren(r, this.posAtStart),
        (this.dirty = 0);
    }
    updateOuterDeco(e) {
      if (Ac(e, this.outerDeco)) return;
      let t = 1 != this.nodeDOM.nodeType,
        n = this.dom;
      (this.dom = Oc(
        this.dom,
        this.nodeDOM,
        Tc(this.outerDeco, this.node, t),
        Tc(e, this.node, t)
      )),
        this.dom != n &&
          ((n.pmViewDesc = void 0), (this.dom.pmViewDesc = this)),
        (this.outerDeco = e);
    }
    selectNode() {
      1 == this.nodeDOM.nodeType &&
        this.nodeDOM.classList.add("ProseMirror-selectednode"),
        (this.contentDOM || !this.node.type.spec.draggable) &&
          (this.dom.draggable = !0);
    }
    deselectNode() {
      1 == this.nodeDOM.nodeType &&
        (this.nodeDOM.classList.remove("ProseMirror-selectednode"),
        (this.contentDOM || !this.node.type.spec.draggable) &&
          this.dom.removeAttribute("draggable"));
    }
    get domAtom() {
      return this.node.isAtom;
    }
  }
  function kc(e, t, n, r, o) {
    Nc(r, t, e);
    let i = new wc(void 0, e, t, n, r, r, r, o, 0);
    return i.contentDOM && i.updateChildren(o, 0), i;
  }
  class xc extends wc {
    constructor(e, t, n, r, o, i, s) {
      super(e, t, n, r, o, null, i, s, 0);
    }
    parseRule() {
      let e = this.nodeDOM.parentNode;
      for (; e && e != this.dom && !e.pmIsDeco; ) e = e.parentNode;
      return { skip: e || !0 };
    }
    update(e, t, n, r) {
      return !(
        3 == this.dirty ||
        (0 != this.dirty && !this.inParent()) ||
        !e.sameMarkup(this.node) ||
        (this.updateOuterDeco(t),
        (0 != this.dirty || e.text != this.node.text) &&
          e.text != this.nodeDOM.nodeValue &&
          ((this.nodeDOM.nodeValue = e.text),
          r.trackWrites == this.nodeDOM && (r.trackWrites = null)),
        (this.node = e),
        (this.dirty = 0),
        0)
      );
    }
    inParent() {
      let e = this.parent.contentDOM;
      for (let t = this.nodeDOM; t; t = t.parentNode) if (t == e) return !0;
      return !1;
    }
    domFromPos(e) {
      return { node: this.nodeDOM, offset: e };
    }
    localPosFromDOM(e, t, n) {
      return e == this.nodeDOM
        ? this.posAtStart + Math.min(t, this.node.text.length)
        : super.localPosFromDOM(e, t, n);
    }
    ignoreMutation(e) {
      return "characterData" != e.type && "selection" != e.type;
    }
    slice(e, t, n) {
      let r = this.node.cut(e, t),
        o = document.createTextNode(r.text);
      return new xc(this.parent, r, this.outerDeco, this.innerDeco, o, o, n);
    }
    markDirty(e, t) {
      super.markDirty(e, t),
        this.dom != this.nodeDOM &&
          (0 == e || t == this.nodeDOM.nodeValue.length) &&
          (this.dirty = 3);
    }
    get domAtom() {
      return !1;
    }
    isText(e) {
      return this.node.text == e;
    }
  }
  class Sc extends gc {
    parseRule() {
      return { ignore: !0 };
    }
    matchesHack(e) {
      return 0 == this.dirty && this.dom.nodeName == e;
    }
    get domAtom() {
      return !0;
    }
    get ignoreForCoords() {
      return "IMG" == this.dom.nodeName;
    }
  }
  class Ec extends wc {
    constructor(e, t, n, r, o, i, s, a, l, c) {
      super(e, t, n, r, o, i, s, l, c), (this.spec = a);
    }
    update(e, t, n, r) {
      if (3 == this.dirty) return !1;
      if (
        this.spec.update &&
        (this.node.type == e.type || this.spec.multiType)
      ) {
        let o = this.spec.update(e, t, n);
        return o && this.updateInner(e, t, n, r), o;
      }
      return (!!this.contentDOM || !!e.isLeaf) && super.update(e, t, n, r);
    }
    selectNode() {
      this.spec.selectNode ? this.spec.selectNode() : super.selectNode();
    }
    deselectNode() {
      this.spec.deselectNode ? this.spec.deselectNode() : super.deselectNode();
    }
    setSelection(e, t, n, r) {
      this.spec.setSelection
        ? this.spec.setSelection(e, t, n.root)
        : super.setSelection(e, t, n, r);
    }
    destroy() {
      this.spec.destroy && this.spec.destroy(), super.destroy();
    }
    stopEvent(e) {
      return !!this.spec.stopEvent && this.spec.stopEvent(e);
    }
    ignoreMutation(e) {
      return this.spec.ignoreMutation
        ? this.spec.ignoreMutation(e)
        : super.ignoreMutation(e);
    }
  }
  let _c = function (e) {
    e && (this.nodeName = e);
  };
  _c.prototype = Object.create(null);
  let Cc = [new _c()];
  function Tc(e, t, n) {
    if (0 == e.length) return Cc;
    let r = n ? Cc[0] : new _c(),
      o = [r];
    for (let i = 0; i < e.length; i++) {
      let s = e[i].type.attrs;
      if (s)
        for (let e in (s.nodeName && o.push((r = new _c(s.nodeName))), s)) {
          let i = s[e];
          null != i &&
            (n &&
              1 == o.length &&
              o.push((r = new _c(t.isInline ? "span" : "div"))),
            "class" == e
              ? (r.class = (r.class ? r.class + " " : "") + i)
              : "style" == e
              ? (r.style = (r.style ? r.style + ";" : "") + i)
              : "nodeName" != e && (r[e] = i));
        }
    }
    return o;
  }
  function Oc(e, t, n, r) {
    if (n == Cc && r == Cc) return t;
    let o = t;
    for (let t = 0; t < r.length; t++) {
      let i = r[t],
        s = n[t];
      if (t) {
        let t;
        (s &&
          s.nodeName == i.nodeName &&
          o != e &&
          (t = o.parentNode) &&
          t.nodeName.toLowerCase() == i.nodeName) ||
          (((t = document.createElement(i.nodeName)).pmIsDeco = !0),
          t.appendChild(o),
          (s = Cc[0])),
          (o = t);
      }
      !(function (e, t, n) {
        for (let r in t)
          "class" == r ||
            "style" == r ||
            "nodeName" == r ||
            r in n ||
            e.removeAttribute(r);
        for (let r in n)
          "class" != r &&
            "style" != r &&
            "nodeName" != r &&
            n[r] != t[r] &&
            e.setAttribute(r, n[r]);
        if (t.class != n.class) {
          let r = t.class ? t.class.split(" ").filter(Boolean) : [],
            o = n.class ? n.class.split(" ").filter(Boolean) : [];
          for (let t = 0; t < r.length; t++)
            -1 == o.indexOf(r[t]) && e.classList.remove(r[t]);
          for (let t = 0; t < o.length; t++)
            -1 == r.indexOf(o[t]) && e.classList.add(o[t]);
          0 == e.classList.length && e.removeAttribute("class");
        }
        if (t.style != n.style) {
          if (t.style) {
            let n,
              r =
                /\s*([\w\-\xa1-\uffff]+)\s*:(?:"(?:\\.|[^"])*"|'(?:\\.|[^'])*'|\(.*?\)|[^;])*/g;
            for (; (n = r.exec(t.style)); ) e.style.removeProperty(n[1]);
          }
          n.style && (e.style.cssText += n.style);
        }
      })(o, s || Cc[0], i);
    }
    return o;
  }
  function Nc(e, t, n) {
    return Oc(e, e, Cc, Tc(t, n, 1 != e.nodeType));
  }
  function Ac(e, t) {
    if (e.length != t.length) return !1;
    for (let n = 0; n < e.length; n++) if (!e[n].type.eq(t[n].type)) return !1;
    return !0;
  }
  function Mc(e) {
    let t = e.nextSibling;
    return e.parentNode.removeChild(e), t;
  }
  class Dc {
    constructor(e, t, n) {
      (this.lock = t),
        (this.view = n),
        (this.index = 0),
        (this.stack = []),
        (this.changed = !1),
        (this.top = e),
        (this.preMatch = (function (e, t) {
          let n = t,
            r = n.children.length,
            o = e.childCount,
            i = new Map(),
            s = [];
          e: for (; o > 0; ) {
            let a;
            for (;;)
              if (r) {
                let e = n.children[r - 1];
                if (!(e instanceof bc)) {
                  (a = e), r--;
                  break;
                }
                (n = e), (r = e.children.length);
              } else {
                if (n == t) break e;
                (r = n.parent.children.indexOf(n)), (n = n.parent);
              }
            let l = a.node;
            if (l) {
              if (l != e.child(o - 1)) break;
              --o, i.set(a, o), s.push(a);
            }
          }
          return { index: o, matched: i, matches: s.reverse() };
        })(e.node.content, e));
    }
    destroyBetween(e, t) {
      if (e != t) {
        for (let n = e; n < t; n++) this.top.children[n].destroy();
        this.top.children.splice(e, t - e), (this.changed = !0);
      }
    }
    destroyRest() {
      this.destroyBetween(this.index, this.top.children.length);
    }
    syncToMarks(e, t, n) {
      let r = 0,
        o = this.stack.length >> 1,
        i = Math.min(o, e.length);
      for (
        ;
        r < i &&
        (r == o - 1 ? this.top : this.stack[(r + 1) << 1]).matchesMark(e[r]) &&
        !1 !== e[r].type.spec.spanning;

      )
        r++;
      for (; r < o; )
        this.destroyRest(),
          (this.top.dirty = 0),
          (this.index = this.stack.pop()),
          (this.top = this.stack.pop()),
          o--;
      for (; o < e.length; ) {
        this.stack.push(this.top, this.index + 1);
        let r = -1;
        for (
          let t = this.index;
          t < Math.min(this.index + 3, this.top.children.length);
          t++
        ) {
          let n = this.top.children[t];
          if (n.matchesMark(e[o]) && !this.isLocked(n.dom)) {
            r = t;
            break;
          }
        }
        if (r > -1)
          r > this.index &&
            ((this.changed = !0), this.destroyBetween(this.index, r)),
            (this.top = this.top.children[this.index]);
        else {
          let r = bc.create(this.top, e[o], t, n);
          this.top.children.splice(this.index, 0, r),
            (this.top = r),
            (this.changed = !0);
        }
        (this.index = 0), o++;
      }
    }
    findNodeMatch(e, t, n, r) {
      let o,
        i = -1;
      if (
        r >= this.preMatch.index &&
        (o = this.preMatch.matches[r - this.preMatch.index]).parent ==
          this.top &&
        o.matchesNode(e, t, n)
      )
        i = this.top.children.indexOf(o, this.index);
      else
        for (
          let r = this.index, o = Math.min(this.top.children.length, r + 5);
          r < o;
          r++
        ) {
          let o = this.top.children[r];
          if (o.matchesNode(e, t, n) && !this.preMatch.matched.has(o)) {
            i = r;
            break;
          }
        }
      return !(i < 0 || (this.destroyBetween(this.index, i), this.index++, 0));
    }
    updateNodeAt(e, t, n, r, o) {
      let i = this.top.children[r];
      return (
        3 == i.dirty && i.dom == i.contentDOM && (i.dirty = 2),
        !!i.update(e, t, n, o) &&
          (this.destroyBetween(this.index, r), this.index++, !0)
      );
    }
    findIndexWithChild(e) {
      for (;;) {
        let t = e.parentNode;
        if (!t) return -1;
        if (t == this.top.contentDOM) {
          let t = e.pmViewDesc;
          if (t)
            for (let e = this.index; e < this.top.children.length; e++)
              if (this.top.children[e] == t) return e;
          return -1;
        }
        e = t;
      }
    }
    updateNextNode(e, t, n, r, o, i) {
      for (let s = this.index; s < this.top.children.length; s++) {
        let a = this.top.children[s];
        if (a instanceof wc) {
          let l = this.preMatch.matched.get(a);
          if (null != l && l != o) return !1;
          let c,
            d = a.dom,
            u =
              this.isLocked(d) &&
              !(
                e.isText &&
                a.node &&
                a.node.isText &&
                a.nodeDOM.nodeValue == e.text &&
                3 != a.dirty &&
                Ac(t, a.outerDeco)
              );
          if (!u && a.update(e, t, n, r))
            return (
              this.destroyBetween(this.index, s),
              a.dom != d && (this.changed = !0),
              this.index++,
              !0
            );
          if (!u && (c = this.recreateWrapper(a, e, t, n, r, i)))
            return (
              this.destroyBetween(this.index, s),
              (this.top.children[this.index] = c),
              c.contentDOM &&
                ((c.dirty = 2), c.updateChildren(r, i + 1), (c.dirty = 0)),
              (this.changed = !0),
              this.index++,
              !0
            );
          break;
        }
      }
      return !1;
    }
    recreateWrapper(e, t, n, r, o, i) {
      if (
        e.dirty ||
        t.isAtom ||
        !e.children.length ||
        !e.node.content.eq(t.content) ||
        !Ac(n, e.outerDeco) ||
        !r.eq(e.innerDeco)
      )
        return null;
      let s = wc.create(this.top, t, n, r, o, i);
      if (s.contentDOM)
        for (let t of ((s.children = e.children),
        (e.children = []),
        s.children))
          t.parent = s;
      return e.destroy(), s;
    }
    addNode(e, t, n, r, o) {
      let i = wc.create(this.top, e, t, n, r, o);
      i.contentDOM && i.updateChildren(r, o + 1),
        this.top.children.splice(this.index++, 0, i),
        (this.changed = !0);
    }
    placeWidget(e, t, n) {
      let r =
        this.index < this.top.children.length
          ? this.top.children[this.index]
          : null;
      if (
        !r ||
        !r.matchesWidget(e) ||
        (e != r.widget && r.widget.type.toDOM.parentNode)
      ) {
        let r = new vc(this.top, e, t, n);
        this.top.children.splice(this.index++, 0, r), (this.changed = !0);
      } else this.index++;
    }
    addTextblockHacks() {
      let e = this.top.children[this.index - 1],
        t = this.top;
      for (; e instanceof bc; ) e = (t = e).children[t.children.length - 1];
      (!e ||
        !(e instanceof xc) ||
        /\n$/.test(e.node.text) ||
        (this.view.requiresGeckoHackNode && /\s$/.test(e.node.text))) &&
        ((Hl || Zl) &&
          e &&
          "false" == e.dom.contentEditable &&
          this.addHackNode("IMG", t),
        this.addHackNode("BR", this.top));
    }
    addHackNode(e, t) {
      if (
        t == this.top &&
        this.index < t.children.length &&
        t.children[this.index].matchesHack(e)
      )
        this.index++;
      else {
        let n = document.createElement(e);
        "IMG" == e && ((n.className = "ProseMirror-separator"), (n.alt = "")),
          "BR" == e && (n.className = "ProseMirror-trailingBreak");
        let r = new Sc(this.top, [], n, null);
        t != this.top
          ? t.children.push(r)
          : t.children.splice(this.index++, 0, r),
          (this.changed = !0);
      }
    }
    isLocked(e) {
      return (
        this.lock &&
        (e == this.lock ||
          (1 == e.nodeType && e.contains(this.lock.parentNode)))
      );
    }
  }
  function Rc(e, t) {
    return e.type.side - t.type.side;
  }
  function $c(e, t, n, r, o) {
    let i = [];
    for (let s = 0, a = 0; s < e.length; s++) {
      let l = e[s],
        c = a,
        d = (a += l.size);
      c >= n || d <= t
        ? i.push(l)
        : (c < t && i.push(l.slice(0, t - c, r)),
          o && (i.push(o), (o = void 0)),
          d > n && i.push(l.slice(n - c, l.size, r)));
    }
    return i;
  }
  function Ic(e, t = null) {
    let n = e.domSelectionRange(),
      r = e.state.doc;
    if (!n.focusNode) return null;
    let o = e.docView.nearestDesc(n.focusNode),
      i = o && 0 == o.size,
      s = e.docView.posFromDOM(n.focusNode, n.focusOffset, 1);
    if (s < 0) return null;
    let a,
      l,
      c = r.resolve(s);
    if (Dl(n)) {
      for (a = s; o && !o.node; ) o = o.parent;
      let e = o.node;
      if (
        o &&
        e.isAtom &&
        fo.isSelectable(e) &&
        o.parent &&
        (!e.isInline ||
          !(function (e, t, n) {
            for (let r = 0 == t, o = t == Al(e); r || o; ) {
              if (e == n) return !0;
              let t = Sl(e);
              if (!(e = e.parentNode)) return !1;
              (r = r && 0 == t), (o = o && t == Al(e));
            }
          })(n.focusNode, n.focusOffset, o.dom))
      ) {
        let e = o.posBefore;
        l = new fo(s == e ? c : r.resolve(e));
      }
    } else {
      if (
        n instanceof e.dom.ownerDocument.defaultView.Selection &&
        n.rangeCount > 1
      ) {
        let t = s,
          o = s;
        for (let r = 0; r < n.rangeCount; r++) {
          let i = n.getRangeAt(r);
          (t = Math.min(
            t,
            e.docView.posFromDOM(i.startContainer, i.startOffset, 1)
          )),
            (o = Math.max(
              o,
              e.docView.posFromDOM(i.endContainer, i.endOffset, -1)
            ));
        }
        if (t < 0) return null;
        ([a, s] = o == e.state.selection.anchor ? [o, t] : [t, o]),
          (c = r.resolve(s));
      } else a = e.docView.posFromDOM(n.anchorNode, n.anchorOffset, 1);
      if (a < 0) return null;
    }
    let d = r.resolve(a);
    if (!l) {
      l = Zc(
        e,
        d,
        c,
        "pointer" == t || (e.state.selection.head < c.pos && !i) ? 1 : -1
      );
    }
    return l;
  }
  function zc(e) {
    return e.editable
      ? e.hasFocus()
      : Hc(e) &&
          document.activeElement &&
          document.activeElement.contains(e.dom);
  }
  function Pc(e, t = !1) {
    let n = e.state.selection;
    if ((Fc(e, n), zc(e))) {
      if (!t && e.input.mouseDown && e.input.mouseDown.allowDefault && Zl) {
        let t = e.domSelectionRange(),
          n = e.domObserver.currentSelection;
        if (
          t.anchorNode &&
          n.anchorNode &&
          Tl(t.anchorNode, t.anchorOffset, n.anchorNode, n.anchorOffset)
        )
          return (
            (e.input.mouseDown.delayedSelectionSync = !0),
            void e.domObserver.setCurSelection()
          );
      }
      if ((e.domObserver.disconnectSelection(), e.cursorWrapper))
        !(function (e) {
          let t = e.domSelection(),
            n = document.createRange();
          if (!t) return;
          let r = e.cursorWrapper.dom,
            o = "IMG" == r.nodeName;
          o ? n.setStart(r.parentNode, Sl(r) + 1) : n.setStart(r, 0),
            n.collapse(!0),
            t.removeAllRanges(),
            t.addRange(n),
            !o &&
              !e.state.selection.visible &&
              Bl &&
              jl <= 11 &&
              ((r.disabled = !0), (r.disabled = !1));
        })(e);
      else {
        var r;
        let o,
          i,
          s,
          a,
          l,
          c,
          { anchor: d, head: u } = n;
        Vc &&
          !(n instanceof ho) &&
          (n.$from.parent.inlineContent || (l = Lc(e, n.from)),
          n.empty || n.$from.parent.inlineContent || (c = Lc(e, n.to))),
          e.docView.setSelection(d, u, e, t),
          Vc && (l && jc(l), c && jc(c)),
          n.visible
            ? e.dom.classList.remove("ProseMirror-hideselection")
            : (e.dom.classList.add("ProseMirror-hideselection"),
              "onselectionchange" in document &&
                ((o = (r = e).dom.ownerDocument).removeEventListener(
                  "selectionchange",
                  r.input.hideSelectionGuard
                ),
                (s = (i = r.domSelectionRange()).anchorNode),
                (a = i.anchorOffset),
                o.addEventListener(
                  "selectionchange",
                  (r.input.hideSelectionGuard = () => {
                    (i.anchorNode != s || i.anchorOffset != a) &&
                      (o.removeEventListener(
                        "selectionchange",
                        r.input.hideSelectionGuard
                      ),
                      setTimeout(() => {
                        (!zc(r) || r.state.selection.visible) &&
                          r.dom.classList.remove("ProseMirror-hideselection");
                      }, 20));
                  })
                )));
      }
      e.domObserver.setCurSelection(), e.domObserver.connectSelection();
    }
  }
  let Vc = Hl || (Zl && ql < 63);
  function Lc(e, t) {
    let { node: n, offset: r } = e.docView.domFromPos(t, 0),
      o = r < n.childNodes.length ? n.childNodes[r] : null,
      i = r ? n.childNodes[r - 1] : null;
    if (Hl && o && "false" == o.contentEditable) return Bc(o);
    if (
      !(
        (o && "false" != o.contentEditable) ||
        (i && "false" != i.contentEditable)
      )
    ) {
      if (o) return Bc(o);
      if (i) return Bc(i);
    }
  }
  function Bc(e) {
    return (
      (e.contentEditable = "true"),
      Hl && e.draggable && ((e.draggable = !1), (e.wasDraggable = !0)),
      e
    );
  }
  function jc(e) {
    (e.contentEditable = "false"),
      e.wasDraggable && ((e.draggable = !0), (e.wasDraggable = null));
  }
  function Fc(e, t) {
    if (t instanceof fo) {
      let n = e.docView.descAt(t.from);
      n != e.lastSelectedViewDesc &&
        (Uc(e), n && n.selectNode(), (e.lastSelectedViewDesc = n));
    } else Uc(e);
  }
  function Uc(e) {
    e.lastSelectedViewDesc &&
      (e.lastSelectedViewDesc.parent && e.lastSelectedViewDesc.deselectNode(),
      (e.lastSelectedViewDesc = void 0));
  }
  function Zc(e, t, n, r) {
    return (
      e.someProp("createSelectionBetween", (r) => r(e, t, n)) ||
      ho.between(t, n, r)
    );
  }
  function qc(e) {
    return (!e.editable || !!e.hasFocus()) && Hc(e);
  }
  function Hc(e) {
    let t = e.domSelectionRange();
    if (!t.anchorNode) return !1;
    try {
      return (
        e.dom.contains(
          3 == t.anchorNode.nodeType ? t.anchorNode.parentNode : t.anchorNode
        ) &&
        (e.editable ||
          e.dom.contains(
            3 == t.focusNode.nodeType ? t.focusNode.parentNode : t.focusNode
          ))
      );
    } catch (e) {
      return !1;
    }
  }
  function Kc(e, t) {
    let { $anchor: n, $head: r } = e.selection,
      o = t > 0 ? n.max(r) : n.min(r),
      i = o.parent.inlineContent
        ? o.depth
          ? e.doc.resolve(t > 0 ? o.after() : o.before())
          : null
        : o;
    return i && ao.findFrom(i, t);
  }
  function Wc(e, t) {
    return e.dispatch(e.state.tr.setSelection(t).scrollIntoView()), !0;
  }
  function Jc(e, t, n) {
    let r = e.state.selection;
    if (!(r instanceof ho)) {
      if (r instanceof fo && r.node.isInline)
        return Wc(e, new ho(t > 0 ? r.$to : r.$from));
      let n = Kc(e.state, t);
      return !!n && Wc(e, n);
    }
    if (n.indexOf("s") > -1) {
      let { $head: n } = r,
        o = n.textOffset ? null : t < 0 ? n.nodeBefore : n.nodeAfter;
      if (!o || o.isText || !o.isLeaf) return !1;
      let i = e.state.doc.resolve(n.pos + o.nodeSize * (t < 0 ? -1 : 1));
      return Wc(e, new ho(r.$anchor, i));
    }
    if (!r.empty) return !1;
    if (e.endOfTextblock(t > 0 ? "forward" : "backward")) {
      let n = Kc(e.state, t);
      return !!n && n instanceof fo && Wc(e, n);
    }
    if (!(Wl && n.indexOf("m") > -1)) {
      let n,
        o = r.$head,
        i = o.textOffset ? null : t < 0 ? o.nodeBefore : o.nodeAfter;
      if (!i || i.isText) return !1;
      let s = t < 0 ? o.pos - i.nodeSize : o.pos;
      return (
        !!(i.isAtom || ((n = e.docView.descAt(s)) && !n.contentDOM)) &&
        (fo.isSelectable(i)
          ? Wc(e, new fo(t < 0 ? e.state.doc.resolve(o.pos - i.nodeSize) : o))
          : !!Yl &&
            Wc(e, new ho(e.state.doc.resolve(t < 0 ? s : s + i.nodeSize))))
      );
    }
  }
  function Gc(e) {
    return 3 == e.nodeType ? e.nodeValue.length : e.childNodes.length;
  }
  function Yc(e, t) {
    let n = e.pmViewDesc;
    return n && 0 == n.size && (t < 0 || e.nextSibling || "BR" != e.nodeName);
  }
  function Xc(e, t) {
    return t < 0
      ? (function (e) {
          let t = e.domSelectionRange(),
            n = t.focusNode,
            r = t.focusOffset;
          if (!n) return;
          let o,
            i,
            s = !1;
          for (
            Fl &&
            1 == n.nodeType &&
            r < Gc(n) &&
            Yc(n.childNodes[r], -1) &&
            (s = !0);
            ;

          )
            if (r > 0) {
              if (1 != n.nodeType) break;
              {
                let e = n.childNodes[r - 1];
                if (Yc(e, -1)) (o = n), (i = --r);
                else {
                  if (3 != e.nodeType) break;
                  r = (n = e).nodeValue.length;
                }
              }
            } else {
              if (Qc(n)) break;
              {
                let t = n.previousSibling;
                for (; t && Yc(t, -1); )
                  (o = n.parentNode), (i = Sl(t)), (t = t.previousSibling);
                if (t) r = Gc((n = t));
                else {
                  if ((n = n.parentNode) == e.dom) break;
                  r = 0;
                }
              }
            }
          s ? ed(e, n, r) : o && ed(e, o, i);
        })(e)
      : (function (e) {
          let t,
            n,
            r = e.domSelectionRange(),
            o = r.focusNode,
            i = r.focusOffset;
          if (!o) return;
          let s = Gc(o);
          for (;;)
            if (i < s) {
              if (1 != o.nodeType) break;
              if (!Yc(o.childNodes[i], 1)) break;
              (t = o), (n = ++i);
            } else {
              if (Qc(o)) break;
              {
                let r = o.nextSibling;
                for (; r && Yc(r, 1); )
                  (t = r.parentNode), (n = Sl(r) + 1), (r = r.nextSibling);
                if (r) (i = 0), (s = Gc((o = r)));
                else {
                  if ((o = o.parentNode) == e.dom) break;
                  i = s = 0;
                }
              }
            }
          t && ed(e, t, n);
        })(e);
  }
  function Qc(e) {
    let t = e.pmViewDesc;
    return t && t.node && t.node.isBlock;
  }
  function ed(e, t, n) {
    if (3 != t.nodeType) {
      let e, r;
      (r = (function (e, t) {
        for (; e && t == e.childNodes.length && !Ml(e); )
          (t = Sl(e) + 1), (e = e.parentNode);
        for (; e && t < e.childNodes.length; ) {
          let n = e.childNodes[t];
          if (3 == n.nodeType) return n;
          if (1 == n.nodeType && "false" == n.contentEditable) break;
          (e = n), (t = 0);
        }
      })(t, n))
        ? ((t = r), (n = 0))
        : (e = (function (e, t) {
            for (; e && !t && !Ml(e); ) (t = Sl(e)), (e = e.parentNode);
            for (; e && t; ) {
              let n = e.childNodes[t - 1];
              if (3 == n.nodeType) return n;
              if (1 == n.nodeType && "false" == n.contentEditable) break;
              t = (e = n).childNodes.length;
            }
          })(t, n)) && ((t = e), (n = e.nodeValue.length));
    }
    let r = e.domSelection();
    if (!r) return;
    if (Dl(r)) {
      let e = document.createRange();
      e.setEnd(t, n), e.setStart(t, n), r.removeAllRanges(), r.addRange(e);
    } else r.extend && r.extend(t, n);
    e.domObserver.setCurSelection();
    let { state: o } = e;
    setTimeout(() => {
      e.state == o && Pc(e);
    }, 50);
  }
  function td(e, t) {
    let n = e.state.doc.resolve(t);
    if (!Zl && !Jl && n.parent.inlineContent) {
      let r = e.coordsAtPos(t);
      if (t > n.start()) {
        let n = e.coordsAtPos(t - 1),
          o = (n.top + n.bottom) / 2;
        if (o > r.top && o < r.bottom && Math.abs(n.left - r.left) > 1)
          return n.left < r.left ? "ltr" : "rtl";
      }
      if (t < n.end()) {
        let n = e.coordsAtPos(t + 1),
          o = (n.top + n.bottom) / 2;
        if (o > r.top && o < r.bottom && Math.abs(n.left - r.left) > 1)
          return n.left > r.left ? "ltr" : "rtl";
      }
    }
    return "rtl" == getComputedStyle(e.dom).direction ? "rtl" : "ltr";
  }
  function nd(e, t, n) {
    let r = e.state.selection;
    if (
      (r instanceof ho && !r.empty) ||
      n.indexOf("s") > -1 ||
      (Wl && n.indexOf("m") > -1)
    )
      return !1;
    let { $from: o, $to: i } = r;
    if (!o.parent.inlineContent || e.endOfTextblock(t < 0 ? "up" : "down")) {
      let n = Kc(e.state, t);
      if (n && n instanceof fo) return Wc(e, n);
    }
    if (!o.parent.inlineContent) {
      let n = t < 0 ? o : i,
        s = r instanceof go ? ao.near(n, t) : ao.findFrom(n, t);
      return !!s && Wc(e, s);
    }
    return !1;
  }
  function rd(e, t) {
    if (!(e.state.selection instanceof ho)) return !0;
    let { $head: n, $anchor: r, empty: o } = e.state.selection;
    if (!n.sameParent(r)) return !0;
    if (!o) return !1;
    if (e.endOfTextblock(t > 0 ? "forward" : "backward")) return !0;
    let i = !n.textOffset && (t < 0 ? n.nodeBefore : n.nodeAfter);
    if (i && !i.isText) {
      let r = e.state.tr;
      return (
        t < 0
          ? r.delete(n.pos - i.nodeSize, n.pos)
          : r.delete(n.pos, n.pos + i.nodeSize),
        e.dispatch(r),
        !0
      );
    }
    return !1;
  }
  function od(e, t, n) {
    e.domObserver.stop(), (t.contentEditable = n), e.domObserver.start();
  }
  function id(e, t) {
    e.someProp("transformCopied", (n) => {
      t = n(t, e);
    });
    let n = [],
      { content: r, openStart: o, openEnd: i } = t;
    for (
      ;
      o > 1 && i > 1 && 1 == r.childCount && 1 == r.firstChild.childCount;

    ) {
      o--, i--;
      let e = r.firstChild;
      n.push(e.type.name, e.attrs != e.type.defaultAttrs ? e.attrs : null),
        (r = e.content);
    }
    let s = e.someProp("clipboardSerializer") || xr.fromSchema(e.state.schema),
      a = pd(),
      l = a.createElement("div");
    l.appendChild(s.serializeFragment(r, { document: a }));
    let c,
      d = l.firstChild,
      u = 0;
    for (; d && 1 == d.nodeType && (c = ud[d.nodeName.toLowerCase()]); ) {
      for (let e = c.length - 1; e >= 0; e--) {
        let t = a.createElement(c[e]);
        for (; l.firstChild; ) t.appendChild(l.firstChild);
        l.appendChild(t), u++;
      }
      d = l.firstChild;
    }
    return (
      d &&
        1 == d.nodeType &&
        d.setAttribute(
          "data-pm-slice",
          `${o} ${i}${u ? ` -${u}` : ""} ${JSON.stringify(n)}`
        ),
      {
        dom: l,
        text:
          e.someProp("clipboardTextSerializer", (n) => n(t, e)) ||
          t.content.textBetween(0, t.content.size, "\n\n"),
        slice: t,
      }
    );
  }
  function sd(e, t, n, r, o) {
    let i,
      s,
      a = o.parent.type.spec.code;
    if (!n && !t) return null;
    let l = t && (r || a || !n);
    if (l) {
      if (
        (e.someProp("transformPastedText", (n) => {
          t = n(t, a || r, e);
        }),
        a)
      )
        return t
          ? new Pn(
              Mn.from(e.state.schema.text(t.replace(/\r\n?/g, "\n"))),
              0,
              0
            )
          : Pn.empty;
      let n = e.someProp("clipboardTextParser", (n) => n(t, o, r, e));
      if (n) s = n;
      else {
        let n = o.marks(),
          { schema: r } = e.state,
          s = xr.fromSchema(r);
        (i = document.createElement("div")),
          t.split(/(?:\r\n?|\n)+/).forEach((e) => {
            let t = i.appendChild(document.createElement("p"));
            e && t.appendChild(s.serializeNode(r.text(e, n)));
          });
      }
    } else
      e.someProp("transformPastedHTML", (t) => {
        n = t(n, e);
      }),
        (i = (function (e) {
          var t;
          let n,
            r = /^(\s*<meta [^>]*>)*/.exec(e);
          r && (e = e.slice(r[0].length));
          let o,
            i = pd().createElement("div"),
            s = /<([a-z][^>\s]+)/i.exec(e);
          if (
            ((o = s && ud[s[1].toLowerCase()]) &&
              (e =
                o.map((e) => "<" + e + ">").join("") +
                e +
                o
                  .map((e) => "</" + e + ">")
                  .reverse()
                  .join("")),
            (i.innerHTML =
              ((t = e),
              (n = window.trustedTypes)
                ? (fd ||
                    (fd = n.createPolicy("ProseMirrorClipboard", {
                      createHTML: (e) => e,
                    })),
                  fd.createHTML(t))
                : t)),
            o)
          )
            for (let e = 0; e < o.length; e++) i = i.querySelector(o[e]) || i;
          return i;
        })(n)),
        Yl &&
          (function (e) {
            let t = e.querySelectorAll(
              Zl
                ? "span:not([class]):not([style])"
                : "span.Apple-converted-space"
            );
            for (let n = 0; n < t.length; n++) {
              let r = t[n];
              1 == r.childNodes.length &&
                "Â " == r.textContent &&
                r.parentNode &&
                r.parentNode.replaceChild(
                  e.ownerDocument.createTextNode(" "),
                  r
                );
            }
          })(i);
    let c = i && i.querySelector("[data-pm-slice]"),
      d =
        c &&
        /^(\d+) (\d+)(?: -(\d+))? (.*)/.exec(
          c.getAttribute("data-pm-slice") || ""
        );
    if (d && d[3])
      for (let e = +d[3]; e > 0; e--) {
        let e = i.firstChild;
        for (; e && 1 != e.nodeType; ) e = e.nextSibling;
        if (!e) break;
        i = e;
      }
    if (
      (s ||
        (s = (
          e.someProp("clipboardParser") ||
          e.someProp("domParser") ||
          pr.fromSchema(e.state.schema)
        ).parseSlice(i, {
          preserveWhitespace: !(!l && !d),
          context: o,
          ruleFromNode: (e) =>
            "BR" != e.nodeName ||
            e.nextSibling ||
            !e.parentNode ||
            ad.test(e.parentNode.nodeName)
              ? null
              : { ignore: !0 },
        })),
      d)
    )
      s = (function (e, t) {
        if (!e.size) return e;
        let n,
          r = e.content.firstChild.type.schema;
        try {
          n = JSON.parse(t);
        } catch (t) {
          return e;
        }
        let { content: o, openStart: i, openEnd: s } = e;
        for (let e = n.length - 2; e >= 0; e -= 2) {
          let t = r.nodes[n[e]];
          if (!t || t.hasRequiredAttrs()) break;
          (o = Mn.from(t.create(n[e + 1], o))), i++, s++;
        }
        return new Pn(o, i, s);
      })(dd(s, +d[1], +d[2]), d[4]);
    else if (
      (s = Pn.maxOpen(
        (function (e, t) {
          if (e.childCount < 2) return e;
          for (let n = t.depth; n >= 0; n--) {
            let r,
              o = t.node(n).contentMatchAt(t.index(n)),
              i = [];
            if (
              (e.forEach((e) => {
                if (!i) return;
                let t,
                  n = o.findWrapping(e.type);
                if (!n) return (i = null);
                if (
                  (t =
                    i.length &&
                    r.length &&
                    (function e(t, n, r, o, i) {
                      if (i < t.length && i < n.length && t[i] == n[i]) {
                        let s = e(t, n, r, o.lastChild, i + 1);
                        if (s)
                          return o.copy(
                            o.content.replaceChild(o.childCount - 1, s)
                          );
                        if (
                          o
                            .contentMatchAt(o.childCount)
                            .matchType(i == t.length - 1 ? r.type : t[i + 1])
                        )
                          return o.copy(
                            o.content.append(Mn.from(ld(r, t, i + 1)))
                          );
                      }
                    })(n, r, e, i[i.length - 1], 0))
                )
                  i[i.length - 1] = t;
                else {
                  i.length &&
                    (i[i.length - 1] = (function e(t, n) {
                      if (0 == n) return t;
                      let r = t.content.replaceChild(
                          t.childCount - 1,
                          e(t.lastChild, n - 1)
                        ),
                        o = t
                          .contentMatchAt(t.childCount)
                          .fillBefore(Mn.empty, !0);
                      return t.copy(r.append(o));
                    })(i[i.length - 1], r.length));
                  let t = ld(e, n);
                  i.push(t), (o = o.matchType(t.type)), (r = n);
                }
              }),
              i)
            )
              return Mn.from(i);
          }
          return e;
        })(s.content, o),
        !0
      )).openStart ||
      s.openEnd
    ) {
      let e = 0,
        t = 0;
      for (
        let t = s.content.firstChild;
        e < s.openStart && !t.type.spec.isolating;
        e++, t = t.firstChild
      );
      for (
        let e = s.content.lastChild;
        t < s.openEnd && !e.type.spec.isolating;
        t++, e = e.lastChild
      );
      s = dd(s, e, t);
    }
    return (
      e.someProp("transformPasted", (t) => {
        s = t(s, e);
      }),
      s
    );
  }
  let ad =
    /^(a|abbr|acronym|b|cite|code|del|em|i|ins|kbd|label|output|q|ruby|s|samp|span|strong|sub|sup|time|u|tt|var)$/i;
  function ld(e, t, n = 0) {
    for (let r = t.length - 1; r >= n; r--) e = t[r].create(null, Mn.from(e));
    return e;
  }
  function cd(e, t, n, r, o, i) {
    let s = t < 0 ? e.firstChild : e.lastChild,
      a = s.content;
    return (
      e.childCount > 1 && (i = 0),
      o < r - 1 && (a = cd(a, t, n, r, o + 1, i)),
      o >= n &&
        (a =
          t < 0
            ? s
                .contentMatchAt(0)
                .fillBefore(a, i <= o)
                .append(a)
            : a.append(
                s.contentMatchAt(s.childCount).fillBefore(Mn.empty, !0)
              )),
      e.replaceChild(t < 0 ? 0 : e.childCount - 1, s.copy(a))
    );
  }
  function dd(e, t, n) {
    return (
      t < e.openStart &&
        (e = new Pn(
          cd(e.content, -1, t, e.openStart, 0, e.openEnd),
          t,
          e.openEnd
        )),
      n < e.openEnd &&
        (e = new Pn(cd(e.content, 1, n, e.openEnd, 0, 0), e.openStart, n)),
      e
    );
  }
  let ud = {
      thead: ["table"],
      tbody: ["table"],
      tfoot: ["table"],
      caption: ["table"],
      colgroup: ["table"],
      col: ["table", "colgroup"],
      tr: ["table", "tbody"],
      td: ["table", "tbody", "tr"],
      th: ["table", "tbody", "tr"],
    },
    hd = null;
  function pd() {
    return hd || (hd = document.implementation.createHTMLDocument("title"));
  }
  let fd = null,
    md = {},
    gd = {},
    vd = { touchstart: !0, touchmove: !0 };
  class yd {
    constructor() {
      (this.shiftKey = !1),
        (this.mouseDown = null),
        (this.lastKeyCode = null),
        (this.lastKeyCodeTime = 0),
        (this.lastClick = { time: 0, x: 0, y: 0, type: "" }),
        (this.lastSelectionOrigin = null),
        (this.lastSelectionTime = 0),
        (this.lastIOSEnter = 0),
        (this.lastIOSEnterFallbackTimeout = -1),
        (this.lastFocus = 0),
        (this.lastTouch = 0),
        (this.lastChromeDelete = 0),
        (this.composing = !1),
        (this.compositionNode = null),
        (this.composingTimeout = -1),
        (this.compositionNodes = []),
        (this.compositionEndedAt = -2e8),
        (this.compositionID = 1),
        (this.compositionPendingChanges = 0),
        (this.domChangeCount = 0),
        (this.eventHandlers = Object.create(null)),
        (this.hideSelectionGuard = null);
    }
  }
  function bd(e, t) {
    (e.input.lastSelectionOrigin = t), (e.input.lastSelectionTime = Date.now());
  }
  function wd(e) {
    e.someProp("handleDOMEvents", (t) => {
      for (let n in t)
        e.input.eventHandlers[n] ||
          e.dom.addEventListener(
            n,
            (e.input.eventHandlers[n] = (t) => kd(e, t))
          );
    });
  }
  function kd(e, t) {
    return e.someProp("handleDOMEvents", (n) => {
      let r = n[t.type];
      return !!r && (r(e, t) || t.defaultPrevented);
    });
  }
  function xd(e) {
    return { left: e.clientX, top: e.clientY };
  }
  function Sd(e, t, n, r, o) {
    if (-1 == r) return !1;
    let i = e.state.doc.resolve(r);
    for (let r = i.depth + 1; r > 0; r--)
      if (
        e.someProp(t, (t) =>
          r > i.depth
            ? t(e, n, i.nodeAfter, i.before(r), o, !0)
            : t(e, n, i.node(r), i.before(r), o, !1)
        )
      )
        return !0;
    return !1;
  }
  function Ed(e, t, n) {
    if ((e.focused || e.focus(), e.state.selection.eq(t))) return;
    let r = e.state.tr.setSelection(t);
    "pointer" == n && r.setMeta("pointer", !0), e.dispatch(r);
  }
  (gd.keydown = (e, t) => {
    if (
      !((e.input.shiftKey = 16 == t.keyCode || t.shiftKey),
      Td(e, t) ||
        ((e.input.lastKeyCode = t.keyCode),
        (e.input.lastKeyCodeTime = Date.now()),
        Gl && Zl && 13 == t.keyCode))
    )
      if (
        (229 != t.keyCode && e.domObserver.forceFlush(),
        !Kl || 13 != t.keyCode || t.ctrlKey || t.altKey || t.metaKey)
      )
        e.someProp("handleKeyDown", (n) => n(e, t)) ||
        (function (e, t) {
          let n,
            r = t.keyCode,
            o =
              ((n = ""),
              t.ctrlKey && (n += "c"),
              t.metaKey && (n += "m"),
              t.altKey && (n += "a"),
              t.shiftKey && (n += "s"),
              n);
          if (8 == r || (Wl && 72 == r && "c" == o))
            return rd(e, -1) || Xc(e, -1);
          if ((46 == r && !t.shiftKey) || (Wl && 68 == r && "c" == o))
            return rd(e, 1) || Xc(e, 1);
          if (13 == r || 27 == r) return !0;
          if (37 == r || (Wl && 66 == r && "c" == o)) {
            let t =
              37 == r ? ("ltr" == td(e, e.state.selection.from) ? -1 : 1) : -1;
            return Jc(e, t, o) || Xc(e, t);
          }
          if (39 == r || (Wl && 70 == r && "c" == o)) {
            let t =
              39 == r ? ("ltr" == td(e, e.state.selection.from) ? 1 : -1) : 1;
            return Jc(e, t, o) || Xc(e, t);
          }
          return 38 == r || (Wl && 80 == r && "c" == o)
            ? nd(e, -1, o) || Xc(e, -1)
            : 40 == r || (Wl && 78 == r && "c" == o)
            ? (function (e) {
                if (!Hl || e.state.selection.$head.parentOffset > 0) return !1;
                let { focusNode: t, focusOffset: n } = e.domSelectionRange();
                if (
                  t &&
                  1 == t.nodeType &&
                  0 == n &&
                  t.firstChild &&
                  "false" == t.firstChild.contentEditable
                ) {
                  let n = t.firstChild;
                  od(e, n, "true"), setTimeout(() => od(e, n, "false"), 20);
                }
                return !1;
              })(e) ||
              nd(e, 1, o) ||
              Xc(e, 1)
            : o == (Wl ? "m" : "c") &&
              (66 == r || 73 == r || 89 == r || 90 == r);
        })(e, t)
          ? t.preventDefault()
          : bd(e, "key");
      else {
        let t = Date.now();
        (e.input.lastIOSEnter = t),
          (e.input.lastIOSEnterFallbackTimeout = setTimeout(() => {
            e.input.lastIOSEnter == t &&
              (e.someProp("handleKeyDown", (t) => t(e, Rl(13, "Enter"))),
              (e.input.lastIOSEnter = 0));
          }, 200));
      }
  }),
    (gd.keyup = (e, t) => {
      16 == t.keyCode && (e.input.shiftKey = !1);
    }),
    (gd.keypress = (e, t) => {
      if (
        Td(e, t) ||
        !t.charCode ||
        (t.ctrlKey && !t.altKey) ||
        (Wl && t.metaKey)
      )
        return;
      if (e.someProp("handleKeyPress", (n) => n(e, t)))
        return void t.preventDefault();
      let n = e.state.selection;
      if (!(n instanceof ho && n.$from.sameParent(n.$to))) {
        let r = String.fromCharCode(t.charCode);
        /[\r\n]/.test(r) ||
          e.someProp("handleTextInput", (t) =>
            t(e, n.$from.pos, n.$to.pos, r)
          ) ||
          e.dispatch(e.state.tr.insertText(r).scrollIntoView()),
          t.preventDefault();
      }
    });
  let _d = Wl ? "metaKey" : "ctrlKey";
  md.mousedown = (e, t) => {
    e.input.shiftKey = t.shiftKey;
    let n = Md(e),
      r = Date.now(),
      o = "singleClick";
    r - e.input.lastClick.time < 500 &&
      (function (e, t) {
        let n = t.x - e.clientX,
          r = t.y - e.clientY;
        return n * n + r * r < 100;
      })(t, e.input.lastClick) &&
      !t[_d] &&
      ("singleClick" == e.input.lastClick.type
        ? (o = "doubleClick")
        : "doubleClick" == e.input.lastClick.type && (o = "tripleClick")),
      (e.input.lastClick = { time: r, x: t.clientX, y: t.clientY, type: o });
    let i = e.posAtCoords(xd(t));
    i &&
      ("singleClick" == o
        ? (e.input.mouseDown && e.input.mouseDown.done(),
          (e.input.mouseDown = new Cd(e, i, t, !!n)))
        : ("doubleClick" == o
            ? function (e, t, n, r) {
                return (
                  Sd(e, "handleDoubleClickOn", t, n, r) ||
                  e.someProp("handleDoubleClick", (n) => n(e, t, r))
                );
              }
            : function (e, t, n, r) {
                return (
                  Sd(e, "handleTripleClickOn", t, n, r) ||
                  e.someProp("handleTripleClick", (n) => n(e, t, r)) ||
                  (function (e, t, n) {
                    if (0 != n.button) return !1;
                    let r = e.state.doc;
                    if (-1 == t)
                      return (
                        !!r.inlineContent &&
                        (Ed(e, ho.create(r, 0, r.content.size), "pointer"), !0)
                      );
                    let o = r.resolve(t);
                    for (let t = o.depth + 1; t > 0; t--) {
                      let n = t > o.depth ? o.nodeAfter : o.node(t),
                        i = o.before(t);
                      if (n.inlineContent)
                        Ed(
                          e,
                          ho.create(r, i + 1, i + 1 + n.content.size),
                          "pointer"
                        );
                      else {
                        if (!fo.isSelectable(n)) continue;
                        Ed(e, fo.create(r, i), "pointer");
                      }
                      return !0;
                    }
                  })(e, n, r)
                );
              })(e, i.pos, i.inside, t)
        ? t.preventDefault()
        : bd(e, "pointer"));
  };
  class Cd {
    constructor(e, t, n, r) {
      let o, i;
      if (
        ((this.view = e),
        (this.pos = t),
        (this.event = n),
        (this.flushed = r),
        (this.delayedSelectionSync = !1),
        (this.mightDrag = null),
        (this.startDoc = e.state.doc),
        (this.selectNode = !!n[_d]),
        (this.allowDefault = n.shiftKey),
        t.inside > -1)
      )
        (o = e.state.doc.nodeAt(t.inside)), (i = t.inside);
      else {
        let n = e.state.doc.resolve(t.pos);
        (o = n.parent), (i = n.depth ? n.before() : 0);
      }
      let s = r ? null : n.target,
        a = s ? e.docView.nearestDesc(s, !0) : null;
      this.target = a && 1 == a.dom.nodeType ? a.dom : null;
      let { selection: l } = e.state;
      ((0 == n.button &&
        o.type.spec.draggable &&
        !1 !== o.type.spec.selectable) ||
        (l instanceof fo && l.from <= i && l.to > i)) &&
        (this.mightDrag = {
          node: o,
          pos: i,
          addAttr: !(!this.target || this.target.draggable),
          setUneditable: !(
            !this.target ||
            !Fl ||
            this.target.hasAttribute("contentEditable")
          ),
        }),
        this.target &&
          this.mightDrag &&
          (this.mightDrag.addAttr || this.mightDrag.setUneditable) &&
          (this.view.domObserver.stop(),
          this.mightDrag.addAttr && (this.target.draggable = !0),
          this.mightDrag.setUneditable &&
            setTimeout(() => {
              this.view.input.mouseDown == this &&
                this.target.setAttribute("contentEditable", "false");
            }, 20),
          this.view.domObserver.start()),
        e.root.addEventListener("mouseup", (this.up = this.up.bind(this))),
        e.root.addEventListener(
          "mousemove",
          (this.move = this.move.bind(this))
        ),
        bd(e, "pointer");
    }
    done() {
      this.view.root.removeEventListener("mouseup", this.up),
        this.view.root.removeEventListener("mousemove", this.move),
        this.mightDrag &&
          this.target &&
          (this.view.domObserver.stop(),
          this.mightDrag.addAttr && this.target.removeAttribute("draggable"),
          this.mightDrag.setUneditable &&
            this.target.removeAttribute("contentEditable"),
          this.view.domObserver.start()),
        this.delayedSelectionSync && setTimeout(() => Pc(this.view)),
        (this.view.input.mouseDown = null);
    }
    up(e) {
      if ((this.done(), !this.view.dom.contains(e.target))) return;
      let t = this.pos;
      var n, r, o, i;
      (this.view.state.doc != this.startDoc &&
        (t = this.view.posAtCoords(xd(e))),
      this.updateAllowDefault(e),
      this.allowDefault || !t)
        ? bd(this.view, "pointer")
        : ((n = this.view),
          (r = t.pos),
          (o = t.inside),
          (i = this.selectNode),
          Sd(n, "handleClickOn", r, o, e) ||
          n.someProp("handleClick", (t) => t(n, r, e)) ||
          (i
            ? (function (e, t) {
                if (-1 == t) return !1;
                let n,
                  r,
                  o = e.state.selection;
                o instanceof fo && (n = o.node);
                let i = e.state.doc.resolve(t);
                for (let e = i.depth + 1; e > 0; e--) {
                  let t = e > i.depth ? i.nodeAfter : i.node(e);
                  if (fo.isSelectable(t)) {
                    r =
                      n &&
                      o.$from.depth > 0 &&
                      e >= o.$from.depth &&
                      i.before(o.$from.depth + 1) == o.$from.pos
                        ? i.before(o.$from.depth)
                        : i.before(e);
                    break;
                  }
                }
                return (
                  null != r && (Ed(e, fo.create(e.state.doc, r), "pointer"), !0)
                );
              })(n, o)
            : (function (e, t) {
                if (-1 == t) return !1;
                let n = e.state.doc.resolve(t),
                  r = n.nodeAfter;
                return (
                  !!(r && r.isAtom && fo.isSelectable(r)) &&
                  (Ed(e, new fo(n), "pointer"), !0)
                );
              })(n, o))
            ? e.preventDefault()
            : 0 == e.button &&
              (this.flushed ||
                (Hl && this.mightDrag && !this.mightDrag.node.isAtom) ||
                (Zl &&
                  !this.view.state.selection.visible &&
                  2 >=
                    Math.min(
                      Math.abs(t.pos - this.view.state.selection.from),
                      Math.abs(t.pos - this.view.state.selection.to)
                    )))
            ? (Ed(
                this.view,
                ao.near(this.view.state.doc.resolve(t.pos)),
                "pointer"
              ),
              e.preventDefault())
            : bd(this.view, "pointer"));
    }
    move(e) {
      this.updateAllowDefault(e),
        bd(this.view, "pointer"),
        0 == e.buttons && this.done();
    }
    updateAllowDefault(e) {
      !this.allowDefault &&
        (Math.abs(this.event.x - e.clientX) > 4 ||
          Math.abs(this.event.y - e.clientY) > 4) &&
        (this.allowDefault = !0);
    }
  }
  function Td(e, t) {
    return (
      !!e.composing ||
      (!!(Hl && 500 > Math.abs(t.timeStamp - e.input.compositionEndedAt)) &&
        ((e.input.compositionEndedAt = -2e8), !0))
    );
  }
  (md.touchstart = (e) => {
    (e.input.lastTouch = Date.now()), Md(e), bd(e, "pointer");
  }),
    (md.touchmove = (e) => {
      (e.input.lastTouch = Date.now()), bd(e, "pointer");
    }),
    (md.contextmenu = (e) => Md(e));
  let Od = Gl ? 5e3 : -1;
  function Nd(e, t) {
    clearTimeout(e.input.composingTimeout),
      t > -1 && (e.input.composingTimeout = setTimeout(() => Md(e), t));
  }
  function Ad(e) {
    let t;
    for (
      e.composing &&
      ((e.input.composing = !1),
      (e.input.compositionEndedAt =
        ((t = document.createEvent("Event")).initEvent("event", !0, !0),
        t.timeStamp)));
      e.input.compositionNodes.length > 0;

    )
      e.input.compositionNodes.pop().markParentsDirty();
  }
  function Md(e, t = !1) {
    if (!(Gl && e.domObserver.flushingSoon >= 0)) {
      if (
        (e.domObserver.forceFlush(), Ad(e), t || (e.docView && e.docView.dirty))
      ) {
        let n = Ic(e);
        return (
          n && !n.eq(e.state.selection)
            ? e.dispatch(e.state.tr.setSelection(n))
            : (!e.markCursor && !t) || e.state.selection.empty
            ? e.updateState(e.state)
            : e.dispatch(e.state.tr.deleteSelection()),
          !0
        );
      }
      return !1;
    }
  }
  (gd.compositionstart = gd.compositionupdate =
    (e) => {
      if (!e.composing) {
        e.domObserver.flush();
        let { state: t } = e,
          n = t.selection.$to;
        if (
          t.selection instanceof ho &&
          (t.storedMarks ||
            (!n.textOffset &&
              n.parentOffset &&
              n.nodeBefore.marks.some((e) => !1 === e.type.spec.inclusive)))
        )
          (e.markCursor = e.state.storedMarks || n.marks()),
            Md(e, !0),
            (e.markCursor = null);
        else if (
          (Md(e, !t.selection.empty),
          Fl &&
            t.selection.empty &&
            n.parentOffset &&
            !n.textOffset &&
            n.nodeBefore.marks.length)
        ) {
          let t = e.domSelectionRange();
          for (
            let n = t.focusNode, r = t.focusOffset;
            n && 1 == n.nodeType && 0 != r;

          ) {
            let t = r < 0 ? n.lastChild : n.childNodes[r - 1];
            if (!t) break;
            if (3 == t.nodeType) {
              let n = e.domSelection();
              n && n.collapse(t, t.nodeValue.length);
              break;
            }
            (n = t), (r = -1);
          }
        }
        e.input.composing = !0;
      }
      Nd(e, Od);
    }),
    (gd.compositionend = (e, t) => {
      e.composing &&
        ((e.input.composing = !1),
        (e.input.compositionEndedAt = t.timeStamp),
        (e.input.compositionPendingChanges = e.domObserver.pendingRecords()
          .length
          ? e.input.compositionID
          : 0),
        (e.input.compositionNode = null),
        e.input.compositionPendingChanges &&
          Promise.resolve().then(() => e.domObserver.flush()),
        e.input.compositionID++,
        Nd(e, 20));
    });
  let Dd = (Bl && jl < 15) || (Kl && Xl < 604);
  function Rd(e, t, n, r, o) {
    let i = sd(e, t, n, r, e.state.selection.$from);
    if (e.someProp("handlePaste", (t) => t(e, o, i || Pn.empty))) return !0;
    if (!i) return !1;
    let s =
        0 == i.openStart && 0 == i.openEnd && 1 == i.content.childCount
          ? i.content.firstChild
          : null,
      a = s
        ? e.state.tr.replaceSelectionWith(s, r)
        : e.state.tr.replaceSelection(i);
    return (
      e.dispatch(
        a.scrollIntoView().setMeta("paste", !0).setMeta("uiEvent", "paste")
      ),
      !0
    );
  }
  function $d(e) {
    let t = e.getData("text/plain") || e.getData("Text");
    if (t) return t;
    let n = e.getData("text/uri-list");
    return n ? n.replace(/\r?\n/g, " ") : "";
  }
  (md.copy = gd.cut =
    (e, t) => {
      let n = e.state.selection,
        r = "cut" == t.type;
      if (n.empty) return;
      let o = Dd ? null : t.clipboardData,
        { dom: i, text: s } = id(e, n.content());
      o
        ? (t.preventDefault(),
          o.clearData(),
          o.setData("text/html", i.innerHTML),
          o.setData("text/plain", s))
        : (function (e, t) {
            if (!e.dom.parentNode) return;
            let n = e.dom.parentNode.appendChild(document.createElement("div"));
            n.appendChild(t),
              (n.style.cssText = "position: fixed; left: -10000px; top: 10px");
            let r = getSelection(),
              o = document.createRange();
            o.selectNodeContents(t),
              e.dom.blur(),
              r.removeAllRanges(),
              r.addRange(o),
              setTimeout(() => {
                n.parentNode && n.parentNode.removeChild(n), e.focus();
              }, 50);
          })(e, i),
        r &&
          e.dispatch(
            e.state.tr
              .deleteSelection()
              .scrollIntoView()
              .setMeta("uiEvent", "cut")
          );
    }),
    (gd.paste = (e, t) => {
      if (e.composing && !Gl) return;
      let n = Dd ? null : t.clipboardData,
        r = e.input.shiftKey && 45 != e.input.lastKeyCode;
      n && Rd(e, $d(n), n.getData("text/html"), r, t)
        ? t.preventDefault()
        : (function (e, t) {
            if (!e.dom.parentNode) return;
            let n =
                e.input.shiftKey ||
                e.state.selection.$from.parent.type.spec.code,
              r = e.dom.parentNode.appendChild(
                document.createElement(n ? "textarea" : "div")
              );
            n || (r.contentEditable = "true"),
              (r.style.cssText = "position: fixed; left: -10000px; top: 10px"),
              r.focus();
            let o = e.input.shiftKey && 45 != e.input.lastKeyCode;
            setTimeout(() => {
              e.focus(),
                r.parentNode && r.parentNode.removeChild(r),
                n
                  ? Rd(e, r.value, null, o, t)
                  : Rd(e, r.textContent, r.innerHTML, o, t);
            }, 50);
          })(e, t);
    });
  class Id {
    constructor(e, t, n) {
      (this.slice = e), (this.move = t), (this.node = n);
    }
  }
  let zd = Wl ? "altKey" : "ctrlKey";
  function Pd(e, t) {
    let n = e.someProp("dragCopies", (e) => !e(t));
    return null != n ? n : !t[zd];
  }
  for (let e in ((md.dragstart = (e, t) => {
    let n,
      r = e.input.mouseDown;
    if ((r && r.done(), !t.dataTransfer)) return;
    let o = e.state.selection,
      i = o.empty ? null : e.posAtCoords(xd(t));
    if (i && i.pos >= o.from && i.pos <= (o instanceof fo ? o.to - 1 : o.to));
    else if (r && r.mightDrag) n = fo.create(e.state.doc, r.mightDrag.pos);
    else if (t.target && 1 == t.target.nodeType) {
      let r = e.docView.nearestDesc(t.target, !0);
      r &&
        r.node.type.spec.draggable &&
        r != e.docView &&
        (n = fo.create(e.state.doc, r.posBefore));
    }
    let s = (n || e.state.selection).content(),
      { dom: a, text: l, slice: c } = id(e, s);
    (t.dataTransfer.files.length && Zl && !(ql > 120)) ||
      t.dataTransfer.clearData(),
      t.dataTransfer.setData(Dd ? "Text" : "text/html", a.innerHTML),
      (t.dataTransfer.effectAllowed = "copyMove"),
      Dd || t.dataTransfer.setData("text/plain", l),
      (e.dragging = new Id(c, Pd(e, t), n));
  }),
  (md.dragend = (e) => {
    let t = e.dragging;
    window.setTimeout(() => {
      e.dragging == t && (e.dragging = null);
    }, 50);
  }),
  (gd.dragover = gd.dragenter = (e, t) => t.preventDefault()),
  (gd.drop = (e, t) => {
    let n = e.dragging;
    if (((e.dragging = null), !t.dataTransfer)) return;
    let r = e.posAtCoords(xd(t));
    if (!r) return;
    let o = e.state.doc.resolve(r.pos),
      i = n && n.slice;
    i
      ? e.someProp("transformPasted", (t) => {
          i = t(i, e);
        })
      : (i = sd(
          e,
          $d(t.dataTransfer),
          Dd ? null : t.dataTransfer.getData("text/html"),
          !1,
          o
        ));
    let s = !(!n || !Pd(e, t));
    if (e.someProp("handleDrop", (n) => n(e, t, i || Pn.empty, s)))
      return void t.preventDefault();
    if (!i) return;
    t.preventDefault();
    let a = i
      ? (function (e, t, n) {
          let r = e.resolve(t);
          if (!n.content.size) return t;
          let o = n.content;
          for (let e = 0; e < n.openStart; e++) o = o.firstChild.content;
          for (let e = 1; e <= (0 == n.openStart && n.size ? 2 : 1); e++)
            for (let t = r.depth; t >= 0; t--) {
              let n =
                  t == r.depth
                    ? 0
                    : r.pos <= (r.start(t + 1) + r.end(t + 1)) / 2
                    ? -1
                    : 1,
                i = r.index(t) + +(n > 0),
                s = r.node(t),
                a = !1;
              if (1 == e) a = s.canReplace(i, i, o);
              else {
                let e = s.contentMatchAt(i).findWrapping(o.firstChild.type);
                a = e && s.canReplaceWith(i, i, e[0]);
              }
              if (a)
                return 0 == n
                  ? r.pos
                  : n < 0
                  ? r.before(t + 1)
                  : r.after(t + 1);
            }
          return null;
        })(e.state.doc, o.pos, i)
      : o.pos;
    null == a && (a = o.pos);
    let l = e.state.tr;
    if (s) {
      let { node: e } = n;
      e ? e.replace(l) : l.deleteSelection();
    }
    let c = l.mapping.map(a),
      d = 0 == i.openStart && 0 == i.openEnd && 1 == i.content.childCount,
      u = l.doc;
    if (
      (d
        ? l.replaceRangeWith(c, c, i.content.firstChild)
        : l.replaceRange(c, c, i),
      l.doc.eq(u))
    )
      return;
    let h = l.doc.resolve(c);
    if (
      d &&
      fo.isSelectable(i.content.firstChild) &&
      h.nodeAfter &&
      h.nodeAfter.sameMarkup(i.content.firstChild)
    )
      l.setSelection(new fo(h));
    else {
      let t = l.mapping.map(a);
      l.mapping.maps[l.mapping.maps.length - 1].forEach(
        (e, n, r, o) => (t = o)
      ),
        l.setSelection(Zc(e, h, l.doc.resolve(t)));
    }
    e.focus(), e.dispatch(l.setMeta("uiEvent", "drop"));
  }),
  (md.focus = (e) => {
    (e.input.lastFocus = Date.now()),
      e.focused ||
        (e.domObserver.stop(),
        e.dom.classList.add("ProseMirror-focused"),
        e.domObserver.start(),
        (e.focused = !0),
        setTimeout(() => {
          e.docView &&
            e.hasFocus() &&
            !e.domObserver.currentSelection.eq(e.domSelectionRange()) &&
            Pc(e);
        }, 20));
  }),
  (md.blur = (e, t) => {
    e.focused &&
      (e.domObserver.stop(),
      e.dom.classList.remove("ProseMirror-focused"),
      e.domObserver.start(),
      t.relatedTarget &&
        e.dom.contains(t.relatedTarget) &&
        e.domObserver.currentSelection.clear(),
      (e.focused = !1));
  }),
  (md.beforeinput = (e, t) => {
    if (Zl && Gl && "deleteContentBackward" == t.inputType) {
      e.domObserver.flushSoon();
      let { domChangeCount: t } = e.input;
      setTimeout(() => {
        if (
          e.input.domChangeCount != t ||
          (e.dom.blur(),
          e.focus(),
          e.someProp("handleKeyDown", (t) => t(e, Rl(8, "Backspace"))))
        )
          return;
        let { $cursor: n } = e.state.selection;
        n &&
          n.pos > 0 &&
          e.dispatch(e.state.tr.delete(n.pos - 1, n.pos).scrollIntoView());
      }, 50);
    }
  }),
  gd))
    md[e] = gd[e];
  function Vd(e, t) {
    if (e == t) return !0;
    for (let n in e) if (e[n] !== t[n]) return !1;
    for (let n in t) if (!(n in e)) return !1;
    return !0;
  }
  class Ld {
    constructor(e, t) {
      (this.toDOM = e),
        (this.spec = t || Zd),
        (this.side = this.spec.side || 0);
    }
    map(e, t, n, r) {
      let { pos: o, deleted: i } = e.mapResult(
        t.from + r,
        this.side < 0 ? -1 : 1
      );
      return i ? null : new Fd(o - n, o - n, this);
    }
    valid() {
      return !0;
    }
    eq(e) {
      return (
        this == e ||
        (e instanceof Ld &&
          ((this.spec.key && this.spec.key == e.spec.key) ||
            (this.toDOM == e.toDOM && Vd(this.spec, e.spec))))
      );
    }
    destroy(e) {
      this.spec.destroy && this.spec.destroy(e);
    }
  }
  class Bd {
    constructor(e, t) {
      (this.attrs = e), (this.spec = t || Zd);
    }
    map(e, t, n, r) {
      let o = e.map(t.from + r, this.spec.inclusiveStart ? -1 : 1) - n,
        i = e.map(t.to + r, this.spec.inclusiveEnd ? 1 : -1) - n;
      return o >= i ? null : new Fd(o, i, this);
    }
    valid(e, t) {
      return t.from < t.to;
    }
    eq(e) {
      return (
        this == e ||
        (e instanceof Bd && Vd(this.attrs, e.attrs) && Vd(this.spec, e.spec))
      );
    }
    static is(e) {
      return e.type instanceof Bd;
    }
    destroy() {}
  }
  class jd {
    constructor(e, t) {
      (this.attrs = e), (this.spec = t || Zd);
    }
    map(e, t, n, r) {
      let o = e.mapResult(t.from + r, 1);
      if (o.deleted) return null;
      let i = e.mapResult(t.to + r, -1);
      return i.deleted || i.pos <= o.pos
        ? null
        : new Fd(o.pos - n, i.pos - n, this);
    }
    valid(e, t) {
      let n,
        { index: r, offset: o } = e.content.findIndex(t.from);
      return o == t.from && !(n = e.child(r)).isText && o + n.nodeSize == t.to;
    }
    eq(e) {
      return (
        this == e ||
        (e instanceof jd && Vd(this.attrs, e.attrs) && Vd(this.spec, e.spec))
      );
    }
    destroy() {}
  }
  class Fd {
    constructor(e, t, n) {
      (this.from = e), (this.to = t), (this.type = n);
    }
    copy(e, t) {
      return new Fd(e, t, this.type);
    }
    eq(e, t = 0) {
      return (
        this.type.eq(e.type) && this.from + t == e.from && this.to + t == e.to
      );
    }
    map(e, t, n) {
      return this.type.map(e, this, t, n);
    }
    static widget(e, t, n) {
      return new Fd(e, e, new Ld(t, n));
    }
    static inline(e, t, n, r) {
      return new Fd(e, t, new Bd(n, r));
    }
    static node(e, t, n, r) {
      return new Fd(e, t, new jd(n, r));
    }
    get spec() {
      return this.type.spec;
    }
    get inline() {
      return this.type instanceof Bd;
    }
    get widget() {
      return this.type instanceof Ld;
    }
  }
  let Ud = [],
    Zd = {};
  class qd {
    constructor(e, t) {
      (this.local = e.length ? e : Ud), (this.children = t.length ? t : Ud);
    }
    static create(e, t) {
      return t.length ? Yd(t, e, 0, Zd) : Hd;
    }
    find(e, t, n) {
      let r = [];
      return this.findInner(null == e ? 0 : e, null == t ? 1e9 : t, r, 0, n), r;
    }
    findInner(e, t, n, r, o) {
      for (let i = 0; i < this.local.length; i++) {
        let s = this.local[i];
        s.from <= t &&
          s.to >= e &&
          (!o || o(s.spec)) &&
          n.push(s.copy(s.from + r, s.to + r));
      }
      for (let i = 0; i < this.children.length; i += 3)
        if (this.children[i] < t && this.children[i + 1] > e) {
          let s = this.children[i] + 1;
          this.children[i + 2].findInner(e - s, t - s, n, r + s, o);
        }
    }
    map(e, t, n) {
      return this == Hd || 0 == e.maps.length
        ? this
        : this.mapInner(e, t, 0, 0, n || Zd);
    }
    mapInner(e, t, n, r, o) {
      let i;
      for (let s = 0; s < this.local.length; s++) {
        let a = this.local[s].map(e, n, r);
        a && a.type.valid(t, a)
          ? (i || (i = [])).push(a)
          : o.onRemove && o.onRemove(this.local[s].spec);
      }
      return this.children.length
        ? (function (e, t, n, r, o, i, s) {
            let a = e.slice();
            for (let e = 0, t = i; e < n.maps.length; e++) {
              let r = 0;
              n.maps[e].forEach((e, n, o, i) => {
                let s = i - o - (n - e);
                for (let o = 0; o < a.length; o += 3) {
                  let i = a[o + 1];
                  if (i < 0 || e > i + t - r) continue;
                  let l = a[o] + t - r;
                  n >= l
                    ? (a[o + 1] = e <= l ? -2 : -1)
                    : e >= t && s && ((a[o] += s), (a[o + 1] += s));
                }
                r += s;
              }),
                (t = n.maps[e].map(t, -1));
            }
            let l = !1;
            for (let t = 0; t < a.length; t += 3)
              if (a[t + 1] < 0) {
                if (-2 == a[t + 1]) {
                  (l = !0), (a[t + 1] = -1);
                  continue;
                }
                let c = n.map(e[t] + i),
                  d = c - o;
                if (d < 0 || d >= r.content.size) {
                  l = !0;
                  continue;
                }
                let u = n.map(e[t + 1] + i, -1) - o,
                  { index: h, offset: p } = r.content.findIndex(d),
                  f = r.maybeChild(h);
                if (f && p == d && p + f.nodeSize == u) {
                  let r = a[t + 2].mapInner(n, f, c + 1, e[t] + i + 1, s);
                  r != Hd
                    ? ((a[t] = d), (a[t + 1] = u), (a[t + 2] = r))
                    : ((a[t + 1] = -2), (l = !0));
                } else l = !0;
              }
            if (l) {
              let l = Yd(
                (function (e, t, n, r, o, i, s) {
                  for (let a = 0; a < e.length; a += 3)
                    -1 == e[a + 1] &&
                      (function e(t, i) {
                        for (let e = 0; e < t.local.length; e++) {
                          let a = t.local[e].map(r, o, i);
                          a
                            ? n.push(a)
                            : s.onRemove && s.onRemove(t.local[e].spec);
                        }
                        for (let n = 0; n < t.children.length; n += 3)
                          e(t.children[n + 2], t.children[n] + i + 1);
                      })(e[a + 2], t[a] + i + 1);
                  return n;
                })(a, e, t, n, o, i, s),
                r,
                0,
                s
              );
              t = l.local;
              for (let e = 0; e < a.length; e += 3)
                a[e + 1] < 0 && (a.splice(e, 3), (e -= 3));
              for (let e = 0, t = 0; e < l.children.length; e += 3) {
                let n = l.children[e];
                for (; t < a.length && a[t] < n; ) t += 3;
                a.splice(
                  t,
                  0,
                  l.children[e],
                  l.children[e + 1],
                  l.children[e + 2]
                );
              }
            }
            return new qd(t.sort(Xd), a);
          })(this.children, i || [], e, t, n, r, o)
        : i
        ? new qd(i.sort(Xd), Ud)
        : Hd;
    }
    add(e, t) {
      return t.length
        ? this == Hd
          ? qd.create(e, t)
          : this.addInner(e, t, 0)
        : this;
    }
    addInner(e, t, n) {
      let r,
        o = 0;
      e.forEach((e, i) => {
        let s,
          a = i + n;
        if ((s = Jd(t, e, a))) {
          for (r || (r = this.children.slice()); o < r.length && r[o] < i; )
            o += 3;
          r[o] == i
            ? (r[o + 2] = r[o + 2].addInner(e, s, a + 1))
            : r.splice(o, 0, i, i + e.nodeSize, Yd(s, e, a + 1, Zd)),
            (o += 3);
        }
      });
      let i = Wd(o ? Gd(t) : t, -n);
      for (let t = 0; t < i.length; t++)
        i[t].type.valid(e, i[t]) || i.splice(t--, 1);
      return new qd(
        i.length ? this.local.concat(i).sort(Xd) : this.local,
        r || this.children
      );
    }
    remove(e) {
      return 0 == e.length || this == Hd ? this : this.removeInner(e, 0);
    }
    removeInner(e, t) {
      let n = this.children,
        r = this.local;
      for (let r = 0; r < n.length; r += 3) {
        let o,
          i = n[r] + t,
          s = n[r + 1] + t;
        for (let t, n = 0; n < e.length; n++)
          (t = e[n]) &&
            t.from > i &&
            t.to < s &&
            ((e[n] = null), (o || (o = [])).push(t));
        if (!o) continue;
        n == this.children && (n = this.children.slice());
        let a = n[r + 2].removeInner(o, i + 1);
        a != Hd ? (n[r + 2] = a) : (n.splice(r, 3), (r -= 3));
      }
      if (r.length)
        for (let n, o = 0; o < e.length; o++)
          if ((n = e[o]))
            for (let e = 0; e < r.length; e++)
              r[e].eq(n, t) &&
                (r == this.local && (r = this.local.slice()), r.splice(e--, 1));
      return n == this.children && r == this.local
        ? this
        : r.length || n.length
        ? new qd(r, n)
        : Hd;
    }
    forChild(e, t) {
      let n, r;
      if (this == Hd) return this;
      if (t.isLeaf) return qd.empty;
      for (let t = 0; t < this.children.length; t += 3)
        if (this.children[t] >= e) {
          this.children[t] == e && (n = this.children[t + 2]);
          break;
        }
      let o = e + 1,
        i = o + t.content.size;
      for (let e = 0; e < this.local.length; e++) {
        let t = this.local[e];
        if (t.from < i && t.to > o && t.type instanceof Bd) {
          let e = Math.max(o, t.from) - o,
            n = Math.min(i, t.to) - o;
          e < n && (r || (r = [])).push(t.copy(e, n));
        }
      }
      if (r) {
        let e = new qd(r.sort(Xd), Ud);
        return n ? new Kd([e, n]) : e;
      }
      return n || Hd;
    }
    eq(e) {
      if (this == e) return !0;
      if (
        !(e instanceof qd) ||
        this.local.length != e.local.length ||
        this.children.length != e.children.length
      )
        return !1;
      for (let t = 0; t < this.local.length; t++)
        if (!this.local[t].eq(e.local[t])) return !1;
      for (let t = 0; t < this.children.length; t += 3)
        if (
          this.children[t] != e.children[t] ||
          this.children[t + 1] != e.children[t + 1] ||
          !this.children[t + 2].eq(e.children[t + 2])
        )
          return !1;
      return !0;
    }
    locals(e) {
      return Qd(this.localsInner(e));
    }
    localsInner(e) {
      if (this == Hd) return Ud;
      if (e.inlineContent || !this.local.some(Bd.is)) return this.local;
      let t = [];
      for (let e = 0; e < this.local.length; e++)
        this.local[e].type instanceof Bd || t.push(this.local[e]);
      return t;
    }
    forEachSet(e) {
      e(this);
    }
  }
  (qd.empty = new qd([], [])), (qd.removeOverlap = Qd);
  let Hd = qd.empty;
  class Kd {
    constructor(e) {
      this.members = e;
    }
    map(e, t) {
      let n = this.members.map((n) => n.map(e, t, Zd));
      return Kd.from(n);
    }
    forChild(e, t) {
      if (t.isLeaf) return qd.empty;
      let n = [];
      for (let r = 0; r < this.members.length; r++) {
        let o = this.members[r].forChild(e, t);
        o != Hd && (o instanceof Kd ? (n = n.concat(o.members)) : n.push(o));
      }
      return Kd.from(n);
    }
    eq(e) {
      if (!(e instanceof Kd) || e.members.length != this.members.length)
        return !1;
      for (let t = 0; t < this.members.length; t++)
        if (!this.members[t].eq(e.members[t])) return !1;
      return !0;
    }
    locals(e) {
      let t,
        n = !0;
      for (let r = 0; r < this.members.length; r++) {
        let o = this.members[r].localsInner(e);
        if (o.length)
          if (t) {
            n && ((t = t.slice()), (n = !1));
            for (let e = 0; e < o.length; e++) t.push(o[e]);
          } else t = o;
      }
      return t ? Qd(n ? t : t.sort(Xd)) : Ud;
    }
    static from(e) {
      switch (e.length) {
        case 0:
          return Hd;
        case 1:
          return e[0];
        default:
          return new Kd(
            e.every((e) => e instanceof qd)
              ? e
              : e.reduce(
                  (e, t) => e.concat(t instanceof qd ? t : t.members),
                  []
                )
          );
      }
    }
    forEachSet(e) {
      for (let t = 0; t < this.members.length; t++)
        this.members[t].forEachSet(e);
    }
  }
  function Wd(e, t) {
    if (!t || !e.length) return e;
    let n = [];
    for (let r = 0; r < e.length; r++) {
      let o = e[r];
      n.push(new Fd(o.from + t, o.to + t, o.type));
    }
    return n;
  }
  function Jd(e, t, n) {
    if (t.isLeaf) return null;
    let r = n + t.nodeSize,
      o = null;
    for (let t, i = 0; i < e.length; i++)
      (t = e[i]) &&
        t.from > n &&
        t.to < r &&
        ((o || (o = [])).push(t), (e[i] = null));
    return o;
  }
  function Gd(e) {
    let t = [];
    for (let n = 0; n < e.length; n++) null != e[n] && t.push(e[n]);
    return t;
  }
  function Yd(e, t, n, r) {
    let o = [],
      i = !1;
    t.forEach((t, s) => {
      let a = Jd(e, t, s + n);
      if (a) {
        i = !0;
        let e = Yd(a, t, n + s + 1, r);
        e != Hd && o.push(s, s + t.nodeSize, e);
      }
    });
    let s = Wd(i ? Gd(e) : e, -n).sort(Xd);
    for (let e = 0; e < s.length; e++)
      s[e].type.valid(t, s[e]) ||
        (r.onRemove && r.onRemove(s[e].spec), s.splice(e--, 1));
    return s.length || o.length ? new qd(s, o) : Hd;
  }
  function Xd(e, t) {
    return e.from - t.from || e.to - t.to;
  }
  function Qd(e) {
    let t = e;
    for (let n = 0; n < t.length - 1; n++) {
      let r = t[n];
      if (r.from != r.to)
        for (let o = n + 1; o < t.length; o++) {
          let i = t[o];
          if (i.from != r.from) {
            i.from < r.to &&
              (t == e && (t = e.slice()),
              (t[n] = r.copy(r.from, i.from)),
              eu(t, o, r.copy(i.from, r.to)));
            break;
          }
          i.to != r.to &&
            (t == e && (t = e.slice()),
            (t[o] = i.copy(i.from, r.to)),
            eu(t, o + 1, i.copy(r.to, i.to)));
        }
    }
    return t;
  }
  function eu(e, t, n) {
    for (; t < e.length && Xd(n, e[t]) > 0; ) t++;
    e.splice(t, 0, n);
  }
  function tu(e) {
    let t = [];
    return (
      e.someProp("decorations", (n) => {
        let r = n(e.state);
        r && r != Hd && t.push(r);
      }),
      e.cursorWrapper && t.push(qd.create(e.state.doc, [e.cursorWrapper.deco])),
      Kd.from(t)
    );
  }
  let nu = {
      childList: !0,
      characterData: !0,
      characterDataOldValue: !0,
      attributes: !0,
      attributeOldValue: !0,
      subtree: !0,
    },
    ru = Bl && jl <= 11;
  class ou {
    constructor() {
      (this.anchorNode = null),
        (this.anchorOffset = 0),
        (this.focusNode = null),
        (this.focusOffset = 0);
    }
    set(e) {
      (this.anchorNode = e.anchorNode),
        (this.anchorOffset = e.anchorOffset),
        (this.focusNode = e.focusNode),
        (this.focusOffset = e.focusOffset);
    }
    clear() {
      this.anchorNode = this.focusNode = null;
    }
    eq(e) {
      return (
        e.anchorNode == this.anchorNode &&
        e.anchorOffset == this.anchorOffset &&
        e.focusNode == this.focusNode &&
        e.focusOffset == this.focusOffset
      );
    }
  }
  class iu {
    constructor(e, t) {
      (this.view = e),
        (this.handleDOMChange = t),
        (this.queue = []),
        (this.flushingSoon = -1),
        (this.observer = null),
        (this.currentSelection = new ou()),
        (this.onCharData = null),
        (this.suppressingSelectionUpdates = !1),
        (this.lastChangedTextNode = null),
        (this.observer =
          window.MutationObserver &&
          new window.MutationObserver((e) => {
            for (let t = 0; t < e.length; t++) this.queue.push(e[t]);
            Bl &&
            jl <= 11 &&
            e.some(
              (e) =>
                ("childList" == e.type && e.removedNodes.length) ||
                ("characterData" == e.type &&
                  e.oldValue.length > e.target.nodeValue.length)
            )
              ? this.flushSoon()
              : this.flush();
          })),
        ru &&
          (this.onCharData = (e) => {
            this.queue.push({
              target: e.target,
              type: "characterData",
              oldValue: e.prevValue,
            }),
              this.flushSoon();
          }),
        (this.onSelectionChange = this.onSelectionChange.bind(this));
    }
    flushSoon() {
      this.flushingSoon < 0 &&
        (this.flushingSoon = window.setTimeout(() => {
          (this.flushingSoon = -1), this.flush();
        }, 20));
    }
    forceFlush() {
      this.flushingSoon > -1 &&
        (window.clearTimeout(this.flushingSoon),
        (this.flushingSoon = -1),
        this.flush());
    }
    start() {
      this.observer &&
        (this.observer.takeRecords(), this.observer.observe(this.view.dom, nu)),
        this.onCharData &&
          this.view.dom.addEventListener(
            "DOMCharacterDataModified",
            this.onCharData
          ),
        this.connectSelection();
    }
    stop() {
      if (this.observer) {
        let e = this.observer.takeRecords();
        if (e.length) {
          for (let t = 0; t < e.length; t++) this.queue.push(e[t]);
          window.setTimeout(() => this.flush(), 20);
        }
        this.observer.disconnect();
      }
      this.onCharData &&
        this.view.dom.removeEventListener(
          "DOMCharacterDataModified",
          this.onCharData
        ),
        this.disconnectSelection();
    }
    connectSelection() {
      this.view.dom.ownerDocument.addEventListener(
        "selectionchange",
        this.onSelectionChange
      );
    }
    disconnectSelection() {
      this.view.dom.ownerDocument.removeEventListener(
        "selectionchange",
        this.onSelectionChange
      );
    }
    suppressSelectionUpdates() {
      (this.suppressingSelectionUpdates = !0),
        setTimeout(() => (this.suppressingSelectionUpdates = !1), 50);
    }
    onSelectionChange() {
      if (qc(this.view)) {
        if (this.suppressingSelectionUpdates) return Pc(this.view);
        if (Bl && jl <= 11 && !this.view.state.selection.empty) {
          let e = this.view.domSelectionRange();
          if (
            e.focusNode &&
            Tl(e.focusNode, e.focusOffset, e.anchorNode, e.anchorOffset)
          )
            return this.flushSoon();
        }
        this.flush();
      }
    }
    setCurSelection() {
      this.currentSelection.set(this.view.domSelectionRange());
    }
    ignoreSelectionChange(e) {
      if (!e.focusNode) return !0;
      let t,
        n = new Set();
      for (let t = e.focusNode; t; t = El(t)) n.add(t);
      for (let r = e.anchorNode; r; r = El(r))
        if (n.has(r)) {
          t = r;
          break;
        }
      let r = t && this.view.docView.nearestDesc(t);
      return r &&
        r.ignoreMutation({
          type: "selection",
          target: 3 == t.nodeType ? t.parentNode : t,
        })
        ? (this.setCurSelection(), !0)
        : void 0;
    }
    pendingRecords() {
      if (this.observer)
        for (let e of this.observer.takeRecords()) this.queue.push(e);
      return this.queue;
    }
    flush() {
      var e;
      let { view: t } = this;
      if (!t.docView || this.flushingSoon > -1) return;
      let n = this.pendingRecords();
      n.length && (this.queue = []);
      let r = t.domSelectionRange(),
        o =
          !this.suppressingSelectionUpdates &&
          !this.currentSelection.eq(r) &&
          qc(t) &&
          !this.ignoreSelectionChange(r),
        i = -1,
        s = -1,
        a = !1,
        l = [];
      if (t.editable)
        for (let e = 0; e < n.length; e++) {
          let t = this.registerMutation(n[e], l);
          t &&
            ((i = i < 0 ? t.from : Math.min(t.from, i)),
            (s = s < 0 ? t.to : Math.max(t.to, s)),
            t.typeOver && (a = !0));
        }
      if (Fl && l.length) {
        let e = l.filter((e) => "BR" == e.nodeName);
        if (2 == e.length) {
          let [t, n] = e;
          t.parentNode && t.parentNode.parentNode == n.parentNode
            ? n.remove()
            : t.remove();
        } else {
          let { focusNode: n } = this.currentSelection;
          for (let r of e) {
            let e = r.parentNode;
            e &&
              "LI" == e.nodeName &&
              (!n ||
                (function (e, t) {
                  for (
                    let n = t.parentNode;
                    n && n != e.dom;
                    n = n.parentNode
                  ) {
                    let t = e.docView.nearestDesc(n, !0);
                    if (t && t.node.isBlock) return n;
                  }
                  return null;
                })(t, n) != e) &&
              r.remove();
          }
        }
      }
      let c = null;
      i < 0 &&
      o &&
      t.input.lastFocus > Date.now() - 200 &&
      Math.max(t.input.lastTouch, t.input.lastClick.time) < Date.now() - 300 &&
      Dl(r) &&
      (c = Ic(t)) &&
      c.eq(ao.near(t.state.doc.resolve(0), 1))
        ? ((t.input.lastFocus = 0),
          Pc(t),
          this.currentSelection.set(r),
          t.scrollToSelection())
        : (i > -1 || o) &&
          (i > -1 &&
            (t.docView.markDirty(i, s),
            (e = t),
            !su.has(e) &&
              (su.set(e, null),
              -1 !==
                ["normal", "nowrap", "pre-line"].indexOf(
                  getComputedStyle(e.dom).whiteSpace
                )) &&
              ((e.requiresGeckoHackNode = Fl),
              au ||
                (console.warn(
                  "ProseMirror expects the CSS white-space property to be set, preferably to 'pre-wrap'. It is recommended to load style/prosemirror.css from the prosemirror-view package."
                ),
                (au = !0)))),
          this.handleDOMChange(i, s, a, l),
          t.docView && t.docView.dirty
            ? t.updateState(t.state)
            : this.currentSelection.eq(r) || Pc(t),
          this.currentSelection.set(r));
    }
    registerMutation(e, t) {
      if (t.indexOf(e.target) > -1) return null;
      let n = this.view.docView.nearestDesc(e.target);
      if (
        ("attributes" == e.type &&
          (n == this.view.docView ||
            "contenteditable" == e.attributeName ||
            ("style" == e.attributeName &&
              !e.oldValue &&
              !e.target.getAttribute("style")))) ||
        !n ||
        n.ignoreMutation(e)
      )
        return null;
      if ("childList" == e.type) {
        for (let n = 0; n < e.addedNodes.length; n++) {
          let r = e.addedNodes[n];
          t.push(r), 3 == r.nodeType && (this.lastChangedTextNode = r);
        }
        if (
          n.contentDOM &&
          n.contentDOM != n.dom &&
          !n.contentDOM.contains(e.target)
        )
          return { from: n.posBefore, to: n.posAfter };
        let r = e.previousSibling,
          o = e.nextSibling;
        if (Bl && jl <= 11 && e.addedNodes.length)
          for (let t = 0; t < e.addedNodes.length; t++) {
            let { previousSibling: n, nextSibling: i } = e.addedNodes[t];
            (!n || 0 > Array.prototype.indexOf.call(e.addedNodes, n)) &&
              (r = n),
              (!i || 0 > Array.prototype.indexOf.call(e.addedNodes, i)) &&
                (o = i);
          }
        let i = r && r.parentNode == e.target ? Sl(r) + 1 : 0,
          s = n.localPosFromDOM(e.target, i, -1),
          a =
            o && o.parentNode == e.target ? Sl(o) : e.target.childNodes.length;
        return { from: s, to: n.localPosFromDOM(e.target, a, 1) };
      }
      return "attributes" == e.type
        ? { from: n.posAtStart - n.border, to: n.posAtEnd + n.border }
        : ((this.lastChangedTextNode = e.target),
          {
            from: n.posAtStart,
            to: n.posAtEnd,
            typeOver: e.target.nodeValue == e.oldValue,
          });
    }
  }
  let su = new WeakMap(),
    au = !1;
  function lu(e, t) {
    let n = t.startContainer,
      r = t.startOffset,
      o = t.endContainer,
      i = t.endOffset,
      s = e.domAtPos(e.state.selection.anchor);
    return (
      Tl(s.node, s.offset, o, i) && ([n, r, o, i] = [o, i, n, r]),
      { anchorNode: n, anchorOffset: r, focusNode: o, focusOffset: i }
    );
  }
  function cu(e) {
    let t = e.pmViewDesc;
    if (t) return t.parseRule();
    if ("BR" == e.nodeName && e.parentNode) {
      if (Hl && /^(ul|ol)$/i.test(e.parentNode.nodeName)) {
        let e = document.createElement("div");
        return e.appendChild(document.createElement("li")), { skip: e };
      }
      if (
        e.parentNode.lastChild == e ||
        (Hl && /^(tr|table)$/i.test(e.parentNode.nodeName))
      )
        return { ignore: !0 };
    } else if ("IMG" == e.nodeName && e.getAttribute("mark-placeholder"))
      return { ignore: !0 };
    return null;
  }
  let du =
    /^(a|abbr|acronym|b|bd[io]|big|br|button|cite|code|data(list)?|del|dfn|em|i|ins|kbd|label|map|mark|meter|output|q|ruby|s|samp|small|span|strong|su[bp]|time|u|tt|var)$/i;
  function uu(e, t, n) {
    return Math.max(n.anchor, n.head) > t.content.size
      ? null
      : Zc(e, t.resolve(n.anchor), t.resolve(n.head));
  }
  function hu(e, t, n) {
    let r = e.depth,
      o = t ? e.end() : e.pos;
    for (; r > 0 && (t || e.indexAfter(r) == e.node(r).childCount); )
      r--, o++, (t = !1);
    if (n) {
      let t = e.node(r).maybeChild(e.indexAfter(r));
      for (; t && !t.isLeaf; ) (t = t.firstChild), o++;
    }
    return o;
  }
  function pu(e) {
    if (2 != e.length) return !1;
    let t = e.charCodeAt(0),
      n = e.charCodeAt(1);
    return t >= 56320 && t <= 57343 && n >= 55296 && n <= 56319;
  }
  class fu {
    constructor(e, t) {
      (this._root = null),
        (this.focused = !1),
        (this.trackWrites = null),
        (this.mounted = !1),
        (this.markCursor = null),
        (this.cursorWrapper = null),
        (this.lastSelectedViewDesc = void 0),
        (this.input = new yd()),
        (this.prevDirectPlugins = []),
        (this.pluginViews = []),
        (this.requiresGeckoHackNode = !1),
        (this.dragging = null),
        (this._props = t),
        (this.state = t.state),
        (this.directPlugins = t.plugins || []),
        this.directPlugins.forEach(bu),
        (this.dispatch = this.dispatch.bind(this)),
        (this.dom = (e && e.mount) || document.createElement("div")),
        e &&
          (e.appendChild
            ? e.appendChild(this.dom)
            : "function" == typeof e
            ? e(this.dom)
            : e.mount && (this.mounted = !0)),
        (this.editable = vu(this)),
        gu(this),
        (this.nodeViews = yu(this)),
        (this.docView = kc(this.state.doc, mu(this), tu(this), this.dom, this)),
        (this.domObserver = new iu(this, (e, t, n, r) =>
          (function (e, t, n, r, o) {
            let i,
              s,
              a,
              l,
              c,
              d,
              u =
                e.input.compositionPendingChanges ||
                (e.composing ? e.input.compositionID : 0);
            if (((e.input.compositionPendingChanges = 0), t < 0)) {
              let t =
                  e.input.lastSelectionTime > Date.now() - 50
                    ? e.input.lastSelectionOrigin
                    : null,
                n = Ic(e, t);
              if (n && !e.state.selection.eq(n)) {
                if (
                  Zl &&
                  Gl &&
                  13 === e.input.lastKeyCode &&
                  Date.now() - 100 < e.input.lastKeyCodeTime &&
                  e.someProp("handleKeyDown", (t) => t(e, Rl(13, "Enter")))
                )
                  return;
                let r = e.state.tr.setSelection(n);
                "pointer" == t
                  ? r.setMeta("pointer", !0)
                  : "key" == t && r.scrollIntoView(),
                  u && r.setMeta("composition", u),
                  e.dispatch(r);
              }
              return;
            }
            let h = e.state.doc.resolve(t),
              p = h.sharedDepth(n);
            (t = h.before(p + 1)), (n = e.state.doc.resolve(n).after(p + 1));
            let f = e.state.selection,
              m = (function (e, t, n) {
                let r,
                  {
                    node: o,
                    fromOffset: i,
                    toOffset: s,
                    from: a,
                    to: l,
                  } = e.docView.parseRange(t, n),
                  c = e.domSelectionRange(),
                  d = c.anchorNode;
                if (
                  (d &&
                    e.dom.contains(1 == d.nodeType ? d : d.parentNode) &&
                    ((r = [{ node: d, offset: c.anchorOffset }]),
                    Dl(c) ||
                      r.push({ node: c.focusNode, offset: c.focusOffset })),
                  Zl && 8 === e.input.lastKeyCode)
                )
                  for (let e = s; e > i; e--) {
                    let t = o.childNodes[e - 1],
                      n = t.pmViewDesc;
                    if ("BR" == t.nodeName && !n) {
                      s = e;
                      break;
                    }
                    if (!n || n.size) break;
                  }
                let u = e.state.doc,
                  h = e.someProp("domParser") || pr.fromSchema(e.state.schema),
                  p = u.resolve(a),
                  f = null,
                  m = h.parse(o, {
                    topNode: p.parent,
                    topMatch: p.parent.contentMatchAt(p.index()),
                    topOpen: !0,
                    from: i,
                    to: s,
                    preserveWhitespace:
                      "pre" != p.parent.type.whitespace || "full",
                    findPositions: r,
                    ruleFromNode: cu,
                    context: p,
                  });
                if (r && null != r[0].pos) {
                  let e = r[0].pos,
                    t = r[1] && r[1].pos;
                  null == t && (t = e), (f = { anchor: e + a, head: t + a });
                }
                return { doc: m, sel: f, from: a, to: l };
              })(e, t, n),
              g = e.state.doc,
              v = g.slice(m.from, m.to);
            8 === e.input.lastKeyCode &&
            Date.now() - 100 < e.input.lastKeyCodeTime
              ? ((i = e.state.selection.to), (s = "end"))
              : ((i = e.state.selection.from), (s = "start")),
              (e.input.lastKeyCode = null);
            let y = (function (e, t, n, r, o) {
              let i = e.findDiffStart(t, n);
              if (null == i) return null;
              let { a: s, b: a } = e.findDiffEnd(t, n + e.size, n + t.size);
              if ("end" == o) {
                r -= s + Math.max(0, i - Math.min(s, a)) - i;
              }
              if (s < i && e.size < t.size) {
                let e = r <= i && r >= s ? i - r : 0;
                (i -= e) &&
                  i < t.size &&
                  pu(t.textBetween(i - 1, i + 1)) &&
                  (i += e ? 1 : -1),
                  (a = i + (a - s)),
                  (s = i);
              } else if (a < i) {
                let t = r <= i && r >= a ? i - r : 0;
                (i -= t) &&
                  i < e.size &&
                  pu(e.textBetween(i - 1, i + 1)) &&
                  (i += t ? 1 : -1),
                  (s = i + (s - a)),
                  (a = i);
              }
              return { start: i, endA: s, endB: a };
            })(v.content, m.doc.content, m.from, i, s);
            if (
              (y && e.input.domChangeCount++,
              ((Kl && e.input.lastIOSEnter > Date.now() - 225) || Gl) &&
                o.some((e) => 1 == e.nodeType && !du.test(e.nodeName)) &&
                (!y || y.endA >= y.endB) &&
                e.someProp("handleKeyDown", (t) => t(e, Rl(13, "Enter"))))
            )
              return void (e.input.lastIOSEnter = 0);
            if (!y) {
              if (
                !(
                  r &&
                  f instanceof ho &&
                  !f.empty &&
                  f.$head.sameParent(f.$anchor)
                ) ||
                e.composing ||
                (m.sel && m.sel.anchor != m.sel.head)
              ) {
                if (m.sel) {
                  let t = uu(e, e.state.doc, m.sel);
                  if (t && !t.eq(e.state.selection)) {
                    let n = e.state.tr.setSelection(t);
                    u && n.setMeta("composition", u), e.dispatch(n);
                  }
                }
                return;
              }
              y = { start: f.from, endA: f.to, endB: f.to };
            }
            e.state.selection.from < e.state.selection.to &&
              y.start == y.endB &&
              e.state.selection instanceof ho &&
              (y.start > e.state.selection.from &&
              y.start <= e.state.selection.from + 2 &&
              e.state.selection.from >= m.from
                ? (y.start = e.state.selection.from)
                : y.endA < e.state.selection.to &&
                  y.endA >= e.state.selection.to - 2 &&
                  e.state.selection.to <= m.to &&
                  ((y.endB += e.state.selection.to - y.endA),
                  (y.endA = e.state.selection.to))),
              Bl &&
                jl <= 11 &&
                y.endB == y.start + 1 &&
                y.endA == y.start &&
                y.start > m.from &&
                " Â " ==
                  m.doc.textBetween(
                    y.start - m.from - 1,
                    y.start - m.from + 1
                  ) &&
                (y.start--, y.endA--, y.endB--);
            let b = m.doc.resolveNoCache(y.start - m.from),
              w = m.doc.resolveNoCache(y.endB - m.from),
              k = g.resolve(y.start),
              x =
                b.sameParent(w) && b.parent.inlineContent && k.end() >= y.endA;
            if (
              ((Kl &&
                e.input.lastIOSEnter > Date.now() - 225 &&
                (!x ||
                  o.some((e) => "DIV" == e.nodeName || "P" == e.nodeName))) ||
                (!x &&
                  b.pos < m.doc.content.size &&
                  (!b.sameParent(w) || !b.parent.inlineContent) &&
                  (a = ao.findFrom(m.doc.resolve(b.pos + 1), 1, !0)) &&
                  a.head > b.pos)) &&
              e.someProp("handleKeyDown", (t) => t(e, Rl(13, "Enter")))
            )
              return void (e.input.lastIOSEnter = 0);
            if (
              e.state.selection.anchor > y.start &&
              (function (e, t, n, r, o) {
                if (n - t <= o.pos - r.pos || hu(r, !0, !1) < o.pos) return !1;
                let i = e.resolve(t);
                if (!r.parent.isTextblock) {
                  let e = i.nodeAfter;
                  return null != e && n == t + e.nodeSize;
                }
                if (
                  i.parentOffset < i.parent.content.size ||
                  !i.parent.isTextblock
                )
                  return !1;
                let s = e.resolve(hu(i, !0, !0));
                return (
                  !(!s.parent.isTextblock || s.pos > n || hu(s, !0, !1) < n) &&
                  r.parent.content.cut(r.parentOffset).eq(s.parent.content)
                );
              })(g, y.start, y.endA, b, w) &&
              e.someProp("handleKeyDown", (t) => t(e, Rl(8, "Backspace")))
            )
              return void (
                Gl &&
                Zl &&
                e.domObserver.suppressSelectionUpdates()
              );
            Zl && y.endB == y.start && (e.input.lastChromeDelete = Date.now()),
              Gl &&
                !x &&
                b.start() != w.start() &&
                0 == w.parentOffset &&
                b.depth == w.depth &&
                m.sel &&
                m.sel.anchor == m.sel.head &&
                m.sel.head == y.endA &&
                ((y.endB -= 2),
                (w = m.doc.resolveNoCache(y.endB - m.from)),
                setTimeout(() => {
                  e.someProp("handleKeyDown", function (t) {
                    return t(e, Rl(13, "Enter"));
                  });
                }, 20));
            let S = y.start,
              E = y.endA;
            if (x)
              if (b.pos == w.pos)
                Bl &&
                  jl <= 11 &&
                  0 == b.parentOffset &&
                  (e.domObserver.suppressSelectionUpdates(),
                  setTimeout(() => Pc(e), 20)),
                  (l = e.state.tr.delete(S, E)),
                  (c = g.resolve(y.start).marksAcross(g.resolve(y.endA)));
              else if (
                y.endA == y.endB &&
                (d = (function (e, t) {
                  let n,
                    r,
                    o,
                    i = e.firstChild.marks,
                    s = t.firstChild.marks,
                    a = i,
                    l = s;
                  for (let e = 0; e < s.length; e++) a = s[e].removeFromSet(a);
                  for (let e = 0; e < i.length; e++) l = i[e].removeFromSet(l);
                  if (1 == a.length && 0 == l.length)
                    (r = a[0]),
                      (n = "add"),
                      (o = (e) => e.mark(r.addToSet(e.marks)));
                  else {
                    if (0 != a.length || 1 != l.length) return null;
                    (r = l[0]),
                      (n = "remove"),
                      (o = (e) => e.mark(r.removeFromSet(e.marks)));
                  }
                  let c = [];
                  for (let e = 0; e < t.childCount; e++) c.push(o(t.child(e)));
                  if (Mn.from(c).eq(e)) return { mark: r, type: n };
                })(
                  b.parent.content.cut(b.parentOffset, w.parentOffset),
                  k.parent.content.cut(k.parentOffset, y.endA - k.start())
                ))
              )
                (l = e.state.tr),
                  "add" == d.type
                    ? l.addMark(S, E, d.mark)
                    : l.removeMark(S, E, d.mark);
              else if (
                b.parent.child(b.index()).isText &&
                b.index() == w.index() - !w.textOffset
              ) {
                let t = b.parent.textBetween(b.parentOffset, w.parentOffset);
                if (e.someProp("handleTextInput", (n) => n(e, S, E, t))) return;
                l = e.state.tr.insertText(t, S, E);
              }
            if (
              (l ||
                (l = e.state.tr.replace(
                  S,
                  E,
                  m.doc.slice(y.start - m.from, y.endB - m.from)
                )),
              m.sel)
            ) {
              let t = uu(e, l.doc, m.sel);
              t &&
                !(
                  (Zl &&
                    e.composing &&
                    t.empty &&
                    (y.start != y.endB ||
                      e.input.lastChromeDelete < Date.now() - 100) &&
                    (t.head == S || t.head == l.mapping.map(E) - 1)) ||
                  (Bl && t.empty && t.head == S)
                ) &&
                l.setSelection(t);
            }
            c && l.ensureMarks(c),
              u && l.setMeta("composition", u),
              e.dispatch(l.scrollIntoView());
          })(this, e, t, n, r)
        )),
        this.domObserver.start(),
        (function (e) {
          for (let t in md) {
            let n = md[t];
            e.dom.addEventListener(
              t,
              (e.input.eventHandlers[t] = (t) => {
                !(function (e, t) {
                  if (!t.bubbles) return !0;
                  if (t.defaultPrevented) return !1;
                  for (let n = t.target; n != e.dom; n = n.parentNode)
                    if (
                      !n ||
                      11 == n.nodeType ||
                      (n.pmViewDesc && n.pmViewDesc.stopEvent(t))
                    )
                      return !1;
                  return !0;
                })(e, t) ||
                  kd(e, t) ||
                  (!e.editable && t.type in gd) ||
                  n(e, t);
              }),
              vd[t] ? { passive: !0 } : void 0
            );
          }
          Hl && e.dom.addEventListener("input", () => null), wd(e);
        })(this),
        this.updatePluginViews();
    }
    get composing() {
      return this.input.composing;
    }
    get props() {
      if (this._props.state != this.state) {
        let e = this._props;
        for (let t in ((this._props = {}), e)) this._props[t] = e[t];
        this._props.state = this.state;
      }
      return this._props;
    }
    update(e) {
      e.handleDOMEvents != this._props.handleDOMEvents && wd(this);
      let t = this._props;
      (this._props = e),
        e.plugins && (e.plugins.forEach(bu), (this.directPlugins = e.plugins)),
        this.updateStateInner(e.state, t);
    }
    setProps(e) {
      let t = {};
      for (let e in this._props) t[e] = this._props[e];
      for (let n in ((t.state = this.state), e)) t[n] = e[n];
      this.update(t);
    }
    updateState(e) {
      this.updateStateInner(e, this._props);
    }
    updateStateInner(e, t) {
      var n, r, o;
      let i = this.state,
        s = !1,
        a = !1;
      e.storedMarks && this.composing && (Ad(this), (a = !0)), (this.state = e);
      let l = i.plugins != e.plugins || this._props.plugins != t.plugins;
      if (
        l ||
        this._props.plugins != t.plugins ||
        this._props.nodeViews != t.nodeViews
      ) {
        let e = yu(this);
        (function (e, t) {
          let n = 0,
            r = 0;
          for (let r in e) {
            if (e[r] != t[r]) return !0;
            n++;
          }
          for (let e in t) r++;
          return n != r;
        })(e, this.nodeViews) && ((this.nodeViews = e), (s = !0));
      }
      (l || t.handleDOMEvents != this._props.handleDOMEvents) && wd(this),
        (this.editable = vu(this)),
        gu(this);
      let c = tu(this),
        d = mu(this),
        u =
          i.plugins == e.plugins || i.doc.eq(e.doc)
            ? e.scrollToSelection > i.scrollToSelection
              ? "to selection"
              : "preserve"
            : "reset",
        h = s || !this.docView.matchesNode(e.doc, d, c);
      (h || !e.selection.eq(i.selection)) && (a = !0);
      let p =
        "preserve" == u &&
        a &&
        null == this.dom.style.overflowAnchor &&
        (function (e) {
          let t,
            n,
            r = e.dom.getBoundingClientRect(),
            o = Math.max(0, r.top);
          for (
            let i = (r.left + r.right) / 2, s = o + 1;
            s < Math.min(innerHeight, r.bottom);
            s += 5
          ) {
            let r = e.root.elementFromPoint(i, s);
            if (!r || r == e.dom || !e.dom.contains(r)) continue;
            let a = r.getBoundingClientRect();
            if (a.top >= o - 20) {
              (t = r), (n = a.top);
              break;
            }
          }
          return { refDOM: t, refTop: n, stack: tc(e.dom) };
        })(this);
      if (a) {
        let t, n, a;
        this.domObserver.stop();
        let l =
          h &&
          (Bl || Zl) &&
          !this.composing &&
          !i.selection.empty &&
          !e.selection.empty &&
          ((r = i.selection),
          (o = e.selection),
          (a = Math.min(
            r.$anchor.sharedDepth(r.head),
            o.$anchor.sharedDepth(o.head)
          )),
          r.$anchor.start(a) != o.$anchor.start(a));
        if (h) {
          let t = Zl
            ? (this.trackWrites = this.domSelectionRange().focusNode)
            : null;
          this.composing &&
            (this.input.compositionNode = (function (e) {
              let t = e.domSelectionRange();
              if (!t.focusNode) return null;
              let n = (function (e, t) {
                  for (;;) {
                    if (3 == e.nodeType && t) return e;
                    if (1 == e.nodeType && t > 0) {
                      if ("false" == e.contentEditable) return null;
                      t = Al((e = e.childNodes[t - 1]));
                    } else {
                      if (!e.parentNode || Ml(e)) return null;
                      (t = Sl(e)), (e = e.parentNode);
                    }
                  }
                })(t.focusNode, t.focusOffset),
                r = (function (e, t) {
                  for (;;) {
                    if (3 == e.nodeType && t < e.nodeValue.length) return e;
                    if (1 == e.nodeType && t < e.childNodes.length) {
                      if ("false" == e.contentEditable) return null;
                      (e = e.childNodes[t]), (t = 0);
                    } else {
                      if (!e.parentNode || Ml(e)) return null;
                      (t = Sl(e) + 1), (e = e.parentNode);
                    }
                  }
                })(t.focusNode, t.focusOffset);
              if (n && r && n != r) {
                let t = r.pmViewDesc,
                  o = e.domObserver.lastChangedTextNode;
                if (n == o || r == o) return o;
                if (!t || !t.isText(r.nodeValue)) return r;
                if (e.input.compositionNode == r) {
                  let e = n.pmViewDesc;
                  if (e && e.isText(n.nodeValue)) return r;
                }
              }
              return n || r;
            })(this)),
            (s || !this.docView.update(e.doc, d, c, this)) &&
              (this.docView.updateOuterDeco(d),
              this.docView.destroy(),
              (this.docView = kc(e.doc, d, c, this.dom, this))),
            t && !this.trackWrites && (l = !0);
        }
        l ||
        !(
          this.input.mouseDown &&
          this.domObserver.currentSelection.eq(this.domSelectionRange()) &&
          ((t = this.docView.domFromPos(this.state.selection.anchor, 0)),
          (n = this.domSelectionRange()),
          Tl(t.node, t.offset, n.anchorNode, n.anchorOffset))
        )
          ? Pc(this, l)
          : (Fc(this, e.selection), this.domObserver.setCurSelection()),
          this.domObserver.start();
      }
      this.updatePluginViews(i),
        (null == (n = this.dragging) ? void 0 : n.node) &&
          !i.doc.eq(e.doc) &&
          this.updateDraggedNode(this.dragging, i),
        "reset" == u
          ? (this.dom.scrollTop = 0)
          : "to selection" == u
          ? this.scrollToSelection()
          : p &&
            (function ({ refDOM: e, refTop: t, stack: n }) {
              let r = e ? e.getBoundingClientRect().top : 0;
              nc(n, 0 == r ? 0 : r - t);
            })(p);
    }
    scrollToSelection() {
      let e = this.domSelectionRange().focusNode;
      if (e && this.dom.contains(1 == e.nodeType ? e : e.parentNode))
        if (this.someProp("handleScrollToSelection", (e) => e(this)));
        else if (this.state.selection instanceof fo) {
          let t = this.docView.domAfterPos(this.state.selection.from);
          1 == t.nodeType && ec(this, t.getBoundingClientRect(), e);
        } else ec(this, this.coordsAtPos(this.state.selection.head, 1), e);
    }
    destroyPluginViews() {
      let e;
      for (; (e = this.pluginViews.pop()); ) e.destroy && e.destroy();
    }
    updatePluginViews(e) {
      if (
        e &&
        e.plugins == this.state.plugins &&
        this.directPlugins == this.prevDirectPlugins
      )
        for (let t = 0; t < this.pluginViews.length; t++) {
          let n = this.pluginViews[t];
          n.update && n.update(this, e);
        }
      else {
        (this.prevDirectPlugins = this.directPlugins),
          this.destroyPluginViews();
        for (let e = 0; e < this.directPlugins.length; e++) {
          let t = this.directPlugins[e];
          t.spec.view && this.pluginViews.push(t.spec.view(this));
        }
        for (let e = 0; e < this.state.plugins.length; e++) {
          let t = this.state.plugins[e];
          t.spec.view && this.pluginViews.push(t.spec.view(this));
        }
      }
    }
    updateDraggedNode(e, t) {
      let n = e.node,
        r = -1;
      if (this.state.doc.nodeAt(n.from) == n.node) r = n.from;
      else {
        let e = n.from + (this.state.doc.content.size - t.doc.content.size);
        (e > 0 && this.state.doc.nodeAt(e)) == n.node && (r = e);
      }
      this.dragging = new Id(
        e.slice,
        e.move,
        r < 0 ? void 0 : fo.create(this.state.doc, r)
      );
    }
    someProp(e, t) {
      let n,
        r = this._props && this._props[e];
      if (null != r && (n = t ? t(r) : r)) return n;
      for (let r = 0; r < this.directPlugins.length; r++) {
        let o = this.directPlugins[r].props[e];
        if (null != o && (n = t ? t(o) : o)) return n;
      }
      let o = this.state.plugins;
      if (o)
        for (let r = 0; r < o.length; r++) {
          let i = o[r].props[e];
          if (null != i && (n = t ? t(i) : i)) return n;
        }
    }
    hasFocus() {
      if (Bl) {
        let e = this.root.activeElement;
        if (e == this.dom) return !0;
        if (!e || !this.dom.contains(e)) return !1;
        for (; e && this.dom != e && this.dom.contains(e); ) {
          if ("false" == e.contentEditable) return !1;
          e = e.parentElement;
        }
        return !0;
      }
      return this.root.activeElement == this.dom;
    }
    focus() {
      this.domObserver.stop(),
        this.editable &&
          (function (e) {
            if (e.setActive) return e.setActive();
            if (rc) return e.focus(rc);
            let t = tc(e);
            e.focus(
              null == rc
                ? {
                    get preventScroll() {
                      return (rc = { preventScroll: !0 }), !0;
                    },
                  }
                : void 0
            ),
              rc || ((rc = !1), nc(t, 0));
          })(this.dom),
        Pc(this),
        this.domObserver.start();
    }
    get root() {
      let e = this._root;
      if (null == e)
        for (let e = this.dom.parentNode; e; e = e.parentNode)
          if (9 == e.nodeType || (11 == e.nodeType && e.host))
            return (
              e.getSelection ||
                (Object.getPrototypeOf(e).getSelection = () =>
                  e.ownerDocument.getSelection()),
              (this._root = e)
            );
      return e || document;
    }
    updateRoot() {
      this._root = null;
    }
    posAtCoords(e) {
      return (function (e, t) {
        var n;
        let r,
          o,
          i,
          s = e.dom.ownerDocument,
          a = 0,
          l = (function (e, t, n) {
            if (e.caretPositionFromPoint)
              try {
                let r = e.caretPositionFromPoint(t, n);
                if (r)
                  return {
                    node: r.offsetNode,
                    offset: Math.min(Al(r.offsetNode), r.offset),
                  };
              } catch (e) {}
            if (e.caretRangeFromPoint) {
              let r = e.caretRangeFromPoint(t, n);
              if (r)
                return {
                  node: r.startContainer,
                  offset: Math.min(Al(r.startContainer), r.startOffset),
                };
            }
          })(s, t.left, t.top);
        l && ({ node: i, offset: a } = l);
        let c = (e.root.elementFromPoint ? e.root : s).elementFromPoint(
          t.left,
          t.top
        );
        if (!c || !e.dom.contains(1 != c.nodeType ? c.parentNode : c)) {
          let n = e.dom.getBoundingClientRect();
          if (
            !oc(t, n) ||
            !(c = (function e(t, n, r) {
              let o = t.childNodes.length;
              if (o && r.top < r.bottom)
                for (
                  let i = Math.max(
                      0,
                      Math.min(
                        o - 1,
                        Math.floor((o * (n.top - r.top)) / (r.bottom - r.top)) -
                          2
                      )
                    ),
                    s = i;
                  ;

                ) {
                  let r = t.childNodes[s];
                  if (1 == r.nodeType) {
                    let t = r.getClientRects();
                    for (let o = 0; o < t.length; o++) {
                      let i = t[o];
                      if (oc(n, i)) return e(r, n, i);
                    }
                  }
                  if ((s = (s + 1) % o) == i) break;
                }
              return t;
            })(e.dom, t, n))
          )
            return null;
        }
        if (Hl) for (let e = c; i && e; e = El(e)) e.draggable && (i = void 0);
        if (
          ((c =
            (r = (n = c).parentNode) &&
            /^li$/i.test(r.nodeName) &&
            t.left < n.getBoundingClientRect().left
              ? r
              : n),
          i)
        ) {
          let n;
          if (
            Fl &&
            1 == i.nodeType &&
            (a = Math.min(a, i.childNodes.length)) < i.childNodes.length
          ) {
            let e,
              n = i.childNodes[a];
            "IMG" == n.nodeName &&
              (e = n.getBoundingClientRect()).right <= t.left &&
              e.bottom > t.top &&
              a++;
          }
          Yl &&
            a &&
            1 == i.nodeType &&
            1 == (n = i.childNodes[a - 1]).nodeType &&
            "false" == n.contentEditable &&
            n.getBoundingClientRect().top >= t.top &&
            a--,
            i == e.dom &&
            a == i.childNodes.length - 1 &&
            1 == i.lastChild.nodeType &&
            t.top > i.lastChild.getBoundingClientRect().bottom
              ? (o = e.state.doc.content.size)
              : (0 == a ||
                  1 != i.nodeType ||
                  "BR" != i.childNodes[a - 1].nodeName) &&
                (o = (function (e, t, n, r) {
                  let o = -1;
                  for (let n = t, i = !1; n != e.dom; ) {
                    let t,
                      s = e.docView.nearestDesc(n, !0);
                    if (!s) return null;
                    if (
                      1 == s.dom.nodeType &&
                      ((s.node.isBlock && s.parent) || !s.contentDOM) &&
                      ((t = s.dom.getBoundingClientRect()).width || t.height) &&
                      (s.node.isBlock &&
                        s.parent &&
                        ((!i && t.left > r.left) || t.top > r.top
                          ? (o = s.posBefore)
                          : ((!i && t.right < r.left) || t.bottom < r.top) &&
                            (o = s.posAfter),
                        (i = !0)),
                      !s.contentDOM && o < 0 && !s.node.isText)
                    )
                      return (
                        s.node.isBlock
                          ? r.top < (t.top + t.bottom) / 2
                          : r.left < (t.left + t.right) / 2
                      )
                        ? s.posBefore
                        : s.posAfter;
                    n = s.dom.parentNode;
                  }
                  return o > -1 ? o : e.docView.posFromDOM(t, n, -1);
                })(e, i, a, t));
        }
        null == o &&
          (o = (function (e, t, n) {
            let { node: r, offset: o } = (function e(t, n) {
                let r,
                  o,
                  i,
                  s,
                  a = 2e8,
                  l = 0,
                  c = n.top,
                  d = n.top;
                for (let e = t.firstChild, u = 0; e; e = e.nextSibling, u++) {
                  let t;
                  if (1 == e.nodeType) t = e.getClientRects();
                  else {
                    if (3 != e.nodeType) continue;
                    t = Cl(e).getClientRects();
                  }
                  for (let h = 0; h < t.length; h++) {
                    let p = t[h];
                    if (p.top <= c && p.bottom >= d) {
                      (c = Math.max(p.bottom, c)), (d = Math.min(p.top, d));
                      let t =
                        p.left > n.left
                          ? p.left - n.left
                          : p.right < n.left
                          ? n.left - p.right
                          : 0;
                      if (t < a) {
                        (i = e),
                          (a = t),
                          (s =
                            t && 3 == i.nodeType
                              ? {
                                  left: p.right < n.left ? p.right : p.left,
                                  top: n.top,
                                }
                              : n),
                          1 == e.nodeType &&
                            t &&
                            (l = u + +(n.left >= (p.left + p.right) / 2));
                        continue;
                      }
                    } else
                      p.top > n.top &&
                        !r &&
                        p.left <= n.left &&
                        p.right >= n.left &&
                        ((r = e),
                        (o = {
                          left: Math.max(p.left, Math.min(p.right, n.left)),
                          top: p.top,
                        }));
                    !i &&
                      ((n.left >= p.right && n.top >= p.top) ||
                        (n.left >= p.left && n.top >= p.bottom)) &&
                      (l = u + 1);
                  }
                }
                return (
                  !i && r && ((i = r), (s = o), (a = 0)),
                  i && 3 == i.nodeType
                    ? (function (e, t) {
                        let n = e.nodeValue.length,
                          r = document.createRange();
                        for (let o = 0; o < n; o++) {
                          r.setEnd(e, o + 1), r.setStart(e, o);
                          let n = sc(r, 1);
                          if (n.top != n.bottom && oc(t, n))
                            return {
                              node: e,
                              offset: o + +(t.left >= (n.left + n.right) / 2),
                            };
                        }
                        return { node: e, offset: 0 };
                      })(i, s)
                    : !i || (a && 1 == i.nodeType)
                    ? { node: t, offset: l }
                    : e(i, s)
                );
              })(t, n),
              i = -1;
            if (1 == r.nodeType && !r.firstChild) {
              let e = r.getBoundingClientRect();
              i = e.left != e.right && n.left > (e.left + e.right) / 2 ? 1 : -1;
            }
            return e.docView.posFromDOM(r, o, i);
          })(e, c, t));
        let d = e.docView.nearestDesc(c, !0);
        return { pos: o, inside: d ? d.posAtStart - d.border : -1 };
      })(this, e);
    }
    coordsAtPos(e, t = 1) {
      return lc(this, e, t);
    }
    domAtPos(e, t = 0) {
      return this.docView.domFromPos(e, t);
    }
    nodeDOM(e) {
      let t = this.docView.descAt(e);
      return t ? t.nodeDOM : null;
    }
    posAtDOM(e, t, n = -1) {
      let r = this.docView.posFromDOM(e, t, n);
      if (null == r) throw RangeError("DOM position not inside the editor");
      return r;
    }
    endOfTextblock(e, t) {
      return (function (e, t, n) {
        let r, o;
        return pc == t && fc == n
          ? mc
          : ((pc = t),
            (fc = n),
            (mc =
              "up" == n || "down" == n
                ? ((r = t.selection),
                  (o = "up" == n ? r.$from : r.$to),
                  uc(e, t, () => {
                    let { node: t } = e.docView.domFromPos(
                      o.pos,
                      "up" == n ? -1 : 1
                    );
                    for (;;) {
                      let n = e.docView.nearestDesc(t, !0);
                      if (!n) break;
                      if (n.node.isBlock) {
                        t = n.contentDOM || n.dom;
                        break;
                      }
                      t = n.dom.parentNode;
                    }
                    let r = lc(e, o.pos, 1);
                    for (let e = t.firstChild; e; e = e.nextSibling) {
                      let t;
                      if (1 == e.nodeType) t = e.getClientRects();
                      else {
                        if (3 != e.nodeType) continue;
                        t = Cl(e, 0, e.nodeValue.length).getClientRects();
                      }
                      for (let e = 0; e < t.length; e++) {
                        let o = t[e];
                        if (
                          o.bottom > o.top + 1 &&
                          ("up" == n
                            ? r.top - o.top > 2 * (o.bottom - r.top)
                            : o.bottom - r.bottom > 2 * (r.bottom - o.top))
                        )
                          return !1;
                      }
                    }
                    return !0;
                  }))
                : (function (e, t, n) {
                    let { $head: r } = t.selection;
                    if (!r.parent.isTextblock) return !1;
                    let o = r.parentOffset,
                      i = o == r.parent.content.size,
                      s = e.domSelection();
                    return s
                      ? hc.test(r.parent.textContent) && s.modify
                        ? uc(e, t, () => {
                            let {
                                focusNode: t,
                                focusOffset: o,
                                anchorNode: i,
                                anchorOffset: a,
                              } = e.domSelectionRange(),
                              l = s.caretBidiLevel;
                            s.modify("move", n, "character");
                            let c = r.depth
                                ? e.docView.domAfterPos(r.before())
                                : e.dom,
                              { focusNode: d, focusOffset: u } =
                                e.domSelectionRange(),
                              h =
                                (d &&
                                  !c.contains(
                                    1 == d.nodeType ? d : d.parentNode
                                  )) ||
                                (t == d && o == u);
                            try {
                              s.collapse(i, a),
                                t &&
                                  (t != i || o != a) &&
                                  s.extend &&
                                  s.extend(t, o);
                            } catch (e) {}
                            return null != l && (s.caretBidiLevel = l), h;
                          })
                        : "left" == n || "backward" == n
                        ? !o
                        : i
                      : r.pos == r.start() || r.pos == r.end();
                  })(e, t, n)));
      })(this, t || this.state, e);
    }
    pasteHTML(e, t) {
      return Rd(this, "", e, !1, t || new ClipboardEvent("paste"));
    }
    pasteText(e, t) {
      return Rd(this, e, null, !0, t || new ClipboardEvent("paste"));
    }
    serializeForClipboard(e) {
      return id(this, e);
    }
    destroy() {
      if (this.docView) {
        for (let e in (this.domObserver.stop(), this.input.eventHandlers))
          this.dom.removeEventListener(e, this.input.eventHandlers[e]);
        clearTimeout(this.input.composingTimeout),
          clearTimeout(this.input.lastIOSEnterFallbackTimeout),
          this.destroyPluginViews(),
          this.mounted
            ? (this.docView.update(this.state.doc, [], tu(this), this),
              (this.dom.textContent = ""))
            : this.dom.parentNode && this.dom.parentNode.removeChild(this.dom),
          this.docView.destroy(),
          (this.docView = null),
          (_l = null);
      }
    }
    get isDestroyed() {
      return null == this.docView;
    }
    dispatchEvent(e) {
      !kd(this, e) &&
        md[e.type] &&
        (this.editable || !(e.type in gd)) &&
        md[e.type](this, e);
    }
    dispatch(e) {
      let t = this._props.dispatchTransaction;
      t ? t.call(this, e) : this.updateState(this.state.apply(e));
    }
    domSelectionRange() {
      let e = this.domSelection();
      return e
        ? (Hl &&
            11 === this.root.nodeType &&
            (function (e) {
              let t = e.activeElement;
              for (; t && t.shadowRoot; ) t = t.shadowRoot.activeElement;
              return t;
            })(this.dom.ownerDocument) == this.dom &&
            (function (e, t) {
              let n;
              if (t.getComposedRanges) {
                let n = t.getComposedRanges(e.root)[0];
                if (n) return lu(e, n);
              }
              function r(e) {
                e.preventDefault(),
                  e.stopImmediatePropagation(),
                  (n = e.getTargetRanges()[0]);
              }
              return (
                e.dom.addEventListener("beforeinput", r, !0),
                document.execCommand("indent"),
                e.dom.removeEventListener("beforeinput", r, !0),
                n ? lu(e, n) : null
              );
            })(this, e)) ||
            e
        : {
            focusNode: null,
            focusOffset: 0,
            anchorNode: null,
            anchorOffset: 0,
          };
    }
    domSelection() {
      return this.root.getSelection();
    }
  }
  function mu(e) {
    let t = Object.create(null);
    return (
      (t.class = "ProseMirror"),
      (t.contenteditable = String(e.editable)),
      e.someProp("attributes", (n) => {
        if (("function" == typeof n && (n = n(e.state)), n))
          for (let e in n)
            "class" == e
              ? (t.class += " " + n[e])
              : "style" == e
              ? (t.style = (t.style ? t.style + ";" : "") + n[e])
              : t[e] ||
                "contenteditable" == e ||
                "nodeName" == e ||
                (t[e] = String(n[e]));
      }),
      t.translate || (t.translate = "no"),
      [Fd.node(0, e.state.doc.content.size, t)]
    );
  }
  function gu(e) {
    if (e.markCursor) {
      let t = document.createElement("img");
      (t.className = "ProseMirror-separator"),
        t.setAttribute("mark-placeholder", "true"),
        t.setAttribute("alt", ""),
        (e.cursorWrapper = {
          dom: t,
          deco: Fd.widget(e.state.selection.from, t, {
            raw: !0,
            marks: e.markCursor,
          }),
        });
    } else e.cursorWrapper = null;
  }
  function vu(e) {
    return !e.someProp("editable", (t) => !1 === t(e.state));
  }
  function yu(e) {
    let t = Object.create(null);
    function n(e) {
      for (let n in e)
        Object.prototype.hasOwnProperty.call(t, n) || (t[n] = e[n]);
    }
    return e.someProp("nodeViews", n), e.someProp("markViews", n), t;
  }
  function bu(e) {
    if (e.spec.state || e.spec.filterTransaction || e.spec.appendTransaction)
      throw RangeError(
        "Plugins passed directly to the view must not have a state component"
      );
  }
  new Map();
  var wu = {},
    ku = function (e) {
      var t,
        n = new Set(),
        r = function (e, r) {
          var o = "function" == typeof e ? e(t) : e;
          if (!Object.is(o, t)) {
            var i = t;
            (t = (null != r ? r : "object" != typeof o || null === o)
              ? o
              : Object.assign({}, t, o)),
              n.forEach(function (e) {
                return e(t, i);
              });
          }
        },
        o = function () {
          return t;
        },
        i = {
          setState: r,
          getState: o,
          getInitialState: function () {
            return s;
          },
          subscribe: function (e) {
            return (
              n.add(e),
              function () {
                return n.delete(e);
              }
            );
          },
          destroy: function () {
            n.clear();
          },
        },
        s = (t = e(r, o, i));
      return i;
    },
    xu = function (e) {
      return e ? ku(e) : ku;
    },
    Su = function (e) {
      return xu(e);
    };
  (wu.createStore = xu),
    (wu.default = Su),
    ((wu = Su).createStore = xu),
    (wu.default = wu);
  let Eu = ({ set: e }, t) => {
      e((e) => ({ ...e, editor: t }));
    },
    _u = ({ set: e }, { mode: t }) => {
      e((e) => {
        let n = t === m.EDIT || t === m.PREVIEW;
        return { ...e, mode: t, isInEditor: n };
      });
    },
    Cu = ({ set: e }, t) => {
      e((e) => ({ ...e, prefix: t }));
    },
    Tu = (0, wu.createStore)(
      ((i = (e, t) => ({
        mode: m.PREVIEW,
        isInEditor: !1,
        prefix: null,
        editor: null,
        setMode: _u.bind(null, { get: t, set: e }),
        setPrefix: Cu.bind(null, { get: t, set: e }),
        setEditor: Eu.bind(null, { get: t, set: e }),
      })),
      function (e, t, n) {
        var r = n.subscribe;
        return (
          (n.subscribe = function (e, t, o) {
            var i = e;
            if (t) {
              var s = (null == o ? void 0 : o.equalityFn) || Object.is,
                a = e(n.getState());
              (i = function (n) {
                var r = e(n);
                if (!s(a, r)) {
                  var o = a;
                  t((a = r), o);
                }
              }),
                null != o && o.fireImmediately && t(a, a);
            }
            return r(i);
          }),
          i(e, t)
        );
      })
    ),
    Ou = (e, t) => {
      e.editable && (t.preventDefault(), t.stopImmediatePropagation());
    },
    Nu = (e, t) => {
      "Escape" === t.key && e.dom.blur();
    },
    Au = new Map(),
    Mu = ({ target: e, state: t, options: n }) => {
      var r, o;
      let i,
        { editable: s } = n,
        a = null != (r = e.innerHTML) ? r : "",
        l = Au.get(s.id);
      return (
        l && document.body.contains(l.dom)
          ? ((i = l).updateState(t),
            i.setProps({
              ...i.props,
              editable: () => !0,
              attributes: { id: null != (o = e.id) ? o : s.id, class: _a },
            }))
          : ((i = new fu(
              { mount: e },
              {
                state: t,
                attributes: { class: _a },
                handleDOMEvents: {
                  keyup: Nu,
                  blur: (...e) =>
                    ((e, t, n, r) => {
                      var o, i;
                      let s = t.relatedTarget;
                      if (s && s.closest(`#${Ea}`)) return;
                      e.setProps({
                        ...e.props,
                        editable: () => !1,
                        attributes: { class: "" },
                      });
                      let { editor: a } = Tu.getState(),
                        l = t.target,
                        c =
                          null != (o = null == l ? void 0 : l.innerHTML)
                            ? o
                            : "";
                      null == a ||
                        a.closeRTE({
                          editable: n,
                          isModified: r !== (null == l ? void 0 : l.innerHTML),
                          newContent: {
                            html: c,
                            text:
                              null != (i = null == l ? void 0 : l.textContent)
                                ? i
                                : "",
                          },
                        });
                    })(...e, s, a),
                  navigate: Ou,
                },
              }
            )),
            Au.set(s.id, i),
            l && l.destroy()),
        i
      );
    },
    Du = (e) => e.preventDefault(),
    Ru = () => {
      var e;
      null == (e = window.navigation) || e.removeEventListener("navigate", Du);
    },
    $u = ({ editable: e, config: t }, n = 0) => {
      var r;
      if (!window.tinymce)
        return void (
          n < 3 && setTimeout(() => $u({ editable: e, config: t }, n + 1), 100)
        );
      null == t || delete t.selector;
      let o = null == (r = e.copyInfo) ? void 0 : r.copyIndex,
        i = o
          ? document.querySelectorAll(e.selector)[o]
          : document.querySelector(e.selector);
      i &&
        (!t.toolbar || t.useProse
          ? ((e, t) => {
              let n = xl(e, t),
                r = Mu({ target: e, state: n, options: t });
              (window.view = r), r.focus();
            })(i, { editable: e, config: t })
          : window.tinymce.init({
              ...t,
              target: i,
              setup: (t) => {
                t.on("init", () => {
                  window.tinymce.activeEditor.focus(!1),
                    (() => {
                      var e;
                      null == (e = window.navigation) ||
                        e.addEventListener("navigate", Du);
                    })();
                }),
                  t.on("keyup", (e) => "Escape" === e.key && e.target.blur()),
                  t.on("blur", (n) => {
                    ((e, t) => {
                      var n;
                      let { editor: r } = Tu.getState(),
                        { bodyElement: o, startContent: i } = e.target,
                        s = window.tinymce.activeEditor.getContent();
                      null == r ||
                        r.closeRTE({
                          editable: t,
                          isModified: i !== s,
                          newContent: {
                            html: s,
                            text: null != (n = o.textContent) ? n : "",
                          },
                        });
                    })(n, e),
                      ((e, t) => {
                        e.preventDefault(),
                          e.stopImmediatePropagation(),
                          t.remove(),
                          Ru();
                      })(n, t);
                  });
              },
            }));
    },
    Iu = (e, t, n, r) => {
      var o, i;
      let s,
        a = new CustomEvent(e, { bubbles: !0, detail: n });
      if (t) {
        let e =
          null == (o = null == r ? void 0 : r.copyInfo) ? void 0 : o.copyIndex;
        s = e ? document.querySelectorAll(t)[e] : document.querySelector(t);
      }
      return (
        null == (i = null != s ? s : document.body) || i.dispatchEvent(a), !!s
      );
    },
    zu = {
      getDocumentProperties: (e) =>
        e.reduce((e, t) => {
          var n;
          return { ...e, [t]: null != (n = document[t]) ? n : null };
        }, {}),
      getDefinitions: async () => {
        let e = {},
          t = document.querySelectorAll(`script[type^="${Nn}"]`);
        return (
          await Promise.all(
            [...t].map(async ({ type: t, src: n, innerText: r }) => {
              let o = t.replace(Nn, "").replace("+json", ""),
                i = r
                  ? ((e) => {
                      try {
                        return JSON.parse(e);
                      } catch (e) {
                        return console.log("Cors parseDefinitions", e), null;
                      }
                    })(r)
                  : await (async (e) => {
                      try {
                        return await fetch(e).then((e) => e.json());
                      } catch (e) {
                        return console.log("Cors fetchDefinitions", e), null;
                      }
                    })(n);
              e[o] = i;
            })
          ),
          e
        );
      },
      triggerEvent: Iu,
      openRTE: $u,
    },
    Pu = ({ selector: e, classNames: t, operation: n = "toggle" }) => {
      let r = document.querySelector(e);
      if (r) for (let e of t) r.classList[n](e);
    },
    Vu = (e) => {
      let { mode: t, setMode: n } = Tu.getState();
      Pu({ selector: "html", classNames: [On[e]], operation: "add" }),
        t !== e &&
          (Pu({ selector: "html", classNames: [On[t]], operation: "remove" }),
          n({ mode: e }));
    },
    Lu = ({
      container: e,
      beforeSelector: t,
      refresh: n,
      element: r,
      attributes: o,
    }) => {
      r && e
        ? (o &&
            Object.entries(o).forEach(([e, t]) => {
              r.setAttribute(e, t);
            }),
          ((e, t, n) => {
            n ? document.querySelector(n).before(e) : t.appendChild(e);
          })(r, e, t))
        : n && window.location.reload();
    },
    Bu = () => {
      document.addEventListener(Yt.EVENT_CONTENT_MOVE, (e) => {
        let { prefix: t } = Tu.getState(),
          { component: n, before: r, from: o, to: i } = e.detail,
          s = e.target,
          a = `[${t}${V.RESOURCE}="${n}"]`,
          l = document.querySelector(a),
          c = l.getAttribute(`${t}${V.RESOURCE}`),
          d = {};
        if (o !== i && (null == c ? void 0 : c.includes(o))) {
          let e = null == c ? void 0 : c.replace(o, "");
          Object.assign(d, { [`${t}${V.RESOURCE}`]: `${i}${e}` });
        }
        Lu({
          container: s,
          element: l,
          beforeSelector: r ? `[${t}${V.RESOURCE}="${r}"]` : void 0,
          attributes: d,
        });
      }),
        document.addEventListener(Yt.EVENT_UI_SELECT, (e) => {
          let t = e.target;
          t &&
            e.detail.selected &&
            (t.scrollIntoViewIfNeeded
              ? t.scrollIntoViewIfNeeded()
              : t.scrollIntoView({ block: "nearest" }));
        }),
        document.addEventListener(Yt.EVENT_CONTENT_PATCH, (e) => {
          var t;
          let { prefix: n } = Tu.getState(),
            { request: r, patch: o } = null == e ? void 0 : e.detail,
            i = document.querySelector(
              `[${n}${V.RESOURCE}="${
                null == (t = null == r ? void 0 : r.target)
                  ? void 0
                  : t.resource
              }"]`
            ),
            s = null == i ? void 0 : i.getAttribute(`${n}${V.PROP}`);
          if (
            (i &&
              o.name &&
              s !== o.name &&
              (i = i.querySelector(`[${n}${V.PROP}='${o.name}']`)),
            !i)
          )
            return void window.location.reload();
          let a = i.getAttribute(`${n}${V.TYPE}`);
          a === v.MEDIA
            ? (i.src = o.value)
            : a === v.TEXT || a === v.RICHTEXT
            ? (i.innerHTML = o.value)
            : window.location.reload();
        }),
        document.addEventListener(Yt.EVENT_CONTENT_UPDATE, (e) => {
          let { prefix: t } = Tu.getState(),
            n = e.target,
            r = n.getAttribute(`${t}${V.TYPE}`);
          if (!n || r !== v.MEDIA) return;
          let { value: o } = null == e ? void 0 : e.detail;
          n.src = o;
        }),
        document.addEventListener(Yt.EVENT_CONTENT_REMOVE, (e) => {
          var t;
          let n =
            null == (t = null == e ? void 0 : e.detail) ? void 0 : t.resource;
          if (!n) return;
          let { prefix: r } = Tu.getState(),
            o = document.querySelector(`[${r}${V.RESOURCE}="${n}"]`);
          o && o.remove();
        }),
        document.addEventListener(Yt.EVENT_CONTENT_ADD, () => {
          window.location.reload();
        }),
        document.addEventListener(Yt.EVENT_UI_EDIT, () => {
          Vu(m.EDIT);
        }),
        document.addEventListener(Yt.EVENT_UI_PREVIEW, () => {
          Vu(m.PREVIEW);
        }),
        document.addEventListener(Yt.EVENT_CONTENT_COPY, (e) => {
          var t;
          let {
              source: n,
              target: r,
              response: o,
            } = null == e ? void 0 : e.detail,
            i = e.target;
          if (!n || !r || !i) return;
          let { prefix: s } = Tu.getState(),
            a = i.cloneNode(!0);
          a.setAttribute(`${s}${V.RESOURCE}`, null == o ? void 0 : o.resource),
            a.setAttribute(`${s}${V.LABEL}`, null != (t = r.newName) ? t : ""),
            n.container === r.container &&
              Lu({
                container: i.parentElement,
                element: a,
                beforeSelector: r.before
                  ? `[${s}${V.RESOURCE}="${r.before}"]`
                  : void 0,
              });
        });
    };
  (async () => {
    let e = P({ methods: zu }),
      t = await e.promise;
    Tu.getState().setEditor(t), Bu();
    let n = (() => {
      let e = document.querySelector(Yt.META_NAMESPACE);
      return (null == e ? void 0 : e.content)
        ? `data-${e.content}-`
        : Yt.DEFAULT_PREFIX;
    })();
    Tu.getState().setPrefix(n),
      (async (e) => {
        var t;
        let n = document.createElement("script"),
          r = await (null == (t = e.getRTEStylesheet) ? void 0 : t.call(e));
        if (
          ((n.id = "tiny-mce-script"),
          (n.src = Yt.RTE_URL),
          document.body.appendChild(n),
          r)
        ) {
          let e = document.createElement("link");
          (e.rel = "stylesheet"), (e.href = r), document.head.appendChild(e);
        }
      })(t),
      Iu(Yt.EVENT_APP_INITIALIZED),
      Sn({ editor: t, prefix: n }),
      En({ editor: t }),
      _n({ editor: t }),
      Cn({ editor: t }),
      Tn(),
      t.trackCorsVersion({ version: "3.4.0" });
  })();
})();
