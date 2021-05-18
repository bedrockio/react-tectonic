import React from "react";
import PropTypes from "prop-types";

import { numberWithCommas } from "../utils/formatting";
import { formatterForDataCadence } from "../utils/visualization";

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

import moment from "moment";
import { defaultColors } from "../utils/visualization";

export const SeriesChart = ({
  data,
  valueField,
  valueFieldName,
  valueFieldFormatter,
  legend,
  variant,
  disableDot,
  color = defaultColors[0],
}) => {
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
  ///XXX todo deal with no data
  const noData = !data || !data.length;

  return (
    <ResponsiveContainer height={400}>
      <Chart
        data={data}
        margin={{
          top: 5,
          right: 20,
          left: 25,
          bottom: 5,
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
          tickMargin={8}
        />
        {variant !== "bar" && (
          <Tooltip
            labelFormatter={(unixTime) =>
              moment(unixTime).format("YY/MM/DD LT")
            }
          />
        )}
        {legend && <Legend />}
        <ChartGraph
          type="monotone"
          dataKey={valueField || "value"}
          name={valueFieldName || "Value"}
          stroke={color}
          strokeWidth={2}
          fill={["bar", "area"].includes(variant) ? color : undefined}
          opacity={1}
          activeDot={
            disableDot ? { r: 0 } : { r: 6, strokeWidth: 2, fill: "#f5821f" }
          }
          dot={{
            stroke: color,
            strokeWidth: 2,
            strokeOpacity: 1,
            r: 4,
            fill: "#fff",
          }}
          barSize={30}
        />
      </Chart>
    </ResponsiveContainer>
  );
};

SeriesChart.propTypes = {
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
  color: defaultColors[0],
  variant: "line",
};
