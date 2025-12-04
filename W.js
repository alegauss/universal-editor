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