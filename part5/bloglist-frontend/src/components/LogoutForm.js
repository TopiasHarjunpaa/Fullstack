import PropTypes from "prop-types";

const LogoutForm = ({ handleSubmit, username }) => {
	return (
		<div>
			<h2>Bloglist</h2>

			<form onSubmit={handleSubmit}>
				{username} logged in&nbsp;
				<button type="submit">logout</button>
			</form>
			<br />
		</div>
	);
};

LogoutForm.propTypes = {
	handleSubmit: PropTypes.func.isRequired,
	username: PropTypes.string.isRequired,
};

export default LogoutForm;
