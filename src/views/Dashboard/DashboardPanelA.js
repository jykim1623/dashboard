import { data } from "jquery";
import { createContext } from "react";
import { useContext } from "react";
import VegaChart from "../../components/Vega/VegaChart";

const PanelContext = createContext(null);

const DashboardPanelA = ({ data, width, height, panel, handleRange }) => {
  // console.log("1", data, width, height, panel);
  return (
    <PanelContext.Provider value={panel}>
      {data.type === 4 && (
        <Panel
          width={width}
          height={height}
          data={data}
          handleRange={handleRange}
        />
      )}
      {data.type === 5 && (
        <div style={{ display: "flex", height: "100%" }}>
          {data.list.map((l, index) => {
            const length = data.list.length;
            return (
              <Panel
                key={index}
                width={width / length - 10}
                height={height / (data.type === 5 ? 2 : 1)}
                data={l}
                type={data.type}
              />
            );
          })}
        </div>
      )}
    </PanelContext.Provider>
  );
};

const Panel = ({ width, height, data, type, handleRange }) => {
  const panelContext = useContext(PanelContext);
  return (
    <div
      style={{
        position: "relative",
        display: "table",
        width: "100%",
        height: "calc(100% - 24px)",
      }}
    >
      {data?.sum && (
        <PanelInfo data={data} type={type} width={width} height={height} />
      )}
      <div
        style={{
          position: "absolute",
          left: 0,
          top: type === 5 ? "calc(100% /2)" : 0,
        }}
      >
        <VegaChart
          panel={panelContext}
          width={width}
          height={height}
          data={data}
          handleRange={handleRange}
        />
      </div>
    </div>
  );
};

const PanelInfo = ({ data, type, width, height }) => {
  const panelContext = useContext(PanelContext);
  return (
    <div
      style={{
        display: "table-cell",
        verticalAlign: type === 5 ? "" : "middle",
        textAlign: "center",
        position: "relative",
        zIndex: 100,
        width: "100%",
      }}
    >
      {type === 5 && (
        <div style={{ position: "absolute", top: 0, left: 20 }}>{data.key}</div>
      )}
      <div
        style={{
          position: type === 5 ? "absolute" : "relative",
          fontSize: type === 5 ? 17 : 30.4,
          top: type === 5 ? 30 : 0,
          width,
          height,
        }}
      >
        {panelContext.getSum(data.sum)}
      </div>
    </div>
  );
};

export default DashboardPanelA;
