import { useHistory } from "react-router";
import { AutoSizer } from "react-virtualized";
// import Graph from "../Graph/Graph";

import classNames from "classnames";

import ChartjsMultiLine from "../graphs/Chartjs/ChartjsMultiLine";
import { useContext, useEffect, useRef, useState } from "react";
import { useAsyncFn } from "react-use";
import axios from "axios";
import DashboardContext from "../../app/contexts/DashboardContext";
import { initializeAgg } from "../../app/plugins/elastic.handler";
import DashboardPanelA from "./DashboardPanelA";
import { Link } from "react-router-dom";
import VegaChartLoading from "../../components/Vega/VegaChartLoading";

const PanelCard = ({
  panel,
  dashboard,
  clickTitle,
  width,
  height,
  data,
  handleRange,
  loading,
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
        {title && (
          <div
            className="card-header"
            style={{
              display: "flex",
              width: "100%",
              justifyContent: "center",
              alignItems: "center",
            }}
            // onClick={(e) => clickTitle(e, id)}
          >
            <div className="dropdown">
              <button
                className={classNames(
                  "btn",
                  "btn-white",
                  "dropdown-toggle",
                  "btn-sm"
                )}
                type="button"
                id="dropdownMenuButton1"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                {title}
              </button>
              <ul
                className="dropdown-menu"
                aria-labelledby="dropdownMenuButton1"
              >
                <li>
                  <Link className="dropdown-item" to={`?viewPanel=${id}`}>
                    view
                  </Link>
                </li>
              </ul>
            </div>
            {loading && <VegaChartLoading size="sm" />}
          </div>
        )}
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
            {/* <div style={{ display: "flex", justifyContent: "center" }}>
              <div>
                {title} {loading && <div>loading...</div>}
              </div>
            </div> */}
            {!loading && (
              <DashboardPanelA
                width={width}
                height={height}
                data={data}
                panel={panel}
                handleRange={handleRange}
              />
            )}
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
  const { data } = await axios.get(`/elastic/${url}`, {
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
  const renderPanel = (data, loading) => {
    return (
      <AutoSizer>
        {({ width, height }) => {
          if (width === 0) {
            return null;
          }
          return (
            <div style={{ width, height }}>
              <PanelCard
                loading={loading}
                panel={panel}
                dashboard={dashboard}
                width={width - (50 + (panel.vega.color.legend ? 130 : 0))}
                height={height - 80}
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

  const [loading, setLoading] = useState(false);
  const [okData, setOkData] = useState(null);
  const [, fetchEs] = useAsyncFn((url, option) => getES(url, option));
  useEffect(() => {
    const option = {
      service: dashboardOption.service,
      from: new Date(dashboardOption.from).getTime(),
      to: new Date(dashboardOption.to).getTime(),
    };
    // console.log(dashboard.estype);

    const sendUrl =
      panel.estype === "telco"
        ? `telco/_${panel.url}`
        : `real/${option.service}/_${panel.url}`;
    setLoading(true);
    fetchEs(sendUrl, option)
      .then((o) => {
        try {
          setOkData(initializeAgg(o.body.aggregations, panel.kinds));
        } catch (error) {
          setOkData(null);
        }
      })
      .catch((o) => {
        setOkData([]);
      })
      .finally(() => {
        setLoading(false);
      });
    // console.log(dashboardOption, panel, panelRef.current);
  }, [dashboardOption, panel]);

  return (
    <>
      {isViewing && (
        <div className="panel-height-helper">
          <div ref={panelRef} className={classNames(panelWrapperClass)}>
            {renderPanel(okData, loading)}
          </div>
        </div>
      )}
      {!isViewing && (
        <div ref={panelRef} className={classNames(panelWrapperClass)}>
          {renderPanel(okData, loading)}
        </div>
      )}
    </>
  );
};

export default DashboardPanel;
