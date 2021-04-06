import Dashboard from "./views/Dashboard/Dashboard";
import Chartjs from "./views/graphs/Chartjs";
import D3js from "./views/graphs/D3js";
import GoogleChart from "./views/graphs/GoogleChart";
import VegaLite from "./views/graphs/VegaLite";

const routes = [
  { name: "vega-lite", path: "/graph/vega-lite", Component: VegaLite },
  { name: "google chart", path: "/graph/googlechart", Component: GoogleChart },
  { name: "chartjs", path: "/graph/chartjs", Component: Chartjs },
  { name: "D3js", path: "/graph/d3js", Component: D3js },
  { name: "Dashboard", path: "/d/:id", Component: Dashboard },
];

export default routes;
