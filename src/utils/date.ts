import { format } from "date-fns";
import { parse } from "./datemath";

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

export function toDate(stringOrDate) {
  return parse(stringOrDate);
}

export function toCsvDateFormat(date) {
  return format(date, "dd/MM/yyyy HH:mm:ss");
}

const US_FIRST_DAY_WEEK = 7;

const orderByFirstDayOfWeek = (firstDayOfWeek, days) => [
  ...days.slice(firstDayOfWeek - 1),
  ...days.slice(0, firstDayOfWeek - 1),
];

export function getLocalizedDayName(isoDayOfWeek, locale = "en-US") {
  // Create a date object starting from the first ISO week day (Monday)
  const date = new Date(2021, 0, isoDayOfWeek + 4); // Jan 4, 2021 is a Monday
  return date.toLocaleDateString(locale, { weekday: "long" });
}

export function getWeekdays(localeName: string, short = false): string[] {
  const format = new Intl.DateTimeFormat(localeName, {
    weekday: "long",
  }).format;
  const weekdays = [...Array(7).keys()].map((day) =>
    format(new Date(Date.UTC(2021, 5, day)))
  );

  if (!window?.Intl?.Locale) {
    return orderByFirstDayOfWeek(US_FIRST_DAY_WEEK, localeName);
  }

  const loc = new Intl.Locale(localeName) as any;
  if (!loc.weekInfo) {
    return orderByFirstDayOfWeek(US_FIRST_DAY_WEEK, localeName);
  }

  return orderByFirstDayOfWeek(loc.weekInfo.firstDay, weekdays);
}
