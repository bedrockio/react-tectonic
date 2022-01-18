---
title: Table
category: visualizations
type: docs
scope:
  - sampleTableData
---

# Table

Table renders a array of data as table

```playground
<Table
  data={sampleTableData}
>
</Table>
```

## data

`type: array[object]`

```playground
<Table
  data={[
    { x: 1, y: 2, y0: 1 },
    { x: 2, y: 3, y0: 2 },
    { x: 3, y: 5, y0: 2 },
    { x: 4, y: 4, y0: 3 },
    { x: 5, y: 6, y0: 3 }
  ]}
/>
```

## containerComponent

`type: element`

`Table` uses the standard `containerComponent` prop. [Read about it here](/docs/common-props.md#containercomponent)

```jsx
containerComponent={<ContainerComponent/>}
```
