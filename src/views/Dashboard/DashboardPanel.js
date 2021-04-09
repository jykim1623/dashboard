import { useHistory } from "react-router";
import { VegaLite } from "react-vega";
import { AutoSizer } from "react-virtualized";
import { handleSeries } from "../../app/plugins/elastic.handler";
import { vegaLiteSeriseSpec } from "../graphs/VegaLite/spec";
// import Graph from "../Graph/Graph";

import statusCode from "../../assets/jsons/statuscode.json";
import bodySent from "../../assets/jsons/bodysent.json";
import uv from "../../assets/jsons/uv.json";
import classNames from "classnames";

import ChartjsMultiLine from "../graphs/Chartjs/ChartjsMultiLine";

const PanelCard = ({ panel, dashboard, clickTitle, width, height }) => {
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
            <VegaLite
              actions={false}
              spec={panel.spec}
              data={panel.data}
              width={width - 50}
              height={height - 61}
              renderer={"canvas"}
            />
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

const DashboardPanel = ({ panel, dashboard, isViewing }) => {
  const history = useHistory();
  const viewToPanel = (e, id) => {
    history.push(`?viewPanel=${id}`);
  };
  const renderPanel = () => {
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
                width={width}
                height={height}
                clickTitle={viewToPanel}
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

  return <div className={classNames(panelWrapperClass)}>{renderPanel()}</div>;
};

export default DashboardPanel;
