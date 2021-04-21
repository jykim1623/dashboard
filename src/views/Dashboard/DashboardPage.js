import $ from "jquery";
import qs from "qs";
import { useEffect, useState } from "react";

import { useRouteMatch, useLocation } from "react-router";
import DashboardGrid from "./DashboardGrid";

const DashboardPage = ({ dashboard, handleRange }) => {
  const location = useLocation();
  const params = useRouteMatch();

  const [viewPanel, setViewPanel] = useState(null);

  const setPanelFullscreenClass = (isFullscreen) => {
    $("body").toggleClass("panel-in-fullscreen", isFullscreen);
  };

  const queryParameterCheck = (search) => {
    const params = qs.parse(search.substr(1));
    const urlViewPanelId = params.viewPanel;

    if (!viewPanel && urlViewPanelId) {
      getPanelByIdFromUrlParam(urlViewPanelId, (panel) => {
        setPanelFullscreenClass(true);
        dashboard.initViewPanel(panel);
        setViewPanel(panel);
      });
    }

    if (viewPanel && !urlViewPanelId) {
      setPanelFullscreenClass(false);
      dashboard.exitViewPanel(viewPanel);
      setViewPanel(null);
    }
  };

  const getPanelByIdFromUrlParam = (urlPanelId, callback) => {
    const panelId = parseInt(urlPanelId, 10);
    // dashboard?.expandParentRowFor(panelId);
    const panel = dashboard?.getPanelById(panelId);

    callback(panel);
  };

  useEffect(() => {
    queryParameterCheck(location.search);
  }, [location.search]);

  return (
    <div className="dashboard-container">
      <DashboardGrid
        dashboard={dashboard}
        viewPanel={viewPanel}
        handleRange={handleRange}
      />
    </div>
  );
};

export default DashboardPage;
