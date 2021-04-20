import { useHistory } from "react-router";
import { VegaLite } from "react-vega";
import { AutoSizer } from "react-virtualized";
// import Graph from "../Graph/Graph";

import classNames from "classnames";

import ChartjsMultiLine from "../graphs/Chartjs/ChartjsMultiLine";
import VegaChart from "../../components/Vega/VegaChart";
import { useContext, useEffect, useRef, useState } from "react";
import { useAsyncFn } from "react-use";
import axios from "axios";
import DashboardContext from "../../app/contexts/DashboardContext";
import { initializeAgg } from "../../app/plugins/elastic.handler";
import VegaChartLoading from "../../components/Vega/VegaChartLoading";

const PanelCard = ({ panel, dashboard, clickTitle, width, height, data }) => {
  const { title, type, id, ...rest } = panel;
  const { label } = dashboard;
  if (label === "chartjs") {
    return (
      <div className={classNames("card", "panel-container")}>
        <div
          className={classNames("card-body", "panel-content")}
          style={{ padding: 0 }}
        >
          <ChartjsMultiLine width={width} height={height} />
        </div>
      </div>
    );
  }

  if (label === "vega") {
    return (
      <div className={classNames("card", "panel-container")}>
        {/* {title && (
          <div
            className="card-header"
            style={{ width: "100%" }}
            onClick={(e) => clickTitle(e, id)}
          >
            {title}
          </div>
        )} */}
        {type === "list" && (
          <ul
            className="list-group list-group-flush"
            style={{ overflowY: "scroll" }}
          >
            <li className="list-group-item">An item</li>
            <li className="list-group-item">A second item</li>
            <li className="list-group-item">A third item</li>
            <li className="list-group-item">A third item</li>
            <li className="list-group-item">A third item</li>
            <li className="list-group-item">A third item</li>
            <li className="list-group-item">A third item</li>
          </ul>
        )}
        {type === "graph" && (
          <div
            className={classNames("card-body", "panel-content")}
            style={{ padding: 0 }}
          >
            <div onClick={(e) => clickTitle(e, id)}>{title}</div>
            <VegaChart
              panel={panel}
              width={width}
              height={height}
              data={data}
            />
            {/* {panel.render(width, height)} */}
          </div>
        )}
        {type === "logs" && (
          <div
            className="card-body"
            style={{ overflowY: "scroll", height: "100%" }}
          >
            <p>abcd</p>
            <p>abcd</p>
            <p>abcd</p>
            <p>abcd</p>
            <p>abcd</p>
            <p>abcd</p>
            <p>abcd</p>
            <p>abcd</p>
          </div>
        )}
      </div>
    );
  }
  return <div>No data</div>;
};

const getES = async (url, params) => {
  const { data } = await axios.get(`/elastic/real/_${url}`, {
    params,
  });
  return data;
};

const DashboardPanel = ({ panel, dashboard, isViewing }) => {
  const dashboardOption = useContext(DashboardContext);
  const panelRef = useRef(null);
  const history = useHistory();
  const viewToPanel = (e, id) => {
    history.push(`?viewPanel=${id}`);
  };
  const renderPanel = (data) => {
    return (
      <AutoSizer>
        {({ width, height }) => {
          if (width === 0) {
            return null;
          }
          return (
            <div style={{ width, height }}>
              <PanelCard
                panel={panel}
                dashboard={dashboard}
                width={width - 50}
                height={height - 60}
                clickTitle={viewToPanel}
                data={data}
              />
            </div>
          );
        }}
      </AutoSizer>
    );
  };

  const panelWrapperClass = classNames({
    "panel-wrapper": true,
    "panel-wrapper--view": isViewing,
  });

  const [loading, setLoading] = useState(true);
  const [okData, setOkData] = useState(null);
  const [, fetchEs] = useAsyncFn((url, time) => getES(url, time));
  useEffect(() => {
    const time = {
      from: new Date(dashboardOption.from).getTime(),
      to: new Date(dashboardOption.to).getTime(),
    };

    fetchEs(panel.url, time).then((o) => {
      try {
        setOkData(initializeAgg(o.body.aggregations, panel.kinds));
      } catch (error) {
        setOkData(null);
      }
      setLoading(false);
    });
    // console.log(dashboardOption, panel, panelRef.current);
  }, [dashboardOption]);
  return (
    <div ref={panelRef} className={classNames(panelWrapperClass)}>
      {loading && <VegaChartLoading />}
      {!loading && renderPanel(okData)}
    </div>
  );
};

export default DashboardPanel;
