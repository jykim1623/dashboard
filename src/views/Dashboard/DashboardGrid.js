import ReactGridLayout from "react-grid-layout";
import classNames from "classnames";
import sizeMe from "react-sizeme";
import { hot } from "react-hot-loader";
import { lazy, Suspense, useEffect, useReducer } from "react";
import VegaChartLoading from "../../components/Vega/VegaChartLoading";
import { Subscription } from "rxjs";

const Panel = lazy(() => import("./DashboardPanel"));

const GRID_CELL_HEIGHT = 50;

let lastGridWidth = 1200;
let ignoreNextWidthChange = false;

const GridWrapper = ({
  size,
  layout,
  children,
  onDragStop,
  onResize,
  onResizeStop,
  rowHeight,
  onLayoutChange,
  className,
  isResizable,
  isDraggable,
  viewPanel,
}) => {
  const width = size.width > 0 ? size.width : lastGridWidth;
  if (width !== lastGridWidth) {
    if (ignoreNextWidthChange) {
      ignoreNextWidthChange = false;
    } else if (!viewPanel && Math.abs(width - lastGridWidth) > 8) {
      lastGridWidth = width;
    }
  }

  return (
    <ReactGridLayout
      className={className}
      width={lastGridWidth}
      layout={layout}
      cols={12}
      rowHeight={rowHeight}
      containerPadding={[0, 0]}
      onLayoutChange={onLayoutChange}
      isResizable={isResizable}
      isDraggable={isDraggable}
      onDragStop={onDragStop}
      onResize={onResize}
      onResizeStop={onResizeStop}
      useCSSTransforms={false}
      isBounded={false}
      // transformScale={0}
    >
      {children}
    </ReactGridLayout>
  );
};

const SizedReactLayoutGrid = sizeMe({ monitorWidth: true })(GridWrapper);

const DashboardGrid = ({ dashboard, viewPanel, handleRange, scrollTop }) => {
  const panelMap = {};
  const panelRef = {};
  const eventSubs = new Subscription();
  const [ignored, forceUpdate] = useReducer((x) => x + 1, 0);

  const handleTrigger = () => {
    forceUpdate();
  };

  useEffect(() => {
    eventSubs.add(
      dashboard.events.subscribe(
        { type: "dashboard-panels-changed" },
        handleTrigger
      )
    );

    return () => {
      eventSubs.unsubscribe();
    };
  }, []);

  const isInView = (panel) => {
    if (panel.isViewing || panel.isEditing) {
      return true;
    }

    const elem = panelRef[panel.id.toString()];
    if (!elem) {
      return false;
    }

    const top = elem.offsetTop;
    const height = panel.gridPos.h * GRID_CELL_HEIGHT + 40;
    const bottom = top + height;

    const buffer = 250;

    const viewTop = scrollTop || 0;
    if (viewTop > bottom + buffer) {
      return false;
    }

    const viewHeight = isNaN(window.innerHeight)
      ? window.clientHeight
      : window.innerHeight;
    const viewBot = viewTop + viewHeight;
    if (top > viewBot + buffer) {
      return false;
    }

    return !dashboard.otherPanelInFullscreen(panel);
  };

  const renderPanels = () => {
    const panelElements = [];

    for (const panel of dashboard.panels) {
      const panelClasses = classNames({
        "react-grid-item--fullscreen": panel.isViewing,
      });
      const id = panel.id.toString();
      panel.isInView = isInView(panel);

      panelElements.push(
        <div
          key={`${panel.id}`}
          className={panelClasses}
          id={`panel-${id}-${panel.estype}-${panel.title}`}
        >
          {renderPanel(panel)}
        </div>
      );
    }
    return panelElements;
  };

  const renderPanel = (panel) => {
    return (
      <Suspense fallback={<VegaChartLoading />}>
        <Panel
          panel={panel}
          dashboard={dashboard}
          isViewing={panel.isViewing}
          handleRange={handleRange}
        />
      </Suspense>
    );
  };

  const buildLayout = () => {
    const layout = [];
    for (const panel of dashboard.panels) {
      const stringId = panel.id.toString();
      panelMap[stringId] = panel;

      if (!panel.gridPos) {
        console.log("panel without gridpos");
        continue;
      }

      const panelPos = {
        i: stringId,
        x: panel.gridPos.x,
        y: panel.gridPos.y,
        w: panel.gridPos.w,
        h: panel.gridPos.h,
      };

      layout.push(panelPos);
    }
    return layout;
  };

  const onLayoutChange = (newLayout) => {
    for (const newPos of newLayout) {
      panelMap[newPos?.i].updateGridPos(newPos);
    }

    dashboard.sortPanelsByGridPos();
  };

  const updateGridPos = (item, layout) => {
    panelMap[item?.i].updateGridPos(item);

    // react-grid-layout has a bug (#670), and onLayoutChange() is only called when the component is mounted.
    // So it's required to call it explicitly when panel resized or moved to save layout changes.
    onLayoutChange(layout);
  };

  const onResize = (layout, oldItem, newItem) => {
    panelMap[newItem.i].updateGridPos(newItem);
  };

  const onResizeStop = (layout, oldItem, newItem) => {
    updateGridPos(newItem, layout);
  };

  const onDragStop = (a, b, c) => {
    console.log(a, b, c);
  };
  const { isDraggable, isResizable } = dashboard;
  return (
    <SizedReactLayoutGrid
      className={classNames({ layout: true })}
      layout={buildLayout()}
      viewPanel={viewPanel}
      rowHeight={GRID_CELL_HEIGHT}
      onLayoutChange={onLayoutChange}
      onResize={onResize}
      onResizeStop={onResizeStop}
      isDraggable={isDraggable}
      isResizable={isResizable}
      onDragStop={onDragStop}
    >
      {renderPanels()}
    </SizedReactLayoutGrid>
  );
};

export default hot(module)(DashboardGrid);
