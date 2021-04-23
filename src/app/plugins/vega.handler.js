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
  data: { values: null },
};

export const generateSpec = (type, spec) => {
  switch (type) {
    case "line":
      return drawSpecLine(spec, type);
    case "pie":
      return drawSpecPie(spec, type);
    case "bar":
  }
};

const params = {
  brush: {
    name: "lineTimeBrush",
    select: {
      type: "interval",
      encodings: ["x"],
      on: "mousedown",
      clear: "mouseup",
    },
  },
};

const drawSpecPie = (spec) => {
  const theta = { ...scaleTheta(spec.theta) };
  const color = { ...colorScale(spec.color) };

  const mark = {
    type: "arc",
    tooltip: true,
  };

  if (spec.donut) {
    mark.innerRadius = 20;
  }

  const result = {
    ...defaultSpec,
    mark,
    ...drawEncoding("encoding", { theta, color }),
    view: { stroke: null },
  };
  return result;
};

const drawSpecLine = (spec) => {
  const x = { ...xAxis(spec.x) };
  const y = { ...yAxis(spec.y) };
  const color = { ...colorScale(spec.color) };

  const mark = {
    type: "area",
    line: true,
    tooltip: true,
  };
  const config = {};
  if (!spec.x.axis) {
    config.view = {
      stroke: 0,
    };
  }
  const result = {
    ...defaultSpec,
    config,
    encoding: { ...drawEncoding("x", x) },
    layer: drawLayer({
      // params: [...spec.params.map((param) => params[param])],
      mark,
      ...drawEncoding("encoding", {
        y,
        color,
        strokeOpacity: {
          value: 0.9,
        },
        fillOpacity: {
          value: 0.4,
        },
      }),
    }),
  };
  return result;
};

const drawLayer = (data) => {
  return [data];
};

const drawEncoding = (key, data) => {
  return {
    [key]: {
      ...data,
    },
  };
};

const xAxis = (axis) => {
  const defaultX = {
    field: "date",
    type: "temporal",
    title: null,
  };
  const result = { ...defaultX, ...axis };

  if (axis.title) {
    result.title = axis.title;
  }
  return result;
};

const yAxis = (axis) => {
  const defaultY = {
    field: "value",
    type: "quantitative",
    title: null,
    axis: {
      format: "s",
    },
    stack: null,
  };
  const result = { ...defaultY, ...axis };

  if (axis.title) {
    result.title = axis.title;
  }
  return result;
};

const colorScale = (color) => {
  const defaultColor = {
    title: null,
    scale: { scheme: "cetegory20" },
  };
  const result = { ...defaultColor, ...color };

  if (color.scale) {
    result.scale = { ...result.color, ...color.scale };
  }

  if (color.legend) {
    result.legend = { ...color.legend };
  }

  return result;
};

const scaleTheta = (theta) => {
  const defaultTheta = { field: "value", type: "quantitative" };

  return defaultTheta;
};

const eventHandler = () => {};

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
    params: [
      {
        name: "range",
        select: {
          type: "interval",
          encodings: ["x"],
        },
      },
    ],
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
