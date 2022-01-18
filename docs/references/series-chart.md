---
title: SeriesChart
category: visualizations
type: docs
---

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

_default_: `(unixTime) => new Date(unixTime).toLocaleString()`

## valueFormatter

## valueField

## labelField

## valueFieldLabel

## axisColor

_default_ : `#363B3D`

## color

## legend

`type boolean`

## disableDot

`type boolean`

## exportFilename

## chartType

`type "line" | "bar" | "area"`

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

## enabledControls

_default_: `["intervals", "chartTypes", "actions"]`

### Advanced Props

## interval

`type "1s" | "10s" | "1m" | "5m" | "10m" | "15m" | "30m" | "1h" | "1d" | "1w" | "1M" | "1y"`

## onIntervalChange

## status

_default_: `{ success: true }`

## timeRange
