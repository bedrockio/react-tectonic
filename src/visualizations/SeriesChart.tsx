import React, { ReactNode } from "react";
import PropTypes from "prop-types";

import { getValueFormatter, getMinMaxRange } from "../utils/formatting";

import {
  formatterForDataCadence,
  defaultActions,
  defaultChartTypes,
} from "../utils/visualization";

import { exportToCsv, downloadImage } from "../utils/exporters";
import { toCsvDateFormat } from "../utils/date";
import { TimeRangeType } from "../utils/propTypes";

import {
  Message,
  ChartContainer as DefaultChartContainer,
  useTectonicContext,
  TitleAlignType,
} from "../components";

import {
  validIntervals,
  intervalToLabel,
  IntervalType,
} from "../utils/intervals";
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
  ResponsiveContainer,
} from "recharts";

import { IStatus, ITimeRange } from "../types";

import { defaultColors } from "../utils/visualization";

type EnabledControlType = "intervals" | "chartTypes" | "actions";

const defaultProps = {
  exportFilename: "export.csv",
  valueField: "value",
  valueFieldLabel: "Value",
  height: 400,
  data: [],
  status: { success: true },
  chartType: "line",
  chartContainer: DefaultChartContainer,
  labelFormatter: (unixTime) => new Date(unixTime).toLocaleString(),
  enabledControls: ["intervals", "chartTypes", "actions"],
  axisColor: "#363B3D",
};

type SeriesChartProps = {
  height?: number;
  interval?: IntervalType;
  title?: ReactNode;
  titleAlign?: TitleAlignType;
  labelFormatter?: (label: string) => string;
  valueFormatter?: (value: number) => string;
  valueField?: string;
  labelField?: string;
  valueFieldLabel?: string;
  chartType?: "line" | "bar" | "area";
  status: IStatus;
  onIntervalChange?: (interval: IntervalType) => void;
  timeRange?: ITimeRange;
  enabledControls?: EnabledControlType[];
  data?: any[];
  axisColor?: string;
  color?: string;
  legend?: boolean;
  disableDot?: boolean;
  chartContainer?: React.ElementType;
  exportFilename?: string;
};

export const SeriesChart = ({
  status,
  data,
  valueField,
  valueFieldLabel,
  valueFormatter,
  labelFormatter,
  chartContainer: ChartContainer,
  title,
  titleAlign,
  chartType: propsChartType,
  disableDot,
  onIntervalChange,
  interval,
  timeRange,
  color,
  enabledControls,
  exportFilename,
  axisColor,
  height,
}: SeriesChartProps & typeof defaultProps): JSX.Element => {
  const ctx = useTectonicContext();
  const _color = color || ctx?.primaryColor || defaultColors[0];

  const [chartType, setChartType] = React.useState<string>(
    propsChartType || "line"
  );

  const svgChartRef = React.useRef(null);

  let Chart;
  let ChartGraph;

  React.useEffect(() => {
    setChartType(propsChartType);
  }, [propsChartType]);

  if (chartType == "area") {
    Chart = AreaChart;
    ChartGraph = Area;
  } else if (chartType === "bar") {
    Chart = BarChart;
    ChartGraph = Bar;
  } else {
    ChartGraph = Line;
    Chart = LineChart;
  }

  const tickFormatter = formatterForDataCadence(data);

  // should have atleast 2 date point to render meaningful line
  const noData = !data || data.length < 2;

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
        ["Date", "Value"],
        data.map((row) => [
          `"${toCsvDateFormat(new Date(row.timestamp))}"`,
          row.value,
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
      height={height}
      titleAlign={titleAlign}
      enabledControls={noData ? [] : enabledControls}
      intervals={intervals.map((interval) => {
        return {
          label: intervalToLabel(interval),
          value: interval,
        };
      })}
      activeChartType={chartType}
      activeInterval={interval}
      chartTypes={defaultChartTypes}
      actions={defaultActions}
      onChartTypeChange={(chartType) => setChartType(chartType)}
      onActionChange={handleAction}
      onIntervalChange={onIntervalChange}
    >
      {status.success && noData && (
        <Message>No data available for this time period</Message>
      )}
      {status.loading && <Message>Loading...</Message>}
      {status.error && <Message error>{status.error.message}</Message>}
      <ResponsiveContainer
        key={`${chartType}-${status.success}-${data.length}`}
      >
        <Chart
          ref={svgChartRef}
          data={data}
          margin={{
            top: 6,
            right: 6,
            left: 6,
            bottom: 6,
          }}
        >
          <Tooltip
            formatter={_valueFormatter}
            labelFormatter={labelFormatter}
          />

          <ChartGraph
            type="monotoneX"
            dataKey={valueField}
            name={valueFieldLabel}
            stroke={_color}
            strokeWidth={2}
            fill={["bar", "area"].includes(chartType) ? `${_color}` : undefined}
            fillOpacity={0.3}
            opacity={1}
            {...(["line", "area"].includes(chartType)
              ? {
                  activeDot: disableDot ? { r: 0 } : { r: 6 },
                }
              : {})}
            dot={false}
          />
          <XAxis
            dataKey="timestamp"
            name="Time"
            tickFormatter={tickFormatter}
            tick={{ fill: axisColor, fontSize: "13" }}
            tickLine={{ stroke: axisColor }}
            axisLine={{ stroke: axisColor }}
            tickMargin={5}
            padding={{ left: 20, right: 9 }}
          />
          <YAxis
            tickFormatter={_valueFormatter}
            tick={{ fill: axisColor, fontSize: "13" }}
            tickLine={{ fill: axisColor }}
            tickMargin={5}
            padding={{ bottom: 10, top: 10 }}
            mirror
          />
        </Chart>
      </ResponsiveContainer>
    </ChartContainer>
  );
};

SeriesChart.propTypes = {
  height: PropTypes.number,
  interval: PropTypes.string,
  title: PropTypes.node,
  valueFormatter: PropTypes.func,
  labelFormatter: PropTypes.func,
  valueField: PropTypes.string,
  valueFieldLabel: PropTypes.string,
  chartType: PropTypes.oneOf(["line", "bar", "area"]),
  status: PropTypes.object,
  onIntervalChange: PropTypes.func,
  timeRange: TimeRangeType,
  enabledControls: PropTypes.arrayOf(
    PropTypes.oneOf(["intervals", "chartTypes", "actions"])
  ),

  /**
   * Is this the principal call to action on the page?
   */
  data: PropTypes.array,
  /**
   * Color of the line or bar
   */
  color: PropTypes.string,
  axisColor: PropTypes.string,
  legend: PropTypes.bool,
  disableDot: PropTypes.bool,
  chartContainer: PropTypes.elementType,
  exportFilename: PropTypes.string,
};

SeriesChart.defaultProps = defaultProps;
