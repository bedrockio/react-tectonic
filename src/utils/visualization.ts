import {
  IconAreaChart,
  IconBarChart,
  IconLineChart,
} from "../components/Icons";

const ONE_HOUR = 1000 * 60 * 60;

export const formatterForDataCadence = (data: any[] = [], dateField="timestamp") => {
  if (!data[1]) {
    return () => "No Data";
  }

  const delta = data[1][dateField] - data[0][dateField];
  const range = data[data.length - 1][dateField] - data[0][dateField];

  if (range > 356 * 24 * ONE_HOUR) {
    const formatter = Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "numeric",
      day: "numeric",
    });
    return (unixTime) => formatter.format(unixTime);
  } else if (delta > 5 * ONE_HOUR) {
    const formatter = Intl.DateTimeFormat("en-US", {
      month: "numeric",
      day: "numeric",
    });
    return (unixTime) => formatter.format(unixTime);
  } else {
    const formatter = Intl.DateTimeFormat("en-US", {
      hour: "numeric",
      minute: "numeric",
    });
    return (unixTime) => formatter.format(unixTime);
  }
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

export const defaultChartTypes = [
  {
    label: "Line",
    value: "line",
    icon: IconLineChart,
  },
  {
    label: "Bar",
    value: "bar",
    icon: IconBarChart,
  },
  {
    label: "Area",
    value: "area",
    icon: IconAreaChart,
  },
];
