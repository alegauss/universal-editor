import {
  cuidRegex,
  cuid2Regex,
  ulidRegex,
  uuidRegex,
  nanoidRegex,
  durationRegex,
  emailRegex,
  ipv4Regex,
  ipv6Regex,
  base64Regex,
  dateRegex,
} from "./regexes.js";

export function isCuid(value) {
  return cuidRegex.test(value);
}

export function isCuid2(value) {
  return cuid2Regex.test(value);
}

export function isUlid(value) {
  return ulidRegex.test(value);
}

export function isUuid(value) {
  return uuidRegex.test(value);
}

export function isNanoid(value) {
  return nanoidRegex.test(value);
}

export function isDuration(value) {
  return durationRegex.test(value);
}

export function isEmail(value) {
  return emailRegex.test(value);
}

export function isIpv4(value) {
  return ipv4Regex.test(value);
}

export function isIpv6(value) {
  return ipv6Regex.test(value);
}

export function isBase64(value) {
  return base64Regex.test(value);
}

export function isDate(value) {
  return dateRegex.test(value);
}

export function isIP(ip, version) {
  if ((version === "v4" || !version) && isIpv4(ip)) {
    return true;
  }
  if ((version === "v6" || !version) && isIpv6(ip)) {
    return true;
  }
  return false;
}