import axios from "axios";
import { useEffect, useState } from "react";
import { useAsyncFn } from "react-use";

const loadBodysent = async () => {
  const { data } = await axios.get("/elastic/real/h123/_bodysent");
  return data;
};

const LoadData = () => {
  const [, fetchBodysent] = useAsyncFn(() => loadBodysent());
  const [data, setData] = useState();
  useEffect(() => {
    fetchBodysent().then((o) => {
      setData(o);
    });
  }, []);
  return <div>{data?.statusCode}</div>;
};

export default LoadData;
