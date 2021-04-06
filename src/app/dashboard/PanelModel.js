export class PanelModel {
  constructor(data) {
    this.id = data.id;
    this.gridPos = data.gridPos;
    // this.isViewing = !data.isViewing || false;
    this.title = data.title;
    this.type = data.type;
    this.xaxis = data.xaxis;
    this.yaxis = data.yaxis;
    this.tooltip = data.tooltip;
  }

  setIsViewing(isViewing) {
    this.isViewing = isViewing;
  }
}
