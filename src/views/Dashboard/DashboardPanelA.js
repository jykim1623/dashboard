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
                height={height}
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
      {data?.sum && <PanelInfo data={data} type={type} />}
      <VegaChart
        panel={panelContext}
        width={width}
        height={height}
        data={data}
        handleRange={handleRange}
      />
    </div>
  );
};

const PanelInfo = ({ data, type }) => {
  const panelContext = useContext(PanelContext);
  return (
    <div
      style={{
        display: "table-cell",
        verticalAlign: "middle",
        textAlign: "center",
        position: "relative",
        zIndex: 100,
      }}
    >
      {type === 5 && (
        <div style={{ position: "absolute", top: 0, left: 20 }}>{data.key}</div>
      )}
      <span style={{ fontSize: type === 5 ? 20 : 30.4 }}>
        {panelContext.getSum(data.sum)}
      </span>
    </div>
  );
};

export default DashboardPanelA;
