export const spec = (data) => ({
  $schema: "https://vega.github.io/schema/vega-lite/v5.json",
  width: 1000,
  height: 600,
  data,
  encoding: {
    x: {
      field: "date",
      type: "temporal",
    },
    tooltip: [
      { field: "-", type: "quantitative" },
      { field: "EXPIRED", type: "quantitative" },
      { field: "HIT", type: "quantitative" },
      { field: "MISS", type: "quantitative" },
      { field: "REVALIDATED", type: "quantitative" },
      { field: "STALE", type: "quantitative" },
      { field: "UPDATING", type: "quantitative" },
      { field: "total", type: "quantitative" },
    ],
  },
  layer: [
    {
      params: [
        {
          name: "legendclick",
          select: {
            type: "point",
            fields: ["symbol"],
          },
          bind: "legend",
        },
      ],
      mark: {
        type: "area",
        line: true,
      },
      encoding: {
        y: {
          aggregate: "sum",
          field: "value",
          stack: false,
          axis: {
            format: "s",
          },
        },
        color: {
          field: "symbol",
          scale: { scheme: "category10" },
        },
        strokeWidth: {
          value: 1,
        },
        fillOpacity: {
          condition: { param: "legendclick", value: 0.5 },
          value: 0.2,
        },
        opacity: {
          condition: {
            param: "legendclick",
            value: 0.5,
          },
          value: 0.2,
        },
      },
    },
    {
      transform: [{ pivot: "symbol", value: "value", groupby: ["date"] }],
      params: [
        {
          name: "hover",
          select: {
            type: "point",
            fields: ["date"],
            on: "mouseover",
            clear: "mouseout",
            nearest: true,
          },
        },
        {
          name: "range",
          select: {
            type: "interval",
          },
        },
      ],
      mark: "rule",
      encoding: {
        opacity: {
          condition: {
            param: "hover",
            value: 0.5,
            empty: false,
          },
          value: 0,
        },
      },
    },
    // {
    //   mark: "rule",
    //   encoding: {
    //     y: {
    //       datum: 990000000,
    //     },
    //     color: { value: "red" },
    //     size: { value: 1 },
    //   },
    // },
  ],
});

export const specPie = (data) => ({
  $schema: "https://vega.github.io/schema/vega-lite/v5.json",
  data,
  layer: [
    {
      mark: "arc",
      encoding: {
        theta: { field: "value", type: "quantitative" },
        color: {
          field: "symbol",
          type: "nominal",
          scale: { scheme: "sinebow" },
        },
        tooltip: [{ field: "value", type: "quantitative" }],
      },
    },
  ],
  view: { stroke: null },
});
