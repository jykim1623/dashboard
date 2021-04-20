import { lazy, useEffect } from "react";
import { Suspense } from "react";
import VegaChartLoading from "./VegaChartLoading";

const VegaRenderer = lazy(() => import("./VegaRenderer"));

const VegaChart = ({ panel, width, height, data }) => {
  /**
   * 기본 파라미터는 이쪽에서 제시
   * spec에 전달할 내용 - data, graph 정보(type에 따른 spec 전달 처리)
   * 이벤트 처리 >>
   */
  // console.log(panel.spec, data);
  const newSpec = { ...panel.spec, data: { values: data } };
  return (
    <Suspense fallback={<VegaChartLoading />}>
      <VegaRenderer spec={newSpec} width={width} height={height} render="svg" />
      {/* <div>Loading...</div> */}
    </Suspense>
  );
};

export default VegaChart;
