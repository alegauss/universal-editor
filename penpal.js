const Penpal = {
    Call: "call",
    Reply: "reply",
    Syn: "syn",
    SynAck: "synAck",
    Ack: "ack",
};

const Resolution = {
    Fulfilled: "fulfilled",
    Rejected: "rejected",
};

const ErrorCodes = {
    ConnectionDestroyed: "ConnectionDestroyed",
    ConnectionTimeout: "ConnectionTimeout",
    NoIframeSrc: "NoIframeSrc",
};

const DataCloneError = {
    DataCloneError: "DataCloneError",
};

const Message = {
    Message: "message",
};

let callId = 0;

const serializeError = ({ name, message, stack }) => ({
    name,
    message,
    stack,
});

const receiveCall = (e, t, n) => {
    const {
        localName: r,
        local: o,
        remote: i,
        originForSending: s,
        originForReceiving: c,
    } = e;
    let h = !1;
    const p = (e) => {
        if (e.source !== i || e.data.penpal !== Penpal.Call) return;
        if ("*" !== c && e.origin !== c)
            return void n(
                `${r} received message from origin ${e.origin} which did not match expected origin ${c}`
            );
        const { methodName: o, args: u, id: p } = e.data;
        n(`${r}: Received ${o}() call`);
        const f = (e) => (t) => {
            if ((n(`${r}: Sending ${o}() reply`), h))
                return void n(
                    `${r}: Unable to send ${o}() reply due to destroyed connection`
                );
            const c = {
                penpal: Penpal.Reply,
                id: p,
                resolution: e,
                returnValue: t,
            };
            if (e === Resolution.Rejected && t instanceof Error) {
                c.returnValue = serializeError(t);
                c.returnValueIsError = !0;
            }
            try {
                i.postMessage(c, s);
            } catch (e) {
                if (e.name === DataCloneError.DataCloneError) {
                    const t = {
                        penpal: Penpal.Reply,
                        id: p,
                        resolution: Resolution.Rejected,
                        returnValue: serializeError(e),
                        returnValueIsError: !0,
                    };
                    i.postMessage(t, s);
                }
                throw e;
            }
        };
        new Promise((e) => e(t[o].apply(t, u))).then(
            f(Resolution.Fulfilled),
            f(Resolution.Rejected)
        );
    };
    o.addEventListener(Message.Message, p);
    return () => {
        h = !0;
        o.removeEventListener(Message.Message, p);
    };
};

const getMethods = (e) => (e ? e.split(".") : []);

const createMethodProxy = (e, t, n) => {
    const r = getMethods(t);
    r.reduce(
        (e, t, o) => {
            if (e[t] === void 0) {
                e[t] = {};
            }
            if (o === r.length - 1) {
                e[t] = n;
            }
            return e[t];
        },
        e
    );
    return e;
};

const serializeMethods = (e, t) => {
    const n = {};
    Object.keys(e).forEach((r) => {
        const o = e[r];
        const i = ((e, t) => {
            const n = getMethods(t || "");
            n.push(e);
            return ((e) => e.join("."))(n);
        })(r, t);
        if (typeof o === "object") {
            Object.assign(n, serializeMethods(o, i));
        }
        if (typeof o === "function") {
            n[i] = o;
        }
    });
    return n;
};

