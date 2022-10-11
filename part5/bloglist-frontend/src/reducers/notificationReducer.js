import { createSlice } from "@reduxjs/toolkit";

const initialState = null;
let timeoutId;

const notificationSlice = createSlice({
	name: "notifications",
	initialState,
	reducers: {
		createNotification(state, action) {
			return action.payload;
		},
		emptyNotification() {
			return initialState;
		},
	},
});

export const { createNotification, emptyNotification } =
	notificationSlice.actions;

export const setCreateNotification = (content) => {
	return async (dispatch) => {
		clearTimeout(timeoutId);
		dispatch(createNotification(content));
		timeoutId = setTimeout(() => {
			dispatch(emptyNotification());
		}, 5000);
	};
};

export default notificationSlice.reducer;
