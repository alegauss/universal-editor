/**
 * Represents the status of a Zod parse operation.
 */
export class ParseStatus {
    constructor() {
      this.value = "valid";
    }
    dirty() {
      if (this.value === "valid") {
        this.value = "dirty";
      }
    }
    abort() {
      if (this.value !== "aborted") {
        this.value = "aborted";
      }
    }
    static mergeArray(e, t) {
      const n = [];
      for (const r of t) {
        if (r.status === "aborted") return J; // ABORTED_STATUS
        if (r.status === "dirty") e.dirty();
        n.push(r.value);
      }
      return { status: e.value, value: n };
    }
    static async mergeObjectAsync(e, t) {
      const n = [];
      for (const e of t) {
        const t = await e.key;
        const r = await e.value;
        n.push({ key: t, value: r });
      }
      return ParseStatus.mergeObjectSync(e, n);
    }
    static mergeObjectSync(e, t) {
      const n = {};
      for (const r of t) {
        const { key: t, value: o } = r;
        if (t.status === "aborted" || o.status === "aborted") return J; // ABORTED_STATUS
        if (t.status === "dirty") e.dirty();
        if (o.status === "dirty") e.dirty();
        if (t.value !== "__proto__" && (o.value !== void 0 || r.alwaysSet)) {
          n[t.value] = o.value;
        }
      }
      return { status: e.value, value: n };
    }
}
