import { Link } from "react-router-dom";
import LogoutForm from "./LogoutForm";

const NavigateTab = ({ username }) => {
	const padding = {
		paddingRight: 5,
		display: "inline",
	};

	return (
		<div>
			<Link style={padding} to="/">
				Home
			</Link>
			<Link style={padding} to="/users">
				Users
			</Link>
			<p style={padding}>{`${username} has logged in`}</p>
			<LogoutForm />
		</div>
	);
};

export default NavigateTab;
