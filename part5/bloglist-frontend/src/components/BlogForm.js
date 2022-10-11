import { useDispatch } from "react-redux";
import { createNewBlog } from "../reducers/blogReducer";
import { useField } from "../hooks";

const BlogForm = () => {
	const { reset: resetTitle, ...title } = useField("text");
	const { reset: resetAuthor, ...author } = useField("text");
	const { reset: resetUrl, ...url } = useField("text");
	const dispatch = useDispatch();

	const createBlog = (event) => {
		event.preventDefault();
		const blog = {
			title: title.value,
			author: author.value,
			url: url.value,
		};
		dispatch(createNewBlog(blog));
		resetTitle();
		resetAuthor();
		resetUrl();
	};

	return (
		<div>
			<h2>Create new blog</h2>

			<form onSubmit={createBlog}>
				<div>
					title:
					<input {...title} id="title" />
				</div>
				<div>
					author:
					<input {...author} id="author" />
				</div>
				<div>
					url:
					<input {...url} id="url" />
				</div>
				<button type="submit" id="create-blog-button">
					create
				</button>
			</form>
		</div>
	);
};

export default BlogForm;
