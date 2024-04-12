import React from "react";
import Loader from "./Loader";

const GlobalLoader: React.FC = () => {
  return (
    <div id={"preloader"}>
      <div id={"status"}>
        <Loader />
      </div>
    </div>
  );
};

export default GlobalLoader;
