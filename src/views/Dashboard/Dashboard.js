import { dashboard as list } from "./data";

import { useContext, useState } from "react";
import { useHistory, useLocation, useRouteMatch } from "react-router";
import { DashboardModel } from "../../app/dashboard/DashboardModel";
import DashboardPage from "./DashboardPage";
import { useEffect } from "react";

import _ from "lodash";
import { format, sub } from "date-fns";
import DashboardContext from "../../app/contexts/DashboardContext";

const Dashboard = () => {
  const context = useContext(DashboardContext);
  const { search } = useLocation();
  const {
    params: { id },
  } = useRouteMatch();
  const history = useHistory();

  const [dashboard, setDashboard] = useState(null);

  const [option, setOption] = useState({
    from: format(sub(new Date(), { days: 1 }), "yyyy-MM-dd"),
    to: format(new Date(), "yyyy-MM-dd"),
    service: "h123",
  });

  // const handleResize = _.throttle(() => {
  //   console.log(window.innerWidth, window.innerHeight);
  // }, 500);

  useEffect(() => {
    if (!id) {
      history.push(`/d/00000001`);
    }
    if (id) {
      history.push(`/d/${id}`);
    }

    // window.addEventListener("resize", handleResize);

    // return () => {
    //   window.removeEventListener("resize", handleResize);
    // };
  }, []);

  useEffect(() => {
    if (id) {
      setDashboard(new DashboardModel(list.find((l) => l.id === id)));
    }
  }, [id]);

  useEffect(() => {
    if (dashboard) {
      const time = { from: option.from, to: option.to };
      dashboard.changeTime(time);
    }
  }, [option.from, option.to]);

  const handleTime = (e) => {
    setOption({ ...option, [e.target.name]: e.target.value });
  };

  const handleToggle = (e) => {
    const newDashboard = new DashboardModel({
      ...dashboard,
      [e.target.name]: e.target.checked,
    });
    setDashboard(newDashboard);
  };
  return (
    <DashboardContext.Provider value={option}>
      {!dashboard && <div>loading...</div>}
      {dashboard && (
        <>
          <div style={{ display: "flex", alignItems: "center" }}>
            <label htmlFor="drag">drag</label>
            <input
              id="drag"
              type="checkbox"
              name="isDraggable"
              checked={dashboard.isDraggable}
              onChange={handleToggle}
            />
            <label htmlFor="resize">resize</label>
            <input
              id="resize"
              type="checkbox"
              name="isResizable"
              checked={dashboard.isResizable}
              onChange={handleToggle}
            />
            <div style={{ display: "flex" }}>
              <input
                type="date"
                name="from"
                value={option.from}
                onChange={handleTime}
              />
              <input
                type="date"
                name="to"
                value={option.to}
                onChange={handleTime}
              />
            </div>
            <div>
              <label htmlFor="service">service(준비중)</label>
              <select id="service">
                <option value="genie">genie</option>
                <option value="h123">h123</option>
              </select>
            </div>
          </div>
          <DashboardPage dashboard={dashboard} />
        </>
      )}
    </DashboardContext.Provider>
  );
};

export default Dashboard;
