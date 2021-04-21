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
import { Suspense } from "react";

const PanelCard = ({
  panel,
  dashboard,
  clickTitle,
  width,
  height,
  data,
  handleRange,
}) => {
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
            <div
              style={{
                position: "relative",
                display: "table",
                width: "100%",
                height: "100%",
              }}
            >
              {panel.fieldConfig && (
                <div
                  style={{
                    display: "table-cell",
                    verticalAlign: "middle",
                    textAlign: "center",
                    position: "relative",
                    zIndex: 100,
                  }}
                >
                  <span style={{ fontSize: 30.4 }}>
                    {panel.getSum(data.sum)}
                  </span>
                </div>
              )}
              <VegaChart
                panel={panel}
                width={width}
                height={height}
                data={data}
                handleRange={handleRange}
              />
            </div>
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
  const { data } = await axios.get(`/elastic/real/${params.service}/_${url}`, {
    params: {
      from: params.from,
      to: params.to,
    },
  });
  return data;
};

const DashboardPanel = ({ panel, dashboard, isViewing, handleRange }) => {
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
                handleRange={handleRange}
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
  const [, fetchEs] = useAsyncFn((url, option) => getES(url, option));
  useEffect(() => {
    const option = {
      service: dashboardOption.service,
      from: new Date(dashboardOption.from).getTime(),
      to: new Date(dashboardOption.to).getTime(),
    };

    fetchEs(panel.url, option).then((o) => {
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
    <Suspense fallback={<VegaChartLoading />}>
      <div ref={panelRef} className={classNames(panelWrapperClass)}>
        {!loading && renderPanel(okData)}
      </div>
    </Suspense>
  );
};

export default DashboardPanel;
