import { useDispatch } from "react-redux";
import { handleLogin } from "../reducers/loginReducer";
import { useField } from "../hooks";
import { Form, Button } from "react-bootstrap";

const LoginForm = () => {
	const { reset: resetUsername, ...username } = useField("text");
	const { reset: resetPassword, ...password } = useField("text");
	const dispatch = useDispatch();

	const handleSubmit = (event) => {
		event.preventDefault();
		const usernameValue = username.value;
		const pwValue = password.value;
		dispatch(handleLogin(usernameValue, pwValue));
		resetUsername();
		resetPassword();
	};

	return (
		<div>
			<Form onSubmit={handleSubmit}>
				<Form.Group>
					<Form.Label>
						<Form.Control {...username} id="username" placeholder="username" />
					</Form.Label>
					<br />
					<Form.Label>
						<Form.Control {...password} id="password" placeholder="password" />
					</Form.Label>
					<br />
					<Button variant="primary" type="submit" id="login-button">
						login
					</Button>
				</Form.Group>
			</Form>
		</div>
	);
};

export default LoginForm;
