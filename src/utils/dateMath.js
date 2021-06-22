const lookUp = {
  s: 1000,
};
lookUp.m = lookUp.s * 60;
lookUp.h = lookUp.m * 60;
lookUp.d = lookUp.h * 24;
lookUp.w = lookUp.d * 7;
lookUp.M = lookUp.d * 30;
lookUp.y = lookUp.d * 365;

const regexString = "(\\+|\\-)(\\d+)(" + Object.keys(lookUp).join("|") + ")";
const regexGlobal = new RegExp(regexString, "g");
const regexLocal = new RegExp(regexString);

function check(count, item) {
  var values = item.match(regexLocal);
  if (!values || values.length === 0) {
    return count;
  }
  return count + (values[1] === "+" ? 1 : -1) * +values[2] * lookUp[values[3]];
}

export function convert(dms) {
  if (typeof dms !== "string" || !dms.match(/^now/i)) {
    return false;
  }
  var items = dms.match(regexGlobal);
  if (!items || items.length === 0) {
    return false;
  }
  return items.reduce(check, 0);
}

export const labelsToUnit = {
  year: "y",
  years: "y",
  month: "M",
  months: "M",
  week: "w",
  weeks: "w",
  day: "d",
  days: "d",
  hour: "h",
  hours: "h",
  minute: "m",
  minutes: "m",
  second: "s",
  seconds: "s",
};

const validIntervals = ["1w", "1d", "1h", "15m", "5m", "1m"];

export function intervalIsAllowed(from, to, interval) {
  const durationSeconds = (to - from) / 1000;
  const durationMinutes = durationSeconds / 60;
  const durationHours = durationMinutes / 60;
  if (interval === "1w" && durationHours < 7 * 24) {
    return false;
  }
  if (interval === "1d" && durationHours < 24) {
    return false;
  }
  if (interval === "1h" && durationMinutes < 60) {
    return false;
  }
  if (interval === "15m" && durationMinutes < 15) {
    return false;
  }
  if (interval === "15m" && durationHours > 24 * 4) {
    return false;
  }
  if (interval === "1h" && durationHours > 24 * 30) {
    return false;
  }
  if (interval === "5m" && durationHours > 24) {
    return false;
  }
  if (interval === "1m" && durationHours > 4) {
    return false;
  }
  return true;
}

export function determineInterval(from, to) {
  const durationSeconds = (to - from) / 1000;
  const durationMinutes = durationSeconds / 60;
  const durationHours = durationMinutes / 60;
  if (durationHours > 6 * 30 * 24) {
    return "1w";
  }
  if (durationHours > 10 * 24) {
    return "1d";
  }
  if (durationHours > 6) {
    return "1h";
  }
  if (durationHours > 2) {
    return "15m";
  }
  if (durationMinutes > 60) {
    return "5m";
  }
  if (durationMinutes <= 60) {
    return "1m";
  }
  return "1d";
}
