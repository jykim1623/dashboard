import ReactGridLayout from "react-grid-layout";
import classNames from "classnames";
import sizeMe from "react-sizeme";
import { hot } from "react-hot-loader";
import { lazy, Suspense } from "react";
import VegaChartLoading from "../../components/Vega/VegaChartLoading";

const Panel = lazy(() => import("./DashboardPanel"));

let lastGridWidth = 1200;
let ignoreNextWidthChange = false;

const GridWrapper = ({
  size,
  layout,
  children,
  onDragStop,
  onResize,
  onResizeStop,
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
      rowHeight={50}
      containerPadding={[0, 0]}
      onLayoutChange={onLayoutChange}
      isResizable={isResizable}
      isDraggable={isDraggable}
      onDragStop={onDragStop}
      onResize={onResize}
      onResizeStop={onResizeStop}
      useCSSTransforms={false}
      isBounded={false}
    >
      {children}
    </ReactGridLayout>
  );
};

const SizedReactLayoutGrid = sizeMe({ monitorWidth: true })(GridWrapper);

const DashboardGrid = ({ dashboard, viewPanel, handleRange }) => {
  const panelMap = {};

  const renderPanels = () => {
    const panelElements = [];

    for (const panel of dashboard.panels) {
      const panelClasses = classNames({
        "react-grid-item--fullscreen": panel.isViewing,
      });
      const id = panel.id.toString();
      // panel.isInView =
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
    console.log(newLayout);
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
