import { useContext, useEffect } from "react";
import { useRef } from "react";
import { parse, View, Warn } from "vega";
import { compile } from "vega-lite";
import { Handler } from "vega-tooltip";

import _ from "lodash";

const VegaRenderer = ({
  panel,
  spec,
  render = "canvas",
  handleRangeCallback,
  width,
  height,
  handleLegendClickCallback,
}) => {
  const renderRef = useRef(null);
  useEffect(() => {
    // console.log(renderRef.current, spec);
    if (!spec) {
      return;
    }

    const tooltipHandler = new Handler({ theme: "dark" }, true).call;
    const vgSpec = compile(spec).spec;
    const view = new View(parse(vgSpec))
      .logLevel(Warn)
      .renderer(render)
      .width(width)
      .height(height)
      .tooltip(tooltipHandler)
      .initialize(renderRef.current);

    if (panel.kinds === "line" && typeof handleRangeCallback !== "undefined") {
      try {
        view.addSignalListener(
          "lineTimeBrush",
          _.debounce(handleRangeCallback, 300)
        );
      } catch (error) {}
    }
    if (typeof handleLegendClickCallback !== "undefined") {
      view.addSignalListener("legendclick", handleLegendClickCallback);
    }

    view.runAsync();

    return () => {
      if (
        panel.kinds === "line" &&
        typeof handleRangeCallback !== "undefined"
      ) {
        try {
          view.removeSignalListener("lineTimeBrush", handleRangeCallback);
        } catch (error) {}
      }
      if (typeof handleLegendClickCallback !== "undefined") {
        view.removeSignalListener("legendclick", handleLegendClickCallback);
      }
    };
  }, [spec, width, height]);

  return <div ref={renderRef}></div>;
};

export default VegaRenderer;
