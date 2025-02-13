import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: "",
  reducers: {
    setNotificationMessage(state, action) {
      return action.payload;
    },
    clearNotification(state, action) {
      return "";
    },
  },
});

export const { setNotificationMessage, clearNotification } =
  notificationSlice.actions;

// Thunk for setting and clearing the notification
export const setNotification = (message, seconds) => (dispatch) => {
  dispatch(setNotificationMessage(message));

  setTimeout(() => {
    dispatch(clearNotification());
  }, seconds * 1000);
};

export default notificationSlice.reducer;
