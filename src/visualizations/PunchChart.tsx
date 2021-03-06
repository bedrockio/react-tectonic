import React, { ReactNode } from "react";
import { numberWithCommas } from "../utils/formatting";
import { startCase } from "lodash";
import { defaultColors } from "../utils/visualization";
import { useTectonicContext } from "../components/TectonicProvider";
import { getValueFormatter, getMinMaxRange } from "../utils/formatting";
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  ZAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import { IStatus } from "../types";

import {
  Message,
  ChartContainer as DefaultChartContainer,
  TitleAlignType,
} from "../components";

const parseDomain = (data = [] as any) => [
  0,
  Math.max(
    Math.max.apply(
      null,
      data.map((entry) => entry.count)
    ),
    Math.max.apply(
      null,
      data.map((entry) => entry.count)
    )
  ),
];

type PunchChartProps = {
  status?: IStatus;
  title?: ReactNode;
  titleAlign?: TitleAlignType;
  limit?: number;
  height?: number;
  labelFormatter?: (label: string) => string;
  valueFormatter?: (value: number) => string;
  data?: any[];
  color?: string;
  chartContainer?: React.ElementType;
  labels?: string[];
};

export const PunchChart = ({
  status = { success: true },
  data = [],
  valueFormatter = (value) => {
    return numberWithCommas(value);
  },
  labelFormatter = (label) => {
    return startCase(label.toString().toLowerCase());
  },
  color,
  chartContainer: ChartContainer = DefaultChartContainer,
  title,
  titleAlign,
  height = 500,
  labels = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ],
}: PunchChartProps): JSX.Element => {
  const ctx = useTectonicContext();

  const range = [20, 150];
  const _color = color || ctx?.primaryColor || defaultColors[0];

  const noData = false;

  const _valueFormatter =
    valueFormatter || getValueFormatter(getMinMaxRange(data, "count"));

  function renderTooltip({ active, payload }) {
    if (active && payload && payload.length) {
      const data = payload[0] && payload[0].payload;

      return (
        <div
          style={{
            backgroundColor: "#fff",
            border: "1px solid #999",
            margin: 0,
            padding: "0 0.7em",
          }}
        >
          <p>
            Hour {labelFormatter(data.hour)}: {_valueFormatter(data.count)}
          </p>
        </div>
      );
    }

    return null;
  }

  return (
    <ChartContainer
      title={title}
      height={height}
      titleAlign={titleAlign}
      enabledControls={[]}
    >
      {status.success && noData && (
        <Message>No data available for this time period</Message>
      )}
      {status.loading && <Message>Loading...</Message>}
      {status.error && <Message error>{status.error.message}</Message>}

      {data
        .sort((a, b) => a.dayOfWeek - b.dayOfWeek)
        .map((dayData, index) => {
          const domain = parseDomain(dayData.hours);

          return (
            <ResponsiveContainer
              key={dayData.dayOfWeek}
              width="100%"
              height={60}
            >
              <ScatterChart
                height={60}
                margin={{
                  top: 10,
                  right: 0,
                  bottom: 0,
                  left: 0,
                }}
              >
                <XAxis
                  type="category"
                  dataKey="hour"
                  name="hour"
                  interval={0}
                  tick={index !== data.length - 1 ? { fontSize: 0 } : {}}
                  tickLine={{ transform: "translate(0, -6)" }}
                />
                <YAxis
                  type="number"
                  dataKey="index"
                  height={10}
                  width={80}
                  tick={false}
                  tickLine={false}
                  axisLine={false}
                  label={{
                    value: labels[dayData.dayOfWeek - 1],
                    position: "insideRight",
                  }}
                />
                <ZAxis
                  type="number"
                  dataKey="count"
                  domain={domain}
                  range={range}
                />
                <Tooltip
                  cursor={{ strokeDasharray: "3 3" }}
                  wrapperStyle={{ zIndex: 100 }}
                  content={(props: any) => renderTooltip(props)}
                />
                <Scatter
                  data={dayData.hours
                    .map((item) => {
                      return {
                        ...item,
                        index: 1,
                      };
                    })
                    .sort((a, b) => {
                      return a.hour - b.hour;
                    })}
                  fill={_color}
                />
              </ScatterChart>
            </ResponsiveContainer>
          );
        })}
    </ChartContainer>
  );
};
