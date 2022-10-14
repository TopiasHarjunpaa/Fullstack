import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import NavigateTab from "./components/NavigateTab";
import Notification from "./components/Notification";
import Home from "./screens/Home";
import Login from "./screens/Login";
import UsersPage from "./screens/UsersPage";
import SingleUserPage from "./screens/SingleUserPage";
import BlogPage from "./screens/BlogPage";
import { initializeBlogs } from "./reducers/blogReducer";
import { initializeUsers } from "./reducers/userReducer";
import { initializeUser } from "./reducers/loginReducer";
import "./index.css";

const App = () => {
	const user = useSelector((state) => state.login);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(initializeBlogs());
		dispatch(initializeUser());
		dispatch(initializeUsers());
	}, [dispatch]);

	return (
		<div className="container">
			<Router>
				<div>
					<h2>Blog App</h2>
					{user ? <NavigateTab /> : <div />}
					<Notification />
				</div>

				{user ? (
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/users" element={<UsersPage />} />
						<Route path="/users/:id" element={<SingleUserPage />} />
						<Route path="/blogs/:id" element={<BlogPage user={user} />} />
					</Routes>
				) : (
					<Login />
				)}
			</Router>
		</div>
	);
};

export default App;
