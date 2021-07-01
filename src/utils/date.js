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
