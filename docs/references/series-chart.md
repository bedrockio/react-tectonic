---
title: SeriesChart
category: visualizations
type: docs
---

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

# SeriesChart

SeriesChart renders a dataset as a single line path.

```playground
  <SeriesChart
    data={[
      { x: 1, y: 2 },
      { x: 2, y: 3 },
      { x: 3, y: 5 },
      { x: 4, y: 4 },
      { x: 5, y: 7 }
    ]}
  />
</SeriesChart>
```

## labelFormatter

## valueFormatter

## axisColor

## color

## legend

## exportFilename

## chartType

`type "line" | "bar" | "area"

_default_: `line`

### ChartContainer Related Props

## chartContainer

`type: element`

## height

`type: number`

`VictoryLine` uses the standard `height` prop. [Read about it here](/docs/common-props#height)

_default (provided by default theme):_ `height={300}`

```jsx
height={400}
```

## width

`type: number`

`VictoryLine` uses the standard `width` prop. [Read about it here](/docs/common-props#width)

_default:_ `width={100%}`

```jsx
height={400}
```

## title

`type: string`

The title prop specifies the title to be applied to the SVG to assist with accessibility for screen readers. The more descriptive this title is, the more useful it will be for people using screen readers

example `title="Popularity of Dog Breeds by Percentage"`

## titleAlign

`type: "center" | "left"`

The `titleAlign` prop specifies the position of the title.

### Advanced Props

## interval

`type "1s" | "10s" | "1m" | "5m" | "10m" | "15m" | "30m" | "1h" | "1d" | "1w" | "1M" | "1y"`

## onIntervalChange
