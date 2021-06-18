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
