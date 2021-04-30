import { lazy } from "react";
import _ from "lodash";

const VegaRenderer = lazy(() => import("./VegaRenderer"));

const VegaChart = ({ panel, width, height, data, handleRange }) => {
  /**
   * 기본 파라미터는 이쪽에서 제시
   * spec에 전달할 내용 - data, graph 정보(type에 따른 spec 전달 처리)
   * 이벤트 처리 >>
   */
  const newSpec = { ...panel.spec, data: { values: data.list } };
  if (data.hasOwnProperty("keys")) {
    // const a = _.cloneDeep(newSpec);
    newSpec.layer[1].encoding.tooltip = data.keys.map((key) => ({
      field: key,
      type: "quantitative",
      format: "~s",
    }));
    // newSpec.layer[0].encoding.color.datum = { repeat: "layer" };
  }
  return (
    <VegaRenderer
      panel={panel}
      spec={newSpec}
      width={width}
      height={height}
      render="canvas"
      handleRangeCallback={handleRange}
    />
  );
};

export default VegaChart;
