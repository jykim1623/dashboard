import axios from "axios";

export const reqBodySent = async () => {
  try {
    const { data } = await axios.get("/bodysent");
    return handleSeries(data);
  } catch (error) {
    return error;
  }
};

export const reqBrowser = async () => {
  try {
    const { data } = await axios.get("/browser");
    return handleSeries(data);
  } catch (error) {
    return error;
  }
};

const handleSeries = (data, list = []) => {
  // 1. response 분리
  for (const res of data.responses) {
    // 2. 분리된 response 개별 처리
    list.push(...handleResponse(res));
  }
  return list;
};

// 3. buckets 처리
const handleResponse = (response) => {
  const buckets = response.aggregations[0].buckets;
  if (buckets[0][3].hasOwnProperty("value")) {
    return handleSingleSeries(buckets);
  }
  return handleMultiSeries(buckets);
};

const handleSingleSeries = (buckets, list = []) => {
  for (const bucket of buckets) {
    // single인지 multiple인지 처리 - bucket[0] 안에 bucket이 또 있는지 확인
    list.push({
      date: bucket.key,
      symbol: "total",
      value: bucket[3].value ? bucket[3].value : 0,
    });
  }
  return list;
};

const getSymbols = (data, list = []) => {
  for (const d of data) {
    const items = d[3][0].buckets;
    if (items.length) {
      for (const item of items) {
        if (list.indexOf(item.key) === -1) {
          list.push(item.key);
        }
      }
    }
  }
  return list;
};

const handleMultiSeries = (buckets, list = []) => {
  const symbols = getSymbols(buckets);
  for (const bucket of buckets) {
    for (const symbol of symbols) {
      const findKey = bucket[3][0].buckets.find((b) => b.key === symbol);
      if (findKey) {
        list.push({ date: bucket.key, symbol, value: findKey[1].value });
      } else {
        list.push({ date: bucket.key, symbol, value: 0 });
      }
    }
  }
  return list;
};
