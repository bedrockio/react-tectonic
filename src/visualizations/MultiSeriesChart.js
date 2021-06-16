import React from "react";
import PropTypes from "prop-types";
import { numberWithCommas } from "../utils/formatting";
import { formatterForDataCadence } from "../utils/_visualization";
import { Message, ChartContainer } from "../components";

import {
  AreaChart,
  LineChart,
  BarChart,
  Area,
  Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

import { defaultColors } from "../utils/_visualization";

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
        byTs[item.timestamp][`${index}-value`] =
          item[valueField || "value"] || 0;
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

const defaultValueFieldFormatter = (value) => numberWithCommas(value);

export const MultiSeriesChart = ({
  data,
  valueField,
  valueFieldNames,
  valueFieldFormatter,
  legend,
  variant,
  stacked,
  colors,
  disableDot,
  status,
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

  const fusedData = fuse(data, valueField);
  const finalColors = colors || defaultColors;

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

  return (
    <ChartContainer>
      {status.success && noData && (
        <Message>No data available for this time period</Message>
      )}
      {status.loading && <Message>Loading...</Message>}
      {status.error && <Message error>{status.error.message}</Message>}

      <ResponsiveContainer height={400}>
        <Chart
          data={fusedData}
          margin={{
            top: 5,
            right: 20,
            left: 10,
            bottom: 5,
          }}
        >
          <CartesianGrid vertical={false} stroke="#EEF0F4" />
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
          {legend && <Legend iconType="circle" />}
          {data.map((data, index) => {
            const color = finalColors[index % finalColors.length];
            return (
              <ChartGraph
                type="monotone"
                key={`${index}-value`}
                dataKey={`${index}-value`}
                name={valueFieldNames ? valueFieldNames[index] : "Value"}
                stroke={color}
                fill={["area", "bar"].includes(variant) ? color : undefined}
                fillOpacity={1}
                opacity={1}
                activeDot={disableDot ? { r: 0 } : { r: 6 }}
                stackId={stacked ? "1" : undefined}
              />
            );
          })}
          {variant !== "bar" && (
            <Tooltip
              formatter={valueFieldFormatter || defaultValueFieldFormatter}
              labelFormatter={(unixTime) => new Date(unixTime).toLocaleString()}
            />
          )}
        </Chart>
      </ResponsiveContainer>
    </ChartContainer>
  );
};

MultiSeriesChart.propTypes = {
  status: PropTypes.object,
  /**
   * Is this the principal call to action on the page?
   */
  data: PropTypes.arrayOf(PropTypes.array),
  /**
   * Color of the line or bar
   */
  color: PropTypes.string,

  variant: PropTypes.oneOf(["line", "bar", "area"]),
};

MultiSeriesChart.defaultProps = {
  data: [],
  status: { success: true },
  color: defaultColors[0],
  variant: "line",
};
