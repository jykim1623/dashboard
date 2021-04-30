import { format } from "date-fns";
import sub from "date-fns/sub";
import { Suspense, useCallback, useState } from "react";

// const LoadData = lazy(() => import("./LoadData"));

function Home() {
  const [width, setWidth] = useState(450);
  const [height, setHeight] = useState(200);
  const [time, setTime] = useState({
    from: format(sub(new Date(), { days: 3 }), "yyyy-mm-dd"),
    to: format(new Date(), "yyyy-mm-dd"),
  });
  const handleTime = ({ name, value }) => {
    console.log(value);
    setTime({
      ...time,
      [name]: value,
    });
  };
  return (
    <Suspense fallback={<h1>Loading data...</h1>}>
      width :{" "}
      <input
        type="text"
        value={width}
        onChange={(e) => setWidth(e.target.value)}
      />
      height :{" "}
      <input
        type="text"
        value={height}
        onChange={(e) => setHeight(e.target.value)}
      />
      from:
      <input
        type="date"
        name="from"
        value={time.from}
        onChange={(e) => handleTime(e.target)}
      />
      to:
      <input
        type="date"
        name="to"
        value={time.to}
        onChange={(e) => handleTime(e.target)}
      />
      <div>Home page</div>
      <iframe
        src={`http://192.168.120.188:3000/d-solo/l1C6K29Gk/sample1?orgId=1&from=${new Date(
          time.from
        ).getTime()}&to=${new Date(time.to).getTime()}&panelId=2&theme=light`}
        width={width}
        height={height}
        frameBorder="0"
      ></iframe>
      <iframe
        src="http://192.168.120.161:3000/d-solo/IfnAU1jWz/telco-stats?orgId=1&var-telco=kt-statistics-service&var-module=nginx&from=1619499871123&to=1619759071123&panelId=7"
        width="450"
        height="200"
        frameborder="0"
      ></iframe>
    </Suspense>
  );
}
export default Home;
