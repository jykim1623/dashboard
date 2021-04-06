const $schema = "https://vega.github.io/schema/vega/v5.json";
const liteSchema = "https://vega.github.io/schema/vega-lite/v5.json";

export const vegaMultiSeries = {
  $schema,
  data: [{ name: "table" }],
  scales: [
    {
      name: "xscale",
      type: "time",
      domain: { data: "table", field: "date" },
      range: "width",
    },
    {
      name: "yscale",
      domain: { data: "table", field: "value" },
      nice: true,
      zero: true,
      range: "height",
    },
    {
      name: "color",
      type: "ordinal",
      range: "category",
      domain: { data: "table", field: "symbol" },
    },
  ],
  axes: [
    { orient: "bottom", scale: "xscale", grid: true },
    { orient: "left", scale: "yscale", format: "s", grid: true },
  ],
  marks: [
    {
      type: "group",
      from: {
        facet: {
          name: "series",
          data: "table",
          groupby: "symbol",
        },
      },
      marks: [
        {
          type: "area",
          from: { data: "series" },
          encode: {
            enter: {
              x: { scale: "xscale", field: "date" },
              y: { scale: "yscale", field: "value" },
              y2: { scale: "yscale", value: 0 },
              fill: {
                scale: "color",
                field: "symbol",
              },
              opacity: { value: 0.4 },
              // stroke: { scale: "color", field: "symbol" },
              // strokeWidth: { value: 2 },
            },
          },
        },
        {
          type: "line",
          from: { data: "series" },
          encode: {
            enter: {
              x: { scale: "xscale", field: "date" },
              y: { scale: "yscale", field: "value" },
              stroke: { scale: "color", field: "symbol" },
              strokeWidth: { value: 2 },
            },
          },
        },
      ],
    },
  ],
};

export const vegaPie = {
  $schema,
  description: "A basic pie chart example.",
  autosize: "none",
  signals: [
    {
      name: "startAngle",
      value: 0,
    },
    {
      name: "endAngle",
      value: 6.29,
    },
    {
      name: "padAngle",
      value: 0,
    },
    {
      name: "innerRadius",
      value: 0,
    },
    {
      name: "cornerRadius",
      value: 0,
    },
    {
      name: "sort",
      value: true,
    },
  ],

  data: [
    {
      name: "table",
      transform: [
        {
          type: "aggregate",
          fields: ["value"],
          groupby: ["symbol"],
          ops: ["sum"],
          as: ["value"],
        },
        {
          type: "pie",
          field: "value",
          startAngle: { signal: "startAngle" },
          endAngle: { signal: "endAngle" },
          sort: { signal: "sort" },
        },
      ],
    },
  ],

  scales: [
    {
      name: "color",
      type: "ordinal",
      domain: { data: "table", field: "symbol" },
      range: { scheme: "category20" },
    },
  ],

  marks: [
    {
      type: "arc",
      from: { data: "table" },
      encode: {
        enter: {
          fill: { scale: "color", field: "symbol" },
          x: { signal: "width / 2" },
          y: { signal: "height / 2" },
        },
        update: {
          startAngle: { field: "startAngle" },
          endAngle: { field: "endAngle" },
          padAngle: { signal: "padAngle" },
          innerRadius: { signal: "innerRadius" },
          outerRadius: { signal: "width / 4" },
          cornerRadius: { signal: "cornerRadius" },
        },
      },
    },
  ],
};

export const vegaSingleMultiSeries = (list) => {
  return {
    $schema,
    data: [{ name: "table" }],
    scales: [
      {
        name: "xscale",
        type: "time",
        domain: { data: "table", field: "date" },
        range: "width",
      },
      {
        name: "yscale",
        domain: { data: "table", field: "value" },
        nice: true,
        zero: true,
        range: "height",
      },
      {
        name: "color",
        type: "ordinal",
        range: "category",
        domain: { data: "table", field: "symbol" },
      },
    ],
    axes: [
      { orient: "bottom", scale: "xscale", grid: true },
      { orient: "left", scale: "yscale", format: "s", grid: true },
    ],
    marks: [
      {
        type: "group",
        from: {
          facet: {
            name: "series",
            data: "table",
            groupby: "symbol",
          },
        },
        marks: [
          {
            type: "area",
            from: { data: "series" },
            encode: {
              enter: {
                x: { scale: "xscale", field: "date" },
                y: { scale: "yscale", field: "value" },
                y2: { scale: "yscale", value: 0 },
                fill: {
                  scale: "color",
                  field: "symbol",
                },
                opacity: { value: 0.4 },
              },
            },
          },
          {
            type: "line",
            from: { data: "series" },
            encode: {
              enter: {
                x: { scale: "xscale", field: "date" },
                y: { scale: "yscale", field: "value" },
                stroke: { scale: "color", field: "symbol" },
                strokeWidth: { value: 2 },
              },
            },
          },
        ],
      },
    ],
  };
};

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

export const vegaLiteSeriseSpec = (list) => {
  return {
    $schema: "https://vega.github.io/schema/vega-lite/v5.json",
    description: "Stock prices of 5 Tech Companies over Time.",
    data: { name: "table" },
    encoding: {
      x: { field: "date", type: "temporal", title: null },
    },
    layer: [
      {
        mark: {
          type: "area",
          line: true,
        },
        encoding: {
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
      {
        transform: [{ pivot: "symbol", value: "value", groupby: ["date"] }],
        mark: "rule",
        encoding: {
          opacity: {
            condition: { value: 0.3, param: "hover", empty: false },
            value: 0,
          },
          tooltip: list.map((l) => ({ field: l, type: "quantitative" })),
        },
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
        ],
      },
    ],
  };
};
