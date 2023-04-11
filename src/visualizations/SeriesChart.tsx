import React, { ReactNode } from "react";
import PropTypes from "prop-types";

import { getValueFormatter, getMinMaxRange } from "../utils/formatting";

import {
  formatterForDataCadence,
  defaultActions,
  defaultColors,
} from "../utils/visualization";

import { exportToCsv, downloadImage } from "../utils/exporters";
import { toCsvDateFormat, toDate } from "../utils/date";
import { TimeRangeType } from "../utils/propTypes";
import { AnnotationLine } from "./types";

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

import {
  IconAreaChart,
  IconBarChart,
  IconLineChart,
} from "../components/Icons";

import {
  Area,
  Line,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
  ComposedChart,
} from "recharts";

import { IStatus, ITimeRange } from "../types";

const defaultChartTypes = [
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
];

type EnabledControlType = "intervals" | "chartTypes" | "actions";

const defaultProps = {
  exportFilename: "export.csv",
  valueField: "value",
  valueFieldLabel: "Value",
  confidenceField: "confidence",
  confidenceLabel: "Confidence",
  confidenceColor: "#f57f7f",
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
  valueFormatter?: (value: number | number[]) => string;
  tickFormatter?: (value: Date) => string;
  confidenceField?: string;
  confidenceLabel?: string;
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
  confidenceColor?: string;
  legend?: boolean;
  disableDot?: boolean;
  chartContainer?: React.ElementType;
  exportFilename?: string;
  annotations?: AnnotationLine[];
};

export const SeriesChart = ({
  status,
  data,
  valueField,
  valueFieldLabel,
  valueFormatter,
  labelFormatter,
  confidenceLabel,
  confidenceField,
  chartContainer: ChartContainer,
  title,
  titleAlign,
  chartType: propsChartType,
  disableDot,
  onIntervalChange,
  tickFormatter,
  interval,
  timeRange,
  color,
  enabledControls,
  exportFilename,
  axisColor,
  confidenceColor,
  height,
  annotations = [],
}: SeriesChartProps & typeof defaultProps): JSX.Element => {
  const ctx = useTectonicContext();
  const _color = color || ctx?.primaryColor || defaultColors[0];

  const [chartType, setChartType] = React.useState<string>(
    propsChartType || "line"
  );

  const svgChartRef = React.useRef(null);

  let ChartGraph;

  React.useEffect(() => {
    setChartType(propsChartType);
  }, [propsChartType]);

  if (chartType == "area") {
    ChartGraph = Area;
  } else if (chartType === "bar") {
    ChartGraph = Bar;
  } else {
    ChartGraph = Line;
  }

  const defaultTickFormatter = formatterForDataCadence(data);

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

  function handleAction(action: string) {
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

  const hasConfidence = data.some((row) => row[confidenceField]);

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
        <ComposedChart
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

          {/* its not clear to me how to express the confidence interval in bar chart */}
          {hasConfidence && chartType !== "bar" && (
            <Area
              type="monotoneX"
              dataKey={confidenceField}
              name={confidenceLabel}
              stroke={confidenceColor}
              fill={confidenceColor}
              fillOpacity={0.3}
              strokeOpacity={0.2}
            />
          )}

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
            tickFormatter={tickFormatter || defaultTickFormatter}
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

          {annotations.map((annotation) => {
            return (
              <ReferenceLine
                x={annotation.timestamp.valueOf()}
                stroke={annotation.color}
                label={annotation.label}
              />
            );
          })}
        </ComposedChart>
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
  confidenceField: PropTypes.string,
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
