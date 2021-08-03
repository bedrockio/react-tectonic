import React from "react";
import PropTypes from "prop-types";
import { numberWithCommas } from "../utils/formatting";
import { TimeRangeType } from "../utils/propTypes";
import { exportToCsv } from "../utils/exporters";
import {
  formatterForDataCadence,
  defaultChartTypes,
  defaultActions,
} from "../utils/visualization";
import {
  Message,
  ChartContainer as DefaultChartContainer,
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
  AreaChart,
  LineChart,
  BarChart,
  Area,
  Line,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

import { defaultColors } from "../utils/visualization";

const fuse = (series, valueField) => {
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
        byTs[item.timestamp][`${index}-value`] = item[valueField] || 0;
      });
    });
  }
  const timestamps = Object.keys(byTs).sort();
  return timestamps.map((key) => {
    const timestamp = parseInt(key, 10);
    const values = byTs[timestamp];
    (series || []).forEach((serie, index) => {
      if (!values[`${index}-value`]) {
        values[`${index}-value`] = 0;
      }
    });
    return {
      timestamp: timestamp,
      ...values,
    };
  });
};

const defaultProps = {
  exportFilename: "export.csv",
  data: [],
  status: { success: true },
  colors: defaultColors,
  chartType: "line",
  chartContainer: DefaultChartContainer,
  valueField: "value",
  valueFormatter: (value) => numberWithCommas(value),
  labelFormatter: (unixTime) => new Date(unixTime).toLocaleString(),
  enabledControls: ["intervals", "chartTypes", "actions"],
  stacked: true,
  labels: [],
};

type MultiSeriesChartProps = {
  onIntervalChange?: (interval: IntervalType) => void;
  labels?: string[];
  status?: IStatus;
  title?: JSX.Element;
  legend?: boolean;
  stacked?: boolean;
  timeRange?: ITimeRange;
  data?: any[];
  chartType?: "line" | "bar" | "area";
  colors?: string[];
  chartContainer?: React.ElementType;
  valueField?: string;
  labelFormatter?: (label: string) => string;
  valueFormatter?: (value: number) => string;
  disableDot?: boolean;
  enabledControls?: ["intervals" | "chartTypes" | "actions"];
  exportFilename?: string;
  interval?: IntervalType;
};

export const MultiSeriesChart = ({
  data,
  timeRange,
  chartType: propsChartType,
  onIntervalChange,
  valueField,
  labelFormatter,
  valueFormatter,
  legend,
  stacked,
  colors,
  disableDot,
  enabledControls,
  status,
  title,
  chartContainer: ChartContainer,
  labels,
  exportFilename,
  interval,
}: MultiSeriesChartProps & typeof defaultProps): JSX.Element => {
  const ctx = useTectonicContext();

  const [chartType, setChartType] = React.useState(propsChartType || "line");

  let Chart;
  let ChartGraph;

  React.useEffect(() => {
    setChartType(propsChartType);
  }, [propsChartType]);

  if (chartType == "area") {
    Chart = AreaChart;
    ChartGraph = Area;
  } else if (chartType === "bar") {
    Chart = BarChart;
    ChartGraph = Bar;
  } else {
    Chart = LineChart;
    ChartGraph = Line;
  }

  const fusedData = fuse(data, valueField);

  const _colors =
    (colors === defaultColors &&
      ctx?.primaryColor && [ctx?.primaryColor, ...defaultColors]) ||
    defaultColors;

  const tickFormatter = formatterForDataCadence(
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

  function handleAction(option) {
    const action = option.value;
    if (action === "download-image") {
      //handleDownloadImage(svgChartRef.current);
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

  return (
    <ChartContainer
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

      <ResponsiveContainer height={400}>
        <Chart
          key={`${chartType}-${status.success}`}
          data={fusedData}
          margin={{
            top: 6,
            right: 6,
            left: 6,
            bottom: 6,
          }}
        >
          {data.map((_, index) => {
            const color = _colors[index % _colors.length];
            return (
              <ChartGraph
                type="monotone"
                key={`${index}-value`}
                dataKey={`${index}-value`}
                name={labels ? labels[index] : `Metric ${index + 1}`}
                stroke={color}
                fill={["area", "bar"].includes(chartType) ? color : undefined}
                fillOpacity={0.3}
                opacity={1}
                dot={false}
                {...(["line", "area"].includes(chartType)
                  ? {
                      activeDot: disableDot ? { r: 0 } : { r: 6 },
                    }
                  : {})}
              />
            );
          })}

          <XAxis
            dataKey="timestamp"
            name="Time"
            tickFormatter={tickFormatter}
            tick={{ fill: "#6C767B", fontSize: "13" }}
            tickLine={{ stroke: "#6C767B" }}
            axisLine={{ stroke: "#6C767B" }}
            tickMargin={8}
            padding={{ left: 20, right: 9 }}
          />
          <YAxis
            tickFormatter={valueFormatter}
            tick={{ fill: "#6C767B", fontSize: "13" }}
            tickLine={{ fill: "#6C767B" }}
            tickMargin={8}
            padding={{ bottom: 10, top: 10 }}
            mirror
          />
          {(chartType === "bar" || legend) && <Legend iconType="circle" />}

          {chartType !== "bar" && (
            <Tooltip
              formatter={valueFormatter}
              labelFormatter={labelFormatter}
            />
          )}
        </Chart>
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
