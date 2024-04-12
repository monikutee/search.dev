import React from "react";

type Props = {
  size?: "sm" | undefined;
};

const Loader: React.FC<Props> = ({ size }) => {
  return (
    <React.Fragment>
      <div
        className={`spinner-border${size ? " spinner-border-sm" : ""}`}
        role="status"
      >
        <span className="visually-hidden">Loading...</span>
      </div>
    </React.Fragment>
  );
};

export default Loader;
