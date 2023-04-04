const ONE_HOUR = 1000 * 60 * 60;

// this should be provided from higher level
function getLanguage() {
  return Intl.DateTimeFormat().resolvedOptions().locale;
}

export const formatterForDataCadence = (
  data: any[] = [],
  dateField = "timestamp"
) => {
  if (!data[1]) {
    return () => "No Data";
  }

  const language = getLanguage();

  const delta = data[1][dateField] - data[0][dateField];
  const range = data[data.length - 1][dateField] - data[0][dateField];

  const isSmallDelta = delta < 24 * ONE_HOUR;

  const isMultipleYear =
    new Date(data[0][dateField]).getFullYear() !==
    new Date(data[data.length - 1][dateField]).getFullYear();

  const isMultipleDays = range > 24 * ONE_HOUR;

  const formatter = Intl.DateTimeFormat(language, {
    year: isMultipleYear ? "numeric" : undefined,
    month: isMultipleDays ? "2-digit" : undefined,
    day: isMultipleDays ? "2-digit" : undefined,
    hour: isSmallDelta ? "numeric" : undefined,
    minute: isSmallDelta ? "numeric" : undefined,
  });

  return (unixTime) => formatter.format(unixTime);
};

export const defaultColors = [
  "#2185d0",
  "#00b5ad",
  "#21ba45",
  "#b5cc18",
  "#fbbd08",
  "#f2711c",
  "#db2828",
  "#e03997",
  "#a333c8",
  "#6435c9",
];

export const defaultActions = [
  {
    label: "Export Data",
    value: "export-data",
  },
  /*
  {
    label: "Download Image",
    value: "download-image",
  },
  */
];
