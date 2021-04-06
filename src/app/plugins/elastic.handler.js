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
      console.log(typeof d[3][0]);
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
