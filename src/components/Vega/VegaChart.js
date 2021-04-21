import { lazy } from "react";

const VegaRenderer = lazy(() => import("./VegaRenderer"));

const VegaChart = ({ panel, width, height, data, handleRange }) => {
  /**
   * 기본 파라미터는 이쪽에서 제시
   * spec에 전달할 내용 - data, graph 정보(type에 따른 spec 전달 처리)
   * 이벤트 처리 >>
   */
  // console.log(panel.spec, data);
  const newSpec = { ...panel.spec, data: { values: data.list } };
  return (
    <VegaRenderer
      spec={newSpec}
      width={width}
      height={height}
      render="svg"
      handleRange={handleRange}
    />
  );
};

export default VegaChart;
