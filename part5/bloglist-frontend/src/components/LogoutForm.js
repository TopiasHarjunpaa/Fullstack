import { useDispatch } from "react-redux";
import { handleLogout } from "../reducers/loginReducer";

const LogoutForm = () => {
	const dispatch = useDispatch();

	const handleSubmit = (event) => {
		event.preventDefault();
		dispatch(handleLogout());
	};
	return (
		<div>
			<form onSubmit={handleSubmit}>
				<button type="submit">logout</button>
			</form>
			<br />
		</div>
	);
};

export default LogoutForm;
