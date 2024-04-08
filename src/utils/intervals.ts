import { toDate } from "./date";
import { ITimeRange } from "../types";

export type IntervalType =
  | "1s"
  | "10s"
  | "1m"
  | "5m"
  | "10m"
  | "15m"
  | "30m"
  | "1h"
  | "1d"
  | "1w"
  | "1M"
  | "1y";

const intervals = {
  "1s": 1,
  "10s": 10,
  "1m": 60,
  "5m": 5 * 60,
  "10m": 10 * 60,
  "15m": 15 * 60,
  "30m": 30 * 60,
  "1h": 60 * 60,
  "1d": 24 * 60 * 60,
  "1w": 7 * 24 * 60 * 60,
  "1M": 30 * 24 * 60 * 60,
  "1y": 365 * 24 * 60 * 60,
};

const intervalsLabel = {
  "1s": "1 second",
  "10s": "10 seconds",
  "1m": "1 minute",
  "5m": "5 minutes",
  "10m": "10 minutes",
  "15m": "15 minutes",
  "30m": "30 minutes",
  "1h": "1 hour",
  "1d": "1 day",
  "1w": "1 week",
  "1M": "1 month",
  "1y": "1 year",
};

const intervalList = Object.keys(intervals).map((key) => {
  return {
    key,
    duration: intervals[key],
  };
});

const maxBucketSize = 700;

export function validIntervals(from, to): IntervalType[] {
  const durationSeconds = (to - from) / 1000;

  const validIntervals = intervalList
    .filter((item) => {
      const numberOfBuckets = Math.floor(durationSeconds / item.duration);
      return numberOfBuckets > 1 && maxBucketSize > numberOfBuckets;
    })
    .map((item) => item.key as IntervalType);

  return validIntervals;
}

export function intervalToLabel(interval: IntervalType): string {
  return intervalsLabel[interval];
}

export function determineInterval(timeRange: ITimeRange): IntervalType {
  const from = toDate(timeRange.from);
  const to = toDate(timeRange.to);
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
