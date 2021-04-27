import _ from "lodash";
import { PanelModel } from "./PanelModel";

export class DashboardModel {
  constructor(data) {
    // this.events = new EventBusSrv();
    this.id = data.id || null;
    this.uid = data.uid || null;
    this.revision = data.revision;
    this.title = data.title || "No Title";
    this.autoUpdate = data.autoUpdate;
    this.description = data.description;
    this.tags = data.tags || [];
    this.style = data.style || "dark";
    this.timezone = data.timezone || "";
    this.editable = data.editable !== false;
    this.graphTooltip = data.graphTooltip || 0;
    this.time = data.time || { from: "now-6h", to: "now" };
    this.timepicker = data.timepicker || {};
    // this.templating = this.ensureListExist(data.templating);
    // this.annotations = this.ensureListExist(data.annotations);
    this.refresh = data.refresh;
    this.snapshot = data.snapshot;
    this.schemaVersion = data.schemaVersion || 0;
    this.version = data.version || 0;
    this.links = data.links || [];
    this.gnetId = data.gnetId || null;
    this.label = data.label;
    this.isResizable = data.isResizable;
    this.isDraggable = data.isDraggable;
    this.panels = _.map(data.panels || [], (panelData) => {
      return new PanelModel(panelData);
    });
  }

  handleBrush(a) {
    console.log(a);
  }

  getPanelById(id) {
    return this.panels.find((panel) => panel.id === id);
  }
  initViewPanel(panel) {
    this.panelInView = panel;
    panel.setIsViewing(true);
  }
  exitViewPanel(panel) {
    this.panelInView = undefined;
    panel.setIsViewing(false);
  }

  changeTime(time) {
    this.time = time;
    this.panels = _.map(this.panels || [], (panelData) => {
      panelData.time = { ...time };
      return new PanelModel(panelData);
    });
  }
  sortPanelsByGridPos() {
    this.panels.sort((panelA, panelB) => {
      if (panelA.gridPos.y === panelB.gridPos.y) {
        return panelA.gridPos.x - panelB.gridPos.x;
      } else {
        return panelA.gridPos.y - panelB.gridPos.y;
      }
    });
  }
}
