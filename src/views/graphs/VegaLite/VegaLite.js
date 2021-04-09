import { Vega, VegaLite as VegaRender } from "react-vega";
import { handleSeriesVega } from "../../../app/plugins/elastic.handler";

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
import { View } from "vega-lite";

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

  const callbackHover = function (a, b, c) {
    alert("131313");
  };
  const signalListeners = {
    hover: callbackHover,
    click: callbackHover,
    dragstart: callbackHover,
    brush: callbackHover,
    click: function (a, b, c) {
      console.log(a, b, c)
    }
  };
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
        signalListeners={signalListeners}
      // onNewView={n}
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

const VegaAreaCover = ({ aggs, title }) => {
  const { data, symbols } = handleSeriesVega(aggs);
  return (
    <VegaLiteRenderer
      spec={vegaLiteSeriseSpec(symbols)}
      width={500}
      height={200}
      data={data}
      lite={true}
      title={title}
    />
  );
};

const VegaPieCover = ({ aggs, title }) => {
  const { data } = handleSeriesVega(aggs);
  return (
    <VegaLiteRenderer
      spec={vegaLitePieSpec}
      width={400}
      height={200}
      data={data}
      lite={true}
      title={title}
    />
  );
};

const VegaLite = () => {
  return (
    <div style={{ display: "flex", flexWrap: "wrap" }}>
      <BsCard>
        <VegaAreaCover
          title="status code"
          aggs={statusCode.responses[0].aggregations}
        />
      </BsCard>
      <BsCard>
        <VegaAreaCover
          title="session"
          aggs={session.responses[0].aggregations}
        />
      </BsCard>
      <BsCard>
        <VegaAreaCover title="uv" aggs={uv.responses[0].aggregations} />
      </BsCard>
      <BsCard>
        <VegaPieCover
          title="browser"
          aggs={browser.responses[0].aggregations}
        />
      </BsCard>
    </div>
  );
};

export default VegaLite;
