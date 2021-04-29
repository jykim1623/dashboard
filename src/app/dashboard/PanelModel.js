import axios from "axios";
import { format } from "d3-format";
import VegaChart from "../../components/Vega/VegaChart";
import VegaRenderer from "../../components/Vega/VegaRenderer";
import { initializeAgg } from "../plugins/elastic.handler";
import { receiveVegaKinds, generateSpec } from "../plugins/vega.handler";
import { byteCalculation, priceToString } from "../utils/util.string";

export class PanelModel {
  constructor(data) {
    this.id = data.id;
    this.gridPos = data.gridPos;
    // this.isViewing = !data.isViewing || false;
    this.title = data.title;
    this.type = data.type;
    this.tooltip = data.tooltip;
    this.spec = data.spec;
    this.opt = data.opt || null;
    this.url = data.url;
    this.time = data.time;
    this.kinds = data.kinds;
    this.vega = data.vega;
    this.estype = data.estype;
    this.fieldConfig = data.fieldConfig;
    this.info = data.info;
    // this.init(data.url);
    this.getSpec();
  }

  getSum(sum) {
    const { unit } = this.fieldConfig;
    if (unit == "bytes") {
      return byteCalculation(sum);
    }
    if (unit == "short") {
      return format("~s")(sum);
    }
    if (unit === "none") {
      return priceToString(sum);
    }
    return sum;
  }

  setSpec(data) {
    const newSpec = { ...receiveVegaKinds(this.kinds) };
    newSpec.data.values = data;
  }

  async fetchingData(url) {
    const params = {};
    if (this.time) {
      params.from = new Date(this.time.from).getTime();
      params.to = new Date(this.time.to).getTime();
    }
    const { data } = await axios.get(`/elastic/real/_${url}`, {
      params,
    });
    const items = initializeAgg(data.body.aggregations, this.kinds);
    // this[`${this.kinds}InsertSpec`](items, this.opt);
    // console.log(items);
    // this[`lineInsertSpec`](items, this.opt);

    // const abc =
    // console.log(abc);
  }

  getSpec() {
    this.spec = generateSpec(this.kinds, this.vega);
    // this.spec = receiveVegaKinds(this.kinds);
  }

  setIsViewing(isViewing) {
    this.isViewing = isViewing;
  }

  render(width, height) {
    return (
      <VegaChart
        spec={this.spec}
        width={width - 50}
        height={height - 40}
        render="svg"
      />
    );
  }

  updateGridPos(newPos) {
    this.gridPos.x = newPos.x;
    this.gridPos.y = newPos.y;
    this.gridPos.w = newPos.w;
    this.gridPos.h = newPos.h;
  }

  init(url) {
    this.fetchingData(url);
  }
}
