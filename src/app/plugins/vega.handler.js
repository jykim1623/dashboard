export const receiveVegaKinds = (kind) => {
  switch (kind) {
    case "line":
      return lineSpec();
    case "pie":
      return pieSpec();
    case "bar":
      return barSpec();
  }
};

const defaultSpec = {
  $schema: "https://vega.github.io/schema/vega-lite/v5.json",
};

const lineSpec = (items) => {
  return {
    ...defaultSpec,
    data: { values: null },
    description: "line Spec",
    encoding: {
      x: { field: "date", type: "temporal", title: null },
      tooltip: [{ field: "value", type: "quantitative" }],
    },
    layer: [
      {
        params: [
          {
            name: "range",
            select: {
              type: "interval",
              encodings: ["x"],
            },
          },
        ],
        mark: {
          type: "area",
          line: true,
        },
        encoding: {
          y: {
            field: "value",
            type: "quantitative",
            title: null,
            axis: { format: "s" },
          },
          color: {
            field: "symbol",
            type: "nominal",
            legend: null,
            scale: { scheme: "category20" },
          },
        },
      },
    ],
  };
};

const pieSpec = (items) => {
  return {
    ...defaultSpec,
    description: "pie spec",
    data: { values: null },
    mark: { type: "arc", innerRadius: 0 },
    encoding: {
      theta: { field: "value", type: "quantitative" },
      color: {
        field: "symbol",
        type: "nominal",
        legend: null,
        scale: { scheme: "category20" },
        tooltip: [{ field: "value", type: "quantitative" }],
      },
    },
    view: { stroke: null },
  };
};

const barSpec = (items) => {
  return {
    ...defaultSpec,
    data: { values: null },
    mark: { type: "bar" },
    encoding: {
      x: {
        field: "date",
        type: "temporal",
        title: null,
      },
      y: {
        field: "value",
        type: "quantitative",
        title: null,
      },
      color: {
        field: "symbol",
        type: "nominal",
        scale: {
          domain: ["sun", "fog", "drizzle", "rain", "snow"],
          range: ["#e7ba52", "#c7c7c7", "#aec7e8", "#1f77b4", "#9467bd"],
        },
        legend: null,
        title: null,
      },
    },
  };
};
