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
  CartesianGrid,
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
  title,
  chartContainer: ChartContainer,
}) => {
  const ctx = useTectonicContext();

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

  return (
    <ChartContainer title={title}>
      {status.success && noData && (
        <Message>No data available for this time period</Message>
      )}
      {status.loading && <Message>Loading...</Message>}
      {status.error && <Message error>{status.error.message}</Message>}

      <ResponsiveContainer height={400}>
        <Chart
          data={fusedData}
          margin={{
            top: 6,
            right: 6,
            left: 6,
            bottom: 6,
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
            mirror
          />
          {legend && <Legend iconType="circle" />}
          {data.map((data, index) => {
            const color = _colors[index % _colors.length];
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
  title: PropTypes.string,
  /**
   * Is this the principal call to action on the page?
   */
  data: PropTypes.arrayOf(PropTypes.array),
  variant: PropTypes.oneOf(["line", "bar", "area"]),
  colors: PropTypes.arrayOf(PropTypes.string),
  chartContainer: PropTypes.elementType,
};

MultiSeriesChart.defaultProps = {
  data: [],
  status: { success: true },
  colors: defaultColors,
  variant: "line",
  chartContainer: DefaultChartContainer,
};
