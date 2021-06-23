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
