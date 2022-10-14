import { useDispatch } from "react-redux";
import { createNewComment } from "../reducers/blogReducer";
import { useField } from "../hooks";
import { Form, Button } from "react-bootstrap";

const CommentForm = ({ blog }) => {
	const { reset: resetComment, ...comment } = useField("text");
	const dispatch = useDispatch();

	const createComment = (event) => {
		event.preventDefault();
		dispatch(createNewComment(blog, comment.value));
		resetComment();
	};

	return (
		<div>
			<h3 style={{ marginBottom: 15 }}>Comments</h3>
			<Form onSubmit={createComment}>
				<Form.Group>
					<Form.Label>
						<Form.Control
							{...comment}
							id="comment"
							placeholder="write comment here"
						/>
					</Form.Label>
					<br />
					<Button variant="primary" type="submit" id="login-button">
						add comment
					</Button>
				</Form.Group>
			</Form>
			<br />
			{blog.comments.map((comment, index) => (
				<li key={index}>{comment}</li>
			))}
		</div>
	);
};

export default CommentForm;
