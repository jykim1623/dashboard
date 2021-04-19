import { lazy, useEffect } from "react";
import { Suspense } from "react";
import VegaChartLoading from "./VegaChartLoading";

const VegaRenderer = lazy(() => import("./VegaRenderer"));

const VegaChart = ({ panel, width, height }) => {
  /**
   * 기본 파라미터는 이쪽에서 제시
   * spec에 전달할 내용 - data, graph 정보(type에 따른 spec 전달 처리)
   * 이벤트 처리 >>
   *
   */
  return (
    <Suspense fallback={<VegaChartLoading />}>
      <VegaRenderer
        spec={panel.spec}
        width={width}
        height={height}
        render="svg"
      />
      {/* <div>Loading...</div> */}
    </Suspense>
  );
};

export default VegaChart;
