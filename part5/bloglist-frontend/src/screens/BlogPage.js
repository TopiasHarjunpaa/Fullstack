import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { updateBlogLikes } from "../reducers/blogReducer";

const BlogPage = () => {
	const id = useParams().id;
	const blogs = useSelector((state) => state.blogs);
	const blog = blogs.find((b) => b.id === id);
	const dispatch = useDispatch();
	const updateLikes = (blog) => {
		dispatch(updateBlogLikes(blog));
	};
	if (!blog) {
		return null;
	}

	return (
		<div>
			<h2>{blog.title}</h2>
			<a href={blog.url}>{blog.url}</a>
			<p>
				{blog.likes} likes
				<button
					style={{ marginLeft: 10 }}
					id="like-button"
					onClick={() => updateLikes(blog)}
				>
					like
				</button>
			</p>
			<p>{`added by ${blog.author}`}</p>
		</div>
	);
};

export default BlogPage;
