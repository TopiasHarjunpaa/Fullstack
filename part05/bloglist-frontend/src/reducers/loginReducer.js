import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs";
import loginService from "../services/login";
import { setCreateNotification } from "./notificationReducer";

const loginSlice = createSlice({
	name: "login",
	initialState: [],
	reducers: {
		setUser(state, action) {
			return action.payload;
		},
	},
});

export const { setUser } = loginSlice.actions;

export const initializeUser = () => {
	return async (dispatch) => {
		const loggedUserJSON = window.localStorage.getItem("loggedBlogAppUser");
		if (loggedUserJSON) {
			const user = JSON.parse(loggedUserJSON);
			blogService.setToken(user.token);
			dispatch(setUser(user));
		}
	};
};

export const handleLogin = (username, password) => {
	return async (dispatch) => {
		try {
			const user = await loginService.login({ username, password });
			window.localStorage.setItem("loggedBlogAppUser", JSON.stringify(user));
			blogService.setToken(user.token);
			dispatch(setUser(user));
			dispatch(
				setCreateNotification({ content: "Logging succeed", success: true })
			);
		} catch {
			dispatch(
				setCreateNotification({
					content: "Wrong username or password",
					success: false,
				})
			);
		}
	};
};

export const handleLogout = (username) => {
	return async (dispatch) => {
		window.localStorage.removeItem("loggedBlogAppUser");
		dispatch(setUser(null));
	};
};

export default loginSlice.reducer;
