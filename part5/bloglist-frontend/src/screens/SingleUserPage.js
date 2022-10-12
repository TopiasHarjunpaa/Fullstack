import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const SingleUserPage = () => {
	const id = useParams().id;
	const users = useSelector((state) => state.users);
	const user = users.find((u) => u.id === id);
	if (!user) {
		return null;
	}

	return (
		<div>
			<h2>{user.name}</h2>
			<h3>added blogs</h3>
			{user.blogs.map((blog) => (
				<li key={blog.id}>
					<Link to={`../../blogs/${blog.id}`}>{blog.title}</Link>
				</li>
			))}
		</div>
	);
};

export default SingleUserPage;
