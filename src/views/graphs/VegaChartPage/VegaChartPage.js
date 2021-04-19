import { useEffect, useRef } from "react";
import { reqBodySent, reqBrowser } from "../../../app/api/sample.api";
import { useState } from "react";
import { spec, specPie } from "../../../assets/specs/line";
// import { useQuery } from "react-query";
// import axios from "axios";

import { sub, format } from "date-fns";
import _ from "lodash";
import VegaChart from "../../../components/Vega/VegaChart";

const VegaChartPage = () => {
  const from = sub(new Date(), { days: 1 }).getTime();
  const to = new Date().getTime();
  const [time, setTime] = useState([from, to]);
  // const { isLoading, data, error } = useQuery("getbodysent", requestBodysent());
  // console.log(query);

  const [items, setItems] = useState([]);
  const [browser, setBrowser] = useState([]);
  const getData = async () => {
    const items = await reqBodySent(time);
    setItems(items);
  };
  const getBrowser = async () => {
    const items = await reqBrowser();
    const reducer = (acc, cur) => {
      return acc + cur.value;
    };
    const list = _.chain(items)
      .groupBy("symbol")
      .map((d, i) => {
        const b = d.reduce(reducer, 0);
        return { symbol: i, value: b };
      })
      .value();
    setBrowser(list);
  };

  useEffect(() => {
    getData();
    getBrowser();
  }, []);

  const handleRangeCallback = (name, time) => {
    console.log(time);
    // setTime([...time]);
  };
  const handleLegendClickCallback = (a, b) => {
    const click = items.filter((item) => item.symbol === b.symbol[0]);
    // setItems(click);
  };
  return (
    <div style={{ display: "flex", flexWrap: "wrap" }}>
      {items.length && (
        <VegaChart
          vegaSpec={spec({ values: items })}
          render="svg"
          handleRangeCallback={handleRangeCallback}
          handleLegendClickCallback={handleLegendClickCallback}
        />
      )}
      {browser.length && (
        <VegaChart vegaSpec={specPie({ values: browser })} render="svg" />
      )}
      {/* <VegaChart
        vegaSpec={vegaLineSpec(
          handleSeries(bodySent.responses[1].aggregations)
        )}
        render="svg"
      />
      <VegaChart vegaSpec={vegaBarSpec()} render="svg" /> */}
    </div>
  );
};

export default VegaChartPage;
