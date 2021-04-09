const liteSchema = "https://vega.github.io/schema/vega-lite/v5.json";

export const vegaLitePieSpec = {
  $schema: liteSchema,
  data: { name: "table" },
  transform: [
    {
      aggregate: [{ op: "sum", field: "value", as: "value" }],
      groupby: ["symbol"],
    },
  ],
  mark: "arc",
  encoding: {
    theta: { field: "value", type: "quantitative" },
    color: { field: "symbol", type: "nominal", legend: null },
  },
  view: { stroke: null },
};

export const vegaLiteSeriseSpec = {
  $schema: "https://vega.github.io/schema/vega-lite/v5.json",
  description: "Stock prices of 5 Tech Companies over Time.",
  data: { name: "table" },
  layer: [
    {
      params: [
        { name: 'brush', select: { type: 'interval', encodings: ['x'], } }
      ],
      mark: {
        type: "area",
        line: true,
      },
      encoding: {
        x: { field: "date", type: "temporal", title: null },
        y: {
          field: "value",
          type: "quantitative",
          axis: { format: "s" },
          title: null,
        },
        color: {
          field: "symbol",
          type: "nominal",
          legend: null,
        },
      },
    }
  ]
};

