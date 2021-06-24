import {
  startOfSecond,
  startOfMinute,
  startOfHour,
  startOfDay,
  startOfWeek,
  startOfMonth,
  startOfYear,
  endOfSecond,
  endOfMinute,
  endOfHour,
  endOfDay,
  endOfWeek,
  endOfMonth,
  endOfYear,
  sub,
  add,
} from "date-fns";

function startOrEndOf(start, date, unit) {
  var outDate = new Date(Date.parse(date));
  if (unit === "s") {
    return start ? startOfSecond(outDate) : endOfSecond(outDate);
  }
  if (unit === "m") {
    return start ? startOfMinute(outDate) : endOfMinute(outDate);
  }
  if (unit === "h") {
    return start ? startOfHour(outDate) : endOfHour(outDate);
  }
  if (unit === "d") {
    return start ? startOfDay(outDate) : endOfDay(outDate);
  }
  if (unit === "w") {
    return start ? startOfWeek(outDate) : endOfWeek(outDate);
  }
  if (unit === "M") {
    return start ? startOfMonth(outDate) : endOfMonth(outDate);
  }
  if (unit === "y") {
    return start ? startOfYear(outDate) : endOfYear(outDate);
  }
}

export const unitsMap = {
  s: { weight: 1, name: "seconds" },
  m: { weight: 2, name: "minutes" },
  h: { weight: 3, name: "hours" },
  d: { weight: 4, name: "days" },
  w: { weight: 5, name: "weeks" },
  M: { weight: 6, name: "months" },
  y: { weight: 7, name: "years" },
};

export const units = Object.keys(unitsMap).sort(
  (a, b) => unitsMap[b].weight - unitsMap[a].weight
);

export const unitsDesc = [...units];
export const unitsAsc = [...units].reverse();

const isDate = (d) => Object.prototype.toString.call(d) === "[object Date]";
const isValidDate = (d) => isDate(d) && !isNaN(d.valueOf());

export function parse(input, options = {}) {
  const text = input;
  const { roundUp = false, forceNow = new Date() } = options;

  if (!text) return undefined;
  if (isDate(text)) return text;
  if (forceNow !== undefined && !isValidDate(forceNow)) {
    throw new Error("forceNow must be a valid Date");
  }

  let date;
  let mathString = "";
  let index;
  let parseString;

  if (text.substring(0, 3) === "now") {
    date = new Date(forceNow);
    mathString = text.substring("now".length);
  } else {
    index = text.indexOf("||");
    if (index === -1) {
      parseString = text;
      mathString = "";
    } else {
      parseString = text.substring(0, index);
      mathString = text.substring(index + 2);
    }
    date = new Date(Date.parse(parseString));
  }

  if (!mathString.length) {
    return date;
  }

  return parseDateMath(mathString, date, roundUp);
}

function parseDateMath(mathString, date, roundUp) {
  let dateTime = date;
  const len = mathString.length;
  let i = 0;

  while (i < len) {
    const c = mathString.charAt(i++);
    let type;
    let num;
    let unit;

    if (c === "/") {
      type = 0;
    } else if (c === "+") {
      type = 1;
    } else if (c === "-") {
      type = 2;
    } else {
      return;
    }

    if (isNaN(mathString.charAt(i))) {
      num = 1;
    } else if (mathString.length === 2) {
      num = mathString.charAt(i);
    } else {
      const numFrom = i;
      while (!isNaN(mathString.charAt(i))) {
        i++;
        if (i >= len) return;
      }
      num = parseInt(mathString.substring(numFrom, i), 10);
    }

    if (type === 0) {
      // rounding is only allowed on whole, single, units (eg M or 1M, not 0.5M or 2M)
      if (num !== 1) {
        return;
      }
    }

    unit = mathString.charAt(i++);

    // append additional characters in the unit
    for (let j = i; j < len; j++) {
      const unitChar = mathString.charAt(i);
      if (/[a-z]/i.test(unitChar)) {
        unit += unitChar;
        i++;
      } else {
        break;
      }
    }

    if (units.indexOf(unit) === -1) {
      return;
    }

    if (type === 0) {
      if (roundUp) {
        dateTime = startOrEndOf(false, dateTime, unit);
      } else {
        dateTime = startOrEndOf(true, dateTime, unit);
      }
    } else if (type === 1) {
      dateTime = add(dateTime, {
        [unitsMap[unit].name]: num,
      });
    } else if (type === 2) {
      dateTime = sub(dateTime, {
        [unitsMap[unit].name]: num,
      });
    }
  }

  return dateTime;
}
