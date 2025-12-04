export function readPrivateMember(e, t, n, r) {
    if ("a" === n && !r)
      throw TypeError("Private accessor was defined without a getter");
    if ("function" == typeof t ? e !== t || !r : !t.has(e))
      throw TypeError(
        "Cannot read private member from an object whose class did not declare it"
      );
    return "m" === n ? r : "a" === n ? r.call(e) : r ? r.value : t.get(e);
  }
export function writePrivateMember(e, t, n, r, o) {
    if ("m" === r) throw TypeError("Private method is not writable");
    if ("a" === r && !o)
      throw TypeError("Private accessor was defined without a setter");
    if ("function" == typeof t ? e !== t || !o : !t.has(e))
      throw TypeError(
        "Cannot write private member to an object whose class did not declare it"
      );
    return "a" === r ? o.call(e, n) : o ? (o.value = n) : t.set(e, n), n;
  }