import React from "react";
import PropTypes from "prop-types";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

import { startCase } from "lodash";
import { numberWithCommas } from "../utils/formatting";
import { defaultColors } from "../utils/visualization";
import { Message, ChartContainer } from "../components";

/**
 * Primary UI component for user interaction
 */
export const DonutChart = ({
  status,
  data,
  keyField,
  keyFormatter,
  valueField,
  limit,
  percent,
  precision,
  labels = {},
  colors,
  colorFn,
}) => {
  let trimmedData = data;
  if (limit) {
    const other = { key: "Other", count: 0, value: 0 };
    data.slice(limit - 1).forEach((item) => {
      other.count += item.count;
      other.value += item.value;
    });
    trimmedData = data.slice(0, limit - 1);
    if (data.length > limit) {
      trimmedData.push(other);
    }
  }

  let total = 0;
  data.forEach((item) => {
    total += item[valueField || "count"];
  });

  const defaultKeyFormatter = (item) => {
    const key = keyField || "key";
    const label = item[key].toString();
    if (label.length <= 3) {
      return label.toUpperCase();
    }
    return labels[key] || startCase(label.toLowerCase());
  };

  const height = 400;

  const noData = !trimmedData.length;
  if (noData) {
    trimmedData = [{ key: "No Data", count: 1, value: 0 }];
  }

  return (
    <ChartContainer>
      {status.success && noData && (
        <Message>No data available for this time period</Message>
      )}
      {status.loading && <Message>Loading...</Message>}
      {status.error && <Message error>{status.error.message}</Message>}

      <ResponsiveContainer height={height}>
        <PieChart data={trimmedData}>
          <Pie
            data={trimmedData}
            innerRadius={Math.round(height * 0.2)}
            outerRadius={Math.round(height * 0.36)}
            fill="#8884d8"
            paddingAngle={5}
            nameKey={keyFormatter || defaultKeyFormatter}
            dataKey={valueField || "count"}
          >
            {trimmedData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={
                  colorFn
                    ? colorFn(entry, index)
                    : colors[index % colors.length]
                }
              />
            ))}
          </Pie>

          <Legend />
          <Tooltip
            formatter={(value) => {
              if (percent) {
                if (precision) {
                  return `${
                    Math.round((value / total) * (10 * precision) * 100) /
                    (10 * precision)
                  }%`;
                } else {
                  return `${Math.round((value / total) * 100)}%`;
                }
              }

              return numberWithCommas(value);
            }}
          />
        </PieChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
};

DonutChart.propTypes = {
  status: PropTypes.object,
  /**
   * Is this the principal call to action on the page?
   */
  data: PropTypes.array,
  /**
   * What background color to use
   */
  keyField: PropTypes.string,

  /**
   * Labels
   */
  labels: PropTypes.object,
  colors: PropTypes.arrayOf(PropTypes.string),
};

DonutChart.defaultProps = {
  status: { success: true },
  data: [],
  colors: defaultColors,
};
