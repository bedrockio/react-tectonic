import React from "react";
import PropTypes from "prop-types";

import { numberWithCommas } from "../utils/formatting";
import { formatterForDataCadence } from "../utils/visualization";
import {
  Message,
  ChartContainer as DefaultChartContainer,
} from "../components";
import { useTectonicContext } from "../components/TectonicProvider";

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

export const SeriesChart = ({
  status,
  data,
  valueField,
  valueFieldName,
  valueFieldFormatter,
  chartContainer: ChartContainer,
  legend,
  title,
  variant,
  disableDot,
  interval,
  onIntervalChange,
  timeRange,
  color,
}) => {
  const ctx = useTectonicContext();

  const _color = color || ctx?.primaryColor || defaultColors[0];

  let Chart = LineChart;
  let ChartGraph = Line;

  if (variant === "area") {
    Chart = AreaChart;
    ChartGraph = Area;
  }
  if (variant === "bar") {
    Chart = BarChart;
    ChartGraph = Bar;
  }

  const tickFormatter = formatterForDataCadence(data);

  const defaultValueFieldFormatter = (value) => numberWithCommas(value);
  const noData = !data || !data.length;

  return (
    <ChartContainer
      title={title}
      timeRange={timeRange}
      interval={interval}
      onIntervalChange={onIntervalChange}
    >
      {status.success && noData && (
        <Message>No data available for this time period</Message>
      )}
      {status.loading && <Message>Loading...</Message>}
      {status.error && <Message error>{status.error.message}</Message>}
      <ResponsiveContainer height={400}>
        <Chart
          key={status.success} //ensure that destroy the chat as we have d
          data={data}
          margin={{
            top: 6,
            right: 6,
            left: 6,
            bottom: 6,
          }}
        >
          <XAxis
            dataKey="timestamp"
            name="Time"
            tickFormatter={tickFormatter}
            tick={{ fill: "#6C767B", fontSize: "13" }}
            tickLine={{ stroke: "#6C767B" }}
            axisLine={{ stroke: "#6C767B" }}
            tickMargin={8}
          />
          <YAxis
            tickFormatter={valueFieldFormatter || defaultValueFieldFormatter}
            tick={{ fill: "#6C767B", fontSize: "13" }}
            tickLine={{ fill: "#6C767B" }}
            tickMargin={10}
            orientation="left"
            type="number"
            mirror
          />
          {variant !== "bar" && (
            <Tooltip
              labelFormatter={(unixTime) => new Date(unixTime).toLocaleString()}
            />
          )}
          {legend && <Legend />}
          <ChartGraph
            type="monotoneX"
            dataKey={valueField || "value"}
            name={valueFieldName || "Value"}
            stroke={_color}
            strokeWidth={2}
            fill={["bar", "area"].includes(variant) ? _color : undefined}
            opacity={1}
            activeDot={
              disableDot ? { r: 0 } : { r: 6, strokeWidth: 2, fill: "#f5821f" }
            }
            dot={false}
            barSize={30}
          />
        </Chart>
      </ResponsiveContainer>
    </ChartContainer>
  );
};

SeriesChart.propTypes = {
  title: PropTypes.string,
  status: PropTypes.object,
  interval: PropTypes.interval,
  onIntervalChange: PropTypes.func,
  /**
   * Is this the principal call to action on the page?
   */
  data: PropTypes.array,
  /**
   * Color of the line or bar
   */
  color: PropTypes.string,

  variant: PropTypes.oneOf(["line", "bar", "area"]),
};

SeriesChart.defaultProps = {
  data: [],
  status: { success: true },
  variant: "line",
  chartContainer: DefaultChartContainer,
};
