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
      { value: 1, timestamp: 2 },
      { value: 2, timestamp: 3 },
      { value: 3, timestamp: 5 },
      { value: 4, timestamp: 4 },
      { value: 5, timestamp: 7 }
    ]}
  />
</SeriesChart>
```

## labelFormatter

`type function`

The formatter function of label value which has only one parameter - the json date of the time.
For display purposes (only in the tooltip, when hover over the line).

_default_: `(jsonDate) => new Date(jsonDate).toLocaleString()`

## valueFormatter

`type function`

The formatter function of value which has only one parameter - the value.
For display purposes.

_default_: `(value: number) => string`

## valueField

`type string`

The key to group data by value.

_default_: `value`

## labelField

`type string`

The key to group data by label.

_default_: `timestamp`

## valueLabel

`type string`

Sets the label of value.
If you were display a chart event count over time, you could set the value to "Event Count"

_default_: `Value`

## axisColor

`type string`

Controls the color of the axis. Use #hex color.

_default_ : `#363B3D`

## color

Controls the color of the line. Use #hex color.
A default is provided if nothing is set.

## chartType

`type "line" | "bar" | "area"`

Sets the chart type.

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
