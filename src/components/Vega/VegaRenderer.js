import { useEffect } from "react";
import { useRef } from "react";
import { parse, View, Warn } from "vega";
import { compile } from "vega-lite";
import { Handler } from "vega-tooltip";

import _ from "lodash";

const VegaRenderer = ({
  spec,
  render = "canvas",
  handleRangeCallback,
  width,
  height,
  handleLegendClickCallback,
}) => {
  const renderRef = useRef(null);
  useEffect(() => {
    if (!spec) {
      return;
    }
    const vgSpec = compile(spec).spec;

    const view = new View(parse(vgSpec))
      .logLevel(Warn)
      .renderer(render)
      .width(width)
      .height(height)
      .tooltip(new Handler().call)
      .initialize(renderRef.current);

    if (typeof handleRangeCallback !== "undefined") {
      view.addSignalListener("range", handleRangeCallback);
    }
    if (typeof handleLegendClickCallback !== "undefined") {
      view.addSignalListener("legendclick", handleLegendClickCallback);
    }

    view.runAsync();

    return () => {
      if (typeof handleRangeCallback !== "undefined") {
        view.removeSignalListener("range", handleRangeCallback);
      }
      if (typeof handleLegendClickCallback !== "undefined") {
        view.removeSignalListener("legendclick", handleLegendClickCallback);
      }
    };
  }, [spec, width, height]);

  return <div ref={renderRef}></div>;
};

export default VegaRenderer;
