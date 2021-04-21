export const byteCalculation = (bytes) => {
  var bytes = parseInt(bytes);

  var s = ["bytes", "KB", "MB", "GB", "TB", "PB"];

  var e = Math.floor(Math.log(bytes) / Math.log(1024));

  if (e == "-Infinity") return "0 " + s[0];
  else return (bytes / Math.pow(1024, Math.floor(e))).toFixed(2) + " " + s[e];
};

export const priceToString = (price) => {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};
