import { format } from "date-fns";
import sub from "date-fns/sub";
import { createContext } from "react";

const DashboardContext = createContext({
  from: format(sub(new Date(), { days: 1 }), "yyyy-MM-dd"),
  to: format(new Date(), "yyyy-MM-dd"),
  service: "genie",
});

export default DashboardContext;
