import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateBlogLikes, deleteBlog } from "../reducers/blogReducer";

const Blog = ({ blog, userId }) => {
	const [blogInfo, setBlogInfo] = useState(null);
	const dispatch = useDispatch();
	const updateLikes = (blog) => {
		dispatch(updateBlogLikes(blog));
	};

	const del = (blog) => {
		dispatch(deleteBlog(blog));
	};

	return (
		<div className="blogStyle">
			{blogInfo === blog.id ? (
				<div>
					<h3>
						{blog.title}&nbsp;
						<button onClick={() => setBlogInfo(null)}>hide</button>
					</h3>
					<p>created by: {blog.author}</p>
					<p>url: {blog.url}</p>
					<p>
						likes: {blog.likes}
						<button id="like-button" onClick={() => updateLikes(blog)}>
							like
						</button>
					</p>
					{blog.user.id === userId && (
						<button
							id="delete-button"
							className="removeButton"
							onClick={() => del(blog)}
						>
							delete
						</button>
					)}
				</div>
			) : (
				<div>
					<nobr>{blog.title}&nbsp;</nobr>
					<nobr>{blog.author}&nbsp;</nobr>
					<button id={blog.id} onClick={() => setBlogInfo(blog.id)}>
						view
					</button>
				</div>
			)}
		</div>
	);
};

export default Blog;
