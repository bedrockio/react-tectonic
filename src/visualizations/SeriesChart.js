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
  interval,
  timeRange,
  color,
  enabledControls,
  exportFilename,
  axisColor,
  height,
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
        ["Date", "Value"],
        data.map((row) => [
          `"${toCsvDateFormat(new Date(row.timestamp))}"`,
          row.value,
        ]),
        exportFilename
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
      activeChartType={chartType}
      activeInterval={interval}
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
      <ResponsiveContainer height={height}>
        <Chart
          ref={svgChartRef}
          key={`${chartType}-${status.success}-${data.length}`}
          data={data}
          margin={{
            top: 6,
            right: 6,
            left: 6,
            bottom: 6,
          }}
        >
          <Tooltip formatter={valueFormatter} labelFormatter={labelFormatter} />

          <ChartGraph
            type="monotoneX"
            dataKey={valueField}
            name={valueFieldLabel}
            stroke={_color}
            strokeWidth={2}
            fill={["bar", "area"].includes(chartType) ? `${_color}` : undefined}
            fillOpacity={0.3}
            opacity={1}
            {...(["line", "area"].includes(chartType)
              ? {
                  activeDot: disableDot ? { r: 0 } : { r: 6 },
                }
              : {})}
            dot={false}
          />
          <XAxis
            dataKey="timestamp"
            name="Time"
            tickFormatter={tickFormatter}
            tick={{ fill: axisColor, fontSize: "13" }}
            tickLine={{ stroke: axisColor }}
            axisLine={{ stroke: axisColor }}
            tickMargin={5}
            padding={{ left: 20, right: 9 }}
          />
          <YAxis
            tickFormatter={valueFormatter}
            tick={{ fill: axisColor, fontSize: "13" }}
            tickLine={{ fill: axisColor }}
            tickMargin={5}
            padding={{ bottom: 10, top: 10 }}
            mirror
          />
        </Chart>
      </ResponsiveContainer>
    </ChartContainer>
  );
};

SeriesChart.propTypes = {
  height: PropTypes.number,
  interval: PropTypes.string,
  title: PropTypes.node,
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
  axisColor: PropTypes.string,
  legend: PropTypes.bool,
  disableDot: PropTypes.bool,
  chartContainer: PropTypes.elementType,
  exportFilename: PropTypes.string,
};

SeriesChart.defaultProps = {
  exportFilename: "export.csv",
  valueField: "value",
  valueFieldLabel: "Value",
  height: 400,
  data: [],
  status: { success: true },
  chartType: "line",
  chartContainer: DefaultChartContainer,
  labelFormatter: (unixTime) => new Date(unixTime).toLocaleString(),
  valueFormatter: (value) => numberWithCommas(value),
  enabledControls: ["intervals", "chartTypes", "actions"],
  axisColor: "#363B3D",
};
