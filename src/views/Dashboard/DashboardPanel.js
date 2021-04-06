import { useHistory } from "react-router";
import { AutoSizer } from "react-virtualized";
// import Graph from "../Graph/Graph";

const Card = ({ panel }) => {
  const { title, type, id, clickTitle, ...rest } = panel;
  return (
    <div className="card" style={{ height: "100%" }}>
      {title && (
        <div className="card-header" onClick={(e) => clickTitle(e, id)}>
          {title}
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
        <div className="card-body" style={{ padding: "0px" }}>
          <AutoSizer>
            {({ height, width }) => (
              // <Graph id={id} width={width} height={height} spec={rest}/>
              <div>check</div>
            )}
          </AutoSizer>
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
};

const DashboardPanel = ({ panel, dashboard }) => {
  const history = useHistory();
  const viewToPanel = (e, id) => {
    history.push(`?viewPanel=${id}`);
  };
  return <Card panel={panel} clickTitle={viewToPanel} />;
};

export default DashboardPanel;
