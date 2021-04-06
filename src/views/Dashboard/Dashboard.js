import { dashboard as list } from "./data";

import { useState } from "react";
import { useHistory, useLocation, useRouteMatch } from "react-router";
import { DashboardModel } from "../../app/dashboard/DashboardModel";
import DashboardPage from "./DashboardPage";
import { useEffect } from "react";

const Dashboard = () => {
  const { search } = useLocation();
  const {
    params: { id },
  } = useRouteMatch();
  const history = useHistory();

  const [dashboard, setDashboard] = useState(null);

  useEffect(() => {
    if (!id) {
      history.push(`/d/00000001`);
    }
    if (id) {
      history.push(`/d/${id}`);
    }
  }, []);

  useEffect(() => {
    if (id) {
      setDashboard(new DashboardModel(list.find((l) => l.id === id)));
    }
  }, [id]);
  console.log(dashboard);
  return (
    <div>
      {!dashboard && <div>loading...</div>}
      {dashboard && <DashboardPage dashboard={dashboard} />}
    </div>
  );
};

export default Dashboard;
