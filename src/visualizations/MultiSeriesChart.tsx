import React, { Fragment, ReactNode } from "react";
import PropTypes from "prop-types";
import { TimeRangeType } from "../utils/propTypes";
import { exportToCsv } from "../utils/exporters";
import { AnnotationLine } from "./types";
import { getValueFormatter, getMinMaxRange } from "../utils/formatting";
import {
  formatterForDataCadence,
  defaultActions,
  defaultColors,
} from "../utils/visualization";

import {
  Message,
  ChartContainer as DefaultChartContainer,
  TitleAlignType,
} from "../components";

import { useTectonicContext } from "../components/TectonicProvider";

import {
  validIntervals,
  intervalToLabel,
  IntervalType,
} from "../utils/intervals";

import { toDate, toCsvDateFormat } from "../utils/date";
import { IStatus, ITimeRange } from "../types";

import {
  IconAreaChart,
  IconBarChart,
  IconLineChart,
} from "../components/Icons";

import {
  Area,
  Line,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine,
  ComposedChart,
} from "recharts";

const fuse = (series, { valueField, confidenceField }) => {
  const byTs = {};
  if (series && series.length) {
    series[0].forEach((item) => {
      byTs[item.timestamp] = {};
    });
    series.forEach((serie, index) => {
      serie.forEach((item) => {
        if (!byTs[item.timestamp]) {
          byTs[item.timestamp] = {};
        }
        byTs[item.timestamp][`${index}-value`] = item[valueField];
        byTs[item.timestamp][`${index}-confidence`] = item[confidenceField];
      });
    });
  }
  const timestamps = Object.keys(byTs).sort();
  return timestamps.map((key) => {
    const timestamp = parseInt(key, 10);
    const values = byTs[timestamp];
    return {
      timestamp: timestamp,
      ...values,
    };
  });
};

