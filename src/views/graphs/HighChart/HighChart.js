import HighChartMultiArea from "./HighChartAreaLine";
import HighChartMultiLine from "./HighChartMultiLine";
import HighChartWithEs from "./HighChartWithEs";

const HighChart = () => {
  return (
    <div style={{ display: "flex" }}>
      <div style={{ width: 400, height: 400 }}>
        <HighChartMultiLine />
      </div>
      <div style={{ width: 400, height: 400 }}>
        <HighChartMultiArea />
      </div>
      <div style={{ width: 400, height: 400 }}>
        <HighChartWithEs />
      </div>
    </div>
  );
};

export default HighChart;
