import { useDispatch } from "react-redux";
import { createNewBlog } from "../reducers/blogReducer";
import { useField } from "../hooks";
import { Form, Button } from "react-bootstrap";

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

	const padding = {
		paddingRight: 10,
	};

	return (
		<div>
			<h3>Create new blog</h3>
			<Form onSubmit={createBlog}>
				<Form.Group>
					<Form.Label style={padding}>
						<Form.Control {...title} id="title" placeholder="title" />
					</Form.Label>
					<Form.Label style={padding}>
						<Form.Control {...author} id="author" placeholder="author" />
					</Form.Label>
					<Form.Label style={padding}>
						<Form.Control {...url} id="url" placeholder="url" />
					</Form.Label>
					<Button variant="primary" type="submit" id="create-blog-button">
						create
					</Button>
				</Form.Group>
			</Form>
		</div>
	);
};

export default BlogForm;
