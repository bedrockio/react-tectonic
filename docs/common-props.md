## containerComponent

`type: element`

The `containerComponent` prop takes a component instance which will be used to create a container element for standalone charts. If a `containerComponent` is not provided, the default `ChartContainer` component will be used.

Tectonic container components all support `title` and `desc` props, which are intended to add accessibility to Tectonic components. The more descriptive these props are, the more accessible your data will be for people using screen readers. These props may be set by passing them directly to the supplied component. By default, all Tectonic container components render responsive `svg` elements using the `viewBox` attribute. To render a static container, set `responsive={false}` directly on the container instance supplied via the `containerComponent` prop. All Tectonic container components also render a `Portal` element that may be used in conjunction with [TectonicPortal][] to force components to render above other children.

Container components are supplied with the following props:

- `domain`
- `height`
- `horizontal`
- `origin` (for polar charts)
- `padding`
- `polar`
- `scale`
- `standalone`
- `style`
- `theme`
- `width`

_default:_ `containerComponent={<TectonicContainer/>}`

```playground
<TectonicScatter
  containerComponent={
    <TectonicCursorContainer
      cursorLabel={({ datum }) => `${datum.x.toPrecision(2)}, ${datum.y.toPrecision(2)}`}
    />
  }
/>
```
