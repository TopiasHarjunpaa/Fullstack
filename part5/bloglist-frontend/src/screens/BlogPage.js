import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { updateBlogLikes, deleteBlog } from "../reducers/blogReducer";

import CommentForm from "../components/CommentForm";

const BlogPage = ({ user }) => {
	const id = useParams().id;
	const blogs = useSelector((state) => state.blogs);
	const blog = blogs.find((b) => b.id === id);
	const dispatch = useDispatch();

	const updateLikes = (blog) => {
		dispatch(updateBlogLikes(blog));
	};

	const del = (blog) => {
		dispatch(deleteBlog(blog));
	};

	if (!blog) {
		return null;
	}

	return (
		<div>
			<h3>{`Title: ${blog.title}`}</h3>
			<h5>
				{"URL: "}
				<a href={blog.url}>{blog.url}</a>
			</h5>
			<h5>
				{blog.likes} likes
				<button
					style={{ marginLeft: 10 }}
					id="like-button"
					onClick={() => updateLikes(blog)}
				>
					like
				</button>
			</h5>
			<h5>{`added by ${blog.author}`}</h5>
			{blog.user.id === user.id && (
				<button
					id="delete-button"
					className="removeButton"
					onClick={() => del(blog)}
				>
					delete
				</button>
			)}
			<br />
			<br />
			<CommentForm blog={blog} />
		</div>
	);
};

export default BlogPage;
