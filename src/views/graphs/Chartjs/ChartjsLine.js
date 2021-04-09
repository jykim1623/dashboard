import { format } from "d3-format";
import { timeFormat } from "d3-time-format";
import React from "react";
import { Line } from "react-chartjs-2";
import { handleSeriesVega } from "../../../app/plugins/elastic.handler";
import uv from "../../../assets/jsons/uv.json";

const data = (data) => {
  return {
    labels: data.map((d) => timeFormat("%H:%m")(d.date)),
    datasets: [
      {
        label: "# of Votes",
        data: data.map((d) => d.value),
        fill: false,
        backgroundColor: "rgb(255, 99, 132)",
        borderColor: "rgba(255, 99, 132, 0.2)",
        pointRadius: 0,
      },
    ],
  };
};

const options = {
  parsing: {
    xAxisKey: "date",
    yAxisKey: "value",
  },
  scales: {
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
        },
      },
    ],
  },
};

const ChartjsLine = () => {
  const { data: d } = handleSeriesVega(uv.responses[0].aggregations);
  return (
    <>
      <div className="header">
        <h1 className="title">Line Chart</h1>
      </div>
      <Line data={data(d.table)} options={options} width={300} height={200} />
    </>
  );
};

export default ChartjsLine;
