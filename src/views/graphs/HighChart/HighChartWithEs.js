import HighChartsReact from "highcharts-react-official";
import HighCharts from "highcharts";

import bodySent from "../../../assets/jsons/bodysent.json";
import {
  generateHighchartData,
  processNestedAggregationDocs,
  processNestedAggregationDocsSample,
} from "../../../app/plugins/elastic.handler";

const options = (series) => ({
  title: null,
  yAxis: {
    title: null,
  },
  series,
  responsive: {
    rules: [
      {
        condition: {
          maxWidth: 500,
        },
        chartOptions: {
          legend: {
            layout: "horizontal",
            align: "center",
            verticalAlign: "bottom",
          },
        },
      },
    ],
  },
});

const HighChartWithEs = () => {
  // const dd = generateHighchartData(bodySent.responses[1].aggregations);
  // console.log(
  //   processNestedAggregationDocsSample(bodySent.responses[1].aggregations)
  // );
  return <HighChartsReact highcharts={HighCharts} options={options()} />;
};

export default HighChartWithEs;
