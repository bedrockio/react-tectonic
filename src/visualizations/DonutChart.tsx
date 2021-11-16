import React, { ReactNode } from "react";
import PropTypes from "prop-types";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

import { getValueFormatter, getMinMaxRange } from "../utils/formatting";
import { exportToCsv, downloadImage } from "../utils/exporters";

import { startCase, get } from "lodash";
import { numberWithCommas } from "../utils/formatting";
import { defaultColors, defaultActions } from "../utils/visualization";
import { IStatus } from "../types";

import {
  Message,
  ChartContainer as DefaultChartContainer,
  useTectonicContext,
  TitleAlignType,
} from "../components";

const defaultProps = {
  exportFilename: "export.csv",
  status: { success: true },
  data: [],
  colors: defaultColors,
  chartContainer: DefaultChartContainer,
  enabledControls: ["actions"],
  labelFormatter: (label) => {
    return startCase(label.toString().toLowerCase());
  },
  valueFormatter: (value) => {
    return numberWithCommas(value);
  },
  labelField: "key",
  valueField: "count",
};

type EnabledControlType = "actions";

type DonutChartProps = {
  status?: IStatus;
  title?: ReactNode;
  titleAlign?: TitleAlignType;
  limit?: number;
  height?: number;
  labelFormatter?: (label: string) => string;
  valueFormatter?: (value: number) => string;
  valueField: string;
  labelField?: string;
  percent?: boolean;
  precision?: number;
  colorFn?: (entry: any, index: number) => string;
  data: any[];
  colors?: string[];
  chartContainer?: React.ElementType;
  enabledControls?: EnabledControlType[];
  exportFilename?: string;
};

export const DonutChart = ({
  status,
  data,
  labelField,
  height = 400,
  labelFormatter,
  valueFormatter,
  valueField,
  limit,
  percent,
  precision,
  title,
  titleAlign,
  enabledControls,
  chartContainer: ChartContainer,
  colors,
  colorFn,
  exportFilename,
}: DonutChartProps & typeof defaultProps): JSX.Element => {
  const ctx = useTectonicContext();

  const svgChartRef = React.useRef(null);

  let trimmedData: any[] = data;
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
    colors === defaultColors
      ? [ctx?.primaryColor, ...defaultColors].filter(Boolean)
      : colors;

  let total = 0;
  data.forEach((item) => {
    total += get(item, valueField);
  });

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

  function handleAction(option) {
    const getValue = (item) => item[valueField];
    const action = option.value;
    if (action === "download-image") {
      handleDownloadImage(svgChartRef.current);
    } else if (action === "export-data") {
      exportToCsv(
        [`Name`, "Value", "Percentage"],
        trimmedData.map((row) => [
          labelFormatter(get(row, labelField)),
          getValue(row),
          `${Math.round((getValue(row) / total) * 100)}%`,
        ]),
        exportFilename
      );
    }
  }

  const _valueFormatter =
    valueFormatter || getValueFormatter(getMinMaxRange(data, valueField));

  return (
    <ChartContainer
      title={title}
      enabledControls={enabledControls}
      titleAlign={titleAlign}
      height={height}
      actions={defaultActions}
      onActionChange={handleAction}
    >
      {status.success && noData && (
        <Message centered>No data available for this time period</Message>
      )}
      {status.loading && <Message centered>Loading...</Message>}
      {status.error && (
        <Message error centered>
          {status.error.message}
        </Message>
      )}

      <ResponsiveContainer>
        <PieChart
          ref={svgChartRef}
          data={trimmedData}
          key={status.success + ""}
        >
          <Pie
            data={trimmedData}
            innerRadius={Math.round(height * 0.2)}
            outerRadius={Math.round(height * 0.3)}
            fill="#8884d8"
            paddingAngle={5}
            nameKey={labelField}
            dataKey={valueField}
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
          <Legend height={30} formatter={(value) => labelFormatter(value)} />
          {!noData && (
            <Tooltip
              formatter={(value, name, props) => {
                let label = labelFormatter(name);
                if (percent) {
                  if (precision) {
                    return [
                      `${_valueFormatter(
                        Math.round((value / total) * (10 * precision) * 100) /
                          (10 * precision)
                      )}%`,
                      label,
                    ];
                  } else {
                    return [
                      `${_valueFormatter(Math.round((value / total) * 100))}%`,
                      label,
                    ];
                  }
                }

                return [_valueFormatter(value), labelFormatter(name)];
              }}
            />
          )}
        </PieChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
};

DonutChart.propTypes = {
  title: PropTypes.node,
  status: PropTypes.object,
  limit: PropTypes.number,
  labelFormatter: PropTypes.func,
  valueFormatter: PropTypes.func,
  valueField: PropTypes.string,
  labelField: PropTypes.string,
  percent: PropTypes.bool,
  precision: PropTypes.number,
  colorFn: PropTypes.func,
  data: PropTypes.array,
  colors: PropTypes.arrayOf(PropTypes.string),
  chartContainer: PropTypes.elementType,
  enabledControls: PropTypes.arrayOf(PropTypes.oneOf(["actions"])),
  exportFilename: PropTypes.string,
};

DonutChart.defaultProps = defaultProps;
