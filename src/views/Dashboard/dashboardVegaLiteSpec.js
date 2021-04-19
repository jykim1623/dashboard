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
        { name: "brush", select: { type: "interval", encodings: ["x"] } },
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
    },
  ],
};

export const vegaLiteSeriseSpecTest = {
  $schema: "https://vega.github.io/schema/vega-lite/v5.json",
  description: "Stock prices of 5 Tech Companies over Time.",
  data: { url: `https://vega.github.io/editor/data/stocks.csv` },
  width: 500,
  height: 200,
  layer: [
    {
      encoding: {
        x: { field: "date", type: "temporal" },
        y: { field: "price", type: "quantitative", stack: null },
        color: { field: "symbol", type: "nominal" },
      },
      layer: [
        { mark: { type: "area", line: true } },
        {
          params: [
            {
              name: "hover",
              select: {
                type: "point",
                fields: ["date"],
                nearest: true,
                on: "mouseover",
                clear: "mouseout",
              },
            },
            {
              name: "label",
              select: {
                type: "point",
                encodings: ["x"],
                nearest: true,
                on: "mouseover",
              },
            },
            { name: "brush", select: { type: "interval", encodings: ["x"] } },
          ],
          mark: "point",
          encoding: {
            opacity: {
              condition: {
                param: "label",
                empty: false,
                value: 1,
              },
              value: 0,
            },
            tooltip: [
              { field: "AAPL", type: "quantitative" },
              { field: "AMZN", type: "quantitative" },
              { field: "GOOG", type: "quantitative" },
              { field: "IBM", type: "quantitative" },
              { field: "MSFT", type: "quantitative" },
            ],
          },
        },
      ],
    },
    {
      layer: [
        {
          mark: { type: "rule", color: "gray" },
          encoding: {
            x: {
              type: "temporal",
              field: "date",
              aggregate: "min",
            },
            // opacity: {
            //   condition: { value: 0.3, param: "hover", empty: false },
            //   value: 0,
            // },
          },
        },
      ],
    },
  ],
};
