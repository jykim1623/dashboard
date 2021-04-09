import ChartjsLine from "./ChartjsLine";
import DoughnutChart from "./Doughnut";
import ChartjsMultiAxis from "./ChartjsMultiAxis";
import ChartjsMultiLine from "./ChartjsMultiLine";

const Chartjs = () => {
  return (
    <div>
      <div style={{ width: 400, height: 400 }}>
        <ChartjsMultiLine />
      </div>
      <div style={{ width: 400, height: 400 }}>
        <ChartjsLine />
      </div>
      <div style={{ width: 400, height: 400 }}>
        <DoughnutChart />
      </div>
      <div style={{ width: 400, height: 400 }}>
        <ChartjsMultiAxis />
      </div>
    </div>
  );
};
export default Chartjs;
