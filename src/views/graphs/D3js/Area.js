import { extent, max } from "d3-array";
import { scaleLinear, scaleTime } from "d3-scale";
import { create } from "d3-selection";
import { area, curveLinear } from "d3-shape";

const Area = (ref, data) => {
  const width = 500;
  const height = 200;
  const margin = { top: 30, right: 30, bottom: 30, left: 30 };
  const x = scaleTime()
    .domain(extent(data, (d) => d.date))
    .range([margin.left, width - margin.right]);

  const y = scaleLinear()
    .domain([0, max(data, (d) => d.value)])
    .nice()
    .range([height - margin.bottom, margin.top]);

  const curve = curveLinear;

  const areaMax = area()
    .curve(curve)
    .x((d) => x(d.date))
    .y0(y(0))
    .y1((d) => y(d.value));

  const svg = create("svg").attr("viewBox", [0, 0, width, height]);

  svg.append("path").datum(data).attr("fill", "steelblue").attr("d", areaMax);

  
};

export default Area;
