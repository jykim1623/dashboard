import { dashboard as list } from "./data";

import { useState } from "react";
import { useHistory, useLocation, useRouteMatch } from "react-router";
import { DashboardModel } from "../../app/dashboard/DashboardModel";
import DashboardPage from "./DashboardPage";
import { useEffect } from "react";

import _ from "lodash";

const Dashboard = () => {
  const { search } = useLocation();
  const {
    params: { id },
  } = useRouteMatch();
  const history = useHistory();

  const [dashboard, setDashboard] = useState(null);

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
  const handleToggle = (e) => {
    const newDashboard = new DashboardModel({
      ...dashboard,
      [e.target.name]: e.target.checked,
    });
    setDashboard(newDashboard);
  };
  return (
    <>
      {!dashboard && <div>loading...</div>}
      {dashboard && (
        <>
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
          <DashboardPage dashboard={dashboard} />
        </>
      )}
    </>
  );
};

export default Dashboard;
