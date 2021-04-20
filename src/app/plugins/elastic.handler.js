import _ from "lodash";

const firstBuckets = ({ responses }) => {
  const list = [];
  /**
   * 데이터가 여러개 올 수도 있으므로 그에 따른 처리 필요
   * aggregation의 모든 데이터의 키는 '0'(문자) 이다.
   */
  console.log(responses);
  // aggregation
  for (const res of responses) {
    const aggs = res.aggregations["0"].buckets;
    /**
     * 형태 분기
     * 1. aggregation 데이터
     * 2. value 데이터
     */
    console.log(aggs);
  }
};
const getSymbolList = (data, list = []) => {
  for (const d of data) {
    if (typeof d[3][0] === "undefined") {
      break;
    }
    if (typeof d[3][0] !== "undefined") {
      const items = d[3][0].buckets;
      if (items.length) {
        for (const item of items) {
          if (list.indexOf(item.key) === -1) {
            list.push(item.key);
          }
        }
      }
    }
  }
  return list;
};

const getSymbolItems = (data, list = []) => {
  for (const d of data) {
    const bucket = {
      date: d.key,
    };
    if (typeof d[3][0] === "undefined") {
      list.push({ ...bucket, symbol: 1, value: d[3].value });
    }
    if (typeof d[3][0] !== "undefined") {
      const items = d[3][0].buckets;
      if (items.length) {
        for (const item of items) {
          // console.log(item);
          list.push({ ...bucket, symbol: item.key, value: item[1].value });
        }
      }
    }
  }

  return { table: list };
};

export const handleSeries = (data) => {
  const buckets = data[0].buckets;
  // const symbols = getSymbolList(buckets);
  // return { data: getSymbolItems(buckets), symbols };
  return getSymbolItems(buckets);
};

export const handleSeriesVega = (data) => {
  const buckets = data[0].buckets;
  const symbols = getSymbolList(buckets);
  return { data: getSymbolItems(buckets), symbols };
};

export const handlePie = (data) => {
  const buckets = data[0].buckets;
  console.log(getSymbolItems(buckets));
};

export const generateAggtoAgg = (init) => {
  const buckets = firstBuckets(init);
};

const getSymbolItemsWithNull = (data, symbols, list = []) => {
  const obj = {};
  for (const a of symbols) {
    obj[a] = {
      key: a,
      values: [],
    };
  }

  return obj;
};

export const generateHighchartData = (items) => {
  const buckets = items[0].buckets;
  const symbols = getSymbolList(buckets);
  // console.log(getSymbolItemsWithNull(buckets, symbols));
};

/********************************************************************
 *                 new es data convert process                      *
 ********************************************************************/

// buckets에 들어있는 리스트를 처리함
const solveBucketsArray = (buckets, list = []) => {
  try {
    for (const bucket of buckets) {
      const bk = bucket["1"];
      const data = { value: bk.value, date: bucket.key };
      // if (bk.hasOwnProperty("key")) {
      //   data.key = bk.key;
      // }
      list.push(data);
    }
    return list;
  } catch (error) {
    return [];
  }
};

const solveBucketsObject = (buckets, list = []) => {
  const item = [];
  for (const bucket in buckets) {
    item = [...solveBucketsArray(bucket)];
    list.push(item);
  }

  return list;
};

const checkBucketInner = (buckets) => {
  // console.log(typeof buckets[0]);
  // if (typeof buckets[0] !== "object") {
  //   return solveBucketsObject(buckets);
  // }
  return solveBucketsArray(buckets);
};

export const initializeAgg = (aggs, kinds) => {
  if (kinds === "line") {
    let result = [];
    for (const agg in aggs["4"]) {
      if (agg === "buckets") {
        result = checkBucketInner(aggs["4"][agg]);
      }
    }
    // console.log(result);
    return result;
  }

  if (kinds === "pie") {
    let result = [];
    for (const agg in aggs["4"]) {
      const buckets = aggs["4"][agg].buckets;
      if (buckets) {
        buckets.map((bucket) => {
          result.push({
            value: bucket["1"].value,
            symbol: bucket.key,
          });
        });
      } else {
        break;
      }
    }
    return result;
  }
};
