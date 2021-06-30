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

import { exportToCsv, downloadImage } from "../utils/exporters";

import { startCase } from "lodash";
import { numberWithCommas } from "../utils/formatting";
import { defaultColors, defaultActions } from "../utils/visualization";

import {
  Message,
  ChartContainer as DefaultChartContainer,
  useTectonicContext,
} from "../components";

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
  title,
  chartContainer: ChartContainer,
  colors,
  colorFn,
}) => {
  const ctx = useTectonicContext();

  const svgChartRef = React.createRef();

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

  const _colors =
    (colors === defaultColors &&
      ctx?.primaryColor && [ctx?.primaryColor, ...defaultColors]) ||
    defaultColors;

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

  const nameFormatter = keyFormatter || defaultKeyFormatter;

  const getValue = (item) => item[valueField || "count"];

  function handleAction(option) {
    const action = option.value;
    if (action === "download-image") {
      handleDownloadImage(svgChartRef.current);
    } else if (action === "export-data") {
      exportToCsv(
        [`Name`, "Value", "Percentage"],
        trimmedData.map((row) => [
          nameFormatter(row),
          getValue(row),
          `${Math.round((getValue(row) / total) * 100)}%`,
        ]),
        "export.csv"
      );
    }
  }

  return (
    <ChartContainer
      title={title}
      actions={defaultActions}
      onAction={handleAction}
    >
      {status.success && noData && (
        <Message>No data available for this time period</Message>
      )}
      {status.loading && <Message>Loading...</Message>}
      {status.error && <Message error>{status.error.message}</Message>}

      <ResponsiveContainer height={height}>
        <PieChart ref={svgChartRef} data={trimmedData} key={status.success}>
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
                    : _colors[index % _colors.length]
                }
              />
            ))}
          </Pie>

          <Legend />
          {!noData && (
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
          )}
        </PieChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
};

DonutChart.propTypes = {
  title: PropTypes.string,
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
  chartContainer: PropTypes.elementType,
};

DonutChart.defaultProps = {
  status: { success: true },
  data: [],
  colors: defaultColors,
  chartContainer: DefaultChartContainer,
};
