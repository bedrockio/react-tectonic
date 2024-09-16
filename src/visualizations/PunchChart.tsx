import React, { ReactNode } from "react";
import { numberWithCommas } from "../utils/formatting";
import { startCase } from "lodash-es";
import { defaultColors, defaultActions } from "../utils/visualization";
import { useTectonicContext } from "../components/TectonicProvider";
import { getValueFormatter, getMinMaxRange } from "../utils/formatting";
import { getWeekdays, getLocalizedDayName } from "../utils/date";
import { exportToCsv } from "../utils/exporters";
import { sortBy } from "lodash-es";

import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  ZAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

import { IStatus } from "../types";

import {
  Message,
  ChartContainer as DefaultChartContainer,
  TitleAlignType,
} from "../components";

type PunchChartProps = {
  status?: IStatus;
  title?: ReactNode;
  titleAlign?: TitleAlignType;
  limit?: number;
  height?: number;
  labelFormatter?: (label: string) => string;
  valueFormatter?: (value: number) => string;
  localeName?: string;
  data?: any[];
  color?: string;
  enabledControls?: ["actions"];
  chartContainer?: React.ElementType;
  exportFilename?: string;
};

export const PunchChart = ({
  status = { success: true },
  data = [],
  exportFilename = "export.csv",
  valueFormatter = (value) => {
    return numberWithCommas(value);
  },
  labelFormatter = (label) => {
    return startCase(label.toString().toLowerCase());
  },
  enabledControls = ["actions"],
  color,
  localeName = "en-US",
  chartContainer: ChartContainer = DefaultChartContainer,
  title,
  titleAlign,
  height = 500,
}: PunchChartProps): JSX.Element => {
  const ctx = useTectonicContext();

  const range = [18, 220];
  const _color = color || ctx?.primaryColor || defaultColors[0];

  const dataHours = data.reduce((acc, item) => {
    acc.push(...item.hours);
    return acc;
  }, []);

  const domain = getMinMaxRange(dataHours, "count");
  const noData = !dataHours.length || !domain[1];

  const usWeekdays = getWeekdays("en-US");

  const _valueFormatter = valueFormatter || getValueFormatter(domain);

  const parsedData = sortBy(
    data.map((item, index) => {
      const parsedItem = { ...item, hours: sortBy(item.hours, "hour") };
      if (typeof item.day === "string") {
        parsedItem.label = getLocalizedDayName(index, localeName);
        // isoDayOfWeek
        parsedItem.dayOfWeek = index;
      } else {
        parsedItem.label = usWeekdays[item.dayOfWeek];
      }
      return parsedItem;
    }),
    "dayOfWeek"
  );

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

  function handleAction(action: string) {
    if (action === "download-image") {
      // handleDownloadImage(svgChartRef.current);
    } else if (action === "export-data") {
      exportToCsv(
        ["Day", ...new Array(24).fill(0).map((_, i) => `Hour ${i}`)],
        parsedData.map((row) => [
          row.label,
          ...row.hours.map((item) => item.count),
        ]),
        exportFilename
      );
    }
  }

  return (
    <ChartContainer
      title={title}
      height={height}
      titleAlign={titleAlign}
      enabledControls={enabledControls}
      actions={defaultActions}
      onActionChange={handleAction}
    >
      {status.success && noData && (
        <Message>No data available for this time period</Message>
      )}
      {status.loading && <Message>Loading...</Message>}
      {status.error && <Message error>{status.error.message}</Message>}

      <div style={{ marginTop: "1em" }} />

      {parsedData.map((dayData, index) => {
        return (
          <ResponsiveContainer key={dayData.dayOfWeek} width="100%" height={60}>
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
                width={95}
                tick={false}
                tickLine={false}
                axisLine={false}
                label={{
                  value: dayData.label,
                  position: "insideRight",
                  offset: 4,
                }}
              />
              <ZAxis
                type="number"
                dataKey="count"
                domain={domain}
                range={range}
              />
              <Tooltip
                cursor={{ strokeDasharray: "0 1" }}
                wrapperStyle={{ zIndex: 100 }}
                content={(props: any) => renderTooltip(props)}
              />
              <Scatter
                data={dayData.hours.map((item) => {
                  return {
                    ...item,
                    index: 1,
                  };
                })}
                fill={_color}
              >
                {dayData.hours.map((hour, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={hour.count ? _color : "#cacaca"}
                  />
                ))}
              </Scatter>
            </ScatterChart>
          </ResponsiveContainer>
        );
      })}
    </ChartContainer>
  );
};
