import { Vega, VegaLite as VegaRender } from "react-vega";
import {
  // generateAggtoAgg,
  handleSeries,
} from "../../../app/plugins/elastic.handler";
// import // geo,
// layeredPlot,
// line,
// lineWithConfidence,
// multilineWithTooltip,
// multiSeriesLine,
// multiSeriesLineArea,
// normalizedStackedArea,
// pie,
// from
// "./spec";

import statusCode from "../../../assets/jsons/statuscode.json";
import bodySent from "../../../assets/jsons/bodysent.json";
import session from "../../../assets/jsons/session.json";
import uv from "../../../assets/jsons/uv.json";
import browser from "../../../assets/jsons/browser.json";
import device from "../../../assets/jsons/device.json";
import totalRequest from "../../../assets/jsons/totalrequests.json";
import referer from "../../../assets/jsons/referer.json";
import {
  vegaLitePieSpec,
  vegaLiteSeriseSpec,
  vegaMultiSeries,
  vegaPie,
  vegaSingleMultiSeries,
} from "./spec";

const VegaLiteRenderer = ({
  spec,
  data = [],
  title = "no title",
  width = 400,
  height = 400,
  lite,
}) => {
  if (lite) {
    return (
      <div>
        <h2>{title}</h2>
        <Vega
          spec={spec}
          width={width}
          height={height}
          actions={false}
          data={data}
          renderer="canvas"
        />
      </div>
    );
  }
  return (
    <div>
      <h2>{title}</h2>
      <VegaRender
        spec={spec}
        width={width}
        height={height}
        actions={false}
        data={data}
        renderer="canvas"
      />
    </div>
  );
};

const BsCard = ({ children }) => {
  return (
    <div className="card">
      <div className="card-body" style={{ height: 300, overflowY: "scroll" }}>
        {children}
      </div>
    </div>
  );
};

const VegaCover = ({ aggs }) => {
  const { data, symbols } = handleSeries(aggs);
  return (
    <VegaLiteRenderer
      spec={vegaLiteSeriseSpec(symbols)}
      width={500}
      height={200}
      data={data}
      lite={true}
    />
  );
};

const VegaLite = () => {
  return (
    <div style={{ display: "flex", flexWrap: "wrap" }}>
      {/* <BsCard>
        <VegaLiteRenderer
          spec={vegaLitePieSpec}
          width={200}
          height={200}
          data={handleSeries(referer.responses[0].aggregations)}
          lite={true}
        />
      </BsCard> */}
      <BsCard>
        <VegaCover aggs={statusCode.responses[0].aggregations} />
      </BsCard>
      {/* <VegaLiteRenderer
        spec={vegaSingleMultiSeries}
        title="status code"
        width={700}
        height={500}
        data={handleSeries(statusCode.responses[0].aggregations)}
      /> */}
      {/* <VegaLiteRenderer
        spec={vegaMultiSeries}
        title="status code"
        data={handleSeries(statusCode.responses[0].aggregations)}
      />
      <VegaLiteRenderer
        spec={vegaMultiSeries}
        data={handleSeries(session.responses[0].aggregations)}
        title="Session"
      />
      <VegaLiteRenderer
        spec={vegaMultiSeries}
        data={handleSeries(uv.responses[0].aggregations)}
        title="uv"
      />
      <VegaLiteRenderer
        spec={vegaMultiSeries}
        data={handleSeries(bodySent.responses[1].aggregations)}
        title="Body sent"
      />
      <VegaLiteRenderer
        spec={vegaPie}
        data={handleSeries(browser.responses[0].aggregations)}
        title="Browser"
      />
      <VegaLiteRenderer
        spec={vegaPie}
        data={handleSeries(device.responses[0].aggregations)}
        title="device"
      />
      <VegaLiteRenderer
        spec={vegaMultiSeries}
        data={handleSeries(totalRequest.responses[0].aggregations)}
        title="Total Request"
      />
      <VegaLiteRenderer
        spec={vegaPie}
        data={handleSeries(referer.responses[0].aggregations)}
        title="Referer"
      /> */}
    </div>
  );
};

export default VegaLite;
