import { useDispatch } from "react-redux";
import { handleLogin } from "../reducers/loginReducer";
import { useField } from "../hooks";

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
			<form onSubmit={handleSubmit}>
				<div>
					username
					<input {...username} id="username" />
				</div>
				<div>
					password
					<input {...password} id="password" />
				</div>
				<button type="submit" id="login-button">
					login
				</button>
			</form>
		</div>
	);
};

export default LoginForm;
