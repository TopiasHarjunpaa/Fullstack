import { useState, useEffect } from "react";
import Notification from "./components/Notification";
import blogService from "./services/blogs";
import loginService from "./services/login";
import LoginForm from "./components/LoginForm";
import LogoutForm from "./components/LogoutForm";
import BlogForm from "./components/BlogForm";
import BlogList from "./components/BlogList";
import { initializeBlogs } from "./reducers/blogReducer";
import { useDispatch } from "react-redux";
import "./index.css";

const App = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [user, setUser] = useState(null);
	const [notification, setNotification] = useState(null);
	const dispatch = useDispatch();

	useEffect(() => {
		const loggedUserJSON = window.localStorage.getItem("loggedBlogAppUser");
		if (loggedUserJSON) {
			const user = JSON.parse(loggedUserJSON);
			setUser(user);
			blogService.setToken(user.token);
		}
	}, []);

	useEffect(() => {
		dispatch(initializeBlogs());
	}, [dispatch]);

	const notify = (message, type = "info") => {
		setNotification({ message, type });
		setTimeout(() => {
			setNotification(null);
		}, 5000);
	};

	const handleLogin = async (event) => {
		event.preventDefault();

		try {
			const user = await loginService.login({ username, password });

			window.localStorage.setItem("loggedBlogAppUser", JSON.stringify(user));

			blogService.setToken(user.token);
			setUser(user);
			setUsername(username);
			setPassword(password);
			notify("Logging succeed");
		} catch (exception) {
			notify("Wrong username or password", "alert");
		}
	};

	const handleLogout = (event) => {
		event.preventDefault();
		window.localStorage.removeItem("loggedBlogAppUser");
		setUser(null);
		setUsername("");
		setPassword("");
	};

	return (
		<div>
			<Notification />
			{user === null ? (
				<LoginForm
					username={username}
					password={password}
					handleUsernameChange={({ target }) => setUsername(target.value)}
					handlePasswordChange={({ target }) => setPassword(target.value)}
					handleSubmit={handleLogin}
				/>
			) : (
				<div>
					<LogoutForm username={user.name} handleSubmit={handleLogout} />
					<BlogForm />
					<BlogList userId={user.id} />
				</div>
			)}
		</div>
	);
};

export default App;
