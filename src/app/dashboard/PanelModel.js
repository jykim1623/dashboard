import axios from "axios";

export class PanelModel {
  constructor(data) {
    this.id = data.id;
    this.gridPos = data.gridPos;
    // this.isViewing = !data.isViewing || false;
    this.title = data.title;
    this.type = data.type;
    this.xaxis = data.xaxis;
    this.yaxis = data.yaxis;
    this.tooltip = data.tooltip;
    this.spec = data.spec;
    this.opt = data.opt || null;

    this.fetchingData(data.url);
  }

  async fetchingData(url) {
    const { data } = await axios.get(`/elastic/real/_${url}`);
    this.insertLineSpec();
    this.convertData(data);
  }

  convertData(d) {
    const data = d;
    this.data = data;
  }

  setData(data) {
    this.data = data;
  }

  getData() {
    return this.data;
  }

  insertLineSpec(opt) {
    const spec = {
      $schema: "https://vega.github.io/schema/vega-lite/v5.json",
      description: "line graph",
      data: { values: this.data },
      mark: {
        type: "area",
        line: true,
      },
      encoding: {
        x: { field: "date", type: "temporal", title: null },
        y: { field: "value", type: "quantitative", title: null },
        color: { field: "symbol", type: "nominal", legend: null },
      },
    };

    if (!opt?.xAxis) {
      this.spec = {
        ...spec,
        encoding: { ...spec.encoding, x: { ...spec.encoding.x, axis: null } },
      };
    }
    if (!opt?.yAxis) {
      this.spec = {
        ...spec,
        encoding: { ...spec.encoding, y: { ...spec.encoding.y, axis: null } },
      };
    }

    if (!opt?.legend) {
      this.spec = {
        ...spec,
        encoding: {
          ...spec.encoding,
          color: { ...spec.encoding.color, legend: opt?.legend },
        },
      };
    }
    this.spec = spec;
  }

  insertPieSpec() {}

  setIsViewing(isViewing) {
    this.isViewing = isViewing;
  }
}
