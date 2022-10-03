import { createSlice } from "@reduxjs/toolkit";

const initialState = null;

const notificationSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    voteNotification(state, action) {
      return `you voted '${action.payload}'`;
    },
    createNotification(state, action) {
      return `you created new anecdote '${action.payload}'`;
    },
    emptyNotification() {
      return initialState;
    },
  },
});

export const { createNotification, voteNotification, emptyNotification } =
  notificationSlice.actions;
export default notificationSlice.reducer;
