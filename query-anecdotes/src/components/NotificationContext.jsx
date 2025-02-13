import React, { createContext, useContext, useReducer } from "react";

export const NotificationContext = createContext();

const notificationReducer = (state, action) => {
  switch (action.type) {
    case "SHOW_NOTIFICATION":
      return { message: action.payload, visible: true };
    case "HIDE_NOTIFICATION":
      return { ...state, visible: false };
    default:
      return state;
  }
};

const initialState = {
  message: "",
  visible: false,
};

export const NotificationProvider = ({ children }) => {
  const [state, dispatch] = useReducer(notificationReducer, initialState);

  return (
    <NotificationContext.Provider value={{ state, dispatch }}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  const { dispatch } = useContext(NotificationContext);

  const showNotification = (message) => {
    dispatch({ type: "SHOW_NOTIFICATION", payload: message });
    setTimeout(() => {
      dispatch({ type: "HIDE_NOTIFICATION" });
    }, 5000);
  };

  return { showNotification };
};
