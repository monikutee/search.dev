import React from "react";
import { useIdleTimer } from "react-idle-timer";

const LogoutTimer = () => {
  useIdleTimer({
    onIdle: () => console.log("IDLE LOGOUT"),
    timeout: 30 * 60 * 1000, // 30 minutes
    crossTab: true,
  });

  return <> </>;
};

export default LogoutTimer;
