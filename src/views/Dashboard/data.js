import { handleSeries } from "../../app/plugins/elastic.handler";
import { vegaLitePieSpec, vegaLiteSeriseSpec } from "./dashboardVegaLiteSpec";

import bodySent from "../../assets/jsons/bodysent.json";
import statusCode from "../../assets/jsons/statuscode.json";
import uv from "../../assets/jsons/uv.json";
import top5 from "../../assets/jsons/uv.json";
import session from "../../assets/jsons/session.json";
import browser from "../../assets/jsons/browser.json";
import { vegaErrorBand, vegaGeo, vegaHitmap, vegaThreshold } from "../graphs/VegaLite/spec";

export const dashboard = [
  {
    id: "00000001",
    title: "chartjs",
    label: "chartjs",
    panelInView: true,
    isResizable: false,
    isDraggable: false,
    panels: [
      {
        id: 1,
        title: "status Code",
        gridPos: {
          h: 5,
          w: 4,
          x: 0,
          y: 0,
        },
      },
      {
        id: 2,
        title: "status Code",
        gridPos: {
          h: 5,
          w: 4,
          x: 4,
          y: 0,
        },
      },
      {
        id: 3,
        title: "status Code",
        gridPos: {
          h: 7,
          w: 12,
          x: 0,
          y: 5,
        },
      },
    ],
  },
  {
    id: "00000002",
    title: "vega-lite",
    label: "vega",
    panelInView: true,
    isResizable: false,
    isDraggable: false,
    panels: [
      {
        id: 21,
        title: 21,
        gridPos: {
          w: 6,
          h: 5,
          x: 0,
          y: 1,
          i: "1",
          minW: 2,
          minH: 3,
          moved: false,
          static: false,
        },
        type: "graph",
        spec: vegaThreshold,
        data: handleSeries(browser.responses[0].aggregations),
      },
      {
        id: 22,
        title: 22,
        gridPos: {
          w: 6,
          h: 5,
          x: 6,
          y: 1,
          i: "1",
          minW: 2,
          minH: 3,
          moved: false,
          static: false,
        },
        type: "graph",
        spec: vegaGeo,
        data: handleSeries(browser.responses[0].aggregations),
      },
      {
        id: 11,
        title: 1,
        gridPos: {
          w: 2,
          h: 3,
          x: 0,
          y: 1,
          i: "1",
          minW: 2,
          minH: 3,
          moved: false,
          static: false,
        },
        type: "graph",
        spec: vegaErrorBand,
        data: handleSeries(browser.responses[0].aggregations),
      },
      {
        id: 12,
        title: 1,
        gridPos: {
          w: 2,
          h: 3,
          x: 2,
          y: 0,
          i: "1",
          minW: 2,
          minH: 3,
          moved: false,
          static: false,
        },
        type: "graph",
        spec: vegaLitePieSpec,
        data: handleSeries(browser.responses[0].aggregations),
      },
      {
        id: 1,
        title: 1,
        gridPos: {
          w: 2,
          h: 3,
          x: 4,
          y: 0,
          i: "1",
          minW: 2,
          minH: 3,
          moved: false,
          static: false,
        },
        type: "graph",
        spec: vegaLitePieSpec,
        data: handleSeries(browser.responses[0].aggregations),
      },
      // {
      //   id: 2,
      //   title: 2,
      //   gridPos: {
      //     w: 2,
      //     h: 4,
      //     x: 2,
      //     y: 0,
      //     i: "2",
      //     minW: 2,
      //     minH: 3,
      //     moved: false,
      //     static: false,
      //   },
      //   type: "graph",
      // },
      // {
      //   id: 3,
      //   title: 3,
      //   gridPos: {
      //     w: 2,
      //     h: 4,
      //     x: 4,
      //     y: 0,
      //     i: "3",
      //     minW: 2,
      //     minH: 3,
      //     moved: false,
      //     static: false,
      //   },
      //   type: "graph",
      // },
      {
        id: 4,
        title: 4,
        gridPos: {
          w: 6,
          h: 3,
          x: 6,
          y: 0,
          i: "4",
          minW: 2,
          minH: 3,
          moved: false,
          static: false,
        },
        type: "graph",
        spec: vegaLiteSeriseSpec,
        data: handleSeries(uv.responses[0].aggregations),
      },
      // {
      //   id: 5,
      //   title: 5,
      //   gridPos: {
      //     w: 2,
      //     h: 4,
      //     x: 8,
      //     y: 0,
      //     i: "5",
      //     minW: 2,
      //     minH: 3,
      //     moved: false,
      //     static: false,
      //   },
      //   type: "graph",
      // },
      // {
      //   id: 6,
      //   title: 6,
      //   gridPos: {
      //     w: 2,
      //     h: 4,
      //     x: 10,
      //     y: 0,
      //     i: "6",
      //     minW: 2,
      //     minH: 3,
      //     moved: false,
      //     static: false,
      //   },
      //   type: "graph",
      // },
      {
        id: 7,
        title: 7,
        gridPos: {
          w: 6,
          h: 5,
          x: 0,
          y: 3,
          i: "7",
          minW: 2,
          minH: 3,
          moved: false,
          static: false,
        },
        type: "list",
      },
      {
        id: 8,
        title: 8,
        gridPos: {
          w: 6,
          h: 5,
          x: 6,
          y: 3,
          i: "7",
          minW: 2,
          minH: 3,
          moved: false,
          static: false,
        },
        type: "graph",
        spec: vegaHitmap,
        data: handleSeries(session.responses[0].aggregations),
      },
      {
        id: 9,
        title: 9,
        gridPos: {
          w: 12,
          h: 5,
          x: 0,
          y: 0,
          i: "9",
          minW: 2,
          minH: 3,
          moved: false,
          static: false,
        },
        type: "graph",
        spec: vegaLiteSeriseSpec,
        data: handleSeries(bodySent.responses[1].aggregations),
      },
      {
        id: 10,
        title: 10,
        gridPos: {
          w: 12,
          h: 5,
          x: 0,
          y: 13,
          i: "10",
          minW: 2,
          minH: 3,
          moved: false,
          static: false,
        },
        type: "graph",
        spec: vegaLiteSeriseSpec,
        data: handleSeries(statusCode.responses[0].aggregations),
      },
    ],
  },
  {
    id: "00000003",
    title: "chartjs",
    panelInView: true,
    label: "highchart",
    isResizable: false,
    isDraggable: false,
    panels: [
      {
        id: 1,
        title: 1,
        gridPos: {
          w: 12,
          h: 5,
          x: 0,
          y: 13,
          i: "10",
          minW: 2,
          minH: 3,
          moved: false,
          static: false,
        },
        type: "graph",
      },
    ],
  },
];
