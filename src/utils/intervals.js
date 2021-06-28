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

const intervalList = Object.keys(intervals).map((key) => {
  return {
    key,
    duration: intervals[key],
  };
});

const maxBucketSize = 500;

export function validIntervals(from, to) {
  const durationSeconds = (to - from) / 1000;

  const validIntervals = intervalList
    .filter((item) => {
      const numberOfBuckets = Math.floor(durationSeconds / item.duration);
      return numberOfBuckets > 1 && maxBucketSize > numberOfBuckets;
    })
    .map((item) => item.key);

  return validIntervals;
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
