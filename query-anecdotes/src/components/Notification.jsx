import React, { useContext } from "react";
import { NotificationContext } from "./NotificationContext.jsx";
const Notification = () => {
  const { state } = useContext(NotificationContext);

  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
    marginBottom: 5,
    display: state.visible ? "block" : "none",
  };

  return <div style={style}>{state.message}</div>;
};

export default Notification;