const sendCall = (e, t, n, r, o) => {
    const {
        localName: i,
        local: s,
        remote: d,
        originForSending: h,
        originForReceiving: p,
    } = t;
    let f = !1;
    o(`${i}: Connecting call sender`);
    const m = (e) => (...t) => {
        let n;
        o(`${i}: Sending ${e}() call`);
        try {
            if (d.closed) {
                n = !0;
            }
        } catch (e) {
            n = !0;
        }
        if (n) {
            r();
        }
        if (f) {
            const t = new Error(
                `Unable to send ${e}() call due to destroyed connection`
            );
            t.code = ErrorCodes.ConnectionDestroyed;
            throw t;
        }
        return new Promise((n, r) => {
            const c = ++callId;
            const f = (t) => {
                if (
                    t.source !== d ||
                    t.data.penpal !== Penpal.Reply ||
                    t.data.id !== c
                ) {
                    return;
                }
                if (p !== "*" && t.origin !== p) {
                    return void o(
                        `${i} received message from origin ${t.origin} which did not match expected origin ${p}`
                    );
                }
                const h = t.data;
                o(`${i}: Received ${e}() reply`);
                s.removeEventListener(Message.Message, f);
                let m = h.returnValue;
                if (h.returnValueIsError) {
                    m = ((e) => {
                        const t = new Error();
                        Object.keys(e).forEach((n) => (t[n] = e[n]));
                        return t;
                    })(m);
                }
                (h.resolution === Resolution.Fulfilled ? n : r)(m);
            };
            s.addEventListener(Message.Message, f);
            const m = {
                penpal: Penpal.Call,
                id: c,
                methodName: e,
                args: t,
            };
            d.postMessage(m, h);
        });
    };
    Object.assign(
        e,
        ((e) => {
            const t = {};
            for (const n in e) {
                createMethodProxy(t, n, e[n]);
            }
            return t;
        })(n.reduce((e, t) => ((e[t] = m(t)), e), {}))
    );
    return () => {
        f = !0;
    };
};

const timeout = (e, t) => {
    let n;
    if (e !== void 0) {
        n = window.setTimeout(() => {
            const n = new Error(`Connection timed out after ${e}ms`);
            n.code = ErrorCodes.ConnectionTimeout;
            t(n);
        }, e);
    }
    return () => {
        clearTimeout(n);
    };
};

export const connectToParent = (e = {}) => {
    const {
        parentOrigin: t = "*",
        methods: n = {},
        timeout: r,
        debug: o = !1,
    } = e;
    const i = ((e) => (...t) => {
        if (e) {
            console.log("[Penpal]", ...t);
        }
    })(o);
    const s = ((e, t) => {
        const n = [];
        let r = !1;
        return {
            destroy(o) {
                if (!r) {
                    r = !0;
                    t(`${e}: Destroying connection`);
                    n.forEach((e) => {
                        e(o);
                    });
                }
            },
            onDestroy(e) {
                r ? e() : n.push(e);
            },
        };
    })("Child", i);
    const { destroy: l, onDestroy: c } = s;
    const d = ((e, t, n, r) => {
        const { destroy: o, onDestroy: i } = n;
        return (n) => {
            if (
                !(e instanceof RegExp
                    ? e.test(n.origin)
                    : e === "*" || e === n.origin)
            ) {
                return void r(
                    `Child: Handshake - Received SYN-ACK from origin ${n.origin} which did not match expected origin ${e}`
                );
            }
            r("Child: Handshake - Received SYN-ACK, responding with ACK");
            const s = n.origin === "null" ? "*" : n.origin;
            const l = {
                penpal: Penpal.Ack,
                methodNames: Object.keys(t),
            };
            window.parent.postMessage(l, s);
            const c = {
                localName: "Child",
                local: window,
                remote: window.parent,
                originForSending: s,
                originForReceiving: n.origin,
            };
            i(receiveCall(c, t, r));
            const d = {};
            return i(sendCall(d, c, n.data.methodNames, o, r)), d;
        };
    })(t, serializeMethods(n), s, i);
    const h = () => {
        i("Child: Handshake - Sending SYN");
        const e = { penpal: Penpal.Syn };
        window.parent.postMessage(e, t instanceof RegExp ? "*" : t);
    };
    return {
        promise: new Promise((e, t) => {
            const n = timeout(r, l);
            const o = (t) => {
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
                    t.data.penpal === Penpal.SynAck
                ) {
                    const r = d(t);
                    if (r) {
                        window.removeEventListener(Message.Message, o);
                        n();
                        e(r);
                    }
                }
            };
            window.addEventListener(Message.Message, o);
            h();
            c((e) => {
                window.removeEventListener(Message.Message, o);
                if (e) {
                    t(e);
                }
            });
        }),
        destroy() {
            l();
        },
    };
};