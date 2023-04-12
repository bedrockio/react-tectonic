import { get } from "lodash";

export const numberWithCommas = (x) => {
  return (x || 0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

function getFormatFn(formatter) {
  return (value: number | number[]) => {
    if (Array.isArray(value)) {
      return value.map((v) => formatter.format(v)).join(" - ");
    }
    return formatter.format(value);
  };
}

export const getValueFormatter = (range, options = {}) => {
  if (range[1] < 2) {
    const formatter = new Intl.NumberFormat("en-US", {
      maximumFractionDigits: 3,
      ...options,
    }) as any;
    return getFormatFn(formatter);
  } else if (range[1] < 10) {
    const formatter = new Intl.NumberFormat("en-US", {
      maximumFractionDigits: 2,
      ...options,
    });
    return (value: number) => formatter.format(value) as any;
  } else if (range[1] < 100) {
    const formatter = new Intl.NumberFormat("en-US", {
      maximumFractionDigits: 1,
      ...options,
    });
    return getFormatFn(formatter);
  }
  const formatter = new Intl.NumberFormat("en-US", {
    maximumFractionDigits: 0,
    ...options,
  });
  return getFormatFn(formatter);
};

export const getMinMaxRange = (data = [] as any, valueField) => [
  Math.min.apply(
    null,
    data.map((item) => get(item, valueField))
  ),
  Math.max.apply(
    null,
    data.map((item) => get(item, valueField))
  ),
];
