import Dashboard from "./views/Dashboard/Dashboard";
import Chartjs from "./views/graphs/Chartjs";
import D3js from "./views/graphs/D3js";
import GoogleChart from "./views/graphs/GoogleChart";
import HighChart from "./views/graphs/HighChart";
import VegaChartPage from "./views/graphs/VegaChartPage";

const routes = [
  { name: "vega-lite", path: "/graph/vega-lite", Component: VegaChartPage },
  { name: "google chart", path: "/graph/googlechart", Component: GoogleChart },
  { name: "chartjs", path: "/graph/chartjs", Component: Chartjs },
  { name: "D3js", path: "/graph/d3js", Component: D3js },
  { name: "Dashboard", path: "/d/:id", Component: Dashboard },
  { name: "High Chart", path: "/graph/highchart", Component: HighChart },
];

export default routes;
