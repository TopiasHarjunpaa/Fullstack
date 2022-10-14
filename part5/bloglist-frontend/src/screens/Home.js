import { useSelector } from "react-redux";

import BlogForm from "../components/BlogForm";
import BlogList from "../components/BlogList";

const Home = () => {
	const blogs = useSelector((state) => state.blogs);
	return (
		<div>
			<BlogForm />
			<h3>List of blogs</h3>
			<BlogList blogs={blogs} path={""} />
		</div>
	);
};

export default Home;
