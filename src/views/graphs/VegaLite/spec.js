const liteSchema = "https://vega.github.io/schema/vega-lite/v5.json";
const url = "https://vega.github.io/editor";
const geourl = 'https://vega.github.io/vega-lite';

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
    color: { field: "symbol", type: "nominal", legend: true },
  },
  view: { stroke: null },
};

export const vegaLiteSeriseSpec = (list) => {
  console.log(list);
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

export const vegaErrorBand = {
  $schema: "https://vega.github.io/schema/vega-lite/v5.json",
  data: { url: `${url}/data/cars.json` },
  encoding: {
    x: {
      field: "Year",
      timeUnit: "year",
      title: null,
    },
  },
  layer: [
    {
      mark: { type: "errorband", extent: "ci" },
      encoding: {
        y: {
          field: "Miles_per_Gallon",
          type: "quantitative",
          title: null,
        },
      },
    },
    {
      mark: "line",
      encoding: {
        y: {
          aggregate: "mean",
          field: "Miles_per_Gallon",
        },
      },
    },
  ],
};

export const vegaHitmap = {
  $schema: "https://vega.github.io/schema/vega-lite/v5.json",
  data: {
    url: `${url}/data/seattle-weather.csv`,
  },
  config: {
    view: {
      strokeWidth: 0,
      step: 13,
    },
    axis: {
      domain: false,
    },
  },
  mark: "rect",
  encoding: {
    x: {
      field: "date",
      timeUnit: "date",
      type: "ordinal",
      title: null,
      axis: {
        labelAngle: 0,
        format: "%e",
      },
    },
    y: {
      field: "date",
      timeUnit: "month",
      type: "ordinal",
      title: null,
    },
    color: {
      field: "temp_max",
      aggregate: "max",
      type: "quantitative",
      legend: null,
    },
  },
};

export const vegaThreshold = {
  $schema: "https://vega.github.io/schema/vega-lite/v5.json",
  description:
    "The PM2.5 value of Beijing observed 15 days, highlighting the days when PM2.5 level is hazardous to human health. Data source https://chartaccent.github.io/chartaccent.html",
  layer: [
    {
      data: {
        values: [
          { Day: 1, Value: 54.8 },
          { Day: 2, Value: 112.1 },
          { Day: 3, Value: 63.6 },
          { Day: 4, Value: 37.6 },
          { Day: 5, Value: 79.7 },
          { Day: 6, Value: 137.9 },
          { Day: 7, Value: 120.1 },
          { Day: 8, Value: 103.3 },
          { Day: 9, Value: 394.8 },
          { Day: 10, Value: 199.5 },
          { Day: 11, Value: 72.3 },
          { Day: 12, Value: 51.1 },
          { Day: 13, Value: 112.0 },
          { Day: 14, Value: 174.5 },
          { Day: 15, Value: 130.5 },
        ],
      },
      layer: [
        {
          mark: "bar",
          encoding: {
            x: { field: "Day", type: "ordinal", axis: { labelAngle: 0 } },
            y: { field: "Value", type: "quantitative" },
          },
        },
        {
          mark: "bar",
          transform: [
            { filter: "datum.Value >= 300" },
            { calculate: "300", as: "baseline" },
          ],
          encoding: {
            x: { field: "Day", type: "ordinal", title: null },
            y: {
              field: "baseline",
              type: "quantitative",
              title: null,
            },
            y2: { field: "Value" },
            color: { value: "#e45755" },
          },
        },
      ],
    },
    {
      data: {
        values: [{}],
      },
      encoding: {
        y: { datum: 200 },
      },
      layer: [
        {
          mark: "rule",
        },
        {
          mark: {
            type: "text",
            align: "right",
            baseline: "bottom",
            dx: -2,
            dy: -2,
            x: "width",
            text: "hazardous",
          },
        },
      ],
    },
  ],
};

export const vegaGeo = {
  $schema: "https://vega.github.io/schema/vega-lite/v5.json",
  width: 500,
  height: 300,
  data: {
    url: `${geourl}/data/us-10m.json`,
    format: {
      type: "topojson",
      feature: "counties",
    },
  },
  transform: [
    {
      lookup: "id",
      from: {
        data: {
          url: `${geourl}/data/unemployment.tsv`,
        },
        key: "id",
        fields: ["rate"],
      },
    },
  ],
  projection: {
    type: "albersUsa",
  },
  mark: "geoshape",
  encoding: {
    color: {
      field: "rate",
      type: "quantitative",
    },
  },
};
