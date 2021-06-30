import React from "react";
import PropTypes from "prop-types";

import { numberWithCommas } from "../utils/formatting";
import {
  formatterForDataCadence,
  defaultActions,
} from "../utils/visualization";
import { exportToCsv, downloadImage } from "../utils/exporters";
import { toCsvDateFormat } from "../utils/date";

import {
  Message,
  ChartContainer as DefaultChartContainer,
  IconAreaChart,
  IconBarChart,
  IconLineChart,
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
  variant: propsVariant,
  disableDot,
  onIntervalChange,
  timeRange,
  color,
}) => {
  const ctx = useTectonicContext();
  const _color = color || ctx?.primaryColor || defaultColors[0];

  const [variant, setVariant] = React.useState(propsVariant || "line");

  const svgChartRef = React.createRef();

  let Chart = LineChart;
  let ChartGraph = Line;

  React.useEffect(() => {
    setVariant(propsVariant);
  }, [propsVariant]);

  if (variant == "area") {
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
        [
          `"Date - TZ: ${Intl.DateTimeFormat().resolvedOptions().timeZone}"`,
          "Value",
        ],
        data.map((row) => [
          `"${toCsvDateFormat(new Date(row.timestamp))}"`,
          row.value,
        ]),
        "export.csv"
      );
    }
  }

  return (
    <ChartContainer
      title={title}
      intervals={intervals.map((interval) => {
        return {
          label: intervalToLabel(interval),
          value: interval,
        };
      })}
      variants={[
        {
          label: "Line",
          value: "line",
          icon: IconLineChart,
        },
        {
          label: "Bar",
          value: "bar",
          icon: IconBarChart,
        },
        {
          label: "Area",
          value: "area",
          icon: IconAreaChart,
        },
      ]}
      actions={defaultActions}
      onVariant={(option) => setVariant(option.value)}
      onAction={handleAction}
      timeRange={timeRange}
      onIntervalChange={onIntervalChange}
    >
      {status.success && noData && (
        <Message>No data available for this time period</Message>
      )}
      {status.loading && <Message>Loading...</Message>}
      {status.error && <Message error>{status.error.message}</Message>}
      <ResponsiveContainer height={400}>
        <Chart
          ref={svgChartRef}
          key={`${variant}-${status.success}`} //ensure that destroy the chat as we have d
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
            tickMargin={5}
          />
          <YAxis
            tickFormatter={valueFieldFormatter || defaultValueFieldFormatter}
            tick={{ fill: "#6C767B", fontSize: "13" }}
            tickLine={{ fill: "#6C767B" }}
            tickMargin={4}
            padding={{ bottom: 0 }}
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
  interval: PropTypes.string,
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
  chartContainer: PropTypes.elementType,
};

SeriesChart.defaultProps = {
  data: [],
  status: { success: true },
  variant: "line",
  chartContainer: DefaultChartContainer,
};
