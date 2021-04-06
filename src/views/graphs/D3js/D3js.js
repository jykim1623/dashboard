import { useEffect } from "react";
import { useRef } from "react";
import { handleSeries } from "../../../app/plugins/elastic.handler";

import uv from "../../../assets/jsons/uv.json";
import Area from "./Area";

const D3js = () => {
  const ref = useRef(null);
  const { data } = handleSeries(uv.responses[0].aggregations);
  useEffect(() => {
    console.log(ref.current);
    Area(ref.current, data.table);
  }, []);

  return <div ref={ref}></div>;
};

export default D3js;
