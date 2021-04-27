import { dashboard as list } from "./data";

import { lazy, useState } from "react";
import { useHistory, useRouteMatch } from "react-router";
import { DashboardModel } from "../../app/dashboard/DashboardModel";
// import DashboardPage from "./DashboardPage";
import { useEffect } from "react";

import _ from "lodash";
import { format, sub } from "date-fns";
import DashboardContext from "../../app/contexts/DashboardContext";
import { Suspense } from "react";

const DashboardPage = lazy(() => import("./DashboardPage"));

const Dashboard = () => {
  // const context = useContext(DashboardContext);
  // const { search } = useLocation();
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
    document.getElementById("root").setAttribute("class", "dashboard");
    if (!id) {
      history.push(`/d/00000001`);
    }
    if (id) {
      history.push(`/d/${id}`);
    }

    // window.addEventListener("resize", handleResize);

    return () => {
      document.getElementById("root").removeAttribute("class");
    };
  }, []);

  useEffect(() => {
    if (id) {
      setDashboard(new DashboardModel(list.find((l) => l.id === id)));
    }
  }, [id]);

  useEffect(() => {
    if (dashboard) {
      const m = option.to - option.from;
      if (m > 60 * 60 * 24 * 30 * 1000) {
        alert("검색 일은 한달까지만 가능합니다");
        return;
      }
      if (m < 0) {
        alert("검색 일 설정 에러입니다.");
        return;
      }
      const time = { from: option.from, to: option.to };
      // dashboard.changeTime(time);
    }
  }, [option.from, option.to]);

  const handleService = (e) => {
    setOption({ ...option, service: e.target.value });
  };

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

  const handleRangeArea = (name, { date }) => {
    if (date) {
      setOption({ ...option, from: date[0], to: date[1] });
    }
  };
  return (
    <DashboardContext.Provider value={option}>
      {!dashboard && <div>loading...</div>}
      {dashboard && (
        <>
          <div style={{ display: "flex", alignItems: "center" }}>
            {/* <label htmlFor="drag">drag</label>
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
            /> */}
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
            {dashboard.id === "00000005" && (
              <div>
                <label htmlFor="service">service</label>
                <select id="service" onChange={handleService}>
                  <option value="h123">h123</option>
                  <option value="genie">genie</option>
                  <option value="geniecache">geniecache</option>
                </select>
              </div>
            )}
          </div>
          <Suspense fallback={<div>dashboard loading...</div>}>
            <DashboardPage
              dashboard={dashboard}
              handleRange={handleRangeArea}
            />
          </Suspense>
        </>
      )}
    </DashboardContext.Provider>
  );
};

export default Dashboard;
