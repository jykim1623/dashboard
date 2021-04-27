import classNames from "classnames";

const VegaChartLoading = ({ size }) => {
  return (
    <div
      className={classNames(
        "spinner-border",
        `spinner-grow-${size ? size : "md"}`
      )}
      role="status"
    >
      <span className="visually-hidden">Loading...</span>
    </div>
  );
};

export default VegaChartLoading;