const defaultChartTypes = [
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

const defaultProps = {
  exportFilename: "export.csv",
  data: [] as any[],
  status: { success: true },
  colors: defaultColors,
  chartType: "line",
  chartContainer: DefaultChartContainer,
  valueField: "value",
  confidenceField: "confidence",
  confidenceLabel: "confidence", // lower casing as its <metric name> <confidenceLabel>,
  enabledControls: ["intervals", "chartTypes", "actions"],
  stacked: true,
  labels: [] as string[],
  height: 400,
};

type EnabledControlType = "intervals" | "chartTypes" | "actions";

type MultiSeriesChartProps = {
  onIntervalChange?: (interval: IntervalType) => void;
  labels: string[];
  status?: IStatus;
  title?: ReactNode;
  titleAlign?: TitleAlignType;
  legend?: boolean;
  stacked?: boolean;
  timeRange?: ITimeRange;
  height?: number;
  data?: any[];
  chartType?: "line" | "bar" | "area";
  colors?: string[];
  chartContainer?: React.ElementType;
  valueField?: string;
  confidenceField?: string;
  confidenceLabel?: string;
  confidenceColor?: string;
  labelFormatter?: (label: number) => string;
  valueFormatter?: (value: number) => string;
  tickFormatter?: (value: Date) => string;
  locals?: string;
  disableDot?: boolean;
  enabledControls?: EnabledControlType[];
  exportFilename?: string;
  interval?: IntervalType;
  annotations?: AnnotationLine[];
};

export const MultiSeriesChart = ({
  data,
  timeRange,
  chartType: propsChartType,
  onIntervalChange,
  valueField,
  confidenceField,
  confidenceLabel,
  confidenceColor,
  labelFormatter,
  valueFormatter,
  legend,
  height,
  stacked,
  colors,
  disableDot,
  enabledControls,
  status,
  title,
  titleAlign,
  chartContainer: ChartContainer,
  labels,
  tickFormatter,
  exportFilename,
  interval,
  annotations = [],
}: MultiSeriesChartProps & typeof defaultProps): JSX.Element => {
  const ctx = useTectonicContext();

  const [chartType, setChartType] = React.useState<string>(
    propsChartType || "line"
  );

  let ChartGraph;

  React.useEffect(() => {
    setChartType(propsChartType);
  }, [propsChartType]);

  if (chartType == "area") {
    ChartGraph = Area;
  } else if (chartType === "bar") {
    ChartGraph = Bar;
  } else {
    ChartGraph = Line;
  }

  const fusedData = fuse(data, { valueField, confidenceField });

  const _colors =
    colors === defaultColors
      ? [ctx?.primaryColor, ...defaultColors].filter(Boolean)
      : colors;

  const defaultTickFormatter = formatterForDataCadence(
    data[0] || { timestamp: new Date() }
  );

  let noData = true;
  data.forEach((series) => {
    if (series && series.length) {
      noData = false;
    }
  });

  ///XXX todo deal with no data

  const intervals =
    validIntervals(toDate(timeRange?.from), toDate(timeRange?.to)) || [];

  function handleAction(action: string) {
    if (action === "download-image") {
      // handleDownloadImage(svgChartRef.current);
    } else if (action === "export-data") {
      data.forEach((serie, index) =>
        exportToCsv(
          ["Date", "Value"],
          serie.map((row) => [
            `"${toCsvDateFormat(new Date(row.timestamp))}"`,
            row.value,
          ]),
          labels[index] || `metric-${index + 1}` + ".csv"
        )
      );
    }
  }

  const _valueFormatter =
    valueFormatter || getValueFormatter(getMinMaxRange(data, valueField));

  const _labelFormatter = labelFormatter || _valueFormatter;

  return (
    <ChartContainer
      height={height}
      titleAlign={titleAlign}
      enabledControls={noData ? [] : enabledControls}
      activeInterval={interval}
      activeChartType={chartType}
      intervals={intervals.map((interval) => {
        return {
          label: intervalToLabel(interval),
          value: interval,
        };
      })}
      chartTypes={defaultChartTypes}
      actions={defaultActions}
      title={title}
      onIntervalChange={onIntervalChange}
      onChartTypeChange={setChartType}
      onActionChange={handleAction}
    >
      {status.success && noData && (
        <Message>No data available for this time period</Message>
      )}
      {status.loading && <Message>Loading...</Message>}
      {status.error && <Message error>{status.error.message}</Message>}

      <ResponsiveContainer
        debounce={10}
        key={`${chartType}-${status.success}-${legend}`}
      >
        <ComposedChart
          data={fusedData}
          margin={{
            top: 6,
            right: 6,
            left: 6,
            bottom: 0,
          }}
        >
          {data.map((_, index) => {
            const color = _colors[index % _colors.length];
            const name = labels[index] ? labels[index] : `Metric ${index + 1}`;
            return (
              <Fragment key={index}>
                <ChartGraph
                  type="monotone"
                  dataKey={`${index}-value`}
                  name={name}
                  stroke={color}
                  fill={["area", "bar"].includes(chartType) ? color : undefined}
                  fillOpacity={0.3}
                  opacity={1}
                  stackId={
                    stacked && ["area", "bar"].includes(chartType)
                      ? "1"
                      : undefined
                  }
                  dot={false}
                  {...(["line", "area"].includes(chartType)
                    ? {
                        activeDot: disableDot ? { r: 0 } : { r: 6 },
                      }
                    : {})}
                />
                {/* should use cancel sticks or errorbar for bar chart, but failing to make it work */}
                {chartType !== "bar" && (
                  <Area
                    key={`${index}-confidence`}
                    type="monotoneX"
                    dataKey={`${index}-confidence`}
                    name={`${name} ${confidenceLabel}`}
                    stroke={confidenceColor || color}
                    fill={confidenceColor || color}
                    fillOpacity={0.15}
                    strokeOpacity={0.15}
                  />
                )}
              </Fragment>
            );
          })}

          <XAxis
            dataKey="timestamp"
            name="Time"
            minTickGap={30}
            tickFormatter={tickFormatter || defaultTickFormatter}
            tick={{ fill: "#6C767B", fontSize: "13" }}
            tickLine={{ stroke: "#6C767B" }}
            axisLine={{ stroke: "#6C767B" }}
            tickMargin={10}
            padding={{ left: 20, right: 9 }}
            height={38}
          />
          <YAxis
            tickFormatter={_valueFormatter}
            tick={{ fill: "#6C767B", fontSize: "13" }}
            tickLine={{ fill: "#6C767B" }}
            tickMargin={8}
            padding={{ bottom: 10, top: 10 }}
            mirror
          />

          {legend && (
            <Legend verticalAlign="bottom" height={32} iconType="circle" />
          )}

          {chartType !== "bar" && (
            <Tooltip
              formatter={_labelFormatter}
              labelFormatter={tickFormatter || defaultTickFormatter}
            />
          )}
          {annotations.map((annotation, index) => {
            return (
              <ReferenceLine
                key={index}
                x={annotation.timestamp.valueOf()}
                stroke={annotation.color}
                label={annotation.label}
              />
            );
          })}
        </ComposedChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
};

MultiSeriesChart.propTypes = {
  onIntervalChange: PropTypes.func,
  labels: PropTypes.arrayOf(PropTypes.string),
  status: PropTypes.object,
  title: PropTypes.node,
  legend: PropTypes.bool,
  stacked: PropTypes.bool,
  timeRange: TimeRangeType,
  data: PropTypes.arrayOf(PropTypes.array),
  chartType: PropTypes.oneOf(["line", "bar", "area"]),
  colors: PropTypes.arrayOf(PropTypes.string),
  chartContainer: PropTypes.elementType,
  confidenceLabel: PropTypes.string,
  confidenceColor: PropTypes.string,
  confidenceField: PropTypes.string,
  valueField: PropTypes.string,
  valueFormatter: PropTypes.func,
  labelFormatter: PropTypes.func,
  disableDot: PropTypes.bool,
  enabledControls: PropTypes.arrayOf(
    PropTypes.oneOf(["intervals", "chartTypes", "actions"])
  ),
  exportFilename: PropTypes.string,
};

MultiSeriesChart.defaultProps = defaultProps;
