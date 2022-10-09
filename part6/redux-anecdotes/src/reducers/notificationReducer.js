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

export const setCreateNotification = (content, seconds) => {
  return async (dispatch) => {
    dispatch(createNotification(content));
    setTimeout(() => {
      dispatch(emptyNotification());
    }, seconds * 1000);
  };
};

export const setVoteNotification = (content, seconds) => {
  return async (dispatch) => {
    dispatch(voteNotification(content));
    setTimeout(() => {
      dispatch(emptyNotification());
    }, seconds * 1000);
  };
};

export default notificationSlice.reducer;
