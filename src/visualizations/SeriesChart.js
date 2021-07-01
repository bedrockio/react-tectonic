import React from "react";
import PropTypes from "prop-types";

import { numberWithCommas } from "../utils/formatting";
import {
  formatterForDataCadence,
  defaultActions,
  defaultChartTypes,
} from "../utils/visualization";

import { exportToCsv, downloadImage } from "../utils/exporters";
import { toCsvDateFormat } from "../utils/date";
import { TimeRangeType } from "../utils/propTypes";

import {
  Message,
  ChartContainer as DefaultChartContainer,
  useTectonicContext,
} from "../components";

import { validIntervals, intervalToLabel } from "../utils/intervals";
import { toDate } from "../utils/date";

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
  ResponsiveContainer,
} from "recharts";

import { defaultColors } from "../utils/visualization";

export const SeriesChart = ({
  status,
  data,
  valueField,
  // eslint-disable-next-line react/prop-types
  valueFieldName,
  valueFieldLabel,
  // eslint-disable-next-line react/prop-types
  valueFieldFormatter,
  valueFormatter,
  labelFormatter,
  chartContainer: ChartContainer,
  title,
  // eslint-disable-next-line react/prop-types
  variant,
  chartType: propsChartType,
  disableDot,
  onIntervalChange,
  timeRange,
  color,
  enabledControls,
}) => {
  const ctx = useTectonicContext();
  const _color = color || ctx?.primaryColor || defaultColors[0];

  if (valueFieldName) {
    // eslint-disable-next-line no-console
    console.warn(
      "[SeriesChart] valueFieldName is deprecated use valueFieldLabel"
    );
    valueFieldLabel = valueFieldName;
  }

  if (variant) {
    // eslint-disable-next-line no-console
    console.warn("[SeriesChart] varient is deprecated use chartType");
    propsChartType = variant;
  }

  if (valueFieldFormatter) {
    // eslint-disable-next-line no-console
    console.warn(
      "[SeriesChart] valueFieldFormatter is deprecated use valueFormatter"
    );
    valueFormatter = valueFieldFormatter;
  }

  const [chartType, setChartType] = React.useState(propsChartType || "line");

  const svgChartRef = React.createRef();

  let Chart = LineChart;
  let ChartGraph = Line;

  React.useEffect(() => {
    setChartType(propsChartType);
  }, [propsChartType]);

  if (chartType == "area") {
    Chart = AreaChart;
    ChartGraph = Area;
  }
  if (chartType === "bar") {
    Chart = BarChart;
    ChartGraph = Bar;
  }

  const tickFormatter = formatterForDataCadence(data);

  const noData = !data || !data.length;

  const intervals =
    validIntervals(toDate(timeRange?.from), toDate(timeRange?.to)) || [];

  const handleDownloadImage = async (ref) => {
    if (ref && ref.container) {
      let svg = ref.container.children[0];
      await downloadImage(
        svg,
        ref.container.clientWidth,
        ref.container.clientHeight,
        "chart.png"
      );
    }
  };

  function handleAction(option) {
    const action = option.value;
    if (action === "download-image") {
      handleDownloadImage(svgChartRef.current);
    } else if (action === "export-data") {
      exportToCsv(
        [
          `"Date - TZ: ${Intl.DateTimeFormat().resolvedOptions().timeZone}"`,
          "Value",
        ],
        data.map((row) => [
          `"${toCsvDateFormat(new Date(row.timestamp))}"`,
          row.value,
        ]),
        "export.csv"
      );
    }
  }

  return (
    <ChartContainer
      title={title}
      enabledControls={noData ? [] : enabledControls}
      intervals={intervals.map((interval) => {
        return {
          label: intervalToLabel(interval),
          value: interval,
        };
      })}
      chartTypes={defaultChartTypes}
      actions={defaultActions}
      onChartTypeChange={setChartType}
      onActionChange={handleAction}
      timeRange={timeRange}
      onIntervalChange={onIntervalChange}
    >
      {status.success && noData && (
        <Message>No data available for this time period</Message>
      )}
      {status.loading && <Message>Loading...</Message>}
      {status.error && <Message error>{status.error.message}</Message>}
      <ResponsiveContainer height={400}>
        <Chart
          ref={svgChartRef}
          key={`${chartType}-${status.success}`}
          data={data}
          margin={{
            top: 6,
            right: 6,
            left: 6,
            bottom: 6,
          }}
        >
          <ChartGraph
            type="monotoneX"
            dataKey={valueField}
            name={valueFieldLabel}
            stroke={_color}
            strokeWidth={2}
            fill={["bar", "area"].includes(chartType) ? _color : undefined}
            opacity={1}
            activeDot={
              disableDot ? { r: 0 } : { r: 6, strokeWidth: 2, fill: "#f5821f" }
            }
            dot={false}
            barSize={30}
          />
          <XAxis
            dataKey="timestamp"
            name="Time"
            tickFormatter={tickFormatter}
            tick={{ fill: "#6C767B", fontSize: "13" }}
            tickLine={{ stroke: "#6C767B" }}
            axisLine={{ stroke: "#6C767B" }}
            tickMargin={5}
          />
          <YAxis
            tickFormatter={valueFormatter}
            tick={{ fill: "#6C767B", fontSize: "13" }}
            tickLine={{ fill: "#6C767B" }}
            tickMargin={4}
            padding={{ bottom: 0 }}
            type="number"
            mirror
          />

          {/* The bar chart blows up if there is tooltip? disabling for now */}
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

SeriesChart.propTypes = {
  title: PropTypes.string,
  valueFormatter: PropTypes.func,
  labelFormatter: PropTypes.func,
  valueField: PropTypes.string,
  valueFieldLabel: PropTypes.string,
  chartType: PropTypes.oneOf(["line", "bar", "area"]),
  status: PropTypes.object,
  onIntervalChange: PropTypes.func,
  timeRange: TimeRangeType,
  enabledControls: PropTypes.arrayOf(
    PropTypes.oneOf(["intervals", "chartTypes", "actions"])
  ),

  /**
   * Is this the principal call to action on the page?
   */
  data: PropTypes.array,
  /**
   * Color of the line or bar
   */
  color: PropTypes.string,
  legend: PropTypes.bool,
  disableDot: PropTypes.bool,
  chartContainer: PropTypes.elementType,
};

SeriesChart.defaultProps = {
  valueField: "value",
  valueFieldLabel: "Value",
  data: [],
  status: { success: true },
  chartType: "line",
  chartContainer: DefaultChartContainer,
  labelFormatter: (unixTime) => new Date(unixTime).toLocaleString(),
  valueFormatter: (value) => numberWithCommas(value),
  enabledControls: ["intervals", "chartTypes", "actions"],
};
