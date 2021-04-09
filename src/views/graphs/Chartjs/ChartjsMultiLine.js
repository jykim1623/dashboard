import { format } from "d3-format";
import { timeFormat } from "d3-time-format";
import React from "react";
import { Line } from "react-chartjs-2";
import { handleSeriesVega } from "../../../app/plugins/elastic.handler";
import statusCode from "../../../assets/jsons/statuscode.json";
import _ from "lodash";
import { schemeCategory10 } from "d3-scale-chromatic";
import { scaleOrdinal } from "d3-scale";

const colorScale = scaleOrdinal(schemeCategory10);

const data = (data) => {
  const groups = _.chain(data).groupBy("symbol").value();
  const datasets = [];
  const defaultSetting = {
    fill: "origin",
    pointRadius: 0,
  };
  for (const group in groups) {
    const setting = { ...defaultSetting };
    setting.data = groups[group].map((d) => d.value);
    setting.label = group;
    setting.backgroundColor = colorScale(group);
    setting.borderColor = colorScale(group);
    datasets.push(setting);
  }
  return {
    labels: _.chain(data)
      .groupBy("symbol")
      .value()
      ["200"].map((d) => timeFormat("%H:%m")(d.date)),
    datasets,
  };
};

const options = {
  plugins: {
    title: {
      display: false,
    },
  },
  tooltips: {
    position: "nearest",
  },
  interaction: {
    intersect: false,
    mode: "index",
  },
  legend: {
    position: "bottom",
    labels: {
      usePointStyle: true,
    },
  },
};

const ChartjsLine = ({ width, height }) => {
  const { data: d } = handleSeriesVega(statusCode.responses[0].aggregations);
  return (
    <>
      <Line
        data={data(d.table)}
        options={options}
        width={width}
        height={height}
      />
    </>
  );
};

export default ChartjsLine;
